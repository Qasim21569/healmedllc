import { home } from "@/content/home";
import { storeCtas } from "@/content/site";
import { present } from "@/lib/utils";
import { Section } from "@/components/layout/Section";
import { BreakoutTile } from "@/components/ui/BreakoutTile";
import { Button } from "@/components/ui/Button";
import { DriftColumns } from "@/components/ui/DriftColumns";
import { PulseSteps } from "@/components/ui/PulseSteps";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SmartLink } from "@/components/ui/SmartLink";
import { SectionHead } from "@/components/sections/SectionHead";

const TILE_SIZES = "(min-width: 768px) 30vw, 45vw";

/** Home "We buy" (light): I8 drift columns of I5 breakout tiles. */
export function WeBuy() {
  const { weBuy } = home;
  const tiles = weBuy.tiles.filter(present);
  return (
    <Section theme="light" labelledBy="we-buy-title" className="overflow-x-clip">
      <SectionHead eyebrow={weBuy.eyebrow} title={weBuy.h2} id="we-buy-title">
        <Button href={weBuy.cta.href}>{weBuy.cta.label}</Button>
      </SectionHead>
      <div className="mt-[calc(var(--s-section-gap)*0.5)]">
        <DriftColumns
          items={tiles.map((tile, i) => (
            <BreakoutTile key={tile.title} {...tile} sizes={TILE_SIZES} delay={(i % 3) * 0.08} />
          ))}
        />
      </div>
    </Section>
  );
}

/** Home lifecycle (light + tint band): T4 pulse line, four steps. */
export function Lifecycle() {
  const { lifecycle } = home;
  return (
    <Section theme="light" tint labelledBy="lifecycle-title">
      <SectionHead eyebrow={lifecycle.eyebrow} title={lifecycle.h2} id="lifecycle-title" />
      <div className="mt-[calc(var(--s-section-gap)*0.55)]">
        <PulseSteps steps={lifecycle.steps} />
      </div>
    </Section>
  );
}

/**
 * Home "Equipment we know" (light). Replaces the marquee (Qasim, 2026-11-18):
 * four calm photo cards, each linking to where that equipment is covered.
 */
export function EquipmentRow() {
  const { equipment } = home;
  return (
    <Section theme="light" labelledBy="equipment-row-title">
      <Eyebrow>
        <span id="equipment-row-title">{equipment.eyebrow}</span>
      </Eyebrow>
      <ul className="mt-[calc(var(--s-section-gap)*0.3)] grid grid-cols-2 gap-gutter lg:grid-cols-4">
        {equipment.items.map((item, i) => (
          <Reveal as="li" key={item.title} delay={i * 0.06}>
            <SmartLink
              href={item.href}
              className="group/eq flex flex-col gap-3 transition-transform duration-300 ease-heal active:scale-[0.98]"
            >
              <span className="relative block aspect-[4/3] overflow-hidden rounded-image">
                <Photo
                  id={item.photo}
                  fill
                  sizes="(min-width: 1024px) 23vw, 45vw"
                  imageClassName="transition-transform duration-700 ease-heal [@media(pointer:fine)]:group-hover/eq:scale-[1.04]"
                />
              </span>
              <span className="flex items-center justify-between gap-3 type-body text-ink">
                {item.title}
                <Icon
                  name="arrow"
                  className="text-brand transition-transform duration-300 ease-heal group-hover/eq:translate-x-1"
                />
              </span>
            </SmartLink>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/** Home shop (light, surface): store buttons once URLs exist, three I5 tiles. */
export function HomeShop() {
  const { shop } = home;
  const stores = storeCtas(shop.storeLabels);
  return (
    <Section theme="light" surface labelledBy="home-shop-title">
      <SectionHead eyebrow={shop.eyebrow} title={shop.h2} id="home-shop-title">
        {stores.length > 0 &&
          stores.map((cta, i) => (
            <Button
              key={cta.href}
              href={cta.href}
              external
              variant={i === 0 ? "primary" : "outline"}
            >
              {cta.label}
            </Button>
          ))}
      </SectionHead>
      <ul className="-mx-margin-edge mt-[calc(var(--s-section-gap)*0.45)] flex snap-x snap-mandatory gap-gutter overflow-x-auto px-margin-edge pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
        {shop.tiles.map((tile, i) => (
          <li key={tile.title} className="w-[72%] shrink-0 snap-start md:w-auto">
            <BreakoutTile {...tile} sizes="(min-width: 768px) 30vw, 72vw" delay={i * 0.08} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
