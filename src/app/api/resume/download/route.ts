import { apiError, noStoreHeaders } from "@/lib/http";
import { getActiveDownload } from "@/lib/resume/service";

export const dynamic = "force-dynamic";

/** Stable public URL. Always resolves to the currently published version. */
export async function GET(request: Request) {
  const file = await getActiveDownload();
  if (!file) {
    return apiError(404, "no_resume", "No resume has been published yet.");
  }

  const inline = new URL(request.url).searchParams.get("inline") === "1";
  return new Response(null, {
    status: 302,
    headers: {
      ...noStoreHeaders(),
      Location: inline ? file.url : file.downloadUrl,
      "X-Resume-Version": String(file.version),
    },
  });
}
