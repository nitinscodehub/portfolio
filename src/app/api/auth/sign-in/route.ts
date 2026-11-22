import { apiError, clientIp, noStoreHeaders } from "@/lib/http";
import { allowRequest } from "@/lib/resume/rate-limit";
import { SIGN_IN_SCHEMA } from "@/lib/resume/validation";
import { supabaseAuthConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!supabaseAuthConfigured) {
    return apiError(503, "auth_not_configured", "Authentication is not configured.");
  }
  if (!(await allowRequest(`signin:${clientIp(request)}`, 8, 900))) {
    return apiError(429, "rate_limited", "Too many sign-in attempts. Try again later.");
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError(400, "invalid_json", "Expected a JSON body.");
  }

  const parsed = SIGN_IN_SCHEMA.safeParse(body);
  if (!parsed.success) return apiError(400, "invalid_input", "Enter a valid email and password.");

  const supabase = await createSupabaseServerClient();
  if (!supabase) return apiError(503, "auth_not_configured", "Authentication is not configured.");

  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error || !data.user) {
    return apiError(401, "invalid_credentials", "Email or password is incorrect.");
  }

  return Response.json(
    { user: { id: data.user.id, email: data.user.email ?? null } },
    { headers: noStoreHeaders() },
  );
}
