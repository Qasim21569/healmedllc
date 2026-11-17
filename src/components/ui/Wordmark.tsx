"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Wordmark rise (T8). The letters of a word rise `y: 100% → 0` with a 0.06s
 * stagger once 40% of it is in view. The wrapper clips, so letters come up
 * from behind an edge (the footer crops them at the bottom of the page).
 * Decorative: the word is hidden from assistive tech, the brand is named
 * elsewhere on the page. Reduced motion: letters sit in place.
 */
export function Wordmark({
  word,
  className,
  letterClassName,
}: {
  word: string;
  className?: string;
  letterClassName?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={cn("flex overflow-hidden", className)}
      initial="initial"
      whileInView={reduced ? undefined : "inView"}
      animate={reduced ? "inView" : undefined}
      viewport={{ once: true, amount: 0.4 }}
      variants={{ inView: { transition: { staggerChildren: reduced ? 0 : 0.06 } } }}
    >
      {word.split("").map((letter, i) => (
        <motion.span
          key={`${letter}${i}`}
          data-reveal=""
          className={cn("block", letterClassName)}
          variants={{
            initial: { y: "100%" },
            inView: { y: "0%", transition: { duration: reduced ? 0 : 0.8, ease: EASE } },
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}
