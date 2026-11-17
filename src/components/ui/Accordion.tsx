"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Accordion (T7), port of brahma-web. Exclusive rows; height animates, the
 * plus rotates to a minus. `defaultOpen` opens one row on load (Disposition
 * FAQ opens the first). Reduced motion: no height animation.
 */
export default function Accordion({
  items,
  defaultOpen = null,
  className = "",
}: {
  items: readonly { title: string; body: ReactNode }[];
  defaultOpen?: number | null;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const reduced = useReducedMotion();
  const baseId = useId();

  return (
    <div className={cn("flex flex-col border-t border-hairline", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-b${i}`;
        const panelId = `${baseId}-p${i}`;

        return (
          <div key={item.title} className="border-b border-hairline">
            <h3>
              <button
                id={buttonId}
                type="button"
                className="flex min-h-11 w-full items-center justify-between gap-6 py-6 text-left"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="type-h3 text-ink">{item.title}</span>
                <span aria-hidden="true" className="relative size-5 shrink-0 text-brand">
                  <span className="absolute top-1/2 left-0.5 h-px w-4 -translate-y-1/2 bg-current" />
                  <span
                    className={cn(
                      "absolute top-0.5 left-1/2 h-4 w-px -translate-x-1/2 bg-current",
                      "transition-transform duration-300 ease-heal",
                      isOpen ? "rotate-90 scale-y-0" : "rotate-0 scale-y-100",
                    )}
                  />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 text-body">{item.body}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
