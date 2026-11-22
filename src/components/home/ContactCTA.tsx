import Link from "next/link";
import { ArrowUpRight, Mail, MessageSquare } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { socials } from "@/data/socials";

export default function ContactCTA() {
  return (
    <section className="section-pad relative overflow-hidden border-t border-white/[0.07]">
      <div className="orb left-1/2 top-0 size-[34rem] -translate-x-1/2 bg-violet/10" />
      <div className="shell relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Let&apos;s build something meaningful</p>
          <h2 className="display mt-5 text-4xl sm:text-5xl lg:text-6xl">
            Have a problem worth <span className="text-gradient">solving together?</span>
          </h2>
          <p className="pretty mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
            Whether it is a security assessment, a full-stack platform, a mobile app or an intelligent system —
            I&apos;d like to hear what you are building.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-primary">
              <Mail className="size-4" /> Get in touch
            </Link>
            <a
              href={socials.find((item) => item.kind === "linkedin")!.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <MessageSquare className="size-4" /> LinkedIn <ArrowUpRight className="size-3" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
