"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { Lines } from "@/content/types";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * ScrollFillText (T3). Words go from 18% to 100% opacity as the paragraph
 * scrolls through (`offset: ['start 0.8', 'end 0.45']`), one transform per
 * word. Keeps the hand-set line breaks. The full text is always in the DOM;
 * reduced motion shows it at full opacity. Home statement only.
 */
export function ScrollFillText({
  lines,
  className,
  as: Tag = "p",
}: {
  lines: Lines;
  className?: string;
  as?: "p" | "h2";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.45"] });

  const list = isMobile && lines.mobile ? lines.mobile : lines.desktop;
  const words = list.map((line) => line.split(" "));
  const total = words.reduce((n, w) => n + w.length, 0);
  let index = 0;

  return (
    <div ref={ref}>
      <Tag className={cn(className)}>
        {words.map((line, li) => (
          <span key={li} className="block">
            {line.map((word, wi) => {
              const i = index++;
              return (
                <Word
                  key={wi}
                  progress={scrollYProgress}
                  range={[i / total, (i + 1) / total]}
                  reduced={reduced}
                >
                  {word}
                  {wi < line.length - 1 ? " " : ""}
                </Word>
              );
            })}
          </span>
        ))}
      </Tag>
    </div>
  );
}

function Word({
  children,
  progress,
  range,
  reduced,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  reduced: boolean;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity: reduced ? 1 : opacity }}>{children}</motion.span>;
}
