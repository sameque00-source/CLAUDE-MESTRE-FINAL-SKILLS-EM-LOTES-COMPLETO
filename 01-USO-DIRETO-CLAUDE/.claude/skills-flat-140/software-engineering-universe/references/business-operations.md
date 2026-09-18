# Domain: business-operations
Source Skills in this domain: 6

---

## capacity-planner

Source path: `references/business-operations/capacity-planner/SKILL.md`

# Capacity Planner

Turns headcount into hours you can actually commit. Most capacity plans fail the
same way: they count people instead of delivered hours, ignore ramp, and size
supply to fit the roadmap rather than the other way round. This skill computes
effective capacity independently, matches it against risk-adjusted demand, and
publishes the cut line.

## When to use this skill

- **Quarterly planning** — deciding what the team can commit to for the next 90 days
- **Testing a roadmap** — a stakeholder has a list and wants to know if it fits
- **Building a hiring ask** — quantifying a structural gap in hours and dollars
- **Hire vs contract vs defer** — choosing how to close a capacity shortfall
- **Mid-quarter replan** — the burn rate diverged and commitments need renegotiating
- **Onboarding impact** — modelling what three new hires actually deliver this quarter

## Inputs the skill expects

- Team roster: name, discipline, seniority, FTE, tenure in months
- Known absence: booked PTO days, on-call rotation weeks per person
- Overhead estimates: meeting load and non-delivery overhead as a percentage
- Working days and hours per day for the period
- Candidate commitments with discipline, hour estimate, confidence band, and priority
- For scenario work: demand curve per quarter, salary/contractor rates, start dates

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Is this a supply question or a demand question?** — sizing a hiring ask and testing a roadmap use different scripts and produce different artifacts
- [ ] **Who counts as delivery capacity?** — including managers, tech leads, or unfilled reqs at full FTE changes the answer by 10-40%
- [ ] **Are the estimates already risk-adjusted?** — applying the confidence inflation twice overstates demand by 40%+; applying it zero times understates it by the same
- [ ] **Is the buffer set from history or from intent?** — the unplanned-work reserve is the single largest lever on the cut line

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Model effective capacity

Establishes what the team can actually deliver, computed before anyone looks at
the roadmap. Run this first, always.

1. Build the roster: one entry per person, with real FTE and tenure in months. Use a negative `tenure_months` for someone who has not started yet.
2. Pull **booked** PTO, not average PTO. Q3 and Q4 are not average quarters.
3. Set `meeting_load_pct` from a calendar audit, not from memory — the gap is usually 5-10 points.
4. Run the model and check the effective-hours ratio against the sanity band in `references/capacity-benchmarks.md`: below 45% is structurally broken, above 80% is fiction.
5. Record the per-discipline effective hours — these are the inputs to Workflow 2.

```bash
python3 business-operations/capacity-planner/scripts/capacity_model.py \
  --input business-operations/capacity-planner/assets/sample_team.json \
  --format text
```

### Workflow 2 — Find the cut line

Matches risk-adjusted demand against capacity in priority order and reports what
does not fit.

1. List every candidate commitment with discipline, raw estimate, confidence band, and priority. Mark anything already promised externally with `"committed": true`.
2. Set the buffer from the trailing three quarters of actual unplanned hours. Default 20%; use 30% if the team owns customer-facing incidents.
3. Run the gap analysis and read the cut line, not the totals.
4. Escalate any `committed: true` item above the cut line **this week** — a promise you already know you will miss is a conversation, not a risk.
5. Publish the below-the-line list alongside the plan. That list is the deliverable.

```bash
python3 business-operations/capacity-planner/scripts/commitment_gap.py \
  --input business-operations/capacity-planner/assets/sample_commitments.json \
  --buffer-pct 20 --format text
```

### Workflow 3 — Compare hire, contract, and defer

Applies only to work below the cut line. Never use scenario analysis to justify
a plan that does not fit.

1. Build the demand curve per quarter for the horizon — at least four quarters, eight if the gap looks structural.
2. Define one scenario per realistic option, including a defer scenario as the zero-cost baseline.
3. Run the comparison and read four axes, not just cost: time to relief, cost per delivered hour, reversibility, and knowledge retention.
4. Sense-check the winner against the decision rule in `references/planning-methods.md`. A four-quarter horizon is systematically biased toward contracting because the hire/contract crossover falls at month 9-14.
5. Write the recommendation with its lead time attached. "Hire two engineers" relieves the quarter after next, not this one.

```bash
python3 business-operations/capacity-planner/scripts/scenario_compare.py \
  --input business-operations/capacity-planner/assets/sample_scenarios.json \
  --format json
```

## Decision frameworks

### Gross-to-effective conversion [PROVEN]

Planning figures for one fully-ramped IC over a 63-day quarter:

| Layer | Hours | Running total |
|-------|-------|---------------|
| Gross (63 d x 8 h) | 504 | 504 |
| Booked PTO (5 days) | -40 | 464 |
| On-call (2 weeks @ 40% loss) | -32 | 432 |
| Meetings + overhead (20%) | -86 | 346 |
| Unplanned-work buffer (20%) | -69 | **277 committable** |

**Use 270-300 committable hours per fully-ramped IC per quarter.** A tech lead
delivers 120-160; an engineering manager delivers 0. A mid-level hire starting on
day one of the quarter delivers 90-110.

### Which lever closes the gap

| Gap size | Persists beyond 4 quarters? | Lever | Time to relief |
|----------|----------------------------|-------|----------------|
| Any | — | **Cut scope** [PROVEN] | Immediate |
| Under 10% | No | **Reduce overhead** [PROVEN] | 2-4 weeks |
| 10-30% | No | **Defer**, with a named later slot | Immediate |
| 10-40% | No, work is separable | **Contract** [RECOMMENDED] | 1-3 weeks |
| Any | Yes | **Hire** [PROVEN for structural gaps] | 5-8 months |
| Large | Yes, needed within 2 quarters | **Hire + contract bridge** [RECOMMENDED] | 1-3 weeks, handover at Q+2 |

Consider them in this order. Reducing overhead is the highest-ROI lever and is
almost always skipped because it is nobody's job — recovering 8% of effective
hours on a ten-person team is worth most of an FTE and costs nothing.

The bridge pattern's failure mode is that the handover never happens and the
contractor becomes permanent at contractor rates. Put the handover date and the
knowledge-transfer artifact in the contract itself.

### Estimation inflation by confidence [RECOMMENDED]

| Confidence | Definition | Multiplier |
|-----------|------------|-----------|
| High | Team has shipped something near-identical; design complete | 1.15x |
| Medium | Shape understood; unknowns are known | 1.40x |
| Low | New domain, new dependency, or design not started | 1.90x |

Recalibrate against your own `actual / original estimate` history after two
quarters. Most teams land between 1.3 and 1.6 for "medium". Never make an
external commitment at "low" confidence — either de-risk it to medium first, or
commit the date at the inflated number.

### Utilisation bands [PROVEN]

| Planned utilisation | Behaviour |
|--------------------|-----------|
| Below 60% | Under-committed; the space fills with low-value work |
| 70-80% | **Target.** Absorbs incidents without slipping commitments |
| 80-90% | Every surprise costs a commitment |
| Above 90% | Queueing effects dominate; cycle time rises non-linearly |

This is queueing theory, not motivation. Planning to 95% guarantees late
delivery even when every estimate is correct.

## Anti-Patterns

### Headcount as capacity
**Mistake:** Multiplying FTE count by working hours and calling it capacity — 8 engineers x 504 hours = 4,032 hours available.
**Why it happens:** It is the only number that is easy to get, and it is the number finance and leadership already track. Effective hours require measurement nobody has set up.
**Instead:** Run the gross-to-effective waterfall every time. The real figure is 50-70% of gross, and the gap is where every over-commitment lives. If you have no measured overhead data, use 60% and start measuring this quarter.

