/**
 * Global site settings: brand, contact details and navigation.
 * Edit this file to change information that appears on every page.
 */

export type NavLink = { label: string; href: string };

/** Which part of the site a page belongs to — controls nav links and footer e-mail. */
export type SiteSection = "it" | "engineering" | "general";

export const siteConfig = {
  name: "AID",
  legalName: "AID Project Solutions",
  title: "AID | Alternative. Innovative. Design",
  description:
    "We simplify complex IT operations with smart monitoring, automation, and DevOps solutions—boosting efficiency and ensuring uptime.",
  ogImage: "/images/og-image.png",
  locale: "en_US",
  footerTagline:
    "AID is a technology and engineering consultancy focused on optimizing IT operations and infrastructure.",
} as const;

export const contactInfo = {
  emails: {
    it: "bkavci@aidprojectsolutions.com",
    engineering: "gkavci@aidprojectsolutions.com",
  },
  phones: ["+48798644643", "+905352101418"],
  offices: [
    {
      city: "Warsaw, Poland",
      address: "ul. Marszałkowska 84/92, lok: 2, 00-514 Warsaw/POLAND",
      mapUrl:
        "https://www.google.com/maps/search/ul.+Marsza%C5%82kowska+84%2F92/@52.2285008,21.0106042,17z",
    },
    {
      city: "Ankara, Turkey",
      address: "Bağlıca Mah. 1290. Sokak No:6B/5 Etimesgut/ANKARA",
      mapUrl:
        "https://www.google.com/maps/place/Ba%C4%9Fl%C4%B1ca,+1290.+Sk+No:6+D:5,+06790+Etimesgut%2FAnkara/@39.8853811,32.6269975,17z",
    },
  ],
  /** Google Maps embed shown on the contact page (Warsaw office). */
  mapEmbedUrl:
    "https://maps.google.com/maps?q=52.228621844795605%2C%2021.01321663687126&z=15&output=embed",
} as const;

export function getContactEmail(section: SiteSection) {
  return section === "engineering" ? contactInfo.emails.engineering : contactInfo.emails.it;
}

/** Top navigation — the two business lines are always one click away. */
export const mainNavigation: NavLink[] = [
  { label: "IT Services", href: "/it-services" },
  { label: "Engineering", href: "/engineering-services" },
  { label: "Blog", href: "/blog" },
];

export const contactLink: NavLink = { label: "Contact Us", href: "/contact" };

export const footerNavigation: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "IT Services", href: "/it-services" },
  { label: "Engineering Services", href: "/engineering-services" },
  { label: "Blog", href: "/blog" },
  contactLink,
];

export const legalNavigation: NavLink[] = [{ label: "Privacy Policy", href: "/privacy" }];

/** True when `href` is the current page or a parent of it (e.g. /blog for /blog/my-post). */
export function isActiveLink(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
