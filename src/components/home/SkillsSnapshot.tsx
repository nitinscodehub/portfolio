import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { skillGroups } from "@/data/skills";

export default function SkillsSnapshot() {
  return (
    <section className="section-pad relative overflow-hidden border-y border-white/[0.06] bg-surface/20">
      <div className="shell">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Technical toolkit</p>
              <h2 className="display mt-4 max-w-2xl text-3xl sm:text-4xl lg:text-5xl">
                Many layers. <span className="text-gradient">One engineering mindset.</span>
              </h2>
            </div>
            <Link href="/skills" className="btn btn-ghost">
              All skills <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} delay={index * 0.04}>
              <div className="panel panel-hover h-full p-5">
                <h3 className="font-display text-sm font-bold text-ink">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {group.skills.slice(0, 6).map((skill) => (
                    <span key={skill} className="rounded-md border border-white/[0.08] bg-white/[0.02] px-2 py-1 text-[10px] text-muted">
                      {skill}
                    </span>
                  ))}
                  {group.skills.length > 6 && (
                    <span className="rounded-md border border-cyan/20 px-2 py-1 text-[10px] text-cyan">
                      +{group.skills.length - 6}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
