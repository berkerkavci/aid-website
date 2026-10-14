import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";

import { Link } from "@/i18n/link";

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
