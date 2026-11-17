# KICKOFF: first Claude Code run

## Before you paste it (Qasim, 3 minutes)

1. Create `C:\Users\qasim\Claude\Projects\BRAHMA Group Website Development\heal-web\` and copy this whole package into it (`CLAUDE.md`, `KICKOFF-PROMPT.md`, `README.md`, `docs/`, `design/`, `public/brand/`, `.claude/`).
2. Optional: put HEAL-specific references in `..\HEAL-references\`.
3. Open a terminal in `heal-web\` and run `claude --add-dir ..` (gives it read access to the sibling reference folders). CLAUDE.md loads by itself. If you used the zip, `.claude/settings.json` does the same and plain `claude` works.
4. Edit the `CHECKPOINTS` line in the prompt if you want more or fewer stops. Paste.

---

## The prompt

```
You're building the new website for Heal Med LLC (brand: HEAL), a Sacramento
company that plans, buys, services and resells hospital equipment. Brand line:
"Providing a second life to your asset." This folder already holds the full
design, copy and build plan. Your job is to build the site, phase by phase,
to the plan.

READ FIRST, in this order, fully:
1. CLAUDE.md (rules; already loaded, re-read the Rules section)
2. docs/HANDOFF.md (state)
3. docs/MASTER-PLAN.md (locked decisions D1–D17, don't re-litigate)
4. docs/BUILD-PLAYBOOK.md (grammar, foundation, motion T1–T12, images I1–I8,
   phases P0–P9 with acceptance checks, landmines)
5. docs/PAGES.md and docs/CONTENT.md (layouts and every word of copy)
6. docs/PHOTO-PIPELINE.md (photo ids, placeholders)
Skim docs/OPEN-QUESTIONS.md so you know what is null.

THEN:
- If ../HEAL-references/ exists, list it and note anything relevant in
  HANDOFF.md under "Decisions made during the build".
- Read node_modules/next/dist/docs/ for routing, metadata, images and caching
  once Next is installed (P0), before writing that code. Next 16 differs from
  what you remember.

HOW TO WORK:
- Execute phases P0 → P9 from BUILD-PLAYBOOK §10 in order. For each phase:
  a) write a short checklist for the phase (task list), 
  b) build it,
  c) run the phase's acceptance checks plus `npx tsc --noEmit`,
     `npx next build`, `npx vitest run`,
  d) fix until green,
  e) update docs/HANDOFF.md (status, commit, decisions, "Needs Qasim's eyes"),
  f) git commit: "feat(pN): <summary>".
- P0 note: create-next-app refuses a non-empty folder. Scaffold into
  ./_scaffold (TypeScript, App Router, Tailwind, src dir, Turbopack, no
  ESLint prompt changes), move its contents to the root without overwriting
  CLAUDE.md, KICKOFF-PROMPT.md, README.md, docs/, design/ or public/brand/,
  delete ./_scaffold, then `git init` and make the first commit of the docs
  before any code.
- Port brahma-web primitives instead of writing new ones (playbook §1, §3.2).
  Open only the reference files the playbook names. Never open any .env file
  in another project.
- You may use subagents for parallel, self-contained work (porting a batch of
  primitives, filling src/content from CONTENT.md, writing vitest checks).
  Keep design decisions and the signature patterns (I1, I2, I6) in the main
  session.
- If you have a planning or executing-plans skill installed, use it for each
  phase; if not, the task list is enough.

HARD RULES (CLAUDE.md has the full list):
- I do ALL visual and browser testing. Never use preview, screenshot,
  Playwright or browser tools. Verify by build, types, tests, SSR greps and
  reading code. Anything that needs eyes goes in HANDOFF "Needs Qasim's eyes".
- MaskText with hand-set lines for every headline and paragraph. One easing
  [0.24, 0.43, 0.15, 0.97]. <Section theme> on every section. No page max-w
  container. Type and spacing only from the multiplier vars.
- No mask-size animation, no scrubbed clip-path on big areas, no pins outside
  I1, I2, I6. One signature per page (Home: I1 and I2).
- Never return null from viewport-branching components. Reduced motion =
  end state.
- [confirm]/[need] copy is null and renders nothing. No invented facts.
- "HEAL" in copy, "Heal Med LLC" in legal places. Never "HEAL Medical".
  No em dashes, no exclamation marks.

CHECKPOINTS: stop and wait for me after P1, after P3 and after P6. At each
stop, give me: what's done, the commit hash, the exact routes/sections I
should look at in the browser, and anything in "Needs Qasim's eyes". Between
checkpoints, keep going without asking unless you hit a real blocker (a
decision MASTER-PLAN doesn't cover that would be expensive to undo).

If you're blocked on content or photos, use the placeholder path and move on;
log it in HANDOFF.

Start with: P0.
```

---

## After a checkpoint

Reply with your feedback, then: `Fix the above, update HANDOFF, then continue from P<next>.`

## Per-phase prompts (if you'd rather drive one phase at a time)

Use the RESUME prompt (`docs/RESUME-PROMPT.md`) and end it with one of these:

| Phase | `Start with:` line |
| --- | --- |
| P0 | `P0 Setup. Scaffold, foundation (§3), ports (§3.2), all content in src/content, stub routes, vitest content checks. Record the route count.` |
| P1 | `P1 Chrome. Header with T6 theme switching and scroll state, MobileMenu, Footer with T8, page transition T9 ported from otis-valen, 404, PageHero with the 21:9 straddling band on every inner page.` |
| P2 | `P2 Home A. Generate heal-letters.ts with opentype.js, build I1 exactly as BUILD-PLAYBOOK §5 (transform scale on a static SVG mask, computed origin and end scale, static fallback), then the statement with T3 and What we do with I7.` |
| P3 | `P3 Home B. We buy (I8 drift columns of I5 breakout tiles), Lifecycle (T4 pulse line, not pinned), Who we are (I2 ported from ThresholdReveal), Marquee, Shop tiles, then the Home mobile pass per §7.` |
| P4 | `P4 Planning and Service. Planning I6 sticky swap ported from SelectedWork with SwapMaskText and useMaskImage, anchors, How it works. Service cards with I5 + scan line, How we help, Service request form UI.` |
| P5 | `P5 Disposition and forms. Page sections, then forms infrastructure (§8): zod schemas, Server Actions, Turnstile, Resend, Vercel Blob client uploads, dev fallback, tests. Wire Offer and Service request.` |
| P6 | `P6 About, Shop, Contact. About with the I4 collage and The name band, null-safe team; Shop categories, store cards, stock check; Contact form with intent chips, details card, map tile. Wire remaining forms.` |
| P7 | `P7 SEO and legal. Metadata from content/seo.ts, OG image, JSON-LD (legalName Heal Med LLC), sitemap, robots, privacy and terms structure, redirects scaffold.` |
| P8 | `P8 Polish. Optional intro behind site.intro.enabled, reduced-motion audit, focus, image sizes, orphans, bundle notes in HANDOFF.` |
| P9 | `P9 Launch prep. Write the launch checklist results into HANDOFF; change code only if a check fails.` |
