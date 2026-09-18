# Domain: research-ops
Source Skills in this domain: 4

---

## clinical-research

Source path: `references/research-ops/clinical-research/SKILL.md`

# Clinical Research

Operational support for running clinical studies: structuring a protocol so it
survives review, choosing endpoints that are actually analysable, designing
eligibility criteria that do not strangle accrual, planning sample size and
power, and testing whether the site network can deliver the enrolment target.

> **Scope and limits.** This skill supports **study operations** — planning,
> structuring, and auditing. It is not a substitute for a qualified
> biostatistician, and it is not regulatory advice. The sample-size calculator
> assumes a simple parallel design with no interim analyses, multiplicity
> adjustment, covariate adjustment, or clustering; any design departing from
> those assumptions requires a statistician. The protocol auditor checks
> structure and internal consistency, not regulatory acceptability. Every
> artifact produced here needs sign-off from qualified biostatistics, clinical,
> and regulatory affairs personnel before it enters a submission.

## When to use this skill

- **Planning a study** and needing a defensible sample size before the budget
  and site count can be set
- **Auditing a draft protocol** for missing ICH E6 elements before it goes to an
  ethics committee or a sponsor review board
- **Choosing between candidate endpoints** where one is clinically meaningful
  and the other is achievable in the available sample
- **Designing inclusion and exclusion criteria** and needing to see the accrual
  cost of each additional restriction
- **Assessing site feasibility** — deciding how many sites, and which, are
  needed to hit an enrolment target inside the accrual window
- **Diagnosing an under-accruing study** and deciding between adding sites,
  extending the window, or amending eligibility

## Inputs the skill expects

- Study phase, design (parallel, crossover, single-arm), and blinding
- The primary question in a form that names the comparison
- Candidate endpoints with their measurement instrument and timepoint
- Effect size assumptions and their source — prior study, pilot, or literature
- Expected dropout rate, from comparable studies where possible
- For feasibility: candidate sites with eligible population, prior accrual
  attainment, startup time, and competing studies

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The primary endpoint and its measurement timepoint** — everything downstream (sample size, visit schedule, site burden, cost) derives from it
- [ ] **The effect size and where it came from** — a literature effect and a pilot effect carry very different uncertainty, and a pilot-derived SD needs an inflation allowance
- [ ] **Design features that break the simple formulas** — interim analyses, co-primary endpoints, cluster randomisation, or crossover each require a different calculation and a statistician
- [ ] **The enrolment window and site network available** — a sample size that cannot be accrued is not a plan

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Plan sample size and power

1. Fix the primary endpoint and its type: binary, continuous, or time-to-event.
   This selects the design, and the design selects the formula.
2. State the effect size you want to detect and where it came from. **[PROVEN]**
   Power for the smallest effect that would change clinical practice, not for
   the effect you hope to see — the latter systematically under-powers studies.
3. Set alpha (0.05 two-sided unless the protocol justifies otherwise), power
   (80% minimum, 90% where feasible), allocation ratio, and dropout rate.
4. Run the calculator. Read both the analysed n and the enrol n — the dropout
   inflation is the number that drives the budget.
5. If you have a fixed n constrained by budget or accrual, pass it as
   `planned_n_per_group` and read the achieved power instead.
6. Take the result to a biostatistician. This step is not optional.

```bash
python3 research-ops/clinical-research/scripts/sample_size_calculator.py \
  --input research-ops/clinical-research/assets/sample_power_spec.json \
  --format text
```

### Workflow 2 — Audit a protocol outline

1. Map the draft protocol's sections onto the ICH E6 element keys.
2. Enter endpoints with role, measure, timepoint, and analysis population;
   enter inclusion and exclusion criteria verbatim.
3. Run the auditor. It reports missing sections, endpoints that cannot be
   analysed as written, eligibility criteria that conflict or duplicate, and
   gaps in the statistical and safety sections.
4. Clear every `fail` before circulating the draft. Missing sections and an
   unadjusted interim analysis are the two findings most likely to cost you a
   review cycle.

```bash
python3 research-ops/clinical-research/scripts/protocol_auditor.py \
  --input research-ops/clinical-research/assets/sample_protocol.json \
  --format text
```

### Workflow 3 — Test the site network against the enrolment target

1. Collect per-site data: eligible annual population, self-reported accrual
   estimate, prior accrual attainment, startup time, coordinator status, and
   competing studies.
2. Run the feasibility scorer. It discounts self-reported estimates, blends in
   the site's historical attainment, caps against eligible population, and
   subtracts startup time from the accrual window.
3. Read the shortfall. If it is positive, the choice is more sites, a longer
   window, or looser eligibility — decide deliberately rather than discovering
   it at month 14.
4. Use `--select` to test whether a smaller, higher-quality site set beats a
   larger one. It usually does on cost, and often on total accrual.

```bash
python3 research-ops/clinical-research/scripts/site_feasibility_scorer.py \
  --input research-ops/clinical-research/assets/sample_sites.json \
  --select 5 --format text
```

## Decision frameworks

### Endpoint type drives everything

