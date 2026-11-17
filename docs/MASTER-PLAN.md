# HEAL: Master Plan (the why)

> Single source of truth for intent and locked decisions. The how is `BUILD-PLAYBOOK.md`; current state is `HANDOFF.md` (wins if docs disagree).
> **Last updated:** 2026-11-18

## 1. Context

- **Company:** Heal Med LLC, brand **HEAL**. 8315 Grandstaff Dr, Sacramento, CA 95818 · (347) 837-9746 · info@healmedllc.com.
- **Founder:** Ahmed Kharodia, biomedical engineer. Small team, engineer-led.
- **What they do:** plan hospital equipment (consultation, capital planning, asset management with a CMMS partner), buy retired equipment (asset disposition), service it (ventilators, ultrasound, histology, more coming), and sell tested equipment, cables, parts and batteries via eBay and DOTmed.
- **Brand line:** Providing a second life to your asset.
- **Audience:** hospital biomed and facilities managers, clinic owners, lab managers, procurement. They want a fair offer, a credible engineer, a quick way to send a list.
- **Goals of the site, in order:** 1) get equipment lists in (offer form), 2) get service requests in, 3) book planning consultations, 4) send buyers to the stores.
- **Current site:** healmedllc.com (WordPress). Being replaced entirely.

### Design source material

| Thing | Where |
| --- | --- |
| Design canvas, all 7 pages + mobile Home + image system board | https://claude.ai/artifact/339XCPMsFm4tVTRpG9AotH (page "final") |
| Design system with component previews | https://claude.ai/artifact/J34iz7wUP8VyfqXQ5a6pWM |
| Copy deck (same copy as CONTENT.md) | https://claude.ai/artifact/Ruk8c9Sm9qzt2zbAHVaAw9 |
| Tokens | `design/tokens.json`, `design/tokens.css` |
| Ahmed's sitemap sketch | `design/heal-sitemap-sketch.jpg` |
| Logo | `public/brand/heal-logo-violet.png` (needs an SVG, see OPEN-QUESTIONS) |

Qasim opens the canvas links himself; you can't. Everything you need from them is written into PAGES.md and this folder.

## 2. Locked decisions

Don't re-litigate these. If one blocks you, say so in HANDOFF.md and ask.

| # | Decision | Detail |
| --- | --- | --- |
| D1 | **Direction C, "Logo field"** | Bold and brand-led, but professional. Brand violet sections open and close every page; light content in between; one tint band and one dark band per page. |
| D2 | **Colour comes from the logo** | Logo violet `#6556B8` leads. Ramp violet-50 to 950 is the logo violet mixed toward logo white and toward ink. Coral is errors only. No other hues. |
| D3 | **Three section themes** | `light`, `dark`, `brand`, set per section via `<Section theme>`. Semantic variables only. |
| D4 | **Type** | Host Grotesk 400/500 (Google) for everything, Geist Mono 400 for eyebrows, specs, indexes. Suisse Int'l replaces Host Grotesk later if licensed (one-line swap in `layout.tsx`). No bold. |
| D5 | **Fluid multiplier scaling** | Elementis `--multiplier` system: design widths 375 and 1440, every type and spacing value `calc(N * var(--multiplier))`, body clamped to a readable range. |
| D6 | **Layout grammar** | Elementis / BRAHMA asymmetric grid `md:grid-cols-[1fr_1.9fr]`, no page container. |
| D7 | **Reveal engine** | Motion v12. `MaskText` for all text, `Reveal` for non-text, `RevealImage` for images. GSAP only if a pattern genuinely needs a timeline Motion can't do (none planned). |
| D8 | **Smooth scroll** | Lenis on its own RAF via `SmoothScrollProvider` (port from brahma-web). Pinned sections use CSS `sticky` + Motion `useScroll`, not ScrollTrigger pins. Native scroll on touch. |
| D9 | **Image system I1 to I8** | 3 signatures (I1 letters aperture, I2 shutter band, I6 sticky swap), 5 quiet patterns. One signature per page; Home gets I1 and I2. Phones get I3 and simple stacking. No new image effects without Qasim. |
| D10 | **Imagery is real** | Real photos of HEAL equipment and work. Product cut-outs on ice/lilac panels. Licensed stock only for people and places. Never AI-generated equipment. Placeholders until photos arrive. |
| D11 | **Naming** | "HEAL" in display type and copy. "Heal Med LLC" in legal places (copyright, terms, privacy, JSON-LD `legalName`, contact card, Home hero eyebrow). Never "HEAL Medical". |
| D12 | **Sitemap** | `/`, `/equipment-planning`, `/asset-disposition`, `/service`, `/about`, `/shop`, `/contact`, `/privacy`, `/terms`, plus 404. About has anchors `#story`, `#team`, `#careers`; Planning has `#consultation`, `#capital-planning`, `#asset-management`. No blog, no CMS in v1. |
| D13 | **Content in code** | All copy in typed `src/content/*.ts`. No CMS in v1 (a Supabase admin like brahma-web is a later option). |
| D14 | **Forms** | 4 forms (offer, service request, stock check, contact). react-hook-form + zod on the client, the same zod schema in a Server Action, Turnstile invisible check, email via Resend to info@healmedllc.com. Offer form uploads go direct to storage, not through the function (see PLAYBOOK §8). |
| D15 | **No invented facts** | `[confirm]` items are `null` and render nothing. No certifications, numbers or claims until Ahmed confirms. |
| D16 | **Verification** | Qasim does all visual testing. Claude Code verifies with `tsc`, `next build`, `vitest` and SSR greps only. |
| D17 | **Hosting** | Vercel (assumed, confirm). Domain healmedllc.com moves at launch with redirects from old WordPress URLs. |

## 3. What success looks like

- Feels like the canvas: brand-led, calm, precise. Motion is noticed once and then gets out of the way.
- Lighthouse mobile: Performance ≥ 90, Accessibility 100, Best Practices 100, SEO 100. LCP < 2.5s on 4G with the hero photo.
- WCAG 2.2 AA. Full keyboard use, visible focus, reduced-motion respected.
- Every form delivers an email Ahmed can reply to, with spam filtered.
- Ahmed can change copy by editing one file per page.

## 4. Out of scope for v1

E-commerce checkout (stores stay on eBay/DOTmed), customer portal (that's the separate Heal365 project), blog, CMS, multilingual, analytics beyond Vercel Analytics.
