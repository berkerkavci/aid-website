import { ArrowRight } from "@phosphor-icons/react/ssr";
import Link from "next/link";

import type { SectionIntro as SectionIntroContent } from "@/content/types";
import { cn } from "@/lib/utils";

import { Badge } from "./badge";

type SectionIntroProps = SectionIntroContent & {
  align?: "center" | "left";
  /** "dark" renders white text for use on dark section backgrounds. */
  tone?: "light" | "dark";
  /** Heading level — use "h1" when the intro is the page's main heading. */
  as?: "h1" | "h2";
  className?: string;
};

/** Badge + heading + lead paragraph (+ optional link) — the header pattern used by every section. */
export function SectionIntro({
  badge,
  title,
  description,
  link,
  align = "center",
  tone = "light",
  as: Heading = "h2",
  className,
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 desktop:gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        tone === "dark" ? "text-white" : "text-ink",
        className,
      )}
    >
      {badge && <Badge>{badge}</Badge>}
      <Heading className="max-w-[900px] type-h2 text-balance">{title}</Heading>
      {description && <p className="max-w-[800px] type-lead">{description}</p>}
      {link && (
        <Link
          href={link.href}
          className="group inline-flex items-center gap-2 type-button underline-offset-4 hover:underline"
        >
          {link.label}
          <ArrowRight
            weight="bold"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      )}
    </div>
  );
}
