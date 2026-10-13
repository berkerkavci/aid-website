import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import type { MDXContent } from "mdx/types";
import { cache } from "react";
import { z } from "zod";

import type { BlogDivision } from "@/content/types";

/**
 * Blog posts live in `src/content/blog/<slug>.mdx`. The file name is the URL slug.
 * Each post exports a `meta` object that is validated against this schema.
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

export type PostMeta = z.infer<typeof postMetaSchema>;
export type Post = PostMeta & { slug: string };

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

export const getPostSlugs = cache(async () => {
  const files = await fs.readdir(BLOG_DIR);
  return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""));
});

async function loadPostModule(slug: string) {
  const mod = (await import(`@/content/blog/${slug}.mdx`)) as {
    default: MDXContent;
    meta: unknown;
  };
  const parsed = postMetaSchema.safeParse(mod.meta);
  if (!parsed.success) {
    throw new Error(
      `Invalid "meta" export in src/content/blog/${slug}.mdx: ${parsed.error.message}`,
    );
  }
  return { meta: parsed.data, Content: mod.default };
}

/** Returns a single post (metadata + MDX component), or `null` if it does not exist. */
export const getPost = cache(async (slug: string) => {
  const slugs = await getPostSlugs();
  if (!slugs.includes(slug)) return null;
  const { meta, Content } = await loadPostModule(slug);
  return { slug, ...meta, Content };
});

/** All posts, newest first. */
export const getAllPosts = cache(async (): Promise<Post[]> => {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => ({ slug, ...(await loadPostModule(slug)).meta })),
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
});

/** Posts of one business line, newest first. */
export async function getPostsByDivision(division: BlogDivision) {
  return (await getAllPosts()).filter((post) => post.division === division);
}
