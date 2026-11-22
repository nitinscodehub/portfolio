"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  CheckCircle2,
  ChevronDown,
  CloudUpload,
  FileText,
  History,
  Loader2,
  LogOut,
  RotateCcw,
  ShieldCheck,
  Trash2,
  Upload,
  X,
  XCircle,
} from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { apiFetchError } from "@/lib/client-api";
import { cn, formatBytes, formatDate } from "@/lib/utils";

type Version = {
  id: string;
  version: number;
  original_filename: string;
  file_size: number;
  is_active: boolean;
  uploaded_at: string;
};

type Toast = { kind: "success" | "error"; message: string };
type Confirm = { kind: "delete" | "publish" | "restore"; target: Version };

const MAX_BYTES = 10 * 1024 * 1024;

export default function ResumeAdmin({ initialVersions, userEmail }: { initialVersions: Version[]; userEmail: string }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const [versions, setVersions] = useState(initialVersions);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [confirm, setConfirm] = useState<Confirm | null>(null);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 5500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const acceptFile = (candidate?: File | null) => {
    if (!candidate) return;
    if (candidate.type && candidate.type !== "application/pdf" && candidate.type !== "application/octet-stream") {
      setToast({ kind: "error", message: "Only PDF files are accepted." });
      return;
    }
    if (!candidate.name.toLowerCase().endsWith(".pdf")) {
      setToast({ kind: "error", message: "The filename must end in .pdf" });
      return;
    }
    if (candidate.size > MAX_BYTES) {
      setToast({ kind: "error", message: "Maximum upload size is 10 MB." });
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(candidate);
    setPreviewUrl(URL.createObjectURL(candidate));
    setToast(null);
  };

  const upload = async () => {
    if (!file) return;
    setBusy("upload");
    setToast(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const response = await fetch("/api/resume/upload", { method: "POST", body: form });
      if (!response.ok) {
        setToast({ kind: "error", message: await apiFetchError(response, "Upload failed.") });
        return;
      }
      const data = (await response.json()) as { version: Version };
      setVersions((current) => [data.version, ...current]);
      setFile(null);
      setPreviewUrl(null);
      setToast({ kind: "success", message: `v${data.version.version} uploaded as a draft. Publish it when ready.` });
      router.refresh();
    } catch {
      setToast({ kind: "error", message: "Network error during upload. Nothing was published." });
    } finally {
      setBusy(null);
    }
  };

  const publishOrRestore = async (target: Version, kind: "publish" | "restore") => {
    setBusy(target.id);
    setToast(null);
    try {
      const response = await fetch(kind === "publish" ? "/api/resume/publish" : "/api/resume/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: target.id, action: kind }),
      });
      if (!response.ok) {
        setToast({ kind: "error", message: await apiFetchError(response, "Could not update the active resume.") });
        return;
      }
      setVersions((current) => current.map((item) => ({ ...item, is_active: item.id === target.id })));
      setToast({
        kind: "success",
        message: kind === "restore" ? `v${target.version} restored as the active resume.` : `v${target.version} is now published.`,
      });
      router.refresh();
    } catch {
      setToast({ kind: "error", message: "Network error. Please retry." });
    } finally {
      setBusy(null);
    }
  };

  const remove = async (target: Version) => {
    setBusy(target.id);
    setToast(null);
    try {
      const response = await fetch(`/api/resume/versions/${target.id}`, { method: "DELETE" });
      if (!response.ok) {
        setToast({ kind: "error", message: await apiFetchError(response, "Could not delete this version.") });
        return;
      }
      setVersions((current) => current.filter((item) => item.id !== target.id));
      setToast({ kind: "success", message: `v${target.version} deleted.` });
    } catch {
      setToast({ kind: "error", message: "Network error. Please retry." });
    } finally {
      setBusy(null);
    }
  };

  const signOut = async () => {
    await fetch("/api/auth/sign-out", { method: "POST" });
    router.refresh();
  };

  const active = versions.find((item) => item.is_active) ?? null;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="eyebrow">Resume manager</p>
          <h1 className="display mt-4 text-3xl sm:text-5xl">Publish without redeploying.</h1>
          <p className="pretty mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            Upload a PDF, preview it, then publish. Previous versions remain available for rollback. Uploads are draft-only until explicitly published.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="chip border-emerald-400/30 text-emerald-300"><ShieldCheck className="size-3" /> {userEmail}</span>
          <button type="button" onClick={signOut} className="btn btn-ghost" aria-label="Sign out">
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className={cn(
              "mt-7 flex items-start gap-3 rounded-xl border p-4 text-xs",
              toast.kind === "success" ? "border-emerald-400/25 bg-emerald-400/[0.06] text-emerald-200" : "border-red-400/25 bg-red-400/[0.06] text-red-200",
            )}
          >
            {toast.kind === "success" ? <CheckCircle2 className="size-4 shrink-0" /> : <XCircle className="size-4 shrink-0" />}
            <span className="flex-1">{toast.message}</span>
            <button type="button" onClick={() => setToast(null)} aria-label="Dismiss notification"><X className="size-3.5" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="panel p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">New version</h2>
            <span className="text-[10px] text-dim">PDF only · max 10 MB</span>
          </div>

          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => {
              event.preventDefault();
              setDragging(false);
              acceptFile(event.dataTransfer.files?.[0]);
            }}
            className={cn(
              "relative mt-6 rounded-2xl border-2 border-dashed p-8 text-center transition-colors",
              dragging ? "border-cyan bg-cyan/[0.07]" : "border-white/15 bg-bg/40",
            )}
          >
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="sr-only"
              onChange={(event) => acceptFile(event.target.files?.[0])}
              aria-label="Choose a PDF résumé"
            />
            <motion.span animate={dragging ? { scale: 1.08 } : { scale: 1 }} className="mx-auto grid size-14 place-items-center rounded-xl border border-cyan/25 bg-cyan/10 text-cyan">
              <CloudUpload className="size-6" />
            </motion.span>
            <p className="mt-4 text-sm font-semibold text-ink">Drop your résumé PDF here</p>
            <p className="mt-1 text-[11px] text-muted">or choose a file from your device</p>
            <button type="button" onClick={() => inputRef.current?.click()} className="btn btn-ghost mt-5">
              <Upload className="size-4" /> Select PDF
            </button>
          </div>

          {file && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden">
              <div className="mt-5 rounded-xl border border-cyan/25 bg-cyan/[0.04] p-4">
                <div className="flex items-center gap-3">
                  <FileText className="size-5 shrink-0 text-cyan" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-semibold text-ink">{file.name}</p>
                    <p className="text-[10px] text-dim">{formatBytes(file.size)} · ready to upload</p>
                  </div>
                  <button type="button" onClick={() => { setFile(null); setPreviewUrl(null); }} aria-label="Remove selected file" className="text-dim hover:text-ink"><X className="size-4" /></button>
                </div>
                {previewUrl && (
                  <iframe src={previewUrl} title="Résumé preview before publishing" className="mt-4 h-64 w-full rounded-lg border border-white/10 bg-white" />
                )}
                <MagneticButton type="button" onClick={upload} variant="primary" disabled={busy === "upload"} className="mt-4 w-full">
                  {busy === "upload" ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
                  {busy === "upload" ? "Uploading…" : "Upload draft version"}
                </MagneticButton>
              </div>
            </motion.div>
          )}

          <p className="mt-5 text-[11px] leading-relaxed text-dim">
            Files are validated server-side (PDF signature and size), stored under randomized keys in Vercel Blob, and never written to the deployment filesystem.
          </p>
        </motion.div>

        <motion.div initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="panel p-5 sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-bold">Version history</h2>
              <p className="mt-1 text-[11px] text-muted">{versions.length} stored version{versions.length === 1 ? "" : "s"}</p>
            </div>
            <button type="button" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded} aria-label="Toggle version history" className="grid size-8 place-items-center rounded-lg border border-white/10 text-muted hover:text-ink">
              <ChevronDown className={cn("size-4 transition-transform", expanded && "rotate-180")} />
            </button>
          </div>

          <div className="mt-5 flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] p-4">
            <CheckCircle2 className="size-5 shrink-0 text-emerald-300" />
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-emerald-200/70">Currently published</p>
              <p className="mt-0.5 truncate text-xs font-semibold text-ink">
                {active ? `v${active.version} · ${active.original_filename}` : "No active resume"}
              </p>
            </div>
          </div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="mt-5 max-h-[30rem] space-y-3 overflow-y-auto pr-1">
                  {versions.length === 0 && (
                    <p className="rounded-xl border border-dashed border-white/10 p-6 text-center text-xs text-dim">No versions yet. Upload a PDF to begin.</p>
                  )}
                  {versions.map((item) => (
                    <div key={item.id} className={cn("rounded-xl border p-4", item.is_active ? "border-emerald-400/25 bg-emerald-400/[0.04]" : "border-white/[0.08] bg-bg/40")}>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <History className="size-3.5 text-muted" />
                          <span className="font-display text-sm font-bold text-ink">v{item.version}</span>
                          {item.is_active && <span className="chip border-emerald-400/30 text-emerald-300">Active</span>}
                        </div>
                        <span className="text-[10px] text-dim">{formatDate(item.uploaded_at)}</span>
                      </div>
                      <p className="mt-2 truncate text-xs text-muted" title={item.original_filename}>{item.original_filename}</p>
                      <p className="mt-1 text-[10px] text-dim">{formatBytes(item.file_size)}</p>
                      <div className="mt-3 flex flex-wrap gap-3 text-[11px] font-semibold">
                        {!item.is_active && (
                          <button type="button" disabled={busy === item.id} onClick={() => setConfirm({ kind: "publish", target: item })} className="inline-flex items-center gap-1 text-cyan hover:underline disabled:opacity-50">
                            <CheckCircle2 className="size-3" /> Publish
                          </button>
                        )}
                        {!item.is_active && (
                          <button type="button" disabled={busy === item.id} onClick={() => setConfirm({ kind: "restore", target: item })} className="inline-flex items-center gap-1 text-gold hover:underline disabled:opacity-50">
                            <RotateCcw className="size-3" /> Restore
                          </button>
                        )}
                        {!item.is_active && (
                          <button type="button" disabled={busy === item.id} onClick={() => setConfirm({ kind: "delete", target: item })} className="inline-flex items-center gap-1 text-red-300 hover:underline disabled:opacity-50">
                            <Trash2 className="size-3" /> Delete
                          </button>
                        )}
                        {busy === item.id && <Loader2 className="size-3 animate-spin text-muted" />}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {confirm && (
          <motion.div className="fixed inset-0 z-[86] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" className="absolute inset-0 bg-black/80 backdrop-blur-sm" aria-label="Cancel" onClick={() => setConfirm(null)} />
            <motion.div role="dialog" aria-modal="true" aria-label="Confirm action" initial={{ scale: 0.96, y: 14 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.97 }} className="panel relative w-full max-w-md p-7">
              <h3 className="font-display text-xl font-bold">
                {confirm.kind === "delete" ? `Delete v${confirm.target.version}?` : confirm.kind === "restore" ? `Restore v${confirm.target.version}?` : `Publish v${confirm.target.version}?`}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {confirm.kind === "delete"
                  ? "This permanently removes the inactive version and its private storage object. Active versions cannot be deleted."
                  : confirm.kind === "restore"
                    ? "This older version becomes the active resume. The previous active version is kept for rollback."
                    : "This version immediately becomes the public resume served by the stable download link."}
              </p>
              <div className="mt-7 flex flex-wrap justify-end gap-3">
                <button type="button" onClick={() => setConfirm(null)} className="btn btn-ghost">Cancel</button>
                <button
                  type="button"
                  onClick={async () => {
                    const action = confirm;
                    setConfirm(null);
                    if (action.kind === "delete") await remove(action.target);
                    else await publishOrRestore(action.target, action.kind);
                  }}
                  className={cn("btn", confirm.kind === "delete" ? "bg-red-500 text-white" : "btn-primary")}
                >
                  Confirm {confirm.kind}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
