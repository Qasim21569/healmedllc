import { Section } from "@/components/layout/Section";
import { MaskText } from "@/components/ui/MaskText";
import { planning } from "@/content/planning";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/equipment-planning");

export default function Page() {
  return (
    <Section theme="brand" className="pt-[calc(var(--header-h)+var(--s-section-gap))]">
      <MaskText as="h1" className="type-display" lines={planning.hero.h1} />
    </Section>
  );
}
