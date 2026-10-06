import { useState, useEffect } from 'react';
import { supabase, NOT_CONFIGURED } from '@/lib/supabase';

// Admin session backed by Supabase Auth. Shared across pages and persisted by the Supabase client.
export function useAdmin() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, next) => setSession(next));
    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    if (!supabase) throw new Error(NOT_CONFIGURED);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const logout = async () => {
    if (supabase) await supabase.auth.signOut();
  };

  return { isAdmin: !!session, login, logout };
}
