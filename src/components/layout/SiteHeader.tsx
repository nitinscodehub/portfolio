"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import { navItems } from "@/data/nav";
import { cn } from "@/lib/utils";
import { socials } from "@/data/socials";

const github = socials.find((item) => item.kind === "github")!;
const desktopPrimary = navItems.slice(0, 6);
const desktopMore = navItems.slice(6);

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header className="glass fixed inset-x-0 top-0 z-50 border-b border-white/[0.07]">
        <div className="shell flex h-[var(--nav-h)] items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-3" aria-label="Nitin Dhurve — home">
            <span className="relative grid size-9 place-items-center rounded-lg border border-cyan/40 bg-cyan/10 font-display text-sm font-bold text-cyan">
              ND
              <span className="absolute -inset-px rounded-lg border border-cyan/0 transition-colors group-hover:border-cyan/50" />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-display text-[13px] font-bold tracking-[0.12em] text-ink">NITIN DHURVE</span>
              <span className="text-[9px] font-semibold tracking-[0.22em] text-dim">BEYOND THE CODE</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {desktopPrimary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-[12px] font-medium transition-colors",
                  isActive(item.href) ? "text-cyan" : "text-muted hover:text-ink",
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.span layoutId="nav-active" className="absolute inset-x-3 -bottom-[13px] h-px bg-cyan" />
                )}
              </Link>
            ))}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMore((value) => !value)}
                aria-expanded={more}
                className="rounded-lg px-3 py-2 text-[12px] font-medium text-muted transition-colors hover:text-ink"
              >
                More
              </button>
              <AnimatePresence>
                {more && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-xl border border-white/10 bg-surface/95 p-1.5 shadow-2xl backdrop-blur-xl"
                  >
                    {desktopMore.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMore(false)}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-[12px] transition-colors",
                          isActive(item.href) ? "bg-cyan/10 text-cyan" : "text-muted hover:bg-white/5 hover:text-ink",
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
              aria-label="Open command palette"
              className="grid size-9 place-items-center rounded-lg border border-white/10 text-muted transition-colors hover:border-cyan/40 hover:text-cyan"
            >
              <Search className="size-4" />
            </button>
            <a
              href={github.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in a new tab)"
              className="hidden size-9 place-items-center rounded-lg border border-white/10 text-muted transition-colors hover:border-cyan/40 hover:text-cyan sm:grid"
            >
              <Github className="size-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid size-9 place-items-center rounded-lg border border-white/10 text-ink lg:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="glass fixed inset-0 z-40 flex flex-col pt-[var(--nav-h)] lg:hidden"
          >
            <nav aria-label="Mobile" className="shell flex-1 overflow-y-auto py-8">
              <p className="eyebrow mb-5">Navigate</p>
              <div className="flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.035, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between border-b border-white/[0.06] py-3.5 font-display text-2xl font-semibold",
                        isActive(item.href) ? "text-cyan" : "text-ink",
                      )}
                    >
                      {item.label}
                      <ArrowUpRight className="size-4 text-dim" />
                    </Link>
                  </motion.div>
                ))}
              </div>
              <a
                href={github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost mt-8 w-full justify-between"
              >
                GitHub profile <Github className="size-4" />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
