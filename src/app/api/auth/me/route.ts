import { noStoreHeaders } from "@/lib/http";
import { isAdmin } from "@/lib/resume/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await isAdmin();
  return Response.json(
    { status: admin ? "authorized" : "unauthenticated", email: admin ? "owner@portfolio.local" : null },
    { headers: noStoreHeaders() },
  );
}
