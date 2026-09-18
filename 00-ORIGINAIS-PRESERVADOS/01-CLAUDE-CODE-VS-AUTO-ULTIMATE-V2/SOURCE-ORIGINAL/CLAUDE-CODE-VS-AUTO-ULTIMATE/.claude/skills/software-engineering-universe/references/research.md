# Domain: research
Source Skills in this domain: 4

---

## dossier

Source path: `references/research/dossier/SKILL.md`

# Intelligence Dossier

A research skill for producing structured intelligence dossiers — the
kind of document a CEO reads before a meeting, a PM reads before
market-entry, or an investor reads before due diligence.

## When to use this skill

- **Deal-prep dossier** before a major partnership / acquisition meeting
- **Executive briefing** ahead of a board, customer, or regulator meeting
- **Market-entry analysis** for a new geography or vertical
- **Due-diligence overview** for investment or M&A consideration
- **Competitor profile** in depth
- **Person dossier** ahead of executive recruiting or board engagement

## Inputs the advisor expects

- Subject (company / person / market / domain)
- Purpose (deal-prep, due diligence, briefing — affects depth + emphasis)
- Audience (exec, board, working team)
- Timeline / deadline
- Known starting sources
- Sensitive areas to dig into

## Clarify First

Before building the dossier, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Subject + subject type (company / person / market)** — selects the outline template and which sections apply
- [ ] **Purpose (deal-prep, due diligence, briefing, market-entry)** — drives depth, emphasis, and the Implications section
- [ ] **Audience (exec, board, working team)** — sets altitude and length of the executive summary
- [ ] **Key decision or risk to inform** — drives the Risks + Open Questions and Recommendations sections

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Generate dossier outline

1. Specify subject type + purpose.
2. Run `dossier_outline_generator.py` to produce a structured outline
   tailored to subject + purpose.
3. Assign owners + research targets per section.

```bash
python3 dossier/scripts/dossier_outline_generator.py \
  --subject-type company --purpose deal-prep --format markdown
```

### Workflow 2 — Validate source triangulation

1. Capture claims with supporting sources.
2. Run `source_triangulation_validator.py` to check each claim has
   multiple independent supporting sources + source reliability.
3. Flag thinly-sourced claims for additional research.

```bash
python3 dossier/scripts/source_triangulation_validator.py \
  --input claims_with_sources.json --format markdown
```

### Workflow 3 — Separate facts from inferences

1. Capture dossier statements.
2. Run `fact_inference_separator.py` to classify each statement and
   flag unsupported inferences.

```bash
python3 dossier/scripts/fact_inference_separator.py \
  --input dossier_statements.json --format markdown
```

## Decision frameworks

### The dossier hierarchy

A useful structure for any dossier:

