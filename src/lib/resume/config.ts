/** Server-only configuration for the résumé system. Never expose these as NEXT_PUBLIC_ vars. */

export const MAX_PDF_BYTES = 10 * 1024 * 1024;
export const STORAGE_PATH = "resumes";
export const MANIFEST_PATH = "resume/manifest.json";

export const storageConfigured = Boolean(
  process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN,
);
export const adminPasswordConfigured = Boolean(process.env.RESUME_ADMIN_PASSWORD);
export const sessionSecretConfigured = Boolean(process.env.RESUME_SESSION_SECRET);

/**
 * Public read base for the Blob store. Set explicitly in Vercel so manifest reads
 * never depend on the eventually-consistent Blob list API.
 */
export const blobPublicBaseUrl =
  process.env.BLOB_PUBLIC_BASE_URL ??
  (process.env.BLOB_STORE_ID
    ? `https://${process.env.BLOB_STORE_ID.replace(/^store_/, "").toLowerCase()}.public.blob.vercel-storage.com`
    : "");

/** Deny by default: writes require storage, an admin password and a session signing secret. */
export const resumeWritesEnabled =
  storageConfigured && adminPasswordConfigured && sessionSecretConfigured;
