"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, LockKeyhole } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import TiltCard from "@/components/ui/TiltCard";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const categoryTone: Record<string, string> = {
  Cybersecurity: "from-cyan/25 to-blue-500/5 text-cyan",
  "Full-Stack": "from-violet/25 to-fuchsia-500/5 text-violet",
  ".NET": "from-sky-400/25 to-blue-600/5 text-sky-300",
  "Mobile Apps": "from-emerald-400/25 to-teal-500/5 text-emerald-300",
  "AI/ML": "from-fuchsia-400/25 to-violet/5 text-fuchsia-300",
  "C/C++": "from-amber-400/25 to-orange-500/5 text-amber-300",
  Backend: "from-indigo-400/25 to-blue-500/5 text-indigo-300",
  IoT: "from-lime-400/25 to-emerald-500/5 text-lime-300",
  Automation: "from-orange-400/25 to-amber-500/5 text-orange-300",
  "Learning Projects": "from-slate-400/20 to-slate-500/5 text-slate-300",
};

export default function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) {
  const tone = categoryTone[project.category] ?? "from-cyan/20 to-violet/5 text-cyan";

  return (
    <TiltCard className="h-full">
      <article className={cn("panel panel-hover group relative flex h-full flex-col overflow-hidden", compact ? "min-h-[22rem]" : "min-h-[25rem]")}>
        {project.cover ? (
          <div className="relative h-40 w-full overflow-hidden border-b border-white/[0.07]">
            <Image
              src={project.cover}
              alt={`${project.name} interface preview`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
          </div>
        ) : (
          <div className={cn("relative flex h-28 items-end overflow-hidden border-b border-white/[0.07] bg-gradient-to-br p-5", tone)}>
            <span className="eng-grid absolute inset-0 opacity-40" />
            <span className="relative font-display text-4xl font-bold tracking-tight opacity-25">
              {project.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        <div className="flex flex-1 flex-col p-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip border-current/20 bg-white/[0.03]">{project.category}</span>
            {project.featured && <span className="chip chip-gold">Featured</span>}
            {project.status === "private" && (
              <span className="chip">
                <LockKeyhole className="size-3" /> Private
              </span>
            )}
            {project.status === "unverified" && <span className="chip">Unverified</span>}
            <span className="ml-auto text-[10px] text-dim">{project.year}</span>
          </div>

          <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-ink">{project.name}</h3>
          <p className="mt-1 text-xs font-medium text-cyan">{project.tagline}</p>
          <p className="pretty mt-3 line-clamp-3 text-xs leading-relaxed text-muted">{project.summary}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.slice(0, compact ? 3 : 4).map((tech) => (
              <span key={tech} className="rounded-md border border-white/[0.08] bg-white/[0.02] px-2 py-1 text-[10px] text-muted">
                {tech}
              </span>
            ))}
            {project.stack.length > (compact ? 3 : 4) && (
              <span className="rounded-md border border-white/[0.08] px-2 py-1 text-[10px] text-dim">
                +{project.stack.length - (compact ? 3 : 4)}
              </span>
            )}
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-white/[0.07] pt-4 text-[11px] font-semibold">
            <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1 text-cyan hover:underline">
              Case study <ArrowUpRight className="size-3" />
            </Link>
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-ink">
                <Github className="size-3" /> Code
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-ink">
                <ExternalLink className="size-3" /> Live
              </a>
            )}
          </div>
        </div>
      </article>
    </TiltCard>
  );
}
