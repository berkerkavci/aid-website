/** Shared content shapes used by page content files and section components. */

export type Cta = { label: string; href: string };

/** Entry of the in-page section bar; `id` must match the section's `id` attribute. */
export type SectionLink = { id: string; label: string };

export type SectionIntro = {
  badge?: string;
  title: string;
  description?: string;
  /** Optional text link below the description (e.g. "View all articles"). */
  link?: Cta;
};

export type HeroContent = {
  badge: string;
  /** Words that rotate between "Your" and "Partner" in the headline. */
  rotatingWords: string[];
  description: string;
  /** Main action (solid white button). */
  primaryCta: Cta;
  /** Optional secondary action (outlined button). */
  secondaryCta?: Cta;
};

export type PartnerLogo = {
  name: string;
  src: string;
  /** Rendered size in px (height is 36px for most logos). */
  width: number;
  height: number;
};

export type FeatureCard = {
  title: string;
  description: string;
  /** Path under /public. */
  image: string;
};

export type Stat = { value: string; label: string };

/** Icon names map to Phosphor icons in `src/components/ui/icon.tsx`. */
export type IconName =
  | "robot"
  | "bell"
  | "gear"
  | "user-switch"
  | "envelope"
  | "phone"
  | "map-pin"
  | "clock"
  | "check-circle"
  | "clipboard"
  | "cube"
  | "ruler"
  | "calculator"
  | "file-text"
  | "files"
  | "magnifying-glass"
  | "wrench"
  | "fire-extinguisher";

export type IconTint = "blue" | "pink" | "yellow" | "green";

export type ServiceCard = {
  title: string;
  /** Optional — cards without a description render in a compact style. */
  description?: string;
  icon: IconName;
  tint: IconTint;
};

export type ListGroup = {
  title: string;
  intro: string;
  items: string[];
};
