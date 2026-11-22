import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const apps = [
  { name: "CipherShare", kind: "Encrypted sharing", color: "from-cyan/30 to-blue-600/10", slug: "ciphershare", glyph: "🔒" },
  { name: "Zero-Knowledge Auth", kind: "Passwordless login", color: "from-violet/30 to-fuchsia-600/10", slug: "zero-knowledge-authentication", glyph: "◇" },
  { name: "OneTap Links", kind: "Link manager", color: "from-emerald-400/30 to-teal-600/10", slug: "onetap-links", glyph: "↗" },
  { name: "Cricket Scorer", kind: "Live scoring", color: "from-gold/30 to-orange-600/10", slug: "cricket-scorer", glyph: "◉" },
];

export default function MobileShowcase() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="orb -left-40 top-1/3 size-[26rem] bg-emerald-400/[0.07]" />
      <div className="shell relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Mobile applications"
            title={<>Mobile Applications <span className="text-gradient">I&apos;ve Built</span></>}
            description="Flutter and Dart applications spanning privacy, authentication, utilities and everyday problem-solving."
          />
          <Link href="/projects?category=Mobile%20Apps" className="btn btn-ghost">
            Explore mobile apps <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
          {apps.map((app, index) => (
            <Reveal key={app.name} delay={index * 0.07}>
              <Link href={`/projects/${app.slug}`} className="group block text-center">
                <div className="relative mx-auto aspect-[9/17] w-full max-w-[11rem] rounded-[2rem] border border-white/15 bg-[#0a0e17] p-1.5 shadow-2xl transition-transform duration-500 group-hover:-translate-y-2">
                  <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] border border-white/[0.06]">
                    <div className={`absolute inset-0 bg-gradient-to-br ${app.color}`} />
                    <div className="eng-grid absolute inset-0 opacity-40" />
                    <div className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-black/60" />
                    <div className="absolute inset-x-0 top-10 text-center">
                      <span className="text-2xl" aria-hidden="true">{app.glyph}</span>
                      <p className="mt-3 px-2 font-display text-xs font-bold leading-tight text-ink">{app.name}</p>
                      <p className="mt-1 px-1 text-[9px] text-muted">{app.kind}</p>
                    </div>
                    <div className="absolute inset-x-4 bottom-6 h-1.5 rounded-full bg-white/10">
                      <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-cyan to-violet" />
                    </div>
                  </div>
                </div>
                <p className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-muted transition-colors group-hover:text-cyan">
                  View case study <ArrowUpRight className="size-3" />
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="mx-auto max-w-2xl text-center text-[11px] leading-relaxed text-dim">
            Device frames above are stylised placeholders. No application screenshots or Play Store listings were supplied, so none are claimed.
            Repository links are available on every mobile case study.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
