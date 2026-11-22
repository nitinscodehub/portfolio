import { noStoreHeaders } from "@/lib/http";
import { requireAdmin } from "@/lib/resume/guard";
import { listResumeVersions } from "@/lib/resume/service";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const guard = await requireAdmin(request, "versions", 60);
  if ("error" in guard) return guard.error;

  const versions = await listResumeVersions();
  return Response.json({ versions }, { headers: noStoreHeaders() });
}
