import { ArrowLeft } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogCard } from "@/components/blog/blog-card";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/layout/page-shell";
import { CtaSection } from "@/components/sections/cta-section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { siteConfig } from "@/config/site";
import { blogDivisionHref, blogPostContent as content } from "@/content/pages/blog";
import { getAllPosts, getPost, getPostSlugs } from "@/lib/blog";
import { cn, formatDate, getSiteUrl } from "@/lib/utils";

type BlogPostPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      images: [{ url: post.cover }],
    },
    twitter: { card: "summary_large_image", images: [post.cover] },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const { Content } = post;
  const siteUrl = getSiteUrl();
  // Prefer articles from the same business line, newest first.
  const related = (await getAllPosts())
    .filter((other) => other.slug !== post.slug)
    .sort((a, b) => Number(b.division === post.division) - Number(a.division === post.division))
    .slice(0, content.related.limit);

  return (
    <PageShell>
      <article className="flex flex-col items-center gap-15 pt-[132px] pb-20 tablet:pt-[160px]">
        <header className="flex w-full flex-col items-center section-x">
          <div className="flex w-full max-w-[600px] flex-col items-center gap-[15px] text-center">
            <Link
              href={blogDivisionHref(post.division)}
              className="mb-3 inline-flex items-center gap-2 type-badge text-body transition-colors hover:text-ink"
            >
              <ArrowLeft weight="bold" className="size-4" aria-hidden />
              {content.backLink.label}
            </Link>
            <Badge>{post.category}</Badge>
            <h1 className="type-h1 text-black">{post.title}</h1>
            <p className="type-lead text-muted">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </p>
          </div>
        </header>

        <div className="relative h-60 w-full tablet:h-[480px]">
          <Image src={post.cover} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>

        <div className="flex w-full justify-center section-x">
          <div className="post-body w-full max-w-[800px]">
            <Content />
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section
          aria-label="Related articles"
          className="flex flex-col items-center section-y border-t border-line bg-white section-x"
        >
          <Reveal className="w-full">
            <SectionIntro {...content.related.intro} />
          </Reveal>
          <div
            className={cn(
              "grid w-full items-stretch gap-6 tablet:grid-cols-2 desktop:gap-10",
              related.length >= 3 ? "desktop:grid-cols-3" : "max-w-[900px]",
            )}
          >
            {related.map((relatedPost, index) => (
              <Reveal key={relatedPost.slug} delay={index * 0.1} className="h-full">
                <BlogCard post={relatedPost} compact />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <CtaSection intro={content.cta.intro} button={content.cta.button} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          image: `${siteUrl}${post.cover}`,
          url: `${siteUrl}/blog/${post.slug}`,
          publisher: { "@type": "Organization", name: siteConfig.legalName },
        }}
      />
    </PageShell>
  );
}
