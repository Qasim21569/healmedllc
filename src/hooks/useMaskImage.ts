"use client";

import { type MotionValue, useTransform } from "motion/react";

/**
 * useMaskImage, port of brahma-web (Elementis pattern).
 *
 * Generates a `linear-gradient(to top, ...)` mask that reveals horizontal
 * stripes as `localProgress` goes 0 to 1. On desktop 28 thin divisions give
 * the stripe reveal (I6); on mobile it degrades to one top-to-bottom sweep.
 * This animates `mask-image` (a gradient), never the mask size (landmine, PLAYBOOK §12).
 */
export default function useMaskImage(localProgress: MotionValue<number>, isMobile: boolean) {
  const divisions = 28;
  const gap = 0.35;
  const vh = 110;

  const func = (i: number, latest: number) => {
    const buffer = (1 - gap) / (divisions - 1);
    if (i * buffer > latest) return 0;
    if (gap + i * buffer < latest) return 1;
    return (latest - i * buffer) / gap;
  };

  return useTransform(localProgress, (latest) => {
    if (!isMobile) {
      let temp = "";
      for (let i = 0; i < divisions; i++) {
        const start = i * (vh / divisions);
        const edge = func(i, latest) * (vh / divisions) + start;
        temp += `rgba(0,0,0,0) ${start}vh,rgba(0,0,0,0) ${edge}vh,rgba(0,0,0,1) ${edge}vh,rgba(0,0,0,1) ${(i + 1) * (vh / divisions)}vh`;
        if (i !== divisions - 1) temp += ",";
      }
      return `linear-gradient(to top,${temp})`;
    }
    return `linear-gradient(to top,rgba(0,0,0,0) 0%,rgba(0,0,0,0) ${latest * 100}%,rgba(0,0,0,1) ${latest * 100}%,rgba(0,0,0,1) 100%)`;
  });
}
