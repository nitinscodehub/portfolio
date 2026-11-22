import "server-only";

import type { NextResponse } from "next/server";
import { apiError, hasValidOrigin } from "@/lib/http";
import { isAdmin } from "./auth";
import { resumeWritesEnabled } from "./config";
import { allowRequest } from "./rate-limit";

type GuardResult = { ok: true } | { error: NextResponse };

export async function requireAdmin(request: Request, rateKey: string, limit = 20): Promise<GuardResult> {
  if (!resumeWritesEnabled) {
    return {
      error: apiError(503, "resume_system_not_configured", "Resume management is not configured. Write operations are disabled."),
    };
  }

  if (!(await isAdmin())) {
    return { error: apiError(401, "unauthenticated", "Sign in to manage resumes.") };
  }

  const method = request.method.toUpperCase();
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method) && !hasValidOrigin(request)) {
    return { error: apiError(403, "invalid_origin", "Cross-origin state changes are not allowed.") };
  }

  if (!(await allowRequest(`admin:${rateKey}`, limit, 3600))) {
    return { error: apiError(429, "rate_limited", "Too many attempts. Please try again later.") };
  }

  return { ok: true };
}
