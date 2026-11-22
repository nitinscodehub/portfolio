"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Maximize2, X } from "lucide-react";
import { certifications, credentialKindLabels, type Certification } from "@/data/certifications";
import { cn } from "@/lib/utils";

const filters = ["all", "certification", "course", "training"];

export default function CertificateGallery() {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState<Certification | null>(null);
  const visible = filter === "all" ? certifications : certifications.filter((item) => item.kind === filter);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter credentials">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            aria-pressed={filter === item}
            className={cn("chip transition-colors", filter === item ? "chip-active" : "hover:text-ink")}
          >
            {item === "all" ? `All (${certifications.length})` : credentialKindLabels[item as Certification["kind"]]}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((item, index) => (
            <motion.article
              layout
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.38, delay: Math.min(index * 0.03, 0.2) }}
              className="panel panel-hover group overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setActive(item)}
                aria-label={`Preview ${item.title} certificate`}
                className="relative block h-44 w-full overflow-hidden bg-white/[0.04]"
              >
                <Image src={item.image} alt={`${item.title} certificate preview`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top opacity-90 transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
                <span className="absolute bottom-3 right-3 grid size-8 place-items-center rounded-lg border border-white/20 bg-bg/80 text-muted group-hover:text-cyan">
                  <Maximize2 className="size-3.5" />
                </span>
              </button>
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip">{credentialKindLabels[item.kind]}</span>
                  <span className="text-[10px] text-dim">{item.year}</span>
                  {item.score && <span className="chip chip-gold">{item.score}</span>}
                </div>
                <h3 className="mt-3 font-display text-sm font-bold leading-snug text-ink">{item.title}</h3>
                <p className="mt-1 text-[11px] text-cyan">{item.issuer}</p>
                <p className="mt-3 line-clamp-2 text-[11px] leading-relaxed text-muted">{item.detail}</p>
                <p className="mt-4 border-t border-white/[0.07] pt-3 text-[10px] text-dim">{item.verification}</p>
                {item.verifyUrl && (
                  <a href={item.verifyUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-cyan hover:underline">
                    Verify with issuer <ExternalLink className="size-3" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {active && (
          <motion.div className="fixed inset-0 z-[85] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button type="button" aria-label="Close certificate" onClick={() => setActive(null)} className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${active.title} certificate`}
              initial={{ scale: 0.96, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: 8 }}
              className="panel relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] px-5 py-4">
                <div>
                  <p className="font-display text-sm font-bold">{active.title}</p>
                  <p className="text-[11px] text-dim">{active.issuer} · {active.year}{active.score ? ` · ${active.score}` : ""}</p>
                </div>
                <button type="button" onClick={() => setActive(null)} aria-label="Close" className="grid size-8 place-items-center rounded-lg border border-white/10 text-muted hover:text-ink">
                  <X className="size-4" />
                </button>
              </div>
              <div className="overflow-auto bg-white/[0.03] p-4">
                <Image src={active.image} alt={`${active.title} certificate`} width={1400} height={990} className="mx-auto h-auto w-full max-w-4xl rounded-lg border border-white/10" />
              </div>
              {active.verifyUrl && (
                <div className="border-t border-white/[0.08] px-5 py-3">
                  <a href={active.verifyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-cyan hover:underline">
                    Verify with issuer <ExternalLink className="size-3" />
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
