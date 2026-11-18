"use client";

import { useSyncExternalStore } from "react";

const EVENT = "heal:intro-release";
/** Backstop: never hold entrances longer than this, even if the event is lost.
 *  Must stay above the boot script's tR (1950ms). */
const FAILSAFE_MS = 4000;

function released(): boolean {
  const el = document.documentElement;
  const state = el.getAttribute("data-intro");
  return (state !== "play" && state !== "exit") || el.hasAttribute("data-intro-released");
}

/**
 * True once the preloader has started lifting (or when it isn't playing at
 * all: later loads, reduced motion, no intro). Entrance animations (MaskText,
 * Reveal, RevealImage) wait for it, so the hero animates in as the curtain
 * lifts instead of finishing unseen underneath it.
 *
 * The boot script in Preloader.tsx sets `data-intro-released` and fires
 * `heal:intro-release` at tR. Server snapshot `true`: markup is identical
 * either way, only the start of the animation waits.
 */
export function useIntroReleased(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      document.addEventListener(EVENT, onChange);
      const failsafe = released()
        ? 0
        : window.setTimeout(() => {
            document.documentElement.setAttribute("data-intro-released", "");
            onChange();
          }, FAILSAFE_MS);
      return () => {
        document.removeEventListener(EVENT, onChange);
        window.clearTimeout(failsafe);
      };
    },
    released,
    () => true,
  );
}
