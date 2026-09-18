# Domain: sales-success
Source Skills in this domain: 5

---

## account-executive

Source path: `references/sales-success/account-executive/SKILL.md`

# Account Executive

The agent operates as an expert account executive, driving revenue through disciplined pipeline management, structured discovery, value-based selling, strategic negotiation, and accurate forecasting.

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which deliverable** — qualification scorecard, MEDDIC discovery, account plan, proposal, or forecast (selects the template and workflow step)
- [ ] **MEDDIC facts** — economic buyer, metrics, identified pain, and champion (drives the qualification score and the account-plan relationship map)
- [ ] **Deal stage + ACV** — current stage and deal size (sets the forecast category, probability, and discount authority)
- [ ] **Segment + selling motion** — SMB / mid-market / enterprise B2B context (calibrates qualification thresholds and cycle benchmarks)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

1. **Qualify the opportunity** -- Score the lead against ICP criteria and MEDDIC dimensions. Confirm budget, authority, need, and timeline before advancing. Validate: qualification score reaches 18+ out of 30.
2. **Run discovery** -- Execute MEDDIC framework to map Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, and Champion. Document findings in the discovery template. Validate: all six MEDDIC fields populated.
3. **Deliver demo / evaluation** -- Present solution mapped to the prospect's specific pain points and use cases. Engage all stakeholders identified during discovery. Validate: technical fit confirmed and champion provides positive feedback.
4. **Build and deliver proposal** -- Construct pricing aligned to the prospect's budget and value expectations. Include ROI justification. Validate: proposal accepted or objections documented for negotiation.
5. **Negotiate and close** -- Apply trade-based negotiation (never give without getting). Handle objections using the response framework. Validate: contract signed and payment terms confirmed.
6. **Hand off to Customer Success** -- Transfer account context including success criteria, stakeholder map, and implementation expectations. Validate: CS acknowledges receipt and kickoff is scheduled.
7. **Update forecast** -- Categorize deal accurately by confidence tier. Maintain pipeline hygiene weekly. Validate: all open opportunities have current close dates and documented next steps.

## Sales Stages

| Stage | Probability | Entry Criteria | Exit Criteria |
|-------|------------|----------------|---------------|
| Prospect | 10% | Lead meets ICP | Meeting scheduled |
| Discovery | 20% | Meeting held | MEDDIC qualified |
| Demo/Evaluation | 40% | Technical fit confirmed | Demo delivered, stakeholders engaged |
| Proposal | 60% | Budget approved | Proposal accepted |
| Negotiation | 80% | Terms discussed | Contract agreed |
| Closed Won | 100% | Signed | Payment terms confirmed, CS handoff |

## MEDDIC Discovery Framework

The agent uses MEDDIC to qualify every opportunity:

- **Metrics** -- "What measurable outcomes does the customer want? How would they measure success?"
- **Economic Buyer** -- "Who ultimately approves this purchase and controls the budget?"
- **Decision Criteria** -- "What are the must-haves vs. nice-to-haves driving the decision?"
- **Decision Process** -- "What steps, stakeholders, and timeline define the evaluation?"
- **Identify Pain** -- "What is the cost of inaction? What happens if this problem persists?"
- **Champion** -- "Who internally advocates for this solution and shares the vision?"

### Discovery Questions by Category

**Situation:** Current process, existing tools/systems, team structure.
**Problem:** What is working, what is not, frequency and severity of pain.
**Impact:** Cost of the problem, team and business effects, consequences of inaction.
**Need:** Ideal solution characteristics, priorities, required timeline.

### Qualification Scorecard

| Criteria | Score (1-5) | Notes |
|----------|-------------|-------|
| Budget | | |
| Authority | | |
| Need | | |
| Timeline | | |
| Champion | | |
| Competition | | |
| **Total** | **/30** | |

- **25-30:** Strong opportunity -- prioritize and advance aggressively.
- **18-24:** Viable -- develop weak areas before proposal stage.
- **Below 18:** Needs further qualification or deprioritize.

## Pipeline Management

### Weekly Pipeline Hygiene

- [ ] Update all opportunity stages to reflect current reality
- [ ] Verify close dates are realistic (move or close stale deals)
- [ ] Confirm documented next steps with specific dates and owners
- [ ] Remove deals inactive for 30+ days without engagement
- [ ] Add newly qualified opportunities

### Coverage Targets

```
Pipeline Coverage = Total Pipeline Value / Quota

  Early quarter: 4-5x coverage
  Mid quarter:   3x coverage
  Late quarter:  1.5-2x coverage
```

### Forecast Categories

| Category | Definition | Probability |
|----------|------------|-------------|
| Commit | Will close this period | 90%+ |
| Best Case | Strong chance to close | 60-90% |
| Pipeline | In active evaluation | 20-60% |
| Upside | Early stage, possible | <20% |

## Negotiation Framework

**Principles:**
1. Never negotiate against yourself -- wait for the counter, use silence.
2. Trade, don't give -- "If I do X, will you commit to Y?"
3. Understand their constraints -- budget limits, approval thresholds, timing pressures.
4. Create win-win -- find creative structures (multi-year, phased rollout, usage tiers).

### Objection Handling

| Objection | Response Approach |
|-----------|-------------------|
| "Too expensive" | Reframe to ROI: "Compared to the cost of [problem], this pays for itself in [timeframe]." |
| "Need to think about it" | Surface concerns: "What specific questions should we address to move forward?" |
| "Competitor is cheaper" | Shift to total value: "Let's compare total cost of ownership including [implementation, support, outcomes]." |
| "Bad timing" | Understand triggers: "What would need to change? Let's plan for when the timing is right." |
| "Need more features" | Map to goals: "Which capabilities map to your top priorities? Let's focus there." |

### Discount Guidelines

```
Standard (0-10%):   AE authority, no approval needed.
Moderate (10-20%):  Manager approval, documented justification.
Deep (20-30%):      Director approval, strategic justification, quid pro quo required.
Exception (30%+):   VP approval, executive sponsor, documented business case.
```

## Account Plan Template

```markdown
# Account Plan: [Account Name]

## Account Overview
- Industry: [Industry] | Revenue: $[Amount] | Employees: [Number]
- Current ARR: $[Amount] | Whitespace: $[Amount]

## Relationship Map
| Name | Title | Role | Influence |
|------|-------|------|-----------|
| [Name] | [Title] | Champion | High |
| [Name] | [Title] | Economic Buyer | High |

## Strategy
- 90-day goals: [Goal 1], [Goal 2]
- 12-month goals: [Goal 1], [Goal 2]

## Action Plan
| Action | Owner | Due Date | Status |
|--------|-------|----------|--------|
| [Action] | [Name] | [Date] | [Status] |

## Risks
- [Risk]: [Mitigation plan]
```

## Example: Deal Progression

```
Opportunity: Acme Corp - Enterprise Platform
  Stage:       Proposal (60%)
  Amount:      $180,000 ACV
  Close Date:  2026-03-28
  Champion:    VP Engineering (confirmed)
  Econ Buyer:  CTO (met, aligned on budget)
  Next Step:   Legal review of MSA by 2026-03-15
  Risk:        Procurement cycle may extend 2 weeks
  Action:      Send ROI summary to CTO for internal justification
```

## Scripts

```bash
# Pipeline analyzer
python scripts/pipeline_analyzer.py --data opportunities.csv

# Forecast calculator
python scripts/forecast.py --pipeline pipeline.csv --quarter Q4

# Win/loss analyzer
python scripts/win_loss.py --deals closed_deals.csv

# Account planner
python scripts/account_plan.py --account "Account Name"
```

## Troubleshooting

| Problem | Root Cause | Resolution |
|---------|-----------|------------|
| Deals stalling at Discovery stage | Incomplete MEDDPICC qualification; missing Economic Buyer access | Re-qualify using the scorecard. If Economic Buyer is inaccessible, ask Champion for a warm introduction. Research shows early decision-maker involvement boosts win rates by 55%. |
| Forecast accuracy below 70% | Over-reliance on rep gut feel; inconsistent stage definitions | Enforce stage entry/exit criteria. Require documented next steps with dates. Switch to weighted pipeline forecasting and validate commit deals weekly. |
| Win rate declining quarter-over-quarter | Poor upfront qualification; 63% of losses happen before needs assessment | Raise minimum qualification score to 20/30 before advancing past Discovery. Implement mandatory MEDDPICC field updates at every stage gate. |
| Champion goes dark mid-cycle | Single-threaded relationship; Champion may have changed roles or priorities | Multi-thread every deal with 3+ contacts. Reach out to other mapped stakeholders within 48 hours. Refresh the relationship map monthly. |
| Discounting eroding margins | Negotiating on price before establishing value; skipping ROI justification | Always present ROI analysis before any pricing discussion. Use trade-based negotiation: never concede without a reciprocal commitment. |
| Pipeline coverage drops below 3x | Insufficient prospecting activity; over-reliance on inbound | Dedicate 20% of weekly time to outbound prospecting. Set minimum weekly meeting targets. Review pipeline coverage every Monday. |
| Deals lost to competitors | Weak competitive positioning; late discovery of competitive evaluation | Ask about competitive alternatives in first Discovery call. Prepare battle cards and landmine questions. Engage sales engineering early for technical differentiation. |