1. **Executive summary** (1 page, lead with takeaway)
2. **Subject overview** (facts: what they are)
3. **Context** (market, history, environment)
4. **Capabilities + assets** (what they can do)
5. **People + leadership** (who runs it)
6. **Performance + trajectory** (numbers, trends)
7. **Relationships + ecosystem** (who they're with)
8. **Risks + open questions** (what we don't know)
9. **Implications + recommendations** (so what)
10. **Sources + methodology** (how we know)

## Fact vs inference discipline

Three categories per statement:

| Category | Definition | Example |
|----------|------------|---------|
| **Fact** | Verifiable, sourced | "Founded 2018; HQ in Chicago" |
| **Inference** | Reasoned from facts | "Likely targeting enterprise segment based on hiring pattern" |
| **Speculation** | No supporting evidence | "Might pivot to AI next year" |

A trustworthy dossier separates these clearly. Mixing them = loss of credibility.

### Source reliability scoring (Admiralty Code adapted)

| Reliability | Code | Description |
|-------------|------|-------------|
| Completely reliable | A | Established, history of completely reliable info |
| Usually reliable | B | History of mostly reliable info |
| Fairly reliable | C | History of reliable info with notable errors |
| Not usually reliable | D | Limited history; mixed accuracy |
| Unreliable | E | Known for inaccurate info |
| Cannot be judged | F | New / unknown source |

| Information credibility | Code | Description |
|--------------------------|------|-------------|
| Confirmed | 1 | Confirmed by other independent sources |
| Probably true | 2 | Not confirmed; consistent with other info |
| Possibly true | 3 | Not confirmed; reasonable but unsupported |
| Doubtful | 4 | Inconsistent with other info |
| Improbable | 5 | Contradicted by other info |
| Cannot be judged | 6 | New info; no validation possible |

A "B-2" rated claim is "usually reliable source, probably true" — workable. An "F-6" claim is "unknown source, unverified" — barely worth including.

### Triangulation principle

For each significant claim:
- **1 source:** anecdotal; flag explicitly
- **2 independent sources:** workable (most dossier claims should reach this)
- **3+ independent sources:** confirmed; safe to assert

"Independent" means not derived from the same underlying source. Two news
articles citing the same press release ≠ 2 independent sources.

## Common engagements

### "Build a dossier on company X before our acquisition meeting"
1. Run outline generator (subject=company, purpose=deal-prep).
2. Pull: financials, leadership, products, customers, IP, tech stack,
   regulatory posture.
3. Identify red flags: undisclosed litigation, key person dependencies,
   customer concentration, regulatory risk.
4. Recommendations: questions to ask in meeting; deal structure implications.

### "Executive briefing for senator's office meeting"
1. Run outline (subject=person/organization, purpose=briefing).
2. Pull: voting record, recent statements, committee assignments,
   donor profile, alignment with our position.
3. Anticipate likely questions; prepare positions.

### "Market-entry analysis for [country]"
1. Run outline (subject=market, purpose=market-entry).
2. Pull: market size, growth, competitive landscape, regulatory,
   distribution, cultural / business norms, talent.
3. Compare entry options (direct, partner, acquisition).

## Anti-patterns to avoid

- **Mixing facts + inferences without labels.** Reader can't calibrate trust.
- **Single-source claims presented as confirmed.** Anecdote dressed as data.
- **Unsourced "everyone knows" claims.** Often turn out wrong.
- **Padding with low-relevance facts.** Bloated dossier loses signal.
- **Burying risks at the end.** Risks should be surfaced upfront.
- **No update mechanism.** Stale dossier on important subject = bad decisions.
- **Adversarial language about subject.** Bias erodes credibility.

## References

- `references/dossier-frameworks-and-structure.md` — outline patterns per subject type
- `references/source-triangulation-and-reliability.md` — source assessment, triangulation
- `references/fact-vs-inference-discipline.md` — categorization + writing patterns

## Related skills

- `research/litreview` — academic literature search
- `c-level-advisor/ceo-advisor` — strategic briefing patterns
- `c-level-advisor/general-counsel-advisor` — legal due diligence overlap
- `marketing/competitive-teardown` — competitive intel angle
- `business-growth/customer-success-manager` — account research patterns

---

## grants

Source path: `references/research/grants/SKILL.md`

# Grant Writing & Proposal Architecture

A skill for crafting competitive grant proposals across funder types:
government (NIH, NSF, DOE, ARPA), foundation, corporate, philanthropic,
and SBIR / STTR. Focuses on the **architecture** of a winning proposal:
fit, structure, narrative, budget — not boilerplate templating.

## When to use this skill

- Evaluating **funder fit** before investing weeks in a proposal
- **Designing the proposal structure** for a specific funder
- Writing or auditing the **narrative** for competitiveness
- Designing a **realistic, defensible budget**
- Pre-submission **proposal review** for common failure modes
- Building a **grants strategy** (which to apply to over the year)

## Inputs the advisor expects

- The funder name + specific program / RFP
- The research / project idea (problem, approach, outcomes)
- Team composition (PI, co-investigators, key personnel)
- Institutional / org context
- Past funding history
- Budget envelope (or constraint)
- Submission deadline

## Clarify First

Before generating the proposal, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Funder + specific program / RFP** — sets the mental model (NIH 5-criteria vs NSF merit+impact vs foundation mission fit); drives structure and narrative
- [ ] **Project idea (problem, approach, outcomes)** — drives the significance/innovation narrative and the Heilmeier answers
- [ ] **Budget envelope** — drives budget design and whether scope matches the funder's typical award size
- [ ] **Team composition (PI, key personnel)** — drives the investigator/environment fit dimension

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Score funder fit before committing

1. Capture funder, program, project idea, team strengths.
2. Run `funder_fit_scorer.py` to grade fit on 7 dimensions.
3. If fit < 65, look for better-aligned funder; don't waste 4 weeks.

```bash
python3 grants/scripts/funder_fit_scorer.py \
  --input funder_fit.json --format markdown
```

### Workflow 2 — Validate proposal structure against funder expectations

1. Capture the proposal section list + page allocation.
2. Run `proposal_structure_validator.py` against funder type expectations.
3. Adjust before drafting deep.

```bash
python3 grants/scripts/proposal_structure_validator.py \
  --input proposal_structure.json --funder-type nih --format markdown
```

### Workflow 3 — Audit budget for realism

1. Capture budget line items with justifications.
2. Run `budget_realism_checker.py` against funder norms + project scope.
3. Adjust before submission.

```bash
python3 grants/scripts/budget_realism_checker.py \
  --input budget.json --format markdown
```

## Decision frameworks

### Funder fit dimensions
1. **Topic alignment** — does the funder fund this area?
2. **Mechanism alignment** — does the funder fund this *kind* of work (R&D, services, scale-up)?
3. **Stage alignment** — early-stage / mid / scale?
4. **Geographic alignment** — does the funder fund your region?
5. **Team profile alignment** — does the funder fund your kind of team?
6. **Budget envelope alignment** — does the funder's typical award size match?
7. **Competitive density** — is it 5% acceptance or 35%?

A score below 65 across these is usually a "skip this funder" signal.

### Funder type — distinct mental models

| Funder type | Emphasizes | De-emphasizes |
|-------------|-----------|---------------|
| NIH | Significance + innovation + approach + investigator + environment (5 criteria) | Commercial outcome |
| NSF | Intellectual merit + broader impacts | Direct commercial outcome |
| ARPA / DARPA | Heilmeier catechism (defined moonshot question) | Incremental work |
| SBIR / STTR | Commercial path + technical risk | Pure science |
| Foundation | Mission fit + measurable outcomes | Pure academic novelty |
| Corporate | Commercial relevance to sponsor | Independence from sponsor |
| Crowdfunding | Story + community appeal | Technical rigor |

Write to the funder's mental model, not a generic "good grant."

### The Heilmeier catechism (good for any proposal)
1. What are you trying to do?
2. How is it done today; what are the limits?
3. What's new in your approach; why succeed?
4. Who cares; if you succeed, what difference does it make?
5. What are the risks; how will you mitigate?
6. How much will it cost; how long?
7. What are the mid-term + final outcomes you'll deliver?

A proposal that can't answer all seven crisply isn't ready.

## Common engagements

### "Help me decide between two RFPs"
1. Score both for fit; the higher one is usually right.
2. If close: which has earlier deadline / smaller proposal effort?
3. Don't submit to both same year unless funders are independent.

### "Audit my draft proposal"
1. Check funder-fit assumptions (did the program actually fund what you're proposing?)
2. Check structure against funder template
3. Check narrative: is the problem compelling? approach novel?
4. Check budget: realistic + justified
5. Check team credentials: matches scope?
6. Read for: jargon, vague claims, unjustified assumptions

### "We've never applied for an NIH R01. What's the prep?"
1. Smaller grant first (R21, K, F32) if eligible — build track record
2. Talk to a program officer before drafting (essential)
3. Pre-submission inquiry where allowed
4. Get a mock review from someone who's reviewed for NIH

## Anti-patterns to avoid

- **Applying without funder fit.** Wastes 4-8 weeks.
- **Generic proposal sent to multiple funders.** Each wants a specific mental model.
- **Budget that doesn't match scope.** Reviewer red flag.
- **Vague significance statement.** "This is important" without specifics.
- **No risk discussion.** Reviewers know there's risk; not acknowledging it = naive.
- **Team without right credentials.** Match key personnel to scope.
- **Submitting at last minute.** Errors; missed letters of support.

## References

- `references/funder-fit-and-research-strategy.md` — fit dimensions, funder types, multi-funder strategy
- `references/proposal-structure-and-narrative.md` — per-funder structures, narrative discipline
- `references/budget-design-and-justification.md` — budget categories, indirect costs, common errors

## Related skills

- `research/litreview` — literature review for proposals
- `c-level-advisor/general-counsel-advisor` — legal review of terms
- `c-level-advisor/cfo-advisor` — financial review

---

## litreview

Source path: `references/research/litreview/SKILL.md`

# Literature Review

A structured literature-review skill grounded in PRISMA-style protocols
(adapted for non-medical fields), source-assessment frameworks, and
thematic synthesis patterns.

## When to use this skill

- Conducting a **systematic literature review** on a specific question
- Building a **research bibliography** for a paper, report, or grant
- Performing a **scoping review** to map a field
- Auditing an existing review for **gaps, bias, or methodological flaws**
- Synthesizing findings from a **structured set of sources**
- Preparing a **research-grounded section** of a longer report

## Inputs the advisor expects

- Research question(s) — specific, answerable
- Inclusion / exclusion criteria
- Time bound (e.g., past 5 years)
- Geographic / domain bound
- Source types accepted (peer-reviewed, gray literature, conference)
- Existing seed sources (if any)

## Clarify First

Before building the review, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Research question (PICO frame)** — makes search and synthesis tractable; vague questions yield unfocused reviews
- [ ] **Review type (systematic, scoping, or narrative)** — sets rigor, criteria stringency, and output structure (e.g. whether a PRISMA flow is needed)
- [ ] **Inclusion / exclusion criteria (year range, source type, methodology)** — drives screening and reproducibility
- [ ] **Synthesis goal (answer a specific question vs map a field)** — selects the synthesis approach

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Plan and execute the search

1. Refine the research question (PICO / PEO format works).
2. Run `search_strategy_builder.py` against the question + criteria to
   produce a search strategy (database list, queries, filters).
3. Execute searches; capture results.

```bash
python3 litreview/scripts/search_strategy_builder.py \
  --input question.json --format markdown
```

### Workflow 2 — Score source quality and relevance

1. Capture each source with metadata (authors, date, venue, methodology).
2. Run `source_quality_scorer.py` to grade each on 6 quality dimensions
   + relevance to question.
3. Triage: include / exclude / read-in-full.

```bash
python3 litreview/scripts/source_quality_scorer.py \
  --input sources.json --format markdown
```

### Workflow 3 — Synthesize findings into themes

1. Tag each source with themes + key findings.
2. Run `thematic_synthesis_builder.py` to cluster sources by theme,
   surface evidence strength, identify gaps.

```bash
python3 litreview/scripts/thematic_synthesis_builder.py \
  --input tagged_sources.json --format markdown
```

## Decision frameworks

### Search strategy — the PICO frame
- **P**opulation / problem
- **I**ntervention / phenomenon of interest
- **C**omparator (if relevant)
- **O**utcome

A well-framed question makes search and synthesis tractable.

### Inclusion / exclusion criteria
- Year range
- Language
- Source type (peer-reviewed, gray, conference, preprint)
- Methodology (empirical, theoretical, review)
- Geographic scope
- Quality threshold

Publish criteria up front; apply consistently.

### Source quality dimensions

| Dimension | Question |
|-----------|----------|
| Methodology | Is the method sound? |
| Sample / dataset | Is it adequate for the claim? |
| Peer review | Has it been peer-reviewed? |
| Reproducibility | Is data / code available? |
| Recency | Is it current? |
| Citation impact | Has it been cited / accepted? |

A single sub-dimension is rarely fatal; the combination matters.

### Synthesis approaches

| Approach | When |
|----------|------|
| Narrative synthesis | Heterogeneous sources; explanatory |
| Thematic synthesis | Multiple sources address common themes |
| Meta-analysis | Quantitative, comparable studies |
| Realist synthesis | Complex interventions; context-mechanism-outcome |
| Scoping review | Mapping a field rather than answering specific question |

For most non-clinical fields, **thematic synthesis** is the default.

## Common engagements

### "Help me build the literature review for my paper"
1. Frame the research question (PICO).
2. Define inclusion criteria.
3. Identify search databases / repositories.
4. Execute searches; deduplicate.
5. Screen titles + abstracts; full-text the candidates.
6. Tag and synthesize.
7. Write: gaps, themes, my contribution.

### "Audit my draft literature review"
1. Check the search strategy: reproducible? comprehensive?
2. Check inclusion criteria: applied consistently?
3. Check synthesis: themes substantiated?
4. Check gap identification: real gaps, or convenient?
5. Check citation balance: not over-relying on a single source / group.

### "Map the landscape of [research area]"
1. Conduct a scoping review (different from systematic).
2. Less stringent quality criteria; broader scope.
3. Goal: map the field, not answer specific question.
4. Output: themes, gaps, key authors, key venues.

## Anti-patterns to avoid

- **Search strategy that's "Google Scholar for keywords."** Not reproducible.
- **Inclusion criteria written after seeing results.** Cherry-picking.
- **Synthesizing only confirming sources.** Bias.
- **Citing without reading.** Cite chains repeat errors.
- **No quality scoring.** All sources weighted equally.
- **No gap discussion.** Reader can't see what's not known.
- **Over-reliance on one author / group / venue.** Hidden bias.
- **No PRISMA-style flow diagram (for systematic reviews).** Process opaque.

## References

- `references/search-strategy-and-prisma.md` — search patterns, PRISMA discipline
- `references/source-quality-assessment.md` — quality dimensions, common assessments
- `references/synthesis-and-citation-management.md` — synthesis approaches, citation hygiene

## Related skills

- `research/grants` — grant proposals built on literature
- `research/patent` — IP-focused literature search
- `research/dossier` — intelligence research patterns
- `product-team/research-summarizer` — synthesizing qualitative research

---

## patent

Source path: `references/research/patent/SKILL.md`

# Patent Research

A research-focused patent skill (not legal filing). Covers prior-art
search, IP landscape mapping, claim analysis, freedom-to-operate, and
patentability. For formal patent prosecution, work with a licensed
patent attorney.

## When to use this skill

- Conducting a **prior-art search** before filing a provisional patent
- Mapping the **IP landscape** in a technology area
- Evaluating the **patentability** of an invention
- Assessing **freedom-to-operate** before launching a product
- Tracking **competitive patent activity** in a market
- Preparing a **patent strategy** for a startup or R&D group

## Inputs the advisor expects

- Invention description (problem, solution, novelty)
- Technology area + relevant CPC/IPC classifications
- Target jurisdictions (US, EU, JP, CN — IP is jurisdictional)
- Existing prior art known (key references)
- Competitor list
- Timeline pressure (filing deadline, product launch)

## Clarify First

Before running the analysis, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Analysis type (prior-art search, patentability, FTO, or landscape)** — these are different deliverables with different methods and outputs
- [ ] **Invention description (problem, solution, novelty)** — drives the claims and search classifications
- [ ] **Target jurisdictions (US, EU, JP, CN)** — IP is jurisdictional; changes FTO scope and filing strategy
- [ ] **Technology area + CPC/IPC classifications** — drives a search beyond keywords (which misses synonyms/translations)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Plan a prior-art search

1. Define invention claims (key novel features).
2. Identify search classifications (CPC / IPC) + keywords.
3. Run `prior_art_search_planner.py` to produce a search plan.
4. Execute on USPTO / EPO / Espacenet / Google Patents / WIPO.

```bash
python3 patent/scripts/prior_art_search_planner.py \
  --input invention.json --format markdown
```

### Workflow 2 — Map the IP landscape

1. Capture identified patents (yours, competitors', adjacent).
2. Run `claim_landscape_mapper.py` to cluster by claim type, owner,
   technology subarea, recency; surface white space + crowded areas.

```bash
python3 patent/scripts/claim_landscape_mapper.py \
  --input patents.json --format markdown
```

### Workflow 3 — Score patentability of an invention

1. Capture invention + closest prior art.
2. Run `patentability_scorer.py` to rate novelty, non-obviousness,
   utility, subject matter eligibility.

```bash
python3 patent/scripts/patentability_scorer.py \
  --input patentability.json --format markdown
```

## Decision frameworks

### The three patentability criteria (US baseline)
1. **Novelty** (35 USC §102): not previously disclosed
2. **Non-obviousness** (35 USC §103): not obvious to person skilled in the art
3. **Utility** (35 USC §101): useful, with practical application

Plus:
- **Subject matter eligibility** (§101): not abstract idea, not law of nature
- **Enablement** (§112): described well enough to be made by skilled artisan
- **Definiteness** (§112): claims clearly distinguish

### Prior-art categories
- **Patents** (issued + published applications)
- **Non-patent literature** (papers, conference, dissertations, technical reports)
- **Commercial products** (sold publicly before filing)
- **Public disclosures** (talks, demos, blog posts — yes, including your own > 1 year prior)
- **Sales activity** (offers for sale, even pre-launch)

Inventors often miss non-patent prior art; this is where searches break.

### Freedom-to-operate (FTO)
Different from patentability. FTO asks: can I commercialize without
infringing someone else's patent?

- Patentability ≠ FTO (your patent could still infringe another)
- FTO is jurisdiction-specific
- Active patents only (not expired); typically 20 years from filing
- Patent attorney involvement essential for formal opinion

### IP strategy by stage
- **Pre-seed:** capture inventions; consider provisional filings; don't over-file
- **Seed/Series A:** strategic provisionals; key utility filings
- **Series B+:** PCT international; continuations to maintain pendency
- **Mature:** portfolio management; licensing; enforcement

## Common engagements

### "We have a new algorithm. Should we patent?"
1. Subject matter eligibility check (§101 — algorithms are tricky)
2. Prior art search (someone has probably published)
3. Strategic value (does patent enable / defend a business position?)
4. Cost-benefit ($5-25K provisional; $30-100K full prosecution)
5. Often answer: keep as trade secret, not patent

### "Run an FTO before our launch"
1. Identify candidate blocking patents (search + competitor review)
2. For each: review claims; assess infringement risk
3. Identify mitigations: design-around, license, abandon, challenge
4. Get formal opinion from patent counsel (insurance against willful infringement)

### "Map the patent landscape in our space"
1. Identify key players (companies + universities)
2. Search by classification + keyword
3. Cluster: by company, by sub-technology, by year
4. Surface white space (uncovered areas) + crowded zones
5. Strategy implications (where to play, where to design-around)

## Anti-patterns to avoid

- **Searching only keywords (no classification).** Misses translations + synonyms.
- **Searching only USPTO.** EPO + WIPO + JP have unique art.
- **Searching only patents.** Non-patent prior art is huge.
- **Public disclosure before filing.** Loses patentability outside US (1-year grace in US only).
- **Filing without prior-art search.** Reviewer finds it; patent invalid.
- **No FTO before product launch.** Surprise injunctions.
- **Patenting everything.** $30K per patent adds up; portfolio bloat distracts.
- **Filing without commercial strategy.** Patents are means, not ends.

## References

- `references/prior-art-search-strategy.md` — search databases, classifications, query patterns
- `references/claim-mapping-and-landscape.md` — claim analysis, landscape visualization
- `references/freedom-to-operate-and-patentability.md` — FTO process, patentability criteria

## Related skills

- `legal/contract-review` — IP licensing contracts
- `c-level-advisor/general-counsel-advisor` — strategic IP counsel
- `research/litreview` — non-patent literature search overlap
