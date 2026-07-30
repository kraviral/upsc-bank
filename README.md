# UPSC Answer Skeleton Bank

Answer skeletons for Essay and GS1–GS4 — structure and frameworks, not model answers.
`index.html` is a fixed renderer. All content lives in `data/`.

## Run it

**Double-click `start.bat` (Windows) or `start.command` (macOS).** Then open
`http://localhost:8000` if it doesn't open by itself.

Do not open `index.html` directly. A `file://` page is forbidden by the browser from
reading `data/`, so it would silently fall back to browser storage and ignore these files.
The label beside the title tells you which source it loaded: `repo` is correct.

Manual equivalent, from this folder:

```
python -m http.server 8000
```

Once the repo is published to GitHub Pages you can also open it from any device at the
Pages URL, including your phone. Reading needs nothing; only saving needs a token.

## Reading vs editing

The sheet opens in **read mode** — no buttons, just the skeleton. Hover any block and a small
**edit** control appears at its right; clicking it puts *only that block* into edit mode.
**Edit question** at the top does the same for the question text, tags and decode.
**Edit all** in the reveal bar turns everything on at once for a heavy authoring session.

## Daily loop

1. **Copy prompt** → pick the paper. The prompt is built there and then with your live
   taxonomy embedded, so an external AI cannot invent categories.
2. Paste it into ChatGPT, Gemini or Claude, then paste your question underneath.
3. Paste the JSON back into **Add**, or drop the file onto the window.
4. **Save** commits all eight `data/` files to GitHub as a single commit.

The app warns before it overwrites a question whose `id` already exists, and before it adds
any category that is not already in your taxonomy.

With Claude Code running in this folder, steps 2–4 collapse: ask it to add the question and
it writes `data/` directly. See `CLAUDE.md` for the rules it follows.

There are five ways in altogether, with different trade-offs and traps —
**[docs/adding-questions.md](docs/adding-questions.md)** covers each one step by step.

## Saving to GitHub

**Save** → **Connection**. You need a **fine-grained** personal access token from
`github.com/settings/personal-access-tokens`, scoped to this one repository with
`Contents: Read and write` and nothing else. Give it an expiry.

The token is kept in this browser's local storage only. It is never written into the repo,
so nobody reading the published page can see it. **Disconnect** removes it.

Each save is one commit, not eight. Before writing, the app compares the branch head against
the one this page loaded from; if something else has committed in the meantime it stops and
offers to reload or to overwrite, rather than silently clobbering the other change.

**Download files instead** is always available in the Save dialog if you would rather move
the eight files by hand.

### After saving from the app, pull before working locally

An in-app save commits straight to GitHub, so your local clone is immediately one commit
behind and does not know it. Run `git pull` before you ask Claude Code to touch `data/`,
or it will work from a stale copy and you will end up resolving a conflict by hand.

```
git pull
```

The reverse direction is already handled: the browser's draft stops shadowing the files once
you save, so a `git pull` or a hand-edit is picked up on the next page load.

## Layout

```
index.html                  renderer — no question data in here
CLAUDE.md                   project rules for Claude Code
docs/adding-questions.md    the five ways to add a question, and the traps
data/manifest.json          schema version, paper → files
data/taxonomy.json          the controlled vocabulary
data/prompts.json           per-paper prompt bodies for Copy prompt
data/essay.json             one file per paper
data/gs1.json  gs2.json  gs3.json
data/gs4-theory.json        GS4 theory questions
data/gs4-case-studies.json  GS4 case studies only
incoming/                   scratch, git-ignored
.claude/skills/mains-answer-framework/
    SKILL.md                invariants shared by every paper
    references/essay.md gs1.md gs2.md gs3.md gs4.md
    references/gs4-frameworks.md gs4-value-bank.md
    references/json-schema.md
```

## Three rules worth remembering

**Case studies never mix with theory.** GS4 case studies carry `type: "Case study"` and tags
only under `Case Studies` — exactly one. The app rejects anything else, with a reason, and
warns you live in the sheet if an edit puts a question into an invalid state.

**Categories come from `taxonomy.json`.** Nothing else defines them. Use the app's
**Categories** button to rename or merge — editing two rows to the same name merges them,
and every tagged question updates at once.

**Three files describe the JSON shape**: `CLAUDE.md`, `references/json-schema.md`, and
`data/prompts.json`. Change one and change all three, or they drift apart.

## Backups

Browser storage is a **draft buffer**, not a copy of the bank. It only overrides the repo
when it holds unsaved changes — the title bar says `unsaved` when it does. Once you save, the
draft stops shadowing the files, so a hand-edit or a `git pull` is picked up on next load.

The repo under git is the real copy. Save after any session where you added something.
