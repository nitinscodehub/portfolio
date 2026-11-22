import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, GraduationCap, MapPin, Sparkles } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";

export const metadata: Metadata = {
  title: "About",
  description: `How ${profile.name} approaches engineering, security and product work.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About me"
        title={<>An engineer shaped by <span className="text-gradient">security, systems and craft.</span></>}
        description={profile.secondaryTagline}
      />

      <section className="shell section-pad pt-4">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-white/10">
              <Image src="/images/nitin.png" alt="Nitin Dhurve" fill sizes="(max-width: 1024px) 90vw, 30vw" className="object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <p className="font-display text-lg font-bold">{profile.name}</p>
                <p className="flex items-center gap-1.5 text-[11px] text-muted"><MapPin className="size-3" /> {profile.location}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-6">
              {profile.intro.map((paragraph) => (
                <p key={paragraph} className="pretty text-base leading-relaxed text-muted sm:text-lg">
                  {paragraph}
                </p>
              ))}

              <div className="panel mt-8 p-6">
                <p className="eyebrow">Education</p>
                <div className="mt-4 flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-cyan/25 bg-cyan/10 text-cyan">
                    <GraduationCap className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-bold text-ink">{profile.education.degree}</h2>
                    <p className="mt-1 text-sm text-muted">{profile.education.school}</p>
                    <p className="mt-1 text-xs text-dim">{profile.education.period}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {profile.principles.map((principle) => (
                  <div key={principle.label} className="panel panel-hover h-full p-5">
                    <Sparkles className="size-4 text-violet" />
                    <h3 className="mt-3 font-display text-sm font-bold text-ink">{principle.label}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted">{principle.body}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link href="/experience" className="btn btn-primary">View experience <ArrowUpRight className="size-4" /></Link>
                <Link href="/journey" className="btn btn-ghost">Read the journey</Link>
                <a href={socials.find((item) => item.kind === "linkedin")!.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">LinkedIn <ArrowUpRight className="size-3" /></a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
