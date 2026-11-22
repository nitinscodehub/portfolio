import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { journey } from "@/data/journey";

export const metadata: Metadata = {
  title: "Engineering Journey",
  description: "How Nitin Dhurve moved from CTFs and coursework into security research and product engineering.",
  alternates: { canonical: "/journey" },
};

export default function JourneyPage() {
  return (
    <>
      <PageHero
        eyebrow="Engineering journey"
        title={<>Every chapter <span className="text-gradient">added a layer.</span></>}
        description="A condensed narrative of how security, algorithms, research and product work came together."
      />
      <section className="shell section-pad pt-4">
        <div className="relative">
          <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-cyan via-violet to-gold/30 sm:block" />
          <div className="space-y-6">
            {journey.map((item, index) => (
              <Reveal key={item.year} delay={index * 0.06}>
                <div className="relative rounded-2xl border border-white/[0.08] bg-surface/40 p-6 sm:ml-14 sm:p-8">
                  <span className="absolute -left-[38px] top-9 hidden size-4 -translate-x-1/2 rounded-full border-2 border-cyan bg-bg shadow-[0_0_16px_rgba(0,217,255,0.6)] sm:block" />
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-display text-2xl font-bold text-cyan">{item.year}</span>
                    <span className="h-px w-10 bg-white/10" />
                    <h2 className="font-display text-xl font-bold text-ink">{item.title}</h2>
                  </div>
                  <p className="pretty mt-4 max-w-3xl text-sm leading-relaxed text-muted">{item.body}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="chip">{tag}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
