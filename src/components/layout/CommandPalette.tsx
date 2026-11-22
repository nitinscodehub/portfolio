"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Command, FileText, FolderGit2, Search } from "lucide-react";
import { navItems } from "@/data/nav";
import { projects } from "@/data/projects";
import { socials } from "@/data/socials";

type Item = { label: string; hint: string; href: string; external?: boolean; group: string };

const items: Item[] = [
  ...navItems.map((item) => ({ ...item, hint: "Page", group: "Navigate" })),
  ...projects
    .filter((project) => project.featured)
    .map((project) => ({
      label: project.name,
      hint: project.category,
      href: `/projects/${project.slug}`,
      group: "Featured projects",
    })),
  ...socials.slice(0, 4).map((item) => ({
    label: item.label,
    hint: item.handle,
    href: item.href,
    external: true,
    group: "Profiles",
  })),
];

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const show = useCallback(() => {
    setQuery("");
    setSelected(0);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        show();
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", show);
    };
  }, [show]);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? items.filter((item) => `${item.label} ${item.hint} ${item.group}`.toLowerCase().includes(q))
      : items;
    return list.slice(0, 12);
  }, [query]);

  const choose = (item: Item) => {
    setOpen(false);
    if (item.external) window.open(item.href, "_blank", "noopener,noreferrer");
    else router.push(item.href);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
        >
          <button
            type="button"
            aria-label="Close command palette"
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="panel relative w-full max-w-xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4">
              <Search className="size-4 shrink-0 text-cyan" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSelected(0);
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setSelected((value) => Math.min(value + 1, results.length - 1));
                  }
                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setSelected((value) => Math.max(value - 1, 0));
                  }
                  if (event.key === "Enter" && results[selected]) choose(results[selected]!);
                }}
                placeholder="Search pages, projects, profiles…"
                aria-label="Search"
                className="w-full bg-transparent py-4 text-sm text-ink outline-none placeholder:text-dim"
              />
              <span className="hidden items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-[10px] text-dim sm:flex">
                <Command className="size-3" /> K
              </span>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-4 py-10 text-center text-sm text-dim">No matches found.</p>
              )}
              {results.map((item, index) => {
                const Icon = item.group === "Featured projects" ? FolderGit2 : item.external ? ArrowRight : FileText;
                return (
                  <button
                    key={`${item.group}-${item.href}`}
                    type="button"
                    onMouseEnter={() => setSelected(index)}
                    onClick={() => choose(item)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      selected === index ? "bg-cyan/10" : "hover:bg-white/5"
                    }`}
                  >
                    <span className={`grid size-8 shrink-0 place-items-center rounded-md border ${selected === index ? "border-cyan/40 text-cyan" : "border-white/10 text-dim"}`}>
                      <Icon className="size-3.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-medium text-ink">{item.label}</span>
                      <span className="block truncate text-[10px] text-dim">{item.group} · {item.hint}</span>
                    </span>
                    <ArrowRight className={`size-3.5 ${selected === index ? "text-cyan" : "text-dim"}`} />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.08] px-4 py-2.5 text-[10px] text-dim">
              <span>↑ ↓ to navigate · ↵ to open</span>
              <span>esc to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