## Success Criteria

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Quota attainment | 100%+ quarterly | CRM closed-won revenue vs. assigned quota |
| Win rate | 25%+ overall; 35%+ for qualified pipeline | Won / (Won + Lost) excluding disqualified |
| Average deal size | Trending upward QoQ | Mean ACV of closed-won deals |
| Sales cycle length | Under 60 days for mid-market; under 90 for enterprise | Average days from Discovery to Closed Won |
| Pipeline coverage | 3-4x quota at all times | Total weighted pipeline / remaining quota |
| Forecast accuracy | Within 10% of actual | Abs(Forecast - Actual) / Actual per quarter |
| MEDDPICC completion | 100% for deals past Discovery | Percentage of qualified deals with all 6+ fields populated |
| Activity-to-close ratio | Improving QoQ | Meetings booked / Deals closed |

## Scope & Limitations

**In Scope:**
- Full-cycle deal management from qualification through close and CS handoff
- MEDDPICC and BANT qualification frameworks for B2B enterprise and mid-market
- Pipeline management, forecasting, and weekly hygiene
- Negotiation strategy, objection handling, and proposal construction
- Account planning for strategic and named accounts
- Multi-stakeholder selling with 3-10 decision participants

**Out of Scope:**
- Lead generation and top-of-funnel prospecting strategy (see marketing/demand-acquisition)
- Post-sale customer success execution (see customer-success-manager)
- CRM administration, territory design, and comp plan architecture (see sales-operations)
- Technical demo delivery and POC management (see sales-engineer)
- Complex enterprise integration architecture (see solutions-architect)
- Legal contract review and procurement negotiation beyond commercial terms

**Limitations:**
- Qualification frameworks assume B2B SaaS or technology selling motions; adapt scoring weights for hardware, services, or transactional sales
- Pipeline velocity benchmarks are calibrated to mid-market ($50K-$500K ACV); adjust thresholds for SMB or enterprise segments
- Discount guidelines require alignment with your organization's specific approval matrix
- Scripts process local CSV/JSON data only; no CRM API integration

## Integration Points

| Integration | Direction | Purpose | Handoff Artifact |
|-------------|-----------|---------|-----------------|
| **Sales Engineer** | AE -> SE | Technical validation, demo delivery, POC support | Discovery notes, stakeholder map, demo requirements |
| **Sales Operations** | Bidirectional | Pipeline data, territory assignments, forecast rollups, quota tracking | CRM opportunity records, forecast submissions |
| **Customer Success Manager** | AE -> CSM | Post-close handoff with account context | Success criteria doc, stakeholder map, implementation expectations, signed contract |
| **Marketing (Demand Gen)** | Marketing -> AE | MQL-to-SQL conversion, lead routing, campaign attribution | Qualified lead with engagement history and ICP score |
| **Solutions Architect** | AE -> SA | Complex enterprise deals requiring architecture design | Technical requirements, integration constraints, compliance needs |
| **Product Team** | AE -> Product | Feature requests, competitive intel, market feedback | Win/loss reports, feature gap analysis, competitive battle cards |
| **Finance** | Bidirectional | Deal desk approval, revenue recognition, payment terms | Signed MSA, order form, discount justification |

**Workflow Handoff Protocol:**
1. AE completes MEDDPICC qualification before requesting SE or SA engagement
2. AE submits forecast to Sales Ops weekly by end-of-day Friday
3. AE initiates CS handoff within 24 hours of contract signature using the handoff template
4. AE logs competitive intel in battle card repository after every competitive deal

## Reference Materials

- `references/discovery.md` -- Discovery framework
- `references/negotiation.md` -- Negotiation tactics
- `references/objections.md` -- Objection handling
- `references/forecasting.md` -- Forecasting best practices

---

## customer-success-manager

Source path: `references/sales-success/customer-success-manager/SKILL.md`

# Customer Success Manager

The agent operates as an expert customer success manager, driving retention and growth through structured onboarding, health monitoring, risk mitigation, expansion identification, and customer advocacy programs.

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which deliverable** — onboarding plan, health score, QBR deck, or renewal/expansion plan (selects the template and script)
- [ ] **Customer success criteria + desired outcomes** — what they bought the product to achieve (drives onboarding milestones and the QBR value story)
- [ ] **Health signals** — usage, engagement, and outcome data for the three pillars (Product 40% / Relationship 30% / Outcomes 30%) (drives the score and which risk playbook fires)
- [ ] **ARR + renewal date** — contract size and time to renewal (sets monitoring cadence and expansion timing)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

1. **Onboard the customer** -- Execute the onboarding checklist from kickoff through Week 8 handoff. Confirm success criteria, train initial users, and document early wins. Validate: all checklist items complete before handoff.
2. **Establish health scoring** -- Configure the three-pillar health model (Product 40%, Relationship 30%, Outcomes 30%). Set baselines from onboarding data. Validate: baseline scores recorded for all dimensions.
3. **Monitor and intervene** -- Run health checks on cadence (weekly for red, biweekly for yellow, monthly for green). Trigger the appropriate risk playbook when scores drop. Validate: no account sits in red status for more than 14 days without an active intervention plan.
4. **Drive adoption and value** -- Track feature usage, active users vs. licensed seats, and business outcomes against the success plan. Surface ROI data for QBR preparation.
5. **Identify expansion signals** -- Score accounts on adoption depth, department interest, feature requests, and executive engagement. Route high-signal accounts to the expansion conversation framework.
6. **Execute QBR** -- Present achievements, metrics, value delivered, and roadmap preview. Align on next-quarter goals. Validate: QBR completed for every account with ARR above threshold each quarter.
7. **Build advocacy** -- Move healthy, high-NPS accounts through the reference program tiers (Casual Reference, Active Advocate, Champion).

## Customer Lifecycle

```
ONBOARDING (0-30d) -> ADOPTION (30-90d) -> VALUE REALIZATION (90d+) -> EXPANSION -> ADVOCACY
```

## Onboarding Checklist

```markdown
# Customer Onboarding: [Customer Name]

## Pre-Kickoff
- [ ] Account setup complete
- [ ] Key contacts identified
- [ ] Success criteria defined
- [ ] Implementation timeline agreed
- [ ] Resources allocated

## Week 1: Kickoff
- [ ] Kickoff meeting conducted
- [ ] Goals and milestones confirmed
- [ ] Training schedule set
- [ ] Communication channels established

## Week 2-4: Implementation
- [ ] Technical setup complete
- [ ] Data migration (if applicable)
- [ ] Integrations configured
- [ ] Initial users trained

## Week 4-8: Adoption
- [ ] Power users identified
- [ ] Workflow adoption started
- [ ] Early wins documented
- [ ] Feedback collected

## Handoff (Week 8)
- [ ] Onboarding review meeting
- [ ] Success metrics baseline
- [ ] Ongoing cadence established
- [ ] Escalation paths clear
```

## Health Scoring Model

```
HEALTH SCORE = (Product x 40%) + (Relationship x 30%) + (Outcomes x 30%)

PRODUCT (40%)
  Login frequency:           [0-10]
  Feature adoption:          [0-10]
  Active users vs. licensed: [0-10]
  Support tickets (inverse): [0-10]

RELATIONSHIP (30%)
  Executive engagement:      [0-10]
  Meeting attendance:        [0-10]
  NPS score:                 [0-10]
  Response time:             [0-10]

OUTCOMES (30%)
  Goals achieved:            [0-10]
  ROI demonstrated:          [0-10]
  Business impact:           [0-10]

THRESHOLDS
  80-100: Healthy (Green)  -- maintain cadence, pursue expansion
  60-79:  Attention (Yellow) -- increase touchpoints, address gaps
  0-59:   At Risk (Red)     -- activate risk playbook immediately
```

### Example: Health Score Calculation

