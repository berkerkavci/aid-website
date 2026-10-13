import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/layout/page-shell";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/config/site";
import { getPost, getPostSlugs } from "@/lib/blog";
import { formatDate, getSiteUrl } from "@/lib/utils";

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

  return (
    <PageShell>
      <article className="flex flex-col items-center gap-15 pt-[132px] pb-20 tablet:pt-[180px]">
        <header className="flex w-full flex-col items-center section-x">
          <div className="flex w-full max-w-[600px] flex-col items-center gap-[15px] text-center">
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
