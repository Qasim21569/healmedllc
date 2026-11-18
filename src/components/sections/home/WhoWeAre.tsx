import { home } from "@/content/home";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskText } from "@/components/ui/MaskText";
import { Reveal } from "@/components/ui/Reveal";

const { whoWeAre } = home;

/**
 * Home "Who we are" (dark). Simplified at Qasim's request (2026-11-18): the
 * I2 shutter band and its photo were removed. Standard grid: label left,
 * heading right, then body, list and button in the right column.
 */
export function WhoWeAre() {
  return (
    <Section theme="dark" labelledBy="who-title">
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-[1fr_1.9fr]">
        <Eyebrow>{whoWeAre.eyebrow}</Eyebrow>
        <div className="flex flex-col gap-10">
          <MaskText as="h2" id="who-title" className="type-display text-ink" lines={whoWeAre.h2} />
          <MaskText
            as="p"
            className="type-lead max-w-[46ch] text-body"
            lines={whoWeAre.body}
            delay={0.1}
          />
          <ul className="grid grid-cols-1 gap-x-gutter sm:grid-cols-2">
            {whoWeAre.list.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={0.1 + i * 0.06}
                className="flex items-center gap-3 border-t border-hairline py-4 type-body text-ink"
              >
                <span aria-hidden="true" className="size-1.5 shrink-0 bg-brand" />
                {item}
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.3}>
            <Button href={whoWeAre.cta.href} variant="outline">
              {whoWeAre.cta.label}
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
