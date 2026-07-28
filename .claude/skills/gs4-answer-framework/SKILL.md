---
name: gs4-answer-framework
description: Generates an exam-ready answer skeleton (not a model answer) for UPSC Mains GS Paper IV Ethics questions — theory/concept questions, quote-based or philosophical questions, and case studies. Produces a decode of the directive word, three typed introduction options, body sub-headings each with a thinking framework and points, diverse examples, ethical keywords and thinkers, three typed conclusion options, an easy-to-draw diagram, and a value-addition bank. Use this whenever the user pastes a UPSC Ethics or GS4 question, mentions GS4, GS Paper 4, Ethics Integrity and Aptitude, an ethics case study, or asks how to structure, frame, or approach an ethics answer — even if they only paste the bare question with no instructions, and even if they say "answer this" rather than "structure this".
---

# GS4 Answer Framework

Build a **thinking skeleton** for a UPSC Mains GS4 question. The user writes the prose in the exam hall; you supply the structure, the frameworks that let them generate points on the spot, and the value-addition raw material.

Never write a finished model answer unless the user explicitly asks for one. A skeleton the user can internalise is worth more than prose they can only copy, because in the exam they will have neither this output nor their memory of specific points — only the frameworks.

Load `references/frameworks.md` when choosing frameworks for the body, and `references/value-bank.md` when populating value addition. Consult them rather than working from recall alone — the point is breadth the user hasn't already seen.

## Step 0 — Decode before structuring

Open with a compact decode block, maximum six lines:

- **Question type**: Theory/Concept | Quote-based/Philosophical | Case Study
- **Directive word(s)** and what each obliges (*discuss* ≠ *examine* ≠ *critically analyse* ≠ *elucidate* ≠ *substantiate*)
- **Core demands**, numbered — every distinct thing asked
- **Hidden demand**, if any — the part most aspirants miss
- **Marks / word limit** — assume 10 marks / 150 words unless stated; case studies 20 marks / 250 words
- **Concepts being tested** — the 2–4 syllabus concepts actually in play

The decode drives everything after it. Sub-headings come from the demands and the directive word, never from a fixed template.

Scale to the word limit. At 150 words: 2–3 sub-headings, 3 points each. At 250 words: 3–4 sub-headings.

## Step 1 — Introduction: exactly three options

Each captures the **essence** of the question in 2–3 lines. A definition alone is not an essence. Label each option with its type; choose the three types that genuinely suit this question:

Quote-based · Theory-linkage · Definition of the core concept · Sanskrit shloka or doha (Kabir, Rahim, Tulsidas, Thirukkural) · Recent context or news hook · Philosophical or religious tradition · Real incident or vignette · Contrast/paradox statement

- Attribute quotes and shlokas accurately. If unsure of the source, write `[verify source]` rather than inventing an attribution — a misattributed quote in the exam costs more than a plain opening.
- For a shloka or doha, give the original line **and** a one-line meaning.
- Reject generic openers ("Ethics is the science of morality…"). Each option must be unusable for any other question.

## Step 2 — Body

Derive sub-headings from the demands. Under each, give all four of:

**(a) Framework** — one thinking lens that generates points on the spot when memory fails. Name it, expand the acronym, and state in one line why it fits *this* sub-heading. Pick from `references/frameworks.md` or invent a question-specific one. Never force-fit: if no framework suits, say so and give a logical progression of points instead. A forced framework produces padding, which examiners read as filler.

**(b) Points** — 3–5 bullet stems mapped to the framework, one line each, expandable into 2–3 lines in the exam.

**(c) Off-framework points** — 1–2 strong insights that don't fit the framework but are too good to drop. Mark them clearly.

