# HEAL: Build Playbook (the how)

> Grammar, foundation, motion and image vocabulary, phases and checks. Intent and locked decisions: `MASTER-PLAN.md`. State: `HANDOFF.md`. Copy: `CONTENT.md`. Layouts: `PAGES.md`.
> **Last updated:** 2026-11-18

## 0. Fresh-session prompt

See `RESUME-PROMPT.md` (resume) and `../KICKOFF-PROMPT.md` (first run).

---

## 1. Reference codebases: paths and what to take

Repo: `C:\Users\qasim\Claude\Projects\BRAHMA Group Website Development\heal-web\`. References are siblings: `../<name>/`. **Read-only.** Open only the files named here.

| Path | Use it for |
| --- | --- |
| `../brahma-web/` | **Port first.** Same stack, already verified. Primitives in `src/components/ui/`, `src/hooks/useMaskImage.ts`, `providers/SmoothScrollProvider.tsx`, `sections/ThresholdReveal.tsx` (I2), `sections/SelectedWork.tsx` (I6), `layout/NavbarClient.tsx` (header behaviour), `Intro.tsx` (optional intro), `docs/BUILD-PLAYBOOK.md` §2 for the grammar it came from. **Never open `.env*`.** |
| `../Elementis-SOTD/` | Primary design reference. `app/globals.css` (multiplier), `sections/Introduction/Server.tsx` (text section), `components/Client/Innovation.tsx` + `ClipImageCard.tsx` (I6), `components/Server/MaskText.tsx`, `components/Client/ParallaxContainer.tsx`. |
| `../sequent-media-house-main/` | `src/app/home.jsx` (one sticky container, one master progress, layers taking over: I1 choreography), `components/ExpandingSection.jsx` (height shutter: I2), `RowAnimation.jsx` (multi-speed rows: I4 collage, I8). |
| `../otis-valen-next/` | Page transition: `app/template.tsx` + `components/chrome/TransitionOverlay.tsx`. |
| `../the-line-awwwards-SOTM/` | `components/AccordianItem.tsx` (FAQ), `HoverReveal.tsx`. |
| `../ochi.design-UI-Clone/` | `src/components/Featured.jsx` (image hover scale, I7 feel). |
| `../Axel-Vanhessche/` | Aperture concept only (letters as a window that grows). **Don't copy its `mask-size` scrub.** |
| `../awwwards-collection/` | `06-saas-modern/codrops-columns-rows/js/index.js` (I8 drift columns maths). `AI-REFERENCE.md` is its index. |
| `../HEAL-references/` | Qasim's HEAL-specific references. If it exists, list it at the start of Phase 0 and note anything relevant in HANDOFF. |

**Porting rule:** copy the brahma file, then rename colour classes to HEAL semantics (`text-ink`, `bg-canvas`, `text-brand`...), swap any brahma font classes for the `type-*` utilities (§3), and delete brahma-specific props. Keep the motion maths and the easing untouched.

---

## 2. The design grammar

### 2.1 Layout: the asymmetric grid

```tsx
<Section theme="light">                                   {/* px-margin-edge py-section-gap */}
  <div className="grid grid-cols-1 gap-gutter md:grid-cols-[1fr_1.9fr]">
    <Eyebrow>What we do</Eyebrow>
    <div>{/* content */}</div>
  </div>
