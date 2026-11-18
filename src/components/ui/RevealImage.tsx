"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { useIntroReleased } from "@/hooks/useIntroReleased";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

/**
 * RevealImage (I3), port of brahma-web. The inner block wipes in from an inset
 * clip while easing from 1.15 to 1. An entrance, not a scrub, so clip-path is
 * allowed. The wrapper defines size and aspect.
 */
export function RevealImage({
  children,
  className,
  style,
  once = true,
  amount = 0.25,
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  once?: boolean;
  amount?: number;
  delay?: number;
  /** "up" wipes upward from the bottom edge. */
  direction?: "up" | "down";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount });
  const reduced = useReducedMotion();
  const from = direction === "down" ? "inset(0% 0% 100% 0%)" : "inset(100% 0% 0% 0%)";
  const released = useIntroReleased();
  const show = (inView && released) || reduced;
  // Respect a caller that positions the frame itself (e.g. absolute inset-0).
  const positioned = /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className ?? "");

  return (
    // Both boxes are positioned: a fill image inside must size to this frame.
    // Without it the image only stays in the frame while the scale transform
    // runs, then grows to the next positioned ancestor once it ends.
    <div
      ref={ref}
      className={cn(!positioned && "relative", "overflow-hidden", className)}
      style={style}
    >
      <motion.div
        data-reveal=""
        className="relative size-full"
        initial={{ clipPath: from, scale: 1.15 }}
        animate={show ? { clipPath: "inset(0% 0% 0% 0%)", scale: 1 } : undefined}
        transition={{
          clipPath: { duration: reduced ? 0 : 0.8, delay: reduced ? 0 : delay, ease: EASE },
          scale: { duration: reduced ? 0 : 0.9, delay: reduced ? 0 : delay, ease: EASE },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
