import "server-only";

import { createHash, randomUUID } from "node:crypto";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { RESUME_BUCKET } from "@/lib/supabase/config";
import { PdfValidationError, safeFileName, validatePdf } from "./validation";

export type ResumeVersion = {
  id: string;
  storage_key: string;
  original_filename: string;
  file_size: number;
  mime_type: string;
  version: number;
  is_active: boolean;
  checksum: string | null;
  uploaded_by: string | null;
  uploaded_at: string;
};

const columns = "id, storage_key, original_filename, file_size, mime_type, version, is_active, checksum, uploaded_by, uploaded_at";

export async function getActiveResume(): Promise<ResumeVersion | null> {
  const admin = createSupabaseAdminClient();
  if (!admin) return null;

  const { data, error } = await admin
    .from("resume_versions")
    .select(columns)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("Failed to read active resume:", error.message);
    return null;
  }
  return (data as ResumeVersion | null) ?? null;
}

export async function listResumeVersions(): Promise<ResumeVersion[]> {
  const admin = createSupabaseAdminClient();
  if (!admin) return [];

  const { data, error } = await admin
    .from("resume_versions")
    .select(columns)
    .order("version", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Failed to list resume versions:", error.message);
    return [];
  }
  return (data as ResumeVersion[]) ?? [];
}

export async function getResumeVersion(id: string): Promise<ResumeVersion | null> {
  const admin = createSupabaseAdminClient();
  if (!admin) return null;
  const { data, error } = await admin.from("resume_versions").select(columns).eq("id", id).maybeSingle();
  if (error || !data) return null;
  return data as ResumeVersion;
}

export type UploadResult = { ok: true; version: ResumeVersion } | { ok: false; status: number; message: string };

export async function uploadResumePdf(file: File, actorId: string): Promise<UploadResult> {
  const admin = createSupabaseAdminClient();
  if (!admin) return { ok: false, status: 503, message: "Resume storage is not configured." };

  let validated: File;
  try {
    validated = await validatePdf(file);
  } catch (error) {
    return {
      ok: false,
      status: 400,
      message: error instanceof PdfValidationError ? error.message : "Invalid PDF file.",
    };
  }

  const buffer = Buffer.from(await validated.arrayBuffer());
  const checksum = createHash("sha256").update(buffer).digest("hex");
  const storageKey = `resumes/${randomUUID()}.pdf`;
  const originalFilename = safeFileName(validated.name);

  const { error: uploadError } = await admin.storage.from(RESUME_BUCKET).upload(storageKey, buffer, {
    contentType: "application/pdf",
    cacheControl: "3600",
    upsert: false,
  });

  if (uploadError) {
    console.error("Resume upload failed:", uploadError.message);
    return { ok: false, status: 502, message: "Storage upload failed. No version was created." };
  }

  const { data, error: insertError } = await admin.rpc("create_resume_version", {
    p_storage_key: storageKey,
    p_original_filename: originalFilename,
    p_file_size: buffer.byteLength,
    p_checksum: checksum,
    p_uploaded_by: actorId,
  });

  if (insertError || !data) {
    await admin.storage.from(RESUME_BUCKET).remove([storageKey]);
    console.error("Resume version record failed:", insertError?.message ?? "no row returned");
    return { ok: false, status: 502, message: "Could not create the resume version. Upload rolled back." };
  }

  return { ok: true, version: data as ResumeVersion };
}

export async function publishResumeVersion(id: string, actorId: string, action: "publish" | "restore") {
  const admin = createSupabaseAdminClient();
  if (!admin) return { ok: false as const, status: 503, message: "Resume storage is not configured." };

  const { data, error } = await admin.rpc("publish_resume_version", {
    p_id: id,
    p_actor: actorId,
    p_action: action,
  });

  if (error || data !== true) {
    return {
      ok: false as const,
      status: error?.message?.includes("NOT_FOUND") ? 404 : 502,
      message: error?.message ?? "Could not publish this version.",
    };
  }
  return { ok: true as const };
}

export async function deleteResumeVersion(id: string, actorId: string) {
  const admin = createSupabaseAdminClient();
  if (!admin) return { ok: false as const, status: 503, message: "Resume storage is not configured." };

  const { data, error } = await admin.rpc("delete_resume_version", { p_id: id, p_actor: actorId });
  if (error) {
    const message = error.message ?? "Could not delete this version.";
    const status = message.includes("ACTIVE_VERSION") ? 409 : message.includes("NOT_FOUND") ? 404 : 502;
    return { ok: false as const, status, message };
  }

  const storageKey = typeof data === "string" ? data : "";
  if (storageKey) {
    const { error: removeError } = await admin.storage.from(RESUME_BUCKET).remove([storageKey]);
    if (removeError) console.error("Orphaned resume file after delete:", removeError.message);
  }
  return { ok: true as const };
}

export async function downloadActiveResume() {
  const active = await getActiveResume();
  const admin = createSupabaseAdminClient();
  if (!active || !admin) return null;

  const { data, error } = await admin.storage.from(RESUME_BUCKET).download(active.storage_key);
  if (error || !data) {
    console.error("Resume download failed:", error?.message ?? "no data");
    return null;
  }

  const blob = data as Blob;
  const bytes = Buffer.from(await blob.arrayBuffer());
  return {
    bytes,
    filename: active.original_filename,
    version: active.version,
    updatedAt: active.uploaded_at,
    size: bytes.byteLength,
  };
}
