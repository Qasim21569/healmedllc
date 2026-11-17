import { disposition } from "@/content/disposition";
import { Section } from "@/components/layout/Section";
import { FormSection } from "@/components/sections/FormSection";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHead } from "@/components/sections/SectionHead";
import { StepCards } from "@/components/sections/StepCards";
import Accordion from "@/components/ui/Accordion";
import { BreakoutTile } from "@/components/ui/BreakoutTile";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskText } from "@/components/ui/MaskText";
import { PulseSteps } from "@/components/ui/PulseSteps";
import { faqPage, jsonLdScript } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { present } from "@/lib/utils";

export const metadata = pageMetadata("/asset-disposition");

/**
 * Asset Disposition. No signature.
 * Rhythm: brand → light → tint → dark → surface → light → (brand footer).
 */
export default function Page() {
  const { whatWeBuy, howItWorks, whySell, offer, faq } = disposition;
  const tiles = whatWeBuy.tiles.filter(present);
  const cards = whySell.cards.filter(present);
  const faqItems = faq.items.filter((item) => item.answer !== null);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqPage(faqItems)) }}
      />
      <PageHero content={disposition.hero} />

      <Section theme="light" id={whatWeBuy.id} labelledBy="buy-title">
        <SectionHead eyebrow={whatWeBuy.eyebrow} title={whatWeBuy.h2} id="buy-title" />
        <div className="mt-6 flex flex-col gap-4 md:ml-[calc((100%-var(--s-gutter))/2.9+var(--s-gutter))] md:flex-row md:items-center md:justify-between">
          <MaskText as="p" className="type-body text-body" lines={whatWeBuy.note} />
          <Button href={whatWeBuy.noteCta.href} variant="ghost" icon="arrow-down">
            {whatWeBuy.noteCta.label}
          </Button>
        </div>
        <ul className="mt-[calc(var(--s-section-gap)*0.4)] grid grid-cols-2 gap-x-gutter gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {tiles.map((tile, i) => (
            <li key={tile.title}>
              <BreakoutTile
                {...tile}
                sizes="(min-width: 1024px) 23vw, (min-width: 768px) 30vw, 45vw"
                delay={(i % 4) * 0.08}
              />
            </li>
          ))}
        </ul>
      </Section>

      <Section theme="light" tint labelledBy="process-title">
        <SectionHead eyebrow={howItWorks.eyebrow} title={howItWorks.h2} id="process-title" />
        <div className="mt-[calc(var(--s-section-gap)*0.55)]">
          <PulseSteps steps={howItWorks.steps} />
        </div>
      </Section>

      <Section theme="dark" labelledBy="why-title">
        <SectionHead eyebrow={whySell.eyebrow} title={whySell.h2} id="why-title" />
        <div className="mt-[calc(var(--s-section-gap)*0.45)]">
          <StepCards items={cards} variant="outline" />
        </div>
      </Section>

      <FormSection
        id={offer.id}
        kind="offer"
        eyebrow={offer.eyebrow}
        h2={offer.h2}
        lead={offer.lead}
        photo={offer.photo}
      />

      <Section theme="light" labelledBy="faq-title">
        <div className="grid grid-cols-1 gap-x-gutter gap-y-10 md:grid-cols-[1fr_1.9fr]">
          <div className="flex flex-col gap-6">
            <Eyebrow>{faq.eyebrow}</Eyebrow>
            <MaskText as="h2" id="faq-title" className="type-h2 text-ink" lines={faq.h2} />
          </div>
          <Accordion
            defaultOpen={0}
            items={faqItems.map((item) => ({
              title: item.question,
              body: <MaskText as="p" className="type-body max-w-[52ch]" lines={item.answer!} />,
            }))}
          />
        </div>
      </Section>
    </>
  );
}
