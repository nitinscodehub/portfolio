import { apiError, noStoreHeaders } from "@/lib/http";
import { downloadActiveResume } from "@/lib/resume/service";

export const dynamic = "force-dynamic";

/** Stable public URL. Always resolves to the currently published version. */
export async function GET(request: Request) {
  const file = await downloadActiveResume();
  if (!file) {
    return apiError(404, "no_resume", "No resume has been published yet.");
  }

  const inline = new URL(request.url).searchParams.get("inline") === "1";
  const safeName = file.filename.replace(/["\r\n]/g, "").replace(/[^\w.\- ]/g, "");
  return new Response(new Uint8Array(file.bytes), {
    headers: {
      ...noStoreHeaders(),
      "Content-Type": "application/pdf",
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${safeName}"`,
      "Content-Length": String(file.size),
      "X-Resume-Version": String(file.version),
    },
  });
}
