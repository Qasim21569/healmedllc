import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskText } from "@/components/ui/MaskText";
import { Reveal } from "@/components/ui/Reveal";
import { SmartLink } from "@/components/ui/SmartLink";
import { Wordmark } from "@/components/ui/Wordmark";
import { Section } from "./Section";

const year = new Date().getFullYear();

/**
 * Footer (PLAYBOOK §6). Brand. CTA row over a hairline; brand line, address and
 * three link columns; legal row; giant HEAL cropped by the bottom edge (T8).
 * Columns: stacked on phones, 2x2 from 768, 4 across from 1024.
 */
export function Footer() {
  const { footer, contact, social } = site;
  // Socials render only once their URLs are confirmed.
  const socials: { label: string; href: string }[] = [];
  if (social.linkedin) socials.push({ label: footer.socialLabels.linkedin, href: social.linkedin });
  if (social.instagram)
    socials.push({ label: footer.socialLabels.instagram, href: social.instagram });

  return (
    <Section theme="brand" as="footer" className="overflow-hidden pb-0">
      <div className="flex flex-col gap-gutter border-b border-hairline pb-[calc(var(--s-section-gap)*0.6)] lg:flex-row lg:items-end lg:justify-between">
        <MaskText as="h2" className="type-h2 text-ink" lines={footer.cta.h2} />
        <Reveal className="flex flex-col gap-3 sm:flex-row">
          {footer.cta.ctas.map((cta, i) => (
            <Button
              key={cta.href}
              href={cta.href}
              variant={i === 0 ? "primary" : "outline"}
              icon={i === 0 ? "arrow" : "phone"}
              block
            >
              {cta.label}
            </Button>
          ))}
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-x-gutter gap-y-10 py-[calc(var(--s-section-gap)*0.5)] md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <p className="type-lead text-ink">{site.brandLine}</p>
          <address className="flex flex-col gap-1 not-italic type-small text-body">
            <span>{contact.address.oneLine}</span>
            <a href={contact.emailHref} className="w-fit underline-offset-4 hover:underline">
              {contact.email}
            </a>
            <a href={contact.phoneHref} className="w-fit underline-offset-4 hover:underline">
              {contact.phone}
            </a>
          </address>
        </div>

        {footer.columns.map((column) => (
          <nav key={column.title} aria-label={column.title} className="flex flex-col gap-4">
            <Eyebrow as="span">{column.title}</Eyebrow>
            <ul className="flex flex-col">
              {column.links.map((link) => (
                <li key={link.href}>
                  <SmartLink
                    href={link.href}
                    external={"external" in link ? link.external : undefined}
                    className="inline-flex min-h-11 items-center type-body text-body underline-offset-4 hover:text-ink hover:underline md:min-h-9"
                  >
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="flex flex-col gap-3 border-t border-hairline py-6 type-small text-muted md:flex-row md:items-center md:justify-between">
        <p>{`© ${year} ${site.legalName}`}</p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {[...footer.legal, ...socials].map((link) => (
            <li key={link.href}>
              <SmartLink
                href={link.href}
                className="inline-flex min-h-11 items-center underline-offset-4 hover:text-ink hover:underline md:min-h-0"
              >
                {link.label}
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Cropped by the bottom edge: the frame is shorter than the letters. */}
      <div className="h-[0.62em] type-mega overflow-hidden text-ink select-none">
        <Wordmark word={footer.wordmark} />
      </div>
    </Section>
  );
}
