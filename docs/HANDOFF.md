# HANDOFF: current state

> Wins if any doc disagrees. Update at the end of every phase: what changed, what's next, what's blocked, what needs Qasim's eyes.
> **Last updated:** 2026-11-18 (by Claude, end of P0)

## State

**P0 done.** Foundation, ports, all content and stub routes are in. Next: P1 Chrome (BUILD-PLAYBOOK §10).

| Phase | Status | Commit | Notes |
| --- | --- | --- | --- |
| P0 Setup | ✅ done | see `git log --grep "feat(p0)"` | Next 16.4.6, React 19.3, Tailwind 4.3, motion 12.43, vitest 5 |
| P1 Chrome | ⬜ | | |
| P2 Home A (I1, statement, I7) | ⬜ | | |
| P3 Home B (I8, I5, T4, I2, marquee, shop) | ⬜ | | |
| P4 Planning + Service | ⬜ | | |
| P5 Disposition + forms | ⬜ | | |
| P6 About, Shop, Contact | ⬜ | | |
| P7 SEO + legal | ⬜ | | |
| P8 Polish | ⬜ | | |
| P9 Launch prep | ⬜ | | |

**Route count:** 12 after P0: `/`, `/equipment-planning`, `/asset-disposition`, `/service`, `/about`, `/shop`, `/contact`, `/privacy`, `/terms`, `/_not-found`, `/robots.txt`, `/sitemap.xml`. Expected after P7: 14 (+ `/opengraph-image`, + `/api/upload` in P5).

**Repo:** `main` → https://github.com/Qasim21569/healmedllc (remote added, nothing pushed yet).

## Where things are

- Copy: `src/content/*.ts` (typed; `null` = waiting on Ahmed). Line arrays are hand-set; `tests/content.test.ts` enforces ≤ 45 chars, no em dashes, no "!", no "HEAL Medical", photo ids exist.
- Primitives: `src/components/ui/` (MaskText, SwapMaskText, Reveal, RevealImage, ParallaxContainer, ResponsiveImage, ClipImageContainer, HoverReveal, Marquee, ResponsiveMarquee, Accordion, StyledLink, Button, SmartLink, Eyebrow, Photo, Icon). `src/components/layout/Section.tsx`.
- Hooks: `useMediaQuery` (server snapshot `false`), `useIsDesktop`, `useIsMobile`, `useReducedMotion`, `useMaskImage`.
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

## Needs Qasim's eyes

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
