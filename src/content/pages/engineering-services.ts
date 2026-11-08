import type { Messages } from "@/content/messages/en";
import { blogDivisionHref } from "@/content/pages/blog";
import type {
  Cta,
  FeatureCard,
  HeroContent,
  ListGroup,
  ProjectGroup,
  ProjectStatus,
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

/** Follows the project flow, one row per phase: design, technical office, site and handover. */
const serviceCards: ({ key: keyof Texts["services"]["items"] } & Pick<
  ServiceCard,
  "icon" | "tint"
>)[] = [
  { key: "systemDesign", icon: "blueprint", tint: "blue" },
  { key: "specifications", icon: "files", tint: "pink" },
  { key: "designReview", icon: "magnifying-glass", tint: "yellow" },
  { key: "projectEngineering", icon: "clipboard", tint: "green" },
  { key: "costAnalysis", icon: "calculator", tint: "blue" },
  { key: "tender", icon: "file-text", tint: "pink" },
  { key: "coordination", icon: "cube", tint: "yellow" },
  { key: "shopDrawings", icon: "ruler", tint: "green" },
  { key: "commissioning", icon: "wrench", tint: "blue" },
];

const endUsers = {
  obo: "OBO (U.S. Department of State)",
  navfac: "NAVFAC (U.S. Navy)",
  nspa: "NSPA (NATO Support and Procurement Agency)",
  canada: "Public Works and Government Services Canada",
  grenada: "Ministry of Infrastructure Development, Grenada",
} as const;

type ProjectEntry = { name: string; region: string; endUser: string };

/** The first status is the one shown by default. */
const projectStatuses: ProjectStatus[] = ["completed", "ongoing"];

/**
 * Add a project here to list it. Official project and client names are shown as written
 * in every language; `region` is an ISO code that is translated automatically.
 */
const projects: Record<ProjectStatus, ProjectEntry[]> = {
  completed: [
    {
      name: "CMR Repair & Improvement Project (R&I)",
      region: "IS",
      endUser: endUsers.obo,
    },
    {
      name: "Regional Training Centre at Bouficha",
      region: "TN",
      endUser: endUsers.nspa,
    },
    { name: "Compound Security Upgrades", region: "SV", endUser: endUsers.obo },
    {
      name: "New Office Annex-D (NOX-D), U.S. Embassy Tunis",
      region: "TN",
      endUser: endUsers.obo,
    },
    {
      name: "Select Improvements CMR Main Residence, Guest House & Guard House",
      region: "DK",
      endUser: endUsers.obo,
    },
    {
      name: "Construction of a New High Commission of Canada",
      region: "LK",
      endUser: endUsers.canada,
    },
    {
      name: "Caribbean Regional Air Transport Connectivity Project (CATCOP)",
      region: "GD",
      endUser: endUsers.grenada,
    },
    { name: "Female Accommodation Facility", region: "JO", endUser: endUsers.nspa },
    {
      name: "Class V (ECM) Warehouse, Support Building & Infrastructure (Siauliai Air Base)",
      region: "LT",
      endUser: endUsers.nspa,
    },
    {
      name: "SAC Combined Aerial Port Facility (CAPF) - Papa Air Base",
      region: "HU",
      endUser: endUsers.nspa,
    },
  ],
  ongoing: [
    {
      name: "HVAC Equipment Replacement, U.S. Embassy Paris",
      region: "FR",
      endUser: endUsers.obo,
    },
    { name: "Repairs to UPH 24, F-165", region: "DG", endUser: endUsers.navfac },
    { name: "Repairs to UPH 25, F-165", region: "DG", endUser: endUsers.navfac },
    {
      name: "Repair HVAC and Fire Protection Systems, UPH 14",
      region: "DG",
      endUser: endUsers.navfac,
    },
    {
      name: "Repair HVAC and Fire Protection Systems, UPH 15",
      region: "DG",
      endUser: endUsers.navfac,
    },
  ],
};

export function getEngineeringServicesContent(t: Texts, locale: string) {
  const regionNames = new Intl.DisplayNames([locale], { type: "region" });

  return {
    meta: t.meta,

    hero: {
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
        { id: "references", label: t.sectionNav.references },
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
      intro: { title: t.capabilities.title } satisfies SectionIntro,
      groups: [t.capabilities.systems, t.capabilities.standards] satisfies ListGroup[],
    },

    references: {
      intro: {
        badge: t.references.badge,
        title: t.references.title,
        description: t.references.description,
      } satisfies SectionIntro,
      statusLabel: t.references.statusLabel,
      columns: t.references.columns,
      groups: projectStatuses.map((status) => ({
        id: status,
        label: t.references.status[status],
        projects: projects[status].map(({ name, region, endUser }) => ({
          name,
          endUser,
          location: regionNames.of(region) ?? region,
        })),
      })) satisfies ProjectGroup[],
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
