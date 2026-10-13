import type { Metadata } from "next";

import { BlogCard } from "@/components/blog/blog-card";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/ui/reveal";
import { blogIndexContent as content } from "@/content/pages/blog";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: content.meta.title,
  description: content.meta.description,
  alternates: { canonical: "/blog" },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <PageShell>
      <section className="flex flex-col items-center gap-15 section-x pt-[132px] pb-20 tablet:pt-40">
        <Reveal immediate className="flex flex-col items-center gap-6 text-center text-ink">
          <h1 className="max-w-[520px] type-display">{content.title}</h1>
          <p className="max-w-[550px] type-lead">{content.description}</p>
        </Reveal>

        <div className="grid w-full items-start gap-10 tablet:grid-cols-2">
          {posts.map((post, index) => (
            <Reveal key={post.slug} immediate={index < 2} delay={(index % 2) * 0.1}>
              <BlogCard post={post} imageSizes="(min-width: 810px) 50vw, 100vw" />
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
