"use client";

import { useMediaQuery } from "./useMediaQuery";

/** Query that turns on the signatures (I1, I2, I6), I7 and full I8 drift. */
export const DESKTOP_MOTION_QUERY =
  "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

/**
 * True on a fine-pointer viewport of 1024px or wider without reduced motion.
 * `false` on the server and first render: callers render the static
 * composition by default and upgrade after hydration (never return null).
 */
export function useIsDesktop(): boolean {
  return useMediaQuery(DESKTOP_MOTION_QUERY);
}
