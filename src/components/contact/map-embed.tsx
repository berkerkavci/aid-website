"use client";

import { MapTrifold } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

type MapEmbedProps = {
  src: string;
  title: string;
  /** Address shown on the placeholder before the map is loaded. */
  address: string;
};

/**
 * Two-click Google Maps embed: nothing is requested from Google (no IP
 * transfer, no cookies) until the visitor explicitly chooses to load the map.
 */
export function MapEmbed({ src, title, address }: MapEmbedProps) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={title}
        src={src}
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full border-0"
      />
    );
  }

  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden bg-[#eef0fb] section-x">
      {/* Decorative street-grid pattern */}
      <div
        aria-hidden
        className="absolute inset-0 [background-image:linear-gradient(rgb(23_40_150/0.07)_1px,transparent_1px),linear-gradient(90deg,rgb(23_40_150/0.07)_1px,transparent_1px)] [background-size:48px_48px] opacity-60"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_50%,rgb(255_255_255/0.9),transparent)]"
      />

      <div className="relative flex max-w-[460px] flex-col items-center gap-4 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-white shadow-card-hover">
          <MapTrifold weight="light" className="size-6 text-brand" aria-hidden />
        </span>
        <p className="type-body font-medium text-ink">{address}</p>
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="rounded-button bg-ink px-5 py-2.5 type-button text-white outline-ink transition-opacity hover:opacity-90"
        >
          Show map
        </button>
        <p className="text-xs/[1.5] text-body">
          Loads Google Maps. Google receives your IP address and may set cookies — see our{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
