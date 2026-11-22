import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import { footerItems } from "@/data/nav";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";

export default function SiteFooter() {
  return (
    <footer className="relative mt-10 border-t border-white/[0.07] bg-[#05070c]">
      <div className="grad-line absolute inset-x-0 top-0" />
      <div className="shell py-14 sm:py-20">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg border border-cyan/40 bg-cyan/10 font-display text-sm font-bold text-cyan">
                ND
              </span>
              <div>
                <p className="font-display text-sm font-bold tracking-[0.14em]">{profile.name.toUpperCase()}</p>
                <p className="text-[10px] tracking-[0.22em] text-dim">BEYOND THE CODE</p>
              </div>
            </div>
            <p className="pretty mt-6 max-w-sm text-sm leading-relaxed text-muted">{profile.heroTagline}</p>
            <p className="mt-2 text-xs text-dim">{profile.location}</p>
          </div>

          <div>
            <p className="eyebrow mb-5">Explore</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-1">
              {footerItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[13px] text-muted transition-colors hover:text-cyan">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Elsewhere</p>
            <ul className="flex flex-col gap-2.5">
              {socials.slice(0, 6).map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between text-[13px] text-muted transition-colors hover:text-cyan"
                  >
                    <span>{item.label}</span>
                    <span className="text-[11px] text-dim transition-colors group-hover:text-cyan">{item.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/[0.07] pt-6 text-[11px] text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href={socials[0]!.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-ink">
              <Github className="size-3.5" /> Source
            </a>
            <a href="#main" className="inline-flex items-center gap-1.5 hover:text-ink">
              Back to top <ArrowUp className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
