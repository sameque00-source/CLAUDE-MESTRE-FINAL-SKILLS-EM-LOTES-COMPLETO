# Domain: vertical-advisors
Source Skills in this domain: 7

---

## climate-tech-advisor

Source path: `references/vertical-advisors/climate-tech-advisor/SKILL.md`

# Climate-Tech Advisor

Strategic frameworks for climate-tech founders, operators, and product leaders.

> **Disclaimer:** Frameworks only. Climate compliance, carbon accounting, and verification require qualified specialists. Engage GHG / climate counsel and verifiers for binding decisions.

---

## Keywords

climate, climate-tech, climate tech, carbon, GHG, greenhouse gas, scope 1, scope 2, scope 3, ESG, IRA, DOE, CSRD, SEC climate rule, net zero, decarbonization, carbon removal, CDR, EU Green Deal, taxonomy, MRV

---

## Quick Start

```bash
python scripts/carbon_impact_estimator.py business_description.txt
```

Estimates rough order-of-magnitude carbon impact category and surfaces verification considerations. **Not** a verified carbon accounting result.

---

## Core Workflows

### Workflow 1: Category and Impact Sizing
1. Run estimator on business description
2. Cross-reference with `references/climate_categories.md`
3. Identify market category (energy, industry, transport, food/ag, buildings, CDR, software/data)
4. Plan a path to verifiable impact measurement

**Time Estimate:** 4-8 weeks for first sizing.

### Workflow 2: Funding Strategy
1. Read `references/climate_funding_sources.md`
2. Map to your stage and category: DOE, IRA tax credits, USDA, EU Green Deal, climate-focused VC
3. Sequence: most climate-tech blends grants + dilutive equity + (later) project finance
4. Plan grant capacity (grants take time and writing skill)

**Time Estimate:** Continuous.

### Workflow 3: GHG Accounting for Customers
1. Many climate-tech products require demonstrating GHG impact for their customers
2. Read `references/ghg_accounting_basics.md`
3. Understand Scope 1/2/3 boundaries; pick the boundaries your product affects
4. Plan MRV (Measurement, Reporting, Verification) approach
5. For customers facing CSRD, SEC climate rule, or voluntary frameworks: align reporting

**Time Estimate:** 6-12 weeks for first robust MRV plan.

---

## Tools

### carbon_impact_estimator.py

Classifies a business description into climate categories and provides order-of-magnitude impact ranges and verification considerations.

```bash
python scripts/carbon_impact_estimator.py description.txt
python scripts/carbon_impact_estimator.py description.txt --json
```

**This is a categorization tool, not a verified carbon-accounting calculator.** Real GHG accounting requires methodology selection, data collection, and (for credit issuance) third-party verification.

---

## Reference Guides

- **`references/climate_categories.md`** — Categories overview, market sizing intuition, common business model patterns
- **`references/climate_funding_sources.md`** — Grants (DOE, USDA, NSF), tax credits (IRA), prizes, climate VC
- **`references/ghg_accounting_basics.md`** — Scope 1/2/3, GHG Protocol, methodologies, MRV, verification

---

## Templates

- **`assets/climate_impact_assessment.md`** — Document template for capturing category, impact estimate, and MRV plan

---

## Best Practices

- **Quantify in tons, not adjectives.** "Significant climate impact" means nothing. "1 Mt CO2e abated annually at $50/ton" is a real claim.
- **Pick a verifiable methodology.** Voluntary carbon markets (Verra, Gold Standard, Puro.earth, Isometric) have specific methodologies. Pick before building.
- **Avoid greenwashing.** Lifecycle assessment (LCA) often shows products are 20-50% less green than initial claims. Be honest in modeling.
- **Plan for IRA / IRA expiration.** US IRA tax credits drove much of the 2023-2025 climate-tech boom. Policy can shift; build for value beyond subsidy where possible.
- **Customer-side ESG reporting matters.** Selling to a CSRD-reporting customer requires you to provide audit-grade data on Scope 3 — this is a competitive advantage if you're ready and a deal-killer if you're not.

