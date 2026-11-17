import { Section } from "@/components/layout/Section";
import { MaskText } from "@/components/ui/MaskText";
import { privacy } from "@/content/legal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/privacy");

export default function Page() {
  return (
    <Section theme="brand" className="pt-[calc(var(--header-h)+var(--s-section-gap))]">
      <MaskText as="h1" className="type-display" lines={privacy.h1} />
    </Section>
  );
}