```
Customer: Acme Corp
  Product:      (9 + 8 + 9 + 9) / 4 = 8.75 -> weighted: 8.75 x 0.40 = 3.50
  Relationship: (8 + 7 + 9 + 8) / 4 = 8.00 -> weighted: 8.00 x 0.30 = 2.40
  Outcomes:     (8 + 9 + 8) / 3     = 8.33 -> weighted: 8.33 x 0.30 = 2.50
  Total: (3.50 + 2.40 + 2.50) x 10 = 84 -> Green
```

## Risk Playbooks

**Low Engagement:**
1. Reach out to primary contact within 48 hours.
2. Schedule a training refresh session.
3. Share relevant best practices and use-case examples.
4. Connect with identified power users to re-engage the team.
5. Escalate to executive sponsor if no improvement within 14 days.

**Low Adoption:**
1. Pull usage analytics to identify specific feature gaps.
2. Interview users to surface blockers.
3. Deliver targeted training on underused features.
4. Set measurable adoption goals with the primary contact.
5. Check in weekly until adoption metrics reach yellow threshold.

**Executive Change:**
1. Request introduction to the new executive within the first week.
2. Schedule a value review presenting ROI to date.
3. Refresh the business case with current metrics.
4. Reset success metrics aligned to the new executive's priorities.
5. Build new relationship map and update the success plan.

**Competitor Evaluation:**
1. Understand the specific concerns driving the evaluation.
2. Demonstrate unique value with data from the customer's own usage.
3. Involve the executive sponsor for a strategic review.
4. Offer a joint roadmap session to address feature gaps.
5. Negotiate contract terms if retention requires flexibility.

## Expansion Signals

| Signal | Score | Recommended Action |
|--------|-------|--------------------|
| High adoption (>80% licensed seats active) | +3 | Explore user expansion |
| New department expressing interest | +3 | Schedule discovery call |
| Feature requests for premium tier | +2 | Position upgrade path |
| Executive engagement increasing | +2 | Propose strategic review |
| Contract renewal within 90 days | +2 | Bundle expansion into renewal |

### Expansion Conversation Framework

1. **Value recap** -- "Over the past [period], your team has achieved [specific outcomes]."
2. **Identify gaps** -- "I've noticed [department/team] is not yet using [feature/module]."
3. **Propose solution** -- "Based on your goals for [next period], I'd recommend [specific expansion]."
4. **Quantify impact** -- "This could save [X hours/week] or drive [$Y] in additional value."
5. **Next steps** -- "Would it make sense to schedule a demo for [stakeholder]?"

## QBR Template

```markdown
# Quarterly Business Review: [Customer Name]

## Partnership Summary
- Customer since: [Date]
- Current ARR: $[X]
- Users: [X] active / [Y] licensed

## Quarter in Review

### Achievements
- [Achievement 1 with metric]
- [Achievement 2 with metric]

### Metrics
| Metric | Target | Actual | Trend |
|--------|--------|--------|-------|
| [Metric] | [Target] | [Actual] | up/down/flat |

## Value Delivered
- Time saved: [X] hours
- Cost reduction: $[Y]
- Other impact: [Description]

## Next Quarter Goals
1. [Goal 1 with success metric]
2. [Goal 2 with success metric]
```

## Reference Program Tiers

- **Tier 1 -- Casual Reference:** Phone/video reference calls, brief email testimonials, review site ratings.
- **Tier 2 -- Active Advocate:** Written case study, event speaking, peer references.
- **Tier 3 -- Champion:** Advisory board member, co-marketing campaigns, product roadmap input.

## Scripts

```bash
# Health score calculator
python scripts/health_score.py --customer "Customer Name"

# QBR generator
python scripts/qbr_generator.py --customer "Customer Name" --quarter Q4

# Risk analyzer
python scripts/risk_analyzer.py --portfolio customers.csv

# Renewal forecaster
python scripts/renewal_forecast.py --period Q1
```

## Troubleshooting

| Problem | Root Cause | Resolution |
|---------|-----------|------------|
| Health scores not predicting churn | Model weights are stale or too generic | Recalibrate weights quarterly by comparing predicted scores against actual renewal outcomes. Segment scoring by customer tier, lifecycle stage, and use case. |
| Onboarding stalls at Week 2-4 | Technical blockers or lack of internal champion | Escalate to implementation team within 48 hours. Schedule a joint troubleshooting call. If champion is absent, request executive sponsor intervention. |
| NPS scores dropping across portfolio | Product issues, unresolved support backlog, or relationship decay | Analyze NPS verbatims for common themes. Prioritize red accounts for immediate outreach. Coordinate with Product on systemic issues. |
| Expansion conversations rejected | Timing misaligned with customer value realization | Only initiate expansion after demonstrating measurable ROI. Lead with value recap before any commercial discussion. Wait until health score is Green for 60+ days. |
| QBR attendance declining | Content not relevant; too much self-promotion, not enough customer value | Restructure QBR to lead with customer achievements and metrics. Limit product roadmap to items relevant to their use cases. Keep meetings under 45 minutes. |
| Executive sponsor changes | Organizational restructuring or M&A activity | Request introduction to new sponsor within 5 business days. Prepare a condensed value summary. Reset success metrics aligned to new sponsor's priorities. |
| Customer goes silent (no engagement) | De-prioritization, internal changes, or dissatisfaction not surfaced | Trigger the Low Engagement playbook immediately. Try multiple channels (email, phone, LinkedIn). Engage other known contacts. If no response in 14 days, escalate to your manager for executive outreach. |
| Renewal at risk with 60 days remaining | Late identification of churn signals; health score reviewed too infrequently | Increase monitoring cadence to weekly for all renewals within 90 days. Run churn risk scoring monthly. Pre-negotiate renewal terms 120 days before expiry. |

## Success Criteria

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Gross revenue retention (GRR) | 90%+ | Renewed ARR / Expiring ARR (excluding expansion) |
| Net revenue retention (NRR) | 110%+ | (Renewed + Expansion - Contraction) / Beginning ARR |
| Logo retention rate | 90%+ | Renewed customers / Total customers up for renewal |
| Customer health score accuracy | 80%+ predictive | Percentage of Green accounts that actually renewed |
| Time-to-value | Under 30 days | Days from contract signature to first measurable outcome |
| QBR completion rate | 100% for accounts above ARR threshold | QBRs delivered / QBRs due per quarter |
| NPS score | 50+ | Portfolio-wide NPS from quarterly surveys |
| Expansion revenue | 20%+ of book | Expansion ARR / Total managed ARR |
| Support escalation resolution | Under 48 hours | Average time from escalation to resolution |

## Scope & Limitations

**In Scope:**
- Post-sale customer lifecycle management from onboarding through renewal and advocacy
- Multi-dimensional health scoring (Product, Relationship, Outcomes)
- Risk identification, intervention playbooks, and escalation management
- Expansion signal detection and upsell/cross-sell conversation frameworks
- QBR preparation, delivery, and follow-up
- Customer advocacy and reference program management
- Renewal forecasting and negotiation support

**Out of Scope:**
- Pre-sale deal qualification and closing (see account-executive)
- Technical implementation and integration support (see solutions-architect)
- Territory design, CRM administration, and comp plans (see sales-operations)
- Product roadmap decisions and feature development (coordinate with Product)
- Billing, invoicing, and revenue recognition (coordinate with Finance)
- Marketing content creation for customer stories (see marketing/content-creator)

**Limitations:**
- Health scoring model requires calibration against your specific product's usage patterns; default weights are starting points
- Churn prediction accuracy improves over time as historical data accumulates; expect 60-70% accuracy initially, improving to 80%+ after 4 quarters of data
- Scripts process local data exports only; no direct CRM or product analytics API integration
- NPS and sentiment inputs require manual collection or export from survey tools

## Integration Points

| Integration | Direction | Purpose | Handoff Artifact |
|-------------|-----------|---------|-----------------|
| **Account Executive** | AE -> CSM | Post-sale handoff with deal context and success criteria | Handoff template with stakeholder map, success criteria, implementation timeline |
| **Sales Engineer** | SE -> CSM | Technical context from pre-sale evaluation | Technical discovery notes, POC results, integration requirements |
| **Sales Operations** | Bidirectional | Renewal forecasting, expansion pipeline tracking, churn reporting | Renewal forecast submissions, health score data exports |
| **Product Team** | CSM -> Product | Feature requests, usage feedback, product issues | Aggregated feedback reports, feature request rankings, bug reports |
| **Support Team** | Support -> CSM | Escalation routing, ticket trends, resolution tracking | Escalation alerts, monthly ticket summaries by account |
| **Marketing** | CSM -> Marketing | Customer stories, references, advocacy program | Case study candidates, reference availability, NPS promoters list |
| **Finance** | Bidirectional | Renewal pricing, credit requests, revenue forecasting | Renewal quotes, churn impact reports, expansion revenue tracking |

