# HANDOFF: current state

> Wins if any doc disagrees. Update at the end of every phase: what changed, what's next, what's blocked, what needs Qasim's eyes.
> **Last updated:** 2026-11-18 (by Claude, after the runtime check, stock photos and label redesign)

## State

**All phases built (P0 to P9).** Every page, section, signature, form and SEO piece in the plan is in. Qasim asked to run P2 to P9 straight through after checkpoint 1, so checkpoints 2 (after P3) and 3 (after P6) were not held: everything from P2 on still needs its first visual pass. What remains is visual tuning, real photos and Ahmed's `[confirm]` answers, then the launch checklist below.

| Phase | Status | Commit | Notes |
| --- | --- | --- | --- |
| P0 Setup | ✅ | `5701fed` | Next 16.4.6, React 19.3, Tailwind 4.3, motion 12.43, vitest 5 |
| P1 Chrome | ✅ | `1fab3b6` | Header T6, MobileMenu, Footer T8, transition T9, 404, PageHero |
| P2 Home A | ✅ | `ab00eb3` | HEAL letters script, I1 hero (static + desktop zoom), T3 statement, I7 rows; real logo marks |
| P3 Home B | ✅ | `5679cc6` | BreakoutTile (I5), DriftColumns (I8), PulseSteps (T4), I2 shutter, marquee (T5), shop tiles |
| P4 Planning + Service | ✅ | `93231bc` | I6 sticky swap + stacked fallback, How it works, What we service (I5 + T10 scan), How we help |
| P5 Disposition + forms | ✅ | `32fb9b8` | Disposition page; 4 zod schemas, Server Actions, Turnstile, Resend + dev fallback, Blob uploads, HealForm; FAQ answers |
| P6 About, Shop, Contact | ✅ | `bbd15fe` | I4 collage, The name (T8), null-safe team, store cards (hidden until URLs), stock check, contact form + details + map |
| P7 SEO + legal | ✅ | `b8ecf45` | Metadata + OG/Twitter per route, share image, icons, LocalBusiness + FAQPage JSON-LD, sitemap, robots, legal holding pages, redirects scaffold |
| P8 Polish | ✅ | `5863cf7` | React 19 lint fixes, optional intro (off), orphans + GSAP removed, reduced-motion audit, bundle noted |
| P9 Launch prep | ✅ | see `git log --grep "p9"` | Checklist below; no check failed, so no code changes |

