# heal-web: Claude Code handoff

Everything Claude Code needs to build the new healmedllc.com for **Heal Med LLC (HEAL)**, written in the same structure and conventions as brahma-web.

## Start

1. Copy this folder's contents into `C:\Users\qasim\Claude\Projects\BRAHMA Group Website Development\heal-web\`.
2. `cd heal-web` → `claude --add-dir ..` (read access to the sibling references; plain `claude` works if `.claude/settings.json` from the zip is present).
3. Paste the prompt from `KICKOFF-PROMPT.md`. It runs P0 → P9 and stops for your visual check after P1, P3 and P6.

## What's here

| File | What |
| --- | --- |
| `CLAUDE.md` | Rules, stack, structure, reference paths. Auto-loaded. |
| `KICKOFF-PROMPT.md` | First-run master prompt + per-phase prompts. |
| `docs/MASTER-PLAN.md` | The why: context, locked decisions D1–D17, success criteria. |
| `docs/BUILD-PLAYBOOK.md` | The how: grammar, foundation, motion T1–T12, image system I1–I8, chrome, responsive, forms, SEO, phases with acceptance checks, landmines. |
| `docs/PAGES.md` | Section-by-section layout of every page with motion and photo ids. |
| `docs/CONTENT.md` | Every word of copy, SEO, form states. |
| `docs/PHOTO-PIPELINE.md` | Shot list, art direction, how photos get into the repo. |
| `docs/HANDOFF.md` | Current state. Claude Code updates it every phase. |
| `docs/RESUME-PROMPT.md` | Prompt for any later session. |
| `docs/OPEN-QUESTIONS.md` | What Ahmed still needs to answer. Nothing here blocks the build. |
| `design/` | Tokens (json + css), Ahmed's sitemap sketch. |
| `public/brand/` | Logo PNG. |
| `.claude/settings.json` | Read access to the BRAHMA folder (sibling references). |

## Links (for you, Claude Code can't open them)

- Design canvas, all pages: https://claude.ai/artifact/339XCPMsFm4tVTRpG9AotH
- Design system: https://claude.ai/artifact/J34iz7wUP8VyfqXQ5a6pWM
- Copy deck: https://claude.ai/artifact/Ruk8c9Sm9qzt2zbAHVaAw9
