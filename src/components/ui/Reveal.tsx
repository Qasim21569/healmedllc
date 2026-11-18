"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { useIntroReleased } from "@/hooks/useIntroReleased";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right" | "none";

function offset(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
}

const tags = { div: motion.div, li: motion.li, span: motion.span } as const;

/**
 * Reveal (T2), port of brahma-web. Fade + 24px travel when scrolled into view.
 * Non-text only: buttons, chips, cards, list rows. Body copy uses MaskText.
 * Reduced motion: visible immediately, no travel.
 */
export function Reveal({
  children,
  as = "div",
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 24,
  once = true,
  amount = 0.2,
  className,
  style,
}: {
  children: ReactNode;
  as?: keyof typeof tags;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  amount?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once, amount });
  const released = useIntroReleased();
  const reduced = useReducedMotion();
  const Tag = tags[as];

  return (
    <Tag
      // All three tags are HTMLElements; the ref is only observed.
      ref={ref as never}
      data-reveal=""
      className={className}
      style={style}
      initial={{ opacity: 0, ...offset(direction, distance) }}
      animate={(inView && released) || reduced ? { opacity: 1, x: 0, y: 0 } : undefined}
      transition={{ duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}
