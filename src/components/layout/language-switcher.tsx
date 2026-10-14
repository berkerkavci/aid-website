"use client";

import { CaretDown, Check, Globe } from "@phosphor-icons/react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";

import {
  LOCALE_COOKIE,
  localeInfo,
  locales,
  localizePath,
  stripLocale,
  type Locale,
} from "@/i18n/config";
import { format } from "@/i18n/format";
import { useLocale } from "@/i18n/locale-provider";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  /** Accessible name of the button; `{language}` is replaced with the current language. */
  buttonLabel: string;
  /** Accessible name of the list of languages. */
  menuLabel: string;
  /** "onDark" = white text for the transparent header over a dark hero. */
  tone?: "default" | "onDark";
  className?: string;
};

const ONE_YEAR = 60 * 60 * 24 * 365;

/** Saves the choice so the proxy opens the site in this language next time. */
function rememberLocale(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${ONE_YEAR}; samesite=lax`;
}

/**
 * Language menu (disclosure pattern): a button showing the current language
 * and a list of links to the same page in every other language. The choice is
 * remembered in a cookie so the site opens in that language next time.
 */
export function LanguageSwitcher({
  buttonLabel,
  menuLabel,
  tone = "default",
  className,
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const { path } = stripLocale(usePathname());
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const switchTo = (event: MouseEvent<HTMLAnchorElement>, target: Locale) => {
    event.preventDefault();
    rememberLocale(target);
    // Keep the visitor on the same page, filter (?division=…) and section (#…).
    window.location.assign(
      localizePath(target, path) + window.location.search + window.location.hash,
    );
  };

  return (
    <div
      ref={rootRef}
      className={cn("relative", className)}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={format(buttonLabel, { language: localeInfo[locale].nativeName })}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex h-10 items-center gap-1.5 rounded-full px-2.5 text-[0.9375rem] font-medium transition-colors duration-200",
          tone === "onDark"
            ? "text-white outline-white hover:bg-white/12"
            : "text-ink outline-ink hover:bg-ink/6",
          open && (tone === "onDark" ? "bg-white/12" : "bg-ink/6"),
        )}
      >
        <Globe weight="bold" aria-hidden className="size-5" />
        <span>{localeInfo[locale].shortName}</span>
        <CaretDown
          weight="bold"
          aria-hidden
          className={cn(
            "size-3 transition-transform duration-200 motion-reduce:transition-none",
            open && "rotate-180",
          )}
        />
      </button>

      <ul
        id={menuId}
        aria-label={menuLabel}
        className={cn(
          "absolute end-0 top-full z-50 mt-2 w-52 flex-col gap-0.5 rounded-field border border-line bg-surface-raised p-1.5 shadow-dropdown",
          "origin-top animate-dropdown-in motion-reduce:animate-none",
          open ? "flex" : "hidden",
        )}
      >
        {locales.map((code) => {
          const current = code === locale;
          return (
            <li key={code}>
              <a
                href={localizePath(code, path)}
                hrefLang={code}
                lang={code}
                aria-current={current ? "true" : undefined}
                onClick={(event) => switchTo(event, code)}
                className={cn(
                  "flex items-center gap-3 rounded-[0.5rem] px-3 py-2.5 text-[0.9375rem] text-ink transition-colors hover:bg-brand/[0.06] focus-visible:bg-brand/[0.06]",
                  current && "font-medium",
                )}
              >
                {/* <bdi> keeps "العربية" readable without changing the row's alignment. */}
                <span className="min-w-0 flex-1 truncate">
                  <bdi>{localeInfo[code].nativeName}</bdi>
                </span>
                {current ? (
                  <Check weight="bold" aria-hidden className="size-4 shrink-0 text-brand" />
                ) : (
                  <span aria-hidden className="text-xs font-medium text-muted">
                    {localeInfo[code].shortName}
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
