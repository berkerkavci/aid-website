import type { Messages } from "@/content/messages/en";
import type {
  Cta,
  FeatureCard,
  HeroContent,
  PartnerLogo,
  SectionIntro,
  SectionLink,
  ServiceCard,
  Stat,
} from "@/content/types";

/*
 * IT Services page: structure (links, icons, images, figures) lives here,
 * texts come from `src/content/messages/<language>.ts` → `itServices`.
 */

type Texts = Messages["itServices"];

const partners: PartnerLogo[] = [
  { name: "UiPath", src: "/images/partners/uipath.png", width: 97, height: 36 },
  { name: "Dynatrace", src: "/images/partners/dynatrace.png", width: 201, height: 36 },
  { name: "Amazon Web Services", src: "/images/partners/aws.png", width: 60, height: 36 },
  { name: "n8n", src: "/images/partners/n8n.png", width: 135, height: 36 },
  { name: "OpenText", src: "/images/partners/opentext.png", width: 169, height: 32 },
  {
    name: "Microsoft Power Automate",
    src: "/images/partners/power-automate.png",
    width: 124,
    height: 36,
  },
  { name: "SolarWinds", src: "/images/partners/solarwinds.png", width: 159, height: 36 },
];

const features: { key: keyof Texts["about"]["features"]; image: string }[] = [
  { key: "automation", image: "/images/features/shape-automation.png" },
  { key: "monitoring", image: "/images/features/shape-monitoring.png" },
  { key: "devops", image: "/images/features/shape-devops.png" },
];

const stats: { key: "experience" | "clients" | "countries"; value: string }[] = [
  { key: "experience", value: "10+" },
  { key: "clients", value: "50+" },
  { key: "countries", value: "15+" },
];

const serviceCards: ({ key: keyof Texts["services"]["items"] } & Pick<
  ServiceCard,
  "icon" | "tint"
>)[] = [
  { key: "automation", icon: "robot", tint: "blue" },
  { key: "monitoring", icon: "bell", tint: "pink" },
  { key: "configuration", icon: "gear", tint: "yellow" },
  { key: "itsm", icon: "user-switch", tint: "green" },
];

export function getItServicesContent(t: Texts) {
  return {
    meta: t.meta,

    hero: {
      badge: t.hero.badge,
      headline: t.hero.headline,
      rotatingWords: t.hero.rotatingWords,
      description: t.hero.description,
      primaryCta: { label: t.hero.primaryCta, href: "/contact?department=it" },
      // Jumps to the first section below the hero.
      secondaryCta: { label: t.hero.secondaryCta, href: "#about" },
    } satisfies HeroContent,

    /** In-page section bar shown below the hero. */
    sectionNav: {
      title: t.sectionNav.title,
      links: [
        { id: "about", label: t.sectionNav.about },
        { id: "services", label: t.sectionNav.services },
        { id: "blog", label: t.sectionNav.blog },
        { id: "contact", label: t.sectionNav.contact },
      ] satisfies SectionLink[],
    },

    partnersTitle: t.partnersTitle,
    partners,

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

    blog: {
      intro: {
        badge: t.blog.badge,
        title: t.blog.title,
        description: t.blog.description,
        link: { label: t.blog.link, href: "/blog" },
      } satisfies SectionIntro,
      limit: 3,
    },

    cta: {
      intro: {
        badge: t.cta.badge,
        title: t.cta.title,
        description: t.cta.description,
      } satisfies SectionIntro,
      button: { label: t.cta.button, href: "/contact?department=it" } satisfies Cta,
    },
  };
}
