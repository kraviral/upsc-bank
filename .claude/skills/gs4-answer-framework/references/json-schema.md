# JSON output schema

Used when the user wants the skeleton in their offline HTML viewer rather than as prose. Return **only** the JSON object — no preamble, no markdown fences, no trailing commentary. The viewer parses the raw text and fails on anything else.

```json
{
  "id": "short-slug",
  "type": "Theory/Concept | Quote-based | Case study",
  "question": "full question text",
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
  "body": [
    {
      "heading": "sub-heading",
      "framework": "SHORT NAME — appears as a highlighted tag, keep under ~40 characters",
      "why": "one line on why this framework fits",
      "points": ["single-line stem", "single-line stem"],
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
  "pitfalls": ["trap specific to this question"]
}
```

## Rules

- `intros` and `conclusions`: exactly three each.
- `points`: single-line stems, not paragraphs — the viewer renders them as a list, and long prose defeats the purpose of a skeleton.
- `framework`: keep short. It renders as a highlighter-marked tag beside the heading; a full expansion belongs in `why`.
- `diagram`: use only `- | + v ^ >` and letters. Box-drawing characters (`─ │ ┌ ►`) misalign in monospace across platforms — the ASCII fallback always renders correctly.
- Case studies: map each sub-part `(a) (b) (c) (d)` to one `body` entry, using the sub-part label as the start of `heading`.
- Escape newlines inside `diagram` as `\n`. Everything must be valid JSON — one unescaped quote breaks the import.
- Omit optional keys entirely rather than passing empty strings.
