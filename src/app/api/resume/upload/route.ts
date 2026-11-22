import { apiError, noStoreHeaders } from "@/lib/http";
import { requireAdmin } from "@/lib/resume/guard";
import { uploadResumePdf } from "@/lib/resume/service";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const guard = await requireAdmin(request, "upload", 12);
  if ("error" in guard) return guard.error;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return apiError(400, "invalid_form", "Expected multipart form data with a PDF file.");
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return apiError(400, "missing_file", "Attach a PDF in the 'file' field.");
  }

  const result = await uploadResumePdf(file);
  if (!result.ok) return apiError(result.status, "upload_failed", result.message);

  return Response.json({ version: result.version }, { status: 201, headers: noStoreHeaders() });
}
