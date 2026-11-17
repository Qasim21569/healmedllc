"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";

/**
 * SwapMaskText, port of brahma-web (Elementis `MaskTextClient`). Used only in I6.
 *
 * Swaps its lines whenever `state` changes; the mask direction follows the
 * direction of travel (forward pushes lines up, backward pulls them down).
 */
export function SwapMaskText({
  state,
  lines,
  className = "",
  style,
}: {
  state: number;
  lines: readonly ReactNode[];
  className?: string;
  style?: CSSProperties;
}) {
  const previous = useRef(state);
  const forward = state >= previous.current;
  const reduced = useReducedMotion();
  const duration = reduced ? 0 : 0.35;

  useEffect(() => {
    previous.current = state;
  }, [state]);

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: reduced ? 0 : 0.05,
        staggerDirection: forward ? 1 : -1,
      },
    },
  };

  const childVariants = {
    initial: {
      y: forward ? "100%" : "-100%",
      clipPath: forward ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)",
    },
    animate: { y: "0%", clipPath: "inset(0% 0% 0% 0%)", transition: { ease: EASE, duration } },
    exit: (custom: boolean) => ({
      y: custom ? "-100%" : "100%",
      clipPath: custom ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
      transition: { ease: EASE, duration },
    }),
  };

  return (
    <AnimatePresence mode="wait" initial={false} custom={forward}>
      <motion.div
        key={state}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={forward}
        variants={containerVariants}
        style={style}
        className={className}
      >
        {lines.map((line, i) => (
          <motion.div key={i} variants={childVariants} custom={forward} className="break-words">
            {line}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
