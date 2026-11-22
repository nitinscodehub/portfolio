import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { supabaseAuthConfigured, supabaseEnv, supabaseAdminConfigured } from "./config";

/** Cookie-backed client bound to the signed-in visitor. */
export async function createSupabaseServerClient() {
  if (!supabaseAuthConfigured) return null;
  const cookieStore = await cookies();

  return createServerClient(supabaseEnv.url, supabaseEnv.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(items) {
        try {
          items.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Components cannot write cookies; proxy.ts refreshes sessions.
        }
      },
    },
  });
}

/** Privileged client used only inside server-side route handlers/services. */
export function createSupabaseAdminClient() {
  if (!supabaseAdminConfigured) return null;
  return createClient(supabaseEnv.url, supabaseEnv.serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}