| Endpoint type | Design | Sample driver | Typical relative n |
|---------------|--------|---------------|--------------------|
| **Continuous** (change in a scale) | Two means | Standardised effect size δ/σ | Smallest |
| **Binary** (responder yes/no) | Two proportions | Absolute difference and baseline rate | 2-4x the continuous equivalent |
| **Time-to-event** | Log-rank | Hazard ratio and event probability | Driven by events, not enrolment |
| **Count / rate** | Poisson or negative binomial | Rate ratio and dispersion | Requires a statistician |
| **Composite** | Depends on components | The component that dominates | Interpretation risk is high |

**[PROVEN]** Where the same clinical question can be posed as continuous or
binary, the continuous version needs materially fewer participants.
Dichotomising a continuous measure discards information and inflates n — do it
only when the threshold itself is what is clinically meaningful.

### Effect size sources and their reliability

| Source | Reliability | Adjustment |
|--------|-------------|------------|
| Large completed trial in the same population | **[PROVEN]** highest | Use as-is |
| Meta-analysis of comparable trials | **[PROVEN]** high | Use the pooled estimate; check heterogeneity |
| Single published trial, different population | **[RECOMMENDED]** moderate | Discount by 20-30%; effects rarely transfer intact |
| Internal pilot study | **[RECOMMENDED]** moderate | Add 10-15% to n; a pilot SD is imprecise |
| Clinician consensus on the minimum meaningful difference | **[RECOMMENDED]** | Best basis for the *target*, not for the variance |
| The effect needed to make the business case work | Not a source | This is how under-powered studies get funded |

That last row is a real failure mode. When the affordable sample size is
back-solved into an effect size, the study is designed to fail and the failure
is uninterpretable — you cannot distinguish "no effect" from "not enough people."

### Eligibility restrictiveness

Every criterion trades internal validity for accrual and generalisability.

| Criteria count | Typical effect |
|----------------|----------------|
| Under 15 | Broad, fast accrual, high generalisability |
| 15-25 | Standard for a phase 3 study |
| 25-35 | Screen failure rates climb steeply; accrual timelines stretch |
| Over 35 | Accrual frequently fails; the treated population may not resemble the studied one |

**[RECOMMENDED]** For every criterion beyond about 20, require a written
justification naming the specific safety or interpretability risk it addresses.
Criteria accumulate through review by addition — nobody is ever assigned to
remove one — and the cumulative accrual cost is invisible at the point each is
added.

## Anti-Patterns

### Back-Solved Power
**Mistake:** Deciding the affordable sample size first, then choosing the effect
size that makes that n reach 80% power.
**Why it happens:** The budget is fixed before the science is planned, and the
calculation is treated as a document to produce rather than a constraint to
respect.
**Instead:** Compute n from the smallest clinically meaningful effect. If that n
is unaffordable, the honest options are to seek more funding, run a smaller
study explicitly labelled as a pilot with a feasibility objective, or not run
it. A study powered for an implausibly large effect consumes the same budget and
produces an uninterpretable result.

### The Optimistic Site Estimate
**Mistake:** Building the accrual plan on the enrolment rates sites report during
feasibility questionnaires.
**Why it happens:** Sites want to be selected, the estimate is made by someone
who is not the person who will do the recruiting, and nobody is ever penalised
for an optimistic feasibility response.
**Instead:** Discount every self-reported estimate substantially and weight by
the site's actual attainment on previous studies. Cross-check against the
eligible population they reported — a site claiming 8 participants a month from
a clinic seeing 180 eligible patients a year is claiming a screening yield that
does not occur. Plan for the discounted number and treat outperformance as
upside.

### Criterion Creep
**Mistake:** Each protocol review round adds two or three exclusion criteria, and
the final protocol has 40.
**Why it happens:** Every reviewer can name a subgroup that might complicate
interpretation, and adding an exclusion is a costless-looking way to resolve the
comment. Nobody's job is to remove one.
**Instead:** Cap the criteria count in the protocol plan and treat additions as
trade-offs requiring an explicit removal or a written justification of the
accrual cost. Track the projected screen failure rate as criteria accumulate and
put that number in front of reviewers.

### The Unanalysable Endpoint
**Mistake:** A primary endpoint like "improvement in patient wellbeing" with no
named instrument, threshold, or timepoint.
**Why it happens:** It is written early as a placeholder during objective-setting
and is never converted into an operational definition.
**Instead:** Every endpoint needs four things before the protocol circulates: the
instrument, the metric derived from it, the threshold or contrast that defines
the outcome, and the timepoint. If any of the four is missing, the endpoint
cannot be powered, collected consistently, or analysed.

### Silent Interim Looks
**Mistake:** Planning an interim analysis without an alpha spending function,
or examining accumulating data informally "just to see how it is going."
**Why it happens:** Interim looks feel like prudent management, and the
statistical cost is invisible to anyone not looking for it.
**Instead:** Pre-specify every interim analysis with its alpha spending function
and stopping boundaries, and restrict access to unblinded accumulating data to
an independent monitoring committee. Unadjusted repeated testing inflates type I
error, and an informal look by the sponsor team compromises the trial's
integrity even when nothing is acted on.

## Files

