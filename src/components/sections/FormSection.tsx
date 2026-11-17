import type { Lines, PhotoId } from "@/content/types";
import { Section } from "@/components/layout/Section";
import { HealForm } from "@/components/forms/HealForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskText } from "@/components/ui/MaskText";
import { Photo } from "@/components/ui/Photo";
import { RevealImage } from "@/components/ui/RevealImage";
import type { FormKind } from "@/lib/forms/schemas";

/**
 * Light (surface) form section: eyebrow, h2, lead (and an optional 4:3 photo)
 * on the left, the form card on the right from 1024px; stacked below that.
 * Used by Offer (#offer) and Service request (#request).
 */
export function FormSection({
  id,
  kind,
  eyebrow,
  h2,
  lead,
  photo,
}: {
  id: string;
  kind: FormKind;
  eyebrow: string;
  h2: Lines;
  lead: Lines;
  photo?: PhotoId;
}) {
  return (
    <Section theme="light" surface id={id} labelledBy={`${id}-title`}>
      <div className="grid grid-cols-1 gap-x-gutter gap-y-10 lg:grid-cols-[1fr_1.375fr]">
        <div className="flex flex-col gap-6">
          <Eyebrow>{eyebrow}</Eyebrow>
          <MaskText as="h2" id={`${id}-title`} className="type-h2 text-ink" lines={h2} />
          <MaskText as="p" className="type-lead max-w-[40ch] text-body" lines={lead} delay={0.1} />
          {photo && (
            <RevealImage className="mt-4 aspect-[4/3] rounded-image lg:max-w-[90%]">
              <Photo id={photo} fill sizes="(min-width: 1024px) 38vw, 100vw" />
            </RevealImage>
          )}
        </div>
        <HealForm kind={kind} />
      </div>
    </Section>
  );
}
