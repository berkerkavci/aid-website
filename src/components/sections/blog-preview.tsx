import { BlogCard } from "@/components/blog/blog-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import type { BlogDivision, SectionIntro as SectionIntroContent } from "@/content/types";
import { getPostsByDivision } from "@/lib/blog";

type BlogPreviewProps = {
  intro: SectionIntroContent;
  /** Only posts of this business line are shown. */
  division: BlogDivision;
  limit: number;
};

/** Latest blog posts ("Knowledge Hub"). The "view all" link lives in the intro. */
export async function BlogPreview({ intro, division, limit }: BlogPreviewProps) {
  const posts = (await getPostsByDivision(division)).slice(0, limit);
  if (posts.length === 0) return null;

  return (
    <section
      id="blog"
      className="flex section-fit flex-col items-center section-y bg-white section-x"
    >
      <Reveal className="w-full">
        <SectionIntro {...intro} />
      </Reveal>

      <div className="grid w-full items-stretch gap-6 tablet:grid-cols-2 desktop:grid-cols-3 desktop:gap-10">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.1} className="h-full">
            <BlogCard post={post} compact />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
