"use client";

import type { ReactNode } from "react";
import { ParallaxContainer } from "./ParallaxContainer";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const QUERIES = {
  all: "(prefers-reduced-motion: no-preference)",
  md: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  lg: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
} as const;

/**
 * ResponsiveImage, port of brahma-web / Elementis. In-frame parallax (I4) from
 * a breakpoint up, none below it or under reduced motion. Same DOM either
 * way (the effect is switched, the image is never remounted or hidden).
 */
export function ResponsiveImage({
  children,
  parallaxAmount = 8,
  from = "lg",
  className = "",
  frameClassName = "",
}: {
  children: ReactNode;
  parallaxAmount?: number;
  /** Breakpoint the effect starts at. Page hero bands and sections: lg. */
  from?: keyof typeof QUERIES;
  className?: string;
  frameClassName?: string;
}) {
  const enabled = useMediaQuery(QUERIES[from]);

  return (
    <ParallaxContainer
      parallaxAmount={parallaxAmount}
      enabled={enabled}
      className={className}
      frameClassName={frameClassName}
    >
      {children}
    </ParallaxContainer>
  );
}
