import { Logo } from "@/components/ui/Logo";

/**
 * Load animation (T12). Ported from the brahma-web intro system (inline SVG,
 * CSS keyframes, a boot script that flips `data-intro` on <html>, curved-edge
 * curtain), condensed to ~2.65s for HEAL:
 *
 *      0 → 2300   the logo settles 0.96 → 1
 *    150 → 1050   the H circle draws its outline (pathLength 1)
 *    650 → 1250   its fill floods in as the outline fades
 *    700 → 1660   HEAL rises behind a mask, letter by letter (70ms apart)
 *   1150 → 1750   MEDICAL LLC fades up
 *    400 → 1950   the rule draws once: the progress indicator
 *   1950 → 2650   curtain lifts, curved bottom edge flattens
 *
 * ⚠️ THE TIMINGS ABOVE (globals.css `.preloader*`) AND THE BOOT TIMERS BELOW
 * (`tR`, `tD`) ARE ONE SYSTEM. Change one, change the other.
 *
 * Pure markup and CSS: nothing to download, so it is correct on the first
 * frame. Shown once per session; skipped under reduced motion; never shown
 * without JavaScript (the server renders `data-intro="skip"`). Tap or any key
 * skips it with a quick lift.
 */
export function Preloader() {
  return (
    <div className="preloader" data-theme="brand" aria-hidden="true">
      <div className="preloader-fill" />
      {/* Curved bottom edge: flattens as the sheet lifts, so the reveal sweeps
          up as a curve instead of a flat line. */}
      <svg className="preloader-edge" viewBox="0 0 100 20" preserveAspectRatio="none">
        <path d="M0 0 H100 Q50 40 0 0 Z" />
      </svg>
      <div className="preloader-stage">
        <Logo animated className="preloader-logo" />
        <span className="preloader-rule" />
      </div>
    </div>
  );
}

/**
 * Boot script, inline in <head> so it runs before first paint.
 *   tR (release): content below may start its entrance (as the lift begins)
 *   tD (done)   : curtain gone, scroll unlocked, session marked
 */
export const PRELOADER_BOOT = `(function(){try{var d=document.documentElement,K="heal-intro",played=false,reduce=false;try{played=sessionStorage.getItem(K)==="1"}catch(e){}try{reduce=matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){}if(played||reduce){d.setAttribute("data-intro","skip");return}d.setAttribute("data-intro","play");d.setAttribute("data-intro-lock","");var tR=1950,tD=2650,released=false,done=false,a,b;function rel(){if(released)return;released=true;d.setAttribute("data-intro-released","");try{document.dispatchEvent(new Event("heal:intro-release"))}catch(e){}}function off(){removeEventListener("pointerdown",skip);removeEventListener("keydown",skip)}function fin(){if(done)return;done=true;rel();d.setAttribute("data-intro","done");d.removeAttribute("data-intro-lock");try{sessionStorage.setItem(K,"1")}catch(e){}off()}function skip(){if(done)return;clearTimeout(a);clearTimeout(b);d.setAttribute("data-intro","exit");rel();setTimeout(fin,460)}a=setTimeout(rel,tR);b=setTimeout(fin,tD);addEventListener("pointerdown",skip);addEventListener("keydown",skip)}catch(e){try{document.documentElement.setAttribute("data-intro","skip")}catch(_){}}})();`;
