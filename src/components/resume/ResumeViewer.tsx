"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  Moon,
  RefreshCw,
  ShieldCheck,
  Sun,
} from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { cn, formatBytes, formatDate } from "@/lib/utils";

export type ResumeMeta = {
  id: string;
  version: number;
  filename: string;
  size: number;
  uploadedAt: string;
};

export default function ResumeViewer({ meta }: { meta: ResumeMeta | null }) {
  const reduce = useReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: light)");
    const apply = () => setTheme(query.matches ? "light" : "dark");
    requestAnimationFrame(apply);
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return (
    <div data-theme={theme} className="resume-theme">
      <div className="mb-5 flex justify-end">
        <button
          type="button"
          onClick={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
          className="btn btn-ghost"
          aria-label={theme === "dark" ? "Switch résumé theme to light" : "Switch résumé theme to dark"}
        >
          {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="panel relative overflow-hidden p-6 sm:p-7"
        >
          <div className="absolute -right-16 -top-16 size-44 rounded-full bg-cyan/10 blur-3xl" />
          <div className="relative flex items-center justify-between">
            <span className="grid size-12 place-items-center rounded-xl border border-cyan/30 bg-cyan/10 text-cyan">
              <FileText className="size-5" />
            </span>
            <span className="chip border-cyan/30 text-cyan">PDF · Live</span>
          </div>

          <h2 className="relative mt-6 font-display text-2xl font-bold text-ink">Current résumé</h2>
          <p className="mt-1 text-xs text-muted">Published version and download endpoint</p>

          {meta ? (
            <>
              <dl className="relative mt-7 space-y-4 border-t border-white/[0.07] pt-6 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[11px] uppercase tracking-wider text-dim">Version</dt>
                  <dd className="font-display font-semibold text-cyan">v{meta.version}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[11px] uppercase tracking-wider text-dim">File</dt>
                  <dd className="max-w-[60%] truncate text-right text-xs text-ink" title={meta.filename}>{meta.filename}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[11px] uppercase tracking-wider text-dim">Size</dt>
                  <dd className="text-xs text-ink">{formatBytes(meta.size)}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-[11px] uppercase tracking-wider text-dim">Updated</dt>
                  <dd className="text-right text-xs text-ink">{formatDate(meta.uploadedAt)}</dd>
                </div>
              </dl>

              <p className="relative mt-6 flex items-start gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] p-3 text-[11px] leading-relaxed text-emerald-200/80">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0" />
                This is the active version served by the stable download link. Updating it never requires a redeploy.
              </p>

              <div className="relative mt-7 flex flex-col gap-3">
                <MagneticButton href="/api/resume/download" external variant="primary" className="w-full">
                  <Download className="size-4" /> Download latest PDF
                </MagneticButton>
                <MagneticButton href="/api/resume/download?inline=1" external className="w-full">
                  <ExternalLink className="size-4" /> Open in new tab
                </MagneticButton>
              </div>
            </>
          ) : (
            <div className="relative mt-7">
              <p className="pretty text-sm leading-relaxed text-muted">
                No résumé has been published yet. The viewer and download endpoint will activate as soon as the owner uploads and publishes a PDF.
              </p>
              <div className="mt-6 rounded-xl border border-dashed border-white/15 p-6 text-center">
                <FileText className="mx-auto size-7 text-dim" />
                <p className="mt-3 text-xs font-semibold text-muted">Awaiting first publication</p>
                <p className="mt-1 text-[11px] text-dim">No placeholder résumé is shown.</p>
              </div>
            </div>
          )}

          <p className="relative mt-7 flex items-center gap-2 border-t border-white/[0.07] pt-5 text-[10px] text-dim">
            <ShieldCheck className="size-3.5" /> Read-only public access · admin controls are private
          </p>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={cn("panel relative min-h-[36rem] overflow-hidden", theme === "light" && "bg-white")}
        >
          {meta ? (
            <>
              {!loaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-surface">
                  <RefreshCw className="size-5 animate-spin text-cyan" />
                  <p className="text-xs text-muted">Loading PDF preview…</p>
                </div>
              )}
              <iframe
                src="/api/resume/download?inline=1"
                title="Résumé PDF preview"
                onLoad={() => setLoaded(true)}
                className="h-[36rem] w-full border-0 bg-white sm:h-[54rem]"
              />
            </>
          ) : (
            <div className="flex h-full min-h-[36rem] flex-col items-center justify-center p-10 text-center">
              <span className="grid size-16 place-items-center rounded-2xl border border-white/10 bg-white/[0.02] text-dim">
                <FileText className="size-7" />
              </span>
              <h3 className="mt-6 font-display text-xl font-bold text-ink">No document to preview</h3>
              <p className="pretty mt-3 max-w-sm text-sm leading-relaxed text-muted">
                Once a PDF is published from the private admin dashboard, its preview will appear here automatically.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
