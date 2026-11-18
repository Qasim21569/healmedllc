"use client";

import { mapRange } from "@/lib/motion";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { home } from "@/content/home";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MaskText } from "@/components/ui/MaskText";
import { Photo } from "@/components/ui/Photo";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Reveal } from "@/components/ui/Reveal";
import { healLetters, type HealLetter } from "./heal-letters";

const { hero } = home;
const vb = healLetters.viewBox;
const ASPECT = vb.width / vb.height;
const PHOTO_SIZES = "100vw";

/**
 * Home hero, I1 "Letters aperture" (BUILD-PLAYBOOK §5).
 *
 * Brand violet with HEAL cut out of it and photo 01 seen through the letters.
 * On desktop (useIsDesktop: ≥1024px, fine pointer, no reduced motion) the
 * section is 240vh with a sticky stage: scrolling zooms into the L's stem
 * until the photo fills the screen.
 *
 * Everything else (server render, phones, tablets, reduced motion) gets the
 * static composition: eyebrows, a letters box with the photo inside, h1, lead,
 * buttons. The server always renders this, so the text is in the HTML.
 *
 * The letter mask is a static SVG <mask>. Only the overlay wrapper's
 * `transform: scale()` animates (origin and end scale computed from layout).
 */
export function HomeHero() {
  const isDesktop = useIsDesktop();
  return isDesktop ? <HeroDesktop /> : <HeroStatic />;
}

/* ─── Shared pieces ────────────────────────────────────────────────────── */

function HeroEyebrows() {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <Eyebrow>{hero.eyebrow}</Eyebrow>
      <Eyebrow mark={false}>{hero.rightLabel}</Eyebrow>
    </div>
  );
}

function HeroText() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-end md:gap-gutter">
      <MaskText as="h1" id="home-title" className="type-h1-home text-ink" lines={hero.h1} />
      <div className="flex flex-col gap-6 md:items-end">
        <MaskText
          as="p"
          className="type-lead max-w-[44ch] text-body md:w-fit"
          lines={hero.lead}
          delay={0.15}
        />
        <Reveal delay={0.25} className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
          {hero.ctas.map((cta, i) => (
            <Button key={cta.href} href={cta.href} variant={i === 0 ? "primary" : "outline"} block>
              {cta.label}
            </Button>
          ))}
        </Reveal>
      </div>
    </div>
  );
}

