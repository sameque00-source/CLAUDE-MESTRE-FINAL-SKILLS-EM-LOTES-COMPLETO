# Domain: workflow
Source Skills in this domain: 2

---

## handoff

Source path: `references/workflow/handoff/SKILL.md`

# Handoff

## Overview

A handoff is a self-contained context package that lets a different person — or a
fresh AI agent — pick up in-progress work without re-deriving everything. Most
delegation fails not because the next person lacks skill, but because the *context*
in the originator's head never got written down: what's done, what's half-done, why
a path was abandoned, and what to do next. This skill produces a structured handoff
document that captures exactly that, so the receiver can be productive on their first
action instead of their tenth.

Use it across any domain in this library — engineering work, a PM initiative, a
compliance audit, a draft document — wherever work outlives a single working session.

## Use when

- **Switching off a task** — you started something and someone else (or future-you) will finish it.
- **Delegating to an agent** — handing a scoped task to a sub-agent or teammate who lacks your conversation history.
- **End of a session/shift** — async teams where the next person picks up cold.
- **Escalating** — passing a blocked item up or sideways with full context on what was tried.

## Clarify First

Before writing the handoff, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Receiver** — a teammate, a fresh AI agent, or future-you (sets how much background to spell out vs assume)
- [ ] **The goal + done-state** — what "finished" looks like for this work (anchors the Next Steps section)
- [ ] **Current state** — what is done, in-progress, and untouched right now (the heart of the handoff)
- [ ] **Constraints & landmines** — deadlines, decisions already made, paths already tried and abandoned (prevents the receiver repeating dead ends)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the handoff.

## Quick Start

```bash
# Gather objective state (git branch, recent commits, changed/untracked files) to seed the handoff
python scripts/handoff_context.py --repo . --format markdown
```

1. Run `handoff_context.py` to capture the objective state (git status, recent commits, changed files).
2. Fill the handoff template (`assets/handoff_template.md`) — lead with goal + current state, not history.
3. Make every open item **actionable**: a verb, a file/location, and the expected outcome.
4. List abandoned approaches and *why* — this is the highest-value, most-often-omitted section.
5. End with the single recommended next action so the receiver has zero ambiguity about step 1.

## The handoff structure

| Section | What it answers | Keep it to |
|---------|-----------------|-----------|
| **Goal & done-state** | Where are we headed and how do we know we're done? | 2-3 sentences |
| **Current state** | What's done / in-progress / untouched right now? | A checklist |
| **Next steps** | What should the receiver do, in order? | Ranked, actionable |
| **Decisions made** | What's already settled (don't relitigate)? | Bullets + one-line why |
| **Abandoned paths** | What was tried and ruled out, and why? | Bullets + reason |
| **Open questions / risks** | What's unresolved or could bite? | Bullets, flag owner |
| **Key locations** | Files, branches, dashboards, tickets, people | Links/paths |

## Anti-patterns

- **Narrating history instead of state.** The receiver needs "where we are," not a chronological diary. Lead with current state.
- **Vague next steps.** "Continue the integration" is not actionable. "Wire `auth.py:42` to the new token endpoint; expect a 200 with a JWT" is.
- **Omitting abandoned paths.** If you don't say "we tried X, it failed because Y," the receiver wastes hours rediscovering it.
- **Dumping the whole conversation.** A handoff is a curated package, not a transcript. Summarize and link.
- **No single starting action.** Always end with the one thing to do first.

## Scope & Limitations

**In Scope:** Producing a structured, self-contained handoff document for in-progress work in any domain; capturing objective repo state via the helper script; making open work actionable for the receiver.

**Out of Scope:** Project status reporting to stakeholders (`project-management/execution/status-update-generator/`); incident post-mortems (`project-management/execution/post-mortem/`); onboarding a new hire to a whole role (`hr-operations/`, `project-management/career/pm-onboarding/`). A handoff is about one body of in-flight work, not a person's full ramp-up.

## References

- `assets/handoff_template.md` — fill-in-the-blanks handoff document.
- `scripts/handoff_context.py` — captures git branch, recent commits, and changed/untracked files as a seed block.

---

## skill-router

Source path: `references/workflow/skill-router/SKILL.md`

# Skill Router

## Overview

This library has hundreds of skills across sixteen domains. A user rarely knows the
exact skill name — they know their *intent* ("I need to figure out what to build
next quarter," "I have to respond to a data breach"). The router closes that gap: it
matches a free-text request against every skill's description and tags, ranks the
candidates, and recommends the best fit — so the right skill activates on the first
try instead of the user grepping folders or guessing.

It is the **user-invoked orchestrator** in the two-tier model: it never does the work
itself, it routes to the skill (the discipline) that does. Treat its output as a
recommendation, then activate the chosen skill.

## Use when

- **Vague intent** — the user describes a goal but not which skill ("help me plan a launch").
- **Cross-domain ambiguity** — the request could plausibly live in several domains (is "pricing" PM, finance, or business-growth?).
- **Discovery** — the user asks whether a skill exists for X before assuming there isn't one.
- **Disambiguation** — several similarly named skills exist (e.g. multiple PRD or CRO skills) and you need the closest match.

## Clarify First

Before routing, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The actual goal** — the outcome the user wants, in their words (the router matches intent, so a vague goal yields vague matches)
- [ ] **Artifact vs advice** — do they want to *produce* something or *decide/understand* something (separates generative skills from advisory ones)

Stop rule: if the request is already specific, skip the questions and route directly.

## Quick Start

```bash
# Recommend the best-fit skills for an intent
python scripts/route_skill.py "plan a go-to-market for a new B2B feature"

# Narrow to a domain, or widen the result set
python scripts/route_skill.py "respond to a data breach" --top 5
python scripts/route_skill.py "forecast revenue" --domain finance --format json
```

1. Run `route_skill.py "<the user's goal>"` against the generated catalog (`cli/skills.json`).
2. Review the ranked candidates and their match reasons.
3. Pick the top fit (or present the top 2-3 if genuinely ambiguous) and **activate that skill** — do not do the work in the router.
4. If nothing scores well, say so plainly and suggest the closest domain rather than forcing a weak match.

## How matching works

The script scores each skill by term overlap between the query and the skill's
`name`, `tags`, `domain`, and `description`, weighting exact name/tag hits highest.
It reads the catalog from `cli/skills.json` (regenerated by `scripts/build_manifest.py`),
so it always reflects the current library without hardcoding any skill list.

## Anti-patterns

- **Doing the work instead of routing.** The router recommends; the recommended skill executes. Don't blur the two.
- **Forcing a match.** If the top score is weak, say "no strong fit" — a confidently wrong route is worse than an honest miss.
- **Ignoring the artifact-vs-advice split.** Routing a "produce a PRD" intent to an advisory persona (or vice-versa) wastes the user's time.
- **Hardcoding skill names.** Always read the live catalog; the library changes.

## Scope & Limitations

**In Scope:** Matching a free-text intent against the skills catalog and recommending the best-fit skill(s); disambiguating similar skills; confirming whether a skill exists for a goal.

**Out of Scope:** Executing the matched skill's workflow (that's the target skill's job); multi-skill workflow orchestration across a sequence (see `standards/` orchestration protocol and `agents/personas/`); installing or extracting skills.

**Dependency note:** the router reads the repo-level catalog `cli/skills.json`. It is a navigation aid for use *within* the library, not a standalone single-skill download — if the catalog is absent, point the script at it with `--catalog <path>` or regenerate it with `python scripts/build_manifest.py`.

## References

- `scripts/route_skill.py` — intent-to-skill scorer over `cli/skills.json`.
