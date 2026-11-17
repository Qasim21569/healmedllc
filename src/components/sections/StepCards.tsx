import type { Point } from "@/content/types";
import { MaskText } from "@/components/ui/MaskText";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/**
 * Card row used by Planning "How it works" (surface cards with big numerals)
 * and Disposition "Why sell" (outlined cards). Cards Reveal (T2); copy MaskText.
 */
export function StepCards({
  items,
  variant = "surface",
}: {
  items: readonly Point[];
  variant?: "surface" | "outline";
}) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-gutter md:grid-cols-2",
        items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
      )}
    >
      {items.map((item, i) => (
        <Reveal
          as="li"
          key={item.title}
          delay={i * 0.08}
          className={cn(
            "flex min-h-[calc(280*var(--multiplier))] flex-col gap-4 rounded-card p-[calc(28*var(--multiplier))] max-md:p-6",
            variant === "surface" ? "bg-surface" : "border border-hairline",
          )}
        >
          {item.index && <span className="type-row text-brand">{item.index}</span>}
          <MaskText
            as="h3"
            className={cn("type-h3 text-ink", item.index && "mt-auto")}
            lines={[item.title]}
          />
          <MaskText as="p" className="type-body text-body" lines={item.body} delay={0.1} />
        </Reveal>
      ))}
    </ul>
  );
}
