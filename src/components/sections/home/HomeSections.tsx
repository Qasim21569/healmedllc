import { home } from "@/content/home";
import { storeCtas } from "@/content/site";
import { present } from "@/lib/utils";
import { Section } from "@/components/layout/Section";
import { BreakoutTile } from "@/components/ui/BreakoutTile";
import { Button } from "@/components/ui/Button";
import { DriftColumns } from "@/components/ui/DriftColumns";
import { PulseSteps } from "@/components/ui/PulseSteps";
import ResponsiveMarquee from "@/components/ui/ResponsiveMarquee";
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

/** Home marquee (light): one line, violet, T5. */
export function HomeMarquee() {
  const { items } = home.marquee;
  const run = (copy: number) =>
    items.map((item) => (
      <span
        key={`${copy}-${item}`}
        className="flex items-center"
        aria-hidden={copy > 0 || undefined}
      >
        <span>{item}</span>
        <span aria-hidden="true" className="px-[0.35em] opacity-45">
          ·
        </span>
      </span>
    ));
  return (
    <Section
      theme="light"
      flush
      className="py-[calc(var(--s-section-gap)*0.55)]"
      label={items.join(", ")}
    >
      <ResponsiveMarquee
        className="type-marquee text-brand"
        animationConfig={{
          desktop: { max: "-50%", speed: -3 },
          mobile: { max: "-50%", speed: -6 },
        }}
      >
        {/* Two identical halves so the -50% wrap is seamless. */}
        <span className="flex">
          {run(0)}
          {run(1)}
        </span>
        <span className="flex" aria-hidden="true">
          {run(2)}
          {run(3)}
        </span>
      </ResponsiveMarquee>
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
