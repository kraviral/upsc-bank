---
name: mains-answer-framework
description: Generates an exam-ready answer skeleton (not a model answer) for any UPSC Civil Services Mains paper — Essay, GS1, GS2, GS3, and GS4 Ethics including case studies. Produces a decode of the directive word, three typed introduction options, body sub-headings each with three self-contained thinking-framework options, diverse examples, keywords and thinkers, three typed conclusion options, an easy-to-draw diagram, and a value-addition bank. Use this whenever the user pastes a UPSC Mains question, mentions Essay, GS1, GS2, GS3, GS4, General Studies, Ethics Integrity and Aptitude, an ethics case study, or asks how to structure, frame, or approach a Mains answer — even if they only paste the bare question with no instructions, and even if they say "answer this" rather than "structure this".
---

# Mains Answer Framework

Build a **thinking skeleton** for a UPSC Mains question. The user writes the prose in the exam hall; you supply the structure, the frameworks that let them generate points on the spot, and the value-addition raw material.

Never write a finished model answer unless the user explicitly asks for one. A skeleton the user can internalise is worth more than prose they can only copy, because in the exam they will have neither this output nor their memory of specific points — only the frameworks.

## Routing — read the paper file first

The invariants below hold for every paper. The framework libraries, value banks, and paper-specific traps live in `references/`. **Load the one that matches before you start structuring**, and consult it rather than working from recall — the point is breadth the user has not already seen.

| Paper | Load |
|---|---|
| Essay | `references/essay.md` |
| GS1 — History, Geography, Society | `references/gs1.md` |
| GS2 — Polity, Governance, IR, Social Justice | `references/gs2.md` |
| GS3 — Economy, Agriculture, Environment, S&T, Security | `references/gs3.md` |
| GS4 — Ethics, theory and case studies | `references/gs4.md`, then `gs4-frameworks.md` and `gs4-value-bank.md` |

If the paper is ambiguous, decode first — the concepts being tested usually settle it. A question can look like GS2 governance and be GS4 probity; the giveaway is whether the answer turns on institutional design or on the values of the person inside the institution.

## Step 0 — Decode before structuring

Open with a compact decode block, maximum six lines:

- **Question type** — Theory/Concept | Quote-based/Philosophical | Case Study | Essay
- **Directive word(s)** and what each obliges (*discuss* ≠ *examine* ≠ *critically analyse* ≠ *elucidate* ≠ *substantiate*). The directive-word table is in `gs4-frameworks.md` §4 and applies to every paper.
- **Core demands**, numbered — what the directive literally asks for
- **Enabling demands** — what the answer needs in order to stand, though the question never says so: the premise that must be established before it can be challenged, the terms that must be distinguished, the way forward, the verdict. See the coverage check in Step 2.
- **Hidden demand**, if any — the part most aspirants miss. Whatever you write here must end up as an actual sub-heading; naming it and then not covering it means you decoded the question without answering it.
- **Marks / word limit** — assume 10 marks / 150 words unless stated; 15 marks / 250 words for longer GS questions; GS4 case studies 20 marks / 250 words; Essay 125 marks / 1000–1200 words
- **Concepts being tested** — the 2–4 syllabus concepts actually in play

The decode drives everything after it. Sub-headings come from the demands and the directive word, never from a fixed template.

Scale to the word limit. At 150 words: 2–3 sub-headings, 3 points each. At 250 words: 3–4 sub-headings. An essay takes 5–7 movements.

## Step 1 — Introduction: exactly three options

Each captures the **essence** of the question in 2–3 lines. A definition alone is not an essence. Label each option with its type, and choose the three types that genuinely suit this question — the paper file lists which openings work for that paper.

- Attribute quotes accurately. If unsure of the source, write `[verify source]` rather than inventing an attribution — a misattributed quote in the exam costs more than a plain opening.
- Reject generic openers. Each option must be unusable for any other question.

## Step 2 — Body

### Sub-heading coverage — the commonest failure

Sub-headings must cover **both** the core demands and the enabling ones. A body that only mirrors the literal ask is the single most frequent way an otherwise good skeleton loses marks: the question is answered narrowly and the examiner sees a list where an argument was wanted.

Run this check on every question:

1. **Does the question assert something before asking you to judge it?** Then one sub-heading must establish why that thing matters, or the critique has nothing to push against. A prompt calling X the "soul" of Y needs a section on what X actually contributes, *before* the section on its problems.
2. **Does it turn on two or more concepts?** Separate what each distinctly contributes.
3. **Does it name a condition or constraint** — "in a resource-constrained environment", "in a federal polity", "in the digital age"? Give it its own treatment, not a passing clause.
4. **Does it ask about challenges, problems, tensions, conflicts, or dilemmas?** Then the answer needs a **way forward** — how the official actually resolves or manages them. This is almost never stated in the question and is almost always required.
5. **Does the directive demand a verdict** (*evaluate*, *critically examine*, *do you agree*, *to what extent*)? Then a sub-heading must carry the reasoned position, not merely a survey.

