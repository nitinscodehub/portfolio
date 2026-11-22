"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Award, ExternalLink, Image as ImageIcon, ShieldCheck, Trophy, X } from "lucide-react";
import { achievements, achievementCategories, verificationLabels, type Achievement } from "@/data/achievements";
import { cn } from "@/lib/utils";

export default function AchievementHall() {
  const [filter, setFilter] = useState<string>("all");
  const [preview, setPreview] = useState<Achievement | null>(null);

  const visible = filter === "all" ? achievements : achievements.filter((item) => item.category === filter);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter achievements">
        {achievementCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setFilter(category.id)}
            className={cn("chip transition-colors", filter === category.id ? "chip-gold" : "hover:text-ink")}
            aria-pressed={filter === category.id}
          >
            {category.label}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((item, index) => (
            <motion.article
              layout
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.2) }}
              className="gold-panel panel-hover group flex min-h-[20rem] flex-col p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-11 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                  {item.category === "competitive" ? <Trophy className="size-5" /> : <Award className="size-5" />}
                </span>
                <span className="chip chip-gold">{item.year}</span>
              </div>

              <p className="mt-6 font-display text-2xl font-bold text-gold-gradient">{item.rank}</p>
              <h3 className="mt-2 font-display text-base font-bold leading-snug text-ink">{item.title}</h3>
              <p className="mt-1 text-[11px] font-medium text-muted">{item.organization}</p>
              <p className="pretty mt-4 flex-1 text-xs leading-relaxed text-muted">{item.description}</p>

              {item.note && <p className="mt-3 border-l border-gold/30 pl-3 text-[10px] leading-relaxed text-dim">{item.note}</p>}

              <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-gold/15 pt-4 text-[10px]">
                <span className="inline-flex items-center gap-1 text-gold/80">
                  <ShieldCheck className="size-3" /> {verificationLabels[item.verification]}
                </span>
                {item.certificateImage && (
                  <button type="button" onClick={() => setPreview(item)} className="inline-flex items-center gap-1 text-muted hover:text-gold">
                    <ImageIcon className="size-3" /> Certificate
                  </button>
                )}
                {item.evidenceUrl && (
                  <a href={item.evidenceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-gold">
                    <ExternalLink className="size-3" /> Evidence
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {preview?.certificateImage && (
          <motion.div
            className="fixed inset-0 z-[85] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button type="button" aria-label="Close certificate preview" onClick={() => setPreview(null)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.96, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: 8 }}
              className="panel relative max-h-[88vh] w-full max-w-4xl overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label={`${preview.title} certificate`}
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
                <div>
                  <p className="font-display text-sm font-bold">{preview.title}</p>
                  <p className="text-[11px] text-dim">{preview.organization} · {preview.year}</p>
                </div>
                <button type="button" onClick={() => setPreview(null)} aria-label="Close" className="grid size-8 place-items-center rounded-lg border border-white/10 text-muted hover:text-ink">
                  <X className="size-4" />
                </button>
              </div>
              <div className="max-h-[72vh] overflow-auto bg-white/[0.03] p-4">
                <Image
                  src={preview.certificateImage}
                  alt={`Certificate for ${preview.title}`}
                  width={1400}
                  height={990}
                  className="mx-auto h-auto w-full max-w-3xl rounded-lg border border-white/10"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
