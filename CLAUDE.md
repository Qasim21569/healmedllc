# HEAL website (heal-web)

Marketing site for **Heal Med LLC** (brand: **HEAL**), a Sacramento company that plans, buys, services and resells hospital equipment. Rebuild of healmedllc.com. Brand line: **Providing a second life to your asset.**

Read in this order before any task: `docs/HANDOFF.md` (state, wins if docs disagree) → `docs/BUILD-PLAYBOOK.md` (how) → `docs/MASTER-PLAN.md` §2 (locked decisions). Copy lives in `docs/CONTENT.md`, page layouts in `docs/PAGES.md`.

## Stack

Next 16 (App Router, Turbopack) · React 19 · TypeScript strict · Tailwind v4 (`@tailwindcss/postcss`, CSS-first `@theme`) · Motion v12 (`motion/react`) · Lenis · GSAP + `@gsap/react` only where noted · react-hook-form + zod · Resend · Cloudflare Turnstile · vitest.

**Next 16 has breaking changes from what you remember** (async `params`/`searchParams`, `proxy.ts` replaces `middleware.ts`, caching defaults, image config). Before writing routing, metadata, image or caching code, read the relevant file in `node_modules/next/dist/docs/`. Don't guess APIs.

## Where things live

```
src/app/(site)/            pages; layout.tsx holds Header, Footer, SmoothScrollProvider
src/app/template.tsx       page transition (port of otis-valen)
src/content/               ALL copy, typed. Pages import from here, never hardcode strings
src/components/ui/         primitives (MaskText, Reveal, RevealImage, ParallaxContainer, ...)
src/components/sections/   page sections, one file each
src/components/layout/     Header, MobileMenu, Footer, Section
src/components/providers/  SmoothScrollProvider
src/hooks/                 useMaskImage, useHeaderTheme, useIsDesktop
src/lib/                   forms (schemas, actions), seo, utils
public/photos/             p01.webp ... (see docs/PHOTO-PIPELINE.md)
design/                    tokens.json, tokens.css, sitemap sketch (source material, read-only)
```

## Rules (learned the hard way on Qasim's other builds)

1. **Qasim does ALL visual and browser testing. Never use preview, screenshot, Playwright or browser tools.** Verify with `npx tsc --noEmit`, `npx next build`, `npx vitest run`, and by reading source. To confirm something renders server-side, grep `.next/server/app/<route>.html`.
2. **Section Recipe for every section** (BUILD-PLAYBOOK §3). The Home page is the reference implementation once built; match it.
3. **Every headline and every body paragraph reveals line by line via `<MaskText>` with hand-set line arrays.** Never `<p>` inside `<Reveal>` for body copy. Lines under ~45 characters. The line arrays live in `src/content/`.
4. **One easing everywhere: `[0.24, 0.43, 0.15, 0.97]`.** Durations 0.6 to 0.8s, stagger 0.05 to 0.1s. No bounce, no spring overshoot.
5. **Every section is a `<Section theme="light|dark|brand">`.** It sets `data-theme`, background and text colour explicitly. Never inherit colour across a theme boundary. Components only use semantic colour variables (`--canvas`, `--ink`, `--brand`...), never raw violet steps.
6. **No page-level `max-w-*` container.** Sections are full-bleed, inset by `px-margin-edge`. Constrain text blocks, never sections.
7. **Type and spacing come from the `--multiplier` variables in `globals.css`.** Never hardcode a font size or section padding. Weights 400 and 500 only. No bold.
8. **Image patterns are I1 to I8 (BUILD-PLAYBOOK §5). One signature pattern per page, Home gets two.** Everything else uses I3 + I4 or the quiet patterns. Don't invent new image effects.
9. **Never animate `mask-size` or `clip-path` on scroll scrub for big areas.** Scale with `transform`, open with `height`. Animate transform and opacity only, except the documented clip-path entrance wipes (short, not scrubbed).
10. **Never return `null` from a viewport-branching component.** Render desktop on the server, swap after hydration.
11. **Never add a global class that hides content** (`opacity: 0`) unless a mounted component is guaranteed to reveal it. Respect `prefers-reduced-motion`: everything visible, no scrubbed motion.
12. **No invented facts.** Placeholders marked `[confirm]` in CONTENT.md are `null` in `src/content/` and render nothing. No certifications, no counts, no client names, no testimonials unless Ahmed supplies them.
13. **Naming:** "HEAL" in display type and copy. "Heal Med LLC" in legal places: footer copyright, terms, privacy, JSON-LD `legalName`, contact card. Never "HEAL Medical".
14. **Copy style:** sentence case, no em dashes, no exclamation marks, verbs on buttons.
15. **Delete orphans immediately.** Dead files and dead `data-*` attributes cause confusion later.
16. **Commit at the end of each phase** with a clear message, then update `docs/HANDOFF.md`.
17. **Don't re-analyse the reference codebases end to end.** The patterns are already mapped in BUILD-PLAYBOOK §5 and §6 with exact file paths. Open only the file the mapping names.

## References (read-only, never edit)

This repo sits inside `C:\Users\qasim\Claude\Projects\BRAHMA Group Website Development\`. Siblings, from the repo root:

- `../brahma-web/` Qasim's production build on this exact stack. **Port its primitives** (`src/components/ui/*`, `src/hooks/useMaskImage.ts`, `src/components/providers/SmoothScrollProvider.tsx`, `src/components/sections/ThresholdReveal.tsx`, `SelectedWork.tsx`). Never read or copy `.env*`.
- `../Elementis-SOTD/` primary design reference (grid, MaskText, Innovation sticky section, multiplier).
- `../sequent-media-house-main/` closest stack; pinned choreography, height shutter, multi-speed rows.
- `../otis-valen-next/` page transitions. `../the-line-awwwards-SOTM/` accordion, HoverReveal. `../ochi.design-UI-Clone/` hover-follow image. `../Axel-Vanhessche/` aperture concept only.
- `../awwwards-collection/` extra patterns (drift columns). `../HEAL-references/` Qasim's HEAL-specific references, if present.

## Commands

```bash
npm run dev
npx tsc --noEmit
npx next build      # route count must match HANDOFF.md
npx vitest run
```

If `next build` fails with repeated `Error while requesting resource`, that is `next/font` reaching Google. Retry, it's not your change.
