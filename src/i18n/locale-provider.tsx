"use client";

import { createContext, use, type ReactNode } from "react";

import { defaultLocale, type Locale } from "./config";

const LocaleContext = createContext<Locale>(defaultLocale);

/** Makes the current language available to Client Components (see `useLocale`). */
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext value={locale}>{children}</LocaleContext>;
}

export function useLocale() {
  return use(LocaleContext);
}
