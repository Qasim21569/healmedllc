"use client";

import { mapRange } from "@/lib/motion";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { home } from "@/content/home";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskText } from "@/components/ui/MaskText";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/RevealImage";

const { whoWeAre } = home;
const [topLine, bottomLine] = whoWeAre.h2.desktop;

/**
 * Home "Who we are", I2 shutter band (BUILD-PLAYBOOK §5), ported from brahma
 * `ThresholdReveal` (sequent `ExpandingSection`): the two h2 lines split apart,
 * a full-width photo opens by HEIGHT between them (never by animating a mask), and at
 * the 0.6 threshold the body, list and button reveal over a night gradient.
 *
 * Desktop only (useIsDesktop). Server, phones, tablets and reduced motion get
 * the stacked version: h2, 4:5 photo with I3, body, list, button.
 */
export function WhoWeAre() {
  const isDesktop = useIsDesktop();
  return isDesktop ? <Shutter /> : <Stacked />;
}

function Content() {
  return (
    <div className="flex flex-col gap-8">
      <MaskText as="p" className="type-lead max-w-[44ch] text-body" lines={whoWeAre.body} />
      <ul className="grid grid-cols-1 gap-x-gutter sm:grid-cols-2">
        {whoWeAre.list.map((item, i) => (
          <Reveal
            as="li"
            key={item}
            delay={0.1 + i * 0.06}
            className="flex items-center gap-3 border-t border-hairline py-3 type-body text-ink"
          >
            <span aria-hidden="true" className="size-1.5 bg-brand" />
            {item}
          </Reveal>
        ))}
      </ul>
      <Reveal delay={0.35}>
        <Button href={whoWeAre.cta.href} variant="outline">
          {whoWeAre.cta.label}
        </Button>
      </Reveal>
    </div>
  );
}

function Stacked() {
  return (
    <Section theme="dark" labelledBy="who-title">
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-[1fr_1.9fr]">
        <Eyebrow>{whoWeAre.eyebrow}</Eyebrow>
        <MaskText as="h2" id="who-title" className="type-h2 text-ink" lines={whoWeAre.h2} />
      </div>
      <RevealImage className="mt-10 aspect-[4/5] rounded-image md:aspect-[16/9]">
        <Photo id={whoWeAre.photo} fill sizes="100vw" />
      </RevealImage>
      <div className="mt-10 md:ml-[calc((100%-var(--s-gutter))*1/2.9+var(--s-gutter))]">
        <Content />
      </div>
    </Section>
  );
}

function Shutter() {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const topY = useTransform(scrollYProgress, (p) => `${mapRange(p, [0, 0.3], [0, -38])}vh`);
  const bottomY = useTransform(scrollYProgress, (p) => `${mapRange(p, [0, 0.3], [0, 38])}vh`);
  const windowHeight = useTransform(
    scrollYProgress,
    (p) => `${mapRange(p, [0.1, 0.6], [0, 100])}svh`,
  );
  const photoScale = useTransform(scrollYProgress, (p) => mapRange(p, [0.1, 0.6], [1.2, 1]));
  // The lines clear as the copy arrives, so it reads over the open photo.
  const linesOpacity = useTransform(scrollYProgress, (p) => mapRange(p, [0.55, 0.65], [1, 0]));

  useMotionValueEvent(scrollYProgress, "change", (p) => setRevealed(p >= 0.6));

  return (
    <Section ref={ref} theme="dark" flush labelledBy="who-title" className="h-[300vh]">
      <h2 id="who-title" className="sr-only">{`${topLine} ${bottomLine}`}</h2>

      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Shutter: the window's height opens; the photo inside keeps 100svh. */}
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <motion.div
            className="flex w-full items-center justify-center overflow-hidden [contain:layout_paint]"
            style={{ height: windowHeight }}
          >
            <motion.div className="relative h-svh w-full shrink-0" style={{ scale: photoScale }}>
              <Photo id={whoWeAre.photo} fill sizes="100vw" />
            </motion.div>
          </motion.div>
        </div>

        {/* The two lines part. */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-margin-edge text-center"
          style={{ opacity: linesOpacity }}
        >
          <motion.span className="type-display block text-ink" style={{ y: topY }}>
            {topLine}
          </motion.span>
          <motion.span className="type-display block text-ink" style={{ y: bottomY }}>
            {bottomLine}
          </motion.span>
        </motion.div>

        <div className="absolute top-[calc(var(--header-h)+var(--s-section-gap)*0.25)] left-margin-edge">
          <Eyebrow>{whoWeAre.eyebrow}</Eyebrow>
        </div>

        {/* After the threshold: copy over a night gradient, bottom left. */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              key="copy"
              className="absolute inset-x-0 bottom-0 bg-linear-to-t from-night via-night/80 to-transparent px-margin-edge pt-[calc(var(--s-section-gap)*1.2)] pb-[calc(var(--s-section-gap)*0.5)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="max-w-[calc(640*var(--multiplier))]">
                <Content />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
