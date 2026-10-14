import type { ReactNode } from "react";

import { localeInfo, type Locale } from "./config";

/** Fills `{name}` placeholders: format("Hi {name}", { name: "Ada" }) → "Hi Ada". */
export function format(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}

/** Formats an ISO date (YYYY-MM-DD) for the given language, e.g. "May 4, 2025" / "4 May 2025". */
export function formatDate(isoDate: string, locale: Locale) {
  return new Intl.DateTimeFormat(localeInfo[locale].intl, {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(isoDate));
}

/**
 * Renders a translated sentence in which `<link>…</link>` marks the part that
 * becomes a link, so translators can move the link to wherever it fits.
 */
export function RichText({ text, link }: { text: string; link: (label: string) => ReactNode }) {
  const match = /<link>(.*?)<\/link>/.exec(text);
  if (!match) return text;
  return (
    <>
      {text.slice(0, match.index)}
      {link(match[1] ?? "")}
      {text.slice(match.index + match[0].length)}
    </>
  );
}
