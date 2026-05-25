import { MetadataRoute } from "next";
import { wisp } from "@/lib/wisp";
import { SITE_URL } from "@/lib/seo";

const BASE = SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const routes: { path: string; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/individuals", changeFrequency: "monthly", priority: 0.8 },
    { path: "/institutions", changeFrequency: "monthly", priority: 0.8 },
    { path: "/news", changeFrequency: "weekly", priority: 0.7 },
    { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
    { path: "/verify", changeFrequency: "monthly", priority: 0.6 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/app-privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  ];

  const staticEntries: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Dynamic entries for each published news post (sourced from Wisp).
  let newsEntries: MetadataRoute.Sitemap = [];
  try {
    const { posts } = await wisp.getPosts();
    newsEntries = posts.map((post) => ({
      url: `${BASE}/news/${post.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    // If Wisp is unreachable at build time, ship the static sitemap only.
  }

  return [...staticEntries, ...newsEntries];
}
