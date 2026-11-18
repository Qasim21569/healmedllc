import { Logo } from "@/components/ui/Logo";

/**
 * Load animation (T12, Qasim 2026-11-18): the vector logo assembles on brand
 * violet (mark spins in, HEAL letters rise, MEDICAL LLC fades), then the panel
 * lifts off the top. About 1.8s.
 *
 * Pure CSS (`.preloader` keyframes in globals.css), rendered on the server, so
 * it always removes itself, even if JavaScript fails. Shown once per browser
 * session: an inline script in the root layout adds `intro-seen` to <html> on
 * later page loads, which hides it before first paint. Never shown under
 * prefers-reduced-motion.
 */
export function Preloader() {
  return (
    <div className="preloader" data-theme="brand" aria-hidden="true">
      <Logo animated className="w-[min(64vw,320px)] text-ink" />
    </div>
  );
}

/** Runs in <head> before paint: first load of the session plays the preloader. */
export const PRELOADER_GATE = `try{if(sessionStorage.getItem("heal-intro")){document.documentElement.classList.add("intro-seen")}else{sessionStorage.setItem("heal-intro","1")}}catch(e){}`;
