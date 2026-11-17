import type { Metadata } from "next";
import { notFound } from "@/content/legal";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { MaskText } from "@/components/ui/MaskText";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

/**
 * 404 (PLAYBOOK §6). A single full-height brand section. No footer: the
 * footer is also brand, and two brand sections never sit together.
 */
export default function NotFound() {
  return (
    <SiteChrome footer={false}>
      <Section
        theme="brand"
        labelledBy="page-title"
        className="flex min-h-svh flex-col justify-center pt-[calc(var(--header-h)+var(--s-section-gap)*0.5)]"
      >
        <MaskText as="h1" id="page-title" className="type-display text-ink" lines={notFound.h1} />
        <MaskText
          as="p"
          className="mt-[calc(var(--s-section-gap)*0.3)] type-lead max-w-[40ch] text-body"
          lines={notFound.lead}
          delay={0.15}
        />
        <Reveal delay={0.25} className="mt-10 flex flex-col gap-3 sm:flex-row">
          {notFound.ctas.map((cta, i) => (
            <Button key={cta.href} href={cta.href} variant={i === 0 ? "primary" : "outline"} block>
              {cta.label}
            </Button>
          ))}
        </Reveal>
      </Section>
    </SiteChrome>
  );
}
