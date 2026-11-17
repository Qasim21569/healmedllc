import { service } from "@/content/service";
import { Section } from "@/components/layout/Section";
import { SectionHead } from "@/components/sections/SectionHead";
import { BreakoutTile } from "@/components/ui/BreakoutTile";
import { Button } from "@/components/ui/Button";
import { MaskText } from "@/components/ui/MaskText";
import { Reveal } from "@/components/ui/Reveal";

/** Service "What we service" (light): I5 cards with the T10 scan line, then the banner. */
export function WhatWeService() {
  const { equipment } = service;
  return (
    <Section theme="light" id={equipment.id} labelledBy="equipment-title">
      <SectionHead eyebrow={equipment.eyebrow} title={equipment.h2} id="equipment-title" />
      <ul className="mt-[calc(var(--s-section-gap)*0.45)] grid grid-cols-1 gap-x-gutter gap-y-12 md:grid-cols-3">
        {equipment.cards.map((card, i) => (
          <li key={card.title}>
            <BreakoutTile
              title={card.title}
              photo={card.photo}
              sizes="(min-width: 768px) 30vw, 100vw"
              delay={i * 0.08}
              scan
              titleClassName="type-h3"
            >
              <MaskText as="p" className="type-body text-body" lines={card.body} delay={0.1} />
              {card.spec && <span className="type-eyebrow text-muted">{card.spec}</span>}
            </BreakoutTile>
          </li>
        ))}
      </ul>

      <Reveal className="mt-[calc(var(--s-section-gap)*0.45)] flex flex-col gap-6 rounded-card border border-dashed border-control p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="flex flex-col gap-2">
          <p className="type-h3 text-ink">{equipment.banner.title}</p>
          <MaskText as="p" className="type-body text-body" lines={equipment.banner.body} />
        </div>
        <Button href={equipment.banner.cta.href} variant="outline">
          {equipment.banner.cta.label}
        </Button>
      </Reveal>
    </Section>
  );
}

/** Service "How we help" (dark): four rows, index · title · description. */
export function HowWeHelp() {
  const { howWeHelp } = service;
  return (
    <Section theme="dark" labelledBy="help-title">
      <SectionHead eyebrow={howWeHelp.eyebrow} title={howWeHelp.h2} id="help-title" />
      <ul className="mt-[calc(var(--s-section-gap)*0.45)] border-t border-hairline">
        {howWeHelp.rows.map((row) => (
          <li
            key={row.title}
            className="grid grid-cols-[auto_1fr] items-baseline gap-x-gutter gap-y-3 border-b border-hairline py-[calc(var(--s-section-gap)*0.22)] md:grid-cols-[calc(96*var(--multiplier))_1fr_1fr]"
          >
            <span className="type-eyebrow text-muted">{row.index}</span>
            <MaskText as="h3" className="type-h2 text-ink" lines={[row.title]} />
            <MaskText
              as="p"
              className="col-start-2 type-body max-w-[40ch] text-body md:col-start-3"
              lines={row.body}
              delay={0.1}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
