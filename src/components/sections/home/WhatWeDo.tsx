"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { home } from "@/content/home";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HoverFollowImage } from "@/components/ui/HoverFollowImage";
import { Icon } from "@/components/ui/Icon";
import { MaskText } from "@/components/ui/MaskText";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SmartLink } from "@/components/ui/SmartLink";

const { whatWeDo } = home;

/**
 * Home "What we do" (light, surface). Three big rows: index · title · chips ·
 * arrow, hairlines between. Fine pointer ≥1024: I7 hover-follow photo.
 * Touch / smaller: the first tap on a row expands it and shows its photo
 * inline (4:3); a second tap, or the arrow, follows the link. Every row is a
 * real link in the HTML.
 */
export function WhatWeDo() {
  const fine = useIsDesktop();
  const reduced = useReducedMotion();
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <Section theme="light" surface labelledBy="what-we-do-title">
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-[1fr_1.9fr]">
        <Eyebrow>{whatWeDo.eyebrow}</Eyebrow>
        <MaskText as="h2" id="what-we-do-title" className="type-h2 text-ink" lines={whatWeDo.h2} />
      </div>

      <div className="relative mt-[calc(var(--s-section-gap)*0.6)]">
        <ul ref={listRef} className="border-t border-hairline" onMouseLeave={() => setActive(null)}>
          {whatWeDo.rows.map((row, i) => {
            const open = !fine && expanded === i;
            return (
              <li key={row.href} className="border-b border-hairline">
                <SmartLink
                  href={row.href}
                  onMouseEnter={() => fine && setActive(i)}
                  onFocus={() => fine && setActive(i)}
                  onBlur={() => fine && setActive(null)}
                  onClick={(e) => {
                    if (!fine && expanded !== i) {
                      e.preventDefault();
                      setExpanded(i);
                    }
                  }}
                  className="group/row grid grid-cols-[auto_1fr_auto] items-center gap-x-gutter gap-y-4 py-[calc(var(--s-section-gap)*0.28)] lg:grid-cols-[calc(96*var(--multiplier))_1fr_auto_auto]"
                >
                  <span className="type-eyebrow self-start pt-[0.6em] text-muted lg:self-center lg:pt-0">
                    {row.index}
                  </span>
                  <MaskText
                    as="h3"
                    className="type-row text-ink transition-colors duration-300 ease-heal group-hover/row:text-brand"
                    lines={row.title}
                  />
                  <span className="col-start-3 row-start-1 grid size-12 place-items-center rounded-full border border-hairline text-ink transition-colors duration-300 ease-heal group-hover/row:border-brand group-hover/row:bg-brand group-hover/row:text-on-brand lg:col-start-4">
                    <Icon
                      name="arrow"
                      className="transition-transform duration-300 ease-heal group-hover/row:translate-x-1 group-hover/row:-translate-y-1"
                    />
                  </span>
                  <span className="col-span-3 col-start-1 flex flex-wrap gap-2 lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:justify-end">
                    {row.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-hairline px-3 py-1 type-small text-body"
                      >
                        {chip}
                      </span>
                    ))}
                  </span>
                </SmartLink>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <Reveal className="pb-8">
                        <Photo
                          id={row.photo}
                          ratio="4 / 3"
                          sizes="100vw"
                          className={cn("rounded-image")}
                        />
                      </Reveal>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        {fine && (
          <HoverFollowImage
            containerRef={listRef}
            active={active}
            photos={whatWeDo.rows.map((r) => r.photo)}
          />
        )}
      </div>
    </Section>
  );
}
