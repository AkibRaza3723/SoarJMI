import { createClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase admin client.
 * Uses the SERVICE ROLE key — never expose this to the browser.
 * Only import this file from Server Components or Route Handlers.
 *
 * The client is lazy-initialized at request time so Next.js can
 * build without requiring env vars to be present at build time.
 */

let _supabaseAdmin: ReturnType<typeof createClient> | null = null;

export function getSupabaseAdmin() {
  if (_supabaseAdmin) return _supabaseAdmin;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      'Missing Supabase environment variables. ' +
        'Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local (or Vercel environment).'
    );
  }

  _supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return _supabaseAdmin;
}

export type Database = {
  public: {
    Tables: {
      event_registrations: {
        Row: {
          id: string;
          reg_id: string;
          full_name: string;
          email: string;
          phone: string;
          university: string;
          course: string;
          year_of_study: string;
          roll_number: string | null;
          event_name: string;
          reason: string | null;
          consented: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['event_registrations']['Row'], 'id' | 'created_at'>;
      };
    };
  };
};
