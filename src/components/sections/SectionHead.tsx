import type { ComponentProps, ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskText } from "@/components/ui/MaskText";
import { Reveal } from "@/components/ui/Reveal";

/** Section head: eyebrow left (1fr), h2 + optional actions right (1.9fr). */
export function SectionHead({
  eyebrow,
  title,
  id,
  children,
}: {
  eyebrow: string;
  title: ComponentProps<typeof MaskText>["lines"];
  id: string;
  children?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 gap-gutter md:grid-cols-[1fr_1.9fr]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <MaskText as="h2" id={id} className="type-h2 text-ink" lines={title} />
        {children && (
          <Reveal className="flex shrink-0 flex-col gap-3 sm:flex-row">{children}</Reveal>
        )}
      </div>
    </div>
  );
}
