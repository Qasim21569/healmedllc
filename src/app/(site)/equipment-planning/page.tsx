import { planning } from "@/content/planning";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/sections/PageHero";
import { PlanningServices } from "@/components/sections/planning/PlanningServices";
import { SectionHead } from "@/components/sections/SectionHead";
import { StepCards } from "@/components/sections/StepCards";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/equipment-planning");

/** Equipment Planning. Signature: I6. Rhythm: brand → light → dark → (brand footer). */
export default function Page() {
  const { howItWorks } = planning;
  return (
    <>
      <PageHero content={planning.hero} />
      <PlanningServices />
      <Section theme="dark" id={howItWorks.id} labelledBy="how-title">
        <SectionHead eyebrow={howItWorks.eyebrow} title={howItWorks.h2} id="how-title">
          <Button href={howItWorks.cta.href}>{howItWorks.cta.label}</Button>
        </SectionHead>
        <div className="mt-[calc(var(--s-section-gap)*0.45)]">
          <StepCards items={howItWorks.steps} />
        </div>
      </Section>
    </>
  );
}
