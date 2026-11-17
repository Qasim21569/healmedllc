"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * True below 768px. `false` on the server so the desktop line breaks and
 * layout render first and swap after hydration (never return null).
 */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}