| File | Purpose |
|------|---------|
| `scripts/sample_size_calculator.py` | Sample size and power CLI: input validation, dropout inflation, planning warnings, and reporting |
| `scripts/power_formulas.py` | Design formulas imported by `sample_size_calculator.py`: the two-proportion, two-mean (with t-correction), and log-rank sample-size calculations, the achieved-power inversions, and the method notes reported with every result. Edit here to revise the statistics |
| `scripts/protocol_auditor.py` | Audits a protocol outline against ICH E6 elements, endpoint definitions, and eligibility consistency |
| `scripts/protocol_rules.py` | Rule definitions imported by `protocol_auditor.py`: the ICH E6 required-section table and its guidance strings, vague-measure and DSMB-phase thresholds, the SAE reporting window, severity ordering, and the finding accumulator. Edit here to revise what the audit expects |
| `scripts/site_feasibility_scorer.py` | Discounts site accrual estimates and tests the network against the enrolment target |
| `references/protocol-and-endpoint-design.md` | ICH E6 protocol contents, endpoint hierarchies, eligibility design, estimand framing |
| `references/statistical-planning.md` | Formulas, worked examples, design effects, interim analysis, and when to escalate to a statistician |
| `assets/protocol-outline-template.md` | The protocol skeleton with every required element |
| `assets/sample_power_spec.json` | Runnable input for the sample size calculator |
| `assets/sample_protocol.json` | Runnable input for the protocol auditor |
| `assets/sample_sites.json` | Runnable input for the site feasibility scorer |

---

## market-research

Source path: `references/research-ops/market-research/SKILL.md`

# Market Research

Applied market research for people who have to defend a number in a room. This
skill is about the operational craft: constructing a market size two independent
ways, reconciling the gap, cutting the market into segments that behave
differently, and fielding survey instruments that do not manufacture the answer
you hoped for.

## When to use this skill

- **Sizing a market for a board deck, investor memo, or funding request** where
  the number will be challenged line by line
- **Reconciling a TAM you inherited** — an analyst report says $12B, your
  bottom-up build says $700M, and you need to explain the gap
- **Segmenting a market** before a pricing, packaging, or GTM decision
- **Triangulating demand signals** (search volume, inbound, win rates, analyst
  data, competitor headcount) into one directional read
- **Designing a survey** to answer a market question — willingness to pay,
  category awareness, switching intent — without leading the respondent
- **Auditing someone else's sizing** before you sign off on it

## Inputs the skill expects

- The market definition in one sentence — including geography and buyer
- A top-down anchor (published market value) with its source and vintage
- Bottom-up unit economics — unit count, qualified share, annual value per unit
- The decision the number is feeding (investment size, hiring plan, pricing)
- Time horizon for SOM (1 year vs 3 years changes it by an order of magnitude)
- For surveys: population size, target margin of error, mode (panel, list, intercept)

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Market definition — what is in and what is out** — the single biggest driver of the number; "dental software" and "dental practice management software for multi-chair EU practices" differ by 20x
- [ ] **The decision this sizing supports** — a fundraise tolerates a wide TAM; a hiring plan needs a defensible SOM
- [ ] **Time horizon for SOM** — 12-month obtainable share and 3-year obtainable share are different artifacts
- [ ] **Whether a published anchor exists and its vintage** — a 2022 report in a 2026 memo needs an explicit growth bridge

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Build and reconcile TAM/SAM/SOM

1. Write the market definition sentence first. Everything downstream inherits it.
2. Build the top-down chain: published market value, then named filters that
   each cut it (geography, segment, buyer qualification), each with a retention
   fraction and a stated justification.
3. Build the bottom-up chain independently: unit count from a countable source,
   qualified share, annual value per unit, reachable share, expected win rate.
4. Run the builder. It computes both chains, reconciles them layer by layer, and
   flags implausible ratios and divergence.
5. Resolve every `fail` before the number leaves your machine. A `warn` needs a
   sentence in the memo, not a fix.

```bash
python3 research-ops/market-research/scripts/tam_sam_som_builder.py \
  --input research-ops/market-research/assets/sample_market_model.json \
  --format text
```

### Workflow 2 — Triangulate demand signals

1. Collect every observable demand signal you have — search volume, inbound
   lead velocity, win rate by segment, analyst growth rates, competitor hiring,
   category conference attendance.
2. Score each for source independence and directional strength.
3. Run the triangulator to get a weighted demand index and, more importantly,
   the list of signals that contradict each other.
4. Investigate contradictions before averaging them away. A conflicting signal
   is usually a segmentation boundary you have not drawn yet.

```bash
python3 research-ops/market-research/scripts/demand_signal_triangulator.py \
  --input research-ops/market-research/assets/sample_demand_signals.json \
  --format text
```

### Workflow 3 — Audit a survey instrument before fielding

1. Draft the instrument with the market question stated at the top.
2. Run the auditor. It checks each item for leading language, double-barrelled
   phrasing, absolutes, unbalanced or over-long scales, and missing escape
   options.
3. Check the sample-size verdict — it computes required n from population,
   target margin of error, and confidence level.
4. Fix every `fail`, then re-run. Field only on a clean run.

```bash
python3 research-ops/market-research/scripts/survey_instrument_auditor.py \
  --input research-ops/market-research/assets/sample_survey.json \
  --format text
```

## Decision frameworks

### Which sizing method for which situation

