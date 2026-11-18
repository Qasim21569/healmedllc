"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { PhotoId } from "@/content/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { Photo } from "./Photo";
import { RevealImage } from "./RevealImage";

/** Speeds from PLAYBOOK §5 I4 (collage) and the frame for each photo. */
const SLOTS = [
  { speed: 0.9, ratio: "aspect-[4/5]", className: "lg:col-span-4" },
  {
    speed: 1.1,
    ratio: "aspect-[3/2]",
    className: "lg:col-span-5 lg:mt-[calc(160*var(--multiplier))]",
  },
  {
    speed: 1.25,
    ratio: "aspect-square",
    className: "lg:col-span-3 lg:mt-[calc(60*var(--multiplier))]",
  },
];

/**
 * Three-photo collage with multi-speed frame parallax (I4): one `useScroll` on
 * the collage, three transforms at 0.9×, 1.1× and 1.25×. Each photo enters with
 * I3. Desktop only (fine pointer, ≥1024, no reduced motion); otherwise a static
 * grid.
 */
export function Collage({ photos }: { photos: readonly [PhotoId, PhotoId, PhotoId] }) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = !useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <div ref={ref} className="grid grid-cols-2 items-start gap-gutter lg:grid-cols-12">
      {photos.map((id, i) => (
        <Frame
          key={id}
          progress={scrollYProgress}
          speed={SLOTS[i].speed}
          enabled={enabled}
          className={cn(SLOTS[i].className, i === 1 && "col-span-2 lg:col-span-5")}
        >
          <RevealImage className={cn(SLOTS[i].ratio, "rounded-image")} delay={i * 0.1}>
            <Photo id={id} fill sizes="(min-width: 1024px) 40vw, 50vw" />
          </RevealImage>
        </Frame>
      ))}
    </div>
  );
}

function Frame({
  progress,
  speed,
  enabled,
  className,
  children,
}: {
  progress: MotionValue<number>;
  speed: number;
  enabled: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  // Centred on the collage's midpoint; faster frames travel further.
  const y = useTransform(progress, (p) => {
    if (!enabled) return 0;
    // Scaled by width, with a floor so the depth still reads on phones.
    const scale = Math.max(0.55, (globalThis.window?.innerWidth ?? 1440) / 1440);
    return (0.5 - p) * 240 * (speed - 0.75) * scale;
  });
  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