### Hiring to fix this quarter
**Mistake:** Responding to a capacity gap by opening requisitions, then planning as if the new people contribute in the current period.
**Why it happens:** Hiring is the lever with the clearest approval path — a headcount ask is a familiar conversation in a way that "we are cutting three roadmap items" is not.
**Instead:** Hiring relieves the quarter after next at the earliest: 8-14 weeks to fill plus 3-6 months to ramp. Close the current gap by cutting scope or contracting, and trigger hiring on a three-quarter trend above 85% load rather than on one bad quarter. Onboarding into an overloaded team also ramps 20% slower, because nobody has time to onboard anyone.

### The plan that fits perfectly
**Mistake:** Presenting a capacity plan where demand lands within a few percent of supply, with nothing below the cut line.
**Why it happens:** Estimates get quietly adjusted downward during planning until the roadmap fits the team, or the demand list is truncated before the meeting so it never appears.
**Instead:** Treat a perfect fit as evidence of a process failure and go find which number moved. Every honest plan has a visible cut line, and the below-the-line list is the most useful artifact the exercise produces — it is what lets a stakeholder trade priorities rather than discover in week 10 that their item was never going to happen.

### Buffer as optimism dial
**Mistake:** Setting the unplanned-work reserve to whatever makes the plan work — dropping from 20% to 10% when the roadmap does not fit.
**Why it happens:** The buffer looks like slack, and slack looks like something to be negotiated away. It has no advocate in the room.
**Instead:** Set the buffer from the trailing three quarters of actual unplanned hours; it is a measurement, not a cushion. If unplanned work exceeded the buffer for two consecutive weeks last quarter, the correct move is to raise it. Cutting the buffer does not create capacity — it just relocates the shortfall to week 10, where it costs more.

## Files

| File | Purpose |
|------|---------|
| `scripts/capacity_model.py` | Converts roster + overhead + ramp into effective hours per person and per discipline |
| `scripts/commitment_gap.py` | Inflates estimates by confidence, fills capacity in priority order, reports the cut line |
| `scripts/scenario_compare.py` | Projects hire/contract/defer scenarios over a horizon with cost per delivered hour |
| `references/capacity-benchmarks.md` | Effective-hours ratios by role, ramp curves, on-call and meeting load, utilisation bands, hire-vs-contract economics |
| `references/planning-methods.md` | Planning sequence, demand forecasting, gap-closing levers, governance cadence, stakeholder pushback responses |
| `assets/capacity-plan-template.md` | Quarterly capacity plan with cut line, gap options, risks, and weekly tracking |
| `assets/sample_team.json` | Seven-person roster covering ramping hires, part-time, and multiple disciplines |
| `assets/sample_commitments.json` | Nine commitments against the capacity produced by `capacity_model.py` on the sample roster |
| `assets/sample_scenarios.json` | Four-quarter demand curve with hire, contract, and defer scenarios |

---

## internal-comms

Source path: `references/business-operations/internal-comms/SKILL.md`

# Internal Communications

Internal communication fails in predictable ways: the wrong people hear it first, the message
explains the decision but not the consequence, and nobody tests the draft before it reaches
2,000 inboxes. This skill treats an announcement as an artifact with a blast radius, a
sequence, and a pass/fail quality bar — not as a writing exercise.

The three levers are **who hears it in what order**, **what the message must contain**, and
**which channel carries it**. Get those right and tone matters far less than people assume.

## When to use this skill

- Announcing a **reorg, layoff, or leadership change** where sequencing errors are unrecoverable
- Rolling out a **policy change** (RTO, expenses, security, performance process) that people must act on
- Communicating a **product or system migration** with a deadline and a required user action
- Structuring a recurring **all-hands or weekly exec update** that currently reads as a status dump
- **Pressure-testing a draft** before send: reading level, jargon density, missing elements
- Deciding **channel and cadence** for a multi-week change programme rather than a one-shot email

## Inputs the skill expects

- The **change itself**: what is changing, effective date, whether it is reversible
- **Audience list** with impact level (high / medium / low) and rough headcount per group
- **Draft text**, if one exists (plain markdown or text is fine)
- **Constraints**: embargo, legal review, regulatory disclosure, market-sensitivity
- **Available channels** and which ones your org actually reads
- **Who can answer questions** after send, and where

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Blast radius — who is materially affected vs merely informed** — this decides whether you need a cascade (manager-first) or a single broadcast, and cascades cost 3-5 days
- [ ] **Reversibility of the decision** — reversible changes can be announced as proposals with a feedback window; irreversible ones must never be, because inviting input you will ignore is the fastest way to lose trust
- [ ] **Effective date and the required user action** — sets every T-offset in the plan and determines whether the message is informational or instructional
- [ ] **Whether anything is legally or market-sensitive** — embargo constraints override the ideal sequence and force simultaneous rather than cascaded delivery

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Audit a draft before it sends

Run this on every announcement that reaches more than ~50 people. It takes 30 seconds and
catches the failure modes that generate the most follow-up questions.

1. Save the draft as JSON with `title`, `body`, `audience`, and `channel`.
2. Run the auditor. It scores five required elements (what changed, why, who is affected,
   what to do, where to ask), reading grade, jargon density, and hedging.
3. Fix every `FAIL` element. Treat `WARN` on reading grade as advisory unless the audience
   includes non-native speakers or frontline staff, in which case treat it as `FAIL`.
4. Re-run until the score clears 75.

```bash
python3 business-operations/internal-comms/scripts/announcement_auditor.py \
  --input business-operations/internal-comms/assets/sample_announcement.json \
  --min-score 75 --format text
```

### Workflow 2 — Sequence a change communication

1. Describe the change and list audiences with impact and headcount.
2. Run the sequencer. It computes blast radius, orders audiences by a
   *impact-then-influence* rule, and assigns T-offsets in days relative to broadcast.
3. Review the manager-enablement step — if the plan says you need one and you skip it,
   managers learn about the change from their own reports, which is the single most
   common reorg comms failure.
4. Export the plan and assign an owner per step.

```bash
python3 business-operations/internal-comms/scripts/comms_sequencer.py \
  --input business-operations/internal-comms/assets/sample_change.json \
  --format text
```

### Workflow 3 — Pick the channel

1. Characterise the message on six dimensions: urgency, complexity, audience size,
   sensitivity, whether it needs two-way discussion, and whether it needs a durable record.
2. Run the scorer to rank channels and see which are actively disqualified.
3. Use the top-ranked channel as the primary, and the highest-ranked *durable* channel
   as the system of record. Never let a chat message be the record.

```bash
python3 business-operations/internal-comms/scripts/channel_fit_scorer.py \
  --input business-operations/internal-comms/assets/sample_message_profile.json \
  --top 4 --format json
```

## Decision frameworks

### Blast radius → sequence pattern [PROVEN]

Blast radius is the count of people whose *work or employment changes*, not the count who
receive the email.

| Radius | Pattern | Lead time before broadcast | Manager enablement |
|--------|---------|----------------------------|--------------------|
| 1-10 | Direct 1:1 conversations, then quiet team note | Same day | Not needed |
| 11-50 | Manager brief → team meetings → written follow-up | 1-2 days | Required, 60-min session |
| 51-250 | Exec brief → manager brief + FAQ → all-hands → written | 3-5 days | Required, with talk track + FAQ |
| 250+ | Add a pre-brief for informal influencers and a 2-week reinforcement cadence | 5-10 days | Required, plus a manager Q&A channel |