| Situation | Method | Why |
|-----------|--------|-----|
| Established category, published reports exist | **[PROVEN]** Top-down anchored, bottom-up as a check | The anchor is defensible; bottom-up catches definition drift |
| New category, no analyst coverage | **[PROVEN]** Bottom-up only, stated as such | A top-down number for a category that does not exist yet is fiction |
| Adjacent expansion from an existing product | **[RECOMMENDED]** Bottom-up from your own funnel conversion | Your observed win rates beat any external estimate |
| Regulated market with registries | **[PROVEN]** Bottom-up from the registry count | Counting licensed entities is the strongest unit base available |
| Consumer market, behaviour-driven | **[RECOMMENDED]** Top-down plus survey-derived incidence | Unit counts exist but qualification requires stated behaviour |

### Plausibility thresholds

These are the ratios the builder enforces. They are heuristics, not laws — but
crossing one without an explanation in the memo is how sizing loses credibility.

| Ratio | Healthy range | Flag when |
|-------|---------------|-----------|
| SAM / TAM | 5% – 40% | Above 60% — you are claiming almost the whole market is addressable |
| SOM / SAM (3-year) | 1% – 10% | Above 20% — implies category leadership inside the horizon |
| SOM / TAM | 0.1% – 5% | Above 5% for a pre-scale company |
| Bottom-up vs top-down TAM | Within 3x | Above 3x warn, above 10x fail — the two builds are answering different questions |

### Survey sample size at 95% confidence

Required n for a proportion estimate, finite population corrected. Use these as
a sanity check on the auditor's output.

| Population | ±10% MoE | ±5% MoE | ±3% MoE |
|-----------|----------|---------|---------|
| 500 | 81 | 218 | 341 |
| 5,000 | 95 | 357 | 880 |
| 100,000 | 96 | 383 | 1,056 |
| 1,000,000+ | 97 | 385 | 1,066 |

The jump from ±10% to ±5% quadruples cost for a band most market decisions do
not need. **[RECOMMENDED]** Field at ±10% for directional category questions and
reserve ±5% for pricing and packaging decisions where the band drives the choice.

## Anti-Patterns

### The Inherited TAM
**Mistake:** Copying a market size from an analyst report or a competitor's deck
into your own memo, adjusting the geography, and presenting it as your build.
**Why it happens:** The number is already large and already sourced, and building
bottom-up takes two days you do not think you have.
**Instead:** Use the published figure as the top-down anchor only, and always
build the bottom-up chain alongside it. The reconciliation gap is the most
informative artifact of the whole exercise — it tells you exactly which
definition the report used and yours does not.

### The Multiplication Fantasy
**Mistake:** SOM computed as "if we capture 1% of the TAM" with no mechanism
behind the 1%.
**Why it happens:** It sounds modest, so nobody challenges it, and it produces a
convenient number without requiring a channel model.
**Instead:** Build SOM from reachable units times expected win rate, where both
come from something observed — your funnel, a pilot, or a comparable. If you
cannot name the channel that reaches those units, you do not have a SOM.

### The Stale Anchor
**Mistake:** A four-year-old market report used at face value in a current memo.
**Why it happens:** It was the best available source when someone first built the
model, and nobody re-checks a number that has been in the deck for a year.
**Instead:** Record the vintage of every anchor. If it is more than 18 months
old, apply an explicit growth bridge with a stated CAGR and show both the raw
and bridged figures. An unbridged stale anchor invites the reviewer to discount
everything downstream of it.

### The Leading Instrument
**Mistake:** Asking "How valuable would an automated reporting feature be to
your team?" and reporting the enthusiasm as demand evidence.
**Why it happens:** The team already believes in the feature, and the question is
written by the person who wants it built.
**Instead:** Ask about the current behaviour and its cost — "How many hours last
month did your team spend building reports manually?" — and let the demand fall
out of the numbers. Run every instrument through the auditor before fielding;
leading items are cheap to fix pre-field and impossible to fix post-field.

### Segments That Do Not Behave Differently
**Mistake:** Cutting the market by company size or geography because that data is
available, then finding every segment has the same conversion and the same ACV.
**Why it happens:** Firmographic fields are in the CRM; behavioural ones are not.
**Instead:** Segment on the variable that changes the buying decision — trigger
event, existing tooling, regulatory obligation, or team structure. A segmentation
is only useful if the segments have measurably different win rates or values.

## Files

| File | Purpose |
|------|---------|
| `scripts/tam_sam_som_builder.py` | Builds top-down and bottom-up TAM/SAM/SOM, reconciles them, flags implausible ratios |
| `scripts/survey_instrument_auditor.py` | Checks survey items for leading language, scale problems, and computes required sample size |
| `scripts/demand_signal_triangulator.py` | Weights and triangulates demand signals; surfaces contradictions and source concentration |
| `references/market-sizing-methods.md` | Method selection, filter design, growth bridges, worked reconciliation examples |
| `references/survey-design-methodology.md` | Question construction, scale design, sampling frames, mode effects, field QA |
| `assets/market-sizing-memo-template.md` | The memo structure a sizing number ships in |
| `assets/sample_market_model.json` | Runnable input for the TAM/SAM/SOM builder |
| `assets/sample_survey.json` | Runnable input for the survey auditor |
| `assets/sample_demand_signals.json` | Runnable input for the demand triangulator |