---

## Integration Points

- Pairs with `c-level-advisor/cfo-advisor` — climate-tech often combines grant + equity + project finance
- Pairs with `legal/` — IRA tax-credit qualification, carbon-credit contracts
- Pairs with `ra-qm-team/` — some categories overlap with regulated industries (chemicals, energy, food)

---

## ecommerce-advisor

Source path: `references/vertical-advisors/ecommerce-advisor/SKILL.md`

# E-commerce Advisor

Strategic frameworks for e-commerce founders, operators, and brand builders. Most ecommerce decisions are unit-economics decisions — knowing the math is the difference between a brand that compounds and one that subsidizes itself out of existence.

---

## Keywords

ecommerce, e-commerce, DTC, direct-to-consumer, Shopify, Amazon, retail, wholesale, 3PL, fulfillment, dropship, unit economics, contribution margin, CAC, AOV, LTV, returns, refunds, payment processing, interchange

---

## Clarify First

Before building the model, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Single channel or blended** — model each channel (DTC, Amazon, wholesale) separately; a blended model hides an unprofitable channel and makes contribution margin meaningless
- [ ] **AOV and COGS** — average order value and landed cost of goods (drives gross margin, the top line of the model)
- [ ] **Returns/refund rate** — returns eat margin twice (the sale plus reverse logistics), so this swings contribution margin
- [ ] **CAC basis** — true paid/blended CAC and what ad spend is counted (drives CAC payback period and break-even repeat rate)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the model.

## Quick Start

```bash
python scripts/ecom_unit_economics_calculator.py model.json
```

Calculates gross margin, contribution margin, CAC payback, and per-order profit from a structured input file.

---

## Core Workflows

### Workflow 1: Unit Economics Model
1. Build a JSON config: COGS, fulfillment cost, payment processing %, returns %, ad spend %, AOV
2. Run calculator: `python scripts/ecom_unit_economics_calculator.py model.json`
3. Identify the marginal cost line items eating most of the margin
4. Decide: cut costs, raise price, change channel mix, or kill the SKU

**Time Estimate:** 2-4 weeks for first robust model.

### Workflow 2: Fulfillment Strategy
1. Read `references/fulfillment_models.md`
2. Score each model (DTC self-fulfilled, 3PL, Amazon FBA, dropship, retail) for your stage and SKU profile
3. Migrate fulfillment as you scale — most brands change models 2-3 times in their first 3 years

**Time Estimate:** 4-8 weeks per major fulfillment transition.

### Workflow 3: Channel Strategy
1. Read `references/channel_strategy.md`
2. Decide channel mix: DTC site, Amazon, wholesale, retail, marketplace
3. Each channel has distinct unit economics — model them separately, never blend
4. Sequence: most brands start DTC, add Amazon, add wholesale / retail

**Time Estimate:** Continuous, with major decisions every 6-12 months.

---

## Tools

### ecom_unit_economics_calculator.py

Models per-order, per-month, and CAC-payback economics from a structured input.

```bash
python scripts/ecom_unit_economics_calculator.py model.json
python scripts/ecom_unit_economics_calculator.py model.json --json
```

**Input model schema** in the script's docstring; example in `assets/unit_economics_template.json`.

**Outputs:**
- Gross margin (% and absolute)
- Contribution margin (after marginal CAC)
- CAC payback period (months)
- Break-even repeat rate

---

## Reference Guides

- **`references/fulfillment_models.md`** — DTC self, 3PL, FBA, dropship, retail — when each fits
- **`references/channel_strategy.md`** — DTC site, Amazon, wholesale, retail — economics per channel

---

## Templates

- **`assets/unit_economics_template.json`** — Input file for the calculator with example values

---

## Best Practices

- **Model channels separately.** A blended LTV across DTC and Amazon hides the fact that Amazon may be unprofitable.
- **Returns and refunds compound.** A 15% return rate eats into margin twice — once on the initial sale, once on the reverse logistics.
- **Plan for inventory.** Working capital tied up in inventory is the #1 cash-flow killer for product brands.
- **Don't fall in love with revenue.** $10M revenue at 5% contribution margin is worse than $3M revenue at 30% contribution margin.
- **Be honest about CAC.** Most DTC brands subsidize CAC and call it growth. CAC payback under 6 months is the bar.

