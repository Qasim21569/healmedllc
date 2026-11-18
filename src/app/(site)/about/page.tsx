import { about } from "@/content/about";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHead } from "@/components/sections/SectionHead";
import { Button } from "@/components/ui/Button";
import { Collage } from "@/components/ui/Collage";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskText } from "@/components/ui/MaskText";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/RevealImage";
import { Wordmark } from "@/components/ui/Wordmark";
import { pageMetadata } from "@/lib/seo";
import { cn, present } from "@/lib/utils";

export const metadata = pageMetadata("/about");

/**
 * About. No signature.
 * Rhythm: brand → light → brand (The name) → surface → tint → dark → (brand footer).
 */
export default function Page() {
  const { story, name, values, team, careers } = about;
  const people = team.people.filter(present);

  return (
    <>
      <PageHero content={about.hero} />

      <Section theme="light" id={story.id} labelledBy="story-title">
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-[1fr_1.9fr]">
          <Eyebrow>{story.eyebrow}</Eyebrow>
          <div className="flex flex-col gap-8">
            <MaskText as="h2" id="story-title" className="type-h2 text-ink" lines={story.lead} />
            <MaskText
              as="p"
              className="type-lead max-w-[46ch] text-body"
              lines={story.body}
              delay={0.1}
            />
          </div>
        </div>
        <div className="mt-[calc(var(--s-section-gap)*0.6)]">
          <Collage photos={story.collage} />
        </div>
      </Section>

      <Section theme="brand" className="overflow-hidden" labelledBy="name-title">
        <Eyebrow>{name.eyebrow}</Eyebrow>
        <h2 id="name-title" className="sr-only">
          {name.wordmark}
        </h2>
        <div className="mt-[calc(var(--s-section-gap)*0.3)] type-mega text-ink">
          <Wordmark word={name.wordmark} />
        </div>
        <MaskText
          as="p"
          className="mt-[calc(var(--s-section-gap)*0.4)] type-h3 max-w-[30ch] text-ink md:ml-auto"
          lines={name.sentence}
        />
      </Section>

      <Section theme="light" surface labelledBy="values-title">
        <SectionHead eyebrow={values.eyebrow} title={values.h2} id="values-title" />
        <ul className="mt-[calc(var(--s-section-gap)*0.45)] grid grid-cols-1 gap-x-gutter gap-y-10 md:grid-cols-3">
          {values.items.map((item, i) => (
            <li
              key={item.title}
              className={cn(
                "flex flex-col gap-3 border-t pt-5",
                i === 0 ? "border-brand" : "border-hairline",
              )}
            >
              <MaskText
                as="h3"
                className="type-h3 text-ink"
                lines={[item.title]}
                delay={i * 0.08}
              />
              <MaskText
                as="p"
                className="type-body text-body"
                lines={item.body}
                delay={0.1 + i * 0.08}
              />
            </li>
          ))}
        </ul>
      </Section>

      <Section theme="light" tint id={team.id} labelledBy="team-title">
        <SectionHead eyebrow={team.eyebrow} title={team.h2} id="team-title" />
        {people.length > 0 && (
          <ul className="mt-[calc(var(--s-section-gap)*0.45)] grid grid-cols-1 gap-x-gutter gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {people.map((person) => (
              <li key={person.name} className="flex flex-col gap-4">
                <RevealImage className="aspect-[4/5] rounded-image">
                  <Photo
                    id={person.photo}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  />
                </RevealImage>
                <Reveal className="flex flex-col gap-1">
                  <h3 className="type-h3 text-ink">{person.name}</h3>
                  {person.role && <p className="type-label text-muted">{person.role}</p>}
                </Reveal>
                {person.bio && (
                  <MaskText as="p" className="type-body text-body" lines={person.bio} />
                )}
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section theme="dark" id={careers.id} labelledBy="careers-title">
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-[1fr_1.9fr]">
          <Eyebrow>{careers.eyebrow}</Eyebrow>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-6">
              <MaskText
                as="h2"
                id="careers-title"
                className="type-h2 text-ink"
                lines={careers.h2}
              />
              <MaskText
                as="p"
                className="type-lead max-w-[40ch] text-body"
                lines={careers.body}
                delay={0.1}
              />
            </div>
            <Reveal className="shrink-0">
              <Button href={careers.cta.href} icon="mail">
                {careers.cta.label}
              </Button>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
