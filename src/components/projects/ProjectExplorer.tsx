"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { projectCategories, projects, type ProjectStatus } from "@/data/projects";
import { cn } from "@/lib/utils";

const statuses: { id: ProjectStatus | "featured" | "all"; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "original", label: "Original" },
  { id: "featured", label: "Featured" },
  { id: "archived", label: "Archived" },
  { id: "private", label: "Private" },
  { id: "unverified", label: "Unverified" },
];

export default function ProjectExplorer() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") ?? "All";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(projectCategories.includes(initialCategory as never) ? initialCategory : "All");
  const [tech, setTech] = useState("All");
  const [status, setStatus] = useState<ProjectStatus | "featured" | "all">("all");

  const technologies = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((project) => project.stack.forEach((item) => set.add(item)));
    return ["All", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchQuery = !q || `${project.name} ${project.tagline} ${project.summary} ${project.stack.join(" ")} ${project.category}`.toLowerCase().includes(q);
      const matchCategory = category === "All" || project.category === category;
      const matchTech = tech === "All" || project.stack.some((item) => item.toLowerCase() === tech.toLowerCase());
      const matchStatus = status === "all" || (status === "featured" ? project.featured : project.status === status);
      return matchQuery && matchCategory && matchTech && matchStatus;
    });
  }, [query, category, tech, status]);

  const reset = () => {
    setQuery("");
    setCategory("All");
    setTech("All");
    setStatus("all");
  };

  return (
    <>
      <div className="panel p-4 sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-dim" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects, technologies, categories…"
              aria-label="Search projects"
              className="field pl-10"
            />
          </label>
          <label className="relative min-w-[10rem]">
            <SlidersHorizontal className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-dim" />
            <select value={tech} onChange={(event) => setTech(event.target.value)} aria-label="Filter by technology" className="field appearance-none pl-10">
              {technologies.map((item) => (
                <option key={item} value={item}>{item === "All" ? "All technologies" : item}</option>
              ))}
            </select>
          </label>
          <button type="button" onClick={reset} className="btn btn-ghost shrink-0">
            <X className="size-4" /> Reset
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-white/[0.07] pt-4">
          {projectCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={cn("chip transition-colors", category === item ? "chip-active" : "hover:text-ink")}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {statuses.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setStatus(item.id)}
              aria-pressed={status === item.id}
              className={cn("rounded-md px-2 py-1 text-[10px] font-semibold transition-colors", status === item.id ? "bg-white/10 text-ink" : "text-dim hover:text-muted")}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <p className="text-xs text-muted">
          Showing <span className="font-semibold text-ink">{filtered.length}</span> of {projects.length} projects
        </p>
        <p className="hidden text-[11px] text-dim sm:block">Click a card for the full case study</p>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="panel mt-5 flex flex-col items-center justify-center px-6 py-20 text-center">
          <span className="grid size-12 place-items-center rounded-full border border-white/10 text-dim"><Search className="size-5" /></span>
          <h3 className="mt-5 font-display text-lg font-bold">No projects match those filters</h3>
          <p className="mt-2 max-w-sm text-xs leading-relaxed text-muted">Try a broader search term or reset the filters. Some repositories are private and are shown as non-clickable source links.</p>
          <button type="button" onClick={reset} className="btn btn-ghost mt-6">Reset filters</button>
        </div>
      )}
    </>
  );
}