</Section>
```

- **No page container.** No `max-w-*` wrapper on sections. Constrain text blocks only (`max-w-[34ch]` style, in `ch`).
- `[1fr_1.9fr]` default, `[1fr_1.375fr]` denser.
- **Card and media grids span the full section.** Put the section head on its own row above, don't nest a 3 or 4 column grid inside the 1.9fr column.
- If a child must be `sticky` on mobile, use `flex flex-col md:grid`.

### 2.2 Text reveal: line by line, hand-broken

```tsx
<MaskText className="type-display text-ink" lines={home.hero.h1} />
```

- Every headline and body paragraph is `MaskText` with a hand-set `lines` array from `src/content/`.
- Different breaks per breakpoint: `ResponsiveMaskText` with `desktop` and `mobile` arrays (desktop renders server-side).
- Text that swaps with scroll state: `SwapMaskText` (only in I6).
- Lines under ~45 characters. A vitest check enforces it (§9).
- `Reveal` is for non-text: buttons, chips, cards, list rows.

### 2.3 Colour and rhythm

- `Section` sets `data-theme`, `bg-canvas` and `text-ink` explicitly every time.
- Rhythm per page: **brand** hero → light content → one **tint** band (`bg-tint` inside a light section, or a light section with `tint` prop) → one **dark** band → **brand** footer. Never two dark or two brand sections in a row (the footer counts).
- Buttons: primary = `bg-brand text-on-brand`, outline = `border-current`. On brand sections the primary button is logo-white with violet text.
- Photos never sit on brand violet without the 21:9 band treatment or a panel; cut-outs always sit on `--photo-ice` or `--photo-lilac` panels.

### 2.4 Typography

Host Grotesk 400/500 + Geist Mono 400 via `next/font/google` (variables `--font-sans`, `--font-mono`). `line-height` ≤ 1 on display, 1.45 to 1.5 on body. No bold, no italics, no letter-spacing on body. Eyebrows: Geist Mono 12, uppercase, `0.08em`, colour `--muted`, optional 6px square in `--brand`.

### 2.5 Mobile

CSS-first (`md:` / `lg:`). Branch in JS only when behaviour differs (sticky signatures, hover-follow). Never return `null`. No sticky signatures below 1024px. Touch targets ≥ 44px. `100svh` for full-height blocks.

---

## 3. Foundation (Phase 0)

### 3.1 globals.css

Order: Tailwind import → `design/tokens.css` contents (copy into `src/app/tokens.css` and import) → multiplier block → `@theme inline` → `@utility type-*` → base.

**Multiplier:** copy brahma-web's `globals.css` multiplier block exactly (it's tuned), design widths 375 and 1440. Then define:

| Var | Desktop N (1440) | Mobile N (375) | Guard |
| --- | --- | --- | --- |
| `--t-mega` (footer HEAL, About band) | 380 | 120 | |
| `--t-display` (page h1) | 96 | 46 | |
| `--t-h1-home` | 76 | 40 | |
| `--t-row-title` (Home rows, Service rows) | 80 | 38 | |
| `--t-statement` | 56 | 30 | |
| `--t-marquee` | 120 | 56 | |
| `--t-h2` | 44 | 30 | |
| `--t-h3` | 30 | 22 | |
| `--t-lead` | 20 | 18 | `clamp(17px, …, 22px)` |
| `--t-body` | 16 | 16 | `clamp(15px, …, 18px)` |
| `--t-small` | 14 | 14 | `clamp(13px, …, 15px)` |
| `--t-eyebrow` | 12 | 12 | `clamp(11px, …, 13px)` |
| `--s-margin-edge` | 40 | 20 | |
| `--s-section-gap` | 140 | 88 | |
| `--s-gutter` | 24 | 16 | |

Each value is `calc(N * var(--multiplier))`. If Qasim reports a jump between 640 and 1023px, cap the mobile multiplier with `min(calc(100vw / 375), 1.4px)`; don't add breakpoints.

```css
@theme inline {
  --text-*: initial;
  --color-canvas: var(--canvas);  --color-surface: var(--surface);  --color-tint: var(--surface-tint);
  --color-night: var(--night);    --color-ink: var(--ink);          --color-body: var(--body);
  --color-muted: var(--muted);    --color-hairline: var(--hairline); --color-brand: var(--brand);
  --color-brand-hover: var(--brand-hover); --color-on-brand: var(--on-brand); --color-pulse: var(--pulse);
  --color-focus: var(--focus);    --color-danger: var(--danger);
  --color-photo-ice: var(--photo-ice); --color-photo-lilac: var(--photo-lilac);
  --spacing-margin-edge: var(--s-margin-edge); --spacing-section-gap: var(--s-section-gap); --spacing-gutter: var(--s-gutter);
  --font-sans: var(--font-sans); --font-mono: var(--font-mono);
  --ease-heal: cubic-bezier(0.24, 0.43, 0.15, 0.97);
}
```

Type utilities (one per style, full spec in one class):

| Utility | Size var | Leading | Tracking | Weight |
| --- | --- | --- | --- | --- |
| `type-mega` | `--t-mega` | 0.8 | -0.06em | 500 |
| `type-display` | `--t-display` | 0.95 | -0.045em | 500 |
| `type-h1-home` | `--t-h1-home` | 0.98 | -0.045em | 500 |
| `type-row` | `--t-row-title` | 1 | -0.045em | 500 |
| `type-statement` | `--t-statement` | 1.06 | -0.03em | 400 |
| `type-marquee` | `--t-marquee` | 1 | -0.04em | 500 |
| `type-h2` | `--t-h2` | 1.08 | -0.02em | 400 |
| `type-h3` | `--t-h3` | 1.15 | -0.015em | 400 |
| `type-lead` | `--t-lead` | 1.4 | -0.01em | 400 |
| `type-body` | `--t-body` | 1.5 | 0 | 400 |
| `type-small` | `--t-small` | 1.45 | 0 | 400 |
| `type-eyebrow` | `--t-eyebrow` | 1.3 | 0.08em | 400, mono, uppercase |

If `design/tokens.json` disagrees with this table on sizes, this table wins.

Radius: 6 inputs, 12 to 16 images in cards, 20 to 24 cards and panels, pill buttons. Shadows: only the hover-follow card and the scrolled header (`--shadow-float`).

### 3.2 Base components (Phase 0)

| Component | Notes |
| --- | --- |
| `layout/Section` | `theme`, `id`, `tint?`, `flush?` (no padding), `as?`. Renders `<section data-theme={theme} className="bg-canvas text-ink px-margin-edge py-section-gap">`. |
| `ui/Eyebrow` | mono label, optional square mark, `tone` from section theme via CSS vars (no prop needed). |
| `ui/Button` | `variant: primary | outline | ghost`, `href` or `onClick`, arrow icon. 48px tall, 52px full-width on phones. `BorderedButton` (port) for the one emphasised button per section if Qasim wants it. |
| `ui/StyledLink` | port. |
| `ui/MaskText`, `ResponsiveMaskText`, `SwapMaskText`, `Reveal`, `RevealImage`, `ParallaxContainer`, `ResponsiveImage`, `ClipImageContainer`, `HoverReveal`, `Marquee`, `ResponsiveMarquee`, `Accordion` | port from brahma-web unchanged except classes. |
| `hooks/useMaskImage` | port. |
| `hooks/useIsDesktop` | `matchMedia('(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)')`, returns `false` on the server and first render. |
| `providers/SmoothScrollProvider` | port. Lenis off for reduced motion and touch. Expose `lenis` via context for `scrollTo`. |
| `ui/Photo` | `id` from `content/photos.ts`, `ratio`, `backdrop`, `sizes`, `priority?`. Real file → `next/image`; missing → placeholder frame (violet-100 bg, camera icon, mono id + subject) at the same ratio. |

### 3.3 Content files

```
src/content/site.ts        nav, header CTA, footer, contact details, stores, legal name, social (nullable)
src/content/home.ts        one object per section, headlines as { desktop: string[], mobile?: string[] }
src/content/planning.ts  disposition.ts  service.ts  about.ts  shop.ts  contact.ts  legal.ts
src/content/forms.ts       field labels, options, states, error copy (shared)
src/content/photos.ts      id → { src | null, alt, subject, width, height, backdrop }
src/content/seo.ts         per-route title + description
src/content/types.ts       Lines, Cta, Photo, Nullable helpers
```

`[confirm]` copy → `null`. Components render nothing for `null` (no empty wrappers, no fallback text).

---

## 4. Motion vocabulary (text and UI)

**One easing: `[0.24, 0.43, 0.15, 0.97]`.** Reveals 0.6 to 0.8s, stagger 0.05 to 0.1s, trigger once at ~15% in view. Hovers 0.3 to 0.6s. Everything respects `prefers-reduced-motion` (render the end state).

| ID | Effect | Component | Where |
| --- | --- | --- | --- |
| T1 | Line reveal | `MaskText` / `ResponsiveMaskText` | every headline and paragraph |
| T2 | Fade + travel 24px | `Reveal` (stagger children) | buttons, chips, cards, list rows |
| T3 | Scroll fill: words go from 18% to 100% opacity as the paragraph scrolls through | new `ui/ScrollFillText` (Motion `useScroll` on the element, `offset: ['start 0.8','end 0.45']`, one `useTransform` per word) | Home statement only |
| T4 | Pulse line: flat line with one heartbeat spike draws left to right with scroll (`pathLength`), a 6px dot rides the tip; each step numeral turns `--brand` as the tip passes it. **Not pinned.** Mobile: vertical line down the left. | new `ui/PulseLine` + `ui/Steps` | Home lifecycle, Disposition how it works |
| T5 | Marquee, speed nudged by scroll velocity | port `Marquee` / `ResponsiveMarquee` | Home |
| T6 | Header theme switch | `hooks/useHeaderTheme`: IntersectionObserver on `section[data-theme]` with `rootMargin` set to a 1px line at the header's centre; header sets its own `data-theme`. Colour transition 0.3s. Solid bg + `--shadow-float` after 80px. | all |
| T7 | Accordion (height, plus rotates to minus) | port `Accordion` | Disposition FAQ |
| T8 | Wordmark rise: HEAL letters `y: 100% → 0`, stagger 0.06, when 40% in view | new `ui/Wordmark` | Footer, About "The name" |
| T9 | Page transition: brand-violet panel up with a small HEAL mark, page swaps, panel off the top. 0.5s each way. Skip on first load and reduced motion. | port otis-valen `template.tsx` + `TransitionOverlay` | all |
| T10 | Hover: tile frame scale 0.98 + image 1.04; card lift 6px + arrow nudge (4px, -4px); service card scan line (soft white band sweeps the panel once, 1.2s) | CSS + Motion `whileHover` | tiles, store cards, service cards |
| T11 | Link and button hovers | port `StyledLink`, `HoverReveal`, `BorderedButton` | all |
| T12 | Intro (optional, Phase 8) | port brahma `Intro.tsx` + its intro gate; violet screen, HEAL letters rise, 1.1s, once per session | Home |

Pinned scroll exists only inside the image signatures (I1, I2, I6). Nothing else pins.

---

## 5. Image system I1 to I8

The point: images are part of the composition and the motion, not boxes beside text. **Rule: one signature per page (Home gets I1 and I2, at least three sections apart). Every other image uses I3 + I4 or a quiet pattern. Phones get I3 and simple stacking.**

| ID | Pattern | Kind | Where | Build from |
| --- | --- | --- | --- | --- |
| I1 | Letters aperture | Signature | Home hero | sequent `home.jsx` structure + brahma sticky/`useScroll`; Axel for the idea |
| I2 | Shutter band | Signature | Home "Who we are" | brahma `sections/ThresholdReveal.tsx`, sequent `ExpandingSection.jsx` |
| I3 | Clip-wipe reveal | Default | every image | brahma `ui/RevealImage.tsx` |
| I4 | Frame parallax (multi-speed in collages) | Default | large images, About collage, page hero bands | brahma `ui/ParallaxContainer.tsx` / `ResponsiveImage.tsx`, sequent `RowAnimation.jsx` |
| I5 | Breakout cut-outs | Quiet | equipment tiles (Home, Disposition, Service, Shop) | new `ui/BreakoutTile.tsx` |
| I6 | Sticky swap | Signature | Equipment Planning services | brahma `sections/SelectedWork.tsx`, Elementis `Innovation.tsx`, `SwapMaskText`, `useMaskImage` |
| I7 | Hover-follow photo | Quiet | Home "What we do" rows | new `ui/HoverFollowImage.tsx`, ochi `Featured.jsx` for feel |
| I8 | Drift columns | Quiet | Home "We buy" | codrops-columns-rows maths, sequent `RowAnimation.jsx` |

### I1 · Letters aperture (Home hero)

**What it does:** the hero is brand violet with the word HEAL cut out of it, the photo visible through the letters. Scrolling zooms into one letter until the photo fills the screen, then the page carries on.

**Build (desktop, `useIsDesktop` true):**
- Outer `<section data-theme="brand">` `h-[240vh]`, inner `sticky top-0 h-svh overflow-hidden`.
- Layer 0: `<Photo id="01" priority fill />`, `scale 1.15 → 1` over progress 0 to 0.85.
- Layer 1: full-viewport `<svg>` overlay: a `<mask>` (white rect, black HEAL letter paths) applied to a rect filled `var(--canvas)`. **The mask is static. Only the overlay wrapper's `transform: scale()` animates.** Never animate `mask-size`, never scrub `clip-path` here.
- `transform-origin` = centre of the target stroke (default: the vertical stroke of the L, prop `zoomInto: 'H' | 'E' | 'A' | 'L'`), computed in px from the path bbox after layout and on resize.
- End scale = enough that the target stroke covers the viewport (`max(vw / strokeWidth, vh / strokeHeight) * 1.1`), computed, not hardcoded.
- Layer 2 (text over violet): eyebrow row (Heal Med LLC · Sacramento, CA / Planning · Disposition · Service), h1, lead, 2 buttons.
- Progress map: 0 to 0.15 text layer `opacity 1 → 0`, `y 0 → -40`. 0.05 to 0.85 overlay scale. 0.85 to 1 overlay `opacity → 0`, caption "Every device, inspected by an engineer." fades in bottom left; header theme becomes `dark` (light text on photo).
- Don't put `will-change: transform` on the overlay: the browser re-rasterises the flat one-colour vector each frame, which is cheap and keeps edges crisp. If Qasim reports jank, add it and accept softer edges mid-zoom.

**Letters:** `scripts/build-heal-letters.mjs` uses `opentype.js` to read Host Grotesk Medium (download the TTF from the google/fonts repo into `scripts/fonts/`, not `public/`), sets "HEAL" at tracking -0.05em and writes `src/components/sections/home/heal-letters.ts` (`viewBox`, one path per letter, per-letter bbox). Run once, commit the output.

**Mobile / tablet / reduced motion:** same DOM, no sticky, no scroll hooks: eyebrow, letters box (aspect from the viewBox) with the photo inside, h1, lead, stacked buttons. Tablet: photo inside the letters gets I4 amount 8. Server render = this static composition, so text is always in the HTML.

### I2 · Shutter band (Home "Who we are")

**What it does:** dark section. "Run by a / biomedical engineer." sits as two big lines; scrolling splits them apart and a full-width photo of Ahmed at the bench opens by height between them, then the body copy and list reveal over the photo.

**Build (desktop):** port `ThresholdReveal` structure. Section `h-[300vh]` dark, sticky stage `h-svh`.
- 0 to 0.3: top line `y → -38vh`, bottom line `y → +38vh`.
- 0.1 to 0.6: centre window `height 0 → 100svh` (`overflow-hidden`, `contain: layout paint`), photo inside `scale 1.2 → 1`.
- 0.6: threshold flips state (`useMotionValueEvent`) → MaskText body + list + button reveal bottom left over a `--night` gradient.
- Header theme `dark` throughout.

**Mobile:** h2 (MaskText), 4:5 photo with I3, body, list, button. No sticky.

### I3 · Clip-wipe reveal (default for every image)

Port `RevealImage`: `clip-path: inset(100% 0 0 0) → inset(0)` with inner image `scale 1.15 → 1`, 0.8s, once. This is an entrance, not a scrub, so clip-path is fine here.

### I4 · Frame parallax

Port `ParallaxContainer` / `ResponsiveImage`: image moves inside its `overflow-hidden` frame. `amount 8` in sections, `20` for full-bleed bands (page hero 21:9). Desktop only. **Collage (About story):** three photos at different speeds (0.9×, 1.1×, 1.25×) using one `useScroll` on the collage and three `useTransform`s.

### I5 · Breakout cut-outs

New `ui/BreakoutTile`: a rounded panel (`--photo-ice` or `--photo-lilac`, radius 20) with `overflow: visible`; a transparent PNG device anchored bottom-centre at `height: 118%` (prop) so its top rises out of the panel. Label row under the panel (title + arrow), whole tile is a link.
- Entry: panel I3, device `Reveal` (y 24 → 0) 0.1s later.
- Hover (pointer: fine): device `y -8px`, panel `scale 0.98`, arrow nudge. Service cards add the T10 scan line.
- Mobile: device 108%, no hover. Shop and Home shop tiles scroll sideways with snap on phones.
- Missing PNG → `Photo` placeholder inside the panel (no breakout).

### I6 · Sticky swap (Equipment Planning)

**What it does:** one sticky stage for the three planning services. Left: pills (Consultation · Capital planning · Asset management), eyebrow, h2, lead, bullets. Right: a 4:5 photo frame. Scrolling swaps service: text masks out and in (direction follows scroll), the photo changes with the 28-bar stripe mask.

**Build (desktop):** port `SelectedWork` / Innovation. Section `h-[300vh]`, sticky `h-svh`, grid `[1fr_1.375fr]`.
- `active = clamp(floor(progress * 3), 0, 2)`.
- Text: `SwapMaskText` per line; bullets swap with `Reveal`.
- Image: stack of 3 `Photo`s, `useMaskImage` for the 28-bar transition between them.
- Asset management also shows the CMMS partner card (dark, small) under its bullets.
- Pills: active pill filled `bg-ink text-canvas`; click → `lenis.scrollTo(sectionTop + i * vh + 1)`.
- Anchors `#consultation`, `#capital-planning`, `#asset-management`: zero-height divs at 0, 100vh, 200vh inside the section.