---

## edtech-advisor

Source path: `references/vertical-advisors/edtech-advisor/SKILL.md`

# Edtech Advisor

Strategic frameworks for education-technology founders, operators, and product leaders.

> **Disclaimer:** Frameworks and orientation only. Not legal advice. Edtech compliance (FERPA, COPPA, GDPR, state laws) requires specialist counsel. Use this skill to organize strategy.

---

## Keywords

edtech, K-12, higher education, higher ed, university, college, FERPA, COPPA, GDPR-K, student data, LMS, SIS, learning management, school district, RFP, district sales, corporate learning, L&D, training, certification

---

## Quick Start

1. Run student-data compliance checker on a 1-paragraph product description
2. Identify primary market (K-12 / Higher Ed / Corporate L&D / Direct-to-Learner)
3. Read the corresponding section of `references/edtech_market_dynamics.md`

---

## Core Workflows

### Workflow 1: Student Data Compliance Scoping
1. Run: `python scripts/student_data_compliance_checker.py description.txt`
2. Cross-reference with `references/student_data_privacy.md`
3. Hand findings to counsel — FERPA / COPPA / GDPR-K + state laws
4. Document scope and BAA / Student Data Privacy Agreement (SDPA) inventory

**Time Estimate:** 4-6 weeks for first scope.

### Workflow 2: Market Selection (K-12 vs HiEd vs Corp)
1. Read `references/edtech_market_dynamics.md`
2. Score product fit against each market: buyer, contract length, sales cycle, pricing benchmarks, churn dynamics
3. Pick one primary market for first $1M-$5M ARR
4. Build content, sales motion, and pricing aligned to that market

**Time Estimate:** 4-8 weeks.

### Workflow 3: District Sales Strategy
1. Map district decision-makers: superintendent, assistant superintendent, CTO, curriculum director, principal, teacher
2. Plan procurement path: RFP, sole source, statewide cooperative
3. Plan implementation: PD (professional development), rostering (Clever, ClassLink), SIS integration
4. Validate with reference districts before broader investment

**Time Estimate:** 6-12 months for first major district win.

---

## Tools

### student_data_compliance_checker.py

Scans a product description for indicators of student-data handling and likely compliance regime exposure (FERPA, COPPA, GDPR-K, state laws).

```bash
python scripts/student_data_compliance_checker.py description.txt
python scripts/student_data_compliance_checker.py description.txt --json
```

---

## Reference Guides

- **`references/student_data_privacy.md`** — FERPA, COPPA, GDPR-K, state laws (SOPIPA, NY Ed Law 2-d, etc.)
- **`references/edtech_market_dynamics.md`** — K-12, Higher Ed, Corporate L&D, D2C — buyer, sales cycle, pricing

---

## Templates

- **`assets/sdpa_inventory_template.md`** — Student Data Privacy Agreement and compliance posture template

---

## Integration Points

- Pairs with `legal/` for SDPA / DPA contract review
- Pairs with `marketing/launch-strategy` for back-to-school launch timing
- Pairs with `c-level-advisor/cs-fundraising-advisor` for edtech-specific fundraising

## Best Practices

- **Plan for the academic calendar.** District purchase cycles peak in spring (for fall) and again at end-of-year. Selling in October to start in November is a non-starter.
- **Sign SDPAs before piloting.** Many states require districts to have a Student Data Privacy Agreement before a tool can touch student data — even a free pilot.
- **Don't conflate K-12 and Higher Ed.** Different buyers, different sales cycles, different compliance regimes (FERPA applies to both but how it's interpreted differs).
- **Corporate L&D is not edtech.** It's HR-tech with edtech roots. Different buyer (CHRO / L&D leader), different metrics (completion, retention), different sales motion.

---

## fintech-advisor

