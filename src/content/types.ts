/** Shared content shapes used by page content files and section components. */

export type Cta = { label: string; href: string };

export type SectionIntro = {
  badge?: string;
  title: string;
  description?: string;
};

export type HeroContent = {
  badge: string;
  /** Words that rotate between "Your" and "Partner" in the headline. */
  rotatingWords: string[];
  description: string;
  cta: Cta;
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
export type IconName = "robot" | "bell" | "gear" | "user-switch" | "envelope" | "phone" | "map-pin";

export type IconTint = "blue" | "pink" | "yellow" | "green";

export type ServiceCard = {
  title: string;
  description: string;
  icon: IconName;
  tint: IconTint;
};

export type ListGroup = {
  intro: string;
  items: string[];
};
