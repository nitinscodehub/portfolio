import { getActiveResume } from "@/lib/resume/service";
import { noStoreHeaders } from "@/lib/http";

export const dynamic = "force-dynamic";

export async function GET() {
  const active = await getActiveResume();
  return Response.json(
    {
      resume: active
        ? {
            id: active.id,
            version: active.version,
            filename: active.original_filename,
            size: active.file_size,
            uploadedAt: active.uploaded_at,
          }
        : null,
    },
    { headers: noStoreHeaders() },
  );
}
