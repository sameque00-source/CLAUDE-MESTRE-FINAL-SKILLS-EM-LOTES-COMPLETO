# Domain: marketing
Source Skills in this domain: 39

---

## ab-test-setup

Source path: `references/marketing/ab-test-setup/SKILL.md`

# A/B Test Setup Skill

## Overview

Production-ready A/B testing toolkit for calculating sample sizes, designing rigorous test plans, and analyzing results with statistical significance testing. Designed for growth teams, product managers, and marketers who need to make data-driven decisions from controlled experiments.

## Clarify First

Before designing the test, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Hypothesis + primary metric** — what change you expect and the single metric that judges it (drives test plan + analysis)
- [ ] **Baseline conversion rate** — the current rate the metric sits at today (drives sample size calculation)
- [ ] **Minimum detectable effect (MDE)** — smallest lift worth detecting (drives required samples + duration)
- [ ] **Daily traffic available** — eligible visitors per day per variant (determines how long the test must run)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
# Calculate required sample sizes for a test
python scripts/sample_size_calculator.py --baseline 0.05 --mde 0.10 --power 0.80

# Design a complete A/B test plan
python scripts/test_designer.py test_config.json

# Analyze A/B test results
python scripts/results_analyzer.py results.json
```

## Tools Overview

| Tool | Purpose | Input | Output |
|------|---------|-------|--------|
| `sample_size_calculator.py` | Sample size calculation | Baseline rate, MDE, power | Required samples + duration |
| `test_designer.py` | Test plan design | JSON test config | Complete test plan document |
| `results_analyzer.py` | Results analysis | JSON with test results | Statistical analysis + recommendation |

## Workflows

### Workflow 1: New A/B Test Setup

1. Define hypothesis and success metric
2. Run `sample_size_calculator.py` with baseline conversion and minimum detectable effect
3. Create test configuration JSON (see Common Patterns)
4. Run `test_designer.py` to generate complete test plan
5. Share plan with stakeholders for alignment before launch

### Workflow 2: Test Results Analysis

1. Collect test results into JSON format
2. Run `results_analyzer.py` to get statistical significance
3. Review confidence interval, p-value, and effect size
4. Check for segment-level effects if overall result is inconclusive
5. Make ship/no-ship decision based on analysis

### Workflow 3: Experimentation Program Review

1. Compile results from multiple past tests
2. Run `results_analyzer.py --batch` on all results
3. Review win rate, average effect size, and velocity
4. Identify patterns in winning vs losing tests
5. Optimize test pipeline based on learnings

## Reference Documentation

See `references/ab-testing-guide.md` for comprehensive methodology covering:
- Statistical foundations (z-tests, confidence intervals)
- Sample size theory and trade-offs
- Common experimentation pitfalls
- Multi-variant and sequential testing
- Bayesian vs frequentist approaches

## Common Patterns

### Pattern: Test Configuration JSON
```json
{
  "test_name": "Homepage CTA Button Color",
  "hypothesis": "Changing the CTA button from blue to green will increase click-through rate",
  "metric_primary": "cta_click_rate",
  "metric_secondary": ["signup_rate", "bounce_rate"],
  "baseline_rate": 0.045,
  "minimum_detectable_effect": 0.10,
  "significance_level": 0.05,
  "power": 0.80,
  "variants": [
    {"name": "control", "description": "Current blue CTA button"},
    {"name": "treatment", "description": "Green CTA button"}
  ],
  "daily_traffic": 5000,
  "allocation": {"control": 0.50, "treatment": 0.50}
}
```

### Pattern: Test Results JSON
```json
{
  "test_name": "Homepage CTA Button Color",
  "variants": {
    "control": {"visitors": 12500, "conversions": 563},
    "treatment": {"visitors": 12500, "conversions": 625}
  },
  "metric": "cta_click_rate",
  "significance_level": 0.05
}
```

### Quick Reference: Common Effect Sizes

| Context | Small Effect | Medium Effect | Large Effect |
|---------|-------------|---------------|--------------|
| Conversion Rate | 2-5% relative | 5-15% relative | > 15% relative |
| Revenue per User | 1-3% | 3-8% | > 8% |
| Engagement Rate | 3-5% | 5-10% | > 10% |

---

## ad-creative

Source path: `references/marketing/ad-creative/SKILL.md`

# Ad Creative

Production-grade ad creative design, iteration, and optimization across all major advertising platforms.

---

## Table of Contents

- [Keywords](#keywords)
- [Quick Start](#quick-start)
- [Core Workflows](#core-workflows)
- [Platform Specifications](#platform-specifications)
- [Creative Frameworks by Funnel Stage](#creative-frameworks-by-funnel-stage)
- [Headline Formula Library](#headline-formula-library)
- [Iteration Methodology](#iteration-methodology)
- [A/B Testing Framework](#ab-testing-framework)
- [Quality Validation](#quality-validation)
- [Best Practices](#best-practices)
- [Integration Points](#integration-points)

---

## Keywords

ad creative, ad copy, headline generation, RSA headlines, Meta ad copy, LinkedIn ads, Google Ads, Twitter/X ads, TikTok ads, creative testing, A/B testing, ad variations, bulk creative, performance creative, display ads, search ads, social ads, CTA optimization, ad compliance, character limits, creative matrix, ad iteration, conversion copy, platform-specific ads

---

## Clarify First

Before generating the copy, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Product/offer + value proposition** — one sentence on what changes in the customer's life (drives every headline + body line)
- [ ] **Target audience + awareness level** — who they are and how they describe the problem (sets language and creative framework)
- [ ] **Platform + ad format** — Google / Meta / LinkedIn / Twitter/X / TikTok and placement (sets character limits, tone, compliance rules)
- [ ] **Funnel stage** — awareness, consideration, or decision (selects the framework: problem-led vs solution-led vs proof-led)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

### Generate Ad Copy from Scratch

1. Define product, audience, and funnel stage
2. Select platform and ad format from the specs table
3. Choose creative framework matching funnel stage
4. Generate 8-15 headline variations using formula library
5. Write body copy per platform character limits
6. Run quality validation checklist before submission

### Iterate on Existing Ads

1. Collect performance data (CTR, CVR, CPA) for current ads
2. Diagnose winning pattern: hook type, emotional driver, CTA style
3. Generate 3-5 on-theme variations preserving the winning pattern
4. Generate 2-3 new angle tests for exploration
5. Validate all copy against platform compliance rules

---

## Core Workflows

### Workflow 1: Full Creative Set Generation

**Step 1: Define the Creative Brief**

Document before writing any copy:

```markdown
## Creative Brief
- Product/Offer: [Specific product, feature, or lead magnet]
- Value Proposition: [One sentence — what changes in the customer's life]
- Target Audience: [Job title, pain point, awareness level]
- Platform(s): [Google / Meta / LinkedIn / Twitter/X / TikTok]
- Funnel Stage: [Awareness / Consideration / Decision]
- Existing Creative: [Yes/No — if yes, attach performance data]
- Budget Context: [Daily/monthly spend, CPA targets]
```

**Step 2: Generate Headlines by Formula Type**

Produce minimum 10 headlines, distributed across formula categories:
- 3 benefit-first headlines
- 2 curiosity headlines
- 2 social proof headlines
- 2 problem agitation headlines
- 1 urgency headline (only if genuine scarcity exists)

**Step 3: Write Platform-Specific Body Copy**

For each platform, write 2-3 body copy variations:
- Respect character limits exactly
- Match tone to platform norms
- Include CTA aligned with landing page offer

**Step 4: Assemble Ad Sets**

Organize into testable ad sets:

```
[AD SET: Benefit-First] | [Platform] | [Funnel Stage]
  Headline A: "..." (28/30 chars)
  Headline B: "..." (26/30 chars)
  Body: "..." (87/90 chars)
  CTA: "Start Free Trial"
```

**Step 5: Validate and Submit**

Run every ad through the quality checklist before upload.

### Workflow 2: Performance-Based Iteration

**Step 1: Audit Current Creative**

For each running ad, classify:
- Hook type: Problem / Benefit / Curiosity / Social Proof / Urgency
- Emotional driver: Fear / Ambition / FOMO / Frustration / Relief
- CTA type: Click / Sign up / Learn more / Book / Download
- Performance tier: Winner / Average / Underperformer

**Step 2: Extract the Winning Pattern**

Identify what the top performers share:
- Specific numbers vs. vague claims
- Customer voice vs. brand voice
- Direct benefit vs. emotional appeal
- Short vs. long format

**Step 3: Generate Variations**

- 3-5 on-theme variations (same hook type, different angle)
- 2-3 exploration variations (new hook type, untested territory)

**Step 4: Build a Creative Testing Matrix**

| Angle | Google | Meta | LinkedIn |
|-------|--------|------|----------|
| Benefit-first | [copy] | [copy] | [copy] |
| Social proof | [copy] | [copy] | [copy] |
| Problem agitation | [copy] | [copy] | [copy] |

### Workflow 3: Cross-Platform Adaptation

**Step 1: Lock the Core Message**

Define the single transferable message that works across all platforms.

**Step 2: Adapt Per Platform**

Reformat (not rewrite from scratch):
- Adjust character count to platform specs
- Modify tone (LinkedIn = professional, TikTok = casual, Google = direct)
- Change CTA style to match platform conventions
- Adjust visual/copy balance per platform norms

---

## Platform Specifications

### Character Limits Reference

| Platform | Format | Headline Limit | Body/Description Limit | Key Constraints |
|----------|--------|---------------|------------------------|-----------------|
| Google RSA | Search | 30 chars x 15 | 90 chars x 4 descriptions | Max 3 pinned positions |
| Google Display | Display | 30 chars x 5 short, 90 chars x 1 long | 90 chars x 5 | Requires 5+ images |
| Google Performance Max | Multi | 30 chars x 5 short, 90 chars x 5 long | 90 chars x 5 | Auto-placement |
| Meta Feed | Image/Video | 40 chars headline | 125 chars primary text (recommended) | Image text < 20% |
| Meta Stories | Vertical | 40 chars | 125 chars | 9:16 aspect ratio |
| LinkedIn Sponsored | Content | 70 chars headline | 150 chars intro text | No clickbait policies |
| LinkedIn Message | InMail | 60 chars subject | 1,500 chars body | Personalization required |
| Twitter/X | Promoted | 70 chars headline | 280 chars total | No deceptive tactics |
| TikTok In-Feed | Video | No text overlay limit | 80-100 chars caption | Hook in first 2-3 seconds |
| TikTok Spark | Native | Varies | 100 chars | Must use creator content |

### Platform-Specific Rejection Triggers

**Google Ads:**
- ALL CAPS (except acronyms like SaaS, API)
- Excessive punctuation (!!!, ???, ....)
- Misleading claims ("guaranteed #1 ranking")
- Trademarked competitor names in headlines
- Gimmicky formatting (s.p.a.c.e.d letters)

**Meta Ads:**
- Image text exceeding 20% of image area
- Before/after body transformation images
- Personal attributes assumptions ("Are you overweight?")
- Fake UI elements (play buttons, notifications)
- Sensationalized content

**LinkedIn Ads:**
- Clickbait headlines
- Misleading claims about job opportunities
- Profanity or inappropriate language
- Targeting by sensitive categories

---

## Creative Frameworks by Funnel Stage

### Awareness Stage: Lead with the Problem

The audience does not know you. Meet them where they are.

**Framework: Problem > Amplify > Hint**

```
Hook: [State the problem in their language]
Amplify: [Show the cost of inaction]
Hint: [Tease that a solution exists — don't pitch yet]
```

**What works at awareness:**
- Curiosity hooks that create an open loop
- Statistic-led hooks with surprising data
- "You know that feeling when..." relatable hooks
- Questions that make them stop scrolling

**What fails at awareness:**
- Product pitches to cold audiences
- Feature lists nobody asked for
- Brand-centric messaging ("We're the leading...")

### Consideration Stage: Lead with the Solution

They know the problem. They are evaluating options.

**Framework: Solution > Mechanism > Proof**

```
Hook: [Name the outcome they want]
Mechanism: [Explain how you deliver it differently]
Proof: [Show evidence it works]
```

**What works at consideration:**
- Benefit-first headlines with specificity
- Comparison frames ("Unlike X, we do Y")
- How-it-works explanations in 3 steps
- Case study references with real numbers

### Decision Stage: Lead with Proof

They are close. Remove the last objection.

**Framework: Proof > Risk Removal > Action**

```
Hook: [Testimonial, case study, or result with numbers]
Risk Removal: [Free trial, money-back, no credit card]
Action: [Specific, clear CTA]
```

**What works at decision:**
- Social proof headlines with specific metrics
- Guarantee-first positioning
- Before/after transformation stories
- Urgency only if real (limited slots, deadline-based pricing)

---

## Headline Formula Library

### Benefit-First Formulas

```
[Verb] [specific outcome] [timeframe or qualifier]
```

Examples:
- "Cut your churn rate by 30% without chasing customers"
- "Ship features your team actually uses"
- "Hire senior engineers in 2 weeks, not 4 months"
- "Reduce support tickets by 60% this quarter"

### Curiosity Formulas

```
[Surprising claim or counterintuitive angle]
```

Examples:
- "The email sequence that gets replies when your first one fails"
- "Why your best customers leave at 90 days"
- "What your analytics dashboard is hiding from you"

### Social Proof Formulas

```
[Number] [people/companies] [outcome]
```

Examples:
- "1,200 SaaS teams use this to reduce support tickets"
- "Trusted by 40,000 developers across 80 countries"
- "How Stripe doubled activation in 6 weeks"

### Problem Agitation Formulas

```
[Describe the pain vividly in their language]
```

Examples:
- "Still losing 40% of signups before they see value?"
- "Your ads are running, your budget is spending, and you can't tell what's working"
- "Another month of manually updating spreadsheets?"

### Urgency Formulas (Use Only with Genuine Scarcity)

```
[Real constraint + specific deadline or quantity]
```

Examples:
- "Q1 pricing ends March 31 — new rates from April 1"
- "Only 3 onboarding slots open this month"

Anti-pattern to avoid:
- "LIMITED TIME DEAL!! ACT NOW!!!" — gets rejected and destroys trust

---

## Iteration Methodology

### Step 1: Diagnose the Winner

For every winning ad, document:

| Dimension | Answer |
|-----------|--------|
| Hook type | Problem / Benefit / Curiosity / Social Proof |
| Funnel stage served | Awareness / Consideration / Decision |
| Emotional driver | Fear / Ambition / FOMO / Frustration / Relief |
| CTA friction level | Low (learn more) / Medium (free trial) / High (book demo) |
| Specificity level | Vague claims / Specific numbers / Case study reference |

### Step 2: Generate On-Theme Variations

Preserve the winning pattern, vary one element at a time:
- Same hook type, different product angle
- Same emotional driver, different customer scenario
- Same structure, different proof point

### Step 3: Test New Territory

For every 3-5 on-theme variations, include 2-3 exploration ads:
- Different hook type than the winner
- Different emotional driver
- Different audience segment language

### Step 4: Measure and Learn

After 7-14 days with statistical significance:
- Promote winners to main rotation
- Pause underperformers
- Document what worked for the creative playbook
- Feed learnings into next iteration cycle

---

## A/B Testing Framework

### Testing Hierarchy (Highest to Lowest Impact)

1. **Creative concept/angle** — The biggest lever. Test different value propositions
2. **Hook/headline** — First impression. Test different opening patterns
3. **Visual style** — Image vs. video, lifestyle vs. product, dark vs. light
4. **Body copy** — Supporting argument. Test different proof points
5. **CTA** — Action text. Test different friction levels

### Testing Rules

- Test one variable at a time per ad set
- Minimum 1,000 impressions per variant before drawing conclusions
- Run tests for 7-14 days minimum
- Use platform-native A/B tools when available
- Document every test hypothesis, variant, and result
- Calculate statistical significance before declaring winners (95% confidence)

### Test Documentation Template

```markdown
## A/B Test: [Name]
- Hypothesis: [If we change X, then Y will improve because Z]
- Variable: [Headline / Body / CTA / Visual]
- Control: [Current version]
- Variant: [New version]
- Metric: [CTR / CVR / CPA / ROAS]
- Duration: [Start date - End date]
- Sample size: [Impressions per variant]
- Result: [Winner + confidence level]
- Learning: [What we learned for future creative]
```

---

## Quality Validation

### Pre-Submission Checklist

**Platform Compliance:**
- [ ] All character counts within platform limits
- [ ] No ALL CAPS except standard acronyms
- [ ] No excessive punctuation (!!! or ??? or ....)
- [ ] No trademarked competitor names in restricted positions
- [ ] No platform name references in copy ("Facebook," "Google")
- [ ] No fake UI elements in images
- [ ] Image text ratio under 20% for Meta

**Copy Quality:**
- [ ] Headline makes sense standalone without description
- [ ] Specific claims over vague claims ("save 3 hours" not "save time")
- [ ] CTA matches the landing page offer exactly
- [ ] No unsubstantiated superlatives (#1, best-in-class, industry-leading)
- [ ] No claims that require disclaimers you have not included

**Strategic Alignment:**
- [ ] Copy matches the target funnel stage
- [ ] Language matches how the audience describes this problem
- [ ] Hook type varies across the ad set (not all the same formula)
- [ ] Landing page message matches ad promise

**Common Rejection Reasons to Pre-Check:**
- Misleading destination (ad says X, landing page says Y)
- Unsubstantiated claims about results or performance
- Trademark violations in headline text
- Policy-violating content categories (alcohol, healthcare claims, financial guarantees)

---

## Best Practices

1. **Write 3x more headlines than you need** — Generate 15-20, select the best 8-10. Creative quality increases with volume.

2. **Pin headlines strategically** — In Google RSA, pin only your strongest headline to Position 1. Let the algorithm optimize the rest.

3. **Never reuse landing page copy verbatim** — Ad copy and landing page should feel connected but not identical. The ad earns the click; the page earns the conversion.

4. **Refresh creative every 2-4 weeks** — Ad fatigue degrades performance. Track frequency metrics and replace creative before CTR declines.

5. **Localize, do not just translate** — Different markets require different cultural references, humor styles, and proof points.

6. **Match CTA friction to funnel stage** — Awareness: "Learn more." Consideration: "See how it works." Decision: "Start free trial."

7. **Use dynamic keyword insertion carefully** — It improves relevance but can produce awkward headlines. Always preview all combinations.

8. **Test video vs. static on Meta and TikTok** — Video consistently outperforms static for awareness, but static can win for retargeting.

9. **Lead with mobile** — 80%+ of social ad impressions are mobile. Design for small screens first.

10. **Keep proof points current** — "Trusted by 500 companies" should update as you grow. Stale numbers erode credibility.

---

## Integration Points

- **Paid Ads** — Use for campaign strategy, audience targeting, and budget optimization. Ad Creative handles the copy; Paid Ads handles the campaign.
- **Copywriting** — Use for landing page and long-form web copy. Ad creative follows different constraints (character limits, platform compliance).
- **Campaign Analytics** — Use to measure ad performance and feed learnings back into the iteration cycle.
- **Marketing Psychology** — Use psychological principles (anchoring, social proof, loss aversion) to strengthen ad messaging.
- **Brand Guidelines** — Reference brand voice and visual standards to maintain consistency across ad creative.

---

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Ad rejected by platform | Policy violation (caps, claims, trademarked terms) | Run `headline_generator.py` to generate compliant variants. Check rejection triggers. |
| All headlines same style | No formula diversity | Generate across 5 formula types: benefit, curiosity, social proof, problem, urgency. |
| CTR declining across ad set | Creative fatigue | Run `creative_fatigue_detector.py`. Refresh every 2-4 weeks. |
| High CTR but low conversions | Ad-to-landing-page mismatch | Ensure headline promise matches landing page. Message match is the #1 conversion factor. |
| Can't fill all Google RSA slots | Not enough headline variations | Use `headline_generator.py` to produce 15+ variations from value proposition. |
| Video underperforming on Meta | Hook not in first 2-3 seconds | 80%+ of social impressions are mobile. Hook must appear in first 2 seconds. |
| Same CPA across all creative | Not testing enough angles | Build a creative testing matrix with 5 hook types x platforms. Use `creative_matrix_builder.py`. |

---

## Success Criteria

- 3+ creative variants per ad group/set (minimum for testing)
- All copy within platform character limits with zero rejections
- Headline formula mix: benefit, curiosity, social proof, problem, urgency
- Creative refreshed every 2-4 weeks before fatigue signals appear
- A/B test documentation for every test: hypothesis, variants, result, learning
- Winning patterns documented in creative playbook for institutional knowledge
- CTR above platform benchmarks with declining CPA trend

---

## Scope & Limitations

**In Scope:** Ad headline/body copy generation, platform-specific formatting, A/B testing frameworks, creative iteration methodology, compliance validation, cross-platform adaptation.

**Out of Scope:** Visual design/production, video editing, campaign management (use paid-ads), landing page copy (use copywriting), media buying.

---

## Python Automation Tools

### 1. Headline Generator (`scripts/headline_generator.py`)
Generates ad headline variations from a value proposition using proven formula patterns, scored for platform compliance.

```bash
python scripts/headline_generator.py --value-prop "Reduce churn by 30%" --platform google --audience "SaaS teams"
python scripts/headline_generator.py --value-prop "Reduce churn by 30%" --json
```

### 2. Creative Fatigue Detector (`scripts/creative_fatigue_detector.py`)
Analyzes ad performance trends (CTR, CPA, frequency) to detect creative fatigue and recommend refresh timing.

```bash
python scripts/creative_fatigue_detector.py campaign_data.json
python scripts/creative_fatigue_detector.py --sample --json
```

### 3. Creative Matrix Builder (`scripts/creative_matrix_builder.py`)
Generates a cross-platform creative testing matrix from a brief, organized by hook type and funnel stage.

```bash
python scripts/creative_matrix_builder.py brief.json
python scripts/creative_matrix_builder.py --sample --json
```

---

## aeo

Source path: `references/marketing/aeo/SKILL.md`

# Answer Engine Optimization (AEO)

End-to-end practice of optimizing content to be cited by LLMs when they generate answers. Covers the technical foundations (how LLMs select sources), content structuring patterns (Q&A schema, citation-worthy patterns), measurement (which content gets cited, by which LLM, how often), and the strategic positioning that differentiates AEO from traditional SEO and from AI-SEO.

This skill is provider-aware but provider-agnostic: works for content optimized for ChatGPT, Claude, Perplexity, Gemini, Copilot, and emerging AI surfaces.

---

## When to use this skill

| Situation | Skill applies |
|-----------|---------------|
| Designing content strategy that targets LLM citation | Yes — start with **AEO fundamentals** |
| Auditing existing content for LLM citability | Yes — `scripts/aeo_content_auditor.py` |
| Adding Q&A schema to content | Yes — `scripts/schema_qa_generator.py` |
| Tracking which content gets cited by LLMs | Yes — `scripts/citation_extractor.py` |
| Choosing between AEO and traditional SEO investment | Yes — see **AEO vs SEO vs AI-SEO** |
| Ranking in Perplexity / Google AI Overviews | Use `marketing/ai-seo` |
| Traditional SEO (rank in Google search results) | Use `marketing/seo-specialist` |

---

## AEO vs SEO vs AI-SEO

Three distinct (but overlapping) practices. Confusing them leads to wasted investment.

| Practice | Optimizes for | Surface | Success metric |
|----------|---------------|---------|----------------|
| **Traditional SEO** | Google / Bing rankings | SERPs (organic blue links) | Position, clicks |
| **AI-SEO** | AI search engines | Perplexity, Google AI Overviews, You.com | Position in AI search results, traffic from citations |
| **AEO (this skill)** | LLM citation in answers | ChatGPT, Claude, Gemini, Copilot answers | Citation rate, brand mention in LLM outputs |

### Strategic positioning

For most B2B brands:
- **Traditional SEO**: still 50-70% of organic traffic. Don't abandon.
- **AI-SEO**: emerging 10-20% of search-driven engagement. Growing fast.
- **AEO**: 5-15% of LLM-mediated user discovery. Largest growth potential.

Optimize content for all three simultaneously; the techniques substantially overlap.

---

## The AEO funnel

Users find brands through LLMs in a different funnel than search:

```
Traditional search:           AEO funnel:
1. User types query           1. User asks LLM a question
2. SERPs show ~10 results     2. LLM generates answer
3. User clicks one            3. LLM cites N sources (1-10)
4. User reads page            4. User reads answer; may click cited source
5. User converts              5. User attributes answer to LLM (less so to cited brand)
```

Key implications:
- **Citation is the new click.** When LLM cites your content, you don't always get a visit — but you get attribution.
- **Brand-as-source becomes the goal.** Even without click, being cited builds brand association.
- **Quality > volume.** LLMs cite a small number of sources; quality of citation matters more than ranking position.
- **Trust signals matter more.** LLMs avoid citing low-authority sources.

See [references/aeo-fundamentals.md](references/aeo-fundamentals.md) for the deep mechanics of how LLMs select sources, the citation models per provider, and the trust signals that drive selection.

---

## The 5 content patterns that get cited

After analysis of LLM citation behavior, five content patterns dominate:

### Pattern 1: Definitional content with clear claims

LLMs cite sources for definitions, facts, and short claims. Pages that answer "What is X?" with a clean 2-3 sentence definition followed by elaboration get cited often.

**Structure:**
```
[Term] is [crisp definition in 1-2 sentences].

[Elaboration with context and nuance — 1-3 paragraphs].

[Related concepts / scope / boundaries — optional].
```

### Pattern 2: Comparative tables

LLMs use tables to extract comparisons. Markdown tables in published content (or HTML equivalents) get cited when users ask "X vs Y."

```markdown
| Feature | Product A | Product B |
|---------|-----------|-----------|
| Price | $X | $Y |
| Speed | Z ms | W ms |
| Support | 24/7 | Business hours |
```

### Pattern 3: Step-by-step procedural content

"How to [task]" content with explicit numbered steps. LLMs reproduce procedural steps; the cited source becomes the authoritative reference.

### Pattern 4: Statistics + data with sources

LLMs cite content that provides numerical facts with attribution. "According to [your study], X% of [thing] does Y" is repeatable and citable.

### Pattern 5: Lists with explanations

"Top N approaches to X" with each item explained gets cited when users ask comparative or enumeration questions.

See [references/llm-content-structuring.md](references/llm-content-structuring.md) for deep patterns including FAQ schema, citation hooks, voice-search optimization, and LLM-readable structure markers.

---

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Target queries** — the actual questions customers ask LLMs about your category (drives which content to audit and restructure)
- [ ] **Your brand name** — exact wording to track in answers vs competitors (drives citation extraction)
- [ ] **Target LLM surface** — ChatGPT / Claude / Perplexity / Gemini (citation behavior and trust signals differ per provider)
- [ ] **Canonical page/content** — the high-value page to be the authoritative source (drives schema generation + pattern restructuring)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick start

1. **Audit existing content**: `python3 scripts/aeo_content_auditor.py --path ./content`
2. **Add Q&A schema to high-value pages**: `python3 scripts/schema_qa_generator.py --content article.md`
3. **Track citations from competitors**: `python3 scripts/citation_extractor.py --query "What is X?" --brand "Your Brand"`
4. **Iterate**: monthly content review with AEO scoring

---

## End-to-end workflows

### Workflow: AEO content strategy from scratch

1. **Identify target queries** — what questions do potential customers ask LLMs about your category?
2. **Audit competitor citations** — which brands get cited for those queries? `scripts/citation_extractor.py`
3. **Audit your existing content** — score current content for AEO patterns: `scripts/aeo_content_auditor.py`
4. **Prioritize 10-20 high-value pages** — those that should be the canonical source
5. **Restructure per AEO patterns** — definitional content, tables, step-by-step, statistics
6. **Add structured data** — `scripts/schema_qa_generator.py` generates FAQ schema
7. **Build authority signals** — backlinks, citations, mentions
8. **Monitor monthly** — track citation rate trend

### Workflow: Audit individual content piece

1. Run `scripts/aeo_content_auditor.py --path article.md --format markdown`
2. Review per-pattern scoring (5 patterns above)
3. Identify gaps: missing definition, no table, no clear steps, no stats, no list
4. Restructure to add 2-3 missing patterns
5. Add FAQ schema with `scripts/schema_qa_generator.py`
6. Re-audit to confirm improvements

### Workflow: Competitive citation analysis

1. Identify 10-20 key queries in your category
2. Query each LLM (ChatGPT, Claude, Perplexity, Gemini) with those questions
3. Record citations + brands mentioned
4. Analyze: which brands dominate? what content do they have?
5. Identify white-space queries (no clear dominant source yet)
6. Prioritize content creation for white-space queries

### Workflow: Measure AEO performance

1. **Citation rate**: % of queries where your brand is cited (target: 30%+ for category leaders)
2. **Brand mention rate**: % of queries where your brand is mentioned (cited or not)
3. **Source quality**: are you cited as primary source or supporting?
4. **Click-through from citations**: traffic attributable to LLM citations (requires source tracking)
5. **Voice tracking**: how is your brand characterized (positive / neutral / negative attributes)

See [references/citation-tracking-and-measurement.md](references/citation-tracking-and-measurement.md) for measurement methodologies, attribution challenges, and competitive benchmarking.

---

## Common AEO failures

- **Optimizing only for Google SERP**: misses the LLM citation surface entirely
- **Generic content without specific claims**: LLMs prefer specific, factual content over generic explanation
- **No structure markers** (headings, lists, tables): LLMs can't extract specific information
- **No FAQ schema**: missed opportunity for Q&A surfacing in AI Overviews
- **Stuffed keyword content**: LLMs prefer natural language with clear meaning
- **No authority signals**: LLMs avoid citing low-trust sources
- **Outdated content**: LLMs prefer recent, current content
- **Hidden behind paywalls**: LLMs can't cite what they can't access
- **No structured data**: missed opportunity for richer extraction
- **Brand-first content**: LLMs prefer informational content over promotional

---

## LLM-by-LLM citation behavior

Different LLMs have different citation behaviors:

| LLM | Citation style | What gets cited |
|-----|----------------|-----------------|
| ChatGPT | Inline citations (when web-enabled); fewer otherwise | Recent, authoritative sources |
| Claude | Citations when grounding enabled (tools); generally avoids unsupported claims | High-quality sources, evidence-based |
| Perplexity | Always cites sources prominently | Recent + authoritative sources |
| Google Gemini / AI Overviews | Cites in AI Overviews + Gemini responses | High-ranking pages + structured data |
| Copilot (Microsoft) | Cites sources prominently | Sources varied |
| Meta AI | Lighter citation | Limited transparency |

Optimize content with structure markers (headings, lists, tables) and authority signals (links, citations, expert attribution) — works across all of these.

---

## Tooling

| Script | Purpose |
|--------|---------|
| `scripts/aeo_content_auditor.py` | Score content for AEO patterns (definition, table, steps, stats, list, structure markers) |
| `scripts/citation_extractor.py` | Parse LLM responses (saved transcripts) for brand citations + competitive analysis |
| `scripts/schema_qa_generator.py` | Generate JSON-LD FAQ schema from content (FAQPage / QAPage / HowTo) |

---

## References

- [aeo-fundamentals.md](references/aeo-fundamentals.md) — how LLMs select sources; citation mechanisms per provider; trust signals
- [llm-content-structuring.md](references/llm-content-structuring.md) — content patterns; Q&A schema; voice-search; structure markers
- [citation-tracking-and-measurement.md](references/citation-tracking-and-measurement.md) — measurement methodologies; attribution; benchmarking

---

## Related skills

- `marketing/ai-seo` — AI search engine ranking (Perplexity, Google AI Overviews); complementary to AEO
- `marketing/seo-specialist` — traditional SEO (Google rankings); foundational; still 50-70% of organic
- `marketing/seo-audit` — technical SEO audit
- `marketing/programmatic-seo` — scaled content production with SEO patterns
- `c-level-advisor/cs-cmo-advisor` — strategic AEO investment decisions

---

## ai-seo

Source path: `references/marketing/ai-seo/SKILL.md`

# AI SEO

Generative engine optimization (GEO) for getting cited by AI search platforms — not just ranked in traditional results.

---

## Table of Contents

- [Keywords](#keywords)
- [Quick Start](#quick-start)
- [How AI Search Differs from Traditional SEO](#how-ai-search-differs-from-traditional-seo)
- [The Three Pillars of AI Citability](#the-three-pillars-of-ai-citability)
- [Core Workflows](#core-workflows)
- [Content Patterns That Get Cited](#content-patterns-that-get-cited)
- [Schema Markup for AI Discovery](#schema-markup-for-ai-discovery)
- [Bot Access Configuration](#bot-access-configuration)
- [Monitoring and Tracking](#monitoring-and-tracking)
- [Best Practices](#best-practices)
- [Integration Points](#integration-points)

---

## Keywords

AI SEO, generative engine optimization, GEO, AI overviews, Google SGE, ChatGPT citations, Perplexity SEO, Claude citations, AI search optimization, semantic search, entity optimization, LLM visibility, AI-generated answers, structured data, schema markup, content extractability, AI citability, GPTBot, PerplexityBot, ClaudeBot, answer engine optimization

---

## Clarify First

Before optimizing, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Target queries** — the questions you want to be cited for (drives which pages to optimize and the extractable blocks to add)
- [ ] **Target AI platform(s)** — Perplexity / ChatGPT / Google AI Overviews / Claude (crawling, indexing, and citation behavior differ per platform)
- [ ] **Brand/entity name** — exact wording to track (drives citation testing and entity optimization)
- [ ] **The page/content to optimize** — the URL or draft being restructured (drives extractability scoring + schema selection)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

### Run an AI Visibility Audit

1. Check robots.txt for AI bot access (GPTBot, PerplexityBot, ClaudeBot)
2. Test top 10 target queries on Perplexity, ChatGPT, and Google AI Overviews
3. Document which queries cite you, which cite competitors, and what content format wins
4. Score key pages against the Extractability Checklist
5. Prioritize pages with highest gap between search volume and current AI citation presence

### Optimize a Page for AI Citation

1. Add a clear definition block in the first 200 words for informational queries
2. Structure content with self-contained H2 sections that can be extracted independently
3. Add numbered steps for process queries, comparison tables for "X vs Y" queries
4. Replace all vague claims with attributed statistics ("According to [Source], [Year]")
5. Implement FAQPage, HowTo, or Article schema markup
6. Verify AI bots are allowed in robots.txt

---

## How AI Search Differs from Traditional SEO

### The Fundamental Shift

Traditional SEO gets your page ranked. AI SEO gets your content cited. These are different optimization targets.

| Dimension | Traditional SEO | AI SEO |
|-----------|----------------|--------|
| Goal | Rank on page 1 | Get cited in AI-generated answers |
| Success metric | Click-through rate | Citation frequency |
| Content priority | Keyword density | Answer extractability |
| Authority signal | Backlinks + domain authority | Backlinks + answer quality + attribution |
| User interaction | User clicks your link | AI extracts your answer; user may never visit |
| Content format | Long-form comprehensive | Self-contained extractable blocks |
| Optimization unit | The page | The paragraph or section |

### What Carries Over from Traditional SEO

- Domain authority still matters. AI systems prefer credible sources.
- Backlinks still signal trust and expertise.
- Technical SEO fundamentals (page speed, mobile-friendly, clean HTML) still apply.
- Quality content with original insights still wins.

### What Changes

- Keyword density matters less than answer clarity and directness
- Page-level optimization expands to section-level and paragraph-level optimization
- Internal linking serves discoverability for AI crawlers, not just PageRank flow
- Structured data becomes a primary signal, not a nice-to-have

---

## The Three Pillars of AI Citability

### Pillar 1: Structure (Extractable)

AI systems pull content in chunks. They find the paragraph, list, or definition that directly answers a query and extract it. Your content must be structured so answers are self-contained.

**Extractability requirements:**
- Definition blocks for "what is X" queries — tight, 1-2 sentence definitions in the first 200 words
- Numbered steps for "how to do X" queries — verb-first, self-contained steps
- Comparison tables for "X vs Y" queries — clean table format with headers
- FAQ blocks for question-based queries — explicit Q&A pairs
- Statistics with full attribution for data-oriented queries

**Anti-patterns that kill extractability:**
- Burying the answer in paragraph 8 of a 4,000-word essay
- Requiring context from previous sections to understand any individual section
- Using narrative prose for comparisons that should be tables
- Placing key definitions only in the conclusion

### Pillar 2: Authority (Citable)

AI systems do not just extract the most relevant answer — they extract the most credible one.

**Authority signals in the AI era:**
- **Domain authority** — High-DA domains get preferential citation
- **Author attribution** — Named authors with credentials outperform anonymous pages
- **Citation chains** — Your content cites credible sources, making you credible in turn
- **Recency** — AI systems prefer current information for time-sensitive queries
- **Original data** — Proprietary research, surveys, and studies get cited more because AI cannot find this data elsewhere
- **Consistent entity presence** — Your brand appears across authoritative sources as an entity

### Pillar 3: Presence (Discoverable)

AI systems must be able to find and index your content.

**Technical requirements:**
- AI crawlers allowed in robots.txt
- Fast page load and clean HTML
- No JavaScript-only rendering for important content
- Schema markup for content type classification
- Proper canonical signals
- HTTPS with valid certificates

---

## Core Workflows

### Workflow 1: AI Visibility Audit

**Step 1: Bot Access Verification**

Check robots.txt for AI crawler permissions:

```
# These bots must NOT be blocked for AI visibility:
GPTBot          # OpenAI / ChatGPT
PerplexityBot   # Perplexity
ClaudeBot       # Anthropic / Claude
Google-Extended # Google AI Overviews
anthropic-ai    # Anthropic (alternate)
Applebot-Extended  # Apple Intelligence
cohere-ai       # Cohere
```

If any AI bot is blocked, that is the single highest priority fix. Zero visibility on that platform until resolved.

**Step 2: Citation Testing**

Test top 10 target queries on each platform:

| Platform | How to Test | What to Record |
|----------|-------------|----------------|
| Perplexity | Search at perplexity.ai, check Sources panel | Cited? Which competitors cited? Content format winning? |
| ChatGPT | Web browsing enabled, check citations | Same |
| Google AI Overviews | Google query, check AI Overview panel | Same |
| Microsoft Copilot | Search at copilot.microsoft.com, check source cards | Same |
| Claude | Web search enabled queries | Same |

**Step 3: Content Extractability Scoring**

Score each key page (0-7):

- [ ] Clear definition of core concept in first 200 words
- [ ] Numbered lists or step-by-step sections for process queries
- [ ] FAQ section with direct Q&A pairs
- [ ] Statistics cited with source name and year
- [ ] Comparisons in table format (not narrative)
- [ ] H1 phrased as an answer or direct statement
- [ ] Schema markup present (FAQPage, HowTo, Article)

Interpretation: 0-3 = needs major restructuring. 4-5 = good baseline. 6-7 = strong.

**Step 4: Competitive Citation Analysis**

For each target query, document:
- Who is currently being cited (top 3 sources per platform)
- What content format wins (definition, list, table, quote)
- What your content lacks that cited competitors provide
- Where you have unique data or expertise competitors lack

### Workflow 2: Page Optimization for AI Citation

**Step 1: Lead with the Answer**

The first paragraph must contain the core answer to the target query. No preamble, no context-setting, no "In today's landscape..." openers.

**Step 2: Structure Self-Contained Sections**

Every H2 section must be answerable as a standalone excerpt:
- Each section opens with its main point
- Each section contains its own evidence
- No section requires reading previous sections to be understood
- Each section could be quoted out of context and still make sense

**Step 3: Add Extractable Content Blocks**

Insert 2-3 of these per key page:
- Definition block (first 200 words)
- Numbered how-to steps (5-10 max, verb-first)
- Comparison table (clean headers, structured data)
- FAQ pairs (question matches natural language query)
- Attributed statistics ("According to [Source] ([Year]), X% of...")
- Expert quote block ("[Name], [Role at Organization]: '[quote]'")

**Step 4: Replace Vague with Specific**

Find and replace every vague claim:
- "Many companies" → name the companies or cite the count
- "Studies show" → name the study, organization, and year
- "Significantly improved" → state the percentage improvement
- "Leading brands" → name at least one
- "Experts say" → name the expert with credentials

**Step 5: Add Schema Markup**

Implement JSON-LD in the page head:

| Content Type | Schema | Impact |
|-------------|--------|--------|
| FAQ sections | FAQPage | High — AI extracts Q&A pairs directly |
| Step-by-step guides | HowTo | High — AI uses step structure |
| Articles and posts | Article | Medium — establishes content authority |
| Product pages | Product | Medium — product comparison queries |
| Author pages | Person | Medium — author credibility signal |
| Company pages | Organization | Medium — entity authority |

### Workflow 3: Entity Optimization

**Step 1: Define Your Entity**

Ensure your brand exists as a recognized entity across the web:
- Wikipedia or Wikidata presence
- Google Knowledge Panel
- Consistent NAP (name, address, phone) across citations
- Structured About page with Organization schema

**Step 2: Build Entity Associations**

Connect your entity to relevant topics:
- Publish original research on topics you want to be cited for
- Get mentioned (with links) on authoritative sites in your domain
- Contribute expert quotes to industry publications
- Maintain active presence on platforms AI systems index

**Step 3: Strengthen the Citation Chain**

Create a network of credible references:
- Your content cites authoritative sources
- Authoritative sources cite your content
- Your author pages link to credentials and publications
- Your brand appears in industry roundups and comparisons

---

## Content Patterns That Get Cited

### Pattern 1: Definition Block

```markdown
**[Term]** is [concise definition in 1-2 sentences]. [One sentence of context
explaining why it matters or how it differs from related concepts].
```

Place within the first 200 words. No hedging, no preamble.

### Pattern 2: Numbered Steps

Requirements for AI extraction:
- Steps are numbered (not bulleted)
- Each step starts with an action verb
- Each step is self-contained (could be quoted alone)
- 5-10 steps maximum (AI truncates longer lists)
- Each step has a brief explanation (1-2 sentences)

### Pattern 3: Comparison Table

Two-column or multi-column tables with clean headers:

```markdown
| Dimension | Option A | Option B |
|-----------|----------|----------|
| Price | $X/mo | $Y/mo |
| Key Feature | Description | Description |
| Best For | Use case | Use case |
```

### Pattern 4: FAQ Block

Explicit Q&A pairs. Questions should match natural language queries:

```markdown
### What is [topic]?
[Direct answer in 1-2 sentences.]

### How does [topic] work?
[Step-by-step explanation.]
```

Mark up with FAQPage schema for maximum discoverability.

### Pattern 5: Attributed Statistics

```markdown
According to [Source Name] ([Year]), X% of [population] [finding].
```

Complete attribution is critical. Unattributed statistics get deprioritized because AI cannot verify the source.

### Pattern 6: Expert Quote Block

```markdown
"[Quote]" — [Name], [Role] at [Organization]
```

Named experts with credentials produce citable units AI systems pick up.

---

## Schema Markup for AI Discovery

### Priority Implementations

**FAQPage Schema (highest impact for informational queries):**

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is [topic]?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Direct answer]"
      }
    }
  ]
}
```

**HowTo Schema (high impact for process queries):**

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to [do thing]",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Step name",
      "text": "Step description"
    }
  ]
}
```

**Article Schema (medium impact, establishes authority):**

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Title",
  "author": {
    "@type": "Person",
    "name": "Author Name",
    "url": "https://author-page"
  },
  "datePublished": "2026-01-15",
  "dateModified": "2026-03-01"
}
```

Validate all schema at schema.org/validator before deployment.

---

## Bot Access Configuration

### Recommended robots.txt Configuration

```
# Allow all AI search crawlers
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: cohere-ai
Allow: /
```

### Training vs. Citation Access

Some organizations want to allow AI citation but block training. This distinction is difficult to enforce because:
- Most AI crawlers use the same bot for both indexing and training
- Blocking the bot blocks both citation and training
- There is no industry-standard mechanism to allow one and block the other

Recommendation: Allow AI bots if you want AI citation visibility. The citation benefits outweigh the training concerns for most commercial content.

---

## Monitoring and Tracking

### Weekly Citation Tracking (20 minutes/week)

Test top 10 target queries on Perplexity and ChatGPT:
- Were you cited? (yes/no)
- Citation rank (1st source, 2nd, 3rd)
- What text was used from your content?
- Any new competitors appearing?

### Google Search Console for AI Overviews

Use the "Search type: AI Overviews" filter in Google Search Console:
- Which queries trigger AI Overview impressions for your site
- Click-through rate from AI Overviews (typically 50-70% lower than organic)
- Which pages get cited most frequently

### Monthly Monitoring Checklist

| Signal | What to Check | Tool |
|--------|---------------|------|
| Perplexity citations | Top 10 queries | Manual testing |
| ChatGPT citations | Top 10 queries | Manual testing |
| Google AI Overviews | Impressions and clicks | Google Search Console |
| Copilot citations | Top 5 queries | Manual testing |
| AI bot crawl activity | Crawl frequency and pages | Server logs / Cloudflare |
| Competitor citations | Who is getting cited for your queries | Manual testing |
| Content freshness | Date signals on key pages | Content audit |

### When Citations Drop

Diagnostic checklist when you lose a citation:
1. Did robots.txt change? (Check for accidental AI bot blocks)
2. Did a competitor publish more extractable content?
3. Did your page structure change? (Restructuring can break citation patterns)
4. Did your domain authority drop? (Check backlink profile)
5. Did the query intent shift? (AI systems may reinterpret the query)

---

## Best Practices

1. **Optimize at the section level, not just the page level** — AI extracts paragraphs and sections, not entire pages. Every H2 block should be independently citable.

2. **Lead with the answer, always** — The first 200 words determine whether AI systems find your content useful. Put the answer there.

3. **Attribute everything** — Unattributed statistics, unnamed experts, and sourceless claims reduce your citability. Name names.

4. **Update quarterly** — AI systems prefer recent content. Update publish dates and refresh data points every 90 days.

5. **Build entity presence** — The stronger your brand's entity recognition across the web, the more AI systems trust and cite you.

6. **Do not choose between traditional SEO and AI SEO** — They are complementary. Many optimization signals overlap. Run both.

7. **Test on multiple platforms** — A page cited on Perplexity may not be cited on ChatGPT. Optimize for the platforms your audience uses.

8. **Monitor competitors monthly** — Track who gets cited for your target queries and study what content patterns they use.

9. **Avoid JavaScript-rendered content for key answers** — AI crawlers may not execute JavaScript. Ensure important content is in the initial HTML.

10. **Implement schema early** — FAQPage and HowTo schema are quick wins with outsized impact on AI discoverability.

---

## Integration Points

- **SEO Specialist** — Use for traditional search ranking optimization. Run AI SEO and traditional SEO in parallel.
- **Content Production** — Use to create the underlying content before optimizing for AI citation.
- **Content Humanizer** — Use after writing. AI-sounding content performs worse in AI citations — AI systems prefer credible, human-sounding writing.
- **Content Strategy** — Use when deciding which topics and queries to target for AI visibility.
- **Marketing Analytics** — Use campaign analytics tools to track the business impact of AI citation traffic.

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Content not cited despite high DA | Poor extractability — answers buried in prose | Restructure with definition blocks, numbered steps, and FAQ pairs in first 200 words |
| Cited on Perplexity but not ChatGPT | Different crawling and indexing pipelines per platform | Verify bot access for all AI crawlers; test rendering without JavaScript |
| AI Overview shows competitor instead | Competitor has more extractable, better-attributed content | Audit competitor's cited content format and match or exceed specificity |
| Citation dropped after site update | Page restructure broke the extraction pattern AI was using | Compare old vs new page structure; restore extractable blocks |
| GPTBot blocked in robots.txt unknowingly | CMS update or security plugin overwrote robots.txt | Audit robots.txt after every CMS or plugin update; set up monitoring |
| Schema markup present but no rich results | Missing required fields or content-markup mismatch | Validate with Google Rich Results Test; ensure schema matches visible page content |
| AI cites your data but not your brand | Missing entity signals — no Organization schema or sameAs links | Implement Organization schema with sameAs to Wikidata, LinkedIn, and social profiles |

---

## Success Criteria

- **AI citation rate**: Achieve citation in 30%+ of target queries across Perplexity, ChatGPT, and Google AI Overviews within 90 days of optimization
- **Extractability score**: Score 6-7 out of 7 on the Content Extractability Scoring checklist for all key pages
- **Bot access**: Zero AI crawlers blocked in robots.txt — verified monthly with automated monitoring
- **Entity recognition**: Brand appears in Google Knowledge Panel and is recognized as an entity on Wikidata
- **Schema coverage**: 100% of content pages have appropriate JSON-LD schema (Article, FAQPage, or HowTo) validated without errors
- **Freshness cadence**: All key pages updated within the last 90 days with current dateModified signals
- **CTR from AI Overviews**: Maintain organic CTR above 0.8% for queries where AI Overviews appear (benchmark: average drops to 0.61% with AI Overviews per 2026 data)

---

## Scope & Limitations

**In scope:**
- Optimizing content structure for AI extraction and citation
- Bot access configuration and monitoring
- Schema markup implementation for AI discoverability
- Entity optimization and Knowledge Graph presence
- Citation tracking across AI search platforms
- Content pattern design (definitions, steps, tables, FAQs)

**Out of scope:**
- Traditional organic ranking optimization (use SEO Specialist)
- Content creation from scratch (use Content Production)
- Paid search or paid AI placement strategies
- AI model training data licensing or opt-out negotiations
- Platform-specific API integrations for automated tracking
- Social media optimization for AI-adjacent platforms

**Known limitations:**
- AI citation tracking is largely manual — no standardized API exists across platforms
- Citation algorithms are opaque and change frequently without notice
- Blocking AI training while allowing citation is not technically enforceable with current bot protocols
- AI Overviews reduce traditional organic CTR by approximately 42-47% (2026 benchmarks), and this cannot be fully mitigated

---

## Scripts

```bash
# Analyze content for AI citability signals
python scripts/content_scorer.py page.html --json

# Simulate how content might appear in AI search results
python scripts/serp_simulator.py --query "what is cloud cost optimization" --content page.md

# Analyze keyword opportunities for AI search visibility
python scripts/keyword_analyzer.py --keywords keywords.csv --json
```

---

## analytics-tracking

Source path: `references/marketing/analytics-tracking/SKILL.md`

# Analytics Tracking - Implementation & Auditing

**Category:** Marketing
**Tags:** GA4, Google Tag Manager, event tracking, conversion tracking, UTM, analytics audit, consent mode

## Overview

Analytics Tracking is the implementation layer for marketing measurement. Bad tracking is worse than no tracking -- duplicate events, missing parameters, unconsented data, and broken conversions lead to decisions based on bad data. This skill covers building tracking right the first time and finding what is broken when it is not.

This skill handles implementation only. For analyzing campaign performance data, use campaign-analytics. For product analytics and in-app behavior, use the product-team skills.

---

## Clarify First

Before building the tracking plan, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Operating mode** — build from scratch, audit existing, or debug a specific issue (selects the entire workflow)
- [ ] **Platform stack** — GA4, GTM, and which ad platforms (Google Ads / Meta / LinkedIn) (drives implementation + conversion tracking setup)
- [ ] **Key conversions + funnel events** — the user actions that matter to the business (drives event taxonomy + conversion configuration)
- [ ] **Region / consent requirements** — EU/EEA users present? (determines whether Consent Mode v2 is required)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Operating Modes

### Mode 1: Build From Scratch
No analytics in place. Build the tracking plan, implement GA4 + GTM, define event taxonomy, configure conversions.

### Mode 2: Audit Existing Tracking
Tracking exists but data cannot be trusted. Audit coverage, identify gaps, clean up duplicates, fix consent issues.

### Mode 3: Debug Specific Issues
Events are missing, conversions do not match, GTM preview shows fires but GA4 does not record. Structured debugging workflow.

---

## Event Taxonomy Design

Get this right before touching GA4 or GTM. Retrofitting taxonomy is painful and expensive.

### Naming Convention

**Format:** `object_action` (snake_case, past tense verb)

| Correct | Wrong | Why Wrong |
|---------|-------|-----------|
| `form_submitted` | `submitForm` | camelCase, verb-first |
| `plan_selected` | `clickPricingPlan` | Implementation detail, not user action |
| `video_started` | `VideoStart` | PascalCase, inconsistent tense |
| `checkout_completed` | `purchase` | Ambiguous, not a verb phrase |

**Rules:**
1. Always `noun_verb` order, never `verb_noun`
2. Snake_case only -- no camelCase, no hyphens, no PascalCase
3. Past tense verbs: `_started`, `_completed`, `_failed`, `_viewed`
4. Specific enough to be unambiguous, not so verbose it is a sentence
5. Prefix with domain when needed: `onboarding_step_completed`, `billing_plan_selected`

### Standard Event Parameters

Every custom event should include applicable parameters from this table:

| Parameter | Type | Example | Required When |
|-----------|------|---------|---------------|
| `user_id` | string | `usr_abc123` | Always (if authenticated) |
| `plan_name` | string | `professional` | Billing/pricing events |
| `value` | number | `99.00` | Revenue events |
| `currency` | string | `USD` | Always with value |
| `content_group` | string | `onboarding` | Page/flow grouping |
| `method` | string | `google_oauth` | Signup/login events |
| `step_name` | string | `connect_account` | Multi-step flows |
| `step_number` | number | `3` | Multi-step flows |
| `source` | string | `pricing_page` | CTA click events |

### SaaS Event Taxonomy (Reference)

**Core Funnel:**
```
visitor_arrived              (automatic page_view in GA4)
signup_started               (user clicked "Sign up")
signup_completed             (account created)
trial_started                (free trial began)
onboarding_step_completed    (params: step_name, step_number)
feature_activated            (params: feature_name)
plan_selected                (params: plan_name, billing_period)
checkout_started             (params: value, currency, plan_name)
checkout_completed           (params: value, currency, transaction_id)
subscription_renewed         (params: value, plan_name)
subscription_cancelled       (params: cancel_reason, plan_name)
```

**Micro-Conversions:**
```
pricing_viewed
demo_requested               (params: source)
form_submitted               (params: form_name, form_location)
content_downloaded           (params: content_name, content_type)
video_started                (params: video_title)
video_completed              (params: video_title, percent_watched)
chat_opened
help_article_viewed          (params: article_name)
invite_sent                  (params: recipient_role)
integration_connected        (params: integration_name)
```

---

## GA4 Configuration

### Data Stream Setup

1. Create property: GA4 Admin > Properties > Create
2. Add web data stream with your domain
3. Enhanced Measurement -- review each:
   - Page views: Keep enabled
   - Scrolls: Keep enabled
   - Outbound clicks: Keep enabled
   - Site search: Enable if you have search
   - Video engagement: Disable if tracking videos manually (avoids duplicates)
   - File downloads: Disable if tracking via GTM (for better parameters)
4. Configure domains: add all subdomains in your funnel
5. Data retention: Set to 14 months (maximum for free GA4)

### Conversion Events

Mark as conversions in GA4 Admin > Conversions:
- `signup_completed`
- `checkout_completed`
- `demo_requested`
- `trial_started`

**Rules:**
- Maximum 30 conversion events per property -- curate carefully
- GA4 conversions are retroactive for 6 months when enabled
- Do not mark micro-conversions as conversions unless optimizing ad campaigns for them
- Conversion counting: set to "once per session" for lead events, "every" for purchase events

### Custom Dimensions

Register custom dimensions for any event parameter you want to filter/segment by:

| Parameter | Scope | Dimension Name |
|-----------|-------|----------------|
| `plan_name` | Event | Plan Name |
| `user_id` | User | User ID |
| `content_group` | Event | Content Group |
| `feature_name` | Event | Feature Name |

Register in GA4 Admin > Custom definitions > Create custom dimension.

---

## Google Tag Manager Implementation

### Container Architecture

```
GTM Container
├── Tags
│   ├── GA4 Configuration (All Pages trigger)
│   ├── GA4 Event Tags (one per custom event)
│   ├── Google Ads Conversion Tags (per conversion action)
│   └── Meta Pixel / LinkedIn Insight (if running ads)
├── Triggers
│   ├── All Pages (Page View)
│   ├── DOM Ready
│   ├── Custom Event triggers (one per dataLayer event)
│   └── Element Click triggers (CSS selector based)
└── Variables
    ├── Data Layer Variables (one per dataLayer key)
    ├── Constants (GA4 Measurement ID, etc.)
    └── Lookup Tables (if needed for mapping)
```

### Implementation Pattern: Data Layer Push

Your application pushes events to the data layer. GTM picks them up and sends to GA4.

**Application code:**
```javascript
// Push event when user completes signup
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'signup_completed',
  method: 'email',
  user_id: userId,
  plan_name: 'trial'
});
```

**GTM configuration:**
```
Trigger:
  Type: Custom Event
  Event name: signup_completed

Tag:
  Type: GA4 Event
  Event name: signup_completed
  Parameters:
    method:    {{DLV - method}}
    user_id:   {{DLV - user_id}}
    plan_name: {{DLV - plan_name}}
```

### SPA Handling

Single Page Applications need special attention because page views do not fire automatically on route changes.

**Option A: History change trigger (GTM built-in)**
- Enable "History Change" trigger in GTM
- Fires GA4 page_view on every pushState/popState

**Option B: DataLayer push on route change (more control)**
```javascript
// In your router (React Router, Next.js, etc.)
router.events.on('routeChangeComplete', (url) => {
  window.dataLayer.push({
    event: 'page_view',
    page_location: url,
    page_title: document.title
  });
});
```

---

## Conversion Tracking: Ad Platforms

### Google Ads

**Recommended approach:** Import GA4 conversions into Google Ads (single source of truth).

1. Link GA4 and Google Ads accounts
2. In Google Ads > Goals > Conversions > Import > Google Analytics
3. Select GA4 conversion events to import
4. Set attribution model: Data-driven (if 50+ conversions/month), otherwise Last-click
5. Conversion window: 30 days for lead gen, 90 days for high-consideration B2B

**Enhanced Conversions:** Enable for 15-30% better conversion measurement. Sends hashed first-party data (email, phone) to match conversions that cookies miss.

### Meta (Facebook/Instagram)

1. Install Meta Pixel base code via GTM
2. Configure standard events: `PageView`, `Lead`, `CompleteRegistration`, `Purchase`
3. Conversions API (CAPI): strongly recommended -- client-side pixel loses approximately 30% of conversions due to ad blockers and iOS App Tracking Transparency
4. Deduplication: when using both pixel and CAPI, send the same `event_id` to prevent double-counting

### LinkedIn Insight Tag

1. Install via GTM (Tag type: LinkedIn Insight)
2. Configure conversion events in LinkedIn Campaign Manager
3. Match events to your taxonomy: `signup_completed` -> LinkedIn "Sign-up" conversion

---

## UTM Strategy

### Convention Enforcement

| Parameter | Convention | Example |
|-----------|-----------|---------|
| `utm_source` | Platform name, lowercase | `google`, `linkedin`, `newsletter` |
| `utm_medium` | Traffic type | `cpc`, `email`, `social`, `organic` |
| `utm_campaign` | Campaign identifier | `q1-trial-push`, `brand-awareness-2026` |
| `utm_content` | Creative variant | `hero-cta-blue`, `sidebar-text-link` |
| `utm_term` | Paid keyword (search only) | `saas-analytics-tool` |

**Critical rules:**
- Never tag organic traffic with UTMs (overrides GA4 automatic attribution)
- Never tag direct/internal links with UTMs
- Use a UTM builder spreadsheet or tool -- manual entry causes inconsistency
- Lowercase everything -- `Google` and `google` are different sources in GA4

### Attribution Windows

| Platform | Default | Recommended for SaaS |
|---------|---------|---------------------|
| GA4 | 30 days | 30-90 days (match your sales cycle) |
| Google Ads | 30 days | 30 days (trial), 90 days (enterprise) |
| Meta | 7-day click, 1-day view | 7-day click only (view-through inflates) |
| LinkedIn | 30 days | 30 days |

---

## Cross-Domain Tracking

For funnels crossing domains (e.g., `acme.com` to `app.acme.com`):

1. GA4 Admin > Data Streams > Configure tag settings > Configure your domains > Add both domains
2. GTM: GA4 Configuration tag > Fields to Set > `linker` > Add domains
3. Admin > Data Streams > List unwanted referrals > Add both domains

**Verification:** Visit domain A, click link to domain B, check GA4 DebugView. The session should NOT restart. If a new session starts, cross-domain tracking is broken.

---

## Consent Management

### Consent Mode v2

Required for EU compliance and for maintaining data quality in consent-heavy markets.

| Setting | No Consent Mode | Basic | Advanced |
|---------|----------------|-------|----------|
| User declines cookies | Zero data | Zero data | Modeled data (GA4 estimates) |
| Data quality impact | 25-40% data loss in EU | 25-40% data loss | 5-15% data loss |
| Implementation effort | None | Medium | Medium-High |

**Recommendation:** Implement Advanced Consent Mode v2 via GTM with a CMP (Cookiebot, OneTrust, Usercentrics).

**Expected consent rates by region:**
- EU/EEA: 60-75%
- UK: 70-80%
- US: 85-95%
- Rest of world: 80-90%

### Implementation via GTM

```
1. Install CMP tag (fires first, before any other tags)
2. Set default consent state:
   - analytics_storage: denied
   - ad_storage: denied
   - ad_user_data: denied
   - ad_personalization: denied
3. CMP updates consent state on user choice
4. GA4 and ad tags respect consent automatically
```

---

## Data Quality Auditing

### Audit Checklist

**Event Quality:**
- [ ] No duplicate events (check GTM Preview for double-fires)
- [ ] All custom events have required parameters
- [ ] Event names follow naming convention
- [ ] No PII in event parameters (names, emails, phone numbers)
- [ ] Enhanced Measurement not duplicating GTM custom events

**Configuration Quality:**
- [ ] Data retention set to 14 months
- [ ] Internal traffic filter enabled (office and developer IPs)
- [ ] Bot filtering enabled (default in GA4)
- [ ] Cross-domain tracking working (if applicable)
- [ ] Custom dimensions registered for filtered parameters
- [ ] Conversion events marked correctly

**Consent Quality:**
- [ ] Consent Mode v2 implemented (if serving EU users)
- [ ] CMP banner appearing on first visit
- [ ] Tags respect consent state (no firing before consent)
- [ ] Consent state persisting across pages

### Common Data Quality Issues

| Issue | Symptom | Root Cause | Fix |
|-------|---------|------------|-----|
| Inflated page views | 2x expected volume | GTM page_view + Enhanced Measurement | Disable Enhanced page_view |
| Missing conversions | GA4 and Ads numbers differ | Attribution window mismatch | Align windows |
| (not set) pages | Pages show as "/(not set)" | SPA routing not handled | Implement SPA tracking |
| Self-referrals | Own domain in referral report | Missing cross-domain config | Add domains to referral exclusion |
| Direct traffic spike | Paid traffic showing as direct | UTMs missing or stripped | Audit UTM usage |
| Zero EU data | No traffic from EU markets | Consent blocks all tracking | Implement Advanced Consent Mode |

### Debugging Workflow

```
Step 1: Open GTM Preview mode
  - Is the tag firing? Check triggers and conditions
  - Is the data layer populated? Check dataLayer in console

Step 2: Check GA4 DebugView (Admin > DebugView)
  - Is the event appearing? If yes, GTM is working
  - Are parameters populated? Check parameter values

Step 3: Check GA4 Realtime report
  - Events appearing with 5-minute delay? Normal
  - Events not appearing at all? Check measurement ID

Step 4: Check Network tab (DevTools)
  - Filter by "collect" or "analytics"
  - Is the request being sent? Check status code
  - Is the request being blocked? Check ad blockers / consent
```

---

## Proactive Triggers

Surface these findings without being asked:

- Events firing on every page load with identical parameters: misconfigured trigger causing data inflation
- No `user_id` parameter on authenticated events: cannot connect analytics to CRM or understand cohorts
- GA4 conversion count differs from Google Ads by more than 15%: attribution window or deduplication issue
- No consent mode in EU markets: legal exposure and 25-40% data underreporting
- All pages showing as `/(not set)`: SPA routing not handled properly
- `utm_source` showing as `direct` for known paid campaigns: UTMs missing or being stripped by redirects

---

## Related Skills

| Skill | Use When |
|-------|----------|
| **campaign-analytics** | Analyzing marketing performance and channel ROI (not implementation) |
| **ab-test-setup** | Designing experiments (this skill's events feed A/B tests) |
| **launch-strategy** | Tracking events for product launches |
| **email-sequence** | Setting up email click tracking and UTM parameters |

---

## Troubleshooting

| Symptom | Likely Cause | Resolution |
|---------|-------------|------------|
| GA4 shows 50% less traffic than expected after privacy changes | Client-side tracking blocked by ad blockers and ITP/ETP cookie expiry | Implement server-side GTM tagging — recovers 20-40% of lost attribution data within first quarter |
| Conversion counts differ between GA4 and Google Ads by >15% | Attribution window mismatch or deduplication failure between pixel and CAPI | Align attribution windows across platforms and ensure matching `event_id` for deduplication |
| Events fire in GTM Preview but do not appear in GA4 reports | Measurement ID mismatch, consent mode blocking, or data processing delay | Check Measurement ID in GA4 Configuration tag, verify consent state, wait 24-48 hours for standard reports |
| UTM parameters show as (not set) in GA4 | UTMs stripped by redirects, social platform link wrappers, or internal links overwriting | Audit redirect chains, use UTM-safe shorteners, never tag internal links with UTMs |
| Server-side container returns 400 errors | Malformed event payload or missing required fields in Measurement Protocol requests | Validate payload against GA4 Measurement Protocol schema, check required `client_id` and `api_secret` |
| Enhanced Measurement duplicating custom GTM events | Both Enhanced Measurement and GTM firing the same event type (e.g., page_view, scroll) | Disable the overlapping Enhanced Measurement toggle for events you track via GTM |
| Consent Mode v2 reporting zero EU data instead of modeled data | Default consent state not set before GA4 tag fires, or CMP not updating consent correctly | Ensure consent defaults fire as the very first tag in GTM before all other tags |

---

## Success Criteria

- All custom events follow consistent `noun_verb` snake_case naming convention with zero violations in schema audit
- GA4 conversion counts match ad platform conversion counts within 10% variance
- Server-side tracking recovers 20%+ of previously lost attribution data within 90 days of deployment
- UTM parameter validation passes 100% on all active campaigns (no mixed case, no spaces, no missing required params)
- Consent Mode v2 limits EU data loss to under 15% via behavioral modeling
- Event parameters contain zero PII violations as verified by automated schema checker
- Data retention set to 14 months, internal traffic filtered, and cross-domain tracking verified

---

## Scope & Limitations

**In Scope:** GA4 configuration, GTM implementation, event taxonomy design, conversion tracking setup, UTM strategy, consent management, data quality auditing, server-side tagging architecture, cross-domain tracking, ad platform conversion integration (Google Ads, Meta, LinkedIn).

**Out of Scope:** Product analytics platforms (Amplitude, Mixpanel), data warehouse configuration, custom ETL pipelines, mobile app tracking (Firebase), marketing attribution modeling (see marketing-analyst skill), A/B test statistical analysis (see ab-test-setup skill).

**Limitations:** Server-side tracking requires a cloud-hosted GTM container (GCP, AWS, or third-party) with associated infrastructure costs. Privacy-first analytics with Consent Mode v2 produces modeled data for non-consented users — modeled data has 5-15% variance from actual. This skill does not make LLM or API calls; all validation is deterministic.

---

## Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `scripts/utm_validator.py` | Validate UTM parameters for consistency and naming conventions | `python scripts/utm_validator.py urls.csv --json` |
| `scripts/event_schema_checker.py` | Validate event names and parameters against taxonomy, detect PII | `python scripts/event_schema_checker.py events.json --json` |
| `scripts/funnel_drop_off_analyzer.py` | Analyze conversion funnels and identify biggest drop-off points | `python scripts/funnel_drop_off_analyzer.py --stages "Visitors:10000,Signups:1200,Paid:120"` |

---

## app-store-optimization

Source path: `references/marketing/app-store-optimization/SKILL.md`

# App Store Optimization (ASO)

ASO tools for researching keywords, optimizing metadata, analyzing competitors, and improving app store visibility on Apple App Store and Google Play Store. This file is a lean map — execute a task by loading the matching reference below.

## Core Capabilities

- **Keyword research** — seed/expand/score keywords by relevance, volume, competition, and conversion intent; map to metadata placements
- **Metadata optimization** — title, subtitle/short description, iOS keyword field, and full description against platform character limits and density targets
- **Competitor analysis** — keyword matrices, gap analysis, visual and ratings benchmarking across the top 10 competitors
- **Launch & A/B testing** — structured launch checklists, timing, and conversion experiments with sample-size and significance math
- **Reviews & localization** — sentiment/theme/issue extraction and multi-market metadata adaptation
- **8 Python tools** — `keyword_analyzer`, `metadata_optimizer`, `competitor_analyzer`, `aso_scorer`, `ab_test_planner`, `review_analyzer`, `launch_checklist`, `localization_helper` (stdlib only, analyze data you provide)

## When to Use

- Researching or scoring keywords for an app store listing
- Optimizing a title/subtitle/description/keyword field for ranking and conversion
- Auditing competitors for keyword gaps and positioning opportunities
- Planning an app launch or running a store-listing A/B test
- Analyzing reviews or planning multi-market localization

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Platform** — Apple App Store vs Google Play (different character limits, keyword field vs description indexing, ranking factors)
- [ ] **App category + seed keywords** — the app's space and starting terms (drives keyword research + scoring)
- [ ] **Primary goal** — ranking visibility vs conversion rate (shapes metadata, title/subtitle, and screenshot priorities)
- [ ] **Target market/locale** — which storefronts (drives localization + keyword volume estimates)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
python scripts/keyword_analyzer.py --keywords "todo,task,planner"
python scripts/metadata_optimizer.py --platform ios --title "App Title"
python scripts/aso_scorer.py --app-id com.example.app
```

Note: the scripts are importable Python libraries — see the Tool Reference for classes, methods, and convenience functions.

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/aso-workflows.md](references/aso-workflows.md)** — step-by-step procedures, scoring criteria, placement tables, structure diagrams, templates, and before/after examples for all five workflows. Read when executing keyword research, metadata optimization, competitor analysis, launch, or A/B testing.
- **[references/tool-reference.md](references/tool-reference.md)** — full usage for the 8 Python scripts: classes, methods, parameters, returns, convenience functions, plus the scripts and assets tables. Read before invoking a tool.
- **[references/operations-and-benchmarks.md](references/operations-and-benchmarks.md)** — troubleshooting table, success criteria/targets, platform limitations, proactive triggers, output artifacts, communication standards, related skills, and the full integration matrix. Read when diagnosing issues, setting targets, or wiring into other tools.
- **[references/keyword-research-guide.md](references/keyword-research-guide.md)** — research methodology, evaluation framework, and tracking. Read for deep keyword discovery and selection.
- **[references/platform-requirements.md](references/platform-requirements.md)** — iOS and Android metadata specs and visual asset requirements. Read when validating fields against platform rules.
- **[references/aso-best-practices.md](references/aso-best-practices.md)** — optimization strategies, rating management, and launch tactics. Read for proven tactics and playbooks.

## Scope & Limitations

**In scope:** keyword research, metadata optimization and character-limit validation, competitor ASO analysis (public data), A/B test planning with significance math, launch/seasonal/localization planning, and review sentiment analysis for Apple App Store and Google Play Store.

**Out of scope:** real-time store data fetching (scripts analyze static data you provide), Apple Search Ads / Google Ads campaign management, creative asset design, cross-device attribution (use an MMP), in-app analytics/retention, and revenue/subscription pricing.

**Data constraints:** no official search-volume API exists for either store (estimates use third-party tools or heuristics); competitor and review data are limited to public info; historical ranking data needs external tools (AppTweak, Sensor Tower, data.ai); Apple's June 2025 update indexes screenshot text, which these scripts do not yet analyze. See [references/operations-and-benchmarks.md](references/operations-and-benchmarks.md) for details.

## Integration Points

Connects to **Apple App Store Connect** and **Google Play Console** (metadata submission, Product Page Optimization / Store Listing Experiments), **Apple Search Ads** (keyword discovery), **ASO tools** (AppTweak, Sensor Tower, data.ai for volume/ranking data), **analytics** (Firebase/Mixpanel/Amplitude for engagement signals), and the **campaign-analytics** and **content-creator** skills. Full connection details and data flows: [references/operations-and-benchmarks.md](references/operations-and-benchmarks.md).

---

## brand-guidelines

Source path: `references/marketing/brand-guidelines/SKILL.md`

# Brand Guidelines

Comprehensive brand identity systems for building, documenting, and enforcing consistent brand presence across every channel and touchpoint.

---

## Table of Contents

- [Keywords](#keywords)
- [Quick Start](#quick-start)
- [Core Workflows](#core-workflows)
- [Brand Identity Dimensions](#brand-identity-dimensions)
- [Voice and Tone System](#voice-and-tone-system)
- [Visual Identity System](#visual-identity-system)
- [Brand Audit Framework](#brand-audit-framework)
- [Cross-Channel Application](#cross-channel-application)
- [Best Practices](#best-practices)
- [Integration Points](#integration-points)

---

## Keywords

brand guidelines, brand identity, style guide, brand voice, tone of voice, visual identity, brand standards, brand consistency, color systems, typography, logo usage, brand colors, design standards, brand audit, brand governance, co-branding, brand architecture, brand personality, writing style guide, visual standards

---

## Clarify First

Before building the guidelines, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Brand foundation** — purpose, values, and brand promise (the strategic layer every voice and visual choice traces back to)
- [ ] **Brand archetype/personality** — Expert / Guide / Innovator / Friend / etc. (sets voice attributes and tone calibration)
- [ ] **Existing visual assets** — current colors, fonts, and logo, if any (determines build-new vs document-existing)
- [ ] **Channels in scope** — web, email, social, sales, support (drives which cross-channel application sections to produce)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

### Create Brand Guidelines from Scratch

1. Define brand foundation (purpose, values, personality)
2. Establish voice and tone system with attribute matrix
3. Build visual identity system (colors, typography, logo rules)
4. Document imagery and photography standards
5. Create channel-specific application guides
6. Compile into shareable brand guidelines document

### Audit Existing Brand Consistency

1. Collect samples from every active channel and touchpoint
2. Run the Brand Audit Checklist against each sample
3. Score consistency across all seven brand dimensions
4. Document deviations with specific remediation recommendations
5. Prioritize fixes by customer-facing visibility

---

## Core Workflows

### Workflow 1: Build a Brand Identity System

**Step 1: Define Brand Foundation**

```markdown
## Brand Foundation
- Purpose: [Why the brand exists beyond revenue]
- Vision: [What the brand aspires to achieve in the world]
- Mission: [How the brand delivers on its purpose daily]
- Values (3-5):
  1. [Value]: [What it means in practice, not just the word]
  2. [Value]: [Behavioral definition]
  3. [Value]: [Behavioral definition]
- Brand Promise: [The single commitment to customers]
```

**Step 2: Establish Brand Personality**

Select 3-5 personality traits from the archetype framework:

| Archetype | Personality Traits | Voice Characteristics | Best For |
|-----------|-------------------|----------------------|----------|
| Expert | Knowledgeable, precise, authoritative | Data-driven, technical depth, confidence | B2B, enterprise, professional services |
| Guide | Helpful, clear, patient | Instructional, encouraging, step-by-step | Education, SaaS, healthcare |
| Innovator | Bold, forward-thinking, disruptive | Visionary, provocative, future-focused | Tech, startups, R&D |
| Friend | Warm, approachable, genuine | Conversational, inclusive, casual | Consumer brands, community, lifestyle |
| Motivator | Inspiring, energetic, empowering | Action-oriented, ambitious, rallying | Fitness, coaching, personal development |
| Challenger | Direct, honest, contrarian | Opinionated, confident, questioning | Fintech, disruptor brands |
| Creator | Imaginative, expressive, original | Storytelling, vivid imagery, playful | Design, media, entertainment |

**Step 3: Document Voice and Tone**

See the Voice and Tone System section below for the complete framework.

**Step 4: Build Visual Identity**

See the Visual Identity System section below for the complete framework.

**Step 5: Create Application Guide**

Document how guidelines apply to each channel:
- Website and product UI
- Email marketing
- Social media (per platform)
- Sales materials
- Customer support communications
- Press and media
- Co-branded materials

### Workflow 2: Brand Audit

**Step 1: Collect Samples**

Gather 3-5 samples from each active channel:
- Website pages (homepage, product, blog, about)
- Email campaigns (marketing, transactional, support)
- Social media posts (per platform)
- Sales decks and proposals
- Customer support responses
- Advertising creative
- Physical materials (if applicable)

**Step 2: Score Against Seven Dimensions**

For each sample, score 1-5 on:

| Dimension | 1 (Poor) | 3 (Adequate) | 5 (Excellent) |
|-----------|----------|---------------|----------------|
| Color usage | Off-brand colors present | Mostly correct, minor deviations | Perfect palette adherence |
| Typography | Wrong fonts used | Correct fonts, inconsistent sizing | Perfect type hierarchy |
| Logo usage | Incorrect sizing, placement, or modification | Mostly correct with minor issues | Perfect logo application |
| Voice consistency | Tone shifts dramatically between sections | Generally consistent, occasional drift | Voice is unmistakably on-brand |
| Imagery style | Stock photos inconsistent with brand | Mostly aligned, some off-brand choices | Cohesive visual language |
| Layout patterns | No recognizable brand patterns | Some consistent elements | Clear, repeated brand patterns |
| Content quality | Errors, vague claims, inconsistent formatting | Clean, generally well-written | Precise, specific, error-free |

**Step 3: Generate Audit Report**

```markdown
## Brand Audit Report: [Brand Name]
Date: [Date]
Auditor: [Name]

### Overall Score: [X/35]

### Dimension Scores
| Dimension | Score | Priority |
|-----------|-------|----------|
| Color | X/5 | [High/Medium/Low] |
| Typography | X/5 | [High/Medium/Low] |
| Logo | X/5 | [High/Medium/Low] |
| Voice | X/5 | [High/Medium/Low] |
| Imagery | X/5 | [High/Medium/Low] |
| Layout | X/5 | [High/Medium/Low] |
| Content | X/5 | [High/Medium/Low] |

### Critical Issues
[Specific deviations with exact references]

### Recommendations
[Prioritized fixes with implementation guidance]
```

---

## Brand Identity Dimensions

### Dimension 1: Brand Foundation

The strategic layer that everything else builds on:
- **Purpose** — Why the brand exists (not "to make money")
- **Values** — What the brand believes and practices
- **Positioning** — Where the brand sits in the competitive landscape
- **Promise** — The core commitment to customers

### Dimension 2: Voice and Tone

How the brand communicates across all written and spoken channels. See detailed framework below.

### Dimension 3: Visual Identity

Colors, typography, logo, imagery, and layout patterns. See detailed framework below.

### Dimension 4: Verbal Identity

Specific language choices:
- **Naming conventions** — How products, features, and tiers are named
- **Terminology** — Preferred terms vs. avoided terms
- **Taglines and slogans** — Core messaging lines
- **Boilerplate copy** — Standard company descriptions for press, bios, footers

### Dimension 5: Experiential Identity

How the brand feels in interaction:
- **UI patterns** — Consistent interaction patterns in product
- **Service tone** — How support and success teams communicate
- **Onboarding experience** — First impression and initial value delivery
- **Physical presence** — Office, events, swag, packaging

---

## Voice and Tone System

### Voice vs. Tone

**Voice** is consistent — it is who the brand is. It does not change.
**Tone** adapts — it adjusts based on context, audience, and situation.

Example: A brand's voice is always "clear and confident." But the tone shifts:
- Product announcement: enthusiastic, forward-looking
- Incident response: calm, transparent, accountable
- Tutorial: patient, encouraging, precise

### Voice Attribute Matrix

Define 3-5 voice attributes with spectrum positions:

| Attribute | We Are | We Are Not |
|-----------|--------|------------|
| [e.g., Direct] | We get to the point. We say what we mean. | We are not blunt or dismissive. We are not rude. |
| [e.g., Knowledgeable] | We share expertise with confidence. | We are not condescending. We do not lecture. |
| [e.g., Human] | We write like people, not corporations. | We are not unprofessional. We do not use slang carelessly. |

### Tone Calibration by Context

| Context | Formality | Energy | Technical Depth |
|---------|-----------|--------|-----------------|
| Marketing homepage | Medium | High | Low |
| Product documentation | Medium-High | Neutral | High |
| Blog posts | Medium-Low | Medium | Medium |
| Error messages | Medium | Calm | Low |
| Social media | Low-Medium | High | Low |
| Sales proposals | High | Medium | Medium-High |
| Customer support | Medium | Warm | Varies |
| Incident reports | High | Calm | High |

### Writing Style Rules

**Grammar and Mechanics:**
- Oxford comma: [Yes/No]
- Contractions: [When to use/avoid]
- Sentence case vs. Title Case for headings: [Standard]
- Number formatting: [Spell out 1-9, numerals for 10+]
- Date formatting: [Month Day, Year vs. DD/MM/YYYY]
- Ampersand usage: [When acceptable]

**Vocabulary Standards:**
- Preferred terms: [List of terms to always use]
- Avoided terms: [List of terms to never use]
- Jargon policy: [When industry jargon is acceptable]
- Acronym policy: [Spell out on first use, then abbreviate]

---

## Visual Identity System

### Color System

**Primary Palette:**

| Role | Color Name | Hex | RGB | Use Case |
|------|-----------|-----|-----|----------|
| Primary | [Name] | #XXXXXX | R, G, B | Primary CTAs, key brand elements |
| Secondary | [Name] | #XXXXXX | R, G, B | Supporting elements, accents |
| Neutral Dark | [Name] | #XXXXXX | R, G, B | Body text, dark backgrounds |
| Neutral Light | [Name] | #XXXXXX | R, G, B | Backgrounds, borders |

**Extended Palette:**

| Role | Color Name | Hex | Use Case |
|------|-----------|-----|----------|
| Success | [Name] | #XXXXXX | Positive states, confirmations |
| Warning | [Name] | #XXXXXX | Cautionary states |
| Error | [Name] | #XXXXXX | Error states, destructive actions |
| Info | [Name] | #XXXXXX | Informational states |

**Color Usage Rules:**
- Primary color for CTAs and key interactive elements only
- Minimum contrast ratio: 4.5:1 for text, 3:1 for large text (WCAG AA)
- Never place colored text on colored backgrounds without checking contrast
- Do not create new color variations — use the defined palette only

### Typography System

| Role | Font | Weight | Size | Line Height | Use Case |
|------|------|--------|------|-------------|----------|
| Display | [Font Name] | Bold/Black | 48-72px | 1.1 | Hero headlines |
| Heading 1 | [Font Name] | Bold | 36-48px | 1.2 | Page titles |
| Heading 2 | [Font Name] | Semibold | 24-32px | 1.3 | Section headers |
| Heading 3 | [Font Name] | Medium | 20-24px | 1.4 | Subsection headers |
| Body | [Font Name] | Regular | 16-18px | 1.5-1.6 | Paragraph text |
| Small | [Font Name] | Regular | 14px | 1.5 | Captions, metadata |
| Code | [Mono Font] | Regular | 14-16px | 1.5 | Code blocks, technical |

**Typography Rules:**
- Maximum 2 font families across the brand
- Heading hierarchy must be maintained (never skip levels)
- Minimum body text size: 16px for web, 10pt for print
- Maximum line length: 70-80 characters for readability

### Logo System

**Logo Variations:**
- Primary: Full logo (icon + wordmark)
- Secondary: Wordmark only
- Icon: Icon/symbol only (for favicons, app icons, small spaces)
- Reversed: White version for dark backgrounds

**Logo Rules:**
- Minimum clear space: [X] times the height of the icon on all sides
- Minimum size: [X]px for digital, [X]mm for print
- Never stretch, rotate, recolor, or add effects to the logo
- Never place the logo on busy backgrounds without a container
- Approved background colors: [List specific colors]

**Co-Branding Rules:**
- Partner logos must be equal or smaller size
- Minimum separation between logos: [X]px
- Use a divider line or "+" symbol between logos
- Our logo always appears on the left or top

### Imagery Standards

**Photography Style:**
- [Natural/staged] lighting
- [Warm/cool/neutral] color temperature
- [Diverse/specific] representation
- [Candid/polished] composition
- Do not use: [Specific stock photo cliches to avoid]

**Illustration Style:**
- [Flat/3D/line art/isometric] style
- Color palette limited to brand colors
- Consistent line weight: [X]px
- Corner radius: [X]px for rounded elements

**Icon Style:**
- [Outline/filled/two-tone] style
- Consistent stroke weight: [X]px
- Grid size: [X]px base grid
- Corner radius: [X]px

---

## Brand Audit Framework

### Quick Audit Checklist

Run this against any brand asset in under 5 minutes:

- [ ] Colors match approved palette exactly (no approximate matches)
- [ ] Fonts are correct typeface, weight, and size
- [ ] Logo has proper clear space and is an approved variation
- [ ] Body text meets minimum size and contrast requirements
- [ ] Imagery style matches brand photography/illustration standards
- [ ] Tone matches brand voice attributes for this context
- [ ] No prohibited uses present (stretched logos, unapproved colors, off-brand imagery)
- [ ] Co-branding follows partner logo rules (if applicable)
- [ ] Content is free of spelling, grammar, and factual errors
- [ ] CTAs use approved language and styling

### Full Audit Process

For a comprehensive brand audit across the organization:

1. **Inventory** — List every customer-facing touchpoint
2. **Sample** — Collect 3-5 recent examples from each touchpoint
3. **Score** — Rate each sample across all seven dimensions (1-5)
4. **Analyze** — Identify patterns in where consistency breaks down
5. **Prioritize** — Rank fixes by customer visibility and business impact
6. **Remediate** — Create specific fix instructions for each issue
7. **Govern** — Establish review process to prevent future drift

---

## Cross-Channel Application

### Website

- Homepage reflects full brand identity (all dimensions)
- Product pages maintain visual consistency with marketing pages
- Blog uses the same typography and color system
- Error pages and empty states still reflect brand personality
- Favicon and OG images use approved logo variations

### Email

- Header uses approved logo at correct size
- Color palette limited to brand palette
- CTA buttons match brand primary color
- Font stack includes web-safe fallbacks that approximate brand fonts
- Footer includes consistent boilerplate and legal text

### Social Media

| Platform | Avatar | Cover/Banner | Post Templates | Voice Adaptation |
|----------|--------|-------------|---------------|-----------------|
| LinkedIn | Logo icon | Brand banner | Professional, clean | Slightly more formal |
| Twitter/X | Logo icon | Brand banner | Concise, punchy | Slightly more casual |
| Instagram | Logo icon | N/A | Visual-first, on-brand colors | Visual storytelling emphasis |
| YouTube | Logo icon | Brand banner | Thumbnail template | Conversational |

### Sales Materials

- Slide deck template with locked master slides
- Proposal template with approved cover page and footer
- One-pager template for leave-behinds
- All use approved color palette, typography, and logo placement

### Customer Support

- Email signatures follow standard format
- Help center articles use brand voice (helpful, patient, clear)
- Chatbot responses match brand personality
- Escalation templates maintain professional but warm tone

---

## Best Practices

1. **Specificity over subjectivity** — "Use #2563EB for primary buttons" is enforceable. "Use a nice blue" is not. Every guideline should be specific enough that a contractor produces on-brand work without guessing.

2. **Show examples of what NOT to do** — For every rule, include a clear violation example. People learn faster from anti-patterns than from rules.

3. **Version and date everything** — Brand guidelines evolve. Version every update and keep a changelog.

4. **Distribute in a usable format** — A 200-page PDF nobody reads is worse than a 10-page living document everyone references. Make guidelines accessible where people work.

5. **Audit quarterly** — Brand drift happens slowly. Schedule quarterly audits to catch deviations before they compound.

6. **Provide templates, not just rules** — Every channel should have a ready-to-use template that embodies the guidelines. Templates enforce consistency better than documentation.

7. **Define escalation for edge cases** — Who approves a new color? Who decides if a co-branding request is acceptable? Document the decision process.

8. **Train new team members** — Brand guidelines are only as effective as the people who follow them. Include guidelines in onboarding.

---

## Integration Points

- **Brand Strategist** — Use for high-level brand positioning and architecture decisions. Brand Guidelines implements and documents those strategic decisions.
- **Copywriting** — Use brand voice and tone system when writing any marketing copy.
- **Content Creator** — Reference brand guidelines for every content piece to maintain consistency.
- **Social Content** — Apply platform-specific brand adaptations from the cross-channel guide.
- **Ad Creative** — Reference visual identity and voice standards for all advertising creative.
- **Landing Page Generator** — Apply brand colors, typography, and voice to all landing pages.

---

## Troubleshooting

| Symptom | Likely Cause | Resolution |
|---------|-------------|------------|
| Brand colors look different across web and print | RGB vs CMYK color space mismatch; no Pantone reference defined | Document colors in all three systems (Hex/RGB for digital, CMYK for print, Pantone for exact matching) |
| Teams consistently use wrong fonts | Font files not distributed or licensed for all team members | Create a shared font kit, document web-safe fallbacks, include licensing status per font |
| Logo appears stretched or pixelated on partner sites | Co-branding guidelines not shared or minimum size not enforced | Distribute logo kit with vector formats (SVG/EPS), document minimum sizes and clear space rules |
| Voice varies dramatically across customer support vs marketing | Tone calibration by context not documented or not trained | Create channel-specific tone guides with before/after examples, include in onboarding |
| Brand drift detected in quarterly audit | No governance process for new assets, no template enforcement | Implement approval workflow, lock master templates, assign brand guardians per channel |
| Color contrast failures on accessibility audits | Brand palette not tested against WCAG AA/AAA standards | Run color_accessibility_checker.py on full palette, adjust problematic combinations |
| New hires produce off-brand content in first 30 days | Brand guidelines not included in onboarding process | Add brand guidelines review to onboarding checklist, provide quick-reference card |

---

## Success Criteria

- Brand audit scores 4.0+/5.0 average across all seven dimensions (color, typography, logo, voice, imagery, layout, content)
- All brand color combinations meet WCAG AA contrast ratio (4.5:1 for normal text, 3:1 for large text)
- Quarterly audit variance stays below 10% across all channels
- 100% of customer-facing templates use approved brand assets
- New team members produce on-brand content within first 2 weeks of onboarding
- Zero unauthorized logo modifications detected across all channels

---

## Scope & Limitations

**In Scope:** Visual identity systems (color, typography, logo, imagery), voice and tone frameworks, brand audit methodology, cross-channel application guides, co-branding rules, brand governance processes, accessibility compliance for brand colors.

**Out of Scope:** Brand strategy and positioning decisions (see brand-strategist skill), brand architecture models (see brand-strategist skill), marketing copy creation (see copywriting skill), design file creation (Figma, Sketch), print production specifications.

**Limitations:** Brand guidelines are documentation — enforcement depends on organizational process. This skill provides frameworks and audit tools but cannot enforce compliance without governance workflows. Color accessibility checking uses algorithmic WCAG formulas and does not account for all visual impairment types.

---

## Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `scripts/brand_audit_scorer.py` | Score brand consistency across seven dimensions with priorities | `python scripts/brand_audit_scorer.py audit_data.json --json` |
| `scripts/messaging_consistency_checker.py` | Check text against brand voice standards, detect vocabulary violations | `python scripts/messaging_consistency_checker.py --text "Your copy here"` |
| `scripts/color_accessibility_checker.py` | Validate brand colors against WCAG contrast requirements | `python scripts/color_accessibility_checker.py --fg "#2563EB" --bg "#FFFFFF"` |

---

## brand-strategist

Source path: `references/marketing/brand-strategist/SKILL.md`

# Brand Strategist

The agent operates as a senior brand strategist, delivering actionable brand positioning, identity systems, messaging frameworks, and governance structures for market differentiation.

## Clarify First

Before developing the strategy, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Target audience** — who the brand is for, in their own words (drives the "For [target]" line of the positioning statement)
- [ ] **Category frame + key benefit** — what space you compete in and the core value you deliver (drives positioning + messaging pillars)
- [ ] **Competitive set** — the named rivals to differentiate from (drives the "only-we" test and positioning map)
- [ ] **Business objective** — launch, rebrand, extension, or audit (sets scope and which deliverables matter most)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

1. **Assess brand context** - Identify the brand's category, competitive landscape, and target audience. Validate that a clear business objective exists (launch, rebrand, extension, or audit).
2. **Develop positioning** - Apply the positioning framework to define target, category frame, key benefit, and proof points. Checkpoint: the positioning statement must pass the "only-we" test (no competitor could make the same claim).
3. **Build identity system** - Define visual identity (logo, color, typography), verbal identity (voice, tone, messaging), and experiential identity. Checkpoint: every element must trace back to the positioning.
4. **Construct messaging architecture** - Create master narrative, pillar messages, and audience-specific variants. Checkpoint: each pillar must have at least two proof points.
5. **Select brand architecture model** - Choose Branded House, House of Brands, Endorsed, or Hybrid. Validate alignment with corporate strategy.
6. **Establish governance** - Define brand guidelines structure, approval process, and measurement cadence. Checkpoint: brand health dashboard covers awareness, perception, and consideration.
7. **Measure and iterate** - Set up brand tracking (NPS, unaided awareness, share of voice). Review quarterly against baselines.

## Brand Positioning Framework

### Positioning Statement Template

```
For [target audience]
Who [need or opportunity]
[Brand] is the [category]
That [key benefit]
Unlike [competitors]
We [unique differentiator]
```

### Positioning Map

```
                    High Price
                        |
    PREMIUM         ----+----    LUXURY
    * Quality           |        * Status
    * Performance       |        * Exclusivity
                        |
    Low Innovation -----+----- High Innovation
                        |
    VALUE           ----+----    DISRUPTOR
    * Accessibility     |        * New approach
    * Affordability     |        * Category change
                        |
                    Low Price
```

### Competitive Positioning Matrix

| Attribute | Us | Comp A | Comp B | Comp C |
|-----------|-----|--------|--------|--------|
| Price | $$$ | $$ | $$$$ | $ |
| Quality | High | Medium | High | Low |
| Innovation | High | Low | Medium | High |
| Service | High | High | Low | Medium |

## Brand Identity System

```
BRAND IDENTITY SYSTEM
+-- Visual Identity
|   +-- Logo (primary, secondary, icon)
|   +-- Color palette
|   +-- Typography
|   +-- Imagery style
|   +-- Graphic elements
+-- Verbal Identity
|   +-- Brand voice
|   +-- Tone guidelines
|   +-- Messaging framework
|   +-- Vocabulary
+-- Experiential Identity
    +-- Customer experience
    +-- Physical environments
    +-- Digital experiences
```

### Voice Framework

| Context | Tone Adjustment |
|---------|-----------------|
| Marketing | More enthusiastic |
| Support | More empathetic |
| Legal | More formal |
| Social | More casual |

## Brand Architecture Models

| Model | Structure | Example |
|-------|-----------|---------|
| Branded House | Master Brand > Products | Google (Maps, Drive, Cloud) |
| House of Brands | Parent > Independent Brands | P&G (Tide, Pampers, Gillette) |
| Endorsed | Sub-brand by Master Brand | Marriott (Courtyard by Marriott) |
| Hybrid | Mix of above | Amazon (Prime, AWS, Whole Foods) |

## Example: Brand Positioning for a SaaS Startup

```markdown
# Brand Strategy: FlowMetrics

## Positioning Statement
For data-driven product managers
Who need real-time user behavior insights without engineering support
FlowMetrics is the self-serve analytics platform
That delivers actionable funnels in under 5 minutes
Unlike Amplitude and Mixpanel
We require zero SQL and zero instrumentation code

## Brand Values
1. Clarity: Complex data, simple answers
2. Speed: Insights in minutes, not days
3. Autonomy: No engineering dependency

## Brand Voice
- Confident but not arrogant
- Technical but accessible
- Direct and concise

## Proof Points
- 90-second median time-to-first-insight
- 4.8/5 satisfaction from non-technical PMs
- 50% reduction in analytics engineering tickets
```

## Brand Health Measurement

**Awareness:** unaided awareness, aided awareness, top-of-mind awareness
**Perception:** brand attribute association, NPS, brand sentiment
**Consideration:** purchase intent, preference vs. competitors, recommendation likelihood

```
Brand Health Dashboard - Q1 2026
  Awareness: 68% (+5%)    NPS: 45 (+8)    Consideration: 72% (+3%)
  Brand Attributes (% association)
  Innovative: 78%    Trustworthy: 82%    Quality: 75%
  Share of Voice: 32% (+2%)    Sentiment: 85% positive
```

## Scripts

```bash
# Brand audit analyzer
python scripts/brand_audit.py --surveys survey_data.csv

# Competitive positioning mapper
python scripts/positioning_map.py --competitors comp_data.csv

# Brand voice analyzer
python scripts/voice_analyzer.py --content content.txt

# Brand guidelines generator
python scripts/guidelines_gen.py --config brand_config.yaml
```

## Reference Materials

- `references/positioning.md` - Positioning frameworks
- `references/identity.md` - Identity system guide
- `references/architecture.md` - Brand architecture models
- `references/governance.md` - Governance best practices

---

## Troubleshooting

| Symptom | Likely Cause | Resolution |
|---------|-------------|------------|
| Positioning statement passes internally but customers do not repeat it | Positioning built on company perspective, not customer language | Rerun April Dunford methodology with 10+ customer interviews; use verbatim customer phrases |
| Brand architecture confusion after acquisition | No decision framework for integrating acquired brands | Evaluate using brand_architecture_analyzer.py; score audience overlap and category fit to choose model |
| NPS declining despite product improvements | Brand perception lagging behind product reality | Run brand health dashboard; invest in rebranding or brand awareness campaign targeting perception gap |
| Multiple sub-brands competing for same audience | House of Brands model applied when Branded House was appropriate | Consolidate overlapping brands; use brand architecture analyzer to validate optimal model |
| Competitive positioning feels generic | Differentiators are category requirements, not unique advantages | Apply "only-we" test: if a competitor could make the same claim, it is not a differentiator |

---

## Success Criteria

- Positioning statement passes the "only-we" test — no competitor could make the same claim
- 7+ out of 10 customers describe brand value unprompted in interviews
- Brand health index scores 65+/100 across awareness, perception, consideration, and loyalty
- Brand architecture model validated by lowest churn and fastest close among A-fit segments
- Share of voice increases 5+ percentage points within two quarters of brand strategy execution
- Competitive positioning map shows clear white space between brand and nearest competitor

---

## Scope & Limitations

**In Scope:** Brand positioning frameworks (April Dunford), brand identity system design, brand architecture model selection (Branded House, House of Brands, Endorsed, Hybrid), competitive positioning analysis, brand health measurement, brand governance structures.

**Out of Scope:** Visual design execution (see brand-guidelines skill), marketing copy creation (see copywriting skill), campaign execution (see marketing-ops skill), product strategy decisions, legal trademark registration.

**Limitations:** Brand strategy effectiveness depends on consistent execution across the organization. Positioning validation requires real customer interviews — internal-only positioning is unreliable. Brand architecture recommendations are based on audience overlap and category analysis; they do not account for all political or financial factors in brand portfolio decisions.

---

## Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `scripts/brand_health_dashboard.py` | Calculate brand health metrics across awareness, perception, consideration, loyalty | `python scripts/brand_health_dashboard.py survey_data.json --json` |
| `scripts/positioning_map_generator.py` | Generate competitive positioning maps with white space analysis | `python scripts/positioning_map_generator.py competitors.json --demo` |
| `scripts/brand_architecture_analyzer.py` | Evaluate and recommend brand architecture models for a portfolio | `python scripts/brand_architecture_analyzer.py portfolio.json --json` |

---

## campaign-analytics

Source path: `references/marketing/campaign-analytics/SKILL.md`

# Campaign Analytics

Production-grade campaign performance analysis with multi-touch attribution modeling, funnel conversion analysis, and ROI calculation. Three Python CLI tools provide deterministic, repeatable analytics using standard library only -- no external dependencies, no API calls, no ML models.

---

## Table of Contents

- [Capabilities](#capabilities)
- [Input Requirements](#input-requirements)
- [Output Formats](#output-formats)
- [How to Use](#how-to-use)
- [Scripts](#scripts)
- [Reference Guides](#reference-guides)
- [Best Practices](#best-practices)
- [Limitations](#limitations)

---

## Capabilities

- **Multi-Touch Attribution**: Five attribution models (first-touch, last-touch, linear, time-decay, position-based) with configurable parameters
- **Funnel Conversion Analysis**: Stage-by-stage conversion rates, drop-off identification, bottleneck detection, and segment comparison
- **Campaign ROI Calculation**: ROI, ROAS, CPA, CPL, CAC metrics with industry benchmarking and underperformance flagging
- **A/B Test Support**: Templates for structured A/B test documentation and analysis
- **Channel Comparison**: Cross-channel performance comparison with normalized metrics
- **Executive Reporting**: Ready-to-use templates for campaign performance reports

---

## Input Requirements

All scripts accept a JSON file as positional input argument. See `assets/sample_campaign_data.json` for complete examples.

### Attribution Analyzer

```json
{
  "journeys": [
    {
      "journey_id": "j1",
      "touchpoints": [
        {"channel": "organic_search", "timestamp": "2025-10-01T10:00:00", "interaction": "click"},
        {"channel": "email", "timestamp": "2025-10-05T14:30:00", "interaction": "open"},
        {"channel": "paid_search", "timestamp": "2025-10-08T09:15:00", "interaction": "click"}
      ],
      "converted": true,
      "revenue": 500.00
    }
  ]
}
```

### Funnel Analyzer

```json
{
  "funnel": {
    "stages": ["Awareness", "Interest", "Consideration", "Intent", "Purchase"],
    "counts": [10000, 5200, 2800, 1400, 420]
  }
}
```

### Campaign ROI Calculator

```json
{
  "campaigns": [
    {
      "name": "Spring Email Campaign",
      "channel": "email",
      "spend": 5000.00,
      "revenue": 25000.00,
      "impressions": 50000,
      "clicks": 2500,
      "leads": 300,
      "customers": 45
    }
  ]
}
```

---

## Output Formats

All scripts support two output formats via the `--format` flag:

- `--format text` (default): Human-readable tables and summaries for review
- `--format json`: Machine-readable JSON for integrations and pipelines

---

## Clarify First

Before running the analysis, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Analysis type** — attribution, funnel, or ROI (selects which tool and report you produce)
- [ ] **Source data** — journey touchpoints / funnel stage counts / campaign spend+revenue as JSON (the required input the analysis runs on)
- [ ] **Attribution model + half-life** — matched to your average sales cycle (changes how credit is allocated across channels)
- [ ] **Channel + vertical for benchmarking** — sets the benchmark thresholds used to flag underperformance

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## How to Use

### Attribution Analysis

```bash
# Run all 5 attribution models
python scripts/attribution_analyzer.py campaign_data.json

# Run a specific model
python scripts/attribution_analyzer.py campaign_data.json --model time-decay

# JSON output for pipeline integration
python scripts/attribution_analyzer.py campaign_data.json --format json

# Custom time-decay half-life (default: 7 days)
python scripts/attribution_analyzer.py campaign_data.json --model time-decay --half-life 14
```

### Funnel Analysis

```bash
# Basic funnel analysis
python scripts/funnel_analyzer.py funnel_data.json

# JSON output
python scripts/funnel_analyzer.py funnel_data.json --format json
```

### Campaign ROI Calculation

```bash
# Calculate ROI metrics for all campaigns
python scripts/campaign_roi_calculator.py campaign_data.json

# JSON output
python scripts/campaign_roi_calculator.py campaign_data.json --format json
```

---

## Scripts

### 1. attribution_analyzer.py

Implements five industry-standard attribution models to allocate conversion credit across marketing channels:

| Model | Description | Best For |
|-------|-------------|----------|
| First-Touch | 100% credit to first interaction | Brand awareness campaigns |
| Last-Touch | 100% credit to last interaction | Direct response campaigns |
| Linear | Equal credit to all touchpoints | Balanced multi-channel evaluation |
| Time-Decay | More credit to recent touchpoints | Short sales cycles |
| Position-Based | 40/20/40 split (first/middle/last) | Full-funnel marketing |

### 2. funnel_analyzer.py

Analyzes conversion funnels to identify bottlenecks and optimization opportunities:

- Stage-to-stage conversion rates and drop-off percentages
- Automatic bottleneck identification (largest absolute and relative drops)
- Overall funnel conversion rate
- Segment comparison when multiple segments are provided

### 3. campaign_roi_calculator.py

Calculates comprehensive ROI metrics with industry benchmarking:

- **ROI**: Return on investment percentage
- **ROAS**: Return on ad spend ratio
- **CPA**: Cost per acquisition
- **CPL**: Cost per lead
- **CAC**: Customer acquisition cost
- **CTR**: Click-through rate
- **CVR**: Conversion rate (leads to customers)
- Flags underperforming campaigns against industry benchmarks

---

## Reference Guides

| Guide | Location | Purpose |
|-------|----------|---------|
| Attribution Models Guide | `references/attribution-models-guide.md` | Deep dive into 5 models with formulas, pros/cons, selection criteria |
| Campaign Metrics Benchmarks | `references/campaign-metrics-benchmarks.md` | Industry benchmarks by channel and vertical for CTR, CPC, CPM, CPA, ROAS |
| Funnel Optimization Framework | `references/funnel-optimization-framework.md` | Stage-by-stage optimization strategies, common bottlenecks, best practices |

---

## Best Practices

1. **Use multiple attribution models** -- No single model tells the full story. Compare at least 3 models to triangulate channel value.
2. **Set appropriate lookback windows** -- Match your time-decay half-life to your average sales cycle length.
3. **Segment your funnels** -- Always compare segments (channel, cohort, geography) to identify what drives best performance.
4. **Benchmark against your own history first** -- Industry benchmarks provide context, but your own historical data is the most relevant comparison.
5. **Run ROI analysis at regular intervals** -- Weekly for active campaigns, monthly for strategic review.
6. **Include all costs** -- Factor in creative, tooling, and labor costs alongside media spend for accurate ROI.
7. **Document A/B tests rigorously** -- Use the provided template to ensure statistical validity and clear decision criteria.

---

## Limitations

- **No statistical significance testing** -- A/B test analysis requires external tools for p-value calculations. Scripts provide descriptive metrics only.
- **Standard library only** -- No advanced statistical or data processing libraries. Suitable for most campaign sizes but not optimized for datasets exceeding 100K journeys.
- **Offline analysis** -- Scripts analyze static JSON snapshots. No real-time data connections or API integrations.
- **Single-currency** -- All monetary values assumed to be in the same currency. No currency conversion support.
- **Simplified time-decay** -- Uses exponential decay based on configurable half-life. Does not account for weekday/weekend or seasonal patterns.
- **No cross-device tracking** -- Attribution operates on provided journey data as-is. Cross-device identity resolution must be handled upstream.

---

## Typical Analysis Workflow

For a complete campaign review, run the three scripts in sequence:

```bash
# Step 1 -- Attribution: understand which channels drive conversions
python scripts/attribution_analyzer.py campaign_data.json --model time-decay

# Step 2 -- Funnel: identify where prospects drop off on the path to conversion
python scripts/funnel_analyzer.py funnel_data.json

# Step 3 -- ROI: calculate profitability and benchmark against industry standards
python scripts/campaign_roi_calculator.py campaign_data.json
```

Use attribution results to identify top-performing channels, then focus funnel analysis on those channels' segments, and finally validate ROI metrics to prioritize budget reallocation.

---

## Input Validation

Before running scripts, verify your JSON is valid and matches the expected schema. Common errors:

- **Missing required keys** (e.g., `journeys`, `funnel.stages`, `campaigns`) -- script exits with a descriptive `KeyError`
- **Mismatched array lengths** in funnel data (`stages` and `counts` must be the same length) -- raises `ValueError`
- **Non-numeric monetary values** in ROI data -- raises `TypeError`

Use `python -m json.tool your_file.json` to validate JSON syntax before passing it to any script.

## Related Skills

- **marketing-demand-acquisition**: For planning campaigns that analytics measures.
- **social-media-analyzer**: For social-specific analytics complementing cross-channel analysis.
- **marketing-strategy-pmm**: For strategic context behind campaign performance.
- **content-creator**: For optimizing content based on analytics findings.

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| Attribution model shows all credit on one channel | Using first-touch or last-touch on a multi-channel funnel | Switch to linear, time-decay, or position-based attribution. Compare at least 3 models to triangulate true channel value. GA4's data-driven attribution (DDA) is the recommended default for 2026 |
| Funnel conversion rate is unrealistically high or low | Mismatched stage definitions or counts array length error | Verify that `stages` and `counts` arrays are the same length and ordered top-to-bottom (largest count first). Ensure counts represent unique users at each stage, not cumulative events |
| ROI calculator flags all campaigns as underperforming | Channel name in JSON does not match built-in benchmark keys | Use exact channel names: `email`, `paid_search`, `paid_social`, `display`, `organic_search`, `organic_social`, `referral`, `direct`. Unrecognized channels fall back to `default` benchmarks |
| Time-decay model produces unexpected credit distribution | Half-life parameter does not match your sales cycle | Set `--half-life` to approximately half your average sales cycle length. For B2B SaaS (60-90 day cycles), use `--half-life 30`. For e-commerce (1-7 day cycles), use `--half-life 3` |
| JSON parsing errors on script execution | Malformed JSON, trailing commas, or encoding issues | Validate JSON with `python -m json.tool your_file.json` before passing to any script. Ensure UTF-8 encoding and no BOM characters |
| GA4 attribution data does not match script output | Different lookback windows and model defaults | GA4 uses a 30-day lookback for acquisition and 90-day for engagement by default. DDA falls back to last-click when a key event has fewer than 400 conversions. Align your script's `--half-life` and data window to match GA4 settings |
| Campaign spend data shows zero ROI despite conversions | Revenue field missing or set to zero in input JSON | Ensure every campaign object includes a `revenue` field with actual attributed revenue. If revenue attribution is not available, use estimated values based on average deal size multiplied by customer count |

---

## Success Criteria

- **Attribution Model Coverage**: Run at least 3 attribution models per analysis cycle to triangulate channel value. Position-based (40/20/40) or GA4 data-driven attribution is recommended as primary model for hybrid PLG/sales-led motions
- **Funnel Conversion Rate**: Target overall funnel conversion (top-to-bottom) of 2-5% for B2B SaaS and 5-15% for B2C. Identify and address any single stage with >60% drop-off rate as a critical bottleneck
- **Campaign ROAS**: Achieve minimum 4:1 ROAS for paid search, 3:1 for paid social, and 30:1+ for email channels (2026 industry targets). Flag any campaign below 2:1 ROAS for immediate optimization or budget reallocation
- **Cost Per Acquisition**: Maintain blended CPA below $45 across channels (2026 B2B SaaS median). Channel-specific targets: email <$15, paid search <$50, paid social <$40, display <$75
- **UTM Compliance**: Achieve 100% UTM parameter coverage on all paid and owned media links. Use lowercase, standardized naming (GA4 is case-sensitive). Teams with standardized UTM conventions see 29% improvement in attribution accuracy
- **Analysis Cadence**: Run campaign ROI analysis weekly for active campaigns and monthly for strategic review. Update attribution models quarterly as channel mix evolves
- **Benchmark Accuracy**: All campaigns should be assessed against channel-specific benchmarks, not generic averages. The built-in benchmark tables cover CTR, ROAS, and CPA by channel with low/target/high ranges

---

## Scope & Limitations

**In Scope:**
- Multi-touch attribution modeling with 5 industry-standard models (first-touch, last-touch, linear, time-decay, position-based)
- Funnel conversion analysis with stage-by-stage metrics, bottleneck detection, and segment comparison
- Campaign ROI calculation with 10+ metrics (ROI, ROAS, CPA, CPL, CAC, CTR, CVR, CPC, CPM, lead conversion rate)
- Industry benchmarking by channel with underperformance flagging
- Portfolio-level summary with channel breakdown

**Out of Scope:**
- Real-time data connections or API integrations (scripts analyze static JSON snapshots)
- Statistical significance testing for A/B tests (descriptive metrics only; use dedicated A/B testing tools for p-value calculations)
- Cross-device identity resolution (must be handled upstream by your CDP or analytics platform)
- Currency conversion (all monetary values assumed same currency)
- Predictive modeling or forecasting (current analysis is retrospective)
- GA4 or HubSpot direct integration (export data from those platforms into JSON format for analysis)
- Datasets exceeding 100K journeys (standard library implementation, not optimized for very large datasets)

---

## Integration Points

| Integration | Purpose | How to Connect |
|-------------|---------|----------------|
| **Google Analytics 4 (GA4)** | Source of journey and conversion data | Export GA4 Exploration reports or use BigQuery export to generate journey JSON. GA4's DDA model (default in 2026) complements this skill's 5 models. Align lookback windows: GA4 defaults to 30-day acquisition / 90-day engagement |
| **HubSpot** | CRM attribution, lead scoring, deal data | Export HubSpot contact journey data with UTM parameters as JSON input. Use W-shaped (40-20-40) attribution for hybrid PLG/sales motions. Map HubSpot lifecycle stages to funnel analyzer stages |
| **UTM Parameter Standards** | Consistent campaign tagging | Enforce lowercase UTM values: `utm_source={channel}`, `utm_medium={type}`, `utm_campaign={campaign-id}`, `utm_content={variant}`, `utm_term={keyword}`. GA4 treats `Email` and `email` as separate entries |
| **social-media-analyzer skill** | Social channel performance data | Feed social media campaign metrics from `calculate_metrics.py` into `campaign_roi_calculator.py` for cross-channel ROI comparison |
| **marketing-demand-acquisition skill** | Demand gen campaign planning | Use attribution results to identify top-performing channels, then feed insights into demand gen budget allocation decisions |
| **Business intelligence tools (Looker, Tableau, Power BI)** | Dashboard visualization | Use `--format json` output from all three scripts for direct ingestion into BI tools. JSON output is structured for easy transformation |
| **Spreadsheet tools (Excel, Google Sheets)** | Manual analysis and reporting | Use `--format text` output for human-readable reports. Copy JSON output into spreadsheets for custom pivot analysis |

---

## Tool Reference

### attribution_analyzer.py

**Type:** CLI script with argparse

**Usage:**
```bash
python attribution_analyzer.py <input_file> [--model MODEL] [--half-life DAYS] [--format FORMAT]
```

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `input_file` | Yes | -- | Path to JSON file containing journey/touchpoint data. Must have a top-level `journeys` array |
| `--model` | No | all 5 models | Run a specific model: `first-touch`, `last-touch`, `linear`, `time-decay`, `position-based` |
| `--half-life` | No | `7.0` | Half-life in days for time-decay model. Set to ~half your average sales cycle |
| `--format` | No | `text` | Output format: `text` (human-readable tables) or `json` (machine-readable) |

**Input Schema:** `{"journeys": [{"journey_id": "str", "touchpoints": [{"channel": "str", "timestamp": "ISO-8601", "interaction": "str"}], "converted": bool, "revenue": float}]}`

**Output:** Summary statistics (total journeys, conversion rate, total revenue, channels observed) plus per-model channel credit allocation with revenue and share percentages. Cross-model comparison table when running all models.

### funnel_analyzer.py

**Type:** CLI script with argparse

**Usage:**
```bash
python funnel_analyzer.py <input_file> [--format FORMAT]
```

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `input_file` | Yes | -- | Path to JSON file containing funnel data. Must have `funnel` (single) or `segments` (multi-segment) key |
| `--format` | No | `text` | Output format: `text` or `json` |

**Single Funnel Input:** `{"funnel": {"stages": ["Stage1", "Stage2", ...], "counts": [10000, 5200, ...]}}`

**Multi-Segment Input:** `{"stages": ["Stage1", "Stage2", ...], "segments": {"segment_a": {"counts": [...]}, "segment_b": {"counts": [...]}}}`

**Output:** Stage-by-stage conversion rates, drop-off counts and percentages, cumulative conversion, bottleneck identification (both absolute and relative), and segment rankings when comparing multiple segments.

### campaign_roi_calculator.py

**Type:** CLI script with argparse

**Usage:**
```bash
python campaign_roi_calculator.py <input_file> [--format FORMAT]
```

| Flag | Required | Default | Description |
|------|----------|---------|-------------|
| `input_file` | Yes | -- | Path to JSON file containing campaign data. Must have a top-level `campaigns` array |
| `--format` | No | `text` | Output format: `text` or `json` |

**Input Schema:** `{"campaigns": [{"name": "str", "channel": "str", "spend": float, "revenue": float, "impressions": int, "clicks": int, "leads": int, "customers": int}]}`

**Recognized Channels for Benchmarking:** `email`, `paid_search`, `paid_social`, `display`, `organic_search`, `organic_social`, `referral`, `direct`. Unrecognized channels use `default` benchmarks.

**Calculated Metrics:** ROI %, ROAS, CPA, CPL, CAC, CTR %, CVR % (lead-to-customer), CPC, CPM, click-to-lead rate %, profit. Each campaign assessed against channel-specific benchmarks (low/target/high) with performance flags and recommendations.

**Output:** Portfolio summary (totals, blended metrics, top performer, flagged campaigns, channel breakdown) plus per-campaign detail with benchmark assessments, warning flags, and actionable recommendations.

---

## cold-email

Source path: `references/marketing/cold-email/SKILL.md`

# Cold Email Outreach

Production-grade B2B cold email that sounds like it came from a person, not a sequence tool.

---

## Table of Contents

- [Keywords](#keywords)
- [Quick Start](#quick-start)
- [Core Workflows](#core-workflows)
- [Writing Principles](#writing-principles)
- [Voice Calibration by Audience](#voice-calibration-by-audience)
- [Subject Line Framework](#subject-line-framework)
- [Follow-Up Strategy](#follow-up-strategy)
- [Personalization Framework](#personalization-framework)
- [Deliverability Setup](#deliverability-setup)
- [Compliance Requirements](#compliance-requirements)
- [Anti-Patterns](#anti-patterns)
- [Best Practices](#best-practices)
- [Integration Points](#integration-points)

---

## Keywords

cold email, cold outreach, prospecting email, SDR email, sales email, first-touch email, follow-up sequence, email prospecting, outbound email, sales development, sequence building, email personalization, email deliverability, CAN-SPAM, GDPR, B2B outreach, email compliance, subject lines, reply rates, breakup email

---

## Clarify First

Before generating the email, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **ICP / prospect context** — job title, company type/size, seniority (drives the opener, relevance, and voice calibration)
- [ ] **Specific problem + outreach trigger** — the pain and why now (selects the framework and shapes the opener)
- [ ] **The one proof point** — a specific number, named customer, or result (drives the credibility line)
- [ ] **The single CTA / goal** — book a call, get a reply, or get a referral (drives the one ask)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

### Write a First-Touch Email

1. Define the ICP, specific problem, and outreach trigger
2. Select voice calibration based on recipient seniority
3. Write opener about their world (not yours)
4. State relevance in 1-2 sentences with specific proof
5. Close with a single, low-friction ask
6. Generate 3 subject line variants
7. Validate: under 150 words, no corporate speak, one CTA

### Build a Full Sequence

1. Write the first email (above)
2. Plan 4-5 follow-ups, each with a different angle
3. Set escalating gap cadence (Day 1, 4, 9, 16, 25, 35)
4. Write each follow-up as a standalone (recipient does not remember earlier emails)
5. End with a breakup email that closes the loop professionally
6. Validate deliverability setup before sending

---

## Core Workflows

### Workflow 1: Single First-Touch Email

**Step 1: Gather Context**

Required information:
- **Sender context**: Role, company, what they sell, key proof points
- **Prospect context**: Job title, company type/size, likely problem, trigger for outreach
- **Goal**: Book a call? Get a reply? Get a referral?

**Step 2: Choose Framework**

| Framework | Best When | Structure |
|-----------|-----------|-----------|
| Problem-First | Prospect has a visible pain point | Problem observation > Relevance > Ask |
| Trigger-Based | There is a specific event (funding, hiring, news) | Trigger reference > Connection to problem > Ask |
| Mutual Connection | Referral or shared network | Name drop > Context > Ask |
| Value-First | You have something genuinely useful to share | Insight/resource > Brief context > Ask |
| Direct Ask | Prospect is high-intent or very senior | Brief context > Direct question |

**Step 3: Draft the Email**

Structure:
```
Subject: [2-4 words, looks like an internal email]

[Opener: 1 sentence about their world — trigger, observation, or question]

[Relevance: 1-2 sentences connecting their situation to what you do]

[Proof: 1 sentence of credible evidence — specific number, named customer, result]

[Ask: 1 sentence with a single, specific, low-friction CTA]

[Sign-off]
```

**Step 4: Validate**

- [ ] Under 150 words total
- [ ] Opener is about them, not you
- [ ] No sentence starts with "I" or "We"
- [ ] One CTA, not multiple
- [ ] CTA is a question, not a statement
- [ ] No jargon or corporate speak
- [ ] Would a friend send this to another friend in business?

### Workflow 2: Full Sequence Build

**Step 1: Write Email 1 (Using Workflow 1)**

**Step 2: Plan Follow-Up Angles**

Each follow-up needs a distinct angle. Plan before writing:

| Email | Day | Angle | What is New |
|-------|-----|-------|-------------|
| 1 | Day 1 | Problem-first | Initial outreach |
| 2 | Day 4 | New evidence | Case study, data point, or recent result |
| 3 | Day 9 | Different pain point | Alternative angle on their world |
| 4 | Day 16 | Industry insight | Something notable about their space |
| 5 | Day 25 | Direct question | Simple, clear ask without context |
| 6 | Day 35 | Breakup | Professional close, referral ask |

**Step 3: Write Each Follow-Up**

Rules for every follow-up:
- Standalone: does not require reading previous emails
- New angle: brings something the previous email did not
- Shorter than Email 1 (each subsequent email gets shorter)
- Never says "just checking in" or "circling back"
- Never references all previous emails ("As I mentioned in my last three emails...")

**Step 4: Write the Breakup Email**

The breakup email closes the loop. It signals this is the last one, which paradoxically increases reply rate.

Template:
```
Subject: closing the loop

[Name],

Last note from me. If [specific problem] becomes a priority,
reply here and I'll pick it up.

If there's someone else at [Company] better suited for this
conversation, a name would help.

Either way — [genuine well-wish related to something specific].

[Sign-off]
```

### Workflow 3: Performance Iteration

**Step 1: Diagnose the Problem**

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Low open rate (< 25%) | Subject lines | Test new subject line patterns |
| Opens but no replies (< 2% reply rate) | Email body | Rewrite with stronger relevance and lower-friction CTA |
| Replies but wrong outcome | CTA mismatch | Adjust the ask |
| High bounce rate (> 5%) | List quality | Verify email addresses before sending |
| Landing in spam | Deliverability | Check SPF/DKIM/DMARC, reduce send volume, warm domain |

**Step 2: Rewrite the Underperforming Element**

Focus on one element at a time. Do not rewrite the entire email when only the subject line is the problem.

**Step 3: Test and Measure**

- A/B test subject lines with minimum 100 sends per variant
- Test one variable at a time
- Wait for 3-5 days of data before drawing conclusions
- Document every test and result for future reference

---

## Writing Principles

### 1. Write Like a Peer, Not a Vendor

The moment your email sounds like marketing copy, it is deleted.

**Test:** Would you send this to a smart colleague at another company? If not, rewrite.

### 2. Every Sentence Earns Its Place

Each sentence must do one of these jobs:
- Create curiosity
- Establish relevance
- Build credibility
- Drive to the ask

If a sentence does none of these, cut it.

### 3. Personalization Must Connect to the Problem

Generic personalization is worse than none.

- Bad: "I saw you went to Stanford" followed by a pitch unrelated to Stanford
- Good: "I saw you're hiring three SDRs — usually a signal that you're scaling cold outreach. That's exactly the challenge we help with."

The personalization must bridge to the reason for reaching out.

### 4. Lead with Their World, Not Yours

The opener should be about their situation, problem, or context. Not about you or your product.

### 5. One Ask Per Email

Do not ask them to book a call, watch a demo, read a case study, AND reply with their timeline. Pick one.

---

## Voice Calibration by Audience

| Audience | Length | Tone | Subject Style | What Works |
|----------|--------|------|---------------|------------|
| C-suite (CEO, CRO, CMO) | 3-4 sentences | Ultra-brief, peer-level, strategic | Short, vague, internal-looking | Big problem > relevant proof > one question |
| VP / Director | 5-7 sentences | Direct, metrics-conscious | Slightly more specific | Specific observation + clear business angle |
| Manager | 7-10 sentences | Practical, shows homework | Can be descriptive | Specific problem + practical value + easy CTA |
| Technical (Engineer, Architect) | 7-10 sentences | Precise, no fluff | Technical specificity | Exact problem > precise solution > low-friction ask |
| Founder / Solo | 5-7 sentences | Empathetic, peer-to-peer | Casual, human | Shared experience + relevant proof + conversational ask |

Rule: The higher up the org chart, the shorter your email needs to be.

---

## Subject Line Framework

### Principles

The goal of a subject line is to get the email opened. Not to convey value, not to be clever. Just opened.

The best cold email subject lines look like internal emails: short, slightly vague, enough curiosity to click.

### Patterns That Work

| Pattern | Example | Why It Works |
|---------|---------|-------------|
| Two or three words | "quick question" | Looks like a real email from a colleague |
| Specific trigger + question | "your TechCrunch piece" | Specific enough to not look like spam |
| Shared context | "re: Series B" | Feels like a follow-up, not cold |
| Observation | "your ATS setup" | Relevant, not salesy |
| Referral hook | "[mutual name] suggested I reach out" | Social proof front-loaded |
| Role-specific | "SDR team scaling" | Shows you know who they are |

### Patterns That Kill Opens

- ALL CAPS anything
- Emojis in subject lines
- Fake Re: or Fwd: (damages trust before the first word)
- Question format ("Are you struggling with X?") — sounds like an ad
- Company name mention ("Acme Corp: helping you achieve...")
- Blog headline format ("5 ways to improve your...")
- Exclamation marks

---

## Follow-Up Strategy

### Cadence

| Email | Send Day | Gap | Notes |
|-------|----------|-----|-------|
| Email 1 | Day 1 | — | First touch |
| Email 2 | Day 4 | +3 days | New evidence angle |
| Email 3 | Day 9 | +5 days | Different pain point |
| Email 4 | Day 16 | +7 days | Industry insight |
| Email 5 | Day 25 | +9 days | Direct question |
| Breakup | Day 35 | +10 days | Close the loop |

Gaps increase over time. Persistent but not annoying.

### Follow-Up Angle Rotation

| Angle Type | Description | Example |
|-----------|-------------|---------|
| New evidence | Case study, data point, recent result | "Since my last note, we helped [Company] reduce [metric] by [%]" |
| Different pain | Alternative problem in their world | "Setting aside [topic A] — are you dealing with [topic B]?" |
| Industry insight | Something notable about their space | "Saw [industry trend]. Most teams are responding by [approach]" |
| Direct question | Simple ask without buildup | "[Name], quick one: who handles [function] at [Company]?" |
| Reverse ask | Request for referral | "If this isn't your area, who would you point me to?" |
| Social proof | Relevant peer doing it | "[Similar company] just went through this — here's what worked" |

---

## Personalization Framework

### Three Tiers of Personalization

**Tier 1: Segment-Level (Minimum)**
- Industry-specific pain points
- Company size-specific challenges
- Role-specific language and priorities

**Tier 2: Company-Level (Standard)**
- Recent company news (funding, hiring, product launch)
- Tech stack signals (what tools they use)
- Growth signals (job postings, office expansion)

**Tier 3: Individual-Level (Premium)**
- Content they have published (posts, articles, talks)
- Career moves (new role, promotion)
- Shared connections or experiences
- Specific project or initiative they are leading

### Personalization Sources

| Source | What You Find | How to Use |
|--------|--------------|-----------|
| LinkedIn profile | Role, tenure, content they share | Role-specific opener, reference their posts |
| Company blog | Priorities, culture, technology choices | Connect your solution to their stated priorities |
| Job postings | Growth areas, pain points, tech stack | "You're hiring for X, which usually means..." |
| Press/news | Funding, partnerships, launches | Trigger-based openers |
| GitHub/tech blogs | Technical decisions, stack choices | Technical relevance and credibility |
| Podcast/talks | Opinions, expertise areas | "Your point about X in [talk] resonated..." |

---

## Deliverability Setup

### Infrastructure Requirements

| Component | What | Why |
|-----------|------|-----|
| Dedicated sending domain | mail.yourdomain.com or outreach.yourdomain.com | Protects primary domain reputation |
| SPF record | DNS TXT record authorizing sending servers | Proves you are authorized to send |
| DKIM signing | Cryptographic signature on emails | Proves emails were not modified in transit |
| DMARC policy | DNS record specifying SPF/DKIM enforcement | Tells receiving servers how to handle failures |
| Domain warmup | 4-6 weeks of gradually increasing volume | Builds sender reputation with ISPs |

### Warmup Schedule

| Week | Daily Volume | Notes |
|------|-------------|-------|
| 1 | 10-20 | Send to engaged contacts only |
| 2 | 20-40 | Mix of warm and cold contacts |
| 3 | 40-70 | Begin cold outreach at low volume |
| 4 | 70-100 | Monitor bounce rates closely |
| 5-6 | 100-150 | Increase if bounce rate < 3% |
| 7+ | 150-200 max | Steady state for cold outreach |

### Deliverability Monitoring

- Bounce rate: Keep under 3% (above 5% damages reputation)
- Spam complaint rate: Keep under 0.1%
- Verify email addresses before sending (use verification services)
- Monitor blacklists monthly (MXToolbox, Google Postmaster)
- Use mail-tester.com to check deliverability score before campaigns

### Email Format Rules

- Plain text or minimal HTML (no logos, images, or heavy formatting)
- No tracking pixels if possible (they trigger spam filters)
- Limit links to 1-2 maximum
- Avoid spam trigger words: "free," "guarantee," "act now," "limited time"
- Keep emails under 200 words
- Include a physical address (CAN-SPAM requirement)
- Include an unsubscribe mechanism

---

## Compliance Requirements

### CAN-SPAM (United States)

Required for all commercial email to US recipients:
- [ ] Sender identity is clear and not misleading
- [ ] Subject line is not deceptive
- [ ] Physical postal address included
- [ ] Opt-out mechanism present and functional
- [ ] Opt-out requests honored within 10 business days
- [ ] Message identified as an advertisement (if applicable)

### GDPR (European Union)

Required for email to EU/EEA residents:
- [ ] Legitimate interest basis documented for B2B outreach
- [ ] Prospect data collected from lawful sources
- [ ] Privacy notice accessible
- [ ] Data processing records maintained
- [ ] Right to erasure honored promptly
- [ ] Data minimization: only collect what you need
- [ ] No consent required for B2B if legitimate interest applies, but this must be documented and defensible

### CASL (Canada)

Required for commercial electronic messages to Canadian recipients:
- [ ] Express or implied consent documented
- [ ] Sender identification clear
- [ ] Unsubscribe mechanism functional
- [ ] Implied consent valid for 2 years from last transaction or 6 months from inquiry

### Best Practice Regardless of Jurisdiction

- Always include an easy unsubscribe option
- Honor opt-outs immediately (do not wait the legal maximum)
- Do not buy email lists (poor quality, compliance risk)
- Document your legal basis for outreach
- Keep records of consent and opt-out requests

---

## Anti-Patterns

| Pattern | Why It Fails |
|---------|-------------|
| "I hope this email finds you well" | Instant signal that this is templated mass outreach |
| "I wanted to reach out because..." | Three words of nothing before saying anything |
| Opening with "My name is X and I work at Y" | They can see your name. Start with something useful. |
| Feature dump in email 1 | Nobody cares about features when they do not trust you yet |
| HTML templates with logos and colors | Looks like marketing, gets spam-filtered |
| Fake Re:/Fwd: subject lines | Deceptive, destroys trust |
| "Just checking in" follow-ups | Adds no value, removes credibility |
| Social proof without context | "We work with 500 companies" means nothing without relevance |
| Long-form case study in email 1 | Save it for follow-up |
| Passive CTAs ("Let me know if you're interested") | Weak. Ask a direct question or propose a specific step. |
| Multiple CTAs in one email | Creates decision paralysis. One ask per email. |
| Sending from your primary domain | Risks your entire domain reputation |

---

## Best Practices

1. **Send from a real person, not a company alias** — "sarah@mail.acme.com" outperforms "sales@acme.com" every time.

2. **Read the email aloud before sending** — If you hear yourself droning, cut. If it sounds like a brochure, rewrite.

3. **Time your sends** — Tuesday through Thursday, 8-10 AM in the prospect's timezone, produces the highest open rates for B2B.

4. **Verify emails before campaigns** — A 5% bounce rate damages your domain reputation. Verify every address.

5. **Track reply rate, not open rate** — Open tracking is unreliable (privacy features block tracking pixels). Reply rate is the metric that matters.

6. **Build sequences, not individual emails** — Most replies come from follow-ups, not the first email. Plan the full sequence before writing.

7. **Document your playbook** — Every winning email, subject line, and angle should be documented for the team. Build institutional knowledge.

8. **Respect opt-outs immediately** — Not just legally required, but professionally essential. Process within 24 hours.

9. **Rotate sending domains** — Use 2-3 sending domains to distribute volume and protect reputation.

10. **Segment relentlessly** — A generic template sent to 1,000 people will underperform a personalized email sent to 50 who match your ideal profile.

---

## Integration Points

- **Copywriting** — Use for landing page copy and marketing page copy. Cold email follows different constraints (shorter, personal tone, no visual design).
- **Content Strategy** — Use to create content assets (case studies, guides) referenced in follow-up emails.
- **Marketing Context** — Use for ICP definition and positioning. If you do not know who you are targeting and why, cold email is the wrong tool.
- **Marketing Psychology** — Apply psychological principles (reciprocity, social proof, scarcity) to strengthen email messaging.
- **Campaign Analytics** — Use to track sequence performance and optimize based on data.

---

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Open rate below 15% | Subject lines too long, spammy, or generic | Test 2-4 word internal-email-style subjects. Run `subject_line_scorer.py`. |
| Opens but reply rate below 1% | Email body lacks relevance or CTA is too high-friction | Rewrite opener about their world. Use a question CTA, not a statement. |
| Emails landing in spam (2026) | Missing SPF/DKIM/DMARC or RFC 8058 one-click unsubscribe | Gmail/Yahoo/Microsoft now reject non-compliant bulk mail. Run `deliverability_checker.py`. |
| Bounce rate above 3% | Unverified email list or role-based addresses | Verify every address before sending. Remove catch-alls and role accounts. |
| Spam complaint rate above 0.10% | Irrelevant targeting or too-frequent sends | Gmail enforces 0.10% threshold as of 2026. Improve targeting and reduce volume per domain. |
| Replies but wrong outcome | CTA mismatch with funnel stage | Align CTA friction to prospect readiness. C-suite wants a question; managers accept a demo link. |
| Domain blacklisted | Sending from primary domain or too-high volume | Use dedicated sending subdomains. Warm new domains 4-6 weeks. Max 100 emails/day/address. |

---

## Success Criteria

- Open rate consistently above 35% across sequence (benchmark: 25-40% for cold B2B)
- Reply rate above 3% (benchmark: 2-5% for well-targeted cold outreach)
- Bounce rate below 2% on every campaign (Gmail/Microsoft 2026 threshold)
- Spam complaint rate below 0.10% (2026 Gmail/Yahoo hard enforcement line)
- Deliverability rate above 95% with SPF/DKIM/DMARC/RFC 8058 fully configured
- Sequence produces replies from emails 2-5, not just email 1 (follow-ups carry 60%+ of replies)
- Every email under 150 words with one CTA and zero corporate speak

---

## Scope & Limitations

**In Scope:**
- B2B cold email outreach strategy and copy
- Multi-email sequence design and optimization
- Subject line and body copy frameworks
- Deliverability infrastructure setup (SPF, DKIM, DMARC, domain warming)
- CAN-SPAM, GDPR, CASL compliance guidance
- Performance diagnosis and iteration methodology

**Out of Scope:**
- Email HTML template design (use email-template-builder)
- Marketing automation platform configuration (Outreach, Salesloft, Apollo)
- Email list building or scraping (compliance risk)
- Warm/inbound email sequences (use email-sequence)
- Phone call scripts or LinkedIn outreach sequences
- Legal advice on compliance (consult legal counsel for jurisdiction-specific requirements)

**Limitations:**
- Scripts use heuristic analysis, not live inbox testing (use mail-tester.com for production validation)
- Deliverability checker cannot perform live DNS lookups (verify SPF/DKIM/DMARC records separately)
- Benchmarks are B2B SaaS-focused; adjust thresholds for other industries

---

## Python Automation Tools

### 1. Subject Line Scorer (`scripts/subject_line_scorer.py`)
Scores cold email subject lines on deliverability, spam risk, and open-rate potential using deterministic heuristics.

```bash
python scripts/subject_line_scorer.py "quick question"
python scripts/subject_line_scorer.py --file subjects.txt --json
```

### 2. Deliverability Checker (`scripts/deliverability_checker.py`)
Audits email content for spam triggers, HTML complexity, link density, and compliance against 2025-2026 Gmail/Yahoo/Microsoft requirements.

```bash
python scripts/deliverability_checker.py email.txt
python scripts/deliverability_checker.py email.txt --domain yourdomain.com --json
```

### 3. Sequence Optimizer (`scripts/sequence_optimizer.py`)
Analyzes cold email sequence performance data against industry benchmarks. Diagnoses open rate, reply rate, bounce rate, and cadence issues.

```bash
python scripts/sequence_optimizer.py sequence_data.json
python scripts/sequence_optimizer.py --sample --json
```

---

## content-creator

Source path: `references/marketing/content-creator/SKILL.md`

# Content Creator

Professional-grade brand voice analysis, SEO optimization, and platform-specific content frameworks.

---

## Table of Contents

- [Keywords](#keywords)
- [Quick Start](#quick-start)
- [Core Workflows](#core-workflows)
- [Tools](#tools)
- [Reference Guides](#reference-guides)
- [Best Practices](#best-practices)
- [Integration Points](#integration-points)

---

## Keywords

content creation, blog posts, SEO, brand voice, social media, content calendar, marketing content, content strategy, content marketing, brand consistency, content optimization, social media marketing, content planning, blog writing, content frameworks, brand guidelines, social media strategy

---

## Clarify First

Before creating the content, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Primary keyword & topic** — the search target and angle (drives SEO optimization and blog structure)
- [ ] **Content type & platform** — blog post, LinkedIn, X, Instagram (selects the framework template and length)
- [ ] **Brand voice** — archetype + formality/tone, or sample content to baseline against (keeps voice consistent across pieces)
- [ ] **Target audience** — who they are and their expertise level (sets readability target and messaging)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

### Brand Voice Development

1. Run `scripts/brand_voice_analyzer.py` on existing content to establish baseline
2. Review `references/brand_guidelines.md` to select voice attributes
3. Apply chosen voice consistently across all content

### Blog Content Creation

1. Choose template from `references/content_frameworks.md`
2. Research keywords for topic
3. Write content following template structure
4. Run `scripts/seo_optimizer.py [file] [primary-keyword]` to optimize
5. Apply recommendations before publishing

### Social Media Content

1. Review platform best practices in `references/social_media_optimization.md`
2. Use appropriate template from `references/content_frameworks.md`
3. Optimize based on platform-specific guidelines
4. Schedule using `assets/content_calendar_template.md`

---

## Core Workflows

### Workflow 1: Establish Brand Voice (First Time Setup)

For new brands or clients:

**Step 1: Analyze Existing Content (if available)**

```bash
python scripts/brand_voice_analyzer.py existing_content.txt
```

**Step 2: Define Voice Attributes**

- Review brand personality archetypes in `references/brand_guidelines.md`
- Select primary and secondary archetypes
- Choose 3-5 tone attributes
- Document in brand guidelines

**Step 3: Create Voice Sample**

- Write 3 sample pieces in chosen voice
- Test consistency using analyzer
- Refine based on results

### Workflow 2: Create SEO-Optimized Blog Posts

**Step 1: Keyword Research**

- Identify primary keyword (search volume 500-5000/month)
- Find 3-5 secondary keywords
- List 10-15 LSI keywords

**Step 2: Content Structure**

- Use blog template from `references/content_frameworks.md`
- Include keyword in title, first paragraph, and 2-3 H2s
- Aim for 1,500-2,500 words for comprehensive coverage

**Step 3: Optimization Check**

```bash
python scripts/seo_optimizer.py blog_post.md "primary keyword" "secondary,keywords,list"
```

**Step 4: Apply SEO Recommendations**

- Adjust keyword density to 1-3%
- Ensure proper heading structure
- Add internal and external links
- Optimize meta description

### Workflow 3: Create Social Media Content

**Step 1: Platform Selection**

- Identify primary platforms based on audience
- Review platform-specific guidelines in `references/social_media_optimization.md`

**Step 2: Content Adaptation**

- Start with blog post or core message
- Use repurposing matrix from `references/content_frameworks.md`
- Adapt for each platform following templates

**Step 3: Optimization Checklist**

- Platform-appropriate length
- Optimal posting time
- Correct image dimensions
- Platform-specific hashtags
- Engagement elements (polls, questions)

### Workflow 4: Plan Content Calendar

**Step 1: Monthly Planning**

- Copy `assets/content_calendar_template.md`
- Set monthly goals and KPIs
- Identify key campaigns/themes

**Step 2: Weekly Distribution**

- Follow 40/25/25/10 content pillar ratio
- Balance platforms throughout week
- Align with optimal posting times

**Step 3: Batch Creation**

- Create all weekly content in one session
- Maintain consistent voice across pieces
- Prepare all visual assets together

---

## Tools

### Brand Voice Analyzer

Analyzes text content for voice characteristics, readability, and consistency.

**Usage:**

```bash
# Human-readable output
python scripts/brand_voice_analyzer.py content.txt

# JSON output for integrations
python scripts/brand_voice_analyzer.py content.txt json
```

**Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `file` | Yes | Path to content file |
| `format` | No | Output format: `text` (default) or `json` |

**Output:**

- Voice profile (formality, tone, perspective)
- Readability score (Flesch Reading Ease)
- Sentence structure analysis
- Improvement recommendations

### SEO Optimizer

Analyzes content for SEO optimization and provides actionable recommendations.

**Usage:**

```bash
# Basic analysis
python scripts/seo_optimizer.py article.md "main keyword"

# With secondary keywords
python scripts/seo_optimizer.py article.md "main keyword" "secondary,keywords,list"

# JSON output
python scripts/seo_optimizer.py article.md "keyword" --json
```

**Parameters:**

| Parameter | Required | Description |
|-----------|----------|-------------|
| `file` | Yes | Path to content file (md or html) |
| `primary_keyword` | Yes | Main target keyword |
| `secondary_keywords` | No | Comma-separated secondary keywords |
| `--json` | No | Output in JSON format |

**Output:**

- SEO score (0-100)
- Keyword density analysis
- Structure assessment
- Meta tag suggestions
- Specific optimization recommendations

---

## Reference Guides

### When to Use Each Reference

**references/brand_guidelines.md**

- Setting up new brand voice
- Ensuring consistency across content
- Training new team members
- Resolving voice/tone questions

**references/content_frameworks.md**

- Starting any new content piece
- Structuring different content types
- Creating content templates
- Planning content repurposing

**references/social_media_optimization.md**

- Platform-specific optimization
- Hashtag strategy development
- Understanding algorithm factors
- Setting up analytics tracking

**references/analytics_guide.md**

- Tracking content performance
- Setting up measurement frameworks
- Creating performance reports
- Attribution modeling

---

## Best Practices

### Content Creation Process

1. Start with audience need/pain point
2. Research before writing
3. Create outline using templates
4. Write first draft without editing
5. Optimize for SEO
6. Edit for brand voice
7. Proofread and fact-check
8. Optimize for platform
9. Schedule strategically

### Quality Indicators

- SEO score above 75/100
- Readability appropriate for audience
- Consistent brand voice throughout
- Clear value proposition
- Actionable takeaways
- Proper visual formatting
- Platform-optimized

### Common Pitfalls to Avoid

- Writing before researching keywords
- Ignoring platform-specific requirements
- Inconsistent brand voice
- Over-optimizing for SEO (keyword stuffing)
- Missing clear CTAs
- Publishing without proofreading
- Ignoring analytics feedback

---

## Integration Points

This skill works best with:

- **Analytics platforms** - Google Analytics, social media insights for tracking (see `references/analytics_guide.md`)
- **SEO tools** - For keyword research and competitive analysis
- **Design tools** - Canva, Figma for visual content
- **Scheduling platforms** - Buffer, Hootsuite for content distribution
- **Email marketing systems** - For newsletter content campaigns

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| SEO score is low despite keyword inclusion | Keywords present but not in strategic positions (title, H1, first paragraph, H2s) | Place primary keyword in the first paragraph, at least one H2, and the page title. Keyword density alone is no longer a ranking factor -- placement and natural integration matter more in 2026 |
| Brand voice analyzer shows inconsistent results across content | Multiple authors writing without shared voice guidelines | Establish a baseline by running `brand_voice_analyzer.py` on your best-performing content. Document the formality score, tone, and perspective as your target profile. Have all authors reference this baseline |
| Content ranks initially then drops | Thin content or lack of E-E-A-T signals | Google's December 2025 core update and helpful content system penalize shallow content. Add first-person experience, original data (3+ fresh statistics per 1,000 words), expert quotes, and case studies. Content must demonstrate Experience that AI cannot replicate |
| AI-generated content flagged or not ranking | Unedited AI output lacking human oversight, expertise, or originality | Google does not penalize AI-assisted content per se, but mass-produced AI content without human review, original perspective, or expertise signals will underperform. Always add personal experience, proprietary data, and fact-checked claims. Layer in E-E-A-T signals: author bylines with credentials, cited sources, real examples |
| SEO optimizer recommends increasing keyword density above 3% | Legacy recommendation conflicting with current best practice | Override any density target above 2%. A 2026 study of 1,500+ Google results found no correlation between keyword density and ranking. Pages in the top 10 have 50% lower keyword density than two years ago. Focus on topical coverage and semantic relevance instead |
| Content not winning featured snippets | Missing concise answer format near the top of the page | Provide a 2-3 sentence direct answer to the core question within the first 120-150 words. Use short paragraphs (2-4 sentences), bulleted lists, and clear H2/H3 subheadings. Featured snippets have 42.9% CTR -- the highest of any SERP feature |
| Social media content underperforming despite good blog content | Direct copy-paste without platform adaptation | Each platform requires format-specific adaptation. LinkedIn favors 1,300-character posts with carousel documents (21.77% median engagement rate). Instagram prioritizes visual-first carousel posts. TikTok requires short-form video. Use the repurposing matrix in `references/content_frameworks.md` |

---

## Success Criteria

- **SEO Score**: Achieve 75+/100 on the SEO optimizer for all published content. Top-performing content averages 80-90. Track scores before and after optimization to measure improvement
- **Content Length**: Target 1,500-2,500 words for comprehensive blog posts. Top-10 Google results average 1,447 words; position-1 results average 1,890 words. Content over 3,000 words wins 3x more traffic and 4x more shares but requires strong structure
- **Keyword Placement**: Primary keyword must appear in the page title, first paragraph, and at least one H2. Keyword density between 1-2% (not higher). Secondary keywords should appear naturally throughout with no forced repetition
- **Readability**: Target Flesch Reading Ease score of 60-70 for general audiences (8th-9th grade level). B2B technical content can target 40-55. Sentence variety should be rated "medium" or "high" by the brand voice analyzer
- **E-E-A-T Compliance**: Every piece of content must include at least one first-person experience element, 3+ cited statistics per 1,000 words, and author attribution with relevant credentials. This is non-negotiable for ranking in 2026 following Google's helpful content updates
- **Brand Voice Consistency**: Maintain consistent formality, tone, and perspective scores across all content pieces as measured by `brand_voice_analyzer.py`. Variance of more than 15 points in formality score between pieces indicates inconsistency
- **Content Calendar Adherence**: Follow the 40/25/25/10 content pillar ratio (educational/thought leadership/product/promotional). Publish at minimum 2-4 blog posts per month and 5-7 social posts per week across primary platforms

---

## Scope & Limitations

**In Scope:**
- Brand voice analysis: formality scoring, tone detection, perspective analysis, readability (Flesch Reading Ease), sentence structure analysis
- SEO content optimization: keyword density, content structure evaluation, meta tag suggestions, heading analysis, link audit, SEO score (0-100)
- Content framework guidance via reference documents (blog templates, social media formats, email structures)
- Content calendar planning and platform-specific optimization guidance

**Out of Scope:**
- AI content generation (this skill analyzes and optimizes content, it does not generate it)
- Keyword research and search volume data (use dedicated SEO tools like Ahrefs, SEMrush, or Moz, or the app-store-optimization skill for mobile)
- Image or video creation and optimization (use design tools like Canva or Figma)
- Social media scheduling and publishing (use Buffer, Hootsuite, or native platform tools)
- Backlink analysis and link building (requires external SEO tools)
- Real-time SERP tracking or rank monitoring
- AI content detection scoring (Google does not penalize AI content by detection alone; focus on quality signals instead)

---

## Integration Points

| Integration | Purpose | How to Connect |
|-------------|---------|----------------|
| **Google Search Console** | Monitor indexing, search queries, CTR, and position data | Use Search Console data to identify underperforming pages, then run `seo_optimizer.py` to diagnose and fix issues. Track position changes after optimization |
| **Google Analytics 4 (GA4)** | Content performance measurement, engagement metrics | Measure page views, time on page, bounce rate, and conversions per content piece. Feed insights back into content strategy decisions |
| **SEO Tools (Ahrefs, SEMrush, Moz)** | Keyword research, backlink data, competitive analysis | Export target keywords from SEO tools to use as input for `seo_optimizer.py`. Use competitive gap analysis to inform content topics |
| **CMS Platforms (WordPress, Webflow, Ghost)** | Content publishing and meta tag implementation | Apply meta tag suggestions from `seo_optimizer.py` directly to CMS fields. Implement heading structure recommendations in post editor |
| **social-media-analyzer skill** | Social content performance tracking | Analyze which content formats and topics perform best on social, then use findings to inform content creation priorities |
| **campaign-analytics skill** | Content ROI measurement | Track content-attributed conversions through campaign analytics. Identify which content pieces drive the most pipeline or revenue |
| **app-store-optimization skill** | App description writing | Apply SEO writing principles and brand voice consistency to app store descriptions using shared voice guidelines |

---

## Tool Reference

### brand_voice_analyzer.py

**Type:** CLI script (positional arguments, no argparse flags)

**Usage:**
```bash
python brand_voice_analyzer.py <file> [format]
```

| Argument | Position | Required | Default | Description |
|----------|----------|----------|---------|-------------|
| `file` | 1st | Yes | -- | Path to text content file to analyze |
| `format` | 2nd | No | `text` | Output format: `text` (human-readable) or `json` (machine-readable) |

**Output Fields:**
- `word_count` -- Total words in content
- `readability_score` -- Flesch Reading Ease (0-100). Below 30 = difficult, 30-60 = moderate, 60-70 = standard, 70+ = easy
- `voice_profile` -- Per-dimension analysis:
  - `formality` -- Dominant: formal or casual (based on keyword matching)
  - `tone` -- Dominant: professional or friendly
  - `perspective` -- Dominant: authoritative or conversational
- `sentence_analysis` -- Average sentence length (words), variety (low/medium/high), total count
- `recommendations` -- Actionable suggestions for readability, sentence variety, and voice consistency

### seo_optimizer.py

**Type:** CLI script (positional arguments with one optional flag)

**Usage:**
```bash
python seo_optimizer.py <file> [primary_keyword] [secondary_keywords] [--json]
```

| Argument | Position/Flag | Required | Default | Description |
|----------|--------------|----------|---------|-------------|
| `file` | 1st | Yes | -- | Path to content file (markdown or HTML) |
| `primary_keyword` | 2nd | No | None | Main target keyword for density and placement analysis |
| `secondary_keywords` | 3rd | No | None | Comma-separated secondary keywords (e.g., `"seo,content,optimization"`) |
| `--json` | Flag | No | text output | Output raw JSON instead of human-readable format |

**Output Fields:**
- `optimization_score` -- Overall SEO score (0-100). Scoring: content length (20 pts), keyword optimization (30 pts), structure (25 pts), readability (25 pts)
- `content_length` -- Word count
- `keyword_analysis`:
  - `primary_keyword` -- Count, density (0-1 scale), in_first_paragraph (bool), in_headings (bool)
  - `secondary_keywords` -- Per-keyword count and density
  - `lsi_keywords` -- Top 10 semantically related terms extracted from content
- `structure_analysis` -- Heading counts (h1/h2/h3), paragraph count, average paragraph length, list count, internal/external link counts
- `readability` -- Score (0-100), level (Easy/Moderate/Difficult/Very Difficult), average sentence length
- `meta_suggestions` -- Generated title, meta description, URL slug, Open Graph tags
- `recommendations` -- Prioritized list of specific improvement actions

---

## content-humanizer

Source path: `references/marketing/content-humanizer/SKILL.md`

# Content Humanizer

Transform machine-sounding content into writing that reads like it came from a real person with real opinions and real experience.

---

## Table of Contents

- [Keywords](#keywords)
- [Quick Start](#quick-start)
- [Core Workflows](#core-workflows)
- [AI Pattern Detection Catalog](#ai-pattern-detection-catalog)
- [Humanization Techniques](#humanization-techniques)
- [Voice Injection Framework](#voice-injection-framework)
- [Rhythm and Cadence Repair](#rhythm-and-cadence-repair)
- [Specificity Replacement Guide](#specificity-replacement-guide)
- [Before and After Examples](#before-and-after-examples)
- [Best Practices](#best-practices)
- [Integration Points](#integration-points)

---

## Keywords

content humanizer, AI content, humanize writing, AI detection, natural writing, authentic content, AI cliches, robotic writing, brand voice, personality injection, writing rhythm, AI patterns, content authenticity, human voice, AI tells, content polishing, voice consistency, writing style, content quality

---

## Clarify First

Before humanizing, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Mode** — audit-only (annotated report) or full humanization rewrite (sets the deliverable and how invasive edits are)
- [ ] **Content type** — docs, blog post, marketing copy, or email (determines how much personality to inject vs. preserve clarity)
- [ ] **Brand voice** — guidelines or one example of writing they love (without it, voice injection is guesswork)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

### Detect AI Patterns in Content

1. Scan for overused filler words (delve, landscape, crucial, leverage, robust)
2. Check for hedging chains ("It's important to note that...")
3. Count em-dash frequency (more than 2 per 500 words = AI fingerprint)
4. Evaluate paragraph structure uniformity (identical patterns = AI)
5. Flag all unattributed vague claims ("Many companies," "Studies show")
6. Score severity: High (10+ tells per 500 words = full rewrite needed)

### Humanize a Draft

1. Replace all filler words with plain-language alternatives
2. Vary sentence length deliberately (short, long, medium, fragment)
3. Replace every vague claim with a specific data point or honest qualification
4. Break uniform paragraph structure with fragments, questions, and asides
5. Add friction and imperfection (qualifications, direction changes, opinions)
6. Inject brand voice if voice guidelines exist

---

## Core Workflows

### Workflow 1: AI Pattern Audit (Diagnostic Only)

Scan content without editing. Produce an annotated report.

**Step 1: Run Detection Scan**

Flag every instance in these categories with severity ratings:
- Critical (kills credibility): Overused filler words, hedging chains, identical paragraph structure, lack of specificity
- Medium (softens impact): Em-dash overuse, false certainty, generic conclusions
- Minor (polish only): Slightly repetitive transitions, mild formatting uniformity

**Step 2: Count and Score**

| Metric | Threshold |
|--------|-----------|
| AI tells per 500 words | < 3 = minor edits needed, 3-7 = significant editing, 8+ = full rewrite |
| Unique paragraph structures | < 3 patterns in 1,000+ words = AI fingerprint |
| Vague claims without attribution | Any = flag each one |
| Sentences starting with "It is" | > 3 per 1,000 words = flag |

**Step 3: Deliver Audit Report**

```markdown
## AI Pattern Audit
Content: [Title or description]
Word count: [X]
AI Tell Count: [X] (Critical: [X], Medium: [X], Minor: [X])
Recommendation: [Minor edits / Significant editing / Full rewrite]

### Critical Issues
[Each issue with line reference, pattern category, and specific fix]

### Medium Issues
[Same format]

### Minor Issues
[Same format]
```

### Workflow 2: Full Humanization Pass

Transform the content from AI-sounding to authentically human.

**Step 1: Remove AI Filler Words**

Never just delete — always replace with something better or restructure the sentence:

| AI Phrase | Replacement Options |
|-----------|-------------------|
| "delve into" | "look at," "dig into," "break down," or restructure without the phrase |
| "the [X] landscape" | "how [X] works today," "the current state of [X]" |
| "leverage" | "use," "apply," "put to work" |
| "crucial" / "vital" / "pivotal" | State the thing and let it be self-evidently important |
| "furthermore" / "moreover" | Start the next sentence directly, or use "and" or "also" |
| "robust" / "comprehensive" | Replace with specific description of what it actually covers |
| "facilitate" / "foster" | "help," "make easier," "allow," "create" |
| "navigate this challenge" | "handle this," "deal with this," "get through this" |
| "in order to" | "to" |
| "it is important to note that" | Delete the phrase; start with the actual note |
| "it goes without saying" | If it goes without saying, do not say it |
| "at the end of the day" | Delete entirely or replace with specific conclusion |
| "a wide range of" | Specify the range or say "many" |

**Step 2: Fix Sentence Rhythm**

AI produces uniform sentence length (18-22 words per sentence). The ear goes numb.

Deliberately vary:
- Break long sentences into two
- Add a short sentence after a long one. Like this.
- Use fragments for emphasis. Especially for emphasis.
- Let some sentences run when the thought needs room to unwind
- Mix declarative, interrogative, and imperative forms

Target rhythm patterns:
- Long. Short. Long, long. Short.
- Question? Answer. Proof.
- Claim. Specific example. So what?

**Step 3: Replace Generic with Specific**

Every vague claim is an invitation to doubt:

Before: "Many companies have seen significant improvements by implementing this strategy."

After (if you have data): "HubSpot published their onboarding funnel data in 2023 — companies that hit first-value in 7 days showed 40% higher 90-day retention."

After (if you do not have data): "I don't have a controlled study to cite, but in every SaaS onboarding flow I've worked on, the pattern is the same: earlier activation = higher retention."

Honest qualification beats vague authority.

**Step 4: Vary Paragraph Structure**

Break the uniform pattern (Statement > Explanation > Example > Bridge):
- Single-sentence paragraph for emphasis
- Question paragraph: pose a question, then answer it
- List in the middle when items are genuinely parallel
- Aside or parenthetical that reveals personality
- Confession: "I got this wrong the first time"
- Fragment paragraph. Just one thought. Then move on.

**Step 5: Add Friction and Imperfection**

Real people:
- Change direction mid-thought: "Actually, let me back up..."
- Qualify things they are uncertain about
- Have opinions that might be wrong: "I might be wrong about this, but..."
- Notice things: "What's interesting here is..."
- React: "Which, if you've ever tried to debug this, you know is maddening."
- Acknowledge tradeoffs: "This works, but it costs you..."

### Workflow 3: Voice Injection

After removing AI patterns, inject the brand's specific personality.

**Step 1: Extract Voice from Examples**

If brand guidelines exist, reference them. If not, request one example of writing the brand loves. Extract:
- Sentence length preference (short punchy vs. flowing)
- Formality level (contractions, slang, jargon policy)
- Humor usage (dry wit, self-deprecating, none)
- Relationship stance (peer-to-peer, expert-to-student, provocateur)
- Signature phrases or patterns

**Step 2: Apply Voice Techniques**

| Technique | How to Apply |
|-----------|-------------|
| Personal anecdotes | "We saw this firsthand when building X" |
| Direct address | Talk to the reader as "you," not "users" or "teams" |
| Opinions without apology | "We think the industry is wrong about this" |
| The aside | Brief parenthetical showing you know more than you are saying |
| Rhythm signature | Match the sentence pattern from the brand's best examples |
| Controlled imperfection | Strategic fragments, direction changes, honest qualifications |

**Step 3: Consistency Check**

After voice injection, verify:
- Voice is consistent from intro to conclusion (no drift)
- Tone matches the content type (blog post vs. docs vs. email)
- Personality does not override clarity (if a joke obscures the point, cut the joke)
- The piece sounds like the same person wrote all of it

---

## AI Pattern Detection Catalog

### Category 1: Overused Filler Words (Critical)

These words appear disproportionately in AI-generated text:

**Tier 1 — Instant Tells:**
delve, landscape (metaphorical), crucial, vital, pivotal, leverage, robust, comprehensive, holistic, foster, facilitate, ensure, navigate (metaphorical), utilize, furthermore, moreover, in addition

**Tier 2 — Suspicious in Clusters:**
streamline, optimize, innovative, cutting-edge, game-changer, paradigm, synergy, ecosystem, empower, unlock, harness, transformative, seamless

### Category 2: Hedging Chains (Critical)

AI hedges constantly because it does not want to be wrong:
- "It's important to note that..."
- "It's worth mentioning that..."
- "One might argue that..."
- "In many cases," "In most scenarios,"
- "It goes without saying..."
- "Needless to say..."

### Category 3: Structural Uniformity (Critical)

Every paragraph follows the same SEEB pattern:
Statement > Explanation > Example > Bridge

Real writing varies. Some paragraphs are one sentence. Some are lists. Some are questions followed by answers. Some digress and come back.

### Category 4: Specificity Vacuum (Critical)

AI replaces specific claims with vague ones to avoid being wrong:
- "Many companies" (which ones?)
- "Studies show" (which studies?)
- "Significantly improved" (by how much?)
- "Leading brands" (name one)
- "A growing number of" (how many?)
- "Best practices suggest" (whose best practices?)

### Category 5: Em-Dash Overuse (Medium)

One or two em-dashes per piece: fine. Em-dash in every other paragraph: AI fingerprint.

### Category 6: False Certainty (Medium)

AI asserts confidently about things nobody can be certain about. "Companies that do X are more successful." According to what data? Based on what sample size?

### Category 7: Generic Conclusions (Medium)

AI conclusions restate the introduction:
"In this article, we explored X, Y, and Z. By implementing these strategies, you can achieve..."

No human concludes like this. Real conclusions add something new or nail the exit line.

---

## Rhythm and Cadence Repair

### The Problem

AI writing has metronomic consistency. Every sentence is roughly the same length. The reader's attention flatlines.

### The Fix

Map sentence lengths and deliberately vary them:

**Before (AI rhythm):**
> Content marketing is an essential strategy for modern businesses. It helps build trust with potential customers over time. Creating high-quality content requires careful planning and execution. The most effective content strategies combine data-driven insights with creative storytelling.

Every sentence: 8-10 words. Same structure. Same length.

**After (human rhythm):**
> Content marketing works. Not because it is clever — because it builds trust before you ever ask for a sale. That takes time. It takes planning. And honestly? It takes more failed drafts than anyone likes to admit. But the companies that figure it out — the ones that combine real data with stories that actually land — they win. Not quickly. But permanently.

Mixed length. Fragments. Questions. Repetition for emphasis. Direction changes.

### Rhythm Patterns to Use

| Pattern | When to Use |
|---------|-------------|
| Long. Short. | After complex explanation, punch with a short statement |
| Question? Answer. | Engage the reader, then satisfy the curiosity |
| Claim. Evidence. So what? | Make a point, prove it, explain why it matters |
| List. Then prose. | Present options or items, then return to narrative |
| Confession. Lesson. | Admit a mistake, extract the learning |

---

## Specificity Replacement Guide

### The Rule

Every vague claim must become either specific or honestly qualified. There is no third option.

### Replacement Patterns

| Vague | Specific Alternative | Honest Qualification |
|-------|---------------------|---------------------|
| "Many companies" | "In a 2024 Gartner survey of 1,200 enterprises" | "In the teams I've worked with" |
| "Studies show" | "A Stanford study published in Nature (2023)" | "I haven't seen controlled studies, but the pattern is..." |
| "Significant improvement" | "A 34% reduction in churn over 6 months" | "Noticeable improvement — I'd estimate 20-30% range" |
| "Industry leaders" | "Stripe, Notion, and Linear" | "The companies I'd point to as examples" |
| "Best practices" | "[Organization]'s published framework recommends" | "What I've seen work consistently" |
| "Growing trend" | "Adoption grew from 12% to 47% between 2022 and 2025" | "Anecdotally, I'm seeing more teams try this" |

---

## Before and After Examples

### Example 1: SaaS Product Description

**Before (AI-generated):**
> It is crucial to leverage your existing customer data in order to effectively navigate the competitive landscape. Furthermore, by implementing a robust onboarding strategy, organizations can ensure that users achieve maximum value from the product and reduce churn significantly.

**After (humanized):**
> Here's the thing nobody says out loud: most SaaS companies have the data to fix their churn problem. They just do not look at it until after customers leave.
>
> Your activation funnel tells you everything. Your best cohorts, your worst, the exact moment the drop-off happens. You do not need another tool — you need someone to stop ignoring what the tool is already showing you.
>
> Nail onboarding first. Everything else is downstream.

### Example 2: Marketing Blog Post

**Before (AI-generated):**
> In the rapidly evolving landscape of digital marketing, it is essential for businesses to leverage cutting-edge strategies to stay ahead of the competition. By implementing a comprehensive content marketing approach, organizations can foster meaningful connections with their target audience and drive sustainable growth.

**After (humanized):**
> Digital marketing changes fast. That part is true. But the companies that actually grow? They are not chasing every new tactic. They are doing the boring stuff well.
>
> Write content people want to read. Answer questions your customers actually ask. Do it consistently for 12 months. It is not exciting advice. But it works — and the "cutting-edge strategies" usually do not.

---

## Best Practices

1. **Audit before editing** — Know what is wrong before you fix it. A piece with 3 AI tells needs polish. A piece with 15 needs a rewrite. The approach is different.

2. **Preserve what works** — Some AI-generated paragraphs are genuinely good. Flag them before rewriting so you do not accidentally destroy the best parts.

3. **Do not over-humanize** — Adding too much personality to technical documentation makes it harder to use. Match the humanity level to the content type.

4. **Get voice context first** — Guessing the brand voice and being wrong wastes time. Ask for one example of writing they love before injecting personality.

5. **Read aloud** — The single most effective test. If it sounds like a press release when read aloud, it is not human enough.

6. **Replace, do not just delete** — Removing "furthermore" leaves a gap. Replace with a better transition or restructure the flow.

7. **Specific beats clever** — A specific data point does more for credibility than a witty phrase. Prioritize substance over style.

8. **Consistency over personality** — A mildly interesting but consistent voice beats a wildly creative voice that shifts every paragraph.

9. **One pass at a time** — Detect first, humanize second, inject voice third. Trying to do all three simultaneously produces inconsistent results.

10. **Flag the specificity gap** — You can make prose flow better, but you cannot invent proof points. If the piece makes five vague claims with zero data, the author needs to provide the specifics. Flag this clearly.

---

## Integration Points

- **Content Production** — Use to create the initial draft. Run Content Humanizer after drafting, before SEO optimization.
- **Copywriting** — Use for conversion copy (landing pages, CTAs, headlines). Content Humanizer works on longer-form pieces.
- **Content Strategy** — Use when deciding what content to create. Not for voice or draft execution.
- **AI SEO** — Use after humanizing to optimize for AI search citation. Human-sounding content gets cited more, but still needs structure for extraction.
- **Brand Guidelines** — Reference brand voice and personality standards before voice injection.
- **Copy Editing** — Use after humanization for grammar, fact-checking, and editorial consistency passes.

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Content still sounds AI-generated after humanization pass | Only surface-level word replacements done — structural uniformity and hedging patterns remain | Run all three passes in order: filler removal, rhythm repair, specificity replacement. Address structure, not just words |
| Brand voice inconsistent after editing | Voice injection done without reference examples or clear guidelines | Request one example of writing the brand loves before injecting voice; extract formality, humor, and relationship stance |
| Over-humanized technical documentation | Personality injection applied to content that needs clarity over personality | Match humanization level to content type — docs need clarity; blog posts and marketing copy need personality |
| Specificity gaps flagged but cannot be filled | Writer does not have access to real data, expert quotes, or original research | Flag clearly as "author must provide" — humanizer cannot invent proof points. Honest qualification beats vague authority |
| AI detection tools still flagging content | Structural patterns (SEEB uniformity) persist despite word-level changes | Vary paragraph structures deliberately — single-sentence paragraphs, questions, fragments, asides, confessions |
| Readability dropped after humanization | Informal language and fragments reduced Flesch score | Balance personality with readability — fragments are fine but complex vocabulary can hurt scores. Target Flesch 60-70 |
| Google SynthID or similar tool detects AI origin | Content was generated with tools that embed watermarks (e.g., Google Gemini) | Rewrite substantially rather than editing in place; change structure, not just words. SynthID detection is statistical |

---

## Success Criteria

- **AI tell density**: Fewer than 3 AI tells per 500 words after humanization pass (from baseline of 8+ pre-edit)
- **Unique paragraph structures**: At least 4 distinct paragraph patterns in any 1,000-word piece (vs. uniform SEEB pattern)
- **Specificity rate**: Zero vague claims remaining without either specific data or honest qualification
- **Voice consistency**: Consistent formality level, humor usage, and relationship stance from introduction to conclusion
- **Read-aloud test**: Content sounds natural when read aloud — no press-release cadence or robotic phrasing
- **Readability maintenance**: Flesch Reading Ease stays within 55-75 range after humanization (no degradation)
- **Brand voice match**: Content passes brand voice review with 90%+ alignment to documented voice guidelines

---

## Scope & Limitations

**In scope:**
- AI pattern detection and audit (diagnostic only or with edits)
- Filler word replacement with context-appropriate alternatives
- Sentence rhythm and cadence repair
- Paragraph structure diversification
- Specificity replacement (vague claims to specific or honestly qualified)
- Voice injection from brand guidelines or example content
- Consistency checking across full-length pieces

**Out of scope:**
- Content creation from scratch (use Content Production)
- Grammar and spelling correction (use Copy Editing)
- SEO optimization (use SEO Specialist or Content Production optimization pass)
- Content strategy or topic selection (use Content Strategy)
- AI content generation or LLM API integration
- Plagiarism detection or originality verification

**Known limitations:**
- Cannot add specificity where no data exists — must flag for author input
- AI detection tools (GPTZero, Originality.ai, Google SynthID) have false positive rates of 10-30%
- Voice injection without clear brand guidelines produces inconsistent results
- Humanization of very short content (<300 words) may not have enough surface area for meaningful improvement
- Content watermarked by AI generation tools (SynthID) may require substantial rewriting beyond pattern-level edits

---

## Scripts

```bash
# Score content for AI patterns and generate audit report
python scripts/readability_scorer.py article.md --json

# Detect AI filler words and hedging patterns with counts
python scripts/ai_pattern_detector.py article.md --verbose

# Analyze content for humanization opportunities
python scripts/content_scorer.py article.md --json
```

---

## content-production

Source path: `references/marketing/content-production/SKILL.md`

# Content Production

The execution engine for content — taking topics from blank page to published, optimized, and distributed.

---

## Table of Contents

- [Keywords](#keywords)
- [Quick Start](#quick-start)
- [Core Workflows](#core-workflows)
- [Content Brief Framework](#content-brief-framework)
- [Drafting Methodology](#drafting-methodology)
- [Optimization Pipeline](#optimization-pipeline)
- [Editorial Calendar Management](#editorial-calendar-management)
- [Content Repurposing System](#content-repurposing-system)
- [Quality Gates](#quality-gates)
- [Best Practices](#best-practices)
- [Integration Points](#integration-points)

---

## Keywords

content production, blog writing, article drafting, content pipeline, editorial workflow, content operations, content calendar, content brief, SEO content, content optimization, readability, internal linking, meta tags, content repurposing, content at scale, editorial calendar, content quality, publishing workflow, long-form content, content management

---

## Clarify First

Before producing the content, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Primary keyword & search intent** — the target query and whether it is informational/commercial (drives the brief Target + SEO pass)
- [ ] **Unique angle / core thesis** — the one argument this piece makes (one angle per piece; drives the Angle section)
- [ ] **Target audience & awareness level** — who reads it and what they already know (sets altitude and the Audience section)
- [ ] **Target word count** — comprehensive guide vs. supporting post (drives scope and structure)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

### Write a Blog Post End-to-End

1. Research: analyze top 5 ranking pieces for the target keyword
2. Brief: define keyword targets, angle, audience, and H2 structure
3. Draft: write with outline-first approach, leading each section with its main point
4. Optimize: SEO pass, readability pass, structure audit, meta tags
5. Validate: run the quality gate checklist before publishing

### Set Up Content Operations

1. Define content pillars aligned with business goals
2. Build an editorial calendar with 4-6 weeks of planned content
3. Establish the production workflow (brief > draft > edit > optimize > publish)
4. Set up repurposing workflow to multiply each piece across channels
5. Define quality gates that every piece must pass before publishing

---

## Core Workflows

### Workflow 1: Research and Brief

**Step 1: Competitive Content Analysis**

Before writing, understand what already ranks for your target keyword:

1. Identify the top 5-10 ranking pieces
2. Map their angles and formats:

| URL | Format | Word Count | Key Angle | What's Missing |
|-----|--------|-----------|-----------|----------------|
| [URL 1] | How-to guide | 2,400 | Step-by-step technical | No real-world examples |
| [URL 2] | Listicle | 1,800 | Tools comparison | Outdated, 2023 data |
| [URL 3] | Expert roundup | 3,100 | Multiple perspectives | No actionable framework |

3. Identify the content gap: what does nobody cover well?
4. Verify search intent:

| SERP Pattern | Intent | What to Write |
|-------------|--------|---------------|
| "What is / How to" dominate | Informational | Comprehensive guide or explainer |
| Product pages, reviews | Commercial | Comparison or buyer's guide |
| Forum results (Reddit, Quora) | Discovery | Opinionated piece with real perspective |
| News, recent articles | Trending | Timely take with unique angle |

**Step 2: Source Gathering**

Collect 3-5 credible, citable sources before drafting:
- Original research (studies, surveys, published reports)
- Official documentation or industry standards
- Expert quotes with full attribution
- Data with specific numbers (not vague claims)

Rule: If you cannot cite a specific number, do not make a vague claim.

**Step 3: Produce the Content Brief**

```markdown
## Content Brief

### Target
- Primary keyword: [keyword] (volume: [X], difficulty: [X])
- Secondary keywords: [keyword 1], [keyword 2], [keyword 3]
- Search intent: [Informational / Commercial / Transactional]

### Audience
- Reader profile: [Who they are and what they know]
- Job-to-be-done: [What problem they are solving right now]
- Awareness level: [Unaware / Problem-aware / Solution-aware]

### Angle
- Unique perspective: [What makes this piece different]
- Core argument: [The single thesis of this piece]
- Key claims to prove: [3-5 specific claims with supporting evidence]

### Structure
- H1: [Working title]
- H2: [Section 1]
- H2: [Section 2]
- H2: [Section 3]
- H2: [Section 4]
- H2: [Conclusion / Next Steps]

### Requirements
- Target word count: [X]
- Internal links to include: [List existing pages to link to]
- Competitive pieces to beat: [Top 3 URLs to outperform]
- CTA: [What action should the reader take]
```

### Workflow 2: Drafting

**Step 1: Build the Outline**

Before writing prose, create the header skeleton:
- H1 that includes the keyword and creates curiosity
- 4-7 H2 sections in logical progression
- H3s only when a section genuinely needs subdivision
- Conclusion with CTA

**Step 2: Write the Introduction**

The intro has one job: make the reader believe this piece answers their question.

Formula:
1. Name the problem or situation the reader is in (1 sentence)
2. Name what this piece does about it (1 sentence)
3. Establish credibility if relevant (1 sentence, optional)

What to avoid:
- "In today's digital landscape..." (everyone does this)
- Starting with a question unless it is genuinely sharp
- Three sentences of context before reaching the point

**Step 3: Write Section by Section**

For each H2:
1. State the main point in the first sentence
2. Prove it with an example, statistic, or comparison
3. Provide one actionable takeaway before moving to the next section
4. Use transitional phrases to connect sections naturally

**Step 4: Write the Conclusion**

Three elements:
1. Summary of core argument (1-2 sentences, not a repeat of the intro)
2. The single most important next step
3. CTA aligned with the content goal

### Workflow 3: Optimization Pipeline

Run these passes in order on every draft:

**Pass 1: SEO Optimization**

- [ ] Title tag: contains primary keyword, under 60 characters, curiosity-driving
- [ ] H1: different from title tag, keyword-rich, reads naturally
- [ ] H2s: at least 2-3 contain secondary keywords or related phrases
- [ ] First paragraph: primary keyword appears in first 100 words
- [ ] Keyword density: primary keyword appears naturally 3-5 times (not stuffed)
- [ ] Image alt text: descriptive, includes keyword where natural
- [ ] URL slug: short, keyword-first, no stop words
- [ ] Internal links: 2-4 minimum, linking to and from related content
- [ ] External links: 1-3 to authoritative sources

**Pass 2: Readability**

- [ ] Average sentence length: 15-20 words with variation
- [ ] No paragraph exceeds 4 sentences
- [ ] Active voice used in 80%+ of sentences
- [ ] Jargon explained on first use for non-expert audiences
- [ ] At least one visual element (image, table, diagram) per 500 words
- [ ] Subheadings visible every 200-300 words
- [ ] Readability score target: 60-70 (Flesch-Kincaid)

**Pass 3: Structure Audit**

- [ ] Intro delivers on the headline's promise
- [ ] Every H2 earns its place (cut sections that add no value)
- [ ] At least 2 concrete examples or illustrations
- [ ] Conclusion feels earned, not padded
- [ ] Content flow follows logical progression
- [ ] No orphan sections that could be merged

**Pass 4: Meta Content**

- [ ] Meta description: 150-160 characters, includes keyword, ends with hook
- [ ] OG title: optimized for social sharing (can differ from meta title)
- [ ] OG description: optimized for social click-through
- [ ] Canonical URL: set correctly
- [ ] Schema markup: Article schema at minimum

---

## Editorial Calendar Management

### Calendar Structure

| Week | Monday | Wednesday | Friday |
|------|--------|-----------|--------|
| 1 | [Pillar topic A] | [Supporting topic B] | [Social repurpose] |
| 2 | [Pillar topic C] | [Guest/collab piece] | [Update old post] |
| 3 | [Pillar topic A] | [Supporting topic D] | [Social repurpose] |
| 4 | [Data/research piece] | [Supporting topic E] | [Roundup/compilation] |

### Content Types by Frequency

| Type | Frequency | Purpose |
|------|-----------|---------|
| Pillar posts (2,000+ words) | 2x/month | Authority building, SEO ranking |
| Supporting posts (800-1,500 words) | 2-4x/month | Topic cluster depth, internal linking |
| Update/refresh existing posts | 2x/month | Maintain ranking, improve performance |
| Data/research pieces | 1x/month | Backlink attraction, original insights |
| Guest/collaboration | 1x/month | Audience expansion, backlinks |

### Production Timeline

| Stage | Owner | Duration | Deadline Relative to Publish |
|-------|-------|----------|---------------------------|
| Brief creation | Strategist | 1 day | Publish - 14 days |
| Research and outline | Writer | 2 days | Publish - 12 days |
| First draft | Writer | 3 days | Publish - 9 days |
| Editorial review | Editor | 2 days | Publish - 7 days |
| Revisions | Writer | 1 day | Publish - 5 days |
| SEO optimization | SEO lead | 1 day | Publish - 4 days |
| Final review | Editor | 1 day | Publish - 3 days |
| Staging and QA | Operations | 1 day | Publish - 2 days |
| Publish | Operations | — | Publish day |

---

## Content Repurposing System

### One Piece, Many Formats

Every pillar content piece should produce 5-8 derivative pieces:

| Source | Derivative | Platform | Effort |
|--------|-----------|----------|--------|
| Blog post | Key insight thread | Twitter/X | Low |
| Blog post | Carousel of main points | LinkedIn | Medium |
| Blog post | Short-form video summary | TikTok/Reels | Medium |
| Blog post | Newsletter section | Email | Low |
| Blog post | Slide deck | SlideShare/LinkedIn | Medium |
| Blog post | Podcast discussion topic | Podcast | Low |
| Blog post | Infographic | Pinterest/Blog | High |
| Blog post | FAQ page content | Website | Low |

### Repurposing Workflow

1. **Publish the pillar piece** — Let it index and get initial traction
2. **Extract 3-5 key insights** — Each insight becomes a standalone social piece
3. **Adapt format per platform** — Not copy-paste; reformat for each platform's norms
4. **Schedule distribution** — Spread across 1-2 weeks after publication
5. **Cross-link everything** — Social pieces link back to the pillar content
6. **Track performance** — Identify which derivative formats drive the most traffic back

### Evergreen Refresh Cycle

For high-performing content:
- Review quarterly for accuracy and relevance
- Update statistics and data points annually
- Refresh publish date after significant updates
- Re-promote refreshed content through social and email
- Add new internal links as related content is published

---

## Quality Gates

### Pre-Publish Checklist

Every piece must pass these gates before publishing:

**Content Quality:**
- [ ] Core thesis is stated clearly in the first 200 words
- [ ] Every factual claim has a source or is labeled as opinion
- [ ] At least one image, table, or visual element
- [ ] Introduction does not start with a cliche
- [ ] Word count is within 10% of target
- [ ] No AI-sounding patterns (run Content Humanizer audit if uncertain)

**SEO Quality:**
- [ ] Primary keyword in title, H1, first 100 words, and 2+ H2s
- [ ] Meta title under 60 characters with keyword
- [ ] Meta description 150-160 characters with keyword and hook
- [ ] All images have descriptive alt text
- [ ] 2-4 internal links present and functional
- [ ] URL slug is clean and keyword-first

**Technical Quality:**
- [ ] All links verified and functional
- [ ] Images optimized for web (compressed, appropriate dimensions)
- [ ] Mobile rendering verified
- [ ] Schema markup implemented
- [ ] Canonical URL set
- [ ] OG tags configured for social sharing

**Editorial Quality:**
- [ ] Spelling and grammar checked
- [ ] Consistent formatting throughout
- [ ] Heading hierarchy maintained (H1 > H2 > H3, no skips)
- [ ] Consistent voice and tone from start to finish
- [ ] CTA present and aligned with content goal

---

## Best Practices

1. **Brief first, always** — Never start writing without a brief. Even a 5-minute brief prevents 2 hours of rewriting.

2. **One angle per piece** — A piece that tries to be a how-to, a comparison, and an opinion piece fails at all three. Pick one angle.

3. **Front-load value** — The reader should get something useful in the first 300 words. Do not make them scroll to find the point.

4. **Optimize existing before creating new** — Refreshing a post ranked #8 to #3 produces more traffic than a new post starting at #50.

5. **Internal linking is not optional** — Every new piece should link to 2-4 existing pieces, and 2-4 existing pieces should be updated to link to the new piece.

6. **Kill your darlings** — If a section does not serve the reader or the keyword strategy, cut it. Length without value hurts ranking.

7. **Batch production** — Write briefs for 4-6 pieces at once, then draft in batches. Context-switching between briefing and writing reduces quality.

8. **Measure what matters** — Track organic traffic, time on page, and conversion rate. Vanity metrics (word count, publishing frequency alone) are misleading.

9. **Repurpose systematically** — Every pillar piece should produce 5+ derivative pieces. Build repurposing into the production workflow, not as an afterthought.

10. **Maintain a content debt backlog** — Track content that needs updating, broken links, outdated statistics, and missing internal links. Address content debt regularly.

---

## Integration Points

- **Content Strategy** — Use for deciding what to write (topics, calendar, pillar structure). Content Production handles the execution.
- **Content Humanizer** — Use after drafting when the piece sounds robotic. Run before the SEO optimization pass.
- **AI SEO** — Use for optimizing specifically for AI search citation in addition to traditional SEO.
- **Copywriting** — Use for landing pages, CTAs, and conversion copy. Content Production handles long-form content.
- **SEO Specialist** — Use for technical SEO audits across the content library. Content Production handles per-piece optimization.
- **Social Content** — Use for distributing and repurposing content across social platforms.
- **Copy Editing** — Use for the editorial review pass within the production pipeline.

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Content consistently fails the quality gate checklist | Briefs are incomplete or writers do not have enough context | Invest more time in brief creation — include target keyword, angle, audience, H2 structure, and competitive gaps |
| Published content ranks #15-30 but does not break into top 10 | Content depth insufficient or missing E-E-A-T signals compared to page 1 results | Add original data, expert quotes, experience signals; increase word count to match or exceed top-ranking competitors |
| Content sounds robotic after AI-assisted drafting | AI patterns not caught during editing passes | Run Content Humanizer audit before SEO optimization pass; check for filler words, hedging, and structural uniformity |
| Internal linking neglected on new posts | Not built into production workflow | Add "update 2-4 existing posts to link to new content" as a required step in every production checklist |
| Repurposing never happens despite planning | Repurposing treated as afterthought instead of workflow step | Build repurposing into the production timeline — schedule derivative content in the same editorial calendar |
| Production bottleneck at editorial review stage | Single editor reviewing all content; no SLA on review turnaround | Set 48-hour review SLA; create self-service checklists writers can run before submitting for review |
| Content outdated within 6 months of publishing | No refresh cycle established | Schedule quarterly reviews for all content ranking top 20; update stats, links, and publish dates |

---

## Success Criteria

- **Production velocity**: Maintaining planned cadence (2-4 pieces/week) with less than 10% schedule slippage
- **Quality gate pass rate**: 90%+ of drafts passing the pre-publish quality gate checklist on first or second review
- **SEO optimization score**: Average score of 75+ on the four-pass optimization pipeline (SEO, readability, structure, meta)
- **Readability score**: Flesch Reading Ease of 60-70 across all published content (appropriate for web audiences)
- **Internal link coverage**: Every new piece includes 3-5 internal links, and 3+ existing pieces updated to link back
- **Repurposing multiplier**: Each pillar piece produces 5+ derivative pieces across social, email, and other channels
- **Content performance**: 60%+ of content published in last 6 months generating organic impressions within 90 days

---

## Scope & Limitations

**In scope:**
- Full content production pipeline from brief to publish
- Competitive research and source gathering for content briefs
- Drafting methodology (outline-first, section-by-section)
- Four-pass optimization pipeline (SEO, readability, structure, meta)
- Editorial calendar management and production timelines
- Content repurposing system across channels
- Quality gates and pre-publish checklists

**Out of scope:**
- Content strategy and topic selection (use Content Strategy)
- AI content humanization (use Content Humanizer)
- Detailed copy editing (use Copy Editing)
- Technical SEO audits (use SEO Specialist)
- Social media platform management (use Social Content)
- Design and visual content creation

**Known limitations:**
- 60% of marketing teams now use AI in content workflows (2026 data) — quality control processes must account for AI-assisted drafting
- Production timelines assume dedicated writer and editor roles; solo operators need adjusted timelines
- Content performance measurement requires Google Search Console and analytics access
- Repurposing effectiveness varies by platform — not all derivative formats will perform equally

---

## Scripts

```bash
# Score content readability with detailed metrics
python scripts/readability_scorer.py article.md --json

# Generate a content brief from keyword research
python scripts/content_brief_generator.py --keyword "cloud cost optimization" --json

# Analyze headline options for a new piece
python scripts/headline_analyzer.py --headlines headlines.txt --json
```

---

## content-strategy

Source path: `references/marketing/content-strategy/SKILL.md`

# Content Strategy

Strategic content planning that drives traffic, builds authority, and generates leads by being either searchable, shareable, or both.

---

## Table of Contents

- [Keywords](#keywords)
- [Quick Start](#quick-start)
- [Core Workflows](#core-workflows)
- [Content Pillar Framework](#content-pillar-framework)
- [Audience Research Methodology](#audience-research-methodology)
- [Topic Clustering](#topic-clustering)
- [Funnel Mapping](#funnel-mapping)
- [Content Audit Framework](#content-audit-framework)
- [Searchable vs. Shareable Matrix](#searchable-vs-shareable-matrix)
- [Competitive Content Analysis](#competitive-content-analysis)
- [Best Practices](#best-practices)
- [Integration Points](#integration-points)

---

## Keywords

content strategy, content planning, content pillars, topic clusters, content calendar, audience research, content audit, funnel mapping, content gaps, editorial planning, blog strategy, content ideas, topic ideation, SEO content strategy, content roadmap, content marketing strategy, content performance, keyword research, buyer journey content, search intent mapping

---

## Clarify First

Before building the strategy, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Business goal for content** — traffic, leads, brand awareness, or thought leadership (drives pillar selection and funnel balance)
- [ ] **ICP / target audience** — industry, role, seniority (drives audience research and topic prioritization)
- [ ] **Current content state** — starting fresh, some content, or mature library (sets strategy-from-scratch vs. audit path)
- [ ] **Publishing capacity** — writers and cadence available per week/month (drives the editorial calendar)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

### Build a Content Strategy from Scratch

1. Define 3-5 content pillars aligned with business goals and audience needs
2. Conduct audience research to identify questions, pain points, and language
3. Build topic clusters around each pillar with keyword targets
4. Map topics to funnel stages (awareness, consideration, decision)
5. Prioritize by searchability, business value, and competitive gap
6. Build an editorial calendar with publishing cadence

### Audit and Improve Existing Strategy

1. Inventory all existing content with performance metrics
2. Classify each piece by pillar, funnel stage, and format
3. Identify gaps (missing topics, underserved funnel stages, outdated content)
4. Score each piece on traffic, engagement, conversion, and relevance
5. Build remediation plan: update, consolidate, remove, or create new

---

## Core Workflows

### Workflow 1: Strategy Development

**Step 1: Business Context Gathering**

Before planning content, understand the business foundation:

```markdown
## Strategy Context
- Business goal for content: [Traffic / Leads / Brand awareness / Thought leadership]
- Product/service: [What you sell and to whom]
- Ideal customer profile: [Industry, company size, role, seniority]
- Sales cycle: [Self-serve / Sales-assisted / Enterprise]
- Current content state: [Starting fresh / Some content / Mature library]
- Resources: [Writers, budget, publishing capacity per week/month]
- Competitors producing content: [Top 3-5 competitor blogs]
```

**Step 2: Customer Research for Content**

Mine these sources for content topics:

| Source | What to Extract | How to Use |
|--------|----------------|-----------|
| Sales call recordings | Questions prospects ask before buying | Create content answering each question |
| Support tickets | Recurring problems and confusion | Tutorial and troubleshooting content |
| Customer interviews | Language they use to describe problems | Use their exact words in headlines and copy |
| Product reviews (yours + competitors) | Praise and complaints | Content addressing concerns, amplifying strengths |
| Community forums (Reddit, Slack, Discord) | Questions, debates, misconceptions | Topic ideas with proven demand |
| Search console queries | What people search to find you | Optimize for highest-potential queries |

**Step 3: Define Content Pillars**

Pillars are the 3-5 broad topic areas your content focuses on. Each pillar should:
- Connect directly to your product or expertise
- Address a topic your audience actively seeks information about
- Support your business goals (traffic, leads, authority)
- Be broad enough to generate 20+ subtopics
- Be specific enough to establish expertise

**Step 4: Build Topic Clusters**

For each pillar, develop a cluster of 10-25 topics:

```markdown
## Pillar: [Topic Area]
Pillar page: [Comprehensive guide serving as the hub]

### Supporting Topics
1. [Topic] — KW: [keyword], Vol: [X], Diff: [X], Intent: [Info/Commercial]
2. [Topic] — KW: [keyword], Vol: [X], Diff: [X], Intent: [Info/Commercial]
3. [Topic] — KW: [keyword], Vol: [X], Diff: [X], Intent: [Info/Commercial]
...

### Internal Linking Plan
- All supporting topics link to pillar page
- Pillar page links to all supporting topics
- Related supporting topics cross-link to each other
```

**Step 5: Prioritize Topics**

Score each topic on a priority matrix:

| Factor | Weight | Scoring |
|--------|--------|---------|
| Search volume | 25% | High (3), Medium (2), Low (1) |
| Keyword difficulty | 20% | Easy (3), Medium (2), Hard (1) |
| Business relevance | 30% | Direct product connection (3), Adjacent (2), Tangential (1) |
| Competitive gap | 15% | No good content exists (3), Beatable content (2), Strong competitors (1) |
| Content asset value | 10% | Evergreen + repurposable (3), Seasonal (2), One-time (1) |

Priority score = weighted sum. Execute highest scores first.

### Workflow 2: Content Audit

**Step 1: Inventory All Content**

Build a content inventory spreadsheet:

| URL | Title | Pillar | Format | Publish Date | Last Updated | Monthly Traffic | Avg Time on Page | Conversions | Target Keyword | Ranking Position |
|-----|-------|--------|--------|-------------|-------------|----------------|-----------------|-------------|---------------|-----------------|

**Step 2: Classify Each Piece**

For each piece, determine:
- **Pillar alignment**: Which pillar does it belong to? (Or does it belong to none?)
- **Funnel stage**: Awareness, consideration, or decision?
- **Content type**: Tutorial, comparison, thought leadership, news, case study?
- **Status**: Current, outdated, thin, duplicate, orphaned?

**Step 3: Score Performance**

| Score | Traffic | Engagement | Conversion | Action |
|-------|---------|-----------|------------|--------|
| A (top 20%) | High traffic | Above avg time on page | Drives conversions | Protect, repurpose, update regularly |
| B (middle 40%) | Moderate | Average engagement | Some conversions | Optimize, improve, interlink |
| C (next 30%) | Low | Below average | Minimal | Update or consolidate |
| D (bottom 10%) | Near zero | High bounce | None | Redirect, remove, or completely rewrite |

**Step 4: Build Remediation Plan**

| Action | When | How |
|--------|------|-----|
| Update | Content is B or C tier with good topic but outdated info | Refresh data, add new sections, update publish date |
| Consolidate | Multiple thin pieces on same topic | Merge into one comprehensive piece, redirect old URLs |
| Remove | Content is irrelevant, duplicate, or unfixable | 301 redirect to most relevant remaining page |
| Create new | Gap exists in pillar coverage | Add to editorial calendar with priority score |
| Optimize | Content ranks #4-20 for target keyword | On-page SEO improvements, better intro, internal links |

---

## Content Pillar Framework

### Pillar Design Principles

**Example Pillar Structure for a SaaS Product:**

| Pillar | Business Connection | Audience Need | Content Types |
|--------|-------------------|--------------|---------------|
| [Core problem you solve] | Direct product relevance | Actively searching for solutions | How-to guides, tutorials, comparisons |
| [Industry your audience works in] | Thought leadership | Staying current on trends | Analysis, predictions, benchmarks |
| [Adjacent skill your audience needs] | Trust building | Professional development | Frameworks, templates, playbooks |
| [Use case deep dives] | Product education | Understanding applications | Case studies, walkthroughs, examples |

### Pillar Page Structure

Each pillar should have a comprehensive hub page (2,000-4,000 words) that:
- Defines the topic comprehensively
- Links to all supporting cluster content
- Targets the broadest keyword in the cluster
- Gets updated as new cluster content publishes
- Serves as the authority page for the topic area

---

## Audience Research Methodology

### Research Framework

| Method | Time Required | Quality | Best For |
|--------|-------------|---------|----------|
| Customer interview analysis | 2-4 hours | Highest | Understanding language, pain points, objections |
| Sales call review | 1-2 hours | High | Identifying pre-purchase questions |
| Support ticket mining | 1-2 hours | High | Finding confusion points and tutorial needs |
| Competitor comment analysis | 1 hour | Medium | Discovering unmet content needs |
| Community forum research | 1-2 hours | Medium | Finding real questions and debates |
| Search console analysis | 30 min | Medium | Understanding what queries already reach you |
| Keyword research tools | 1-2 hours | Medium | Quantifying demand for topics |

### Customer Language Extraction

The most valuable output of audience research is exact language:

| Customer Says | Content Opportunity |
|--------------|-------------------|
| "I wish I knew..." | Educational content using their exact framing |
| "The hardest part is..." | Tutorial content addressing that specific difficulty |
| "I always forget to..." | Checklist or template content |
| "Everyone says to do X, but..." | Contrarian or nuanced content |
| "Is it worth it to..." | ROI analysis or comparison content |
| "What's the difference between..." | Comparison or explainer content |

---

## Funnel Mapping

### Content by Funnel Stage

| Stage | Reader Mindset | Content Goal | Content Types | Metrics |
|-------|---------------|-------------|---------------|---------|
| Awareness | "I have a problem" | Attract and educate | Blog posts, videos, infographics, social content | Traffic, impressions, shares |
| Consideration | "What are my options?" | Build trust and differentiate | Comparisons, case studies, guides, webinars | Time on page, email signups, return visits |
| Decision | "Is this the right solution?" | Convert | Product pages, demos, free trials, ROI calculators | Signups, trials, demo requests, purchases |

### Funnel Mapping Template

For each content pillar, ensure coverage across all funnel stages:

```markdown
## Pillar: [Topic]

### Awareness Topics (attract new visitors)
- [Topic targeting broad informational keyword]
- [Topic answering common beginner question]
- [Topic providing industry data or benchmark]

### Consideration Topics (build trust and preference)
- [Topic comparing approaches or solutions]
- [Topic showing how to evaluate options]
- [Case study demonstrating results]

### Decision Topics (drive conversion)
- [Product-specific tutorial or walkthrough]
- [ROI calculator or assessment tool]
- [FAQ addressing buying objections]
```

---

## Searchable vs. Shareable Matrix

### Understanding the Distinction

| Dimension | Searchable Content | Shareable Content |
|-----------|-------------------|-------------------|
| Discovery | People search for it (keyword-driven) | People share it (social-driven) |
| Lifespan | Evergreen (months to years) | Timely (days to weeks) |
| Examples | "How to set up GA4 tracking" | "The state of marketing in 2026" |
| Traffic pattern | Steady, compounding | Spike, then decline |
| Optimization | SEO-first | Hook and emotion-first |
| Measurement | Organic traffic, rankings | Shares, engagement, referral traffic |

### Strategy Balance

Most content strategies should be:
- 60-70% searchable (sustainable traffic engine)
- 20-30% shareable (brand awareness, audience growth)
- 10% promotional (product launches, offers)

### Content Type Classification

| Content Type | Searchable | Shareable | Both |
|-------------|-----------|-----------|------|
| How-to guides | High | Low | — |
| Original research | Medium | High | Yes |
| Comparisons | High | Medium | Yes |
| Thought leadership | Low | High | — |
| Templates/tools | High | Medium | Yes |
| Case studies | Medium | Medium | Yes |
| Industry news takes | Low | High | — |
| Tutorials | High | Low | — |
| Frameworks/playbooks | Medium | High | Yes |

---

## Competitive Content Analysis

### Analysis Framework

For each top competitor:

```markdown
## Competitor: [Name]

### Content Inventory
- Blog frequency: [Posts per week/month]
- Content types: [Formats they use]
- Average word count: [Length]
- Primary topics: [Their content pillars]

### Strengths
- [What they do well]
- [Topics where they dominate]

### Gaps
- [Topics they don't cover]
- [Angles they miss]
- [Outdated content that could be beaten]

### Opportunity
- [Where you can win with better content]
- [Underserved topics in their coverage]
```

### Competitive Gap Scoring

| Topic | Competitor A | Competitor B | Competitor C | Your Coverage | Gap Score |
|-------|-------------|-------------|-------------|---------------|-----------|
| [Topic 1] | Strong | None | Weak | None | High opportunity |
| [Topic 2] | Strong | Strong | Strong | Weak | Improve existing |
| [Topic 3] | None | None | None | None | Blue ocean opportunity |

---

## Best Practices

1. **Strategy before production** — A mediocre topic executed well is still a mediocre result. Spend time picking the right topics.

2. **Customer research is non-negotiable** — Content strategy built without customer input is guessing. Mine sales calls, support tickets, and customer language before planning.

3. **Cover the full funnel** — Most teams over-index on awareness content. Ensure each pillar has consideration and decision-stage content too.

4. **Prioritize by business impact, not search volume** — A 500-volume keyword with high purchase intent outperforms a 10,000-volume keyword with no commercial relevance.

5. **Audit before you create** — Most content libraries have underperforming content that could be improved for more impact than writing something new.

6. **Interlink systematically** — Topic clusters only work when content is connected through internal links. Build linking into the production process.

7. **Refresh > Publish** — Updating a post ranking #8 to reach #3 produces more traffic than a new post starting at position #50.

8. **One pillar at a time** — Build depth in one pillar before spreading across all of them. Authority comes from depth, not breadth.

9. **Document your strategy** — A strategy that only lives in someone's head is not a strategy. Write it down, share it, refer to it.

10. **Measure quarterly** — Content strategy is a 6-12 month investment. Monthly reviews for tactics, quarterly reviews for strategy adjustments.

---

## Integration Points

- **Content Production** — Use for executing the strategy (writing, editing, publishing). Content Strategy decides what; Content Production does it.
- **SEO Specialist** — Use for technical SEO and keyword research to inform topic selection and prioritization.
- **AI SEO** — Use for optimizing content specifically for AI search citation alongside traditional SEO.
- **Copywriting** — Use when strategy identifies need for landing pages or conversion copy.
- **Social Content** — Use for distributing content across social platforms after publication.
- **Marketing Context** — Use as the foundation. Content strategy should align with ICP, positioning, and business goals.
- **Campaign Analytics** — Use to measure content performance and inform strategy adjustments.

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Content published consistently but no organic traffic growth | Topics selected without keyword research or targeting zero-volume queries | Re-prioritize using search volume x business relevance x competitive gap scoring matrix |
| All content is awareness-stage, no leads generated | Over-indexing on top-of-funnel content without consideration/decision stage pieces | Audit funnel coverage per pillar; create 2-3 consideration and decision pieces per pillar |
| Topic cannibalization across content pieces | Multiple articles targeting the same keyword without differentiation | Map one primary keyword per page; consolidate competing pieces or differentiate angles |
| Content calendar frequently disrupted | Production timelines too tight or no buffer for reviews and revisions | Add 3-day buffer per piece; batch brief creation 4-6 pieces at a time |
| Competitor consistently outranks on shared topics | Competitor has stronger E-E-A-T signals or deeper content coverage | Analyze competitor content depth; add original data, expert quotes, and experience signals |
| Content audit reveals 70%+ of library is underperforming | Strategy was never defined — content was reactive, not planned | Start with 3 content pillars, build 10-15 cluster topics per pillar, then produce systematically |

---

## Success Criteria

- **Pillar coverage**: 3-5 content pillars defined with 15+ cluster topics each, covering all three funnel stages
- **Organic traffic contribution**: Content driving 40%+ of total organic traffic within 12 months
- **Topic cluster completeness**: Each pillar has hub page + 10+ supporting pieces with bidirectional internal links
- **Content freshness**: 80%+ of library updated within the last 12 months; high-value content refreshed quarterly
- **Funnel balance**: Content split approximately 60% awareness, 25% consideration, 15% decision (or adjusted per business model)
- **Conversion from content**: Content-attributed leads growing 10%+ quarter-over-quarter
- **Search visibility**: 50%+ of target keywords ranking in top 20 within 6 months of strategy execution

---

## Scope & Limitations

**In scope:**
- Content pillar definition and topic cluster planning
- Audience research methodology for content topics
- Keyword-informed topic prioritization
- Funnel mapping (awareness, consideration, decision)
- Content audit and remediation planning
- Competitive content gap analysis
- Editorial calendar structure and cadence planning

**Out of scope:**
- Content writing and production (use Content Production)
- SEO technical optimization (use SEO Specialist)
- Social media distribution strategy (use Social Content)
- Paid content promotion and advertising
- Content management system selection or setup
- Brand voice and messaging development

**Known limitations:**
- Content strategy requires 6-12 months to show compounding results — short-term ROI expectations are unrealistic
- AI Overviews reducing organic CTR means position 1 delivers fewer clicks than historical benchmarks
- Keyword volume data from tools is estimated and varies between providers
- Content audit accuracy depends on access to Google Search Console and analytics data
- Competitive content analysis is point-in-time; competitors update strategies continuously

---

## Scripts

```bash
# Generate a content calendar plan from topic list
python scripts/content_calendar_planner.py --topics topics.csv --cadence weekly --json

# Analyze headlines for click-worthiness and SEO
python scripts/headline_analyzer.py --headlines headlines.txt --json

# Score content brief completeness
python scripts/content_brief_generator.py --keyword "cloud cost optimization" --json
```

---

## copy-editing

Source path: `references/marketing/copy-editing/SKILL.md`

# Copy Editing

Systematic copy improvement through focused editorial passes that enhance clarity, voice, proof, and conversion impact.

---

## Table of Contents

- [Keywords](#keywords)
- [Quick Start](#quick-start)
- [The Seven Sweeps Framework](#the-seven-sweeps-framework)
- [Quick-Pass Editing Guide](#quick-pass-editing-guide)
- [Common Copy Problems and Fixes](#common-copy-problems-and-fixes)
- [Style Consistency Standards](#style-consistency-standards)
- [Fact-Checking Protocol](#fact-checking-protocol)
- [Editorial Checklist](#editorial-checklist)
- [Best Practices](#best-practices)
- [Integration Points](#integration-points)

---

## Keywords

copy editing, editorial review, copy feedback, proofreading, content polishing, copy sweep, editorial standards, style consistency, grammar check, fact-checking, clarity editing, voice consistency, benefit framing, proof validation, specificity, conversion copy editing, marketing copy review, copy quality

---

## Clarify First

Before editing, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Goal & desired action** — what the copy must get the reader to do (prioritizes the CTA / Zero Risk sweep)
- [ ] **Target audience** — who reads it and their awareness level (calibrates the So What, Specificity, and Emotion sweeps)
- [ ] **Voice & style standard** — brand voice or an existing style guide (drives the Voice and Style Consistency sweeps)
- [ ] **Edit depth** — full Seven Sweeps or a quick polish pass (sets the scope of the review)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

### Full Copy Review (Seven Sweeps)

1. Read through once without editing to understand the whole piece
2. Sweep 1 — Clarity: flag confusing sentences, unclear references, jargon
3. Sweep 2 — Voice and Tone: flag shifts in formality, personality inconsistencies
4. Sweep 3 — So What: flag features without benefits, claims without consequences
5. Sweep 4 — Prove It: flag unsubstantiated claims, missing social proof
6. Sweep 5 — Specificity: flag vague language, round numbers, generic statements
7. Sweep 6 — Heightened Emotion: strengthen pain points, aspirations, urgency
8. Sweep 7 — Zero Risk: remove barriers near CTAs, add trust signals

### Quick Copy Pass

1. Cut filler words (very, really, just, actually, basically)
2. Replace weak verbs (utilize > use, facilitate > help, leverage > use)
3. Fix passive voice (reports are generated > we generate reports)
4. Verify one idea per sentence, one topic per paragraph
5. Check CTA for action orientation

---

## The Seven Sweeps Framework

Edit through seven sequential passes. Each focuses on one dimension. After each sweep, verify previous sweeps are not compromised.

### Sweep 1: Clarity

**Focus:** Can the reader understand what you are saying on the first read?

**What to check:**
- Sentences trying to say too much (split them)
- Unclear pronoun references ("it" — what is "it"?)
- Jargon or insider language without explanation
- Ambiguous statements that could be read two ways
- Missing context that assumes reader knowledge

**Clarity killers to fix:**

| Problem | Fix |
|---------|-----|
| Sentence over 30 words | Split into two sentences |
| Abstract language | Replace with concrete example |
| Buried main point | Move to beginning of paragraph |
| Three-clause sentence | Simplify to one or two clauses |
| Undefined acronym | Spell out on first use |

**After this sweep:** Confirm the "Rule of One" (one idea per section) and "You Rule" (copy speaks to the reader as "you") are intact.

### Sweep 2: Voice and Tone

**Focus:** Does the copy sound consistent throughout?

**What to check:**
- Shifts between formal and casual language
- Inconsistent brand personality (joking in one paragraph, corporate in the next)
- Jarring mood changes without transition
- Word choices that do not match the established voice
- Mixing "we" and "the company" references

**Voice consistency indicators:**

| Consistent | Inconsistent |
|-----------|-------------|
| Same level of contractions throughout | Contractions in some sections, full forms in others |
| Humor style maintained | Random joke in otherwise serious copy |
| Same sentence structure patterns | Short punchy intro, corporate middle, casual close |
| Consistent use of "you" | Switching between "you," "users," "customers," "one" |

**After this sweep:** Return to Sweep 1 to ensure voice edits did not introduce confusion.

### Sweep 3: So What

**Focus:** Does every claim answer "why should I care?"

**The So What test:** For every statement, ask "So what?" If the copy does not answer with a deeper benefit, it needs work.

| Before (features only) | After (feature + benefit) |
|------------------------|--------------------------|
| "Our platform uses AI-powered analytics" | "Our AI analytics surface insights you would miss manually — so you make better decisions in half the time" |
| "SOC 2 Type II certified" | "SOC 2 certified — your security team approves us in days, not months" |
| "Real-time dashboard" | "See exactly what is happening right now, not what happened last week" |

**After this sweep:** Return to Sweeps 2 and 1.

### Sweep 4: Prove It

**Focus:** Is every claim backed with evidence?

**Types of proof to verify:**

| Proof Type | Strength | Example |
|-----------|----------|---------|
| Named testimonial | Strong | "Sarah Chen, VP Marketing at Stripe: 'Reduced our setup time by 60%'" |
| Specific statistic | Strong | "2,847 teams use [Product] daily" |
| Case study reference | Strong | "See how Linear reduced churn by 23% in 90 days" |
| Third-party validation | Strong | "Named a Leader in Gartner's Magic Quadrant 2025" |
| Customer logos | Medium | Recognizable brand logos with permission |
| Generic claim | Weak — flag it | "Customers love us," "Industry-leading" |

**Common proof gaps to flag:**
- "Trusted by thousands" (which thousands? give a number)
- "Industry-leading" (according to whom? cite the source)
- "Best-in-class" (by what measure?)
- "Customers love us" (show them saying it)
- Results claims without timeframe or specifics

**After this sweep:** Return to Sweeps 3, 2, and 1.

### Sweep 5: Specificity

**Focus:** Is the copy concrete enough to be compelling?

**Specificity upgrades:**

| Vague | Specific |
|-------|---------|
| "Save time" | "Save 4 hours every week" |
| "Many customers" | "2,847 teams" |
| "Fast results" | "Results in 14 days" |
| "Improve your workflow" | "Cut reporting time from 4 hours to 15 minutes" |
| "Great support" | "Average response time: 2 hours" |
| "Easy to use" | "Set up in 10 minutes, no code required" |
| "Affordable" | "Starting at $29/month" |
| "Scalable" | "Handles 10,000 to 10 million records without slowdown" |

**Rule:** If a claim cannot be made specific, it is probably filler. Cut it or replace it with something verifiable.

**After this sweep:** Return to Sweeps 4, 3, 2, and 1.

### Sweep 6: Heightened Emotion

**Focus:** Does the copy make the reader feel something?

**Emotional dimensions to check:**

| Emotion | Where to Use | Technique |
|---------|-------------|-----------|
| Pain/frustration | Problem section | Paint the "before" state vividly |
| Relief | Solution section | Show the contrast with current pain |
| Fear of missing out | Social proof | "Teams like yours already use..." |
| Pride | Aspiration section | "Be the team that..." |
| Confidence | CTA area | "Join 2,847 teams who already..." |
| Urgency | Near CTA | Only if genuine (real deadline, limited spots) |

**Emotion techniques:**
- Paint the "before" state with sensory detail
- Use micro-stories (1-2 sentences) from customer scenarios
- Ask questions that prompt self-reflection
- Reference shared experiences the audience recognizes

**After this sweep:** Return to Sweeps 5, 4, 3, 2, and 1.

### Sweep 7: Zero Risk

**Focus:** Have we removed every barrier to action?

**Friction checklist near CTAs:**
- [ ] What happens after clicking is clear (not a mystery)
- [ ] Objections addressed within 2 scrolls of the CTA
- [ ] Trust signals visible (guarantee, certifications, customer count)
- [ ] Next steps are specific ("Start your 14-day free trial" not "Get started")
- [ ] Risk reversals stated explicitly (money-back, no CC, cancel anytime)
- [ ] Privacy concerns addressed if form collects data

**After this sweep:** Return through all previous sweeps one final time.

---

## Quick-Pass Editing Guide

### Word-Level Cuts

**Always cut:**
very, really, extremely, incredibly, quite, rather, somewhat, just, actually, basically, essentially, literally (unless literal), in order to (use "to"), the fact that, it should be noted that, it is important to

**Always replace:**

| Weak | Strong |
|------|--------|
| Utilize | Use |
| Implement | Set up, build, create |
| Leverage | Use, apply |
| Facilitate | Help, enable |
| Innovative | New, original, first-of-its-kind |
| Robust | Strong, thorough, [be specific] |
| Seamless | Smooth, easy, [be specific] |
| Cutting-edge | Modern, latest, [be specific] |
| Synergy | [Delete or be specific about the collaboration] |
| Paradigm | [Delete or say what actually changed] |

### Sentence-Level Checks

- One idea per sentence
- Vary sentence length (mix 8-word and 20-word sentences)
- Front-load important information (do not bury the point)
- Maximum 3 conjunctions per sentence
- Active voice default (flip passive constructions)

### Paragraph-Level Checks

- One topic per paragraph
- 2-4 sentences maximum for web copy
- Strong opening sentence that states the paragraph's point
- Logical flow between paragraphs
- White space for scannability

---

## Common Copy Problems and Fixes

| Problem | Symptom | Fix |
|---------|---------|-----|
| Wall of features | List of what it does, no why | Add "which means..." after each feature |
| Corporate speak | "Leverage synergies to optimize outcomes" | Ask "How would a human say this?" |
| Weak opening | Starts with company history or vague statement | Lead with reader's problem or desired outcome |
| Buried CTA | Ask comes after too much buildup | Make CTA obvious, early, and repeated |
| No proof | "Customers love us" with no evidence | Add specific testimonials, numbers, case references |
| Generic claims | "We help businesses grow" | Specify who, how, and by how much |
| Mixed audiences | Tries to speak to everyone | Pick one audience per page/section |
| Feature overload | Every capability listed | Focus on 3-5 benefits that matter most |
| Passive voice | "Reports are generated by the system" | "The system generates reports" |
| Weasel words | "Up to 50% improvement" | State the median or typical result with context |

---

## Style Consistency Standards

### Checklist for Style Consistency

- [ ] Oxford comma: used consistently (or consistently omitted)
- [ ] Contractions: consistent usage throughout
- [ ] Heading case: consistent (sentence case or title case, not mixed)
- [ ] Number style: consistent (spell out 1-9, numerals for 10+, or chosen standard)
- [ ] Date format: consistent (March 9, 2026 or 2026-03-09, not mixed)
- [ ] Brand name: capitalized and formatted consistently
- [ ] Product/feature names: capitalized consistently per brand standards
- [ ] Bulleted lists: consistent punctuation (periods or no periods)
- [ ] Acronyms: spelled out on first use in each document
- [ ] Em dashes, en dashes, hyphens: used correctly and consistently
- [ ] Quotation marks: consistent style (straight or curly)

### Common Style Conflicts

| Decision | Option A | Option B | How to Decide |
|----------|----------|----------|---------------|
| Oxford comma | Yes | No | Pick one, document it, enforce it |
| Heading capitalization | Sentence case | Title Case | Sentence case is modern standard |
| "Login" vs "Log in" | One word (noun) | Two words (verb) | "Log in" as verb, "Login" as noun/adjective |
| "Setup" vs "Set up" | One word (noun) | Two words (verb) | Same pattern as login |
| Ampersand vs "and" | & | and | "and" in prose, "&" only in headings if brand standard |

---

## Fact-Checking Protocol

### What to Verify

- [ ] All statistics have a named source and year
- [ ] Customer testimonials are attributed to real, named individuals
- [ ] Customer logos are used with permission
- [ ] Competitive claims are accurate and current
- [ ] Product capabilities described are actually available (not roadmap items)
- [ ] Pricing is current and matches the pricing page
- [ ] Certifications and compliance claims are active (SOC 2, GDPR, etc.)
- [ ] Awards and recognition are current year or specified year
- [ ] Integration claims list actual integrations, not aspirational ones
- [ ] Uptime/SLA claims match the actual SLA

### Red Flags to Investigate

- Round numbers without source (sounds made up)
- Superlatives without qualification ("fastest," "best," "only")
- Claims that contradict other pages on the same site
- Screenshots from an older version of the product
- Competitor comparisons without date (may be outdated)

---

## Editorial Checklist

### Pre-Edit

- [ ] Understand the goal of this copy
- [ ] Know the target audience
- [ ] Identify the desired action
- [ ] Read through once without editing

### During Edit (Seven Sweeps Summary)

- [ ] Sweep 1: Every sentence is immediately understandable
- [ ] Sweep 2: Voice is consistent throughout
- [ ] Sweep 3: Every feature connects to a benefit
- [ ] Sweep 4: Claims are substantiated with evidence
- [ ] Sweep 5: Vague words replaced with specifics
- [ ] Sweep 6: Copy evokes appropriate emotion
- [ ] Sweep 7: Barriers to action removed near CTAs

### Post-Edit

- [ ] No typos or grammatical errors
- [ ] Consistent formatting throughout
- [ ] Core message preserved through all edits
- [ ] All links functional (if applicable)
- [ ] Consistent style applied (see style checklist)

---

## Best Practices

1. **Edit in passes, not all at once** — Trying to fix everything in one read misses issues. Each sweep catches what the others miss.

2. **Preserve the author's voice** — Good copy editing enhances; it does not replace. Maintain the original voice while improving clarity and impact.

3. **Every edit needs a reason** — Never change a word without explaining the principle. "Changed because it is clearer" or "Replaced because the original was vague."

4. **Prioritize by conversion impact** — Fix the CTA before fixing a comma. Fix the headline before fixing paragraph 12.

5. **Read aloud** — Voice and rhythm problems become obvious when read aloud. If it sounds wrong spoken, it reads wrong too.

6. **Flag what you cannot fix** — If a claim needs proof the author must provide, flag it clearly. You can improve phrasing but you cannot invent evidence.

7. **Re-check previous sweeps** — Each sweep can introduce issues caught by earlier sweeps. Always go back.

8. **Cut first, add second** — Most marketing copy is 20-30% too long. Cut the fat before adding new content.

9. **Get context before editing** — A copy edit without knowing the audience, goal, and voice standard produces misaligned feedback.

10. **Track recurring issues** — If the same problems appear across multiple pieces, the issue is systemic. Flag it as a process improvement, not just an edit.

---

## Integration Points

- **Copywriting** — Use for writing new copy from scratch. Copy Editing handles reviewing and improving existing copy.
- **Content Humanizer** — Use when AI-generated copy needs humanization before editorial review.
- **Content Production** — Use Copy Editing as part of the production pipeline between drafting and publishing.
- **Brand Guidelines** — Reference brand voice and style standards during the Voice and Tone sweep.
- **Marketing Psychology** — Apply psychological principles during the Heightened Emotion sweep.
- **Content Strategy** — Use when the problem is what to say, not how to say it.

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Same issues appear across multiple pieces from the same writer | Systemic writing habit, not a one-off error | Create a writer-specific checklist of recurring issues; address in style guide or training, not just per-piece edits |
| Copy loses its original voice after editing | Editor over-corrected; replaced author voice with editor's style | Preserve author voice — enhance clarity and impact without rewriting personality. Read original aloud before editing |
| Edits introduce new inconsistencies | Previous sweeps not re-checked after later sweeps modified content | Always re-run earlier sweeps after making changes — Sweep 7 edits can break Sweep 1 clarity |
| CTA buried or ineffective despite multiple edit passes | CTA was not the focus of any sweep — copy editing focused on prose quality | Prioritize CTA area first (Sweep 7: Zero Risk) before polishing earlier sections |
| Fact-checking reveals unverifiable claims | Writer invented statistics or used outdated data | Flag and return to writer — editor cannot invent evidence. Document all unverifiable claims explicitly |
| Style inconsistencies between sections | Multiple writers contributed or copy was assembled from different drafts | Run style consistency checklist end-to-end; standardize contractions, heading case, number format, and punctuation |

---

## Success Criteria

- **Seven Sweeps completion**: All 7 sweeps completed per piece with previous sweeps re-verified after each pass
- **Error rate**: Zero grammatical errors, typos, or broken links in published copy
- **Style consistency**: 100% adherence to documented style guide (Oxford comma, heading case, number format, etc.)
- **Fact verification**: All statistics have named source and year; all claims are verifiable or labeled as opinion
- **CTA effectiveness**: Every piece has a clear, specific CTA visible within 2 scrolls of the content end
- **Clarity score**: Every sentence understandable on first read — zero ambiguous pronoun references or multi-clause confusion
- **Edit turnaround**: 48-hour maximum turnaround on editorial review with clear change documentation

---

## Scope & Limitations

**In scope:**
- Seven Sweeps editorial framework (clarity, voice, so-what, proof, specificity, emotion, zero-risk)
- Quick-pass editing (word-level, sentence-level, paragraph-level)
- Style consistency auditing and enforcement
- Fact-checking protocol for claims, statistics, and competitive references
- Pre-edit and post-edit checklists
- Common copy problem diagnosis and fixing

**Out of scope:**
- Writing new copy from scratch (use Copywriting skill)
- AI content detection and humanization (use Content Humanizer)
- SEO optimization passes (use Content Production optimization pipeline)
- Content strategy or topic selection (use Content Strategy)
- Visual design or layout feedback
- Legal review of marketing claims

**Known limitations:**
- Cannot verify internal company claims (product capabilities, uptime SLAs) without access to product documentation
- Fact-checking external claims requires access to original sources — may need writer input
- Style consistency requires an existing style guide; without one, editor must make judgment calls
- Emotional impact (Sweep 6) is subjective and varies by audience — use target audience context
- Multi-language copy editing requires native-level proficiency in each language

---

## Scripts

```bash
# Score content readability with detailed metrics
python scripts/readability_scorer.py article.md --json

# Detect AI patterns that need humanization before editing
python scripts/ai_pattern_detector.py article.md --verbose

# Check style consistency across multiple documents
python scripts/style_checker.py --files doc1.md doc2.md doc3.md --json
```

---

## copywriting

Source path: `references/marketing/copywriting/SKILL.md`

# Copywriting

Conversion-focused marketing copy that is clear, compelling, and drives action across every page type.

---

## Table of Contents

- [Keywords](#keywords)
- [Quick Start](#quick-start)
- [Core Principles](#core-principles)
- [Copywriting Frameworks](#copywriting-frameworks)
- [Page Structure by Type](#page-structure-by-type)
- [Headline Formula Library](#headline-formula-library)
- [CTA Framework](#cta-framework)
- [Objection Handling in Copy](#objection-handling-in-copy)
- [Voice and Tone Calibration](#voice-and-tone-calibration)
- [Best Practices](#best-practices)
- [Integration Points](#integration-points)

---

## Keywords

copywriting, marketing copy, conversion copy, headline writing, CTA copy, landing page copy, homepage copy, pricing page copy, feature page copy, persuasive writing, value proposition, benefit-driven copy, sales copy, page copy, web copy, product copy, SaaS copy, PAS framework, AIDA framework, BAB framework, objection handling

---

## Clarify First

Before writing the copy, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Page type** — homepage, landing, pricing, feature, or product page (selects the page structure template)
- [ ] **Desired action / CTA goal** — the single action the page drives (write the CTA first; everything leads to it)
- [ ] **Target audience & awareness level** — who they are and what they know (selects the framework PAS/AIDA/BAB and CTA friction)
- [ ] **Core value prop / differentiator** — the one benefit to lead with (drives the headline and hero)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

### Write Page Copy

1. Define the page purpose, target audience, and desired action
2. Select the appropriate page structure template
3. Write the headline using a formula from the library (generate 5 options)
4. Write each section following the structure framework
5. Add social proof, objection handling, and CTA
6. Review against the quality checklist

### Improve Existing Copy

1. Identify the page goal and target audience
2. Audit headline for specificity and benefit clarity
3. Check every feature for a corresponding benefit ("which means...")
4. Verify social proof is specific and attributed
5. Evaluate CTA for action orientation and friction level
6. Test: Would a first-time visitor understand the value in 5 seconds?

---

## Core Principles

### 1. Clarity Over Cleverness

If you have to choose between clear and creative, choose clear. A confused reader does not convert.

### 2. Benefits Over Features

Features describe what it does. Benefits describe what it means for the customer.

| Feature | Benefit |
|---------|---------|
| "Real-time analytics dashboard" | "See exactly what's working right now — no waiting for reports" |
| "AI-powered recommendations" | "Get suggestions that actually match your data, not generic advice" |
| "99.99% uptime SLA" | "Your customers never see a down page" |
| "SOC 2 Type II certified" | "Pass your enterprise security review without the 6-month scramble" |

### 3. Specificity Over Vagueness

- Vague: "Save time on your workflow"
- Specific: "Cut your weekly reporting from 4 hours to 15 minutes"
- Vague: "Trusted by thousands"
- Specific: "Used by 2,847 teams including Stripe, Notion, and Linear"

### 4. Customer Language Over Company Language

Mirror the words your customers use. Pull language from reviews, support tickets, sales calls, and interviews.

### 5. One Idea Per Section

Each section advances one argument. Build a logical flow down the page: problem > solution > proof > action.

### 6. Honest Over Sensational

Never fabricate statistics, testimonials, or claims. Exaggeration erodes trust. Specificity and honesty convert better than hype.

---

## Copywriting Frameworks

### PAS: Problem > Agitate > Solution

Best for: landing pages, email subject lines, ad copy, product pages

```
[Problem]: Name the pain in the reader's language
[Agitate]: Show what happens if they don't fix it
[Solution]: Introduce your product as the answer
```

Example:
> Your team spends 4 hours every week manually compiling reports. That is 200 hours a year — the equivalent of losing a full-time employee to spreadsheets. [Product] automates your reporting in 10 minutes. Set it once, get reports delivered every Monday morning.

### AIDA: Attention > Interest > Desire > Action

Best for: homepage, awareness campaigns, long-form sales pages

```
[Attention]: Bold statement or surprising claim
[Interest]: Expand with relevant details
[Desire]: Show proof and paint the transformation
[Action]: Clear CTA
```

### BAB: Before > After > Bridge

Best for: case studies, testimonial framing, email sequences

```
[Before]: Current painful state
[After]: Desired future state
[Bridge]: How your product gets them there
```

### 4 Ps: Promise > Picture > Proof > Push

Best for: sales pages, feature pages, product launches

```
[Promise]: State the key benefit
[Picture]: Help them visualize the outcome
[Proof]: Show evidence it works
[Push]: Call to action with urgency
```

### QUEST: Qualify > Understand > Educate > Stimulate > Transition

Best for: long-form content, webinar scripts, nurture sequences

```
[Qualify]: Identify the right audience
[Understand]: Show you get their problem
[Educate]: Teach them something valuable
[Stimulate]: Create excitement about the solution
[Transition]: Move to the ask
```

---

## Page Structure by Type

### Homepage Structure

The homepage serves multiple audiences. Lead with the broadest value proposition.

| Section | Purpose | Guidelines |
|---------|---------|------------|
| Hero | Communicate core value in 5 seconds | Headline + subheadline + primary CTA + visual |
| Social proof bar | Build instant credibility | Customer logos, review scores, or customer count |
| Problem statement | Show you understand their pain | 2-3 pain points in their language |
| Solution overview | Present your answer (3-5 key benefits) | Benefit-first, not feature-first |
| How it works | Reduce perceived complexity | 3-4 steps maximum |
| Use cases | Help different audiences see themselves | 2-3 use case tabs or sections |
| Testimonials | Proof from real customers | Named, specific, with measurable outcomes |
| Objection handling | Remove barriers | FAQ or guarantee section |
| Final CTA | Repeat the ask | Recap value + CTA + risk reversal |

### Landing Page Structure

Single message, single CTA. Everything on the page serves one conversion goal.

| Section | Purpose | Guidelines |
|---------|---------|------------|
| Hero | Match headline to traffic source | Exact message match with ad or email |
| Value proposition | One clear benefit | Subheadline expands on headline |
| Problem / Pain | Why they need this now | 2-3 bullet points of pain |
| Solution | What they get | Feature > Benefit mapping |
| Social proof | Relevant proof | Testimonial from similar customer |
| CTA | The one ask | Action verb + what they get |
| Risk reversal | Remove hesitation | Guarantee, no CC, cancel anytime |

### Pricing Page Structure

Help visitors choose the right plan. Reduce comparison anxiety.

| Section | Purpose | Guidelines |
|---------|---------|------------|
| Value summary | Remind them why before asking for money | One line connecting price to value |
| Plan comparison | Help them choose | 2-4 tiers, recommended plan highlighted |
| Feature matrix | Detailed comparison | Checkmarks with tooltips for complex features |
| FAQ | Address pricing objections | "Can I switch plans?", "What happens after trial?" |
| Social proof | Proof near the buy button | Testimonial or customer count |
| Enterprise CTA | Catch high-value prospects | "Need custom pricing? Talk to us" |

### Feature Page Structure

Connect every feature to a business outcome.

| Section | Purpose | Guidelines |
|---------|---------|------------|
| Feature hero | What it does + why it matters | Headline = outcome, subheadline = mechanism |
| Visual demo | Show it in action | Screenshot, GIF, or video |
| Benefits | Why this feature matters | 3-4 benefits with "which means..." bridges |
| Use case | Concrete scenario | "When [situation], you can [action] to [outcome]" |
| Technical details | For evaluators | Expandable section for technical specs |
| Related features | Cross-sell | Links to complementary features |
| CTA | Drive trial or demo | "Try [feature] free" or "See it in action" |

---

## Headline Formula Library

### Outcome-First Formulas

```
[Achieve outcome] without [pain point]
```
- "Build landing pages in minutes without writing code"
- "Hire senior engineers without the 4-month wait"

```
[Achieve outcome] in [timeframe]
```
- "Get your first 1,000 customers in 90 days"
- "Set up analytics tracking in under 10 minutes"

### Problem-First Formulas

```
Stop [pain point]. Start [desired state].
```
- "Stop guessing what's working. Start knowing."
- "Stop chasing approvals. Start shipping."

```
[Pain point] is costing you [specific cost]
```
- "Manual reporting is costing you 200 hours per year"
- "Slow page loads are costing you 23% of mobile visitors"

### Category-Definition Formulas

```
The [category] for [specific audience]
```
- "The analytics platform for product teams"
- "The CRM for founders who hate CRMs"

```
[Category], but [key differentiator]
```
- "Project management, but built for remote teams"
- "Email marketing, but with deliverability built in"

### Social Proof Formulas

```
[Number] [people/companies] [outcome]
```
- "2,847 teams ship faster with [Product]"
- "Join 40,000 marketers who read this newsletter"

```
[Specific customer] [specific result] with [Product]
```
- "How Stripe reduced onboarding time by 60% with [Product]"

### Question Formulas

```
[Question that highlights pain]?
```
- "Still spending your Sunday nights on reporting?"
- "What if your analytics actually told you what to do next?"

### Generating Headline Options

For every page, generate minimum 5 headline options across different formula types:
1. One outcome-first headline
2. One problem-first headline
3. One category-definition headline
4. One social proof headline
5. One question or bold claim headline

Select the strongest. Test the top 2-3 if possible.

---

## CTA Framework

### CTA Formula

```
[Action Verb] + [What They Get] + [Qualifier if needed]
```

### CTA Strength Spectrum

| Weak (avoid) | Moderate | Strong (use) |
|-------------|----------|-------------|
| Submit | Sign Up | Start My Free Trial |
| Click Here | Get Started | Get the Complete Checklist |
| Learn More | Try Free | See [Product] in Action |
| Contact Us | Book a Demo | Create My First [Thing] |
| Send | Download | Get My Free Analysis |

### CTA Friction Calibration

Match CTA friction to visitor readiness:

| Visitor State | CTA Friction Level | Examples |
|-------------|-------------------|---------|
| Cold (first visit) | Very low | "See how it works," "Watch 2-min demo" |
| Warm (return visit) | Low | "Start free trial," "Try it free" |
| Hot (pricing page) | Medium | "Start my plan," "Get started today" |
| Returning (abandoned) | Low + urgency | "Pick up where you left off" |

### Supporting CTA Copy

Below the CTA button, reduce friction:
- "No credit card required"
- "Free for 14 days, cancel anytime"
- "Takes 2 minutes to set up"
- "Join 2,847 teams already using [Product]"

---

## Objection Handling in Copy

### Common Objections and Copy Responses

| Objection | Where to Address | Copy Approach |
|-----------|-----------------|---------------|
| "Too expensive" | Pricing page, FAQ | ROI framing: "Saves X hours/week at $Y/hour = $Z saved" |
| "Not sure it works" | Social proof sections | Named testimonials with specific metrics |
| "Too complex to set up" | How it works section | "3 steps, 10 minutes, no code required" |
| "What if I don't like it?" | Near CTA | Guarantee: "30-day money-back, no questions asked" |
| "I need to check with my team" | Near CTA | "Share a free trial with your team" |
| "Is it secure?" | Trust section or footer | Certifications: "SOC 2, GDPR, ISO 27001" |
| "Will it integrate?" | Feature or FAQ section | "Connects with 200+ tools including [key ones]" |

### Risk Reversal Techniques

Position risk reversals near CTAs:
- Money-back guarantee with specific timeframe
- Free trial (no credit card)
- "Cancel anytime" commitment
- Success guarantee ("If you don't see X result in Y days...")
- "Keep the content/data even if you cancel"

---

## Voice and Tone Calibration

### Formality Spectrum

| Level | When | Example |
|-------|------|---------|
| Casual | Consumer, community, social | "Let's make your reporting suck less." |
| Conversational | SaaS, mid-market, blog | "Your weekly reports shouldn't take 4 hours." |
| Professional | B2B, enterprise, sales | "Reduce reporting overhead by 80% with automated dashboards." |
| Formal | Legal, healthcare, finance | "Our platform ensures compliance with regulatory reporting requirements." |

### Personality Calibration

| Bold | Understated |
|------|------------|
| "We built the fastest analytics platform. Period." | "Our analytics platform is designed for speed." |
| Strong opinions, definitive statements | Measured claims, qualified statements |
| Best for: Startups, challenger brands | Best for: Enterprise, regulated industries |

### Consistency Rules

- Headlines can be bolder than body copy
- Body copy should be clearer than clever
- CTAs should be action-oriented regardless of formality
- Maintain the same personality throughout the entire page
- Adjust intensity, not identity, between sections

---

## Best Practices

1. **Write the CTA first** — Know what action you want before writing anything else. Every sentence leads to that action.

2. **Lead with "you," not "we"** — Count how many sentences start with "We" or your brand name. Rewrite to lead with the customer.

3. **Cut 30% on the second pass** — First drafts are always too long. The second pass should cut ruthlessly.

4. **Show, don't tell** — "Fast" means nothing. "Page loads in 200ms" means something. Replace every adjective with evidence.

5. **One argument per scroll** — Each scroll depth should advance exactly one argument. Problem, then solution, then proof, then action.

6. **Match headline to traffic source** — A landing page headline must mirror the ad, email, or link that brought the visitor. Mismatched expectations cause bounce.

7. **Social proof near CTAs** — Place testimonials and trust signals near every CTA. Proof reduces friction at the moment of decision.

8. **Provide alternatives, not just options** — "Start free trial" + "Book a demo" + "See pricing" gives three paths for three readiness levels.

9. **Read it aloud** — If it sounds like a brochure, rewrite it. If it sounds like a person explaining the product to a friend, it is close.

10. **Test headlines relentlessly** — The headline is the highest-leverage element on any page. A/B test the top 2-3 options.

---

## Integration Points

- **Copy Editing** — Use after drafting to systematically polish through the seven sweeps (clarity, voice, so what, prove it, specificity, emotion, risk).
- **Content Strategy** — Use for deciding what pages to create. Copywriting handles the writing.
- **Landing Page Generator** — Use for generating the code/design. Copywriting handles the words.
- **Marketing Psychology** — Use psychological principles (anchoring, social proof, loss aversion) to strengthen copy.
- **Brand Guidelines** — Reference brand voice and visual standards for consistency.
- **Ad Creative** — Use for platform-specific ad copy. Copywriting handles page-level copy.
- **Content Humanizer** — Use if AI-drafted copy sounds robotic and needs voice injection.

---

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Page not converting despite traffic | Headline-to-traffic mismatch or weak CTA | Verify headline matches the ad/email source. Run `headline_scorer.py`. |
| Visitors bounce without scrolling | Hero section fails the 5-second test | Rewrite headline: benefit + specificity. Remove jargon. |
| High scroll depth but no clicks | CTA is weak, buried, or too many options | Run `cta_optimizer.py`. Place CTA above fold and after every major section. |
| Copy sounds like a brochure | Too company-focused, not customer-focused | Run `page_copy_auditor.py`. Ensure you/your outnumbers we/our 2:1. |
| Features listed without impact | Missing "which means..." bridges | Connect every feature to a business outcome the reader cares about. |
| Social proof feels generic | "Great product!" without specifics | Replace with named testimonials + specific metrics + outcomes. |
| Pricing page has high drop-off | No objection handling or risk reversal | Add FAQ, guarantees, and "no credit card required" near CTA. |

---

## Success Criteria

- Every headline passes the 5-second test: visitor understands value without scrolling
- You/your language outnumbers we/our by at least 2:1 across the page
- Every feature has a corresponding benefit with "which means..." bridge
- CTA appears 2-3 times on every page (hero, mid-page, footer)
- Risk reversal text appears near every CTA ("No credit card," "Cancel anytime")
- Specific numbers used instead of vague claims ("2,847 teams" not "thousands")
- A/B test running on headline at all times for top-traffic pages

---

## Scope & Limitations

**In Scope:** Marketing page copy for homepages, landing pages, pricing pages, feature pages, and product pages. Headline formulas, CTA frameworks, objection handling, voice calibration.

**Out of Scope:** Ad copy (use ad-creative), email copy (use email-sequence), blog/content writing (use content-creator), page design/code (use landing-page-generator), copy editing (use copy-editing).

---

## Python Automation Tools

### 1. Headline Scorer (`scripts/headline_scorer.py`)
Scores marketing headlines for clarity, benefit strength, specificity, and conversion potential.

```bash
python scripts/headline_scorer.py "Build landing pages in minutes without writing code"
python scripts/headline_scorer.py --file headlines.txt --json
```

### 2. CTA Optimizer (`scripts/cta_optimizer.py`)
Analyzes and scores CTA text for action strength, specificity, ownership language, and friction level.

```bash
python scripts/cta_optimizer.py "Start my free trial"
python scripts/cta_optimizer.py --file ctas.txt --json
```

### 3. Page Copy Auditor (`scripts/page_copy_auditor.py`)
Audits marketing page copy for customer focus, specificity, social proof, CTA presence, objection handling, and readability.

```bash
python scripts/page_copy_auditor.py page.txt
python scripts/page_copy_auditor.py page.html --json
```

---

## email-sequence

Source path: `references/marketing/email-sequence/SKILL.md`

# Email Sequence Design

**Category:** Marketing
**Tags:** email sequences, drip campaigns, nurture flows, onboarding emails, lifecycle marketing, automation

## Overview

Email Sequence Design creates complete, ready-to-implement email automation flows. Every output includes subject lines, preview text, full body copy, CTAs, send timing, and exit conditions. The goal is sequences that nurture relationships and drive specific conversion actions -- not just "stay top of mind" email noise.

This skill writes the sequences. For email HTML templates and rendering infrastructure, use email-template-builder. For tracking email performance, use analytics-tracking.

---

## Sequence Types

| Type | Trigger | Goal | Typical Length |
|------|---------|------|---------------|
| Welcome/Onboarding | New signup | Activate user, show core value | 5-7 emails over 14 days |
| Trial Expiration | Trial nearing end | Convert to paid | 4-5 emails over 7 days |
| Lead Nurture | Content download, webinar | Qualify and convert | 6-8 emails over 30 days |
| Re-engagement | Inactive 30+ days | Bring back or clean list | 3-4 emails over 14 days |
| Post-Purchase | Subscription start | Reduce churn, expand | 4-6 emails over 30 days |
| Event-Based | Specific user action | Drive next action | 2-3 emails over 7 days |
| Sales (Warm) | MQL or PQL signal | Book meeting or start trial | 4-5 emails over 14 days |

---

## Clarify First

Before designing the sequence, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Sequence type & trigger** — welcome, trial expiration, nurture, re-engagement, sales (selects the blueprint, length, and cadence)
- [ ] **Primary conversion goal** — the single action the sequence drives (sets every email's CTA and the emotional journey)
- [ ] **Audience & product context** — SaaS/B2B persona and awareness level (drives copy, benchmarks, and segmentation)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Design Process

### Step 1: Define Sequence Architecture

Before writing any email, define the architecture:

```
Sequence Name:     [Name]
Trigger:           [What starts the sequence]
Primary Goal:      [Single conversion action]
Secondary Goals:   [Relationship building, data collection]
Length:            [Number of emails]
Duration:          [Total time span]
Exit Conditions:   [When they leave the sequence]
Suppression:       [Other sequences to suppress while active]
```

### Step 2: Map the Emotional Journey

Each email serves a purpose in a progression:

| Email | Emotional State | Purpose | Key Message |
|-------|----------------|---------|-------------|
| 1 | Curious, uncertain | Welcome, set expectations | "Here's what to expect" |
| 2 | Exploring, evaluating | Demonstrate core value | "Here's the one thing to try first" |
| 3 | Engaged or dropping off | Social proof | "Here's how others succeeded" |
| 4 | Considering commitment | Remove objections | "Common concerns addressed" |
| 5 | Ready to decide | Create urgency | "Your trial ends in X days" |

### Step 3: Write Each Email

For every email in the sequence, deliver:

```
Email [#]: [Name/Purpose]
Send:     [Timing from trigger or previous email]
Segment:  [Conditions -- who receives this variant]

Subject:  [Subject line - under 50 characters]
Preview:  [Preview text - 80-120 characters, complements subject]

Body:
[Complete copy -- not an outline, not bullets, the actual words]

CTA:      [Button text] → [Destination URL]
P.S.:     [Optional -- works for urgency or human touch]
```

### Step 4: Define Branching Logic

Not everyone follows the same path. Define branches:

```
After Email 2:
  IF user activated core feature → Skip to Email 4 (post-activation)
  IF user has not logged in → Send Email 2B (re-engagement variant)
  IF user unsubscribed → Exit sequence

After Email 4:
  IF user converted → Exit sequence, enter post-purchase sequence
  IF user visited pricing 2+ times → Send Email 4B (pricing objection handler)
  ELSE → Continue to Email 5
```

---

## Sequence Blueprints

### Blueprint: SaaS Welcome/Onboarding (7 emails, 14 days)

| Email | Day | Subject | Purpose |
|-------|-----|---------|---------|
| 1 | 0 (immediate) | Welcome to [Product] -- start here | Set expectations, one CTA to activate |
| 2 | 1 | The one feature that changes everything | Drive to core value action |
| 3 | 3 | How [Company] got [Result] in [Timeframe] | Social proof, case study |
| 4 | 5 | Quick question | Check engagement, offer help |
| 5 | 7 | 3 things you might have missed | Feature discovery, breadth |
| 6 | 10 | Your trial is halfway done | Progress report, urgency |
| 7 | 13 | Last day of your trial | Convert or lose access |

**Exit conditions:** User converts to paid at any point, user unsubscribes, user explicitly requests removal.

**Branching:**
- After Email 2: If user completed core action, skip Email 3, go to Email 4
- After Email 4: If user has not logged in for 5+ days, switch to re-engagement variant
- After Email 6: If user visited pricing page, send pricing-focused Email 7 variant

### Blueprint: Lead Nurture (6 emails, 30 days)

| Email | Day | Subject | Purpose |
|-------|-----|---------|---------|
| 1 | 0 | Your [resource name] is ready | Deliver promised content |
| 2 | 3 | The mistake most [role] make with [topic] | Educational, establish authority |
| 3 | 7 | [Company] went from [problem] to [result] | Case study, social proof |
| 4 | 14 | The [topic] framework we use internally | Exclusive value, reciprocity |
| 5 | 21 | Quick question about [their challenge] | Personal, segmentation |
| 6 | 28 | See if [Product] is right for you | Soft CTA, demo or trial |

**Exit conditions:** Books demo, starts trial, unsubscribes, or completes sequence.

### Blueprint: Re-engagement (4 emails, 14 days)

| Email | Day | Subject | Purpose |
|-------|-----|---------|---------|
| 1 | 0 | We noticed you've been away | Acknowledge absence, show value |
| 2 | 3 | Here's what you missed | Product updates, new features |
| 3 | 7 | [Exclusive offer or incentive] | Incentivize return |
| 4 | 14 | Should we stop emailing you? | Clean list, last chance |

**Critical rule:** If no engagement after Email 4, remove from active email list. Sending to unengaged contacts damages sender reputation.

### Blueprint: Trial Expiration (5 emails, 7 days)

| Email | Day Before Expiry | Subject | Purpose |
|-------|-------------------|---------|---------|
| 1 | 7 | Your trial ends in one week | Awareness, usage summary |
| 2 | 3 | Here's what you'll lose access to | Loss aversion, feature list |
| 3 | 1 | Tomorrow is your last day | Urgency, simple CTA |
| 4 | 0 | Your trial just ended | Conversion, offer extension option |
| 5 | +3 | We saved your data for 30 days | Last chance, data retention |

---

## Subject Line Framework

### Formulas That Work

| Formula | Example | Why It Works |
|---------|---------|-------------|
| How [company] [achieved result] | "How Stripe reduced churn 23%" | Specific, curiosity, social proof |
| The [number] [thing] [audience] [needs] | "The 3 metrics every PM tracks" | Specific, relevant, scannable |
| Quick question about [topic] | "Quick question about your trial" | Personal, non-threatening |
| [Name], [action-oriented statement] | "Sarah, your dashboard is ready" | Personal, action-oriented |
| Your [asset] is [status] | "Your free trial ends tomorrow" | Ownership, urgency |

### Subject Line Rules

1. Under 50 characters (mobile truncation happens at 35-45)
2. No ALL CAPS words
3. No excessive punctuation (!!!)
4. No spam trigger words in subject: free, guarantee, limited time, act now
5. Preview text must complement, not repeat, the subject
6. A/B test subject lines on every sequence (minimum 3 variants per email)

---

## Timing & Cadence

### Optimal Send Times (B2B SaaS)

| Day | Time Window | Notes |
|-----|-------------|-------|
| Tuesday | 9-11 AM recipient's timezone | Highest open rates |
| Wednesday | 9-11 AM | Second best |
| Thursday | 9-11 AM | Good for follow-ups |
| Monday | 10 AM-12 PM | After inbox clearing |
| Friday | Avoid for important emails | Low engagement |
| Weekend | Avoid for B2B | Exception: consumer products |

### Sequence Spacing Rules

- Welcome email: Immediate (within 5 minutes of trigger)
- Onboarding emails: Every 1-3 days (maintain momentum)
- Nurture emails: Every 3-7 days (avoid fatigue)
- Re-engagement: Every 3-5 days (test urgency vs respect)
- Trial expiration: Accelerating cadence (7 days, 3 days, 1 day, 0, +3)

---

## Metrics & Benchmarks

### Expected Performance by Sequence Type

| Metric | Welcome | Nurture | Re-engagement | Trial Expiration |
|--------|---------|---------|---------------|------------------|
| Open rate | 50-70% | 25-40% | 15-25% | 40-60% |
| Click rate | 10-20% | 3-8% | 2-5% | 8-15% |
| Conversion rate | 5-15% | 1-3% | 3-8% | 10-25% |
| Unsubscribe rate | <0.5% | <0.3% | 1-3% | <0.5% |

### Health Indicators

| Signal | Meaning | Action |
|--------|---------|--------|
| Open rate declining across sequence | Fatigue or irrelevance | Shorten sequence or improve subject lines |
| High opens, low clicks | Subject works, body/CTA doesn't | Rewrite body copy, simplify CTA |
| High click rate, low conversion | Landing page problem | Audit post-click experience |
| Rising unsubscribes after Email 3 | Too frequent or too salesy | Increase spacing, add more value |
| Email 1 open rate below 40% | Deliverability issue | Check sender reputation, authentication |

---

## Segmentation Strategy

### Behavioral Segments

| Segment | Definition | Sequence Adjustment |
|---------|-----------|-------------------|
| Power users | Used core feature 5+ times | Skip beginner content, focus on advanced features |
| Window shoppers | Signed up, never activated | More hand-holding, simpler first steps |
| Pricing page visitors | Viewed pricing 2+ times | Address pricing objections directly |
| Feature explorers | Used 3+ features | Highlight integration and workflow value |
| Ghost users | No login in 7+ days | Re-engagement sequence |

### Personalization Tiers

| Tier | Effort | Impact | Example |
|------|--------|--------|---------|
| 1: Name + company | Low | Moderate | "Hi Sarah, how's the Acme team finding..." |
| 2: Behavioral | Medium | High | "Since you set up your first project..." |
| 3: Segment-specific copy | High | Highest | Entirely different email body per segment |

---

## Implementation Checklist

- [ ] Sequence architecture documented (trigger, goal, length, exits)
- [ ] All emails written with subject, preview, body, CTA
- [ ] Branching logic defined for key decision points
- [ ] Subject line A/B variants created (minimum 3 per email)
- [ ] UTM parameters configured for all links
- [ ] Suppression rules set (no overlapping sequences)
- [ ] Unsubscribe handling confirmed (one-click, CAN-SPAM compliant)
- [ ] Plain text version created for each email
- [ ] Send time optimized for recipient timezone
- [ ] Metrics dashboard configured (opens, clicks, conversions, unsubs)
- [ ] 30-day post-launch review scheduled

---

## Proactive Triggers

- User mentions low trial-to-paid conversion: ask about trial expiration email sequence before recommending pricing changes
- User reports high open rates but low clicks: diagnose body copy and CTA before blaming subject lines
- User wants to "do email marketing": clarify sequence type before writing anything
- User has a product launch coming: recommend coordinating launch email sequence with in-app messaging
- User mentions list going cold: suggest re-engagement sequence before recommending acquisition spend

---

## Related Skills

| Skill | Use When |
|-------|----------|
| **email-template-builder** | Building HTML email templates and rendering infrastructure |
| **analytics-tracking** | Setting up email click tracking and UTM attribution |
| **launch-strategy** | Coordinating email sequences around product launches |
| **content-creator** | Writing landing page copy that email CTAs point to |
| **ab-test-setup** | Designing statistically valid email A/B tests |

---

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Welcome email open rate below 40% | Deliverability issue or weak subject line | Check sender reputation and SPF/DKIM/DMARC. Test subject variants. |
| Open rates declining across sequence | Fatigue or irrelevance | Shorten sequence, improve subject lines, or add more value per email. |
| High opens, low clicks | Body copy or CTA is weak | Rewrite body with stronger benefit and simplify CTA to one action. |
| High click rate, low conversion | Landing page problem | Audit post-click experience: message match, page speed, form friction. |
| Rising unsubscribes after email 3 | Too frequent or too salesy | Increase spacing between emails and add more educational content. |
| Emails clipped by Gmail | HTML template over 102KB | Use `render_size_analyzer.py` from email-template-builder to reduce size. |
| Sequence not triggering | Automation platform misconfiguration | Verify trigger events, check suppression rules for conflicts. |

---

## Success Criteria

- Welcome sequence open rate above 50% (benchmark: 50-70%)
- Nurture sequence click-through rate above 3% (benchmark: 3-8%)
- Trial expiration conversion rate above 10% (benchmark: 10-25%)
- Unsubscribe rate below 0.5% per email (below 0.3% for nurture)
- Every email has 3+ subject line A/B variants tested
- Branching logic covers at least 2 behavioral segments per sequence
- Sequence-level conversion rate (total conversions / initial sends) above 5%

---

## Scope & Limitations

**In Scope:** Lifecycle email sequence design, copy, timing, branching logic, segmentation, and performance optimization for SaaS/B2B.

**Out of Scope:** Email HTML rendering (use email-template-builder), cold outreach sequences (use cold-email), marketing automation platform setup, transactional email infrastructure.

**Limitations:** Benchmarks are SaaS/B2B focused. Adjust thresholds for e-commerce, consumer, or other verticals.

---

## Python Automation Tools

### 1. Subject Line Scorer (`scripts/subject_line_scorer.py`)
Scores sequence email subject lines for open-rate potential and auto-detects sequence type (welcome, trial, nurture, re-engagement).

```bash
python scripts/subject_line_scorer.py "Your trial ends tomorrow"
python scripts/subject_line_scorer.py --file subjects.txt --json
```

### 2. Sequence Mapper (`scripts/sequence_mapper.py`)
Generates a visual sequence map with timing, branching logic, and exit conditions from a sequence definition.

```bash
python scripts/sequence_mapper.py sequence_def.json
python scripts/sequence_mapper.py --sample --json
```

### 3. Performance Analyzer (`scripts/performance_analyzer.py`)
Analyzes email sequence metrics against benchmarks, identifies bottlenecks, and recommends optimizations.

```bash
python scripts/performance_analyzer.py metrics.json
python scripts/performance_analyzer.py --sample --json
```

---

## email-template-builder

Source path: `references/marketing/email-template-builder/SKILL.md`

# Email Template Builder

**Tier:** POWERFUL
**Category:** Engineering / Marketing
**Tags:** email templates, React Email, MJML, responsive email, deliverability, transactional email, dark mode

## Overview

Build complete transactional email systems: component-based templates with React Email or MJML, multi-provider sending abstraction, local preview with hot reload, i18n support, dark mode, spam optimization, and UTM tracking. Outputs production-ready code for any major email provider.

This skill builds the email rendering and sending infrastructure. For writing email copy and designing sequences, use email-sequence.

---

## Clarify First

Before building the templates, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Framework** — React Email or MJML, and whether the team uses React/TypeScript (decides the entire codebase; see the decision table below)
- [ ] **Templates needed** — welcome, password reset, invoice, trial-expiring, digest, team-invite, etc. (determines which template files to scaffold)
- [ ] **Sending provider** — Resend, SendGrid, Postmark, or SES (selects which provider adapter to build)
- [ ] **Locales & dark mode** — required languages and dark-mode support (drives the i18n system and base-layout styles)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Architecture Decision: React Email vs MJML

| Factor | React Email | MJML |
|--------|-----------|------|
| **Component reuse** | Full React component model | Partial (mj-attributes) |
| **TypeScript** | Native | Requires build step |
| **Preview server** | Built-in (`email dev`) | Requires separate setup |
| **Email client compatibility** | Good (renders to tables) | Excellent (battle-tested) |
| **Dark mode** | CSS media queries | CSS media queries |
| **Learning curve** | Low (if you know React) | Low (HTML-like syntax) |
| **Best for** | Teams already using React | Maximum email client compat |

**Recommendation:** React Email for TypeScript teams shipping SaaS. MJML for marketing teams needing maximum compatibility across Outlook, Gmail, Apple Mail, and legacy clients.

---

## Project Structure

```
emails/
├── components/
│   ├── layout/
│   │   ├── base-layout.tsx          # Shared wrapper: header, footer, styles
│   │   ├── button.tsx               # CTA button component
│   │   └── divider.tsx              # Styled horizontal rule
│   ├── blocks/
│   │   ├── hero.tsx                 # Hero section with heading + text
│   │   ├── feature-row.tsx          # Icon + text feature highlight
│   │   ├── testimonial.tsx          # Quote + attribution
│   │   └── pricing-table.tsx        # Plan comparison
├── templates/
│   ├── welcome.tsx                  # Welcome / confirm email
│   ├── password-reset.tsx           # Password reset link
│   ├── invoice.tsx                  # Payment receipt / invoice
│   ├── trial-expiring.tsx           # Trial expiration warning
│   ├── weekly-digest.tsx            # Activity summary
│   └── team-invite.tsx              # Team invitation
├── lib/
│   ├── send.ts                      # Unified send function
│   ├── providers/
│   │   ├── resend.ts                # Resend adapter
│   │   ├── sendgrid.ts              # SendGrid adapter
│   │   ├── postmark.ts              # Postmark adapter
│   │   └── ses.ts                   # AWS SES adapter
│   ├── tracking.ts                  # UTM parameter injection
│   └── render.ts                    # Template rendering
├── i18n/
│   ├── en.ts                        # English strings
│   ├── de.ts                        # German strings
│   └── types.ts                     # Typed translation keys
└── package.json
```

---

## Base Layout Component

```tsx
// emails/components/layout/base-layout.tsx
import {
  Body, Container, Head, Html, Img, Preview,
  Section, Text, Hr, Font
} from "@react-email/components";

interface BaseLayoutProps {
  preview: string;
  locale?: string;
  children: React.ReactNode;
}

export function BaseLayout({ preview, locale = "en", children }: BaseLayoutProps) {
  return (
    <Html lang={locale}>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <style>{`
          @media (prefers-color-scheme: dark) {
            .email-body { background-color: #111827 !important; }
            .email-container { background-color: #1f2937 !important; }
            .email-text { color: #e5e7eb !important; }
            .email-heading { color: #f9fafb !important; }
            .email-muted { color: #9ca3af !important; }
          }
          @media only screen and (max-width: 600px) {
            .email-container { width: 100% !important; padding: 16px !important; }
          }
        `}</style>
      </Head>
      <Preview>{preview}</Preview>
      <Body className="email-body" style={body}>
        <Container className="email-container" style={container}>
          <Section style={header}>
            <Img
              src={`${process.env.ASSET_URL}/logo.png`}
              width={120} height={36} alt="[Product]"
            />
          </Section>
          <Section style={content}>{children}</Section>
          <Hr className="email-muted" style={divider} />
          <Section style={footer}>
            <Text className="email-muted" style={footerText}>
              [Company] Inc. - [Address]
            </Text>
            <Text className="email-muted" style={footerText}>
              <a href="{{unsubscribe_url}}" style={link}>Unsubscribe</a>
              {" | "}
              <a href="{{preferences_url}}" style={link}>Email Preferences</a>
              {" | "}
              <a href="{{privacy_url}}" style={link}>Privacy Policy</a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles (inline for email client compatibility)
const body = { backgroundColor: "#f3f4f6", fontFamily: "Inter, Arial, sans-serif", margin: 0, padding: "40px 0" };
const container = { maxWidth: "600px", margin: "0 auto", backgroundColor: "#ffffff", borderRadius: "8px", overflow: "hidden" };
const header = { padding: "24px 32px", borderBottom: "1px solid #e5e7eb" };
const content = { padding: "32px" };
const divider = { borderColor: "#e5e7eb", margin: "0 32px" };
const footer = { padding: "24px 32px" };
const footerText = { fontSize: "12px", color: "#6b7280", textAlign: "center" as const, margin: "4px 0", lineHeight: "1.6" };
const link = { color: "#6b7280", textDecoration: "underline" };
```

---

## Template Examples

### Welcome Email

```tsx
// emails/templates/welcome.tsx
import { Button, Heading, Text } from "@react-email/components";
import { BaseLayout } from "../components/layout/base-layout";

interface WelcomeProps {
  name: string;
  confirmUrl: string;
  trialDays?: number;
}

export default function Welcome({ name, confirmUrl, trialDays = 14 }: WelcomeProps) {
  return (
    <BaseLayout preview={`Welcome, ${name}! Confirm your email to get started.`}>
      <Heading className="email-heading" style={h1}>
        Welcome to [Product], {name}
      </Heading>
      <Text className="email-text" style={text}>
        You have {trialDays} days to explore everything -- no credit card required.
        Confirm your email to activate your account:
      </Text>
      <Button href={confirmUrl} style={button}>
        Confirm Email Address
      </Button>
      <Text className="email-muted" style={muted}>
        Button not working? Paste this link in your browser:{" "}
        <a href={confirmUrl} style={linkStyle}>{confirmUrl}</a>
      </Text>
    </BaseLayout>
  );
}

const h1 = { fontSize: "24px", fontWeight: "700", color: "#111827", margin: "0 0 16px", lineHeight: "1.3" };
const text = { fontSize: "16px", lineHeight: "1.6", color: "#374151", margin: "0 0 24px" };
const button = { backgroundColor: "#4f46e5", color: "#ffffff", borderRadius: "6px", fontSize: "16px", fontWeight: "600", padding: "12px 24px", textDecoration: "none", display: "inline-block" };
const muted = { fontSize: "13px", color: "#6b7280", marginTop: "24px", lineHeight: "1.5" };
const linkStyle = { color: "#4f46e5", wordBreak: "break-all" as const };
```

### Invoice Email

```tsx
// emails/templates/invoice.tsx
import { Row, Column, Section, Heading, Text, Hr, Button } from "@react-email/components";
import { BaseLayout } from "../components/layout/base-layout";

interface LineItem { description: string; amount: number; }

interface InvoiceProps {
  name: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  items: LineItem[];
  total: number;
  currency?: string;
  downloadUrl: string;
}

export default function Invoice({
  name, invoiceNumber, date, dueDate, items,
  total, currency = "USD", downloadUrl,
}: InvoiceProps) {
  const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency });

  return (
    <BaseLayout preview={`Invoice ${invoiceNumber} -- ${fmt.format(total / 100)}`}>
      <Heading className="email-heading" style={h1}>
        Invoice #{invoiceNumber}
      </Heading>
      <Text className="email-text" style={text}>Hi {name},</Text>
      <Text className="email-text" style={text}>
        Here is your invoice. Thank you for your business.
      </Text>

      {/* Meta row */}
      <Section style={metaBox}>
        <Row>
          <Column>
            <Text style={metaLabel}>Invoice Date</Text>
            <Text style={metaValue}>{date}</Text>
          </Column>
          <Column>
            <Text style={metaLabel}>Due Date</Text>
            <Text style={metaValue}>{dueDate}</Text>
          </Column>
          <Column>
            <Text style={metaLabel}>Amount Due</Text>
            <Text style={metaValueBold}>{fmt.format(total / 100)}</Text>
          </Column>
        </Row>
      </Section>

      {/* Line items */}
      {items.map((item, i) => (
        <Row key={i} style={i % 2 === 0 ? rowEven : rowOdd}>
          <Column><Text style={cell}>{item.description}</Text></Column>
          <Column><Text style={cellRight}>{fmt.format(item.amount / 100)}</Text></Column>
        </Row>
      ))}
      <Hr style={divider} />
      <Row>
        <Column><Text style={totalLabel}>Total</Text></Column>
        <Column><Text style={totalValue}>{fmt.format(total / 100)}</Text></Column>
      </Row>

      <Button href={downloadUrl} style={button}>
        Download PDF
      </Button>
    </BaseLayout>
  );
}

const h1 = { fontSize: "24px", fontWeight: "700", color: "#111827", margin: "0 0 16px" };
const text = { fontSize: "15px", lineHeight: "1.6", color: "#374151", margin: "0 0 12px" };
const metaBox = { backgroundColor: "#f9fafb", borderRadius: "8px", padding: "16px", margin: "16px 0" };
const metaLabel = { fontSize: "11px", color: "#6b7280", fontWeight: "600", textTransform: "uppercase" as const, margin: "0 0 4px", letterSpacing: "0.05em" };
const metaValue = { fontSize: "14px", color: "#111827", margin: "0" };
const metaValueBold = { fontSize: "18px", fontWeight: "700", color: "#4f46e5", margin: "0" };
const rowEven = { backgroundColor: "#ffffff" };
const rowOdd = { backgroundColor: "#f9fafb" };
const cell = { fontSize: "14px", color: "#374151", padding: "10px 12px" };
const cellRight = { ...cell, textAlign: "right" as const };
const divider = { borderColor: "#e5e7eb", margin: "8px 0" };
const totalLabel = { fontSize: "16px", fontWeight: "700", color: "#111827", padding: "8px 12px" };
const totalValue = { ...totalLabel, textAlign: "right" as const };
const button = { backgroundColor: "#4f46e5", color: "#ffffff", borderRadius: "6px", padding: "12px 24px", fontSize: "15px", fontWeight: "600", textDecoration: "none", display: "inline-block", marginTop: "16px" };
```

---

## Multi-Provider Send Abstraction

```typescript
// emails/lib/send.ts
import { render } from "@react-email/render";

interface EmailPayload {
  to: string;
  subject: string;
  template: React.ReactElement;
  tags?: Record<string, string>;
}

interface EmailProvider {
  send(payload: { to: string; subject: string; html: string; text: string; tags?: Record<string, string> }): Promise<{ id: string }>;
}

// Provider factory
function getProvider(): EmailProvider {
  const provider = process.env.EMAIL_PROVIDER || "resend";
  switch (provider) {
    case "resend": return require("./providers/resend").default;
    case "sendgrid": return require("./providers/sendgrid").default;
    case "postmark": return require("./providers/postmark").default;
    case "ses": return require("./providers/ses").default;
    default: throw new Error(`Unknown email provider: ${provider}`);
  }
}

export async function sendEmail(payload: EmailPayload) {
  const html = addTracking(render(payload.template), { campaign: payload.tags?.type || "transactional" });
  const text = render(payload.template, { plainText: true });

  return getProvider().send({
    to: payload.to,
    subject: payload.subject,
    html,
    text,
    tags: payload.tags,
  });
}
```

---

## UTM Tracking Injection

```typescript
// emails/lib/tracking.ts
interface TrackingConfig {
  campaign: string;
  source?: string;
  medium?: string;
}

export function addTracking(html: string, config: TrackingConfig): string {
  const params = new URLSearchParams({
    utm_source: config.source || "email",
    utm_medium: config.medium || "transactional",
    utm_campaign: config.campaign,
  }).toString();

  // Add UTM to all internal links (skip unsubscribe and external)
  return html.replace(
    /href="(https?:\/\/(?:www\.)?yourdomain\.com[^"]*?)"/g,
    (match, url) => {
      const sep = url.includes("?") ? "&" : "?";
      return `href="${url}${sep}${params}"`;
    }
  );
}
```

---

## i18n System

```typescript
// emails/i18n/types.ts
export interface EmailStrings {
  welcome: {
    preview: (name: string) => string;
    heading: (name: string) => string;
    body: (days: number) => string;
    cta: string;
    fallbackLink: string;
  };
  invoice: {
    preview: (number: string, amount: string) => string;
    heading: (number: string) => string;
    greeting: (name: string) => string;
    downloadCta: string;
  };
  common: {
    unsubscribe: string;
    preferences: string;
    privacy: string;
  };
}

// emails/i18n/en.ts
import type { EmailStrings } from "./types";
export const en: EmailStrings = {
  welcome: {
    preview: (name) => `Welcome, ${name}! Confirm your email to get started.`,
    heading: (name) => `Welcome to [Product], ${name}`,
    body: (days) => `You have ${days} days to explore everything -- no credit card required.`,
    cta: "Confirm Email Address",
    fallbackLink: "Button not working? Paste this link in your browser:",
  },
  // ... other templates
};

// emails/i18n/de.ts
import type { EmailStrings } from "./types";
export const de: EmailStrings = {
  welcome: {
    preview: (name) => `Willkommen, ${name}! Bestaetigen Sie Ihre E-Mail.`,
    heading: (name) => `Willkommen bei [Product], ${name}`,
    body: (days) => `Sie haben ${days} Tage Zeit, alles zu erkunden -- keine Kreditkarte noetig.`,
    cta: "E-Mail-Adresse bestaetigen",
    fallbackLink: "Button funktioniert nicht? Fuegen Sie diesen Link in Ihren Browser ein:",
  },
  // ... other templates
};
```

---

## Deliverability Checklist

### DNS Records (Required)

- [ ] **SPF**: `v=spf1 include:_spf.provider.com ~all` on sending domain
- [ ] **DKIM**: Provider-specific CNAME records configured
- [ ] **DMARC**: `v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com`
- [ ] **Return-Path**: Matches sending domain (not provider default)

### Content Rules

- [ ] Sender uses own domain (not `@gmail.com`)
- [ ] Subject under 50 characters, no ALL CAPS, no spam triggers
- [ ] Text-to-image ratio: minimum 60% text
- [ ] Plain text version included alongside HTML
- [ ] Unsubscribe link in every email (CAN-SPAM, GDPR, one-click)
- [ ] Physical mailing address in footer (CAN-SPAM requirement)
- [ ] No URL shorteners (use full branded links)
- [ ] Single primary CTA per email
- [ ] All images have alt text
- [ ] HTML validates (no broken/unclosed tags)

### Infrastructure

- [ ] Separate sending domains for transactional vs marketing
- [ ] Warm up new sending domains gradually (start with 50/day, increase 2x weekly)
- [ ] Monitor bounce rates (<2% hard bounces)
- [ ] Process bounces and complaints automatically
- [ ] Test with Mail-Tester.com before production sends (target: 9+/10)

---

## Email Client Compatibility

### Known Quirks

| Client | Quirk | Workaround |
|--------|-------|-----------|
| Outlook (Windows) | No CSS grid/flexbox, ignores margin on images | Use `<table>` layout (React Email handles this) |
| Gmail | Strips `<head>` styles, limits CSS | Inline all styles (React Email handles this) |
| Apple Mail | Best support, renders dark mode well | Standard approach works |
| Yahoo Mail | Limited CSS support | Avoid advanced selectors |
| Outlook.com | Strips background images | Use background-color as fallback |

### Testing Matrix

Test every template on these clients before production:

| Priority | Client | Method |
|----------|--------|--------|
| Critical | Gmail (web) | Send test email |
| Critical | Apple Mail (iOS) | Send test email |
| Critical | Outlook (Windows, latest) | Litmus or Email on Acid |
| High | Outlook.com (web) | Send test email |
| High | Gmail (Android) | Send test email |
| Medium | Yahoo Mail | Litmus |
| Medium | Outlook (Mac) | Send test email |

---

## Dev Workflow

```bash
# Start preview server with hot reload
npx email dev --dir emails/templates --port 3001

# Export to static HTML (for testing with Litmus/Email on Acid)
npx email export --dir emails/templates --outDir emails/dist

# Send test email
npx tsx emails/lib/send-test.ts --template welcome --to test@example.com

# Validate HTML
npx email lint --dir emails/templates
```

---

## Common Pitfalls

| Pitfall | Consequence | Prevention |
|---------|-------------|------------|
| Using CSS grid/flexbox | Layout breaks in Outlook | Use `Row`/`Column` from React Email (renders to tables) |
| Container wider than 600px | Breaks on Gmail mobile | Max-width: 600px on container |
| Missing plain text version | Lower deliverability score | Always generate plain text with `render(template, { plainText: true })` |
| Same domain for transactional + marketing | Marketing complaints tank transactional delivery | Separate sending domains/subdomains |
| Skipping email warm-up | Emails go to spam | Start low, increase gradually over 2-4 weeks |
| Dark mode ignoring | Unreadable emails for 30%+ of users | Add `prefers-color-scheme: dark` media queries with `!important` |

---

## Related Skills

| Skill | Use When |
|-------|----------|
| **email-sequence** | Writing email copy and designing automation flows |
| **analytics-tracking** | Setting up email engagement tracking and attribution |
| **launch-strategy** | Coordinating email templates for product launches |

---

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Email clipped in Gmail | HTML over 102KB | Run `render_size_analyzer.py`. Remove comments, minify, replace base64 images. |
| Layout broken in Outlook | CSS flexbox/grid used | Use table-based layout. Run `template_validator.py` for compatibility check. |
| Styles stripped in Gmail | Styles in `<head>` only | Inline all CSS. React Email handles this automatically. |
| Unreadable in dark mode | No dark mode CSS | Add `prefers-color-scheme: dark` media queries with `!important`. |
| Low deliverability score | Missing unsubscribe, heavy images | Run `spam_score_checker.py`. Add RFC 8058 one-click unsubscribe headers. |
| Images not loading | Blocked by email client defaults | Add descriptive alt text. Maintain 60%+ text-to-image ratio. |
| Template renders differently across clients | Unsupported CSS properties | Test on Gmail, Apple Mail, Outlook (Windows) before production sends. |

---

## Success Criteria

- Spam score of 9+/10 on mail-tester.com before production sends
- Template renders correctly on Gmail, Apple Mail, and Outlook (Windows)
- HTML under 80KB (well under Gmail's 102KB clip threshold)
- Text-to-image ratio above 60%
- Dark mode tested and readable for 30%+ of users
- All images have alt text and explicit width/height dimensions
- One-click unsubscribe (RFC 8058) implemented in all templates
- Separate sending domains for transactional vs. marketing email

---

## Scope & Limitations

**In Scope:** Email HTML/CSS template engineering, React Email and MJML components, multi-provider sending abstraction, i18n, dark mode, deliverability infrastructure, spam score optimization.

**Out of Scope:** Email copy/sequence writing (use email-sequence), marketing automation workflows, email list management, A/B test statistical analysis.

---

## Python Automation Tools

### 1. Spam Score Checker (`scripts/spam_score_checker.py`)
Analyzes email HTML for spam risk: text-to-image ratio, link density, spam words, unsubscribe presence, HTML structure.

```bash
python scripts/spam_score_checker.py template.html
python scripts/spam_score_checker.py template.html --json
```

### 2. Template Validator (`scripts/template_validator.py`)
Validates email templates for client compatibility (Outlook, Gmail), accessibility, responsive design, and inline styles.

```bash
python scripts/template_validator.py template.html
python scripts/template_validator.py template.html --json
```

### 3. Render Size Analyzer (`scripts/render_size_analyzer.py`)
Analyzes template file size, estimates render weight, and checks against Gmail's 102KB clip threshold with detailed breakdown.

```bash
python scripts/render_size_analyzer.py template.html
python scripts/render_size_analyzer.py --dir templates/ --json
```

---

## growth-marketer

Source path: `references/marketing/growth-marketer/SKILL.md`

# Growth Marketer

The agent operates as a senior growth marketer, delivering experiment-driven strategies for scalable user acquisition, activation, retention, referral, and revenue optimization.

## Clarify First

Before designing experiments or a growth plan, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **North Star Metric + current AARRR baselines** — the metric and per-stage numbers (Steps 1–2 require these; without a baseline the "biggest lever" is a guess)
- [ ] **Experiment hypothesis + primary/guardrail metrics** — the change expected and how it's judged (drives the experiment doc and ship/iterate/kill)
- [ ] **Baseline rate + MDE** — current conversion and smallest lift worth detecting (feeds the sample-size calc directly)
- [ ] **Daily eligible traffic** — visitors per variant per day (determines whether the test can reach significance and over what duration)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

1. **Define North Star Metric** - Identify the single metric that reflects customer value and leads to revenue. Checkpoint: the metric must be measurable, actionable, and correlated with retention.
2. **Map the AARRR funnel** - Quantify current performance at each stage (Acquisition, Activation, Retention, Referral, Revenue). Checkpoint: every stage has a baseline number and a target.
3. **Identify biggest lever** - Find the funnel stage with the largest drop-off or lowest performance vs. benchmark. This becomes the focus area.
4. **Design experiments** - Write hypotheses using the format: "If we [change], then [metric] will [direction] by [amount] because [reasoning]." Prioritize using ICE scoring.
5. **Calculate sample size and run** - Determine required sample per variant for statistical significance (95% confidence, 80% power). Launch the experiment.
6. **Analyze results** - Evaluate lift, p-value, and guardrail metrics. Decision: Ship, Iterate, or Kill.
7. **Model growth trajectory** - Forecast user growth incorporating acquisition rate, churn, and viral coefficient. Validate that LTV:CAC > 3:1 for sustainability.

## AARRR Funnel (Pirate Metrics)

| Stage | Key Question | Metrics | Benchmark |
|-------|-------------|---------|-----------|
| Acquisition | How do users find us? | Traffic, CAC, channel mix | CAC < 1/3 LTV |
| Activation | Great first experience? | Activation rate, time to value | 40%+ activation |
| Retention | Do users come back? | D1/D7/D30 retention, churn | SaaS: D30 30% |
| Referral | Do users tell others? | Viral coefficient (K), NPS | K-factor > 0.5 |
| Revenue | How do we monetize? | ARPU, LTV, conversion rate | LTV:CAC > 3:1 |

## Experimentation Framework

### Experiment Document Template

```markdown
# Experiment: Onboarding Checklist v2

## Hypothesis
If we add a progress bar to the onboarding checklist, then activation rate
will increase by 15% because users respond to completion motivation.

## Metrics
- Primary: 7-day activation rate
- Secondary: Time to first value action
- Guardrails: Support ticket volume, bounce rate

## Design
- Type: A/B test
- Sample: 8,200 per variant (5% baseline, 15% MDE, 95% confidence)
- Duration: 14 days
- Segments: New signups only

## Results
| Variant   | Users  | Activation | Lift  | p-value |
|-----------|--------|------------|-------|---------|
| Control   | 8,350  | 5.1%       | -     | -       |
| Treatment | 8,280  | 6.2%       | +21%  | 0.003   |

## Decision: Ship
```

### ICE Prioritization

| Experiment | Impact (1-10) | Confidence (1-10) | Ease (1-10) | ICE Score |
|------------|---------------|-------------------|-------------|-----------|
| Onboarding checklist v2 | 8 | 7 | 9 | 24 |
| Referral incentive test | 6 | 8 | 7 | 21 |
| Pricing page redesign | 9 | 5 | 6 | 20 |

### Sample Size Calculator

```python
from scipy import stats

def sample_size(baseline_rate, mde, alpha=0.05, power=0.8):
    """Calculate required sample size per variant for an A/B test.

    Args:
        baseline_rate: Current conversion rate (e.g. 0.05 for 5%)
        mde: Minimum detectable effect as proportion (e.g. 0.15 for 15% lift)
        alpha: Significance level (default 0.05)
        power: Statistical power (default 0.8)

    Returns:
        Required users per variant (int)

    Example:
        >>> sample_size(0.05, 0.15)
        8218
    """
    effect_size = mde * baseline_rate
    z_alpha = stats.norm.ppf(1 - alpha / 2)
    z_beta = stats.norm.ppf(power)
    n = 2 * ((z_alpha + z_beta) ** 2) * baseline_rate * (1 - baseline_rate) / (effect_size ** 2)
    return int(n)
```

## Acquisition Channel Analysis

| Channel | CAC | Volume | Quality | Scalability |
|---------|-----|--------|---------|-------------|
| Organic Search | $20 | High | High | Medium |
| Paid Search | $50 | Medium | High | High |
| Social Organic | $10 | Medium | Medium | Low |
| Social Paid | $40 | High | Medium | High |
| Content | $15 | Medium | High | Medium |
| Referral | $5 | Low | Very High | Medium |
| Partnerships | $30 | Medium | High | Medium |

## Retention Benchmarks

| Category | D1 | D7 | D30 |
|----------|-----|-----|------|
| SaaS | 60% | 40% | 30% |
| Social | 50% | 30% | 20% |
| E-commerce | 25% | 15% | 10% |
| Games | 35% | 15% | 8% |

### Cohort Analysis Example

```
         Week 0  Week 1  Week 2  Week 3  Week 4
Jan W1   100%    45%     35%     28%     25%
Jan W2   100%    48%     38%     32%     28%
Jan W3   100%    52%     42%     35%     31%
Jan W4   100%    55%     45%     38%     34%

Insight: Week-over-week improvement correlates with onboarding
changes shipped in Jan W3.
```

## Viral Growth

**K-Factor** = invites per user (i) x conversion rate of invites (c)

- K > 1: True viral growth (each user brings >1 new user)
- K = 0.5-1: Viral boost (amplifies paid acquisition)
- K < 0.5: Minimal viral effect

## Growth Forecast Model

```python
def growth_forecast(current_users, monthly_growth_rate, months):
    """Forecast user base over time with compound growth.

    Example:
        >>> growth_forecast(10000, 0.10, 12)[-1]
        31384
    """
    users = [current_users]
    for _ in range(months):
        users.append(int(users[-1] * (1 + monthly_growth_rate)))
    return users
```

## Scripts

```bash
# Experiment analyzer
python scripts/experiment_analyzer.py --experiment exp_001 --data results.csv

# Funnel analyzer
python scripts/funnel_analyzer.py --events events.csv --output funnel.html

# Cohort generator
python scripts/cohort_generator.py --users users.csv --metric retention

# Growth model
python scripts/growth_model.py --current 10000 --growth 0.1 --months 12
```

## Reference Materials

- `references/experimentation.md` - A/B testing guide
- `references/acquisition.md` - Channel playbooks
- `references/retention.md` - Retention strategies
- `references/viral.md` - Viral mechanics

---

## Troubleshooting

| Symptom | Likely Cause | Resolution |
|---------|-------------|------------|
| K-factor below 0.1 despite referral program | Invite UX has too much friction or incentive misaligned with user value | Reduce invite flow to one click; align incentive with product value (usage credits > cash) |
| Activation rate below 20% for new signups | Time-to-value too long or onboarding not guiding users to aha moment | Map activation events, identify first value action, build guided onboarding to reach it in under 5 minutes |
| Growth stalls after initial PLG ramp | Free tier captures low-intent users who never convert; paid conversion rate below 3% | Tighten free tier limits around high-value features, add contextual upgrade prompts at usage gates |
| A/B test results not reaching significance | Sample size too small for the minimum detectable effect being tested | Use sample size calculator; increase traffic to test or accept larger MDE |
| Cohort retention curves flatten at under 15% | Product does not build enough habit; no ongoing value loop | Implement engagement hooks (notifications, reports, streaks); investigate which features drive retention |
| Experiments consistently show no lift | Testing cosmetic changes rather than meaningful value propositions | Focus experiments on activation flow, pricing, and value communication — not button colors |

---

## Success Criteria

- North Star Metric identified, measurable, and reviewed weekly with cross-functional team
- Activation rate above 40% for new signups within first 7 days
- LTV:CAC ratio sustained above 3:1 across all acquisition channels
- K-factor above 0.5, providing meaningful viral amplification of paid acquisition
- Experiment velocity of 2+ tests per sprint with documented hypotheses and outcomes
- D30 retention at or above SaaS benchmark (30%) for primary user segment
- Growth model accurately forecasts within 15% of actual for 3-month projections

---

## Scope & Limitations

**In Scope:** AARRR funnel optimization, experiment design and prioritization (ICE/RICE), viral growth modeling, PLG strategy, retention analysis, cohort analysis, growth forecasting, acquisition channel analysis, sample size calculation.

**Out of Scope:** Brand strategy (see brand-strategist skill), content creation (see content-creator skill), paid ad campaign management (see paid-ads skill), product design and engineering implementation, pricing strategy.

**Limitations:** Growth loop models use simplified compound growth assumptions — real growth has diminishing returns and market saturation effects. Viral coefficient calculations assume uniform user behavior; actual viral spread varies by segment. Sample size calculator uses normal approximation; for very low conversion rates, exact tests may be needed.

---

## Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `scripts/growth_loop_modeler.py` | Model viral, PLG, and content growth loops with forecasts | `python scripts/growth_loop_modeler.py --type viral --users 1000 --k-factor 0.6 --months 12` |
| `scripts/viral_coefficient_calculator.py` | Calculate K-factor, branching factor, and improvement scenarios | `python scripts/viral_coefficient_calculator.py --invites 5000 --conversions 800 --users 2000` |
| `scripts/experiment_prioritizer.py` | Prioritize growth experiments using ICE or RICE scoring | `python scripts/experiment_prioritizer.py experiments.json --framework ice --demo` |

---

## landing-page-generator

Source path: `references/marketing/landing-page-generator/SKILL.md`

# Landing Page Generator

Design and build high-converting landing pages using proven copy frameworks, section patterns, and conversion optimization techniques.

---

## Table of Contents

- [Keywords](#keywords)
- [Quick Start](#quick-start)
- [Core Workflows](#core-workflows)
- [Page Section Library](#page-section-library)
- [Copy Framework Application](#copy-framework-application)
- [Conversion Optimization Checklist](#conversion-optimization-checklist)
- [Design Style Reference](#design-style-reference)
- [CTA Strategy](#cta-strategy)
- [SEO and Performance](#seo-and-performance)
- [A/B Testing Framework](#ab-testing-framework)
- [Best Practices](#best-practices)
- [Integration Points](#integration-points)

---

## Keywords

landing page, landing page design, conversion optimization, lead capture page, campaign page, marketing page, hero section, CTA strategy, landing page copy, landing page generator, promo page, conversion page, lead gen page, single-page site, landing page template, A/B testing, page layout, above the fold, social proof, pricing table, FAQ section, testimonial block

---

## Clarify First

Before generating the page, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Conversion goal & offer** — the single action and what the visitor gets (every page has one goal and one CTA)
- [ ] **Target audience & awareness level** — who they are and what they know (selects the copy framework PAS/AIDA/BAB)
- [ ] **Key pain point & key benefit** — the problem and the primary outcome (drives the hero headline and Problem/Solution sections)
- [ ] **Traffic source** — ads, email, or organic (sets message match and page adaptation)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

### Generate a Landing Page

1. Gather inputs: product, audience, pain point, key benefit, offer
2. Select design style (dark-saas, clean-minimal, bold-startup, enterprise)
3. Choose copy framework (PAS, AIDA, BAB) based on audience awareness
4. Build sections in order: Hero > Problem > Solution > Social Proof > How It Works > CTA
5. Run conversion optimization checklist before publishing
6. Set up A/B test for headline and CTA variants

### Landing Page Brief Template

```markdown
## Landing Page Brief
- Product/Service: [Name]
- Value proposition: [One sentence]
- Target audience: [Who and what they need]
- Key pain point: [Primary problem you solve]
- Key benefit: [Primary outcome they get]
- Offer: [What you are offering — trial, demo, download, purchase]
- Traffic source: [Where visitors come from — ads, email, organic]
- Design style: [dark-saas / clean-minimal / bold-startup / enterprise]
- Copy framework: [PAS / AIDA / BAB]
```

---

## Core Workflows

### Workflow 1: Full Landing Page Build

**Step 1: Define the Single Goal**

Every landing page has one purpose and one CTA. Define it before anything else:
- What action do you want the visitor to take?
- What does the visitor get in return?
- What is the traffic source (this determines headline matching)?

**Step 2: Select Copy Framework**

| Framework | Best When | Audience Awareness Level |
|-----------|-----------|------------------------|
| PAS (Problem > Agitate > Solve) | Audience knows the problem | Problem-aware |
| AIDA (Attention > Interest > Desire > Action) | Audience needs education | Unaware to problem-aware |
| BAB (Before > After > Bridge) | Audience wants transformation | Solution-aware |

**Step 3: Build Sections in Order**

| Order | Section | Purpose |
|-------|---------|---------|
| 1 | Hero | Communicate value in 5 seconds |
| 2 | Social proof bar | Build instant credibility |
| 3 | Problem statement | Show you understand their pain |
| 4 | Solution / Benefits | Present your answer |
| 5 | How it works | Reduce perceived complexity |
| 6 | Features with benefits | Detail what they get |
| 7 | Testimonials | Proof from real customers |
| 8 | Pricing (if applicable) | Help them decide |
| 9 | FAQ | Handle objections |
| 10 | Final CTA | Repeat the ask with risk reversal |

**Step 4: Write Copy Per Section**

Use the section-specific guidelines in the Page Section Library below.

**Step 5: Optimize for Conversion**

Run the Conversion Optimization Checklist before launching.

### Workflow 2: Campaign Landing Page

For ad campaigns, email campaigns, or launch events:

**Step 1: Message Match**

The landing page headline MUST match the ad/email that drives traffic:
- If ad says "Reduce churn by 30%," the landing page headline must say "Reduce churn by 30%"
- Mismatched expectations cause immediate bounce

**Step 2: Single Message Focus**

Remove all navigation, sidebar links, and secondary CTAs:
- No header navigation (removes exit paths)
- No footer links except legal requirements
- One CTA repeated 2-3 times on the page
- Every section supports the single conversion goal

**Step 3: Traffic Source Adaptation**

| Traffic Source | Page Adaptation |
|---------------|----------------|
| Paid search (Google) | Lead with the searched keyword in H1 |
| Paid social (Meta, LinkedIn) | Lead with the ad's hook/benefit |
| Email campaign | Lead with the email's promise |
| Organic search | Lead with the comprehensive answer |
| Referral/partner | Lead with the referrer's context |

---

## Page Section Library

### Hero Section

The most important section. Must communicate value in 5 seconds.

**Components:**
- Headline (primary value proposition)
- Subheadline (expand on headline, add specificity)
- Primary CTA button
- Secondary CTA (optional, lower commitment)
- Supporting visual (product screenshot, illustration, or video)
- Trust signal (social proof bar, customer count, or badge)

**Hero Variants:**

| Variant | Layout | Best For |
|---------|--------|----------|
| Centered | Text centered, CTA below, visual below | Simple offers, clear value props |
| Split | Text left, visual right (or vice versa) | Product with strong visual/screenshot |
| Video background | Text overlay on ambient video | Brand-heavy, awareness pages |
| Minimal | Headline + CTA only, no visual | High-intent traffic, direct offers |
| Social proof hero | Testimonial as the headline | Strong customer story to lead with |

**Hero Copy Guidelines:**
- Headline: 6-12 words, includes the primary benefit
- Subheadline: 1-2 sentences, adds specificity or addresses the "how"
- CTA: Action verb + what they get ("Start my free trial")
- Supporting text below CTA: reduce friction ("No credit card required")

### Problem Section

Make the reader feel understood before pitching anything.

**Structure:**
- 2-3 pain points in the reader's language
- Each pain point is specific and recognizable
- Optional: quantify the cost of the problem ("This costs teams an average of $X per month")

### Solution / Benefits Section

Connect your product to the outcomes they want.

**Structure:**
- 3-5 key benefits (not features)
- Each benefit follows the pattern: [What it does] > [Why that matters] > [Specific outcome]
- Visual support for each benefit (icon, screenshot, or illustration)

### How It Works Section

Reduce perceived complexity to 3-4 simple steps.

**Structure:**
- Step 1: [Action] (with brief description)
- Step 2: [Action] (with brief description)
- Step 3: [Action] (with brief description)
- Optional Step 4: [Outcome] ("See results within [timeframe]")

**Rules:**
- Never exceed 4 steps (complexity kills conversion)
- Each step starts with an action verb
- Each step can be understood independently

### Social Proof Section

**Types ranked by conversion impact:**

| Type | Impact | Example |
|------|--------|---------|
| Named testimonial with metrics | Highest | "Reduced churn by 23% in 90 days" — Sarah Chen, VP Marketing |
| Customer logos | High | Row of recognizable brand logos |
| Aggregate metrics | High | "2,847 teams, 40+ countries, 4.8/5 rating" |
| Star ratings / review scores | Medium | "4.8 out of 5 on G2 (500+ reviews)" |
| Case study link | Medium | "See how [Company] achieved [result]" |
| Generic testimonial | Low | "Great product!" — John D. |

### Pricing Section

**Guidelines:**
- 2-4 tiers maximum (3 is optimal)
- Highlight the recommended tier visually
- Feature comparison shows what is included in each tier
- Enterprise tier with "Contact us" for custom needs
- Annual vs. monthly toggle if offering both
- Trust signals near pricing (guarantee, cancel anytime)

### FAQ Section

**Guidelines:**
- 5-8 questions maximum
- Questions should address real buying objections
- Answers should be direct (1-3 sentences)
- Include FAQPage schema markup for SEO

**Common FAQ questions to include:**
- How does pricing work?
- Can I cancel anytime?
- How long does setup take?
- Do you offer a free trial?
- Is my data secure?
- What integrations do you support?
- How is this different from [competitor]?

### Final CTA Section

**Structure:**
- Headline restating the core value
- 1 sentence of supporting copy
- Primary CTA button (same as hero)
- Risk reversal statement (guarantee, no CC, cancel anytime)
- Optional: customer count or testimonial snippet

---

## Copy Framework Application

### PAS Application to Landing Page

| Section | PAS Element | Copy Approach |
|---------|------------|---------------|
| Hero headline | Problem | Name the pain directly |
| Problem section | Agitate | Show consequences of inaction |
| Solution section | Solve | Introduce product as the answer |
| CTA | Solve | Clear action to access the solution |

**Example:**
- Hero: "Your team wastes 4 hours every week on manual reporting"
- Problem: "That is 200 hours a year — the equivalent of losing a full-time employee to spreadsheets. Meanwhile, your competitors are shipping features."
- Solution: "[Product] automates your reporting. Set it once, get reports every Monday morning."
- CTA: "Automate my reports — start free trial"

### AIDA Application to Landing Page

| Section | AIDA Element | Copy Approach |
|---------|-------------|---------------|
| Hero headline | Attention | Bold, attention-grabbing statement |
| Benefits section | Interest | Expand with relevant details and benefits |
| Social proof | Desire | Show proof and paint the transformation |
| CTA | Action | Clear, compelling call to action |

### BAB Application to Landing Page

| Section | BAB Element | Copy Approach |
|---------|------------|---------------|
| Hero + Problem | Before | Current painful state |
| Solution + Benefits | After | Desired future state |
| How it works | Bridge | How the product gets them there |

---

## Conversion Optimization Checklist

### Above the Fold

- [ ] Headline communicates value in under 6 seconds
- [ ] CTA is visible without scrolling on mobile (375px viewport)
- [ ] No more than one navigation option (or no navigation at all)
- [ ] Subheadline adds specificity to the headline
- [ ] Visual supports the message (not decorative)

### Page-Wide

- [ ] Single conversion goal throughout the page
- [ ] CTA appears 2-3 times (hero, mid-page, footer)
- [ ] Social proof appears within the first two scrolls
- [ ] Every feature has a corresponding benefit
- [ ] Objections addressed before the final CTA
- [ ] Risk reversal stated near every CTA
- [ ] No external links that compete with the CTA
- [ ] Form asks for minimum required information

### Trust and Credibility

- [ ] Customer testimonials are named and specific
- [ ] Company logos used with permission
- [ ] Security badges and certifications visible if relevant
- [ ] Privacy policy linked from any data collection form
- [ ] Physical address or company information available

### Mobile

- [ ] Page loads under 3 seconds on mobile
- [ ] CTA button is thumb-friendly (minimum 48px height)
- [ ] Text is readable without zooming (16px minimum)
- [ ] No horizontal scrolling
- [ ] Forms are usable on mobile keyboards

---

## Design Style Reference

### Style Options

| Style | Visual Tone | Best For |
|-------|-----------|----------|
| Dark SaaS | Dark backgrounds, vibrant accents, gradient effects | Developer tools, technical products, modern SaaS |
| Clean Minimal | White backgrounds, subtle borders, clean typography | Professional services, healthcare, education |
| Bold Startup | Large typography, bright colors, dynamic layouts | Consumer products, startups, creative tools |
| Enterprise | Muted tones, structured layouts, conservative design | B2B enterprise, finance, government |

### Visual Hierarchy Rules

1. Headline is the largest text element on the page
2. CTA button is the most visually prominent element
3. Supporting text is noticeably smaller than headlines
4. White space separates sections and creates breathing room
5. Color contrast meets WCAG AA standards (4.5:1 minimum for text)
6. Recommended plan on pricing pages is visually distinguished

---

## CTA Strategy

### CTA Placement

| Position | Purpose | Copy Approach |
|----------|---------|---------------|
| Hero | Primary conversion point | Action + benefit: "Start my free trial" |
| After benefits | Capture interest momentum | Reinforce: "See it in action" |
| After social proof | Capitalize on trust | Social: "Join 2,847 teams" |
| Page footer | Final catch | Urgency: "Start today — free for 14 days" |

### CTA Copy Formulas

```
[Action Verb] + [What They Get]
```
- "Start my free trial"
- "Get the complete guide"
- "See pricing for my team"
- "Create my first dashboard"

### Supporting CTA Text

Below the button, reduce friction:
- "No credit card required"
- "Set up in 2 minutes"
- "Cancel anytime"
- "Free for 14 days"
- "Join 2,847 teams"

---

## SEO and Performance

### SEO Checklist

- [ ] Title tag: primary keyword + brand, 50-60 characters
- [ ] Meta description: benefit + CTA, 150-160 characters
- [ ] H1: one per page, includes primary keyword
- [ ] OG image: 1200x630px with product name and value proposition
- [ ] Canonical URL set
- [ ] Image alt text on all images
- [ ] Structured data: FAQPage schema if FAQ section exists
- [ ] Mobile viewport meta tag present

### Performance Targets

| Metric | Target | How to Achieve |
|--------|--------|---------------|
| Largest Contentful Paint (LCP) | Under 2.5 seconds | Optimize hero image, use modern formats (WebP/AVIF) |
| Cumulative Layout Shift (CLS) | Under 0.1 | Set explicit dimensions on all images and embeds |
| First Input Delay (FID) | Under 100ms | Defer non-critical JavaScript |
| Time to First Byte (TTFB) | Under 600ms | Use CDN, server-side rendering, or static generation |
| Total page weight | Under 1MB | Compress images, minimize JavaScript bundles |

---

## A/B Testing Framework

### What to Test (Highest to Lowest Impact)

1. **Headline** — The single highest-impact element. Test 2-3 variants.
2. **CTA copy and color** — Test action text and visual prominence.
3. **Hero image/visual** — Product screenshot vs. illustration vs. video.
4. **Social proof placement** — Above fold vs. below benefits.
5. **Form length** — Fewer fields vs. more qualified leads.
6. **Price display** — Annual vs. monthly default, pricing anchor.

### Testing Rules

- Test one variable at a time
- Run tests for minimum 14 days or 1,000 visitors per variant
- Calculate statistical significance (95% confidence) before declaring winner
- Document hypothesis, variants, and results for every test
- Never end a test early based on early results

### Test Documentation

```markdown
## A/B Test: [Name]
- Page: [URL]
- Hypothesis: [If we change X, then Y improves because Z]
- Control: [Current version]
- Variant: [Changed version]
- Primary metric: [Conversion rate / Click rate / Signup rate]
- Duration: [Start - End]
- Traffic per variant: [Number]
- Result: [Winner + lift + confidence]
- Learning: [What we apply going forward]
```

---

## Best Practices

1. **One page, one goal** — Every element on the page must serve the single conversion objective. If it does not help convert, remove it.

2. **Match the message** — The landing page headline must mirror the ad, email, or link that drove the visit. Mismatched expectations are the top bounce cause.

3. **Remove navigation** — Landing pages should have no header navigation, no sidebar, and no footer links except legal requirements. Every exit path is a lost conversion.

4. **Mobile first** — Design for 375px viewport first. The majority of ad traffic arrives on mobile devices.

5. **Above-the-fold CTA** — The primary CTA must be visible without scrolling on both desktop and mobile.

6. **Social proof early** — Place credibility signals within the first two scrolls. Trust is a prerequisite for conversion.

7. **Minimize form fields** — Every additional field reduces conversion. Ask for the minimum needed to qualify the lead.

8. **Speed is conversion** — Every second of load time reduces conversion rate by approximately 7%. Optimize aggressively.

9. **Test relentlessly** — The headline alone can produce 20-50% conversion differences. A/B test every high-impact element.

10. **Risk reversal near every CTA** — "No credit card required," "Money-back guarantee," "Cancel anytime." Remove the last objection at the moment of decision.

---

## Integration Points

- **Copywriting** — Use for the copy layer. Landing Page Generator handles structure and optimization. Copywriting handles the words.
- **Ad Creative** — Use for the ads driving traffic to the landing page. Ensure message match between ad and page.
- **Marketing Psychology** — Use psychological principles (anchoring, social proof, loss aversion) to strengthen page elements.
- **Campaign Analytics** — Use to measure landing page performance and feed insights into optimization.
- **Brand Guidelines** — Reference brand visual and voice standards for consistency.
- **Content Humanizer** — Use if page copy sounds robotic or generic after initial drafting.

---

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| High bounce rate from paid traffic | Headline doesn't match the ad | Ensure exact message match between ad copy and landing page H1. |
| CTA below fold on mobile | Hero section too tall or CTA not prioritized | Test on 375px viewport. CTA must be visible without scrolling. |
| Good traffic but zero conversions | Conversion tracking broken | Verify pixel fires on thank-you page. Test with a real conversion. |
| Slow page load (>3s mobile) | Unoptimized images, heavy JS | Run `page_speed_estimator.py`. Convert images to WebP, defer non-critical JS. |
| Form submissions but no leads in CRM | Form-to-CRM integration broken | Test form submission end-to-end. Check webhook/API connection. |
| Multiple CTAs confusing visitors | Too many conversion paths | Single goal per landing page. All CTAs drive the same action. |
| Low conversion despite good copy | No social proof or risk reversal | Run `conversion_checklist.py`. Add testimonials and "no credit card" near CTAs. |

---

## Success Criteria

- Conversion rate above 6.6% (2025 median across industries) for primary CTA
- Page loads under 3 seconds on mobile (LCP under 2.5s, CLS under 0.1)
- CTA visible above fold on both desktop (1440px) and mobile (375px)
- Single conversion goal with no competing navigation or exit paths
- Message match: landing page headline mirrors the traffic source (ad, email, link)
- Social proof visible within first two scrolls
- A/B test running on headline or CTA at all times for high-traffic pages

---

## Scope & Limitations

**In Scope:** Landing page structure, section patterns, copy framework application, conversion optimization, CTA strategy, SEO meta tags, A/B testing framework, design style guidance.

**Out of Scope:** Page copy writing (use copywriting), paid ad campaigns driving traffic (use paid-ads), CMS/website builder administration, analytics platform setup.

**Limitations:** Conversion benchmarks vary significantly by industry, traffic source, and offer type. The 6.6% median is across all industries; SaaS trials may see 10-25% while e-commerce may see 2-3%.

---

## Python Automation Tools

### 1. Page Speed Estimator (`scripts/page_speed_estimator.py`)
Estimates Core Web Vitals from HTML source: LCP, CLS risk, script/image analysis, and conversion impact.

```bash
python scripts/page_speed_estimator.py page.html
python scripts/page_speed_estimator.py page.html --json
```

### 2. CTA Analyzer (`scripts/cta_analyzer.py`)
Analyzes CTA placement, copy strength, friction level, and consistency across the landing page.

```bash
python scripts/cta_analyzer.py page.html
python scripts/cta_analyzer.py page.html --json
```

### 3. Conversion Checklist (`scripts/conversion_checklist.py`)
Runs a comprehensive 20+ point conversion optimization audit against 2025-2026 best practices and benchmarks.

```bash
python scripts/conversion_checklist.py page.html
python scripts/conversion_checklist.py page.html --json
```

---

## launch-strategy

Source path: `references/marketing/launch-strategy/SKILL.md`

# Launch Strategy

**Category:** Marketing
**Tags:** product launch, feature release, Product Hunt, go-to-market, launch playbook, announcement strategy

## Overview

Launch Strategy provides the complete playbook for launching products and features that build momentum, capture attention, and convert interest into users. A product launch is not an event -- it is a campaign with pre-launch, launch day, and post-launch phases. Shipping without a launch plan is leaving growth on the table.

---

## Clarify First

Before planning the launch, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Launch tier** — Tier 1 major / 2 feature / 3 update / 4 changelog (sets effort level, channel mix, and timeline length)
- [ ] **Launch date** — the target go-live (anchors the week-by-week pre-launch timeline and Product Hunt window)
- [ ] **Primary audience segment** — who cares most about this release (drives positioning and ORB channel selection)
- [ ] **One-sentence value prop** — what is launching and why anyone should care (drives the positioning template and announcement copy)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## Launch Tiers

Not every release deserves the same effort. Classify first.

| Tier | What It Is | Marketing Effort | Examples |
|------|-----------|-----------------|---------|
| **Tier 1: Major Launch** | New product, major pivot, rebrand | 4-8 weeks prep, all channels | New product launch, platform launch |
| **Tier 2: Feature Launch** | Significant new capability | 2-4 weeks prep, owned + select channels | Major feature, integration, new plan |
| **Tier 3: Update** | Improvement to existing feature | 1 week prep, owned channels only | Performance improvement, UI refresh |
| **Tier 4: Changelog** | Bug fix, minor improvement | Same day, changelog only | Bug fixes, minor UX tweaks |

The rest of this skill focuses on Tier 1-2 launches. Tier 3-4 follow a simplified version of the same process.

---

## Phase 1: Pre-Launch (4-8 Weeks Before)

### Week 8-6: Foundation

**Positioning & Messaging**
1. Define the one-sentence value prop for this launch
2. Identify primary audience segment (who cares most about this?)
3. Draft the headline you want to see in coverage
4. Answer the "so what?" question -- why should anyone care?

**Positioning Template:**
```
For [target audience] who [need/pain point],
[product/feature] is the [category]
that [key benefit].
Unlike [alternatives],
we [key differentiator].
```

**Asset Checklist:**
- [ ] Landing page copy and design
- [ ] Product screenshots / demo video
- [ ] Blog post (announcement)
- [ ] Email announcement draft
- [ ] Social media posts (per platform)
- [ ] Press release / media pitch (Tier 1 only)
- [ ] Internal FAQ for team
- [ ] Customer FAQ

### Week 6-4: Build Momentum

**Audience Warming**
- Tease the launch in social posts (building in public)
- Share behind-the-scenes development content
- Engage with potential users about the problem you are solving
- Collect early feedback from beta users

**Waitlist / Early Access**
For Tier 1 launches, consider a waitlist to build anticipation:
```
Waitlist Landing Page Elements:
1. Clear headline: what is coming
2. One-sentence description: why it matters
3. Email capture form
4. Social proof: "Join [X] others waiting"
5. Expected launch date
6. Share incentive: "Move up the list by sharing"
```

### Week 4-2: Prepare Channels

**The ORB Channel Framework**

Categorize every launch channel as Owned, Rented, or Borrowed:

| Channel Type | Definition | Examples | Control |
|-------------|-----------|---------|---------|
| **Owned** | You control the audience | Email list, blog, product (in-app), changelog | Full |
| **Rented** | You pay for access | Paid ads, sponsorships, promoted posts | High (while paying) |
| **Borrowed** | You earn access through others | Press, influencer mentions, community shares, Product Hunt | Low |

**Channel Strategy by Tier:**

| Channel | Tier 1 | Tier 2 | Tier 3 |
|---------|--------|--------|--------|
| Email (full list) | Yes | Yes | Segment only |
| Blog post | Long-form | Short-form | Changelog |
| Social media | Multi-post campaign | Single announcement | Brief mention |
| In-app notification | Yes | Yes | Optional |
| Product Hunt | If applicable | No | No |
| Press / media | Targeted pitches | No | No |
| Paid amplification | Budget allocated | Small budget | No |
| Partner co-marketing | If applicable | No | No |
| Community posts | HN, Reddit, Discord | HN maybe | No |

### Week 2-1: Final Prep

- [ ] All assets created and reviewed
- [ ] Landing page live (or ready to flip)
- [ ] Email sequences loaded and tested
- [ ] Social posts scheduled
- [ ] Team briefed on launch plan and talking points
- [ ] Analytics tracking configured for launch metrics
- [ ] Support team briefed on new feature / expected questions
- [ ] Rollback plan documented (if something goes wrong)

---

## Phase 2: Launch Day Execution

### Launch Day Checklist (Time-Boxed)

**T-2 hours:**
- [ ] Final check: landing page, links, tracking all working
- [ ] Team Slack channel open for coordination
- [ ] Support team ready

**T-0 (Launch):**
- [ ] Flip landing page / feature gate live
- [ ] Send email announcement (Segment 1: most engaged users)
- [ ] Publish blog post
- [ ] Post on social media (all platforms, staggered by 30 min)
- [ ] Submit to Product Hunt (if planned -- see PH section)
- [ ] Post in relevant communities (HN, Reddit, Discord)
- [ ] Notify partners for co-promotion

**T+2 hours:**
- [ ] Check analytics: traffic, signups, errors
- [ ] Respond to all social media comments/questions
- [ ] Send email announcement (Segment 2: broader list)
- [ ] Monitor Product Hunt ranking (if applicable)

**T+6 hours:**
- [ ] Share early results with team
- [ ] Address any support issues
- [ ] Engage with community discussion threads
- [ ] Schedule next-day follow-up content

**End of Day:**
- [ ] Document day-one metrics
- [ ] Thank early adopters publicly
- [ ] Note any issues for immediate fix
- [ ] Confirm next-day plan

### Launch Day Communication Rules

1. **Respond to everything** -- launch day is not the day to ignore comments
2. **Founder engagement** -- CEO/founders should personally reply on HN, Reddit, PH
3. **Celebrate wins publicly** -- share milestones as they happen ("500 signups in first 3 hours!")
4. **Address issues immediately** -- if something breaks, communicate before people complain
5. **Never argue** -- if someone criticizes, thank them and learn

---

## Phase 3: Product Hunt Playbook

Product Hunt is a launch channel, not a launch strategy. It works best when combined with the full ORB approach.

### PH Timeline

**Week -4: Preparation**
- Create / update Maker profile
- Engage genuinely in PH community (comment on other products)
- Build relationships with active PH hunters
- Draft listing: tagline, description, first comment, media

**Week -1: Pre-Launch**
- Confirm launch date (Tuesday, Wednesday, or Thursday -- avoid Monday/Friday)
- Prepare all PH assets:
  - Thumbnail (240x240, clean, recognizable)
  - Gallery images (1270x760, show the product, not marketing fluff)
  - Demo video or GIF (under 60s)
  - First comment (personal, story-driven, not corporate)
- Notify your network: "We are launching on PH on [date]"
- Do NOT ask for upvotes (against PH guidelines and counterproductive)

**Launch Day (12:01 AM PT)**
- Submit immediately after midnight PT (products are ranked by votes within a 24h window starting at midnight PT)
- Post first comment within 5 minutes (this is your pitch)
- Share across channels: "We launched on Product Hunt today" with direct link
- Respond to EVERY comment on PH within 30 minutes
- Engage authentically -- answer questions, thank feedback, acknowledge criticism

**First Comment Template:**
```
Hey PH! [Name] here, [role] at [Company].

We built [product] because [personal story about the problem].

[1-2 sentences about what it does and why it's different]

Here's what you get:
- [Key feature 1]
- [Key feature 2]
- [Key feature 3]

Special for PH: [offer -- extended trial, discount, early access to feature]

Would love your honest feedback. Happy to answer any questions!
```

### PH Success Metrics

| Outcome | What It Means |
|---------|---------------|
| Top 5 of the day | Strong launch, badge, homepage visibility |
| Top 10 of the day | Good launch, still gets homepage traffic for 24h |
| Below top 10 | Minimal PH-specific value, but launch content still works elsewhere |
| Product of the week/month | Significant ongoing PH traffic |

---

## Phase 4: Post-Launch Momentum (30 Days)

The launch is not over on day one. Most of the value comes from sustained post-launch activity.

### Week 1 (Days 2-7)

- [ ] Publish follow-up content: "What we learned from launching"
- [ ] Share metrics publicly if impressive: "1,000 signups in 48 hours"
- [ ] Create comparison pages: [Product] vs [Competitor A], vs [Competitor B]
- [ ] Reach out to people who engaged on launch day for testimonials
- [ ] Fix any issues reported on launch day

### Week 2 (Days 8-14)

- [ ] Publish case study or early user story
- [ ] Create interactive demo or product tour
- [ ] Submit to relevant directories and lists (G2, Capterra, AlternativeTo)
- [ ] Pitch guest posts to relevant blogs / newsletters
- [ ] Run retargeting ads to launch day visitors who did not convert

### Week 3-4 (Days 15-30)

- [ ] Publish "roundup" email to full list with launch highlights + social proof
- [ ] Create SEO-optimized content around launch keywords
- [ ] Analyze full launch funnel: what worked, what did not, what to repeat
- [ ] Document launch playbook for next time (what you would do differently)
- [ ] Plan next feature launch using learnings

---

## Launch Metrics

### Pre-Launch Metrics

| Metric | Target | Source |
|--------|--------|--------|
| Waitlist signups | 500+ for Tier 1 | Landing page |
| Email list growth | 10%+ increase | Email platform |
| Social engagement on teaser content | 2x normal | Platform analytics |

### Launch Day Metrics

| Metric | Target | Source |
|--------|--------|--------|
| Landing page visitors | 5x normal daily | GA4 |
| Signup/conversion rate | 5-15% of visitors | Product analytics |
| Social shares/mentions | 50+ | Social monitoring |
| Product Hunt rank | Top 5 | Product Hunt |

### Post-Launch Metrics (30 day)

| Metric | Target | Source |
|--------|--------|--------|
| Total signups attributed to launch | 2-5x monthly average | Attribution |
| Activation rate of launch signups | Match or exceed normal cohort | Product analytics |
| Press/blog mentions | 3+ organic mentions | Google Alerts |
| SEO keyword rankings | Ranking for launch keywords | Search console |

---

## Proactive Triggers

- Feature ship date mentioned with no marketing plan: immediately ask about launch strategy
- Waitlist or early access mentioned: design the full phased funnel, not just a landing page
- Product Hunt considered: trigger the full PH playbook with the 4-week timeline
- Post-launch silence: suggest momentum content if nothing published after day 3
- Pricing change planned: treat it as a Tier 2 launch opportunity

---

## Related Skills

| Skill | Use When |
|-------|----------|
| **email-sequence** | Building launch announcement and post-launch onboarding sequences |
| **social-media-manager** | Coordinating social strategy around the launch |
| **content-creator** | Writing blog posts and landing page copy for the launch |
| **analytics-tracking** | Setting up tracking for launch conversion metrics |
| **ab-test-setup** | Testing launch page variants |

---

## Troubleshooting

| Symptom | Likely Cause | Resolution |
|---------|-------------|------------|
| Launch day traffic spike but near-zero signups | Landing page value proposition unclear or CTA buried | Audit landing page: headline must answer "what is this and why should I care" in 5 seconds |
| Product Hunt submission gets below 50 upvotes | No community warm-up, poor listing assets, or launched on wrong day | Follow 4-week PH playbook; launch Tue-Thu; ensure gallery images show product, not marketing graphics |
| Post-launch momentum dies by day 3 | No post-launch content plan; team assumes launch day is the end | Execute 30-day post-launch plan with follow-up content, testimonials, and retargeting |
| Email open rate below 15% on launch announcement | Subject line not compelling or list not segmented by engagement | A/B test subject lines; segment by engagement (send to most engaged first, then broader list) |
| Support team overwhelmed on launch day | Not briefed on new feature or FAQ not prepared | Include support briefing and FAQ creation in pre-launch checklist, minimum 1 week before launch |
| Metrics dashboard shows no data on launch day | Tracking not configured or UTMs not applied to launch URLs | Include tracking verification in final QA checklist, test all conversion events in staging first |

---

## Success Criteria

- Launch readiness score above 80% on readiness checker before go-live decision
- Launch day traffic at least 5x normal daily traffic
- Signup/conversion rate between 5-15% of launch day visitors
- 50+ social shares/mentions on launch day
- Product Hunt top 5 finish (for Tier 1 launches using PH channel)
- Post-launch 30-day signups at 2-5x monthly average
- Activation rate of launch cohort matches or exceeds normal cohort within 10%

---

## Scope & Limitations

**In Scope:** Phased launch planning (Tier 1-4), ORB channel strategy, Product Hunt playbook, launch day execution checklists, post-launch momentum campaigns, waitlist management, launch metrics tracking, launch readiness assessment.

**Out of Scope:** Product development and feature readiness (engineering responsibility), pricing strategy (see marketing-strategy-pmm skill), ongoing marketing operations (see marketing-ops skill), press and media relationship building (PR function).

**Limitations:** Launch success depends on product-market fit — no launch strategy compensates for a product that does not solve a real problem. Product Hunt effectiveness varies by product category; B2C and developer tools typically perform better than enterprise B2B. Post-launch metrics require 30 days minimum for meaningful assessment.

---

## Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `scripts/launch_readiness_checker.py` | Assess go/no-go readiness across positioning, assets, channels, team, tracking | `python scripts/launch_readiness_checker.py checklist.json --tier 1` |
| `scripts/launch_timeline_generator.py` | Generate week-by-week launch timeline with tasks and owners | `python scripts/launch_timeline_generator.py --date 2026-04-15 --tier 1` |
| `scripts/launch_metrics_tracker.py` | Track actual vs target metrics across pre-launch, launch day, and post-launch | `python scripts/launch_metrics_tracker.py metrics.json --demo` |

---

## marketing-analyst

Source path: `references/marketing/marketing-analyst/SKILL.md`

# Marketing Analyst

The agent operates as a senior marketing analyst, delivering campaign performance analysis, multi-touch attribution, marketing mix modeling, ROI measurement, and data-driven budget optimization.

## Clarify First

Before running the analysis, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Campaigns/channels in scope** — which campaigns or channels and the date range (defines the dataset and report boundaries)
- [ ] **KPIs and their targets** — CPL, CAC, ROAS, pipeline, revenue, each with a target and a data source (drives the target-vs-actual performance table)
- [ ] **Sales-cycle length** — short vs long B2B cycle (determines attribution model and whether to report pipeline vs closed revenue)
- [ ] **Report audience** — exec summary vs ops deep-dive (sets the altitude and which sections matter most)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

1. **Define measurement objectives** - Identify which campaigns, channels, or initiatives require analysis. Confirm KPIs (CPL, CAC, ROAS, pipeline, revenue). Checkpoint: every KPI has a target and a data source.
2. **Collect and validate data** - Pull campaign data from ad platforms, CRM, and analytics tools. Validate completeness and consistency. Checkpoint: no channel has >5% missing data.
3. **Run attribution analysis** - Apply multiple attribution models (first-touch, last-touch, linear, time-decay, position-based) and compare channel credit allocation. Checkpoint: results are compared across at least 3 models.
4. **Analyze campaign performance** - Calculate ROI, ROAS, CPL, CAC, and conversion rates per campaign. Identify top and bottom performers. Checkpoint: performance table includes target vs. actual for every metric.
5. **Optimize budget allocation** - Use marketing mix modeling or ROI data to recommend budget shifts. Checkpoint: reallocation recommendations are backed by expected ROI per channel.
6. **Build executive report** - Summarize headline metrics, wins, challenges, and next-period focus. Checkpoint: report passes the "so what" test (every data point has an actionable insight).

## Marketing Metrics Reference

### Acquisition Metrics

| Metric | Formula | Benchmark |
|--------|---------|-----------|
| CPL | Spend / Leads | Varies by industry |
| CAC | S&M Spend / New Customers | LTV/CAC > 3:1 |
| CPA | Spend / Acquisitions | Target specific |
| ROAS | Revenue / Ad Spend | > 4:1 |

### Engagement Metrics

| Metric | Formula | Benchmark |
|--------|---------|-----------|
| Engagement Rate | Engagements / Impressions | 1-5% |
| CTR | Clicks / Impressions | 0.5-2% |
| Conversion Rate | Conversions / Visitors | 2-5% |
| Bounce Rate | Single-page sessions / Total | < 50% |

### Retention Metrics

| Metric | Formula | Benchmark |
|--------|---------|-----------|
| Churn Rate | Lost Customers / Total | < 5% monthly |
| NRR | (MRR - Churn + Expansion) / MRR | > 100% |
| LTV | ARPU x Gross Margin x Lifetime | 3x+ CAC |

## Attribution Modeling

### Model Comparison

The agent should apply multiple models and compare results to identify channel over/under-valuation:

| Model | Logic | Best For |
|-------|-------|----------|
| First-touch | 100% credit to first interaction | Measuring awareness channels |
| Last-touch | 100% credit to final interaction | Measuring conversion channels |
| Linear | Equal credit across all touches | Balanced view of full journey |
| Time-decay | More credit to recent touches | Short sales cycles |
| Position-based | 40% first, 40% last, 20% middle | Most B2B scenarios |

### Attribution Calculator

```python
def calculate_attribution(touchpoints, model='position'):
    """Calculate attribution credit for a conversion journey.

    Args:
        touchpoints: List of channel names in order of interaction
        model: One of 'first', 'last', 'linear', 'time_decay', 'position'

    Returns:
        Dict mapping channel -> credit (sums to 1.0)

    Example:
        >>> calculate_attribution(['paid_search', 'email', 'organic', 'direct'], 'position')
        {'paid_search': 0.4, 'email': 0.1, 'organic': 0.1, 'direct': 0.4}
    """
    n = len(touchpoints)
    credits = {}

    if model == 'first':
        credits[touchpoints[0]] = 1.0
    elif model == 'last':
        credits[touchpoints[-1]] = 1.0
    elif model == 'linear':
        for tp in touchpoints:
            credits[tp] = credits.get(tp, 0) + 1.0 / n
    elif model == 'time_decay':
        decay = 0.7
        total = sum(decay ** i for i in range(n))
        for i, tp in enumerate(reversed(touchpoints)):
            credits[tp] = credits.get(tp, 0) + (decay ** i) / total
    elif model == 'position':
        if n == 1:
            credits[touchpoints[0]] = 1.0
        elif n == 2:
            credits[touchpoints[0]] = 0.5
            credits[touchpoints[-1]] = credits.get(touchpoints[-1], 0) + 0.5
        else:
            credits[touchpoints[0]] = 0.4
            credits[touchpoints[-1]] = credits.get(touchpoints[-1], 0) + 0.4
            for tp in touchpoints[1:-1]:
                credits[tp] = credits.get(tp, 0) + 0.2 / (n - 2)

    return credits
```

## Example: Campaign Analysis Report

```markdown
# Campaign Analysis: Q1 2026 Product Launch

## Performance Summary
| Metric       | Target  | Actual  | vs Target |
|--------------|---------|---------|-----------|
| Impressions  | 500K    | 612K    | +22%      |
| Clicks       | 25K     | 28.4K   | +14%      |
| Leads        | 1,200   | 1,350   | +13%      |
| MQLs         | 360     | 410     | +14%      |
| Pipeline     | $1.2M   | $1.45M  | +21%      |
| Revenue      | $380K   | $425K   | +12%      |

## Channel Breakdown
| Channel      | Spend   | Leads | CPL   | Pipeline |
|--------------|---------|-------|-------|----------|
| Paid Search  | $45K    | 520   | $87   | $580K    |
| LinkedIn Ads | $30K    | 310   | $97   | $420K    |
| Email        | $5K     | 380   | $13   | $350K    |
| Content/SEO  | $8K     | 140   | $57   | $100K    |

## Key Insight
Email delivers lowest CPL ($13) and strong pipeline. Recommend shifting
10% of LinkedIn budget to email nurture sequences for Q2.
```

## Budget Optimization Framework

```
Budget Allocation Recommendation
  Channel        Current    Optimal    Change    Expected ROI
  Paid Search    30%        35%        +5%       4.2x
  Social Paid    25%        20%        -5%       2.8x
  Display        15%        10%        -5%       1.5x
  Email          10%        15%        +5%       8.5x
  Content        10%        12%        +2%       5.2x
  Events         10%        8%         -2%       2.2x

  Projected Impact: +15% pipeline with same budget
```

## A/B Test Statistical Analysis

```python
from scipy import stats
import numpy as np

def analyze_ab_test(control_conv, control_total, treatment_conv, treatment_total, alpha=0.05):
    """Analyze A/B test for statistical significance.

    Example:
        >>> result = analyze_ab_test(150, 5000, 195, 5000)
        >>> result['significant']
        True
        >>> f"{result['lift_pct']:.1f}%"
        '30.0%'
    """
    p_c = control_conv / control_total
    p_t = treatment_conv / treatment_total
    p_pool = (control_conv + treatment_conv) / (control_total + treatment_total)
    se = np.sqrt(p_pool * (1 - p_pool) * (1/control_total + 1/treatment_total))
    z = (p_t - p_c) / se
    p_value = 2 * (1 - stats.norm.cdf(abs(z)))

    return {
        'control_rate': p_c,
        'treatment_rate': p_t,
        'lift_pct': ((p_t - p_c) / p_c) * 100,
        'p_value': p_value,
        'significant': p_value < alpha,
    }
```

## Scripts

```bash
# Campaign analyzer
python scripts/campaign_analyzer.py --data campaigns.csv --output report.html

# Attribution calculator
python scripts/attribution.py --touchpoints journeys.csv --model position

# ROI calculator
python scripts/roi_calculator.py --spend spend.csv --revenue revenue.csv

# Forecast generator
python scripts/forecast.py --historical data.csv --periods 6
```

## Reference Materials

- `references/metrics.md` - Marketing metrics guide
- `references/attribution.md` - Attribution modeling
- `references/reporting.md` - Reporting best practices
- `references/forecasting.md` - Forecasting methods

---

## Troubleshooting

| Symptom | Likely Cause | Resolution |
|---------|-------------|------------|
| Attribution models give wildly different channel credit allocations | No single model captures full truth; each has structural bias | Run 3+ models (first-touch, last-touch, position-based) and compare; use position-based as default for B2B |
| ROAS calculations look great but pipeline is flat | Revenue attribution counting existing customers, not new pipeline | Separate new business attribution from expansion; report pipeline separately from revenue |
| Marketing reports and sales reports show different lead counts | Marketing counts MQLs at form fill, sales counts at CRM entry with different criteria | Align on shared definitions: document exact MQL, SQL, and opportunity criteria in a shared SLA |
| Forecast consistently over-predicts by 20%+ | Model uses linear extrapolation without accounting for seasonality or saturation | Apply dampening factors for longer forecasts; use ensemble method (linear + growth rate + moving average) |
| Executive dashboard takes too long to build each month | Manual data pulls from 5+ platforms with different schemas | Automate data collection; standardize UTM and naming conventions so cross-platform analysis is consistent |
| Channel ROI is negative but still generating pipeline | Long B2B sales cycle means revenue attribution has not caught up to spend | Use pipeline-based attribution for channels with 3+ month sales cycles rather than closed-won revenue |

---

## Success Criteria

- Multi-touch attribution model deployed comparing 3+ models with documented channel credit differences
- Monthly marketing report delivered within 3 business days of month close
- Budget reallocation recommendations backed by per-channel ROI data and implemented quarterly
- Forecast accuracy within 15% of actual for 3-month projections
- Campaign performance reports include target vs actual for every KPI
- Every data point in executive reports has an actionable insight (passes "so what" test)
- Channel data completeness above 95% (no channel has >5% missing data)

---

## Scope & Limitations

**In Scope:** Campaign performance analysis, multi-touch attribution modeling, marketing mix optimization, ROI/ROAS calculation, budget allocation recommendations, executive reporting, cohort retention analysis, marketing forecasting.

**Out of Scope:** Analytics implementation and tracking setup (see analytics-tracking skill), product analytics (see product-team skills), financial modeling beyond marketing metrics (see finance skill), data engineering and warehouse management.

**Limitations:** Attribution models are approximations — no model perfectly captures the buyer journey, especially for high-touch B2B sales. Forecasting uses historical extrapolation with dampening; it does not account for market disruptions or competitive moves. Budget optimization assumes linear channel scaling; most channels have diminishing returns at scale.

---

## Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `scripts/channel_mix_optimizer.py` | Analyze channel performance and recommend optimal budget allocation | `python scripts/channel_mix_optimizer.py channels.json --budget 100000 --demo` |
| `scripts/cohort_analyzer.py` | Analyze user retention by cohort, identify trends and best/worst performers | `python scripts/cohort_analyzer.py cohort_data.json --demo` |
| `scripts/marketing_forecast_generator.py` | Generate marketing forecasts using linear, growth rate, and ensemble methods | `python scripts/marketing_forecast_generator.py historical.json --periods 6` |

---

## marketing-context

Source path: `references/marketing/marketing-context/SKILL.md`

# Marketing Context

The foundational context document that every marketing skill reads before starting. Captures positioning, ICP, competitive landscape, brand voice, and customer language in one place.

---

## Table of Contents

- [Keywords](#keywords)
- [Quick Start](#quick-start)
- [Core Workflows](#core-workflows)
- [Context Sections](#context-sections)
- [Customer Research Methodology](#customer-research-methodology)
- [Competitive Analysis Framework](#competitive-analysis-framework)
- [Switching Dynamics (JTBD Four Forces)](#switching-dynamics-jtbd-four-forces)
- [Context Maintenance](#context-maintenance)
- [Best Practices](#best-practices)
- [Integration Points](#integration-points)

---

## Keywords

marketing context, brand voice, target audience, ICP, ideal customer profile, positioning, customer insights, competitive analysis, market research, customer language, brand personality, buyer persona, product marketing, go-to-market, messaging framework, competitive landscape, objection handling, proof points, switching dynamics, value proposition

---

## Quick Start

### Auto-Draft from Codebase

1. Study the repository: README, landing pages, marketing copy, about pages, docs
2. Draft a V1 context document based on what exists
3. Present the draft and ask: "What needs correcting? What is missing?"
4. Iterate through corrections until the document is accurate

### Guided Interview

1. Walk through each section conversationally, one at a time
2. Ask focused questions (not all at once)
3. Capture exact customer language, not polished summaries
4. Validate each section before moving to the next

### Update Existing Context

1. Read the current context document
2. Summarize what is captured
3. Ask which sections need updating
4. Make targeted updates while preserving accurate sections

---

## Core Workflows

### Workflow 1: Build Context from Scratch

**Step 1: Gather Product Foundation**

```markdown
## Product Overview
- One-line description: [What it is in one sentence]
- What it does: [2-3 sentences explaining the product]
- Product category: [The "shelf" — how customers search for you]
- Product type: [SaaS / Marketplace / E-commerce / Service / Platform]
- Business model: [Subscription / Freemium / Usage-based / One-time]
- Pricing: [Starting price / tier structure]
- Stage: [Pre-launch / Early / Growth / Scale / Mature]
```

**Step 2: Define Target Audience**

```markdown
## Target Audience
- Target company type: [Industry, size, stage, geography]
- Target decision-makers: [Roles, departments, seniority levels]
- Primary use case: [The main problem you solve]
- Jobs to be done (3-5):
  1. [Job]: [What they hire your product to do]
  2. [Job]: [What they hire your product to do]
  3. [Job]: [What they hire your product to do]
- Specific scenarios: [2-3 situations where they need you most]
```

**Step 3: Build Buyer Personas**

For each stakeholder involved in the buying decision:

```markdown
## Persona: [Role Name]
- Title: [Job title]
- Role in purchase: [User / Champion / Decision Maker / Financial Buyer / Technical Influencer]
- What they care about: [Their top 3 priorities]
- Their challenge: [Specific problem related to your product]
- Value you promise them: [What you deliver to this persona]
- Language they use: [Exact phrases they use to describe their problem]
- Where they research: [Channels, communities, publications they trust]
```

**Step 4: Document Problems and Pain Points**

```markdown
## Problems & Pain Points
- Core challenge: [What customers face before finding you]
- Why current solutions fail: [Specific shortcomings of alternatives]
- Cost of the problem:
  - Time cost: [Hours/week wasted]
  - Financial cost: [Money lost or spent inefficiently]
  - Opportunity cost: [What they cannot do while dealing with this]
- Emotional tension: [Stress, fear, frustration, doubt they experience]
```

**Step 5: Map Competitive Landscape**

```markdown
## Competitive Landscape

### Direct Competitors (same solution, same problem)
| Competitor | Positioning | Weakness for Our ICP |
|-----------|------------|---------------------|
| [Name] | [How they position] | [Where they fall short] |

### Secondary Competitors (different solution, same problem)
| Competitor | Their Approach | Why Ours is Better |
|-----------|---------------|-------------------|
| [Name] | [Their method] | [Our advantage] |

### Indirect Competitors (do nothing, spreadsheets, manual process)
| Alternative | Why Customers Use It | Why They Should Switch |
|------------|---------------------|---------------------|
| [Name] | [Inertia reason] | [Switching benefit] |
```

**Step 6: Define Differentiation**

```markdown
## Differentiation
- Key differentiators (3-5):
  1. [Capability]: [What we do that alternatives cannot]
  2. [Capability]: [What we do that alternatives cannot]
  3. [Capability]: [What we do that alternatives cannot]
- How we solve it differently: [Our unique approach or mechanism]
- Why that matters: [Benefit of our approach vs. alternatives]
- Why customers choose us: [Top 3 reasons from actual customer feedback]
```

**Step 7: Capture Objections and Anti-Personas**

```markdown
## Objections
| Objection | Frequency | Response |
|-----------|-----------|----------|
| "[Objection 1]" | Common | [How to address it] |
| "[Objection 2]" | Occasional | [How to address it] |
| "[Objection 3]" | Rare but important | [How to address it] |

## Anti-Personas (Who is NOT a Good Fit)
- [Type]: [Why they should not buy]
- [Type]: [Why they should not buy]
```

**Step 8: Document Customer Language**

```markdown
## Customer Language (Verbatim)
- How they describe the problem:
  - "[Exact quote from customer]"
  - "[Exact quote from customer]"
- How they describe our solution:
  - "[Exact quote from customer]"
  - "[Exact quote from customer]"
- Words TO use: [List of customer-approved terms]
- Words to AVOID: [Terms that confuse or alienate]
- Glossary: [Product-specific terms with definitions]
```

**Step 9: Establish Brand Voice**

```markdown
## Brand Voice
- Tone: [Professional / Casual / Playful / Authoritative]
- Communication style: [Direct / Conversational / Technical / Storytelling]
- Personality (3-5 adjectives): [e.g., Confident, Clear, Warm]
- Voice DOs: [What we always do in writing]
- Voice DON'Ts: [What we never do in writing]
- Example paragraph: [A paragraph that perfectly captures our voice]
```

**Step 10: Compile Proof Points**

```markdown
## Proof Points
- Key metrics: [Numbers we cite regularly]
- Notable customers: [Logos we have permission to use]
- Testimonial snippets:
  - "[Quote]" — [Name], [Title] at [Company]
  - "[Quote]" — [Name], [Title] at [Company]
- Awards and recognition: [Current, with year]
- Certifications: [Active compliance certifications]
```

**Step 11: Content and SEO Context**

```markdown
## Content & SEO Context
- Target keywords by cluster:
  - Cluster 1: [keyword 1], [keyword 2], [keyword 3]
  - Cluster 2: [keyword 1], [keyword 2], [keyword 3]
- Writing examples (best-performing pieces):
  - [URL 1]: [Why it works well]
  - [URL 2]: [Why it works well]
- Content tone: [Educational / Authoritative / Conversational]
- Preferred content length: [Short-form / Long-form / Mix]
```

**Step 12: Define Goals**

```markdown
## Goals
- Primary business goal: [What success looks like]
- Key conversion action: [What you want people to do]
- Current metrics: [Baseline numbers if available]
- Target metrics: [What you are working toward]
```

---

## Customer Research Methodology

### Research Sources Ranked by Quality

| Source | Quality | What You Get | Time Required |
|--------|---------|-------------|---------------|
| Customer interviews (6-10) | Highest | Deep understanding of language, pain, decision process | 6-10 hours |
| Sales call recordings | High | Pre-purchase questions, objections, language | 2-4 hours |
| Support ticket analysis | High | Post-purchase confusion, unmet expectations | 1-2 hours |
| Product reviews (yours + competitors) | High | Candid praise and complaints | 1-2 hours |
| Customer surveys | Medium-High | Quantitative validation of qualitative findings | 2-3 hours |
| Community forums | Medium | Questions, debates, misconceptions | 1-2 hours |
| Competitor content analysis | Medium | Positioning gaps, messaging angles | 2-3 hours |
| Social listening | Medium | Trending topics, sentiment, language | 1 hour |
| Analytics data | Medium | Behavioral patterns, not motivations | 1 hour |

### Interview Question Framework

**Opening (establish context):**
- "Walk me through how you handled [problem area] before using our product."
- "What was the moment you decided to look for a solution?"

**Problem exploration:**
- "What was the hardest part about [problem area]?"
- "What did you try before finding us?"
- "What did those alternatives get wrong?"

**Decision process:**
- "What made you choose us over the alternatives?"
- "What almost stopped you from signing up?"
- "Who else was involved in the decision?"

**Language capture:**
- "How would you explain what we do to a colleague?"
- "If you were recommending us, what would you say?"

**Outcome validation:**
- "What has changed since you started using us?"
- "Can you put a number on the impact?"

---

## Competitive Analysis Framework

### Three-Layer Analysis

**Layer 1: Positioning**
- How do they describe themselves? (Tagline, hero copy, meta description)
- What category do they claim? (The "shelf" they put themselves on)
- Who do they target? (ICP signals from their copy, pricing, case studies)

**Layer 2: Messaging**
- What benefits do they lead with?
- What proof points do they emphasize?
- What objections do they proactively address?
- What is conspicuously absent from their messaging?

**Layer 3: Execution**
- Content: What topics do they cover? What formats? What frequency?
- Channels: Where are they active? (SEO, social, paid, events)
- Social proof: Who are their reference customers?
- Pricing: How are they positioned on price?

### Competitive Positioning Map

```
                    Premium
                      |
         Enterprise   |   Innovator
         (Salesforce)  |   (Your positioning?)
                      |
    Simple ———————————+——————————— Complex
                      |
         Budget       |   Technical
         (Competitor B)|  (Competitor C)
                      |
                   Affordable
```

---

## Switching Dynamics (JTBD Four Forces)

Understanding why customers switch (or do not) is critical for messaging:

### The Four Forces

```
PUSH ————————————> <———————————— HABIT
(Frustration with        (Comfort with
 current solution)        current approach)

PULL ————————————> <———————————— ANXIETY
(Attraction to           (Fear about
 your product)            switching)
```

**Push (maximize in messaging):**
- What frustrations drive them away from the current solution?
- What is the breaking point that triggers the search?

**Pull (amplify in messaging):**
- What attracts them to your product specifically?
- What is the "aha moment" they imagine?

**Habit (address in messaging):**
- What keeps them stuck with the current approach?
- What switching costs (real and perceived) exist?

**Anxiety (reduce in messaging):**
- What worries them about switching?
- What could go wrong during the transition?
- How do you make switching feel safe?

---

## Context Maintenance

### Freshness Rules

| Section | Review Frequency | Staleness Signal |
|---------|-----------------|------------------|
| Product overview | When features change | New features not reflected |
| Target audience | Quarterly | Win/loss data shows new segments |
| Competitive landscape | Monthly | New competitors emerging, positioning shifts |
| Customer language | Quarterly | New patterns in sales calls and reviews |
| Proof points | Monthly | New case studies, metrics, logos available |
| Brand voice | Semi-annually | Brand evolution or rebranding |
| Goals | Quarterly | Business priorities shift |

### Update Triggers

Flag a context review when:
- A major product launch changes positioning
- Win rate shifts significantly (new objections emerging)
- A new competitor enters the market
- Customer language patterns change (new terminology)
- The ICP shifts (moving upmarket, new verticals)
- Proof points become outdated (old metrics, former customer logos)

---

## Best Practices

1. **Be specific, not polished** — "I wish I knew this before we migrated" is more useful than "Customers value our migration support." Capture exact words.

2. **Validate with real customers** — Every positioning claim should be traceable to customer feedback. If customers do not say it, it might not be true.

3. **Update incrementally** — Do not wait for a full overhaul. Update individual sections as new information becomes available.

4. **Include anti-personas** — Knowing who is NOT a good fit prevents wasted marketing spend on the wrong audience.

5. **Capture switching dynamics** — Understanding push/pull/habit/anxiety produces better messaging than listing features.

6. **Keep it usable** — A 50-page context document nobody reads is worse than a 5-page one everyone references. Be concise.

7. **Document customer language verbatim** — Do not paraphrase. The exact words customers use should appear in your copy.

8. **Link to proof** — Every claim should reference its source (customer interview, survey, case study, metric).

9. **Share across teams** — Marketing context should be accessible to sales, product, and customer success. Shared language improves alignment.

10. **Review quarterly minimum** — Set a calendar reminder. Stale context produces stale messaging.

---

## Integration Points

- **Copywriting** — Reads brand voice and customer language from this context for page copy.
- **Content Strategy** — Reads target keywords, personas, and competitive landscape for topic planning.
- **Ad Creative** — Reads ICP, value proposition, and proof points for ad messaging.
- **Cold Email** — Reads ICP, pain points, and customer language for outreach personalization.
- **Marketing Ops** — Routes marketing questions using context as the foundation.
- **Social Content** — Reads brand voice and audience details for platform-specific content.
- **Brand Guidelines** — Aligns brand voice and personality between context and visual standards.
- **Paid Ads** — Reads audience targeting details and value proposition for campaign setup.

---

## Troubleshooting

| Symptom | Likely Cause | Resolution |
|---------|-------------|------------|
| Marketing copy sounds generic across all channels | Context document missing customer language section with verbatim quotes | Conduct 6-10 customer interviews; capture exact phrases used to describe problem and solution |
| Sales and marketing using different messaging | Context document exists but not shared cross-functionally, or multiple conflicting versions | Consolidate into single source of truth; share with sales, product, and CS; version-control updates |
| ICP keeps expanding until it includes everyone | No anti-persona defined; pressure to broaden targeting | Document who is NOT a good fit and why; validate ICP against top 20% customers by LTV |
| Competitive positioning feels reactive | Landscape section only updated after losing deals, not proactively | Set monthly competitive review cadence; monitor competitor websites, pricing, and job postings |
| Context document becomes stale within 2 months | No update triggers or review schedule defined | Assign section owners; set quarterly review calendar; flag automatic updates on product launches or ICP shifts |
| New team members cannot find or understand the context | Document too long (50+ pages) or buried in wiki structure | Keep context under 10 pages; use templates with clear headers; include in onboarding checklist |

---

## Success Criteria

- Context completeness score above 80% on context_completeness_checker.py (all 12 sections present with minimum depth)
- Every positioning claim traceable to specific customer feedback or data source
- Customer language section contains 10+ verbatim quotes (not paraphrased summaries)
- Context document reviewed and updated at least quarterly, with change log
- 100% of marketing skills reference context before starting work
- ICP definition validated against actual customer data: A-fit customers have lowest churn and fastest close
- Anti-personas defined with clear exclusion criteria to prevent wasted marketing spend

---

## Scope & Limitations

**In Scope:** Product positioning documentation, ICP definition and validation, buyer persona creation, competitive analysis framework, customer language capture, brand voice establishment, proof point compilation, objection handling, switching dynamics (JTBD Four Forces), content and SEO context, context maintenance and freshness management.

**Out of Scope:** Brand visual identity (see brand-guidelines skill), marketing execution and campaign management (see marketing-ops skill), product strategy and roadmap (see product-team skills), market sizing and TAM analysis (see c-level-advisor skills).

**Limitations:** Marketing context is only as accurate as the inputs — garbage in, garbage out. Context derived solely from internal assumptions (without customer interviews) will have blind spots. Competitive analysis is point-in-time; markets shift and require continuous monitoring.

---

## Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `scripts/icp_fit_scorer.py` | Score prospects against ICP criteria with A/B/C/D grading | `python scripts/icp_fit_scorer.py prospects.json --icp icp_config.json --demo` |
| `scripts/competitive_landscape_mapper.py` | Map competitive positioning, features, pricing, and identify gaps | `python scripts/competitive_landscape_mapper.py competitors.json --demo` |
| `scripts/context_completeness_checker.py` | Audit marketing context document for missing or thin sections | `python scripts/context_completeness_checker.py context.md --json` |

---

## marketing-demand-acquisition

Source path: `references/marketing/marketing-demand-acquisition/SKILL.md`

# Marketing Demand & Acquisition

Acquisition playbook for Series A+ startups scaling internationally (EU/US/Canada) with hybrid PLG/Sales-Led motion.

## Table of Contents

- [Role Coverage](#role-coverage)
- [Core KPIs](#core-kpis)
- [Demand Generation Framework](#demand-generation-framework)
- [Paid Media Channels](#paid-media-channels)
- [SEO Strategy](#seo-strategy)
- [Partnerships](#partnerships)
- [Attribution](#attribution)
- [Tools](#tools)
- [References](#references)

---

## Role Coverage

| Role | Focus Areas |
|------|-------------|
| Demand Generation Manager | Multi-channel campaigns, pipeline generation |
| Paid Media Marketer | Paid search/social/display optimization |
| SEO Manager | Organic acquisition, technical SEO |
| Partnerships Manager | Co-marketing, channel partnerships |

---

## Core KPIs

**Demand Gen:** MQL/SQL volume, cost per opportunity, marketing-sourced pipeline $, MQL→SQL rate

**Paid Media:** CAC, ROAS, CPL, CPA, channel efficiency ratio

**SEO:** Organic sessions, non-brand traffic %, keyword rankings, technical health score

**Partnerships:** Partner-sourced pipeline $, partner CAC, co-marketing ROI

---

## Demand Generation Framework

### Funnel Stages

| Stage | Tactics | Target |
|-------|---------|--------|
| TOFU | Paid social, display, content syndication, SEO | Brand awareness, traffic |
| MOFU | Paid search, retargeting, gated content, email nurture | MQLs, demo requests |
| BOFU | Brand search, direct outreach, case studies, trials | SQLs, pipeline $ |

### Campaign Planning Workflow

1. Define objective, budget, duration, audience
2. Select channels based on funnel stage
3. Create campaign in HubSpot with proper UTM structure
4. Configure lead scoring and assignment rules
5. Launch with test budget, validate tracking
6. **Validation:** UTM parameters appear in HubSpot contact records

### UTM Structure

```
utm_source={channel}       // linkedin, google, meta
utm_medium={type}          // cpc, display, email
utm_campaign={campaign-id} // q1-2025-linkedin-enterprise
utm_content={variant}      // ad-a, email-1
utm_term={keyword}         // [paid search only]
```

---

## Paid Media Channels

### Channel Selection Matrix

| Channel | Best For | CAC Range | Series A Priority |
|---------|----------|-----------|-------------------|
| LinkedIn Ads | B2B, Enterprise, ABM | $150-400 | High |
| Google Search | High-intent, BOFU | $80-250 | High |
| Google Display | Retargeting | $50-150 | Medium |
| Meta Ads | SMB, visual products | $60-200 | Medium |

### LinkedIn Ads Setup

1. Create campaign group for initiative
2. Structure: Awareness → Consideration → Conversion campaigns
3. Target: Director+, 50-5000 employees, relevant industries
4. Start $50/day per campaign
5. Scale 20% weekly if CAC < target
6. **Validation:** LinkedIn Insight Tag firing on all pages

### Google Ads Setup

1. Prioritize: Brand → Competitor → Solution → Category keywords
2. Structure ad groups with 5-10 tightly themed keywords
3. Create 3 responsive search ads per ad group (15 headlines, 4 descriptions)
4. Maintain negative keyword list (100+)
5. Start Manual CPC, switch to Target CPA after 50+ conversions
6. **Validation:** Conversion tracking firing, search terms reviewed weekly

### Budget Allocation (Series A, $40k/month)

| Channel | Budget | Expected SQLs |
|---------|--------|---------------|
| LinkedIn | $15k | 10 |
| Google Search | $12k | 20 |
| Google Display | $5k | 5 |
| Meta | $5k | 8 |
| Partnerships | $3k | 5 |

See [campaign-templates.md](references/campaign-templates.md) for detailed structures.

---

## SEO Strategy

### Technical Foundation Checklist

- [ ] XML sitemap submitted to Search Console
- [ ] Robots.txt configured correctly
- [ ] HTTPS enabled
- [ ] Page speed >90 mobile
- [ ] Core Web Vitals passing
- [ ] Structured data implemented
- [ ] Canonical tags on all pages
- [ ] Hreflang tags for international
- **Validation:** Run Screaming Frog crawl, zero critical errors

### Keyword Strategy

| Tier | Type | Volume | Priority |
|------|------|--------|----------|
| 1 | High-intent BOFU | 100-1k | First |
| 2 | Solution-aware MOFU | 500-5k | Second |
| 3 | Problem-aware TOFU | 1k-10k | Third |

### On-Page Optimization

1. URL: Include primary keyword, 3-5 words
2. Title tag: Primary keyword + brand (60 chars)
3. Meta description: CTA + value prop (155 chars)
4. H1: Match search intent (one per page)
5. Content: 2000-3000 words for comprehensive topics
6. Internal links: 3-5 relevant pages
7. **Validation:** Google Search Console shows page indexed, no errors

### Link Building Priorities

1. Digital PR (original research, industry reports)
2. Guest posting (DA 40+ sites only)
3. Partner co-marketing (complementary SaaS)
4. Community engagement (Reddit, Quora)

---

## Partnerships

### Partnership Tiers

| Tier | Type | Effort | ROI |
|------|------|--------|-----|
| 1 | Strategic integrations | High | Very high |
| 2 | Affiliate partners | Medium | Medium-high |
| 3 | Customer referrals | Low | Medium |
| 4 | Marketplace listings | Medium | Low-medium |

### Partnership Workflow

1. Identify partners with overlapping ICP, no competition
2. Outreach with specific integration/co-marketing proposal
3. Define success metrics, revenue model, term
4. Create co-branded assets and partner tracking
5. Enable partner sales team with demo training
6. **Validation:** Partner UTM tracking functional, leads routing correctly

### Affiliate Program Setup

1. Select platform (PartnerStack, Impact, Rewardful)
2. Configure commission structure (20-30% recurring)
3. Create affiliate enablement kit (assets, links, content)
4. Recruit through outbound, inbound, events
5. **Validation:** Test affiliate link tracks through to conversion

See [international-playbooks.md](references/international-playbooks.md) for regional tactics.

---

## Attribution

### Model Selection

| Model | Use Case |
|-------|----------|
| First-Touch | Awareness campaigns |
| Last-Touch | Direct response |
| W-Shaped (40-20-40) | Hybrid PLG/Sales (recommended) |

### HubSpot Attribution Setup

1. Navigate to Marketing → Reports → Attribution
2. Select W-Shaped model for hybrid motion
3. Define conversion event (deal created)
4. Set 90-day lookback window
5. **Validation:** Run report for past 90 days, all channels show data

### Weekly Metrics Dashboard

| Metric | Target |
|--------|--------|
| MQLs | Weekly target |
| SQLs | Weekly target |
| MQL→SQL Rate | >15% |
| Blended CAC | <$300 |
| Pipeline Velocity | <60 days |

See [attribution-guide.md](references/attribution-guide.md) for detailed setup.

---

## Tools

### scripts/

| Script | Purpose | Usage |
|--------|---------|-------|
| `calculate_cac.py` | Calculate blended and channel CAC | `python scripts/calculate_cac.py --spend 40000 --customers 50` |

### HubSpot Integration

- Campaign tracking with UTM parameters
- Lead scoring and MQL/SQL workflows
- Attribution reporting (multi-touch)
- Partner lead routing

See [hubspot-workflows.md](references/hubspot-workflows.md) for workflow templates.

---

## References

| File | Content |
|------|---------|
| [hubspot-workflows.md](references/hubspot-workflows.md) | Lead scoring, nurture, assignment workflows |
| [campaign-templates.md](references/campaign-templates.md) | LinkedIn, Google, Meta campaign structures |
| [international-playbooks.md](references/international-playbooks.md) | EU, US, Canada market tactics |
| [attribution-guide.md](references/attribution-guide.md) | Multi-touch attribution, dashboards, A/B testing |

---

## Channel Benchmarks (B2B SaaS Series A)

| Metric | LinkedIn | Google Search | SEO | Email |
|--------|----------|---------------|-----|-------|
| CTR | 0.4-0.9% | 2-5% | 1-3% | 15-25% |
| CVR | 1-3% | 3-7% | 2-5% | 2-5% |
| CAC | $150-400 | $80-250 | $50-150 | $20-80 |
| MQL→SQL | 10-20% | 15-25% | 12-22% | 8-15% |

---

## MQL→SQL Handoff

### SQL Criteria

```
Required:
✅ Job title: Director+ or budget authority
✅ Company size: 50-5000 employees
✅ Budget: $10k+ annual
✅ Timeline: Buying within 90 days
✅ Engagement: Demo requested or high-intent action
```

### SLA

| Handoff | Target |
|---------|--------|
| SDR responds to MQL | 4 hours |
| AE books demo with SQL | 24 hours |
| First demo scheduled | 3 business days |

**Validation:** Test lead through workflow, verify notifications and routing.

## Proactive Triggers

- **Over-relying on one channel** -- Single-channel dependency is a business risk. Diversify acquisition across 3+ channels.
- **No lead scoring** -- Not all leads are equal. Route to revenue-operations for scoring setup.
- **CAC exceeding LTV** -- Demand gen is unprofitable. Optimize or cut underperforming channels.
- **No nurture for non-ready leads** -- 80% of leads aren't ready to buy. Nurture sequences convert them later.

## Related Skills

- **campaign-analytics**: For measuring demand gen effectiveness with attribution and ROI.
- **marketing-strategy-pmm**: For positioning and GTM strategy that feeds demand gen campaigns.
- **social-media-analyzer**: For analyzing social channel performance within demand gen mix.
- **revenue-operations**: For pipeline analysis and forecast accuracy downstream of demand gen.

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| CAC exceeding LTV ratio (below 3:1) | Over-spending on high-cost channels without sufficient conversion optimization | Audit channel-specific CAC against benchmarks. Cut or pause channels with CAC >$400 for B2B SaaS. Shift budget toward lower-CAC channels (SEO, email, organic social). A 3:1 LTV:CAC ratio is the minimum for sustainability; below 2:1 indicates immediate problems |
| LinkedIn Ads delivering low CTR (<0.4%) | Audience too broad, creative fatigue, or wrong ad format | Narrow targeting to Director+ titles at 50-5,000 employee companies. Refresh creative every 2-3 weeks. Test Thought Leader Ads before scaling standard formats -- they deliver 10-20% CTR at premium CPMs, which frequently beats standard LinkedIn ads' 0.5-1% rates |
| Google Ads CPA rising above target | Insufficient conversion data for automated bidding, or keyword competition increasing | Stay on Manual CPC until you have 50+ conversions, then switch to Target CPA. Google Ads CPC increased 164% from 2019-2024. Expand negative keyword list (maintain 100+). Focus on long-tail, high-intent keywords to reduce competition |
| MQL-to-SQL conversion rate below 15% | Lead scoring too loose, or MQL criteria not aligned with sales expectations | Tighten MQL scoring criteria. Require minimum engagement score (demo request or equivalent high-intent action). Align with sales on SQL criteria: Director+ title, 50-5,000 employees, $10k+ budget, buying within 90 days |
| UTM parameters not appearing in HubSpot contact records | Tracking script not firing, form stripping UTM values, or redirect losing parameters | Verify HubSpot tracking code is on all pages. Ensure forms pass hidden UTM fields. Test by clicking a UTM-tagged link and checking the contact record. Use server-side UTM capture if client-side tracking is blocked by privacy tools |
| Partner channel not generating pipeline | Partner enablement insufficient, or wrong partner tier selection | Ensure partners have completed demo training and have access to co-branded assets. Focus on Tier 1 strategic integration partners (high effort, very high ROI) before scaling to Tier 2 affiliates. Set clear success metrics and revenue model before launch |
| Single-channel dependency risk | Over 50% of pipeline from one channel | Diversify acquisition across 3+ channels immediately. Recommended 2026 allocation: AI-enhanced paid search 28-33%, omnichannel social 22-28%, content + experience marketing 20-25%. No single channel should exceed 40% of total pipeline |

---

## Success Criteria

- **Blended CAC**: Target <$300 for B2B SaaS Series A (2026 benchmark). Channel-specific targets: LinkedIn $150-400, Google Search $80-250, SEO/Organic $50-150, Email $20-80. Average B2B SaaS CAC reached $1,200 in 2026 for all segments; self-serve targets $100-500 while enterprise can reach $5,000+
- **CAC Payback Period**: Achieve payback within 6-12 months (2026 median). Elite performers reach payback in under 80 days. Payback exceeding 18 months signals unsustainable unit economics
- **LTV:CAC Ratio**: Maintain minimum 3:1 ratio. Below 2:1 requires immediate intervention. Top-quartile SaaS companies spend $1.10 or less to acquire $1 of new ARR; median spends $2 per $1 ARR
- **MQL-to-SQL Conversion**: Target 15-25% for Google Search, 12-22% for SEO, 10-20% for LinkedIn, 8-15% for email. Overall blended target >15%
- **Pipeline Velocity**: Close marketing-sourced deals within 60 days average. SDR response to MQL within 4 hours, AE demo booking within 24 hours, first demo within 3 business days
- **Channel Diversification**: No single channel should represent more than 40% of pipeline. Maintain active campaigns across minimum 3 channels. LinkedIn generates highest quality B2B leads (40% of marketers cite it as most effective)
- **Marketing Budget Efficiency**: SaaS companies under $10M ARR should spend 20-35% of revenue on marketing; $10-50M spend 18-25%; $50-100M spend 15-20%. For 2026, allocate 18-28% of revenue total with clear channel allocation ratios

---

## Scope & Limitations

**In Scope:**
- Multi-channel demand generation strategy for B2B SaaS (Series A+) with hybrid PLG/sales-led motion
- Paid media channel selection, budget allocation, and CAC calculation (LinkedIn, Google Search, Google Display, Meta)
- SEO strategy including technical foundation, keyword strategy, on-page optimization, and link building priorities
- Partnership program planning (strategic integrations, affiliates, referrals, marketplace listings)
- Attribution model selection (first-touch, last-touch, W-shaped) with HubSpot integration guidance
- UTM structure standards and campaign tracking
- MQL/SQL criteria definition and handoff SLA

**Out of Scope:**
- Campaign creative design (ad copy, images, video production)
- Platform-specific campaign management UI guidance (use LinkedIn Campaign Manager, Google Ads, Meta Ads Manager directly)
- Product-led growth (PLG) product instrumentation (freemium flows, in-app upgrade prompts)
- Sales process optimization beyond MQL-to-SQL handoff (see revenue-operations or sales-success skills)
- Advanced predictive analytics or ML-based lead scoring
- International regulatory compliance for advertising (GDPR consent, CCPA disclosures)
- Brand marketing and awareness campaigns without direct pipeline attribution

**Market Context (2026):**
- CAC is rising 40-60% since 2023 across B2B SaaS
- Google Ads CPC increased 164% from 2019-2024; LinkedIn costs up 89%
- Privacy regulations and cookie deprecation are reducing attribution accuracy
- AI-enhanced bidding strategies (Google Performance Max, LinkedIn Maximize Conversions) are becoming standard

---

## Integration Points

| Integration | Purpose | How to Connect |
|-------------|---------|----------------|
| **HubSpot CRM** | Campaign tracking, lead scoring, MQL/SQL workflows, attribution reporting | Create campaigns with UTM structure (`utm_source={channel}`, `utm_medium={type}`, `utm_campaign={campaign-id}`). Configure W-shaped (40-20-40) attribution model. Set 90-day lookback window. Validate with weekly metrics dashboard |
| **Google Ads** | Paid search campaign management | Structure: Brand > Competitor > Solution > Category keywords. 3 responsive search ads per ad group (15 headlines, 4 descriptions). Start Manual CPC, switch to Target CPA after 50+ conversions. Weekly search term review |
| **LinkedIn Campaign Manager** | B2B paid social campaigns | Structure: Awareness > Consideration > Conversion campaigns. Target Director+, 50-5,000 employees. Start $50/day per campaign. Scale 20% weekly if CAC < target. Verify LinkedIn Insight Tag on all pages. Test Thought Leader Ads for higher CTR |
| **Google Search Console** | SEO performance tracking | Monitor indexing, Core Web Vitals, keyword positions. Target page speed >90 mobile. Submit XML sitemap. Track non-brand traffic percentage as key SEO health metric |
| **campaign-analytics skill** | Attribution modeling and ROI calculation | Export HubSpot journey data as JSON for `attribution_analyzer.py`. Use `campaign_roi_calculator.py` for cross-channel ROI comparison. Feed funnel data into `funnel_analyzer.py` for bottleneck detection |
| **social-media-analyzer skill** | Social channel performance within demand gen mix | Analyze paid social campaign performance with `calculate_metrics.py`. Compare social channel CAC against other acquisition channels |
| **Partner Platforms (PartnerStack, Impact, Rewardful)** | Affiliate and partner program management | Configure 20-30% recurring commission. Create affiliate enablement kit. Set up partner UTM tracking. Test affiliate link tracking through to conversion |

---

## Tool Reference

### calculate_cac.py

**Type:** CLI script (runs with example data or edit inline)

**Usage:**
```bash
python calculate_cac.py
```

**Note:** This script uses hardcoded example data. To analyze your own data, edit the `example_data` list in the script with your channel-specific spend and customer counts.

**Input Format (edit in script):**
```python
example_data = [
    {'channel': 'LinkedIn Ads', 'spend': 15000, 'customers': 10},
    {'channel': 'Google Search', 'spend': 12000, 'customers': 20},
    {'channel': 'SEO/Organic', 'spend': 5000, 'customers': 15},
    {'channel': 'Partnerships', 'spend': 3000, 'customers': 5},
]
```

**Functions:**

| Function | Parameters | Returns |
|----------|-----------|---------|
| `calculate_cac()` | `total_spend: float`, `customers_acquired: int` | Basic CAC as float. Returns 0.0 if customers is 0 |
| `calculate_channel_cac()` | `channel_data: List[Dict]` (each dict: channel, spend, customers) | Dict with per-channel breakdown (spend, customers, cac) plus `blended` key with total_spend, total_customers, blended_cac |
| `print_results()` | `results: Dict` | Prints formatted table to stdout with per-channel and blended CAC |

**Built-in Benchmarks (printed at end of output):**
- LinkedIn Ads: $150-$400
- Google Search: $80-$250
- SEO/Organic: $50-$150
- Partnerships: $100-$300
- Blended Target: <$300

**2026 Context:** These benchmarks reflect Series A B2B SaaS. Overall B2B SaaS CAC has risen to $1,200 average across all segments (up 40-60% since 2023). Self-serve models target $100-500; enterprise segments can exceed $5,000. The median SaaS company spends $2 to acquire $1 of new ARR.

---

## marketing-ideas

Source path: `references/marketing/marketing-ideas/SKILL.md`

# Marketing Ideas

139+ proven marketing strategies with implementation guidance matched to stage, budget, and goals. This file is a lean map — browse the full tactic catalog and frameworks in the references below.

## Core Capabilities

- **Curated idea selection** — match 3-5 of 92 cataloged tactics to a team's stage, budget, goal, and timeline
- **Campaign ideation** — run structured sessions that generate, score, and brief fresh ideas against constraints
- **Trend analysis** — identify emerging trends and evaluate them for relevance, risk, and brand fit before committing
- **Prioritization & briefing** — score ideas on impact/effort/alignment and produce execution-ready implementation briefs

## When to Use

- Brainstorming marketing or growth ideas for a specific stage, budget, or goal
- Planning a growth strategy and needing a curated shortlist instead of a generic dump
- Running a campaign ideation session that needs structure and scoring
- Evaluating whether to act on an emerging marketing trend

## Quick Start

### Get Curated Ideas for Your Situation

1. Define your stage (pre-launch, early, growth, scale)
2. Define your budget (free, low, medium, high)
3. Define your goal (leads, authority, retention, awareness)
4. Use the filtering tables in `references/idea-catalog.md` to find 3-5 matching ideas
5. For each idea: review implementation steps, expected timeline, and resource requirements

### Run a Campaign Ideation Session

1. Define the campaign objective and constraints
2. Use the Campaign Ideation Framework (`references/ideation-and-trends.md`) to generate 15-20 raw ideas
3. Score each idea on effort, impact, and alignment
4. Select the top 3-5 for execution planning
5. Build implementation briefs for each selected idea

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/idea-catalog.md](references/idea-catalog.md)** — the full catalog of 92 tactics across 11 categories, plus cross-reference tables by stage, budget, timeline, and goal. Read when selecting which ideas fit a specific situation.
- **[references/ideation-and-trends.md](references/ideation-and-trends.md)** — the 4-step Campaign Ideation Framework (constraints, raw ideas, scoring, implementation brief) and the Trend Analysis Methodology (sources and evaluation). Read when running an ideation session or assessing a trend.
- **[references/playbook-and-troubleshooting.md](references/playbook-and-troubleshooting.md)** — 10 best practices, a troubleshooting table for common failure modes, and success criteria for an idea-selection cycle. Read when refining your process or diagnosing underperformance.

## Keywords

marketing ideas, growth ideas, marketing strategies, marketing tactics, campaign ideation, creative brainstorming, trend analysis, growth marketing, content marketing ideas, social media ideas, email marketing ideas, paid advertising ideas, partnership marketing, product-led growth, unconventional marketing, guerrilla marketing, viral marketing, community marketing, developer marketing

## Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `scripts/idea_scorer.py` | Score and prioritize marketing ideas by impact, effort, and alignment | `python scripts/idea_scorer.py ideas.json --stage growth --budget medium --goal leads` |
| `scripts/campaign_brief_generator.py` | Generate structured campaign briefs from parameters | `python scripts/campaign_brief_generator.py config.json --demo` |
| `scripts/trend_evaluator.py` | Evaluate marketing trends for relevance, risk, and actionability | `python scripts/trend_evaluator.py trends.json --demo` |

## Integration Points

- **Marketing Context** — Use as the foundation before brainstorming. Ideas work better when matched to ICP and positioning.
- **Content Strategy** — Use when the chosen tactic is content/SEO and a full topic plan is needed.
- **Paid Ads** — Use when the chosen tactic involves paid advertising campaigns.
- **Social Content** — Use when the chosen idea involves social media execution.
- **Cold Email** — Use when the chosen tactic is outbound email outreach.
- **Campaign Analytics** — Use to measure the performance of implemented ideas.

## Scope & Limitations

**In Scope:** 139+ marketing ideas organized by category/stage/budget/timeline, campaign ideation frameworks, idea scoring and prioritization, campaign brief generation, trend identification and evaluation, quick win identification, PLG strategy ideas.

**Out of Scope:** Detailed implementation for each idea (see channel-specific skills), budget allocation optimization (see marketing-analyst skill), execution tracking and analytics (see campaign-analytics skill), content creation (see content-creator skill).

**Limitations:** This skill provides strategy and ideas, not execution. Each idea requires a channel-specific skill for full implementation. Impact estimates (High/Medium/Low) are directional based on benchmarks; actual results depend on execution quality, market fit, and timing. Trend evaluation is subjective and should be combined with data analysis.

---

## marketing-ops

Source path: `references/marketing/marketing-ops/SKILL.md`

# Marketing Ops

Central command for marketing operations — routing questions, orchestrating campaigns, managing MarTech, and coordinating across all marketing functions.

---

## Table of Contents

- [Keywords](#keywords)
- [Quick Start](#quick-start)
- [Skill Routing Matrix](#skill-routing-matrix)
- [Campaign Orchestration](#campaign-orchestration)
- [MarTech Stack Management](#martech-stack-management)
- [Marketing Automation Framework](#marketing-automation-framework)
- [Data Management](#data-management)
- [Attribution Framework](#attribution-framework)
- [Marketing Audit](#marketing-audit)
- [Best Practices](#best-practices)
- [Integration Points](#integration-points)

---

## Keywords

marketing ops, marketing operations, MarTech stack, marketing automation, campaign orchestration, skill routing, marketing coordination, data management, attribution, marketing technology, campaign management, workflow automation, lead management, marketing analytics, marketing infrastructure, CRM integration, email automation, lead scoring

---

## Quick Start

### Route a Marketing Question

1. Identify what the user is trying to accomplish
2. Match to the routing matrix below
3. Route to the correct skill with context
4. If multiple skills are needed, create an orchestration plan

### Orchestrate a Campaign

1. Check that marketing context exists (if not, create it first)
2. Identify all skills needed for the campaign
3. Sequence skills in the correct order
4. Execute each phase, passing outputs to the next
5. Measure results using campaign analytics

---

## Skill Routing Matrix

### Content Skills

| User Says | Route To | Not This |
|-----------|----------|----------|
| "Write a blog post," "content ideas," "what should I write" | Content Strategy | Not Copywriting (that is for page copy) |
| "Write copy for my homepage," "landing page copy," "headline" | Copywriting | Not Content Strategy (that is for planning) |
| "Edit this copy," "proofread," "polish this" | Copy Editing | Not Copywriting (that is for writing new) |
| "Social media post," "LinkedIn post," "tweet" | Social Content | Not Content Strategy (that is for planning) |
| "Write an article end-to-end," "content production" | Content Production | Not Content Strategy (production has the full pipeline) |
| "Sounds too robotic," "make it human," "AI watermarks" | Content Humanizer | Not Copy Editing (that is for editorial quality) |
| "Marketing ideas," "brainstorm," "what else can I try" | Marketing Ideas | Not Content Strategy (that is for content specifically) |

### SEO Skills

| User Says | Route To | Not This |
|-----------|----------|----------|
| "SEO audit," "technical SEO," "on-page SEO" | SEO Specialist | Not AI SEO (that is for AI search engines) |
| "AI search," "ChatGPT visibility," "Perplexity," "GEO" | AI SEO | Not SEO Specialist (that is traditional SEO) |

### Conversion Skills

| User Says | Route To | Not This |
|-----------|----------|----------|
| "Landing page," "campaign page," "lead capture page" | Landing Page Generator | Not Copywriting (generator includes structure + copy) |
| "Brand guidelines," "style guide," "brand voice" | Brand Guidelines | Not Marketing Context (guidelines are implementation) |

### Channel Skills

| User Says | Route To | Not This |
|-----------|----------|----------|
| "Paid ads," "Google Ads," "Meta ads," "ad campaign" | Paid Ads | Not Ad Creative (that is for copy, not strategy) |
| "Ad copy," "ad headlines," "ad variations," "RSA" | Ad Creative | Not Paid Ads (that is for campaign strategy) |
| "Cold email," "outreach," "prospecting email" | Cold Email | Not Content Production (cold email has different rules) |

### Strategy Skills

| User Says | Route To | Not This |
|-----------|----------|----------|
| "Marketing context," "who is my customer," "ICP" | Marketing Context | Set up before other skills |
| "Marketing strategy," "how to market" | Marketing Ideas | Not Marketing Ops (ops is for execution routing) |
| "Psychology," "persuasion," "why people buy" | Marketing Psychology | Not Copywriting (psychology is the theory layer) |

---

## Campaign Orchestration

### Campaign Type: Product/Feature Launch

```
Sequence:
1. Marketing Context (verify foundation exists)
2. Content Strategy (plan launch content)
3. Copywriting (write landing page and email copy)
4. Landing Page Generator (build the conversion page)
5. Ad Creative (create ad copy for paid promotion)
6. Paid Ads (set up campaign targeting and budget)
7. Social Content (create organic social posts)
8. Cold Email (targeted outreach to prospects)
9. Campaign Analytics (measure results)
```

### Campaign Type: Content Marketing Sprint

```
Sequence:
1. Content Strategy (plan topics and calendar)
2. Content Production (research, write, optimize each piece)
3. Content Humanizer (polish for natural voice)
4. AI SEO (optimize for AI search citation)
5. Social Content (distribute across platforms)
6. Campaign Analytics (track performance)
```

### Campaign Type: Lead Generation Blitz

```
Sequence:
1. Marketing Context (verify ICP and messaging)
2. Landing Page Generator (build conversion pages)
3. Ad Creative (generate ad variations)
4. Paid Ads (launch campaigns)
5. Cold Email (parallel outbound effort)
6. Campaign Analytics (measure and optimize)
```

### Campaign Type: Brand Awareness

```
Sequence:
1. Marketing Context (define brand foundation)
2. Brand Guidelines (establish visual and verbal standards)
3. Content Strategy (plan thought leadership content)
4. Social Content (build social presence)
5. Content Production (create pillar content)
6. Campaign Analytics (measure reach and engagement)
```

### Campaign Type: Conversion Optimization

```
Sequence:
1. Marketing Psychology (identify behavioral levers)
2. Copy Editing (audit existing page copy)
3. Copywriting (rewrite underperforming sections)
4. Landing Page Generator (redesign conversion pages)
5. Campaign Analytics (set up A/B tests and track results)
```

---

## MarTech Stack Management

### Core Stack Components

| Category | Purpose | Common Tools | Integration Priority |
|----------|---------|-------------|---------------------|
| CRM | Customer data management | Salesforce, HubSpot, Pipedrive | Critical |
| Marketing Automation | Email, workflows, scoring | HubSpot, Marketo, ActiveCampaign | Critical |
| Analytics | Traffic and behavior tracking | GA4, Mixpanel, Amplitude | Critical |
| Email Platform | Email sending and deliverability | SendGrid, Mailchimp, Customer.io | Critical |
| Ad Platforms | Paid advertising | Google Ads, Meta Ads, LinkedIn Ads | High |
| SEO Tools | Keyword research and tracking | Ahrefs, SEMrush, Moz | High |
| Social Management | Publishing and scheduling | Buffer, Hootsuite, Sprout Social | Medium |
| Content Management | Content creation and hosting | WordPress, Webflow, Ghost | High |
| Attribution | Multi-touch attribution | Attribution App, Dreamdata | Medium |
| ABM | Account-based marketing | Demandbase, 6sense, Terminus | Medium (B2B) |

### Stack Evaluation Framework

When evaluating new tools:

| Criterion | Weight | Scoring |
|-----------|--------|---------|
| Does it solve a validated problem? | 30% | Clear need (3), Nice to have (2), Speculative (1) |
| Does it integrate with existing stack? | 25% | Native integration (3), API available (2), Manual export (1) |
| Total cost of ownership | 20% | Under budget (3), At budget (2), Over budget (1) |
| Time to value | 15% | Under 1 week (3), 1-4 weeks (2), 4+ weeks (1) |
| Team capability to use it | 10% | Self-serve (3), Training needed (2), Expert required (1) |

**Rule:** Never add a tool that does not integrate with your CRM. Disconnected data is worse than no data.

### Stack Audit Checklist

- [ ] Every tool has a clear owner responsible for it
- [ ] Every tool connects to CRM or central data warehouse
- [ ] No overlapping tools doing the same job
- [ ] All contracts reviewed annually for cost optimization
- [ ] Data flows documented between tools
- [ ] Integration health monitored (failures flagged within 24 hours)
- [ ] Tool adoption measured (tools nobody uses should be cut)

---

## Marketing Automation Framework

### Automation Priority by Impact

| Automation | Impact | Complexity | Build First |
|-----------|--------|-----------|-------------|
| Welcome/onboarding email sequence | High | Low | Yes |
| Lead scoring | High | Medium | Yes |
| Abandoned cart/trial follow-up | High | Low | Yes |
| Event-triggered emails (usage milestones) | High | Medium | Second priority |
| Lead routing to sales | High | Low | Yes |
| Social media scheduling | Medium | Low | Second priority |
| Reporting dashboards | Medium | Medium | Second priority |
| Content personalization | Medium | High | Third priority |
| Predictive lead scoring | Medium | High | Third priority |
| Dynamic content insertion | Low-Medium | High | Later |

### Lead Scoring Model

| Signal Type | Examples | Score |
|-------------|---------|-------|
| Demographic fit | Matches ICP (title, company size, industry) | +10 to +25 |
| Behavioral - high intent | Visited pricing page, requested demo, viewed case study | +15 to +25 |
| Behavioral - engagement | Opened 3+ emails, downloaded content, attended webinar | +5 to +15 |
| Behavioral - product | Used free trial, reached activation milestone | +20 to +30 |
| Negative signals | Competitor employee, student email, unsubscribed | -10 to -50 |

**Lead score thresholds:**
- 0-25: Nurture (automated email sequences)
- 26-50: Marketing Qualified Lead (MQL) — deeper engagement
- 51-75: Sales Qualified Lead (SQL) — route to sales
- 76+: Hot lead — immediate sales outreach

### Email Automation Sequences

| Sequence | Trigger | Emails | Duration |
|----------|---------|--------|----------|
| Welcome | New signup | 5-7 | 14 days |
| Onboarding | Started trial | 4-6 | 14 days |
| Re-engagement | Inactive 30 days | 3-4 | 21 days |
| Win-back | Churned | 3-5 | 30 days |
| Nurture | Downloaded content | 5-7 | 45 days |
| Upsell | Reached plan limit | 2-3 | 7 days |
| Referral | 90 days active + high NPS | 2 | 7 days |

---

## Data Management

### Data Quality Framework

| Dimension | Definition | How to Measure |
|-----------|-----------|---------------|
| Completeness | Required fields are filled | % of records with complete required fields |
| Accuracy | Data matches reality | Sample audit against source of truth |
| Consistency | Same data, same format everywhere | Cross-system comparison |
| Timeliness | Data is current | % of records updated within defined freshness window |
| Uniqueness | No duplicate records | Duplicate rate in CRM |

### Data Hygiene Schedule

| Task | Frequency | Owner |
|------|-----------|-------|
| Deduplicate CRM records | Monthly | Marketing Ops |
| Verify email addresses | Before every campaign | Marketing Ops |
| Update firmographic data | Quarterly | Marketing Ops |
| Clean inactive contacts | Quarterly | Marketing Ops |
| Audit UTM parameter consistency | Monthly | Marketing Ops |
| Review lead scoring accuracy | Quarterly | Marketing + Sales |
| Sync CRM with marketing automation | Continuous (automated) | System |

### UTM Parameter Standards

Consistent UTM tagging is foundational for attribution:

```
utm_source: [platform] — google, linkedin, facebook, email, partner-name
utm_medium: [channel type] — cpc, organic, email, social, referral
utm_campaign: [campaign name] — product-launch-q1, blog-promo-march
utm_content: [variant] — headline-a, cta-blue, audience-cmo
utm_term: [keyword] — for paid search only
```

**Rules:**
- Always lowercase
- Use hyphens, not spaces or underscores
- Document all campaign names in a shared registry
- Validate UTMs before launching any campaign

---

## Attribution Framework

### Attribution Models

| Model | How It Works | Best For | Limitation |
|-------|-------------|---------|-----------|
| First-touch | 100% credit to first interaction | Understanding acquisition channels | Ignores nurture touchpoints |
| Last-touch | 100% credit to final interaction | Understanding conversion triggers | Ignores awareness touchpoints |
| Linear | Equal credit to all touchpoints | Simple multi-touch understanding | Treats all touches equally |
| Time-decay | More credit to recent touchpoints | Long sales cycles | May undervalue awareness |
| Position-based (U-shaped) | 40% first, 40% last, 20% middle | Balanced view | Arbitrary weighting |
| Data-driven | ML-based weighting | Sophisticated programs | Requires large data volume |

### Attribution Implementation Checklist

- [ ] UTM parameters standardized and enforced
- [ ] All marketing channels tagged consistently
- [ ] CRM captures source/medium/campaign for every lead
- [ ] Conversion events defined and tracked
- [ ] Attribution model selected and documented
- [ ] Reporting cadence established (weekly + monthly)
- [ ] Channel ROI calculated and compared monthly

---

## Marketing Audit

### Full Marketing Audit Structure

| Area | What to Assess | Key Questions |
|------|---------------|---------------|
| Strategy | Positioning, ICP, messaging | Is our positioning differentiated? Do we know our ICP? |
| Content | Quality, quantity, performance | Is content driving traffic and conversions? |
| SEO | Rankings, technical health, content gaps | Are we visible for target keywords? |
| Paid | ROAS, CPA, channel mix | Are paid campaigns profitable? |
| Email | List health, engagement, automation | Are sequences driving conversions? |
| Social | Reach, engagement, brand consistency | Are we building audience and trust? |
| MarTech | Stack utilization, integration health | Are our tools connected and used? |
| Data | Quality, attribution, reporting | Can we trust our data and attribution? |

### Audit Scoring

For each area, score 1-5:

| Score | Status | Action |
|-------|--------|--------|
| 1 | Not present | Build from scratch |
| 2 | Basic but underperforming | Significant improvement needed |
| 3 | Functional | Optimize and iterate |
| 4 | Strong | Maintain and scale |
| 5 | Best-in-class | Protect and document |

---

## Best Practices

1. **Context first, always** — Check that marketing context exists before any marketing work. Everything works better with context.

2. **Route precisely** — A question routed to the wrong skill produces wrong-shaped output. Use the routing matrix.

3. **Orchestrate, do not fragment** — Multi-skill campaigns need a sequence plan. Ad hoc execution produces inconsistent results.

4. **Own the data** — Marketing ops is responsible for data quality. Bad data produces bad decisions.

5. **Standardize UTMs** — Inconsistent UTM parameters make attribution impossible. Enforce standards before launching campaigns.

6. **Audit tools annually** — Every tool should justify its cost and usage. Cut tools nobody uses.

7. **Automate the repeatable** — If you do it every week, automate it. Manual processes do not scale.

8. **Document everything** — Campaign playbooks, automation logic, data flows, tool configurations. Tribal knowledge is fragile.

9. **Align with sales** — Marketing ops and sales ops must share data definitions, lead scoring criteria, and attribution models.

10. **Measure what matters** — Track leading indicators (MQLs, pipeline velocity) alongside lagging indicators (revenue, ROI).

---

## Integration Points

- **Marketing Context** — Foundation for all marketing operations. Create this first.
- **Campaign Analytics** — Use for measuring outcomes of orchestrated campaigns.
- **All Marketing Skills** — Marketing Ops routes questions and orchestrates workflows across the full skill ecosystem.
- **Content Strategy** — Coordinate content calendar with campaign schedule.
- **Paid Ads** — Coordinate paid campaigns with organic efforts and landing pages.
- **Cold Email** — Coordinate outbound with inbound campaigns to avoid audience overlap.

---

## Troubleshooting

| Symptom | Likely Cause | Resolution |
|---------|-------------|------------|
| Marketing and sales disagree on lead quality | Lead scoring thresholds not aligned or model not validated against outcomes | Run lead_scoring_simulator.py with historical data; validate that high-scored leads convert at 2x+ the rate of low-scored |
| MarTech stack costs growing 20%+ YoY without proportional ROI | Tool proliferation without consolidation; unused tools not audited | Run martech_stack_auditor.py quarterly; cut tools with <30% utilization; consolidate overlapping categories |
| Campaign data siloed across platforms, attribution impossible | No unified UTM standard; tools not integrated through CRM | Standardize UTM parameters (lowercase, hyphens, documented registry); require CRM integration for every tool |
| Lead routing to sales takes >24 hours | Manual handoff process; no automation between marketing automation and CRM | Implement automated lead routing rules; route hot leads (76+ score) within 15 minutes |
| Email deliverability dropping below 90% | List hygiene not maintained; bounced/inactive contacts not cleaned | Deduplicate monthly; verify addresses before campaigns; clean inactive contacts quarterly |
| Budget spent evenly across channels regardless of performance | No performance-based allocation framework in place | Use campaign_budget_allocator.py with historical ROAS data; shift budget quarterly toward highest performers |
| Multi-skill campaigns produce inconsistent messaging | No orchestration sequence defined; skills executed ad hoc | Follow campaign orchestration templates; always start with marketing context verification |

---

## Success Criteria

- All MarTech tools connected to CRM with verified data flow
- MarTech stack audit score above 70/100 with zero critical gaps
- Lead scoring model validated: high-scored leads convert at 2x+ rate of low-scored
- UTM parameters 100% standardized and validated before every campaign launch
- Campaign orchestration follows documented sequences with context verified first
- Budget allocation reviewed and adjusted quarterly based on channel ROI data
- Data quality: <5% duplicate rate in CRM, <2% email bounce rate, >95% required fields complete

---

## Scope & Limitations

**In Scope:** Skill routing and orchestration, campaign sequencing, MarTech stack management and auditing, marketing automation (email sequences, lead scoring, lead routing), data quality management, UTM standardization, attribution framework setup, marketing audit methodology, budget allocation.

**Out of Scope:** Individual channel execution (see channel-specific skills), analytics implementation (see analytics-tracking skill), content creation (see content-creator skill), sales operations and CRM administration (sales ops function).

**Limitations:** Marketing ops is the coordination layer, not the execution layer. Tool auditing uses self-reported utilization data; actual usage may differ. Lead scoring models require minimum 50+ historical conversions for meaningful validation. Budget allocation assumes linear channel scaling; real channels have diminishing returns.

---

## Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `scripts/martech_stack_auditor.py` | Audit MarTech stack for gaps, redundancies, and optimization opportunities | `python scripts/martech_stack_auditor.py stack.json --demo` |
| `scripts/campaign_budget_allocator.py` | Allocate marketing budget across campaigns by priority and performance | `python scripts/campaign_budget_allocator.py campaigns.json --budget 100000 --strategy balanced` |
| `scripts/lead_scoring_simulator.py` | Simulate and validate lead scoring models against actual outcomes | `python scripts/lead_scoring_simulator.py leads.json --demo` |

---

## marketing-psychology

Source path: `references/marketing/marketing-psychology/SKILL.md`

# Marketing Psychology

Applied behavioral science for marketing — identifying which psychological principles apply to specific challenges and showing exactly how to implement them. The skill diagnoses behavioral barriers, prescribes 2-3 relevant principles from a catalog of 70+ mental models, and turns them into concrete, testable changes to landing pages, pricing, email, copy, and ads.

## Core Capabilities

- **Behavioral diagnosis** — map the decision journey, identify barriers (cognitive load, choice paralysis, trust deficit, friction), and prescribe matching principles
- **Mental model catalog** — 70+ principles across buyer psychology, persuasion/influence, pricing, design/UX, and growth
- **Application by challenge** — principle-by-principle playbooks for landing pages, pricing pages, email, churn reduction, and ad creative
- **Pricing & conversion frameworks** — three-tier/decoy pricing design, the trust cascade, the micro-commitment ladder
- **Copy techniques** — loss vs. gain framing, specificity bias, future pacing
- **Ethical application** — the persuasion/manipulation line, anti-dark-pattern boundaries, A/B testing discipline

## When to Use

- A page, pricing tier, email, or ad is underperforming and you need a behavioral root-cause diagnosis
- You are designing or optimizing a pricing page (anchoring, decoy, charm pricing, tier structure)
- You want to apply psychology to copy or campaign creative with specific, testable changes
- You need to audit existing assets for missing persuasion principles or dark patterns

## Quick Start

### Diagnose Why Something Is Not Converting
1. Identify the desired behavior (click, buy, share, return)
2. Identify the current friction (too many choices, unclear value, no urgency)
3. Map the visitor's emotional state (excited, skeptical, confused, impatient)
4. Match to applicable principles from `references/mental-models.md`
5. Implement 2-3 principle-based changes with specific execution

### Apply Psychology to a Marketing Asset
1. Select the asset (landing page, pricing page, email, ad)
2. Review the applicable psychology in `references/application-playbooks.md`
3. Choose 3-5 principles to apply
4. Implement each with the specific technique described
5. Measure the impact through A/B testing

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/mental-models.md](references/mental-models.md)** — full catalog of 70+ principles (buyer psychology, persuasion, pricing, design/UX, growth) with definitions and marketing applications. Read when matching a barrier to the principle that addresses it.
- **[references/application-playbooks.md](references/application-playbooks.md)** — behavioral diagnosis workflows, principle-by-challenge tables (landing pages, pricing, email, churn, ads), pricing framework, trust cascade, micro-commitment ladder, and copy techniques. Read when diagnosing a problem or applying psychology to an asset.
- **[references/ethics-and-quality.md](references/ethics-and-quality.md)** — ethical guidelines (persuasion vs. manipulation), best practices, troubleshooting table, and success criteria. Read when judging whether a technique is ethical or hardening an implementation.

## Python Automation Tools

- **`scripts/persuasion_auditor.py`** — audits copy for Cialdini's 7 principles plus behavioral economics techniques; flags what's applied and what's missing.
- **`scripts/cognitive_bias_checker.py`** — identifies cognitive biases leveraged (or missed) in copy, pricing pages, and landing pages.
- **`scripts/pricing_psychology_analyzer.py`** — analyzes pricing page structure for anchoring, decoy effect, charm pricing, framing, and tier design.

```bash
python scripts/persuasion_auditor.py page.html
python scripts/cognitive_bias_checker.py pricing_page.html --json
python scripts/pricing_psychology_analyzer.py pricing.json
```

## Scope & Limitations

**In Scope:** Behavioral psychology principles applied to marketing, conversion optimization, pricing strategy, copy improvement, campaign design. 70+ mental models with implementation guides.

**Out of Scope:** Academic psychology research, clinical applications, UX research methodology (use product-team), A/B test statistical analysis tools, consumer psychology outside marketing context.

**Limitations:** Psychology provides hypotheses, not certainties. All changes must be A/B tested. What works for consumer SaaS may not work for enterprise. Cultural context matters significantly. Principles should be applied ethically — persuasion that helps customers make good decisions, not manipulation.

## Integration Points

- **Copywriting** — Apply psychological principles when writing page copy (headlines, CTAs, objection handling).
- **Landing Page Generator** — Use psychology to guide page structure and section ordering.
- **Paid Ads** — Apply ad-specific psychology (mere exposure, contrast effect, curiosity gap) to creative.
- **Pricing** — Apply pricing psychology (anchoring, decoy, charm pricing) to pricing page design.
- **Copy Editing** — Use the Heightened Emotion sweep to apply psychology during editorial review.
- **Marketing Context** — Understanding customer psychology informs positioning and messaging strategy.

---

## marketing-strategy-pmm

Source path: `references/marketing/marketing-strategy-pmm/SKILL.md`

# Marketing Strategy & PMM

Product marketing patterns for positioning, GTM strategy, and competitive intelligence.

---

## Table of Contents

- [ICP Definition Workflow](#icp-definition-workflow)
- [Positioning Development](#positioning-development)
- [Competitive Intelligence](#competitive-intelligence)
- [Product Launch Planning](#product-launch-planning)
- [Sales Enablement](#sales-enablement)
- [International Expansion](#international-expansion)
- [Reference Documentation](#reference-documentation)

---

## Clarify First

Before building the PMM artifact, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Deliverable type** — positioning statement, GTM plan, battlecard, or sales enablement (determines which workflow runs)
- [ ] **Target customer / ICP** — best-fit segment, ideally top 20% by LTV (drives the FOR clause and targeting)
- [ ] **Competitive alternatives** — direct, adjacent, and status-quo options (drives the UNLIKE clause and battlecards)
- [ ] **Unique differentiation** — what only you do and why it matters (drives the positioning differentiator and value prop)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## ICP Definition Workflow

Define ideal customer profile for targeting:

1. Analyze existing customers (top 20% by LTV)
2. Identify common firmographics (size, industry, revenue)
3. Map technographics (tools, maturity, integrations)
4. Document psychographics (pain level, motivation, risk tolerance)
5. Define 3-5 buyer personas (economic, technical, user)
6. Validate against sales cycle and churn data
7. Score prospects A/B/C/D based on ICP fit
8. **Validation:** A-fit customers have lowest churn and fastest close

### Firmographics Template

| Dimension | Target Range | Rationale |
|-----------|--------------|-----------|
| Employees | 50-5000 | Series A sweet spot |
| Revenue | $5M-$500M | Budget available |
| Industry | SaaS, Tech, Services | Product fit |
| Geography | US, UK, DACH | Market priority |
| Funding | Seed to Growth | Willing to adopt |

### Buyer Personas

**Economic Buyer** (signs contract):
- Title: VP, Director, Head of [Department]
- Goals: ROI, team productivity, cost reduction
- Messaging: Business outcomes, ROI, case studies

**Technical Buyer** (evaluates product):
- Title: Engineer, Architect, Tech Lead
- Goals: Technical fit, easy integration
- Messaging: Architecture, security, documentation

**User/Champion** (advocates internally):
- Title: Manager, Team Lead, Power User
- Goals: Makes job easier, quick wins
- Messaging: UX, ease of use, time savings

### ICP Validation Checklist

- [ ] 5+ paying customers match this profile
- [ ] Fastest sales cycles (< median)
- [ ] Highest LTV (> median)
- [ ] Lowest churn (< 5% annual)
- [ ] Strong product engagement
- [ ] Willing to do case studies

---

## Positioning Development

Develop positioning using April Dunford methodology:

1. List competitive alternatives (direct, adjacent, status quo)
2. Isolate unique attributes (features only you have)
3. Map attributes to customer value (why it matters)
4. Define best-fit customers (who cares most)
5. Choose market category (head-to-head, niche, new category)
6. Layer on relevant trends (timing justification)
7. Test with 10+ customer interviews
8. **Validation:** 7+ customers describe value unprompted

### Positioning Statement Template

```
FOR [target customer]
WHO [statement of need]
THE [product] IS A [category]
THAT [key benefit]
UNLIKE [competitive alternative]
OUR PRODUCT [primary differentiation]
```

### Value Proposition Formula

Template: `[Product] helps [Target Customer] [Achieve Goal] by [Unique Approach]`

Example: "Acme helps mid-market SaaS teams ship 2x faster by automating project workflows with AI"

### Messaging Hierarchy

| Level | Content | Example |
|-------|---------|---------|
| Headline | 5-7 words | "Ship faster with AI automation" |
| Subhead | 1 sentence | "Automate workflows so teams focus on what matters" |
| Benefits | 3-4 bullets | Speed, quality, collaboration, cost |
| Features | Supporting evidence | AI automation → 10 hrs/week saved |
| Proof | Social proof | Customer logos, stats, case studies |

---

## Competitive Intelligence

Build competitive knowledge base:

1. Identify tier 1 (direct), tier 2 (adjacent), tier 3 (status quo)
2. Sign up for competitor products (hands-on evaluation)
3. Monitor competitor websites, pricing, messaging
4. Analyze sales call recordings for competitor mentions
5. Read G2/Capterra reviews (pros and cons)
6. Track competitor job postings (roadmap signals)
7. Update battlecards monthly
8. **Validation:** Sales team uses battlecards in 80%+ competitive deals

### Competitive Tier Structure

| Tier | Definition | Examples |
|------|------------|----------|
| 1 | Direct competitor, same category | [Competitor A, B] |
| 2 | Adjacent solution, overlapping use case | [Alt Solution C, D] |
| 3 | Status quo (what they do today) | Spreadsheets, manual, in-house |

### Battlecard Template

```
COMPETITOR: [Name]
OVERVIEW: Founded [year], Funding [stage], Size [employees]

POSITIONING:
- They say: "[Their claim]"
- Reality: [Your assessment]

STRENGTHS:
1. [What they do well]
2. [What they do well]

WEAKNESSES:
1. [Where they fall short]
2. [Where they fall short]

OUR ADVANTAGES:
1. [Your advantage + evidence]
2. [Your advantage + evidence]

WHEN WE WIN:
- [Scenario where you win]

WHEN WE LOSE:
- [Scenario where they win]

TALK TRACK:
Objection: "[Common objection]"
Response: "[Your response]"
```

### Win/Loss Analysis

Track monthly:
- Win rate by competitor
- Top win reasons (product fit, ease of use, price)
- Top loss reasons (missing feature, price, relationship)
- Action items for product, sales, marketing

---

## Product Launch Planning

Plan launches by tier:

| Tier | Scope | Prep Time | Budget |
|------|-------|-----------|--------|
| 1 | New product, major feature | 6-8 weeks | $50-100k |
| 2 | Significant feature, integration | 3-4 weeks | $10-25k |
| 3 | Small improvement | 1 week | <$5k |

### Tier 1 Launch Workflow

Execute major product launch:

1. Kickoff meeting with Product, Marketing, Sales, CS
2. Define goals (pipeline $, MQLs, press coverage)
3. Develop positioning and messaging
4. Create sales enablement (deck, demo, battlecard)
5. Build campaign assets (landing page, emails, ads)
6. Train sales and CS teams
7. Execute launch day (press, email, ads, outbound)
8. Monitor and optimize for 30 days
9. **Validation:** Pipeline on track to goal by week 2

### Launch Day Checklist

- [ ] Press release distributed
- [ ] Email announcement sent
- [ ] Social media posts live
- [ ] Paid ads at full budget
- [ ] Sales outbound blitz launched
- [ ] In-app notification active
- [ ] Metrics monitored every 2 hours

### Launch Metrics

| Metric | Leading (Daily) | Lagging (Weekly) |
|--------|-----------------|------------------|
| Traffic | Landing page visitors | - |
| Engagement | Demo requests, signups | Feature adoption % |
| Pipeline | MQLs generated | SQLs, pipeline $ |
| Revenue | - | Deals closed, revenue |

---

## Sales Enablement

Equip sales team with PMM assets:

1. Create sales deck (15-20 slides, visual-first)
2. Build one-pagers (product, competitive, case study)
3. Develop demo script (30-45 min with discovery)
4. Write email templates (outreach, follow-up, closing)
5. Create ROI calculator (input costs, output savings)
6. Conduct monthly enablement calls
7. Deliver quarterly training (positioning, competitive)
8. **Validation:** Sales uses assets in 80%+ of opportunities

### Sales Deck Structure

| Slide | Content |
|-------|---------|
| 1-2 | Title, agenda |
| 3-4 | Company intro, problem statement |
| 5-7 | Solution, key benefits, demo |
| 8-10 | Differentiation, case study, pricing |
| 11-12 | Implementation, support, next steps |

### Demo Flow

```
1. Intro (2 min): Who we are, agenda
2. Discovery (5 min): Their needs, pain points
3. Demo (20 min): Product focused on their use case
4. Q&A (10 min): Objection handling
5. Next steps (3 min): Trial, POC, proposal
```

### Sales-Marketing Handoff

| Handoff | Frequency | Content |
|---------|-----------|---------|
| Weekly sync | 30 min | Win/loss, competitive, new assets |
| Monthly enablement | 60 min | Product updates, training |
| Quarterly review | Half-day | Results, strategy, planning |

---

## International Expansion

Enter new markets systematically:

1. Validate market demand (inbound leads, TAM analysis)
2. Localize website, pricing, legal
3. Establish sales coverage (hire or agency)
4. Adapt messaging for cultural fit
5. Build local partnerships and references
6. Launch localized campaigns
7. Monitor CAC and conversion by market
8. **Validation:** 3+ paying customers from market in first 90 days

### Market Priority (Series A)

| Market | Timeline | Budget % | Target ARR |
|--------|----------|----------|------------|
| US | Months 1-6 | 50% | $1M |
| UK | Months 4-9 | 20% | $500k |
| DACH | Months 7-12 | 15% | $300k |
| France | Months 10-15 | 10% | $200k |
| Canada | Months 7-12 | 5% | $100k |

### Localization Checklist

- [ ] Website translation (professional, not machine)
- [ ] Currency and pricing localized
- [ ] Local phone number and address
- [ ] Legal compliance (GDPR, PIPEDA)
- [ ] Local payment methods
- [ ] Sales coverage during local hours
- [ ] Local case studies and references

---

## Reference Documentation

### Positioning Frameworks

`references/positioning-frameworks.md` contains:

- April Dunford 5-step positioning process
- Geoffrey Moore positioning statement template
- Positioning validation interview protocol
- Competitive positioning map construction

### Launch Checklists

`references/launch-checklists.md` contains:

- Tier 1/2/3 launch checklists
- Week-by-week launch timeline
- Launch day runbook
- Post-launch metrics dashboard

### International GTM

`references/international-gtm.md` contains:

- US, UK, DACH, France, Canada playbooks
- Market-specific channel mix and messaging
- Localization requirements per market
- Entry timeline and budget allocation

### Messaging Templates

`references/messaging-templates.md` contains:

- Value proposition formulas
- Persona-specific messaging
- Competitive response scripts
- Objection handling templates
- Channel-specific copy (landing pages, emails, ads)

---

## PMM KPIs

| Metric | Target | Measurement |
|--------|--------|-------------|
| Product adoption | >40% in 90 days | Feature usage after launch |
| Win rate | >30% competitive | Deals won vs. competitors |
| Sales velocity | -20% YoY | Days from SQL to close |
| Deal size | +25% YoY | Average contract value |
| Launch pipeline | 3:1 ROMI | Pipeline $ : marketing spend |

---

## Quick Reference

### PMM Monthly Rhythm

| Week | Focus |
|------|-------|
| 1 | Review metrics, update battlecards |
| 2 | Create assets, publish content |
| 3 | Support launches, optimize campaigns |
| 4 | Monthly report, plan next month |

## Proactive Triggers

- **No documented positioning** -- Without clear positioning, all marketing is guesswork. Start with April Dunford framework.
- **Messaging differs across channels** -- Inconsistent story confuses buyers. Align messaging hierarchy across all touchpoints.
- **No ICP defined** -- Selling to everyone means selling to no one. Define ICP before any campaign spend.
- **Competitor repositioning** -- Market shift detected. Review your positioning and update battlecards.

## Output Artifacts

| When you ask for... | You get... |
|---------------------|------------|
| "Position my product" | Positioning framework (April Dunford method) with completed output |
| "GTM strategy" | Go-to-market plan with channels, messaging, and timeline |
| "Competitive positioning" | Positioning map with competitive gaps and opportunities |
| "Sales enablement" | Sales deck structure, battlecards, and demo flow |

## Communication

All output passes quality verification:
- Self-verify: source attribution, assumption audit, confidence scoring
- Output format: Bottom Line first, then What (with confidence), Why, How to Act
- Every finding tagged with confidence level: verified, medium confidence, or assumed

## Related Skills

- **marketing-demand-acquisition**: For executing acquisition campaigns planned by PMM.
- **campaign-analytics**: For measuring launch and campaign effectiveness.
- **content-creator**: For creating content assets defined in PMM strategy.
- **social-media-analyzer**: For tracking social media performance of PMM campaigns.

---

## Troubleshooting

| Symptom | Likely Cause | Resolution |
|---------|-------------|------------|
| Positioning resonates internally but customers do not repeat it | Positioning built from company perspective, not customer language | Rerun April Dunford methodology starting from competitive alternatives, not from product features |
| Win rate against specific competitor below 25% | Battlecard outdated or sales team not using it | Run win_loss_analyzer.py to identify loss patterns; update battlecard monthly; validate 80%+ sales usage |
| GTM motion producing high MQLs but low pipeline conversion | Wrong GTM motion for ACV and buyer type; marketing-led when should be sales-led | Reassess motion using gtm_planner.py; for ACV >$25K, shift to sales-led or hybrid PLG+sales |
| Sales enablement assets gathering dust | Assets created without sales input; format does not match how sales actually works | Co-create assets with sales; survey sales on what they need; track asset usage in deal cycles |
| International expansion burning cash with zero pipeline | Market entered without validating demand (inbound signal, TAM) | Validate 3+ paying customers from market in first 90 days; if not, pause and reassess market priority |
| Competitive intelligence always reactive to lost deals | No proactive monitoring system; battlecards only updated post-loss | Set up monthly competitor monitoring (website, pricing, job postings, G2 reviews); update battlecards proactively |
| Messaging differs across website, sales deck, and ads | No messaging hierarchy documented; each team creates independently | Build messaging hierarchy (headline > subhead > benefits > features > proof) and enforce across all touchpoints |

---

## Success Criteria

- Positioning validated with 10+ customer interviews; 7+ describe value unprompted
- Win rate above 30% in competitive deals, measured and tracked monthly
- Sales velocity improves 20%+ YoY (days from SQL to close decreasing)
- Sales team uses battlecards in 80%+ of competitive opportunities
- Product adoption exceeds 40% within 90 days of launch
- GTM plan generates 3:1 pipeline-to-marketing-spend ROMI
- Messaging hierarchy consistent across all customer-facing touchpoints

---

## Scope & Limitations

**In Scope:** Product positioning (April Dunford methodology), ICP definition and validation, competitive intelligence and battlecards, GTM strategy and motion selection (PLG, sales-led, marketing-led, community-led), product launch planning, sales enablement, win/loss analysis, international expansion planning, messaging hierarchy, PMM KPIs.

**Out of Scope:** Brand identity and visual design (see brand-guidelines skill), demand generation execution (see marketing-demand-acquisition skill), content creation (see content-creator skill), pricing strategy optimization, sales process design.

**Limitations:** Positioning frameworks require real customer input to be effective — internally generated positioning is unreliable. Win/loss analysis requires honest deal outcome data from sales; incomplete data produces misleading patterns. GTM motion recommendations are based on ACV and buyer type heuristics; edge cases may require hybrid approaches. International expansion timelines assume US-first model and may not apply to non-US companies.

---

## Scripts

| Script | Purpose | Usage |
|--------|---------|-------|
| `scripts/gtm_planner.py` | Generate GTM plans with motion selection, channel strategy, and timeline | `python scripts/gtm_planner.py config.json --demo` |
| `scripts/win_loss_analyzer.py` | Analyze deal outcomes by competitor, segment, and reason | `python scripts/win_loss_analyzer.py deals.json --demo` |
| `scripts/battlecard_generator.py` | Generate competitive battlecards with feature comparison and objection handling | `python scripts/battlecard_generator.py competitor.json --demo` |

---

## paid-ads

Source path: `references/marketing/paid-ads/SKILL.md`

# Paid Ads

Campaign strategy, audience targeting, budget optimization, and performance management across all major advertising platforms.

---

## Table of Contents

- [Keywords](#keywords)
- [Quick Start](#quick-start)
- [Platform Selection Guide](#platform-selection-guide)
- [Campaign Structure Framework](#campaign-structure-framework)
- [Audience Targeting by Platform](#audience-targeting-by-platform)
- [Budget Allocation Strategy](#budget-allocation-strategy)
- [Bid Strategy Progression](#bid-strategy-progression)
- [Retargeting Playbook](#retargeting-playbook)
- [Performance Optimization](#performance-optimization)
- [Attribution and Measurement](#attribution-and-measurement)
- [Pre-Launch Checklist](#pre-launch-checklist)
- [Best Practices](#best-practices)
- [Integration Points](#integration-points)

---

## Keywords

paid ads, PPC, pay-per-click, Google Ads, Meta Ads, Facebook Ads, Instagram Ads, LinkedIn Ads, Twitter Ads, TikTok Ads, paid media, ROAS, CPA, CPC, CPM, audience targeting, retargeting, remarketing, budget optimization, bid strategy, ad campaigns, conversion tracking, lookalike audiences, campaign structure, ad performance, paid search, paid social

---

## Clarify First

Before building the campaign, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Campaign objective** — leads, sales, traffic, or awareness (drives platform selection, campaign type, bid strategy, and success metrics)
- [ ] **Target audience** — who they are and their intent signal (drives platform selection and targeting setup)
- [ ] **Monthly budget** — total spend available (determines viable platforms, bid-strategy stage, and budget-phase allocation)
- [ ] **Conversion action & offer** — the action you are paying for and the offer behind it (drives campaign structure, tracking, and ad-to-page match)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

### Launch a Campaign

1. Define campaign goal (leads, sales, traffic, awareness)
2. Select platform based on audience and intent
3. Set up conversion tracking and verify with test conversion
4. Build campaign structure with proper naming conventions
5. Define audience targeting
6. Set budget and bid strategy
7. Create ad creative (use Ad Creative skill)
8. Launch and monitor for 7 days before making changes

### Optimize an Existing Campaign

1. Pull performance data for last 14-30 days
2. Identify primary issue (high CPA, low CTR, low ROAS)
3. Use the optimization levers in the Performance Optimization section
4. Make one change at a time, wait 3-5 days between changes
5. Document every change and its impact

---

## Platform Selection Guide

### Platform Comparison

| Platform | Best For | Audience Signal | Typical CPC | Minimum Budget |
|----------|----------|----------------|-------------|----------------|
| **Google Search** | High-intent demand capture | Search keywords (what they want now) | $1-8 (B2B: $5-20) | $1,500/mo |
| **Google Display** | Awareness, retargeting | Browsing behavior, interests | $0.30-1.50 | $1,000/mo |
| **Google Performance Max** | Multi-format automation | Mixed signals, Google's ML | Varies | $2,000/mo |
| **Meta (FB/IG)** | Demand generation, B2C, visual products | Interests, behaviors, lookalikes | $0.50-3.00 | $1,000/mo |
| **LinkedIn** | B2B, decision-maker targeting | Job title, company, industry, seniority | $5-15 | $2,000/mo |
| **Twitter/X** | Tech audiences, thought leadership | Followers, interests, keywords | $0.50-3.00 | $500/mo |
| **TikTok** | 18-34 demographics, brand awareness | Interests, behaviors, creator affinity | $0.30-1.50 | $1,000/mo |
| **Reddit** | Niche communities, tech/gaming | Subreddit targeting | $0.50-2.00 | $500/mo |

### Platform Selection Decision Tree

```
Is the audience actively searching for your solution?
├── Yes → Google Search Ads
└── No → Do you know their job title or company?
    ├── Yes → LinkedIn Ads (B2B) or Meta Ads (B2C)
    └── No → Is your product visual or lifestyle?
        ├── Yes → Meta Ads (Instagram) or TikTok
        └── No → Is your audience technical?
            ├── Yes → Reddit Ads or Twitter/X
            └── No → Meta Ads (Facebook) or Google Display
```

---

## Campaign Structure Framework

### Account Hierarchy

```
Account
├── Campaign 1: [Objective] - [Product/Offer]
│   ├── Ad Group/Set 1: [Audience Segment A]
│   │   ├── Ad 1: [Creative Variant 1]
│   │   ├── Ad 2: [Creative Variant 2]
│   │   └── Ad 3: [Creative Variant 3]
│   └── Ad Group/Set 2: [Audience Segment B]
│       ├── Ad 1: [Creative Variant 1]
│       └── Ad 2: [Creative Variant 2]
└── Campaign 2: [Objective] - [Product/Offer]
```

### Naming Conventions

```
[Platform]_[Objective]_[Audience]_[Offer]_[Date]

Examples:
GOOG_Search_Brand_FreeTrial_2026Q1
META_Conv_Lookalike-Customers_Demo_Mar26
LI_LeadGen_CMOs-SaaS-500_Whitepaper_2026Q1
TIKTOK_Aware_18-34-Tech_BrandVideo_Mar26
```

### Campaign Types by Objective

| Objective | Google | Meta | LinkedIn |
|-----------|--------|------|----------|
| Awareness | Display, YouTube, PMax | Reach, Video Views | Brand Awareness |
| Consideration | Search, Display | Traffic, Engagement | Website Visits |
| Conversion | Search, PMax | Conversions, Leads | Lead Gen Forms |
| Retargeting | Display, Search (RLSA) | Custom Audiences | Matched Audiences |

---

## Audience Targeting by Platform

### Google Ads Targeting

| Targeting Type | Use When | How |
|---------------|----------|-----|
| Keyword targeting | Capturing search intent | Exact, phrase, and broad match keywords |
| Audience targeting | Layering intent signals | In-market, affinity, custom intent |
| RLSA | Retargeting in search | Website visitor lists on search campaigns |
| Customer Match | Targeting known contacts | Upload email lists for matched targeting |
| Similar audiences | Expanding from known customers | Google's lookalike from customer lists |

**Keyword match type strategy:**
- **Exact match** [keyword]: Highest intent, lowest volume, highest CPC
- **Phrase match** "keyword": Medium intent, medium volume
- **Broad match** keyword: Lowest intent, highest volume, lowest CPC (use with smart bidding)

### Meta Ads Targeting

| Targeting Type | Use When | How |
|---------------|----------|-----|
| Interest targeting | Cold prospecting | Layer 2-3 related interests |
| Lookalike audiences | Expanding from customers | 1-3% lookalike from best customers (by LTV) |
| Custom audiences | Retargeting | Website visitors, email lists, video viewers |
| Broad targeting | Trusting Meta's ML | No targeting restrictions, let the algorithm find converters |
| Detailed targeting | Narrow audience needed | Combine demographics + interests + behaviors |

**Lookalike best practices:**
- Seed with best customers (by LTV), not all customers
- Start with 1% lookalike (most similar), expand to 3-5% once proven
- Create separate lookalikes from different seeds (customers, trial users, email subscribers)

### LinkedIn Ads Targeting

| Targeting Type | Use When | How |
|---------------|----------|-----|
| Job title | Targeting decision-makers | Specific titles (CMO, VP Marketing, Head of Growth) |
| Job function | Broader role targeting | Marketing, Engineering, Finance |
| Company size | Enterprise vs. SMB | Employee count ranges |
| Industry | Vertical-specific campaigns | LinkedIn's industry categories |
| Seniority | C-suite vs. individual contributor | Manager, Director, VP, CXO |
| Skills | Technical targeting | Listed skills on profiles |
| Company list | ABM targeting | Upload target account lists |

**LinkedIn targeting rules:**
- Minimum audience size: 50,000 for awareness, 20,000 for conversion
- Layer 2-3 targeting dimensions maximum (more layers = too narrow)
- Exclude competitors, agencies, and job seekers if not relevant

---

## Budget Allocation Strategy

### Budget by Campaign Phase

**Phase 1: Testing (Weeks 1-4)**

| Allocation | Purpose |
|-----------|---------|
| 40% | Proven/safe campaigns (brand search, retargeting) |
| 40% | Testing new audiences and creative |
| 20% | Experimental channels or formats |

**Phase 2: Optimization (Weeks 5-8)**

| Allocation | Purpose |
|-----------|---------|
| 60% | Winning combinations from testing |
| 25% | Iterating on promising but unproven |
| 15% | New tests |

**Phase 3: Scaling (Weeks 9+)**

| Allocation | Purpose |
|-----------|---------|
| 70% | Proven performers |
| 20% | Expansion (new audiences, lookalikes, broader targeting) |
| 10% | Ongoing testing |

### Budget Scaling Rules

- Increase budget by 20-30% at a time, never more
- Wait 3-5 days between increases for algorithm learning
- Monitor CPA for 48 hours after increase — if CPA spikes, hold
- Never double a budget overnight (disrupts algorithm learning)
- If CPA increases > 30% after scaling, revert and investigate

### Budget Minimums by Platform

| Platform | Minimum Viable Monthly Budget | Optimal Monthly Budget |
|----------|------------------------------|----------------------|
| Google Search | $1,500 | $5,000+ |
| Google Display | $1,000 | $3,000+ |
| Meta Ads | $1,000 | $3,000+ |
| LinkedIn Ads | $2,000 | $5,000+ |
| TikTok Ads | $1,000 | $3,000+ |
| Reddit Ads | $500 | $2,000+ |

---

## Bid Strategy Progression

### Strategy Ladder

| Stage | Strategy | When to Use | Requirements |
|-------|----------|-------------|-------------|
| 1 | Manual CPC | Starting out, need control | None |
| 2 | Max Clicks | Building traffic data | Budget cap set |
| 3 | Target CPA | Optimizing for conversions | 30+ conversions/month |
| 4 | Target ROAS | Optimizing for revenue | 50+ conversions/month + revenue data |
| 5 | Value-based | Maximizing revenue | Conversion value tracking, 100+ conversions/month |

### Bid Strategy Rules

- Start with Manual CPC or Max Clicks until you have conversion data
- Switch to automated bidding after 30+ conversions in 30 days
- Set CPA targets 10-20% above your actual target (give the algorithm room)
- Never change bid strategy and creative at the same time
- Allow 14 days of learning phase after switching strategies

---

## Retargeting Playbook

### Funnel-Based Retargeting

| Funnel Stage | Audience | Message | Window | Frequency |
|-------------|----------|---------|--------|-----------|
| Top | Blog readers, video viewers | Educational, social proof | 30-90 days | 1-2x/week |
| Middle | Pricing/feature page visitors | Case studies, demos, comparisons | 7-30 days | 3-5x/week |
| Bottom | Cart/trial abandoners | Urgency, objection handling, offer | 1-7 days | Daily OK |

### Retargeting Audience Setup

| Audience | Source | Platform | Priority |
|----------|--------|----------|----------|
| All website visitors (30 days) | Pixel | All platforms | Medium |
| Pricing page visitors (14 days) | Pixel | All platforms | High |
| Cart/trial abandoners (7 days) | Pixel + Events | All platforms | Highest |
| Email subscribers (non-customers) | Email list | Meta, LinkedIn | Medium |
| Video viewers (50%+ watched) | Platform event | Meta, YouTube | Medium |
| Blog readers (engaged, 60s+) | Pixel + Events | All platforms | Low-Medium |

### Exclusions (Critical)

Always exclude:
- Existing paying customers (unless running upsell campaigns)
- Recent converters (7-14 day exclusion window)
- Bounced visitors (under 10 seconds on site)
- Irrelevant page visitors (careers, support, legal)
- Competitor employees (LinkedIn)

---

## Performance Optimization

### Optimization Decision Tree

```
Is CPA above target?
├── CTR is low (< 1% search, < 0.5% social)
│   ├── Creative fatigue? → Refresh creative
│   ├── Audience mismatch? → Refine targeting
│   └── Ad relevance low? → Improve message match
├── CTR is good, conversion rate low
│   ├── Landing page issue? → Audit page (speed, copy, CTA)
│   ├── Offer mismatch? → Align ad promise with page offer
│   └── Audience too broad? → Narrow targeting
└── CTR and CVR are good, CPA still high
    ├── CPM too high? → Try different placements/platforms
    ├── Competition driving up bids? → Adjust bid strategy
    └── Attribution issue? → Check conversion tracking
```

### Key Metrics by Objective

| Objective | Primary Metrics | Benchmarks (B2B SaaS) |
|-----------|----------------|----------------------|
| Awareness | CPM, Reach, Video View Rate | CPM: $5-15, VVR: 15-25% |
| Consideration | CTR, CPC, Time on Site | CTR: 1-3%, CPC: $2-8 |
| Conversion | CPA, ROAS, Conversion Rate | CPA: $50-200, CR: 2-5% |
| Retargeting | CPA, ROAS, Frequency | CPA: 30-50% lower than prospecting |

### Creative Fatigue Detection

| Signal | Threshold | Action |
|--------|-----------|--------|
| CTR declining week over week | 20%+ decline over 2 weeks | Refresh creative |
| Frequency above threshold | > 3 (display), > 5 (retargeting) | Expand audience or refresh |
| CPA increasing with stable CTR | 15%+ increase over 2 weeks | Test new creative angles |
| Engagement rate dropping | 30%+ decline | Full creative overhaul |

### Weekly Optimization Routine

| Task | Time | What to Check |
|------|------|---------------|
| Budget pacing | 5 min | Spend vs. plan, daily/weekly trends |
| CPA/ROAS check | 10 min | Performance vs. targets, by campaign |
| Top/bottom performers | 10 min | Pause worst, scale best |
| Audience analysis | 10 min | Which segments are converting? |
| Creative performance | 10 min | CTR by creative, fatigue signals |
| Frequency check | 5 min | Any audiences over-exposed? |
| Landing page CVR | 5 min | Post-click conversion rate |
| Competitor check | 5 min | New competitors in auction? |

---

## Attribution and Measurement

### Attribution Reality Check

| What Platforms Report | Reality |
|---------------------|---------|
| "This campaign drove 100 conversions" | Platform attribution is inflated by 20-50% |
| "ROAS is 5x" | Likely includes assisted conversions that would have converted anyway |
| Last-click attribution | Ignores all touchpoints before the final click |
| View-through conversions | Often just people who would have converted regardless |

### Practical Attribution Approach

1. **Use UTM parameters consistently** — Tag every campaign, ad, and link
2. **Track in GA4 as source of truth** — Compare platform data to GA4
3. **Calculate blended CAC** — Total marketing spend / Total new customers
4. **Use incrementality testing** — Hold-out tests to measure true lift
5. **Compare platform data vs. CRM data** — The gap is your attribution inflation

### UTM Standards

```
utm_source: google | meta | linkedin | twitter | tiktok | reddit
utm_medium: cpc | paid-social | display | video | sponsored
utm_campaign: [campaign-name-lowercase-hyphenated]
utm_content: [ad-variant-identifier]
utm_term: [keyword] (search only)
```

---

## Pre-Launch Checklist

### Tracking

- [ ] Pixel/tag installed and firing correctly
- [ ] Conversion events defined and tested with real test conversion
- [ ] UTM parameters added to all ad destination URLs
- [ ] GA4 goals/events configured to match conversion events
- [ ] Attribution window set appropriately (7 or 28 day)

### Landing Page

- [ ] Page loads under 3 seconds on mobile
- [ ] Page is mobile-responsive
- [ ] Headline matches the ad message
- [ ] CTA is above the fold on mobile
- [ ] Form works and submits to CRM/email system
- [ ] Thank you page/event fires conversion tracking

### Campaign Setup

- [ ] Budget set correctly (daily or lifetime)
- [ ] Bid strategy selected and configured
- [ ] Audience targeting reviewed (not too broad or narrow)
- [ ] Negative keywords added (Google Search)
- [ ] Exclusions configured (existing customers, competitors)
- [ ] Ad schedule set (if time-specific targeting needed)
- [ ] Geographic targeting verified
- [ ] Device targeting reviewed

### Creative

- [ ] 3+ creative variants per ad group/set
- [ ] All creative meets platform specifications
- [ ] Copy validated against platform policies
- [ ] Landing page URL correct for each ad

---

## Best Practices

1. **Tracking first, creative second** — Never launch without verified conversion tracking. A campaign without attribution is guesswork.

2. **Start narrow, expand gradually** — Begin with your highest-intent, most-defined audience. Expand after proving the funnel works.

3. **One change at a time** — Changing audience, creative, and bid strategy simultaneously makes it impossible to know what worked.

4. **Give algorithms time** — Do not judge campaign performance before the learning phase completes (typically 50 conversions or 7 days).

5. **Creative is the biggest lever** — On most platforms, creative quality matters more than targeting precision. Test creative aggressively.

6. **Match ad to landing page** — The #1 conversion killer is mismatched expectations between ad and landing page.

7. **Budget concentration beats distribution** — $3,000 on one proven platform outperforms $500 spread across six platforms.

8. **Build retargeting from day one** — Install pixels and build audiences even before you spend on retargeting.

9. **Compare platform data to reality** — Platform-reported conversions are always higher than actual. Use CRM and GA4 as the source of truth.

10. **Document everything** — Every campaign change, test result, and learning should be recorded. Institutional knowledge prevents repeating mistakes.

---

## Integration Points

- **Ad Creative** — Use for writing ad copy, generating headlines, and creating creative variations. Paid Ads handles the campaign strategy; Ad Creative handles the copy.
- **Landing Page Generator** — Use for building the landing pages ads drive traffic to.
- **Campaign Analytics** — Use for measuring campaign performance, attribution analysis, and ROI calculation.
- **Marketing Context** — Use as foundation for audience targeting and messaging alignment.
- **Marketing Psychology** — Apply psychological principles to improve ad creative and landing page conversion.
- **Copywriting** — Use for optimizing landing page copy to improve post-click conversion rates.

---

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| CPA above target with low CTR | Creative fatigue or audience mismatch | Refresh creative. Use `ad_copy_scorer.py` to validate new copy. |
| CPA above target with good CTR | Landing page conversion issue | Audit post-click experience: message match, page speed, form friction. |
| CTR dropping week over week | Creative fatigue (>3 frequency) | Refresh creative every 2-4 weeks. Expand audience to reduce frequency. |
| Budget not spending | Audience too narrow or bid too low | Check audience size with `audience_sizer.py`. Increase bid 10-20%. |
| Platform reports inflated conversions | Attribution window too wide | Compare platform data to GA4/CRM. Use incrementality testing for true lift. |
| Performance Max underperforming | Insufficient conversion data | Need 30+ conversions in 30 days for PMax to optimize. Start with Search campaigns. |
| CPA spikes after budget increase | Algorithm learning disrupted | Never increase budget more than 20-30% at a time. Wait 3-5 days between changes. |

---

## Success Criteria

- CPA within target range for campaign objective (B2B SaaS: $50-200 for qualified leads)
- ROAS above 3x for revenue-focused campaigns
- CTR above platform benchmarks: 2-5% search, 0.5-2% social
- Conversion tracking verified with test conversion before launch
- Budget allocation: 70% proven / 20% expansion / 10% testing (at scale)
- All campaigns have proper UTM tagging and GA4 attribution configured
- Weekly optimization routine completed with documented changes

---

## Scope & Limitations

**In Scope:** Campaign strategy, platform selection, audience targeting, budget allocation, bid strategies, retargeting, performance optimization, attribution, pre-launch checklists.

**Out of Scope:** Ad copy writing (use ad-creative), landing page design (use landing-page-generator), creative design/production, marketing automation, CRM configuration.

**Limitations:** Budget minimums and CPC benchmarks are directional estimates. Actual costs vary by industry, geography, and competition. Platform-reported metrics are typically 20-50% inflated versus CRM truth.

---

## Python Automation Tools

### 1. Ad Copy Scorer (`scripts/ad_copy_scorer.py`)
Scores ad copy against platform specs, compliance rules, and conversion best practices.

```bash
python scripts/ad_copy_scorer.py --headline "Cut churn by 30%" --description "See how 1200 SaaS teams reduced churn" --platform google
python scripts/ad_copy_scorer.py --file ads.json --json
```

### 2. CPC / CPA / ROAS Calculator (`scripts/cpc_calculator.py`)
Calculates key advertising metrics from campaign data with industry benchmarks.

```bash
python scripts/cpc_calculator.py --spend 5000 --clicks 1200 --conversions 45 --revenue 12000 --platform meta
python scripts/cpc_calculator.py --file campaign.json --json
```

### 3. Audience Sizer (`scripts/audience_sizer.py`)
Estimates target audience size and recommends budget based on platform and targeting criteria.

```bash
python scripts/audience_sizer.py --platform linkedin --targeting "CMOs at SaaS companies 50-500 employees"
python scripts/audience_sizer.py --file targeting.json --json
```

---

## programmatic-seo

Source path: `references/marketing/programmatic-seo/SKILL.md`

# Programmatic SEO

Production-grade framework for building SEO page sets at scale. Covers the full lifecycle from keyword pattern discovery through template design, data pipeline construction, quality assurance, and post-launch optimization. Designed for deployments ranging from 50 to 100,000+ pages.

## Core Capabilities

- **Opportunity assessment & playbook selection** — validate demand, rate data sources (Tier S-F), score the competitive moat, then pick from 14 page-set playbooks via the selection matrix and the weighted build-vs-skip decision matrix.
- **Keyword pattern mining** — extract repeating `[variable]` structures, map head/torso/long-tail/zero-volume distribution, and classify search intent.
- **Data pipeline design** — source → extraction → transformation → enrichment → validation → publication, with per-record quality gates and per-data-type update cadence.
- **Template architecture & quality control** — 6-zone page structure, the 3-of-5 uniqueness rule, URL conventions, pre-publication QA, thin-content detection, and hub-and-spoke internal linking.
- **Indexation & optimization** — crawl-budget strategy, tiered indexation priority, IndexNow, phased launch sequence, post-launch metrics dashboard, and anti-pattern / penalty avoidance.

## When to Use

**Use this skill when:**
- You have a repeating keyword pattern with 50+ variations
- You have (or can acquire) structured data to populate pages
- The search intent is consistent across variations
- Your domain has sufficient authority to compete

**Do NOT use when:**
- Each page requires unique editorial content (use content-creator instead)
- Total addressable pages < 30 (manual content is more effective)
- You lack a data source and would be generating thin placeholder content
- Your domain authority is below DR 20 and competitors are DR 60+

## Clarify First

Before scoping the build, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Keyword pattern** — the repeating `[variable]` structure with 50+ variations (drives keyword mining and template variables)
- [ ] **Structured data source** — the dataset that populates pages and its quality tier (drives the data pipeline and the 3-of-5 uniqueness rule; thin-content risk)
- [ ] **Search intent** — whether intent is consistent across all variations (drives playbook selection and template architecture)
- [ ] **Domain authority & scale** — your DR vs competitors and target page count (drives the build-vs-skip decision and indexation strategy)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
# Analyze keyword patterns for pSEO opportunities
python scripts/keyword_pattern_miner.py --keywords keywords.csv --json

# Score page templates for content quality and uniqueness
python scripts/template_scorer.py --template template.html --data sample_data.json

# Validate data quality for pSEO data pipeline
python scripts/data_validator.py --file data.csv --rules rules.json --json
```

## References

Load the reference that matches the phase you are in — keep this file lean and pull detail on demand:

- **[references/strategy-and-playbooks.md](references/strategy-and-playbooks.md)** — initial assessment (opportunity validation, data-source tiers, competitive moat), the 14 playbooks, playbook selection matrix, and the build-vs-skip decision matrix. Read when scoping an opportunity and choosing what to build.
- **[references/keyword-and-data.md](references/keyword-and-data.md)** — keyword pattern identification, volume distribution analysis, intent classification, and the full data pipeline (quality gates, update cadence). Read when mining keywords or designing the data feed.
- **[references/templates-and-quality.md](references/templates-and-quality.md)** — 6-zone page architecture, uniqueness requirements, URL structure, pre-publication QA checklist, thin-content detection, hub-and-spoke linking, and anti-patterns. Read when designing templates and QA gates.
- **[references/launch-and-optimization.md](references/launch-and-optimization.md)** — crawl-budget management, indexation priority, IndexNow, phased launch sequence, post-launch metrics dashboard, troubleshooting table, output artifacts, and success criteria. Read when launching and monitoring the page set.

## Scope & Limitations

**In scope:**
- Keyword pattern mining and volume distribution analysis
- Data pipeline design (source > extraction > transformation > validation > publication)
- Template architecture with uniqueness requirements
- Quality control frameworks including thin content detection
- Hub-and-spoke internal linking for pSEO page sets
- Phased indexation strategy and crawl budget management
- Post-launch optimization and monitoring dashboards

**Out of scope:**
- Individual editorial content creation (use Content Production)
- Data collection or web scraping implementation
- CMS or static site generator setup and configuration
- Server infrastructure for large-scale deployments
- Paid acquisition for pSEO pages
- Legal compliance for data usage rights

**Known limitations:**
- Google's 2026 helpful content system can deindex large page sets retroactively if quality drops below threshold
- Programmatic SEO at Tier F data (public/scraped) carries high penalty risk regardless of template quality
- Engagement metrics (bounce rate, time on page) now influence indexation decisions for pSEO pages
- AI content detection is improving — fully automated content generation without human oversight is increasingly risky
- Travel site case study: 50,000 city-swap pages had 98% deindexed within 3 months (per 2025 industry data)

## Related Skills

- **seo-audit** -- Run after pSEO pages are live to diagnose indexation issues, thin content warnings, or ranking problems across the page set.
- **schema-markup** -- Add structured data to pSEO templates (Product, FAQ, LocalBusiness) for rich snippet eligibility at scale.
- **site-architecture** -- Plan hub-and-spoke structure and crawl budget management for large pSEO deployments (500+ pages).
- **competitor-alternatives** -- Use the Comparisons playbook when building "[X] vs [Y]" pages; competitor-alternatives has dedicated comparison page frameworks.
- **content-creator** -- Use when individual pages in the set need editorial-quality unique content beyond template generation.

---

## schema-markup

Source path: `references/marketing/schema-markup/SKILL.md`

# Schema Markup Implementation

Production-grade structured data implementation covering 20+ schema types, rich result eligibility rules, AI search optimization, and CMS-specific deployment patterns. Handles auditing existing markup, implementing new schema, and fixing validation errors.

---

## Table of Contents

- [Operating Modes](#operating-modes)
- [Schema Type Selection Matrix](#schema-type-selection-matrix)
- [Implementation Patterns](#implementation-patterns)
- [Rich Result Eligibility Rules](#rich-result-eligibility-rules)
- [AI Search Optimization](#ai-search-optimization)
- [Knowledge Graph Strategy](#knowledge-graph-strategy)
- [CMS Deployment Guide](#cms-deployment-guide)
- [Validation and Testing](#validation-and-testing)
- [Common Errors and Fixes](#common-errors-and-fixes)
- [Audit Framework](#audit-framework)
- [Output Artifacts](#output-artifacts)
- [Related Skills](#related-skills)

---

## Clarify First

Before generating the schema, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Page type & operating mode** — audit existing, implement new, or fix errors; and on what page type (Article, Product, FAQPage, LocalBusiness…) — selects the schema type and workflow
- [ ] **Target rich result or AI-search goal** — which rich result or citation you want to win — sets the required-field checklist and eligibility rules
- [ ] **CMS / deployment platform** — WordPress, Webflow, Shopify, Next.js, or static — drives the deployment method and known warnings (e.g. GTM injection)
- [ ] **Source page content** — the real headline/author/price/Q&A to populate — schema must match visible content or Google penalizes it

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Operating Modes

### Mode 1: Audit Existing Markup
1. Extract all JSON-LD blocks from the page source
2. Validate required vs recommended fields per schema type
3. Cross-reference with Google's current rich result requirements
4. Score completeness 0-100 per schema block
5. Deliver prioritized fix list with corrected JSON-LD

### Mode 2: Implement New Schema
1. Identify page type and matching schema types
2. Select primary + supporting schema combination
3. Generate complete, copy-paste-ready JSON-LD populated with page content
4. Advise on placement method (inline head, CMS plugin, server-side rendering)
5. Test before deployment

### Mode 3: Fix Validation Errors
1. Map Google Search Console errors to specific fields
2. Identify root cause (missing field, wrong format, content mismatch)
3. Deliver corrected JSON-LD with change log
4. Explain the fix to prevent recurrence

---

## Schema Type Selection Matrix

### Primary Schema by Page Type

| Page Type | Primary Schema | Supporting Schema | Rich Result Type |
|-----------|---------------|-------------------|-----------------|
| Homepage | Organization | WebSite + SearchAction | Sitelinks search box |
| Blog post | Article | BreadcrumbList, Person (author), ImageObject | Article card |
| How-to guide | HowTo | Article, BreadcrumbList, ImageObject | How-to steps |
| FAQ page | FAQPage | BreadcrumbList | FAQ dropdowns |
| Product page | Product | Offer, AggregateRating, Review, BreadcrumbList | Product card |
| Local business | LocalBusiness | OpeningHoursSpecification, GeoCoordinates, PostalAddress | Local pack |
| Video page | VideoObject | Article (if embedded) | Video card |
| Category page | CollectionPage | BreadcrumbList, ItemList | -- |
| Event page | Event | Organization, Place, Offer | Event listing |
| Recipe | Recipe | NutritionInformation, AggregateRating | Recipe card |
| Course | Course | Organization, Offer | Course listing |
| Software/App | SoftwareApplication | Offer, AggregateRating | Software card |
| Job posting | JobPosting | Organization, Place | Job listing |
| Review page | Review | Product or LocalBusiness, Rating | Review snippet |
| Podcast episode | PodcastEpisode | PodcastSeries, Person | Podcast card |
| Author page | Person | sameAs links | Knowledge Panel |
| Company page | Organization | sameAs links, ContactPoint | Knowledge Panel |
| Breadcrumb trail | BreadcrumbList | -- | Breadcrumb rich result |
| Site navigation | SiteNavigationElement | -- | -- |
| Dataset | Dataset | DataCatalog | Dataset search |

### Stacking Rules

**Always add:**
- BreadcrumbList to any non-homepage if breadcrumbs exist on the page
- Organization to the homepage (site-wide identity)

**Common valid stacks:**
- Article + BreadcrumbList + Person + ImageObject (blog posts)
- Product + Offer + AggregateRating + BreadcrumbList (product pages)
- LocalBusiness + OpeningHoursSpecification + GeoCoordinates + Review (local pages)
- HowTo + Article + BreadcrumbList + ImageObject (guides)

**Never combine:**
- Product on a page that does not sell a product (Google penalizes misuse)
- Multiple Organization blocks for the same entity (combine into one)
- FAQPage on pages where the Q&A is not visible to users

---

## Implementation Patterns

### JSON-LD Format (Always Use This)

JSON-LD is the only format worth implementing. Google recommends it, it lives in the `<head>`, and it does not touch your HTML markup. Microdata and RDFa are legacy -- do not use them for new implementations.

### Placement

```html
<head>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Your Article Title",
    "author": {
      "@type": "Person",
      "name": "Author Name",
      "url": "https://example.com/authors/name",
      "sameAs": ["https://linkedin.com/in/name", "https://twitter.com/name"]
    },
    "datePublished": "2026-01-15",
    "dateModified": "2026-03-01",
    "image": "https://example.com/images/article-hero.jpg",
    "publisher": {
      "@type": "Organization",
      "name": "Company Name",
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/logo.png"
      }
    }
  }
  </script>
</head>
```

Multiple `<script type="application/ld+json">` blocks per page are valid. Use separate blocks for unrelated schema types. Nest related types within one block.

### Scope Rules

| Scope | Schema | Placement |
|-------|--------|-----------|
| Site-wide | Organization, WebSite + SearchAction | Homepage template header |
| Per-page | Article, Product, HowTo, FAQPage | Page-specific head injection |
| Per-element | BreadcrumbList | Every non-homepage |
| Conditional | Event, JobPosting | Only on pages with that content type |

---

## Rich Result Eligibility Rules

Google does not give rich results for all valid schema. These are the current requirements (as of 2026):

### Article Rich Result

| Field | Required | Notes |
|-------|----------|-------|
| headline | Yes | Must match visible page title |
| image | Yes | Must be crawlable, min 1200px wide |
| datePublished | Yes | ISO 8601 format |
| dateModified | Recommended | Must be >= datePublished |
| author.name | Yes | Must match a real person or organization |
| author.url | Recommended | Links to author page |
| publisher.name | Yes | |
| publisher.logo | Yes | Max 600x60px |

### Product Rich Result

| Field | Required | Notes |
|-------|----------|-------|
| name | Yes | Product name |
| image | Yes | Product photo |
| offers.price | Yes | Numeric value |
| offers.priceCurrency | Yes | ISO 4217 code |
| offers.availability | Recommended | Use schema.org/InStock etc. |
| aggregateRating.ratingValue | Recommended | Numeric |
| aggregateRating.reviewCount | Recommended | Integer |
| review | Recommended | At least 1 review |

### FAQPage Rich Result

| Field | Required | Notes |
|-------|----------|-------|
| mainEntity | Yes | Array of Question items |
| Question.name | Yes | The question text |
| Question.acceptedAnswer.text | Yes | The answer text |
| Visible on page | Yes | Q&A must be visible to users, not hidden |

### HowTo Rich Result

| Field | Required | Notes |
|-------|----------|-------|
| name | Yes | Title of the how-to |
| step | Yes | Array of HowToStep items |
| step.name | Yes | Step title |
| step.text | Yes | Step description |
| image | Recommended | Per-step or overall |
| totalTime | Recommended | ISO 8601 duration |

---

## AI Search Optimization

AI search systems (Google AI Overviews, Perplexity, ChatGPT Search, Bing Copilot) use structured data for content understanding, citation decisions, and entity recognition.

### Why Schema Matters for AI Search

1. **Content type classification** -- AI systems use `@type` to determine if content is a how-to, product listing, FAQ, or opinion piece
2. **Citation eligibility** -- FAQPage and HowTo schema increase citation likelihood because AI systems can extract structured Q&A and step-by-step content directly
3. **Freshness signals** -- `datePublished` and `dateModified` help AI systems filter by recency
4. **Authority signals** -- `author` with `sameAs` links to known profiles boosts entity recognition
5. **Entity connection** -- `Organization` with `sameAs` links to Wikidata, LinkedIn, and social profiles strengthens entity resolution

### AI Search Schema Playbook

| Action | Priority | Impact |
|--------|----------|--------|
| Add FAQPage schema to any page with Q&A content (even 3 questions) | High | Direct citation in AI answers |
| Add author Person schema with sameAs to LinkedIn, Twitter, Google Scholar | High | Author entity recognition |
| Add Organization with sameAs to Wikidata, LinkedIn, Crunchbase | High | Brand entity recognition |
| Keep dateModified accurate on every content update | Medium | Freshness filtering |
| Add HowTo schema to process/tutorial content | Medium | Step-by-step citation |
| Add SoftwareApplication schema to tool/product pages | Medium | Product recognition in AI answers |

---

## Knowledge Graph Strategy

Getting into Google's Knowledge Graph means your entity (person, company, product) is recognized and displayed in panels, AI answers, and cross-referenced searches.

### Knowledge Graph Entry Requirements

1. **Wikidata entry** -- Create or claim your entity on Wikidata.org
2. **Wikipedia presence** -- A Wikipedia article dramatically increases KG entry probability
3. **Consistent NAP** -- Name, Address, Phone must be identical across all citations
4. **sameAs network** -- Organization schema must link to all official profiles

### sameAs Best Practices

```json
{
  "@type": "Organization",
  "name": "Your Company",
  "url": "https://yourcompany.com",
  "sameAs": [
    "https://www.wikidata.org/wiki/Q12345678",
    "https://en.wikipedia.org/wiki/Your_Company",
    "https://www.linkedin.com/company/yourcompany",
    "https://twitter.com/yourcompany",
    "https://www.crunchbase.com/organization/yourcompany",
    "https://github.com/yourcompany"
  ]
}
```

**Order of importance for sameAs links:**
1. Wikidata (strongest entity signal)
2. Wikipedia
3. LinkedIn
4. Official social profiles
5. Industry directories (Crunchbase, G2, Capterra)

---

## CMS Deployment Guide

### WordPress
- **Yoast SEO / Rank Math**: Auto-generate Article, Organization, BreadcrumbList. Add custom schema via their blocks for HowTo and FAQPage.
- **Custom schema**: Add via `wp_head` action hook or a custom plugin.
- **Avoid**: Plugins that inject schema via JavaScript (Google may not render it).

### Webflow
- **Per-page**: Add custom code in page settings > Custom Code > Head
- **CMS-driven**: Use Webflow CMS to generate dynamic JSON-LD via embedded code blocks with CMS field references
- **Site-wide**: Add Organization schema in Project Settings > Custom Code > Head

### Shopify
- **Product schema**: Auto-generated by most themes. Verify it includes Offer and AggregateRating.
- **Article/Blog schema**: Usually missing -- add manually via theme.liquid or a schema app.
- **Organization**: Add to theme.liquid `<head>` section.

### Next.js / Custom React
- **Server-side rendering**: Generate JSON-LD in the page component and render in `<Head>`.
- **next-seo library**: Provides schema components for common types.
- **Dynamic pages**: Generate schema from your data layer, not hardcoded.

### Static sites (Hugo, Jekyll, Gatsby)
- **Template-level**: Add JSON-LD to layout templates using template variables.
- **Per-page**: Use frontmatter data to populate schema fields dynamically.

### Google Tag Manager (GTM)
- **Warning**: GTM-injected schema is often NOT indexed by Google because it renders client-side after JavaScript execution.
- **Use only when**: No other option exists (no CMS access, no dev resources).
- **Better alternative**: Server-side injection via CMS or template engine.

---

## Validation and Testing

### Three-Layer Validation

Test every schema implementation with all three tools before deployment:

| Tool | URL | What It Checks |
|------|-----|----------------|
| Google Rich Results Test | search.google.com/test/rich-results | Google's parser, rich result eligibility |
| Schema.org Validator | validator.schema.org | Full spec compliance (broader than Google) |
| Google Search Console | Enhancements section | Real-world errors at scale, post-deployment |

### Validation Workflow

1. **Pre-deployment**: Rich Results Test + Schema.org Validator on the rendered HTML
2. **Post-deployment (day 1)**: Check page is crawled via URL Inspection tool in GSC
3. **Post-deployment (week 2-4)**: Check Enhancements section in GSC for errors at scale
4. **Ongoing (monthly)**: Monitor GSC Enhancements for new errors from content updates

---

## Common Errors and Fixes

| Error | Root Cause | Fix |
|-------|-----------|-----|
| Missing `@context` | Schema block has no context declaration | Add `"@context": "https://schema.org"` |
| Missing required field | A required property is absent | Add the field with real content from the page |
| `image` URL is relative | `/image.jpg` instead of absolute URL | Use `https://example.com/image.jpg` |
| `dateModified` < `datePublished` | Impossible date relationship | Ensure dateModified >= datePublished |
| Markup does not match page content | Schema claims content not visible to users | Only add schema for content actually on the page |
| Deprecated property | Using old schema.org property names | Check current spec at schema.org |
| Nested type conflict | Product inside Article incorrectly | Keep types flat or use proper @graph nesting |
| Date format wrong | Not ISO 8601 | Use `"2026-01-15"` or `"2026-01-15T10:30:00Z"` |
| Empty string values | `"name": ""` passes syntax but fails semantics | Use real values, never empty strings |
| Array expected, single value given | `mainEntity` needs array for FAQPage | Wrap in `[]` array brackets |
| Logo too large | Publisher logo exceeds 600x60px | Resize or use a different logo format |
| GTM injection not indexed | Client-side rendering | Move to server-side `<head>` injection |

---

## Audit Framework

### Audit Scorecard (0-100)

| Dimension | Weight | Scoring |
|-----------|--------|---------|
| Required fields present | 40% | -10 per missing required field |
| Recommended fields present | 15% | -3 per missing recommended field |
| Rich result eligibility | 20% | Binary: eligible or not |
| Content-markup match | 15% | -5 per mismatch between schema and visible content |
| sameAs and entity signals | 10% | -5 per missing major platform link |

### Priority Classification

| Priority | Criteria | Action |
|----------|----------|--------|
| P0 Critical | Required field missing, blocks rich result | Fix immediately |
| P1 High | Recommended field missing, reduces eligibility | Fix this week |
| P2 Medium | Content mismatch, deprecated property | Fix this month |
| P3 Low | Missing sameAs link, optional enhancement | Add when convenient |

---

## Output Artifacts

| Artifact | Format | Description |
|----------|--------|-------------|
| Schema Audit Report | Scored table | Per-page schema inventory, completeness score, priority fixes |
| JSON-LD Implementation | Copy-paste code blocks | Complete schema for each page type, populated with placeholder values marked clearly |
| Error Fix Log | Before/after JSON-LD | Each fix explained with root cause and prevention |
| AI Search Gap Analysis | Recommendation table | Missing entity markup, FAQPage opportunities, sameAs gaps |
| CMS Implementation Guide | Step-by-step instructions | Platform-specific deployment instructions |
| Rich Result Eligibility Matrix | Page type x schema x eligibility | Which pages qualify for which rich result types |

---

## Related Skills

- **seo-audit** -- For full technical and content SEO audits spanning beyond structured data. Use when the problem is broader than schema.
- **site-architecture** -- For URL structure and navigation. Use when architecture is the root cause, not schema.
- **programmatic-seo** -- For sites with thousands of pages that need schema at scale. Schema patterns feed into pSEO template design.
- **content-creator** -- For content creation. Use before implementing Article schema to ensure content quality.

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Schema passes validation but no rich results appear | Missing required fields for rich result eligibility, or Google has not recrawled | Verify against Google Rich Results Test (not just schema.org validator); request reindexing via GSC |
| FAQPage schema not generating FAQ dropdowns | Questions not visible to users on the page, or site lacks sufficient authority | Ensure Q&A content is visible in page HTML, not hidden behind tabs or JS toggles |
| Product schema shows "missing field" warnings in GSC | Required fields (price, availability, review) absent or malformed | Add all required Product + Offer fields; use ISO 4217 for currency, schema.org/InStock for availability |
| GTM-injected schema not being indexed | Client-side rendering — Google may not execute GTM JavaScript for schema | Move schema from GTM to server-side `<head>` injection; GTM schema is unreliable for indexing |
| dateModified older than datePublished | Data entry error or CMS auto-populating incorrectly | Ensure dateModified >= datePublished; audit CMS date field logic |
| Multiple conflicting Organization blocks | Different plugins or templates injecting separate Organization schema | Consolidate into a single Organization block on the homepage; remove duplicates |
| Schema validated but Google shows "content mismatch" | Schema claims content not actually visible to users on the page | Only add schema for content physically present on the page — never fake or hidden content |

---

## Success Criteria

- **Rich result eligibility**: 100% of content pages with appropriate schema types eligible for rich results per Google Rich Results Test
- **Validation pass rate**: Zero errors in Google Search Console Enhancements reports across all schema types
- **Rich result CTR boost**: Structured data pages achieving 20-35% higher CTR than non-structured pages (2026 benchmark from SearchPilot testing)
- **AI citation impact**: FAQPage and HowTo schema present on all informational content pages to maximize AI extraction
- **Entity recognition**: Organization schema with 5+ sameAs links deployed site-wide; brand appearing in Knowledge Graph
- **Coverage breadth**: Schema implemented on 95%+ of indexable pages (BreadcrumbList minimum, content-specific types on relevant pages)
- **Freshness accuracy**: dateModified updated within 24 hours of every content change across all Article schema

---

## Scope & Limitations

**In scope:**
- Schema type selection and JSON-LD implementation for 20+ schema types
- Rich result eligibility verification and optimization
- AI search visibility through structured data
- Knowledge Graph entity optimization
- Schema validation, testing, and error resolution
- CMS-specific deployment guidance (WordPress, Webflow, Shopify, Next.js)

**Out of scope:**
- Content creation for schema-eligible pages (use Content Production)
- Technical SEO beyond structured data (use SEO Audit)
- Microdata or RDFa implementations (JSON-LD only — Google's recommendation)
- Custom schema.org extensions or vocabulary proposals
- Server-side rendering implementation
- CMS plugin development

**Known limitations:**
- Google does not guarantee rich results even with valid schema — authority and content quality also factor in
- GTM-injected schema is frequently not indexed — server-side deployment is required for reliability
- Schema.org spec updates faster than Google's support — not all valid types generate rich results
- Rich result types can be deprecated with minimal notice (e.g., HowTo rich results were restricted in 2023)
- Structured data CTR impact varies by industry and SERP features present

---

## Scripts

```bash
# Validate JSON-LD schema from a file or URL
python scripts/schema_validator.py --file schema.json --json

# Audit a page for schema coverage and completeness
python scripts/schema_validator.py --html page.html --verbose

# Generate JSON-LD templates for common page types
python scripts/schema_generator.py --type Article --title "My Post" --author "Jane" --json
```

---

## seo-audit

Source path: `references/marketing/seo-audit/SKILL.md`

# SEO Audit

Production-grade SEO audit framework with an 85-point checklist across 8 dimensions, severity-weighted scoring, automated diagnostic workflows, and prioritized remediation plans. Covers technical SEO, on-page optimization, content quality, competitive positioning, and migration readiness.

## Core Capabilities

- **85-point checklist across 8 dimensions** — crawlability, indexation, Core Web Vitals, on-page, content quality, infrastructure, off-page, analytics
- **Severity-weighted scoring** — Critical/High/Medium/Low multipliers roll up to an A–F health grade
- **Diagnostic deep dives** — CWV optimization stacks, indexation gap analysis, traffic-drop decision tree, cannibalization & intent matching, E-E-A-T and AI-content detection
- **Competitive gap analysis** — your site vs. 3 competitors across technical and content dimensions
- **Prioritized remediation** — P0–P4 priority framework, fix-list template, and migration checklists

## When to Use

Pick the operating mode that matches the situation:

- **Full Site Audit** — comprehensive audit across all 8 dimensions; use for initial assessment or annual reviews.
- **Focused Audit** — single-dimension deep dive when the problem area is already identified (e.g., failing Core Web Vitals, indexation issues).
- **Pre-Migration Audit** — for planned URL changes, platform switches, or redesigns; establishes baseline and redirect mapping.
- **Traffic Drop Diagnosis** — emergency diagnostic when organic traffic drops; follows the traffic-drop decision tree to isolate cause.

## Clarify First

Before auditing, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Audit mode** — full site, single-dimension focused, pre-migration, or traffic-drop diagnosis — sets scope and which of the 8 dimensions to run
- [ ] **Site URL + available data** — GSC, analytics, and crawl exports on hand — determines what can be verified vs. assumed in the findings
- [ ] **Primary symptom or goal** — e.g. ranking drop, indexation gap, failing Core Web Vitals — focuses the diagnostic deep-dives and remediation priority
- [ ] **Competitor set** — the 3 sites to benchmark against — drives the competitive gap analysis

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
# Check redirect chains and status codes
python scripts/redirect_checker.py --url https://example.com/old-page --json

# Analyze XML sitemap for errors
python scripts/sitemap_analyzer.py --sitemap https://example.com/sitemap.xml

# Score content quality for SEO
python scripts/content_scorer.py article.md --json
```

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/audit-checklist.md](references/audit-checklist.md)** — initial scoping questions, the full 85-point checklist across all 8 dimensions, and the severity-weighted scoring formula. Read when starting an audit or scoring results.
- **[references/diagnostics-and-analysis.md](references/diagnostics-and-analysis.md)** — Core Web Vitals optimization stacks, indexation gap analysis, traffic-drop decision tree, cannibalization/intent scoring, AI-content & E-E-A-T detection, competitive gap framework. Read when diagnosing a specific problem area.
- **[references/remediation-and-migration.md](references/remediation-and-migration.md)** — migration checklist (pre/during/post), P0–P4 remediation framework and plan template, output artifacts, troubleshooting table, and success criteria. Read when turning findings into an action plan.

## Scope & Limitations

**In scope:** technical SEO across all 8 audit dimensions, severity-weighted scoring with prioritized remediation, traffic-drop diagnosis, competitive gap analysis, pre/post-migration checklists, AI content quality detection.

**Out of scope:** content creation or rewriting (use Content Creator), structured data implementation (use Schema Markup), site architecture redesign (use Site Architecture), link building execution, paid search audits, server/CDN provisioning.

**Known limitations:** field CWV data requires sufficient traffic for CrUX; off-page signals need third-party tools (Ahrefs, SEMrush); AI Overview impact on CTR varies by query type; Google's algorithm changes 500–600 times/year, so findings are point-in-time.

## Integration Points

- **AI SEO** — run after audit to optimize for AI search citation alongside traditional findings.
- **Schema Markup** — use when audit reveals missing or broken structured data opportunities.
- **Site Architecture** — use when audit uncovers structural issues requiring architectural redesign.
- **Content Humanizer** — use when audit flags AI content detection signals on key pages.
- **Content Strategy / programmatic-seo** — use when audit reveals content gaps or keyword-gap clusters addressable at scale.

---

## seo-specialist

Source path: `references/marketing/seo-specialist/SKILL.md`

# SEO Specialist

The agent operates as a senior SEO specialist, delivering technical audits, keyword strategies, on-page optimization, link building plans, and performance analysis for organic search growth.

## Clarify First

Before starting, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Deliverable** — technical audit, keyword research, on-page optimization, link plan, or performance report — selects which workflow runs
- [ ] **Domain & seed topics/keywords** — the site and the terms you want to rank for — drives keyword research and prioritization
- [ ] **Business goal** — the conversion or revenue outcome behind ranking — sets prioritization by business value × ranking opportunity

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

1. **Run technical audit** - Check crawlability (robots.txt, sitemap, canonical tags), indexability (duplicate content, thin pages), performance (Core Web Vitals), and structure (URL hierarchy, internal linking). Checkpoint: zero critical crawl errors in Search Console.
2. **Research keywords** - Start with seed keywords, expand via competitor analysis and search suggest, analyze by volume/difficulty/intent, and prioritize by business value and ranking opportunity. Checkpoint: each target keyword has a mapped content asset.
3. **Optimize on-page elements** - Apply title tag, meta description, heading hierarchy, keyword placement, image alt text, and schema markup. Checkpoint: primary keyword appears in H1, first 100 words, and title tag.
4. **Build link acquisition plan** - Identify content-based (original research, guides), outreach-based (guest posts, HARO), and relationship-based (partners, testimonials) opportunities. Checkpoint: target links have DA 50+ and topical relevance.
5. **Monitor and report** - Track organic traffic, keyword rankings, Core Web Vitals, and conversion rate. Review weekly; report monthly. Checkpoint: dashboard covers visibility, engagement, and conversions.

## Technical SEO Audit Checklist

**Crawlability:**
- [ ] Robots.txt properly configured
- [ ] XML sitemap submitted and current
- [ ] No critical crawl errors in Search Console
- [ ] Canonical tags on all indexable pages
- [ ] Noindex/nofollow used correctly

**Performance (Core Web Vitals):**

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| LCP (Largest Contentful Paint) | < 2.5s | 2.5s - 4s | > 4s |
| FID (First Input Delay) | < 100ms | 100 - 300ms | > 300ms |
| CLS (Cumulative Layout Shift) | < 0.1 | 0.1 - 0.25 | > 0.25 |

**Structure:**
- [ ] Clean, descriptive URL slugs
- [ ] Proper heading hierarchy (single H1, logical H2/H3)
- [ ] Internal linking between related content
- [ ] Breadcrumbs implemented

## Keyword Research Process

1. **Seed** - Brainstorm topics, analyze competitors, mine customer interviews
2. **Expand** - Use Ahrefs/SEMrush, Google Suggest, People Also Ask, related searches
3. **Analyze** - Score by search volume, keyword difficulty, search intent, SERP features
4. **Prioritize** - Rank by business value x ranking opportunity

### Keyword Metrics Guide

| Metric | Good | Moderate | Difficult |
|--------|------|----------|-----------|
| Volume | 1000+ | 100-1000 | < 100 |
| Difficulty | < 30 | 30-60 | > 60 |
| CPC (commercial signal) | > $5 | $1-5 | < $1 |

### Search Intent Classification

| Intent | Signal Words | Content Type |
|--------|-------------|-------------|
| Informational | "how to", "what is", "guide" | Blog posts, tutorials |
| Navigational | Brand names, product names | Homepage, product pages |
| Commercial | "best", "reviews", "vs" | Comparison pages, reviews |
| Transactional | "buy", "discount", "pricing" | Product pages, landing pages |

## On-Page Optimization Checklist

**Title Tag:** primary keyword front-loaded, 50-60 characters, compelling for CTR
**Meta Description:** includes keyword, clear value prop, CTA, 150-160 characters
**Headings:** H1 contains primary keyword, H2s contain secondary keywords, logical hierarchy
**Content:** keyword in first 100 words, natural density, related terms (LSI), comprehensive coverage
**Images:** descriptive filenames, keyword-rich alt text, compressed, lazy-loaded

## Example: Optimized Page Structure

```html
<!-- Title: 58 chars, keyword front-loaded -->
<title>Cloud Cost Optimization: 7 Strategies That Cut AWS Bills 40%</title>

<!-- Meta: 155 chars, keyword + value prop + CTA -->
<meta name="description" content="Learn 7 proven cloud cost optimization
strategies used by 500+ engineering teams. Reduce AWS spend by 40% without
sacrificing performance. Free checklist inside.">

<!-- Schema markup for article -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Cloud Cost Optimization: 7 Strategies That Cut AWS Bills 40%",
  "author": {"@type": "Person", "name": "Jane Chen"},
  "datePublished": "2026-02-15",
  "publisher": {
    "@type": "Organization",
    "name": "CloudOps Weekly"
  }
}
</script>

<h1>Cloud Cost Optimization: 7 Strategies That Cut AWS Bills 40%</h1>
<p>Cloud cost optimization is the #1 priority for engineering leaders in 2026...</p>

<h2>1. Right-Size EC2 Instances Using Usage Data</h2>
<h3>How to Identify Oversized Instances</h3>

<h2>FAQ</h2>
<h3>What is cloud cost optimization?</h3>
<h3>How much can cloud optimization save?</h3>
```

## Link Quality Assessment

| Factor | High Quality | Low Quality |
|--------|-------------|-------------|
| Domain Authority | 50+ | < 20 |
| Relevance | Same industry | Unrelated |
| Traffic | Active site | Dead site |
| Link Type | Editorial | Paid/Spam |
| Anchor Text | Natural variation | Exact match spam |

## SEO Performance Dashboard

```
SEO Performance - March 2026
  Organic Traffic: 125,432 (+12% MoM)
  Rankings: Top 3: 45 | Top 10: 234
  Conversions: 542 (+15% MoM)

  Top Growing Keywords
  1. "cloud cost optimization" - #8 -> #3 (+5)
  2. "aws billing alerts"     - #15 -> #7 (+8)
  3. "kubernetes autoscaling"  - New -> #12

  Technical Health
  Core Web Vitals: Pass | Index: 1,234 pages | Crawl Errors: 3
```

## Scripts

```bash
# Site audit
python scripts/site_audit.py --url https://example.com --output audit.html

# Keyword research
python scripts/keyword_research.py --seed "cloud computing" --output keywords.csv

# Rank tracker
python scripts/rank_tracker.py --keywords keywords.csv --domain example.com

# Backlink analyzer
python scripts/backlink_analyzer.py --domain example.com --output links.csv
```

## Reference Materials

- `references/technical_seo.md` - Technical SEO guide
- `references/keyword_research.md` - Keyword research methods
- `references/link_building.md` - Link building playbook
- `references/algorithm_updates.md` - Google update history

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Rankings dropped after Google core update | E-E-A-T signals insufficient or content quality below new thresholds | Audit content against December 2025 / March 2026 core update criteria — add experience signals, author credentials, original data |
| High impressions but low CTR | Title tags and meta descriptions not compelling enough for the SERP | Rewrite titles with numbers, power words, and clear value props; test meta descriptions with hooks |
| FID replaced by INP — pages now failing CWV | INP measures all interactions, not just first — JS-heavy pages fail | Break long JS tasks, defer third-party scripts, audit event handlers; 43% of sites still fail INP in 2026 |
| Indexed pages declining in Search Console | Google tightening quality bar — deindexing thin or duplicate content | Consolidate thin pages, add unique content, improve E-E-A-T signals on remaining pages |
| AI Overviews stealing clicks from position 1 | Google AI Overviews now appear in 50%+ of queries, reducing organic CTR by ~42% | Optimize for AI citation (extractable content blocks), add FAQ schema, target queries less likely to trigger AI Overviews |
| Keyword cannibalization across blog and product pages | Multiple pages competing for same keyword with conflicting intent | Map one primary keyword per page, consolidate or redirect competing pages, differentiate intent |

---

## Success Criteria

- **Organic traffic growth**: 10%+ month-over-month organic traffic growth sustained over 6 months
- **Top 10 rankings**: 50%+ of target keywords ranking in top 10 positions within 6 months
- **Core Web Vitals**: All three metrics passing (LCP < 2.5s, INP < 200ms, CLS < 0.1) at 75th percentile — only 47-55% of sites achieve this in 2026
- **CTR performance**: Position 1 achieving 25%+ CTR, position 3 achieving 10%+ CTR (2026 benchmarks)
- **Conversion from organic**: Organic traffic converting at 2%+ for B2B, 2.5%+ for e-commerce (industry benchmarks)
- **Indexation health**: 95%+ of target pages indexed with zero critical crawl errors
- **E-E-A-T compliance**: Author bylines, credentials, and experience signals on 100% of content pages

---

## Scope & Limitations

**In scope:**
- Technical SEO auditing (crawlability, indexation, Core Web Vitals, site structure)
- Keyword research, intent classification, and prioritization
- On-page optimization (title tags, meta descriptions, headings, content, schema)
- Link building strategy and opportunity identification
- Organic search performance monitoring and reporting
- Algorithm update impact assessment and recovery planning

**Out of scope:**
- Paid search / Google Ads management
- Social media marketing and optimization
- Content writing and production (use Content Production skill)
- AI-specific search optimization (use AI SEO skill)
- Website development or code deployment
- Brand strategy and positioning

**Known limitations:**
- Keyword difficulty scores vary significantly across tools — no single source of truth
- Google algorithm changes 500-600 times per year; strategies require continuous adaptation
- AI Overviews are reducing organic CTR — position 1 no longer guarantees high click volume
- Backlink analysis requires third-party tools (Ahrefs, SEMrush, Moz) for comprehensive data
- INP optimization often requires developer involvement for JavaScript refactoring

---

## Integration Points

- **SEO Audit** — Use for comprehensive 85-point site audits when detailed diagnostic is needed.
- **AI SEO** — Use alongside traditional SEO for AI search citation optimization.
- **Schema Markup** — Use for structured data implementation after on-page optimization.
- **Site Architecture** — Use when structural issues (deep nesting, orphan pages) block ranking progress.
- **Content Strategy** — Use for topic selection and editorial calendar planning before SEO optimization.
- **Content Humanizer** — Use when content flagged as AI-generated needs authenticity improvement.

---

## Scripts

```bash
# Analyze keyword list for search intent and difficulty
python scripts/keyword_analyzer.py --keywords keywords.csv --json

# Simulate SERP appearance for a page
python scripts/serp_simulator.py --title "Cloud Cost Optimization Guide" --description "Learn 7 proven strategies..." --url "/guides/cloud-cost" --json

# Score content for on-page SEO quality
python scripts/content_scorer.py article.md --keyword "cloud cost optimization" --json
```

---

## site-architecture

Source path: `references/marketing/site-architecture/SKILL.md`

# Site Architecture & Internal Linking

Production-grade website architecture framework covering URL hierarchy design, internal linking strategy, navigation optimization, silo structure, and crawl equity management. Handles architecture audits, new site planning, and restructuring existing sites.

---

## Table of Contents

- [Operating Modes](#operating-modes)
- [URL Structure Design](#url-structure-design)
- [Navigation Architecture](#navigation-architecture)
- [Silo Structure and Topic Clusters](#silo-structure-and-topic-clusters)
- [Internal Linking Strategy](#internal-linking-strategy)
- [Crawl Equity Management](#crawl-equity-management)
- [Architecture Audit Framework](#architecture-audit-framework)
- [Restructuring Playbook](#restructuring-playbook)
- [Architecture Patterns by Site Type](#architecture-patterns-by-site-type)
- [Common Mistakes](#common-mistakes)
- [Output Artifacts](#output-artifacts)
- [Related Skills](#related-skills)

---

## Clarify First

Before generating the architecture, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Operating mode** — audit current, plan new, internal-linking optimization, or URL restructuring — determines the artifact produced
- [ ] **Site type** — SaaS, e-commerce, blog/content, local, docs, or marketplace — selects the URL pattern and architecture template
- [ ] **Core topics / silos** — the 3-7 topic clusters the site covers — drives the hub-and-spoke and internal-linking plan
- [ ] **Current URLs / crawl data** — sitemap or URL export — required for audits and redirect mapping

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Operating Modes

### Mode 1: Audit Current Architecture
Existing site needs structural assessment. Analyze depth distribution, orphan pages, link equity flow, and navigation effectiveness.

### Mode 2: Plan New Architecture
Building from scratch or full redesign. Map business goals to site sections, design URL hierarchy, plan navigation, and define content silos.

### Mode 3: Internal Linking Optimization
Structure is fine but link equity flow needs improvement. Identify hub pages, map spoke content, fix orphans, and optimize anchor text.

### Mode 4: URL Restructuring
Changing URLs on an existing site. Plan the new structure, build redirect maps, and manage the migration.

---

## URL Structure Design

### Depth Guidelines

| Depth | Example | Use When | SEO Impact |
|-------|---------|----------|------------|
| 1 level (flat) | `/cold-email-tips` | Blog posts, standalone pages | Best crawl equity per page |
| 2 levels | `/email-marketing/cold-email-tips` | Category is a rankable page itself | Good, category page accumulates authority |
| 3 levels | `/solutions/marketing/email-automation` | Product families, nested services | Acceptable if each level has content |
| 4+ levels | `/a/b/c/d/page` | Never | Diluted equity, poor UX, crawl issues |

**Decision rule:** If the intermediate directory URL (`/email-marketing/`) will NOT be a real page with its own content and ranking target, do not create the directory. Flat is better than empty hierarchy.

### URL Construction Rules

| Rule | Good | Bad | Why |
|------|------|-----|-----|
| Use hyphens | `/seo-audit` | `/seo_audit` | Underscores are not word separators for Google |
| Be descriptive | `/pricing` | `/pricing-page` | Redundant suffixes add nothing |
| Keep short | `/guides/technical-seo` | `/guides/technical-seo-audit-checklist-complete-guide` | Readability matters |
| Include keyword | `/guides/seo-audit` | `/guides/article?id=4827` | Descriptive URLs rank better |
| Be consistent with trailing slashes | Pick one: `/about` or `/about/` | Mix of both | Inconsistency creates duplicate content |
| Use lowercase | `/about-us` | `/About-Us` | Case sensitivity varies by server |

### URL Patterns by Site Type

| Site Type | Pattern | Example |
|-----------|---------|---------|
| SaaS | `/features/[feature]`, `/solutions/[use-case]`, `/integrations/[partner]` | `/features/analytics`, `/solutions/marketing`, `/integrations/slack` |
| E-commerce | `/[category]/[subcategory]/[product]` | `/mens/shoes/running-shoes-pro` |
| Blog/Content | `/blog/[slug]` or `/blog/[category]/[slug]` | `/blog/seo-audit-guide` |
| Local business | `/[service]/[location]` | `/plumbing/austin-tx` |
| Documentation | `/docs/[section]/[page]` | `/docs/api/authentication` |
| Marketplace | `/[category]/[listing]` | `/designers/john-smith` |

---

## Navigation Architecture

### Navigation Zones

Every site has 6 navigation zones. Each serves a different purpose and carries different SEO weight.

| Zone | Items | SEO Weight | Design Rule |
|------|-------|------------|-------------|
| Primary nav | 5-8 items max | High (sitewide equity) | Only pages you want to rank for. Never "Resources" without a landing page. |
| Secondary nav | 3-7 per section | Medium | Sub-navigation within a section/silo |
| Breadcrumbs | Dynamic | High (upward equity) | Every non-homepage page. Each segment must be a real link. |
| Footer nav | 8-15 items max | Low-Medium | Key pages only. Not a dumping ground for every page. |
| Contextual (in-content) | 3-5 per page | Highest | Most powerful signal. Natural editorial links within body content. |
| Sidebar | 5-10 items | Low-Medium | Related content, category listing |

### Primary Navigation Design

**Rules:**
- 5-8 items maximum. Cognitive overload starts at 9+ items.
- Every nav item links to a page you actively want to rank.
- Dropdown menus are fine, but the parent item must be a clickable, crawlable link (not just a hover trigger).
- Do not put utility pages (Contact, Privacy, Terms) in primary nav -- they belong in the footer.
- Mobile nav must expose the same structure as desktop nav (no hidden critical pages).

### Breadcrumb Implementation

Add breadcrumbs to every non-homepage page. They serve three functions:

1. **UX**: Show users their location in the hierarchy
2. **SEO**: Create sitewide upward internal links to hub/category pages
3. **Rich results**: Enable BreadcrumbList schema for SERP breadcrumbs

**Format:** `Home > Category > Subcategory > Current Page`

**Rules:**
- Every breadcrumb segment must be a real, crawlable link
- Never use breadcrumbs as styled text without links
- Add BreadcrumbList schema markup alongside visible breadcrumbs
- Breadcrumb hierarchy should match URL hierarchy

---

## Silo Structure and Topic Clusters

### Hub-and-Spoke Model

A silo is a self-contained cluster of content about one topic, where all pages link to each other and to a central hub page.

```
                    ┌──────────────────┐
                    │     HUB PAGE     │
                    │   /seo/          │
                    │   (Pillar content)│
                    └────────┬─────────┘
            ┌────────────────┼────────────────┐
       ┌────┴────┐      ┌───┴────┐      ┌────┴────┐
       │ SPOKE 1 │      │ SPOKE 2│      │ SPOKE 3 │
       │technical│      │on-page │      │  link   │
       │  seo    │      │  seo   │      │building │
       └────┬────┘      └───┬────┘      └────┬────┘
            │                │                │
       Cross-links     Cross-links      Cross-links
       between         between          between
       related         related          related
       spokes          spokes           spokes
```

### Building Topic Clusters

**Step 1:** Identify 3-7 core topics for your site (these become your silos)

**Step 2:** For each topic, create one pillar page (the hub) that covers the topic broadly

**Step 3:** Create spoke content for each major sub-question or sub-topic

**Step 4:** Implement linking:
- Hub links DOWN to every spoke
- Every spoke links UP to the hub (with keyword-rich anchor text)
- Spokes link ACROSS to related spokes within the same silo
- Cross-silo links are fine when contextually genuine

**Step 5:** Build the content before building the links. Links to non-existent content are useless.

### Silo Depth Guidelines

| Silo Size | Recommended Depth | Structure |
|-----------|------------------|-----------|
| 3-5 spokes | Flat | Hub + spokes, all at same level |
| 6-15 spokes | Shallow nested | Hub > Sub-hubs > Spokes |
| 16-50 spokes | Two-level | Hub > Category sub-hubs > Individual spokes |
| 50+ spokes | Paginated | Hub > Category sub-hubs > Paginated spoke listings |

---

## Internal Linking Strategy

### Link Equity Power Stack

Not all internal links carry equal weight. From most to least powerful:

| Rank | Link Type | Weight | When to Use |
|------|-----------|--------|-------------|
| 1 | In-content contextual link | Highest | Natural editorial links within body copy |
| 2 | Hub page link | High | Pillar page linking to all its spokes |
| 3 | Navigation link | Medium | Sitewide, consistent, but diluted by ubiquity |
| 4 | Breadcrumb link | Medium | Upward equity flow, consistent |
| 5 | Footer link | Low | Sitewide, Google discounts these |
| 6 | Sidebar link | Low | Often not in main content flow |

### Anchor Text Strategy

| Type | Example | Usage | Signal Strength |
|------|---------|-------|-----------------|
| Partial match | "effective cold email strategies" | Primary approach (60-70% of links) | Strong |
| Exact match | "cold email templates" | Use sparingly (10-15% of links) | Strong but risky if overused |
| Branded | "our email guide" | Natural variation (10-15%) | Moderate |
| Descriptive | "this comprehensive guide" | Natural variation (5-10%) | Weak but natural |
| Generic | "click here", "learn more" | Avoid (< 5%) | None -- wasted signal |
| Naked URL | `https://example.com/guide` | Never for internal links | None |

### Orphan Page Detection and Resolution

An orphan page is indexed in Google but has zero inbound internal links. It is invisible to the site's link graph.

**Detection method:**
1. Export all indexed URLs (GSC Coverage or site: query)
2. Export all internal link targets (crawl tool or link extraction)
3. Pages in set A but not set B are orphans

**Resolution actions:**

| Orphan Type | Action |
|-------------|--------|
| Valuable content, belongs in a silo | Add contextual links from 3+ related pages |
| Old content, still relevant | Link from hub page and 1-2 spokes |
| Outdated content, no value | Redirect to relevant page or noindex |
| Utility page (shouldn't be indexed) | Add noindex |

### Internal Linking Audit Checklist

| Check | Pass Criteria |
|-------|---------------|
| Every content page has 3-5 outbound internal links | No page links only to itself or navigation |
| Every target page has 3+ inbound internal links | No orphans in the indexed set |
| Hub pages link to all their spokes | Complete coverage |
| Anchor text is descriptive and varied | No > 30% exact match for any keyword |
| No broken internal links | 0 broken links |
| Link depth from homepage < 4 clicks | 95%+ of pages within 3 clicks |

---

## Crawl Equity Management

### Homepage Equity Distribution

The homepage is your highest-equity page. Use it wisely.

| Homepage Link Target | Priority |
|---------------------|----------|
| Hub/pillar pages (top of each silo) | Highest -- link from homepage content area |
| Key product/service pages | High -- link from homepage or primary nav |
| Top-performing content | Medium -- link if contextually relevant |
| Utility pages (contact, about) | Low -- footer links only |
| Blog index | Medium -- primary or secondary nav |

### Crawl Budget Allocation

| Page Category | % of Crawl Budget | Optimization |
|--------------|-------------------|--------------|
| Money pages (product, pricing, features) | 20-30% | Internal link from homepage + nav |
| Pillar content (hub pages) | 20-30% | Extensive internal linking |
| Spoke content (blog, guides) | 30-40% | Linked from hubs + contextual |
| Utility pages (about, contact, legal) | 5-10% | Footer links only, minimal crawl |
| Tag/archive/pagination | < 5% | Noindex if thin, limit crawling |

---

## Architecture Audit Framework

### Audit Scorecard

| Dimension | Weight | Check |
|-----------|--------|-------|
| Crawl depth | 20% | 95%+ pages within 3 clicks of homepage |
| Orphan pages | 20% | 0 orphan pages in indexed set |
| URL cleanliness | 15% | Clean, descriptive, consistent URLs |
| Navigation completeness | 15% | All key pages accessible via primary/secondary nav |
| Internal link coverage | 15% | Every page has 3+ inbound internal links |
| Silo coherence | 10% | Topic clusters are well-defined with clear hub-spoke relationships |
| Breadcrumb implementation | 5% | Present on all non-homepage pages with schema |

### Red Flag Indicators

| Signal | Severity | Action |
|--------|----------|--------|
| Pages > 3 clicks from homepage | High | Create shortcuts via nav or hub page links |
| Hub page has no content (just links) | High | Add pillar content to all hub pages |
| Generic anchor text dominant (> 30%) | Medium | Rewrite anchor text to be descriptive |
| No breadcrumbs on deep pages | Medium | Implement breadcrumbs with BreadcrumbList schema |
| Sitemap includes noindex pages | Medium | Filter sitemap to only indexable pages |
| Primary nav links to utility pages | Low | Move Contact/Privacy to footer |
| Footer contains 50+ links | Low | Reduce to 8-15 key pages |

---

## Restructuring Playbook

### When to Restructure

| Signal | Restructure? | Alternative |
|--------|-------------|-------------|
| Complete URL overhaul needed | Yes | -- |
| Adding 3 new sections | Partial -- new sections only | -- |
| Fixing orphan pages | No | Add internal links, no URL changes needed |
| Improving nav | No | Update navigation, keep URLs |
| Moving to new CMS | Yes (usually) | Keep URL structure if CMS supports it |

### Restructuring Steps

1. **Crawl current site** -- Export all URLs, internal links, and rankings
2. **Map current to new** -- Create 1:1 URL redirect mapping
3. **Build redirect rules** -- 301 redirects for every changed URL
4. **Chain existing redirects** -- Update old redirects to point to final destination
5. **Update internal links** -- Point to new URLs (do not rely on redirects for internal links)
6. **Update sitemap** -- Reflect new URL structure
7. **Monitor for 60 days** -- Watch for crawl errors, ranking changes, traffic impact

---

## Architecture Patterns by Site Type

### SaaS Website

```
/                           Homepage
├── /features/              Features hub
│   ├── /features/analytics Analytics feature
│   └── /features/reporting Reporting feature
├── /solutions/             Solutions hub (by use case)
│   ├── /solutions/marketing Marketing use case
│   └── /solutions/sales    Sales use case
├── /integrations/          Integrations hub
│   ├── /integrations/slack Slack integration
│   └── /integrations/salesforce Salesforce integration
├── /pricing                Pricing page
├── /blog/                  Blog index
│   ├── /blog/seo-guide     Blog post
│   └── /blog/growth-tips   Blog post
├── /docs/                  Documentation
└── /about                  About page
```

### E-commerce Site

```
/                           Homepage
├── /[category]/            Category page (with content)
│   ├── /[category]/[subcategory]/ Subcategory (with content)
│   │   └── /[category]/[subcategory]/[product] Product page
│   └── /[category]/[product]      Product (if no subcategory)
├── /brands/                Brand hub
│   └── /brands/[brand]     Brand page
├── /blog/                  Content hub
└── /sale/                  Promotions hub
```

### Content/Media Site

```
/                           Homepage
├── /[topic]/               Topic hub (pillar content)
│   ├── /[topic]/[subtopic] Subtopic article
│   └── /[topic]/[guide]    In-depth guide
├── /authors/               Author hub
│   └── /authors/[name]     Author page
├── /tools/                 Free tools hub
│   └── /tools/[tool]       Individual tool
└── /newsletter             Newsletter signup
```

---

## Common Mistakes

| Mistake | Why It Hurts | Fix |
|---------|-------------|-----|
| Orphan pages | No equity flows in, Google deprioritizes | Add contextual internal links from related content |
| URL changes without redirects | Lost link equity and broken backlinks | Always 301 redirect old URLs |
| Deep nesting (4+ levels) | Diluted crawl equity, confusing UX | Flatten structure |
| Empty category pages | Thin pages do not rank | Add pillar content to all category/hub pages |
| Homepage linking to nothing | Wastes highest-equity page | Link from home to all hub pages |
| Footer with 100+ links | Dilutes equity across too many targets | Limit footer to 8-15 key pages |
| Navigation not matching user mental model | Users leave, engagement drops | Run card-sort testing with real users |
| Dynamic parameter URLs | Creates duplicate content | Canonicalize or block with robots.txt |
| Sitewide sidebar links to every post | Diluted equity, adds noise | Remove or limit to "popular" posts |

---

## Output Artifacts

| Artifact | Format | Description |
|----------|--------|-------------|
| Architecture Audit Scorecard | Weighted score table | Per-dimension scores with red flag indicators |
| Site Tree Diagram | Text-based hierarchy | Visual URL structure with annotations |
| URL Specification Table | Table | URL pattern, title template, parent page, schema type per section |
| Internal Linking Plan | Hub-spoke map | Topic cluster map with anchor text guidelines and orphan fix list |
| Redirect Map | Before/after URL table | 1:1 mapping for URL restructuring with 301 implementation |
| Navigation Spec | Zone-by-zone design | Primary, secondary, breadcrumb, footer, and contextual nav plans |

---

## Related Skills

- **seo-audit** -- For comprehensive SEO audits where architecture is one of several problem areas. Use seo-audit for the full picture, site-architecture for deep structural work.
- **schema-markup** -- For adding BreadcrumbList and other structured data after architecture decisions are finalized.
- **programmatic-seo** -- For hub-and-spoke structures at scale when generating hundreds of template-based pages.
- **content-creator** -- For creating the pillar content that hub pages need to rank effectively.

---

## Troubleshooting

| Problem | Likely Cause | Fix |
|---------|-------------|-----|
| Orphan pages appearing in Google index | Pages exist in sitemap or have external links but no internal links pointing to them | Add contextual internal links from 3+ related pages; update hub pages to include them |
| Crawl depth exceeds 4+ clicks for key pages | Flat navigation missing or hub pages not linking to spokes | Create shortcut links via primary nav, hub page content blocks, or featured sections |
| Category/hub pages ranking poorly | Hub pages have no substantive content — just link lists | Add 800+ words of pillar content to every hub page; they must rank on their own merit |
| Redirect chains after site migration | Old redirects not updated to point to final destination; chains accumulate over multiple migrations | Audit all existing redirects; collapse chains so every redirect points directly to the final URL |
| Internal links using generic anchor text | "Click here" and "learn more" anchor text dominating internal links | Rewrite anchors to be descriptive with partial-match keywords; aim for 60-70% partial match |
| New sections not getting crawled | No internal links from existing high-authority pages to new section | Add contextual links from homepage and related hub pages; submit new section sitemap |

---

## Success Criteria

- **Crawl depth**: 95%+ of indexable pages reachable within 3 clicks from homepage
- **Zero orphan pages**: No indexed pages without at least 3 inbound internal links
- **URL cleanliness**: 100% of URLs follow the established pattern — lowercase, hyphenated, descriptive, consistent trailing slash policy
- **Navigation coverage**: All key revenue and pillar pages accessible via primary or secondary navigation
- **Internal link density**: Every content page has 3-5 outbound contextual internal links with descriptive anchor text
- **Silo coherence**: Each topic cluster has a defined hub page with bidirectional links to all spokes
- **Breadcrumb coverage**: BreadcrumbList schema present on 100% of non-homepage pages

---

## Scope & Limitations

**In scope:**
- URL hierarchy design and restructuring
- Navigation architecture (primary, secondary, breadcrumb, footer, contextual, sidebar)
- Silo structure and topic cluster planning
- Internal linking strategy and optimization
- Crawl equity analysis and optimization
- Architecture audits with scored reports
- URL migration planning with redirect mapping

**Out of scope:**
- Content creation for hub pages (use Content Production)
- Schema markup implementation (use Schema Markup)
- Technical SEO beyond architecture (use SEO Audit)
- Visual design or UX design of navigation
- CMS development or template coding
- External link building

**Known limitations:**
- Crawl equity distribution is estimated — Google does not publish exact PageRank flow data
- Architecture changes on large sites (10K+ pages) require careful phased migration to avoid traffic loss
- Navigation testing (card sorts, tree tests) requires user research tools and participants
- Cross-silo linking recommendations are qualitative — no deterministic formula exists for optimal cross-linking density

---

## Scripts

```bash
# Analyze sitemap for depth and structure issues
python scripts/sitemap_analyzer.py --file sitemap.xml --json

# Check URLs for redirect chains and patterns
python scripts/redirect_checker.py --file urls.txt --json

# Map internal link structure from a sitemap
python scripts/link_mapper.py --sitemap sitemap.xml --json
```

---

## social-content

Source path: `references/marketing/social-content/SKILL.md`

# Social Content

Platform-native social media content creation, scheduling, and optimization for building audience, driving engagement, and supporting business goals.

---

## Table of Contents

- [Keywords](#keywords)
- [Quick Start](#quick-start)
- [Platform Reference Guide](#platform-reference-guide)
- [Content Pillar System](#content-pillar-system)
- [Hook Formula Library](#hook-formula-library)
- [Platform-Specific Formats](#platform-specific-formats)
- [Content Calendar Framework](#content-calendar-framework)
- [Repurposing System](#repurposing-system)
- [Engagement Strategy](#engagement-strategy)
- [Analytics and Optimization](#analytics-and-optimization)
- [Best Practices](#best-practices)
- [Integration Points](#integration-points)

---

## Keywords

social content, social media, LinkedIn post, Twitter thread, Instagram carousel, TikTok content, social calendar, engagement strategy, content pillar, hook formulas, viral content, social scheduling, platform-specific content, social media strategy, content repurposing, social analytics, audience building, personal brand, company brand, social media optimization

---

## Clarify First

Before creating the post, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Platform** — LinkedIn, X, Instagram, TikTok, or Facebook — sets format, length limits, and posting rules
- [ ] **Goal & CTA** — engagement, traffic, or conversion — determines the hook formula and call-to-action
- [ ] **Audience & content pillar** — who it's for and which pillar (educational, BTS, promo…) — shapes topic and tone
- [ ] **Format** — single post, thread, carousel, or short video — drives the platform-specific structure

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

### Create a Social Post

1. Choose the platform and format
2. Select a hook from the formula library
3. Write the body following platform-specific guidelines
4. Add a CTA aligned with your goal (engagement, traffic, conversion)
5. Include relevant hashtags per platform best practices
6. Schedule or post at optimal time for your audience

### Build a Content Calendar

1. Define 3-5 content pillars aligned with expertise and audience needs
2. Assign percentage allocation to each pillar
3. Map pillar topics to platform-specific formats
4. Build a weekly template with assigned slots
5. Batch create content (2-3 hours per week)
6. Schedule with room for real-time/reactive posts

---

## Platform Reference Guide

### Platform Quick Comparison

| Platform | Best For | Posting Frequency | Top Format | Audience |
|----------|----------|------------------|-----------|----------|
| LinkedIn | B2B, thought leadership | 3-5x/week | Carousels, text posts | Professionals, decision-makers |
| Twitter/X | Tech, real-time, community | 3-10x/day | Threads, hot takes | Tech, media, creators |
| Instagram | Visual brands, lifestyle, B2C | 1-2 posts + Stories daily | Reels, carousels | 18-44, visual-first audiences |
| TikTok | Brand awareness, younger demos | 1-4x/day | Short-form video | 18-34, entertainment-first |
| Facebook | Communities, local, older demos | 1-2x/day | Groups, native video | 30-65, community-oriented |
| YouTube | Long-form education, tutorials | 1-4x/month | Videos, Shorts | All ages, search-driven |

### Platform-Specific Rules

**LinkedIn:**
- Maximum post length: 3,000 characters (but 1,200-1,800 performs best)
- First 2-3 lines must hook (everything after "see more" is hidden)
- External links in comments, not post body (algorithm deprioritizes link posts)
- Carousels (PDF uploads) get highest organic reach
- Best posting times: Tuesday-Thursday, 7-9 AM in target timezone

**Twitter/X:**
- 280 characters per tweet, threads for longer content
- First tweet of thread is the hook — it determines everything
- Quote tweets with added insight outperform plain retweets
- No more than 2-3 hashtags (fewer is better)
- Best posting times: Monday-Friday, 8-10 AM and 12-1 PM

**Instagram:**
- Feed posts: square (1:1) or vertical (4:5)
- Reels: vertical (9:16), 15-90 seconds
- Carousels: up to 10 slides, first slide is the hook
- Stories: 24-hour content, polls/questions drive engagement
- Hashtags: 3-5 relevant ones (algorithm change in 2025 reduced hashtag importance)

**TikTok:**
- Video length: 15-60 seconds optimal (up to 10 minutes)
- Hook in first 2 seconds (viewers decide instantly)
- Captions: 80-100 characters
- Native feel outperforms polished production
- Trending sounds increase reach significantly

---

## Content Pillar System

### Defining Your Pillars

Choose 3-5 pillars that sit at the intersection of:
- Your expertise (what you know deeply)
- Audience interest (what they want to learn)
- Business connection (what supports your goals)

### Pillar Allocation Template

| Pillar | % of Content | Purpose | Content Types |
|--------|-------------|---------|---------------|
| Industry insights | 30% | Build authority | Data, trends, predictions, analysis |
| Educational | 25% | Provide value | How-tos, frameworks, tips, tutorials |
| Behind-the-scenes | 20% | Build trust | Building stories, team, process, failures |
| Personal/opinion | 15% | Build connection | Stories, values, contrarian takes, lessons |
| Promotional | 10% | Drive business | Product updates, launches, offers, case studies |

### Pillar-to-Platform Mapping

| Pillar | LinkedIn | Twitter/X | Instagram | TikTok |
|--------|----------|-----------|-----------|--------|
| Industry insights | Data post, article share | Thread, commentary | Carousel infographic | Trend reaction video |
| Educational | Carousel, text post | Thread, tip tweet | Carousel, Reel | Tutorial video |
| Behind-the-scenes | Story post, company update | Tweet, photo | Stories, Reel | BTS video |
| Personal/opinion | Text post, story | Hot take, quote | Quote graphic | Story time video |
| Promotional | Case study, announcement | Launch tweet, thread | Product showcase | Demo video |

---

## Hook Formula Library

### Curiosity Hooks

| Formula | Example |
|---------|---------|
| "I was wrong about [belief]." | "I was wrong about cold email." |
| "The real reason [X] happens isn't what you think." | "The real reason your posts don't get engagement isn't the algorithm." |
| "[Result] — and it only took [timeframe]." | "10,000 followers — and it only took 90 days." |
| "Here's what nobody tells you about [topic]:" | "Here's what nobody tells you about startup marketing:" |
| "I spent [time] studying [X]. Here's what I found:" | "I spent 6 months studying viral LinkedIn posts. Here's what I found:" |

### Story Hooks

| Formula | Example |
|---------|---------|
| "Last week, [unexpected thing] happened." | "Last week, our biggest deal fell through." |
| "3 years ago, I [past state]. Today, [current state]." | "3 years ago, I had 200 followers. Today, I have 50,000." |
| "I almost [big mistake]." | "I almost turned down the best job of my career." |
| "Someone asked me [question]. My answer surprised them." | "Someone asked me what the best marketing channel is. My answer surprised them." |

### Value Hooks

| Formula | Example |
|---------|---------|
| "How to [outcome] (without [pain]):" | "How to grow on LinkedIn (without posting every day):" |
| "[Number] [things] that [outcome]:" | "7 headline formulas that actually convert:" |
| "Stop [mistake]. Do this instead:" | "Stop writing 'I'm excited to announce.' Do this instead:" |
| "The [X] framework I use for [Y]:" | "The content framework I use for every LinkedIn post:" |

### Contrarian Hooks

| Formula | Example |
|---------|---------|
| "Unpopular opinion: [bold statement]" | "Unpopular opinion: SEO is dead for most startups." |
| "[Common advice] is wrong. Here's why:" | "'Post every day on LinkedIn' is wrong. Here's why:" |
| "Everyone is doing [X]. Almost everyone is wrong." | "Everyone is doing content marketing. Almost everyone is wrong." |

### Data Hooks

| Formula | Example |
|---------|---------|
| "I analyzed [X] [things]. Here's the data:" | "I analyzed 500 LinkedIn posts. Here's the data:" |
| "[Surprising statistic]." | "93% of B2B buyers research online before talking to sales." |
| "[X] vs [Y]: the numbers don't lie." | "Short posts vs. long posts: the numbers don't lie." |

---

## Platform-Specific Formats

### LinkedIn Post Formats

**Text Post (highest frequency):**
```
[Hook — first 2 lines must compel "see more" click]

[Body — 5-10 lines of content, short paragraphs]

[One-line insight or lesson]

[CTA — question to drive comments]
```

**Carousel (highest reach):**
- Slide 1: Bold hook statement (title slide)
- Slides 2-8: One point per slide, clear and visual
- Final slide: Summary + CTA ("Follow for more," "Save this")
- Upload as PDF for native carousel format

**Poll (highest engagement):**
- Use for genuine questions relevant to your audience
- 3-4 options maximum
- Add context in the post body explaining why the question matters
- Follow up with a post sharing the results

### Twitter/X Thread Format

```
Tweet 1: [HOOK — the tweet that determines if anyone reads further]

Tweet 2: [Context or setup — why this matters]

Tweet 3-7: [Main content — one point per tweet]

Tweet 8: [Summary or key takeaway]

Tweet 9: [CTA — "Follow me for more on [topic]" or "RT tweet 1 if helpful"]
```

**Thread rules:**
- First tweet must stand alone as a complete thought
- Each tweet should make sense independently
- Use numbers ("1/9") for clarity
- End with a CTA that drives engagement or follows
- Quote-tweet your own first tweet to resurface the thread

### Instagram Carousel Format

- Slide 1: Bold statement or question (the hook)
- Slides 2-8: One clear point per slide
- Each slide has minimal text (30-50 words maximum)
- Consistent visual template (brand colors, fonts)
- Final slide: CTA ("Save this post," "Share with someone who needs this")

### TikTok Video Structure

```
0-2 seconds: HOOK (text on screen + verbal hook)
2-15 seconds: Core content (get to the point fast)
15-45 seconds: Details and examples
Final 5 seconds: CTA ("Follow for more" or "Comment your [X]")
```

---

## Content Calendar Framework

### Weekly Calendar Template

| Day | LinkedIn | Twitter/X | Instagram |
|-----|----------|-----------|-----------|
| Mon | Industry insight | Thread | Carousel |
| Tue | Educational post | Tips tweet | Stories |
| Wed | Behind-scenes | Engagement tweets | Reel |
| Thu | Personal/opinion | Thread | Educational |
| Fri | Promotional or story | Hot take | Stories |

### Batching Strategy (2-3 Hours Per Week)

| Step | Time | Output |
|------|------|--------|
| Review pillar topics | 15 min | 5-7 topic ideas for the week |
| Write LinkedIn posts | 45 min | 3-5 posts drafted |
| Write Twitter content | 30 min | 2-3 threads + 5 standalone tweets |
| Create Instagram content | 30 min | 2 carousels + 1 Reel concept |
| Schedule everything | 15 min | All content scheduled |
| Buffer for reactive content | 15 min | Slots left open for real-time posts |

### Content Queue Management

- Maintain 1-2 weeks of scheduled content at all times
- Review queue weekly for relevance (cancel anything no longer timely)
- Leave 2-3 open slots per week for reactive/trending content
- Evergreen content can be reshared monthly with fresh framing
- Adjust timing based on analytics data

---

## Repurposing System

### One Piece, Many Formats

| Source Content | LinkedIn | Twitter/X | Instagram | TikTok |
|---------------|----------|-----------|-----------|--------|
| Blog post | Key insight post + link in comments | Thread of takeaways | Carousel of main points | Summary video |
| Podcast episode | Quote post from guest | Quote tweet thread | Audiogram clip | Short clip |
| Webinar | Carousel of key slides | Thread of lessons | Highlights Reel | Short tips video |
| Customer case study | Story-format post | Results thread | Before/after carousel | Transformation video |
| Original data | Data analysis post | Stats thread | Infographic carousel | Data reaction video |

### Repurposing Workflow

1. **Publish pillar content** (blog, video, podcast)
2. **Extract 3-5 key insights** within 24 hours
3. **Create platform-native derivatives** (not copy-paste — reformat)
4. **Schedule across 1-2 weeks** after pillar publication
5. **Cross-reference** — derivatives link back to pillar content
6. **Track** which derivative formats drive the most engagement and traffic

---

## Engagement Strategy

### Daily Engagement Routine (30 Minutes)

| Task | Time | Purpose |
|------|------|---------|
| Respond to all comments on your posts | 5 min | Reward engagement, boost algorithmic reach |
| Comment on 5-10 posts from target accounts | 15 min | Build relationships, increase visibility |
| Share/repost with added insight | 5 min | Provide value, support network |
| Send 2-3 DMs to new connections | 5 min | Build 1:1 relationships |

### Quality Commenting Rules

What works:
- Add a new insight the original post missed
- Share a related experience or data point
- Ask a thoughtful follow-up question
- Respectfully disagree with nuance and reasoning

What fails:
- "Great post!" (adds no value)
- Emoji-only responses
- Self-promotional comments unrelated to the post
- Generic agreement without adding perspective

### Relationship Building Strategy

1. **Identify 20-50 accounts** in your space that your audience follows
2. **Engage consistently** (comment on their content 3-5x/week)
3. **Share their content** with added insight (not just retweet)
4. **DM thoughtfully** (reference specific content, not generic pitches)
5. **Collaborate** when relationship is established (co-create, guest post, podcast)
6. **Reciprocate** — when they engage with your content, acknowledge it

---

## Analytics and Optimization

### Metrics That Matter

| Metric | What It Tells You | Target |
|--------|-------------------|--------|
| Engagement rate | Content resonance | 2-5% (LinkedIn), 1-3% (Twitter) |
| Follower growth rate | Audience building momentum | 2-5% monthly |
| Comments per post | Conversation quality | Higher value than likes |
| Saves/bookmarks | Content utility | High saves = high value content |
| Shares/reposts | Content amplification | Indicates strong resonance |
| Profile visits | Curiosity driving | Growing = good brand building |
| Link clicks | Traffic driving | Track with UTMs |
| DMs received | Relationship building | Quality over quantity |

### Weekly Review Process

| Step | What to Analyze | Action |
|------|----------------|--------|
| Top 3 posts | Why did they perform? (Hook? Topic? Format?) | Do more of what worked |
| Bottom 3 posts | What went wrong? (Timing? Hook? Relevance?) | Adjust or avoid pattern |
| Engagement patterns | Which days/times got most engagement? | Optimize posting schedule |
| Follower quality | Are followers matching your ICP? | Adjust content if attracting wrong audience |
| Content pillar performance | Which pillars drive most engagement? | Rebalance allocation |

### Optimization Levers

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Low engagement | Weak hooks | Test new hook formulas |
| Declining reach | Algorithm change or fatigue | Try new formats, increase engagement activity |
| High reach, low engagement | Content attracts but does not resonate | More specific, opinionated, or actionable content |
| Followers not converting | Wrong audience | Adjust pillar mix toward more business-relevant content |
| Engagement but no traffic | No CTAs or links | Add intentional CTAs and link in comments/bio |

---

## Best Practices

1. **Platform-native always** — Never post the same content on every platform. Adapt format, length, and tone for each.

2. **Hook is everything** — If the first line does not stop the scroll, nothing else matters. Write the hook first.

3. **Consistency beats virality** — Posting 3x/week for 12 months beats going viral once and disappearing. Show up regularly.

4. **Engage more than you post** — Commenting on others' content builds relationships faster than your own posts. Aim for 3:1 engagement-to-posting ratio when starting.

5. **80/20 value-to-promotion** — No more than 10-20% of content should be promotional. The rest should educate, entertain, or inspire.

6. **Batch create, schedule ahead** — Context-switching between creating and distributing reduces quality. Batch write in 2-3 hour sessions.

7. **Reshare evergreen content** — Your best posts can be reshared monthly with fresh framing. Most of your audience did not see it the first time.

8. **Respond to every comment** — Responding within the first hour signals the algorithm that your content is generating conversation.

9. **Focus on 1-2 platforms first** — Master one platform before expanding. Spreading across five platforms with a small team dilutes impact.

10. **Track leading indicators** — Engagement rate and follower growth rate matter more than absolute follower count. A small, engaged audience beats a large, passive one.

---

## Integration Points

- **Content Strategy** — Use for deciding what topics to cover before creating social posts.
- **Content Production** — Use when pillar content needs to be created before repurposing to social.
- **Copywriting** — Use for long-form page copy. Social Content handles short-form platform-native posts.
- **Copy Editing** — Use to polish high-stakes social content (campaign launches, announcements).
- **Content Humanizer** — Use when AI-drafted social posts sound generic or robotic.
- **Brand Guidelines** — Reference brand voice and visual standards for social content consistency.
- **Marketing Context** — Use as foundation for audience, voice, and positioning alignment.
- **Ad Creative** — Use for paid social ad copy. Social Content handles organic posts.

---

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Low engagement despite posting | Weak hooks or wrong format | Test new hook formulas from the library. Try carousels or polls (highest engagement formats). |
| Declining reach week-over-week | Algorithm fatigue or format monotony | Mix formats weekly. Instagram/LinkedIn deprioritize repetitive content patterns. |
| High reach, low engagement | Content attracts but does not resonate | Make content more specific, opinionated, or actionable. Generic posts get impressions but no interaction. |
| Followers growing but not converting | Wrong audience or no CTAs | Adjust pillar mix toward more business-relevant content. Add intentional CTAs. |
| Hashtags not driving discovery (2026) | Instagram/LinkedIn reduced hashtag weight | Use 3-5 niche hashtags max. Shares and saves now outweigh hashtag reach on most platforms. |
| Content feels stale | Not repurposing or only one content source | Use the repurposing system: one pillar piece becomes 5-10 social derivatives. |
| Low comment-to-like ratio | Posts don't invite conversation | End posts with specific questions. Polls and hot takes drive 3-5x more comments. |

---

## Success Criteria

- Engagement rate above platform average: 2-5% LinkedIn, 1-3% Twitter/X, 2-5% Instagram
- Follower growth rate of 2-5% monthly (quality followers matching ICP)
- Comments per post consistently higher than likes-only engagement
- Content pillar mix: no more than 10-15% promotional content
- 1-2 weeks of scheduled content maintained at all times
- Daily engagement routine: 30 min/day responding and commenting on others' posts
- Saves/bookmarks increasing month-over-month (indicates high-value content)

---

## Scope & Limitations

**In Scope:** Organic social media content creation, platform-specific formatting, hook writing, content calendars, pillar systems, repurposing workflows, engagement tactics, analytics.

**Out of Scope:** Paid social ad copy (use ad-creative), social media account management tools, influencer outreach, community platform management (Discord, Slack), video production.

---

## Python Automation Tools

### 1. Engagement Calculator (`scripts/engagement_calculator.py`)
Calculates engagement rates by post and format, benchmarks against platform standards, identifies top performers.

```bash
python scripts/engagement_calculator.py posts.json
python scripts/engagement_calculator.py --sample --json
```

### 2. Post Scheduler (`scripts/post_scheduler.py`)
Generates optimal posting schedules with pillar allocation, format suggestions, and platform-specific timing.

```bash
python scripts/post_scheduler.py --platform linkedin --posts-per-week 5
python scripts/post_scheduler.py --platform instagram --posts-per-week 5 --json
```

### 3. Hashtag Analyzer (`scripts/hashtag_analyzer.py`)
Analyzes hashtag strategy for relevance, platform limits, and discovery potential. Flags overly broad tags.

```bash
python scripts/hashtag_analyzer.py "#saas #b2bmarketing #growth"
python scripts/hashtag_analyzer.py --file post.txt --platform instagram --json
```

---

## social-media-analyzer

Source path: `references/marketing/social-media-analyzer/SKILL.md`

# Social Media Analyzer

Campaign performance analysis with engagement metrics, ROI calculations, and platform benchmarks.

---

## Table of Contents

- [Analysis Workflow](#analysis-workflow)
- [Engagement Metrics](#engagement-metrics)
- [ROI Calculation](#roi-calculation)
- [Platform Benchmarks](#platform-benchmarks)
- [Tools](#tools)
- [Examples](#examples)

---

## Clarify First

Before analyzing, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Platform** — Instagram, Facebook, Twitter/X, LinkedIn, or TikTok — selects the correct benchmark set for comparison
- [ ] **Post/campaign data** — likes, comments, shares, saves, reach per post — required; reach must be unique users, not impressions
- [ ] **Ad spend** — total spend for the period — determines whether ROI/CPE/ROAS is calculated
- [ ] **Analysis goal** — full audit, top-performer patterns, ROI, or competitor comparison — focuses the output artifact

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Analysis Workflow

Analyze social media campaign performance:

1. Validate input data completeness (reach > 0, dates valid)
2. Calculate engagement metrics per post
3. Aggregate campaign-level metrics
4. Calculate ROI if ad spend provided
5. Compare against platform benchmarks
6. Identify top and bottom performers
7. Generate recommendations
8. **Validation:** Engagement rate < 100%, ROI matches spend data

### Input Requirements

| Field | Required | Description |
|-------|----------|-------------|
| platform | Yes | instagram, facebook, twitter, linkedin, tiktok |
| posts[] | Yes | Array of post data |
| posts[].likes | Yes | Like/reaction count |
| posts[].comments | Yes | Comment count |
| posts[].reach | Yes | Unique users reached |
| posts[].impressions | No | Total views |
| posts[].shares | No | Share/retweet count |
| posts[].saves | No | Save/bookmark count |
| posts[].clicks | No | Link clicks |
| total_spend | No | Ad spend (for ROI) |

### Data Validation Checks

Before analysis, verify:

- [ ] Reach > 0 for all posts (avoid division by zero)
- [ ] Engagement counts are non-negative
- [ ] Date range is valid (start < end)
- [ ] Platform is recognized
- [ ] Spend > 0 if ROI requested

---

## Engagement Metrics

### Engagement Rate Calculation

```
Engagement Rate = (Likes + Comments + Shares + Saves) / Reach × 100
```

### Metric Definitions

| Metric | Formula | Interpretation |
|--------|---------|----------------|
| Engagement Rate | Engagements / Reach × 100 | Audience interaction level |
| CTR | Clicks / Impressions × 100 | Content click appeal |
| Reach Rate | Reach / Followers × 100 | Content distribution |
| Virality Rate | Shares / Impressions × 100 | Share-worthiness |
| Save Rate | Saves / Reach × 100 | Content value |

### Performance Categories

| Rating | Engagement Rate | Action |
|--------|-----------------|--------|
| Excellent | > 6% | Scale and replicate |
| Good | 3-6% | Optimize and expand |
| Average | 1-3% | Test improvements |
| Poor | < 1% | Analyze and pivot |

---

## ROI Calculation

Calculate return on ad spend:

1. Sum total engagements across posts
2. Calculate cost per engagement (CPE)
3. Calculate cost per click (CPC) if clicks available
4. Estimate engagement value using benchmark rates
5. Calculate ROI percentage
6. **Validation:** ROI = (Value - Spend) / Spend × 100

### ROI Formulas

| Metric | Formula |
|--------|---------|
| Cost Per Engagement (CPE) | Total Spend / Total Engagements |
| Cost Per Click (CPC) | Total Spend / Total Clicks |
| Cost Per Thousand (CPM) | (Spend / Impressions) × 1000 |
| Return on Ad Spend (ROAS) | Revenue / Ad Spend |

### Engagement Value Estimates

| Action | Value | Rationale |
|--------|-------|-----------|
| Like | $0.50 | Brand awareness |
| Comment | $2.00 | Active engagement |
| Share | $5.00 | Amplification |
| Save | $3.00 | Intent signal |
| Click | $1.50 | Traffic value |

### ROI Interpretation

| ROI % | Rating | Recommendation |
|-------|--------|----------------|
| > 500% | Excellent | Scale budget significantly |
| 200-500% | Good | Increase budget moderately |
| 100-200% | Acceptable | Optimize before scaling |
| 0-100% | Break-even | Review targeting and creative |
| < 0% | Negative | Pause and restructure |

---

## Platform Benchmarks

### Engagement Rate by Platform

| Platform | Average | Good | Excellent |
|----------|---------|------|-----------|
| Instagram | 1.22% | 3-6% | >6% |
| Facebook | 0.07% | 0.5-1% | >1% |
| Twitter/X | 0.05% | 0.1-0.5% | >0.5% |
| LinkedIn | 2.0% | 3-5% | >5% |
| TikTok | 5.96% | 8-15% | >15% |

### CTR by Platform

| Platform | Average | Good | Excellent |
|----------|---------|------|-----------|
| Instagram | 0.22% | 0.5-1% | >1% |
| Facebook | 0.90% | 1.5-2.5% | >2.5% |
| LinkedIn | 0.44% | 1-2% | >2% |
| TikTok | 0.30% | 0.5-1% | >1% |

### CPC by Platform

| Platform | Average | Good |
|----------|---------|------|
| Facebook | $0.97 | <$0.50 |
| Instagram | $1.20 | <$0.70 |
| LinkedIn | $5.26 | <$3.00 |
| TikTok | $1.00 | <$0.50 |

See `references/platform-benchmarks.md` for complete benchmark data.

---

## Tools

### Calculate Metrics

```bash
python scripts/calculate_metrics.py assets/sample_input.json
```

Calculates engagement rate, CTR, reach rate for each post and campaign totals.

### Analyze Performance

```bash
python scripts/analyze_performance.py assets/sample_input.json
```

Generates full performance analysis with ROI, benchmarks, and recommendations.

**Output includes:**
- Campaign-level metrics
- Post-by-post breakdown
- Benchmark comparisons
- Top performers ranked
- Actionable recommendations

---

## Examples

### Sample Input

See `assets/sample_input.json`:

```json
{
  "platform": "instagram",
  "total_spend": 500,
  "posts": [
    {
      "post_id": "post_001",
      "content_type": "image",
      "likes": 342,
      "comments": 28,
      "shares": 15,
      "saves": 45,
      "reach": 5200,
      "impressions": 8500,
      "clicks": 120
    }
  ]
}
```

### Sample Output

See `assets/expected_output.json`:

```json
{
  "campaign_metrics": {
    "total_engagements": 1521,
    "avg_engagement_rate": 8.36,
    "ctr": 1.55
  },
  "roi_metrics": {
    "total_spend": 500.0,
    "cost_per_engagement": 0.33,
    "roi_percentage": 660.5
  },
  "insights": {
    "overall_health": "excellent",
    "benchmark_comparison": {
      "engagement_status": "excellent",
      "engagement_benchmark": "1.22%",
      "engagement_actual": "8.36%"
    }
  }
}
```

### Interpretation

The sample campaign shows:
- **Engagement rate 8.36%** vs 1.22% benchmark = Excellent (6.8x above average)
- **CTR 1.55%** vs 0.22% benchmark = Excellent (7x above average)
- **ROI 660%** = Outstanding return on $500 spend
- **Recommendation:** Scale budget, replicate successful elements

---

## Reference Documentation

### Platform Benchmarks

`references/platform-benchmarks.md` contains:

- Engagement rate benchmarks by platform and industry
- CTR benchmarks for organic and paid content
- Cost benchmarks (CPC, CPM, CPE)
- Content type performance by platform
- Optimal posting times and frequency
- ROI calculation formulas

## Proactive Triggers

- **Engagement rate below platform average** -- Content isn't resonating. Analyze top performers for patterns to replicate.
- **Follower growth stalled** -- Content distribution or frequency issue. Audit posting patterns and content mix.
- **High impressions, low engagement** -- Reach without resonance. Content quality or relevance issue needs addressing.
- **Competitor outperforming significantly** -- Content gap detected. Analyze their successful posts for format and topic insights.

## Output Artifacts

| When you ask for... | You get... |
|---------------------|------------|
| "Social media audit" | Performance analysis across platforms with benchmarks |
| "What's performing?" | Top content analysis with patterns and recommendations |
| "Competitor social analysis" | Competitive social media comparison with gaps |
| "Campaign ROI" | Full ROI calculation with engagement value estimates |

## Communication

All output passes quality verification:
- Self-verify: source attribution, assumption audit, confidence scoring
- Output format: Bottom Line first, then What (with confidence), Why, How to Act
- Every finding tagged with confidence level: verified, medium confidence, or assumed

## Related Skills

- **campaign-analytics**: For cross-channel analytics including social alongside other channels.
- **content-creator**: For creating social media content optimized by analysis findings.
- **marketing-demand-acquisition**: For integrating social media into broader demand gen strategy.
- **marketing-strategy-pmm**: For aligning social content with product marketing positioning.

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| Engagement rate appears unrealistically high (>50%) | Reach value is too low relative to engagements, or reach/impressions data is swapped | Verify that `reach` represents unique users reached (not impressions). Engagement rate = (likes + comments + shares + saves) / reach. If using Instagram data from 2025+, note that Instagram shifted from "impressions" to "views" as primary metric -- ensure you are using the correct field |
| Benchmark comparison shows "no_benchmark_available" | Platform name in input JSON does not match expected values | Use exact lowercase platform names: `instagram`, `facebook`, `twitter`, `linkedin`, `tiktok`. The analyzer matches against these exact strings |
| ROI calculation shows negative despite good engagement | Engagement value estimates are too conservative for your industry | The default engagement value model uses $0.50/like, $2.00/comment, $5.00/share, $3.00/save, $1.50/click. Adjust these values in `calculate_metrics.py` for your specific vertical. B2B companies typically have higher per-engagement values than B2C |
| TikTok metrics show low engagement compared to benchmarks | Using reach-based calculation on a platform where view-based metrics are standard | TikTok's 2026 benchmark engagement rate of 2.50-3.70% is calculated against views, not reach. Ensure your TikTok data uses video views in the `reach` field for accurate comparison. TikTok engagement rates rose 49% YoY in 2025 |
| LinkedIn engagement appears lower than expected | Comparing against outdated benchmarks | LinkedIn's 2026 median engagement rate is approximately 3.85-6.1%, significantly higher than other platforms. Carousel/document posts earn the highest engagement (up to 21.77% median). If your rate is below 2%, focus on conversation-starting content rather than corporate announcements |
| Instagram metrics declining despite consistent content quality | Algorithm and metric definition changes in 2025-2026 | Instagram shifted to "Views" as its primary metric across all formats (Reels, Stories, posts), replacing "Impressions" and "Plays." Carousel posts now earn the most engagement. Meta plans to replace reach with "Viewers" metric in Graph API by June 2026. Adapt your data collection accordingly |
| Campaign analysis has too few posts for reliable insights | Small sample size produces unreliable averages | Minimum 10 posts recommended for meaningful analysis. The `analyze_performance.py` script flags campaigns with fewer than 10 posts. For statistical reliability, aim for 30+ posts per analysis period |

---

## Success Criteria

- **Engagement Rate by Platform (2026 benchmarks)**: Instagram 0.50-0.70% (average), 3-6% (good), >6% (excellent). Facebook 0.06-0.09% (average), 0.5-1% (good). LinkedIn 3.85-6.1% (average), >6% (good). TikTok 2.50-3.70% (average), 8-15% (good), >15% (excellent). Twitter/X 0.03-0.05% (average), 0.1-0.5% (good)
- **Click-Through Rate**: Instagram >0.5% (good), Facebook >1.5% (good), LinkedIn >1.0% (good), TikTok >0.5% (good). Featured snippets and carousels drive highest CTR across platforms
- **Cost Per Click**: Facebook <$0.50 (good), Instagram <$0.70 (good), LinkedIn <$3.00 (good, but averages $4-5+ for B2B), TikTok <$0.50 (good). LinkedIn CPC has risen 89% since 2023
- **ROI Threshold**: Target minimum 200% ROI on paid social. Campaigns above 500% are excellent and should be scaled. Campaigns below 100% need immediate creative or targeting revision
- **Content Format Performance**: Prioritize high-engagement formats per platform -- carousel/document posts on LinkedIn (21.77% median engagement), Reels on Instagram, short-form video on TikTok. Test at least 3 content formats per month
- **Posting Frequency**: Maintain consistent posting cadence: LinkedIn 3-5x/week, Instagram 4-7x/week, TikTok 3-5x/week. The LinkedIn algorithm favors content that generates meaningful engagement in the first 90 minutes
- **Analysis Cadence**: Run full performance analysis weekly for active campaigns. Compare month-over-month trends to identify growth or decline patterns. Update benchmark baselines quarterly as platform norms shift rapidly

---

## Scope & Limitations

**In Scope:**
- Post-level and campaign-level engagement metrics (engagement rate, CTR, reach rate, virality rate, save rate)
- ROI calculation with engagement value estimates and cost efficiency metrics (CPE, CPC, CPM, ROAS)
- Platform benchmark comparison for Instagram, Facebook, Twitter/X, LinkedIn, and TikTok
- Top/bottom performer identification and ranking
- Actionable recommendations based on benchmark assessment

**Out of Scope:**
- Real-time API connections to social media platforms (scripts analyze static JSON data you export)
- Social media scheduling, publishing, or content creation
- Follower growth tracking or audience demographics analysis
- Competitor social media monitoring (use dedicated social listening tools)
- Influencer identification or collaboration management
- Social commerce and shopping metrics
- Video-specific analytics (watch time, completion rate, drop-off points)
- Sentiment analysis on comments or mentions (use the app-store-optimization skill's review_analyzer for text sentiment)
- Cross-platform identity resolution or deduplication

**Platform API Changes (2025-2026):**
- Meta/Instagram is replacing "reach" with "Viewers" metric in Graph API by June 2026
- Instagram shifted to "Views" as primary metric across all formats, replacing "Impressions" and "Plays"
- TikTok tightened API access approval process in 2025
- LinkedIn added AI-powered conversational search; algorithm now favors people-first content over polished corporate updates

---

## Integration Points

| Integration | Purpose | How to Connect |
|-------------|---------|----------------|
| **Meta Business Suite** | Export Instagram and Facebook campaign data | Export post-level metrics (likes, comments, shares, reach, impressions, clicks) as JSON for `calculate_metrics.py` and `analyze_performance.py`. Note: "Views" is replacing "Impressions" in 2026 |
| **LinkedIn Campaign Manager** | Export LinkedIn ad and organic performance data | Export engagement metrics per post. LinkedIn's native analytics now includes "Viewer" demographics and AI search visibility data |
| **TikTok Business Center** | Export TikTok campaign performance data | Export video-level metrics. Use video views as the reach equivalent for engagement rate calculation |
| **Google Analytics 4 (GA4)** | Track social traffic and conversions on your website | Connect social campaign UTM parameters to GA4 to measure downstream conversions. Use `campaign-analytics` skill for full attribution |
| **campaign-analytics skill** | Cross-channel ROI comparison | Feed social media ROI data into `campaign_roi_calculator.py` alongside other channels for unified portfolio analysis |
| **content-creator skill** | Content optimization based on performance data | Use top-performing post analysis to inform content strategy. Apply `brand_voice_analyzer.py` to ensure social content matches brand voice |
| **marketing-demand-acquisition skill** | Social as demand gen channel | Integrate social performance data into demand gen channel mix evaluation. Use CAC data from social alongside other acquisition channels |

---

## Tool Reference

### calculate_metrics.py

**Type:** Python library (imported, not CLI)

**Classes:**
- `SocialMediaMetricsCalculator(campaign_data: Dict)`

**Constructor Input:** `{"platform": "instagram", "total_spend": 500, "posts": [{"post_id": "str", "content_type": "str", "likes": int, "comments": int, "shares": int, "saves": int, "reach": int, "impressions": int, "clicks": int}]}`

**Key Methods:**

| Method | Parameters | Returns |
|--------|-----------|---------|
| `calculate_engagement_rate()` | `post: Dict` (likes, comments, shares, saves, reach) | Engagement rate as percentage (float). Formula: (likes + comments + shares + saves) / reach * 100 |
| `calculate_ctr()` | `clicks: int`, `impressions: int` | CTR as percentage (float) |
| `calculate_campaign_metrics()` | None (uses constructor data) | Dict with platform, total_posts, total_engagements, total_reach, total_impressions, total_clicks, avg_engagement_rate, ctr |
| `calculate_roi_metrics()` | None (uses constructor data) | Dict with total_spend, cost_per_engagement, cost_per_click, estimated_value (at $2.50/engagement default), roi_percentage |
| `identify_top_posts()` | `metric: str = 'engagement_rate'`, `limit: int = 5` | Sorted list of top posts by specified metric. Supported metrics: `engagement_rate`, `likes`, `comments`, `shares`, `clicks` |
| `analyze_all()` | None | Combined dict of campaign_metrics, roi_metrics, and top_posts |

### analyze_performance.py

**Type:** Python library (imported, not CLI)

**Classes:**
- `PerformanceAnalyzer(campaign_metrics: Dict, roi_metrics: Dict)`

**Built-in Benchmarks:** Engagement rate and CTR benchmarks for `facebook`, `instagram`, `twitter`, `linkedin`, `tiktok`.

**Key Methods:**

| Method | Parameters | Returns |
|--------|-----------|---------|
| `benchmark_performance()` | None | Dict with engagement_status, engagement_benchmark, engagement_actual, ctr_status, ctr_benchmark, ctr_actual. Status values: `excellent` (>=1.5x benchmark), `good` (>=benchmark), `below_average` |
| `generate_recommendations()` | None | List of actionable recommendation strings based on engagement rate, CTR, CPC, ROI, and post volume thresholds |
| `generate_insights()` | None | Dict with overall_health (`excellent`/`good`/`needs_improvement`), benchmark_comparison, recommendations, key_strengths, areas_for_improvement |

---

## social-media-manager

Source path: `references/marketing/social-media-manager/SKILL.md`

# Social Media Manager

**Category:** Marketing
**Tags:** social media strategy, content calendar, community management, engagement, growth, social audit

## Overview

Social Media Manager provides the strategic layer for building a sustainable social media presence that drives measurable business results. It covers platform selection, content architecture, community engagement, growth tactics, crisis response, and performance measurement. The emphasis is on doing 1-2 platforms exceptionally well rather than spreading thin across five.

This skill handles strategy and management. For writing individual social posts, use content-creator. For analyzing social performance data, use campaign-analytics.

---

## Clarify First

Before building the strategy, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Operating mode** — build from scratch, audit & optimize, or scale & systematize — sets the workflow and deliverables
- [ ] **Business type & audience** — B2B SaaS, developer tools, or consumer/SMB — drives platform selection and content pillars
- [ ] **Platforms in scope** — which 1-2 platforms (and current presence) — focuses the strategy and cadence
- [ ] **Primary business goal** — awareness, leads, recruiting, or community — sets the metrics and pillar mix

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Operating Modes

### Mode 1: Build From Scratch
No social presence or starting a new platform. Define platform selection, content pillars, posting cadence, and 90-day growth plan.

### Mode 2: Audit & Optimize
Active presence that is underperforming. Analyze what is working, identify gaps, and rebuild the approach with data.

### Mode 3: Scale & Systematize
Growing presence that needs structure. Create content calendars, team workflows, approval processes, and measurement frameworks.

---

## Platform Selection Framework

### Decision Matrix

Choose platforms based on where your audience already is, not where you think you should be.

| Platform | Best For | Content Style | Cadence | Organic Reach |
|----------|----------|---------------|---------|---------------|
| **LinkedIn** | B2B, thought leadership, recruiting | Long-form posts, carousels, documents, video | 3-5x/week | High for personal, low for company pages |
| **X (Twitter)** | Tech, developer audiences, real-time | Short takes, threads, engagement, links | 1-3x/day | Low organic, high for threads |
| **YouTube** | Education, tutorials, long-form value | Videos (8-15 min), Shorts (<60s) | 1-2x/week | High (search-driven, evergreen) |
| **Instagram** | B2C, visual brands, lifestyle, recruiting | Reels, Stories, carousels | 4-7x/week | Medium (Reels preferred) |
| **TikTok** | Young audiences, viral, brand awareness | Short video, trends, authentic | 1-3x/day | Highest organic potential |

### Selection Rules

1. **Start with 1-2 platforms.** Do them exceptionally well before adding a third
2. **B2B SaaS default:** LinkedIn (company + founder personal) + X/Twitter
3. **Developer tools default:** X/Twitter + YouTube + GitHub community
4. **Consumer/SMB default:** Instagram/TikTok + YouTube
5. **Never** maintain a platform where you post less than 3x/week -- dormant accounts hurt brand perception

### Platform-Specific Optimization

**LinkedIn (B2B Priority)**
- Personal accounts get 5-10x the reach of company pages
- Founder/CEO posting drives more business than company page
- Carousel posts and document shares get highest engagement
- Post between 7-9 AM Tuesday-Thursday (local time)
- First comment within 30 minutes matters for algorithm
- No external links in post body (kills reach) -- put links in first comment

**X/Twitter (Tech/Developer)**
- Threads outperform single tweets for depth
- Quote tweets with genuine commentary > retweets
- Engagement in first hour determines viral potential
- Lists are underused for audience building
- Spaces (live audio) drive rapid follower growth

**YouTube (Evergreen)**
- Thumbnail quality is 50% of success
- First 30 seconds determine if viewers stay
- Shorts feed subscribers into long-form
- SEO titles and descriptions drive long-term discovery
- Consistency matters more than production quality

---

## Content Pillar Framework

### The 5-Pillar Model

Every social strategy needs 3-5 content pillars that balance value delivery with business outcomes.

| Pillar | Purpose | Target Mix | Examples |
|--------|---------|------------|---------|
| **Educational** | Teach audience something useful | 40% | How-tos, frameworks, tips, tutorials |
| **Behind the Scenes** | Build trust through transparency | 20% | Process, team stories, building in public |
| **Social Proof** | Demonstrate results and credibility | 15% | Case studies, testimonials, milestones |
| **Engagement** | Start conversations, build community | 15% | Questions, polls, hot takes, debates |
| **Promotional** | Drive business outcomes | 10% | Product features, launches, offers |

**The 10% promotional cap is intentional.** If your feed feels like an ad channel, people unfollow. Earn the right to promote by delivering value first.

### Content Repurposing Chain

One piece of content can feed 5-10 social posts:

```
Blog Post (1,500 words)
  ├── LinkedIn long-form post (key insight + personal take)
  ├── X/Twitter thread (5-7 tweets breaking down the framework)
  ├── LinkedIn carousel (visual summary of key points)
  ├── Instagram Reel / TikTok (30-second key takeaway)
  ├── YouTube Short (60-second explainer)
  ├── Quote graphics (2-3 pull quotes as images)
  └── Newsletter excerpt (with link to full post)
```

---

## Content Calendar System

### Weekly Template (B2B SaaS)

| Day | Pillar | Format | Platform Focus |
|-----|--------|--------|---------------|
| Monday | Educational | Long post or thread | LinkedIn, X |
| Tuesday | Engagement | Question or poll | LinkedIn, X |
| Wednesday | Behind the Scenes | Photo, video, or story | LinkedIn, Instagram |
| Thursday | Educational | How-to or framework | LinkedIn, X, YouTube |
| Friday | Social Proof / Promo | Case study or feature | LinkedIn |

### Batch Creation Workflow

```
Week -1 (Friday, 30 min):
  Plan next week's topics, assign to pillars

Week 0 (Monday, 2 hours):
  Batch-create all 5 posts for the week
  Schedule in tool (Buffer, Hootsuite, native scheduler)

Daily (15 min):
  Reply to comments on own posts
  Engage on 5-10 relevant posts from others
  Monitor mentions and DMs

Week +1 (Friday, 30 min):
  Review last week's analytics
  Identify top performer, understand why
  Adjust next week's plan based on data
```

### Content Idea Generation

When you run out of ideas, mine these sources:

| Source | Method | Example Output |
|--------|--------|---------------|
| Customer questions | Export support/sales FAQ | "The 5 questions every new customer asks" |
| Industry news | React to trends with your take | "Here's what [news] means for [your audience]" |
| Internal discussions | Turn Slack debates into content | "Our team disagreed on X. Here's what we learned" |
| Competitor content | Improve or counter their takes | "Everyone says X. Here's why that's wrong" |
| Analytics data | Share interesting findings | "We analyzed 10K [events]. Here's what surprised us" |
| Personal experience | Founder/team stories | "The mistake that almost killed our launch" |

---

## Community Engagement Framework

### The 1:1 Rule

For every post you publish, spend equal time engaging with others' content. Social media is bilateral -- broadcasting without engaging is advertising, not community.

### Response Framework

| Scenario | Response Time | Approach |
|----------|-------------|----------|
| Product question | Under 2 hours (business hours) | Answer directly, link to docs if complex |
| Complaint (public) | Under 1 hour | Acknowledge publicly, resolve privately, follow up publicly |
| Praise | Within 4 hours | Thank them, amplify with reshare/quote |
| Feature request | Within 24 hours | Acknowledge, route to product team, set expectations |
| Troll | Ignore | Never engage unless spreading factually dangerous misinformation |
| Industry discussion | Within 4 hours | Add genuine value, share perspective, never self-promote |
| Influencer mention | Within 1 hour | Engage authentically, explore collaboration |

### Community Building Beyond Posts

| Tactic | Platform | Effort | Impact |
|--------|----------|--------|--------|
| Host weekly X Spaces | X/Twitter | 1 hr/week | High (rapid follower growth) |
| Create a Discord/Slack community | Cross-platform | 5 hrs/week | Very High (owned audience) |
| Run a LinkedIn newsletter | LinkedIn | 2 hrs/week | High (email-like engagement) |
| Collaborate on content | Any | 2 hrs/piece | High (audience crossover) |
| Comment on industry leaders' posts | Any | 15 min/day | Medium (visibility) |

---

## Crisis Response Protocol

### Definition of Crisis

A social media crisis is any event that threatens your brand reputation and is spreading (or will spread) on social platforms. Examples: public customer complaint going viral, employee controversy, security breach, product failure affecting many users.

### The 4-Hour Rule

Communicate internally within 4 hours of a crisis becoming public. Employees should never learn about company news from social media.

### Response Sequence

**Hour 0-1: Assess and Contain**
```
1. Identify the scope: How many people are discussing this? Is it growing?
2. Stop scheduled posts (pause all scheduled content immediately)
3. Draft initial response (acknowledge, do not deflect)
4. Get approval from appropriate leader (CEO for major, CMO for minor)
```

**Hour 1-4: Respond**
```
5. Post initial response on the platform where the crisis is most visible
6. Communicate internally (all-hands email or Slack)
7. Brief customer support team on response guidelines
8. Monitor all channels for spread
```

**Hour 4-24: Manage**
```
9. Provide updates as new information becomes available
10. Respond to individual comments/questions
11. Prepare detailed response or blog post if needed
12. Document everything for post-mortem
```

**What NOT to do:**
- Delete comments (makes it worse, people screenshot)
- Go silent (vacuum fills with speculation)
- Get defensive (always empathize first)
- Blame others (take responsibility for your part)
- Use humor (read the room)

---

## Social Media Audit

### Profile Audit Checklist

- [ ] Profile photo: high-quality, consistent across platforms
- [ ] Banner image: current, on-brand, communicates value
- [ ] Bio: clear value proposition, not a job title listing, includes CTA
- [ ] Link: drives to relevant landing page (not generic homepage)
- [ ] Pinned post: best-performing or most strategically important content
- [ ] Contact info: accurate and monitored

### Content Audit

- [ ] Posting consistency: regular cadence or sporadic gaps?
- [ ] Content mix: balanced across pillars or predominantly promotional?
- [ ] Format variety: text, images, video, carousels, or all one format?
- [ ] Voice consistency: brand voice matches across all posts?
- [ ] Engagement quality: genuine comments or "great post!" spam?
- [ ] Top 5 posts: what do they have in common? (format, topic, timing)
- [ ] Bottom 5 posts: what patterns emerge? (wrong time, wrong format, too promotional)

### Engagement Audit

- [ ] Response time: within 2 hours or days later?
- [ ] Response quality: genuine replies or template responses?
- [ ] Outbound engagement: actively commenting on others' content?
- [ ] Community participation: present in relevant conversations?
- [ ] DM handling: monitored and responded to?

---

## Metrics That Matter

### Primary Metrics

| Metric | What It Measures | Target | Source |
|--------|-----------------|--------|--------|
| Engagement rate | Content resonance | >3% LinkedIn, >1% X, >2% Instagram | Platform analytics |
| Follower growth rate | Audience building momentum | >5% monthly | Week-over-week tracking |
| Click-through rate | Content driving action | >1% | UTM tracking |
| Share/save rate | Content worth keeping/spreading | Rising month-over-month | Platform analytics |
| Conversion rate | Social leading to business outcome | Depends on funnel | Attribution in GA4 |

### Metrics to Deprioritize

- **Raw follower count** without engagement context (vanity)
- **Impressions** without engagement (reach without resonance)
- **Likes** as primary metric (lowest-effort engagement)
- **Post volume** as KPI (consistency matters, not volume)

### Monthly Reporting Template

```
SOCIAL MEDIA MONTHLY REPORT: [Month Year]

Audience Growth:
  LinkedIn: [X] followers (+Y%)
  X/Twitter: [X] followers (+Y%)
  Total reach: [X] impressions

Content Performance:
  Posts published: [X]
  Average engagement rate: [X]%
  Top performing post: [link] ([X] engagements)
  Content pillar breakdown: Educational [X]%, BTS [X]%, Proof [X]%, Engagement [X]%, Promo [X]%

Business Impact:
  Website clicks from social: [X]
  Leads attributed to social: [X]
  Notable conversations/DMs: [summary]

Next Month Focus:
  - [Priority 1]
  - [Priority 2]
  - [Experiment to run]
```

---

## Growth Tactics

### Organic Growth Levers (Ranked by Impact)

1. **Consistency** -- Post on schedule. Algorithms reward reliability over bursts.
2. **Founder-led content** -- Personal accounts outperform brand accounts 5-10x on LinkedIn.
3. **Engagement bait done right** -- Genuine questions, polls, hot takes. Not "like if you agree."
4. **Collaboration** -- Co-create content with complementary accounts. Audience crossover is the fastest growth lever.
5. **Trend riding** -- Jump on relevant trends fast, but only if authentic to your brand.
6. **Repurposing** -- One blog post becomes 5-10 social posts. Never create for a single channel.
7. **Community spaces** -- Own your audience (Discord, Slack) rather than renting it from platforms.

### Content Formats by Engagement (B2B)

| Format | Avg Engagement | Best Platform | Notes |
|--------|---------------|---------------|-------|
| Carousel / Document | 3-5x text post | LinkedIn | Swipeable, high dwell time |
| Thread | 2-3x single post | X/Twitter | Shows depth, bookmarkable |
| Short video (<60s) | 2-4x text post | All | Reels/Shorts algorithm boost |
| Poll | 3-5x text post | LinkedIn, X | Low-effort engagement |
| Personal story | 2-4x brand post | LinkedIn | Authenticity drives shares |

---

## Proactive Triggers

- Posting frequency dropped below 3x/week: consistency matters more than perfection. Batch-create to maintain cadence.
- Engagement rate below platform average: audit last 20 posts for patterns. Which got engagement? Which did not?
- 100% promotional content: audience fatigue incoming. Shift to 90/10 value/promo split immediately.
- No outbound engagement: spend 15 min/day commenting on relevant posts. Social media is bilateral.
- Same format every post: algorithm fatigue. Mix formats weekly.
- Growing followers but flat engagement: content is attracting but not resonating. Audit content pillars.

---

## Related Skills

| Skill | Use When |
|-------|----------|
| **content-creator** | Writing individual social posts and brand voice |
| **campaign-analytics** | Analyzing social media performance data in depth |
| **launch-strategy** | Coordinating social media around product launches |
| **email-sequence** | Converting social followers to email subscribers |
| **analytics-tracking** | Setting up social media UTM tracking and attribution |

---

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Engagement rate below platform average | Content not resonating or weak hooks | Audit last 20 posts for patterns. Run `social_audit_scorer.py`. |
| Posting dropped below 3x/week | No batching system or content calendar | Use `content_calendar_generator.py` and batch-create weekly. |
| 100% promotional content | No pillar system | Shift to 90/10 value/promo split. Cap promotional at 10%. |
| No outbound engagement | Broadcasting without participating | Spend 15 min/day commenting on relevant posts. Social is bilateral. |
| Same format every post | Algorithm fatigue | Mix text, carousel, video, poll formats weekly. |
| Growing followers but flat engagement | Attracting but not resonating | Audit content pillars. Narrow topics to build deeper engagement. |
| Crisis going viral on social | No crisis protocol in place | Use the 4-hour rule: assess, pause scheduled posts, draft response, get approval. |

---

## Success Criteria

- Engagement rate: >3% LinkedIn, >1% Twitter/X, >2% Instagram
- Follower growth rate: >5% monthly
- Posting consistency: minimum 3x/week with no gaps longer than 3 days
- Content pillar balance: educational 30-40%, promotional under 15%
- Response time: under 2 hours for all comments and mentions
- Outbound engagement: 15+ comments on others' content per week
- Monthly reporting delivered with actionable insights (not just metrics)

---

## Scope & Limitations

**In Scope:** Social media strategy, platform selection, content pillar design, editorial calendars, community engagement, crisis response, social audits, growth tactics, performance measurement.

**Out of Scope:** Writing individual posts (use social-content), paid social campaigns (use paid-ads), influencer management, social media tool administration.

---

## Python Automation Tools

### 1. Social Audit Scorer (`scripts/social_audit_scorer.py`)
Scores social media profiles on profile completeness, content quality, and engagement health.

```bash
python scripts/social_audit_scorer.py audit_data.json
python scripts/social_audit_scorer.py --sample --json
```

### 2. Content Calendar Generator (`scripts/content_calendar_generator.py`)
Generates structured content calendars with pillar assignments, format recommendations, and batch creation plans.

```bash
python scripts/content_calendar_generator.py --platform linkedin --weeks 4
python scripts/content_calendar_generator.py --platform instagram --weeks 4 --json
```

### 3. Growth Tracker (`scripts/growth_tracker.py`)
Tracks follower growth, engagement trends, and content performance over time with projections.

```bash
python scripts/growth_tracker.py weekly_data.json
python scripts/growth_tracker.py --sample --json
```

---

## video-content-strategist

Source path: `references/marketing/video-content-strategist/SKILL.md`

# Video Content Strategist Skill

## Overview

Production-ready video content strategy toolkit for planning content calendars, analyzing thumbnail effectiveness, and optimizing video metadata for platform SEO. Designed for content creators, marketing teams, and video producers managing consistent video output across YouTube, TikTok, LinkedIn, and other platforms.

## Clarify First

Before planning, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Platform(s)** — YouTube, TikTok, LinkedIn, or Instagram — sets optimal video length and SEO approach
- [ ] **Deliverable** — content calendar, thumbnail analysis, or SEO metadata optimization — selects the tool and workflow
- [ ] **Audience & content pillars** — who it's for and the pillar mix/ratios — drives calendar topics and formats
- [ ] **Posting frequency** — videos per week and planning horizon — sets the production schedule

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
# Plan a video content calendar from topics and audience data
python scripts/video_content_planner.py topics.json --weeks 8 --frequency 3

# Analyze thumbnail text and composition patterns
python scripts/thumbnail_analyzer.py thumbnails.csv

# Optimize video titles, descriptions, and tags for SEO
python scripts/video_seo_optimizer.py video_data.json --platform youtube
```

## Tools Overview

| Tool | Purpose | Input | Output |
|------|---------|-------|--------|
| `video_content_planner.py` | Content calendar generation | JSON with topics/audience | Weekly calendar + production schedule |
| `thumbnail_analyzer.py` | Thumbnail pattern analysis | CSV with thumbnail data | Optimization recommendations |
| `video_seo_optimizer.py` | Video metadata SEO | JSON with video details | Optimized titles, descriptions, tags |

## Workflows

### Workflow 1: Monthly Video Strategy

1. Define audience personas and content pillars in topics JSON
2. Run `video_content_planner.py` to generate 4-week calendar
3. For each planned video, run `video_seo_optimizer.py` for metadata
4. After publishing, collect thumbnail data and run `thumbnail_analyzer.py`
5. Feed learnings back into next month's planning cycle

### Workflow 2: YouTube Channel Optimization

1. Export existing video data (titles, descriptions, tags, performance)
2. Run `video_seo_optimizer.py` on underperforming videos to identify metadata gaps
3. Run `thumbnail_analyzer.py` on top vs bottom performers
4. Apply optimizations to existing videos and use patterns for new content

### Workflow 3: Multi-Platform Video Strategy

1. Create topics JSON with platform-specific audience data
2. Run `video_content_planner.py` with `--platforms youtube,tiktok,linkedin`
3. Get platform-adapted content recommendations
4. Optimize each platform's metadata with `video_seo_optimizer.py`

## Reference Documentation

See `references/video-strategy-guide.md` for comprehensive frameworks covering:
- Content pillar strategy
- Platform-specific best practices
- Thumbnail design principles
- Video SEO fundamentals
- Production workflow optimization

## Common Patterns

### Pattern: Topics JSON Format
```json
{
  "channel": "TechStartupTV",
  "audience": {
    "primary": "SaaS founders, 25-45",
    "interests": ["startup growth", "fundraising", "product development"],
    "pain_points": ["scaling teams", "finding product-market fit", "managing burn rate"]
  },
  "content_pillars": [
    {"name": "Founder Stories", "ratio": 0.3, "format": "interview", "avg_length_min": 25},
    {"name": "Tactical Guides", "ratio": 0.4, "format": "tutorial", "avg_length_min": 12},
    {"name": "Industry Analysis", "ratio": 0.2, "format": "commentary", "avg_length_min": 8},
    {"name": "Behind the Scenes", "ratio": 0.1, "format": "vlog", "avg_length_min": 5}
  ],
  "topics": [
    {"title": "How We Hit $1M ARR", "pillar": "Founder Stories", "priority": "high"},
    {"title": "5 Pricing Strategies That Work", "pillar": "Tactical Guides", "priority": "high"},
    {"title": "AI in SaaS: 2026 Trends", "pillar": "Industry Analysis", "priority": "medium"}
  ]
}
```

### Pattern: Thumbnail CSV Format
```csv
video_id,title,views,ctr_pct,has_face,has_text,text_words,colors_dominant,emotion
V001,How to Scale,15000,8.2,yes,yes,3,red-yellow,surprise
V002,Tech Review,8500,4.1,no,yes,5,blue-white,neutral
```

### Platform Video Length Guidelines

| Platform | Optimal Length | Max Recommended |
|----------|---------------|-----------------|
| YouTube (standard) | 8-15 min | 25 min |
| YouTube Shorts | 30-60 sec | 60 sec |
| TikTok | 30-90 sec | 3 min |
| LinkedIn | 1-3 min | 10 min |
| Instagram Reels | 15-60 sec | 90 sec |

---

## x-twitter-growth

Source path: `references/marketing/x-twitter-growth/SKILL.md`

# X/Twitter Growth Skill

## Overview

Production-ready X/Twitter growth toolkit for analyzing tweet performance patterns, structuring optimal threads, and tracking engagement metrics. Designed for creators, marketers, and brand accounts looking to grow audience and engagement systematically through data-driven content decisions.

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Deliverable** — content performance audit, thread building, or growth review — selects which tool runs
- [ ] **Data or source content** — exported tweet/analytics CSV (for audits) or the long-form draft (for threads) — required input for the chosen tool
- [ ] **Niche & audience** — the one topic and who you're growing — shapes the hook and content pillars
- [ ] **Growth goal** — followers, engagement, or replies — sets which benchmark and CTA to optimize for

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
# Analyze tweet performance patterns from exported data
python scripts/tweet_analyzer.py tweets.csv

# Structure long-form content into optimal Twitter threads
python scripts/thread_builder.py content.txt --target-tweets 8

# Track follower growth, engagement rates, and best posting times
python scripts/growth_tracker.py analytics.csv --period monthly
```

## Tools Overview

| Tool | Purpose | Input | Output |
|------|---------|-------|--------|
| `tweet_analyzer.py` | Performance pattern analysis | CSV with tweet data | Engagement patterns + insights |
| `thread_builder.py` | Thread structuring | Text file or JSON | Formatted thread + hooks |
| `growth_tracker.py` | Growth & engagement tracking | CSV with analytics data | Growth report + best times |

## Workflows

### Workflow 1: Content Performance Audit

1. Export tweet data from X Analytics or third-party tool as CSV
2. Run `tweet_analyzer.py` to identify top-performing patterns
3. Identify which content types, formats, and topics drive engagement
4. Use insights to refine content strategy and posting schedule
5. Re-audit monthly to track improvement

### Workflow 2: Thread Creation Pipeline

1. Draft long-form content in text or markdown format
2. Run `thread_builder.py` to split into optimal thread structure
3. Review hook tweet (tweet 1) for maximum engagement potential
4. Add call-to-action and engagement hooks per recommendations
5. Schedule using identified best posting times from `growth_tracker.py`

### Workflow 3: Monthly Growth Review

1. Export analytics data for the period
2. Run `growth_tracker.py --period monthly` for growth metrics
3. Run `tweet_analyzer.py` on the same period for content insights
4. Compare engagement rates to prior period
5. Identify top 5 tweets and extract replicable patterns

## Reference Documentation

See `references/x-growth-playbook.md` for comprehensive strategies covering:
- Content format frameworks
- Engagement optimization tactics
- Thread writing best practices
- Algorithm understanding
- Growth compounding strategies

## Common Patterns

### Pattern: Tweet Data CSV Format
```csv
tweet_id,text,created_at,impressions,engagements,likes,retweets,replies,type,has_media
T001,"Here's what I learned...",2025-06-15 09:30:00,15000,850,320,95,45,thread_start,no
T002,"Check out this chart",2025-06-14 14:00:00,8500,420,180,35,22,single,yes
```

### Pattern: Thread Content Input
```text
# How I Grew to 50K Followers in 6 Months

The biggest lesson was consistency over virality. Here's the complete breakdown...

[Section 1: Finding Your Niche]
Most creators make the mistake of being too broad. Pick one topic and go deep...

[Section 2: Content Pillars]
I built 3 content pillars that I rotate through each week...
```

### Engagement Rate Benchmarks

| Metric | Low | Average | Good | Excellent |
|--------|-----|---------|------|-----------|
| Engagement Rate | < 1% | 1-3% | 3-6% | > 6% |
| Reply Rate | < 0.1% | 0.1-0.5% | 0.5-1% | > 1% |
| Retweet Rate | < 0.2% | 0.2-1% | 1-3% | > 3% |
| Thread Completion | < 20% | 20-40% | 40-60% | > 60% |
