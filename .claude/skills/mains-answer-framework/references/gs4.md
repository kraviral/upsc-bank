# GS4 — Ethics, Integrity and Aptitude

Load `gs4-frameworks.md` when choosing frameworks and `gs4-value-bank.md` when populating value addition. This file holds what is specific to GS4 on top of the shared skeleton in `SKILL.md`.

## What GS4 actually rewards

The paper is not testing whether the candidate is a good person. It is testing whether they can name an ethical problem precisely, hold two defensible positions at once, and then decide. Administrative grounding is what separates a GS4 answer from a school essay on values — every ethical claim should land somewhere a civil servant can act.

## Intro types that suit GS4

Quote-based · Theory-linkage · Definition of the core concept · Sanskrit shloka or doha (Kabir, Rahim, Tulsidas, Thirukkural) · Recent context or news hook · Philosophical or religious tradition · Real incident or vignette · Contrast/paradox statement

- For a shloka or doha, give the original line **and** a one-line meaning.
- Reject generic openers ("Ethics is the science of morality…"). If an opening would fit any other GS4 question, it earns nothing.

## Conclusion types that suit GS4

- **Quote-based**, accurately attributed
- **Theory-linkage with a course of action** — Gandhi's talisman or golden mean, sarvodaya through antyodaya, Aristotle's habituation of virtue, Kant's kingdom of ends
- **Broader-goal linkage** — constitutional morality and Preambular values, SDG 16, 2nd ARC's vision of ethical governance
- **Aspirational-normative** — what the ideal civil servant or society should look like

## Value addition for a GS4 sub-heading

- 1–2 ethical keywords (moral myopia, moral muteness, cognitive dissonance, normalization of deviance, bounded ethicality, dharma-sankat, letter vs spirit of law, ethical fading, knowing–doing gap)
- 1 theory or thinker
- 1 constitutional or governance anchor where relevant (constitutional morality, rule of law, Preambular values, Nolan principles, 2nd ARC, Citizen's Charter, RTI)
- 1–2 examples

## Case study body

If the question is a case study, replace the generic body with this sequence, still giving three framework options and value addition under each stage. Also write a one-sentence `summary` — a précis of the fact pattern that stands alone, since the viewer shows it collapsed with the full case behind an expand.

1. Facts and the core ethical dilemma — one line each, no retelling of the case
2. Stakeholders and their legitimate claims — table: stakeholder → stake → duty owed
3. Ethical issues involved — named as concepts, not narrated
4. Options available — for each: merits, demerits, and the ethical principle it serves
5. Best course of action — decision first, then justification, then implementation split into immediate / short-term / long-term
6. Values demonstrated by the chosen course

If the question carries labelled sub-parts (a) (b) (c) (d), map each sub-part to one section instead, and start the heading with the sub-part label.

Decision-test frameworks for this branch are in `gs4-frameworks.md` §3 — Kidder's paradigms, PLUS filter, Blanchard–Peale, front-page test, legality → morality → practicality → sustainability.

**The decision must be a decision.** Name one course of action and defend it. An answer that surveys options and declines to choose scores in the bottom half however balanced it sounds.

## Bank rules specific to GS4

These are enforced by the viewer's validator, so getting them wrong means the import is rejected:

- A case study has `type: "Case study"` and tags **only** under the topic `Case Studies` — exactly one tag, naming the single dominant dilemma the case is built around, not every issue present in the fact pattern.
- A theory question must never carry a `Case Studies` tag, and no paper other than GS4 may use that topic.
- Case studies go in `data/gs4-case-studies.json`, theory in `data/gs4-theory.json`.
- A case study without a `summary` will be rejected.

## Recurring GS4 traps

- Defining instead of analysing — the definition is the first line, not the answer.
- Moralising without administrative grounding: "he should be honest" is not a course of action.
- Ignoring the "critically" in the directive and producing an unbroken defence.
- Retelling the case study back to the examiner who wrote it.
- Hedging the decision in a case study.
- The same three examples (Gandhi, Kalam, a nameless "honest officer") that appear in every candidate's answer.
