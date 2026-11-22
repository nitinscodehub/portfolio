import { z } from "zod";
import { MAX_PDF_BYTES } from "@/lib/supabase/config";

export const publishSchema = z.object({
  id: z.string().uuid(),
  action: z.enum(["publish", "restore"]).default("publish"),
});

export type PublishInput = z.infer<typeof publishSchema>;

export const SIGN_IN_SCHEMA = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(200),
});

export class PdfValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PdfValidationError";
  }
}

export function safeFileName(name: string) {
  const base = name.split(/[\\/]/).pop() ?? "resume.pdf";
  const clean = base.replace(/[^\w.\- ]/g, "").trim().slice(0, 120);
  return clean.length > 0 && clean.toLowerCase().endsWith(".pdf") ? clean : `${clean || "resume"}.pdf`;
}

/** Checks MIME, size and the actual `%PDF-` magic bytes — never trusts the extension. */
export async function validatePdf(file: File) {
  if (!file || typeof file.arrayBuffer !== "function") {
    throw new PdfValidationError("A PDF file is required.");
  }
  if (file.size <= 0) throw new PdfValidationError("The uploaded file is empty.");
  if (file.size > MAX_PDF_BYTES) throw new PdfValidationError("PDFs must be 10 MB or smaller.");

  const type = (file.type || "").toLowerCase();
  if (type && type !== "application/pdf" && type !== "application/octet-stream") {
    throw new PdfValidationError("Only PDF files are accepted.");
  }

  const head = new Uint8Array(await file.slice(0, 8).arrayBuffer());
  const signature = String.fromCharCode(...head);
  if (!signature.startsWith("%PDF-")) {
    throw new PdfValidationError("The file does not have a valid PDF signature.");
  }

  return file;
}
