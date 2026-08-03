# Adding a question

Five ways in, plus one that looks like a sixth and will bite you. Pick by what you're doing:
**Claude Code** for the best skeleton, **Copy prompt → Add** for volume, and the rest for repair.

| Method | Best for | Validates? | Writes to |
|---|---|---|---|
| 1. Claude Code | quality, one at a time | yes, before writing | `data/` directly |
| 2. External AI → **Add** | bulk, several at once | yes, on paste | browser draft |
| 3. External AI → drop file | several files at once | yes, on drop | browser draft |
| 4. **New** button | repairing or extending | live banner only | browser draft |
| 5. Editing `data/*.json` | one-word typo fixes | nothing | `data/` directly |

Anything writing to the *browser draft* needs a **Save** afterwards to reach the repo.

---

## Method 1 — Ask Claude Code

1. `git pull` — the app may have committed since you last worked locally.
2. In the project folder, paste the question and say "add this to the bank."
3. It loads the skill, decodes the question, picks tags from `data/taxonomy.json`, and stops
   to ask if nothing fits rather than inventing a category.
4. It writes the right `data/` file and re-serialises it deterministically.
5. Reload the browser.

The only path where the generator can read your existing taxonomy, check the `id` against
what is already there, and validate before writing. No copy-paste step to corrupt anything.

**Catch** — nothing appears in the browser until you reload, and an unsaved browser draft wins
for any overlapping `id`. Save or discard in the app first.

## Method 2 — External AI, paste into Add

1. **Copy prompt** → click the paper chip (Essay / GS1 / GS2 / GS3 / GS4-theory / GS4-case).
   It defaults to whatever question is on screen.
2. **Copy**. Your live taxonomy for that paper is baked into the text.
3. Paste into ChatGPT, Gemini or Claude, then paste your question underneath it.
4. Copy the JSON it returns.
5. **Add** → paste → **Save**. Markdown fences are stripped automatically.
6. If an `id` already exists or a category is unknown, the dialog lists exactly what it would
   replace or add and the button becomes **Save anyway**. Read it before clicking.
7. **Save** → **Commit**.

Paste an array `[{...},{...}]` to import several questions in one go.

## Method 3 — External AI, drop the file

As Method 2, but save the output as a `.json` file in `incoming/` and drag it onto the window.

You can drop several files at once and get **one** combined confirmation covering every id
collision and new category across all of them, rather than one dialog per file.
`incoming/` is gitignored, so scratch files never reach the repo.

## Method 4 — Type it by hand with New

1. **New** — an empty question appears at the top of the tree, defaulted to
   **GS4 / Theory/Concept** with a generated id like `q-1785353882532`. With no tags it sits
   under **Unfiled**.
2. **Edit question** → paper, type, year, marks, question text, tags.
3. **Edit all** → add sub-headings, then three framework options under each.
4. **Save** → **Commit**.

Slow, and not what the app is for. Use it to fix or extend an existing skeleton.

## Method 5 — Edit `data/*.json` directly

`git pull`, add your object to the array, keep it sorted by `id` with 2-space indent, reload.

Only worth it for a typo. Nothing validates you, and a stray comma silently breaks the whole
file's load.

## Not a method: Import

**Import** takes a *whole bank* and **replaces everything currently loaded**. Paste a single
question into it and it correctly refuses, pointing you at Add. Treat it as disaster recovery.

---

# Things to keep in mind

### Saving is not automatic

Edits live in the browser draft until you press **Save**. The title bar reads `unsaved` while
that is true. Methods 2, 3 and 4 all leave you there — the question is in the app, not the repo.

### The two directions of staleness

- **App → local**: an in-app Save commits to GitHub, so your clone falls behind with no local
  sign of it. `git pull` before Methods 1 or 5.
- **Local → app**: a `git pull` or hand-edit is only picked up when the browser draft is clean.
  Save first, or the draft shadows the file for any overlapping `id`.

### Ids are how replacement works

Same `id` replaces, new `id` appends. An AI that copies `"id": "short-slug"` from the template
will try to overwrite a real question. The app names what it would replace — read that line.

### Don't let an AI invent categories

This is why the prompt embeds your taxonomy. If a new category shows up in the confirmation,
decide deliberately: adding "Citizens Charter" beside "Citizen's Charter" splits the branch
permanently. Fix it with **Categories** — editing two rows to the same name merges them and
updates every tagged question at once.

### Case studies have three hard rules

`type: "Case study"`, **exactly one** tag under `Case Studies` naming the single dominant
dilemma, and a one-line `summary`. Import rejects anything else, and the sheet shows a red
banner live if an edit breaks it. That banner is the same validator that gates imports.

### Structural counts are enforced

Exactly 3 intros, 3 conclusions, and 3 frameworks per sub-heading. The framework
**+ Add** button greys out at 3.

### One category per question

`tags` holds a single `[Topic, Sub-topic]` pair, so every question appears exactly once in the
tree and the branch counts are real. Choose what the question is *about* rather than everything
it touches — the subject, not the mechanism.

Finding a question from a different angle is the **search box's** job. It indexes the question
text, the decode, every framework and point, the pitfalls and the whole value-addition bank, so
a question is reachable by any thinker, keyword or example inside it regardless of its tag.

### Points carry their own substantiation

A point is no longer a bare line. Each one holds a **keyword** — the term to actually deploy in that
sentence — and **evidence**, a datum, example, scheme, committee, case or report that anchors it. GS4
adds a third, **ethic**: the theory, thinker or value the point rests on, because GS4 is marked on
ethical reasoning rather than administrative common sense.

The viewer shows them inline after the stem: keyword in green `‹like this›`, evidence in grey italic,
the GS4 ethic in red. In edit mode each point gains `key` / `evi` / `eth` fields underneath it.

Older answers written before this change hold plain strings, and still render and edit fine — they
simply show a stem with empty substantiation fields waiting to be filled.

### `[verify]` means verify

Every prompt instructs the AI to flag uncertain quotes, statistics, scheme names and judgments
rather than assert them. Check anything marked `[verify]` before relying on it — a wrong
Article number or a misattributed quote costs more marks than omitting it.

### The repo is public

Anything typed into **My notes** is world-readable. That field is not a private scratchpad.

### Other devices lag a few minutes

Pages serves through a CDN. After saving on the laptop, a phone may show the old bank briefly.
Reload after a couple of minutes.
