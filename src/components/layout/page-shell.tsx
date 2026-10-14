import type { ReactNode } from "react";

import type { SiteSection } from "@/config/site";
import { getMessages } from "@/i18n/server";

import { Footer } from "./footer";
import { Navbar } from "./navbar";

type PageShellProps = {
  children: ReactNode;
  /** Which business line the page belongs to (decides the e-mail shown in the footer). */
  section?: SiteSection;
  /** Use "transparent" only on pages that start with a dark hero. */
  navVariant?: "transparent" | "solid";
};

/** Navigation + main content + footer. Every page except the landing page uses it. */
export async function PageShell({
  children,
  section = "general",
  navVariant = "solid",
}: PageShellProps) {
  const { common } = await getMessages();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-[60] focus:rounded-button focus:bg-surface focus:px-4 focus:py-2 focus:text-ink"
      >
        {common.skipToContent}
      </a>
      <Navbar
        variant={navVariant}
        labels={{
          nav: common.nav,
          homeLabel: common.homeLabel,
          language: common.language,
          theme: common.theme,
        }}
      />
      <main id="main-content">{children}</main>
      <Footer section={section} />
    </>
  );
}
