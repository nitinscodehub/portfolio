import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ResumeViewer, { type ResumeMeta } from "@/components/resume/ResumeViewer";
import { getActiveResume } from "@/lib/resume/service";

export const metadata: Metadata = {
  title: "Résumé",
  description: "View and download the latest published résumé of Nitin Dhurve.",
  alternates: { canonical: "/resume" },
};

export const dynamic = "force-dynamic";

export default async function ResumePage() {
  const active = await getActiveResume();
  const meta: ResumeMeta | null = active
    ? {
        id: active.id,
        version: active.version,
        filename: active.original_filename,
        size: active.file_size,
        uploadedAt: active.uploaded_at,
      }
    : null;

  return (
    <>
      <PageHero
        eyebrow="Résumé"
        title={<>The latest version, <span className="text-gradient">always one link away.</span></>}
        description="A stable public preview and download endpoint for the currently published résumé. No redeployment needed when a new version goes live."
      />
      <section className="shell section-pad pt-4">
        <ResumeViewer meta={meta} />
      </section>
    </>
  );
}
