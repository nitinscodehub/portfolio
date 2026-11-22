import type { MetadataRoute } from "next";
import { navItems } from "@/data/nav";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...navItems.map((item) => ({
      url: `${siteConfig.url}${item.href}`,
      lastModified: now,
      changeFrequency: (item.href === "/" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: item.href === "/" ? 1 : 0.7,
    })),
    ...projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: project.featured ? 0.8 : 0.5,
    })),
  ];
}
