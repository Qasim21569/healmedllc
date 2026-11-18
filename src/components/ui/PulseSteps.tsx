"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import type { Lines } from "@/content/types";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { MaskText } from "./MaskText";

export type Step = { index: string; title: string; body: Lines | null };

// Flat line with one heartbeat spike; viewBox units.
const H_PATH = "M0 40 H430 L448 40 L462 12 L478 58 L492 26 L502 40 H1000";
const V_PATH = "M10 0 V430 L10 448 L1 462 L19 478 L4 492 L10 502 V1000";

/**
 * PulseLine + Steps (T4). A flat line with one heartbeat spike draws with
 * scroll (`pathLength`), a 6px dot rides the tip, and each step's numeral
 * turns `--brand` as the tip passes it. Not pinned.
 * ≥1024: horizontal line, 4 across. 768 to 1023: horizontal, 2x2.
 * Phones: vertical line down the left. Reduced motion: drawn, all numerals lit.
 */
export function PulseSteps({ steps }: { steps: readonly Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const [lit, setLit] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setLit(steps.filter((_, i) => p >= i / steps.length + 0.02).length);
  });

  const litCount = reduced ? steps.length : lit;

  return (
    <div ref={ref} className="relative">
      {/* Horizontal (md+) */}
      <Line
        path={H_PATH}
        viewBox="0 0 1000 60"
        progress={scrollYProgress}
        reduced={reduced}
        className="hidden aspect-[1000/60] w-full md:block"
      />

      <div className="relative">
        {/* Vertical (phones) */}
        <Line
          path={V_PATH}
          viewBox="0 0 20 1000"
          progress={scrollYProgress}
          reduced={reduced}
          className="absolute top-0 bottom-0 left-0 w-5 md:hidden"
        />

        <ol className="grid grid-cols-1 gap-y-12 pl-12 md:mt-10 md:grid-cols-2 md:gap-x-gutter md:pl-0 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.index} className="flex flex-col gap-3">
              <span
                className={cn(
                  "type-row transition-colors duration-500 ease-heal",
                  i < litCount ? "text-brand" : "text-muted/50",
                )}
              >
                {step.index}
              </span>
              <MaskText as="h3" className="type-h3 text-ink" lines={[step.title]} />
              {step.body && (
                <MaskText
                  as="p"
                  className="type-body max-w-[34ch] text-body"
                  lines={step.body}
                  delay={0.1}
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Line({
  path,
  viewBox,
  progress,
  reduced,
  className,
}: {
  path: string;
  viewBox: string;
  progress: MotionValue<number>;
  reduced: boolean;
  className?: string;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const [, , vw, vh] = viewBox.split(" ").map(Number);
  const length = useTransform(progress, (p) => (reduced ? 1 : Math.min(1, Math.max(0, p))));
  const left = useTransform(length, (l) => tip(pathRef.current, l, "x", vw));
  const top = useTransform(length, (l) => tip(pathRef.current, l, "y", vh));

  return (
    <div aria-hidden="true" className={cn("relative", className)}>
      <svg
        viewBox={viewBox}
        preserveAspectRatio="none"
        className="absolute inset-0 size-full overflow-visible"
      >
        <path d={path} fill="none" className="stroke-hairline" strokeWidth={1.5} />
        <motion.path
          ref={pathRef}
          d={path}
          fill="none"
          className="stroke-pulse"
          strokeWidth={1.5}
          style={{ pathLength: length }}
        />
      </svg>
      <motion.span
        className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pulse"
        style={{ left, top }}
      />
    </div>
  );
}

function tip(path: SVGPathElement | null, l: number, axis: "x" | "y", size: number) {
  if (!path) return "0%";
  const total = path.getTotalLength();
  const point = path.getPointAtLength(total * l);
  return `${((axis === "x" ? point.x : point.y) / size) * 100}%`;
}
