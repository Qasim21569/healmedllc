"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";

/**
 * Page transition (T9), port of otis-valen (`usePageTransition`,
 * `transitionAnimations`, `template.tsx`), rebuilt on Motion + React state
 * instead of GSAP + zustand.
 *
 * Leave: a brand-violet panel with the logo mark (spinning in) rises from the bottom
 * (0.5s), then the route is pushed. Enter: `(site)/template.tsx` remounts with
 * the new page and calls `pageMounted()`, and the panel leaves off the top
 * (0.5s). Skipped on first load (nothing is covering), on browser back/forward
 * (no click to intercept) and under reduced motion (plain navigation).
 */

type Phase = "idle" | "covering" | "covered" | "revealing";

type TransitionApi = {
  /** Run the leave animation, then navigate. Returns false if it didn't handle it. */
  navigate: (href: string) => boolean;
  /** Called by the template once the next page has mounted. */
  pageMounted: () => void;
};

const TransitionContext = createContext<TransitionApi | null>(null);

export function usePageTransition() {
  return useContext(TransitionContext);
}

const DURATION = 0.5;

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [phase, setPhaseState] = useState<Phase>("idle");
  const pending = useRef<string | null>(null);
  const phaseRef = useRef<Phase>("idle");

  const setPhase = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhaseState(next);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      const target = href.split("#")[0] || "/";
      if (reduced || target === pathname) return false;
      if (phaseRef.current !== "idle") return true;
      pending.current = href;
      router.prefetch(href);
      setPhase("covering");
      return true;
    },
    [pathname, reduced, router, setPhase],
  );

  const pageMounted = useCallback(() => {
    if (phaseRef.current === "covered") setPhase("revealing");
  }, [setPhase]);

  const api = useMemo(() => ({ navigate, pageMounted }), [navigate, pageMounted]);

  // Safety: never leave the panel covering the page.
  useEffect(() => {
    if (phase !== "covered") return;
    const t = window.setTimeout(() => setPhase("revealing"), 2500);
    return () => window.clearTimeout(t);
  }, [phase, setPhase]);

  const y =
    phase === "covering" || phase === "covered" ? "0%" : phase === "revealing" ? "-100%" : "100%";

  return (
    <TransitionContext.Provider value={api}>
      {children}
      <motion.div
        aria-hidden="true"
        data-theme="brand"
        className="fixed inset-0 z-[100] grid place-items-center bg-canvas text-ink"
        style={{ pointerEvents: phase === "idle" ? "none" : "auto" }}
        initial={{ y: "100%" }}
        animate={{ y }}
        transition={phase === "idle" ? { duration: 0 } : { duration: DURATION, ease: EASE }}
        onAnimationComplete={() => {
          if (phaseRef.current === "covering") {
            setPhase("covered");
            if (pending.current) router.push(pending.current);
            pending.current = null;
          } else if (phaseRef.current === "revealing") {
            setPhase("idle");
          }
        }}
      >
        {/* The logo mark spins in as the panel covers, and leaves with it. */}
        <motion.span
          className="block w-[clamp(56px,14vw,96px)]"
          initial={false}
          animate={
            phase === "covering" || phase === "covered"
              ? { opacity: 1, scale: 1, rotate: 0 }
              : { opacity: 0, scale: 0.7, rotate: -90 }
          }
          transition={{ duration: phase === "idle" ? 0 : DURATION + 0.1, ease: EASE }}
        >
          <Logo variant="mark" className="w-full" />
        </motion.span>
      </motion.div>
    </TransitionContext.Provider>
  );
}
