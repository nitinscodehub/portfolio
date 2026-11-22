import { NextResponse } from "next/server";
import { apiError, clientIp, noStoreHeaders } from "@/lib/http";
import { attachSessionCookie, passwordMatches } from "@/lib/resume/auth";
import { adminPasswordConfigured } from "@/lib/resume/config";
import { allowRequest } from "@/lib/resume/rate-limit";
import { signInSchema } from "@/lib/resume/validation";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!adminPasswordConfigured) {
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

  const parsed = signInSchema.safeParse(body);
  if (!parsed.success) return apiError(400, "invalid_input", "Enter the admin password.");

  if (!passwordMatches(parsed.data.password)) {
    return apiError(401, "invalid_credentials", "The password is incorrect.");
  }

  return attachSessionCookie(
    NextResponse.json(
      { user: { id: "site-owner", email: "owner@portfolio.local" } },
      { headers: noStoreHeaders() },
    ),
  );
}
