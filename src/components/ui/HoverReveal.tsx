"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE } from "@/lib/motion";

/**
 * HoverReveal (T11), port of brahma-web (Elementis / the-line). Cross-fades
 * between two text states on hover with a brief flicker. Both states carry the
 * same meaning, so touch users lose nothing by never seeing the hover text.
 */
export function HoverReveal({
  defaultText,
  hoverText,
  className = "",
}: {
  defaultText: ReactNode;
  hoverText: ReactNode;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={hovered ? "after" : "before"}
          className="inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0 } }}
          exit={{
            opacity: [0, 0, 1, 1, 0, 0],
            transition: { duration: 0.3, times: [0, 0.33, 0.33, 0.66, 0.66, 1], ease: EASE },
          }}
        >
          {hovered ? hoverText : defaultText}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
