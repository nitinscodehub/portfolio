import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ExperienceTimeline from "@/components/experience/ExperienceTimeline";
import { experiences } from "@/data/experience";

export const metadata: Metadata = {
  title: "Professional Experience",
  description: "Roles, internships, research and leadership work across cybersecurity, data and product engineering.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageHero
        eyebrow="Professional experience"
        title={<>A career timeline built on <span className="text-gradient">range and depth.</span></>}
        description="From authorized security research and dataset quality to managed .NET systems and freelance product work. Open any role for responsibilities and evidence."
      >
        <p className="mt-8 text-xs text-dim">{experiences.length} entries · 2023 – Present · India / Remote</p>
      </PageHero>
      <section className="shell section-pad pt-4">
        <ExperienceTimeline />
      </section>
    </>
  );
}
