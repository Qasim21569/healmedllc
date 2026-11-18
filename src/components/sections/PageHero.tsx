import type { PageHeroContent } from "@/content/types";
import { Section, type Theme } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { MaskText } from "@/components/ui/MaskText";
import { Photo } from "@/components/ui/Photo";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Reveal } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/RevealImage";
import { SmartLink } from "@/components/ui/SmartLink";
import { cn } from "@/lib/utils";

type NextSection = { theme: Theme; tone?: "canvas" | "surface" | "tint" };

const tones = { canvas: "bg-canvas", surface: "bg-surface", tint: "bg-tint" } as const;

/**
 * Page hero band (PLAYBOOK §5, all inner pages). Brand section: breadcrumb,
 * giant h1 (T1), lead left and buttons right (T2), then a 21:9 photo band
 * (4:3 on phones) with I3 + I4 amount 20 from 1024px.
 *
 * The band straddles the boundary into the next section without negative
 * margins: this section paints its own bottom strip (half the band's height)
 * in the next section's canvas colour, via a `data-theme` block behind the band.
 * Pass `next` to match the section that follows.
 *
 * No `photo` (contact, legal): no band, normal bottom padding.
 * `size="mega"`: the Contact hero, `type-mega` at half size.
 */
export function PageHero({
  content,
  next = { theme: "light" },
  size = "display",
}: {
  content: PageHeroContent;
  next?: NextSection;
  size?: "display" | "mega";
}) {
  const { breadcrumb, h1, lead, ctas = [], photo } = content;

  return (
    <Section
      theme="brand"
      labelledBy="page-title"
      className={cn("pt-[calc(var(--header-h)+var(--s-section-gap)*0.55)]", photo && "pb-0")}
    >
      <nav aria-label="Breadcrumb" className="mb-[calc(var(--s-section-gap)*0.3)]">
        <ol className="type-label flex flex-wrap items-center gap-2.5 text-muted">
          <li>
            <SmartLink href="/" className="underline-offset-4 hover:text-ink hover:underline">
              Home
            </SmartLink>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink">
            {breadcrumb.index ? `${breadcrumb.index} · ` : ""}
            {breadcrumb.label}
          </li>
        </ol>
      </nav>

      <MaskText
        as="h1"
        id="page-title"
        className={cn("text-ink", size === "mega" ? "type-mega" : "type-display")}
        style={size === "mega" ? { fontSize: "calc(var(--t-mega) * 0.5)" } : undefined}
        lines={h1}
      />

      {(lead || ctas.length > 0) && (
        <div className="mt-[calc(var(--s-section-gap)*0.4)] grid grid-cols-1 gap-8 md:grid-cols-2 md:items-end md:gap-gutter">
          {lead && (
            <MaskText
              as="p"
              className="type-lead max-w-[40ch] text-body"
              lines={lead}
              delay={0.15}
            />
          )}
          {ctas.length > 0 && (
            <Reveal delay={0.25} className="flex flex-col gap-3 sm:flex-row md:justify-end">
              {ctas.map((cta, i) => (
                <Button
                  key={cta.href}
                  href={cta.href}
                  external={cta.external}
                  variant={i === 0 ? "primary" : "outline"}
                  icon={cta.href.startsWith("#") ? "arrow-down" : "arrow"}
                  block
                >
                  {cta.label}
                </Button>
              ))}
            </Reveal>
          )}
        </div>
      )}

      {photo && (
        <div className="relative mt-[calc(var(--s-section-gap)*0.55)]">
          <div
            aria-hidden="true"
            data-theme={next.theme}
            className={cn(
              "absolute -inset-x-margin-edge bottom-0 h-1/2",
              tones[next.tone ?? "canvas"],
            )}
          />
          <RevealImage className="relative aspect-[4/3] rounded-image md:aspect-[21/9]">
            <ResponsiveImage parallaxAmount={20} from="lg">
              <Photo id={photo} fill sizes="(min-width: 768px) 100vw, 100vw" />
            </ResponsiveImage>
          </RevealImage>
        </div>
      )}
    </Section>
  );
}
