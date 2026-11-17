"use client";

import { useEffect, useState, type RefObject } from "react";
import type { Theme } from "@/components/layout/Section";

const SELECTOR = "main section[data-theme], footer[data-theme], [data-header-theme]";

function themeOf(el: Element): Theme {
  const value = el.getAttribute("data-header-theme") ?? el.getAttribute("data-theme");
  return value === "dark" || value === "brand" ? value : "light";
}

/**
 * useHeaderTheme (T6). Watches every top-level `section[data-theme]` (and the
 * footer) with an IntersectionObserver whose root is shrunk to a 1px line
 * through the header's vertical centre. Whatever section sits under that line
 * sets the header's own `data-theme`.
 *
 * A section can override what the header shows with `data-header-theme`
 * (I1 flips it to `dark` once the photo fills the screen); attribute changes
 * on the current section are picked up by a MutationObserver.
 *
 * Re-subscribes on route change (`key`) and on resize.
 */
export function useHeaderTheme(
  headerRef: RefObject<HTMLElement | null>,
  key: string,
  initial: Theme = "brand",
): Theme {
  const [theme, setTheme] = useState<Theme>(initial);

  useEffect(() => {
    let io: IntersectionObserver | null = null;
    let mo: MutationObserver | null = null;
    let current: Element | null = null;

    const setup = () => {
      io?.disconnect();
      mo?.disconnect();

      const h = headerRef.current?.offsetHeight ?? 64;
      const centre = Math.round(h / 2);
      const bottom = Math.max(0, window.innerHeight - centre - 1);

      mo = new MutationObserver(() => {
        if (current) setTheme(themeOf(current));
      });

      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            current = entry.target;
            setTheme(themeOf(entry.target));
          }
        },
        { rootMargin: `-${centre}px 0px -${bottom}px 0px`, threshold: 0 },
      );

      document.querySelectorAll(SELECTOR).forEach((el) => {
        io?.observe(el);
        mo?.observe(el, { attributes: true, attributeFilter: ["data-header-theme"] });
      });
    };

    setup();
    let raf = 0;
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(setup);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      io?.disconnect();
      mo?.disconnect();
    };
  }, [headerRef, key]);

  return theme;
}
