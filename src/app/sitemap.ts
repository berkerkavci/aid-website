import type { MetadataRoute } from "next";

import { getAllPosts } from "@/lib/blog";
import { getSiteUrl } from "@/lib/utils";

const staticRoutes = [
  "/",
  "/it-services",
  "/engineering-services",
  "/blog",
  "/contact",
  "/privacy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const posts = await getAllPosts();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route === "/" ? "" : route}`,
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.8,
    })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
