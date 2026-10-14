import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "@/i18n/config";

/**
 * Language routing.
 *
 * - `/tr/...`, `/de/...` etc. are served as they are.
 * - `/en/...` redirects to the plain path, so English has a single URL.
 * - Plain paths (`/it-services`) are English — the default for every visitor.
 *   Only a language the visitor picked in the switcher (cookie) is remembered.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, firstSegment] = pathname.split("/");

  if (isLocale(firstSegment)) {
    if (firstSegment !== defaultLocale) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  const preferred = preferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;

  if (preferred === defaultLocale) return NextResponse.rewrite(url);
  // Temporary: the target depends on the visitor's saved choice, not on the URL.
  return NextResponse.redirect(url, 307);
}

/** English unless the visitor chose another language in the switcher. */
function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  return isLocale(saved) ? saved : defaultLocale;
}

export const config = {
  // Everything except Next.js internals and files with an extension (images, robots.txt, …).
  matcher: ["/((?!_next/|_vercel/|.*\\..*).*)"],
};
