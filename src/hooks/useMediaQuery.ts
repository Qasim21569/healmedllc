"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribes to a media query. Returns `false` on the server and during
 * hydration (server snapshot), then the real value. Components must render the
 * desktop / full-motion markup by default and never return null while unknown.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
