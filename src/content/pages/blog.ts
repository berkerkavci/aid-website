import type { BlogDivision, Cta, SectionIntro } from "@/content/types";

export type BlogDivisionTab = {
  id: BlogDivision;
  label: string;
  /** Shown when the division has no posts yet. */
  empty: { title: string; description: string; cta: Cta };
};

export const blogIndexContent = {
  meta: {
    title: "Blog",
    description:
      "Insights on IT operations, automation and monitoring, and on building MEP engineering — shaped by hands-on experience.",
  },
  title: "Knowledge Hub",
  description:
    "Thoughtful content on automation, monitoring, and digital transformation shaped by hands-on experience.",
  /** Segmented control above the list. The first entry is the default. */
  divisions: [
    {
      id: "it",
      label: "IT Services",
      empty: {
        title: "IT articles are on their way",
        description: "We're preparing new insights on automation, monitoring and DevOps.",
        cta: { label: "Explore IT services", href: "/it-services" },
      },
    },
    {
      id: "engineering",
      label: "Engineering",
      empty: {
        title: "Engineering articles are coming soon",
        description:
          "We're preparing insights on MEP design, 3D coordination and commissioning. In the meantime, explore our engineering services.",
        cta: { label: "Explore engineering services", href: "/engineering-services" },
      },
    },
  ] satisfies BlogDivisionTab[],
};

/** Shown at the end of every blog post. */
export const blogPostContent = {
  backLink: { label: "All articles", href: "/blog" } satisfies Cta,
  related: {
    intro: { badge: "Blog", title: "Keep Reading" } satisfies SectionIntro,
    limit: 3,
  },
  cta: {
    intro: {
      badge: "Contact",
      title: "Let's Work Together",
      description:
        "Have a question about this topic or a project in mind? Connect with us to start building smarter solutions.",
    } satisfies SectionIntro,
    button: { label: "Contact Us", href: "/contact" } satisfies Cta,
  },
};

/** Link to the blog with a division pre-selected (the first division is the default). */
export function blogDivisionHref(division: BlogDivision) {
  return division === blogIndexContent.divisions[0]?.id ? "/blog" : `/blog?division=${division}`;
}
