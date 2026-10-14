import type { MetadataRoute } from "next";

import { defaultLocale, locales, localizePath } from "@/i18n/config";
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

/** One entry per page and language, each listing all its language versions (hreflang). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const posts = await getAllPosts(defaultLocale);
  const url = (locale: (typeof locales)[number], path: string) => {
    const localized = localizePath(locale, path);
    return `${siteUrl}${localized === "/" ? "" : localized}`;
  };
  const languages = (path: string) =>
    Object.fromEntries(locales.map((locale) => [locale, url(locale, path)]));

  const pages = [
    ...staticRoutes.map((route) => ({
      path: route,
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.8,
    })),
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];

  return pages.flatMap(({ path, ...entry }) =>
    locales.map((locale) => ({
      url: url(locale, path),
      ...entry,
      alternates: { languages: languages(path) },
    })),
  );
}
