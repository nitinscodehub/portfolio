import { NextResponse } from "next/server";

export function apiError(status: number, code: string, message: string, extra?: Record<string, unknown>) {
  return NextResponse.json({ error: { code, message, ...extra } }, { status });
}

export function noStoreHeaders() {
  return {
    "Cache-Control": "private, no-store, max-age=0, must-revalidate",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  } satisfies Record<string, string>;
}

/**
 * State-changing requests must originate from this site. Browsers send Origin
 * on POST/PATCH/DELETE; SameSite cookies add a second layer of protection.
 */
export function hasValidOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const originUrl = new URL(origin);
    const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    const configured = process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL).host : null;
    return originUrl.host === host || originUrl.host === configured;
  } catch {
    return false;
  }
}

export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim().slice(0, 64);
  return request.headers.get("x-real-ip")?.slice(0, 64) ?? "unknown";
}
