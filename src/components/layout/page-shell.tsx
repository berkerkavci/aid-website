import type { ReactNode } from "react";

import { getNavLinks, type SiteSection } from "@/config/site";

import { Footer } from "./footer";
import { Navbar } from "./navbar";

type PageShellProps = {
  children: ReactNode;
  /** Which part of the site the page belongs to (nav links + footer e-mail). */
  section?: SiteSection;
  /** Use "transparent" only on pages that start with a dark hero. */
  navVariant?: "transparent" | "solid";
};

/** Navigation + main content + footer. Every page except the landing page uses it. */
export function PageShell({ children, section = "general", navVariant = "solid" }: PageShellProps) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-button focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar links={getNavLinks(section)} variant={navVariant} />
      <main id="main-content">{children}</main>
      <Footer section={section} />
    </>
  );
}
