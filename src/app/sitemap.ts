import { MetadataRoute } from "next";
import { wisp } from "@/lib/wisp";

export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: "https://wolfmax.io",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://wolfmax.io/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://wolfmax.io/changelog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: "https://wolfmax.io/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: "https://wolfmax.io/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: "https://wolfmax.io/terms",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Fetch blog posts for dynamic sitemap entries
  try {
    const result = await wisp.getPosts();
    const blogPages: MetadataRoute.Sitemap = result.posts.map((post) => ({
      url: `https://wolfmax.io/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    return [...staticPages, ...blogPages];
  } catch {
    return staticPages;
  }
}
