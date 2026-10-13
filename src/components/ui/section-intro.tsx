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

/** Badge + heading + lead paragraph — the header pattern used by every section. */
export function SectionIntro({
  badge,
  title,
  description,
  align = "center",
  tone = "light",
  as: Heading = "h2",
  className,
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center" ? "items-center text-center" : "items-start text-left",
        tone === "dark" ? "text-white" : "text-ink",
        className,
      )}
    >
      {badge && <Badge>{badge}</Badge>}
      <Heading className="max-w-[360px] type-h2">{title}</Heading>
      {description && <p className="max-w-[720px] type-lead">{description}</p>}
    </div>
  );
}
