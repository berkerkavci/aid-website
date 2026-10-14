"use client";

import { MapTrifold } from "@phosphor-icons/react";
import { useState } from "react";

import { RichText } from "@/i18n/format";
import { Link } from "@/i18n/link";

type MapEmbedProps = {
  src: string;
  /** Address shown on the placeholder before the map is loaded. */
  address: string;
  texts: {
    /** Title of the map iframe (read by screen readers). */
    title: string;
    show: string;
    /** Consent note; `<link>…</link>` becomes a link to the privacy policy. */
    consent: string;
  };
};

/**
 * Two-click Google Maps embed: nothing is requested from Google (no IP
 * transfer, no cookies) until the visitor explicitly chooses to load the map.
 */
export function MapEmbed({ src, address, texts }: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={texts.title}
        src={src}
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full border-0"
      />
    );
  }

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden bg-surface-muted section-x">
      {/* Decorative street-grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(rgb(23_40_150/0.07)_1px,transparent_1px),linear-gradient(90deg,rgb(23_40_150/0.07)_1px,transparent_1px)] [background-size:48px_48px] opacity-60 dark:[background-image:linear-gradient(rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.06)_1px,transparent_1px)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_50%,var(--color-canvas),transparent)] opacity-90"
      />

      <div className="relative flex max-w-[460px] flex-col items-center gap-4 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-surface-raised shadow-card-hover">
          <MapTrifold weight="light" className="size-6 text-brand" aria-hidden />
        </span>
        <p className="type-body font-medium text-ink">{address}</p>
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="rounded-button bg-ink px-5 py-2.5 type-button text-inverse outline-ink transition-opacity hover:opacity-90"
        >
          {texts.show}
        </button>
        <p className="text-xs/[1.5] text-body">
          <RichText
            text={texts.consent}
            link={(label) => (
              <Link href="/privacy" className="underline underline-offset-2">
                {label}
              </Link>
            )}
          />
        </p>
      </div>
    </div>
  );
}
