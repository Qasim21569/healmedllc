import { Section } from "@/components/layout/Section";
import { MaskText } from "@/components/ui/MaskText";
import { disposition } from "@/content/disposition";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/asset-disposition");

export default function Page() {
  return (
    <Section theme="brand" className="pt-[calc(var(--header-h)+var(--s-section-gap))]">
      <MaskText as="h1" className="type-display" lines={disposition.hero.h1} />
    </Section>
  );
}