---

## product-research

Source path: `references/research-ops/product-research/SKILL.md`

# Product Research

The operational layer of continuous product discovery: choosing a method that
actually answers the question asked, recruiting the right people without
poisoning the sample, running interviews that surface behaviour rather than
opinion, and converting a pile of session notes into insights with an honest
confidence attached.

## When to use this skill

- **A team is about to build something** and the evidence behind it is three
  sales anecdotes and a strongly held opinion
- **Choosing a method** — someone has asked for "a survey" or "some user
  interviews" before anyone has written down the question
- **Designing a screener** for a study where recruiting the wrong participants
  would be worse than not running it
- **Writing an interview guide** that has to be run consistently by several
  people across a dozen sessions
- **Synthesising evidence into insights** after a round of discovery, with a
  defensible confidence level on each claim
- **Standing up a continuous discovery cadence** — a repeatable weekly rhythm
  rather than one-off project research

## Inputs the skill expects

- The decision the research feeds, and who makes it
- The question in interrogative form — what you do not know, not what you want
  confirmed
- Decision reversibility — can this be undone in a sprint, or is it a one-way door
- Timeline and budget for the study
- Access to participants: existing customers, prospects, panel, or none
- Existing evidence already on hand (tickets, session recordings, sales calls)

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The decision this research informs, and its reversibility** — a one-way door justifies weeks of evidence; a reversible change is often better answered by shipping an experiment
- [ ] **The question in interrogative form** — "do users want X" and "how do users currently accomplish X" call for completely different methods
- [ ] **Participant access** — whether you can reach real users determines whether the plan is feasible at all, and it is the constraint teams discover last
- [ ] **Timeline** — a two-day answer and a three-week answer are different studies, not the same study rushed

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Pick the method before anyone books a session

1. Write the question in interrogative form. If it starts with "should we," it
   is a decision, not a research question — rewrite it as what you would need to
   know to decide.
2. Classify the question: generative (what is going on), evaluative (does this
   work), or descriptive (how many, how often).
3. Rate decision reversibility and state the timeline and participant access.
4. Run the recommender. It returns a primary method, a cheaper fallback, the
   minimum sample, and the methods it explicitly ruled out with reasons.
5. If the recommendation is "ship an experiment instead," take that seriously.
   For reversible decisions, an experiment usually beats a study on both speed
   and evidence quality.

```bash
python3 research-ops/product-research/scripts/method_recommender.py \
  --input research-ops/product-research/assets/sample_research_question.json \
  --format text
```

### Workflow 2 — Validate the screener before recruiting opens

1. Draft the screener: qualifying criteria, disqualifying criteria, and the
   items that test each.
2. Run the validator. It checks for transparent qualifying answers, missing
   disqualification logic, professional-respondent exposure, quota coverage,
   and criteria that no item actually tests.
3. Fix every `fail`. A screener defect costs you the whole study — you find out
   only during the sessions, by which point the incentives are spent.

```bash
python3 research-ops/product-research/scripts/screener_validator.py \
  --input research-ops/product-research/assets/sample_screener.json \
  --format text
```

### Workflow 3 — Score insight confidence during synthesis

1. Draft each candidate insight as a claim, and attach the evidence items that
   support it — each with its source type, participant, and whether it is
   observed behaviour or reported opinion.
2. Run the scorer. It weights observed evidence above reported evidence, rewards
   source and participant diversity, and penalises claims resting on a single
   session or a single channel.
3. Ship only the insights scoring `moderate` or above as decision inputs.
   Everything below that is a hypothesis and must be labelled as one.

```bash
python3 research-ops/product-research/scripts/insight_confidence_scorer.py \
  --input research-ops/product-research/assets/sample_evidence.json \
  --format text
```

## Decision frameworks

### Method by question type

| Question type | Example | Primary method | Minimum sample |
|---------------|---------|----------------|----------------|
| Generative — what is going on | "How do support agents currently triage tickets?" | **[PROVEN]** Contextual inquiry or semi-structured interview | 6-8 |
| Evaluative — does this work | "Can users complete onboarding unaided?" | **[PROVEN]** Moderated usability test | 5-8 |
| Comparative — which is better | "Which of two flows converts?" | **[PROVEN]** A/B experiment | Powered by traffic |
| Descriptive — how many, how often | "What share of accounts hit this limit?" | **[PROVEN]** Instrumentation or log analysis | Full population |
| Prioritisation — which matters most | "Which of five problems is most acute?" | **[RECOMMENDED]** Survey with forced trade-offs | 100+ |
| Desirability — would people want this | "Would customers use X?" | **[RECOMMENDED]** Painted-door or pre-commitment test | Traffic-dependent |
| Diagnostic — why did this drop | "Why did activation fall 12%?" | **[RECOMMENDED]** Funnel analysis first, then targeted interviews | 5-6 after analysis |

The pattern worth internalising: **quantitative methods tell you what and how
many; qualitative methods tell you why and how.** Reaching for interviews to
answer a "how many" question, or for a survey to answer a "why" question, is the
most common and most expensive method error in product research.

### Reversibility gate

