"use client";

import { Notebook } from "@phosphor-icons/react/ssr";
import { motion } from "motion/react";
import { useState, useSyncExternalStore } from "react";

import { BlogCard } from "@/components/blog/blog-card";
import { ButtonLink } from "@/components/ui/button";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { blogDivisionHref, type BlogDivisionTab } from "@/content/pages/blog";
import type { BlogDivision } from "@/content/types";
import type { Post } from "@/lib/blog";

const PANEL_ID = "blog-posts";

type BlogBrowserViewProps = {
  posts: Post[];
  divisions: BlogDivisionTab[];
  /** Accessible name of the segmented control, e.g. "Blog category". */
  label: string;
  division: BlogDivision;
  onChange?: (division: BlogDivision) => void;
};

function EmptyState({ title, description, cta }: BlogDivisionTab["empty"]) {
  return (
    <div className="flex flex-col items-center gap-5 rounded-card border border-line bg-surface px-6 py-14 text-center tablet:py-20">
      <span className="flex size-14 items-center justify-center rounded-full bg-tint-blue">
        <Notebook weight="light" className="size-7 text-brand" aria-hidden />
      </span>
      <div className="flex flex-col gap-2">
        <h2 className="type-h3 text-ink">{title}</h2>
        <p className="max-w-[460px] type-body text-body">{description}</p>
      </div>
      <ButtonLink href={cta.href} variant="outline" icon="arrow-right">
        {cta.label}
      </ButtonLink>
    </div>
  );
}

/** Segmented control + the posts of the selected division (presentational). */
export function BlogBrowserView({
  posts,
  divisions,
  label,
  division,
  onChange,
}: BlogBrowserViewProps) {
  const [hasSwitched, setHasSwitched] = useState(false);
  const active = divisions.find((item) => item.id === division) ?? divisions[0];
  if (!active) return null;
  const visiblePosts = posts.filter((post) => post.division === active.id);

  const handleChange = (next: BlogDivision) => {
    setHasSwitched(true);
    onChange?.(next);
  };

  return (
    <div className="flex w-full flex-col items-center gap-10 tablet:gap-12">
      <SegmentedControl
        options={divisions.map((item) => ({ value: item.id, label: item.label }))}
        value={active.id}
        onChange={onChange ? handleChange : undefined}
        label={label}
        idPrefix="blog-division"
        controls={PANEL_ID}
        className="w-full tablet:w-auto tablet:min-w-[24rem]"
      />

      <div
        id={PANEL_ID}
        role="tabpanel"
        aria-labelledby={`blog-division-tab-${active.id}`}
        className="w-full"
      >
        {/* New content appears immediately and fades in (only after the visitor switches). */}
        <motion.div
          key={active.id}
          initial={hasSwitched ? { opacity: 0, y: 12 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {visiblePosts.length > 0 ? (
            <div className="grid w-full items-stretch gap-6 tablet:grid-cols-2 tablet:gap-10">
              {visiblePosts.map((post) => (
                <BlogCard key={post.slug} post={post} imageSizes="(min-width: 810px) 50vw, 100vw" />
              ))}
            </div>
          ) : (
            <EmptyState {...active.empty} />
          )}
        </motion.div>
      </div>
    </div>
  );
}

/*
 * The selected division is stored in the URL (`/blog?division=engineering`)
 * so filtered views can be shared and bookmarked. The URL is read as an
 * external store: the server (static HTML) renders the default division and
 * the browser switches to the requested one right after hydration.
 */
const DIVISION_CHANGE_EVENT = "blog:division-change";

function subscribeToUrl(onStoreChange: () => void) {
  window.addEventListener("popstate", onStoreChange);
  window.addEventListener(DIVISION_CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("popstate", onStoreChange);
    window.removeEventListener(DIVISION_CHANGE_EVENT, onStoreChange);
  };
}

const readDivisionFromUrl = () => new URLSearchParams(window.location.search).get("division");
const readDivisionOnServer = () => null;

/** Interactive blog list with a segmented division filter. */
export function BlogBrowser({
  posts,
  divisions,
  label,
}: Omit<BlogBrowserViewProps, "division" | "onChange">) {
  const requested = useSyncExternalStore(subscribeToUrl, readDivisionFromUrl, readDivisionOnServer);
  const division = divisions.find((item) => item.id === requested)?.id ?? divisions[0]?.id ?? "it";

  const onChange = (next: BlogDivision) => {
    // Update the address bar (keeping the language prefix) without a navigation or scroll jump.
    const url = new URL(blogDivisionHref(next), window.location.origin);
    window.history.replaceState(window.history.state, "", window.location.pathname + url.search);
    window.dispatchEvent(new Event(DIVISION_CHANGE_EVENT));
  };

  return (
    <BlogBrowserView
      posts={posts}
      divisions={divisions}
      label={label}
      division={division}
      onChange={onChange}
    />
  );
}
