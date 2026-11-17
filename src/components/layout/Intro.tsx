"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content/site";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { EASE } from "@/lib/motion";
import { Wordmark } from "@/components/ui/Wordmark";

const KEY = "heal-intro-seen";

/**
 * Optional intro (T12, Phase 8), behind `site.intro.enabled` (off by default).
 * Violet screen, the HEAL letters rise, then it lifts away after 1.1s. Once per
 * session; never under reduced motion.
 *
 * Mounted client-side only, so if JavaScript fails the page is never covered
 * (no server-rendered overlay waiting on a script to remove it).
 */
export function Intro() {
  const [show, setShow] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!site.intro.enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem(KEY)) return;
    sessionStorage.setItem(KEY, "1");
    const instance = lenis?.current;
    instance?.stop();
    const start = window.setTimeout(() => setShow(true), 0);
    const end = window.setTimeout(() => {
      setShow(false);
      instance?.start();
    }, 1100);
    return () => {
      window.clearTimeout(start);
      window.clearTimeout(end);
      instance?.start();
    };
  }, [lenis]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          aria-hidden="true"
          data-theme="brand"
          className="fixed inset-0 z-[120] flex items-end bg-canvas px-margin-edge pb-[calc(var(--s-section-gap)*0.5)] text-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="type-mega">
            <Wordmark word={site.footer.wordmark} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