| Decision type | Evidence bar | Typical spend |
|---------------|--------------|---------------|
| **Reversible in a sprint** | Ship it behind a flag and measure | Hours. Research here is usually waste. |
| **Reversible in a quarter** | 5-6 interviews or one experiment | Days |
| **Costly to reverse** — pricing, data model, public API | Mixed methods; qual for the why, quant for the size | 1-3 weeks |
| **One-way door** — platform, contract, market entry | Triangulated across 3+ independent sources | Weeks, and worth it |

**[PROVEN]** Match evidence spend to reversibility, not to how interesting the
question is. The most common research-ops failure is not too little research —
it is expensive research on reversible decisions while one-way doors get decided
on intuition.

### Saturation — when to stop interviewing

Track new themes per session. Stop when two consecutive sessions produce no new
theme.

| Sessions run | Typical state |
|--------------|---------------|
| 1-3 | Every session is new. Do not synthesise yet — you are pattern-matching on noise. |
| 4-6 | Themes start repeating. First real patterns appear. |
| 7-9 | Saturation for a homogeneous segment. Diminishing returns set in hard. |
| 10-12 | Needed only when covering 2+ distinct segments — treat each segment as its own count. |
| 15+ | Almost always over-research, unless the segments are genuinely many |

The count that matters is **per segment**, not in total. Eight sessions spread
across four segments is two per segment, which is anecdote.

## Anti-Patterns

### The Confirmation Study
**Mistake:** Running research after the decision is made, with a question phrased
to validate it — "we want to check users like the new dashboard."
**Why it happens:** The team needs air cover for a choice already funded, and
nobody wants to be the person whose study kills the roadmap item.
**Instead:** Write down, before recruiting, what result would cause you to change
course. If no such result exists, cancel the study and save the money — you are
buying decoration, not evidence. Getting that sentence written is also the
fastest way to discover the decision was never really open.

### Asking Users to Design
**Mistake:** "What features would you like to see?" and treating the answers as a
roadmap.
**Why it happens:** It feels maximally user-centred, and it produces concrete
output quickly.
**Instead:** Ask about the last time they hit the problem — what they were doing,
what they tried, what it cost them. People are reliable reporters of their own
experience and unreliable designers of solutions. Extract the problem from the
story; the solution is your job.

### Sample of Convenience
**Mistake:** Interviewing whoever answers the recruiting email — usually your
most engaged power users — and generalising to the whole base.
**Why it happens:** They respond fastest, they are pleasant to talk to, and the
sessions feel productive.
**Instead:** Recruit against a quota that includes the segments you most need to
hear from — churned users, low-engagement accounts, people who evaluated you and
chose a competitor. Those are harder to reach and worth several times more per
session. If you can only get power users, say so explicitly in the writeup and
scope the conclusion to them.

### Synthesis by Highlight Reel
**Mistake:** Building the findings deck from the most quotable moments across
sessions.
**Why it happens:** Vivid quotes are persuasive and memorable, and a striking
quote from one participant carries more weight in a readout than a pattern
across six.
**Instead:** Count first, quote second. Establish how many participants exhibited
each theme, then select a quote to illustrate a theme you have already
quantified. A quote is an illustration of evidence, never the evidence itself.

### Research Theatre on a Reversible Decision
**Mistake:** A three-week study to decide something that could be shipped behind
a flag on Tuesday and measured by Friday.
**Why it happens:** A research process exists, so it gets applied uniformly
regardless of what is at stake.
**Instead:** Run the reversibility gate first. If the decision is reversible in a
sprint, ship the experiment — it produces better evidence (observed behaviour at
real scale) faster and cheaper than any study. Reserve the research capacity for
the one-way doors that are currently being decided on nothing at all.

## Files

| File | Purpose |
|------|---------|
| `scripts/method_recommender.py` | Recommends a research method from question type, reversibility, timeline, and access |
| `scripts/screener_validator.py` | Checks a screener for transparency, missing disqualification logic, and quota coverage |
| `scripts/insight_confidence_scorer.py` | Scores insight confidence from evidence count, type, and source diversity |
| `references/method-selection-guide.md` | Every method with cost, sample, output, and the questions it cannot answer |
| `references/interview-craft.md` | Guide construction, probing technique, moderator failure modes, synthesis mechanics |
| `assets/interview-guide-template.md` | The structure a semi-structured discovery guide ships in |
| `assets/sample_research_question.json` | Runnable input for the method recommender |
| `assets/sample_screener.json` | Runnable input for the screener validator |
| `assets/sample_evidence.json` | Runnable input for the insight confidence scorer |

---

## research-finance

Source path: `references/research-ops/research-finance/SKILL.md`

# Research Finance

The money side of research operations: building a study budget that funds what
the study will actually consume, tracking spend against delivery rather than
against the calendar, and deciding which research to fund when the portfolio
asks for more than the budget holds.

## When to use this skill

- **Costing a study** before a funding request, where the budget will be
  scrutinised line by line and a missing line item becomes unfunded work
- **Answering "what does this cost per participant"** — the number every funder,
  finance partner, and sponsor asks first
- **Tracking a programme mid-flight** and needing to know whether the spend is
  buying delivery or just buying time
- **Forecasting an overrun** early enough to descope rather than late enough to
  need supplementary funding