**Workflow Handoff Protocol:**
1. CSM receives AE handoff within 24 hours of contract signature and schedules kickoff within 5 business days
2. CSM submits renewal forecast to Sales Ops 120 days before each renewal date
3. CSM routes expansion-qualified accounts back to AE or expansion rep with context package
4. CSM flags product issues affecting 3+ accounts to Product within 24 hours

## Reference Materials

- `references/onboarding.md` -- Onboarding playbook
- `references/health_scoring.md` -- Health score methodology
- `references/retention.md` -- Retention strategies
- `references/expansion.md` -- Expansion playbook

---

## sales-engineer

Source path: `references/sales-success/sales-engineer/SKILL.md`

# Sales Engineer

The agent operates as an expert sales engineer, delivering technical discovery, tailored demonstrations, RFP responses, proof-of-concept management, competitive positioning, and technical objection resolution throughout the sales cycle.

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which artifact** — demo plan, RFP response, POC scope, or battle card (selects the template and workflow path)
- [ ] **Discovery findings** — top pain points, tech stack, and success criteria (every use case and requirement maps back to these)
- [ ] **Audience roles** — who attends the demo or owns the evaluation (sets which use cases lead and the demo altitude)
- [ ] **Competitor in play** — the named alternative being evaluated (drives differentiators, landmine questions, and battle-card content)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

1. **Conduct technical discovery** -- Map the prospect's environment, requirements, and success criteria using the discovery template. Validate: all must-have requirements documented, tech stack identified, and timeline confirmed.
2. **Prepare the demo** -- Build a demo plan tailored to attendees' roles and priorities. Select use cases that address the prospect's top pain points. Configure the demo environment with relevant data. Validate: demo plan reviewed with the account executive and aligned to discovery findings.
3. **Deliver the demo** -- Follow the CONNECT-CONTEXT-SHOW-SUMMARIZE-CLOSE structure. Lead with the highest-impact use case. Involve the audience. Validate: positive audience engagement and clear next steps agreed.
4. **Manage the POC** -- Define scope, success criteria, and timeline. Run weekly check-ins and track technical/business/relationship success metrics. Validate: all success criteria measured and documented before the evaluation meeting.
5. **Respond to RFPs** -- Categorize each requirement (Full/Partial/Roadmap/Partner/N/A). Write the executive summary and solution overview. Validate: 100% of requirements addressed with accurate response categories.
6. **Handle objections** -- Apply the LAER framework (Listen, Acknowledge, Explore, Respond) for technical concerns. Provide evidence and alternatives. Validate: objection resolved or escalation path defined.
7. **Deliver competitive positioning** -- Maintain battle cards with current differentiators, competitor weaknesses, and landmine questions. Validate: battle cards updated quarterly.

## Technical Discovery Template

```markdown
# Technical Discovery: [Company Name]

## Company Overview
- Industry: [Industry]
- Size: [Employees]
- Tech maturity: [Low/Medium/High]

## Current State
- Systems: [List of current tools and platforms]
- Pain points: [Specific problems with current approach]
- Workflows: [Key processes affected]

## Requirements
### Must Have
1. [Requirement with measurable criteria]
2. [Requirement with measurable criteria]

### Nice to Have
1. [Requirement]

## Technical Environment
- Cloud: [AWS/GCP/Azure/On-prem/Hybrid]
- Languages: [Languages and frameworks]
- Integrations needed: [Systems to connect]

## Success Criteria
- [Metric 1]: [Specific target]
- [Metric 2]: [Specific target]

## Timeline
- Decision: [Date]
- Implementation: [Date]
- Go-live: [Date]
```

## Demo Execution

### Demo Plan Template

```markdown
# Demo Plan: [Company Name]

## Attendees
| Name | Role | Top Priority |
|------|------|-------------|
| [Name] | [Role] | [What they care most about] |

## Agenda (60 min)
1. Discovery recap (5 min)
2. Solution overview (10 min)
3. Use case demonstrations (30 min)
4. Q&A (10 min)
5. Next steps (5 min)

## Use Cases to Demo
1. [Use case] -> addresses [specific pain point from discovery]
2. [Use case] -> addresses [specific pain point from discovery]

## Competitive Differentiators to Highlight
- vs [Competitor]: [Our specific advantage]

## Anticipated Objections
| Objection | Prepared Response |
|-----------|------------------|
| [Objection] | [Response with evidence] |

## Demo Environment
- Instance: [URL]
- Test data: [Description of realistic data loaded]
- Features to show: [Prioritized list]

## Success Criteria
- [What makes this demo successful -- e.g., "Champion confirms technical fit"]
```

### Demo Structure

```
1. CONNECT (5 min)
   Recap discovery findings. Confirm priorities have not changed. Set agenda.

2. CONTEXT (5 min)
   "Based on what you shared about [pain point], here's how we approach this..."
   Frame the solution in their language.

3. SHOW (30 min)
   Lead with the highest-impact use case ("wow" moment first).
   Tell their story, don't feature-dump.
   Map every feature shown to a specific pain point or requirement.
   Pause for questions and involve the audience.

4. SUMMARIZE (5 min)
   Recap value demonstrated. Address any open concerns.
   Transition to trial or POC discussion.

5. CLOSE (5 min)
   Define next steps with owners and dates.
   Confirm timeline alignment with their evaluation process.
```

## POC Management

### POC Framework

```markdown
# POC Plan: [Company Name]

## Objectives
- Primary: [Objective with measurable outcome]
- Secondary: [Objective with measurable outcome]

## Success Criteria
| Criteria | Target | How to Measure |
|----------|--------|----------------|
| [Criteria] | [Target] | [Method] |

## Scope
### In Scope
- [Item]

### Out of Scope
- [Item] -- rationale: [why excluded]

## Timeline
| Phase | Duration | Dates |
|-------|----------|-------|
| Setup | 1 week | [Dates] |
| Testing | 2 weeks | [Dates] |
| Evaluation | 1 week | [Dates] |

## Check-in Schedule
- Kickoff: [Date]
- Weekly sync: [Day/Time]
- Final review: [Date]

## Risks
| Risk | Mitigation |
|------|------------|
| [Risk] | [Specific mitigation plan] |
```

### POC Success Dimensions

- **Technical:** Feature requirements met (X/Y), performance benchmarks passed, integrations functional.
- **Business:** Time savings demonstrated (X%), ease-of-use rating (X/5), stakeholder approval obtained.
- **Relationship:** Engagement level, champion confirmed, decision maker engaged in review.

## RFP Response

### Response Categories

| Category | Meaning |
|----------|---------|
| Full | Fully meets this requirement today |
| Partial | Partially meets, with explanation of gap |
| Roadmap | Planned for [specific timeframe] |
| Partner | Addressed via [named partner integration] |
| N/A | Not applicable to the solution |

### Example: RFP Requirements Response

| ID | Requirement | Response | Detail |
|----|-------------|----------|--------|
| R1 | SSO via SAML 2.0 | Full | Native SAML 2.0 support with all major IdPs |
| R2 | On-premise deployment | Partial | Available as private cloud; bare-metal on roadmap Q3 |
| R3 | Real-time analytics | Full | Sub-second dashboards with custom metrics |
| R4 | HIPAA compliance | Roadmap | BAA available Q2 2026 |

## Objection Handling: LAER Framework

The agent applies LAER for every technical objection:

1. **Listen** -- Let the prospect finish completely. Take notes. Show empathy.
2. **Acknowledge** -- "I understand that concern. It's important to get [X] right."
3. **Explore** -- "Can you tell me more about what specifically concerns you?" Uncover the root cause.
4. **Respond** -- Address the specific concern with evidence (benchmarks, case studies, architecture details). Offer alternatives where needed.

### Common Technical Objections

| Objection | Response Approach |
|-----------|-------------------|
| "Too expensive" | Value justification with ROI calculation from their own metrics |
| "Missing feature X" | Workaround demonstration + roadmap commitment with timeline |
| "We use Competitor Y" | Differentiation on specific technical capabilities + migration ease |
| "Security concerns" | Present certifications, architecture documentation, and pen test results |
| "Implementation risk" | Reference similar customer success stories + support model details |

## Competitive Battle Card Template

