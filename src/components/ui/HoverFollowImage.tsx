"use client";

import { useEffect, useRef, type RefObject } from "react";
import { AnimatePresence, motion, useMotionValue } from "motion/react";
import type { PhotoId } from "@/content/types";
import { EASE } from "@/lib/motion";
import { Photo } from "./Photo";

/**
 * HoverFollowImage (I7). A 4:5 card (300px at 1440, radius 16, float shadow)
 * that follows the pointer over a list with a lerp of 0.12 on rAF (no spring,
 * no overshoot) and tilts with horizontal velocity, clamped to ±4°.
 * Enter: scale 0.9 → 1 with an I3-style clip. Row change: 0.3s crossfade.
 * Leave: scales out. Mount it only for fine pointers; touch gets inline photos.
 */
export function HoverFollowImage({
  containerRef,
  active,
  photos,
}: {
  containerRef: RefObject<HTMLElement | null>;
  /** Index of the hovered row, or null when the pointer is off the list. */
  active: number | null;
  photos: readonly PhotoId[];
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const primed = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      target.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      if (!primed.current) {
        pos.current = { ...target.current };
        primed.current = true;
      }
    };
    const onLeave = () => {
      primed.current = false;
    };

    let raf = 0;
    const tick = () => {
      const p = pos.current;
      const t = target.current;
      const dx = (t.x - p.x) * 0.12;
      p.x += dx;
      p.y += (t.y - p.y) * 0.12;
      x.set(p.x);
      y.set(p.y);
      rotate.set(Math.max(-4, Math.min(4, dx * 0.35)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [containerRef, x, y, rotate]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 left-0 z-10 aspect-[4/5] w-[calc(300*var(--multiplier))] -translate-x-1/2 -translate-y-1/2"
      style={{ x, y, rotate }}
    >
      <AnimatePresence>
        {active !== null && (
          <motion.div
            key="card"
            className="relative size-full overflow-hidden rounded-2xl shadow-floating"
            initial={{ scale: 0.9, clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {photos.map((id, i) => (
              <motion.div
                key={id}
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: i === active ? 1 : 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <Photo id={id} fill sizes="(min-width: 1920px) 480px, 400px" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
