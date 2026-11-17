# RESUME-PROMPT: pick the project up in a fresh session

> For a new Claude Code session (or Cursor, or a colleague) after the first run. First run uses `../KICKOFF-PROMPT.md`.
> **Last updated:** 2026-11-18

## Files to attach (Claude Code reads them from the repo; elsewhere, attach in this order)

| # | File | Why |
| --- | --- | --- |
| 1 | `docs/HANDOFF.md` | Current state. **Always.** |
| 2 | `docs/BUILD-PLAYBOOK.md` | Grammar, motion and image vocabulary, phases, landmines. **Always.** |
| 3 | `docs/MASTER-PLAN.md` §2 | Locked decisions. When the task touches design direction. |
| 4 | `docs/PAGES.md` + `docs/CONTENT.md` | When building or changing a page. |
| 5 | `docs/PHOTO-PIPELINE.md` | Only for imagery work. |

## The prompt

```
You're continuing the HEAL website (Heal Med LLC), heal-web/. Next 16 (App
Router, Turbopack) · React 19 · Tailwind v4 · Motion v12 · Lenis · TypeScript.

Read docs/HANDOFF.md first, then docs/BUILD-PLAYBOOK.md. CLAUDE.md has the
rules; re-read them.

The rules that matter most:
1. I do ALL visual and browser testing. Never use preview, screenshot or
   browser tools. Verify with `npx tsc --noEmit`, `npx next build` (route count
   must match HANDOFF), `npx vitest run`, and greps of
   .next/server/app/<route>.html.
2. Section Recipe (playbook §2) for every section. Home is the reference.
3. MaskText with hand-set lines (from src/content) for every headline and
   paragraph. Lines under ~45 characters.
4. One easing [0.24, 0.43, 0.15, 0.97]. 0.6–0.8s. No bounce.
5. <Section theme> on every section; semantic colour classes only.
6. No page-level max-w container. Multiplier vars for type and spacing.
7. Image patterns I1–I8 only; one signature per page (Home: I1 + I2).
   No mask-size animation, no pins outside I1, I2, I6.
8. Never return null from viewport-branching components.
9. [confirm]/[need] = null, renders nothing. No invented facts.
10. "HEAL" in copy, "Heal Med LLC" in legal places, never "HEAL Medical".
    No em dashes.
11. Don't re-analyse the reference codebases; the playbook names the files.
12. Commit at the end, update HANDOFF.

Start with: <TASK>
```

## Filling in the last line

Check HANDOFF first: the next unstarted phase, or the top of "Known defects". Examples:

- `Start with: P4 from BUILD-PLAYBOOK §10.`
- `Start with: Qasim's checkpoint feedback below, then continue with P4.` (paste the feedback)
- `Start with: swap in the photos now in public/photos/ (update content/photos.ts, alt text from PHOTO-PIPELINE).`
- `Start with: Ahmed's answers below, fill the null fields in src/content and remove the matching items from OPEN-QUESTIONS.`

## Things a fresh session reliably gets wrong

- Reaching for GSAP ScrollTrigger pins or `mask-size` for I1. It's a sticky stage + Motion `useScroll` + `transform: scale()` on a static SVG mask.
- Pinning the lifecycle steps. T4 is not pinned.
- Writing `<p>` body copy instead of `MaskText`.
- Hardcoding font sizes or `max-w-7xl mx-auto` wrappers.
- Using raw `violet-600` classes in components instead of `brand` / `canvas` / `ink`.
- Rendering placeholder text for null content ("Coming soon", "TBD").
- "HEAL Medical" or "Heal Medical LLC". It's HEAL and Heal Med LLC.
- Taking a screenshot to check work. Don't; list it under "Needs Qasim's eyes".
- Sending uploads through a Server Action (4.5 MB limit on Vercel).
- Following a yellow note on the design canvas that contradicts the docs. The docs win.
