import { BlogCard } from "@/components/blog/blog-card";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import type { Cta, SectionIntro as SectionIntroContent } from "@/content/types";
import { getAllPosts } from "@/lib/blog";

type BlogPreviewProps = {
  intro: SectionIntroContent;
  limit: number;
  cta: Cta;
};

/** Latest blog posts ("Knowledge Hub"). */
export async function BlogPreview({ intro, limit, cta }: BlogPreviewProps) {
  const posts = (await getAllPosts()).slice(0, limit);

  return (
    <section
      id="blog"
      className="flex flex-col items-center gap-10 bg-white section-x py-15 tablet:gap-15 tablet:pb-20"
    >
      <Reveal className="w-full">
        <SectionIntro {...intro} />
      </Reveal>

      <div className="grid w-full items-start gap-10 tablet:grid-cols-2 desktop:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.1}>
            <BlogCard post={post} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <ButtonLink href={cta.href} variant="outline" icon="arrow-right">
          {cta.label}
        </ButtonLink>
      </Reveal>
    </section>
  );
}
