# Domain: business-growth
Source Skills in this domain: 20

---

## channel-economics

Source path: `references/business-growth/channel-economics/SKILL.md`

# Channel Economics

End-to-end financial modeling and design of go-to-market channels: direct sales economics, reseller / distributor margin structures, marketplace fees, partner tier economics, channel conflict resolution, and the TCO frameworks that compare channel options apples-to-apples.

This skill provides the financial backbone for channel strategy. For strategic partnership design (which channel to invest in, how to structure the partnership), see `business-growth/partnerships-architect`. For partner-deal-level approval mechanics, see `business-growth/deal-desk`.

---

## When to use this skill

| Situation | Skill applies |
|-----------|---------------|
| Deciding direct vs partner-led for a new product | Yes — start with **channel model decision tree** |
| Designing a partner tier structure (silver/gold/platinum) | Yes — see **partner tier economics** |
| Modeling a specific partner deal's margin / payback | Yes — `scripts/channel_margin_calculator.py` |
| Analyzing channel conflict (overlapping direct + partner deals) | Yes — see **channel conflict** + `scripts/channel_mix_optimizer.py` |
| Building a partner program rebate / SPIFF structure | Yes — see **rebate design** |
| Comparing AWS Marketplace vs direct list-price economics | Yes — `scripts/channel_margin_calculator.py --channel marketplace` |
| Negotiating a specific partner contract | Use `business-growth/contract-and-proposal-writer` for the contract; this for the economics |
| Strategic partnership design (joint go-to-market, OEM, white-label) | Use `business-growth/partnerships-architect` first |

---

## The channel model decision tree

Six core channel models. Most companies use a mix.

```
What's the product's complexity + price point?

Low complexity, low price (< $10k ACV):
├── Self-serve / PLG → no channel
├── E-commerce → direct via web
└── Marketplace (AWS / Azure / GCP / Salesforce AppExchange) → if buyer already there

Medium complexity, mid-market price ($10k - $250k ACV):
├── Inside sales / SDR-led direct → if buyer journey is well-understood
├── Reseller / VAR (Value-Added Reseller) → if local presence / language matters
├── Marketplace → if buyer prefers procurement via existing relationship
└── Embedded / OEM → if your product is a component in someone else's offering

High complexity, enterprise ($250k+ ACV):
├── Direct field sales → standard for high-touch enterprise
├── Strategic SI / Integrator (Accenture, Deloitte, etc.) → if implementation is a substantial project
├── ISV / Embedded → if you're a feature in a larger platform
└── Reseller / Distributor → for regional or vertical specialty

Operational / managed-service buyer:
└── MSP (Managed Service Provider) → if customer wants outsourced operations
```

See [references/channel-models-direct-partner-marketplace.md](references/channel-models-direct-partner-marketplace.md) for each model in depth: economic structure, typical margin splits, when each works / fails, contract patterns.

---

## Margin and TCO framework

Apples-to-apples channel comparison requires a consistent TCO model. The naive comparison ("direct gets 100%, reseller gets 70%") misses critical costs.

### True channel TCO formula

```
Channel Contribution Margin
  = Channel-attributed Revenue
  − COGS
  − Partner Discount/Commission
  − Channel-specific Sales Cost (allocated)
  − Channel-specific Marketing Cost (MDF, co-marketing)
  − Partner Enablement Cost (training, certification)
  − Channel Operations Cost (channel manager headcount)
  − Channel-specific Support Cost (T1 partner support)
```

### Side-by-side comparison

For a $100k ACV deal:

| Component | Direct | Reseller (30% off) | AWS Marketplace |
|-----------|--------|---------------------|-----------------|
| Customer payment | $100,000 | $100,000 | $100,000 |
| Reseller / marketplace fee | $0 | -$30,000 (30% discount) | -$3,000 (3% AWS fee) |
| Revenue to us | $100,000 | $70,000 | $97,000 |
| COGS (15%) | -$15,000 | -$10,500 | -$14,550 |
| Sales cost (allocated CAC) | -$25,000 | -$5,000 | -$8,000 |
| Marketing cost (MDF / listing) | -$2,000 | -$8,000 | -$5,000 |
| Partner enablement (amortized) | $0 | -$3,000 | -$1,500 |
| Channel ops (amortized) | $0 | -$2,000 | -$1,000 |
| Support cost | -$5,000 | -$3,000 | -$5,000 |
| **Net contribution** | **$53,000** | **$38,500** | **$61,950** |
| **% of ACV** | 53% | 38.5% | 62% |

The "30% discount" reseller deal is more like 14.5% margin difference once everything's counted. Marketplace can look better than direct on per-deal basis (Amazon's sales team brings the buyer) — but volume varies.

Use `scripts/channel_margin_calculator.py --deal deal.yaml --channel <type>` to model this for any deal.

See [references/margin-and-tco-frameworks.md](references/margin-and-tco-frameworks.md) for the full TCO framework, per-cost-line guidance, and how to allocate "fully-loaded" sales / marketing / ops costs.

---

## Partner tier economics

Multi-tier partner programs (Authorized → Silver → Gold → Platinum) are common. Designed badly, they reward effort that isn't valuable; designed well, they reward outcomes that drive growth.

### Standard tier structure

| Tier | Annual revenue threshold | Discount % | Other benefits | Requirements |
|------|-------------------------|------------|----------------|--------------|
| Authorized | None | 10% | Standard support | Sign partner agreement; 1 certified person |
| Silver | $100k | 15% | Co-marketing eligible (limited MDF) | $100k achieved; 3 certified people; 2 customer wins |
| Gold | $500k | 20% + 5% rebate at threshold | Dedicated channel manager; MDF; deal registration; lead sharing | $500k achieved; 5 certified; 5 wins; 80% renewal rate |
| Platinum | $2M | 25% + 7% rebate at threshold | Top-tier support; joint roadmap; preferred status; press release rights | $2M achieved; 10 certified; 10 wins; 90% renewal; participation in advisory board |

### Tier design principles

1. **Outcome-based, not effort-based.** Reward revenue + retention, not training hours or marketing event count.
2. **Achievable but stretching.** Each tier should be a 12-18 month stretch from the prior.
3. **Differentiable benefits.** Each tier needs benefits a partner actively wants (not just "more support").
4. **Renewable status.** Tiers re-evaluated annually. Partners can move down if they don't maintain.
5. **Anti-gaming protection.** Discount-stacking, registration gaming, transfer pricing — design out.

Use `scripts/partner_tier_economics.py --tiers tiers.yaml` to model tier economics: gross margin per tier, partner-side incentive, break-even revenue per partner per tier.

---

## Rebate / SPIFF design

Three common reward structures, each with trade-offs:

### Front-end discount

Partner buys from you at a discount; sells to customer at list (or close). Margin = the spread.

**Pros:** Simple. Cash flow goes to partner immediately.
**Cons:** Hard to incentivize specific behaviors. Discount is locked in regardless of performance.

### Back-end rebate

Partner pays full price (or near it); earns rebate quarterly / annually based on revenue / tier achievement.

**Pros:** Ties reward to actual achievement; behaviors can be incentivized (e.g., bonus for selling new products).
**Cons:** Cash-flow burden on partner. Complex to administer.

### MDF (Marketing Development Funds) / SPIFF

Per-deal or per-period bonuses for specific actions: bring leads, attend events, certify staff.

**Pros:** Highly targetable. Rewards specific behaviors you want.
**Cons:** Easy to game; admin overhead high; partners often expect it without producing.

### Typical mix

| Partner type | Front-end | Back-end | MDF/SPIFF |
|--------------|-----------|----------|-----------|
| Reseller (transactional) | 70-80% of total comp | 10-20% | 5-10% |
| VAR (consultative selling) | 50-60% | 20-30% | 10-20% |
| Distributor (volume play) | 80-90% | 5-15% | 5% |
| ISV / Embedded | n/a (rev share) | 100% | 0 |
| MSP | 40-60% | 20-30% | 10-30% |

---

## Channel conflict

Channel conflict happens when multiple sales paths chase the same customer. Common forms:

### Direct-vs-partner conflict

| Scenario | Resolution pattern |
|----------|---------------------|
| Direct rep finds opportunity also touched by partner | Deal registration: first to register wins; partner gets credit if they brought it |
| Partner finds direct customer | If direct is already engaged: partner deferred (with consolation MDF perhaps); if not: partner leads |
| Customer asks for direct after partner-led pilot | Honor partner relationship for term; transition at next renewal if appropriate |

### Partner-vs-partner conflict

| Scenario | Resolution pattern |
|----------|---------------------|
| Two resellers both pursuing same account | First-registered wins; second is offered alternative leads / regional swap |
| Vertical specialist vs geographic | Vertical wins (customer values vertical expertise more) |
| New partner pursues incumbent partner's customer | Incumbent has right of first refusal for 90 days |

### Marketplace-vs-direct conflict

Customer can buy via AWS Marketplace OR direct. If price is lower direct, customer feels gamed. If price is same, why not just use marketplace? Common resolution:

- **Same price** direct vs marketplace (customer doesn't get punished for procurement choice)
- **Quota credit** to the direct rep when customer chooses marketplace (so rep isn't disincentivized)
- **Marketplace listing visibility** as a value-add, not as a different pricing channel

See [references/channel-conflict-resolution.md](references/channel-conflict-resolution.md) for the full conflict-resolution playbook including deal registration process, neutral arbitration, conflict-of-interest disclosure.

---

## Clarify First

Before modeling the channel economics, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Channel model(s) in scope** — direct, reseller/VAR, distributor, marketplace, OEM, or MSP (sets which decision-tree branch and TCO comparison to run)
- [ ] **Target ACV / price point** — sub-$10k vs mid-market vs enterprise (selects the viable channel branch and sizes per-deal margin)
- [ ] **Fully-loaded cost lines** — COGS %, allocated sales/marketing/ops/support costs (drives the TCO contribution-margin model, not just the headline discount)
- [ ] **Partner contribution + tier intent** — what the partner does (lead, sell, implement) and whether you're designing tiers/rebates (drives tier economics + rebate/SPIFF mix)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the model.

## End-to-end workflows

### Workflow: Design a new partner program

1. **Pick channel models** — direct + reseller? marketplace? OEM? — using the decision tree
2. **Model the economics** — `scripts/channel_margin_calculator.py` per channel option at expected ACV
3. **Design tier structure** — `scripts/partner_tier_economics.py` to size the gates and benefits
4. **Define rebate / SPIFF mix** — per tier and partner type
5. **Write the partner agreement** (with `business-growth/contract-and-proposal-writer`)
6. **Build channel ops** — deal registration, MDF approval, certification tracking
7. **Hire channel manager(s)** — usually 1 manager per 10-15 active partners
8. **Pilot with 3-5 partners** — measure, iterate, then scale

### Workflow: Evaluate a specific partner deal

1. **Inputs**: ACV, partner discount %, expected close, partner's contribution (lead source? sales effort? implementation?)
2. **Calculate net contribution** — `scripts/channel_margin_calculator.py --deal deal.yaml --channel partner`
3. **Compare to direct alternative** — would this deal have closed direct? at what cost?
4. **Decide**: approve / counter / decline (often via deal desk if it's a non-standard partner discount)

### Workflow: Channel mix analysis

1. **Inputs**: actual revenue by channel for last 4 quarters
2. **Run mix optimizer** — `scripts/channel_mix_optimizer.py --revenue revenue.csv` examines contribution margin per channel + identifies under-/over-invested channels
3. **Recommend rebalancing** — e.g., "Reseller channel: 20% of revenue, 8% of contribution margin — reduce investment; marketplace: 15% of revenue, 25% of contribution — increase listing visibility"
4. **Quarterly review**: present to CRO / CFO

### Workflow: Resolve a channel conflict

1. **Document the conflict** — accounts involved, parties, history
2. **Apply the registration rule** — first-registered partner wins absent overriding facts
3. **Consider exceptions** — strategic logo, customer preference, vertical expertise
4. **Communicate decision** — both parties, with reasoning, in writing
5. **Compensate the loser** — alternative leads, MDF, regional swap; preserve the relationship

---

## Anti-patterns

- **Direct + partner at same price.** Customer feels punished for not using direct (or vice versa); kills partner motivation. Price-to-customer must be consistent across channels.
- **Discount-only partner program.** Partners that only get a discount have no skin in your success; treat you as another vendor; switch easily.
- **Endless partner expansion without enablement.** Signing 200 partners that don't sell anything; channel manager headcount can't scale; partners stale.
- **Marketplace as afterthought.** Listing on AWS Marketplace without dedicated investment (listing optimization, co-sell programs) = marketplace generates nothing.
- **Channel manager as glorified email forwarder.** CM should drive partner pipeline, not just relay leads.
- **Rebates with no audit.** Partner self-reports revenue; you trust it; reality is 20% off. Build verification.
- **MDF spent on activities that don't drive pipeline.** Partner runs a great event, generates no pipeline. MDF should require pipeline outcome.
- **Channel conflict policy that isn't followed.** Policy says first-registered wins, but exec overrides every time → policy is theater.
- **Different commission per channel for same deal.** Direct rep gets 8% on $100k deal, channel rep gets 6% on $100k deal — direct rep refuses partner help; channel rep undercut.
- **OEM / embedded deals priced like resale.** OEM = customer doesn't see you at all; ASP can be 50-80% of list. Resale = customer sees you. Different economics; different price points.

---

## Tooling outputs

| Script | Input | Output |
|--------|-------|--------|
| `scripts/channel_margin_calculator.py` | Deal spec YAML + channel type | Per-channel net contribution margin, cost line breakdown, comparison vs direct baseline |
| `scripts/partner_tier_economics.py` | Tier definitions YAML | Per-tier: gross margin to us, gross margin to partner, partner break-even, tier graduation incentive analysis |
| `scripts/channel_mix_optimizer.py` | Revenue CSV (by channel + quarter) | Per-channel revenue contribution, per-channel margin contribution, recommended rebalancing |

All scripts: stdlib only, argparse CLI, JSON or markdown output.

---

## References

- [channel-models-direct-partner-marketplace.md](references/channel-models-direct-partner-marketplace.md) — 6 channel models in depth + economic structure + when each works
- [margin-and-tco-frameworks.md](references/margin-and-tco-frameworks.md) — full TCO framework, allocation guidance, per-channel cost models
- [channel-conflict-resolution.md](references/channel-conflict-resolution.md) — registration process, conflict patterns, arbitration

---

## Related skills

- `business-growth/partnerships-architect` — strategic partnership design (this skill = the economics; that one = the strategy)
- `business-growth/deal-desk` — approval mechanics for partner deals (this skill = "what does it cost"; deal desk = "should we approve")
- `business-growth/pricing-strategy` — sets list pricing that channel economics deviates from
- `business-growth/revenue-operations` — channel revenue is segmented in RevOps reporting
- `business-growth/contract-and-proposal-writer` — drafts partner agreements
- `sales-success/sales-operations` — runs channel ops (deal registration, MDF approval, certification tracking)
- `c-level-advisor/cs-cro-advisor` — strategic channel-mix decisions are CRO-level

---

## churn-prevention

Source path: `references/business-growth/churn-prevention/SKILL.md`

# Churn Prevention

Production-grade SaaS churn reduction framework covering cancel flow architecture, dynamic save offer mapping, exit survey design, dunning sequence engineering, payment recovery optimization, win-back campaigns, and churn impact modeling. Addresses both voluntary churn (customers who decide to leave) and involuntary churn (customers who leave due to payment failure).

---

## Table of Contents

- [Initial Assessment](#initial-assessment)
- [Churn Taxonomy](#churn-taxonomy)
- [Cancel Flow Architecture](#cancel-flow-architecture)
- [Exit Survey Design](#exit-survey-design)
- [Dynamic Save Offer System](#dynamic-save-offer-system)
- [Dunning Sequence Engineering](#dunning-sequence-engineering)
- [Win-Back Campaign Framework](#win-back-campaign-framework)
- [Churn Health Scoring](#churn-health-scoring)
- [Metrics and Benchmarks](#metrics-and-benchmarks)
- [Churn Impact Calculator](#churn-impact-calculator)
- [Output Artifacts](#output-artifacts)
- [Related Skills](#related-skills)

---

## Clarify First

Before designing the churn-prevention system, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Voluntary vs involuntary churn split** — which dominates (determines whether to build cancel flow/save offers or dunning/payment recovery)
- [ ] **Existing cancel flow vs instant/support cancellation** — sets build-from-scratch vs optimize mode
- [ ] **Current MRR + ARPU + billing cycle** — sizes the dollar impact and the save-offer budget
- [ ] **Payment processor** — Stripe / Braintree / Paddle / Recurly (determines card-updater and dunning retry implementation)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the deliverable.

## Initial Assessment

### Required Context

| Question | Why It Matters |
|----------|---------------|
| Current monthly churn rate? (voluntary vs involuntary split) | Determines which lever to pull |
| Do you have a cancel flow, or is cancellation instant/via support? | Determines build vs optimize mode |
| What payment processor? (Stripe, Braintree, Paddle) | Affects dunning implementation |
| Average contract value and billing cycle? | Sizes the save offer budget |
| Current MRR? | Calculates the dollar impact of churn reduction |
| SaaS model? (self-serve vs sales-assisted) | Determines intervention type |
| Do you collect exit reasons today? | Data availability for save offer mapping |

---

## Churn Taxonomy

### Voluntary Churn (Customer Decides to Leave)

| Type | Signal | Addressable? |
|------|--------|-------------|
| Value gap | Not getting enough value for the price | Yes -- save offers, feature education |
| Product-market mismatch | Wrong ICP, product does not fit their use case | Partially -- downgrade or pivot |
| Competitor switch | Found a better alternative | Yes -- competitive counter-offers |
| Budget cut | Cannot afford it anymore | Yes -- discount or pause |
| Project completion | Seasonal or project-based need | Yes -- pause option |
| Poor experience | Bad support, bugs, frustration | Yes -- human intervention |
| Never activated | Signed up, never used it | Partially -- reactivation before cancel |

### Involuntary Churn (Payment Fails)

| Cause | % of Failed Payments | Recoverable? |
|-------|---------------------|-------------|
| Expired card | 40-50% | Yes -- card updater service |
| Insufficient funds | 20-30% | Yes -- smart retry timing |
| Bank decline (fraud flag) | 10-15% | Sometimes -- customer must contact bank |
| Account closed | 5-10% | No -- customer must provide new card |
| Network error | 5-10% | Yes -- automatic retry |

---

## Cancel Flow Architecture

### The 5-Stage Cancel Flow

```
[Cancel Button] → [Exit Survey] → [Dynamic Save Offer] → [Confirmation] → [Post-Cancel]
```

### Stage 1: Cancel Trigger

- Cancel option is findable (Settings > Account > Cancel). Do not hide it.
- Clicking "Cancel" starts the flow -- it does not immediately cancel the account
- Works on both desktop and mobile

### Stage 2: Exit Survey (Required, 1 Question)

**Question:** "What is the main reason you are cancelling?"

Present as radio buttons (not a dropdown). Maximum 8 options:

| Reason | Internal Code |
|--------|--------------|
| Too expensive for the value I get | PRICE |
| Not using it enough | LOW_USAGE |
| Missing a feature I need | MISSING_FEATURE |
| Switching to a different product | COMPETITOR |
| My project or need ended | PROJECT_END |
| Too complicated to use | COMPLEXITY |
| Just testing, did not plan to keep it | TESTING |
| Other (with optional text field) | OTHER |

**Rules:**
- Survey is required before showing the save offer (the answer determines the offer)
- One question only. No multi-page surveys.
- Optional free-text field for "Other" and as a supplement to any selection
- Track response distribution monthly to identify systemic issues

### Stage 3: Dynamic Save Offer

**Map each exit reason to exactly one save offer:**

| Exit Reason | Save Offer | Offer Copy |
|------------|-----------|------------|
| PRICE | 30-50% discount for 2-3 months | "We'd like to offer you [X]% off for the next [N] months" |
| LOW_USAGE | Pause account for 1-3 months | "Pause your account and come back when you need it" |
| MISSING_FEATURE | Roadmap preview + workaround | "[Feature] is coming in [Q]. Here's how to achieve it now" |
| COMPETITOR | Competitive comparison + discount | "Here's how we compare to [competitor]. Plus [X]% off" |
| PROJECT_END | Pause option | "Pause instead of cancel -- your data stays safe" |
| COMPLEXITY | Free onboarding session | "Let us set it up for you -- free 30-min session with our team" |
| TESTING | No offer -- let them go | "Thanks for trying us out. You're welcome back anytime." |
| OTHER | General retention offer | "Before you go -- we'd love to make this right. [Contact support]" |

**Offer presentation rules:**
- One clear offer per screen (not multiple choices)
- Quantify the value: "Save $120 over the next 3 months" not "Get a discount"
- CTA: "Accept Offer" vs "Continue Cancelling" (both clearly labeled)
- No countdown timers, no fake urgency
- No guilt-trip copy

### Stage 4: Confirmation

If they decline the save offer or there is no offer to make:

```
┌────────────────────────────────────────┐
│  We're sorry to see you go             │
│                                        │
│  What happens when you cancel:         │
│  - Your data is saved for 90 days     │
│  - Access continues until [date]      │
│  - You can reactivate anytime         │
│                                        │
│  [Yes, Cancel My Account]             │
│  [Wait, I Changed My Mind]            │
│                                        │
│  No pre-checked boxes.                │
│  No confusing language.               │
└────────────────────────────────────────┘
```

### Stage 5: Post-Cancel

| Timing | Channel | Message |
|--------|---------|---------|
| Immediately | Email | Cancellation confirmation + data retention policy + reactivation link |
| Day 7 | Email | "We miss you" + single CTA to reactivate + what they are missing |
| Day 30 | Email | Product update + relevant improvement + reactivation offer |
| Day 60 | Email | Final win-back with strongest offer (if applicable) |

---

## Exit Survey Design

### Data Analysis Framework

Track exit survey responses monthly and calculate:

| Metric | Formula | Action Threshold |
|--------|---------|-----------------|
| Reason distribution | % of cancels per reason | Any reason > 30% = systemic issue |
| Save rate by reason | Saved / Cancel attempts per reason | Any reason < 5% save rate = wrong offer |
| Reason trend | Month-over-month change | Increasing trend = worsening problem |
| Feature gap frequency | Count of "missing feature" with specific feature named | Top 3 missing features = product roadmap input |

### Competitive Intelligence from Exit Surveys

When users select "Switching to a different product":

- Ask a follow-up: "Which product are you switching to?" (optional, free text or dropdown)
- Track the top 3 competitors winning your churners
- Feed this data into competitive-teardown skill for quarterly analysis

---

## Dynamic Save Offer System

### Offer Economics

| Offer Type | Cost to Business | Save Rate Benchmark | When Profitable |
|-----------|-----------------|---------------------|----------------|
| 30% discount (3 months) | 30% of 3 months revenue | 15-25% | If LTV after save > discount cost |
| 50% discount (2 months) | 50% of 2 months revenue | 20-30% | If retained customer stays 6+ months |
| Pause (1-3 months) | $0 (no revenue during pause) | 25-40% | If 50%+ reactivate after pause |
| Free onboarding session | CS team time (~$50-100) | 10-20% | If ARPU > $100/month |
| Downgrade to lower tier | Revenue reduction | 30-50% | If some revenue > no revenue |
| Feature unlock | $0 (already built) | 5-15% | Always profitable |

### Save Offer Decision Tree

```
User selects exit reason →
├── PRICE →
│   ├── Customer ARPU > median? → Offer 30% discount
│   └── Customer ARPU < median? → Offer downgrade to cheaper plan
├── LOW_USAGE →
│   ├── Last login > 30 days? → Offer pause
│   └── Last login < 30 days? → Offer usage tips + discount
├── MISSING_FEATURE →
│   ├── Feature on roadmap? → Share roadmap + workaround
│   └── Feature not planned? → Offer discount or acknowledge gap
├── COMPETITOR →
│   ├── Known competitor? → Show comparison + retention offer
│   └── Unknown competitor? → General retention offer
├── PROJECT_END →
│   └── Always → Offer pause
├── COMPLEXITY →
│   ├── Enterprise/high-value? → Offer dedicated onboarding session
│   └── SMB/low-value? → Offer guided tutorial link
└── TESTING →
    └── Always → No offer, let go gracefully
```

---

## Dunning Sequence Engineering

Failed payments cause 20-40% of total churn. Most of it is recoverable with proper dunning.

### Smart Retry Schedule

Do not retry immediately after failure. Cards often recover within 3-7 days.

| Retry | Timing | Why This Timing |
|-------|--------|-----------------|
| Initial charge | Day 0 | Normal billing cycle |
| Retry 1 | Day 3 | Most card issues resolve within 72 hours |
| Retry 2 | Day 7 | Paycheck cycle alignment |
| Retry 3 | Day 12 | Second paycheck cycle |
| Retry 4 | Day 18 | Final attempt before service action |
| Service action | Day 21 | Downgrade or cancel |

### Card Updater Services

Enable automatic card updating to prevent expired card churn:

| Processor | Service | How to Enable |
|-----------|---------|---------------|
| Stripe | Automatic card updates | Enabled by default on most plans |
| Braintree | Account Updater | Must enable in merchant settings |
| Paddle | Built-in | Automatic |
| Recurly | Account Updater | Configuration required |

### Dunning Email Sequence

| Day | Subject Line | Body Focus | CTA |
|-----|-------------|-----------|-----|
| 0 | "Your [Product] payment didn't go through" | Factual, no blame. Card may be expired or funds unavailable. | [Update Payment Method] |
| 3 | "Action needed: update your payment for [Product]" | Remind what they will lose access to. | [Update Payment Method] |
| 7 | "Your [Product] account is at risk" | List features/data they have created. Mild urgency. | [Update Payment Method] |
| 14 | "Final notice: your [Product] access ends in 7 days" | Clear deadline. Offer to help if bank issue. | [Update Payment Method] + [Contact Support] |
| 21 | "Your [Product] account has been paused" | Account status change. Data is safe. Easy reactivation. | [Reactivate Account] |

**Email rules:**
- Every email links directly to the payment update page (not the dashboard)
- No guilt, no shame. Card failures happen.
- Subject lines are specific (include product name)
- Include the amount owed and the card last 4 digits
- Offer a support channel for customers who need help

---

## Win-Back Campaign Framework

### Win-Back Timing

| Window | Success Rate | Approach |
|--------|-------------|---------|
| Day 7 post-cancel | 5-10% | Gentle reminder, no pressure |
| Day 30 post-cancel | 3-7% | Product update + offer |
| Day 60 post-cancel | 2-5% | Strongest offer + fresh start |
| Day 90+ post-cancel | 1-3% | Major product change only |

### Win-Back Email Sequence

**Day 7 Email:**
- Subject: "Your [Product] account is waiting for you"
- Body: What they left behind (data, projects, team). One CTA: reactivate.
- No discount. Just value reminder.

**Day 30 Email:**
- Subject: "Here's what's new in [Product]"
- Body: 2-3 specific improvements since they left. One CTA: reactivate.
- Small incentive: "Come back with 1 month free"

**Day 60 Email:**
- Subject: "We'd love to have you back -- [offer]"
- Body: Strongest offer (50% off 3 months or extended free period). Clear deadline.
- Final significant outreach attempt.

---

## Churn Health Scoring

### Leading Indicators of Churn

| Signal | Weight | Detection |
|--------|--------|-----------|
| Login frequency declining (week over week) | High | Usage analytics |
| Feature usage dropping | High | Feature event tracking |
| Support ticket escalation | High | Help desk data |
| NPS response < 7 | High | Survey data |
| Invoice dispute or payment question | Medium | Billing system |
| Champion left the company | High | Contact monitoring |
| Contract renewal in < 90 days | Medium | CRM data |
| Competitor evaluation detected | High | Sales intelligence |

### Risk Score Calculation

```
Risk Score = Sum of (Signal Weight x Signal Present)

0-20: Low risk (monitor)
21-40: Moderate risk (proactive outreach)
41-60: High risk (intervention required)
61+: Critical risk (executive escalation)
```

---

## Metrics and Benchmarks

### Key Metrics

| Metric | Formula | Good | Excellent |
|--------|---------|------|-----------|
| Save rate | Customers saved / Cancel attempts | 10-15% | 20%+ |
| Voluntary churn rate | Voluntary cancels / Total customers (monthly) | < 3% | < 1.5% |
| Involuntary churn rate | Failed payment cancels / Total customers (monthly) | < 1.5% | < 0.5% |
| Payment recovery rate | Failed payments recovered / Total failed | 25-35% | 40%+ |
| Win-back rate | Reactivations / Cancellations (90-day window) | 5-10% | 10%+ |
| Exit survey completion rate | Surveys completed / Cancel attempts | > 70% | > 90% |
| Save offer acceptance rate | Offers accepted / Offers shown | 15-25% | 30%+ |

### Red Flags

| Signal | Diagnosis | Action |
|--------|-----------|--------|
| Save rate < 5% | Offers not matching reasons | Rebuild offer-reason mapping |
| Exit survey completion < 60% | Survey too long or optional | Make it required, 1 question |
| Recovery rate < 20% | Retry logic or emails broken | Audit dunning sequence |
| Single reason > 40% | Systemic product/pricing issue | Escalate to product/leadership |
| Churn rate > 5% monthly | Business is likely contracting | Churn prevention alone will not fix; review ICP + product |

---

## Churn Impact Calculator

### Quick Estimate

```
Monthly MRR at risk = Total MRR x Monthly churn rate
Annual MRR saved by 1% churn reduction = Total MRR x 0.01 x 12
Annual MRR saved by 20% save rate = (Monthly MRR at risk x 0.20) x 12

Example:
  MRR: $500,000
  Monthly churn: 4% = $20,000/month lost
  Reduce to 3% = $5,000/month saved = $60,000/year
  Add 20% save rate on remaining = $3,000/month saved = $36,000/year
  Total annual impact: $96,000
```

---

## Output Artifacts

| Artifact | Format | Description |
|----------|--------|-------------|
| Cancel Flow Design | 5-stage flow with copy | Complete flow from trigger to post-cancel |
| Exit Survey | Radio button options + mapping | 6-8 reasons with save offer mapping |
| Save Offer System | Decision tree | Reason-to-offer mapping with economics |
| Dunning Sequence | 5-email sequence | Subject lines, body copy, timing, retry schedule |
| Win-Back Campaign | 3-email sequence | Day 7, 30, 60 emails with subject lines and offers |
| Churn Scorecard | Metric table | Current metrics vs benchmarks with gap analysis |
| Impact Model | Revenue calculation | Dollar impact of churn reduction at various improvement levels |

---

## Related Skills

- **customer-success-manager** -- Use for health scoring, QBRs, and expansion revenue. Not for cancel flow or dunning design.
- **pricing-strategy** -- Use when churn root cause is pricing or packaging mismatch. Not for save offer design.
- **onboarding-cro** -- Use when churn traces back to poor activation. If users never experienced value, fix onboarding first.
- **referral-program** -- Use for acquisition. Churn prevention handles the other end of the funnel.

---

## Tool Reference

### 1. churn_impact_calculator.py

**Purpose:** Calculate the revenue impact of churn reduction at various improvement levels.

```bash
python scripts/churn_impact_calculator.py --mrr 500000 --churn-rate 4.0 --save-rate 20
python scripts/churn_impact_calculator.py --mrr 500000 --churn-rate 4.0 --save-rate 20 --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `--mrr` | Yes | Current monthly recurring revenue in dollars |
| `--churn-rate` | Yes | Current monthly churn rate as percentage (e.g., 4.0 for 4%) |
| `--save-rate` | No | Cancel flow save rate as percentage (default: 15) |
| `--target-churn` | No | Target churn rate as percentage (default: current minus 1) |
| `--json` | No | Output results as JSON |

### 2. dunning_sequence_analyzer.py

**Purpose:** Analyze dunning email sequence effectiveness and recommend retry timing optimizations.

```bash
python scripts/dunning_sequence_analyzer.py dunning_data.json
python scripts/dunning_sequence_analyzer.py dunning_data.json --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `dunning_data.json` | Yes | JSON file with failed payment and retry data |
| `--json` | No | Output results as JSON |

**Input JSON format:**
```json
{
  "failed_payments": [
    {
      "payment_id": "PAY-001",
      "amount": 99.00,
      "failure_reason": "expired_card",
      "retry_attempts": [
        {"day": 0, "recovered": false},
        {"day": 3, "recovered": false},
        {"day": 7, "recovered": true}
      ]
    }
  ]
}
```

### 3. exit_survey_analyzer.py

**Purpose:** Analyze exit survey responses to identify churn patterns, save offer effectiveness, and systemic issues.

```bash
python scripts/exit_survey_analyzer.py survey_data.json
python scripts/exit_survey_analyzer.py survey_data.json --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `survey_data.json` | Yes | JSON file with exit survey response data |
| `--json` | No | Output results as JSON |
| `--period` | No | Analysis period label (default: "current") |

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| Save rate below 5% across all reasons | Save offers do not match exit reasons | Rebuild the exit-reason-to-offer mapping using survey data; run exit_survey_analyzer.py to identify mismatches |
| Exit survey completion under 60% | Survey is optional or too long | Make the single-question survey required before showing the save offer; remove multi-page flows |
| Payment recovery rate below 20% | Retry logic misconfigured or dunning emails not sending | Audit dunning sequence with dunning_sequence_analyzer.py; verify email deliverability and retry schedule |
| Single exit reason exceeds 40% of responses | Systemic product or pricing issue | Escalate to product or leadership; this is not solvable with cancel flow alone |
| Churn rate above 5% monthly | Likely ICP, product-market fit, or pricing problem | Churn prevention alone will not fix this; pair with pricing-strategy and product feedback loops |
| Win-back emails have zero reactivations | Emails not reaching inbox or offers are weak | Check deliverability (SPF, DKIM, DMARC); test stronger offers; verify reactivation links work |
| Involuntary churn rising while voluntary is stable | Card updater not enabled or retry timing is poor | Enable automatic card updating on your payment processor; review retry schedule in dunning_sequence_analyzer.py |

---

## Success Criteria

- Monthly voluntary churn rate below 2.5% (below 1.5% is excellent)
- Monthly involuntary churn rate below 1.0% (below 0.5% is excellent)
- Cancel flow save rate of 15-25% (above 20% is excellent)
- Payment recovery rate of 30%+ on failed payments
- Exit survey completion rate above 80%
- Win-back reactivation rate of 5-10% within 90 days post-cancel
- Save offer acceptance rate above 20% with retained customers staying 6+ months post-save

---

## Scope & Limitations

- **In scope:** Cancel flow design, exit survey architecture, save offer mapping, dunning sequences, payment recovery, win-back campaigns, churn impact modeling
- **Out of scope:** Product-market fit analysis, pricing restructuring, ICP redefinition, customer acquisition
- **Data dependency:** Scripts analyze point-in-time snapshots from JSON input; no real-time CRM integration
- **Not predictive ML:** All scoring is deterministic and algorithmic -- no machine learning models
- **Legal note:** Cancel flows must comply with FTC guidelines (US) and consumer protection laws (EU) -- do not make cancellation unreasonably difficult
- **Revenue estimates:** Impact calculations are projections based on input assumptions, not guarantees

---

## Integration Points

- **customer-success-manager** -- Feed health scores into churn risk assessment; use churn data to calibrate health score thresholds
- **pricing-strategy** -- When exit survey data shows PRICE as the dominant reason (>30%), escalate to pricing-strategy for structural pricing review
- **onboarding-cro** -- When exit survey data shows LOW_USAGE or COMPLEXITY as top reasons, the root cause is often poor activation; fix onboarding first
- **revenue-operations** -- Pipeline and forecast models should account for churn reduction impact on net revenue retention (NRR)
- **referral-program** -- Retained customers from save offers are candidates for referral program enrollment after 90 days of continued usage

---

## commercial-policy

Source path: `references/business-growth/commercial-policy/SKILL.md`

# Commercial Policy

End-to-end commercial-policy authoring and governance: defining the rules that govern what sales can offer, what triggers approval, and what's prohibited. Pairs with our deal-desk (operational enforcement) and pricing-strategy (price-setting) skills — this is the policy that those execute against.

A good commercial policy:
- Makes deal-desk faster (fewer ambiguous cases)
- Makes sales reps more autonomous (clearer authority)
- Makes legal reviews lighter (most cases already covered)
- Reduces concession drift over time
- Provides audit-ready governance documentation

---

## When to use this skill

| Situation | Skill applies |
|-----------|---------------|
| Authoring commercial policy from scratch | Yes — start with **policy charter template** + `scripts/commercial_policy_generator.py` |
| Refreshing an existing policy (annual) | Yes — see **annual policy review** workflow |
| Auditing recent deals for policy compliance | Yes — `scripts/policy_compliance_checker.py` |
| Analyzing terms-deviation patterns | Yes — `scripts/terms_deviation_analyzer.py` |
| Tailoring policy for new region / vertical | Yes — `scripts/commercial_policy_generator.py --region <X>` |
| Drafting sales training on policy | Yes — see **training section** |
| Setting prices (not policy on deviations) | Use `business-growth/pricing-strategy` |
| Per-deal approval | Use `business-growth/deal-desk` |
| Writing the specific contract | Use `business-growth/contract-and-proposal-writer` |

---

## What commercial policy covers

Standard scope:

| Domain | Policy area |
|--------|-------------|
| **Pricing** | Standard pricing, discount thresholds, MFN, rebates, custom-bundle pricing |
| **Contract** | Standard term length, payment terms, renewal terms, termination, customer audit rights |
| **Legal** | Acceptable MSA modifications, liability cap, indemnification, jurisdiction, IP |
| **Operational** | SLA tiers, custom SLAs, security commitments, dedicated infrastructure |
| **Customer commitments** | Reference / case study / press release obligations |
| **Channel** | Partner discount tiers, channel-conflict rules, deal-registration |
| **Special terms** | Performance-based payment, acceptance criteria, ramp deals |

What it doesn't cover:
- Day-to-day pricing decisions (that's pricing strategy)
- Per-deal approval mechanics (that's deal-desk operations)
- Sales targets / quota (that's compensation policy)
- Customer success / churn-prevention tactics

---

## Commercial policy charter (template)

The foundational document. Every company that does $5M+ ARR needs one. Use this template:

```markdown
# Commercial Policy Charter

## Purpose
This Commercial Policy defines the rules that govern commercial terms
offered to customers. It is binding on all customer-facing functions
(Sales, Customer Success, Partner / Channel) and is enforced by Deal Desk.

## Scope
Applies to:
- All new customer agreements
- All renewals (with material change)
- All partner-mediated deals
- All custom / non-standard agreements

Does not apply to:
- Self-serve / PLG transactions per standard published terms
- Auto-renewals at standard terms

## Owners and Approvers
- Policy owner: CRO + CFO + General Counsel (jointly)
- Operational enforcement: Deal Desk
- Updates: quarterly review by policy owners
- Material changes: board awareness

## Pricing Policy

### Standard pricing
- All new customers offered at published list pricing
- Published price is canonical; deviations require approval per matrix

### Discount approval matrix
[Per the deal-desk approval matrix — see business-growth/deal-desk]

### Maximum allowed discount
- Standard maximum: 50%
- Beyond 50%: CEO + Board awareness required
- Discount > 60%: only with explicit strategic-rationale documented and CEO sign-off

### Most Favored Nation (MFN)
- Not granted by default
- Granted only with: strategic-tier customer + CRO + CFO + GC approval
- Always scoped narrowly: same product, same volume, same term length, same geography
- Disclosure-only (never automatic price-match)

### Rebates
- Performance-based rebates allowed per partner-program tier
- Customer-tier rebates: discouraged; if granted, time-bounded and explicit

## Contract Policy

### Standard term
- 12-month contract with annual prepay
- Auto-renew unless 90-day notice

### Term flexibility
- < 12 months: requires Director approval
- 24-36 months: Director approval
- > 36 months: VP Sales approval
- Multi-year discounts: per discount matrix

### Payment terms
- Standard: Net 30, annual prepay
- Net 45-60: Director approval
- Net 90+: CFO approval
- Custom milestone-based: CFO approval; revenue recognition impact reviewed

### Renewal
- Standard: auto-renew, same terms, same price (or per published renewal pricing)
- Renewal expansion > 20%: deal-desk review
- Renewal contraction > 10%: deal-desk review + customer success consultation

### Termination
- Standard: termination for convenience requires 90-day notice
- Termination for cause: 30-day cure period
- Customer-requested termination flexibility: Director approval
- Mid-term termination rights: VP Sales approval

## Legal Policy

### MSA modifications
- Pre-approved modifications: tracked list in approved-modifications appendix
- Custom modifications: General Counsel approval required
- Customer-supplied MSA: full GC review; default to push back to our MSA

### Liability cap
- Standard: 1x annual fees
- 2x annual fees: GC + CFO approval
- > 2x annual fees: CEO sign-off
- Carve-outs: IP infringement, gross negligence, willful misconduct — always uncapped

### Indemnification
- Standard mutual indemnification per template
- Customer-favorable indemnification: GC approval
- Defense / settlement control: vendor by default; customer-controlled needs CEO

### Jurisdiction and governing law
- Standard: vendor's jurisdiction
- Customer jurisdiction: GC approval
- Arbitration vs litigation: per template; deviations need GC

### IP
- Standard: each party retains pre-existing; joint inventions per default
- Customer-favorable IP terms: GC approval
- Source code escrow: only for OEM / strategic; never standard customer

## Operational Policy

### SLA tiers
- Standard published SLA (99.5%)
- Enhanced SLA (99.9%): per published pricing
- Custom SLA: Customer Success + Engineering approval; pricing premium per agreement
- Custom SLA with penalties: CRO + CCO + Engineering approval

### Security commitments
- Standard SOC 2 / ISO 27001 commitments per template
- Custom security: CISO + GC approval
- Customer audit rights: GC approval (limited to annual, with notice, third-party auditor)

### Dedicated infrastructure
- Not standard; available only with CTO + GC approval
- Premium pricing required

## Customer Commitments

### Reference / case study requests
- Standard: requested but not required
- Discounted deals (> 15%): case study or reference required as condition
- Strategic logos: explicit case study + press release commitment

## Channel Policy

### Partner-mediated deals
- Per Partner Agreement; discount per tier
- Deal registration governs conflict
- Direct rep authority same as direct deals on partner-led opportunities

## Special Terms

### Performance-based payment
- Payment-on-acceptance / acceptance criteria: CFO + GC approval
- Milestone payments: CFO approval

### Ramp deals
- ≤ 3 months: Sales Manager
- 3-12 months: Director
- > 12 months: VP Sales

### Source code escrow (for customer)
- Not standard; available only with CTO + GC approval

## Documentation Requirements

Every non-standard deal documented per Deal Desk packet template:
- Deviation explicitly listed
- Justification documented
- Approver identified
- Customer commitments (if any) explicit
- Expiration / conditions clear

## Annual Review

This policy is reviewed annually by CRO + CFO + GC.
Material changes communicated to sales with training.

## Effective Date
<date>
## Last Updated
<date>
## Approved By
- CRO: <signature>
- CFO: <signature>
- GC: <signature>
- Board (acknowledgement): <date>
```

See [references/commercial-policy-charter.md](references/commercial-policy-charter.md) for the full annotated charter with notes on each section's typical contentious issues.

---

## Discount and terms policy details

See [references/discount-and-terms-policy.md](references/discount-and-terms-policy.md) for deeper guidance on:

- Discount-percentage policy by ACV bracket
- MFN clause design (when to allow, how to scope)
- Performance-based rebate structures
- Multi-year discount mechanics
- Payment-term flexibility and revenue-recognition implications
- Renewal pricing policy (escalators, holds, contraction)

---

## Contract and commercial guardrails

See [references/contract-and-commercial-guardrails.md](references/contract-and-commercial-guardrails.md) for deeper guidance on:

- Acceptable MSA modifications (a list-based, not case-by-case approach)
- Liability cap negotiation
- Termination rights design
- IP and joint-development clauses
- Customer audit rights
- Cross-jurisdictional terms (EU vs US vs APAC)

---

## Clarify First

Before generating the policy, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Company stage + ARR scale** — drives whether a full charter is warranted and how tight thresholds should be
- [ ] **Approver structure** — who owns the policy and sits in the chain (CRO/CFO/GC, VP Sales, Director) (populates Owners/Approvers and every approval line)
- [ ] **Region / jurisdiction** — US / EU / APAC (changes payment norms, governing law, and triggers a regional overlay)
- [ ] **Max discount + liability risk appetite** — the discount ceiling and liability-cap tolerance (drives the Pricing and Legal policy sections)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the policy.

## End-to-end workflows

### Workflow: Author commercial policy from scratch

1. **Assemble policy committee** — CRO + CFO + GC sponsors + Deal Desk Lead + Sales Operations
2. **Inventory current deals** — what terms have been offered? What's been ad-hoc?
3. **Identify policy gaps** — areas where ad-hoc behavior is hurting (concession drift, customer surprises)
4. **Draft charter** using template; one section per domain
5. **Internal review** — Sales VP, Eng VP, CISO, Customer Success VP, Finance for revenue recognition
6. **Pilot** with sales managers for 30 days — collect feedback
7. **Final approval** — CRO + CFO + GC sign-off; board awareness
8. **Sales training** — workshop + recorded session + quick-reference cards
9. **Publish** to sales wiki / partner portal / customer-facing communications team
10. **Quarterly review** thereafter

### Workflow: Refresh existing policy (annual)

1. **Pull deal data** for past 12 months: discount distribution, terms deviations, approvals
2. **Identify drift** — what's the deviation rate by policy category?
3. **Survey sales managers** — what's working / what's blocking
4. **Survey customers** — what terms have been requested but declined?
5. **Identify market shifts** — competitive landscape, customer expectations
6. **Draft amendments** — specific policy changes with rationale
7. **Approve** with CRO + CFO + GC
8. **Communicate changes** to sales with training
9. **Update charter** + effective date

### Workflow: Audit deal compliance

1. **Export deals** from CRM for the period
2. **Run compliance checker** — `scripts/policy_compliance_checker.py --deals deals.csv --policy policy.yaml`
3. **Review non-compliant deals** — investigate each: was the deviation approved? was it documented?
4. **Categorize**:
   - Compliant with approved deviation: OK
   - Non-compliant unapproved: investigate; corrective action
   - Compliant but suggests policy gap: amend policy
5. **Report** to policy committee; track corrective actions

### Workflow: Generate region-specific policy

1. **Identify region-specific requirements** — currency, jurisdiction, payment norms, regulatory
2. **Run** `scripts/commercial_policy_generator.py --base policy.yaml --region <region>` to get base + regional overlay
3. **Tailor** further with local team (regional VP Sales, regional GC, regional CFO)
4. **Approve** through standard governance
5. **Communicate** to regional sales

---

## Anti-patterns

- **Policy without enforcement.** Written policy + ad-hoc execution = policy is theater.
- **Policy that's never updated.** Markets shift; competitive landscape changes; policy goes stale.
- **Policy with no compliance audit.** Without measurement, you can't tell if policy is followed.
- **Policy too restrictive.** When sales bypasses constantly, the policy is wrong; tighten or loosen.
- **Policy too lax.** When everyone "complies" but margin still erodes, policy doesn't constrain enough.
- **Policy authored without sales input.** Reps see it as imposed; comply minimally.
- **Policy with no training.** Reps don't know what they can offer; default to over-asking deal desk.
- **Policy that's a contract appendix.** Buried in legal docs; never read.
- **Same policy across regions** when market conditions differ substantially.
- **Policy reviewed only after a customer complaint.** Reactive only.

---

## Tooling outputs

| Script | Input | Output |
|--------|-------|--------|
| `scripts/policy_compliance_checker.py` | Deal CSV + policy YAML | Per-deal: compliant / non-compliant with policy violation listing; aggregate compliance metrics |
| `scripts/terms_deviation_analyzer.py` | Deal CSV | Deviation patterns: which terms most often deviate? from which standard? by what magnitude? |
| `scripts/commercial_policy_generator.py` | Base policy YAML + optional region overlay | Generated policy document (markdown), tailored to company stage, ICP, region |

All scripts: stdlib only, argparse CLI, JSON or markdown output.

---

## References

- [commercial-policy-charter.md](references/commercial-policy-charter.md) — full annotated charter with notes on each section
- [discount-and-terms-policy.md](references/discount-and-terms-policy.md) — discount, MFN, rebate, payment-terms policy depth
- [contract-and-commercial-guardrails.md](references/contract-and-commercial-guardrails.md) — MSA modifications, liability, termination, IP

---

## Related skills

- `business-growth/deal-desk` — operational enforcement of policy
- `business-growth/pricing-strategy` — sets prices that policy governs deviations from
- `business-growth/contract-and-proposal-writer` — drafts contracts respecting policy
- `business-growth/channel-economics` — channel deals subject to policy (with overlay for partners)
- `business-growth/partnerships-architect` — partnership terms subject to commercial-policy oversight
- `c-level-advisor/cs-cro-advisor` — CRO is co-owner of policy
- `c-level-advisor/cs-cfo-advisor` — CFO is co-owner of policy
- `ra-qm-team/soc2-compliance-expert` — policy compliance is audit-relevant evidence

---

## competitive-teardown

Source path: `references/business-growth/competitive-teardown/SKILL.md`

# Competitive Teardown

Production-grade competitor analysis framework covering systematic data collection across 6 intelligence sources, a 12-dimension scoring rubric, feature comparison matrices, SWOT analysis, pricing model deconstruction, UX audit methodology, and strategic action plans. Produces battle-card-ready output and stakeholder presentation templates.

---

## Table of Contents

- [When to Use](#when-to-use)
- [Teardown Workflow](#teardown-workflow)
- [Data Collection Framework](#data-collection-framework)
- [12-Dimension Scoring Rubric](#12-dimension-scoring-rubric)
- [Feature Comparison Matrix](#feature-comparison-matrix)
- [Pricing Analysis Framework](#pricing-analysis-framework)
- [SWOT Analysis Template](#swot-analysis-template)
- [UX Audit Methodology](#ux-audit-methodology)
- [Positioning Map](#positioning-map)
- [Action Plan Framework](#action-plan-framework)
- [Battle Card Template](#battle-card-template)
- [Stakeholder Presentation](#stakeholder-presentation)
- [Output Artifacts](#output-artifacts)
- [Related Skills](#related-skills)

---

## When to Use

| Trigger | Teardown Scope |
|---------|---------------|
| Before product strategy or roadmap session | Full teardown (2-4 competitors) |
| Competitor launches major feature or pricing change | Focused teardown (1 competitor, updated dimensions only) |
| Quarterly competitive review | Update existing teardowns + trend analysis |
| Before a sales pitch (battle card needed) | Single-competitor battle card |
| Entering a new market segment | Full teardown of segment incumbents |

---

## Clarify First

Before running the teardown, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Competitors + primary focus** — the 2-4 names and which is the main threat (sets scorecard columns and depth)
- [ ] **Your own product baseline** — so the 12-dimension scorecard and feature matrix have a "you" column to compare against
- [ ] **Decision this feeds** — roadmap session, sales battle card, or new-market entry (determines full teardown vs single battle card vs segment incumbents)
- [ ] **Available data sources** — pricing pages, 50+ reviews, product access (the rubric needs evidence; thin data caps which dimensions are scorable)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the teardown.

## Teardown Workflow

### Step-by-Step Process

1. **Define competitors** -- List 2-4 competitors. Confirm which is the primary focus.
2. **Collect data** -- Gather intelligence from at least 3 of the 6 sources per competitor.
3. **Score using rubric** -- Apply the 12-dimension rubric to produce a numeric scorecard.
4. **Generate comparison outputs** -- Feature matrix, pricing analysis, SWOT, positioning map.
5. **Build action plan** -- Translate findings into quick wins, medium-term, and strategic priorities.
6. **Package for stakeholders** -- Assemble the presentation or battle card.

### Validation Checkpoints

- Before scoring: Confirm you have pricing data, 20+ user reviews, and recent product data
- Before action plan: Every dimension should have a score and supporting evidence
- Before presentation: Every recommendation should tie back to a data point

---

## Data Collection Framework

### Source 1: Website and Product Analysis

| Data Point | Where to Find | What It Signals |
|-----------|--------------|-----------------|
| Pricing tiers and price points | Pricing page | Market positioning, target segment |
| Feature lists per tier | Pricing + feature pages | Packaging strategy |
| Primary CTA and messaging | Homepage hero | Positioning and ICP |
| Case studies and customer logos | Case study page, homepage | Target segments, social proof |
| Integration partnerships | Integrations page | Ecosystem strategy |
| Trust signals | Footer, security page | Enterprise readiness |
| Job postings | Careers page, LinkedIn | Growth direction, tech stack |

### Source 2: User Reviews

**Platforms:** G2, Capterra, TrustRadius, App Store, Product Hunt

| Category | What to Track | Strategic Value |
|----------|-------------|-----------------|
| Praise themes | What users love (top 5 themes) | Their defensible strengths |
| Complaint themes | What users hate (top 5 themes) | Your opportunities |
| Feature requests | What users want but do not have | Product roadmap gaps |
| Switching mentions | Why users left competitors | Competitive migration paths |
| Rating trends | Quarter-over-quarter rating change | Improving or declining |

**Sample size target:** 50+ reviews per competitor for reliable themes.

### Source 3: Job Postings

| Signal | What It Means |
|--------|--------------|
| High engineering hiring | Product investment, scaling |
| AI/ML roles | AI features coming |
| Sales team expansion | Moving upmarket or expanding geographically |
| Customer success roles | Retention focus, enterprise motion |
| Compliance/legal roles | Regulatory expansion |
| Reduced postings | Cost cutting, potential contraction |

### Source 4: SEO and Content Analysis

| Metric | Tool | Strategic Value |
|--------|------|-----------------|
| Top 20 organic keywords | Ahrefs, SEMrush, GSC | Content strategy and targeting |
| Domain authority | Ahrefs, Moz | Brand strength |
| Blog publishing cadence | Manual check | Content investment level |
| Ranking pages (product vs blog vs docs) | Ahrefs | Traffic composition |

### Source 5: Social Media and Community

| Platform | What to Track |
|----------|-------------|
| Twitter/X | Product announcements, customer praise, complaints |
| Reddit | Honest reviews, comparison threads |
| LinkedIn | Thought leadership, hiring signals, employee count |
| Community forums | Feature requests, workarounds, power user patterns |
| Discord/Slack | Community size, engagement level |

### Source 6: Financial and Market Data

| Source | Data Available |
|-------|---------------|
| Crunchbase | Funding, valuation, investors, employee count |
| LinkedIn | Employee count trend (growth proxy) |
| Public filings (if public) | Revenue, growth rate, churn |
| Industry reports | Market share estimates |

---

## 12-Dimension Scoring Rubric

Score each competitor (and your own product) on a 1-5 scale with evidence notes.

| # | Dimension | 1 (Weak) | 3 (Average) | 5 (Best-in-class) |
|---|-----------|----------|-------------|-------------------|
| 1 | Features | Core only, many gaps | Solid coverage | Comprehensive + unique capabilities |
| 2 | Pricing | Confusing or overpriced | Market-rate, clear | Transparent, flexible, fair |
| 3 | UX / Design | Confusing, high friction | Functional, adequate | Delightful, minimal friction |
| 4 | Performance | Slow, unreliable | Acceptable | Fast, high uptime, responsive |
| 5 | Documentation | Sparse, outdated | Decent coverage | Comprehensive, searchable, with examples |
| 6 | Support | Email only, slow response | Chat + email, reasonable SLA | 24/7, multiple channels, fast |
| 7 | Integrations | 0-5 native integrations | 6-25 integrations | 26+ or deep ecosystem (API + marketplace) |
| 8 | Security | No mentions | SOC2 claimed | SOC2 Type II + ISO 27001 + GDPR |
| 9 | Scalability | No enterprise tier | Mid-market ready | Enterprise-grade (SSO, SCIM, SLA) |
| 10 | Brand | Generic, unmemorable | Decent positioning | Strong, differentiated, recognized |
| 11 | Community | None | Forum or Slack exists | Active, vibrant, user-generated content |
| 12 | Innovation | No releases in 6+ months | Quarterly releases | Frequent, meaningful, well-communicated |

### Scoring Output Format

| Dimension | Your Product | Competitor A | Competitor B | Competitor C |
|-----------|-------------|-------------|-------------|-------------|
| Features | 4 | 3 | 5 | 3 |
| Pricing | 3 | 4 | 3 | 4 |
| ... | ... | ... | ... | ... |
| **Total (/60)** | **38** | **35** | **42** | **33** |

---

## Feature Comparison Matrix

### Matrix Structure

| Feature Category | Your Product | Competitor A | Competitor B | Notes |
|-----------------|-------------|-------------|-------------|-------|
| **Core Features** | | | | |
| Feature 1 | Full | Full | Partial | Comp B lacks [specific capability] |
| Feature 2 | Full | Missing | Full | Our differentiator |
| Feature 3 | Partial | Full | Full | Gap to close |
| **Platform** | | | | |
| Web app | Yes | Yes | Yes | |
| iOS app | Yes | No | Yes | Comp A gap |
| API access | Full | Limited | Full | |
| **Enterprise** | | | | |
| SSO | Yes | No | Yes | |
| Audit logs | Yes | Yes | No | |
| Custom SLA | Yes | Yes | Yes | |

**Score per cell:** Full = 5, Partial = 3, Basic = 2, Missing = 0

---

## Pricing Analysis Framework

### Pricing Model Comparison

| Attribute | Your Product | Competitor A | Competitor B |
|-----------|-------------|-------------|-------------|
| Model type | Per seat | Usage-based | Flat rate |
| Free tier | Yes (3 users) | Yes (limited) | No |
| Entry price | $15/user/mo | $29/mo (up to 1K events) | $49/mo |
| Mid-tier price | $35/user/mo | $99/mo | $99/mo |
| Enterprise | Custom | Custom | $249/mo |
| Annual discount | 20% | 15% | 2 months free |
| Trial | 14-day free | 7-day free | 30-day money-back |

### Pricing Position Map

| Position | Characteristic | Your Strategy |
|----------|---------------|---------------|
| Price leader | Lowest price, may signal lower quality | Win on value, not features |
| Value leader | Best features-per-dollar ratio | Win on differentiation |
| Premium | Highest price, justified by brand/features | Win on exclusivity and support |
| Disruptor | Radically different model (free, usage-based) | Win on accessibility |

---

## SWOT Analysis Template

For each competitor, produce:

### Competitor SWOT

| Quadrant | Points |
|----------|--------|
| **Strengths** (Their advantages) | 3-5 bullets, each anchored to a data signal |
| **Weaknesses** (Their vulnerabilities) | 3-5 bullets, each tied to reviews, missing features, or complaints |
| **Opportunities for Us** | What their weaknesses create for us |
| **Threats to Us** | What their strengths mean for our position |

**Evidence rule:** Every bullet must cite the data source (review quote, pricing page, job posting count, feature comparison, etc.).

---

## UX Audit Methodology

### First-Run Experience Audit

| Dimension | What to Measure | How to Score |
|-----------|----------------|--------------|
| Time to first value (TTFV) | Minutes from signup to first meaningful output | < 5 min = 5, 5-15 min = 3, > 15 min = 1 |
| Steps to activation | Number of screens/actions before core value | < 3 = 5, 3-7 = 3, > 7 = 1 |
| Credit card required | Required at signup? | No = 5, Optional = 3, Required = 1 |
| Onboarding quality | Wizard, tooltips, empty states | Comprehensive = 5, Basic = 3, None = 1 |
| SSO available | Google, Microsoft, etc. | Yes = 5, No = 1 |

### Core Workflow Audit

For the 3 most common workflows, compare:

| Workflow | Steps (Yours) | Steps (Competitor) | Friction Points |
|----------|-------------|-------------------|-----------------|
| [Primary workflow] | N | N | Specific UX issues |
| [Secondary workflow] | N | N | Specific UX issues |
| [Tertiary workflow] | N | N | Specific UX issues |

---

## Positioning Map

### 2x2 Positioning Map

Choose the two axes most relevant to your market:

| Common Axis Pairs | When to Use |
|-------------------|-------------|
| Simple / Complex x Low Price / High Price | General product comparison |
| SMB / Enterprise x Narrow / Broad Features | Market segment analysis |
| Self-Serve / Sales-Led x Point Solution / Platform | Go-to-market comparison |
| Technical / Non-Technical x Niche / Horizontal | Audience analysis |

### Map Template

```
                    High Price / Enterprise
                          │
                          │
          [Competitor B]  │  [Competitor C]
                          │
  Simple ─────────────────┼─────────────────── Complex
                          │
          [YOUR PRODUCT]  │  [Competitor A]
                          │
                          │
                    Low Price / SMB
```

---

## Action Plan Framework

### Three Horizons

| Horizon | Timeframe | Effort | Examples |
|---------|-----------|--------|---------|
| Quick wins | 0-4 weeks | Low | Publish comparison pages, update pricing page, add missing trust badges |
| Medium-term | 1-3 months | Moderate | Build top-requested integration, improve onboarding TTFV, launch free tier |
| Strategic | 3-12 months | High | Enter new market segment, build API v2, achieve SOC2 Type II |

### Priority Scoring

For each action item, score:

| Factor | Weight | Scale |
|--------|--------|-------|
| Competitive impact | 40% | How much does this close or widen a gap? |
| Customer demand | 30% | How many customers/prospects request this? |
| Implementation effort | 20% | How hard is this to build/execute? |
| Revenue impact | 10% | Direct revenue contribution? |

---

## Battle Card Template

### One-Page Battle Card

```
COMPETITOR: [Name]
LAST UPDATED: [Date]
THREAT LEVEL: [LOW / MEDIUM / HIGH / CRITICAL]

THEIR POSITIONING: [1 sentence]
OUR POSITIONING AGAINST THEM: [1 sentence]

WHERE THEY WIN:
- [Strength 1 with evidence]
- [Strength 2 with evidence]
- [Strength 3 with evidence]

WHERE WE WIN:
- [Advantage 1 with evidence]
- [Advantage 2 with evidence]
- [Advantage 3 with evidence]

LANDMINES (questions that expose their weaknesses):
- "How does [competitor] handle [weakness area]?"
- "Can you show me [feature they lack]?"
- "What do their customers say about [common complaint]?"

OBJECTION HANDLING:
- "They're cheaper" → [Response with value framing]
- "They have [feature]" → [Response with alternative/roadmap]
- "Everyone uses them" → [Response with differentiation]

PRICING COMPARISON:
[Quick comparison table]

CUSTOMER QUOTE:
"[Quote from a customer who switched from this competitor to you]"
```

---

## Stakeholder Presentation

### 7-Slide Structure

| Slide | Content |
|-------|---------|
| 1. Executive Summary | Threat level, top strength, top opportunity, recommended action |
| 2. Market Position | 2x2 positioning map with all players |
| 3. Feature Scorecard | 12-dimension scores, total comparison |
| 4. Pricing Analysis | Pricing comparison table + key pricing insight |
| 5. UX Comparison | Where they win (3 bullets) vs where we win (3 bullets) |
| 6. Voice of Customer | Top 3 competitor complaints from reviews (quoted) |
| 7. Action Plan | Quick wins, medium-term, strategic priorities |

---

## Output Artifacts

| Artifact | Format | Description |
|----------|--------|-------------|
| Data Collection Report | Structured notes per source | Raw intelligence organized by source type |
| 12-Dimension Scorecard | Scored table with evidence | Numeric comparison across all dimensions |
| Feature Comparison Matrix | Grid table | Feature-by-feature comparison with scoring |
| Pricing Analysis | Comparison table + position map | Model comparison, tier mapping, positioning |
| SWOT Analysis | Per-competitor 4-quadrant | Anchored to data signals |
| UX Audit | Scored checklist | TTFV, steps, friction analysis |
| Positioning Map | 2x2 diagram | Visual market position |
| Action Plan | Three-horizon table | Prioritized competitive responses |
| Battle Card | One-page template | Sales-ready competitive reference |
| Stakeholder Presentation | 7-slide outline | Executive-ready competitive briefing |

---

## Related Skills

- **competitor-alternatives** -- Use for creating comparison and alternative pages for SEO/marketing. Competitive-teardown provides the intelligence; competitor-alternatives produces the marketing content.
- **pricing-strategy** -- Use when competitive analysis reveals pricing misalignment. Feed teardown pricing data into pricing-strategy.
- **page-cro** -- Use for optimizing your comparison or competitor landing pages for conversion.
- **content-creator** -- Use for writing competitive content (blog posts, comparison guides) based on teardown findings.

---

## Tool Reference

### 1. competitor_scorer.py

**Purpose:** Score competitors across the 12-dimension rubric and generate a numeric comparison scorecard.

```bash
python scripts/competitor_scorer.py competitor_data.json
python scripts/competitor_scorer.py competitor_data.json --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `competitor_data.json` | Yes | JSON file with competitor dimension scores and evidence |
| `--json` | No | Output results as JSON |
| `--weights` | No | Custom dimension weights as JSON string (default: equal weights) |

### 2. feature_matrix_builder.py

**Purpose:** Build a feature comparison matrix from structured feature data and calculate coverage scores.

```bash
python scripts/feature_matrix_builder.py features.json
python scripts/feature_matrix_builder.py features.json --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `features.json` | Yes | JSON file with feature comparison data |
| `--json` | No | Output results as JSON |

### 3. battle_card_generator.py

**Purpose:** Generate a one-page battle card from competitor data for sales team use.

```bash
python scripts/battle_card_generator.py competitor_profile.json
python scripts/battle_card_generator.py competitor_profile.json --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `competitor_profile.json` | Yes | JSON file with competitor profile data |
| `--json` | No | Output results as JSON |
| `--format` | No | Output format: text (default) or markdown |

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| Scoring feels subjective across analysts | No shared rubric calibration | Use the 12-dimension rubric with explicit 1/3/5 definitions; have two analysts score independently and reconcile |
| Data is stale within weeks of teardown | Fast-moving competitors | Set calendar reminders for monthly pricing checks and quarterly full refreshes; use competitor_scorer.py to track score changes over time |
| Feature matrix has too many rows to be useful | Trying to capture every micro-feature | Group features into 8-12 categories; detail only the top differentiators |
| Battle cards are not used by sales | Too long, too academic, or not actionable | Keep to one page; lead with "Where We Win" and "Landmines"; validate with 3 sales reps before distributing |
| Review data is contradictory | Small sample size or selection bias | Target 50+ reviews per competitor across G2, Capterra, and TrustRadius; weight recent reviews more heavily |
| Cannot get pricing data for enterprise tiers | Custom pricing not published | Use sales intel (request a demo), G2 pricing data, or customer interviews for directional estimates |
| SWOT analysis has no actionable output | Analysis lacks connection to action plan | Every SWOT bullet must map to a specific quick-win, medium-term, or strategic action |

---

## Success Criteria

- 12-dimension scorecard completed with evidence notes for every score
- Feature matrix covers at least 80% of features that prospects evaluate
- Battle cards reviewed and approved by 3+ sales representatives
- Pricing data verified within the last 30 days
- Teardown produces at least 3 actionable quick wins and 2 strategic priorities
- Stakeholder presentation reviewed and feedback incorporated within 1 week
- Teardown data refreshed quarterly with score trend tracking

---

## Scope & Limitations

- **In scope:** Product analysis, feature comparison, pricing deconstruction, UX audit, SWOT analysis, battle card creation, action plan generation
- **Out of scope:** Primary market research (customer interviews, surveys), financial modeling, legal competitive analysis, intellectual property assessment
- **Data dependency:** Quality depends on publicly available data, user reviews, and product access; some competitors may have limited public information
- **Bias risk:** Teardowns conducted by internal teams may have confirmation bias; consider external validation for high-stakes decisions
- **Point-in-time:** Teardowns are snapshots; competitors evolve continuously -- schedule regular refreshes

---

## Integration Points

- **competitor-alternatives** -- Teardown provides the data; competitor-alternatives produces the marketing content (comparison and alternative pages)
- **pricing-strategy** -- When teardown reveals pricing misalignment, feed pricing data into pricing-strategy for repositioning analysis
- **page-cro** -- Use for optimizing your comparison or competitor landing pages for conversion after teardown produces the content
- **sales-engineer** -- Battle cards feed directly into sales engineering competitive positioning and RFP responses
- **customer-success-manager** -- When exit surveys reveal COMPETITOR as a top churn reason, use teardown data to understand what competitors offer that you do not

---

## competitor-alternatives

Source path: `references/business-growth/competitor-alternatives/SKILL.md`

# Competitor & Alternative Pages

Production-grade framework for creating competitor comparison and alternative pages. Covers 4 page formats, centralized competitor data architecture, deep research methodology, SEO optimization, content templates, and ongoing maintenance strategy. Designed for both SEO traffic capture and sales enablement.

---

## Table of Contents

- [When to Use](#when-to-use)
- [Core Principles](#core-principles)
- [The 4 Page Formats](#the-4-page-formats)
- [Content Architecture](#content-architecture)
- [Research Methodology](#research-methodology)
- [Essential Content Sections](#essential-content-sections)
- [SEO Strategy](#seo-strategy)
- [Maintenance and Updates](#maintenance-and-updates)
- [Quality Standards](#quality-standards)
- [Output Artifacts](#output-artifacts)
- [Related Skills](#related-skills)

---

## When to Use

| Trigger | Action |
|---------|--------|
| Prospects comparing you to competitors | Create vs-pages for top 3 competitors |
| Search volume exists for "[competitor] alternative" | Create singular alternative pages |
| Sales team needs battle card content | Create vs-pages with objection handling |
| Competitor has comparison pages about you | Create counter-comparison pages |
| SEO gap on competitor-branded keywords | Build full alternative page set |

---

## Clarify First

Before writing the comparison content, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Page format** — singular alternative, plural alternatives, you-vs-competitor, or competitor-vs-competitor (selects the page structure template)
- [ ] **Primary goal** — SEO traffic capture vs sales enablement (changes tone, depth, and whether to include objection handling)
- [ ] **Target competitor + data freshness** — who, and how recent the pricing/feature data is (every claim must be verifiable)
- [ ] **Honest positioning** — who you genuinely win for and who the competitor wins for (drives the trust-building "who it's for" sections)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the page.

## Core Principles

### 1. Honesty Builds Trust
- Acknowledge competitor strengths explicitly
- Be accurate about your own limitations
- Readers are actively comparing -- they will verify your claims
- A dishonest comparison page damages your brand more than no page at all

### 2. Help Them Decide (Not Just Sell)
- Different tools genuinely fit different needs
- Be explicit about who you are best for AND who the competitor is best for
- Reduce evaluation friction -- save prospects research time

### 3. Depth Over Checkbox Tables
- Go beyond feature checklists (every competitor does those)
- Explain WHY differences matter for specific use cases
- Include real scenarios and workflows
- Show, do not just tell

### 4. Single Source of Truth
- Centralize competitor data -- do not maintain facts across 10 pages
- Updates propagate to all pages automatically
- Track last-verified date per data point

---

## The 4 Page Formats

### Format 1: [Competitor] Alternative (Singular)

**Intent:** User is actively looking to switch FROM a specific competitor.

**URL:** `/alternatives/[competitor]` or `/[competitor]-alternative`

**Keywords:** "[Competitor] alternative", "alternative to [Competitor]", "switch from [Competitor]"

**Page Structure:**

```
1. Why people look for alternatives (validate their pain, 2-3 paragraphs)
2. TL;DR: You as the alternative (quick positioning, 3-4 bullets)
3. Detailed comparison (features, pricing, support -- paragraph format, not just tables)
4. Who should switch (and who should NOT -- be honest)
5. Migration path (what transfers, what needs reconfiguration)
6. Testimonials from customers who switched
7. CTA: Start free trial or request demo
```

### Format 2: [Competitor] Alternatives (Plural)

**Intent:** User is researching options broadly, earlier in the buying journey.

**URL:** `/alternatives/[competitor]-alternatives` or `/best-[competitor]-alternatives`

**Keywords:** "[Competitor] alternatives", "best [Competitor] alternatives", "tools like [Competitor]"

**Page Structure:**

```
1. Why people look for alternatives (common pain points, 2-3 paragraphs)
2. What to look for in an alternative (evaluation criteria framework)
3. List of 5-7 alternatives (you first, but include real options)
4. Summary comparison table
5. Detailed breakdown of each alternative (150-200 words each)
6. Recommendation by use case ("Best for [X]: [Tool]")
7. CTA
```

**Important:** Include 5-7 REAL alternatives. Being genuinely helpful ranks better and builds trust.

### Format 3: You vs [Competitor]

**Intent:** User is directly comparing you to a specific competitor.

**URL:** `/vs/[competitor]` or `/compare/[you]-vs-[competitor]`

**Keywords:** "[You] vs [Competitor]", "[Competitor] vs [You]"

**Page Structure:**

```
1. TL;DR summary (key differences in 2-3 sentences)
2. At-a-glance comparison table (8-12 dimensions)
3. Detailed comparison by category (paragraph format per category):
   - Features
   - Pricing
   - Ease of use / UX
   - Support and documentation
   - Integrations
   - Security and compliance
4. Who [You] is best for (3-4 bullets)
5. Who [Competitor] is best for (3-4 bullets -- be honest)
6. What customers say (testimonials from switchers)
7. Migration support
8. CTA
```

### Format 4: [Competitor A] vs [Competitor B]

**Intent:** User is comparing two competitors (neither is you directly).

**URL:** `/compare/[competitor-a]-vs-[competitor-b]`

**Page Structure:**

```
1. Overview of both products (neutral, factual)
2. Comparison by category (same categories as Format 3)
3. Who each is best for
4. "Consider a third option" (introduce yourself naturally)
5. Three-way comparison table (both competitors + you)
6. CTA
```

**Why this works:** Captures competitor-branded search traffic, positions you as a knowledgeable authority, and introduces you to buyers who might not have considered you.

---

## Content Architecture

### Centralized Competitor Data

Create a single data file per competitor that feeds all comparison pages.

**Competitor Data Structure:**

```
Competitor: [Name]
Last Verified: [Date]
Website: [URL]

Positioning:
  - Tagline: [Their tagline]
  - Target audience: [Who they target]
  - Primary differentiator: [What they claim is unique]

Pricing:
  - Free tier: [Yes/No, details]
  - Entry price: [$X/mo]
  - Mid-tier price: [$X/mo]
  - Enterprise: [Custom / $X/mo]
  - Billing: [Monthly, Annual, Both]
  - Trial: [Length, CC required?]

Features:
  - [Category 1]: [Rating 1-5, notes]
  - [Category 2]: [Rating 1-5, notes]
  - [Category 3]: [Rating 1-5, notes]

Strengths:
  - [Strength 1 with evidence]
  - [Strength 2 with evidence]

Weaknesses:
  - [Weakness 1 with evidence source]
  - [Weakness 2 with evidence source]

Best For: [Description of ideal customer]
Not Ideal For: [Description of poor fit]

Common Complaints (from reviews):
  - [Complaint 1] (source: G2/Capterra/etc.)
  - [Complaint 2]
  - [Complaint 3]

Migration Notes:
  - Data export: [Available? Format?]
  - API migration: [Available?]
  - Switching time: [Estimated]
```

---

## Research Methodology

### Deep Research Process

For each competitor:

1. **Sign up and use the product** -- Create a real account, go through onboarding, test core workflows. There is no substitute for hands-on experience.
2. **Pricing verification** -- Screenshot current pricing page. Note what is included at each tier. Check for hidden costs.
3. **Review mining** -- Read 50+ reviews on G2, Capterra, TrustRadius. Categorize into praise themes, complaint themes, and feature requests.
4. **Customer feedback** -- Talk to your customers who switched from (or to) this competitor. Capture switching reasons and experience quotes.
5. **Content audit** -- Review their positioning, their comparison pages about you (if any), their changelog, their blog.
6. **Financial/growth signals** -- Check Crunchbase for funding, LinkedIn for employee count trends, job postings for strategic direction.

### Verification Schedule

| Frequency | What to Verify |
|-----------|---------------|
| Monthly | Pricing (check for changes) |
| Quarterly | Feature set, major product updates |
| When notified | Customer reports competitor change |
| Annually | Full refresh of all competitor data |

---

## Essential Content Sections

### TL;DR Summary

Every comparison page starts with a 2-3 sentence summary for scanners. This is the most-read section.

**Template:** "[Your product] is the better choice if you need [differentiator 1] and [differentiator 2]. [Competitor] is better if [their strength]. The biggest differences are [difference 1] and [difference 2]."

### Paragraph Comparisons (Not Just Tables)

For each comparison dimension, write a paragraph explaining:
- How each product handles this area
- Why the differences matter
- Who the difference matters most to

**Tables complement paragraphs. They do not replace them.**

### Pricing Comparison

Include:
- Tier-by-tier price comparison
- What is included at each tier (not just the name)
- Hidden costs (setup fees, overage charges, add-on pricing)
- Total cost calculation for a sample team size (e.g., "For a team of 10")

### Who It Is For

Be explicit about ideal customer for each option:

| Product | Best For | Not Ideal For |
|---------|----------|---------------|
| Your product | [Specific persona/use case] | [Honest admission of limitations] |
| Competitor | [Specific persona/use case] | [Their documented weaknesses] |

### Migration Section

| Element | Content |
|---------|---------|
| What transfers | Data, settings, integrations that migrate |
| What needs reconfiguration | What must be set up fresh |
| Support offered | Migration assistance, documentation |
| Estimated time | "Most teams migrate in [timeframe]" |
| Customer quote | Quote from someone who switched |

---

## SEO Strategy

### Keyword Targeting

| Format | Primary Keywords | Secondary Keywords |
|--------|-----------------|-------------------|
| Singular alternative | "[Competitor] alternative" | "switch from [Competitor]", "replace [Competitor]" |
| Plural alternatives | "[Competitor] alternatives" | "best [Competitor] alternatives", "tools like [Competitor]" |
| Vs page | "[You] vs [Competitor]" | "[Competitor] vs [You]", "[You] or [Competitor]" |
| Competitor vs competitor | "[A] vs [B]" | "[B] vs [A]", "[A] or [B]" |

### On-Page SEO

- Title tag: "[Your Product] vs [Competitor]: Detailed Comparison [Year]"
- Meta description: Summarize the key difference and who each is best for
- H1: Match the primary keyword
- Schema: Consider FAQPage schema for comparison questions

### Internal Linking

- Link between all competitor pages (alternative <-> vs page for same competitor)
- Link from feature pages to relevant comparisons
- Link from blog posts mentioning competitors
- Create a hub page: `/compare/` or `/alternatives/` linking to all comparison content

---

## Maintenance and Updates

### Update Triggers

| Trigger | Action | Priority |
|---------|--------|----------|
| Competitor changes pricing | Update pricing comparison on all affected pages | High |
| Competitor launches major feature | Update feature comparison + add "Recent Changes" note | High |
| Your product launches feature that closes a gap | Update comparison to reflect new advantage | High |
| New customer switching testimonial | Add to relevant comparison pages | Medium |
| Quarterly review cycle | Verify all data points, refresh screenshots | Medium |

### Freshness Signals

- Include "Last updated: [Month Year]" on every comparison page
- Update the date only when actual content changes are made
- Add "Recent changes" section at the top when a competitor makes significant updates

---

## Quality Standards

### Legal Safety

- All claims must be verifiable from public sources or customer quotes
- Do not make claims about competitor uptime, reliability, or security that you cannot verify
- Use "at the time of writing" or "as of [date]" for factual claims
- Do not copy competitor content -- summarize and analyze

### Credibility Rules

- Acknowledge genuine competitor strengths (do not be a hit piece)
- Include "Who [Competitor] is best for" -- this builds trust
- Use customer quotes from both sides (your customers AND competitor reviews)
- Cite sources for data claims (review platforms, pricing pages, public reports)
- Do not use aggressive language or disparaging tone

---

## Output Artifacts

| Artifact | Format | Description |
|----------|--------|-------------|
| Competitor Data File | Structured data per competitor | Centralized competitor profile for all pages |
| Page Set Plan | Prioritized list | Which pages to build first, with target keywords and estimated search volume |
| Alternative Page (Singular) | Full page copy | Complete page with all sections |
| Vs Page | Full page copy | Comparison page with table and narrative sections |
| Alternatives Page (Plural) | Full page copy | Multi-competitor roundup page |
| Migration Guide | Reusable content block | Migration copy for inclusion across pages |
| Hub Page | Linked index | Central page linking to all comparison content |

---

## Related Skills

- **competitive-teardown** -- Use for deep competitive intelligence BEFORE creating pages. Teardown provides the data; this skill produces the content.
- **seo-audit** -- Use to validate comparison pages meet on-page SEO requirements before publishing.
- **page-cro** -- Use for optimizing comparison page conversion rates (CTA placement, social proof, layout).
- **content-creator** -- Use for writing supporting competitive blog content based on comparison data.
- **programmatic-seo** -- Use when you have 10+ competitors and want to generate comparison pages at scale using templates.

---

## Tool Reference

### 1. comparison_page_planner.py

**Purpose:** Generate a prioritized comparison page plan from competitor data with keyword targets and estimated search volume.

```bash
python scripts/comparison_page_planner.py competitors.json
python scripts/comparison_page_planner.py competitors.json --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `competitors.json` | Yes | JSON file with competitor names and search volume estimates |
| `--json` | No | Output results as JSON |
| `--brand` | No | Your brand name for URL slug generation (default: "your-product") |

### 2. competitor_data_tracker.py

**Purpose:** Track and manage centralized competitor data files with staleness detection and update reminders.

```bash
python scripts/competitor_data_tracker.py competitor_profiles/
python scripts/competitor_data_tracker.py competitor_profiles/ --json
python scripts/competitor_data_tracker.py competitor_profiles/ --stale-days 60
```

| Flag | Required | Description |
|------|----------|-------------|
| `competitor_profiles/` | Yes | Directory containing competitor profile JSON files |
| `--json` | No | Output results as JSON |
| `--stale-days` | No | Number of days before data is considered stale (default: 90) |

### 3. comparison_content_scorer.py

**Purpose:** Score existing comparison page content against quality and SEO best practices.

```bash
python scripts/comparison_content_scorer.py page_content.json
python scripts/comparison_content_scorer.py page_content.json --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `page_content.json` | Yes | JSON file with comparison page content and metadata |
| `--json` | No | Output results as JSON |

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| Comparison pages not ranking for target keywords | Thin content or poor on-page SEO | Add 1500+ words of paragraph content (not just tables); ensure H1 matches primary keyword; add FAQ with schema markup |
| Pages rank but do not convert | Missing CTA or weak value proposition | Add CTA after every major section; include migration section and risk reversal (free trial, no CC); use comparison_content_scorer.py to audit |
| Competitor data becomes outdated quickly | No update process in place | Use competitor_data_tracker.py with --stale-days 30 for pricing, 90 for features; assign ownership for monthly checks |
| Sales team does not use comparison content | Pages are too marketing-focused | Create sales-specific versions with objection handling, landmine questions, and talk tracks; test with 3 reps before publishing |
| Legal pushback on competitor claims | Unverifiable or aggressive claims | Cite public sources for every claim; use "as of [date]" qualifiers; acknowledge competitor strengths honestly |
| Too many competitors to cover | Trying to create pages for every competitor | Prioritize using comparison_page_planner.py; start with top 3-5 competitors by search volume and deal frequency |

---

## Success Criteria

- Comparison pages ranking on page 1 for "[competitor] alternative" within 6 months
- Each comparison page converts at 3%+ (visitor to CTA click)
- All competitor data verified within the last 90 days (use competitor_data_tracker.py)
- Pages include honest "Who [Competitor] is best for" section (builds trust, reduces bounce)
- At least 1 customer testimonial from a switcher per comparison page
- Hub page links to all comparison content with clear navigation
- Quarterly content refresh with "Last updated" date on every page

---

## Scope & Limitations

- **In scope:** Comparison page content strategy, SEO optimization, competitor data management, content quality scoring, page planning and prioritization
- **Out of scope:** Primary competitive intelligence gathering (use competitive-teardown), paid advertising strategy, design/development of pages
- **Legal constraint:** All claims must be verifiable from public sources; avoid disparaging competitors; include "as of [date]" for factual claims
- **SEO timeline:** Comparison pages typically take 3-6 months to rank; plan for long-term investment
- **Maintenance cost:** Each competitor page requires ongoing updates; budget for quarterly refreshes

---

## Integration Points

- **competitive-teardown** -- Teardown provides the raw competitive intelligence; this skill transforms it into marketing content
- **page-cro** -- Use for optimizing comparison page conversion rates after content is published
- **seo-audit** -- Use to validate comparison pages meet technical SEO requirements before publishing
- **content-creator** -- Use for writing supporting blog content (competitor comparison blog posts, switching guides)
- **customer-success-manager** -- When customers mention competitor evaluation, comparison pages can be shared proactively

---

## contract-and-proposal-writer

Source path: `references/business-growth/contract-and-proposal-writer/SKILL.md`

# Contract & Proposal Writer

**Tier:** POWERFUL
**Category:** Business Growth
**Tags:** contracts, proposals, SOW, NDA, MSA, GDPR, legal templates, freelance

## Overview

Generate professional, jurisdiction-aware business documents: freelance contracts, project proposals, statements of work, NDAs, and master service agreements. Outputs structured Markdown with conversion instructions for DOCX and PDF. Covers US (Delaware), EU (GDPR), UK, and DACH (German law) jurisdictions with clause libraries for each.

**This is not a substitute for legal counsel.** Use these templates as strong starting points. Review with an attorney for engagements over $50K or involving complex IP, equity, or regulatory requirements.

---

## Core Capabilities

- Fixed-price and hourly development contracts
- Monthly consulting retainer agreements
- Project proposals with timeline and budget breakdown
- Statements of Work (SOW) with deliverables matrix and acceptance criteria
- NDAs (mutual and one-way)
- Master Service Agreements (MSA) with SOW attachment framework
- SaaS partnership agreements (reseller, referral, white-label, integration)
- GDPR Data Processing Addenda (Art. 28) for EU/DACH
- Jurisdiction-specific clause library (US, EU, UK, DACH)
- Change order and scope management clauses

---

## Clarify First

Before drafting the document, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Document type** — contract, proposal, SOW, NDA, or MSA (selects the template and required clauses)
- [ ] **Jurisdiction** — US-Delaware, EU, UK, or DACH (drives IP, liability, and governing-law clauses; DACH needs Nutzungsrechte, EU needs a DPA)
- [ ] **Engagement model + value** — fixed-price, hourly, retainer, or revenue-share and total value (drives payment terms and liability cap)
- [ ] **Personal data involved** — triggers a mandatory GDPR Art. 28 DPA for EU/DACH engagements

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the document.

## Workflow

### Step 1: Requirements Gathering

Gather before drafting:

| Question | Why It Matters |
|----------|---------------|
| Document type? | Contract, proposal, SOW, NDA, MSA |
| Jurisdiction? | US-Delaware, EU, UK, DACH |
| Engagement model? | Fixed-price, hourly, retainer, revenue-share |
| Parties? | Legal names, roles, registered addresses |
| Scope summary? | 1-3 sentences describing the work |
| Total value or rate? | Drives payment terms and liability caps |
| Timeline? | Start date, end date or duration, milestones |
| Special requirements? | IP assignment, white-label, subcontractors, non-compete |
| Personal data involved? | Triggers GDPR DPA requirement in EU/DACH |

### Step 2: Template Selection

| Document Type | Engagement Model | Template |
|--------------|-----------------|----------|
| Dev contract | Fixed-price | Template A: Fixed-Price Development |
| Dev contract | Hourly/Retainer | Template B: Consulting Retainer |
| Partnership | Revenue-share | Template C: SaaS Partnership |
| NDA | Mutual | Template NDA-M |
| NDA | One-way (discloser/recipient) | Template NDA-OW |
| SOW | Any | Template SOW (attaches to MSA or standalone) |
| Proposal | Any | Template P: Project Proposal |

### Step 3: Generate & Fill

Fill all `[BRACKETED]` placeholders. Flag missing information as `[REQUIRED - description]`. Never leave blanks -- an incomplete contract is more dangerous than no contract.

### Step 4: Review Checklist

Before sending any generated document:

- [ ] All `[BRACKETED]` placeholders filled
- [ ] Correct jurisdiction selected and consistent throughout
- [ ] Payment terms match engagement model
- [ ] IP clause matches jurisdiction requirements
- [ ] Liability cap is reasonable (typically 1x-3x contract value)
- [ ] Termination clauses include both for-cause and for-convenience
- [ ] DPA included if personal data is processed (EU/DACH mandatory)
- [ ] Force majeure clause included for engagements over 3 months
- [ ] Change order process defined for fixed-price contracts
- [ ] Acceptance criteria defined for each deliverable

---

## Clause Library

### Payment Terms

| Model | Standard Terms | Risk Notes |
|-------|---------------|------------|
| Fixed-price | 50% upfront, 25% at beta, 25% at acceptance | Best for defined scope |
| Hourly | Net-30, monthly invoicing | Requires time tracking |
| Retainer | Monthly prepaid, 1st of month | Include overflow rate |
| Milestone | Per-milestone invoicing | Define milestones precisely |
| Revenue-share | Net-30 after month close, minimum threshold | Requires audit rights |

**Late payment:** 1.5% per month (US standard), up to statutory maximum in EU/DACH.

### Intellectual Property

| Jurisdiction | Default IP Ownership | Key Requirement |
|-------------|---------------------|-----------------|
| US (Delaware) | Work-for-hire doctrine | Must be in writing, 9 qualifying categories |
| EU | Author retains moral rights | Separate written assignment needed |
| UK | Employer owns (if employee) | Contractor: explicit assignment required |
| DACH (Germany) | Author retains Urheberrecht permanently | Must transfer Nutzungsrechte (usage rights) explicitly |

**Pre-existing IP:** Always carve out pre-existing tools, libraries, and frameworks. Grant client a perpetual, royalty-free license to use pre-existing IP as embedded in deliverables.

**Portfolio rights:** Developer retains right to display work in portfolio unless client requests confidentiality in writing within 30 days.

### Liability

| Risk Level | Cap | When to Use |
|-----------|-----|-------------|
| Standard | 1x total fees paid | Most projects |
| High-risk | 3x total fees paid | Critical infrastructure, regulated industries |
| Uncapped (mutual) | No cap, mutual indemnification | Enterprise partnerships |

**Always exclude:** Indirect, incidental, and consequential damages (both parties).

### Termination

| Type | Notice Period | Financial Treatment |
|------|-------------|-------------------|
| For cause | 14-day cure period | Pay for work completed |
| For convenience (client) | 30 days written notice | Pay for work completed + 10-20% of remaining value |
| For convenience (either) | 30-60 days | Pay for work completed |
| Immediate (material breach uncured) | 7 days post-notice | Pro-rata payment |

### Confidentiality

- Standard term: 3 years post-termination
- Trade secrets: Perpetual (as long as information remains a trade secret)
- Return/destruction: All confidential materials returned or certified destroyed within 30 days of termination
- Exceptions: Publicly known, independently developed, received from third party, required by law

### Dispute Resolution

| Jurisdiction | Recommended Forum | Rules |
|-------------|-------------------|-------|
| US | Binding arbitration | AAA Commercial Rules, Delaware venue |
| EU | ICC arbitration or local courts | ICC Rules, venue in capital of governing law |
| UK | LCIA arbitration, London | LCIA Rules, English law |
| DACH | DIS arbitration or Landgericht | DIS Rules, German law |

---

## Jurisdiction-Specific Requirements

### US (Delaware)
- Governing law: State of Delaware (most business-friendly)
- Work-for-hire doctrine applies (Copyright Act 101)
- Non-compete: Enforceable with reasonable scope/duration/geography
- Electronic signatures: Valid under ESIGN Act and UETA

### EU (GDPR)
- Data Processing Addendum required if handling personal data
- IP assignment may require separate written deed in some member states
- Consumer protection laws may override contract terms for B2C
- Right to withdraw within 14 days for distance contracts (B2C)

### UK (Post-Brexit)
- Governed by English law (most common choice)
- IP: Patents Act 1977, CDPA 1988
- UK GDPR (post-Brexit equivalent) applies for data processing
- Electronic signatures: Valid under Electronic Communications Act 2000

### DACH (Germany / Austria / Switzerland)
- BGB (Buergerliches Gesetzbuch) governs contracts
- Schriftform (written form) required for certain clauses (para 126 BGB)
- Author always retains moral rights (Urheberpersoernlichkeitsrecht) -- cannot be transferred
- Must explicitly transfer Nutzungsrechte (usage rights) with scope and duration
- Non-competes: Maximum 2 years, compensation required (para 74 HGB)
- DSGVO (German GDPR implementation) mandatory for personal data
- Kuendigungsfristen: Statutory notice periods apply and cannot be shortened below minimum

---

## GDPR Data Processing Addendum (Template Block)

Required for any EU/DACH engagement involving personal data:

```markdown
## DATA PROCESSING ADDENDUM (Art. 28 GDPR/DSGVO)

Controller: [CLIENT LEGAL NAME]
Processor: [SERVICE PROVIDER LEGAL NAME]

### Processing Scope
Processor processes personal data solely to perform services under the Agreement.

### Categories of Data Subjects
[End users / Employees / Customers of Controller]

### Categories of Personal Data
[Names, email addresses, usage data, IP addresses, payment information]

### Processing Duration
Term of the Agreement. Deletion within [30] days of termination.

### Processor Obligations
1. Process only on Controller's documented instructions
2. Ensure authorized persons committed to confidentiality
3. Implement Art. 32 technical and organizational measures
4. Assist with data subject rights requests within [10] business days
5. Notify Controller of personal data breach within [72] hours
6. No sub-processors without prior written consent
7. Delete or return all personal data upon termination
8. Make available information to demonstrate compliance

### Current Sub-Processors
| Sub-Processor | Location | Purpose |
|--------------|----------|---------|
| [AWS/GCP/Azure] | [Region] | Cloud infrastructure |
| [Stripe] | [US/EU] | Payment processing |

### Cross-Border Transfers
Transfers outside EEA: [ ] Standard Contractual Clauses [ ] Adequacy Decision [ ] BCRs
```

---

## Project Proposal Template (Template P)

```markdown
# PROJECT PROPOSAL

**Prepared for:** [Client Name]
**Prepared by:** [Your Name / Company]
**Date:** [Date]
**Valid until:** [Date + 30 days]

---

## Executive Summary
[2-3 sentences: what you will build, the business problem it solves, and the expected outcome]

## Understanding of Requirements
[Demonstrate you understand the client's problem. Reference their specific situation, not generic boilerplate]

## Proposed Solution
[Technical approach, architecture overview, technology choices with rationale]

## Scope of Work

### In Scope
- [Deliverable 1: specific description]
- [Deliverable 2: specific description]
- [Deliverable 3: specific description]

### Out of Scope
- [Explicitly list what is NOT included -- prevents scope creep]

### Assumptions
- [Client provides X by Y date]
- [Access to Z system will be available]

## Timeline

| Phase | Deliverables | Duration | Dates |
|-------|-------------|----------|-------|
| Discovery | Requirements document, architecture plan | 1 week | [Dates] |
| Development | Core features, API integration | 4 weeks | [Dates] |
| Testing | QA, UAT, bug fixes | 1 week | [Dates] |
| Launch | Deployment, monitoring, handoff | 1 week | [Dates] |

## Investment

| Item | Cost |
|------|------|
| Discovery & Planning | [Amount] |
| Development | [Amount] |
| Testing & QA | [Amount] |
| Project Management | [Amount] |
| **Total** | **[Amount]** |

### Payment Schedule
- 50% upon contract signing
- 25% at beta delivery
- 25% upon final acceptance

## Why Us
[2-3 concrete differentiators. Reference relevant experience, not just claims]

## Next Steps
1. Review and approve this proposal
2. Sign agreement (attached)
3. Kick-off meeting within [5] business days
```

---

## Document Conversion

```bash
# Markdown to DOCX (basic)
pandoc contract.md -o contract.docx --reference-doc=template.docx

# With numbered sections (legal style)
pandoc contract.md -o contract.docx --number-sections -V fontsize=11pt

# Markdown to PDF (via LaTeX)
pandoc contract.md -o contract.pdf -V geometry:margin=1in -V fontsize=11pt

# Batch convert all contracts
for f in contracts/*.md; do
  pandoc "$f" -o "${f%.md}.docx" --reference-doc=template.docx
done
```

---

## Common Pitfalls

| Pitfall | Consequence | Prevention |
|---------|-------------|------------|
| Missing IP assignment language | Unclear ownership, disputes | Always include explicit IP clause per jurisdiction |
| Vague acceptance criteria | Endless revision cycles | Define "accepted" = written sign-off within X days |
| No change order process | Scope creep on fixed-price | Include change order clause with pricing mechanism |
| Jurisdiction mismatch | Unenforceable clauses | Match governing law to where parties operate |
| Missing liability cap | Unlimited exposure | Always cap liability at 1-3x contract value |
| Oral amendments | Unenforceable modifications | Require written amendments signed by both parties |
| No DPA for EU data | GDPR violation, up to 4% global revenue fine | Always include DPA when processing EU personal data |
| Missing force majeure | No protection against unforeseeable events | Include for engagements over 3 months |

---

## Best Practices

1. Use milestone payments over net-30 for projects over $10K -- reduces cash flow risk for both parties
2. Always include a change order clause in fixed-price contracts
3. For DACH: include Schriftformklausel (written form clause) explicitly
4. Define response time SLAs in retainer agreements (e.g., 4h urgent / 24h normal)
5. Keep templates in version control; review annually as laws change
6. For NDAs: always specify return/destruction of confidential materials on termination
7. Include a survival clause -- specify which clauses survive termination (confidentiality, IP, liability)
8. For EU/DACH: check if consumer protection laws apply (B2C engagements have additional requirements)

---

## Related Skills

| Skill | Use When |
|-------|----------|
| **ceo-advisor** | Strategic decisions about partnerships and business models |
| **cfo-advisor** | Financial terms, pricing strategy, revenue recognition |
| **launch-strategy** | Contract timing around product launches |

---

## Tool Reference

### 1. contract_clause_checker.py

**Purpose:** Validate a contract document (as structured JSON) against required clauses for a given jurisdiction and engagement type.

```bash
python scripts/contract_clause_checker.py contract.json --jurisdiction us-delaware
python scripts/contract_clause_checker.py contract.json --jurisdiction eu --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `contract.json` | Yes | JSON file with contract clauses and metadata |
| `--jurisdiction` | No | Jurisdiction to check against: us-delaware, eu, uk, dach (default: us-delaware) |
| `--type` | No | Contract type: fixed-price, hourly, retainer, nda, msa (default: fixed-price) |
| `--json` | No | Output results as JSON |

### 2. proposal_cost_estimator.py

**Purpose:** Generate a project cost estimate with phase breakdown, payment schedule, and margin analysis.

```bash
python scripts/proposal_cost_estimator.py --hourly-rate 150 --hours 200 --phases 4
python scripts/proposal_cost_estimator.py --hourly-rate 150 --hours 200 --phases 4 --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `--hourly-rate` | Yes | Hourly rate in dollars |
| `--hours` | Yes | Estimated total hours |
| `--phases` | No | Number of project phases (default: 3) |
| `--margin` | No | Desired profit margin percentage (default: 20) |
| `--currency` | No | Currency code (default: USD) |
| `--json` | No | Output results as JSON |

### 3. contract_comparison_analyzer.py

**Purpose:** Compare two contract versions and identify differences in key clauses, payment terms, and risk areas.

```bash
python scripts/contract_comparison_analyzer.py contract_v1.json contract_v2.json
python scripts/contract_comparison_analyzer.py contract_v1.json contract_v2.json --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `contract_v1.json` | Yes | JSON file with first contract version |
| `contract_v2.json` | Yes | JSON file with second contract version |
| `--json` | No | Output results as JSON |

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| Placeholders left in final document | Rushed filling process | Use contract_clause_checker.py to scan for unfilled [BRACKETED] placeholders before sending |
| IP clause is unenforceable in EU/DACH | Using US work-for-hire language in EU context | Switch to explicit Nutzungsrechte transfer for DACH; use separate written assignment deed for EU |
| Client disputes scope after signing | Vague acceptance criteria or missing change order process | Define "accepted" = written sign-off within X business days; include change order clause with pricing mechanism |
| Payment disputes on hourly contracts | No time tracking requirement or unclear invoicing terms | Specify time tracking tool, invoicing frequency (monthly), and payment terms (net-30) in the contract |
| GDPR non-compliance penalty risk | Missing DPA for EU/DACH engagements involving personal data | Always include Art. 28 DPA when processing EU personal data; use the template block in this skill |
| Contract fails legal review | Jurisdiction mismatch or missing mandatory clauses | Run contract_clause_checker.py against the target jurisdiction before legal review |

---

## Success Criteria

- All [BRACKETED] placeholders filled before document delivery
- Correct jurisdiction selected and consistent throughout (verified by contract_clause_checker.py)
- Payment terms match engagement model with clear invoicing cadence
- IP clause matches jurisdiction requirements (work-for-hire for US, Nutzungsrechte for DACH)
- Liability cap set at 1-3x contract value with consequential damages excluded
- DPA included for all EU/DACH engagements involving personal data
- Change order process defined for all fixed-price contracts

---

## Scope & Limitations

- **In scope:** Contract templates, proposal generation, clause libraries, jurisdiction-specific compliance, document comparison, cost estimation
- **Out of scope:** Legal advice, contract negotiation strategy, litigation support, regulatory filings
- **Not legal counsel:** These templates are starting points; review with an attorney for engagements over $50K or involving complex IP, equity, or regulatory requirements
- **Jurisdiction coverage:** US (Delaware), EU (general), UK, DACH (Germany/Austria/Switzerland); other jurisdictions may require additional legal review
- **Currency:** Cost estimator defaults to USD; adjust for local currency in international engagements

---

## Integration Points

- **ceo-advisor** -- Strategic decisions about partnership structures and business models that drive contract type selection
- **cfo-advisor** -- Financial terms, revenue recognition, and pricing strategy that inform payment schedule and margin targets
- **customer-success-manager** -- SOW and MSA structures for customer engagements; renewal terms feed into CS workflows
- **pricing-strategy** -- When proposal pricing needs strategic positioning against competitors or market rates
- **revenue-operations** -- Contract values and payment schedules feed into pipeline forecasting and revenue recognition

---

## customer-success-manager

Source path: `references/business-growth/customer-success-manager/SKILL.md`

# Customer Success Manager

Production-grade customer success analytics with multi-dimensional health scoring, churn risk prediction, and expansion opportunity identification. Three Python CLI tools provide deterministic, repeatable analysis using standard library only -- no external dependencies, no API calls, no ML models.

---

## Table of Contents

- [Capabilities](#capabilities)
- [Input Requirements](#input-requirements)
- [Output Formats](#output-formats)
- [How to Use](#how-to-use)
- [Scripts](#scripts)
- [Reference Guides](#reference-guides)
- [Templates](#templates)
- [Best Practices](#best-practices)
- [Limitations](#limitations)

---

## Capabilities

- **Customer Health Scoring**: Multi-dimensional weighted scoring across usage, engagement, support, and relationship dimensions with Red/Yellow/Green classification
- **Churn Risk Analysis**: Behavioral signal detection with tier-based intervention playbooks and time-to-renewal urgency multipliers
- **Expansion Opportunity Scoring**: Adoption depth analysis, whitespace mapping, and revenue opportunity estimation with effort-vs-impact prioritization
- **Segment-Aware Benchmarking**: Configurable thresholds for Enterprise, Mid-Market, and SMB customer segments
- **Trend Analysis**: Period-over-period comparison to detect improving or declining trajectories
- **Executive Reporting**: QBR templates, success plans, and executive business review templates

---

## Input Requirements

All scripts accept a JSON file as positional input argument. See `assets/sample_customer_data.json` for complete examples.

### Health Score Calculator

```json
{
  "customers": [
    {
      "customer_id": "CUST-001",
      "name": "Acme Corp",
      "segment": "enterprise",
      "arr": 120000,
      "usage": {
        "login_frequency": 85,
        "feature_adoption": 72,
        "dau_mau_ratio": 0.45
      },
      "engagement": {
        "support_ticket_volume": 3,
        "meeting_attendance": 90,
        "nps_score": 8,
        "csat_score": 4.2
      },
      "support": {
        "open_tickets": 2,
        "escalation_rate": 0.05,
        "avg_resolution_hours": 18
      },
      "relationship": {
        "executive_sponsor_engagement": 80,
        "multi_threading_depth": 4,
        "renewal_sentiment": "positive"
      },
      "previous_period": {
        "usage_score": 70,
        "engagement_score": 65,
        "support_score": 75,
        "relationship_score": 60
      }
    }
  ]
}
```

### Churn Risk Analyzer

```json
{
  "customers": [
    {
      "customer_id": "CUST-001",
      "name": "Acme Corp",
      "segment": "enterprise",
      "arr": 120000,
      "contract_end_date": "2026-06-30",
      "usage_decline": {
        "login_trend": -15,
        "feature_adoption_change": -10,
        "dau_mau_change": -0.08
      },
      "engagement_drop": {
        "meeting_cancellations": 2,
        "response_time_days": 5,
        "nps_change": -3
      },
      "support_issues": {
        "open_escalations": 1,
        "unresolved_critical": 0,
        "satisfaction_trend": "declining"
      },
      "relationship_signals": {
        "champion_left": false,
        "sponsor_change": false,
        "competitor_mentions": 1
      },
      "commercial_factors": {
        "contract_type": "annual",
        "pricing_complaints": false,
        "budget_cuts_mentioned": false
      }
    }
  ]
}
```

### Expansion Opportunity Scorer

```json
{
  "customers": [
    {
      "customer_id": "CUST-001",
      "name": "Acme Corp",
      "segment": "enterprise",
      "arr": 120000,
      "contract": {
        "licensed_seats": 100,
        "active_seats": 95,
        "plan_tier": "professional",
        "available_tiers": ["professional", "enterprise", "enterprise_plus"]
      },
      "product_usage": {
        "core_platform": {"adopted": true, "usage_pct": 85},
        "analytics_module": {"adopted": true, "usage_pct": 60},
        "integrations_module": {"adopted": false, "usage_pct": 0},
        "api_access": {"adopted": true, "usage_pct": 40},
        "advanced_reporting": {"adopted": false, "usage_pct": 0}
      },
      "departments": {
        "current": ["engineering", "product"],
        "potential": ["marketing", "sales", "support"]
      }
    }
  ]
}
```

---

## Output Formats

All scripts support two output formats via the `--format` flag:

- **`text`** (default): Human-readable formatted output for terminal viewing
- **`json`**: Machine-readable JSON output for integrations and pipelines

---

## Clarify First

Before running the analysis, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which analysis** — health score, churn risk, or expansion opportunity (selects which of the three scripts and its input schema)
- [ ] **Customer segment** — Enterprise / Mid-Market / SMB (segment-aware thresholds change every Red/Yellow/Green and risk-tier cutoff)
- [ ] **Previous-period data availability** — without it, trend analysis (declining vs improving) cannot run
- [ ] **Renewal date / contract end** — drives the time-to-renewal urgency multiplier in churn scoring

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the output.

## How to Use

### Quick Start

```bash
# Health scoring
python scripts/health_score_calculator.py assets/sample_customer_data.json
python scripts/health_score_calculator.py assets/sample_customer_data.json --format json

# Churn risk analysis
python scripts/churn_risk_analyzer.py assets/sample_customer_data.json
python scripts/churn_risk_analyzer.py assets/sample_customer_data.json --format json

# Expansion opportunity scoring
python scripts/expansion_opportunity_scorer.py assets/sample_customer_data.json
python scripts/expansion_opportunity_scorer.py assets/sample_customer_data.json --format json
```

### Workflow Integration

```bash
# 1. Score customer health across portfolio
python scripts/health_score_calculator.py customer_portfolio.json --format json > health_results.json

# 2. Identify at-risk accounts
python scripts/churn_risk_analyzer.py customer_portfolio.json --format json > risk_results.json

# 3. Find expansion opportunities in healthy accounts
python scripts/expansion_opportunity_scorer.py customer_portfolio.json --format json > expansion_results.json

# 4. Prepare QBR using templates
# Reference: assets/qbr_template.md
```

---

## Scripts

### 1. health_score_calculator.py

**Purpose:** Multi-dimensional customer health scoring with trend analysis and segment-aware benchmarking.

**Dimensions and Weights:**
| Dimension | Weight | Metrics |
|-----------|--------|---------|
| Usage | 30% | Login frequency, feature adoption, DAU/MAU ratio |
| Engagement | 25% | Support ticket volume, meeting attendance, NPS/CSAT |
| Support | 20% | Open tickets, escalation rate, avg resolution time |
| Relationship | 25% | Executive sponsor engagement, multi-threading depth, renewal sentiment |

**Classification:**
- Green (75-100): Healthy -- customer achieving value
- Yellow (50-74): Needs attention -- monitor closely
- Red (0-49): At risk -- immediate intervention required

**Usage:**
```bash
python scripts/health_score_calculator.py customer_data.json
python scripts/health_score_calculator.py customer_data.json --format json
```

### 2. churn_risk_analyzer.py

**Purpose:** Identify at-risk accounts with behavioral signal detection and tier-based intervention recommendations.

**Risk Signal Weights:**
| Signal Category | Weight | Indicators |
|----------------|--------|------------|
| Usage Decline | 30% | Login trend, feature adoption change, DAU/MAU change |
| Engagement Drop | 25% | Meeting cancellations, response time, NPS change |
| Support Issues | 20% | Open escalations, unresolved critical, satisfaction trend |
| Relationship Signals | 15% | Champion left, sponsor change, competitor mentions |
| Commercial Factors | 10% | Contract type, pricing complaints, budget cuts |

**Risk Tiers:**
- Critical (80-100): Immediate executive escalation
- High (60-79): Urgent CSM intervention
- Medium (40-59): Proactive outreach
- Low (0-39): Standard monitoring

**Usage:**
```bash
python scripts/churn_risk_analyzer.py customer_data.json
python scripts/churn_risk_analyzer.py customer_data.json --format json
```

### 3. expansion_opportunity_scorer.py

**Purpose:** Identify upsell, cross-sell, and expansion opportunities with revenue estimation and priority ranking.

**Expansion Types:**
- **Upsell**: Upgrade to higher tier or more of existing product
- **Cross-sell**: Add new product modules
- **Expansion**: Additional seats or departments

**Usage:**
```bash
python scripts/expansion_opportunity_scorer.py customer_data.json
python scripts/expansion_opportunity_scorer.py customer_data.json --format json
```

---

## Reference Guides

| Reference | Description |
|-----------|-------------|
| `references/health-scoring-framework.md` | Complete health scoring methodology, dimension definitions, weighting rationale, threshold calibration |
| `references/cs-playbooks.md` | Intervention playbooks for each risk tier, onboarding, renewal, expansion, and escalation procedures |
| `references/cs-metrics-benchmarks.md` | Industry benchmarks for NRR, GRR, churn rates, health scores, expansion rates by segment and industry |

---

## Templates

| Template | Purpose |
|----------|---------|
| `assets/qbr_template.md` | Quarterly Business Review presentation structure |
| `assets/success_plan_template.md` | Customer success plan with goals, milestones, and metrics |
| `assets/onboarding_checklist_template.md` | 90-day onboarding checklist with phase gates |
| `assets/executive_business_review_template.md` | Executive stakeholder review for strategic accounts |

---

## Best Practices

1. **Score regularly**: Run health scoring weekly for Enterprise, bi-weekly for Mid-Market, monthly for SMB
2. **Act on trends, not snapshots**: A declining Green is more urgent than a stable Yellow
3. **Combine signals**: Use all three scripts together for a complete customer picture
4. **Calibrate thresholds**: Adjust segment benchmarks based on your product and industry
5. **Document interventions**: Track what actions you took and outcomes for playbook refinement
6. **Prepare with data**: Run scripts before every QBR and executive meeting

---

## Limitations

- **No real-time data**: Scripts analyze point-in-time snapshots from JSON input files
- **No CRM integration**: Data must be exported manually from your CRM/CS platform
- **Deterministic only**: No predictive ML -- scoring is algorithmic based on weighted signals
- **Threshold tuning**: Default thresholds are industry-standard but may need calibration for your business
- **Revenue estimates**: Expansion revenue estimates are approximations based on usage patterns

---

---

## Tool Reference

### 1. health_score_calculator.py

**Purpose:** Multi-dimensional customer health scoring with trend analysis and segment-aware benchmarking.

```bash
python scripts/health_score_calculator.py customer_data.json
python scripts/health_score_calculator.py customer_data.json --format json
```

| Flag | Required | Description |
|------|----------|-------------|
| `customer_data.json` | Yes | JSON file with customer health data (usage, engagement, support, relationship metrics) |
| `--format` | No | Output format: text (default) or json |

**Dimensions and Weights:** Usage (30%), Engagement (25%), Support (20%), Relationship (25%)

**Classification:** Green (75-100), Yellow (50-74), Red (0-49) -- thresholds adjust by segment (Enterprise, Mid-Market, SMB)

### 2. churn_risk_analyzer.py

**Purpose:** Identify at-risk accounts with behavioral signal detection and tier-based intervention recommendations.

```bash
python scripts/churn_risk_analyzer.py customer_data.json
python scripts/churn_risk_analyzer.py customer_data.json --format json
```

| Flag | Required | Description |
|------|----------|-------------|
| `customer_data.json` | Yes | JSON file with churn risk signals (usage decline, engagement drop, support issues, relationship signals, commercial factors) |
| `--format` | No | Output format: text (default) or json |

**Risk Tiers:** Critical (80-100), High (60-79), Medium (40-59), Low (0-39)

**Signal Weights:** Usage Decline (30%), Engagement Drop (25%), Support Issues (20%), Relationship Signals (15%), Commercial Factors (10%)

### 3. expansion_opportunity_scorer.py

**Purpose:** Identify upsell, cross-sell, and expansion opportunities with revenue estimation and priority ranking.

```bash
python scripts/expansion_opportunity_scorer.py customer_data.json
python scripts/expansion_opportunity_scorer.py customer_data.json --format json
```

| Flag | Required | Description |
|------|----------|-------------|
| `customer_data.json` | Yes | JSON file with customer contract, product usage, and department data |
| `--format` | No | Output format: text (default) or json |

**Expansion Types:** Upsell (tier upgrade), Cross-sell (new modules), Expansion (seats/departments)

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| Health scores do not correlate with actual churn | Default thresholds do not match your product | Calibrate segment thresholds using historical churn data; compare 90-day retained vs churned cohorts |
| All accounts show as Yellow | Thresholds too strict or data quality issues | Review input data completeness; adjust benchmarks in health_score_calculator.py constants for your industry |
| Churn risk scores are uniformly low | Missing key signals (champion left, competitor mentions) | Ensure all signal categories have data; missing data defaults to low risk, which understates actual risk |
| Expansion scores do not reflect reality | Product usage data is incomplete or stale | Verify product_usage fields cover all modules; run with fresh data exports from your product analytics |
| Scripts error on input data | JSON format does not match expected schema | Reference the Input Requirements section for exact JSON structure; validate JSON before running |
| Trend analysis shows no change | Previous period data not provided | Include the previous_period block in health score input for meaningful trend comparison |
| Intervention recommendations feel generic | Segment is not specified | Always include the segment field (enterprise, mid-market, smb) for segment-appropriate playbooks |

---

## Success Criteria

- Health scores run weekly for Enterprise, bi-weekly for Mid-Market, monthly for SMB accounts
- Portfolio health distribution: 60%+ Green, less than 15% Red
- Churn risk critical accounts have executive escalation within 48 hours
- Expansion pipeline generated covers 20%+ of net retention target
- Health score trends (improving/declining) drive proactive outreach before renewal window
- QBR preparation includes health score, risk assessment, and expansion opportunities for every strategic account
- Intervention playbooks followed for all High and Critical risk accounts

---

## Scope & Limitations

- **In scope:** Customer health scoring, churn risk analysis, expansion opportunity identification, segment benchmarking, trend analysis, QBR preparation
- **Out of scope:** CRM integration, real-time monitoring, predictive ML modeling, automated outreach
- **Data dependency:** Scripts analyze point-in-time JSON snapshots; data must be exported manually from your CRM/CS platform
- **Deterministic scoring:** All analysis is algorithmic based on weighted signals -- no machine learning predictions
- **Threshold tuning:** Default thresholds are industry-standard benchmarks; calibrate for your specific product and customer base
- **Revenue estimates:** Expansion revenue estimates are approximations based on usage patterns, not binding forecasts

---

## Integration Points

- **churn-prevention** -- High-risk accounts from churn_risk_analyzer.py should trigger cancel flow optimization and save offer review
- **revenue-operations** -- Expansion opportunities feed into pipeline forecasting; health scores inform forecast confidence
- **onboarding-cro** -- When health scores show low usage in early lifecycle, the root cause is often poor activation
- **pricing-strategy** -- When expansion analysis reveals pricing as a barrier to upsell, feed into pricing-strategy for packaging review
- **competitive-teardown** -- When churn risk signals include competitor mentions, use teardown data to build counter-positioning

---

**Last Updated:** March 2026
**Tools:** 3 Python CLI tools
**Dependencies:** Python 3.7+ standard library only

---

## deal-desk

Source path: `references/business-growth/deal-desk/SKILL.md`

# Deal Desk

End-to-end deal-desk operational practice: charter, approval thresholds, deal-review packet design, routing automation, velocity analysis, and the governance that turns "every deal is a snowflake" into "we close non-standard deals in 48 hours predictably."

This skill is provider-agnostic: works whether your CRM is Salesforce, HubSpot, Pipedrive, or homegrown. The patterns and decisions transfer.

---

## When to use this skill

| Situation | Skill applies |
|-----------|---------------|
| Starting a deal-desk function from scratch | Yes — start with **charter design** |
| Reviewing existing deal-desk for slowness / inconsistency | Yes — use `scripts/deal_velocity_analyzer.py` + **bottleneck patterns** |
| Defining who can approve what discount / term | Yes — use **approval threshold matrix** + `scripts/discount_authority_router.py` |
| Building the deal-review packet template | Yes — see **deal-review packet** section + `scripts/deal_review_packet.py` |
| Approving / declining a specific deal | Use the packet generator + approval router |
| Setting pricing strategy | Use `business-growth/pricing-strategy` first |
| Forecasting / measuring pipeline | Use `business-growth/revenue-operations` |
| Negotiating an individual contract | Pair with `business-growth/contract-and-proposal-writer` |

---

## What deal desk does (and doesn't)

**Does:**
- Review non-standard deals: discounts beyond rep authority, custom legal terms, custom SLAs, multi-product bundles, payment terms outside policy
- Make the approval decision (or route to the right approver)
- Structure the deal: pricing, terms, ramp schedule, success criteria
- Maintain the deal-desk **policy** — what's standard, what needs approval
- Track deal velocity (time from request → decision → signature)
- Produce evidence for finance / audit (every concession traceable)

**Doesn't:**
- Set the published pricing (that's pricing strategy)
- Negotiate with the customer (that's the sales rep / AE)
- Close the sale (that's the rep + customer success)
- Run the order-to-cash workflow (that's billing / RevOps)
- Replace legal review (legal is one of the approvers, not the function itself)

A clean deal-desk = the lubricant. Without it, every non-standard deal turns into a multi-week negotiation among engineering / product / legal / finance / executive. With it, those people are consulted by deal desk as needed and the rep gets a yes/no in days.

---

## Deal-desk charter (template)

Every deal desk needs a written charter. Use this template:

```yaml
purpose:
  Deal Desk reviews, approves, and structures non-standard deals to enable
  sales to close faster while keeping commercial / legal / financial risk
  within company tolerance.

scope:
  In-scope:
    - All deals > $X ARR
    - All deals with discount > Y%
    - All deals with non-standard terms (custom SLAs, custom legal language,
      payment terms beyond Net 30, ramp deals, multi-year discounts > 12 months
      of standard, bundles spanning multiple product lines)
    - All renewals with > 20% expansion or > 10% contraction
    - All deals to enterprise (>1000 employees) or regulated industries
  Out-of-scope:
    - Self-serve / PLG transactions
    - Standard renewals within auto-renewal terms
    - Trial extensions < 30 days
    - Add-ons < $X per existing customer

sla:
  - Standard deal-desk review (no exec approval needed): 1 business day
  - Deal needing CFO/CRO approval: 2 business days
  - Deal needing CEO/Board approval: 5 business days
  - Legal-only review (no commercial concession): 2 business days

intake_format:
  Sales submits via [Salesforce form / CPQ tool / Slack form]. Required fields:
    - Customer name + size + industry
    - Product(s) + ACV
    - Requested deviation from standard (specific list)
    - Justification (competitor situation, customer constraint, strategic value)
    - Standard-pricing total + requested total
    - Contract length + payment terms
    - Implementation / SLA requirements

decision_inputs:
  - Customer LTV estimate
  - Strategic value (logo, reference, vertical foothold)
  - Risk (credit, compliance, integration)
  - Margin impact

outputs:
  - Approve / decline / counter
  - If approve: signed approval packet with terms, conditions, expiration date
  - If counter: list of negotiable items + non-negotiables
  - If decline: reasoning + alternatives

team:
  Deal-desk lead: <name>
  Deal-desk analysts: <names>
  Standing approvers: CRO, CFO, General Counsel, VP Product (escalation paths)
  Consulted as-needed: Engineering Lead, Security Lead, Customer Success Lead

metrics:
  - Median time-to-decision (target: 1 business day)
  - Decision distribution (% approved, % declined, % countered)
  - Discount-on-discount %  (deals where requested discount was further negotiated up)
  - Discount % vs ACV (correlation; outliers reviewed monthly)
  - Win rate of deal-desk-approved deals
  - Concession follow-through (did the customer keep their side?)
```

See [references/deal-desk-charter-and-process.md](references/deal-desk-charter-and-process.md) for the full charter template, including sub-charters per region, intake form spec, and the standard SLAs.

---

## Approval threshold matrix

The matrix defines: for each deal characteristic (discount %, contract length, custom term type), who can approve it.

### Standard matrix template

| Deal characteristic | Rep | Sales Manager | Director | VP Sales | CRO | CFO | CEO |
|---------------------|-----|---------------|----------|----------|-----|-----|-----|
| Discount 0-10% | ✓ | | | | | | |
| Discount 10-20% | | ✓ | | | | | |
| Discount 20-30% | | | ✓ | | | | |
| Discount 30-40% | | | | ✓ | | | |
| Discount 40-50% | | | | | ✓ | | |
| Discount > 50% | | | | | | | ✓ |
| ACV > $250k | | ✓ | | | | | |
| ACV > $1M | | | | ✓ | | | |
| ACV > $5M | | | | | | | ✓ |
| Multi-year > 12mo standard | | ✓ | | | | | |
| Non-standard payment terms | | | | | | ✓ | |
| Custom SLA / penalties | | | | (with CCO) | | | |
| Custom legal language | | | | | | | (Legal must concur) |
| MSA red-line on liability cap | | | | | | | (Legal must concur) |
| Most-favored-nation clause | | | | | | ✓ | |
| Acceptance criteria / payment-on-acceptance | | | | | | ✓ | |
| Multi-product / cross-BU bundle | | | (each BU lead approves) | | | | |
| Whitelabel / OEM rights | | | | | | | ✓ |

Customize per company stage, ACV distribution, and authority preference (some orgs want CRO at 30%, others delegate further down).

### Stacking rule

When multiple non-standard items apply, **the highest required approver applies.** A $1M deal at 25% discount with custom SLA needs VP Sales (ACV) AND Director (discount) AND VP Sales+CCO (custom SLA) → effectively requires VP Sales sign-off + CCO + Legal concurrence.

Use `scripts/discount_authority_router.py --deal deal.yaml` to compute the required approvers for any deal.

See [references/approval-thresholds-and-routing.md](references/approval-thresholds-and-routing.md) for the full matrix design guide, regional variants, escalation paths, and routing automation patterns.

---

## The deal-review packet

Every non-standard deal gets a packet. Without it, approvers ask the same questions repeatedly and decisions take days instead of hours.

### Standard packet structure

```markdown
# Deal Review: <Customer Name>

## Summary
- Customer: <name, size, industry>
- ACV: $<amount>
- Discount %: <%> (vs standard $<list-price>)
- Contract: <length>, <payment terms>
- Decision needed by: <date>

## Standard vs Requested
| Item | Standard | Requested | Delta |
|------|----------|-----------|-------|
| ACV  | $X       | $Y        | -Z%   |
| Term | 12mo     | 36mo      | +24mo |
| Payment | Net 30 | Net 60   | +30d  |
| SLA  | 99.5%    | 99.9%     | +0.4% |
| Liability cap | 1x fees | 2x fees | +1x |
| Termination for convenience | No | Yes (90d) | New |

## Justification
- Why customer wants this: <competitor situation, budget cycle, etc.>
- Why we're considering: <strategic value, logo, vertical>
- Customer leverage: <alternatives they have>

## Financial impact
- Standard ARR: $X
- Discounted ARR: $Y (Z% off)
- Net new gross margin: $A (with cost overlay)
- Projected LTV with this discount: $B
- Discount payback if customer renews: <years>

## Strategic value
- Logo value: <high/medium/low — reasoning>
- Reference value: <will they be a public ref? case study?>
- Vertical foothold: <do we want this vertical?>
- Competitive replacement: <who are we displacing?>

## Risk
- Credit risk: <score / payment history>
- Compliance risk: <regulated? data residency?>
- Technical fit risk: <integration complexity>
- Concession follow-through: <are they likely to honor commitments?>

## Required approvers (per matrix)
- [ ] Director: <name>
- [ ] VP Sales: <name>
- [ ] CFO: <name>
- [ ] Legal: <name>

## Recommendation (from deal desk)
<Approve / Counter / Decline> — with reasoning

## Conditions if approved
- Discount expires <date>
- Customer must agree to: <reference call, case study, etc.>
- Customer agrees this is single-instance (not precedent)
- Payment must close by <date>
```

Use `scripts/deal_review_packet.py --deal deal.yaml` to generate this packet from a deal spec.

---

## Velocity analysis

A slow deal desk strangles sales. Measure and tune.

### Key metrics

| Metric | Healthy | Warning |
|--------|---------|---------|
| Median time-to-decision | < 1 business day | > 3 days |
| 90th percentile time-to-decision | < 3 business days | > 7 days |
| % of deals waiting on a single approver > 24h | < 10% | > 30% |
| Deals stuck > 7 days | 0 | > 5 |
| Sales rep satisfaction with deal desk (NPS) | > 50 | < 0 |
| % approved (high approval rate may mean threshold too low) | 60-80% | > 95% or < 40% |
| Discount-on-discount: deals where customer negotiated up after deal-desk approval | < 10% | > 30% |

Run `scripts/deal_velocity_analyzer.py --deals deals.csv` to compute these from a CRM export.

### Common bottlenecks

| Bottleneck | Diagnosis | Fix |
|------------|-----------|-----|
| Single approver bottleneck (one person on everything) | Routing matrix concentrated authority | Delegate; add back-ups; raise thresholds |
| Legal review takes a week | Legal sees every deal | Standard MSA + pre-approved clause library; Legal only on deviations |
| Engineering needed for SLA review | Custom SLAs every time | Publish standard SLA tiers; only deviations route to eng |
| Approval cycle back-and-forth | Packet missing key info | Use the standard packet template; reject incomplete submissions |
| Long executive lag | Exec doesn't have context for every deal | Weekly deal review meeting for batch decisions on smaller items |
| Sales submits incomplete packets | Reps don't know what to include | Intake form that enforces required fields |
| No SLA enforcement | Deals sit in queue with no urgency | Publish + report SLA; aging dashboard visible to leadership |

See [references/discount-and-concession-playbook.md](references/discount-and-concession-playbook.md) for the discount/concession patterns: legitimate reasons for each concession type, how to evaluate, alternatives to discounting, and how to structure performance-based discounts.

---

## Clarify First

Before generating the deal-desk artifact, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Task type** — standing up the desk (charter + matrix) vs reviewing one deal (packet) (determines which template you produce)
- [ ] **Deal specifics: ACV + requested deviation** — discount %, term, payment, custom SLA/legal (sets the Standard-vs-Requested table and which approvers the matrix requires)
- [ ] **Approval authority structure** — who can approve what (Rep→Manager→Director→VP→CRO/CFO/CEO + Legal) (drives the threshold matrix and routing)
- [ ] **Strategic value + risk** — logo/reference value, credit/compliance risk (drives the packet's justification and recommendation)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## End-to-end workflows

### Workflow: A rep submits a non-standard deal

1. **Rep submits** via intake form: customer + ACV + requested deviation + justification
2. **Deal desk triages** within 4h: assigns analyst, validates packet completeness, requests missing info
3. **Deal desk reviews** within 1 business day: financial impact, strategic value, risk
4. **Deal desk recommends** approve / counter / decline
5. **Route to approver(s)** per matrix (auto via `scripts/discount_authority_router.py`)
6. **Approver decides** within SLA
7. **If approved**: packet signed off, conditions sent to rep with expiration
8. **If countered**: deal desk works with rep on alternative structure
9. **If declined**: clear reason + alternatives sent to rep + customer

### Workflow: Stand up a deal desk from scratch

1. **Draft charter** with sales, finance, legal sign-off
2. **Build the approval matrix** — interview key stakeholders, document existing tribal knowledge
3. **Design intake form** — CRM-integrated or Slack-bot
4. **Hire / appoint deal desk lead + analyst(s)**
5. **Train sales** — what triggers deal desk, what info is needed, what to expect
6. **Soft launch** — manual operation for 1 month; track metrics
7. **Iterate** — refine thresholds, automate routing, publish SLAs
8. **Quarterly review** — metrics, threshold adjustments, charter updates

### Workflow: Audit deal-desk performance

1. **Export deals** from CRM for the period (CSV with deal IDs, stages, approval timestamps, discounts)
2. **Run velocity analyzer** — compute medians, percentiles, aging, approver bottlenecks
3. **Sample 10-20 deals** for qualitative review (was the packet complete? were conditions met?)
4. **Identify patterns** — are certain reps over-discounting? are certain customers getting MFN clauses inappropriately?
5. **Propose adjustments** — to charter, thresholds, intake form, training
6. **Present to leadership** with metrics + recommendations

### Workflow: Quarterly threshold review

Thresholds drift. Quarterly:

1. **Pull discount distribution** for the quarter
2. **Identify outliers** — deals where discount % was anomalous for ACV / segment
3. **Compare approval rates** by threshold — if 30%+ discount deals get approved 95%+ of the time, the threshold is too low
4. **Compare win rates** by discount band — does deeper discount actually improve win rate, or does it just give up margin?
5. **Adjust thresholds** based on data + market shift
6. **Publish new matrix** with effective date; train sales

---

## Anti-patterns

- **Deal desk as bottleneck.** SLAs published but ignored; deals stack up; sales builds workarounds. Measure + enforce SLAs.
- **Deal desk that always says yes.** Approval rate > 95% means thresholds are too low — you're rubber-stamping. Tighten or raise thresholds.
- **Deal desk that always says no.** Approval rate < 40% means policy is too strict OR sales doesn't understand it. Investigate root cause.
- **No deal-desk policy.** Every deal evaluated case-by-case. Inconsistent decisions; legal exposure; reps gaming the system.
- **Concentrated authority.** One person approves everything → bottleneck + bus factor. Delegate.
- **Pricing strategy disguised as deal-desk policy.** If 80% of deals need discounting, the published price is wrong. Fix pricing.
- **Discount creep.** Each deal raises the bar for the next; eventually published price is irrelevant. Track + reset.
- **Concession with no quid pro quo.** Customer asks for 20% discount; you give 20% discount. Always trade: 20% for case study, 20% for 3yr contract, etc.
- **No expiration on quotes.** Customer can come back in 6 months and demand the same terms. Always time-box (typically 30-60 days).
- **Single-instance language never enforced.** "This is a one-time exception" → next year the customer cites it as precedent.

---

## Tooling outputs

| Script | Input | Output |
|--------|-------|--------|
| `scripts/deal_review_packet.py` | Deal spec YAML | Markdown deal-review packet with summary, financials, strategic value, risk, approver list, recommendation template |
| `scripts/discount_authority_router.py` | Deal spec YAML + approval matrix YAML | Required approver(s), routing order, escalation path, SLA-aware ordering |
| `scripts/deal_velocity_analyzer.py` | CSV of deals from CRM export | Median / p90 time-to-decision, aging dashboard, approver bottleneck identification, discount-on-discount analysis |

All scripts: stdlib only, argparse CLI, JSON or markdown output.

---

## References

- [deal-desk-charter-and-process.md](references/deal-desk-charter-and-process.md) — full charter template, intake form spec, SLA framework
- [approval-thresholds-and-routing.md](references/approval-thresholds-and-routing.md) — matrix design, regional variants, escalation paths, automation patterns
- [discount-and-concession-playbook.md](references/discount-and-concession-playbook.md) — concession types, legitimate reasons, alternatives, performance-based structures

---

## Related skills

- `business-growth/pricing-strategy` — sets the prices that deal desk enforces deviations from
- `business-growth/revenue-operations` — measures the pipeline; deal-desk metrics flow into RevOps dashboards
- `business-growth/contract-and-proposal-writer` — drafts the final contract once deal desk approves
- `business-growth/channel-economics` — channel deals have their own deal-desk patterns
- `business-growth/partnerships-architect` — partner-mediated deals route through both deal desk + partnerships
- `business-growth/commercial-policy` — the broader governance framework deal desk enforces
- `sales-success/sales-engineer` — provides technical validation in packet
- `sales-success/sales-operations` — owns CRM / forecast accuracy that deal desk feeds

---

## form-cro

Source path: `references/business-growth/form-cro/SKILL.md`

# Form CRO

Production-grade form optimization framework covering field-cost analysis, layout engineering, multi-step form architecture, validation UX patterns, mobile-specific optimization, and structured A/B test design. Applicable to lead capture, contact, demo request, application, survey, and checkout forms. For signup/registration flows, use signup-flow-cro.

---

## Table of Contents

- [Initial Assessment](#initial-assessment)
- [Field-Cost Analysis Framework](#field-cost-analysis-framework)
- [Multi-Step vs Single-Step Decision](#multi-step-vs-single-step-decision)
- [Field Design Patterns](#field-design-patterns)
- [Validation UX](#validation-ux)
- [CTA and Submit Button Optimization](#cta-and-submit-button-optimization)
- [Mobile Form Optimization](#mobile-form-optimization)
- [Trust and Context Elements](#trust-and-context-elements)
- [Form Type Playbooks](#form-type-playbooks)
- [A/B Test Framework](#ab-test-framework)
- [Metrics and Measurement](#metrics-and-measurement)
- [Output Artifacts](#output-artifacts)
- [Related Skills](#related-skills)

---

## Clarify First

Before optimizing the form, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Form type** — lead capture, contact, demo, application, or checkout (sets the optimal field count and playbook)
- [ ] **Current fields + which are used in follow-up** — reveals which fields to cut or enrich (the core of field-cost analysis)
- [ ] **Current completion rate + where users abandon** — baseline and the specific friction point to target
- [ ] **Compliance requirements** — GDPR/HIPAA fields that cannot be removed (constrains the field reduction)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the audit.

## Initial Assessment

### Required Context

| Question | Why It Matters |
|----------|---------------|
| What type of form? (lead capture, contact, demo, application, checkout) | Different types have different optimal field counts |
| How many fields currently? | Establishes baseline friction level |
| What is the current completion rate? | Benchmark for improvement |
| Where do users abandon? (if field-level analytics exist) | Identifies the specific friction point |
| Mobile vs desktop split? | Mobile forms need separate optimization |
| What happens with submitted data? | Determines which fields are truly necessary |
| Which fields are actually used in follow-up? | Often reveals 30-50% of fields are never used |
| Any compliance requirements? (GDPR, HIPAA) | Constrains what can be removed |

---

## Field-Cost Analysis Framework

Every field has a cost measured in abandonment. The question is not "what data would be nice to have" but "what data is worth the conversion loss."

### Field Cost Matrix

| Field Type | Estimated Abandonment Cost | Justification Threshold |
|-----------|---------------------------|------------------------|
| Email | Baseline (near zero for gated content) | Always justified for lead forms |
| First name | +2-3% drop | Justified if personalization drives follow-up |
| Last name | +2-3% drop | Rarely justified for first touch |
| Phone number | +5-10% drop | Only if sales will call within 24 hours |
| Company name | +3-5% drop | Justified for B2B qualification |
| Company size | +3-5% drop | Justified only if routing decisions depend on it |
| Job title | +3-5% drop | Can often be enriched post-submission |
| Industry | +2-3% drop | Can often be enriched post-submission |
| Message/textarea | +5-8% drop | Justified for contact forms, not for lead capture |
| Budget | +8-12% drop | Only justified for high-intent demo/sales forms |
| Custom question | +3-5% per question | Must directly affect lead routing or qualification |

### The Enrichment Test

Before including any field, ask: **Can this be enriched after submission?**

| Field | Enrichable? | Method | Keep in Form? |
|-------|------------|--------|---------------|
| Company name | Yes (from email domain) | Clearbit, Apollo, manual lookup | Remove |
| Company size | Yes (from company name) | Enrichment API | Remove |
| Industry | Yes (from company name) | Enrichment API | Remove |
| Job title | Partially (from LinkedIn) | Manual enrichment | Remove unless critical for routing |
| Phone number | No | Must be provided | Keep only if sales calls immediately |
| Budget | No | Must be stated | Keep only for high-intent forms |

### Recommended Field Sets by Form Type

| Form Type | Minimum Fields | Optimal Fields | Maximum Fields |
|-----------|---------------|----------------|----------------|
| Newsletter signup | Email | Email | Email + First name |
| Content download | Email | Email + First name | Email + Name + Company |
| Contact form | Email + Message | Email + Name + Message | Email + Name + Subject + Message |
| Demo request | Email + Company | Email + Name + Company + Role | + Phone + Use case + Team size |
| Application form | Varies by requirement | -- | All required fields (justified individually) |

---

## Multi-Step vs Single-Step Decision

### Decision Criteria

| Factor | Single-Step | Multi-Step |
|--------|------------|------------|
| Total fields | < 5 fields | > 5 fields |
| Field complexity | Simple text inputs | Mix of dropdowns, checkboxes, conditional fields |
| User motivation | Low-commitment (newsletter, content) | High-commitment (demo, application) |
| Qualification need | No routing needed | Different paths based on answers |
| Mobile proportion | < 30% mobile | > 50% mobile |

### Multi-Step Best Practices

**Step structure:**
- Step 1: Easiest fields (email, name) -- lowest friction to start
- Step 2: Qualifying information (company, role, use case)
- Step 3: Specific details (budget, timeline, message)

**Progress indication:**
- Show progress bar with step count ("Step 2 of 3")
- Show completion percentage
- Label each step with what it covers ("Your Details", "Company Info", "Project Details")

**Psychological commitment:**
- Once a user completes Step 1, they are 40-60% more likely to complete the form (sunk cost effect)
- Capture the email in Step 1 so you can follow up even if they abandon later

**Back navigation:**
- Always allow users to go back to previous steps
- Preserve entered data when navigating between steps
- Never reset the form on back navigation

---

## Field Design Patterns

### Field Labels

| Pattern | When to Use | Example |
|---------|-------------|---------|
| Above-field labels | Default for most forms | Label sits above the input |
| Inline labels (floating) | Space-constrained layouts | Label moves from inside to above on focus |
| Left-aligned labels | Wide desktop forms | Label to the left of field |
| Placeholder-only labels | Never | Disappears on input, accessibility failure |

### Field Types

| Data Needed | Best Input Type | Avoid |
|------------|-----------------|-------|
| Email | `type="email"` with validation | Plain text input |
| Phone | `type="tel"` with format mask | Plain text input |
| Country | Searchable dropdown | Long static dropdown |
| Company size | Button group (1-10, 11-50, 51-200, 200+) | Free text input |
| Interest/topic | Checkbox group (max 6 options) | Multi-select dropdown |
| Message | Textarea (3-4 rows visible) | Single-line text input |
| Date | Native date picker | Three separate dropdowns |

### Conditional Fields

Show additional fields based on earlier answers. This reduces visible complexity while capturing necessary data.

**Example:** "What is your primary goal?" dropdown shows "Budget range" only if they select "Ready to buy" or "Evaluating solutions."

**Rules:**
- Conditional fields appear with smooth animation (not instant jump)
- Only 1-2 conditional fields per trigger
- Conditional fields are never required (the trigger answer may change)

---

## Validation UX

### Real-Time vs Submit-Time Validation

| Validation Type | When to Use |
|----------------|-------------|
| Real-time (on blur) | Email format, phone format, required fields |
| On submit | Complex validation, server-side checks |
| Inline suggestions | Company name auto-complete, address lookup |

### Error Message Design

| Pattern | Good | Bad |
|---------|------|-----|
| Position | Below the field, in context | Top of form, disconnected |
| Tone | "Please enter a valid email address" | "Error: Invalid input" |
| Specificity | "Phone must include area code" | "Invalid phone number" |
| Color | Red text + red border on field | Red banner at top of page |
| Icon | Error icon next to message | No visual indicator |

### Success Indicators

- Green checkmark on valid fields (especially email and phone)
- Positive microcopy: "Looks good!" on valid email
- Do NOT flash green/red on every keystroke -- validate on blur (when user leaves the field)

---

## CTA and Submit Button Optimization

### Button Copy Framework

| Form Type | Weak Copy | Strong Copy | Strongest Copy |
|-----------|-----------|-------------|----------------|
| Content download | Submit | Download Guide | Get My Free Guide |
| Demo request | Submit | Request Demo | Schedule My Demo |
| Contact form | Send | Send Message | Get in Touch |
| Newsletter | Subscribe | Join Newsletter | Get Weekly Tips |
| Free trial | Sign Up | Start Free Trial | Start Building Free |

**Rules:**
- Use first person ("Get My..." not "Get Your...")
- Specify what they get, not what they do
- Include "Free" when applicable
- Keep under 5 words

### Button Design

| Element | Best Practice |
|---------|---------------|
| Color | High contrast against form background, consistent with brand CTA color |
| Size | Full-width on mobile, min 44px height for touch targets |
| Position | Immediately below last field, no gap |
| Loading state | Show spinner + "Sending..." to prevent double-submit |
| Disabled state | Disabled until required fields are valid (with clear visual distinction) |

---

## Mobile Form Optimization

### Mobile-Specific Rules

| Rule | Implementation |
|------|---------------|
| Touch targets | Minimum 44x44px for all interactive elements |
| Keyboard types | `type="email"` for email, `type="tel"` for phone, `type="number"` for numeric |
| Auto-focus | Focus first field on page load (with keyboard open) |
| Sticky submit | Pin submit button to bottom of viewport on long forms |
| Input spacing | Minimum 8px between fields to prevent mis-taps |
| Dropdown alternatives | Use button groups or radio buttons instead of dropdowns on mobile |
| Auto-fill | Support browser auto-fill for standard fields (name, email, phone, address) |

### Mobile vs Desktop Form Differences

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| Layout | 1 or 2 columns | Always 1 column |
| Field count | Up to 8 | Max 5 per step |
| Dropdown | Standard dropdown | Bottom sheet or full-screen picker |
| Help text | Hover tooltips | Always-visible inline text |
| Validation | On blur | On blur + on submit summary |

---

## Trust and Context Elements

### Trust Signals Near Forms

| Signal | Placement | Impact |
|--------|-----------|--------|
| Privacy assurance | Below submit button | "We'll never share your email" |
| Security badges | Next to form container | SSL, SOC2, GDPR compliance |
| Testimonial | Adjacent to form | Social proof reduces hesitation |
| Response time | Below submit button | "We respond within 2 hours" |
| Subscriber/user count | Above or within form | "Join 10,000+ subscribers" |

### Context Reinforcement

| Element | Purpose | Example |
|---------|---------|---------|
| Form header | Remind what they get | "Get your free SEO audit report" |
| Bullet list above form | Reinforce value | "You'll get: Full site analysis, Priority fix list, 30-min review call" |
| Expected next step | Set expectations | "After submitting, we'll email your report within 24 hours" |

---

## Form Type Playbooks

### Lead Capture (Gated Content)

**Goal:** Maximize completions while capturing qualified leads.
- Fields: Email only (or Email + First name maximum)
- CTA: Value-specific ("Get My Report", "Download Checklist")
- Trust: "No spam, unsubscribe anytime"
- Post-submit: Immediate download + thank you page + follow-up email

### Demo Request

**Goal:** Capture qualified prospects ready for sales conversation.
- Fields: Email + Name + Company (+ Phone and Team size optional)
- CTA: "Schedule My Demo"
- Trust: "30-minute call, no commitment"
- Post-submit: Calendar booking page or confirmation with scheduling link
- Consider: Embedded calendar (Calendly/Cal.com) instead of form

### Contact Form

**Goal:** Enable communication while routing to correct team.
- Fields: Email + Name + Subject dropdown + Message
- CTA: "Send Message"
- Trust: "We respond within [X] hours"
- Post-submit: Confirmation with expected response time
- Consider: Adding department/topic routing dropdown

### Quote Request

**Goal:** Capture enough detail for accurate quoting.
- Fields: Multi-step form with project details
- CTA: "Get My Quote"
- Trust: "Free quote, no obligation"
- Post-submit: Quote delivery timeline + human follow-up

---

## A/B Test Framework

### High-Impact Tests (Run First)

| Test | Hypothesis | Success Metric |
|------|-----------|----------------|
| Remove phone field | Removing phone increases completion by 5-10% | Completion rate |
| Single-step to multi-step | Multi-step increases completion for 6+ field forms | Completion rate + submission quality |
| CTA copy change | Value-specific copy increases clicks by 10-20% | Click-through rate |
| Add social proof | Testimonial near form increases trust | Completion rate |

### Medium-Impact Tests

| Test | Hypothesis | Success Metric |
|------|-----------|----------------|
| Field order change | Easiest fields first increases step-1 completion | Step completion rates |
| Inline validation | Real-time feedback reduces form errors | Error rate + completion rate |
| Add progress bar | Visual progress on multi-step increases completion | Completion rate |
| Embedded calendar vs form | Calendar reduces friction for demo requests | Booking rate |

### Measurement Rules

- Run each test for minimum 2 weeks or 200 conversions per variant (whichever is longer)
- Track both quantity (completion rate) and quality (lead score, SQL rate)
- A test that increases completions but decreases lead quality is not a win

---

## Metrics and Measurement

### Key Metrics

| Metric | Formula | Benchmark |
|--------|---------|-----------|
| Form completion rate | Submissions / Form views | 20-40% for lead forms, 5-15% for long forms |
| Field-level drop-off | Abandonment per field | Identify the highest-drop field |
| Time to complete | Avg seconds from first interaction to submit | < 60s for simple forms, < 3min for complex |
| Error rate | Users who see error / total users | < 10% |
| Mobile completion rate | Mobile submissions / Mobile form views | Should be within 20% of desktop rate |

### Instrumentation Requirements

Track these events in your analytics:
- Form view (impression)
- Form interaction (first field focus)
- Per-field completion (on blur, per field)
- Form submission attempt
- Form submission success
- Form validation error (per field)

---

## Output Artifacts

| Artifact | Format | Description |
|----------|--------|-------------|
| Form Audit Report | Issue/Impact/Fix/Priority table | Per-field analysis with estimated abandonment cost |
| Recommended Field Set | Justified list | Required vs optional vs enrichable fields with rationale |
| Field Layout Specification | Annotated outline | Order, grouping, label style, validation rules, mobile adaptations |
| CTA Copy Options | 3-option table | Button text variants with reasoning and expected impact |
| A/B Test Plan | Prioritized table | Top 5 tests with hypothesis, variant, metric, and priority |
| Mobile Optimization Checklist | Checkbox list | Mobile-specific fixes with implementation notes |

---

## Related Skills

- **signup-flow-cro** -- Use when the form is an account creation or trial registration flow. Form-cro is for lead capture, contact, and demo forms.
- **popup-cro** -- Use when the form lives inside a modal or popup. Form-cro handles the form itself; popup-cro handles the trigger, timing, and container.
- **page-cro** -- Use when the page surrounding the form needs optimization (headline, value prop, layout).
- **onboarding-cro** -- Use when post-form-submission activation is the bottleneck, not the form itself.

---

## Tool Reference

### 1. form_scorer.py

**Purpose:** Score a form against CRO best practices across field count, field types, CTA quality, mobile readiness, and trust signals.

```bash
python scripts/form_scorer.py form_config.json
python scripts/form_scorer.py form_config.json --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `form_config.json` | Yes | JSON file with form fields, CTA, and context metadata |
| `--json` | No | Output results as JSON |

### 2. field_cost_analyzer.py

**Purpose:** Calculate the estimated abandonment cost of each form field and recommend fields to remove, keep, or make enrichable.

```bash
python scripts/field_cost_analyzer.py form_fields.json
python scripts/field_cost_analyzer.py form_fields.json --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `form_fields.json` | Yes | JSON file with form fields and their types |
| `--json` | No | Output results as JSON |
| `--monthly-visitors` | No | Monthly form visitors for dollar impact estimate (default: 1000) |
| `--current-rate` | No | Current form completion rate as percentage (default: 25) |
| `--value-per-lead` | No | Dollar value per lead for ROI calculation (default: 50) |

### 3. ab_test_calculator.py

**Purpose:** Calculate A/B test sample size, duration, and statistical significance for form optimization experiments.

```bash
python scripts/ab_test_calculator.py --baseline 25 --lift 10 --traffic 500
python scripts/ab_test_calculator.py --baseline 25 --lift 10 --traffic 500 --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `--baseline` | Yes | Current conversion rate as percentage (e.g., 25 for 25%) |
| `--lift` | Yes | Minimum detectable lift as percentage (e.g., 10 for 10% relative lift) |
| `--traffic` | Yes | Daily traffic (visitors per day to the form) |
| `--confidence` | No | Confidence level as percentage (default: 95) |
| `--json` | No | Output results as JSON |

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| Form completion rate below 15% | Too many fields or high-friction fields present | Run field_cost_analyzer.py to identify and remove high-cost fields; target email-only for first-touch lead forms |
| Mobile completion rate 50%+ lower than desktop | Form not optimized for touch input | Ensure 44px touch targets, single-column layout, native keyboard types; replace dropdowns with button groups on mobile |
| Users start but do not finish the form | Friction in middle fields (phone, budget, message) | Move high-friction fields to later steps in a multi-step form; capture email in step 1 |
| High error rate on email or phone fields | Validation too aggressive or unclear error messages | Validate on blur (not keystroke); use specific error copy ("Please include @ in email") not generic ("Invalid input") |
| A/B test results are inconclusive after 4 weeks | Insufficient sample size or too small a lift target | Use ab_test_calculator.py to confirm required sample size; consider testing bigger changes (field removal vs copy tweak) |
| CTA clicks are low despite good page traffic | CTA copy is generic or button is not prominent enough | Replace "Submit" with value-specific copy ("Get My Report"); ensure CTA is full-width on mobile, high-contrast color |

---

## Success Criteria

- Form completion rate above 25% for lead capture forms (above 35% is excellent)
- Mobile completion rate within 20% of desktop rate
- Error rate below 10% of form interactions
- Field-level drop-off identifies specific friction points with clear remediation
- Each form field has documented justification (business need or enrichable post-submission)
- A/B tests run for minimum 200 conversions per variant before declaring winner
- Post-form-submission follow-up occurs within 24 hours for demo and contact forms

---

## Scope & Limitations

- **In scope:** Form field optimization, CTA copy, validation UX, mobile optimization, trust signal placement, A/B test design, field cost analysis
- **Out of scope:** Page-level CRO (use page-cro), popup trigger optimization (use popup-cro), signup/registration flows (use signup-flow-cro), post-submission nurture sequences
- **Data dependency:** Field-level analytics (per-field drop-off) provide the most actionable data but require analytics instrumentation
- **Compliance constraint:** GDPR/HIPAA may require specific fields that cannot be removed; document compliance requirements before optimizing
- **Statistical validity:** A/B test recommendations require sufficient traffic volume; low-traffic forms may need longer test durations or alternative evaluation methods

---

## Integration Points

- **page-cro** -- When the form converts well but the surrounding page does not drive form interactions, optimize the page-level elements first
- **popup-cro** -- When the form is inside a popup or modal, trigger timing and container design are handled by popup-cro
- **signup-flow-cro** -- For account creation and registration forms (not lead capture), use signup-flow-cro which handles multi-step auth flows
- **onboarding-cro** -- When post-form-submission activation is the bottleneck, not the form completion rate itself
- **free-tool-strategy** -- Free tools often include lead capture forms; use form-cro to optimize the capture form within the tool

---

## free-tool-strategy

Source path: `references/business-growth/free-tool-strategy/SKILL.md`

# Free Tool Strategy

Production-grade framework for building free tools that generate traffic, leads, and backlinks. Covers idea evaluation with a 6-factor scoring system, tool design patterns, lead capture architecture, SEO landing page strategy, launch playbook, and ROI measurement. Applicable to calculators, generators, checkers, graders, converters, templates, and interactive visualizations.

---

## Table of Contents

- [When to Build vs When Not To](#when-to-build-vs-when-not-to)
- [Tool Type Selection](#tool-type-selection)
- [6-Factor Evaluation Framework](#6-factor-evaluation-framework)
- [Tool Design Principles](#tool-design-principles)
- [Lead Capture Architecture](#lead-capture-architecture)
- [SEO Landing Page Strategy](#seo-landing-page-strategy)
- [Launch Playbook](#launch-playbook)
- [Distribution Channels](#distribution-channels)
- [Measurement Framework](#measurement-framework)
- [Maintenance and Iteration](#maintenance-and-iteration)
- [Output Artifacts](#output-artifacts)
- [Related Skills](#related-skills)

---

## When to Build vs When Not To

**Build a free tool when:**
- Search volume exists for "[topic] calculator/generator/checker" (> 500/month)
- No excellent free alternative exists (or you can be 10x better)
- The tool naturally connects to your paid product
- You have engineering resources to build AND maintain it
- The tool produces shareable, bookmark-worthy output

**Do NOT build when:**
- A well-established free tool already exists and is sufficient
- The tool would be a thin wrapper with no unique value
- You cannot maintain it post-launch
- The tool requires data you do not have or cannot access
- Total addressable search volume is < 200/month

---

## Clarify First

Before designing the free tool, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Tool concept + type** — calculator, generator, checker, grader, converter, template, or visualization (drives build complexity and lead-capture fit)
- [ ] **Target keyword + search volume** — the "free [tool]" search demand (a core factor in the 6-factor go/no-go score)
- [ ] **Primary goal** — leads, SEO traffic, backlinks, or brand (selects the tool type and gate strategy)
- [ ] **Connection to your paid product** — without it, leads won't convert (determines whether to build at all)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the plan.

## Tool Type Selection

| Tool Type | What It Does | Build Complexity | Lead Capture Fit | SEO Value | Example |
|-----------|-------------|-----------------|-----------------|-----------|---------|
| Calculator | Takes inputs, outputs a number/range | Low-Medium | High (email the full report) | High | ROI calculator, LTV calculator, salary calculator |
| Generator | Creates text, ideas, or structured content | Low (template) to High (AI) | Medium (save/download results) | High | Headline generator, name generator, bio writer |
| Checker/Auditor | Analyzes a URL, text, or file and scores it | Medium-High | Very high (full report via email) | Very high | SEO audit, readability checker, accessibility checker |
| Grader | Scores something against a rubric | Medium | High (detailed scorecard) | High | Website grader, email subject line grader |
| Converter | Transforms input from one format to another | Low-Medium | Low (utility, quick use) | Medium | Unit converter, file converter, timezone converter |
| Template Library | Pre-built fillable documents | Very low | Medium (download gated) | High | Contract templates, brief templates, spreadsheet templates |
| Interactive Visualization | Shows data or concepts visually | High | Medium | Very high (link magnet) | Market maps, comparison charts, trend visualizers |

### Selection Decision Tree

```
What do you want to generate?
├── Leads (email capture) → Checker/Auditor or Calculator (report gating)
├── SEO traffic → Calculator or Checker (high search volume keywords)
├── Backlinks → Interactive Visualization or Template Library (link magnet)
├── Brand awareness → Generator (shareable output, social virality)
└── All of the above → Checker/Auditor (highest combined value)
```

---

## 6-Factor Evaluation Framework

Score each tool idea 1-5 on each factor. Maximum score: 30.

| Factor | What to Check | 1 (Weak) | 3 (Moderate) | 5 (Strong) |
|--------|--------------|----------|-------------|-----------|
| Search Volume | Monthly searches for "free [tool]" | < 100/mo | 500-2,000/mo | > 5,000/mo |
| Competition | Quality of existing free tools | Excellent tools exist | Decent tools, room to improve | No good free alternatives |
| Build Effort | Engineering time required | Months of work | 1-2 weeks | Days |
| Lead Capture Potential | Natural email gate opportunity | Forced gate kills UX | Reasonable gate | Natural fit (report, saved results) |
| SEO Value | Topical authority and backlink potential | Thin, one-page utility | Moderate content depth | Deep use case, link magnet |
| Viral Potential | Will users share results or embed? | Nobody would share | Some sharing potential | Results are inherently shareable |

### Scoring Thresholds

| Score | Decision |
|-------|----------|
| 25-30 | Build immediately -- strong across all factors |
| 20-24 | Strong candidate -- validate search volume before committing |
| 15-19 | Conditional -- only if resources are available and strategic fit is strong |
| < 15 | Do not build -- rethink the concept or find a different angle |

---

## Tool Design Principles

### Value Before Gate

**The cardinal rule:** Give the core value first. Gate the upgrade.

| Good | Bad |
|------|-----|
| Show the score immediately, offer to email the full report | "Enter your email to see your results" |
| Display the generated content, gate the save/export | Block all output behind email wall |
| Free basic analysis, premium detailed breakdown | Nothing visible without signup |

### Minimal Friction Input

- Maximum 3 inputs to get initial results
- No account required for core value
- Progressive disclosure: simple first, detailed on request
- Smart defaults where possible (auto-detect, pre-fill)

### Shareable Output

Design results so users want to share them:

| Mechanism | Implementation |
|-----------|---------------|
| Unique results URL | Each run gets a shareable permalink |
| Social share buttons | "Tweet your score" with pre-filled text |
| Downloadable report | PDF or CSV export |
| Embeddable badge/widget | "Scored 92/100 by [Your Tool]" badge |
| Visual score card | Social-media-ready image with result |

### Mobile-First Design

- All inputs work on touch screens
- Results render cleanly on mobile
- Share buttons trigger native share sheet
- No hover-dependent UI elements

---

## Lead Capture Architecture

### When to Gate

| Gate Decision | Criteria |
|--------------|---------|
| Gate with email | Results are complex (report format), ongoing value (re-run monthly), personalized output |
| Do NOT gate | Core result is a single number, competition offers the same ungated, primary goal is SEO/backlinks |

### Progressive Capture

Do not ask for everything at once. Build the profile over multiple interactions.

| Interaction | What to Capture | How |
|------------|----------------|-----|
| First use | Email (to save or email results) | Inline form after results display |
| Return use | Name + Role | Contextual prompt, not a blocking form |
| Repeated use | Company + Team size | If they request team features or saved history |

### Capture Form Design

- Email-only first gate (single field + submit button)
- Position the form AFTER results are shown (not before)
- Explain the value: "Email me a detailed breakdown" not "Sign up"
- Privacy text: "We'll send your report. No spam."
- Never require account creation for the free tool

---

## SEO Landing Page Strategy

### Page Structure

```
H1: Free [Tool Name] -- [What It Does in One Phrase]
Subhead: [Who it is for] + [what problem it solves]

[THE TOOL -- above the fold, interactive]

H2: How [Tool Name] Works
  (3-4 steps with screenshots)

H2: Why [Audience] Use [Tool Name]
  (Benefits, use cases, 3-5 paragraphs)

H2: [Related Question 1] (FAQ-style, keyword-targeted)
H2: [Related Question 2]
H2: [Related Question 3]

H2: Frequently Asked Questions
  (5-7 FAQs with FAQPage schema)
```

### SEO Requirements

- Target keyword in: H1, URL slug, meta title, first 100 words, 2+ subheadings
- Meta title: "Free [Tool Name]: [Action Verb] Your [Outcome] | [Brand]"
- Meta description: Include the keyword + what the tool does + "Free, no signup required"
- URL: `/tools/[tool-name]` or `/free-[tool-name]`

### Schema Markup

Add `SoftwareApplication` schema:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Free [Tool Name]",
  "applicationCategory": "BusinessApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "[What the tool does]",
  "operatingSystem": "Web"
}
```

Also add FAQPage schema for the FAQ section.

---

## Launch Playbook

### Pre-Launch (1-2 Weeks Before)

- [ ] SEO landing page published and indexed
- [ ] Schema markup validated
- [ ] Outreach target list built (who links to similar tools?)
- [ ] Product Hunt draft prepared (if applicable)
- [ ] Social media teaser content created
- [ ] Email announcement drafted for existing audience

### Launch Week

| Day | Channel | Action |
|-----|---------|--------|
| Day 1 | Email list | Announcement to existing subscribers |
| Day 1 | Social media | Launch post on Twitter/X, LinkedIn |
| Day 1 | Product Hunt | Submit (if applicable, aim for Tuesday-Thursday) |
| Day 2 | Community | Share in relevant Slack groups, Discord, Reddit |
| Day 3 | Outreach | Email bloggers, newsletter editors who cover tools |
| Day 5 | Content | Publish blog post about the tool with use cases |
| Day 7 | Social media | Results round-up, engagement post |

### Post-Launch (Weeks 2-8)

- [ ] Monitor search rankings for target keywords
- [ ] Track backlinks with GSC or Ahrefs
- [ ] Reach out to "best [category] tools" listicle authors
- [ ] Submit to tool directories (Free Tools, AlternativeTo, etc.)
- [ ] Iterate based on usage data (most-used features, drop-off points)

---

## Distribution Channels

### Organic Channels

| Channel | Approach | Expected Impact |
|---------|----------|----------------|
| SEO | Target "[type] calculator/checker" keywords | Long-term, compounding traffic |
| Product Hunt | Launch listing | Spike traffic + backlinks |
| Hacker News | "Show HN" post if technically interesting | Spike traffic + developer backlinks |
| Reddit | Share in relevant subreddits (genuinely helpful, not spammy) | Moderate traffic + community feedback |
| Twitter/X | Launch thread with tool demo | Engagement + social proof |
| LinkedIn | Professional use case post | B2B lead generation |
| Industry newsletters | Pitch to curators | Targeted audience + backlinks |

### Link Acquisition

| Source | Approach |
|--------|---------|
| "Best [category] tools" listicles | Find existing lists, pitch for inclusion |
| Resource pages | Find industry resource compilations, suggest your tool |
| Blog posts mentioning the problem your tool solves | Reach out with "we built a free tool for this" |
| Comparison sites | Submit to tool comparison platforms |
| Educational content | Pitch to courses, tutorials, guides that cover related topics |

---

## Measurement Framework

### Key Metrics

| Metric | What It Tells You | Target (90 days) |
|--------|------------------|-----------------|
| Tool usage (sessions) | Is anyone using it? | 500+ sessions/month |
| Completion rate | Do users finish using it? | > 60% |
| Lead conversion rate | Is it generating leads? | 5-15% of completions |
| Organic traffic | Is it ranking? | 500+ sessions/month from organic |
| Referring domains | Is it earning backlinks? | 10+ organic backlinks |
| Email to pipeline rate | Is it generating qualified leads? | Track in CRM |
| Bounce rate | Is the tool engaging? | < 50% |

### ROI Calculation

```
Monthly Cost = Engineering hours x Hourly rate + Hosting cost
Monthly Value = (Leads x Lead-to-Customer Rate x ACV) + (Backlink value estimate)

Break-even month = Total build cost / Monthly value
Target: Break-even within 6 months
```

---

## Maintenance and Iteration

### Ongoing Maintenance Requirements

| Task | Frequency | Why |
|------|-----------|-----|
| Check for broken APIs/data sources | Monthly | External dependencies change |
| Update calculations/logic if standards change | As needed | Accuracy maintains trust |
| Review and fix UX issues from user feedback | Quarterly | Continuous improvement |
| Update SEO landing page content | Semi-annually | Content freshness |
| Check analytics for usage trends | Monthly | Identify optimization opportunities |

### Iteration Based on Data

| Signal | Action |
|--------|--------|
| High usage, low lead capture | Improve gate positioning or offer |
| Low usage, high search ranking | Improve tool UX and value |
| High leads, low quality | Add qualifying questions to capture form |
| High bounce rate | Improve above-fold messaging and tool visibility |
| Low search ranking | Improve page content depth and backlink acquisition |

---

## Output Artifacts

| Artifact | Format | Description |
|----------|--------|-------------|
| Tool Idea Evaluation | Scored comparison matrix | 6-factor evaluation of candidate ideas |
| Tool UX Specification | Inputs/outputs/flow design | Inputs, outputs, lead capture flow, share mechanics |
| Landing Page Copy | Full page content | H1, subhead, how it works, FAQ, meta tags |
| Launch Plan | Phased checklist | Pre-launch, launch week, post-launch with channel-specific actions |
| Measurement Dashboard | Metric table | KPIs with targets at 30/60/90 days |
| ROI Model | Revenue calculation | Break-even analysis based on traffic and conversion assumptions |
| Maintenance Schedule | Task calendar | Ongoing tasks with frequency and ownership |

---

## Related Skills

- **seo-audit** -- Use for auditing existing pages and keyword opportunities. Not for tool-based content assets.
- **schema-markup** -- Use for implementing SoftwareApplication and FAQPage schema on the tool landing page.
- **form-cro** -- Use for optimizing the lead capture form within the tool.
- **page-cro** -- Use for optimizing the landing page conversion rate.
- **content-creator** -- Use for writing the blog post and social content supporting the tool launch.

---

## Tool Reference

### 1. tool_idea_scorer.py

**Purpose:** Score free tool ideas against the 6-factor evaluation framework and rank candidates.

```bash
python scripts/tool_idea_scorer.py tool_ideas.json
python scripts/tool_idea_scorer.py tool_ideas.json --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `tool_ideas.json` | Yes | JSON file with tool idea names and 6-factor scores |
| `--json` | No | Output results as JSON |

### 2. tool_roi_calculator.py

**Purpose:** Calculate the ROI and break-even timeline for a free tool based on traffic, conversion, and cost assumptions.

```bash
python scripts/tool_roi_calculator.py --build-cost 5000 --monthly-traffic 2000 --conversion-rate 8 --lead-value 50
python scripts/tool_roi_calculator.py --build-cost 5000 --monthly-traffic 2000 --conversion-rate 8 --lead-value 50 --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `--build-cost` | Yes | Total build cost in dollars (engineering time + design) |
| `--monthly-traffic` | Yes | Expected monthly sessions after 90 days |
| `--conversion-rate` | Yes | Expected lead conversion rate as percentage |
| `--lead-value` | Yes | Dollar value per captured lead |
| `--monthly-hosting` | No | Monthly hosting/maintenance cost (default: 50) |
| `--json` | No | Output results as JSON |

### 3. launch_checklist_generator.py

**Purpose:** Generate a phased launch checklist (pre-launch, launch week, post-launch) customized to the tool type and distribution channels.

```bash
python scripts/launch_checklist_generator.py --tool-type calculator --channels seo,producthunt,social
python scripts/launch_checklist_generator.py --tool-type checker --channels seo,email --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `--tool-type` | Yes | Tool type: calculator, generator, checker, grader, converter, template, visualization |
| `--channels` | No | Comma-separated launch channels (default: seo,social,email) |
| `--json` | No | Output results as JSON |

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| High traffic to tool but low lead capture | Gate is too aggressive or positioned before value delivery | Show core results first, then gate the detailed report or export; use email-only capture form |
| Tool built but no organic traffic after 3 months | SEO landing page is thin or keywords are too competitive | Add 1500+ words of supporting content (how it works, use cases, FAQ); target long-tail keywords |
| Tool is used once but users do not return | No recurring value or no save/bookmark mechanism | Add saved results, email reports, or periodic re-run reminders; consider a "monitor" mode |
| Build cost exceeded estimate | Scope creep during development | Use tool_roi_calculator.py upfront to set budget ceiling; define MVP scope and ship in 2 weeks max |
| Product Hunt launch got minimal traction | Poor timing or weak positioning | Launch Tuesday-Thursday; lead with the user benefit, not the technology; get 5+ early upvotes from network |
| Tool generates leads but low conversion to paid | Tool attracts wrong audience or no connection to paid product | Ensure the tool solves a problem your paid product also addresses; add contextual upgrade prompts |

---

## Success Criteria

- Tool scores 20+ on the 6-factor evaluation framework before committing to build
- Tool achieves 500+ monthly sessions within 90 days of launch
- Lead conversion rate of 5-15% of tool completions
- Tool earns 10+ organic backlinks within 6 months
- Break-even achieved within 6 months (verified by tool_roi_calculator.py)
- Completion rate above 60% (users who start using the tool finish the workflow)
- At least 1 supporting blog post and social launch content published at launch

---

## Scope & Limitations

- **In scope:** Tool idea evaluation, ROI modeling, launch planning, distribution strategy, lead capture architecture, SEO landing page strategy, measurement framework
- **Out of scope:** Engineering implementation, design/UI work, paid advertising strategy, AI/ML-powered tool features
- **Build constraint:** All tools should be buildable in 1-4 weeks; if longer, the scope is too large for a free marketing tool
- **Maintenance cost:** Every tool requires ongoing maintenance (monthly checks, quarterly content updates); budget for this before building
- **No API dependencies:** Free tools should use client-side logic where possible to avoid ongoing API costs and reliability issues

---

## Integration Points

- **form-cro** -- Use for optimizing the lead capture form embedded within the free tool
- **page-cro** -- Use for optimizing the SEO landing page that hosts the tool for conversion
- **seo-audit** -- Use for validating the tool landing page meets technical SEO requirements
- **content-creator** -- Use for writing the launch blog post, social content, and outreach emails
- **schema-markup** -- Use for implementing SoftwareApplication and FAQPage schema on the tool page

---

## onboarding-cro

Source path: `references/business-growth/onboarding-cro/SKILL.md`

# Onboarding CRO

Production-grade user onboarding optimization framework covering activation definition, time-to-value engineering, flow architecture, empty state design, multi-channel coordination, stalled user recovery, and experiment design. Focused on the critical window between signup and habitual product usage.

---

## Table of Contents

- [Initial Assessment](#initial-assessment)
- [Activation Definition Framework](#activation-definition-framework)
- [Onboarding Flow Architecture](#onboarding-flow-architecture)
- [Time-to-Value Engineering](#time-to-value-engineering)
- [Empty State Design](#empty-state-design)
- [Onboarding Patterns by Product Type](#onboarding-patterns-by-product-type)
- [Multi-Channel Coordination](#multi-channel-coordination)
- [Stalled User Recovery](#stalled-user-recovery)
- [Onboarding Checklist Design](#onboarding-checklist-design)
- [Tooltip and Tour Design](#tooltip-and-tour-design)
- [Metrics and Measurement](#metrics-and-measurement)
- [Experiment Framework](#experiment-framework)
- [Output Artifacts](#output-artifacts)
- [Related Skills](#related-skills)

---

## Clarify First

Before designing the onboarding, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Product type** — B2B SaaS, B2C app, marketplace, or content platform (selects the onboarding pattern)
- [ ] **Activation event (aha moment)** — the action correlated with 30-day retention (defines what the whole flow drives toward)
- [ ] **Current activation rate + where users drop off** — baseline and the biggest funnel bottleneck to fix
- [ ] **Day-1/7/30 retention** — sets urgency and whether the problem is onboarding vs product-market fit

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the deliverable.

## Initial Assessment

### Required Context

| Question | Why It Matters |
|----------|---------------|
| What is the product type? (B2B SaaS, B2C app, marketplace, content platform) | Determines the onboarding pattern |
| What is the core value proposition? | Defines what the aha moment should demonstrate |
| What happens immediately after signup? | Identifies the current first-run experience |
| What action correlates most with 30-day retention? | Defines the activation event |
| Where do users drop off? (funnel data if available) | Pinpoints the biggest bottleneck |
| What is the current activation rate? | Baseline for improvement |
| What is Day-1 / Day-7 / Day-30 retention? | Context for urgency |

---

## Activation Definition Framework

### Finding the Aha Moment

The aha moment is the specific action that, once completed, makes a user significantly more likely to retain. It is NOT a feature -- it is the moment the user experiences the core value.

**Method to identify it:**

1. **Cohort comparison:** Compare 90-day retained users vs churned users. What actions did retained users do in the first 7 days that churned users did not?
2. **Correlation analysis:** For each candidate action, calculate the correlation between completing that action in week 1 and being retained at day 30.
3. **Timing analysis:** When do retained users complete this action? (Day 1? Day 3? Day 7?)

### Activation Event Examples

| Product Type | Activation Event | Why This Works |
|-------------|-----------------|----------------|
| Project management | Create project + invite 1 team member | Collaboration creates switching costs |
| Analytics tool | Install tracking + view first report | Seeing their own data is the value |
| Design tool | Create first design + export or share | Output = value realized |
| CRM | Import contacts + log first activity | Data investment creates lock-in |
| Marketplace | Complete first transaction | Transaction = value delivered |
| Content platform | Follow 3+ sources + consume 5+ items | Personalization drives habit |
| Communication tool | Send first message + get a reply | Two-sided value activation |

### Activation Metric Structure

```
Activation Rate = Users who reach activation event / Total signups
                  (within first N days)

Target: 40-60% activation within 7 days for B2C
        25-40% activation within 14 days for B2B
```

---

## Onboarding Flow Architecture

### Flow Type Selection

| Approach | Best For | Risk | Mitigation |
|----------|----------|------|------------|
| Product-first (drop into product) | Simple products, B2C, mobile apps | Blank slate overwhelm | Pre-populated sample data |
| Guided setup (wizard) | Products needing configuration | Adds friction before value | Keep to 3-5 steps max |
| Value-first (show results immediately) | Products with demo data | May not feel personalized | Use their data if possible |
| Template-first | Creative/productivity tools | Choice paralysis | Curate 3-5 starter templates |
| Video walkthrough | Complex B2B products | Users skip videos | Keep under 90 seconds |

### The First 30-Second Rule

Whatever flow type you choose, within 30 seconds of landing in the product, the user must:

1. See a clear single next action (not 5 options)
2. Understand what the product will do for them
3. Have a visible path forward (no dead ends)

### Flow Design Principles

| Principle | Implementation |
|-----------|---------------|
| One goal per session | First session focuses ONLY on reaching the aha moment |
| Do, don't show | User performs the action, not watches a tutorial about it |
| Progress creates motivation | Show advancement (checklist, progress bar, celebration) |
| Defer complexity | Advanced settings and features surface AFTER activation |
| Always escapable | Users can skip or dismiss any onboarding element |
| Remember state | If user leaves and returns, resume where they left off |

---

## Time-to-Value Engineering

### Time-to-Value (TTV) Reduction Framework

TTV is the elapsed time between signup and the user experiencing core value. Shorter = better.

| Bottleneck | Detection | Fix | Expected TTV Reduction |
|-----------|-----------|-----|----------------------|
| Setup required before use | Users drop off during setup | Reduce required setup steps, use defaults | 30-50% |
| Waiting for data | No value until data arrives | Provide sample/demo data immediately | 40-60% |
| Waiting for team members | Value requires collaboration | Enable solo value first, then team | 20-40% |
| Integration required | Cannot function without connecting tools | Offer manual input as alternative | 30-50% |
| Learning curve | Product too complex for quick win | Guided first action with templates | 20-30% |
| Approval/verification required | Email verification, admin approval | Defer verification to after first value | 40-60% |

### Quick Win Architecture

Design the onboarding to deliver a "quick win" within the first 3 minutes:

1. Identify the simplest valuable output the product can deliver
2. Pre-populate inputs where possible
3. Minimize decisions (use smart defaults)
4. Celebrate the output ("You just created your first [X]!")
5. Immediately show the next step

---

## Empty State Design

Empty states are onboarding moments, not dead ends. Every blank screen is an opportunity to guide the user toward activation.

### Empty State Anatomy

```
┌─────────────────────────────────────┐
│                                     │
│      [Illustration or Preview]      │  Show what this will look like with data
│                                     │
│   What this section does            │  1 sentence, benefit-focused
│                                     │
│   [Primary CTA: Create First X]    │  Single clear action
│                                     │
│   Or try with sample data →        │  Low-friction alternative
│                                     │
└─────────────────────────────────────┘
```

### Empty State Rules

| Rule | Good | Bad |
|------|------|-----|
| Show the end state | Preview with sample data | Completely blank screen |
| Single CTA | "Create your first project" | "Learn more" + "Watch video" + "Read docs" |
| Explain the value | "Track your team's progress in one view" | "No projects found" |
| Offer sample data | "Try with example data" link | Force creation from scratch |

---

## Onboarding Patterns by Product Type

### B2B SaaS

```
Signup → Setup Wizard (3-5 steps) → First Value Action → Team Invite → Deep Setup
         ├── Company info              ├── Template selection     ├── Email invites
         ├── Role/goal selection       ├── Quick configuration    └── Permissions
         └── Integration connect       └── First output created
```

**Key metric:** Time from signup to first team collaboration

### Marketplace / Two-Sided

```
Signup → Complete Profile → Browse/Discover → First Transaction → Repeat Loop
         ├── Photo/avatar         ├── Curated feed          ├── Guided first action
         ├── Preferences          ├── Search + filters      └── Transaction completion
         └── Verification         └── Saved/bookmarked
```

**Key metric:** Time from signup to first completed transaction

### Mobile App (B2C)

```
Install → Permission Requests → Quick Win → Push Notification Setup → Habit Loop
          ├── Location (if needed)   ├── Core action            ├── Value-based ask
          ├── Notifications          ├── Immediate result       └── Frequency choice
          └── Camera/contacts        └── Celebration
```

**Key metric:** Day-1 retention rate

### Content / Media Platform

```
Signup → Interest Selection → Personalized Feed → First Engagement → Social Connection
         ├── Topic picks          ├── Curated content      ├── Read/watch/listen
         ├── Creator follows      ├── Algorithmic mix      └── Like/save/share
         └── Format preferences   └── Notification prefs
```

**Key metric:** Sessions per week in first 14 days

---

## Multi-Channel Coordination

### Email + In-App Matrix

| Trigger | In-App Action | Email Action | Timing |
|---------|--------------|--------------|--------|
| Signup complete | Welcome screen with first step | Welcome email with single CTA | Immediate |
| Step 1 complete | Show step 2 | -- (don't email for every step) | Immediate |
| 24 hours, incomplete onboarding | Persistent banner/checklist | "Complete your setup" email | 24h after signup |
| 72 hours, not activated | Welcome back modal | "Here's what you can do" email | 72h after signup |
| Activation achieved | Celebration modal + next feature | Celebration email + next step | Immediate |
| Day 7, feature discovery | Contextual tooltip | "Did you know?" feature email | Day 7 |
| Day 14, engagement dip | -- | Re-engagement with use case examples | Day 14 |

### Email Design Rules

- Each email has ONE CTA that drives back into the product
- Personalize based on actions already taken (do not ask them to do what they already did)
- Keep emails short (< 150 words body)
- Subject line references the specific next step, not generic "Welcome to [Product]"

---

## Stalled User Recovery

### Stalled User Definition

| Stalled State | Criteria | Recovery Priority |
|--------------|----------|------------------|
| Never started | Signed up, never logged in again | Medium (may be wrong ICP) |
| Partially onboarded | Completed 1-2 setup steps, stopped | High (invested effort, hit a wall) |
| Active but not activated | Logged in 3+ times, never reached aha moment | Highest (engaged but stuck) |
| Activated but churning | Reached aha moment, usage declining | High (retention problem, not onboarding) |

### Recovery Tactics

| Stalled State | Tactic 1 | Tactic 2 | Tactic 3 |
|--------------|----------|----------|----------|
| Never started | "We set up [X] for you" email | Pre-populated account | -- |
| Partially onboarded | "Pick up where you left off" email | Simplify remaining steps | Offer live help |
| Active but not activated | In-app guided walkthrough | "Users like you do [X]" suggestion | Human outreach for high-value |
| Activated but churning | Feature discovery emails | Usage tips based on their workflow | CSM outreach for enterprise |

### Human Touch Triggers

For high-value accounts (enterprise, high ACV), trigger human outreach when:
- User is > 48 hours stalled in onboarding
- User visits help docs more than 3 times in a session
- User starts and abandons the same action 2+ times
- User's engagement score drops below threshold after initial activation

---

## Onboarding Checklist Design

### When to Use a Checklist

- Multiple setup steps required before full value
- Product has several features to discover
- Self-serve B2B products where users self-onboard
- Products with a clear "fully set up" state

### Checklist Best Practices

| Rule | Implementation |
|------|---------------|
| 3-7 items | Fewer than 3 = not worth a checklist. More than 7 = overwhelming. |
| Order by value | Most impactful action first |
| Start with quick wins | First item should be completable in < 60 seconds |
| Show progress | Progress bar or "3 of 5 complete" counter |
| Pre-check completed items | If they already did something, mark it done |
| Celebrate completion | Animation, confetti, "You're all set!" message |
| Dismissable | "I'll do this later" option. Never trap users. |
| Persistent but not blocking | Sidebar widget or dashboard card, not a blocking modal |

### Checklist Item Design

Each item should include:
- Clear action label ("Import your contacts")
- Why it matters ("So you can track interactions")
- Estimated time ("Takes about 2 minutes")
- CTA button ("Import Now")

---

## Tooltip and Tour Design

### When to Use Tooltips/Tours

- Complex UI where features are not self-evident
- Power features users might miss
- UI changes after a major update
- Features that require specific discovery order

### Tour Best Practices

| Rule | Implementation |
|------|---------------|
| Max 3-5 steps per tour | More than 5 and users will dismiss |
| Dismissable at any time | "Skip tour" on every step |
| Don't repeat for returning users | Track tour completion, never show again |
| Highlight the actual UI element | Spotlight effect on the element being explained |
| Action-oriented | "Click here to create a project" not "This is where projects live" |
| Progressive | Show basic tour on day 1, advanced features tour on day 7 |

---

## Metrics and Measurement

### Key Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| Activation rate | Users reaching activation / Total signups | B2C: 40-60%, B2B: 25-40% |
| Time to activation | Median time from signup to activation event | B2C: < 1 day, B2B: < 7 days |
| Onboarding completion rate | Users completing all steps / Total signups | > 60% |
| Day-1 retention | Users returning day after signup / Total signups | > 40% |
| Day-7 retention | Users active 7 days after signup / Total signups | > 25% |
| Day-30 retention | Users active 30 days after signup / Total signups | > 15% |
| Checklist completion rate | Users finishing all items / Users who saw checklist | > 50% |

### Funnel Analysis Template

```
Signup                  100%
├── First login          85%  (-15% never return)
├── Setup step 1         70%  (-15% drop during setup)
├── Setup step 2         55%  (-15% setup friction)
├── First value action   40%  (-15% blank slate / confusion)
├── Activation event     30%  (-10% incomplete value delivery)
└── Day-7 return         20%  (-10% no habit formed)
```

Focus optimization on the step with the largest absolute drop.

---

## Experiment Framework

### High-Impact Experiments

| Experiment | Hypothesis | Metric |
|-----------|-----------|--------|
| Reduce setup steps | Fewer steps = higher completion | Activation rate |
| Pre-populate with sample data | Reduces blank slate anxiety | Time to first value action |
| Add onboarding checklist | Progress visibility increases completion | Onboarding completion rate |
| Defer email verification | Removes friction before value | Time to activation |
| Personalize by role/goal | Relevant path increases activation | Activation rate by segment |

### Medium-Impact Experiments

| Experiment | Hypothesis | Metric |
|-----------|-----------|--------|
| Welcome video vs text | Video may improve or hurt depending on product | Activation rate + time on first screen |
| Checklist order change | Value-first ordering improves completion | Checklist completion rate |
| Guided tour vs self-discover | Tours help complex products | Feature adoption rate |
| In-app chat during onboarding | Real-time help reduces stalls | Stall rate, activation rate |

---

## Output Artifacts

| Artifact | Format | Description |
|----------|--------|-------------|
| Activation Definition Doc | Structured definition | Aha moment, activation event, success metric, measurement plan |
| Onboarding Flow Diagram | Step-by-step flow | Post-signup flow with drop-off points and decision branches |
| Checklist Specification | Item-by-item design | 3-7 items with action, rationale, time estimate, and CTA |
| Email Trigger Map | Trigger/timing/goal table | Conditions and content for each onboarding email |
| Empty State Copy | Per-screen design | Illustration description, headline, body, CTA for each empty state |
| Experiment Backlog | Prioritized table | Test ideas ranked by expected impact and effort |
| Stalled User Playbook | Decision tree | Detection criteria, recovery tactics, escalation rules |

---

## Related Skills

- **signup-flow-cro** -- Use for optimizing the registration flow before users enter the product. Onboarding-cro starts after signup is complete.
- **paywall-upgrade-cro** -- Use when onboarding leads into upgrade moments. Do not show paywalls before the aha moment is reached.
- **churn-prevention** -- Use when users activate but then churn. If they never activate, the problem is onboarding, not churn.
- **page-cro** -- Use when the marketing page before signup is the bottleneck, not the post-signup experience.

---

## Tool Reference

### 1. activation_funnel_analyzer.py

**Purpose:** Analyze an onboarding activation funnel to identify the biggest drop-off points and estimate the impact of fixing each step.

```bash
python scripts/activation_funnel_analyzer.py funnel_data.json
python scripts/activation_funnel_analyzer.py funnel_data.json --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `funnel_data.json` | Yes | JSON file with funnel step names and user counts |
| `--json` | No | Output results as JSON |

### 2. onboarding_checklist_scorer.py

**Purpose:** Score an onboarding checklist design against best practices (item count, ordering, quick wins, progress indication).

```bash
python scripts/onboarding_checklist_scorer.py checklist.json
python scripts/onboarding_checklist_scorer.py checklist.json --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `checklist.json` | Yes | JSON file with checklist items and their properties |
| `--json` | No | Output results as JSON |

### 3. ttv_estimator.py

**Purpose:** Estimate time-to-value (TTV) based on onboarding steps and identify bottlenecks that can be reduced or eliminated.

```bash
python scripts/ttv_estimator.py onboarding_steps.json
python scripts/ttv_estimator.py onboarding_steps.json --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `onboarding_steps.json` | Yes | JSON file with onboarding steps, estimated minutes, and requirements |
| `--json` | No | Output results as JSON |

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| Activation rate below 25% (B2B) or 40% (B2C) | Aha moment not reached fast enough | Run ttv_estimator.py to identify TTV bottlenecks; target first value within 5 minutes |
| Users complete onboarding but do not return Day 7 | Onboarding leads to setup, not to value | Restructure flow so the first session delivers a meaningful output, not just configuration |
| Onboarding checklist completion below 50% | Too many items or first item is too complex | Reduce to 3-7 items; start with a quick win completable in under 60 seconds; use onboarding_checklist_scorer.py to audit |
| Stalled users at 40%+ of signups | Blank slate problem or unclear next step | Add pre-populated sample data and empty state CTAs; implement stalled user recovery emails at 24h and 72h |
| Day-1 retention below 30% | First-run experience has dead ends or confusion | Apply the 30-second rule: within 30 seconds, user sees a single next action, understands the value, and has a path forward |
| Email onboarding sequences have low open rates | Generic subject lines or wrong timing | Personalize subject lines to reference the specific next step; send at trigger-based timing, not fixed schedules |
| Team invite rate is low | Invite step placed before value is demonstrated | Defer team invite until after the user has experienced core value individually |

---

## Success Criteria

- Activation rate of 30-40% within 14 days for B2B (40-60% for B2C)
- Time-to-first-value under 5 minutes (verified by ttv_estimator.py)
- Onboarding completion rate above 60%
- Day-1 retention above 40%
- Day-7 retention above 25%
- Stalled user recovery emails achieve 10%+ reactivation rate
- Onboarding checklist scores 70+ on onboarding_checklist_scorer.py assessment

---

## Scope & Limitations

- **In scope:** Activation definition, onboarding flow design, time-to-value engineering, empty state design, checklist design, tooltip/tour design, email coordination, stalled user recovery, experiment design
- **Out of scope:** Signup/registration flow (use signup-flow-cro), marketing page optimization (use page-cro), long-term retention strategy, feature development
- **Data dependency:** Best results require funnel analytics (per-step drop-off data); without this, optimization is based on heuristics
- **Product type matters:** B2B SaaS, marketplace, mobile app, and content platforms have fundamentally different onboarding patterns; use the correct pattern for your product type
- **No silver bullet:** If the product does not deliver value, no amount of onboarding optimization will fix retention; validate product-market fit first

---

## Integration Points

- **signup-flow-cro** -- Optimizes the registration flow before onboarding begins; hand-off point is the moment after successful account creation
- **churn-prevention** -- When users activate but then churn, the problem shifts from onboarding to retention; use churn-prevention for post-activation churn
- **paywall-upgrade-cro** -- Upgrade prompts should only appear after the aha moment is reached; never show paywalls during initial onboarding
- **page-cro** -- When the bottleneck is the marketing page (users are not signing up), optimize the page before optimizing onboarding
- **customer-success-manager** -- For enterprise accounts, human-assisted onboarding complements product-led flows; CS team should monitor activation metrics

---

## page-cro

Source path: `references/business-growth/page-cro/SKILL.md`

# Page CRO

Production-grade conversion rate optimization framework for marketing pages. Covers the 7-dimension analysis framework, page-type-specific playbooks, copy alternatives methodology, above-the-fold engineering, social proof hierarchy, objection handling patterns, and structured A/B test design.

---

## Table of Contents

- [Initial Assessment](#initial-assessment)
- [The 7-Dimension CRO Framework](#the-7-dimension-cro-framework)
- [Above-the-Fold Engineering](#above-the-fold-engineering)
- [Social Proof Hierarchy](#social-proof-hierarchy)
- [Objection Handling Architecture](#objection-handling-architecture)
- [Page-Type Playbooks](#page-type-playbooks)
- [Copy Alternatives Methodology](#copy-alternatives-methodology)
- [Traffic Source Matching](#traffic-source-matching)
- [A/B Test Framework](#ab-test-framework)
- [Metrics and Benchmarks](#metrics-and-benchmarks)
- [Output Artifacts](#output-artifacts)
- [Related Skills](#related-skills)

---

## Clarify First

Before optimizing the page, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Page type** — homepage, landing page, pricing, feature, or blog (selects the page-type playbook and benchmark)
- [ ] **Traffic source** — organic, paid, email, or social (drives message-match requirements)
- [ ] **Primary conversion goal + current rate** — focuses the 7-dimension analysis and sets the baseline
- [ ] **Behavioral data available** — heatmaps / session recordings (reveals friction that analytics alone cannot)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the audit.

## Initial Assessment

### Required Context

| Question | Why It Matters |
|----------|---------------|
| What page type? (homepage, landing page, pricing, feature, blog) | Determines the CRO framework to apply |
| What is the primary conversion goal? | Focuses the analysis |
| Where is traffic coming from? (organic, paid, email, social) | Drives message-match requirements |
| What is the current conversion rate? | Establishes the baseline |
| What does the post-click flow look like? | The page may convert fine but the next step fails |
| Do you have heatmaps or session recordings? | Behavioral data reveals what analytics cannot |
| What have you already tried? | Avoids re-testing failed experiments |

---

## The 7-Dimension CRO Framework

Analyze every marketing page across these 7 dimensions, in order of typical impact.

### Dimension 1: Value Proposition Clarity (Highest Impact)

**The 5-second test:** Can a first-time visitor understand what this is, who it is for, and why they should care within 5 seconds?

| Signal | Pass | Fail |
|--------|------|------|
| Primary benefit is stated explicitly | "Save 10 hours/week on reporting" | "Next-generation analytics platform" |
| Written in customer language | "See which campaigns drive revenue" | "Multi-touch attribution solution" |
| Differentiator is clear | "The only CRM built for agencies" | "A better CRM" |
| Specificity | Includes numbers, timeframes, outcomes | Vague superlatives ("powerful", "innovative") |

### Dimension 2: Headline Effectiveness

**Headline scoring rubric:**

| Criteria | Score 0 | Score 1 | Score 2 |
|----------|---------|---------|---------|
| Communicates core value | No | Partially | Clearly |
| Specific (numbers, outcomes) | Generic | Somewhat specific | Very specific |
| Addresses target audience | Generic | Implied | Explicit |
| Matches traffic source | No connection | Loose match | Exact message match |
| Emotional or logical hook | Neither | One | Both |

**Total: 0-10. Score < 6 = rewrite needed.**

### Dimension 3: CTA Hierarchy and Placement

| Check | Pass | Fail |
|-------|------|------|
| One clear primary CTA | Single, prominent action | Multiple competing CTAs |
| CTA visible without scrolling | Above the fold | Below the fold only |
| CTA copy communicates value | "Start Free Trial" | "Submit" |
| CTA repeated at decision points | After benefits, after social proof, at bottom | Only at top or only at bottom |
| Secondary CTA is clearly secondary | Smaller, different color, text link | Same visual weight as primary |

### Dimension 4: Visual Hierarchy and Scannability

| Check | Pass | Fail |
|-------|------|------|
| Most important element is most prominent | Headline + CTA dominate | Navigation or image dominates |
| Scannable in 10 seconds | Key points visible via headings, bold, bullets | Wall of text |
| Adequate white space | Breathing room between sections | Cluttered, dense layout |
| Images support the message | Product screenshots, relevant imagery | Stock photos, decorative graphics |
| F-pattern or Z-pattern layout | Content follows natural eye flow | Random placement |

### Dimension 5: Social Proof and Trust

| Check | Pass | Fail |
|-------|------|------|
| Customer logos visible | Recognizable logos above the fold | No logos or unknown companies |
| Testimonials are specific | "Increased revenue by 40%" | "Great product!" |
| Testimonials are attributed | Full name, title, company, photo | Anonymous or first-name-only |
| Trust badges present (where relevant) | Security, compliance, awards | No trust indicators |
| Numbers-based proof | "10,000+ teams use..." | No scale indicators |

### Dimension 6: Objection Handling

| Check | Pass | Fail |
|-------|------|------|
| Price/value objection addressed | ROI calculation, "starts at $X" | No pricing context |
| "Will this work for me?" answered | Use cases, industry examples | Generic positioning only |
| Risk reduction offered | Free trial, guarantee, no CC required | No risk reversal |
| Implementation concern addressed | "Set up in 5 minutes" | No setup/complexity context |
| FAQ section present | Addresses top 5 objections | No FAQ or irrelevant questions |

### Dimension 7: Friction Points

| Check | Pass | Fail |
|-------|------|------|
| Form is optimized | Minimal fields, clear labels | Too many fields, unclear purpose |
| Next step is clear | Obvious path forward from every section | Confusing navigation or dead ends |
| Mobile experience | Fully responsive, touch-friendly | Desktop-only design |
| Load time | < 3 seconds | > 5 seconds |
| No distracting elements | Clean, focused design | Popups, auto-play video, chat widget on load |

---

## Above-the-Fold Engineering

The above-the-fold area is the most valuable real estate on any page. It determines whether visitors scroll or bounce.

### Required Elements (Above the Fold)

```
┌──────────────────────────────────────────┐
│  [Nav: Logo + 3-5 links + Primary CTA]  │
├──────────────────────────────────────────┤
│                                          │
│  HEADLINE: Primary value proposition     │
│                                          │
│  SUBHEADLINE: Supporting detail          │
│                                          │
│  [PRIMARY CTA BUTTON]                   │
│  [Secondary CTA: text link]             │
│                                          │
│  [Social proof: logos or stat]           │
│                                          │
│  [Hero image or product screenshot]      │
│                                          │
└──────────────────────────────────────────┘
```

### Above-the-Fold Rules

- Headline is the largest text on the page
- CTA button is the most visually prominent interactive element
- Social proof appears above the fold (even just logo strip)
- Hero image shows the product in use (not abstract graphics)
- No auto-play video or animation that distracts from the CTA
- Navigation is minimal (3-5 items max, CTA in nav)

---

## Social Proof Hierarchy

Not all social proof is equal. Use the right type at the right location.

### Social Proof Power Ranking

| Rank | Type | Strength | Best Placement |
|------|------|----------|----------------|
| 1 | Case study with metrics | "Company X increased revenue 40% in 3 months" | Mid-page, after benefits section |
| 2 | Named testimonial with photo | Full name, title, company, headshot | Near CTA, after objection handling |
| 3 | Aggregate numbers | "10,000+ teams" or "4.8/5 on G2" | Above the fold, near headline |
| 4 | Customer logos | Recognizable brand logos | Above the fold, logo strip |
| 5 | Awards/badges | "G2 Leader 2026", "SOC2 Certified" | Footer or near CTA |
| 6 | Generic testimonial | "Great product!" -- no specifics | Do not use (no credibility) |

### Placement Rules

- Logo strip: Above the fold, below the CTA
- Testimonials: After the section that makes the claim they validate
- Case studies: Mid-page, as their own section
- Numbers: Inline with headline or subheadline
- Trust badges: Near the primary CTA and near the form

---

## Objection Handling Architecture

### The 5 Universal Objections

Every product page must address these five objections. If the page does not, conversions leak.

| Objection | How to Address | Page Element |
|-----------|---------------|--------------|
| "Is this worth the money?" | ROI calculator, pricing comparison, "saves X hours" | Benefits section + pricing context |
| "Will this work for my situation?" | Industry examples, use case sections, persona targeting | "Who uses this" section |
| "Is this hard to set up?" | "Set up in 5 minutes", onboarding preview, integration logos | Feature section or FAQ |
| "What if it doesn't work?" | Free trial, money-back guarantee, no CC required | Near CTA |
| "Why this over alternatives?" | Comparison table, differentiators, switcher testimonials | Mid-page or FAQ |

### FAQ Design for Objection Handling

The FAQ section should be the last defense before conversion. Structure it to address the 5 objections:

1. "How long does setup take?" (complexity objection)
2. "Can I cancel anytime?" (commitment objection)
3. "What's included in the free trial?" (value objection)
4. "Do you integrate with [popular tool]?" (compatibility objection)
5. "How is this different from [competitor]?" (alternatives objection)

---

## Page-Type Playbooks

### Homepage

| Element | Best Practice |
|---------|---------------|
| Audience | Cold visitors who may not know you |
| Headline | Position the company, not a single feature |
| CTA split | Primary: "Start Free Trial" / Secondary: "See Demo" or "Learn More" |
| Content | Overview of benefits, social proof, feature highlights, use cases |
| Navigation | Full site navigation (unlike landing pages) |

### Landing Page (Paid Traffic)

| Element | Best Practice |
|---------|---------------|
| Navigation | Remove or minimize (no escape routes) |
| Headline | Message-match with the ad that drove the click |
| CTA | Single action, repeated 2-3 times down the page |
| Content | Complete argument on one page: problem > solution > proof > CTA |
| Social proof | Directly relevant to the ad audience |

### Pricing Page

| Element | Best Practice |
|---------|---------------|
| Plan presentation | Good-Better-Best with recommended plan highlighted |
| Toggle | Annual/Monthly with savings percentage shown |
| Feature comparison | Full table below the fold |
| FAQ | "Which plan is right for me?" as first question |
| CTA | Per-plan CTA with plan-specific copy |
| Social proof | Logos and testimonials relevant to each tier |

### Feature Page

| Element | Best Practice |
|---------|---------------|
| Headline | Benefit of the feature, not the feature name |
| Content | Use cases > technical capabilities |
| Demo | Screenshot, GIF, or interactive demo |
| CTA | "Try this feature" or "Start Free Trial" |
| Internal links | Link to related features and pricing |

### Blog Post

| Element | Best Practice |
|---------|---------------|
| CTA type | Contextual inline CTA matching the content topic |
| Placement | After introduction, at natural breaks, at end |
| CTA style | Inline banner or text link, not aggressive popup |
| Content CTA | Offer a related resource (template, checklist, tool) |

---

## Copy Alternatives Methodology

When recommending copy changes, always provide 2-3 alternatives with reasoning.

### Alternative Generation Framework

For each key element (headline, subheadline, CTA), generate variants across these axes:

| Axis | Variant A | Variant B | Variant C |
|------|-----------|-----------|-----------|
| Benefit focus | Outcome-focused | Problem-focused | Feature-focused |
| Specificity | Numbers and data | Customer quote | Use case scenario |
| Tone | Direct and assertive | Conversational | Aspirational |

### Example

**Current headline:** "Marketing Automation Software"

| Variant | Copy | Rationale |
|---------|------|-----------|
| A (outcome) | "Generate 3X More Qualified Leads Without Adding Headcount" | Specific outcome + pain point |
| B (problem) | "Stop Losing Leads Because Your Team Can't Follow Up Fast Enough" | Addresses the pain directly |
| C (social proof) | "How 2,000+ Marketing Teams Hit Their Pipeline Targets" | Authority + specificity |

**Recommendation:** Test A first (most specific), B if A does not outperform current (different psychological angle).

---

## Traffic Source Matching

Different traffic sources require different page optimization strategies.

| Source | Visitor State | Page Must Do |
|--------|-------------|-------------|
| Paid search (brand) | Knows you, high intent | Fast path to action, minimal education |
| Paid search (non-brand) | Problem-aware, solution-seeking | Prove you solve their specific problem |
| Paid social | Interrupted, low intent | Hook attention, educate, build interest |
| Organic search | Research-mode | Comprehensive content, gradual conversion |
| Email | Already engaged | Deliver on the email promise, reduce friction |
| Referral | Pre-sold by referrer | Validate referrer's recommendation, fast CTA |

### Message Match Audit

For paid traffic: Compare the ad copy with the landing page headline. They must share:
- The same language/terminology
- The same promise
- The same offer
- Visual consistency (if display ad)

**Mismatch = wasted ad spend.** Users who click an ad about "free SEO audit" and land on a generic homepage will bounce.

---

## A/B Test Framework

### Test Priority Matrix

| Priority | What to Test | Expected Impact |
|----------|-------------|-----------------|
| 1 | Headline copy | 10-30% conversion lift |
| 2 | CTA copy and color | 5-20% conversion lift |
| 3 | Social proof placement | 5-15% conversion lift |
| 4 | Above-the-fold layout | 5-20% conversion lift |
| 5 | Form field reduction | 5-10% completion lift |
| 6 | Hero image vs video | 2-10% lift (variable) |

### Test Design Rules

- One variable per test (unless running a multivariate test with sufficient traffic)
- Minimum 200 conversions per variant before declaring a winner
- Run for full business cycles (minimum 2 weeks)
- Track downstream metrics (not just page conversion, but lead quality / revenue)

### Fix vs Test Decision

| Situation | Action |
|-----------|--------|
| Obvious UX problem (broken form, missing CTA) | Fix immediately, no test needed |
| Missing social proof | Add it, no test needed |
| Headline copy alternative | A/B test |
| Layout change | A/B test |
| Removing page elements | A/B test |
| Adding a new section | A/B test |

---

## Metrics and Benchmarks

### Conversion Rate Benchmarks

| Page Type | Below Average | Average | Good | Excellent |
|-----------|-------------|---------|------|-----------|
| SaaS homepage | < 2% | 2-4% | 4-7% | > 7% |
| Landing page (paid) | < 5% | 5-10% | 10-20% | > 20% |
| Pricing page | < 3% | 3-5% | 5-10% | > 10% |
| Blog post (to email) | < 1% | 1-3% | 3-5% | > 5% |
| Feature page | < 2% | 2-5% | 5-8% | > 8% |

### Key Metrics

| Metric | What It Tells You |
|--------|------------------|
| Bounce rate | Is the page meeting visitor expectations? |
| Scroll depth | How much of the page are visitors seeing? |
| Time on page | Are visitors reading or immediately leaving? |
| CTA click rate | Is the CTA compelling and visible? |
| Form start rate | Are visitors beginning the conversion process? |
| Form completion rate | Are they finishing it? |

---

## Output Artifacts

| Artifact | Format | Description |
|----------|--------|-------------|
| CRO Audit Report | 7-dimension analysis | Per-dimension assessment with severity ratings |
| Quick Wins List | Bullet list (max 5) | Implementable today with expected impact |
| High-Impact Recommendations | Structured list | Each with rationale, effort estimate, and success metric |
| Copy Alternatives | Side-by-side table | 2-3 variants per key element with reasoning |
| A/B Test Plan | Prioritized table | Hypothesis, variant, success metric, priority |
| Traffic Source Matching Audit | Source x page element table | Message match assessment per traffic source |

---

## Related Skills

- **form-cro** -- Use when the form on the page is the specific bottleneck (field optimization, validation, mobile form UX).
- **signup-flow-cro** -- Use when users convert on the page but drop off during the signup/registration process.
- **popup-cro** -- Use when considering a popup as an additional conversion layer on the page.
- **onboarding-cro** -- Use when post-conversion activation is the real problem and the page itself converts adequately.
- **pricing-strategy** -- Use when the pricing page needs structural redesign (tier structure, value metric), not just CRO tweaks.

---

## Tool Reference

### 1. page_cro_scorer.py

**Purpose:** Score a marketing page across the 7 CRO dimensions and generate an audit report with severity ratings.

```bash
python scripts/page_cro_scorer.py page_audit.json
python scripts/page_cro_scorer.py page_audit.json --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `page_audit.json` | Yes | JSON file with page elements and dimension checks |
| `--json` | No | Output results as JSON |

### 2. headline_scorer.py

**Purpose:** Score headline effectiveness against the 5-criteria rubric and generate copy alternatives.

```bash
python scripts/headline_scorer.py --headline "Marketing Automation Software" --audience "B2B marketers" --traffic-source paid-search
python scripts/headline_scorer.py --headline "Marketing Automation Software" --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `--headline` | Yes | The headline text to score |
| `--audience` | No | Target audience description (default: "general") |
| `--traffic-source` | No | Primary traffic source: organic, paid-search, paid-social, email, referral (default: organic) |
| `--json` | No | Output results as JSON |

### 3. conversion_benchmark_calculator.py

**Purpose:** Calculate conversion rate benchmarks for a given page type, traffic source, and industry, and assess current performance.

```bash
python scripts/conversion_benchmark_calculator.py --page-type landing-page --traffic paid --current-rate 8.5
python scripts/conversion_benchmark_calculator.py --page-type homepage --traffic organic --current-rate 3.0 --json
```

| Flag | Required | Description |
|------|----------|-------------|
| `--page-type` | Yes | Page type: homepage, landing-page, pricing, feature, blog |
| `--traffic` | Yes | Traffic source: organic, paid, email, social, referral |
| `--current-rate` | Yes | Current conversion rate as percentage |
| `--industry` | No | Industry for benchmarks: saas, ecommerce, fintech, healthcare, education (default: saas) |
| `--json` | No | Output results as JSON |

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| High bounce rate (>70%) on landing page | Message mismatch with traffic source or poor above-the-fold | Audit message match: compare ad copy with landing page headline; ensure value proposition is visible in first 5 seconds |
| Page converts on desktop but not mobile | Mobile UX not optimized | Check touch targets (44px+), form field count on mobile, CTA visibility without scrolling; score with page_cro_scorer.py |
| CTA click rate below 2% | CTA is generic, below the fold, or visually weak | Replace "Submit" with value-specific copy; ensure CTA is visible above fold and repeated after key sections |
| High scroll depth but low conversion | Visitors read but are not convinced to act | Add social proof near CTA positions; address objections in FAQ; add risk reversal (free trial, no CC) |
| A/B test shows no significant winner after 4 weeks | Change too small to detect or insufficient traffic | Use ab_test_calculator.py from form-cro to validate sample size; test bigger changes (headline rewrite vs word swap) |
| Paid traffic converts worse than organic | Landing page not tailored to paid traffic intent | Create dedicated landing pages for paid campaigns with message match; remove navigation on paid landing pages |
| Social proof section is ignored | Generic testimonials or poor placement | Use specific, attributed testimonials with metrics; place after the section that makes the claim they validate |

---

## Success Criteria

- Page CRO score of 70+ across the 7-dimension framework (scored by page_cro_scorer.py)
- Headline scores 7+ on the 10-point rubric (scored by headline_scorer.py)
- Conversion rate at or above industry benchmark for page type (verified by conversion_benchmark_calculator.py)
- Above-the-fold contains: headline, CTA, and at least one social proof element
- Message match verified for all paid traffic campaigns (ad copy matches landing page headline)
- Mobile conversion rate within 20% of desktop rate
- Every page addresses at least 3 of the 5 universal objections

---

## Scope & Limitations

- **In scope:** Page-level conversion optimization, headline effectiveness, CTA hierarchy, social proof placement, objection handling, traffic source matching, A/B test prioritization
- **Out of scope:** Form optimization (use form-cro), signup flow optimization (use signup-flow-cro), popup optimization (use popup-cro), pricing structure changes (use pricing-strategy)
- **Page speed:** This skill covers CRO elements, not technical performance; pages loading >3 seconds need technical optimization first
- **Traffic minimum:** A/B testing recommendations require 200+ conversions per variant; low-traffic pages should implement best practices without testing
- **Qualitative input:** Heatmaps and session recordings provide critical behavioral data that analytics alone cannot reveal; consider investing in these tools

---

## Integration Points

- **form-cro** -- When the form on the page is the bottleneck (field optimization, validation UX, mobile form experience)
- **signup-flow-cro** -- When users convert on the page but drop off during the signup/registration process
- **popup-cro** -- When considering a popup as an additional conversion layer on top of the page
- **onboarding-cro** -- When post-conversion activation is the real problem and the page itself converts adequately
- **pricing-strategy** -- When the pricing page needs structural redesign (tier structure, value metric), not just CRO tweaks
- **competitive-teardown** -- When comparison pages need competitive data to build credible content

---

## partnerships-architect

Source path: `references/business-growth/partnerships-architect/SKILL.md`

# Partnerships Architect

End-to-end strategic partnership design and scaling: partnership type selection (tech integration vs channel vs OEM vs strategic), deal structures, partner program design (tiers, benefits, requirements), partner evaluation, and ROI modeling that justifies (or kills) a partnership investment.

This skill is provider-agnostic and works across SaaS, infrastructure, marketplace, and platform companies.

---

## When to use this skill

| Situation | Skill applies |
|-----------|---------------|
| Evaluating a potential partner | Yes — use `scripts/partner_evaluation_scorer.py` + **evaluation framework** |
| Picking partnership type for a specific opportunity | Yes — see **partnership type decision tree** |
| Designing a partner program from scratch | Yes — see **partner program design** + `scripts/partner_program_designer.py` |
| Structuring a specific partnership deal | Yes — see **partnership deal structures** |
| Modeling partnership ROI | Yes — `scripts/partnership_roi_modeler.py` |
| Auditing existing partner portfolio | Yes — use evaluation scorer across all partners |
| Per-deal partner economics | Use `business-growth/channel-economics` |
| Per-deal partner approval | Use `business-growth/deal-desk` |
| Writing the partner contract | Use `business-growth/contract-and-proposal-writer` |

---

## Partnership types — the decision tree

Five primary partnership types. Different goals; different structures; different success metrics.

```
What's the primary goal of this partnership?

Grow our distribution reach
├── Customer-pays-them, they-pay-us → Reseller / Distributor / VAR
├── Customer-pays-us, we-pay-them → Affiliate / Referral
└── Joint sale to mutual customer → Co-sell

Embed our product in their offering
├── Customer doesn't see us (white-label) → OEM
├── Customer sees us as embedded → Embedded ISV / Powered-by
└── We're an option in their marketplace → Marketplace listing

Combine our product with theirs (better together)
├── Pre-integrated, certified → Tech / Integration Partner
├── Bundled offering → Solution Partner
└── Joint product (rare) → Joint Venture

Build market presence together
├── Joint events, content, PR → Co-marketing Partner
├── Industry positioning → Strategic Alliance
└── Standards / consortium → Standards Partner

Achieve a specific strategic goal
├── Block a competitor → Defensive partnership
├── Enter a new market → Market entry partnership
└── Acquire capability → Strategic alliance (often pre-acquisition)
```

See [references/partnership-types.md](references/partnership-types.md) for each type in depth: economic structure, contract patterns, KPIs, when each works / fails.

---

## Partner evaluation framework

Not every potential partner is worth the investment. Use this framework before committing.

### Six evaluation dimensions

| Dimension | What to assess | Score (1-5) |
|-----------|----------------|-------------|
| **Strategic fit** | Does this partnership advance our strategy? Customer base overlap / vertical / region? | |
| **Economic potential** | Realistic pipeline / revenue contribution over 24 months? | |
| **Partner credibility** | Brand, financial stability, technical capability, customer references | |
| **Mutual commitment** | Are they investing equally? Senior sponsor on their side? Resources committed? | |
| **Operational fit** | Can our systems / processes / culture work together? | |
| **Exit-ability** | If it doesn't work, can we wind down cleanly? Are we creating dependencies we can't reverse? |

### Scoring rubric

- 5 — strong yes
- 4 — yes with minor caveats
- 3 — mixed; substantial uncertainty
- 2 — weak; significant concerns
- 1 — no; deal-breaker

**Total 25-30**: green-light; invest with confidence
**Total 18-24**: yellow; structure carefully; small pilot first
**Total < 18**: red; decline or substantially restructure

Use `scripts/partner_evaluation_scorer.py --partner partner.yaml` to score a specific potential partner.

### Killer questions to ask

Before signing any significant partnership:

1. **What does success look like in 12 months?** If both sides can't articulate the same answer, you don't have alignment.
2. **What's their commitment level?** Headcount assigned? Budget? Executive sponsorship?
3. **What's the realistic pipeline in next 12 months?** Specific accounts? Or vague "we have customers"?
4. **Who's the day-to-day owner on each side?** Names + tenure + reporting line.
5. **What happens if we don't hit our shared metrics?** Course-correct? Wind down? Renegotiate?

If you can't get clear answers, the partnership is wishful thinking.

---

## Partnership deal structures

Different deal types call for different structures. Standard patterns:

### Structure A: Standard reseller agreement

- **Term**: 1-3 years, auto-renew
- **Discount**: per published tier matrix
- **Exclusivity**: usually non-exclusive
- **Termination**: 90-day notice both sides
- **Use when**: typical channel relationship

### Structure B: Co-sell agreement (mutual customer)

- **Term**: 1-2 years
- **Compensation**: shared commission OR referral fee
- **Joint marketing commitment**: optional
- **Use when**: complementary offerings; existing or target shared customers

### Structure C: OEM agreement

- **Term**: 3-7 years (long; relationship-heavy)
- **Royalty / rev-share**: % of partner revenue OR per-instance fee
- **Exclusivity**: often partial (specific use case / market)
- **Source code escrow**: usually required
- **Termination**: complex (typically 12-24 months notice; transition rights)
- **Use when**: deeply embedded technical relationship; high mutual investment

### Structure D: Strategic alliance

- **Term**: open-ended; reviewed annually
- **Resources committed**: explicit (e.g., 2 FTEs per side, $X budget per year, joint roadmap session quarterly)
- **Governance**: steering committee (executive sponsors meet quarterly)
- **Specific deliverables**: joint product features, joint customer wins, joint thought leadership
- **Use when**: 5+ year strategic relationship; not transactional

### Structure E: Tech / integration partnership

- **Term**: 1-3 years
- **Compensation**: typically none direct; mutual value from joint customers
- **Certification process**: defined (testing, documentation)
- **Marketplace listing**: typically included
- **Co-marketing**: optional but common
- **Use when**: integration creates joint customer value; no direct revenue flow

See [references/partnership-deal-structures.md](references/partnership-deal-structures.md) for the full deal-structure templates with negotiation guides.

---

## Partner program design

When you scale beyond a few partners, you need a program.

### Three pillars of a partner program

| Pillar | Components |
|--------|------------|
| **Recruitment** | Target partner profile; outreach motion; intake / qualification; onboarding |
| **Enablement** | Training; certification; technical resources; sandbox; partner portal; marketing materials |
| **Activation** | Deal registration; lead sharing; MDF / co-marketing; co-selling motion; quarterly business reviews |

### Standard program elements

- **Partner agreement** (master): tenant-of-the-relationship
- **Tier structure** (Authorized → Silver → Gold → Platinum): different benefits + requirements per tier
- **Deal registration**: protect partner-developed opportunities
- **Certification program**: train + test partners on your product
- **Partner portal**: deal reg, MDF, training, marketing materials, lead sharing
- **MDF (Marketing Development Funds)**: co-funded marketing
- **Channel manager(s)**: 1 per 10-15 active partners
- **Annual partner conference**: community building + recognition

See [references/partner-program-design.md](references/partner-program-design.md) for the full program template including tier definitions, benefit / requirement matrices, and the "Year 1 / Year 2 / Year 3" maturity model.

Use `scripts/partner_program_designer.py --org-spec org.yaml` to generate a baseline program design based on company stage + ICP + target partner volume.

---

## Partnership ROI modeling

Partnerships consume real investment. Headcount, MDF, technology, executive time. Model the ROI before committing.

### ROI model template

```
3-year cumulative partnership P&L

Year 1 (investment year):
  Revenue from partnership: $X
  Costs:
    Partnership manager headcount: $200k
    Engineering integration (one-time): $300k
    Marketing / co-launch: $50k
    Partner enablement (content, training): $50k
    Travel / events: $30k
    TOTAL Y1 cost: $630k
  Y1 net: $X - $630k

Year 2:
  Revenue from partnership: $Y (growth)
  Costs:
    Partnership manager: $200k
    Engineering ongoing: $100k
    Marketing: $80k
    Enablement: $30k
    Travel / events: $40k
    TOTAL Y2 cost: $450k
  Y2 net: $Y - $450k

Year 3:
  Revenue: $Z (mature)
  Costs: $400k (stable)
  Y3 net: $Z - $400k

3-year cumulative net: ($X + $Y + $Z) - $1,480k
```

If 3-year cumulative net is negative, the partnership doesn't pay back. Common reasons:
- Revenue estimates too optimistic
- Forgotten costs (executive time, opportunity cost)
- Partner under-performs on commitments
- Market shift makes the partnership less relevant

Use `scripts/partnership_roi_modeler.py --partnership partnership.yaml` for the full model.

---

## Clarify First

Before designing the partnership, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Partnership goal + type** — distribution, embed (OEM/ISV), better-together (tech/integration), market presence, or strategic (selects the decision-tree branch and deal structure)
- [ ] **Single deal vs scaled program** — structuring one partnership vs designing tiers/portfolio (determines deal-structure vs program-design output)
- [ ] **Partner specifics for evaluation** — their pipeline expectation, commitment, and credibility (feeds the 6-dimension scorer and green/yellow/red call)
- [ ] **ROI inputs** — expected revenue and the real costs (headcount, integration, MDF) (drives the 3-year P&L payback)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the deliverable.

## End-to-end workflows

### Workflow: Evaluate a new partner opportunity

1. **Initial conversation** with potential partner — understand their pitch
2. **Gather data** for evaluation: their company, their pipeline expectations, their commitment
3. **Score using evaluation framework** — `scripts/partner_evaluation_scorer.py`
4. **If score < 18**: decline or pilot-scope only
5. **If score 18-24**: pilot scope (3-6 months, limited investment)
6. **If score 25+**: standard partnership agreement; full investment

### Workflow: Stand up a partner program

1. **Define target partner profile (TPP)**: ideal partner attributes (size, vertical, region, capability)
2. **Pick partnership types** in scope (resellers? OEM? tech partners?)
3. **Design tier structure** — `scripts/partner_program_designer.py`
4. **Build foundational tools**: partner portal, deal-reg, certification
5. **Recruit pilot cohort** (3-5 partners) — manual, high-touch
6. **Iterate based on pilot feedback** — usually 6 months
7. **Scale recruitment** — content marketing, outbound, partner events
8. **Add channel managers** as portfolio grows (1 per 10-15 active partners)

### Workflow: Structure a specific partnership deal

1. **Identify partnership type** using the decision tree
2. **Score the partner** — `scripts/partner_evaluation_scorer.py`
3. **Pick deal structure** matching the type
4. **Model ROI** — `scripts/partnership_roi_modeler.py`
5. **Draft term sheet** (key business terms)
6. **Negotiate** — alignment on commitment, timelines, exit
7. **Legal review** + contract — `business-growth/contract-and-proposal-writer`
8. **Internal approval** — Deal Desk + CRO/CFO/CEO depending on scale

### Workflow: Audit existing partner portfolio

1. **List all active partners** + key data: revenue, costs, deals, tier
2. **Score each** against evaluation framework — `scripts/partner_evaluation_scorer.py`
3. **Identify low-ROI partners** — bottom quartile by contribution per investment hour
4. **Decide per partner**:
   - **Invest more** (top quartile, expand commitment)
   - **Maintain** (middle, status quo)
   - **Wind down** (bottom; explicit timeline to exit gracefully)
5. **Quarterly review** of portfolio with CRO

---

## Anti-patterns

- **"Strategic" partnership that's actually transactional.** If the only thing exchanging is money, it's transactional; call it that. Strategic means joint goals + shared roadmap + executive commitment.
- **Partner stack with no portfolio strategy.** Signing every partner that asks. Quality > quantity. 10 productive partners beat 100 zombies.
- **No partnership owner.** Partnership exists in nobody's job. It withers.
- **Resource asymmetry.** You commit 3 FTEs; they commit 0.5. The partnership skews to their convenience.
- **Promises without commitments.** "We'll do joint webinars." When? With what budget? Whose role to organize?
- **Open-ended exclusivity.** "Exclusive in this region forever" without performance gates. Lose flexibility for nothing in return.
- **OEM deal with no source-code escrow.** Customer-impact risk if your company goes away.
- **Strategic alliance with no governance.** No quarterly review = no executive engagement = partnership drifts.
- **Partner program with no enablement.** Partners can't sell what they don't understand.
- **Tier benefits that aren't worth tier requirements.** Partners don't advance because there's no incentive.
- **Co-marketing dollars wasted on activities without pipeline.** Great event, zero attribution.

---

## Tooling outputs

| Script | Input | Output |
|--------|-------|--------|
| `scripts/partner_evaluation_scorer.py` | Partner spec YAML | 6-dimension score (1-5 each), total, recommendation (green-light / yellow / red) |
| `scripts/partnership_roi_modeler.py` | Partnership spec YAML | 3-year P&L, payback period, sensitivity analysis |
| `scripts/partner_program_designer.py` | Org spec YAML | Recommended program structure: tiers, benefits, requirements, headcount needed |

All scripts: stdlib only, argparse CLI, JSON or markdown output.

---

## References

- [partnership-types.md](references/partnership-types.md) — 5 partnership types in depth + economic structure + when each works
- [partnership-deal-structures.md](references/partnership-deal-structures.md) — deal templates per type + negotiation guides
- [partner-program-design.md](references/partner-program-design.md) — full program design with tier matrices + maturity model

---

## Related skills

- `business-growth/channel-economics` — per-deal financial mechanics underneath partnership structure
- `business-growth/deal-desk` — per-deal approval mechanics for partner-mediated deals
- `business-growth/pricing-strategy` — pricing flexibility / floor for partner deals
- `business-growth/contract-and-proposal-writer` — partner contracts (MSA, partner agreement, OEM agreement)
- `c-level-advisor/cs-cro-advisor` — strategic-level partnership decisions
- `c-level-advisor/cs-ceo-advisor` — board-level alliance decisions

---

## paywall-upgrade-cro

Source path: `references/business-growth/paywall-upgrade-cro/SKILL.md`

# Paywall & Upgrade Screen CRO

Production-grade framework for in-product upgrade flows. Covers feature gate design, usage limit UX, trial expiration sequences, upgrade trigger timing, dark pattern avoidance, and ethical monetization. Distinct from public pricing pages (use page-cro for those) -- this focuses on in-product moments where users have already experienced value.

---

## Table of Contents

- [Initial Assessment](#initial-assessment)
- [The Value-First Principle](#the-value-first-principle)
- [Paywall Trigger Architecture](#paywall-trigger-architecture)
- [Paywall Screen Design](#paywall-screen-design)
- [Feature Gate Patterns](#feature-gate-patterns)
- [Usage Limit UX](#usage-limit-ux)
- [Trial Expiration Flows](#trial-expiration-flows)
- [Timing and Frequency Rules](#timing-and-frequency-rules)
- [Upgrade Flow Optimization](#upgrade-flow-optimization)
- [Dark Pattern Avoidance](#dark-pattern-avoidance)
- [Platform-Specific Considerations](#platform-specific-considerations)
- [Metrics and Benchmarks](#metrics-and-benchmarks)
- [A/B Test Framework](#ab-test-framework)
- [Output Artifacts](#output-artifacts)
- [Related Skills](#related-skills)

---

## Clarify First

Before designing the paywall, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Upgrade model** — freemium-to-paid, trial-to-paid, or tier upgrade (determines the paywall type and trigger architecture)
- [ ] **Free vs paid boundary** — what is gated (defines the value gap the paywall communicates)
- [ ] **Aha moment** — so triggers fire only after value is experienced (the value-first principle)
- [ ] **Platform** — web, iOS, or Android (IAP rules and commissions constrain web vs app flows)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the deliverable.

## Initial Assessment

### Required Context

| Question | Why It Matters |
|----------|---------------|
| What is the upgrade model? (freemium to paid, trial to paid, tier upgrade) | Determines the paywall type |
| What is free vs paid? | Defines the value gap to communicate |
| What triggers upgrade prompts today? | Identifies current trigger points |
| What is the current free-to-paid conversion rate? | Baseline for improvement |
| What is the aha moment for users? | Determines when the paywall should appear |
| What pricing model? (per seat, usage, flat) | Affects paywall messaging |
| Mobile app, web app, or both? | Platform-specific requirements |

---

## The Value-First Principle

The single most important rule in paywall design: **The user must have experienced real value before seeing an upgrade prompt.**

### Value-First Checklist

- [ ] User has completed the activation event (aha moment reached)
- [ ] User has used the product at least 2-3 times
- [ ] User has created or stored data they would lose
- [ ] The upgrade feels like a natural next step, not a trap

### When to Show vs When NOT to Show

| Show | Do Not Show |
|------|------------|
| After aha moment is reached | During onboarding |
| When user hits a genuine limit | On first login |
| When user clicks a paid feature | When user is in the middle of a task |
| After milestone completion | Immediately after a frustrating experience |
| On session start (gentle reminder) | After every action |

---

## Paywall Trigger Architecture

### Trigger Types

| Trigger | When It Fires | Best For |
|---------|--------------|----------|
| Feature gate | User clicks a locked feature | Feature-differentiated tiers |
| Usage limit | User reaches a quota | Usage-based pricing |
| Trial expiration | Trial period ending | Time-limited trial models |
| Time-based | After N days of active use | Freemium nurture |
| Milestone-based | After user achieves X | Upsell at success moments |
| Team-based | When team grows past free seat limit | Per-seat models |

### Trigger Priority Map

| User State | Primary Trigger | Timing |
|-----------|----------------|--------|
| Activated, under limits | Feature gate (when they try paid feature) | On click |
| Approaching limit | Soft warning (80% of limit) | Proactive |
| Hit limit | Usage limit paywall | On action that exceeds limit |
| Trial day 7 of 14 | Trial ending reminder | Session start |
| Trial day 13 of 14 | Urgent trial expiration | Session start + email |
| Trial day 14 | Trial expired | On login |
| Active for 30+ days, free | Value-based upgrade prompt | Session start, once per week |

---

## Paywall Screen Design

### Screen Anatomy

```
┌─────────────────────────────────────┐
│ [X Close / "Not now"]               │  Escape hatch (always visible)
│                                     │
│ HEADLINE: Value-focused             │  "Unlock [feature] to [benefit]"
│                                     │
│ [Feature preview / screenshot]      │  Show what they are missing
│                                     │
│ KEY BENEFITS:                       │
│ - Benefit 1                        │
│ - Benefit 2                        │
│ - Benefit 3                        │
│                                     │
│ PRICE: $X/month                    │  Clear, simple pricing
│ (or plan comparison)               │
│                                     │
│ [UPGRADE CTA - Primary]           │  "Start Pro Plan"
│ [Maybe Later - Secondary]          │  Clear secondary action
│                                     │
│ "Join 5,000+ teams on Pro"        │  Social proof
└─────────────────────────────────────┘
```

### Copy Patterns by Trigger Type

| Trigger | Headline Pattern | CTA Pattern |
|---------|-----------------|-------------|
| Feature gate | "Unlock [Feature] to [Benefit]" | "Upgrade to [Plan]" |
| Usage limit | "You've used all [N] [resources]" | "Get Unlimited [Resources]" |
| Trial expiring | "Your trial ends in [N] days" | "Continue with [Plan]" |
| Milestone | "You just hit [milestone]! Keep growing with Pro" | "Upgrade & Keep Growing" |
| Time-based | "[Product] Pro helps teams like yours [benefit]" | "See Pro Features" |

---

## Feature Gate Patterns

### Soft Gate (Preview + Lock)

User can see what the feature does but cannot use it fully.

```
┌──────────────────────────────┐
│  [Feature Preview]           │  Blurred screenshot or partial result
│                              │
│  [Lock Icon] Pro Feature     │
│                              │
│  [Feature name] lets you:    │
│  - Capability 1              │
│  - Capability 2              │
│                              │
│  [Upgrade to Pro - $X/mo]   │
│  [Maybe Later]              │
└──────────────────────────────┘
```

### Hard Gate (Block + Explain)

User cannot access the feature at all. Show the value clearly.

```
┌──────────────────────────────┐
│  [Lock Icon]                 │
│                              │
│  This feature is available   │
│  on the Pro plan             │
│                              │
│  What you get:               │
│  - Benefit 1                 │
│  - Benefit 2                 │
│  - Benefit 3                 │
│                              │
│  [Upgrade to Pro]            │
│  [Compare Plans]             │
└──────────────────────────────┘
```

### Feature Gate Design Rules

- Always explain WHY the feature is valuable (not just that it is locked)
- Show what the feature produces (output preview) when possible
- Include a "Compare Plans" link for users who want more detail
- Do not gate features the user was already using during trial

---

## Usage Limit UX

### Approaching Limit (80% Warning)

```
┌──────────────────────────────────┐
│  [Progress Bar: 80%]            │
│  You've used 80 of 100 credits  │
│                                  │
│  [Get More Credits]  [Dismiss]  │
└──────────────────────────────────┘
```

### At Limit (100%)

```
┌──────────────────────────────────────┐
│  [Progress Bar: 100%]               │
│  You've reached your monthly limit  │
│                                      │
│  Free: 100 credits | Pro: Unlimited │
│                                      │
│  [Upgrade to Pro]                   │
│  [Delete items to free space]       │  Alternative action
└──────────────────────────────────────┘
```

### Usage Limit Rules

- Show usage context before the limit hits (progress indicators in the UI)
- Provide an alternative action (delete, archive, export) when possible
- Never delete user data when limits are reached
- Allow grace period (do not cut off mid-task)

---

## Trial Expiration Flows

### Trial Countdown Sequence

| Day | Channel | Message | Tone |
|-----|---------|---------|------|
| Day 7 (of 14) | In-app banner | "7 days left in your trial" | Informational |
| Day 10 | Email | "4 days left -- here's what you've accomplished" | Value summary |
| Day 12 | In-app modal | "2 days left -- don't lose access to [feature]" | Mild urgency |
| Day 13 | Email | "Tomorrow is your last day" | Urgency + offer |
| Day 14 | In-app full screen | "Your trial has ended" | Clear options |
| Day 15 | Email | "We kept your data safe -- reactivate anytime" | Reassurance |

### Trial Expiration Screen Design

```
┌─────────────────────────────────────────┐
│  Your trial has ended                    │
│                                          │
│  What you accomplished during trial:     │
│  - Created [N] projects                 │  Personalized data
│  - Invited [N] team members             │
│  - Saved an estimated [X] hours         │
│                                          │
│  What happens now:                       │
│  - Your data is saved for 30 days       │
│  - Read-only access to existing work    │
│  - Full access resumes when you upgrade │
│                                          │
│  [Continue with Pro - $X/mo]            │
│  [Remind Me Later]  [Downgrade to Free] │
└─────────────────────────────────────────┘
```

---

## Timing and Frequency Rules

### Frequency Caps

| Rule | Implementation |
|------|---------------|
| Max 1 paywall per session | Do not interrupt twice in one visit |
| 3-7 day cooldown after dismissal | If they click "Not now", wait at least 3 days |
| Never during active task | If user is creating, editing, or mid-workflow, do not interrupt |
| Cap at 3 per month | After 3 dismissals in a month, stop showing until next month |
| Track annoyance signals | If user closes paywall within 1 second repeatedly, increase cooldown |

### Escalation Pattern

| Attempt | Approach | Invasiveness |
|---------|----------|-------------|
| 1 | Subtle banner or sidebar widget | Low |
| 2 | Modal with value proposition | Medium |
| 3 | Modal with special offer (discount/extended trial) | Medium-High |
| 4+ | Reduce frequency, switch to email nurture | Low (change channel) |

---

## Upgrade Flow Optimization

### From Paywall Click to Payment

| Step | Optimization |
|------|-------------|
| 1. Click upgrade CTA | Opens upgrade flow (do not redirect to external page if avoidable) |
| 2. Plan selection | Pre-select the recommended plan, show comparison |
| 3. Payment | Pre-fill known info (email, name), support all payment methods |
| 4. Confirmation | Immediate access to paid features, confirmation email |
| 5. Post-upgrade | Guide to newly unlocked features, celebration moment |

### Friction Reduction

- Keep the upgrade flow in-context (modal or slide-out, not a full page redirect)
- Pre-fill all known information
- Support saved payment methods and one-click upgrade for returning upgraders
- Show price clearly before the payment step (no surprise charges)

---

## Dark Pattern Avoidance

### Patterns to NEVER Use

| Dark Pattern | Why It Fails | Ethical Alternative |
|-------------|-------------|---------------------|
| Hidden close button | Breaks trust, generates support tickets | Clear X in top-right corner |
| Shame copy ("No, I don't want to grow my business") | Manipulative, reduces brand respect | "Maybe later" or "Not now" |
| Countdown timer (fake urgency) | Users discover it resets, destroys credibility | Only use for genuinely expiring offers |
| Confusing plan selection | Users feel tricked, higher refund rate | Clear plan names with honest comparison |
| Blocking critical actions | Users feel trapped, generates churn | Allow continued use of existing features |
| Making downgrade difficult | Regulatory risk (especially in EU/CA) | One-click downgrade option |

---

## Platform-Specific Considerations

### iOS App Store

- Apple requires in-app purchase (IAP) for digital goods/services
- Apple takes 30% commission (15% for small business program)
- Must comply with App Store Review Guidelines 3.1
- Cannot link to external payment pages from within the app
- Must clearly communicate subscription terms and renewal

### Google Play

- Similar IAP requirements as iOS
- Google Play billing required for digital goods
- 15% commission on first $1M in annual revenue, then 30%
- Must provide clear subscription management

### Web App

- Full control over payment flow and presentation
- Can offer any payment method
- No platform commission
- Can A/B test freely without app review delays

---

## Metrics and Benchmarks

### Key Metrics

| Metric | Formula | Benchmark |
|--------|---------|-----------|
| Paywall impression rate | Users who see paywall / Active users | Track, no universal benchmark |
| Paywall CTR | Upgrade clicks / Paywall impressions | 5-15% |
| Upgrade completion rate | Completed upgrades / Upgrade clicks | 30-60% |
| Free-to-paid conversion | Paid users / Total free users | 2-5% for freemium, 15-30% for trial |
| Revenue per user (ARPU) | Total revenue / Active users | Segment-dependent |
| Post-upgrade churn (30-day) | Churned within 30 days / New paid users | < 10% |

### Warning Signals

| Signal | Diagnosis | Action |
|--------|-----------|--------|
| CTR < 3% | Paywall copy or timing is wrong | Test different triggers and messaging |
| Completion < 20% | Upgrade flow has too much friction | Simplify payment flow |
| Post-upgrade churn > 15% | Value not matching expectations | Review feature access and onboarding |
| Free-to-paid < 1% | Paywall appears before value is delivered | Delay triggers until after activation |

---

## A/B Test Framework

### High-Impact Tests

| Test | Hypothesis | Metric |
|------|-----------|--------|
| Trigger timing (earlier vs later) | Later trigger = higher conversion rate | Free-to-paid conversion |
| Soft gate vs hard gate | Soft gate (preview) converts better | Feature gate CTR |
| Copy variation | Value-focused vs urgency-focused | Paywall CTR |
| Price presentation | Monthly vs annual default | ARPU |

### Test Measurement

- Run for minimum 2 weeks or 100 conversions per variant
- Track upgrade rate AND 30-day post-upgrade retention
- A test that increases upgrades but increases churn is a net negative

---

## Output Artifacts

| Artifact | Format | Description |
|----------|--------|-------------|
| Paywall Trigger Map | Trigger x timing x frequency table | All trigger points with rules and cooldowns |
| Screen Copy Set | Complete screen designs | Headline, benefits, CTA, escape hatch for each paywall type |
| Upgrade Flow Diagram | Step-by-step flow | Paywall click to post-upgrade confirmation |
| Dark Pattern Audit | Checklist | Review of existing paywall for manipulative patterns |
| Trial Expiration Sequence | Day-by-day plan | In-app + email sequence for trial countdown |
| A/B Test Backlog | Prioritized table | Test ideas ranked by expected impact |

---

## Tool Reference

### 1. paywall_trigger_auditor.py

Audits paywall trigger configuration for timing, frequency, and coverage issues. Reads a JSON file of trigger rules and user event data, then flags misconfigured triggers, missing cooldowns, and dark-pattern risks.

```bash
python scripts/paywall_trigger_auditor.py triggers.json --format text
python scripts/paywall_trigger_auditor.py triggers.json --format json
```

| Flag | Type | Description |
|------|------|-------------|
| `triggers.json` | positional | Path to JSON file with trigger rules and event data |
| `--format` | optional | Output format: `text` (default) or `json` |

### 2. upgrade_funnel_analyzer.py

Analyzes upgrade funnel step-by-step conversion from paywall impression through payment completion. Identifies the highest-drop steps, calculates stage-over-stage conversion, and benchmarks against industry targets.

```bash
python scripts/upgrade_funnel_analyzer.py funnel.json --format text
python scripts/upgrade_funnel_analyzer.py funnel.json --format json
```

| Flag | Type | Description |
|------|------|-------------|
| `funnel.json` | positional | Path to JSON file with funnel step data |
| `--format` | optional | Output format: `text` (default) or `json` |

### 3. paywall_copy_scorer.py

Scores paywall screen copy against proven conversion patterns. Evaluates headline structure, benefit clarity, CTA strength, social proof presence, and dark-pattern risk. Outputs a 0-100 score with itemized feedback.

```bash
python scripts/paywall_copy_scorer.py copy.json --format text
python scripts/paywall_copy_scorer.py copy.json --format json
```

| Flag | Type | Description |
|------|------|-------------|
| `copy.json` | positional | Path to JSON file with paywall copy elements |
| `--format` | optional | Output format: `text` (default) or `json` |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Paywall CTR below 3% | Trigger fires before user reaches aha moment or copy is feature-focused instead of benefit-focused | Delay trigger until after activation event; rewrite headline to outcome-based messaging (lifts CTR up to 23% per Strava case study) |
| Upgrade completion below 20% | Too much friction in payment flow (redirects, missing payment methods, surprise charges) | Keep flow in-context (modal/slide-out), pre-fill known info, show price before payment step |
| Post-upgrade churn above 15% | Value expectation mismatch -- paid experience does not match what the paywall promised | Audit feature access post-upgrade, add guided tour of newly unlocked features, align copy with actual capabilities |
| Free-to-paid conversion below 1% | Paywall appears before value is delivered or free tier is too generous | Map activation events and ensure paywall only fires after aha moment; review free vs paid feature boundary |
| Users close paywall within 1 second repeatedly | Paywall is interrupting workflow or appearing too frequently | Increase cooldown to 7+ days after dismissal, cap at 3 per month, switch to less intrusive format (banner vs modal) |
| Mobile paywall underperforms desktop by >30% | iOS/Android IAP friction, small dismiss targets, or full-screen overlay on mobile | Ensure 44x44px touch targets, use bottom-sheet format on mobile, comply with App Store guidelines |
| Trial expiration emails have low open rate | Generic subject lines, wrong send timing, or email deliverability issues | Personalize with usage data ("You created 12 projects"), send at user's active hours, check spam score |

---

## Success Criteria

- Free-to-paid conversion rate reaches 2-5% for freemium models or 15-30% for trial models within 90 days of optimization
- Paywall CTR stabilizes at 5-15% across all trigger types
- Upgrade completion rate (paywall click to payment) exceeds 30%
- Post-upgrade 30-day retention exceeds 90% (churn below 10%)
- Paywall annoyance signals (sub-1-second dismissals) decrease to below 5% of impressions
- Zero dark patterns present in paywall audit (no shame copy, no hidden close buttons, no fake urgency)
- Annual plan adoption reaches 40%+ of new upgrades when annual toggle defaults are implemented (benchmark: 20-40% lift)

---

## Scope & Limitations

**In scope:** In-product upgrade flows including feature gates, usage limit screens, trial expiration sequences, upgrade trigger timing, save offer strategy, paywall screen design, and A/B test frameworks for freemium-to-paid and trial-to-paid conversion.

**Out of scope:** Public-facing pricing pages (use page-cro), the pricing model itself (use pricing-strategy), post-signup onboarding before the aha moment (use onboarding-cro), initial registration flows (use signup-flow-cro), and post-upgrade churn intervention (use churn-prevention). This skill does not cover App Store Optimization (ASO) or paid acquisition strategies. Scripts operate on local data only -- no integrations with payment processors, analytics platforms, or A/B testing tools.

**Limitations:** Conversion benchmarks are based on aggregate SaaS/app industry data and may vary significantly by vertical, price point, and audience. Mobile paywall performance is highly dependent on platform-specific IAP requirements (Apple 30% commission, Google Play billing). Scripts analyze static snapshots; real-time paywall optimization requires integration with analytics and experimentation platforms not provided here.

---

## Integration Points

- **pricing-strategy** -- Feed pricing tier structure and value metric into paywall copy and plan comparison design
- **onboarding-cro** -- Coordinate activation event definitions; paywall triggers should fire only after onboarding confirms aha moment
- **churn-prevention** -- Post-upgrade churn data feeds back into paywall expectation-setting; save offers should align with churn prevention playbook
- **page-cro** -- Public pricing page design feeds into in-app upgrade flow consistency; ensure messaging alignment
- **signup-flow-cro** -- Registration flow completion triggers trial start; trial duration and paywall timing depend on signup context
- **popup-cro** -- Share frequency capping logic and suppression rules; paywall modals follow same UX principles as marketing popups

---

## Related Skills

- **page-cro** -- Use for public pricing page optimization. Paywall-upgrade-cro handles in-product upgrade moments.
- **onboarding-cro** -- Use when users have not reached activation. Do not show paywalls before the aha moment.
- **pricing-strategy** -- Use when the pricing model itself needs redesigning (tier structure, value metric, price points).
- **churn-prevention** -- Use when users upgrade but then churn. If they never upgrade, the problem is here.
- **signup-flow-cro** -- Use for the initial registration flow. Paywall-upgrade-cro handles post-signup monetization.

---

## popup-cro

Source path: `references/business-growth/popup-cro/SKILL.md`

# Popup CRO

Production-grade popup optimization framework covering format selection, trigger engineering, audience targeting, frequency capping, copy design, compliance requirements, and structured A/B testing. Handles lead capture, promotional, announcement, and feedback popups across web and mobile.

---

## Table of Contents

- [Initial Assessment](#initial-assessment)
- [Format Selection Matrix](#format-selection-matrix)
- [Trigger Engineering](#trigger-engineering)
- [Audience Targeting](#audience-targeting)
- [Frequency and Suppression Rules](#frequency-and-suppression-rules)
- [Popup Copy Architecture](#popup-copy-architecture)
- [Strategy by Business Type](#strategy-by-business-type)
- [Mobile Popup Design](#mobile-popup-design)
- [Compliance Requirements](#compliance-requirements)
- [Multi-Popup Conflict Resolution](#multi-popup-conflict-resolution)
- [A/B Test Framework](#ab-test-framework)
- [Metrics and Benchmarks](#metrics-and-benchmarks)
- [Output Artifacts](#output-artifacts)
- [Related Skills](#related-skills)

---

## Clarify First

Before designing the popup, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Popup purpose** — lead capture, promotion, announcement, or feedback (selects format and trigger)
- [ ] **Existing popups running** — needed for multi-popup conflict and priority resolution
- [ ] **Visitor + device mix** — new vs returning, mobile vs desktop (drives targeting and mobile-safe format choice)
- [ ] **Compliance regime** — GDPR/CCPA consent requirements (constrains data capture and consent UX)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the strategy.

## Initial Assessment

### Required Context

| Question | Why It Matters |
|----------|---------------|
| What is the popup purpose? (lead capture, promotion, announcement, feedback) | Determines format and trigger |
| What existing popups are running? | Conflict resolution needed |
| What traffic sources? (paid, organic, direct) | Targeting and trigger strategy |
| New vs returning visitor split? | Personalization opportunity |
| Mobile vs desktop traffic split? | Mobile compliance requirements |
| Current popup performance? (if exists) | Baseline for optimization |
| Any compliance requirements? (GDPR, CCPA) | Legal constraints on data capture |

---

## Format Selection Matrix

| Format | Best For | Intrusiveness | Mobile Friendly | Conversion Rate |
|--------|----------|--------------|-----------------|-----------------|
| Center modal | High-value offers, exit intent | High | With adaptation | 3-10% |
| Slide-in (corner) | Newsletter, content offers | Low | Yes | 1-5% |
| Top bar | Announcements, promotions | Very low | Yes | 0.5-2% |
| Bottom bar | Cookie consent, CTAs | Very low | Yes | 0.5-2% |
| Full-screen overlay | Major promotions, welcome mats | Very high | No (Google penalizes) |2-8% |
| Inline expansion | Content upgrades within articles | Very low | Yes | 2-7% |
| Exit-intent modal | Final capture attempt | Medium | Desktop only | 2-5% |

### Format Decision Tree

```
What is the goal?
├── Lead capture (email)
│   ├── Blog/content page → Slide-in (scroll trigger) or inline expansion
│   ├── Landing page → Exit-intent modal
│   └── Homepage → Time-delayed center modal
├── Promotion/discount
│   ├── E-commerce → Center modal (entry or timed)
│   └── SaaS → Top bar with countdown
├── Announcement
│   ├── New feature → Top bar (sticky)
│   └── Event/webinar → Slide-in or center modal
└── Feedback/survey
    └── Post-interaction → Slide-in (bottom corner)
```

---

## Trigger Engineering

### Trigger Types and Use Cases

| Trigger | How It Works | Best For | Risk |
|---------|-------------|----------|------|
| Exit intent | Mouse moves toward browser close/back | Last-chance capture | Desktop only |
| Time delay | Appears after N seconds | Low-commitment offers | Too early = annoying |
| Scroll depth | Appears at N% scroll | Content-engaged visitors | Must calibrate to content length |
| Page count | Appears after N page views | Multi-visit engagement | Requires cookie tracking |
| Click trigger | User clicks a specific element | Lead magnets, CTAs | Requires obvious trigger element |
| Inactivity | No interaction for N seconds | Re-engagement | Can feel intrusive |

### Optimal Trigger Settings

| Trigger | Setting | Rationale |
|---------|---------|-----------|
| Time delay | 15-30 seconds | < 10s feels aggressive, > 60s misses visitors |
| Scroll depth | 50-70% | User has consumed enough content to be engaged |
| Page count | 2-3 pages | Visitor has shown interest beyond a single page |
| Exit intent | Mouse leaves viewport | Last opportunity before they leave |
| Click trigger | Prominent CTA button or text link | Explicit user intent |

### Trigger Combinations

Layer triggers for better targeting:

| Combination | When to Use |
|------------|-------------|
| Scroll 50% + Time 20s | Ensures both engagement and time on page |
| Page count 3 + Exit intent | Only show to visitors who have browsed multiple pages and are leaving |
| Click trigger + Email not captured | Only show form to non-subscribers |

---

## Audience Targeting

### Segmentation Rules

| Segment | Popup Strategy |
|---------|---------------|
| New visitors (first visit) | Welcome offer, newsletter signup, content upgrade |
| Returning visitors (2-5 visits) | Deeper offer, free trial, demo request |
| Returning visitors (5+ visits) | Direct CTA, consultation offer |
| Email subscribers | Never show email capture popup |
| Existing customers | Feature announcements, upgrade offers only |
| Paid traffic visitors | Message-matched offer, no generic popup |
| Mobile visitors | Non-intrusive format only (slide-in or bottom bar) |

### Exclusion Rules

Always exclude these segments from popups:

- Users who already converted (subscribed, signed up, purchased)
- Users who dismissed the same popup in this session
- Users who dismissed the same popup in the last 7 days
- Users in the checkout or payment flow
- Users on legal/compliance pages (privacy, terms)

---

## Frequency and Suppression Rules

### Frequency Caps

| Rule | Setting | Rationale |
|------|---------|-----------|
| Max popups per session | 1 | Multiple popups per visit destroys trust |
| Cooldown after dismissal | 7 days minimum | Respect the user's "no" |
| Cooldown after close (X button) | 3-7 days | Less aggressive than dismissal |
| Max popups per month | 3-4 | More than this and users feel harassed |
| Post-conversion suppression | Permanent for that popup type | Never ask again once they converted |

### Suppression Priority

If multiple popups compete for the same user in the same session, use this priority:

| Priority | Popup Type | Why |
|----------|-----------|-----|
| 1 | Cookie consent / legal | Required by law |
| 2 | Exit intent (if triggered) | Last chance, highest intent signal |
| 3 | Time-delayed / scroll-triggered | Planned engagement |
| 4 | Announcement bar | Lowest priority, always available |

---

## Popup Copy Architecture

### Anatomy of High-Converting Popup Copy

```
HEADLINE: What they get (benefit-focused, 6-10 words)
SUBHEADLINE: Why they should care (supporting detail, 1 sentence)
[FORM: Minimum fields]
[PRIMARY CTA: Action-oriented, 2-4 words]
[DECLINE TEXT: Respectful, neutral, 3-6 words]
[TRUST ELEMENT: Privacy or social proof, 1 line]
```

### Copy Examples by Type

**Newsletter Signup:**
- Headline: "Get Weekly Growth Tactics"
- Subheadline: "Join 15,000 marketers who get our Tuesday newsletter"
- CTA: "Subscribe"
- Decline: "No thanks"
- Trust: "Unsubscribe anytime. No spam."

**Content Upgrade:**
- Headline: "Get the Full SEO Checklist"
- Subheadline: "85 checks organized by priority. PDF download."
- CTA: "Send Me the Checklist"
- Decline: "I'll skip it"
- Trust: "Free. No credit card required."

**Exit Intent (E-commerce):**
- Headline: "Wait -- 15% Off Your First Order"
- Subheadline: "Use code WELCOME15 at checkout"
- CTA: "Claim My Discount"
- Decline: "I'll pay full price"
- Trust: "Valid for 24 hours"

### Decline Text Rules

- Never use shame language ("No, I don't want to save money")
- Keep it neutral: "No thanks", "Maybe later", "Not now", "I'll skip it"
- Font size should be readable (not tiny text designed to be missed)
- Position clearly below or beside the CTA

---

## Strategy by Business Type

### E-commerce

| Popup | Trigger | Offer |
|-------|---------|-------|
| Welcome discount | Entry (new visitors, 5-second delay) | 10-15% off first order |
| Exit intent | Mouse exit on product/cart page | Higher discount or free shipping |
| Cart abandonment | Return visit after cart abandonment | Reminder + incentive |
| Post-purchase | Thank you page | Referral offer or cross-sell |

### B2B SaaS

| Popup | Trigger | Offer |
|-------|---------|-------|
| Content upgrade | Scroll 50% on blog post | Related PDF, checklist, template |
| Demo request | Pricing page exit intent | "Talk to sales" with calendar link |
| Newsletter | Blog, 3rd page view | Weekly insights email |
| Feature announcement | Login, existing users | New feature with CTA to try it |

### Content / Media

| Popup | Trigger | Offer |
|-------|---------|-------|
| Newsletter | Scroll 60% on article | "Get articles like this weekly" |
| Content gate | After 3 free articles | Subscription or email for access |
| Social follow | Scroll bottom of article | Follow on social platforms |

---

## Mobile Popup Design

### Google Intrusive Interstitials Policy

Google penalizes mobile pages that show intrusive interstitials. Avoid:
- Full-screen popups that cover the main content
- Popups that the user must dismiss before accessing content
- Above-the-fold layouts where the popup pushes content below the fold

### Mobile-Safe Formats

| Format | Mobile Safe? | Notes |
|--------|-------------|-------|
| Bottom bar | Yes | Small, non-blocking |
| Top bar | Yes | Small, dismissable |
| Slide-in (small) | Yes | Corner, < 30% of screen |
| Center modal (small) | Conditional | Only if easily dismissable and shown after engagement |
| Full-screen overlay | No | Penalized by Google |
| Exit intent | N/A | Not available on mobile |

### Mobile Design Rules

- Touch targets minimum 44x44px for close button and CTA
- Close button (X) must be clearly visible and easily tappable
- Popup must not cover more than 50% of the screen
- Form inputs must trigger appropriate mobile keyboards
- Test on actual mobile devices (not just responsive preview)

---

## Compliance Requirements

### GDPR (EU)

- Checkbox for consent (pre-checked is not valid consent)
- Clear privacy policy link
- State what you will do with their email
- Easy unsubscribe in all subsequent emails
- Data processing purpose must be specified

### CCPA (California)

- "Do Not Sell My Personal Information" link if applicable
- Privacy policy must be accessible
- Users can request data deletion

### CAN-SPAM (US)

- Must honor unsubscribe requests within 10 business days
- Must include physical address in emails
- Subject lines cannot be deceptive

### Cookie Consent (EU/UK)

- Cookie consent banner takes priority over all other popups
- Must not set non-essential cookies before consent
- Must offer granular consent options

---

## Multi-Popup Conflict Resolution

### Priority System

If your site runs multiple popups, implement these rules:

1. **Legal popups first** -- Cookie consent before any other popup
2. **One popup per session** -- After legal popup, only one marketing popup
3. **Priority ranking** -- Exit intent > Scroll-triggered > Time-delayed > Announcement bar
4. **No stacking** -- Never show two popups simultaneously
5. **Queue system** -- If multiple popups qualify, show highest priority and suppress the rest for this session

### Implementation Rules

- Maintain a global popup state manager
- Each popup checks the state before rendering
- Record which popups the user has seen, dismissed, or converted on
- Share state across tabs if possible (localStorage)

---

## A/B Test Framework

### High-Impact Tests

| Test | Hypothesis | Metric |
|------|-----------|--------|
| Trigger timing (15s vs 30s vs scroll) | Scroll trigger captures more engaged users | Conversion rate + bounce rate |
| Offer type (discount vs content) | Content offers attract higher-quality leads | Conversion rate + lead quality |
| Copy variation (benefit vs urgency) | Benefit-focused converts better long-term | Conversion rate |
| Format (modal vs slide-in) | Slide-in has lower bounce impact | Conversion rate + bounce rate |
| Decline text (neutral vs shame-free) | Neutral decline text maintains trust | Brand sentiment + repeat visits |

### Test Rules

- Run each test for minimum 1,000 impressions per variant
- Track both popup conversion rate AND page-level metrics (bounce, time on page)
- A popup that converts 10% but increases bounce by 20% is a net negative

---

## Metrics and Benchmarks

### Key Metrics

| Metric | Formula | Benchmark |
|--------|---------|-----------|
| Popup conversion rate | Conversions / Impressions | 2-5% (good), 5-10% (excellent) |
| Popup view rate | Impressions / Eligible page views | Depends on trigger settings |
| Bounce rate impact | Bounce rate with popup - without | Should be < 5% increase |
| Email quality score | Popup leads who engage / Total popup leads | > 30% open subsequent emails |
| Revenue per popup lead | Revenue from popup leads / Total popup leads | Compare to other lead sources |

---

## Output Artifacts

| Artifact | Format | Description |
|----------|--------|-------------|
| Popup Strategy Map | Type x trigger x audience x frequency table | Complete popup inventory with conflict rules |
| Complete Copy Set | Per-popup copy | Headline, subheadline, CTA, decline text, trust element |
| Mobile Adaptation Guide | Per-format recommendations | Mobile-safe formats, sizing, dismiss behavior |
| Compliance Checklist | Per-regulation requirements | GDPR, CCPA, CAN-SPAM, cookie consent |
| A/B Test Plan | Prioritized table | Hypotheses ranked by expected impact |
| Multi-Popup Priority Map | Priority ranking | Conflict resolution rules for concurrent popups |

---

## Tool Reference

### 1. popup_strategy_auditor.py

Audits existing popup configurations for compliance, frequency conflicts, targeting gaps, and mobile safety. Reads a JSON inventory of popups and flags issues against best practices.

```bash
python scripts/popup_strategy_auditor.py popups.json --format text
python scripts/popup_strategy_auditor.py popups.json --format json
```

| Flag | Type | Description |
|------|------|-------------|
| `popups.json` | positional | Path to JSON file with popup inventory and rules |
| `--format` | optional | Output format: `text` (default) or `json` |

### 2. popup_ab_test_calculator.py

Calculates statistical significance for popup A/B tests. Takes impressions and conversions for control and variant, computes conversion rates, relative lift, confidence level, and recommends whether to ship, continue testing, or abandon.

```bash
python scripts/popup_ab_test_calculator.py test.json --format text
python scripts/popup_ab_test_calculator.py test.json --format json
```

| Flag | Type | Description |
|------|------|-------------|
| `test.json` | positional | Path to JSON file with A/B test data |
| `--format` | optional | Output format: `text` (default) or `json` |

### 3. popup_roi_estimator.py

Estimates revenue impact of popup lead capture by modeling lead volume, conversion rates, and customer lifetime value. Compares popup-sourced leads against other channels.

```bash
python scripts/popup_roi_estimator.py roi_data.json --format text
python scripts/popup_roi_estimator.py roi_data.json --format json
```

| Flag | Type | Description |
|------|------|-------------|
| `roi_data.json` | positional | Path to JSON file with popup performance and revenue data |
| `--format` | optional | Output format: `text` (default) or `json` |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Popup conversion rate below 2% | Wrong trigger timing, weak offer, or poor copy | Test scroll-triggered (50-70%) vs time-delayed; use benefit-focused headline; add countdown timer (lifts to 14.4% avg per 2026 benchmarks) |
| Bounce rate increases >5% after adding popup | Popup fires too early or covers too much screen on mobile | Increase time delay to 15-30s or switch to scroll trigger; use slide-in format instead of center modal |
| Email list quality drops (low open rates from popup leads) | Generic offer attracts low-intent subscribers | Switch to content upgrade offers specific to the page; add qualification question |
| Multiple popups fire in same session | No global popup state manager or priority system implemented | Implement session-level state tracking via localStorage; enforce one-popup-per-session rule with priority ranking |
| Mobile popup triggers Google penalty | Full-screen overlay or popup covers content before engagement | Switch to bottom bar, slide-in (<30% screen), or inline expansion format; test with Google Mobile-Friendly Tool |
| Exit-intent not working on mobile | Exit-intent relies on mouse movement which does not exist on mobile | Use scroll-up or inactivity trigger as mobile alternative; segment trigger rules by device type |
| Cookie consent popup conflicts with marketing popup | No priority system; both fire simultaneously | Legal popups always take priority; queue marketing popup to fire only after consent is given |

---

## Success Criteria

- Popup conversion rate reaches 3-5% (good) or 5-10% (excellent) within 30 days of optimization
- Bounce rate impact stays below 5% increase compared to no-popup baseline
- Email lead quality maintains >30% open rate on subsequent emails from popup-sourced leads
- Mobile popup compliance passes Google Mobile-Friendly Test with zero warnings
- Frequency capping limits impressions to max 1 per session and 3-4 per month per user
- Zero GDPR/CCPA compliance violations in popup consent flows
- Gamified or countdown-enhanced popups reach 13%+ average conversion rate (2026 benchmark)

---

## Scope & Limitations

**In scope:** Popup and modal format selection, trigger engineering, audience targeting, frequency capping, copy architecture, mobile-safe design, multi-popup conflict resolution, compliance requirements (GDPR, CCPA, CAN-SPAM, cookie consent), and structured A/B testing for lead capture, promotional, announcement, and feedback popups.

**Out of scope:** Form field-level optimization within popups (use form-cro), page-level conversion optimization around the popup (use page-cro), in-app onboarding modals and tooltips (use onboarding-cro), registration flows triggered by popups (use signup-flow-cro). Scripts operate on local data only -- no integrations with popup platforms (OptinMonster, Wisepops, etc.) or analytics tools.

**Limitations:** Conversion benchmarks are aggregate industry averages from 2025-2026 studies (Popupsmart 10K+ campaigns, Wisepops 1B+ displays) and vary significantly by industry, traffic source, and offer type. Exit-intent detection is desktop-only; mobile alternatives (scroll-up, inactivity) have different performance characteristics. Google intrusive interstitial penalties apply to mobile search traffic specifically -- direct/paid traffic is less affected.

---

## Integration Points

- **form-cro** -- Popup form fields should follow form-cro field reduction and validation standards
- **page-cro** -- Page conversion should be optimized before layering popups; popup performance depends on page quality
- **signup-flow-cro** -- Popup-to-signup handoff should maintain context and pre-fill captured email
- **paywall-upgrade-cro** -- In-app upgrade modals share frequency capping and UX principles with marketing popups
- **onboarding-cro** -- Product onboarding tooltips and modals should use separate state management from marketing popups
- **referral-program** -- Post-purchase or post-conversion popups can trigger referral program prompts

---

## Related Skills

- **form-cro** -- Use when the form inside the popup needs field-level optimization (field count, validation, layout).
- **page-cro** -- Use when the page surrounding the popup needs conversion optimization. Fix the page first, then add popups.
- **onboarding-cro** -- Use when popups/modals are part of in-app onboarding (tooltips, checklists, feature tours).
- **signup-flow-cro** -- Use when the popup leads into a registration flow that needs optimization.

---

## pricing-strategy

Source path: `references/business-growth/pricing-strategy/SKILL.md`

# Pricing Strategy

Production-grade SaaS pricing framework covering the three pricing axes (value metric, packaging, price point), value-based pricing methodology, tier architecture, pricing research methods, pricing page design, price increase execution, and competitive pricing positioning. Pricing is positioning -- the right price communicates as much about your product as your marketing does.

## Core Capabilities

- **Three pricing axes (in order)** — lock the value metric (how it scales), then packaging (what's in each tier), then test the price point (the number). Most teams skip to price point; that is backwards.
- **Value metric & tier design** — select a metric that scales with customer value and is hard to game; architect Good-Better-Best tiers with deliberate feature allocation and naming.
- **Value-based pricing** — price inside the corridor (above the next-best alternative, below perceived value), at 10-20% of documented value delivered.
- **Pricing research** — Van Westendorp, MaxDiff, competitor benchmarking, willingness-to-pay interviews.
- **Pricing page, price increases & competition** — page design (above/below fold, annual toggle), price-increase playbook (strategy, timeline, comms, impact), competitive positioning and health diagnostics.

## Use when

- The user asks to "design pricing", "set prices", or "choose a value metric"
- Pricing tiers need to be restructured (Good-Better-Best, add/remove tiers, repackage features)
- A price increase is planned and needs execution design (strategy, timing, communication, grandfathering)
- Conversion on the pricing page is flat or declining
- Freemium vs free trial decision needs to be made, or the freemium tier is cannibalizing paid
- Competitor pricing shifts require a positioning response
- The user says "our pricing feels off" or asks for a pricing audit

## Clarify First

Before designing the pricing, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Operating mode** — design from scratch, optimize existing, or price increase (each has a different validation gate and workflow)
- [ ] **Value metric** — how price scales (seats, usage, etc.) (must be locked before tiers and price points)
- [ ] **Current pricing + the symptom** — existing tiers and the specific failure, e.g. "middle tier too narrow" (optimize mode needs a named failure mode before any change)
- [ ] **Target segment + willingness-to-pay** — SMB vs enterprise price sensitivity (sets the value corridor and price points)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the deliverable.

## Operating Modes

- **Mode 1 — Design From Scratch:** No pricing exists or full rebuild needed. Work value metric → tier structure → price points → page design. *Validate:* value metric chosen before tier design; tiers locked before price points; price points tested against the corridor before page design.
- **Mode 2 — Optimize Existing Pricing:** Pricing exists but conversion is low, expansion flat, or customers feel mispriced. Audit, benchmark, find specific improvements. *Validate:* the diagnosis names a specific failure mode (e.g., "middle tier too narrow") before any change is proposed.
- **Mode 3 — Price Increase:** Prices need to go up without burning relationships. *Validate:* grandfather policy defined, communication window set (90+ days for annual customers), and expected churn modeled before the first notice.

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/pricing-models.md](references/pricing-models.md)** — the three pricing axes, value metric selection (table, criteria, red flags), tier architecture (Good-Better-Best, feature allocation, naming), and value-based pricing corridor. Read when designing or restructuring pricing.
- **[references/research-and-page-design.md](references/research-and-page-design.md)** — Van Westendorp, MaxDiff, competitor benchmarking, WTP interviews, pricing page design, and the freemium vs free trial decision. Read when researching willingness-to-pay or designing the page.
- **[references/price-increase-and-competitive.md](references/price-increase-and-competitive.md)** — price increase strategy/timeline/comms/impact, competitive position map and positioning strategy, and pricing health signals. Read when raising prices or positioning against competitors.
- **[references/tools-and-diagnostics.md](references/tools-and-diagnostics.md)** — output artifacts, the three Python scripts (analyzer, sensitivity calculator, increase modeler), troubleshooting table, success criteria, and anti-patterns. Read when producing deliverables, running tools, or debugging a pricing problem.

## Scope & Limitations

**In scope:** Value metric selection, tier architecture design, price point research (Van Westendorp, competitor benchmarking, willingness-to-pay interviews), pricing page design specifications, price increase strategy and execution, freemium vs free trial decision frameworks, competitive pricing analysis and positioning, and pricing health diagnostics.

**Out of scope:** Pricing page visual design and CRO (use page-cro), in-app upgrade prompts and paywalls (use paywall-upgrade-cro), signup flow optimization after pricing page (use signup-flow-cro), churn intervention when churn is the root cause (use churn-prevention), and full competitive analysis beyond pricing (use competitive-teardown). Scripts do not integrate with billing systems (Stripe, Chargebee, etc.) or analytics platforms.

**Limitations:** Van Westendorp analysis requires minimum 30 survey respondents for statistical validity. Pricing benchmarks are based on aggregate SaaS industry data and vary significantly by vertical, company stage, and geography. Credit-based and usage-based pricing models (growing to 38% of SaaS in 2026) have different optimization dynamics than flat-rate or per-seat models. Price elasticity varies by customer segment -- enterprise buyers are less price-sensitive than SMB.

## Integration Points

- **page-cro** -- Pricing page layout, CTA placement, and social proof design should follow page-cro best practices
- **paywall-upgrade-cro** -- In-app upgrade screens must reflect the same tier structure and messaging as the public pricing page
- **competitive-teardown** -- Competitive pricing data from teardowns feeds directly into pricing position map and tier design
- **churn-prevention** -- Churn analysis by price point and tier informs whether pricing is causing retention issues
- **signup-flow-cro** -- Signup flow design depends on pricing model (CC-required vs free trial vs freemium)
- **revenue-operations** -- GTM efficiency metrics (LTV:CAC, Magic Number) validate whether pricing supports unit economics

## Related Skills

- **page-cro** -- Use for optimizing the pricing page conversion rate (layout, CTA, social proof). Not for pricing structure or tier design.
- **churn-prevention** -- Use when churn is the underlying issue. Fix retention before raising prices.
- **competitive-teardown** -- Use for comprehensive competitive analysis. Feed teardown pricing data into this skill.
- **paywall-upgrade-cro** -- Use for in-app upgrade prompts and paywalls. Different from public pricing page design.
- **signup-flow-cro** -- Use for optimizing the signup flow that follows pricing page conversion.

---

## referral-program

Source path: `references/business-growth/referral-program/SKILL.md`

# Referral Program

Production-grade referral and affiliate program framework covering the 4-stage referral loop, incentive design methodology, trigger moment optimization, share mechanics, viral coefficient modeling, affiliate program architecture, and systematic optimization playbook. Designed to build programs that compound, not collect dust.

## Core Capabilities

- **Program type & loop design** — referral vs affiliate decision, plus the 4-stage loop (trigger → share → convert → reward)
- **Incentive design** — single- vs double-sided, reward types, tiered gamification, reward economics against LTV/CAC
- **Trigger & share mechanics** — in-product and email trigger points, share channel priority, first-person share copy
- **Referred-user experience** — referral landing page, attribution rules, program copy set (prompts, emails, dashboards)
- **Growth math** — K-factor modeling, revenue impact models, and lever-by-lever K improvement
- **Affiliate framework** — commission models, tier systems, partner toolkit, recruitment
- **Optimization** — diagnose-before-optimize playbook, metric benchmarks, troubleshooting, and three Python tools

## When to Use

- The user asks to "design a referral program", "launch an affiliate program", or "improve viral growth"
- The decision between customer referral vs affiliate program needs to be made
- An existing referral program has stalled (K-factor <1, low share rate, low referred-user conversion)
- Reward structure needs sizing against CAC, margin, or LTV
- Trigger moments need to be identified (when to ask, which in-product events, which lifecycle emails)
- The user says "word-of-mouth isn't working" or "we want to add a refer-a-friend flow"

## Clarify First

Before designing the referral program, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Program type** — customer referral vs affiliate (enthusiastic/social customers vs team buyers) (selects the entire framework)
- [ ] **Trigger moment** — the in-product or lifecycle point where you ask (a broken Stage 1 can't be fixed by a bigger reward at Stage 4)
- [ ] **Reward economics** — first-payment value, margin, and CAC (caps the reward at <30% of first payment)
- [ ] **Current referral rate (if any)** — decides single- vs double-sided incentive and which stage to fix first

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the deliverable.

## Quick Start

1. **Pick the program type** — use the Referral vs Affiliate Decision table (enthusiastic/social customers → referral; team buyers → affiliate).
2. **Build the loop in order** — trigger → share → convert → reward; a broken Stage 1 can't be fixed by a bigger reward at Stage 4.
3. **Size the incentive** — cap reward at <30% of first payment; go double-sided if referral rate <1%.
4. **Model and validate** — run the scripts (`referral_economics_calculator.py`, `referral_funnel_analyzer.py`, `affiliate_commission_modeler.py`) to size rewards, find the weakest stage, and model affiliate tiers.
5. **Optimize by priority** — fix awareness first, then share flow, then referred experience, then the incentive.

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/loop-and-incentives.md](references/loop-and-incentives.md)** — Referral vs Affiliate decision table, the full 4-stage loop with per-stage tables, incentive design (single/double-sided, reward types, tiers, economics), and trigger moment architecture. Read when designing the core program.
- **[references/share-and-experience.md](references/share-and-experience.md)** — share channel priority, share message templates, referral landing page layout, attribution rules, and the program copy set (in-app prompt, dashboard, post-activation email). Read when building the sharing flow and referred-user experience.
- **[references/modeling-and-affiliate.md](references/modeling-and-affiliate.md)** — K-factor calculation and improvement levers, plus the full affiliate framework (commission structure, tier system, toolkit, recruitment). Read when modeling growth math or designing an affiliate program.
- **[references/optimization-and-operations.md](references/optimization-and-operations.md)** — optimization playbook, key metrics and benchmarks, revenue impact model, output artifacts, full tool reference, troubleshooting table, success criteria, and anti-patterns. Read when diagnosing a stalled program or operating the scripts.

## Scope & Limitations

**In scope:** Customer referral program design (4-stage loop), incentive structure (single-sided, double-sided, tiered), trigger moment architecture, share mechanics, referral landing page specifications, viral coefficient modeling, affiliate program framework (commission models, tier systems, recruitment), and systematic optimization playbook.

**Out of scope:** Referral landing page visual design and CRO (use page-cro), signup flow optimization for referred users (use signup-flow-cro), post-signup onboarding for referred users (use onboarding-cro), churn prevention for referred customers (use churn-prevention), and reward pricing alignment (use pricing-strategy). Scripts operate on local data only -- no integrations with referral platforms (ReferralHero, Viral Loops, PartnerStack, etc.).

**Limitations:** K-factor benchmarks assume consumer or prosumer SaaS; B2B enterprise referral programs have different dynamics (lower K but higher per-referral value). Affiliate commission benchmarks (20-30% recurring) are SaaS-specific; marketplace and e-commerce commissions follow different models. Attribution windows (30-90 day cookies) face increasing limitations from browser privacy features (Safari ITP, Chrome third-party cookie deprecation). Revenue projections are estimates based on provided conversion rates.

## Integration Points

- **pricing-strategy** -- Referral reward sizing must align with pricing margins and LTV; reward should be <30% of first payment
- **signup-flow-cro** -- Referred user signup flow should pre-fill email, show referrer context, and minimize friction
- **onboarding-cro** -- Referred users may need different onboarding path (they arrive with context from the referrer)
- **churn-prevention** -- Monitor referred customer retention separately; high referral churn wastes acquisition spend
- **page-cro** -- Referral landing page conversion optimization follows page-cro methodology
- **popup-cro** -- Post-purchase or post-milestone popups are natural referral trigger points

---

## revenue-operations

Source path: `references/business-growth/revenue-operations/SKILL.md`

# Revenue Operations

Pipeline analysis, forecast accuracy tracking, and GTM efficiency measurement for SaaS revenue teams.

## Table of Contents

- [Quick Start](#quick-start)
- [Tools Overview](#tools-overview)
  - [Pipeline Analyzer](#1-pipeline-analyzer)
  - [Forecast Accuracy Tracker](#2-forecast-accuracy-tracker)
  - [GTM Efficiency Calculator](#3-gtm-efficiency-calculator)
- [Revenue Operations Workflows](#revenue-operations-workflows)
  - [Weekly Pipeline Review](#weekly-pipeline-review)
  - [Forecast Accuracy Review](#forecast-accuracy-review)
  - [GTM Efficiency Audit](#gtm-efficiency-audit)
  - [Quarterly Business Review](#quarterly-business-review)
- [Reference Documentation](#reference-documentation)
- [Templates](#templates)

---

## Clarify First

Before running the analysis, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which analysis** — pipeline health, forecast accuracy, or GTM efficiency (selects the script and its input schema)
- [ ] **Quota / target** — the number pipeline coverage and Magic Number are measured against
- [ ] **Data export readiness** — deals with stage/value/age/close-date, or forecast-vs-actual periods (the tools consume specific JSON; forecast trend needs 3+ periods)
- [ ] **Company stage + sales motion** — seed vs growth, PLG vs enterprise (benchmarks vary widely by stage and motion)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the output.

## Quick Start

```bash
# Analyze pipeline health and coverage
python scripts/pipeline_analyzer.py --input assets/sample_pipeline_data.json --format text

# Track forecast accuracy over multiple periods
python scripts/forecast_accuracy_tracker.py assets/sample_forecast_data.json --format text

# Calculate GTM efficiency metrics
python scripts/gtm_efficiency_calculator.py assets/sample_gtm_data.json --format text
```

---

## Tools Overview

### 1. Pipeline Analyzer

Analyzes sales pipeline health including coverage ratios, stage conversion rates, deal velocity, aging risks, and concentration risks.

**Input:** JSON file with deals, quota, and stage configuration
**Output:** Coverage ratios, conversion rates, velocity metrics, aging flags, risk assessment

**Usage:**

```bash
# Text report (human-readable)
python scripts/pipeline_analyzer.py --input pipeline.json --format text

# JSON output (for dashboards/integrations)
python scripts/pipeline_analyzer.py --input pipeline.json --format json
```

**Key Metrics Calculated:**
- **Pipeline Coverage Ratio** -- Total pipeline value / quota target (healthy: 3-4x)
- **Stage Conversion Rates** -- Stage-to-stage progression rates
- **Sales Velocity** -- (Opportunities x Avg Deal Size x Win Rate) / Avg Sales Cycle
- **Deal Aging** -- Flags deals exceeding 2x average cycle time per stage
- **Concentration Risk** -- Warns when >40% of pipeline is in a single deal
- **Coverage Gap Analysis** -- Identifies quarters with insufficient pipeline

**Input Schema:**

```json
{
  "quota": 500000,
  "stages": ["Discovery", "Qualification", "Proposal", "Negotiation", "Closed Won"],
  "average_cycle_days": 45,
  "deals": [
    {
      "id": "D001",
      "name": "Acme Corp",
      "stage": "Proposal",
      "value": 85000,
      "age_days": 32,
      "close_date": "2025-03-15",
      "owner": "rep_1"
    }
  ]
}
```

### 2. Forecast Accuracy Tracker

Tracks forecast accuracy over time using MAPE, detects systematic bias, analyzes trends, and provides category-level breakdowns.

**Input:** JSON file with forecast periods and optional category breakdowns
**Output:** MAPE score, bias analysis, trends, category breakdown, accuracy rating

**Usage:**

```bash
# Track forecast accuracy
python scripts/forecast_accuracy_tracker.py forecast_data.json --format text

# JSON output for trend analysis
python scripts/forecast_accuracy_tracker.py forecast_data.json --format json
```

**Key Metrics Calculated:**
- **MAPE** -- Mean Absolute Percentage Error: mean(|actual - forecast| / |actual|) x 100
- **Forecast Bias** -- Over-forecasting (positive) vs under-forecasting (negative) tendency
- **Weighted Accuracy** -- MAPE weighted by deal value for materiality
- **Period Trends** -- Improving, stable, or declining accuracy over time
- **Category Breakdown** -- Accuracy by rep, product, segment, or any custom dimension

**Accuracy Ratings:**
| Rating | MAPE Range | Interpretation |
|--------|-----------|----------------|
| Excellent | <10% | Highly predictable, data-driven process |
| Good | 10-15% | Reliable forecasting with minor variance |
| Fair | 15-25% | Needs process improvement |
| Poor | >25% | Significant forecasting methodology gaps |

**Input Schema:**

```json
{
  "forecast_periods": [
    {"period": "2025-Q1", "forecast": 480000, "actual": 520000},
    {"period": "2025-Q2", "forecast": 550000, "actual": 510000}
  ],
  "category_breakdowns": {
    "by_rep": [
      {"category": "Rep A", "forecast": 200000, "actual": 210000},
      {"category": "Rep B", "forecast": 280000, "actual": 310000}
    ]
  }
}
```

### 3. GTM Efficiency Calculator

Calculates core SaaS GTM efficiency metrics with industry benchmarking, ratings, and improvement recommendations.

**Input:** JSON file with revenue, cost, and customer metrics
**Output:** Magic Number, LTV:CAC, CAC Payback, Burn Multiple, Rule of 40, NDR with ratings

**Usage:**

```bash
# Calculate all GTM efficiency metrics
python scripts/gtm_efficiency_calculator.py gtm_data.json --format text

# JSON output for dashboards
python scripts/gtm_efficiency_calculator.py gtm_data.json --format json
```

**Key Metrics Calculated:**

| Metric | Formula | Target |
|--------|---------|--------|
| Magic Number | Net New ARR / Prior Period S&M Spend | >0.75 |
| LTV:CAC | (ARPA x Gross Margin / Churn Rate) / CAC | >3:1 |
| CAC Payback | CAC / (ARPA x Gross Margin) months | <18 months |
| Burn Multiple | Net Burn / Net New ARR | <2x |
| Rule of 40 | Revenue Growth % + FCF Margin % | >40% |
| Net Dollar Retention | (Begin ARR + Expansion - Contraction - Churn) / Begin ARR | >110% |

**Input Schema:**

```json
{
  "revenue": {
    "current_arr": 5000000,
    "prior_arr": 3800000,
    "net_new_arr": 1200000,
    "arpa_monthly": 2500,
    "revenue_growth_pct": 31.6
  },
  "costs": {
    "sales_marketing_spend": 1800000,
    "cac": 18000,
    "gross_margin_pct": 78,
    "total_operating_expense": 6500000,
    "net_burn": 1500000,
    "fcf_margin_pct": 8.4
  },
  "customers": {
    "beginning_arr": 3800000,
    "expansion_arr": 600000,
    "contraction_arr": 100000,
    "churned_arr": 300000,
    "annual_churn_rate_pct": 8
  }
}
```

---

## Revenue Operations Workflows

### Weekly Pipeline Review

Use this workflow for your weekly pipeline inspection cadence.

1. **Generate pipeline report:**
   ```bash
   python scripts/pipeline_analyzer.py --input current_pipeline.json --format text
   ```

2. **Review key indicators:**
   - Pipeline coverage ratio (is it above 3x quota?)
   - Deals aging beyond threshold (which deals need intervention?)
   - Concentration risk (are we over-reliant on a few large deals?)
   - Stage distribution (is there a healthy funnel shape?)

3. **Document using template:** Use `assets/pipeline_review_template.md`

4. **Action items:** Address aging deals, redistribute pipeline concentration, fill coverage gaps

### Forecast Accuracy Review

Use monthly or quarterly to evaluate and improve forecasting discipline.

1. **Generate accuracy report:**
   ```bash
   python scripts/forecast_accuracy_tracker.py forecast_history.json --format text
   ```

2. **Analyze patterns:**
   - Is MAPE trending down (improving)?
   - Which reps or segments have the highest error rates?
   - Is there systematic over- or under-forecasting?

3. **Document using template:** Use `assets/forecast_report_template.md`

4. **Improvement actions:** Coach high-bias reps, adjust methodology, improve data hygiene

### GTM Efficiency Audit

Use quarterly or during board prep to evaluate go-to-market efficiency.

1. **Calculate efficiency metrics:**
   ```bash
   python scripts/gtm_efficiency_calculator.py quarterly_data.json --format text
   ```

2. **Benchmark against targets:**
   - Magic Number signals GTM spend efficiency
   - LTV:CAC validates unit economics
   - CAC Payback shows capital efficiency
   - Rule of 40 balances growth and profitability

3. **Document using template:** Use `assets/gtm_dashboard_template.md`

4. **Strategic decisions:** Adjust spend allocation, optimize channels, improve retention

### Quarterly Business Review

Combine all three tools for a comprehensive QBR analysis.

1. Run pipeline analyzer for forward-looking coverage
2. Run forecast tracker for backward-looking accuracy
3. Run GTM calculator for efficiency benchmarks
4. Cross-reference pipeline health with forecast accuracy
5. Align GTM efficiency metrics with growth targets

---

## Reference Documentation

| Reference | Description |
|-----------|-------------|
| [RevOps Metrics Guide](references/revops-metrics-guide.md) | Complete metrics hierarchy, definitions, formulas, and interpretation |
| [Pipeline Management Framework](references/pipeline-management-framework.md) | Pipeline best practices, stage definitions, conversion benchmarks |
| [GTM Efficiency Benchmarks](references/gtm-efficiency-benchmarks.md) | SaaS benchmarks by stage, industry standards, improvement strategies |

---

## Templates

| Template | Use Case |
|----------|----------|
| [Pipeline Review Template](assets/pipeline_review_template.md) | Weekly/monthly pipeline inspection documentation |
| [Forecast Report Template](assets/forecast_report_template.md) | Forecast accuracy reporting and trend analysis |
| [GTM Dashboard Template](assets/gtm_dashboard_template.md) | GTM efficiency dashboard for leadership review |
| [Sample Pipeline Data](assets/sample_pipeline_data.json) | Example input for pipeline_analyzer.py |
| [Expected Output](assets/expected_output.json) | Reference output from pipeline_analyzer.py |

---

## Tool Reference

### 1. pipeline_analyzer.py

Analyzes sales pipeline health including coverage ratios, stage conversion rates, sales velocity, deal aging risks, and concentration risks.

```bash
python scripts/pipeline_analyzer.py --input pipeline.json --format text
python scripts/pipeline_analyzer.py --input pipeline.json --format json
```

| Flag | Type | Description |
|------|------|-------------|
| `--input` | required | Path to JSON file with deals, quota, and stage configuration |
| `--format` | optional | Output format: `text` (default) or `json` |

### 2. forecast_accuracy_tracker.py

Tracks forecast accuracy over time using MAPE, detects systematic bias, analyzes trends, and provides category-level breakdowns.

```bash
python scripts/forecast_accuracy_tracker.py forecast_data.json --format text
python scripts/forecast_accuracy_tracker.py forecast_data.json --format json
```

| Flag | Type | Description |
|------|------|-------------|
| `forecast_data.json` | positional | Path to JSON file with forecast periods and optional category breakdowns |
| `--format` | optional | Output format: `text` (default) or `json` |

### 3. gtm_efficiency_calculator.py

Calculates core SaaS GTM efficiency metrics with industry benchmarking, ratings, and improvement recommendations.

```bash
python scripts/gtm_efficiency_calculator.py gtm_data.json --format text
python scripts/gtm_efficiency_calculator.py gtm_data.json --format json
```

| Flag | Type | Description |
|------|------|-------------|
| `gtm_data.json` | positional | Path to JSON file with revenue, cost, and customer metrics |
| `--format` | optional | Output format: `text` (default) or `json` |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Pipeline coverage below 3x quota | Insufficient top-of-funnel activity or poor lead-to-opportunity conversion | Audit lead sources and conversion rates by stage; increase outbound activity or marketing spend in underperforming channels |
| Forecast MAPE above 25% | Inconsistent deal stage criteria, sandbagging, or lack of inspection rigor | Standardize stage exit criteria; implement weekly pipeline reviews tied to velocity not just activity; coach high-bias reps individually |
| Magic Number below 0.5 | GTM spend is inefficient relative to new ARR generated | Review channel ROI; reduce spend in low-performing channels; improve rep productivity before adding headcount |
| LTV:CAC below 3:1 | CAC too high or churn eroding lifetime value | Address churn first (use churn-prevention skill); then optimize CAC by shifting to lower-cost acquisition channels |
| Deals slipping past forecast close date | Lack of deal qualification, missing champion, or no compelling event | Implement MEDDIC/BANT qualification; require compelling event documentation for commit-stage deals |
| Pipeline heavily concentrated in early stages | Poor stage progression indicating stalled deals or loose qualification | Set maximum stage age limits; implement automated alerts for deals exceeding 2x average cycle per stage |
| Net Dollar Retention below 100% | Contraction and churn outpacing expansion revenue | Prioritize expansion playbooks for healthy accounts; conduct exit interviews for churning accounts; review pricing tier structure |

---

## Success Criteria

- Pipeline coverage ratio stabilizes at 3-4x quota with healthy stage distribution
- Forecast MAPE improves to below 15% (Good) or below 10% (Excellent) within two quarters
- Magic Number exceeds 0.75 indicating efficient GTM spend
- LTV:CAC ratio exceeds 3:1 with CAC payback under 18 months
- Rule of 40 score exceeds 40% (revenue growth % + FCF margin %)
- Net Dollar Retention exceeds 110% driven by expansion revenue
- Deal slippage rate drops below 30% (improved from 2024 industry average of 44%)

---

## Scope & Limitations

**In scope:** Pipeline health analysis (coverage, velocity, aging, concentration), forecast accuracy measurement (MAPE, bias, trends, category breakdowns), GTM efficiency metrics (Magic Number, LTV:CAC, CAC Payback, Burn Multiple, Rule of 40, NDR), weekly/monthly/quarterly review workflows, and QBR preparation combining all three analysis dimensions.

**Out of scope:** CRM system administration or data extraction (tools consume JSON exports), deal-level sales coaching (tools flag deals but do not prescribe sales tactics), marketing attribution modeling, customer success health scoring (use customer-success-manager skill), and real-time pipeline monitoring. Tools analyze point-in-time snapshots; continuous monitoring requires integration with CRM/BI platforms.

**Limitations:** Benchmarks are based on aggregate SaaS industry data and vary by company stage (seed, Series A-C, growth, public), vertical, and sales motion (PLG vs enterprise). Pipeline analysis assumes deal data includes accurate stage, value, age, and close date fields. Forecast accuracy requires minimum 3 periods for trend analysis. GTM metrics require accurate financial data that may not be available in early-stage companies.

---

## Integration Points

- **sales-engineer** -- Pipeline deals requiring technical validation route through sales-engineer POC and RFP workflows
- **customer-success-manager** -- Post-close handoff; NDR metrics depend on customer success health scoring and expansion plays
- **pricing-strategy** -- Pricing model impacts pipeline velocity, deal sizes, and conversion rates; pricing changes require pipeline reforecasting
- **churn-prevention** -- Churn rate directly impacts LTV:CAC and NDR metrics; reducing churn improves all GTM efficiency measures
- **c-level-advisor** -- GTM efficiency metrics feed directly into board-level reporting and strategic resource allocation decisions

---

## sales-engineer

Source path: `references/business-growth/sales-engineer/SKILL.md`

# Sales Engineer Skill

A production-ready skill package for pre-sales engineering that bridges technical expertise and sales execution. Provides automated analysis for RFP/RFI responses, competitive positioning, and proof-of-concept planning.

## Overview

**Role:** Sales Engineer / Solutions Architect
**Domain:** Pre-Sales Engineering, Solution Design, Technical Demos, Proof of Concepts
**Business Type:** SaaS / Pre-Sales Engineering

### What This Skill Does

- **RFP/RFI Response Analysis** - Score requirement coverage, identify gaps, generate bid/no-bid recommendations
- **Competitive Technical Positioning** - Build feature comparison matrices, identify differentiators and vulnerabilities
- **POC Planning** - Generate timelines, resource plans, success criteria, and evaluation scorecards
- **Demo Preparation** - Structure demo scripts with talking points and objection handling
- **Technical Proposal Creation** - Framework for solution architecture and implementation planning
- **Win/Loss Analysis** - Data-driven competitive assessment for deal strategy

### Key Metrics

| Metric | Description | Target |
|--------|-------------|--------|
| Win Rate | Deals won / total opportunities | >30% |
| Sales Cycle Length | Average days from discovery to close | <90 days |
| POC Conversion Rate | POCs resulting in closed deals | >60% |
| Customer Engagement Score | Stakeholder participation in evaluation | >75% |
| RFP Coverage Score | Requirements fully addressed | >80% |

## Clarify First

Before producing the deliverable, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which deliverable** — RFP/RFI coverage analysis, competitive matrix, or POC plan (selects the tool and phase)
- [ ] **Customer requirements + priorities** — the must/should/nice-to-have list (drives weighted coverage and the bid/no-bid call)
- [ ] **Competitor(s) in the deal** — needed for the feature matrix, differentiators, and battlecard
- [ ] **POC scope + success criteria** — when planning a POC, the use cases and measurable go/no-go bar (prevents an unbounded POC)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the deliverable.

## 5-Phase Workflow

### Phase 1: Discovery & Research

**Objective:** Understand customer requirements, technical environment, and business drivers.

**Activities:**
1. Conduct technical discovery calls with stakeholders
2. Map customer's current architecture and pain points
3. Identify integration requirements and constraints
4. Document security and compliance requirements
5. Assess competitive landscape for this opportunity

**Tools:** Use `rfp_response_analyzer.py` to score initial requirement alignment.

**Output:** Technical discovery document, requirement map, initial coverage assessment.

### Phase 2: Solution Design

**Objective:** Design a solution architecture that addresses customer requirements.

**Activities:**
1. Map product capabilities to customer requirements
2. Design integration architecture
3. Identify customization needs and development effort
4. Build competitive differentiation strategy
5. Create solution architecture diagrams

**Tools:** Use `competitive_matrix_builder.py` to identify differentiators and vulnerabilities.

**Output:** Solution architecture, competitive positioning, technical differentiation strategy.

### Phase 3: Demo Preparation & Delivery

**Objective:** Deliver compelling technical demonstrations tailored to stakeholder priorities.

**Activities:**
1. Build demo environment matching customer's use case
2. Create demo script with talking points per stakeholder role
3. Prepare objection handling responses
4. Rehearse failure scenarios and recovery paths
5. Collect feedback and adjust approach

**Templates:** Use `demo_script_template.md` for structured demo preparation.

**Output:** Customized demo, stakeholder-specific talking points, feedback capture.

### Phase 4: POC & Evaluation

**Objective:** Execute a structured proof-of-concept that validates the solution.

**Activities:**
1. Define POC scope, success criteria, and timeline
2. Allocate resources and set up environment
3. Execute phased testing (core, advanced, edge cases)
4. Track progress against success criteria
5. Generate evaluation scorecard

**Tools:** Use `poc_planner.py` to generate the complete POC plan.

**Templates:** Use `poc_scorecard_template.md` for evaluation tracking.

**Output:** POC plan, evaluation scorecard, go/no-go recommendation.

### Phase 5: Proposal & Closing

**Objective:** Deliver a technical proposal that supports the commercial close.

**Activities:**
1. Compile POC results and success metrics
2. Create technical proposal with implementation plan
3. Address outstanding objections with evidence
4. Support pricing and packaging discussions
5. Conduct win/loss analysis post-decision

**Templates:** Use `technical_proposal_template.md` for the proposal document.

**Output:** Technical proposal, implementation timeline, risk mitigation plan.

## Python Automation Tools

### 1. RFP Response Analyzer

**Script:** `scripts/rfp_response_analyzer.py`

**Purpose:** Parse RFP/RFI requirements, score coverage, identify gaps, and generate bid/no-bid recommendations.

**Coverage Categories:**
- **Full (100%)** - Requirement fully met by current product
- **Partial (50%)** - Requirement partially met, workaround or configuration needed
- **Planned (25%)** - On product roadmap, not yet available
- **Gap (0%)** - Not supported, no current plan

**Priority Weighting:**
- Must-Have: 3x weight
- Should-Have: 2x weight
- Nice-to-Have: 1x weight

**Bid/No-Bid Logic:**
- **Bid:** Coverage score >70% AND must-have gaps <=3
- **Conditional Bid:** Coverage score 50-70% OR must-have gaps 2-3
- **No-Bid:** Coverage score <50% OR must-have gaps >3

**Usage:**
```bash
# Human-readable output
python scripts/rfp_response_analyzer.py assets/sample_rfp_data.json

# JSON output
python scripts/rfp_response_analyzer.py assets/sample_rfp_data.json --format json

# Help
python scripts/rfp_response_analyzer.py --help
```

**Input Format:** See `assets/sample_rfp_data.json` for the complete schema.

### 2. Competitive Matrix Builder

**Script:** `scripts/competitive_matrix_builder.py`

**Purpose:** Generate feature comparison matrices, calculate competitive scores, identify differentiators and vulnerabilities.

**Feature Scoring:**
- **Full (3)** - Complete feature support
- **Partial (2)** - Partial or limited feature support
- **Limited (1)** - Minimal or basic feature support
- **None (0)** - Feature not available

**Usage:**
```bash
# Human-readable output
python scripts/competitive_matrix_builder.py competitive_data.json

# JSON output
python scripts/competitive_matrix_builder.py competitive_data.json --format json
```

**Output Includes:**
- Feature comparison matrix with scores
- Weighted competitive scores per product
- Differentiators (features where our product leads)
- Vulnerabilities (features where competitors lead)
- Win themes based on differentiators

### 3. POC Planner

**Script:** `scripts/poc_planner.py`

**Purpose:** Generate structured POC plans with timeline, resource allocation, success criteria, and evaluation scorecards.

**Default Phase Breakdown:**
- **Week 1:** Setup - Environment provisioning, data migration, configuration
- **Weeks 2-3:** Core Testing - Primary use cases, integration testing
- **Week 4:** Advanced Testing - Edge cases, performance, security
- **Week 5:** Evaluation - Scorecard completion, stakeholder review, go/no-go

**Usage:**
```bash
# Human-readable output
python scripts/poc_planner.py poc_data.json

# JSON output
python scripts/poc_planner.py poc_data.json --format json
```

**Output Includes:**
- POC plan with phased timeline
- Resource allocation (SE, engineering, customer)
- Success criteria with measurable metrics
- Evaluation scorecard (functionality, performance, integration, usability, support)
- Risk register with mitigation strategies
- Go/No-Go recommendation framework

## Reference Knowledge Bases

| Reference | Description |
|-----------|-------------|
| `references/rfp-response-guide.md` | RFP/RFI response best practices, compliance matrix, bid/no-bid framework |
| `references/competitive-positioning-framework.md` | Competitive analysis methodology, battlecard creation, objection handling |
| `references/poc-best-practices.md` | POC planning methodology, success criteria, evaluation frameworks |

## Asset Templates

| Template | Purpose |
|----------|---------|
| `assets/technical_proposal_template.md` | Technical proposal with executive summary, solution architecture, implementation plan |
| `assets/demo_script_template.md` | Demo script with agenda, talking points, objection handling |
| `assets/poc_scorecard_template.md` | POC evaluation scorecard with weighted scoring |
| `assets/sample_rfp_data.json` | Sample RFP data for testing the analyzer |
| `assets/expected_output.json` | Expected output from rfp_response_analyzer.py |

## Communication Style

- **Technical yet accessible** - Translate complex concepts for business stakeholders
- **Confident and consultative** - Position as trusted advisor, not vendor
- **Evidence-based** - Back every claim with data, demos, or case studies
- **Stakeholder-aware** - Tailor depth and focus to audience (CTO vs. end user vs. procurement)

## Integration Points

- **Marketing Skills** - Leverage competitive intelligence and messaging frameworks from `../../marketing/`
- **Product Team** - Coordinate on roadmap items flagged as "Planned" in RFP analysis from `../../product-team/`
- **C-Level Advisory** - Escalate strategic deals requiring executive engagement from `../../c-level-advisor/`
- **Customer Success** - Hand off POC results and success criteria to CSM from `../customer-success-manager/`

---

## Tool Reference

### 1. rfp_response_analyzer.py

Parses RFP/RFI requirements and scores coverage using Full/Partial/Planned/Gap categories. Generates weighted coverage scores, gap analysis, effort estimation, and bid/no-bid recommendations.

```bash
python scripts/rfp_response_analyzer.py rfp_data.json
python scripts/rfp_response_analyzer.py rfp_data.json --format json
```

| Flag | Type | Description |
|------|------|-------------|
| `rfp_data.json` | positional | Path to JSON file with RFP requirements and coverage data |
| `--format` | optional | Output format: `text` (default) or `json` |

**Bid/No-Bid Logic:**
- **Bid:** Coverage score >70% AND must-have gaps <=3
- **Conditional Bid:** Coverage score 50-70% OR must-have gaps 2-3
- **No-Bid:** Coverage score <50% OR must-have gaps >3

### 2. competitive_matrix_builder.py

Generates feature comparison matrices, calculates weighted competitive scores, identifies differentiators and vulnerabilities, and produces win themes.

```bash
python scripts/competitive_matrix_builder.py competitive_data.json
python scripts/competitive_matrix_builder.py competitive_data.json --format json
```

| Flag | Type | Description |
|------|------|-------------|
| `competitive_data.json` | positional | Path to JSON file with feature comparison data |
| `--format` | optional | Output format: `text` (default) or `json` |

**Scoring:** Full (3), Partial (2), Limited (1), None (0)

### 3. poc_planner.py

Generates structured POC plans with phased timelines, resource allocation, success criteria, evaluation scorecards, risk registers, and go/no-go frameworks.

```bash
python scripts/poc_planner.py poc_data.json
python scripts/poc_planner.py poc_data.json --format json
```

| Flag | Type | Description |
|------|------|-------------|
| `poc_data.json` | positional | Path to JSON file with POC scope and requirements |
| `--format` | optional | Output format: `text` (default) or `json` |

**Default Phase Breakdown:** Week 1 Setup, Weeks 2-3 Core Testing, Week 4 Advanced Testing, Week 5 Evaluation

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| RFP coverage score below 50% triggering No-Bid | Product gaps in must-have requirements or incorrect coverage assessment | Review gap items -- distinguish true gaps from items addressable via configuration, integration, or roadmap commitment; reassess before declining |
| Competitive matrix shows vulnerabilities in 3+ categories | Product gaps relative to a specific competitor, or scoring does not reflect actual competitive dynamics | Validate scoring with field SEs who have competed against this vendor; focus battlecard on differentiators where you lead, not where you trail |
| POC-to-close conversion below 60% | POC scope too broad, success criteria not aligned with buyer priorities, or wrong stakeholders involved | Narrow POC to 3-5 use cases tied to buyer's stated pain; get written agreement on success criteria before starting; ensure executive sponsor participates in evaluation |
| Win rate below 30% | Technical win but commercial loss, late involvement in deal, or poor discovery leading to misaligned demos | Engage earlier in sales cycle; improve discovery quality using MEDDIC framework; align demo storyline to buyer's language not product features |
| Demo-to-POC conversion below 40% | Demo did not address buyer's specific use case or was too generic | Customize every demo to buyer's stated requirements; use their data or industry-specific scenarios; include Q&A and next-step proposal at end |
| RFP response time exceeds 2 weeks | Manual response process without templates or pre-built content library | Build a response library indexed by requirement category; use rfp_response_analyzer.py to prioritize effort on must-have items |
| Stakeholder engagement score below 75% | Key decision-makers not involved in technical evaluation | Map stakeholder roles early; ensure executive briefing alongside technical deep-dives; send personalized follow-up to each stakeholder |

---

## Success Criteria

- Win rate exceeds 30% across all competitive opportunities
- Sales cycle length stays below 90 days from discovery to close
- POC-to-close conversion rate exceeds 60%
- RFP coverage score averages above 80% for opportunities pursued (bid decisions working correctly)
- Competitive matrix identifies minimum 3 clear differentiators per competitor
- Customer engagement score exceeds 75% (measured by stakeholder participation in evaluation milestones)
- Average RFP response time drops below 5 business days with structured response library

---

## Scope & Limitations

**In scope:** RFP/RFI response analysis and scoring, competitive feature matrix construction, proof-of-concept planning and evaluation, demo preparation frameworks, technical proposal structure, win/loss analysis methodology, and stakeholder engagement tracking across the 5-phase pre-sales workflow (Discovery, Solution Design, Demo, POC, Proposal).

**Out of scope:** Sales strategy and territory planning (account executive function), pricing and commercial terms negotiation (use pricing-strategy), post-sale implementation and customer success (use customer-success-manager), marketing content and competitive messaging (use marketing skills), and product roadmap decisions based on RFP gaps (use product-team). Tools analyze static data exports -- no integrations with CRM systems (Salesforce, HubSpot) or RFP platforms (Loopio, Arphie).

**Limitations:** Bid/no-bid thresholds are configurable but defaults assume B2B SaaS with 30%+ win-rate targets. Competitive matrix scoring is only as accurate as the input data -- validate scores with field experience against specific competitors. POC timelines assume standard 5-week engagement; highly regulated industries (healthcare, government) may require 2-3x longer. AI-assisted RFP tools (emerging in 2025-2026) can reduce response time 60-80% but are not integrated here.

---

## Integration Points

- **revenue-operations** -- Pipeline deals requiring technical validation flow through SE workflow; SE win/loss data feeds pipeline analysis
- **customer-success-manager** -- POC results and success criteria hand off to CSM for post-close adoption tracking
- **pricing-strategy** -- Competitive pricing data from matrix builder informs pricing positioning decisions
- **product-team** -- RFP gaps flagged as "Planned" or "Gap" feed into product roadmap prioritization
- **c-level-advisor** -- Strategic deals requiring executive engagement escalate through C-level advisory workflow
- **marketing** -- Competitive intelligence from marketing feeds into battlecard creation and positioning

---

**Last Updated:** March 2026
**Status:** Production-ready
**Tools:** 3 Python automation scripts
**References:** 3 knowledge base documents
**Templates:** 5 asset files

---

## signup-flow-cro

Source path: `references/business-growth/signup-flow-cro/SKILL.md`

# Signup Flow CRO

Production-grade signup and registration optimization framework covering authentication strategy, field reduction methodology, multi-step flow architecture, SSO implementation, progressive profiling, credit card requirement analysis, post-submit experience design, and mobile-specific registration patterns. For post-signup onboarding, use onboarding-cro. For lead capture forms (not account creation), use form-cro.

---

## Table of Contents

- [Initial Assessment](#initial-assessment)
- [Authentication Strategy](#authentication-strategy)
- [Field Reduction Methodology](#field-reduction-methodology)
- [Multi-Step Flow Architecture](#multi-step-flow-architecture)
- [Credit Card Requirement Analysis](#credit-card-requirement-analysis)
- [Post-Submit Experience](#post-submit-experience)
- [Mobile Signup Optimization](#mobile-signup-optimization)
- [Signup Flow Patterns by Product Type](#signup-flow-patterns-by-product-type)
- [Progressive Profiling](#progressive-profiling)
- [Error and Edge Case Handling](#error-and-edge-case-handling)
- [A/B Test Framework](#ab-test-framework)
- [Metrics and Benchmarks](#metrics-and-benchmarks)
- [Output Artifacts](#output-artifacts)
- [Related Skills](#related-skills)

---

## Clarify First

Before optimizing the signup flow, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Flow type** — free trial, freemium, paid, or waitlist (determines friction tolerance and minimum field set)
- [ ] **B2B or B2C** — B2B tolerates more fields; B2C needs minimal friction (sets SSO priority and field count)
- [ ] **Current fields + completion rate + drop-off** — baseline and the friction point to cut (each removed field ~+10%)
- [ ] **Data truly needed before first product use** — separates must-have fields from those to defer or enrich (the "Before First Use" test)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the audit.

## Initial Assessment

### Required Context

| Question | Why It Matters |
|----------|---------------|
| Flow type? (free trial, freemium, paid, waitlist) | Determines friction tolerance |
| B2B or B2C? | B2B tolerates more fields, B2C needs minimal friction |
| How many steps/screens currently? | Baseline for optimization |
| What fields are required? | Identifies reduction opportunities |
| Current completion rate? | Benchmark for improvement |
| Where do users drop off? (field-level data) | Pinpoints specific friction |
| What data is needed before first product use? | Separates must-have from nice-to-have |
| What compliance requirements exist? | Constrains what can be deferred |

---

## Authentication Strategy

### Authentication Methods Ranked by Friction

| Method | Friction Level | Best For | Conversion Impact |
|--------|---------------|----------|------------------|
| Google SSO (one-click) | Very low | B2B SaaS, productivity tools | +15-30% vs email+password |
| Apple Sign In | Very low | iOS/Mac-heavy audience | +10-20% on Apple devices |
| Microsoft SSO | Low | Enterprise B2B | +10-15% for enterprise |
| GitHub SSO | Low | Developer tools | +15-25% for dev audience |
| Magic link (email) | Low | Security-conscious, B2B | +5-10% vs password |
| Email + password | Medium | Universal fallback | Baseline |
| Phone + OTP | Medium | Mobile-first, B2C | Varies by market |
| Email + password + verification | High | When verification is required | -10-20% vs no verification |

### SSO Strategy Decision

| Your Audience | Primary SSO | Secondary SSO | Keep Email+Password? |
|--------------|-------------|---------------|---------------------|
| B2B SaaS (general) | Google Workspace | Microsoft | Yes |
| Developer tools | GitHub | Google | Yes |
| Enterprise | Microsoft/Okta | Google | Yes (for personal evals) |
| B2C consumer | Google | Apple | Yes |
| Mobile-first | Apple / Google | Phone OTP | Optional |
| Privacy-focused | Magic link | Email+password | Yes |

### SSO Placement

```
┌──────────────────────────────────┐
│  Create your account             │
│                                  │
│  [Continue with Google]          │  ← SSO options first
│  [Continue with Microsoft]       │
│                                  │
│  ──── or ────                   │  ← Visual separator
│                                  │
│  Email: [_______________]       │  ← Email+password as alternative
│  Password: [_______________]    │
│                                  │
│  [Create Account]               │
└──────────────────────────────────┘
```

**Rules:**
- SSO buttons above the email form (not below)
- Use branded button styles (Google's official button, etc.)
- "or" divider between SSO and email options
- SSO reduces fields to zero (name and email come from the provider)

---

## Field Reduction Methodology

### The "Before First Use" Test

For every field, ask: **Does the product literally not function without this data?**

| Field | Passes Test? | Action |
|-------|-------------|--------|
| Email | Yes (account identity) | Keep |
| Password | Yes (account security) | Keep (or use SSO/magic link) |
| First name | Usually no | Defer to onboarding or profile |
| Last name | No | Defer or drop entirely |
| Company name | Usually no | Enrich from email domain |
| Phone number | Rarely | Defer unless SMS verification required |
| Job title | No | Defer to onboarding or enrich |
| Team size | No | Defer to onboarding |
| How did you hear about us? | Never | Post-signup survey or attribution |
| Industry | No | Enrich from company data |

### Enrichment Sources

| Field | Enrichment Method | Timing |
|-------|-------------------|--------|
| Company name | Email domain lookup (Clearbit, Apollo) | Immediately post-signup |
| Company size | Company data API | Immediately post-signup |
| Industry | Company data API | Immediately post-signup |
| Job title | LinkedIn API or manual CSM research | Before first sales contact |
| Location | IP geolocation | On signup |

### Minimum Viable Field Sets

| Signup Type | Minimum Fields | Additional (if needed) |
|------------|----------------|----------------------|
| Freemium | Email only (or SSO) | -- |
| Free trial (product-led) | Email + Password (or SSO) | -- |
| Free trial (sales-assisted) | Email + Password + Company | + Role (for routing) |
| Paid signup | Email + Password + Payment | -- |
| Waitlist | Email | + One qualifying question |
| Enterprise trial | Email + Company + Role | + Team size (for provisioning) |

---

## Multi-Step Flow Architecture

### When to Use Multi-Step

| Condition | Single-Step | Multi-Step |
|-----------|------------|------------|
| Total fields | 1-4 | 5+ |
| Need to qualify/route | No | Yes |
| Product needs configuration | No | Yes |
| B2B with team setup | No | Yes |

### Step Design

**Step 1: Account Creation (lowest friction)**
- Email + Password (or SSO)
- NOTHING else on this step
- This is where 60%+ of abandonment happens if overloaded

**Step 2: Personalization (if needed)**
- Role / goal / use case selection
- This personalizes their product experience
- Skip button available ("Set up later")

**Step 3: Configuration (if needed)**
- Team invite, integration connect, data import
- Each sub-step is optional with "Skip for now"
- Show value of completing each ("Invite your team to collaborate")

### Progress Design

- Show step count: "Step 1 of 3"
- Show progress bar
- Label each step descriptively: "Create Account", "Your Role", "Your Team"
- Allow back navigation (preserve entered data)
- Never reset the form on back navigation or browser back button

---

## Credit Card Requirement Analysis

### Decision Framework

| Factor | Require CC | Do Not Require CC |
|--------|-----------|------------------|
| Trial conversion goal | > 60% trial-to-paid | > 30% trial-to-paid with higher volume |
| Product complexity | Simple, immediate value | Complex, needs exploration |
| ACV | > $100/month | < $100/month |
| Sales motion | Product-led | Sales-assisted |
| Competitor practice | Competitors require CC | Competitors offer CC-free trial |
| Target audience | Enterprise (committed buyers) | SMB/prosumer (browsers) |

### Impact Analysis

| Approach | Signup Volume | Trial Quality | Trial-to-Paid | Net Revenue |
|----------|-------------|---------------|---------------|-------------|
| No CC required | Higher (+40-80%) | Lower (more tire-kickers) | Lower (2-15%) | Often higher net |
| CC required | Lower | Higher (committed) | Higher (40-70%) | Depends on volume |
| CC with "$0 charge" | Middle | Middle | Middle (20-40%) | Middle |

### Recommendation Framework

**Default to no CC required** unless:
1. Your product delivers immediate, obvious value (no learning curve)
2. Your trial-to-paid with CC is > 50%
3. You have a high-touch sales team to handle lower volume
4. Support costs for free trials are unsustainable

**If requiring CC:** Display prominently:
- "You won't be charged until [date]"
- "Cancel anytime before [date]"
- "We'll email you 3 days before your trial ends"

---

## Post-Submit Experience

### Immediately After Signup

| Element | Implementation |
|---------|---------------|
| Auto-login | Log the user in immediately (never force a separate login) |
| Welcome screen | Show a clear next step, not a blank dashboard |
| Confirmation email | Send immediately, include: what to expect, key features, support contact |
| Email verification | Defer if possible. If required, send inline and let them continue using the product before verifying |

### Email Verification Strategy

| Approach | Impact on Activation | When to Use |
|----------|---------------------|-------------|
| No verification | Best activation rate | Low-risk products, freemium |
| Verify to unlock specific feature | Good -- users activate first | B2B SaaS with free tier |
| Verify within 24 hours | Moderate -- creates urgency | Products that send emails |
| Verify before any use | Worst activation rate | Regulated industries, financial products |

**Default recommendation:** Let users use the product immediately. Verify within 24-48 hours. Gate only the features that require a verified email (e.g., sending emails, team invites).

---

## Mobile Signup Optimization

### Mobile-Specific Rules

| Rule | Implementation |
|------|---------------|
| SSO first | Google/Apple Sign In is one tap on mobile |
| One column | Never use side-by-side fields on mobile |
| Large inputs | Minimum 44px height for all touch targets |
| Appropriate keyboards | `type="email"`, `type="tel"`, `type="password"` |
| Auto-fill support | Use standard field names for browser auto-fill |
| Sticky CTA | Pin "Create Account" button to bottom of viewport |
| No CAPTCHA | Use invisible reCAPTCHA or alternatives |
| Password visibility | Toggle to show/hide password |

### Mobile vs Desktop Signup Differences

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| Primary auth | SSO or Email+Password | SSO preferred (one-tap) |
| Fields per screen | Up to 5 | Max 3 |
| Password rules | Show requirements upfront | Show on interaction |
| CAPTCHA | Standard reCAPTCHA acceptable | Invisible or none |
| Social proof | Sidebar or adjacent | Below form or above |

---

## Signup Flow Patterns by Product Type

### B2B SaaS Trial

```
[Google SSO] or [Email + Password]
→ Auto-login to product
→ Welcome screen: "What brings you here?" (3 options)
→ Guided first action based on selection
→ Team invite prompt (optional, day 2-3)
```

### B2C Consumer App

```
[Apple Sign In] or [Google Sign In] or [Email]
→ Immediately into product
→ Personalization (follows, preferences) inline
→ Profile completion deferred
```

### Enterprise/Sales-Assisted

```
[Work Email + Password + Company Name]
→ Auto-login to sandbox
→ Role + team size (for provisioning)
→ CSM outreach triggered for qualified accounts
→ Guided setup with dedicated support
```

### Waitlist / Early Access

```
[Email only]
→ Confirmation page: position in waitlist
→ Referral mechanism: "Jump ahead by sharing"
→ Weekly update email on progress
→ Access granted email with one-click activation
```

---

## Progressive Profiling

Collect information over multiple sessions instead of one long form.

### Progressive Profiling Schedule

| Session | What to Collect | How |
|---------|----------------|-----|
| Signup (session 1) | Email + auth | Signup form |
| First use (session 1-2) | Role, primary goal | In-product prompt or setup wizard |
| Day 3-5 | Team size, use case | Contextual question in product |
| Day 7-14 | Industry, company size | Survey or enrichment |
| Before first payment | Billing info | Upgrade flow |

### Implementation Rules

- Each profiling touchpoint asks 1-2 questions maximum
- Always explain why you are asking ("So we can personalize your experience")
- Always provide a "Skip" option
- Never ask for information you can enrich automatically
- Store partial profiles and build over time

---

## Error and Edge Case Handling

### Password Requirements

| Approach | User Experience | Security |
|----------|----------------|----------|
| Show requirements upfront | Best -- user knows what to enter | Good |
| Show requirements on focus | Good | Good |
| Show errors only after submit | Bad -- frustrating | Same |
| Real-time checkmarks | Best -- progressive validation | Good |

**Recommended:** Show password requirements as a checklist that checks off in real-time as the user types.

### Common Error Scenarios

| Error | Bad UX | Good UX |
|-------|--------|---------|
| Email already registered | "Error: account exists" | "This email already has an account. [Log in] or [Reset password]" |
| Weak password | "Password too weak" | Checkmarks showing which requirements are met/unmet |
| SSO failure | Generic error page | "Something went wrong with Google login. [Try again] or [Use email instead]" |
| Network error | Form clears, no message | "Connection issue. Your data is saved. [Try again]" |
| Rate limiting | Blocked with no explanation | "Too many attempts. Please try again in [N] minutes" |

---

## A/B Test Framework

### High-Impact Tests

| Test | Hypothesis | Metric |
|------|-----------|--------|
| Add Google SSO | SSO increases completion by 15-30% | Signup completion rate |
| Remove non-essential fields | Fewer fields = higher completion | Completion rate + activation rate |
| Single-step vs multi-step | Multi-step feels easier for 5+ field forms | Completion rate |
| CC required vs not | No CC increases volume enough to offset lower conversion | Net revenue |
| Defer email verification | Immediate product access increases activation | Activation rate |

### Measurement Rules

- Track signup completion rate AND downstream activation rate
- A test that increases signups but decreases activation is not a win
- Track by traffic source (paid vs organic may respond differently)
- Track mobile and desktop separately

---

## Metrics and Benchmarks

### Key Metrics

| Metric | Formula | Benchmark |
|--------|---------|-----------|
| Signup page visit-to-completion | Completions / Page views | 30-50% (B2B), 40-60% (B2C) |
| SSO adoption rate | SSO signups / Total signups | 30-60% when offered |
| Field-level drop-off | Abandonment per field | Identify highest-drop field |
| Time to complete | Median seconds from first interaction to submit | < 45s for simple, < 2min for multi-step |
| Mobile completion rate | Mobile completions / Mobile page views | Should be within 15% of desktop |
| Email verification rate | Verified / Total signups | > 70% within 48 hours |

---

## Output Artifacts

| Artifact | Format | Description |
|----------|--------|-------------|
| Signup Flow Audit | Issue/Impact/Fix/Priority table | Per-step analysis with estimated impact |
| Recommended Field Set | Justified list | Required vs deferrable fields with rationale |
| Authentication Strategy | Decision matrix | SSO options, placement, priority |
| Flow Redesign Spec | Step-by-step outline | Screen-by-screen design with copy |
| Progressive Profiling Plan | Session-by-session schedule | What to collect, when, and how |
| A/B Test Plan | Prioritized table | Top 5 tests with hypothesis and expected impact |
| Mobile Optimization Checklist | Per-element rules | Touch targets, keyboards, auto-fill, sticky CTA |

---

## Tool Reference

### 1. signup_field_auditor.py

Audits a signup form configuration for unnecessary fields, missing enrichment opportunities, and friction points. Evaluates each field against the "Before First Use" test and recommends which to keep, defer, or enrich.

```bash
python scripts/signup_field_auditor.py fields.json --format text
python scripts/signup_field_auditor.py fields.json --format json
```

| Flag | Type | Description |
|------|------|-------------|
| `fields.json` | positional | Path to JSON file with form field configuration |
| `--format` | optional | Output format: `text` (default) or `json` |

### 2. signup_flow_scorer.py

Scores a complete signup flow against conversion best practices. Evaluates SSO availability, field count, step count, mobile optimization, error handling, and post-submit experience. Outputs a 0-100 score with itemized improvements.

```bash
python scripts/signup_flow_scorer.py flow.json --format text
python scripts/signup_flow_scorer.py flow.json --format json
```

| Flag | Type | Description |
|------|------|-------------|
| `flow.json` | positional | Path to JSON file with signup flow configuration |
| `--format` | optional | Output format: `text` (default) or `json` |

### 3. cc_requirement_analyzer.py

Analyzes whether to require a credit card for trial signup. Takes business metrics (ACV, trial-to-paid rate, support costs, competitors) and recommends CC-required, CC-free, or "$0 charge" approach with projected volume and revenue impact.

```bash
python scripts/cc_requirement_analyzer.py business.json --format text
python scripts/cc_requirement_analyzer.py business.json --format json
```

| Flag | Type | Description |
|------|------|-------------|
| `business.json` | positional | Path to JSON file with business metrics |
| `--format` | optional | Output format: `text` (default) or `json` |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Signup completion rate below 30% (B2B) or 40% (B2C) | Too many fields, no SSO option, or form on a separate page from the CTA | Reduce to email-only or SSO; keep form on the same page as the value proposition; each removed field improves conversion ~10% |
| SSO adoption rate below 30% when offered | SSO buttons placed below the email form, or wrong SSO providers for the audience | Move SSO buttons above the email form with "or" divider; match SSO to audience (Google for B2B, Apple for iOS users) |
| Mobile completion rate >15% below desktop | Form not optimized for touch (small inputs, wrong keyboard types, no auto-fill) | Ensure 44px min touch targets, use type="email"/type="tel", enable browser auto-fill, pin CTA to bottom of viewport |
| High drop-off on password field | Complex password requirements shown only after submission, or no password visibility toggle | Show requirements as real-time checklist, add show/hide toggle, consider magic link or SSO to eliminate password entirely |
| Email verification kills activation | Verification required before any product use blocks the critical first-session experience | Defer verification to 24-48 hours; allow product use immediately; gate only email-sending features behind verification |
| "Email already registered" errors are frequent | Users forget they have accounts; error message does not help them recover | Change error to "This email has an account. [Log in] or [Reset password]" with direct links |
| High abandonment on multi-step flows | Steps are not progressive, no progress indicator, or too many fields per step | Show step count and progress bar; limit step 1 to account creation only; add "Skip for now" on non-essential steps |

---

## Success Criteria

- Signup page visit-to-completion rate reaches 30-50% (B2B) or 40-60% (B2C) within 60 days of optimization
- SSO adoption reaches 30-60% of total signups when SSO is properly offered
- Median time-to-complete stays below 45 seconds for simple flows and below 2 minutes for multi-step
- Mobile completion rate falls within 15% of desktop completion rate
- Email verification rate exceeds 70% within 48 hours of signup
- Field-level drop-off analysis shows no single field causing >10% incremental abandonment
- Post-signup activation rate (first key action) improves alongside signup rate (not a vanity metric tradeoff)

---

## Scope & Limitations

**In scope:** Authentication strategy (SSO, magic link, email+password), field reduction methodology, multi-step flow architecture, credit card requirement analysis, post-submit experience design, mobile signup optimization, progressive profiling schedules, error and edge case handling, and A/B testing frameworks for registration flows.

**Out of scope:** Post-signup onboarding and activation (use onboarding-cro), non-registration forms like lead capture or contact forms (use form-cro), landing page conversion before the signup form (use page-cro), in-app upgrade and paywall flows (use paywall-upgrade-cro). Scripts operate on local data only -- no integrations with authentication providers (Auth0, Clerk, etc.) or analytics platforms.

**Limitations:** Conversion benchmarks are aggregate SaaS/app industry data and vary by vertical, price point, and audience. SSO adoption rates depend heavily on audience composition (developer audiences adopt GitHub SSO at 40%+, while SMB audiences may prefer email). Credit card requirement analysis is modeled on industry averages -- actual impact requires A/B testing in your specific context. Progressive profiling recommendations assume standard SaaS lifecycle stages.

---

## Integration Points

- **onboarding-cro** -- Signup flow ends at account creation; onboarding-cro picks up from first login through activation
- **form-cro** -- Field-level optimization principles (validation, keyboard types, error handling) apply to signup forms
- **page-cro** -- Landing page quality directly impacts signup form reach; optimize the page before optimizing the form
- **paywall-upgrade-cro** -- Trial signup configuration (CC-required, trial length) affects downstream upgrade flow design
- **pricing-strategy** -- Pricing model (freemium vs trial) determines signup flow type and field requirements
- **referral-program** -- Referred user signups should pre-fill referrer context and display incentive

---

## Related Skills

- **onboarding-cro** -- Use for post-signup activation optimization. Signup-flow-cro ends when the user has an account; onboarding-cro starts there.
- **form-cro** -- Use for non-signup forms (lead capture, contact, demo request). Different optimization framework than registration.
- **page-cro** -- Use when the landing page leading to signup is the bottleneck, not the signup form itself.
- **paywall-upgrade-cro** -- Use when the real challenge is converting free users to paid, not getting them to sign up.
