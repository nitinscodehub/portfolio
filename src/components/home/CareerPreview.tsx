import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { experiences } from "@/data/experience";

const preview = experiences.slice(0, 4);

export default function CareerPreview() {
  return (
    <section className="section-pad relative">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Career timeline"
            title={<>The work behind <span className="text-gradient">the headline.</span></>}
            description="Internships, research, leadership and product work — with dates and scope kept deliberately precise."
          />
          <Link href="/experience" className="btn btn-ghost">
            Full timeline <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="relative mt-14">
          <div className="absolute left-[7px] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-cyan via-violet to-transparent sm:block" />
          <div className="space-y-4">
            {preview.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.06}>
                <div className="relative flex gap-6 rounded-2xl border border-white/[0.07] bg-surface/40 p-5 transition-colors hover:border-cyan/25 sm:ml-6 sm:p-6">
                  <span className="absolute -left-[26px] top-8 hidden size-3.5 rounded-full border-2 border-cyan bg-bg shadow-[0_0_14px_rgba(0,217,255,0.7)] sm:block" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="chip">{item.kind}</span>
                      <span className="text-[11px] text-dim">{item.period}</span>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold text-ink">{item.role}</h3>
                    <p className="text-xs font-medium text-cyan">{item.organization}</p>
                    <p className="pretty mt-2 text-xs leading-relaxed text-muted">{item.description}</p>
                  </div>
                  <span className="hidden font-display text-4xl font-bold text-white/[0.04] sm:block">0{index + 1}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
