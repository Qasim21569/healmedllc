"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * ParallaxContainer (I4), port of brahma-web / Elementis.
 *
 * The image moves inside its own frame as you scroll: the outer element clips,
 * the inner one translates (and, when the frame is shorter than the viewport,
 * scales slightly so no edge shows). `origin-bottom` anchors the growth.
 *
 * `enabled={false}` keeps the same DOM with no transform, so callers can
 * switch the effect off on small screens or reduced motion without
 * remounting the image. Use `ResponsiveImage` for the standard breakpoints.
 */
export function ParallaxContainer({
  children,
  className = "",
  frameClassName = "",
  style,
  parallaxAmount,
  enabled = true,
}: {
  children: ReactNode;
  className?: string;
  frameClassName?: string;
  style?: CSSProperties;
  /** Travel as a percentage of the frame: 8 in sections, 20 for full-bleed bands. */
  parallaxAmount: number;
  enabled?: boolean;
}) {
  const frame = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });

  const transform = useTransform(scrollYProgress, (latest) => {
    if (!enabled) return "none";
    const vh = globalThis.window?.innerHeight ?? 0;
    const h = frame.current?.getBoundingClientRect().height ?? 0;

    if (h >= vh) {
      return `translateY(${latest * parallaxAmount * 2 - parallaxAmount}%) scale(1)`;
    }

    const scrolled = latest * (vh + h);
    const denom = vh - h || 1;
    return `translateY(${(parallaxAmount / denom) * (scrolled - h)}%) scale(${1 + 0.01 * parallaxAmount})`;
  });

  return (
    <div className={cn("size-full overflow-hidden", frameClassName)} ref={frame}>
      <motion.div
        style={{ transform: enabled ? transform : "none", ...style }}
        className={cn("size-full origin-bottom", className)}
      >
        {children}
      </motion.div>
    </div>
  );
}
