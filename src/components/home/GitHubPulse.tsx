"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import type { GitHubRepo } from "@/lib/github";
import Reveal from "@/components/ui/Reveal";

export default function GitHubPulse() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [live, setLive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github")
      .then((response) => response.json())
      .then((data: { repos: GitHubRepo[]; live: boolean }) => {
        if (cancelled) return;
        setRepos(data.repos ?? []);
        setLive(Boolean(data.live));
      })
      .catch(() => setRepos([]))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="section-pad relative">
      <div className="shell">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Open source pulse</p>
              <h2 className="display mt-4 text-3xl sm:text-4xl">Public work, <span className="text-gradient">in motion.</span></h2>
            </div>
            <p className="text-[11px] text-dim">
              {loading ? "Loading repository data…" : live ? "Live from GitHub API · cached 1h" : "Fallback snapshot · GitHub API unavailable"}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {(loading ? Array.from({ length: 6 }) : repos).map((repo, index) => {
            const item = repo as GitHubRepo | undefined;
            return (
              <div key={item?.name ?? index} className="panel flex items-center justify-between gap-4 p-4">
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-semibold text-ink">{item?.name ?? <span className="skeleton inline-block h-4 w-32 rounded" />}</p>
                  <p className="mt-1 line-clamp-2 text-[11px] text-muted">
                    {item?.description ?? <span className="skeleton inline-block h-3 w-full rounded" />}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-[10px] text-dim">
                    <span>{item?.language ?? "—"}</span>
                    {item && (
                      <span className="inline-flex items-center gap-1">
                        <Star className="size-3" /> {item.stargazers_count}
                      </span>
                    )}
                  </div>
                </div>
                {item && (
                  <a href={item.html_url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${item.name} on GitHub`} className="shrink-0 text-muted hover:text-cyan">
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-7 text-center">
          <Link href="https://github.com/nitinscodehub" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <Github className="size-4" /> View GitHub profile
          </Link>
        </div>
      </div>
    </section>
  );
}