**Mobile:** three stacked blocks (eyebrow, MaskText h2, lead, bullets, 4:5 photo with I3). Same anchor ids on the blocks.

### I7 · Hover-follow photo (Home "What we do")

New `ui/HoverFollowImage`: a 300×375 (4:5) card, radius 16, `--shadow-float`, follows the pointer over the row list with lerp 0.12 on rAF (no spring overshoot), slight rotation from horizontal velocity (clamped ±4°). On list enter: scale 0.9 → 1 + I3-style clip in. Row change: crossfade 0.3s. List leave: scale out. Row title → `--brand`, arrow nudges. Only when `pointer: fine`. Touch: tapping a row expands it and shows its photo inline (4:3), tap again or the arrow navigates.

### I8 · Drift columns (Home "We buy")

Three columns of I5 tiles; one `useScroll` on the grid (`offset: ['start end','end start']`), column `y` transforms `[0, -60]`, `[120, -140]`, `[40, -40]` px at 1440 (scale by `--multiplier`). Middle column starts offset down. Phones: two columns, drift ÷ 4, or none under reduced motion.

### Page hero band (all inner pages)

Brand section: breadcrumb (mono, `Home / 01 · Equipment Planning`), giant h1 (`type-display`, MaskText), row with lead (left, `max-w-[40ch]`) and buttons (right), then a **21:9 photo band** (4:3 on phones) with I3 + I4 amount 20. The band straddles the boundary: the hero section paints its own bottom strip (an absolute block, height = half the band) in the next section's canvas colour, so no negative margins touch sibling sections. Next section uses normal padding.

