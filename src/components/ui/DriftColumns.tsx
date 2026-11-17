"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Column travel in px at 1440 (PLAYBOOK §5 I8), scaled by viewport width. */
const DRIFT: [number, number][] = [
  [0, -60],
  [120, -140],
  [40, -40],
];

/**
 * DriftColumns (I8, codrops columns maths). Items are dealt into columns that
 * move at different speeds off one `useScroll` on the grid; the middle column
 * starts lower. Full drift at ≥1024 with a fine pointer; 3 columns with
 * drift ÷ 4 from 768; 2 columns with drift ÷ 4 on phones; none under reduced
 * motion. The server renders the 3-column layout.
 */
export function DriftColumns({ items }: { items: ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const full = useIsDesktop();
  const twoCols = useMediaQuery("(max-width: 767px)");
  const reduced = useReducedMotion();
  const count = twoCols ? 2 : 3;
  const factor = reduced ? 0 : full ? 1 : 0.25;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const columns: ReactNode[][] = Array.from({ length: count }, () => []);
  items.forEach((item, i) => columns[i % count].push(item));

  return (
    <div
      ref={ref}
      className="grid gap-x-gutter"
      style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
    >
      {columns.map((col, i) => (
        <Column key={i} progress={scrollYProgress} range={DRIFT[i]} factor={factor}>
          {col}
        </Column>
      ))}
    </div>
  );
}

function Column({
  children,
  progress,
  range,
  factor,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  factor: number;
}) {
  const y = useTransform(progress, (p) => {
    const scale = (globalThis.window?.innerWidth ?? 1440) / 1440;
    return (range[0] + (range[1] - range[0]) * p) * scale * factor;
  });
  return (
    <motion.div className="flex flex-col gap-y-[calc(var(--s-section-gap)*0.35)]" style={{ y }}>
      {children}
    </motion.div>
  );
}
