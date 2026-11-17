import { shop } from "@/content/shop";
import { Section } from "@/components/layout/Section";
import { HealForm } from "@/components/forms/HealForm";
import { PageHero } from "@/components/sections/PageHero";
import { BreakoutTile } from "@/components/ui/BreakoutTile";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { MaskText } from "@/components/ui/MaskText";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata("/shop");

/**
 * Shop. No signature.
 * Rhythm: brand → light → surface (stores, only once URLs exist) → tint → (brand footer).
 */
export default function Page() {
  const { categories, stores, stockCheck } = shop;
  const liveStores = stores.cards.flatMap((c) => (c.url ? [{ ...c, url: c.url }] : []));

  return (
    <>
      <PageHero content={shop.hero} />

      <Section theme="light" label={categories.eyebrow}>
        <Eyebrow>{categories.eyebrow}</Eyebrow>
        <ul className="-mx-margin-edge mt-[calc(var(--s-section-gap)*0.3)] flex snap-x snap-mandatory gap-gutter overflow-x-auto px-margin-edge pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
          {categories.items.map((item, i) => (
            <li key={item.id} id={item.id} className="w-[78%] shrink-0 snap-start md:w-auto">
              <BreakoutTile
                title={item.title}
                photo={item.photo}
                href={categories.fallbackHref}
                sizes="(min-width: 768px) 30vw, 78vw"
                delay={i * 0.08}
                titleClassName="type-h3"
              >
                <MaskText as="p" className="type-body text-body" lines={item.body} delay={0.1} />
              </BreakoutTile>
            </li>
          ))}
        </ul>
      </Section>

      {liveStores.length > 0 && (
        <Section theme="light" surface label={stores.eyebrow}>
          <Eyebrow>{stores.eyebrow}</Eyebrow>
          <ul className="mt-[calc(var(--s-section-gap)*0.3)] grid grid-cols-1 gap-gutter md:grid-cols-2">
            {liveStores.map((store, i) => (
              <Reveal as="li" key={store.name} delay={i * 0.08}>
                <a
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-theme={store.tone === "brand" ? "brand" : "dark"}
                  className={cn(
                    "group/store flex min-h-[calc(360*var(--multiplier))] flex-col justify-between gap-10 rounded-card bg-canvas p-8 text-ink",
                    "transition-[translate,box-shadow] duration-500 ease-heal [@media(pointer:fine)]:hover:-translate-y-1.5 [@media(pointer:fine)]:hover:shadow-floating",
                  )}
                >
                  <span className="type-eyebrow text-muted">{store.index}</span>
                  <span className="flex flex-col gap-4">
                    <span className="type-display">{store.name}</span>
                    <span className="type-body max-w-[36ch] text-body">
                      {store.body.desktop.join(" ")}
                    </span>
                    <span className="inline-flex items-center gap-2 type-small">
                      {store.cta}
                      <Icon
                        name="arrow-up-right"
                        className="transition-transform duration-300 ease-heal group-hover/store:translate-x-1 group-hover/store:-translate-y-1"
                      />
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
        </Section>
      )}

      <Section theme="light" tint id={stockCheck.id} labelledBy="stock-title">
        <div className="grid grid-cols-1 gap-x-gutter gap-y-8 lg:grid-cols-[1fr_1.375fr] lg:items-end">
          <div className="flex flex-col gap-6">
            <Eyebrow>{stockCheck.eyebrow}</Eyebrow>
            <MaskText as="h2" id="stock-title" className="type-h2 text-ink" lines={stockCheck.h2} />
          </div>
          <HealForm kind="stock" layout="inline" />
        </div>
      </Section>
    </>
  );
}