---

## 6. Shared chrome

| Part | Spec |
| --- | --- |
| Header | 76px (64 mobile), fixed. Logo left (SVG once available, PNG until then), 6 links centre, "Sell equipment" button right. T6 theme switch. Active link underline 1px. Under 1024px: logo + 44px round menu button. Port behaviour (scroll state, hide/show) from brahma `NavbarClient.tsx`. |
| MobileMenu | Brand full screen. Links `type-h2`-ish at 40px with mono index 01 to 06, T2 stagger. Bottom: phone, email, "Sell equipment". Focus trap, Esc closes, body scroll locked (Lenis stop). |
| Footer | Brand. CTA row (h2 + 2 buttons) over a hairline; brand line + address + 3 link columns; legal row "© {year} Heal Med LLC · Privacy · Terms · socials"; giant HEAL `type-mega` cropped by the bottom edge with T8. |
| 404 | Brand: "This page has moved on." + Home, Contact buttons. |
| Page transition | T9. |

---

## 7. Responsive

| Name | Min width | Notes |
| --- | --- | --- |
| base | 0 | design at 375 |
| `md` | 768 | grid goes two-column, desktop multiplier starts |
| `lg` | 1024 | signatures (I1, I2, I6), I7, full drift turn on (with `pointer: fine`, no reduced motion) |
| `xl`/`2xl` | 1280+ | nothing new; multiplier scales |

