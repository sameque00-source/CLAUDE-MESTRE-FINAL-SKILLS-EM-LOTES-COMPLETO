# Domain: project-management
Source Skills in this domain: 68

---

## activation-funnel

Source path: `references/project-management/execution/activation-funnel/SKILL.md`

# Activation Funnel Expert

## Overview

A funnel is the single most useful diagnostic tool a growth or onboarding PM owns. It turns a fuzzy product story ("users drop off somewhere") into a numbered, actionable picture ("76% land, 41% start setup, 9% finish setup, 4% take the activation action -- the biggest drop is between start and finish setup at 32 percentage points").

This skill specifies funnel structures using **Dave McClure's AARRR** (Acquisition, Activation, Retention, Revenue, Referral) and its broader cousin **AAARRR** (which adds Awareness on the front), and analyzes them with a stdlib Python tool (`funnel_analyzer.py`). The tool ingests a JSON funnel definition (stages with counts) and outputs stage-by-stage conversion and drop-off, a Mermaid flowchart, and a bottleneck call-out — in all six SHARED_OUTPUT_SCHEMA formats so the analysis travels into Jira, Linear, Confluence, Notion, or a PR.

The activation step is the centerpiece. Sean Ellis defined the "activated user" as one who has done the thing that statistically predicts retention (Slack's 2000 messages, Facebook's "7 friends in 10 days", Dropbox's "1 file in 1 folder on 1 device"). Pin the activation event before you optimize the funnel that leads to it.

## Core Capabilities

- **Funnel structure** — define stages as events using AARRR or AAARRR; compress to 4-7 stages.
- **Conversion + drop-off math** — per-stage conversion, absolute and relative drop, cumulative conversion, bottleneck detection (largest absolute vs largest relative drop).
- **Activation event definition** — Sean Ellis framework to pin the predictive "aha" event (count + window + action).
- **Counter-metric pairing** — guard every stage against gaming; leading-vs-lagging indicator design.
- **Six-format output** — render the analysis + Mermaid diagram for Jira, Linear, Confluence, Notion, or a PR.

## When to Use

- **New onboarding design** -- specify the funnel events from signup to value.
- **Drop-off diagnosis** -- signups grow but completion is flat; where is the leak?
- **Activation metric definition** -- pick the "aha" event that predicts long-term retention.
- **Cross-functional alignment** -- get marketing, product, and growth to agree on one funnel definition.
- **QBR / A/B test design** -- one canonical funnel drives the conversation and makes primary + counter-metrics obvious.

**When NOT to use:** pre-PMF discovery (use `discovery/`); top-of-funnel channel attribution (marketing tools); revenue-cohort retention (data-analytics domain); when events are not instrumented.

## Clarify First

Before analyzing the funnel, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Stages + counts** — the actual events and the user count at each step (drives every conversion/drop-off number and the bottleneck call-out)
- [ ] **Activation event** — the Sean Ellis "aha" event that defines an activated user (sets the funnel's centerpiece stage and the activation rate)
- [ ] **Cohort window** — the time period the counts are drawn from (snapshot funnels mix cohorts and lie; this scopes every number)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
python scripts/funnel_analyzer.py --input funnel.json --format markdown   # conversion + drop-off + bottleneck
python scripts/funnel_analyzer.py --demo --format mermaid                 # worked SaaS funnel diagram
```

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/funnel-analysis-playbook.md](references/funnel-analysis-playbook.md)** — full AARRR/AAARRR stage tables, the aha-event definition method, conversion/drop-off math, counter-metric pairing, leading-vs-lagging indicators, the step-by-step workflow, the `funnel_analyzer.py` reference (flags, input JSON, Mermaid sample), troubleshooting, and success criteria. Read when building or analyzing a funnel.
- **[references/pirate-metrics-deep-dive.md](references/pirate-metrics-deep-dive.md)** — McClure's AARRR + AAARRR, Andrew Chen funnel mechanics, the Reforge growth model, and NSM-funnel linkage. Read when designing the overall growth model around the funnel.
- **[references/activation-aha-moment-patterns.md](references/activation-aha-moment-patterns.md)** — Ellis's framework plus 12 worked activation-event examples (Slack, FB, Dropbox, Airbnb, Notion, Spotify, Duolingo, Twitter, HubSpot, Pinterest, LinkedIn, Figma). Read when choosing or validating the activation event.
- **[references/red-flags.md](references/red-flags.md)** — concrete examples of how funnel output goes wrong, why it's bad, and how to fix it. Read when reviewing a funnel analysis or diagnosing a misleading chart.
- **assets/funnel_design_canvas.md** — workshop canvas for defining the funnel. Use in a design session.
- **assets/activation_metric_worksheet.md** — worksheet for picking the activation event. Use when pinning the aha event.
- **assets/sample_funnel.json** — a working JSON example matching the tool input. Use as a starting template.

## Scope & Limitations

**In Scope:** funnel definition (events, stages, transitions) via AARRR/AAARRR; conversion + drop-off math and bottleneck detection; Mermaid rendering; activation-event selection (Ellis); counter-metric pairing; cohort-vs-snapshot distinction; all 6 output formats.

**Out of Scope:** pulling raw event data (input is JSON — use Amplitude/Mixpanel/PostHog/Looker); statistical significance testing (`discovery/brainstorm-experiments/`, data-analytics); cohort-retention analysis; channel attribution (marketing tools); building the UX/A/B test; forecasting.

**Caveats:** a funnel implies a linear flow — real products branch and re-enter, so complement with branched analysis. Snapshot funnels mix cohorts and lie; always specify the cohort window. Top-stage gains amplify downstream and can mislead investment — look at both absolute and relative drop. Re-validate the activation event against fresh retention cohorts every 1-2 quarters.

## Integration Points

| Integration | Direction | Description |
|---|---|---|
| `north-star-metric/` | Pairs with | Activation rate is often the NSM or a top input metric in the NSM tree |
| `brainstorm-okrs/` | Feeds into | Funnel-stage targets become KRs (e.g., "improve activation from 28% to 36%") |
| `prioritization-frameworks/` | Feeds into | Fix-the-funnel projects ranked by RICE / weighted-score |
| `discovery/brainstorm-experiments/` | Pairs with | Each funnel leak suggests testable experiments to plug it |
| `discovery/identify-assumptions/` | Pairs with | "Users will complete step 3 if we shorten it" is an assumption to validate |
| `status-update-generator/` | Feeds into | Weekly funnel deltas appear in Highlights / Risks |
| `outcome-roadmap/` | Pairs with | Roadmap items justify themselves by which funnel stage they target |
| `cycle-time-analyzer/` | Pairs with | Cycle time to fix funnel leaks is part of flow analysis |
| `data-analytics/` (domain) | Pairs with | Telemetry instrumentation; cohort analysis; stat sig |

---

## agile-coach

Source path: `references/project-management/agile-coach/SKILL.md`

# Agile Coach

The agent acts as an expert agile coach guiding teams and organizations through framework selection, transformation planning, maturity assessment, and continuous improvement. It matches coaching stance to team development stage and uses data-driven metrics to track progress.

## Core Capabilities

- **Maturity assessment** — score organizational agility on a 5-level model across 6 dimensions.
- **Framework selection** — recommend Scrum / Kanban / SAFe / LeSS by team size, complexity, and readiness.
- **Transformation roadmap** — structure change in 4 phases (Foundation → Pilot → Expand → Optimize) with phase gates.
- **Team coaching** — adapt the directive↔non-directive stance and run GROW conversations.
- **Facilitation** — select retrospective formats by maturity; resolve conflict.
- **Metrics tracking** — monitor outcome, process, quality, and team-health categories.

## When to Use

- Selecting an agile framework for a team or organization.
- Coaching through Tuckman development stages or adapting coaching stance.
- Facilitating retrospectives and resolving team conflict.
- Assessing organizational agile maturity.
- Designing or running a transformation roadmap.

## Tools

| Tool | Purpose | Command |
|------|---------|---------|
| `maturity_scorer.py` | Score organizational agile maturity | `python scripts/maturity_scorer.py --assessment assessment.yaml` |
| `metrics_dashboard.py` | Generate team metrics dashboard | `python scripts/metrics_dashboard.py --team "Team Alpha"` |
| `retro_format.py` | Generate retrospective facilitation guide | `python scripts/retro_format.py --format sailboat` |
| `transformation_tracker.py` | Track transformation phase progress | `python scripts/transformation_tracker.py --phase pilot` |

## References

- **[references/frameworks.md](references/frameworks.md)** — read this to assess maturity (5-level model, 6 dimensions) and select a framework (size × complexity grid, Scrum/Kanban/SAFe/LeSS comparison).
- **[references/coaching_techniques.md](references/coaching_techniques.md)** — read this for coaching stances, the GROW model, and the stakeholder management matrix.
- **[references/facilitation.md](references/facilitation.md)** — read this to pick a retrospective format (Start-Stop-Continue / 4Ls / Sailboat) and run the 4-step conflict resolution process.
- **[references/transformation.md](references/transformation.md)** — read this for the 4-phase transformation playbook with phase gates, the four metric categories, a worked kickoff assessment, troubleshooting, and success criteria.
- **[references/red-flags.md](references/red-flags.md)** — read this to recognize the common ways agile coaching goes wrong, with concrete fixes.

## Scope & Limitations

**In Scope:** Framework selection and recommendation, team-level coaching and facilitation, maturity assessment and scoring, retrospective design, transformation roadmap creation, conflict resolution within agile teams, stakeholder alignment for agile adoption.

**Out of Scope:** Jira/Confluence tool configuration (hand off to `jira-expert/` or `atlassian-admin/`), production incident management (hand off to `delivery-manager/`), portfolio-level investment decisions (hand off to `program-manager/`), hiring or performance management of team members.

**Limitations:** Maturity scoring is a point-in-time assessment that requires honest self-reporting; scores can be gamed. Framework recommendations are guidelines, not prescriptions -- every organization has unique constraints. Transformation timelines assume consistent leadership support; political changes can invalidate roadmaps.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `scrum-master/` | Bidirectional | Agile coach sets framework; Scrum Master executes sprint-level practices |
| `delivery-manager/` | Coach -> DM | Transformation roadmap milestones feed into delivery planning |
| `program-manager/` | Coach -> PgM | Scaling framework selection informs program governance structure |
| `jira-expert/` | Coach -> Jira | Board and workflow requirements derived from framework selection |
| `senior-pm/` | PM -> Coach | Portfolio priorities shape which teams get coaching focus first |
| `confluence-expert/` | Coach -> Confluence | Coaching artifacts (maturity reports, retro outcomes) documented in Confluence |

---

## ai-feature-prd

Source path: `references/project-management/execution/ai-feature-prd/SKILL.md`

# AI Feature PRD Expert

## Overview

AI and ML features break the assumptions a standard PRD takes for granted. Outputs are non-deterministic. Quality is statistical, not categorical. The "spec" is half product, half eval suite. A regular PRD that says "Search returns the top result" is replaced by "the assistant returns a helpful, harmless, on-policy answer with a refusal rate under 4% on the golden set, p95 latency under 1.8s, and cost-per-conversation under $0.05."

This skill produces an **AI Feature PRD** that extends the standard 8-section PRD (see `create-prd/`) with three additional sections built for the realities of shipping AI: **AI System Design** (Section 9), **Eval & Safety Plan** (Section 10), and **Operations & Cost** (Section 11). It draws on Karpathy's "Software 2.0" framing (the model *is* the spec), Anthropic's Responsible Scaling Policy patterns, the OpenAI Model Spec style for defining intended behavior, the Reforge AI PM curriculum, and the EU AI Act's risk-tier model. This is a template-based skill -- no Python tool; the artifact is a markdown PRD. Pair this with `engineering/llm-cost-optimizer/` for the cost-model math and with `ra-qm-team/eu-ai-act-specialist/` for the regulatory classification.

## Core Capabilities

- **11-section AI PRD** — the standard 8-section spine plus AI System Design, Eval & Safety Plan, and Operations & Cost.
- **Model & architecture decisions** — primary/fallback/switch logic; prompt vs few-shot vs RAG vs fine-tune vs agent selection with rejected-alternative rationale; data flow and prompt contract.
- **Eval & safety planning** — golden sets, acceptance/hallucination/refusal/latency/cost metrics, guardrail layers, refusal policy, failure-mode taxonomy, human-in-the-loop gates, ethical review.
- **Operations & cost** — cost model, per-tenant metering, shadow→internal→canary→percent→GA deployment ramp with gates, and lifecycle/prompt versioning.

## When to Use

- **Adding an AI/ML feature to an existing product** -- a search assistant, a recommendation, an auto-summarizer, a copilot, an agent.
- **Building an AI-first product** -- the entire surface area is model-mediated.
- **Migrating a deterministic feature to an LLM** -- replacing a rules-based system or scripted flow with a model.
- **Fine-tuning, prompt-tuning, or RAG decision** -- the PRD captures the architecture rationale so engineering does not relitigate it mid-build.
- **Regulated context** -- EU AI Act, HIPAA, FINRA, FDA SaMD -- the PRD must enumerate the risk tier, the eval bar, and the audit trail before kickoff.

**When NOT to use:** for a non-AI feature (use `create-prd/`); for pure model R&D with no product surface (use a research design doc); for a one-off internal prompt or batch script that does not ship to users (a Notion page is fine); when the AI feature has no production traffic plan.

## Clarify First

Before drafting the AI PRD, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **AI task & surface** — what the model does and where it appears to the user (drives Section 9 model selection + architecture pattern: prompt vs RAG vs fine-tune vs agent)
- [ ] **Quality & safety bar** — the acceptance / hallucination / refusal / latency targets that define "good enough" (drives Section 10's eval criteria and golden set)
- [ ] **Risk / regulatory tier** — EU AI Act tier or regulated context (health, finance, legal) (drives Section 10.7 ethical review and where human-in-the-loop is mandatory)
- [ ] **Cost & traffic envelope** — expected volume and cost-per-call ceiling (drives Section 11's cost model and the deployment ramp gates)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## References

Pull the reference that matches the task; keep this file lean and load detail on demand.

- **[references/ai-prd-structure.md](references/ai-prd-structure.md)** — why a separate AI PRD is needed (standard-vs-AI comparison), the full 11-section framework with every sub-section (model selection, architecture pattern, data flow, prompt contract, eval criteria, golden set, guardrails, refusal policy, failure modes, HIL, ethical checklist, cost model, deployment ramp, lifecycle), the authoring workflow, tools/assets, troubleshooting, and success criteria. Read when drafting any AI Feature PRD.
- **[references/ai-pm-frameworks-guide.md](references/ai-pm-frameworks-guide.md)** -- Software 2.0 (Karpathy), OpenAI Model Spec, Anthropic RSP, Reforge AI PM, EU AI Act tiers, and the AI PM playbook. Read for the conceptual grounding behind the PRD sections.
- **[references/eval-design-guide.md](references/eval-design-guide.md)** -- golden sets, pairwise eval, RAGAS, Promptfoo, Langfuse, online vs offline eval, drift detection. Read when designing Section 10's eval suite.
- **[references/red-flags.md](references/red-flags.md)** -- concrete examples of how AI PRDs go wrong and how to fix them. Read when reviewing a draft for quality.
- **assets/ai_feature_prd_template.md** -- full 11-section AI PRD template. Use to author the artifact.
- **assets/eval_spec_template.md** -- eval contract: golden set, metrics, cadence, owners.
- **assets/guardrail_checklist.md** -- input/output/HIL guardrail walkthrough.
- **assets/failure_mode_taxonomy.md** -- AI-specific failure mode catalogue and mitigations.

## Scope & Limitations

**In Scope:** the 11-section AI Feature PRD template (model selection with primary/fallback/switch logic, eval criteria with golden set + hallucination/refusal/latency/cost metrics, guardrail layers, failure-mode taxonomy, deployment ramp with gates, cost model + per-tenant metering, ethical review with EU AI Act tier declaration).

**Out of Scope:** building/running evals (use Promptfoo, Langfuse, Anthropic Console, Braintrust); cost-model arithmetic (use `engineering/llm-cost-optimizer/`); regulatory classification deep dive (use `ra-qm-team/eu-ai-act-specialist/`, `ra-qm-team/iso42001-ai-management/`); standard PRD structure for non-AI features (use `create-prd/`); detailed system architecture (engineering RFC); production model training pipelines (MLOps tooling).

**Important Caveats:** model versions move fast — re-evaluate the primary every 90 days and design the PRD so a model swap is a controlled change, not a rewrite. A "100% acceptance" target means the golden set is too easy (real features land at 85-95% on hard tasks). Cost projections at low traffic underestimate real spend — model a 10x scenario before launch. Treat refusal policy as living guidance. AI features in regulated industries (health, finance, legal) require human-in-the-loop on every high-stakes action.

## Integration Points

| Integration | Direction | Description |
|---|---|---|
| `create-prd/` | Extends | Sections 1-8 follow the standard PRD; this skill adds 9-11 |
| `prfaq/` | Pairs with | Working Backwards PR for AI features should call out the AI premium plainly |
| `north-star-metric/` | Feeds into | NSM should include an AI-quality input (acceptance rate, win rate) |
| `brainstorm-okrs/` | Feeds into | KRs in Section 4 tie to eval targets in Section 10.1 |
| `feature-flag-strategy/` | Pairs with | Section 11.3 ramp executes via feature flags |
| `engineering/llm-cost-optimizer/` | Pairs with | Section 11.1 cost model uses the optimizer's math |
| `ra-qm-team/eu-ai-act-specialist/` | Receives from | Risk tier declaration in Section 10.7 |
| `ra-qm-team/iso42001-ai-management/` | Pairs with | AI management system documentation aligns with PRD lifecycle in 11.4 |
| `discovery/pre-mortem/` | Feeds into | AI-specific failure modes (hallucination, jailbreak, drift) populate the pre-mortem |
| `discovery/identify-assumptions/` | Pairs with | "The base model can do this" is the single biggest AI-PRD assumption; validate before commit |
| `status-update-generator/` | Feeds into | Weekly status surfaces eval drift, cost variance, safety incidents |

---

## ansoff-matrix

Source path: `references/project-management/strategy-frameworks/ansoff-matrix/SKILL.md`

# Ansoff Matrix

Igor Ansoff's product/market matrix for evaluating growth options.
Forces explicit choice between four growth bets of increasing risk.

## The 2x2

|                 | **Existing Products** | **New Products**       |
|-----------------|------------------------|------------------------|
| **Existing Markets** | Market Penetration (lowest risk) | Product Development |
| **New Markets**       | Market Development | Diversification (highest risk) |

## When to use this skill

- **Annual / quarterly growth planning**
- **Investment allocation** across growth bets
- **Post-funding deployment** planning
- **Board strategy discussions**
- **Strategic-pivot decisions** (which quadrant are we really in?)
- **Acquisition rationale** assessment

## The 4 quadrants in depth

### Q1 — Market Penetration (existing product × existing market)
Sell more of what we have to people we know.

**Tactics:**
- Increase usage / frequency
- Take share from competitors
- Improve conversion rates
- Pricing optimization
- Loyalty / retention programs

**Risk profile:** Lowest. You know the product + market.

**Investment:** ~30-50% of growth investment for most companies.

**When dominant:** Early-stage; high-growth market with share to take.

### Q2 — Market Development (existing product × new market)
Take what works to a new market.

**Tactics:**
- New geography
- New industry vertical
- New customer segment (SMB → mid-market)
- New use case
- New channel (direct → channel; SMB → enterprise sales)

**Risk profile:** Medium. Product known; market unknown.

**Investment:** ~20-30%.

**When dominant:** Product-market fit established in initial segment;
proven by reference customers; ready to scale.

### Q3 — Product Development (new product × existing market)
Build something new for people we know.

**Tactics:**
- New SKU / module / add-on
- Adjacent product line
- Platform extension
- Feature line that becomes its own product

**Risk profile:** Medium. Market known; product unknown.

**Investment:** ~15-25%.

**When dominant:** Captive audience with related JTBDs;
distribution advantage; brand permission to extend.

### Q4 — Diversification (new product × new market)
New thing for new people.

**Tactics:**
- Adjacent diversification (related to current)
- Conglomerate diversification (unrelated)
- Acquisition-driven new categories

**Risk profile:** Highest. Both axes unknown.

**Investment:** ~5-15% (or 0% — most companies should not diversify).

**When dominant:** Few situations justify high diversification. Usually:
mature core business with cash, declining core business needing pivot,
or genuine adjacent opportunity with shared capability.

## Clarify First

Before scoring the growth options, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Precise "existing" boundaries** — which segment/geography/buyer is "existing market" and which SKU/capabilities are "existing product" (vague boundaries cause the #1 error: misclassifying a Q4 bet as Q2/Q3)
- [ ] **The growth initiatives to classify** — the actual list of bets (the raw input to quadrant assignment; no list, no matrix)
- [ ] **Company stage** — early / growth / mature (sets the stage-appropriate target investment mix across quadrants)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

### Step 1 — Define "existing" precisely
Most Ansoff confusion comes from vague boundaries.
- "Existing market" = which segment, which geography, which buyer
- "Existing product" = which SKU, which capabilities
- "New" = anything outside those boundaries

### Step 2 — List current growth initiatives
For each initiative, classify into a quadrant. Be honest:
- "Adjacent vertical for our SaaS" = Market Development (usually)
- "New module for existing customers" = Product Development
- "Same product in EU" = Market Development (regulatory, cultural,
  linguistic differences = market difference)

### Step 3 — Score by risk-adjusted return
Per initiative:
- Investment size
- Expected return
- Risk of failure
- Time to revenue
- Risk-adjusted ROI

### Step 4 — Allocate across quadrants
Most companies cluster in Q1 + one other. Pure diversification (Q4) is
rare; usually disguised market or product development.

### Step 5 — Validate the mix
Target mix depends on stage:
- **Early:** 70% Q1 + 30% Q2/Q3 (split)
- **Growth:** 50% Q1 + 25% Q2 + 25% Q3
- **Mature:** 30% Q1 + 30% Q2 + 30% Q3 + 10% Q4

If you're 90% Q1, you're not growing strategically. If you're 40% Q4,
you're betting the company.

### Step 6 — Run `ansoff_growth_scorer.py`
Score each initiative; surface mix; flag risky concentration.

```bash
python3 project-management/strategy-frameworks/ansoff-matrix/scripts/ansoff_growth_scorer.py \
  --input initiatives.json --format markdown
```

## Decision frameworks

### What counts as "new market"?

| Different... | New market? |
|--------------|-------------|
| Geography | Yes (regulation, culture, language, channel) |
| Industry vertical | Yes |
| Company size band (SMB → ENT) | Usually yes |
| Use case (same persona) | Usually no |
| Buyer persona | Yes |
| Pricing tier (free vs paid) | Usually no |

If you'd need a different sales motion or different channels, it's a new market.

### What counts as "new product"?

| Different... | New product? |
|--------------|--------------|
| New SKU / module | Yes |
| New pricing tier of same product | No |
| New feature in existing product | No |
| Significantly different value prop | Yes |
| Different underlying tech | Yes |

If you'd need a different roadmap and different success metrics, it's a new product.

### When diversification (Q4) makes sense

- **Adjacent diversification:** shared capability or audience
  - Amazon → AWS: shared capability (infra)
  - Disney → theme parks: shared capability (IP)
- **Acquisition-led:** buying expertise + product + market together
- **Declining core:** need new business model

When diversification fails:
- "Synergies" overclaimed
- Acquired company managed by incumbent culture
- No shared capability or audience
- Justified by spreadsheet only

## Common engagements

### "Help us prioritize growth bets"
1. List all growth initiatives.
2. Classify into quadrants.
3. Score risk-adjusted return.
4. Reconcile against stage-appropriate target mix.
5. Recommend top 5 with allocation.

### "We're considering acquiring company X"
1. Classify the acquisition by quadrant.
2. Q1 (existing × existing) = bolt-on; lower risk
3. Q2 (existing × new) = market expansion via M&A
4. Q3 (new × existing) = product line extension
5. Q4 (new × new) = highest risk; question hard

### "Should we enter market X?"
1. Confirm it's truly Q2 (new market for existing product).
2. Test: same value prop? same buyer? same channel? if all yes, it's
   really Q1 (different segment).
3. If true Q2, scope cost + time to validate vs Q1 alternatives.

## Anti-patterns to avoid

- **Misclassifying initiatives.** Q4 dressed as Q3 or Q2 — gets approved that wouldn't pass Q4 scrutiny.
- **All-Q1 portfolio.** Not strategic growth.
- **All-Q4 portfolio.** Bet-the-company every quarter.
- **"Adjacent" labelling.** Often hides Q4 as Q3.
- **No investment percentages.** Just lists; no allocation.
- **Static mix.** Should change with stage.
- **Ignoring the boring Q1.** Penetration is unglamorous but highest-ROI.

## References

- `references/ansoff-matrix-deep.md` — quadrant tactics, examples, risk patterns
- `references/growth-strategy-patterns.md` — stage-based mixes, common pitfalls

## Related skills

- `project-management/strategy-frameworks/business-model-canvas` — operational view of each quadrant
- `project-management/strategy-frameworks/swot-analysis` — strategic context
- `project-management/strategy-frameworks/porters-five-forces` — industry analysis
- `c-level-advisor/ceo-advisor` — strategic context
- `c-level-advisor/cmo-advisor` — Q1/Q2 marketing context
- `c-level-advisor/cpo-advisor` — Q3 product development context

---

## atlassian-admin

Source path: `references/project-management/atlassian-admin/SKILL.md`

# Atlassian Administrator Expert

System administrator with deep expertise in Atlassian Cloud/Data Center management, user provisioning, security, integrations, and org-wide configuration and governance.

## Core Capabilities

- **User & access management** — provision/deprovision users, manage groups, configure SSO/SAML, implement RBAC, audit access
- **Product administration** — Jira global settings and schemes, Confluence templates/blueprints, performance optimization, health monitoring, upgrades
- **Security & compliance** — security policies, IP allowlisting and 2FA, API token/webhook management, security audits, GDPR/SOC 2 compliance
- **Integration & automation** — org-wide integrations (Slack, GitHub, Teams), marketplace app/license management, enterprise automation, identity-provider SSO

## When to Use

- Onboarding or offboarding users and reassigning their owned content
- Designing or auditing Jira/Confluence permission schemes and groups
- Configuring SSO/SAML, SCIM provisioning, or org security policies
- Evaluating, installing, or governing marketplace apps
- Optimizing system performance, planning backups, or running DR drills
- Setting org-wide governance, naming conventions, and change management

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/administration-playbook.md](references/administration-playbook.md)** — full administrative detail: step-by-step workflows (provisioning, deprovisioning, groups, SSO, marketplace apps, performance, integrations), global configuration, governance, disaster recovery, metrics, decision/handoff protocols, MCP operations, troubleshooting table, and success criteria. Read when executing or designing any admin procedure.
- **[references/red-flags.md](references/red-flags.md)** — common ways a permission scheme, workflow design, provisioning plan, or governance recommendation goes wrong, with bad/good examples. Read before shipping any admin artifact.

## Scope & Limitations

**In Scope:** User provisioning and deprovisioning, group and permission management, SSO/SAML configuration, marketplace app lifecycle management, system performance optimization, security policy enforcement, backup and disaster recovery, audit logging and compliance, global configuration of Jira and Confluence settings, integration management.

**Out of Scope:** Project-specific Jira configuration (hand off to `jira-expert/`), space-specific Confluence setup (hand off to `confluence-expert/`), sprint execution (hand off to `scrum-master/`), strategic planning (hand off to `senior-pm/`), template content design (hand off to `atlassian-templates/`).

**Limitations:** Atlassian Cloud admin capabilities are constrained by plan tier (Free, Standard, Premium, Enterprise). Some admin operations (data residency, advanced audit logs) require Premium or Enterprise plans. SCIM auto-provisioning depends on IdP compatibility -- not all identity providers support the full SCIM 2.0 spec. Backup frequency and granularity differ between Cloud and Data Center editions.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `jira-expert/` | Admin -> Jira | Global workflow schemes, custom field creation, permission scheme deployment |
| `confluence-expert/` | Admin -> Confluence | Global templates, space permission schemes, blueprint configuration |
| `atlassian-templates/` | Admin -> Templates | Template governance policies, global template deployment approval |
| `senior-pm/` | Admin -> PM | Usage analytics, capacity planning data, cost optimization recommendations |
| `scrum-master/` | Admin -> SM | Team access provisioning, board configuration capabilities |
| `agile-coach/` | Admin -> Coach | Organizational user data for team structure mapping |

---

## atlassian-templates

Source path: `references/project-management/atlassian-templates/SKILL.md`

# Atlassian Template & Files Creator Expert

Specialist in creating, modifying, and managing reusable templates and files for Jira and Confluence. Ensures consistency, accelerates content creation, and maintains org-wide standards through canonical, parameterized templates rather than per-use-case sprawl.

## Core Capabilities

- **Template design** — Confluence page templates with dynamic content, Jira issue templates/descriptions, blueprints for multi-page structures, versioning
- **Content standardization** — org-wide standards, reusable components and macros, template libraries, documentation
- **Automation** — dynamic fields, Jira integration, self-updating structures, template-based workflows
- **Governance** — lifecycle management, version control, deprecation, usage/adoption tracking

## When to Use

- Building org-wide Confluence page templates or Jira issue templates
- Designing blueprints for complex, multi-page content structures
- Establishing content standards and a curated template library
- Migrating teams off ad-hoc, from-scratch pages toward standardized templates
- Diagnosing low template adoption, broken macros, or version confusion

## Clarify First

Before building the template, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Target tool & artifact** — Confluence page template, Jira issue template, or multi-page blueprint (sets which macros/fields are available and the structure)
- [ ] **Template type** — meeting notes, PRD, charter, bug report, decision log, etc. (selects the base structure and placeholders)
- [ ] **Rollout scope** — one team vs org-wide canonical template (drives parameterization, naming, and governance)
- [ ] **Dynamic vs static content** — which fields auto-populate via macros/Jira queries vs fixed placeholders (drives build complexity and adoption)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

1. **Discover** stakeholder needs and review existing content patterns
2. **Design** the structure with clear placeholders + inline guidance
3. **Build** with macros (panels, info/note, tasks, status, dynamic Jira queries)
4. **Test** with sample data, then **publish** to the target space/project
5. **Train** users and **monitor** adoption; iterate quarterly

Grab a ready-made starting point from the template libraries below, then follow the full creation/modification workflow in `references/workflows-and-governance.md`.

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/confluence-templates.md](references/confluence-templates.md)** — full Confluence template library (Meeting Notes, Project Charter, Sprint Retrospective, PRD, Decision Log). Read when you need a ready-to-paste Confluence page template.
- **[references/jira-templates.md](references/jira-templates.md)** — full Jira issue template library (User Story, Bug Report, Epic). Read when you need a ready-to-paste Jira description.
- **[references/workflows-and-governance.md](references/workflows-and-governance.md)** — step-by-step creation/modification/blueprint workflows, best practices, role handoff protocols, governance, and Atlassian MCP operations. Read when building, modifying, or operationalizing templates.
- **[references/troubleshooting.md](references/troubleshooting.md)** — troubleshooting table (adoption, macro breakage, versioning, stale data) and measurable success criteria. Read when a deployed template misbehaves or to define done.
- **[references/red-flags.md](references/red-flags.md)** — common ways template output goes wrong with bad/good examples (template sprawl and more). Read before publishing a template for org-wide use.

## Scope & Limitations

**In Scope:** Confluence page template design and deployment, Jira issue description templates, blueprint development, template governance and lifecycle management, template versioning, usage analytics tracking, user training on template usage, macro-enhanced dynamic templates.

**Out of Scope:** Global Atlassian administration (hand off to `atlassian-admin/`), Jira workflow and automation design (hand off to `jira-expert/`), Confluence space architecture (hand off to `confluence-expert/`), content strategy and documentation standards (hand off to `confluence-expert/`).

**Limitations:** Confluence Cloud templates cannot include all macro types (some advanced macros require manual insertion after page creation). Jira issue templates are limited to description field content -- they cannot pre-set custom field values without automation rules. Template analytics require Confluence Premium or a marketplace analytics app for detailed usage metrics.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `confluence-expert/` | Bidirectional | Confluence expert defines content standards; template creator implements them as templates |
| `jira-expert/` | Templates -> Jira | Issue description templates, workflow documentation templates |
| `atlassian-admin/` | Admin -> Templates | Global template deployment approval, governance policies |
| `scrum-master/` | SM -> Templates | Sprint ceremony template requirements, retrospective format preferences |
| `senior-pm/` | PM -> Templates | Executive reporting templates, portfolio tracking layouts |
| `delivery-manager/` | DM -> Templates | Post-mortem templates, release checklist templates, runbook structures |

---

## backlog-refinement

Source path: `references/project-management/execution/backlog-refinement/SKILL.md`

# Backlog Refinement Expert

## Overview

Refinement is the most under-invested ritual in agile teams. Stories arrive at sprint planning oversized, ambiguous, or strategically disconnected, and the team spends planning meetings doing what should have happened the week before. This skill is the refinement playbook: grade stories against INVEST, split them vertically (so each slice ships value end-to-end), and keep a working Definition of Ready and Definition of Done that prevent half-baked work from entering or leaving a sprint.

The skill includes a Python scorer (`refinement_scorer.py`) that grades each story in a JSON backlog against the six INVEST criteria and outputs a readiness score (0-6) per story. Stories scoring 5-6 are sprint-ready; 3-4 need targeted refinement; below 3 go back to discovery.

This complements `wwas/` (Why-What-Acceptance format) and `job-stories/` (JTBD format). Either format produces stories; this skill grades them and gets them sprint-ready.

## Core Capabilities

- **INVEST grading** — score each story across Independent, Negotiable, Valuable, Estimable, Small, Testable (0-6) and triage by score.
- **Vertical story splitting** — the 9 Lawrence recipes + SPIDR taxonomy; avoid horizontal (layer/team/sprint) splits.
- **Definition of Ready / Done** — input and output quality gates with enforceable templates.
- **Refinement session structure** — cadence, candidate volume, triage routing into discovery or planning.

## When to Use

- **Weekly refinement session** -- grade next-sprint candidates against INVEST and split anything too large.
- **Backlog hygiene sweep** -- re-grade the top 30 items and retire what no longer connects to strategy.
- **Sprint planning input** -- confirm all candidates pass DoR before planning.
- **New team onboarding** -- establish a shared definition of "ready" and "done."
- **Velocity diagnosis** -- erratic sprint completion usually traces to refinement quality.

**When NOT to use:** pure technical task lists with no user-facing outcome (use a simpler checklist); ad-hoc bug triage (different lifecycle); unscoped work (send to `discovery/` first).

## Clarify First

Before grading the backlog, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The stories** — the actual backlog items in the user's words, with their acceptance criteria (drives every INVEST score and which slicing recipe applies)
- [ ] **Team's Definition of Ready** — what "ready" means for THIS team (DoR must be team-authored to be enforced; sets the promote/refine/return gate)
- [ ] **Sprint size / "small enough" bar** — sprint length and rough capacity (sets how far a story must be split before it counts as Small)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
python scripts/refinement_scorer.py --input backlog.json --format markdown   # grade a backlog
python scripts/refinement_scorer.py --demo --format markdown                 # inspect demo + output
```

Triage by score: **5-6** promote to Refined, **3-4** discuss and fix the failing criteria, **0-2** send back to discovery.

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/refinement-playbook.md](references/refinement-playbook.md)** — full INVEST table, the 9 splitting recipes + SPIDR, DoR/DoD templates and anti-patterns, the step-by-step workflow, the `refinement_scorer.py` reference (flags, input JSON, scoring rubric), troubleshooting, and success criteria. Read when running a refinement session or wiring the scorer.
- **[references/invest-and-splitting-guide.md](references/invest-and-splitting-guide.md)** — deep dive on INVEST (Wake), the 9 Lawrence patterns, SPIDR (Cohn), and worked horizontal-vs-vertical split examples. Read when a story is hard to split or a slice feels wrong.
- **[references/red-flags.md](references/red-flags.md)** — concrete examples of how refinement output goes wrong, why it's bad, and how to fix it. Read when reviewing a refined backlog or diagnosing recurring quality issues.
- **assets/refinement_checklist.md** — ready-to-use DoR and DoD checklists plus a refinement session agenda. Use during a live session.

## Scope & Limitations

**In Scope:** INVEST grading of individual stories; vertical splitting (9 Lawrence patterns + SPIDR); DoR/DoD templates and enforcement; refinement session structure and cadence; the Python scorer.

**Out of Scope:** authoring stories from scratch (`wwas/`, `job-stories/`); prioritization/sequencing (`prioritization-frameworks/`); sprint planning/capacity/velocity (`../scrum-master/`); discovery and problem framing (`discovery/`); estimation techniques (`agile-coach/`).

**Caveats:** INVEST is a heuristic — a 6/6 story can still be the wrong story (pair with `prioritization-frameworks/` and `discovery/identify-assumptions/`). DoR/DoD must be team-authored to be enforced. The scorer grades structural form, not strategic substance.

## Integration Points

| Integration | Direction | Description |
|-------------|-----------|-------------|
| `execution/wwas/` | Receives from | WWAS-format stories enter refinement to be graded and split |
| `execution/job-stories/` | Receives from | Job stories enter refinement to be graded and split |
| `execution/prioritization-frameworks/` | Pairs with | Prioritization sets the sequence; refinement makes the top N executable |
| `discovery/identify-assumptions/` | Sends to | Stories scoring 0-2 are sent back for assumption mapping |
| `discovery/brainstorm-experiments/` | Sends to | Stories with unvalidated assumptions become experiment candidates |
| `../scrum-master/` | Feeds into | Refined stories feed sprint planning; refinement quality drives velocity stability |
| `execution/status-update-generator/` | Indirect | DoD compliance feeds the "what's done this week" section of status updates |
| `../jira-expert/` | Pairs with | Refined stories become Jira tickets with structured fields and DoR/DoD checklists |

---

## beta-program

Source path: `references/project-management/execution/beta-program/SKILL.md`

# Closed Beta Program Playbook

## Overview

A structured playbook for running a closed beta that produces clear learning, retained design partners, and an unambiguous decision on whether to proceed to general availability. Most betas fail not because the product is wrong, but because the program is run informally: recruitment is opportunistic, success criteria are implicit, communication is sporadic, and exit gates are never defined. This skill replaces all of that with concrete templates and decision rules.

A good closed beta runs 4-8 weeks, recruits 10-30 participants from three concentric cohorts ("friends, family, fanatics"), publishes a weekly cadence the team commits to, and exits on pre-agreed criteria rather than the calendar. The outputs are a beta program plan, a recruitment script, a weekly cadence template, and an exit memo that either greenlights GA, extends the beta, or kills the feature.

## Core Capabilities

- **Cohort design** — sequence recruitment through Friends → Family → Fanatics rings of decreasing trust and increasing signal.
- **Kano scoping** — decide the beta feature set (Must-be / Performance / Delight) so the beta produces quotable testimonials, not neutral feedback.
- **Exit gates** — quantitative + qualitative success criteria set *before* recruitment, resolving to Greenlight / Extend / Pivot / Kill.
- **Weekly cadence** — a committed Monday→Friday communication rhythm that keeps a beta from dying of silence.

## When to Use

- **Pre-GA validation** -- A feature has cleared internal alpha but needs external validation under real workloads before a public launch.
- **High-risk feature** -- Significant blast radius, regulatory exposure, or pricing changes that warrant a controlled rollout to a small group first.
- **Design partner program** -- Recruiting a small set of customers whose feedback shapes v1 scope and pricing.
- **Enterprise rollout** -- New module that needs reference customers and case studies before broad sales enablement.

## When NOT to Use

- Continuous trunk-based delivery where every change ships to all users behind feature flags (use `launch-playbook/` and a progressive rollout instead).
- Pure usability testing with 5-7 participants (use a research protocol, not a beta program).
- Internal-only dogfooding (run a 2-week alpha with engineering and customer-facing staff).

## Clarify First

Before building the beta plan, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Beta hypothesis & headline outcome** — what you are trying to learn and the one result that matters (drives the whole plan and which exit gates you set)
- [ ] **Exit gates** — the quantitative + qualitative success criteria, agreed *before* recruiting (resolve to Greenlight / Extend / Pivot / Kill — the decision rule of the program)
- [ ] **Target cohort & size** — Friends / Family / Fanatics mix and participant count (drives the recruitment script and how you weight feedback)
- [ ] **Duration** — the 4-8 week window (drives the weekly cadence and when the exit memo is due)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

1. Frame the beta hypothesis, target cohort, and headline outcome (from `create-prd/`).
2. Set exit gates in `assets/beta-program-plan.md` and get PM + Eng + sponsor sign-off **before** recruiting.
3. Recruit via `assets/recruitment-script.md` (over-recruit 2x), then stand up the comms channel and publish the cadence on day 1.
4. Run the weekly cadence (`assets/weekly-cadence-template.md`); review the exit memo (`assets/exit-memo.md`) at week N for a Greenlight / Extend / Pivot / Kill decision.

See `references/beta-framework.md` for the full framework tables, step-by-step workflow, troubleshooting, and success criteria.

## References

- `references/beta-framework.md` -- Full framework (cohort, Kano, success gates, cadence, exit gates), the 8-step workflow, troubleshooting matrix, and success criteria. Read this when building the plan, setting gates, running the cadence, or diagnosing problems.
- `references/beta-program-guide.md` -- Practical reference guide: why betas fail, cohort sequencing, Kano deep dive, exit-gate worked examples, common failure modes. Read this for narrative depth and worked examples.
- `references/red-flags.md` -- Bad-vs-good examples for the beta plan, recruitment script, cadence, and exit memo. Read this to review beta artifacts before opening recruitment.
- `assets/beta-program-plan.md` -- Beta program plan template with gates, cohort sizing, timeline.
- `assets/recruitment-script.md` -- Email/DM templates for the three cohorts plus screening questions.
- `assets/weekly-cadence-template.md` -- Monday digest, Tuesday office hours, Wednesday review, Friday snapshot templates.
- `assets/exit-memo.md` -- Exit-gate decision memo template (Greenlight / Extend / Pivot / Kill).
- Kano, Noriaki. "Attractive Quality and Must-Be Quality." Journal of the Japanese Society for Quality Control, 1984.

## Scope & Limitations

**In Scope:**
- Closed beta planning, recruitment, cadence, and exit-gate decisions
- Three-cohort sequencing (Friends, Family, Fanatics)
- Kano scoping for beta feature set
- Weekly communication templates and exit memo
- Beta-to-GA handoff to `launch-playbook/`

**Out of Scope:**
- Public open beta or waitlist management (different mechanics; treat as a soft launch via `launch-playbook/`)
- A/B testing and statistical experiment design (see `discovery/brainstorm-experiments/`)
- Pricing experiments (run a dedicated pricing test, not piggybacked on beta)
- Marketing campaign execution for the beta (light recruitment only; full GTM lives in `launch-playbook/`)

**Important Caveats:**
- A 30-person closed beta is not statistically representative. Treat outcome metrics as directional, not conclusive.
- Friends-cohort feedback is biased toward "this is great" -- weight Fanatics-cohort feedback 2x in the exit decision.
- If your beta participants are also paying customers, any service disruption is a real incident. Run beta features behind a feature flag with a documented rollback path (see `delivery-manager/`).

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `create-prd/` | Receives from | PRD defines the hypothesis and headline outcome that beta gates measure |
| `discovery/identify-assumptions/` | Receives from | Riskiest assumptions become the beta's primary learning goals |
| `discovery/brainstorm-experiments/` | Complementary | Beta is one experiment type; brainstorm-experiments covers smaller/faster alternatives |
| `daci-framework/` | Uses | DACI driver owns the exit-gate decision |
| `launch-playbook/` | Feeds into | Greenlit beta hands testimonials, case studies, and known issues to launch |
| `release-notes/` | Feeds into | Beta release notes preview the GA changelog |
| `summarize-meeting/` | Complementary | Office hours and 1:1 notes become structured weekly summaries |
| `senior-pm/` | Reports to | Exec sponsor receives the exit memo and signs the GA decision |

---

## brainstorm-experiments

Source path: `references/project-management/discovery/brainstorm-experiments/SKILL.md`

# Experiment Design Expert

## Overview

Design fast, low-cost experiments to validate product hypotheses before committing to full development. This skill applies Alberto Savoia's pretotyping philosophy ("Make sure you are building The Right It before you build It right") alongside lean experimentation methods for both new and existing products.

## Core Capabilities

- **XYZ hypotheses** — frame every test as "At least X% of Y will do Z" with a pre-set pass/fail threshold.
- **SITG + YODA discipline** — prefer skin-in-the-game signals (money, time, reputation) and Your Own Data over surveys and benchmarks.
- **Method selection** — landing page, explainer video, pre-order, concierge MVP (new products); fake door, feature stub, A/B test, Wizard of Oz, in-app survey (existing).
- **5-step process** — hypothesis, method, metric/threshold, timeboxed run, evaluate (pass/fail/inconclusive).
- **Automated design** — `experiment_designer.py` suggests 2-3 experiments per hypothesis with metric, threshold, effort, and duration.

## When to Use

- You have a product idea or feature hypothesis and need to validate it cheaply.
- You want to test willingness to pay or genuine user interest, not just stated preference.
- You need to choose the right experiment method for your context (new vs. existing product).

## Clarify First

Before designing the experiment, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Hypothesis to test** — the specific belief stated as "At least X% of Y will do Z" (drives `hypothesis_text` and the pass/fail threshold)
- [ ] **Product type** — new vs existing (selects the method catalog: landing page / pre-order / concierge vs fake door / feature stub / A-B test)
- [ ] **Target segment** — who "Y" is in the hypothesis (drives the metric and who you expose the test to)
- [ ] **Available SITG signal** — what skin-in-the-game you can capture (money, time, reputation) given budget/tooling (narrows realistic methods)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
python3 scripts/experiment_designer.py --demo            # built-in sample (3 hypotheses)
python3 scripts/experiment_designer.py input.json        # design experiments for your hypotheses
python3 scripts/experiment_designer.py input.json --format json
```

Each hypothesis needs `hypothesis_text`, `target_segment`, and `product_type` (`new`/`existing`). Document each experiment with `assets/experiment_plan_template.md`.

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/methodology-and-tools.md](references/methodology-and-tools.md)** — the XYZ/SITG/YODA principles, the experiment-type catalog for new and existing products, the 5-step process, `experiment_designer.py` usage and flags, output template, troubleshooting, success criteria, and bibliography. Read when designing or scripting an experiment.
- **[references/experiment-methods.md](references/experiment-methods.md)** — Savoia's pretotyping manifesto and pretotype types, the full lean-experiment catalog (discovery and validation), metric selection guide, threshold-setting framework, sample-size rules of thumb, and 8 common pitfalls. Read for the deep method reference.
- **[references/red-flags.md](references/red-flags.md)** — anti-patterns (confirmation-biased design, no pre-set threshold, vanity metrics, peeking) with bad/good experiment specs. Read before running an experiment.

## Scope & Limitations

**In Scope:** XYZ hypothesis formulation and validation; experiment method selection for new products (landing page, pre-order, concierge, explainer video) and existing products (fake door, feature stub, A/B test, Wizard of Oz, in-app survey); automated experiment design from hypothesis keyword analysis; metric selection, success threshold definition, and effort/duration estimation.

**Out of Scope:** statistical power analysis or sample size calculation (use dedicated A/B test platforms); experiment infrastructure setup (feature flags, analytics instrumentation); running the actual experiment (this skill designs, not executes); long-term product strategy or roadmap decisions (`execution/outcome-roadmap/`).

**Important Caveats:** pretotyping validates demand and value, not usability or performance; in-app surveys are the weakest SITG signal — use only when behavioral experiments are impractical; the tool's keyword-to-signal matching is heuristic — override when domain knowledge dictates a better method.

## Integration Points

| Integration | Direction | Description |
|------------|-----------|-------------|
| `brainstorm-ideas/` | Receives from | Ideas generated become hypotheses for experiment design |
| `identify-assumptions/` | Receives from | "Test Now" assumptions become hypotheses for this skill |
| `pre-mortem/` | Feeds into | Experiment results inform pre-mortem risk assessment before full build |
| `execution/create-prd/` | Feeds into | Validated hypotheses become PRD assumptions with evidence |
| `execution/brainstorm-okrs/` | Feeds into | Experiment metrics may become OKR key results |
| `execution/outcome-roadmap/` | Feeds into | Experiment outcomes inform Now/Next/Later roadmap placement |

---

## brainstorm-ideas

Source path: `references/project-management/discovery/brainstorm-ideas/SKILL.md`

# Product Ideation Expert

## Overview

Structured product ideation for both new product creation and existing product enhancement. This skill combines the Product Trio approach (PM + Designer + Engineer perspectives) with Teresa Torres' Opportunity Solution Tree framework to generate, evaluate, and prioritize product ideas systematically.

## Core Capabilities

- **Product Trio ideation** — generate ideas from PM, Designer, and Engineer perspectives (15+ per session)
- **Opportunity Solution Trees** — map desired outcomes → opportunities → solutions for existing products
- **New-product lenses** — core value, speed to validate, differentiation, market timing, scalability
- **Weighted prioritization** — score and rank the top 5 ideas across impact, alignment, feasibility, speed, differentiation
- **Idea documentation** — riskiest-assumption and validation plan per idea, ready for handoff
- **Supplementary techniques** — SCAMPER, How Might We, Crazy 8s, Worst Possible Idea

## When to Use

- **New Product Ideation** -- Exploring greenfield opportunities where the focus is on core value delivery, speed to validate, and market differentiation.
- **Existing Product Enhancement** -- Identifying opportunities within a live product using the Opportunity Solution Tree to connect desired outcomes to concrete solutions.

## Clarify First

Before ideating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **New vs existing product** — selects the approach (new-product lenses vs Opportunity Solution Tree mapping)
- [ ] **Target outcome or problem** — the desired outcome the session is anchored to (ungrounded ideation produces random ideas, not prioritizable ones)
- [ ] **Hard constraints** — tech stack, timeline, budget limits (bound the feasibility and speed scores in prioritization)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/ideation-process.md](references/ideation-process.md)** — the full five-phase methodology (frame → trio → product-type approach → prioritize → document), output formats, supplementary techniques, troubleshooting table, success criteria, and further reading. Read when running a session end to end.
- **[references/ideation-frameworks.md](references/ideation-frameworks.md)** — deep descriptions of the Product Trio methodology and each supplementary technique (SCAMPER, HMW, Crazy 8s, Worst Possible Idea). Read when you need technique detail or facilitation mechanics.
- **[references/red-flags.md](references/red-flags.md)** — common ways ideation output goes wrong with bad/good examples. Read before publishing the idea list or moving to prioritization.

## Integration with Other Discovery Skills

- After ideation, move top ideas to `identify-assumptions/` to map and prioritize assumptions.
- Use `brainstorm-experiments/` to design validation experiments for key assumptions.
- Run `pre-mortem/` before committing to build, to surface hidden risks.

## Scope & Limitations

**In Scope:** Structured ideation facilitation using Product Trio approach, Opportunity Solution Tree mapping, idea prioritization with weighted scoring, SCAMPER and HMW supplementary techniques, idea documentation with validation plans, integration with downstream discovery skills.

**Out of Scope:** Assumption testing and experiment design (hand off to `brainstorm-experiments/` and `identify-assumptions/`), detailed product requirements (hand off to `execution/create-prd/`), market research and competitive analysis, financial modeling for ideas.

**Limitations:** Ideation quality is bounded by the diversity of perspectives in the room -- remote-only sessions may reduce creative energy. Scoring models provide structured comparison but are not objective truth; they encode the biases of the scorers. Opportunity Solution Trees require ongoing user research to populate -- they are not a substitute for customer interviews.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `identify-assumptions/` | Ideas -> Assumptions | Top 5 ideas feed into assumption mapping for risk assessment |
| `brainstorm-experiments/` | Ideas -> Experiments | Riskiest assumptions from ideas become experiment candidates |
| `pre-mortem/` | Ideas -> Risk | Selected ideas run through pre-mortem before build commitment |
| `execution/create-prd/` | Ideas -> PRD | Validated ideas become PRD inputs with problem statement and success metrics |
| `execution/brainstorm-okrs/` | OKRs -> Ideas | Team OKRs define the target outcomes that frame ideation sessions |
| `execution/prioritization-frameworks/` | Ideas -> Prioritization | Scored ideas feed into RICE or other frameworks for backlog ordering |

---

## brainstorm-okrs

Source path: `references/project-management/execution/brainstorm-okrs/SKILL.md`

# OKR Brainstorming Expert

The agent generates and validates outcome-focused OKR sets using Christina Wodtke's Radical Focus methodology. It produces inspirational objectives with measurable key results, applies counter-metric tests, and scores quality against proven criteria.

## Core Capabilities

- **Theme-anchored generation** — one theme per team per quarter; every OKR connects back to it
- **3 distinct OKR sets** — each with a qualitative objective, 3 key results (primary, secondary dimension, counter-metric), and rationale
- **Counter-metric testing** — guards against gaming KRs by doing something harmful
- **Automated validation** — `okr_validator.py` scores sets and flags disguised tasks, missing metrics, output-framed KRs, and missing counter-metrics

## When to Use

- Setting quarterly OKRs from a single team theme
- Validating existing OKRs against quality criteria before committing
- Aligning team goals to company objectives
- Teaching teams the difference between outputs and outcomes

## Clarify First

Before generating the OKR sets, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Quarterly theme** — the single team theme for the quarter (every objective and KR must connect back to it; without it the sets are unfocused)
- [ ] **Parent / company objective** — the higher-level priority this team supports (sets the objective framing and the top-down alignment)
- [ ] **Current baselines** — today's values for the candidate metrics (turns KRs from aspirational guesses into measurable, gradeable targets)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
python scripts/okr_validator.py --input okrs.json   # validate & score
python scripts/okr_validator.py --demo              # built-in good/bad demo
```

Any OKR set scoring below 70% must be revised before committing. See the references for the full workflow and input schema.

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/okr-workflow-and-examples.md](references/okr-workflow-and-examples.md)** — full step-by-step workflow, a worked quarterly OKR example, mistakes/KPI tables, troubleshooting, success criteria, and the `okr_validator.py` flag + JSON-schema reference. Read when generating OKRs or wiring up the validator.
- **[references/okr-best-practices.md](references/okr-best-practices.md)** — comprehensive OKR anatomy, scoring, and management guide using Radical Focus. Read for the deeper "why" behind the rules.
- **[references/red-flags.md](references/red-flags.md)** — concrete bad-vs-good examples of common OKR failure modes and how to fix them. Read before sharing a draft OKR set.
- **[assets/okr_template.md](assets/okr_template.md)** — OKR document template and quarterly review format. Use when writing up the committed set.

## Scope & Limitations

**In Scope:**
- OKR brainstorming using Christina Wodtke's Radical Focus methodology
- Generating 3 distinct OKR sets per theme with counter-metric testing
- Automated validation and scoring of OKR quality (output detection, metric presence, structural checks)
- Guidance on OKR vs. KPI vs. North Star Metric distinctions
- Common OKR mistake identification and remediation

**Out of Scope:**
- OKR tracking and progress monitoring over the quarter (use dedicated OKR platforms)
- Company-level OKR cascade and alignment across teams (see `senior-pm/` for portfolio alignment)
- Individual performance-linked OKRs (OKRs should be team goals, not performance reviews)
- Metric instrumentation or analytics setup for measuring key results

**Important Caveats:**
- OKRs work best when combined with weekly check-ins. Teams that review OKRs only at quarter end see 30-45% lower completion rates.
- The validator catches structural issues but cannot assess strategic quality. A perfectly scored OKR can still be the wrong goal.
- OKRs should be aligned top-down (strategic direction) and bottom-up (team insight). Pure top-down OKRs reduce team ownership.

## Integration Points

| Integration | Direction | Description |
|------------|-----------|-------------|
| `scrum-master/` | Receives from | Sprint velocity and capacity data inform realistic KR target-setting |
| `senior-pm/` | Receives from | Portfolio strategic priorities shape quarterly OKR themes |
| `execution/outcome-roadmap/` | Feeds into | OKR key results become success metrics for roadmap Now/Next items |
| `execution/prioritization-frameworks/` | Complements | Prioritized initiatives inform which OKR theme to focus on |
| `discovery/identify-assumptions/` | Receives from | Validated assumptions increase confidence in OKR target feasibility |
| `discovery/brainstorm-experiments/` | Feeds into | Experiment metrics may become OKR key results when validated |

---

## business-model-canvas

Source path: `references/project-management/strategy-frameworks/business-model-canvas/SKILL.md`

# Business Model Canvas

A working Business Model Canvas (BMC) — Alexander Osterwalder's 9-block
strategic management template that captures how an organization creates,
delivers, and captures value.

## When to use this skill

- Designing the **business model** for a new product or company
- Refreshing the BMC after a strategic pivot
- Stress-testing the **assumptions** in an existing model
- Aligning leadership on **how value flows** through the business
- Comparing two or more candidate business models
- Onboarding a new exec / investor to the business

## The 9 building blocks

1. **Customer Segments** — Who do we serve? (mass market, niche, segmented, diversified, multi-sided)
2. **Value Propositions** — What value do we deliver to each segment?
3. **Channels** — How do we reach customers? (own, partner; direct, indirect; physical, digital)
4. **Customer Relationships** — How do we acquire, keep, and grow each segment?
5. **Revenue Streams** — How does the customer pay? (one-time, subscription, usage, licensing, advertising)
6. **Key Resources** — What assets are required? (physical, intellectual, human, financial)
7. **Key Activities** — What do we do to deliver value? (production, problem-solving, platform/network)
8. **Key Partnerships** — Who helps us? (strategic alliances, JVs, supplier relationships)
9. **Cost Structure** — Where do costs come from? (cost-driven vs value-driven; fixed vs variable)

## Clarify First

Before building the canvas, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Customer segment(s)** — who you serve, specifically (drives Value Prop, Channels, Relationships, Revenue — "everyone" collapses the whole canvas)
- [ ] **Revenue model** — how the customer pays: subscription / usage / licensing / advertising (must reconcile against Cost Structure or unit economics break)
- [ ] **Stage** — new model / pivot / mature operating business (determines whether Lean Canvas is the better tool)
- [ ] **Cost-driven vs value-driven posture** — shapes Cost Structure and Key Activities (trying both produces mediocre everything)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

### Step 1 — Draft per block
Start with **Customer Segments** and **Value Propositions** (these drive everything else).
Then fill: Channels, Customer Relationships, Revenue Streams. Then: Key Resources,
Activities, Partnerships. Finish with Cost Structure.

### Step 2 — Validate the chain
For each Customer Segment, trace: Segment → Value Prop → Channel → Relationship →
Revenue. If you can't connect these, the model has a gap.

### Step 3 — Stress-test assumptions
For each block, list the top 2-3 assumptions and rate (high / medium / low) on:
- Evidence (do we know this is true?)
- Riskiness (what breaks if wrong?)
- Testability (can we run a cheap experiment?)

### Step 4 — Run `canvas_validator.py`
Audit the canvas for: empty blocks, ungrounded value-prop / segment matches,
revenue / cost imbalance, segment-channel-relationship coherence.

```bash
python3 project-management/strategy-frameworks/business-model-canvas/scripts/canvas_validator.py \
  --input canvas.json --format markdown
```

### Step 5 — Iterate
Most first drafts are wrong in interesting ways. Plan to revise 3-5 times.

## Decision frameworks

### Which type of business model?

| Pattern | Examples | Characteristics |
|---------|----------|-----------------|
| **Unbundled** | Investment banking (advisor + product) | Different segments; different value props |
| **Long Tail** | Netflix, Amazon | Niche x volume |
| **Multi-sided platform** | Visa, Airbnb | Connects 2+ segments; network effects |
| **Free / Freemium** | Spotify, LinkedIn | One segment pays for another's free use |
| **Open** | Open-source + services | Free product, paid expertise/services |

Most modern SaaS = multi-sided OR freemium variant.

### Cost-driven vs value-driven

| Cost-driven | Value-driven |
|-------------|--------------|
| Lean cost structure | Focus on premium value |
| Low-price value prop | High-value, often high-price |
| Maximum automation | High-touch service |
| Extensive outsourcing | In-house excellence |

Most companies need to pick ONE — trying both produces mediocre everything.

### Common BMC anti-patterns

- **Generic value proposition.** "Better, faster, cheaper" — applies to anything; means nothing.
- **One segment listed as "everyone."** Forces commodity positioning.
- **Revenue streams with no channel.** How does money flow?
- **Costs that don't sum to revenue model.** Unit economics broken.
- **Partnerships listed without specific roles.** What do they actually do?
- **No coherent customer journey across blocks.** Segment doesn't connect to channel.

## Output expectations

After using this skill, you should have:

1. A populated **9-block canvas** with specific (not generic) statements
2. A **validation report** flagging gaps, ungrounded assumptions, coherence issues
3. **2-3 prioritized experiments** to test the riskiest assumptions
4. References to other strategy skills (lean canvas for startup-stage; value-proposition-canvas for the VP block)

## References

- `references/canvas-framework.md` — the 9 blocks deep, patterns, examples
- `references/examples-anti-patterns.md` — worked examples + common failures

## Related skills

- `project-management/strategy-frameworks/lean-canvas` — startup-stage variant
- `project-management/strategy-frameworks/swot-analysis` — internal/external strengths-weaknesses
- `project-management/strategy-frameworks/porters-five-forces` — competitive dynamics
- `project-management/discovery/value-proposition-canvas` — deeper on the value-prop block
- `project-management/execution/north-star-metric` — what to measure once model is set
- `business-growth/pricing-strategy` — pricing depth for the revenue block
- `c-level-advisor/ceo-advisor` — strategic context for the model

---

## confluence-expert

Source path: `references/project-management/confluence-expert/SKILL.md`

# Atlassian Confluence Expert

Master-level expertise in Confluence space management, documentation architecture, content creation, macros, templates, and collaborative knowledge management.

## Core Capabilities

- **Space architecture** — design space hierarchies, organize knowledge by team/project/topic, implement taxonomies, configure permissions and visibility
- **Content creation** — structured pages with layouts, dynamic macros, reusable templates, version control and change tracking
- **Collaboration & governance** — documentation practices, review/approval workflows, content lifecycle management, documentation standards
- **Integration & automation** — link Confluence with Jira, embed dynamic Jira reports, configure watchers/notifications, content automation

## When to Use

- Standing up or restructuring a space and its page hierarchy
- Designing templates (meeting notes, project overview, decision log, retro)
- Setting content governance: review cycles, archiving, quality standards
- Embedding Jira issues, charts, or reports inside Confluence pages
- Defining or auditing space permission schemes
- Driving documentation strategy and knowledge-base health

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/confluence-playbook.md](references/confluence-playbook.md)** — full detail behind this map: competencies, workflows (space creation, page architecture, documentation strategy, KB management), macro syntax, page layouts, inline template examples, permission schemes, content governance, decision/handoff protocols, analytics, troubleshooting table, and success criteria. Read when executing any Confluence task.
- **[references/templates.md](references/templates.md)** — ready-to-paste Confluence page templates (meeting notes, and more) with full markdown structure. Read when you need a complete template to drop into a space.
- **[references/red-flags.md](references/red-flags.md)** — common ways a space design, IA proposal, page template, or governance policy goes wrong, with bad/good examples. Read before shipping any Confluence artifact.

## Scope & Limitations

**In Scope:** Space creation and architecture, page hierarchy design, template creation and management, content governance (review cycles, archiving, quality standards), macro usage and dynamic content, documentation strategy, knowledge base management, Jira-Confluence integration, content analytics.

**Out of Scope:** Global Atlassian administration (hand off to `atlassian-admin/`), Jira project configuration (hand off to `jira-expert/`), template design and governance (hand off to `atlassian-templates/`), sprint execution artifacts (hand off to `scrum-master/`).

**Limitations:** Confluence Cloud has storage limits per plan tier that affect attachment-heavy spaces. Advanced analytics (page view trends, contributor activity) require Confluence Premium or marketplace apps. Space-level permissions cannot override more restrictive org-wide security policies set by `atlassian-admin/`. Content migration between spaces can break internal links and require manual fixup.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `jira-expert/` | Bidirectional | Jira macros in Confluence pages; Confluence page links in Jira issue descriptions |
| `atlassian-admin/` | Admin -> Confluence | Global templates, space permission schemes, blueprint configuration |
| `atlassian-templates/` | Templates -> Confluence | Designed templates deployed to spaces; template usage guidelines |
| `scrum-master/` | SM -> Confluence | Sprint ceremony documentation needs, team working agreement pages |
| `senior-pm/` | PM -> Confluence | Executive report pages, portfolio documentation, stakeholder communication |
| `delivery-manager/` | DM -> Confluence | Post-mortem documentation, runbooks, release notes pages |

---

## create-prd

Source path: `references/project-management/execution/create-prd/SKILL.md`

# PRD Scaffolding Expert

## Overview

Structured product requirements document creation using a proven 8-section framework. This skill produces clear, jargon-free PRDs that communicate what to build, why it matters, and how success is measured. Every PRD generated follows a consistent structure that keeps engineering, design, and business stakeholders aligned.

## Core Capabilities

- **Pre-PRD framing** — Problem Framing Canvas (user-perspective narrative) and Working Backwards Press Release sharpen the problem before solutions.
- **8-section PRD framework** — Summary, Contacts, Background, Objective (SMART KRs), Market Segments (JTBD), Value Proposition (Value Curve), Solution (P0/P1/P2), Release.
- **Plain-language discipline** — one idea per sentence, specificity over abstraction, 10-second executive test.
- **Scaffolder automation** — `prd_scaffolder.py` generates the skeleton with guided placeholders.

## When to Use

- **New Product Initiative** -- Starting a product from scratch and need a comprehensive spec before development begins.
- **Feature Expansion** -- Adding significant functionality to an existing product that requires cross-team alignment.
- **Stakeholder Alignment** -- Need a single document that answers "what are we building and why?" for everyone involved.

## Clarify First

Before generating the PRD, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Core problem** — one sentence in the user's words; who hurts and how (drives Background + Objective)
- [ ] **Target reader** — exec, engineering, or mixed (sets altitude and which of the 8 sections matter most)
- [ ] **Success metric** — the SMART KR that defines "it worked" (drives Objective)
- [ ] **Scope boundary** — what is explicitly NOT in this release (drives Solution P0/P1/P2 + Release)

Stop rule: ask only the 2–3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the PRD.

## Quick Start

```bash
python scripts/prd_scaffolder.py --product-name "MyProduct" \
  --objective "Short description of the outcome" \
  --segments "Segment A, Segment B"
```

1. Gather context: product name, target segment, core problem.
2. (Optional) Frame the problem first with the Problem Framing Canvas or Working Backwards PR (see `references/prd-framework.md`).
3. Run the scaffolder to generate the skeleton, then fill each of the 8 sections.
4. Review against the checklist in `references/prd-writing-guide.md`, then share for feedback.

## References

- `references/prd-framework.md` — read this while writing: the two pre-PRD techniques, full 8-section framework with per-section guidance, writing principles, scaffolder flag reference, troubleshooting, and success criteria.
- `references/prd-writing-guide.md` — read this when polishing a draft: section-by-section writing guide and the review checklist.
- `references/red-flags.md` — read this before sharing the PRD: common ways PRDs go wrong with bad/good examples and fixes.
- `assets/prd_template.md` — complete PRD template ready to fill in.

## Scope & Limitations

**In Scope:** 8-section PRD skeleton generation with guided placeholders; section-by-section writing guidance (plain-language, specificity); market-segment definition by jobs-to-be-done; value-proposition mapping with Value Curve; release planning with Now/Next/Later and explicit deferral.

**Out of Scope:** Technical architecture or system design docs (`engineering/`); user story writing and backlog creation (`execution/job-stories/`, `execution/wwas/`); detailed UX research or usability testing plans (`product-team/`); financial business-case modeling (`finance/`).

**Important Caveats:** A PRD is a communication tool, not a contract — treat it as a living document. The 8-section framework is proven, but lightweight agile teams may need only sections 1, 3, 4, 7, 8, while regulated contexts may need more. A 2025 Carnegie Mellon SEI study found effective requirements management eliminates 50-80% of project defects.

## Integration Points

| Integration | Direction | Description |
|------------|-----------|-------------|
| `discovery/identify-assumptions/` | Receives from | Validated and "Test Now" assumptions populate PRD Section 7 with evidence |
| `discovery/brainstorm-experiments/` | Receives from | Experiment results validate or invalidate PRD assumptions |
| `discovery/pre-mortem/` | Receives from | Tiger mitigations become PRD risk sections |
| `execution/brainstorm-okrs/` | Feeds into | PRD Key Results (Section 4) align with quarterly OKR targets |
| `execution/outcome-roadmap/` | Feeds into | PRD release plan (Section 8) maps to roadmap Now/Next/Later horizons |
| `execution/prioritization-frameworks/` | Receives from | Feature priority (P0/P1/P2) in Section 7 informed by RICE/ICE scoring |
| `senior-pm/` | Feeds into | PRD stakeholder context feeds stakeholder mapper engagement plans |

---

## customer-feedback-triage

Source path: `references/project-management/execution/customer-feedback-triage/SKILL.md`

# Customer Feedback Triage

## Overview

Most PMs sit on a chaotic inbound stream — Slack DMs, support tickets, sales call notes, CSAT comments, NPS verbatims, in-app feedback widgets, partner emails, exec one-liners — and have no system for converting that stream into prioritization signal. The default mode is reactive: whoever shouts loudest wins, the loudest channels (sales, executives) dominate, and the actual user job stays invisible.

This skill provides a workflow and a Python tool for handling that stream. Inputs are raw feedback items from many channels. Outputs are deduplicated, categorized, scored, and routed items, plus acknowledgment responses for the customers who sent them.

The frameworks behind it are Marty Cagan's separation of *request* from *opportunity* from *solution*, Noriaki Kano's model of feature-quality categories, Reforge's customer-development model, and ProductPlan's request-management playbook. Detail lives in the references below.

## Core Capabilities

- **Intake & normalization** — one verbatim record per ask across 8 channels (support, sales, social, NPS, in-app, exec, partner, interview)
- **Dedup & clustering** — group items by underlying opportunity even when literal requests differ
- **Kano + Cagan classification** — Basic/Performance/Delight/Indifferent/Reverse, and Request → Opportunity → Solution
- **Segment-aware scoring** — `kano_weight × log10(volume+1) × segment_weight × (1 + strategic_alignment)` as a coarse router (not a final RICE)
- **Response discipline** — Will-build / Exploring / Won't-build templates; always acknowledge, sometimes commit, rarely promise
- **Feed-forward routing** — to prioritization, discovery, backlog, bug tracker, or strategy

## When to Use

- You have a backlog of customer feedback that is not being processed.
- Sales or Customer Success is constantly forwarding feature requests and expecting a per-request answer.
- An executive is acting as a request channel and the roadmap is drifting accordingly.
- You are setting up a new feedback intake process (post-launch, post-funding, scaling beyond founder-led product).
- You need to respond to a customer who sent a feature request and you have to say "yes", "no", or "exploring" in a defensible way.
- You want a defensible audit trail for "we heard you but said no" decisions.

### When not to use

- For genuine product discovery (do not let feedback triage replace discovery — see `discovery/interview-synthesis/`).
- For prioritizing already-triaged items against each other (that is `prioritization-frameworks/`).
- For bug triage (use the bug triage process in your tracker — though the workflow here applies to feature-request items).

## Clarify First

Before triaging the feedback, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Feedback items with channel + segment tags** — the verbatims and where each came from (drives clustering, volume counts, and the Kano guess)
- [ ] **Segment weights** — which customer segments count more (sets `segment_weight` in the score, i.e. whether enterprise asks outrank long-tail volume)
- [ ] **Strategic alignment definition** — what current strategy a request must match (sets the `strategic_alignment` term that boosts on-strategy asks)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
# Triage a JSON queue of inbound feedback
python scripts/feedback_triage.py --input queue.json --format markdown

# See a sample triage queue across all 6 output formats
python scripts/feedback_triage.py --demo --format markdown
```

The tool ships with `--format json|markdown|mermaid|confluence|notion|linear` per `SHARED_OUTPUT_SCHEMA.md`. The 6-phase workflow (intake → triage → categorize → score → respond → feed forward) and the scoring formula live in the workflow guide reference.

## References

- **[references/customer-feedback-triage-guide.md](references/customer-feedback-triage-guide.md)** — the full workflow with the 4 frameworks (Cagan, Kano, Reforge, ProductPlan), the 6-phase process, week-over-week cadence, channel-by-channel intake norms, and the weekly triage meeting agenda. Read when running or setting up the triage process.
- **[references/kano-model-deep-dive.md](references/kano-model-deep-dive.md)** — categorization heuristics, edge cases, and time-dynamics of Kano categories. Read when overriding the tool's Kano guess.
- **[references/red-flags.md](references/red-flags.md)** — 12 anti-patterns (squeaky-wheel, sales-driven roadmap, HiPPO, treating requests literally...), plus the common traps, troubleshooting table, and success criteria. Read before the weekly triage meeting and when output looks off.
- **[references/tool-reference.md](references/tool-reference.md)** — `feedback_triage.py` flags, input schema, and all output schemas. Read when scripting or debugging the tool.
- **[assets/triage_template.md](assets/triage_template.md)** — manual triage worksheet for teams not running the Python tool.
- **[assets/response_templates.md](assets/response_templates.md)** — Will-build / Exploring / Won't-build templates with three variants each.
- **[assets/kano_quick_reference.md](assets/kano_quick_reference.md)** — one-page reference card for the five Kano categories.
- Marty Cagan, *Inspired* (2nd ed., 2017) and *Empowered* (2020); Noriaki Kano et al., "Attractive Quality and Must-Be Quality" (1984); Reforge "Customer Development"; ProductPlan, "How to Manage Product Feedback".

## Scope & Limitations

**In Scope:** Inbound feedback intake schema, deduplication and clustering, Kano-based categorization, segment-aware volume scoring, response templating, routing to downstream skills (discovery, prioritization, backlog).

**Out of Scope:** Bug triage (use the team's bug tracker process). User research and interview-driven discovery (see `discovery/interview-synthesis/`). Detailed prioritization scoring with RICE/ICE/WSJF (see `prioritization-frameworks/`). Customer-relationship management (CRM is the system of record for the customer, this skill is the system of record for the request). NPS analysis methodology (this skill ingests NPS verbatims as one channel among many).

**Important Caveats:** The Kano guess and clustering are transparent keyword/word-overlap heuristics — not ML; override liberally and, above ~500 items/month, augment with semantic clustering offline. The scoring formula is a coarse router, not a substitute for RICE/ICE. "Acknowledge, sometimes commit, rarely promise" is a discipline the templates support but cannot enforce; Sales and CS need explicit training to avoid promising in customer conversations.

## Integration Points

| Integration | Direction | What flows |
|---|---|---|
| `prioritization-frameworks/` | Feeds into | High-priority triaged Feature requests flow in with volume and Kano context as inputs to RICE/ICE/WSJF |
| `discovery/identify-assumptions/` | Feeds into | Recurring opportunity themes surface implicit product assumptions |
| `discovery/interview-synthesis/` | Feeds into | Top customers per cluster become the target list for follow-up interviews |
| `discovery/brainstorm-experiments/` | Feeds into | High-signal opportunities motivate experiment design |
| `wwas/` | Feeds into | Backlog-ready items move into Why-What-Acceptance format |
| `job-stories/` | Feeds into | Final backlog items use Job Stories format if team prefers JTBD framing |
| `senior-pm/` | Bidirectional | Stakeholder map informs segment weights; triage output informs stakeholder updates |
| `business-growth/customer-success/` | Bidirectional | CS team is the primary intake source via support tickets and CSAT |
| `sales-success/` | Bidirectional | Sales is the intake source for sales-channel asks; receives won't-build rationale |

---

## customer-interview-script

Source path: `references/project-management/discovery/customer-interview-script/SKILL.md`

# Customer Interview Script Expert

## Overview

Running a customer interview is harder than it looks. The difference between a 60-minute conversation that produces three actionable insights and one that produces zero is almost entirely method: what you ask, when you ask it, and what you do *not* ask. This skill is the live-interview companion to `discovery/interview-synthesis/` (post-interview analysis) and `discovery/identify-assumptions/` (which produces the questions you go in to test).

The script structure draws from four canonical sources: Steve Portigal's *Interviewing Users* (rapport, listening, "tell me about the last time"), Teresa Torres' *Continuous Discovery Habits* (story-based probing, weekly cadence), Rob Fitzpatrick's *The Mom Test* (avoiding compliments, opinions, and futures), and Lewis Lin's behavioral interviewing patterns (concrete-recent-relevant). The goal is to leave each interview with at least one story, one contradiction, and one surprise.

## Core Capabilities

- **5-phase script** -- opening/consent, context, story collection (the meat), probing/synthesis, closing -- timed for 45/60/90-minute slots.
- **Story-based probing** -- the story funnel and 5-Whys turn opinions into concrete-recent-relevant evidence.
- **Mom Test discipline** -- bad-question to good-question conversions that strip out compliments, fluff, and feature pitches.
- **Question banks by type** -- problem discovery, solution validation, journey mapping, churn/win-loss.
- **Interview craft** -- rapport rules, silence handling, pacing, pair-interviewing roles, recording/consent/storage.

## When to Use

- **Problem discovery** -- test whether a customer pain is real, who has it, and how acute it is.
- **Solution validation** -- get feedback on a wireframe/prototype grounded in past behavior, not hypotheticals.
- **Journey research** -- understand the end-to-end flow of how a customer does a job today (tools, workarounds, handoffs).
- **Churn or win/loss** -- understand why customers left, stayed, or chose a competitor.
- **Continuous discovery cadence** -- weekly customer touchpoints to keep the team grounded in evidence.

## Clarify First

Before building the interview script, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Interview type** — problem discovery / solution validation / journey / churn-win-loss (selects the question bank and phase emphasis)
- [ ] **Must-answer questions** — the 2-3 assumptions you go in to test (drives the custom story-collection prompts)
- [ ] **Time slot** — 45 / 60 / 90 minutes (sets the per-phase timing)
- [ ] **Participant recency** — how recently they did the job (story-based probing degrades past ~90 days, which weakens the script's core)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

1. Pull top assumptions from `discovery/identify-assumptions/`; write 2-3 must-answer questions and pick the interview type.
2. Customize `assets/interview_script_template.md` and pull type-specific prompts from `assets/question_bank.md`.
3. Run the 5-phase script (rapport first, stories in the middle, contradictions at the end); debrief within 30 minutes; hand the transcript to `discovery/interview-synthesis/`.

See `references/interview-execution-playbook.md` for the full method, scripts, question banks, pacing, and troubleshooting.

## References

- `references/interview-execution-playbook.md` -- read this before running an interview: the four-source frameworks, the verbatim 5-phase script, question banks by type, what-not-to-ask table, pacing, pair-interviewing roles, recording/consent, silence handling, workflow, troubleshooting, and success criteria.
- `references/interviewing-methodology-guide.md` -- read this for the deep method with worked examples (Portigal, Torres, Fitzpatrick, Lin).
- `references/red-flags.md` -- read this when auditing a transcript or technique for biasing anti-patterns before trusting the findings.
- `assets/interview_script_template.md` -- ready-to-customize 5-phase interview script.
- `assets/question_bank.md` -- question bank organized by interview type (problem / solution / journey / churn).

## Scope & Limitations

**In scope:** live discovery interview script structure and pacing; question banks (problem / solution / journey / churn); rapport, listening, and silence techniques; recording consent and retention policy; pair-interviewing role definitions.

**Out of scope:** interview synthesis and theme clustering (`discovery/interview-synthesis/`); assumption mapping before interviews (`discovery/identify-assumptions/`); survey design and quantitative research; usability testing protocols (task-based, not story-based); recruiting operations (panel sourcing, screening, incentives).

**Caveats:** this skill produces interview *technique*, not research operations. Story-based interviewing is bounded by participant memory -- events older than 90 days are reconstructions. B2B enterprise interviews often need procurement-style approval; build 2-4 weeks into recruiting. Continuous discovery assumes weekly touchpoints; one-off rounds produce shallower evidence -- weight findings accordingly.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `discovery/identify-assumptions/` | Receives from | Top assumptions become the must-answer questions for each interview |
| `discovery/interview-synthesis/` | Feeds into | Transcripts and debrief notes are the input for theme clustering |
| `discovery/brainstorm-ideas/` | Bidirectional | Pre-interview hypotheses; post-interview ideas seeded by themes |
| `discovery/brainstorm-experiments/` | Feeds into | Validated pains become experiment hypotheses |
| `discovery/jtbd-workshop/` | Complementary | Switch interviews use this script structure as their foundation |
| `discovery/value-proposition-canvas/` | Feeds into | Jobs, pains, and gains captured in stories populate the Customer Profile |
| `execution/create-prd/` | Feeds into | Direct quotes strengthen PRD Background and Market Segments |

---

## cycle-time-analyzer

Source path: `references/project-management/execution/cycle-time-analyzer/SKILL.md`

# Cycle Time Analyzer (Flow Metrics)

## Overview

Compute and visualize the four core Kanban flow metrics -- lead time, cycle time, throughput, and work-in-progress -- from issue history data exported from Jira, Linear, GitHub Projects, or any tracker that records status transitions. The output is a dashboard suitable for sprint retrospectives, executive reporting, and bottleneck analysis, plus a Mermaid cumulative flow diagram that visualizes work accumulation over time.

Flow metrics are the most useful diagnostic for team and process health, far more so than velocity or story points. Daniel Vacanti's work (*Actionable Agile Metrics for Predictability*, 2015) shows that predictability and throughput are governed by Little's Law (`Throughput = WIP / Cycle Time`), and that the most reliable way to improve delivery is to lower WIP and stabilize cycle time -- not to estimate harder. This skill also reports aging WIP (in-flight work older than the team's 85th-percentile cycle time -- the items most at risk) and supports the shared `--format` schema (json, markdown, mermaid, confluence, notion, linear).

## Core Capabilities

- **Four flow metrics** — lead time, cycle time (as a distribution, never an average), throughput, and WIP, tied together by Little's Law.
- **Aging WIP** — flags in-flight items older than the 85th-percentile cycle time as at-risk; the most actionable daily metric.
- **Cumulative flow diagram** — Mermaid CFD for retrospectives and exec reports.
- **Per-type filtering & trends** — bug/feature/spike breakdowns over rolling 6-8 week windows across all six output formats.

## When to Use

- **Sprint retrospective** -- A team wants data-driven discussion of why some sprints feel slow.
- **Bottleneck investigation** -- Throughput has fallen and the team needs to identify the constraining step.
- **Quarterly delivery review** -- Leadership wants a real picture of delivery performance beyond story-point velocity.
- **Predictability analysis** -- Stakeholders want delivery forecasts grounded in actual cycle time distributions (use with Monte Carlo via `scrum-master/`).
- **WIP-limit calibration** -- A Kanban team is setting WIP limits and needs a baseline of current behavior.

## When NOT to Use

- For story-point velocity tracking, use `scrum-master/velocity_analyzer.py`.
- For sprint capacity calculation, use `scrum-master/sprint_capacity_calculator.py`.
- For per-person performance evaluation -- flow metrics are team-level signals; using them to rank individuals destroys the team behavior they measure.

## Clarify First

Before running the analysis, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Issue history with status transitions** — per-item timestamps for when work started and finished (every metric is derived from these; missing transitions invalidate the numbers)
- [ ] **Workflow states that count as "in progress" vs "done"** — your board's actual status names (defines where cycle time starts/stops, which changes every result)
- [ ] **Analysis window** — the rolling period (e.g. last 6-8 weeks) and any type filter (scopes throughput trend and which in-flight items are flagged as aging WIP)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
python scripts/flow_metrics.py --input issues.json --format markdown   # full dashboard
python scripts/flow_metrics.py --input issues.json --format mermaid     # cumulative flow diagram
python scripts/flow_metrics.py --demo --format markdown                 # sample output, no input
```

Review the 85th-percentile cycle time (not the average), flag aging WIP that exceeds it, and re-run weekly to track the trend. See `references/metrics-and-tool-reference.md` for the full workflow, CLI flags, and JSON schemas.

## Tools

| Tool | Purpose | Command |
|------|---------|---------|
| `flow_metrics.py` | Compute lead time, cycle time, throughput, WIP, aging WIP, CFD | `python scripts/flow_metrics.py --input issues.json --format markdown` |

## References

- `references/metrics-and-tool-reference.md` -- Precise definitions of the four metrics, Little's Law, aging WIP, the 7-step workflow, troubleshooting matrix, success criteria, and the full `flow_metrics.py` CLI flags + input/output JSON schemas. Read when running an analysis or wiring up the tool.
- `references/flow-metrics-guide.md` -- Vacanti-style deep dive: lead vs cycle, distributions vs averages, Little's Law, aging WIP, common anti-patterns. Read for narrative depth and tracker-specific export instructions.
- `references/red-flags.md` -- Bad-vs-good examples of flow-metric reporting. Read this to sanity-check a dashboard before sharing it.
- Vacanti, Daniel S. *Actionable Agile Metrics for Predictability*. ActionableAgile Press, 2015.
- Vacanti, Daniel S. *When Will It Be Done?* ActionableAgile Press, 2020.
- Little, John D. C. "A Proof for the Queuing Formula: L = λW." Operations Research, 1961.
- Anderson, David J. *Kanban: Successful Evolutionary Change for Your Technology Business*. Blue Hole Press, 2010.

## Scope & Limitations

**In Scope:**
- Lead time, cycle time, throughput, WIP, aging WIP calculation
- Cumulative flow diagram generation (Mermaid)
- Per-type filtering (bug, feature, spike)
- All six output formats per `SHARED_OUTPUT_SCHEMA.md`

**Out of Scope:**
- Monte Carlo delivery forecasting (use `scrum-master/velocity_analyzer.py`)
- Story-point velocity (use `scrum-master/`)
- Resource capacity planning (use `senior-pm/resource_capacity_planner.py`)
- Code-level metrics (PR review time, deploy frequency -- use DevOps-focused tools)

**Important Caveats:**
- Flow metrics depend on accurate status transitions. If your team batch-updates the board once a day, the cycle time data will be discretized by that batch interval.
- A team that gamifies flow metrics will produce better-looking numbers without changing real delivery. Use these metrics as a diagnostic, not a target. (Goodhart's Law.)
- Cycle time is a team property, not an individual property. Resist the urge to compute per-assignee cycle time -- it will incentivize hand-offs that hurt the team.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `scrum-master/` | Complementary | Flow metrics + velocity together provide the full delivery picture |
| `scrum-master/retrospective_analyzer.py` | Feeds into | Flow trends inform retro topics |
| `dependency-map/` | Complementary | Long cycle times often correlate with cross-team dependencies |
| `sprint-retrospective/` | Feeds into | CFD and aging WIP are standard retro inputs |
| `senior-pm/project_health_dashboard.py` | Feeds into | Throughput trends feed portfolio health |
| `status-update-generator/` | Feeds into | Weekly status includes throughput and aging WIP highlights |
| `agile-coach/` | Used by | Coaches use flow metrics to assess team maturity |

---

## daci-framework

Source path: `references/project-management/execution/daci-framework/SKILL.md`

# DACI Decision Framework

## Overview

Clarify decision ownership and reduce decision thrash using the DACI framework (Driver, Approver, Contributor, Informed). Unlike RACI which focuses on task responsibility, DACI is purpose-built for product decisions -- who drives the decision to closure, who has veto power, who provides input, and who needs to know.

The four roles in brief: **Driver** (exactly one, drives to closure), **Approver** (1-2 max, holds veto), **Contributor** (input without veto), **Informed** (notified, not consulted). Build a chart by mapping current state, finding pain points, designing target state, and rolling out a 30/60/90 transition. See the playbook reference for role rules, the 7-step build sequence, and health metrics.

## When to Use

- **New team formation** -- A new cross-functional group needs clear decision-making roles.
- **Decision thrash** -- Decisions stall because nobody knows who has authority.
- **Scaling teams** -- Growth creates ambiguity about who owns which decisions.
- **Post-incident** -- A failed launch or missed deadline reveals unclear ownership.
- **Reorg transitions** -- Role changes create governance gaps.

### When NOT to Use

- Task assignment or project execution (use RACI instead).
- Individual contributor work allocation (use sprint planning).
- Truly one-person decisions (no governance overhead needed).

## Clarify First

Before building the DACI chart, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The specific decisions to map** — the 3-5 high-impact decisions, not "everything" (each becomes a chart row; mapping too much at once is the top failure mode)
- [ ] **Candidate people and their real authority** — who can actually approve or veto (drives the Driver and Approver assignments; without genuine authority the chart is fiction)
- [ ] **Current pain points** — where decisions stall or thrash today (drives the current→target-state gap and the 30/60/90 transition plan)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## References

- **[references/playbook.md](references/playbook.md)** — read this when building or running a DACI chart: role definitions and rules, the 7-step build sequence (working group → roles → decisions → current-state map → pain points → target-state → transition plan), governance health metrics, troubleshooting, and success criteria.
- **[references/red-flags.md](references/red-flags.md)** — read this before publishing a chart or running a decision under it: common ways a DACI chart goes wrong with bad/good examples anchored to the role rules.

## Scope & Limitations

**In Scope:** DACI chart creation, current-state mapping, target-state design, transition planning, governance health metrics, pain point identification, decision ownership clarity.

**Out of Scope:** Task assignment (use RACI), project execution tracking (use sprint planning), individual performance management, organizational design beyond decision governance.

**Important Caveats:** DACI works best when leadership commits to respecting the framework. Without executive buy-in, Drivers may lack the authority to actually drive decisions. Start with 3-5 high-impact decisions rather than trying to map everything at once.

## Integration Points

| Integration | Direction | What Flows |
|---|---|---|
| `create-prd/` | Feeds into | DACI decisions inform PRD Contacts section and decision log |
| `identify-assumptions/` | Complements | Surfaces assumptions about who has authority |
| `brainstorm-okrs/` | Complements | OKR ownership aligns with DACI decision ownership |
| `summarize-meeting/` | Feeds into | Meeting summaries capture DACI decision outcomes |
| `senior-pm/` | Complements | Portfolio-level DACI for cross-project decisions |

## Further Reading

- Productside DACI guidance for product teams
- Inspired by the DACI framework used at Intuit and other product-led organizations

---

## delivery-manager

Source path: `references/project-management/delivery-manager/SKILL.md`

# Delivery Manager

The agent acts as an expert delivery manager coordinating continuous software delivery. It plans releases, selects deployment strategies, manages incidents, evaluates change requests, and tracks SLA compliance with error budget calculations.

## Core Capabilities

- **Delivery maturity assessment** — locate the team on a 5-level scale (Manual → DevOps Excellence) and target one level at a time.
- **Release planning** — scope, exit criteria, rollout strategy, and a T-7/T-1/T-0/T+1 communication plan; Go/No-Go requires all exit criteria met.
- **Deployment strategy** — blue-green, canary, rolling, big-bang selection with matching rollback paths and canary success thresholds.
- **Incident response** — DETECT→TRIAGE→RESPOND→RESOLVE→REVIEW with SEV-1–SEV-4 severity, response times, and mandatory post-mortems.
- **Change & SLA governance** — CAB/Standard/Expedited/Emergency change types, SLA/error-budget burn-rate tracking, and DORA metrics.

## When to Use

- Planning a release and running a Go/No-Go against exit criteria
- Choosing a deployment strategy and its rollback plan
- Responding to a production incident or running a post-mortem
- Evaluating a change request or calculating SLA/error-budget burn
- Assessing delivery maturity or interpreting DORA metrics

## Clarify First

Before generating the plan or report, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which task** — release readiness/Go-No-Go, deployment strategy, incident response, or SLA/error-budget tracking (each is a different workflow and artifact)
- [ ] **Exit criteria or SLA target** — the bar the release or service is measured against (Go/No-Go requires all criteria met; SLA math needs the target)
- [ ] **Deployment strategy** — blue-green, canary, rolling, or big-bang, when shipping (sets the rollout gates and rollback path)
- [ ] **Incident severity** — SEV-1 through SEV-4, when responding (sets response time, escalation, and whether a post-mortem is mandatory)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
python scripts/release_checker.py --version v2.5.0            # release readiness vs exit criteria
python scripts/deploy.py --env production --strategy canary    # coordinate a deployment
python scripts/sla_calculator.py --service portal --period month  # SLA + error budget
python scripts/incident_report.py --id INC-2024-0125           # incident report from timeline
```

## Tools

| Tool | Purpose | Command |
|------|---------|---------|
| `release_checker.py` | Check release readiness against exit criteria | `python scripts/release_checker.py --version v2.5.0` |
| `deploy.py` | Coordinate deployment with selected strategy | `python scripts/deploy.py --env production --strategy canary` |
| `sla_calculator.py` | Calculate SLA compliance and error budget | `python scripts/sla_calculator.py --service portal --period month` |
| `incident_report.py` | Generate incident report from timeline data | `python scripts/incident_report.py --id INC-2024-0125` |

## References

- `references/release_process.md` -- Delivery maturity levels, release planning + exit criteria, change-request types, the release-readiness example, DORA metrics, cross-skill integration, troubleshooting, and success criteria. Read when planning a release or improving the pipeline.
- `references/deployment_patterns.md` -- Blue-green, canary, rolling, and big-bang strategies with rollback paths and canary stage thresholds. Read when selecting how to ship.
- `references/incident_management.md` -- Severity matrix (SEV-1–SEV-4), the 5-step incident workflow, and post-mortem requirements. Read during incident triage and response.
- `references/sla_management.md` -- SLA framework, error-budget calculation example, and burn-rate freeze thresholds. Read when tracking reliability budgets.
- `references/red-flags.md` -- Bad-vs-good examples of delivery-management output. Read this to review a release/incident plan before committing to it.

## Scope & Limitations

**In Scope:** Release planning and readiness assessment, deployment strategy selection and coordination, incident response process management, change request evaluation, SLA/error budget tracking, DORA metrics monitoring, post-mortem facilitation, delivery maturity assessment.

**Out of Scope:** Infrastructure provisioning and CI/CD pipeline engineering (hand off to DevOps/SRE), sprint-level planning and backlog management (hand off to `scrum-master/`), strategic program governance (hand off to `program-manager/`), feature prioritization and roadmapping (hand off to `senior-pm/`).

**Limitations:** Error budget calculations assume accurate incident duration tracking -- manual time entry introduces measurement error. Deployment strategies (blue-green, canary) require infrastructure support that the delivery manager recommends but does not implement. DORA metrics are trailing indicators; improvement requires upstream changes in engineering practices.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `scrum-master/` | SM -> DM | Sprint completion data, demo-ready confirmation, velocity for release sizing |
| `senior-pm/` | PM -> DM | Release calendar, stakeholder communication requirements |
| `program-manager/` | PgM -> DM | Cross-project release dependencies, milestone alignment |
| `jira-expert/` | Bidirectional | Release version tracking in Jira; deployment status field updates |
| `agile-coach/` | Coach -> DM | Delivery maturity assessment inputs, DevOps culture recommendations |
| `confluence-expert/` | DM -> Confluence | Post-mortem documentation, runbook maintenance, release notes publishing |

---

## dependency-map

Source path: `references/project-management/execution/dependency-map/SKILL.md`

# Cross-Team Dependency Map

## Overview

Dependency tracking for multi-team initiatives: who is blocking whom, what is on the critical path, what is at risk, and what to coordinate this week. The output is a Mermaid dependency diagram, a critical-path list, a risk-ordered blocker list, and a weekly cross-team sync agenda -- all generated from a single JSON file you maintain instead of a sprawling spreadsheet.

Most cross-team programs fail at dependency management, not execution. The teams individually do good work; the gaps are at the seams. This skill makes those seams visible, prioritizes them by criticality, and produces the communication artifacts that keep them visible week over week. The underlying model uses the Critical Path Method (CPM, Kelley and Walker, 1959) for sequencing, optional DSM (Design Structure Matrix) thinking for cluster identification, and Conway's Law (Conway, 1968) framing for the organizational source of recurring dependency patterns. All outputs follow the six standard PM formats per `SHARED_OUTPUT_SCHEMA.md`.

## Core Capabilities

- **Dependency capture** — a six-field model (from/to team, description, needed-by, expected-delivery, status) maintained as one JSON file.
- **Critical-path analysis** — CPM computation of the longest zero-slack chain plus near-critical siblings.
- **Risk ordering** — slack and status combine into a risk-ranked blocker list.
- **Visualization & comms** — Mermaid `graph LR` rendering plus a weekly cross-team sync agenda.
- **Org diagnosis** — Conway's Law framing for recurring team-pair dependencies.

## When to Use

- **Multi-team feature** -- A feature requires platform, mobile, and data teams to coordinate.
- **Program management** -- Tracking 5-20 dependent workstreams across a quarter (see `program-manager/`).
- **Release coordination** -- A launch depends on legal review + DevOps capacity + design assets all converging.
- **Quarterly planning** -- Identifying which dependencies threaten quarterly OKR commitments.
- **Org-design diagnosis** -- Recurring dependencies between the same two teams may signal a structural problem (Conway's Law).

**When NOT to use:** single-team backlogs (use `wwas/` or `job-stories/`), pure technical dependencies inside one codebase (use Git), or stakeholder relationships (use `senior-pm/stakeholder_mapper.py`).

## Clarify First

Before mapping dependencies, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Teams / workstreams in scope** — the from/to pairs become the nodes; the wrong set produces a graph that maps the wrong program
- [ ] **Needed-by and expected-delivery dates per dependency** — these drive slack, so they determine the critical path and the entire risk ordering
- [ ] **Current status of each dependency** — not-started / in-progress / at-risk / done drives the risk-ordered blocker list and the weekly sync agenda
- [ ] **Named owner per dependency** — an ownerless dependency cannot be walked weekly; owners populate the sync agenda

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
python scripts/dependency_graph.py --input deps.json --format markdown   # full report
python scripts/dependency_graph.py --input deps.json --format mermaid     # graph LR for README/Notion/Confluence
python scripts/dependency_graph.py --demo --format markdown               # sample output, no input
```

Populate `deps.json` from `assets/dependency-template.json`, run the analyzer, give every critical-path item a named owner, and walk it weekly with `assets/weekly-sync-agenda.md`. Update the JSON *before* each sync.

## References

- **[references/dependency-map-operations.md](references/dependency-map-operations.md)** — read this for the operational detail: the six-field model, slack/risk derivation, critical-path computation, the 8-step weekly workflow, tool flags, input/output JSON schemas, troubleshooting, and success criteria.
- **[references/dependency-management-guide.md](references/dependency-management-guide.md)** — read this for the CPM walkthrough, DSM intro, Conway's Law applied, and recurring-dependency diagnosis.
- **[references/red-flags.md](references/red-flags.md)** — read this to see the common ways dependency-map output goes wrong (with fixes) before publishing a map.
- `assets/dependency-template.json` — starter JSON with the full schema and one worked example per status.
- `assets/weekly-sync-agenda.md` — standard agenda for the cross-team weekly sync.
- Kelley & Walker, "Critical-Path Planning and Scheduling" (1959); Conway, "How Do Committees Invent?" (1968); Steward, "The Design Structure System" (1981).

## Scope & Limitations

**In Scope:** cross-team dependency capture and visualization, Critical Path Method analysis, risk-ordered blocker list, Mermaid `graph LR` rendering, Conway's Law-aware quarterly review, all six formats per `SHARED_OUTPUT_SCHEMA.md`.

**Out of Scope:** resource capacity planning (`senior-pm/resource_capacity_planner.py`), stakeholder mapping (`senior-pm/stakeholder_mapper.py`), sprint-level backlog ordering (`prioritization-frameworks/`), detailed Gantt charting, risk register beyond dependency blockers (`pre-mortem/`).

**Important Caveats:** dependency maps degrade fast without weekly updates (a 4-week-old map is harmful); the critical path identifies the *currently longest* chain and can shift when a single dependency is added (re-run on every change); this skill surfaces what to talk about but does not replace the conversation.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `program-manager/` | Used by | Program managers maintain the dependency JSON across teams |
| `senior-pm/` | Feeds into | Critical-path risks flow into portfolio risk reporting |
| `senior-pm/risk_matrix_analyzer.py` | Complementary | Dependency risks plot alongside other program risks |
| `pre-mortem/` | Complementary | Pre-mortem-identified "tigers" often map to specific dependencies |
| `cycle-time-analyzer/` | Complementary | Long cycle times often correlate with cross-team blocks |
| `launch-playbook/` | Feeds into | Launch RACI references the dependency map for cross-team owners |
| `status-update-generator/` | Feeds into | Weekly status pulls critical-path summary |
| `summarize-meeting/` | Feeds into | Weekly sync notes become structured summaries |

---

## eol-communication

Source path: `references/project-management/execution/eol-communication/SKILL.md`

# EOL Communication Expert

## Overview

Create clear, empathetic End-of-Life (EOL) communications that preserve customer trust and facilitate smooth transitions. Sunsetting a product is a high-stakes communication challenge -- done poorly, it damages brand trust and accelerates churn across your entire portfolio. Done well, it strengthens customer relationships and drives migration to replacement solutions.

The work runs in four phases: **(1) Pre-announcement planning** (what, why, who, when, what support, what risks), **(2) Craft the message** (transition narrative, customer impact, transition solution, timeline, one CTA), **(3) Segment and distribute** (different message and channel per segment), **(4) Support and monitor** (support FAQ, migration tracking, churn watch). See the playbook reference for the full framework, templates, and timeline guidance.

## Clarify First

Before crafting the EOL communication, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **What is being sunset and why** — drives the transition narrative and Phase 1 planning; a vague "why" reads as abandonment
- [ ] **Replacement / migration path** — drives the transition solution and the single CTA; if it is broken or absent, do not announce yet
- [ ] **Timeline and key dates** — drives the timeline section and varies sharply by product type (API vs paid product vs free feature)
- [ ] **Customer segments affected** — drives the Phase 3 segment/channel matrix; high-value accounts need different message and outreach than self-serve

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## When to Use

- **Product sunset** -- Discontinuing an entire product or product line.
- **Feature deprecation** -- Removing a significant feature from an existing product.
- **Service migration** -- Moving customers from one platform or infrastructure to another.
- **API retirement** -- Deprecating API versions or endpoints.
- **Pricing model change** -- Major pricing restructure that effectively ends old tiers.

### When NOT to Use

- Minor feature changes that don't require customer notification.
- Internal tooling changes with no customer impact.
- Bug fixes or patches (use release notes instead).

## References

- **[references/playbook.md](references/playbook.md)** — read this when crafting a sunset announcement: the 4-phase EOL framework, the messaging template and writing rules, the segment/channel matrix, the internal support FAQ, the monitoring checklist, timeline best practices by product type, troubleshooting, and success criteria.
- **[references/red-flags.md](references/red-flags.md)** — read this before sending the message to Legal and Support for review: common ways an EOL message, timeline, or migration plan goes wrong with bad/good examples anchored to the 4-phase framework.

## Scope & Limitations

**In Scope:** EOL message creation, timeline planning, segment-specific messaging, internal FAQ preparation, migration monitoring framework, customer objection handling, support team preparation.

**Out of Scope:** Replacement product development, data migration tooling implementation, legal contract review, refund processing, technical infrastructure decommissioning.

**Important Caveats:** EOL communication is only as good as the transition path behind it. If the replacement product isn't ready or the migration path is broken, the best-written message won't prevent customer frustration. Ensure migration tooling is tested before announcing.

## Integration Points

| Integration | Direction | What Flows |
|---|---|---|
| `create-prd/` | Complements | Replacement product PRD informs EOL transition narrative |
| `release-notes/` | Feeds into | Final product updates communicated alongside EOL timeline |
| `summarize-meeting/` | Receives from | EOL decision meeting notes inform communication content |
| `senior-pm/` | Receives from | Stakeholder map identifies high-risk accounts for personal outreach |
| `daci-framework/` | Complements | DACI chart clarifies who Drives the EOL decision and communication |

---

## feature-flag-strategy

Source path: `references/project-management/execution/feature-flag-strategy/SKILL.md`

# Feature Flag Strategy (PM playbook)

## Overview

A feature flag is a runtime switch that decouples deploying code from releasing a feature. Done well, flags turn high-stakes ship dates into low-stakes config changes -- launches become measured ramps, regressions become single-toggle rollbacks, and experiments live alongside production code. Done poorly, flags become permanent technical debt: hundreds of dead toggles in code, conflicting flag states across environments, and nobody remembering what the flag controls.

This skill is the **PM-facing** rollout playbook. It does not describe how to wire a flag library into your codebase (that is the engineering side, e.g. your LaunchDarkly / Statsig / Optimizely / Unleash / OpenFeature install). It describes how a PM plans a phased rollout: what kind of flag this is, how it ramps, what the gate criteria are between stages, who can flip the kill-switch, when the flag retires, and how it is named so the team can find it six months later. The frameworks behind it are Martin Fowler's "Feature Toggles" taxonomy, LaunchDarkly's rollout best practices, Optimizely / Statsig experiment playbooks, and Reforge experimentation foundations.

## Core Capabilities

- **Flag classification** -- release / experiment / ops / permission, each with its own lifespan and ownership rules.
- **Rollout shape selection** -- linear, segmented, geographic, A/B-with-holdout, dark launch, reverse ramp, mobile forced-upgrade.
- **Kill-switch design** -- pre-agreed thresholds per surface and single-config-change rollback authority for on-call.
- **Holdout design** -- short-term and global holdouts for long-term lift attribution.
- **Flag-debt governance** -- retirement dates, retirement checklist, quarterly audit, naming conventions, dependency chains.

## When to Use

- Planning a launch larger than a small team can ship cold (anything customer-facing usually warrants a flag).
- Risky changes to high-traffic surfaces (search, checkout, auth, billing -- always behind a kill-switch).
- Experiments (A/B tests) with hold-out and statistical-significance gates.
- Permission rollouts (enterprise tenants, beta participants, a specific role).
- Operational levers (throttles, circuit breakers, degrade-modes).
- Migration of a deterministic feature to AI (pair with `ai-feature-prd/`; cost gates via `engineering/llm-cost-optimizer/`).

**When NOT to use:** one-time data migrations (use a script with `--dry-run`), environment configuration, permanent A/B variants that never converge (that is personalization), or flag-flagging every change (cost > value when overused).

## Clarify First

Before drafting the rollout plan, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Flag type** — release / experiment / ops / permission sets the lifespan and whether a retirement date even applies (permanent vs temporary)
- [ ] **Rollout shape** — linear / segmented / geo / A-B-with-holdout / dark / reverse-ramp defines the stages and gate criteria of the ramp
- [ ] **Kill-switch threshold + authority** — the metric that triggers rollback and who on-call may flip it; a flag without this is worse than no flag
- [ ] **Retirement date** — for release/experiment flags, the date the toggle is removed; omitting it is how flag debt accrues

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

1. Classify the flag, pick a rollout shape, and define the kill-switch threshold + authority.
2. Set a retirement date (release/experiment toggles), name the flag with the convention, and document the plan in `assets/rollout_plan_template.md`.
3. Ramp through stages with a "green pass" gate metric per step; retire the flag at stable GA; audit inventory quarterly.

See `references/rollout-execution-playbook.md` for the full taxonomy, shape catalog, kill-switch tree, holdout governance, naming, workflow, troubleshooting, and success criteria.

## References

- `references/rollout-execution-playbook.md` -- read this when planning a rollout end-to-end: flag taxonomy, all 7 rollout shapes, kill-switch decision tree + thresholds, holdouts, flag-debt retirement, naming, dependency chains, approval/audit, workflow, troubleshooting, success criteria.
- `references/fowler-feature-toggle-taxonomy-guide.md` -- read this for the deep dive on Martin Fowler's "Feature Toggles" essay, lifespans, ownership patterns, and the operational discipline behind them.
- `references/rollout-shape-comparison-guide.md` -- read this for the worked comparison of the 7 rollout shapes with example use cases and risk profiles.
- `references/red-flags.md` -- read this when reviewing a rollout plan for anti-patterns and failure modes before sign-off.
- `assets/rollout_plan_template.md` -- per-feature rollout plan with stages, gates, owners, dates.
- `assets/kill_switch_decision_tree.md` -- pre-incident kill-switch thresholds + authority + flip steps.
- `assets/flag_debt_retirement_checklist.md` -- retirement workflow + quarterly audit.
- `assets/flag_naming_convention.md` -- team naming sheet.

## Scope & Limitations

**In scope:** flag taxonomy and lifespan rules; rollout shapes; kill-switch decision tree and thresholds; holdout design; flag-debt retirement workflow + audit; naming and dependency-chain governance; approval, audit-trail, and two-person-rule patterns.

**Out of scope:** wiring flag SDKs into a codebase (engineering side); statistical analysis of experiments (pair with `discovery/brainstorm-experiments/` for design; data-analytics for stats); building gating dashboards (BI tooling); customer launch comms (`launch-playbook/`, `prfaq/`, `release-notes/`); end-of-life narrative (`eol-communication/`); code rollback strategy (git revert + deployment pipelines).

**Caveats:** flags reduce launch risk but do not eliminate it -- a flag with a broken kill-switch is worse than no flag. Flag debt grows with velocity. Permission/Ops flags are permanent; release/experiment flags are temporary, and conflating the two is the most common failure mode. Holdouts are politically hard to maintain -- document the policy with leadership sign-off. On mobile, forced-upgrade flows are user-hostile; plan around adoption curves.

## Integration Points

| Integration | Direction | Description |
|---|---|---|
| `launch-playbook/` | Pairs with | Rollout plan is the deployment ramp inside the broader launch playbook |
| `cycle-time-analyzer/` | Pairs with | Long-stuck ramps are a leading indicator of risk |
| `prfaq/` / `release-notes/` | Pairs with | External launch narrative vs the operational rollout plan that produced it |
| `eol-communication/` | Pairs with | Reverse-ramp (Shape F) is the operational side of a sunset |
| `ai-feature-prd/` | Pairs with | The AI PRD's deployment ramp (Section 11.3) executes via this skill |
| `discovery/brainstorm-experiments/` | Pairs with | Experiment toggles operationalize Lean experiments |
| `discovery/pre-mortem/` | Pairs with | Pre-mortem risks inform kill-switch thresholds |
| `engineering/llm-cost-optimizer/` | Pairs with | AI ramp gate: cost budget per stage |
| `status-update-generator/` | Feeds into | Rollout-stage pace + gates appear in weekly status |

---

## gtm-strategy

Source path: `references/project-management/gtm/gtm-strategy/SKILL.md`

# GTM Strategy

A complete go-to-market strategy is the integrated cross-functional plan:
ICP, motion, channels, messaging, success metrics, and launch sequence.

## When to use this skill

- **New product launch** (full product or major feature)
- **New segment entry** (SMB → ENT; new geography; new vertical)
- **GTM refresh** (current motion stalling)
- **Repositioning** after pivot
- **Pre-fundraise** GTM narrative for investors
- **Post-mortem** on why a launch didn't take

## The 7 components

1. **ICP (Ideal Customer Profile)** — who specifically, why now
2. **Beachhead segment** — first concentrated market
3. **Motion** — PLG / sales-led / hybrid / channel-led
4. **Channels** — how customers find + buy
5. **Messaging + positioning** — what we say
6. **Success metrics** — what we measure
7. **Launch sequence** — what happens in what order

## Clarify First

Before building the GTM strategy, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **ACV / price point** — determines the motion and channel mix (motion-ACV mismatch, e.g. sales-led on $50/mo, breaks unit economics)
- [ ] **ICP and beachhead segment** — the one concentrated market to win first (drives targeting, channels, and messaging; "everyone" dilutes all seven components)
- [ ] **Self-serve readiness** — can the product activate without a human (PLG vs sales-led/committee buying)
- [ ] **Launch trigger and timeline** — what's launching and when (sets the T-90 → T+90 sequence)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

### Step 1 — Define ICP precisely
- Industry / vertical
- Size band (employees / revenue)
- Geography
- Buyer persona (role, level)
- Tech stack signals
- Job-to-be-done
- Trigger event (why now)

See `project-management/gtm/ideal-customer-profile`.

### Step 2 — Pick the beachhead
Start narrow:
- 1 segment, 1 vertical, 1 geography
- Concentrated enough to develop reference customers
- Reachable via clear channels
- Big enough to learn from but small enough to dominate

Reference: Crossing the Chasm. Don't try to sell to everyone Day 1.

### Step 3 — Pick the motion

| Motion | When | Cost structure |
|--------|------|----------------|
| **PLG (product-led)** | Self-serve product; low ACV ($0-$5K); strong activation | Low CAC; high product investment |
| **Sales-led** | High ACV ($25K+); complex buying committees | High CAC; sales team needed |
| **Marketing-led / inbound** | Mid-ACV ($5K-$25K); content-driven | Medium CAC; content + ops team |
| **Channel-led** | Wide distribution via partners | Medium CAC; partner program needed |
| **Community-led** | Strong category with passionate users | Long ramp; high ongoing investment |
| **Hybrid (PLG + sales)** | PLG to capture; sales to expand | Most modern SaaS; complex to coordinate |

Don't try to run all motions Day 1.

### Step 4 — Channels per motion

| Motion | Primary channels |
|--------|------------------|
| PLG | Web direct, SEO, viral, content, app stores |
| Sales-led | Outbound SDR, AE outbound, events, account-based |
| Marketing-led | SEO, paid, content syndication, webinar |
| Channel-led | Partner program, marketplace |
| Community-led | Open source, community events, integrations |

### Step 5 — Messaging + positioning
- **Positioning:** "[Product] is [category] for [target] who [JTBD], unlike [alternative]"
- **Hero message:** outcome customers want (not feature)
- **Differentiation:** clear "why us vs them"
- **Talk track per segment:** different ICPs need different framing

### Step 6 — Success metrics

| Motion | KPI focus |
|--------|-----------|
| PLG | Signups, activation, free-to-paid conversion, NRR |
| Sales-led | Pipeline coverage, win rate, ACV, cycle time, NRR |
| Marketing-led | MQL → SQL conversion, CPA, content engagement |
| Channel-led | Partner-sourced revenue, partner activity |

Set targets; track weekly; tune.

### Step 7 — Launch sequence
- **T-90:** ICP locked; positioning v1; channels chosen; team aligned
- **T-60:** Sales/marketing collateral ready; pilot customers identified
- **T-30:** Internal training; lighthouse customer commitments
- **T-7:** Launch comms prepped; press / analyst briefed
- **T-0:** Launch
- **T+30:** Iterate based on early signal
- **T+90:** GTM v2 incorporating learnings

### Step 8 — Run `gtm_strategy_validator.py`
Audit GTM doc for: ICP specificity, motion fit, channel coherence,
messaging clarity, metric definition, sequence realism.

```bash
python3 project-management/gtm/gtm-strategy/scripts/gtm_strategy_validator.py \
  --input gtm.json --format markdown
```

## Decision frameworks

### Motion fit by ACV

| ACV | Likely motion |
|-----|---------------|
| < $1K | PLG; consumer-style |
| $1K-$10K | PLG-led; light sales-assist |
| $10K-$50K | Marketing-led + inside sales |
| $50K-$250K | Sales-led with marketing support |
| $250K+ | Enterprise sales-led; long cycle |

Cross these and economics break.

### Beachhead vs broad

Going broad Day 1:
- Diluted messaging
- No reference customers
- Sales motion thinly stretched
- No moat in any segment

Beachhead first:
- Win the segment
- Build reference customers
- Develop battle-tested motion
- Then expand adjacent

Geoffrey Moore: cross the chasm one bowling pin at a time.

### Channel-product fit

Each channel has product-fit assumptions:
- SEO: long content; SERP-able problem
- Paid: clear high-intent keywords; LTV > 2-3x CAC
- Outbound: defined ICP; AE can articulate value in 30 seconds
- Channel: partners economically incentivized; product fits their offering
- Community: passionate users + room to participate
- Viral: collaboration / sharing built into product

If channel-product fit is off, channel won't deliver regardless of effort.

## Common engagements

### "Help us launch product X in market Y"
1. Confirm ICP precision (or sharpen).
2. Pick beachhead segment.
3. Choose motion based on ACV + product complexity.
4. Map channels to motion.
5. Draft positioning + messaging.
6. Define success metrics + targets.
7. Build T-90 → T+90 launch sequence.

### "Our GTM is stalling — what's wrong?"
1. Audit each component for clarity + execution.
2. Common failures:
   - ICP too broad
   - Motion mismatch with ACV
   - Channels not delivering pipeline
   - Messaging not differentiated
   - Metrics not tracked
3. Identify the breakpoint; fix one at a time.

### "Should we move from PLG to sales-led?"
1. Look at ACV trend: rising with enterprise = yes
2. Look at pipeline: enterprise inquiries unanswered = yes
3. Look at unit economics: PLG CAC payback < sales CAC payback?
4. Plan hybrid: PLG capture + sales expansion (most common path)

## Anti-patterns to avoid

- **ICP = "everyone."** Diluted strategy.
- **Motion mismatched with ACV.** Sales motion on $50/mo = unit economics broken.
- **Channels listed; not invested.** Knowing channels doesn't activate them.
- **Generic messaging.** "Faster, better, cheaper."
- **No success metrics.** Can't tune what you can't measure.
- **Launch sequence = "ship and see."** Predictable underperformance.
- **All motions at once.** Try one; succeed before adding.

## References

- `references/gtm-components-deep.md` — ICP, motion, channels, messaging deep
- `references/launch-sequence-playbook.md` — T-90 → T+90 playbook
- `references/gtm-anti-patterns.md` — common failures + fixes

## Related skills

- `project-management/gtm/ideal-customer-profile` — ICP definition
- `project-management/strategy-frameworks/business-model-canvas` — model behind GTM
- `marketing/launch-strategy` — marketing execution layer
- `business-growth/customer-success-manager` — post-sale GTM
- `c-level-advisor/cro-advisor` — sales / revenue strategy
- `c-level-advisor/cmo-advisor` — marketing strategy

---

## ideal-customer-profile

Source path: `references/project-management/gtm/ideal-customer-profile/SKILL.md`

# Ideal Customer Profile (ICP)

The sharp definition of who you serve — used by marketing for targeting,
sales for qualification, and product for prioritization.

## When to use this skill

- **Defining ICP** for a new product / segment
- **Refining ICP** from observed closed customers
- **Auditing** when pipeline quality / conversion is poor
- **Pre-fundraise** to articulate market position
- **Sales qualification** rubric build
- **Marketing targeting** for outbound + paid

## The 8 ICP dimensions

1. **Firmographics** — industry, vertical, size, geography, age
2. **Tech-stack signals** — what they use today (and what's missing)
3. **Buyer persona** — role, level, tenure, team size
4. **Jobs-to-be-done (JTBD)** — what they're trying to accomplish
5. **Existing alternatives** — how they solve the JTBD today
6. **Trigger events** — why now (new funding, new exec, regulation, etc.)
7. **Budget authority** — who controls spend
8. **Reachability** — can we find + contact them via channels we have

## ICP vs Persona vs Segment

- **ICP** = the company/account (firmographics + tech + situation)
- **Persona** = the human buyer (role + motivations + objections)
- **Segment** = a cluster of similar ICPs (often by size or vertical)

Use ICP for "which companies." Use persona for "which humans within ICP."

## Clarify First

Before defining the ICP, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Existing customers vs greenfield** — refine from closed-won/best-customer patterns vs design-partner proxy (the real ICP comes from data, not a guess)
- [ ] **The JTBD the product solves** — what customers are trying to accomplish (anchors firmographics, alternatives, and trigger events)
- [ ] **Reachable channels you have** — paid / outbound / events / content / partners (an ICP you can't reach is academic; drives the Reachability dimension)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

### Step 1 — Start from your best customers
If you have customers:
- List top 20 by health, revenue, expansion
- Find common patterns across them
- That's your real ICP (not what you guessed)

If you don't have customers:
- Use design partners / pilot customers as proxy
- Be ready to revise after 10-20 real customers

### Step 2 — Disqualify common myth-ICPs

Common "ICP" patterns that are wishful thinking:
- "Companies with 100-10,000 employees" — too broad
- "Innovative companies" — meaningless
- "Companies that want to grow" — everyone
- "Enterprise" — undefined; map to size

A real ICP excludes most companies.

### Step 3 — Document the 8 dimensions
Per dimension, be specific.

Example for HR analytics SaaS:

| Dimension | Definition |
|-----------|------------|
| Firmographics | US, mid-market (200-2000 EE), SaaS or services vertical, > $20M revenue, 5+ years old |
| Tech-stack | Workday or BambooHR + ADP or Gusto. Bonus: existing BI tool (Looker / Tableau / Mode) |
| Buyer persona | HR Director or VP People; 5+ years tenure; built career on people analytics |
| JTBD | "I need to be a strategic partner to the CFO/CEO; I'm stuck doing reports manually" |
| Existing alternatives | Excel + analyst (often resigned to it); occasionally hired contractor |
| Trigger events | Annual reporting cycle just done; new CFO joined; HR analyst departed; board asking for better data |
| Budget authority | Director can recommend; VP People approves $50K; CHRO approves $200K+ |
| Reachability | SHRM events, HR Tech podcast, LinkedIn (HR Director groups), HR Brew newsletter |

### Step 4 — Build the qualification rubric
For sales qualification, distill ICP to a scorable checklist:

```
Qualification (BANT-style):
- Industry fit: SaaS/services? (yes/no)
- Size fit: 200-2000 EE? (yes/no)
- Tech fit: Workday/BambooHR + ADP/Gusto? (yes/no)
- Authority: VP People+ in deal? (yes/no)
- Pain: actively trying to solve HR analytics? (yes/no)
- Budget: confirmed > $50K? (yes/no)
- Timeline: decision in next 6 months? (yes/no)
```

5+ yes = strong lead. <3 yes = disqualify.

### Step 5 — Run `icp_scorer.py`
Audit ICP definition for specificity, score account lists against ICP.

```bash
python3 project-management/gtm/ideal-customer-profile/scripts/icp_scorer.py \
  --input icp_spec.json --format markdown
```

### Step 6 — Refresh per quarter
ICP shifts:
- New customers reveal new patterns
- Product evolution opens new segments
- Market shifts (recession, regulation, competition)

Don't refresh weekly. Quarterly is healthy.

## Decision frameworks

### Firmographic specificity test

For each dimension, ask:
- Could I send a list of companies matching this to my BDR tomorrow?
- If not, sharpen.

Vague: "growing SaaS companies"
Sharp: "US-headquartered B2B SaaS companies, $10M-$100M ARR, post-Series B, that have hired their first VP of Sales in last 12 months"

### Tech-stack signals

Tech stack reveals readiness:
- Have a CRM = likely structured sales process
- Have an HRIS = HR team beyond founder/HR-of-1
- Use a specific vendor = open to category
- Built in-house = NIH (Not Invented Here) bias risk

Tools like BuiltWith, G2, Crunchbase + scraping can reveal stack.

### Trigger event types

Strongest triggers (cause buying activity):
- New executive in role (60-day window)
- Funding round closed (have budget; want to spend strategically)
- M&A activity (integration needs)
- Regulatory deadline (compliance pressure)
- Major incident (urgent need)
- Vendor consolidation push
- Annual planning cycle (Q4)
- Reorg / department restructure

Weaker triggers:
- "They might want it"
- "They have the budget"

### Reachability test

For each ICP, can you:
- Find them via paid acquisition? (size of audience; CPC)
- Find them via outbound? (LinkedIn search, ZoomInfo, Apollo)
- Find them at events? (SHRM, RSA, AWS reInvent, etc.)
- Find them via content? (SEO keywords they search)
- Find them via partners? (which adjacent vendors)

If unreachable, ICP is academic.

## Common engagements

### "Define ICP for our new product"
1. Pull design partner / pilot data (or interview 5-10 ideal targets).
2. Document the 8 dimensions.
3. Build qualification rubric.
4. Validate with sales: can they recognize these in inbound?
5. Validate with marketing: can they target this list?

### "Refine ICP from closed customers"
1. List top 20 paying customers by health/expansion.
2. Find patterns: size, vertical, role, trigger, tech stack.
3. Document refined ICP.
4. Compare to original ICP: what's different?
5. Update qualification rubric + targeting.
6. Sunset segments not in refined ICP.

### "Pipeline conversion is bad — is it ICP?"
1. Audit closed-won vs closed-lost ICP fit scores.
2. Common failure: pipeline is full of "near-ICP" that don't convert.
3. Tighten qualification; reject more aggressively at intake.

## Anti-patterns to avoid

- **ICP = "everyone."** Diluted GTM.
- **ICP without trigger event.** Targets without urgency.
- **ICP unreachable via your channels.** Academic exercise.
- **ICP that doesn't disqualify anyone.** Not really an ICP.
- **Same ICP for 3 years post-launch.** Customers reveal real ICP; refresh.
- **ICP defined by product, not customer.** "Companies that need X" = solution-thinking.
- **ICP without qualification rubric.** Sales can't apply it.

## References

- `references/icp-dimensions-deep.md` — 8 dimensions in depth + signals
- `references/icp-refinement-from-data.md` — using closed customers to refine

## Related skills

- `project-management/gtm/gtm-strategy` — uses ICP as input
- `project-management/strategy-frameworks/business-model-canvas` — segments block
- `project-management/discovery/customer-interview-script` — interview-based ICP discovery
- `marketing/competitive-teardown` — competitive context
- `c-level-advisor/cro-advisor` — sales context
- `c-level-advisor/cmo-advisor` — marketing context

---

## identify-assumptions

Source path: `references/project-management/discovery/identify-assumptions/SKILL.md`

# Assumption Mapping Expert

## Overview

Systematically identify, categorize, and prioritize the assumptions underlying your product decisions. This skill extends Teresa Torres' four risk categories with four additional categories for new products, and uses a devil's advocate approach from PM, Designer, and Engineer perspectives to surface hidden assumptions.

## Core Capabilities

- **4-8 category risk model** — Value, Usability, Viability, Feasibility (Torres core) plus Ethics, Go-to-Market, Strategy, Team for new products.
- **Devil's advocate surfacing** — adversarial PM, Designer, and Engineer perspectives expose hidden assumptions.
- **Impact x Risk scoring** — `Risk Score = Impact x (1 - Confidence)` ranks what to test first.
- **Quadrant classification** — Test Now / Proceed / Investigate / Defer with category-matched validation methods.
- **Automated tracking** — `assumption_tracker.py` sorts by priority and suggests next actions.

## When to Use

- After ideation, before committing to build.
- When a product decision "feels right" but has not been validated.
- When the team disagrees on risk or priority -- assumptions make disagreements explicit.
- Before designing experiments -- test the riskiest assumptions first.

## Clarify First

Before mapping assumptions, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The decision or idea being mapped** — the specific product bet whose assumptions you surface (without it the map has no subject)
- [ ] **Product type** — new vs existing (determines whether to use the 4 core categories or the full 8-category model)
- [ ] **Impact and confidence basis** — what evidence sets each `impact` (1-10) and `confidence` (high/med/low) (drives `Risk Score = Impact × (1 − Confidence)` and quadrant placement)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
python3 scripts/assumption_tracker.py --demo            # built-in sample (8 assumptions)
python3 scripts/assumption_tracker.py input.json        # score & prioritize your assumptions
python3 scripts/assumption_tracker.py input.json --format json
```

Each assumption needs `description`, `category` (`value`/`usability`/`viability`/`feasibility`/`ethics`/`gtm`/`strategy`/`team`), `confidence` (`high`/`medium`/`low`), and `impact` (1-10). Document with `assets/assumption_map_template.md`.

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/methodology-and-tools.md](references/methodology-and-tools.md)** — the full 4-8 category tables with examples, the devil's advocate prompts, the 5-phase scoring/quadrant process, `assumption_tracker.py` usage and flags, output formats, troubleshooting, success criteria, and bibliography. Read when mapping or scripting assumptions.
- **[references/assumption-mapping-guide.md](references/assumption-mapping-guide.md)** — deep theory: Torres' four risks and the extended 8-category model with red flags per category, confidence calibration techniques (evidence-based, Five Whys, pre-mortem check), the prioritization matrix with tripwires, and assumption-to-experiment mapping. Read for the underlying framework.
- **[references/red-flags.md](references/red-flags.md)** — anti-patterns (assumption inflation, miscategorization, confidence without evidence) with bad/good examples anchored in Torres' categories. Read before sharing an assumption map.

## Scope & Limitations

**In Scope:** systematic assumption identification using PM/Designer/Engineer devil's advocate perspectives; 8-category risk classification; quantitative scoring with Impact x (1 - Confidence); quadrant classification with suggested validation methods; assumption registry with priority sorting and action plans.

**Out of Scope:** running validation experiments (`brainstorm-experiments/`); product strategy or roadmap decisions (`execution/outcome-roadmap/`); technical feasibility deep-dives (`engineering/` skills); financial modeling for viability (`finance/` skills).

**Important Caveats:** confidence levels map to fixed numeric values (0.8/0.5/0.2) — a simplification of continuous confidence; the "high impact" threshold is 7/10, adjustable for your risk tolerance; assumption mapping works best collaboratively (Product Trio), not solo.

## Integration Points

| Integration | Direction | Description |
|------------|-----------|-------------|
| `brainstorm-ideas/` | Receives from | Ideas generated become the subjects whose assumptions are mapped |
| `brainstorm-experiments/` | Feeds into | "Test Now" assumptions become hypotheses for experiment design |
| `pre-mortem/` | Complements | Pre-mortem catches risks that assumption mapping may miss (especially elephants) |
| `execution/create-prd/` | Feeds into | Validated assumptions populate the PRD Assumptions section (Section 7) |
| `execution/brainstorm-okrs/` | Feeds into | Viability assumptions inform OKR key result selection and confidence levels |
| `senior-pm/` | Feeds into | High-impact assumptions feed into portfolio risk registers |

---

## interview-synthesis

Source path: `references/project-management/discovery/interview-synthesis/SKILL.md`

# Customer Interview Synthesis Expert

## Overview

Turn customer interview transcripts into actionable product opportunities. This skill takes raw question-and-answer transcripts and produces three artifacts: (1) themed insight clusters, (2) an opportunity solution tree mapping outcomes to opportunities and candidate solutions, and (3) a prioritized list of follow-up questions to close evidence gaps.

The synthesis approach is grounded in Teresa Torres' Continuous Discovery Habits (opportunity solution trees), Steve Portigal's interview methodology (looking for stories and contradictions), and the Jobs-To-Be-Done synthesis approach popularized by Alan Klement (situation-motivation-outcome decomposition).

## Core Capabilities

- **Snippet extraction & coding** — stories, contradictions, surprises, emotions coded by need/job/pain/gain and evidence strength
- **Theme clustering** — evidence thresholds (>=3 snippets from >=2 participants) with scannable headlines
- **Opportunity solution tree** — measurable outcome → customer-side opportunities → candidate solutions, with intact evidence trails
- **Follow-up generation** — story-prompt questions targeting weak-evidence themes and unmapped assumptions
- **Multi-format output** — markdown, JSON, mermaid, confluence, notion, linear

### When to Use

- **Post-interview synthesis** -- You have 3-20 interview transcripts and need to extract themes before they become stale.
- **Opportunity space mapping** -- Building an opportunity solution tree before committing to solutions.
- **Discovery sprint readout** -- Sharing findings with the product trio (PM, Design, Engineering) and stakeholders.
- **Evidence gap analysis** -- Identifying which assumptions still lack interview evidence and need targeted follow-ups.

### When NOT to Use

- Quantitative survey synthesis -- use a data analysis skill instead.
- Usability test debriefs -- use a UX research-specific workflow.
- Sales call analysis for win/loss -- use `business-growth/` skills.

## Clarify First

Before synthesizing, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The transcripts** — how many (3-20) and their quality (synthesis is bounded by interview quality; thin input yields thin themes)
- [ ] **Target outcome** — the measurable outcome that becomes the root of the opportunity solution tree
- [ ] **Evidence threshold** — what counts as a theme (default ≥3 snippets from ≥2 participants; raising/lowering it changes which clusters surface)
- [ ] **Output consumer** — markdown / mermaid / Notion / Linear (sets the `--format` and shape of the deliverable)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
python scripts/interview_synthesizer.py --input interviews.json --format markdown --output synthesis.md
python scripts/interview_synthesizer.py --input interviews.json --format mermaid   # tree only
```

Prepare input per `assets/interview_input_template.json` (one entry per interview: participant id, role, q/a pairs). See the references for the full framework and flag reference.

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/synthesis-framework-and-tooling.md](references/synthesis-framework-and-tooling.md)** — the full 5-step framework (snippet extraction, coding, theme clustering, opportunity solution tree, follow-ups), end-to-end workflow, troubleshooting, success criteria, and the `interview_synthesizer.py` flag reference. Read when doing the synthesis or running the tool.
- **[references/synthesis-methodology-guide.md](references/synthesis-methodology-guide.md)** — full methodology with worked examples bundling Torres, Portigal, and Klement. Read for the deeper "why" and end-to-end playbook.
- **[references/red-flags.md](references/red-flags.md)** — concrete bad-vs-good examples of how synthesis output goes wrong and how to fix it. Read before sharing themes, a tree, or a readout.
- **[assets/interview_input_template.json](assets/interview_input_template.json)** — JSON schema for interview transcripts.
- **[assets/opportunity_tree_template.md](assets/opportunity_tree_template.md)** — editable opportunity solution tree template.

## Scope & Limitations

**In Scope:**
- Qualitative synthesis of 3-20 customer interview transcripts
- Theme clustering with evidence thresholds
- Opportunity solution tree generation (Mermaid + Markdown)
- Follow-up question generation for evidence gaps
- Multi-format output (Markdown, JSON, Mermaid, Confluence, Notion, Linear)

**Out of Scope:**
- Live interview facilitation -- this skill works on completed transcripts
- Quantitative analysis (survey statistics, click-stream data)
- Sentiment scoring via ML -- the tool uses deterministic keyword and code matching only
- Win/loss analysis -- use `business-growth/` skills
- Persona generation -- the output is opportunity-centric, not persona-centric

**Important Caveats:**
- Synthesis quality is bounded by interview quality. Garbage in, garbage out.
- The opportunity solution tree is a thinking aid, not a roadmap. Solutions still need experiment validation.
- Teresa Torres' methodology assumes continuous discovery (weekly touchpoints). One-off interview rounds produce shallower trees.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `discovery/brainstorm-experiments/` | Feeds into | Validated opportunities become hypotheses for lean experiments |
| `discovery/identify-assumptions/` | Bidirectional | Assumptions inform follow-up questions; interview evidence resolves assumptions |
| `discovery/brainstorm-ideas/` | Feeds into | Themed insights seed Product Trio ideation sessions |
| `discovery/pre-mortem/` | Feeds into | Pain themes surface candidate risks for pre-mortem analysis |
| `execution/create-prd/` | Feeds into | Top opportunities + supporting evidence populate PRD Background and Market Segments sections |
| `execution/job-stories/` | Feeds into | Klement-format job codes convert directly into When/Want/So job stories |

---

## jira-expert

Source path: `references/project-management/jira-expert/SKILL.md`

# Atlassian Jira Expert

Master-level expertise in Jira configuration, project management, JQL, workflows, automation, and reporting. Handles all technical and operational aspects of Jira.

## Core Capabilities

- **Project configuration** — create Scrum/Kanban/custom projects, design custom workflows, configure issue types/fields/screens, set permission and security schemes
- **JQL mastery** — author advanced queries, build complex filters, optimize query performance, create saved filters for teams
- **Automation & integration** — design automation rules, configure webhooks and notifications, integrate Confluence/Slack/external tools
- **Reporting & dashboards** — custom dashboards with gadgets, sprint/velocity/burndown reports, portfolio-level and executive reporting

## When to Use

- Setting up a new project and its workflow, fields, and board
- Writing or debugging JQL for filters, reports, or dashboards
- Designing automation rules and avoiding trigger loops
- Building dashboards and configuring gadgets for a team or exec
- Managing custom fields, issue links, security levels, or bulk operations

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/jira-playbook.md](references/jira-playbook.md)** — full detail behind this map: competencies, workflows (project creation, workflow design, dashboards, automation), JQL operators/functions, advanced features (custom fields, linking, security, bulk ops), reporting templates, decision/handoff protocols, best practices, troubleshooting table, and success criteria. Read when executing any Jira task.
- **[references/jql-examples.md](references/jql-examples.md)** — extended library of ready-to-run JQL queries grouped by use case (sprints, and more). Read when you need a specific query pattern fast.
- **[references/automation-examples.md](references/automation-examples.md)** — concrete Jira automation rule recipes (auto-assignment, and more) with triggers/conditions/actions. Read when building or troubleshooting automation rules.
- **[references/red-flags.md](references/red-flags.md)** — common ways a Jira configuration, JQL query, automation rule, or dashboard goes wrong, with bad/good examples. Read before shipping any change to a team.

## Scope & Limitations

**In Scope:** Jira project creation and configuration, workflow design and implementation, JQL query authoring and optimization, automation rule design, dashboard and reporting setup, custom field management, board configuration, bulk operations, issue linking strategies.

**Out of Scope:** Org-wide Atlassian administration (hand off to `atlassian-admin/`), Confluence space management (hand off to `confluence-expert/`), sprint execution and team coaching (hand off to `scrum-master/`), strategic project prioritization (hand off to `senior-pm/`).

**Limitations:** Jira Cloud automation has monthly execution limits per plan tier. Complex JQL on large instances (>100K issues) may hit performance ceilings. Workflow changes to active projects require careful migration planning -- retroactive changes do not apply to in-flight issues.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `atlassian-admin/` | Admin -> Jira | Global schemes, permission templates, user provisioning |
| `scrum-master/` | SM -> Jira | Sprint board configuration requests, velocity report needs |
| `senior-pm/` | PM -> Jira | Portfolio-level reporting requirements, cross-project dashboards |
| `confluence-expert/` | Bidirectional | Jira macros embedded in Confluence pages; documentation links in issue descriptions |
| `atlassian-templates/` | Templates -> Jira | Issue description templates, workflow documentation |
| `delivery-manager/` | DM -> Jira | Release version management, deployment tracking fields |

---

## job-stories

Source path: `references/project-management/execution/job-stories/SKILL.md`

# Job Stories Expert

## Overview

Write job stories using the Jobs-to-Be-Done (JTBD) framework. Unlike traditional user stories that focus on roles ("As a user..."), job stories focus on the situation, motivation, and desired outcome. This shift produces requirements that are more grounded in real user context and less likely to encode assumptions about who the user is.

The format is `When [situation], I want to [motivation], so I can [outcome].` Removing the role and describing the *situation* matters because the same person has different needs in different situations, different people in the same situation share needs, and situations are observable and testable while roles are abstract labels.

## Core Capabilities

- **JTBD discovery canvas** — surface functional/social/emotional jobs, pains, and gains, then map each to a job-story component.
- **Story writing** — author situations, motivations, and outcomes that are specific, solution-agnostic, and benefit-focused.
- **Quality gating** — apply the six INVEST criteria and write 6-8 outcome-focused acceptance criteria per story.
- **Conversion & facilitation** — convert traditional user stories to job stories and run story-writing workshops.

## When to Use

- **Feature definition** -- When you need to articulate what to build and why, grounded in user context.
- **Backlog creation** -- When populating a backlog with work items that stay focused on user outcomes.
- **Requirement workshops** -- When collaborating with stakeholders to define what "done" looks like.
- **Design briefs** -- When giving designers context about the situation and motivation behind a feature.

### When NOT to Use

- When you need strategic backlog items with business context -- use `wwas/` instead.
- When you need lightweight stories for a team already fluent in user story format.
- When the work is purely technical with no direct user-facing situation.

## Clarify First

Before writing job stories, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Situation / trigger** — the "When" anchors the entire story; a vague situation produces a persona-style story in disguise
- [ ] **Underlying job & motivation** — the functional/social/emotional job behind the "I want to"; without it the story encodes a solution, not a need
- [ ] **Desired outcome / progress** — the "so I can" the user is trying to reach; drives the outcome-focused acceptance criteria
- [ ] **Source of user research** — interviews/observation/support data vs guesswork; without grounding, situations get invented and may not reflect reality

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```
When [situation], I want to [motivation], so I can [outcome].
```

1. Run the JTBD discovery canvas (or pull from research) to find job-pain-gain clusters.
2. Write one job story per cluster in the When/Want/So format.
3. Apply INVEST; split any story that fails the Small or Independent test.
4. Add 6-8 observable, outcome-focused acceptance criteria per story.

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/job-stories-playbook.md](references/job-stories-playbook.md)** — the full procedure: JTBD discovery canvas template + canvas-to-story mapping, format details, writing-quality tables, INVEST table, story-card template, acceptance-criteria guidelines, worked example, troubleshooting, and success criteria. Read when writing or refining stories.
- **[references/jtbd-guide.md](references/jtbd-guide.md)** — JTBD theory, job-story vs user-story comparison, techniques for discovering situations, and story-splitting strategies. Read to understand the framework or decide which story format to use.
- **[references/red-flags.md](references/red-flags.md)** — common ways job stories go wrong, each with a bad/good example and how to catch it. Read before stories enter sprint planning.
- **[assets/job_story_template.md](assets/job_story_template.md)** — ready-to-use job story card template. Use when drafting a story.

## Scope & Limitations

**In Scope:** Writing job stories using JTBD "When/Want/So" format, applying INVEST quality criteria, writing outcome-focused acceptance criteria, converting existing user stories to job stories, facilitating story-writing workshops, integrating job stories with Jira backlog items.

**Out of Scope:** Strategic backlog items with business context (hand off to `wwas/`), product ideation and opportunity discovery (hand off to `discovery/brainstorm-ideas/`), detailed technical specifications, UX research and user interviewing methodology.

**Limitations:** Job stories work best when the team has access to real user research (interviews, observation, support data). Without user context, teams will invent situations that may not reflect reality. The format is less natural for purely technical or infrastructure work where there is no direct user situation. Job stories and user stories are complementary -- some teams use both formats for different types of work.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `wwas/` | Complementary | WWAS adds strategic "Why" context; job stories add situational "When" context. Use both when needed |
| `summarize-meeting/` | Meetings -> Stories | Discovery conversations and refinement sessions produce the situations that inform job stories |
| `../jira-expert/` | Stories -> Jira | Completed job stories become Jira tickets with structured descriptions |
| `discovery/brainstorm-ideas/` | Ideas -> Stories | Validated product ideas decompose into job stories for the backlog |
| `execution/brainstorm-okrs/` | OKRs -> Stories | Team objectives define the outcomes that job stories should connect to |
| `execution/prioritization-frameworks/` | Stories -> Prioritization | Job stories scored via RICE or other frameworks for sprint planning |

---

## jtbd-workshop

Source path: `references/project-management/discovery/jtbd-workshop/SKILL.md`

# JTBD Workshop Expert

## Overview

Run a Jobs-To-Be-Done (JTBD) workshop end-to-end. This skill is the workshop facilitation companion to the `execution/job-stories/` skill (the *writing format* for backlog stories). Where `job-stories/` produces When/Want/So statements for individual backlog items, this skill produces the *upstream discovery output* -- the job hierarchy, the forces driving switching behavior, and the desired-outcome statements that anchor product strategy.

The workshop synthesizes four JTBD schools: Christensen's *milkshake* hiring frame, Ulwick's Outcome-Driven Innovation (ODI) with importance/satisfaction scoring, Klement's situation-motivation-outcome canvas (the *job story* format), and Moesta's switch interview method surfacing the four forces of progress (push, pull, anxiety, habit). A well-run workshop produces three artifacts: a ranked job hierarchy with measurable outcome statements, a forces-of-progress map, and a prioritized opportunity list ready to feed PRDs, OKRs, or roadmap themes.

## Core Capabilities

- **Workshop facilitation** -- 2hr / 4hr / 8hr agendas with time-blocked outcomes
- **Switch interviews** -- four-anchor timeline script (First Thought -> Passive -> Active -> Deciding -> First Use)
- **Forces-of-progress mapping** -- push, pull, anxiety, habit canvas and the switch equation
- **ODI outcome scoring** -- Ulwick outcome statements with Importance x Satisfaction opportunity scores
- **Handoff** -- opportunity statements into assumptions, experiments, PRDs, and roadmap themes

## When to Use

- **New product or new segment.** Understand the underlying progress customers are trying to make before building.
- **Pivot or strategy reset.** Team is stuck debating features; re-ground in the customer's job.
- **Pre-roadmap.** Define the job hierarchy before committing to a quarterly or annual roadmap.
- **Stalled adoption.** Customers signed up but did not retain; switch interviews reveal which forces went wrong.
- **Onboarding a new product team.** Create a shared mental model of what the customer is hiring the product to do.

## Clarify First

Before planning the workshop, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Format** — 2h validation / 4h half-day / 8h full-day (sets the agenda depth; 2h is validation, not primary discovery)
- [ ] **Target segment** — JTBD is segment-by-job, not persona-by-demographic (defines who you study and which job hierarchy you build)
- [ ] **Switch-interview access** — can you recruit recent (90-day) switchers (without customer voice the forces canvas and ODI scores become team-aligned fiction)
- [ ] **Trigger/purpose** — new product / pivot / stalled adoption (shapes which of the four forces to emphasize)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

1. Pick a format (2h validation / 4h half-day / 8h full-day) by stakes and availability; define the segment.
2. Recruit 6-12 recent (90-day) switchers and run pre-work switch interviews.
3. Facilitate the agenda; build the job hierarchy, score outcomes (Importance x Satisfaction), fill the forces canvas.
4. Convert top-scored outcomes into opportunity statements (`<verb> <object> <context>`) with named owners.
5. Hand off to `identify-assumptions/`, `brainstorm-experiments/`, or `create-prd/`. Revisit quarterly.

## References

Load the reference that matches the task -- keep this file lean and pull detail on demand:

- **[references/facilitation-playbook.md](references/facilitation-playbook.md)** -- the full operational playbook: 2h/4h/8h agendas, switch interview script, forces canvas, ODI outcome format, common traps, the 10-step workflow, troubleshooting, and success criteria. Read this when planning or running a workshop.
- **[references/jtbd-method-guide.md](references/jtbd-method-guide.md)** -- full JTBD methodology (Christensen, Ulwick, Klement, Moesta) with worked examples. Read this when you need the theory behind the workshop activities.
- **[references/red-flags.md](references/red-flags.md)** -- 12 JTBD anti-patterns (solution-coded jobs, missing forces, speculation without switch interviews) with symptoms and fixes. Read this when reviewing or QA-ing workshop output.

Workshop templates live in `assets/`: `workshop_agenda_2hr.md`, `workshop_agenda_4hr.md`, `workshop_agenda_8hr.md`, `pre_work_email.md`, `switch_interview_script.md`, `forces_of_progress_canvas.md`.

## Scope & Limitations

**In scope:** 2h/4h/8h formats; switch interview script and four-anchor timeline; forces-of-progress mapping; Ulwick outcome statements with Importance x Satisfaction scoring; Klement situation-motivation-outcome decomposition (bridge to `execution/job-stories/`); pre-work email and participant brief.

**Out of scope:** writing individual backlog stories (`execution/job-stories/`); quantitative ODI surveying at scale; recording/transcription tooling; recruiting operations; personas (JTBD is segment-by-job, not persona-by-demographic).

**Caveats:** switch interviews require *recent* (90-day) switchers; the 2-hour format is for validation, not primary discovery; ODI scoring is sensitive to who is in the room (internal scores are hypotheses, customer-derived scores are truth); a workshop without customer voice produces team-aligned fiction.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `discovery/customer-interview-script/` | Receives from | Switch interviews use the base interview script structure |
| `discovery/interview-synthesis/` | Receives from | Synthesized themes seed the snippet wall on workshop day |
| `discovery/identify-assumptions/` | Feeds into | Top outcomes become assumptions to test |
| `discovery/brainstorm-experiments/` | Feeds into | Forces-of-progress weaknesses become experiment hypotheses |
| `discovery/value-proposition-canvas/` | Feeds into | Jobs, pains, gains populate the Customer Profile |
| `execution/job-stories/` | Feeds into | Job + outcome decomposition becomes When/Want/So backlog stories |
| `execution/create-prd/` | Feeds into | Job hierarchy populates PRD Section 5; outcomes populate Section 6 |
| `execution/outcome-roadmap/` | Feeds into | Top desired outcomes become roadmap themes |
| `execution/north-star-metric/` | Feeds into | The highest-priority outcome often becomes the input metric tree root |

---

## launch-playbook

Source path: `references/project-management/execution/launch-playbook/SKILL.md`

# Launch Playbook (Internal + External Coordination)

## Overview

A complete launch coordination playbook for software products and features. It covers the three windows that matter -- pre-launch (T-30 to T-1), launch day (T-0), and post-launch (T+1 to T+30) -- and produces five concrete artifacts: a run-of-show, an internal comms plan, an external comms checklist, a rollback plan, and a post-launch retro template.

Most failed launches are not failed builds; they are failed coordination. Engineering ships on time, but support has not been trained, sales does not have collateral, the changelog is wrong, the rollback path was never tested, and the executive sponsor hears about a customer complaint before hearing about the launch. This playbook prevents those failures by assigning every owner and every artifact before T-30.

## Core Capabilities

- **Three-launches sequencing** — Cagan's alpha/beta/GA model de-risks the launch; this skill owns the GA window.
- **T-30 to T+30 timeline** — day-by-day pre-launch, launch-day, and post-launch action plan across all workstreams.
- **Launch-type selection** — big bang vs progressive rollout vs dark launch decision rules (and how to combine them).
- **RACI ownership** — every workstream assigned across PM, Eng, PMM, Sales, Support, Legal, Exec.
- **Five artifacts** — run-of-show, internal comms plan, external comms checklist, rollback plan, post-launch retro.

## When to Use

- **GA after closed beta** -- A feature is exiting beta (see `beta-program/`) and needs coordinated launch.
- **Major version release** -- Significant new functionality with cross-functional dependencies (sales enablement, support training, legal review).
- **Re-launch / repositioning** -- An existing feature is being relaunched with new positioning, pricing, or audience.
- **High-blast-radius change** -- Infrastructure migration, pricing change, or breaking API change requiring tightly coordinated comms.

**When NOT to use:** continuous-delivery bug fixes and minor improvements (use `release-notes/` only); internal-only changes with no external comms (use a release runbook); product sunsets and deprecations (use `eol-communication/`).

## Clarify First

Before building the launch plan, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Launch date (T-0)** — anchors the entire T-30→T+30 timeline and every artifact deadline
- [ ] **Launch type** — big bang / progressive rollout / dark launch drives the run-of-show and the rollback plan
- [ ] **Cross-functional owners (RACI)** — every workstream named across PM/Eng/PMM/Sales/Support/Legal; a missing owner is the #1 cause of failed launches
- [ ] **Exec sponsor** — holds go/no-go authority and receives the T-1/T+1/T+7/T+30 updates

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

1. **Kickoff at T-30.** Confirm date, launch type, and exec sponsor; open the run-of-show and internal comms plan assets.
2. **Assign the RACI** within 48 hours — every workstream named.
3. **Build and sign off the five artifacts before T-7**; test the rollback drill by T-7.
4. **Go/no-go at T-3**, run launch day from one run-of-show, stabilize T+1 to T+7, run the 30-day retro.

Full timeline tables, RACI matrix, launch-type rules, and the 10-step workflow are in `references/launch-timeline-and-execution.md`.

## References

- `references/launch-timeline-and-execution.md` — read this when planning/running the launch: three-launches framework, full T-30→T+30 timeline, launch-type selection, RACI matrix, 10-step workflow, troubleshooting, and success criteria.
- `references/launch-coordination-guide.md` — read this for the reasoning behind the playbook: three-launches sequencing, RACI worked examples, big-bang vs progressive decision rules, and anti-patterns.
- `references/red-flags.md` — read this before signing off any launch artifact: common failure modes with bad/good examples and fixes.
- `assets/launch-run-of-show.md` — hourly run-of-show template for launch day.
- `assets/internal-comms-plan.md` — pre-launch, launch-day, and post-launch internal comms templates.
- `assets/external-comms-checklist.md` — T-30 to T-0 checklist for press, blog, social, email, sales enablement, support training, and legal review.
- `assets/rollback-plan.md` — rollback decision matrix, drill checklist, and execution runbook template.
- `assets/post-launch-retro.md` — 7-day and 30-day retrospective template.
- Cagan, Marty. *Inspired: How to Create Tech Products Customers Love*. Wiley, 2018.

## Scope & Limitations

**In Scope:** GA launch coordination across Engineering, Product, PMM, Sales, Support, Legal; run-of-show, rollback plan, comms plans, post-launch retrospective; big bang, progressive rollout, and dark launch patterns; T-30 to T+30 timeline; RACI assignment for cross-functional launches.

**Out of Scope:** Beta program execution (`beta-program/`); release notes content generation (`release-notes/`); end-of-life / sunset communication (`eol-communication/`); incident response runbooks (`delivery-manager/` and engineering on-call); marketing campaign performance analysis beyond the 30-day window (handoff to demand gen).

**Important Caveats:** A launch is not a moment; it is a 60-day window (T-30 to T+30) -- staff accordingly. The single most common cause of failed launches is a missing RACI assignment, not a missing artifact: if you can name the artifact but not the owner, the artifact will not exist. Big-bang launches concentrate risk on one date; default to progressive rollout unless marketing leverage justifies the risk.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `beta-program/` | Receives from | Greenlit beta hands off testimonials, known issues, and pricing decision |
| `create-prd/` | Receives from | PRD provides positioning, segments, and v1 scope |
| `release-notes/` | Feeds into | Launch produces the GA release notes |
| `daci-framework/` | Uses | Major launch decisions (go/no-go, rollback) use DACI |
| `eol-communication/` | Complementary | Launches that replace older features trigger sunset comms |
| `delivery-manager/` | Uses | Deployment, on-call rota, and rollback execution |
| `senior-pm/` | Reports to | Exec sponsor receives T-1, T+1, T+7, T+30 updates |
| `summarize-meeting/` | Feeds into | War-room standups and retro produce structured summaries |
| `status-update-generator/` | Feeds into | Post-launch metrics roll up into weekly status |

---

## lean-canvas

Source path: `references/project-management/strategy-frameworks/lean-canvas/SKILL.md`

# Lean Canvas

A 9-block startup canvas adapted from BMC. Replaces 4 BMC blocks
(Key Resources, Activities, Partnerships, Customer Relationships) with
startup-focused ones (Problem, Solution, Key Metrics, Unfair Advantage).

## When to use this skill

- **Early-stage** (pre-PMF) product or company
- Capturing **assumptions** that need testing
- **20-minute** model sketch (BMC takes longer)
- **Pivot conversations** — what would change?
- Stress-testing **unfair advantage** before building

## The 9 Lean Canvas blocks

1. **Problem** — Top 3 problems for the segment
2. **Customer Segments** — Target customers (especially Early Adopters)
3. **Unique Value Proposition** — Single, clear, compelling message
4. **Solution** — Top 3 features that solve the problems
5. **Channels** — Path to customers
6. **Revenue Streams** — Revenue model + LTV + revenue forecast
7. **Cost Structure** — Customer acquisition cost + distribution + people + hosting
8. **Key Metrics** — Key activities you measure
9. **Unfair Advantage** — Something that cannot be easily copied or bought

## Lean Canvas vs BMC

| Lean Canvas | BMC |
|-------------|-----|
| Problem | Key Partnerships |
| Solution | Key Activities |
| Key Metrics | Key Resources |
| Unfair Advantage | Customer Relationships |

Same outer shape; different inner emphasis. Use Lean when problem +
unfair advantage matter more than ops detail.

## Clarify First

Before building the canvas, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The specific early-adopter segment** — named, not "everyone" (the Problem, UVP, and Channels blocks all hinge on a concrete early adopter)
- [ ] **The top 3 problems** — for that segment (the Problem block; if you can't name them you have an idea, not a startup)
- [ ] **Existing alternatives** — how customers solve this today (signals whether the problem is real; "they live with it" is important signal)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

### Step 1 — Problem-Segment first
Start with Problem and Customer Segments. If you can't list the top 3
problems for a specific segment, you don't have a startup — you have an idea.

### Step 2 — Existing alternatives
Within Problem block, list how customers solve this today. If the answer
is "they don't / they live with it," that's important signal.

### Step 3 — Unique Value Proposition
A single sentence that:
- Names the early-adopter segment
- States the differentiating outcome
- Distinguishes from existing alternatives

Template: "[Outcome] for [segment] that [differentiator]."

### Step 4 — Solution (3 features max)
Limit to 3. Founders always want to list 10. Resist.

### Step 5 — Unfair Advantage
The hardest block. What do you have that no one can easily copy?
- Insider information / domain
- Personal authority / reputation
- Dream team
- Personal endorsements
- Existing customer base
- Network effects already in motion
- Patented IP

If empty: most startups have nothing yet. Mark explicitly + plan how to build one.

### Step 6 — Channels, Revenue, Costs, Metrics
Fill remaining blocks. Be specific.

### Step 7 — Run `lean_canvas_validator.py`
Audit for: missing blocks, generic content, no early adopter named,
no existing alternatives, no Key Metrics, vague Unfair Advantage.

```bash
python3 project-management/strategy-frameworks/lean-canvas/scripts/lean_canvas_validator.py \
  --input canvas.json --format markdown
```

## Decision frameworks

### Lean Canvas vs BMC — when to use which

| Use Lean Canvas | Use BMC |
|-----------------|---------|
| < $1M ARR or pre-revenue | Mature company / division |
| Single segment, single product | Multi-product or multi-segment |
| Problem-solution fit hunting | Operating + scaling |
| Pivot conversations | Strategic planning |
| 20-minute sketch | Half-day planning workshop |

### Early adopter heuristic

Early adopters are not "future mainstream users." They are:
- Aware they have the problem
- Actively looking for a solution
- Have cobbled together a workaround (existing alternative)
- Have budget / authority to try yours

If you can't name 5 specific early adopters by name + workaround, you're
not at problem-solution fit yet.

### Unfair Advantage — what counts

**Counts:**
- Insider information (proprietary data, deep customer relationships)
- Personal authority (industry-recognized expertise)
- Existing community / audience
- Network effects already started
- Capital + brand recognition

**Doesn't count:**
- "We work harder"
- "Our team is great"
- "First mover" (in most cases; usually replicable)
- "Better UX" (replicable)
- "AI" (everyone has AI now)
- "Cheaper" (price competition is a race to zero)

If your only unfair advantage is "speed" or "execution," that's a
weakness as a moat.

## Common engagements

### "Help me sketch a canvas for my new idea"
1. Problem + Segment first.
2. Force list the existing alternatives (and what they cost).
3. Write the UVP (one sentence).
4. List Solution as 3 features max.
5. Identify Channels you can realistically test in 4 weeks.
6. Stub Revenue + Cost + Metrics.
7. Honest Unfair Advantage assessment.
8. Identify top 3 riskiest assumptions; design test for each.

### "Should we pivot?"
1. Build current state Lean Canvas.
2. Build proposed state Lean Canvas.
3. Compare: what's different? what's the unfair advantage now?
4. What evidence do we have that the new model works?
5. Run the assumption-test for the riskiest new assumption.

## Anti-patterns to avoid

- **Solution before Problem.** Solution-in-search-of-problem.
- **"Everyone" as segment.** Force a specific early adopter description.
- **No existing alternative listed.** Customers always do something today.
- **UVP that says everything.** Says nothing.
- **5+ solution features listed.** Pick 3 max.
- **Vague Key Metrics.** Pirate metrics (AAARRR) or HEART or similar.
- **Unfair Advantage = "execution".** Not an advantage.
- **No assumption register.** Canvas isn't a plan, it's a hypothesis.

## References

- `references/lean-canvas-framework.md` — the 9 blocks deep, comparison to BMC
- `references/lean-startup-anti-patterns.md` — common mistakes + worked fixes

## Related skills

- `project-management/strategy-frameworks/business-model-canvas` — operating-scale variant
- `project-management/discovery/value-proposition-canvas` — deeper on UVP
- `project-management/discovery/identify-assumptions` — assumption register
- `project-management/discovery/pre-mortem` — risk discovery
- `project-management/execution/north-star-metric` — Key Metric definition
- `c-level-advisor/ceo-advisor` — strategic context

---

## linear-expert

Source path: `references/project-management/linear-expert/SKILL.md`

# Linear Expert

Master-level expertise in Linear configuration, workflow design, GraphQL API mastery, Cycle and Project management, Initiative-level roadmaps, triage automation, GitHub integration, and migration from Jira. Covers everything from workspace setup to programmatic bulk operations against the Linear API.

## Overview

Linear is an opinionated, keyboard-driven issue tracker built around a strict data model (Team → Project → Issue → Sub-issue) and a GraphQL-only public API. Unlike Jira, Linear's strength is its lack of configurability: there is one workflow shape (Backlog → Unstarted → Started → Completed → Canceled), one priority scale (0-4), and a tight set of first-class concepts (Cycles, Projects, Initiatives, Labels, Milestones). The job of a Linear expert is to operate fluently inside those rails while extending the system through the API, automations, and integrations.

## Core Capabilities

- **Workspace & team configuration** — URL keys, SSO, team keys, cycle cadence, estimation scales, workflow states, label taxonomy
- **Planning hierarchy** — Cycles (sprints), Projects + Milestones, Initiatives, and Roadmap views
- **Triage automation** — inbound routing from Slack, support, GitHub Issues; daily triage SOP
- **GraphQL API mastery** — query/mutation authoring, pagination, batch mutations, webhooks, rate-limit hygiene
- **GitHub integration** — magic-word auto-link/auto-close, branch auto-linking, PR-state syncing
- **Bulk operations & migration** — API-driven bulk edits and Jira → Linear migration planning

## When to Use

- Setting up a new Linear workspace, team, or project from scratch
- Designing Cycle cadence, triage rules, and SLA workflows
- Writing GraphQL queries and mutations against the Linear API
- Configuring GitHub PR auto-link/auto-close and Slack notifications
- Building Initiative / Project / Milestone hierarchies for executive roadmaps
- Running bulk operations (relabel, retarget, reassign) across hundreds of issues
- Migrating an existing Jira instance to Linear without losing history
- Diagnosing why automations, sub-issues, or triage rules are not firing as expected

## Quick Start

Linear's API is GraphQL-only at `https://api.linear.app/graphql`; auth via personal API key (`Authorization: <key>`) or OAuth2.

```bash
linear_query() {
  curl -s -X POST https://api.linear.app/graphql \
    -H "Authorization: $LINEAR_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"query\": \"$1\"}"
}
```

Cache team/label/state UUIDs locally, use nested selection to avoid N+1 calls, and prefer webhooks over polling. See the references below for the full query catalog and operating workflows.

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/linear-concepts-and-workflows.md](references/linear-concepts-and-workflows.md)** — Linear data model, the 7 core workflows (setup, cycle/project planning, initiatives, triage, GitHub, bulk ops, Jira migration), best practices, and success criteria. Read when configuring a workspace or running any of the core operating workflows.
- **[references/linear-graphql-patterns.md](references/linear-graphql-patterns.md)** — canonical query and mutation catalog with variables, plus inline quick examples and CLI patterns. Read when authoring any GraphQL query/mutation or scripting against the API.
- **[references/linear-vs-jira.md](references/linear-vs-jira.md)** — concept-by-concept translation guide for teams migrating from Jira. Read before planning a Jira → Linear migration.
- **[references/red-flags.md](references/red-flags.md)** — common anti-patterns (cycle-as-sprint, project bloat, N+1, untriaged inbox, unsigned webhooks) plus the troubleshooting table. Read before applying config/queries to a team or when diagnosing failures.
- **[assets/linear-team-template.md](assets/linear-team-template.md)** — recommended new-team configuration. Read when standing up a new team.
- **[assets/linear-triage-workflow.md](assets/linear-triage-workflow.md)** — daily triage SOP and rotation template. Read when staffing or designing triage.
- Linear API docs: https://developers.linear.app/docs
- Linear GraphQL schema explorer: https://studio.apollographql.com/public/Linear-API/
- Linear method (workspace conventions): https://linear.app/method

## Scope & Limitations

**In Scope:** Linear workspace, team, and project configuration; cycle and project planning; Initiative and Roadmap hierarchy; triage workflow design; GitHub PR integration; GraphQL query and mutation authoring; bulk operations via API; webhook configuration; Jira → Linear migration planning and execution.

**Out of Scope:** Jira-side configuration and migration freeze (hand off to `jira-expert/`); Notion documentation pages for Linear roadmaps (hand off to `notion-pm/`); strategic prioritization and OKR setting (hand off to `senior-pm/`, `execution/brainstorm-okrs/`); sprint coaching and team health (hand off to `scrum-master/`); release notes generation from Linear issues (hand off to `execution/release-notes/`).

**Limitations:** Linear has no custom fields; all extension happens through labels, descriptions, or external systems. The free tier caps at 250 issues per workspace and excludes Initiatives and SAML. API rate limits are workspace-wide and shared across all keys; heavy automation may require coordination. Importers preserve most history but cannot recreate Jira's custom workflow states; mapping is many-to-five. GraphQL schema evolves continuously; pin client code to the deprecation calendar.

## Integration Points

| Integration | Direction | What Flows |
|---|---|---|
| `jira-expert/` | Jira → Linear | Migration mappings, custom-field translation, freeze coordination |
| `notion-pm/` | Linear → Notion | Roadmap embeds, Initiative pages, project status rollups |
| `execution/create-prd/` | PRD → Linear | PRD page becomes the Linear Project description; PRD sections become Milestones |
| `execution/brainstorm-okrs/` | OKR → Linear | Initiatives mapped to Objectives; Projects tagged with KR identifiers |
| `execution/outcome-roadmap/` | Roadmap → Linear | Outcome roadmap rows mapped to Linear Initiatives; outputs become Projects |
| `execution/release-notes/` | Linear → Release Notes | Closed issues in a cycle/project become release note line items |
| `execution/prioritization-frameworks/` | Scoring → Linear | RICE/WSJF scores written back to labels or description fields |
| `scrum-master/` | Linear → Analytics | Cycle data feeds velocity_analyzer.py and sprint_health_scorer.py |
| `senior-pm/` | Linear → Portfolio | Initiative-level rollups feed project_health_dashboard.py |
| `delivery-manager/` | Linear → Release | Project completion state and milestone dates feed release coordination |

---

## meeting-analyzer

Source path: `references/project-management/meeting-analyzer/SKILL.md`

# Meeting Analyzer

Meetings fail at the seam between talking and tracking. The decision gets made
and nobody records who approved it; the action gets stated and nobody's name
lands on it; the same topic returns for the seventh week because discussing it
feels productive and deciding it feels risky. This skill closes that seam with
deterministic extraction — pattern rules, no model calls — and then follows the
commitments across meetings to see which ones actually close.

## Scope note

This is the **accountability** lens on meetings, not the summary lens. It
extracts and tracks; it does not write the polished recap. Use it on notes that
already exist, across a series, when the question is "did anything we said we
would do actually happen?"

## When to use this skill

- **Actions keep getting dropped** — items agreed in one meeting quietly
  reappear three weeks later, or never do
- **A recurring meeting feels pointless** — you need decision density and topic
  churn measured before proposing to cancel it
- **Notes exist but no register does** — months of markdown notes with decisions
  buried in prose that nobody can find or count
- **The same topic returns every week** — you need evidence of churn to force a
  decision owner and a deadline
- **Preparing a retro or a meeting audit** — completion rates and ageing per
  meeting show which rituals produce work that gets done
- **Onboarding onto an existing project** — extracting the decision log from
  past notes reconstructs why the system looks the way it does

## Inputs the skill expects

- Meeting notes or transcripts as markdown or plain text, one file per meeting
- Ideally several meetings from the same series, so trends are visible
- An action-item register with created date, due date, owner, status and
  carry-over count (the parser bootstraps this from notes)
- Per-occurrence series data: attendance, duration, decisions, actions, whether
  an agenda was posted and notes published, and the topics covered
- The reference date for ageing calculations, if not "the newest date in the data"
- Which meeting types to exclude from decision-density scoring (retros,
  brainstorms, incident reviews legitimately decide little)

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Whether owners and dates may be inferred** — the answer is no by default; a fabricated due date enters the tracker looking legitimate and is far more damaging than a flagged gap
- [ ] **Meeting type** — a retro or brainstorm scored on decision density will look broken when it is working exactly as intended
- [ ] **The reference date for ageing** — "overdue" is meaningless without it, and pulling from the system clock makes yesterday's report irreproducible
- [ ] **Who sees the per-owner output** — aggregate for the team, per-person only in a 1:1; low follow-through is usually over-assignment, not under-delivery

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Extract an accountable register from raw notes

1. Point the parser at the notes file. It buckets every item into decisions,
   actions and open questions, and pulls owner and due date from each action.
2. Read the completeness rate first. Anything under 60% means the meeting
   produced intentions, not commitments.
3. Work the flagged gaps **in the room or in the thread the same day**. Asking
   "who owns this?" a week later means reconstructing a conversation nobody
   remembers, and the answer becomes whoever feels most guilty.
4. Never infer a missing owner or date. A flagged gap is the deliverable — it is
   the thing that gets fixed.
5. Add `--strict` in CI over a notes directory to fail the build when a meeting
   lands actions with no owner or date.

```bash
python3 project-management/meeting-analyzer/scripts/meeting_notes_parser.py \
  --input project-management/meeting-analyzer/assets/sample_notes.md \
  --format text --strict
```

### Workflow 2 — Track follow-through across a series

1. Append each meeting's extracted actions to a register in
   `assets/sample_commitments.json` shape, keeping `created`, `due`, `owner`,
   `status` and `carried_over`.
2. Run the tracker with an explicit `--as-of` so the report is reproducible.
3. Read in this order: completion rate, the ageing distribution, then per
   meeting. Per-owner comes last and never first.
4. Act on the 30+ day band — close, reassign, or explicitly drop. An action
   auto-closed at 30 days that genuinely mattered gets re-opened within a week;
   one that nobody notices did not matter.
5. Apply the three-strike rule to anything with `carried_over >= 3`: re-commit
   with a date the owner states out loud, or drop it. There is no fourth carry.

```bash
python3 project-management/meeting-analyzer/scripts/commitment_tracker.py \
  --input project-management/meeting-analyzer/assets/sample_commitments.json \
  --as-of 2026-07-21 --format text
```

### Workflow 3 — Diagnose a recurring meeting that decides nothing

1. Assemble 8-12 occurrences with attendance, decisions, actions, agenda and
   notes compliance, and the topics covered.
2. Run the diagnostic. It returns decision density, churning topics, attendance
   trend, and a KEEP / RESTRUCTURE / ASYNC / KILL verdict with a prescription.
3. Check the exclusions before acting — retros and brainstorms score badly by
   design and should be removed from the input, not accommodated by lowering
   the floor.
4. Take the churning topics to the room with the one diagnostic question: *who
   can actually decide this?* The answer picks the fix.
5. Fix hygiene before cancelling. A series at 30% agenda compliance has not yet
   been tried as a well-run meeting.

```bash
python3 project-management/meeting-analyzer/scripts/meeting_series_diagnostic.py \
  --input project-management/meeting-analyzer/assets/sample_series.json \
  --churn-threshold 3 --format text
```

## Decision frameworks

### The action-item completeness gate [PROVEN]

| Has owner | Has date | Verdict |
|-----------|----------|---------|
| Yes | Yes (ISO) | Tracked |
| Yes | Vague ("soon", "next sprint") | **Gap** — the owner believes they committed; nobody else does |
| Yes | None | **Gap** — reads as "someday" |
| No | Either | **Gap** — an action owned by "the team" is owned by nobody |

`we`, `the team`, `someone`, `everyone` and `TBD` are never owners, even when
they occupy the grammatical slot. Accepting them launders the gap instead of
surfacing it.

### Follow-through benchmarks [RECOMMENDED]

| Metric | Healthy | Warning | Broken |
|--------|---------|---------|--------|
| Completion rate | 75%+ | 50-75% | under 50% |
| Owner **and** date present | 90%+ | 70-90% | under 70% |
| On-time closure | 70%+ | 50-70% | under 50% |
| Open beyond 30 days | 0-1 | 2-4 | 5+ |
| Average carry-over | under 1 | 1-2 | 3+ |

Carry-over predicts abandonment better than age. An item carried three times has
usually been silently deprioritised by its owner but never formally dropped.

### Decision density verdicts [PROVEN]

Density = decisions produced / person-hours consumed.

| Density | Verdict | Action |
|---------|---------|--------|
| 0.35+ | KEEP | Healthy: a 60-min meeting of 5 produces 2+ decisions |
| 0.15-0.35 | RESTRUCTURE | Cut duration 25%; trim to the people who hold the decision |
| under 0.15 | ASYNC | Move standing content to a written update |
| under 0.15 **and** 40%+ empty occurrences | KILL | Cancel; replace with a written update and a comment window |

Exclude retros, brainstorms, incident reviews and onboarding — they decide
little by design. Exclude them explicitly rather than lowering the floor, or the
floor stops catching the status meetings it exists to catch.

### Reading low follow-through

Low follow-through has four common causes and only one of them is the person:
over-assignment (one owner holding 40%+ of open actions), deadlines set by
someone other than the owner, an unclearable blocking dependency, or a meeting
generating more actions than the team has capacity for. **When every owner looks
bad, the meeting is the problem** — see the diagnostic table and per-owner
interpretation guidance in `references/accountability-and-series-health.md`.

## Anti-Patterns

### Inferring the Missing Owner
**Mistake:** Filling in a plausible owner or date for an action the notes left blank, so the register looks complete.
**Why it happens:** An incomplete register feels like a failure of the extraction, and a model will happily supply a name. Completeness is mistaken for quality.
**Instead:** Leave it flagged. The gap **is** the finding — an unowned action is genuinely unowned, and surfacing it is the entire value. Rules under-extract and models over-extract; a fabricated due date enters the tracker looking legitimate and nobody ever questions it again.

### The Decorative Register
**Mistake:** Maintaining a meticulous action list that is reviewed by reading every row aloud at the next meeting, and never acted on.
**Why it happens:** The register becomes a performance of diligence. Reading it all feels thorough, and cutting the review feels like letting standards slip.
**Instead:** Review overdue items and third carry-overs only — under five minutes. Everything on track needs no airtime. A register that consumes twenty minutes a week to change nothing is more expensive than having no register.

### Weaponising Per-Owner Data
**Mistake:** Opening a team meeting with the per-owner follow-through table and asking the bottom name to explain themselves.
**Why it happens:** The data looks like performance data, and it is right there, ranked.
**Instead:** Share follow-through in aggregate with the team and per-person only in a 1:1, as a question rather than a verdict. When every owner looks bad, the meeting is over-generating actions — treating that as several simultaneous performance problems is both wrong and expensive, and it teaches people to accept fewer actions rather than to close more.

### Scoring Every Meeting on Decision Density
**Mistake:** Running the series diagnostic across the whole calendar and proposing to cancel the retro because it produced two decisions in ten weeks.
**Why it happens:** The metric is clean and comparable, which makes it tempting to apply universally.
**Instead:** Exclude retros, brainstorms, incident reviews and onboarding before scoring. Their output is shared understanding, not convergence. Excluding them keeps the floor sharp enough to catch the status meeting it was built for.

### Cancelling Before Fixing Hygiene
**Mistake:** Killing a low-density meeting that never had an agenda or published notes.
**Why it happens:** The density number is damning and cancellation is a satisfying, visible action.
**Instead:** Fix hygiene first — agenda-or-cancel plus published notes — and re-measure over four occurrences. A series at 30% agenda compliance has not been tried as a well-run meeting yet, and cancelling it moves the same unresolved topics somewhere less visible.

## Files

| File | Purpose |
|------|---------|
| `scripts/meeting_notes_parser.py` | Extracts decisions, actions and questions from notes; detects owners and dates; flags gaps; `--strict` exits 1 |
| `scripts/commitment_tracker.py` | Ageing, completion and on-time rates, carry-over, per-owner and per-meeting breakdowns, deterministic `--as-of` |
| `scripts/meeting_series_diagnostic.py` | Decision density, churning topics, attendance decay, hygiene compliance, KEEP/RESTRUCTURE/ASYNC/KILL verdict |
| `references/extraction-rules-and-note-conventions.md` | Cue catalogue, owner/date detection, reflow, source-format handling, deduplication, note conventions, failure modes |
| `references/accountability-and-series-health.md` | Commitment lifecycle, benchmarks, per-owner interpretation, decision density, topic churn, action caps, escalation ladder |
| `assets/action_register_template.md` | Register: open actions, third-carry-over gate, decision log, open questions, health snapshot |
| `assets/sample_notes.md` | Wrapped markdown notes, mixed-quality actions (extracts at 33% completeness) |
| `assets/sample_notes_transcript.txt` | Labelled transcript (extracts at 100%) — the contrast shows what note conventions buy |
| `assets/sample_commitments.json` | 18-action register across 5 meetings and 7 weeks |
| `assets/sample_series.json` | 10 occurrences of a weekly alignment meeting |

---

## metrics-dashboard

Source path: `references/project-management/discovery/metrics-dashboard/SKILL.md`

# Metrics Dashboard

A dashboard architecture skill: which metrics go where, at which cadence,
for which audience, with which visualization. Focused on producing the
ONE artifact a team uses to make decisions — not the 30-chart dashboard
nobody opens.

## When to use this skill

- **New product / feature launch** — what to instrument and watch
- **Existing dashboard audit** — what to cut, add, refactor
- **Team-level OKR tracking** — operational dashboard for the team
- **Exec readouts** — board / monthly business review dashboard
- **Cross-functional alignment** — what does "success" look like?

## The 4 dashboard layers

1. **North Star** — 1 metric that summarizes value delivered
2. **Input metrics** (3-5) — the drivers of NS
3. **Guardrails** (3-5) — what we DON'T want to sacrifice (counter-metrics)
4. **Operational metrics** (4-8 per team) — what we actually act on weekly

A dashboard ≠ all metrics. A dashboard = these 11-22 metrics presented
for fast decision-making.

## Clarify First

Before designing the dashboard, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **North Star metric** — defined or not (it is the root of all 4 layers; if undefined, define it first via `north-star-metric`)
- [ ] **Audience** — board/exec / functional team / all-hands / IC (sets the max top-level metric count, 5-8 down to 1-3)
- [ ] **Team structure** — which teams act on this (operational metrics are 4-8 per team with named owners)
- [ ] **Available instrumentation** — what data you actually capture (you can't show a metric you don't measure; bounds refresh cadence)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

### Step 1 — Confirm the North Star
Already defined? Use it. Not defined? See `project-management/execution/north-star-metric`.

A good NS:
- Behavioral or business
- Moves week-over-week
- Hard to game without delivering real value
- One number

### Step 2 — Decompose to input metrics
For each NS, identify 3-5 inputs whose combined movement drives it.

Example for NS "Weekly Active Companies × Messages Sent per Company":
- Acquisition rate
- Activation rate (% reaching 50 messages in 14 days)
- Retention rate (W4 cohort)
- Expansion (adds users / channels)

### Step 3 — Identify guardrails
What could move the NS up while damaging the underlying value?

Example guardrails:
- Spam rate (if NS = messages, more messages can include spam)
- User-reported complaints
- Power-user churn (vs total churn)
- Support ticket volume
- Latency / error rate

### Step 4 — Identify operational metrics per team
The 4-8 metrics each team needs to act weekly:
- Growth team: funnel conversion, channel CAC, signup quality
- Retention team: cohort retention, save-room saves
- Platform team: SLO posture, on-call health, deploy freq
- Trust & safety: spam reports, removed accounts, false-positive rate

### Step 5 — Define visualization + cadence per metric
Each metric needs:
- **Visualization:** line chart / funnel / cohort heatmap / bar
- **Comparison:** vs prior period / vs target / vs cohort baseline
- **Refresh cadence:** real-time / hourly / daily / weekly / monthly
- **Owner:** named team

### Step 6 — Run `dashboard_designer.py`
Audit: too many top-level metrics, no guardrails, vanity metrics, missing
owners, missing comparisons.

```bash
python3 project-management/discovery/metrics-dashboard/scripts/dashboard_designer.py \
  --input dashboard_spec.json --format markdown
```

### Step 7 — Sunset stale metrics
Quarterly: kill metrics no team looked at. Dashboards rot; pruning is
healthy.

## Decision frameworks

### Top-level metric count

| Audience | Max top-level | Why |
|----------|---------------|-----|
| Board / exec | 5-8 | Limited attention; high signal/noise |
| Functional team | 4-8 | Actionable; weekly review |
| All-hands | 3-5 | Communicable; team rallies |
| Individual contributor | 1-3 | Their direct impact |

### Visualization fit

| Question | Best visualization |
|----------|---------------------|
| Is it changing over time? | Line chart |
| How much vs target? | Gauge / bullet |
| Drop-off at each step? | Funnel |
| Retention over time? | Cohort heatmap |
| Distribution? | Histogram |
| Composition? | Stacked area / pie (rare) |
| Comparison across groups? | Grouped bar |
| Relationship? | Scatter |

Avoid pie charts beyond 3 slices. Avoid 3D charts always.

### Vanity vs actionable test

For each candidate metric: "If this moved up 10% next week, what would we do?"

- Have answer → actionable; keep
- No answer → vanity; cut

### Comparison discipline

Every chart needs a comparison anchor:
- vs prior period (week / month / quarter)
- vs target
- vs cohort baseline
- vs competitor benchmark (rare; usually unreliable)

A chart with no comparison is a number floating in space.

## Common engagements

### "Build us a dashboard for the new product line"
1. Confirm North Star.
2. Decompose to 3-5 inputs.
3. Identify 3-5 guardrails.
4. Per team: 4-8 operational metrics.
5. Spec viz + cadence + owner per metric.
6. Pilot for 4 weeks; cut what nobody opens.

### "Audit our existing dashboard"
1. List every metric currently shown.
2. Tag each: NS / input / guardrail / operational / vanity.
3. Cut all vanity.
4. Cut operational that no team looks at.
5. Add missing guardrails.
6. Limit each audience to its max.

### "Help us track an OKR"
1. Map OKR to metric: KR → metric.
2. KR should be the metric.
3. Inputs = what moves the KR.
4. Guardrails = what we won't sacrifice.

## Anti-patterns to avoid

- **30+ metrics on one screen.** Decision-making dies.
- **No guardrails.** NS optimization without counter-balance.
- **All metrics for all audiences.** Exec doesn't need eng team metrics.
- **No comparisons.** Numbers without context.
- **Real-time everything.** Most metrics don't need it (and it's expensive).
- **No owner per metric.** Orphan metrics rot.
- **Vanity metrics (page views, signups alone).** Not action-driving.
- **No cadence on review.** Dashboard exists; team doesn't use it.

## References

- `references/dashboard-architecture.md` — layers, cadence, visualization patterns
- `references/dashboard-anti-patterns.md` — common failures + fixes

## Related skills

- `project-management/execution/north-star-metric` — define THE one number
- `product-team/product-analytics` — metric tree + cohort + funnel
- `product-team/ab-test-setup` — experimentation
- `c-level-advisor/chief-data-officer-advisor` — platform context

---

## north-star-metric

Source path: `references/project-management/execution/north-star-metric/SKILL.md`

# North Star Metric (NSM) Expert

## Overview

A North Star Metric (NSM) is the single number that best represents the value your product delivers to its customers. Sean Ellis popularized the framing; Amplitude codified the playbook; Lean Analytics calls a related concept the "One Metric That Matters" (OMTM). The NSM is **one** number, not a dashboard. Its job is to align the entire team -- engineering, marketing, sales, support -- on a shared definition of "we won this quarter."

This skill produces a complete NSM specification: the NSM itself, 3-5 **input metrics** the team can directly influence, the **leading indicators** that move days or weeks before the inputs, the **anti-metrics** (things that must NOT move in the wrong direction), and **counter-metrics** that guard against gaming. The Python tool (`metric_tree_builder.py`) emits the spec as JSON, Markdown, or a Mermaid tree diagram for a README or Confluence page.

This is the first artifact a team should produce after defining strategy and before writing OKRs. Once the NSM is set, OKRs map directly to moving the input metrics, and roadmaps justify themselves by which input metric they target.

## Core Capabilities

- **NSM selection** — score candidates against the five tests (customer value, strategic alignment, leading, single number, movable) and the five Amplitude archetypes.
- **Metric-tree decomposition** — break the NSM into 3-5 input metrics with an explicit formula (multiplicative / additive / funnel / ratio).
- **Leading indicators** — assign 2-3 per input that move before the input does (the daily/weekly dashboard).
- **Guardrails** — anti-metrics (protect the customer) and counter-metrics (protect the business), each with explicit thresholds.
- **Rendering** — Mermaid tree, JSON dashboard config, or Markdown via the Python tool.

## When to Use

- **New product or strategic direction** -- before OKRs and roadmap, define the NSM and inputs.
- **Strategic re-alignment** -- the dashboard has 47 metrics and no one knows which to optimize.
- **Cross-functional friction** -- marketing, product, and growth disagree on what "success" means.
- **Investor / board reporting** -- the NSM becomes the headline metric.
- **A/B experimentation guardrails** -- every test reports NSM impact plus counter-metric impact.

**When NOT to use:** very early-stage discovery (use `discovery/` first — you don't yet know what value you deliver); pure infrastructure work with an indirect user-value chain; before the org has aligned on strategy (the NSM exposes disagreement but does not resolve it).

## Clarify First

Before defining the NSM, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Core customer value the product delivers** — drives NSM candidate selection; the NSM must be a proxy for this, not a revenue lagging metric
- [ ] **Business archetype** — attention / transaction / productivity / marketplace / engagement sets the Amplitude archetype and the input-metric formula (multiplicative/additive/funnel/ratio)
- [ ] **Input metrics the team can directly influence** — the 3-5 nodes of the tree; if the team can't move them, the tree is decoration
- [ ] **Anti-/counter-metrics to guard** — the thresholds that protect customer and business against a gamed NSM

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
python scripts/metric_tree_builder.py --input nsm_spec.json --format mermaid   # render the metric tree
python scripts/metric_tree_builder.py --demo --format markdown                 # worked SaaS productivity NSM
```

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/nsm-playbook.md](references/nsm-playbook.md)** — the five quality tests, Amplitude archetypes + real company examples, the metric-tree structure and input math, leading indicators, anti-/counter-metrics with thresholds, the step-by-step workflow, the `metric_tree_builder.py` reference (flags, input JSON, Mermaid sample), troubleshooting, and success criteria. Read when selecting an NSM or building the tree.
- **[references/nsm-framework-guide.md](references/nsm-framework-guide.md)** — deep dive on three overlapping frameworks (Sean Ellis NSM, Amplitude NSM, Lean Analytics OMTM), input-metric math, and worked examples across five business archetypes. Read when comparing frameworks or working a specific archetype.
- **[references/red-flags.md](references/red-flags.md)** — concrete examples of how NSM specs go wrong, why they're bad, and how to fix them. Read when reviewing an NSM or diagnosing a gamed/lagging metric.
- **assets/nsm_spec_template.md** — fill-in template for an NSM specification matching the tool's JSON shape. Use when drafting a spec.

## Scope & Limitations

**In Scope:** NSM selection across 5 archetypes; input-metric tree decomposition with explicit math; leading-indicator selection per input; anti-/counter-metric definition with thresholds; the Python rendering tool; handoff to OKR drafting and roadmap prioritization.

**Out of Scope:** building actual analytics dashboards (BI tools — this produces the spec); statistical experiment design (`discovery/brainstorm-experiments/`); financial/revenue forecasting (`finance/`); OKR drafting (`brainstorm-okrs/`); data quality validation (`data-analytics/`).

**Caveats:** an NSM exposes strategic disagreement but does not resolve it — escalate the strategy decision, not the metric debate. Pure financial outputs (revenue, ARR) are usually too lagging; pick a customer-value proxy that revenue follows from. The NSM aligns; teams still need component metrics for diagnostics. A team without instrumentation cannot operate against an NSM — spend on telemetry first.

## Integration Points

| Integration | Direction | Description |
|-------------|-----------|-------------|
| `discovery/brainstorm-ideas/` | Receives from | Opportunity discovery defines what value to deliver; NSM measures it |
| `discovery/identify-assumptions/` | Receives from | NSM candidates surface assumptions about what customers value |
| `execution/brainstorm-okrs/` | Feeds into | NSM becomes the quarterly Objective; inputs become Key Results |
| `execution/outcome-roadmap/` | Feeds into | Roadmap items justify themselves by which input metric they target |
| `execution/prioritization-frameworks/` | Pairs with | NSM impact is one of the scoring criteria (e.g., RICE Impact, Weighted) |
| `execution/status-update-generator/` | Feeds into | NSM and input movements feature in Highlights of weekly updates |
| `data-analytics/` (domain) | Pairs with | NSM spec becomes the schema for dashboards and event taxonomies |
| `executive-reporting/` (senior-pm) | Feeds into | Monthly board packets lead with NSM trend |

---

## notion-pm

Source path: `references/project-management/notion-pm/SKILL.md`

# Notion for Product Management

Master-level expertise in using Notion as the documentation and operational backbone for a product team: PRDs, OKRs, roadmaps, decision logs, sprint reviews, 1:1 notes, customer research, and sync patterns with Jira, Linear, and GitHub. Covers Notion's database model, view design, formula and rollup patterns, page architecture, and REST API.

## Overview

Notion's PM value comes from its database model: every meaningful PM artifact (a PRD, an OKR, a roadmap row, a decision) becomes a row in a typed database, with relations to other databases. This unlocks linked views (one source of truth, many surface presentations), rollups (aggregate child progress into a parent), and a queryable API. The job of a Notion PM expert is to design these databases up front, restrain ad-hoc page creation, and tie the workspace into Jira/Linear/GitHub so the artifacts stay current without manual maintenance.

## Core Capabilities

- **Database design** — typed schemas for PRDs, OKRs, Roadmap, Decisions, and Sprint/Cycle Reviews, with the right property types (relation, rollup, formula, status, unique_id).
- **View design** — Table, Board, Timeline, Calendar, Gallery, and List views with filters, sorts, and groups tuned per artifact.
- **Page & workspace architecture** — Teamspace setup, curated home dashboards, linking strategy (relations vs mentions vs sub-pages), governance and review cadence.
- **REST API authoring** — query/create/update/append calls, compound filters, pagination, and rate-limit handling.
- **Sync patterns** — one-way, two-way, roll-up, and embed integrations with Jira, Linear, and GitHub.

## When to Use

- Standing up a new product team's documentation workspace
- Designing a PRD, OKR, Roadmap, or Decisions database from scratch
- Refactoring an existing Notion workspace that has grown into a sprawl of unrelated pages
- Building roadmap or status views aggregated from underlying issue trackers
- Authoring Notion REST API calls (page creation, database queries, block updates)
- Setting up two-way sync between Notion and Jira/Linear/GitHub
- Establishing governance: ownership, review cadence, archive strategy

## References

Pull the reference that matches the task; keep this file lean and load detail on demand.

- **[references/notion-pm-playbook.md](references/notion-pm-playbook.md)** — the full operational playbook: core concepts (hierarchy, property types, views, block types), the seven core workflows (workspace setup, PRD/OKR/Roadmap/Decisions/Review DB design, linking, sync), inline API/query examples, best practices, troubleshooting, and success criteria. Read when building or refactoring a workspace.
- **[references/notion-api-patterns.md](references/notion-api-patterns.md)** — full REST API call catalog with request/response examples. Read when authoring API integrations.
- **[references/notion-database-design-for-pm.md](references/notion-database-design-for-pm.md)** — canonical schemas for PRDs, OKRs, Roadmap, Decisions, Reviews. Read when designing the database relations.
- **[references/red-flags.md](references/red-flags.md)** — concrete examples of how Notion PM setups go wrong and how to fix them. Read when reviewing a workspace for quality.
- **assets/notion-prd-template.md** — PRD page template using Notion-native blocks.
- **assets/notion-roadmap-template.md** — Roadmap database schema and view definitions.
- **assets/notion-okr-template.md** — OKR database schema with Wodtke confidence model.
- Notion API docs: https://developers.notion.com/ — reference: https://developers.notion.com/reference/intro — changelog: https://developers.notion.com/page/changelog

## Scope & Limitations

**In Scope:** Notion workspace and Teamspace setup, database design for PRDs/OKRs/Roadmap/Decisions/Reviews/1:1s, view design, property and relation modeling, page architecture, Notion REST API authoring, sync pattern design with Jira/Linear/GitHub, governance and review cadences.

**Out of Scope:** Notion administration (SCIM, SAML, billing) at the workspace level beyond Teamspace setup. Jira space and project configuration (hand off to `jira-expert/` and `confluence-expert/`). Linear configuration (hand off to `linear-expert/`). Strategic OKR setting (hand off to `execution/brainstorm-okrs/`). Story splitting and backlog refinement (hand off to `execution/backlog-refinement/`, `execution/story-splitting/`).

**Limitations:** Notion's API rate limits (~3 req/s) make it unsuitable for very high-throughput sync; batch and queue. Status properties cannot have options created via the API in lower plan tiers; pre-create options manually. Rollups cannot reference rollups in older API versions; chain via formulas where needed. Page-level permissions can be overridden in unexpected ways by Teamspace-level changes. Notion is not a real-time collaboration substitute for chat; do not try to replace Slack with comments.

## Integration Points

| Integration | Direction | What Flows |
|---|---|---|
| `jira-expert/` | Notion ↔ Jira | PRD-to-Epic creation; Jira issue embeds in PRD pages |
| `confluence-expert/` | Migration | When moving from Confluence to Notion, structure and content mapping |
| `linear-expert/` | Notion ↔ Linear | PRD-to-Project creation; Linear progress rollups into Notion |
| `execution/create-prd/` | PRD → Notion | PRD scaffolder output rendered as Notion blocks via `--format notion` |
| `execution/brainstorm-okrs/` | OKR → Notion | OKR validator output written to the OKR DB |
| `execution/outcome-roadmap/` | Roadmap → Notion | Roadmap rows materialized in the Roadmap DB |
| `execution/daci-framework/` | Decision → Notion | DACI decisions logged in the Decisions DB |
| `execution/status-update-generator/` | Notion → Status | Weekly status pulls aggregates from PRDs/OKRs DBs |
| `execution/release-notes/` | Notion → Release | Shipped PRDs feed release notes input |
| `senior-pm/` | Notion → Portfolio | OKR and Roadmap DBs feed portfolio reports |
| `discovery/interview-synthesis/` | Research → Notion | Customer research database populated from interview synth output |

---

## opportunity-solution-tree

Source path: `references/project-management/discovery/opportunity-solution-tree/SKILL.md`

# Opportunity Solution Tree (OST)

Teresa Torres' framework from *Continuous Discovery Habits*. An OST
visualizes the path from a desired outcome to the assumption tests that
will validate or invalidate candidate solutions.

## When to use this skill

- Prioritizing **discovery work** for a quarter
- Structuring **weekly customer touchpoints**
- Mapping **multiple solutions** to one problem (vs jumping to solution)
- Auditing whether **roadmap actually moves outcomes**
- **Coaching** a team into continuous discovery rhythm
- **Pivoting** discovery away from a dead-end branch

## The tree structure

```
                  [Outcome]
                      |
        +-------------+-------------+
        |             |             |
   Opportunity   Opportunity   Opportunity
        |             |             |
     +--+--+      +--+--+      +--+--+
     |     |      |     |      |     |
   Solution Solution ...
        |
   +----+----+
   |         |
 Assumption  Assumption
   Test        Test
```

### Levels
1. **Outcome** — a single, specific, measurable business / product outcome
2. **Opportunities** — customer needs/pains/desires that, if addressed, drive the outcome
3. **Solutions** — candidate ways to address each opportunity
4. **Assumption tests** — experiments validating that the solution will deliver

## Clarify First

Before building the tree, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The one outcome** — a single, measurable, bounded outcome (the tree root; "ship X" or "make users happy" produces an invalid tree)
- [ ] **Customer evidence source** — interviews / tickets / analytics that populate the opportunity layer (opportunities must come from research, not the team's imagination)
- [ ] **Engagement type** — net-new tree vs auditing an existing roadmap (net-new builds top-down; an audit maps current solutions back onto outcomes)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

### Step 1 — Pick ONE outcome
A good outcome is:
- Behavioral (something users do) or business (revenue, retention)
- Measurable (specific metric, baseline, target)
- Bounded (this quarter / half)
- Within team's influence

Examples:
- "Increase week-1 activation rate from 28% to 40% by end of Q3"
- "Reduce admin-panel time-on-task by 30%"
- "Lift NRR from 105% to 115% by end of year"

NOT outcomes:
- "Build [feature]" (output, not outcome)
- "Improve user experience" (vague)
- "Hit revenue target" (too high; needs to decompose)

### Step 2 — Generate opportunities (from research)
Opportunities come from **customer evidence**, not the team's imagination:
- Interview transcripts
- Support ticket themes
- Sales objection patterns
- Behavioral analytics
- Survey free-text

Opportunities are **customer problems/needs**, not solutions:
- ✓ "Users abandon during email-verification step"
- ✓ "Admins want to bulk-invite from CSV"
- ✗ "Add a CSV import feature" (that's a solution)

### Step 3 — Cluster + dedupe opportunities
Group similar opportunities. Aim for 3-7 distinct opportunity clusters
per outcome.

### Step 4 — Generate multiple solutions per opportunity
For each opportunity, brainstorm 3-5 solutions. Resist jumping to one.

Multiple solutions matter because:
- It surfaces underlying assumption: which solution best solves this?
- Allows comparison of cost/effort
- Reveals the team has bias toward a specific approach

### Step 5 — Identify assumptions + tests
For each candidate solution, list:
- **Value assumption** — will users want this?
- **Usability assumption** — can users use it?
- **Feasibility assumption** — can we build it?
- **Viability assumption** — is it good for the business?

For each top assumption, design a cheap test (interview, prototype, A/B,
landing page, prefab Wizard-of-Oz).

### Step 6 — Run `ost_validator.py`
Audit for: missing outcome, opportunities written as solutions,
single-solution branches, no assumption tests, tree without recent updates.

```bash
python3 project-management/discovery/opportunity-solution-tree/scripts/ost_validator.py \
  --input ost.json --format markdown
```

### Step 7 — Iterate weekly
OST is a living artifact. Each week:
- Add opportunities from new interviews
- Move opportunities up/down based on evidence
- Add solutions
- Track assumption test results
- Kill solutions that failed tests
- Promote validated solutions to roadmap

## Decision frameworks

### Choosing the outcome

Wrong: "Build the new dashboard" (output)
Wrong: "Make customers happy" (vague)
Wrong: "Hit $20M ARR" (too high; many teams)

Right: One number a team can move. Decompose company OKRs to team-level
outcome. See `project-management/execution/north-star-metric`.

### Opportunity vs solution test

If the statement is a thing to build → solution.
If the statement is a customer pain / desire / need → opportunity.

| Statement | Type |
|-----------|------|
| "Add bulk CSV import" | Solution |
| "Admins want to invite many users at once" | Opportunity |
| "Build SAML SSO" | Solution |
| "Enterprise IT requires SSO to approve purchase" | Opportunity |
| "Replace the onboarding video" | Solution |
| "New users can't find the start button" | Opportunity |

### Sizing opportunities

For each opportunity:
- How many customers experience it (% of base)?
- How severe (workaround cost in time/$)?
- How often (frequency per user)?
- Strategic fit with outcome?

Score = impact × frequency × strategic fit. Prioritize accordingly.

### Multiple solutions discipline

Don't allow single-solution branches. If only one solution comes up:
- Ask: "What if we couldn't build that?"
- Borrow from analogous problems
- Get team brainstorm input
- Look at how competitors solve it

Goal: at least 3 candidate solutions per opportunity worth pursuing.

### Assumption test ladder

For each solution, the cheapest test first:
1. Customer interview / desirability test (~$0)
2. Landing page / smoke test (~hours)
3. Wizard-of-Oz / concierge MVP (~days)
4. Low-fidelity prototype (~1 week)
5. High-fidelity prototype (~2 weeks)
6. A/B test in production (~weeks-months)

Spend the minimum to learn the most.

## Common engagements

### "Help me set up an OST for our team this quarter"
1. Confirm the outcome (1 number).
2. Pull existing discovery evidence; cluster into opportunities.
3. Brainstorm 3-5 solutions per top opportunity.
4. Identify top 3 assumption tests for the quarter.
5. Schedule weekly OST update rhythm.

### "Our roadmap is full of features but outcomes aren't moving"
1. Map current roadmap to OST.
2. Identify orphan solutions (no opportunity → no outcome).
3. Identify gaps (opportunities without solutions in roadmap).
4. Reshape roadmap around outcome-supporting solutions.

### "Audit our discovery practice"
1. Look at the OST: when last updated?
2. How many interviews per week feed it?
3. Are opportunities written as needs (not solutions)?
4. How many solutions per opportunity (1 = under-divergent)?
5. How many assumption tests in progress?

## Anti-patterns to avoid

- **Outcome = output.** "Ship X" is not an outcome.
- **Opportunities = solutions.** Strip solutions out of the opportunity layer.
- **Single solution per opportunity.** Force 3+ alternatives.
- **No assumption tests.** Tree without tests = wishful thinking.
- **Static tree.** Update weekly or it dies.
- **Tree built without customer input.** Designed in vacuum; full of bias.
- **One huge outcome.** Decompose to team-level.
- **All opportunities equally important.** Prioritize explicitly.

## References

- `references/ost-fundamentals.md` — Teresa Torres framework deep
- `references/ost-anti-patterns.md` — common failures + fixes

## Related skills

- `project-management/discovery/identify-assumptions` — assumption surfacing
- `project-management/discovery/brainstorm-experiments` — test design
- `project-management/discovery/customer-interview-script` — interview prep
- `project-management/discovery/interview-synthesis` — turn interviews into opportunities
- `project-management/execution/north-star-metric` — outcome definition
- `project-management/strategy-frameworks/lean-canvas` — strategic context
- `product-team/research-summarizer` — interview synthesis

---

## outcome-roadmap

Source path: `references/project-management/execution/outcome-roadmap/SKILL.md`

# Outcome Roadmap Expert

The agent transforms output-based roadmaps ("build feature X") into outcome-driven roadmaps ("enable customers to achieve Y") using the "so what?" technique and Now/Next/Later framing. It produces roadmaps that communicate strategy and measurable impact, not just feature lists and dates.

## Core Capabilities

- **Output → outcome transformation** — applies the formula "Enable [segment] to [outcome] so that [impact]" via a "so what?" chain that drills from feature to business metric.
- **Now/Next/Later classification** — sorts initiatives into horizons whose detail and commitment level match certainty.
- **Metric definition** — primary, secondary, and counter-metrics for Now/Next items.
- **Dependency capture** — technical, organizational, and market prerequisites per item.
- **Stakeholder-ready output** — text, JSON, and markdown reports grouped by horizon for alignment review.

## When to Use

- Converting a feature-list / date-driven roadmap into outcome-driven format.
- Communicating product strategy to executives or customers.
- Running quarterly planning and aligning teams around impact rather than deliverables.
- Anchoring roadmap items to customer value and OKRs.

## Clarify First

Before transforming the roadmap, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Customer segment + business impact per item** — fills the "Enable [segment] to [outcome] so that [impact]" statement; without it the tool only emits placeholder templates
- [ ] **Target quarter per initiative** — drives Now/Next/Later horizon placement and the detail/commitment level
- [ ] **Initiative type** — feature / improvement / infrastructure drives the strategic-question and metric suggestions
- [ ] **Success metric per Now/Next item** — the primary/secondary/counter-metrics; Later items intentionally stay metric-light to avoid false precision

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
python scripts/roadmap_transformer.py --input roadmap.json            # transform a roadmap
python scripts/roadmap_transformer.py --input roadmap.json --format markdown
python scripts/roadmap_transformer.py --demo                          # run on built-in demo data
```

Each input initiative needs `title`, `description`, `quarter` (format "Q[1-4] YYYY"), and `type` (`feature`/`improvement`/`infrastructure`). The tool emits outcome-statement *templates* — fill the placeholders with real customer and business data.

## References

- **[references/outcome-roadmap-workflow.md](references/outcome-roadmap-workflow.md)** — read this when transforming a roadmap: the 6-step workflow with validation checkpoints, the "so what?" technique, Now/Next/Later detail levels, a full worked example, why output roadmaps fail, output structure, tool flags, troubleshooting, and success criteria.
- **[references/outcome-roadmap-guide.md](references/outcome-roadmap-guide.md)** — read this for the deeper guide: output-vs-outcome comparison, outcome formulas, and stakeholder communication strategies.
- **[references/red-flags.md](references/red-flags.md)** — read this to spot the common ways outcome roadmaps go wrong (false precision, mechanical templates, too many Now items) before sharing.
- `assets/outcome_roadmap_template.md` — roadmap document template with Now/Next/Later sections.

## Scope & Limitations

**In Scope:** transforming output-based feature lists into outcome-driven items, Now/Next/Later classification by quarter-to-current-date distance, "so what?" chain generation, strategic-question and metric suggestions by initiative type, markdown/text/JSON report output grouped by horizon.

**Out of Scope:** feature prioritization or scoring (`execution/prioritization-frameworks/`), sprint-level planning or capacity allocation (`scrum-master/`), product strategy or vision definition (roadmaps communicate strategy, they don't create it), cross-team dependency management (`program-manager/`).

**Important Caveats:** outcome roadmaps require a cultural shift — teams used to date-driven lists need coaching on commitment levels; the tool generates outcome-statement templates, not finished outcomes; Later items intentionally lack detailed metrics, and adding false precision undermines credibility.

## Integration Points

| Integration | Direction | Description |
|------------|-----------|-------------|
| `execution/brainstorm-okrs/` | Receives from | OKR key results become success metrics for Now/Next roadmap items |
| `execution/prioritization-frameworks/` | Receives from | RICE/ICE scores inform which initiatives move to Now vs. Next vs. Later |
| `execution/create-prd/` | Feeds into | Now items with validated outcomes become PRD candidates |
| `discovery/brainstorm-experiments/` | Receives from | Experiment results validate demand for Next/Later items, promoting them to Now |
| `senior-pm/` | Receives from | Portfolio strategic priorities influence roadmap horizon placement |
| `scrum-master/` | Receives from | Sprint capacity data determines how many Now items the team can support |

---

## pm-1on1s

Source path: `references/project-management/career/pm-1on1s/SKILL.md`

# PM 1:1 Expert

## Overview

PMs run more 1:1s than almost any other role: with their manager, their engineering manager partner, their design lead, cross-functional partners (sales, support, data), and -- once they have reports -- with their direct PMs. Each 1:1 type has a different purpose, cadence, and ideal structure.

This skill provides templates and question banks for the most common 1:1 types a PM runs, calibrated to the PM context. It draws on Kim Scott's Radical Candor (caring personally + challenging directly), the GROW coaching model (Whitmore), the Manager Tools 1:1 framework (Auzenne & Horstman), and PM-specific 1:1 patterns popularized by senior product leaders.

### Five core principles

1. **The 1:1 belongs to the other person** — their agenda first.
2. **Status updates do not need a 1:1** — write them async; reserve live time for trust, growth, judgment, feedback.
3. **Care personally, challenge directly** — avoid ruinous empathy and obnoxious aggression.
4. **Cadence matters** — weekly for direct partners, monthly for tier-3; don't skip, reschedule.
5. **Document agreements, not transcripts** — capture decisions and next steps.

### When to Use

- **Starting a new 1:1 relationship** -- use the kickoff template to set expectations.
- **Existing 1:1s feel transactional** -- adopt the structured partner-type template.
- **You manage other PMs** -- use the direct-report template for growth and feedback.
- **You partner with an EM, designer, or cross-functional lead** -- use the partner-type template.

### When NOT to Use

- Ad-hoc problem-solving meetings (treat as project meetings, not 1:1s).
- Performance management conversations (use a separate, manager-led structure).
- Initial intro meetings during onboarding -- use `pm-onboarding/` for those.

## Clarify First

Before drafting the 1:1 agenda, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Partner type** — your manager, EM partner, designer, direct report, or cross-functional lead (selects the agenda template and question bank)
- [ ] **Relationship stage** — brand-new vs steady-state (decides whether you run the kickoff script or the recurring agenda)
- [ ] **Purpose this session** — growth/feedback, alignment, or status-clearing (sets which sections matter and whether the Radical Candor frame applies)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## References

Load the reference that matches the task; keep this file lean and pull detail on demand.

- **[references/one-on-one-templates.md](references/one-on-one-templates.md)** — the five core principles in full, per-partner agenda templates (manager, EM partner, designer, direct report, cross-functional), the kickoff conversation script, the Radical Candor feedback frame, the run-the-system workflow, troubleshooting table, and success criteria. Read this when designing or fixing any specific 1:1.
- **[references/1on1-playbook.md](references/1on1-playbook.md)** — deep dive on cadence by partner type, the three failure modes, and structuring manager / direct-report / EM / design / async 1:1s. Read when you want the underlying theory and quarterly-review discipline.
- **[references/red-flags.md](references/red-flags.md)** — bad-vs-good examples of agendas, notes, and question banks. Scan after drafting a 1:1 agenda or notes, before your next 1:1.
- `assets/kickoff_template.md` — script for kicking off a new 1:1 relationship.
- `assets/1on1_notes_template.md` — recurring 1:1 notes template.
- `assets/manager_1on1_agenda.md` — ready-to-use agenda for your manager 1:1.

External: Scott, K. *Radical Candor* (2017); Whitmore, J. *Coaching for Performance* (GROW); Auzenne & Horstman, *The Effective Manager* (Manager Tools 1:1).

## Scope & Limitations

**In Scope:** 1:1 templates for the 5 common PM partner types; the GROW coaching framework for direct reports; Radical Candor feedback; kickoff conversation script; notes/agenda templates.

**Out of Scope:** Formal performance management (PIP, terminations, reviews — requires HR); compensation conversations; skip-level design from the senior-leader perspective; career conversations beyond growth-plan refresh (use `pm-career-ladder/`).

**Caveats:** 1:1 patterns are culturally inflected — calibrate directness to the room. Templates are starting points that should evolve as the relationship deepens. Re-establish the kickoff conversation when you join a new team.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `pm-career-ladder/` | Bidirectional | Quarterly growth 1:1s use the ladder rubric as the calibration tool |
| `pm-onboarding/` | Receives from | Onboarding 1:1s evolve into steady-state 1:1s after day 90 |
| `pm-interview-prep/` | Reuses | Behavioral story prep often surfaces from 1:1 reflections |
| `senior-pm/stakeholder-mapper/` | Reuses | Tier-1 stakeholders should be your weekly 1:1s |
| `personal-productivity/weekly-review/` | Feeds into | Weekly review captures 1:1 actions and growth-plan progress |

---

## pm-career-ladder

Source path: `references/project-management/career/pm-career-ladder/SKILL.md`

# PM Career Ladder Expert

## Overview

A consolidated, opinionated PM career ladder for ICs from APM to Group PM and managers from Director to VP/CPO. The ladder spans five capability dimensions -- product sense, execution, leadership, strategy, and communication -- with explicit behaviors per level. It bundles a level-by-level rubric, a gap-analysis worksheet, a 6-month growth plan template, and a promotion packet template. A level is reached when a PM operates at that bar **consistently across all five dimensions for >=2 quarters**, not the high-water mark of a single quarter.

## Core Capabilities

- **Level rubric** -- five dimensions x seven levels (APM, PM, Sr PM, Group PM, Director, VP/CPO) with observable behaviors and promotion signals per level
- **Gap analysis** -- self-score vs. independent manager-score, surface calibration gaps, prioritize 2-3 dimensions to develop
- **Growth planning** -- translate gaps into a 6-month plan of experiments, evidence, and manager support
- **Promo packet** -- scope statement, quantified impact, rubric mapping, partner quotes, growth narrative

## When to Use

- **Mid-cycle self-assessment** -- Calibrate where you are vs. where you want to be in 6-12 months.
- **Growth planning** -- Translate the gap into a concrete 6-month plan with experiments and evidence.
- **Promotion preparation** -- Build a promo packet that lines up your impact against the rubric for the next level.
- **Manager 1:1s** -- Bring the rubric to your 1:1 to make growth conversations concrete instead of vibes-based.
- **Hiring calibration** -- As a hiring manager, use the rubric to level a candidate's interview signal.

**When NOT to use:** interview prep (use `pm-interview-prep/`), new-role onboarding (use `pm-onboarding/`), 1:1 templates (use `pm-1on1s/`).

## Clarify First

Before generating the assessment or plan, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Current and target level** — APM, PM, Sr PM, Group PM, Director, or VP/CPO (sets which rubric bar to score against)
- [ ] **Artifact** — gap analysis, 6-month growth plan, or promo packet (each uses a different template and depth)
- [ ] **Track** — IC ladder (APM-GPM) vs management ladder (Director-VP/CPO) (shifts which of the 5 dimensions dominate)
- [ ] **Evidence base** — quantified impact + partner quotes on hand (a promo packet without evidence is just a self-claim)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

1. Self-score the 5x6 rubric for your current and next level; have your manager score independently.
2. Pick 2-3 dimensions where you are below bar.
3. Write a 6-month growth plan (experiments + evidence) and review monthly in your 1:1.
4. Maintain a quarterly written impact summary; assemble the promo packet by the 3-month mark of the cycle.

See `references/ladder-playbook.md` for the full ladder table, rubric detail, gap-analysis steps, growth-plan and promo-packet structures, and troubleshooting.

## References

- **[references/ladder-playbook.md](references/ladder-playbook.md)** — the full 5x6 ladder table, per-level rubric behaviors and promotion signals, gap-analysis process, 6-month growth plan, promo packet structure, workflow, troubleshooting, and success criteria. Read when scoring yourself or building a plan/packet.
- **[references/ladder-rubric-detail.md](references/ladder-rubric-detail.md)** — each dimension expanded across levels with "looks like" behaviors, anti-patterns, and promotion signals. Read when you need fine-grained behavioral detail for one dimension.
- **[references/red-flags.md](references/red-flags.md)** — common ways ladder self-assessments and promo packets go wrong, with fixes. Read before submitting a packet or a self-score.
- `assets/gap_analysis.md` — self-scoring + manager-scoring worksheet.
- `assets/growth_plan.md` — 6-month growth plan template.
- `assets/promo_packet.md` — promotion packet template.

External: Square's published PM ladder; Rachitsky, L. *Lenny's Newsletter* (PM rubric/growth essays); Reforge *PM Growth Framework*; Wodtke, C. *Radical Focus*.

## Scope & Limitations

**In scope:** IC ladder (APM-GPM) and management ladder (Director-VP/CPO); gap analysis, growth planning, promo packet templates; self-scoring rubric across 5 dimensions; conversation prompts for managers and skip-levels.

**Out of scope:** compensation/salary calibration (use levels.fyi, Pave, or comp bands); interviewer-side hiring rubrics; job-change/negotiation strategy; company-specific ladders (this is a consolidated industry baseline).

**Caveats:** Every company calibrates differently — a startup "Sr PM" != a 5,000-person "Sr PM"; adjust for context. Promotion is part meritocratic, part political; the rubric covers the meritocratic half. Growth is non-linear — continuous investment matters more than even-paced advancement.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `pm-interview-prep/` | Bidirectional | The rubric calibrates the bar for external interviews and internal calibration the same way |
| `pm-onboarding/` | Feeds into | New-role onboarding ends with the first ladder self-score |
| `pm-1on1s/` | Bidirectional | Quarterly 1:1s review ladder progress; the ladder structures the conversation |
| `senior-pm/stakeholder-mapper/` | Reuses | Promotion requires stakeholder support; the stakeholder mapper helps map the calibration room |
| `personal-productivity/weekly-review/` | Feeds into | Weekly review captures evidence that aggregates into the monthly impact summary |

---

## pm-interview-prep

Source path: `references/project-management/career/pm-interview-prep/SKILL.md`

# PM Interview Prep Expert

## Overview

PM interviews test five distinct skills, each with its own format, frameworks, and rubric: product sense, execution, strategy, behavioral, and technical. This skill organizes preparation across all five round types and calibrates expectations to the level you are interviewing for (APM, PM, Senior PM, Group PM). It bundles the most-used PM interview frameworks -- Lewis Lin's CIRCLES Method for product design, the AARM Method for improvement/metric questions, STAR for behavioral, and a 5-step estimation framework for market sizing -- plus question banks per round and structured answer templates calibrated by level.

## Core Capabilities

- **Five round types** -- product sense (design), product improvement, strategy, behavioral, technical/analytical, each with format and primary framework
- **Frameworks** -- CIRCLES, AARM, STAR (+ Reflection for senior), and 5-step estimation, with worked examples and failure modes
- **Level calibration** -- the same question scored differently for APM vs. PM vs. Senior PM vs. Group PM
- **Prep system** -- self-assessment, question banks, 8-12 behavioral story development, and structured mock-interview feedback

## When to Use

- **Preparing for PM interviews** -- You have a loop scheduled and need a structured plan to cover all rounds.
- **Mock interview prep** -- You are interviewing peers and want consistent rubrics.
- **Self-assessment** -- You want to identify your weakest interview category before investing prep time.
- **Switching levels** -- You are an IC PM moving to Senior or Senior moving to Group, and need to understand how the bar shifts.

**When NOT to use:** general career planning (use `pm-career-ladder/`); hiring as an interviewer (this is candidate-side); engineering or design interview prep (this is PM-specific).

## Quick Start

1. Rate yourself across the five round types (`assets/self_assessment.md`); pick your weakest two.
2. Pull level-targeted questions from `references/question-bank.md` and practice solo with the right framework, timed.
3. Run 2-3 mocks per round type using `assets/mock_feedback_form.md`.
4. Refine 8-12 behavioral stories (`assets/story_worksheet.md`) to under 5 minutes each, quantified.

See `references/round-frameworks-and-prep.md` for the full round reference, framework tables, level-calibration bars, prep workflow, and troubleshooting.

## References

- **[references/round-frameworks-and-prep.md](references/round-frameworks-and-prep.md)** — the five round types, full CIRCLES/AARM/STAR/Estimation frameworks with failure modes, per-level calibration tables, prep workflow, question excerpts, troubleshooting, and success criteria. Read when preparing any round.
- **[references/framework-deep-dive.md](references/framework-deep-dive.md)** — fully worked examples for CIRCLES, AARM, STAR, and Estimation. Read when you want to see a framework executed end-to-end on a real question.
- **[references/question-bank.md](references/question-bank.md)** — 100+ questions organized by round type and level (APM/PM/SR/GPM). Read when building your practice set.
- **[references/red-flags.md](references/red-flags.md)** — common ways interview answers go wrong, with fixes. Read before mocks and the real loop.
- `assets/self_assessment.md` — pre-prep diagnostic across the five round types.
- `assets/mock_feedback_form.md` — structured feedback form for mock interviews.
- `assets/story_worksheet.md` — worksheet for the 12 canonical behavioral stories.

External: Lin, L. *Decode and Conquer* (CIRCLES); McDowell, G. & Bavaro, J. *Cracking the PM Interview*; Lin, L. *The Product Manager Interview* (AARM + 165 questions); Bock, L. *Work Rules!*

## Scope & Limitations

**In scope:** framework-based prep for all five PM round types; level calibration APM-Group PM; question banks and answer templates; behavioral story development and STAR refinement; self-assessment and mock-feedback tools.

**Out of scope:** Director/VP/CPO interviews (executive judgment, board influence, P&L — use leadership coaching); company-specific technical-PM screens (consult the role's rubric); salary negotiation/offer evaluation; resume and outreach prep (use `personal-productivity/resume/`).

**Caveats:** Frameworks are scaffolds, not scripts — interviewers down-rank verbatim recitation; internalize so the structure is invisible. Every company has its own rubric; adjust by the published guide and recruiter call. Mocking with a current PM at the target company beats any book.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `pm-career-ladder/` | Bidirectional | Use the ladder rubric to understand the level you are interviewing for |
| `pm-onboarding/` | Feeds into | Once hired, the onboarding skill takes over for first 90 days |
| `personal-productivity/resume/` | Feeds from | A clean resume with quantified impact feeds the behavioral stories |
| `discovery/brainstorm-ideas/` | Reuses | Product sense rounds reuse the same ideation discipline as Product Trio sessions |
| `execution/prioritization-frameworks/` | Reuses | RICE, ICE, and Opportunity Score reasoning shows up in CIRCLES Step 4 (Cut through) |

---

## pm-onboarding

Source path: `references/project-management/career/pm-onboarding/SKILL.md`

# PM Onboarding Expert

## Overview

A new PM's first 90 days are disproportionately important. Trust earned in the first quarter compounds; missteps in the first quarter haunt for the next year. This skill is a structured 30-60-90 day plan that helps a new PM diagnose the situation, build relationships, identify early wins, and arrive at the end of the quarter with credibility and a clear point of view.

The skill draws on Michael Watkins' *The First 90 Days*, the STARS situational diagnosis (Start-up / Turnaround / Accelerated growth / Realignment / Sustaining success), and the public PM onboarding patterns popularized by senior product leaders.

### The arc in brief

- **Days 1-30 (Learn):** build context; no major decisions, no big PRDs. End with a 1-page "What I'm learning" memo (STARS diagnosis + top-3 going well + top-3 risks).
- **Days 31-60 (Plan):** form a point of view; interview customers yourself; identify 1-2 early wins; align manager + stakeholders. End with a first PRD/strategy memo and draft 6-month roadmap.
- **Days 61-90 (Deliver):** ship the early win; set the operating cadence; write the 90-day retro memo.

Diagnose the STARS situation first — a Sustaining-success area rewards 60+ days of listening; a Turnaround needs decisive action within 30. Misreading the situation is the most common new-PM mistake.

### When to Use

- **New job at a new company** -- use the full 90-day plan from week 1.
- **Internal transfer to a new team** -- compress to 60 days but keep the structure.
- **New scope within the same team** -- use the 30-day learning sprint only.
- **Returning from extended leave (3+ months)** -- use a modified 30-day plan to re-orient.

### When NOT to Use

- First week of a routine role (no major scope change) -- this is overkill.
- Interim leadership (acting role <60 days) -- run a stability-focused playbook instead.

## Clarify First

Before building the onboarding plan, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **STARS situation** — Start-up, Turnaround, Accelerated-growth, Realignment, or Sustaining-success (sets the listen-vs-act balance; misreading it is the top new-PM mistake)
- [ ] **Transition type** — new company, internal transfer, new scope, or return from leave (chooses full-90 vs compressed-60 vs 30-day plan)
- [ ] **Manager's 90-day expectations** — what "success" means to them (anchors early-win selection and the whole arc)
- [ ] **Scope and key partners** — what the PM owns and who the critical stakeholders are (drives the stakeholder tiers and first-PRD)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## References

Load the reference that matches the task; keep this file lean and pull detail on demand.

- **[references/30-60-90-plan-and-tactics.md](references/30-60-90-plan-and-tactics.md)** — full STARS diagnostic table and diagnosis questions, the week-by-week 30-60-90 plan with outputs, the early-wins playbook, onboarding stakeholder tiers, the first-PRD rules, the run-the-quarter workflow, troubleshooting, and success criteria. Read this when actually building or running the plan.
- **[references/first-90-days-playbook.md](references/first-90-days-playbook.md)** — Watkins-grounded deep dive: the transition trap, STARS in depth, securing early wins, the five-conversations framework, remote/hybrid onboarding, and the 90-day retro memo structure. Read for the underlying theory.
- **[references/red-flags.md](references/red-flags.md)** — bad-vs-good examples of early-tenure decisions. Scan after producing a 30-60-90 plan, stakeholder map, or onboarding artifact.
- `assets/30_60_90_plan.md` — editable 30-60-90 plan template.
- `assets/stakeholder_map.md` — onboarding stakeholder map template.
- `assets/onboarding_1on1_questions.md` — question bank for the first 30 days of 1:1s.
- `assets/first_prd_template.md` — tighter PRD template for new-PM constraints.

External: Watkins, M. *The First 90 Days* (HBR Press, 2013); Bock, L. *Work Rules!* (onboarding at scale).

## Scope & Limitations

**In Scope:** 30-60-90 day plan for new PM roles; STARS situational diagnosis; onboarding stakeholder mapping; first-quarter 1:1 question banks; first-PRD template; early-win identification and execution.

**Out of Scope:** Job-search or offer-evaluation prep (use `personal-productivity/`); compensation negotiation; long-term career planning beyond 90 days (`pm-career-ladder/`); onboarding for non-PM roles.

**Caveats:** The 90-day plan is a planning artifact, not a contract — adjust as you learn. Calibrate "early wins" to the company's pace (a startup's 90-day win may be an enterprise's 180-day win). Your manager's expectations matter most: align in week 1, do not surprise them in week 6.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `pm-1on1s/` | Feeds into | The 1:1 question banks here are designed for first-90-day conversations; ongoing 1:1s use the broader skill |
| `pm-career-ladder/` | Feeds into | End-of-90-day retro becomes the baseline self-score on the ladder |
| `pm-interview-prep/` | Receives from | Pre-offer "Can you do the job?" stories often map to early wins delivered in past 90-day windows |
| `senior-pm/stakeholder-mapper/` | Reuses | The stakeholder mapping technique scales beyond onboarding into steady-state |
| `execution/create-prd/` | Feeds into | First-PRD template is a tighter version of the full PRD skill |
| `discovery/interview-synthesis/` | Reuses | Customer interviews in week 5 use the same synthesis discipline as steady-state discovery |

---

## porters-five-forces

Source path: `references/project-management/strategy-frameworks/porters-five-forces/SKILL.md`

# Porter's Five Forces

Michael Porter's framework for analyzing the structural attractiveness
of an industry. Reveals where profit pools form, why some markets are
chronically unprofitable, and where strategic positioning has leverage.

## When to use this skill

- **Market entry** decision (which industry to play in)
- Diagnosing **chronic margin pressure** (why are we squeezed?)
- **Strategic positioning** (where to invest, where to defend)
- **Competitive response** planning
- **M&A target evaluation** (industry attractiveness)
- **Pre-fundraise** industry framing

## The 5 forces

1. **Threat of new entrants** — how easily can newcomers join?
2. **Bargaining power of suppliers** — how concentrated/critical are inputs?
3. **Bargaining power of buyers** — how concentrated/price-sensitive are customers?
4. **Threat of substitute products** — what alternatives could replace the category?
5. **Competitive rivalry** — how intense is competition between existing players?

Plus (Porter's later addition):
6. **Complementors** (the "sixth force") — do partners increase total industry value?

## Scoring rubric

Each force is rated **low / medium / high** based on specific factors:

### 1. Threat of new entrants — high when:
- Low capital requirements
- No regulatory barriers
- No proprietary tech / patents
- Low switching costs
- No economies of scale
- No brand loyalty
- Access to distribution is easy
- Network effects absent

### 2. Supplier power — high when:
- Few suppliers / concentrated supply base
- Suppliers are critical / cannot be substituted
- Switching cost is high
- Suppliers can forward-integrate
- Industry is not a large customer for supplier

### 3. Buyer power — high when:
- Few buyers / concentrated demand
- Buyers purchase in large volumes
- Product is undifferentiated
- Switching cost is low
- Buyers can backward-integrate
- Buyers have full information
- Buyers face thin margins (price pressure)

### 4. Threat of substitutes — high when:
- Many substitutes exist
- Substitutes have favorable price-performance
- Switching cost to substitute is low
- Buyer propensity to substitute is high
- Substitute industry is growing fast

### 5. Competitive rivalry — high when:
- Many similar-sized competitors
- Low growth industry (zero-sum)
- High fixed costs (drive volume)
- Low differentiation
- High exit barriers
- Strategic stakes high

## Clarify First

Before scoring the forces, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Precise industry definition** — narrow enough to be specific, broad enough to catch substitutes (too broad/narrow is the #1 error and sets the entire analysis scope)
- [ ] **Evidence per force** — the data/facts behind each low/medium/high rating (a score without evidence is just opinion)
- [ ] **Purpose** — market entry / margin-pressure diagnosis / positioning audit (frames which dominant force matters and the strategy translation; margin diagnosis also needs a then-vs-now comparison)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

### Step 1 — Define the industry
Industry definition is the most-frequent source of error.
- "Software" is too broad
- "B2B SaaS" is too broad
- "Mid-market HR analytics SaaS" is workable
- "Enterprise revenue intelligence tools (Gong, Outreach, Salesloft-tier)" is precise

### Step 2 — Score each force
Use the rubric. Each force gets low / medium / high + evidence.

### Step 3 — Identify the dominant force(s)
Usually 1-2 forces dominate. They drive the industry's profit pool.

### Step 4 — Translate to strategy
Each force suggests strategic moves:

| Force | High = unfavorable | Strategy implications |
|-------|---------------------|------------------------|
| New entrants | Easy entry | Build barriers (brand, scale, network, switching cost) |
| Supplier power | Concentrated | Diversify, integrate backward, build alternative supply |
| Buyer power | Concentrated | Diversify customer base, differentiate, integrate forward |
| Substitutes | Strong substitutes | Differentiate, raise switching cost, defend value prop |
| Rivalry | Intense | Differentiate, niche down, exit, consolidate |

### Step 5 — Run `five_forces_scorer.py`
Audit for: missing evidence, generic factors, missed sub-factors, no
strategy implications drawn.

```bash
python3 project-management/strategy-frameworks/porters-five-forces/scripts/five_forces_scorer.py \
  --input forces.json --format markdown
```

## Common engagements

### "Should we enter market X?"
1. Define X precisely.
2. Score each force.
3. Identify dominant force.
4. Assess: can we differentiate against the dominant force?
5. If yes, structure entry to counter that force; if no, don't enter.

### "Why are our margins under pressure?"
1. Score industry today vs 3-5 years ago.
2. Identify the force(s) that shifted (usually buyer power or rivalry).
3. Identify which factor specifically caused the shift.
4. Address: product differentiation, switching cost, customer concentration, etc.

### "Audit our strategic position"
1. Score industry forces.
2. For each high force, identify how we currently counter it.
3. Identify weak counters; recommend reinforcement.

## Anti-patterns to avoid

- **Industry defined too broadly.** Yields generic analysis.
- **Industry defined too narrowly.** Misses substitute threats.
- **Each force = "medium".** No analysis happened.
- **No evidence cited.** Just opinion.
- **No strategy implications.** Just a score; not actionable.
- **Static analysis.** Industries evolve; refresh every 12-18 months.
- **Mixing internal capabilities with industry analysis.** Five Forces is industry-level; capabilities are firm-level (see SWOT).

## References

- `references/five-forces-deep.md` — each force, factors, examples
- `references/five-forces-and-strategy.md` — translating to strategic moves

## Related skills

- `project-management/strategy-frameworks/swot-analysis` — firm-level positioning
- `project-management/strategy-frameworks/ansoff-matrix` — growth options
- `project-management/strategy-frameworks/business-model-canvas` — operational view
- `marketing/competitive-teardown` — competitor-specific analysis
- `c-level-advisor/ceo-advisor` — strategic context

---

## post-mortem

Source path: `references/project-management/execution/post-mortem/SKILL.md`

# Post-Mortem (Blameless Incident Review)

## Overview

A post-mortem is a structured, blameless review held after an incident, outage, regression, missed launch, or failed experiment. The goal is not to assign fault but to learn how the system (people, process, code, and organization) produced the outcome, and to commit to durable changes that reduce the chance of recurrence.

This skill operationalizes the Google SRE blameless post-mortem template, the Etsy "morgue" tradition, John Allspaw's "How Complex Systems Fail" reading, Charles Perrow's Normal Accident Theory, and Sidney Dekker's *Field Guide to Understanding "Human Error"*. Where the companion `discovery/pre-mortem/` skill imagines failure before it happens, post-mortem learns from failure that already did.

## Core Capabilities

- **Severity classification** — Sev 0-4 + near-miss thresholds, with post-mortem requirement and SLA per level
- **Blameless facilitation** — five ground rules, the Dekker New View, hindsight/counterfactual removal, the Allspaw test
- **10-section authoring** — header → summary → impact → timeline → what went well/wrong → factors → RCA → actions → lessons
- **Root-cause analysis** — 5 Whys for clear chains, Causal Tree for multi-factor Sev 0/1/2; root-cause vs contributing-factor
- **Action-item discipline** — single owner, real ticket, testable acceptance criteria, recurring completion audit
- **Distribution & archive** — audience-appropriate formats; searchable, service-tagged archive

## When to Use

- **Sev 1 / Sev 2 incident** — customer-facing outage, data loss, security event, payments failure, or significant regression.
- **Sev 3 with novelty** — worth a post-mortem if it surfaced a failure class the team has not seen before.
- **Missed launch or rolled-back release** — the launch itself is the incident.
- **Failed experiment with a negative business outcome** — e.g. a pricing test that depressed revenue.
- **Customer escalation** — an exec customer call where the product was the proximate cause.
- **Near miss** — the deploy that "almost" took the site down; some of the highest-leverage learning a team gets.

If the incident is below the severity threshold and the team has seen the same class of failure recently, document the recurrence in the existing post-mortem rather than producing a new one.

## Clarify First

Before authoring the post-mortem, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Severity level** — Sev 0-4 / near-miss sets the template depth, the SLA window, and whether 5 Whys or a Causal Tree is required
- [ ] **Incident timeline / chat transcript** — the source for the Timeline and Impact sections; without it the reconstruction is guesswork
- [ ] **Customer / business impact** — scope, duration, and who was affected drives both the Impact section and the severity itself
- [ ] **Root-cause method** — 5 Whys for a clear single chain vs Causal Tree for multi-factor Sev 0/1/2; drives the RCA section

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

1. At incident close, the incident commander assigns an author who opens `assets/post_mortem_template.md`.
2. Scaffold Header, Summary, Impact, and Timeline from the incident chat transcript.
3. Within the SLA window (Sev 1: 5 business days, Sev 2: 7), draft the remaining sections, run the chosen root-cause method, and hold a 60-90 min blameless review.
4. Apply the Allspaw test, file every action item as a real ticket with an owner and due date, then publish to the searchable archive.

The blameless principles, severity thresholds, full template, workflow, and root-cause methods all live in the references below.

## References

- **[references/post-mortem-process.md](references/post-mortem-process.md)** — severity thresholds, the 10-section template, the Day 0 → Day 30 workflow, action-item follow-through, distribution/archive practice, and the assets inventory. Read when running a post-mortem end to end.
- **[references/blameless-culture-guide.md](references/blameless-culture-guide.md)** — what blameless means, the Dekker reframe, blameful vs blameless phrasing, hindsight bias, counterfactuals, establishing the culture, plus the five ground rules and the Allspaw test. Read when facilitating or when a draft feels blameful.
- **[references/5-whys-vs-causal-tree.md](references/5-whys-vs-causal-tree.md)** — both root-cause methods with worked examples, the choose-between table, and the root-cause vs contributing-factors distinction. Read before the root-cause section of the meeting.
- **[references/red-flags.md](references/red-flags.md)** — 12 anti-patterns (blame language, ownerless action items, single root cause, second-mortems...), plus the troubleshooting table and success criteria. Read before publishing or signing off.
- **assets** — [post_mortem_template.md](assets/post_mortem_template.md) (SRE 10-section template), [incident_timeline_worksheet.md](assets/incident_timeline_worksheet.md) (timeline prompts), [action_item_tracker.md](assets/action_item_tracker.md) (cross-incident tracker), [what_went_well_prompts.md](assets/what_went_well_prompts.md) (positive-observation prompts).
- Foundational reading: Google SRE "Postmortem Culture"; Allspaw "Blameless PostMortems and a Just Culture" (2012); Cook "How Complex Systems Fail" (1998); Perrow *Normal Accidents* (1984); Dekker *Field Guide* (2014) and *Just Culture* (2017).

## Scope & Limitations

**In Scope:** Post-mortem authoring for incidents, outages, regressions, missed launches, failed experiments, customer escalations, and near misses. Severity classification, blameless facilitation, 5 Whys, Causal Tree analysis, action-item tracking, distribution and archival practice.

**Out of Scope:** Live incident command and on-call coordination (see `delivery-manager/`). Sprint retrospectives on team practice (see `sprint-retrospective/`). Risk surfacing before launch (see `discovery/pre-mortem/`). Quantitative reliability engineering and error-budget policy (see `engineering/` skills if present).

**Important Caveats:** Blameless culture is a prerequisite, not an output — if management uses post-mortems as a performance signal, the documents become sanitized; establish the separation in writing. Regulated industries (medical devices, aviation, financial services) that require named accountability should run a parallel internal blameless post-mortem alongside the regulator-facing report. A post-mortem is a learning artifact, not a fixing artifact: the fix lives in the action items and their follow-through, so one with zero completed action items is a failed post-mortem. (Cook's 4-page "How Complex Systems Fail" is worth reading before facilitating a complex Sev 0/1 — linked in the blameless culture guide.)

## Integration Points

| Integration | Direction | What flows |
|---|---|---|
| `discovery/pre-mortem/` | Bidirectional | Post-mortem findings update next launch's pre-mortem risk register; pre-mortem mitigations become post-mortem-checked controls |
| `delivery-manager/` | Receives from | Incident response context, severity classification, on-call handoffs |
| `sprint-retrospective/` | Bidirectional | Team-practice retros surface incident patterns; post-mortems feed retro themes |
| `daci-framework/` | Feeds into | Action items use DACI to assign owner (D), accountable (A), consulted, informed |
| `execution/dependency-map/` | Receives from | Cross-team contributing factors map to dependency-graph nodes |
| `execution/status-update-generator/` | Feeds into | Sev 0/1 incidents surface in weekly executive status updates |
| `senior-pm/` | Feeds into | Repeated incident classes feed portfolio risk register via `risk_matrix_analyzer.py` |
| `scrum-master/` | Feeds into | Action items become sprint backlog items with mitigation-focused stories |

---

## pre-mortem

Source path: `references/project-management/discovery/pre-mortem/SKILL.md`

# Pre-Mortem Risk Analysis Expert

## Overview

A pre-mortem is a prospective hindsight exercise: imagine that your product has launched and failed, then work backward to identify why. This skill uses the Tiger / Paper Tiger / Elephant classification to categorize risks by type and urgency, ensuring launch-blocking issues are addressed before launch while avoiding wasted effort on unlikely risks.

## Core Capabilities

- **Prospective hindsight framing** — "It is 14 days after launch, and we failed. Why?" surfaces specific, honest risks.
- **Tiger / Paper Tiger / Elephant classification** — separate real evidenced risks (Tigers) from anxiety (Paper Tigers) and unspoken concerns (Elephants).
- **Urgency triage** — tag each Tiger Launch-Blocking, Fast-Follow, or Track with owner and decision date.
- **6-phase facilitation** — scene-setting, silent generation, cluster, classify, mitigate, address elephants in 60-90 minutes.
- **Automated categorization** — `risk_categorizer.py` summarizes distribution and flags elephants needing escalation.

## When to Use

- Before committing significant resources to build (post-ideation, post-validation).
- Before a major launch, migration, or architectural change.
- When the team has "a bad feeling" they cannot articulate.
- When stakeholder confidence is high and you need to stress-test it.

## Clarify First

Before running the pre-mortem, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The thing being stress-tested** — the specific launch/build/migration that "failed 14 days after launch" (anchors the prospective-hindsight framing)
- [ ] **Failure horizon** — the date/milestone you imagine looking back from (a vague horizon produces vague risks)
- [ ] **Who's in the room** — the 4-8 participants and whether psychological safety exists (elephants only surface with candor and the right people)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
python3 scripts/risk_categorizer.py --demo            # built-in sample (7 risks)
python3 scripts/risk_categorizer.py input.json        # categorize your risks
python3 scripts/risk_categorizer.py input.json --format json
```

Each risk needs `description`, `category` (`tiger`/`paper_tiger`/`elephant`), `evidence`, and `urgency` (`launch_blocking`/`fast_follow`/`track`) for tigers. Document the session with `assets/pre_mortem_template.md`.

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/methodology-and-tools.md](references/methodology-and-tools.md)** — the thought experiment, full Tiger/Paper Tiger/Elephant classification with examples, urgency table, the 6-phase facilitation script, `risk_categorizer.py` usage and flags, output formats, troubleshooting, success criteria, and bibliography. Read when running or scripting a session.
- **[references/pre-mortem-guide.md](references/pre-mortem-guide.md)** — Gary Klein's origin and why pre-mortems work, when (and when not) to run one, deep classification criteria across domains, the facilitation timeline, and a worked SaaS launch example. Read for the theory and a full example.
- **[references/red-flags.md](references/red-flags.md)** — 12 anti-patterns (mitigation theater, groupthink, vague risks, over-mitigated elephants, late pre-mortems, missing owners) with bad/good examples and one-line checks. Read before sharing pre-mortem output.

## Scope & Limitations

**In Scope:** prospective hindsight using the "14 days after launch failure" framing; Tiger / Paper Tiger / Elephant classification with urgency levels; automated elephant escalation detection; risk registry generation; facilitation methodology for in-person and remote teams.

**Out of Scope:** ongoing risk management and tracking (see `senior-pm/risk_matrix_analyzer.py`); quantitative probability/impact scoring (`senior-pm/`); product discovery and hypothesis validation (`brainstorm-experiments/`); technical architecture risk assessment (`engineering/` skills).

**Important Caveats:** most effective with 4-8 participants; the elephant escalation keyword check is a heuristic; pre-mortems complement, not replace, assumption mapping (`identify-assumptions/`); psychological safety is a prerequisite.

## Integration Points

| Integration | Direction | Description |
|------------|-----------|-------------|
| `brainstorm-ideas/` | Receives from | Ideas that passed initial validation are subject to pre-mortem before full build |
| `brainstorm-experiments/` | Receives from | Post-experiment, pre-mortem stress-tests the build decision |
| `identify-assumptions/` | Bidirectional | Launch-blocking tigers may surface new assumptions; elephants often reveal avoided assumptions |
| `execution/create-prd/` | Feeds into | Tiger mitigations become PRD risk sections and assumption validation plans |
| `senior-pm/` | Feeds into | Launch-blocking tigers escalate into portfolio risk registers via `risk_matrix_analyzer.py` |
| `scrum-master/` | Feeds into | Fast-follow tigers become sprint backlog items with mitigation-focused stories |

---

## prfaq

Source path: `references/project-management/execution/prfaq/SKILL.md`

# PR/FAQ (Working Backwards) Expert

## Overview

The PR/FAQ is Amazon's "working backwards" artifact: before any team is funded to build a product, the PM writes a future-dated press release and an FAQ that anticipates every hard question. The discipline forces clarity on customer, problem, and outcome before a single design decision is made. If the team cannot write a compelling, credible PR/FAQ, the idea is not ready.

Use this skill when you need a high-fidelity narrative artifact for funding review, executive sponsorship, or a "should we even do this?" decision. The output is a single Markdown document with three sections: the press release, an internal FAQ (the questions your CFO, lawyer, and head of engineering will ask), and an external FAQ (the questions customers and press will ask). The PR/FAQ is not a PRD substitute -- it precedes the PRD -- and is not a marketing draft. The "Press Release Test" is the bar: if the press release would not strike a customer as genuinely newsworthy, the idea needs more work.

## Core Capabilities

- **Press release** -- the 9-part future-dated release in plain customer language, with the Press Release Test and headline/quote failure modes
- **Internal FAQ** -- 10-20 honest Q&A pairs across 9 required categories (demand, business model, strategic fit, competition, feasibility, ops, legal, risk, scope/alternatives)
- **External FAQ** -- buyer- and customer-facing questions that double as the first draft of help-center and sales-enablement content
- **Review choreography** -- the "5 readers" rule, versioning, and handoff to the PRD

## When to Use

- **Funding gate** -- A new initiative needs executive approval before spend.
- **Concept stress-test** -- An idea is exciting internally but you suspect the customer narrative is weak.
- **Cross-team alignment** -- Eng, design, marketing, and exec sponsors need one document they all agree on before kickoff.
- **Portfolio bake-off** -- Two or three competing ideas need apples-to-apples comparison; PR/FAQs reveal the strongest customer story.
- **Reframe a stalled project** -- A product in flight has lost the customer plot; rewriting the PR/FAQ surfaces what was lost.

**When NOT to use:** incremental features on an existing product (use `wwas/` or `job-stories/`); a signed-off PRD mid-build; pure technical infrastructure with no end-customer narrative.

## Clarify First

Before generating the PR/FAQ, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Customer + problem** — the "for [customer]" and the pain they feel today (drives the one-liner and press-release lead)
- [ ] **What makes it newsworthy** — the genuinely-new outcome (drives the headline and the Press Release Test pass/fail)
- [ ] **Hardest internal objection** — the CFO/eng/legal question you most fear (sets which of the 9 internal-FAQ categories to load)
- [ ] **Decision being made** — funding gate vs concept stress-test vs reframe (sets the bar and the primary reader)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

1. Complete the one-liner: "We are announcing \[product\] for \[customer\] that does \[outcome\]."
2. Draft the press release first; do not write any FAQ until it passes the Press Release Test with one outside reader.
3. Write the internal FAQ in question/answer pairs (PM asks, sponsor/finance/eng answers), then the external FAQ last.
4. Run the "5 readers" rule, date and save the artifact, then hand off to `create-prd/`.

Use `assets/prfaq_template.md` as the fill-in scaffold. See `references/prfaq-playbook.md` for the full structure, FAQ categories, sample questions, workflow, and troubleshooting.

## References

- **[references/prfaq-playbook.md](references/prfaq-playbook.md)** — the Working Backwards method, the 9-part press-release structure and test, internal/external FAQ category requirements and sample questions, the authoring workflow, troubleshooting, and success criteria. Read when drafting or reviewing a PR/FAQ.
- **[references/working-backwards-guide.md](references/working-backwards-guide.md)** — deep dive on the Amazon method, its origin/intent, and the review choreography that makes it effective. Read for context on why the discipline works.
- **[references/red-flags.md](references/red-flags.md)** — common ways a PR/FAQ goes wrong, with concrete fixes. Read before circulating a draft for review.
- `assets/prfaq_template.md` — complete fill-in PR/FAQ template (PR + internal FAQ + external FAQ).

## Scope & Limitations

**In scope:** press-release drafting in the Working Backwards format; internal FAQ across the 9 categories; external buyer/customer FAQ; the Press Release Test protocol; handoff to PRD (`create-prd/`) and roadmap (`outcome-roadmap/`).

**Out of scope:** marketing/ad copy or external launch press (handoff to marketing); detailed PRD authoring (`create-prd/`); OKR definition (`brainstorm-okrs/`); backlog drafting (`wwas/`, `job-stories/`); pricing strategy or financial modeling (`finance/`).

**Caveats:** The PR/FAQ is an internal alignment artifact, not for external publication. The format works best in cultures that tolerate written narrative memos; slide-deck cultures may need to adopt it gradually. A weak PR/FAQ is a feature, not a bug — it surfaces a weak idea; fix the idea, do not inflate the language.

## Integration Points

| Integration | Direction | Description |
|-------------|-----------|-------------|
| `discovery/brainstorm-ideas/` | Receives from | Top-ranked opportunity solutions become PR/FAQ candidates |
| `discovery/identify-assumptions/` | Receives from | Assumptions populate internal FAQ "what we do not know yet" answers |
| `discovery/pre-mortem/` | Receives from | Tiger risks populate internal FAQ "failure modes" answers |
| `execution/create-prd/` | Feeds into | Approved PR/FAQ becomes the prologue and scope anchor for the PRD |
| `execution/brainstorm-okrs/` | Feeds into | Press release outcomes become OKR candidates |
| `execution/outcome-roadmap/` | Feeds into | PR/FAQ launch date and v1 scope inform roadmap horizon placement |
| `execution/roadmap-communication/` | Feeds into | PR/FAQ summary becomes the executive-variant roadmap narrative |
| `marketing/` (skills domain) | Hands off to | After launch approval, marketing teams adapt the PR into actual launch press materials |

---

## pricing-prd

Source path: `references/project-management/execution/pricing-prd/SKILL.md`

# Pricing PRD (Tactical)

## Overview

A pricing PRD is the tactical artifact that converts a pricing strategy into a shipped change. Where `business-growth/pricing-strategy/` decides "we are moving from per-seat to per-usage and adding an enterprise tier", a pricing PRD decides "here is the page, the experiment, the rollout, and the rollback". Most PMs underinvest in this artifact — they treat pricing as a marketing problem until the rollout breaks revenue.

This skill is opinionated about the structure of a pricing PRD (distinct from a feature PRD), the discipline of pricing experiments (small samples + revenue sensitivity == high risk of false-positive readouts), grandfathering and communication (the most-often-skipped sections that cause the most damage), A/B testing pricing without confusing customers or violating consumer-law principles, and rollback criteria written in advance rather than improvised under pressure. The frameworks behind it: Patrick Campbell's "Pricing as a feature", Ramanujam's *Monetizing Innovation*, Van Westendorp's Price Sensitivity Meter, Reforge pricing experimentation, and Stripe's pricing-page patterns.

## Core Capabilities

- **PRD structure** — the 13-section pricing PRD: pricing model, packaging, grandfathering, communication plan, A/B design, rollback, regional pricing, on top of the standard PRD spine.
- **Pricing model & packaging decisions** — tier / usage / hybrid / per-seat / outcome-based selection with rationale; value carriers, tier boundaries, trial mechanisms.
- **Willingness-to-pay research** — Van Westendorp, conjoint, and revealed-preference experiments.
- **Experiment discipline** — hypothesis, primary metric, MDE, sample size, holdout, stop conditions, mix-shift detection.
- **Risk management** — grandfathering policy, multi-channel communication plan, pre-written rollback thresholds, regional/compliance decisions.

## When to Use

- Launching a new pricing model or tier
- Updating prices on existing packages
- Adding usage-based components to a previously flat-fee product
- Reshaping packaging (moving features between tiers, sunsetting a tier, adding entitlements)
- Running a pricing A/B test
- Localizing prices to a new region or currency
- Splitting self-serve and enterprise pricing surfaces

**When NOT to use:** for the strategic question "should we change pricing at all?" (use `business-growth/pricing-strategy/`); for the financial-modeling side (use `finance/` skills); for SKU/billing implementation (engineering tickets generated from this PRD).

## Clarify First

Before generating the pricing PRD, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Pricing model change** — tier / usage / hybrid / per-seat / outcome-based shift (drives the pricing-model + packaging sections)
- [ ] **Existing customers' fate** — the grandfathering policy (drives the most-skipped grandfathering + communication sections that cause the most damage)
- [ ] **Experiment vs hard launch** — A/B test or direct rollout (drives the experiment-design section: hypothesis, MDE, holdout)
- [ ] **Rollback trigger** — the revenue/conversion threshold that aborts the change (drives the pre-written rollback criteria)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## References

Pull the reference that matches the task; keep this file lean and load detail on demand.

- **[references/pricing-prd-playbook.md](references/pricing-prd-playbook.md)** — the full end-to-end playbook: pricing-PRD-vs-feature-PRD table, model decision, willingness-to-pay methods, packaging, grandfathering, communication plan, A/B test design, rollback criteria, regional pricing, UX checklist, anti-patterns, 12-step workflow, tools/assets table, troubleshooting, success criteria, and source frameworks. Read when authoring any pricing PRD.
- **[references/pricing-experimentation-guide.md](references/pricing-experimentation-guide.md)** — deep guide on pricing A/B tests, mix-shift detection, and readout windows. Read when designing or reading out a pricing experiment.
- **[references/packaging-frameworks.md](references/packaging-frameworks.md)** — tier vs usage vs hybrid frameworks and Ramanujam-style packaging. Read when deciding what goes in which tier.
- **[references/red-flags.md](references/red-flags.md)** — concrete examples of how pricing PRDs go wrong and how to fix them. Read when reviewing a draft for quality.
- **assets/pricing_prd_template.md** — 13-section pricing PRD template. Use to author the artifact.
- **assets/pricing_experiment_design.md** — A/B test design worksheet (hypothesis, MDE, holdout). Use when planning a test.
- **assets/pricing_page_checklist.md** — UX review checklist for the pricing page. Use before shipping the page.
- **assets/grandfathering_communication_template.md** — customer email for grandfathering communication. Use when drafting the comm plan.

## Scope & Limitations

**In Scope:** Tactical pricing PRD authoring, willingness-to-pay research summary (Van Westendorp, conjoint), packaging decisions, grandfathering policy, customer/sales/support communication plan, A/B test design, rollback criteria, regional pricing decisions, pricing-page UX checklist, anti-pattern avoidance.

**Out of Scope:** Strategic pricing question "should we change pricing at all?" (see `business-growth/pricing-strategy/`). Financial modeling and revenue projection (see `finance/`). Billing and subscription-management implementation (engineering tickets). Detailed conjoint analysis methodology (specialist tooling). Legal review of pricing terms in regulated jurisdictions (must involve actual legal counsel; this skill is not legal advice).

**Important Caveats:**
- Pricing changes have asymmetric risk. A bad pricing change can erase a year of growth. The PRD discipline (rollback criteria, holdout, communication plan) is risk management, not bureaucracy.
- A/B testing pricing on identified customers carries consumer-law risk in some jurisdictions. When in doubt, test on anonymous visitors only and consult legal.
- The Van Westendorp method has known limitations — stated preference rather than revealed, feature-blind, segment-aggregated. Use as one input among three, not as the answer.
- Pricing-page UX changes can be confounded with pricing-model changes in A/B tests. Run UX-only experiments separately from model-change experiments to attribute the lift correctly.

## Integration Points

| Integration | Direction | What flows |
|---|---|---|
| `business-growth/pricing-strategy/` | Receives from | Strategic direction (new model, new tier, new segment) becomes the input to the tactical PRD |
| `create-prd/` | Extends | Pricing PRD uses sections 1-2 of standard PRD plus 11 pricing-specific sections |
| `feature-flag-strategy/` | Feeds into | Pricing rollout uses feature flags for tier entitlements and rollback |
| `activation-funnel/` | Bidirectional | Pricing changes affect activation rates; activation funnel measures the impact |
| `customer-feedback-triage/` | Receives from | Pricing-related feedback clusters surface willingness-to-pay signals and bill-shock issues |
| `finance/` | Bidirectional | Finance models the revenue projection; pricing PRD constrains the model assumptions |
| `senior-pm/` | Feeds into | Pricing change becomes a portfolio risk and an executive update item |
| `prfaq/` | Feeds into | A new pricing model often warrants a PR/FAQ for internal alignment |
| `eol-communication/` | Pattern overlap | EOL of a pricing tier uses similar grandfathering and communication patterns |
| `launch-playbook/` | Feeds into | Pricing-page launch follows standard launch playbook for internal/external comm coordination |

---

## prioritization-frameworks

Source path: `references/project-management/execution/prioritization-frameworks/SKILL.md`

# Prioritization Framework Expert

## Overview

A comprehensive reference to 9 prioritization frameworks with automated scoring, ranking, and guidance on which framework to use in which situation. The core principle: prioritize problems (opportunities), not features. Features are solutions to problems. If you prioritize features directly, you skip the step of understanding whether the problem is worth solving.

## Core Capabilities

- **9 frameworks** — RICE, ICE, Opportunity Score, Eisenhower, Impact vs Effort, Risk vs Reward, Kano, Weighted Decision Matrix, MoSCoW (full definitions, formulas, and worked examples in `references/frameworks-catalog.md`).
- **Framework selection** — a decision tree maps the thing you are prioritizing (problems, features, personal tasks, high-uncertainty bets) to the right method.
- **Automated scoring** — `prioritization_scorer.py` ranks items for RICE, ICE, Opportunity, MoSCoW, and Weighted Decision Matrix.
- **Two-step discipline** — prioritize problems first (Opportunity Score), then prioritize solutions (RICE/ICE).

## When to Use

- **Backlog Grooming** -- Too many items, need to rank them objectively.
- **Quarterly Planning** -- Deciding which initiatives to invest in.
- **Stakeholder Alignment** -- Need a structured way to resolve competing priorities.
- **Feature Triage** -- Quick sorting of a long list into actionable categories.

## Clarify First

Before scoring, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **What you're ranking** — problems/opportunities vs features vs personal tasks (the decision tree picks the framework from this)
- [ ] **Framework** — rice / ice / opportunity / moscow / weighted (each requires different score fields and emits different rankings)
- [ ] **Quality of the estimates** — measured data vs guesses for reach/impact (guesses make RICE/ICE precision misleading; switch to a coarser method)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

| Tool | Purpose | Command |
|------|---------|---------|
| `prioritization_scorer.py` | Score and rank items | `python scripts/prioritization_scorer.py --input items.json --framework rice` |
| `prioritization_scorer.py` | Demo with sample data | `python scripts/prioritization_scorer.py --demo --framework rice` |

Supported frameworks: `rice`, `ice`, `opportunity`, `moscow`, `weighted`. See `references/tool-and-troubleshooting.md` for input JSON schemas and flags.

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/frameworks-catalog.md](references/frameworks-catalog.md)** — full definitions, formulas, strengths/weaknesses, and worked examples for all 9 frameworks, the framework decision tree, and the "prioritize problems, not features" principle. Read when choosing or applying a specific framework.
- **[references/prioritization-guide.md](references/prioritization-guide.md)** — detailed formulas, decision tree, and facilitation tips. Read when facilitating a scoring session with a group.
- **[references/red-flags.md](references/red-flags.md)** — anti-patterns and warning signs in prioritization practice. Read when a process feels off or results are being gamed.
- **[references/tool-and-troubleshooting.md](references/tool-and-troubleshooting.md)** — `prioritization_scorer.py` flags, per-framework input JSON schemas, troubleshooting table, and success criteria. Read when running the tool or diagnosing scoring problems.
- **[assets/prioritization_matrix_template.md](assets/prioritization_matrix_template.md)** — scoring templates for each framework. Use when capturing a manual scoring exercise.

## Scope & Limitations

**In Scope:**
- 9 prioritization frameworks with scoring, ranking, and explanation (RICE, ICE, Opportunity Score, Eisenhower, Impact vs. Effort, Risk vs. Reward, Kano, Weighted Decision Matrix, MoSCoW)
- Automated scoring and ranking for RICE, ICE, Opportunity Score, MoSCoW, and Weighted Decision Matrix
- Framework selection guidance via Decision Tree
- Demo data for each framework to illustrate input/output formats

**Out of Scope:**
- Real-time Jira/Linear backlog integration (manual JSON input required)
- Cost-of-delay or WSJF calculations (see `senior-pm/` skill for SAFe portfolio prioritization)
- User research to gather importance/satisfaction data for Opportunity Score (see `product-team/` skills)
- Strategic portfolio allocation decisions (see `senior-pm/` skill)

**Important Caveats:**
- No framework produces a "correct" answer. Prioritization frameworks are decision-support tools that structure conversation, not algorithms that replace judgment.
- RICE and ICE are best for data-rich environments. If your reach and impact estimates are pure guesses, the precision of the formula is misleading.
- The most successful teams combine frameworks: start with Opportunity Score to identify the right problems, then use RICE to rank solutions.
- For teams with 50+ people or multiple stakeholder groups, use WSJF or Weighted Decision Matrix with agreed criteria to ensure buy-in.

## Integration Points

| Integration | Direction | Description |
|------------|-----------|-------------|
| `execution/outcome-roadmap/` | Feeds into | Prioritized items inform Now/Next/Later horizon placement |
| `execution/create-prd/` | Feeds into | Top-priority items become PRD candidates with P0/P1/P2 feature labels |
| `execution/brainstorm-okrs/` | Complements | Prioritized initiatives inform which OKR theme to focus on this quarter |
| `discovery/identify-assumptions/` | Receives from | Assumption risk scores inform item confidence ratings in RICE/ICE |
| `scrum-master/` | Feeds into | Prioritized backlog items feed sprint planning commitment decisions |
| `senior-pm/` | Receives from | Portfolio-level WSJF or strategic priorities constrain team-level prioritization |

---

## product-vision

Source path: `references/project-management/execution/product-vision/SKILL.md`

# Product Vision Expert

## Overview

The Product Vision is the narrative that sits above the north-star metric -- the answer to "where are we going and why" that aligns engineers, designers, marketers, executives, and customers around a single point on the horizon. Without a vision, teams optimize local metrics; with a vision, teams optimize toward a shared destination.

A vision is *not* a mission, *not* a strategy, *not* a roadmap. A mission says why the company exists. A strategy says how it will win. A roadmap says what ships next quarter. A vision says where the product will be in 5-10 years -- specific enough to inspire engineering decisions today, ambitious enough to outlast any current technology or market condition. This skill produces the vision document across four canonical formats -- Roman Pichler's **Product Vision Board** (one-page diagnostic), Geoffrey Moore's **elevator pitch** (single-sentence positioning from *Crossing the Chasm*), Andy Raskin's **strategic narrative** (5-act story arc), and Marty Cagan's **10-year horizon** -- plus an Amazon Working Backwards press release and a review checklist for testing whether a vision actually works.

## Core Capabilities

- **Pichler Vision Board** -- one-page, five-block canvas (vision, audience, needs, product, business goals)
- **Moore elevator pitch** -- single-sentence positioning statement that forces specificity
- **Raskin strategic narrative** -- 5-act story arc for pitches, board, all-hands, fundraising
- **Cagan 10-year horizon** -- long-form vision for multi-year architecture and senior hiring
- **Vision Review Checklist** -- score inspiring / concrete / durable / differentiated / memorable

## When to Use

- **New product launch.** Articulate the destination before committing engineering quarters.
- **Major pivot.** Direction has shifted and the old vision no longer fits. Reset.
- **Strategy reset.** Annual or pre-funding-round refresh of the long-term direction.
- **Stakeholder misalignment.** Engineering, design, and exec are pulling in different directions; re-articulating the vision surfaces the disagreement.
- **Hiring at scale.** You need a vision compelling enough that prospective hires can decide whether to join. Vague visions repel strong talent.

## Clarify First

Before generating the vision, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Target customer + their core need** — who and what pain (drives the Pichler Board audience/needs blocks and Moore's "for [customer]")
- [ ] **Format** — Pichler Board / Moore elevator pitch / Raskin narrative / Cagan 10-year (sets the entire structure of the artifact)
- [ ] **Time horizon** — 5 vs 10 years out (calibrates ambition; Cagan 10-year demands a different altitude than a near-term board)
- [ ] **Why now — the change** — the shift that makes this inevitable (drives the Raskin narrative's opening act and the vision's differentiation)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

1. Gather inputs: customer interviews, JTBD hierarchy, value proposition canvas, competitive landscape.
2. Pick a starting format -- new product: Pichler Board; reset: Raskin narrative; multi-year: Cagan 10-year.
3. Draft, then **translate into a second format** -- a vision that survives translation is sharp.
4. Run the Vision Review Checklist; rewrite anything scoring under 3 of 5.
5. Test with 3 internal audiences and 2 customers; publish as the first link in onboarding and the cover of strategy decks; revisit annually.

## References

Load the reference that matches the task -- keep this file lean and pull detail on demand:

- **[references/vision-playbook.md](references/vision-playbook.md)** -- the operational playbook: the layer comparison (mission/vision/strategy/roadmap), all four framework templates in detail, the Amazon Working Backwards note, the full Vision Review Checklist, the end-to-end Reconcile worked example, the drafting workflow, troubleshooting, and success criteria. Read this when drafting or reviewing a vision.
- **[references/vision-frameworks-guide.md](references/vision-frameworks-guide.md)** -- the framework theory (Pichler, Moore, Raskin, Cagan, Amazon) with block-by-block guidance and "choosing a framework" advice. Read this when you need the reasoning behind each format.
- **[references/red-flags.md](references/red-flags.md)** -- 10 vision anti-patterns (vision = mission, 12-month vision, vision without a customer, vision as roadmap) with symptoms and fixes. Read this when stress-testing a draft.

Templates live in `assets/`: `vision_board_template.md`, `narrative_vision_template.md`, `elevator_pitch_template.md`, `vision_review_checklist.md`.

## Scope & Limitations

**In scope:** vision drafting across 4 frameworks (Pichler, Moore, Raskin, Cagan); the Vision Review Checklist; worked examples and templates; translation between formats; integration with downstream artifacts (NSM, OKRs, roadmap, PRDs).

**Out of scope:** mission statement writing; strategy document construction (`c-level-advisor/`); brand positioning and messaging (`marketing/`); Working Backwards PR/FAQ (`execution/prfaq/`); NSM definition (`execution/north-star-metric/`); OKR drafting (`execution/brainstorm-okrs/`).

**Caveats:** a vision is *not* a marketing document (marketing language belongs in messaging); a vision that is never used is worse than no vision; the 10-year horizon is uncomfortable for execution-minded teams -- the discomfort is the point; a vision can be wrong -- commit, build, and update on evidence.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `discovery/value-proposition-canvas/` | Receives from | Customer Profile (jobs, pains, gains) feeds Pichler Board "Needs" block |
| `discovery/jtbd-workshop/` | Receives from | Job hierarchy and top outcomes inform the vision's customer + outcome |
| `discovery/customer-interview-script/` | Receives from | Verbatim customer language sharpens vision phrasing |
| `execution/north-star-metric/` | Feeds into | The NSM derives from the vision -- the vision's outcome becomes the NSM input metric tree root |
| `execution/outcome-roadmap/` | Feeds into | The roadmap delivers the vision; every roadmap theme should trace back |
| `execution/brainstorm-okrs/` | Feeds into | OKRs serve the vision -- each quarterly objective should advance one vision pillar |
| `execution/prfaq/` | Complementary | Working Backwards PR is one expression of the vision; the FAQ stress-tests it |
| `execution/create-prd/` | Feeds into | PRDs explicitly reference the vision in Section 3 (Background) |
| `execution/roadmap-communication/` | Feeds into | Vision is the opening frame of every exec/customer roadmap presentation |
| `c-level-advisor/cto-advisor/` | Bidirectional | CTO uses vision to drive architecture bets; vision is informed by tech feasibility |

---

## productboard-expert

Source path: `references/project-management/productboard-expert/SKILL.md`

# Productboard Expert

Master-level expertise in Productboard workspace configuration, Insight inbox triage, Driver-based prioritization, Feature hierarchy management, Releases and Roadmap views, REST API operations, and two-way integration with Jira, Linear, Azure DevOps, Salesforce, Intercom, and Slack. Productboard sits between customer-feedback intake (Slack/Intercom/Salesforce/email) and the engineering tracker (Jira/Linear), with an opinionated three-layer model that differs meaningfully from generic issue trackers.

## Overview

Productboard separates three layers: **Insights** (inbound customer evidence), **Features** (candidate product changes organized in Components and parent/child hierarchy), and **Drivers + Releases** (the prioritization framework — Drivers = weighted criteria, Releases = time-boxed delivery groupings). Insights link to Features (many-to-many); Features score against Drivers; high-scoring Features get added to Releases; Releases push down to Jira/Linear epics. The flow is **inbox → triage → prioritize → ship**.

The job of a Productboard expert is to operate fluently inside this model: configure the workspace cleanly, run the Insight inbox without backlog, design Driver weightings that match company strategy, and write API automations for what the UI does not cover.

## Core Capabilities

- **Workspace & hierarchy setup** — Components, Feature taxonomy, Tags, custom fields, roles
- **Insight inbox triage** — the highest-leverage daily ritual; verbatim discipline, multi-Feature linking
- **Driver configuration & Feature scoring** — 3-5 weighted Drivers, composite scoring, quarterly re-weighting
- **Releases & Roadmap views** — time-boxed delivery, audience-specific views, Portal for customers
- **REST API automation** — bulk Insight/Feature operations, webhooks, custom-field updates, pagination
- **Two-way integration** — Jira/Linear/Azure DevOps (Features↔Epics) and Salesforce/HubSpot/Intercom/Zendesk (Insight capture)

## When to Use

- Setting up a new Productboard workspace, Component hierarchy, or Feature taxonomy
- Configuring Drivers and weighting them against strategic objectives
- Running the Insight inbox triage workflow (the highest-leverage daily ritual)
- Configuring two-way Jira/Linear/Azure DevOps integration or CRM customer sync
- Building Roadmap views for executives, customers, and internal teams
- Writing API calls to bulk-create Insights, update Features, or read prioritization data
- Migrating from spreadsheet-based prioritization, or troubleshooting "Insights aren't flowing", "scores aren't updating", and similar workflow failures

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/operations-playbook.md](references/operations-playbook.md)** — concepts (data model, three layers, Importance×Evidence), all 9 core workflows (setup, triage, Drivers, scoring, Releases, integrations, capture, bulk ops), inline API call catalog, best practices, troubleshooting table, and success criteria. Read this for any setup, triage, scoring, or API task.
- **[references/productboard-api-patterns.md](references/productboard-api-patterns.md)** — full REST API call catalog with curl examples and JSON shapes. Read when scripting against the API.
- **[references/productboard-vs-jira-vs-linear.md](references/productboard-vs-jira-vs-linear.md)** — when to use Productboard alongside (or instead of) Jira/Linear; concept translation. Read when positioning the tool in an existing stack.
- **[references/red-flags.md](references/red-flags.md)** — common ways this skill's output goes wrong, with fixes. Read before finalizing a workspace design or prioritization recommendation.
- Assets: `assets/productboard-feature-template.md` (Feature structure), `assets/productboard-insight-triage-workflow.md` (daily triage SOP), `assets/productboard-driver-template.md` (Driver definitions). Official docs: https://developer.productboard.com/ · https://help.productboard.com/

## Scope & Limitations

**In Scope:** Workspace and Component hierarchy setup, Insight inbox triage, Driver configuration and Feature scoring, Releases and Roadmap views (internal and customer-facing), Productboard REST API operations (Features, Insights, Releases, custom fields, webhooks), two-way integration setup with Jira/Linear/Azure DevOps, customer-data sync from Salesforce/HubSpot, bulk operations via API, Portal configuration.

**Out of Scope:** Engineering-side Jira/Linear configuration (see `jira-expert/`, `linear-expert/`). Strategic prioritization framework selection (see `execution/prioritization-frameworks/`). PRD authoring (see `execution/create-prd/`). Customer interview synthesis (see `discovery/interview-synthesis/`).

**Limitations:** API rate limits are workspace-wide; aggressive scripts can starve the UI. The Salesforce/HubSpot integration is one-way (CRM → Productboard) on a schedule, not real time. Drivers max out at 10 per workspace on most plans. Roadmap views are good for time-bound delivery (Releases) but weaker for outcome-based roadmaps (Now/Next/Later) — augment with `execution/outcome-roadmap/`. Per-Component access control is an Enterprise feature.

## Integration Points

| Integration | Direction | What flows |
|---|---|---|
| `jira-expert/` | Productboard ↔ Jira | Features push as Epics; status flows back; Sprint plan derived from prioritization |
| `linear-expert/` | Productboard ↔ Linear | Features push as Projects/Issues; Cycle assignment from Release dates |
| `execution/prioritization-frameworks/` | Bidirectional | Drivers operationalize RICE/ICE/WSJF; external scores import as custom fields |
| `execution/create-prd/` | Productboard → PRD | High-priority Features become PRDs; PRD link returns as custom field |
| `execution/outcome-roadmap/` | Bidirectional | Outcome themes map to Objectives; Releases give the delivery side |
| `execution/roadmap-communication/` | Productboard → Comms | Customer-facing Roadmap variants pull from Portal |
| `execution/customer-feedback-triage/` | Bidirectional | Triaged feedback clusters become Insights; inbox is the triage entry point |
| `execution/release-notes/` | Productboard → Release Notes | Completed Features in a Release become release-note line items |
| `senior-pm/` | Productboard → Portfolio | Driver scores and Feature distribution feed portfolio health |
| `notion-pm/` | Productboard ↔ Notion | Roadmap embeds into Notion; deep PRDs live in Notion linked from Features |
| `discovery/interview-synthesis/` | Bidirectional | Interview insights become Notes; high-evidence Features motivate interviews |
| `business-growth/customer-success/` | CS → Productboard | CS is a primary Insight source via Salesforce / Intercom integration |

---

## program-manager

Source path: `references/project-management/program-manager/SKILL.md`

# Program Manager

The agent acts as an expert program manager coordinating complex multi-project initiatives. It structures governance, manages cross-project dependencies, tracks benefits realization, and communicates status to steering committees with appropriate escalation.

## Core Capabilities

- **Program structure & governance** — portfolio→program→project→workstream hierarchy, governance bodies, decision rights, escalation matrix.
- **Charter creation** — business case, scope, structure, governance, and benefit-linked success criteria with required sponsor sign-off.
- **Dependency & critical-path mapping** — cross-project dependency matrix, integration tracking, mitigation for high-risk links.
- **Resource & benefits planning** — FTE/budget forecasting with over-allocation flags; benefits baselined at program start and tracked to target.
- **Status reporting & stakeholder management** — RAG dashboards per governance body, Mendelow power-interest segmentation, risk register scoring.

## When to Use

- Standing up a new program (structure, governance, charter, sponsor).
- Managing cross-project dependencies and a shared critical path.
- Tracking benefits realization against the original business case.
- Reporting program status to steering committees and managing escalations.

## Clarify First

Before generating the program artifact, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which artifact** — program charter, dependency/critical-path map, benefits tracker, or steering status report (each has a distinct structure)
- [ ] **Audience / governance body** — steering committee, sponsor, or working team (sets the RAG altitude and escalation framing)
- [ ] **Project and dependency data** — the projects, cross-project links, and milestones in scope (the critical path and matrix are only as good as this)
- [ ] **Benefits baseline** — the original business-case targets, when tracking benefits (realization is meaningless without the baseline)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
python scripts/dependency_analyzer.py --projects projects.yaml      # critical path
python scripts/resource_forecast.py --program program.yaml --months 12
python scripts/benefits_tracker.py --plan benefits_plan.yaml
python scripts/program_dashboard.py --program "Name"                # RAG dashboard
```

Run the six-step workflow (structure → charter → dependencies → resources → benefits → status) — full procedure, tables, validation checkpoints, and dashboard format are in the operating guide below.

## References

- `references/program-operating-guide.md` — read this when running the program: six-step workflow, governance/escalation tables, dependency matrix, dashboard example, stakeholder & risk management, tool commands, troubleshooting, and success criteria.
- `references/red-flags.md` — read this before publishing any program artifact (dependency map, RAID log, steering deck, status report): common failure modes with bad/good examples and fixes.

## Scope & Limitations

**In Scope:** Program charter creation, governance structure design, cross-project dependency management, benefits realization tracking, resource allocation planning, stakeholder communication, risk management, milestone tracking, steering committee facilitation, escalation management.

**Out of Scope:** Individual project execution (hand off to project managers), sprint-level delivery (hand off to `scrum-master/`), tool configuration (hand off to `jira-expert/`), production deployments (hand off to `delivery-manager/`), budget approval authority (retained by Steering Committee).

**Limitations:** Benefits realization accuracy depends on finance team providing baseline and actual financial data. Resource forecasting assumes stable team composition -- high attrition invalidates projections. Governance effectiveness requires consistent executive participation; sponsor turnover can reset program momentum. SAFe/LeSS scaling recommendations assume teams have achieved at least agile maturity Level 2.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `senior-pm/` | Bidirectional | Portfolio priorities inform program scope; program status feeds portfolio dashboard |
| `delivery-manager/` | PgM -> DM | Program milestones and release windows; cross-project deployment coordination |
| `agile-coach/` | Coach -> PgM | Scaling framework recommendations (SAFe, LeSS) inform program governance design |
| `scrum-master/` | SM -> PgM | Team velocity and capacity data for resource forecasting |
| `jira-expert/` | PgM -> Jira | Cross-project epic tracking, program-level dashboards, dependency issue types |
| `confluence-expert/` | PgM -> Confluence | Program charter, governance docs, stakeholder communication archives |

---

## quarterly-planning

Source path: `references/project-management/execution/quarterly-planning/SKILL.md`

# Quarterly Planning Expert

## Overview

Quarterly planning is the operating cadence that turns annual strategy into quarterly outcomes. Done well, it produces aligned OKRs, a roadmap that delivers them, a capacity plan that respects reality, and a tracking ritual that catches drift before it compounds. Done poorly, it produces OKR theater -- a slide deck of objectives that nobody references after week two.

This skill is the **above-OKR-writing** companion to `execution/brainstorm-okrs/`. Where `brainstorm-okrs/` covers how to write good OKRs, this skill covers the full quarterly cycle around them: pre-quarter homework, kickoff agenda, mid-quarter check-in, close-of-quarter retro, and the weekly/biweekly tracking cadence. The framework synthesizes four sources: Wodtke's *Radical Focus* (Monday-commit / Friday-celebrate rhythm, one OKR per quarter), Reforge's product strategy cycle, Cagan's quarterly product strategy, and the RAD ritual (Reflect-Align-Decide) used inside each meeting.

## Core Capabilities

- **Pre-quarter homework** -- strategy review, outcome candidate list, capacity assessment, and the 1-page kickoff brief
- **Kickoff facilitation** -- the 2-3hr RAD agenda that commits OKRs, roadmap, and capacity
- **Weekly Wodtke rhythm** -- Monday Commit, Friday Celebrate, biweekly KR confidence review
- **Mid-quarter check-in** -- carry / kill / pivot / escalate decisions at week 6
- **Close retro** -- 0.0-1.0 OKR scoring, learning extraction, and next-cycle seeding

## Clarify First

Before running a phase, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which phase** — pre-quarter/kickoff vs mid-quarter check-in vs close retro (selects the agenda and artifacts produced)
- [ ] **Position in the 13-week cycle** — what week you're in (the carry/kill/pivot check belongs at ~week 6, the retro at week 13)
- [ ] **Existing OKRs & strategy** — the committed Objective and the annual strategy it serves (the kickoff commits OKRs; every Objective must trace to a vision pillar)
- [ ] **Real team capacity** — honest capacity after PTO/on-call (a stretch slate dressed as commitments is the #1 cadence failure)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## The Quarterly Cycle

```
Week -3   -1     0       1-5    6      7-12    13
  | Pre-quarter | Kickoff |  Mid-quarter  | Close
  |  homework   | (start) |   check-in    | retro
  +--Reforge/Cagan--+-- Wodtke weekly Mon/Fri rhythm --+
```

- **Pre-quarter (weeks -3 to -1):** run the homework and kickoff to commit OKRs and roadmap.
- **Mid-quarter (~week 6):** run the check-in to course-correct.
- **Close (week 13):** run the retro to extract learning before the next cycle.

## When to Use

- **Pre-quarter (2-3 weeks before start).** Run the homework and kickoff to commit OKRs and roadmap.
- **Mid-quarter (~week 6 of 13).** Run the mid-quarter check-in to course-correct.
- **Close-of-quarter (last week).** Run the close retro to extract learning before next planning cycle.
- **New PM joining mid-quarter.** Understand where the team is in the cycle and what is expected when.
- **Failing OKR cadence.** Team has OKRs but no one references them by week 4 -- reset the ritual.

## References

Load the reference that matches the task -- keep this file lean and pull detail on demand:

- **[references/cycle-playbook.md](references/cycle-playbook.md)** -- the full operational playbook: pre-quarter homework + kickoff brief template, kickoff / mid-quarter / close agendas, the weekly Wodtke rhythm scripts, anti-patterns, artifacts-produced map, troubleshooting, and success criteria. Read this when running any phase of the cycle.
- **[references/quarterly-planning-guide.md](references/quarterly-planning-guide.md)** -- the framework theory (Wodtke Radical Focus, Cagan product strategy, Reforge cycle, RAD ritual) with a worked Reconcile Q3 example. Read this when you need the reasoning behind the rituals.
- **[references/red-flags.md](references/red-flags.md)** -- 11 quarterly-planning anti-patterns (OKR theater, capacity in story points, stretch goals as committed slate) with symptoms and fixes. Read this when reviewing a quarter's plan or diagnosing a failing cadence.

Templates live in `assets/`: `kickoff_agenda_template.md`, `mid_quarter_check_in_template.md`, `close_retro_template.md`, `quarterly_review_deck_outline.md`.

## Scope & Limitations

**In scope:** pre-quarter homework (strategy, outcomes, capacity); kickoff agenda; weekly Wodtke rhythm; biweekly KR confidence review; mid-quarter check-in; close retro; carry/kill/pivot framework; quarterly review deck outline.

**Out of scope:** writing individual OKRs (`execution/brainstorm-okrs/`); roadmap construction (`execution/outcome-roadmap/`); sprint-level planning (`scrum-master/`); multi-quarter / annual strategy (`c-level-advisor/`); performance management (`career/`); portfolio management (`program-manager/`).

**Caveats:** the cycle is the system -- skipping one ritual (especially the close retro) degrades the next quarter; OKRs are a tool for focus, not control (Wodtke argues one Objective per team per quarter); the skill assumes a 13-week quarter; it works best where the company has shared OKR practice.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `execution/brainstorm-okrs/` | Bidirectional | Quarterly cycle uses OKRs; OKR drafting is a kickoff sub-skill |
| `execution/outcome-roadmap/` | Bidirectional | Quarterly OKRs become Now-horizon roadmap; roadmap themes inform candidate outcomes |
| `execution/north-star-metric/` | Receives from | NSM is the long-term metric; quarterly KRs are short-term moves on it |
| `execution/product-vision/` | Receives from | Every Objective must trace to a vision pillar |
| `execution/dependency-map/` | Receives from | Pre-quarter dependency mapping prevents week-6 surprises |
| `execution/status-update-generator/` | Feeds into | Weekly Wodtke rhythm produces input for exec status updates |
| `execution/cycle-time-analyzer/` | Receives from | Flow metrics inform capacity assessment |
| `discovery/customer-interview-script/` | Receives from | Recent customer signal feeds the strategy review |
| `discovery/jtbd-workshop/` | Receives from | Top desired outcomes seed the outcome candidate list |
| `scrum-master/` | Feeds into | Quarterly OKRs cascade into sprint capacity planning |
| `senior-pm/` | Feeds into | Quarterly artifacts inform portfolio-level reporting |
| `career/pm-onboarding/` | Complementary | New PMs use this skill in their 30-60-90 plan to ramp on team cadence |

---

## release-notes

Source path: `references/project-management/execution/release-notes/SKILL.md`

# Release Notes Expert

## Overview

Transform raw technical changes -- tickets, changelogs, git logs, PRDs -- into clear, user-benefit-oriented release notes. This skill ensures every release communicates value to the right audience in the right tone, via a 5-step methodology: gather input, classify each change into one of five categories, rewrite for user benefit, adjust tone for the audience, and assemble.

### When to Use

- **Product Releases** -- Announcing new versions to customers, partners, or internal stakeholders.
- **Sprint Demos** -- Summarizing what shipped for sprint review audiences.
- **Changelog Maintenance** -- Keeping a running log of changes across releases.
- **Customer Communication** -- Preparing release announcements for email, in-app, or documentation.

## Core Capabilities

- **5-category classification** — New Features, Improvements, Bug Fixes, Breaking Changes, Deprecations with explicit assignment rules
- **User-benefit rewriting** — lead with the outcome, plain language, 1-3 sentences; detects developer-perspective phrasing
- **Audience tone guidance** — B2B/enterprise, consumer, developer/API, internal
- **Automated generation** — `release_notes_generator.py` groups entries, formats markdown/JSON, and flags technical language for rewrite

## Clarify First

Before generating the release notes, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Audience** — B2B/enterprise, consumer, developer/API, or internal (sets the entire tone matrix and how much detail to include)
- [ ] **Source changes** — the tickets/PRs/changelog to translate, classified into the 5 categories (nothing generates without these)
- [ ] **Breaking changes & deprecations** — what changed, the required action, and by when (forces the mandatory breaking-change fields that protect user trust)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
python scripts/release_notes_generator.py --input changes.json --product-name "Acme App" --version "2.5.0"
python scripts/release_notes_generator.py --demo --product-name "Acme App" --version "1.0.0"
```

Include only categories that have entries. Breaking changes must state what changed, what the user must do, and by when. See the references for the full methodology, output template, and flag reference.

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/methodology-and-tooling.md](references/methodology-and-tooling.md)** — full 5-step methodology, classification tables, rewriting before/after examples, audience tone matrix, output template, troubleshooting, success criteria, and the `release_notes_generator.py` flag + JSON-schema reference. Read when producing notes or running the tool.
- **[references/release-notes-guide.md](references/release-notes-guide.md)** — best-practices guide on category definitions, audience guidance, and worked examples. Read for the deeper rationale.
- **[references/red-flags.md](references/red-flags.md)** — concrete bad-vs-good entry examples and how to fix them. Read before publishing a draft.
- **[assets/release_notes_template.md](assets/release_notes_template.md)** — ready-to-use release notes document template.

## Integration Points

| Integration | Direction | Description |
|------------|-----------|-------------|
| `sprint-retrospective/` | Receives from | Sprint commit data and type distribution inform what changes to include |
| `senior-pm/` | Complements | Stakeholder communication plans guide release note audience and tone |
| `execution/create-prd/` | Receives from | PRD feature descriptions (Section 7) become release note entry drafts |
| `scrum-master/` | Receives from | Sprint review outputs identify what shipped and needs documentation |
| `summarize-meeting/` | Receives from | Release planning meeting summaries capture context for release notes |
| `job-stories/` / `wwas/` | Receives from | User story descriptions inform user-benefit framing of entries |

## Scope & Limitations

**In Scope:**
- Structured release note generation from JSON input with 5 entry categories
- Automatic technical language detection with rewriting suggestions
- Markdown and JSON output formatting with category grouping
- Audience tone guidance (B2B, consumer, developer, internal)
- Classification rules for New Features, Improvements, Bug Fixes, Breaking Changes, and Deprecations

**Out of Scope:**
- Automatic extraction of changes from git history (see `sprint-retrospective/` for git analysis)
- Jira/Linear ticket integration for pulling completed stories (manual JSON input required)
- Changelog maintenance across multiple releases (this tool generates per-release notes)
- Distribution to email, in-app, or documentation channels (output is markdown/JSON for further processing)

**Important Caveats:**
- The rewriting suggestions are pattern-based heuristics. They catch common technical language but cannot assess whether a description truly communicates user benefit.
- Semantic versioning alignment is the user's responsibility. The tool does not validate that version numbers follow semver conventions relative to the change types present.
- Breaking changes require special care. Always include: what changed, what the user must do, and by when. Vague breaking change notes erode user trust.

---

## roadmap-communication

Source path: `references/project-management/execution/roadmap-communication/SKILL.md`

# Roadmap Communication Expert

## Overview

A single roadmap cannot serve every audience. Executives need confidence and strategic framing. Customers need plausible promises with credible timelines. Internal teams need detail, dependency awareness, and honest risk. When PMs publish one roadmap to all three, one audience is always wrong -- either the executives are bored, customers feel misled, or engineers feel managed.

This skill produces three variants of the same underlying roadmap, each tailored to its audience. The underlying source of truth -- the roadmap data -- stays single; the framing, level of detail, risk language, and visualization all change. The variants share names and identifiers so a customer reference can be traced back through the internal variant to the actual ticket. The structural backbone is **Now / Next / Later** (Janna Bastow, ProdPad), which Marty Cagan calls "right-sizing the roadmap" -- forecast confidence decreases with time horizon, so commit explicitly to "Now," name "Next" by theme, and keep "Later" deliberately fuzzy.

## Core Capabilities

- **Three audience variants** — executive (outcome-led, confidence-rated, 1 page), customer (theme-led, benefit-framed, no firm dates), and internal (feature-led with owners, dependencies, and explicit risk).
- **Now / Next / Later right-sizing** — encode the confidence gradient and calibrate it per audience.
- **Outcome-vs-feature framing** — translate features into customer outcomes for the executive and customer variants.
- **Triangulation check** — trace one Now item across all three variants to guarantee consistent identity and framing.

## When to Use

- **Quarterly roadmap publication** -- the regular cadence where you communicate to multiple audiences.
- **Pre-board meeting** -- the executive variant feeds the board packet.
- **Annual customer conference** -- the customer variant becomes the conference roadmap session.
- **Engineering kickoff** -- the internal variant grounds sprint planning across multiple teams.
- **Sales enablement** -- the customer variant feeds sales reps' "what's coming" pitch.

### When NOT to Use

- For a single-team backlog with one stakeholder (one roadmap suffices).
- For tactical sprint planning (use `../scrum-master/` outputs).
- For incident communication or in-flight project status (use `status-update-generator/`).

## Clarify First

Before generating the variants, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Target audience(s)** — executive, customer, internal, or all three (each is a distinct variant with different detail, framing, and risk language)
- [ ] **The roadmap source of truth** — Now/Next/Later items with owners and dates (the internal variant is authored first; exec/customer derive from it)
- [ ] **Date-commitment policy** — what you can promise customers publicly (the customer variant strips firm dates; the exec variant gets confidence ratings instead)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

1. **Author the internal variant first** — it is the source of truth (owners, dates, dependencies, risks). Use `assets/internal_roadmap_template.md`.
2. **Derive the executive variant** — promote each Now item to its parent outcome, add confidence ratings, cap at 1 page. Use `assets/executive_roadmap_template.md`.
3. **Derive the customer variant** — translate features to benefits, strip dates beyond the current quarter, use "exploring / in development / shipping soon." Use `assets/customer_roadmap_template.md`.
4. **Run the triangulation check** — trace one Now item across all three; the framings must be consistent. Re-publish on a fixed cadence.

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/roadmap-variants-playbook.md](references/roadmap-variants-playbook.md)** — the variant comparison tables, the "right-size the roadmap" principle, outcome-vs-feature framing, the detailed structure for each of the three variants, the authoring workflow, troubleshooting, and success criteria. Read when building or reviewing the variants.
- **[references/roadmap-communication-guide.md](references/roadmap-communication-guide.md)** — the origin of Now/Next/Later (Bastow), Cagan's right-size principle, the outcome-vs-feature debate (Cagan, Torres), and worked examples of all three variants for the same project. Read for theory and full examples.
- **[references/red-flags.md](references/red-flags.md)** — common ways roadmap artifacts go wrong, each with bad/good examples. Read before publishing any variant.
- **[assets/executive_roadmap_template.md](assets/executive_roadmap_template.md)** — fill-in template for the executive variant.
- **[assets/customer_roadmap_template.md](assets/customer_roadmap_template.md)** — fill-in template for the customer variant.
- **[assets/internal_roadmap_template.md](assets/internal_roadmap_template.md)** — fill-in template for the internal variant (the source of truth).

## Scope & Limitations

**In Scope:**
- Three roadmap variants (executive, customer, internal) from a shared underlying spec
- Now / Next / Later horizon structure with audience-appropriate detail
- Outcome-based framing for executive and customer variants
- Detailed feature/dependency/risk framing for internal variant
- Triangulation check ensuring consistency across variants
- Templates for each variant

**Out of Scope:**
- Backlog prioritization (use `prioritization-frameworks/`)
- OKR drafting (use `brainstorm-okrs/`)
- NSM definition (use `north-star-metric/`)
- Outcome-roadmap transformation (use `outcome-roadmap/`)
- Sprint planning (use `../scrum-master/`)
- Marketing launch copy (handoff to marketing skills)
- Detailed dependency graphs (use `dependency-map/`)

**Important Caveats:**
- Three variants triple the maintenance load. Teams without the discipline to keep them aligned will be better off publishing only the internal variant and disclaiming everything else. The three-variant pattern is for teams that can sustain quarterly re-publication.
- The customer variant is a public commitment. Treat updates as carefully as you treat a launch. Surprise changes erode trust.
- The internal variant must remain non-public. Sales reps must be trained to quote the customer variant only.
- Outcome-based roadmaps require an NSM and OKRs to function. Without those, "outcomes" are unmeasurable aspirations.

## Integration Points

| Integration | Direction | Description |
|-------------|-----------|-------------|
| `execution/outcome-roadmap/` | Receives from | Outcome decomposition feeds the executive variant |
| `execution/north-star-metric/` | Receives from | NSM and inputs are the executive variant's metrics |
| `execution/brainstorm-okrs/` | Receives from | KRs map to internal roadmap items |
| `execution/create-prd/` | Receives from | Each Now-quarter feature in the internal variant links to its PRD |
| `execution/prfaq/` | Receives from | PR/FAQ summaries become the seed of customer variant theme descriptions |
| `execution/prioritization-frameworks/` | Receives from | Prioritization scores determine which items make Now / Next / Later |
| `execution/dependency-map/` | Pairs with | Internal-variant dependencies are sourced from the dependency map |
| `execution/status-update-generator/` | Feeds into | Weekly status updates reference roadmap variant deltas |
| `../senior-pm/` | Feeds into | Portfolio roll-ups aggregate executive variants across teams |
| `marketing/` (skills domain) | Hands off to | Customer variant feeds product marketing content calendars and launch comms |

---

## scrum-master

Source path: `references/project-management/scrum-master/SKILL.md`

# Scrum Master Expert

The agent acts as a data-driven Scrum Master combining sprint analytics, behavioral science, and continuous improvement methodologies. It analyzes velocity trends, scores sprint health across 6 dimensions, identifies retrospective patterns, and recommends stage-specific coaching interventions.

## Core Capabilities

- **Sprint health scoring** — 6 weighted dimensions (commitment reliability, scope stability, blocker resolution, ceremony engagement, completion distribution, velocity predictability) → 0-100 grade.
- **Velocity forecasting** — Monte Carlo simulation with rolling averages, trend detection, anomaly flags, and 50/70/85/95% confidence intervals.
- **Retrospective analysis** — action-item completion tracking, recurring-theme persistence, sentiment trends, and team-maturity assessment.
- **Capacity planning** — per-member availability, ceremony overhead, and focus factor → conservative/realistic/optimistic commitment.
- **Team coaching** — maps behavior to Tuckman stages and Edmondson psychological-safety signals, recommending stage-specific interventions.

## When to Use

- Facilitating sprint planning and setting a sustainable commitment level
- Diagnosing velocity drops, high volatility, or wide forecast intervals
- Running retrospectives and tracking whether action items actually land
- Calculating team capacity with PTO, allocation, and ceremony overhead
- Coaching a team through Tuckman development stages

## Clarify First

Before running the analysis, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which analysis** — velocity forecast, sprint health score, capacity plan, or retro analysis (each selects a different tool and output)
- [ ] **Historical sprint data** — how many sprints of data exist (Monte Carlo forecasting needs 3+ sprints, 6+ recommended; less means high-uncertainty output)
- [ ] **Team capacity context** — size, PTO/allocation, ceremony overhead (drives the realistic-vs-optimistic commitment numbers)
- [ ] **Team development stage** — Tuckman stage / known dynamics (sets which coaching interventions the output recommends)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

| Tool | Purpose | Command |
|------|---------|---------|
| `velocity_analyzer.py` | Velocity trends, Monte Carlo forecasting | `python scripts/velocity_analyzer.py sprint_data.json --format text` |
| `sprint_health_scorer.py` | 6-dimension health scoring | `python scripts/sprint_health_scorer.py sprint_data.json --format text` |
| `retrospective_analyzer.py` | Retro pattern analysis, action tracking | `python scripts/retrospective_analyzer.py sprint_data.json --format text` |
| `sprint_capacity_calculator.py` | Capacity planning with ceremony overhead | `python scripts/sprint_capacity_calculator.py team_data.json --format text` |

All tools accept JSON following `assets/sample_sprint_data.json`. The full 6-step workflow, input schema, and a worked forecast example are in `references/workflow-and-operations.md`.

## Templates & Assets

- `assets/sprint_report_template.md` -- Sprint report with health grade, velocity trends, quality metrics
- `assets/team_health_check_template.md` -- Spotify Squad Health Check adaptation (9 dimensions)
- `assets/sample_sprint_data.json` -- 6-sprint dataset for testing tools
- `assets/expected_output.json` -- Reference outputs (velocity avg 20.2, health 78.3/100)
- `assets/user_story_template.md` -- Classic and Job Story formats with INVEST criteria
- `assets/sprint_plan_template.md` -- Sprint plan with capacity, commitments, risks

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/workflow-and-operations.md](references/workflow-and-operations.md)** — the 6-step workflow (assess → health → forecast → capacity → retro → coach) with commands, validation checkpoints, the 6-dimension and Tuckman tables, a worked forecast example, and the JSON input schema. Read when running an end-to-end engagement.
- **[references/metrics-troubleshooting-and-tools.md](references/metrics-troubleshooting-and-tools.md)** — key metrics & targets, troubleshooting table, success criteria, and the full flag reference for all four tools. Read when setting targets, diagnosing problems, or scripting the tools.
- **[references/velocity-forecasting-guide.md](references/velocity-forecasting-guide.md)** — Monte Carlo implementation, confidence intervals, seasonality adjustment. Read when interpreting or tuning forecasts.
- **[references/team-dynamics-framework.md](references/team-dynamics-framework.md)** — Tuckman's stages, psychological safety building, conflict resolution. Read when coaching team development.
- **[references/sprint-planning-guide.md](references/sprint-planning-guide.md)** — pre-planning checklist, SMART goals, capacity methodology. Read when facilitating planning.
- **[references/retro-formats.md](references/retro-formats.md)** — retrospective formats and facilitation patterns. Read when designing a retro.
- **[references/red-flags.md](references/red-flags.md)** — anti-patterns and warning signs in Scrum practice. Read when something on the team feels off.

## Scope & Limitations

**In Scope:**
- Sprint-level data analysis (velocity, health, capacity, retrospectives)
- Statistical forecasting using Monte Carlo simulation on historical velocity
- Team dynamics coaching based on Tuckman model and Edmondson psychological safety
- Ceremony facilitation guidance and retrospective pattern analysis

**Out of Scope:**
- Portfolio-level project management (see `senior-pm/` skill)
- Product backlog prioritization and roadmap decisions (see `execution/prioritization-frameworks/`)
- Individual performance evaluation -- this skill measures team-level metrics only
- Real-time Jira/Confluence integration (see `jira-expert/` and `confluence-expert/` skills)
- SAFe-specific PI planning or cross-team dependency management (see `program-manager/`)

**Important Caveats:**
- The Scrum Guide 2020 removed "velocity" as a required artifact; this skill treats velocity as a diagnostic tool, not a performance measure. Use flow metrics (cycle time, throughput, WIP) alongside velocity.
- Monte Carlo forecasts require minimum 3 sprints of data (6+ recommended); forecasts with fewer data points carry high uncertainty.
- Health scores are heuristics, not absolute measures. Calibrate dimension weights to your team context.

## Integration Points

| Integration | Direction | Description |
|------------|-----------|-------------|
| `senior-pm/` | Feeds into | Sprint velocity and health data informs portfolio-level health dashboards and executive reporting |
| `sprint-retrospective/` | Complements | Git-based velocity analysis complements this skill's JSON-based sprint data analysis |
| `execution/brainstorm-okrs/` | Feeds into | Sprint capacity data helps set realistic OKR targets for the quarter |
| `execution/prioritization-frameworks/` | Receives from | Prioritized backlog items feed into sprint planning commitment decisions |
| `discovery/pre-mortem/` | Receives from | Launch-blocking tigers may surface as sprint blockers requiring SM intervention |
| Jira via Atlassian MCP | Bidirectional | Pull sprint data for analysis; push health reports to Confluence dashboards |
| CI/CD Pipelines | Receives from | Deployment frequency and lead time data supplement velocity metrics |

---

## senior-pm

Source path: `references/project-management/senior-pm/SKILL.md`

# Senior Project Management Expert

## Overview

Strategic project management for enterprise software, SaaS, and digital transformation initiatives. This skill provides sophisticated portfolio management capabilities, quantitative analysis tools, and executive-level reporting frameworks for managing complex, multi-million dollar project portfolios. It pairs deterministic Python analysis (health scoring, risk matrices, capacity planning, stakeholder mapping) with board-ready communication frameworks.

## Use when

- The user asks to "run a portfolio health review", "build an executive status report", or "do a stakeholder map"
- Multiple projects need prioritization across WSJF / RICE / ICE / MoSCoW with strategic alignment
- A board-ready or executive-ready RAG report needs to be produced
- Risk analysis needs EMV, Monte Carlo, or portfolio risk correlation — beyond a basic probability/impact matrix
- Resource capacity planning is needed across multiple concurrent projects
- A quarterly portfolio rebalancing or three-horizons review is being planned
- The user says "our portfolio is misaligned", "executives don't trust the reports", or "we can't tell which projects are actually healthy"

## Core Capabilities

- **Portfolio health & strategic alignment** — multi-dimensional weighted scoring (timeline, budget, scope, quality, risk), RAG status, three-horizons rebalancing
- **Quantitative risk management** — EMV analysis, three-point/Monte Carlo estimation, category weighting, portfolio risk correlation, risk-appetite framework
- **Advanced prioritization** — WSJF, RICE, ICE, MoSCoW, MCDA with a model-selection decision tree
- **Resource capacity planning** — utilization optimization (70-85% band), skill matching, bottleneck identification, scenario planning
- **Executive communication & governance** — board-ready RAG reports, RACI matrices, escalation paths, risk-adjusted ROI/NPV

## Clarify First

Before generating the report or analysis, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which artifact** — portfolio health review, executive status report, stakeholder map, or risk/capacity analysis (each maps to a different tool and structure)
- [ ] **Audience** — board, exec staff, or delivery team (sets the altitude, RAG framing, and level of detail)
- [ ] **Portfolio scope and data** — which projects and what timeline/budget/risk data exists (scores and dashboards are only as good as the inputs)
- [ ] **Prioritization model** — WSJF, RICE, ICE, or MoSCoW, when ranking projects (each produces a different order)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
# Tier 1 — portfolio health (multi-dimensional RAG scoring)
python3 scripts/project_health_dashboard.py assets/sample_project_data.json

# Tier 2 — quantitative risk matrix + mitigation strategy
python3 scripts/risk_matrix_analyzer.py assets/sample_project_data.json

# Tier 3 — resource capacity / utilization
python3 scripts/resource_capacity_planner.py assets/sample_project_data.json

# Stakeholder mapping (Mendelow's Matrix + comms plan)
python3 scripts/stakeholder_mapper.py --demo --format json
```

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/methodology-and-operations.md](references/methodology-and-operations.md)** — the full three-tier analysis approach, prioritization models, risk framework, stakeholder-mapping detail, asset/template descriptions, weekly/monthly/quarterly workflows, handoff protocols, KPIs, anti-patterns, troubleshooting, success criteria, and Python tool flag reference. Read this for any hands-on portfolio, risk, capacity, or reporting work.
- **[references/portfolio-prioritization-models.md](references/portfolio-prioritization-models.md)** — deep dive on WSJF/RICE/ICE/MoSCoW/MCDA and the model-selection decision tree. Read when choosing or defending a prioritization model.
- **[references/risk-management-framework.md](references/risk-management-framework.md)** — full quantitative risk process: identification, three-point estimation, EMV, portfolio correlation, risk appetite. Read for any non-trivial risk analysis.
- **[references/stakeholder-engagement-guide.md](references/stakeholder-engagement-guide.md)** — Mendelow quadrant playbooks, blocker engagement, communication cadences. Read when building a stakeholder/communication plan.
- **[references/red-flags.md](references/red-flags.md)** — common ways this skill's output goes wrong, with fixes. Read before finalizing a portfolio assessment or executive report.

## Scope & Limitations

**In Scope:** Multi-project portfolio health assessment with weighted composite scoring; quantitative risk analysis using EMV, probability/impact matrices, and category weighting; resource capacity planning with utilization optimization and skill-matching; stakeholder mapping with Mendelow's Matrix and targeted communication plans; executive-level reporting with RAG status dashboards and strategic recommendations.

**Out of Scope:** Sprint-level team management (see `scrum-master/`); product backlog management and feature prioritization (see `execution/prioritization-frameworks/`); agile coaching and team maturity (see `agile-coach/`); financial modeling beyond project-level ROI (see `finance/`); contract negotiation and procurement.

**Important Caveats:** Health scores use deterministic formulas, not ML predictions — calibrate thresholds to your portfolio. Risk EMV assumes independent risks; portfolio correlation analysis (Step 4) gives a more accurate combined view but needs cross-project dependency data. Capacity models are weekly snapshots; they do not account for intra-week variability or unplanned spikes.

## Integration Points

| Integration | Direction | Description |
|------------|-----------|-------------|
| `scrum-master/` | Receives from | Sprint velocity and health metrics feed portfolio-level health dashboards |
| `sprint-retrospective/` | Receives from | Retro insights inform stakeholder reports and process improvement tracking |
| `execution/brainstorm-okrs/` | Feeds into | Portfolio priorities and strategic context shape quarterly OKR themes |
| `execution/outcome-roadmap/` | Feeds into | Portfolio health data influences roadmap commitment levels (Now/Next/Later) |
| `discovery/pre-mortem/` | Receives from | Launch-blocking tigers escalate into portfolio risk register |
| `execution/release-notes/` | Complements | Release notes incorporate stakeholder communication plans from mapper |
| Jira via Atlassian MCP | Bidirectional | Pull project data for health analysis; push status reports to Confluence |
| Financial Systems | Receives from | Real-time budget and spend data for variance analysis |

---

## sprint-plan

Source path: `references/project-management/execution/sprint-plan/SKILL.md`

# Sprint Planning

A sprint plan that survives contact with reality. Covers capacity math,
commit vs stretch separation, dependency identification, and the
pre-sprint review that prevents mid-sprint surprises.

## When to use this skill

- **Sprint kickoff** (every 1-3 weeks)
- **Sprint-plan template** for new teams
- **Sprint-plan audit** when sprints consistently miss
- **Quarter-start planning** (rolled up across sprints)
- **Post-mortem** on a missed sprint (gap analysis)

## The 7 sprint-plan elements

1. **Sprint goal** — one sentence: what this sprint exists to achieve
2. **Team capacity** — actual hours / story points after PTO, on-call, etc.
3. **Commits** — items the team confidently ships
4. **Stretch** — items if everything goes well; nothing depends on
5. **Dependencies** — what must happen by when (external + internal)
6. **Risks** — what could derail; mitigation per risk
7. **Definition of done** — when is each item "done"?

## Clarify First

Before generating the sprint plan, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Sprint goal** — the one-sentence outcome this sprint exists to achieve (element 1; lets you scope and say no to off-goal asks)
- [ ] **Real team capacity** — working days minus PTO/on-call/meetings/interrupts × focus factor (element 2; sizes the commit and prevents the 100%-fill miss)
- [ ] **Backlog readiness** — are candidate items refined, estimated, and ≤5 days (unrefined items are ineligible and blow estimates mid-sprint)
- [ ] **Known dependencies** — cross-team/external blockers with owners (element 5; unconfirmed assumptions become mid-sprint crises)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

### Step 1 — Define the sprint goal
A good goal:
- One sentence
- States outcome, not output ("ship 3 features" → "complete checkout flow MVP enabling first paid customers")
- Inspires the team
- Lets you say "no" to off-goal asks

### Step 2 — Calculate capacity
Per team member:
- Working days = sprint days - holidays - approved PTO
- Effective hours = days × hours/day × focus factor (typically 0.6-0.75)
- Subtract on-call rotation hours
- Subtract meeting overhead
- Subtract support / interrupt tax

Aggregate across team. This is your real capacity.

### Step 3 — Pull from backlog
Backlog items must be:
- Refined (acceptance criteria clear)
- Estimated (story points or hours)
- No major unknowns

Items that fail this are NOT eligible for the sprint. Send back to refinement.

### Step 4 — Commit vs stretch
- **Commits:** 75-85% of capacity (leaves room for unknowns)
- **Stretch:** 10-15% of capacity (only if commits done)

Stuffing 100% of capacity = guaranteed miss. Reality always intrudes.

### Step 5 — Identify dependencies
For each item:
- Cross-team dependencies (what they need from others)
- External dependencies (vendors, customers)
- Sequencing dependencies (A blocks B)

Each dependency needs:
- Owner
- Date needed by
- Confirmation it's planned

### Step 6 — Identify risks
For each item, list likely risks:
- Technical risk
- Dependency risk (external owner slips)
- Estimate risk (unknowns might double effort)
- Capacity risk (key person may be pulled)

Per risk: likelihood, severity, mitigation, owner.

### Step 7 — Definition of done
Per item:
- Code merged + reviewed
- Tests added
- Telemetry firing
- Docs updated
- Accessibility checked
- Feature flag configured (if applicable)
- QA passed

### Step 8 — Run `sprint_planner.py`
Audit capacity utilization, commit/stretch split, dependency clarity,
DoD coverage.

```bash
python3 project-management/execution/sprint-plan/scripts/sprint_planner.py \
  --input sprint_plan.json --format markdown
```

## Decision frameworks

### Capacity math (per 2-week sprint, 8-person team)

```
2 weeks = 10 working days
Per person:
  - 10 days × 8 hours = 80 hours raw
  - Minus PTO/holidays (e.g., 1 day) = 72 hours
  - Minus meetings (~10 hrs) = 62 hours
  - Minus on-call (~4 hrs avg) = 58 hours
  - Minus interrupts/support (~6 hrs) = 52 hours
  - Focus factor 0.7 = ~36 hours of "real" work

Team of 8 × 36 hours = 288 effective hours
                     = ~28 person-days of real engineering work
```

Most teams over-estimate capacity by 30-50%. Track actuals to calibrate.

### Commitment discipline

| Filled at | Outcome |
|-----------|---------|
| 100%+ | Always miss |
| 90-100% | Usually miss; no room for unknowns |
| 80-90% | Often achievable; healthy |
| 70-80% | Conservative; safer commits |
| < 70% | Under-committing; team disengaged |

Target: 80% commits + 15% stretch.

### Sprint goal vs feature list

| Sprint goal | Why better |
|-------------|------------|
| "Complete checkout MVP" | Outcome-aligned; defines what "done" looks like |
| "Ship feature X + Y + Z" | Feature list; what if one slips? |
| "Improve performance" | Vague; no done state |

A good sprint goal lets you say "we did it" or "we didn't" clearly.

### Item sizing

Stories should be 1-5 days each. Stories > 5 days:
- Split into smaller stories
- Add a planning task to break them down
- Don't commit until refined

### When to descope vs add capacity

Mid-sprint, when you realize commit is too much:
- **Descope:** drop a stretch item; cleanly remove from sprint
- **Add capacity:** rare; usually means borrowing from next sprint
- **Push:** absolute last resort; deal carefully with stakeholders

Discipline: descope early. Heroic late nights = burnout + bugs.

## Common engagements

### "Plan our next sprint"
1. Pull team's velocity history (last 3-5 sprints).
2. Calculate this sprint's capacity.
3. Choose sprint goal aligned with quarter OKRs.
4. Pull from backlog; verify items refined.
5. Commit to 80%; stretch 15%.
6. Identify dependencies + risks.
7. Define done per item.

### "Why are we missing every sprint?"
1. Audit last 3 sprint plans + actuals.
2. Diagnose: over-commit? estimation? unrefined items? interrupts?
3. Tighten capacity math.
4. Increase refinement discipline.
5. Track interrupts; reduce them.

### "Quarter planning rolled up from sprints"
1. Define quarter goal (themes).
2. Identify ~6 sprints of capacity.
3. Allocate to: themes, tech debt, support, OKRs.
4. Draft per-sprint goals.
5. Refresh per sprint planning meeting.

## Anti-patterns to avoid

- **100% capacity commit.** Always miss.
- **Mid-sprint scope add without descope.** Burnout + bugs.
- **No sprint goal.** Random feature list.
- **Unrefined items committed.** Discovered complexity blows estimates.
- **Dependency assumption without owner confirmation.** Slips.
- **No risk identification.** Risks surface as crises.
- **No DoD.** "Done" varies by person.
- **Velocity ignored.** Repeat estimation mistakes.

## References

- `references/capacity-math.md` — deep on per-person capacity, focus factor, interrupt tax
- `references/sprint-anti-patterns.md` — common failures + fixes

## Related skills

- `project-management/scrum-master` — process facilitation
- `project-management/execution/backlog-refinement` — pre-sprint item prep
- `project-management/execution/story-splitting` — sizing large stories
- `project-management/execution/cycle-time-analyzer` — velocity tracking
- `project-management/sprint-retrospective` — post-sprint learning
- `c-level-advisor/vpe-advisor` — capacity planning at scale

---

## sprint-retrospective

Source path: `references/project-management/sprint-retrospective/SKILL.md`

# Sprint Retrospective Expert

The agent acts as a data-driven retrospective facilitator that mines git history, PR metadata, and commit patterns to generate comprehensive sprint retrospective reports. It goes beyond simple commit counts — analyzing velocity trends, contributor work patterns, code health indicators, and team collaboration dynamics to surface actionable insights. Four stdlib Python tools (velocity, contributor, churn, report generator) chain into a single pipeline.

**Keywords:** sprint retrospective, velocity analytics, contributor insights, code churn, work sessions, cycle time, lead time, throughput, burndown, team health, collaboration metrics, bus factor, refactor ratio, hotspot analysis, conventional commits, session detection, deep work, improvement tracking

## Core Capabilities

- **Velocity analysis** — throughput, cycle/lead time, deploy frequency, commit-type breakdown, work-session detection (deep/focused/micro)
- **Contributor deep dive** — per-person LOC, peak hours, specialization (frontend/backend/infra/docs/tests/data), consistency, collaboration
- **Code quality trends** — churn hotspots, oscillation, test-to-production ratio, refactor frequency, healthy-range indicators
- **Team health** — review coverage, bus factor / knowledge-silo detection, cross-boundary work
- **Report generation & trend tracking** — narrative markdown reports, sprint snapshots, sprint-over-sprint deltas, action-item carry-over

## When to Use

- Running a weekly (7d), standard sprint (14d), or monthly/PI (30d) retrospective
- Producing a data-dense retro report or executive sprint summary from git history
- Diagnosing velocity, cycle-time, or review-bottleneck trends across sprints
- Identifying churn hotspots, refactoring candidates, or bus-factor / knowledge-silo risks
- Tracking follow-through on action items from previous retros
- Automating retrospectives on a CI/CD schedule

## Clarify First

Before generating the retro report, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Time window** — sprint length via `--days` or `--since/--until` (defines which commits count; the wrong window skews velocity and cycle-time)
- [ ] **Repo and merge style** — which repo/branch and whether squash-merges are used (squash merges lose branch-level cycle-time data)
- [ ] **Prior snapshot** — whether a previous retro snapshot exists (enables sprint-over-sprint deltas and action-item carry-over)
- [ ] **Audience** — team retrospective vs executive sprint summary (sets the narrative depth and which dashboards lead)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
# Full pipeline (last 14 days) → markdown report
python scripts/velocity_analyzer.py --days 14 -f json > /tmp/v.json && \
python scripts/contributor_insights.py --days 14 -f json > /tmp/c.json && \
python scripts/code_churn_analyzer.py --days 14 -f json > /tmp/ch.json && \
python scripts/retro_report_generator.py -v /tmp/v.json -c /tmp/c.json -u /tmp/ch.json -s "Sprint 23"
```

All tools support `--format text|json`, `--days N`, `--since/--until YYYY-MM-DD`, and `--repo /path`.

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/workflows-and-output.md](references/workflows-and-output.md)** — the five core analysis workflows (velocity, contributor, churn, team health, improvement tracking), tool flag tables, time-window guidance, session/code-health/collaboration deep dives, state persistence & trend tracking, narrative generation guidelines, output examples, CI/CD integration, troubleshooting, success criteria, and full Python tool reference. Read this for any hands-on retro analysis or report generation.
- **[references/retrospective_facilitation.md](references/retrospective_facilitation.md)** — 8 retro formats (Start/Stop/Continue, 4Ls, Sailboat, DAKI, etc.), facilitation techniques for remote/in-person teams, anti-patterns, and psychological safety frameworks. Read when facilitating the live ceremony.
- **[references/velocity_benchmarks.md](references/velocity_benchmarks.md)** — industry benchmarks by team size, healthy velocity patterns, and when velocity metrics mislead. Read when interpreting velocity numbers.
- **[references/red-flags.md](references/red-flags.md)** — common ways this skill's output goes wrong, with fixes. Read before finalizing a retro report.

## Scope & Limitations

**In Scope:** Git history analysis for velocity, contributor, and code churn metrics; session detection via commit-timestamp gaps; commit-type classification via conventional-commit prefixes; markdown report generation with executive summary, dashboards, and action-item tracking; sprint-over-sprint comparison; bus factor and knowledge-silo identification.

**Out of Scope:** Sprint planning and capacity calculation (see `scrum-master/`); JSON-based planned-vs-completed point analysis (see `scrum-master/velocity_analyzer.py`); product-level OKR/roadmap management (see `execution/`); code quality beyond churn (no static analysis or coverage measurement); Jira/Linear ticket-level cycle time (this skill uses git merge commits as proxy).

**Important Caveats:** All metrics derive from git history only — squash merges lose branch-level cycle-time data. Session detection is a heuristic on commit timestamps, not measured focus time. Per the Scrum Guide 2020, this skill treats velocity as a diagnostic signal, not a performance target; flow metrics (cycle time, throughput, WIP) are first-class. Rotate facilitation formats every 3-5 sprints to prevent staleness.

## Integration Points

| Integration | Direction | Description |
|------------|-----------|-------------|
| `scrum-master/` | Complements | Git-based velocity supplements JSON-based sprint data; cross-reference for fuller picture |
| `senior-pm/` | Feeds into | Retro velocity trends inform executive reporting and portfolio health dashboards |
| `delivery-manager/` | Feeds into | Velocity trends help forecast sprint capacity and release timing |
| `agile-coach/` | Feeds into | Retro trend data identifies systemic patterns for coaching interventions |
| `execution/release-notes/` | Feeds into | Sprint commit data and type distribution inform release note generation |
| CI/CD Workflows | Automated | GitHub Actions runs the 4-tool pipeline on a cron schedule (see workflows reference) |
| `.retro-history/` | Bidirectional | Save sprint snapshots for trend tracking; load previous snapshots for comparison |

---

## stakeholder-map

Source path: `references/project-management/execution/stakeholder-map/SKILL.md`

# Stakeholder Map

A 2x2 grid of stakeholders, plus a tactical engagement plan derived from
the map. Used to pre-empt resistance, route decisions correctly, and
match communication cadence to influence.

## When to use this skill

- **Major initiative launch** (re-platform, pricing change, market expansion)
- **Enterprise deal navigation** (multiple buying-committee members)
- **Org re-design / re-org planning**
- **Roadmap change** affecting multiple stakeholders
- **Pre-board / pre-exec strategic decisions**
- **Post-mortem stakeholder map** (who didn't we engage that we should have?)

## The 2x2: Power × Interest

|                 | **Low Power**     | **High Power**       |
|-----------------|--------------------|----------------------|
| **High Interest** | Keep informed    | Manage closely        |
| **Low Interest**  | Monitor          | Keep satisfied        |

### Quadrants
- **Manage closely (HP/HI):** key decisions; influence + engaged. Highest investment.
- **Keep satisfied (HP/LI):** authority but not engaged. Don't let them surprise you.
- **Keep informed (LP/HI):** advocates and detractors who care. Use them.
- **Monitor (LP/LI):** light touch.

## Clarify First

Before mapping, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The initiative being mapped** — the specific launch/deal/re-org/roadmap change (defines who counts as a stakeholder at all, Step 1)
- [ ] **Each stakeholder's power source** — hierarchy vs veto vs budget vs domain expertise (a compliance lead may outrank a VP; drives the Power axis in Step 2)
- [ ] **Each stakeholder's stance** — champion → supporter → neutral → skeptic → blocker (drives Step 3 and the conversion plans in Step 6)
- [ ] **Decision/launch deadline** — when the verdict lands (sets engagement cadence per quadrant, Step 5)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

### Step 1 — List all stakeholders
Brainstorm:
- Executive sponsors
- Decision-makers
- Influencers
- Implementers
- Users / customers
- Adjacent teams
- External parties (vendors, regulators, partners)

Don't filter yet. List broadly, prune later.

### Step 2 — Rate Power + Interest (1-5)
For each:
- **Power:** can they kill or accelerate this? authority? budget? veto?
- **Interest:** how much do they care about the outcome?

### Step 3 — Add Support (stance)
Each stakeholder is also somewhere on:
- **Champion** (actively supports)
- **Supporter** (positive but passive)
- **Neutral**
- **Skeptic**
- **Blocker** (actively opposes)

This complements Power×Interest with directionality.

### Step 4 — Identify the matrix sweet spot
The critical stakeholders: high power + high interest + not-yet-supporters.

These are who you need to convert.

### Step 5 — Design engagement plan per quadrant

| Quadrant | Engagement pattern |
|----------|---------------------|
| Manage closely | Weekly 1:1, deep involvement, co-author key docs |
| Keep satisfied | Monthly check-in, pre-brief major decisions |
| Keep informed | Email updates, FYI inclusion, surface their concerns publicly |
| Monitor | Quarterly newsletter; no proactive |

### Step 6 — Address blockers explicitly
For each blocker:
- What's their objection?
- What evidence might change their view?
- Who do they listen to?
- Can we convert, neutralize, or out-vote?

Ignoring blockers = late surprise objection that derails the initiative.

### Step 7 — Run `stakeholder_analyzer.py`
Audit for: missing key stakeholders by role, blockers without plans,
power-without-interest gaps, no engagement plan.

```bash
python3 project-management/execution/stakeholder-map/scripts/stakeholder_analyzer.py \
  --input stakeholders.json --format markdown
```

## Decision frameworks

### Power dimensions (be specific)
- Hierarchical authority (CEO/board > VP > Director)
- Budget control (who allocates $)
- Veto power (legal, compliance, infosec)
- Domain expertise (the one person who actually understands X)
- Coalition power (who their faction follows)
- External legitimacy (analyst, customer reference, regulator)

A "low-hierarchy / high-veto" stakeholder (e.g., compliance lead) often
has more power than a "high-hierarchy / low-domain" one.

### Interest dimensions
- Outcome impact (will this affect their world?)
- Personal stake (career, comp, ego)
- Resource impact (their team, their budget)
- Public visibility (their reputation tied to this)

### Common engagement patterns

**For executive sponsor (HP/HI):**
- Weekly 1:1 (you bring updates + asks)
- Co-author the strategic narrative
- Defend at board level
- Veto power to be used selectively

**For powerful skeptic (HP/HI, low support):**
- Discover the actual objection (often different than stated)
- Find evidence that addresses it
- Pre-brief before big decisions
- Make their support visible to their peers

**For powerless advocate (LP/HI, high support):**
- Use them to influence others
- Amplify their voice publicly
- Don't burn them with surprise asks

**For powerful absent leader (HP/LI):**
- Don't let them tune in late and veto
- Pre-brief before key decisions
- Make engagement low-friction (5-min readouts)

### When to escalate vs route around
- Escalate when: stakeholder's authority is structurally needed
- Route around when: stakeholder is tangential and adding friction
- Never route around: legal, security, compliance, finance approvers

## Common engagements

### "Help me build a stakeholder map for the launch"
1. Brainstorm 20+ stakeholders.
2. Rate Power, Interest, Support per stakeholder.
3. Plot the 2x2.
4. Identify the critical 5-10 (HP/HI).
5. For each blocker, design conversion plan.
6. Document engagement cadence per quadrant.

### "Audit a recent failed launch"
1. Map the stakeholders involved.
2. Identify who derailed it (often a HP/LI we missed).
3. Identify who could have helped but wasn't engaged.
4. Update default stakeholder template for next launch.

### "Navigate an enterprise deal with 8 buying-committee members"
1. Map all 8 + 4-5 unofficial influencers.
2. Identify economic buyer, technical buyer, user, executive sponsor.
3. Engagement plan per role.
4. Address blockers (legal, security) early; don't wait for procurement.

## Anti-patterns to avoid

- **No stakeholder map.** Trust the org chart; surprised by lateral resistance.
- **Map without engagement plan.** Knowing isn't acting.
- **Ignoring blockers.** They surface at the worst moment.
- **Treating power as just hierarchy.** Vetoes matter; expertise matters.
- **No HP/LI engagement.** Sleeping authority becomes late veto.
- **Static map.** Power + stance shift; refresh per quarter / per phase.
- **Mapping without input from someone politically savvy.** Solo maps miss reality.

## References

- `references/stakeholder-mapping-framework.md` — power dimensions, support spectrum, engagement plans
- `references/stakeholder-anti-patterns.md` — common failures + worked fixes

## Related skills

- `project-management/execution/daci-framework` — decision-rights model
- `project-management/execution/summarize-meeting` — communication artifacts
- `c-level-advisor/ceo-advisor` — executive context
- `c-level-advisor/general-counsel-advisor` — legal stakeholder navigation
- `business-growth/sales-engineer` — buying-committee mapping

---

## status-update-generator

Source path: `references/project-management/execution/status-update-generator/SKILL.md`

# Status Update Generator

## Overview

Weekly status updates eat 30-90 minutes of every PM's Friday afternoon and they almost always say the same thing in subtly different ways. This skill standardizes the artifact: pull tickets from Jira or Linear (or any JSON dump), and emit a structured update with five named sections -- Highlights, Blockers, Risks, Asks, What's Next -- plus a traffic-light status (Red / Yellow / Green) for the period. The structure follows **SBNR** (Status / Blockers / Next / Risks) and a condensed Amazon **6-pager** narrative for Highlights; the stoplight verdict follows classic R/Y/G reporting.

## Core Capabilities

- **Six-section template** — Header, Highlights, Blockers, Risks, Asks, What's Next, in a fixed order so exec readers scan in under 5 seconds (full section definitions in `references/status-structure-and-workflow.md`).
- **Traffic-light discipline** — Green / Yellow / Red rules plus anti-patterns (watermelon status, always-yellow, color creep).
- **Multi-format rendering** — `status_generator.py` emits all six SHARED_OUTPUT_SCHEMA formats: `markdown`, `confluence`, `notion`, `linear`, `json`, `mermaid`.
- **SBNR mapping** — compressed async-standup variant mapped to the weekly sections.

## When to Use

- **Weekly exec status update** -- the standard Friday/Monday cadence brief sent to a sponsor, VP, or steering committee.
- **Monthly board / leadership packet** -- aggregate four weekly updates into a monthly view.
- **Sprint review summary** -- end-of-sprint communication that travels outside the team.
- **Cross-team async standup** -- distributed teams where a written async update replaces a sync meeting.
- **Project kickoff status baseline** -- the first status update establishes the template and traffic-light baseline.

**When NOT to use:** real-time incident response (use `delivery-manager/` incident skills), deep retrospectives (use `sprint-retrospective/`), or one-to-one stakeholder reporting needing custom framing (use `roadmap-communication/`).

## Clarify First

Before generating the update, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Traffic-light verdict (R/Y/G)** — the human judgment the tool will not infer; sets the whole frame and must be defensible (prevents watermelon status)
- [ ] **Audience** — sponsor, VP, or steering committee (sets altitude and what belongs in Highlights vs Asks)
- [ ] **This period's wins + blockers with real numbers** — quantitative claims must come from telemetry, not ticket titles (fills Highlights and Blockers)
- [ ] **The asks** — the specific decisions or help you need from the reader this week (drives the Asks section)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

| Tool | Purpose | Command |
|------|---------|---------|
| `status_generator.py` | Generate a structured weekly status update | `python scripts/status_generator.py --input data.json --format markdown` |
| `status_generator.py --demo` | Inspect demo input and output formats | `python scripts/status_generator.py --demo --format markdown` |

The traffic-light status is a human judgment, not a calculation — set it and document the rationale. See `references/tool-and-troubleshooting.md` for flags and the input JSON shape.

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/status-structure-and-workflow.md](references/status-structure-and-workflow.md)** — full definition of each of the six sections, R/Y/G rules and anti-patterns, SBNR shorthand mapping, and the 6-step authoring workflow. Read when writing or standardizing an update.
- **[references/status-update-style-guide.md](references/status-update-style-guide.md)** — voice, structural rules, traffic-light discipline, and 5 worked examples (Green / Yellow / Red across team types). Read when coaching writing quality or seeing full examples.
- **[references/red-flags.md](references/red-flags.md)** — warning signs and failure modes in status reporting practice. Read when an update process feels performative or untrusted.
- **[references/tool-and-troubleshooting.md](references/tool-and-troubleshooting.md)** — `status_generator.py` flags, input JSON shape, Mermaid output, troubleshooting table, and success criteria. Read when running the tool or diagnosing a problem.
- **[assets/weekly_status_template.md](assets/weekly_status_template.md)** — fill-in template matching the tool's input JSON structure. Use to draft an update by hand.

## Scope & Limitations

**In Scope:**
- Generating weekly executive status updates from structured input
- Five-section template (Highlights / Blockers / Risks / Asks / What's Next) with R/Y/G traffic light
- Output in all six SHARED_OUTPUT_SCHEMA formats (json, markdown, mermaid, confluence, notion, linear)
- Aggregating ticket data from Jira-shaped or Linear-shaped JSON dumps
- SBNR shorthand mapping for async standup variants

**Out of Scope:**
- Pulling data directly from Jira or Linear APIs (use the Atlassian MCP, Linear MCP, or `linear-expert/`/`jira-expert/` skills to export the JSON first)
- Sprint analytics or velocity calculation (use `../scrum-master/`)
- Incident communication or postmortems (use `delivery-manager/`)
- Long-form retrospective output (use `sprint-retrospective/`)
- Tailoring updates to multiple audiences in different framings (use `roadmap-communication/`)

**Important Caveats:**
- The traffic-light status is a human judgment. The tool will not infer it from ticket counts. Forcing automation here produces watermelon updates.
- Quantitative claims in Highlights ("latency down to 210ms") must come from real telemetry, not from the ticket title. The tool will not verify these.
- Status updates are most effective on a predictable cadence. A high-quality irregular update is worse than a mediocre regular one.

## Integration Points

| Integration | Direction | Description |
|-------------|-----------|-------------|
| `../jira-expert/` | Receives from | Jira JQL exports or MCP pulls feed the input JSON |
| `linear-expert/` | Receives from | Linear GraphQL exports feed the input JSON |
| `../senior-pm/` | Feeds into | Weekly updates aggregate into monthly portfolio reports; risks lift into the portfolio risk register |
| `../scrum-master/` | Pairs with | Sprint health scores supply the Highlights/Risks context |
| `roadmap-communication/` | Pairs with | Weekly status feeds the executive-variant roadmap narrative |
| `sprint-retrospective/` | Feeds into | Four weeks of status archives become retrospective input |
| `../program-manager/` | Feeds into | Cross-team status aggregation rolls up multiple team updates |
| `../delivery-manager/` | Pairs with | Release windows and incident references show up in Highlights and Risks |

---

## story-mapping

Source path: `references/project-management/execution/story-mapping/SKILL.md`

# User Story Mapping Expert

## Overview

Visualize the user journey and translate strategy into prioritized, deliverable work using Jeff Patton's user story mapping technique. Story maps shift teams from feature-first thinking to flow-first thinking -- understanding the complete user experience before deciding what to build and in what order.

A story map is a 2D grid: the **backbone** (activities → steps) runs left-to-right in the order users experience the journey, the **body** (tasks) hangs below each step ranked top-to-bottom by priority, and a horizontal **MVP line** separates Release 1 from later. See the playbook reference for full anatomy and the 6-step build sequence.

## When to Use

- **MVP definition** -- Draw a clear line between "must ship" and "can wait."
- **Release planning** -- Sequence work across multiple releases or sprints.
- **Cross-team alignment** -- Give multiple teams a shared understanding of the user journey.
- **Backlog reorganization** -- Restore context and priority to a flat backlog.
- **New product kickoff** -- Decompose a vision into work from scratch.

### When NOT to Use

- Purely technical infrastructure work with no user journey (use technical spikes).
- The team already has a well-prioritized, context-rich backlog.
- Single-feature work that doesn't span multiple user activities.

## Clarify First

Before building the map, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The user and their end-to-end journey** — who travels it and the activities → steps in order (defines the backbone, the left-to-right spine of the map)
- [ ] **The target release / MVP** — what must ship first vs can wait (sets where the MVP line is drawn between Release 1 and later)
- [ ] **The map's goal** — MVP definition vs release sequencing vs cross-team alignment (changes how the body tasks are sliced and prioritized)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## References

- **[references/playbook.md](references/playbook.md)** — read this when building a map: story-map anatomy, the 6-step build sequence, the artifact template, map patterns (walking skeleton / thick slice / progressive enhancement), the workshop facilitation guide, troubleshooting, and success criteria.
- **[references/red-flags.md](references/red-flags.md)** — read this before using a map for release planning: common ways a story map goes wrong with bad/good quoted examples and fixes.

## Scope & Limitations

**In Scope:** User story map creation, backbone and body decomposition, release slice definition, MVP scoping, facilitation guidance, workshop planning, template and pattern library.

**Out of Scope:** Individual story writing and acceptance criteria (see `job-stories/` or agile-product-owner), technical architecture decisions, detailed effort estimation, sprint planning mechanics.

**Important Caveats:** Story maps are planning tools, not contracts. They should be updated as the team learns. A map created before building will always be wrong in details -- the value is in the shared understanding, not the artifact itself. Jeff Patton: "The map is not the territory; the conversation is the territory."

## Integration Points

| Integration | Direction | What Flows |
|---|---|---|
| `job-stories/` | Receives from | JTBD discovery canvas defines the narrative for mapping |
| `create-prd/` | Feeds into | Release 1 tasks inform PRD scope (Sections 7 and 8) |
| `prioritization-frameworks/` | Complements | RICE scoring prioritizes within release slices |
| `brainstorm-okrs/` | Complements | Release slices align with quarterly OKR targets |
| `outcome-roadmap/` | Feeds into | Release slices map to Now/Next/Later roadmap horizons |
| `wwas/` | Feeds into | Tasks become WWAS backlog items with strategic context |

## Further Reading

- Jeff Patton, *User Story Mapping* (2014)
- Jeff Patton, "The New User Story Backlog Is a Map" (2005)
- Inspired by Productside story mapping workshops

---

## story-splitting

Source path: `references/project-management/execution/story-splitting/SKILL.md`

# Story Splitting (Vertical Slicing Patterns)

## Overview

A pattern catalog for splitting epics and large stories into smaller, shippable, end-to-end slices that still deliver user value. Built on Richard Lawrence's canonical story-splitting flowchart (the 9 patterns most product teams converge on) with worked before/after examples and a quick-reference decision tree.

The single most common reason teams fail to deliver predictably is that stories are too large. Large stories balloon in cycle time (see `cycle-time-analyzer/`), create coordination overhead, and resist incremental release. The remedy is not to estimate more carefully; it is to split smaller — vertically, so each slice (1) delivers value the end user can perceive, (2) fits in a single sprint, (3) is independently shippable, and (4) passes INVEST quality gates (see `wwas/`). The skill is pattern-based — no Python tool is needed; the value is the recipes and the worked examples.

## Core Capabilities

- **9 canonical Lawrence patterns** — workflow steps, business-rule variations, happy/unhappy path, input/output variations, data variations, data-entry methods, deferred performance/quality, CRUD operations, and break-out-a-spike (plus optional "Major Effort First").
- **Vertical-slicing decision tree** — a top-down tree that names the first applicable pattern for any oversized story.
- **Vertical-vs-horizontal discipline** — keeps every slice end-to-end and demoable instead of layer-by-layer.
- **Ordering & INVEST gating** — sequences slices smallest-value-first and verifies each against I-N-V-E-S-T.

## When to Use

- **Sprint refinement** -- A story exceeds the team's 85th-percentile cycle time or fails the INVEST-S (Small) test.
- **Epic decomposition** -- An epic from `create-prd/` or `story-mapping/` needs to be broken into a release backlog.
- **Stuck story** -- A story has been "almost done" for two sprints; usually a sign it should have been split.
- **New team onboarding** -- A team's stories are routinely too large; introduce the patterns explicitly.
- **Release planning** -- Need to find a thin slice that ships in 2 weeks instead of 8.

### When NOT to Use

- The work is a true atomic operation that genuinely cannot be split (rare; usually a sign of incomplete analysis).
- The team is splitting horizontally by layer (DB, API, UI) -- that produces non-shippable slices and defeats the point.
- The work is a spike (timeboxed investigation); spikes are intentionally not user-facing.

## Clarify First

Before splitting, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The original story's user value in one sentence** — no clear value means reframe the problem (`create-prd/`), not split (gates the whole procedure, Step 1)
- [ ] **What ships next** — beta cohort vs general availability (changes which pattern applies: happy-path-only vs full business rules)
- [ ] **Why it's too big** — exceeds cycle time, fails INVEST-S, or has been "almost done" for sprints (points to the first applicable pattern in the decision tree)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

1. **State the user value** of the original story in one sentence. (No clear value? Reframe the problem via `create-prd/`, don't split.)
2. **Walk the decision tree** (in `references/story-splitting-procedure.md`); stop at the first pattern that applies.
3. **Draft slices** in `wwas/` or `job-stories/` format; verify each is vertical (crosses all layers, independently demoable).
4. **Order slices** smallest-value-first, run the INVEST check, and replace the original story in the backlog.

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/story-splitting-procedure.md](references/story-splitting-procedure.md)** — vertical-vs-horizontal slicing, all 9 patterns with before/after examples, the full decision tree, the optional tenth pattern, the 8-step workflow, an end-to-end worked example, troubleshooting, and success criteria. Read when splitting a specific story.
- **[references/splitting-patterns-guide.md](references/splitting-patterns-guide.md)** — the deepest pattern catalog: each pattern with cues, recipes, multiple worked examples, pattern-selection order, anti-patterns, and the post-split INVEST check. Read for the full theory or when a pattern is ambiguous.
- **[references/red-flags.md](references/red-flags.md)** — common ways splits go wrong, each with bad/good examples. Read before split tickets enter a sprint.
- **[assets/before-after-examples.md](assets/before-after-examples.md)** — 15+ before/after splits across SaaS, mobile, B2B, and platform scenarios. Use as a copy-from library.

## Scope & Limitations

**In Scope:**
- The 9 canonical Lawrence patterns plus optional "Major Effort First"
- Vertical-slicing decision tree
- Worked examples for SaaS, mobile, and B2B scenarios
- Integration with INVEST (via `wwas/`) and story mapping (via `story-mapping/`)

**Out of Scope:**
- User story format itself (use `wwas/`, `job-stories/`)
- Sprint capacity calculation (use `scrum-master/sprint_capacity_calculator.py`)
- Backlog prioritization (use `prioritization-frameworks/`)
- Story mapping at the release level (use `story-mapping/`)

**Important Caveats:**
- Splitting cannot rescue a poorly defined problem. If the story has no clear user value, the answer is problem framing (`create-prd/`), not slicing.
- Slicing has limits. A story may be at the smallest useful size and still feel large because the team has not done the work before. Treat the first few of any new kind of story as a learning tax.
- The "right" split depends on what ships next. The same epic can be split differently for a beta cohort (Pattern 3: happy path only) vs general availability (Pattern 2: full business rules). Choose based on the next release context, not in the abstract.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `wwas/` | Output format | Split slices are written as WWAS items |
| `job-stories/` | Output format | Alternative format for situation-driven slices |
| `create-prd/` | Receives from | Epic-level scope from PRD feeds splitting |
| `story-mapping/` | Complementary | Story map identifies the slices that need splitting |
| `prioritization-frameworks/` | Feeds into | Split slices get individually scored (RICE/ICE) for ordering |
| `cycle-time-analyzer/` | Diagnostic for | Long cycle times indicate stories that should have been split |
| `backlog-refinement/` | Used in | Splitting is the core activity in refinement sessions |
| `scrum-master/` | Improves | Predictability improves dramatically when stories are uniformly small |

## Further Reading

- Lawrence, Richard. "Patterns for Splitting User Stories." 2009. (The original 9-pattern catalog.)
- Lawrence, Richard. *Story Splitting Flowchart*, 2012. (The canonical visual decision tree.)
- Cohn, Mike. *User Stories Applied for Agile Software Development*. Addison-Wesley, 2004. (INVEST criteria.)
- Patton, Jeff. *User Story Mapping*. O'Reilly, 2014. (Vertical slicing in release planning.)

---

## summarize-meeting

Source path: `references/project-management/execution/summarize-meeting/SKILL.md`

# Meeting Summary Expert

## Overview

Transform meeting notes, transcripts, or recordings into clear, actionable summaries. Every summary follows a consistent structure that makes it easy for attendees and non-attendees alike to understand what was discussed, what was decided, and who is doing what by when.

## Core Capabilities

- **Metadata capture** — date, time, participants with roles, topic, location
- **Discussion synthesis** — summarize substantive topics in plain language; note disagreements and resolutions
- **Action extraction** — one owner, concrete deliverable, and a specific calendar due date per item
- **Decision logging** — numbered decisions with rationale and decision-maker
- **Open-question tracking** — unresolved items with owner and target date
- **Consistent output** — fixed template plus naming convention and 24-hour distribution discipline

## When to Use

- **After any meeting** where decisions were made or actions were assigned.
- **Sprint ceremonies** -- planning, retro, backlog refinement, sprint review.
- **Stakeholder meetings** -- steering committees, executive reviews, client calls.
- **Ad-hoc discussions** -- when an impromptu conversation produces commitments that need tracking.

## Clarify First

Before summarizing, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The source material and its fidelity** — raw notes, transcript, or recording (summary quality is bounded by input; missing owners/dates for action items cannot be invented)
- [ ] **Meeting type** — planning, retro, steering committee, or client call (tailors discussion synthesis and which decisions matter)
- [ ] **Distribution scope + confidentiality** — attendees, non-attendees, or execs, and any sensitivity limits (determines whether standard 24-hour distribution applies)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/summarization-process.md](references/summarization-process.md)** — the full six-step methodology (metadata → discussion → actions → decisions → open questions → distribute), the output template, focus priorities, troubleshooting table, and success criteria. Read when producing a summary.
- **[references/meeting-facilitation-guide.md](references/meeting-facilitation-guide.md)** — meeting types, note-taking strategies, and anti-patterns. Read to tailor the summary to the meeting type or improve input quality.
- **[references/red-flags.md](references/red-flags.md)** — common ways summaries go wrong with bad/good examples. Read before posting, emailing, or linking a summary.
- **[assets/meeting_summary_template.md](assets/meeting_summary_template.md)** — ready-to-use fill-in template. Use to draft the summary directly.

## Integration with Other Skills

- Feed decisions into `wwas/` to create backlog items with strategic context.
- Use action items to create tickets via `../jira-expert/`.
- Document recurring meeting outcomes in `../confluence-expert/` templates.

## Scope & Limitations

**In Scope:** Capturing meeting metadata, extracting key discussion points, documenting decisions with rationale, recording action items with owners and due dates, capturing open questions, distributing summaries, maintaining consistent naming conventions and storage.

**Out of Scope:** Meeting facilitation and agenda design, real-time transcription (use a transcription tool as input), project status tracking (hand off to `../jira-expert/`), strategic decision frameworks (hand off to `../senior-pm/`), recording or video management.

**Limitations:** Summary quality is bounded by the quality of input notes or transcript. Automated transcription tools may introduce errors that the summarizer must catch. The skill does not replace the need for a skilled facilitator -- poorly run meetings produce poor summaries regardless of template quality. Sensitive or confidential meetings may require restricted distribution that the standard workflow does not address.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `wwas/` | Meetings -> WWAS | Decisions and commitments from meetings become WWAS backlog items |
| `job-stories/` | Meetings -> Stories | Discovery discussions surface situations and motivations for job stories |
| `../jira-expert/` | Meetings -> Jira | Action items create Jira tickets; decisions update issue comments |
| `../confluence-expert/` | Meetings -> Confluence | Summaries stored in Confluence using meeting notes template |
| `../senior-pm/` | Meetings -> PM | Steering committee and stakeholder meeting summaries feed portfolio reporting |
| `../delivery-manager/` | Meetings -> DM | Release planning and incident review meeting outcomes feed delivery tracking |

---

## swot-analysis

Source path: `references/project-management/strategy-frameworks/swot-analysis/SKILL.md`

# SWOT Analysis

A grounded, evidence-backed SWOT — not the bullet-point ceremony most
people perform at the start of a planning offsite.

## When to use this skill

- **Annual strategic planning** input
- **New market entry** assessment
- **Pivot conversations**
- **Competitive response** decisions
- **Org restructure** evaluation
- **Pre-board** strategic review
- **Pre-fundraise** investor narrative grounding

## The 2x2

|                | Helpful | Harmful |
|----------------|---------|---------|
| **Internal**   | Strengths | Weaknesses |
| **External**   | Opportunities | Threats |

Internal = within our control (people, IP, ops, brand, capital).
External = outside our control (market, competition, regulation, tech shifts).

The single most-common SWOT failure: confusing internal with external.

## Clarify First

Before building the SWOT, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Explicit scope/subject** — e.g. "entering market X" or "our position vs Competitor X" (a SWOT for "the company" produces four lists pointing in four directions)
- [ ] **Evidence per item** — the data/quote/benchmark behind each entry (strengths must be facts, not aspirations; a SWOT with no real weaknesses signals bias)
- [ ] **Competitor/market reference frame** — what you're comparing against (strengths and threats are relative, not absolute)
- [ ] **TOWS actions wanted** — whether to cross-cut into SO/ST/WO/WT moves (converts the static SWOT into strategy rather than a wall of bullets)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

### Step 1 — Define the scope
A SWOT must have an explicit subject:
- "Acme entering the European market"
- "Our enterprise sales motion vs SMB"
- "Our position vs Competitor X in vertical Y"

A SWOT without scope produces 4 lists of bullets that point in 4 directions.

### Step 2 — Strengths (with evidence)
For each strength:
- What is it specifically?
- What's the evidence (data, customer quote, benchmark)?
- How does it compare to competitors?
- Does the market actually care?

A strength no customer cares about isn't a strength.

### Step 3 — Weaknesses (with honesty)
For each weakness:
- What is it specifically?
- What's the evidence?
- Are we fixing it? Why or why not?
- What's the cost of leaving it?

A SWOT with no real weaknesses signals bias or low candor.

### Step 4 — Opportunities (with sizing)
For each opportunity:
- What's the trigger / shift creating this opportunity?
- What's the size (TAM/SAM/SOM if quantifiable)?
- What's the time window?
- What's our right to win?

"AI is hot" is not an opportunity. "Regulated industries replacing
manual GDPR processes — $8B SAM, 36-month window" is.

### Step 5 — Threats (with severity)
For each threat:
- What is it specifically?
- How likely (1-5)?
- How severe if realized (1-5)?
- What can we do to mitigate?

### Step 6 — TOWS matrix (cross-cuts)
The most-valuable post-SWOT step:

|              | Opportunities | Threats |
|--------------|---------------|---------|
| **Strengths** | SO: leverage strength to capture opportunity | ST: leverage strength to defend against threat |
| **Weaknesses** | WO: address weakness to capture opportunity | WT: minimize weakness to avoid threat |

This converts a static SWOT into strategic actions.

### Step 7 — Run `swot_scorer.py`
Audit for: generic items, missing evidence, internal/external misclassification,
no quantification, no TOWS actions, one-sided SWOT.

```bash
python3 project-management/strategy-frameworks/swot-analysis/scripts/swot_scorer.py \
  --input swot.json --format markdown
```

## Decision frameworks

### Internal vs external — the test

If the item depends on something we own (people, money, tech, brand,
process, IP) → internal.

If the item depends on something we don't own (market, customers,
competitors, regulators, technology trends) → external.

Common miscategorizations:
- "Strong brand recognition in segment X" — internal (we own it)
- "Customers love our brand" — external (customer behavior)
- "Strong eng team" — internal
- "Hard to recruit eng talent" — external
- "Our cloud bill is high" — internal
- "Cloud prices rising" — external

### When to do a SWOT vs other frameworks

| Use SWOT | Use other |
|----------|-----------|
| Broad strategic positioning | Industry analysis → Porter's Five Forces |
| Multi-stakeholder alignment | Macro environment → PESTLE |
| Annual planning input | Growth options → Ansoff Matrix |
| New market entry overview | Business model design → BMC / Lean Canvas |

SWOT is breadth. Other frameworks add depth on specific dimensions.

### From SWOT to strategy

A SWOT alone isn't a strategy. It's input. Strategy comes from:

1. SWOT → identifies positioning realities
2. TOWS → identifies strategic options
3. Prioritization → which 2-3 options to pursue
4. Resourcing → what we'll fund + give up
5. KPIs → how we'll know it worked

Skipping any step produces a wall of analysis without action.

## Common engagements

### "Run a SWOT for entering market X"
1. Scope: explicitly "entering market X."
2. List internal capabilities relevant to that market (Strengths, Weaknesses).
3. List external factors specific to market X (Opportunities, Threats).
4. Score evidence + materiality per item.
5. Run TOWS.
6. Recommend 2-3 strategic moves.

### "Audit our existing SWOT"
1. Pull current SWOT.
2. Run `swot_scorer.py` for generic/ungrounded/miscategorized items.
3. Surface bias: too many strengths, no real weaknesses, vague opportunities.
4. Add TOWS if missing.

## Anti-patterns to avoid

- **No explicit scope.** SWOT for "the company" = SWOT for nothing.
- **Generic items.** "Great team, great product, growing market, competitors."
- **Strengths = aspirations.** What you wish were true, not what is.
- **No weaknesses.** Either bias or low candor.
- **Opportunities = topics, not options.** "AI" isn't an opportunity.
- **Threats = abstract anxieties.** Quantify likelihood + severity.
- **No TOWS.** SWOT without TOWS is just a wall.
- **Internal/external confusion.** Common; check every item.
- **SWOT replaces strategy.** SWOT is input, not output.

## References

- `references/swot-framework.md` — categorization, evidence standards, TOWS
- `references/swot-anti-patterns.md` — common failures + worked fixes

## Related skills

- `project-management/strategy-frameworks/porters-five-forces` — competitive dynamics
- `project-management/strategy-frameworks/ansoff-matrix` — growth options
- `project-management/strategy-frameworks/business-model-canvas` — operational view
- `project-management/strategy-frameworks/lean-canvas` — startup view
- `c-level-advisor/ceo-advisor` — strategic context

---

## team-communications

Source path: `references/project-management/team-communications/SKILL.md`

# Team Communications

The operating system a delivery team runs its information on: which channel a
given message belongs in, how much the recurring calendar actually costs, how a
status update survives a 20-second executive skim, and what happens when
someone is blocked. Most teams never design this — it accretes, one
well-intentioned meeting at a time, until 30% of the week is gone and blockers
still surface three days late.

## When to use this skill

- **The calendar is full and nobody can say why** — you need the meeting load
  measured in person-hours and dollars before you can argue about it
- **Status updates go unread** — stakeholders keep asking questions the update
  already answered, which means it is not skimmable
- **Blockers surface late** — a problem that existed Monday first appears in
  Thursday's status, because there is no escalation path with an SLA
- **A team goes distributed or adds a third timezone** — the sync-heavy rhythm
  that worked co-located silently taxes one region
- **Recurring "should this be a meeting?" arguments** — you need a routing rule
  the team agreed to in advance, not a per-case negotiation
- **New team formation** — write the charter on day one, before the calendar
  fills with rituals nobody will later feel able to cancel

## Inputs the skill expects

- A calendar export of recurring meetings: title, duration, cadence, attendees,
  day and start time (UTC)
- The people involved with roles, timezones, and fully-loaded hourly cost
- Recent decision counts per recurring meeting (last month), plus whether each
  has an agenda and written notes
- A draft status update, or a recent one that failed to land
- The team's core-hours overlap and current escalation path, if either exists
- What is currently going wrong: unread updates, late blockers, or calendar load

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which failure you are fixing — load, unread updates, or late blockers** — the three have opposite remedies; cutting meetings without installing written status makes late blockers worse
- [ ] **Core-hours overlap across the team** — under 3 hours the recommendation inverts from "meet on disagreement" to "sync is an escalation"
- [ ] **Whether cancelling meetings is actually in scope** — an audit you cannot act on is a grievance document; if the calendar is fixed, the leverage moves entirely to written quality
- [ ] **Fully-loaded hourly cost, or permission to estimate it** — the dollar figure is what moves stakeholders; base salary alone understates by 30-40%

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Audit and cut the meeting load

1. Export recurring meetings into the calendar JSON shape (see
   `assets/sample_calendar.json`): people with hourly cost and timezone,
   meetings with duration, cadence, attendees, day, start time.
2. Record **decisions produced in the last month** per meeting series, and
   whether each has an agenda and written notes. This is the input the audit
   turns on — estimate it with the meeting owner rather than skipping it.
3. Run the auditor. Read three outputs: total annual cost, per-meeting
   verdicts, and per-person maker hours.
4. Publish the numbers **before proposing any cut**. Agreement that the total
   is too high has to precede the argument about any specific meeting.
5. Cancel every `KILL` outright, convert every `ASYNC` to a written update with
   a comment window, then merge the 60%+ audience overlaps.
6. Re-audit in six weeks. Expect 20-30% regrowth — that is normal, cut it again.

```bash
python3 project-management/team-communications/scripts/meeting_load_auditor.py \
  --input project-management/team-communications/assets/sample_calendar.json \
  --maker-hours-target 24 --format text
```

### Workflow 2 — Route the week's communications

1. List the decisions, announcements and questions currently pending, one entry
   each in `assets/sample_messages.json` shape.
2. For each, record the four routing variables: reversibility (`one_way` /
   `two_way`), stakeholder count, shared context (`low` / `medium` / `high`),
   and hours until it is needed.
3. Run the router. Every message gets a channel, an urgency band, an SLA, and
   the reason — which is what makes the routing defensible when someone
   disagrees.
4. Check the sync share. Above 34% the team is buying calendar time to
   compensate for thin written context; fix the writing, not the calendar.
5. Freeze the resulting rules into the charter template so the next routing
   argument resolves by reference instead of by seniority.

```bash
python3 project-management/team-communications/scripts/channel_router.py \
  --input project-management/team-communications/assets/sample_messages.json \
  --core-overlap-hours 3 --format text
```

### Workflow 3 — Score a status update before sending it

1. Draft the update against `assets/status_update_template.md`.
2. Score it. The tool checks the four load-bearing elements (progress, risk,
   decision needed, ask), executive readability, and skimmability.
3. Fix in the order the tool lists — completeness gaps first, because a missing
   ask costs more than a long sentence.
4. Anything under 70 does not get sent. Rewrite and re-score.
5. Keep the scores. A team whose median drifts below 70 over a quarter has a
   reporting problem, not a bad week.

```bash
python3 project-management/team-communications/scripts/status_update_scorer.py \
  --input project-management/team-communications/assets/sample_status_update.json \
  --format text
```

## Decision frameworks

### Channel routing — first rule that fires wins [PROVEN]

| Rank | Condition | Channel |
|------|-----------|---------|
| 1 | Emotional load: performance, pay, conflict, standing | Live 1:1 |
| 2 | Irreversible (one-way door) + a decision needed | Written decision record with a named approver |
| 3 | 8+ people and no decision to make | Broadcast |
| 4 | Low shared context + a decision needed | Live meeting with agenda and pre-read |
| 5 | Decision needed within 8 hours | Live meeting — faster than one async round trip |
| 6 | Everything else | Async thread |

Seniority of the requester never appears in this table. A VP wanting a meeting
is not a reason; a VP lacking context is (rank 4).

### Meeting verdicts — decisions per month is the test [PROVEN]

| Verdict | Trigger | Action |
|---------|---------|--------|
| **KEEP** | Produces decisions, has agenda and notes | Leave it alone |
| **TRIM** | Produces decisions but leaks structure | Fix the agenda or notes, or cut duration 25% |
| **ASYNC** | Under 1 decision/month, or 8+ people in a "working session" | Written update + comment window |
| **KILL** | Under 1 decision/month **and** no agenda | Cancel; announce the replacement channel |

Decisions per month is the best available proxy for value: countable, hard to
game without actually deciding things, and it correctly kills status meetings,
which produce zero decisions by design.

### Load and readability thresholds [RECOMMENDED]

| Metric | Healthy | Danger |
|--------|---------|--------|
| IC meeting hours per week | under 6h (15%) | over 10h (25%) |
| Uninterrupted maker hours per week | 24h+ | under 20h |
| Sync share of routed traffic | under 34% | over 50% |
| Status update length | under 400 words | over 600 words |
| Average sentence length | 18-22 words | over 28 words |
| Quantified claims per update | 3+ | 0 |

### Escalation

Acknowledgement is not resolution — "seen it, answer Thursday" fully satisfies
an acknowledge SLA and stops the requester re-pinging. Escalation is a **process
failure signal, not an interpersonal act**; say so in the charter, or the team
develops silent blockers, which cost far more than the discomfort they avoid.

The full SLA ladder by urgency band and the three-strike escalation rule are in
`references/channel-selection-and-meeting-load.md`; the charter template ships
them ready to fill in.

## Anti-Patterns

### Watermelon Status
**Mistake:** Reporting green week after week, then going red two weeks before the deadline.
**Why it happens:** Each individual week genuinely feels recoverable, and a yellow invites questions the author does not yet have answers to. Optimism compounds silently.
**Instead:** Go yellow the week a risk becomes plausible, not the week it becomes certain, and attach an owner and a mitigation date. One defensible red buys more credibility than a quarter of unearned greens — and the scorer's risk element exists precisely to force the disclosure.

### Cutting Meetings Without Installing the Written Channel
**Mistake:** Cancelling the status meeting and the alignment sync in the same week the audit lands, with nothing replacing them.
**Why it happens:** The audit makes the waste vivid and the cuts feel like the whole intervention. The written replacement is unglamorous and gets deferred.
**Instead:** Install the weekly written status **first**, run both for one cycle, then cancel. The meetings were carrying real information badly; removing the carrier before building a new one converts a load problem into a late-blocker problem, which is more expensive.

### Escalation Treated as Aggression
**Mistake:** A team where going to a manager about a blocker is read as tattling, so people wait and hint instead.
**Why it happens:** Nobody wrote down what escalation is for, so everyone infers it from the one time it went badly.
**Instead:** Write in the charter that escalation is a process failure signal, not an interpersonal act, and specify the three strikes by role. Making the ladder public converts strike 3 into a paperwork step rather than a confrontation, because the record already exists.

### Async Adopted Without Teaching Writing
**Mistake:** Declaring the team async-first, then watching decisions take two weeks and quietly reinstating the meetings.
**Why it happens:** Async is treated as a channel choice rather than a skill. High Slack volume is mistaken for async maturity, when it is often level-1 verbal culture conducted in writing.
**Instead:** Standardise the decision record shape — decision, approver, options with costs, consequences, comment deadline — before removing sync time. Escalate to a 20-minute call after two unresolved comment rounds, and post the outcome back into the doc.

### The Immortal Recurring Meeting
**Mistake:** A meeting created for a launch three years ago that still runs weekly with six attendees.
**Why it happens:** Nobody has standing to cancel someone else's meeting, and the original owner has left, so it has no one to defend or kill it.
**Instead:** Give every recurring meeting an expiry date 3-6 months out at creation, plus a named owner. At expiry it is re-justified or it dies by default. Where one already exists with no owner, trial-cancel it for four weeks and ask what broke — roughly two-thirds never come back.

## Files

| File | Purpose |
|------|---------|
| `scripts/meeting_load_auditor.py` | Person-hours, annual cost, KEEP/TRIM/ASYNC/KILL verdicts, double bookings, consolidation proposal |
| `scripts/channel_router.py` | Routes each message to sync / async / written decision / 1:1 / broadcast with reasons and an SLA |
| `scripts/status_update_scorer.py` | Scores a draft 0-100 on completeness, executive readability and skimmability |
| `references/channel-selection-and-meeting-load.md` | Routing model, cost arithmetic, verdict rubric, consolidation, timezone regimes, escalation ladder, status thresholds, instrumentation |
| `references/operating-rhythm-and-charter.md` | Six-ritual minimum rhythm, ritual design rules, async writing standards, channel taxonomy, maturity model, rollout sequence, failure modes |
| `assets/communication_charter_template.md` | One-page charter: core hours, channel and meeting rules, SLAs, escalation, decision protocol, timezone norms |
| `assets/status_update_template.md` | Update skeleton built for a 20-second executive skim |
| `assets/sample_calendar.json` | Runnable 8-person, 8-meeting calendar export |
| `assets/sample_messages.json` | Runnable set of 7 pending communications |
| `assets/sample_status_update.json` | Runnable mid-quality draft (scores 50 — REVISE) |

---

## test-scenarios

Source path: `references/project-management/execution/test-scenarios/SKILL.md`

# Test Scenarios

Generate complete scenario coverage from a feature spec before tests
are written. Closes the gap between "we built it" and "it survives
production."

## When to use this skill

- After **PRD approval** but before engineering implementation
- During **sprint planning** to size testing effort
- During **code review** to verify test coverage
- During **QA planning** to scope test pass
- During **bug-bash** prep
- After a **production incident** to validate scenario gaps

## The 7 scenario categories

For every feature, generate scenarios across:

1. **Happy paths** — primary user goals achieved cleanly
2. **Edge cases** — boundary conditions, unusual inputs
3. **Error handling** — what users see when things go wrong
4. **Empty states** — first-use, no data, after-delete
5. **Concurrent operations** — race conditions, optimistic locking
6. **Accessibility** — keyboard nav, screen reader, contrast, motion
7. **Security + privacy** — auth, permissions, PII, injection

Plus when applicable:
- Performance scenarios (load, latency, throughput)
- Localization (RTL, long-string, currency, date format)
- Cross-platform (browsers, devices, OS versions)

## Clarify First

Before generating scenarios, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Feature type** — form, browse/list, real-time/collab, file upload, payment, or bulk operation (drives the scenario count per category in the coverage rubric)
- [ ] **Risk / sensitivity profile** — auth, payment, or PII involved (scales up security and concurrency coverage in the risk-weighted selection)
- [ ] **The spec's inputs, outputs, and side effects** — what users provide, expect, and what changes in the system (drives edge cases in Step 3 and error handling in Step 4)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

### Step 1 — Spec read
Read the PRD / user story / acceptance criteria. Identify:
- User goals (what they want to do)
- Inputs (what they provide)
- Outputs (what they expect)
- Side effects (what changes in the system)

### Step 2 — Happy path
For each user goal, write the primary flow:
- Preconditions
- Steps
- Expected result

Aim for 1-3 happy paths per feature.

### Step 3 — Edge cases
For each input, ask:
- What's the empty value?
- What's the minimum?
- What's the maximum?
- What's just below min / just above max?
- What's the wrong type?
- What's the weird-but-valid (very long, special chars, Unicode, emoji)?

### Step 4 — Error handling
For each failure mode:
- Network failure
- Server error (5xx)
- Validation error (4xx)
- Timeout
- Concurrent modification
- Auth expired / lost

For each: what does the user see? Recover-from / try-again UX?

### Step 5 — Empty / first-use / after-action states
- First use (no data)
- After delete (last item)
- After error (partial state)
- After timeout
- After cancel

### Step 6 — Concurrent / race scenarios
Two users simultaneously:
- Editing same record
- Triggering same action
- Submitting same form
- Reaching capacity limit

### Step 7 — Accessibility
- Tab through with keyboard
- Use with screen reader
- High contrast / inverted colors
- Reduced motion preference
- Large text scaling
- Voice control

### Step 8 — Security + privacy
- Logged out user accesses
- Unauthorized user accesses
- Permission downgrade mid-action
- PII handling
- Injection attempts (XSS, SQLi)
- Rate limiting

### Step 9 — Run `test_scenario_generator.py`
Audit a candidate scenario list for category coverage; flag gaps.

```bash
python3 project-management/execution/test-scenarios/scripts/test_scenario_generator.py \
  --input feature_spec.json --format markdown
```

## Decision frameworks

### How many scenarios per category?

| Feature type | Happy | Edge | Error | Empty | Concur | A11y | Security |
|--------------|-------|------|-------|-------|--------|------|----------|
| Form / submission | 1-3 | 4-8 | 4-6 | 2 | 1-2 | 4 | 3-5 |
| Browse / list | 2-3 | 3-5 | 2-3 | 2-3 | 1 | 3 | 2 |
| Real-time / collab | 3 | 4-6 | 4-6 | 2 | 4-6 (essential) | 3 | 3 |
| File upload | 2 | 6-10 (sizes/types) | 4-6 | 1 | 1-2 | 2 | 5+ (file abuse) |
| Payment / financial | 3 | 6-10 | 8+ (critical) | 2 | 4-6 (idempotency!) | 3 | 8+ |
| Bulk operation | 2 | 4-6 (sizes) | 4-6 | 1 | 2-4 (partial fail) | 2 | 3 |

Adjust for risk profile of the specific feature.

### Risk-weighted scenario selection

Not all scenarios need full QA coverage. Apply:
- **Happy path:** always test
- **Edge cases:** test those that matter (likelihood × severity)
- **Error handling:** test all paths that user can recover from
- **Empty state:** always test (first impression!)
- **Concurrent:** test for data-integrity-critical features
- **Accessibility:** baseline coverage on all UI; full coverage on user-facing
- **Security:** scale with sensitivity (full coverage on auth/payment)

### Manual vs automated

| Scenario type | Default |
|----------------|---------|
| Happy path | Automated (E2E or integration) |
| Edge cases (input validation) | Unit tests |
| Error handling | Mix (mocked errors in unit; real in integration) |
| Empty state | Visual regression + manual |
| Concurrent | Hard — usually manual + targeted integration |
| Accessibility | Automated (axe-core) + manual screen-reader |
| Security | SAST + DAST + manual review for critical paths |
| Performance | Automated load tests |
| Localization | Pseudo-localization + manual spot-check |

## Common engagements

### "Generate test scenarios for this new feature"
1. Read the PRD / spec.
2. Apply the 7 categories.
3. Generate scenarios; estimate count per category.
4. Run validator; address gaps.
5. Hand to QA for implementation.

### "Audit our test plan for completeness"
1. Categorize existing scenarios.
2. Identify under-covered categories.
3. Score by risk × likelihood.
4. Recommend additions.

### "Post-incident scenario gap analysis"
1. Pull the incident scenario.
2. Map: which category was missed?
3. Add scenario; verify regression coverage.
4. Update default-coverage rubric for that feature type.

## Anti-patterns to avoid

- **Only happy paths.** Production fails on edges; you skipped them.
- **No empty state.** First-use is broken.
- **"QA will figure it out."** No, QA tests what's specified.
- **Generic acceptance criteria.** "Should work" is not testable.
- **No accessibility scenarios.** Excludes users; fails compliance.
- **No security scenarios.** Vulnerable paths ship.
- **No performance scenarios for performance-sensitive features.** Surprise at scale.
- **Skipping concurrent for collaborative features.** Race conditions ship.

## References

- `references/scenario-categories.md` — deep on the 7+ categories with examples
- `references/coverage-anti-patterns.md` — common gaps + fixes

## Related skills

- `project-management/execution/create-prd` — upstream spec
- `project-management/execution/wwas` — acceptance criteria
- `engineering/senior-qa` — implementation
- `engineering/code-reviewer` — review coverage
- `product-team/spec-to-repo` — translating spec to tickets

---

## value-proposition-canvas

Source path: `references/project-management/discovery/value-proposition-canvas/SKILL.md`

# Value Proposition Canvas Expert

## Overview

The Value Proposition Canvas (VPC) is the canonical Strategyzer tool for designing and testing the fit between what customers care about and what your product offers. It is the "zoom-in" companion to the Business Model Canvas, focused on the two most failure-prone blocks: Customer Segments and Value Propositions. Where the Business Model Canvas asks "is this a viable business?", the VPC asks "are we building something customers actually want?"

The canvas has two sides. The **Customer Profile** describes the customer's world in their language -- jobs they are trying to do, pains they experience, and gains they aspire to. The **Value Map** describes the product's response -- the products and services offered, the pain relievers they include, and the gain creators they enable. Fit is achieved when the Value Map mirrors the Customer Profile element-by-element. The method follows Alexander Osterwalder and Yves Pigneur's *Value Proposition Design* (2014).

## Core Capabilities

- **Customer Profile construction** -- jobs (functional/social/emotional), pains, and gains, each ranked (importance, severity x frequency, desirability).
- **Value Map construction** -- products & services, pain relievers, and gain creators, each mapped to a specific profile element.
- **Three-level fit validation** -- problem-solution fit (interviews), product-market fit (behavior), business-model fit (unit economics).
- **Artifacts** -- markdown canvas template, worked example, and a fit-validation checklist that flags strong/partial/absent fit.

## When to Use

- **Pre-PRD framing** -- validate the value proposition and customer profile before writing requirements.
- **Solution refinement** -- diagnose whether weak traction is a wrong-segment (Customer Profile) or wrong-response (Value Map) problem.
- **New segment expansion** -- build a separate VPC per segment to test fit.
- **Pricing and packaging** -- pains/gains rank-ordering informs which features go in which tier.
- **Sales enablement** -- pain relievers and gain creators become talking points and proof points.

## Clarify First

Before building the canvas, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The one segment** — the VPC is segment-level; one canvas per segment (defines whose Customer Profile you fill)
- [ ] **Customer evidence source** — interviews/synthesis vs team assumptions (jobs/pains/gains in the team's own words is the #1 way the canvas becomes fiction)
- [ ] **Which fit level** — problem-solution / product-market / business-model (sets the validation method: interviews vs behavior vs unit economics)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

1. Pick one segment; run 5-7 interviews via `discovery/customer-interview-script/`.
2. Fill the Customer Profile (jobs/pains/gains, ranked) from `discovery/interview-synthesis/` themes; then draft the Value Map so each top item has a pain reliever or gain creator.
3. Run `assets/fit_validation_checklist.md`, list the top unaddressed pains/gains, and feed the canvas into `execution/create-prd/` Sections 5-6.

See `references/canvas-construction-playbook.md` for the full two-side method, three fit levels, template, worked example, and troubleshooting.

## References

- `references/canvas-construction-playbook.md` -- read this when building a canvas end-to-end: both sides in detail, the three levels of fit, the markdown canvas template, a full worked example (Finance Reconciliation SaaS), common mistakes, workflow, troubleshooting, and success criteria.
- `references/value-proposition-design-guide.md` -- read this for the deep Strategyzer methodology with additional worked examples.
- `references/red-flags.md` -- read this when reviewing a completed canvas for anti-patterns (team-language, forced fit, fit-level confusion) before relying on it.
- `assets/vpc_template.md` -- markdown canvas template.
- `assets/customer_profile_worksheet.md` -- jobs/pains/gains capture worksheet.
- `assets/value_map_worksheet.md` -- products/pain-relievers/gain-creators capture worksheet.
- `assets/fit_validation_checklist.md` -- three-level fit validation checklist.

## Scope & Limitations

**In scope:** Customer Profile (jobs, pains, gains) construction and ranking; Value Map construction; problem-solution fit validation; mapping the canvas into PRD inputs (`execution/create-prd/` Sections 5 and 6); sales-enablement translation.

**Out of scope:** Business Model Canvas (sister tool, 9 blocks); unit economics and business-model fit (`finance/` skills); detailed financial modeling, LTV/CAC; persona generation (the VPC is segment-level); competitive positioning (`marketing/` or `c-level-advisor/competitive-strategy/`).

**Caveats:** the VPC is a thinking aid, not a roadmap -- solutions still need experimentation (`discovery/brainstorm-experiments/`). Problem-solution fit is the minimum bar, necessary but not sufficient for product-market fit. Strategyzer methodology is CC-BY-SA; attribute to Strategyzer / Osterwalder when sharing externally. A beautifully filled canvas with no customer interviews is fiction.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `discovery/customer-interview-script/` | Receives from | Verbatim customer quotes populate the Customer Profile |
| `discovery/interview-synthesis/` | Receives from | Themed insights become jobs, pains, and gains |
| `discovery/jtbd-workshop/` | Complementary | JTBD workshop produces the job hierarchy; VPC adds pains and gains |
| `discovery/identify-assumptions/` | Bidirectional | Unaddressed pains become risk assumptions; assumptions inform validation focus |
| `execution/create-prd/` | Feeds into | Canvas populates PRD Section 5 (Market Segments) and Section 6 (Value Propositions) |
| `execution/product-vision/` | Bidirectional | Vision defines the long-term promise; VPC validates current-day delivery |
| `execution/prioritization-frameworks/` | Feeds into | Unaddressed top pains and gains become candidate features |
| `marketing/` | Feeds into | Pain relievers and gain creators become marketing talking points and proof points |

---

## wwas

Source path: `references/project-management/execution/wwas/SKILL.md`

# Why-What-Acceptance Backlog Expert

## Overview

Create backlog items using the Why-What-Acceptance (WWAS) format. This format ensures every piece of work connects to strategic context, includes a concise description that serves as a "reminder of the discussion" rather than a detailed specification, and defines high-level acceptance criteria focused on observable outcomes.

The format has three parts:

- **Why (1-2 sentences):** connects the item to a business objective, OKR, or theme; answers "why does this matter?" and "why now?" If you cannot write a compelling Why, the item should not be prioritized.
- **What (1-2 paragraphs):** a reminder of the refinement discussion, not a specification. Link the design if one exists.
- **Acceptance Criteria (4+):** observable outcomes that define done — not implementation steps or test scripts.

Before an item enters a sprint, it must pass the **INVEST** gates (Independent, Negotiable, Valuable, Estimable, Small, Testable).

### When to Use

- **Backlog creation** -- building a product backlog where strategic alignment is critical.
- **Sprint planning** -- refining items and the team needs to understand *why* each matters.
- **Stakeholder communication** -- executives need to see how work connects to business objectives.
- **Roadmap decomposition** -- breaking roadmap themes into actionable backlog items.

### When NOT to Use

- When you need situation-driven requirements -- use `job-stories/` instead.
- A pure technical task with no strategic context (use a simple task description).
- The team prefers traditional user stories and strategic context is well-understood.

## Clarify First

Before writing the item, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The strategic objective / OKR it connects to** — drives the **Why**; without it the Why is a forced exercise and the item should not be prioritized
- [ ] **The refinement discussion or design link** — becomes the **What** (a reminder of the discussion, not a specification)
- [ ] **The observable done-state** — drives the **Acceptance Criteria** (outcomes a user or system can observe, not implementation steps or test scripts)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## References

Load the reference that matches the task; keep this file lean and pull detail on demand.

- **[references/wwas-format-and-examples.md](references/wwas-format-and-examples.md)** — full Why/What/Acceptance writing rules with good/bad examples, the INVEST gate table, the item template, a complete worked example, the objective-mapping table, troubleshooting, and success criteria. Read this when writing or reviewing actual WWAS items.
- **[references/backlog-management-guide.md](references/backlog-management-guide.md)** — format comparison (WWAS vs user stories vs job stories), INVEST deep dive, Definition of Ready, and refinement best practices. Read when choosing a format or running refinement.
- **[references/red-flags.md](references/red-flags.md)** — bad-vs-good quoted examples of WWAS items. Scan every item before it enters refinement.
- `assets/wwas_template.md` — ready-to-use WWAS templates.

## Integration with Other Skills

- Use `job-stories/` for situation-driven stories focused on user context rather than strategic alignment.
- Use `brainstorm-okrs/` to define the objectives that WWAS items connect to.
- Use `summarize-meeting/` to capture refinement discussions that inform the What.
- Feed WWAS items into `../jira-expert/` for ticket creation with structured fields.

## Scope & Limitations

**In Scope:** Writing items in WWAS format, applying INVEST gates, connecting work to strategic objectives, facilitating refinement, converting existing items to WWAS, integrating with Jira.

**Out of Scope:** Situation-driven requirements (`job-stories/`), ideation/discovery (`discovery/brainstorm-ideas/`), OKR definition (`execution/brainstorm-okrs/`), detailed technical specs, sprint planning/capacity (`../scrum-master/`).

**Limitations:** WWAS adds most value with clearly defined objectives (OKRs, North Star). Without strategic context the Why becomes a forced exercise. It fits product/feature work better than pure tech-debt/infra items. Teams transitioning from user stories may need 2-3 sprints to build fluency.

## Integration Points

| Integration | Direction | What Flows |
|-------------|-----------|------------|
| `job-stories/` | Complementary | Job stories add situational context (When); WWAS adds strategic context (Why). Use both for complete requirements |
| `summarize-meeting/` | Meetings -> WWAS | Refinement discussions produce the What; decisions produce acceptance criteria |
| `../jira-expert/` | WWAS -> Jira | WWAS items become Jira tickets with structured description fields |
| `execution/brainstorm-okrs/` | OKRs -> WWAS | Team OKRs provide the strategic objectives that Why statements reference |
| `execution/prioritization-frameworks/` | WWAS -> Prioritization | WWAS items scored via RICE or other frameworks for backlog ordering |
| `discovery/brainstorm-ideas/` | Ideas -> WWAS | Validated ideas decompose into WWAS backlog items with strategic traceability |
