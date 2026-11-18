import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Section label (redesigned 2026-11-18 at Qasim's request; replaces the mono
 * uppercase eyebrow). A short rule in `--brand`, then the label in Host
 * Grotesk 500, sentence case (`type-label`). " · " separators in a string
 * label render as small brand dots, so "Planning · Disposition · Service"
 * reads as three items. Tone follows the section theme through the variables.
 */
export function Eyebrow({
  children,
  mark = true,
  as: Tag = "p",
  className,
}: {
  children: ReactNode;
  /** The leading rule. Off for a secondary label on the same row. */
  mark?: boolean;
  as?: "p" | "span" | "div";
  className?: string;
}) {
  const parts = typeof children === "string" ? children.split(" · ") : [children];

  return (
    <Tag className={cn("type-label flex items-center gap-3 text-ink", className)}>
      {mark && (
        <span
          aria-hidden="true"
          className="h-px w-[calc(28*var(--multiplier))] min-w-5 shrink-0 bg-brand"
        />
      )}
      <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        {parts.map((part, i) => (
          <Fragment key={i}>
            {i > 0 && (
              <>
                <span aria-hidden="true" className="size-1 shrink-0 rounded-full bg-brand" />
                <span className="sr-only">, </span>
              </>
            )}
            <span>{part}</span>
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
