import { Section } from "@/components/layout/Section";
import { MaskText } from "@/components/ui/MaskText";
import { home } from "@/content/home";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/");

export default function Page() {
  return (
    <Section theme="brand" className="pt-[calc(var(--header-h)+var(--s-section-gap))]">
      <MaskText as="h1" className="type-h1-home" lines={home.hero.h1} />
    </Section>
  );
}
