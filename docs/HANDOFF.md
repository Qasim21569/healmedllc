# HANDOFF: current state

> Wins if any doc disagrees. Update at the end of every phase: what changed, what's next, what's blocked, what needs Qasim's eyes.
> **Last updated:** 2026-11-18 (by Claude, before any code)

## State

**Nothing built yet.** Design, copy and plan are done. Next: Phase P0 (BUILD-PLAYBOOK §10).

| Phase | Status | Commit | Notes |
| --- | --- | --- | --- |
| P0 Setup | ⬜ not started | | |
| P1 Chrome | ⬜ | | |
| P2 Home A (I1, statement, I7) | ⬜ | | |
| P3 Home B (I8, I5, T4, I2, marquee, shop) | ⬜ | | |
| P4 Planning + Service | ⬜ | | |
| P5 Disposition + forms | ⬜ | | |
| P6 About, Shop, Contact | ⬜ | | |
| P7 SEO + legal | ⬜ | | |
| P8 Polish | ⬜ | | |
| P9 Launch prep | ⬜ | | |

**Route count:** _record after P0_ (expected: 9 pages + `/_not-found` + `/sitemap.xml` + `/robots.txt` + `/opengraph-image` + `/api/upload`).

## Decisions made during the build

_None yet. Add here with a date when something isn't covered by MASTER-PLAN §2 and you had to choose. If it's big, ask Qasim first._

## Needs Qasim's eyes

_List anything only a visual check can settle, per phase (e.g. "I1 end scale on ultrawide", "I8 drift amount on 1280")._

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
