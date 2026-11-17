# PAGES: section-by-section layout

> Matches the design canvas, page "final": https://claude.ai/artifact/339XCPMsFm4tVTRpG9AotH (Qasim opens it, you can't). The canvas's yellow motion notes were written before the BRAHMA conventions; **where a note differs from this file or BUILD-PLAYBOOK, these docs win** (no GSAP pins, no `mask-size`, lifecycle not pinned).
> Legend: **Theme** = `<Section theme>`. **Motion** = T/I ids from BUILD-PLAYBOOK §4 and §5. **Photo** = ids in PHOTO-PIPELINE.md. Copy is in CONTENT.md.
> **Last updated:** 2026-11-18

## Shared

Header, MobileMenu, Footer, 404 and page transition: BUILD-PLAYBOOK §6. Every inner page (not Contact, not legal) opens with the **page hero band**: brand section, breadcrumb, giant h1 (T1), lead + buttons row (T2), 21:9 photo band straddling into the next section (I3 + I4 amount 20). Spec in BUILD-PLAYBOOK §5 "Page hero band".

## Home `/`  · signatures: I1, I2

| # | Section | Theme | Layout (desktop) | Motion | Photo |
| --- | --- | --- | --- | --- | --- |
| 1 | Hero | brand | Eyebrow row (left "Heal Med LLC · Sacramento, CA", right "Planning · Disposition · Service"). HEAL letters full width (inside margins) with the photo through them. Under: h1 left, lead + 2 buttons right. | **I1**, T1, T2 | 01 |
| 2 | Statement | light | Eyebrow left column; statement paragraph right (1.9fr); 4 points in a row below with hairline tops | T3, T2 | none |
| 3 | What we do | light (surface) | Section head; 3 big rows: index · `type-row` title · chips · arrow; hairlines between | I7, T1 | 03 (and one per row: 14, 18, 28) |
| 4 | We buy | light | Section head with "Get an offer" button; 3 drift columns of breakout tiles (2 per column) | I8, I5 | 04–09 |
| 5 | Lifecycle | light + tint band | Section head; pulse line full width; 4 steps with big numerals | T4 | none |
| 6 | Who we are | dark | Shutter band: two-line h2 splits, photo opens by height, body + list + button over photo | **I2** | 10 |
| 7 | Marquee | light | One line, `type-marquee`, violet, middots violet-300 | T5 | none |
| 8 | Shop | light (surface) | Section head with eBay + DOTmed buttons; 3 breakout tiles (Cables, Parts, Batteries) | I5, T10 | 11–13 |
| 9 | Footer | brand | Shared | T8 | none |

Rhythm check: brand → light → light → light → tint → dark → light → light → brand. (Statement and What we do are separated by the surface colour change.)

## Equipment Planning `/equipment-planning` · signature: I6

| # | Section | Theme | Layout | Motion | Photo |
| --- | --- | --- | --- | --- | --- |
| 1 | Page hero | brand | Shared | T1, T2, I3, I4 | 14 |
| 2 | Services `#consultation` `#capital-planning` `#asset-management` | light | Sticky stage: pills + text left, 4:5 photo right; Asset management shows the dark CMMS partner card | **I6** | 15, 16, 17 |
| 3 | How it works | dark | Section head with button; 3 cards (`bg-surface`) with big numerals | T1, T2 | none |
| 4 | Footer | brand | Shared | T8 | none |

## Asset Disposition `/asset-disposition` · no signature

| # | Section | Theme | Layout | Motion | Photo |
| --- | --- | --- | --- | --- | --- |
| 1 | Page hero | brand | Shared; buttons → `#offer`, `#buy` | T1, T2, I3, I4 | 18 |
| 2 | What we buy `#buy` | light | Section head + side note; 8 breakout tiles, 4 per row | I5, T2 | 19–26 |
| 3 | How it works | light + tint band | Section head; pulse line; 4 steps | T4 | none |
| 4 | Why sell to HEAL | dark | Section head; 4 outlined cards | T2 | none |
| 5 | Offer form `#offer` | light (surface) | Left: eyebrow, h2, lead, 4:3 photo (I3). Right: form card | T1, T2, I3 | 27 |
| 6 | FAQ | light | Section head left (1fr), accordion right (1.9fr); first item open | T7 | none |
| 7 | Footer | brand | Shared | T8 | none |

