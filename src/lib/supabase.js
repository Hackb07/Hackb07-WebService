import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a safe client that won't crash if env vars are missing
// This allows the UI to render with fallback data instead of white-screening
export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        from: () => ({
            select: () => Promise.resolve({ data: null, error: { message: 'Supabase keys missing' } }),
            insert: () => Promise.resolve({ data: null, error: { message: 'Supabase keys missing' } })
        })
    };
