import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import AchievementHall from "@/components/achievements/AchievementHall";
import { achievements } from "@/data/achievements";

export const metadata: Metadata = {
  title: "Hall of Achievements",
  description: "Competitive CTF results, hackathon milestones and technical accomplishments with verification status.",
  alternates: { canonical: "/achievements" },
};

export default function AchievementsPage() {
  return (
    <>
      <PageHero
        eyebrow="Hall of achievements"
        title={<>Results, ranked and <span className="text-gold-gradient">honestly documented.</span></>}
        description="Competitive security competitions, hackathons and technical accomplishments. Where official evidence was not supplied, the entry is labelled accordingly rather than implied."
      >
        <div className="mt-10 flex flex-wrap gap-6">
          {[
            { value: String(achievements.filter((item) => item.category === "competitive").length), label: "Competitive results" },
            { value: String(achievements.filter((item) => item.category === "hackathon").length), label: "Hackathon milestones" },
            { value: String(achievements.filter((item) => item.category === "technical").length), label: "Technical accomplishments" },
          ].map((stat) => (
            <div key={stat.label} className="min-w-[9rem] border-l border-gold/40 pl-4">
              <p className="font-display text-3xl font-bold text-gold">{stat.value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="shell section-pad pt-4">
        <AchievementHall />
      </section>
    </>
  );
}