| Component | < 768 | 768 to 1023 | ≥ 1024 |
| --- | --- | --- | --- |
| Home hero | static letters + photo, stacked full-width buttons | + I4 inside letters | I1 |
| Page hero band | 4:3 photo | 21:9 | 21:9 + I4 |
| What we do rows | inline photo on tap | same | I7 |
| We buy | 2 columns, small drift | 3 columns, small drift | I8 full |
| Steps | vertical pulse line | 2×2, horizontal line | horizontal line, 4 across |
| Who we are | stacked, I3 | stacked, I3 | I2 |
| Planning services | 3 stacked blocks | same | I6 |
| Tiles | horizontal snap scroll (shop) or 1 to 2 columns | 2 to 3 columns | 3 to 4 columns |
| Forms | single column | 2-column fields | form card beside text |
| Footer | stacked, wordmark at mobile size | 2×2 columns | 4 columns |

Rules: inputs 16px text minimum (iOS zoom), no hover-only content, landscape phones (844×390) must show the h1 above the fold, `sizes` on every image. Qasim tests 375, 390, 768, 1024, 1280, 1440, 1920 himself.

---

## 8. Forms and integrations

- Four forms: Offer (Disposition `#offer`), Service request (Service `#request`), Stock check (Shop), Contact. Fields and copy in CONTENT.md and `content/forms.ts`.
- One zod schema per form in `lib/forms/schemas.ts`, used by react-hook-form (`zodResolver`) and by the Server Action.
- Server Actions in `lib/forms/actions.ts`: validate → verify Turnstile token server-side (`https://challenges.cloudflare.com/turnstile/v0/siteverify`) → send with Resend (`to: CONTACT_TO_EMAIL`, `replyTo: user email`, subject `[HEAL website] Offer request · {organization}`) → return `{ ok: true }` or a typed error. Plain-text + simple HTML email listing every field.
- **Uploads (Offer form, up to 20 MB, xlsx/csv/jpg/png/pdf):** Vercel functions reject bodies over 4.5 MB, so files never go through the Server Action. Use Vercel Blob client uploads (`@vercel/blob/client` `upload()` + a `/api/upload` route with `handleUpload`, content-type and size checked there, random suffix on). The action receives only the blob URLs and puts them in the email. If hosting isn't Vercel, swap for Supabase Storage signed uploads; same shape.
- Dev without keys: if `RESEND_API_KEY` is missing, log the payload server-side and return success so Qasim can test the UI. Turnstile test keys work in dev.
- `.env.example`: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `BLOB_READ_WRITE_TOKEN`, `NEXT_PUBLIC_SITE_URL`.
- States: field errors under the field (`aria-describedby`), submit shows "Sending…", success swaps the form for a thank-you panel (0.2s fade), error keeps the input and shows the error copy. Contact intent chips set the email subject.