/** Canvas-coloured rect with the HEAL letters cut out, in letter units. */
function LettersMask({ maskId }: { maskId: string }) {
  const pad = 4;
  return (
    <svg
      aria-hidden="true"
      viewBox={`${vb.x} ${vb.y} ${vb.width} ${vb.height}`}
      preserveAspectRatio="none"
      className="absolute inset-0 size-full"
    >
      <defs>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          x={vb.x - pad}
          y={vb.y - pad}
          width={vb.width + pad * 2}
          height={vb.height + pad * 2}
        >
          <rect
            x={vb.x - pad}
            y={vb.y - pad}
            width={vb.width + pad * 2}
            height={vb.height + pad * 2}
            fill="white"
          />
          {healLetters.letters.map((l) => (
            <path key={l.char} d={l.d} fill="black" />
          ))}
        </mask>
      </defs>
      <rect
        x={vb.x - pad}
        y={vb.y - pad}
        width={vb.width + pad * 2}
        height={vb.height + pad * 2}
        style={{ fill: "var(--canvas)" }}
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}

/* ─── Static composition (server, phones, tablets, reduced motion) ─────── */

function HeroStatic() {
  const maskId = useId().replace(/:/g, "");
  return (
    <Section
      theme="brand"
      labelledBy="home-title"
      className="pt-[calc(var(--header-h)+var(--s-section-gap)*0.4)]"
    >
      <HeroEyebrows />
      <div
        className="relative mt-[calc(var(--s-section-gap)*0.35)] w-full overflow-hidden bg-night"
        style={{ aspectRatio: `${vb.width} / ${vb.height}` }}
      >
        {/* Tablet: I4 amount 8 inside the letters. */}
        <ResponsiveImage parallaxAmount={8} from="md">
          <Photo id={hero.photo} fill preload sizes={PHOTO_SIZES} />
        </ResponsiveImage>
        <LettersMask maskId={`heal-${maskId}`} />
      </div>
      <div className="mt-[calc(var(--s-section-gap)*0.4)]">
        <HeroText />
      </div>
    </Section>
  );
}

/* ─── Desktop: sticky stage + zoom ─────────────────────────────────────── */

type Layout = {
  w: number;
  h: number;
  box: { left: number; top: number; width: number; height: number };
};

function useStageLayout(
  stage: React.RefObject<HTMLDivElement | null>,
  box: React.RefObject<HTMLDivElement | null>,
) {
  const [layout, setLayout] = useState<Layout | null>(null);

  useLayoutEffect(() => {
    const measure = () => {
      const s = stage.current;
      const b = box.current;
      if (!s || !b) return;
      // offset* ignore transforms, so the text layer's fade-up doesn't skew this.
      let left = 0;
      let top = 0;
      let el: HTMLElement | null = b;
      while (el && el !== s) {
        left += el.offsetLeft;
        top += el.offsetTop;
        el = el.offsetParent as HTMLElement | null;
      }
      setLayout({
        w: s.clientWidth,
        h: s.clientHeight,
        box: { left, top, width: b.offsetWidth, height: b.offsetHeight },
      });
    };
    // ResizeObserver reports once on observe, so this also takes the first measurement.
    const ro = new ResizeObserver(measure);
    if (stage.current) ro.observe(stage.current);
    if (box.current) ro.observe(box.current);
    return () => ro.disconnect();
  }, [stage, box]);

  return layout;
}

/** Zoom target: the target letter's vertical stem, in stage pixels. */
function stemRect(layout: Layout, letter: HealLetter) {
  const s = layout.box.width / vb.width;
  const l = healLetters.letters.find((x) => x.char === letter) ?? healLetters.letters[3];
  const stemX = letter === "A" ? l.bbox.x + l.bbox.width / 2 - healLetters.stemWidth / 2 : l.bbox.x;
  return {
    x: layout.box.left + (stemX - vb.x) * s,
    y: layout.box.top + (l.bbox.y - vb.y) * s,
    width: healLetters.stemWidth * s,
    height: l.bbox.height * s,
  };
}

function HeroDesktop() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const maskId = `heal-${useId().replace(/:/g, "")}`;
  const layout = useStageLayout(stageRef, boxRef);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  // Computed from layout: origin at the stem centre, end scale so the stem
  // (scaled about its own centre) covers the whole stage.
  const endScale = useMotionValue(20);
  const origin = useMotionValue("50% 50%");
  useEffect(() => {
    if (!layout) return;
    const stem = stemRect(layout, hero.zoomInto);
    const cx = stem.x + stem.width / 2;
    const cy = stem.y + stem.height / 2;
    const needX = (2 * Math.max(cx, layout.w - cx)) / stem.width;
    const needY = (2 * Math.max(cy, layout.h - cy)) / stem.height;
    endScale.set(Math.max(needX, needY) * 1.1);
    origin.set(`${cx}px ${cy}px`);
  }, [layout, endScale, origin]);

  // Progress map (PLAYBOOK §5).
  const photoScale = useTransform(scrollYProgress, (p) => mapRange(p, [0, 0.85], [1.15, 1]));
  const textOpacity = useTransform(scrollYProgress, (p) => mapRange(p, [0, 0.15], [1, 0]));
  const textY = useTransform(scrollYProgress, (p) => mapRange(p, [0, 0.15], [0, -40]));
  const overlayScale = useTransform(scrollYProgress, (p) => {
    const t = Math.min(1, Math.max(0, (p - 0.05) / 0.8));
    // Exponential, so the zoom reads as constant speed.
    return Math.pow(endScale.get(), t);
  });
  const overlayOpacity = useTransform(scrollYProgress, (p) => mapRange(p, [0.85, 1], [1, 0]));
  const captionOpacity = useTransform(scrollYProgress, (p) => mapRange(p, [0.85, 0.97], [0, 1]));
  const captionY = useTransform(scrollYProgress, (p) => mapRange(p, [0.85, 0.97], [16, 0]));

  // Light text on the photo once it fills the screen.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const el = sectionRef.current;
    if (!el) return;
    if (p > 0.85) el.setAttribute("data-header-theme", "dark");
    else el.removeAttribute("data-header-theme");
  });

  return (
    <Section ref={sectionRef} theme="brand" flush labelledBy="home-title" className="h-[240vh]">
      <div ref={stageRef} className="sticky top-0 h-svh overflow-hidden">
        {/* Layer 0: photo */}
        {/* Dark ground: the letters read as shapes before the photo loads. */}
        <motion.div className="absolute inset-0 bg-night" style={{ scale: photoScale }}>
          <Photo id={hero.photo} fill preload sizes={PHOTO_SIZES} />
        </motion.div>

        {/* Layer 1: violet with the letters cut out. Static mask, scaled wrapper. */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: overlayScale, opacity: overlayOpacity, transformOrigin: origin }}
        >
          {layout ? (
            <StageMask layout={layout} maskId={maskId} />
          ) : (
            <div className="size-full bg-canvas" />
          )}
        </motion.div>

        {/* Layer 2: text over violet */}
        <motion.div
          className="absolute inset-0 flex flex-col px-margin-edge pt-[calc(var(--header-h)+var(--s-section-gap)*0.25)] pb-[calc(var(--s-section-gap)*0.4)]"
          style={{ opacity: textOpacity, y: textY }}
        >
          <HeroEyebrows />
          <div className="flex flex-1 items-center py-[calc(var(--s-section-gap)*0.25)]">
            {/* Invisible: marks where the letters sit. Height-limited so the
                h1 always fits under it. */}
            <div
              ref={boxRef}
              aria-hidden="true"
              style={{
                aspectRatio: `${vb.width} / ${vb.height}`,
                width: `min(100%, calc((100svh - var(--header-h) - 380 * var(--multiplier)) * ${ASPECT}))`,
              }}
            />
          </div>
          <HeroText />
        </motion.div>

        {/* Caption once the photo fills the screen */}
        <motion.p
          data-theme="dark"
          className="absolute bottom-[calc(var(--s-section-gap)*0.35)] left-margin-edge bg-transparent type-lead text-ink"
          style={{ opacity: captionOpacity, y: captionY }}
        >
          {hero.caption}
        </motion.p>
      </div>
    </Section>
  );
}

function StageMask({ layout, maskId }: { layout: Layout; maskId: string }) {
  const s = layout.box.width / vb.width;
  const tx = layout.box.left - vb.x * s;
  const ty = layout.box.top - vb.y * s;
  return (
    <svg
      aria-hidden="true"
      width={layout.w}
      height={layout.h}
      viewBox={`0 0 ${layout.w} ${layout.h}`}
      className="absolute inset-0"
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={layout.w} height={layout.h}>
          <rect width={layout.w} height={layout.h} fill="white" />
          <g transform={`translate(${tx} ${ty}) scale(${s})`}>
            {healLetters.letters.map((l) => (
              <path key={l.char} d={l.d} fill="black" />
            ))}
          </g>
        </mask>
      </defs>
      <rect
        width={layout.w}
        height={layout.h}
        style={{ fill: "var(--canvas)" }}
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}
