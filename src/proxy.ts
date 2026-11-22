import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabaseAuthConfigured, supabaseEnv } from "@/lib/supabase/config";

/** Refreshes Supabase auth cookies before each page render. */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  if (!supabaseAuthConfigured) return response;

  const supabase = createServerClient(supabaseEnv.url, supabaseEnv.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(items) {
        items.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        items.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  await supabase.auth.getUser();
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon.svg|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|webp|ico)$).*)",
  ],
};
