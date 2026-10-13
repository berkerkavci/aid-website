"use client";

import { MotionConfig } from "motion/react";
import { useEffect, type ReactNode } from "react";

/**
 * When a page is opened from a shared link such as `/it-services#blog`, make
 * sure it lands on that section (the browser's own fragment scroll is lost
 * during hydration).
 */
function useScrollToHashOnLoad() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
}

/** App-wide client providers. Animations respect the OS "reduce motion" setting. */
export function Providers({ children }: { children: ReactNode }) {
  useScrollToHashOnLoad();
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