One core demand still needs 3–4 sub-headings. "Evaluate the challenges" answered as three kinds of challenge is a list, not an answer.

Where a paper file mandates a fixed body sequence — a GS4 case study, or a question with labelled sub-parts — **that sequence governs and this check adds nothing to it**. The sequence already satisfies the check: the course of action *is* the way forward, and the decision *is* the verdict.

### Under each sub-heading

Give all four of:

**(a) Frameworks — three options, not one.** Each is a self-contained thinking lens that generates points on the spot when memory fails: name it, expand any acronym, state in one line why it fits *this* sub-heading, and give it **its own** 3–5 points. Pick three genuinely different lenses from the paper's framework library — never three renamings of the same idea. List the strongest fit first; it is the default the reader sees, the other two are alternatives to swap in. Never force-fit: if a third good lens does not exist, replace it with a straightforward logical progression of points, labelled as that rather than mislabelled as a framework. A forced framework produces padding, which examiners read as filler.

**(b) Points** — under each of the three frameworks, 3–5 bullet stems mapped to *that* framework, one line each, expandable into 2–3 lines in the exam. Because the three frameworks are different lenses, their point sets should read as genuinely different treatments of the sub-heading, not the same points relabelled.

**(c) Off-framework points** — 1–2 strong insights that fit none of the three frameworks but are too good to drop. These sit at the sub-heading level, not under any one framework.

**(d) Value addition** for that sub-heading, also at the sub-heading level and shared across all three frameworks. What counts as value addition differs by paper — see the paper file. Universally: 1–2 keywords, 1 theory or thinker, 1 anchor (constitutional, institutional, or data), 1–2 examples.

### Example diversity rule

Across the whole answer, examples must span at least four of these five buckets, and no bucket may be used more than twice:

1. Leaders and public figures
2. Mythology, scripture, literature
3. Practitioners in the field — civil servants, scientists, entrepreneurs, activists
4. Everyday or personal life — one relatable micro-example
5. Recent current affairs (last 12–18 months)

Aspirants default to the same two or three names in every answer, which is exactly what makes an answer look interchangeable. If unsure of a fact, date, or scheme name, flag it `[verify]` instead of asserting it.

## Step 3 — Conclusion: exactly three options

2–3 lines each, forward-looking, no new arguments. Label the type. The paper file lists the closes that suit it. Universally available: an accurately attributed quote, a theory-linkage carrying a course of action, a broader-goal linkage, and an aspirational-normative picture.

## Step 4 — Diagram

Give one diagram only if it genuinely adds value. It must be reproducible with a pen in under 60 seconds: labels and simple lines, no shading or artwork. Render it in ASCII so the layout is visible, using only `- | + v ^ >` and letters — box-drawing characters misalign across platforms. Add a one-line caption.

Prefer: flowchart · virtuous/vicious cycle · 2×2 matrix · pyramid · iceberg model · two-pole spectrum · tree · Venn · timeline · rough map sketch.

If nothing helps, say "no diagram needed" with a one-line reason. A decorative diagram costs exam time and earns nothing.

## Step 5 — Value Addition Bank

Close with leftovers that fit the question but did not make the skeleton: 3 quotes, 3 keywords, 2 examples, 1 thinker. This gives the user swap-in material for repeat practice on the same question.

## Step 6 — Common pitfalls

Three bullets naming the traps *this specific* question invites. The paper file lists that paper's recurring traps, but tie each one to the question at hand — generic pitfalls help nobody.

## Output rules

- Markdown, with tables where they compress information.
- Bullets and stems, not paragraphs — the user writes the prose.
- Never fabricate a quote, attribution, statistic, scheme name, case citation, report, or news event. Flag uncertainty inline with `[verify]`.
- Tight enough to revise in five minutes.
- No example, keyword, or thinker repeated in more than one place.

## Handling variations

- **Multiple questions pasted at once**: produce a full skeleton for each, in sequence.
- **User asks for a full model answer**: write it, but lead with the skeleton so they can see the scaffolding underneath.
- **User asks only for intros, or only for a diagram**: give just that part, at the same quality bar.
- **User pastes their own written answer for review**: build the skeleton first, then evaluate their answer against it — what they covered, what they missed, where value addition was thin.
- **Question straddles two papers**: keep the lens of the paper it was actually set in dominant; the other paper's material supports the argument rather than replacing it.
- **User asks for JSON, the interactive version, or the skeleton bank**: return only a JSON object per `references/json-schema.md` — no prose, no markdown fences. The user pastes it into their HTML viewer, which fails on anything but bare JSON.

## Writing into the bank

When the user asks you to *add* a question to their bank rather than just answer it, follow `CLAUDE.md` in the project root: pick tags from `data/taxonomy.json` only, ask before inventing a category, upsert by `id` into the right `data/` file, and re-serialise deterministically. Check the id does not already belong to a different question before writing.