## Service `/service` · no signature

| # | Section | Theme | Layout | Motion | Photo |
| --- | --- | --- | --- | --- | --- |
| 1 | Page hero | brand | Shared; buttons → `#request`, `#equipment` | T1, T2, I3, I4 | 28 |
| 2 | What we service `#equipment` | light | Section head; 3 cards: breakout device on panel, h3, copy, mono spec line; dashed "More coming soon" banner | I5, T10 scan line | 29–31 |
| 3 | How we help | dark | Section head; 4 rows: index · `type-row`-ish title (44px) · description | T1 per row | none |
| 4 | Service request `#request` | light (surface) | Left text, right form card | T1, T2 | none |
| 5 | Footer | brand | Shared | T8 | none |

## About `/about` · no signature

| # | Section | Theme | Layout | Motion | Photo |
| --- | --- | --- | --- | --- | --- |
| 1 | Page hero | brand | Shared; buttons → `/contact`, `#careers` | T1, T2, I3, I4 | 32 |
| 2 | Our story `#story` | light | Eyebrow left; right: 40px lead sentence + body; below, 3-photo collage spanning the section | T1, I4 collage, I3 | 39, 40, 41 |
| 3 | The name | brand | Eyebrow, giant HEAL (`type-mega`), sentence under it | T8 | none |
| 4 | What we value | light (surface) | Section head; 3 columns with top rule (first rule violet) | T2 | none |
| 5 | Team `#team` | light + tint band | Section head; person cards (4:5 portrait I3, name, mono role, bio). Null-safe: renders only confirmed people | T2, I3 | 33, 34 |
| 6 | Careers `#careers` | dark | h2 + body left, "Send your CV" button right | T1 | none |
| 7 | Footer | brand | Shared | T8 | none |

Brand → light → brand → light would put two brand sections close; that's intended here (The name is the page's one brand moment), but keep at least one light section between hero and The name.

## Shop `/shop` · no signature

| # | Section | Theme | Layout | Motion | Photo |
| --- | --- | --- | --- | --- | --- |
| 1 | Page hero | brand | Shared; buttons → stores (new tab) | T1, T2, I3, I4 | 35 |
| 2 | Categories | light | Section head; 3 breakout tiles (Cables, Parts, Batteries); phones: horizontal snap | I5, T10 | 36–38 |
| 3 | Stores | light (surface) | 2 big store cards side by side (violet eBay, ink DOTmed), min-height ~360px at 1440 | T10 lift | none |
| 4 | Stock check | light + tint band | h2 left, inline form right (make/model, email, button) | T1, T2 | none |
| 5 | Footer | brand | Shared | T8 | none |

## Contact `/contact` · no signature

| # | Section | Theme | Layout | Motion | Photo |
| --- | --- | --- | --- | --- | --- |
| 1 | Hero | brand | Breadcrumb, mega h1 "Let's talk." (`type-mega` scaled ~0.5), lead. No photo band | T1 | none |
| 2 | Form + details | light | Form card (1.9fr) with intent chips first; aside (1fr): dark details card headed "Heal Med LLC" + violet-tinted static map tile with a violet pin | T2 | map (static image, see PHOTO-PIPELINE) |
| 3 | Footer | brand | Shared | T8 | none |

## Legal `/privacy`, `/terms` and 404

Brand hero without photo band, then one light text section (`max-w-[68ch]` text column). 404: single brand section (CONTENT.md).

## States every page needs

Reserved image space (aspect ratio, no layout shift), form validation/success/error, reduced-motion end states, null-safe placeholders.
