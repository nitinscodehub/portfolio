import "server-only";

import type { NextResponse } from "next/server";
import type { User } from "@supabase/supabase-js";
import { apiError, hasValidOrigin, noStoreHeaders } from "@/lib/http";
import { getAuthContext } from "@/lib/supabase/auth";
import { resumeWritesEnabled, supabaseAuthConfigured } from "@/lib/supabase/config";
import { allowRequest } from "./rate-limit";

type GuardResult = { user: User } | { error: NextResponse };

export async function requireAdmin(request: Request, rateKey: string, limit = 20): Promise<GuardResult> {
  if (!supabaseAuthConfigured) {
    return {
      error: apiError(503, "resume_system_not_configured", "Resume management is not configured. Write operations are disabled."),
    };
  }

  const auth = await getAuthContext();
  if (auth.status === "unauthenticated") {
    return { error: apiError(401, "unauthenticated", "Sign in to manage resumes.") };
  }
  if (auth.status === "forbidden" || auth.status === "not-configured") {
    return { error: apiError(403, "forbidden", "This account is not authorized to manage resumes.") };
  }
  if (!resumeWritesEnabled) {
    return {
      error: apiError(503, "resume_system_not_configured", "Resume management is not configured. Write operations are disabled."),
    };
  }
  const method = request.method.toUpperCase();
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method) && !hasValidOrigin(request)) {
    return { error: apiError(403, "invalid_origin", "Cross-origin state changes are not allowed.") };
  }
  if (!(await allowRequest(`admin:${auth.user.id}:${rateKey}`, limit, 3600))) {
    return { error: apiError(429, "rate_limited", "Too many attempts. Please try again later.") };
  }

  return { user: auth.user };
}

export const dynamic = "force-dynamic";
export const noStore = noStoreHeaders;
