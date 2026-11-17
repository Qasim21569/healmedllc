"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";

/**
 * SmoothScrollProvider, port of brahma-web. Owns the single Lenis instance on
 * its own RAF loop (D8).
 *
 * - Lenis is NOT created under prefers-reduced-motion, and it leaves touch
 *   scrolling native (syncTouch off). Every consumer must cope with a null
 *   instance; `useScrollToHash` falls back to an instant native jump.
 * - In-page anchors scroll on the click (`useScrollToHash`), so they work
 *   every time, not only on the first hash change.
 * - Every route change lands at the top (or at the hash, if there is one)
 *   immediately, so Lenis cannot write the previous page's offset back.
 * - `useLenis()` exposes the instance for stop/start (mobile menu) and
 *   `scrollTo` (I6 pills).
 */

const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

/** Fixed header height, so anchored sections don't land under it. */
function headerOffset() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  const parsed = Number.parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function useLenis() {
  return useContext(LenisContext);
}

/** Scrolls to an in-page target every time it is called. */
export function useScrollToHash() {
  const lenisRef = useContext(LenisContext);

  return useCallback(
    (hash: string) => {
      const id = decodeURIComponent(hash.replace(/^#/, ""));
      const el = document.getElementById(id);
      if (!el) return false;

      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset();
      const lenis = lenisRef?.current;

      if (lenis) lenis.scrollTo(top, { force: true });
      else window.scrollTo({ top, behavior: "auto" });

      if (window.location.hash !== `#${id}`) {
        window.history.replaceState(window.history.state, "", `#${id}`);
      }
      return true;
    },
    [lenisRef],
  );
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      stopInertiaOnNavigate: true,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Land every navigation at the top, or at the requested section.
  useEffect(() => {
    const lenis = lenisRef.current;
    const hash = window.location.hash;

    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - headerOffset();
        if (lenis) lenis.scrollTo(top, { immediate: true, force: true });
        else window.scrollTo(0, top);
        return;
      }
    }

    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <LenisContext.Provider value={lenisRef}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LenisContext.Provider>
  );
}
