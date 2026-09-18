# Domain: c-level-advisor
Source Skills in this domain: 31

---

## board-deck-builder

Source path: `references/c-level-advisor/board-deck-builder/SKILL.md`

# Board Deck Builder

Build board decks that tell a story, not just show data. Every section has an owner, a narrative, and a "so what." Boards see 10+ decks per quarter -- yours needs a through-line.

## Keywords

board deck, investor update, board meeting, board pack, investor relations, quarterly review, board presentation, fundraising deck, investor deck, board narrative, QBR, quarterly business review, board report, metrics dashboard, bad news delivery, variance explanation

---

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Deck type and audience** (quarterly board, monthly update, fundraising, emergency) — sets slide count, structure, and which sections appear
- [ ] **The headline message this period** (beat plan / missed plan / need a decision) — drives the opening frame and whether the SOUF bad-news structure is needed
- [ ] **Which metrics the board actually tracks** (and their targets) — the metrics dashboard should show only these, with RAG status against targets
- [ ] **Specific asks or decisions needed from the board** — the asks section is the highest-value slide and must be concrete and owner-assigned

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## Deck Types and Structure

### Deck Type Selection

| Type | When | Slide Count | Sent in Advance | Key Section |
|------|------|-------------|-----------------|-------------|
| Quarterly Board Deck | Standard board meeting | 20-30 slides | 48 hours ahead | Full deck below |
| Monthly Update | Early-stage boards | 8-12 slides | 24 hours ahead | Metrics + risks |
| Fundraising Deck | Active fundraise | 12-15 slides | During meeting | Vision + traction |
| Emergency/Ad-hoc | Crisis or major decision | 5-8 slides | Depends | Situation + options |

---

## Standard Board Deck (Section by Section)

### Section 1: Executive Summary (CEO)

Three sentences. No more. No less.

| Sentence | Purpose | Example |
|----------|---------|---------|
| 1 | State of the business | "We closed Q3 at $2.4M ARR, up 22% QoQ" |
| 2 | Biggest development this period | "Signed our largest enterprise contract ($180K ACV)" |
| 3 | Forward-looking priority | "Q4 priority: close Series A and hit $2.8M ARR" |

**Anti-pattern**: "We had a good quarter with lots of progress across all areas."
**Why it fails**: Says nothing. Board learns nothing. Time wasted.

### Section 2: Key Metrics Dashboard (COO)

6-8 metrics maximum. Every metric needs a target and a status.

| Metric | This Period | Last Period | Target | Status | Trend |
|--------|-------------|-------------|--------|--------|-------|
| ARR | $2.4M | $1.97M | $2.3M | [G] | Up |
| MoM Growth | 8.1% | 7.2% | 7.5% | [G] | Up |
| Burn Multiple | 1.8x | 2.1x | < 2x | [G] | Improving |
| NRR | 112% | 108% | > 110% | [G] | Up |
| CAC Payback | 11 mo | 14 mo | < 12 mo | [G] | Improving |
| Headcount | 24 | 21 | 25 | [Y] | Below plan |

**Rule**: Only show metrics the board actually tracks. Ask what they care about. Remove anything they have said they do not care about.

### Section 3: Financial Update (CFO)

| Component | Include | Format |
|-----------|---------|--------|
| P&L Summary | Revenue, COGS, Gross Margin, OpEx, Net Burn | Table with variance column |
| Cash Position | Current balance + runway in months | Single number, bold |
| Burn Multiple Trend | 3-quarter trend | Line chart |
| Variance to Plan | Each line item vs. budget | Table with one-sentence explanations |
| Forecast Update | Next quarter projections | Conservative, base, upside |

**Rule**: Every variance needs a one-sentence explanation. "Revenue was below target" with no explanation is unacceptable.

### Section 4: Revenue and Pipeline (CRO)

| Component | Include | Format |
|-----------|---------|--------|
| ARR Waterfall | Opening -> New -> Expansion -> Contraction -> Churn -> Closing | Waterfall chart |
| NRR and Logo Churn | Current + 4-quarter trend | Table + trend line |
| Pipeline by Stage | Dollar amounts, not just counts | Funnel visualization |
| Forecast | Next quarter with confidence level | "High confidence $2.6M, upside to $2.9M" |
| Top 3 Deals | Name, amount, close date, risk | Table |

**Rule**: Forecast MUST include a confidence level. "We expect $2.8M" is weak.

### Section 5: Product Update (CPO)

| Component | Include | Format |
|-----------|---------|--------|
| Shipped This Quarter | 3-5 items with user impact | Bullet list |
| Shipping Next Quarter | 3-5 items with target dates | Bullet list |
| PMF Signals | NPS trend, DAU/MAU, feature adoption | Metrics table |
| Key Learning | One insight from customer research | Narrative paragraph |

**Rule**: No feature lists. Only features with evidence of user impact.

### Section 6: Growth and Marketing (CMO)

| Component | Include |
|-----------|---------|
| CAC by Channel | Table with efficiency trend |
| Pipeline Contribution | $ by channel |
| What's Working | Specific channels/campaigns with data |
| What's Being Cut | Underperforming channels |
| What's Being Tested | New experiments with hypothesis |

### Section 7: Engineering and Technical (CTO)

| Component | Include |
|-----------|---------|
| Delivery Velocity | 4-quarter trend |
| Tech Debt Ratio | Current + plan to address |
| Infrastructure | Uptime, incidents, cost trend |
| Security Posture | One line unless there is a material issue |

**Rule**: Keep this short unless there is a material issue. Boards do not need sprint details.

### Section 8: Team and People (CHRO)

| Component | Include |
|-----------|---------|
| Headcount | Actual vs. plan |
| Hiring | Offers out, pipeline, time-to-fill trend |
| Attrition | Regrettable vs. non-regrettable |
| Engagement | Latest survey score and trend |
| Notable | Key hires, key departures, key open roles |

### Section 9: Risk and Security (CISO)

| Component | Include |
|-----------|---------|
| Security Posture | Status of critical controls |
| Compliance | Certifications in progress, deadlines |
| Incidents | This quarter (if any): impact, resolution, prevention |
| Top 3 Risks | Risk description + mitigation status |

### Section 10: Strategic Outlook (CEO)

| Component | Include |
|-----------|---------|
| Next Quarter Priorities | 3-5 items, ranked by importance |
| Board Decisions Needed | Specific votes or approvals |
| Asks | Specific, actionable requests |

**Rule**: The "asks" section is the most important. "We'd like 3 warm introductions to CFOs at Series B companies" beats "any help would be appreciated."

### Section 11: Appendix

Include but do not present unless asked:
- Detailed financial model
- Full pipeline data
- Cohort retention charts
- Customer case studies
- Detailed headcount breakdown

---

## Narrative Framework

### The 4-Act Structure

Every board deck should follow this through-line:

```
Act 1: WHERE WE SAID WE'D BE
  Last quarter's targets and commitments

Act 2: WHERE WE ACTUALLY ARE
  Honest assessment -- good and bad

Act 3: WHY THE GAP EXISTS
  One cause per variance. Not excuses -- explanations.

Act 4: WHAT WE'RE DOING ABOUT IT
  Specific, dated, owned actions
```

This works for good news AND bad news. It is credible because it acknowledges reality.

### Opening Frame

The board should know the key message by slide 3, not slide 30.

| Good Opening | Bad Opening |
|-------------|-------------|
| "We beat ARR target by 8% and NRR hit 112%" | "Let me walk you through our quarter..." |
| "We missed revenue by $300K. Here's why and the fix." | "First, some context about market conditions..." |
| "We need a board vote on the acquisition opportunity" | "Before we get to the main topic, some updates..." |

---

## Delivering Bad News

### The SOUF Framework

| Step | What | Example |
|------|------|---------|
| **S**tate | State it plainly | "We missed Q3 ARR target by $300K (12% gap)" |
| **O**wn | Own the cause | "Primary driver: longer enterprise sales cycle than modeled" |
| **U**nderstand | Show you understand it | "Analyzed 8 stalled deals; pattern is procurement delays" |
| **F**ix | Present the fix | "Three changes: [specific, dated], revised Q4 target: $2.6M" |

### Bad News Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
|-------------|-------------|-----------------|
| Leading with good news to soften | Boards notice and distrust framing | Lead with the most important thing |
| "Market conditions" as cause | That is context, not a cause | Name specific, controllable causes |
| Fix without data | Board does not trust unfounded fixes | Show analysis behind the fix |
| Revised forecast without assumptions | Looks like guessing | Show bottom-up build |

---

## Common Board Deck Mistakes

| Mistake | Fix |
|---------|-----|
| Too many slides (> 25) | Cut ruthlessly. If you can not explain it, the slide is wrong. |
| Metrics without targets | Every metric needs a target and a status indicator |
| No narrative | Data without story forces boards to draw conclusions |
| Burying bad news | Lead with it, own it, fix it |
| Vague asks | Specific, actionable, person-assigned asks only |
| No variance explanation | Every gap from target needs a one-sentence cause |
| Stale appendix | Appendix is only useful if current |
| Designed for reader, not room | Decks are presented -- they must work spoken aloud |
| Inconsistent formatting | Use one template, one color scheme, one font |
| Too much text per slide | Max 6 lines per slide. Use speaker notes for detail. |

---

## Cadence Notes

| Type | Timing | Length | Advance Send |
|------|--------|--------|-------------|
| Quarterly (standard) | 48 hours before meeting | 20-30 slides | 48 hours |
| Monthly (early-stage) | 24 hours before meeting | 8-12 slides | 24 hours |
| Fundraising | In the meeting | 12-15 slides | Sometimes not shared |

---

## Deck Assembly Workflow

```
T-14 days: CEO sets agenda, identifies key messages
T-10 days: Section owners begin drafting their sections
T-7 days:  First drafts due. CEO reviews for narrative alignment.
T-5 days:  Second drafts. CFO validates all numbers.
T-3 days:  Final deck assembly. Narrative check.
T-2 days:  Send to board. Include cover note with 3 key takeaways.
T-0:       Meeting. CEO presents. Section owners available for questions.
```

---

## Red Flags

- Deck assembled night before the meeting -- no time for review or narrative alignment
- Numbers in deck do not match financial model -- credibility destroyer
- No asks section -- wasting board meeting time
- Same deck format for 4+ quarters with no iteration -- not responsive to feedback
- Board members surprised by information -- they should never learn bad news in the meeting
- More than 30 slides -- attention lost after slide 20
- No follow-up on previous meeting's action items -- accountability gap

---

## Integration with C-Suite

Each section is owned by a specific C-suite role:

| Section | Owner | Reference Skill |
|---------|-------|----------------|
| Executive Summary | CEO | `ceo-advisor` |
| Metrics Dashboard | COO | `coo-advisor` |
| Financial Update | CFO | `cfo-advisor` |
| Revenue/Pipeline | CRO | `cro-advisor` |
| Product Update | CPO | `cpo-advisor` |
| Growth/Marketing | CMO | `cmo-advisor` |
| Engineering | CTO | `cto-advisor` |
| Team/People | CHRO | `chro-advisor` |
| Risk/Security | CISO | `ciso-advisor` |
| Strategic Outlook | CEO | `ceo-advisor` |

---

## Output Artifacts

| Request | Deliverable |
|---------|-------------|
| "Prepare the board deck" | Complete deck outline with section owners and data requirements |
| "Monthly investor update" | Condensed update: metrics, highlights, risks, asks |
| "Help with the narrative" | 4-act narrative structure with key messages |
| "Deliver bad news" | SOUF framework applied to specific situation |
| "Fundraising deck" | Vision-led deck with traction, team, market, ask |
| "Review my board deck" | Critique against best practices, identify gaps |

---

## Tool Reference

### deck_structure_validator.py

Validates board deck completeness against best-practice section requirements.

```bash
# Validate with demo data
python scripts/deck_structure_validator.py

# Validate specific deck type with slide count
python scripts/deck_structure_validator.py --type quarterly --slides 24

# Validate with section list
python scripts/deck_structure_validator.py --sections executive_summary metrics_dashboard financial_update

# Validate from JSON file
python scripts/deck_structure_validator.py --input deck.json

# JSON output
python scripts/deck_structure_validator.py --input deck.json --json
```

### metrics_dashboard_generator.py

Generates formatted board-ready metrics dashboards with RAG status and trends.

```bash
# Generate demo dashboard
python scripts/metrics_dashboard_generator.py

# From JSON metrics file
python scripts/metrics_dashboard_generator.py --input metrics.json

# From CSV file
python scripts/metrics_dashboard_generator.py --csv metrics.csv

# JSON output
python scripts/metrics_dashboard_generator.py --json
```

### board_prep_checklist.py

Generates T-minus timeline checklists for board meeting preparation.

```bash
# Generate checklist for meeting 14 days out
python scripts/board_prep_checklist.py

# Specific meeting date with completed tasks
python scripts/board_prep_checklist.py --meeting-date 2026-04-15 --completed agenda_set topics_confirmed

# List all task IDs
python scripts/board_prep_checklist.py --list-tasks

# JSON output
python scripts/board_prep_checklist.py --meeting-date 2026-04-15 --json
```

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Board members ask basic questions answered in the deck | Deck not sent far enough in advance or not self-explanatory | Send 48+ hours ahead with a 3-takeaway cover note; ensure deck reads standalone |
| Financial numbers don't match across sections | No CFO cross-validation step | Add T-5 day CFO validation checkpoint; single source of truth for all metrics |
| Meeting runs over time on early sections | Too much detail in presenter slides, no time boxing | Enforce max 6 lines per slide; use speaker notes for depth; assign timekeeper |
| Board members surprised by bad news | Information not previewed in 1:1 pre-calls | CEO pre-briefs each board member on material issues before the meeting |
| Asks section produces no follow-through | Asks are vague ("any help appreciated") | Make asks specific, named, and actionable ("3 warm intros to Series B CFOs") |
| Same deck format for 4+ quarters with no improvement | No post-meeting feedback loop | Rate deck effectiveness at meeting end; iterate one section per quarter |
| Appendix never referenced | Appendix is stale or not relevant to current agenda | Update appendix before every meeting; remove data nobody has asked about in 2+ quarters |

---

## Success Criteria

- Board members report reading the deck in advance in 80%+ of meetings (measured by pre-meeting questions received)
- Meeting stays within time allocation with 70%+ of time on strategic discussion, not status updates
- Every board meeting produces at least 2 logged decisions with named owners and deadlines
- Bad news is never a surprise in the meeting -- all material issues previewed via 1:1 pre-calls
- Board NPS (informal quarterly check) scores 8+/10 on meeting usefulness
- Deck assembly completes by T-2 days with zero last-minute scrambles in 90%+ of quarters
- Action items from previous meeting have 80%+ completion rate reported at the next meeting

---

## Scope & Limitations

**In Scope**: Board deck structure, section templates, narrative frameworks, bad news delivery, metrics dashboards, deck assembly workflows, board prep checklists, quality validation.

**Out of Scope**: Actual financial data collection, slide design/visual formatting, board member relationship management, legal governance requirements, proxy statement preparation, regulatory filings.

**Limitations**: This skill provides structure and process but cannot replace the judgment required for crafting board narratives. The deck structure validator checks completeness, not quality of content. Metrics dashboard tools calculate RAG status from provided data but do not source live metrics.

---

## Integration Points

| Skill | Integration |
|-------|-------------|
| `ceo-advisor` | Executive summary and strategic outlook sections; overall narrative direction |
| `cfo-advisor` | Financial update section; all numbers validated through CFO tools |
| `cro-advisor` | Revenue and pipeline section; ARR waterfall and forecast confidence |
| `cmo-advisor` | Growth/marketing section; CAC by channel, marketing ROI data |
| `chro-advisor` | Team/people section; headcount, attrition, engagement metrics |
| `ciso-advisor` | Risk/security section; security posture, compliance status |
| `board-meeting` | Deck feeds into the 6-phase board meeting protocol |
| `chief-of-staff` | Prep checklist coordination; section owner orchestration |
| `company-os` | Scorecard metrics flow directly into the metrics dashboard section |

---

## board-meeting

Source path: `references/c-level-advisor/board-meeting/SKILL.md`

# Board Meeting Protocol

Structured multi-agent deliberation that prevents groupthink, captures minority views, and produces clean, actionable decisions. Every phase has a purpose, a format, and rules that cannot be skipped.

## Keywords

board meeting, executive deliberation, strategic decision, C-suite, multi-agent, founder review, decision extraction, independent perspectives, groupthink prevention, synthesis, critic analysis, structured deliberation

---

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The exact decision to be made** (stated in one sentence) — the whole protocol synthesizes toward a single decision; a fuzzy topic produces a fuzzy synthesis
- [ ] **Which roles to activate** — the role-activation matrix decides whose perspectives appear in Phase 2; the wrong roster means a missing voice or noise
- [ ] **What data and context is available** vs. assumed — Phase 2 contributions tag confidence and source, so known facts must be separated from guesses
- [ ] **Reversibility and stakes of the decision** — drives whether the full 6-phase protocol or an abbreviated advisory meeting is appropriate

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## The 6-Phase Protocol

```
PHASE 1: Context Gathering
    |
PHASE 2: Independent Contributions (ISOLATED)
    |
PHASE 3: Critic Analysis (Executive Mentor)
    |
PHASE 4: Synthesis (Chief of Staff)
    |
PHASE 5: Founder Review (FULL STOP -- human decides)
    |
PHASE 6: Decision Extraction and Logging
```

---

### Phase 1: Context Gathering

**Purpose**: Load all relevant context before anyone contributes.

```
Step 1: Load company context (if exists)
Step 2: Load decision history (Layer 2 ONLY -- NEVER raw transcripts)
Step 3: Reset session state -- no bleed from previous conversations
Step 4: Present agenda and activated roles
Step 5: Wait for founder confirmation before proceeding
```

#### Role Activation Matrix

Not all roles attend every meeting. Select based on topic:

| Topic Domain | Activate | Exclude |
|-------------|----------|---------|
| Market expansion | CEO, CMO, CFO, CRO, COO | CTO (unless tech expansion) |
| Product direction | CEO, CPO, CTO, CMO | CFO (unless budget question) |
| Hiring / org | CEO, CHRO, CFO, COO | CMO, CTO (unless their teams) |
| Pricing | CMO, CFO, CRO, CPO | CTO, CHRO |
| Technology | CTO, CPO, CFO, CISO | CMO, CRO |
| Fundraising | CEO, CFO, CRO | CISO, CHRO |
| Security incident | CEO, CTO, CISO, COO | CMO, CRO |
| M&A | CEO, CFO, CTO, CHRO, COO | -- (all relevant) |

**Maximum attendees**: 6 roles per meeting. More than 6 creates noise, not insight.

---

### Phase 2: Independent Contributions (ISOLATED)

**Critical Rule**: No cross-pollination. Each advisor contributes without seeing others' outputs. This is the primary groupthink prevention mechanism.

#### Contribution Order

```
1. Research/data gathering (if needed)
2. CMO  -- market perspective
3. CFO  -- financial perspective
4. CEO  -- strategic perspective
5. CTO  -- technical perspective
6. COO  -- operational perspective
7. CHRO -- people perspective
8. CRO  -- revenue perspective
9. CISO -- security/risk perspective
10. CPO -- product perspective
```

#### Contribution Format (Strict)

Each advisor's contribution must follow this exact format:

```
## [ROLE] -- [DATE]

Key Points (maximum 5):
  1. [Finding] -- Confidence: [High/Medium/Low] -- Source: [data source]
  2. [Finding] -- Confidence: [High/Medium/Low] -- Source: [data source]
  3. [Finding] -- Confidence: [High/Medium/Low] -- Source: [data source]

Recommendation: [Clear position statement]
Confidence: [High / Medium / Low]
Key Assumption: [The one assumption this recommendation depends on]
What Would Change My Mind: [Specific condition or data point]
```

#### Reasoning Techniques by Role

| Role | Technique | How It Works |
|------|-----------|-------------|
| CEO | Tree of Thought | Explore 3 possible futures, evaluate each |
| CFO | Chain of Thought | Show the math, step by step |
| CMO | Recursion of Thought | Draft -> self-critique -> refine |
| CPO | First Principles | Decompose to fundamental user needs |
| CRO | Chain of Thought | Pipeline math must be explicit |
| COO | Step by Step | Map the operational process |
| CTO | Analyze then Act | Research -> analyze -> recommend |
| CISO | Risk-Based | Probability x Impact for every option |
| CHRO | Empathy + Data | Human impact first, then validate with metrics |

---

### Phase 3: Critic Analysis

**Purpose**: The Executive Mentor receives ALL Phase 2 outputs simultaneously and performs adversarial review.

#### Critic Checklist

| Check | Question |
|-------|----------|
| Suspicious consensus | Where did agents agree too easily? |
| Shared assumptions | What assumptions are shared but unvalidated? |
| Missing voice | Who is not in the room? (customer voice? front-line ops?) |
| Unmentioned risk | What risk has nobody mentioned? |
| Domain bleed | Did any agent operate outside their domain? |
| Data quality | Which claims are backed by data vs. assumption? |
| Reversibility | Has anyone assessed if this decision can be undone? |

#### Critic Output Format

```
## CRITIC ANALYSIS

Consensus Assessment:
  [Genuine agreement / Suspicious alignment / Split decision]

Unvalidated Assumptions:
  1. [Assumption shared by multiple advisors but not verified]
  2. [Assumption]

Missing Perspectives:
  - [Voice or data point not represented]

Unmentioned Risks:
  - [Risk nobody raised]

Domain Violations:
  - [If any agent operated outside their domain]

The Uncomfortable Truth:
  [The one thing nobody wants to say but needs to be said]
```

---

### Phase 4: Synthesis

**Purpose**: Chief of Staff combines all inputs into a decision-ready format.

#### Synthesis Structure

```
## BOARD MEETING SYNTHESIS
Topic: [topic]
Date: [date]
Attendees: [roles]

### Decision Required
[One sentence: what must be decided]

### Perspectives Summary
| Role | Position | Confidence | Key Concern |
|------|----------|-----------|-------------|
| [Role] | [1-line summary] | [H/M/L] | [Top concern] |
| [Role] | [1-line summary] | [H/M/L] | [Top concern] |

### Where They Agree
[2-3 consensus points]

### Where They Disagree
[Named conflicts with each side's reasoning]
[What the disagreement is really about]

### Critic's View
[The uncomfortable truth from Phase 3]

### Recommended Decision
[Clear recommendation with rationale]

### Action Items (if approved)
1. [Action] -- Owner: [role] -- Deadline: [date]
2. [Action] -- Owner: [role] -- Deadline: [date]
3. [Action] -- Owner: [role] -- Deadline: [date]

### Your Call
[If you disagree with the recommendation, here are alternatives:]
Option A: [description] -- Trade-off: [what you gain/lose]
Option B: [description] -- Trade-off: [what you gain/lose]
```

---

### Phase 5: Founder Review

**FULL STOP. Wait for the founder. No agent acts beyond this point.**

```
FOUNDER REVIEW

[Paste synthesis above]

Options:
  [A] Approve as recommended
  [M] Modify (specify changes)
  [R] Reject (specify reason)
  [Q] Ask follow-up question to specific role
  [D] Defer decision (specify timeline)
```

#### Phase 5 Rules

| Rule | Rationale |
|------|-----------|
| Founder corrections override all agent proposals | Human judgment is final |
| No pushback on founder decisions | Agents advise, founder decides |
| 30-minute inactivity auto-closes as "pending review" | Prevents zombie meetings |
| Founder can reopen any time | Decisions are not time-locked |
| Follow-up questions go to specific role | Keeps discussion focused |

---

### Phase 6: Decision Extraction

**Purpose**: After founder approval, extract and log all decisions.

```
Step 1: Write full transcript to Layer 1
  --> memory/board-meetings/YYYY-MM-DD-raw.md

Step 2: Run conflict detection against existing decisions
  --> Check for DO_NOT_RESURFACE violations
  --> Check for topic contradictions
  --> Check for owner conflicts

Step 3: Surface any conflicts to founder for resolution

Step 4: Append approved decisions to Layer 2
  --> memory/board-meetings/decisions.md

Step 5: Mark rejected proposals with DO_NOT_RESURFACE

Step 6: Confirm to founder:
  "Meeting concluded. Logged: [N] decisions, [M] action items,
   [K] DO_NOT_RESURFACE flags."
```

---

## Failure Mode Reference

| Failure | Detection | Fix |
|---------|-----------|-----|
| Groupthink | All advisors agree without tension | Re-run Phase 2 isolated; force "strongest argument against" |
| Analysis paralysis | Discussion exceeds 5 points per advisor | Cap at 5; force recommendation even with Low confidence |
| Bikeshedding | Discussion on minor points, major decisions deferred | Log as async action; return to main agenda |
| Role bleed | CFO making product calls, CTO pricing | Critic flags in Phase 3; exclude from synthesis |
| Layer contamination | Raw transcripts loaded in Phase 1 | Hard rule: decisions.md only. Never raw. |
| Founder absence | Phase 5 timeout | Auto-close as pending. No decisions without founder. |
| Stale context | Company context not loaded | Phase 1 mandatory context check |
| Missing role | Key perspective not activated | Chief of Staff reviews topic against routing matrix |

---

## Meeting Cadence

| Trigger | Meeting Type | Typical Duration |
|---------|-------------|-----------------|
| Scheduled quarterly | Full strategic review | 2-3 hours |
| Complexity score >= 8 | On-demand strategic | 1-2 hours |
| Cross-functional conflict | Resolution meeting | 1 hour |
| Crisis or urgent decision | Emergency session | 30-60 minutes |
| Founder request | Any topic | Varies |

---

## Red Flags

- Board meetings consistently produce no decisions -- meeting is theater
- Same topic discussed in 3+ meetings -- decision avoidance
- Phase 2 contributions all align perfectly -- isolation was breached or topic is trivial
- No Phase 3 (critic) conducted -- groupthink risk
- Founder skipping Phase 5 -- decisions without accountability
- Decisions logged but never reviewed -- decision logger not functioning
- Meeting attendees always include all roles -- topic selection not working

---

## Output Artifacts

| Request | Deliverable |
|---------|-------------|
| "Convene the board on [topic]" | Full 6-phase protocol execution |
| "Quick advisory meeting" | Abbreviated: Phase 1-2-4-5 (skip critic) |
| "Review a past meeting" | Load Layer 1 raw transcript (explicit request only) |
| "What did we decide about [topic]?" | Search Layer 2 decision history |
| "Resume a pending meeting" | Reload Phase 5 with pending synthesis |

---

## Tool Reference

### meeting_simulator.py

Validates role activation, contribution completeness, and phase sequencing.

```bash
# Simulate with defaults
python scripts/meeting_simulator.py

# Specify topic and complexity
python scripts/meeting_simulator.py --topic "Series B timing" --type fundraising --complexity 9

# Specify activated roles
python scripts/meeting_simulator.py --type m_and_a --roles CEO CFO CTO CHRO

# List all topic types and required roles
python scripts/meeting_simulator.py --list-topics

# JSON output
python scripts/meeting_simulator.py --type strategy --json
```

### decision_tracker.py

Tracks board decisions, detects conflicts, flags overdue reviews and actions.

```bash
# Track demo decisions
python scripts/decision_tracker.py

# From decision log file
python scripts/decision_tracker.py --input decisions.json

# JSON output
python scripts/decision_tracker.py --json
```

### complexity_scorer.py

Scores decision complexity to determine single/dual/multi-advisor or board routing.

```bash
# Score with CLI flags
python scripts/complexity_scorer.py --topic "Market expansion" --domains 2 --reversibility 2 --financial 1 --team 2 --urgency 0

# Add modifiers
python scripts/complexity_scorer.py --topic "Acquisition" --domains 2 --reversibility 2 --financial 2 --team 2 --urgency 1 --modifiers cross_functional external_stakeholders sets_precedent

# JSON output
python scripts/complexity_scorer.py --topic "Pricing change" --json
```

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| All advisors agree without any tension in Phase 2 | Groupthink or trivial topic; isolation may have been breached | Re-run Phase 2 with forced "strongest argument against" from each role |
| Discussion exceeds 5 points per advisor | Analysis paralysis; no cap enforced | Hard cap at 5 key points; force a recommendation even with Low confidence |
| Phase 5 times out with no founder response | Founder absence or decision avoidance | Auto-close as "pending review" at 30 min; no decisions without founder |
| Same topic discussed in 3+ meetings | Decision avoidance or new data not surfaced | Escalate: force decision or formally defer with stated timeline |
| Decisions logged but never reviewed | Decision logger not integrated into meeting cadence | Add "previous decisions review" to Phase 1 context loading |
| Roles operating outside their domain | No critic analysis conducted or critic missed it | Enforce Phase 3 critic checklist; flag domain violations explicitly |

---

## Success Criteria

- Every board meeting produces at least 1 logged decision with owner, deadline, and review date
- Phase 2 contributions are independently generated (zero cross-pollination incidents per quarter)
- Phase 3 critic analysis identifies at least 1 unvalidated assumption per meeting
- Founder approval/modification/rejection captured within 30 minutes of synthesis presentation
- Decision history has zero conflicting active decisions (conflicts detected and resolved)
- Meeting duration stays within 2 hours for standard strategic reviews, 1 hour for resolution meetings
- 90%+ of logged decisions have action items completed by their stated deadlines

---

## Scope & Limitations

**In Scope**: Multi-agent deliberation protocol, role activation matrix, contribution formats, critic analysis, synthesis, decision extraction, decision conflict detection, meeting simulation.

**Out of Scope**: Actual AI agent orchestration (this is a protocol specification, not runtime code), real-time meeting facilitation, video/audio recording, external board member management.

**Limitations**: The protocol assumes all advisor contributions are available in text format. Complexity scoring provides routing guidance but cannot account for political dynamics. Decision conflict detection works on exact topic matching -- semantic conflicts across different topics require human judgment.

---

## Integration Points

| Skill | Integration |
|-------|-------------|
| `chief-of-staff` | Routes questions that score 9-10 complexity into the board meeting protocol |
| `decision-logger` | Phase 6 feeds decisions directly into the two-layer decision memory |
| `board-deck-builder` | Board deck sections provide pre-read context for Phase 1 |
| `executive-mentor` | Phase 3 critic analysis can be performed by the Executive Mentor skill |
| `ceo-advisor` through `ciso-advisor` | All C-suite advisors contribute independently in Phase 2 |
| `strategic-alignment` | Validates that meeting decisions align with strategic goals |

---

## ceo-advisor

Source path: `references/c-level-advisor/ceo-advisor/SKILL.md`

# CEO Advisor

Strategic frameworks and tools for chief executive leadership, organizational transformation, and stakeholder management.

## Keywords
CEO, chief executive officer, executive leadership, strategic planning, board governance, investor relations, board meetings, board presentations, financial modeling, strategic decisions, organizational culture, company culture, leadership development, stakeholder management, executive strategy, crisis management, organizational transformation, investor updates, strategic initiatives, company vision

## Quick Start

### For Strategic Planning
```bash
python scripts/strategy_analyzer.py
```
Analyzes strategic position and generates actionable recommendations.

### For Financial Scenarios
```bash
python scripts/financial_scenario_analyzer.py
```
Models different business scenarios with risk-adjusted projections.

### For Decision Making
Review `references/executive_decision_framework.md` for structured decision processes.

### For Board Management
Use templates in `references/board_governance_investor_relations.md` for board packages.

### For Culture Building
Implement frameworks from `references/leadership_organizational_culture.md` for transformation.

## Core CEO Responsibilities

### 1. Vision & Strategy

#### Setting Direction
- **Vision Development**: Define 10-year aspirational future
- **Mission Articulation**: Clear purpose and why we exist
- **Strategy Formulation**: 3-5 year competitive positioning
- **Value Definition**: Core beliefs and principles

#### Strategic Planning Cycle
```
Q1: Environmental Scan
- Market analysis
- Competitive intelligence
- Technology trends
- Regulatory landscape

Q2: Strategy Development
- Strategic options generation
- Scenario planning
- Resource allocation
- Risk assessment

Q3: Planning & Budgeting
- Annual operating plan
- Budget allocation
- OKR setting
- Initiative prioritization

Q4: Communication & Launch
- Board approval
- Investor communication
- Employee cascade
- Partner alignment
```

### 2. Capital & Resource Management

#### Capital Allocation Framework
```python
# Run financial scenario analysis
python scripts/financial_scenario_analyzer.py

# Allocation priorities:
1. Core Operations (40-50%)
2. Growth Investments (25-35%)
3. Innovation/R&D (10-15%)
4. Strategic Reserve (10-15%)
5. Shareholder Returns (varies)
```

#### Fundraising Strategy
- **Seed/Series A**: Product-market fit focus
- **Series B/C**: Growth acceleration
- **Late Stage**: Market expansion
- **IPO**: Public market access
- **Debt**: Non-dilutive growth

### 3. Stakeholder Leadership

#### Stakeholder Priority Matrix
```
         Influence →
         Low        High
    High ┌─────────┬─────────┐
Interest │ Keep    │ Manage  │
    ↑    │Informed │ Closely │
         ├─────────┼─────────┤
    Low  │Monitor  │  Keep   │
         │         │Satisfied│
         └─────────┴─────────┘

Primary Stakeholders:
- Board of Directors
- Investors
- Employees
- Customers

Secondary Stakeholders:
- Partners
- Community
- Media
- Regulators
```

### 4. Organizational Leadership

#### Culture Development
From `references/leadership_organizational_culture.md`:

**Culture Transformation Timeline**:
- Months 1-2: Assessment
- Months 2-3: Design
- Months 4-12: Implementation
- Months 12+: Embedding

**Key Levers**:
- Leadership modeling
- Communication
- Systems alignment
- Recognition
- Accountability

### 5. External Representation

#### CEO Communication Calendar

**Daily**:
- Customer touchpoint
- Team check-in
- Metric review

**Weekly**:
- Executive team meeting
- Board member update
- Key customer/partner call
- Media opportunity

**Monthly**:
- All-hands meeting
- Board report
- Investor update
- Industry engagement

**Quarterly**:
- Board meeting
- Earnings call
- Strategy review
- Town hall

## Executive Routines

### Daily CEO Schedule Template

```
6:00 AM - Personal development (reading, exercise)
7:00 AM - Day planning & priority review
8:00 AM - Metric dashboard review
8:30 AM - Customer/market intelligence
9:00 AM - Strategic work block
10:30 AM - Meetings block
12:00 PM - Lunch (networking/thinking)
1:00 PM - External meetings
3:00 PM - Internal meetings
4:30 PM - Email/communication
5:30 PM - Team walk-around
6:00 PM - Transition/reflection
```

### Weekly Leadership Rhythm

**Monday**: Strategy & Planning
- Executive team meeting
- Metrics review
- Week planning

**Tuesday**: External Focus
- Customer meetings
- Partner discussions
- Investor relations

**Wednesday**: Operations
- Deep dives
- Problem solving
- Process review

**Thursday**: People & Culture
- 1-on-1s
- Talent reviews
- Culture initiatives

**Friday**: Innovation & Future
- Strategic projects
- Learning time
- Planning ahead

## Critical CEO Decisions

### Go/No-Go Decision Framework

Use framework from `references/executive_decision_framework.md`:

**Major Decisions Requiring Framework**:
- M&A opportunities
- Market expansion
- Major pivots
- Large investments
- Restructuring
- Leadership changes

**Decision Checklist**:
- [ ] Problem clearly defined
- [ ] Data/evidence gathered
- [ ] Options evaluated
- [ ] Stakeholders consulted
- [ ] Risks assessed
- [ ] Implementation planned
- [ ] Success metrics defined
- [ ] Communication prepared

### Crisis Management

#### Crisis Leadership Playbook

**Level 1 Crisis** (Department)
- Monitor situation
- Support as needed
- Review afterwards

**Level 2 Crisis** (Company)
- Activate crisis team
- Lead response
- Communicate frequently

**Level 3 Crisis** (Existential)
- Take direct control
- Board engagement
- All-hands focus
- External communication

## Board Management

### Board Meeting Success

From `references/board_governance_investor_relations.md`:

**Preparation Timeline**:
- T-4 weeks: Agenda development
- T-2 weeks: Material preparation
- T-1 week: Package distribution
- T-0: Meeting execution

**Board Package Components**:
1. CEO Letter (1-2 pages)
2. Dashboard (1 page)
3. Financial review (5 pages)
4. Strategic updates (10 pages)
5. Risk register (2 pages)
6. Appendices

### Managing Board Dynamics

**Building Trust**:
- Regular communication
- No surprises
- Transparency
- Follow-through
- Respect expertise

**Difficult Conversations**:
- Prepare thoroughly
- Lead with facts
- Own responsibility
- Present solutions
- Seek alignment

## Investor Relations

### Investor Communication

**Earnings Cycle**:
1. Pre-announcement quiet period
2. Earnings release
3. Conference call
4. Follow-up meetings
5. Conference participation

**Key Messages**:
- Growth trajectory
- Competitive position
- Financial performance
- Strategic progress
- Future outlook

### Fundraising Excellence

**Pitch Deck Structure**:
1. Problem (1 slide)
2. Solution (1-2 slides)
3. Market (1-2 slides)
4. Product (2-3 slides)
5. Business Model (1 slide)
6. Go-to-Market (1-2 slides)
7. Competition (1 slide)
8. Team (1 slide)
9. Financials (2 slides)
10. Ask (1 slide)

## Performance Management

### Company Scorecard

**Financial Metrics**:
- Revenue growth
- Gross margin
- EBITDA
- Cash flow
- Runway

**Customer Metrics**:
- Acquisition
- Retention
- NPS
- LTV/CAC

**Operational Metrics**:
- Productivity
- Quality
- Efficiency
- Innovation

**People Metrics**:
- Engagement
- Retention
- Diversity
- Development

### CEO Self-Assessment

**Quarterly Reflection**:
- What went well?
- What could improve?
- Key learnings?
- Priority adjustments?

**Annual 360 Review**:
- Board feedback
- Executive team input
- Skip-level insights
- Self-evaluation
- Development plan

## Succession Planning

### CEO Succession Timeline

**Ongoing**:
- Identify internal candidates
- Develop high potentials
- External benchmarking

**T-3 Years**:
- Formal succession planning
- Candidate assessment
- Development acceleration

**T-1 Year**:
- Final selection
- Transition planning
- Communication strategy

**Transition**:
- Knowledge transfer
- Stakeholder handoff
- Gradual transition

## Personal Development

### CEO Learning Agenda

**Core Competencies**:
- Strategic thinking
- Financial acumen
- Leadership presence
- Communication
- Decision making

**Development Activities**:
- Executive coaching
- Peer networking (YPO/EO)
- Board service
- Industry involvement
- Continuous education

### Work-Life Integration

**Sustainability Practices**:
- Protected family time
- Exercise routine
- Mental health support
- Vacation planning
- Delegation discipline

**Energy Management**:
- Know peak hours
- Block deep work time
- Batch similar tasks
- Take breaks
- Reflect daily

## Tools & Resources

### Essential CEO Tools

**Strategy & Planning**:
- Strategy frameworks (Porter, BCG, McKinsey)
- Scenario planning tools
- OKR management systems

**Financial Management**:
- Financial modeling
- Cap table management
- Investor CRM

**Communication**:
- Board portal
- Investor relations platform
- Employee communication tools

**Personal Productivity**:
- Calendar management
- Task management
- Note-taking system

### Key Resources

**Books**:
- "Good to Great" - Jim Collins
- "The Hard Thing About Hard Things" - Ben Horowitz
- "High Output Management" - Andy Grove
- "The Lean Startup" - Eric Ries

**Frameworks**:
- Jobs-to-be-Done
- Blue Ocean Strategy
- Balanced Scorecard
- OKRs

**Networks**:
- YPO (Young Presidents' Organization)
- EO (Entrepreneurs' Organization)
- Industry associations
- CEO peer groups

## Success Metrics

### CEO Effectiveness Indicators

✅ **Strategic Success**
- Vision clarity and buy-in
- Strategy execution on track
- Market position improving
- Innovation pipeline strong

✅ **Financial Success**
- Revenue growth targets met
- Profitability improving
- Cash position strong
- Valuation increasing

✅ **Organizational Success**
- Culture thriving
- Talent retained
- Engagement high
- Succession ready

✅ **Stakeholder Success**
- Board confidence high
- Investor satisfaction
- Customer NPS strong
- Employee approval rating

## Red Flags

⚠️ Missing targets consistently  
⚠️ High executive turnover  
⚠️ Board relationship strained  
⚠️ Culture deteriorating  
⚠️ Market share declining  
⚠️ Cash burn increasing  
⚠️ Innovation stalling  
⚠️ Personal burnout signs

---

## Tool Reference

### strategy_analyzer.py

Comprehensive strategic position analysis across 5 pillars (market position, financial health, operational excellence, organizational capability, growth potential). Applies Porter's Five Forces, SWOT, and BCG matrix.

```bash
# Run with demo data
python scripts/strategy_analyzer.py

# Run with custom company data (JSON)
python scripts/strategy_analyzer.py < company_data.json
```

**Input format**: JSON with `market_position`, `financial_health`, `organizational_capability`, `growth_potential`, `competitive_forces` objects. Each contains factor scores (0-100).

**Output**: Strategic health score (0-100), pillar-level analysis, strategic options ranked by priority, risk assessment, and 4-phase roadmap.

### financial_scenario_analyzer.py

Models multiple financial scenarios with NPV, IRR, break-even analysis, and risk-adjusted returns.

```bash
# Run with demo scenarios
python scripts/financial_scenario_analyzer.py

# Run with custom base case and scenarios (JSON)
python scripts/financial_scenario_analyzer.py < scenarios.json
```

**Input format**: JSON with `base_case` (revenue, cogs, operating_expenses, cash, burn_rate, valuation) and `scenarios` array (each with name, probability, growth_model, growth_rate, changes).

**Output**: Base case summary, per-scenario projections (3-year), NPV, IRR, break-even month, risk-adjusted expected value, and recommended scenario.

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Strategy analysis scores all pillars as "Adequate" (50) | Default scores used because no data provided | Provide actual pillar data; defaults mask real strengths and weaknesses |
| Board loses confidence in CEO updates | Updates are vague or miss key metrics | Use the 3-sentence executive summary format; lead with numbers, not narratives |
| Strategic plan exists but execution stalls | No OKR cascade or accountability mechanism | Tie strategy to quarterly rocks; review weekly in L10 meetings |
| Investor updates generate more questions than answers | Missing key metrics or unclear narrative | Follow Monthly Metrics Package template; include variance explanations for every miss |
| Crisis response is reactive and chaotic | No pre-defined severity levels or response playbook | Implement 3-level crisis framework; run tabletop exercises quarterly |
| Culture initiatives don't stick | No reinforcement mechanism; treated as one-time event | Embed culture metrics in performance reviews; CEO models behaviors visibly |
| Board meeting prep is always last-minute | No structured T-minus timeline | Implement the T-14 to T-0 preparation workflow; assign Chief of Staff as owner |

---

## Success Criteria

- Strategic health score improves quarter-over-quarter (tracked via strategy_analyzer.py)
- Board confidence rating maintained at 8+/10 (informal quarterly feedback)
- Investor update sent within 24 hours of month-end close with zero data discrepancies
- Crisis response time: Level 1 within 24 hours, Level 2 within 4 hours, Level 3 immediate
- Executive team alignment: 90%+ of leadership can articulate top 3 company priorities identically
- Succession plan exists for CEO and all direct reports, reviewed annually
- CEO time allocation: 40%+ on strategic work, less than 25% on operational firefighting

---

## Scope & Limitations

**In Scope**: Strategic planning frameworks, financial scenario modeling, board governance, investor relations, crisis management, culture development, CEO routines and decision frameworks.

**Out of Scope**: Legal advice, regulatory filings, actual fundraising execution, personal coaching beyond frameworks, industry-specific competitive intelligence, board member recruiting.

**Limitations**: Strategy analyzer uses weighted scoring which simplifies complex strategic reality. Financial scenario models use simplified growth projections -- they are directional, not precise forecasts. Crisis playbooks provide structure but cannot predict specific crisis scenarios.

---

## Integration Points

| Skill | Integration |
|-------|-------------|
| `cfo-advisor` | Financial scenarios, fundraising strategy, board financial sections |
| `board-deck-builder` | Executive summary and strategic outlook sections of board decks |
| `board-meeting` | CEO leads Phase 1 context and Phase 5 synthesis review |
| `chief-of-staff` | Routes strategic questions; synthesizes multi-advisor outputs |
| `company-os` | CEO sets vision that feeds 1-year plan and quarterly rocks |
| `culture-architect` | Culture transformation frameworks; values-to-behaviors translation |
| `founder-coach` | CEO personal development and leadership evolution |
| `strategic-alignment` | Validates goal cascade from vision to team-level OKRs |

---

## cfo-advisor

Source path: `references/c-level-advisor/cfo-advisor/SKILL.md`

# CFO Advisor

The agent acts as a fractional CFO, providing financial strategy and operational finance guidance grounded in SaaS benchmarks, GAAP standards, and investor expectations.

## Clarify First

Before building the model or analysis, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Stage + current financials** — ARR, net burn, cash balance, headcount, as-of date (the entire baseline; runway and Burn Multiple are meaningless without recent figures)
- [ ] **Deliverable** — unit economics / 3-year model / monthly metrics package / board financial presentation (selects the workflow step, template, and script)
- [ ] **Revenue-build assumptions** — new-logo rate by segment, expansion, churn, pricing changes (drives the entire Revenue Build; the model is only as good as these)
- [ ] **Purpose / audience** — fundraise, board review, or internal planning (sets the conclusion, which metrics lead, and assumptions-appendix rigor)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

1. **Establish financial baseline** -- Collect current ARR, burn rate, cash balance, and headcount. Calculate runway in months. Validate that the data is recent (within 30 days).
2. **Build unit economics** -- Calculate CAC, LTV, CAC Payback, LTV:CAC ratio, NRR, and Burn Multiple using the formulas below. Flag any metric outside benchmark ranges.
3. **Construct financial model** -- Build a 3-year model following the Revenue Build and Expense Build structures. Document all key assumptions explicitly.
4. **Design investor reporting** -- Configure the Monthly Metrics Package template. Set up the Board Financial Presentation slide structure for quarterly use.
5. **Set up cash management** -- Build the 13-week cash flow forecast. Establish the monthly rolling forecast. Verify minimum 6-month runway is maintained.
6. **Establish close cadence** -- Implement the Month-End Timeline (Day 1-12). Assign owners to each quality checklist item.
7. **Assess risk posture** -- Review market, credit, and operational risk categories. Confirm insurance coverage is adequate for company stage.

## SaaS Unit Economics

```
CAC = (Sales + Marketing Spend) / New Customers
CAC Payback = CAC / (ARPU x Gross Margin)

LTV = ARPU x Gross Margin x Customer Lifetime
LTV:CAC Ratio = LTV / CAC                        Target: > 3:1

Logo Retention = (Customers End - New) / Customers Start
Net Revenue Retention = (MRR End - Churn + Expansion) / MRR Start
```

## Burn Multiple

```
Burn Multiple = Net Burn / Net New ARR

< 1.0x   Excellent efficiency
1.0-1.5x Good efficiency
1.5-2.0x Average
> 2.0x   Needs improvement
```

## Rule of 40

```
Rule of 40 = Revenue Growth % + Profit Margin %

> 40%   Strong performance
20-40%  Acceptable
< 20%   Needs attention
```

## Monthly Metrics Package

```
FINANCIAL HIGHLIGHTS
- Revenue: $X.XM (vs Plan: +/-Y%)
- Gross Margin: XX% (vs Plan: +/-Y%)
- Operating Loss: $X.XM (vs Plan: +/-Y%)
- Cash Balance: $X.XM
- Runway: XX months

REVENUE METRICS
- ARR: $X.XM (+Y% QoQ)
- Net New ARR: $XXK
- NRR: XXX%
- Logo Churn: X.X%

EFFICIENCY METRICS
- CAC: $X,XXX
- CAC Payback: XX months
- Burn Multiple: X.Xx
```

## Board Financial Presentation

1. Financial summary (1 slide)
2. Revenue performance (1-2 slides)
3. Expense breakdown (1 slide)
4. Cash flow and runway (1 slide)
5. Key metrics trends (1 slide)
6. Forecast outlook (1 slide)

## Revenue Build (Financial Model)

1. Starting ARR / customers
2. New logo assumptions (by segment)
3. Expansion rate
4. Churn rate
5. Pricing changes
6. Segment mix

## Expense Build (Financial Model)

1. Headcount plan (by department)
2. Comp and benefits
3. Contractors
4. Software / tools
5. Facilities
6. Marketing programs
7. Travel and events

## Budget Categories

| Category | Line Items |
|----------|-----------|
| Revenue | New business (by segment), expansion, renewals, professional services |
| Cost of Revenue | Hosting/infrastructure, support, PS delivery, payment processing |
| OpEx | Sales & Marketing, R&D, G&A |

## Month-End Close Timeline

| Days | Activity |
|------|----------|
| 1-3 | Transaction cutoff |
| 3-5 | Reconciliations |
| 5-7 | Accruals and adjustments |
| 7-10 | Management review |
| 10-12 | Final close |

**Quality Checklist**: Bank reconciliation, revenue recognition, expense accruals, prepaid amortization, deferred revenue, intercompany elimination, flux analysis.

## Revenue Recognition (ASC 606)

1. Identify the contract
2. Identify performance obligations
3. Determine transaction price
4. Allocate price to obligations
5. Recognize revenue when satisfied

**SaaS considerations**: Subscription vs usage revenue, implementation services, professional services, multi-year contracts, discounts and credits.

## Cash Management

**13-Week Cash Flow**: Week-by-week projections of all known inflows/outflows. Review weekly. Maintain minimum cash buffer.

**Monthly Rolling Forecast**: 12-month forward view covering revenue collection timing, payroll, vendor payments, debt service, and CapEx.

**Treasury Principles**: Maintain 6+ months runway, preserve capital, optimize yield on idle cash, follow investment policy.

**Cash Preservation Levers** (when extending runway):
1. Hiring freeze
2. Vendor renegotiation
3. Discretionary spend cuts
4. Payment term extension
5. Revenue acceleration
6. Bridge financing

## Due Diligence Data Room Checklist

**Financial data**:
- [ ] 3 years historical financials
- [ ] Monthly P&L by segment
- [ ] Balance sheet and cash flow
- [ ] ARR/MRR cohort analysis
- [ ] Customer unit economics
- [ ] Revenue recognition policy
- [ ] AR aging
- [ ] AP summary

**Projections**:
- [ ] 3-5 year financial model
- [ ] Key assumptions documented
- [ ] Sensitivity analysis
- [ ] Use of funds breakdown
- [ ] Path to profitability

## Financial Risk Categories

| Risk Type | Key Concerns |
|-----------|-------------|
| Market | Interest rate exposure, FX exposure, customer concentration |
| Credit | Customer creditworthiness, AR aging, bad debt reserves |
| Operational | Internal controls, fraud prevention, systems reliability |

## Example: Series-A SaaS Financial Snapshot

A Series-A company ($3M ARR, 35 employees, $12M raised) preparing for Series B:

```
Unit Economics:
  CAC: $22K  |  LTV: $88K  |  LTV:CAC: 4.0x  |  CAC Payback: 16 months
  NRR: 115%  |  Logo Retention: 90%  |  Gross Margin: 78%

Burn:
  Monthly burn: $350K  |  Net new ARR/month: $180K
  Burn Multiple: 1.9x (average -- needs improvement for Series B)
  Cash: $5.2M  |  Runway: 15 months

Rule of 40:
  Revenue growth: 95% YoY  |  Profit margin: -40%
  Score: 55% (strong)

Board recommendation: Raise in 6 months at current trajectory.
  Target metrics for raise: Burn Multiple < 1.5x, NRR > 120%.
```

## Essential Insurance Policies

D&O, E&O, Cyber liability, General liability, Workers compensation, Key person insurance.

## Scripts

```bash
# Unit economics calculator
python scripts/unit_economics.py --metrics data.csv

# Cash flow projector
python scripts/cash_forecast.py --actuals Q1.csv --assumptions model.yaml

# Financial model builder
python scripts/fin_model.py --template saas --output model.xlsx

# Investor metrics dashboard
python scripts/investor_metrics.py --period monthly
```

## References

- `references/financial_modeling.md` -- Model building guide
- `references/saas_metrics.md` -- SaaS metrics deep dive
- `references/accounting_policies.md` -- Policy documentation
- `references/audit_prep.md` -- Audit readiness guide

---

## Tool Reference

### financial_health_scorer.py

Comprehensive SaaS financial health assessment: Rule of 40, burn multiple, LTV:CAC, CAC payback, NRR, magic number, and composite score with investor-readiness verdict.

```bash
# Run with demo data (Series A SaaS)
python scripts/financial_health_scorer.py

# Quick assessment with key metrics
python scripts/financial_health_scorer.py --arr 3000000 --revenue-growth 95 --profit-margin -40 --burn 350000 --cash 5200000 --nrr 115 --gross-margin 78 --headcount 35

# From JSON file
python scripts/financial_health_scorer.py --input financials.json

# JSON output
python scripts/financial_health_scorer.py --input financials.json --json
```

### burn_rate_calculator.py

Models burn rate, runway under 5 scenarios (current, hiring freeze, 10% cut, 20% cut, revenue acceleration), generates 13-week cash flow forecast, and identifies action triggers.

```bash
# Run with demo data
python scripts/burn_rate_calculator.py

# Quick calculation
python scripts/burn_rate_calculator.py --cash 5200000 --revenue 250000 --expenses 600000 --headcount 35

# JSON output
python scripts/burn_rate_calculator.py --json
```

### scenario_modeler.py

Three-scenario financial projection engine with probability weighting, sensitivity analysis, and decision triggers. Projects base, upside, and downside cases over 8 quarters.

```bash
# Run with demo data
python scripts/scenario_modeler.py

# Quick model from key inputs
python scripts/scenario_modeler.py --arr 3000000 --expenses 900000 --cash 5200000 --quarters 8

# From JSON with custom scenarios
python scripts/scenario_modeler.py --input scenarios.json

# JSON output
python scripts/scenario_modeler.py --json
```

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Burn multiple shows > 3.0x | Spending significantly outpaces net new ARR | Audit S&M efficiency; consider hiring freeze; validate pipeline conversion rates |
| Rule of 40 score below 20% | Growth has slowed without corresponding margin improvement | Either re-accelerate growth or cut costs to improve margins -- cannot stay in the middle |
| CAC payback exceeds 24 months | Sales cycle too long, ACV too low, or S&M spend too high | Segment CAC by channel; cut underperforming channels; raise ACV through pricing |
| LTV:CAC ratio below 2.0x | Customer lifetime too short (churn) or acquisition too expensive | Address churn first (higher ROI); then optimize CAC by channel |
| NRR below 100% | Contraction and churn exceed expansion revenue | Build expansion playbook; segment churning customers; invest in customer success |
| Financial model assumptions questioned by board | Assumptions not documented or unrealistic | Document every assumption explicitly; show sensitivity analysis for key variables |
| Month-end close takes 15+ days | Manual processes, missing reconciliations, or unclear ownership | Implement the Day 1-12 close timeline; assign owners to each checklist item |

---

## Success Criteria

- Financial health composite score above 65/100 (measured quarterly via financial_health_scorer.py)
- Rule of 40 score maintained above 40% for Series B+ companies
- Burn multiple below 2.0x (below 1.5x for Series B readiness)
- CAC payback under 18 months (under 12 months for top-quartile performance)
- Month-end close completed within 12 business days with zero material adjustments
- Board financial presentation completed 48+ hours before every board meeting
- Cash runway maintained above 12 months at all times (above 18 months preferred)

---

## Scope & Limitations

**In Scope**: SaaS unit economics, burn rate analysis, financial modeling, cash management, investor reporting, month-end close, revenue recognition (ASC 606), due diligence preparation, scenario modeling.

**Out of Scope**: Tax planning, legal entity structuring, audit execution, payroll processing, accounts payable/receivable operations, insurance procurement, equity cap table management.

**Limitations**: Financial health scorer uses industry benchmarks that may not apply to non-SaaS business models. Burn rate calculator uses linear/exponential approximations -- actual cash flows vary with billing cycles and payment timing. Scenario modeler provides directional guidance, not auditable financial projections.

---

## Integration Points

| Skill | Integration |
|-------|-------------|
| `ceo-advisor` | Financial scenarios feed board strategy discussions |
| `board-deck-builder` | Financial update section; all deck numbers validated through CFO tools |
| `cro-advisor` | Revenue forecasting; pipeline-to-revenue conversion assumptions |
| `chro-advisor` | Headcount budget modeling; fully-loaded cost calculations |
| `ciso-advisor` | Compliance budget sizing against quantified risk exposure |
| `company-os` | Financial metrics in the weekly scorecard |
| `chief-of-staff` | Routes financial questions; synthesizes CFO + CEO perspectives |

---

## change-management

Source path: `references/c-level-advisor/change-management/SKILL.md`

# Change Management Playbook

Most changes fail at implementation, not design. This skill provides the complete framework for rolling out organizational changes -- from process tweaks to full strategic pivots -- with minimal disruption and maximum adoption.

## Keywords

change management, ADKAR, organizational change, reorg, process change, tool migration, strategy pivot, change resistance, change fatigue, change communication, stakeholder management, adoption, compliance, change rollout, transition

---

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The change type** (process, org/reorg, strategy pivot, or culture) — selects the playbook, timeline, and which ADKAR phase is hardest
- [ ] **What is changing and the honest business WHY** — the WHY anchors every communication; without it the rollout reads as arbitrary and breeds resistance
- [ ] **Who is affected and how** (directly affected vs. broader org) — drives communication sequencing and the order in which audiences hear it
- [ ] **How many other changes are already active** — if 3+ changes are running and under-absorbed, the plan must address change fatigue before adding more

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## Change Type Selection

```
START: Change is needed
  |
  v
[What type of change?]
  |
  +-- Process Change (new tools, workflows)
  |     Timeline: 4-8 weeks
  |     Hardest phase: Ability
  |     See: Process Change Playbook
  |
  +-- Org Change (reorg, new leader, team restructure)
  |     Timeline: 3-6 months
  |     Hardest phase: Desire
  |     See: Org Change Playbook
  |
  +-- Strategy Pivot (new direction, killed products)
  |     Timeline: 3-12 months
  |     Hardest phase: Awareness
  |     See: Strategy Pivot Playbook
  |
  +-- Culture Change (values refresh, behavior expectations)
        Timeline: 12-24 months
        Hardest phase: Reinforcement
        See: Culture Change Playbook
```

---

## Core Model: ADKAR (Startup-Adapted)

### Overview

| Phase | What It Is | Failure Symptom |
|-------|-----------|----------------|
| **A**wareness | People understand WHY the change is happening | "Nobody told me why" |
| **D**esire | People want to participate (or at least don't resist) | "I understand but I don't agree" |
| **K**nowledge | People know HOW to do things the new way | "I want to but I don't know how" |
| **A**bility | People have time, tools, and support to change | "I know how but I can't do it yet" |
| **R**einforcement | The change sticks as the new default | "We tried but went back to the old way" |

### ADKAR Diagnostic

When a change is struggling, identify which phase is broken:

| Symptom | Broken Phase | Fix |
|---------|-------------|-----|
| "Why are we doing this?" | Awareness | Re-communicate the WHY with data |
| "This is a bad idea" | Desire | Address concerns, involve in HOW |
| "I don't know how to do this" | Knowledge | Training, documentation, office hours |
| "I keep reverting to old habits" | Ability | Practice time, reduce workload, support |
| "We started but stopped" | Reinforcement | Measurement, recognition, remove old way |

### ADKAR Implementation Timeline

| Week | Phase | Key Activities |
|------|-------|---------------|
| -4 | Awareness prep | Identify stakeholders, draft communication |
| -2 | Awareness launch | CEO/leader video explaining WHY |
| -1 | Desire building | Concerns session, address fears, involve in HOW |
| 0 | Knowledge + Go-live | Training, documentation, launch |
| 1-2 | Ability support | Office hours, help desk, reduced load |
| 3-4 | Ability + early Reinforcement | Adoption check, public wins, feedback |
| 6-8 | Full Reinforcement | Old way deprecated, adoption measured, recognized |

---

## Resistance Patterns and Responses

### Resistance Diagnostic Matrix

| Pattern | What They Say | What It Signals | Response |
|---------|-------------|-----------------|---------|
| Vocal opposition | "This won't work" | Awareness or credibility gap | Present evidence, acknowledge concern |
| Timing challenge | "Why now?" | Awareness gap | Explain urgency and cost of delay |
| Process complaint | "I wasn't consulted" | Desire gap | Acknowledge, involve in the HOW now |
| Capacity excuse | "I don't have time" | Ability gap | Reduce load or extend timeline |
| Historical reference | "We tried this before" | Trust gap | Name what is different this time |
| Silent non-compliance | [No verbal pushback, just doesn't change] | Could be any phase | 1:1 conversation to diagnose |
| Malicious compliance | [Does it technically but undermines] | Deep desire gap | Direct conversation about real concern |

### Resistance Response Decision Tree

```
START: Resistance detected
  |
  v
[Is it vocal or silent?]
  |
  +-- VOCAL --> Good. They care enough to push back.
  |              |
  |              v
  |            [Is the concern valid?]
  |              |
  |              +-- YES --> Modify the change. Resistance is information.
  |              +-- NO  --> Address with data and empathy. Do not dismiss.
  |
  +-- SILENT --> Dangerous. Could be any ADKAR phase.
                 |
                 v
               [1:1 conversation with specific questions]
                 "What concerns you about this change?"
                 "What would need to be true for this to work for you?"
                 "What support would help?"
```

### The Worst Response to Resistance

"Some people are just resistant to change."

This treats resistance as a personality flaw rather than a signal. Every resistance pattern is information about which ADKAR phase is broken. Diagnose before responding.

---

## Change Communication Framework

### Communication Sequencing

| Audience | Order | Channel | Content |
|----------|-------|---------|---------|
| Leadership team | 1st | In-person/video meeting | Full context + their role in rollout |
| Directly affected employees | 2nd | Manager 1:1 or small group | Personal impact + support available |
| All employees | 3rd | All-hands or written + Q&A | WHY + WHAT + timeline + FAQ |
| External stakeholders | 4th (if applicable) | Appropriate channel | Need-to-know only |

### Communication Template (CEO/Leader Announcement)

```
Structure:
  1. What is changing (1-2 sentences, direct)
  2. Why it is changing (the business reason -- honest)
  3. What this means for you (practical impact)
  4. What is NOT changing (stability anchor)
  5. Timeline (specific dates)
  6. How to ask questions (channel, person, office hours)
  7. What happens next (first concrete step)
```

### Communication Cadence by Change Type

| Change Type | Pre-announcement | Launch Day | Week 1 | Month 1 | Month 3 |
|-------------|-----------------|-----------|--------|---------|---------|
| Process | Heads-up to leads | All-hands email | FAQ published | Adoption check | Old way removed |
| Org | 1:1s with affected | Synchronous meeting | FAQ + manager 1:1s | Retro | Health check |
| Strategy | Leadership alignment | All-hands with Q&A | Team-level "what does this mean" | Resource proof | First milestone |
| Culture | Input gathering | Story-based announcement | Behavior anchors | Reviews reflect it | Ongoing |

---

## Change Fatigue

### Fatigue Detection

| Signal | Severity | Response |
|--------|----------|----------|
| Eye-rolls during announcements | Early | Acknowledge the pace, show results of previous changes |
| Low attendance at change sessions | Moderate | Make attendance optional but results visible |
| Fast paper compliance, slow real adoption | Significant | Pause non-critical changes |
| "Here we go again" comments | Significant | Audit change inventory, communicate stability |
| Complete disengagement | Critical | Freeze changes, rebuild trust |

### Fatigue Prevention Rules

| Rule | Implementation |
|------|---------------|
| Finish what you start | Do not launch new change while previous is absorbing |
| One major change at a time | Space 2-3 months between significant changes |
| Announce stability | Explicitly state what is NOT changing |
| Show results | Publish what previous change achieved before launching next |
| Change budget | Treat organizational attention as a finite resource |

### Change Inventory

Before launching any new change, inventory all active changes:

| Change | Phase | Start Date | Absorption % | Can It Pause? |
|--------|-------|-----------|-------------|---------------|
| New CRM rollout | Ability | 2 weeks ago | 60% | No |
| Engineering reorg | Desire | 1 month ago | 40% | Yes |
| Values refresh | Reinforcement | 3 months ago | 75% | No |

**Rule**: If 3+ changes are active and < 70% absorbed, do not add another.

---

## Playbook 1: Process Change

**Timeline**: 4-8 weeks | **Hardest Phase**: Ability

| Week | Activity | Owner |
|------|----------|-------|
| -2 | Announce WHY + go-live date | Change sponsor |
| -1 | Training sessions available | Change team |
| 0 | Go-live + support person available | Change team |
| 2 | Adoption check: who is using it, who is not | Change team |
| 4 | Feedback collection + public wins | Change sponsor |
| 8 | Old system deprecated | IT + Change team |

---

## Playbook 2: Org Change

**Timeline**: 3-6 months | **Hardest Phase**: Desire

| Timing | Activity | Owner |
|--------|----------|-------|
| Day 0 | Announce with WHY -- synchronous, in-person preferred | CEO/leader |
| Day 1 | 1:1s with most affected by their manager | Managers |
| Week 1 | FAQ published with honest answers | HR + Change team |
| Week 2-4 | New structure operating (do not delay) | All leaders |
| Month 2 | First retrospective | Change team |
| Month 3-6 | Regular health check-ins | HR |

**What to say about a leader departure**: Be honest about what you can share. Never say "we can't share the reasons" without offering what you CAN say about what it means for the team.

---

## Playbook 3: Strategy Pivot

**Timeline**: 3-12 months | **Hardest Phase**: Awareness

| Timing | Activity | Owner |
|--------|----------|-------|
| Pre-announcement | Leadership alignment (everyone must be on same page) | CEO |
| Day 0 | Internal announcement first (employees BEFORE press) | CEO |
| Week 1 | Team-level "what does this mean for us" conversations | Team leads |
| Week 2 | Resource reallocation announced | CFO + COO |
| Month 1 | First milestone of new direction visible | Relevant leader |
| Ongoing | Regular updates on new direction progress | CEO |

**What kills pivots**: Announcing a new direction while still funding the old one at the same level. Move the resources or the pivot is not real.

---

## Playbook 4: Culture Change

**Timeline**: 12-24 months | **Hardest Phase**: Reinforcement

| Phase | Activity | Timeline |
|-------|----------|----------|
| Input | Involve representative sample in defining the change | Month 1-2 |
| Announce | Story-based announcement with observed behaviors | Month 2 |
| Anchor | Define observable behaviors for each culture change | Month 2-3 |
| Model | Leadership team visibly models new behavior first | Month 3+ |
| Integrate | New behaviors appear in performance reviews | Next review cycle |
| Celebrate | Publicly recognize new behavior when observed | Ongoing |

---

## Adoption Measurement

### Adoption vs. Compliance

| Dimension | Compliance | Adoption |
|-----------|-----------|----------|
| Behavior | Does it when watched | Does it because it is better |
| Duration | Reverts when enforcement relaxes | Sustained without enforcement |
| Attitude | Reluctant | Willing or enthusiastic |
| Source | External pressure | Internal belief |

Only reinforcement creates adoption. Compliance is the result of enforcement. Aim for adoption.

### Adoption Metrics

| Metric | How to Measure | Target |
|--------|---------------|--------|
| Usage rate | % of people actively using new process/tool | > 80% by week 8 |
| Reversion rate | % reverting to old way | < 10% |
| Satisfaction | Survey: "Is the new way better?" | > 60% agree |
| Speed | Time to complete task old way vs. new way | New way faster by week 4 |
| Support requests | Volume of help requests | Declining week over week |

---

## Red Flags

- Change announced on Friday afternoon -- people stew over the weekend
- "This is final, questions are not welcome" framing -- creates underground resistance
- No published FAQ or way to ask questions safely -- concerns go unaddressed
- Old system still running 6 weeks after go-live -- change is not real
- Leaders exempt from the change they are asking everyone to make -- destroys credibility
- No measurement of adoption -- assuming go-live equals success
- Multiple major changes running simultaneously -- change fatigue guaranteed
- No post-change retrospective -- missing the feedback loop
- Change announced without a named owner -- nobody is accountable for success

---

## Integration with C-Suite

| When... | Change Management Works With... | To... |
|---------|-------------------------------|-------|
| Process change | COO (`coo-advisor`) | Design new process before announcing |
| Org restructure | CHRO + CEO | People impact assessment, communication |
| Strategy pivot | CEO (`ceo-advisor`) | Alignment and narrative |
| Culture change | Culture Architect (`culture-architect`) | Values-to-behaviors translation |
| Tool migration | CTO (`cto-advisor`) | Technical rollout plan |
| Operating system change | Company OS (`company-os`) | New rhythms and cadences |
| Alignment after change | Strategic Alignment (`strategic-alignment`) | Verify cascade post-change |

---

## Output Artifacts

| Request | Deliverable |
|---------|-------------|
| "Plan a change rollout" | ADKAR-based change plan with timeline and owners |
| "We're doing a reorg" | Org change playbook with communication plan |
| "Manage resistance to [change]" | Resistance diagnosis + targeted responses |
| "Are we in change fatigue?" | Change inventory + fatigue assessment + recommendations |
| "Communication plan for [change]" | Sequenced communication with templates |
| "Measure adoption of [change]" | Adoption metrics dashboard with targets |

---

## Tool Reference

### change_readiness_assessor.py

Assesses organizational readiness using ADKAR model, identifies resistance patterns, measures change fatigue, and generates intervention plans.

```bash
# Run with demo data
python scripts/change_readiness_assessor.py

# Specify change type
python scripts/change_readiness_assessor.py --type org

# From JSON assessment data
python scripts/change_readiness_assessor.py --input assessment.json

# JSON output
python scripts/change_readiness_assessor.py --json
```

### adoption_tracker.py

Tracks usage rates, reversion rates, satisfaction, and support requests to distinguish real adoption from surface compliance.

```bash
# Run with demo data
python scripts/adoption_tracker.py

# From JSON with weekly data
python scripts/adoption_tracker.py --input adoption_data.json

# JSON output
python scripts/adoption_tracker.py --json
```

### communication_planner.py

Generates audience-sequenced communication plans with templates, channel recommendations, and timing.

```bash
# Generate for process change
python scripts/communication_planner.py --type process --name "New CRM Rollout" --date 2026-04-15

# Generate for org change
python scripts/communication_planner.py --type org --name "Engineering Restructure"

# From JSON
python scripts/communication_planner.py --input comm_plan.json

# JSON output
python scripts/communication_planner.py --type strategy --json
```

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Usage rate high but satisfaction low | Compliance without adoption -- people use it because forced to | Investigate satisfaction drivers; don't rely on enforcement alone; improve the tool/process itself |
| Adoption plateaus at 60-70% | Remaining 30% have unaddressed ADKAR gaps (often Ability) | Segment non-adopters; run 1:1 diagnostics; provide targeted support |
| Change reverts within weeks of go-live | Reinforcement phase skipped; old system still accessible | Remove old system access; measure and recognize new behavior; embed in performance reviews |
| Leaders exempt themselves from the change | "Do as I say, not as I do" pattern | Leaders must go first and visibly. No exceptions. This is the #1 credibility destroyer |
| Multiple changes running and all struggling | Change fatigue -- organizational attention exhausted | Inventory active changes; pause non-critical ones; space major changes 2-3 months apart |
| Communication plan exists but concerns persist | Communication was broadcast-only with no feedback channel | Add Q&A sessions, named contact person, anonymous feedback channel |

---

## Success Criteria

- ADKAR readiness score above 70/100 before go-live (measured via change_readiness_assessor.py)
- Adoption rate exceeds 80% within 8 weeks of go-live (usage, not just compliance)
- Reversion rate below 10% by week 8 (measured by system usage data)
- Satisfaction survey shows 60%+ agreement that "the new way is better" by week 8
- Support requests decline week-over-week after week 2 (ability phase resolving)
- No change announced on Friday afternoon (measured by communication log timestamps)
- Post-change retrospective conducted within 90 days with documented lessons learned

---

## Scope & Limitations

**In Scope**: ADKAR-based readiness assessment, resistance diagnosis and response, change fatigue measurement, communication planning and sequencing, adoption tracking, playbooks for process/org/strategy/culture changes.

**Out of Scope**: Specific tool migration execution (CRM, ERP configuration), legal compliance for workforce reductions, union negotiation, employment law, individual coaching or therapy.

**Limitations**: ADKAR scores are based on assessment inputs -- they reflect perception, not objective measurement. Adoption tracker requires manual data collection for most metrics. Communication planner provides templates but cannot account for company-specific political dynamics. Change fatigue assessment is directional; actual organizational capacity varies by company culture.

---

## Integration Points

| Skill | Integration |
|-------|-------------|
| `coo-advisor` | Process change design before announcing; operational readiness |
| `chro-advisor` | People impact assessment; communication sequencing for reorgs |
| `ceo-advisor` | Strategy pivot narrative alignment; CEO as primary communicator |
| `culture-architect` | Culture change playbook; values-to-behaviors translation |
| `company-os` | New OS rollout follows ADKAR model; meeting rhythm changes |
| `chief-of-staff` | Routes change management questions; orchestrates cross-functional alignment |
| `strategic-alignment` | Verifies goal cascade post-change; validates new direction is reflected in OKRs |

---

## chief-ai-officer-advisor

Source path: `references/c-level-advisor/chief-ai-officer-advisor/SKILL.md`

# Chief AI Officer Advisor

The agent acts as a fractional Chief AI Officer, providing AI strategy and
operating-model guidance grounded in modern AI governance frameworks (NIST
AI RMF, ISO 42001, EU AI Act), MLOps maturity references, and enterprise
AI investment heuristics.

## When to use this skill

- Defining the **AI strategy** for the next 12–24 months (themes, bets, KPIs)
- Designing an **AI operating model**: centralized vs federated vs hybrid
- Building an **AI governance program** that satisfies internal and regulatory expectations
- Drafting an **AI risk register** and aligning it to NIST AI RMF / ISO 42001
- Scoring **AI maturity** across strategy, data, MLOps, governance, and people
- Planning **AI investment**: capex/opex split, build-vs-buy, infra vs talent vs tooling
- Preparing **AI updates for the board** (results, risks, regulatory posture, asks)

## Inputs the advisor expects

When invoking this skill, you should provide some combination of:

- The company stage, sector, and regulatory exposure (e.g., financial services, healthcare, education)
- Current AI portfolio (production use cases, pilots, evaluations, killed projects)
- Data assets and constraints (data quality, governance maturity, sovereignty)
- Existing AI/ML team composition (DS, MLE, MLOps, governance, product, legal/compliance)
- Existing AI policies, model risk management framework, AUP, and acceptable-use policies
- Spend posture: total AI spend (people + infra + tooling), trailing year + plan
- Top stakeholders and current frictions (CEO, CTO, CISO, CFO, GC, business leaders)

## Workflows

### Workflow 1 — Assess AI maturity (0-100, 5 dimensions)

1. Pull the latest org context: portfolio, team, governance, infra, spend.
2. Run `ai_maturity_assessor.py` on a populated input JSON.
3. Review the dimension-level scores (strategy, data, MLOps, governance, people)
   and the prioritized gap list.
4. Translate gaps into a quarterly OKR draft for the AI org.

```bash
python3 chief-ai-officer-advisor/scripts/ai_maturity_assessor.py \
  --input company_ai_state.json --format markdown
```

### Workflow 2 — Plan AI investment for the next budget cycle

1. Collect candidate initiatives (existing + proposed) with cost, expected impact,
   risk tier (EU AI Act minimal/limited/high-risk) and dependencies.
2. Run `ai_investment_planner.py` to allocate budget across themes using a
   strategic-fit × value × risk scoring model.
3. Use the output to build the CFO submission and the board appendix.

```bash
python3 chief-ai-officer-advisor/scripts/ai_investment_planner.py \
  --input ai_portfolio.json --budget 5000000 --format markdown
```

### Workflow 3 — Stand up a baseline AI risk register

1. Walk the AI portfolio and tag each system by risk tier, modality, data
   sensitivity, and business criticality.
2. Run `ai_risk_register_generator.py` to seed a register aligned to
   NIST AI RMF (Govern/Map/Measure/Manage) and ISO 42001 (AIMS clauses).
3. Assign owners and review cadences; route through the governance committee.

```bash
python3 chief-ai-officer-advisor/scripts/ai_risk_register_generator.py \
  --input ai_systems.json --framework nist-ai-rmf --format markdown
```

## Decision frameworks

### Centralize vs federate AI

| Signal | Lean centralized | Lean federated |
|--------|------------------|----------------|
| Regulatory exposure | High (finance, health, public sector) | Low/medium |
| Org size | <500 engineers | >1000 engineers, BU autonomy |
| Maturity | Early (need to set standards) | Late (BUs have ML chops) |
| Risk appetite | Conservative | Aggressive, fast iteration |

A typical pattern at scale is **hub-and-spoke**: a central AI/ML platform and
governance team (the hub) sets standards, owns infra, and reviews high-risk
systems; embedded ML squads (the spokes) own product outcomes inside business
units. The advisor will recommend this as the default unless context says otherwise.

### Build vs buy vs partner

- **Build** when the capability is differentiating (proprietary data + workflow)
- **Buy** when the capability is undifferentiated and well-served by SaaS (transcription, generic chat UI, vector store)
- **Partner** when there's deep model IP you can't replicate and the partner is willing to accept your governance terms (e.g., a frontier-lab partnership with a data-residency contract)

### When to declare a system "high-risk" under EU AI Act

Use `ai_risk_register_generator.py --framework eu-ai-act` to test classification
against Annex III categories. If the system is in scope of one of the eight
high-risk categories (e.g., employment screening, credit scoring, critical
infrastructure), trigger the conformity assessment + post-market monitoring
playbook from `references/ai-risk-and-governance.md`.

## Common engagements

### "Help me write the AI section of the board deck"

1. Run the maturity assessor; pull dimension scores and 3-month delta.
2. Pull top 3 wins and top 3 risks from the risk register output.
3. Use the **What changed / What's next / Asks** structure (see `c-level-advisor/board-deck-builder`).
4. Keep the section to one page; reserve detail for the appendix.

### "We're being asked to deploy a high-risk AI system in 6 months. What do we do?"

1. Classify under EU AI Act Annex III + ISO 42001 risk categorization.
2. Stand up the AI Impact Assessment (use `ra-qm-team/audit-prep/aims-audit` skill).
3. Confirm the data is governed (lineage, consent, minimisation).
4. Define the human oversight model and acceptance criteria.
5. Plan post-market monitoring + incident reporting (Article 73).
6. Get the AI governance committee sign-off before deployment.

### "What should our AI org look like in 12 months?"

1. Map current state to the target operating model (hub-and-spoke vs federated).
2. Identify roles to hire/promote: AI platform lead, ML governance lead, applied ML squads.
3. Define a RACI for: model approvals, infra spend, incident response, vendor reviews.
4. Plan the L&D investment for non-ML engineers (prompt eng, eval design, AI literacy).

## Anti-patterns to avoid

- **AI strategy that doesn't tie to a business outcome.** Strategy without P&L attribution becomes a research project.
- **One governance committee for everything.** Split: an exec AI council (strategy, spend) from a technical model review board (architectures, eval results).
- **Banning the LLM tool that everyone is already using.** Set acceptable-use policies, provide a sanctioned tool, monitor — don't drive usage underground.
- **Treating AI risk as someone else's problem.** The CAIO owns the model risk taxonomy; legal/compliance partners on enforcement.
- **Buying eight LLM platforms.** Consolidate to one or two; the value is in eval, governance, and shared infra, not in tool sprawl.
- **Forgetting that 70% of "AI" cost is data + people.** Infra is the noisy line; people and data quality are where you actually spend.

## References

- `references/ai-strategy-framework.md` — strategy themes, operating models, prioritization heuristics
- `references/ai-risk-and-governance.md` — NIST AI RMF, ISO 42001, EU AI Act mapping
- `references/ai-org-and-talent.md` — org-design patterns, role definitions, hiring sequence

## Related skills

- `c-level-advisor/cto-advisor` — for the technical platform decisions that intersect AI
- `c-level-advisor/ciso-advisor` — for AI security risks (prompt injection, model theft, data exfil)
- `ra-qm-team/iso42001-ai-management` — for the deep AIMS implementation
- `ra-qm-team/eu-ai-act-specialist` — for high-risk AI system conformity
- `ra-qm-team/audit-prep/ai-act-readiness` — for short-runway EU AI Act readiness sprints
- `engineering/senior-ml-engineer` — for the implementation side of model deployment
- `engineering/senior-prompt-engineer` — for LLM-specific patterns

## Output expectations

When the advisor runs, the user should be able to walk away with:

1. A clearly stated **point of view** (not "it depends")
2. **2–4 concrete next actions** with owners and timelines
3. **Open questions** that materially change the recommendation
4. References to relevant **scripts and reference docs** that deepen the analysis

---

## chief-customer-officer-advisor

Source path: `references/c-level-advisor/chief-customer-officer-advisor/SKILL.md`

# Chief Customer Officer Advisor

The agent acts as a fractional Chief Customer Officer, providing customer
strategy, retention/expansion, and voice-of-customer guidance grounded in
SaaS retention benchmarks, modern CX program patterns, and the operational
realities of post-sale teams.

## When to use this skill

- Defining the **CX strategy** for the next 12–24 months (segments, outcomes, scorecards)
- Designing the **CX operating model** (Sales / CS / Support / Services boundaries)
- Scoring **CX maturity** across strategy, segmentation, journey, voice, ops, talent
- Planning **churn interventions** for a portfolio of at-risk accounts
- Designing or refreshing the **voice-of-customer (VoC) program**
- Defining the **net revenue retention (NRR)** thesis and the activities behind it
- Preparing the **customer section of the board deck** (NRR, NPS, GRR, churn drivers, asks)

## Inputs the advisor expects

- Company stage, ARR, segment mix (Enterprise / Mid-Market / SMB), motion (PLG / sales-led)
- Trailing 12-month NRR, GRR, logo churn, expansion rate by segment
- Existing CS structure: CSM ratios, books, comp model, scope (technical, commercial)
- Existing health-score model and pipeline of at-risk accounts
- VoC instruments in place (NPS, CSAT, CES, in-app surveys, win/loss, churn interviews)
- Top frictions: from CEO, GTM partner (CRO), product, support, customers

## Workflows

### Workflow 1 — Score CX maturity

1. Pull current CX state across 6 dimensions (strategy, segmentation, journey,
   voice, operations, talent).
2. Run `cx_maturity_scorer.py` against the populated JSON.
3. Translate prioritized gaps into a quarterly CX OKR.

```bash
python3 chief-customer-officer-advisor/scripts/cx_maturity_scorer.py \
  --input cx_state.json --format markdown
```

### Workflow 2 — Plan churn interventions for the portfolio

1. Pull at-risk account list with health, ARR, segment, risk drivers, last touch.
2. Run `churn_intervention_planner.py` to prioritize and assign interventions
   matched to risk type and tier.
3. Use output for the weekly save-room and the CSM dashboards.

```bash
python3 chief-customer-officer-advisor/scripts/churn_intervention_planner.py \
  --input at_risk_accounts.json --format markdown
```

### Workflow 3 — Design or refresh the VoC program

1. Capture the current state of feedback instruments, cadences, owners, action loops.
2. Run `voc_program_designer.py` to recommend a target VoC architecture and a
   12-month rollout sequence.
3. Use output to align CX, product, marketing, and support on a shared VoC plan.

```bash
python3 chief-customer-officer-advisor/scripts/voc_program_designer.py \
  --input voc_state.json --format markdown
```

## Decision frameworks

### What does the CCO own?

Pick clearly. Most CCO scope debates stem from ambiguous ownership.

| Function | Default ownership |
|----------|-------------------|
| Customer Success | CCO |
| Support / Customer Support | CCO (or VP Support reporting in) |
| Onboarding / Services | CCO (or separate Services GM in larger orgs) |
| Renewals | Usually CCO; sometimes CRO |
| Expansion (cross-sell / upsell) | Split: CCO on usage-driven; CRO on net-new product lines |
| VoC program | CCO |
| Customer marketing (advocacy, references, community) | Often CCO; sometimes CMO |
| Customer Education / Training | CCO |

When the CRO and CCO both report to CEO, the renewals + expansion question
is the friction point. Resolve it explicitly; don't leave it to a quarterly
food fight.

### Segmentation that earns its keep

A useful segmentation is one your motion actually differentiates on:

- **Enterprise:** named CSM, technical CSM, executive sponsor, quarterly business review
- **Mid-Market:** pooled CSM, scheduled check-ins, customer scorecard
- **SMB / PLG:** digital-first; in-product activation; periodic outreach on milestones

If you've defined "Enterprise" but you treat all customers identically,
your segmentation is theater. Tie segments to:
- CSM coverage model + ratio
- Engagement cadence
- Services package
- Health-score sensitivity

### The right CSM coverage ratio

A rough guide (highly company-dependent):

| Segment | ARR per CSM (USD) | Accounts per CSM |
|---------|-------------------|------------------|
| Enterprise high-touch | $4M–$10M | 10–25 |
| Mid-Market | $2M–$5M | 30–80 |
| SMB / Pooled | $1M–$2M | 200–500 |
| PLG / Tech-touch | $5M+ | 1000+ |

If your ratio is far above the band, expect churn to creep up; far below,
your CS unit economics will hurt margin. Either way, name the choice
explicitly.

### What drives NRR (and what doesn't)

NRR is the single most predictive metric of long-term outcomes. Drivers:

- **Onboarding-to-first-value time** (every week of delay = ~1–2% NRR drag at scale)
- **Adoption depth** in the first 90 days
- **Feature/usage-driven expansion paths**
- **Pricing model alignment with value** (per-seat works when seats grow; consumption when usage grows)
- **Executive engagement** (top 20% of customers)
- **Renewal motion discipline** (90/60/30 day playbook, not last-minute fire drill)

Things often credited for NRR that don't move the needle:
- One-off save offers (mask the issue, don't fix it)
- NPS surveys without action loops
- More CSM headcount without better book design

## Common engagements

### "Help me make the case for a separate CS org under CCO"
1. Quantify the current friction: cycle time on renewals, churn-driver concentration, customer NPS gap by stage.
2. Show the cost of inaction (NRR trajectory) and the expected delta.
3. Propose the new operating model with RACI for the Sales–CS–Support handoff.
4. Stage the rollout: pilot in 1 segment for 1 quarter; expand based on results.

### "Our NPS is fine but churn is rising"
1. Investigate the NPS sampling: who responded? who didn't? exec sponsors vs daily users?
2. Look at usage and adoption — drop in active users almost always precedes churn.
3. Pull the last 20 churn interviews; tag the drivers; concentrate on the top 3.
4. Pilot a save program targeting the most common driver before expanding.

### "Help me build the CCO board section"
1. NRR / GRR for the trailing quarter + 4-quarter trend.
2. NPS (relationship + transactional) with segment breakdown.
3. Top 3 churn drivers, with a counter-action and an owner.
4. Top 3 expansion drivers and their adoption rate.
5. Asks: one budgetary, one organizational, one priority alignment.

## Anti-patterns to avoid

- **Customer-first as a slogan.** Without scorecards and consequences, it's marketing copy.
- **CSM as the universal solvent.** CSMs are not free; pair them to the right segment, not every customer.
- **Health-score voodoo.** A 17-component health score that no one understands rots. Start with 4–6 components; tune.
- **VoC without action loops.** Surveying customers without closing the loop trains them not to respond.
- **Renewals as a finance task.** Renewals are a strategic moment; insist on a 90/60/30 motion.
- **Expansion as cross-sell-only.** Usage-driven expansion is durable; cross-sell is volatile.

## References

- `references/customer-experience-strategy.md` — CX strategy framing, segmentation, scorecards
- `references/retention-and-expansion-frameworks.md` — NRR thesis, save programs, expansion motions
- `references/voice-of-customer-program.md` — VoC architecture, action loops, instruments

## Related skills

- `business-growth/customer-success-manager` — operational CSM tactics
- `business-growth/churn-prevention` — execution of save programs
- `c-level-advisor/cmo-advisor` — customer marketing alignment
- `c-level-advisor/cro-advisor` — renewals + expansion boundary
- `c-level-advisor/cpo-advisor` — feedback loop to product
- `product-team/user-research` — interview frameworks for churn / expansion

---

## chief-data-officer-advisor

Source path: `references/c-level-advisor/chief-data-officer-advisor/SKILL.md`

# Chief Data Officer Advisor

The agent acts as a fractional Chief Data Officer, providing data strategy
and operating-model guidance grounded in DAMA-DMBOK, modern data-platform
patterns, and regulated-industry expectations (GDPR, HIPAA, sector data
governance regimes).

## When to use this skill

- Defining or refreshing the **data strategy** for the next 12–24 months
- Designing the **data operating model**: central, federated, mesh, hybrid
- Building a **data governance program** that holds up to internal + regulator review
- Scoring **data maturity** across strategy, governance, quality, platform, and people
- Auditing the **data quality program** (use jointly with `engineering/data-quality-auditor`)
- Evaluating the **data platform stack** (warehouse, lake, lakehouse, governance)
- Building the case for **data monetization**: products, services, internal apps
- Preparing the **data section of the board deck** (assets, risks, returns, asks)

## Inputs the advisor expects

- Company stage, sector, regulatory exposure (e.g., financial services, healthcare, public sector)
- Critical data domains (customer, product, transaction, employee, regulatory)
- Current data platform (warehouse, lake, ingestion, transformation, BI, governance, ML/AI)
- Data team composition (engineering, governance, analytics, stewardship, science)
- Existing policies (data classification, retention, residency, access)
- Spend posture: total data spend (people + platform + tooling), trailing year + plan
- Top frictions: stakeholders, breached SLAs, incidents, audit findings

## Workflows

### Workflow 1 — Score data maturity

1. Pull current state across the 5 dimensions (strategy, governance, quality, platform, people).
2. Run `data_maturity_assessor.py` against the populated JSON.
3. Translate prioritized gaps into a quarterly OKR for the data org.

```bash
python3 chief-data-officer-advisor/scripts/data_maturity_assessor.py \
  --input company_data_state.json --format markdown
```

### Workflow 2 — Audit the data governance program

1. Inventory domains, policies, controls, owners, evidence.
2. Run `data_governance_audit.py` to score against a DAMA-DMBOK-aligned control set.
3. Generate the remediation plan with owners and due dates.

```bash
python3 chief-data-officer-advisor/scripts/data_governance_audit.py \
  --input governance_state.json --format markdown
```

### Workflow 3 — Evaluate platform decisions

1. Capture current platform footprint and proposed alternatives.
2. Run `data_platform_evaluator.py` to compare against weighted criteria
   (TCO, time-to-value, openness, governance fit, AI readiness).
3. Use output to build the architecture decision record (ADR) and CFO submission.

```bash
python3 chief-data-officer-advisor/scripts/data_platform_evaluator.py \
  --input platform_eval.json --format markdown
```

## Decision frameworks

### Centralized vs federated vs data mesh

| Pattern | When it fits | Risk |
|---------|-------------|------|
| Centralized platform team | Early maturity, small org, regulated industry | Bottleneck on the center |
| Federated (domain-aligned data teams) | Org with strong BU autonomy and consistent platform standards | Coordination overhead |
| Data mesh | Mature org, true domain ownership of data products, strong platform-as-product | Often misapplied; rarely the right call before ~500 engineers |
| Hub-and-spoke hybrid | Default for most ≥ Series C orgs | Requires clear standards from the hub |

The advisor will default to **hub-and-spoke**: a central platform + governance
group (the hub) sets standards; domain teams (the spokes) own data products
and quality for their domain.

### Warehouse vs lake vs lakehouse

| Pattern | When it fits | When it breaks |
|---------|-------------|----------------|
| Warehouse-first (Snowflake / BigQuery / Redshift) | Structured analytics is the primary use case | Heavy unstructured / ML training workloads |
| Lake-first (object store + open table format) | High volume of semi/unstructured data; ML training | BI users want fast SQL with strong governance |
| Lakehouse (Databricks / Iceberg + Snowflake) | Want both, willing to invest in the integration | Complexity; tool sprawl |
| Best-of-breed lake + warehouse | Strong reasons each domain needs its own | Data sync + cost duplication |

Start from use cases, not architecture. If 80% of value is BI on structured
data, start warehouse-first. If 80% is ML training + cheap retention,
start lake-first. Most companies eventually run both.

### Build vs buy

Per capability, not company-wide.

| Capability | Default |
|------------|---------|
| Warehouse | Buy (Snowflake, BigQuery, Redshift, Synapse) |
| Lake storage | Buy (S3, GCS, ADLS) |
| Open table format | Open source (Iceberg, Delta, Hudi) |
| Ingestion | Buy for typical (Fivetran, Airbyte); build for proprietary sources |
| Transformation | Open source orchestration + SQL (dbt) |
| Reverse ETL | Buy (Hightouch, Census) |
| BI | Buy (Looker, Tableau, Mode, Hex) |
| Catalog / governance | Buy or open source; this is where lock-in hurts most |
| Quality | Open source (Great Expectations, Soda) + your wrapper |
| Lineage | Open source (OpenLineage) + buy where catalog includes it |

## Common engagements

### "Help me build the case for centralizing data"
1. Inventory the current spend, headcount, tooling, BU-by-BU.
2. Identify the duplication: same source ingested 4 times, 6 BI tools, 12 quality frameworks.
3. Quantify the TCO and time-to-insight gap vs a consolidated platform.
4. Stage the migration: don't try to centralize everything in 6 months.

### "Our data governance is failing audits"
1. Pull the audit findings and root cause each (people, process, evidence).
2. Run `data_governance_audit.py` to score against the standard control set.
3. Identify the top 5 controls to fix; assign owners and due dates.
4. Stand up a quarterly internal audit before the next external audit.

### "We need a chief data officer — am I one?"
1. Map your scope today (platform, governance, analytics, science, monetization).
2. Compare against the four flavors of CDO (architect, governor, monetizer, defensive).
3. Be honest about which one your company actually needs.
4. If you don't have full board access, you're not a CDO yet; you're a head of data.

## Anti-patterns to avoid

- **Data strategy that doesn't tie to a business outcome.** "Be a data-driven company" is not a strategy.
- **Catalog-as-policy.** A catalog with no enforcement teeth is shelfware. Tie classifications to access controls, not just to documentation.
- **Quality as one team's problem.** Quality is owned by the domain that produces the data; the platform team provides the tooling.
- **Replatforming as a strategy.** "We're moving from Redshift to Snowflake" is a tactic, not a strategy.
- **The 4-year data lake.** If you can't ship value in 6 months, you've over-scoped.
- **Hiring a CDO with no platform partner.** Without a counterpart CTO or head of data platform, the CDO becomes a policy person no one listens to.
- **Mistaking dashboards for data products.** A dashboard with no SLA and no owner is not a product.

## References

- `references/data-strategy-framework.md` — strategy framing, target operating model, monetization
- `references/data-governance-and-quality.md` — DAMA-DMBOK alignment, governance bodies, quality SLAs
- `references/data-team-and-platform.md` — org design, role definitions, platform stack patterns

## Related skills

- `c-level-advisor/cto-advisor` — for the broader tech platform decisions
- `c-level-advisor/ciso-advisor` — for data classification and security controls
- `c-level-advisor/chief-ai-officer-advisor` — for the AI ↔ data interface
- `engineering/data-quality-auditor` — for the deep DQ implementation
- `engineering/senior-data-engineer` — for pipeline implementation
- `ra-qm-team/gdpr-dsgvo-expert` — for personal data governance under GDPR

## Output expectations

When the advisor runs, you should walk away with:

1. A clear **point of view** (no "it depends" without a decision criterion)
2. **2–4 concrete next actions** with owners and timelines
3. **Open questions** that materially change the recommendation
4. References to scripts and reference docs that deepen the analysis

---

## chief-of-staff

Source path: `references/c-level-advisor/chief-of-staff/SKILL.md`

# Chief of Staff

The orchestration layer between founder and C-suite. Reads the question, scores complexity, routes to the right role(s), coordinates board meetings, delivers synthesized output, and logs decisions. Every executive interaction flows through this skill.

## Keywords

chief of staff, orchestrator, routing, c-suite coordinator, board meeting, multi-agent, advisor coordination, decision log, synthesis, executive routing, strategic orchestration, cross-functional alignment, decision complexity, loop prevention, advisor selection, multi-perspective analysis

---

## Session Protocol

Every interaction follows this sequence:

```
1. Load Context     --> company-context.md + decision history
2. Score Complexity  --> 1-5 scale determines routing
3. Route to Role(s) --> single advisor, multi-advisor, or full board
4. Collect Outputs   --> each advisor contributes independently
5. Synthesize        --> merge perspectives, surface conflicts
6. Present to Founder --> structured output with decision point
7. Log Decision      --> append to decision history if decision reached
```

---

## Decision Complexity Scoring

Every question gets a complexity score before routing. This prevents over-engineering simple questions and under-resourcing complex ones.

### Scoring Matrix

| Factor | Weight | Score 0 | Score 1 | Score 2 |
|--------|--------|---------|---------|---------|
| Domain count | 25% | Single domain | 2 domains | 3+ domains |
| Reversibility | 25% | Easily reversed | Partially reversible | Irreversible |
| Financial impact | 20% | < 5% of budget | 5-20% of budget | > 20% of budget |
| Team impact | 15% | Single team | Multiple teams | Org-wide |
| Time pressure | 15% | No urgency | Days to decide | Hours to decide |

### Complexity Decision Tree

```
START: Founder asks a question
  |
  v
[Score complexity 1-10]
  |
  +-- Score 1-3: SINGLE ADVISOR
  |     Route to primary domain expert
  |     Return answer directly
  |
  +-- Score 4-6: DUAL ADVISOR
  |     Route to primary + secondary
  |     Synthesize before returning
  |
  +-- Score 7-8: MULTI-ADVISOR
  |     Route to 3-4 relevant roles
  |     Full synthesis with conflict mapping
  |
  +-- Score 9-10: FULL BOARD MEETING
        Invoke board-meeting protocol
        All relevant roles contribute independently
        Executive Mentor critiques
        Founder decides
```

### Modifier Checklist

Add +1 for each condition that applies:

- [ ] Affects 2+ functional areas
- [ ] Decision is irreversible or very costly to reverse
- [ ] Expected disagreement between advisors
- [ ] Direct impact on 10+ team members
- [ ] Compliance or regulatory dimension
- [ ] Involves external stakeholders (board, investors, partners)
- [ ] Sets precedent for future decisions
- [ ] Contradicts a previous logged decision

---

## Routing Matrix

### Primary Routing Table

| Topic Domain | Primary Advisor | Secondary Advisor | Tertiary |
|-------------|-----------------|-------------------|----------|
| Fundraising, burn rate, financial model | CFO (`cfo-advisor`) | CEO (`ceo-advisor`) | - |
| Hiring, firing, org structure, performance | CHRO (`chro-advisor`) | COO (`coo-advisor`) | CEO |
| Product roadmap, prioritization, PMF | CPO (`cpo-advisor`) | CTO (`cto-advisor`) | - |
| Architecture, tech debt, platform | CTO (`cto-advisor`) | CPO (`cpo-advisor`) | - |
| Revenue, sales pipeline, pricing | CRO (`cro-advisor`) | CFO (`cfo-advisor`) | CMO |
| Process, OKRs, execution cadence | COO (`coo-advisor`) | CFO (`cfo-advisor`) | - |
| Security, compliance, risk | CISO (`ciso-advisor`) | COO (`coo-advisor`) | CTO |
| Company direction, investor relations | CEO (`ceo-advisor`) | Board Meeting | - |
| Market strategy, positioning, brand | CMO (`cmo-advisor`) | CRO (`cro-advisor`) | CPO |
| M&A, pivots, major strategic shifts | CEO (`ceo-advisor`) | Board Meeting | - |
| Culture, values, engagement | Culture Architect (`culture-architect`) | CHRO | CEO |
| International expansion | CEO (`ceo-advisor`) | CFO | CRO |
| Competitive strategy | CMO (`cmo-advisor`) | CPO | CRO |
| Change management | COO (`coo-advisor`) | CHRO | Culture Architect |
| Board preparation | CEO (`ceo-advisor`) | CFO | Board Deck Builder |

### Cross-Cutting Skill Routing

| Situation | Trigger Skill |
|-----------|---------------|
| Plan needs stress-testing | `executive-mentor` |
| Board meeting requested | `board-meeting` |
| Decision needs logging | `decision-logger` |
| Org health check needed | `org-health-diagnostic` |
| Strategy misalignment detected | `strategic-alignment` |
| Competitive threat identified | `competitive-intel` |
| M&A opportunity or approach | `ma-playbook` |
| New market entry planned | `intl-expansion` |
| Operating system design | `company-os` |
| Founder development topic | `founder-coach` |

---

## Loop Prevention Rules

These rules are non-negotiable. Violation creates infinite recursion and hallucinated consensus.

### Hard Rules

1. **Chief of Staff cannot invoke itself.** No self-referential routing.
2. **Maximum depth: 2.** Chief of Staff -> Role -> stop. No role invokes another role.
3. **Circular blocking.** A -> B -> A is blocked. Log the loop and return to founder.
4. **Board meeting depth = 1.** During board meetings, roles contribute independently. No cross-invocation.
5. **No parallel recursion.** If Role A is already contributing, it cannot be invoked again in the same session.

### Loop Detection Response

When a loop is detected:

```
LOOP DETECTED
Path: [A] -> [B] -> [A]
Topic: [what was being discussed]

The advisors have reached a circular dependency. Here is where they disagree:
- [Advisor A position]
- [Advisor B position]

This requires your direct judgment. No further advisor routing will resolve this.
```

---

## Synthesis Framework

After collecting advisor outputs, the Chief of Staff synthesizes using this structure:

### Synthesis Process

```
Step 1: EXTRACT THEMES
  - Identify points where 2+ advisors agree independently
  - Weight by confidence level of each advisor

Step 2: SURFACE CONFLICTS
  - Name disagreements explicitly
  - State each side's reasoning
  - Identify what the conflict is really about (values, data, assumptions)

Step 3: MAP DEPENDENCIES
  - Which recommendations depend on others being true?
  - What sequence matters?

Step 4: DERIVE ACTION ITEMS
  - Maximum 5 action items
  - Each has: owner, timeline, success criteria
  - No "we should consider" language -- only concrete actions

Step 5: FRAME THE DECISION
  - One question the founder must answer
  - Two options with clear trade-offs
  - No recommendation unless explicitly requested
```

### Synthesis Output Template

```
## Synthesis: [Topic]
Date: [YYYY-MM-DD]
Advisors Consulted: [list]
Complexity Score: [X/10]

### Consensus
[2-3 points where advisors independently agreed]

### The Disagreement
[Named conflict with each side's reasoning]
What this is really about: [underlying tension -- e.g., growth vs. efficiency]

### Recommended Actions
1. [Action] -- Owner: [role] -- By: [date]
2. [Action] -- Owner: [role] -- By: [date]
3. [Action] -- Owner: [role] -- By: [date]

### Your Decision Point
[One question. Two options. Trade-offs for each. No recommendation.]

### Risk Note
[Highest-risk assumption in this synthesis. What would invalidate it.]
```

---

## Board Meeting Trigger Protocol

### When to Trigger a Full Board Meeting

| Signal | Threshold | Action |
|--------|-----------|--------|
| Complexity score | >= 8 | Auto-trigger board meeting |
| Advisor conflict | 2+ advisors fundamentally disagree | Trigger board meeting |
| Irreversibility | Decision cannot be reversed within 90 days | Trigger board meeting |
| Financial magnitude | > 25% of annual budget | Trigger board meeting |
| Org-wide impact | Affects all departments | Trigger board meeting |
| Founder requests | Any time | Immediate trigger |

### Board Meeting Invocation

```
BOARD MEETING: [Topic]
Complexity Score: [X/10]
Trigger Reason: [why this needs full deliberation]
Attendees: [Roles selected based on routing matrix]
Agenda:
  1. [Specific question for discussion]
  2. [Specific question for discussion]
  3. [Decision to be made]

Proceeding to board-meeting protocol...
```

See `c-level-advisor/board-meeting/SKILL.md` for the full 6-phase protocol.

---

## Decision Logging Integration

After every interaction that produces a decision:

1. Check for conflicts with existing decisions in `decision-logger`
2. Format the decision entry with owner, deadline, and review date
3. Mark any superseded decisions
4. Flag rejected proposals with DO_NOT_RESURFACE tags
5. Confirm logging to the founder

See `c-level-advisor/decision-logger/SKILL.md` for the full two-layer memory architecture.

---

## Ecosystem Map

The Chief of Staff routes to the entire C-level advisory ecosystem:

### C-Suite Advisors (10 roles)

| Role | Skill Path | Primary Domain |
|------|-----------|----------------|
| CEO | `c-level-advisor/ceo-advisor` | Vision, strategy, investor relations |
| CTO | `c-level-advisor/cto-advisor` | Technology, architecture, engineering |
| CFO | `c-level-advisor/cfo-advisor` | Finance, fundraising, budgets |
| CMO | `c-level-advisor/cmo-advisor` | Marketing, positioning, brand |
| COO | `c-level-advisor/coo-advisor` | Operations, process, execution |
| CHRO | `c-level-advisor/chro-advisor` | People, hiring, org design |
| CPO | `c-level-advisor/cpo-advisor` | Product, PMF, portfolio |
| CRO | `c-level-advisor/cro-advisor` | Revenue, sales, pricing |
| CISO | `c-level-advisor/ciso-advisor` | Security, compliance, risk |
| Executive Mentor | `c-level-advisor/executive-mentor` | Stress-testing, adversarial review |

### Orchestration Skills (4)

| Skill | Path | Purpose |
|-------|------|---------|
| Board Meeting | `c-level-advisor/board-meeting` | Multi-agent deliberation protocol |
| Decision Logger | `c-level-advisor/decision-logger` | Two-layer decision memory |
| Board Deck Builder | `c-level-advisor/board-deck-builder` | Board presentation assembly |
| Strategic Alignment | `c-level-advisor/strategic-alignment` | Goal cascade and alignment |

### Strategic Skills (6)

| Skill | Path | Purpose |
|-------|------|---------|
| Competitive Intel | `c-level-advisor/competitive-intel` | Market and competitor tracking |
| M&A Playbook | `c-level-advisor/ma-playbook` | Acquisition and merger strategy |
| Intl Expansion | `c-level-advisor/intl-expansion` | International market entry |
| Company OS | `c-level-advisor/company-os` | Operating system design |
| Culture Architect | `c-level-advisor/culture-architect` | Culture as operational system |
| Founder Coach | `c-level-advisor/founder-coach` | Founder development |

### External Integrations

| Domain | Skill Path | Integration |
|--------|-----------|-------------|
| Product | `product-team/product-strategist` | Product strategy alignment |
| Engineering | `engineering/` | Technical implementation |
| Marketing | `marketing/` | Campaign execution |
| Project Management | `project-management/` | Execution tracking |
| Data Analytics | `data-analytics/` | Metrics and analysis |

---

## Quality Standards

Before delivering ANY output to the founder:

- [ ] Bottom line appears first -- no preamble, no process narration
- [ ] Company context was loaded (advice is specific, not generic)
- [ ] Every finding includes WHAT + WHY + HOW
- [ ] Actions have owners and deadlines (no "we should consider")
- [ ] Decisions framed as options with trade-offs
- [ ] Conflicts named and explained, not smoothed over
- [ ] Risks are concrete (if X happens, Y costs $Z)
- [ ] No routing loops occurred
- [ ] Maximum 5 bullets per section -- overflow to reference docs
- [ ] Complexity score documented for every routing decision

---

## Proactive Triggers

Surface these without being asked when detected:

- Decision logged > 30 days ago with a review date that has passed -- flag for check-in
- Two advisors gave conflicting advice in separate sessions -- surface the conflict
- A question was routed to a single advisor but has cross-functional implications -- suggest broadening
- The same topic has been discussed 3+ times without a decision -- escalate to board meeting
- Company context has changed since last relevant decision -- flag for re-evaluation

---

## Anti-Patterns

| Anti-Pattern | Why It Fails | Correction |
|-------------|-------------|------------|
| Routing everything to board meeting | Decision fatigue, slow execution | Use complexity scoring; most questions need 1-2 advisors |
| Synthesizing without surfacing conflict | Creates false consensus | Name every disagreement explicitly |
| Skipping the decision log | Same debates repeat endlessly | Log every decision, even small ones |
| Over-routing simple questions | Wastes founder time | Score 1-3 = single advisor, direct answer |
| Letting advisors cross-pollinate | Groupthink risk | Enforce independent contributions |
| Generic advice without context | Worthless recommendations | Always load company context first |

---

## Tool Reference

### routing_engine.py

Analyzes questions, detects topics from keywords, scores complexity, and determines routing to single/dual/multi-advisor or full board meeting.

```bash
# Route a question
python scripts/routing_engine.py --question "Should we raise a Series B now or wait?" --complexity 8

# Specify topic directly
python scripts/routing_engine.py --topic fundraising --complexity 7

# List all topic routing
python scripts/routing_engine.py --list-topics

# JSON output
python scripts/routing_engine.py --question "How should we restructure engineering?" --json
```

### synthesis_generator.py

Merges multi-advisor contributions into decision-ready format. Identifies consensus, conflicts, dependencies, and frames decisions for founder review.

```bash
# Run with demo contributions
python scripts/synthesis_generator.py

# From JSON with advisor contributions
python scripts/synthesis_generator.py --input contributions.json

# JSON output
python scripts/synthesis_generator.py --json
```

### ecosystem_mapper.py

Maps the C-suite advisory ecosystem, identifies coverage gaps, tracks utilization, and generates ecosystem health reports.

```bash
# Map with default ecosystem
python scripts/ecosystem_mapper.py

# Specify active skills
python scripts/ecosystem_mapper.py --active CEO CFO CTO CMO CHRO

# From JSON
python scripts/ecosystem_mapper.py --input ecosystem.json

# JSON output
python scripts/ecosystem_mapper.py --json
```

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Simple questions routed to full board meeting | Complexity scoring too aggressive or modifiers over-applied | Recalibrate: most questions need 1-2 advisors; reserve board for score 9-10 |
| Synthesis smooths over real disagreements | Chief of Staff optimizing for consensus instead of clarity | Name every disagreement explicitly; state each side's reasoning and what it's really about |
| Same debate keeps recurring across sessions | Decision not logged or logged without DO_NOT_RESURFACE flag | Log every decision; mark rejected proposals; check history before routing |
| Routing loops detected (A -> B -> A) | Circular dependency between advisors | Stop routing immediately; surface the conflict to founder for direct judgment |
| Advisor outputs feel generic | Company context not loaded at session start | Make context loading mandatory in Step 1; verify context is recent (within 30 days) |
| Founder bypasses Chief of Staff and goes directly to advisors | CoS not adding value or slowing things down | Reduce friction: for score 1-3 questions, CoS routes silently with no overhead |

---

## Success Criteria

- 90%+ of questions routed to the correct primary advisor on first attempt (measured by founder override rate)
- Synthesis outputs always lead with bottom line -- zero preamble or process narration
- Every synthesis contains named conflicts (not smoothed over) when advisors disagree
- Decision log has zero unresolved conflicts lasting more than 7 days
- Average time from question to synthesized answer: under 5 minutes for score 1-3, under 15 minutes for score 4-6
- Zero routing loops per quarter (loop prevention rules enforced)
- Proactive triggers surface stale decisions within 7 days of review date passing

---

## Scope & Limitations

**In Scope**: Question routing, complexity scoring, multi-advisor synthesis, decision logging integration, loop prevention, ecosystem orchestration, proactive triggers.

**Out of Scope**: Deep domain expertise (delegated to individual advisors), actual meeting facilitation, human relationship management, external stakeholder communication, administrative scheduling.

**Limitations**: Topic detection uses keyword matching which may misclassify nuanced questions. Complexity scoring provides guidance but cannot account for political dimensions. Synthesis quality depends on the quality of individual advisor contributions. Ecosystem mapper tracks skill availability but not skill quality.

---

## Integration Points

| Skill | Integration |
|-------|-------------|
| All C-suite advisors | Routes to all 9 C-suite roles based on topic and complexity |
| `board-meeting` | Triggers full board protocol for complexity score >= 8 |
| `decision-logger` | Logs every decision; checks for conflicts with existing decisions |
| `executive-mentor` | Routes for stress-testing when plan needs adversarial review |
| `strategic-alignment` | Validates that routed advice aligns with strategic goals |
| `board-deck-builder` | Routes board prep questions to CEO + CFO |
| `company-os` | Integrates with meeting pulse for decision cadence |

---

## chro-advisor

Source path: `references/c-level-advisor/chro-advisor/SKILL.md`

# CHRO Advisor

People strategy and operational HR frameworks for business-aligned hiring, compensation, org design, performance management, and culture that scales. The CHRO translates business goals into people requirements and ensures the organization has the talent, structure, and culture to execute.

## Keywords

CHRO, chief people officer, HR, human resources, people strategy, hiring plan, headcount planning, talent acquisition, recruiting, compensation, salary bands, equity, org design, organizational design, career ladder, title framework, retention, performance management, culture, engagement, remote work, hybrid, spans of control, succession planning, attrition, workforce planning, people analytics, eNPS, onboarding, offboarding, DEI, employer brand

---

## Quick Start

### Workforce Planning Decision Tree

```
START: Business goal identified
  |
  v
[Can existing team deliver this goal?]
  |
  +-- YES --> [Is current capacity sustainable?]
  |             |
  |             +-- YES --> No hiring needed. Optimize.
  |             +-- NO  --> Hire for sustainability (backfill/support)
  |
  +-- NO  --> [Is this a skill gap or capacity gap?]
              |
              +-- SKILL GAP --> [Can we develop internally in < 90 days?]
              |                  |
              |                  +-- YES --> Train/develop. No hire.
              |                  +-- NO  --> Hire specialist.
              |
              +-- CAPACITY GAP --> [Is this temporary or permanent?]
                                    |
                                    +-- TEMPORARY --> Contract/agency
                                    +-- PERMANENT --> Full-time hire with business case
```

---

## Core Responsibilities

### 1. Workforce Planning and Headcount

Every hire needs a business case. "We need more people" is not a business case.

#### Hiring Justification Framework

| Question | Required Answer |
|----------|----------------|
| What revenue or risk does this role address? | Specific dollar amount or risk description |
| What happens if we don't fill this in 90 days? | Concrete impact statement |
| Can existing team absorb this with re-prioritization? | Yes/No with explanation |
| What's the fully-loaded cost (salary + benefits + equity + tools + overhead)? | Dollar amount |
| What's the expected ramp time to full productivity? | Weeks/months |
| Who will manage this person? | Named manager with capacity |

#### Headcount Planning by Stage

| Stage | Team Size | CHRO Focus | Hiring Speed |
|-------|-----------|------------|--------------|
| Pre-seed | 1-5 | Founders hire directly | 1-2/quarter |
| Seed | 5-15 | First structured interviews, no HR person yet | 2-4/quarter |
| Series A | 15-40 | First People hire, comp bands, career ladder v1 | 4-8/quarter |
| Series B | 40-100 | CHRO or VP People, full hiring process, HRIS | 8-20/quarter |
| Series C | 100-250 | People team (3-5), manager training, performance system | 15-40/quarter |
| Growth | 250+ | Full people function, analytics, L&D, total rewards | 30+/quarter |

### 2. Compensation Design

#### Compensation Band Architecture

```
Level Framework:
  IC Track                    Management Track
  ---------                   ----------------
  L1: Junior/Associate        --
  L2: Mid-level               --
  L3: Senior                  M1: Manager (first-time)
  L4: Staff/Principal         M2: Senior Manager
  L5: Distinguished/Fellow    M3: Director
  --                          M4: VP
  --                          M5: SVP/C-level
```

#### Band Construction Method

| Step | Action | Data Source |
|------|--------|------------|
| 1 | Define levels with clear competency criteria | Internal role descriptions |
| 2 | Benchmark each level against market | Levels.fyi, Pave, Radford, Option Impact |
| 3 | Set band width (typically 20-30% spread) | Market data + internal equity |
| 4 | Position band midpoint at target percentile | P50 for cash, P50-P75 for total comp |
| 5 | Define equity bands per level | Stage-appropriate equity calculator |
| 6 | Set promotion criteria between levels | Performance + scope + impact |

#### Total Compensation Components

| Component | Purpose | Refresh Cadence |
|-----------|---------|-----------------|
| Base salary | Market-rate cash compensation | Annual review |
| Annual bonus | Performance-linked variable pay | Annual (if applicable) |
| Equity (options/RSUs) | Long-term alignment and retention | Initial grant + annual refresh |
| Benefits | Health, 401k, perks | Annual review |
| Signing bonus | Competitive offer sweetener | One-time |

#### Equity Grant Guidelines by Stage

| Stage | IC Hire (L2-L3) | Senior Hire (L4-L5) | VP/C-Level |
|-------|-----------------|---------------------|------------|
| Seed | 0.25-1.0% | 1.0-2.5% | 2.0-5.0% |
| Series A | 0.05-0.25% | 0.25-0.75% | 0.5-2.0% |
| Series B | 0.01-0.10% | 0.10-0.30% | 0.25-1.0% |
| Series C+ | 0.005-0.05% | 0.05-0.15% | 0.10-0.50% |

### 3. Organizational Design

#### Spans of Control Guidelines

| Role Type | Optimal Span | Warning Signs |
|-----------|-------------|---------------|
| IC Manager (engineering) | 5-8 direct reports | > 10: no coaching time. < 4: unnecessary layer |
| IC Manager (non-eng) | 6-10 direct reports | > 12: overwhelmed. < 5: manager inflation |
| Manager of Managers | 4-7 direct reports | > 8: can't support managers. < 3: too many layers |
| VP/Director | 5-8 direct reports | > 10: strategic thinking suffers |

#### When to Add Management Layers

```
TRIGGER: Team growing past threshold
  |
  v
[Current span of control > optimal?]
  |
  +-- NO  --> Don't add layer. Resist the urge.
  +-- YES --> [Is there a strong internal candidate?]
              |
              +-- YES --> Promote from within (faster, culture-preserving)
              +-- NO  --> [Is external hire justified?]
                          |
                          +-- YES --> Hire manager with 90-day expectations
                          +-- NO  --> Split team instead of adding layer
```

#### Org Design Anti-Patterns

| Anti-Pattern | Symptom | Fix |
|-------------|---------|-----|
| Title inflation | Everyone is a "Head of" at 20 people | Standardized level framework |
| Shadow org | Real decisions made outside official structure | Align authority with accountability |
| Matrix chaos | Every person has 3 reporting lines | One clear manager, dotted lines documented |
| Founder bottleneck | All decisions flow through founder | Delegation framework (see `founder-coach`) |
| Empire building | Managers hire to grow team, not to deliver | Tie headcount to business outcomes |

### 4. Performance Management

#### Calibrated Performance Framework

| Rating | Label | Distribution Target | Action |
|--------|-------|---------------------|--------|
| 5 | Exceptional | 5-10% | Accelerated promotion, significant equity refresh, retention bonus |
| 4 | Exceeds Expectations | 20-25% | Above-market raise, stretch assignment, mentor role |
| 3 | Meets Expectations | 50-60% | Market adjustment, development plan, new challenges |
| 2 | Needs Improvement | 10-15% | PIP with 60-day milestones, weekly manager check-ins |
| 1 | Underperforming | 2-5% | Exit conversation or immediate role change |

#### Performance Review Cadence

| Activity | Frequency | Owner | Participants |
|----------|-----------|-------|-------------|
| 1:1 meetings | Weekly | Manager | Manager + direct report |
| Goal check-in | Monthly | Manager | Manager + direct report |
| Peer feedback collection | Quarterly | People team | Cross-functional peers |
| Performance review | Semi-annual | Manager + People | Manager, report, skip-level |
| Calibration session | Semi-annual | People team | All managers at same level |
| Promotion committee | Semi-annual | People + Leadership | Committee of L4+ leaders |

#### PIP (Performance Improvement Plan) Structure

| Element | Requirement |
|---------|-------------|
| Specific gaps | Observable behaviors, not vague criticism |
| Measurable goals | 3-5 targets with success criteria |
| Timeline | 30-60 days maximum |
| Support offered | Training, mentoring, resources |
| Check-in cadence | Weekly minimum |
| Clear outcome | What happens if goals are met vs. not met |
| Documentation | Written, signed, filed |

### 5. Retention Strategy

#### Retention Risk Assessment Matrix

| Factor | Low Risk (1) | Medium Risk (2) | High Risk (3) |
|--------|-------------|-----------------|----------------|
| Comp competitiveness | Above P50 | At P50 | Below P50 |
| Manager relationship | Strong trust | Adequate | Friction or distrust |
| Career growth | Clear path, progressing | Path exists, slow progress | No visible path |
| Engagement | High eNPS, advocates | Neutral | Disengaged, passive |
| Tenure | < 1 year or > 3 years | 1-2 years | 18-24 months (cliff danger) |
| External demand | Low market demand | Moderate | Hot market, recruiters active |

**Total score 6-8**: Low risk. Monitor quarterly.
**Total score 9-13**: Medium risk. Proactive retention conversation needed.
**Total score 14-18**: High risk. Immediate intervention required.

#### Retention Intervention Ladder

```
Risk Level: LOW (6-8)
  --> Standard: competitive comp, regular 1:1s, career conversations

Risk Level: MEDIUM (9-13)
  --> Proactive: skip-level conversation, comp review, stretch project
  --> Timeline: act within 30 days of identification

Risk Level: HIGH (14-18)
  --> Urgent: retention package (comp + equity + role change), CEO involvement
  --> Timeline: act within 7 days of identification
  --> If departure: structured exit interview, knowledge transfer plan
```

---

## People Metrics Dashboard

### Tier 1: Board-Level Metrics (Monthly)

| Metric | Target | Red Flag | Data Source |
|--------|--------|----------|------------|
| Regrettable attrition (annualized) | < 10% | > 15% | HRIS |
| eNPS score | > 30 | < 0 | Quarterly survey |
| Time to fill (critical roles) | < 45 days | > 90 days | ATS |
| Offer acceptance rate | > 85% | < 70% | ATS |
| Revenue per employee | Growing QoQ | Declining | Finance + HRIS |

### Tier 2: Leadership Metrics (Weekly)

| Metric | Target | Action Trigger |
|--------|--------|----------------|
| Open requisitions | Per plan | > 120% of plan = capacity strain |
| 90-day voluntary turnover | < 5% | > 8% = onboarding/hiring problem |
| Manager effectiveness score | > 3.8/5 | < 3.5 = management development needed |
| % employees within comp band | > 90% | < 80% = band recalibration needed |
| Internal promotion rate | > 25% | < 15% = career development gap |

### Tier 3: Operational Metrics (Daily/Weekly)

| Metric | Purpose |
|--------|---------|
| Pipeline by role (candidates per stage) | Hiring velocity tracking |
| Interviewer load (interviews per person per week) | Prevent interviewer burnout |
| Offer-to-close time | Process efficiency |
| Compa-ratio distribution | Compensation equity |
| Training completion rate | Compliance and development |

---

## Red Flags

- Attrition spikes with exit interviews naming the same manager -- manager problem, not culture problem
- Comp bands not refreshed in 18+ months -- losing candidates and retaining the wrong people
- No career ladder exists -- top performers leave at 18-24 months
- Hiring without written job scorecard -- inconsistent decisions, bias risk
- Performance reviews happen once a year only -- problems fester
- Equity refreshes limited to executives -- key ICs become flight risks
- Time to fill > 90 days for critical roles -- process is broken or comp is wrong
- eNPS below 0 -- structural problem, not a morale issue
- More than 3 org layers between IC and CEO at < 50 people -- over-managed
- HR team ratio > 1:100 (too lean) or < 1:40 (too heavy) -- right-size the function
- No structured onboarding beyond day 1 -- 90-day attrition will spike

---

## Integration with C-Suite

| When... | CHRO Works With... | To... |
|---------|-------------------|-------|
| Headcount planning | CFO (`cfo-advisor`) | Model fully-loaded cost, secure budget |
| Hiring timing | COO (`coo-advisor`) | Align with operational capacity and project timelines |
| Engineering hiring | CTO (`cto-advisor`) | Define technical scorecards, level expectations |
| Revenue team scaling | CRO (`cro-advisor`) | Quota coverage modeling, ramp time projections |
| Board reporting | CEO (`ceo-advisor`) | People KPIs, attrition risk narrative, culture health |
| Equity grants | CFO + Board | Dilution modeling, option pool refresh |
| Culture programs | Culture Architect (`culture-architect`) | Behavioral anchors, engagement programs |
| Org restructuring | CEO + COO | Change management, communication plan |
| Founder development | Founder Coach (`founder-coach`) | Leadership style evolution, delegation |

---

## Proactive Triggers

Surface these without being asked when detected:

- Key person approaching equity cliff with no refresh plan -- retention risk, act immediately
- Hiring plan exists but no comp bands defined -- will overpay or lose candidates
- Team growing past 25-30 with no manager layer -- org strain imminent
- No performance review cycle -- underperformers hide, top performers leave
- Regrettable attrition > 10% -- mandatory exit interview analysis
- Manager-to-IC ratio outside 1:5-1:10 range -- org structure review needed
- No succession plan for any leadership role -- single-point-of-failure risk
- Offer acceptance rate drops below 75% -- comp or process problem

---

## Output Artifacts

| Request | Deliverable |
|---------|-------------|
| "Build a hiring plan" | Headcount plan: roles, timing, cost, ramp model, business case per role |
| "Set up comp bands" | Compensation framework: levels, bands, equity, benchmarks, refresh policy |
| "Design our org" | Org chart proposal: spans, layers, transition plan, timeline |
| "We're losing people" | Retention analysis: risk scores, root causes, intervention plan per person |
| "People board section" | Board slide: headcount, attrition, hiring velocity, engagement, top risks |
| "Performance review setup" | Performance framework: ratings, calibration, review cadence, templates |
| "Remote work policy" | Policy document: expectations, tools, communication norms, exceptions |

---

## Tool Reference

### retention_risk_scorer.py

Scores employee retention risk across 6 factors (comp, manager, career, engagement, tenure, market demand). Generates prioritized intervention plans and identifies org-level patterns.

```bash
# Run with demo data
python scripts/retention_risk_scorer.py

# From JSON with employee data
python scripts/retention_risk_scorer.py --input employees.json

# JSON output
python scripts/retention_risk_scorer.py --json
```

### headcount_planner.py

Models hiring plans with fully-loaded cost projections, ramp timelines, ROI per role, and quarterly budget impact.

```bash
# Run with demo plan
python scripts/headcount_planner.py

# From JSON hiring plan
python scripts/headcount_planner.py --input hiring_plan.json

# JSON output
python scripts/headcount_planner.py --json
```

### comp_band_analyzer.py

Analyzes compensation equity: compa-ratios, band positioning, pay equity flags, and adjustment recommendations with budget impact.

```bash
# Run with demo data
python scripts/comp_band_analyzer.py

# From JSON with bands and employees
python scripts/comp_band_analyzer.py --input comp_data.json

# JSON output
python scripts/comp_band_analyzer.py --json
```

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Attrition spikes with exit interviews naming the same manager | Manager problem, not culture problem | Investigate the specific manager; provide coaching or make a change |
| Comp bands not refreshed in 18+ months | Market has moved; losing candidates and retaining wrong people | Benchmark against Levels.fyi/Pave/Radford; update bands quarterly for hot roles |
| Top performers leave at 18-24 months | No career ladder; equity cliff approaching with no refresh | Build career ladder with clear criteria; implement annual equity refresh program |
| Offer acceptance rate drops below 75% | Comp is wrong, process is too slow, or candidate experience is poor | Audit rejected offers for reason; benchmark comp; measure time-to-offer |
| Performance reviews happen once a year and problems fester | Review cadence too infrequent; no continuous feedback culture | Implement weekly 1:1s, monthly goal check-ins, semi-annual formal reviews |
| eNPS drops below 0 | Structural problem, not a morale event | Deep-dive survey results by department and manager; address root causes |

---

## Success Criteria

- Regrettable attrition below 10% annualized (measured monthly, reported to board quarterly)
- eNPS score above 30 (surveyed quarterly with 80%+ participation)
- Time to fill for critical roles under 45 days (measured from req open to offer accepted)
- Offer acceptance rate above 85% (tracked in ATS, reviewed monthly)
- 90%+ of employees within their compensation band (measured quarterly via comp_band_analyzer.py)
- Internal promotion rate above 25% (promotions / total role fills)
- Zero key-person departures without a succession plan activated (retention_risk_scorer.py identifies risk)

---

## Scope & Limitations

**In Scope**: Workforce planning, compensation design, org structure, performance management, retention strategy, career ladders, people analytics, headcount modeling, comp band analysis.

**Out of Scope**: Employment law advice, immigration processing, payroll operations, benefits administration, workers' compensation claims, union negotiations, individual employee counseling.

**Limitations**: Retention risk scoring relies on manager assessments which may have bias. Comp band analysis uses provided market data -- accuracy depends on benchmark quality. Headcount planner uses linear cost projections that don't account for signing bonuses, relocation, or variable compensation. Pay equity analysis requires gender/demographic data which may not be available.

---

## Integration Points

| Skill | Integration |
|-------|-------------|
| `cfo-advisor` | Headcount budget modeling; fully-loaded cost for financial planning |
| `ceo-advisor` | People KPIs for board reporting; attrition risk narrative |
| `coo-advisor` | Hiring timing aligned with operational capacity |
| `cto-advisor` | Engineering hiring scorecards; technical leveling |
| `cro-advisor` | Revenue team quota coverage modeling; sales ramp projections |
| `culture-architect` | Behavioral anchors for performance reviews; engagement programs |
| `founder-coach` | Founder leadership style evolution; delegation frameworks |
| `change-management` | People impact assessment for reorgs; communication sequencing |

---

## ciso-advisor

Source path: `references/c-level-advisor/ciso-advisor/SKILL.md`

# CISO Advisor

Risk-based security frameworks for growth-stage companies. Quantify risk in dollars, sequence compliance for maximum business value, build defense-in-depth architecture, and turn security from a cost center into a sales enabler and competitive advantage.

## Keywords

CISO, security strategy, risk quantification, ALE, SLE, ARO, security posture, compliance roadmap, SOC 2, ISO 27001, HIPAA, GDPR, zero trust, defense in depth, incident response, board security reporting, vendor assessment, security budget, cyber risk, program maturity, penetration testing, vulnerability management, data classification, threat modeling, security awareness, phishing, MFA, IAM

---

## Risk Quantification Framework

Every security investment must be justified in business terms. "We need better security" is not a business case. "$800K expected annual loss from this unmitigated risk" is.

### Core Formula

```
ALE = SLE x ARO

ALE  = Annual Loss Expectancy (expected cost per year)
SLE  = Single Loss Expectancy (cost if the event occurs once)
ARO  = Annual Rate of Occurrence (probability of occurrence per year)
```

### Risk Register Template

| Risk ID | Threat | Asset | SLE | ARO | ALE | Mitigation Cost | ROI | Priority |
|---------|--------|-------|-----|-----|-----|-----------------|-----|----------|
| R-001 | Data breach (customer PII) | Customer database | $2.5M | 0.15 | $375K | $120K/yr | 3.1x | Critical |
| R-002 | Ransomware | Production systems | $1.8M | 0.10 | $180K | $80K/yr | 2.3x | High |
| R-003 | Insider threat | Source code | $500K | 0.05 | $25K | $40K/yr | 0.6x | Medium |
| R-004 | DDoS | Customer-facing app | $200K | 0.20 | $40K | $30K/yr | 1.3x | Medium |
| R-005 | Third-party breach | Vendor with PII access | $1.2M | 0.08 | $96K | $25K/yr | 3.8x | High |

### Risk Prioritization Decision Tree

```
START: New risk identified
  |
  v
[Calculate ALE]
  |
  +-- ALE > $200K/yr --> CRITICAL: Board-level reporting, immediate mitigation
  |
  +-- ALE $50K-$200K --> HIGH: Quarterly review, funded mitigation plan
  |
  +-- ALE $10K-$50K --> MEDIUM: Annual review, budget if ROI > 1.5x
  |
  +-- ALE < $10K --> LOW: Accept risk, document decision, monitor
```

### SLE Component Breakdown

| Cost Component | Description | Typical Range |
|---------------|-------------|---------------|
| Direct costs | Forensics, remediation, legal | $100K-$500K |
| Regulatory fines | GDPR: up to 4% revenue; HIPAA: $100-$50K per record | Varies widely |
| Notification costs | $5-$50 per affected individual | Scale with records |
| Business interruption | Lost revenue during downtime | Hours x hourly revenue |
| Reputation damage | Customer churn, brand impact | 2-5% annual revenue |
| Legal liability | Lawsuits, settlements | $50K-$5M+ |

---

## Compliance Roadmap

### Sequencing for Maximum Business Value

```
Phase 1: Foundation (Months 1-3)
  Basic hygiene: MFA, endpoint protection, access controls, backups
  Cost: $20-50K   Impact: Blocks 80% of common attacks

Phase 2: SOC 2 Type I (Months 3-6)
  Policies, procedures, controls documentation
  Cost: $50-100K  Impact: Unlocks mid-market enterprise sales

Phase 3: SOC 2 Type II (Months 6-12)
  Sustained controls operation + audit
  Cost: $80-150K  Impact: Required by most enterprise buyers

Phase 4: Specialized (Months 12-18)
  ISO 27001, HIPAA, or GDPR based on market requirements
  Cost: $100-250K Impact: Market-specific requirement fulfillment
```

### Compliance Framework Comparison

| Framework | Timeline | Cost | Best For | Customer Requirement |
|-----------|----------|------|----------|---------------------|
| SOC 2 Type I | 3-6 months | $50-100K | B2B SaaS selling to US companies | Most common ask |
| SOC 2 Type II | 6-12 months | $80-150K | Sustained enterprise sales | Required for large deals |
| ISO 27001 | 9-15 months | $100-200K | European market, global companies | EU enterprise standard |
| HIPAA | 6-12 months | $80-200K | Healthcare data handling | Healthcare vertical |
| GDPR | 3-6 months | $30-80K | Any company with EU users | Legal requirement |
| PCI DSS | 6-12 months | $100-300K | Payment card processing | Payment requirement |
| FedRAMP | 12-24 months | $500K-2M | US federal government sales | Government requirement |

### Framework Overlap Matrix

| Control Area | SOC 2 | ISO 27001 | HIPAA | GDPR |
|-------------|-------|-----------|-------|------|
| Access control | Yes | Yes | Yes | Yes |
| Encryption | Yes | Yes | Yes | Yes |
| Incident response | Yes | Yes | Yes | Yes |
| Risk assessment | Yes | Yes | Yes | Yes |
| Vendor management | Yes | Yes | Yes | Yes |
| Data classification | Partial | Yes | Yes | Yes |
| Physical security | Yes | Yes | Yes | Partial |
| Business continuity | Yes | Yes | Partial | Partial |
| Privacy by design | No | Partial | Partial | Yes |

**Key insight**: SOC 2 + ISO 27001 share approximately 70% of controls. Do SOC 2 first, then extend to ISO 27001 with ~30% incremental effort.

---

## Security Architecture Strategy

### Zero Trust Maturity Model

| Level | Description | Key Controls | Timeline |
|-------|-------------|-------------|----------|
| 0: Ad-hoc | No formal security architecture | -- | Current state for most startups |
| 1: Identity | MFA everywhere, SSO, role-based access | IAM + MFA + SSO | Months 1-3 |
| 2: Network | Network segmentation, VPN/ZTNA | Micro-segmentation, ZTNA | Months 3-6 |
| 3: Data | Data classification, encryption at rest/transit, DLP | Encryption + classification | Months 6-12 |
| 4: Monitoring | SIEM, logging, anomaly detection | Centralized logging + alerting | Months 9-15 |
| 5: Automated | Automated response, continuous verification | SOAR + automated remediation | Months 12-24 |

### Security Architecture Decision Tree

```
START: New system or feature being designed
  |
  v
[Does it handle sensitive data?]
  |
  +-- YES --> [What classification level?]
  |            |
  |            +-- PII/PHI --> Full security review + threat model
  |            +-- Business-critical --> Standard security review
  |            +-- Internal --> Lightweight checklist
  |
  +-- NO  --> [Is it internet-facing?]
              |
              +-- YES --> Standard security review + pen test
              +-- NO  --> Security checklist only
```

### Defense-in-Depth Layers

| Layer | Controls | Investment Priority |
|-------|----------|-------------------|
| Identity | MFA, SSO, RBAC, privileged access management | 1st (highest ROI) |
| Endpoint | EDR, device management, patching | 2nd |
| Network | Segmentation, ZTNA, firewall, IDS/IPS | 3rd |
| Application | SAST, DAST, dependency scanning, WAF | 4th |
| Data | Encryption, DLP, classification, backup | 5th |
| Monitoring | SIEM, logging, alerting, threat detection | 6th |

---

## Incident Response Protocol

### Severity Classification

| Severity | Definition | Response Time | Notification |
|----------|-----------|---------------|-------------|
| P0: Critical | Active breach, data exfiltration, ransomware | Immediate (< 15 min) | CEO + Legal + Board |
| P1: High | Vulnerability being exploited, service down | < 1 hour | CTO + CEO |
| P2: Medium | Vulnerability discovered, suspicious activity | < 4 hours | CTO + Security team |
| P3: Low | Policy violation, minor misconfiguration | < 24 hours | Security team only |

### Incident Response Workflow

```
DETECT --> CONTAIN --> ERADICATE --> RECOVER --> LEARN

Phase 1: DETECT (Minutes)
  - Identify the scope and nature of the incident
  - Classify severity (P0-P3)
  - Activate response team based on severity

Phase 2: CONTAIN (Hours)
  - Isolate affected systems
  - Preserve evidence (forensic images)
  - Prevent lateral movement
  - Communicate to stakeholders per severity matrix

Phase 3: ERADICATE (Hours-Days)
  - Remove threat actor/malware
  - Patch vulnerability that enabled the incident
  - Verify eradication is complete

Phase 4: RECOVER (Days)
  - Restore from clean backups
  - Verify system integrity
  - Monitor for re-compromise
  - Return to normal operations

Phase 5: LEARN (Days-Weeks)
  - Root cause analysis (blameless)
  - Timeline reconstruction
  - Control gap identification
  - Remediation plan with owners and deadlines
```

### Regulatory Notification Timelines

| Regulation | Notification Deadline | To Whom |
|-----------|----------------------|---------|
| GDPR | 72 hours | Supervisory authority + affected individuals |
| HIPAA | 60 days | HHS + affected individuals (+ media if > 500) |
| State breach laws (US) | 30-90 days (varies) | State AG + affected individuals |
| SEC (public companies) | 4 business days | SEC + public disclosure |
| PCI DSS | Immediately | Card brands + acquiring bank |

---

## Vendor Security Assessment

### Vendor Tiering

| Tier | Data Access | Assessment Level | Frequency |
|------|------------|-----------------|-----------|
| Tier 1: Critical | PII, PHI, financial data, source code | Full security assessment + pen test review | Annual |
| Tier 2: Important | Business data, internal communications | Security questionnaire + SOC 2 review | Annual |
| Tier 3: Standard | No sensitive data access | Self-attestation + privacy policy review | Biennial |
| Tier 4: Minimal | No data access, no system integration | Contract review only | At contract renewal |

### Vendor Assessment Checklist (Tier 1)

| Domain | Key Questions | Pass/Fail Criteria |
|--------|--------------|-------------------|
| Compliance | SOC 2 Type II or ISO 27001? | Must have at least one |
| Encryption | Data encrypted at rest and in transit? | AES-256 + TLS 1.2+ |
| Access | MFA enforced? RBAC implemented? | Both required |
| Incident response | Documented IR plan? Notification timeline? | Must have plan + 24hr notification |
| Business continuity | DR plan tested? RTO/RPO defined? | Must be tested within 12 months |
| Data handling | Data classification? Retention policy? | Must have both |
| Subprocessors | Who else handles our data? | Must disclose all |

---

## Security Metrics Dashboard

### Board-Level Metrics (Quarterly)

| Metric | Target | Red Flag | Board Language |
|--------|--------|----------|----------------|
| ALE coverage | > 80% | < 60% | "$X of $Y total risk is mitigated" |
| Mean time to detect (MTTD) | < 24 hours | > 72 hours | "We find threats within X hours" |
| Mean time to respond (MTTR) | < 4 hours | > 24 hours | "We contain threats within X hours" |
| Compliance status | All current | Any lapsed | "All certifications active" or "Gap in X" |
| Critical vulnerabilities open | 0 | Any > 30 days | "Zero unpatched critical vulnerabilities" |

### Operational Metrics (Monthly)

| Metric | Target | Action Trigger |
|--------|--------|----------------|
| Phishing click rate | < 5% | > 10% = mandatory re-training |
| Critical patches within SLA | 100% | < 95% = process review |
| Privileged accounts reviewed | 100% quarterly | Any unreviewed = immediate review |
| Tier 1 vendors assessed | 100% annually | Any lapsed = assessment needed |
| Security training completion | > 95% | < 90% = escalate to managers |

---

## Security Budget Framework

### Budget as Percentage of Revenue/IT Spend

| Company Stage | Security Budget (% of Revenue) | Security Budget (% of IT) |
|---------------|-------------------------------|--------------------------|
| Seed/Series A | 2-4% | 8-12% |
| Series B | 3-5% | 10-15% |
| Series C+ | 4-8% | 12-18% |
| Enterprise | 5-10% | 15-20% |

### Budget Allocation by Category

| Category | % of Security Budget | Examples |
|----------|---------------------|----------|
| People | 40-50% | Security team salaries, training |
| Tools | 25-35% | SIEM, EDR, IAM, vulnerability scanner |
| Compliance | 10-15% | Auditors, certifications, legal |
| Testing | 5-10% | Pen testing, red team, bug bounty |
| Incident response | 5% | Retainer, insurance, forensics |

### Budget Justification Formula

For each security investment:

```
Investment ROI = (ALE_before - ALE_after) / Investment_cost

If ROI > 1.5x --> Strong business case, approve
If ROI 1.0-1.5x --> Moderate case, consider alternatives
If ROI < 1.0x --> Weak case, re-evaluate or accept the risk
```

---

## Red Flags

- Security budget justified by "industry benchmarks" instead of risk analysis -- budget will be wrong
- Pursuing certifications before basic hygiene (MFA, patching, backups) -- checkbox without substance
- No documented asset inventory -- protecting unknown assets is impossible
- IR plan exists but never tested (no tabletop exercise) -- plan will fail when needed
- Security team reports to IT, not executive level -- misaligned incentives, budget competition
- Single vendor for identity + endpoint + email -- vendor compromise = total compromise
- Security questionnaire backlog > 30 days -- silently losing enterprise deals
- No security champion program in engineering -- security becomes a bottleneck
- Pen test findings unresolved after 90 days -- testing without fixing is theater
- No data classification scheme -- everything treated the same = nothing protected properly

---

## Integration with C-Suite

| When... | CISO Works With... | To... |
|---------|-------------------|-------|
| Enterprise sales blocked | CRO (`cro-advisor`) | Complete security questionnaires, unblock deals |
| New product features | CTO + CPO (`cto-advisor`, `cpo-advisor`) | Threat modeling, security review |
| Compliance budget | CFO (`cfo-advisor`) | Size program against quantified risk exposure |
| Vendor contracts | COO (`coo-advisor`) | Security SLAs, right-to-audit clauses |
| M&A due diligence | CEO + CFO | Target security posture assessment |
| Incident occurs | CEO + Legal | Response coordination, regulatory notification |
| Board reporting | CEO (`ceo-advisor`) | Translate risk into business language |
| Hiring security team | CHRO (`chro-advisor`) | Compensation, leveling, recruiting |

---

## Proactive Triggers

- No security audit in 12+ months -- schedule before a customer or regulator asks
- Enterprise deal requires SOC 2 but no certification exists -- compliance roadmap urgently needed
- New market expansion planned -- check data residency, privacy requirements, local regulations
- Key system has no access logging -- compliance gap and forensic blind spot
- Vendor with access to sensitive data not assessed -- vendor risk assessment required
- Critical vulnerability disclosed in a dependency -- patch assessment within 24 hours
- Employee termination without access revocation SOP -- immediate security gap

---

## Output Artifacts

| Request | Deliverable |
|---------|-------------|
| "Assess our security posture" | Risk register with quantified ALE, prioritized by business impact |
| "We need SOC 2" | Compliance roadmap: timeline, cost, effort, quick wins, vendor selection |
| "Prep for security audit" | Gap analysis against target framework + remediation plan with owners |
| "We had an incident" | IR coordination plan + communication templates + regulatory timeline |
| "Security board section" | Risk posture summary, compliance status, incident report, budget ask |
| "Evaluate vendor security" | Vendor tier assessment with risk scoring and contract recommendations |
| "Justify security budget" | Risk-based budget proposal with ROI for each investment |

---

## Tool Reference

### security_posture_scorer.py

Scores security posture across NIST CSF 2.0 functions (Govern, Identify, Protect, Detect, Respond, Recover) and CISA Zero Trust Maturity Model pillars (Identity, Devices, Networks, Applications, Data). Produces board-ready security health reports.

```bash
# Run with demo data (realistic Series B company)
python scripts/security_posture_scorer.py

# From JSON with control assessments (0-4 maturity per control)
python scripts/security_posture_scorer.py --input controls.json

# JSON output
python scripts/security_posture_scorer.py --json
```

### risk_register_manager.py

Manages cyber risk register with ALE (SLE x ARO) calculations, mitigation ROI, and board-ready risk reports.

```bash
# Run with demo risk register
python scripts/risk_register_manager.py

# From JSON risk register
python scripts/risk_register_manager.py --input risks.json

# Sort by ROI (best investments first)
python scripts/risk_register_manager.py --sort-by roi

# JSON output
python scripts/risk_register_manager.py --json
```

### compliance_tracker.py

Tracks progress across SOC 2 Type I/II, ISO 27001, HIPAA, and GDPR. Calculates gap analysis, framework overlaps, and effort estimates.

```bash
# Track SOC 2 readiness (default)
python scripts/compliance_tracker.py

# Track multiple frameworks
python scripts/compliance_tracker.py --frameworks soc2_type1 iso27001 gdpr

# List available frameworks
python scripts/compliance_tracker.py --list-frameworks

# From JSON
python scripts/compliance_tracker.py --input compliance.json

# JSON output
python scripts/compliance_tracker.py --json
```

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Security budget justified by "industry benchmarks" not risk data | No risk quantification framework in place | Implement ALE-based risk register; justify every dollar against quantified risk reduction |
| Pursuing SOC 2 before basic hygiene (MFA, backups) | Checkbox compliance without substance | Phase 1 foundation first: MFA, endpoint protection, backups; then pursue certifications |
| Pen test findings unresolved after 90 days | Testing without fixing is theater | Set SLA: critical 7 days, high 30 days, medium 90 days; track in risk register |
| Security team reports to IT, not executive level | Misaligned incentives and budget competition | CISO should report to CEO or COO; separate budget from IT |
| Enterprise deals blocked by security questionnaires | No SOC 2 or questionnaire response backlog > 30 days | Prioritize SOC 2 Type I; create questionnaire response library; assign dedicated owner |
| Zero Trust initiative stalled at identity layer | Trying to implement all pillars simultaneously | Follow maturity model: Identity first (months 1-3), then Network, then Data |

---

## Success Criteria

- Security posture score above 70/100 on NIST CSF assessment (measured annually via security_posture_scorer.py)
- ALE coverage above 80% -- quantified risk exposure has funded mitigations (tracked in risk register)
- Mean time to detect (MTTD) under 24 hours for all severity levels
- Mean time to respond (MTTR) under 4 hours for P0/P1 incidents
- Zero critical vulnerabilities open longer than 7 days (measured weekly)
- SOC 2 Type II certification maintained current with zero control exceptions
- Phishing click rate below 5% across quarterly simulation campaigns

---

## Scope & Limitations

**In Scope**: Risk quantification (ALE/SLE/ARO), compliance roadmapping, Zero Trust maturity assessment, NIST CSF 2.0 scoring, incident response protocol, vendor security assessment, security budget justification, board-level security reporting.

**Out of Scope**: Penetration testing execution, malware analysis, SOC operations, firewall configuration, code review, forensic investigation execution, security tool procurement.

**Limitations**: Security posture scorer uses self-assessed maturity levels which may overstate actual capability. Risk register ALE calculations are estimates based on industry data -- actual losses vary significantly. Compliance tracker measures control implementation, not control effectiveness. Zero Trust scoring uses binary (implemented/not) which oversimplifies partial implementations.

---

## Integration Points

| Skill | Integration |
|-------|-------------|
| `cto-advisor` | Security architecture reviews; threat modeling for new features |
| `cfo-advisor` | Security budget sizing against quantified risk; compliance costs |
| `ceo-advisor` | Board security reporting; incident communication to stakeholders |
| `coo-advisor` | Vendor security SLAs; right-to-audit contract clauses |
| `cro-advisor` | Security questionnaire response; SOC 2 as sales enabler |
| `chro-advisor` | Security team hiring; security awareness training programs |
| `board-deck-builder` | Risk/security section of board deck with posture score and compliance status |
| `ra-qm-team` | Extended compliance frameworks (ISO 13485, MDR, FDA, GDPR, NIS2, DORA) |

---

## cmo-advisor

Source path: `references/c-level-advisor/cmo-advisor/SKILL.md`

# CMO Advisor

The agent acts as a fractional CMO, providing strategic marketing guidance grounded in B2B SaaS benchmarks and proven frameworks.

## Workflow

1. **Gather context** -- Identify company stage, ICP, current ARR, and marketing team size. Validate that at least stage and ICP are defined before proceeding.
2. **Audit current performance** -- Collect funnel metrics (visitors, MQLs, SQLs, pipeline, revenue). Flag any stage where conversion is below the benchmarks in the Channel Performance table.
3. **Define positioning** -- Draft a positioning statement using the template below. Confirm differentiation against the top two competitors.
4. **Build channel plan** -- Select channels from the Channel Performance Framework, allocate budget using the B2B SaaS Budget Allocation split, and set per-channel CAC targets.
5. **Design lead scoring** -- Configure the Lead Scoring Model and set the MQL threshold. Validate that the threshold produces a manageable volume for the sales team.
6. **Create campaign plan** -- Fill in the Campaign Planning Template for the first priority campaign. Include success metrics and required assets.
7. **Establish measurement cadence** -- Set daily, weekly, monthly, and quarterly review rhythms using the Reporting Cadence below.

## Positioning Statement Template

```
For [target customer]
Who [statement of need or opportunity]
[Product name] is a [product category]
That [statement of key benefit]
Unlike [primary competitive alternative]
Our product [statement of primary differentiation]
```

## Marketing Budget Allocation (B2B SaaS Typical)

| Function | % of Budget |
|----------|-------------|
| Demand Generation | 35-45% |
| Content & Brand | 15-20% |
| Marketing Ops & Tech | 15-20% |
| Events & Field | 10-15% |
| People & Overhead | 15-20% |

## Channel Performance Framework

| Channel | CAC | Volume | Quality | Scalability |
|---------|-----|--------|---------|-------------|
| Organic Search | $ | High | Medium | Medium |
| Paid Search | $$ | Medium | High | High |
| Social Organic | $ | Medium | Low | Medium |
| Social Paid | $$ | High | Medium | High |
| Content | $ | High | High | Medium |
| Events | $$$ | Low | High | Low |
| Partnerships | $$ | Medium | High | Medium |

## Lead Scoring Model

| Action | Points |
|--------|--------|
| Website visit | 1 |
| Content download | 5 |
| Email open | 1 |
| Email click | 3 |
| Webinar registration | 10 |
| Webinar attendance | 15 |
| Demo request | 25 |
| Pricing page visit | 10 |

**MQL Threshold**: 50 points

## Lead Stages

Visitor > Known > Engaged > MQL > SAL > SQL > Opportunity > Customer

## Campaign Planning Template

```
CAMPAIGN: [Name]
OBJECTIVE: [Specific goal]
AUDIENCE: [Target segment]
CHANNELS: [Distribution channels]
TIMELINE: [Start - End dates]
BUDGET: [Total investment]

KEY MESSAGES:
- Primary: [Main message]
- Secondary: [Supporting points]

SUCCESS METRICS:
- Leads: [Target]
- Pipeline: [Target]
- Cost per lead: [Target]

ASSETS REQUIRED:
- [ ] Landing page
- [ ] Email sequence
- [ ] Ad creative
- [ ] Content pieces
```

## Messaging Framework

| Audience | Pain Point | Solution | Proof Point |
|----------|------------|----------|-------------|
| Buyer 1 | [Problem] | [How we help] | [Evidence] |
| Buyer 2 | [Problem] | [How we help] | [Evidence] |
| User 1 | [Problem] | [How we help] | [Evidence] |

## Reporting Cadence

- **Daily**: Campaign performance (spend, clicks, conversions)
- **Weekly**: Pipeline and stage-over-stage conversion
- **Monthly**: Full funnel analysis, MQL-to-SQL conversion, CAC trend
- **Quarterly**: Channel ROI review, budget reallocation decisions

## Multi-Touch Attribution Model

| Touch | Weight |
|-------|--------|
| First Touch | 30% |
| Lead Creation | 20% |
| Opportunity Creation | 30% |
| Closed Won | 20% |

## Content Types by Funnel Stage

| Stage | Formats |
|-------|---------|
| Awareness | Blog posts, social content, podcasts, industry reports |
| Consideration | Ebooks/guides, webinars, case studies, comparison guides |
| Decision | Product demos, ROI calculators, testimonials, implementation guides |

## Example: Series-B SaaS Demand-Gen Plan

A Series-B SaaS company ($8M ARR, 12-person marketing team) targeting mid-market DevOps buyers:

```
Budget: $2.4M annual ($200K/mo)
Allocation:
  Demand Gen (40%):  $960K -- Paid search ($300K), LinkedIn Ads ($250K),
                               Content syndication ($200K), Events ($210K)
  Content & Brand (18%): $432K
  Ops & Tech (17%):      $408K
  People (25%):          $600K

Targets:
  MQLs/month: 400  |  SQL conversion: 25%  |  Pipeline/quarter: $6M
  Blended CAC: $18K  |  CAC Payback: 14 months
```

## Marketing Org by Stage

| Stage | Roles |
|-------|-------|
| Series A (5-10) | Head of Marketing, Content/Brand, Demand Gen, Marketing Ops |
| Series B (10-20) | CMO, Director Brand, Director Demand Gen, Manager Content, Manager Ops, ICs |
| Series C+ (20+) | CMO, VP Brand, VP Demand Gen, VP Revenue Marketing, VP Marketing Ops, Specialized teams |

## Scripts

```bash
# Campaign performance analyzer
python scripts/campaign_analyzer.py --campaign Q1-ABM

# Lead scoring calculator
python scripts/lead_scoring.py --leads leads.csv

# Content calendar generator
python scripts/content_calendar.py --pillars topics.yaml

# Attribution reporter
python scripts/attribution.py --period monthly
```

## References

- `references/brand_guidelines.md` -- Brand standards and usage
- `references/demand_gen_playbook.md` -- Campaign execution guide
- `references/content_strategy.md` -- Content planning framework
- `references/martech_stack.md` -- Technology recommendations

---

## Tool Reference

### marketing_roi_calculator.py

Calculates per-channel ROI, blended CAC, Marketing Efficiency Ratio (MER), pipeline contribution, and multi-touch attribution. Produces board-ready marketing performance reports.

```bash
# Run with demo data (6-channel mix)
python scripts/marketing_roi_calculator.py

# From JSON with channel data
python scripts/marketing_roi_calculator.py --input marketing_data.json

# JSON output
python scripts/marketing_roi_calculator.py --json
```

### brand_health_tracker.py

Monitors brand health across 5 dimensions: awareness, perception, differentiation, engagement, and loyalty. Tracks competitive share of voice.

```bash
# Run with demo data
python scripts/brand_health_tracker.py

# From JSON with brand metrics
python scripts/brand_health_tracker.py --input brand_data.json

# JSON output
python scripts/brand_health_tracker.py --json
```

### channel_mix_optimizer.py

Optimizes marketing budget allocation across channels based on ROI, efficiency frontiers, and diminishing returns. Projects impact of reallocation.

```bash
# Run with demo data (ROI optimization)
python scripts/channel_mix_optimizer.py

# Optimize for pipeline
python scripts/channel_mix_optimizer.py --goal pipeline

# Set total budget
python scripts/channel_mix_optimizer.py --budget 800000

# From JSON with channel performance
python scripts/channel_mix_optimizer.py --input channels.json

# JSON output
python scripts/channel_mix_optimizer.py --json
```

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Blended CAC increasing quarter over quarter | Channel saturation or scaling into less efficient channels | Run channel_mix_optimizer.py; cut lowest-ROI channels; increase investment in highest-ROI |
| Marketing sourced pipeline below 40% of total | Over-reliance on outbound/sales-sourced; marketing underinvesting in demand gen | Shift budget: target 40-60% marketing-sourced pipeline; invest in content + paid channels |
| Brand awareness below 30% in target market | Insufficient top-of-funnel investment; brand treated as afterthought | Allocate 15-20% of budget to brand; measure aided awareness quarterly |
| MQL-to-SQL conversion below 20% | Lead scoring threshold too low or ICP mismatch | Recalibrate MQL threshold; audit scoring model; tighten ICP definition |
| Marketing Efficiency Ratio (MER) below 1.0x | Spending more on marketing than generating in new ARR | Audit channel mix; pause negative-ROI channels; focus on proven converters |
| No brand tracking in place | Half of B2B SaaS companies don't track brand at all | Implement quarterly brand health survey using brand_health_tracker.py framework |

---

## Success Criteria

- Marketing Efficiency Ratio (MER) above 1.5x -- every $1 of marketing generates $1.50+ in new ARR
- Blended CAC below target for company stage (Series A: $15K, Series B: $25K, Series C: $35K)
- Pipeline coverage at 3-4x of quarterly new ARR target (measured monthly)
- Marketing-sourced pipeline contribution above 40% of total pipeline
- CAC payback under 18 months (under 12 months for top-quartile performance)
- Brand health score improving quarter-over-quarter (tracked via brand_health_tracker.py)
- Channel mix optimization reviewed quarterly with budget reallocation acting on data

---

## Scope & Limitations

**In Scope**: Marketing ROI calculation, channel performance analysis, brand health tracking, lead scoring, campaign planning, budget allocation optimization, multi-touch attribution, competitive share of voice.

**Out of Scope**: Content creation, creative design, social media posting, email campaign execution, event logistics, PR execution, website development.

**Limitations**: Marketing ROI calculator uses provided attribution data -- accuracy depends on attribution model quality. Brand health tracker relies on survey data which may have sampling bias. Channel mix optimizer uses historical performance with diminishing returns modeling -- future performance may differ due to market changes. MER calculation requires accurate new ARR attribution which many companies struggle to measure precisely.

---

## Integration Points

| Skill | Integration |
|-------|-------------|
| `cro-advisor` | Pipeline contribution alignment; marketing-sourced vs sales-sourced targets |
| `cfo-advisor` | Marketing budget as % of revenue; CAC payback for unit economics |
| `ceo-advisor` | Brand positioning alignment with company vision |
| `cpo-advisor` | Product marketing alignment; feature launch campaigns |
| `board-deck-builder` | Growth/marketing section with CAC, pipeline, channel performance |
| `chief-of-staff` | Routes market strategy and brand questions |
| `competitive-intel` | Competitive positioning; share of voice vs competitors |

---

## company-os

Source path: `references/c-level-advisor/company-os/SKILL.md`

# Company Operating System

The operating system is the collection of tools, rhythms, and agreements that determine how the company functions. Every company has one -- most just do not know what it is. Making it explicit makes it improvable.

## Keywords

operating system, EOS, Entrepreneurial Operating System, Scaling Up, Rockefeller Habits, OKR, Holacracy, L10 meeting, rocks, scorecard, accountability chart, issues list, IDS, meeting pulse, quarterly planning, weekly scorecard, management framework, company rhythm, traction, annual planning, communication cadence

---

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Company size and stage** — the framework recommendation (EOS / Scaling Up / OKR-native / Holacracy) and implementation timeline are driven primarily by headcount
- [ ] **What is actually broken** (no scorecard, misaligned priorities, recurring unresolved issues, meeting overload) — determines which of the six components to build first
- [ ] **Founder operating style** (operational vs. visionary) and whether the company is engineering-led or sales-led — tips the framework choice within a given size band
- [ ] **What rhythms and metrics already exist** — so the new OS replaces meetings rather than stacking on top and causing meeting fatigue

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## Operating System Selection

### Decision Tree

```
START: "Which operating system?"
  |
  v
[Company size?]
  |
  +-- 10-50 people
  |     |
  |     v
  |   [Is the founder operational or visionary?]
  |     |
  |     +-- Operational --> EOS / Traction (structured, simple)
  |     +-- Visionary --> Scaling Up (ambitious, strategy-heavy)
  |
  +-- 50-200 people
  |     |
  |     v
  |   [Engineering-led or sales-led?]
  |     |
  |     +-- Engineering-led --> OKR-native (hypothesis-driven)
  |     +-- Sales-led --> Scaling Up or EOS (execution-focused)
  |
  +-- 200+ people
  |     |
  |     v
  |   [High autonomy or high alignment needed?]
  |     |
  |     +-- High autonomy --> Holacracy (only if patient)
  |     +-- High alignment --> Custom hybrid (best of EOS + OKR)
  |
  +-- Not sure --> Start with EOS. It is the simplest to implement.
```

### Framework Comparison Matrix

| Feature | EOS | Scaling Up | OKR-Native | Holacracy |
|---------|-----|-----------|------------|-----------|
| Complexity | Low | Medium | Medium | High |
| Implementation time | 30-90 days | 90-180 days | 60-120 days | 6-12 months |
| Best company size | 10-250 | 50-500 | 20-500 | 50-300 |
| Goal framework | Rocks (binary) | OKRs + Priorities | OKRs (graded) | Roles + accountabilities |
| Meeting cadence | Weekly L10 | Daily huddle + weekly | Weekly + quarterly | Governance + tactical |
| Issue resolution | IDS | Keep/Kill/Combine | Retrospective | Governance process |
| Accountability | Accountability chart | Function accountability | OKR ownership | Role-based |
| Scorecard | Weekly numbers | Weekly KPIs | Quarterly KRs | Metrics per role |
| Strengths | Simple, fast to implement | Rigorous, strategy-heavy | Flexible, tech-friendly | Distributed authority |
| Weaknesses | Can feel rigid | Complex, requires discipline | Can drift without structure | Steep learning curve |

---

## The Six Core Components

Every effective operating system has these six, regardless of framework:

### Component 1: Accountability Chart

Not an org chart. An accountability chart answers: "Who owns this outcome?"

#### Design Principles

| Principle | Implementation |
|-----------|---------------|
| Single ownership | One person owns each function. Multiple may work in it. |
| Explicit gaps | Functions nobody owns are identified and assigned. |
| No overlap | If two people think they own it, neither does. Resolve immediately. |
| Stage-appropriate | One person can own multiple seats early. Be explicit about it. |
| Quarterly review | Ownership shifts as company grows. Review every quarter. |

#### Accountability Chart Template

```
CEO
  |
  +-- Revenue (CRO/VP Sales)
  |     +-- Inbound pipeline
  |     +-- Outbound pipeline
  |     +-- Customer success
  |
  +-- Product & Engineering (CTO/CPO)
  |     +-- Product roadmap
  |     +-- Engineering delivery
  |     +-- Technical operations
  |
  +-- Operations (COO)
  |     +-- Finance & legal
  |     +-- People operations
  |     +-- Business operations
  |
  +-- Marketing (CMO/VP Marketing)
        +-- Demand generation
        +-- Brand & content
        +-- Product marketing
```

#### Workshop Protocol (2 hours)

```
Step 1: List all functions the company performs (30 min)
Step 2: Assign ONE owner per function (30 min)
Step 3: Identify gaps (functions nobody owns) (15 min)
Step 4: Identify overlaps (2+ people claiming ownership) (15 min)
Step 5: Resolve gaps and overlaps (20 min)
Step 6: Publish and communicate (10 min)
```

### Component 2: Scorecard

Weekly metrics that tell you if the company is on track. Not monthly. Not quarterly. Weekly.

#### Scorecard Rules

| Rule | Rationale |
|------|-----------|
| 5-15 metrics maximum | More than 15 = nothing gets attention |
| Each metric has an owner | Ownership drives accountability |
| Each metric has a weekly target | Not a range -- a specific number |
| Red/Yellow/Green status | Not paragraphs -- traffic lights |
| Only Red metrics get discussion | Green = no discussion needed in meeting |

#### Example Scorecard

| Metric | Owner | Target | Week | Status |
|--------|-------|--------|------|--------|
| New MRR | CRO | $50K | $43K | [R] |
| Logo churn | CS Lead | < 1% | 0.8% | [G] |
| Active users | CPO | 2,000 | 2,150 | [G] |
| Deployments | CTO | 3/week | 3 | [G] |
| Critical bugs open | CTO | 0 | 2 | [R] |
| Runway | CFO | > 18mo | 16mo | [Y] |
| Offer acceptance | CHRO | > 85% | 90% | [G] |

### Component 3: Meeting Pulse

#### Full Meeting Rhythm

| Meeting | Frequency | Duration | Who | Purpose |
|---------|-----------|----------|-----|---------|
| Daily standup | Daily | 15 min | Each team | Blockers only |
| L10 / Leadership sync | Weekly | 90 min | Leadership team | Scorecard + issues |
| Department review | Monthly | 60 min | Dept + leadership | Deep dive on dept metrics |
| Quarterly planning | Quarterly | 1-2 days | Leadership | Set rocks, review strategy |
| Annual planning | Annual | 2-3 days | Leadership | 1-year + 3-year vision |

#### L10 Meeting Agenda (Weekly Leadership)

| Segment | Duration | Activity |
|---------|----------|----------|
| Good news | 5 min | Personal + business wins |
| Scorecard review | 5 min | Flag red items only |
| Rock review | 5 min | On/off track for each rock |
| Customer/employee headlines | 5 min | Notable events |
| Issues list (IDS) | 60 min | Identify, Discuss, Solve |
| To-dos review | 5 min | Last week's commitments: done or not? |
| Conclude | 5 min | Rate meeting 1-10, what would make it 10 next time |

### Component 4: Issue Resolution (IDS)

Maximum 15 minutes per issue. This is the core problem-solving loop.

```
IDENTIFY: What is the actual issue? (One sentence, root cause, not symptom)
  |
DISCUSS: Relevant facts + perspectives. Time-boxed.
  |       When discussion starts repeating, STOP.
  |
SOLVE: One owner. One action. One due date. Written down.
```

#### IDS Anti-Patterns

| Anti-Pattern | Why It Fails | Fix |
|-------------|-------------|-----|
| "Let's take this offline" | Things taken offline rarely get resolved | Solve it now or put it on next week's list |
| Discussing without deciding | Great discussion, no action item = wasted | Every discussion must end with a decision |
| Revisiting decided issues | Undermines the system | Once solved, off the list. Reopen only with new data. |
| Issue on list 3+ meetings | Either not real or too scary to address | Force it: address this week or remove it |
| Multiple issues conflated | Impossible to solve a bundled problem | One issue per entry. Separate if needed. |

### Component 5: Rocks (90-Day Priorities)

#### Rock Rules

| Rule | Rationale |
|------|-----------|
| 3-7 per person maximum | More than 7 = none get done |
| 3-7 company-level rocks | Shared leadership priorities |
| Binary status: done or not done | No "60% complete" |
| Set at quarterly planning | Reviewed weekly (on/off track) |
| Not a to-do list | Rocks take 90 days of sustained work |

#### Good vs. Bad Rocks

| Bad Rock | Why | Good Rock |
|----------|-----|-----------|
| "Improve sales process" | Not measurable or specific | "Implement CRM with pipeline stages and reporting by Mar 31" |
| "Hire more engineers" | No target, no deadline | "Hire 3 senior engineers with offers accepted by Apr 15" |
| "Reduce churn" | No target | "Reduce monthly logo churn from 3% to 1.5% by end of Q2" |
| "Get better at communication" | Not observable | "Ship weekly company update every Friday for 12 weeks" |

### Component 6: Communication Cadence

| Audience | What | When | Format |
|----------|------|------|--------|
| All employees | Company update | Monthly | Written + Q&A |
| All employees | Quarterly results + priorities | Quarterly | All-hands meeting |
| Leadership team | Scorecard | Weekly | Dashboard |
| Board | Company performance | Monthly or quarterly | Board memo/deck |
| Investors | Key metrics + narrative | Monthly or quarterly | Investor update |
| Customers | Product updates | Per release | Release notes |

**Default rule**: If deciding whether to share internally, share it. Under-communication always costs more than over-communication.

---

## Implementation Roadmap

### 30-Day Quick Start

| Week | Activity | Time Investment |
|------|----------|-----------------|
| 1 | Build accountability chart | 2-hour workshop |
| 2 | Define 5-10 weekly scorecard metrics | 1-hour alignment session |
| 3 | Start weekly L10 meeting | 90 min/week (ongoing) |
| 4 | Set first round of 90-day rocks | Half-day planning session |

These four alone improve coordination more than most companies achieve in a year.

### 90-Day Full Implementation

| Month | Focus | Deliverables |
|-------|-------|-------------|
| 1 | Foundation | Accountability chart, scorecard, L10 meetings |
| 2 | Depth | Rocks defined, issues list active, daily standups |
| 3 | Cadence | Full meeting rhythm, communication cadence, first quarterly review |

---

## Common Failure Modes

| Failure | Symptom | Fix |
|---------|---------|-----|
| Partial implementation | "We do OKRs but skip check-ins" | Half an OS is worse than none. Commit to the full system. |
| Meeting fatigue | Added rhythm on top of existing meetings | Replace meetings, do not add them |
| Metric overload | 30 KPIs because "they all matter" | Start with 5. Add only when cadence is established. |
| Rock inflation | 12 rocks per person | Hard limit: 7 per person, 7 for the company. |
| Leader non-compliance | Leadership skips L10 or ignores IDS | The OS mirrors leadership respect. Leaders go first. |
| No quarterly review | Annual goals checked at year-end | Quarterly is the minimum review cycle. |
| Scorecard without targets | Tracking numbers without thresholds | Every metric needs a target to be actionable. |

---

## Red Flags

- Five team leads give different answers when asked "What are the top 3 company priorities?" -- alignment failure
- Same issue on the issues list for 4+ weeks -- avoidance or structural problem
- No weekly scorecard exists -- flying blind
- Rocks set but never reviewed weekly -- goals without accountability
- Accountability chart has not been updated in 6+ months -- reality has drifted
- Meetings consistently end without decisions -- meeting design problem
- Communication is all top-down, never bottom-up -- feedback loop broken

---

## Integration with C-Suite

| Role | OS Dependency |
|------|---------------|
| CEO (`ceo-advisor`) | Sets vision that feeds 1-year plan and rocks |
| COO (`coo-advisor`) | Owns meeting pulse and issue resolution cadence |
| CFO (`cfo-advisor`) | Owns financial metrics in the scorecard |
| CTO (`cto-advisor`) | Owns engineering rocks and tech scorecard metrics |
| CHRO (`chro-advisor`) | Owns people metrics (attrition, hiring velocity) |
| Culture Architect (`culture-architect`) | Culture rituals integrate into meeting pulse |
| Strategic Alignment (`strategic-alignment`) | Validates team rocks cascade from company rocks |
| Change Management (`change-management`) | New OS rollout follows ADKAR model |

---

## Output Artifacts

| Request | Deliverable |
|---------|-------------|
| "Set up our operating system" | Framework recommendation + 30-day implementation plan |
| "Design our meeting cadence" | Full meeting rhythm with agendas and owners |
| "Build our scorecard" | 5-15 metrics with owners, targets, and thresholds |
| "Help with quarterly planning" | Planning session agenda + rock-setting framework |
| "Fix our accountability" | Accountability chart workshop + gap/overlap analysis |
| "We keep discussing the same issues" | IDS training + issues list audit |

---

## Tool Reference

### scorecard_builder.py

Builds and tracks weekly company scorecards with RAG status, trend analysis, and IDS-ready issue lists for L10 meetings.

```bash
# Run with demo data
python scripts/scorecard_builder.py

# From JSON with metrics and rocks
python scripts/scorecard_builder.py --input scorecard.json

# JSON output
python scripts/scorecard_builder.py --json
```

### rocks_tracker.py

Tracks 90-day company and individual rocks with binary status, blocker identification, and owner accountability.

```bash
# Run with demo data
python scripts/rocks_tracker.py

# Specify quarter
python scripts/rocks_tracker.py --quarter Q2

# From JSON
python scripts/rocks_tracker.py --input rocks.json

# JSON output
python scripts/rocks_tracker.py --json
```

### meeting_pulse_designer.py

Designs company meeting rhythms, validates meeting load, identifies redundancies and gaps, and generates L10 agenda templates.

```bash
# Run with demo meetings
python scripts/meeting_pulse_designer.py

# Specify team size
python scripts/meeting_pulse_designer.py --team-size 50

# From JSON with current meetings
python scripts/meeting_pulse_designer.py --input meetings.json

# JSON output
python scripts/meeting_pulse_designer.py --json
```

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Five team leads give different answers about top 3 priorities | Alignment failure -- rocks not cascaded or not reviewed weekly | Re-run quarterly planning; review rocks weekly in L10; publish company priorities visibly |
| Same issue on the issues list for 4+ weeks | Avoidance or structural problem too scary to address | Force it: address this week or permanently remove; escalate if needed |
| Scorecard has 30+ KPIs | Metric overload -- nothing gets attention | Cut to 5-10 metrics. Only the ones that tell you if the company is on track. |
| Rocks set but never reviewed | Goals without accountability; L10 meeting not happening | Weekly L10 is non-negotiable; 5 minutes on rocks review every week |
| Leadership team skips L10 or ignores IDS | Leader non-compliance destroys the OS | CEO must enforce: leaders go first. If CEO skips, the OS dies. |
| Meetings added on top of existing meetings | Meeting fatigue from accumulation | Replace meetings, don't add them. Audit meeting inventory; eliminate redundancies |

---

## Success Criteria

- Weekly L10 meeting happens every week with 90%+ leadership attendance (no exceptions for 12+ consecutive weeks)
- Scorecard reviewed weekly with red metrics discussed using IDS format (zero red metrics ignored)
- 70%+ of quarterly rocks completed as binary done/not-done by end of quarter
- Issues list: average issue resolved within 2 meetings (no issue lingers 4+ weeks)
- All team leads can articulate top 3 company priorities identically (tested quarterly)
- Meeting hours per person per week below 10 hours (measured via meeting_pulse_designer.py)
- Accountability chart reviewed and updated quarterly with zero unowned functions

---

## Scope & Limitations

**In Scope**: Operating system selection (EOS, Scaling Up, OKR, Holacracy), accountability charts, weekly scorecards, meeting pulse design, IDS issue resolution, 90-day rocks, communication cadence, implementation roadmap.

**Out of Scope**: OKR software configuration, project management tool setup, Agile/Scrum methodology, sprint planning, product backlog management, HR policy development.

**Limitations**: Scorecard builder calculates RAG from provided data but cannot source live metrics from business systems. Rocks tracker uses manual status updates -- it cannot automatically detect completion. Meeting pulse designer provides recommendations based on team size and meeting inventory but cannot account for company-specific cultural norms. Framework comparison is directional -- actual implementation success depends on leadership commitment.

---

## Integration Points

| Skill | Integration |
|-------|-------------|
| `ceo-advisor` | CEO sets vision that feeds 1-year plan and rocks |
| `coo-advisor` | Owns meeting pulse and issue resolution cadence |
| `cfo-advisor` | Financial metrics in the weekly scorecard |
| `cto-advisor` | Engineering rocks and tech scorecard metrics |
| `chro-advisor` | People metrics (attrition, hiring velocity) in scorecard |
| `culture-architect` | Culture rituals integrate into meeting pulse |
| `strategic-alignment` | Validates team rocks cascade from company rocks |
| `change-management` | New OS rollout follows ADKAR model for adoption |
| `chief-of-staff` | Orchestrates quarterly planning sessions and L10 follow-up |

---

## competitive-intel

Source path: `references/c-level-advisor/competitive-intel/SKILL.md`

# Competitive Intelligence

Systematic competitor tracking. Not obsession -- intelligence that drives real decisions. Know competitors well enough to win against them. Do not let them set your agenda.

## Keywords

competitive intelligence, competitor analysis, battlecard, win/loss analysis, competitive positioning, competitive tracking, market intelligence, competitor research, SWOT, competitive map, feature gap analysis, competitive strategy, market share, competitive advantage, moat, switching costs

---

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which output is needed** (battlecard, positioning map, win/loss analysis, or board summary) — each has a different template and data requirement
- [ ] **Which competitors and their tier** (direct, adjacent, future) — sets tracking intensity and which competitors appear in the artifact
- [ ] **Your ICP and the problem you solve** — drives the threat-classification matrix and what counts as a real competitor vs. noise
- [ ] **Your actual differentiators with proof points** — the "why we win" and "killer questions" sections are worthless without concrete, evidence-backed advantages

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## 5-Layer Intelligence System

### Layer 1: Competitor Identification

#### Threat Classification Matrix

| | Same ICP | Different ICP |
|---|---|---|
| **Same problem** | Direct threat (Tier 1) | Adjacent watch (Tier 2) |
| **Different problem** | Displacement risk (Tier 2) | Monitor only (Tier 3) |

#### Competitor Tiers

| Tier | Definition | Tracking Intensity | Examples |
|------|-----------|-------------------|---------|
| 1: Direct | Same ICP, same problem, similar price | Monthly deep tracking | Your top 3 named competitors |
| 2: Adjacent | Same budget, different solution approach | Quarterly review | Build-in-house, adjacent products |
| 3: Future | Well-funded in adjacent space or incumbents with roadmap overlap | Semi-annual scan | Funded startups, big tech features |

### Layer 2: Tracking Dimensions

| Dimension | Sources | Cadence | Priority |
|-----------|---------|---------|----------|
| Product moves | Changelog, G2, Capterra, Twitter, LinkedIn | Monthly | High |
| Pricing changes | Pricing page, sales intel, customer feedback | Triggered | High |
| Funding | Crunchbase, TechCrunch, LinkedIn | Triggered | Medium |
| Hiring signals | LinkedIn job postings, Indeed, Glassdoor | Monthly | Medium |
| Partnerships | Press releases, co-marketing, integrations | Triggered | Medium |
| Customer wins/losses | Case studies, review sites, LinkedIn | Monthly | High |
| Customer losses (theirs) | G2 reviews, forums, your own inbound | Ongoing | High |
| Messaging shifts | Homepage, ads, conference talks | Quarterly | Medium |

### Layer 3: Analysis Frameworks

#### SWOT Per Competitor

| Element | Key Questions |
|---------|-------------|
| Strengths | Where do they consistently win? What do customers praise? |
| Weaknesses | Where do they lose? What do reviews complain about? |
| Opportunities | What could they do that would threaten you more? |
| Threats | What is their existential risk? What could make them irrelevant? |

#### Feature Gap Analysis Template

| Feature/Capability | You | Competitor A | Competitor B | Status |
|-------------------|-----|-------------|-------------|--------|
| Core Feature 1 | [check] | [check] | [x] | Your advantage |
| Core Feature 2 | [x] | [check] | [check] | Gap -- on roadmap? |
| Feature 3 | [check] | [x] | [x] | Moat (unique to you) |
| Feature 4 | [x] | [x] | [check] | Comp B only |
| Feature 5 | [check] | [check] | [check] | Table stakes |

#### Competitive Positioning Map

Choose 2 axes that show YOUR differentiation:

| Common Axis Pairs | When to Use |
|------------------|------------|
| Price vs. Feature Depth | When you compete on value |
| Enterprise-ready vs. SMB-ready | When you serve a different segment |
| Easy to Implement vs. Configurable | When implementation speed is your advantage |
| Vertical-specific vs. Horizontal | When you specialize |

### Layer 4: Output Formats

#### Battlecard Template (Sales Use)

```
BATTLECARD: [Competitor Name]
Last Updated: [Date]

OVERVIEW
  Company: [name, founded, HQ, funding, size]
  Product: [1-sentence description]
  ICP overlap: [High/Medium/Low]
  Threat level: [High/Medium/Low]

WHY WE WIN
  1. [Advantage 1 with proof point]
  2. [Advantage 2 with proof point]
  3. [Advantage 3 with proof point]

WHERE THEY WIN
  1. [Their advantage -- be honest]
  2. [Their advantage]

LANDMINES (what they say about us)
  - "[Their claim]" --> Counter: "[Your response with evidence]"
  - "[Their claim]" --> Counter: "[Your response with evidence]"

KILLER QUESTIONS (ask the prospect)
  1. "[Question that exposes competitor weakness]"
  2. "[Question that highlights your strength]"
  3. "[Question that validates your differentiation]"

RECENT MOVES
  - [Date]: [What they did, what it means]

CUSTOMER REFERENCES (ask for these)
  - [Customer name, use case, result]
```

#### Board Competitive Summary (Monthly)

```
COMPETITIVE INTELLIGENCE SUMMARY -- [Month]

MARKET MOVEMENTS
  [Competitor A]: [What happened, significance]
  [Competitor B]: [What happened, significance]

WIN/LOSS SNAPSHOT
  Win rate vs [Comp A]: [X]% (trend: [up/down/stable])
  Win rate vs [Comp B]: [X]% (trend: [up/down/stable])
  Top win reason: [reason]
  Top loss reason: [reason]

RECOMMENDED RESPONSE
  [1 specific action with owner and timeline]

RISK WATCH
  [Specific risk with probability and impact]
```

### Layer 5: Intelligence Cadence

| Cadence | Activity | Output |
|---------|----------|--------|
| Monthly (scheduled) | Review Tier 1 competitors, update battlecards | Updated battlecards + leadership summary |
| Triggered (event) | Competitor raises funding, launches feature, changes pricing | Impact assessment within 48 hours |
| Quarterly | Full landscape review, positioning map update | Board-ready competitive slide |
| Annual | Add/remove tracked competitors, refresh threat assessment | Updated competitive strategy |

---

## Win/Loss Analysis

### When to Conduct

| Event | Interview? | Who Conducts |
|-------|-----------|-------------|
| Lost deal > $50K ACV | Always | Non-AE (CS, product, or external) |
| Churn > 6 months tenure | Always | CS or product team |
| Competitive win | Selectively | Product or marketing |
| Lost to "no decision" | Sample | Marketing or product |

### Interview Protocol

| Order | Question | What You Learn |
|-------|----------|---------------|
| 1 | "Walk me through your evaluation process" | How they buy, who was involved |
| 2 | "Who else were you considering?" | Competitive set from their perspective |
| 3 | "What were the top 3 criteria in your decision?" | Decision drivers (may differ from what AE reported) |
| 4 | "Where did [our product] fall short?" | Specific gaps, not vague "they were better" |
| 5 | "What was the deciding factor?" | The one thing that tipped the decision |
| 6 | "What would have changed your decision?" | The counterfactual -- most actionable intel |

### Aggregate Analysis

| Metric | Cadence | Output |
|--------|---------|--------|
| Win reasons (ranked by frequency) | Monthly | Top 5 with trend |
| Loss reasons (ranked by frequency) | Monthly | Top 5 with trend |
| Competitor win rates (by competitor, segment) | Monthly | Competitive scoreboard |
| Win rate trends over time | Quarterly | Trend lines for board |

---

## The Balance: Intelligence vs. Obsession

### Over-Tracking Signals

| Signal | Risk |
|--------|------|
| Roadmap driven by "they shipped X" | Reactive, not strategic |
| Team morale drops when competitor fundraises | Emotional, not analytical |
| Shipping features to match checklists | Building for competitors, not customers |
| Pricing always starts with "well, they charge X" | Cost-anchored, not value-anchored |

### Under-Tracking Signals

| Signal | Risk |
|--------|------|
| AEs blindsided on calls | Losing deals from lack of preparation |
| Prospects know more than your team | Credibility gap in sales |
| Missed major competitor launch | Reactive when it could have been proactive |
| Positioning unchanged in 12+ months | Market moved, you did not |

### The Right Posture

- Know competitors well enough to win against them
- Do not let them set your agenda
- Roadmap is led by customer problems, informed by competitive gaps
- Pricing is anchored to your value, not their price

---

## Intelligence Distribution

| Audience | Format | Cadence | Owner |
|----------|--------|---------|-------|
| AEs + SDRs | Battlecards in CRM | Monthly + triggered | CRO |
| Product | Feature gap analysis | Quarterly | CPO |
| Marketing | Positioning brief | Quarterly | CMO |
| Leadership | 1-page competitive summary | Monthly | CEO/COO |
| Board | Competitive landscape slide | Quarterly | CEO |

**One source of truth**: All competitive intel in one place (Notion, Confluence, etc.). Slack-only distribution disappears.

---

## Red Flags

| Signal | Implication | Action |
|--------|------------|--------|
| Competitor win rate > 50% in core segment | Fundamental positioning problem | Strategy review, not more battlecards |
| Same objection from 5+ deals | Feature gap that is real, not optics | Product roadmap input |
| Competitor hired 10+ engineers in your domain | Major product investment incoming | Accelerate your roadmap or differentiate |
| Competitor raised > $20M targeting your ICP | 12-month competitive intensity increase | Strengthen moat, lock in customers |
| Prospects evaluate you to justify competitor choice | You are the "check box" | Fix perception or change segment |
| No win/loss interviews conducted | Learning nothing from outcomes | Implement win/loss program immediately |

---

## Integration with C-Suite

| Intelligence Type | Feeds To | Action |
|------------------|----------|--------|
| Product moves | CPO (`cpo-advisor`) | Roadmap input, feature gap review |
| Pricing changes | CRO + CFO | Pricing response evaluation |
| Funding rounds | CEO + CFO | Strategic positioning update |
| Hiring signals | CHRO + CTO | Talent market intelligence |
| Customer wins/losses | CRO + CMO | Battlecard updates, positioning shifts |
| Marketing campaigns | CMO (`cmo-advisor`) | Counter-positioning, channel strategy |
| Market trends | CEO + Board Deck Builder | Board competitive slide |

---

## Output Artifacts

| Request | Deliverable |
|---------|-------------|
| "Map the competitive landscape" | Competitor identification + tier classification + positioning map |
| "Build a battlecard for [competitor]" | Sales battlecard with win themes, landmines, killer questions |
| "Analyze our win/loss data" | Aggregate analysis with patterns, trends, and recommendations |
| "Competitor just launched [feature]" | Impact assessment + recommended response + timeline |
| "Competitive section for board" | Monthly summary: movements, win/loss, recommended actions |
| "Update our positioning" | Positioning analysis against current competitive landscape |

---

## Tool Reference

### 1. market_landscape_mapper.py

Maps the competitive landscape across configurable dimensions, classifying competitors by tier, plotting market positioning, and identifying whitespace opportunities.

```bash
python scripts/market_landscape_mapper.py --input competitors.json --json
python scripts/market_landscape_mapper.py --input competitors.json
```

| Flag | Type | Description |
|------|------|-------------|
| `--input` | required | Path to JSON file with competitor data (name, tier, dimensions, scores) |
| `--json` | optional | Output in JSON format instead of human-readable text |

### 2. competitor_tracker.py

Tracks competitor movements over time across 8 dimensions (product, pricing, funding, hiring, partnerships, customers, messaging, market share). Detects significant changes and generates alerts.

```bash
python scripts/competitor_tracker.py --input tracking_data.json --json
python scripts/competitor_tracker.py --input tracking_data.json
```

| Flag | Type | Description |
|------|------|-------------|
| `--input` | required | Path to JSON file with competitor tracking entries over time |
| `--json` | optional | Output in JSON format instead of human-readable text |

### 3. swot_analyzer.py

Performs structured SWOT analysis with weighted scoring, cross-impact assessment (SO/WO/ST/WT strategies), and strategic priority recommendations.

```bash
python scripts/swot_analyzer.py --input swot_data.json --json
python scripts/swot_analyzer.py --input swot_data.json
```

| Flag | Type | Description |
|------|------|-------------|
| `--input` | required | Path to JSON file with strengths, weaknesses, opportunities, threats (each with description, impact 1-10, confidence 1-10) |
| `--json` | optional | Output in JSON format instead of human-readable text |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Battlecards outdated within weeks of creation | No triggered update process for competitor moves | Implement event-driven battlecard updates tied to monitoring alerts; assign a battlecard owner per Tier 1 competitor |
| Win/loss interviews not being conducted | AEs reluctant to participate or no clear owner | Assign non-AE interviewers (CS, product, or external); make win/loss a process requirement, not optional |
| Competitive intel stays in Slack, not reaching sales | No single source of truth or distribution cadence | Centralize intel in CRM-attached battlecards; set monthly distribution cadence with CRO ownership |
| Feature gap analysis does not influence roadmap | Product team not consuming competitive data | Include CPO in quarterly landscape review; tie gap analysis to roadmap planning cycle |
| Competitor tier classification never updated | No annual review of competitive landscape | Schedule annual tier reassessment; add/remove competitors based on ICP overlap and funding changes |
| Team over-reacts to every competitor move | No framework for assessing threat significance | Use the Threat Classification Matrix to filter signal from noise; only escalate Tier 1 changes |
| Intelligence collection is inconsistent | No assigned owners or cadence for tracking dimensions | Assign dimension owners from the Intelligence Distribution table; automate monitoring where possible |

---

## Success Criteria

- Battlecards updated within 48 hours of significant Tier 1 competitor moves
- Win rate against top 3 competitors stable or improving quarter-over-quarter
- Win/loss interviews conducted for 90%+ of lost deals above $50K ACV
- Sales team can articulate top 3 differentiators vs each Tier 1 competitor without reference material
- Competitive intelligence influences at least 2 roadmap decisions per quarter
- Time from competitor event to internal awareness is under 72 hours
- Positioning refreshed at least once per year based on landscape analysis

---

## Scope & Limitations

**In scope:** Competitor identification and tier classification, 8-dimension tracking across product/pricing/funding/hiring/partnerships/customers/messaging/market share, SWOT analysis per competitor, feature gap analysis, battlecard creation and distribution, win/loss analysis, competitive positioning maps, board-level competitive summaries, and market landscape mapping via Python tools.

**Out of scope:** Real-time competitor monitoring (tools analyze point-in-time data exports), pricing intelligence from competitor internal data, customer-level deal coaching (tools flag patterns but do not prescribe sales tactics), market research surveys or primary research, and competitor financial modeling beyond publicly available data.

**Limitations:** SWOT and landscape analysis depend on the quality and recency of input data. Competitive intelligence older than 6 months should be treated as directional only. Win/loss analysis requires a minimum of 10 interviews per quarter for statistical significance. Market positioning maps are subjective and should be validated with customer perception data.

---

## Integration Points

- **cro-advisor** -- Battlecards feed directly into sales enablement; win/loss data informs pipeline strategy and quota setting
- **cpo-advisor** -- Feature gap analysis influences product roadmap prioritization and portfolio investment decisions
- **cmo-advisor** -- Competitive positioning informs messaging, content strategy, and campaign differentiation
- **ceo-advisor** -- Board-level competitive summaries inform strategic direction and M&A evaluation
- **board-deck-builder** -- Monthly competitive landscape slides feed into quarterly board presentations
- **sales-success/** -- Battlecards and killer questions enable sales team competitive selling

---

## coo-advisor

Source path: `references/c-level-advisor/coo-advisor/SKILL.md`

# COO Advisor

The agent acts as a fractional COO, providing operational strategy and process design grounded in maturity-model thinking and data-driven optimization.

## Workflow

1. **Assess operational maturity** -- Place the organization on the Operations Maturity Model (Levels 1-4). Validate the assessment by checking for documented processes, KPI dashboards, and automation coverage.
2. **Map critical processes** -- Identify the top 5 processes by volume or business impact. Document each using the Process Documentation Standard.
3. **Identify waste** -- For each mapped process, catalogue waiting time, rework loops, manual steps, and approval bottlenecks. Quantify cycle time and cost per transaction.
4. **Prioritize improvements** -- Plot identified improvements on the Automation Priority Matrix. Select quick wins (high value, low effort) for immediate action.
5. **Design operating rhythm** -- Establish the meeting cadence (daily, weekly, monthly, quarterly) and assign owners. Verify each meeting has a defined purpose and output.
6. **Build capacity model** -- Apply the headcount formula to forecast resource needs. Factor in attrition, ramp time, and seasonal variation.
7. **Establish metrics and reporting** -- Configure the Operational Dashboard and set targets for efficiency, quality, and scalability KPIs.

## Operations Maturity Model

| Level | Name | Characteristics |
|-------|------|-----------------|
| 1 | Ad Hoc | Informal processes, tribal knowledge, reactive problem solving |
| 2 | Defined | Documented processes, basic metrics, some automation |
| 3 | Managed | KPI dashboards, regular reviews, continuous improvement |
| 4 | Optimized | Data-driven decisions, automated workflows, industry-leading efficiency |

## Process Documentation Standard

```markdown
# Process Name

## Purpose
[Why this process exists]

## Owner
[Single accountable person]

## Trigger
[What initiates this process]

## Inputs
[What is needed to start]

## Steps
1. [Step with responsible party]
2. [Step with responsible party]
3. [Step with responsible party]

## Outputs
[What is produced]

## SLAs
[Time and quality expectations]

## Exceptions
[How to handle edge cases]
```

## Operating Rhythm

| Meeting | Frequency | Duration | Attendees | Purpose |
|---------|-----------|----------|-----------|---------|
| Standup | Daily | 15 min | Team | Issue escalation, key metrics |
| Dept Sync | Weekly | 45 min | Dept heads | Cross-functional coordination |
| Leadership Sync | Weekly | 60 min | Execs | Alignment |
| Business Review | Monthly | 90 min | Leadership | Performance deep-dive |
| QBR | Quarterly | Half day | Leadership | Strategy and OKR assessment |

## Headcount Capacity Model

```
Required HC = Volume / (Productivity x Utilization)

Volume:       Work units per period
Productivity: Units per person per period
Utilization:  Available time percentage (typically 75-85%)
```

**Adjustment factors**: Attrition rate (10-20%), ramp time for new hires, seasonal variation, growth assumptions.

## Automation Priority Matrix

```
                    High Value
                        |
    Quick Wins     -----+-----   Strategic Projects
    (Do First)          |        (Plan Carefully)
                        |
    Low Effort ---------+--------- High Effort
                        |
    Fill-ins       -----+-----   Reconsider
    (Do When Available) |        (May Not Be Worth It)
                        |
                    Low Value
```

## Operational KPIs

| Category | Metrics |
|----------|---------|
| Efficiency | Process cycle time, first-time completion rate, cost per transaction, automation rate |
| Quality | Error rate, rework %, customer satisfaction, SLA compliance |
| Scalability | Volume growth handling, cost per unit trend, capacity utilization, bottleneck count |

## Operational Dashboard Structure

```
OPERATIONAL HEALTH
+-- Volume metrics (transactions, requests, tickets)
+-- Quality metrics (errors, rework, satisfaction)
+-- Efficiency metrics (cycle time, cost per unit)
+-- Capacity metrics (utilization, backlog)

TEAM PERFORMANCE
+-- Productivity per person
+-- SLA achievement
+-- Training completion
+-- Engagement score

SYSTEM HEALTH
+-- System uptime
+-- Integration status
+-- Processing latency
+-- Error rates
```

## Incident Classification

| Level | Impact | Response Time | Communication |
|-------|--------|---------------|---------------|
| P1 | Business critical | 15 min | Exec + all stakeholders |
| P2 | Major impact | 1 hour | Leadership + affected teams |
| P3 | Moderate impact | 4 hours | Team leads |
| P4 | Minor impact | 24 hours | Direct reports |

## Vendor Management

**Selection criteria**: Capability fit, financial stability, reference quality, service levels, pricing competitiveness, contract flexibility.

**Review cadence**: Weekly (operational issues), Monthly (performance metrics), Quarterly (business review), Annual (contract renewal).

## BCP Framework

1. **Risk assessment** -- Identify critical processes, assess disruption impact, determine recovery priorities, document dependencies.
2. **Continuity planning** -- Define RTO/RPO, identify alternate resources, document procedures, assign responsibilities.
3. **Testing** -- Annual tabletop exercises, periodic recovery drills, plan updates after changes, post-incident reviews.

## Example: Scaling Customer Onboarding (Series B SaaS)

A Series-B SaaS company onboards 40 new customers/month with a 5-person onboarding team. Current cycle time is 21 days.

```
Current state:
  Volume: 40 customers/month
  Productivity: 8 customers/person/month
  Utilization: 80%
  Required HC: 40 / (8 x 0.80) = 6.25 -> 7 FTEs (gap: 2 hires)

Optimization targets:
  Automate provisioning step (saves 3 days) -> cycle time: 18 days
  Self-serve data migration portal (saves 2 days) -> cycle time: 16 days
  Revised productivity: 10 customers/person/month
  Required HC at 80 customers/month: 80 / (10 x 0.80) = 10 FTEs

Investment: 1 eng sprint for automation + $15K/yr portal tooling
ROI: Handles 2x volume with 43% fewer incremental hires
```

## Budget Variance Analysis

1. Compare actual vs budget by category (personnel, technology, facilities, services, travel)
2. Identify root causes for variances exceeding 10%
3. Adjust rolling forecast
4. Document corrective actions with owners and deadlines

## Scripts

```bash
# Process efficiency analyzer
python scripts/process_analyzer.py --process onboarding

# Capacity planning calculator
python scripts/capacity_planner.py --forecast demand.csv

# Vendor scorecard generator
python scripts/vendor_scorecard.py --vendors vendors.yaml

# Operational dashboard builder
python scripts/ops_dashboard.py --metrics metrics.json
```

## References

- `references/process_templates.md` -- Standard process documentation
- `references/scaling_playbook.md` -- Scaling operations guide
- `references/vendor_management.md` -- Vendor relationship framework
- `references/bcp_template.md` -- Business continuity planning

---

## Tool Reference

### 1. operational_kpi_tracker.py

Tracks operational KPIs across efficiency, quality, and scalability categories. Calculates health scores, detects trends, flags at-risk metrics, and generates improvement recommendations.

```bash
python scripts/operational_kpi_tracker.py --input kpi_data.json --json
python scripts/operational_kpi_tracker.py --input kpi_data.json
```

| Flag | Type | Description |
|------|------|-------------|
| `--input` | required | Path to JSON file with KPI categories, metrics, targets, and actuals over time |
| `--json` | optional | Output in JSON format instead of human-readable text |

### 2. process_efficiency_scorer.py

Scores process efficiency across cycle time, first-time completion rate, cost per transaction, automation rate, error rate, and rework percentage. Identifies bottlenecks and prioritizes improvement opportunities.

```bash
python scripts/process_efficiency_scorer.py --input processes.json --json
python scripts/process_efficiency_scorer.py --input processes.json
```

| Flag | Type | Description |
|------|------|-------------|
| `--input` | required | Path to JSON file with process definitions, step-level metrics, and benchmarks |
| `--json` | optional | Output in JSON format instead of human-readable text |

### 3. capacity_modeler.py

Models headcount capacity requirements using the formula: Required HC = Volume / (Productivity x Utilization). Factors in attrition, ramp time, seasonal variation, and growth projections.

```bash
python scripts/capacity_modeler.py --input capacity_data.json --json
python scripts/capacity_modeler.py --input capacity_data.json
```

| Flag | Type | Description |
|------|------|-------------|
| `--input` | required | Path to JSON file with volume forecasts, productivity rates, utilization targets, and adjustment factors |
| `--json` | optional | Output in JSON format instead of human-readable text |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| KPI dashboard shows green but operations feel broken | Metrics not measuring what matters or targets set too loosely | Audit KPIs against actual customer/team complaints; tighten targets to match industry benchmarks |
| Process documentation exists but nobody follows it | Documentation created top-down without practitioner input | Rebuild SOPs with process owners; validate with frontline team; schedule quarterly reviews |
| Automation projects stall after initial wins | Quick wins captured but strategic projects lack sustained investment | Use Automation Priority Matrix; assign dedicated owners to strategic projects; protect automation budget |
| Capacity model consistently under-predicts needs | Ramp time, attrition, or seasonal variation not factored | Add adjustment factors for attrition (10-20%), ramp time (3-6 months), and seasonal peaks |
| Operating rhythm meetings feel unproductive | Meetings lack defined purpose, output, or decision rights | Redesign each meeting using the Operating Rhythm table; require agenda, output artifact, and decision owner |
| Vendor performance degrading without consequence | No SLA monitoring or regular performance reviews | Implement quarterly vendor scorecards; tie contract renewal to SLA compliance |

---

## Success Criteria

- Operations Maturity Model level increases by at least 1 level within 12 months
- Top 5 processes documented with owners, SLAs, and exception handling
- Process cycle time reduced by 20%+ for at least 2 critical processes
- Automation rate exceeds 40% for high-volume, low-complexity processes
- Headcount capacity model accuracy within 10% of actual needs
- Incident response meets SLA targets for P1 (15 min) and P2 (1 hour) consistently
- Budget variance stays within 10% for all operational categories

---

## Scope & Limitations

**In scope:** Operations maturity assessment, process documentation and optimization, headcount capacity modeling, operational KPI tracking and dashboarding, automation prioritization, vendor management frameworks, incident classification and response, business continuity planning, budget variance analysis, and operating rhythm design.

**Out of scope:** IT infrastructure management (use engineering/ skills), HR policy design (use hr-operations/ skills), financial planning and FP&A (use finance/ skills), product operations (use cpo-advisor), and real-time monitoring system implementation. Tools analyze operational data snapshots; continuous monitoring requires integration with operational platforms.

**Limitations:** Capacity modeling assumes stable productivity rates; significant process changes invalidate projections. KPI benchmarks are based on aggregate industry data and vary by company size, vertical, and operating model. Process efficiency scoring requires accurate step-level timing data that may not be available without process mining tools.

---

## Integration Points

- **ceo-advisor** -- Operational health metrics feed into strategic decision-making and board reporting
- **cfo-advisor** -- Budget variance analysis and capacity costs inform financial planning
- **cro-advisor** -- RevOps staffing and commission infrastructure depend on operational capacity
- **cpo-advisor** -- Product operations and delivery capacity affect roadmap execution
- **chro-advisor** -- Headcount planning and team scaling require HR partnership
- **ciso-advisor** -- BCP and incident response intersect with security operations

---

## cpo-advisor

Source path: `references/c-level-advisor/cpo-advisor/SKILL.md`

# CPO Advisor

Strategic product leadership. Vision, portfolio, PMF, org design, and metrics. Not for feature-level work -- for the decisions that determine what gets built, why, and by whom.

## Keywords

CPO, chief product officer, product strategy, product vision, product-market fit, PMF, portfolio management, product org, roadmap strategy, product metrics, north star metric, retention curve, product trio, team topologies, jobs to be done, JTBD, category design, product positioning, board product reporting, invest-maintain-kill, BCG matrix, switching costs, network effects, product-led growth, PLG, feature adoption, time to value, activation rate

---

## The CPO Owns Three Things

Everything else is delegation.

| Ownership | What It Means | Key Question |
|-----------|--------------|--------------|
| Portfolio | Which products exist, which get investment, which get killed | "If we could only fund 2 of our 4 products, which 2?" |
| Vision | Where the product goes in 3-5 years and why customers care | "What does the world look like if we succeed?" |
| Organization | The team structure that can execute the vision | "Can this org ship the next 12 months of strategy?" |

---

## Product-Market Fit Assessment

### PMF Scoring Matrix

| Dimension | Weight | Score 1-3 (Weak) | Score 4-6 (Emerging) | Score 7-10 (Strong) |
|-----------|--------|-----------------|---------------------|---------------------|
| Retention | 30% | D30 < 15% (consumer) or < 40% (B2B) | D30 15-30% / 40-60% | D30 > 30% / > 60% |
| Engagement | 25% | DAU/MAU < 15% | DAU/MAU 15-35% | DAU/MAU > 35% |
| Satisfaction | 25% | Sean Ellis < 25% "very disappointed" | 25-40% | > 40% |
| Growth | 20% | No organic growth | Some organic, mostly paid | > 50% organic |

### PMF Decision Tree

```
START: "Do we have PMF?"
  |
  v
[Check retention curve shape]
  |
  +-- Declining to zero --> NO PMF. Stop building. Talk to users.
  |
  +-- Declining but flattening --> EMERGING. Find the segment where it's flat.
  |
  +-- Flat or smiling --> [Check Sean Ellis score]
                          |
                          +-- < 25% "very disappointed" --> Weak PMF. Product is nice, not essential.
                          |
                          +-- 25-40% --> Moderate PMF. Find and double down on power users.
                          |
                          +-- > 40% --> [Check organic growth]
                                        |
                                        +-- < 30% organic --> PMF exists but distribution is weak.
                                        +-- > 30% organic --> STRONG PMF. Scale.
```

### Post-PMF Traps

| Trap | Description | Prevention |
|------|-------------|------------|
| Feature creep | Adding features for new segments dilutes core value | Maintain a "jobs" focus, not feature focus |
| Premature scaling | Scaling sales/marketing before retention proves sustainable | Prove 3+ cohorts retain before scaling spend |
| Metric vanity | Celebrating signups while ignoring retention | North star must be a retention/engagement metric |
| Founder departure from product | CEO stops talking to customers post-PMF | Monthly customer conversations are permanent |
| Platform too early | Building platform capabilities before core is solid | Platform only after 3+ products need shared infra |

---

## Portfolio Management

### Investment Posture Framework

Every product gets exactly one posture. "Wait and see" is a decision to lose share.

| Posture | Signal | Resource Allocation | Review Cadence |
|---------|--------|-------------------|----------------|
| **Invest** | High growth, strong/improving retention, clear PMF | Full team, aggressive roadmap, dedicated marketing | Monthly |
| **Maintain** | Stable revenue, slow growth, good margins | Bug fixes, incremental improvement, minimal new features | Quarterly |
| **Harvest** | Declining growth, still profitable, no recovery path | Minimal investment, maximize cash extraction | Quarterly |
| **Kill** | Declining, negative margins, no recovery evidence | Set sunset date, migration plan, team reallocation | Immediate |

### Portfolio Health Scorecard

| Metric | Healthy | Unhealthy |
|--------|---------|-----------|
| % revenue from "Invest" products | > 60% | < 40% |
| % engineering on "Kill" candidates | < 10% | > 20% |
| Number of products without clear posture | 0 | > 1 |
| Portfolio D30 retention (weighted) | Improving QoQ | Declining QoQ |
| # of "question marks" > 2 quarters | 0 | > 2 |

### Portfolio Review Process

```
Quarterly Portfolio Review (Half-day workshop)

Step 1: Data Preparation (pre-meeting)
  - Revenue, growth rate, retention, margin per product
  - Engineering investment % per product
  - Customer satisfaction per product

Step 2: BCG Classification
  - Plot each product on Growth Rate (Y) vs Market Share (X)
  - Stars: high growth, high share --> Invest
  - Cash Cows: low growth, high share --> Maintain/Harvest
  - Question Marks: high growth, low share --> Invest or Kill (decide now)
  - Dogs: low growth, low share --> Kill

Step 3: Investment Allocation
  - Align engineering capacity to posture
  - Reallocate from Kill/Harvest to Invest
  - Set clear milestones for Question Marks (90-day decision point)

Step 4: Communication
  - Share portfolio decisions with all product teams
  - Update roadmaps to reflect postures
  - Communicate sunset plans for Kill products
```

---

## North Star Metric Framework

### Selection Criteria

The north star metric must satisfy ALL of these:

| Criterion | Test |
|-----------|------|
| Measures customer value | Does improvement mean customers got more value? |
| Leading indicator | Does it predict future revenue? |
| Actionable | Can product teams influence it? |
| Single number | Can you state it as one metric? |
| Non-gameable | Is it hard to improve without genuinely helping customers? |

### North Star by Business Model

| Model | North Star | Why It Works |
|-------|-----------|-------------|
| B2B SaaS | Weekly active accounts using core feature | Combines adoption + engagement + stickiness |
| Consumer social | Daily content creators | Creators drive consumer engagement |
| Marketplace | Successful transactions per week | Both sides active = healthy marketplace |
| PLG | Accounts reaching activation within 14 days | Activation predicts retention |
| Data/Analytics | Queries per active user per week | Usage intensity = value received |
| Fintech | Monthly active transactors | Transaction activity = core value |
| E-commerce | Repeat purchase rate (90-day) | Retention is everything in commerce |

### Metrics Hierarchy

```
North Star Metric (1, owned by CPO)
  |
  +-- Leading Indicator 1 (owned by PM Team A)
  |     e.g., Activation rate within 7 days
  |
  +-- Leading Indicator 2 (owned by PM Team B)
  |     e.g., Feature X adoption rate
  |
  +-- Leading Indicator 3 (owned by PM Team C)
  |     e.g., D7 retention rate
  |
  +-- Guard Rail Metrics (owned by CPO)
        e.g., NPS, support ticket volume, revenue per user
```

---

## Product Organization Design

### Team Topology Selection

| Topology | When to Use | Optimal Size | Communication |
|----------|------------|-------------|---------------|
| Stream-aligned | Default. Teams own end-to-end customer journey. | 5-9 people | Low cross-team dependency |
| Platform | Shared infrastructure multiple streams need | 4-8 people | API-first, self-service |
| Enabling | Temporary teams to upskill stream teams | 2-4 people | Coaching mode, time-limited |
| Complicated subsystem | Deep specialist domain (ML, payments) | 3-6 people | Provides service to streams |

### Product Team Ratios

| Company Size | PM : Engineers | PM : Designer | Total Product Team |
|-------------|---------------|---------------|-------------------|
| 10-30 | 1:4-6 | 1:1 | 1 PM, 1 Designer, 4-6 Eng |
| 30-80 | 1:5-8 | 1:1-2 | 2-4 PMs, 2-3 Designers |
| 80-200 | 1:6-10 | 1:1-2 | 5-10 PMs, 4-6 Designers |
| 200+ | 1:8-12 | 1:2 | 10+ PMs, 8+ Designers |

### The Product Trio

Every product team should operate as a trio: PM + Designer + Tech Lead.

| Role | Owns | Decides |
|------|------|---------|
| PM | What to build and why | Prioritization, scope |
| Designer | User experience and usability | Interaction patterns, research |
| Tech Lead | How to build and technical feasibility | Architecture, implementation |

**Anti-pattern**: PM writes spec, hands to design, design hands to engineering. This is waterfall with agile labels.

---

## CPO Dashboard

| Category | Metric | Frequency | Target |
|----------|--------|-----------|--------|
| Growth | North star metric | Weekly | Improving MoM |
| Retention | D30 / D90 retention by cohort | Weekly | Flattening or improving |
| Acquisition | New activations | Weekly | Per plan |
| Activation | Time to first value | Weekly | Decreasing |
| Engagement | DAU/MAU ratio | Weekly | > 30% (B2B) / > 20% (consumer) |
| Satisfaction | NPS trend | Monthly | > 40 |
| Portfolio | Revenue per product | Monthly | Aligned to posture |
| Portfolio | Engineering investment % per product | Monthly | Aligned to posture |
| Quality | Support tickets per 1K users | Monthly | Decreasing |
| Moat | Feature adoption depth | Monthly | Increasing |

---

## Red Flags

- Products stuck as "question marks" for 2+ quarters without a decision -- make the call
- Engineering allocated to highest-revenue product while highest-growth product is understaffed -- misallocation
- > 30% of team time on products with declining revenue -- sunk cost fallacy
- Retention curve never flattens -- no PMF, stop building features and start talking to users
- PMs writing specs without talking to users -- product theater
- Platform team has 6-week queue -- platform should be self-service, not a bottleneck
- CPO has not talked to a customer in 30+ days -- disconnected from reality
- North star trending up while retention trends down -- wrong metric
- Roadmap built from sales requests instead of user data -- sales-driven product is a trap
- No user research conducted in 90+ days -- team is guessing, not learning

---

## Integration with C-Suite

| When... | CPO Works With... | To... |
|---------|-------------------|-------|
| Company direction | CEO (`ceo-advisor`) | Translate vision into product bets |
| Roadmap funding | CFO (`cfo-advisor`) | Justify investment allocation per product |
| Scaling product org | COO + CHRO | Align hiring with product growth needs |
| Technical feasibility | CTO (`cto-advisor`) | Co-own features vs. platform trade-off |
| Launch timing | CMO (`cmo-advisor`) | Align releases with demand gen capacity |
| Sales-requested features | CRO (`cro-advisor`) | Separate revenue-critical from noise |
| Compliance deadlines | CISO (`ciso-advisor`) | Identify non-negotiable security items |
| Product strategy | Product Team (`product-team/`) | Execute strategy through product managers |
| User research | UX Research (`product-team/ux-researcher`) | Validate assumptions with data |

---

## Proactive Triggers

- Retention curve not flattening -- PMF at risk, stop feature work and investigate
- Feature requests piling up without prioritization framework -- propose RICE scoring
- No user research in 90+ days -- product team is building on assumptions
- NPS declining QoQ -- dig into detractor feedback, find the pattern
- Portfolio has a "dog" everyone avoids discussing -- force the kill/invest decision
- Engineering spending > 20% on a product with < 5% of revenue -- investment misalignment
- New competitor launched with similar positioning -- competitive response needed

---

## Output Artifacts

| Request | Deliverable |
|---------|-------------|
| "Do we have PMF?" | PMF scorecard across 4 dimensions with cohort data |
| "Prioritize our roadmap" | Scored backlog with framework (RICE/ICE), stack-ranked |
| "Evaluate our portfolio" | BCG map with invest/maintain/kill recommendations per product |
| "Design our product org" | Org proposal with topology, ratios, reporting, and transition plan |
| "Product board section" | Board slide: north star, retention, roadmap highlights, risks |
| "Set our north star" | North star proposal with hierarchy, leading indicators, and guard rails |
| "Kill a product" | Sunset plan: timeline, migration, communication, team reallocation |

---

## Tool Reference

### 1. product_portfolio_analyzer.py

Analyzes a product portfolio using BCG matrix classification (Star/Cash Cow/Question Mark/Dog), calculates portfolio health scores, identifies investment misalignment, and generates rebalancing recommendations.

```bash
python scripts/product_portfolio_analyzer.py --input portfolio.json --json
python scripts/product_portfolio_analyzer.py --input portfolio.json
```

| Flag | Type | Description |
|------|------|-------------|
| `--input` | required | Path to JSON file with products (revenue, growth rate, market share, engineering investment %, retention) |
| `--json` | optional | Output in JSON format instead of human-readable text |

### 2. feature_prioritizer.py

Prioritizes features using RICE scoring (Reach x Impact x Confidence / Effort). Supports custom weights, generates stack-ranked backlogs, and flags scoring anomalies.

```bash
python scripts/feature_prioritizer.py --input features.json --json
python scripts/feature_prioritizer.py --input features.json --method rice
```

| Flag | Type | Description |
|------|------|-------------|
| `--input` | required | Path to JSON file with features (reach, impact, confidence, effort, optional category) |
| `--method` | optional | Scoring method: `rice` (default), `ice`, or `weighted` |
| `--json` | optional | Output in JSON format instead of human-readable text |

### 3. product_health_scorer.py

Scores product health across 5 dimensions: retention (D30/D90), engagement (DAU/MAU), satisfaction (NPS/Sean Ellis), growth (organic %), and activation (time to value). Generates PMF assessment and trend analysis.

```bash
python scripts/product_health_scorer.py --input product_data.json --json
python scripts/product_health_scorer.py --input product_data.json
```

| Flag | Type | Description |
|------|------|-------------|
| `--input` | required | Path to JSON file with product metrics across retention, engagement, satisfaction, growth, and activation |
| `--json` | optional | Output in JSON format instead of human-readable text |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Products stuck as "question marks" for 2+ quarters | No decision framework or leadership avoidance | Force invest-or-kill decision at next portfolio review; set 90-day milestones with automatic kill trigger |
| Engineering allocated to highest-revenue product while highest-growth product starves | Investment posture not aligned to growth potential | Run portfolio analyzer to quantify misalignment; reallocate using BCG classification |
| RICE scores gamed by PMs inflating reach or impact | No calibration process or shared scoring standards | Require evidence for each score dimension; run quarterly calibration sessions across PM teams |
| North star metric trending up while retention trends down | Wrong north star metric selected or metric is gameable | Re-evaluate north star against the 5 selection criteria; add retention as a guard rail metric |
| Roadmap built from sales requests instead of user data | No structured intake process or CPO not filtering | Implement feature request triage; require user research evidence before roadmap inclusion |
| Platform team has 6-week queue blocking stream teams | Platform not self-service; too many dependencies | Redesign platform for self-service APIs; add enabling team to unblock highest-priority streams |
| No user research conducted in 90+ days | Research not embedded in team workflow or understaffed | Embed researcher in product trio; set minimum research cadence (2 studies per quarter minimum) |

---

## Success Criteria

- Every product has a clear investment posture (Invest/Maintain/Harvest/Kill) reviewed quarterly
- North star metric improving month-over-month for "Invest" products
- D30 retention flattening or improving for all active products
- Engineering investment percentage aligned to portfolio posture within 10% tolerance
- Feature prioritization uses a consistent scoring framework across all PM teams
- Time to first value decreasing quarter-over-quarter
- No product classified as "question mark" for more than 2 consecutive quarters

---

## Scope & Limitations

**In scope:** Product-market fit assessment, portfolio management (BCG classification, investment postures), north star metric framework, product organization design (team topologies, ratios, product trio), feature prioritization (RICE/ICE scoring), product health scoring, CPO dashboard metrics, and board-level product reporting.

**Out of scope:** Feature-level product management (use product-team/product-strategist), UX design and research execution (use product-team/ux-researcher), engineering implementation planning (use engineering/ skills), pricing strategy (use cro-advisor pricing section), and customer success management. Tools analyze product metrics snapshots; continuous product analytics requires integration with analytics platforms.

**Limitations:** PMF scoring depends on cohort-level retention data that early-stage products may not have. BCG classification requires market share estimates that are inherently imprecise. RICE scoring is subjective; quality depends on calibration rigor. Product health benchmarks vary significantly by business model (B2B vs consumer, SaaS vs marketplace).

---

## Integration Points

- **ceo-advisor** -- Product strategy translates CEO vision into product bets; portfolio health feeds board reporting
- **cto-advisor** -- Technical feasibility co-owned; features vs platform trade-off decisions require CTO partnership
- **cro-advisor** -- Sales-requested features filtered through CPO; expansion revenue depends on product roadmap
- **cmo-advisor** -- Launch timing aligned with demand gen capacity; product positioning informs marketing
- **cfo-advisor** -- Investment allocation per product justified with portfolio health data
- **product-team/** -- CPO strategy executed through product managers; research and prioritization cascade down

---

## cro-advisor

Source path: `references/c-level-advisor/cro-advisor/SKILL.md`

# CRO Advisor

Revenue frameworks for building predictable, scalable revenue engines -- from first revenue to $100M ARR and beyond. Every recommendation is grounded in pipeline math, not hope.

## Keywords

CRO, chief revenue officer, revenue strategy, ARR, MRR, sales model, pipeline, revenue forecasting, pricing strategy, net revenue retention, NRR, gross revenue retention, GRR, expansion revenue, upsell, cross-sell, churn, customer success, sales capacity, quota, ramp, territory design, MEDDPICC, PLG, product-led growth, sales-led growth, enterprise sales, SMB, self-serve, value-based pricing, usage-based pricing, ICP, ideal customer profile, revenue board reporting, sales cycle, CAC payback, magic number, win rate, pipeline coverage, deal velocity

---

## Revenue Health Diagnostic

Before applying any framework, diagnose the current state.

### Revenue Health Decision Tree

```
START: "How healthy is our revenue engine?"
  |
  v
[Check NRR]
  |
  +-- NRR < 90% --> CRISIS. Existing customers are shrinking.
  |                  Stop scaling sales. Fix retention first.
  |
  +-- NRR 90-100% --> WARNING. Churn eating expansion.
  |                    Diagnose: product gap, CS gap, or ICP problem?
  |
  +-- NRR 100-110% --> HEALTHY. Base is stable. Focus on new logo + expansion.
  |
  +-- NRR > 110% --> STRONG. Expansion engine is working.
                      Check: is it sustainable or driven by price increases?
```

### Revenue Waterfall

```
Opening ARR
  + New Logo ARR       (new customers closed this period)
  + Expansion ARR      (upsell, cross-sell, seat adds)
  - Contraction ARR    (downgrades, reduced usage)
  - Churned ARR        (lost customers)
= Closing ARR

NRR = (Opening + Expansion - Contraction - Churn) / Opening x 100
GRR = (Opening - Contraction - Churn) / Opening x 100
```

---

## Revenue Metrics

### Board-Level Metrics (Monthly/Quarterly)

| Metric | Formula | Target | Red Flag |
|--------|---------|--------|----------|
| ARR Growth YoY | (Current ARR / Prior Year ARR) - 1 | 2x+ early stage, 50%+ growth | Decelerating 2+ quarters |
| NRR | See waterfall above | > 110% | < 100% |
| GRR | See waterfall above | > 85% | < 80% |
| Pipeline Coverage | Open pipeline / Quota | > 3x | < 2x entering quarter |
| Magic Number | Net New ARR x 4 / Prior Q S&M Spend | > 0.75 | < 0.5 |
| CAC Payback | S&M Spend / New ARR x (1/GM%) | < 18 months | > 24 months |
| Quota Attainment | % of reps hitting quota | 60-70% | < 50% |
| Win Rate | Closed-won / (Closed-won + Closed-lost) | > 25% | < 15% |
| Average Sales Cycle | Days from opportunity to close | Stable or decreasing | Increasing 2+ quarters |

### NRR Benchmarks

| NRR Range | Signal | Strategic Implication |
|-----------|--------|----------------------|
| > 130% | World-class (Snowflake, Twilio) | Can grow even with zero new logos |
| 110-130% | Excellent | Strong expansion motion, invest in new logo |
| 100-110% | Healthy | Expansion offsets churn, monitor trends |
| 90-100% | Concerning | Churn exceeds expansion, fix before scaling |
| < 90% | Critical | Leaky bucket, all new revenue evaporates |

---

## Sales Model Selection

### Model Comparison Matrix

| Model | ACV Range | Sales Cycle | Team | Best For |
|-------|-----------|-------------|------|----------|
| Self-serve / PLG | $0-$10K | Minutes-days | No sales team | High volume, simple product |
| SMB inside sales | $5K-$50K | 2-6 weeks | SDR + AE | Mid-volume, moderate complexity |
| Mid-market | $25K-$150K | 4-12 weeks | SDR + AE + SE | Complex product, multiple stakeholders |
| Enterprise | $100K-$1M+ | 3-12 months | AE + SE + CSM + exec sponsor | Large organizations, high touch |
| Channel/Partner | Varies | Varies | Partner manager + enablement | Market coverage, geographic reach |

### Model Selection Decision Tree

```
START: "Which sales model?"
  |
  v
[What's the average deal size?]
  |
  +-- < $5K ACV --> Self-serve / PLG
  |                  (add sales assist at $2-5K for upsell)
  |
  +-- $5K-$50K --> Inside sales (SMB)
  |                (SDRs + AEs, high velocity)
  |
  +-- $50K-$200K --> Mid-market
  |                  (SDR + AE + SE, consultative)
  |
  +-- > $200K --> Enterprise
                  (Named accounts, multi-threaded, executive selling)

HYBRID: Most companies evolve to serve 2-3 segments.
Route by ACV and buying complexity.
```

---

## Pipeline Management

### Pipeline Stage Definitions

| Stage | Definition | Exit Criteria | Typical Conversion |
|-------|-----------|---------------|-------------------|
| 0: Lead | Inbound inquiry or outbound target | Qualified as ICP fit | 20-30% to Stage 1 |
| 1: Discovery | First meeting completed | Pain confirmed, authority identified | 50-60% to Stage 2 |
| 2: Evaluation | Active evaluation, demo/POC | Champion identified, timeline set | 40-50% to Stage 3 |
| 3: Proposal | Proposal/pricing delivered | Budget confirmed, decision criteria clear | 50-60% to Stage 4 |
| 4: Negotiation | Terms being negotiated | Legal/procurement engaged | 70-80% to Close |
| 5: Closed-Won | Contract signed | Revenue recognized | -- |
| X: Closed-Lost | Deal lost | Loss reason documented | -- |

### Pipeline Coverage Model

| Quarter Position | Required Pipeline Coverage | Action If Below |
|-----------------|--------------------------|-----------------|
| Q-1 (planning) | 4x quota | Increase top-of-funnel activity |
| Q start | 3x quota | Accelerate existing deals, add pipeline |
| Mid-quarter | 2x quota | Deal acceleration, executive engagement |
| Q-end | 1.5x quota | Forecast adjustment, pull-in deals |

### Deal Qualification: MEDDPICC

| Element | Question | Red Flag |
|---------|----------|----------|
| **M**etrics | What business outcome does the buyer measure? | No quantified value proposition |
| **E**conomic Buyer | Who signs the check? Have we met them? | Never met the decision-maker |
| **D**ecision Criteria | What criteria will they use to decide? | "We'll know it when we see it" |
| **D**ecision Process | What are the steps to get to a yes? | No defined process or timeline |
| **P**aper Process | What legal/procurement steps are required? | Unknown procurement process |
| **I**dentify Pain | What problem are they solving? Is it urgent? | Pain is theoretical, not acute |
| **C**hampion | Who internally advocates for us? | No internal champion identified |
| **C**ompetition | Who else are they evaluating? | "They said no competition" (always wrong) |

---

## Pricing Strategy

### Pricing Model Selection

| Model | Best When | Watch Out For |
|-------|-----------|--------------|
| Per-seat | Value scales with users | Seat consolidation games |
| Usage-based | Value directly tied to consumption | Revenue unpredictability |
| Tiered | Clear feature differentiation between segments | Tier boundaries feel arbitrary |
| Flat-rate | Simple product, uniform usage | Leaves money on table for heavy users |
| Value-based | Clear ROI measurement possible | Requires trust and proof |
| Hybrid | Complex product with multiple value dimensions | Complexity in quoting |

### Pricing Decision Framework

```
START: "How should we price?"
  |
  v
[What is the primary value driver for the customer?]
  |
  +-- Number of users --> Per-seat pricing
  |
  +-- Volume of usage --> Usage-based pricing
  |
  +-- Feature needs differ by segment --> Tiered pricing
  |
  +-- Clear ROI (saves $X) --> Value-based (price at 10-20% of value)
  |
  +-- Multiple value drivers --> Hybrid (base + usage/seats)
```

### Pricing Health Indicators

| Signal | Healthy | Unhealthy |
|--------|---------|-----------|
| Price objection rate | < 20% of proposals | > 40% = value communication broken |
| Discount rate (avg) | < 15% off list | > 25% = pricing not anchored to value |
| Time since last increase | < 12 months | > 24 months = inflation eating margin |
| Price increase churn | < 2% incremental churn | > 5% = increase was too aggressive |
| Win rate after increase | Stable or improved | Dropped > 10 points = over-corrected |

---

## Sales Team Scaling

### Capacity Model

```
Required AEs = Target New ARR / (Quota x Attainment Rate x Ramp Factor)

Example:
  Target: $5M new ARR
  Quota per AE: $1M
  Attainment: 65%
  Ramp factor: 0.85 (accounts for ramp time)

  Required AEs = $5M / ($1M x 0.65 x 0.85) = 9.1 --> Hire 10 AEs
```

### Sales Team Structure by ARR

| ARR | Team Structure | Key Hires |
|-----|---------------|-----------|
| $0-$1M | Founder-led sales | No sales team yet |
| $1-$3M | 1-2 AEs | First AE, maybe first SDR |
| $3-$10M | 3-6 AEs, 2-4 SDRs, 1 sales manager | First sales manager, first SE |
| $10-$25M | VP Sales, 2 teams, SDR team, SE team | VP Sales, Rev Ops, CS Manager |
| $25-$50M | CRO, multiple segments, CS org | CRO, segment leaders, enablement |
| $50M+ | Full revenue org | SVPs, regional leaders, strategy |

### Quota Setting Guidelines

| Metric | Guideline |
|--------|-----------|
| Quota : OTE ratio | 4-6x (e.g., $800K quota for $160K OTE) |
| Ramp period | 3-6 months depending on sales cycle |
| Ramp quota | 25% (M1-2), 50% (M3-4), 75% (M5-6), 100% (M7+) |
| Quota coverage target | Hire for 120-130% of plan (accounts for attrition + ramp) |
| % of team hitting quota | Target 60-70%. < 50% = quota too high. > 80% = too low. |

---

## Red Flags

- NRR declining 2 quarters in a row -- customer value proposition is broken
- Pipeline coverage < 3x entering quarter -- forecasting a miss
- Win rate dropping while sales cycle extends -- competitive pressure or ICP drift
- < 50% of AEs quota-attaining -- comp plan, ramp, or quota calibration issue
- Average deal size declining -- moving downmarket under pressure
- Magic Number < 0.5 -- sales spend not converting to revenue
- Forecast accuracy < 80% -- pipeline quality or rep sandbagging
- Single customer > 15% of ARR -- concentration risk
- "Too expensive" in > 40% of loss notes -- value demonstration broken, not price
- Expansion ARR < 20% of total new ARR -- upsell motion missing
- No win/loss analysis process -- learning nothing from every deal outcome
- Sales and CS not aligned on health scoring -- churn surprises

---

## Integration with C-Suite

| When... | CRO Works With... | To... |
|---------|-------------------|-------|
| Pricing changes | CPO + CFO | Align value positioning, model margin impact |
| Product roadmap | CPO (`cpo-advisor`) | Ensure features support ICP and close pipeline |
| Headcount plan | CFO + CHRO | Capacity model with ROI justification |
| NRR declining | CPO + COO | Root cause: product gap or CS process failure |
| Enterprise expansion | CEO (`ceo-advisor`) | Executive sponsorship for key accounts |
| Revenue targets | CFO (`cfo-advisor`) | Bottom-up model to validate top-down targets |
| Pipeline SLA | CMO (`cmo-advisor`) | MQL-to-SQL conversion, CAC by channel |
| Security reviews | CISO (`ciso-advisor`) | Unblock enterprise deals with security artifacts |
| Sales ops | COO (`coo-advisor`) | RevOps staffing, commission infrastructure |
| Sales hiring | CHRO (`chro-advisor`) | Comp plans, ramp modeling, territory design |
| Competitive wins/losses | Competitive Intel (`competitive-intel`) | Battlecard updates, positioning |

---

## Proactive Triggers

- NRR < 100% -- retention must be fixed before scaling acquisition
- Pipeline coverage < 3x -- forecast at risk, flag to CEO immediately
- Win rate declining 2+ quarters -- sales process or product alignment issue
- Top customer > 20% of ARR -- concentration risk, diversify immediately
- No pricing review in 12+ months -- likely leaving revenue on the table
- Expansion revenue < 15% of new ARR -- missing upsell/cross-sell opportunity
- Sales cycle lengthening -- competitive or product issue, investigate
- > 30% discount rate on deals -- pricing or value communication problem

---

## Output Artifacts

| Request | Deliverable |
|---------|-------------|
| "Forecast next quarter" | Pipeline-based forecast with confidence intervals and scenarios |
| "Analyze our churn" | Cohort analysis with at-risk accounts and intervention plan |
| "Review our pricing" | Pricing analysis with benchmarks, value framework, recommendations |
| "Scale the sales team" | Capacity model with quota, ramp, territories, comp plan |
| "Revenue board section" | ARR waterfall, NRR, pipeline coverage, forecast, risks |
| "Design sales process" | Stage definitions, qualification criteria, deal review cadence |
| "Win/loss analysis" | Aggregate findings by competitor, segment, and reason |

---

## Tool Reference

### 1. revenue_waterfall_analyzer.py

Analyzes ARR waterfall (new logo, expansion, contraction, churn) to calculate NRR, GRR, and net new ARR. Detects trends, flags retention risks, and benchmarks against SaaS industry standards.

```bash
python scripts/revenue_waterfall_analyzer.py --input revenue_data.json --json
python scripts/revenue_waterfall_analyzer.py --input revenue_data.json
```

| Flag | Type | Description |
|------|------|-------------|
| `--input` | required | Path to JSON file with period-level ARR components (opening, new, expansion, contraction, churn) |
| `--json` | optional | Output in JSON format instead of human-readable text |

### 2. pipeline_coverage_calculator.py

Calculates pipeline coverage ratios by quarter position, analyzes stage distribution health, detects deal aging risks, and generates pipeline adequacy assessments with action recommendations.

```bash
python scripts/pipeline_coverage_calculator.py --input pipeline_data.json --json
python scripts/pipeline_coverage_calculator.py --input pipeline_data.json
```

| Flag | Type | Description |
|------|------|-------------|
| `--input` | required | Path to JSON file with deals (stage, value, age, close date), quota, and quarter dates |
| `--json` | optional | Output in JSON format instead of human-readable text |

### 3. sales_efficiency_scorer.py

Scores sales efficiency using Magic Number, CAC Payback, quota attainment distribution, win rate, and sales cycle metrics. Benchmarks against SaaS standards and generates improvement recommendations.

```bash
python scripts/sales_efficiency_scorer.py --input sales_data.json --json
python scripts/sales_efficiency_scorer.py --input sales_data.json
```

| Flag | Type | Description |
|------|------|-------------|
| `--input` | required | Path to JSON file with revenue, S&M spend, rep-level quota attainment, win/loss counts, and cycle times |
| `--json` | optional | Output in JSON format instead of human-readable text |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| NRR declining 2+ quarters | Product-market fit erosion, CS gap, or ICP drift | Segment NRR by cohort and plan tier; diagnose whether churn is product, service, or fit-driven |
| Pipeline coverage below 3x entering quarter | Insufficient top-of-funnel or poor lead-to-opp conversion | Audit lead sources by conversion rate; increase SDR activity; align with CMO on MQL volume |
| Win rate dropping while sales cycle extends | Competitive pressure, product gap, or wrong ICP | Analyze win/loss by competitor and segment; review qualification criteria; check ICP alignment |
| Less than 50% of AEs quota-attaining | Quota calibration, ramp, or enablement issue | Benchmark quota:OTE ratio (4-6x); review ramp schedule; assess territory balance |
| Magic Number below 0.5 | S&M spend not converting to revenue efficiently | Review channel ROI; reduce spend on low-performing channels; improve rep productivity before adding headcount |
| Forecast accuracy below 80% | Pipeline quality issues, sandbagging, or weak inspection | Standardize stage exit criteria; implement MEDDPICC qualification; conduct weekly deal reviews |
| Expansion ARR less than 20% of total new ARR | Missing upsell/cross-sell motion or no expansion playbook | Design expansion triggers with CS; implement usage-based upsell alerts; create cross-sell bundles |

---

## Success Criteria

- NRR exceeds 110% sustained across 4 consecutive quarters
- Pipeline coverage maintains 3-4x quota with healthy stage distribution at quarter start
- Win rate stable or improving against top 3 competitors
- 60-70% of ramped AEs achieving quota attainment
- Magic Number exceeds 0.75 indicating efficient S&M spend
- CAC Payback under 18 months with LTV:CAC ratio above 3:1
- Forecast accuracy exceeds 85% within two quarters of implementation

---

## Scope & Limitations

**In scope:** Revenue health diagnostics (NRR, GRR, ARR waterfall), sales model selection and optimization, pipeline management (stage definitions, coverage modeling, MEDDPICC qualification), pricing strategy frameworks, sales team scaling (capacity model, quota setting, territory design), revenue forecasting, and board-level revenue reporting.

**Out of scope:** CRM system administration or data extraction (tools consume JSON exports), individual deal coaching (tools flag patterns, not prescribe tactics), marketing attribution modeling (use cmo-advisor), customer success health scoring (use customer-success-manager), and compensation plan legal compliance. Tools analyze point-in-time revenue snapshots; continuous monitoring requires CRM/BI integration.

**Limitations:** Revenue benchmarks based on aggregate B2B SaaS data; targets vary by stage, ACV, and sales motion (PLG vs enterprise vs channel). Pipeline analysis assumes accurate CRM data including stage, value, age, and close date. Sales efficiency metrics require accurate financial data that early-stage companies may not track. Quota recommendations are directional; final calibration requires territory-level analysis.

---

## Integration Points

- **cfo-advisor** -- Revenue forecasts and capacity models feed financial planning; pricing impacts margin modeling
- **cpo-advisor** -- Product roadmap must support ICP needs and close pipeline gaps; feature requests filtered through CPO
- **cmo-advisor** -- Pipeline SLA and MQL-to-SQL conversion jointly owned; CAC optimization requires marketing alignment
- **coo-advisor** -- RevOps staffing and commission infrastructure depend on operational capacity planning
- **competitive-intel** -- Win/loss data and competitive win rates inform battlecard updates and positioning
- **sales-success/** -- Sales efficiency metrics cascade to account executive and sales ops execution

---

## cs-onboard

Source path: `references/c-level-advisor/cs-onboard/SKILL.md`

# C-Suite Onboarding

**Tier:** POWERFUL
**Category:** C-Level Advisory
**Tags:** onboarding, company context, founder interview, advisor setup, context capture, executive onboarding

## Overview

C-Suite Onboarding captures the company context that powers every C-level advisory skill. One structured conversation produces a persistent context file that transforms generic advice into specific, situationally-aware guidance. Without context, advisory skills give textbook answers. With context, they give your-company answers.

---

## Commands

| Command | Duration | Purpose |
|---------|----------|---------|
| `/cs:setup` | 45 minutes | Full onboarding interview across 7 dimensions |
| `/cs:update` | 15 minutes | Quarterly refresh -- what changed since last capture |
| `/cs:score` | 5 minutes | Assess context completeness and freshness |

---

## Interview Principles

This is a conversation, not a form. Follow these rules:

1. **One question at a time.** Never list multiple questions.
2. **Follow threads.** When something interesting surfaces, go deeper before moving on.
3. **Reflect back.** "So the real issue sounds like X -- is that right?"
4. **Watch for what they skip.** Avoidance signals the most important areas.
5. **Never read from a list.** Use the framework as a map, not a script.
6. **Earn the hard questions.** Start easy, build trust, then ask about weaknesses and fears.

**Opening line:**
> "Tell me about the company in your own words -- what are you building and why does it matter?"

Then let the conversation flow naturally across the 7 dimensions.

---

## The 7 Interview Dimensions

### Dimension 1: Company Identity

**What to capture:** What they do, who it is for, the real founding "why," one-sentence pitch, non-negotiable values.

**Key probes:**
- "If you had to explain this to your grandmother in one sentence, what would you say?"
- "What is a value you would fire someone over violating?"
- "What do you refuse to compromise on, even if it costs you?"

**Red flags:**
- Values that sound like marketing copy ("we empower synergies")
- Cannot articulate the founding "why" beyond "I saw a market opportunity"
- Mission statement that could apply to any company in the industry

### Dimension 2: Stage & Scale

**What to capture:** Headcount (FT vs contractors), revenue range, runway, stage label, what broke in the last 90 days.

**Key probes:**
- "If you had to label your stage -- still finding PMF, scaling what works, or optimizing -- which is it?"
- "What broke in the last 90 days that you did not expect?"
- "What is the one metric you check every morning?"

**Stage Definitions:**

| Stage | Signal | Typical Challenges |
|-------|--------|-------------------|
| Pre-PMF | <$500K ARR, pivoting, searching | Finding the right customer/problem/solution fit |
| Early PMF | $500K-$2M ARR, repeatable sales | Hiring, process, not breaking what works |
| Scaling | $2M-$10M ARR, growth machine building | Middle management, culture preservation, unit economics |
| Optimizing | $10M+ ARR, efficiency focus | Innovation stagnation, org complexity, market defense |

### Dimension 3: Founder Profile

**What to capture:** Self-identified superpower, acknowledged blind spots, archetype, what actually keeps them up at night.

**Key probes:**
- "What would your co-founder (or closest advisor) say you should stop doing?"
- "When things go wrong, what is your instinctive first reaction?"
- "What part of running this company do you secretly dislike?"

**Founder Archetypes:**

| Archetype | Strength | Blind Spot | Advisory Focus |
|-----------|----------|-----------|----------------|
| Product | Deep user empathy, product vision | Sales, go-to-market, delegation | Revenue strategy, hiring |
| Technical | Engineering excellence, technical moats | Business model, communication | GTM, storytelling, team |
| Sales | Revenue generation, relationships | Product depth, technical debt | Product strategy, engineering |
| Operator | Execution, processes, efficiency | Vision, innovation, risk-taking | Strategy, long-term planning |

**Red flags:**
- No acknowledged blind spots
- Weakness framed as strength ("I'm too much of a perfectionist")
- Co-founder dynamics described as "fine" with no specifics

### Dimension 4: Team & Culture

**What to capture:** Team described in 3 words, last real conflict and how it was resolved, which values are real vs aspirational, strongest and weakest leader.

**Key probes:**
- "Which of your stated values is most real? Which is a poster on the wall?"
- "Tell me about the last real disagreement in the leadership team."
- "Who is the one person you cannot afford to lose, and why?"

**Red flags:**
- "We have no conflict" -- every healthy team has conflict
- Cannot name a weak leader -- either lying or not paying attention
- Culture described only in positive terms with no self-awareness

### Dimension 5: Market & Competition

**What to capture:** Who is winning and why (honest version), real unfair advantage, the competitive move that could hurt them.

**Key probes:**
- "What is your real unfair advantage -- not the investor pitch version?"
- "If your best competitor had unlimited funding, what would they do that scares you?"
- "What do your competitors do better than you? Be honest."

**Red flags:**
- "We have no real competition" -- you always have competition, even if it is the status quo
- Unfair advantage is a feature that can be copied in 6 months
- No awareness of competitor strategy

### Dimension 6: Current Challenges

**What to capture:** Priority stack-rank across product/growth/people/money/operations, the decision they have been avoiding, the "one extra day" answer.

**Key probes:**
- "If you had one extra day per week, what would you spend it on?" (Reveals true priority)
- "What is the decision you have been putting off for weeks?"
- "Rank these: product, growth, people, money, operations. What is number 1 right now?"

**The "avoided decision" is often the most valuable insight.** Common avoided decisions:
- Firing an underperformer who is well-liked
- Pivoting away from a product that is not working
- Having an honest conversation with a co-founder
- Raising prices
- Cutting a feature or initiative

### Dimension 7: Goals & Ambition

**What to capture:** 12-month target (specific and measurable), 36-month target (directional), exit vs build-forever orientation, personal success definition.

**Key probes:**
- "What does 12 months from now look like if everything goes right?"
- "What does success look like for you personally -- separate from the company?"
- "Are you building to sell, building forever, or haven't decided?"

**Red flags:**
- 12-month target that is vague ("grow a lot")
- Personal and company goals completely disconnected
- Exit orientation that conflicts with stated mission

---

## Context Output Structure

After the interview, generate the context file at `~/.claude/company-context.md`:

```markdown
# Company Context
**Last updated:** [Date]
**Freshness:** Fresh (< 90 days)
**Completeness:** [X/7 dimensions captured]
**Interviewed:** [Founder name and role]

## 1. Company Identity
**What we do:** [One sentence]
**Who it's for:** [Target customer]
**Why it matters:** [Founding motivation -- the real version]
**One-line pitch:** [Elevator pitch]
**Non-negotiable values:** [Values they would fire over]

## 2. Stage & Scale
**Stage:** [Pre-PMF / Early PMF / Scaling / Optimizing]
**Headcount:** [X FT + Y contractors]
**Revenue:** [$X ARR / MRR]
**Runway:** [X months at current burn]
**Morning metric:** [What they check first]
**Recent break:** [What broke in last 90 days]

## 3. Founder Profile
**Archetype:** [Product / Technical / Sales / Operator]
**Superpower:** [Self-identified strength]
**Blind spot:** [Acknowledged weakness]
**Up-at-night:** [Current anxiety]
**Co-founder dynamic:** [Healthy / Strained / Solo]

## 4. Team & Culture
**Team in 3 words:** [Their words]
**Real values:** [Values that are actually lived]
**Aspirational values:** [Values that are work-in-progress]
**Key person risk:** [Who they cannot lose]
**Weakest link:** [Leadership gap]
**Last conflict:** [What happened and how resolved]

## 5. Market & Competition
**Winning competitor:** [Who and why]
**Real unfair advantage:** [Not the investor version]
**Kill-shot risk:** [Competitive move that could hurt them]
**Market position:** [Leader / Challenger / Niche / Emerging]

## 6. Current Challenges
**Priority #1:** [Top challenge area]
**Priority stack:** [Rank of product/growth/people/money/ops]
**Avoided decision:** [What they have been putting off]
**One-extra-day:** [What they would spend time on]

## 7. Goals & Ambition
**12-month target:** [Specific, measurable]
**36-month target:** [Directional]
**Orientation:** [Build to sell / Build forever / Undecided]
**Personal success:** [What success means for the founder personally]

## Notes
[Observations, inferred patterns, things to watch]
[CONTEXT UPDATE entries from subsequent sessions]
```

**Rules:**
- Write `[not captured]` for unknowns -- never leave blank
- Use their actual words when possible, not corporate paraphrasing
- Note confidence level for inferred information
- Never silently modify -- always confirm before updating

---

## Context Quality Scoring

### Completeness Score

| Dimensions Captured | Score | Label |
|--------------------|-------|-------|
| 7/7 | 100% | Complete |
| 5-6/7 | 70-85% | Good (identify gaps) |
| 3-4/7 | 40-55% | Partial (schedule follow-up) |
| 1-2/7 | 15-25% | Minimal (re-interview needed) |

### Freshness Score

| Age | Score | Label | Action |
|-----|-------|-------|--------|
| < 30 days | Fresh | High confidence | Use directly |
| 30-90 days | Aging | Medium confidence | Use, flag what may have changed |
| 90-180 days | Stale | Low confidence | Prompt for /cs:update |
| > 180 days | Expired | Very low confidence | Re-interview recommended |

### Quality Signals

| Signal | Confidence Impact |
|--------|------------------|
| Full interview completed | +High |
| Update done within 90 days | +Medium |
| Key fields populated with specifics | +High |
| Fields contain vague/generic answers | -Medium |
| Financial fields missing | -High (for CFO/CEO skills) |
| "Not captured" in 3+ fields | -High |

---

## Quarterly Refresh Protocol (`/cs:update`)

**Trigger:** Every 90 days or after a major event (fundraise, reorg, pivot, key hire/departure).

**Opening:** "It has been [X time] since we captured your company context. Let's do a quick refresh. What has changed?"

**Walk each dimension with a single "what changed?" question:**

| Dimension | Refresh Question |
|-----------|-----------------|
| Identity | "Still the same mission, or has it shifted?" |
| Stage & Scale | "Team size, revenue, and runway now?" |
| Founder | "Has your role changed? What is stretching you?" |
| Team | "Any leadership changes? New key players?" |
| Market | "Any competitive surprises? Market shifts?" |
| Challenges | "What is the #1 problem now vs 90 days ago?" |
| Goals | "Still on track for the 12-month target?" |

**After refresh:**
- Update relevant sections in context file
- Update `Last updated` timestamp
- Reset freshness to `Fresh`
- Note what changed in the Notes section

---

## Context Enrichment During Sessions

During advisory conversations, new information surfaces. Capture it without disrupting flow.

**Triggers for enrichment:**
- New metric or number shared
- Key person mentioned for the first time
- Priority shift expressed
- New constraint or risk surfaces
- Timeline or deadline revealed

**Protocol:**
1. Note internally during conversation
2. At session end: "I picked up a few things that would be useful to add to your context. Want me to update the file?"
3. If yes: append to relevant section, update timestamp
4. If no: respect the decision

**Never silently modify the context file.** Always confirm before changes.

---

## Privacy Rules

### Never Send Externally
- Specific revenue or burn rate figures
- Customer names (unless publicly known)
- Employee names (unless publicly known)
- Investor names (unless publicly announced)
- Specific runway months
- Watch list contents
- Avoided decisions

### Safe to Use Externally (Anonymized)
- Stage label (seed, Series A, etc.)
- Team size ranges (1-10, 10-50, 50-200+)
- Industry vertical
- Challenge category (not specifics)
- Market position descriptor

### Before Any External API Call
- Numbers become ranges or stage-relative descriptors
- Names become roles ("the CTO" not "Sarah")
- Revenue becomes stage labels ("early revenue" not "$800K ARR")
- Customers become "Customer A, B, C"

---

## Missing Context Handling

Handle gracefully -- never block the conversation.

| Missing | Approach |
|---------|----------|
| Stage | "Just to calibrate -- are you still finding PMF or scaling what works?" |
| Financials | Use stage + team size to infer. Note the inference. |
| Founder profile | Infer from conversation style. Mark as inferred. |
| Multiple founders | Context reflects interviewee. Note co-founder perspective may differ. |
| Recent context | "It's been a while since your last update. Should I assume things are roughly the same, or has something big changed?" |

---

## Integration with C-Suite Skills

The context file is loaded by every C-level advisory skill:

| Skill | Uses Context For |
|-------|-----------------|
| **ceo-advisor** | Strategic recommendations calibrated to stage and challenges |
| **cfo-advisor** | Financial guidance calibrated to runway and revenue |
| **cto-advisor** | Technical strategy calibrated to team and architecture |
| **coo-advisor** | Operations advice calibrated to scale and processes |
| **cmo-advisor** | Marketing strategy calibrated to stage and market position |
| **internal-narrative** | Narrative construction based on company truth |
| **scenario-war-room** | Risk variables calibrated to actual threats |

---

## Related Skills

| Skill | Use When |
|-------|----------|
| **ceo-advisor** | Using context for strategic decisions |
| **internal-narrative** | Building narratives from the captured context |
| **scenario-war-room** | Modeling risks based on company context |
| **context-engine** | Technical implementation of context management for AI agents |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Founder gives vague, marketing-speak answers | Interview not building trust; questions too formal | Reset with a personal question; follow a thread they care about; use reflection ("So what you're really saying is...") |
| Key dimensions left as "[not captured]" after interview | Founder avoided topic or interview ran out of time | Note which dimensions were skipped (avoidance signals importance); schedule targeted follow-up for missing areas |
| Context file feels generic, could apply to any company | Interviewer used the framework as a script, not a map | Re-interview with focus on specifics: names, numbers, stories; capture their actual words, not paraphrases |
| Advisory skills still giving textbook answers despite context | Context file too sparse or stale (>90 days) | Run /cs:score to assess completeness and freshness; schedule /cs:update if freshness is Stale or Expired |
| Quarterly refresh takes too long or feels redundant | Refresh covering all 7 dimensions instead of focusing on changes | Lead with "What changed?" per dimension; skip unchanged areas quickly; target 15 minutes total |
| Multiple founders give conflicting context | Different perspectives on stage, challenges, or priorities | Note the conflict explicitly in context file; mark which founder provided which data; flag for resolution |
| Context file modified without founder approval | AI agent or team member updated context silently | Enforce "never silently modify" rule; require explicit founder confirmation before any context update |

---

## Success Criteria

- Context completeness score reaches 7/7 dimensions within first session or first follow-up
- Context freshness maintained at "Fresh" (< 90 days old) through quarterly refresh protocol
- Advisory skills produce company-specific (not generic) recommendations when context is loaded
- Founder reports that AI advisory conversations feel "like talking to someone who knows my business"
- Time to complete full onboarding interview under 45 minutes
- Time to complete quarterly refresh under 15 minutes
- Zero instances of context file modified without founder approval

---

## Scope & Limitations

**In scope:** Structured founder interview across 7 dimensions (identity, stage, founder profile, team/culture, market/competition, challenges, goals), context file generation and maintenance, quarterly refresh protocol, context quality scoring (completeness and freshness), context enrichment during advisory sessions, privacy rules for external data handling, and missing context graceful handling.

**Out of scope:** Company financial modeling (use cfo-advisor), competitive intelligence gathering (use competitive-intel), team assessment or 360 reviews (use hr-operations/), product analytics (use cpo-advisor), and automated context capture from external data sources. This skill captures context through conversation, not data integration.

**Limitations:** Context quality depends entirely on founder candor; evasive or aspirational answers reduce advisory effectiveness. Single-founder interviews may miss co-founder perspectives. Context is a point-in-time snapshot; rapid company changes (pivot, reorg, fundraise) can make context stale before the 90-day refresh. Privacy rules prevent sharing specific context externally, which limits integration with external tools.

---

## Integration Points

- **ceo-advisor** -- Strategic recommendations calibrated to company stage, challenges, and founder archetype
- **cfo-advisor** -- Financial guidance calibrated to runway, revenue range, and growth stage
- **cto-advisor** -- Technical strategy calibrated to team size, architecture maturity, and founder technical depth
- **coo-advisor** -- Operations advice calibrated to scale, process maturity, and headcount
- **cmo-advisor** -- Marketing strategy calibrated to stage, market position, and competitive landscape
- **internal-narrative** -- Narrative construction uses company identity, values, and founder voice from context
- **scenario-war-room** -- Risk variables calibrated to actual competitive threats and company vulnerabilities

---

## cto-advisor

Source path: `references/c-level-advisor/cto-advisor/SKILL.md`

# CTO Advisor

Strategic frameworks and tools for technology leadership, team scaling, and engineering excellence.

## Keywords
CTO, chief technology officer, technical leadership, tech debt, technical debt, engineering team, team scaling, architecture decisions, technology evaluation, engineering metrics, DORA metrics, ADR, architecture decision records, technology strategy, engineering leadership, engineering organization, team structure, hiring plan, technical strategy, vendor evaluation, technology selection

## Quick Start

### For Technical Debt Assessment
```bash
python scripts/tech_debt_analyzer.py
```
Analyzes system architecture and provides prioritized debt reduction plan.

### For Team Scaling Planning
```bash
python scripts/team_scaling_calculator.py
```
Calculates optimal hiring plan and team structure for growth.

### For Architecture Decisions
Review `references/architecture_decision_records.md` for ADR templates and examples.

### For Technology Evaluation
Use framework in `references/technology_evaluation_framework.md` for vendor selection.

### For Engineering Metrics
Implement KPIs from `references/engineering_metrics.md` for team performance tracking.

## Core Responsibilities

### 1. Technology Strategy

#### Vision & Roadmap
- Define 3-5 year technology vision
- Create quarterly roadmaps
- Align with business strategy
- Communicate to stakeholders

#### Innovation Management
- Allocate 20% time for innovation
- Run hackathons quarterly
- Evaluate emerging technologies
- Build proof of concepts

#### Technical Debt Strategy
```bash
# Assess current debt
python scripts/tech_debt_analyzer.py

# Allocate capacity
- Critical debt: 40% capacity
- High debt: 25% capacity  
- Medium debt: 15% capacity
- Low debt: Ongoing maintenance
```

### 2. Team Leadership

#### Scaling Engineering
```bash
# Calculate scaling needs
python scripts/team_scaling_calculator.py

# Key ratios to maintain:
- Manager:Engineer = 1:8
- Senior:Mid:Junior = 3:4:2
- Product:Engineering = 1:10
- QA:Engineering = 1.5:10
```

#### Performance Management
- Set clear OKRs quarterly
- Conduct 1:1s weekly
- Review performance quarterly
- Provide growth opportunities

#### Culture Building
- Define engineering values
- Establish coding standards
- Create learning programs
- Foster collaboration

### 3. Architecture Governance

#### Decision Making
Use ADR template from `references/architecture_decision_records.md`:
1. Document context and problem
2. List all options considered
3. Record decision and rationale
4. Track consequences

#### Technology Standards
- Language choices
- Framework selection
- Database standards
- Security requirements
- API design guidelines

#### System Design Review
- Weekly architecture reviews
- Design documentation standards
- Prototype requirements
- Performance criteria

### 4. Vendor Management

#### Evaluation Process
Follow framework in `references/technology_evaluation_framework.md`:
1. Gather requirements (Week 1)
2. Market research (Week 1-2)
3. Deep evaluation (Week 2-4)
4. Decision and documentation (Week 4)

#### Vendor Relationships
- Quarterly business reviews
- SLA monitoring
- Cost optimization
- Strategic partnerships

### 5. Engineering Excellence

#### Metrics Implementation
From `references/engineering_metrics.md`:

**DORA Metrics** (Deploy to production targets):
- Deployment Frequency: >1/day
- Lead Time: <1 day
- MTTR: <1 hour
- Change Failure Rate: <15%

**Quality Metrics**:
- Test Coverage: >80%
- Code Review: 100%
- Technical Debt: <10%

**Team Health**:
- Sprint Velocity: ±10% variance
- Unplanned Work: <20%
- On-call Incidents: <5/week

## Weekly Cadence

### Monday
- Leadership team sync
- Review metrics dashboard
- Address escalations

### Tuesday
- Architecture review
- Technical interviews
- 1:1s with directs

### Wednesday
- Cross-functional meetings
- Vendor meetings
- Strategy work

### Thursday
- Team all-hands (monthly)
- Sprint reviews (bi-weekly)
- Technical deep dives

### Friday
- Strategic planning
- Innovation time
- Week recap and planning

## Quarterly Planning

### Q1 Focus: Foundation
- Annual planning
- Budget allocation
- Team goal setting
- Technology assessment

### Q2 Focus: Execution
- Major initiatives launch
- Mid-year hiring push
- Performance reviews
- Architecture evolution

### Q3 Focus: Innovation
- Hackathon
- Technology exploration
- Team development
- Process optimization

### Q4 Focus: Planning
- Next year strategy
- Budget planning
- Promotion cycles
- Debt reduction sprint

## Crisis Management

### Incident Response
1. **Immediate** (0-15 min):
   - Assess severity
   - Activate incident team
   - Begin communication

2. **Short-term** (15-60 min):
   - Implement fixes
   - Update stakeholders
   - Monitor systems

3. **Resolution** (1-24 hours):
   - Verify fix
   - Document timeline
   - Customer communication

4. **Post-mortem** (48-72 hours):
   - Root cause analysis
   - Action items
   - Process improvements

### Types of Crises

#### Security Breach
- Isolate affected systems
- Engage security team
- Legal/compliance notification
- Customer communication plan

#### Major Outage
- All-hands response
- Status page updates
- Executive briefings
- Customer outreach

#### Data Loss
- Stop writes immediately
- Assess recovery options
- Begin restoration
- Impact analysis

## Stakeholder Management

### Board/Executive Reporting
**Monthly**:
- KPI dashboard
- Risk register
- Major initiatives status

**Quarterly**:
- Technology strategy update
- Team growth and health
- Innovation highlights
- Budget review

### Cross-functional Partners

#### Product Team
- Weekly roadmap sync
- Sprint planning participation
- Technical feasibility reviews
- Feature estimation

#### Sales/Marketing
- Technical sales support
- Product capability briefings
- Customer reference calls
- Competitive analysis

#### Finance
- Budget management
- Cost optimization
- Vendor negotiations
- Capex planning

## Strategic Initiatives

### Digital Transformation
1. Assess current state
2. Define target architecture
3. Create migration plan
4. Execute in phases
5. Measure and adjust

### Cloud Migration
1. Application assessment
2. Migration strategy (7Rs)
3. Pilot applications
4. Full migration
5. Optimization

### Platform Engineering
1. Define platform vision
2. Build core services
3. Create self-service tools
4. Enable team adoption
5. Measure efficiency

### AI/ML Integration
1. Identify use cases
2. Build data infrastructure
3. Develop models
4. Deploy and monitor
5. Scale adoption

## Communication Templates

### Technology Strategy Presentation
```
1. Executive Summary (1 slide)
2. Current State Assessment (2 slides)
3. Vision & Strategy (2 slides)
4. Roadmap & Milestones (3 slides)
5. Investment Required (1 slide)
6. Risks & Mitigation (1 slide)
7. Success Metrics (1 slide)
```

### Team All-hands
```
1. Wins & Recognition (5 min)
2. Metrics Review (5 min)
3. Strategic Updates (10 min)
4. Demo/Deep Dive (15 min)
5. Q&A (10 min)
```

### Board Update Email
```
Subject: Engineering Update - [Month]

Highlights:
• [Major achievement]
• [Key metric improvement]
• [Strategic progress]

Challenges:
• [Issue and mitigation]

Next Month:
• [Priority 1]
• [Priority 2]

Detailed metrics attached.
```

## Tools & Resources

### Essential Tools
- **Architecture**: Draw.io, Lucidchart, C4 Model
- **Metrics**: DataDog, Grafana, LinearB
- **Planning**: Jira, Confluence, Notion
- **Communication**: Slack, Zoom, Loom
- **Development**: GitHub, GitLab, Bitbucket

### Key Resources
- **Books**: 
  - "The Manager's Path" - Camille Fournier
  - "Accelerate" - Nicole Forsgren
  - "Team Topologies" - Skelton & Pais
  
- **Frameworks**:
  - DORA metrics
  - SPACE framework
  - Team Topologies
  
- **Communities**:
  - CTO Craft
  - Engineering Leadership Slack
  - LeadDev community

## Success Indicators

✅ **Technical Excellence**
- System uptime >99.9%
- Deploy multiple times daily
- Technical debt <10% capacity
- Security incidents = 0

✅ **Team Success**
- Team satisfaction >8/10
- Attrition <10%
- Filled positions >90%
- Diversity improving

✅ **Business Impact**
- Features on-time >80%
- Engineering enables revenue
- Cost per transaction decreasing
- Innovation driving growth

## Red Flags to Watch

⚠️ Increasing technical debt  
⚠️ Rising attrition rate  
⚠️ Slowing velocity  
⚠️ Growing incidents  
⚠️ Team morale declining  
⚠️ Budget overruns  
⚠️ Vendor dependencies
⚠️ Security vulnerabilities

---

## Tool Reference

### 1. tech_debt_analyzer.py

Analyzes system architecture for technical debt across 5 categories (architecture, code quality, infrastructure, security, performance). Calculates weighted debt scores, prioritizes reduction actions, estimates effort, and assesses risk levels.

```bash
python scripts/tech_debt_analyzer.py --input system_config.json --json
python scripts/tech_debt_analyzer.py --input system_config.json
```

| Flag | Type | Description |
|------|------|-------------|
| `--input` | optional | Path to JSON file with system configuration (category indicators scored 0-100, team size, criticality, business context). Uses built-in example if omitted |
| `--json` | optional | Output in JSON format instead of human-readable text |

### 2. team_scaling_calculator.py

Calculates optimal engineering team scaling plans including hiring timeline, role distribution, team structure design, budget projections, and risk assessment. Applies Brooks' Law and Conway's Law factors.

```bash
python scripts/team_scaling_calculator.py --input team_data.json --json
python scripts/team_scaling_calculator.py --input team_data.json
```

| Flag | Type | Description |
|------|------|-------------|
| `--input` | optional | Path to JSON file with current state (headcount, roles, velocity) and growth targets (target headcount, timeline). Uses built-in example if omitted |
| `--json` | optional | Output in JSON format instead of human-readable text |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Tech debt score increasing despite dedicated sprints | Debt reduction not keeping pace with new debt creation | Implement debt prevention gates (code review, architecture review); track debt creation rate alongside reduction rate |
| DORA metrics improving but customer satisfaction declining | Shipping faster but not shipping the right things | Add customer-impact metrics alongside DORA; review feature adoption rates; reconnect with product team on priorities |
| Team scaling plan keeps missing hiring targets | Unrealistic timeline, insufficient recruiting capacity, or poor employer brand | Adjust timeline using 25% max quarterly growth rate; add recruiting resources (1 per 50 annual hires); invest in employer brand |
| Architecture decisions not documented or followed | No ADR process or ADRs created but not referenced | Implement lightweight ADR template; make ADR review part of design review; link ADRs to relevant code |
| Engineering team morale declining during rapid growth | Culture dilution, unclear expectations, or insufficient onboarding | Implement structured onboarding; maintain 1:8 manager ratio; run quarterly team health surveys |
| Vendor lock-in creating strategic risk | No evaluation framework or over-reliance on single vendor | Run technology evaluation for critical vendors; implement abstraction layers; maintain exit strategies |

---

## Success Criteria

- Tech debt score below 40 (Medium-Low) across all categories
- DORA metrics at "High" or "Elite" performance tier (deployment frequency > weekly, lead time < 1 week, MTTR < 1 day, change failure rate < 15%)
- Team balance score above 70/100 with appropriate role ratios maintained
- Architecture decisions documented via ADRs for all significant technical choices
- System uptime exceeds 99.9% for production systems
- Engineering team satisfaction above 8/10 with attrition below 10%
- Innovation time (hackathons, exploration) maintained at 15-20% of engineering capacity

---

## Scope & Limitations

**In scope:** Technology strategy and vision, technical debt assessment and reduction planning, engineering team scaling and structure design, architecture governance (ADRs, design reviews), vendor management and evaluation, engineering metrics (DORA, quality, team health), crisis management (incident response, security breach, data loss), stakeholder management and board reporting, and strategic initiatives (cloud migration, platform engineering, AI/ML integration).

**Out of scope:** Hands-on coding or code review (use engineering/ skills), product feature prioritization (use cpo-advisor), security architecture and compliance (use ciso-advisor or ra-qm-team/), HR policy and compensation design (use chro-advisor or hr-operations/), and financial planning for engineering budget (use cfo-advisor). Tools analyze engineering data snapshots; continuous metrics tracking requires integration with DevOps platforms.

**Limitations:** Tech debt scoring depends on self-reported indicator data; automated code analysis tools provide more objective measures. Team scaling budget projections use average salary bands that vary significantly by location, seniority mix, and market conditions. DORA benchmarks assume standard software delivery practices; hardware or embedded systems teams may need different targets.

---

## Integration Points

- **ceo-advisor** -- Technology strategy aligns with business direction; engineering capacity enables or constrains strategic bets
- **cpo-advisor** -- Technical feasibility co-owned with CPO; features vs platform trade-offs require joint decision-making
- **cfo-advisor** -- Engineering budget, headcount costs, and vendor spend feed financial planning
- **coo-advisor** -- System reliability and incident response intersect with operational excellence
- **ciso-advisor** -- Security architecture, vulnerability management, and compliance require CISO partnership
- **engineering/** -- CTO strategy cascades to engineering team execution; architecture decisions guide implementation

---

## culture-architect

Source path: `references/c-level-advisor/culture-architect/SKILL.md`

# Culture Architect

Culture is what you DO, not what you SAY. This skill builds culture as an operational system -- observable behaviors, measurable health, and rituals that scale from 5 people to 500.

## Keywords

culture, company culture, values, mission, vision, culture code, cultural rituals, culture health, values-to-behaviors, founder culture, culture debt, value-washing, culture assessment, culture survey, psychological safety, culture scaling, engagement, eNPS, remote culture, hybrid culture, culture clash, employer brand, onboarding culture, performance culture, recognition

---

## Core Principle

**Culture = (What you reward) + (What you tolerate) + (What you celebrate)**

If your values say "transparency" but you punish bearers of bad news, your real value is "optics." Culture is not aspirational. It is descriptive. The work is closing the gap between stated and actual.

---

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which deliverable is needed** (values + behaviors, culture code, health survey, ritual calendar, culture-debt audit, or M&A integration) — each has its own template
- [ ] **Company stage and headcount** — rituals and transmission mechanisms that work at 15 people break at 150; the ritual matrix is stage-keyed
- [ ] **What is actually rewarded, tolerated, and celebrated today** — culture is descriptive, not aspirational; without the honest current state you produce wall-poster platitudes
- [ ] **Work model** (in-person, remote, hybrid) — determines which operating principles and meeting rules apply

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## Culture Diagnostic Decision Tree

```
START: "How is our culture?"
  |
  v
[Run the Values Audit]
  Ask: "What did the last person who got promoted demonstrate?"
  |
  +-- Answer matches stated values --> Values are real. Check transmission.
  |     |
  |     v
  |   [Can a 30-day employee describe the culture accurately?]
  |     +-- YES --> Culture is operational. Maintain and evolve.
  |     +-- NO  --> Transmission gap. Fix onboarding and rituals.
  |
  +-- Answer differs from stated values --> Values are performative.
        |
        v
      [Do leaders model the real (non-stated) values?]
        +-- YES --> Rewrite values to match reality, then iterate.
        +-- NO  --> Deeper problem: no coherent culture exists. Build from scratch.
```

---

## Framework 1: Mission / Vision / Values Workshop

### Mission (Why We Exist)

| Element | Test | Example |
|---------|------|---------|
| Present-tense | Is it about what we do now, not what we aspire to? | "We reduce preventable falls in elderly care" |
| Specific | Could a competitor claim the exact same thing? If yes, too generic. | Not "We make the world better" |
| Meaningful | Would something be lost if we disappeared? | Answer must be concrete |

### Vision (What Winning Looks Like)

| Quality | Bad | Good |
|---------|-----|------|
| Specificity | "Be the market leader" | "Every care home in Europe uses our system by 2030" |
| Falsifiability | "Transform healthcare" | "Reduce fall-related injuries by 50% in partner facilities" |
| Timeline | No date | 5-10 year horizon with milestones |

### Values (What We Actually Do)

| Rule | Explanation |
|------|-------------|
| 3-5 values maximum | More than 5 and none are memorable |
| Derived from observation | "What did our best hire do that nobody asked?" |
| Each has behavioral anchors | Specific enough to judge against |
| Include the tension | Good values have a cost ("Speed" means "we accept some risk") |

---

## Framework 2: Values-to-Behaviors Translation

This is the work that makes values operational. Every value needs concrete behavioral anchors.

| Value | Vague Version | Behavioral Anchor | How You'd Observe It |
|-------|---------------|-------------------|---------------------|
| Transparency | "We're open and honest" | "We share bad news within 24 hours, including to our manager" | Bad news travels fast, no surprises |
| Ownership | "We take responsibility" | "We don't hand off problems -- we own until resolved, even across team boundaries" | No orphaned issues |
| Speed | "We move fast" | "Decisions under $5K happen at team level, same day" | Low decision latency |
| Quality | "We don't cut corners" | "We stop the line before shipping something we're not proud of" | Teams delay launches for quality |
| Customer-first | "Customers are our priority" | "Any team member can escalate a customer issue to leadership, bypassing normal channels" | Escalation is celebrated, not punished |

### Translation Workshop (90 minutes)

```
For each value:
  Step 1: State the value in 2-3 words
  Step 2: Ask "How would a new hire know we live this on day 30?"
  Step 3: Write 3 observable behaviors that prove this value
  Step 4: Write 3 behaviors that violate this value
  Step 5: Ask "What does this value cost us? What's the trade-off?"
  Step 6: If no trade-off exists, it's not a value -- it's a platitude

Output: Value card with behaviors, violations, and trade-offs
```

---

## Framework 3: Culture Code Creation

A culture code is a public document that describes how you operate. It should attract the right people and repel the wrong ones.

### Culture Code Structure

| Section | Purpose | Key Question |
|---------|---------|-------------|
| 1. Who We Are | Mission, context, stage | "Why does this company exist?" |
| 2. Who Thrives Here | Specific behaviors, not adjectives | "What does success look like day-to-day?" |
| 3. Who Doesn't Thrive Here | Honest misfit description | "When have we made a bad hire? What was the pattern?" |
| 4. How We Make Decisions | Decision rights, speed expectations | "Who can decide what, and how fast?" |
| 5. How We Communicate | Channels, cadence, expectations | "What can I expect in response time and transparency?" |
| 6. How We Grow People | Career development, feedback | "What's my path here?" |
| 7. What We Expect of Leaders | Leadership behaviors | "How should managers behave?" |

### Culture Code Anti-Patterns

| Anti-Pattern | Why It Fails | Better Alternative |
|-------------|-------------|-------------------|
| "We're a family" | Families don't fire for performance | "We're a high-performing team that cares about each other" |
| Only positive traits | Not credible, doesn't help people self-select | Include "who doesn't thrive here" section |
| Aspirational, not descriptive | Creates cynicism when reality differs | Describe what IS, then iterate |
| Too long (> 15 pages) | Nobody reads it | Keep to 5-8 pages, link to details |
| Never updated | Becomes irrelevant as company scales | Review annually, update at each stage |

---

## Framework 4: Culture Health Assessment

Run quarterly. Anonymous. 8-12 questions maximum.

### Core Assessment Dimensions

| Dimension | Question Example | What It Measures |
|-----------|-----------------|-----------------|
| Psychological safety | "I can raise a concern without fear of negative consequences" | Trust in the system |
| Clarity | "I know how my work connects to company goals" | Strategic alignment |
| Fairness | "Decisions here are made consistently and transparently" | Trust in leadership |
| Growth | "I am learning and being challenged here" | Development opportunity |
| Trust in leadership | "I believe what leadership tells me" | Communication credibility |
| Recognition | "Good work is noticed and acknowledged" | Reward system health |
| Belonging | "I feel like I belong on this team" | Inclusion effectiveness |
| Autonomy | "I have enough freedom to do my best work" | Micromanagement detection |

### Score Interpretation and Response

| Score Range | Status | Action Required | Timeline |
|-------------|--------|-----------------|----------|
| 80-100% | Healthy | Document what works, celebrate, share practices | Maintain |
| 65-79% | Warning | Identify specific friction points, address top 2-3 | 30 days |
| 50-64% | Damaged | Leadership attention required, specific interventions | 14 days |
| < 50% | Crisis | All-hands intervention, external facilitation may be needed | Immediate |

### eNPS Integration

```
eNPS Question: "On a scale of 0-10, how likely are you to recommend
this company as a place to work?"

Promoters (9-10)    - Detractors (0-6)   = eNPS
-----------------------------------------
> 50  = Exceptional
30-50 = Good
10-30 = Acceptable
0-10  = Concerning
< 0   = Crisis
```

---

## Framework 5: Cultural Rituals by Stage

Rituals are the delivery mechanism for culture. What works at 10 people breaks at 100.

### Ritual Matrix

| Stage | Team Size | Key Rituals | Culture Risk |
|-------|-----------|-------------|-------------|
| Seed | < 15 | Weekly all-hands (30 min), monthly retro, default transparency | Culture by osmosis -- works but won't scale |
| Early Growth | 15-50 | Quarterly culture survey, onboarding buddy, recognition program, leader office hours | First transmission failures appear |
| Scaling | 50-200 | Culture committee (peer-driven), values-based reviews, manager training, dept + company all-hands | Subcultures form, drift begins |
| Large | 200+ | Annual culture plan with KPIs, internal NPS, subculture management, culture integration for M&A | Culture becomes fragile without systems |

### Ritual Design Template

| Element | Description |
|---------|-------------|
| Name | Clear, memorable name for the ritual |
| Purpose | Which value does this reinforce? |
| Frequency | Weekly, monthly, quarterly, annual |
| Duration | Time commitment (shorter is better) |
| Participants | Who is involved, who leads |
| Format | In-person, remote, hybrid |
| Measurement | How do you know it's working? |
| Sunset criteria | When should this ritual be retired? |

---

## Framework 6: Culture Debt

Culture debt accumulates like technical debt: small compromises that compound.

### Culture Debt Inventory

| Debt Type | Example | Cost | Fix Difficulty |
|-----------|---------|------|----------------|
| Tolerated bad behavior | Star performer who is toxic | Team morale, attrition | High (requires confrontation) |
| Stale values | Values from founding team, never updated | Cynicism, disengagement | Medium (requires workshop) |
| Missing rituals | No recognition system, no all-hands | Low cohesion, isolation | Low (design and implement) |
| Inconsistent enforcement | Some people held to standards, others not | Trust erosion, unfairness | High (requires consistency) |
| Osmosis-only transmission | No onboarding for culture, just happens | New hires don't get it | Medium (design onboarding) |

### Culture Debt Decision Tree

```
START: Culture debt identified
  |
  v
[Is it actively causing harm?]
  |
  +-- YES --> [Is the cost of fixing it < cost of keeping it?]
  |            |
  |            +-- YES --> Fix immediately. This week.
  |            +-- NO  --> Fix within 30 days. Plan the transition.
  |
  +-- NO  --> [Will it compound if ignored for 6 months?]
              |
              +-- YES --> Schedule fix within 90 days
              +-- NO  --> Document and monitor quarterly
```

---

## Remote and Hybrid Culture

### Remote Culture Operating Principles

| Principle | Implementation |
|-----------|---------------|
| Default to async | Write first, meet only when needed |
| Intentional social | Regular non-work social time (weekly) |
| Over-communicate decisions | Document reasoning, share broadly |
| Equal access | Remote participants get equal voice in hybrid meetings |
| Visible work | Regular updates so work is seen without surveillance |

### Hybrid Meeting Rules

| Rule | Rationale |
|------|-----------|
| If one person is remote, everyone joins individually | Prevents room-vs-screen dynamic |
| Camera-optional for working sessions | Reduces fatigue |
| Shared document for all meetings | Creates equal participation |
| Record meetings with decisions | Timezone inclusion |
| No hallway decisions on hybrid days | Excludes remote team members |

---

## Red Flags

- Values posted on wall, never referenced in reviews or decisions
- Star performers protected from cultural standards -- destroys credibility
- Leaders who "don't have time" for culture rituals -- signals culture isn't a priority
- New hires feel culture is "different than advertised" -- culture code is fiction
- No mechanism to raise cultural concerns safely -- problems go underground
- Culture survey results not shared with team -- breeds distrust
- Same values for 5+ years despite major scaling -- values are stale
- Founders exempt from cultural norms -- "do as I say, not as I do"
- No consequences for value violations -- values are suggestions, not standards
- Culture committee is all HR, no peers -- becomes compliance, not culture

---

## Integration with C-Suite

| When... | Culture Architect Works With... | To... |
|---------|---------------------------------|-------|
| Hiring surge | CHRO (`chro-advisor`) | Ensure culture fit is measured, not guessed |
| Org restructure | COO + CEO | Manage culture disruption from structure change |
| M&A or partnership | CEO + COO | Detect and resolve culture clashes early |
| Performance issues | CHRO | Separate culture misfit from skill deficit |
| Strategy pivot | CEO (`ceo-advisor`) | Update values that the pivot makes obsolete |
| Rapid growth | All C-suite | Scale rituals before culture dilutes |
| Change rollout | Change Management (`change-management`) | Cultural dimension of change |
| Operating system design | Company OS (`company-os`) | Culture rituals in the meeting pulse |
| Founder evolution | Founder Coach (`founder-coach`) | Leadership style impact on culture |

---

## Proactive Triggers

- eNPS declining 2+ quarters -- investigate root cause before it becomes attrition
- Rapid hiring (> 30% headcount growth in a quarter) -- culture transmission at risk
- M&A announced -- culture integration plan needed immediately
- Star performer exhibiting toxic behavior -- address within 1 week or culture debt compounds
- Values haven't been reviewed in 2+ years -- schedule values refresh workshop
- Remote team growing without intentional culture design -- isolation and drift risk
- Exit interviews mention "culture" as departure reason -- pattern analysis needed

---

## Output Artifacts

| Request | Deliverable |
|---------|-------------|
| "Build our values" | Values workshop facilitation guide + values cards with behaviors |
| "Create a culture code" | Culture code document (5-8 pages) with all 7 sections |
| "Assess our culture health" | Survey design, score interpretation, action plan |
| "Design cultural rituals" | Ritual calendar by stage with design templates |
| "Audit culture debt" | Debt inventory with priority, cost, and fix plan |
| "Remote culture strategy" | Operating principles, tools, rituals for distributed teams |
| "M&A culture integration" | Culture comparison matrix, clash risk map, integration timeline |

---

## Tool Reference

### 1. culture_survey_analyzer.py

Analyzes culture health survey results across 8 dimensions (psychological safety, clarity, fairness, growth, trust, recognition, belonging, autonomy). Calculates dimension scores, overall health rating, identifies strengths and risks, and generates action recommendations.

```bash
python scripts/culture_survey_analyzer.py --input survey_data.json --json
python scripts/culture_survey_analyzer.py --input survey_data.json
```

| Flag | Type | Description |
|------|------|-------------|
| `--input` | required | Path to JSON file with survey responses (dimension scores per respondent, optional department/tenure metadata) |
| `--json` | optional | Output in JSON format instead of human-readable text |

### 2. values_alignment_scorer.py

Scores alignment between stated values and observed behaviors using the Competing Values Framework quadrants (Clan, Adhocracy, Market, Hierarchy). Detects gaps between current and desired culture, identifies value-washing risks, and recommends alignment actions.

```bash
python scripts/values_alignment_scorer.py --input values_data.json --json
python scripts/values_alignment_scorer.py --input values_data.json
```

| Flag | Type | Description |
|------|------|-------------|
| `--input` | required | Path to JSON file with stated values, behavioral evidence scores, and optional CVF quadrant assessments |
| `--json` | optional | Output in JSON format instead of human-readable text |

### 3. engagement_tracker.py

Tracks employee engagement metrics over time including eNPS, survey scores, participation rates, and retention correlation. Detects trends, flags declining dimensions, and generates quarterly engagement reports.

```bash
python scripts/engagement_tracker.py --input engagement_data.json --json
python scripts/engagement_tracker.py --input engagement_data.json
```

| Flag | Type | Description |
|------|------|-------------|
| `--input` | required | Path to JSON file with periodic engagement data (eNPS scores, survey results, participation rates, optional attrition data) |
| `--json` | optional | Output in JSON format instead of human-readable text |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Values posted on wall but never referenced in decisions | Values created as aspirational exercise, not operational tool | Run values-to-behaviors workshop; tie values to performance reviews, hiring rubrics, and recognition |
| Culture survey scores declining quarter-over-quarter | Underlying issue not addressed after previous survey | Analyze by dimension to isolate the declining area; share results transparently; commit to specific actions with deadlines |
| Star performer protected from cultural standards | Leadership avoidance or fear of losing output | Address within 1 week; culture debt compounds daily; document impact on team morale and attrition |
| New hires say culture is "different than advertised" | Culture code describes aspiration, not reality | Rewrite culture code to describe what IS; include "who doesn't thrive here" section honestly |
| eNPS declining but leadership claims culture is strong | Leadership disconnected from frontline experience; survey results not shared | Share survey results with full team; conduct skip-level conversations; address top 2 detractor themes |
| Remote team members feel excluded from culture | Rituals designed for in-person only; hallway decisions on hybrid days | Apply Remote Culture Operating Principles; redesign rituals for hybrid; enforce "if one remote, all remote" meeting rule |
| Culture committee produces no measurable impact | Committee is all HR, no peers; no decision authority or budget | Reconstitute with peer representatives; grant budget and decision authority; set quarterly culture OKRs |

---

## Success Criteria

- Culture health score above 70% across all 8 assessment dimensions
- eNPS above 30 (Good) sustained across 4 consecutive quarters
- Values-to-behaviors translation completed for all stated values with observable anchors
- 30-day employees can accurately describe the culture without prompting
- Culture debt inventory reviewed quarterly with no "Critical" items unaddressed for more than 30 days
- Survey participation rate above 80% indicating trust in the feedback process
- Zero cultural standard exceptions for high performers (no "brilliant jerk" tolerance)

---

## Scope & Limitations

**In scope:** Mission/vision/values workshop facilitation, values-to-behaviors translation, culture code creation, culture health assessment (8-dimension survey, eNPS), cultural rituals design by company stage, culture debt identification and management, remote/hybrid culture operating principles, M&A culture integration planning, and Competing Values Framework assessment.

**Out of scope:** HR policy creation (use hr-operations/), compensation and benefits design (use chro-advisor), DEI program management, employee relations and conflict resolution, performance management system design, and organizational restructuring (use coo-advisor). Tools analyze survey and engagement data; continuous culture monitoring requires integration with HR platforms.

**Limitations:** Culture assessment depends on honest survey responses; low participation rates (<50%) or fear of retaliation invalidate results. The Competing Values Framework provides a useful map but oversimplifies the complexity of real organizational culture. Culture change is slow (12-24 months for meaningful shifts); tools measure progress but cannot accelerate the human change process. M&A culture integration assessments are predictive, not deterministic.

---

## Integration Points

- **chro-advisor** -- Hiring for culture fit, performance reviews tied to values, attrition analysis linked to culture health
- **ceo-advisor** -- Culture strategy aligns with company vision; values refresh tied to strategic pivots
- **coo-advisor** -- Culture rituals embedded in operating rhythm; org restructures assessed for culture impact
- **change-management** -- Cultural dimension of any major change initiative; resistance patterns mapped to culture type
- **founder-coach** -- Leadership style impact on culture; founder behavior modeling assessed against stated values
- **company-os** -- Culture rituals integrated into the organizational operating system meeting cadence

---

## decision-logger

Source path: `references/c-level-advisor/decision-logger/SKILL.md`

# Decision Logger

Two-layer memory system for executive decisions. Layer 1 stores everything discussed. Layer 2 stores only what the founder approved. Future sessions read Layer 2 only -- this prevents hallucinated consensus from past debates bleeding into new deliberations.

## Keywords

decision log, memory, approved decisions, action items, board minutes, conflict detection, DO_NOT_RESURFACE, decision history, overdue, supersession, decision search, decision tracking, accountability

---

## Two-Layer Architecture

### Why Two Layers?

Single-layer decision logs create a dangerous problem: agents read old debates, rejected proposals, and discarded ideas, then treat them as context for new decisions. This causes "hallucinated consensus" where rejected ideas gradually become accepted through repetition.

The two-layer system prevents this by strictly separating raw discussion from approved decisions.

### Layer Architecture

```
Layer 1: Raw Transcripts (NEVER auto-loaded)
  Location: memory/board-meetings/YYYY-MM-DD-raw.md
  Contains: Full deliberation, all perspectives, rejected arguments
  Loaded: Only on explicit founder request
  Retention: Active 90 days, then archived

Layer 2: Approved Decisions (AUTO-LOADED every session)
  Location: memory/board-meetings/decisions.md
  Contains: Only founder-approved decisions and action items
  Loaded: Automatically at start of every board meeting (Phase 1)
  Mutation: Append-only. Decisions are never deleted, only superseded.
```

### Layer Interaction Rules

| Rule | Rationale |
|------|-----------|
| Layer 2 is append-only | Preserves complete decision history |
| Layer 1 is never auto-loaded | Prevents hallucinated consensus |
| Only Chief of Staff writes to Layer 2 | Single point of control |
| Agents never write directly | All writes go through Chief of Staff after founder approval |
| Superseded decisions stay in Layer 2 | History is the record; nothing is deleted |

---

## Decision Entry Format

### Standard Decision Record

```markdown
## [YYYY-MM-DD] -- [DECISION TITLE]

**Decision:** [One clear statement of what was decided]
**Context:** [1-2 sentences on why this decision was needed]
**Owner:** [One person or role accountable for execution]
**Deadline:** [YYYY-MM-DD]
**Review Date:** [YYYY-MM-DD]
**Confidence:** [High / Medium / Low]
**Rationale:** [Why this option over alternatives, 1-2 sentences]

**User Override:** [If founder changed agent recommendation -- what and why]

**Rejected Alternatives:**
- [Proposal] -- [reason for rejection] [DO_NOT_RESURFACE]
- [Proposal] -- [reason for rejection]

**Action Items:**
- [ ] [Action] -- Owner: [name] -- Due: [YYYY-MM-DD]
- [ ] [Action] -- Owner: [name] -- Due: [YYYY-MM-DD]

**Dependencies:** [Other decisions this depends on]
**Supersedes:** [DATE of previous decision on same topic, if any]
**Superseded by:** [Filled retroactively if overridden later]
**Raw transcript:** memory/board-meetings/[DATE]-raw.md
**Tags:** [topic tags for search -- e.g., pricing, hiring, market-entry]
```

### Completed Action Item Format

```markdown
- [x] [Action] -- Owner: [name] -- Completed: [YYYY-MM-DD] -- Result: [one sentence]
```

---

## Conflict Detection System

Before logging any new decision, the system checks for three types of conflicts.

### Conflict Type 1: DO_NOT_RESURFACE Violation

A new decision matches a previously rejected proposal.

```
Detection: New proposal text similarity > 70% to a rejected proposal

Response:
  BLOCKED: "[Proposal]" was rejected on [DATE].
  Reason: [original rejection reason]

  To reopen: Founder must explicitly say "reopen [topic] from [DATE]"
  This cannot be overridden by agents.
```

### Conflict Type 2: Topic Contradiction

Two active decisions on the same topic reach different conclusions.

```
Detection: Same tags + contradictory conclusions

Response:
  DECISION CONFLICT DETECTED

  Active decision (older): [DATE] -- [decision text]
  New decision: [DATE] -- [decision text]

  These decisions contradict each other.

  Options:
  1. Supersede old decision (new replaces old)
  2. Merge decisions (reconcile the conflict)
  3. Defer to founder (present both, let founder choose)
```

### Conflict Type 3: Owner Conflict

Same action assigned to different people in different decisions.

```
Detection: Same action description, different owners

Response:
  OWNER CONFLICT

  Action: "[action text]"
  Decision 1 ([DATE]): Owner = [Person A]
  Decision 2 ([DATE]): Owner = [Person B]

  Resolve: Which owner is correct?
```

### Conflict Resolution Decision Tree

```
START: Conflict detected
  |
  v
[What type of conflict?]
  |
  +-- DO_NOT_RESURFACE --> Block automatically. Only founder can reopen.
  |
  +-- Topic contradiction --> [Is the new decision from a board meeting?]
  |                           |
  |                           +-- YES --> Supersede old by default (board > individual)
  |                           +-- NO  --> Present both to founder for resolution
  |
  +-- Owner conflict --> [Which decision is more recent?]
                         |
                         +-- Flag to founder with both dates
                         +-- Default to more recent unless founder overrides
```

---

## Decision Lifecycle

### States

```
PROPOSED --> APPROVED --> ACTIVE --> [COMPLETED | SUPERSEDED | EXPIRED]

PROPOSED:    Agent synthesis presented to founder
APPROVED:    Founder explicitly approved
ACTIVE:      Being executed, action items in progress
COMPLETED:   All action items done, review confirmed success
SUPERSEDED:  New decision replaced this one
EXPIRED:     Review date passed without renewal
```

### State Transitions

| From | To | Trigger | Who |
|------|----|---------|-----|
| Proposed | Approved | Founder says "yes" or "approve" | Founder |
| Proposed | Rejected | Founder says "no" or "reject" | Founder |
| Approved | Active | Action items begin execution | Automatic |
| Active | Completed | All action items marked done | Chief of Staff |
| Active | Superseded | New decision on same topic | Chief of Staff |
| Active | Expired | Review date passed, no renewal | System alert |

---

## Clarify First

Before logging a decision, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The exact decision statement** (one clear sentence of what was decided) — this is the heart of the record; a vague statement makes the log useless for future conflict detection
- [ ] **Owner and deadline** — every decision record needs a single accountable person and a date, or it cannot be tracked or surfaced as overdue
- [ ] **Rejected alternatives and why** — these become DO_NOT_RESURFACE entries that prevent rejected ideas from re-entering future deliberations
- [ ] **Whether this supersedes a prior decision on the same topic** — drives conflict detection and supersession tracking against the existing log

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Logging Workflow

### Post-Decision Logging (after Board Meeting Phase 5)

```
Step 1: Founder approves synthesis
  |
Step 2: Write Layer 1 raw transcript
  --> memory/board-meetings/YYYY-MM-DD-raw.md
  |
Step 3: Run conflict detection against decisions.md
  |
  +-- Conflicts found --> Surface to founder, wait for resolution
  +-- No conflicts --> Continue
  |
Step 4: Append approved entries to decisions.md (Layer 2)
  |
Step 5: Set review dates and action item deadlines
  |
Step 6: Confirm to founder:
  "Logged: [N] decisions, [M] action items tracked, [K] flags added"
```

---

## Action Item Management

### Overdue Detection

At the start of every session, scan for:

1. Action items past their deadline
2. Decisions with review dates that have passed
3. Decisions older than 90 days with no completion status

### Alert Format

```
OVERDUE ITEMS (as of [today's date])

Action Items Past Deadline:
  1. [Action] -- Owner: [name] -- Due: [date] -- [X] days overdue
     From decision: [decision title] ([date])

  2. [Action] -- Owner: [name] -- Due: [date] -- [X] days overdue

Decisions Pending Review:
  1. [Decision title] -- Review was due: [date]
     Original decision: [summary]
     Prompt: "You decided [X] on [date]. Worth a check-in?"

Stale Decisions (> 90 days, no status update):
  1. [Decision title] -- Decided: [date] -- Last update: [date]
```

### Action Item Priority Matrix

| Urgency | Impact | Priority | Response |
|---------|--------|----------|----------|
| Overdue | High | Critical | Escalate to founder immediately |
| Overdue | Low | High | Flag in next session |
| Due this week | High | High | Surface proactively |
| Due this week | Low | Medium | Include in weekly summary |
| Due next month | Any | Low | Monitor only |

---

## Search and Retrieval

### Search Capabilities

| Query Type | Example | Returns |
|-----------|---------|---------|
| By topic | "pricing" | All decisions tagged with pricing |
| By owner | "CTO" | All decisions and actions owned by CTO |
| By date range | "Q4 2025" | All decisions from Oct-Dec 2025 |
| By status | "overdue" | All overdue action items |
| By conflict | "conflicts" | All detected contradictions |
| By tag | "hiring AND engineering" | Intersection of tags |

### Decision Summary Views

| View | Contents | When Used |
|------|----------|-----------|
| Last 10 | Most recent 10 approved decisions | Default quick view |
| Full history | All decisions, chronological | Audit or deep review |
| By owner | Grouped by accountable person | Accountability check |
| By topic | Grouped by tag | Strategic review |
| Overdue only | Only overdue items | Action management |
| Active only | Only decisions with open action items | Execution tracking |

---

## File Structure

```
memory/
  board-meetings/
    decisions.md           # Layer 2: append-only, founder-approved
    YYYY-MM-DD-raw.md      # Layer 1: full transcript per meeting
    archive/
      YYYY/                # Raw transcripts after 90 days
```

---

## Integration with Other Skills

| Skill | Integration Point |
|-------|------------------|
| Chief of Staff (`chief-of-staff`) | Manages the logging workflow, writes to Layer 2 |
| Board Meeting (`board-meeting`) | Triggers logging after Phase 5 approval |
| Strategic Alignment (`strategic-alignment`) | Checks if decisions cascade properly to team goals |
| Executive Mentor (`executive-mentor`) | Reviews stale decisions for re-evaluation |
| Org Health (`org-health-diagnostic`) | Decision velocity as health indicator |

---

## Red Flags

- Same topic discussed 3+ times without a logged decision -- decision avoidance
- Action items consistently overdue by the same owner -- capacity or accountability issue
- Decisions made without checking history -- risk of contradiction
- Layer 1 being loaded without explicit request -- hallucinated consensus risk
- No review dates set on decisions -- decisions age without re-evaluation
- Rejected proposals resurfacing in new language -- DO_NOT_RESURFACE not enforced
- Decision log not consulted at start of board meetings -- institutional memory not used
- All decisions owned by one person -- bottleneck or delegation failure

---

## Proactive Triggers

- Review date passed on a decision -- prompt: "You decided [X] on [date]. Worth checking in?"
- Action item overdue > 7 days -- escalate to founder with owner context
- Same topic area has 3+ active decisions -- consolidation review needed
- 30+ days without any logged decision -- is the system being used?
- New decision proposed that matches DO_NOT_RESURFACE -- block and explain
- Decision from 6+ months ago with no status update -- mark as stale, prompt review

---

## Output Artifacts

| Request | Deliverable |
|---------|-------------|
| "Show recent decisions" | Last 10 approved decisions with status |
| "What's overdue?" | All overdue action items with owner and days past due |
| "Search decisions about [topic]" | Filtered decision history by topic/tag |
| "Log this decision" | Formatted decision entry with all fields |
| "Check for conflicts" | Conflict scan against all active decisions |
| "Decision summary for board" | Decision velocity, completion rate, open items |

---

## Tool Reference

### 1. decision_tracker.py

Tracks executive decisions with full lifecycle management (Proposed > Approved > Active > Completed/Superseded/Expired). Scans for overdue action items, stale decisions, and generates status summaries.

```bash
python scripts/decision_tracker.py --input decisions.json --json
python scripts/decision_tracker.py --input decisions.json
```

| Flag | Type | Description |
|------|------|-------------|
| `--input` | required | Path to JSON file with decision records (title, status, owner, deadline, action items, tags) |
| `--json` | optional | Output in JSON format instead of human-readable text |

### 2. decision_quality_scorer.py

Scores decision quality across 6 dimensions: framing (problem definition), alternatives (options considered), information (evidence quality), reasoning (logic soundness), commitment (action clarity), and metacognition (awareness of uncertainty). Generates improvement recommendations.

```bash
python scripts/decision_quality_scorer.py --input decision_assessments.json --json
python scripts/decision_quality_scorer.py --input decision_assessments.json
```

| Flag | Type | Description |
|------|------|-------------|
| `--input` | required | Path to JSON file with decision assessments (dimension scores 1-10, optional outcome data) |
| `--json` | optional | Output in JSON format instead of human-readable text |

### 3. decision_tree_builder.py

Builds decision trees with expected value analysis. Calculates optimal paths through probability-weighted outcomes, identifies highest-value decisions, and generates sensitivity analysis on key assumptions.

```bash
python scripts/decision_tree_builder.py --input tree_data.json --json
python scripts/decision_tree_builder.py --input tree_data.json
```

| Flag | Type | Description |
|------|------|-------------|
| `--input` | required | Path to JSON file with decision nodes (options, probabilities, outcomes, values) |
| `--json` | optional | Output in JSON format instead of human-readable text |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Same topic discussed 3+ times without a logged decision | Decision avoidance or no clear decision-making authority | Force a decision at next session; use decision tree builder to clarify options; assign explicit decision owner |
| Action items consistently overdue by same owner | Owner over-committed, lacks capacity, or accountability issue | Review owner workload; redistribute if capacity issue; escalate to founder if accountability issue |
| Decisions made without checking history | Decision log not consulted at session start; no integration habit | Automate decision log loading at board meeting Phase 1; surface relevant past decisions proactively |
| Rejected proposals resurfacing in new language | DO_NOT_RESURFACE not enforced; team members unaware of prior rejection | Enforce conflict detection before logging; block proposals matching rejected items; require explicit "reopen" from founder |
| Decision log growing but never consulted for patterns | Log treated as archive, not strategic tool | Run quarterly decision review; analyze decision velocity, completion rate, and quality trends |
| All decisions owned by one person | Bottleneck or delegation failure | Distribute ownership; use decision quality scorer to assess whether centralization improves or hurts quality |
| Decision quality scores low on "alternatives" dimension | Team anchoring on first option instead of exploring | Require minimum 3 alternatives for decisions above a threshold; use decision tree builder to model options |

---

## Success Criteria

- All board meeting decisions logged in Layer 2 within 24 hours of approval
- Action item completion rate exceeds 80% within stated deadlines
- Zero DO_NOT_RESURFACE violations (rejected proposals do not re-enter decision flow)
- Decision review dates honored for 90%+ of active decisions
- Decision quality score averages above 7/10 across all 6 dimensions
- Conflict detection catches 100% of topic contradictions before new decisions are logged
- Decision log consulted at the start of every board meeting session

---

## Scope & Limitations

**In scope:** Two-layer decision memory architecture, decision entry and lifecycle management (Proposed > Approved > Active > Completed/Superseded/Expired), conflict detection (DO_NOT_RESURFACE, topic contradiction, owner conflict), action item tracking with overdue alerting, decision search and retrieval by topic/owner/date/status, decision quality scoring, and expected value analysis via decision trees.

**Out of scope:** CRM or project management tool integration (tools consume JSON exports), meeting transcription or recording, team-level task management (use project-management/ skills), strategic planning or OKR tracking (use strategic-alignment or ceo-advisor), and automated decision-making. This skill tracks and evaluates decisions; it does not make them.

**Limitations:** Conflict detection uses tag and text matching; semantically similar but differently worded proposals may not be caught. Decision quality scoring is retrospective and depends on honest self-assessment. Decision tree expected value calculations assume probabilities are estimable; highly uncertain environments may make probability assignment misleading. The two-layer architecture requires discipline to maintain; if Layer 2 is not consistently updated, institutional memory degrades.

---

## Integration Points

- **chief-of-staff** -- Manages the logging workflow; single point of control for Layer 2 writes
- **board-meeting** -- Triggers decision logging after Phase 5 approval; decision log loaded at Phase 1
- **strategic-alignment** -- Checks if decisions cascade properly to team goals and OKRs
- **executive-mentor** -- Reviews stale decisions for re-evaluation; coaches on decision quality improvement
- **ceo-advisor** -- Strategic decisions logged and tracked; decision patterns inform leadership coaching

---

## executive-mentor

Source path: `references/c-level-advisor/executive-mentor/SKILL.md`

# Executive Mentor

Not another advisor. An adversarial thinking partner. Finds the holes before your competitors, board, or customers do. Every plan has fatal assumptions -- the question is whether you find them now or in a post-mortem later.

## Keywords

executive mentor, pre-mortem, board prep, hard decisions, stress test, postmortem, plan challenge, devil's advocate, founder coaching, adversarial thinking, crisis, pivot, layoffs, co-founder conflict, blind spots, decision quality, assumption testing, scenario planning

---

## The Difference

Other C-suite skills build plans. Executive Mentor breaks them.

| Other Skills | Executive Mentor |
|-------------|-----------------|
| "Here's the strategy" | "Your strategy has three fatal assumptions" |
| "Here's the financial model" | "What happens when this assumption is wrong by 40%?" |
| "Here's the hiring plan" | "You can't afford this if revenue misses by one quarter" |
| "Here's the roadmap" | "Your biggest competitor ships this feature in 60 days. Then what?" |

---

## Framework 1: Pre-Mortem Analysis

### Process

```
Step 1: STATE THE PLAN
  Describe the plan as if it succeeded perfectly.

Step 2: ASSUME FAILURE
  "It's 12 months from now. This plan failed completely. Why?"

Step 3: IDENTIFY FAILURE MODES
  List every way the plan could fail. Minimum 5 failure modes.
  Rate each: Probability (1-5) x Impact (1-5) = Severity (1-25)

Step 4: FIND THE KILLERS
  Focus on severity > 15. These are the ones that will actually kill you.

Step 5: BUILD HEDGES
  For each killer: What's the earliest warning signal?
  What's the cheapest hedge that reduces severity by 50%?

Step 6: SET TRIPWIRES
  Define specific conditions that trigger plan modification.
  "If [metric] drops below [threshold] by [date], we [action]."
```

### Pre-Mortem Output Template

| Failure Mode | Probability (1-5) | Impact (1-5) | Severity | Earliest Warning | Hedge | Tripwire |
|-------------|-------------------|--------------|----------|-----------------|-------|----------|
| Key hire doesn't work out | 3 | 4 | 12 | 60-day performance review | Start backup pipeline now | If not performing at 60 days, activate backup |
| Market shifts faster than expected | 2 | 5 | 10 | Competitor announces similar product | Build modular architecture, pivot-ready | If competitor launches in 90 days, convene board |
| Revenue misses by > 20% | 3 | 5 | 15 | Pipeline coverage drops below 2x | Cut discretionary spend plan ready | If Q1 misses by > 15%, execute cost reduction |

---

## Framework 2: Board Preparation

### The 48-Hour Board Prep Protocol

```
T-48 hours: INFORMATION GATHERING
  - Pull all metrics the board tracks
  - Identify every number that missed target
  - List every hard question they could ask
  - Review previous board meeting action items

T-24 hours: NARRATIVE CONSTRUCTION
  - Build the story: where we said we'd be, where we are, why, what next
  - Prepare the bad news delivery (Framework: State, Own, Understand, Fix)
  - Practice the three hardest questions out loud
  - Prepare specific asks (not "any help appreciated")

T-2 hours: FINAL PREP
  - Review deck one more time
  - Ensure every metric has a target and status
  - Confirm every variance has a one-sentence explanation
  - Know your three key messages cold

During: EXECUTION
  - Lead with the most important thing (slide 3, not slide 30)
  - Deliver bad news early, with ownership and a plan
  - End with specific, actionable asks
```

### The 10 Hardest Board Questions

Prepare answers for these regardless of your agenda:

| Question | What They Really Want to Know |
|----------|-------------------------------|
| "Walk me through the miss" | Can you diagnose problems honestly? |
| "What's the path to profitability?" | Do you have unit economics discipline? |
| "Who's your biggest competitive threat?" | Are you aware and strategic, or dismissive? |
| "What keeps you up at night?" | Are you honest about risks, or selling? |
| "If you had to cut 30% of the team, who stays?" | Do you know who's critical? |
| "Why should we put more money in?" | Is the risk/reward still compelling? |
| "What would you do differently?" | Can you learn and adapt? |
| "Show me the cohort data" | Is retention real or is growth masking churn? |
| "What's your biggest hiring mistake?" | Are you self-aware and decisive? |
| "When will you need more capital?" | Do you understand your cash position? |

### Board Dynamics Matrix

| Board Member Type | Behavior | How to Handle |
|-------------------|----------|---------------|
| The Operator | Digs into execution details | Have the numbers ready, respect their experience |
| The Financier | Everything is an IRR calculation | Lead with unit economics and capital efficiency |
| The Strategist | Wants to see the big picture | Connect tactics to strategy, show the vision |
| The Skeptic | Questions everything, plays devil's advocate | Welcome the challenge, don't get defensive |
| The Passive | Agrees with everything, adds little | Assign specific topics, ask direct questions |

---

## Framework 3: Hard Call Decision Framework

For decisions with no good options -- only less bad ones.

### The Hard Call Protocol

```
Step 1: REVERSIBILITY TEST
  [Is this decision reversible within 90 days?]
  |
  +-- YES --> Make it faster. Speed > perfection for reversible decisions.
  +-- NO  --> Proceed through full framework.

Step 2: 10/10/10 ANALYSIS
  - How will you feel about this in 10 minutes?
  - How will you feel in 10 months?
  - How will you feel in 10 years?

Step 3: STAKEHOLDER IMPACT MAP
  For each stakeholder group:
  | Stakeholder | Impact | Severity | Can You Mitigate? |
  | Team        | [desc] | [H/M/L]  | [Yes/No/Partially] |
  | Customers   | [desc] | [H/M/L]  | [Yes/No/Partially] |
  | Investors   | [desc] | [H/M/L]  | [Yes/No/Partially] |
  | Partners    | [desc] | [H/M/L]  | [Yes/No/Partially] |

Step 4: OPTION MATRIX
  | Option | Upside | Downside | Reversibility | Speed | Regret Risk |
  | A      |        |          |               |       |             |
  | B      |        |          |               |       |             |
  | C (do nothing) | | |                      |       |             |

Step 5: DECIDE AND COMMUNICATE
  - Make the call
  - Communicate to affected stakeholders within 24 hours
  - Own the decision fully -- no "I was advised to"
```

### Common Hard Calls

| Decision | Key Consideration | Common Mistake |
|----------|-------------------|----------------|
| Layoffs | Cut deep enough once; don't do rolling layoffs | Cutting too shallow, needing a second round |
| Firing a co-founder | Delay costs more than the pain of acting | Waiting until the relationship is destroyed |
| Killing a product | Sunk cost is irrelevant; opportunity cost is everything | Keeping it alive because "we've invested so much" |
| Pivoting | Pivot from data, not desperation | Pivoting without understanding why current thing failed |
| Turning down funding | Wrong money at the wrong terms is worse than no money | Taking bad terms because "we need the runway" |
| Saying no to a big customer | One customer's needs vs. product vision | Building custom features that derail the roadmap |

---

## Framework 4: Stress Test Protocol

### Assumption Stress Testing

```
Step 1: IDENTIFY THE ASSUMPTION
  State it explicitly: "We assume [X]"

Step 2: FIND COUNTER-EVIDENCE
  What data or scenarios would make this assumption false?
  - Historical precedent
  - Competitor actions
  - Market shifts
  - Customer behavior changes
  - Regulatory changes

Step 3: MODEL THE DOWNSIDE
  If this assumption is wrong by 20%, what happens?
  By 40%? By 60%?
  At what point does the plan break?

Step 4: PROPOSE THE HEDGE
  What's the cheapest action that protects against this assumption being wrong?

Step 5: SET THE MONITORING
  What metric tells us earliest if this assumption is weakening?
```

### Common Assumptions to Challenge

| Assumption | Challenge | Hedge |
|-----------|-----------|-------|
| "Revenue will grow 2x YoY" | What if it grows 1.3x? | Plan expenses for 1.5x, invest for 2x |
| "$5B TAM" | Is that serviceable? What's your SAM? | Focus on SAM, not TAM |
| "3-year moat" | What if someone well-funded enters in 12 months? | Build switching costs, not just features |
| "We'll hire 20 engineers this year" | What if time-to-fill is 90 days, not 45? | Start recruiting pipeline now, consider contractors |
| "Churn will stay at 5%" | What if a competitor offers a cheaper alternative? | Invest in stickiness, not just acquisition |

---

## Framework 5: Post-Mortem Protocol

### Blameless Post-Mortem Structure

```
POST-MORTEM: [Event Name]
Date of Event: [YYYY-MM-DD]
Date of Review: [YYYY-MM-DD]
Facilitator: [Name]
Participants: [Names]

TIMELINE
  [Chronological sequence of events, facts only]

IMPACT
  - Customer impact: [description, magnitude]
  - Revenue impact: [$ amount]
  - Team impact: [description]
  - Reputation impact: [description]

5 WHYS ANALYSIS
  1. Why did [event] happen?
     Because [cause 1].
  2. Why did [cause 1] happen?
     Because [cause 2].
  3. Why did [cause 2] happen?
     Because [cause 3].
  4. Why did [cause 3] happen?
     Because [cause 4].
  5. Why did [cause 4] happen?
     Because [root cause].

ROOT CAUSE: [One sentence]

CONTRIBUTING FACTORS (not root cause, but made it worse):
  - [Factor 1]
  - [Factor 2]

WHAT WENT WELL (always include this):
  - [Thing 1]
  - [Thing 2]

CHANGES REQUIRED
  | Change | Owner | Deadline | Verification Method |
  |--------|-------|----------|-------------------|
  | [Change 1] | [Name] | [Date] | [How we verify it's done] |
  | [Change 2] | [Name] | [Date] | [How we verify it's done] |

FOLLOW-UP REVIEW: [Date to check all changes are implemented]
```

### Post-Mortem Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
|-------------|-------------|-----------------|
| Blame assignment | People hide information next time | Blameless: focus on system, not individuals |
| "We'll be more careful" | Not actionable | Specific process or system change |
| Too many action items | Nothing gets done | Maximum 5 changes, prioritized |
| No follow-up | Changes never implemented | Mandatory follow-up date, tracked |
| Whitewashing | Same failure repeats | Honest root cause, uncomfortable truths |

---

## When to Engage Other Roles

| Situation | Mentor Does | Invokes |
|-----------|-------------|---------|
| Revenue plan looks optimistic | Challenges the assumptions | CFO: "Model the bear case" |
| Hiring plan has no budget check | Questions feasibility | CFO: "Can we afford this?" |
| Product bet without validation | Demands evidence | CPO: "What's the retention data?" |
| Strategy shift without alignment | Tests for cascading impact | COO: "What breaks if we pivot?" |
| Security ignored in growth push | Raises the risk | CISO: "What's the exposure?" |
| Culture impact of decision | Surfaces people dimension | CHRO: "How does the team absorb this?" |

---

## Red Flags

- Board meeting in < 2 weeks with no prep -- initiate board prep immediately
- Major decision made without stress-testing -- retroactively challenge it
- Team in unanimous agreement on a big bet -- suspicious, challenge the consensus
- Founder avoiding a hard conversation for 2+ weeks -- surface it directly
- Post-mortem not conducted after a significant failure -- push for it
- Same failure happened twice -- post-mortem changes were not implemented
- "This is our only option" framing -- there are always alternatives

---

## Proactive Triggers

- Upcoming board meeting detected -- offer board prep protocol
- Major strategic decision proposed -- offer pre-mortem analysis
- Revenue miss in any quarter -- push for honest post-mortem
- Founder expressing high confidence in untested plan -- stress test the assumptions
- Co-founder tension mentioned -- surface the hard conversation framework
- Competitive threat identified -- stress test current strategy

---

## Output Artifacts

| Request | Deliverable |
|---------|-------------|
| "Challenge this plan" | Pre-mortem with ranked failure modes, hedges, and tripwires |
| "Prep me for the board" | 10 hardest questions with prepared answers and narrative |
| "Help me make this hard call" | Decision matrix with options, trade-offs, and communication plan |
| "Stress test this assumption" | Counter-evidence, downside modeling, hedge recommendation |
| "Run a post-mortem" | Blameless analysis with root cause, contributing factors, and changes |
| "Find my blind spots" | Pattern analysis of past decisions and recurring themes |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Stress test produces no actionable insights | Assumptions too vague or too few failure modes identified | Require minimum 5 specific, quantified failure modes per plan; use GROW model (Goal, Reality, Options, Will) to sharpen each |
| Board prep feels superficial | Skipping the hard questions or not rehearsing answers | Run the 10 Hardest Board Questions drill with a trusted peer; record and review responses |
| Post-mortem devolves into blame | Facilitator not enforcing blameless culture | Restate ground rules at start; focus language on systems not people; consider external facilitator |
| Pre-mortem participants only list obvious risks | Group conformity bias suppressing creative thinking | Use silent brainstorming first (written, anonymous), then share; apply inversion technique ("How would we guarantee failure?") |
| Hard call framework produces analysis paralysis | Too many options or unclear decision criteria | Limit to 3 options maximum; apply the reversibility test first to eliminate low-stakes decisions from full framework |
| Founder avoids engaging with mentor challenges | Ego protection or fear of appearing weak | Start with evidence file review (past wins); normalize the process by referencing Co-Active coaching principle: the leader is naturally creative and resourceful |
| Tripwires set but never monitored | No ownership or tracking cadence assigned | Assign a specific person to each tripwire; add to weekly leadership meeting agenda |

---

## Success Criteria

- Pre-mortem analysis identifies at least 2 failure modes rated severity > 15 that were not previously considered by the leadership team
- Board preparation drill produces confident, rehearsed answers to all 10 hardest questions at least 24 hours before the meeting
- Hard call decisions are made within the framework's recommended timeline (48 hours for reversible, 2 weeks for irreversible)
- Post-mortem root causes lead to implemented system changes verified at the 30-day follow-up review
- Stress test hedges are costed and assigned within 7 days of the analysis
- At least one blind spot is surfaced and acknowledged per quarterly review cycle
- Decision quality improves measurably: fewer repeated failures, faster response to tripwire triggers

---

## Scope & Limitations

- **In scope:** Plan validation, board preparation, decision stress-testing, post-mortem facilitation, assumption challenging, blind spot detection for founders and C-suite executives
- **Out of scope:** Therapy or clinical mental health support (refer to licensed professionals); legal advice on board governance; financial modeling (use CFO Advisor); technical architecture decisions (use CTO Advisor)
- **Limitation:** Framework effectiveness depends on honest self-assessment; works best when the executive is willing to be challenged
- **Limitation:** Pre-mortem and stress tests are qualitative estimates, not predictive models; probability ratings are subjective
- **Limitation:** Board preparation assumes standard VC/PE board dynamics; public company boards and non-profit boards have different dynamics

---

## Integration Points

| Skill | Integration | Data Flow |
|-------|-------------|-----------|
| `ceo-advisor` | Strategic decisions feed into stress testing | CEO strategy → Mentor challenges assumptions |
| `founder-coach` | Personal development gaps surface during mentoring | Mentor blind spots → Coach development plan |
| `board-deck-builder` | Board prep protocol feeds directly into deck construction | Mentor hard questions → Deck narrative answers |
| `strategic-alignment` | Strategy cascade validation after stress testing | Mentor-validated plan → Alignment cascade |
| `scenario-war-room` | Pre-mortem failure modes feed into scenario modeling | Mentor failure modes → War room scenarios |
| `org-health-diagnostic` | Health scores reveal areas needing executive attention | Health red flags → Mentor focus areas |
| `cfo-advisor` | Financial assumptions require CFO validation | Mentor financial challenges → CFO bear case model |

---

## Python Tools

| Tool | Purpose | Usage |
|------|---------|-------|
| `scripts/leadership_assessment.py` | Score leadership competencies across 8 dimensions using the GROW model framework | `python scripts/leadership_assessment.py --name "Jane Doe" --role CEO --json` |
| `scripts/coaching_plan_generator.py` | Generate a structured 90-day coaching plan based on assessment gaps | `python scripts/coaching_plan_generator.py --gaps delegation,communication --stage "series-a" --json` |
| `scripts/goal_tracker.py` | Track executive development goals with progress and accountability | `python scripts/goal_tracker.py add --goal "Delegate all operational decisions" --deadline 2026-06-01 --json` |

---

## founder-coach

Source path: `references/c-level-advisor/founder-coach/SKILL.md`

# Founder Coach

Your company can only grow as fast as you do. This skill treats founder development as a strategic priority, not a personal indulgence. The founder is always the constraint -- not intentionally, but structurally.

## Keywords

founder, CEO, founder mode, delegation, burnout, imposter syndrome, leadership growth, energy management, calendar audit, executive team, board management, succession planning, IC to manager, leadership style, founder trap, blind spots, personal OKRs, CEO reflection, co-founder dynamics, founder mental health, executive transition

---

## Founder Growth Ceiling Model

Every founder hits predictable ceilings. Identifying which ceiling you are at determines what to work on.

```
Ceiling 1: ~15 people
  Problem: Can't be in every meeting and still think
  Solution: Delegate operational decisions, hire first manager
  Skill to build: Letting go of execution details

Ceiling 2: ~50 people
  Problem: Your style creates culture problems at scale
  Solution: Hire executive team, evolve leadership style
  Skill to build: Leading through others, not doing yourself

Ceiling 3: ~150 people
  Problem: Need a real executive team or you become the blocker
  Solution: Build institutional leadership, not personal leadership
  Skill to build: System design, not personal contribution

Ceiling 4: ~500+ people
  Problem: You are a symbol, not a manager
  Solution: Focus on vision, board, culture, and external narrative
  Skill to build: Organizational architecture
```

---

## Framework 1: Founder Archetype

Most founders are primarily one archetype. Knowing yours predicts what you will struggle with.

### Archetype Matrix

| Archetype | Strength | Blind Spot | Needs | Common at Stage |
|-----------|----------|------------|-------|-----------------|
| Builder | Product, engineering, technical depth | GTM, storytelling, people | A seller / GTM partner | Seed to Series A |
| Seller | Revenue, relationships, vision communication | Operations, follow-through, process | An operator / COO | Series A to B |
| Operator | Execution, process, reliability | Vision, product intuition, risk-taking | A visionary / strategic partner | Series B+ |
| Visionary | Strategy, narrative, pattern recognition | Execution, details, grounding | An integrator / COO | All stages |

### Self-Assessment Questions

| Question | Builder | Seller | Operator | Visionary |
|----------|---------|--------|----------|-----------|
| What do you do with a free hour? | Code/build | Call/meet someone | Organize/fix | Think/read/plan |
| What do you procrastinate on? | Sales, hiring | Admin, documentation | Ideation, risk | Follow-through |
| What does your team complain about? | Communication | Consistency | Flexibility | Details |
| What energizes you most? | Shipping | Winning deals | Solving problems | Connecting dots |

### Archetype Action Plan

```
IF Builder:
  - Hire GTM partner within next 90 days
  - Schedule 2 customer-facing meetings per week (force yourself)
  - Delegate code reviews to senior engineer by month 2

IF Seller:
  - Hire operations leader within next 90 days
  - Implement weekly review cadence (force process)
  - Document decisions instead of verbal commitments

IF Operator:
  - Partner with visionary co-founder or advisor
  - Schedule monthly "blue sky" thinking time
  - Practice saying yes to 1 risky bet per quarter

IF Visionary:
  - Hire COO or integrator immediately
  - Convert vision to 90-day rocks with measurable outcomes
  - Review execution weekly, not just strategy quarterly
```

---

## Framework 2: Delegation

### Why Founders Fail to Delegate

| Reason | Reframe |
|--------|---------|
| "Nobody does it as well as I do" | True short-term, fatal long-term |
| "It takes longer to explain than to do" | True once, not true the 10th time |
| "I lose control" | Control is an illusion at scale |
| "If it fails, it's my fault" | It's your fault if you never let anyone try |

### The Delegation Ladder

| Level | Description | Founder Involvement | When to Use |
|-------|------------|---------------------|-------------|
| 1 | "Do exactly what I tell you" | Total (not delegation) | Never -- this is instruction |
| 2 | "Research and report back" | High (you decide) | New topics, unfamiliar domains |
| 3 | "Propose a solution, I'll decide" | Medium (you validate) | Building trust phase |
| 4 | "Decide and tell me what you decided" | Low (you review) | Established trust |
| 5 | "Handle it, update me if outside parameters" | Minimal (you monitor) | Full delegation |

### What to Delegate First (Priority Order)

| Priority | Category | Examples | Risk if You Hold |
|----------|----------|----------|-----------------|
| 1st | Recurring operational | Reports, scheduling, routine decisions | Your time is consumed by low-value work |
| 2nd | Information gathering | Research, analysis, data synthesis | You become the bottleneck for knowledge |
| 3rd | Relationship management | Customer interactions, partner management | Relationships depend on one person |
| 4th | Budget management | Within defined parameters | Decisions wait for your approval |
| 5th (last) | Strategic decisions | Major pivots, exec hires, large investments | These actually need you |

### Delegation Decision Tree

```
START: Task needs to be done
  |
  v
[Have you done this task 3+ times?]
  |
  +-- YES --> [Can you write the process in < 30 minutes?]
  |            |
  |            +-- YES --> Delegate immediately (Level 3-4)
  |            +-- NO  --> Document next time you do it, then delegate
  |
  +-- NO  --> [Is this strategic or operational?]
              |
              +-- OPERATIONAL --> Delegate at Level 2-3
              +-- STRATEGIC --> [Is it irreversible?]
                                |
                                +-- YES --> Keep for now. Delegate inputs.
                                +-- NO  --> Delegate at Level 3-4
```

---

## Framework 3: Energy Management

### Energy Audit Process

Map your last 2 weeks by energy impact, not just time:

| Activity Category | Energy Impact | Time Spent | Action |
|------------------|-------------|------------|--------|
| Deep product work | Energizing | 4 hrs/week | Protect and increase |
| 1:1s with team | Neutral | 6 hrs/week | Optimize format, reduce to 30 min |
| Admin/email/Slack | Draining | 8 hrs/week | Batch to 2x daily, delegate |
| Investor updates | Draining | 3 hrs/week | Template and delegate prep |
| Customer conversations | Energizing | 2 hrs/week | Increase to 4 hrs/week |
| Strategy thinking | Energizing | 1 hr/week | Block 4 hrs/week minimum |

### Energy Rules

| Rule | Implementation |
|------|---------------|
| Protect deep work | 2-4 hours uninterrupted, 3-5 days/week. Calendar-blocked. |
| Batch shallow work | Email/Slack twice daily maximum |
| Know your peak window | Schedule hardest work during your 4-6 peak hours |
| Match task to energy | Low energy? Do admin. High energy? Do strategy. |
| Recovery is productive | Exercise, thinking time, breaks are not "wasted time" |

---

## Framework 4: CEO Calendar Audit

### Running the Audit

Pull the last 4 weeks. Categorize every block.

| Category | Description | Target % | Red Flag |
|----------|-------------|----------|----------|
| Strategy | Thinking, planning, direction-setting | 20-25% | < 10% = running the company, not leading it |
| People | 1:1s, coaching, recruiting, team development | 20-25% | < 10% = team running on empty |
| External | Customers, investors, partners, industry | 20% | < 10% = losing market connection |
| Execution | Direct work, decisions, problem-solving | 15% | > 30% = still an IC |
| Admin | Email, scheduling, overhead, Slack | < 15% | > 20% = you're a coordinator |
| Recovery | Exercise, meals, breaks, thinking | 10-15% | 0% = burnout approaching |

### CEO Primary Job by Stage

| Stage | CEO Should Spend Most Time On | If You're Not |
|-------|-------------------------------|---------------|
| Seed | Product and customers, directly | You're building in a vacuum |
| Series A | Hiring the executive team | You'll hit Ceiling 2 without leaders |
| Series B | Culture, strategy, external | Your company outgrows your direct management |
| Series C+ | Vision, board, external narrative | Your job is organizational, not operational |

---

## Framework 5: Leadership Style Evolution

### Evolution Matrix

| Transition | From | To | Critical Skill | Common Failure |
|-----------|------|-----|----------------|---------------|
| IC to Manager (0-10) | Doing | Teaching | Give context + set expectations | Doing everything yourself |
| Manager to Leader (10-50) | Managing | Hiring managers | Trust people you're still learning | Micromanaging managers |
| Leader to Executive (50-200) | Directing | Setting culture and direction | Communicate obsessively | Still managing individual work |
| Executive to CEO (200+) | Leading internally | Leading externally | Build systems without you | Refusing to let go of internal ops |

### Transition Readiness Checklist

| Transition | Ready When | Not Ready When |
|-----------|------------|---------------|
| IC to Manager | Can describe 3 team members' career goals | Still doing all the critical work yourself |
| Manager to Leader | 2+ managers you trust to run their teams | Override every manager's decision |
| Leader to Executive | Leadership team can run company for 2 weeks | Every decision needs your approval |
| Executive to CEO | Board operates effectively, team is self-correcting | You are the only external face |

---

## Framework 6: Blind Spot Detection

### Common Founder Blind Spots

| Blind Spot | Symptom | Detection Method |
|-----------|---------|-----------------|
| Communication gap | "I said it once, they should know" | Ask team to repeat your priorities. Do they match? |
| Speed disease | Teams can't orient on your direction | Track how many initiatives change per quarter |
| Context hoarding | Bad decisions by teams who lack information | Ask "what info did you wish you had?" |
| Optimism bias | Consistently miss timelines and targets | Compare estimates to actuals over 6 months |
| Founder exceptionalism | Rules apply to everyone except you | Ask team: "Does the founder follow the same rules?" |
| Feedback avoidance | No honest feedback from anyone | Run anonymous 360 with one hard question |

### 360 Feedback Protocol

Run annually. Include these questions:

| Question | Purpose |
|----------|---------|
| "What does [founder] do that helps the company most?" | Identify strengths to leverage |
| "What does [founder] do that gets in the way?" | Surface blind spots |
| "What should [founder] stop doing?" | Identify delegation opportunities |
| "What should [founder] start doing?" | Identify gaps |
| "If you could change one thing about working with [founder], what?" | Single most impactful change |

---

## Framework 7: Imposter Syndrome Toolkit

### The Reframe

Imposter syndrome is proportional to stretch. If you never feel it, you are not growing.

| Stage | Imposter Trigger | Reframe |
|-------|-----------------|---------|
| First hire | "I've never managed anyone" | Competence comes from doing, not feeling ready |
| First fundraise | "Real founders are more polished" | Investors bet on trajectory, not current state |
| First exec hire | "They have more experience than me" | You hired them because they're good. Let them be. |
| First board meeting | "They'll see through me" | Preparation is the antidote. Use board prep. |
| Growth stage | "Company has outgrown me" | Maybe. Or maybe you just need to grow. Investigate. |

### Practical Tools

| Tool | How | When |
|------|-----|------|
| Evidence file | Document wins, compliments, correct decisions | Read when doubt hits |
| Name it | Say "I'm feeling imposter syndrome about X" to someone | Removes 50% of its power |
| Do it anyway | Act despite feeling unready | Competence follows action |
| Separate feeling from fact | "I feel underprepared" is not "I am incapable" | Always |

---

## Framework 8: Founder Mental Health

### Burnout Signal Progression

| Stage | Signals | Action |
|-------|---------|--------|
| Early | Irritability, poor sleep, decisions feel harder | Adjust calendar, protect recovery time |
| Mid | Physical symptoms, cynicism, priority paralysis | Reduce commitments, start therapy/coaching |
| Late | Can't function, decisions stopped, team notices | Full stop. Get professional support. Now. |

### Structural Prevention

| Practice | Implementation |
|----------|---------------|
| Protected recovery | Non-negotiable time during the week (not just weekends) |
| Therapy or coaching | Not optional. The job is isolating. |
| Peer group | Other founders at similar stage. Only people who truly understand. |
| Clear off-ramps | Define "enough for today." Don't let work be infinite. |
| Physical health | Exercise, sleep, nutrition. Non-negotiable foundations. |

---

## Framework 9: The Founder Mode Trap

### When Founder Mode Helps vs. Hurts

| Situation | Helps | Hurts |
|-----------|-------|-------|
| Crisis recovery | Yes -- direct leadership needed | -- |
| PMF search | Yes -- speed matters more than org health | -- |
| Irreversible decisions | Yes -- you should be in the room | -- |
| Undermining hired managers | -- | Yes -- they can't lead if you override |
| Driven by distrust | -- | Yes -- trust is a prerequisite for scale |
| Preventing team development | -- | Yes -- team never builds judgment |

### The Test

"Am I going deep because the situation requires it, or because I am uncomfortable with loss of control?"

The first is leadership. The second is the trap.

---

## Framework 10: Succession Planning

### Succession Readiness Levels

| Level | Description | Timeline |
|-------|-------------|----------|
| 0 | Founder is the only person who knows how things work | Most founders are here. Dangerous. |
| 1 | Key knowledge and processes are documented | 30-day project |
| 2 | At least one person can cover each key function for 2 weeks | 90-day project |
| 3 | Leadership team can run the company for a quarter | 6-12 month development |
| 4 | Potential successor identified and being developed | 12-24 months |

**Target**: Level 2 is a reasonable near-term target. Level 3 is a strategic asset.

---

## Red Flags

- Making the same decisions you were making 12 months ago -- you haven't delegated
- Calendar audit shows > 30% execution at Series B+ -- still an IC
- No honest feedback received in 6+ months -- feedback vacuum
- Working 70+ hours consistently -- burnout is a when, not an if
- Team waits for your input on everything -- delegation failure
- Can't name your top 3 blind spots -- self-awareness gap
- No peer group of other founders -- isolation risk
- Succession readiness at Level 0 -- company depends entirely on you
- Co-founder tension unaddressed for 30+ days -- will get worse, never better

---

## Integration with C-Suite

| When... | Founder Coach Works With... | To... |
|---------|---------------------------|-------|
| Building exec team | CHRO (`chro-advisor`) | Hiring criteria, onboarding execs |
| Leadership evolution | CEO Advisor (`ceo-advisor`) | Strategic leadership development |
| Decision quality | Executive Mentor (`executive-mentor`) | Stress-testing founder decisions |
| Culture impact | Culture Architect (`culture-architect`) | Founder behavior's effect on culture |
| Board management | Board Deck Builder (`board-deck-builder`) | Preparing for board interactions |
| Org design | COO (`coo-advisor`) | Structure that reduces founder dependency |

---

## Output Artifacts

| Request | Deliverable |
|---------|-------------|
| "I feel like the bottleneck" | Archetype assessment + delegation plan with specific tasks |
| "Help me delegate" | Delegation ladder for current tasks + accountability structure |
| "I'm burning out" | Energy audit + calendar redesign + recovery plan |
| "Audit my calendar" | Calendar analysis with target vs. actual time allocation |
| "Am I growing as a leader?" | 360 feedback design + leadership evolution roadmap |
| "What are my blind spots?" | Blind spot assessment with detection methods |
| "Plan for my succession" | Succession readiness assessment + development plan |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Founder refuses to delegate despite knowing they should | Identity tied to execution; fear of irrelevance | Use the Co-Active coaching reframe: "Your value is multiplied through others, not diminished"; start with one low-risk delegation at Level 3 |
| Calendar audit shows improvement but founder still feels overwhelmed | Energy management not addressed alongside time allocation | Run energy audit in parallel; reallocate based on energy impact, not just time categories |
| Archetype assessment feels inaccurate | Founder is a hybrid or in transition between archetypes | Score across all four archetypes; most founders are 60/40 blend; focus on the dominant blind spot |
| Delegation repeatedly fails (delegate drops the ball) | Delegating at wrong level; insufficient context provided | Move down one delegation ladder level; ensure context document exists; check if the right person was chosen |
| Founder reports burnout symptoms but won't reduce workload | Structural dependency on founder; no capable backup | Build succession readiness to Level 2 first; hire specific capability gaps before reducing hours |
| Co-founder conflict escalating despite awareness | Avoiding the direct conversation; hoping it resolves | Apply Hard Call framework from Executive Mentor; set 48-hour deadline for direct conversation with structured agenda |
| Leadership evolution stalls at IC-to-Manager transition | Founder keeps doing the work instead of coaching the team | Remove founder from execution entirely for 2 weeks as forced experiment; track what breaks vs. what thrives |

---

## Success Criteria

- Founder correctly identifies their primary archetype and has an active plan addressing their top blind spot within 30 days
- Delegation ladder shows measurable progression: at least 3 tasks moved up one level per quarter
- Calendar audit shows time allocation within 5% of stage-appropriate targets after 90 days
- Energy audit results in net-positive energy balance: more energizing activities than draining ones
- 360 feedback scores improve by at least 1 point on the identified blind spot dimension within 6 months
- Succession readiness advances at least one level within 12 months
- Burnout signal progression stays at Early stage or better; no founder reaches Late stage

---

## Scope & Limitations

- **In scope:** Founder personal development, archetype identification, delegation coaching, energy management, calendar optimization, leadership evolution, blind spot detection, imposter syndrome support, mental health awareness, succession planning
- **Out of scope:** Clinical therapy (refer to licensed therapist for mental health treatment); couples counseling for co-founder relationships (refer to specialized mediator); executive recruiting (use CHRO Advisor); compensation design; legal aspects of founder transitions
- **Limitation:** Self-assessment accuracy depends on founder honesty; 360 feedback provides external validation
- **Limitation:** Growth ceiling model is stage-based approximation; actual ceilings vary by industry, culture, and individual
- **Limitation:** Wellness indicators are screening tools, not clinical diagnostics; always refer to professionals for mental health concerns

---

## Integration Points

| Skill | Integration | Data Flow |
|-------|-------------|-----------|
| `executive-mentor` | Stress-testing founder decisions reveals development needs | Mentor challenges → Coach development areas |
| `ceo-advisor` | Strategic leadership development aligns with CEO advisory | Coach leadership gaps → CEO strategic focus |
| `chro-advisor` | Executive team hiring criteria informed by founder blind spots | Coach archetype gaps → CHRO hiring profile |
| `culture-architect` | Founder behavior directly shapes culture | Coach behavior changes → Culture evolution |
| `chief-of-staff` | Chief of Staff can handle delegation overflow | Coach delegation plan → CoS task assignment |
| `org-health-diagnostic` | People health dimension reflects founder leadership quality | Health people score → Coach priority areas |

---

## Python Tools

| Tool | Purpose | Usage |
|------|---------|-------|
| `scripts/startup_stage_assessor.py` | Assess current startup stage and identify the founder growth ceiling being approached | `python scripts/startup_stage_assessor.py --headcount 35 --arr 1200000 --stage series-a --json` |
| `scripts/founder_wellness_checker.py` | Screen for burnout signals across early/mid/late stages with actionable recommendations | `python scripts/founder_wellness_checker.py --hours-per-week 65 --sleep-hours 5.5 --exercise-days 1 --json` |
| `scripts/milestone_tracker.py` | Track founder development milestones across delegation, leadership evolution, and succession readiness | `python scripts/milestone_tracker.py add --category delegation --milestone "Hired first manager" --json` |

---

## general-counsel-advisor

Source path: `references/c-level-advisor/general-counsel-advisor/SKILL.md`

# General Counsel Advisor

The agent acts as a fractional General Counsel, providing legal strategy
and operating-model guidance grounded in modern in-house counsel patterns,
contract lifecycle management practices, and the regulatory landscape
relevant to mid-to-late-stage technology and healthcare companies.

This skill is strategic in scope. It is **not** a substitute for licensed
legal advice on a specific matter. For execution-level legal skills (NDA,
DPIA, breach response, contract review), see the `legal/` domain.

## When to use this skill

- Defining the **legal strategy** for the next 12–24 months
- Scoring **legal risk** across categories (commercial, regulatory, IP,
  privacy, employment, M&A, litigation)
- Designing the **legal operating model**: in-house vs outside counsel mix,
  embedded vs central, business-aligned vs product-aligned
- Auditing the **contract portfolio**: counterparty concentration,
  liability exposure, renewals, deviations from standards
- Building or refreshing the **regulatory calendar** for the company's
  jurisdictions and product areas
- Preparing the **legal section of the board deck** (matters, exposures, asks)

## Inputs the advisor expects

- Company stage, sector, jurisdictions
- Existing legal team composition (in-house roles, outside counsel panel, budget)
- Critical regulatory exposure (GDPR, sector regs, export controls, sanctions)
- Active litigation, pre-litigation matters, IP disputes
- Contract portfolio overview: vendor + customer counts, MSAs, deviations
- M&A posture: history, pipeline, integration backlog
- Top business stakeholders + frictions (CEO, CFO, CRO, CTO, CISO, CHRO)

## Workflows

### Workflow 1 — Score legal risk across 7 categories

1. Pull current state across the categories with severity/likelihood per item.
2. Run `legal_risk_register.py` to produce a register with prioritization,
   suggested owners, and review cadence.
3. Translate top entries into the legal section of board / audit committee reporting.

```bash
python3 general-counsel-advisor/scripts/legal_risk_register.py \
  --input legal_risk_inputs.json --format markdown
```

### Workflow 2 — Audit the contract portfolio

1. Pull all active contracts with counterparty, value, term, liability cap,
   indemnity posture, governing law, and any standard deviations.
2. Run `contract_portfolio_analyzer.py` to expose concentration,
   exposure, deviation rate, and upcoming renewals.
3. Use output to prioritize commercial renegotiations and process changes.

```bash
python3 general-counsel-advisor/scripts/contract_portfolio_analyzer.py \
  --input contracts.json --format markdown
```

### Workflow 3 — Build the regulatory calendar

1. Capture applicable regimes by jurisdiction and product area,
   plus known upcoming changes.
2. Run `regulatory_calendar_generator.py` to produce a date-ordered
   calendar with owner and action.
3. Distribute to GC team, security, privacy, and operations.

```bash
python3 general-counsel-advisor/scripts/regulatory_calendar_generator.py \
  --input regulatory_inputs.json --format markdown
```

## Decision frameworks

### In-house vs outside counsel mix

The right mix depends on:
- **Frequency** — recurring matters justify in-house
- **Specialization** — niche needs (e.g., FCPA, IPO, sector litigation) stay outside
- **Sensitivity** — board-level and exec matters often stay outside for privilege + perspective
- **Speed** — in-house is faster for commercial; outside is faster for novel issues

A pragmatic mix at Series C: 5–10 in-house FTEs covering commercial,
privacy/security, employment, IP basics, M&A support; a panel of 3–6
specialist firms for litigation, IP, employment escalations, M&A, securities.

### Embedded vs central legal

| Pattern | Fits when | Breaks when |
|---------|-----------|-------------|
| Central legal | Early stage, single-product | Business teams build workarounds |
| Embedded (BU-aligned) | Multi-product, large BUs | Standards drift; risk concentrates |
| Hub-and-spoke | Default for ≥ Series C | Need clear standards and routing |
| Product-aligned | Heavy product/regulatory overlap (e.g., medtech) | Cost; risk of duplication |

### Build-vs-buy for legal tech

- **CLM (Contract Lifecycle Management):** buy at ≥ 500 contracts/year
- **eBilling:** buy at ≥ $2M outside-counsel spend
- **Matter management:** buy at ≥ 50 active matters
- **Privacy / DSAR automation:** buy when regulatory exposure is meaningful
- **GenAI assist for drafting / review:** buy with strict no-training terms

## Common engagements

### "Help me make the case for an in-house GC"
1. Quantify outside-counsel spend vs hire cost (typically break-even ~$1.5M+ annual spend).
2. Map matters to in-house-handleable vs outside-only.
3. Make the operating-model recommendation: GC + 1–2 commercial counsel + privacy/sec FTE.

### "We're being sued"
1. Engage outside counsel immediately; preserve privilege.
2. Issue litigation hold; coordinate with IT and CISO.
3. Initial board notification + regular cadence (monthly minimum).
4. Define the matter strategy: defend / settle / counterclaim, with budget envelope.
5. Track in the litigation register.

### "We're doing an acquisition"
1. Diligence streams: corporate, IP, employment, privacy, security, regulatory, commercial.
2. Pull standard reps & warranties pack from prior deals.
3. Identify deal-specific risk (regulated industry, cross-border, antitrust).
4. Plan integration legal workstream from day one.

### "Help me build the GC board section"
1. Top 3 matters (status, exposure, next event).
2. Regulatory updates affecting the business (with planned response).
3. Risk register summary (top 5 by exposure).
4. Asks: usually authority change, budget for a tool / hire, or board decision request.

## Anti-patterns to avoid

- **GC reporting to CFO at scale.** Below ~$50M ARR it works; above, the GC needs CEO access for privilege and judgment calls.
- **Legal as gatekeeper.** Legal that says "no" without offering a path is replaced with workarounds.
- **No standard MSA / DPA.** Every deal becomes bespoke; renewals are painful.
- **Litigation as a surprise.** A pipeline of pre-litigation matters should be tracked monthly.
- **Outside counsel without budgets.** Spend balloons; matter creep.
- **Risk register that never gets reviewed.** Quarterly review with named owners.
- **Privacy / security treated as wholly separate.** GC should sit on the AI council, the DPO's office, and CISO program reviews.

## References

- `references/legal-strategy-and-risk.md` — legal strategy framing, risk taxonomy, operating model
- `references/contract-and-commercial-governance.md` — CLM, standards, deviations, portfolio
- `references/regulatory-and-litigation-management.md` — regulatory tracking, litigation, M&A legal

## Related skills

- `c-level-advisor/ceo-advisor` — board / governance overlap
- `c-level-advisor/cfo-advisor` — securities, audit committee
- `c-level-advisor/ciso-advisor` — security incident + breach
- `c-level-advisor/chro-advisor` — employment matters
- `c-level-advisor/chief-ai-officer-advisor` — AI governance + EU AI Act
- `c-level-advisor/chief-data-officer-advisor` — data governance and privacy
- `legal/contract-review` — execution-level contract review
- `legal/breach-response` — execution-level breach handling
- `legal/dpia-builder` — execution-level DPIA
- `ra-qm-team/gdpr-dsgvo-expert` — deep privacy implementation
- `ra-qm-team/eu-ai-act-specialist` — high-risk AI conformity

## Output expectations

When the advisor runs, you should walk away with:

1. A clear **point of view** (with appropriate disclaimers about jurisdiction)
2. **2–4 concrete next actions** with owners and timelines
3. **Open questions** that materially change the recommendation
4. References to scripts and reference docs that deepen the analysis

---

## internal-narrative

Source path: `references/c-level-advisor/internal-narrative/SKILL.md`

# Internal Narrative Builder

**Tier:** POWERFUL
**Category:** C-Level Advisory
**Tags:** company narrative, internal communications, all-hands, investor updates, crisis communication, change management

## Overview

One company. Many audiences. Same truth -- different lenses. The Internal Narrative Builder creates and maintains coherent communication across every stakeholder group. Narrative inconsistency is trust erosion: when employees hear one story and investors hear another, it is not strategic framing -- it is a trust debt that compounds until someone catches it.

---

## Core Principle

**The same fact lands differently depending on who hears it and what they need.**

"We are shifting resources from Product A to Product B" means:
- **Employees:** "Is my job safe? Why are we abandoning what I built?"
- **Investors:** "Smart capital allocation -- they are doubling down on the winner."
- **Customers (Product A):** "Are they abandoning us?"
- **Candidates:** "Decisive leadership -- exciting new focus."
- **Partners:** "Does this affect our integration?"

Same fact. Five narratives needed. The skill is maintaining truth while serving each audience's actual question.

---

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The situation type** (routine update, all-hands, investor update, pivot/reorg, or crisis) — determines which framework and template you use and the urgency of the cadence
- [ ] **Which audiences must hear this** (employees, investors, customers, candidates, partners) — each gets its own column in the translation matrix with a different frame of the same fact
- [ ] **The core facts and current state** (honest metrics, what changed, what's good and bad) — every audience narrative derives from one true core; vague facts produce hollow narrative
- [ ] **Any prior public statements on this topic** (last investor update, last all-hands) — needed to run contradiction detection before the new communication ships

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Framework

### Step 1: Build the Core Narrative

One paragraph that every other communication derives from. This is the single source of truth.

**Template:**
```
[Company] exists to [mission -- present tense, specific].
We are building [what] because [the problem, stated concretely].
Our approach is [what makes your way different].
We are at [honest description of current state] and heading toward
[where you are going, in concrete measurable terms].
```

**Good example:**
> Acme Health exists to reduce preventable falls in elderly care using smartphone-based mobility analysis. We are building an AI diagnostic tool for care teams because current fall risk assessments are subjective, infrequent, and often wrong. Our approach -- using the phone camera during a 10-second walking test -- means no new hardware and no specialist required. We have 80 care facilities in DACH paying us EUR 800K ARR, and we are heading to EUR 3M ARR by demonstrating clinical value at scale before our Series B.

**Bad example:**
> Acme Health is an innovative AI company revolutionizing elderly care through cutting-edge technology that empowers care providers.

The good version is usable. The bad version says nothing.

### Step 2: Audience Translation Matrix

Take the core narrative and translate for each audience. Same truth, different frame.

| Fact | Employees | Investors | Customers | Candidates | Partners |
|------|----------|----------|-----------|-----------|---------|
| 80 customers | "Your work matters -- we have proven the model" | "PMF signal, capital efficient growth" | "80 facilities trust us" | "Traction you would be joining" | "Growing ecosystem" |
| Pivoted from hardware | "We were honest enough to change course" | "Better unit economics, capital efficient" | "Faster, simpler way to serve you" | "Evidence-based decisions, not ego" | "More accessible integration" |
| Missed Q2 revenue | "Here is why, the plan, and how you can help" | "Revenue mix shifted, trailing indicators improving" | [Not shared unless relevant] | [Not shared externally] | [Not shared] |
| Hiring fast | "Team is growing, your network matters" | "Headcount aligned to growth plan" | [Only if affects service quality] | "Rocket ship moment" | "Expanding capacity" |

**Critical rule:** Different framing is not different facts. "We told investors growth and told employees efficiency" is a contradiction. People talk to each other.

### Step 3: Contradiction Detection Protocol

Before any major communication, run this check:

**Question 1:** What did we tell investors last quarter about this topic?
**Question 2:** What did we tell employees at the last all-hands?
**Question 3:** Are these consistent? If not -- which version is true?

**Common contradictions to catch:**

| Contradiction | Audiences | Why Dangerous |
|--------------|-----------|---------------|
| "Efficient growth" to investors + "hiring aggressively" to candidates | Investors vs candidates | Candidates talk to investors at events |
| "Strong pipeline" to investors + "sales is struggling" at all-hands | Investors vs employees | Board members visit offices |
| "Customer-first culture" + decisions clearly prioritizing revenue | External vs internal | Employees see through performative values |
| "Stable and growing" to customers + "runway concerns" to board | Customers vs board | Customers hear rumors |
| "World-class team" to investors + high turnover internally | Investors vs reality | Due diligence reveals truth |

**When you catch a contradiction:** Fix the less accurate version. Communicate the correction explicitly. "Last month I said X. After more analysis, the clearer picture is Y." Correcting yourself before someone catches it builds more trust than being caught.

### Step 4: Communication Cadence

| Audience | Format | Frequency | Owner | Key Content |
|----------|--------|-----------|-------|-------------|
| All employees | All-hands meeting | Monthly | CEO | State of company, wins, challenges, Q&A |
| Teams | Team standup/update | Weekly | Team leads | Team-specific progress and blockers |
| Investors | Written update | Monthly | CEO + CFO | Metrics, narrative, asks |
| Board | Board meeting + memo | Quarterly | CEO | Strategy, financials, key decisions |
| Customers | Product updates | Per release | CPO / CS | What changed, what is coming |
| Candidates | Careers page + interviews | Ongoing | CHRO + Founders | Why join, culture, mission |
| Partners | Business review | Quarterly | BD / Partnerships | Joint metrics, roadmap alignment |

### Step 5: All-Hands Design

The all-hands is the most important recurring internal communication. Most companies get it wrong.

**Structure (60 minutes):**

| Segment | Duration | Content |
|---------|----------|---------|
| State of the company | 10 min | Honest assessment -- good and bad |
| Key metrics | 5 min | 3-5 metrics everyone should know, with context |
| Wins and recognition | 10 min | Connect team work to company outcomes |
| Challenges and plan | 10 min | What is not working and what we are doing about it |
| Strategic update | 10 min | Where we are headed and why |
| Open Q&A | 15 min | Unscreened, unfiltered questions |

**All-Hands Principles:**
1. Lead with honest state. No spin. Employees detect inauthenticity instantly.
2. Connect metrics to people: "Sarah's team shipped X, which drove Y."
3. Give people a reason to be proud of their choice to work here.
4. Leave real time for Q&A -- not curated questions, not "any quick questions?"
5. Follow up on unanswered questions within 48 hours.

**All-Hands Failure Modes:**

| Failure | Signal | Fix |
|---------|--------|-----|
| CEO monologue | 55 of 60 minutes is one person talking | Max 30 min presentation, rest is interactive |
| Sunshine and rainbows | Only good news, every metric is "great" | Include one honest challenge and its plan |
| Metrics without context | "ARR grew 15%" with no benchmark | Always: metric + context + what it means |
| Deflected questions | "Great point, let's follow up" (never followed up) | Answer or commit to written follow-up by date |
| No employee voice | Leadership talks, employees listen | Include team demos, recognition, Q&A |
| Slides over substance | 50 slides of bullet points | Max 15 slides, mostly visuals and charts |

### Step 6: Investor Update Template

Monthly investor updates should be concise, honest, and actionable.

```
Subject: [Company] Monthly Update - [Month Year]

TL;DR: [One sentence -- honest state of things]

METRICS:
  MRR/ARR: $[X] ([+/-Y]% MoM)
  Burn: $[X]/month
  Runway: [X] months
  Key Metric: [Your North Star] at [value]

WINS:
  - [Specific win with context]
  - [Specific win with context]

CHALLENGES:
  - [Honest challenge with your plan to address it]

ASKS:
  - [Specific ask: intro, hire, advice]
  - [Specific ask]

NEXT MONTH FOCUS:
  - [Priority 1]
  - [Priority 2]
```

**Rules:**
- Send on the same date every month (builds trust through consistency)
- Include challenges -- investors respect honesty, distrust all-good-news updates
- Make asks specific -- "intro to head of product at Stripe" not "intros to SaaS companies"
- Keep under 500 words -- investors read dozens of these

### Step 7: Crisis Communication

When the narrative breaks -- someone leaves publicly, a product fails, a security breach, negative press.

**The 4-Hour Rule:** If something is public or about to be, communicate internally within 4 hours. Employees should never learn about company news from social media or press.

**Crisis Communication Sequence:**

**Hour 0-4 (Internal First):**
```
1. CEO or relevant leader sends internal message
2. Acknowledge what happened -- factual, no spin
3. State what you know and what you don't know yet
4. Tell people what you are doing about it
5. Tell people what to say if asked externally
6. Commit to next update by specific time
```

**Hour 4-24 (External If Needed):**
```
1. External statement only if event is public
2. Consistent with internal message -- same facts, audience-appropriate framing
3. Legal review if any claims or liability involved
4. Single spokesperson designated
```

**Crisis Internal Template:**
```
Team,

Here is what happened: [factual description, no editorializing]

Here is what we know right now: [confirmed facts]

Here is what we don't know yet: [honest uncertainty]

Here is what we are doing: [specific actions with owners]

If you are asked about this externally: [specific guidance]

I will update you by [specific time] with more information.

[Name]
```

**Crisis Don'ts:**
- Silence (vacuum fills with speculation)
- Spin (people detect it, trust dies)
- "No comment" (implies guilt)
- Blaming (your audience only cares what you are doing about it)
- Deleting social media comments (people screenshot, makes it worse)
- Humor (read the room)

---

## Narrative Consistency Checklist

Run before any major external communication:

- [ ] Consistent with what we told investors last quarter?
- [ ] Consistent with what we told employees at last all-hands?
- [ ] Contradicts anything on website, careers page, or press releases?
- [ ] If an employee read this external communication, would they recognize the company described?
- [ ] If an investor read our internal all-hands deck, would they find inconsistencies?
- [ ] Are we describing current state accurately or projecting an aspiration as reality?
- [ ] Does the tone match the reality? (Celebratory tone with mediocre results is a contradiction.)

---

## Change Communication Framework

When communicating significant changes (reorgs, pivots, layoffs, policy changes):

### The ADKAR Model for Change

| Stage | Communication Need | Example |
|-------|-------------------|---------|
| **Awareness** | Why is this change happening? | "Our market shifted. Here is the data." |
| **Desire** | Why should I support it? | "This protects our future. Here is how." |
| **Knowledge** | What do I need to know? | "Your role changes from X to Y." |
| **Ability** | Can I actually do this? | "Training starts Monday. Support available." |
| **Reinforcement** | Is this working? | "30 days in: here is the progress." |

### Communication Sequence for Major Changes

```
Day -1:  Brief leadership team (they need to be able to answer questions)
Day 0:   All-hands announcement (CEO, with full context)
Day 0:   Written follow-up (email with details, FAQ)
Day 1-3: Team-level discussions (managers address team-specific impact)
Day 7:   Follow-up Q&A session (address questions that emerged)
Day 30:  Progress update (what changed, what is working)
```

---

## Red Flags

Watch for these signs that narrative is fracturing:

- Different departments describe the company mission differently
- Investor narrative emphasizes growth while employee narrative emphasizes stability (or vice versa)
- All-hands presentations are mostly slides, mostly one-way
- Q&A questions are screened or consistently deflected
- Bad news reaches employees through Slack rumors before leadership communicates
- Careers page describes a culture employees do not recognize
- Executives give different answers to "what is our top priority?"
- "That is the external messaging" is said internally without irony

---

## Integration with C-Suite Skills

| Situation | Collaborate With | Alignment Needed |
|-----------|-----------------|------------------|
| Investor update prep | CFO Advisor | Financial narrative matches company narrative |
| Reorg / leadership change | CEO + CHRO | Employees hear first, then external |
| Product pivot | CPO / Product Team | Customer communication aligns with investor story |
| Crisis | All C-suite | Single voice, consistent story, internal first |
| Fundraise narrative | CEO + CFO | Growth story consistent with burn and metrics |
| Recruiting push | CHRO + CEO | Candidate narrative matches employee experience |

---

## Related Skills

| Skill | Use When |
|-------|----------|
| **ceo-advisor** | Strategic decisions that need to be communicated |
| **cfo-advisor** | Financial narrative for investors and board |
| **scenario-war-room** | Crisis scenarios that may require communication plans |
| **cs-onboard** | Building the foundational company context that feeds all narratives |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Employees describe the company mission differently across departments | Core narrative not established or not communicated with enough frequency | Rebuild core narrative using Step 1 template; communicate through 7+ channels; re-test with 5-person test after 2 weeks |
| Investor update and all-hands deck tell conflicting stories | Different authors without shared source-of-truth document | Create single core narrative document; all communications must derive from it; run contradiction detection before every external communication |
| All-hands Q&A produces only softball questions | Employees don't trust that honest questions are safe | Switch to anonymous question submission; answer the hardest question first; CEO models vulnerability by sharing a mistake |
| Crisis communication arrives after employees see it on social media | No 4-hour rule in place or no internal communication chain | Establish internal-first protocol with pre-drafted templates; designate single spokesperson; practice crisis drills quarterly |
| Change communication met with cynicism ("another reorganization") | Past changes communicated without follow-through on ADKAR reinforcement stage | Include 30-day progress update in every change plan; reference previous successful changes as evidence |
| Careers page describes a culture employees don't recognize | Marketing owns careers page without HR/employee input | Co-create careers content with current employees; include real employee stories; audit annually against engagement survey data |
| Stakeholder groups receiving inconsistent messaging about company priorities | No audience translation matrix maintained | Build and maintain the translation matrix from Step 2; review before every major communication cycle |

---

## Success Criteria

- 5-person articulation test scores 8/10 or higher (4+ of 5 people give consistent answers about company priority)
- Contradiction detection protocol catches zero unresolved contradictions before major external communications
- All-hands open Q&A produces at least 5 unscreened questions per session with substantive CEO responses
- Investor updates sent on same date each month with < 500 words and at least one honest challenge included
- Crisis internal communication delivered within 4 hours of event becoming known, every time
- Change communication follows full ADKAR sequence with measurable reinforcement at 30 days
- Employee engagement survey shows "I understand company direction" scores above 80%

---

## Scope & Limitations

- **In scope:** Core narrative construction, audience translation, contradiction detection, all-hands design, investor update templates, crisis communication frameworks, change communication using ADKAR, communication cadence design
- **Out of scope:** PR and media relations strategy (use CMO Advisor); legal review of external statements (use legal counsel); employer branding campaigns (use CHRO Advisor); social media content strategy
- **Limitation:** Narrative consistency requires ongoing maintenance; a one-time exercise degrades within 1-2 quarters without reinforcement
- **Limitation:** Crisis communication templates are starting points; legal review is always required for statements involving liability
- **Limitation:** Framework assumes good-faith leadership; narrative architecture cannot fix fundamentally dishonest communication

---

## Integration Points

| Skill | Integration | Data Flow |
|-------|-------------|-----------|
| `ceo-advisor` | CEO strategic decisions require narrative communication | CEO decisions → Narrative framing for each audience |
| `cfo-advisor` | Financial narrative for investors must align with company narrative | CFO metrics → Investor update narrative |
| `cmo-advisor` | External marketing narrative must match internal story | Narrative core → Marketing messaging alignment |
| `chro-advisor` | Recruiting narrative must reflect employee reality | Narrative careers content → CHRO validation |
| `scenario-war-room` | Crisis scenarios require pre-built communication plans | War room scenarios → Crisis narrative templates |
| `strategic-alignment` | Strategy cascade depends on clear narrative communication | Narrative clarity → Alignment articulation test |
| `change-management` | Every change initiative requires narrative support | Change plan → Narrative ADKAR communication |

---

## Python Tools

| Tool | Purpose | Usage |
|------|---------|-------|
| `scripts/narrative_consistency_checker.py` | Check two or more communication texts for factual contradictions and tone mismatches | `python scripts/narrative_consistency_checker.py --texts investor_update.txt allhands_deck.txt --json` |
| `scripts/messaging_framework_generator.py` | Generate an audience translation matrix from a core narrative statement | `python scripts/messaging_framework_generator.py --narrative "We are shifting from product A to product B" --audiences employees,investors,customers --json` |
| `scripts/stakeholder_mapper.py` | Map stakeholders by influence, interest, and communication needs | `python scripts/stakeholder_mapper.py add --name "Board of Directors" --influence high --interest high --frequency quarterly --json` |

---

## intl-expansion

Source path: `references/c-level-advisor/intl-expansion/SKILL.md`

# International Expansion

Frameworks for expanding into new markets: selection, entry mode, localization, regulatory compliance, GTM adaptation, and execution. Every expansion is a bet -- this skill structures the bet to maximize signal before committing resources.

## Keywords

international expansion, market entry, localization, go-to-market, GTM, regional strategy, international markets, market selection, cross-border, global expansion, EMEA, APAC, LATAM, data residency, local entity, regional hiring, currency, payment methods, regulatory compliance

---

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which deliverable is needed** (market scoring, entry-mode recommendation, localization plan, regulatory map, pricing, or launch plan) — each follows a different framework
- [ ] **The target market(s) under consideration** — regional regulatory, cultural-distance, and pricing guidance is country-specific
- [ ] **Existing traction in that market** (inbound demand, current ARR from it) — the entry-mode graduation path is gated on revenue thresholds; pull vs. push changes the go/no-go
- [ ] **Product type and home-market model** (B2B SaaS vs. other; PLG vs. sales-led) — the frameworks are tuned for B2B SaaS and the GTM adaptation depends on the current model

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## Decision Sequence

```
Market Selection --> Entry Mode --> Regulatory Assessment --> Localization Plan
  --> GTM Strategy --> Team Structure --> Launch --> Scale or Exit
```

---

## Market Selection Framework

### Scoring Matrix

| Factor | Weight | Assessment Method | Score 1-5 |
|--------|--------|------------------|-----------|
| Market size (addressable) | 25% | TAM in target segment, willingness to pay, growth rate |
| Competitive intensity | 20% | Incumbent strength, number of alternatives, market gaps |
| Regulatory complexity | 20% | Barriers to entry, compliance cost, timeline to launch |
| Cultural distance | 15% | Language, business practices, buying behavior, sales cycle |
| Existing traction | 10% | Inbound demand, existing customers, partnership signals |
| Operational complexity | 10% | Time zones, infrastructure, payment systems, talent pool |

### Market Selection Decision Tree

```
START: Considering a new market
  |
  v
[Is there existing pull from this market?]
  |
  +-- YES (inbound demand, existing customers) --> Strong signal. Score and proceed.
  |
  +-- NO  --> [Is there a strategic reason to enter?]
              |
              +-- YES (competitor pressure, investor expectation) --> Score carefully.
              |    Be honest about push vs. pull.
              |
              +-- NO  --> Do not enter. Focus on existing markets.
```

### Regional Quick Reference

| Region | Market Size | Regulatory Complexity | Cultural Distance (from US) | Key Considerations |
|--------|------------|----------------------|---------------------------|-------------------|
| UK/Ireland | Large | Medium | Low | English-speaking, strong tech ecosystem, Brexit considerations |
| DACH (DE/AT/CH) | Large | High | Medium | Data privacy strict, enterprise-heavy, German language needed |
| Nordics | Medium | Medium | Low-Medium | Tech-savvy, English common, smaller market size |
| France | Large | High | Medium | Language required, strong labor laws, cultural nuances |
| Benelux | Medium | Medium | Low-Medium | Multilingual, hub for European operations |
| Japan | Very Large | Very High | High | Requires local partner, long sales cycles, relationship-heavy |
| Singapore/SEA | Medium-Large | Medium | Medium | Regional hub, English common, diverse sub-markets |
| Australia/NZ | Medium | Low | Low | English-speaking, similar business culture, timezone challenge |
| Brazil | Large | Very High | High | Portuguese required, complex tax, large opportunity |
| India | Very Large | High | Medium | Price-sensitive, English common, massive scale potential |

---

## Entry Mode Evaluation

### Entry Mode Comparison

| Mode | Investment | Control | Risk | Speed | Best For |
|------|-----------|---------|------|-------|----------|
| Remote sales (export) | Low ($10-50K) | Low | Low | Fast | Testing demand before committing |
| Partnership/reseller | Medium ($50-200K) | Medium | Medium | Medium | Markets with strong local requirements |
| Local hire (no entity) | Medium ($100-300K) | Medium-High | Medium | Medium | First boots on the ground |
| Full entity (subsidiary) | High ($200K-1M) | Full | High | Slow | Major markets with proven demand |
| Acquisition | Highest ($500K+) | Full | Highest | Fast (if done well) | Immediate market presence + customer base |

### Entry Mode Decision Tree

```
START: Market selected, entry mode needed
  |
  v
[Do you have existing customers in this market?]
  |
  +-- NO  --> Start with Remote Sales
  |            Test demand for 3-6 months
  |            If revenue > $200K ARR from market --> Upgrade
  |
  +-- YES --> [Revenue from this market > $500K ARR?]
              |
              +-- NO  --> Remote Sales or Local Hire (EOR)
              |
              +-- YES --> [Does the market require local entity?]
                          |
                          +-- YES (regulatory requirement) --> Full Entity
                          +-- NO  --> [Revenue trajectory?]
                                      |
                                      +-- Growing fast --> Local Hire, plan Entity
                                      +-- Stable --> Partnership or Local Hire
```

### Default Graduation Path

```
Stage 1: Remote Sales ($0-200K ARR from market)
  - Sell remotely from HQ
  - No local presence
  - Test messaging, pricing, ICP fit

Stage 2: Local Hire ($200K-500K ARR)
  - 1-2 people via EOR (Employer of Record)
  - Sales + CS representative
  - No legal entity yet

Stage 3: Local Entity ($500K-2M ARR)
  - Establish legal entity
  - Hire local team (3-8 people)
  - Local banking, contracts, compliance

Stage 4: Regional Hub ($2M+ ARR)
  - Full local team (10+ people)
  - Regional leadership
  - Market-specific product features
```

---

## Localization Framework

### Product Localization

| Layer | Must Have | Nice to Have | Cost Impact |
|-------|----------|-------------|-------------|
| Language (UI) | Full translation of core product | Marketing site in local language | $20-50K initial |
| Currency | Display and charge in local currency | Multi-currency invoicing | $10-30K engineering |
| Payment methods | Credit card + local preferred method | All local payment methods | $5-20K per method |
| Data formats | Date, time, number, address | Local units (km, kg, etc.) | $5-15K engineering |
| Data residency | If legally required | If customer-required | $50-200K infrastructure |
| Cultural adaptation | Avoid cultural missteps | Full cultural optimization | Variable |

### GTM Localization

| Element | Approach | Common Mistake |
|---------|----------|----------------|
| Messaging | Adapt value proposition for local pain points | Copy-paste from home market |
| Channel strategy | Research local channels (may differ significantly) | Assume same channels work everywhere |
| Case studies | Local customer references essential | Only showing US/UK case studies |
| Partnerships | Local integrations and ecosystem | Ignoring local tech ecosystem |
| Events | Regional conferences and meetups | Only attending global events |
| Content/SEO | Local language content, local domain | English-only content for non-English market |

### Operations Localization

| Area | Key Considerations |
|------|-------------------|
| Legal entity | Type, timeline, cost, ongoing compliance |
| Tax compliance | VAT/GST registration, transfer pricing, withholding |
| Employment law | At-will vs. strong protections, notice periods, benefits |
| Customer support | Hours, language, channels |
| Banking | Local bank account, payment processing |
| Insurance | Local requirements for entity and employees |

---

## Regulatory Compliance by Region

### Data Privacy Requirements

| Regulation | Region | Key Requirements | Penalty |
|-----------|--------|------------------|---------|
| GDPR | EU/EEA | Consent, data minimization, DPO, breach notification | Up to 4% annual revenue |
| UK GDPR | UK | Similar to GDPR, separate registration | Up to 4% annual revenue |
| LGPD | Brazil | Similar to GDPR, DPO required | Up to 2% revenue (capped R$50M) |
| PIPL | China | Data localization, consent, cross-border assessment | Up to 5% annual revenue |
| PIPA | South Korea | Consent, purpose limitation, data localization for some | Up to 3% of related revenue |
| APPI | Japan | Consent, purpose specification, cross-border transfer rules | Criminal penalties possible |
| Privacy Act | Australia | APPs, breach notification, cross-border transfer rules | Increasing penalties |

### Data Residency Decision Tree

```
START: Expanding to new region
  |
  v
[Does local law require data residency?]
  |
  +-- YES (e.g., certain China, Russia, some industry regs)
  |     --> Local hosting mandatory. Budget for local infrastructure.
  |
  +-- NO  --> [Do target customers require local data hosting?]
              |
              +-- YES (common in enterprise, government, healthcare)
              |     --> Offer regional hosting as option. Major sales enabler.
              |
              +-- NO  --> Global hosting acceptable. Document your data practices.
```

---

## International GTM Strategy

### Pricing Strategy by Market

| Approach | When | Example |
|----------|------|---------|
| Global uniform pricing | Simple product, global ICP | Same price everywhere |
| PPP-adjusted | Consumer product, price-sensitive markets | Lower prices in developing markets |
| Market-specific | Different value perception by market | Higher in markets with less competition |
| Local currency, global rate | B2B SaaS, enterprise | Price in local currency, USD-equivalent |

### Sales Model Adaptation

| Market Characteristic | Sales Model Adjustment |
|----------------------|----------------------|
| High-trust culture (Nordics, Japan) | Longer relationship building, more proof points |
| Price-sensitive market (India, LATAM) | Flexible pricing, usage-based options |
| Channel-dominant (Japan, Middle East) | Partner-led sales, local reseller required |
| Enterprise-heavy (DACH, France) | On-premises option, compliance documentation |
| PLG-friendly (US, UK, Nordics) | Self-serve with local payment methods |

---

## Common Mistakes

| Mistake | Why It Happens | Prevention |
|---------|---------------|------------|
| Entering too many markets at once | FOMO, board pressure | Maximum 1-2 new markets per year |
| Copy-paste GTM from home market | Assuming buyers are the same | Research local buying behavior first |
| Underestimating regulatory cost | "We'll figure it out" | Regulatory assessment BEFORE committing |
| Hiring local team too early | Optimism about demand | Prove $200K+ ARR from market first |
| Wrong pricing (just converting) | Laziness or assumption | Research local willingness to pay |
| Ignoring local competition | Focused on global competitors | Local players often dominate segments |
| Underestimating cultural distance | "Business is business everywhere" | Invest in local market expertise |
| No exit criteria | Sunk cost fallacy | Define revenue milestone to hit within 12 months |

---

## Launch Checklist

### Pre-Launch (T-90 days to T-30 days)

| Category | Item | Status |
|----------|------|--------|
| Legal | Entity established (if needed) | [ ] |
| Legal | Local contracts reviewed by local counsel | [ ] |
| Compliance | Data privacy requirements met | [ ] |
| Compliance | Tax registration completed | [ ] |
| Product | Core product localized (language, currency) | [ ] |
| Product | Local payment methods integrated | [ ] |
| Sales | ICP defined for local market | [ ] |
| Sales | Pricing set for local market | [ ] |
| Marketing | Local messaging and positioning | [ ] |
| Marketing | Local case studies (or adjacent) | [ ] |
| People | First local hire identified | [ ] |
| Support | Support coverage plan for timezone | [ ] |

### Launch (T-0 to T+90 days)

| Week | Focus | Success Metric |
|------|-------|----------------|
| 1-4 | Activate local presence, first outreach | 20+ qualified conversations |
| 5-8 | First pipeline built, first deals | 5+ opportunities in pipeline |
| 9-12 | First customers closed, iterate | 2+ closed deals, product feedback |

### Exit Criteria

If these are not met within 12 months, evaluate exit:

| Metric | Minimum Threshold |
|--------|-------------------|
| Pipeline generated | $500K+ |
| Revenue closed | $200K+ ARR |
| Customer satisfaction | NPS > 20 in market |
| Cost of entry | < 3x first-year revenue |

---

## Red Flags

- Entering a market because a board member suggested it (without data)
- No local market research before committing resources
- Pricing set by currency conversion, not local value research
- Hiring a country manager before proving demand
- Legal entity established before $200K ARR from market
- Ignoring local data privacy requirements
- Same marketing messaging as home market
- No exit criteria defined before entry

---

## Integration with C-Suite

| Role | Contribution to Expansion |
|------|--------------------------|
| CEO (`ceo-advisor`) | Market selection decision, strategic commitment |
| CFO (`cfo-advisor`) | Investment sizing, ROI modeling, entity structure, tax |
| CRO (`cro-advisor`) | Revenue targets, sales model adaptation, pricing |
| CMO (`cmo-advisor`) | Positioning, channel strategy, local brand |
| CPO (`cpo-advisor`) | Localization roadmap, feature priorities |
| CTO (`cto-advisor`) | Infrastructure, data residency, scaling |
| CHRO (`chro-advisor`) | Local hiring, employment law, compensation |
| CISO (`ciso-advisor`) | Data privacy, regulatory compliance |
| COO (`coo-advisor`) | Operations setup, process adaptation |

---

## Output Artifacts

| Request | Deliverable |
|---------|-------------|
| "Should we expand to [market]?" | Market scoring analysis with recommendation |
| "How should we enter [market]?" | Entry mode recommendation with graduation path |
| "Localization plan for [market]" | Product + GTM + operations localization checklist |
| "Regulatory requirements for [region]" | Compliance checklist with timeline and cost |
| "International pricing strategy" | Market-specific pricing recommendation |
| "Launch plan for [market]" | 90-day launch plan with milestones and exit criteria |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Market scores high but pipeline generation is near zero | Market sizing based on TAM not SAM; ICP not validated locally | Re-score using serviceable addressable market; run 20 discovery calls before committing further resources |
| Local hire producing no results after 3 months | Wrong profile (too senior or too junior), insufficient HQ support, or wrong ICP | Assess whether hire has local market expertise AND startup mindset; ensure HQ provides enablement materials and responsive support |
| Regulatory compliance taking 2x longer than planned | Underestimated complexity; no local legal counsel engaged early | Engage local legal counsel in pre-launch phase (T-90); add 50% buffer to all regulatory timelines |
| Localization costs spiraling beyond budget | Scope creep from "nice to have" to "must have"; no phased approach | Apply localization framework layers strictly: Must Have first, Nice to Have only after revenue proves market |
| Pricing not competitive in new market | Direct currency conversion without local willingness-to-pay research | Conduct 10+ pricing conversations with local prospects; consider PPP adjustment or market-specific pricing tier |
| Partnership/reseller underperforming | Partner not incentivized properly or wrong partner profile | Review partner selection criteria; ensure economic alignment (margins); set 90-day performance review with exit clause |
| Cultural missteps damaging brand in new market | No local market expertise on team; copy-paste approach from home market | Hire local advisor or consultant for cultural review; adapt messaging, not just translate it |

---

## Success Criteria

- Market selection scoring produces a clear rank-ordered list with at least 3 candidate markets scored across all 6 factors
- Entry mode selected matches the graduation path: no legal entity before $200K ARR from market
- Pre-launch checklist 100% complete by T-30 days before launch
- First 90 days produce 20+ qualified conversations, 5+ pipeline opportunities, and 2+ closed deals
- Exit criteria defined before market entry with specific revenue and cost thresholds
- Localization phased: Must Have items complete at launch; Nice to Have items gated behind revenue milestone
- Regulatory compliance achieved before first customer contract signed in new market

---

## Scope & Limitations

- **In scope:** Market selection scoring, entry mode evaluation, localization planning (product, GTM, operations), regulatory compliance mapping by region, pricing strategy adaptation, launch planning with exit criteria, team structure decisions
- **Out of scope:** Detailed tax advisory (engage local tax counsel); immigration and visa processing (use specialized provider); transfer pricing implementation (use CFO Advisor with tax expertise); detailed legal entity formation (use local legal counsel)
- **Limitation:** Regional quick reference data is indicative and changes with regulations; always validate with local experts before committing
- **Limitation:** Framework optimized for B2B SaaS companies; B2C, hardware, and marketplace businesses have different expansion dynamics
- **Limitation:** Market scoring is a structured estimate, not a guarantee; validate with real market signals (inbound demand, pilot customers) before major investment

---

## Integration Points

| Skill | Integration | Data Flow |
|-------|-------------|-----------|
| `ceo-advisor` | Market entry is a strategic CEO decision | CEO strategy → Market selection priority |
| `cfo-advisor` | Investment sizing, ROI modeling, entity structure | Expansion budget → CFO financial model |
| `cro-advisor` | Revenue targets and sales model adaptation | Market ICP → CRO sales playbook adaptation |
| `cmo-advisor` | Local positioning and channel strategy | Market research → CMO local GTM plan |
| `cpo-advisor` | Localization roadmap and feature priorities | Localization requirements → CPO product roadmap |
| `ciso-advisor` | Data privacy and regulatory compliance | Regulatory map → CISO compliance checklist |
| `chro-advisor` | Local hiring, employment law, compensation | Market team plan → CHRO local hiring strategy |

---

## Python Tools

| Tool | Purpose | Usage |
|------|---------|-------|
| `scripts/market_readiness_scorer.py` | Score and rank target markets using the 6-factor weighted framework | `python scripts/market_readiness_scorer.py --market "Germany" --market-size 4 --competition 3 --regulatory 2 --cultural-distance 3 --traction 4 --operational 3 --json` |
| `scripts/localization_checklist.py` | Generate a phased localization checklist for a target market | `python scripts/localization_checklist.py --market "Japan" --product-type saas --current-languages en --json` |
| `scripts/regulatory_mapper.py` | Map regulatory requirements by region including data privacy, tax, and employment law | `python scripts/regulatory_mapper.py --region eu --industry saas --data-processing yes --json` |

---

## ma-playbook

Source path: `references/c-level-advisor/ma-playbook/SKILL.md`

# M&A Playbook

Frameworks for both sides of M&A: acquiring companies and being acquired. Every M&A decision starts with strategic rationale -- without it, you are buying problems.

## Keywords

M&A, mergers and acquisitions, due diligence, acquisition, acqui-hire, integration, deal structure, valuation, LOI, term sheet, earnout, data room, strategic rationale, post-merger integration, buyer, seller, exit

---

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which side of the deal** (acquiring vs. being acquired) — the entire playbook, checklists, and red flags differ by side
- [ ] **Which deliverable is needed** (strategic rationale, due diligence, valuation, deal structure, 100-day integration, or sell-side prep) — each has its own framework
- [ ] **What you are really buying or selling** (talent, technology, customers, or market access) — drives the rationale test, the buy-vs-build call, and where DD focuses
- [ ] **The target's core financials** (ARR, growth rate, NRR, customer concentration) — valuation multiples and adjustment factors are keyed to these

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## Acquiring: Decision Framework

### Strategic Rationale Decision Tree

```
START: Acquisition opportunity identified
  |
  v
[What are you really buying?]
  |
  +-- TALENT (acqui-hire)
  |     Cost: $1-3M per key engineer
  |     Timeline: 1-3 months
  |     Risk: Key people leave after lockup
  |
  +-- TECHNOLOGY (product/IP)
  |     Cost: Revenue multiple or technology valuation
  |     Timeline: 3-6 months
  |     Risk: Technology doesn't integrate, team leaves
  |
  +-- CUSTOMERS (market share)
  |     Cost: Revenue multiple (higher for sticky customers)
  |     Timeline: 3-6 months
  |     Risk: Customers churn during transition
  |
  +-- MARKET ACCESS (geographic or vertical)
        Cost: Strategic premium
        Timeline: 6-12 months
        Risk: Market assumptions wrong, cultural clash

For ALL types, ask:
  "Can we build this faster and cheaper?" If YES --> Don't acquire.
  "Is integration complexity worth the shortcut?" If NO --> Don't acquire.
```

### Buy vs. Build Analysis

| Factor | Buy | Build |
|--------|-----|-------|
| Time to market | Fast (months) | Slow (years) |
| Cost | Higher upfront, uncertain total | Lower upfront, predictable |
| Risk | Integration risk, culture clash, key person departure | Execution risk, market timing |
| Control | Lower (inheriting systems and culture) | Higher (building from scratch) |
| Team | Get experienced team immediately | Build team to your culture |

**Decision rule**: Buy when time-to-market matters more than cost. Build when control and culture matter more than speed.

---

## Due Diligence Framework

### Due Diligence by Domain

| Domain | Key Questions | Red Flags | Owner |
|--------|--------------|-----------|-------|
| **Financial** | Revenue quality? Customer concentration? Burn rate? Deferred revenue? | > 30% from 1 customer; declining margins; hidden liabilities | CFO |
| **Technical** | Code quality? Tech debt? Architecture fit? Security posture? | Monolith with no tests; no CI/CD; critical security gaps | CTO |
| **Legal** | IP ownership? Pending litigation? Contract assignability? | Key IP owned by individuals; active lawsuits; non-assignable contracts | Legal counsel |
| **People** | Key person risk? Culture fit? Retention likelihood? | Founders with no lockup; team wants to leave; culture mismatch | CHRO |
| **Market** | Market position? Competitive threats? Customer satisfaction? | Declining market share; commoditizing market; low NPS | CEO/CPO |
| **Customers** | Churn rate? NPS? Contract terms? Expansion potential? | High churn; short contracts; declining usage | CRO/CPO |
| **Product** | PMF evidence? Roadmap alignment? Technical overlap? | No retention data; divergent roadmap; redundant technology | CPO |
| **Security** | Compliance status? Incident history? Data practices? | No SOC 2; history of breaches; poor data handling | CISO |

### Due Diligence Priority Matrix

| Priority | Items | Timeline |
|----------|-------|----------|
| 1 (Deal-breaker) | Financial accuracy, IP ownership, litigation, key person risk | Week 1-2 |
| 2 (Valuation impact) | Revenue quality, churn, tech debt, customer concentration | Week 2-4 |
| 3 (Integration planning) | Culture assessment, technical architecture, process overlap | Week 3-6 |
| 4 (Post-close optimization) | Operational efficiency, vendor contracts, tool consolidation | Week 4-8 |

### Financial Due Diligence Deep Dive

| Metric | What to Verify | Red Flag |
|--------|---------------|----------|
| Revenue recognition | Is revenue recognized properly? Deferred revenue accurate? | Aggressive recognition inflating ARR |
| Customer quality | Weighted average contract length and renewal rate | Short contracts, declining renewals |
| Cohort retention | Do older cohorts retain better or worse? | Worsening retention in newer cohorts |
| Burn rate | All-in cost including one-time items | Hidden costs, one-time items excluded |
| Cash position | Verified bank statements | Discrepancy between reported and actual |
| Liability inventory | All known and contingent liabilities | Undisclosed or underestimated liabilities |

---

## Valuation Methods

### Method Selection

| Method | When to Use | Pros | Cons |
|--------|------------|------|------|
| Revenue multiple | SaaS with growth | Simple, comparable | Ignores profitability |
| ARR multiple | Subscription businesses | Recurring revenue focus | Varies by growth rate |
| DCF | Profitable businesses | Theoretically sound | Highly sensitive to assumptions |
| Comparable transactions | Active M&A market | Market-validated | Finding true comparables is hard |
| Acqui-hire | Talent acquisition | Simple calculation | Ignores IP and customer value |
| Replacement cost | Technology acquisition | Practical baseline | Ignores market position |

### SaaS Revenue Multiple Ranges

| Growth Rate | NRR > 110% | NRR 100-110% | NRR < 100% |
|------------|-----------|-------------|-----------|
| > 100% YoY | 15-25x ARR | 10-18x ARR | 8-12x ARR |
| 50-100% YoY | 8-15x ARR | 6-10x ARR | 4-7x ARR |
| 25-50% YoY | 5-10x ARR | 4-7x ARR | 3-5x ARR |
| < 25% YoY | 3-6x ARR | 2-4x ARR | 1-3x ARR |

**Note**: Multiples vary significantly by market, vertical, and broader market conditions. These are indicative ranges.

### Valuation Adjustment Factors

| Factor | Premium (+) | Discount (-) |
|--------|-----------|-------------|
| Strategic fit | + 10-30% for high synergy | - 10-20% for low synergy |
| Competitive process | + 10-20% for multiple bidders | Baseline for single bidder |
| Key person dependency | -- | - 15-25% if founders critical and reluctant |
| Technical debt | -- | - 10-30% based on remediation cost |
| Customer concentration | -- | - 10-20% if > 25% from one customer |
| IP strength | + 10-20% for strong patents/moat | -- |

---

## Deal Structure

### Key Terms to Negotiate

| Term | Buyer Wants | Seller Wants | Typical Compromise |
|------|-----------|-------------|-------------------|
| Purchase price | Lower, more earnout | Higher, more cash | 60-80% cash, 20-40% earnout |
| Earnout | Long period, hard targets | Short period, easy targets | 12-24 months, achievable with effort |
| Lockup period | Long (24-36 months) | Short (6-12 months) | 18-24 months with milestones |
| Escrow/holdback | Large (15-20%) | Small (5-10%) | 10-15% for 12-18 months |
| Representations | Broad, long survival | Narrow, short survival | 12-18 month survival, materiality thresholds |
| Non-compete | Long (3-5 years), broad | Short (1-2 years), narrow | 2-3 years, reasonable scope |
| Employee treatment | Discretion on offers | Guarantees for team | Offers for key people, best efforts for team |

### Earnout Design Principles

| Principle | Why |
|-----------|-----|
| Metrics must be measurable and auditable | Disputes destroy the relationship |
| Seller must have meaningful control | Unachievable earnouts are disguised price cuts |
| Milestones should be achievable with effort | Too easy = buyer overpaid. Too hard = seller disengages. |
| Payment schedule aligned with milestones | Quarterly or semi-annual, not all at end |
| Dispute resolution mechanism defined upfront | How disagreements are resolved must be in the agreement |

---

## Integration: 100-Day Plan

### Integration Decision: Absorb, Preserve, or Hybrid

| Mode | Description | When | Risk |
|------|------------|------|------|
| Absorb | Fully integrate into acquirer | Product overlap, same ICP | Loss of acquired team culture |
| Preserve | Operate independently | Different market/product, brand value | Missed synergies |
| Hybrid | Shared backend, independent frontend | Complementary products | Complexity in execution |

### 100-Day Integration Timeline

| Phase | Days | Focus | Key Activities |
|-------|------|-------|---------------|
| 1: Stabilize | 0-30 | Retain people, retain customers | Welcome communications, 1:1 with key people, customer outreach |
| 2: Integrate | 30-60 | Systems and process alignment | IT integration, tool consolidation, process mapping |
| 3: Optimize | 60-90 | Synergy realization | Cross-sell, combined roadmap, team optimization |
| 4: Accelerate | 90-100 | Scale combined capabilities | Joint GTM, combined product features, growth investment |

### Day 1 Checklist (Non-Negotiable)

| Item | Owner | Purpose |
|------|-------|---------|
| CEO welcome communication to acquired team | CEO | Set tone, reduce anxiety |
| Customer communication (if public) | CMO + CRO | Retain customer confidence |
| Key person 1:1 meetings scheduled | CHRO + CEO | Retention of critical talent |
| Systems access granted | CTO | Operational continuity |
| Reporting structure clarified | COO | Remove ambiguity immediately |
| Compensation/benefits confirmed | CHRO | Address primary employee concern |

### Integration Anti-Patterns

| Anti-Pattern | Why It Fails | Fix |
|-------------|-------------|-----|
| "We'll figure out integration later" | Creates chaos and attrition | Plan integration before close |
| Imposing acquirer culture immediately | Alienates acquired team | Gradual cultural integration |
| Ignoring acquired team's input | Best people leave feeling unvalued | Include them in integration decisions |
| Rushing product integration | Quality drops, customers impacted | Phase integration with clear milestones |
| No integration owner | Nobody accountable = nothing happens | Named integration lead from day 1 |

---

## Being Acquired: Preparation

### Readiness Assessment

| Signal | Readiness Level |
|--------|----------------|
| Inbound interest from strategic buyers | High -- leverage the interest |
| Market consolidation happening | Medium -- prepare while you have options |
| Fundraising harder than operating | Medium -- acquisition may be better path |
| Founder ready for transition | Personal -- ensure this is genuine |
| Growth stalling despite effort | Consider -- but don't sell from weakness |

### Preparation Timeline (6-12 Months Before)

| Month | Activity | Owner |
|-------|----------|-------|
| 1-2 | Clean financials, resolve outstanding legal issues | CFO + Legal |
| 2-3 | Document all IP, ensure ownership is clean | CTO + Legal |
| 3-4 | Reduce customer concentration below 20% | CRO |
| 4-5 | Retention agreements for key employees | CHRO |
| 5-6 | Build data room with all required documents | CFO |
| 6-8 | Engage M&A advisor, begin outreach | CEO |
| 8-12 | Process management, negotiate, close | CEO + Advisor |

### Data Room Contents

| Category | Required Documents |
|----------|-------------------|
| Corporate | Certificate of incorporation, bylaws, cap table, board minutes |
| Financial | 3 years of financials, tax returns, projections, bank statements |
| Revenue | Customer list, contracts, MRR/ARR breakdown, cohort data |
| Legal | All contracts, IP assignments, employee agreements, litigation |
| People | Org chart, comp data, key person profiles, benefits summary |
| Product | Architecture overview, tech stack, roadmap, key metrics |
| IP | Patents, trademarks, proprietary technology documentation |
| Compliance | Certifications, audit reports, data handling documentation |

---

## Red Flags (Both Sides)

### Acquiring Red Flags

- No clear strategic rationale beyond "it's a good deal"
- Due diligence reveals culture mismatch and it is dismissed
- Key people not committed before close
- Integration plan does not exist or is "we'll figure it out"
- Valuation based on projections, not actuals
- Revenue concentration > 30% in one customer
- Founder has no lockup or earnout incentive

### Being Acquired Red Flags

- Only one buyer interested (no competitive dynamic)
- Earnout targets seem unreachable after integration
- Buyer has history of post-acquisition layoffs
- No written commitment for team retention
- Valuation feels low but "speed" is used as pressure
- Buyer rushing timeline without clear reason

---

## Integration with C-Suite

| Role | Contribution to M&A |
|------|-------------------|
| CEO (`ceo-advisor`) | Strategic rationale, negotiation lead, integration vision |
| CFO (`cfo-advisor`) | Valuation, deal structure, financing, financial DD |
| CTO (`cto-advisor`) | Technical due diligence, architecture assessment, integration plan |
| CHRO (`chro-advisor`) | People DD, retention planning, culture assessment |
| COO (`coo-advisor`) | Integration execution, process merge, operational DD |
| CPO (`cpo-advisor`) | Product roadmap impact, customer overlap analysis |
| CISO (`ciso-advisor`) | Security posture assessment, compliance DD |
| Culture Architect (`culture-architect`) | Culture clash detection, integration culture plan |

---

## Output Artifacts

| Request | Deliverable |
|---------|-------------|
| "Should we acquire [company]?" | Strategic rationale assessment with buy vs. build analysis |
| "Run due diligence on [target]" | Due diligence checklist by domain with priority matrix |
| "Value this acquisition" | Valuation analysis using multiple methods |
| "Structure this deal" | Deal term recommendations with negotiation strategy |
| "Plan the integration" | 100-day integration plan with owners and milestones |
| "Prepare to be acquired" | Readiness assessment + 6-month preparation plan |
| "Build the data room" | Complete data room checklist with document list |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Due diligence keeps surfacing new issues after expected completion | DD scope not defined upfront; no priority matrix followed | Use the Priority Matrix strictly: deal-breakers in Week 1-2, valuation impact in Week 2-4; new findings after Week 4 go to post-close optimization |
| Key employees leaving within 6 months of acquisition | Retention agreements insufficient or culture integration failed | Structure retention bonuses with 24-month cliff; conduct Day 1 welcome meetings; include acquired team in integration decisions |
| Synergy targets missed at 100-day mark | Synergies were aspirational projections, not auditable targets | Require each synergy to have a specific metric, owner, and measurement method before deal close; track quarterly |
| Integration stalls with no clear ownership | No Integration Management Office (IMO) or named integration lead | Appoint dedicated integration lead from Day 0; establish IMO with cross-functional representatives and weekly cadence |
| Earnout disputes destroying the relationship | Metrics not clearly defined or seller lacks control over outcomes | Define earnout metrics that are measurable, auditable, and within seller's meaningful control; include dispute resolution mechanism |
| Valuation gap between buyer and seller too large to bridge | Different methodologies or growth assumptions | Use multiple valuation methods and present range; bridge with earnout structure tied to the gap assumptions |
| Post-acquisition customer churn spike | Customer communication delayed or inadequate; service disruption during integration | Execute customer communication on Day 1; maintain service continuity as Phase 1 priority; assign dedicated CS contact |

---

## Success Criteria

- Strategic rationale articulated in one paragraph before any DD begins; "buy vs. build" analysis completed with clear justification
- Due diligence completed within 8-week timeline with all Priority 1 items cleared by Week 2
- Integration plan documented before deal close, not after, with named owners for every workstream
- Day 1 checklist 100% executed: CEO welcome, customer communication, key person meetings, systems access, reporting structure
- 100-day integration milestones met: 90%+ key person retention, zero customer churn attributable to integration, systems integrated per plan
- Synergy targets tracked quarterly with variance < 15% from projections
- Data room (if selling) complete and organized 30 days before process begins

---

## Scope & Limitations

- **In scope:** Strategic rationale assessment, buy vs. build analysis, due diligence frameworks (financial, technical, legal, people, market, product, security), valuation methodologies, deal structure negotiation, integration planning and execution, preparation for being acquired, data room construction
- **Out of scope:** Legal document drafting (use M&A legal counsel); tax structure optimization (use tax advisors); regulatory antitrust filings (use specialized counsel); investment banking services (engage M&A advisor for process management)
- **Limitation:** Valuation multiples are market-dependent and change with conditions; ranges provided are indicative benchmarks, not appraisals
- **Limitation:** Framework optimized for technology company M&A (SaaS, software); manufacturing, retail, and regulated industry M&A have additional complexities
- **Limitation:** Integration success depends heavily on cultural compatibility, which is difficult to assess fully during DD

---

## Integration Points

| Skill | Integration | Data Flow |
|-------|-------------|-----------|
| `ceo-advisor` | M&A is a CEO strategic decision requiring board alignment | CEO strategy → M&A strategic rationale |
| `cfo-advisor` | Valuation, deal structure, financial DD, and financing | M&A financials → CFO valuation model |
| `cto-advisor` | Technical DD, architecture assessment, integration plan | M&A tech assessment → CTO integration roadmap |
| `chro-advisor` | People DD, retention planning, culture assessment | M&A people risks → CHRO retention strategy |
| `coo-advisor` | Integration execution, process merge, operational DD | M&A integration plan → COO execution |
| `culture-architect` | Culture clash detection and integration culture plan | M&A culture assessment → Culture integration strategy |
| `ciso-advisor` | Security posture assessment and compliance DD | M&A security audit → CISO remediation plan |

---

## Python Tools

| Tool | Purpose | Usage |
|------|---------|-------|
| `scripts/due_diligence_tracker.py` | Track due diligence items across 8 domains with priority, status, and red flag detection | `python scripts/due_diligence_tracker.py add --domain financial --item "Revenue recognition audit" --priority 1 --json` |
| `scripts/synergy_calculator.py` | Calculate and track revenue and cost synergies with confidence-weighted projections | `python scripts/synergy_calculator.py --revenue-synergies 500000 --cost-synergies 200000 --confidence 0.7 --timeline-months 24 --json` |
| `scripts/integration_planner.py` | Generate a 100-day integration plan with phases, milestones, owners, and status tracking | `python scripts/integration_planner.py --mode absorb --target-name "AcquiredCo" --headcount 25 --json` |

---

## org-health-diagnostic

Source path: `references/c-level-advisor/org-health-diagnostic/SKILL.md`

# Org Health Diagnostic

Eight dimensions. Traffic lights. Real benchmarks. Surfaces the problems you do not know you have and shows how problems in one dimension cascade to others.

## Keywords

org health, organizational health, health diagnostic, health dashboard, health check, company health, functional health, team health, startup health, health scorecard, health assessment, risk dashboard, cross-functional health, dimension cascade, stage benchmarks

---

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Company stage** (Seed / Series A / B / C+) — sets both the dimension weighting and the stage-adjusted benchmarks; a Seed company is not held to Series C standards
- [ ] **Which dimensions have data and the actual metric values** — the diagnostic degrades gracefully, but it must know what's measured vs. missing to avoid scoring on guesses
- [ ] **The purpose and audience** (internal prioritization, board review, QoQ comparison) — determines depth, whether cascade analysis is included, and the output format
- [ ] **Any known problem areas or recent shocks** — focuses cascade analysis on where failures are likely propagating

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## The 8 Dimensions

### Dimension Overview

| # | Dimension | C-Suite Owner | Core Question |
|---|-----------|--------------|---------------|
| 1 | Financial Health | CFO | Can we fund operations and invest in growth? |
| 2 | Revenue Health | CRO | Are customers staying, growing, and recommending us? |
| 3 | Product Health | CPO | Do customers love and use the product? |
| 4 | Engineering Health | CTO | Can we ship reliably and sustain velocity? |
| 5 | People Health | CHRO | Is the team stable, engaged, and growing? |
| 6 | Operational Health | COO | Are we executing our strategy with discipline? |
| 7 | Security Health | CISO | Are we protecting customers and maintaining compliance? |
| 8 | Market Health | CMO | Are we winning in the market and growing efficiently? |

---

### Dimension 1: Financial Health (CFO)

| Metric | Green (7-10) | Yellow (4-6) | Red (1-3) |
|--------|-------------|-------------|-----------|
| Runway (months) | > 18 | 9-18 | < 9 |
| Burn multiple | < 1.5x | 1.5-2.5x | > 2.5x |
| Gross margin | > 70% | 55-70% | < 55% |
| Revenue concentration (top customer) | < 10% | 10-20% | > 20% |
| MoM growth rate | Above benchmark | At benchmark | Below benchmark |

### Dimension 2: Revenue Health (CRO)

| Metric | Green (7-10) | Yellow (4-6) | Red (1-3) |
|--------|-------------|-------------|-----------|
| NRR | > 110% | 100-110% | < 100% |
| Logo churn (annual) | < 5% | 5-10% | > 10% |
| Pipeline coverage (next Q) | > 3x | 2-3x | < 2x |
| CAC payback | < 12 months | 12-18 months | > 18 months |
| Win rate | > 25% | 15-25% | < 15% |

### Dimension 3: Product Health (CPO)

| Metric | Green (7-10) | Yellow (4-6) | Red (1-3) |
|--------|-------------|-------------|-----------|
| NPS | > 40 | 20-40 | < 20 |
| DAU/MAU ratio | > 40% | 20-40% | < 20% |
| Core feature adoption | > 60% | 30-60% | < 30% |
| Time to value | Decreasing QoQ | Stable | Increasing QoQ |
| CSAT | > 4.2/5 | 3.5-4.2 | < 3.5 |

### Dimension 4: Engineering Health (CTO)

| Metric | Green (7-10) | Yellow (4-6) | Red (1-3) |
|--------|-------------|-------------|-----------|
| Deploy frequency | Daily | Weekly | Monthly or less |
| Change failure rate | < 5% | 5-15% | > 15% |
| MTTR | < 1 hour | 1-4 hours | > 4 hours |
| Tech debt ratio (% of sprint) | < 20% | 20-35% | > 35% |
| P0/P1 incidents per month | < 2 | 2-5 | > 5 |

### Dimension 5: People Health (CHRO)

| Metric | Green (7-10) | Yellow (4-6) | Red (1-3) |
|--------|-------------|-------------|-----------|
| Regrettable attrition (annual) | < 10% | 10-20% | > 20% |
| eNPS | > 30 | 0-30 | < 0 |
| Time to fill (avg days) | < 45 | 45-90 | > 90 |
| Manager:IC ratio | 1:5-1:8 | 1:3-1:5 or 1:8-1:12 | Outside range |
| Internal promotion rate | > 30% | 15-30% | < 15% |

### Dimension 6: Operational Health (COO)

| Metric | Green (7-10) | Yellow (4-6) | Red (1-3) |
|--------|-------------|-------------|-----------|
| OKR completion rate | > 70% | 50-70% | < 50% |
| Decision cycle time | < 48 hours | 48hrs-1 week | > 1 week |
| Meeting effectiveness | Clear outcomes | Mixed | No outcomes |
| Cross-functional initiative completion | > 80% on time | 50-80% | < 50% |
| Process documentation coverage | > 70% | 40-70% | < 40% |

### Dimension 7: Security Health (CISO)

| Metric | Green (7-10) | Yellow (4-6) | Red (1-3) |
|--------|-------------|-------------|-----------|
| Security incidents (90 days) | 0 | 1-2 minor | 1+ major |
| Compliance status | All current | In progress | Overdue/lapsed |
| Critical vuln remediation SLA | 100% in SLA | > 90% | < 90% |
| Security training completion | > 95% | 80-95% | < 80% |
| Pen test recency | < 12 months | 12-24 months | > 24 months |

### Dimension 8: Market Health (CMO)

| Metric | Green (7-10) | Yellow (4-6) | Red (1-3) |
|--------|-------------|-------------|-----------|
| CAC trend | Improving QoQ | Stable | Worsening QoQ |
| Organic vs paid lead mix | > 50% organic | 30-50% organic | < 30% organic |
| Win rate vs competitors | Improving | Stable | Declining |
| Brand awareness (in ICP) | > 40% | 20-40% | < 20% |
| Pipeline contribution (marketing) | > 40% | 20-40% | < 20% |

---

## Scoring System

### Individual Dimension Score

Each dimension scores 1-10 based on weighted metrics:

```
Dimension Score = Sum(metric_score x metric_weight) / Sum(weights)

Traffic Light:
  Green (7-10):  Healthy -- maintain and optimize
  Yellow (4-6):  Watch -- trend matters (improving or declining?)
  Red (1-3):     Action required -- address within 30 days
```

### Overall Health Score

Weighted average by company stage:

| Dimension | Seed Weight | Series A | Series B | Series C+ |
|-----------|------------|----------|----------|-----------|
| Financial | 20% | 15% | 15% | 15% |
| Revenue | 10% | 20% | 20% | 20% |
| Product | 25% | 20% | 15% | 10% |
| Engineering | 15% | 15% | 15% | 10% |
| People | 10% | 10% | 15% | 15% |
| Operations | 5% | 10% | 10% | 15% |
| Security | 5% | 5% | 5% | 10% |
| Market | 10% | 5% | 5% | 5% |

### Stage-Adjusted Benchmarks

Different stages have different healthy ranges. A Seed company with 6-month runway is normal; a Series C company with 6-month runway is a crisis.

| Stage | Runway Target | Burn Multiple | Team Size | Revenue Threshold |
|-------|--------------|---------------|-----------|-------------------|
| Seed | > 12 months | Not applicable | 2-10 | Pre-revenue acceptable |
| Series A | > 18 months | < 3x | 10-40 | > $500K ARR |
| Series B | > 18 months | < 2x | 30-100 | > $3M ARR |
| Series C+ | > 24 months | < 1.5x | 80-300 | > $15M ARR |

---

## Cascade Analysis

### How Dimension Failures Propagate

This is the most important part of the diagnostic. Problems in one dimension inevitably create problems in others.

| If This Is Red... | Watch These Next... | Why |
|-------------------|---------------------|-----|
| Financial | People -> Engineering -> Product | Budget cuts -> hiring freeze -> velocity drops -> product stalls |
| Revenue | Financial -> People -> Market | Cash gap -> attrition risk -> positioning weakens |
| Product | Revenue -> Market -> People | NRR drops -> CAC rises -> top talent leaves |
| Engineering | Product -> Revenue | Features slip -> deals stall on missing features |
| People | Engineering -> Product -> Revenue | Velocity drops -> quality drops -> churn rises |
| Operations | ALL dimensions degrade over time | Execution failure cascades everywhere |
| Security | Revenue (enterprise) -> Financial | Enterprise deals blocked -> revenue impact |
| Market | Revenue -> Financial | Lead pipeline dries up -> sales suffers |

### Cascade Risk Decision Tree

```
START: Dimension scores calculated
  |
  v
[Any dimension RED?]
  |
  +-- NO  --> [Any dimension YELLOW with declining trend?]
  |            |
  |            +-- YES --> Monitor cascade. Check connected dimensions.
  |            +-- NO  --> Healthy. Maintain current approach.
  |
  +-- YES --> [Check cascade connections]
              |
              v
            [Are connected dimensions also Yellow/Red?]
              |
              +-- YES --> SYSTEMIC ISSUE. Root cause in the Red dimension.
              |           Address Red dimension first. Connected will improve.
              |
              +-- NO  --> ISOLATED ISSUE. Fix Red dimension before it cascades.
                          Timeline: 30 days or cascade begins.
```

---

## Dashboard Output Format

```
ORG HEALTH DIAGNOSTIC -- [Company] -- [Date]
Stage: [Seed/A/B/C]   Overall: [Score]/10   Trend: [Improving/Stable/Declining]

DIMENSION SCORES
------------------------------------------------------------
  Financial     [G] 8.2  Runway 14mo, burn 1.6x
  Revenue       [Y] 5.8  NRR 104%, pipeline thin (1.8x)
  Product       [G] 7.4  NPS 42, DAU/MAU 38%
  Engineering   [Y] 5.2  Debt at 30%, MTTR 3.2h
  People        [R] 3.8  Attrition 24%, eNPS -5
  Operations    [Y] 6.0  OKR 65% completion
  Security      [G] 7.8  SOC 2 complete, 0 incidents
  Market        [Y] 5.5  CAC rising, win rate 22%
------------------------------------------------------------

TOP PRIORITIES (address in order)
[R] 1. People: attrition at 24%
       Impact: Engineering velocity drops in 60 days (cascade risk)
       Action: Retention audit + intervention for top 5 at-risk
       Owner: CHRO + CEO | Timeline: This week

[Y] 2. Revenue: pipeline at 1.8x
       Impact: Q+1 miss risk is high
       Action: Add 3 qualified opps in 30 days or adjust forecast
       Owner: CRO | Timeline: 30 days

[Y] 3. Engineering: tech debt at 30%
       Impact: Shipping velocity slows by Q3
       Action: Dedicated debt sprint plan
       Owner: CTO | Timeline: 45 days

CASCADE WARNING
  People [R] --> Engineering [Y] cascade risk
  If attrition continues: engineering velocity drops -> product delays
  -> revenue impact in 2 quarters

DATA GAPS
  [!] Market: Brand awareness data needed
  [!] Operations: Meeting effectiveness not measured
```

---

## Graceful Degradation

Not all data is always available. The diagnostic handles partial data:

| Data Availability | Approach |
|------------------|----------|
| All metrics available | Full scoring, all dimensions |
| Missing 1-2 metrics per dimension | Score available metrics, flag gaps |
| Missing entire dimension | Exclude from overall score, flag as "[data needed]" |
| Only 3-4 dimensions have data | Partial diagnostic, clearly marked |

---

## Diagnostic Cadence

| Frequency | Scope | Audience |
|-----------|-------|----------|
| Weekly | Scorecard metrics only (2-3 per dimension) | Leadership team |
| Monthly | Full 8-dimension assessment | CEO + direct reports |
| Quarterly | Deep diagnostic with cascade analysis + benchmarks | Board-ready report |
| Annual | Full diagnostic + year-over-year comparison + strategy implications | Board + investors |

---

## Red Flags

- Any dimension Red for 2+ consecutive months -- systemic problem, not a blip
- 3+ dimensions Yellow simultaneously -- organizational strain, prioritize ruthlessly
- Overall score declining 3+ months -- strategic review needed
- Cascade warning triggered and not addressed in 30 days -- will get worse
- Data gaps persist for 2+ cycles -- measurement culture problem
- Score improving but team sentiment declining -- measurement gaming
- No dimension ever Red -- either the company is exceptional or standards are too low

---

## Integration with C-Suite

| Dimension | Owner Skill | Drill-Down |
|-----------|------------|------------|
| Financial | CFO Advisor (`cfo-advisor`) | Deep financial analysis |
| Revenue | CRO Advisor (`cro-advisor`) | Pipeline and retention analysis |
| Product | CPO Advisor (`cpo-advisor`) | PMF assessment and portfolio review |
| Engineering | CTO Advisor (`cto-advisor`) | Technical health and debt analysis |
| People | CHRO Advisor (`chro-advisor`) | Retention, engagement, org design |
| Operations | COO Advisor (`coo-advisor`) | Process maturity, execution cadence |
| Security | CISO Advisor (`ciso-advisor`) | Risk register, compliance status |
| Market | CMO Advisor (`cmo-advisor`) | Positioning, channel effectiveness |

---

## Output Artifacts

| Request | Deliverable |
|---------|-------------|
| "How healthy is the company?" | Full 8-dimension dashboard with traffic lights |
| "What should we fix first?" | Prioritized action list with cascade analysis |
| "Prepare health section for board" | Board-ready health summary with trends |
| "Compare to last quarter" | Quarter-over-quarter comparison with trend arrows |
| "Where are we at risk?" | Cascade risk map with interconnected failures |
| "What data do we need?" | Data gap analysis with collection recommendations |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Scores consistently show all green but team sentiment is negative | Metrics being gamed or standards set too low; measurement doesn't capture reality | Cross-reference quantitative scores with qualitative signals (exit interviews, Glassdoor, skip-level conversations); raise benchmarks to industry-standard levels |
| Cascade analysis shows systemic issue but leadership disagrees | Red dimension owners resistant to acknowledging problems | Present cascade evidence with data: "People Red for 2 months → Engineering Yellow → Product delays in pipeline"; use McKinsey OHI principle of benchmarking against external data |
| Data gaps persist across multiple diagnostic cycles | No measurement infrastructure; teams don't prioritize data collection | Assign data collection to specific owners with deadlines; start with proxy metrics where direct measurement is unavailable |
| Diagnostic takes too long to produce (> 2 weeks) | Trying to measure everything perfectly instead of using available data | Apply graceful degradation: score what you have, flag gaps, iterate; a partial diagnostic now beats a perfect one in 6 weeks |
| Different stakeholders interpret traffic light scores differently | No shared understanding of what Green/Yellow/Red means operationally | Document specific thresholds for each metric in each dimension; share calibration examples ("Red runway = less than 9 months at current burn") |
| Quarterly diagnostic shows no change despite interventions | Wrong interventions, or interventions not given enough time, or measuring lagging indicators | Verify interventions target root cause not symptoms; check leading indicators alongside lagging ones; allow 2 quarters for structural changes to show in scores |
| Board wants a single number but diagnostic is multi-dimensional | Board unfamiliar with the 8-dimension model | Provide the weighted overall score (1-10) as headline with stage-adjusted weighting; drill-down dimensions available on request |

---

## Success Criteria

- All 8 dimensions scored with traffic lights within 5 business days of data collection start
- Cascade analysis correctly predicts downstream impacts: when a Red dimension is not addressed, connected dimensions degrade within 2 quarters
- Stage-adjusted benchmarks applied correctly: Seed company not held to Series C standards and vice versa
- Top 3 priorities identified with specific owners, timelines, and verification methods
- Data gaps reduced by at least 50% between first and second diagnostic cycle
- Board-ready health summary produced quarterly with trend comparison to prior quarter
- Overall health score trending stable or improving over 3 consecutive quarters

---

## Scope & Limitations

- **In scope:** 8-dimension organizational health scoring, traffic light dashboards, cascade analysis, stage-adjusted benchmarks, graceful degradation for partial data, diagnostic cadence recommendations, board-ready reporting
- **Out of scope:** Deep functional diagnostics within a single dimension (use the respective C-suite advisor skill); employee engagement survey design and administration (use CHRO Advisor); financial auditing (use external auditors); security penetration testing (use CISO Advisor)
- **Limitation:** Diagnostic quality depends on data accuracy; garbage in, garbage out applies -- verify data sources
- **Limitation:** McKinsey OHI benchmarks are based on large enterprise data; early-stage companies may need adjusted benchmarks
- **Limitation:** The 8-dimension model is a simplification; some organizations may need additional dimensions (e.g., ESG, regulatory) depending on industry
- **Limitation:** Cascade predictions are based on common patterns; specific organizations may have unique cascade paths

---

## Integration Points

| Skill | Integration | Data Flow |
|-------|-------------|-----------|
| `cfo-advisor` | Financial Health dimension deep dive | Health financial score → CFO detailed analysis |
| `cro-advisor` | Revenue Health dimension deep dive | Health revenue score → CRO pipeline review |
| `cpo-advisor` | Product Health dimension deep dive | Health product score → CPO PMF assessment |
| `cto-advisor` | Engineering Health dimension deep dive | Health engineering score → CTO tech debt plan |
| `chro-advisor` | People Health dimension deep dive | Health people score → CHRO retention strategy |
| `coo-advisor` | Operational Health dimension deep dive | Health operations score → COO process review |
| `ciso-advisor` | Security Health dimension deep dive | Health security score → CISO risk register |
| `cmo-advisor` | Market Health dimension deep dive | Health market score → CMO channel review |
| `strategic-alignment` | Health scores inform alignment priorities | Health priorities → Alignment focus areas |
| `executive-mentor` | Red dimensions trigger executive coaching focus | Health red flags → Mentor challenge areas |

---

## Python Tools

| Tool | Purpose | Usage |
|------|---------|-------|
| `scripts/org_health_scorer.py` | Score all 8 dimensions with traffic lights, stage-adjusted weighting, and overall health calculation | `python scripts/org_health_scorer.py --stage series-a --financial 7.5 --revenue 5.8 --product 7.2 --engineering 5.0 --people 3.5 --operations 6.0 --security 7.8 --market 5.5 --json` |
| `scripts/span_of_control_analyzer.py` | Analyze manager-to-IC ratios across the organization and flag unhealthy spans | `python scripts/span_of_control_analyzer.py --org-file org_structure.csv --json` |
| `scripts/engagement_benchmarker.py` | Benchmark engagement metrics against industry standards and flag gaps | `python scripts/engagement_benchmarker.py --enps 15 --attrition 18 --time-to-fill 60 --promotion-rate 20 --industry saas --json` |

---

## scenario-war-room

Source path: `references/c-level-advisor/scenario-war-room/SKILL.md`

# Scenario War Room

**Tier:** POWERFUL
**Category:** C-Level Advisory
**Tags:** scenario planning, war room, risk modeling, cascade effects, contingency planning, pre-mortem, crisis simulation

## Overview

The Scenario War Room models cascading what-if scenarios across all business functions. Not single-assumption stress tests -- compound adversity that shows how one problem creates the next, and where the cascade can be interrupted. Every scenario produces concrete hedges with costs, owners, and deadlines.

---

## When to Use

- A major risk has probability above 15% and impact above 20% of ARR
- Two or more threats could plausibly co-occur
- A strategic decision has significant downside if wrong
- Board or investors are asking "what's the worst case?"
- Pre-mortem before a major commitment (fundraise, acquisition, market entry)
- Quarterly risk review for leadership team

## When NOT to Use

- Single-variable financial sensitivity analysis (use CFO Advisor stress testing)
- Routine project risk assessment (use project management risk frameworks)
- Technical failure mode analysis (use engineering incident planning)

---

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The (maximum 3) variables that actually keep leadership awake** — the entire model is built around these; the wrong variables produce a useless scenario
- [ ] **Probability, timeline, and quantified impact for each variable** — "revenue drops" is not actionable; "$420K ARR at risk over 60 days" is, and severity levels depend on it
- [ ] **Current baseline** (ARR, runway in months, headcount) — cascade and severity math (e.g., runway going 14→8 months) requires the starting numbers
- [ ] **Company stage** — common scenario patterns and what counts as existential differ by stage

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## The 6-Step Cascade Model

### Step 1: Define Scenario Variables (Maximum 3)

More than 3 variables creates analysis paralysis, not insight. Choose the 3 that actually keep leadership awake at night.

For each variable, specify:

| Field | Description | Example |
|-------|-----------|---------|
| **What changes** | Specific, quantified | "Top customer (28% of ARR) gives 60-day termination notice" |
| **Probability** | Your best estimate | 15% |
| **Timeline** | When it could hit | Within 90 days |
| **Detection signal** | How you would know it is happening | Sponsor goes dark, usage drops 25% MoM |

**Variable Template:**
```
Variable A: [Specific change]
  Probability: [X]%  |  Timeline: [When]
  Detection: [Early warning signal]
  First-order impact: [Immediate consequence]

Variable B: [Specific change]
  Probability: [X]%  |  Timeline: [When]
  Detection: [Early warning signal]
  First-order impact: [Immediate consequence]

Variable C: [Specific change]
  Probability: [X]%  |  Timeline: [When]
  Detection: [Early warning signal]
  First-order impact: [Immediate consequence]
```

### Step 2: Domain Impact Mapping

For each variable, assess impact across every business function:

| Domain | Key Questions | Typical Impact Areas |
|--------|-------------|---------------------|
| **Finance (CFO)** | Burn impact? Runway change? Bridge options? | Cash, runway, covenant triggers |
| **Revenue (CRO)** | ARR gap? Churn cascade? Pipeline affected? | NRR, expansion, new logo risk |
| **Product (CPO)** | Roadmap derailed? PMF at risk? Customer need shift? | Delivery timeline, feature priority |
| **Engineering (CTO)** | Velocity hit? Key person risk? Technical debt impact? | Capacity, architecture, hiring |
| **People (CHRO)** | Attrition cascade? Hiring freeze? Morale impact? | Retention, culture, bench strength |
| **Operations (COO)** | Capacity affected? Process breaks? OKR impact? | SLAs, efficiency, scale |
| **Market (CMO)** | CAC affected? Competitive exposure? Brand risk? | Pipeline generation, positioning |
| **Legal/Compliance** | Regulatory timeline risk? Contract exposure? | Obligations, deadlines, penalties |

### Step 3: Cascade Mapping (The Core)

This is the most valuable step. Map how Variable A triggers consequences that amplify Variable B.

**Cascade Diagram:**
```
TRIGGER: Customer churn ($560K ARR)
  │
  ├──▶ CFO: Runway drops 14 → 8 months
  │     │
  │     └──▶ CHRO: Hiring freeze imposed
  │           │
  │           └──▶ CTO: 3 open engineering reqs frozen, roadmap slips 2 months
  │                 │
  │                 └──▶ CPO: Q4 feature launch delayed → 2 more customers at risk
  │                       │
  │                       └──▶ CRO: NRR drops → additional churn risk (DEATH SPIRAL ENTRY)
  │
  └──▶ CRO: Revenue concentration increases (next largest = 22%)
        │
        └──▶ Investors: Concentration risk flagged → Series A terms worsen
```

**Name the cascades explicitly.** Common cascade patterns:

| Cascade Pattern | Description | Interruption Point |
|----------------|-------------|-------------------|
| Revenue-to-Runway Death Spiral | Customer churn → lower runway → hiring freeze → slower product → more churn | Emergency revenue diversification |
| Key Person Cascade | Star leaves → team morale drops → followers leave → velocity collapses | Retention bonuses before departure |
| Market Squeeze | Competitor raises → price war → margins compress → can't invest in product | Differentiation, not price matching |
| Trust Cascade | Incident → customer concern → churn → press → more churn | Swift, transparent communication |
| Fundraise-Burn Spiral | Miss target → raise delayed → bridge at bad terms → burn cuts → team loss | Parallel fundraise tracks |

### Step 4: Severity Matrix

Model three scenarios with increasing severity:

| Scenario | Variables Hit | Definition | Recovery Difficulty |
|----------|-------------|-----------|-------------------|
| **Base** | 1 of 3 | Single shock, others don't materialize | Manageable with prepared response |
| **Stress** | 2 of 3 | Compound shock, cascade begins | Requires significant pivot, board involvement |
| **Severe** | All 3 | Full cascade, existential territory | Requires emergency action, may need board intervention |

For each severity level, quantify:

```
BASE SCENARIO (Variable A only):
  Runway impact: [X] months → [Y] months
  ARR impact: -$[X] ([Y]% of total)
  Headcount impact: [freeze / reduction / none]
  Timeline to critical: [X] months
  Recovery plan: [specific actions]

STRESS SCENARIO (Variables A + B):
  Runway impact: [X] months → [Y] months
  ARR impact: -$[X] ([Y]% of total)
  Headcount impact: [specifics]
  Timeline to critical: [X] months
  Recovery plan: [specific actions]

SEVERE SCENARIO (All three):
  Runway impact: [X] months → [Y] months
  ARR impact: -$[X] ([Y]% of total)
  Headcount impact: [specifics]
  Timeline to critical: [X] months
  Existential: [yes/no]
  Emergency plan: [specific actions requiring board approval]
```

### Step 5: Early Warning Signals (Trigger Points)

Define measurable signals that tell you a scenario is unfolding BEFORE it is confirmed. The value of this exercise is acting early, not reacting late.

**Signal Design Criteria:**
- Observable (you can actually measure it)
- Leading (appears before the full impact)
- Specific (not just "things feel off")
- Actionable (triggers a specific response)

| Variable | Signal | Threshold | Response |
|----------|--------|-----------|----------|
| Customer churn | Sponsor stops responding | > 3 weeks silence | Exec escalation, QBR request |
| Customer churn | Usage drops | > 25% MoM decline | CS outreach, value review |
| Fundraise delay | Term sheets | < 3 after 60 days in process | Parallel bridge conversations |
| Fundraise delay | Investor requests | > 30 day DD extension | Reduce burn, extend runway |
| Key person departure | Market compensation | Counter-offer required in last 90 days | Retention package, succession plan |
| Key person departure | External engagement | Engineer presenting at conferences for competitors | Direct conversation, role expansion |

### Step 6: Hedging Strategies

For each scenario: actions to take NOW (before the scenario materializes) that reduce impact if it does. Hedges have costs -- the goal is cheap insurance, not paranoia.

**Hedge Evaluation Criteria:**

| Criterion | Question |
|-----------|----------|
| Cost | What does this hedge cost to implement? |
| Reversibility | Can we undo it if the scenario doesn't happen? |
| Lead time | How long to implement? (Must be shorter than detection-to-impact window) |
| Coverage | Which scenarios does this hedge protect against? |
| Side effects | Does this hedge cause other problems? |

**Hedge Table Template:**

| Hedge | Cost | Protects Against | Owner | Deadline | Status |
|-------|------|-----------------|-------|----------|--------|
| Establish $500K credit line | $5K/year | Runway shortfall (Base + Stress) | CFO | 60 days | Not started |
| 12-month retention bonus for 3 key engineers | $90K | Key person departure (all scenarios) | CHRO | 30 days | In progress |
| Diversify to <20% revenue per customer | Sales effort (6 months) | Single-customer dependency | CRO | 2 quarters | Planning |
| Start parallel fundraise track | CEO time (10 hrs/week) | Fundraise delay (Stress + Severe) | CEO | Immediate | Not started |
| Pre-negotiate bridge terms with existing investors | 2 board conversations | Runway crisis (Severe) | CFO + CEO | 45 days | Not started |
| Document architecture for bus factor reduction | 2 engineering weeks | Key person departure | CTO | 30 days | Not started |

---

## Output Format

Every war room session produces this structured output:

```
SCENARIO: [Name]
DATE: [Date of analysis]
PARTICIPANTS: [Who was involved]

VARIABLES:
  A: [Description] — Probability: [X]%, Timeline: [When]
  B: [Description] — Probability: [X]%, Timeline: [When]
  C: [Description] — Probability: [X]%, Timeline: [When]

MOST LIKELY PATH: [Which combination actually plays out, with reasoning]

SEVERITY LEVELS:
  Base (A only):  Runway [X]→[Y]mo, ARR impact -$[X]
    Recovery: [2-3 specific actions]
  Stress (A+B):   Runway [X]→[Y]mo, ARR impact -$[X]
    Recovery: [3-4 specific actions]
  Severe (A+B+C): Runway [X]→[Y]mo, ARR impact -$[X]
    Existential: [yes/no]
    Emergency: [actions requiring board approval]

CASCADE MAP:
  [A] → [domain impact] → [triggers B amplification] → [domain impact] → [end state]
  Interruption points: [where cascade can be broken]

EARLY WARNING SIGNALS:
  1. [Signal] → indicates [scenario], threshold: [specific]
  2. [Signal] → indicates [scenario], threshold: [specific]
  3. [Signal] → indicates [scenario], threshold: [specific]

HEDGES (implement now):
  1. [Action] — cost: $[X] — protects: [scenarios] — owner: [role] — deadline: [date]
  2. [Action] — cost: $[X] — protects: [scenarios] — owner: [role] — deadline: [date]
  3. [Action] — cost: $[X] — protects: [scenarios] — owner: [role] — deadline: [date]

RECOMMENDED DECISION:
  [One paragraph: what to do, in what order, and why]

REVIEW DATE: [When to re-run this analysis — typically 90 days or after any variable shifts]
```

---

## Common Scenarios by Company Stage

### Seed Stage
- Co-founder departure + product misses launch deadline
- Runway runs out + bridge terms are predatory
- Key technical hire falls through + competitor ships first

### Series A
- Miss ARR target + fundraise delayed
- Top customer churns + competitor raises large round
- Key engineer leaves + critical feature deadline

### Series B+
- Market contraction + burn multiple spikes above 3x
- Lead investor wants strategic pivot + team resists
- Regulatory change + product requires rearchitecture

---

## War Room Ground Rules

1. **Maximum 3 variables per scenario.** More is noise. Model the ones that actually matter.
2. **Quantify or estimate.** "Revenue drops" is not useful. "$420K ARR at risk over 60 days" is. Use ranges if uncertain.
3. **Don't stop at first-order effects.** The real damage is always in the cascade.
4. **Model recovery, not just impact.** Every scenario must have a "what we do" path.
5. **Separate base case from sensitivity.** Don't conflate "what probably happens" with "what could happen."
6. **3-4 scenarios per planning cycle.** More creates analysis paralysis.
7. **Review every 90 days.** Probabilities and variables change. Stale scenarios give false comfort.
8. **No judgment-free zone.** People must feel safe naming ugly scenarios.

---

## Related Skills

| Skill | Use When |
|-------|----------|
| **ceo-advisor** | Strategic decisions that scenarios inform |
| **cfo-advisor** | Financial modeling for scenario impacts |
| **coo-advisor** | Operational contingency planning |
| **internal-narrative** | Communicating scenario outcomes to stakeholders |
| **cs-onboard** | Company context that feeds scenario variables |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Scenarios feel too abstract to act on | Variables not specific or quantified enough | Require dollar amounts, percentages, and timelines for every variable; "revenue drops" is not actionable, "$420K ARR at risk over 60 days" is |
| Team generates only obvious, low-probability scenarios | Conformity bias; not applying Shell scenario planning method of challenging mental models | Use inversion technique: "What would guarantee our failure?"; bring in external perspective; reference industry-specific historical precedents |
| Cascade mapping stops at first-order effects | Facilitator not pushing past immediate consequences | Require minimum 3 levels of cascade for each variable; use "and then what?" prompting for each domain impact |
| Hedges identified but never implemented | No ownership, deadline, or cost attached | Every hedge must have: cost estimate, owner name, deadline, and status tracking; review in weekly leadership meeting |
| War room sessions take too long (> 4 hours) | Too many variables or trying to model every scenario | Enforce maximum 3 variables and 3-4 scenarios per session; use severity matrix to focus on highest-impact combinations |
| Early warning signals not being monitored | Signals assigned but not integrated into existing reporting | Add signals to existing dashboards and weekly scorecards; assign specific person to monitor each signal |
| Participants reluctant to name worst-case scenarios | Fear of being seen as negative or alarmist | Establish ground rules explicitly; cite Shell's experience: "the value is in surfacing what others won't say"; reward naming hard truths |

---

## Success Criteria

- Each scenario session produces exactly 3 variables, 3 severity levels, and a cascade map with interruption points identified
- Early warning signals are specific enough to be monitored: observable, leading, and actionable with defined thresholds
- Hedges are costed, owned, and have deadlines within 7 days of the war room session
- At least one hedge per scenario is implemented (not just planned) within 30 days
- Scenario review conducted every 90 days with probability updates based on new information
- When an early warning signal fires, the pre-planned response is executed within the defined timeline
- War room output is concise enough for board consumption: one-page summary per scenario

---

## Scope & Limitations

- **In scope:** Multi-variable scenario construction, cascade modeling across all business functions, severity matrix analysis, early warning signal design, hedge strategy with cost-benefit analysis, scenario review cadence
- **Out of scope:** Single-variable financial sensitivity analysis (use CFO Advisor stress testing); technical failure mode analysis (use engineering incident planning); routine project risk assessment (use project management frameworks); insurance and risk transfer (use specialized broker)
- **Limitation:** Scenario probabilities are subjective estimates, not actuarial calculations; value is in preparedness, not prediction accuracy
- **Limitation:** Framework assumes scenarios are independent or correlated; black swan events by definition are not modelable
- **Limitation:** Cascade mapping is based on common organizational patterns; unique company structures may have different cascade paths
- **Limitation:** Maximum 3 variables per scenario is a deliberate constraint; more variables create analysis paralysis, not better insight

---

## Integration Points

| Skill | Integration | Data Flow |
|-------|-------------|-----------|
| `ceo-advisor` | Strategic decisions informed by scenario analysis | War room scenarios → CEO decision inputs |
| `cfo-advisor` | Financial modeling for scenario impacts and hedge costs | War room financial impacts → CFO stress test models |
| `coo-advisor` | Operational contingency planning and cascade interruption | War room cascade map → COO contingency plans |
| `executive-mentor` | Pre-mortem failure modes feed into scenario variables | Mentor failure modes → War room variables |
| `internal-narrative` | Crisis scenarios require pre-built communication plans | War room crisis scenarios → Narrative crisis templates |
| `org-health-diagnostic` | Health dimension scores surface scenario variables | Health red flags → War room variable candidates |
| `strategic-alignment` | Scenario outcomes may require strategic realignment | War room outcomes → Alignment reassessment |

---

## Python Tools

| Tool | Purpose | Usage |
|------|---------|-------|
| `scripts/scenario_builder.py` | Build structured scenarios with variables, probabilities, detection signals, and severity levels | `python scripts/scenario_builder.py --name "Customer Concentration Risk" --variable "Top customer churns" --probability 20 --impact 500000 --timeline 90 --json` |
| `scripts/impact_matrix_calculator.py` | Calculate compound impact across multiple variables with severity matrix and cascade risk scoring | `python scripts/impact_matrix_calculator.py --variables "churn:500000:0.2" "fundraise_delay:0:0.3" "key_departure:0:0.15" --arr 2000000 --runway-months 14 --json` |
| `scripts/decision_tree_analyzer.py` | Build and evaluate decision trees with expected value calculations for strategic options | `python scripts/decision_tree_analyzer.py --decision "Enter Japan market" --option "Direct:0.6:2000000:-500000" --option "Partnership:0.75:1000000:-200000" --option "Wait:1.0:0:0" --json` |

---

## strategic-alignment

Source path: `references/c-level-advisor/strategic-alignment/SKILL.md`

# Strategic Alignment Engine

Strategy fails at the cascade, not the boardroom. This skill detects misalignment before it becomes dysfunction and builds systems that keep strategy connected from CEO to individual contributor.

## Keywords

strategic alignment, strategy cascade, OKR alignment, orphan OKRs, conflicting goals, silos, communication gap, department alignment, strategy articulation, cross-functional alignment, goal cascade, misalignment, alignment score, local optimization, strategy communication, cascade mapping

---

## The Alignment Problem

**The further a goal gets from the strategy that created it, the less likely it reflects the original intent.**

This is the organizational telephone game. It happens at every stage. The question is how bad it is and how to fix it.

```
CEO says: "We need to win the mid-market healthcare segment"
VP hears: "Healthcare is the priority"
Director translates: "Build healthcare features"
Team executes: "Add HIPAA compliance checkbox to the roadmap"
IC works on: "HIPAA feature that nobody asked for and doesn't close deals"

Result: Effort spent, strategy not advanced.
```

---

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which deliverable is needed** (full diagnostic, cascade map, silo diagnosis, communication-gap analysis, or workshop agenda) — each uses a different step of the framework
- [ ] **The current strategy stated in one sentence** — alignment is tested against the source; if the strategy itself is vague, fix that before cascading
- [ ] **The actual goals/OKRs at company, team, and individual levels** — orphan, conflict, and coverage-gap detection needs the real cascade, not a hypothetical one
- [ ] **Company size and structure** — the 5-person test and hierarchical cascade assumptions need adapting for large or matrixed orgs

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## Step 1: Strategy Articulation Test

Before checking cascade, check the source.

### The 5-Person Test

Ask five people from five different teams:

> "What is the company's most important strategic priority right now?"

| Result | Score | Diagnosis |
|--------|-------|-----------|
| All 5 give the same answer | 10/10 | Clear articulation. Check cascade. |
| 4 give similar answers | 7-8/10 | Close. Clarify the outlier. |
| 3 agree | 5-6/10 | Loose alignment. Re-communicate. |
| 2 agree | 2-4/10 | Strategy is unclear. Fix before cascade. |
| No agreement | 0-1/10 | No shared strategy exists. Start here. |

### Strategy Format Test

The strategy must be statable in one sentence.

| Format | Score |
|--------|-------|
| One clear sentence | Good |
| Two sentences | Acceptable |
| A paragraph | Too complex to cascade |
| A document | Too complex to internalize |

**Examples**:

| Bad | Why | Good |
|-----|-----|------|
| "Focus on growth while maintaining enterprise relationships and expanding internationally and investing in platform" | Four priorities = no priority | "Win the mid-market healthcare segment in DACH before Series B" |
| "Be the best at what we do" | Not falsifiable | "Reach $5M ARR by Q4 with 110%+ NRR" |
| "Customer-first approach to innovation" | Sounds nice, means nothing | "Ship the workflow automation feature that our top 10 prospects asked for" |

---

## Step 2: Cascade Mapping

Map the flow from company strategy through every organizational level.

### Cascade Visualization

```
Company Level:  Strategy Statement
                    |
                Company OKR-1    Company OKR-2    Company OKR-3
                    |                 |                 |
Dept Level:    Sales OKRs       Eng OKRs         Product OKRs
                    |                 |                 |
Team Level:    Team A OKRs      Team B OKRs       Team C OKRs
                    |                 |                 |
Individual:    Personal goals    Personal goals    Personal goals
```

### Cascade Validation Questions

For each goal at every level:

| Question | Purpose |
|----------|---------|
| Which company goal does this support? | Tests upward connection |
| If achieved 100%, how much does it move the parent goal? | Tests impact significance |
| Is the connection direct or theoretical? | Tests proximity of impact |
| Who else is working on the same parent goal? | Tests coverage and overlap |

---

## Step 3: Alignment Failure Detection

Three failure patterns to detect:

### Pattern 1: Orphan Goals

Goals that don't connect to any company-level objective.

| Symptom | Root Cause | Fix |
|---------|-----------|-----|
| "We've been working on this all quarter and nobody cares" | Goals set bottom-up without reconciliation | Connect or cut. Every goal needs a parent. |
| Team proud of achievement, leadership unaware | Misaligned definition of success | Explicit cascade mapping before quarter starts |
| Individual goals from last quarter carried forward | Inertia, not intention | Fresh cascade each quarter |

### Pattern 2: Conflicting Goals

Two teams' goals, when both succeed, create a worse outcome.

| Example | Conflict | Fix |
|---------|----------|-----|
| Sales: maximize new logos / CS: maximize NPS | Sales closes bad-fit customers, CS suffers | Shared goal: qualified new logos that retain |
| Product: ship fast / Security: no vulnerabilities | Speed vs. quality tension | Shared SLA: ship within X days with Y security checks |
| Marketing: maximize leads / Sales: close enterprise | Marketing optimizes for volume, sales needs quality | Shared metric: qualified pipeline $, not lead count |

### Pattern 3: Coverage Gaps

Company has 3 OKRs. 5 teams support OKR-1, 2 teams support OKR-2, 0 teams support OKR-3.

| Detection | Impact | Fix |
|-----------|--------|-----|
| Company OKR consistently misses while others hit | Nobody actually owns the failing OKR | Explicit team assignment to every company OKR |
| Resource allocation does not match priority | Top priority underfunded | Align resources to stated priorities |
| Strategy says X is important but no team's goals reflect it | Strategy is aspirational, not operational | Translate strategy to owned team goals |

---

## Step 4: Silo Diagnosis

Silos exist when teams optimize for local metrics at the expense of company metrics.

### Silo Detection Matrix

| Signal | Score (1-5) | Weight |
|--------|-------------|--------|
| Department hits goals while company misses | 5 = always | 25% |
| Teams don't know other teams' priorities | 5 = never | 20% |
| "That's not our problem" is common | 5 = daily | 20% |
| Cross-functional escalations only flow up | 5 = always | 15% |
| Data not shared between dependent teams | 5 = never shared | 10% |
| Cross-functional projects take 3x expected time | 5 = always | 10% |

**Score 30+**: Severe silos. Immediate intervention required.
**Score 20-29**: Moderate silos. Address in next quarter.
**Score 10-19**: Minor friction. Monitor and address specific hot spots.
**Score < 10**: Healthy cross-functional operation.

### Silo Root Causes and Fixes

| Root Cause | Fix | Owner |
|-----------|-----|-------|
| Incentive misalignment | Create shared goals where teams interact | CEO + COO |
| No shared goals | Add 1 cross-functional OKR per interacting team pair | COO |
| No shared language | Cross-functional show-and-tell monthly | Culture Architect |
| Geography/timezone | Intentional async overlap + quarterly in-person | COO + CHRO |
| Org design | Consider restructuring to reduce handoffs | CEO + CHRO |

---

## Step 5: Communication Gap Analysis

What the CEO says is not what teams hear. The gap grows with company size.

### Message Decay Model

```
CEO communicates strategy
  |
  v [10-20% loss]
VP interprets through their lens
  |
  v [10-20% loss]
Manager translates for team
  |
  v [10-20% loss]
IC receives modified version
  |
  v [10-20% loss]
IC interprets further based on daily work

Total signal loss: 40-80% from CEO to IC
```

### Communication Gap Sources

| Source | Detection | Fix |
|--------|-----------|-----|
| Ambiguity | Different teams interpret differently | Make strategy specific enough to be wrong |
| Frequency | Said once, expected to stick | Repeat strategy 7x through different channels |
| Medium mismatch | Written doc for visual thinkers | Use multiple formats (written, visual, verbal) |
| Trust deficit | Team doesn't believe strategy is real | Show resource allocation that proves it |
| Filtering | Managers edit the message | Skip-level communication + all-hands |

---

## Step 6: Realignment Protocol

How to fix misalignment without creating fear.

### Realignment Decision Tree

```
START: Misalignment detected
  |
  v
[Is the problem at the strategy level or the cascade level?]
  |
  +-- STRATEGY (Step 1 failed)
  |     --> CEO rewrites strategy as one sentence
  |     --> Re-communicate through all channels
  |     --> Re-run 5-person test after 2 weeks
  |
  +-- CASCADE (Step 2-3 failures)
  |     |
  |     v
  |   [Which failure pattern?]
  |     |
  |     +-- Orphan goals --> Connect or cut workshop
  |     +-- Conflicting goals --> Cross-functional OKR review
  |     +-- Coverage gaps --> Assign explicit ownership
  |
  +-- SILOS (Step 4)
  |     --> Fix incentives first
  |     --> Add shared metrics
  |     --> Consider org design change
  |
  +-- COMMUNICATION (Step 5)
        --> Increase frequency (weekly, not quarterly)
        --> Add skip-level communication
        --> Show resource proof (money follows words)
```

### Realignment Workshop (Half-day)

```
Agenda:
  1. CEO restates strategy (15 min)
  2. Each dept maps their goals to strategy (45 min)
  3. Identify orphans, conflicts, gaps together (30 min)
  4. Fix orphans: connect or cut (30 min)
  5. Fix conflicts: shared metrics or priority resolution (30 min)
  6. Fix gaps: assign ownership (15 min)
  7. Communication plan (15 min)
```

---

## Alignment Score

Quick health check. Score each area 0-10.

| Area | Question | Score |
|------|----------|-------|
| Strategy clarity | Can 5 people from different teams state strategy consistently? | /10 |
| Cascade completeness | Do all team goals connect to company goals? | /10 |
| Conflict detection | Have cross-team OKR conflicts been reviewed and resolved? | /10 |
| Coverage | Does each company OKR have explicit team ownership? | /10 |
| Communication | Do teams' behaviors reflect the strategy? | /10 |

### Score Interpretation

| Total (/50) | Status | Action |
|-------------|--------|--------|
| 45-50 | Excellent | Maintain the system. Quarterly check is sufficient. |
| 35-44 | Good | Address specific weak areas in next OKR cycle. |
| 20-34 | Misalignment costing you | Immediate attention. Workshop within 2 weeks. |
| < 20 | Strategic drift | Crisis-level intervention. CEO-led realignment. |

---

## Quarterly Alignment Check

Prevent recurrence with a quarterly check:

| Activity | When | Who | Duration |
|----------|------|-----|----------|
| 5-person articulation test | Week 1 of quarter | Random selection across levels | 15 min |
| Cascade map review | Week 1 | Leadership team | 1 hour |
| Conflict scan | Week 1 | COO + department leads | 30 min |
| Coverage audit | Week 1 | COO | 30 min |
| Silo pulse check | Week 2 | Cross-functional survey | 5 min survey |
| Report to CEO | Week 2 | COO or Chief of Staff | 15 min presentation |

---

## Red Flags

- Teams consistently hit goals while company misses targets -- local optimization
- Cross-functional projects take 3x longer than expected -- coordination failure
- Strategy updated quarterly but team priorities don't change -- cascade is broken
- "That's a leadership problem" at team level -- ownership gap
- New initiatives without connecting to existing OKRs -- strategy drift
- Department heads optimize for headcount/budget, not company outcomes -- incentive misalignment
- Same alignment problems reappear quarter after quarter -- systemic issue, not a one-time fix
- No one can name the company's top priority -- strategy is not communicated

---

## Integration with C-Suite

| When... | Work With... | To... |
|---------|-------------|-------|
| New strategy set | CEO + COO | Cascade into rocks before announcing |
| OKR cycle starts | COO (`coo-advisor`) | Cross-team conflict check before finalizing |
| Team misses goals | CHRO (`chro-advisor`) | Diagnose: capability gap or alignment gap? |
| Silo identified | COO | Design shared metrics or cross-functional OKRs |
| Post-M&A | CEO + Culture Architect | Detect strategy conflicts between merged entities |
| Quarterly planning | Company OS (`company-os`) | Integrate alignment check into planning rhythm |
| Change rollout | Change Management (`change-management`) | Ensure change aligns with strategy |

---

## Output Artifacts

| Request | Deliverable |
|---------|-------------|
| "Check our alignment" | Full 6-step diagnostic with alignment score |
| "Are our OKRs aligned?" | Cascade map with orphans, conflicts, and gaps identified |
| "We have silos" | Silo diagnosis with root causes and specific fixes |
| "Strategy isn't translating to execution" | Communication gap analysis + fix plan |
| "Run an alignment workshop" | Workshop agenda + facilitation guide |
| "Quarterly alignment check" | Quarterly check process + report template |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| 5-person test scores below 5/10 despite strategy existing | Strategy too complex, too vague, or communicated only once | Rewrite strategy as one falsifiable sentence; communicate through 7+ channels; repeat weekly for 4 weeks then re-test |
| Cascade map shows orphan goals but teams resist cutting them | Teams emotionally attached to work-in-progress; sunk cost fallacy | Frame as "connect or cut": every goal must have a parent OKR; if no parent exists, either create the connection or stop the work |
| Conflicting goals identified but no resolution reached | Department heads unwilling to compromise; incentive misalignment | Escalate to CEO for priority decision; create shared metric that both teams own; use balanced scorecard perspective alignment |
| Silo score above 30 but no one acknowledges the problem | Each silo operates well internally; pain is only felt at interfaces | Show cross-functional project data: 3x expected timeline; present customer impact of handoff failures; use strategy map visualization |
| Communication gap persists despite increased frequency | Wrong medium, wrong messenger, or message too abstract | Vary communication format (written, visual, verbal); use skip-level conversations; show resource allocation as proof of strategy ("money follows words") |
| Alignment workshop produces action items that are never implemented | No follow-up mechanism; workshop treated as event not process | Assign every action item an owner and deadline during the workshop; review at next weekly leadership meeting; track completion rate |
| Quarterly alignment check becomes a checkbox exercise | No consequences for misalignment; diagnostic not connected to decisions | Tie alignment score to OKR cycle planning; Red alignment areas must be addressed before new OKRs are finalized |

---

## Success Criteria

- 5-person articulation test scores 8/10 or higher within 30 days of strategy communication
- Zero orphan goals remain after quarterly cascade mapping review
- All identified goal conflicts have documented resolution with shared metrics within 2 weeks
- Silo detection score below 20 (minor friction or healthy) maintained across 3 consecutive quarters
- Communication gap analysis shows < 30% signal loss from CEO to IC level (measured by strategy comprehension survey)
- Alignment score (5 areas, /50) at 35 or above and trending stable or improving
- Quarterly alignment check completed within first 2 weeks of every quarter

---

## Scope & Limitations

- **In scope:** Strategy articulation testing, cascade mapping and validation, orphan goal detection, conflicting goal identification, coverage gap analysis, silo diagnosis, communication gap analysis, realignment protocols, alignment scoring, quarterly check cadence
- **Out of scope:** OKR writing and goal-setting methodology (use project management or Company OS skills); individual performance management (use CHRO Advisor); strategy formulation (use CEO Advisor -- this skill assumes strategy exists and tests its cascade)
- **Limitation:** Alignment diagnostics are point-in-time assessments; alignment degrades continuously and requires quarterly maintenance
- **Limitation:** The 5-person test is a heuristic, not a statistically rigorous survey; for organizations > 200 people, supplement with broader pulse survey
- **Limitation:** Silo detection matrix relies on self-reported data; supplement with objective measures (cross-functional project timelines, escalation patterns)
- **Limitation:** Framework assumes a hierarchical OKR cascade; matrix organizations and flat structures may need adapted cascade mapping

---

## Integration Points

| Skill | Integration | Data Flow |
|-------|-------------|-----------|
| `ceo-advisor` | Strategy must exist before alignment can be tested | CEO strategy statement → Alignment articulation test |
| `coo-advisor` | Operations owns the alignment cadence and cross-functional OKRs | Alignment conflicts → COO shared metric design |
| `company-os` | Alignment check integrates into planning rhythm | Alignment cadence → Company OS quarterly cycle |
| `chief-of-staff` | CoS facilitates alignment workshops and tracks follow-through | Alignment action items → CoS tracking |
| `culture-architect` | Silos are both structural and cultural problems | Alignment silo diagnosis → Culture intervention |
| `change-management` | Strategy changes require alignment cascade update | Change plan → Alignment re-cascade |
| `org-health-diagnostic` | Operational Health dimension reflects alignment quality | Health operations score → Alignment priority |
| `internal-narrative` | Strategy communication depends on narrative clarity | Alignment communication gaps → Narrative improvement |

---

## Python Tools

| Tool | Purpose | Usage |
|------|---------|-------|
| `scripts/okr_cascade_validator.py` | Validate that team OKRs connect to company OKRs, detecting orphans, conflicts, and coverage gaps | `python scripts/okr_cascade_validator.py --company-okrs company_okrs.csv --team-okrs team_okrs.csv --json` |
| `scripts/strategy_map_generator.py` | Generate a balanced scorecard strategy map linking financial, customer, process, and learning perspectives | `python scripts/strategy_map_generator.py --objective "Win mid-market healthcare in DACH" --financial "5M ARR by Q4" --customer "NPS > 40" --process "Ship workflow automation" --learning "Hire 3 healthcare domain experts" --json` |
| `scripts/alignment_scorer.py` | Calculate alignment score across 5 dimensions with trend tracking and recommendations | `python scripts/alignment_scorer.py --clarity 8 --cascade 6 --conflicts 7 --coverage 5 --communication 6 --previous-score 28 --json` |

---

## vpe-advisor

Source path: `references/c-level-advisor/vpe-advisor/SKILL.md`

# VP of Engineering Advisor

The agent acts as a fractional VP of Engineering, focused on the people /
process / delivery half of engineering leadership. Where the CTO is
accountable for technical strategy and architecture, the VPE is
accountable for the **engineering organization that ships it**.

Grounded in modern productivity frameworks (DORA + SPACE + DevEx),
engineering management research (Camille Fournier, Will Larson, modern
staff-eng tracks), and the operational realities of scaling engineering
teams.

## When to use this skill

- Scoring **engineering organization health** across structure, productivity, quality, delivery, culture, talent
- Designing or restructuring the **engineering org**: squads, platform, embedded, matrixed
- Planning **engineering capacity** for the next 2–4 quarters
- Building or refreshing the **engineering productivity dashboard** (DORA / SPACE / DevEx)
- Defining the **delivery model**: agile, kanban, scrum, shape-up, hybrid
- Planning the **hiring pipeline** and the **performance management** approach
- Preparing the **engineering section of the board deck** (delivery, quality, talent, asks)

## Inputs the advisor expects

- Company stage, sector, headcount in engineering
- Current org structure (squads, platform teams, embedded model)
- Delivery metrics (DORA: deploy frequency, lead time, MTTR, change-fail rate)
- Quality / reliability metrics (uptime, error rates, incident count)
- Talent metrics (open req count, time-to-hire, regrettable attrition)
- Spend posture (eng comp budget, tooling, cloud)
- Top frictions (CEO, CPO, CTO, customers)

## Workflows

### Workflow 1 — Score engineering org health

1. Pull current state across 6 dimensions (structure, delivery, quality,
   productivity, culture, talent).
2. Run `eng_org_health_scorer.py` against the populated JSON.
3. Translate prioritized gaps into a quarterly OKR for engineering.

```bash
python3 vpe-advisor/scripts/eng_org_health_scorer.py \
  --input eng_state.json --format markdown
```

### Workflow 2 — Build the productivity dashboard (DORA + DevEx)

1. Capture latest delivery + experience metrics per team.
2. Run `eng_productivity_dashboard.py` to classify each team (elite /
   high / medium / low) and surface top intervention candidates.
3. Use output for the weekly engineering review and the board section.

```bash
python3 vpe-advisor/scripts/eng_productivity_dashboard.py \
  --input team_metrics.json --format markdown
```

### Workflow 3 — Plan capacity for the next 2–4 quarters

1. Inventory teams, current headcount, attrition assumption, hiring
   plan, planned investment splits (run-the-business vs grow vs
   transform).
2. Run `eng_capacity_planner.py` to project usable capacity and
   highlight bottleneck teams.
3. Reconcile against product roadmap commitments.

```bash
python3 vpe-advisor/scripts/eng_capacity_planner.py \
  --input capacity_inputs.json --format markdown
```

## Decision frameworks

### CTO vs VPE — where the line is

A common pattern at Series B+:

| Function | CTO | VPE |
|----------|-----|-----|
| Architecture | Owns | Consults |
| Build-vs-buy | Owns | Consults |
| Tech stack decisions | Owns | Consults |
| Infra strategy | Owns | Consults |
| Org structure | Consults | Owns |
| Hiring + retention | Consults | Owns |
| Delivery (how) | Consults | Owns |
| Productivity metrics | Consults | Owns |
| Engineering culture | Joint | Joint |
| Roadmap delivery | Joint with CPO | Joint with CPO |

If you don't have both roles, the founder/CEO usually plays one of them
implicitly. Make the split explicit before adding the second role.

### Org shapes

| Shape | Fits when | Breaks when |
|-------|-----------|-------------|
| Functional (FE, BE, infra) | < 30 engineers, single product | Cross-team feature work; bottlenecks |
| Squad-based | 30–300 engineers, multi-product | Squads too small (<5) or too rigid |
| Platform + product squads | 50+ engineers | Platform team becomes blocker |
| Matrix (capability + product) | Large org with shared specialists | Reporting confusion |
| Embedded in product | Strong product-led culture | Standards drift across teams |

The advisor will default to **platform + product squads** for ≥ 50
engineers. Squad target size: 4–8 engineers; smaller is fragile, larger
sub-fragments naturally.

### Delivery model — which one

- **Scrum** — when work is stable, externally committed, deploy cycles are larger
- **Kanban** — when work is reactive, unpredictable (platform, infra, support)
- **Shape-up / Basecamp-style** — when product team is small, opinionated, and shippable cycles work
- **Hybrid** — most production engineering teams default here

Don't enforce one model across all teams. Different teams need different shapes.

### When to invest in platform engineering

Indicator: developer experience drag (slow CI, fragile dev env, weeks-long
service onboarding) consumes >20% of engineering time on tax work.

Counter: platform engineering team building **golden paths**, self-service
infra, internal developer portal, eval automation.

Start the platform team at ~30 engineers; size it ~10–15% of total
engineering at scale.

## Common engagements

### "We're shipping less than we used to. Why?"
1. Pull DORA metrics — is it deploy frequency, lead time, or change-fail rate?
2. Look at team-level numbers; "engineering is slow" usually means 2–3 specific teams.
3. Check WIP — too much in-flight is the most common cause.
4. Check on-call burden and incident frequency.
5. Triangulate with DevEx survey (developer-reported friction).

### "Help me plan engineering hiring for next year"
1. Pull product roadmap commitments and translate to capacity (use `eng_capacity_planner.py`).
2. Subtract current capacity (headcount × utilization × attrition).
3. Identify the bottleneck capabilities (full-stack, ML, platform, security).
4. Build the hire plan with stage gates.

### "Our top engineers are leaving"
1. Tag attrition: regrettable vs not.
2. Pull exit interview themes for the last 6 months.
3. Look at: comp band relative to market, manager quality, scope, autonomy.
4. Prioritize the 2–3 root causes; design interventions and measure.

### "Help me build the engineering section of the board deck"
1. **Delivery:** DORA metric trends; top wins; top misses.
2. **Quality / reliability:** uptime, incidents (count + severity), SLO posture.
3. **Talent:** headcount, hires, regrettable attrition, key hires planned.
4. **Investment posture:** run/grow/transform mix vs target.
5. **Asks:** usually one budget, one organizational, one product-priority.

## Anti-patterns to avoid

- **VPE without budget authority.** Becomes a glorified scrum master.
- **DORA metrics as a stick.** Use them as compass; never as employee performance.
- **Hiring without retention focus.** Attrition is more expensive than slow hiring.
- **One delivery model across all teams.** Platform and product teams have different shapes.
- **Promoting the strongest engineer to manager.** Career ladder needs both IC and EM tracks.
- **Org redesign every 6 months.** Stability wins; resist the urge.
- **Squad-of-three model at scale.** Below 4 engineers, bus risk + on-call burden are unsustainable.
- **Engineering culture defined by perks.** Real culture is in promotion criteria, hiring bar, incident response, code review norms.

## References

- `references/engineering-org-design.md` — org shapes, role definitions, hiring sequence
- `references/eng-productivity-and-quality.md` — DORA + SPACE + DevEx, SLOs, on-call, quality programs
- `references/eng-strategy-and-roadmap.md` — capacity planning, investment buckets, roadmap alignment

## Related skills

- `c-level-advisor/cto-advisor` — technical strategy + architecture (peer to VPE)
- `c-level-advisor/cpo-advisor` — product partnership
- `c-level-advisor/chro-advisor` — talent / comp / hiring partnership
- `c-level-advisor/chief-data-officer-advisor` — data team interface
- `c-level-advisor/chief-ai-officer-advisor` — AI / ML team interface
- `engineering/observability-designer` — SLO / SLI / error budgets
- `engineering/incident-commander` — incident response practice
- `engineering/feature-flags-architect` — safe deployment practice
- `engineering/chaos-engineering` — reliability practice
- `engineering/senior-architect` — technical decision making

## Output expectations

When the advisor runs, you should walk away with:

1. A clear **point of view**
2. **2–4 concrete next actions** with owners and timelines
3. **Open questions** that materially change the recommendation
4. References to scripts and reference docs that deepen the analysis
