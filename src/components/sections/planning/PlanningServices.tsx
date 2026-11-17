"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { planning, type PlanningService } from "@/content/planning";
import { useScrollToHash } from "@/components/providers/SmoothScrollProvider";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import useMaskImage from "@/hooks/useMaskImage";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskText } from "@/components/ui/MaskText";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/RevealImage";
import { SwapMaskText } from "@/components/ui/SwapMaskText";

const { services } = planning;
const items = services.items;
const N = items.length;

/**
 * Equipment Planning services, I6 "Sticky swap" (BUILD-PLAYBOOK §5), ported
 * from brahma `SelectedWork` / Elementis `Innovation`.
 *
 * Desktop: one 300vh section with a sticky stage, grid [1fr_1.375fr]. Left:
 * pills, eyebrow, h2, lead, bullets (SwapMaskText; direction follows scroll).
 * Right: a 4:5 frame whose photos change through the 28-bar `useMaskImage`.
 * `active = clamp(floor(progress * 3), 0, 2)`. Anchors sit at 0, 100vh, 200vh.
 *
 * Server, phones, tablets, reduced motion: three stacked blocks with the same
 * anchor ids, so every service's copy is in the HTML.
 */
export function PlanningServices() {
  const isDesktop = useIsDesktop();
  return isDesktop ? <Sticky /> : <Stacked />;
}

function Bullets({ bullets }: { bullets: readonly string[] }) {
  return (
    <ul className="flex flex-col border-t border-hairline">
      {bullets.map((b, i) => (
        <Reveal
          as="li"
          key={b}
          delay={i * 0.06}
          className="flex items-center gap-3 border-b border-hairline py-3 type-body text-ink"
        >
          <span aria-hidden="true" className="size-1.5 shrink-0 bg-brand" />
          {b}
        </Reveal>
      ))}
    </ul>
  );
}

function PartnerCard() {
  const { partner } = services;
  return (
    <div data-theme="dark" className="flex flex-col gap-3 rounded-card bg-canvas p-6 text-ink">
      <Eyebrow>{partner.name ? `${partner.label} · ${partner.name}` : partner.label}</Eyebrow>
      <MaskText as="p" className="type-small text-body" lines={partner.body} />
    </div>
  );
}

/* ─── Stacked ─────────────────────────────────────────────────────────── */

function Stacked() {
  return (
    <Section theme="light" label={services.label}>
      <div className="flex flex-col gap-[calc(var(--s-section-gap)*0.8)]">
        {items.map((item) => (
          <article
            key={item.id}
            id={item.id}
            aria-labelledby={`${item.id}-title`}
            className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1fr] md:gap-gutter"
          >
            <div className="flex flex-col gap-6">
              <Eyebrow>{item.eyebrow}</Eyebrow>
              <MaskText
                as="h2"
                id={`${item.id}-title`}
                className="type-h2 text-ink"
                lines={item.h2}
              />
              <MaskText as="p" className="type-lead text-body" lines={item.lead} delay={0.1} />
              <Bullets bullets={item.bullets} />
              {item.id === "asset-management" && <PartnerCard />}
            </div>
            <RevealImage className="aspect-[4/5] rounded-image">
              <Photo id={item.photo} fill sizes="(min-width: 768px) 50vw, 100vw" />
            </RevealImage>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ─── Sticky ──────────────────────────────────────────────────────────── */

function Sticky() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const scrollToHash = useScrollToHash();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(N - 1, Math.max(0, Math.floor(p * N))));
  });

  const item: PlanningService = items[active];

  return (
    <Section ref={ref} theme="light" flush label={services.label} className="h-[300vh]">
      {/* Anchors at 0, 100vh, 200vh: each lands on its service. */}
      {items.map((it, i) => (
        <div
          key={it.id}
          id={it.id}
          aria-hidden="true"
          className="absolute h-0 w-0"
          style={{ top: `${i * 100}vh` }}
        />
      ))}

      <div className="sticky top-0 grid h-svh grid-cols-[1fr_1.375fr] items-center gap-gutter px-margin-edge pt-header">
        <div className="flex flex-col gap-6">
          <div role="tablist" aria-label={services.label} className="flex flex-wrap gap-2">
            {items.map((it, i) => (
              <button
                key={it.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => scrollToHash(`#${it.id}`)}
                className={cn(
                  "min-h-11 rounded-full border px-4 type-small transition-colors duration-300 ease-heal",
                  i === active
                    ? "border-ink bg-ink text-canvas"
                    : "border-hairline text-ink hover:border-ink",
                )}
              >
                {it.pill}
              </button>
            ))}
          </div>

          <div role="tabpanel" aria-live="polite" className="flex flex-col gap-6">
            <SwapMaskText
              state={active}
              lines={[item.eyebrow]}
              className="type-eyebrow text-muted"
            />
            <h2 className="type-h2 text-ink">
              <SwapMaskText state={active} lines={item.h2.desktop} />
            </h2>
            <div className="type-lead max-w-[44ch] text-body">
              <SwapMaskText state={active} lines={item.lead.desktop} />
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex flex-col gap-6"
              >
                <Bullets bullets={item.bullets} />
                {item.id === "asset-management" && <PartnerCard />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/5] h-[min(78svh,100%)] max-w-full overflow-hidden rounded-image">
          {items.map((it, i) => (
            <PhotoLayer key={it.id} index={i} progress={scrollYProgress}>
              <Photo id={it.photo} fill sizes="45vw" />
            </PhotoLayer>
          ))}
        </div>
      </div>
    </Section>
  );
}

/** Layer i sits above i+1 and stripes away around the boundary into i+1. */
function PhotoLayer({
  index,
  progress,
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const boundary = (index + 1) / N;
  const local = useTransform(progress, [boundary - 0.12, boundary + 0.04], [0, 1]);
  const maskImage = useMaskImage(local, false);
  const scale = useTransform(progress, [boundary - 1 / N, boundary + 0.04], [1.075, 1]);
  const last = index === N - 1;

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        zIndex: N - index,
        maskImage: last ? undefined : maskImage,
        WebkitMaskImage: last ? undefined : maskImage,
        scale,
      }}
    >
      {children}
    </motion.div>
  );
}
