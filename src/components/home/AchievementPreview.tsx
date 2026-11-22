import Link from "next/link";
import { ArrowUpRight, Trophy } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { achievements, verificationLabels } from "@/data/achievements";

const highlightIds = ["terrier-cyber-quest-2025", "cybercuj-ctf-2024", "eyantra-merit"];
const highlights = highlightIds.map((id) => achievements.find((item) => item.id === id)!).filter(Boolean);

export default function AchievementPreview() {
  return (
    <section className="section-pad relative overflow-hidden border-y border-white/[0.06] bg-[#080b12]">
      <div className="orb right-0 top-10 size-[26rem] bg-gold/[0.07]" />
      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            gold
            eyebrow="Hall of achievements"
            title={<>Competition is where <span className="text-gold-gradient">judgement gets built.</span></>}
            description="CTFs, hackathons and merit certificates — presented with explicit verification status so nothing is overstated."
          />
          <Link href="/achievements" className="btn btn-ghost border-gold/30 text-gold hover:border-gold/60">
            Enter the hall <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {highlights.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08}>
              <div className="gold-panel panel-hover group h-full p-6">
                <div className="flex items-start justify-between">
                  <span className="grid size-11 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                    <Trophy className="size-5" />
                  </span>
                  <span className="chip chip-gold">{item.year}</span>
                </div>
                <p className="mt-6 font-display text-3xl font-bold text-gold-gradient">{item.rank}</p>
                <h3 className="mt-2 text-sm font-semibold leading-snug text-ink">{item.title}</h3>
                <p className="mt-1 text-[11px] text-dim">{item.organization}</p>
                <p className="mt-4 line-clamp-3 text-xs leading-relaxed text-muted">{item.description}</p>
                <p className="mt-5 border-t border-gold/15 pt-4 text-[10px] uppercase tracking-wider text-gold/70">
                  {verificationLabels[item.verification]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