**(d) Value addition** for that sub-heading:
- 1–2 ethical keywords (moral myopia, moral muteness, cognitive dissonance, normalization of deviance, bounded ethicality, dharma-sankat, letter vs spirit of law…)
- 1 theory or thinker
- 1 constitutional or governance anchor where relevant (constitutional morality, rule of law, Preambular values, Nolan principles, 2nd ARC, Citizen's Charter, RTI)
- 1–2 examples

### Example diversity rule

Across the whole answer, examples must span at least four of these five buckets, and no bucket may be used more than twice:

1. Leaders and public figures
2. Mythology and scripture
3. Civil servants
4. Everyday or personal life — one relatable micro-example
5. Recent current affairs (last 12–18 months)

Aspirants default to the same two or three names in every answer, which is exactly what makes an answer look interchangeable. If unsure of a fact, date, or scheme name, flag it `[verify]` instead of asserting it.

### Case study body

If the question is a case study, replace the generic body with this sequence, still giving a framework and value addition under each stage:

1. Facts and the core ethical dilemma — one line each, no retelling of the case
2. Stakeholders and their legitimate claims — table: stakeholder → stake → duty owed
3. Ethical issues involved — named as concepts, not narrated
4. Options available — for each: merits, demerits, and the ethical principle it serves
5. Best course of action — decision first, then justification, then implementation split into immediate / short-term / long-term
6. Values demonstrated by the chosen course

Decision-test frameworks for this branch are in `references/frameworks.md` (Kidder's paradigms, PLUS filter, Blanchard–Peale, front-page test, legality → morality → practicality → sustainability).

## Step 3 — Conclusion: exactly three options

2–3 lines each, forward-looking, no new arguments. Label the type. Use three of:

- **Quote-based**, accurately attributed
- **Theory-linkage with a course of action** — Gandhi's talisman or golden mean, sarvodaya through antyodaya, Aristotle's habituation of virtue, Kant's kingdom of ends
- **Broader-goal linkage** — constitutional morality and Preambular values, SDG 16, 2nd ARC's vision of ethical governance
- **Aspirational-normative** — what the ideal civil servant or society should look like

## Step 4 — Diagram

Give one diagram only if it genuinely adds value. It must be reproducible with a pen in under 60 seconds: labels and simple lines, no shading or artwork. Render it in text or ASCII so the layout is visible, with a one-line caption.

Prefer: flowchart · virtuous/vicious cycle · 2×2 matrix · pyramid · iceberg model · two-pole spectrum · tree · Venn.

If nothing helps, write "no diagram needed" with a one-line reason. A decorative diagram costs exam time and earns nothing.

## Step 5 — Value Addition Bank

Close with leftovers that fit the question but didn't make the skeleton: 3 quotes, 3 keywords, 2 examples, 1 thinker. This gives the user swap-in material for repeat practice on the same question.

## Step 6 — Common pitfalls

Three bullets naming the traps *this specific* question invites — defining instead of analysing, moralising without administrative grounding, ignoring the "critically" in the directive, retelling the case study, and so on. Generic pitfalls help nobody; tie each to the question at hand.

## Output rules

- Markdown, with tables where they compress information.
- Bullets and stems, not paragraphs — the user writes the prose.
- Never fabricate a quote, attribution, statistic, scheme name, or news event. Flag uncertainty inline with `[verify]`.
- Tight enough to revise in five minutes.
- No example, keyword, or thinker repeated in more than one place.

## Handling variations

- **Multiple questions pasted at once**: produce a full skeleton for each, in sequence.
- **User asks for a full model answer**: write it, but lead with the skeleton so they can see the scaffolding underneath.
- **User asks only for intros, or only for a diagram**: give just that part, at the same quality bar.
- **User pastes their own written answer for review**: build the skeleton first, then evaluate their answer against it — what they covered, what they missed, where value addition was thin.
- **Question is from GS4 but reads like GS2 (governance/probity)**: keep the ethical lens dominant; administrative detail supports the ethical argument rather than replacing it.
- **User asks for JSON, the interactive version, or the skeleton bank**: return only a JSON object per `references/json-schema.md` — no prose, no markdown fences. The user pastes it into their offline HTML viewer, which fails on anything but bare JSON.
