import { ArrowDown, ArrowRight } from "@phosphor-icons/react/ssr";
import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

const variants = {
  /** White button with hairline border — used on dark hero backgrounds. */
  light:
    "type-button gap-2 rounded-button border border-[rgb(34_34_34/0.1)] bg-white px-6 py-3.5 text-ink outline-white hover:brightness-95",
  /** Translucent outlined button for secondary actions on dark backgrounds. */
  ghost:
    "type-button gap-2 rounded-button border border-white/30 bg-white/5 px-6 py-3.5 text-white outline-white backdrop-blur-sm hover:bg-white/12",
  /** Outlined button ("View All"). */
  outline:
    "gap-2 rounded-field border border-ink px-5 py-[15px] text-xl leading-6 font-medium tracking-[-0.03em] text-ink outline-ink hover:scale-[1.04]",
  /** Solid dark button with a large soft shadow ("Contact Us" call-to-action). */
  dark: "rounded-field bg-ink px-5 py-[15px] text-xl leading-6 font-medium tracking-[-0.02em] text-white shadow-cta outline-ink",
} as const;

type ButtonVariant = keyof typeof variants;

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className" | "children"> & {
  variant?: ButtonVariant;
  icon?: "arrow-right" | "arrow-down";
  className?: string;
  children: ReactNode;
};

const iconMap = { "arrow-right": ArrowRight, "arrow-down": ArrowDown };

export function ButtonLink({
  variant = "light",
  icon,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const IconComponent = icon ? iconMap[icon] : null;

  return (
    <Link
      className={cn(
        "group inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-[transform,filter,background-color] duration-300 ease-framer focus-visible:outline-2 focus-visible:outline-offset-4",
        variants[variant],
        className,
      )}
      {...props}
    >
      {variant === "dark" && typeof children === "string" ? <RollText text={children} /> : children}
      {IconComponent && <IconComponent weight="bold" className="size-5" aria-hidden />}
    </Link>
  );
}

/** Splits text into letters that "roll" upward on hover (see `.roll-char` in globals.css). */
export function RollText({ text }: { text: string }) {
  return (
    <span className="relative inline-flex h-[1.2em] overflow-hidden leading-[1.2em]">
      <span className="sr-only">{text}</span>
      <span aria-hidden className="inline-flex">
        {Array.from(text).map((char, index) => (
          <span key={index} className="roll-char" style={{ "--i": index } as CSSProperties}>
            {char}
          </span>
        ))}
      </span>
    </span>
  );
}
