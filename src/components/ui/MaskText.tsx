"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion } from "motion/react";
import type { Lines } from "@/content/types";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";

const tags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
  div: motion.div,
  li: motion.li,
} as const;

export type MaskTextTag = keyof typeof tags;

/**
 * MaskText (T1), port of brahma-web / Elementis.
 *
 * Each line animates `y: 100% → 0%` with `clipPath: inset(0 0 100% 0) → inset(0)`,
 * staggered by the parent. No overflow wrapper: the clip-path masks, and at
 * rest it is `inset(0)` so descenders are never cut.
 *
 * `lines` is a `Lines` object (hand-set desktop + optional mobile breaks; the
 * desktop array renders on the server and mobile swaps in after hydration, the
 * ResponsiveMaskText behaviour) or a plain array.
 * Reduced motion: every line shows immediately, no travel.
 */
export function MaskText({
  lines,
  as = "div",
  className = "",
  lineClassName = "",
  style,
  once = true,
  amount = 0.3,
  delay = 0,
  stagger = 0.08,
  id,
}: {
  lines: Lines | readonly ReactNode[];
  as?: MaskTextTag;
  className?: string;
  lineClassName?: string;
  style?: CSSProperties;
  once?: boolean;
  amount?: number;
  delay?: number;
  stagger?: number;
  id?: string;
}) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const Tag = tags[as];

  const list: readonly ReactNode[] =
    "desktop" in lines ? (isMobile && lines.mobile ? lines.mobile : lines.desktop) : lines;
  const swapped = "desktop" in lines && isMobile && Boolean(lines.mobile);

  const container = {
    initial: {},
    inView: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: reduced ? 0 : delay,
      },
    },
  };

  const line = {
    initial: { y: "100%", clipPath: "inset(0% 0% 100% 0%)" },
    inView: {
      y: "0%",
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { ease: EASE, duration: reduced ? 0 : 0.8 },
    },
  };

  return (
    <Tag
      id={id}
      initial="initial"
      whileInView={reduced ? undefined : "inView"}
      animate={reduced ? "inView" : undefined}
      viewport={{ once, amount }}
      variants={container}
      style={{ display: "block", ...style }}
      className={className}
    >
      {list.map((text, i) => (
        <motion.span
          key={`${swapped ? "m" : "d"}${i}`}
          data-reveal=""
          variants={line}
          style={{ display: "block" }}
          className={lineClassName}
        >
          {text}
        </motion.span>
      ))}
    </Tag>
  );
}
