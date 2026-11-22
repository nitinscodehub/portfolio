"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { experiences, experienceKindLabels, type Experience } from "@/data/experience";
import { cn } from "@/lib/utils";

const filters = ["all", "role", "internship", "leadership", "freelance", "content"];

export default function ExperienceTimeline() {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<string | null>(experiences[0]?.id ?? null);
  const visible = filter === "all" ? experiences : experiences.filter((item) => item.kind === filter);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter experience">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            aria-pressed={filter === item}
            className={cn("chip transition-colors", filter === item ? "chip-active" : "hover:text-ink")}
          >
            {item === "all" ? "All roles" : experienceKindLabels[item as Experience["kind"]]}
          </button>
        ))}
      </div>

      <div className="relative mt-12">
        <div className="absolute left-[19px] top-0 hidden h-full w-px bg-gradient-to-b from-cyan via-violet/60 to-transparent sm:block" />
        <div className="space-y-5">
          {visible.map((item, index) => {
            const expanded = open === item.id;
            return (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25) }}
                className="relative sm:pl-14"
              >
                <span className="absolute left-3 top-7 hidden size-3.5 -translate-x-1/2 rounded-full border-2 border-cyan bg-bg shadow-[0_0_12px_rgba(0,217,255,0.65)] sm:block" />
                <div className="panel overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpen(expanded ? null : item.id)}
                    aria-expanded={expanded}
                    className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="chip">{experienceKindLabels[item.kind]}</span>
                        <span className="text-[11px] text-dim">{item.period}</span>
                      </div>
                      <h3 className="mt-3 font-display text-lg font-bold text-ink sm:text-xl">{item.role}</h3>
                      <p className="mt-0.5 text-sm font-medium text-cyan">{item.organization}</p>
                      <p className="mt-1 text-[11px] text-dim">{item.location}</p>
                    </div>
                    <ChevronDown className={cn("mt-1 size-5 shrink-0 text-muted transition-transform", expanded && "rotate-180")} />
                  </button>

                  <AnimatePresence initial={false}>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/[0.07] px-5 pb-6 pt-5 sm:px-6">
                          <p className="pretty text-sm leading-relaxed text-muted">{item.description}</p>
                          <ul className="mt-4 space-y-2">
                            {item.bullets.map((bullet) => (
                              <li key={bullet} className="flex gap-3 text-xs leading-relaxed text-muted">
                                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-cyan" />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                          {item.verificationNote && (
                            <p className="mt-5 rounded-lg border border-gold/20 bg-gold/[0.05] px-3 py-2 text-[11px] leading-relaxed text-gold/80">
                              {item.verificationNote}
                            </p>
                          )}
                          <div className="mt-5 flex flex-wrap items-center gap-4">
                            {item.links?.map((link) => (
                              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-cyan hover:underline">
                                <ExternalLink className="size-3" /> {link.label}
                              </a>
                            ))}
                            {item.certificateImage && (
                              <a href={item.certificateImage} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs text-muted hover:text-cyan">
                                <Image src={item.certificateImage} alt="" width={32} height={24} className="h-6 w-8 rounded border border-white/10 object-cover" />
                                Certificate on file
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  );
}
