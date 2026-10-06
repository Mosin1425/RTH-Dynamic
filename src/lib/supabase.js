import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
	console.warn('Supabase is not configured: set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY (see .env.example).');
}

export const supabase = url && key ? createClient(url, key) : null;

export const NOT_CONFIGURED = 'Backend is not configured. Set the Supabase env variables and rebuild.';
