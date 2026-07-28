# UPSC Answer Skeleton Bank

Answer skeletons for Essay and GS1–GS4 — structure and frameworks, not model answers.
`index.html` is a fixed renderer. All content lives in `data/`.

## Run it

**Double-click `start.bat` (Windows) or `start.command` (macOS).** Then open
`http://localhost:8000` if it doesn't open by itself.

Do not open `index.html` directly. A `file://` page is forbidden by the browser from
reading `data/`, so it would silently fall back to browser storage and ignore these files.
The label beside the title tells you which source it loaded: `data/` is correct.

Manual equivalent, from this folder:

```
python -m http.server 8000
```

## Daily loop

1. Ask Claude for a skeleton as JSON — the **Copy prompt** button holds the exact wording.
2. Save the file into `incoming/`.
3. Drag it onto the app window, or use **Add** and paste.
4. **Export** writes the eight `data/` files. Drop them back in and commit.

With Claude Code running in this folder, steps 2–4 collapse: ask it to add the question and
it writes `data/` directly. See `CLAUDE.md` for the rules it follows.

## Layout

```
index.html                  renderer — no question data in here
CLAUDE.md                   project rules for Claude Code
data/manifest.json          schema version, paper → files
data/taxonomy.json          the controlled vocabulary
data/essay.json             one file per paper
data/gs1.json  gs2.json  gs3.json
data/gs4-theory.json        GS4 theory questions
data/gs4-case-studies.json  GS4 case studies only
incoming/                   scratch, git-ignored
.claude/skills/             the answer-framework skill
```

## Two rules worth remembering

**Case studies never mix with theory.** GS4 case studies carry `type: "Case study"` and tags
only under `Case Studies`. The app rejects anything else, with a reason.

**Categories come from `taxonomy.json`.** Nothing else defines them. Use the app's
**Categories** button to rename or merge — editing two rows to the same name merges them,
and every tagged question updates at once.

## Backups

Browser storage is wiped by clearing browsing data. `data/` under git is the real copy —
commit after any session where you added something.