Source path: `references/vertical-advisors/fintech-advisor/SKILL.md`

# Fintech Advisor

Strategic frameworks for fintech founders, operators, and product leaders. Knowledge-heavy by design — the right answer in fintech is usually a regulatory and economic judgment, not a calculation.

> **Disclaimer:** This skill provides frameworks and orientation. It is **not** legal, regulatory, securities, tax, or investment advice. Every fintech business needs licensed legal counsel. Use this skill to organize internal thinking; engage specialist counsel for binding decisions.

---

## Table of Contents

- [Keywords](#keywords)
- [Quick Start](#quick-start)
- [Core Workflows](#core-workflows)
- [Tools](#tools)
- [Reference Guides](#reference-guides)
- [Templates](#templates)
- [Best Practices](#best-practices)

---

## Keywords

fintech, payments, banking, neobank, lending, money transmitter, KYC, AML, PSD2, open banking, BaaS, banking-as-a-service, embedded finance, card issuing, ACH, SEPA, stablecoin, crypto, broker-dealer, RIA, regulation, compliance

---

## Quick Start

### Initial Regulatory Triage in 10 Minutes

1. Write a 1-paragraph description of what your fintech does (who pays whom, in what form, who holds the funds)
2. Run `python scripts/regulatory_trigger_checker.py business_description.txt`
3. Use the output as input to a conversation with a fintech-licensed lawyer — never as the conclusion

### License vs. Partner Decision

1. Read `references/license_vs_partner_playbook.md`
2. For each capability you need (hold funds, issue cards, originate loans, send payments), decide: get a license, or partner with a licensed entity (BaaS, sponsor bank)
3. Most early-stage fintechs partner. License only if the unit economics or moat absolutely require it.

---

## Core Workflows

### Workflow 1: Regulatory Exposure Scoping

**Goal:** Understand which US / EU regulatory regimes a proposed fintech business model triggers, before committing to architecture.

**Steps:**
1. Write a clear business description: who pays whom, what is held by whom, where the entity operates
2. Run the trigger checker for a quick orientation
3. Map each trigger to the relevant regulator (FinCEN, OCC, state banking commissioners, SEC, CFPB, FCA, BaFin, ACPR)
4. Engage specialist counsel before designing infrastructure
5. Document the regulatory architecture as part of the company's compliance file

**Time Estimate:** 4-8 weeks of legal scoping for a meaningful new build.

### Workflow 2: License vs. Partner

**Goal:** Decide whether to get the regulated capability yourself, or buy it from a partner.

**Steps:**
1. List capabilities needed: KYC/identity, custody, issuing, acquiring, lending, FX, deposit-taking
2. For each, score on the 4-axis grid in `license_vs_partner_playbook.md`: cost, time, control, economics
3. Pick partners only where the regulator-of-record relationship can survive partner failure
4. Document fallback plans if the partner is ever rate-limited, deprecates, or fails

**Time Estimate:** 6-12 weeks for major capability decisions.

### Workflow 3: KYC/AML Program Design

**Goal:** Build a KYC/AML program that satisfies regulators *and* doesn't kill conversion.

**Steps:**
1. Read `references/kyc_aml_basics.md`
2. Design tiered KYC: minimal at signup, enhanced when usage patterns trigger thresholds
3. Pick risk-scoring vendor (Alloy, Sardine, Persona, Onfido) and write integration plan
4. Establish ongoing monitoring: transaction monitoring rules, periodic refresh, sanctions / PEP screening
5. Engage MLRO (Money Laundering Reporting Officer) before going live

**Time Estimate:** 8-16 weeks for first-time program design.

---

## Tools

### regulatory_trigger_checker.py

Scans a business description for keywords and patterns that map to regulatory regimes in the US and EU. Output is a list of candidate triggers, **not** a legal opinion.

```bash
python scripts/regulatory_trigger_checker.py business_description.txt
python scripts/regulatory_trigger_checker.py business_description.txt --json
```

**Triggers detected:**
- Money transmission (state-by-state US, e-money/payment institution EU)
- Lending (CFPB, state lending licenses, EU consumer credit)
- Securities (SEC broker-dealer, RIA, EU MiFID)
- Banking / deposit-taking (OCC, FDIC, EU credit institution)
- Payment services (PSD2 in EU, FCA in UK)
- Cryptocurrency (FinCEN MSB, NYDFS BitLicense, MiCA in EU)
- Custody of customer assets

---

## Reference Guides

- **`references/regulatory_landscape.md`** — Map of US and EU fintech regulators, what each covers, common trigger patterns
- **`references/license_vs_partner_playbook.md`** — When to get a license, when to partner, partner failure planning
- **`references/kyc_aml_basics.md`** — KYC tiers, risk-based monitoring, MLRO role, common pitfalls
- **`references/embedded_finance_patterns.md`** — BaaS architecture, distribution-led fintech, B2B2C patterns

---

## Templates

- **`assets/regulatory_architecture_template.md`** — Document template for capturing regulatory decisions and partner choices

---

## Best Practices

- **Engage fintech-specialist counsel from day one.** General-purpose corporate lawyers will miss regulatory triggers. The cost of specialist counsel up front is a fraction of the cost of a regulatory mistake.
- **Don't hide behind partners.** Even with a BaaS provider, your customers see *your* brand and the regulator may look through to you. Plan for partner failure.
- **State-by-state US is real.** Money transmitter laws are state-level — 49 different licenses possible. Most fintechs partner to avoid this.
- **Sanctions are absolute.** A $100 OFAC violation can cost $10M. Sanctions screening is non-negotiable.
- **Treat compliance as product.** Frictionless KYC and clear customer comms about why you're asking for documents are a competitive advantage.

---

## Integration Points

- Pairs with `c-level-advisor/cs-fundraising-advisor` — investors expect a clear regulatory architecture
- Pairs with `engineering/cs-security-engineer` — fintech security goes beyond standard SaaS
- Pairs with `legal/` skills for contract / partner agreements
- Pairs with `business-growth/pricing-strategy` — fintech pricing has unusual constraints (interchange, FX spread, float)

---

## healthtech-advisor

Source path: `references/vertical-advisors/healthtech-advisor/SKILL.md`

# Healthtech Advisor

Strategic frameworks for digital health and healthtech founders, operators, and product leaders. **Complements** (does not replace) the RA/QM compliance domain. RA/QM covers regulatory and quality management for medical devices; this skill covers business-side strategy for health software companies.

> **Disclaimer:** Frameworks and orientation only. Not legal, regulatory, clinical, or compliance advice. Healthtech businesses need licensed counsel (HIPAA, FDA, fraud-and-abuse), clinical advisors, and qualified RA/QM specialists. Use this skill to organize strategy; engage specialists for binding decisions.

---

## Table of Contents

- [Keywords](#keywords)
- [Quick Start](#quick-start)
- [Core Workflows](#core-workflows)
- [Tools](#tools)
- [Reference Guides](#reference-guides)
- [Templates](#templates)
- [Best Practices](#best-practices)

---

## Keywords

healthtech, digital health, HIPAA, PHI, BAA, business associate, covered entity, FDA SaMD, software as medical device, EHR, EMR, FHIR, HL7, telehealth, digital therapeutics, DTx, payor, provider, value-based care, fee-for-service, RPM, remote patient monitoring

---

## Quick Start

### 10-Minute Scope Check

1. Write a 1-paragraph description of what your product does and what data it touches
2. Run `python scripts/phi_scope_checker.py description.txt`
3. Use the output to scope HIPAA exposure and identify whether you're a Business Associate, Covered Entity, neither, or both

### Pick a GTM

1. Read `references/gtm_patterns.md`
2. Identify your buyer: payor, provider, employer, individual, pharma, government
3. Each GTM has a different sales motion, contract length, and economics — pick before committing engineering

---

## Core Workflows

### Workflow 1: HIPAA Scope and BAA Strategy

**Goal:** Determine whether HIPAA applies, in what capacity (Covered Entity, Business Associate, neither), and what BAAs you need with whom.

**Steps:**
1. Run PHI scope checker on your product description
2. Identify: do you handle PHI on behalf of a Covered Entity (you're a BA), are you a CE yourself, or are you handling consumer-generated health data outside HIPAA?
3. Map BAA requirements: with which Covered Entities you operate as BA, with which subcontractors you operate as BA-of-BA
4. Engage HIPAA-specialist counsel to review scope before launch
5. Operationalize: BA-grade hosting, encryption, access controls, audit logs, breach notification process

**Time Estimate:** 4-8 weeks for first scope and BAA template.

### Workflow 2: FDA SaMD Classification

**Goal:** Determine whether your software is regulated as a medical device by the FDA, and at which classification.

**Steps:**
1. Read `references/fda_samd_basics.md`
2. Apply IMDRF risk categorization framework: severity of healthcare situation × significance of information
3. Determine FDA class (I, II, III) or unregulated wellness category
4. If regulated: pair with `ra-qm-team/fda-compliance/` and `ra-qm-team/iec-62304-compliance/` for the implementation work
5. If unregulated wellness: document why, and avoid claims that would cross into regulated territory

**Time Estimate:** 4-12 weeks for classification, then RA/QM-driven submission timelines.

### Workflow 3: GTM Selection

**Goal:** Pick the buyer segment and sales motion that matches your product.

**Steps:**
1. Read `references/gtm_patterns.md`
2. Map your product's value proposition to each buyer's purchase criteria
3. Recognize the constraints: payor 24-36 month sales cycles, provider IT integration, employer benefits-cycle timing
4. Pick **one** primary motion to start; expand later
5. Build the team that matches the motion — payor sales is different from provider sales is different from D2C

**Time Estimate:** 4-8 weeks for GTM strategy decision.

---

## Tools

### phi_scope_checker.py

Scans a product description for indicators of PHI handling and HIPAA scope. Identifies whether you're likely a Covered Entity, Business Associate, both, or operating outside HIPAA (consumer wellness data).

```bash
python scripts/phi_scope_checker.py description.txt
python scripts/phi_scope_checker.py description.txt --json
```

---

## Reference Guides

- **`references/hipaa_basics.md`** — HIPAA scope, Covered Entity vs Business Associate, BAA requirements, common pitfalls
- **`references/fda_samd_basics.md`** — Software as Medical Device classification, IMDRF framework, US vs EU
- **`references/gtm_patterns.md`** — Payor, provider, employer, individual, pharma, government — sales cycles, contract structures, decision criteria
- **`references/value_based_care_primer.md`** — Fee-for-service vs VBC, capitation, shared savings, ACOs, common models

---

## Templates

- **`assets/hipaa_scope_template.md`** — Document template for capturing HIPAA scope decisions and BAA inventory

---

## Best Practices

- **Engage HIPAA counsel before architecture decisions.** Same point as fintech: regulatory shapes infrastructure.
- **Don't claim HIPAA compliance — be HIPAA compliant.** Marketing claims attract regulator attention; the actual program protects the company.
- **Don't conflate HIPAA and FDA.** They cover different things. HIPAA = data; FDA = device.
- **PHI vs consumer health data.** Apple Health data, fitness tracker data, and consumer wellness data are not always PHI. The status depends on context (Covered Entity relationship), not the data type alone.
- **Plan for state laws.** California (CMIA), Washington (My Health My Data), and others extend beyond HIPAA. Texas, NY have their own.
- **EHR integrations are slow.** Epic, Cerner, athenahealth integrations take months and require partnership programs. Plan accordingly.

---

## Integration Points

- **`ra-qm-team/`** for medical-device-grade compliance work (ISO 13485, MDR, FDA, IEC 62304)
- **`legal/`** for BAA / DPA templates and contract review
- **`engineering/cs-security-engineer`** — healthtech security goes beyond standard SaaS
- **`business-growth/pricing-strategy`** — healthtech pricing has unusual constraints (PMPM, capitation, fee-for-service)
- **`c-level-advisor/cs-fundraising-advisor`** — healthtech investor expectations differ from generic SaaS

---

## marketplace-advisor

Source path: `references/vertical-advisors/marketplace-advisor/SKILL.md`

# Marketplace Advisor

Strategic frameworks for two-sided and multi-sided marketplace founders, operators, and product leaders. Marketplaces have distinctive economics — most ecommerce / SaaS playbooks don't translate.

---

## Keywords

marketplace, two-sided market, three-sided market, multi-sided market, supply, demand, liquidity, take rate, network effects, chicken and egg, GMV, repeat rate, fill rate, supply density

---

## Clarify First

Before scoring, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Measurement unit** — whole marketplace or one liquid segment (city/category)? Liquidity beats GMV; a blended global number can hide a broken core (sets what the score actually describes)
- [ ] **Category + take rate** — benchmarks vary widely (Etsy ~6.5% vs Uber ~25-30%), so the take-rate-sustainability dimension is meaningless without the category
- [ ] **Supply, demand, and fill rate** — drive the liquidity and balance dimensions, usually the binding constraint
- [ ] **Repeat rate** — drives repeat-strength; a low repeat often signals off-platform leakage rather than a healthy marketplace

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the score.

## Quick Start

```bash
python scripts/marketplace_health_scorer.py metrics.json
```

Scores marketplace health across liquidity, supply/demand balance, take rate sustainability, repeat rate, and network-effect strength.

---

## Core Workflows

### Workflow 1: Marketplace Health Diagnostic
1. Capture key metrics: GMV, take rate, supply, demand, fill rate, repeat rate
2. Run: `python scripts/marketplace_health_scorer.py metrics.json`
3. Identify which dimension is the constraint (usually one of: not enough supply, not enough demand, low repeat, weak liquidity, take rate too high or too low)
4. Plan one focused intervention; don't try to fix all five at once

**Time Estimate:** 2-4 weeks per diagnostic.

### Workflow 2: Chicken-and-Egg Strategy
1. Read `references/marketplace_dynamics.md`
2. Identify your "constrained side" (usually supply for new marketplaces)
3. Pick a strategy: subsidize the constrained side, single-player mode, vertical wedge, geographic concentration
4. Measure liquidity in the smallest viable unit (one city, one category, one buyer segment)

**Time Estimate:** 6-12 months for first liquid segment.

### Workflow 3: Take-Rate Decision
1. Read `references/take_rate_design.md`
2. Benchmark category norms (eBay 10-13%, Airbnb 14%, Uber 25-30%, Etsy 6.5%, vertical B2B varies)
3. Decide: high take rate (full-stack with lots of value-add) vs. low take rate (commodity matching)
4. Plan trajectory: most marketplaces *raise* take rate over time as value-adds compound

**Time Estimate:** 4-8 weeks for first take-rate decision.

---

## Tools

### marketplace_health_scorer.py

Scores marketplace health on five dimensions: liquidity, balance, take-rate sustainability, repeat-rate strength, and supply density.

```bash
python scripts/marketplace_health_scorer.py metrics.json
python scripts/marketplace_health_scorer.py metrics.json --json
```

---

## Reference Guides

- **`references/marketplace_dynamics.md`** — Chicken-and-egg, liquidity, network effects, vertical / horizontal trade-offs
- **`references/take_rate_design.md`** — Take rate benchmarks, when to raise / lower, full-stack vs lean

---

## Templates

- **`assets/marketplace_metrics_template.json`** — Input file for the health scorer with example values

---

## Best Practices

- **Liquidity over GMV.** A marketplace with $10M GMV across 1,000 cities is mostly broken; the same GMV in 5 cities can be liquid and growing.
- **Pick a wedge.** New marketplaces almost always start narrow (single city, single category, single segment) and expand.
- **Measure repeat early.** Marketplaces without repeat are often serving as infrastructure for off-platform transactions (a leakage problem to fix or accept).
- **Take rate ratchets up, rarely down.** Start low to attract supply; add value-adds (payments, fulfillment, insurance, financing) that justify higher take rate.
- **Single-side first when possible.** Some categories let you build a tool for one side that becomes a marketplace once liquid (e.g., OpenTable started as restaurant software).
- **Beware of weak network effects.** Many "marketplaces" lack real network effects — supply on one platform doesn't make demand stickier on that platform. Examine carefully.

---

## Integration Points

- Pairs with `business-growth/pricing-strategy` — take rate is essentially marketplace pricing
- Pairs with `c-level-advisor/cs-fundraising-advisor` — marketplace investor expectations differ from SaaS
- Pairs with `marketing/landing-page-generator` for supply / demand recruitment funnels

---

## proptech-advisor

Source path: `references/vertical-advisors/proptech-advisor/SKILL.md`

# Proptech Advisor

Strategic frameworks for property-technology founders, operators, and product leaders.

> **Disclaimer:** Frameworks only. Real estate is heavily regulated state-by-state — engage real-estate-licensed counsel for binding decisions.

---

## Keywords

proptech, real estate, real-estate, MLS, brokerage, broker, agent, iBuyer, property management, multifamily, commercial real estate, CRE, RESPA, fair housing, listings, transaction, escrow, title

---

## Quick Start

```bash
python scripts/market_segment_classifier.py description.txt
```

Classifies a proptech idea by segment (transaction / listings / financing / management / services / data) and surfaces the regulatory and business considerations for that segment.

---

## Core Workflows

### Workflow 1: Market Segment Classification
1. Run the classifier to identify the segment
2. Cross-reference with `references/proptech_segments.md`
3. Identify regulatory exposure: state real-estate licensing, RESPA, fair housing, MLS access
4. Decide go/no-go before deeper investment

**Time Estimate:** 4-6 weeks for first scope.

### Workflow 2: Brokerage / MLS Strategy
1. Read `references/mls_and_brokerage.md`
2. Decide: become a broker (license required), partner with one, or stay outside the transaction
3. Plan MLS access strategy (RESO Web API, IDX, VOW, broker reciprocity)
4. Engage real-estate counsel before customer-facing launch

**Time Estimate:** 4-12 weeks depending on path.

### Workflow 3: Residential vs Commercial Decision
1. Each is a different industry. Commercial has different buyers, deal sizes, sales cycles, regulations.
2. Pick one for first $1M-$5M ARR; expand only after that motion is repeatable.

**Time Estimate:** 4-8 weeks.

---

## Tools

### market_segment_classifier.py

Classifies a proptech business description into one or more proptech segments and surfaces the regulatory considerations for each.

```bash
python scripts/market_segment_classifier.py description.txt
python scripts/market_segment_classifier.py description.txt --json
```

**Segments detected:**
- Transaction (iBuyer, marketplace, brokerage tech)
- Listings (search, valuation, comparable analysis)
- Financing (mortgage tech, alt financing, rent-to-own)
- Management (property management, multifamily ops, tenant experience)
- Services (insurance, title, escrow, inspection, moving)
- Data and infrastructure (PropTech B2B SaaS for industry players)

---

## Reference Guides

- **`references/proptech_segments.md`** — Segments overview, regulatory exposure per segment, business model patterns
- **`references/mls_and_brokerage.md`** — How MLS works, IDX/VOW/RESO, broker licensing, partnership models

---

## Templates

- **`assets/proptech_segment_assessment.md`** — Decision template for capturing segment, regulatory, GTM decisions

---

## Best Practices

- **Real estate is state-by-state.** US has 50+ regulatory regimes for licensing, agency, fair housing, escrow, and disclosure.
- **MLS is gated.** Most MLSs require broker membership for full access. Plan accordingly.
- **RESPA is real.** Real Estate Settlement Procedures Act prohibits kickbacks; affiliated business arrangements need proper structuring.
- **Fair housing is non-negotiable.** Algorithms ranking properties by neighborhood demographics or "school quality" can produce illegal disparate impact.
- **Residential and commercial are different industries.** Don't try to serve both in one product.
- **Cyclical industry.** Transaction-based proptech sees revenue swings with rate cycles; build resilience.
