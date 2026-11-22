import "server-only";

import { createHash, randomUUID } from "node:crypto";
import { del, put } from "@vercel/blob";
import { blobPublicBaseUrl, MANIFEST_PATH, STORAGE_PATH, storageConfigured } from "./config";
import type { AuditEntry, ResumeManifest, ResumeVersion } from "./types";
import { PdfValidationError, safeFileName, validatePdf } from "./validation";

export type { ResumeVersion } from "./types";

const ACTOR = "site-owner";

function emptyManifest(): ResumeManifest {
  return { activeId: null, versions: [], audit: [] };
}

/**
 * Reads the manifest directly from its deterministic public URL. We add a fresh
 * cache-buster on every read so a publish is visible immediately, without waiting
 * for the Blob list API or the edge cache to catch up.
 */
async function readManifest(): Promise<ResumeManifest> {
  if (!storageConfigured || !blobPublicBaseUrl) return emptyManifest();
  try {
    const nonce = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const url = `${blobPublicBaseUrl}/${MANIFEST_PATH}?v=${nonce}`;
    const response = await fetch(url, { cache: "no-store" });
    if (response.status === 404) return emptyManifest();
    if (!response.ok) throw new Error(`Manifest fetch returned ${response.status}`);

    const raw = (await response.json()) as Partial<ResumeManifest>;
    if (!raw || !Array.isArray(raw.versions)) return emptyManifest();
    return {
      activeId: typeof raw.activeId === "string" ? raw.activeId : null,
      versions: raw.versions,
      audit: Array.isArray(raw.audit) ? raw.audit : [],
    };
  } catch (error) {
    console.error("Failed to read resume manifest:", error);
    return emptyManifest();
  }
}

async function writeManifest(manifest: ResumeManifest) {
  await put(MANIFEST_PATH, JSON.stringify(manifest), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 60,
  });
}

function withActiveFlag(manifest: ResumeManifest): ResumeVersion[] {
  return [...manifest.versions]
    .map((version) => ({ ...version, is_active: version.id === manifest.activeId }))
    .sort((a, b) => b.version - a.version);
}

function audit(action: AuditEntry["action"], version: string): AuditEntry {
  return { action, version, actor: ACTOR, at: new Date().toISOString() };
}

export async function getActiveResume(): Promise<ResumeVersion | null> {
  const manifest = await readManifest();
  if (!manifest.activeId) return null;
  return withActiveFlag(manifest).find((version) => version.id === manifest.activeId) ?? null;
}

export async function listResumeVersions(): Promise<ResumeVersion[]> {
  return withActiveFlag(await readManifest());
}

export async function getResumeVersion(id: string): Promise<ResumeVersion | null> {
  const manifest = await readManifest();
  return withActiveFlag(manifest).find((version) => version.id === id) ?? null;
}

export type UploadResult =
  | { ok: true; version: ResumeVersion }
  | { ok: false; status: number; message: string };

export async function uploadResumePdf(file: File): Promise<UploadResult> {
  if (!storageConfigured) {
    return { ok: false, status: 503, message: "Resume storage is not configured." };
  }

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
  const id = randomUUID();
  const path = `${STORAGE_PATH}/${id}.pdf`;

  let blob;
  try {
    blob = await put(path, buffer, {
      access: "public",
      contentType: "application/pdf",
      addRandomSuffix: false,
      cacheControlMaxAge: 31536000,
    });
  } catch (error) {
    console.error("Resume upload failed:", error);
    return { ok: false, status: 502, message: "Storage upload failed. No version was created." };
  }

  const manifest = await readManifest();
  const version: ResumeVersion = {
    id,
    version: manifest.versions.reduce((max, item) => Math.max(max, item.version), 0) + 1,
    original_filename: safeFileName(validated.name),
    file_size: buffer.byteLength,
    mime_type: "application/pdf",
    is_active: false,
    checksum,
    uploaded_by: ACTOR,
    uploaded_at: new Date().toISOString(),
    url: blob.url,
    downloadUrl: blob.downloadUrl,
  };

  manifest.versions.push(version);
  manifest.audit.push(audit("upload", version.id));

  try {
    await writeManifest(manifest);
  } catch (error) {
    await del(blob.url).catch(() => undefined);
    console.error("Resume manifest update failed:", error);
    return { ok: false, status: 502, message: "Could not record the version. Upload rolled back." };
  }

  return { ok: true, version };
}

export async function setActiveResumeVersion(id: string, action: "publish" | "restore") {
  if (!storageConfigured) return { ok: false as const, status: 503, message: "Resume storage is not configured." };

  const manifest = await readManifest();
  if (!manifest.versions.some((version) => version.id === id)) {
    return { ok: false as const, status: 404, message: "That version no longer exists." };
  }

  manifest.activeId = id;
  manifest.audit.push(audit(action, id));

  try {
    await writeManifest(manifest);
  } catch (error) {
    console.error("Resume publish failed:", error);
    return { ok: false as const, status: 502, message: "Could not publish this version." };
  }
  return { ok: true as const };
}

export async function deleteResumeVersion(id: string) {
  if (!storageConfigured) return { ok: false as const, status: 503, message: "Resume storage is not configured." };

  const manifest = await readManifest();
  if (manifest.activeId === id) {
    return { ok: false as const, status: 409, message: "The active version cannot be deleted." };
  }
  const target = manifest.versions.find((version) => version.id === id);
  if (!target) return { ok: false as const, status: 404, message: "That version no longer exists." };

  manifest.versions = manifest.versions.filter((version) => version.id !== id);
  manifest.audit.push(audit("delete", id));
  await writeManifest(manifest);
  await del(target.url).catch((error) => console.error("Orphaned resume file after delete:", error));
  return { ok: true as const };
}

export async function getActiveDownload() {
  const active = await getActiveResume();
  if (!active) return null;
  return {
    url: active.url,
    downloadUrl: active.downloadUrl,
    filename: active.original_filename,
    version: active.version,
    updatedAt: active.uploaded_at,
    size: active.file_size,
  };
}
