import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Eyebrow: Geist Mono 12, uppercase, 0.08em, `--muted`, optional 6px square in
 * `--brand`. Tone follows the section theme through the CSS variables.
 */
export function Eyebrow({
  children,
  mark = true,
  as: Tag = "p",
  className,
}: {
  children: ReactNode;
  mark?: boolean;
  as?: "p" | "span" | "div";
  className?: string;
}) {
  return (
    <Tag className={cn("type-eyebrow flex items-center gap-2.5 text-muted", className)}>
      {mark && <span aria-hidden="true" className="size-1.5 shrink-0 bg-brand" />}
      <span>{children}</span>
    </Tag>
  );
}
