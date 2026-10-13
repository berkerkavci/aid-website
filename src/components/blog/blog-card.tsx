import Image from "next/image";
import Link from "next/link";

import type { Post } from "@/lib/blog";
import { formatDate } from "@/lib/utils";

type BlogCardProps = {
  post: Post;
  /** `sizes` hint for the cover image, depends on the grid it is rendered in. */
  imageSizes?: string;
};

export function BlogCard({
  post,
  imageSizes = "(min-width: 1200px) 33vw, (min-width: 810px) 50vw, 100vw",
}: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-white transition-[transform,box-shadow] duration-300 ease-framer hover:scale-[1.02] hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <div className="relative aspect-[422/312] w-full overflow-hidden">
        <Image src={post.cover} alt="" fill sizes={imageSizes} className="object-cover" />
        <span aria-hidden className="absolute inset-0 border border-black/6" />
      </div>
      <div className="flex flex-col px-6 py-8">
        <h3 className="type-h3 text-black">{post.title}</h3>
        <p className="pt-2 type-body font-medium text-body">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
      </div>
    </Link>
  );
}
