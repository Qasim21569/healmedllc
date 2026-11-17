import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Theme = "light" | "dark" | "brand";

/**
 * Section (CLAUDE.md rule 5). Every section is one of these: it sets
 * `data-theme`, its background and its text colour explicitly, so colour never
 * inherits across a theme boundary. Full-bleed, inset by `px-margin-edge`
 * (no max-width container, rule 6).
 *
 * - `tint`: the page's one tint band (`--surface-tint`) in a light section.
 * - `surface`: the white surface step (`--surface`) in a light section.
 * - `flush`: no padding (sticky stages and bands manage their own).
 */
export function Section({
  theme,
  id,
  tint = false,
  surface = false,
  flush = false,
  as: Tag = "section",
  className,
  labelledBy,
  label,
  children,
}: {
  theme: Theme;
  id?: string;
  tint?: boolean;
  surface?: boolean;
  flush?: boolean;
  as?: "section" | "footer" | "div" | "header";
  className?: string;
  labelledBy?: string;
  label?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      id={id}
      data-theme={theme}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={cn(
        "relative text-ink",
        tint ? "bg-tint" : surface ? "bg-surface" : "bg-canvas",
        !flush && "px-margin-edge py-section-gap",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
