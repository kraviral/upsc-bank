# UPSC Answer Skeleton Bank

A local study tool. `index.html` is a fixed renderer; everything else is data.
The renderer is never regenerated per question — only `data/` changes.

## Layout

```
index.html                    renderer. Do not put question data in here
data/manifest.json            schemaVersion, taxonomy filename, paper → files
data/taxonomy.json            the controlled vocabulary. Nothing else defines categories
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
  "tags": [["Topic","Sub-topic"], ["Other Topic","Other Sub-topic"]],
  "decode": { "directive": "", "demands": [], "hidden": "", "limit": "", "concepts": [] },
  "intros": [{ "type": "", "text": "" }],
  "sections": [{ "heading": "", "framework": "", "why": "", "points": [], "off": [], "valueAdd": [] }],
  "conclusions": [{ "type": "", "text": "" }],
  "diagram": "", "caption": "",
  "vaBank": { "quotes": [], "keywords": [], "examples": [], "thinkers": [] },
  "pitfalls": [], "notes": ""
}
```

`paper` ∈ Essay, GS1, GS2, GS3, GS4. Exactly 3 intros and 3 conclusions.
`points` are single-line stems to expand in the exam, never paragraphs.
`framework` is a short name — it renders as a highlighted tag; the explanation goes in `why`.
`diagram` is ASCII using only `- | + v ^` and letters; box-drawing characters misalign.
`notes` belongs to the user. Never overwrite a non-empty `notes` when regenerating a question.

## Rules that must hold

1. **Case studies are separate.** A GS4 case study has `type: "Case study"` and tags **only** under topic `Case Studies`. Never cross-tag it into Foundations or Public Administration. A theory question must never carry a `Case Studies` tag. No other paper may use that topic.
2. **Tag into every category that fits**, not just the closest one. Multi-tagging is by reference — one object, many tags.
3. **Use existing categories from `taxonomy.json`.** If nothing fits, propose a new one and ask before adding it. Silent invention fragments the bank ("Citizen's Charter" vs "Citizens Charter").
4. **Never fabricate** a quote, attribution, statistic, scheme name, case citation or news event. Mark uncertainty inline with `[verify]`.
5. **Deterministic files.** Sort questions by `id`, sort object keys, 2-space indent — so git diffs stay readable.
6. **Adding is upsert by `id`.** Same id replaces; new id appends.

## Adding a question

1. Generate the skeleton per the schema above.
2. Append or replace it in the right `data/` file — case studies to `gs4-case-studies.json`.
3. If a tag is new and approved, add it to `data/taxonomy.json` too.
4. Re-serialise the whole file deterministically.
5. Validate: the file parses, `paper` is valid, rule 1 holds, intros and conclusions are 3 each.

## Skill

The answer-generation guidance lives in `.claude/skills/`. Read it before generating —
it holds the framework libraries, the value-addition bank, and the directive-word mapping.
Improve the skill rather than working around it.
