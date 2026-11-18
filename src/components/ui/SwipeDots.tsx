"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Progress dashes for a horizontal snap carousel (phones). Watches the
 * scroll position of the element with `targetId` and highlights the card
 * nearest the left edge. Hidden from 768px, where the cards sit in a row.
 */
export function SwipeDots({
  targetId,
  count,
  className,
}: {
  targetId: string;
  count: number;
  className?: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = el.scrollWidth - el.clientWidth;
        const progress = max > 0 ? el.scrollLeft / max : 0;
        setActive(Math.round(progress * (count - 1)));
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
    };
  }, [targetId, count]);

  return (
    <div aria-hidden="true" className={cn("flex gap-1.5 md:hidden", className)}>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-[3px] rounded-full bg-current transition-[width,opacity] duration-500 ease-heal",
            i === active ? "w-8 opacity-100" : "w-3 opacity-40",
          )}
        />
      ))}
    </div>
  );
}
