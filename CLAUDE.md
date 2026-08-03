# UPSC Answer Skeleton Bank

A local study tool. `index.html` is a fixed renderer; everything else is data.
The renderer is never regenerated per question — only `data/` changes.

## Layout

```
index.html                    renderer. Do not put question data in here
data/manifest.json            schemaVersion, taxonomy filename, paper → files
data/taxonomy.json            the controlled vocabulary. Nothing else defines categories
data/prompts.json             per-paper prompt bodies for the Copy prompt button
data/essay.json               array of question objects
data/gs1.json  gs2.json  gs3.json
data/gs4-theory.json          GS4 non-case-study questions
data/gs4-case-studies.json    GS4 case studies only
incoming/                     scratch. Files not yet merged into data/
```

Serve it, don't open it directly — a `file://` page cannot read `data/`:
`python -m http.server 8000` then open `http://localhost:8000`.

## Question schema

```json
{
  "id": "short-slug", "paper": "GS2", "type": "Theory/Concept", "year": 2023,
  "question": "full text",
  "summary": "one-line case-study précis — case studies only",
  "tags": [["Topic","Sub-topic"], ["Other Topic","Other Sub-topic"]],
  "decode": { "directive": "", "demands": [], "hidden": "", "limit": "", "concepts": [] },
  "intros": [{ "type": "", "text": "" }],
  "sections": [{
    "heading": "",
    "frameworks": [
      { "name": "", "why": "", "points": [{ "stem": "", "keyword": "", "evidence": "", "ethic": "" }] },
      { "name": "", "why": "", "points": [] },
      { "name": "", "why": "", "points": [] }
    ],
    "off": [], "valueAdd": []
  }],
  "conclusions": [{ "type": "", "text": "" }],
  "diagram": "", "caption": "",
  "vaBank": { "quotes": [], "keywords": [], "examples": [], "thinkers": [] },
  "pitfalls": [], "notes": ""
}
```

`paper` ∈ Essay, GS1, GS2, GS3, GS4. Exactly 3 intros and 3 conclusions.
A `point` is a single-line stem to expand in the exam, never a paragraph, and it carries its own
substantiation: `keyword` is the term to actually deploy, `evidence` a datum, example, scheme, case
or report that anchors it. `ethic` is GS4-only — the theory, thinker or value the point rests on.
A bare string is still accepted everywhere a point is read, since that is what the bank held before
substantiation; treat it as `{stem}` with the rest empty and fill it in when you next touch it.
Each section carries exactly 3 `frameworks` entries — self-contained alternative lenses, each with its own `name`, `why`, and `points`. List the strongest fit first; it renders as the default view, with the other two switchable in the viewer. The framework `name` is only revealed once the reader expands that sub-heading — never shown next to the collapsed heading itself. `off` and `valueAdd` sit at the section level, shared across all three framework options, since they don't depend on which lens is active.
`summary` is a one-sentence précis, required for case studies only (the viewer shows it collapsed, with the full `question` behind a "read the full case" expand).
`diagram` is ASCII using only `- | + v ^` and letters; box-drawing characters misalign.
`notes` belongs to the user. Never overwrite a non-empty `notes` when regenerating a question.
No string value contains a double quote. Quoted phrases, titles and scare quotes take single quotes
(`'source code'`, not `"source code"`) — a raw double quote ends the string early and the whole
skeleton fails to parse, which is the most common way a generated answer is lost outright.

## Rules that must hold

1. **Case studies are separate.** A GS4 case study has `type: "Case study"` and tags **only** under topic `Case Studies`. Never cross-tag it into Foundations or Public Administration. A theory question must never carry a `Case Studies` tag. No other paper may use that topic.
2. **Exactly one category per question.** `tags` holds a single `[Topic, Sub-topic]` pair — the one thing the question is actually *about*, not every category it touches. Pick the subject, not the mechanism: an essay on deferred responsibility is about ethics and character even though it argues through time, governance and the environment. Cross-cutting discovery is the search box's job, not the tree's; search covers the question, decode, frameworks, points and value bank. For a GS4 case study that single tag must sit under `Case Studies` and name the dominant dilemma.
3. **Use existing categories from `taxonomy.json`.** If nothing fits, propose a new one and ask before adding it. Silent invention fragments the bank ("Citizen's Charter" vs "Citizens Charter").
4. **Never fabricate** a quote, attribution, statistic, scheme name, case citation or news event. Mark uncertainty inline with `[verify]`.
5. **Deterministic files.** Sort questions by `id`, sort object keys, 2-space indent — so git diffs stay readable.
6. **Adding is upsert by `id`.** Same id replaces; new id appends.

## Before editing data/

The app's **Save** commits directly to GitHub, so the working tree may be behind without any
local sign of it. Run `git pull` before writing to `data/`, or you will be editing a stale
copy of a file that has already moved on.

## Adding a question

1. Generate the skeleton per the schema above.
2. Append or replace it in the right `data/` file — case studies to `gs4-case-studies.json`.
3. If a tag is new and approved, add it to `data/taxonomy.json` too.
4. Re-serialise the whole file deterministically.
5. Validate: the file parses, `paper` is valid, rule 1 holds, intros and conclusions are 3 each, every section has exactly 3 `frameworks`, and a case study's `tags` has exactly one entry.

## Skill

The answer-generation guidance lives in `.claude/skills/mains-answer-framework/`. Read it
before generating. `SKILL.md` holds the invariants that apply to every paper; the framework
library, value bank and traps for a specific paper live in `references/<paper>.md` — load the
one that matches. GS4 additionally has `gs4-frameworks.md` and `gs4-value-bank.md`.
Improve the skill rather than working around it.

Three files describe the same JSON shape: this file, `references/json-schema.md`, and
`data/prompts.json`. Change one and change all three, or they drift apart.
