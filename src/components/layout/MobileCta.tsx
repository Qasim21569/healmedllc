"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { SmartLink } from "@/components/ui/SmartLink";

/**
 * Phones and tablets (under 1024px): a floating "Sell equipment" pill at the
 * bottom of the screen, since the offer form is the site's first goal and the
 * header button collapses into the menu at this size.
 *
 * Slides up once the visitor has scrolled past most of the first screen;
 * slides away while any form or the footer is on screen (so it never covers
 * an input or repeats the footer CTA). The menu panel (z-40) covers it.
 */
export function MobileCta() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      setBlocked(visible.size > 0);
    });
    // Re-scan after the page renders (forms are client components).
    const t = window.setTimeout(() => {
      document.querySelectorAll("main form, footer").forEach((el) => io.observe(el));
    }, 300);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, [pathname]);

  const shown = pastHero && !blocked;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-30 flex justify-center px-margin-edge pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden",
      )}
    >
      <SmartLink
        href={site.headerCta.href}
        tabIndex={shown ? undefined : -1}
        aria-hidden={shown ? undefined : true}
        className={cn(
          "inline-flex min-h-12 items-center gap-3 rounded-full bg-brand px-6 type-small text-on-brand shadow-floating",
          "transition-[translate,opacity] duration-500 ease-heal active:scale-[0.97]",
          shown ? "pointer-events-auto translate-y-0 opacity-100" : "translate-y-[150%] opacity-0",
        )}
      >
        {site.headerCta.label}
        <Icon name="arrow" />
      </SmartLink>
    </div>
  );
}