Escape hatch: legal embargo or market sensitivity collapses this to a simultaneous broadcast.
When that happens, say so in the message — "we could not brief managers first because of
disclosure rules" — rather than letting people infer carelessness.

### The five required elements [PROVEN]

Every announcement of consequence answers these, in this order. A message missing any one of
them generates a predictable class of follow-up question.

| Element | Missing it produces | Minimum bar |
|---------|--------------------|-------------|
| **What changed** | "Wait, is this happening now or later?" | One sentence, in the first paragraph, with the effective date |
| **Why** | Rumour and worst-case theory | The actual reason, including the constraint that forced it |
| **Who is affected** | Every reader assumes it is them | Named groups, plus an explicit "if you are not in these groups, nothing changes for you" |
| **What to do** | Nothing happens | An action with a deadline, or the words "no action needed" |
| **Where to ask** | Questions go to the wrong people | A named human or channel, plus when they will respond |

### Message-type → structure [RECOMMENDED]

| Type | Lead with | Length | Feedback window |
|------|-----------|--------|-----------------|
| Irreversible decision (reorg, layoff, shutdown) | The decision | 300-500 words | None — do not solicit input |
| Reversible policy | The problem being solved | 400-700 words | 5-10 business days |
| Migration / deadline | The action and the date | 200-350 words | Questions only |
| Celebratory / milestone | The outcome and who did it | 150-250 words | None |
| Bad news (incident, miss) | What happened, in plain words | 250-400 words | Post-mortem link |

### Cadence for a multi-week change [RECOMMENDED]

Announce once and people forget; announce weekly and they tune out. The pattern that holds:
**T-0 announcement, T+3 days FAQ update, T+1 week manager check-in, T+2 weeks progress note,
T+4 weeks close-out.** Five touches, decreasing in length. See
`references/change-comms-cadence.md` for the full grid including reinforcement channels.

## Anti-Patterns

### The Broadcast Ambush
**Mistake:** Sending a reorg or policy announcement to all-staff without briefing managers first.
**Why it happens:** Leadership fears leaks, and a simultaneous send feels "fair" and egalitarian.
**Instead:** Brief managers 24-48 hours ahead with a talk track and an FAQ, and tell them
explicitly what they may and may not repeat. A manager who cannot answer their team's first
question loses standing that takes months to rebuild. If leak risk is genuinely severe,
compress the window to 2 hours rather than eliminating it.

### Burying the Decision Under the Reasoning
**Mistake:** Opening with three paragraphs of market context before stating what is changing.
**Why it happens:** The author wants the reader to reach the same conclusion they did, so they
reconstruct their own reasoning path.
**Instead:** State the decision in sentence one, then the reasoning. Readers who disagree will
read the reasoning more carefully, not less. Context-first structure reads as though you are
building a case, which signals defensiveness.

### The Fake Consultation
**Mistake:** Announcing a settled decision with "we'd love your feedback" attached.
**Why it happens:** It softens the delivery and feels more collaborative than a flat directive.
**Instead:** If the decision is settled, say so: "This is decided. Here is what we considered."
If input can genuinely change the outcome, say what specifically is still open and by when.
Solicited-then-ignored feedback is measurably worse for trust than no consultation at all.

### Jargon as Cushioning
**Mistake:** "We are realigning our operating model to better leverage synergies across pods."
**Why it happens:** Abstraction makes uncomfortable news feel less blunt to the person writing it.
**Instead:** Write the sentence a person would say out loud. The auditor flags jargon density
above 2% of words; anything above that on a high-impact message means the draft is hiding
something, and readers will assume the worst thing it could be hiding.

