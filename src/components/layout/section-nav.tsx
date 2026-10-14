"use client";

import { useEffect, useRef } from "react";

import type { SectionLink } from "@/content/types";
import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/utils";

type SectionNavProps = {
  /** Page name shown at the start of the bar on desktop (e.g. "IT Services"). */
  title: string;
  links: SectionLink[];
  /** Accessible name of the bar, e.g. "On this page". */
  label: string;
};

/**
 * Sticky "on this page" bar. Placed right after the hero, it is visible on the
 * first screen and sticks below the header while scrolling. The section being
 * read is highlighted (scroll-spy) and links are regular #anchors, so every
 * section can be bookmarked or shared.
 */
export function SectionNav({ title, links, label }: SectionNavProps) {
  const active = useActiveSection(links.map((link) => link.id));
  const listRef = useRef<HTMLUListElement>(null);

  // On narrow screens keep the active item scrolled into view inside the bar.
  useEffect(() => {
    const list = listRef.current;
    if (!list || !active || list.scrollWidth <= list.clientWidth) return;
    const item = list.querySelector<HTMLElement>(`[data-section="${active}"]`);
    if (!item) return;
    const listBox = list.getBoundingClientRect();
    const itemBox = item.getBoundingClientRect();
    const offset = itemBox.left - listBox.left - (listBox.width - itemBox.width) / 2;
    list.scrollBy({ left: offset, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label={label}
      data-section-nav
      className="sticky top-(--header-height) z-40 border-b border-line bg-canvas/90 backdrop-blur-md"
    >
      {/* Height minus the 1px bottom border, so the whole bar is exactly --subnav-height. */}
      <div className="flex h-[calc(var(--subnav-height)-1px)] items-center gap-6 section-x">
        <p className="hidden shrink-0 font-display text-lg font-semibold text-ink desktop:block">
          {title}
        </p>
        <ul
          ref={listRef}
          className={cn(
            "flex flex-1 items-center gap-1 overflow-x-auto desktop:justify-end",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            // Soft fade on the edges hints that the bar scrolls on small screens.
            "max-desktop:-mx-3 max-desktop:[mask-image:linear-gradient(to_right,transparent,black_12px,black_calc(100%-12px),transparent)] max-desktop:px-3",
          )}
        >
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id} data-section={link.id} className="shrink-0">
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "inline-flex h-9 items-center rounded-full px-4 text-[0.9375rem] font-medium whitespace-nowrap transition-colors duration-200",
                    isActive ? "bg-brand/8 text-brand" : "text-body hover:bg-ink/5 hover:text-ink",
                  )}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
