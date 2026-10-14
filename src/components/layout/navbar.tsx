"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Logo } from "@/components/ui/logo";
import { contactLink, isActiveLink, mainNavigation } from "@/config/site";
import type { Messages } from "@/content/messages/en";
import { stripLocale } from "@/i18n/config";
import { Link } from "@/i18n/link";
import { cn } from "@/lib/utils";

import { LanguageSwitcher } from "./language-switcher";

export type NavbarLabels = Pick<Messages["common"], "nav" | "homeLabel" | "language" | "theme">;

type NavbarProps = {
  /**
   * "transparent" — sits on top of a dark hero and turns solid after scrolling.
   * "solid" — always solid (pages without a dark hero).
   */
  variant?: "transparent" | "solid";
  labels: NavbarLabels;
};

const SCROLL_THRESHOLD = 40;

// Small bar under the current page's link.
const activeIndicator =
  "relative after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:rounded-full after:bg-current";

export function Navbar({ variant = "transparent", labels }: NavbarProps) {
  const { path } = stripLocale(usePathname());
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (variant === "solid") return;
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  // Lock page scroll and enable Escape-to-close while the mobile menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    const desktop = window.matchMedia("(min-width: 810px)");
    const onBreakpoint = () => desktop.matches && setMenuOpen(false);
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [menuOpen]);

  const filled = (variant === "solid" || scrolled) && !menuOpen;
  const tone = filled ? "default" : "onDark";
  const closeMenu = () => setMenuOpen(false);
  const { nav } = labels;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "flex h-[72px] items-center justify-between gap-4 section-x transition-[background-color,box-shadow] duration-300 tablet:h-20",
          filled ? "bg-canvas shadow-nav" : "bg-transparent",
        )}
      >
        <Link href="/" aria-label={labels.homeLabel} onClick={closeMenu} className="shrink-0">
          <Logo tone={filled ? "brand" : "white"} />
        </Link>

        <div className="flex items-center gap-1 tablet:gap-4 desktop:gap-6">
          {/* Desktop & tablet */}
          <nav aria-label={nav.main} className="hidden tablet:block">
            <ul className="flex items-center gap-6 desktop:gap-12">
              {mainNavigation.map((link) => {
                const active = isActiveLink(path, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "text-lg/6 font-medium whitespace-nowrap transition-[color,opacity] duration-300 hover:opacity-70",
                        filled ? "text-heading" : "text-white",
                        active && activeIndicator,
                      )}
                    >
                      {nav[link.labelKey]}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href={contactLink.href}
                  aria-current={isActiveLink(path, contactLink.href) ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center rounded-button border px-[18px] py-2.5 text-lg/6 font-medium whitespace-nowrap transition-[background-color,color,box-shadow,filter] duration-300 hover:brightness-90",
                    filled
                      ? "border-white/12 bg-ink text-inverse shadow-button-dark outline-ink"
                      : "border-transparent bg-white text-black outline-white",
                  )}
                >
                  {nav[contactLink.labelKey]}
                </Link>
              </li>
            </ul>
          </nav>

          <span
            aria-hidden
            className={cn("hidden h-6 w-px tablet:block", filled ? "bg-line" : "bg-white/25")}
          />

          <div className="flex items-center">
            <LanguageSwitcher
              buttonLabel={labels.language.button}
              menuLabel={labels.language.menu}
              tone={tone}
            />
            <ThemeToggle label={labels.theme.toggle} tone={tone} />
          </div>

          {/* Phone */}
          <button
            type="button"
            className={cn(
              "relative -me-2 flex size-10 items-center justify-center tablet:hidden",
              filled ? "text-ink" : "text-white",
            )}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? nav.closeMenu : nav.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              aria-hidden
              className={cn(
                "absolute h-0.5 w-6 rounded-full bg-current transition-transform duration-300",
                menuOpen ? "rotate-45" : "-translate-y-1",
              )}
            />
            <span
              aria-hidden
              className={cn(
                "absolute h-0.5 w-6 rounded-full bg-current transition-transform duration-300",
                menuOpen ? "-rotate-45" : "translate-y-1",
              )}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label={nav.mobile}
            className="fixed inset-0 -z-10 bg-menu pt-[110px] tablet:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col items-center">
              {mainNavigation.map((link) => {
                const active = isActiveLink(path, link.href);
                return (
                  <li key={link.href} className="py-[15px]">
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block text-base/6 font-medium text-white",
                        active && activeIndicator,
                      )}
                    >
                      {nav[link.labelKey]}
                    </Link>
                  </li>
                );
              })}
              <li className="pt-[5px]">
                <Link
                  href={contactLink.href}
                  onClick={closeMenu}
                  className="inline-flex rounded-button bg-white px-[18px] py-2.5 text-base/6 font-medium text-black outline-white"
                >
                  {nav[contactLink.labelKey]}
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
