import type { Messages } from "@/content/messages/en";
import { blogDivisionHref } from "@/content/pages/blog";
import type {
  Cta,
  FeatureCard,
  HeroContent,
  ListGroup,
  SectionIntro,
  SectionLink,
  ServiceCard,
  Stat,
} from "@/content/types";

/*
 * Engineering Services page: structure (links, icons, images, figures) lives here,
 * texts come from `src/content/messages/<language>.ts` → `engineeringServices`.
 */

type Texts = Messages["engineeringServices"];

const features: { key: keyof Texts["about"]["features"]; image: string }[] = [
  { key: "design", image: "/images/features/shape-automation.png" },
  { key: "coordination", image: "/images/features/shape-monitoring.png" },
  { key: "delivery", image: "/images/features/shape-devops.png" },
];

const stats: { key: "experience" | "clients" | "countries"; value: string }[] = [
  { key: "experience", value: "15+" },
  { key: "clients", value: "50+" },
  { key: "countries", value: "15+" },
];

const serviceCards: ({ key: keyof Texts["services"]["items"] } & Pick<
  ServiceCard,
  "icon" | "tint"
>)[] = [
  { key: "projectEngineering", icon: "clipboard", tint: "blue" },
  { key: "coordination", icon: "cube", tint: "pink" },
  { key: "shopDrawings", icon: "ruler", tint: "yellow" },
  { key: "costAnalysis", icon: "calculator", tint: "green" },
  { key: "tender", icon: "file-text", tint: "blue" },
  { key: "specifications", icon: "files", tint: "pink" },
  { key: "designReview", icon: "magnifying-glass", tint: "yellow" },
  { key: "commissioning", icon: "wrench", tint: "green" },
  { key: "fireProtection", icon: "fire-extinguisher", tint: "blue" },
];

export function getEngineeringServicesContent(t: Texts) {
  return {
    meta: t.meta,

    hero: {
      badge: t.hero.badge,
      headline: t.hero.headline,
      rotatingWords: t.hero.rotatingWords,
      description: t.hero.description,
      primaryCta: { label: t.hero.primaryCta, href: "/contact?department=engineering" },
      // Jumps to the first section below the hero.
      secondaryCta: { label: t.hero.secondaryCta, href: "#about" },
    } satisfies HeroContent,

    /** In-page section bar shown below the hero. */
    sectionNav: {
      title: t.sectionNav.title,
      links: [
        { id: "about", label: t.sectionNav.about },
        { id: "services", label: t.sectionNav.services },
        { id: "capabilities", label: t.sectionNav.capabilities },
        { id: "blog", label: t.sectionNav.blog },
        { id: "contact", label: t.sectionNav.contact },
      ] satisfies SectionLink[],
    },

    about: {
      intro: {
        badge: t.about.badge,
        title: t.about.title,
        description: t.about.description,
      } satisfies SectionIntro,
      features: features.map(({ key, image }) => ({
        ...t.about.features[key],
        image,
      })) satisfies FeatureCard[],
    },

    stats: {
      intro: { title: t.stats.title, description: t.stats.description } satisfies SectionIntro,
      items: stats.map(({ key, value }) => ({ value, label: t.stats[key] })) satisfies Stat[],
    },

    services: {
      intro: {
        badge: t.services.badge,
        title: t.services.title,
        description: t.services.description,
      } satisfies SectionIntro,
      items: serviceCards.map(({ key, ...card }) => ({
        ...t.services.items[key],
        ...card,
      })) satisfies ServiceCard[],
    },

    capabilities: {
      intro: { badge: t.capabilities.badge, title: t.capabilities.title } satisfies SectionIntro,
      groups: [t.capabilities.standards, t.capabilities.systems] satisfies ListGroup[],
    },

    blog: {
      intro: {
        badge: t.blog.badge,
        title: t.blog.title,
        description: t.blog.description,
        link: { label: t.blog.link, href: blogDivisionHref("engineering") },
      } satisfies SectionIntro,
      limit: 3,
    },

    cta: {
      intro: {
        badge: t.cta.badge,
        title: t.cta.title,
        description: t.cta.description,
      } satisfies SectionIntro,
      button: { label: t.cta.button, href: "/contact?department=engineering" } satisfies Cta,
    },
  };
}