### No Named Owner for Questions
**Mistake:** Ending with "reach out with any questions."
**Why it happens:** Nobody wants to volunteer their calendar.
**Instead:** Name a person or a specific channel and a response commitment ("#change-rto,
answered within one business day"). Unrouted questions become hallway conversations,
and hallway conversations become the version of the message people remember.

## Files

| File | Purpose |
|------|---------|
| `scripts/announcement_auditor.py` | Scores a draft on required elements, reading grade, jargon, hedging, and structure |
| `scripts/comms_sequencer.py` | Builds an ordered, T-offset communication plan from a change description and audience list |
| `scripts/channel_fit_scorer.py` | Ranks communication channels against a six-dimension message profile |
| `references/announcement-archetypes.md` | Eight announcement archetypes with structure, length, and worked openings |
| `references/change-comms-cadence.md` | Timing grids, reinforcement schedules, and manager-enablement content |
| `assets/announcement-template.md` | Fill-in template enforcing the five required elements |
| `assets/comms-plan-template.md` | Sequencing plan table with owner, channel, and T-offset columns |
| `assets/sample_announcement.json` | Runnable input for `announcement_auditor.py` |
| `assets/sample_change.json` | Runnable input for `comms_sequencer.py` |
| `assets/sample_message_profile.json` | Runnable input for `channel_fit_scorer.py` |

---

## knowledge-ops

Source path: `references/business-operations/knowledge-ops/SKILL.md`

# Knowledge Operations

Knowledge bases do not fail by being incomplete. They fail by becoming untrustworthy: once a
reader has been burned twice by a confidently wrong page, they stop reading and start asking
in chat, and every subsequent doc you write is written into a void. This skill treats the KB
as an operational system with owners, freshness SLAs, and a measurable health score — not as
a writing backlog.

The core insight is that **deletion is the highest-value action available**. Most struggling
knowledge bases need 30% fewer pages, not more pages.

## When to use this skill

- The wiki is **large and distrusted** — people ask in chat rather than search, and are right to
- A **doc audit** is due before onboarding a cohort, an acquisition merge, or a compliance review
- **Search returns the wrong page** consistently, usually because three near-duplicates compete
- **Nobody owns** large parts of the KB and nobody can say what is current
- Planning a **documentation-debt sprint** and needing a ranked backlog rather than a wish list
- **Migrating** between wiki platforms and needing to decide what survives the move

## Inputs the skill expects

- A **doc inventory**: path, title, owner, last-updated date, and outbound links
- **Criticality tier** per doc, or enough signal (traffic, area) to infer it
- **Usage data** if available — 90-day views separate the load-bearing pages from the archive
- The **as-of date** for the audit, so results are reproducible
- Your **freshness SLA policy**, or acceptance of the default tiering below
- Whether **deletion is politically possible**, which changes the entire remediation plan

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which docs are load-bearing vs archival** — a stale onboarding runbook is an incident; a stale 2019 retro is fine, and treating them identically produces a backlog nobody works
- [ ] **Whether pages can be deleted or only archived** — deletion authority roughly halves the remediation effort, so the plan differs structurally
- [ ] **Who can be assigned as an owner** — ownership assigned to a team alias rather than a person is the same as no owner, and the audit will keep reporting it
- [ ] **The as-of date for the audit** — staleness is relative, and an undated audit cannot be compared against the next one

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Score KB health

1. Build a doc inventory as JSON, or point the auditor at a directory of markdown with
   YAML frontmatter (`owner`, `updated`, `tier`).
2. Run the auditor with an explicit `--as-of` date so the run is reproducible.
3. Read the health score as a trend, not an absolute. A first run below 60 is normal;
   what matters is the direction across quarterly runs.
4. Triage the `critical` findings first — a stale critical-tier doc is the class of failure
   that causes real incidents.

```bash
python3 business-operations/knowledge-ops/scripts/kb_health_auditor.py \
  --input business-operations/knowledge-ops/assets/sample_kb.json \
  --as-of 2026-07-21 --format text
```

To scan a real directory of markdown instead:

```bash
python3 business-operations/knowledge-ops/scripts/kb_health_auditor.py \
  --root ./docs --as-of 2026-07-21 --format json
```

### Workflow 2 — Find orphans, dead links, and duplicates

1. Run the orphan detector over the same inventory. It builds the link graph and reports
   pages nothing links to, links pointing at pages that do not exist, and hub pages.
2. Cross-reference orphans against traffic. **An orphan with traffic is a findability bug**
   (people reach it by search or bookmark but the IA does not connect it). **An orphan with
   no traffic is a deletion candidate.** These need opposite fixes.
3. Fix dead links before anything else — they are cheap and they are the most visible
   signal of an unmaintained KB.

```bash
python3 business-operations/knowledge-ops/scripts/orphan_detector.py \
  --input business-operations/knowledge-ops/assets/sample_kb.json \
  --format text
```

### Workflow 3 — Build a ranked documentation-debt backlog

1. Run the debt ranker over the inventory. It scores each issue on value (traffic ×
   criticality × severity) and effort, then sorts into do-now / schedule / batch / drop.
2. Take the top 10 into a debt sprint. Do not attempt the whole backlog — the backlog is a
   measurement instrument, not a plan.
3. Re-run the auditor after the sprint with the same `--as-of` convention to show movement.

```bash
python3 business-operations/knowledge-ops/scripts/doc_debt_ranker.py \
  --input business-operations/knowledge-ops/assets/sample_kb.json \
  --as-of 2026-07-21 --top 10 --format text
```

## Decision frameworks

### Freshness SLA by tier [PROVEN]

Uniform review cycles fail because they generate more review work than any team will do, so
nothing gets reviewed. Tier the SLA instead.

| Tier | Examples | Review SLA | Stale at | Action when stale |
|------|----------|-----------|----------|-------------------|
| **Critical** | On-call runbooks, incident procedures, security policy, payroll process | 90 days | 120 days | Page the owner; a stale runbook is an incident risk |
| **Core** | Onboarding, architecture overviews, team charters, release process | 180 days | 270 days | Owner review ticket in the next sprint |
| **Reference** | How-tos, tool guides, FAQs | 365 days | 540 days | Batch review annually |
| **Archive** | Retros, past project docs, historical decisions | Never | Never | Mark archived; exclude from search and from the score |

The single most valuable configuration change in most knowledge bases is moving 40% of pages
into Archive and excluding them from search. Search quality is a ratio, and the denominator is
usually the problem.

### Orphan triage [PROVEN]

| Inbound links | 90-day traffic | Diagnosis | Action |
|---------------|----------------|-----------|--------|
| 0 | 0 | Dead weight | Delete. Not archive — delete |
| 0 | Low (1-50) | Bookmark-only survivor | Link it from the right hub, or fold into a parent page |
| 0 | High (50+) | Findability bug | Link from a hub urgently; people are relying on a page the IA hides |
| 1-2 | Any | Weakly connected | Fine if the parent is the right one |
| 10+ | High | Hub page | Protect it; assign a named owner and the Critical SLA |

### Duplication resolution [RECOMMENDED]

When two or more pages cover the same topic, **merge into the one with the most inbound links**,
not the one that is best written. Inbound links represent accumulated navigation habit across
the org; rewriting the winner is cheap, rebuilding link equity is not. Redirect the losers,
never delete them silently — a 404 on a bookmarked page costs more trust than a stale page did.

Escape hatch: if the highest-linked version is factually wrong and the other is correct, merge
into the linked one and replace its content wholesale. The URL wins, the content does not.

### Health score bands

| Score | Reading | Response |
|-------|---------|----------|
| 80-100 | Healthy; maintenance mode | Quarterly audit, keep SLAs |
| 60-79 | Degrading; trust still intact | One debt sprint, focus on critical-tier staleness |
| 40-59 | Distrusted; people are asking in chat | Ownership assignment sprint first, then content |
| 0-39 | Failed; a rewrite is cheaper than a repair | Pick the top 20 pages by traffic, rebuild those, archive everything else |

## Anti-Patterns

### The Documentation Sprint With No Owners
**Mistake:** Running a week-long effort where everyone writes docs, then declaring the KB fixed.
**Why it happens:** Writing is visible, satisfying, and easy to organise. Ownership is neither.
**Instead:** Assign owners before writing anything. An unowned page is stale the day it is
written — it just has not been noticed yet. If you can only do one thing, do ownership
assignment; a KB with owners and old content recovers, and a KB with fresh content and no
owners degrades to the same state within two quarters.

### Team Aliases as Owners
**Mistake:** Setting the owner field to `@platform-team` or `docs@company.com`.
**Why it happens:** It survives staff turnover and feels more robust than naming a person.
**Instead:** Name a person, with the team as a fallback field. Review notifications sent to a
group alias are read by nobody — this is the most reliable finding in knowledge-base
operations. Rotate the named owner quarterly if you must, but keep it a person.

### Archiving Instead of Deleting
**Mistake:** Moving every obsolete page to an archive space rather than removing it.
**Why it happens:** Deletion feels risky and irreversible, and someone always says "we might
need it."
**Instead:** Delete pages with zero inbound links and zero traffic outright — version history
already preserves them. Archive is for documents with historical or compliance value, not for
things you are afraid to delete. An archive that grows without bound is a slower failure mode
than deletion, not a safer one.

### Optimising Search Instead of Fixing Content
**Mistake:** Responding to "search is broken" by tuning the search engine or buying a new one.
**Why it happens:** It is a procurement problem with a vendor solution, which is easier than a
content problem with an organisational solution.
**Instead:** Search almost always fails because three near-duplicate pages compete for the same
query and the engine cannot know which is current. Merge the duplicates and exclude archives
from the index. Do this before evaluating any search product — it is usually the whole fix.

### Auditing Without an As-Of Date
**Mistake:** Running the audit ad hoc and comparing results across runs.
**Why it happens:** The tooling defaults to "today" and nobody records what today was.
**Instead:** Always pass an explicit `--as-of` and store the output. KB health is only
meaningful as a trend; two undated audits cannot be compared, and a number with no trend
gets ignored by the people who fund the remediation.

## Files

| File | Purpose |
|------|---------|
| `scripts/kb_health_auditor.py` | Scores staleness against tiered SLAs, missing owners, duplicate titles, and thin pages |
| `scripts/orphan_detector.py` | Builds the link graph; reports orphans, dead links, hub pages, and traffic-weighted triage |
| `scripts/doc_debt_ranker.py` | Ranks remediation work by value and effort into do-now / schedule / batch / drop |
| `references/information-architecture-patterns.md` | IA models, hub-and-spoke structure, naming, and search-behaviour design |
| `references/freshness-sla-and-ownership.md` | SLA tiering, ownership models, review workflows, and health metrics |
| `assets/kb-audit-report-template.md` | Report template for presenting audit findings and a remediation plan |
| `assets/doc-ownership-charter.md` | Charter defining what a doc owner is accountable for |
| `assets/sample_kb.json` | Runnable inventory used by all three scripts |

---

## process-mapper

Source path: `references/business-operations/process-mapper/SKILL.md`

# Process Mapper

Turns "this takes forever and nobody knows why" into a measured map with a
ranked backlog. Most process work fails on two things: it maps what people
describe rather than what runs, and it costs wait-time savings as if they were
labour savings. This skill is built to prevent both.

## When to use this skill

- **A process is slow** and nobody can say which step is responsible
- **Work bounces between teams** and the handoffs are suspected but not measured
- **Rework is high** — submissions get returned, tickets get reopened, orders get corrected
- **Before automating anything** — to check the step should exist at all
- **Onboarding a new team** onto an inherited process nobody has documented
- **An improvement programme needs a backlog** ranked by payback rather than by volume of complaint

## Inputs the skill expects

- Process boundaries: trigger event, terminal state, and the unit that flows through
- Step list with owner (role, not person), touch time, and wait time per step
- Wait times from system timestamps rather than self-report where possible
- Rework rate per step and the step each loop returns to
- System of record per step, to detect re-keying points
- Monthly volume and a loaded hourly cost, for valuing improvements

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which variant are we mapping, and what share of volume is it?** — mapping every exception produces an unreadable map; mapping a 20% path optimises the wrong process
- [ ] **Where do the wait times come from — timestamps or memory?** — self-reported queue time is understated by 40-70%, which moves the constraint to the wrong step
- [ ] **Is the goal lead time, labour cost, or quality?** — these have different constraints and often opposite fixes
- [ ] **Has the business quantified what faster is worth?** — without their number, cycle-time gains cannot be costed and must be argued separately

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Capture and measure the process

1. Scope first: agree trigger, terminal, unit, and variant on one page before any detail. Use the SIPOC frame in `assets/process-map-template.md`.
2. Observe the work happening before running a workshop. Observation finds the workaround spreadsheet and the chase email; workshops do not.
3. Pull wait times from system timestamps. Use median and 85th percentile, never mean — process-time distributions have long right tails.
4. Classify each step as value-added, business-value-added, or non-value-added. Test approvals by their rejection rate: below 5% and it is a queue with a job title.
5. Run the analyser and check the modelled lead time against measured end-to-end lead time. A gap above 20% means missing steps or, more often, missing wait.

```bash
python3 business-operations/process-mapper/scripts/process_analyzer.py \
  --input business-operations/process-mapper/assets/sample_process.json \
  --format text
```

### Workflow 2 — Diagnose handoffs and rework loops

1. Run the handoff analyser on the same process file — no separate input needed.
2. Read handoff density first. Above 0.5 owner changes per step, consolidating ownership beats optimising any individual step.
3. Check what share of total wait sits at handoffs. Above 60%, the problem is between teams and no amount of internal team improvement will move it.
4. Treat every system switch as a re-keying and data-loss point, and every cross-team rework loop as a check that belongs upstream of where it fires.
5. Look at ping-pong: an owner visited three or more separate times should own their segment end to end.

```bash
python3 business-operations/process-mapper/scripts/handoff_analyzer.py \
  --input business-operations/process-mapper/assets/sample_process.json \
  --format text
```

### Workflow 3 — Build the improvement backlog

1. Generate opportunities from the findings, applying the improvement hierarchy in order: eliminate, consolidate, parallelise, standardise, automate.
2. Split every saving into `touch_minutes_saved_per_unit` (labour, costed) and `lead_minutes_saved_per_unit` (elapsed, not costed). This split is the discipline that keeps the business case survivable.
3. Supply `annual_cycle_time_value` only when the business has quantified it — that figure is theirs, not the analyst's.
4. Run the scorer and read the tiers. Anything above 20 days of effort is a project needing its own sponsor, not a backlog item.
5. Override payback order in one case: if first-pass yield is below 85%, sequence the rework fixes first regardless of their payback. Flow improvements cannot hold on a process that reworks half its units.

```bash
python3 business-operations/process-mapper/scripts/improvement_scorer.py \
  --input business-operations/process-mapper/assets/sample_opportunities.json \
  --format json
```

## Decision frameworks

### Diagnostic thresholds [PROVEN]

| Signal | Threshold | What it means |
|--------|-----------|---------------|
| Step share of lead time | Above 20% | This is the constraint |
| Wait/touch ratio on a step | Above 3x | A queue, not work |
| Wait/touch ratio | Above 10x | Batch-and-queue scheduling; fix policy, not capacity |
| Rework rate per step | Above 10% | Fix before any speed work |
| First-pass yield end to end | Below 85% | Rework is the dominant cost |
| Handoff density | Above 0.5/step | Fragmented ownership |
| Wait sitting at handoffs | Above 60% | Optimise between teams, not inside them |
| Non-value-added touch time | Above 25% | Eliminate before automating |
| Approval rejection rate | Below 5% | The approval is theatre |

### Process cycle efficiency bands [PROVEN]

PCE = value-added time / lead time, for transactional processes:

| PCE | Band | Situation |
|-----|------|-----------|
| Below 5% | Poor | Un-improved multi-team process. Most start here. |
| 5-15% | Below average | Some flow; queues still control lead time. |
| 15-25% | Average | Reasonable across three or more teams. |
| 25-50% | Good | Strong flow. Remaining gains are batch size and automation. |
| Above 50% | World class | Rare outside single-owner processes. Check the data. |

Manufacturing benchmarks do not transfer. A cross-functional approval process at
20% PCE is performing well, not badly.

### The improvement hierarchy [PROVEN]

Applied to the same step, earlier verbs beat later ones:

| Rank | Verb | Question | Typical gain |
|------|------|----------|-------------|
| 1 | Eliminate | Does this need to happen at all? | 100% of the step |
| 2 | Consolidate | Can one owner do this and the next step? | Removes a handoff and its queue |
| 3 | Parallelise | Must this wait for the previous step? | Up to the shorter branch |
| 4 | Standardise | Can the variation be removed? | 20-40%, plus rework reduction |
| 5 | Automate | Can a system do it? | 60-90% of touch time |

**Automate last.** Automating a step you should have eliminated makes the waste
permanent and expensive to remove, because every future change now needs a
development cycle. Parallelisation is the most under-used lever in
approval-heavy processes — sequential credit, legal, and security reviews
usually have no real dependency and are sequential only because someone drew the
process as a line.

### Valuing a saving [PROVEN]

| Saving | Currency | Costable? |
|--------|----------|-----------|
| Touch time removed | Labour hours | Yes — hours x loaded rate |
| Wait time removed | Lead time | Only with a number from the business |

Removing a queue frees nobody's hours. It may be worth far more than the labour
saving through faster revenue or better win rates — but that value comes from
the business owner, not from the analyst's spreadsheet.

## Anti-Patterns

### Costing wait time as labour
**Mistake:** Multiplying total lead-time reduction by a loaded hourly rate — "we cut 25 hours per order at $72/hour, so we save $1,800 per order."
**Why it happens:** It produces a spectacular number from data already in hand, and the arithmetic looks identical to the legitimate touch-time calculation.
**Instead:** Cost only touch time as labour. Report lead-time reduction separately in its own units and ask the business owner what it is worth to them. Finance will find the inflated figure in the first review, and the credibility loss contaminates the genuine savings sitting in the same document.

### Mapping the described process
**Mistake:** Building the map from a workshop, an existing SOP, or interviews with managers, then analysing it as fact.
**Why it happens:** It is fast, it is comfortable, and everyone in the room believes their description is accurate. Nobody is lying — they are describing the process as designed, because the workarounds have become invisible through repetition.
**Instead:** Observe the work happening, and pull wait times from system timestamps. Then validate by reading the map back to the people who do it, asking "what did I get wrong?" rather than "does this look right?" If your modelled lead time is more than 20% below the measured figure, you are missing steps or missing wait — usually the chase emails and batch delays nobody thinks to mention.

### Optimising a non-constraint
**Mistake:** Running an improvement programme that makes six steps faster, then finding end-to-end lead time unchanged.
**Why it happens:** Improvement effort goes where the team is willing rather than where the constraint is, and every local gain is real and measurable — it just does not reach the customer.
**Instead:** Find the constraint, exploit and subordinate before spending anything, and only then add capacity. Improving a non-constraint step provably changes nothing at the process level. Re-measure after each fix, because the constraint moves once relieved.

### Automating before eliminating
**Mistake:** Commissioning software to speed up a step that should not exist — the classic being an automated approval workflow for an approval that rejects 2% of submissions.
**Why it happens:** Automation has a budget line, a vendor, and a visible deliverable. Eliminating a step requires persuading whoever owns it that their control is unnecessary, which is a political problem with no budget code.
**Instead:** Run the first four verbs of the improvement hierarchy before writing any code. Automation encodes the current process in software and makes every subsequent change a development project — so the cost of automating waste is not the build, it is the decade of paying to work around it.

## Files

| File | Purpose |
|------|---------|
| `scripts/process_analyzer.py` | Cycle time, PCE, value-added ratio, first-pass yield, rework cost, and constraint identification |
| `scripts/handoff_analyzer.py` | Handoff scoring, ping-pong detection, cross-team rework loops, system-switch mapping |
| `scripts/improvement_scorer.py` | Payback-tiered backlog separating labour savings from lead-time savings, with dependency sequencing checks |
| `references/lean-process-analysis.md` | Core metrics, PCE benchmarks, waste taxonomy, diagnostic thresholds, Little's Law, constraint sequence, honest valuation |
| `references/process-capture-methods.md` | Scoping, SIPOC, capture techniques ranked, per-step data fields, time-data rules, validation checks, engagement sequence |
| `assets/process-map-template.md` | Full map deliverable: SIPOC, swimlane, step detail, metrics, handoffs, backlog, validation checklist |
| `assets/sample_process.json` | Twelve-step order-to-activation process across seven owners with rework loops and system switches |
| `assets/sample_opportunities.json` | Eight improvement opportunities spanning all five improvement verbs, including two that correctly fail scoring |

---

## procurement-optimizer

Source path: `references/business-operations/procurement-optimizer/SKILL.md`

# Procurement Optimizer

Most software spend reduction is not a negotiation problem. It is a measurement problem:
organisations buy seats in round numbers, assign them generously, and never look at whether
anyone logs in. The typical mid-size portfolio carries 20-30% reclaimable seat spend before
anyone talks to a vendor, and the reclaim requires no concession from the vendor at all.

This skill works the levers in order of yield: **stop paying for unused seats**, then
**stop paying twice for the same capability**, then **negotiate price**. Reversing that
order — leading with a price negotiation on a bloated contract — is how organisations
congratulate themselves on a 10% discount against 40% more seats than they need.

## When to use this skill

- A **budget-reduction target** has landed and software spend is in scope
- A **renewal is approaching** and you need a defensible position before the vendor call
- **SaaS sprawl audit**: nobody can say how many tools the company pays for
- **Post-merger consolidation** where two portfolios overlap heavily
- Building a **renewal calendar** so contracts stop auto-renewing unexamined
- A vendor has proposed an **uplift** and you need leverage to counter it

## Inputs the skill expects

- **Spend inventory**: tool, category, annual cost, renewal date, contract term
- **Seat data**: purchased, assigned, and — critically — *active in the last 30 days*
- **Contract terms**: notice period, auto-renew flag, term length
- **Criticality** per tool, and whether a capability alternative exists
- **Headcount**, for per-head benchmarking
- The **as-of date**, so renewal-window maths is reproducible

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Whether seat data is assigned or active** — this is the single most consequential input. Assigned seats overstate usage by 30-60%, and an analysis built on them finds almost nothing
- [ ] **Notice periods and auto-renew flags** — a contract inside its notice window is committed for another full term, so its "savings" are not available this cycle and must not be counted toward a target
- [ ] **Whether the goal is in-year cash or run-rate reduction** — seat cuts at renewal reduce run-rate but may deliver nothing this fiscal year, which is the wrong answer to an in-year cash problem
- [ ] **Which tools are politically untouchable** — if the CRM is the CRO's and cannot be cut, that changes which opportunities are worth analysing at all

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Find the wasted seats

Start here always. It requires no vendor conversation and no cross-team negotiation.

1. Assemble the inventory with purchased / assigned / **active-30-day** seat counts. If you
   only have assigned counts, stop and get active counts — the analysis is not meaningful
   without them.
2. Run the analyser. It compares active utilisation against a per-category benchmark (an LMS
   is not used weekly; a CRM is) and sizes reclaimable spend with a 12% safety buffer.
3. Separate the two failure modes it reports. **Over-licensed** means cut seats.
   **Adoption failure** means seats are assigned to people who never log in — cutting seats
   there treats the symptom, and the tool may simply not deserve to survive.

```bash
python3 business-operations/procurement-optimizer/scripts/license_utilization_analyzer.py \
  --input business-operations/procurement-optimizer/assets/sample_spend.json --format text
```

### Workflow 2 — Find the tools you are paying for twice

1. Run the overlap detector. It groups by category and picks a survivor by **displacement
   cost**, not by price — moving 400 active users is expensive regardless of licence cost.
2. Check the umbrella-label warnings first. If it flags a category as an umbrella, your
   tagging is claiming that a wiki and a chat tool are substitutes. Re-tag by the job the
   tool does and re-run before believing any number in the output.
3. Treat the recovery figure as net of an assumed 20% migration cost. Consolidations that
   look marginal at 20% are usually negative in reality once you count the disruption.

```bash
python3 business-operations/procurement-optimizer/scripts/tool_overlap_detector.py \
  --input business-operations/procurement-optimizer/assets/sample_spend.json --format text
```

### Workflow 3 — Rank the opportunities against the renewal calendar

1. Run the ranker with an explicit `--as-of`. It discounts each opportunity by how much
   leverage the renewal timing actually gives you this cycle.
2. Work the shortlist top-down. Time-boxed items (inside the notice window or in the ideal
   T-120 to T-90 negotiation window) are promoted above higher-ROI items on distant renewals,
   because missing a window costs a full contract year.
3. Read the `locked_this_cycle` figure to leadership before committing to a savings number.
   It is the portion of the opportunity that is genuinely unavailable this year, and
   discovering it after committing to a target is a bad conversation.

```bash
python3 business-operations/procurement-optimizer/scripts/savings_opportunity_ranker.py \
  --input business-operations/procurement-optimizer/assets/sample_spend.json \
  --as-of 2026-07-21 --top 10 --format text
```

## Decision frameworks

### Utilisation benchmarks by category [RECOMMENDED]

Active seats in the last 30 days, divided by seats purchased. A single flat benchmark is the
most common analytical error here — it flags an LMS as catastrophically wasteful when quarterly
use is its normal pattern.

| Category | Healthy active utilisation | Why |
|----------|---------------------------|-----|
| Security / identity | 90% | Near-universal deployment; unused seats are pure waste |
| CRM, chat, support desk | 85% | Daily-use tools with a defined user population |
| Developer tools | 80% | Daily use, but contractor churn creates real slack |
| Finance systems | 80% | Small, well-defined user set |
| Design | 70% | Licence-heavy tools with occasional-use viewers |
| Product analytics | 60% | Genuine long tail of occasional queriers |
| Legal / contract tools | 55% | Episodic use by a small team |
| Knowledge base | 50% | Read-heavy; many users read without a seat action |
| Whiteboard | 40% | Bursty, workshop-driven usage |
| LMS / HR training | 40% | Quarterly or annual cadence by design |

### Renewal timing and leverage [PROVEN]

| Window | Leverage | What to do |
|--------|----------|-----------|
| T-180d and earlier | Low | Too early. Vendors will not discount against a distant renewal. Calendar the opening |
| **T-120d to T-90d** | **Highest** | The ideal window. Open here. You have time to run an alternative evaluation, and the vendor's quarter-end pressure is still ahead of them |
| T-90d to T-60d | Moderate | Workable, but expect to trade term length for price |
| T-60d to notice deadline | Low | Serve notice to preserve optionality even if you intend to renew. Notice is not termination |
| Inside notice on auto-renew | None | Committed for another term. Plan the next cycle |

The most valuable single practice in software procurement is **serving notice by default** on
every auto-renewing contract at the notice deadline. It converts an automatic renewal into a
negotiation and costs nothing — vendors do not walk away from customers who serve notice, they
schedule a call. Organisations that do not do this are negotiating with no alternative and the
vendor knows it.

### Which lever to pull

| Situation | Lever | Typical yield |
|-----------|-------|---------------|
| Utilisation below benchmark | Seat reduction at renewal | 20-40% of that contract |
| Utilisation healthy, price above market | Price concession | 5-12% |
| Two tools, same job, both under-used | Consolidation | 60-80% of the displaced tool, net of migration |
| Seats assigned but nobody logs in | Fix adoption or kill the tool | 0% or 100% — there is no middle |
| Multi-year term offered for a discount | Usually decline | See the anti-pattern below |

## Anti-Patterns

### Counting Assigned Seats as Usage
**Mistake:** Building the utilisation analysis on seats assigned rather than seats active.
**Why it happens:** Assigned counts are what admin consoles show on the front page; active
counts often require an export or an API call.
**Instead:** Insist on 30-day active counts before running any analysis. Assigned seats
overstate real usage by 30-60% in typical portfolios, which is precisely the range of the
savings you are looking for — an analysis on assigned seats finds nothing and concludes the
portfolio is efficient.

### The Multi-Year Discount Trap
**Mistake:** Accepting a 15% discount for a three-year commitment on a tool with 40% unused seats.
**Why it happens:** The discount is concrete, immediate, and easy to report as a win. The
locked-in waste is diffuse and shows up in someone else's quarter.
**Instead:** Right-size the seat count first, then evaluate the multi-year offer against the
corrected baseline. A 15% discount on 40% too many seats is a 26% price increase wearing a
discount's clothing. Multi-year terms are worth taking only on tools you are certain of, where
utilisation is already healthy, and where the discount exceeds 20%.

### Negotiating Without Serving Notice
**Mistake:** Opening a renewal conversation while the contract is set to auto-renew.
**Why it happens:** Serving notice feels adversarial, and nobody wants to trigger an escalation
with a vendor they intend to keep.
**Instead:** Serve notice at the deadline as standard practice on every auto-renewing contract.
It is a procedural step, not a threat, and vendors treat it as one. Without it you have no
alternative to the renewal and no leverage, and the vendor's account team knows your notice
window better than you do.

### Consolidating on Price Instead of Displacement Cost
**Mistake:** Keeping the cheaper of two overlapping tools.
**Why it happens:** The licence cost is the visible number and the comparison is easy.
**Instead:** Keep the tool with more active users and higher criticality, even if it costs more.
Migrating 400 active users costs far more in lost productivity and support load than the annual
licence difference — and consolidations that displace the incumbent frequently fail outright,
leaving you paying for both tools plus the migration.

### Counting Locked Savings Toward This Year's Target
**Mistake:** Reporting the full portfolio opportunity as the savings commitment.
**Why it happens:** The gross number is bigger, and renewal-window nuance is hard to explain.
**Instead:** Report gross opportunity, realisable-this-cycle, and locked separately. Contracts
inside their notice window on auto-renew are committed for another full term; their savings are
real but arrive next year. Committing to a number that includes them guarantees a miss, and it
is a miss you can see coming from the day you commit.

## Files

| File | Purpose |
|------|---------|
| `scripts/license_utilization_analyzer.py` | Scores seat utilisation against category benchmarks and sizes reclaimable spend |
| `scripts/tool_overlap_detector.py` | Groups the portfolio by category, picks consolidation survivors by displacement cost, flags umbrella labels |
| `scripts/savings_opportunity_ranker.py` | Ranks opportunities by ROI per day, discounted by renewal-window leverage; builds the renewal calendar |
| `references/saas-negotiation-levers.md` | Negotiation levers, vendor tactics and counters, discount benchmarks, contract clauses |
| `references/utilization-benchmarks.md` | Per-category benchmarks, spend-per-head ranges, measurement methodology |
| `assets/spend-audit-report-template.md` | Report template for presenting findings and a committed savings number |
| `assets/renewal-negotiation-brief.md` | Pre-call brief template: position, targets, walk-away, concession ladder |
| `assets/sample_spend.json` | Runnable inventory used by all three scripts |

---

## vendor-management

Source path: `references/business-operations/vendor-management/SKILL.md`

# Vendor Management

Covers the vendor lifecycle from selection to exit. Two failures dominate this
discipline: tiering vendors by spend rather than by blast radius, and losing
every point of renewal leverage to a missed notice deadline. This skill is built
around preventing both.

## When to use this skill

- **Selecting a vendor** and needing a scorecard that survives scrutiny
- **A renewal is approaching** and the notice deadline needs to be found before it passes
- **Reviewing the vendor portfolio** for concentration, risk tier coverage, and consolidation
- **Preparing a business review** with SLA performance and credits owed
- **A vendor is underperforming** and the case needs to be built on trend, not anecdote
- **Planning an exit** and needing the sequence right

## Inputs the skill expects

- For selection: weighted criteria, must-have requirements, and 0-10 scores per vendor with evidence
- For the portfolio: annual spend, category, renewal date, notice days, and auto-renew flag per vendor
- Risk inputs per vendor: data classification, business criticality, alternative availability, subprocessor use
- Internal owner per contract
- For SLA reporting: committed metrics with target, actual, direction, credit tiers, and prior-period history
- Annual contract value and the contractual credit cap

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Is the notice deadline known, or only the renewal date?** — the notice deadline is what constrains action, and missing it removes all leverage for a full term
- [ ] **Were the scoring weights set before any vendor was scored?** — weights chosen after seeing candidates produce a justification, not a decision
- [ ] **What does this vendor actually hold or touch?** — data sensitivity and criticality drive the risk tier; spend does not
- [ ] **Which must-haves are genuinely pass/fail?** — every entry on that list eliminates a candidate, so preferences belong in the weighted criteria

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Select a vendor

1. Agree weighted criteria and the must-have list **before** looking at any candidate. Record who agreed them and when.
2. Define anchors for each criterion — what a 10 looks like and what a 5 looks like. This is what stops the scorecard becoming post-hoc justification.
3. Score each candidate against evidence (demo, reference call, document reviewed), not impression. Note the evidence in the scorecard.
4. Run the scorer and read the stability check before the ranking. A margin under 5% is a tie — decide it on commercial terms, exit cost, or reference calls instead.
5. If the result flips when a weight moves 50%, take that criterion back to the decision owner before proceeding.

```bash
python3 business-operations/vendor-management/scripts/vendor_scorecard.py \
  --input business-operations/vendor-management/assets/sample_vendor_candidates.json \
  --format text
```

### Workflow 2 — Review the portfolio

1. Build the vendor list with renewal date, notice days, and auto-renew flag. The notice deadline is derived, and it is the date that matters.
2. Set `as_of` explicitly so the analysis is reproducible and reviewable later.
3. Run the analyser and work the urgent renewals first — anything marked LOCKED has already lost its negotiating window for this term.
4. Check concentration in both forms: single-vendor share above 25-30% is a dependency, and category HHI tells you whether you have leverage or diversification.
5. Treat every unowned contract as a future auto-renewal. Assign an owner before anything else in the report.

```bash
python3 business-operations/vendor-management/scripts/portfolio_analyzer.py \
  --input business-operations/vendor-management/assets/sample_portfolio.json \
  --format text
```

### Workflow 3 — Run an SLA review

1. Collect committed metrics with target, actual, direction, and credit tiers. Include prior periods — the trend is the argument.
2. Run the report and check credits earned against the contractual cap. Credits exceeding the cap mean the remedy structure is too weak to change behaviour.
3. Claim the credits. Unclaimed credits are the norm, and most contracts require you to ask.
4. Escalate severe breaches to the contract owner, not the account manager — the account manager cannot change the terms that caused it.
5. Carry the findings into the renewal ask: credit tiers that bite, and a termination right after repeated breach.

```bash
python3 business-operations/vendor-management/scripts/sla_report.py \
  --input business-operations/vendor-management/assets/sample_sla.json \
  --format json
```

## Decision frameworks

### Risk tiering [PROVEN]

Score data sensitivity plus business criticality, then apply modifiers.

| Data classification | Points | | Business criticality | Points |
|--------------------|--------|---|---------------------|--------|
| PHI / health | 4 | | Critical (revenue stops in hours) | 4 |
| PII | 3 | | High (core function stops in a day) | 3 |
| Financial | 3 | | Medium (productivity loss) | 2 |
| Confidential | 2 | | Low (inconvenience) | 1 |
| Internal | 1 | | | |
| Public | 0 | | | |

Modifiers: no ready alternative +2 · network access to your systems +2 ·
subprocessors +1 · non-adequate jurisdiction +1 · vendor under 20 people +1.

| Total | Tier | Core obligations |
|-------|------|------------------|
| 8+ | **Tier 1 critical** | Annual security review, quarterly business review, **tested** exit plan, SLA with credits |
| 6-7 | **Tier 2 high** | Full questionnaire at onboarding, semi-annual review, documented exit plan |
| 4-5 | **Tier 3 moderate** | Short-form questionnaire, annual review, verified data export |
| Under 4 | **Tier 4 low** | Confirm what data it touches; nothing further |

**Tier by blast radius, not spend.** The $8K tool holding your entire customer
list outranks the $400K hosting contract holding nothing sensitive.

### Where renewal leverage comes from [PROVEN]

| Source | Worth | Requires |
|--------|-------|----------|
| A real alternative | 10-30% | 3-6 weeks of genuine evaluation, an internal sponsor willing to switch |
| Vendor fiscal timing | 10-25% | Knowing their year-end and aligning your close to it |
| Multi-year commitment | 10-20% | Price protection, exit-on-SLA-failure, and an increase cap — all three |
| Volume / consolidation | 15-30% | Real growth, not aspirational seat counts |
| Reference or case study | 5-15% | Marketing time, not money |
| Annual prepay | 5-10% | Cash-flow float, and a viability check first |

Not leverage: complaining about price, threatening to leave without an
alternative, escalating without a specific ask, or loyalty — long tenure lowers
vendor risk, which is why tenured accounts are often priced higher.

### Renewal calendar [PROVEN]

| Days before renewal | Action |
|--------------------|--------|
| 180 | Usage vs entitlement; confirm owner; decide renew / renegotiate / exit |
| 150 | Open the alternative evaluation if renegotiating seriously |
| 120 | First vendor conversation — signal expectations before they build the quote |
| 90 | **Notice deadline on most annual contracts. Serve notice if there is any doubt.** |
| 60 | Negotiate substance: price, increase cap, true-down, SLA credits, exit rights |
| 30 | Close; anything open now resolves in the vendor's favour |

Serving notice is not leaving — it converts an auto-renewal into a negotiation.

### Terms worth more than price [RECOMMENDED]

| Term | Target |
|------|--------|
| Annual increase cap | CPI, or 3-5% maximum |
| Seat true-down rights | At renewal, without penalty |
| Termination for SLA failure | Defined breach threshold, no penalty |
| Data export format | Open, documented, and tested |
| Subprocessor change notice | 30 days with an objection right |
| Assignment on acquisition | Consent required, or an exit right |

Seat true-down is the most valuable and least-requested term: nearly every SaaS
contract lets you add seats mid-term and forbids reducing them.

## Anti-Patterns

### Tiering by spend
**Mistake:** Applying diligence proportional to contract value — heavy scrutiny on the big infrastructure contract, a credit card and no questions for the $8,000 tool.
**Why it happens:** Procurement owns the process and procurement thresholds are denominated in money. Approval workflows trigger on spend because that is what finance systems can see.
**Instead:** Tier on data sensitivity and business criticality, with modifiers for substitutability and subprocessors. The small tool holding your customer list has a far larger blast radius than the large contract holding nothing sensitive, and it is exactly the one that gets bought on a card without a security review.

### Discovering the notice deadline after it passes
**Mistake:** Tracking renewal dates only, then finding at day 60 that the 90-day notice window closed a month ago and the contract has auto-renewed for another year.
**Why it happens:** Renewal dates are what contracts and calendars display. The notice deadline is a derived date nobody computes, and auto-renew clauses are written to be easy to miss.
**Instead:** Track both dates per contract, and treat the notice deadline as the real one. Serve notice at the deadline as routine on anything you intend to renegotiate — it reopens the contract without committing you to leave. An unowned contract is the one this happens to, so assign an internal owner to every vendor.

### The scorecard that ratifies a decision already made
**Mistake:** Choosing the vendor, then building a weighted scorecard whose weights and scores produce that vendor as the winner.
**Why it happens:** Rarely cynical. Someone forms a view during the demos, and weights get set afterwards with that view in the room — each individual weight feels defensible while the set of them is not.
**Instead:** Set and record the weights, with named anchors for what a 10 and a 5 look like, before any candidate is scored. Then run the sensitivity check: if the winner changes when one weight moves 50%, the result is an artifact of the weighting rather than a finding about the vendors, and the decision owner needs to see that before signing.

### Treating the SLA as a control
**Mistake:** Accepting a 99.9% uptime commitment with a 2% service credit and considering the risk managed.
**Why it happens:** The SLA exists, it has numbers in it, and it satisfies the checklist item. Nobody computes what the credit is actually worth against what an outage costs.
**Instead:** Price the remedy. A 2% credit on a $20K quarter is $400 for an outage that may cost you far more — that is a rounding error the vendor has already priced in, not a control. Negotiate tiered credits (5/10/25%), a cap above 20% of period fees, and a termination right after repeated breach. Losing the account changes vendor behaviour; credits do not. And measure availability against the error budget, not the percentage — missing 99.9% by half a point is nearly six times the permitted downtime.

## Files

| File | Purpose |
|------|---------|
| `scripts/vendor_scorecard.py` | Must-have gating, weighted scoring, cost-value ratio, and a weight-sensitivity check on the result |
| `scripts/portfolio_analyzer.py` | Renewal and notice-deadline tracking, derived risk tiers, HHI spend concentration, consolidation candidates |
| `scripts/sla_report.py` | SLA compliance with error-budget severity, credit tiers against the contractual cap, and multi-period trend |
| `references/vendor-risk-tiering.md` | Tiering model, per-tier obligations, onboarding diligence, concentration risk, monitoring signals, vendor distress indicators |
| `references/renewal-negotiation-leverage.md` | Renewal calendar, ranked leverage sources, terms beyond price, making SLAs bite, negotiation sequence, exit execution |
| `assets/vendor-selection-scorecard.md` | Selection deliverable: must-haves, weighted criteria with anchors, stability check, risk tier, commercial position |
| `assets/vendor-review-template.md` | Business review: SLA performance, usage vs entitlement, risk checks, renewal plan with milestone dates |
| `assets/sample_vendor_candidates.json` | Four candidates including one disqualified on a must-have and a near-tie between the top two |
| `assets/sample_portfolio.json` | Ten-vendor portfolio with a locked auto-renewal, an unowned contract, and a consolidation candidate |
| `assets/sample_sla.json` | Five metrics in both directions with credit tiers, a capped credit total, and a degrading trend |
