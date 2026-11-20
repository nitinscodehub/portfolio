"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Check, Code2, Copy, ExternalLink, Layers, Sparkles, Zap } from "lucide-react";
import ProjectModal from "./ProjectModal";
import { projects, type Project } from "@/lib/projects";
import { site } from "@/lib/site";

const CATEGORIES = ["All", "Analytics", "AI", "Commerce", "Automation"] as const;

const PRINCIPLES = [
  {
    icon: Code2,
    title: "Ships end-to-end",
    body: "Frontend, APIs, data model, docs and deployment notes — not just a screenshot of an idea.",
  },
  {
    icon: Zap,
    title: "Works with zero keys",
    body: "Every demo runs immediately after install. External services are optional upgrades, never blockers.",
  },
  {
    icon: Layers,
    title: "Built to be extended",
    body: "Typed boundaries, small modules and honest fallbacks make each project easy to take further.",
  },
];

export default function Portfolio() {
  const [filter, setFilter] = useState<string>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);

  const visible = filter === "All" ? projects : projects.filter((project) => project.category === filter);

  function copyLink() {
    void navigator.clipboard.writeText(site.github).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Nav */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-line/60 bg-canvas/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
          <a href="#top" className="text-sm font-bold tracking-[0.16em] text-ink">
            N<span className="text-brand">C</span>.
          </a>
          <div className="flex items-center gap-5 text-xs text-muted">
            <a href="#work" className="hover:text-ink">Work</a>
            <a href="#approach" className="hidden hover:text-ink sm:block">Approach</a>
            <a href="#contact" className="hidden hover:text-ink sm:block">Contact</a>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-ink hover:border-brand/50"
            >
              <Code2 className="size-3.5" /> GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="top" className="relative px-6 pb-20 pt-32 sm:px-10 sm:pt-40">
        <div className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full bg-violet-600/20 blur-[140px]" />
        <div className="pointer-events-none absolute -left-40 top-40 size-[28rem] rounded-full bg-cyan-500/10 blur-[130px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/60 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-muted">
            <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_#34d399]" />
            {site.location}
          </div>

          <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-7xl">
            Products that{" "}
            <span className="bg-gradient-to-r from-brand via-fuchsia-400 to-cyan-300 bg-clip-text text-transparent">
              feel finished.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            I design and ship full-stack web apps — dashboards, AI assistants, commerce and
            automation — with the details that make a demo feel like a real product.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#work" className="flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-canvas hover:bg-brand/85">
              See the work <ArrowDown className="size-4" />
            </a>
            <a href={site.contra} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl border border-line bg-panel/50 px-5 py-3 text-sm text-ink hover:border-brand/50">
              Hire on Contra <ArrowUpRight className="size-4" />
            </a>
            <button type="button" onClick={copyLink} className="flex items-center gap-2 rounded-xl border border-line bg-panel/50 px-5 py-3 text-sm text-muted hover:text-ink">
              {copied ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy GitHub"}
            </button>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-4 border-t border-line pt-8 sm:grid-cols-4">
            {[
              { value: "04", label: "Products shipped" },
              { value: "100%", label: "TypeScript" },
              { value: "0", label: "Keys to run demos" },
              { value: "04", label: "Problem domains" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-3xl font-bold text-ink sm:text-4xl">{item.value}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-muted">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech strip */}
      <section className="border-y border-line/60 bg-panel/30 py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 text-[11px] uppercase tracking-[0.16em] text-muted sm:px-10">
          {["Next.js", "React", "TypeScript", "Tailwind", "REST APIs", "RAG", "SSE", "SVG Canvas", "Neon"].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      {/* Work */}
      <section id="work" className="px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand">Selected work</p>
              <h2 className="mt-3 text-3xl font-bold text-ink sm:text-5xl">Four builds, one standard.</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                Each project is complete, documented and runnable — click any card for the full case study.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  className={`rounded-full border px-3.5 py-1.5 text-[11px] transition-colors ${
                    filter === category
                      ? "border-brand bg-brand/15 text-brand"
                      : "border-line text-muted hover:text-ink"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {visible.map((project, index) => (
              <article key={project.id} className="card group flex flex-col overflow-hidden">
                <button
                  type="button"
                  onClick={() => setSelected(project)}
                  className="relative aspect-[2/1] w-full overflow-hidden"
                  aria-label={`Open ${project.name} case study`}
                >
                  <Image
                    src={project.cover}
                    alt={`${project.name} cover`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                    {project.category}
                  </span>
                  <span className="absolute bottom-4 right-4 text-[11px] font-bold tracking-widest text-white/70">
                    0{index + 1}
                  </span>
                </button>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-ink">{project.name}</h3>
                    <span className={`h-1.5 w-10 rounded-full bg-gradient-to-r ${project.accent}`} />
                  </div>
                  <p className="mt-1 text-xs font-medium text-brand">{project.tagline}</p>
                  <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-muted">{project.summary}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span key={tech} className="rounded-full border border-line px-2.5 py-1 text-[9px] text-muted">
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 3 ? (
                      <span className="rounded-full border border-line px-2.5 py-1 text-[9px] text-muted">
                        +{project.stack.length - 3}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-auto flex gap-2 border-t border-line pt-4">
                    <button
                      type="button"
                      onClick={() => setSelected(project)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-panel2 py-2.5 text-xs font-semibold text-ink hover:bg-brand hover:text-canvas"
                    >
                      Case study <ArrowUpRight className="size-3.5" />
                    </button>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.name} live demo`}
                      className="flex items-center justify-center rounded-lg border border-line px-3.5 text-muted hover:text-brand"
                    >
                      <ExternalLink className="size-4" />
                    </a>
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.name} on GitHub`}
                      className="flex items-center justify-center rounded-lg border border-line px-3.5 text-muted hover:text-ink"
                    >
                      <Code2 className="size-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="border-y border-line/60 bg-panel/30 px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand">How I build</p>
          <h2 className="mt-3 max-w-xl text-3xl font-bold text-ink sm:text-4xl">The details clients notice.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {PRINCIPLES.map((principle) => {
              const Icon = principle.icon;
              return (
                <div key={principle.title} className="card p-6">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/20">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 text-sm font-bold text-ink">{principle.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{principle.body}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-panel2/40 p-5 text-xs text-muted">
            <Sparkles className="size-4 text-brand" />
            <span>
              Every project ships with a README, environment notes, quality checks and a ready-to-share cover image.
            </span>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-20 sm:px-10 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="card relative overflow-hidden p-8 sm:p-14">
            <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-violet-600/20 blur-[100px]" />
            <div className="relative">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand">Get in touch</p>
              <h2 className="mt-4 max-w-2xl text-3xl font-bold leading-tight text-ink sm:text-5xl">
                Let&apos;s build the next one together.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
                Open to freelance work, product builds and long-term collaborations. Pick a link and let&apos;s talk.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={site.contra} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-canvas hover:bg-brand/85">
                  Hire on Contra <ArrowUpRight className="size-4" />
                </a>
                <a href={site.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-xl border border-line px-5 py-3 text-sm text-ink hover:border-brand/50">
                  <Code2 className="size-4" /> Browse the code
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-line px-6 py-8 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-[11px] text-muted">
          <p>
            <span className="font-bold tracking-[0.16em] text-ink">N<span className="text-brand">C</span>.</span>
            {" "}Built by {site.name} · {site.role}
          </p>
          <p>Next.js 15 · TypeScript · Tailwind CSS · 2026</p>
        </div>
      </footer>

      {selected ? <ProjectModal project={selected} onClose={() => setSelected(null)} /> : null}
    </main>
  );
}
