import type { Messages } from "@/content/messages/en";
import type { BlogDivision, Cta, SectionIntro } from "@/content/types";

export type BlogDivisionTab = {
  id: BlogDivision;
  label: string;
  /** Shown when the division has no posts yet. */
  empty: { title: string; description: string; cta: Cta };
};

/** Order of the segmented control above the list. The first entry is the default. */
const divisions: { id: BlogDivision; emptyHref: string }[] = [
  { id: "it", emptyHref: "/it-services" },
  { id: "engineering", emptyHref: "/engineering-services" },
];

export function getBlogIndexContent(t: Messages["blog"]) {
  return {
    meta: t.meta,
    title: t.title,
    description: t.description,
    categoryLabel: t.categoryLabel,
    divisions: divisions.map(({ id, emptyHref }) => ({
      id,
      label: t.divisions[id].label,
      empty: {
        title: t.divisions[id].emptyTitle,
        description: t.divisions[id].emptyDescription,
        cta: { label: t.divisions[id].emptyCta, href: emptyHref },
      },
    })) satisfies BlogDivisionTab[],
  };
}

/** Shown around every blog post. */
export function getBlogPostContent(t: Messages["blog"]["post"]) {
  return {
    backLink: { label: t.backLink, href: "/blog" } satisfies Cta,
    untranslated: t.untranslated,
    related: {
      label: t.relatedLabel,
      intro: { badge: t.relatedBadge, title: t.relatedTitle } satisfies SectionIntro,
      limit: 3,
    },
    cta: {
      intro: {
        badge: t.cta.badge,
        title: t.cta.title,
        description: t.cta.description,
      } satisfies SectionIntro,
      button: { label: t.cta.button, href: "/contact" } satisfies Cta,
    },
  };
}

/** Link to the blog with a division pre-selected (the first division is the default). */
export function blogDivisionHref(division: BlogDivision) {
  return division === divisions[0]?.id ? "/blog" : `/blog?division=${division}`;
}
