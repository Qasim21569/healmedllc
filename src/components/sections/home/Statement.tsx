import { home } from "@/content/home";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskText } from "@/components/ui/MaskText";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollFillText } from "@/components/ui/ScrollFillText";

const { statement } = home;

/** Home statement (light): eyebrow left, T3 paragraph right, four points below. */
export function Statement() {
  return (
    <Section theme="light" label={statement.eyebrow}>
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-[1fr_1.9fr]">
        <Eyebrow>{statement.eyebrow}</Eyebrow>
        <ScrollFillText lines={statement.text} className="type-statement text-ink" />
      </div>

      <ul className="mt-[calc(var(--s-section-gap)*0.7)] grid grid-cols-1 gap-x-gutter gap-y-10 md:grid-cols-2 lg:grid-cols-4">
        {statement.points.map((point, i) => (
          <li key={point.title} className="flex flex-col gap-3 border-t border-hairline pt-5">
            <Reveal delay={i * 0.08}>
              <span className="type-eyebrow text-brand">{point.index}</span>
            </Reveal>
            <MaskText as="h3" className="type-h3 text-ink" lines={[point.title]} delay={i * 0.08} />
            <MaskText
              as="p"
              className="type-body text-body"
              lines={point.body}
              delay={0.1 + i * 0.08}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
