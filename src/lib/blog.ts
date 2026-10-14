import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import type { MDXContent } from "mdx/types";
import { cache } from "react";
import { z } from "zod";

import type { BlogDivision } from "@/content/types";
import { defaultLocale, type Locale } from "@/i18n/config";
import { formatDate } from "@/i18n/format";
import { getLocale } from "@/i18n/server";

/**
 * Blog posts live in `src/content/blog/<slug>/`. The folder name is the URL slug.
 *
 * - `en.mdx` is the original. Its `meta` export holds every field below.
 * - `<language>.mdx` (tr.mdx, de.mdx, …) are translations. Their `meta` only needs
 *   the translated fields (title, description, category); date, division and
 *   cover are taken from `en.mdx`. Without a translation the English text is shown.
 */
const postMetaSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.iso.date(),
  /** Which business line the post belongs to: "it" or "engineering". */
  division: z.enum(["it", "engineering"]) satisfies z.ZodType<BlogDivision>,
  category: z.string().min(1),
  cover: z.string().startsWith("/"),
});

const translationMetaSchema = postMetaSchema.pick({
  title: true,
  description: true,
  category: true,
});

export type PostMeta = z.infer<typeof postMetaSchema>;

/** Serializable post data (safe to pass to Client Components). */
export type Post = PostMeta & {
  slug: string;
  /** Date formatted for the page language, e.g. "Oct 7, 2026" / "7 Eki 2026". */
  dateLabel: string;
  /** False when the requested language has no translation and English is shown. */
  translated: boolean;
};

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export const getPostSlugs = cache(async () => {
  const entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
});

async function hasFile(slug: string, locale: Locale) {
  try {
    await fs.access(path.join(BLOG_DIR, slug, `${locale}.mdx`));
    return true;
  } catch {
    return false;
  }
}

async function importPost(slug: string, locale: Locale) {
  return (await import(`@/content/blog/${slug}/${locale}.mdx`)) as {
    default: MDXContent;
    meta: unknown;
  };
}

function parseMeta<T extends z.ZodType>(schema: T, meta: unknown, file: string): z.infer<T> {
  const parsed = schema.safeParse(meta);
  if (!parsed.success) {
    throw new Error(`Invalid "meta" export in src/content/blog/${file}: ${parsed.error.message}`);
  }
  return parsed.data;
}

const loadPost = cache(async (slug: string, locale: Locale) => {
  const original = await importPost(slug, defaultLocale);
  const baseMeta = parseMeta(postMetaSchema, original.meta, `${slug}/${defaultLocale}.mdx`);

  if (locale !== defaultLocale && (await hasFile(slug, locale))) {
    const translation = await importPost(slug, locale);
    const meta = parseMeta(translationMetaSchema, translation.meta, `${slug}/${locale}.mdx`);
    return {
      post: {
        ...baseMeta,
        ...meta,
        slug,
        dateLabel: formatDate(baseMeta.date, locale),
        translated: true,
      },
      Content: translation.default,
    };
  }

  return {
    post: {
      ...baseMeta,
      slug,
      dateLabel: formatDate(baseMeta.date, locale),
      translated: locale === defaultLocale,
    },
    Content: original.default,
  };
});

/** A single post (data + MDX component) in the page language, or `null` if it does not exist. */
export async function getPost(slug: string, locale?: Locale) {
  const slugs = await getPostSlugs();
  if (!slugs.includes(slug)) return null;
  const { post, Content } = await loadPost(slug, locale ?? (await getLocale()));
  return { ...post, Content };
}

/** All posts in the page language, newest first. */
export async function getAllPosts(locale?: Locale): Promise<Post[]> {
  const language = locale ?? (await getLocale());
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map(async (slug) => (await loadPost(slug, language)).post));
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

/** Posts of one business line, newest first. */
export async function getPostsByDivision(division: BlogDivision, locale?: Locale) {
  return (await getAllPosts(locale)).filter((post) => post.division === division);
}
