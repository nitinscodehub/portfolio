/**
 * Server-only configuration for the resume management system.
 * Never expose SUPABASE_SERVICE_ROLE_KEY through a NEXT_PUBLIC_ variable.
 */
const readList = (value: string | undefined) =>
  (value ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

export const supabaseEnv = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
};

export const supabaseAuthConfigured = Boolean(supabaseEnv.url && supabaseEnv.anonKey);
export const supabaseAdminConfigured = Boolean(
  supabaseEnv.url && supabaseEnv.anonKey && supabaseEnv.serviceRoleKey,
);

export const adminAllowlist = {
  ids: new Set(readList(process.env.RESUME_ADMIN_IDS)),
  emails: new Set(readList(process.env.RESUME_ADMIN_EMAILS)),
};

export const hasAdminAllowlist = adminAllowlist.ids.size > 0 || adminAllowlist.emails.size > 0;

/**
 * Deny by default. Uploads, publishing, restores and deletes are unreachable
 * until every piece of infrastructure and an explicit admin identity exists.
 */
export const resumeWritesEnabled =
  supabaseAuthConfigured && supabaseAdminConfigured && hasAdminAllowlist;

export const RESUME_BUCKET = "resumes";
export const MAX_PDF_BYTES = 10 * 1024 * 1024;
