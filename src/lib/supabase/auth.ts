import "server-only";

import type { User } from "@supabase/supabase-js";
import { adminAllowlist, hasAdminAllowlist, resumeWritesEnabled, supabaseAuthConfigured } from "./config";
import { createSupabaseServerClient } from "./server";

export type AuthContext =
  | { status: "admin"; user: User }
  | { status: "unauthenticated"; user: null }
  | { status: "forbidden"; user: User | null }
  | { status: "not-configured"; user: null };

function isAllowed(user: User) {
  if (adminAllowlist.ids.has(user.id.toLowerCase())) return true;
  const email = user.email?.toLowerCase();
  return Boolean(email && adminAllowlist.emails.has(email));
}

export async function getAuthContext(): Promise<AuthContext> {
  if (!supabaseAuthConfigured || !hasAdminAllowlist) return { status: "not-configured", user: null };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "not-configured", user: null };

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return { status: "unauthenticated", user: null };

  return isAllowed(data.user)
    ? { status: "admin", user: data.user }
    : { status: "forbidden", user: data.user };
}

export function writesAvailable() {
  return resumeWritesEnabled;
}
