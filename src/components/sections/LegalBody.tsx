import type { LegalPage } from "@/content/legal";
import { Section } from "@/components/layout/Section";
import { MaskText } from "@/components/ui/MaskText";

/**
 * Legal page body: one light text section, 68ch column. Until the drafted text
 * is approved (`approved: false`, [confirm] for Ahmed or a lawyer) only the
 * holding line renders.
 */
export function LegalBody({ page }: { page: LegalPage }) {
  return (
    <Section theme="light">
      <div className="max-w-[68ch]">
        {page.approved ? (
          <div className="flex flex-col gap-10">
            {page.sections.map((section) => (
              <div key={section.heading} className="flex flex-col gap-3">
                <h2 className="type-h3 text-ink">{section.heading}</h2>
                <MaskText as="p" className="type-body text-body" lines={section.body} />
              </div>
            ))}
          </div>
        ) : (
          <MaskText as="p" className="type-lead text-body" lines={page.holding} />
        )}
      </div>
    </Section>
  );
}
