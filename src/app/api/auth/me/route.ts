import { noStoreHeaders } from "@/lib/http";
import { getAuthContext } from "@/lib/supabase/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const auth = await getAuthContext();
  return Response.json(
    { status: auth.status, email: auth.user?.email ?? null },
    { headers: noStoreHeaders() },
  );
}