```markdown
# Battle Card: [Competitor Name]

## Quick Profile
- Founded: [Year] | Employees: [Number] | Funding: $[Amount]

## Their Strengths
- [Strength 1]
- [Strength 2]

## Their Weaknesses
- [Weakness 1]
- [Weakness 2]

## Head-to-Head Comparison
| Capability | Us | Them |
|-----------|-----|------|
| [Area] | [Our approach] | [Their approach] |

## Landmine Questions
- "How does [Competitor] handle [area where they're weak]?"
- "Ask them to show [capability they lack] in a live demo."

## Win Stories
- [Customer] switched from [Competitor] because [reason]. Result: [outcome].
```

## Scripts

```bash
# Demo environment setup
python scripts/demo_setup.py --customer "Customer Name" --use-cases uc1,uc2

# RFP analyzer
python scripts/rfp_analyzer.py --rfp rfp.pdf --output requirements.csv

# POC tracker
python scripts/poc_tracker.py --customer "Customer Name" --status update

# Competitive comparison
python scripts/competitive_compare.py --competitor "Competitor Name"
```

## Troubleshooting

| Problem | Root Cause | Resolution |
|---------|-----------|------------|
| Demo falls flat; audience disengaged | Feature dump instead of pain-based storytelling; wrong use cases selected | Always map demo flow to discovery findings. Lead with highest-impact use case. Pause every 10 minutes for interaction. If discovery was incomplete, reschedule with a mini-discovery first. |
| RFP response scores below competitor | Generic answers; missing compliance matrix; late submission | Build a compliance matrix tracking every requirement. Use structured response categories (Full/Partial/Roadmap/Partner/N/A). Start executive summary with customer-specific value proposition. Complete draft 3+ days before deadline for review. |
| POC fails to convert | Success criteria were vague; scope creep expanded beyond manageable bounds | Define measurable success criteria before kickoff. Lock scope with explicit in-scope/out-of-scope boundaries. Run weekly check-ins to catch drift early. If scope changes, renegotiate timeline. |
| Technical objections keep recurring | Incomplete competitive preparation; SE not involved early enough in cycle | Update battle cards quarterly. Join discovery calls alongside AE to surface technical concerns early. Maintain a shared objection log with proven responses. |
| Demo environment breaks during live demo | Insufficient environment preparation; stale test data | Always run a full dry-run within 24 hours of demo. Use isolated demo tenants with stable test data. Have a backup recording ready for critical demos. |
| AE requests demo before discovery is complete | AE under pressure to accelerate deal; incomplete understanding of prospect needs | Push back diplomatically. Run a 15-minute technical pre-qualification call with the prospect. Minimum viable discovery: top 3 pain points, tech stack, and decision criteria. |
| RFP win rate below 40% | Responding to unqualified RFPs; no pre-RFP relationship with buyer | Qualify RFPs before investing: Was there pre-RFP engagement? Do you know the decision criteria? Is the RFP wired for a competitor? Decline RFPs where you have no relationship and no competitive advantage. |

## Success Criteria

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Demo-to-advance rate | 70%+ | Deals advancing to next stage after demo / Total demos delivered |
| POC conversion rate | 60%+ | POCs resulting in proposal or closed-won / Total POCs |
| RFP win rate | 45%+ | RFPs won / RFPs submitted (qualified only) |
| Technical win rate | 80%+ | Deals where technical evaluation was won / Total technical evaluations |
| Demo NPS / feedback score | 4.0+ out of 5 | Post-demo survey from attendees |
| Time-to-demo | Under 5 business days from request | Days from demo request to demo delivery |
| RFP response time | 100% on-time submission | Submissions before deadline / Total RFPs |
| Battle card currency | Updated within last 90 days | Percentage of battle cards reviewed in current quarter |

## Scope & Limitations

**In Scope:**
- Technical discovery, requirements gathering, and solution fit assessment
- Demo planning, environment preparation, and live demonstration delivery
- RFP/RFI/RFQ response management and requirement scoring
- Proof-of-concept scoping, execution support, and evaluation
- Technical objection handling using the LAER framework
- Competitive technical positioning and battle card maintenance
- Integration architecture discussion during pre-sales

**Out of Scope:**
- Commercial negotiation, pricing strategy, and deal closing (see account-executive)
- Post-sale implementation, deployment, and production support (see solutions-architect for architecture)
- CRM data management, territory planning, and sales process design (see sales-operations)
- Product development, bug fixes, and feature roadmap decisions (coordinate with Engineering)
- Customer success management and ongoing relationship post-sale (see customer-success-manager)
- Marketing content strategy and demand generation (see marketing)

**Limitations:**
- Demo environment quality depends on infrastructure provided; scripts cannot provision environments
- RFP analyzer processes text-based requirements only; cannot parse complex PDF layouts or images
- Technical qualification scoring uses configurable weights but requires calibration to your product's actual capabilities
- Battle cards require manual competitive intelligence gathering; no automated competitor monitoring

## Integration Points

| Integration | Direction | Purpose | Handoff Artifact |
|-------------|-----------|---------|-----------------|
| **Account Executive** | AE -> SE | Demo requests, discovery context, deal strategy alignment | Discovery notes, stakeholder map, competitive landscape, demo requirements |
| **Solutions Architect** | SE -> SA | Complex enterprise deals requiring deep architecture design | Technical discovery output, integration requirements, security assessment needs |
| **Product Team** | SE -> Product | Feature gaps surfaced during evaluations, competitive intel | Feature request log, RFP gap analysis, competitive capability comparison |
| **Customer Success Manager** | SE -> CSM | Technical context for post-sale onboarding | POC results, technical configuration, integration specs, known limitations |
| **Sales Operations** | SE -> Ops | Technical win/loss data, demo activity metrics | Technical win/loss reports, demo conversion data |
| **Marketing** | Bidirectional | Technical content needs (whitepapers, solution briefs); competitive positioning | Content requests, competitive analysis, technical differentiation points |
| **Engineering** | SE -> Eng | Escalation for deep technical questions; product feedback | Technical escalation tickets, product feedback summaries |

**Workflow Handoff Protocol:**
1. SE receives demo request from AE with completed discovery template (minimum: pain points, tech stack, decision criteria)
2. SE delivers demo plan to AE for review at least 24 hours before scheduled demo
3. SE documents technical win/loss for every completed evaluation within 5 business days
4. SE escalates to SA when deal requires custom integration architecture or multi-system design

## Reference Materials

- `references/demo_playbook.md` -- Demo best practices
- `references/objections.md` -- Objection handling guide
- `references/competitive.md` -- Competitive intelligence
- `references/rfp_templates.md` -- RFP response templates

---

## sales-operations

Source path: `references/sales-success/sales-operations/SKILL.md`

# Sales Operations

The agent operates as an expert sales operations professional, delivering revenue infrastructure through analytics, territory design, quota modeling, compensation architecture, and process optimization.

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which deliverable** — pipeline report, territory design, quota model, comp plan, or forecast (selects the script and the input data)
- [ ] **Revenue target + rep capacity** — the company number and ramped headcount (drives top-down quota and coverage math)
- [ ] **Selling motion + company stage** — new-business vs. expansion mix, segment, and growth rate (shapes comp splits, accelerators, and territory balance)
- [ ] **Historical actuals** — prior win rates, stage conversion, and cycle times (calibrate forecast weights and quota risk-adjustment)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

1. **Assess current state** -- Audit CRM data quality, pipeline coverage, and rep performance baselines. Validate that required fields are populated and stage dates are current.
2. **Analyze pipeline health** -- Calculate coverage ratios, stage conversion rates, velocity metrics, and deal aging. Flag bottlenecks where conversion drops below historical norms.
3. **Design or refine territories** -- Balance territories by opportunity potential, workload, and geographic/industry alignment. Score accounts to inform assignment.
4. **Model quotas** -- Run top-down (revenue target / capacity) and bottom-up (account potential analysis) models. Reconcile and risk-adjust.
5. **Architect compensation** -- Structure OTE splits, commission tiers, accelerators, and SPIFs aligned to company stage and selling motion.
6. **Build forecast** -- Categorize deals by confidence tier, apply probability weights, and surface the gap-to-quota with required win rates.
7. **Validate and iterate** -- Cross-check outputs against historical actuals. Confirm territory balance, quota fairness, and forecast accuracy before publishing.

## Sales Metrics Framework

**Activity Metrics:**

| Metric | Formula | Target |
|--------|---------|--------|
| Calls/Day | Total calls / Days | 50+ |
| Meetings/Week | Total meetings / Weeks | 15+ |
| Proposals/Month | Total proposals / Months | 8+ |

