import { home } from "@/content/home";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { MaskText } from "@/components/ui/MaskText";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SmartLink } from "@/components/ui/SmartLink";
import { SwipeDots } from "@/components/ui/SwipeDots";

const { hero } = home;

/**
 * Home hero, "Services split" (chosen by Qasim, 2026-11-18; replaces the I1
 * letters aperture). Brand section: labels, h1 left, lead + buttons right,
 * then three tall photo cards for Planning, Disposition and Service.
 *
 * From 1024px with a fine pointer, the hovered (or keyboard-focused) card
 * widens and reveals its summary (`.hero-card` in globals.css, pure CSS, no
 * scroll effects). Phones get a swipeable snap carousel (4:5 cards, the next one
 * peeking, progress dashes) with summaries always visible. Reduced motion: no transitions.
 */
export function HomeHero() {
  return (
    <Section
      theme="brand"
      labelledBy="home-title"
      className="pt-[calc(var(--header-h)+var(--s-section-gap)*0.4)]"
    >
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <Eyebrow mark={false}>{hero.rightLabel}</Eyebrow>
      </div>

      <div className="mt-[calc(var(--s-section-gap)*0.4)] grid grid-cols-1 gap-8 md:grid-cols-2 md:items-end md:gap-gutter">
        <MaskText as="h1" id="home-title" className="type-h1-home text-ink" lines={hero.h1} />
        <div className="flex flex-col gap-6 md:items-end">
          <MaskText
            as="p"
            className="type-lead max-w-[44ch] text-body md:w-fit"
            lines={hero.lead}
            delay={0.15}
          />
          <Reveal delay={0.25} className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            {hero.ctas.map((cta, i) => (
              <Button
                key={cta.href}
                href={cta.href}
                variant={i === 0 ? "primary" : "outline"}
                block
              >
                {cta.label}
              </Button>
            ))}
          </Reveal>
        </div>
      </div>

      {/* Phones: a swipeable snap carousel (next card peeks). 768+: a row. */}
      <ul
        id="hero-cards"
        className="-mx-margin-edge mt-[calc(var(--s-section-gap)*0.45)] flex snap-x snap-mandatory scroll-px-margin-edge gap-3 overflow-x-auto px-margin-edge [scrollbar-width:none] md:mx-0 md:h-[max(340px,calc(440*var(--multiplier)))] md:gap-gutter md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {hero.services.map((service, i) => (
          <Reveal
            as="li"
            key={service.href}
            delay={0.2 + i * 0.08}
            className="hero-card group/card relative w-[82%] shrink-0 snap-start md:w-auto md:min-w-0 md:flex-1 md:shrink"
          >
            <SmartLink
              href={service.href}
              className="relative flex aspect-[4/5] h-full flex-col justify-end overflow-hidden rounded-card transition-transform duration-300 ease-heal active:scale-[0.98] md:aspect-auto md:active:scale-100"
            >
              <Photo
                id={service.photo}
                fill
                preload
                sizes="(min-width: 768px) 50vw, 100vw"
                imageClassName="transition-transform duration-700 ease-heal [@media(pointer:fine)]:group-hover/card:scale-[1.04]"
              />
              {/* Night gradient so the label reads over any photo. */}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-night/85 via-night/25 to-transparent"
              />
              <span
                data-theme="dark"
                className="relative flex items-end justify-between gap-4 bg-transparent p-5 text-ink md:p-6"
              >
                <span className="flex min-w-0 flex-col gap-2">
                  <span className="type-eyebrow text-muted">{service.index}</span>
                  <span className="type-h3">{service.title}</span>
                  <span className="hero-card-summary type-small text-body">
                    {service.summary.desktop.join(" ")}
                  </span>
                </span>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-hairline transition-colors duration-300 ease-heal group-hover/card:border-brand group-hover/card:bg-brand group-hover/card:text-on-brand">
                  <Icon
                    name="arrow"
                    className="transition-transform duration-300 ease-heal group-hover/card:translate-x-0.5"
                  />
                </span>
              </span>
            </SmartLink>
          </Reveal>
        ))}
      </ul>
      <SwipeDots targetId="hero-cards" count={hero.services.length} className="mt-5 text-ink" />
    </Section>
  );
}
