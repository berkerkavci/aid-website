import Image from "next/image";
import type { CSSProperties } from "react";

import { Reveal } from "@/components/ui/reveal";
import type { PartnerLogo } from "@/content/types";

const LOGO_GAP = 60; // px between logos
const SPEED = 30; // px per second (same as the original)
const COPIES = 4; // enough copies to fill ultra-wide screens without gaps

/** Infinite, CSS-only logo marquee. */
export function PartnerMarquee({ logos }: { logos: PartnerLogo[] }) {
  if (logos.length === 0) return null;

  const setWidth = logos.reduce((sum, logo) => sum + logo.width + LOGO_GAP, 0);
  // The track moves by half its length (= 2 sets) per cycle.
  const duration = (setWidth * (COPIES / 2)) / SPEED;
  const track = Array.from({ length: COPIES }, () => logos).flat();

  return (
    <section aria-label="Technologies we work with" className="bg-white p-5 tablet:p-10">
      <Reveal>
        <div className="flex h-[82px] items-center overflow-hidden">
          <ul
            className="flex w-max shrink-0 items-center motion-safe:animate-marquee"
            style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
          >
            {track.map((logo, index) => {
              const isDuplicate = index >= logos.length;
              return (
                <li
                  key={index}
                  aria-hidden={isDuplicate || undefined}
                  className="flex h-9 shrink-0 items-center"
                  style={{ marginRight: LOGO_GAP }}
                >
                  <Image
                    src={logo.src}
                    alt={isDuplicate ? "" : logo.name}
                    width={logo.width}
                    height={logo.height}
                    sizes={`${logo.width}px`}
                    className="object-contain"
                    style={{ width: logo.width, height: logo.height }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
