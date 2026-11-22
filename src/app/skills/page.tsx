import type { Metadata } from "next";
import { Layers3 } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = {
  title: "Technical Skills",
  description: "Languages, frameworks, security tooling and platforms used across Nitin Dhurve's projects.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return (
    <>
      <PageHero
        eyebrow="Technical skills"
        title={<>A toolkit spanning <span className="text-gradient">eight domains.</span></>}
        description="Grouped by how the skills are actually used. No invented proficiency scores — the work and repositories speak for themselves."
      />
      <section className="shell section-pad pt-4">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} delay={index * 0.05}>
              <div className="panel panel-hover group flex h-full flex-col p-6">
                <div className="flex items-start justify-between">
                  <span className="grid size-10 place-items-center rounded-xl border border-cyan/20 bg-cyan/[0.06] text-cyan transition-colors group-hover:border-violet/40 group-hover:text-violet">
                    <Layers3 className="size-4" />
                  </span>
                  <span className="font-display text-3xl font-bold text-white/[0.05]">0{index + 1}</span>
                </div>
                <h2 className="mt-5 font-display text-lg font-bold text-ink">{group.title}</h2>
                <p className="mt-2 text-xs leading-relaxed text-muted">{group.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/[0.07] pt-5">
                  {group.skills.map((skill) => (
                    <span key={skill} className="rounded-lg border border-white/[0.08] bg-white/[0.02] px-2.5 py-1.5 text-[11px] text-muted transition-colors hover:border-cyan/30 hover:text-cyan">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="panel flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="eyebrow">How to read this</p>
              <p className="pretty mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                These are technologies used across shipped projects, internships and research — not a claim of mastery in each.
                Individual case studies show the context and depth behind every tool.
              </p>
            </div>
            <span className="shrink-0 text-[11px] text-dim">Last reviewed · Nov 2026</span>
          </div>
        </Reveal>
      </section>
    </>
  );
}
