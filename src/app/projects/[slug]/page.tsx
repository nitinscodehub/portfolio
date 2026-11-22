import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink, LockKeyhole } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import Reveal from "@/components/ui/Reveal";
import ProjectCard from "@/components/projects/ProjectCard";
import { projectBySlug, projects } from "@/data/projects";
import { siteConfig } from "@/data/profile";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${project.tagline}`,
      description: project.summary,
      url: `${siteConfig.url}/projects/${project.slug}`,
      images: project.cover ? [project.cover] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const related = projects
    .filter((item) => item.category === project.category && item.slug !== project.slug)
    .slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.summary,
    applicationCategory: project.category,
    url: project.live ?? project.repo ?? `${siteConfig.url}/projects/${project.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <section className="relative overflow-hidden pb-14 pt-32 sm:pt-40">
        <div className="eng-grid pointer-events-none absolute inset-0" />
        <div className="orb -right-40 top-0 size-[26rem] bg-cyan/10" />
        <div className="shell relative">
          <Link href="/projects" className="inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-cyan">
            <ArrowLeft className="size-3" /> Back to archive
          </Link>
          <div className="mt-9 flex flex-wrap items-center gap-2">
            <span className="chip chip-active">{project.category}</span>
            <span className="chip">{project.year}</span>
            {project.featured && <span className="chip chip-gold">Featured</span>}
            {project.status === "private" && (
              <span className="chip"><LockKeyhole className="size-3" /> Private source</span>
            )}
            {project.status === "unverified" && <span className="chip">Unverified concept</span>}
          </div>
          <h1 className="display mt-6 max-w-4xl text-4xl sm:text-6xl">{project.name}</h1>
          <p className="mt-4 font-display text-lg font-medium text-cyan sm:text-xl">{project.tagline}</p>
          <p className="pretty mt-6 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">{project.summary}</p>

          <div className="mt-9 flex flex-wrap gap-3">
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <Github className="size-4" /> View repository <ArrowUpRight className="size-3" />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <ExternalLink className="size-4" /> Live demo
              </a>
            )}
            {!project.repo && !project.live && (
              <span className="text-xs text-dim">No public repository or live demo URL supplied.</span>
            )}
          </div>
        </div>
      </section>

      {project.cover && (
        <section className="shell">
          <div className="relative aspect-[16/8] w-full overflow-hidden rounded-3xl border border-white/10 bg-surface">
            <Image src={project.cover} alt={`${project.name} interface`} fill sizes="100vw" className="object-cover" priority />
          </div>
        </section>
      )}

      <section className="shell section-pad">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.7fr]">
          <Reveal>
            <div className="panel sticky top-24 p-6">
              <p className="eyebrow">Project details</p>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-dim">Category</dt>
                  <dd className="mt-1 font-medium text-ink">{project.category}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-dim">Timeline</dt>
                  <dd className="mt-1 font-medium text-ink">{project.year}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-dim">Status</dt>
                  <dd className="mt-1 font-medium capitalize text-ink">{project.status}</dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-wider text-dim">Stack</dt>
                  <dd className="mt-2 flex flex-wrap gap-1.5">
                    {project.stack.map((item) => (
                      <span key={item} className="rounded-md border border-white/[0.08] px-2 py-1 text-[10px] text-muted">{item}</span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <div className="space-y-6">
            {[
              { title: "The problem", body: project.problem ?? project.summary },
              { title: "The approach", body: project.approach ?? `The work is organised around ${project.stack.slice(0, 3).join(", ")}. The public repository contains the implementation and supporting material.` },
              { title: "The outcome", body: project.outcome ?? "A public project that documents the build and serves as a reference for future iterations." },
            ].map((block, index) => (
              <Reveal key={block.title} delay={index * 0.06}>
                <div className="panel p-6 sm:p-8">
                  <p className="eyebrow">0{index + 1} · {block.title}</p>
                  <p className="pretty mt-4 text-sm leading-relaxed text-muted sm:text-base">{block.body}</p>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.2}>
              <div className="panel p-6 sm:p-8">
                <p className="eyebrow">Key points</p>
                <ul className="mt-5 space-y-3">
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm text-muted">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-cyan" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                {project.note && (
                  <p className="mt-6 rounded-xl border border-gold/20 bg-gold/[0.05] p-4 text-xs leading-relaxed text-gold/80">
                    {project.note}
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="shell pb-20">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">More in {project.category}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProjectCard key={item.slug} project={item} compact />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
