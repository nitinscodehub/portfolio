export type ResumeVersion = {
  id: string;
  version: number;
  original_filename: string;
  file_size: number;
  mime_type: string;
  is_active: boolean;
  checksum: string;
  uploaded_by: string;
  uploaded_at: string;
  url: string;
  downloadUrl: string;
};

export type AuditEntry = {
  action: "upload" | "publish" | "restore" | "delete";
  version: string;
  actor: string;
  at: string;
};

export type ResumeManifest = {
  activeId: string | null;
  versions: ResumeVersion[];
  audit: AuditEntry[];
};
