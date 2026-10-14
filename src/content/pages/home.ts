import type { Messages } from "@/content/messages/en";
import type { Cta } from "@/content/types";

export type HomeServiceColumn = {
  badge: string;
  description: string;
  cta: Cta;
};

/** Landing page: texts from `src/content/messages/<language>.ts` → `home`. */
export function getHomeContent(t: Messages["home"]) {
  return {
    title: t.title,
    subtitle: t.subtitle,
    columns: [
      {
        badge: t.software.badge,
        description: t.software.description,
        cta: { label: t.software.cta, href: "/it-services" },
      },
      {
        badge: t.engineering.badge,
        description: t.engineering.description,
        cta: { label: t.engineering.cta, href: "/engineering-services" },
      },
    ] satisfies HomeServiceColumn[],
  };
}
