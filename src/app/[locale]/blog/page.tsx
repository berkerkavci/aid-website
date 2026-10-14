import type { Metadata } from "next";

import { BlogBrowser } from "@/components/blog/blog-browser";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { getBlogIndexContent } from "@/content/pages/blog";
import { localeAlternates } from "@/i18n/config";
import { getLocale, getMessages } from "@/i18n/server";
import { getAllPosts } from "@/lib/blog";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { blog } = await getMessages(locale);
  return {
    title: blog.meta.title,
    description: blog.meta.description,
    alternates: localeAlternates(locale, "/blog"),
  };
}

export default async function BlogIndexPage() {
  const { blog } = await getMessages();
  const content = getBlogIndexContent(blog);
  const posts = await getAllPosts();

  return (
    <PageShell>
      <section className="flex flex-col items-center gap-10 section-x pt-[132px] pb-20 tablet:gap-12 tablet:pt-40">
        <Reveal immediate className="flex flex-col items-center gap-6 text-center text-ink">
          <h1 className="max-w-[520px] type-display">{content.title}</h1>
          <p className="max-w-[550px] type-lead">{content.description}</p>
        </Reveal>

        {/* Statically generated; the ?division=… filter is applied in the browser. */}
        <BlogBrowser posts={posts} divisions={content.divisions} label={content.categoryLabel} />
      </section>
    </PageShell>
  );
}
