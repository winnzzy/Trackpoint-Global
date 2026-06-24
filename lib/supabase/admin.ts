import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client that uses the service role key.
 * This client bypasses RLS and must NEVER be imported into client components.
 *
 * Use for controlled server-side operations such as:
 *   - Public tracking lookup by tracking number
 *   - Any operation that intentionally bypasses Row Level Security
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL environment variable. " +
        "The admin Supabase client requires this to connect to your Supabase project."
    );
  }

  if (!supabaseServiceRoleKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY environment variable. " +
        "The admin Supabase client requires the service role key to bypass RLS. " +
        "This key must only be used on the server — never expose it to the browser."
    );
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}