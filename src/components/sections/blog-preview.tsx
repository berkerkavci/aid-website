import { BlogCard } from "@/components/blog/blog-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionIntro } from "@/components/ui/section-intro";
import type { BlogDivision, SectionIntro as SectionIntroContent } from "@/content/types";
import { getPostsByDivision } from "@/lib/blog";
import { cn } from "@/lib/utils";

type BlogPreviewProps = {
  intro: SectionIntroContent;
  /** Only posts of this business line are shown. */
  division: BlogDivision;
  limit: number;
  /** Use "glow" when the previous section is white, so neighbouring sections stay distinct. */
  background?: "white" | "glow";
};

/** Latest blog posts ("Knowledge Hub"). The "view all" link lives in the intro. */
export async function BlogPreview({
  intro,
  division,
  limit,
  background = "white",
}: BlogPreviewProps) {
  const posts = (await getPostsByDivision(division)).slice(0, limit);
  if (posts.length === 0) return null;

  return (
    <section
      id="blog"
      className={cn(
        "flex section-fit flex-col items-center section-y section-x",
        background === "glow" ? "bg-glow-bottom" : "bg-white",
      )}
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
