# Domain: product-team
Source Skills in this domain: 13

---

## ab-test-setup

Source path: `references/product-team/ab-test-setup/SKILL.md`

# A/B Test Setup - Experimentation Design & Analysis

**Category:** Product Team
**Tags:** A/B testing, experiments, statistical significance, sample size, feature flags, hypothesis testing

## Overview

A/B Test Setup provides the complete framework for designing experiments that produce statistically valid, actionable results. Most A/B tests fail not because the variant was wrong, but because the test was poorly designed: wrong sample size, wrong metric, or someone peeked at results and stopped early. This skill prevents those mistakes.

---

## Clarify First

Before designing the experiment, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Primary metric + minimum detectable effect** — the one success metric and smallest lift worth detecting (drives sample size, duration, and metric selection)
- [ ] **Baseline conversion rate** — current rate for the primary metric (sets required sample size per variant)
- [ ] **Available traffic to the test surface** — daily eligible visitors (decides whether the test is feasible or needs a bolder change / qualitative method)
- [ ] **The change and its rationale** — what varies and the data behind it (drives the hypothesis and variant design)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## The Experiment Lifecycle

```
1. HYPOTHESIZE  →  2. DESIGN  →  3. CALCULATE  →  4. IMPLEMENT
       ↑                                                    │
       │                                                    ▼
7. ITERATE  ←  6. DOCUMENT  ←  5. ANALYZE  ←  [Run to completion]
```

---

## Step 1: Hypothesis Formulation

### The Hypothesis Template

```
Because [observation or data point],
we believe [specific change]
will cause [measurable outcome]
for [defined audience segment].

We'll know this is true when [primary metric] changes by [minimum detectable effect].
We'll watch [guardrail metrics] to ensure no negative impact.
```

### Good vs Bad Hypotheses

| Quality | Hypothesis | Problem |
|---------|-----------|---------|
| Bad | "Changing the button color might increase clicks" | No data basis, no target, no measurement plan |
| Mediocre | "A green button will get more clicks than blue" | No "why", no target size, no guardrails |
| Good | "Because heatmaps show 40% of users don't notice our CTA, making the button 2x larger with contrasting color will increase CTA clicks by 15%+ for new visitors. Guardrail: page load time stays under 2s." | Data-backed, specific change, measurable outcome, defined audience, guardrail |

### Hypothesis Sources (Where to Find Test Ideas)

| Source | What to Look For | Example |
|--------|-----------------|---------|
| Analytics data | Drop-off points, low-performing pages | "80% of users drop off at step 3 of onboarding" |
| User research | Confusion, frustration, unmet needs | "Users don't understand what the product does from the homepage" |
| Heatmaps/session recordings | Ignored elements, rage clicks | "Nobody scrolls past the fold on pricing page" |
| Support tickets | Recurring complaints, feature confusion | "Users constantly ask how to invite team members" |
| Competitor analysis | Different approaches to same problem | "Competitor uses a wizard; we use a form" |
| Sales objections | Common reasons prospects don't convert | "Prospects want to see pricing before signing up" |

---

## Step 2: Test Design

### Test Types

| Type | Variants | Traffic Need | Best For |
|------|----------|-------------|---------|
| A/B | 2 (control + 1 variant) | Moderate | Single change validation |
| A/B/n | 3+ variants | High | Comparing multiple approaches |
| Multivariate (MVT) | Combinations of changes | Very high | Optimizing multiple elements |
| Split URL | Different pages | Moderate | Major redesigns |
| Bandit | Dynamic allocation | Low-moderate | Revenue optimization |

**Default recommendation:** Standard A/B test. Only use A/B/n or MVT when you have enough traffic and a specific need.

### What to Test (By Impact)

| Category | High Impact | Medium Impact | Low Impact |
|----------|-----------|---------------|-----------|
| **Copy** | Headline/value prop, CTA text | Body copy, social proof | Microcopy, labels |
| **Design** | Page layout, above-fold content | Visual hierarchy, imagery | Color, font size |
| **UX** | Number of steps, form fields | Button placement, navigation | Animations, transitions |
| **Pricing** | Price point, plan names | Feature packaging, anchoring | Billing frequency display |
| **Social Proof** | Testimonials vs none, logos | Testimonial format, placement | Testimonial count |

### Metric Selection

Every test needs three types of metrics:

**Primary Metric (1 only)**
- The single metric that determines success
- Directly tied to the hypothesis
- Must be measurable within the test duration
- Examples: signup rate, click-through rate, purchase rate

**Secondary Metrics (2-3)**
- Explain why the primary metric moved
- Provide context for decision-making
- Examples: time on page, scroll depth, feature adoption rate

**Guardrail Metrics (1-3)**
- Things that must NOT get worse
- Stop the test if significantly negative
- Examples: error rate, support ticket volume, page load time, refund rate

---

## Step 3: Sample Size Calculation

### Quick Reference Table

Minimum visitors PER VARIANT needed (95% confidence, 80% power):

| Baseline Rate | 5% Lift | 10% Lift | 15% Lift | 20% Lift | 50% Lift |
|--------------|---------|----------|----------|----------|----------|
| 1% | 620,000 | 156,000 | 70,000 | 39,000 | 6,400 |
| 2% | 305,000 | 77,000 | 34,000 | 19,500 | 3,200 |
| 3% | 200,000 | 51,000 | 23,000 | 12,800 | 2,100 |
| 5% | 116,000 | 29,500 | 13,200 | 7,500 | 1,250 |
| 10% | 54,000 | 13,800 | 6,200 | 3,500 | 600 |
| 20% | 24,000 | 6,200 | 2,800 | 1,600 | 280 |
| 50% | 6,100 | 1,600 | 720 | 410 | 75 |

### Duration Calculation

```
Duration (days) = (Sample size per variant * Number of variants) / Daily traffic to test page
```

**Minimum duration:** 7 days (to capture day-of-week effects)
**Maximum recommended:** 6 weeks (beyond this, external factors contaminate results)

### What If You Don't Have Enough Traffic?

| Situation | Solution |
|-----------|----------|
| Need 100K visitors, get 5K/week | Increase minimum detectable effect (test bolder changes) |
| Very low traffic (<1K/week) | Use qualitative testing (user testing, surveys) instead |
| Medium traffic (5-20K/week) | Run for 4-6 weeks, test big changes only |
| High traffic (50K+/week) | You can test subtle changes, run multiple tests |

---

## Step 4: Implementation

### Client-Side Implementation

JavaScript modifies the page after initial render.

**Pros:** Quick to implement, no deploy needed
**Cons:** Can cause flicker (flash of original content), blocked by ad blockers
**Tools:** PostHog, Optimizely, VWO, Google Optimize

**Anti-flicker pattern:**
```javascript
// Add to <head> before any rendering
<style>.ab-test-hide { opacity: 0 !important; }</style>
<script>document.documentElement.classList.add('ab-test-hide');</script>

// In your test script (runs after variant assignment):
document.documentElement.classList.remove('ab-test-hide');
```

### Server-Side Implementation

Variant determined before page renders. No flicker, no client-side dependency.

**Pros:** No flicker, not blocked by ad blockers, works for logged-in features
**Cons:** Requires engineering work, deploy needed
**Tools:** PostHog, LaunchDarkly, Split, Unleash, custom feature flags

**Basic feature flag pattern:**
```python
# Server-side variant assignment
def get_variant(user_id: str, experiment: str) -> str:
    # Deterministic hash ensures same user always sees same variant
    hash_input = f"{user_id}:{experiment}"
    hash_value = hashlib.md5(hash_input.encode()).hexdigest()
    bucket = int(hash_value[:8], 16) % 100

    if bucket < 50:
        return "control"
    else:
        return "variant"
```

### Traffic Allocation

| Strategy | Split | When to Use |
|----------|-------|-------------|
| Standard | 50/50 | Default. Maximum statistical power. |
| Conservative | 90/10 or 80/20 | Risky changes, revenue-impacting tests |
| Ramped | Start 95/5, increase to 50/50 | New infrastructure, technical risk |

**Critical rules:**
- Users must see the same variant on every visit (sticky assignment by user ID or cookie)
- Allocation must be balanced across time of day and day of week
- Never change allocation mid-test

---

## Step 5: Running the Test

### Pre-Launch Checklist

- [ ] Hypothesis documented with primary metric and minimum detectable effect
- [ ] Sample size calculated, expected duration estimated
- [ ] Both variants implemented and QA'd on all device types
- [ ] Tracking verified (events fire correctly for both variants)
- [ ] No other tests running on the same page/feature
- [ ] Stakeholders informed of test duration and "no peeking" rule
- [ ] External factor calendar checked (no major launches, holidays, press)

### During the Test

**DO:**
- Monitor for technical errors (variant not rendering, tracking broken)
- Check that traffic split is balanced daily
- Document any external events that might affect results

**DO NOT:**
- Look at results before reaching sample size ("peeking problem")
- Make changes to either variant
- Add traffic from new sources mid-test
- Stop the test early because one variant "looks like it's winning"

### The Peeking Problem (Critical)

Looking at results before reaching the planned sample size and stopping because one variant looks better leads to a **25-40% false positive rate** (vs the intended 5%).

Why: Statistical significance fluctuates wildly with small samples. A variant can show p < 0.05 at 20% of planned sample size and p > 0.30 at full sample.

**Solutions:**
1. Pre-commit to sample size and do not check results until reached
2. If you must monitor: use sequential testing methods (group sequential design, always-valid p-values)
3. Set calendar reminder for expected completion date -- that is when you look

---

## Step 6: Analysis

### Analysis Checklist

1. **Did we reach planned sample size?** If not, results are preliminary only.
2. **Is it statistically significant?** p < 0.05 = 95% confidence the difference is real.
3. **What's the confidence interval?** Tells you the range of likely true effect.
4. **Is the effect size meaningful?** A 0.1% lift that's "significant" may not be worth implementing.
5. **Are secondary metrics consistent?** Do they support the primary result?
6. **Any guardrail violations?** Did anything get worse?
7. **Segment analysis:** Different results for mobile vs desktop? New vs returning?

### Interpreting Results

| Result | Primary Metric | Confidence | Action |
|--------|---------------|------------|--------|
| Clear winner | Variant +15%, p < 0.01 | High | Implement variant |
| Modest winner | Variant +5%, p < 0.05 | Medium | Implement if easy, else run longer |
| Flat | < 2% difference, p > 0.20 | High (no effect) | Keep control, test something bolder |
| Loser | Variant -10%, p < 0.05 | High | Keep control, investigate why |
| Inconclusive | 5% difference, p = 0.08 | Low | Need more traffic or bolder test |
| Mixed signals | Primary up, guardrail down | Investigate | Dig into segments, do not ship blindly |

### Common Analysis Mistakes

| Mistake | Consequence | Prevention |
|---------|-------------|------------|
| Stopping at first significance | 25-40% false positive rate | Commit to sample size |
| Cherry-picking segments | Finding "winners" that don't replicate | Pre-register segments of interest |
| Ignoring confidence intervals | Overestimating effect size | Always report CI alongside p-value |
| Multiple comparisons | Inflated Type I error | Bonferroni correction for A/B/n |
| Survivorship bias | Only analyzing users who completed flow | Include all users from assignment point |
| Simpson's paradox | Aggregate hides segment reversal | Always check key segments |

---

## Step 7: Documentation

Every test must be documented, regardless of outcome.

### Test Documentation Template

```
EXPERIMENT: [Name]
DATE: [Start] to [End]
OWNER: [Name]

HYPOTHESIS:
Because [observation], we believed [change] would cause [outcome] for [audience].

VARIANTS:
- Control: [description]
- Variant: [description + screenshot]

METRICS:
- Primary: [metric] (baseline: [X]%, MDE: [Y]%)
- Secondary: [metrics]
- Guardrails: [metrics]

RESULTS:
- Sample size: [actual] / [planned]
- Duration: [X] days
- Primary metric: Control [X]% vs Variant [Y]% (p = [Z], CI: [range])
- Secondary metrics: [results]
- Guardrails: [all clear / violation noted]

DECISION: [Ship variant / Keep control / Iterate]

LEARNINGS:
- [What we learned about our users]
- [What we'd do differently next time]
```

---

## Experiment Prioritization Framework

### ICE Scoring

| Factor | Score (1-10) | Question |
|--------|-------------|----------|
| **Impact** | How much will this move the metric? | Big change to primary KPI = 10 |
| **Confidence** | How sure are we it will work? | Strong data supporting hypothesis = 10 |
| **Ease** | How easy is it to implement and measure? | Can ship in a day = 10 |

**ICE Score = (Impact + Confidence + Ease) / 3**

Rank all test ideas by ICE score. Run highest first.

### Test Backlog Template

| # | Hypothesis | Primary Metric | ICE | Est. Duration | Status |
|---|-----------|---------------|-----|---------------|--------|
| 1 | Larger CTA increases signups | Signup rate | 8.3 | 2 weeks | Ready |
| 2 | Social proof on pricing increases conversion | Plan selection rate | 7.0 | 3 weeks | Needs design |
| 3 | Shorter onboarding increases activation | Feature activation | 6.7 | 4 weeks | In backlog |

---

## Proactive Triggers

- Someone debates between two design options: propose an A/B test instead of opinionating
- Conversion rate mentioned as underperforming: offer to design a test, not guess at solutions
- Pricing page changes discussed: always test pricing changes with guardrail metrics
- Post-launch of any feature: propose follow-up experiment to optimize
- "Let's just try it and see": redirect to structured hypothesis before implementation

---

## Related Skills

| Skill | Use When |
|-------|----------|
| **analytics-tracking** | Setting up event tracking that feeds experiment metrics |
| **campaign-analytics** | Folding experiment results into broader attribution |
| **launch-strategy** | Testing within a product launch sequence |
| **prompt-engineer-toolkit** | A/B testing AI prompts in production |

---

## Tool Reference

### sample_size_calculator.py

Calculates required sample size per variant using the normal approximation to the two-proportion z-test. Includes Bonferroni correction for multi-variant tests and duration estimation.

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--baseline`, `-b` | float | (required) | Baseline conversion rate (e.g. 0.05 for 5%) |
| `--mde`, `-m` | float | (required) | Minimum detectable effect as relative lift (e.g. 0.10 for 10%) |
| `--alpha`, `-a` | float | 0.05 | Significance level |
| `--power`, `-p` | float | 0.80 | Statistical power |
| `--variants`, `-v` | int | 2 | Number of variants including control |
| `--daily-traffic`, `-d` | int | 0 | Daily eligible traffic for duration estimation |
| `--one-tailed` | flag | False | Use one-tailed test instead of two-tailed |
| `--json` | flag | False | Output as JSON |

```bash
python scripts/sample_size_calculator.py --baseline 0.05 --mde 0.10
python scripts/sample_size_calculator.py --baseline 0.12 --mde 0.15 --power 0.9 --daily-traffic 5000
python scripts/sample_size_calculator.py --baseline 0.05 --mde 0.10 --variants 3 --json
```

### experiment_analyzer.py

Analyzes A/B test results using the two-proportion z-test with confidence intervals and segment breakdown.

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `input` | positional | (required) | CSV file with results or "sample" to create sample |
| `--alpha`, `-a` | float | 0.05 | Significance level |
| `--json` | flag | False | Output as JSON |

**CSV format:** `variant,visitors,conversions,segment`

```bash
python scripts/experiment_analyzer.py sample
python scripts/experiment_analyzer.py results.csv
python scripts/experiment_analyzer.py results.csv --alpha 0.01 --json
```

### experiment_planner.py

Generates a structured experiment plan from a hypothesis text, including metric selection, sample size, timeline, risks, and documentation template.

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--hypothesis`, `-H` | string | (required) | Experiment hypothesis text |
| `--baseline`, `-b` | float | 0.05 | Baseline conversion rate |
| `--mde`, `-m` | float | 0.10 | Minimum detectable effect as relative lift |
| `--daily-traffic`, `-d` | int | 0 | Daily eligible traffic |
| `--variants`, `-v` | int | 2 | Number of variants including control |
| `--json` | flag | False | Output as JSON |

```bash
python scripts/experiment_planner.py --hypothesis "Larger CTA will increase signups by 15%"
python scripts/experiment_planner.py -H "Simplified checkout boosts conversions" -b 0.08 -m 0.15 -d 3000
python scripts/experiment_planner.py -H "New pricing page" --json
```

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Sample size is unrealistically large | MDE too small or baseline too low | Increase MDE (test bolder changes) or target a higher-traffic page |
| Test duration exceeds 6 weeks | Insufficient daily traffic | Consider qualitative methods, test bigger changes, or combine traffic from multiple pages |
| p-value hovers around 0.05 | Borderline significance | Do not stop early; run to planned sample size or extend 20% |
| Results significant but lift is tiny (<1%) | Overpowered test | Check practical significance alongside statistical significance |
| Segment results contradict overall | Simpson's paradox | Investigate segment composition; report both overall and segment results |
| Variant performs differently on mobile vs desktop | Device-specific UX issues | Design device-specific variants; increase per-segment sample size |
| Calculator produces negative CI | Very small samples or extreme rates | Ensure sufficient sample size; check data integrity |

---

## Success Criteria

| Criterion | Target | How to Measure |
|-----------|--------|----------------|
| Tests reach planned sample size | 100% of tests | Compare actual vs planned sample at conclusion |
| False positive rate | <5% | Track post-implementation lift vs test prediction |
| Test velocity | 2+ tests per team per month | Count experiments documented per sprint |
| Documentation completeness | 100% of tests documented | Audit experiment records quarterly |
| Average test duration | <4 weeks | Measure start-to-conclusion calendar days |
| Decision quality | >80% of shipped variants hold gains at 90 days | Post-ship metric tracking |

---

## Scope & Limitations

**In scope:**
- Hypothesis formulation and validation
- Sample size and power calculations
- Frequentist two-proportion z-tests
- A/B, A/B/n, and split URL test planning
- Segment-level analysis
- Pre/post test documentation

**Out of scope:**
- Bayesian A/B testing methods (use dedicated Bayesian tools)
- Multi-armed bandit algorithms (require real-time allocation infrastructure)
- Multivariate testing (MVT) analysis (combinatorial explosion requires specialized tools)
- Server-side feature flag implementation (see engineering skills)
- Revenue-based metrics requiring transaction-level data
- Sequential testing / always-valid p-values (use Optimizely Stats Engine or similar)

---

## Integration Points

| Tool / Platform | Integration Method | Use Case |
|-----------------|-------------------|----------|
| PostHog / Amplitude | JSON export from experiment_analyzer | Feed results into product analytics |
| Jira / Linear | experiment_planner JSON output | Create experiment tickets with metadata |
| Google Sheets | CSV export from experiment_analyzer | Share results with non-technical stakeholders |
| LaunchDarkly / Unleash | experiment_planner checklist | Pre-launch validation before feature flag rollout |
| Slack / Notion | Copy human-readable output | Async experiment status updates |
| CI/CD pipelines | `--json` flag on all scripts | Automated experiment health checks |

---

## agile-product-owner

Source path: `references/product-team/agile-product-owner/SKILL.md`

# Agile Product Owner

Backlog management and sprint execution toolkit for product owners, including user story generation, acceptance criteria patterns, sprint planning, and velocity tracking.

---

## Table of Contents

