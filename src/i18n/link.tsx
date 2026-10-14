"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";

import { localizePath } from "./config";
import { useLocale } from "./locale-provider";

/**
 * Drop-in replacement for `next/link` that keeps the visitor in their language:
 * `<Link href="/contact">` points to `/contact` in English and `/tr/contact` in Turkish.
 */
export function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  return (
    <NextLink href={typeof href === "string" ? localizePath(locale, href) : href} {...props} />
  );
}
