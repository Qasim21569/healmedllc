# HANDOFF: current state

> Wins if any doc disagrees. Update at the end of every phase: what changed, what's next, what's blocked, what needs Qasim's eyes.
> **Last updated:** 2026-11-18 (by Claude, end of P1, checkpoint 1)

## State

**P1 done, waiting at checkpoint 1 for Qasim's visual pass.** Header, mobile menu, footer, page transition, 404 and PageHero are on every route. Home is still a stub (h1 only) until P2. Next: P2 Home A.

| Phase | Status | Commit | Notes |
| --- | --- | --- | --- |
| P0 Setup | ✅ done | `5701fed` | Next 16.4.6, React 19.3, Tailwind 4.3, motion 12.43, vitest 5 |
| P1 Chrome | ✅ done | see `git log --grep "feat(p1)"` | Header T6, MobileMenu, Footer T8, transition T9, 404, PageHero |
| P2 Home A (I1, statement, I7) | ✅ done | see `git log --grep "feat(p2)"` | HEAL letters script, I1 hero (static + desktop zoom), T3 statement, I7 rows; real logo marks |
| P3 Home B (I8, I5, T4, I2, marquee, shop) | ✅ done | see `git log --grep "feat(p3)"` | BreakoutTile, DriftColumns, PulseSteps, I2 shutter, marquee, shop tiles; mobile per §7 |
| P4 Planning + Service | ✅ done | see `git log --grep "feat(p4)"` | I6 sticky swap + stacked fallback, How it works, What we service (I5 + scan), How we help. Service request form landed in P5 with the forms infra |
| P5 Disposition + forms | ✅ done | see `git log --grep "feat(p5)"` | Disposition page, 4 zod schemas, Server Actions, Turnstile, Resend + dev fallback, Blob client uploads, HealForm, Service request + Offer wired, FAQ answers written |
| P6 About, Shop, Contact | ✅ done | see `git log --grep "feat(p6)"` | About (I4 collage, The name T8, null-safe team), Shop (I5 categories, store cards hidden until URLs exist, inline stock check), Contact (intent chips, details card, map tile); all 4 forms wired |
| P7 SEO + legal | ✅ done | see `git log --grep "feat(p7)"` | Metadata + OG/Twitter per route, opengraph-image, icons, LocalBusiness + FAQPage JSON-LD, sitemap, robots, legal holding pages, redirects scaffold |
| P8 Polish | ⬜ | | |
| P9 Launch prep | ⬜ | | |

**Route count:** 12 after P1 (unchanged from P0): `/`, `/equipment-planning`, `/asset-disposition`, `/service`, `/about`, `/shop`, `/contact`, `/privacy`, `/terms`, `/_not-found`, `/robots.txt`, `/sitemap.xml`. Expected after P7: 14 (+ `/opengraph-image`, + `/api/upload` in P5).

**Repo:** `main` → https://github.com/Qasim21569/healmedllc (remote added, nothing pushed yet).

## Where things are

- Copy: `src/content/*.ts` (typed; `null` = waiting on Ahmed). Line arrays are hand-set; `tests/content.test.ts` enforces ≤ 45 chars, no em dashes, no "!", no "HEAL Medical", photo ids exist.
- Primitives: `src/components/ui/` (MaskText, SwapMaskText, Reveal, RevealImage, ParallaxContainer, ResponsiveImage, ClipImageContainer, HoverReveal, Marquee, ResponsiveMarquee, Accordion, StyledLink, Button, SmartLink, Eyebrow, Photo, Icon). `src/components/layout/Section.tsx`.
- Hooks: `useMediaQuery` (server snapshot `false`), `useIsDesktop`, `useIsMobile`, `useReducedMotion`, `useMaskImage`.
- Chrome: `src/components/layout/` (SiteChrome, Header, MobileMenu, Footer, Section), `src/components/providers/TransitionProvider.tsx`, `src/app/(site)/template.tsx`, `src/hooks/useHeaderTheme.ts`, `src/components/sections/PageHero.tsx`, `LegalBody.tsx`, `src/app/not-found.tsx`.
- Tokens: `src/app/tokens.css` (copy of `design/tokens.css`), multiplier + `@theme` + `type-*` utilities in `src/app/globals.css`.

