import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps } from "react";

/** Element overrides for blog posts. Typography is styled by `.post-body` in globals.css. */
const components: MDXComponents = {
  a: ({ href = "", ...props }: ComponentProps<"a">) =>
    href.startsWith("/") || href.startsWith("#") ? (
      <Link href={href} {...props} />
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
