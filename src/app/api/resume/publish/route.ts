import { apiError, noStoreHeaders } from "@/lib/http";
import { requireAdmin } from "@/lib/resume/guard";
import { setActiveResumeVersion } from "@/lib/resume/service";
import { publishSchema } from "@/lib/resume/validation";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const guard = await requireAdmin(request, "publish", 20);
  if ("error" in guard) return guard.error;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return apiError(400, "invalid_json", "Expected a JSON body.");
  }

  const parsed = publishSchema.safeParse(body);
  if (!parsed.success) return apiError(400, "invalid_input", "A valid version ID is required.");

  const result = await setActiveResumeVersion(parsed.data.id, "publish");
  if (!result.ok) return apiError(result.status, "publish_failed", result.message);

  return Response.json({ ok: true, activeId: parsed.data.id }, { headers: noStoreHeaders() });
}
