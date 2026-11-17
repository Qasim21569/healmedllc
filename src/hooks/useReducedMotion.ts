"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * True when the visitor prefers reduced motion. Every T and I pattern renders
 * its end state when this is true. `false` on the server.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
