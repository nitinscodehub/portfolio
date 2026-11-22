import { NextResponse } from "next/server";

/** Pass-through proxy. Résumé admin auth uses an HttpOnly signed cookie, so no session refresh is needed. */
export function proxy() {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon.svg|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|webp|ico)$).*)",
  ],
};