**Pipeline Metrics:**

| Metric | Formula | Target |
|--------|---------|--------|
| Pipeline Coverage | Pipeline / Quota | 3x+ |
| Pipeline Velocity | Won Deals / Avg Cycle Time | -- |
| Stage Conversion | Stage N+1 / Stage N | Varies |

**Outcome Metrics:**

| Metric | Formula | Target |
|--------|---------|--------|
| Win Rate | Won / (Won + Lost) | 25%+ |
| Average Deal Size | Revenue / Deals | Context-dependent |
| Sales Cycle | Avg days to close | <60 |
| Quota Attainment | Actual / Quota | 100%+ |

## Account Scoring

```python
def score_account(account):
    """Score accounts for territory assignment and prioritization."""
    score = 0

    # Company size (0-30 points)
    if account['employees'] > 5000:
        score += 30
    elif account['employees'] > 1000:
        score += 20
    elif account['employees'] > 200:
        score += 10

    # Industry fit (0-25 points)
    if account['industry'] in ['Technology', 'Finance']:
        score += 25
    elif account['industry'] in ['Healthcare', 'Manufacturing']:
        score += 15

    # Engagement (0-25 points)
    if account['website_visits'] > 10:
        score += 15
    if account['content_downloads'] > 0:
        score += 10

    # Intent signals (0-20 points)
    if account['intent_score'] > 80:
        score += 20
    elif account['intent_score'] > 50:
        score += 10

    return score  # Max 100; 70+ = Tier 1, 40-69 = Tier 2, <40 = Tier 3
```

## Territory Design

The agent balances territories across three dimensions:

- **Balance** -- Similar opportunity potential, comparable workload, fair distribution across reps.
- **Coverage** -- Geographic proximity, industry alignment, existing account relationships.
- **Growth** -- Room for expansion, career progression paths, untapped market potential.

### Example: Territory Allocation Table

| Territory | Rep | Accounts | ARR Potential | Quota | Coverage |
|-----------|-----|----------|---------------|-------|----------|
| West Enterprise | Rep A | 45 | $3.0M | $2.7M | 111% |
| East Mid-Market | Rep B | 62 | $2.8M | $2.4M | 117% |
| Central (Ramping) | Rep C | 38 | $2.5M | $1.2M | 208% |

## Quota Setting

### Top-Down Model

```
Company Revenue Target: $50M
  Growth Rate: 30%
  Team Capacity: 20 reps
  Average Quota: $2.5M
  Adjustments: +/-20% based on territory potential
```

### Bottom-Up Model

```
Account Potential Analysis:
  Existing accounts: $30M
  Pipeline value: $15M
  New logo potential: $10M
  Total: $55M
  Risk adjustment: -10%
  Final: $49.5M
```

The agent reconciles both models and flags divergence exceeding 10%.

## Compensation Architecture

```
TOTAL ON-TARGET EARNINGS (OTE)
  Base Salary: 50-60%
  Variable: 40-50%
    Commission: 80% of variable
      New Business: 60%
      Expansion: 40%
    Bonus: 20% of variable
      Quarterly accelerators
      SPIFs

COMMISSION RATE TIERS
  0-50% quota:   0.5x rate
  50-100% quota:  1.0x rate
  100-150% quota: 1.5x rate
  150%+ quota:    2.0x rate
```

## Forecasting

### Forecast Categories

| Category | Definition | Weighting |
|----------|------------|-----------|
| Closed | Signed contract | 100% |
| Commit | Verbal commit, high confidence | 90% |
| Best Case | Strong opportunity, likely to close | 50% |
| Pipeline | Active opportunity | 20% |
| Upside | Early stage | 5% |

### Example: Weighted Forecast Output

```
Q4 Forecast - Week 8
  Quota: $10M

  Category       Deals    Amount     Weighted
  Closed         12       $2.4M      $2.4M
  Commit         8        $1.8M      $1.6M
  Best Case      15       $3.2M      $1.6M
  Pipeline       22       $4.5M      $0.9M

  Forecast (Closed + Commit): $4.0M
  Upside (with Best Case): $5.6M
  Gap to Quota: $6.0M
  Required Win Rate on Pipeline: 35%
```

## CRM Data Quality Checklist

The agent validates these fields during every pipeline review:

- [ ] Required fields populated on all open opportunities
- [ ] Stage dates updated within the last 7 days
- [ ] Close dates set to realistic future dates (no past-due)
- [ ] Deal amounts reflect current pricing discussions
- [ ] Contact roles assigned with at least one economic buyer
- [ ] Next steps documented with specific actions and dates

## Process Optimization

### Sales Process Audit Framework

```
STAGE ANALYSIS
  Average time in stage -> identify stalls
  Conversion rate per stage -> find drop-off points
  Drop-off reasons -> categorize and address

ACTIVITY ANALYSIS
  Activities per stage -> benchmark against top performers
  Activity-to-outcome ratio -> measure efficiency
  Time allocation -> optimize selling vs. admin time

TOOL UTILIZATION
  CRM adoption rate -> target 95%+ daily login
  Feature usage -> identify underused capabilities
  Data quality score -> track completeness over time
  Automation opportunities -> reduce manual entry
```

## Scripts

```bash
# Pipeline analyzer
python scripts/pipeline_analyzer.py --data opportunities.csv

# Territory optimizer
python scripts/territory_optimizer.py --accounts accounts.csv --reps 10

# Quota calculator
python scripts/quota_calculator.py --target 50000000 --reps team.csv

# Forecast reporter
python scripts/forecast_report.py --quarter Q4 --output report.html
```

## Troubleshooting

| Problem | Root Cause | Resolution |
|---------|-----------|------------|
| Forecast accuracy below 70% | Inconsistent stage definitions; reps over-committing; lack of weighted methodology | Enforce strict stage entry/exit criteria. Apply probability weights by category (Commit 90%, Best Case 50%, Pipeline 20%). Review commit deals individually in weekly forecast calls. Compare rolling 4-quarter actuals to calibrate weights. |
| Territory imbalance causing rep attrition | Uneven account distribution; potential-to-quota mismatch exceeding 20% | Re-score accounts quarterly using the scoring model. Target less than 15% variance in potential-to-quota ratio across territories. Review territory balance monthly in high-growth periods. |
| CRM data quality below 80% completeness | Insufficient enforcement; no automated validation; rep adoption gaps | Implement required field validation at stage transitions. Run weekly data quality reports. Tie CRM hygiene to variable compensation (5-10% of bonus). Target 95%+ daily login rate. |
| Quota attainment below 60% team-wide | Quotas set too aggressively; insufficient pipeline; ramp time underestimated | Reconcile top-down and bottom-up models. Flag divergence exceeding 10%. Risk-adjust for ramp (ramping reps at 50-75% quota). Ensure 3-4x pipeline coverage at quarter start. |
| Comp plan driving wrong behaviors | Misaligned incentives; rewarding volume over quality; no accelerators | Audit comp plans against strategic objectives. Ensure accelerators kick in at 100% attainment. Weight new business vs. expansion per GTM strategy. Add SPIFs for strategic priorities. |
| Pipeline coverage drops mid-quarter | Insufficient lead flow; deals pushed or lost faster than replaced | Alert AEs when individual coverage drops below 2.5x. Coordinate with Marketing on lead generation campaigns. Implement minimum weekly prospecting activity requirements. |
| Stage conversion rates declining | Process bottleneck; missing enablement; competitive pressure | Identify the specific stage with the highest drop-off. Compare top performer conversion rates to team average. Deploy targeted training on the bottleneck stage. Review competitive win/loss data for that stage. |

## Success Criteria

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Forecast accuracy | Within 10% of actual quarterly | Abs(Weighted Forecast - Actual) / Actual |
| Pipeline coverage ratio | 3-4x quota at quarter start | Total pipeline value / Team quota |
| CRM data completeness | 95%+ required fields populated | Weekly automated data quality audit |
| Territory balance | Less than 15% variance in potential-to-quota | Standard deviation of potential-to-quota ratio across territories |
| Quota attainment distribution | 60%+ of reps at or above quota | Reps at 100%+ / Total ramped reps |
| Stage conversion rates | Improving or stable QoQ | Stage N+1 entries / Stage N entries per period |
| Sales cycle length | Trending downward or stable | Average days from opportunity creation to close |
| Ramp time to productivity | Under 6 months for new hires | Months until new rep reaches 75% of quota run rate |
| Process adoption | 90%+ compliance with defined process | Audit score from monthly process compliance review |

