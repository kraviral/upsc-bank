# JSON output schema

Used when the user wants the skeleton in their HTML viewer rather than as prose. Return **only** the JSON object — no preamble, no markdown fences, no trailing commentary. The viewer parses the raw text and fails on anything else.

This schema is the same one the app's **Copy prompt** button hands to external AIs, and the same one `CLAUDE.md` documents. If you change one, change all three.

```json
{
  "id": "short-kebab-slug",
  "paper": "Essay | GS1 | GS2 | GS3 | GS4",
  "type": "Theory/Concept | Quote-based | Case study | Essay",
  "year": 2024,
  "question": "full question text",
  "summary": "one-sentence précis — GS4 case studies only",
  "tags": [["Topic", "Sub-topic"], ["Other Topic", "Other Sub-topic"]],
  "decode": {
    "directive": "what the directive word(s) oblige",
    "demands": ["demand 1", "demand 2"],
    "hidden": "the part most aspirants miss",
    "limit": "10 marks / 150 words",
    "concepts": ["concept", "concept"]
  },
  "intros": [
    { "type": "Shloka | Quote-based | Theory-linkage | Recent context | ...", "text": "2–3 lines" }
  ],
  "sections": [
    {
      "heading": "sub-heading",
      "frameworks": [
        {
          "name": "SHORT NAME — revealed only when this sub-heading is expanded, not shown collapsed",
          "why": "one line on why this framework fits",
          "points": [
            {
              "stem": "single-line stem",
              "keyword": "the term to actually deploy in that sentence",
              "evidence": "a datum, example, scheme, case or report that anchors it",
              "ethic": "GS4 ONLY — the theory, thinker or value it rests on; omit on other papers"
            }
          ]
        },
        { "name": "second, genuinely different lens", "why": "...", "points": [{ "stem": "...", "keyword": "...", "evidence": "..." }] },
        { "name": "third, genuinely different lens", "why": "...", "points": [{ "stem": "...", "keyword": "...", "evidence": "..." }] }
      ],
      "off": ["off-framework insight"],
      "valueAdd": ["Keywords: ...", "Theory: ...", "Anchor: ..."]
    }
  ],
  "conclusions": [
    { "type": "Quote-based | Theory-linkage + action | Broader goal", "text": "2–3 lines" }
  ],
  "diagram": "ASCII with \\n line breaks",
  "caption": "one line",
  "vaBank": { "quotes": [], "keywords": [], "examples": [], "thinkers": [] },
  "pitfalls": ["trap specific to this question"],
  "notes": ""
}
```

## Rules

- **`paper` is required** and must be one of the five exact strings. The viewer rejects anything else, and a skeleton without it cannot be filed.
- **The body array is called `sections`**, not `body`. The viewer still accepts `body` as a legacy alias and writes back `sections`, but do not emit `body` in new output.
- `intros` and `conclusions`: exactly three each.
- `frameworks`: exactly three per `sections` entry, each self-contained with its own `points`. Order the strongest fit first — the viewer shows it by default and lets the reader switch to the other two.
- `points`: objects, not bare strings. `stem` is a single line, never a paragraph — long prose defeats the purpose of a skeleton. `keyword` and `evidence` are what make the stem scoreable: the term to deploy, and the datum, example, scheme, committee, case or report that anchors it. `ethic` is GS4-only and names the theory, thinker or value the point rests on. Vary the evidence across a section; four points leaning on one report is one point. A bare string is still read as `{stem}` with the rest empty — that is what the bank held before substantiation — but never emit that form in new output.
- `name` (inside each framework): keep it short. It renders as a highlighter-marked tag, but only once the reader expands that sub-heading — never shown next to the collapsed heading. A full expansion belongs in `why`.
- `off` and `valueAdd` sit on the `sections` entry itself, not inside any one framework — they apply regardless of which of the three lenses is active.
- `tags` must come from `data/taxonomy.json`. Do not invent a category; propose it and ask. The viewer lists any unknown category and requires confirmation before adding it.
- `id` must be a real slug describing the question. Never return the literal placeholder — the viewer upserts by `id`, so a reused one replaces an existing question. It will warn and name what it would replace, but do not rely on that.
- `notes` belongs to the user. Emit `""` for a new question, and never overwrite a non-empty `notes` when regenerating an existing one.
- `summary`: required for GS4 case studies, a single sentence. The viewer shows this collapsed with the full `question` behind an expand — write it so it stands alone. Omit the key entirely for everything else.
- `diagram`: use only `- | + v ^ >` and letters. Box-drawing characters (`─ │ ┌ ►`) misalign in monospace across platforms; the ASCII fallback always renders correctly. Escape newlines as `\n`.
- Case studies: map each sub-part `(a) (b) (c) (d)` to one `sections` entry, using the sub-part label as the start of `heading`.
- Everything must be valid JSON — one unescaped quote breaks the import.
- Omit optional keys entirely rather than passing empty strings, except `notes`.