- **Prioritising a research portfolio** that asks for more than the budget
  available
- **Defending a research budget** against a finance partner who sees a cost
  centre and needs to see decision value

## Inputs the skill expects

- Unit costs: per participant, per site, per site-month, and fixed programme costs
- Enrolment target, screen failure rate, site count, and duration
- Contingency and overhead rates your organisation applies
- For tracking: budget at completion, weighted milestones with completion, and
  planned versus actual spend by period
- For portfolio work: each study's cost, the value of the decision it informs,
  and the probability it changes that decision
- Decision deadlines — a study that lands after the decision is worth nothing

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Screen failure or recruitment yield rate** — budgets built on enrolled participants alone systematically under-fund screening, which is real work on real people
- [ ] **Whether overhead and contingency are inside or outside the quoted number** — the same study is quoted at wildly different totals depending on this, and the mismatch surfaces after the award
- [ ] **The decision each study informs and its value** — without it a portfolio can only be ranked by cost, which funds the cheap studies rather than the valuable ones
- [ ] **Who holds the budget and what triggers a change request** — determines how much contingency you need and how granular the tracking must be

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Build a study budget from unit costs

1. Separate costs into four blocks: per participant, per site, per site-month,
   and fixed. Most under-budgeting comes from costs sitting in the wrong block —
   site coordination billed as fixed rather than per site-month is the classic.
2. Mark which per-participant costs are incurred on **screened** rather than
   enrolled participants. Screening is charged on everyone screened.
3. Set contingency and overhead. **[RECOMMENDED]** 10% contingency minimum;
   8% is the floor below which every protocol amendment becomes a change request.
4. Run the builder. Read the cost per enrolled participant and the cost per
   insight — those are the two numbers the funding conversation turns on.
5. Clear every `fail`. They are all cases of work the study will do and the
   budget does not fund.

```bash
python3 research-ops/research-finance/scripts/study_budget_builder.py \
  --input research-ops/research-finance/assets/sample_budget.json \
  --format text
```

### Workflow 2 — Track burn against milestone delivery

1. Weight the milestones by share of total work, not by how visible they are.
   Enrolment usually carries 40-50% of the weight; setup milestones feel
   important and are cheap.
2. Record planned and actual spend by period.
3. Run the tracker. It computes earned value, cost and schedule performance, and
   the estimate at completion.
4. Act on the spend-versus-delivery gap, not on the spend-versus-calendar view.
   A programme at 36% spent and 24% delivered is heading for a 50% overrun,
   and the monthly finance report showing "on budget" will not tell you that.

```bash
python3 research-ops/research-finance/scripts/burn_vs_milestone_tracker.py \
  --input research-ops/research-finance/assets/sample_burn.json \
  --format text
```

### Workflow 3 — Prioritise the portfolio by decision value

1. For each candidate study, state the decision it informs, the cost of getting
   that decision wrong, and the probability the study changes the choice.
2. Record decision reversibility and the decision deadline.
3. Run the prioritiser. It computes expected decision value, discounts for
   reversibility, zeroes out studies that arrive too late or inform decisions
   already made, and allocates the budget greedily by value per unit cost.
4. Take the `fail` findings to the portfolio review directly. "This study informs
   a decision that has already been made" is a conversation worth having out
   loud, and the ranking alone will not force it.

```bash
python3 research-ops/research-finance/scripts/portfolio_prioritizer.py \
  --input research-ops/research-finance/assets/sample_portfolio.json \
  --budget 400000 --format text
```

## Decision frameworks

### Where research budgets under-fund themselves

| Omission | Consequence | Fix |
|----------|-------------|-----|
| **Screen failure** | Screening work on non-enrolled participants is unfunded | Gross participant costs up by 1/(1 − failure rate) |
| **Site coordination as fixed** | Understates cost of a long study | Charge per site-month for the full duration |
| **Close-out and reporting** | Runs out of money at the least recoverable moment | Budget close-out, database lock, and the final report explicitly |
| **Data management** | Absorbed into "IT" and then contested | Separate line, sized against participant count |
| **Statistics beyond the plan** | Analysis is charged as an overrun | Fund the analysis plan and one round of additional analysis |
| **Protocol amendments** | Every change becomes a change request | 10% contingency minimum |
| **Currency and inflation on multi-year studies** | Real cost drifts above the award | Explicit escalation line on studies over 24 months |

### Interpreting the cost performance index

| CPI | Meaning | Action |
|-----|---------|--------|
| **Above 1.05** | Delivery is running ahead of spend | Verify the milestone weights are honest before celebrating |
| **0.95 – 1.05** | On plan | Continue monitoring |
| **0.85 – 0.95** | Drifting | Identify the driver now; it rarely self-corrects |
| **0.70 – 0.85** | Materially over | Descope or seek funding — decide deliberately |
| **Below 0.70** | Forecast overrun above 40% | Stop and re-plan. Continuing spends the remaining budget on the same inefficiency. |

**[PROVEN]** The single most useful number in research finance is the gap
between percent spent and percent delivered. A gap above 20 points is the
reliable early signal of a supplementary funding request, and it appears months
before the calendar-based view shows anything wrong.

### Value of information

