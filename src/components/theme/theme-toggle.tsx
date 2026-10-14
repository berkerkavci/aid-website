"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

import { THEME_STORAGE_KEY, type Theme } from "./theme";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.add("theme-switching");
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  // Flush styles with transitions disabled, then turn transitions back on.
  void window.getComputedStyle(root).color;
  window.setTimeout(() => root.classList.remove("theme-switching"), 0);
}

type ThemeToggleProps = {
  /** Accessible name, e.g. "Dark mode" (the button is a toggle: pressed = dark). */
  label: string;
  /** "onDark" = white icon for the transparent header over a dark hero. */
  tone?: "default" | "onDark";
  className?: string;
};

/** Light / dark switch. The site starts light; the visitor's choice is remembered. */
export function ThemeToggle({ label, tone = "default", className }: ThemeToggleProps) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as const);

  const toggle = () => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode); the theme still switches for this page.
    }
    applyTheme(next);
  };

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={theme === "dark"}
      onClick={toggle}
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-200",
        tone === "onDark"
          ? "text-white outline-white hover:bg-white/12"
          : "text-ink outline-ink hover:bg-ink/6",
        className,
      )}
    >
      {/* Icons are switched with CSS so the first paint is already correct. */}
      <Moon weight="bold" aria-hidden className="size-5 dark:hidden" />
      <Sun weight="bold" aria-hidden className="hidden size-5 dark:block" />
    </button>
  );
}