**Route count: 16** (the build table). `/`, `/equipment-planning`, `/asset-disposition`, `/service`, `/about`, `/shop`, `/contact`, `/privacy`, `/terms`, `/_not-found`, `/robots.txt`, `/sitemap.xml`, `/opengraph-image`, `/icon.png`, `/apple-icon.png` (all static `○`) and `/api/upload` (dynamic `ƒ`): the 14 the plan expected plus the two app icons. ("Generating static pages 17/17" in the log counts Next's internal error page too.)

**Verification at P9:** `npx tsc --noEmit` clean · `npx eslint src` clean · `npx next build` green, 16 routes · `npx vitest run` 31 tests green (content rules, photo ids, pending values, schemas, submit pipeline, Turnstile, email, SEO, JSON-LD) · SSR greps: every page's headings, forms and anchors are in its `.html`; `<title>`, `application/ld+json` and `legalName":"Heal Med LLC"` on every route; `og:image` on every route.

**Repo:** `main` → https://github.com/Qasim21569/healmedllc. P0 and P1 are pushed; P2 to P9 are local until Qasim says push.

## Runtime check (2026-11-18, after P9)

Qasim can't run the site, so Claude ran the production build (`next start`) and checked it over HTTP and in the built-in browser.

- **HTTP:** all 9 pages 200, unknown URL 404, sitemap, robots, share image, icons, logos, image optimizer OK. `/api/upload` answers 503 "Uploads are not configured" without a Blob token, as designed.
- **Forms:** empty submit shows every field error with the CONTENT.md copy.
- **Bugs found and fixed:**
  1. **Every `fill` photo collapsed to ~0px** (`Photo` had both `relative` and `absolute`; `relative` won). This blanked the I1 hero photo, hero bands, collage and I6 frame.
  2. **motion 12 hands array-form `useTransform` opacity to a native ViewTimeline and drops the input range**, so the I1 text faded over the whole section instead of the first 15%. All scroll-linked transforms now use function form with `mapRange()` (`src/lib/motion.ts`).
  3. **Header theme went stale on desktop:** I1, I2 and I6 swap their static markup after hydration, and the header was still watching the old elements (so it never turned light-on-photo at the end of I1 or over I2). `useHeaderTheme` now re-attaches when the set of sections changes.
  4. **T4 pulse line:** dot and drawn line disagreed (`vector-effect: non-scaling-stroke` makes the browser measure pathLength dashes in screen pixels). Removed.
  5. **JSON-LD escaping** was a no-op (caught by a test in P7, fixed then).
  6. Share image letters overlapped (satori applies tight tracking harder); loosened to -0.02em.
  7. **`npm run dev` returned 500 on every page:** the T10 scan-line CSS used an unescaped `.group/tile` selector. `next build` tolerated it, the dev CSS parser does not. Now a plain `.scan-tile` class.
  8. **Hydration mismatch in the I8 drift columns** (dev console): the first client render used the real window width, the server assumed 1440. Drift now starts at 0 until hydrated.
- **Dev server check:** all routes 200 on `npm run dev`, no console errors on any page after these fixes.
  9. **Photos zoomed in after their wipe-in** (Qasim spotted it on About and the I7 card): `RevealImage` boxes weren't positioned, so a fill image sized to the scale transform while it ran and then to the next positioned ancestor once it ended. Both boxes are now `relative` (unless the caller positions the frame). The I7 card was also blurry because rows 2 and 3 used 21:9 photos in a 4:5 card; they now use 4:5 photos 17 and 39.
- **2026-11-18 · "Who we are" simplified (Qasim):** the I2 shutter band and its photo were removed; it is now a plain dark section (label, display h2, body, list, button). Home has one signature (I1) until the hero is redesigned. Photo 10 file deleted, slot kept as `null`.
- **Polish from the check:** I2 lines fade out (0.55 to 0.65) so the copy reads over the open photo; the footer HEAL sits as one word instead of being spread across the width; the I1 photo layer has a dark ground so the letters read before the photo loads.
- **Verified after fixes:** I1 progress map (text gone by 15%, exponential zoom, caption at 0.85+, header dark at the end), header theme over every Home section, I6 pill/text/photo swaps, Disposition offer form validation, no console errors.

## Where things are

- **Pages:** `src/app/(site)/*/page.tsx`. Each page file lists its sections and theme rhythm in a comment.
- **Copy:** `src/content/*.ts` (typed; `null` = waiting on Ahmed). One file per page, plus `site.ts` (nav, contact, footer, stores, socials), `forms.ts`, `photos.ts`, `seo.ts`, `legal.ts`.
- **Sections:** `src/components/sections/` (PageHero, SectionHead, StepCards, FormSection, LegalBody; `home/`, `planning/`, `service/`).
- **Primitives:** `src/components/ui/`: MaskText, SwapMaskText, Reveal, RevealImage, ParallaxContainer, ResponsiveImage, Marquee, ResponsiveMarquee, Accordion, Button, SmartLink, Eyebrow, Photo, Icon, Wordmark, ScrollFillText (T3), HoverFollowImage (I7), BreakoutTile (I5), DriftColumns (I8), PulseSteps (T4), Collage (I4).
- **Chrome:** `src/components/layout/` (SiteChrome, Header, MobileMenu, Footer, Section, Intro), `src/components/providers/` (SmoothScrollProvider, TransitionProvider), `src/app/(site)/template.tsx`, `src/app/not-found.tsx`.
- **Forms:** `src/lib/forms/` (schemas, config, submit, actions, email), `src/components/forms/` (HealForm, FileField, useTurnstile), `src/app/api/upload/route.ts`.
- **SEO:** `src/lib/seo.ts`, `src/lib/jsonld.ts`, `src/app/opengraph-image.tsx`, `sitemap.ts`, `robots.ts`, `icon.png`, `apple-icon.png`; `redirects.ts` at the repo root.
- **Scripts:** `npm run build:letters` (HEAL paths for I1, needs `scripts/fonts/HostGrotesk-Medium.ttf`, gitignored) and `npm run build:logo` (logo marks + icons from `public/brand/heal-logo-violet.png`). `assets/HostGrotesk-Medium.ttf` is committed for the share image.

## Decisions made during the build

**Setup and stack**

- **2026-11-18 · `../HEAL-references/` does not exist.** Nothing to note.
- **2026-11-18 · Cache Components off.** The scaffold enabled `cacheComponents` + `partialPrefetching`. With it on, Next keeps up to 3 previous routes mounted but hidden (React Activity), which leaves duplicate anchor ids (`#offer`, `#request`) and stale form state in the DOM and fights the T9 transition. The site is fully static either way.
- **2026-11-18 · Tailwind via `@tailwindcss/postcss`** (CLAUDE.md stack); the scaffold used a turbopack loader.
- **2026-11-18 · motion pinned to `^12`** (npm resolved v14). `@types/node` 24 for the vitest 5 peer range. GSAP and `@gsap/react` removed in P8: nothing needed a timeline (D7).
- **2026-11-18 · `turbopack.root` pinned:** a stray `package-lock.json` in `C:\Users\qasim` confused workspace detection.
- **2026-11-18 · Next 16 image API:** `priority` is deprecated; `Photo` takes `preload` (preload link + `fetchPriority="high"`). `images.qualities: [75]` is required config; `localPatterns` allow `/photos/**` and `/brand/**`.
- **2026-11-18 · Tokens imported into `@layer base`,** so `bg-tint`, `bg-surface` and `bg-transparent` can override the background `tokens.css` paints on every `[data-theme]` element.
- **2026-11-18 · Fonts:** next/font variables `--font-host` / `--font-geist-mono`, mapped to `--font-sans` / `--font-mono` in `@theme`.
- **2026-11-18 · Layouts type their props explicitly** instead of Next's generated `LayoutProps`, so `tsc` passes on a clean checkout before any build.
- **2026-11-18 · Prettier** (printWidth 100, `npm run format`). ESLint passes with the React 19 hooks rules.

**Components and motion**

- **2026-11-18 · ResponsiveMaskText folded into MaskText.** `lines={Lines}` renders `desktop` on the server and swaps to `mobile` after hydration; an `as` prop keeps headings semantic.
- **2026-11-18 · Reduced motion = end state** everywhere (`useReducedMotion` via `useSyncExternalStore`); `<MotionConfig reducedMotion="user">` as a backstop. Animated nodes carry `data-reveal`, and a `<noscript>` style shows them without JS.
- **2026-11-18 · Signatures render the static composition on the server** (I1 hero, I2 shutter, I6 services) and upgrade after hydration on desktop (≥1024, fine pointer, no reduced motion). So every service's copy and the full hero text are in the HTML, and no component returns `null`.
- **2026-11-18 · I1:** letters generated from Host Grotesk Medium (Google Fonts static TTF), tracking -0.05em, viewBox 2165×700, stem width 110. The zoom targets the L stem; end scale is computed so the stem, scaled about its own centre, covers the stage (×1.1), and the scale curve is exponential so the zoom reads as constant speed. Letters box is height-limited so the h1 always fits under it.
- **2026-11-18 · I6:** photo layers stripe away around each boundary (progress 1/3 and 2/3) instead of across the whole step, so the photo changes when the text does. Pills scroll to the anchor divs at 0/100/200vh.
- **2026-11-18 · Transition (T9) is Motion + React state,** not GSAP + zustand. `SmartLink` intercepts plain clicks on internal route links; `(site)/template.tsx` calls `pageMounted()` on mount; 2.5s safety reveal. The template lives in `(site)/` because a root template never remounts across a route group.
- **2026-11-18 · `Section` takes a `ref`,** so the sticky signatures use `Section` too.
- **2026-11-18 · Header:** hides on scroll down past 240px, returns on scroll up; solid + shadow after 80px; focus shows it. Mobile menu links use a new `--t-menu` var.
- **2026-11-18 · 404 has the header but no footer** (no two brand sections together).
- **2026-11-18 · Optional intro (T12)** mounts client-side only, so a JS failure can never leave the page covered. Off (`site.intro.enabled: false`).

**Logo, preloader, transition and mobile pass (Qasim, 2026-11-18)**

- **Vector logo everywhere.** Source: `public/brand/healmedllc-sg.svg` (Qasim). `npm run build:logo` (`scripts/build-logo.mjs`) generates `src/components/ui/logo-paths.ts` (mark, HEAL letters, MEDICAL LLC as separate paths), the app icons from the vector mark, and `public/brand/heal-logo-white.svg` for the share image. `<Logo variant="full|mark">` renders inline with `currentColor` (violet on light sections, white on brand/dark in the header). The raster PNG marks are deleted.
- **Preloader (T12) is on.** `Preloader` (server, CSS keyframes in globals.css): mark spins in, HEAL letters rise, MEDICAL LLC fades, panel lifts at 1.2s (~1.8s total). It removes itself without JavaScript. Once per session via an inline gate script in the root layout's `<head>` (adds `intro-seen` to `<html>`, hence `suppressHydrationWarning` on `<html>`). Never under reduced motion. The old `Intro` and `site.intro` are removed.
- **Page transition** shows the logo mark spinning in on the violet panel (was the word HEAL).
- **Mobile menu rebuilt:** the header stays above the panel (z-50 over z-40), and one round button morphs burger ↔ X. The panel slides down; links stagger in after it. On close the links fade first, then the panel slides up and only then becomes hidden. Links are one line at `--t-menu` 30px (375) in a scroll area that centres with `my-auto`, so nothing is clipped. Bottom bar with phone, email and "Sell equipment" sits above the safe-area inset. The focus trap includes the header button.
- **Mobile pass:** hero cards are a swipe carousel on phones (82% width, 4:5, snap, `SwipeDots` progress). Page hero bands and the About collage get gentle parallax on all widths (off under reduced motion). The I8 drift is visible on phones (0.6× with a distance floor). Tap feedback (`active:scale-[0.98]`) on cards and tiles. `MobileCta`: a floating "Sell equipment" pill under 1024px after 80% of the first screen, hidden while any form or the footer is on screen.
- **Mobile type scale capped:** `--multiplier: min(100vw / 375, 1.3px)` below 768px, so 488 to 767px screens no longer get oversized headlines (the jump flagged at P0).

**Home redesign (Qasim, 2026-11-18): supersedes PAGES.md Home rows 1, 6, 7 and the I1/I2 specs in BUILD-PLAYBOOK §5**

- **Hero is now "Services split"** (Qasim picked it from four options). Brand section: labels, h1 left, lead + buttons right, then three tall photo cards (Planning 14, Disposition 18, Service 28) linking to each page. From 1024px with a fine pointer the hovered or focused card widens (flex-grow 1 → 1.9, 0.7s) and its one-line summary fades in; below that the cards stack at 4:3 with summaries always visible. Pure CSS (`.hero-card` in globals.css); the component is a server component now.
- **I1 letters aperture removed:** `heal-letters.ts`, `scripts/build-heal-letters.mjs`, `opentype.js` and photo 01's file are gone (slot kept as `null`). The header's `data-header-theme` override, which only I1 used, is removed too.
- **I2 shutter removed:** "Who we are" is a plain dark section (label, display h2, body, list, button); photo 10's file removed.
- **Marquee replaced** by "Equipment we know": four photo cards (Ventilators 19, Ultrasound 30, Histology 22, Patient monitors 21), linking to Service or Disposition. `Marquee` and `ResponsiveMarquee` deleted.
- **Signatures now:** Home has none (D9 said I1 + I2; changed by Qasim). Equipment Planning keeps I6. Home motion is T1/T2/T3/T4, I5 tiles, I7 rows and I8 drift.
- **New test:** `tests/photos-usage.test.ts` fails if any photo file in /public/photos isn't referenced by a page.

**Photography and labels (Qasim, 2026-11-18)**

- **Stand-in stock photography everywhere** (Qasim asked for proper images). 34 slots from Unsplash under the Unsplash License (free for commercial use, no attribution needed; no Unsplash+), cropped to each slot's ratio and compressed to WebP, all under budget; record in `docs/PHOTO-CREDITS.md`, script `scripts/fetch-stock-photos.mjs`. Not Google Images: most results there are copyrighted. Equipment shots are real photographs, not AI-generated (D10). Patients and identifiable data screens avoided.
- **I5 tiles show photographs edge to edge** in the panel (zoom 1.04 on hover) while there are no transparent cut-outs; tile entries are `cutout: false`. When real cut-outs arrive, set `cutout: true` and the breakout returns.
- **Ahmed's portrait** (supplied by Qasim) is photo 33 on About, cropped 4:5 from the top.
- **Contact map** is a violet-tinted static image built from OpenStreetMap tiles (`scripts/build-map.mjs`, ODbL credit printed on the image), centred on the Nominatim result for the address.
- **Section labels redesigned (changes D4 for eyebrows).** The Geist Mono uppercase eyebrow is replaced by a short `--brand` rule plus the label in Host Grotesk 500, sentence case (`type-label`, 14 at 375 / 15 on the 1440 scale, clamped 13 to 16px). " · " in a label renders as small brand dots ("Planning · Disposition · Service"). Breadcrumbs, contact field labels, store index and role use `type-label` too. Geist Mono stays for numeric indexes, spec lines and file hints. One component: `src/components/ui/Eyebrow.tsx`.

**Logo**

- **2026-11-18 · Real logo in use (Qasim's instruction).** `public/brand/heal-logo-violet.png` is the supplied artwork: a white mark on a solid violet rectangle (not a violet logo). `scripts/build-logo.mjs` extracts the mark into transparent `heal-logo-white.png` (brand/dark) and `heal-logo-violet-mark.png` (light), which the header crossfades with the theme, and crops the H circle into `icon.png` / `apple-icon.png`. The artwork reads "HEAL MEDICAL LLC"; site text still follows the legal name (open question for Ahmed). The source is 360px wide, so the icons are soft: swap for an SVG when there is one.

**Content**

- **2026-11-18 · Home "What we do" row photos: 03, 18, 28** (PAGES and PHOTO-PIPELINE disagreed on row 1).
- **2026-11-18 · How `[confirm]` copy was split** (only the unconfirmed part is null; drafts kept as comments in the content files):
  - Planning step 01: "A call about your equipment and goals." (30-minute length pending).
  - Disposition steps 03 and 04: title only (logistics and payment terms pending).
  - Disposition "Why sell": the "Paperwork for your records" card is hidden; 3 cards show.
  - Service "Repair" row: "Fault finding and fixes." (on-site pending).
  - Planning CMMS card: sentence shown, partner name `null`.
  - About team: Ahmed shows with name and portrait slot; role and bio `null`; second member hidden.
  - Service spec lines, hours, social links, store URLs: `null`.
  - Home and Disposition "Infusion pumps", "Imaging", "Surgical and OR" tiles hidden.
- **2026-11-18 · FAQ answers written for the site (Qasim's instruction).** Five Q&As in `content/disposition.ts`, worded to avoid unconfirmed specifics (no wipe standard, no service radius, no lot minimums). "Do you buy equipment that doesn't work?" opens with "Often, yes", which matches the page's "Working or not, most hospital equipment has value". Also emitted as FAQPage JSON-LD. **Ahmed to confirm.**
- **2026-11-18 · Shop:** the categories section has an eyebrow only (CONTENT gives no h2). Tiles link to `#stock-check` until store URLs exist. The store cards section renders nothing while both URLs are `null`.
- **2026-11-18 · Contact map:** the static map is photo slot `map` (placeholder until exported); the tile links to Google Maps.

**Forms**

- **2026-11-18 · One `HealForm` drives all four forms** from `lib/forms/config.ts`; the zod schema is shared with the Server Action. `lib/forms/submit.ts` holds the pipeline outside Next so it's unit-tested.
- **2026-11-18 · Turnstile without a secret is skipped with a server warning** (dev). Production must set `TURNSTILE_SECRET_KEY` (checklist).
- **2026-11-18 · Uploads:** `@vercel/blob` 2.x client uploads, `access: "public"` with a random suffix (unguessable URLs that Ahmed can open from the email); multipart above 5 MB. `/api/upload` returns 503 when `BLOB_READ_WRITE_TOKEN` is unset; the form then shows the "email the file instead" copy and still sends.
- **2026-11-18 · Service request urgency uses chips** (radio pills), like the contact intent.

## Needs Qasim's eyes

Everything from P2 on is unreviewed. Grouped by page; widths to check: 375, 390, 768, 1024, 1280, 1440, 1920.

**Logo, preloader and mobile (2026-11-18)**
- **Preloader:** speed and feel on a phone (clear the session or open a private tab to see it again). It holds ~1.2s before lifting.
- **Mobile menu:** open/close slide and stagger, link size (30px), the morphing button, and the bottom bar on small phones (iPhone SE height).
- **Hero carousel** on phones: card width (82%), swipe feel, progress dashes.
- **Sell equipment pill:** when it appears and hides, and that it never covers anything important.
- **Header logo** sharpness and colour switching (vector now).

**New Home (2026-11-18)**
- **Hero cards:** height (`max(340px, 440 × multiplier)`), the widen ratio (1.9) and speed, the gradient strength behind the labels, and how the three photos read side by side.
- **Equipment row:** four cards at 2 columns on phones, 4 at 1024+.
- **Who we are** without the photo: does the display-size h2 carry the dark band on its own?

**New since the check**
- **Section labels** (rule + sentence case + dots): size and weight next to the h2s; whether the rule should be longer or the label muted instead of ink.
- **Stock photo crops** at each slot (crops use sharp's "attention" focus). The "Who we are" shutter uses a stock photo of an engineer at a bench (black and white); it could be read as Ahmed, so swap in the real bench shot (photo 10) when it exists.
- **Tiles as photographs:** check panels with full-bleed photos look right in the drift columns and on Disposition, Service and Shop.

**Global**
- **Multiplier jump at 767 → 768px:** `type-display` is ~94px at 767px and ~51px at 768px (spec). Fallback: cap the mobile multiplier with `min(calc(100vw / 375), 1.4px)`.
- **Mobile line breaks** were set by estimate (~0.48em per character). Check every headline at 375.
- **Header:** logo crossfade violet ↔ white; theme flips over every section; scroll states.
- **Footer** HEAL crop (`0.62em` frame) and the T8 rise. **Transition** timing (0.5s each way).

**Home `/`**
- **I1 hero** (≥1024, fine pointer): letters box size against the h1 at 1280×720 and 1440×900; zoom speed and the L-stem landing; caption fade; header turning light over the photo. Static version at 375/768.
- **T3 statement** fill range; **I7** card size (300px at 1440), follow lag and tilt; touch rows expanding with an inline photo.
- **I8 drift** amounts and the middle column's start offset; **I5** breakout height (118%) and hover lift.
- **T4 pulse line:** spike position, dot, numerals lighting; vertical line on phones.
- **I2 shutter:** line split distance (±38vh), window opening, copy over the night gradient at 0.6.
- **Marquee** speed; **shop tiles** snapping sideways on phones.

**Equipment Planning:** I6 pills, swap direction, stripe timing on the photo, CMMS card; pill clicks landing on the right service; stacked layout under 1024.
**Asset Disposition:** tile grid with 5 tiles (4 + 1 at 1440); pulse steps with two title-only steps; outlined cards; offer form card and upload field; FAQ accordion.
**Service:** scan line on card hover; dashed banner; How we help rows; service form.
**About:** collage speeds and offsets; The name band (HEAL size, sentence placement); values (first rule violet); team card with one person and no role/bio; careers.
**Shop:** categories snap on phones; stock check inline row. Store cards are hidden until URLs exist (set a URL in `site.ts` temporarily to review them).
**Contact:** mega h1 size; intent chips; dark details card; map tile with pin.
**Forms (all):** error states, "Sending…", thank-you panel. Without keys, submissions log to the dev server console and show success.

## Blocked on Ahmed

See `OPEN-QUESTIONS.md`. Nothing blocks the build: placeholders are `null` and render nothing. New since P0: confirm the FAQ answers; SVG logo.

## Known defects

_None known._ Note for testing in the built-in browser: when the pane is hidden the page runs as a background tab, so scroll reveals and lazy images look stuck. Bring the pane forward before judging motion.

## Bundle (P8)

16 JS chunks, 1,098 KB raw / **342 KB gzip in total across all routes** (includes motion, Lenis, react-hook-form, zod and the Blob client for the form pages). Largest chunk 79 KB gzip. CSS 10 KB gzip. Next 16's build output no longer prints per-route sizes; measure first-load JS per page in Lighthouse once it's deployed.

## Launch checklist (P9)

Code-side checks all pass (see Verification above). These need accounts, keys or DNS, so they're Qasim's (and Ahmed's) to do:

- [ ] **Vercel project** from the GitHub repo; framework Next.js; Node 22+. Set every var in `.env.example` for Production (and Preview if wanted).
- [ ] **`NEXT_PUBLIC_SITE_URL=https://healmedllc.com`** (sitemap, robots, canonical and OG URLs use it).
- [ ] **Resend:** add and verify `healmedllc.com` (SPF/DKIM DNS records), set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (e.g. `HEAL website <website@healmedllc.com>`) and `CONTACT_TO_EMAIL`. Send one test from each form and check reply-to goes to the sender.
- [ ] **Turnstile:** create a widget (Invisible/Managed) for `healmedllc.com` (+ the Vercel preview domain if testing there); set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`. Without the secret the spam check is skipped.
- [ ] **Vercel Blob:** create a store and connect it to the project (sets `BLOB_READ_WRITE_TOKEN`); upload a 10 MB xlsx through the Offer form and open the link in the email.
- [ ] **Domain:** point healmedllc.com to Vercel, HTTPS on, `www` redirecting to the apex (Vercel domain settings). Confirm who owns DNS today (OPEN-QUESTIONS).
- [ ] **Old WordPress redirects:** export the old sitemap, add entries to `redirects.ts`, redeploy, spot-check a few old URLs.
- [ ] **Search Console:** verify the domain, submit `https://healmedllc.com/sitemap.xml`.
- [ ] **Content:** real photos in `public/photos/` + `src` in `photos.ts`; store URLs, socials, hours, team role/bio, `[confirm]` items in `src/content/`; FAQ answers confirmed; legal text reviewed, then `approved: true` in `content/legal.ts`.
- [ ] **Lighthouse (mobile)** on the deployed Home and one inner page: targets Performance ≥ 90, Accessibility 100, Best Practices 100, SEO 100, LCP < 2.5s.
- [ ] **Vercel Analytics** (D-out-of-scope allows it): enable in the dashboard if wanted; no code change needed beyond adding `@vercel/analytics` if chosen.
