import { fetchGitHubRepos } from "@/lib/github";

export const dynamic = "force-dynamic";

export async function GET() {
  const { repos, live } = await fetchGitHubRepos();
  return Response.json(
    { repos, live },
    { headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" } },
  );
}
