"use client";

import type { PropsWithChildren } from "react";
import type { MotionStyle } from "motion/react";
import { useIsMobile } from "@/hooks/useIsMobile";
import Marquee from "./Marquee";

type ResponsiveMarqueeProps = PropsWithChildren & {
  animationConfig: {
    mobile: { max: string; speed: number };
    desktop: { max: string; speed: number };
  };
  className?: string;
  style?: MotionStyle;
};

/**
 * ResponsiveMarquee, port of brahma-web with one fix: the original returned
 * null until the viewport was known. This renders the desktop config on the
 * server and swaps after hydration (CLAUDE.md rule 10).
 */
export default function ResponsiveMarquee({
  children,
  animationConfig,
  ...rest
}: ResponsiveMarqueeProps) {
  const isMobile = useIsMobile();
  return (
    <Marquee {...animationConfig[isMobile ? "mobile" : "desktop"]} {...rest}>
      {children}
    </Marquee>
  );
}
