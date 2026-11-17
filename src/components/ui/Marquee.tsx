"use client";

import { useRef, type PropsWithChildren } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
  type MotionStyle,
} from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type MarqueeProps = PropsWithChildren & {
  className?: string;
  style?: MotionStyle;
  /** Distance before the loop wraps, e.g. "-50%" when the content is doubled. */
  max: string;
  /** Base speed in `max` units per second. */
  speed: number;
};

/**
 * Marquee (T5), port of brahma-web. Constant drift whose speed and direction
 * are nudged by scroll velocity. Reduced motion: stands still.
 * (The useSpring here smooths scroll velocity input; it moves nothing on its own.)
 */
export default function Marquee({ children, max, speed, className, style }: MarqueeProps) {
  const reduced = useReducedMotion();
  const value = parseFloat(max);
  const unit = max.slice(value.toString().length);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const velocityFactor = useTransform(
    useSpring(scrollVelocity, { mass: 1, damping: 50, stiffness: 600 }),
    [0, 1000],
    [0, 4],
    { clamp: false },
  );
  const x = useTransform(baseX, (v) => `${wrap(0, value, v)}${unit}`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let moveBy = direction.current * speed * (delta / 1000);
    const factor = velocityFactor.get();
    if (factor < 0) direction.current = -1;
    else if (factor > 0) direction.current = 1;
    moveBy += direction.current * moveBy * factor;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden">
      <motion.div className={cn("flex w-max whitespace-nowrap", className)} style={{ x, ...style }}>
        {children}
      </motion.div>
    </div>
  );
}
