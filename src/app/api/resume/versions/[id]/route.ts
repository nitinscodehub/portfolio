import { apiError } from "@/lib/http";
import { requireAdmin } from "@/lib/resume/guard";
import { deleteResumeVersion } from "@/lib/resume/service";

export const dynamic = "force-dynamic";

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(request, "delete", 20);
  if ("error" in guard) return guard.error;

  const { id } = await context.params;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return apiError(400, "invalid_id", "Invalid version ID.");
  }

  const result = await deleteResumeVersion(id);
  if (!result.ok) return apiError(result.status, "delete_failed", result.message);
  return Response.json({ ok: true });
}