## Scope & Limitations

**In Scope:**
- CRM administration, data quality management, and process enforcement
- Pipeline analytics: coverage ratios, stage conversion, velocity metrics, deal aging
- Territory design, account scoring, and balanced assignment optimization
- Quota modeling: top-down, bottom-up, and reconciliation approaches
- Compensation architecture: OTE splits, commission tiers, accelerators, SPIFs
- Forecast methodology: weighted pipeline, category-based, rolling forecasts
- Sales process audit: stage analysis, activity benchmarking, tool utilization
- Reporting infrastructure and dashboard design

**Out of Scope:**
- Individual deal strategy, qualification, and closing (see account-executive)
- Technical demos, RFP responses, and POC management (see sales-engineer)
- Post-sale customer management and retention (see customer-success-manager)
- Enterprise solution architecture and integration design (see solutions-architect)
- Marketing attribution modeling and campaign ROI (see marketing/campaign-analytics)
- Financial modeling beyond sales compensation (see finance)

**Limitations:**
- Territory optimization uses heuristic scoring, not mathematical optimization solvers; results are directional, not globally optimal
- Quota models require accurate historical data; garbage in, garbage out
- Forecast accuracy benchmarks assume consistent CRM hygiene; accuracy degrades with poor data quality
- Scripts process CSV/JSON exports only; no direct CRM API connectivity
- Compensation modeling does not account for tax implications or local labor law constraints

## Integration Points

| Integration | Direction | Purpose | Handoff Artifact |
|-------------|-----------|---------|-----------------|
| **Account Executive** | Ops -> AE | Territory assignments, quota targets, pipeline reports, forecast templates | Territory map, quota letter, pipeline dashboard, forecast submission form |
| **Sales Engineer** | Ops -> SE | Activity tracking, demo conversion metrics, technical win/loss data | SE activity reports, technical evaluation pipeline |
| **Customer Success Manager** | Ops -> CSM | Renewal pipeline tracking, expansion revenue attribution, churn reporting | Renewal forecast rollup, NRR reports, churn analysis |
| **Marketing** | Bidirectional | Lead attribution, MQL-to-SQL conversion, campaign ROI, pipeline sourcing | Attribution reports, lead routing rules, campaign pipeline reports |
| **Finance** | Ops -> Finance | Revenue forecasting, commission calculations, quota-to-capacity planning | Forecast submissions, commission statements, headcount models |
| **Revenue Operations** | Bidirectional | Cross-functional GTM metrics, funnel analytics, ARR reporting | Unified revenue dashboard, GTM efficiency metrics |
| **HR** | Ops -> HR | Headcount planning, ramp modeling, performance data for reviews | Ramp timelines, quota attainment reports, territory capacity models |

**Workflow Handoff Protocol:**
1. Sales Ops publishes territory assignments and quota letters at least 2 weeks before quarter start
2. Sales Ops delivers weekly pipeline report to sales leadership every Monday by 10 AM
3. Sales Ops collects forecast submissions from AEs every Friday and publishes rolled-up forecast by Monday
4. Sales Ops runs monthly territory health review and flags imbalances exceeding 15% variance

## Reference Materials

- `references/analytics.md` -- Sales analytics guide
- `references/territory.md` -- Territory planning
- `references/compensation.md` -- Comp design principles
- `references/forecasting.md` -- Forecasting methodology

---

## solutions-architect

Source path: `references/sales-success/solutions-architect/SKILL.md`

# Solutions Architect

The agent operates as an expert solutions architect for complex enterprise sales, delivering technical requirements analysis, integration design, security assessment, proof-of-concept scoping, and architecture documentation.

## Clarify First

Before designing, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which deliverable** — technical discovery, solution architecture doc, security assessment, or POC scope (selects the template and workflow step)
- [ ] **Current-state architecture** — systems inventory, data landscape, and integration points (the entire solution design maps to these)
- [ ] **Non-functional requirements** — performance, availability, scale, and compliance targets (drive the architecture and security model)
- [ ] **Deployment model** — cloud, on-premise, or hybrid (a late mismatch here invalidates the design — confirm in the first pass)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

1. **Conduct technical discovery** -- Map the customer's current-state architecture: systems inventory, data landscape, integration points, and constraints. Document functional and non-functional requirements. Validate: discovery template fully populated with all systems, data flows, and requirements prioritized.
2. **Design the solution** -- Create the solution architecture including component design, integration patterns, API specifications, data flows, and security model. Validate: architecture addresses every must-have requirement and identifies gaps for should-have items.
3. **Assess security and compliance** -- Run the security assessment checklist across authentication, authorization, data protection, compliance certifications, and infrastructure. Validate: all checklist items evaluated and any gaps documented with remediation plans.
4. **Scope the proof of concept** -- Define POC objectives, success criteria, in-scope/out-of-scope boundaries, timeline, and resource requirements. Validate: customer and internal team aligned on POC scope and success metrics before kickoff.
5. **Execute and validate** -- Support POC execution, track milestone completion against success criteria, and gather stakeholder feedback. Validate: all success criteria measured and results documented.
6. **Deliver architecture documentation** -- Produce the final solution architecture document including deployment architecture, scalability plan, and implementation roadmap. Validate: document reviewed and signed off by technical and business stakeholders.

## Requirements Analysis

### Discovery Template

```markdown
# Technical Discovery: [Customer Name]

## Current State Architecture

### Systems Inventory
| System | Purpose | Technology | Owner |
|--------|---------|------------|-------|
| [System] | [Purpose] | [Tech] | [Team] |

### Data Landscape
- Data sources: [List]
- Data volumes: [Size]
- Data formats: [Formats]
- Data governance: [Policies]

### Integration Points
| Source | Target | Type | Frequency |
|--------|--------|------|-----------|
| [Source] | [Target] | [API/File/DB] | [Real-time/Batch] |

## Functional Requirements
| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-1 | [Requirement] | Must | [Notes] |
| FR-2 | [Requirement] | Should | [Notes] |

## Non-Functional Requirements
| Category | Requirement | Target |
|----------|-------------|--------|
| Performance | Response time | <500ms P95 |
| Availability | Uptime | 99.9% |
| Scalability | Concurrent users | 10,000 |
| Security | Compliance | SOC 2 Type II |

## Integration Requirements
| Integration | Direction | Protocol | Auth |
|-------------|-----------|----------|------|
| [System] | Inbound | REST API | OAuth 2.0 |
| [System] | Outbound | Webhook | API Key |

## Constraints
- [Constraint 1]

## Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| [Risk] | [H/M/L] | [Action] |
```

## Solution Design

### Architecture Document Structure

The agent produces architecture documents with these sections:

1. **Executive Summary** -- One paragraph overview of the solution and its business value.
2. **Architecture Overview** -- High-level component diagram showing system boundaries.
3. **Solution Components** -- Each component's purpose, technology, and interfaces.
4. **Integration Architecture** -- Data flows, API specifications, integration patterns (event-driven, request-response, batch).
5. **Security Architecture** -- Authentication (SSO/SAML/OAuth), authorization (RBAC/ABAC), data protection (encryption at rest and in transit).
6. **Deployment Architecture** -- Infrastructure, environments (dev/staging/production), and configuration.
7. **Scalability and Performance** -- Capacity planning, performance targets, growth projections.
8. **Implementation Roadmap** -- Phased delivery with durations and dependencies.

### Example: Context Diagram

```
  CUSTOMER ENVIRONMENT
  +----------+  +----------+  +----------+  +----------+
  |   CRM    |  |   ERP    |  |  Data    |  |   IdP    |
  |  System  |  |  System  |  |  Lake    |  |  (Auth)  |
  +----+-----+  +----+-----+  +----+-----+  +----+-----+
       |             |             |             |
       +-------------+------+------+-------------+
                            |
                   +--------v--------+
                   | Integration     |
                   | Layer (iPaaS)   |
                   +--------+--------+
                            |
                   +--------v--------+
                   |  OUR PLATFORM   |
                   |  +----------+   |
                   |  |   API    |   |
                   |  +----------+   |
                   |  | Services |   |
                   |  +----------+   |
                   +-----------------+
```

### Example: API Specification

| Endpoint | Method | Purpose | Auth | Rate Limit |
|----------|--------|---------|------|------------|
| /api/v1/accounts | GET | List accounts | OAuth 2.0 | 100/min |
| /api/v1/accounts | POST | Create account | OAuth 2.0 | 50/min |
| /api/v1/webhooks | POST | Receive events | API Key | 1000/min |

