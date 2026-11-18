import { contact } from "@/content/contact";
import { Section } from "@/components/layout/Section";
import { HealForm } from "@/components/forms/HealForm";
import { PageHero } from "@/components/sections/PageHero";
import { Icon } from "@/components/ui/Icon";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/contact");

/** Contact. Mega hero, then form (1.9fr) beside the details card and map (1fr). */
export default function Page() {
  const { details } = contact;
  return (
    <>
      <PageHero content={contact.hero} size="mega" />

      <Section theme="light" label={contact.form.eyebrow}>
        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-[1.9fr_1fr]">
          <HealForm kind="contact" />

          <aside className="flex flex-col gap-gutter">
            <Reveal>
              <div
                data-theme="dark"
                className="flex flex-col gap-6 rounded-card bg-canvas p-6 text-ink md:p-8"
              >
                <h2 className="type-h3">{details.heading}</h2>
                <dl className="flex flex-col">
                  {details.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex flex-col gap-1 border-t border-hairline py-4"
                    >
                      <dt className="type-label text-muted">{row.label}</dt>
                      <dd className="type-body">
                        {row.href ? (
                          <a href={row.href} className="underline-offset-4 hover:underline">
                            {row.value}
                          </a>
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <a
                href={details.map.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/map relative block overflow-hidden rounded-card"
              >
                <Photo id={details.map.photo} sizes="(min-width: 1024px) 30vw, 100vw" />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 grid place-items-center"
                >
                  <span className="grid size-12 place-items-center rounded-full bg-brand text-on-brand shadow-floating">
                    <Icon name="pin" className="size-5" />
                  </span>
                </span>
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 type-small text-ink">
                  {details.map.label}
                  <Icon
                    name="arrow-up-right"
                    className="transition-transform duration-300 ease-heal group-hover/map:translate-x-0.5"
                  />
                </span>
              </a>
            </Reveal>
          </aside>
        </div>
      </Section>
    </>
  );
}
