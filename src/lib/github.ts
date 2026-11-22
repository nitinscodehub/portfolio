export type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
};

// Used when the GitHub API is rate-limited or unreachable. Never presented as live data.
export const fallbackRepos: GitHubRepo[] = [
  {
    name: "nitin-mahi-portfolio",
    description: "Animated duo studio portfolio for web, Flutter, cybersecurity and AI/ML work.",
    html_url: "https://github.com/nitinscodehub/nitin-mahi-portfolio",
    stargazers_count: 0,
    language: "TypeScript",
    updated_at: "2026-11-21T00:00:00Z",
    fork: false,
  },
  {
    name: "pulse-analytics",
    description: "AI-powered SaaS analytics dashboard built with Next.js and TypeScript.",
    html_url: "https://github.com/nitinscodehub/pulse-analytics",
    stargazers_count: 0,
    language: "TypeScript",
    updated_at: "2026-11-21T00:00:00Z",
    fork: false,
  },
  {
    name: "askly",
    description: "RAG knowledge assistant with streaming answers and cited sources.",
    html_url: "https://github.com/nitinscodehub/askly",
    stargazers_count: 0,
    language: "TypeScript",
    updated_at: "2026-11-21T00:00:00Z",
    fork: false,
  },
  {
    name: "ADASTRA",
    description: "Active Directory security assessment framework.",
    html_url: "https://github.com/nitinscodehub/ADASTRA",
    stargazers_count: 0,
    language: "Python",
    updated_at: "2026-11-21T00:00:00Z",
    fork: false,
  },
];

export async function fetchGitHubRepos(): Promise<{ repos: GitHubRepo[]; live: boolean }> {
  try {
    const response = await fetch(
      "https://api.github.com/users/nitinscodehub/repos?per_page=100&sort=updated&type=owner",
      {
        headers: { Accept: "application/vnd.github+json", "User-Agent": "nitin-portfolio" },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(6000),
      },
    );
    if (!response.ok) return { repos: fallbackRepos, live: false };

    const data = (await response.json()) as GitHubRepo[];
    const originals = data.filter((repo) => !repo.fork);
    return { repos: originals.slice(0, 6), live: true };
  } catch {
    return { repos: fallbackRepos, live: false };
  }
}
