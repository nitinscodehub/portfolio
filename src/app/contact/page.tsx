import type { Metadata } from "next";
import { ArrowUpRight, Globe2, MapPin, ShieldCheck } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { socials, type Social } from "@/data/socials";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact & Social Profiles",
  description: "Connect with Nitin Dhurve across GitHub, LinkedIn, LeetCode, HackerOne, Contra and more.",
  alternates: { canonical: "/contact" },
};

const icons = {
  github: "GH",
  linkedin: "in",
  leetcode: "LC",
  hackerrank: "HR",
  hackerone: "H1",
  contra: "CO",
  globe: "WWW",
} satisfies Record<Social["kind"], string>;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s connect where <span className="text-gradient">the work lives.</span></>}
        description="The most reliable way to reach me is through the professional profiles below. No email address is published here to avoid stale contact details."
      />
      <section className="shell section-pad pt-4">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="panel h-full p-7">
              <p className="eyebrow">Quick facts</p>
              <div className="mt-6 space-y-5">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-cyan" />
                  <div>
                    <p className="text-xs font-semibold text-ink">Based in {profile.location}</p>
                    <p className="mt-1 text-[11px] text-muted">{profile.availability}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold" />
                  <div>
                    <p className="text-xs font-semibold text-ink">Security-first practice</p>
                    <p className="mt-1 text-[11px] text-muted">All security work is presented as authorized, defensive research.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Globe2 className="mt-0.5 size-4 shrink-0 text-violet" />
                  <div>
                    <p className="text-xs font-semibold text-ink">Open to collaboration</p>
                    <p className="mt-1 text-[11px] text-muted">Security, full-stack, .NET, Flutter and AI/ML projects.</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-3 sm:grid-cols-2">
              {socials.map((social, index) => (
                <SocialCard key={social.href} href={social.href} index={index} social={social} />
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function SocialCard({ href, index, social }: { href: string; index: number; social: Social }) {
  return (
    <Reveal delay={Math.min(index * 0.04, 0.25)}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="panel panel-hover group flex h-full items-center gap-4 p-5"
      >
        <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-cyan/20 bg-cyan/[0.06] font-display text-xs font-bold text-cyan transition-colors group-hover:border-violet/40 group-hover:text-violet">
          {icons[social.kind]}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-sm font-bold text-ink">{social.label}</span>
          <span className="block truncate text-[11px] text-muted">{social.handle}</span>
        </span>
        <ArrowUpRight className="size-4 shrink-0 text-dim transition-colors group-hover:text-cyan" />
      </a>
    </Reveal>
  );
}
