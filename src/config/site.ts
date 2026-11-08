/**
 * Global site settings: brand, contact details and navigation.
 * Edit this file to change information that appears on every page.
 * Visible labels are translated in `src/content/messages/<language>.ts`.
 */

import type { Messages } from "@/content/messages/en";

type NavLabelKey = keyof Messages["common"]["nav"];

export type NavLink = { labelKey: NavLabelKey; href: string };

/** Which part of the site a page belongs to — controls nav links and footer e-mail. */
export type SiteSection = "it" | "engineering" | "general";

export const siteConfig = {
  name: "AID",
  legalName: "AID Project Solutions",
  title: "AID | Alternative. Innovative. Design",
  ogImage: "/images/og-image.png",
} as const;

type Office = {
  /** City label comes from `site.offices.<key>` in the messages files. */
  key: keyof Messages["site"]["offices"];
  address: string;
  mapUrl: string;
};

const offices: Office[] = [
  {
    key: "warsaw",
    address: "ul. Marszałkowska 84/92, lok: 2, 00-514 Warsaw/POLAND",
    mapUrl:
      "https://www.google.com/maps/search/ul.+Marsza%C5%82kowska+84%2F92/@52.2285008,21.0106042,17z",
  },
  {
    key: "ankara",
    address: "Bağlıca Mah. 1290. Sokak Etimesgut/ANKARA",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Ba%C4%9Fl%C4%B1ca%20Mah.%201290.%20Sokak%2C%20Etimesgut%2FAnkara",
  },
];

export const contactInfo = {
  emails: {
    it: "bkavci@aidprojectsolutions.com",
    engineering: "gkavci@aidprojectsolutions.com",
  },
  /** Grouped by business line, so callers can see whom to reach for what. */
  phones: {
    engineering: ["+90 507 760 89 02"],
    it: ["+48 798 644 643", "+90 535 210 14 18"],
  },
  offices,
  /** Google Maps embed shown on the contact page (Warsaw office). */
  mapEmbedUrl:
    "https://maps.google.com/maps?q=52.228621844795605%2C%2021.01321663687126&z=15&output=embed",
} as const;

export function getContactEmail(section: SiteSection) {
  return section === "engineering" ? contactInfo.emails.engineering : contactInfo.emails.it;
}

/** `tel:` link for a phone number written with spaces. */
export function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}

/** Top navigation — the two business lines are always one click away. */
export const mainNavigation: NavLink[] = [
  { labelKey: "itServices", href: "/it-services" },
  { labelKey: "engineering", href: "/engineering-services" },
  { labelKey: "blog", href: "/blog" },
];

export const contactLink: NavLink = { labelKey: "contact", href: "/contact" };

export const footerNavigation: NavLink[] = [
  { labelKey: "home", href: "/" },
  { labelKey: "itServices", href: "/it-services" },
  { labelKey: "engineeringServices", href: "/engineering-services" },
  { labelKey: "blog", href: "/blog" },
  contactLink,
];

/** True when `path` (without language prefix) is `href` or a page below it (/blog/my-post). */
export function isActiveLink(path: string, href: string) {
  return path === href || path.startsWith(`${href}/`);
}
