/**
 * Supported languages and URL helpers.
 *
 * URLs: English (the default) keeps the plain paths (`/it-services`); every other
 * language is prefixed (`/tr/it-services`, `/ar/blog/…`). `src/proxy.ts` maps
 * plain paths to the English pages and sends first-time visitors to their
 * browser language. To add a language: add it here, add a messages file in
 * `src/content/messages/` and (optionally) translated blog / privacy MDX files.
 */

export const locales = ["en", "tr", "pl", "de", "fr", "es", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Remembers the language a visitor picked in the switcher (read by the proxy). */
export const LOCALE_COOKIE = "NEXT_LOCALE";

type LocaleInfo = {
  /** Name of the language in that language — what the switcher shows. */
  nativeName: string;
  /** Short label shown on the switcher button. */
  shortName: string;
  dir: "ltr" | "rtl";
  /** BCP 47 tag used for dates and numbers. */
  intl: string;
  /** Open Graph locale (language_TERRITORY). */
  ogLocale: string;
};

export const localeInfo: Record<Locale, LocaleInfo> = {
  en: { nativeName: "English", shortName: "EN", dir: "ltr", intl: "en-US", ogLocale: "en_US" },
  tr: { nativeName: "Türkçe", shortName: "TR", dir: "ltr", intl: "tr-TR", ogLocale: "tr_TR" },
  pl: { nativeName: "Polski", shortName: "PL", dir: "ltr", intl: "pl-PL", ogLocale: "pl_PL" },
  de: { nativeName: "Deutsch", shortName: "DE", dir: "ltr", intl: "de-DE", ogLocale: "de_DE" },
  fr: { nativeName: "Français", shortName: "FR", dir: "ltr", intl: "fr-FR", ogLocale: "fr_FR" },
  es: { nativeName: "Español", shortName: "ES", dir: "ltr", intl: "es-ES", ogLocale: "es_ES" },
  // Latin digits keep figures ("15+", dates) consistent with the rest of the site.
  ar: {
    nativeName: "العربية",
    shortName: "AR",
    dir: "rtl",
    intl: "ar-u-nu-latn",
    ogLocale: "ar_AR",
  },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/**
 * Adds the language prefix to an internal path: ("tr", "/contact?x=1") → "/tr/contact?x=1".
 * Anchors (#about), external and mailto/tel links are returned unchanged.
 */
export function localizePath(locale: Locale, path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

/** Splits a pathname into its language and the language-independent path. */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const [, first = "", ...rest] = pathname.split("/");
  if (isLocale(first)) return { locale: first, path: `/${rest.join("/")}` };
  return { locale: defaultLocale, path: pathname || "/" };
}

/**
 * `alternates` for page metadata: canonical URL plus an hreflang link for every
 * language (search engines then show visitors the right language).
 */
export function localeAlternates(locale: Locale, path: string) {
  return {
    canonical: localizePath(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((code) => [code, localizePath(code, path)])),
      "x-default": localizePath(defaultLocale, path),
    },
  };
}
