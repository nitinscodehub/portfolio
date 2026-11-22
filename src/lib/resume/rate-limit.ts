import "server-only";

import { createSupabaseAdminClient } from "@/lib/supabase/server";

/**
 * Database-backed limiter so limits hold across serverless instances.
 * Fails closed: when the limiter cannot be evaluated, the request is refused.
 */
export async function allowRequest(key: string, limit: number, windowSeconds: number) {
  const admin = createSupabaseAdminClient();
  if (!admin) return false;

  const { data, error } = await admin.rpc("resume_rate_limit", {
    p_key: key.slice(0, 120),
    p_limit: limit,
    p_window: windowSeconds,
  });

  if (error) return false;
  return data === true;
}