---

## 9. SEO, accessibility, performance, tests

- **Metadata:** `lib/seo.ts` builds `Metadata` from `content/seo.ts`; `metadataBase` from `NEXT_PUBLIC_SITE_URL`; title template `%s | Heal Med LLC`, Home title "HEAL · Providing a second life to your asset". OG image via `app/opengraph-image.tsx` (violet, HEAL, brand line).
- **JSON-LD** in the root layout: `LocalBusiness` with `name: "HEAL"`, `legalName: "Heal Med LLC"`, address, telephone, email, url, logo, `sameAs` only for confirmed URLs. `FAQPage` on Disposition with confirmed answers only.
- `app/sitemap.ts`, `app/robots.ts`. Old WordPress URL redirects in `next.config` once Qasim supplies the list.
- **Accessibility:** one h1 per page, landmarks, skip link, visible focus (`--focus` 2px ring, 2px offset), `aria-expanded` on menu and accordion, forms labelled, contrast already AA in tokens. Reduced motion: every T and I pattern renders its end state.
- **Performance:** hero photo `priority` + `fetchPriority="high"`, all other images lazy with `sizes`; fonts via `next/font` with `display: swap`; motion components are client islands inside server sections; no WebGL, no video in v1.
- **vitest:** zod schemas (valid/invalid), content checks over `src/content/**` (no "—", no "!", no "HEAL Medical", every `lines` entry ≤ 45 chars, every photo id referenced exists in `photos.ts`), `lib/seo.ts` output.

