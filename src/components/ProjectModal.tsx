"use client";

import { ArrowUpRight, Check, Code2, X } from "lucide-react";
import Image from "next/image";
import type { Project } from "@/lib/projects";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="card rise my-8 w-full max-w-3xl overflow-hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-[2/1] w-full">
          <Image src={project.cover} alt={`${project.name} cover`} fill className="object-cover" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-black/60 text-white ring-1 ring-white/20 hover:bg-black/80"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-[0.2em] bg-gradient-to-r ${project.accent} bg-clip-text text-transparent`}>
                {project.category}
              </p>
              <h2 className="mt-1 text-3xl font-bold text-ink">{project.name}</h2>
              <p className="mt-1 text-sm text-muted">{project.tagline}</p>
            </div>
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-xs font-semibold text-canvas hover:opacity-85"
            >
              <Code2 className="size-4" /> View code <ArrowUpRight className="size-3.5" />
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {project.stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-line bg-panel2/60 p-4">
                <p className="text-xl font-bold text-ink">{stat.value}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand">The problem</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{project.problem}</p>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand">The build</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{project.approach}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand">Highlights</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-2 text-xs leading-relaxed text-muted">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-accent" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-brand">Stack</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span key={item} className="rounded-full border border-line px-3 py-1 text-[10px] text-muted">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <p className="rounded-xl border border-brand/20 bg-brand/5 p-4 text-xs leading-relaxed text-muted">
            <span className="font-semibold text-ink">Result — </span>
            {project.outcome}
          </p>
        </div>
      </div>
    </div>
  );
}
