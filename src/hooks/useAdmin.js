import { useState, useEffect } from 'react';
import { supabase, NOT_CONFIGURED } from '@/lib/supabase';

const NOT_ADMIN = "This account is not an admin. Add it to public.admins (see supabase/README.md).";

const checkIsAdmin = async () => {
  const { data, error } = await supabase.rpc('is_admin');
  return !error && data === true;
};

// Admin session backed by Supabase Auth. Being signed in is not enough: the account must also be
// listed in public.admins, which is what the database policies check before any upload/delete.
export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!supabase) return;

    let active = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) return setIsAdmin(false);
      // Defer: calling Supabase inside this callback can deadlock the auth client.
      setTimeout(() => checkIsAdmin().then(ok => { if (active) setIsAdmin(ok); }), 0);
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    if (!supabase) throw new Error(NOT_CONFIGURED);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    if (!(await checkIsAdmin())) {
      await supabase.auth.signOut();
      throw new Error(NOT_ADMIN);
    }
  };

  const logout = async () => {
    if (supabase) await supabase.auth.signOut();
  };

  return { isAdmin, login, logout };
}