- [User Story Generation Workflow](#user-story-generation-workflow)
- [Acceptance Criteria Patterns](#acceptance-criteria-patterns)
- [Epic Breakdown Workflow](#epic-breakdown-workflow)
- [Sprint Planning Workflow](#sprint-planning-workflow)
- [Backlog Prioritization](#backlog-prioritization)
- [Reference Documentation](#reference-documentation)
- [Tools](#tools)

---

## Clarify First

Before generating stories or a sprint plan, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Persona who benefits** — the specific user the story serves (drives the "As a..." clause and acceptance criteria)
- [ ] **The requirement or epic scope** — the capability and its success condition (drives story breakdown and INVEST validation)
- [ ] **Team velocity and availability** — rolling average points and PTO/holidays this sprint (sets committed vs stretch capacity)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## User Story Generation Workflow

Create INVEST-compliant user stories from requirements:

1. Identify the persona (who benefits from this feature)
2. Define the action or capability needed
3. Articulate the benefit or value delivered
4. Write acceptance criteria using Given-When-Then
5. Estimate story points using Fibonacci scale
6. Validate against INVEST criteria
7. Add to backlog with priority
8. **Validation:** Story passes all INVEST criteria; acceptance criteria are testable

### User Story Template

```
As a [persona],
I want to [action/capability],
So that [benefit/value].
```

**Example:**
```
As a marketing manager,
I want to export campaign reports to PDF,
So that I can share results with stakeholders who don't have system access.
```

### Story Types

| Type | Template | Example |
|------|----------|---------|
| Feature | As a [persona], I want to [action] so that [benefit] | As a user, I want to filter search results so that I find items faster |
| Improvement | As a [persona], I need [capability] to [goal] | As a user, I need faster page loads to complete tasks without frustration |
| Bug Fix | As a [persona], I expect [behavior] when [condition] | As a user, I expect my cart to persist when I refresh the page |
| Enabler | As a developer, I need to [technical task] to enable [capability] | As a developer, I need to implement caching to enable instant search |

### Persona Reference

| Persona | Typical Needs | Context |
|---------|--------------|---------|
| End User | Efficiency, simplicity, reliability | Daily feature usage |
| Administrator | Control, visibility, security | System management |
| Power User | Automation, customization, shortcuts | Expert workflows |
| New User | Guidance, learning, safety | Onboarding |

---

## Acceptance Criteria Patterns

Write testable acceptance criteria using Given-When-Then format.

### Given-When-Then Template

```
Given [precondition/context],
When [action/trigger],
Then [expected outcome].
```

**Examples:**
```
Given the user is logged in with valid credentials,
When they click the "Export" button,
Then a PDF download starts within 2 seconds.

Given the user has entered an invalid email format,
When they submit the registration form,
Then an inline error message displays "Please enter a valid email address."

Given the shopping cart contains items,
When the user refreshes the browser,
Then the cart contents remain unchanged.
```

### Acceptance Criteria Checklist

Each story should include criteria for:

| Category | Example |
|----------|---------|
| Happy Path | Given valid input, When submitted, Then success message displayed |
| Validation | Should reject input when required field is empty |
| Error Handling | Must show user-friendly message when API fails |
| Performance | Should complete operation within 2 seconds |
| Accessibility | Must be navigable via keyboard only |

### Minimum Criteria by Story Size

| Story Points | Minimum AC Count |
|--------------|------------------|
| 1-2 | 3-4 criteria |
| 3-5 | 4-6 criteria |
| 8 | 5-8 criteria |
| 13+ | Split the story |

See `references/user-story-templates.md` for complete template library.

---

## Epic Breakdown Workflow

Break epics into deliverable sprint-sized stories:

1. Define epic scope and success criteria
2. Identify all personas affected by the epic
3. List all capabilities needed for each persona
4. Group capabilities into logical stories
5. Validate each story is ≤8 points
6. Identify dependencies between stories
7. Sequence stories for incremental delivery
8. **Validation:** Each story delivers standalone value; total stories cover epic scope

### Story Splitting Decision Logic

Apply these rules in order. Use the first rule that fits the story:

| # | Split Rule | When It Applies | How to Split |
|---|---|---|---|
| 1 | **Workflow Steps** | Story contains multiple sequential steps | Each step becomes its own story |
| 2 | **Business Rule Variations** | Story introduces rule variations (e.g., pricing tiers, user roles) | Each rule variation becomes its own story |
| 3 | **Data Variations** | Story handles different data types or formats | Each data type becomes its own story |
| 4 | **Complex Acceptance Criteria** | Story has 8+ acceptance criteria covering distinct behaviors | Each distinct behavior cluster becomes its own story |
| 5 | **Major Effort** | Story requires significant build effort (13+ points) | Split along effort milestones (foundation → feature → polish) |
| 6 | **External Dependencies** | Story depends on external APIs, teams, or approvals | Split dependent and independent work into separate stories |
| 7 | **DevOps Effort** | Story requires significant infrastructure work | Split infrastructure setup from feature implementation |
| 8 | **None Apply** | Story is already small but unclear | Use Tiny Acts of Discovery (TADs) -- small spikes to reduce uncertainty |

### Split Output Format

For each split, document:

```markdown
## Original Story
As a [persona], I want to [action] so that [benefit].
Points: 13 | Status: Too large for sprint

## Suggested Splits

### Split 1: By Workflow Steps
- **Story A:** As a [persona], I want to [step 1] so that [partial benefit].
  Points: 5 | Independently valuable: Yes
- **Story B:** As a [persona], I want to [step 2] so that [remaining benefit].
  Points: 5 | Independently valuable: Yes

### Risks & Tradeoffs
- [What coupling exists between the split stories]
- [What is lost by delivering them separately]

### Implementation Order
1. Story A (foundation) → 2. Story B (builds on A)
```

### Splitting Techniques (Quick Reference)

| Technique | When to Use | Example |
|-----------|-------------|---------|
| By workflow step | Linear process | "Checkout" → "Add to cart" + "Enter payment" + "Confirm order" |
| By persona | Multiple user types | "Dashboard" → "Admin dashboard" + "User dashboard" |
| By data type | Multiple inputs | "Import" → "Import CSV" + "Import Excel" |
| By operation | CRUD functionality | "Manage users" → "Create" + "Edit" + "Delete" |
| By business rule | Rule variations | "Discount" → "% discount" + "Fixed discount" + "BOGO" |
| Happy path first | Risk reduction | "Feature" → "Basic flow" + "Error handling" + "Edge cases" |
| By dependency | External blockers | "Integration" → "Mock integration" + "Live integration" |
| Tiny Acts of Discovery | High uncertainty | "AI feature" → "Spike: feasibility" + "MVP implementation" |

### Epic Example

**Epic:** User Dashboard

**Breakdown:**
```
Epic: User Dashboard (34 points total)
├── US-001: View key metrics (5 pts) - End User
├── US-002: Customize layout (5 pts) - Power User
├── US-003: Export data to CSV (3 pts) - End User
├── US-004: Share with team (5 pts) - End User
├── US-005: Set up alerts (5 pts) - Power User
├── US-006: Filter by date range (3 pts) - End User
├── US-007: Admin overview (5 pts) - Admin
└── US-008: Enable caching (3 pts) - Enabler
```

---

## Sprint Planning Workflow

Plan sprint capacity and select stories:

1. Calculate team capacity (velocity × availability)
2. Review sprint goal with stakeholders
3. Select stories from prioritized backlog
4. Fill to 80-85% of capacity (committed)
5. Add stretch goals (10-15% additional)
6. Identify dependencies and risks
7. Break complex stories into tasks
8. **Validation:** Committed points ≤85% capacity; all stories have acceptance criteria

### Capacity Calculation

```
Sprint Capacity = Average Velocity × Availability Factor

Example:
Average Velocity: 30 points
Team availability: 90% (one member partially out)
Adjusted Capacity: 27 points

Committed: 23 points (85% of 27)
Stretch: 4 points (15% of 27)
```

### Availability Factors

| Scenario | Factor |
|----------|--------|
| Full sprint, no PTO | 1.0 |
| One team member out 50% | 0.9 |
| Holiday during sprint | 0.8 |
| Multiple members out | 0.7 |

### Sprint Loading Template

```
Sprint Capacity: 27 points
Sprint Goal: [Clear, measurable objective]

COMMITTED (23 points):
[H] US-001: User dashboard (5 pts)
[H] US-002: Export feature (3 pts)
[H] US-003: Search filter (5 pts)
[M] US-004: Settings page (5 pts)
[M] US-005: Help tooltips (3 pts)
[L] US-006: Theme options (2 pts)

STRETCH (4 points):
[L] US-007: Sort options (2 pts)
[L] US-008: Print view (2 pts)
```

See `references/sprint-planning-guide.md` for complete planning procedures.

---

## Backlog Prioritization

Prioritize backlog using value and effort assessment.

### Priority Levels

| Priority | Definition | Sprint Target |
|----------|------------|---------------|
| Critical | Blocking users, security, data loss | Immediate |
| High | Core functionality, key user needs | This sprint |
| Medium | Improvements, enhancements | Next 2-3 sprints |
| Low | Nice-to-have, minor improvements | Backlog |

### Prioritization Factors

| Factor | Weight | Questions |
|--------|--------|-----------|
| Business Value | 40% | Revenue impact? User demand? Strategic alignment? |
| User Impact | 30% | How many users? How frequently used? |
| Risk/Dependencies | 15% | Technical risk? External dependencies? |
| Effort | 15% | Size? Complexity? Uncertainty? |

### INVEST Criteria Validation

Before adding to sprint, validate each story:

| Criterion | Question | Pass If... |
|-----------|----------|------------|
| **I**ndependent | Can this be developed without other uncommitted stories? | No blocking dependencies |
| **N**egotiable | Is the implementation flexible? | Multiple approaches possible |
| **V**aluable | Does this deliver user or business value? | Clear benefit in "so that" |
| **E**stimable | Can the team estimate this? | Understood well enough to size |
| **S**mall | Can this complete in one sprint? | ≤8 story points |
| **T**estable | Can we verify this is done? | Clear acceptance criteria |

---

## Reference Documentation

### User Story Templates

`references/user-story-templates.md` contains:

- Standard story formats by type (feature, improvement, bug fix, enabler)
- Acceptance criteria patterns (Given-When-Then, Should/Must/Can)
- INVEST criteria validation checklist
- Story point estimation guide (Fibonacci scale)
- Common story antipatterns and fixes
- Story splitting techniques

### Sprint Planning Guide

`references/sprint-planning-guide.md` contains:

- Sprint planning meeting agenda
- Capacity calculation formulas
- Backlog prioritization framework (WSJF)
- Sprint ceremony guides (standup, review, retro)
- Velocity tracking and burndown patterns
- Definition of Done checklist
- Sprint metrics and targets

---

## Tools

### User Story Generator

```bash
# Generate stories from sample epic
python scripts/user_story_generator.py

# Plan sprint with capacity
python scripts/user_story_generator.py sprint 30
```

Generates:
- INVEST-compliant user stories
- Given-When-Then acceptance criteria
- Story point estimates (Fibonacci scale)
- Priority assignments
- Sprint loading with committed and stretch items

### Sample Output

```
USER STORY: USR-001
========================================
Title: View Key Metrics
Type: story
Priority: HIGH
Points: 5

Story:
As a End User, I want to view key metrics and KPIs
so that I can save time and work more efficiently

Acceptance Criteria:
  1. Given user has access, When they view key metrics, Then the result is displayed
  2. Should validate input before processing
  3. Must show clear error message when action fails
  4. Should complete within 2 seconds
  5. Must be accessible via keyboard navigation

INVEST Checklist:
  ✓ Independent
  ✓ Negotiable
  ✓ Valuable
  ✓ Estimable
  ✓ Small
  ✓ Testable
```

---

## Sprint Metrics

Track sprint health and team performance.

### Key Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| Velocity | Points completed / sprint | Stable ±10% |
| Commitment Reliability | Completed / Committed | >85% |
| Scope Change | Points added or removed mid-sprint | <10% |
| Carryover | Points not completed | <15% |

### Velocity Tracking

```
Sprint 1: 25 points
Sprint 2: 28 points
Sprint 3: 30 points
Sprint 4: 32 points
Sprint 5: 29 points
------------------------
Average Velocity: 28.8 points
Trend: Stable

Planning: Commit to 24-26 points
```

### Definition of Done

Story is complete when:

- [ ] Code complete and peer reviewed
- [ ] Unit tests written and passing
- [ ] Acceptance criteria verified
- [ ] Documentation updated
- [ ] Deployed to staging environment
- [ ] Product Owner accepted
- [ ] No critical bugs remaining

---

## Tool Reference

### user_story_generator.py

Generates INVEST-compliant user stories from a sample epic, including acceptance criteria, story point estimates, priority assignments, and sprint planning.

| Argument | Type | Default | Description |
|----------|------|---------|-------------|
| `sprint` | subcommand | - | Run in sprint planning mode |
| `[capacity]` | int | 30 | Sprint capacity in story points (used with `sprint`) |

```bash
# Generate stories from sample epic
python scripts/user_story_generator.py

# Sprint planning with capacity
python scripts/user_story_generator.py sprint 30
python scripts/user_story_generator.py sprint 45
```

**Output includes:**
- Story ID, title, type, priority, and point estimate
- User story narrative in "As a... I want... So that..." format
- 5 acceptance criteria per story (Given-When-Then, validation, error, performance, accessibility)
- INVEST criteria checklist per story
- Backlog summary with priority breakdown
- Sprint loading with committed and stretch items (in sprint mode)

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Stories too large (>8 points) | Epic not broken down enough | Apply splitting techniques: by workflow step, persona, or CRUD operation |
| Acceptance criteria untestable | Criteria use vague language | Rewrite using Given-When-Then format with specific, observable outcomes |
| Sprint commitment missed repeatedly | Velocity not stabilized or too aggressive | Track velocity over 3+ sprints; commit to 80-85% of rolling average |
| Too many carryover stories | Mid-sprint scope changes or poor estimation | Enforce no-scope-change rule; calibrate estimates using planning poker |
| Stories lack clear value | Missing "so that" benefit clause | Validate every story answers: who benefits, what they get, and why it matters |
| Sprint has too many dependencies | Stories not independent | Re-sequence backlog; break dependent stories into independent slices |
| Stakeholders dispute priority | No objective prioritization framework | Use WSJF or value/effort scoring; document decision rationale |

---

## Success Criteria

| Criterion | Target | How to Measure |
|-----------|--------|----------------|
| Commitment reliability | >85% of committed points completed | Points completed / Points committed per sprint |
| INVEST compliance | 100% of stories pass all 6 criteria | user_story_generator INVEST checklist |
| Velocity stability | Within +/-10% of rolling average | Track velocity trend over 5+ sprints |
| Scope change | <10% of sprint points added/removed mid-sprint | Count points added or removed after planning |
| Carryover rate | <15% of committed points | Points not completed / Points committed |
| Acceptance criteria quality | All criteria testable and verified | QA sign-off on acceptance criteria before sprint start |
| Backlog grooming | Top 2 sprints of backlog always ready | Count of refined stories with acceptance criteria |

---

## Scope & Limitations

**In scope:**
- User story generation with INVEST validation
- Acceptance criteria in Given-When-Then format
- Sprint planning with capacity-based loading
- Epic breakdown into sprint-sized stories
- Backlog prioritization frameworks (WSJF, value/effort)
- Velocity tracking and sprint metrics
- Definition of Done enforcement

**Out of scope:**
- Jira/Linear ticket creation (use JSON export with their APIs)
- Burndown chart visualization (use project management tool dashboards)
- Team member assignment and capacity by individual
- Cross-team dependency management (use program-level tools)
- Release planning beyond quarterly horizon
- Automated acceptance test generation (see engineering skills)

---

## Integration Points

| Tool / Platform | Integration Method | Use Case |
|-----------------|-------------------|----------|
| Jira / Linear | Copy story output or extend script for JSON export | Import generated stories as tickets |
| Confluence / Notion | Paste human-readable output | Document sprint plans and backlog |
| Slack | Share sprint planning summary | Async sprint kickoff communication |
| product-manager-toolkit | RICE scores inform story priority | Align sprint priorities with product strategy |
| product-strategist | OKR cascade informs epic selection | Connect sprint work to quarterly objectives |
| ux-researcher-designer | Persona data informs story personas | Ground user stories in research-backed personas |

---

## apple-hig-expert

Source path: `references/product-team/apple-hig-expert/SKILL.md`

# Apple Human Interface Guidelines (HIG) Expert

A skill focused on shipping apps that feel native on Apple platforms.
Covers the underlying HIG principles, platform-specific patterns, native
component selection, and accessibility expectations.

This skill is opinionated about **native conventions**. It's not the
right skill if your goal is to maximize cross-platform UX uniformity over
native fit (see web design guides for that).

## When to use this skill

- Designing or reviewing an iOS / iPadOS / macOS / watchOS / tvOS / visionOS app
- Auditing an existing app for HIG compliance
- Picking the right native component (sheet vs popover vs full-screen)
- Adapting an app from one Apple platform to another
- Reviewing typography, color, spacing, and motion against HIG
- Auditing accessibility against Apple's accessibility expectations
- Onboarding a designer or PM new to Apple-platform design

## Inputs the advisor expects

- Target platform(s) and version range (iOS 17+, macOS 14+, etc.)
- App type (utility, productivity, social, games, media)
- Current designs / screenshots (described or referenced)
- Stack: SwiftUI vs UIKit / AppKit, recent or legacy codebase
- Accessibility maturity (WCAG audit done; VoiceOver tested)

## Workflows

### Workflow 1 — Audit screens for HIG compliance

1. Describe or reference each screen.
2. Run `hig_compliance_checker.py` with the screen inventory.
3. Address findings by category (navigation, typography, controls, spacing, motion).

```bash
python3 apple-hig-expert/scripts/hig_compliance_checker.py \
  --input screens.json --format markdown
```

### Workflow 2 — Pick the right component for a flow

1. Describe the interaction goal.
2. Use `component_pattern_lookup.py` to surface candidate patterns,
   trade-offs, and platform-specific guidance.

```bash
python3 apple-hig-expert/scripts/component_pattern_lookup.py \
  --platform ios --goal "show options without leaving context" --format markdown
```

### Workflow 3 — Audit accessibility against Apple expectations

1. Capture screen inventory + accessibility attributes (labels, hints, traits).
2. Run `accessibility_auditor.py` to surface gaps.
3. Use Apple Accessibility Inspector to validate.

```bash
python3 apple-hig-expert/scripts/accessibility_auditor.py \
  --input a11y_state.json --format markdown
```

## Decision frameworks

### Sheets vs popovers vs full-screen

| Pattern | When to use | Platform |
|---------|-------------|----------|
| Sheet (medium / large) | Modal task with clear escape | iOS, iPadOS, macOS, visionOS |
| Popover | Context-anchored options, brief | iPadOS (compact: replaced with sheet), macOS |
| Full-screen cover | Immersive task, e.g., photo editing | iOS |
| Push (navigation stack) | Hierarchical drill-in | iOS, iPadOS |
| Inspector | Persistent secondary content | macOS, iPadOS |
| Toolbar item | Quick action on current context | All |

Common mistake: popover on compact iPhone (it becomes a sheet automatically;
design for both).

### When to use SwiftUI vs UIKit

- **SwiftUI** — new apps, simple-to-moderate complexity, multi-platform from one codebase
- **UIKit** — legacy code, complex interactions not yet ergonomic in SwiftUI, performance-sensitive
- **Mixed** — common; embed SwiftUI in UIKit hosts or vice versa

The trend (2026) is SwiftUI-first for new development; UIKit retains
strength in performance-sensitive lists and complex gesture handling.

### Color and dark mode

- Use **semantic colors** (`systemBackground`, `secondaryLabel`) — they
  adapt to light/dark mode automatically
- Avoid hardcoded hex values for system-feeling content
- Test in both light + dark mode + increased contrast settings
- Brand colors: assess contrast in both modes; use Asset Catalog with
  separate light/dark variants

### Typography

- Use **Dynamic Type** styles (`largeTitle`, `body`, `caption`) — they
  scale with user accessibility settings
- Don't hardcode font sizes for body text
- Custom fonts: still respect Dynamic Type through `UIFontMetrics` /
  SwiftUI `dynamicTypeSize`
- Test at largest Dynamic Type setting; design must remain usable

## Common engagements

### "Help me adapt our iPhone app for iPad"
1. Identify navigation: sidebar (NavigationSplitView) vs tabs at iPad sizes
2. Use Inspector for secondary content
3. Convert sheets to popovers where appropriate
4. Adapt to multitasking (split view, slide over)
5. Add hardware support: Pencil, keyboard shortcuts, pointer interactions

### "Our app feels un-Apple-y. What's wrong?"
1. Check typography — using Dynamic Type styles, not hardcoded sizes?
2. Check colors — semantic colors, dark mode parity?
3. Check spacing — multiples of 4 or 8; not custom every-screen
4. Check controls — using native ones, not custom toggles/buttons?
5. Check navigation — does back gesture work? Does state persist correctly?

### "Make our app accessible"
1. Every interactive element has a label
2. Decorative images marked `accessibilityHidden`
3. Focus order makes sense for VoiceOver
4. Custom controls have correct `accessibilityTraits`
5. Touch targets ≥44pt × 44pt
6. Color isn't the only way information is conveyed
7. Reduced motion respected
8. Test with VoiceOver, Voice Control, Switch Control, Dynamic Type max

## Anti-patterns to avoid

- **Custom UI for things iOS already provides.** Use native; users expect it.
- **Hardcoded font sizes.** Breaks Dynamic Type; breaks accessibility.
- **Same UI across all Apple platforms.** Each platform has different conventions.
- **Hamburger menu on iOS.** Tab bar is more discoverable.
- **Modal-heavy navigation.** Apple's nav stack is the primary pattern.
- **Custom navigation bar.** Use the system one; users know how it works.
- **Ignoring safe area insets.** Content gets clipped behind notches and home indicators.
- **No haptic feedback on iOS.** Apps that use it feel premium.
- **No keyboard support on iPad.** Power users will leave.

## References

- `references/hig-fundamentals.md` — principles, design language, foundational patterns
- `references/ios-component-patterns.md` — sheets, navigation, controls, gestures, lists
- `references/cross-platform-considerations.md` — iPad, Mac, Watch, TV, Vision differences

## Related skills

- `product-team/product-designer` — broader product design
- `product-team/ui-design-system` — design system construction
- `product-team/ux-researcher-designer` — research informing design
- `engineering/senior-frontend` — implementation

---

## design-system-lead

Source path: `references/product-team/design-system-lead/SKILL.md`

# Design System Lead

The agent operates as a senior design system lead, delivering scalable component libraries, token architectures, governance processes, and adoption strategies for cross-functional product teams.

## Clarify First

Before generating the design system, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Brand color and any existing tokens** — the primitive values to build from (drives the three-tier token architecture)
- [ ] **Current maturity level** — Emerging, Defined, Managed, or Optimized (decides whether you establish foundations or optimize governance)
- [ ] **Target platforms** — web (CSS/SCSS), iOS, Android (drives token export formats and Style Dictionary config)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

1. **Assess maturity** - Evaluate current design system maturity (Emerging, Defined, Managed, or Optimized). Audit existing patterns, inconsistencies, and custom components. Checkpoint: maturity level is documented with evidence.
2. **Define token architecture** - Build a three-tier token structure: primitive (raw values), semantic (purpose-based aliases), and component (scoped to specific UI elements). Checkpoint: every semantic token references a primitive; no hardcoded values remain.
3. **Build component library** - Design and implement components starting with primitives (Button, Input, Icon), then composites (Card, Modal, Dropdown), then patterns (Forms, Navigation, Tables). Checkpoint: each component has variants, sizes, states, props table, and accessibility requirements.
4. **Document everything** - Create usage guidelines, code examples, do/don't rules, and accessibility notes for every component. Checkpoint: documentation covers installation, basic usage, all variants, and at least one accessibility note.
5. **Establish governance** - Define the RFC-to-release contribution process. Set versioning strategy (SemVer). Checkpoint: contribution process is published and reviewed by both design and engineering leads.
6. **Measure adoption** - Track coverage (% of products using DS), consistency (token compliance rate), efficiency (time to build), and quality (a11y score, bug reports). Checkpoint: adoption dashboard is updated monthly.

## Design System Maturity Model

| Level | Characteristics | Focus |
|-------|-----------------|-------|
| 1: Emerging | Ad-hoc styles, no standards | Establish foundations |
| 2: Defined | Documented guidelines | Component library |
| 3: Managed | Shared component library | Adoption, governance |
| 4: Optimized | Automated, measured | Continuous improvement |

## Token Architecture

Three-tier token system (primitive -> semantic -> component):

```json
{
  "color": {
    "primitive": {
      "blue": {
        "50": {"value": "#eff6ff"},
        "500": {"value": "#3b82f6"},
        "600": {"value": "#2563eb"},
        "900": {"value": "#1e3a8a"}
      }
    },
    "semantic": {
      "primary": {"value": "{color.primitive.blue.600}"},
      "primary-hover": {"value": "{color.primitive.blue.700}"},
      "background": {"value": "{color.primitive.gray.50}"},
      "text": {"value": "{color.primitive.gray.900}"}
    },
    "component": {
      "button-primary-bg": {"value": "{color.semantic.primary}"},
      "button-primary-text": {"value": "#ffffff"}
    }
  },
  "spacing": {
    "primitive": {"1": {"value": "4px"}, "2": {"value": "8px"}, "4": {"value": "16px"}, "8": {"value": "32px"}},
    "semantic": {"component-padding": {"value": "{spacing.primitive.4}"}, "section-gap": {"value": "{spacing.primitive.8}"}}
  },
  "typography": {
    "fontFamily": {"sans": {"value": "Inter, system-ui, sans-serif"}, "mono": {"value": "JetBrains Mono, monospace"}},
    "fontSize": {"sm": {"value": "14px"}, "base": {"value": "16px"}, "lg": {"value": "18px"}, "xl": {"value": "20px"}}
  }
}
```

## Example: Cross-Platform Token Generation

```javascript
// style-dictionary.config.js
module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [{ destination: 'variables.css', format: 'css/variables' }]
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/scss/',
      files: [{ destination: '_variables.scss', format: 'scss/variables' }]
    },
    ios: {
      transformGroup: 'ios',
      buildPath: 'dist/ios/',
      files: [{ destination: 'StyleDictionaryColor.swift', format: 'ios-swift/class.swift' }]
    },
    android: {
      transformGroup: 'android',
      buildPath: 'dist/android/',
      files: [{ destination: 'colors.xml', format: 'android/colors' }]
    }
  }
};
```

## Component Library Structure

```
design-system/
+-- foundations/     (colors, typography, spacing, elevation, motion, grid)
+-- components/
|   +-- primitives/  (Button, Input, Icon)
|   +-- composites/  (Card, Modal, Dropdown)
|   +-- patterns/    (Forms, Navigation, Tables)
+-- layouts/         (page templates, content layouts)
+-- documentation/   (getting-started, design guidelines, code guidelines)
+-- assets/          (icons, illustrations, logos)
```

### Component Specification: Button

```markdown
## Variants
- Primary: main action
- Secondary: supporting action
- Tertiary: low-emphasis action
- Destructive: dangerous/irreversible action

## Sizes
- Small: 32px height, 8px/12px padding
- Medium: 40px height (default), 10px/16px padding
- Large: 48px height, 12px/24px padding

## States
Default -> Hover -> Active -> Focus -> Disabled -> Loading

## Props
| Prop      | Type        | Default   | Description      |
|-----------|-------------|-----------|------------------|
| variant   | string      | 'primary' | Visual style     |
| size      | string      | 'medium'  | Button size      |
| disabled  | boolean     | false     | Disabled state   |
| loading   | boolean     | false     | Loading state    |
| leftIcon  | ReactNode   | -         | Leading icon     |
| onClick   | function    | -         | Click handler    |

## Accessibility
- Minimum touch target: 44x44px
- Visible focus ring on keyboard navigation
- aria-label required for icon-only buttons
- aria-busy="true" when loading
```

### Example: Button Implementation (React + CVA)

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
);
```

## Governance: Contribution Process

```
1. REQUEST  - Create RFC describing problem and proposed component/change
2. REVIEW   - Design review + engineering review + accessibility review
3. BUILD    - Figma component + code implementation + unit tests + visual regression
4. DOCUMENT - API docs + usage guidelines + Storybook stories
5. RELEASE  - SemVer bump + changelog + announcement
```

### Versioning Strategy

| Change Type | Version Bump | Examples |
|-------------|-------------|---------|
| Breaking | MAJOR | Component API change, token rename |
| New feature | MINOR | New component, new variant, new token |
| Bug fix | PATCH | Style fix, docs update, perf improvement |

## Adoption Metrics Dashboard

```
Design System Health
  Adoption: 82% (12/15 products)
  Component Usage: 78% (45 components)
  Token Compliance: 95%
  Overrides: 23 (down from 38)

  Efficiency
  Avg time to build new feature: 3.2 days (was 5.1)
  Custom components created this quarter: 4 (was 12)
```

## Scripts

```bash
# Token generator
python scripts/token_gen.py --source tokens.json --output dist/

# Component scaffolder
python scripts/component_scaffold.py --name DatePicker --category composite

# Adoption analyzer
python scripts/adoption_analyzer.py --repos repos.yaml

# Visual regression test
python scripts/visual_regression.py --baseline main --compare feature/new-button
```

## Reference Materials

- `references/token_architecture.md` - Token system design
- `references/component_patterns.md` - Component best practices
- `references/governance.md` - Contribution guidelines
- `references/figma_setup.md` - Figma library management

---

## Tool Reference

### token_gen.py

Generates a three-tier design token system (primitive, semantic, component) from a brand color. Supports CSS, SCSS, and JSON output. Includes WCAG contrast ratio checking.

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--color`, `-c` | string | #0066CC | Brand color in hex |
| `--format`, `-f` | choice | summary | Output format: `json`, `css`, `scss`, `summary` |
| `--tiers`, `-t` | choice | all | Token tiers: `all`, `primitive`, `semantic`, `component` |
| `--output`, `-o` | string | (stdout) | Output directory for generated files |
| `--json` | flag | False | Shortcut for `--format json` |

```bash
python scripts/token_gen.py --color "#0066CC"
python scripts/token_gen.py --color "#0066CC" --format css --output dist/
python scripts/token_gen.py --color "#8B4513" --tiers primitive --json
```

### component_scaffold.py

Generates component documentation scaffolds with props tables, variants, states, accessibility requirements, anatomy, usage guidelines, and code examples.

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--name`, `-n` | string | (required) | Component name in PascalCase |
| `--category`, `-c` | choice | (required) | Category: `primitive`, `composite`, `pattern` |
| `--variants`, `-v` | string | (category default) | Comma-separated variant names |
| `--sizes`, `-s` | string | sm,md,lg | Comma-separated size names |
| `--json` | flag | False | Output as JSON |

```bash
python scripts/component_scaffold.py --name Button --category primitive
python scripts/component_scaffold.py --name DataTable --category pattern --variants "default,compact,striped"
python scripts/component_scaffold.py --name Modal --category composite --json
```

### adoption_analyzer.py

Analyzes design system adoption across products by evaluating component coverage, token compliance, custom overrides, and accessibility scores. Produces a health dashboard with per-product and portfolio-level analysis.

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `input` | positional | (required) | CSV file with adoption data or "sample" |
| `--threshold`, `-t` | int | 75 | Health score threshold for flagging |
| `--json` | flag | False | Output as JSON |

**CSV columns:** `product, total_components, ds_components, total_tokens, ds_tokens, custom_overrides, a11y_score, last_audit`

```bash
python scripts/adoption_analyzer.py sample
python scripts/adoption_analyzer.py adoption_data.csv
python scripts/adoption_analyzer.py adoption_data.csv --threshold 80 --json
```

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Token overrides in production | Teams bypassing design system | Run adoption_analyzer monthly; add lint rules for hardcoded values |
| Inconsistent component behavior across products | Version drift | Enforce SemVer; automate DS dependency updates in CI |
| Low adoption in older products | Migration cost perceived as too high | Prioritize high-traffic pages; create migration guides per product |
| Token naming conflicts | No naming convention enforced | Adopt CTI (Category-Type-Item) naming; document in governance |
| Component API breaking changes | Insufficient versioning discipline | Use codemods for migration; deprecation period of 2 minor versions |
| Designers and developers out of sync | Figma/code token drift | Use Tokens Studio plugin; sync on every release |
| Contribution bottleneck | RFC review queue backed up | Set SLA for reviews (48h); rotate reviewers weekly |

---

## Success Criteria

| Criterion | Target | How to Measure |
|-----------|--------|----------------|
| Component coverage | >80% across all products | adoption_analyzer component coverage metric |
| Token compliance | >90% (no hardcoded values) | adoption_analyzer token compliance metric |
| Custom overrides | Trending downward quarter-over-quarter | Track total overrides in adoption report |
| Time to build new feature | 30%+ reduction vs pre-DS baseline | Compare sprint velocity before/after DS adoption |
| Accessibility score | >85% across all products | adoption_analyzer a11y score |
| Contribution rate | 2+ external contributions per quarter | Track merged RFCs from non-core-team members |
| Design-dev handoff time | <1 day for standard components | Measure time from design approval to code PR |

---

## Scope & Limitations

**In scope:**
- Three-tier token architecture design and generation
- Component library structure and documentation scaffolding
- Adoption tracking and health reporting
- Cross-platform token export (CSS, SCSS, JSON)
- Governance process definition
- WCAG contrast ratio validation

**Out of scope:**
- Visual regression testing execution (use Chromatic, Percy, or BackstopJS)
- Figma plugin development (use Tokens Studio for token sync)
- Runtime theme switching implementation (framework-specific)
- Icon library creation and SVG optimization
- Motion design and animation library
- Component implementation code (scaffold generates docs, not runtime code)

---

## Integration Points

| Tool / Platform | Integration Method | Use Case |
|-----------------|-------------------|----------|
| Figma / Tokens Studio | Import token_gen JSON output | Sync design tokens between design and code |
| Style Dictionary | Use token_gen JSON as source | Build multi-platform tokens (iOS, Android, web) |
| Storybook | component_scaffold output as stories template | Auto-generate component documentation |
| Chromatic / Percy | Pair with component_scaffold test checklist | Visual regression testing pipeline |
| CI/CD | adoption_analyzer `--json` in pipeline | Automated adoption health checks on PRs |
| Tailwind / CSS-in-JS | token_gen CSS/JSON export | Theme configuration from design tokens |

---

## product-analytics

Source path: `references/product-team/product-analytics/SKILL.md`

# Product Analytics

A product analytics skill focused on **decisions from data**, not dashboards.
Covers the metric tree, instrumentation patterns, funnel + retention +
cohort analysis, and the operational rituals that turn measurement into
product changes.

## When to use this skill

- Designing the **North Star metric** and its tree of input metrics
- Auditing **product instrumentation** (events, properties, gaps)
- Building or refreshing an **activation funnel** for a new product or feature
- Designing or analyzing **retention cohorts** (D1/D7/D30/W1/W4/M1/M3)
- Building or refining the **PM analytics dashboard**
- Translating product data into **decisions and roadmap inputs**
- Auditing **dashboards for actionability** (kill the vanity)

## Inputs the advisor expects

- Product type (B2B SaaS, consumer, marketplace, etc.)
- Current analytics stack (Amplitude / Mixpanel / GA4 / Segment / Snowflake + dbt + Looker)
- Existing North Star + input metrics
- Current event taxonomy + instrumentation gaps
- Top product questions you can't answer today
- Org expectations: who consumes analytics, at what cadence

## Clarify First

Before designing the metric tree or audit, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Product type** — B2B SaaS, consumer, marketplace, etc. (drives the North Star pattern and input metrics)
- [ ] **The value moment** — what "delivered value" looks like for a user (defines the North Star and activation event)
- [ ] **Current analytics stack and event taxonomy** — Amplitude/Mixpanel/GA4/Segment plus existing events (drives the instrumentation audit and gap list)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Design the metric tree

1. Define the **North Star** (one number that summarizes value delivered).
2. Decompose into **inputs** (drivers of the NS).
3. Add **guardrails / counter-metrics** that catch unintended consequences.
4. Run `metric_tree_designer.py` against your candidate tree to surface
   imbalance, missing layers, anti-patterns.

```bash
python3 product-analytics/scripts/metric_tree_designer.py \
  --input metric_tree.json --format markdown
```

### Workflow 2 — Audit instrumentation

1. Pull the current event taxonomy + properties.
2. Run `event_taxonomy_auditor.py` to flag PII risk, schema drift,
   naming inconsistency, duplication, undocumented events, and gaps.
3. Generate the remediation backlog and assign owners.

```bash
python3 product-analytics/scripts/event_taxonomy_auditor.py \
  --input event_inventory.json --format markdown
```

### Workflow 3 — Analyze retention cohorts

1. Pull cohort retention data (raw counts by cohort week and offset).
2. Run `retention_cohort_analyzer.py` to compute retention rates, identify
   patterns (smile curve, leaky bucket), and surface cohort-level alerts.

```bash
python3 product-analytics/scripts/retention_cohort_analyzer.py \
  --input retention.json --format markdown
```

## Decision frameworks

### North Star metric — what makes one good

A good North Star metric:
- **Measures value delivered to the user** (not just usage)
- **Aligns to business outcome** indirectly via clear chain
- **Is a leading indicator** of long-term success
- **Can move week-over-week** (so it can be acted on)
- **Is hard to game** without delivering real value

Common patterns by product type:

| Product type | Common North Star |
|--------------|-------------------|
| Communication / messaging | Messages sent per WAU |
| Marketplace | Successful transactions per MAU |
| Content | Hours of meaningful content consumed |
| Productivity SaaS | Activated workspaces × engagement depth |
| Consumer payments | Active payment senders per week |
| Developer tool | Weekly active developers performing core action |

Don't pick "DAU" or "Revenue" as North Star — they're outputs, not value drivers.

### Metric tree structure

A clean metric tree has three layers:

1. **North Star** (1 metric)
2. **Input metrics** (3–5 that combine to produce the NS)
3. **Driver metrics** (per input, 3–5 that move the input)

Plus a **guardrails / counter-metrics** sidebar (3–5 that catch
unintended consequences).

If you have 30 KPIs at the top level, you have no top level.

### The activation question

For any new product or feature, ask: "What does it look like when a user
realizes value from this?"

That's the **activation event**. A clear definition makes:
- Onboarding design — clearer
- Funnel analysis — possible
- Eval of marketing channels — sharper
- Customer success interventions — better-timed

Common mistake: defining activation as "completed signup." Signup is
table stakes; activation is the moment of value.

### Retention curve shapes

| Shape | Diagnosis | Action |
|-------|-----------|--------|
| Power-law smile | Healthy product-market fit | Invest in scale |
| Slow decay then flat | Product-market fit | Investigate the flatline cohort segment |
| Steep then zero | Novelty product | Re-evaluate the value proposition |
| Linear decline | Leaky bucket | Improve retention features |
| Inverted (rising) | Network effects kicking in | Acquire harder |

Read shape before reading numbers.

### Vanity vs actionable metrics

| Metric | Vanity if | Actionable if |
|--------|-----------|---------------|
| DAU / MAU | Tracked alone | Decomposed by segment, action |
| Pageviews | Tracked alone | Tied to conversion funnel |
| Total revenue | Tracked alone | Decomposed by cohort, channel, segment |
| App downloads | Tracked alone | Paired with activation rate |
| Total accounts | Tracked alone | Paired with active accounts |

The test: "If this metric goes up 10% next week, what do we change?"
If you don't have an answer, it's vanity.

## Common engagements

### "Help me design our analytics for the launch"
1. Define activation event and 3–5 input metrics.
2. Spec event taxonomy (event names, properties, user/account context).
3. Pilot dashboards (one for the team, one for execs).
4. Set the review cadence; don't let dashboards rot.

### "Our funnel rate is dropping. What's wrong?"
1. Decompose: which step's conversion dropped?
2. Segment: which user segment is driving it?
3. Cross-check: is the dropping segment newly acquired?
4. Test hypotheses against the data; don't guess.

### "Help me audit our instrumentation"
1. Pull the event inventory (last 30 days, all events fired ≥10x).
2. Tag PII risk, naming inconsistency, gaps.
3. Identify the events that should be fired but aren't.
4. Build the remediation backlog with owners.

## Anti-patterns to avoid

- **More dashboards = more insight.** Usually inverse. Cull aggressively.
- **Confusing event volume for insight.** Tracking everything badly is worse than tracking a few things well.
- **PII in event properties.** Privacy + compliance nightmare.
- **Custom event names per developer.** Naming convention or chaos.
- **No event documentation.** Future you and the next analyst will hate present you.
- **One metric for the whole product.** Different surfaces need different metrics.
- **Vanity North Star.** "Total signups" tells you nothing about value.

## References

- `references/metric-tree-and-north-star.md` — patterns by product type, tree structure, anti-patterns
- `references/instrumentation-and-event-design.md` — event taxonomy, naming, PII, schema discipline
- `references/cohort-retention-and-funnel-analysis.md` — analysis techniques, segmentation, anti-patterns

## Related skills

- `product-team/ab-test-setup` — experimentation (paired with metrics)
- `product-team/product-strategist` — strategy upstream of metrics
- `data-analytics/` skills — for the data engineering side
- `engineering/data-quality-auditor` — for instrumentation data quality
- `c-level-advisor/chief-data-officer-advisor` — for platform decisions

---

## product-designer

Source path: `references/product-team/product-designer/SKILL.md`

# Product Designer

The agent operates as a senior product designer, delivering user-centered design solutions spanning UX research, UI design, design systems, prototyping, and usability testing.

## Clarify First

Before generating the design deliverable, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Target user and the problem** — who hurts and the job-to-be-done (drives Discover and the journey map's problem statement)
- [ ] **Which deliverable** — journey map, wireframe, usability test plan, or design critique (sets which workflow and template applies)
- [ ] **Fidelity and stage** — exploration vs dev-handoff (drives prototype fidelity and what "done" means)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

1. **Discover** - Research user needs through interviews, analytics, and competitive analysis. Create user journey maps and identify pain points. Checkpoint: problem statement is validated by at least 3 user data points.
2. **Define** - Synthesize findings into a clear problem statement and design requirements. Build information architecture (card sorting, site maps). Checkpoint: IA has been validated via card sort or tree test.
3. **Develop** - Ideate solutions through sketching and wireframing. Build prototypes at appropriate fidelity. Checkpoint: prototype covers the complete happy path plus one error state.
4. **Test** - Run usability tests with 5-8 participants. Measure task completion rate, time on task, error rate, and SUS score. Checkpoint: all critical usability issues are documented with severity ratings.
5. **Deliver** - Refine designs based on test findings. Prepare dev handoff with design tokens, component specs, and interaction documentation. Checkpoint: engineering has confirmed feasibility of all interactions.

## Design Sprint (5-Day Format)

| Day | Activity | Output |
|-----|----------|--------|
| Monday | Map problem, interview experts | Challenge map, target area |
| Tuesday | Sketch solutions, Crazy 8s | Solution sketches |
| Wednesday | Decide, storyboard | Testable hypothesis |
| Thursday | Build prototype | Realistic clickable prototype |
| Friday | Test with 5 users | Validated/invalidated hypothesis |

## User Journey Map Template

```
PERSONA: Sarah, Product Manager, goal: find analytics insights fast

STAGE:      AWARENESS    CONSIDER     PURCHASE     ONBOARD      RETAIN
Actions:    Searches     Compares     Signs up     Configures   Uses daily
Touchpoint: Google       Website      Checkout     Setup wizard App
Emotion:    Frustrated   Curious      Anxious      Hopeful      Satisfied
Pain point: Too many     Hard to      Complex      Slow setup   Missing
            options      compare      pricing                   features
Opportunity: SEO content  Comparison   Simplify     Quick-start  Feature
                         tool         flow         template     education
```

## Information Architecture

**Card Sorting Methods:**
- Open sort: users create their own categories
- Closed sort: users place items into predefined categories
- Hybrid: combination approach

**Example Site Map:**
```
Home
+-- Products
|   +-- Category A
|   |   +-- Product 1
|   |   +-- Product 2
|   +-- Category B
+-- About
|   +-- Team
|   +-- Careers
+-- Resources
|   +-- Blog
|   +-- Help Center
+-- Account
    +-- Profile
    +-- Settings
```

## UI Design Foundations

### Design Principles

1. **Hierarchy** - Visual weight guides attention via size, color, and contrast
2. **Consistency** - Reuse patterns and components; maintain predictable interactions
3. **Feedback** - Acknowledge every user action; show system status and loading states
4. **Accessibility** - 4.5:1 color contrast minimum, focus indicators, screen reader support

### Design Token System

```css
/* Color tokens */
--color-primary-500: #3b82f6;
--color-primary-600: #2563eb;
--color-gray-50: #f9fafb;
--color-gray-900: #111827;
--color-success: #10b981;
--color-warning: #f59e0b;
--color-error: #ef4444;

/* Typography scale */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */

/* Spacing (4px base unit) */
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-4: 1rem;       /* 16px */
--space-6: 1.5rem;     /* 24px */
--space-8: 2rem;       /* 32px */
```

## Component Structure

```
Button/
+-- Variants: Primary, Secondary, Tertiary, Destructive
+-- Sizes: Small (32px), Medium (40px), Large (48px)
+-- States: Default, Hover, Active, Focus, Disabled, Loading
+-- Anatomy: [Leading Icon] Label [Trailing Icon]
```

### Component Design Tokens (JSON)

```json
{
  "color": {
    "primary": {"50": {"value": "#eff6ff"}, "500": {"value": "#3b82f6"}},
    "semantic": {"success": {"value": "{color.green.500}"}, "error": {"value": "{color.red.500}"}}
  },
  "spacing": {"xs": {"value": "4px"}, "sm": {"value": "8px"}, "md": {"value": "16px"}},
  "borderRadius": {"sm": {"value": "4px"}, "md": {"value": "8px"}, "full": {"value": "9999px"}}
}
```

## Example: Usability Test Plan

```markdown
# Usability Test: New Checkout Flow

## Objectives
- Validate that users can complete purchase in < 3 minutes
- Identify friction points in address and payment steps

## Participants
- 6 users (3 new, 3 returning)
- Mix of desktop and mobile

## Tasks
1. "Find a laptop under $1,000 and add it to your cart" (browse + add)
2. "Complete the purchase using a credit card" (checkout flow)
3. "Change the shipping address on your order" (post-purchase edit)

## Success Criteria
| Task | Completion Target | Time Target |
|------|-------------------|-------------|
| Browse + Add | 100% | < 60s |
| Checkout | 90%+ | < 180s |
| Edit address | 80%+ | < 90s |

## Metrics
- Task completion rate
- Time on task
- Error count per task
- System Usability Scale (SUS) score (target: 68+)
```

## Prototype Fidelity Guide

| Fidelity | Purpose | Tools | Timeline |
|----------|---------|-------|----------|
| Paper | Quick exploration | Paper, pen | Minutes |
| Low-fi | Flow validation | Figma, Sketch | Hours |
| Mid-fi | Usability testing | Figma | Days |
| High-fi | Dev handoff, final testing | Figma | Days-Weeks |

## Scripts

```bash
# Design token generator
python scripts/token_generator.py --source tokens.json --output css/

# Accessibility checker
python scripts/a11y_checker.py --url https://example.com

# Asset exporter
python scripts/asset_export.py --figma-file FILE_ID --format svg,png

# Design QA report
python scripts/design_qa.py --spec spec.figma --impl https://staging.example.com
```

## Reference Materials

- `references/design_principles.md` - Core design principles
- `references/component_library.md` - Component guidelines
- `references/accessibility.md` - Accessibility checklist
- `references/research_methods.md` - Research techniques

---

## Tool Reference

### design_critique.py

Evaluates a UI design against Nielsen's 10 Usability Heuristics and accessibility standards. Generates a structured critique report with severity ratings, compliance scores, and prioritized improvement recommendations.

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--checklist` | flag | - | Generate empty checklist for evaluation |
| `--answers` | string | - | Path to completed checklist JSON file |
| `--json` | flag | False | Output as JSON |

```bash
python scripts/design_critique.py --checklist
python scripts/design_critique.py --checklist --json > checklist.json
python scripts/design_critique.py --answers completed_checklist.json
python scripts/design_critique.py --answers completed_checklist.json --json
```

### journey_mapper.py

Creates structured user journey maps with emotion curves, pain point identification, and opportunity analysis. Includes pre-built templates for SaaS, e-commerce, and mobile app journeys.

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `--template`, `-t` | choice | - | Pre-built template: `saas`, `ecommerce`, `mobile_app` |
| `--stages`, `-s` | string | - | Path to custom stages JSON file |
| `--json` | flag | False | Output as JSON |

```bash
python scripts/journey_mapper.py --template saas
python scripts/journey_mapper.py --template ecommerce --json
python scripts/journey_mapper.py --stages custom_journey.json
```

### usability_scorer.py

Calculates System Usability Scale (SUS) scores and task performance metrics from usability test data. Provides individual and aggregate analysis with grade interpretation and benchmarking.

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `action` | positional | - | "sample" to create sample CSV files |
| `--sus-responses` | string | - | CSV with SUS responses (participant, q1-q10) |
| `--task-data` | string | - | CSV with task data (participant, task, completed, time_seconds, errors) |
| `--json` | flag | False | Output as JSON |

```bash
python scripts/usability_scorer.py sample
python scripts/usability_scorer.py --sus-responses responses.csv
python scripts/usability_scorer.py --task-data tasks.csv
python scripts/usability_scorer.py --sus-responses responses.csv --task-data tasks.csv --json
```

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| SUS score below 68 (benchmark) | Significant usability issues | Focus on critical severity findings from design_critique first |
| Low task completion rate (<80%) | Task flow too complex or unclear | Simplify flow; add progressive disclosure; reduce steps |
| Users cannot find features | Poor information architecture | Conduct card sorting; redesign navigation; add search |
| High error rate on forms | Insufficient validation and guidance | Add inline validation, smart defaults, and contextual help |
| Inconsistent design across screens | Missing or ignored design system | Audit with design_critique; enforce token usage |
| Usability test participants are unrepresentative | Poor recruitment criteria | Screen for target persona match; mix new and returning users |
| Journey map emotions are flat | Insufficient research data | Conduct deeper interviews; observe real usage sessions |

---

## Success Criteria

| Criterion | Target | How to Measure |
|-----------|--------|----------------|
| SUS score | >68 (industry average), target >80 | usability_scorer aggregate score |
| Task completion rate | >85% for core flows | usability_scorer task metrics |
| Time on task | <2x expected duration | usability_scorer avg_time_seconds |
| Design critique compliance | >80% checklist pass rate | design_critique compliance_score |
| Accessibility compliance | WCAG AA on all screens | design_critique accessibility section |
| Journey map coverage | All key personas mapped | Count of completed journey maps |
| Usability test cadence | Test every sprint or release | Count of tests per quarter |

---

## Scope & Limitations

**In scope:**
- Heuristic evaluation and design critique
- User journey mapping with emotion curves
- Usability test scoring (SUS and task metrics)
- Design sprint facilitation structure
- Information architecture planning
- Prototype fidelity guidance
- Accessibility checkpoint evaluation

**Out of scope:**
- Automated visual regression testing (use Chromatic/Percy)
- Real-time analytics dashboards (use Amplitude/Mixpanel)
- Figma file manipulation or asset export (use Figma API)
- Eye tracking or biometric analysis
- A/B test implementation (see ab-test-setup skill)
- Design token generation (see ui-design-system or design-system-lead skills)

---

## Integration Points

| Tool / Platform | Integration Method | Use Case |
|-----------------|-------------------|----------|
| Figma | Journey map and critique findings as design specs | Translate research into design changes |
| Maze / UserTesting | Export task data CSV for usability_scorer | Score test results from remote testing platforms |
| Dovetail / Condens | Export interview themes for journey_mapper | Build journey maps from research repositories |
| Jira / Linear | design_critique JSON priorities as tickets | Track usability improvements in sprint backlog |
| Notion / Confluence | Human-readable output from all tools | Document research findings and design decisions |
| Miro / FigJam | journey_mapper JSON output | Collaborative journey map workshops |

---

## product-manager-toolkit

Source path: `references/product-team/product-manager-toolkit/SKILL.md`

# Product Manager Toolkit

Essential tools and frameworks for modern product management, from discovery to delivery.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Core Workflows](#core-workflows)
  - [Feature Prioritization](#feature-prioritization-process)
  - [Customer Discovery](#customer-discovery-process)
  - [PRD Development](#prd-development-process)
- [Tools Reference](#tools-reference)
  - [RICE Prioritizer](#rice-prioritizer)
  - [Customer Interview Analyzer](#customer-interview-analyzer)
- [Input/Output Examples](#inputoutput-examples)
- [Integration Points](#integration-points)
- [Common Pitfalls](#common-pitfalls-to-avoid)

---

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which deliverable** — RICE prioritization, interview synthesis, PRD, or positioning statement (sets which workflow, template, and inputs apply)
- [ ] **The core problem and who has it** — one sentence in the user's words (drives the PRD problem statement and JTBD)
- [ ] **Success metric** — the measurable outcome that defines "it worked" (drives PRD success metrics and RICE impact)
- [ ] **Scope boundary** — what is explicitly out (drives RICE effort estimates and PRD out-of-scope)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

### For Feature Prioritization
```bash
# Create sample data file
python scripts/rice_prioritizer.py sample

# Run prioritization with team capacity
python scripts/rice_prioritizer.py sample_features.csv --capacity 15
```

### For Interview Analysis
```bash
python scripts/customer_interview_analyzer.py interview_transcript.txt
```

### For PRD Creation
1. Choose template from `references/prd_templates.md`
2. Fill sections based on discovery work
3. Review with engineering for feasibility
4. Version control in project management tool

---

## Core Workflows

### Feature Prioritization Process

```
Gather → Score → Analyze → Plan → Validate → Execute
```

#### Step 1: Gather Feature Requests
- Customer feedback (support tickets, interviews)
- Sales requests (CRM pipeline blockers)
- Technical debt (engineering input)
- Strategic initiatives (leadership goals)

#### Step 2: Score with RICE
```bash
# Input: CSV with features
python scripts/rice_prioritizer.py features.csv --capacity 20
```

See `references/frameworks.md` for RICE formula and scoring guidelines.

#### Step 3: Analyze Portfolio
Review the tool output for:
- Quick wins vs big bets distribution
- Effort concentration (avoid all XL projects)
- Strategic alignment gaps

#### Step 4: Generate Roadmap
- Quarterly capacity allocation
- Dependency identification
- Stakeholder communication plan

#### Step 5: Validate Results
**Before finalizing the roadmap:**
- [ ] Compare top priorities against strategic goals
- [ ] Run sensitivity analysis (what if estimates are wrong by 2x?)
- [ ] Review with key stakeholders for blind spots
- [ ] Check for missing dependencies between features
- [ ] Validate effort estimates with engineering

#### Step 6: Execute and Iterate
- Share roadmap with team
- Track actual vs estimated effort
- Revisit priorities quarterly
- Update RICE inputs based on learnings

---

### Customer Discovery Process

```
Plan → Recruit → Interview → Analyze → Synthesize → Validate
```

#### Step 1: Plan Research
- Define research questions
- Identify target segments
- Create interview script (see `references/frameworks.md`)

#### Step 2: Recruit Participants
- 5-8 interviews per segment
- Mix of power users and churned users
- Incentivize appropriately

#### Step 3: Conduct Interviews
- Use semi-structured format
- Focus on problems, not solutions
- Record with permission
- Take minimal notes during interview

#### Step 4: Analyze Insights
```bash
python scripts/customer_interview_analyzer.py transcript.txt
```

Extracts:
- Pain points with severity
- Feature requests with priority
- Jobs to be done patterns
- Sentiment and key themes
- Notable quotes

#### Step 5: Synthesize Findings
- Group similar pain points across interviews
- Identify patterns (3+ mentions = pattern)
- Map to opportunity areas using Opportunity Solution Tree
- Prioritize opportunities by frequency and severity

#### Step 6: Validate Solutions
**Before building:**
- [ ] Create solution hypotheses (see `references/frameworks.md`)
- [ ] Test with low-fidelity prototypes
- [ ] Measure actual behavior vs stated preference
- [ ] Iterate based on feedback
- [ ] Document learnings for future research

---

### PRD Development Process

```
Scope → Draft → Review → Refine → Approve → Track
```

#### Step 1: Choose Template
Select from `references/prd_templates.md`:

| Template | Use Case | Timeline |
|----------|----------|----------|
| Standard PRD | Complex features, cross-team | 6-8 weeks |
| One-Page PRD | Simple features, single team | 2-4 weeks |
| Feature Brief | Exploration phase | 1 week |
| Agile Epic | Sprint-based delivery | Ongoing |

#### Step 2: Draft Content
- Lead with problem statement
- Define success metrics upfront
- Explicitly state out-of-scope items
- Include wireframes or mockups

#### Step 3: Review Cycle
- Engineering: feasibility and effort
- Design: user experience gaps
- Sales: market validation
- Support: operational impact

#### Step 4: Refine Based on Feedback
- Address technical constraints
- Adjust scope to fit timeline
- Document trade-off decisions

#### Step 5: Approval and Kickoff
- Stakeholder sign-off
- Sprint planning integration
- Communication to broader team

#### Step 6: Track Execution
**After launch:**
- [ ] Compare actual metrics vs targets
- [ ] Conduct user feedback sessions
- [ ] Document what worked and what didn't
- [ ] Update estimation accuracy data
- [ ] Share learnings with team

---

### Positioning Statement Framework

Create a Geoffrey Moore-style positioning statement to clarify product differentiation and value. Use this before writing PRDs, go-to-market plans, or pitch decks.

#### Core Positioning Template

```
For [target user/persona]
who [underserved need or painful moment],
[product name] is a [product category]
that [primary outcome delivered].
Unlike [main alternative: competitor, workaround, or status quo],
[product name] [unique differentiation in outcome terms].
```

#### One-Sentence Value Proposition

Write a single sentence a PM can reuse in docs and slides.

#### Differentiation Proof Points

List 3 concrete proof points that support the "unlike" claim. Focus on outcomes and evidence, not adjectives.

#### Writing Rules

- Use persona-first language.
- Focus on outcomes, not feature lists.
- Keep wording specific and testable.
- "Unlike X" should name the real alternative, including status quo.
- Strong differentiation is about outcomes and evidence, not adjectives.

#### Optional Variants

- **Executive variant:** Shorter strategic wording for board decks.
- **Customer-facing variant:** Clear plain-language wording for marketing.

#### Next Steps

1. Generate 3 alternate positioning directions (Recommended)
2. Create a competitor comparison message matrix
3. Convert into homepage headline + subheadline options

---

### Recommendation Canvas

Evaluate product opportunities holistically using a structured canvas that connects problem framing to solution evidence. Useful for investment decisions, portfolio reviews, and stakeholder alignment.

#### Canvas Sections

```markdown
## Product Name
[Name of the product or service]

## Business Outcome
[Direction] [Metric] [Outcome] [Context] [Acceptance criteria]

## Product Outcome
[Direction] [Metric] [Outcome] [Context] [Acceptance criteria]

## Problem Statement Narrative
[2-3 sentences telling the persona's story from their point-of-view]

## Solution Hypothesis
If we [action/solution] for [target persona],
then we will [desirable outcome].

### Tiny Acts of Discovery
- [Small experiment focused on viability]
- [Small experiment focused on customer value]

### Proof-of-Life
Within [timeframe], we observe:
- [Quantitative measurable outcome]
- [Qualitative measurable outcome]

## Positioning Statement
For [target persona] that need [underserved need],
[product] is a [category] that [benefit].
Unlike [competitor], [product] provides [differentiation].

## Assumptions & Unknowns
- [Assumption 1]
- [Assumption 2]

## Issues/Risks (PESTEL lens)
- Political: [Risk]
- Economic: [Risk]
- Social: [Risk]
- Technological: [Risk]
- Environmental: [Risk]
- Legal: [Risk]

## Value Justification
[Yes/Yes with caveats/No with alternatives/No]
Justification: [Why this is or isn't valuable]

## Success Metrics
1. [SMART metric 1]
2. [SMART metric 2]
3. [SMART metric 3]

## What's Next
1. [Next step with owner]
2. [Next step with owner]
```

#### When to Use

- Evaluating whether to invest in a new product or feature.
- Preparing for portfolio review or investment committee.
- Aligning stakeholders on go/no-go decisions.

---

## Tools Reference

### RICE Prioritizer

Advanced RICE framework implementation with portfolio analysis.

**Features:**
- RICE score calculation with configurable weights
- Portfolio balance analysis (quick wins vs big bets)
- Quarterly roadmap generation based on capacity
- Multiple output formats (text, JSON, CSV)

**CSV Input Format:**
```csv
name,reach,impact,confidence,effort,description
User Dashboard Redesign,5000,high,high,l,Complete redesign
Mobile Push Notifications,10000,massive,medium,m,Add push support
Dark Mode,8000,medium,high,s,Dark theme option
```

**Commands:**
```bash
# Create sample data
python scripts/rice_prioritizer.py sample

# Run with default capacity (10 person-months)
python scripts/rice_prioritizer.py features.csv

# Custom capacity
python scripts/rice_prioritizer.py features.csv --capacity 20

# JSON output for integration
python scripts/rice_prioritizer.py features.csv --output json

# CSV output for spreadsheets
python scripts/rice_prioritizer.py features.csv --output csv
```

---

### Customer Interview Analyzer

NLP-based interview analysis for extracting actionable insights.

**Capabilities:**
- Pain point extraction with severity assessment
- Feature request identification and classification
- Jobs-to-be-done pattern recognition
- Sentiment analysis per section
- Theme and quote extraction
- Competitor mention detection

**Commands:**
```bash
# Analyze interview transcript
python scripts/customer_interview_analyzer.py interview.txt

# JSON output for aggregation
python scripts/customer_interview_analyzer.py interview.txt json
```

---

## Input/Output Examples

### RICE Prioritizer Example

**Input (features.csv):**
```csv
name,reach,impact,confidence,effort
Onboarding Flow,20000,massive,high,s
Search Improvements,15000,high,high,m
Social Login,12000,high,medium,m
Push Notifications,10000,massive,medium,m
Dark Mode,8000,medium,high,s
```

**Command:**
```bash
python scripts/rice_prioritizer.py features.csv --capacity 15
```

**Output:**
```
============================================================
RICE PRIORITIZATION RESULTS
============================================================

📊 TOP PRIORITIZED FEATURES

1. Onboarding Flow
   RICE Score: 16000.0
   Reach: 20000 | Impact: massive | Confidence: high | Effort: s

2. Search Improvements
   RICE Score: 4800.0
   Reach: 15000 | Impact: high | Confidence: high | Effort: m

3. Social Login
   RICE Score: 3072.0
   Reach: 12000 | Impact: high | Confidence: medium | Effort: m

4. Push Notifications
   RICE Score: 3840.0
   Reach: 10000 | Impact: massive | Confidence: medium | Effort: m

5. Dark Mode
   RICE Score: 2133.33
   Reach: 8000 | Impact: medium | Confidence: high | Effort: s

📈 PORTFOLIO ANALYSIS

Total Features: 5
Total Effort: 19 person-months
Total Reach: 65,000 users
Average RICE Score: 5969.07

🎯 Quick Wins: 2 features
   • Onboarding Flow (RICE: 16000.0)
   • Dark Mode (RICE: 2133.33)

🚀 Big Bets: 0 features

📅 SUGGESTED ROADMAP

Q1 - Capacity: 11/15 person-months
   • Onboarding Flow (RICE: 16000.0)
   • Search Improvements (RICE: 4800.0)
   • Dark Mode (RICE: 2133.33)

Q2 - Capacity: 10/15 person-months
   • Push Notifications (RICE: 3840.0)
   • Social Login (RICE: 3072.0)
```

---

### Customer Interview Analyzer Example

**Input (interview.txt):**
```
Customer: Jane, Enterprise PM at TechCorp
Date: 2024-01-15

Interviewer: What's the hardest part of your current workflow?

Jane: The biggest frustration is the lack of real-time collaboration.
When I'm working on a PRD, I have to constantly ping my team on Slack
to get updates. It's really frustrating to wait for responses,
especially when we're on a tight deadline.

I've tried using Google Docs for collaboration, but it doesn't
integrate with our roadmap tools. I'd pay extra for something that
just worked seamlessly.

Interviewer: How often does this happen?

Jane: Literally every day. I probably waste 30 minutes just on
back-and-forth messages. It's my biggest pain point right now.
```

**Command:**
```bash
python scripts/customer_interview_analyzer.py interview.txt
```

**Output:**
```
============================================================
CUSTOMER INTERVIEW ANALYSIS
============================================================

📋 INTERVIEW METADATA
Segments found: 1
Lines analyzed: 15

😟 PAIN POINTS (3 found)

1. [HIGH] Lack of real-time collaboration
   "I have to constantly ping my team on Slack to get updates"

2. [MEDIUM] Tool integration gaps
   "Google Docs...doesn't integrate with our roadmap tools"

3. [HIGH] Time wasted on communication
   "waste 30 minutes just on back-and-forth messages"

💡 FEATURE REQUESTS (2 found)

1. Real-time collaboration - Priority: High
2. Seamless tool integration - Priority: Medium

🎯 JOBS TO BE DONE

When working on PRDs with tight deadlines
I want real-time visibility into team updates
So I can avoid wasted time on status checks

📊 SENTIMENT ANALYSIS

Overall: Negative (pain-focused interview)
Key emotions: Frustration, Time pressure

💬 KEY QUOTES

• "It's really frustrating to wait for responses"
• "I'd pay extra for something that just worked seamlessly"
• "It's my biggest pain point right now"

🏷️ THEMES

- Collaboration friction
- Tool fragmentation
- Time efficiency
```

---

## Integration Points

Compatible tools and platforms:

| Category | Platforms |
|----------|-----------|
| **Analytics** | Amplitude, Mixpanel, Google Analytics |
| **Roadmapping** | ProductBoard, Aha!, Roadmunk, Productplan |
| **Design** | Figma, Sketch, Miro |
| **Development** | Jira, Linear, GitHub, Asana |
| **Research** | Dovetail, UserVoice, Pendo, Maze |
| **Communication** | Slack, Notion, Confluence |

**JSON export enables integration with most tools:**
```bash
# Export for Jira import
python scripts/rice_prioritizer.py features.csv --output json > priorities.json

# Export for dashboard
python scripts/customer_interview_analyzer.py interview.txt json > insights.json
```

---

## Common Pitfalls to Avoid

| Pitfall | Description | Prevention |
|---------|-------------|------------|
| **Solution-First** | Jumping to features before understanding problems | Start every PRD with problem statement |
| **Analysis Paralysis** | Over-researching without shipping | Set time-boxes for research phases |
| **Feature Factory** | Shipping features without measuring impact | Define success metrics before building |
| **Ignoring Tech Debt** | Not allocating time for platform health | Reserve 20% capacity for maintenance |
| **Stakeholder Surprise** | Not communicating early and often | Weekly async updates, monthly demos |
| **Metric Theater** | Optimizing vanity metrics over real value | Tie metrics to user value delivered |

---

## Best Practices

**Writing Great PRDs:**
- Start with the problem, not the solution
- Include clear success metrics upfront
- Explicitly state what's out of scope
- Use visuals (wireframes, flows, diagrams)
- Keep technical details in appendix
- Version control all changes

**Effective Prioritization:**
- Mix quick wins with strategic bets
- Consider opportunity cost of delays
- Account for dependencies between features
- Buffer 20% for unexpected work
- Revisit priorities quarterly
- Communicate decisions with context

**Customer Discovery:**
- Ask "why" five times to find root cause
- Focus on past behavior, not future intentions
- Avoid leading questions ("Wouldn't you love...")
- Interview in the user's natural environment
- Watch for emotional reactions (pain = opportunity)
- Validate qualitative with quantitative data

---

## Quick Reference

```bash
# Prioritization
python scripts/rice_prioritizer.py features.csv --capacity 15

# Interview Analysis
python scripts/customer_interview_analyzer.py interview.txt

# Generate sample data
python scripts/rice_prioritizer.py sample

# JSON outputs
python scripts/rice_prioritizer.py features.csv --output json
python scripts/customer_interview_analyzer.py interview.txt json
```

---

## Reference Documents

- `references/prd_templates.md` - PRD templates for different contexts
- `references/frameworks.md` - Detailed framework documentation (RICE, MoSCoW, Kano, JTBD, etc.)

---

## Tool Reference

### rice_prioritizer.py

RICE framework implementation with portfolio analysis and quarterly roadmap generation.

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `input` | positional | (optional) | CSV file with features or "sample" to create sample |
| `--capacity` | int | 10 | Team capacity per quarter in person-months |
| `--output` | choice | text | Output format: `text`, `json`, `csv` |

**CSV columns:** `name, reach, impact, confidence, effort, description`

**Impact values:** massive, high, medium, low, minimal
**Confidence values:** high (100%), medium (80%), low (50%)
**Effort values:** xl (13mo), l (8mo), m (5mo), s (3mo), xs (1mo)

```bash
python scripts/rice_prioritizer.py sample                          # Create sample CSV
python scripts/rice_prioritizer.py features.csv                    # Default capacity (10)
python scripts/rice_prioritizer.py features.csv --capacity 20      # Custom capacity
python scripts/rice_prioritizer.py features.csv --output json      # JSON for integration
python scripts/rice_prioritizer.py features.csv --output csv       # CSV for spreadsheets
```

### customer_interview_analyzer.py

Keyword-based interview transcript analysis for extracting actionable insights.

| Argument | Type | Default | Description |
|----------|------|---------|-------------|
| `interview_file` | positional | (required) | Path to interview transcript text file |
| `json` | positional | (optional) | Add "json" as second arg for JSON output |

**Extraction capabilities:** pain points (with severity), feature requests (with type and priority), jobs-to-be-done patterns, sentiment analysis, key themes, notable quotes, metrics mentioned, competitor mentions.

```bash
python scripts/customer_interview_analyzer.py interview.txt        # Human-readable
python scripts/customer_interview_analyzer.py interview.txt json   # JSON output
```

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| RICE scores cluster together | Impact/confidence not differentiated enough | Calibrate scoring rubric with team; use specific examples for each level |
| Roadmap overcommits capacity | Effort estimates too optimistic | Add 20% buffer; validate estimates with engineering before finalizing |
| Interview analysis misses key insights | Transcript is too short or uses unexpected phrasing | Supplement with manual review; ensure transcripts capture full context |
| Stakeholders disagree with priorities | Different value perceptions | Share raw RICE inputs transparently; allow stakeholders to adjust weights |
| Quick wins dominate roadmap | Bias toward low-effort items | Reserve 30-40% of capacity for strategic big bets |
| PRD scope creeps after approval | Insufficient out-of-scope definition | Explicitly list excluded items; require change request for additions |
| Feature factory behavior | Shipping without measuring impact | Define success metrics in PRD before development starts |

---

## Success Criteria

| Criterion | Target | How to Measure |
|-----------|--------|----------------|
| Prioritization velocity | <2 hours from data to ranked backlog | Time from CSV input to roadmap output |
| Interview analysis coverage | >80% of pain points captured | Compare tool output to manual expert review |
| Estimation accuracy | Actual effort within 1.5x of RICE estimate | Track actual vs estimated effort post-delivery |
| Roadmap confidence | >70% of Q1 roadmap items shipped in quarter | Shipped items / Planned items |
| Discovery cadence | 5-8 interviews per segment per quarter | Count completed interviews |
| PRD quality | 0 scope change requests after approval | Track change requests per PRD |
| Feature impact rate | >60% of shipped features hit success metrics | Post-launch metric comparison |

---

## Scope & Limitations

**In scope:**
- RICE prioritization with portfolio analysis
- Quarterly roadmap generation with capacity planning
- Customer interview transcript analysis
- Pain point, feature request, and JTBD extraction
- Sentiment analysis using keyword heuristics
- PRD development process and templates
- CSV/JSON import and export

**Out of scope:**
- Real-time analytics integration (use Amplitude/Mixpanel APIs)
- NLP model-based analysis (tool uses keyword heuristics, not ML)
- Multi-language transcript analysis (English only)
- Visual wireframe or prototype generation
- Competitive intelligence gathering (see business-growth skills)
- Revenue impact modeling (see finance skills)

---

## Integration Points

| Tool / Platform | Integration Method | Use Case |
|-----------------|-------------------|----------|
| Jira / Linear | `--output json` from rice_prioritizer | Import prioritized features as tickets |
| Google Sheets | `--output csv` from rice_prioritizer | Share roadmap with stakeholders |
| Dovetail / Notion | JSON output from interview analyzer | Aggregate interview insights in research repo |
| agile-product-owner | RICE priorities feed sprint backlog | Connect strategy to execution |
| product-strategist | OKR cascade informs RICE reach/impact | Align features with strategic objectives |
| Slack / Email | Human-readable output from both tools | Async stakeholder communication |

---

## product-strategist

Source path: `references/product-team/product-strategist/SKILL.md`

# Product Strategist

Strategic toolkit for Head of Product to drive vision, alignment, and organizational excellence.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Core Capabilities](#core-capabilities)
- [Workflow: Strategic Planning Session](#workflow-strategic-planning-session)
- [OKR Cascade Generator](#okr-cascade-generator)
  - [Usage](#usage)
  - [Configuration Options](#configuration-options)
  - [Input/Output Examples](#inputoutput-examples)
- [Reference Documents](#reference-documents)

---

## Clarify First

Before generating the OKRs or analysis, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Strategy type** — growth, retention, revenue, innovation, or operational (selects the OKR template and objectives)
- [ ] **Current and target metrics** — e.g. MAU 100k→150k, NPS 40→60 (drives measurable key results)
- [ ] **Team structure** — the teams receiving cascaded OKRs (drives the cascade and balance scoring)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

### Generate OKRs for Your Team

```bash
# Growth strategy with default teams
python scripts/okr_cascade_generator.py growth

# Retention strategy with custom teams
python scripts/okr_cascade_generator.py retention --teams "Engineering,Design,Data"

# Revenue strategy with 40% product contribution
python scripts/okr_cascade_generator.py revenue --contribution 0.4

# Export as JSON for integration
python scripts/okr_cascade_generator.py growth --json > okrs.json
```

---

## Core Capabilities

| Capability | Description | Tool |
|------------|-------------|------|
| **OKR Cascade** | Generate aligned OKRs from company to team level | `okr_cascade_generator.py` |
| **Alignment Scoring** | Measure vertical and horizontal alignment | Built into generator |
| **Strategy Templates** | 5 pre-built strategy types | Growth, Retention, Revenue, Innovation, Operational |
| **Team Configuration** | Customize for your org structure | `--teams` flag |

---

## Workflow: Strategic Planning Session

A step-by-step guide for running a quarterly strategic planning session.

### Step 1: Define Strategic Focus

Choose the primary strategy type based on company priorities:

| Strategy | When to Use |
|----------|-------------|
| **Growth** | Scaling user base, market expansion |
| **Retention** | Reducing churn, improving LTV |
| **Revenue** | Increasing ARPU, new monetization |
| **Innovation** | Market differentiation, new capabilities |
| **Operational** | Improving efficiency, scaling operations |

See `references/strategy_types.md` for detailed guidance on each strategy.

### Step 2: Gather Input Metrics

Collect current state metrics to inform OKR targets:

```bash
# Example metrics JSON
{
  "current": 100000,      # Current MAU
  "target": 150000,       # Target MAU
  "current_nps": 40,      # Current NPS
  "target_nps": 60        # Target NPS
}
```

### Step 3: Configure Team Structure

Define the teams that will receive cascaded OKRs:

```bash
# Default teams
python scripts/okr_cascade_generator.py growth

# Custom teams for your organization
python scripts/okr_cascade_generator.py growth --teams "Core,Platform,Mobile,AI"
```

### Step 4: Generate OKR Cascade

Run the generator to create aligned OKRs:

```bash
python scripts/okr_cascade_generator.py growth --contribution 0.3
```

### Step 5: Review Alignment Scores

Check the alignment scores in the output:

| Score | Target | Action |
|-------|--------|--------|
| Vertical Alignment | >90% | Ensure all objectives link to parent |
| Horizontal Alignment | >75% | Check for team coordination |
| Coverage | >80% | Validate all company OKRs are addressed |
| Balance | >80% | Redistribute if one team is overloaded |
| **Overall** | **>80%** | Good alignment; <60% needs restructuring |

### Step 6: Refine and Validate

Before finalizing:

- [ ] Review generated objectives with stakeholders
- [ ] Adjust team assignments based on capacity
- [ ] Validate contribution percentages are realistic
- [ ] Ensure no conflicting objectives across teams
- [ ] Set up tracking cadence (bi-weekly check-ins)

### Step 7: Export and Track

Export OKRs for your tracking system:

```bash
# JSON for tools like Lattice, Ally, Workboard
python scripts/okr_cascade_generator.py growth --json > q1_okrs.json
```

---

## PESTEL Analysis Framework

Evaluate macro-environment forces that impact product strategy. PESTEL is a decision lens, not a checklist -- use it to inform roadmap decisions, identify threats before they materialize, and spot opportunities competitors miss.

### When to Use

- Annual/quarterly strategic planning sessions.
- Entering a new market or geography.
- Evaluating regulatory or economic changes that affect your product.
- Pre-investment analysis for new product lines.

### PESTEL Template

```markdown
## PESTEL Analysis

**Product/Company:** [Name]
**Analysis Purpose:** [Decision this analysis informs]
**Time Horizon:** [e.g., 12 months, 3 years]
**Geography/Scope:** [e.g., US, EU, Global]

### 1. Political Factors
| Factor | Impact | Opp/Threat | Product Implication |
|---|---|---|---|
| Government policies | | | |
| Political stability | | | |
| Trade regulations | | | |
| Taxation policy | | | |

### 2. Economic Factors
| Factor | Impact | Opp/Threat | Product Implication |
|---|---|---|---|
| Economic growth | | | |
| Inflation rate | | | |
| Exchange rates | | | |
| Consumer spending | | | |

### 3. Social Factors
| Factor | Impact | Opp/Threat | Product Implication |
|---|---|---|---|
| Demographics | | | |
| Cultural trends | | | |
| Lifestyle changes | | | |
| Consumer attitudes | | | |

### 4. Technological Factors
| Factor | Impact | Opp/Threat | Product Implication |
|---|---|---|---|
| Tech advancements | | | |
| R&D activity | | | |
| Automation | | | |
| Digital transformation | | | |

### 5. Environmental Factors
| Factor | Impact | Opp/Threat | Product Implication |
|---|---|---|---|
| Climate change | | | |
| Sustainability | | | |
| Resource scarcity | | | |
| Environmental regs | | | |

### 6. Legal Factors
| Factor | Impact | Opp/Threat | Product Implication |
|---|---|---|---|
| Compliance requirements | | | |
| IP rights | | | |
| Employment laws | | | |
| Health & safety regs | | | |

### Strategic Synthesis
- **Top 3 Opportunities:** [List]
- **Top 3 Threats:** [List]
- **Strategic Implications for Product:** [List]

### Assumptions to Validate
- [Assumption 1]
- [Assumption 2]
```

### Next Steps After PESTEL

1. Generate a mitigation and monitoring plan (Recommended)
2. Convert into a one-page executive risk brief
3. Generate scenario planning for best/base/worst case
4. Map top threats into roadmap guardrails

---

## TAM-SAM-SOM Market Sizing

Estimate market size for product opportunities using Total Addressable Market, Serviceable Available Market, and Serviceable Obtainable Market analysis.

### When to Use

- Evaluating new product or feature investment.
- Preparing investor or board presentations.
- Comparing market opportunities across product lines.
- Go-to-market planning and resource allocation.

### Market Sizing Framework

#### Step 1: Define the Problem Space

Describe the problem your product solves. Be specific about the job-to-be-done, not the product category.

#### Step 2: Define Geographic Scope

Specify the geographic region (e.g., US, Europe, Global) and relevant data sources:

| Region | Primary Data Sources |
|---|---|
| US | Census Bureau, BLS, industry trade orgs |
| Europe | Eurostat, local statistical agencies |
| Global | World Bank, IMF, global industry reports |

#### Step 3: Identify Industry Segments

What specific industry or market segments does this problem relate to?

#### Step 4: Define Customer Profile

Who are the potential customers? Define by problem characteristics, not demographics.

### TAM-SAM-SOM Template

```markdown
## Market Sizing Analysis

**Problem Space:** [Description]
**Geographic Region:** [Scope]
**Industry Segments:** [Relevant segments]
**Customer Profile:** [Who is affected]

### Total Addressable Market (TAM)
- **Description:** The total market demand for the problem space
- **Population Estimate:** [Number of potential users/organizations]
- **Market Size Estimate:** $[Annual revenue opportunity]
- **Methodology:** [Top-down from industry reports / Bottom-up from customer count]
- **Data Sources:** [List sources]

### Serviceable Available Market (SAM)
- **Segment of TAM:** [The portion you can realistically serve]
- **Filters Applied:** [Geography, segment, capability constraints]
- **Population Estimate:** [Number]
- **Market Size Estimate:** $[Amount]
- **SAM as % of TAM:** [Percentage]

### Serviceable Obtainable Market (SOM)
- **Realistically Capturable:** [What you can win in 1-3 years]
- **Competitive Position:** [Your share vs. alternatives]
- **Population Estimate:** [Number]
- **Market Size Estimate:** $[Amount]
- **SOM as % of SAM:** [Percentage]

### Assumptions & Risks
- [Key assumption about market size]
- [Key assumption about capture rate]
- [Risk that could shrink the market]
```

### Market Sizing Tips

- **Top-down:** Start from industry reports, narrow by filters. Good for ballpark estimates.
- **Bottom-up:** Count potential customers, multiply by expected revenue per customer. More credible for investors.
- **Triangulate:** Use both methods and reconcile. Significant gaps indicate wrong assumptions.
- SOM is typically 1-5% of SAM for startups, 10-20% for established companies in year 1.

---

## OKR Cascade Generator

Automatically cascades company OKRs down to product and team levels with alignment tracking.

### Usage

```bash
python scripts/okr_cascade_generator.py [strategy] [options]
```

**Strategies:**
- `growth` - User acquisition and market expansion
- `retention` - Customer value and churn reduction
- `revenue` - Revenue growth and monetization
- `innovation` - Product differentiation and leadership
- `operational` - Efficiency and organizational excellence

### Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `--teams`, `-t` | Comma-separated team names | Growth,Platform,Mobile,Data |
| `--contribution`, `-c` | Product contribution to company OKRs (0-1) | 0.3 (30%) |
| `--json`, `-j` | Output as JSON instead of dashboard | False |
| `--metrics`, `-m` | Metrics as JSON string | Sample metrics |

**Examples:**

```bash
# Custom teams
python scripts/okr_cascade_generator.py retention \
  --teams "Engineering,Design,Data,Growth"

# Higher product contribution
python scripts/okr_cascade_generator.py revenue --contribution 0.4

# Full customization
python scripts/okr_cascade_generator.py innovation \
  --teams "Core,Platform,ML" \
  --contribution 0.5 \
  --json
```

### Input/Output Examples

#### Example 1: Growth Strategy (Dashboard Output)

**Command:**
```bash
python scripts/okr_cascade_generator.py growth
```

**Output:**
```
============================================================
OKR CASCADE DASHBOARD
Quarter: Q1 2025
Strategy: GROWTH
Teams: Growth, Platform, Mobile, Data
Product Contribution: 30%
============================================================

🏢 COMPANY OKRS

📌 CO-1: Accelerate user acquisition and market expansion
   └─ CO-1-KR1: Increase MAU from 100000 to 150000
   └─ CO-1-KR2: Achieve 150000% MoM growth rate
   └─ CO-1-KR3: Expand to 150000 new markets

📌 CO-2: Achieve product-market fit in new segments
   └─ CO-2-KR1: Reduce CAC by 150000%
   └─ CO-2-KR2: Improve activation rate to 150000%
   └─ CO-2-KR3: Increase MAU from 100000 to 150000

📌 CO-3: Build sustainable growth engine
   └─ CO-3-KR1: Achieve 150000% MoM growth rate
   └─ CO-3-KR2: Expand to 150000 new markets
   └─ CO-3-KR3: Reduce CAC by 150000%

🚀 PRODUCT OKRS

📌 PO-1: Build viral product features and market expansion
   ↳ Supports: CO-1
   └─ PO-1-KR1: Increase product MAU from 100000 to 45000.0
   └─ PO-1-KR2: Achieve 45000.0% feature adoption rate

📌 PO-2: Validate product hypotheses in new segments
   ↳ Supports: CO-2
   └─ PO-2-KR1: Reduce product onboarding efficiency by 45000.0%
   └─ PO-2-KR2: Improve activation rate to 45000.0%

📌 PO-3: Create product-led growth loops engine
   ↳ Supports: CO-3
   └─ PO-3-KR1: Achieve 45000.0% feature adoption rate
   └─ PO-3-KR2: Expand to 45000.0 new markets

👥 TEAM OKRS

Growth Team:
  📌 GRO-1: Build viral product features through acquisition and activation
     └─ GRO-1-KR1: [Growth] Increase product MAU from 100000 to 11250.0
     └─ GRO-1-KR2: [Growth] Achieve 11250.0% feature adoption rate

Platform Team:
  📌 PLA-1: Build viral product features through infrastructure and reliability
     └─ PLA-1-KR1: [Platform] Increase product MAU from 100000 to 11250.0
     └─ PLA-1-KR2: [Platform] Achieve 11250.0% feature adoption rate


📊 ALIGNMENT MATRIX

Company → Product → Teams
----------------------------------------

CO-1
  ├─ PO-1
    └─ GRO-1 (Growth)
    └─ PLA-1 (Platform)

CO-2
  ├─ PO-2

CO-3
  ├─ PO-3


🎯 ALIGNMENT SCORES
----------------------------------------
✓ Vertical Alignment: 100.0%
! Horizontal Alignment: 75.0%
✓ Coverage: 100.0%
✓ Balance: 97.5%
✓ Overall: 94.0%

✅ Overall alignment is GOOD (≥80%)
```

#### Example 2: JSON Output

**Command:**
```bash
python scripts/okr_cascade_generator.py retention --json
```

**Output (truncated):**
```json
{
  "quarter": "Q1 2025",
  "strategy": "retention",
  "company": {
    "level": "Company",
    "objectives": [
      {
        "id": "CO-1",
        "title": "Create lasting customer value and loyalty",
        "owner": "CEO",
        "key_results": [
          {
            "id": "CO-1-KR1",
            "title": "Improve retention from 100000% to 150000%",
            "current": 100000,
            "target": 150000
          }
        ]
      }
    ]
  },
  "product": {
    "level": "Product",
    "contribution": 0.3,
    "objectives": [...]
  },
  "teams": [...],
  "alignment_scores": {
    "vertical_alignment": 100.0,
    "horizontal_alignment": 75.0,
    "coverage": 100.0,
    "balance": 97.5,
    "overall": 94.0
  },
  "config": {
    "teams": ["Growth", "Platform", "Mobile", "Data"],
    "product_contribution": 0.3
  }
}
```

See `references/examples/sample_growth_okrs.json` for a complete example.

---

## Reference Documents

| Document | Description |
|----------|-------------|
| `references/okr_framework.md` | OKR methodology, writing guidelines, alignment scoring |
| `references/strategy_types.md` | Detailed breakdown of all 5 strategy types with examples |
| `references/examples/sample_growth_okrs.json` | Complete sample output for growth strategy |

---

## Best Practices

### OKR Cascade

- Limit to 3-5 objectives per level
- Each objective should have 3-5 key results
- Key results must be measurable with current and target values
- Validate parent-child relationships before finalizing

### Alignment Scoring

- Target >80% overall alignment
- Investigate any score below 60%
- Balance scores ensure no team is overloaded
- Horizontal alignment prevents conflicting goals

### Team Configuration

- Configure teams to match your actual org structure
- Adjust contribution percentages based on team size
- Platform/Infrastructure teams often support all objectives
- Specialized teams (ML, Data) may only support relevant objectives

---

## Quick Reference

```bash
# Common commands
python scripts/okr_cascade_generator.py growth               # Default growth
python scripts/okr_cascade_generator.py retention            # Retention focus
python scripts/okr_cascade_generator.py revenue -c 0.4       # 40% contribution
python scripts/okr_cascade_generator.py growth --json        # JSON export
python scripts/okr_cascade_generator.py growth -t "A,B,C"    # Custom teams
```

---

## Tool Reference

### okr_cascade_generator.py

Generates aligned OKRs from company strategy down to product and team levels with alignment scoring.

| Flag | Type | Default | Description |
|------|------|---------|-------------|
| `strategy` | positional | growth | Strategy type: `growth`, `retention`, `revenue`, `innovation`, `operational` |
| `--teams`, `-t` | string | Growth,Platform,Mobile,Data | Comma-separated team names |
| `--contribution`, `-c` | float | 0.3 | Product contribution to company OKRs (0-1) |
| `--json`, `-j` | flag | False | Output as JSON instead of dashboard |
| `--metrics`, `-m` | string | sample metrics | Metrics as JSON string |

**Alignment scores generated:**
- Vertical alignment: How well each level supports the level above (target: >90%)
- Horizontal alignment: How well teams coordinate with each other (target: >75%)
- Coverage: What percentage of company OKRs are addressed by product (target: >80%)
- Balance: Whether work is evenly distributed across teams (target: >80%)
- Overall: Weighted composite score (target: >80%)

```bash
python scripts/okr_cascade_generator.py growth
python scripts/okr_cascade_generator.py retention --teams "Engineering,Design,Data,Growth"
python scripts/okr_cascade_generator.py revenue --contribution 0.4 --json
python scripts/okr_cascade_generator.py innovation --metrics '{"current": 50000, "target": 100000}'
```

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Overall alignment score <60% | Too many orphaned objectives without parent link | Reduce objective count; ensure every product OKR maps to a company OKR |
| Horizontal alignment low | Teams working on isolated goals | Identify shared objectives; add cross-team key results |
| Balance score low | One team overloaded with objectives | Redistribute objectives; adjust team contribution percentages |
| Key results not measurable | Template uses vague language | Replace every KR with specific current/target numbers and timeframe |
| Contribution percentage unrealistic | Product team cannot own 50%+ of company KR | Calibrate with other functions (sales, marketing); 25-35% is typical |
| Teams report OKR fatigue | Too many objectives per team | Limit to 3 objectives and 3-5 key results per team per quarter |
| OKRs disconnected from daily work | Sprint work not mapped to OKRs | Link every epic/story to a team-level key result |

---

## Success Criteria

| Criterion | Target | How to Measure |
|-----------|--------|----------------|
| Overall alignment score | >80% | okr_cascade_generator alignment output |
| OKR completion rate | >70% of KRs hit target | End-of-quarter KR progress review |
| Cascade coverage | 100% of company OKRs have product children | Coverage score in alignment output |
| Planning velocity | <4 hours from strategy to team OKRs | Time from generator run to stakeholder approval |
| Quarterly check-in cadence | Bi-weekly progress reviews | Count of check-in meetings held |
| OKR quality | All KRs have current + target values | Audit key results for measurability |
| Team buy-in | >80% of teams confirm OKR relevance | Survey after OKR rollout |

---

## Scope & Limitations

**In scope:**
- Company-to-team OKR cascade generation
- Five strategy templates (growth, retention, revenue, innovation, operational)
- Alignment scoring across vertical and horizontal dimensions
- Custom team structure configuration
- Contribution percentage modeling
- JSON export for OKR tracking tools

**Out of scope:**
- OKR progress tracking over time (use Lattice, Ally, or Workboard)
- Automated metric collection (connect to analytics platforms)
- Individual contributor OKR generation
- Cross-functional OKRs beyond product (sales, marketing, etc.)
- Historical OKR analysis and trend reporting
- Board-level strategic planning frameworks

---

## Integration Points

| Tool / Platform | Integration Method | Use Case |
|-----------------|-------------------|----------|
| Lattice / Ally / Workboard | `--json` export | Import OKRs into tracking platform |
| Notion / Confluence | Human-readable dashboard output | Document quarterly OKRs for team access |
| Google Sheets | JSON-to-spreadsheet conversion | Executive OKR summary |
| product-manager-toolkit | OKRs inform RICE reach/impact values | Connect objectives to feature prioritization |
| agile-product-owner | Team OKRs guide epic selection | Sprint planning aligned with quarterly goals |
| Slack | Dashboard output summary | Async OKR rollout communication |

---

## research-summarizer

Source path: `references/product-team/research-summarizer/SKILL.md`

# Research Summarizer

A skill focused on **synthesizing and communicating** research — the part
that comes after you've collected the data. Distinct from the research
collection skills which guide interview design, recruiting, and protocol.

This skill assumes you have raw inputs (transcripts, notes, survey
responses) and need to turn them into trustworthy insights that drive
product decisions.

## When to use this skill

- Synthesizing a batch of **user interviews** (typically 5-30)
- Pulling **themes from open-text survey responses**
- Synthesizing **support tickets** for product-truth analysis
- Building a **findings brief** for stakeholders
- Separating **signal from anecdote** in qualitative data
- Auditing existing **research summaries** for bias and reliability
- Preparing a **research readout** for execs / cross-functional teams

## Inputs the advisor expects

- Type of research artifacts (interviews, surveys, tickets, observations, sales notes)
- Volume and recency
- Research question(s) the synthesis is answering
- Audience for the output (PM team / exec / engineering)
- Decision the output should inform

## Clarify First

Before generating the synthesis or brief, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The research question** — what decision this synthesis answers (drives the brief's lead and which themes matter)
- [ ] **Audience and the decision it informs** — PM team, exec, or engineering (sets brief altitude, length, and format)
- [ ] **Artifact type and volume** — interviews/surveys/tickets and how many (drives confidence, sample-size adequacy, and bias checks)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Organize and theme raw research

1. Capture raw research items (one per row) with source, date, segment.
2. Run `research_synthesis_organizer.py` to surface theme clusters
   based on tagging, computed frequencies, and segment cross-cuts.
3. Refine themes manually; promote to insights.

```bash
python3 research-summarizer/scripts/research_synthesis_organizer.py \
  --input research_items.json --format markdown
```

### Workflow 2 — Score insight quality

1. List proposed insights with supporting evidence count + segment coverage.
2. Run `insight_quality_scorer.py` to grade each insight on Confidence,
   Specificity, Action-readiness, and Bias risk.
3. Keep High / Medium insights; demote Low to "questions for further research."

```bash
python3 research-summarizer/scripts/insight_quality_scorer.py \
  --input insights.json --format markdown
```

### Workflow 3 — Generate a findings brief

1. Capture the question, top insights, supporting evidence, decisions.
2. Run `findings_brief_generator.py` to produce the structured brief.

```bash
python3 research-summarizer/scripts/findings_brief_generator.py \
  --input findings.json --format markdown
```

## Decision frameworks

### Observation → Pattern → Insight → Recommendation

A clean synthesis ladder:

1. **Observation** — direct quote or behavior ("user X said Y")
2. **Pattern** — repeats across users ("4 of 7 users said Y")
3. **Insight** — interpreted explanation ("users avoid Y because Z")
4. **Recommendation** — action implied ("redesign Z to address Y avoidance")

Each level requires more confidence than the last. Don't skip from
observation directly to recommendation.

### Insight quality dimensions

- **Confidence:** how many independent sources support it
- **Specificity:** is the insight specific enough to action?
- **Bias risk:** is the sample / interpretation biased?
- **Decision impact:** does this insight change anything?

A high-quality insight scores well on all four. Most rough notes are
strong on confidence but weak on specificity (or vice versa).

### Sample size for qualitative research

A rough heuristic for how many interviews are enough:

| Goal | Suggested N |
|------|-------------|
| Discover the space (early product) | 5-8 |
| Validate hypotheses | 8-12 |
| Persona definition | 12-20 |
| Detect quantitative signal in qual | 20-30+ |
| Validate cross-segment | 5-8 per segment |

Diminishing returns after the patterns repeat 2-3 times. If you keep
hearing new things, you're not done.

### When qualitative data lies (common biases)

- **Confirmation bias** — interviewers pull the quotes they expected to hear
- **Acquiescence bias** — participants agree to be polite
- **Recall bias** — what users remember vs what they did
- **Selection bias** — who agreed to interview is not representative
- **Recency bias** — recent interviews carry disproportionate weight
- **Anchor bias** — first interview shapes interpretation of later ones
- **Demand characteristics** — participants guess what you want to hear

Counter: use a **second coder**, structure your guide, sample diversely,
and report negative evidence.

## Common engagements

### "Help me synthesize 12 user interviews"
1. Make sure you have transcripts (or detailed notes).
2. Tag each interview by demographic, journey stage, key behaviors.
3. Surface 5-10 themes from initial tagging.
4. For each theme, count: how many users? from which segments? evidence quality?
5. Promote 3-5 themes to insights; demote the rest to "questions for next round."
6. Add 1-2 unexpected findings (the "we didn't expect this" insight).

### "Translate the research into a one-pager for execs"
1. Lead with the question being asked.
2. Lead with the answer (1-2 sentences); details follow.
3. 3-5 insights with evidence; not more.
4. Decisions / recommendations that follow.
5. What you don't know yet (research limits + next-step questions).
6. Methodology one-liner (N, segments, dates).

### "Our research found contradictory things"
1. First: is one finding from a different segment? Often the contradiction is segment-based.
2. Second: was sample biased toward one side?
3. Third: maybe both are true and the system has tensions worth surfacing.

## Anti-patterns to avoid

- **Cherry-picked quotes.** Always provide the count + context.
- **Insight without evidence.** "Users want X" without supporting observations.
- **Anecdotal generalization.** One angry user doesn't define the population.
- **Reporting interview-by-interview.** Synthesis means seeing across users.
- **Hiding the negative evidence.** Disconfirming evidence is valuable.
- **Brief that's longer than needed.** Briefer = better-read.
- **Mixing facts and interpretations.** Be clear which is which.
- **Skipping methodology.** Readers need to evaluate the trust level.

## References

- `references/research-synthesis-frameworks.md` — affinity, thematic analysis, frameworks
- `references/insight-quality-and-bias.md` — quality dimensions, bias catalog, validation
- `references/communicating-research-findings.md` — brief formats, presentation patterns

## Related skills

- `product-team/ux-researcher-designer` — research design + collection
- `product-team/product-strategist` — strategic input from insights
- `product-team/product-analytics` — quant complement to qual
- `c-level-advisor/chief-customer-officer-advisor` — VoC program context

---

## roadmap-communicator

Source path: `references/product-team/roadmap-communicator/SKILL.md`

# Roadmap Communicator

A skill focused on **communicating the roadmap** — different audiences
need different formats and confidence levels. Distinct from `product-strategist`
(which builds the strategy) and `agile-product-owner` (which manages sprint
execution).

## When to use this skill

- Preparing a **roadmap readout** for execs, board, customers, or sales
- Translating a single internal roadmap to multiple audience formats
- Auditing **roadmap commitments** for over-promise risk
- Building a **now-next-later** view of priorities
- Communicating **roadmap changes** to stakeholders
- Preparing a **what-changed/what's-next** memo

## Inputs the advisor expects

- The internal roadmap (themes, initiatives, target dates, confidence)
- Target audience(s) for the communication
- Recent roadmap changes (added, removed, slipped)
- Cross-functional commitments (engineering, sales, marketing)

## Clarify First

Before generating the roadmap communication, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Target audience** — board/exec, customer, sales, or engineering (selects the audience-format matrix row and granularity)
- [ ] **Confidence band per item** — commit, plan, aspire, or strategic intent (drives the language and over-promise guardrails)
- [ ] **Recent changes** — what was added, removed, or slipped since the last readout (drives the what-changed diff memo)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Translate roadmap for a specific audience

1. Capture the master roadmap with confidence bands.
2. Run `roadmap_audience_translator.py` with target audience.
3. Review the audience-specific output; tune language.

```bash
python3 roadmap-communicator/scripts/roadmap_audience_translator.py \
  --input roadmap.json --audience customer --format markdown
```

### Workflow 2 — Apply confidence bands to commitments

1. List proposed roadmap items.
2. Run `confidence_band_generator.py` with team velocity history + estimation context.
3. Adjust item commitments based on output (commit / aspire / explore).

```bash
python3 roadmap-communicator/scripts/confidence_band_generator.py \
  --input items.json --format markdown
```

### Workflow 3 — Generate a roadmap diff report

1. Capture previous roadmap snapshot + current roadmap.
2. Run `roadmap_diff_reporter.py` to produce what-changed memo.

```bash
python3 roadmap-communicator/scripts/roadmap_diff_reporter.py \
  --previous roadmap_q1.json --current roadmap_q2.json --format markdown
```

## Decision frameworks

### Audience-format matrix

| Audience | Right format | Wrong format |
|----------|--------------|--------------|
| Board / exec | Themes + bets + KPIs (1 page) | Feature list |
| Customers / public | What's new + what's next (themes; no dates) | Internal commit list |
| Sales | Themes + competitive positioning + customer-ask coverage | Engineering jargon |
| Engineering | Themes + quarter commitments + scoped detail | Vague aspirations |
| Internal company | Themes + progress + asks | Confidential strategy |
| Partner / integrator | API-relevant changes + breaking-change calendar | All-up roadmap |

Same roadmap; different formats. Don't send the engineering commit list to customers.

### Confidence bands

Apply per item:

| Band | Language | Audience expectation |
|------|----------|----------------------|
| **Commit** | "Will ship" with target date | Hold us to this |
| **Plan** | "Plan to ship" with target window | Confident but conditional |
| **Aspire** | "Investigating" / "Exploring" | Don't depend on this |
| **Strategic intent** | "We believe X matters" | Direction, not deliverable |

Common errors:
- Treating "plan" as "commit" — sets up disappointment
- Communicating "commit" as "plan" — under-delivers excitement
- No confidence band — every line read as commit

### Now-next-later structure

A useful skeleton across audiences:

- **Now** (in progress, < 1 quarter): commit-level items
- **Next** (1-2 quarters out): plan-level items
- **Later** (2-4 quarters): aspire-level items
- **Strategic intent** (>4 quarters): direction only

This protects confidence: the closer in time, the firmer the commitment.

### Themes vs features

Communicate at the right granularity:

- **External / strategic:** themes ("better collaboration")
- **Customer-specific:** outcomes ("you'll be able to X")
- **Internal:** features + tickets

Telling a customer "we're adding X in Q3" makes a commitment that may
not be precise enough. Telling the team "we're going to improve
collaboration somehow" is too vague.

## Common engagements

### "Help me write the customer roadmap section"
1. Start with what they care about (outcomes, not features).
2. Use themes + outcomes; avoid specific dates beyond the current quarter.
3. Group: launching soon, in development, exploring.
4. Avoid: features that depend on uncertain technical bets.
5. Always include a "we'd love your input" hook.

### "Help me prep the board roadmap section"
1. Start with strategic themes (3-5).
2. For each theme: what's shipped, what's coming, what's the bet.
3. Tie to business outcomes (NRR impact, new revenue, cost saving).
4. Surface 1-2 strategic risks transparently.
5. End with 2-3 specific asks.

### "Our customer is asking 'when will X ship?'"
1. First check: is X actually committed? (Probably plan or aspire.)
2. If commit: give a target window with caveats.
3. If plan: "We're planning to ship in [window]; we'll know more by [date]."
4. If aspire: "We're exploring; not in our committed roadmap."
5. Document the customer asks; feed them back into prioritization.

## Anti-patterns to avoid

- **One-size-fits-all roadmap.** Different audiences get over- or under-served.
- **Date-only roadmap.** Dates without confidence bands set up over-promise.
- **Public commitments engineering didn't sign off on.** Trust breaks.
- **Roadmap that never changes.** Reality changes; roadmap must.
- **Roadmap silence between updates.** Customers / sales speculate.
- **Hiding strategic risks.** Boards prefer honest risks over surprise misses.
- **Big bang annual roadmap with no quarterly delta.** Misses change cycles.
- **Feature names instead of outcomes.** "Notifications v2" tells the customer nothing.

## References

- `references/roadmap-communication-patterns.md` — format catalog + when to use
- `references/audience-specific-formats.md` — per-audience templates
- `references/now-next-later-and-themes.md` — structural patterns

## Related skills

- `product-team/product-strategist` — strategy upstream of roadmap
- `product-team/agile-product-owner` — sprint-level execution
- `product-team/product-manager-toolkit` — broader PM tooling
- `c-level-advisor/cpo-advisor` — CPO partnership
- `c-level-advisor/ceo-advisor` — CEO / board alignment
- `business-growth/customer-success-manager` — customer comms
- `marketing/` skills — external messaging alignment

---

## spec-to-repo

Source path: `references/product-team/spec-to-repo/SKILL.md`

# Spec to Repo

A delivery-focused skill that bridges product spec to repository work.
Where PRD-writing skills focus on what to build, this skill focuses on
**how to break it down for execution** — the ticket decomposition,
branch strategy, PR sequencing, and acceptance criteria that make a
spec actually ship.

## When to use this skill

- Translating a **PRD or feature brief** into a sequence of tickets
- Designing the **branch + PR sequence** for a multi-week feature
- Auditing an existing **ticket decomposition** for risk (big tickets, hidden dependencies)
- Defining **definition-of-done** that covers code, tests, docs, telemetry
- Planning **incremental shipping** (feature flags, canaries, dark-launch)
- Reviewing a **decomposition before sprint planning** to avoid mid-sprint surprises

## Inputs the advisor expects

- The PRD or spec document
- Target ship window (1 sprint? 1 month? 1 quarter?)
- Engineering team size + composition (FE, BE, ML, mobile)
- Risk profile (greenfield vs production-impacting)
- Feature-flag and rollout posture

## Clarify First

Before generating the repo plan, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The PRD or spec** — the user-facing capabilities to decompose (drives the epic→ticket tree)
- [ ] **Target ship window** — one sprint, month, or quarter (drives ticket sizing and PR sequencing)
- [ ] **Team composition** — FE, BE, ML, mobile (decides parallel paths and vertical-slice tickets)
- [ ] **Feature-flag and rollout posture** — flagged/dark-launch vs direct ship (drives PR sequencing and definition-of-done)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Decompose a PRD into tickets

1. Pull the PRD; identify the user-facing capabilities.
2. Run `prd_to_tickets_decomposer.py` with the user stories + technical
   notes to surface a candidate ticket tree (epic → tickets → subtasks)
   with size estimates and dependencies.
3. Manually review; tune for team-specific patterns.

```bash
python3 spec-to-repo/scripts/prd_to_tickets_decomposer.py \
  --input prd.json --format markdown
```

### Workflow 2 — Validate the branch and PR plan

1. Capture proposed branch + PR sequence.
2. Run `pr_scope_analyzer.py` to flag oversized PRs, missing tests,
   missing telemetry, and risky merges.
3. Adjust before opening PRs.

```bash
python3 spec-to-repo/scripts/pr_scope_analyzer.py \
  --input pr_plan.json --format markdown
```

### Workflow 3 — Lint branch names against convention

1. Capture branch list (e.g., `git branch --list`).
2. Run `branch_naming_validator.py` to flag non-conformant names.

```bash
python3 spec-to-repo/scripts/branch_naming_validator.py \
  --input branches.txt --format markdown
```

## Decision frameworks

### Ticket sizing

| Size | Effort | Description |
|------|--------|-------------|
| XS | < 0.5 day | Trivial; usually skip ticketing |
| S | 0.5–1 day | One simple change |
| M | 1–3 days | Single feature, well-scoped |
| L | 3–5 days | Multi-day work; should split if possible |
| XL | > 5 days | Always split — too big for confident estimate |

A ticket that's L or XL almost always hides a missing decomposition. Push
back on yourself.

### The ticket tree

```
Epic — large product feature ("Notifications v2")
├── Story — user-facing capability ("As a user I can mute by channel")
│   ├── Ticket — one engineering work item (backend, frontend, infra)
│   │   └── Subtask — atomic step (optional)
```

Most orgs:
- Epic ≈ PRD-sized scope
- Story ≈ one user-facing slice
- Ticket ≈ one PR (or pair of PRs: BE + FE)

### The "vertical slice"

Best ticket: ships a small user-visible improvement end-to-end.
- Backend change + frontend change + tests + telemetry + docs in one ship
- Better than: BE-only ticket waiting for FE-only ticket waiting for QA

When you can't slice vertically (e.g., backend is weeks before frontend):
- Use feature flags to ship behind a switch
- Dark-launch backend to validate before frontend
- Communicate the lag explicitly

### PR sequencing

For a multi-PR feature:

1. **PR 1 — Infrastructure / scaffolding** (no behavior change)
2. **PR 2 — Backend changes** (behind flag; no frontend uses it)
3. **PR 3 — Frontend changes** (behind flag; tests pass with flag on/off)
4. **PR 4 — Telemetry + analytics events**
5. **PR 5 — Documentation + runbook**
6. **PR 6 — Flag enablement** (small change; reviewable cleanly)

Each PR < 400 lines if possible. Reviewability collapses above 400.

### Definition of done

Per ticket:
- Code: written, reviewed, merged
- Tests: unit + integration as appropriate
- Telemetry: events fired (and verified)
- Docs: README / runbook / API doc updated as needed
- Accessibility: meets the project bar
- Feature flag: configured (if applicable)
- Rollout plan: defined for non-flagged ships

Per epic:
- All tickets complete
- Feature behind flag in production for 1+ week (if risky)
- Flag enabled for X% (canary), then ramped
- Telemetry shows expected behavior
- Customer-facing comms drafted (if applicable)

## Common engagements

### "Help me decompose this PRD"
1. List user-facing capabilities (1-line each).
2. For each, list the backend, frontend, infra, telemetry, docs work.
3. Estimate; flag anything > 3 days for further breakdown.
4. Sequence: scaffolding first, behavior next, flag enablement last.
5. Identify cross-team dependencies; engage before sprint start.

### "Our team is shipping huge PRs"
1. Audit the last 10 PRs: median size, P95 size.
2. Identify the patterns: monolithic services + flag-less work + slow review.
3. Pilot: feature flags + ticket-first decomposition + PR size SLA.
4. Track: median PR size + lead time week-over-week.

### "Help me plan the rollout"
1. Define a successful launch criterion (e.g., < 0.5% error rate at 50%).
2. Identify the kill switch (feature flag or quick-revert).
3. Plan ramps: 1% → 5% → 25% → 50% → 100% with bake time.
4. Define rollback criteria + comms plan.
5. Coordinate with on-call + support.

## Anti-patterns to avoid

- **Decomposition as wishful thinking.** "3-day estimate" with no break-down is a 2-week-actual.
- **Sequential ticket tree (everyone waits).** Plan parallel paths.
- **Hidden dependencies on other teams.** Surface them in decomposition.
- **No feature flag.** Shippable in chunks but every change goes to all users immediately.
- **PRs > 1000 lines.** Reviewability dies; bugs hide.
- **DoD that's just "code merged."** Forgets tests, docs, telemetry.
- **Ticket = a day of work.** Sometimes tickets are 30 minutes; sometimes 3 days.

## References

- `references/spec-to-ticket-decomposition.md` — patterns for breaking specs into tickets
- `references/branch-strategy-for-features.md` — branching, feature flags, dark-launch
- `references/pr-discipline-and-conventions.md` — PR size, review, definition-of-done

## Related skills

- `product-team/agile-product-owner` — sprint planning, prioritization
- `engineering/feature-flags-architect` — flag strategy
- `engineering/observability-designer` — SLO / telemetry
- `c-level-advisor/vpe-advisor` — broader delivery context
- `project-management/` skills — ticket / sprint management tooling

---

## ui-design-system

Source path: `references/product-team/ui-design-system/SKILL.md`

# UI Design System

Generate design tokens, create color palettes, calculate typography scales, build component systems, and prepare developer handoff documentation.

---

## Table of Contents

- [Trigger Terms](#trigger-terms)
- [Workflows](#workflows)
  - [Workflow 1: Generate Design Tokens](#workflow-1-generate-design-tokens)
  - [Workflow 2: Create Component System](#workflow-2-create-component-system)
  - [Workflow 3: Responsive Design](#workflow-3-responsive-design)
  - [Workflow 4: Developer Handoff](#workflow-4-developer-handoff)
- [Tool Reference](#tool-reference)
- [Quick Reference Tables](#quick-reference-tables)
- [Knowledge Base](#knowledge-base)

---

## Trigger Terms

Use this skill when you need to:

- "generate design tokens"
- "create color palette"
- "build typography scale"
- "calculate spacing system"
- "create design system"
- "generate CSS variables"
- "export SCSS tokens"
- "set up component architecture"
- "document component library"
- "calculate responsive breakpoints"
- "prepare developer handoff"
- "convert brand color to palette"
- "check WCAG contrast"
- "build 8pt grid system"

---

## Clarify First

Before generating the tokens or system, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Brand primary color (hex)** — the seed for the full palette (drives the color scale and WCAG contrast checks)
- [ ] **Style preset** — modern, classic, or playful (sets fonts, border radius, and shadow style)
- [ ] **Output format and framework** — CSS, SCSS, or JSON for Tailwind/styled-components/Figma (drives export and developer handoff)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1: Generate Design Tokens

**Situation:** You have a brand color and need a complete design token system.

**Steps:**

1. **Identify brand color and style**
   - Brand primary color (hex format)
   - Style preference: `modern` | `classic` | `playful`

2. **Generate tokens using script**
   ```bash
   python scripts/design_token_generator.py "#0066CC" modern json
   ```

3. **Review generated categories**
   - Colors: primary, secondary, neutral, semantic, surface
   - Typography: fontFamily, fontSize, fontWeight, lineHeight
   - Spacing: 8pt grid-based scale (0-64)
   - Borders: radius, width
   - Shadows: none through 2xl
   - Animation: duration, easing
   - Breakpoints: xs through 2xl

4. **Export in target format**
   ```bash
   # CSS custom properties
   python scripts/design_token_generator.py "#0066CC" modern css > design-tokens.css

   # SCSS variables
   python scripts/design_token_generator.py "#0066CC" modern scss > _design-tokens.scss

   # JSON for Figma/tooling
   python scripts/design_token_generator.py "#0066CC" modern json > design-tokens.json
   ```

5. **Validate accessibility**
   - Check color contrast meets WCAG AA (4.5:1 normal, 3:1 large text)
   - Verify semantic colors have contrast colors defined

---

### Workflow 2: Create Component System

**Situation:** You need to structure a component library using design tokens.

**Steps:**

1. **Define component hierarchy**
   - Atoms: Button, Input, Icon, Label, Badge
   - Molecules: FormField, SearchBar, Card, ListItem
   - Organisms: Header, Footer, DataTable, Modal
   - Templates: DashboardLayout, AuthLayout

2. **Map tokens to components**

   | Component | Tokens Used |
   |-----------|-------------|
   | Button | colors, sizing, borders, shadows, typography |
   | Input | colors, sizing, borders, spacing |
   | Card | colors, borders, shadows, spacing |
   | Modal | colors, shadows, spacing, z-index, animation |

3. **Define variant patterns**

   Size variants:
   ```
   sm: height 32px, paddingX 12px, fontSize 14px
   md: height 40px, paddingX 16px, fontSize 16px
   lg: height 48px, paddingX 20px, fontSize 18px
   ```

   Color variants:
   ```
   primary: background primary-500, text white
   secondary: background neutral-100, text neutral-900
   ghost: background transparent, text neutral-700
   ```

4. **Document component API**
   - Props interface with types
   - Variant options
   - State handling (hover, active, focus, disabled)
   - Accessibility requirements

5. **Reference:** See `references/component-architecture.md`

---

### Workflow 3: Responsive Design

**Situation:** You need breakpoints, fluid typography, or responsive spacing.

**Steps:**

1. **Define breakpoints**

   | Name | Width | Target |
   |------|-------|--------|
   | xs | 0 | Small phones |
   | sm | 480px | Large phones |
   | md | 640px | Tablets |
   | lg | 768px | Small laptops |
   | xl | 1024px | Desktops |
   | 2xl | 1280px | Large screens |

2. **Calculate fluid typography**

   Formula: `clamp(min, preferred, max)`

   ```css
   /* 16px to 24px between 320px and 1200px viewport */
   font-size: clamp(1rem, 0.5rem + 2vw, 1.5rem);
   ```

   Pre-calculated scales:
   ```css
   --fluid-h1: clamp(2rem, 1rem + 3.6vw, 4rem);
   --fluid-h2: clamp(1.75rem, 1rem + 2.3vw, 3rem);
   --fluid-h3: clamp(1.5rem, 1rem + 1.4vw, 2.25rem);
   --fluid-body: clamp(1rem, 0.95rem + 0.2vw, 1.125rem);
   ```

3. **Set up responsive spacing**

   | Token | Mobile | Tablet | Desktop |
   |-------|--------|--------|---------|
   | --space-md | 12px | 16px | 16px |
   | --space-lg | 16px | 24px | 32px |
   | --space-xl | 24px | 32px | 48px |
   | --space-section | 48px | 80px | 120px |

4. **Reference:** See `references/responsive-calculations.md`

---

### Workflow 4: Developer Handoff

**Situation:** You need to hand off design tokens to development team.

**Steps:**

1. **Export tokens in required formats**
   ```bash
   # For CSS projects
   python scripts/design_token_generator.py "#0066CC" modern css

   # For SCSS projects
   python scripts/design_token_generator.py "#0066CC" modern scss

   # For JavaScript/TypeScript
   python scripts/design_token_generator.py "#0066CC" modern json
   ```

2. **Prepare framework integration**

   **React + CSS Variables:**
   ```tsx
   import './design-tokens.css';

   <button className="btn btn-primary">Click</button>
   ```

   **Tailwind Config:**
   ```javascript
   const tokens = require('./design-tokens.json');

   module.exports = {
     theme: {
       colors: tokens.colors,
       fontFamily: tokens.typography.fontFamily
     }
   };
   ```

   **styled-components:**
   ```typescript
   import tokens from './design-tokens.json';

   const Button = styled.button`
     background: ${tokens.colors.primary['500']};
     padding: ${tokens.spacing['2']} ${tokens.spacing['4']};
   `;
   ```

3. **Sync with Figma**
   - Install Tokens Studio plugin
   - Import design-tokens.json
   - Tokens sync automatically with Figma styles

4. **Handoff checklist**
   - [ ] Token files added to project
   - [ ] Build pipeline configured
   - [ ] Theme/CSS variables imported
   - [ ] Component library aligned
   - [ ] Documentation generated

5. **Reference:** See `references/developer-handoff.md`

---

## Tool Reference

### design_token_generator.py

Generates complete design token system from brand color.

| Argument | Values | Default | Description |
|----------|--------|---------|-------------|
| brand_color | Hex color | #0066CC | Primary brand color |
| style | modern, classic, playful | modern | Design style preset |
| format | json, css, scss, summary | json | Output format |

**Examples:**

```bash
# Generate JSON tokens (default)
python scripts/design_token_generator.py "#0066CC"

# Classic style with CSS output
python scripts/design_token_generator.py "#8B4513" classic css

# Playful style summary view
python scripts/design_token_generator.py "#FF6B6B" playful summary
```

**Output Categories:**

| Category | Description | Key Values |
|----------|-------------|------------|
| colors | Color palettes | primary, secondary, neutral, semantic, surface |
| typography | Font system | fontFamily, fontSize, fontWeight, lineHeight |
| spacing | 8pt grid | 0-64 scale, semantic (xs-3xl) |
| sizing | Component sizes | container, button, input, icon |
| borders | Border values | radius (per style), width |
| shadows | Shadow styles | none through 2xl, inner |
| animation | Motion tokens | duration, easing, keyframes |
| breakpoints | Responsive | xs, sm, md, lg, xl, 2xl |
| z-index | Layer system | base through notification |

---

## Quick Reference Tables

### Color Scale Generation

| Step | Brightness | Saturation | Use Case |
|------|------------|------------|----------|
| 50 | 95% fixed | 30% | Subtle backgrounds |
| 100 | 95% fixed | 38% | Light backgrounds |
| 200 | 95% fixed | 46% | Hover states |
| 300 | 95% fixed | 54% | Borders |
| 400 | 95% fixed | 62% | Disabled states |
| 500 | Original | 70% | Base/default color |
| 600 | Original × 0.8 | 78% | Hover (dark) |
| 700 | Original × 0.6 | 86% | Active states |
| 800 | Original × 0.4 | 94% | Text |
| 900 | Original × 0.2 | 100% | Headings |

### Typography Scale (1.25x Ratio)

| Size | Value | Calculation |
|------|-------|-------------|
| xs | 10px | 16 ÷ 1.25² |
| sm | 13px | 16 ÷ 1.25¹ |
| base | 16px | Base |
| lg | 20px | 16 × 1.25¹ |
| xl | 25px | 16 × 1.25² |
| 2xl | 31px | 16 × 1.25³ |
| 3xl | 39px | 16 × 1.25⁴ |
| 4xl | 49px | 16 × 1.25⁵ |
| 5xl | 61px | 16 × 1.25⁶ |

### WCAG Contrast Requirements

| Level | Normal Text | Large Text |
|-------|-------------|------------|
| AA | 4.5:1 | 3:1 |
| AAA | 7:1 | 4.5:1 |

Large text: ≥18pt regular or ≥14pt bold

### Style Presets

| Aspect | Modern | Classic | Playful |
|--------|--------|---------|---------|
| Font Sans | Inter | Helvetica | Poppins |
| Font Mono | Fira Code | Courier | Source Code Pro |
| Radius Default | 8px | 4px | 16px |
| Shadows | Layered, subtle | Single layer | Soft, pronounced |

---

## Knowledge Base

Detailed reference guides in `references/`:

| File | Content |
|------|---------|
| `token-generation.md` | Color algorithms, HSV space, WCAG contrast, type scales |
| `component-architecture.md` | Atomic design, naming conventions, props patterns |
| `responsive-calculations.md` | Breakpoints, fluid typography, grid systems |
| `developer-handoff.md` | Export formats, framework setup, Figma sync |

---

## Validation Checklist

### Token Generation
- [ ] Brand color provided in hex format
- [ ] Style matches project requirements
- [ ] All token categories generated
- [ ] Semantic colors include contrast values

### Component System
- [ ] All sizes implemented (sm, md, lg)
- [ ] All variants implemented (primary, secondary, ghost)
- [ ] All states working (hover, active, focus, disabled)
- [ ] Uses only design tokens (no hardcoded values)

### Accessibility
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible
- [ ] Touch targets ≥ 44×44px
- [ ] Semantic HTML elements used

### Developer Handoff
- [ ] Tokens exported in required format
- [ ] Framework integration documented
- [ ] Design tool synced
- [ ] Component documentation complete

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Generated colors fail WCAG contrast | Brand color too light or too saturated | Use darker shades (600+) for text on light backgrounds; check with contrast tool |
| Token export has incorrect values | Wrong format argument or color syntax | Ensure hex color is quoted (e.g. `"#0066CC"`); verify format is `json`, `css`, or `scss` |
| Typography scale too large/small | Default 1.25x ratio doesn't fit design | Modify `type_scale_ratio` in DesignTokenGenerator class (1.125 for tighter, 1.333 for looser) |
| SCSS variables conflict with existing | Token naming collision | Prefix all tokens with project namespace (edit export function) |
| Design tools show different colors | Hex rounding in color scale generation | Use JSON export as source of truth; sync with Tokens Studio plugin |
| Spacing values don't align with grid | Custom spacing mixed with 8pt grid | Use only values from the generated spacing system; avoid arbitrary pixel values |
| Shadow tokens look wrong in dark mode | Shadows designed for light backgrounds | Create separate dark-mode shadow tokens with lighter opacity values |

---

## Success Criteria

| Criterion | Target | How to Measure |
|-----------|--------|----------------|
| Token consistency | Zero hardcoded color/spacing values in codebase | Lint rule violations count |
| WCAG AA compliance | All text colors meet 4.5:1 contrast ratio | Automated contrast checker or manual audit |
| Export format coverage | CSS, SCSS, and JSON all generate correctly | Run generator with each format; validate output |
| Design-dev sync | <24h between token update and code deployment | Time from Figma change to production |
| Component token coverage | 100% of components use design tokens | Audit component styles for hardcoded values |
| Typography consistency | All text uses design system type scale | Visual audit across all pages |
| Responsive behavior | Fluid typography works across all breakpoints | Test at xs, sm, md, lg, xl, 2xl widths |

---

## Scope & Limitations

**In scope:**
- Complete design token generation from brand color
- Color palette generation (primary, secondary, neutral, semantic)
- Typography system with modular scale
- 8pt grid-based spacing system
- Component sizing, border, shadow, animation tokens
- Export to CSS custom properties, SCSS variables, and JSON
- Responsive breakpoint definitions
- WCAG contrast reference tables

**Out of scope:**
- Dark mode token generation (requires separate palette mapping)
- Animation/motion design library
- Icon system generation
- Runtime theme switching implementation
- Figma plugin or API integration (use Tokens Studio)
- Visual regression testing
- Design-to-code conversion (use Figma Dev Mode or Locofy)

---

## Integration Points

| Tool / Platform | Integration Method | Use Case |
|-----------------|-------------------|----------|
| Figma / Tokens Studio | Import JSON output as token source | Sync design tool with code tokens |
| Tailwind CSS | JSON tokens as `tailwind.config.js` theme | Configure Tailwind from design system |
| styled-components / Emotion | Import JSON tokens in theme provider | CSS-in-JS theming |
| Style Dictionary | Use JSON output as source tokens | Multi-platform token build (iOS, Android, web) |
| Storybook | Pair tokens with component stories | Document component visual variations |
| CI/CD | Token generation in build pipeline | Automated token updates on brand change |

---

## ux-researcher-designer

Source path: `references/product-team/ux-researcher-designer/SKILL.md`

# UX Researcher & Designer

Generate user personas from research data, create journey maps, plan usability tests, and synthesize research findings into actionable design recommendations.

---

## Table of Contents

- [Trigger Terms](#trigger-terms)
- [Workflows](#workflows)
  - [Workflow 1: Generate User Persona](#workflow-1-generate-user-persona)
  - [Workflow 2: Create Journey Map](#workflow-2-create-journey-map)
  - [Workflow 3: Plan Usability Test](#workflow-3-plan-usability-test)
  - [Workflow 4: Synthesize Research](#workflow-4-synthesize-research)
- [Tool Reference](#tool-reference)
- [Quick Reference Tables](#quick-reference-tables)
- [Knowledge Base](#knowledge-base)

---

## Trigger Terms

Use this skill when you need to:

- "create user persona"
- "generate persona from data"
- "build customer journey map"
- "map user journey"
- "plan usability test"
- "design usability study"
- "analyze user research"
- "synthesize interview findings"
- "identify user pain points"
- "define user archetypes"
- "calculate research sample size"
- "create empathy map"
- "identify user needs"

---

## Clarify First

Before generating the research artifact, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which deliverable** — persona, journey map, usability test plan, or research synthesis (sets which workflow and template applies)
- [ ] **Available data and volume** — analytics/interviews/surveys and how many users (drives persona confidence and proto- vs data-driven persona)
- [ ] **The user goal and scope** — the persona, the goal being mapped, and start/end (drives journey-map stages and research questions)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1: Generate User Persona

**Situation:** You have user data (analytics, surveys, interviews) and need to create a research-backed persona.

**Steps:**

1. **Prepare user data**

   Required format (JSON):
   ```json
   [
     {
       "user_id": "user_1",
       "age": 32,
       "usage_frequency": "daily",
       "features_used": ["dashboard", "reports", "export"],
       "primary_device": "desktop",
       "usage_context": "work",
       "tech_proficiency": 7,
       "pain_points": ["slow loading", "confusing UI"]
     }
   ]
   ```

2. **Run persona generator**
   ```bash
   # Human-readable output
   python scripts/persona_generator.py

   # JSON output for integration
   python scripts/persona_generator.py json
   ```

3. **Review generated components**

   | Component | What to Check |
   |-----------|---------------|
   | Archetype | Does it match the data patterns? |
   | Demographics | Are they derived from actual data? |
   | Goals | Are they specific and actionable? |
   | Frustrations | Do they include frequency counts? |
   | Design implications | Can designers act on these? |

4. **Validate persona**

   - Show to 3-5 real users: "Does this sound like you?"
   - Cross-check with support tickets
   - Verify against analytics data

5. **Reference:** See `references/persona-methodology.md` for validity criteria

### Proto-Persona Canvas (Lightweight Alternative)

When you lack research data but need a hypothesis-driven persona to align the team, use a proto-persona canvas. Proto-personas are assumption tools -- not validated truth -- meant to be tested and refined.

**Use when:** Starting a new initiative with no research budget, aligning a cross-functional team quickly, or creating a testable hypothesis about your user.

**Proto-Persona Canvas Template:**

```markdown
### [Alliterative Name] (e.g., "Careful Carlos")

**Bio & Demographics:**
- Age, geography, social status, career stage
- Online presence, leisure activities, partner status

**Quotes** (what they say, feel, think):
- "[Direct quote capturing their perspective]"
- "[Quote revealing frustration or aspiration]"

**Pains:**
- [Pain related to the problem space]
- [Pain related to current workarounds]

**What They're Trying to Accomplish:**
- [Observable behavior 1]
- [Observable behavior 2]

**Goals** (wants, needs, dreams):
- [Short-term goal]
- [Long-term aspiration]

**Attitudes & Influences:**
- Decision Making Authority: [Can they buy/adopt your solution?]
- Decision Influencers: [Who influences their decisions?]
- Beliefs & Attitudes: [What beliefs impact their choices?]

**Assumptions to Validate:**
- [Top assumption that must be true for this persona to be viable]
- [Second assumption]
- [Third assumption]
```

**Next steps after proto-persona:**
1. Generate interview questions to validate assumptions (Recommended)
2. Generate an anti-persona to define scope boundaries
3. Convert into a one-page stakeholder brief

---

### Workflow 2: Create Journey Map

**Situation:** You need to visualize the end-to-end user experience for a specific goal.

**Steps:**

1. **Define scope**

   | Element | Description |
   |---------|-------------|
   | Persona | Which user type |
   | Goal | What they're trying to achieve |
   | Start | Trigger that begins journey |
   | End | Success criteria |
   | Timeframe | Hours/days/weeks |

2. **Gather journey data**

   Sources:
   - User interviews (ask "walk me through...")
   - Session recordings
   - Analytics (funnel, drop-offs)
   - Support tickets

3. **Map the stages**

   Typical B2B SaaS stages:
   ```
   Awareness → Evaluation → Onboarding → Adoption → Advocacy
   ```

4. **Fill in layers for each stage**

   ```
   Stage: [Name]
   ├── Actions: What does user do?
   ├── Touchpoints: Where do they interact?
   ├── Emotions: How do they feel? (1-5)
   ├── Pain Points: What frustrates them?
   └── Opportunities: Where can we improve?
   ```

5. **Map three experience paths** (not just the happy path)

   | Stage | Happy Path | Fail Path | Difficult Path |
   |---|---|---|---|
   | Awareness | Finds product via search | Never discovers product | Finds competitor first |
   | Consideration | Clear value proposition | Confused by pricing | Needs manager approval |
   | Decision | Easy signup flow | Form errors, abandons | Legal review delays |
   | Delivery & Use | Smooth onboarding | Can't import data | Workaround needed |
   | Loyalty | Becomes advocate | Churns silently | Stays but complains |

   - **Happy Path:** Everything works as designed.
   - **Fail Path:** User cannot complete their goal and drops off.
   - **Difficult Path:** User completes the goal but with friction, workarounds, or frustration.

6. **Add KPIs and ownership per stage**

   | Stage | Leading KPI | Lagging KPI | Team Owner |
   |---|---|---|---|
   | Awareness | Site visits, ad impressions | Brand recall | Marketing |
   | Consideration | Demo requests, pricing page views | MQL conversion | Marketing/Sales |
   | Decision | Trial starts, contract sent | Close rate | Sales |
   | Use | Feature adoption, DAU | Retention rate | Product |
   | Loyalty | NPS, referral count | LTV, expansion revenue | Customer Success |

7. **Identify top friction points and interventions**

   For each friction point, document:

   | Friction Point | Why It Matters | Intervention | Expected Impact | Effort | Confidence |
   |---|---|---|---|---|---|
   | [Description] | [User/business impact] | [Proposed fix] | High/Med/Low | S/M/L | High/Med/Low |

   Priority Score = Frequency x Severity x Solvability

8. **Reference:** See `references/journey-mapping-guide.md` for templates

---

### Workflow 3: Plan Usability Test

**Situation:** You need to validate a design with real users.

**Steps:**

1. **Define research questions**

   Transform vague goals into testable questions:

   | Vague | Testable |
   |-------|----------|
   | "Is it easy to use?" | "Can users complete checkout in <3 min?" |
   | "Do users like it?" | "Will users choose Design A or B?" |
   | "Does it make sense?" | "Can users find settings without hints?" |

2. **Select method**

   | Method | Participants | Duration | Best For |
   |--------|--------------|----------|----------|
   | Moderated remote | 5-8 | 45-60 min | Deep insights |
   | Unmoderated remote | 10-20 | 15-20 min | Quick validation |
   | Guerrilla | 3-5 | 5-10 min | Rapid feedback |

3. **Design tasks**

   Good task format:
   ```
   SCENARIO: "Imagine you're planning a trip to Paris..."
   GOAL: "Book a hotel for 3 nights in your budget."
   SUCCESS: "You see the confirmation page."
   ```

   Task progression: Warm-up → Core → Secondary → Edge case → Free exploration

4. **Define success metrics**

   | Metric | Target |
   |--------|--------|
   | Completion rate | >80% |
   | Time on task | <2× expected |
   | Error rate | <15% |
   | Satisfaction | >4/5 |

5. **Prepare moderator guide**

   - Think-aloud instructions
   - Non-leading prompts
   - Post-task questions

6. **Reference:** See `references/usability-testing-frameworks.md` for full guide

---

### Workflow 4: Synthesize Research

**Situation:** You have raw research data (interviews, surveys, observations) and need actionable insights.

**Steps:**

1. **Code the data**

   Tag each data point:
   - `[GOAL]` - What they want to achieve
   - `[PAIN]` - What frustrates them
   - `[BEHAVIOR]` - What they actually do
   - `[CONTEXT]` - When/where they use product
   - `[QUOTE]` - Direct user words

2. **Cluster similar patterns**

   ```
   User A: Uses daily, advanced features, shortcuts
   User B: Uses daily, complex workflows, automation
   User C: Uses weekly, basic needs, occasional

   Cluster 1: A, B (Power Users)
   Cluster 2: C (Casual User)
   ```

3. **Calculate segment sizes**

   | Cluster | Users | % | Viability |
   |---------|-------|---|-----------|
   | Power Users | 18 | 36% | Primary persona |
   | Business Users | 15 | 30% | Primary persona |
   | Casual Users | 12 | 24% | Secondary persona |

4. **Extract key findings**

   For each theme:
   - Finding statement
   - Supporting evidence (quotes, data)
   - Frequency (X/Y participants)
   - Business impact
   - Recommendation

5. **Prioritize opportunities**

   | Factor | Score 1-5 |
   |--------|-----------|
   | Frequency | How often does this occur? |
   | Severity | How much does it hurt? |
   | Breadth | How many users affected? |
   | Solvability | Can we fix this? |

6. **Reference:** See `references/persona-methodology.md` for analysis framework

---

## Tool Reference

### persona_generator.py

Generates data-driven personas from user research data.

| Argument | Values | Default | Description |
|----------|--------|---------|-------------|
| format | (none), json | (none) | Output format |

**Sample Output:**

```
============================================================
PERSONA: Alex the Power User
============================================================

📝 A daily user who primarily uses the product for work purposes

Archetype: Power User
Quote: "I need tools that can keep up with my workflow"

👤 Demographics:
  • Age Range: 25-34
  • Location Type: Urban
  • Tech Proficiency: Advanced

🎯 Goals & Needs:
  • Complete tasks efficiently
  • Automate workflows
  • Access advanced features

😤 Frustrations:
  • Slow loading times (14/20 users)
  • No keyboard shortcuts
  • Limited API access

💡 Design Implications:
  → Optimize for speed and efficiency
  → Provide keyboard shortcuts and power features
  → Expose API and automation capabilities

📈 Data: Based on 45 users
    Confidence: High
```

**Archetypes Generated:**

| Archetype | Signals | Design Focus |
|-----------|---------|--------------|
| power_user | Daily use, 10+ features | Efficiency, customization |
| casual_user | Weekly use, 3-5 features | Simplicity, guidance |
| business_user | Work context, team use | Collaboration, reporting |
| mobile_first | Mobile primary | Touch, offline, speed |

**Output Components:**

| Component | Description |
|-----------|-------------|
| demographics | Age range, location, occupation, tech level |
| psychographics | Motivations, values, attitudes, lifestyle |
| behaviors | Usage patterns, feature preferences |
| needs_and_goals | Primary, secondary, functional, emotional |
| frustrations | Pain points with evidence |
| scenarios | Contextual usage stories |
| design_implications | Actionable recommendations |
| data_points | Sample size, confidence level |

---

## Quick Reference Tables

### Research Method Selection

| Question Type | Best Method | Sample Size |
|---------------|-------------|-------------|
| "What do users do?" | Analytics, observation | 100+ events |
| "Why do they do it?" | Interviews | 8-15 users |
| "How well can they do it?" | Usability test | 5-8 users |
| "What do they prefer?" | Survey, A/B test | 50+ users |
| "What do they feel?" | Diary study, interviews | 10-15 users |

### Persona Confidence Levels

| Sample Size | Confidence | Use Case |
|-------------|------------|----------|
| 5-10 users | Low | Exploratory |
| 11-30 users | Medium | Directional |
| 31+ users | High | Production |

### Usability Issue Severity

| Severity | Definition | Action |
|----------|------------|--------|
| 4 - Critical | Prevents task completion | Fix immediately |
| 3 - Major | Significant difficulty | Fix before release |
| 2 - Minor | Causes hesitation | Fix when possible |
| 1 - Cosmetic | Noticed but not problematic | Low priority |

### Interview Question Types

| Type | Example | Use For |
|------|---------|---------|
| Context | "Walk me through your typical day" | Understanding environment |
| Behavior | "Show me how you do X" | Observing actual actions |
| Goals | "What are you trying to achieve?" | Uncovering motivations |
| Pain | "What's the hardest part?" | Identifying frustrations |
| Reflection | "What would you change?" | Generating ideas |

---

## Knowledge Base

Detailed reference guides in `references/`:

| File | Content |
|------|---------|
| `persona-methodology.md` | Validity criteria, data collection, analysis framework |
| `journey-mapping-guide.md` | Mapping process, templates, opportunity identification |
| `example-personas.md` | 3 complete persona examples with data |
| `usability-testing-frameworks.md` | Test planning, task design, analysis |

---

## Validation Checklist

### Persona Quality
- [ ] Based on 20+ users (minimum)
- [ ] At least 2 data sources (quant + qual)
- [ ] Specific, actionable goals
- [ ] Frustrations include frequency counts
- [ ] Design implications are specific
- [ ] Confidence level stated

### Journey Map Quality
- [ ] Scope clearly defined (persona, goal, timeframe)
- [ ] Based on real user data, not assumptions
- [ ] All layers filled (actions, touchpoints, emotions)
- [ ] Pain points identified per stage
- [ ] Opportunities prioritized

### Usability Test Quality
- [ ] Research questions are testable
- [ ] Tasks are realistic scenarios, not instructions
- [ ] 5+ participants per design
- [ ] Success metrics defined
- [ ] Findings include severity ratings

### Research Synthesis Quality
- [ ] Data coded consistently
- [ ] Patterns based on 3+ data points
- [ ] Findings include evidence
- [ ] Recommendations are actionable
- [ ] Priorities justified

---

## Tool Reference

### persona_generator.py

Generates data-driven personas from user research data, classifying users into archetypes with demographics, psychographics, behaviors, goals, frustrations, and design implications.

| Argument | Type | Default | Description |
|----------|------|---------|-------------|
| `format` | positional | (none) | Add `json` for JSON output; omit for human-readable |

**Archetypes supported:** power_user, casual_user, business_user, mobile_first

**Output components:** name, archetype, tagline, quote, demographics, psychographics, behaviors, needs_and_goals, frustrations, scenarios, data_points, design_implications

```bash
python scripts/persona_generator.py           # Human-readable formatted output
python scripts/persona_generator.py json      # JSON for programmatic use
```

**Data input format (customize in script):**
```json
[{
  "user_id": "user_1",
  "age": 32,
  "usage_frequency": "daily",
  "features_used": ["dashboard", "reports", "export"],
  "primary_device": "desktop",
  "usage_context": "work",
  "tech_proficiency": 7,
  "pain_points": ["slow loading", "confusing UI"]
}]
```

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Persona confidence level is "Low" | Fewer than 20 users in sample data | Collect more data points; combine quantitative analytics with qualitative interviews |
| All users classified as same archetype | Insufficient variation in input data | Ensure data includes diverse usage frequencies, devices, and contexts |
| Frustrations are generic (fallback defaults) | Not enough pain_points in user data | Enrich user data with pain_points from interviews and support tickets |
| Design implications too vague | Patterns don't strongly differentiate | Add more behavioral signals (features_used, session duration, task completion) |
| Journey map has flat emotion curve | All stages scored similarly | Re-evaluate with actual user data; conduct contextual interviews per stage |
| Usability test sample too small | Fewer than 5 participants | 5 participants find ~85% of usability issues; recruit to minimum 5 |
| Research synthesis has no clear patterns | Data not coded consistently | Use consistent tagging scheme (GOAL, PAIN, BEHAVIOR, CONTEXT, QUOTE) |

---

## Success Criteria

| Criterion | Target | How to Measure |
|-----------|--------|----------------|
| Persona validity | Validated by 3+ real users ("sounds like me") | Post-creation validation interviews |
| Persona coverage | All key segments represented | Count of personas vs identified user segments |
| Data confidence level | "High" (31+ users) | persona_generator data_points.confidence_level |
| Research cadence | 5-8 interviews per segment per quarter | Count of completed research sessions |
| Insight-to-action rate | >70% of findings result in design changes | Track findings through to implementation |
| Usability issue resolution | All critical/major issues fixed before release | Issue severity tracking |
| Journey map freshness | Updated at least quarterly | Last-updated date on each journey map |

---

## Scope & Limitations

**In scope:**
- Data-driven persona generation from user research
- Archetype classification (power, casual, business, mobile-first)
- User journey mapping frameworks
- Usability test planning and scoring
- Research synthesis and coding methodology
- Interview question frameworks
- Empathy map and opportunity identification

**Out of scope:**
- Automated user interview recording/transcription
- Real-time analytics integration (use analytics platforms)
- Quantitative survey design and distribution (use Typeform/SurveyMonkey)
- Eye tracking or biometric data analysis
- AI-powered sentiment analysis (tool uses heuristic classification)
- Persona illustration or visual asset generation
- Accessibility auditing (see product-designer or design-system-lead skills)

---

## Integration Points

| Tool / Platform | Integration Method | Use Case |
|-----------------|-------------------|----------|
| Dovetail / Condens | Export research data, import persona JSON | Centralize research insights |
| Figma / Miro | Paste persona output as design artifact | Reference personas during design work |
| Notion / Confluence | Human-readable output | Document and share personas with team |
| product-manager-toolkit | Persona pain points inform RICE scoring | Connect user needs to feature prioritization |
| agile-product-owner | Persona data informs user story personas | Write stories grounded in research |
| product-designer | Persona feeds into journey mapping and usability test recruitment | End-to-end design research workflow |
