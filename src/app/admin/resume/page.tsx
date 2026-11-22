import type { Metadata } from "next";
import { ShieldX, LockKeyhole } from "lucide-react";
import { getAuthContext } from "@/lib/supabase/auth";
import { listResumeVersions } from "@/lib/resume/service";
import { resumeWritesEnabled, supabaseAuthConfigured, hasAdminAllowlist } from "@/lib/supabase/config";
import ResumeAdmin from "@/components/resume/ResumeAdmin";
import ResumeSignIn from "@/components/resume/ResumeSignIn";

export const metadata: Metadata = {
  title: "Private Resume Manager",
  description: "Owner-only resume version management.",
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: "/admin/resume" },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

function AdminFrame({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden pb-24 pt-32 sm:pt-40">
      <div className="eng-grid pointer-events-none absolute inset-0" />
      <div className="orb -right-40 top-0 size-[28rem] bg-violet/10" />
      <div className="shell relative">
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <span className="chip border-violet/40 text-violet"><LockKeyhole className="size-3" /> Private area</span>
          <span className="text-[11px] text-dim">Owner-only · Not linked from public navigation</span>
        </div>
        {children}
      </div>
    </section>
  );
}

export default async function AdminResumePage() {
  const auth = await getAuthContext();

  if (!supabaseAuthConfigured || !resumeWritesEnabled) {
    return (
      <AdminFrame>
        <div className="panel max-w-2xl p-7 sm:p-9">
          <span className="grid size-12 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
            <ShieldX className="size-5" />
          </span>
          <h1 className="display mt-6 text-3xl sm:text-4xl">Resume management is locked</h1>
          <p className="pretty mt-4 text-sm leading-relaxed text-muted">
            Write operations are disabled by design until Supabase Auth, the private storage bucket, the database schema and an explicit admin allowlist are configured.
            No insecure uploader is exposed in the meantime.
          </p>
          <div className="mt-6 space-y-2 rounded-xl border border-white/[0.08] bg-bg/60 p-5 text-xs text-muted">
            <p><span className="text-ink">Auth configured:</span> {supabaseAuthConfigured ? "yes" : "no"}</p>
            <p><span className="text-ink">Admin allowlist:</span> {hasAdminAllowlist ? "set" : "empty (deny by default)"}</p>
            <p><span className="text-ink">Writable:</span> {resumeWritesEnabled ? "yes" : "no"}</p>
          </div>
          <p className="mt-6 text-[11px] leading-relaxed text-dim">
            Setup steps are documented in <code className="rounded bg-white/[0.06] px-1.5 py-0.5">README.md</code> and
            <code className="ml-1 rounded bg-white/[0.06] px-1.5 py-0.5">supabase/migrations/0001_resume_system.sql</code>.
          </p>
        </div>
      </AdminFrame>
    );
  }

  if (auth.status === "unauthenticated") {
    return (
      <AdminFrame>
        <ResumeSignIn />
      </AdminFrame>
    );
  }

  if (auth.status === "forbidden" || auth.status === "not-configured") {
    return (
      <AdminFrame>
        <div className="panel max-w-xl p-8">
          <span className="grid size-12 place-items-center rounded-xl border border-red-400/30 bg-red-400/10 text-red-300">
            <ShieldX className="size-5" />
          </span>
          <h1 className="display mt-6 text-3xl">403 — Not authorized</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            This account is signed in but is not on the resume administrator allowlist. Read-only portfolio access is unchanged.
          </p>
        </div>
      </AdminFrame>
    );
  }

  const versions = await listResumeVersions();
  return (
    <AdminFrame>
      <ResumeAdmin initialVersions={versions} userEmail={auth.user.email ?? "Administrator"} />
    </AdminFrame>
  );
}
