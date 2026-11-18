"use client";

import { useEffect, useState, type RefObject } from "react";
import type { Theme } from "@/components/layout/Section";

const SELECTOR = "main section[data-theme], footer[data-theme]";

function themeOf(el: Element): Theme {
  const value = el.getAttribute("data-theme");
  return value === "dark" || value === "brand" ? value : "light";
}

/**
 * useHeaderTheme (T6). Watches every top-level `section[data-theme]` (and the
 * footer) with an IntersectionObserver whose root is shrunk to a 1px line
 * through the header's vertical centre. Whatever section sits under that line
 * sets the header's own `data-theme`.
 *
 * Re-subscribes on route change (`key`), on resize, and when sections are
 * swapped in the DOM (I6 replaces its static markup after hydration).
 */
export function useHeaderTheme(
  headerRef: RefObject<HTMLElement | null>,
  key: string,
  initial: Theme = "brand",
): Theme {
  const [theme, setTheme] = useState<Theme>(initial);

  useEffect(() => {
    let io: IntersectionObserver | null = null;
    let watched: Element[] = [];

    const setup = () => {
      io?.disconnect();

      const h = headerRef.current?.offsetHeight ?? 64;
      const centre = Math.round(h / 2);
      const bottom = Math.max(0, window.innerHeight - centre - 1);

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            setTheme(themeOf(entry.target));
          }
        },
        { rootMargin: `-${centre}px 0px -${bottom}px 0px`, threshold: 0 },
      );

      watched = Array.from(document.querySelectorAll(SELECTOR));
      watched.forEach((el) => {
        io?.observe(el);
      });
    };

    setup();
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(setup);
    };
    window.addEventListener("resize", onResize);

    // Signature sections (I1, I2, I6) swap their static markup for the
    // animated version after hydration, so the observed elements change.
    // Re-attach whenever the set of sections differs from what is watched.
    const dom = new MutationObserver(() => {
      const now = Array.from(document.querySelectorAll(SELECTOR));
      if (now.length === watched.length && now.every((el, i) => el === watched[i])) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(setup);
    });
    dom.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      dom.disconnect();
      window.removeEventListener("resize", onResize);
      io?.disconnect();
    };
  }, [headerRef, key]);

  return theme;
}
