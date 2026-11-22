import { apiError, hasValidOrigin, noStoreHeaders } from "@/lib/http";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!hasValidOrigin(request)) return apiError(403, "invalid_origin", "Cross-origin state changes are not allowed.");
  const supabase = await createSupabaseServerClient();
  if (!supabase) return Response.json({ ok: true }, { headers: noStoreHeaders() });

  await supabase.auth.signOut();
  return Response.json({ ok: true }, { headers: noStoreHeaders() });
}
