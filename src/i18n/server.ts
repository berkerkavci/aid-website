import { locale as localeParam } from "next/root-params";

import { ar } from "@/content/messages/ar";
import { de } from "@/content/messages/de";
import { en, type Messages } from "@/content/messages/en";
import { es } from "@/content/messages/es";
import { fr } from "@/content/messages/fr";
import { pl } from "@/content/messages/pl";
import { tr } from "@/content/messages/tr";

import { defaultLocale, isLocale, type Locale } from "./config";

const messages: Record<Locale, Messages> = { en, tr, pl, de, fr, es, ar };

/**
 * Language of the current request, read from the `[locale]` URL segment.
 * Works in any Server Component (not in Client Components or Server Actions).
 */
export async function getLocale(): Promise<Locale> {
  const value = await localeParam();
  return isLocale(value) ? value : defaultLocale;
}

/** Texts for a language (defaults to the language of the current request). */
export async function getMessages(locale?: Locale): Promise<Messages> {
  return messages[locale ?? (await getLocale())];
}

/** Synchronous lookup for code that already knows the language (e.g. Server Actions). */
export function getMessagesFor(locale: Locale): Messages {
  return messages[locale];
}
