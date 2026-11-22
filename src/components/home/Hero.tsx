"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, Download, FileText } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import EngineeringBackground from "./EngineeringBackground";
import MagneticButton from "@/components/ui/MagneticButton";
import Counter from "@/components/ui/Counter";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";

const github = socials.find((item) => item.kind === "github")!;
const linkedin = socials.find((item) => item.kind === "linkedin")!;

export default function Hero() {
  const [role, setRole] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => setRole((value) => (value + 1) % profile.roles.length), 2600);
    return () => window.clearInterval(timer);
  }, [reduce]);

  return (
    <section id="top" className="relative isolate min-h-[100svh] overflow-hidden pt-[calc(var(--nav-h)+2rem)]">
      <EngineeringBackground />

      <div className="shell relative grid items-center gap-14 pb-16 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:pb-24 lg:pt-16">
        <div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/[0.06] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan"
          >
            <span className="softpulse size-1.5 rounded-full bg-cyan shadow-[0_0_12px_#00d9ff]" />
            {profile.location} · Engineering portfolio 2.0
          </motion.div>

          <h1 className="display mt-8 text-[clamp(3rem,9vw,6.6rem)]">
            <motion.span
              className="block"
              initial={reduce ? false : { opacity: 0, y: 42 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              NITIN
            </motion.span>
            <motion.span
              className="block text-gradient"
              initial={reduce ? false : { opacity: 0, y: 42 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              DHURVE
            </motion.span>
          </h1>

          <motion.p
            className="mt-5 font-display text-lg font-semibold tracking-[0.18em] text-muted sm:text-xl"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
          >
            BEYOND THE CODE
          </motion.p>

          <motion.p
            className="balance mt-7 max-w-2xl text-lg font-medium text-ink sm:text-2xl"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Engineering Software. Securing Systems.{" "}
            <span className="text-cyan">Building What&apos;s Next.</span>
          </motion.p>

          <div className="mt-5 flex min-h-8 items-center gap-2 text-sm text-muted" aria-live="polite">
            <span className="text-dim">Currently as</span>
            <span className="relative inline-grid h-6 min-w-[15rem] overflow-hidden align-middle">
              <AnimatePresence mode="wait">
                <motion.span
                  key={role}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -18 }}
                  transition={{ duration: 0.35 }}
                  className="font-display font-semibold text-violet"
                >
                  {profile.roles[role]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>

          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
          >
            <MagneticButton href="/projects" variant="primary">
              Explore Projects <ArrowUpRight className="size-4" />
            </MagneticButton>
            <MagneticButton href="/achievements" variant="gold">
              View Achievements
            </MagneticButton>
            <MagneticButton href="/resume">
              <FileText className="size-4" /> View Resume
            </MagneticButton>
            <MagneticButton href="/api/resume/download" external>
              <Download className="size-4" /> Download Latest Resume
            </MagneticButton>
            <MagneticButton href={github.href} external>
              <Github className="size-4" /> GitHub
            </MagneticButton>
            <MagneticButton href={linkedin.href} external>
              <Linkedin className="size-4" /> LinkedIn
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-[25rem] lg:max-w-none"
          initial={reduce ? false : { opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[4/5] w-full">
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-cyan/15 via-violet/10 to-transparent blur-2xl" />
            <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/10 bg-surface">
              <Image
                src="/images/nitin.png"
                alt="Portrait of Nitin Dhurve"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 34vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="font-display text-lg font-bold tracking-wide">NITIN DHURVE</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-cyan">Engineer · Researcher · Builder</p>
              </div>
            </div>
            <div className="pointer-events-none absolute -right-3 top-8 rounded-xl border border-cyan/30 bg-bg/90 px-3 py-2 text-[10px] font-bold tracking-[0.16em] text-cyan backdrop-blur">
              SECURE
            </div>
            <div className="pointer-events-none absolute -left-4 bottom-24 rounded-xl border border-gold/30 bg-bg/90 px-3 py-2 text-[10px] font-bold tracking-[0.16em] text-gold backdrop-blur">
              BUILD
            </div>
            <div className="pointer-events-none absolute -right-5 bottom-10 rounded-xl border border-violet/30 bg-bg/90 px-3 py-2 text-[10px] font-bold tracking-[0.16em] text-violet backdrop-blur">
              SHIP
            </div>
          </div>
        </motion.div>
      </div>

      <div className="shell relative grid grid-cols-2 gap-6 border-t border-white/[0.07] py-7 sm:grid-cols-4">
        {profile.verifiedStats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-2xl font-bold text-ink sm:text-3xl">
              <Counter to={Number.parseInt(stat.value, 10)} />
              {stat.value.includes("+") ? "+" : ""}
            </p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted">{stat.label}</p>
            <p className="mt-0.5 hidden text-[10px] text-dim lg:block">{stat.detail}</p>
          </div>
        ))}
      </div>

      <div className="shell relative flex justify-center pb-8">
        <a href="#work" className="group flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-dim transition-colors hover:text-cyan">
          Scroll to explore
          <ArrowDown className="size-4 animate-bounce transition-transform group-hover:translate-y-1" />
        </a>
      </div>
    </section>
  );
}