## Decisions made during the build

- **2026-11-18 · `../HEAL-references/` does not exist.** Nothing to note.
- **2026-11-18 · Cache Components off.** The scaffold enabled `cacheComponents` + `partialPrefetching`. With it on, Next keeps up to 3 previous routes mounted but hidden (React Activity), which leaves duplicate anchor ids (`#offer`, `#request`) and stale form state in the DOM and fights the T9 transition. The site is fully static either way (all routes `○`).
- **2026-11-18 · Tailwind via `@tailwindcss/postcss`** (CLAUDE.md stack). The scaffold had switched to a `@tailwindcss/turbopack` loader; replaced.
- **2026-11-18 · motion pinned to `^12`** (stack says v12; npm resolved v14). `@types/node` bumped to 24 for the vitest 5 peer range.
- **2026-11-18 · `turbopack.root` pinned** in `next.config.ts`: a stray `package-lock.json` in `C:\Users\qasim` was being picked up as the workspace root.
- **2026-11-18 · Next 16 image API:** `priority` is deprecated; `Photo` takes `preload` (sets `preload`, `fetchPriority="high"`, `loading="eager"`). `images.qualities: [75]` is now required config; `localPatterns` allow `/photos/**` and `/brand/**`.
- **2026-11-18 · ResponsiveMaskText folded into MaskText.** `MaskText lines={Lines}` renders `desktop` on the server and swaps to `mobile` after hydration; `lines={[...]}` still works. One component, same behaviour, and an `as` prop (`h1`, `h2`, `p`...) so headings stay semantic.
- **2026-11-18 · Reduced motion = end state** everywhere: `useReducedMotion()` (media query via `useSyncExternalStore`) sets durations to 0 and reveals immediately. `<MotionConfig reducedMotion="user">` wraps the site as a backstop. Reveal components mark their animated nodes `data-reveal`, and a `<noscript>` style shows them without JS.
- **2026-11-18 · ResponsiveImage keeps one DOM.** It toggles the parallax transform instead of swapping wrappers, so the image never remounts. `from="md" | "lg"` (default lg, per §7).
- **2026-11-18 · ResponsiveMarquee fix:** the brahma original returned `null` until the viewport was known (rule 10). It now renders the desktop config first.
- **2026-11-18 · Fonts:** next/font variables are `--font-host` and `--font-geist-mono`, mapped to `--font-sans` / `--font-mono` in `@theme` (the playbook's `--font-sans: var(--font-sans)` would be circular).
- **2026-11-18 · Section has `surface` as well as `tint`:** PAGES marks several sections "light (surface)".
- **2026-11-18 · Home "What we do" row photos: 03, 18, 28.** PAGES and PHOTO-PIPELINE disagree on row 1 (03 vs 14); 03 is the follow-card shot.
- **2026-11-18 · How `[confirm]` copy was split** (only the unconfirmed part is null; drafts kept as comments in the content file):
  - Planning step 01: "A call about your equipment and goals." (the 30-minute length is pending).
  - Disposition steps 03 and 04: title only, body `null` (logistics and payment terms pending).
  - Disposition "Why sell": the "Paperwork for your records" card is hidden (documents pending), 3 cards show.
  - Disposition FAQ: the two unanswered questions are hidden; 2 items show.
  - Service "Repair" row: "Fault finding and fixes." (on-site pending).
  - Planning CMMS card: sentence shown, partner name `null`.
  - About team: Ahmed shows with name and portrait slot; role and bio `null`. Second member hidden.
  - Service card spec lines, hours, social links, store URLs: `null`.
  - Store buttons and store links render nothing while the URLs are `null`.

- **2026-11-18 · Tokens imported into `@layer base`.** `tokens.css` paints every `[data-theme]` element with `--canvas`. Unlayered, that beat Tailwind utilities, so `bg-tint`, `bg-surface` and `bg-transparent` (header at the top) silently lost. Layered, utilities win.
- **2026-11-18 · Transition (T9) is Motion + React state,** not GSAP + zustand as in otis-valen. `SmartLink` intercepts plain clicks on internal route links: the panel rises (0.5s), the route is pushed, `(site)/template.tsx` calls `pageMounted()` on mount, and the panel leaves off the top (0.5s). A 2.5s safety timer reveals if a page never mounts. Same-page and hash links, back/forward and reduced motion skip it.
- **2026-11-18 · Template lives in `src/app/(site)/template.tsx`,** not `src/app/template.tsx`. A root template is keyed by the route-group segment, which is the same for every page, so it would never remount.
- **2026-11-18 · Logo on brand/dark:** the violet PNG is turned white with `brightness-0 invert` on brand and dark header themes. Swap for a white SVG when Ahmed sends vectors.
- **2026-11-18 · 404 has the header but no footer:** the 404 is one brand section and the footer is brand, and two brand sections never sit together.
- **2026-11-18 · Header scroll behaviour:** hides on scroll down past 240px, returns on scroll up; solid canvas + `--shadow-float` after 80px. Focus moving into the header shows it.
- **2026-11-18 · Mobile menu link size** uses a new `--t-menu` var (40 at 375; 56 on the 1440 scale, so ~40px at 1023px).
- **2026-11-18 · Prettier added** (printWidth 100, `npm run format`).

## Needs Qasim's eyes

**P1 (checkpoint 1)**

- **T6 header theme:** white on the brand hero, violet over light sections, flipping at the header's centre line. Inner pages only have hero + footer so far; the flip shows over the light strip under each hero band.
- **Header scroll states:** transparent at the top, solid + shadow after 80px, hides after 240px scrolling down, returns on scroll up.
- **Logo filtered to white** on brand: check the PNG stays crisp at 32/36px tall.
- **Mobile menu (under 1024px):** 44px round button, full-screen brand panel, links ~40px with mono index and stagger, Esc closes, Tab stays inside, page doesn't scroll behind it.
- **Footer:** CTA row, columns (stacked / 2x2 at 768 / 4 across at 1024), legal row, giant HEAL cropped by the bottom edge with the T8 rise. The crop is a `0.62em` frame, easy to tune.
- **Page transition T9:** violet panel up 0.5s, page swap, panel off the top 0.5s, small "HEAL" in the middle. Try header links, footer links and the logo.
- **PageHero:** breadcrumb, giant h1, lead left / buttons right, 21:9 band (4:3 on phones) straddling into the next section, I3 wipe on entry, I4 parallax from 1024px.
- **Interim rhythm:** inner pages go brand hero → brand footer until their sections land (P4 to P6).

**P0**

- **Multiplier jump at 767 → 768px.** Per spec, mobile uses `100vw/375` and desktop `100vw/1440`, so `type-display` is ~94px at 767px and ~51px at 768px. The playbook's fallback is to cap the mobile multiplier with `min(calc(100vw / 375), 1.4px)`. Say the word and I'll apply it.
- **Mobile line breaks** in `src/content/*` were set by estimate (Host Grotesk ~0.48em per character). Check headlines at 375 and 390.

## Blocked on Ahmed

See `OPEN-QUESTIONS.md`. Nothing blocks the build: placeholders are `null` and render nothing.

## Known defects

_None yet._

## Launch checklist (fill in during P9)

- [ ] Vercel project, env vars from `.env.example`
- [ ] Resend: domain verified, `CONTACT_FROM_EMAIL` on it, test email received
- [ ] Turnstile: production keys, site domain added
- [ ] Vercel Blob store connected
- [ ] Domain healmedllc.com pointed, HTTPS, www redirect
- [ ] Old WordPress URL redirects
- [ ] Search Console + sitemap submitted
- [ ] Real photos swapped in, `[need]` values filled