## Security Assessment Checklist

```
AUTHENTICATION
[ ] SSO integration supported (SAML 2.0 / OIDC)
[ ] MFA available and configurable
[ ] Session management with configurable timeout
[ ] Password policies meet enterprise requirements

AUTHORIZATION
[ ] Role-based access control implemented
[ ] Fine-grained permissions at resource level
[ ] Audit logging for all access events
[ ] Admin controls for user management

DATA PROTECTION
[ ] Encryption at rest (AES-256)
[ ] Encryption in transit (TLS 1.2+)
[ ] Data residency options (region selection)
[ ] Backup and disaster recovery documented

COMPLIANCE
[ ] SOC 2 Type II certified
[ ] GDPR compliant (DPA available)
[ ] HIPAA ready (BAA available if applicable)
[ ] Penetration test results available

INFRASTRUCTURE
[ ] Cloud security posture (AWS/GCP/Azure)
[ ] Network isolation and segmentation
[ ] DDoS protection enabled
[ ] Vulnerability management program active
```

## Proof of Concept

### POC Scope Template

```markdown
# POC Scope: [Customer Name]

## Objectives
1. [Primary objective with measurable outcome]
2. [Secondary objective with measurable outcome]

## Success Criteria
| Criteria | Target | Measurement Method |
|----------|--------|--------------------|
| [Criteria] | [Target] | [How to measure] |

## In Scope
- [Feature 1]
- [Integration 1]

## Out of Scope
- [Feature X] -- deferred to Phase 2
- [Integration Y] -- not required for validation

## Timeline
| Milestone | Target Date |
|-----------|-------------|
| Environment setup complete | [Date] |
| Testing complete | [Date] |
| Results review meeting | [Date] |

## Resources
- Customer: [Names/roles]
- Internal: [Names/roles]
```

### POC Success Metrics

The agent tracks three dimensions of POC success:

- **Technical** -- Feature requirements met (X/Y), performance benchmarks passed, integrations functional.
- **Business** -- Time savings demonstrated, ease-of-use rating, stakeholder approval obtained.
- **Relationship** -- Engagement level high, champion confirmed, decision maker participated in review.

## Implementation Roadmap Example

| Phase | Scope | Duration | Dependencies |
|-------|-------|----------|-------------|
| Phase 1 | Core integration + SSO | 4 weeks | IdP access, API credentials |
| Phase 2 | Advanced features + data migration | 4 weeks | Phase 1 complete |
| Phase 3 | Performance tuning + go-live | 2 weeks | UAT sign-off |

## Scripts

```bash
# Requirements analyzer
python scripts/requirements_analyzer.py --input requirements.xlsx

# Architecture diagram generator
python scripts/arch_diagram.py --config solution.yaml

# Security assessment
python scripts/security_assess.py --customer "Customer Name"

# POC tracker
python scripts/poc_tracker.py --customer "Customer Name"
```

## Troubleshooting

| Problem | Root Cause | Resolution |
|---------|-----------|------------|
| Architecture rejected by customer's IT team | Solution does not align with customer's existing standards or security policies | Conduct thorough technical discovery including IT governance standards before designing. Map solution to their approved technology stack. Engage their enterprise architect early. |
| Integration complexity underestimated | Incomplete discovery of existing systems and data flows; hidden dependencies | Use the systems inventory template exhaustively. Map all integration points including legacy systems. Add 30-50% buffer to integration timeline estimates. Identify data transformation requirements early. |
| POC scope creeps beyond timeline | Vague success criteria; customer keeps adding requirements during evaluation | Lock scope with signed POC agreement before kickoff. Use explicit in-scope/out-of-scope boundaries. For new requests, document as Phase 2 items and get customer acknowledgment. |
| Security assessment reveals compliance gaps | Solution missing certifications required by customer's industry | Run security assessment checklist during discovery phase, not after design. Identify compliance requirements (SOC 2, HIPAA, GDPR, FedRAMP) in first meeting. Build remediation timeline into implementation roadmap. |
| Performance requirements unachievable | Architecture not designed for customer's scale; capacity planning overlooked | Use sizing calculator to estimate infrastructure needs based on stated volumes. Validate with load testing during POC. Design for 3x current peak as growth buffer. |
| Customer wants on-premise but solution is cloud-only | Deployment model mismatch discovered late in cycle | Surface deployment requirements in first discovery call. If hybrid is possible, design a hybrid architecture pattern. If not, qualify out early to avoid wasted effort. |
| Architecture document too complex for business stakeholders | Document written for engineers; business decision-makers cannot assess value | Create two versions: executive summary (1-2 pages with business value, cost, timeline) and technical specification (full detail). Present executive version in business meetings. |

## Success Criteria

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Architecture approval rate | 85%+ | Architectures approved by customer IT / Total architectures presented |
| POC-to-deal conversion | 65%+ | POCs resulting in closed-won / Total POCs scoped |
| Requirements coverage | 100% must-haves addressed | Must-have requirements met / Total must-have requirements |
| Security assessment pass rate | 90%+ items passing | Security checklist items passed / Total checklist items |
| Time-to-architecture | Under 10 business days | Days from discovery completion to architecture document delivery |
| Implementation accuracy | Within 20% of estimated effort | Actual implementation hours / Estimated hours |
| Customer satisfaction (technical) | 4.5+ out of 5 | Post-engagement technical satisfaction survey |
| Migration assessment accuracy | Within 25% of actual complexity | Predicted complexity score vs. actual migration effort |

## Scope & Limitations

**In Scope:**
- Technical discovery and requirements analysis (functional and non-functional)
- Solution architecture design: components, integrations, APIs, data flows
- Security and compliance assessment across authentication, authorization, data protection
- Proof-of-concept scoping, milestone tracking, and success evaluation
- Deployment architecture: infrastructure, environments, configuration management
- Scalability and performance planning with capacity modeling
- Implementation roadmap creation with phased delivery and dependencies
- Migration assessment for on-premise to cloud, legacy modernization, and platform transitions

**Out of Scope:**
- Commercial deal strategy, pricing, and contract negotiation (see account-executive)
- Product demo delivery and competitive battle cards (see sales-engineer)
- CRM management, territory planning, and sales process design (see sales-operations)
- Post-sale customer success and health scoring (see customer-success-manager)
- Production infrastructure provisioning and DevOps (coordinate with Engineering)
- Ongoing maintenance, monitoring, and incident response (coordinate with Support)

**Limitations:**
- Architecture designs are pre-sales artifacts; production architecture may require refinement during implementation
- Sizing calculations are estimates based on stated requirements; actual infrastructure needs depend on real usage patterns
- Migration complexity scoring uses weighted heuristics; complex legacy systems may require hands-on assessment
- Security assessment covers common enterprise requirements but does not replace formal penetration testing or compliance audits
- Scripts generate assessments and scores based on input data; they do not connect to live infrastructure

## Integration Points

| Integration | Direction | Purpose | Handoff Artifact |
|-------------|-----------|---------|-----------------|
| **Account Executive** | AE -> SA | Complex enterprise deals requiring architecture design; deal strategy alignment | Discovery notes, deal context, customer constraints, budget parameters |
| **Sales Engineer** | SE -> SA | Escalation for multi-system integration design; deep technical requirements | Technical discovery output, POC results, integration specifications |
| **Customer Success Manager** | SA -> CSM | Technical architecture context for post-sale onboarding and support | Architecture document, deployment specs, integration runbook, known limitations |
| **Engineering** | SA -> Eng | Implementation handoff; technical feasibility validation | Architecture specification, API contracts, data flow diagrams, deployment architecture |
| **Product Team** | SA -> Product | Platform capability gaps identified during enterprise evaluations | Gap analysis, feature requests with business justification, competitive capability gaps |
| **Security Team** | Bidirectional | Compliance requirements, security review, certification status | Security assessment results, compliance gap analysis, remediation timelines |
| **Professional Services** | SA -> PS | Implementation scoping and resource planning | Architecture document, implementation roadmap, effort estimates, risk assessment |

**Workflow Handoff Protocol:**
1. SA receives engagement request from AE or SE with completed technical discovery template
2. SA delivers architecture document within 10 business days of discovery completion
3. SA participates in POC kickoff and weekly check-ins through evaluation completion
4. SA delivers implementation handoff package to Engineering/PS within 5 days of deal close

## Reference Materials

- `references/architecture_patterns.md` -- Common patterns
- `references/integration_guide.md` -- Integration best practices
- `references/security_framework.md` -- Security requirements
- `references/poc_playbook.md` -- POC execution guide