A study is worth funding to the extent that it changes a decision, and a decision
is worth informing to the extent that getting it wrong is expensive.

```
expected decision value = decision value × P(research changes the decision)
                          × reversibility multiplier
```

| Reversibility | Multiplier | Reasoning |
|---------------|-----------|-----------|
| Reversible in a sprint | 0.15 | A wrong choice costs one sprint to undo — information is nearly worthless |
| Reversible in a quarter | 0.45 | Correctable, but at real cost |
| Costly to reverse | 0.85 | Most of the decision value is genuinely at stake |
| One-way door | 1.0 | Full decision value at stake |

Two studies are automatically worth zero regardless of their inputs: one
informing a decision already made, and one answering after the decision deadline.
Both are common, and both survive portfolio review because nobody asks the
question directly.

### Cost per insight benchmarks

Cost per insight is a blunt instrument and a useful one — it forces a comparison
across methods that otherwise get evaluated in isolation.

| Method | Typical cost per decision-ready insight | Notes |
|--------|----------------------------------------|-------|
| Support ticket / call analysis | Lowest | Evidence already paid for; only analysis time |
| Instrumentation analysis | Low | Assumes instrumentation exists |
| Interview round (6-8 sessions) | Moderate | Recruiting and incentives dominate |
| Survey (400 completes) | Moderate | Panel cost dominates; falls sharply with an owned list |
| Experiment | Moderate | Engineering time is the real cost, and it is usually uncounted |
| Multi-site clinical study | Highest by orders of magnitude | Regulatory and site infrastructure dominate |

**[RECOMMENDED]** Count engineering time in experiment costs. It is the most
frequently omitted research cost in product organisations, and omitting it makes
experiments look free relative to studies that carry an explicit invoice.

## Anti-Patterns

### Budgeting the Enrolled, Screening the Many
**Mistake:** Building the participant budget on the enrolment target when the
protocol will screen substantially more people to reach it.
**Why it happens:** The enrolment number is the one in the protocol and the one
everyone quotes. The screen failure rate lives in a different section, if it is
written down at all.
**Instead:** Gross every screening-stage cost up by 1/(1 − screen failure rate).
At a 25% failure rate that is a third more screening assessments than the
enrolment target implies — and screening is real clinical work on real people
that someone has to pay for.

### Tracking Spend Against the Calendar
**Mistake:** A monthly report showing spend versus planned spend, with no
delivery measure alongside it.
**Why it happens:** Spend and calendar are both easy to measure and both come
from finance systems automatically. Delivery requires someone to assess
milestone completion honestly.
**Instead:** Weight the milestones, assess completion each period, and report the
spend-delivery gap as the headline. A study spending exactly to plan while
enrolling at half rate looks perfectly healthy on a calendar view and is heading
for a large overrun.

### Front-Loaded Milestone Weights
**Mistake:** Assigning heavy weights to setup milestones — protocol approved,
ethics obtained, first site activated — so the programme shows 40% delivered
before a single participant is enrolled.
**Why it happens:** Setup milestones are discrete, visible, and satisfying to
complete. Enrolment is a long grind with no natural checkpoints.
**Instead:** Weight by share of actual work and cost. Enrolment typically
deserves 40-50% of the total weight. Front-loaded weights hide exactly the
problem earned-value tracking exists to expose, and they hide it during the
window when descoping is still possible.

### Ranking the Portfolio by Cost
**Mistake:** Funding the cheap studies first because more of them fit in the
budget.
**Why it happens:** Cost is known precisely and decision value is an estimate, so
the ranking gravitates to the number that feels solid.
**Instead:** Rank by expected decision value per unit cost. A rough estimate of
decision value beats no estimate — it at least surfaces the studies costing more
than the decision is worth. Funding by cost systematically starves the expensive
studies attached to the largest decisions, which is precisely backwards.

### Funding the Decision Already Made
**Mistake:** A study that will report after the choice has been committed, kept
in the portfolio to validate it.
**Why it happens:** The work was scoped when the decision was still open, and
cancelling it feels like admitting the decision was made prematurely.
**Instead:** Ask directly, at every portfolio review, whether each study's
decision is still open and what result would change it. If nothing would, cut the
study and redirect the money. This is documentation, and it should be funded as
documentation if it is funded at all.

## Files

| File | Purpose |
|------|---------|
| `scripts/study_budget_builder.py` | Expands unit costs into line items, applies screen-failure grossing, contingency, and overhead; reports unit economics |
| `scripts/burn_vs_milestone_tracker.py` | Earned-value tracking of spend against milestone delivery, with completion forecast and overrun warning |
| `scripts/portfolio_prioritizer.py` | Ranks studies by expected decision value per unit cost and allocates a fixed budget |
| `references/research-cost-models.md` | Cost structures by method, unit-cost drivers, cost-per-insight modelling, common omissions |
| `references/funding-and-portfolio-allocation.md` | Funding sources, grant budget conventions, value-of-information method, portfolio governance |
| `assets/study-budget-template.md` | The budget document a funding request ships in |
| `assets/sample_budget.json` | Runnable input for the budget builder |
| `assets/sample_burn.json` | Runnable input for the burn tracker |
| `assets/sample_portfolio.json` | Runnable input for the portfolio prioritiser |
