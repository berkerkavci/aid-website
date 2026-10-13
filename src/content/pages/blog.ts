import type { Cta, SectionIntro } from "@/content/types";

export const blogIndexContent = {
  meta: {
    title: "Blog",
    description:
      "Thoughtful content on automation, monitoring, and digital transformation shaped by hands-on experience.",
  },
  title: "Knowledge Hub",
  description:
    "Thoughtful content on automation, monitoring, and digital transformation shaped by hands-on experience.",
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