---

## 10. Phases

Commit at the end of each phase (`feat(p2): home hero I1, statement, what we do`), update HANDOFF.md, stop and report. Each phase must pass §11 before it's done.

| Phase | Scope | Acceptance (all must pass) |
| --- | --- | --- |
| **P0 Setup** | `create-next-app` (TS, App Router, Tailwind, src dir, Turbopack) in `heal-web/`; deps (`motion lenis gsap @gsap/react react-hook-form zod @hookform/resolvers resend @vercel/blob vitest`); fonts; globals (§3.1); tokens; Section, Eyebrow, Button, Photo; all ports in §3.2; SmoothScrollProvider; `src/content/*` with full copy from CONTENT.md and line breaks; `photos.ts` with every id from PHOTO-PIPELINE (src null); stub pages for all routes (hero h1 only); copy logo to `public/brand/`; `.env.example`; vitest config + content tests. | `tsc` clean · build lists every route in D12 + 404 + sitemap + robots · `grep "Plan the whole life" .next/server/app/equipment-planning.html` · vitest green · record route count in HANDOFF |
| **P1 Chrome** | Header + T6, MobileMenu, Footer + T8, page transition T9, 404, `PageHero` with 21:9 band, apply PageHero to all inner pages. | build · header and footer text in every route's HTML · no `max-w-` on any `<section>` (`grep -rn "max-w" src/components/layout`) |
| **P2 Home A** | `heal-letters.ts` script + output; I1 hero (desktop + static); statement T3; What we do + I7. | build · h1 + lead in `index.html` · I1 has static fallback path (read the code) · no `mask-size` anywhere (`grep -rn "mask-size\|maskSize" src` returns only `useMaskImage`) |
| **P3 Home B** | We buy I8 + I5; Lifecycle T4; Who we are I2; Marquee T5; Shop tiles I5; Home mobile per §7. | build · all Home section headings in `index.html` · reduced-motion branch present in each new client component |
| **P4 Planning + Service** | Planning: hero, I6 services, How it works (dark, 3 cards). Service: hero, What we service (I5 cards + T10 scan line + "More coming soon" banner), How we help (dark rows), Service request form UI (action stubbed). | build · anchors `id="consultation"` etc. in HTML · one signature per page (read the page files) |
| **P5 Disposition + forms** | Hero, What we buy (I5 grid), How it works (T4), Why sell (dark), Offer form + uploads, FAQ (T7). Forms infra §8 for all four schemas and actions; wire Service request. | build · vitest schema tests · action returns success with no `RESEND_API_KEY` (unit-test it) |
| **P6 About, Shop, Contact** | About: hero, story + I4 collage, The name (brand, T8), values, team (null-safe), careers (dark). Shop: hero, categories (I5), store cards (T10 lift, new tab, `rel="noopener"`), stock check form. Contact: mega h1 hero, form with intent chips + details card + map tile. Wire remaining actions. | build · team section renders nothing extra when bios are null · store links read from `site.ts` and render nothing while null |
| **P7 SEO + legal** | Metadata all routes, OG image, JSON-LD, sitemap, robots, `/privacy` + `/terms` (structure + placeholder text marked for Ahmed's review), redirects scaffold. | build · `<title>` and `application/ld+json` in each route's HTML · `legalName":"Heal Med LLC"` present |
| **P8 Polish** | Optional intro T12 (behind `site.intro.enabled`), reduced-motion audit, focus states, image `sizes` audit, delete orphans, bundle check (`next build` output sizes noted in HANDOFF). | build · vitest · `grep -rn "console.log" src` only in the dev email fallback |
| **P9 Launch prep** | Checklist in HANDOFF for Qasim: env vars, Resend domain, Turnstile keys, Blob store, Vercel project, domain + redirects, Search Console. Code changes only if a check fails. | checklist written |

---

## 11. Verification (every phase)

```bash
npx tsc --noEmit
npx next build                       # route count must match HANDOFF
npx vitest run
grep -o "<text you added>" .next/server/app/<route>.html
```

Qasim does all visual and browser testing. Never use preview, screenshot or browser tools. If something can only be judged visually, say so in HANDOFF under "Needs Qasim's eyes".

---

## 12. Landmines

- Animating `mask-size` or scrubbing `clip-path` on large areas repaints every frame. Scale with `transform`, open with `height`.
- A global `opacity: 0` class without a guaranteed reveal hides content forever (happened on brahma: 29 invisible elements).
- Inherited colour across theme boundaries. Always `<Section theme>`.
- Returning `null` while detecting the viewport: crawlers and no-JS users see nothing.
- Page-level `max-w` containers. Constrain text, not sections.
- Nesting a card grid inside the 1.9fr column.
- Lenis + sticky: give sticky parents explicit heights, never `overflow: hidden` on an ancestor of a sticky element (use `overflow: clip` if you must).
- `100vh` on phones: use `svh`.
- Hover-only affordances on touch. Every hover reveal needs a tap or always-visible fallback.
- Publishing a `[confirm]` placeholder or an invented claim. `null` renders nothing.
- Writing "HEAL Medical" anywhere. The legal name is Heal Med LLC.
- `next/font` build errors are network, retry.
- Uploading files through a Server Action (4.5 MB limit). Use client uploads.
