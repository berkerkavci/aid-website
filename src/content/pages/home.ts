import type { Cta } from "@/content/types";

export type HomeServiceColumn = {
  badge: string;
  description: string;
  cta: Cta;
};

export const homeContent = {
  title: "Software & Engineering",
  subtitle: "One Company, Two Core Services",
  columns: [
    {
      badge: "Software Solutions",
      description:
        "We simplify complex IT operations with smart monitoring, automation, and DevOps solutions—boosting efficiency and ensuring uptime.",
      cta: { label: "Explore IT Services", href: "/it-services" },
    },
    {
      badge: "Engineering Solutions",
      description:
        "We simplify complex mechanical design with smart CAD modeling, prototyping, and engineering solutions.",
      cta: { label: "Explore Engineering Services", href: "/engineering-services" },
    },
  ] satisfies HomeServiceColumn[],
};
