import Image from "next/image";

import { Link } from "@/i18n/link";
import type { Post } from "@/lib/blog";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  post: Post;
  /** `sizes` hint for the cover image, depends on the grid it is rendered in. */
  imageSizes?: string;
  /**
   * Compact cards (used in previews) get a shorter cover on desktop that
   * scales with the viewport height, so a row of cards fits on one screen.
   */
  compact?: boolean;
};

export function BlogCard({
  post,
  imageSizes = "(min-width: 1200px) 33vw, (min-width: 810px) 50vw, 100vw",
  compact = false,
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition-[transform,box-shadow] duration-300 ease-framer hover:scale-[1.02] hover:shadow-card-hover"
    >
      <div
        className={cn(
          "relative aspect-[422/312] w-full overflow-hidden",
          compact && "desktop:aspect-auto desktop:h-[clamp(8.5rem,20svh,15rem)]",
        )}
      >
        <Image src={post.cover} alt="" fill sizes={imageSizes} className="object-cover" />
        <span aria-hidden className="absolute inset-0 border border-black/6" />
      </div>
      <div className={cn("flex flex-col px-6", compact ? "py-6 short:py-5" : "py-8")}>
        {/* Untranslated posts are shown in English; mark the language for screen readers. */}
        <h3 lang={post.translated ? undefined : "en"} className="type-h3 text-heading">
          {post.title}
        </h3>
        <p className="pt-2 type-body font-medium text-body">
          <time dateTime={post.date}>{post.dateLabel}</time>
        </p>
      </div>
    </Link>
  );
}
