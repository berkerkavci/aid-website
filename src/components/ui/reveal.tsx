"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Delay in seconds before the element starts animating. */
  delay?: number;
  /** Animate on mount instead of when the element scrolls into view (above-the-fold content). */
  immediate?: boolean;
};

const hidden = { opacity: 0, y: 50 };
const visible = { opacity: 1, y: 0 };

/** Fade-up entrance animation, matching the Framer "Appear" effect (50px, opacity 0 → 1). */
export function Reveal({ delay = 0, immediate = false, children, ...props }: RevealProps) {
  const transition = { type: "spring", bounce: 0, duration: 0.9, delay } as const;

  if (immediate) {
    return (
      <motion.div initial={hidden} animate={visible} transition={transition} {...props}>
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, amount: 0.2 }}
      transition={transition}
      {...props}
    >
      {children}
    </motion.div>
  );
}
