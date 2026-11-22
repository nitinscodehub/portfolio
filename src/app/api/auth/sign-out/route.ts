import { NextResponse } from "next/server";
import { apiError, hasValidOrigin, noStoreHeaders } from "@/lib/http";
import { clearSessionCookie } from "@/lib/resume/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!hasValidOrigin(request)) return apiError(403, "invalid_origin", "Cross-origin state changes are not allowed.");
  return clearSessionCookie(NextResponse.json({ ok: true }, { headers: noStoreHeaders() }));
}
