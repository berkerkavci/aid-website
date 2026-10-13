"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type WordTickerProps = {
  words: string[];
  /** Time each word stays on screen, in ms. */
  interval?: number;
  className?: string;
};

// Gradient text needs a little breathing room so descenders aren't clipped.
const wordClass = "col-start-1 row-start-1 -m-[0.15em] p-[0.15em]";

/**
 * Vertically rotating words with a gradient fill (hero headline).
 * Every word is rendered invisibly in the same grid cell so the box always
 * has the size of the longest word and the layout never jumps.
 */
export function WordTicker({ words, interval = 1400, className }: WordTickerProps) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || words.length < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [reduceMotion, words.length, interval]);

  return (
    <span aria-hidden className={cn("relative inline-grid", className)}>
      {words.map((word) => (
        <span key={word} className={cn(wordClass, "invisible")}>
          {word}
        </span>
      ))}
      <AnimatePresence initial={false}>
        <motion.span
          key={index}
          className={cn(wordClass, "text-gradient-hero")}
          initial={{ y: "115%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-115%", opacity: 0 }}
          transition={{ type: "spring", bounce: 0, duration: 0.6 }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
