import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/ui/PageHero";
import ProjectExplorer from "@/components/projects/ProjectExplorer";
import { projectCounts } from "@/data/projects";

export const metadata: Metadata = {
  title: "Project Archive",
  description: "Search and filter the complete project archive — cybersecurity, full-stack, .NET, mobile apps, AI/ML and more.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Project vault"
        title={<>The complete <span className="text-gradient">build archive.</span></>}
        description="Search by name, technology or category. Original work, private systems and unverified concepts are labelled separately so nothing is misrepresented."
      >
        <div className="mt-9 flex flex-wrap gap-8">
          {[
            { value: projectCounts.total, label: "Projects indexed" },
            { value: projectCounts.original, label: "Original repositories" },
            { value: projectCounts.categories, label: "Categories" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-2xl font-bold text-cyan">{stat.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </PageHero>
      <section className="shell section-pad pt-4">
        <Suspense fallback={<div className="skeleton h-72 rounded-2xl" />}>
          <ProjectExplorer />
        </Suspense>
      </section>
    </>
  );
}
