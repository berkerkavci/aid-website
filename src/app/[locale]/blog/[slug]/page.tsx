import { ArrowLeft, Translate } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { BlogCard } from "@/components/blog/blog-card";
import { JsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/layout/page-shell";
import { CtaSection } from "@/components/sections/cta-section";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import { siteConfig } from "@/config/site";
import { blogDivisionHref, getBlogPostContent } from "@/content/pages/blog";
import { defaultLocale, localeAlternates, localeInfo, localizePath } from "@/i18n/config";
import { format } from "@/i18n/format";
import { Link } from "@/i18n/link";
import { getLocale, getMessages } from "@/i18n/server";
import { getAllPosts, getPost, getPostSlugs } from "@/lib/blog";
import { cn, getSiteUrl } from "@/lib/utils";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/blog/[slug]">): Promise<Metadata> {
  const locale = await getLocale();
  const post = await getPost((await params).slug, locale);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: localeAlternates(locale, `/blog/${post.slug}`),
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

export default async function BlogPostPage({ params }: PageProps<"/[locale]/blog/[slug]">) {
  const locale = await getLocale();
  const post = await getPost((await params).slug, locale);
  if (!post) notFound();

  const content = getBlogPostContent((await getMessages(locale)).blog.post);
  const { Content } = post;
  const siteUrl = getSiteUrl();
  // Prefer articles from the same business line, newest first.
  const related = (await getAllPosts(locale))
    .filter((other) => other.slug !== post.slug)
    .sort((a, b) => Number(b.division === post.division) - Number(a.division === post.division))
    .slice(0, content.related.limit);

  return (
    <PageShell>
      {/* Untranslated articles are shown in English and marked as such. */}
      <article
        lang={post.translated ? undefined : defaultLocale}
        className="flex flex-col items-center gap-15 pt-[132px] pb-20 tablet:pt-[160px]"
      >
        <header className="flex w-full flex-col items-center section-x">
          <div className="flex w-full max-w-[600px] flex-col items-center gap-[15px] text-center">
            <Link
              href={blogDivisionHref(post.division)}
              lang={locale}
              className="mb-3 inline-flex items-center gap-2 type-badge text-body transition-colors hover:text-ink"
            >
              <ArrowLeft weight="bold" className="size-4 rtl:-scale-x-100" aria-hidden />
              {content.backLink.label}
            </Link>
            <Badge>{post.category}</Badge>
            <h1 className="type-h1 text-heading">{post.title}</h1>
            <p className="type-lead text-muted">
              <time dateTime={post.date}>{post.dateLabel}</time>
            </p>
            {!post.translated && (
              <p
                lang={locale}
                className="mt-2 inline-flex items-center gap-2 rounded-field bg-surface-muted px-4 py-2.5 text-sm/[1.5] text-body"
              >
                <Translate weight="bold" aria-hidden className="size-4 shrink-0" />
                {format(content.untranslated, { language: localeInfo[locale].nativeName })}
              </p>
            )}
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
          aria-label={content.related.label}
          className="flex flex-col items-center section-y border-t border-line bg-canvas section-x"
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
          inLanguage: post.translated ? locale : defaultLocale,
          datePublished: post.date,
          image: `${siteUrl}${post.cover}`,
          url: `${siteUrl}${localizePath(locale, `/blog/${post.slug}`)}`,
          publisher: { "@type": "Organization", name: siteConfig.legalName },
        }}
      />
    </PageShell>
  );
}
