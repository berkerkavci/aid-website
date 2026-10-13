import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  /** "light" = white pill with hairline border, "glass" = translucent pill for dark backgrounds. */
  variant?: "light" | "glass";
  className?: string;
};

export function Badge({ children, variant = "light", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-button px-4 py-2 type-badge",
        variant === "light" && "border border-line bg-white text-ink",
        variant === "glass" && "bg-glass text-glass-text backdrop-blur-[50px]",
        className,
      )}
    >
      {children}
    </span>
  );
}
