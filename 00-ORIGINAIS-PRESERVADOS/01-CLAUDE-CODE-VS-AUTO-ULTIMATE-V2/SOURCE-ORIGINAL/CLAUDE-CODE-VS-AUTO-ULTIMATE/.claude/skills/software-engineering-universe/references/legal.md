# Domain: legal
Source Skills in this domain: 17

---

## contract-review

Source path: `references/legal/contract-review/SKILL.md`

> **⚠️ EXPERIMENTAL** — This skill is provided for educational and informational purposes only. It does NOT constitute legal advice. All responsibility for usage rests with the user. Consult qualified legal professionals before acting on any output.

# Contract Review

Automated contract review tools that analyze agreements against organizational playbooks, classify clause risk with GREEN/YELLOW/RED severity, and generate prioritized redline suggestions with fallback positions.

---

## Table of Contents

- [Tools](#tools)
  - [Contract Analyzer](#contract-analyzer)
  - [Redline Generator](#redline-generator)
- [Reference Guides](#reference-guides)
- [Workflows](#workflows)
  - [Standard Contract Review](#standard-contract-review)
  - [Rapid Risk Triage](#rapid-risk-triage)
- [Troubleshooting](#troubleshooting)
- [Success Criteria](#success-criteria)
- [Scope & Limitations](#scope--limitations)
- [Anti-Patterns](#anti-patterns)
- [Tool Reference](#tool-reference)

---

## Clarify First

Before reviewing the contract, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which side you represent** — customer/buyer vs vendor/provider flips which clauses are favorable and reverses the direction of every redline
- [ ] **Contract type** — SaaS, services, vendor/supply, or license — sets the standard-clause baseline and which missing clauses get flagged
- [ ] **Risk tolerance / playbook positions** — what your org treats as a deal-breaker — defines the RED vs YELLOW cutoff and the Must-Have vs Nice-to-Have tiering
- [ ] **Deal leverage / value** — calibrates which redlines are walkaway (Tier 1) vs tradeable concessions (Tier 3)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the review.

## Tools

### Contract Analyzer

Analyzes contract text files for clause types, missing standard clauses, and risk indicators.

```bash
# Analyze a contract file
python scripts/contract_analyzer.py contract.txt

# JSON output for pipeline integration
python scripts/contract_analyzer.py agreement.md --json

# Save analysis to file
python scripts/contract_analyzer.py contract.txt --output analysis.json --json
```

**What it detects:**
- Clause types: Limitation of Liability, Indemnification, IP, Data Protection, Term & Termination, Governing Law, Reps & Warranties, Force Majeure, Confidentiality, Payment Terms
- Missing standard clauses against a baseline checklist
- Risk indicators: uncapped liability, perpetual terms, unilateral indemnification, automatic renewal without opt-out, broad IP assignment, unlimited audit rights

**Risk Classification:**

| Level | Meaning | Action |
|-------|---------|--------|
| RED | Deal-breaker risk | Must negotiate before signing |
| YELLOW | Material concern | Should negotiate, may accept with mitigation |
| GREEN | Standard or favorable | Acceptable as-is |

---

### Redline Generator

Takes contract analysis JSON and generates formatted redline suggestions with priority tiers.

```bash
# Generate redlines from analysis
python scripts/contract_analyzer.py contract.txt --json --output analysis.json
python scripts/redline_generator.py analysis.json

# JSON output
python scripts/redline_generator.py analysis.json --json

# Save redlines to file
python scripts/redline_generator.py analysis.json --output redlines.md
```

**Output includes:**
- Priority tier (Must-Have / Should-Have / Nice-to-Have)
- Preferred redline language
- Rationale for each change
- Fallback position if counterparty rejects
- Negotiation notes

**Priority Tiers:**

| Tier | Label | Description |
|------|-------|-------------|
| 1 | Must-Have | Deal-breakers; walk away if rejected |
| 2 | Should-Have | Strong preferences; push hard but negotiable |
| 3 | Nice-to-Have | Concession candidates; trade for Tier 1-2 wins |

---

## Reference Guides

### Clause Analysis Guide
`references/clause_analysis_guide.md`

Deep reference covering 8+ clause types:
- Limitation of Liability (cap types, carveouts, consequential damages)
- Indemnification (mutuality, scope, procedure)
- IP (ownership, licenses, work-for-hire, feedback)
- Data Protection (DPA, sub-processors, breach notification, transfers)
- Term & Termination (auto-renewal, cure periods, transition)
- Governing Law (jurisdiction, arbitration, jury waiver)
- Representations & Warranties
- Force Majeure

### Negotiation Playbook
`references/negotiation_playbook.md`

Negotiation priority framework with:
- Tier 1 deal-breakers and walkaway criteria
- Tier 2 strong preferences with trading strategies
- Tier 3 concession candidates for strategic give-backs
- Redline format template
- Common negotiation pitfalls

---

## Workflows

### Standard Contract Review

1. **Ingest** -- Save contract as `.txt` or `.md` file
2. **Analyze** -- Run `contract_analyzer.py` with `--json` flag
3. **Review findings** -- Check RED items first, then YELLOW
4. **Generate redlines** -- Run `redline_generator.py` on analysis output
5. **Prioritize** -- Focus on Must-Have redlines, prepare fallbacks for Should-Have
6. **Send to counsel** -- Attach analysis and redlines for final review

### Rapid Risk Triage

1. Run `contract_analyzer.py` in text mode for quick scan
2. If any RED findings: escalate immediately to legal counsel
3. If YELLOW only: schedule review within 48 hours
4. If all GREEN: proceed with standard approval workflow

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| `Error: File not found` | Contract file path is incorrect or file does not exist | Verify the file path; use absolute paths if relative paths fail |
| No clauses detected | Contract uses unusual formatting or non-standard clause headers | Ensure contract is plain text; strip PDF artifacts before analysis |
| All clauses marked GREEN | Contract is genuinely favorable, or text extraction missed key sections | Manually verify critical clauses (liability, indemnification, IP) are present in the input file |
| Redline generator produces empty output | Analysis JSON has no YELLOW or RED findings | Confirm analysis JSON is valid; re-run analyzer if contract was updated |
| False positive on uncapped liability | Liability section references a cap elsewhere in the document | Review the full Limitation of Liability section; the tool scans for cap keywords within each clause boundary |
| Missing clause false positive | Clause exists but uses non-standard heading (e.g., "Damages Cap" instead of "Limitation of Liability") | The analyzer checks multiple heading variants; add custom aliases if your organization uses unique terminology |

---

## Success Criteria

- **Contract review time reduced by 50%:** Automated clause identification and risk classification eliminates manual scanning.
- **Zero missed RED-severity clauses:** Every uncapped liability, unilateral indemnification, and broad IP assignment is flagged before human review.
- **Redline generation under 2 minutes:** From analysis JSON to prioritized redline document.
- **Consistent risk classification across reviewers:** GREEN/YELLOW/RED framework eliminates subjective assessments.
- **100% of contracts reviewed with structured output:** Every agreement gets a clause inventory and risk report before negotiation begins.
- **Negotiation success rate above 80% on Must-Have items:** Tier 1 redlines with prepared fallbacks improve negotiation outcomes.

---

## Scope & Limitations

**Covers:**
- Static text analysis of contract clauses using keyword and pattern matching
- Clause type identification across 10+ standard commercial contract categories
- Risk indicator detection: uncapped liability, perpetual terms, unilateral obligations, auto-renewal traps
- Missing clause detection against a standard commercial contract baseline
- Prioritized redline generation with fallback positions

**Does NOT cover:**
- **Legal advice** -- this tool supports review, it does not replace qualified legal counsel
- **Jurisdiction-specific compliance** -- use `ra-qm-team` skills for regulatory compliance (GDPR, SOC 2, etc.)
- **Contract execution or e-signature workflows** -- out of scope
- **Multi-document cross-reference** (e.g., checking SOW against MSA) -- analyze each document separately
- **Non-English contracts** -- pattern matching is English-language only

---

## Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
|-------------|-------------|-----------------|
| Signing contracts with only GREEN findings and no human review | Automated analysis cannot catch context-dependent risks, ambiguous language, or business-specific concerns | Always have qualified counsel review before execution, even on all-GREEN contracts |
| Treating all RED findings as equal | Some RED items are structural deal-breakers while others may be resolvable with a single word change | Use the redline generator to assess effort and fallback positions for each RED finding |
| Skipping the redline fallback positions | Entering negotiation with only preferred positions leaves no room for strategic concession | Always prepare Must-Have fallbacks and identify Nice-to-Have items to trade away |
| Running analysis on poorly extracted text | PDF-to-text conversion artifacts break clause detection patterns | Clean the text file before analysis: remove headers, footers, page numbers, and formatting artifacts |

---

## Tool Reference

### contract_analyzer.py

**Purpose:** Analyzes contract text files for clause types, identifies missing standard clauses, and flags risk indicators with GREEN/YELLOW/RED severity classification.

**Usage:**

```bash
python scripts/contract_analyzer.py <contract_file> [--json] [--output FILE]
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `contract_file` | *(positional)* | | Path to contract text file (.txt or .md) |
| `--json` | | off | Output in JSON format |
| `--output` | `-o` | *(stdout)* | Write output to file |

**Example Output (JSON):**

```json
{
  "file": "vendor_agreement.txt",
  "clauses_found": [
    {
      "type": "limitation_of_liability",
      "severity": "RED",
      "text_snippet": "...liability shall not be limited...",
      "risk_flags": ["uncapped_liability"],
      "notes": "No liability cap found; uncapped exposure"
    }
  ],
  "missing_clauses": ["force_majeure", "data_protection"],
  "risk_summary": {"RED": 2, "YELLOW": 3, "GREEN": 5},
  "overall_risk": "RED"
}
```

---

### redline_generator.py

**Purpose:** Takes contract analysis JSON and generates formatted redline suggestions with priority tiers, rationale, and fallback positions.

**Usage:**

```bash
python scripts/redline_generator.py <analysis_json> [--json] [--output FILE]
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `analysis_json` | *(positional)* | | Path to contract analysis JSON file |
| `--json` | | off | Output in JSON format |
| `--output` | `-o` | *(stdout)* | Write output to file |

**Example Output:**

```
REDLINE SUGGESTIONS
===================

[MUST-HAVE] Limitation of Liability — Uncapped Liability
  Severity: RED
  Preferred: "Aggregate liability shall not exceed 12 months of fees paid."
  Rationale: Uncapped liability creates unlimited financial exposure.
  Fallback: "Aggregate liability shall not exceed 24 months of fees paid."

[SHOULD-HAVE] Indemnification — Unilateral Indemnification
  Severity: YELLOW
  Preferred: "Each party shall indemnify the other for breaches of this Agreement."
  Rationale: Mutual indemnification balances risk between parties.
  Fallback: "Indemnification obligations shall be subject to the liability cap."
```

---

## data-breach-response

Source path: `references/legal/data-breach-response/SKILL.md`

> **⚠️ EXPERIMENTAL** — This skill is provided for educational and informational purposes only. It does NOT constitute legal advice. All responsibility for usage rests with the user. Consult qualified legal professionals before acting on any output.

# Data Breach Response

Incident response and legal compliance for personal data breaches under GDPR Art. 33/34, CCPA, HIPAA, NIS2, PCI DSS, and other regulations. Calculates breach severity, tracks notification deadlines, and manages response timelines.

---

## Table of Contents

- [Tools](#tools)
  - [Breach Severity Calculator](#breach-severity-calculator)
  - [Breach Timeline Tracker](#breach-timeline-tracker)
- [Reference Guides](#reference-guides)
- [Workflows](#workflows)
- [ENISA Severity Formula](#enisa-severity-formula)
- [Notification Decision Matrix](#notification-decision-matrix)
- [Troubleshooting](#troubleshooting)
- [Success Criteria](#success-criteria)
- [Scope & Limitations](#scope--limitations)
- [Anti-Patterns](#anti-patterns)
- [Tool Reference](#tool-reference)

---

## Clarify First

Before assessing the breach, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **T0 — the moment of awareness** — starts the 72h clock; every deadline and "time remaining" in the timeline is calculated from it
- [ ] **Your role: controller or processor** — determines whether you notify the SA/data subjects (Art. 33/34) or only the controller (Art. 33(2))
- [ ] **Data categories, scale, and ease of identification** — these are the DPC/EI inputs that drive the ENISA severity score and verdict (LOW/MEDIUM/HIGH/VERY HIGH)
- [ ] **Which regulations apply** — GDPR, CCPA, HIPAA, PCI DSS, NIS2, AI Act — sets which notification deadlines and authorities the matrix produces

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the assessment.

## Tools

### Breach Severity Calculator

Calculates ENISA breach severity score from breach parameters. Determines notification obligations based on severity verdict.

```bash
# Calculate severity from parameters
python scripts/breach_severity_calculator.py \
  --dpc 3 --ei 0.75 \
  --confidentiality 0.5 --integrity 0.25 --availability 0 \
  --malicious

# JSON output
python scripts/breach_severity_calculator.py \
  --dpc 2 --ei 0.5 --confidentiality 0.5 --json

# With T0 timestamp for countdown
python scripts/breach_severity_calculator.py \
  --dpc 3 --ei 1.0 --confidentiality 0.5 \
  --t0 "2026-04-10T08:00:00" --json

# Generate input template
python scripts/breach_severity_calculator.py --template
```

**Output includes:**
- ENISA severity score (SE)
- Severity verdict: LOW / MEDIUM / HIGH / VERY HIGH
- Notification obligations (SA, data subjects, public)
- Time remaining for GDPR 72h notification from T0

---

### Breach Timeline Tracker

Tracks breach response timeline from T0 (moment of awareness). Records events, monitors deadlines, and generates status dashboards.

```bash
# Initialize a new breach timeline
python scripts/breach_timeline_tracker.py init \
  --breach-id "BR-2026-001" --t0 "2026-04-10T08:00:00" \
  --description "Unauthorized database access" \
  --output breach_timeline.json

# Record an event
python scripts/breach_timeline_tracker.py event \
  --timeline breach_timeline.json \
  --action "Containment team activated" --category containment

# View status dashboard
python scripts/breach_timeline_tracker.py status --timeline breach_timeline.json

# Check deadlines
python scripts/breach_timeline_tracker.py deadlines --timeline breach_timeline.json

# JSON status output
python scripts/breach_timeline_tracker.py status --timeline breach_timeline.json --json
```

**Tracks:**
- GDPR 72-hour SA notification deadline
- DPA contractual deadlines (24h / 48h processor notification)
- NIS2 24-hour early warning and 72-hour notification
- Completed vs. pending response actions
- Time elapsed and time remaining per deadline

---

## Reference Guides

### ENISA Methodology
`references/enisa_methodology.md`

Complete ENISA breach severity methodology:
- DPC (Data Processing Context) scoring 1-4
- EI (Ease of Identification) scoring 0.25-1.00
- CB (Circumstances of Breach) additive scoring
- Formula: SE = (DPC x EI) + CB
- Adjustments for encryption, pseudonymization, volume
- EDPB case matching (18 reference cases)

### Notification Obligations
`references/notification_obligations.md`

Multi-regulation notification requirements:
- GDPR Art. 33 (SA within 72h) and Art. 34 (data subjects)
- CCPA, HIPAA, PCI DSS, NIS2, state breach notification
- Controller vs. Processor obligation matrix
- Cross-border notification rules
- AI Act Art. 62 serious incident reporting

---

## Workflows

### Workflow 1: Standard Breach Response

```
Step 1: Emergency check — is there <12h remaining on any deadline?
        → If yes, skip to Step 4 (emergency notification)

Step 2: Initialize breach timeline
        → python scripts/breach_timeline_tracker.py init --breach-id "BR-2026-001" \
          --t0 "2026-04-10T08:00:00" --description "Description"

Step 3: Calculate severity
        → python scripts/breach_severity_calculator.py --dpc N --ei N \
          --confidentiality N --integrity N --availability N [--malicious]

Step 4: Based on severity verdict, determine notifications
        → LOW (<2): Internal log only, no external notification
        → MEDIUM (2 to <3): Notify supervisory authority within 72h
        → HIGH (3 to <4): Notify SA + individual data subjects
        → VERY HIGH (>=4): Notify SA + data subjects + consider public notice

Step 5: Execute containment and record events
        → python scripts/breach_timeline_tracker.py event --timeline breach.json \
          --action "Action taken" --category containment

Step 6: Monitor deadlines continuously
        → python scripts/breach_timeline_tracker.py deadlines --timeline breach.json

Step 7: Complete notification obligations and document
```

### Workflow 2: Emergency Mode (<12h Remaining)

```
Step 1: Calculate severity immediately
        → python scripts/breach_severity_calculator.py --dpc N --ei N \
          --confidentiality N --t0 "original-t0" --json

Step 2: If MEDIUM or higher, prepare phased notification
        → Art. 33(4) allows phased notification when full information unavailable
        → Initial notification: what is known + promise of update
        → Supplementary notification: full details when available

Step 3: File initial SA notification before deadline expires

Step 4: Initialize timeline for ongoing tracking
        → Continue gathering information for supplementary notification

Step 5: Document emergency timeline and decisions
```

### Workflow 3: Processor Breach Notification

```
Step 1: Processor becomes aware of breach
        → T0 for processor = moment of awareness

Step 2: Processor must notify controller "without undue delay"
        → Check DPA for specific contractual deadline (24h/48h common)

Step 3: Controller's T0 starts when controller becomes aware
        → Controller's 72h clock starts at this point

Step 4: Controller assesses severity independently
        → python scripts/breach_severity_calculator.py (controller's assessment)

Step 5: Controller makes notification decisions
        → Processor provides information; controller decides on SA/subject notification
```

---

## ENISA Severity Formula

```
SE = (DPC x EI) + CB
```

| Component | Range | Description |
|-----------|-------|-------------|
| DPC | 1-4 | Data Processing Context — nature and sensitivity of data |
| EI | 0.25-1.0 | Ease of Identification — how easily individuals can be identified |
| CB | -0.5 to +1.0 | Circumstances of Breach — additive factors (malicious intent, volume, loss type) |

### Severity Verdicts

| Score Range | Verdict | Notification Obligations |
|-------------|---------|--------------------------|
| <2 | LOW | Internal log only. No SA or subject notification required |
| 2 to <3 | MEDIUM | Notify supervisory authority within 72h (Art. 33) |
| 3 to <4 | HIGH | Notify SA within 72h + notify individual data subjects (Art. 34) |
| >=4 | VERY HIGH | Notify SA + data subjects + consider public notice; crisis management |

---

## Notification Decision Matrix

Quick reference for notification obligations per regulation and severity.

| Regulation | Authority Notification | Individual Notification | Trigger |
|------------|----------------------|------------------------|---------|
| GDPR Art. 33 | SA within 72h | N/A | Unless unlikely to result in risk to rights/freedoms |
| GDPR Art. 34 | N/A | Without undue delay | When likely to result in high risk |
| CCPA | State AG | Affected consumers | Unencrypted personal information compromised |
| HIPAA | HHS within 60 days | Affected individuals | Unsecured PHI; >500: notify media |
| PCI DSS | Card brands within 24h | Cardholders (via issuer) | Cardholder data compromised |
| NIS2 Art. 23 | CSIRT within 24h (early warning), 72h (notification) | N/A | Significant incident |
| AI Act Art. 62 | Market surveillance within 15 days | N/A | Serious incident involving AI system |

### Controller vs. Processor Obligations

| Obligation | Controller | Processor |
|------------|-----------|-----------|
| Notify supervisory authority | Yes (Art. 33) | No (notify controller only) |
| Notify data subjects | Yes (Art. 34) | No |
| Document all breaches | Yes (Art. 33(5)) | Yes (assist controller) |
| Notify controller | N/A | Yes, without undue delay (Art. 33(2)) |
| Conduct severity assessment | Yes | Assist (provide information) |
| Timeline starts (T0) | When controller becomes aware | When processor becomes aware |

---

## Troubleshooting

| Problem | Possible Cause | Resolution |
|---------|---------------|------------|
| Severity score is borderline between MEDIUM and HIGH | Parameters are at threshold boundaries | Score conservatively — if near 3.0, treat as HIGH and notify data subjects; document the borderline analysis |
| 72-hour deadline approaching with incomplete information | Complex breach requiring ongoing investigation | Use Art. 33(4) phased notification — notify SA with available information and supplement later |
| Processor discovered breach but delayed notifying controller | DPA contractual deadline may have been missed | Document the delay; assess whether processor's delay affected controller's ability to comply; review DPA terms |
| Cross-border breach — unclear which SA to notify | Multi-jurisdictional processing with unclear lead SA | Notify the SA of your main establishment (one-stop-shop); if unclear, notify the SA where most affected subjects reside |
| Breach involves encrypted data — unclear if notification needed | Encryption may lower severity or eliminate notification | If encryption was effective (strong algorithm, key not compromised), this may make notification unnecessary per Art. 34(3)(a); document the analysis |
| AI system involved in breach — unclear additional obligations | AI Act Art. 62 may apply alongside GDPR | Assess whether AI system is high-risk under AI Act; if serious incident, notify market surveillance authority within 15 days in addition to GDPR obligations |

---

## Success Criteria

- **Breach severity calculated within 2 hours of awareness** -- ENISA methodology applied with documented parameters and scoring rationale
- **SA notification filed within 72 hours of T0** -- for MEDIUM or higher severity breaches, phased notification used when full information unavailable
- **Data subject notification completed without undue delay** -- for HIGH or higher severity breaches, clear communication of impact and protective measures
- **All response actions tracked with timestamps** -- breach timeline maintained from T0 through closure with all events recorded
- **Cross-regulation obligations identified and met** -- GDPR, CCPA, HIPAA, PCI DSS, NIS2, and AI Act obligations assessed and fulfilled per applicable law
- **Post-breach documentation complete** -- internal breach log maintained per Art. 33(5) regardless of notification decision

---

## Scope & Limitations

**In Scope:**
- ENISA breach severity calculation with full parameter support
- GDPR Art. 33/34 notification timeline tracking
- Multi-regulation notification obligation assessment (GDPR, CCPA, HIPAA, PCI DSS, NIS2, AI Act)
- Controller vs. processor obligation guidance
- Cross-border breach notification routing
- Phased notification guidance per Art. 33(4)
- Breach response event tracking and deadline monitoring

**Out of Scope:**
- Technical incident containment (network isolation, forensics, malware removal)
- Filing notifications with supervisory authorities (document preparation only)
- Insurance claim processing or coverage analysis
- Law enforcement coordination
- Public relations or crisis communications strategy
- Forensic investigation methodology

---

## Anti-Patterns

- **Delaying T0 determination to buy more time** -- T0 is the moment the controller becomes "aware" of the breach, not when full details are known; deliberately delaying awareness to extend the 72-hour window is a compliance violation and will be treated as such by regulators
- **Defaulting to no notification without documented analysis** -- every breach must be documented and assessed, even if the conclusion is that notification is not required; "we decided not to notify" without documented severity analysis is indefensible
- **Treating processor notification as controller notification** -- processor notifying its own SA does not satisfy the controller's Art. 33 obligation; the controller must make its own independent notification decision and filing
- **Using encryption as an automatic notification exemption** -- Art. 34(3)(a) exemption requires that the encrypted data was rendered unintelligible AND the encryption key was not compromised; weak encryption or compromised keys do not qualify
- **Ignoring AI Act obligations for AI-involved breaches** -- if the breach involves a high-risk AI system, Art. 62 serious incident reporting (15 days to market surveillance authority) applies in addition to GDPR; these are separate obligations with different timelines

---

## Tool Reference

### breach_severity_calculator.py

Calculates ENISA breach severity score and determines notification obligations.

| Flag | Required | Description |
|------|----------|-------------|
| `--dpc <1-4>` | Yes | Data Processing Context: 1=Simple demographic, 2=Behavioral/financial, 3=Sensitive personal, 4=Special category/highly sensitive |
| `--ei <0.25-1.0>` | Yes | Ease of Identification: 0.25=Negligible, 0.5=Limited, 0.75=Significant, 1.0=Maximum |
| `--confidentiality <0/0.25/0.5>` | No | Confidentiality loss score (default 0) |
| `--integrity <0/0.25/0.5>` | No | Integrity loss score (default 0) |
| `--availability <0/0.25/0.5>` | No | Availability loss score (default 0) |
| `--malicious` | No | Flag for malicious intent (adds +0.5 to CB) |
| `--t0 <ISO datetime>` | No | T0 timestamp for deadline calculation |
| `--template` | No | Generate input template |
| `--json` | No | Output in JSON format |

### breach_timeline_tracker.py

Tracks breach response timeline, events, and regulatory deadlines.

| Subcommand | Description |
|------------|-------------|
| `init` | Initialize breach timeline (`--breach-id`, `--t0`, `--description` required, `--output` optional) |
| `event` | Record event (`--timeline`, `--action`, `--category` required) |
| `status` | View status dashboard (`--timeline` required, `--json` optional) |
| `deadlines` | Check deadline status (`--timeline` required, `--json` optional) |

---

## dpia-assessment

Source path: `references/legal/dpia-assessment/SKILL.md`

> **⚠️ EXPERIMENTAL** — This skill is provided for educational and informational purposes only. It does NOT constitute legal advice. All responsibility for usage rests with the user. Consult qualified legal professionals before acting on any output.

# DPIA Assessment

GDPR Article 35 Data Protection Impact Assessment tooling. Evaluates whether a DPIA is required, manages risk registers with mitigation tracking, and generates documentation meeting supervisory authority expectations.

---

## Table of Contents

- [Tools](#tools)
  - [DPIA Threshold Checker](#dpia-threshold-checker)
  - [DPIA Risk Register](#dpia-risk-register)
- [Reference Guides](#reference-guides)
- [Workflows](#workflows)
- [Legal Precision Points](#legal-precision-points)
- [Output Formats](#output-formats)
- [Troubleshooting](#troubleshooting)
- [Success Criteria](#success-criteria)
- [Scope & Limitations](#scope--limitations)
- [Anti-Patterns](#anti-patterns)
- [Tool Reference](#tool-reference)

---

## Clarify First

Before the assessment, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Processing activity description** — purpose, data types, automation level, scale — drives the Art. 35(3) trigger matches and EDPB criteria scoring (the whole verdict)
- [ ] **Special-category data + scale** — determines the Art. 35(3)(b) trigger, the Art. 9 cumulative-basis requirement, and the large-scale four-factor test
- [ ] **Jurisdiction(s)** — which national blacklists apply (DE/FR/IE/BE/NL/IT/PL); the most restrictive governs
- [ ] **Whether an AI system is involved** — triggers dual-phase (training/inference) analysis per EDPB Opinion 28/2024 and the separate FRIA distinction

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the assessment.

## Tools

### DPIA Threshold Checker

Evaluates whether a DPIA is required based on processing activity description. Checks Art. 35(3) mandatory triggers and 9 EDPB criteria.

```bash
# Check a processing activity (interactive prompts)
python scripts/dpia_threshold_checker.py --activity "AI-based credit scoring using financial and behavioral data of retail banking customers across EU"

# Check from JSON description
python scripts/dpia_threshold_checker.py --input processing.json

# JSON output
python scripts/dpia_threshold_checker.py --activity "Employee monitoring via CCTV in workplace" --json

# Generate blank input template
python scripts/dpia_threshold_checker.py --template > processing.json
```

**Checks performed:**
- Art. 35(3)(a): Automated decision-making with legal/significant effect
- Art. 35(3)(b): Large-scale processing of special category data (Art. 9) or criminal data (Art. 10)
- Art. 35(3)(c): Systematic monitoring of publicly accessible area on large scale
- 9 EDPB criteria from WP 248 rev.01 with two-criterion presumption rule

**Output:**
- Verdict: Required / Recommended / Not Required
- Art. 35(3) trigger matches
- EDPB criteria scores with reasoning
- Two-criterion presumption analysis

---

### DPIA Risk Register

Manages a DPIA risk register in JSON format. Add risks, apply mitigations, and calculate residual risk.

```bash
# Initialize a new risk register
python scripts/dpia_risk_register.py init --output dpia_risks.json

# Add a risk
python scripts/dpia_risk_register.py add --register dpia_risks.json \
  --description "Unauthorized access to profiling data" \
  --rights-category "right-to-privacy" \
  --likelihood 4 --severity 3

# Add mitigation to a risk
python scripts/dpia_risk_register.py mitigate --register dpia_risks.json \
  --risk-id 1 --measure "Implement role-based access control" \
  --likelihood-reduction 2 --severity-reduction 1

# View risk register table
python scripts/dpia_risk_register.py view --register dpia_risks.json

# Generate residual risk summary
python scripts/dpia_risk_register.py summary --register dpia_risks.json --json

# Check Art. 36 consultation threshold
python scripts/dpia_risk_register.py art36-check --register dpia_risks.json
```

**Rights categories:** right-to-privacy, non-discrimination, freedom-of-expression, right-to-information, right-to-not-be-subject-to-automated-decisions, right-to-physical-safety

---

## Reference Guides

### EDPB Criteria
`references/edpb_criteria.md`

Complete EDPB 9-criteria assessment framework:
- Each criterion with description, indicators, and scoring guidance
- Art. 35(3) mandatory triggers
- Two-criterion presumption rule (WP 248 rev.01)
- Multi-jurisdictional DPIA analysis
- National blacklist/whitelist overview (DE, FR, IE, BE, NL, IT, PL)

### Risk Scoring Methodology
`references/risk_scoring_methodology.md`

DPIA risk scoring from the data subject perspective:
- Likelihood and severity scales (1-5)
- Rights categories per Recital 75
- Risk level thresholds (Low/Medium/High/Very High)
- Mitigation effectiveness scoring
- Residual risk calculation
- Art. 36 consultation triggers
- Risk catalog: 20+ common DPIA risks

---

## Workflows

### Workflow 1: Full DPIA Assessment

```
Step 1: Threshold check — determine if DPIA required
        → python scripts/dpia_threshold_checker.py --activity "description"

Step 2: If Required or Recommended, describe the processing
        → Document purpose, legal basis, data categories, recipients, retention

Step 3: Assess necessity and proportionality
        → Confirm lawful basis (Art. 6, cumulative with Art. 9 if special categories)
        → Verify purpose limitation, data minimization, storage limitation

Step 4: Identify risks from data subject perspective
        → python scripts/dpia_risk_register.py init --output dpia_risks.json
        → Add risks using references/risk_scoring_methodology.md catalog

Step 5: Apply mitigations and calculate residual risk
        → python scripts/dpia_risk_register.py mitigate --register dpia_risks.json ...

Step 6: Check Art. 36 consultation requirement
        → python scripts/dpia_risk_register.py art36-check --register dpia_risks.json

Step 7: Document and review
        → python scripts/dpia_risk_register.py summary --register dpia_risks.json
```

### Workflow 2: Quick Threshold Assessment

```
Step 1: Describe the processing activity
        → python scripts/dpia_threshold_checker.py --template > processing.json
        → Fill in processing details

Step 2: Run threshold check
        → python scripts/dpia_threshold_checker.py --input processing.json --json

Step 3: Review verdict and reasoning
        → Required: proceed to full DPIA (Workflow 1)
        → Recommended: proceed unless strong justification to skip (document)
        → Not Required: document the assessment and rationale
```

### Workflow 3: AI System DPIA

```
Step 1: Classify AI system (EU AI Act risk level if applicable)
        → Map to DPIA triggers (automated decision-making, profiling, scoring)

Step 2: Run threshold check with AI-specific indicators
        → python scripts/dpia_threshold_checker.py --activity "AI system description"

Step 3: Dual-phase risk analysis (EDPB Opinion 28/2024)
        → Phase 1: Training data risks (collection, bias, consent)
        → Phase 2: Inference risks (decisions, profiling, transparency)

Step 4: Assess from data subject perspective
        → Add risks covering both training and inference phases
        → Include algorithmic bias, lack of transparency, unfair outcomes

Step 5: Apply mitigations specific to AI
        → Explainability measures, human oversight, bias testing
        → Document FRIA distinction per EU AI Act Art. 27 if applicable
```

---

## Legal Precision Points

12 points of legal precision that distinguish expert-level DPIA work.

| # | Point | Detail |
|---|-------|--------|
| 1 | **Art. 35(3) absolute triggers** | Three mandatory triggers require DPIA regardless of other analysis: (a) automated decisions with legal effect, (b) large-scale special category/criminal data, (c) systematic public area monitoring |
| 2 | **Two-criterion presumption** | If 2 or more of the 9 EDPB criteria are met, DPIA is presumptively required (WP 248 rev.01). Can rebut only with documented justification |
| 3 | **Art. 9 cumulative with Art. 6** | Special category data requires BOTH an Art. 6 lawful basis AND an Art. 9(2) exception. Neither alone is sufficient |
| 4 | **Large scale four-factor test** | Assess: (a) number of data subjects, (b) volume of data, (c) geographic extent, (d) duration/permanence. No fixed numeric threshold |
| 5 | **National blacklists additive** | SA-published lists of processing operations requiring DPIA add to (not replace) Art. 35(3) and EDPB criteria |
| 6 | **Multi-jurisdictional checking** | If processing spans multiple member states, check each SA's blacklist. Most restrictive list applies |
| 7 | **Pre-processing obligation** | DPIA must be completed BEFORE processing begins (Art. 35(1)). Retroactive DPIAs do not satisfy the requirement |
| 8 | **AI dual-phase analysis** | EDPB Opinion 28/2024: AI systems require separate risk analysis for training phase and inference/deployment phase |
| 9 | **Art. 36 sequential** | Prior consultation with SA (Art. 36) is triggered only AFTER DPIA is completed and residual risk remains high. Cannot skip the DPIA |
| 10 | **Pseudonymization nuance** | EDPB Guidelines 01/2025: pseudonymization reduces risk but does not eliminate DPIA requirement. Still personal data |
| 11 | **Data subject perspective** | All risks must be assessed from the data subject's perspective (Recital 75), not the controller's business perspective |
| 12 | **AI Act FRIA distinction** | EU AI Act Art. 27 requires Fundamental Rights Impact Assessment (FRIA) for high-risk AI. FRIA is separate from GDPR DPIA — both may be required |

---

## Output Formats

### Threshold Verdict

```
VERDICT: DPIA REQUIRED
Reason: Art. 35(3)(a) trigger matched (automated decision-making with legal effect)
        + 4 of 9 EDPB criteria met (two-criterion presumption applies)
Matched triggers: automated_decision_making, evaluation_scoring, sensitive_data, large_scale
```

### Risk Register Table

| ID | Description | Rights Category | L | S | Score | Level | Mitigation | Residual L | Residual S | Residual Score | Residual Level |
|----|-------------|-----------------|---|---|-------|-------|------------|------------|------------|---------------|---------------|
| 1 | Unauthorized profiling | Right to privacy | 4 | 3 | 12 | High | RBAC + encryption | 2 | 2 | 4 | Low |
| 2 | Discriminatory outcomes | Non-discrimination | 3 | 4 | 12 | High | Bias testing + human review | 2 | 3 | 6 | Medium |

### Residual Risk Overview

```
Total risks: 8
Mitigated: 6 (75%)
Residual risk distribution:
  Low:       3 (37.5%)
  Medium:    3 (37.5%)
  High:      2 (25.0%)
  Very High: 0 (0.0%)

Art. 36 consultation: NOT TRIGGERED (no Very High residual risks)
```

---

## Troubleshooting

| Problem | Possible Cause | Resolution |
|---------|---------------|------------|
| Threshold checker says "Not Required" but processing feels risky | Activity description too vague or missing key details | Provide more specific description including data types, scale, automation level, and data subject categories |
| Two-criterion presumption triggered but controller disagrees | Controller must document justification for rebutting presumption | Document specific reasons why DPIA is not needed despite criteria match; SA may challenge this |
| Risk register shows High residual risk after mitigations | Mitigations insufficient or not properly scored | Review mitigation effectiveness; consider additional controls; if residual risk remains high, Art. 36 consultation required |
| Multi-jurisdictional check produces conflicting results | Different SAs have different blacklists and thresholds | Apply the most restrictive requirement; document the analysis for each jurisdiction |
| AI system DPIA unclear on training vs. inference risks | Training and inference phases have different risk profiles | Separate the analysis per EDPB Opinion 28/2024; assess each phase independently then combine |
| Art. 36 check unclear on threshold | Residual risk near the boundary between High and Very High | Document the borderline assessment; consider voluntary consultation as good practice |

---

## Success Criteria

- **All high-risk processing activities assessed** -- threshold check completed before processing begins, with documented verdict and reasoning
- **Risk register complete with mitigations** -- every identified risk has likelihood, severity, rights category, and at least one mitigation measure
- **Residual risk acceptable or Art. 36 consultation initiated** -- no unaddressed Very High residual risks
- **Documentation meets SA expectations** -- assessment follows Art. 35(7) requirements: systematic description, necessity/proportionality, risks, mitigations
- **EDPB criteria properly applied** -- two-criterion presumption correctly evaluated with documented reasoning

---

## Scope & Limitations

**In Scope:**
- DPIA threshold assessment against Art. 35(3) triggers and EDPB criteria
- Risk register management with mitigation tracking and residual risk calculation
- Art. 36 prior consultation threshold assessment
- Multi-jurisdictional blacklist awareness (DE, FR, IE, BE, NL, IT, PL)
- AI system dual-phase DPIA analysis guidance
- Data subject perspective risk assessment per Recital 75

**Out of Scope:**
- Legal advice on lawful basis selection (Art. 6) or Art. 9(2) exception applicability
- Supervisory authority submission or interaction
- Technical implementation of mitigations (encryption, access control)
- DPO appointment or consultation logistics
- National blacklist exhaustive coverage beyond listed jurisdictions
- EU AI Act conformity assessment (see eu-ai-act-specialist)

---

## Anti-Patterns

- **Conducting DPIA after processing has started** -- Art. 35(1) requires DPIA before processing begins; retroactive DPIAs do not satisfy the legal obligation and create enforcement exposure
- **Assessing risk from the controller's perspective** -- DPIA risks must be evaluated from the data subject's perspective per Recital 75; business impact is irrelevant to this analysis; a breach that is minor for the company may be catastrophic for affected individuals
- **Treating pseudonymization as eliminating DPIA need** -- pseudonymized data remains personal data under GDPR (Recital 26); pseudonymization is a mitigation that reduces risk scores, not a basis for skipping the DPIA entirely
- **Skipping Art. 36 consultation when residual risk is high** -- if residual risk remains Very High after mitigations, prior consultation with the supervisory authority is mandatory, not optional
- **Conflating DPIA with FRIA** -- the EU AI Act's Fundamental Rights Impact Assessment (Art. 27) is a separate obligation from GDPR DPIA; completing one does not satisfy the other; both may be required for AI systems processing personal data

---

## Tool Reference

### dpia_threshold_checker.py

Evaluates whether a DPIA is required based on Art. 35(3) triggers and EDPB criteria.

| Flag | Required | Description |
|------|----------|-------------|
| `--activity <text>` | Yes (unless `--input` or `--template`) | Processing activity description |
| `--input <file>` | Yes (unless `--activity`) | Path to JSON processing description |
| `--template` | No | Generate blank input template |
| `--json` | No | Output in JSON format |

### dpia_risk_register.py

Manages DPIA risk register with mitigation tracking and residual risk calculation.

| Subcommand | Description |
|------------|-------------|
| `init` | Create new empty risk register (`--output` required) |
| `add` | Add risk (`--register`, `--description`, `--rights-category`, `--likelihood`, `--severity` required) |
| `mitigate` | Add mitigation (`--register`, `--risk-id`, `--measure`, `--likelihood-reduction`, `--severity-reduction` required) |
| `view` | Display risk register table (`--register` required) |
| `summary` | Generate summary with distribution (`--register` required, `--json` optional) |
| `art36-check` | Check Art. 36 consultation requirement (`--register` required) |

---

## legal-canned-responses

Source path: `references/legal/legal-canned-responses/SKILL.md`

> **⚠️ EXPERIMENTAL** — This skill is provided for educational and informational purposes only. It does NOT constitute legal advice. All responsibility for usage rests with the user. Consult qualified legal professionals before acting on any output.

# Legal Canned Responses Skill

## Overview

Production-ready toolkit for generating templated responses to common legal inquiries with built-in escalation detection. Covers 7 response categories with multiple sub-types each, plus a universal and category-specific escalation trigger system. Designed for legal operations teams handling high volumes of recurring inquiries while ensuring critical matters are routed to counsel.

## Table of Contents

- [Tools](#tools)
- [Reference Guides](#reference-guides)
- [Workflows](#workflows)
- [Response Categories](#response-categories)
- [Escalation System](#escalation-system)
- [Troubleshooting](#troubleshooting)
- [Success Criteria](#success-criteria)
- [Scope & Limitations](#scope--limitations)
- [Anti-Patterns](#anti-patterns)
- [Tool Reference](#tool-reference)

## Clarify First

Before generating the response, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Inquiry category + sub-type** — DSR-acknowledgment vs subpoena-objection select completely different templates
- [ ] **The raw inquiry text** — required to run escalation detection first; a litigation, regulator, law-enforcement, or press trigger means STOP and route to counsel, not a templated reply
- [ ] **Substitution variables** — requestor name, dates, matter, and regulation — populate the response; missing values leave placeholders and the wrong timelines (GDPR 30-day vs CCPA 45-day)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the response.

## Tools

### 1. Response Generator (`scripts/response_generator.py`)

Generate formatted legal responses from templates with variable substitution and escalation detection.

```bash
python scripts/response_generator.py \
  --category dsr --sub-type acknowledgment \
  --var requestor_name="Jane Doe" \
  --var request_type="access" \
  --var request_date="2026-04-10"

python scripts/response_generator.py \
  --category nda --sub-type standard-form \
  --var counterparty="Acme Corp" \
  --var purpose="due diligence" --json

python scripts/response_generator.py \
  --category discovery --sub-type initial-notice \
  --var matter_name="Smith v. Corp" \
  --var custodians="Engineering,Sales"
```

### 2. Escalation Detector (`scripts/escalation_detector.py`)

Analyze inquiry text for escalation triggers and recommend routing.

```bash
python scripts/escalation_detector.py \
  --text "We received a subpoena from the DOJ regarding our pricing practices"

python scripts/escalation_detector.py \
  --text "A reporter from the Wall Street Journal is asking about our data practices" --json

python scripts/escalation_detector.py \
  --category vendor \
  --text "The vendor is threatening litigation over the contract dispute"
```

## Reference Guides

| Reference | Purpose |
|-----------|---------|
| `references/response_templates.md` | Complete templates for all 7 categories with sub-types |
| `references/escalation_triggers.md` | Universal and category-specific escalation triggers |

## Workflows

### Template Lifecycle

1. **Creation** -- Draft response template for identified recurring inquiry type
2. **Review** -- Legal counsel reviews template for accuracy, tone, and compliance
3. **Publication** -- Template added to system with metadata, variables, and triggers
4. **Use** -- Staff selects category/sub-type, fills variables, generates response
5. **Feedback** -- Track usage and collect feedback on template effectiveness
6. **Update** -- Revise templates based on feedback, legal changes, or policy updates
7. **Retirement** -- Archive templates that are no longer applicable

### Response Generation Workflow

1. **Classify Inquiry** -- Determine category (DSR, NDA, subpoena, etc.) and sub-type
2. **Check Escalation** -- Run escalation detector on inquiry text
3. **If Escalation Detected** -- Stop; route to counsel with escalation report
4. **If No Escalation** -- Generate response with appropriate template and variables
5. **Review & Send** -- Review generated response before sending; adjust if needed

## Response Categories

| Category | Sub-Types | Description |
|----------|-----------|-------------|
| Data Subject Requests (DSR) | acknowledgment, verification, fulfillment, denial, extension | GDPR/CCPA data subject right requests |
| Discovery/Litigation Holds | initial-notice, reminder, modification, release | Litigation hold management |
| Privacy Inquiries | cookies, data-sharing, children, transfers | General privacy questions |
| Vendor Legal Questions | contract-status, amendments, certifications, audit | Vendor/supplier legal matters |
| NDA Requests | standard-form, counterparty-markup, decline, renewal | Non-disclosure agreement lifecycle |
| Subpoena/Legal Process | acknowledgment, objection, extension, compliance | Legal process responses |
| Insurance Notifications | initial-claim, supplemental-info, reservation-of-rights | Insurance claim management |

### DSR Sub-Types

| Sub-Type | Use When | Key Variables |
|----------|----------|---------------|
| acknowledgment | New DSR received | requestor_name, request_type, request_date |
| verification | Identity verification needed | requestor_name, verification_method |
| fulfillment | Request completed | requestor_name, request_type, data_description |
| denial | Request denied with reason | requestor_name, request_type, denial_reason |
| extension | Need more time | requestor_name, request_type, extension_reason, new_deadline |

### Discovery/Litigation Hold Sub-Types

| Sub-Type | Use When | Key Variables |
|----------|----------|---------------|
| initial-notice | New litigation hold issued | matter_name, custodians, data_types |
| reminder | Periodic hold reminder | matter_name, reminder_number |
| modification | Hold scope changed | matter_name, modification_description |
| release | Hold lifted | matter_name, release_date |

## Escalation System

### Universal Triggers (Always Escalate)

| # | Trigger | Why |
|---|---------|-----|
| 1 | Potential or active litigation | Legal exposure requires counsel assessment |
| 2 | Regulatory investigation or inquiry | Regulatory response requires strategic approach |
| 3 | Government or law enforcement contact | Constitutional and procedural rights at stake |
| 4 | Binding legal commitment requested | Cannot create legal obligations without counsel |
| 5 | Criminal liability exposure | Requires immediate counsel involvement |
| 6 | Media attention or press inquiry | Reputational risk requires coordinated response |
| 7 | Unprecedented or novel situation | No template exists; bespoke legal analysis needed |
| 8 | Multi-jurisdictional conflict | Cross-border legal complexity requires expert analysis |

### Escalation Response Protocol

1. **Stop** -- Do not send any templated response
2. **Alert** -- Notify designated counsel immediately
3. **Explain** -- Provide escalation context with matched triggers
4. **Recommend** -- Suggest routing based on trigger type
5. **Draft** -- Mark any preliminary draft "FOR COUNSEL REVIEW ONLY"

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Missing variable in output | Required variable not provided | Check template requirements; provide all required `--var` parameters |
| Wrong template selected | Category/sub-type mismatch | Review category descriptions; ensure sub-type matches inquiry type |
| False positive escalation | Common words matching trigger patterns | Provide `--category` to use category-specific triggers; review matched triggers |
| False negative escalation | Inquiry text too vague | Add more context to inquiry text; run both universal and category-specific checks |
| Template too generic | Using default values | Replace all placeholder values with actual organization-specific details |
| Discovery hold sent to wrong custodians | Custodian list outdated | Verify custodian list against current employees and systems |
| Subpoena response not flagged | Missing category context | Always use `--category subpoena` for legal process; subpoena category always escalates |
| Response tone inappropriate | Wrong audience context | Select appropriate sub-type; customize tone per audience |

## Success Criteria

- **Response Time**: Templated responses generated within 5 minutes vs. 30+ minutes manual drafting
- **Escalation Accuracy**: 100% of genuine escalation triggers detected (zero false negatives on CRITICAL triggers)
- **Template Coverage**: Templates cover 80%+ of recurring legal inquiry types
- **Consistency**: All responses within a category use consistent language, tone, and legal caveats
- **Audit Trail**: Every generated response logged with category, sub-type, date, and escalation status

## Scope & Limitations

**This skill covers:**
- Template-based response generation for 7 common legal inquiry categories
- Escalation detection using keyword and pattern matching against known triggers
- Variable substitution for organization-specific customization
- Response metadata generation for audit trail purposes

**This skill does NOT cover:**
- Legal advice or attorney-client privileged analysis
- Automated sending of responses (generation only; human review required)
- Contract drafting, negotiation, or legal document creation
- Case management, docketing, or deadline tracking
- Jurisdiction-specific legal compliance validation of response content

## Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
|--------------|-------------|-----------------|
| Sending templated response without review | May miss context-specific nuances; legal risk | Always review generated response before sending |
| Ignoring escalation triggers | Critical matters mishandled; legal exposure | Run escalation detector on every inquiry; treat all triggers seriously |
| Using templates for novel situations | Templates assume standard scenarios; novel situations need bespoke analysis | Escalate novel situations to counsel; create new template after resolution |
| Hardcoding organization details in templates | Templates become non-portable; updates missed | Use variable substitution; maintain variables in configuration |
| Skipping identity verification for DSRs | GDPR/CCPA require verification before fulfillment | Always send verification sub-type before fulfillment |

## Tool Reference

### `scripts/response_generator.py`

Generate formatted legal responses with variable substitution.

```
usage: response_generator.py [-h] [--json]
                              --category {dsr,discovery,privacy,vendor,nda,subpoena,insurance}
                              --sub-type SUB_TYPE
                              [--var KEY=VALUE [KEY=VALUE ...]]

options:
  -h, --help            Show help message and exit
  --json                Output in JSON format
  --category            Response category
  --sub-type            Response sub-type within category
  --var                 Variable substitution as KEY=VALUE pairs
```

### `scripts/escalation_detector.py`

Analyze inquiry text for escalation triggers.

```
usage: escalation_detector.py [-h] [--json]
                               --text TEXT
                               [--category {dsr,discovery,privacy,vendor,nda,subpoena,insurance}]

options:
  -h, --help            Show help message and exit
  --json                Output in JSON format
  --text                Inquiry text to analyze for escalation triggers
  --category            Optional category for category-specific trigger detection
```

---

## legal-meeting-briefing

Source path: `references/legal/legal-meeting-briefing/SKILL.md`

> **⚠️ EXPERIMENTAL** — This skill is provided for educational and informational purposes only. It does NOT constitute legal advice. All responsibility for usage rests with the user. Consult qualified legal professionals before acting on any output.

# Legal Meeting Briefing Skill

## Overview

Production-ready toolkit for preparing structured briefings for meetings with legal relevance and tracking resulting action items. Supports 8 meeting types with type-specific preparation guidance, a 13-section briefing template, and action item management with priority levels and follow-up cadence. Designed for legal teams preparing counsel, in-house attorneys, and legal operations professionals for productive meetings.

## Table of Contents

- [Tools](#tools)
- [Reference Guides](#reference-guides)
- [Workflows](#workflows)
- [Meeting Types](#meeting-types)
- [Troubleshooting](#troubleshooting)
- [Success Criteria](#success-criteria)
- [Scope & Limitations](#scope--limitations)
- [Anti-Patterns](#anti-patterns)
- [Tool Reference](#tool-reference)

## Clarify First

Before generating the briefing, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Meeting type** — deal-review, board, regulatory, litigation, etc. — selects which type-specific sections appear (e.g. privilege considerations only for regulatory/litigation)
- [ ] **Participants with orgs and roles** — populate the counterparty-dynamics and interests sections; without them the brief is generic
- [ ] **Objective / agenda** — sets the depth and which sections matter; drives the preparation-gap list
- [ ] **Privilege sensitivity** — for regulatory/government or litigation meetings, determines what goes in the privilege section vs what can be shared

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the briefing.

## Tools

### 1. Meeting Brief Generator (`scripts/meeting_brief_generator.py`)

Generate a meeting briefing skeleton pre-populated with sections based on meeting type.

```bash
python scripts/meeting_brief_generator.py \
  --type deal-review \
  --title "Series B Term Sheet Review" \
  --date 2026-04-15 \
  --participants '[{"name":"Jane Smith","org":"Legal","role":"Lead Counsel"}]'

python scripts/meeting_brief_generator.py \
  --type board \
  --title "Q1 Board Meeting" \
  --date 2026-04-20 \
  --agenda "Legal update,Risk report,Pending approvals" --json

python scripts/meeting_brief_generator.py \
  --type regulatory \
  --title "FDA Pre-Submission Meeting" \
  --date 2026-05-01 \
  --participants '[{"name":"Dr. Lee","org":"FDA","role":"Reviewer"}]'
```

### 2. Action Item Tracker (`scripts/action_item_tracker.py`)

Manage action items from legal meetings with priority levels, ownership, and status tracking.

```bash
python scripts/action_item_tracker.py add \
  --title "Draft NDA for Vendor X" \
  --owner "Jane Smith" \
  --priority high \
  --deadline 2026-04-20 \
  --meeting "Series B Review"

python scripts/action_item_tracker.py list \
  --filter-status open \
  --filter-priority high

python scripts/action_item_tracker.py complete --id 3

python scripts/action_item_tracker.py dashboard --json

python scripts/action_item_tracker.py update --id 5 \
  --status in-progress --notes "Waiting for counterparty response"
```

## Reference Guides

| Reference | Purpose |
|-----------|---------|
| `references/meeting_type_guides.md` | Preparation guidance for all 8 meeting types |
| `references/briefing_templates.md` | Complete 13-section briefing template and action item tracking |

## Workflows

### 5-Step Briefing Methodology

| Step | Action | Output |
|------|--------|--------|
| 1. Identify Meeting | Determine meeting type, participants, objectives | Meeting classification |
| 2. Assess Preparation Needs | Select type-specific sections and depth | Section checklist |
| 3. Gather Context | Collect documents, prior notes, open issues | Background materials |
| 4. Synthesize into Briefing | Run generator; populate sections with gathered context | Draft briefing |
| 5. Identify Preparation Gaps | Review for missing info; flag items needing follow-up | Gap list |

### Meeting Type Selection

| Meeting Type | Key Indicator |
|-------------|---------------|
| Deal Review | Transaction under consideration or in progress |
| Board/Committee | Board of directors, audit committee, compensation committee |
| Vendor Call | Meeting with supplier, contractor, or service provider |
| Team Sync | Internal legal team meeting |
| Client/Customer | External client or customer-facing meeting |
| Regulatory/Government | Meeting with regulator, agency, or government body |
| Litigation/Dispute | Meeting about active or potential legal dispute |
| Cross-Functional | Meeting with stakeholders from multiple departments |

### Action Item Workflow

1. **Capture** -- Record action items during or immediately after meeting
2. **Assign** -- Set owner, priority, and deadline for each item
3. **Track** -- Monitor progress via dashboard; update status as work progresses
4. **Follow-Up** -- Follow cadence based on priority level
5. **Close** -- Mark complete when done; archive for audit trail

### Follow-Up Cadence

| Priority | Follow-Up Frequency | Escalation |
|----------|-------------------|------------|
| High | Daily check-in | Escalate after 2 missed days |
| Medium | Weekly check-in | Escalate after 1 missed week |
| Low | Monthly check-in | Escalate after 1 missed month |
| Overdue | Immediate escalation | Notify supervisor and meeting owner |

## Meeting Types

### Deal Review

Focus: Transaction analysis, contract review, approval requirements.

| Section | Content |
|---------|---------|
| Deal Summary | Parties, structure, value, timeline |
| Contract Status | Draft version, open issues, redline items |
| Approval Requirements | Who must approve; delegated authority limits |
| Counterparty Dynamics | Negotiation position, prior dealings, leverage |
| Comparable Deals | Similar transactions for benchmarking terms |

### Board/Committee

Focus: Legal department update, risk highlights, governance.

| Section | Content |
|---------|---------|
| Legal Department Update | Headcount, budget, key accomplishments |
| Risk Highlights | Top legal risks with likelihood and impact |
| Regulatory Update | Recent regulatory changes affecting the organization |
| Pending Approvals | Items requiring board or committee action |
| Litigation Summary | Active matters, reserves, settlement status |

### Regulatory/Government

Focus: Compliance posture, enforcement patterns, privilege considerations.

| Section | Content |
|---------|---------|
| Regulatory Body Context | Agency structure, jurisdiction, enforcement priorities |
| Enforcement Patterns | Recent enforcement actions in the sector |
| Matter History | Prior interactions, submissions, correspondence |
| Privilege Considerations | What is privileged; what can be shared |
| Compliance Posture | Current compliance status; remediation progress |

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Brief missing type-specific sections | Wrong meeting type selected | Review meeting type descriptions; select the most specific type |
| Participants not formatted | JSON format error | Use valid JSON array: `'[{"name":"X","org":"Y","role":"Z"}]'` |
| Action items not persisting | Tracker uses file-based storage | Ensure write permissions in working directory; check `action_items.json` |
| Dashboard shows stale data | Cached data from previous run | Re-run dashboard command; items are loaded fresh from storage |
| Overdue items not flagged | Clock/timezone mismatch | Verify system date; deadlines use YYYY-MM-DD format |
| Agenda items not populating | Comma-separated format expected | Use `--agenda "Item 1,Item 2,Item 3"` format |
| Brief too generic | Minimal parameters provided | Add participants, agenda, and type-specific context |
| Action item ID not found | Item was completed or deleted | Run `list --filter-status all` to see all items including completed |

## Success Criteria

- **Preparation Coverage**: Every legal meeting has a briefing covering all relevant sections for its type
- **Action Item Capture**: 100% of action items captured with owner, deadline, and priority within 24 hours
- **On-Time Completion**: 90%+ of action items completed by deadline
- **Meeting Effectiveness**: Participants report improved preparation and productivity (measured by survey)
- **Follow-Up Compliance**: High-priority items followed up daily; medium weekly; low monthly

## Scope & Limitations

**This skill covers:**
- Meeting briefing generation with type-specific sections for 8 meeting types
- Action item tracking with CRUD operations, filtering, and status dashboard
- Follow-up cadence management based on priority levels
- Preparation gap identification for pre-meeting readiness

**This skill does NOT cover:**
- Calendar integration or meeting scheduling
- Real-time meeting notes or transcription
- Email drafting or distribution of briefings
- Document management or version control for meeting materials
- Video conferencing or collaboration tool integration

## Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
|--------------|-------------|-----------------|
| Generic briefing for all meeting types | Misses type-specific concerns; wastes prep time on irrelevant sections | Select correct meeting type; use type-specific guidance |
| Capturing action items days after meeting | Details forgotten; ownership unclear; deadlines slip | Capture during meeting or within 2 hours; use tracker immediately |
| Single owner for all items | Creates bottleneck; no accountability for individual tasks | Assign specific owner per item; each item has exactly one owner |
| No follow-up on action items | Items go stale; commitments missed; trust erodes | Follow cadence: high=daily, medium=weekly, low=monthly |
| Skipping privilege considerations for regulatory meetings | Inadvertent privilege waiver; disclosed protected communications | Always complete privilege section for regulatory/government meetings |

## Tool Reference

### `scripts/meeting_brief_generator.py`

Generate meeting briefing skeleton from parameters.

```
usage: meeting_brief_generator.py [-h] [--json]
                                   --type {deal-review,board,vendor,team-sync,
                                           client,regulatory,litigation,cross-functional}
                                   --title TITLE
                                   --date DATE
                                   [--participants PARTICIPANTS]
                                   [--agenda AGENDA]
                                   [--output OUTPUT]

options:
  -h, --help            Show help message and exit
  --json                Output in JSON format
  --type                Meeting type (determines sections included)
  --title               Meeting title
  --date                Meeting date (YYYY-MM-DD)
  --participants        JSON array of participants: [{"name","org","role","interests"}]
  --agenda              Comma-separated agenda items
  --output              Write briefing to file instead of stdout
```

### `scripts/action_item_tracker.py`

Manage action items with CRUD operations and status dashboard.

```
usage: action_item_tracker.py [-h] [--json]
                               {add,list,update,complete,dashboard} ...

commands:
  add         Add a new action item
  list        List action items with optional filters
  update      Update an existing action item
  complete    Mark an action item as complete
  dashboard   Show action item summary dashboard

add options:
  --title TITLE         Action item description (required)
  --owner OWNER         Responsible person (required)
  --priority {high,medium,low}  Priority level (required)
  --deadline DEADLINE   Due date YYYY-MM-DD (required)
  --meeting MEETING     Source meeting name
  --notes NOTES         Additional notes

list options:
  --filter-status {open,in-progress,complete,overdue,all}
  --filter-priority {high,medium,low,all}
  --filter-owner OWNER

update options:
  --id ID               Action item ID (required)
  --status {open,in-progress,complete}
  --priority {high,medium,low}
  --deadline DEADLINE
  --notes NOTES

complete options:
  --id ID               Action item ID (required)

dashboard options:
  (no additional options)
```

---

## legal-red-team

Source path: `references/legal/legal-red-team/SKILL.md`

> **⚠️ EXPERIMENTAL** — This skill is provided for educational and informational purposes only. It does NOT constitute legal advice. All responsibility for usage rests with the user. Consult qualified legal professionals before acting on any output.

# Legal Red Team

Production-ready adversarial verification framework for AI-generated legal content. Covers factual accuracy, citation validation, arithmetic checking, speculation detection, and distribution readiness scoring.

---

## Table of Contents

- [Verification Categories](#verification-categories)
- [Tools](#tools)
- [Six-Step Methodology](#six-step-methodology)
- [Severity Taxonomy](#severity-taxonomy)
- [Quality Score](#quality-score)
- [Known Hallucination Patterns](#known-hallucination-patterns)
- [Reference Guides](#reference-guides)
- [Workflows](#workflows)
- [Troubleshooting](#troubleshooting)
- [Success Criteria](#success-criteria)
- [Scope and Limitations](#scope-and-limitations)
- [Anti-Patterns](#anti-patterns)
- [Tool Reference](#tool-reference)

---

## Verification Categories

Every AI-generated legal document must be checked across 6 categories.

| # | Category | What to Check | Red Flags |
|---|----------|--------------|-----------|
| 1 | **Factual Accuracy** | Dates, references, numbers, entity names, timelines | Wrong effective dates, confused entity names, incorrect amounts |
| 2 | **Legal Authority Citations** | Primary/secondary sources, format, hierarchy, currency | Non-existent articles, wrong section numbers, outdated citations |
| 3 | **Arithmetic Validation** | Timelines, percentages, financial calculations, deadlines | Date math errors, percentage miscalculations, compounding mistakes |
| 4 | **Source Verification** | Verifiable claims, official sources, cross-referencing | Unverifiable assertions stated as fact, single-source claims |
| 5 | **Speculation Detection** | Opinion vs fact, uncertainty language, predictive claims | Predictions stated as certainty, guidance treated as binding law |
| 6 | **Disclaimer Adequacy** | Legal advice disclaimers, jurisdiction, date, professional consultation | Missing disclaimers, overly broad claims, no jurisdiction limits |

---

## Clarify First

Before the verification, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Claimed jurisdiction(s) and legal domain** — sets which official source each citation is checked against (EUR-Lex vs congress.gov vs legislation.gov.uk); a document mixing jurisdictions is itself a HIGH finding
- [ ] **Distribution context / audience** — internal note vs client-facing vs regulator-facing sets the quality-score gate (4/5) and how strict the disclaimer review must be
- [ ] **Whether live source verification is available** — Step 2 requires checking citations against official sources; if unavailable, every citation is flagged "unverifiable" rather than confirmed

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the report.

## Tools

### Legal Fact Checker

Scans legal text for verifiable claims and flags potential hallucination patterns.

```bash
# Check a legal document
python scripts/legal_fact_checker.py --input document.txt

# Check with JSON output
python scripts/legal_fact_checker.py --input memo.txt --json

# Check inline text
python scripts/legal_fact_checker.py --text "Under GDPR Article 83(5), fines can reach EUR 20 million..."

# Save verification report
python scripts/legal_fact_checker.py --input document.txt --output report.json
```

### Legal Quality Scorer

Scores legal document quality across all 6 verification categories.

```bash
# Score a document
python scripts/legal_quality_scorer.py --input document.txt

# Score with JSON output
python scripts/legal_quality_scorer.py --input document.txt --json

# Score with detailed breakdown
python scripts/legal_quality_scorer.py --input document.txt --verbose

# Save quality assessment
python scripts/legal_quality_scorer.py --input document.txt --output assessment.json
```

---

## Six-Step Methodology

### Step 1: Initial Review

Read the entire document with an adversarial mindset. For each claim, ask:

- Is this verifiable?
- Does this sound too specific to be generated without a source?
- Does this sound too confident for an uncertain area?

Mark every factual assertion, citation, date, number, and predictive statement.

### Step 2: Source Verification (ALWAYS Web Search)

For every verifiable claim, attempt to verify against official sources.

| Source Type | Verification Method | Examples |
|-------------|-------------------|---------|
| EU legislation | EUR-Lex official database | eur-lex.europa.eu |
| US federal law | congress.gov, govinfo.gov | Official code and statutes |
| US regulations | eCFR, Federal Register | ecfr.gov |
| UK legislation | legislation.gov.uk | Official statute database |
| Court decisions | Court databases, Westlaw, LexisNexis | Official reporters |
| Agency guidance | Agency official website | Direct download from .gov/.europa.eu |
| International treaties | UN Treaty Collection | treaties.un.org |

**Rule:** If a claim cannot be verified from an official source, flag it. Do not assume accuracy.

### Step 3: Arithmetic Verification

Check every calculation, date computation, and numerical claim.

| Check Type | Method |
|-----------|--------|
| Timeline calculations | Count days/months/years between stated dates |
| Percentage calculations | Recalculate from base figures |
| Financial computations | Verify arithmetic and compounding |
| Deadline calculations | Confirm against statutory text |
| Penalty ranges | Cross-check against statute |

### Step 4: Citation Validation

For every legal citation, verify:

| Element | Check |
|---------|-------|
| Source exists | Does the cited statute/article/section actually exist? |
| Content matches | Does the cited provision say what the document claims? |
| Citation format | Is the citation in correct format for the jurisdiction? |
| Currency | Is this the current, in-force version? |
| Hierarchy correct | Is the source characterized at the right authority level? |

### Step 5: Speculation Identification

Distinguish fact from opinion, certainty from prediction.

| Language Pattern | Classification | Action |
|-----------------|---------------|--------|
| "The law requires..." | Factual claim | Verify against statutory text |
| "Courts will likely..." | Speculation | Flag; add uncertainty qualifier |
| "It is recommended..." | Guidance | Verify source; clarify if binding |
| "Best practice suggests..." | Opinion | Label as opinion; cite source |
| "This means that..." | Interpretation | Flag if stated as fact without authority |
| "Companies must..." | Obligation claim | Verify statutory basis |

### Step 6: Disclaimer Review

Every AI-generated legal document must include:

| Required Element | Description |
|-----------------|-------------|
| Not legal advice | Clear statement that content is informational only |
| Jurisdiction limitations | Which jurisdictions are and are not covered |
| Date of preparation | When the content was prepared (law changes) |
| Professional consultation | Recommendation to consult qualified legal counsel |
| AI-generated disclosure | Statement that content was generated or assisted by AI |
| Accuracy limitations | Acknowledgment that verification is recommended |

---

## Severity Taxonomy

| Severity | Definition | Examples | Action |
|----------|-----------|---------|--------|
| **CRITICAL** | Factually wrong in a way that could cause legal harm | Wrong article number creating false obligation, incorrect penalty amount, non-existent legal requirement | Must fix before any distribution |
| **HIGH** | Materially misleading or unverifiable | Guidance stated as binding law, unverifiable timeline, confident but unsourced claim | Must fix or add prominent caveat |
| **MODERATE** | Imprecise or potentially confusing | Ambiguous language, minor date discrepancy, incomplete citation | Should fix; acceptable with caveat |
| **LOW** | Style or formatting issue | Citation format inconsistency, missing cross-reference, minor redundancy | Fix if time permits |

---

## Quality Score

| Score | Rating | Distribution Status | Criteria |
|-------|--------|-------------------|----------|
| **5/5** | Distribution Ready | Safe to distribute | Zero CRITICAL/HIGH issues; all citations verified; disclaimers complete |
| **4/5** | Minor Revisions | Safe after small fixes | Zero CRITICAL; 1-2 HIGH issues with clear fixes; most citations verified |
| **3/5** | Moderate Revisions | Needs work before distribution | Zero CRITICAL; 3+ HIGH issues; some unverified citations |
| **2/5** | Major Revisions | Not safe to distribute | 1+ CRITICAL issues; multiple HIGH issues; significant unverified content |
| **1/5** | Not Distribution Ready | Requires complete rework | Multiple CRITICAL issues; pervasive inaccuracies; unreliable throughout |

---

## Known Hallucination Patterns

AI models exhibit 5 recurring patterns when generating legal content.

| # | Pattern | Description | Detection Technique |
|---|---------|-------------|-------------------|
| 1 | **Plausible but wrong article numbers** | AI generates article/section numbers that sound correct but do not exist (e.g., "Article 42(5)" when only 42(1)-(4) exist) | Cross-reference every article number against official statute text |
| 2 | **Confident but incorrect dates** | Implementation timelines, effective dates, or deadlines stated with false confidence (off by weeks or months) | Verify every date against official timeline from the statute or implementing body |
| 3 | **Mixing guidance and legal requirements** | Treating non-binding recommendations as binding obligations (e.g., stating ENISA recommendations as NIS2 requirements) | Check whether cited source is binding legislation vs guidance; verify authority level |
| 4 | **Outdated legal references** | Citing superseded or repealed provisions without noting they are no longer in force | Verify currency of every cited provision; check for amendments and repeals |
| 5 | **Arithmetic errors in timeline calculations** | Miscounting days, months, or years between dates; wrong deadline calculations | Independently calculate every timeline; do not trust AI date math |

See `references/hallucination_patterns.md` for detailed examples and prevention strategies.

---

## Reference Guides

| Guide | Path | Description |
|-------|------|-------------|
| Verification Methodology | `references/verification_methodology.md` | Complete 6-step methodology with source hierarchy and citation formats |
| Hallucination Patterns | `references/hallucination_patterns.md` | 5 patterns with examples, detection, and prevention strategies |

---

## Workflows

### Workflow 1: Full Adversarial Review

1. Run `scripts/legal_fact_checker.py` on the document.
2. Review flagged items and verify each against official sources.
3. Run `scripts/legal_quality_scorer.py` for category scores.
4. For each CRITICAL/HIGH finding, document: the error, the correct information, and the source.
5. Produce a verification report with findings by severity.
6. Assign quality score and distribution readiness assessment.
7. **Validation:** Every verifiable claim checked, score assigned, recommendations provided.

### Workflow 2: Quick Citation Check

1. Run `scripts/legal_fact_checker.py` on the document.
2. Focus on citation extraction results.
3. Verify each extracted citation against official source.
4. Flag any citation that cannot be verified.
5. **Validation:** All citations verified or flagged.

### Workflow 3: Pre-Distribution Gate

1. Run `scripts/legal_quality_scorer.py` on the final document.
2. Review composite score.
3. If score < 4/5, document must not be distributed.
4. If score >= 4/5, verify CRITICAL count is zero.
5. Confirm all disclaimers are present and adequate.
6. **Validation:** Quality score >= 4/5, zero CRITICAL issues, disclaimers complete.

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Too many false positives | Regex patterns matching non-legal text | Narrow input to legal content only; use context-aware review |
| Cannot verify citation | Source not freely accessible | Note as "unverifiable from public sources"; do not assume correct |
| AI-generated text has no citations | Content is entirely unsourced | Flag entire document as unverified; score as 2/5 or lower |
| Hallucination pattern detected | AI confabulation of legal details | Replace with verified information from official source |
| Document mixes jurisdictions | No clear jurisdiction scope | Flag as HIGH; recommend splitting by jurisdiction |
| Quality score seems too high | Automated scoring has limits | Always supplement automated scoring with manual review |

---

## Success Criteria

| Criterion | Target |
|-----------|--------|
| Citations verified | 100% of legal citations checked against official sources |
| Hallucination patterns scanned | All 5 known patterns checked |
| Arithmetic validated | Every calculation independently verified |
| Severity assigned | Every finding classified CRITICAL/HIGH/MODERATE/LOW |
| Quality score calculated | Composite score with per-category breakdown |
| Disclaimers verified | All 6 required disclaimer elements present |
| Distribution decision | Clear go/no-go recommendation with rationale |

---

## Scope & Limitations

**In scope:** Verifying factual claims in legal text, validating citations, detecting hallucination patterns, scoring document quality, assessing distribution readiness.

**Out of scope:** Verifying legal conclusions or interpretations, assessing litigation strategy, replacing professional legal review, accessing paid legal databases (Westlaw, LexisNexis).

**Disclaimer:** This skill provides a structured adversarial verification methodology. It catches common AI errors but cannot guarantee complete accuracy. Professional legal review remains essential for high-stakes documents.

---

## Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
|-------------|-------------|-----------------|
| Trusting AI-generated citations without verification | AI models routinely generate plausible but non-existent legal citations; unverified citations in distributed documents create serious credibility and legal risk | Verify every citation against official sources; assume wrong until proven right |
| Relying solely on automated checking | Automated tools catch patterns but miss contextual errors, mischaracterizations, and subtle hallucinations | Use automated tools for first pass, then conduct manual review of all flagged items and a sample of unflagged items |
| Skipping the "adversarial mindset" | Confirmation bias leads reviewers to accept plausible-sounding content; legal text that "sounds right" may still be wrong | Actively seek to disprove every claim; assume error until verified; question every specific number, date, and citation |
| Distributing with score 3/5 or below | MODERATE and HIGH issues in distributed documents undermine credibility and may cause legal harm | Set a firm distribution threshold at 4/5; no exceptions without documented risk acceptance by a qualified reviewer |

---

## Tool Reference

| Tool | Input | Output | Use Case |
|------|-------|--------|----------|
| `legal_fact_checker.py` | Legal document text | Verification report with flagged claims, citations, dates, hallucination alerts | First-pass automated scanning of legal content |
| `legal_quality_scorer.py` | Legal document text | Quality score (1-5) with per-category breakdown and severity-classified findings | Pre-distribution quality gate |

---

## legal-risk-assessment

Source path: `references/legal/legal-risk-assessment/SKILL.md`

> **⚠️ EXPERIMENTAL** — This skill is provided for educational and informational purposes only. It does NOT constitute legal advice. All responsibility for usage rests with the user. Consult qualified legal professionals before acting on any output.

# Legal Risk Assessment

Structured legal risk assessment using a quantitative 5x5 Severity x Likelihood matrix. Scores risks, maintains registers, generates assessment memos, and guides escalation decisions.

---

## Table of Contents

- [Tools](#tools)
  - [Risk Scorer](#risk-scorer)
  - [Risk Report Generator](#risk-report-generator)
- [Reference Guides](#reference-guides)
- [Workflows](#workflows)
- [Troubleshooting](#troubleshooting)
- [Success Criteria](#success-criteria)
- [Scope & Limitations](#scope--limitations)
- [Anti-Patterns](#anti-patterns)
- [Tool Reference](#tool-reference)

---

## Clarify First

Before scoring the risk, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Severity and likelihood basis** — the worst-case exposure and the probability behind the 1-5 ratings; together they set the score and the GREEN/YELLOW/ORANGE/RED level
- [ ] **Risk category** — Contract, Regulatory, Litigation, IP, Data Privacy, Employment, Corporate — drives owner assignment and which escalation guide applies
- [ ] **Mandatory escalation triggers** — active litigation, government investigation, or criminal exposure override the score and force outside-counsel engagement

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the memo.

## Tools

### Risk Scorer

Calculates risk scores from severity and likelihood inputs, assigns color-coded risk levels, and generates summary statistics.

```bash
# Score a single risk
python scripts/risk_scorer.py --severity 4 --likelihood 3 \
  --category "Contract" --description "Vendor SLA non-compliance"

# JSON output
python scripts/risk_scorer.py --severity 4 --likelihood 3 \
  --category "Contract" --description "Vendor SLA breach" --json

# Batch mode from risk register file
python scripts/risk_scorer.py --input risks.json --json

# Batch mode with human-readable output
python scripts/risk_scorer.py --input risks.json
```

**Input JSON format (batch mode):**
```json
{
  "risks": [
    {"severity": 4, "likelihood": 3, "category": "Contract", "description": "Vendor SLA breach"},
    {"severity": 2, "likelihood": 2, "category": "Regulatory", "description": "Minor filing delay"}
  ]
}
```

**Output includes:**
- Risk score (Severity x Likelihood)
- Color-coded level (GREEN / YELLOW / ORANGE / RED)
- Recommended action (Accept / Monitor / Mitigate / Escalate)
- Batch summary statistics (count per level, average score)

---

### Risk Report Generator

Generates a formatted risk assessment memo in markdown from a risk register JSON file.

```bash
# Generate memo from risk register
python scripts/risk_report_generator.py --input risk_register.json

# Save to file
python scripts/risk_report_generator.py --input risk_register.json --output memo.md

# JSON metadata output
python scripts/risk_report_generator.py --input risk_register.json --json
```

**Report includes:**
- ASCII risk matrix visualization
- Risk distribution summary (counts and percentages per level)
- Top risks ranked by score
- Recommended actions per risk with owner assignments
- Monitoring plan suggestions
- Escalation recommendations

---

## Reference Guides

### Risk Framework
`references/risk_framework.md`

Complete Severity x Likelihood matrix reference:
- Severity levels 1-5 with financial exposure percentages
- Likelihood levels 1-5 with probability ranges
- Risk matrix visualization
- Risk classification (GREEN/YELLOW/ORANGE/RED) with actions
- Documentation standards for memos and register entries

### Escalation Guide
`references/escalation_guide.md`

When to engage outside counsel:
- Mandatory engagement triggers (litigation, investigation, criminal)
- Strongly recommended scenarios (novel issues, material exposure)
- Consider scenarios (complex disputes, employment, data incidents)
- Risk category definitions and contributing/mitigating factors

---

## Workflows

### Workflow 1: New Risk Assessment

```
Step 1: Identify risk category and description
        → Use references/risk_framework.md category definitions

Step 2: Score severity (1-5) and likelihood (1-5)
        → python scripts/risk_scorer.py --severity N --likelihood N \
          --category "Category" --description "Description"

Step 3: Review risk level and recommended action
        → GREEN: Accept and document
        → YELLOW: Assign owner and monitor
        → ORANGE: Escalate to senior counsel
        → RED: Immediate escalation, crisis management

Step 4: Determine outside counsel need
        → Consult references/escalation_guide.md

Step 5: Document in risk register
        → Add entry to register JSON file
```

### Workflow 2: Periodic Risk Register Review

```
Step 1: Load current risk register
        → python scripts/risk_scorer.py --input register.json

Step 2: Generate assessment memo
        → python scripts/risk_report_generator.py --input register.json --output memo.md

Step 3: Review top risks and distribution
        → Focus on ORANGE and RED risks first

Step 4: Update severity/likelihood for changed risks
        → Re-score and regenerate report

Step 5: Distribute memo to stakeholders
```

### Workflow 3: Escalation Decision

```
Step 1: Score the risk
        → python scripts/risk_scorer.py --severity N --likelihood N \
          --category "Category" --description "Description"

Step 2: Check escalation triggers
        → Mandatory: active litigation, government investigation, criminal exposure
        → Strongly Recommended: novel issues, jurisdictional complexity, material exposure
        → Consider: complex disputes, employment matters, data incidents

Step 3: Document escalation rationale
        → Include risk score, level, and specific trigger in memo

Step 4: Select outside counsel if needed
        → See references/escalation_guide.md criteria
```

---

## Troubleshooting

| Problem | Possible Cause | Resolution |
|---------|---------------|------------|
| Risk score seems too low for a serious matter | Severity or likelihood underestimated; qualitative factors not captured | Review severity descriptions in risk_framework.md; consider worst-case financial exposure; add contributing factors to description |
| Multiple risks in same category but different scores | Risks have different severity/likelihood combinations | This is expected; each risk is independent; review category-level trends in report |
| Batch mode fails on input file | Malformed JSON or missing required fields | Verify JSON structure matches expected format; ensure each risk has severity, likelihood, category, description |
| Report generator produces empty matrix | No risks in input file or all risks have invalid scores | Check that input JSON contains valid risks with severity 1-5 and likelihood 1-5 |
| Escalation guide suggests outside counsel but budget is constrained | Risk score indicates material exposure | Document the budget constraint and residual risk acceptance; consider limited-scope engagement |
| Risk register grows unwieldy | Risks not being closed or consolidated | Archive resolved risks; consolidate related risks; review register quarterly |

---

## Success Criteria

- **All identified legal risks scored and documented** -- every risk has severity, likelihood, category, description, and recommended action in the register
- **Risk distribution reviewed quarterly** -- memo generated and distributed to stakeholders with trend analysis
- **ORANGE and RED risks have assigned owners and mitigation plans** -- no high-severity risk without accountability
- **Escalation decisions documented with rationale** -- outside counsel engagement triggers clearly recorded
- **Risk register maintained as living document** -- risks updated, resolved, or archived as status changes

---

## Scope & Limitations

**In Scope:**
- Quantitative risk scoring using 5x5 Severity x Likelihood matrix
- Risk register management and batch processing
- Risk assessment memo generation with matrix visualization
- Escalation guidance for outside counsel engagement
- Risk categorization (Contract, Regulatory, Litigation, IP, Data Privacy, Employment, Corporate)

**Out of Scope:**
- Legal advice on specific risk mitigation strategies -- consult legal counsel
- Insurance coverage analysis or actuarial calculations
- Regulatory filing or submission preparation
- Contract drafting or review
- Litigation strategy or case management

---

## Anti-Patterns

- **Scoring by committee consensus without criteria** -- use the defined severity and likelihood scales consistently; do not negotiate scores to make stakeholders comfortable; a risk scored as 4 severity should match the framework definition
- **Treating the risk register as a one-time exercise** -- risk registers are living documents; risks change as circumstances evolve; schedule quarterly reviews and update scores accordingly
- **Escalating everything to outside counsel** -- the escalation guide defines specific triggers; not every YELLOW risk needs external counsel; over-escalation wastes budget and creates dependency
- **Ignoring GREEN risks entirely** -- GREEN risks still require documentation and periodic monitoring; a GREEN risk can escalate to YELLOW or ORANGE if circumstances change
- **Using risk scores as the sole decision factor** -- scores are inputs to judgment, not substitutes; qualitative factors like reputational impact or strategic importance may warrant action beyond what the score suggests

---

## Tool Reference

### risk_scorer.py

Calculates risk scores and assigns color-coded risk levels with recommended actions.

| Flag | Required | Description |
|------|----------|-------------|
| `--severity <1-5>` | Yes (single mode) | Severity rating: 1=Negligible, 2=Minor, 3=Moderate, 4=Major, 5=Critical |
| `--likelihood <1-5>` | Yes (single mode) | Likelihood rating: 1=Remote, 2=Unlikely, 3=Possible, 4=Likely, 5=Almost Certain |
| `--category <text>` | Yes (single mode) | Risk category: Contract, Regulatory, Litigation, IP, Data Privacy, Employment, Corporate |
| `--description <text>` | Yes (single mode) | Risk description |
| `--input <file>` | Yes (batch mode) | Path to JSON file containing multiple risks |
| `--json` | No | Output results in JSON format |

### risk_report_generator.py

Generates formatted risk assessment memo from a risk register JSON file.

| Flag | Required | Description |
|------|----------|-------------|
| `--input <file>` | Yes | Path to risk register JSON file |
| `--output <file>` | No | Save memo to specified file path (markdown format) |
| `--json` | No | Output report metadata in JSON format |

---

## mediation-analysis

Source path: `references/legal/mediation-analysis/SKILL.md`

> **⚠️ EXPERIMENTAL** — This skill is provided for educational and informational purposes only. It does NOT constitute legal advice. All responsibility for usage rests with the user. Consult qualified legal professionals before acting on any output.

# Mediation Analysis

Production-ready framework for analyzing disputes and preparing mediation strategy. Covers the full cycle from dispute assessment through settlement calculation, interest mapping, and mediation readiness.

---

## Table of Contents

- [Operating Modes](#operating-modes)
- [Tools](#tools)
- [Core Analysis Framework](#core-analysis-framework)
- [Underlying Interests Analysis](#underlying-interests-analysis)
- [Legal Analysis](#legal-analysis)
- [Settlement Strategy](#settlement-strategy)
- [Reference Guides](#reference-guides)
- [Workflows](#workflows)
- [Troubleshooting](#troubleshooting)
- [Success Criteria](#success-criteria)
- [Scope and Limitations](#scope-and-limitations)
- [Anti-Patterns](#anti-patterns)
- [Tool Reference](#tool-reference)

---

## Clarify First

Before the analysis, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which party you represent** — frames the positions, interests, and BATNA/WATNA from your side; a neutral framing produces a different analysis
- [ ] **Claimed amount, each side's litigation costs, and success probability** — these are the settlement-calculator inputs; BATNA, WATNA, and ZOPA all derive from them
- [ ] **Whether there is an ongoing relationship** — determines whether the analysis weights an interest-based or package-deal scenario over a straightforward monetary compromise

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the analysis.

## Operating Modes

### Mode 1: Guided Information Gathering

Use when starting from scratch without structured materials.

**Step 1 -- Dispute Overview:**
- Who are the parties? (names, roles, relationship)
- What is the dispute about? (summary in neutral terms)
- When did the dispute arise? (timeline of key events)
- What is the current status? (pre-litigation, filed, discovery, trial date)

**Step 2 -- Positions and Claims:**
- What does each party want? (stated positions)
- What are the claimed amounts? (monetary and non-monetary)
- What evidence supports each side?
- What are the weaknesses in each side's case?

**Step 3 -- Context and Constraints:**
- Is there an ongoing relationship? (employment, commercial, family)
- Are there power imbalances? (resources, information, leverage)
- Are there time pressures? (deadlines, statute of limitations)
- What has been tried so far? (direct negotiation, prior mediation)

### Mode 2: Direct Analysis

Use when dispute materials are already available (pleadings, correspondence, statements).

Provide the materials and specify which analysis sections are needed. The framework will extract the structured analysis from the raw materials.

---

## Tools

### Dispute Analyzer

Extracts structured dispute data from text descriptions.

```bash
# Analyze a dispute description
python scripts/dispute_analyzer.py --input dispute.txt

# Analyze with JSON output
python scripts/dispute_analyzer.py --input dispute.txt --json

# Analyze inline text
python scripts/dispute_analyzer.py --text "Party A claims breach of contract for failure to deliver..."

# Save structured analysis
python scripts/dispute_analyzer.py --input dispute.txt --output analysis.json
```

### Settlement Calculator

Calculates BATNA, WATNA, ZOPA, and settlement scenarios.

```bash
# Calculate from parameters file
python scripts/settlement_calculator.py --input params.json

# Calculate with JSON output
python scripts/settlement_calculator.py --input params.json --json

# Quick inline calculation
python scripts/settlement_calculator.py \
  --claimed 500000 \
  --litigation-cost-a 80000 \
  --litigation-cost-b 120000 \
  --probability 0.65 \
  --time-to-trial 18

# Save settlement analysis
python scripts/settlement_calculator.py --input params.json --output settlement.json
```

---

## Core Analysis Framework

The analysis produces 6 sections. Each section builds on the previous.

### Section 1: Case Summary

Write a neutral chronological summary covering:

| Element | Description |
|---------|-------------|
| Parties | Names, roles, and relationship |
| Timeline | Key events in chronological order |
| Dispute trigger | The event that escalated to a dispute |
| Current status | Procedural posture (pre-suit, filed, discovery) |
| Prior resolution attempts | What has been tried |

**Neutrality check:** The summary should be acceptable to both parties. Avoid characterizing conduct as "wrong" or "unreasonable."

### Section 2: Issues in Dispute

For each issue, document:

| Component | Description |
|-----------|-------------|
| Issue statement | Neutral framing of the disputed question |
| Party A position | What Party A asserts and why |
| Party B position | What Party B asserts and why |
| Key evidence | Evidence supporting each side |
| Strength assessment | Strong / Moderate / Weak for each side |
| Legal basis | Applicable law, contract terms, or principles |

### Section 3: Underlying Interests Analysis

Move beyond positions to interests. See detailed section below.

### Section 4: Legal Analysis

Per-issue assessment of legal merits. See detailed section below.

### Section 5: Mediation Strategy and Settlement Directions

BATNA/WATNA, ZOPA, and settlement scenarios. See detailed section below.

### Section 6: Mediation Readiness Checklist

| Item | Status | Notes |
|------|--------|-------|
| All parties agreed to mediate | | |
| Mediator selected and confirmed | | |
| Decision-makers attending or available | | |
| Key documents exchanged or available | | |
| Opening statement prepared | | |
| Settlement authority established | | |
| BATNA/WATNA analysis complete | | |
| Non-monetary interests identified | | |
| Creative options brainstormed | | |
| Authority limits clarified with client | | |

---

## Underlying Interests Analysis

Interests are the needs, concerns, and motivations behind stated positions.

### Interest Categories

| Category | Description | Examples |
|----------|-------------|---------|
| Legal | Rights, entitlements, obligations | Contract rights, statutory claims, precedent |
| Commercial | Business and financial concerns | Revenue, costs, market position, reputation |
| Relational | Relationship preservation | Ongoing business, employment, community ties |
| Emotional | Personal feelings and values | Fairness, respect, acknowledgment, vindication |
| Procedural | How the process unfolds | Speed, privacy, control, voice, transparency |

### Interest Mapping

For each party, map interests by category and priority:

| Party | Interest | Category | Priority | Compatible? |
|-------|----------|----------|----------|-------------|
| A | Preserve business reputation | Commercial | High | Yes -- shared |
| A | Recover financial losses | Legal/Commercial | High | Negotiable |
| B | Avoid setting precedent | Legal | High | Negotiable |
| B | Maintain relationship with A | Relational | Medium | Yes -- shared |

### Shared and Compatible Interests

Identify interests both parties share or that do not conflict:

- **Shared:** Both want confidentiality, speed, cost control
- **Compatible:** A wants acknowledgment, B wants no public admission -- private acknowledgment possible
- **Conflicting:** A wants maximum payment, B wants minimum payment -- negotiation zone needed

### Barriers to Resolution

| Barrier | Description | Mitigation |
|---------|-------------|------------|
| Reactive devaluation | Offers seem less attractive because they come from the other side | Have mediator propose options |
| Anchoring | First number distorts all subsequent negotiation | Use objective criteria to anchor |
| Loss aversion | Parties feel losses more than equivalent gains | Frame in terms of gains vs current state |
| Principal-agent | Party's representative may have different interests | Ensure decision-makers participate |
| Information asymmetry | One party knows more than the other | Structured disclosure through mediator |

---

## Legal Analysis

For each disputed issue, assess:

| Factor | Assessment |
|--------|-----------|
| Applicable law | Statute, regulation, contract term, or common law |
| Strength of claim | Strong (>70%) / Moderate (40-70%) / Weak (<40%) |
| Key uncertainties | Factual disputes, legal ambiguities, evidentiary gaps |
| Likely trial outcome | Best case, worst case, most likely |
| Damages range | If claimant prevails, likely award range |
| Costs to trial | Attorney fees, expert fees, opportunity costs per party |
| Time to resolution | Months/years to trial and potential appeal |

---

## Settlement Strategy

### BATNA / WATNA Analysis

| Metric | Party A | Party B |
|--------|---------|---------|
| Best Alternative (BATNA) | Win at trial, recover full claim + costs | Win at trial, pay nothing + recover costs |
| Worst Alternative (WATNA) | Lose at trial, recover nothing, pay own costs | Lose at trial, pay full claim + costs |
| Most Likely Alternative | Partial recovery minus litigation costs | Partial liability minus litigation costs |
| Litigation cost estimate | $X over Y months | $X over Y months |
| Net expected value | (Probability x Award) - Litigation costs | -(Probability x Award) - Litigation costs |

### ZOPA Identification

The Zone of Possible Agreement exists when Party A's minimum acceptable settlement is less than Party B's maximum they would pay.

```
Party A minimum = Expected trial value - litigation costs - risk discount
Party B maximum = Expected trial liability + litigation costs + risk premium

ZOPA exists when: A minimum < B maximum
ZOPA range: [A minimum ... B maximum]
```

### Settlement Scenarios

| Scenario | Description | When Appropriate |
|----------|-------------|-----------------|
| **Straightforward Compromise** | Split the difference on monetary claims | Simple disputes with clear monetary value |
| **Interest-Based Solution** | Address underlying interests beyond money | Ongoing relationships, non-monetary concerns |
| **Package Deal** | Bundle monetary and non-monetary elements | Complex disputes with multiple issues and interests |

---

## Reference Guides

| Guide | Path | Description |
|-------|------|-------------|
| Mediation Process | `references/mediation_process.md` | 12 stages of mediation with roles and techniques |
| Negotiation Concepts | `references/negotiation_concepts.md` | BATNA, WATNA, ZOPA, interest-based negotiation, barriers |

---

## Workflows

### Workflow 1: Full Mediation Preparation

1. Gather dispute information (Mode 1 or Mode 2).
2. Run `scripts/dispute_analyzer.py` on available materials.
3. Complete the 6-section Core Analysis Framework.
4. Run `scripts/settlement_calculator.py` with dispute parameters.
5. Prepare opening statement and settlement proposals.
6. Complete Mediation Readiness Checklist.
7. **Validation:** All 6 sections complete, BATNA/ZOPA calculated, proposals prepared.

### Workflow 2: Quick Settlement Range

1. Identify claimed amount, litigation costs, and success probability.
2. Run `scripts/settlement_calculator.py` with parameters.
3. Review ZOPA range and three scenarios.
4. Adjust parameters for sensitivity analysis.
5. **Validation:** Settlement range established with supporting rationale.

### Workflow 3: Multi-Party Mediation

1. Map all parties and their relationships.
2. Run dispute analysis for each bilateral relationship.
3. Identify coalition possibilities and shared interests.
4. Calculate settlement ranges for each party pair.
5. Design package deals that address all parties' core interests.
6. **Validation:** Each party pair analyzed, coalitions mapped, package options developed.

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| ZOPA appears negative | Parties' expectations unrealistic or litigation costs understated | Reality-test each party's BATNA; increase cost estimates |
| Cannot identify interests | Parties stuck on positions | Use "why" questions; explore consequences of winning/losing |
| Power imbalance distorting negotiation | Resource or information asymmetry | Recommend process adjustments; structured information sharing |
| Decision-maker absent | Representative lacks authority | Adjourn until decision-maker available; confirm authority in advance |
| Emotional barriers dominant | Unresolved relational issues | Address emotional interests first; consider apology or acknowledgment |
| Multi-party complexity | Too many bilateral dynamics | Break into sub-mediations; use single-text procedure |

---

## Success Criteria

| Criterion | Target |
|-----------|--------|
| Dispute issues identified | All contested issues listed with positions |
| Interests mapped | At least 3 interests per party, categorized |
| Legal strength assessed | Each issue rated with rationale |
| BATNA/WATNA calculated | Both parties' alternatives quantified |
| ZOPA identified | Settlement range established or confirmed negative |
| Settlement scenarios | Minimum 3 scenarios with rationale |
| Readiness checklist | All items addressed before mediation |

---

## Scope & Limitations

**In scope:** Dispute analysis, interest mapping, settlement calculation, mediation preparation, negotiation strategy.

**Out of scope:** Acting as mediator, providing legal advice, predicting judicial outcomes with certainty, drafting settlement agreements, representing parties.

**Disclaimer:** This skill provides an analytical framework for mediation preparation. It does not constitute legal advice. Settlement calculations are estimates based on inputs provided and should be validated by qualified counsel.

---

## Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
|-------------|-------------|-----------------|
| Positional bargaining only | Focuses on what parties demand, ignoring why they want it; leaves value on the table | Map interests first, then generate options that satisfy underlying needs |
| Ignoring litigation costs in settlement math | Parties anchor on the claim amount without factoring in costs to pursue it; produces unrealistic expectations | Always include full litigation costs (fees, time, opportunity cost) in BATNA calculation |
| Assuming equal bargaining power | Power imbalances distort negotiation; weaker party may accept unfavorable terms under pressure | Identify imbalances early; recommend process protections (separate caucuses, information sharing, independent advice) |
| Skipping emotional interests | Emotional needs (respect, acknowledgment, fairness) often drive dispute more than money; ignoring them produces impasse | Include emotional and relational interests in the analysis alongside legal and commercial interests |

---

## Tool Reference

| Tool | Input | Output | Use Case |
|------|-------|--------|----------|
| `dispute_analyzer.py` | Dispute description text | Structured analysis with parties, issues, interests, timeline | First-pass dispute structuring |
| `settlement_calculator.py` | Dispute parameters (amounts, costs, probability) | BATNA/WATNA, ZOPA, 3 settlement scenarios | Quantitative settlement range analysis |

---

## nda-review

Source path: `references/legal/nda-review/SKILL.md`

> **⚠️ EXPERIMENTAL** — This skill is provided for educational and informational purposes only. It does NOT constitute legal advice. All responsibility for usage rests with the user. Consult qualified legal professionals before acting on any output.

# NDA Review

Deep clause-by-clause NDA review tool that analyzes agreements from Recipient or Discloser perspective. Produces structured issue logs with preferred redlines, fallback positions, rationale, owners, and deadlines.

---

## Table of Contents

- [Tools](#tools)
  - [NDA Clause Reviewer](#nda-clause-reviewer)
- [Reference Guides](#reference-guides)
- [Workflows](#workflows)
  - [Full NDA Review](#full-nda-review)
  - [Perspective-Based Review](#perspective-based-review)
- [Immediate Red Flags](#immediate-red-flags)
- [Review Checklists](#review-checklists)
- [Variation Callouts](#variation-callouts)
- [Risk Rating Guide](#risk-rating-guide)
- [Common Pitfalls](#common-pitfalls)
- [Troubleshooting](#troubleshooting)
- [Success Criteria](#success-criteria)
- [Scope & Limitations](#scope--limitations)
- [Anti-Patterns](#anti-patterns)
- [Tool Reference](#tool-reference)

---

## Clarify First

Before reviewing the NDA, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Your perspective: Recipient or Discloser** — flips every risk rating and the direction of each redline (the core `--perspective` input)
- [ ] **Deal context** — M&A, employment, VC/fundraising, or standard commercial — triggers the variation callouts (standstill, invention assignment, portfolio conflicts)
- [ ] **What you cannot accept** — non-compete, IP grant, perpetual term — sets which of the 7 immediate red flags force escalation vs negotiation

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the issue log.

## Tools

### NDA Clause Reviewer

Performs deep analysis of NDA text, extracting and classifying each clause against best practices. Detects overbroad definitions, missing carveouts, problematic residuals, IP grants, indemnification, and audit rights.

```bash
# Review from recipient perspective (default)
python scripts/nda_clause_reviewer.py nda_draft.txt

# Review from discloser perspective
python scripts/nda_clause_reviewer.py nda_draft.txt --perspective discloser

# JSON output for integration
python scripts/nda_clause_reviewer.py nda_draft.txt --json

# Save issue log
python scripts/nda_clause_reviewer.py nda_draft.txt --output issues.json --json
```

**What it produces:**
- Clause-by-clause issue log with H/M/L risk ratings
- Preferred redline for each issue
- Fallback position if preferred is rejected
- Rationale for each recommendation
- Owner assignment (legal, business, executive)
- Deadline category (pre-signing, 30-day, 90-day)

---

## Reference Guides

### NDA Clause Reference
`references/nda_clause_reference.md`

Five deep reference modules:
- Duration & Scope (term, survival, scope limitations)
- Key Clauses (definition, purpose, permitted use, marking)
- Party Obligations (standard of care, use restriction, disclosure limits)
- Remedies & Liability (injunctive relief, damages, indemnification)
- Standard Exceptions (public knowledge, prior possession, independent development, third-party receipt, legal compulsion)

### NDA Review Templates
`references/nda_review_templates.md`

Output templates and worked examples:
- Executive Summary format
- Clause-by-clause Issue Log table format
- Ownership and timing defaults by topic category
- Worked examples for social media endorsement and group licensing scenarios

---

## Workflows

### Full NDA Review

1. **Triage first** -- Run `nda-triage` skill for quick GREEN/YELLOW/RED classification
2. **Deep review** -- Run `nda_clause_reviewer.py` with appropriate `--perspective`
3. **Review issue log** -- Address HIGH-risk items first, then MEDIUM, then LOW
4. **Prepare redlines** -- Use preferred positions; prepare fallbacks
5. **Assign owners** -- Legal owns clause language; business owns commercial terms
6. **Set deadlines** -- Pre-signing items before next meeting; post-signing items within 30-90 days
7. **Negotiate** -- Present redlines; use fallbacks as needed
8. **Final review** -- Verify all issues resolved before execution

### Perspective-Based Review

| Perspective | Focus Areas | Key Concerns |
|-------------|-------------|--------------|
| Recipient | Scope of obligations, carveouts, residuals, return/destruction | Protecting freedom to operate; avoiding contamination claims |
| Discloser | Definition breadth, remedies, duration, permitted disclosures | Maximizing protection; ensuring adequate enforcement |

---

## Immediate Red Flags

Stop review and escalate if any of these 7 red flags are present.

| # | Red Flag | Why It Matters | Escalation |
|---|----------|---------------|------------|
| 1 | Non-compete clause | Restricts business operations; requires separate consideration and analysis | Senior counsel immediately |
| 2 | IP assignment or license grant | Transfers rights beyond confidentiality scope | Senior counsel immediately |
| 3 | Non-solicitation of employees or customers | Employment law implications; may be unenforceable | Senior counsel within 24 hours |
| 4 | Missing 3+ standard carveouts | Fundamentally deficient NDA | Counsel review before any response |
| 5 | Liquidated damages or penalty clause | Transforms NDA into penalty contract | Senior counsel within 24 hours |
| 6 | Perpetual obligations with no termination | Indefinite legal burden with no exit | Counsel review within 48 hours |
| 7 | Exclusivity provision | Limits engagement with other parties | Business leadership + counsel |

---

## Review Checklists

### Recipient Checklist (8 Topics)

| # | Topic | Key Questions | Risk if Missing |
|---|-------|---------------|-----------------|
| 1 | Definition Scope | Is confidential info bounded? Is there a marking requirement? | Overbroad definition traps all shared information |
| 2 | Standard Carveouts | Are all 5 carveouts present and properly drafted? | Missing carveouts restrict legitimate business activities |
| 3 | Permitted Use | Is use restricted to stated purpose? Can we share with advisors? | Overly restrictive use limits may impede evaluation |
| 4 | Residuals | Is there a residuals clause? Is it narrow or broad? | Broad residuals clause benefits; narrow or absent protects discloser |
| 5 | Return/Destruction | Return or destroy option? Retention exception for backups? | No retention exception is impractical for electronic data |
| 6 | Term & Survival | Reasonable term? Reasonable survival period? Termination right? | Perpetual obligations are burdensome |
| 7 | Remedies | Injunctive relief only? Or liquidated damages/indemnification? | Excessive remedies shift risk disproportionately |
| 8 | Problematic Provisions | Non-compete? Non-solicitation? IP assignment? Audit rights? | These provisions have no place in a standard NDA |

### Discloser Checklist (5 Topics)

| # | Topic | Key Questions | Risk if Missing |
|---|-------|---------------|-----------------|
| 1 | Definition Breadth | Does definition cover all information we will share? All forms? | Gaps in definition leave information unprotected |
| 2 | Obligation Strength | Standard of care adequate? Written agreements from recipients? | Weak obligations increase risk of unauthorized disclosure |
| 3 | Remedies | Injunctive relief available? Is it meaningful in this jurisdiction? | Without adequate remedies, NDA is unenforceable in practice |
| 4 | Duration | Is the term long enough? Does survival cover our exposure window? | Short terms may expire before information loses value |
| 5 | Recipient Limits | Who can receive? Is need-to-know enforced? Downstream binding? | Unrestricted sharing exposes information to unauthorized parties |

---

## Variation Callouts

Different NDA contexts require different review emphasis.

### M&A Context

| Additional Concern | Reason | Recommended Position |
|-------------------|--------|---------------------|
| Standstill provision | Prevents hostile acquisition moves during due diligence | Accept if mutual and time-limited (12-18 months) |
| Non-solicitation of employees | Standard in M&A NDAs | Accept if limited to key employees for 12 months |
| Broader definition | M&A requires extensive information sharing | Accept broader definition with strong carveouts |
| Longer survival | Sensitive strategic information shared | 3-5 year survival is appropriate |
| Residuals clause sensitivity | Competitive intelligence at stake | Resist residuals clause or narrow significantly |

### Employment Context

| Additional Concern | Reason | Recommended Position |
|-------------------|--------|---------------------|
| Invention assignment | Employer IP ownership | Separate from NDA; use invention assignment agreement |
| Post-employment obligations | Obligations after employment ends | Limit survival to 2 years; ensure enforceability |
| Scope of work product | What the employee creates | Define in employment agreement, not NDA |
| Non-compete enforceability | Varies by jurisdiction | Review local law before including; may be void |

### VC / Fundraising Context

| Additional Concern | Reason | Recommended Position |
|-------------------|--------|---------------------|
| Investor portfolio conflicts | VC may have portfolio companies in same space | Include portfolio company exclusion or conflict provision |
| Residuals clause | VCs see many similar pitches | Resist; protect trade secrets and specific data |
| Term limitations | VCs want short obligations | 2-3 year term acceptable; ensure adequate survival |
| Definition scope | Founders want maximum protection | Balance with investor need for portfolio flexibility |

---

## Risk Rating Guide

| Rating | Criteria | Action | Timeline |
|--------|----------|--------|----------|
| HIGH (H) | Could result in material legal or financial exposure; deal-breaker potential | Must resolve before signing | Pre-signing |
| MEDIUM (M) | Creates meaningful risk but manageable; strong preference to resolve | Should resolve; accept with documented risk if necessary | Within 30 days |
| LOW (L) | Minor preference; improves agreement but not material | Nice to resolve; concede if needed for higher-priority wins | Within 90 days |

### Risk Rating by Issue Type

| Issue Type | Typical Rating | Escalation |
|-----------|---------------|------------|
| Missing carveout (any) | M-H | Counsel |
| Overbroad definition | M | Counsel |
| Non-compete/non-solicitation | H | Senior counsel |
| IP assignment | H | Senior counsel |
| Residuals clause (broad) | M | Counsel |
| Perpetual obligations | M-H | Counsel |
| No return/destruction | M | Counsel |
| Liquidated damages | H | Senior counsel |
| Missing governing law | L-M | Counsel |
| One-sided obligations | M | Counsel |

---

## Common Pitfalls

| Pitfall | Impact | Fix |
|---------|--------|-----|
| Reviewing without knowing your perspective | Recipient and discloser have opposing interests on many clauses | Always set `--perspective` flag; review with clear role in mind |
| Treating the NDA as "just a formality" | Missing problematic provisions that create real obligations | Run full clause review on every NDA, regardless of perceived importance |
| Negotiating clause-by-clause in document order | Wastes time on early low-priority clauses; may not reach critical issues | Prioritize by risk rating; address H items first |
| Accepting "standard" NDAs without review | Every organization's "standard" is different; one party's standard favors that party | No NDA is truly standard; always review |
| Ignoring context (M&A, employment, VC) | Standard NDA review misses context-specific risks | Use variation callouts for specialized contexts |
| Not preparing fallback positions | Stuck when counterparty rejects preferred redline | Prepare preferred + fallback for every H and M item |
| Signing before resolving H-rated issues | Creates material legal exposure | Require all H items resolved or executive sign-off |

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| All issues rated LOW | NDA is genuinely well-drafted, or text extraction lost key sections | Manually verify critical sections (definition, carveouts, remedies) are in the input file |
| Perspective flag has no effect | Tool adjusts weighting, not detection; same issues found either way | Perspective changes risk ratings and recommendations, not issue detection |
| Too many issues generated | NDA is non-standard or poorly drafted | Focus on H-rated issues first; use the issue log as a negotiation roadmap |
| Script misses embedded provisions | Non-compete or IP clause hidden in definitions or general provisions | Search full document for "compete", "assign", "license", "solicit" manually |
| Output format does not match template | Tool outputs structured data, not final deliverable | Use `references/nda_review_templates.md` to format the output for stakeholders |

---

## Success Criteria

- **Complete clause-by-clause review in under 15 minutes:** Automated analysis replaces 1-2 hours of manual review.
- **Zero missed HIGH-risk issues:** Every non-compete, IP assignment, and missing carveout is identified.
- **Actionable redlines for every H and M issue:** Each issue has preferred position, fallback, and rationale.
- **Clear ownership assignment:** Every issue has a designated owner (legal, business, executive).
- **Perspective-appropriate recommendations:** Recipient and discloser reviews produce different risk weightings.
- **Context-aware review:** M&A, employment, and VC variations are flagged when relevant.

---

## Scope & Limitations

**Covers:**
- Deep clause-by-clause NDA analysis with pattern matching and risk classification
- Perspective-based review (Recipient vs. Discloser)
- Issue log generation with redlines, fallbacks, rationale, owners, and deadlines
- Detection of 7 immediate red flags for triage
- Context variation awareness (M&A, Employment, VC)

**Does NOT cover:**
- **Legal advice** -- this tool supports review, it does not replace qualified legal counsel
- **Rapid triage** -- use `nda-triage` for quick GREEN/YELLOW/RED screening
- **Contract types beyond NDAs** -- use `contract-review` for general commercial agreements
- **Jurisdiction-specific enforceability analysis** -- requires local counsel assessment
- **Non-English NDAs** -- pattern matching is English-language only

---

## Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
|-------------|-------------|-----------------|
| Running deep review without triage first | Wastes time on detailed analysis of NDAs that should be rejected outright (RED triage) | Always run `nda-triage` first; only proceed to deep review for YELLOW or GREEN-with-complexity |
| Using Recipient perspective for both sides | Recipient perspective minimizes obligations and maximizes carveouts, which is wrong if you are the discloser | Always set the correct `--perspective` flag based on your role |
| Accepting all LOW-rated issues without review | Some LOW issues are low-risk individually but create cumulative exposure when combined | Review the full issue log for interaction effects; multiple LOW issues in the same area may compound to MEDIUM |
| Skipping the variation callouts for specialized contexts | Standard NDA review misses M&A standstill provisions, employment invention assignment, VC portfolio conflicts | Check the variation callouts section for your specific deal context |

---

## Tool Reference

### nda_clause_reviewer.py

**Purpose:** Performs deep clause-by-clause NDA analysis. Detects overbroad definitions, missing carveouts, problematic provisions, and generates an issue log with redlines, fallbacks, rationale, owners, and deadlines.

**Usage:**

```bash
python scripts/nda_clause_reviewer.py <nda_file> [--perspective PERSPECTIVE] [--json] [--output FILE]
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `nda_file` | *(positional)* | | Path to NDA text file (.txt or .md) |
| `--perspective` | `-p` | `recipient` | Review perspective: `recipient` or `discloser` |
| `--json` | | off | Output in JSON format |
| `--output` | `-o` | *(stdout)* | Write output to file |

**Example Output (JSON):**

```json
{
  "file": "vendor_nda.txt",
  "perspective": "recipient",
  "issues": [
    {
      "id": 1,
      "clause": "Definition of Confidential Information",
      "issue": "Overbroad definition with no marking requirement",
      "risk": "H",
      "preferred_redline": "Narrow to information marked Confidential or confirmed in writing within 10 days",
      "fallback": "Add marking requirement for written; 10-day confirmation for oral",
      "rationale": "Overbroad definition traps all shared information as confidential",
      "owner": "legal",
      "deadline": "pre-signing"
    }
  ],
  "summary": {
    "total_issues": 5,
    "high": 2,
    "medium": 2,
    "low": 1
  }
}
```

**Example Output (Text):**

```
NDA CLAUSE REVIEW — ISSUE LOG
==============================
File: vendor_nda.txt
Perspective: Recipient
Issues Found: 5 (H:2 M:2 L:1)

 #  Risk  Clause                           Issue
 1  H     Definition of Confidential Info  Overbroad definition; no marking requirement
        Preferred: Narrow to marked information with 10-day oral confirmation
        Fallback:  Add marking requirement for written; 10-day confirmation for oral
        Rationale: Overbroad definition traps all shared information
        Owner: legal | Deadline: pre-signing

 2  H     Standard Carveouts               Missing independent development carveout
        Preferred: Add standard independent development exception
        Fallback:  Add with documentary evidence requirement
        Rationale: Missing carveout blocks internal R&D
        Owner: legal | Deadline: pre-signing
```

---

## nda-triage

Source path: `references/legal/nda-triage/SKILL.md`

> **⚠️ EXPERIMENTAL** — This skill is provided for educational and informational purposes only. It does NOT constitute legal advice. All responsibility for usage rests with the user. Consult qualified legal professionals before acting on any output.

# NDA Triage

Rapid NDA screening tool that classifies incoming NDAs as GREEN (standard approval), YELLOW (counsel review), or RED (significant issues). Uses a 10-point screening checklist to evaluate agreement structure, definitions, obligations, carveouts, and problematic provisions.

---

## Table of Contents

- [Tools](#tools)
  - [NDA Screener](#nda-screener)
  - [NDA Checklist](#nda-checklist)
- [Reference Guides](#reference-guides)
- [Workflows](#workflows)
  - [Standard NDA Triage](#standard-nda-triage)
  - [Bulk NDA Processing](#bulk-nda-processing)
- [Routing Recommendations](#routing-recommendations)
- [Troubleshooting](#troubleshooting)
- [Success Criteria](#success-criteria)
- [Scope & Limitations](#scope--limitations)
- [Anti-Patterns](#anti-patterns)
- [Tool Reference](#tool-reference)

---

## Clarify First

Before triaging the NDA, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Counterparty relationship** — a direct competitor or a Fortune-500 vendor changes routing and scrutiny even when the text scores GREEN
- [ ] **Mutual vs one-way** — GREEN fast-track requires a mutual NDA; a one-way NDA where you are the recipient warrants closer review
- [ ] **Your role (discloser or recipient)** — determines whether missing carveouts and broad definitions actually hurt you, and how to route the result

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the output.

## Tools

### NDA Screener

Scans NDA text for red flags and outputs GREEN/YELLOW/RED classification with reasoning.

```bash
# Screen an NDA file
python scripts/nda_screener.py nda_draft.txt

# JSON output for integration
python scripts/nda_screener.py incoming_nda.md --json

# Save screening results
python scripts/nda_screener.py nda_draft.txt --output screening.json --json
```

**What it detects:**
- Missing standard carveouts (public knowledge, prior possession, independent development, third-party receipt, legal compulsion)
- Non-solicitation and non-compete clauses
- Perpetual confidentiality obligations
- Overbroad definition of confidential information
- Residuals clauses granting usage rights to ideas/concepts
- IP assignment or license grants
- Liquidated damages provisions
- Unlimited audit rights
- One-sided obligations

**Classification Rules:**

| Level | Criteria | Routing |
|-------|----------|---------|
| GREEN | All 5 carveouts present, no problematic provisions, standard structure | Business approver; no counsel needed |
| YELLOW | 1-2 missing carveouts, minor problematic provisions, or non-standard terms | Legal counsel review within 48 hours |
| RED | 3+ missing carveouts, non-compete/non-solicitation, IP assignment, perpetual term with no exit | Senior counsel review; do not sign |

---

### NDA Checklist

Generates a compliance checklist for an NDA, checking all 10 screening criteria with pass/fail status.

```bash
# Generate checklist for an NDA
python scripts/nda_checklist.py nda_draft.txt

# JSON output
python scripts/nda_checklist.py nda_draft.txt --json

# Save checklist
python scripts/nda_checklist.py nda_draft.txt --output checklist.json --json
```

**10-Point Screening Criteria:**

| # | Criterion | What It Checks |
|---|-----------|---------------|
| 1 | Agreement Structure | Mutual vs. one-way; parties identified; purpose stated |
| 2 | Definition of Confidential Info | Scope, specificity, marking requirements |
| 3 | Obligations | Standard of care, use restrictions, disclosure limits |
| 4 | Standard Carveouts | 5 required: public knowledge, prior possession, independent development, third-party receipt, legal compulsion |
| 5 | Permitted Disclosures | Representatives, advisors, affiliates with need-to-know |
| 6 | Term & Duration | Reasonable term, survival period, obligations after expiry |
| 7 | Return/Destruction | Obligation to return or destroy upon request/termination |
| 8 | Remedies | Injunctive relief, damages, indemnification scope |
| 9 | Problematic Provisions | Non-solicitation, non-compete, exclusivity, residuals, IP assignment, audit rights |
| 10 | Governing Law | Jurisdiction, dispute resolution mechanism |

---

## Reference Guides

### NDA Screening Criteria
`references/nda_screening_criteria.md`

Complete evaluation reference covering:
- All 10 screening criteria with detailed sub-items
- GREEN/YELLOW/RED classification rules with specific examples
- Common NDA issues with standard positions
- Redline approaches for common problems

---

## Workflows

### Standard NDA Triage

1. **Receive NDA** -- Save as `.txt` or `.md` file
2. **Screen** -- Run `nda_screener.py` for quick RED/YELLOW/GREEN classification
3. **Checklist** -- Run `nda_checklist.py` for detailed 10-point evaluation
4. **Route** -- Follow routing recommendations based on classification
5. **Track** -- Log screening result and routing decision

### Bulk NDA Processing

```bash
# Screen multiple NDAs
for nda in ndas/*.txt; do
  echo "=== $nda ==="
  python scripts/nda_screener.py "$nda"
  echo ""
done

# Generate JSON report for all NDAs
for nda in ndas/*.txt; do
  python scripts/nda_screener.py "$nda" --json --output "results/$(basename $nda .txt).json"
done
```

---

## Routing Recommendations

| Classification | Approver | Timeline | Escalation |
|---------------|----------|----------|------------|
| GREEN | Business owner or designated approver | Same day; sign within 24 hours | None required |
| YELLOW | Legal counsel review | 48-hour turnaround | Escalate to senior counsel if no response in 72 hours |
| RED | Senior legal counsel | 5 business day turnaround | Escalate to General Counsel if deal-critical |

### GREEN Fast-Track Conditions

All of the following must be true for GREEN classification:
- Mutual NDA (both parties bound)
- All 5 standard carveouts present
- No non-solicitation, non-compete, or exclusivity clauses
- No IP assignment or license grants
- No residuals clause
- Term is 2-5 years (not perpetual)
- Return/destruction obligation present
- Standard remedies (injunctive relief, no liquidated damages)

### RED Escalation Triggers

Any one of the following triggers RED classification:
- Non-compete clause of any scope
- Non-solicitation clause covering employees or customers
- IP assignment or broad license grant
- Missing 3 or more standard carveouts
- Perpetual obligations with no termination right
- Liquidated damages for breach
- Exclusivity provision

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Screener classifies everything as YELLOW | NDA uses non-standard formatting that breaks pattern matching | Ensure NDA is clean plain text; remove PDF artifacts and headers/footers |
| Missing carveouts false positive | Carveouts are present but use unusual language | Review the full "Exceptions" or "Exclusions" section manually; the screener checks common phrasings |
| Non-compete not detected | Non-compete is embedded in definitions or obligations section rather than standalone | Search the full document for "compete", "competitive", "restrict" manually |
| Checklist shows PASS but screener shows RED | Checklist evaluates presence; screener evaluates content quality | Use both tools together; the screener's RED overrides checklist PASS |
| Script errors on large files | NDA text exceeds expected size (>100KB) | Ensure the file contains only the NDA text, not appendices or exhibits |

---

## Success Criteria

- **NDA triage under 5 minutes:** Automated screening replaces 30-minute manual review.
- **Zero missed RED-severity issues:** Every non-compete, IP assignment, and missing carveout is flagged.
- **GREEN NDAs signed within 24 hours:** Fast-track routing eliminates bottleneck for standard agreements.
- **YELLOW NDAs resolved within 48 hours:** Counsel review turnaround meets SLA.
- **Consistent classification across reviewers:** 10-point checklist eliminates subjective "looks fine" approvals.
- **100% of NDAs screened before routing:** No NDA reaches an approver without automated triage.

---

## Scope & Limitations

**Covers:**
- Pattern-based screening of NDA text for structural issues and problematic provisions
- 10-point compliance checklist against standard NDA requirements
- GREEN/YELLOW/RED classification with routing recommendations
- Detection of non-solicitation, non-compete, IP assignment, residuals, and other problematic clauses
- Missing carveout identification

**Does NOT cover:**
- **Legal advice** -- classification is a screening aid, not a legal opinion
- **Negotiation or redlining** -- use `nda-review` for deep clause analysis and redline generation
- **Multi-party NDAs** -- optimized for bilateral (two-party) agreements
- **Industry-specific NDA requirements** (healthcare, defense, government) -- patterns target commercial NDAs
- **Non-English NDAs** -- pattern matching is English-language only

---

## Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
|-------------|-------------|-----------------|
| Signing GREEN-classified NDAs without any human review | Automated screening cannot catch business-context risks (e.g., NDA with a direct competitor) | GREEN classification means low legal risk, not zero risk; business approver must still review |
| Using triage as a substitute for deep NDA review on complex deals | Triage checks structure and red flags, not clause quality or negotiation position | Run `nda-review` skill for M&A, joint venture, or high-value partnership NDAs |
| Ignoring YELLOW classifications because "it's just an NDA" | YELLOW items like missing carveouts or residuals clauses create real legal exposure | Route all YELLOW NDAs to counsel; missing independent development carveout alone can cost millions |
| Treating all NDAs as equal regardless of counterparty relationship | NDA with a startup partner requires different scrutiny than NDA with a Fortune 500 vendor | Adjust review depth based on counterparty, deal value, and information sensitivity |

---

## Tool Reference

### nda_screener.py

**Purpose:** Scans NDA text for red flags and problematic provisions. Outputs GREEN/YELLOW/RED classification with detailed reasoning.

**Usage:**

```bash
python scripts/nda_screener.py <nda_file> [--json] [--output FILE]
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `nda_file` | *(positional)* | | Path to NDA text file (.txt or .md) |
| `--json` | | off | Output in JSON format |
| `--output` | `-o` | *(stdout)* | Write output to file |

**Example Output (JSON):**

```json
{
  "file": "vendor_nda.txt",
  "classification": "YELLOW",
  "red_flags": [
    {
      "id": "missing_carveout_independent_development",
      "severity": "YELLOW",
      "description": "Missing independent development carveout",
      "recommendation": "Add standard independent development exception"
    }
  ],
  "carveouts": {
    "public_knowledge": true,
    "prior_possession": true,
    "independent_development": false,
    "third_party_receipt": true,
    "legal_compulsion": true
  },
  "summary": "1 missing carveout; no critical issues. Route to counsel for review."
}
```

---

### nda_checklist.py

**Purpose:** Generates a 10-point compliance checklist for an NDA, evaluating each screening criterion as PASS/FAIL with notes.

**Usage:**

```bash
python scripts/nda_checklist.py <nda_file> [--json] [--output FILE]
```

**Flags:**

| Flag | Short | Default | Description |
|------|-------|---------|-------------|
| `nda_file` | *(positional)* | | Path to NDA text file (.txt or .md) |
| `--json` | | off | Output in JSON format |
| `--output` | `-o` | *(stdout)* | Write output to file |

**Example Output:**

```
NDA COMPLIANCE CHECKLIST
========================
File: vendor_nda.txt
Overall: YELLOW (8/10 PASS)

 #  Criterion                    Status  Notes
 1  Agreement Structure          PASS    Mutual NDA; both parties identified
 2  Definition of Confidential   PASS    Reasonably scoped with marking requirement
 3  Obligations                  PASS    Standard of care; use restrictions present
 4  Standard Carveouts           FAIL    Missing: independent development
 5  Permitted Disclosures        PASS    Representatives and advisors covered
 6  Term & Duration              PASS    3-year term with 2-year survival
 7  Return/Destruction           PASS    Return or destroy within 30 days
 8  Remedies                     PASS    Injunctive relief; no liquidated damages
 9  Problematic Provisions       FAIL    Residuals clause detected
10  Governing Law                PASS    Delaware law; state courts
```

---

## privacy-compliance

Source path: `references/legal/privacy-compliance/SKILL.md`

> **⚠️ EXPERIMENTAL** — This skill is provided for educational and informational purposes only. It does NOT constitute legal advice. All responsibility for usage rests with the user. Consult qualified legal professionals before acting on any output.

# Privacy Compliance Navigator

Tools and guidance for multi-regulation privacy compliance across 9 major global privacy frameworks, DPA review, and data subject request lifecycle management.

---

## Table of Contents

- [Tools](#tools)
  - [Privacy Regulation Checker](#privacy-regulation-checker)
  - [DSR Tracker](#dsr-tracker)
- [Reference Guides](#reference-guides)
- [Workflows](#workflows)
- [Troubleshooting](#troubleshooting)
- [Success Criteria](#success-criteria)
- [Scope & Limitations](#scope--limitations)
- [Anti-Patterns](#anti-patterns)
- [Tool Reference](#tool-reference)

---

## Clarify First

Before the assessment, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Org location + where your data subjects are** — sets which of the 9 regulations apply via territorial scope (the entire obligations matrix)
- [ ] **Data types processed** — personal, sensitive, financial, health, biometric, children — drives obligations and special-category triggers
- [ ] **Processing activities** — marketing, analytics, HR, profiling, healthcare — affects applicability and which obligations attach
- [ ] **Current practices** (if you want a gap analysis) — needed to flag gaps; without them you get an obligations matrix only, no gap report

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the assessment.

## Tools

### Privacy Regulation Checker

Determines which privacy regulations apply to an organization based on its location, data subjects, data types, and processing activities. Generates a compliance obligations matrix and flags gaps.

```bash
# Basic check — organization in Germany processing EU and US data
python scripts/privacy_regulation_checker.py \
  --org-location DE \
  --data-subjects EU,US \
  --data-types personal,sensitive,financial \
  --processing-activities marketing,analytics,hr

# JSON output for integration
python scripts/privacy_regulation_checker.py \
  --org-location SG \
  --data-subjects SG,AU,CN \
  --data-types personal,health \
  --processing-activities healthcare,research \
  --json

# Include gap analysis against current practices
python scripts/privacy_regulation_checker.py \
  --org-location US-CA \
  --data-subjects EU,US,BR \
  --data-types personal,biometric \
  --processing-activities ecommerce,profiling \
  --current-practices consent_mechanism,breach_process,retention_policy
```

**Determines:**
- Which of 9 regulations apply based on territorial scope rules
- Key obligations per applicable regulation
- Data subject rights required per regulation
- Response timelines per regulation
- Gap analysis when current practices are provided

**Output:**
- Applicable regulations list with confidence level
- Per-regulation obligations matrix
- Gap analysis with risk ratings
- Recommended priority actions

---

### DSR Tracker

Manages Data Subject Request lifecycle across multiple regulations with deadline calculation, status tracking, and overdue alerts.

```bash
# Add a new GDPR access request
python scripts/dsr_tracker.py add \
  --type access --regulation gdpr \
  --subject "Jane Smith" --email "jane@example.com"

# Add CCPA deletion request
python scripts/dsr_tracker.py add \
  --type deletion --regulation ccpa \
  --subject "John Doe" --email "john@example.com"

# List all open requests
python scripts/dsr_tracker.py list

# List overdue requests only
python scripts/dsr_tracker.py list --overdue

# Update request status
python scripts/dsr_tracker.py update --id DSR-0001 --status verified

# Dashboard view with time remaining
python scripts/dsr_tracker.py dashboard

# Export as JSON
python scripts/dsr_tracker.py dashboard --json
```

**Supported Request Types:**

| Type | GDPR Art. | CCPA Section | LGPD Art. |
|------|-----------|-------------|-----------|
| Access | Art. 15 | §1798.100 | Art. 18 |
| Deletion/Erasure | Art. 17 | §1798.105 | Art. 18(VI) |
| Correction/Rectification | Art. 16 | §1798.106 | Art. 18(III) |
| Portability | Art. 20 | §1798.130 | Art. 18(V) |
| Restriction | Art. 18 | — | Art. 18(IV) |
| Objection | Art. 21 | §1798.120 | Art. 18(IV) |
| Automated Decision Opt-Out | Art. 22 | §1798.185 | Art. 20 |
| Withdraw Consent | Art. 7(3) | — | Art. 18(IX) |

**Deadline Calculation:**

| Regulation | Initial Deadline | Extension | Extension Deadline |
|-----------|-----------------|-----------|-------------------|
| GDPR | 30 calendar days | +60 days (complex) | 90 calendar days |
| CCPA | 10 business days (ack) + 45 calendar days | +45 days | 90 calendar days |
| LGPD | 15 calendar days | — | — |
| POPIA | 30 calendar days | — | — |
| PIPEDA | 30 calendar days | +30 days | 60 calendar days |
| PDPA (SG) | 30 calendar days | — | — |
| Privacy Act (AU) | 30 calendar days | +30 days | 60 calendar days |
| PIPL | 15 calendar days | +15 days | 30 calendar days |
| UK GDPR | 30 calendar days | +60 days | 90 calendar days |

**Statuses:** received → verified → processing → completed | denied | extended

---

## Reference Guides

### Global Privacy Regulations
`references/global_privacy_regulations.md`

Comprehensive comparison of 9 major privacy regulations covering:
- Territorial scope and applicability criteria
- Legal bases for processing
- Data subject rights comparison matrix
- Breach notification requirements and timelines
- Cross-border transfer mechanisms
- DPO requirements
- Penalty structures

### DPA Review Checklist
`references/dpa_review_checklist.md`

Complete Data Processing Agreement review guide:
- Art. 28 GDPR required elements
- 10 processor obligations with analysis points
- International transfer mechanisms (SCCs June 2021, module selection)
- Transfer impact assessment requirements
- Common DPA issues with risk levels
- Practical negotiation considerations

### DSR Handling Guide
`references/dsr_handling_guide.md`

Data Subject Request handling reference:
- 8 request types with intake procedures
- Identity verification methods
- Response timelines per regulation
- Exemptions by regulation
- 6-step response process
- Regulatory monitoring approach

---

## Workflows

### Workflow 1: Regulation Applicability Assessment

```
Step 1: Identify organization parameters
        → Location, data subjects, data types, processing activities

Step 2: Run regulation checker
        → python scripts/privacy_regulation_checker.py --org-location [LOC] ...

Step 3: Review applicable regulations and obligations
        → Prioritize by risk (penalties, data volume, enforcement activity)

Step 4: Gap analysis against current practices
        → Re-run with --current-practices flag

Step 5: Build remediation roadmap
        → Address critical gaps first (missing legal basis, no breach process)
```

### Workflow 2: Data Subject Request Handling

```
Step 1: Receive and log request
        → python scripts/dsr_tracker.py add --type [type] --regulation [reg] ...

Step 2: Verify identity (proportionate to sensitivity)
        → See references/dsr_handling_guide.md for methods
        → python scripts/dsr_tracker.py update --id [ID] --status verified

Step 3: Gather data from all systems
        → python scripts/dsr_tracker.py update --id [ID] --status processing

Step 4: Apply exemptions if applicable
        → Check references/dsr_handling_guide.md exemptions table

Step 5: Prepare and send response within deadline
        → python scripts/dsr_tracker.py update --id [ID] --status completed

Step 6: Monitor dashboard for overdue requests
        → python scripts/dsr_tracker.py dashboard
```

### Workflow 3: DPA Review

```
Step 1: Check DPA against Art. 28 required elements
        → Use references/dpa_review_checklist.md

Step 2: Verify processor obligations (10 items)
        → Sub-processing, deletion, audit rights, etc.

Step 3: Assess international transfer provisions
        → SCC module selection (C2P, C2C, P2P, P2C)
        → Transfer impact assessment
        → Supplementary measures

Step 4: Review practical considerations
        → Liability caps, insurance, termination, data locations

Step 5: Document findings and negotiate amendments
```

### Workflow 4: Multi-Regulation Compliance Program

```
Step 1: Run regulation checker for full scope
        → python scripts/privacy_regulation_checker.py [params]

Step 2: Map overlapping obligations across regulations
        → Use references/global_privacy_regulations.md comparison matrix

Step 3: Build unified controls (satisfy strictest requirement)
        → GDPR-first approach covers most other regulations

Step 4: Layer regulation-specific requirements
        → CCPA opt-out mechanisms, LGPD DPO, PIPL localization

Step 5: Monitor regulatory changes
        → See references/dsr_handling_guide.md monitoring approach
```

---

## Troubleshooting

| Problem | Possible Cause | Resolution |
|---------|---------------|------------|
| Regulation checker flags unexpected regulation | Data subjects in jurisdiction not considered | Review data flow maps; even indirect data collection (analytics, cookies) can trigger territorial scope |
| DSR deadline missed | Request not logged promptly or status not updated | Implement intake SLA (log within 24 hours); use dashboard daily for overdue alerts |
| DPA missing Art. 28 elements | Template from processor is incomplete | Use DPA review checklist to identify gaps; require amendments before signing |
| Cross-border transfer mechanism unclear | Multiple transfer layers (controller → processor → sub-processor) | Map full data flow chain; each transfer leg needs its own mechanism |
| Conflicting obligations across regulations | Retention vs. deletion requirements differ | Document conflicts; apply strictest obligation unless local law mandates otherwise; seek legal counsel |
| Identity verification proportionality unclear | Over-verification deters legitimate requests | Match verification to risk: low-risk data = email confirmation; high-risk = ID verification |

---

## Success Criteria

- **All applicable regulations identified and mapped** — regulation checker confirms coverage with zero unaddressed jurisdictions where data subjects reside
- **100% of DSRs responded within statutory deadlines** — dashboard shows zero overdue requests; extension documented where used
- **DPAs reviewed against Art. 28 checklist before signing** — all 10 processor obligations addressed; international transfer mechanisms validated
- **Compliance matrix maintained and current** — quarterly review of obligations per regulation with change log
- **Regulatory monitoring active** — escalation criteria defined; new regulation applicability assessed within 30 days of enactment

---

## Scope & Limitations

**In Scope:**
- Applicability assessment for 9 major privacy regulations
- Data subject request tracking with multi-regulation deadline calculation
- DPA review against Art. 28 GDPR requirements
- Cross-regulation obligation mapping
- Gap analysis against current practices
- International transfer mechanism assessment

**Out of Scope:**
- Legal advice on specific legal basis selection — consult qualified privacy counsel
- Supervisory authority filings or breach notifications
- Cookie consent implementation or consent management platform configuration
- Binding Corporate Rules (BCR) application process
- Sector-specific regulations (HIPAA, FERPA, GLBA) beyond the 9 covered frameworks
- Data Protection Impact Assessments (see `dpia-assessment` skill)

---

## Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
|-------------|-------------|-----------------|
| **GDPR-only compliance** | Organizations assume GDPR covers all obligations; miss CCPA opt-out requirements, LGPD DPO mandate, PIPL data localization | Run regulation checker against all jurisdictions where data subjects reside; layer regulation-specific controls |
| **One-size-fits-all DSR process** | Applying GDPR 30-day timeline to all regulations misses CCPA 10-business-day acknowledgment or PIPL 15-day deadline | Configure per-regulation deadlines; use DSR tracker with regulation parameter for accurate deadline calculation |
| **Ignoring sub-processor chains in DPA review** | DPA covers direct processor but sub-processors transfer data to third countries without TIA | Map full processing chain in DPA review; require Art. 28(2) sub-processor obligations; validate each transfer leg |
| **Treating privacy as a one-time project** | Regulations evolve; new laws enacted; enforcement priorities shift | Implement regulatory monitoring with escalation criteria; quarterly compliance reviews |

---

## Tool Reference

### privacy_regulation_checker.py

Determines applicable privacy regulations and maps obligations based on organization parameters.

| Flag | Required | Description |
|------|----------|-------------|
| `--org-location <code>` | Yes | Organization headquarters (ISO country code, e.g., DE, US-CA, SG) |
| `--data-subjects <list>` | Yes | Comma-separated locations of data subjects (EU, US, BR, ZA, CA, SG, AU, CN, UK) |
| `--data-types <list>` | Yes | Comma-separated data types (personal, sensitive, financial, health, biometric, children) |
| `--processing-activities <list>` | Yes | Comma-separated activities (marketing, analytics, hr, ecommerce, profiling, healthcare, research) |
| `--current-practices <list>` | No | Comma-separated current practices for gap analysis |
| `--json` | No | Output in JSON format |

### dsr_tracker.py

Tracks Data Subject Request lifecycle with multi-regulation deadline calculation.

| Subcommand | Description |
|------------|-------------|
| `add` | Add new DSR (`--type`, `--regulation`, `--subject`, `--email` required) |
| `list` | List all requests (`--overdue` for overdue only) |
| `update` | Update request status (`--id`, `--status` required) |
| `dashboard` | Show dashboard with time remaining and alerts |

| Flag | Description |
|------|-------------|
| `--type <type>` | Request type: access, deletion, correction, portability, restriction, objection, automated_decision, withdraw_consent |
| `--regulation <reg>` | Regulation: gdpr, ccpa, lgpd, popia, pipeda, pdpa, privacy_act_au, pipl, uk_gdpr |
| `--subject <name>` | Data subject name |
| `--email <email>` | Data subject email |
| `--id <id>` | Request ID (e.g., DSR-0001) |
| `--status <status>` | Status: received, verified, processing, completed, denied, extended |
| `--overdue` | Filter to overdue requests only |
| `--json` | Output in JSON format |
| `--data-file <path>` | Custom data file path (default: dsr_requests.json) |

---

## privacy-notice-generator

Source path: `references/legal/privacy-notice-generator/SKILL.md`

> **⚠️ EXPERIMENTAL** — This skill is provided for educational and informational purposes only. It does NOT constitute legal advice. All responsibility for usage rests with the user. Consult qualified legal professionals before acting on any output.

# Privacy Notice Generator

Tools and guidance for drafting GDPR-compliant privacy notices across EU/EEA jurisdictions and audience types, with multi-layer compliance verification.

---

## Table of Contents

- [Tools](#tools)
  - [Privacy Notice Scaffolder](#privacy-notice-scaffolder)
  - [Notice Compliance Checker](#notice-compliance-checker)
- [Reference Guides](#reference-guides)
- [Workflows](#workflows)
- [Troubleshooting](#troubleshooting)
- [Success Criteria](#success-criteria)
- [Scope & Limitations](#scope--limitations)
- [Anti-Patterns](#anti-patterns)
- [Tool Reference](#tool-reference)

---

## Clarify First

Before generating the notice, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Notice type** — website, applicant, employee, b2b, b2c, or combined — selects which sections and audience-specific content appear (e.g. works council/monitoring for employee, Art. 14 source disclosure for b2b)
- [ ] **Jurisdiction** — DE/FR/AT/IT/ES/NL/BE/IE/UK — adds local requirements (DE Widerspruchsrecht/TDDDG, FR CNIL, UK ICO) that the compliance checker scores
- [ ] **Legal basis per processing purpose** — Art. 13(1)(c) requires a specific basis per purpose; a generic "applicable law" statement fails the check
- [ ] **Special features: cookies / AI / international transfers** — toggle sections 6, 12, and 13 and the AI Act Art. 50 transparency disclosures

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the notice.

## Tools

### Privacy Notice Scaffolder

Generates a privacy notice skeleton with all required sections pre-populated with jurisdiction-specific placeholders and legal references.

```bash
# Website privacy notice for German jurisdiction
python scripts/privacy_notice_scaffolder.py \
  --notice-type website \
  --jurisdiction DE \
  --data-categories personal,contact,usage,cookies \
  --legal-bases consent,contract,legitimate_interests \
  --has-cookies \
  --has-international-transfers

# Employee notice for French jurisdiction with AI processing
python scripts/privacy_notice_scaffolder.py \
  --notice-type employee \
  --jurisdiction FR \
  --data-categories personal,employment,financial,health \
  --legal-bases contract,legal_obligation,consent \
  --has-ai

# B2C customer notice for UK with all features
python scripts/privacy_notice_scaffolder.py \
  --notice-type b2c \
  --jurisdiction UK \
  --data-categories personal,contact,financial,usage,marketing \
  --legal-bases consent,contract,legitimate_interests \
  --has-cookies --has-ai --has-international-transfers \
  --json
```

**Supported Notice Types:**

| Type | Audience | Key Sections |
|------|----------|-------------|
| website | Website/app visitors | Cookies, analytics, tracking technologies |
| applicant | Job applicants | Recruitment data, talent pool, retention periods |
| employee | Employees | Works council, IT monitoring, BYOD, HR data |
| b2b | Business partners | Art. 14 requirements, source disclosure |
| b2c | B2C customers | Soft opt-in, payment processing, loyalty |
| combined | Multiple audiences | Merged sections with audience-specific callouts |

**Supported Jurisdictions:** DE, FR, AT, IT, ES, NL, BE, IE, UK

**13-Section Notice Structure:**
1. Controller identity and contact
2. DPO contact details
3. Data categories collected
4. Purposes and legal bases
5. Recipients and categories
6. International transfers
7. Retention periods
8. Data subject rights
9. Right to withdraw consent
10. Right to complain to SA
11. Automated decision-making
12. Cookies and tracking (if applicable)
13. AI processing (if applicable)

---

### Notice Compliance Checker

Validates a privacy notice text against Art. 13/14 GDPR requirements and generates a compliance score with missing/incomplete elements.

```bash
# Check a privacy notice file
python scripts/notice_compliance_checker.py privacy_notice.md

# Check with jurisdiction-specific requirements
python scripts/notice_compliance_checker.py privacy_notice.md --jurisdiction DE

# Check with notice type for type-specific validation
python scripts/notice_compliance_checker.py privacy_notice.md \
  --jurisdiction DE --notice-type employee

# JSON output
python scripts/notice_compliance_checker.py privacy_notice.md \
  --jurisdiction FR --notice-type website --json
```

**Checks For:**

| Category | Elements Checked |
|----------|-----------------|
| Art. 13 Mandatory | Controller identity, DPO contact, purposes, legal bases, recipients, transfers, retention, all 8 rights, automated decisions, consent withdrawal, SA complaint |
| Art. 14 Additional | Source of data, categories obtained (for indirect collection) |
| General | Art. 21 right to object prominence, plain language, no placeholders, consistent formatting |
| Jurisdiction-specific | DE: Widerspruchsrecht prominence, TDDDG; FR: CNIL recommendations; UK: ICO guidance |

**Output:**
- Compliance score (0-100)
- Missing elements (must-fix)
- Incomplete elements (should-improve)
- Jurisdiction-specific findings
- Type-specific findings

---

## Reference Guides

### Notice Types Guide
`references/notice_types_guide.md`

Detailed guidance for 6 notice types:
- Platform sub-types for website/app notices
- Applicant-specific data categories and retention
- Employee notice with works council and monitoring requirements
- B2B Art. 14 requirements and source disclosure
- B2C soft opt-in and payment processing
- Combined notice merge strategies

### Jurisdiction Requirements
`references/jurisdiction_requirements.md`

Jurisdiction-specific requirements for 9 jurisdictions:
- SA details and registration requirements
- Requirements beyond GDPR baseline
- Standard wording recommendations
- Retention guidance per jurisdiction

### Compliance Verification
`references/compliance_verification.md`

5-layer verification system:
- Jurisdiction-specific checks
- Art. 13/14 mandatory disclosures
- General compliance checks
- Type-specific checks
- AI Act compliance
- Post-generation checklist
- Writing style guide

---

## Workflows

### Workflow 1: SCOPE → INTAKE → DRAFT → VERIFY → DELIVER

```
Step 1: SCOPE — Determine notice parameters
        → Notice type (website/applicant/employee/b2b/b2c/combined)
        → Jurisdiction (DE/FR/AT/IT/ES/NL/BE/IE/UK)
        → Special features (cookies, AI, international transfers)

Step 2: INTAKE — Gather information
        → Controller identity and DPO
        → Data inventory (categories, sources)
        → Purposes and legal bases per category
        → Recipients and processors
        → Transfer destinations and mechanisms
        → Retention periods per category
        → Cookie/tracking inventory (if website)
        → AI processing details (if applicable)

Step 3: DRAFT — Generate notice skeleton
        → python scripts/privacy_notice_scaffolder.py [params]
        → Fill in placeholders with actual information from intake
        → Add jurisdiction-specific clauses
        → Apply writing style guide (you/your, short sentences, tables)

Step 4: VERIFY — Run compliance checker
        → python scripts/notice_compliance_checker.py notice.md --jurisdiction [J] --notice-type [T]
        → Address all missing elements
        → Address incomplete elements
        → Review jurisdiction-specific findings

Step 5: DELIVER — Finalize and publish
        → Legal review sign-off
        → Technical review (links, formatting, accessibility)
        → Translation QA (if multilingual)
        → Publication with version control
        → Set review trigger calendar
```

### Workflow 2: Notice Update

```
Step 1: Identify trigger (new processing, regulation change, annual review)
Step 2: Run compliance checker on current notice
Step 3: Identify gaps and required updates
Step 4: Draft updated sections
Step 5: Re-verify with compliance checker
Step 6: Notify data subjects of material changes
Step 7: Update version date and change log
```

### Workflow 3: Multi-Jurisdiction Notice

```
Step 1: Generate base notice for primary jurisdiction
        → python scripts/privacy_notice_scaffolder.py --jurisdiction [primary] ...
Step 2: Check jurisdiction requirements for additional territories
        → See references/jurisdiction_requirements.md
Step 3: Add jurisdiction-specific supplements
        → DE: TDDDG telecom disclosures, DSK guidance
        → FR: CNIL cookie requirements, LIL specifics
        → UK: ICO guidance, UK transfer mechanisms
Step 4: Verify each jurisdiction version
        → python scripts/notice_compliance_checker.py notice_de.md --jurisdiction DE
        → python scripts/notice_compliance_checker.py notice_fr.md --jurisdiction FR
Step 5: Publish with language/jurisdiction switcher
```

---

## Troubleshooting

| Problem | Possible Cause | Resolution |
|---------|---------------|------------|
| Low compliance score despite complete notice | Missing jurisdiction-specific requirements (e.g., DE Widerspruchsrecht prominence) | Run checker with --jurisdiction flag; review jurisdiction_requirements.md for local additions |
| Scaffolder generates too many sections | Combined notice type includes all audience sections | Use specific notice type instead of combined; or remove irrelevant sections post-generation |
| Art. 14 findings for direct collection | Checker flags Art. 14 requirements for B2B notice type | Correct — B2B often involves indirect collection; ensure source disclosure is included |
| Placeholder text in final notice | Template not fully populated | Search for `[PLACEHOLDER]` and `{{variable}}` markers; all must be replaced before publication |
| Cookie section missing from employee notice | Employee notice type does not include cookies by default | Add --has-cookies flag if employee-facing systems use cookies/tracking |
| AI section not generated | Missing --has-ai flag | Re-run scaffolder with --has-ai; review AI Act Art. 50 transparency requirements |

---

## Success Criteria

- **100% Art. 13/14 compliance score** — all mandatory disclosure elements present; zero missing items
- **Jurisdiction-specific requirements met** — compliance checker confirms local SA requirements addressed
- **Type-specific requirements met** — notice covers all audience-specific data processing activities
- **No placeholder text remaining** — all template variables replaced with actual information
- **Writing style guide followed** — "you/your" voice; short sentences; tables for complex information; precise legal citations
- **Legal review completed** — qualified privacy counsel sign-off on final notice
- **Publication requirements met** — accessible, versioned, dated, with change notification mechanism

---

## Scope & Limitations

**In Scope:**
- Privacy notice skeleton generation for 6 notice types across 9 jurisdictions
- Compliance checking against Art. 13/14 GDPR mandatory disclosures
- Jurisdiction-specific requirement validation (DE, FR, AT, IT, ES, NL, BE, IE, UK)
- Notice type-specific section generation and validation
- AI Act Art. 50 transparency disclosure sections
- Cookie and tracking technology disclosure sections
- Writing style and plain language guidance

**Out of Scope:**
- Legal advice on specific legal basis selection — consult qualified privacy counsel
- Translation services — tool generates English templates; professional translation required
- Cookie consent implementation or CMP configuration
- DPIA generation (see `dpia-assessment` skill)
- Privacy notice hosting or publication infrastructure
- Non-GDPR privacy notice formats (CCPA notice at collection, LGPD notices)
- Sector-specific notices (healthcare, financial services, children's services)

---

## Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
|-------------|-------------|-----------------|
| **Copy-paste from another company** | Different processing activities, jurisdictions, and legal bases; exposes liability gaps | Generate skeleton from actual parameters; fill with organization-specific information |
| **One notice for all jurisdictions** | Misses jurisdiction-specific requirements (DE TDDDG, FR CNIL, UK ICO); SA enforcement | Generate jurisdiction-specific versions or supplements using scaffolder per jurisdiction |
| **Generic legal bases** ("we process your data based on applicable law") | Art. 13(1)(c) requires specific legal basis per purpose; generic statement is non-compliant | Map each processing purpose to specific Art. 6(1) basis; document in purpose-basis table |
| **Set and forget** | Processing activities change; regulations evolve; notices become inaccurate | Set review triggers (see compliance_verification.md); run compliance checker quarterly |
| **Overly legalistic language** | Recital 58 requires clear and plain language; complex legal jargon is non-compliant | Follow writing style guide: "you/your" voice, short sentences, tables, examples |

---

## Tool Reference

### privacy_notice_scaffolder.py

Generates a privacy notice skeleton based on notice type, jurisdiction, and processing parameters.

| Flag | Required | Description |
|------|----------|-------------|
| `--notice-type <type>` | Yes | Notice type: website, applicant, employee, b2b, b2c, combined |
| `--jurisdiction <code>` | Yes | Jurisdiction: DE, FR, AT, IT, ES, NL, BE, IE, UK |
| `--data-categories <list>` | Yes | Comma-separated: personal, contact, usage, cookies, financial, health, employment, marketing, biometric |
| `--legal-bases <list>` | Yes | Comma-separated: consent, contract, legal_obligation, legitimate_interests, vital_interests, public_task |
| `--has-cookies` | No | Include cookies and tracking section |
| `--has-ai` | No | Include AI and automated processing section |
| `--has-international-transfers` | No | Include international transfers section |
| `--json` | No | Output in JSON format |

### notice_compliance_checker.py

Validates a privacy notice against Art. 13/14 GDPR requirements.

| Flag | Required | Description |
|------|----------|-------------|
| `<notice_file>` | Yes | Path to privacy notice file (markdown or text) |
| `--jurisdiction <code>` | No | Jurisdiction for local requirements: DE, FR, AT, IT, ES, NL, BE, IE, UK |
| `--notice-type <type>` | No | Notice type for type-specific checks: website, applicant, employee, b2b, b2c, combined |
| `--json` | No | Output in JSON format |

---

## statute-analysis

Source path: `references/legal/statute-analysis/SKILL.md`

> **⚠️ EXPERIMENTAL** — This skill is provided for educational and informational purposes only. It does NOT constitute legal advice. All responsibility for usage rests with the user. Consult qualified legal professionals before acting on any output.

# Statute Analysis

Production-ready framework for reading, interpreting, and applying statutes, regulations, and rules. Covers the full lifecycle from identifying the legal hierarchy through extracting actionable requirements and mapping implementation obligations.

---

## Table of Contents

- [Legal Hierarchy](#legal-hierarchy)
- [Preliminary Steps](#preliminary-steps)
- [Tools](#tools)
- [Core Interpretation Techniques](#core-interpretation-techniques)
- [Canons of Construction](#canons-of-construction)
- [Interpretation Sources](#interpretation-sources)
- [Requirement Classification](#requirement-classification)
- [Cross-Jurisdictional Analysis](#cross-jurisdictional-analysis)
- [Reference Guides](#reference-guides)
- [Workflows](#workflows)
- [Troubleshooting](#troubleshooting)
- [Success Criteria](#success-criteria)
- [Scope and Limitations](#scope-and-limitations)
- [Anti-Patterns](#anti-patterns)
- [Tool Reference](#tool-reference)

---

## Legal Hierarchy

Understanding the source hierarchy is the foundation of statutory analysis.

| Source | Created By | Authority | Example |
|--------|-----------|-----------|---------|
| Constitution | Sovereign/people | Supreme | U.S. Constitution, EU Treaties |
| Statute | Legislature | Primary legislation | GDPR, Clean Air Act, AI Act |
| Regulation | Executive agency | Delegated authority | FDA 21 CFR, FTC rules |
| Rule | Agency or court | Procedural/interpretive | Federal Rules of Civil Procedure |
| Guidance | Agency | Non-binding, persuasive | FDA guidance documents, CNIL guides |
| Case law | Courts | Binding within jurisdiction | Supreme Court precedent |

**Key principle:** Higher sources override lower sources. Regulations cannot exceed statutory authority. Guidance cannot create new obligations not grounded in statute.

---

## Clarify First

Before the analysis, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The exact statute/regulation and its in-force version** — analyzing a superseded or repealed version yields wrong obligations; verify currency before extracting anything
- [ ] **Your role under it** — provider vs deployer, controller vs processor — determines which obligations actually bind you and which to extract
- [ ] **Jurisdiction(s) in scope** — needed to flag cross-jurisdictional conflicts and preemption; definitions differ across regimes and must not be cross-pollinated

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the analysis.

## Preliminary Steps

Before interpreting any statutory provision, complete these checks:

1. **Verify currency and status** -- Is this the current, in-force version? Check for amendments, repeals, or sunset clauses. Use official sources (government gazettes, EUR-Lex, congress.gov).
2. **Understand the regulatory ecosystem** -- What regulations, rules, and guidance implement this statute? Map the full hierarchy.
3. **Browse the full structure** -- Read the table of contents, definitions section, scope provisions, and transitional articles before diving into specific sections.
4. **Identify the definitions section** -- Almost all statutes define key terms. These definitions override ordinary meaning.
5. **Check effective dates** -- Different provisions may have different effective dates. Map the compliance timeline.
6. **Identify your role** -- Statutes impose different obligations depending on the reader's role (e.g., "provider" vs "deployer" in the EU AI Act, "controller" vs "processor" in GDPR).

---

## Tools

### Statute Keyword Analyzer

Scans statute text for operative keywords and classifies obligations, permissions, conditions, and exemptions.

```bash
# Analyze a statute file
python scripts/statute_keyword_analyzer.py --input statute.txt

# Analyze with JSON output
python scripts/statute_keyword_analyzer.py --input regulation.txt --json

# Analyze inline text
python scripts/statute_keyword_analyzer.py --text "The controller shall implement appropriate technical measures..."

# Save analysis report
python scripts/statute_keyword_analyzer.py --input statute.txt --output analysis.json
```

### Requirement Classifier

Classifies statutory requirements by type, implementation team, enforcement mechanism, and penalty.

```bash
# Classify requirements from a JSON list
python scripts/requirement_classifier.py --input requirements.json

# Classify with JSON output
python scripts/requirement_classifier.py --input requirements.json --json

# Classify inline requirement
python scripts/requirement_classifier.py --text "Controllers must provide data subjects with a privacy notice at the point of collection"

# Generate implementation matrix
python scripts/requirement_classifier.py --input requirements.json --output matrix.json
```

---

## Core Interpretation Techniques

### Definitions Analysis

Statutory definitions control meaning. Pay attention to the verb used:

| Verb | Type | Meaning | Example |
|------|------|---------|---------|
| "means" | Exhaustive | The definition is complete; no other meaning applies | "'Personal data' means any information relating to an identified or identifiable natural person" |
| "includes" | Illustrative | The definition provides examples but is not limited to them | "'Processing' includes collection, recording, organization, structuring..." |
| "does not include" | Exclusion | Explicitly carves out items from scope | "'Consumer' does not include a natural person acting in a commercial or employment context" |
| "refers to" | Pointer | Incorporates an external definition | "'Harmonised standard' refers to a European standard as defined in Regulation (EU) No 1025/2012" |

### Operative Keywords

| Keyword | Classification | Legal Effect |
|---------|---------------|-------------|
| **shall** | Mandatory | Creates an obligation; must be done |
| **must** | Mandatory | Same as "shall" in modern drafting |
| **may** | Permissive | Creates permission; optional |
| **may not** | Prohibitive | Creates a prohibition |
| **and** | Conjunctive | All listed items required |
| **or** | Disjunctive | Any listed item sufficient |
| **unless** | Exception | Negates the rule when condition is met |
| **except** | Exception | Carves out specific items from the rule |
| **subject to** | Conditional | Rule applies but another provision modifies it |
| **notwithstanding** | Override | This provision prevails over conflicting provisions |
| **provided that** | Condition | Adds a requirement that must be satisfied |
| **if...then** | Conditional | Trigger condition and consequence |
| **upon** | Temporal trigger | Action required when event occurs |

### Conjunctive vs Disjunctive Analysis

This distinction determines whether ALL conditions must be met or ANY single condition suffices.

| Pattern | Reading | Practical Impact |
|---------|---------|-----------------|
| "A, B, and C" | All three required | Must satisfy every element |
| "A, B, or C" | Any one sufficient | Satisfy any single element |
| "A, B, and/or C" | Ambiguous | Flag for clarification; analyze context |
| "both A and B" | Explicitly conjunctive | Must satisfy both |
| "either A or B" | Explicitly disjunctive | Satisfy one |
| Serial comma ambiguity | Context-dependent | Apply whole-act rule for consistency |

---

## Canons of Construction

See `references/canons_of_construction.md` for the complete 12-canon reference.

### Quick Reference

| Canon | Core Rule | When to Apply |
|-------|----------|---------------|
| General-Terms Canon | General terms get general meaning | Default interpretation |
| Expressio Unius | Expressing one thing excludes others | Specific lists without catchall |
| Whole-Act Rule | Interpret provisions consistently | Apparent conflicts between sections |
| Consistent Usage | Same term = same meaning throughout | Term appears multiple times |
| Meaningful Variation | Different terms = different meanings | Similar but distinct terms used |
| Surplusage Canon | Every word has meaning; no redundancy | Tempted to treat words as surplus |
| Noscitur a Sociis | Words known by their associates | Ambiguous term in a list |
| Ejusdem Generis | General follows specific = limited | "...and other similar" patterns |
| Against Ineffectiveness | Prefer reading that gives effect | Two possible readings |
| Avoiding Absurdity | Reject absurd outcomes | Literal reading produces nonsensical result |
| Remedial Statutes | Construe liberally | Consumer protection, safety statutes |
| Rule of Lenity | Ambiguity favors the regulated party | Criminal or penalty provisions |

---

## Interpretation Sources

When statutory text is ambiguous, consult sources in this order:

| Priority | Source | Weight | Where to Find |
|----------|--------|--------|---------------|
| 1 | Statutory text itself | Controlling | Official gazette, codified law |
| 2 | Definitions section | Controlling | Usually first articles/sections |
| 3 | Legislative purpose (recitals, preamble) | Strong | Preamble, "Whereas" clauses |
| 4 | Canons of construction | Strong | Legal treatises, case law |
| 5 | Case law interpreting the provision | Strong-to-moderate | Court databases |
| 6 | Agency regulations implementing statute | Moderate | Agency websites, CFR |
| 7 | Agency guidance and FAQs | Persuasive only | Agency websites |
| 8 | Legislative history | Weak (varies by jurisdiction) | Congressional record, Hansard |
| 9 | Academic commentary | Persuasive only | Legal journals |

---

## Requirement Classification

Every statutory requirement maps to an implementation category:

| Type | Description | Typical Owner | Example |
|------|-------------|---------------|---------|
| Disclosure | Information must be provided to someone | Legal / Compliance | Privacy notice requirements |
| Operational | Process or procedure must exist | Operations / Compliance | Record-keeping obligations |
| Technical | System capability or safeguard required | Engineering | Encryption, access controls |
| UI/Design | User interface must include specific elements | Product / Design | Consent mechanisms, opt-out buttons |
| Organizational | Governance structure or role required | Management / HR | Appointing a DPO, board oversight |
| Documentation | Written records must be maintained | Legal / Compliance | Impact assessments, audit trails |
| Reporting | Information must be submitted to authority | Legal / Compliance | Breach notification, annual reports |

---

## Cross-Jurisdictional Analysis

When requirements from multiple jurisdictions apply:

1. **Map applicable jurisdictions** -- Where are your users, your entity, and your data?
2. **Identify overlapping requirements** -- Many frameworks share common obligations.
3. **Find the highest common denominator** -- Design for the strictest requirement that satisfies all jurisdictions.
4. **Flag conflicts** -- Where requirements genuinely conflict, document the conflict and seek legal advice.
5. **Check preemption** -- Federal law may preempt state law; EU regulations may preempt member state law.

---

## Enforcement Analysis

For each statutory requirement, assess enforcement risk:

| Factor | Assessment Questions |
|--------|---------------------|
| Enforcement authority | Which agency enforces? How active are they? |
| Penalty types | Civil fines, criminal penalties, administrative sanctions? |
| Penalty severity | Fixed amounts, percentage of turnover, per-violation? |
| Cure periods | Is there a right to cure before penalties apply? |
| Private right of action | Can individuals sue for violations? |
| Enforcement history | Has this provision been actively enforced? |
| Regulatory guidance | Has the agency clarified enforcement priorities? |

---

## Reference Guides

| Guide | Path | Description |
|-------|------|-------------|
| Canons of Construction | `references/canons_of_construction.md` | 12 canons with definitions, examples, and misapplication warnings |
| Statutory Structure | `references/statutory_structure.md` | How statutes are organized, effective dates, preemption, enforcement |

---

## Workflows

### Workflow 1: First Reading of a New Statute

1. Browse the full table of contents and structure.
2. Read the definitions section and scope provisions.
3. Check effective dates and transitional provisions.
4. Identify your role under the statute.
5. Run `scripts/statute_keyword_analyzer.py` on the full text.
6. Review the obligation/permission/exception map.
7. Identify provisions that apply to your role.
8. **Validation:** Definitions cataloged, role identified, key obligations listed.

### Workflow 2: Requirement Extraction and Classification

1. Extract all provisions containing "shall," "must," or mandatory language.
2. For each requirement, identify: who (subject), what (action), when (trigger/deadline), how (standard).
3. Run `scripts/requirement_classifier.py` on the extracted requirements.
4. Review the implementation matrix.
5. Assign each requirement to an implementation team.
6. Prioritize by enforcement risk and deadline.
7. **Validation:** Every mandatory provision classified, assigned, and prioritized.

### Workflow 3: Cross-Reference Resolution

1. Identify all cross-references in the target provision ("subject to Article X," "as defined in Section Y").
2. Read each referenced provision in full.
3. Determine whether the cross-reference modifies, limits, or supplements the target provision.
4. Check for circular references or chains (A references B which references C).
5. Document the complete picture -- the target provision as modified by all cross-references.
6. **Validation:** All cross-references resolved; no orphan references.

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Term not defined in statute | Legislature used ordinary meaning | Apply general-terms canon; check case law for judicial definitions |
| "And/or" ambiguity | Drafting imprecision | Check legislative history; apply whole-act rule; flag for legal review |
| Conflicting provisions | Later provision may override earlier | Check for "notwithstanding" clauses; apply later-in-time rule |
| Undefined threshold | Delegated to regulation | Check implementing regulations and agency guidance |
| Provision seems to have no effect | May be transitional or placeholder | Check effective dates and amendment history |
| Cross-reference to repealed section | Statute not updated after amendment | Check saving clauses; apply presumption against ineffectiveness |

---

## Success Criteria

| Criterion | Target |
|-----------|--------|
| All defined terms cataloged | 100% of definitions section mapped |
| Obligations extracted | Every "shall/must" provision identified |
| Requirements classified | Each requirement has type, owner, enforcement, and priority |
| Cross-references resolved | No unresolved references remain |
| Enforcement risk assessed | Every material obligation has enforcement analysis |
| Implementation matrix complete | Requirements mapped to teams with timelines |

---

## Scope & Limitations

**In scope:** Reading and interpreting statutory text, extracting requirements, classifying obligations, applying canons of construction, mapping enforcement risk.

**Out of scope:** Providing legal advice, predicting court outcomes, drafting legislation, interpreting case law holdings, constitutional analysis.

**Disclaimer:** This skill provides a structured methodology for statutory analysis. It does not constitute legal advice. Always consult qualified legal counsel for binding interpretations.

---

## Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
|-------------|-------------|-----------------|
| Reading a section in isolation | Statutes are interconnected; isolated reading misses cross-references, definitions, and scope limitations | Always read definitions, scope, and cross-referenced provisions before interpreting |
| Treating guidance as law | Agency guidance is non-binding and can change; building compliance solely on guidance creates risk | Use guidance to inform interpretation but anchor compliance to statutory text |
| Ignoring "what the statute doesn't say" | Silence can mean permission, delegation, or an oversight; assuming the statute covers everything leads to compliance gaps | Affirmatively check: does the statute address this scenario? If not, analyze why and what fills the gap |
| Applying one jurisdiction's interpretation to another | "Personal data" in GDPR is not identical to "personal information" in CCPA; cross-pollinating definitions creates errors | Analyze each statute independently using its own definitions and interpretive framework |
| Skipping the definitions section | Statutory definitions override ordinary meaning; missing them leads to fundamental misreadings | Always read the definitions section first, before any substantive analysis |

---

## Tool Reference

| Tool | Input | Output | Use Case |
|------|-------|--------|----------|
| `statute_keyword_analyzer.py` | Statute text file or inline text | Obligation/permission/exception map | First pass analysis of any legislative text |
| `requirement_classifier.py` | List of requirements (text or JSON) | Implementation matrix with types, teams, enforcement | Converting statutory obligations to actionable implementation tasks |

---

## tabular-document-review

Source path: `references/legal/tabular-document-review/SKILL.md`

> **⚠️ EXPERIMENTAL** — This skill is provided for educational and informational purposes only. It does NOT constitute legal advice. All responsibility for usage rests with the user. Consult qualified legal professionals before acting on any output.

# Tabular Document Review Skill

## Overview

Production-ready toolkit for extracting structured data from multiple legal documents into a comparison matrix with citations. Supports user-defined extraction columns, parallel processing with up to 10 agents, confidence scoring, and output in markdown table or structured JSON. Designed for legal teams performing bulk contract review, NDA comparison, employment agreement analysis, and lease review.

## Table of Contents

- [Tools](#tools)
- [Reference Guides](#reference-guides)
- [Workflows](#workflows)
- [Extraction Scenarios](#extraction-scenarios)
- [Troubleshooting](#troubleshooting)
- [Success Criteria](#success-criteria)
- [Scope & Limitations](#scope--limitations)
- [Anti-Patterns](#anti-patterns)
- [Tool Reference](#tool-reference)

## Clarify First

Before the review, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The extraction columns** — define exactly what each cell holds; a vague "Date" matches dozens of dates, while "Effective Date" with guidance does not
- [ ] **Document set location and formats** — drives discovery and how many parallel agents to allocate (ceil(N/10), max 10)
- [ ] **Document type** — contracts, NDAs, employment, leases — selects the pre-defined column set and per-column extraction guidance

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the matrix.

## Tools

### 1. Document Discovery (`scripts/document_discovery.py`)

Scan a directory for legal documents and generate an inventory manifest.

```bash
python scripts/document_discovery.py /path/to/contracts

python scripts/document_discovery.py /path/to/ndas --types pdf,docx --json

python scripts/document_discovery.py /path/to/leases --types pdf,docx,txt,md --min-size 1024
```

### 2. Extraction Aggregator (`scripts/extraction_aggregator.py`)

Aggregate multiple extraction result JSONs into a unified comparison matrix.

```bash
python scripts/extraction_aggregator.py \
  --results extraction_1.json extraction_2.json extraction_3.json

python scripts/extraction_aggregator.py \
  --results-dir ./extraction_results/ --json

python scripts/extraction_aggregator.py \
  --results-dir ./extraction_results/ \
  --format markdown \
  --output review_matrix.md

python scripts/extraction_aggregator.py \
  --results extraction_1.json extraction_2.json \
  --columns "Parties,Effective Date,Term,Governing Law"
```

## Reference Guides

| Reference | Purpose |
|-----------|---------|
| `references/extraction_methodology.md` | Document extraction best practices, JSON schema, agent prompts |
| `references/common_extraction_columns.md` | Pre-defined column sets for contracts, NDAs, employment, leases |

## Workflows

### 5-Step Document Review Pipeline

| Step | Action | Tool | Output |
|------|--------|------|--------|
| 1. Gather Requirements | Define document folder, output filename, columns to extract | Manual | Column list, file path |
| 2. Discover Documents | Scan directory for target documents | `document_discovery.py` | Document manifest JSON |
| 3. Process Documents | Extract values per column with citations (parallel agents) | AI agents (external) | Per-document extraction JSONs |
| 4. Collect Results | Aggregate extraction JSONs into unified matrix | `extraction_aggregator.py` | Consolidated matrix |
| 5. Generate Output | Export as markdown table or structured JSON | `extraction_aggregator.py` | Final deliverable |

### Parallel Processing Strategy

| Agents | Documents per Agent | Use When |
|--------|-------------------|----------|
| 1 | All | 1-5 documents |
| 2-3 | ceil(N/agents) | 6-15 documents |
| 4-6 | ceil(N/agents) | 16-40 documents |
| 7-10 | ceil(N/agents) | 41-100 documents |
| 10 (max) | ceil(N/10) | 100+ documents |

### Agent Prompt Template

Each agent receives a prompt structured as:

```
You are reviewing {count} legal documents. For each document, extract the
following columns:

{column_definitions}

For each value extracted:
1. Provide the exact value found
2. Include the page number (PDF) or section/paragraph (DOCX/MD)
3. Rate your confidence: HIGH (exact match), MEDIUM (inferred), LOW (uncertain)
4. If not found, record "NOT FOUND" with confidence LOW

Output as JSON per the extraction schema.
```

### Confidence Scoring

| Level | Color Code | Definition |
|-------|-----------|------------|
| HIGH | Green | Exact value found with clear citation |
| MEDIUM | Yellow | Value inferred from context; multiple possible interpretations |
| LOW | Red / Not Found | Value uncertain or not found in document |

### Output Format

**Sheet 1: Document Review**

| Document | Parties | Effective Date | Term | Governing Law | ... |
|----------|---------|---------------|------|---------------|-----|
| contract_a.pdf | Acme / Beta [p.1] | 2026-01-15 [p.2] | 3 years [p.3] | Delaware [p.12] | ... |
| contract_b.pdf | Gamma / Delta [p.1] | NOT FOUND | 2 years [p.4] | New York [p.10] | ... |

**Sheet 2: Summary**

| Metric | Value |
|--------|-------|
| Documents processed | 25 |
| Columns extracted | 8 |
| Average confidence | 87% |
| Not found rate | 12% |

## Extraction Scenarios

### Contract Review

| Column | What to Extract |
|--------|----------------|
| Parties | All contracting parties with full legal names |
| Effective Date | Contract effective or execution date |
| Term | Duration of the agreement |
| Renewal | Auto-renewal terms and notice period |
| Governing Law | Jurisdiction governing the agreement |
| Liability Cap | Maximum liability amount or formula |
| Indemnification | Indemnification obligations and scope |
| IP Ownership | Intellectual property ownership provisions |
| Termination Rights | Termination triggers and notice requirements |
| Data Protection | Data protection or privacy obligations |

### NDA Review

| Column | What to Extract |
|--------|----------------|
| Parties | Disclosing and receiving parties |
| Type | Mutual or one-way |
| Definition Scope | How "confidential information" is defined |
| Exceptions | Standard exceptions to confidentiality |
| Term | Duration of confidentiality obligations |
| Survival | Survival period after termination |
| Return/Destruction | Obligations on termination |
| Remedies | Available remedies for breach |

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Discovery finds 0 documents | Wrong path or file types | Verify path exists; check `--types` matches actual file extensions |
| Extraction JSONs have wrong schema | Agent prompt incomplete | Use the extraction schema from `extraction_methodology.md` |
| Aggregator shows conflicts | Multiple values for same cell | Review source documents; aggregator marks conflicts for manual review |
| High "NOT FOUND" rate | Columns too specific for document type | Use column definitions from `common_extraction_columns.md`; broaden definitions |
| Confidence all LOW | Agent unable to locate values | Check column definitions are specific enough; verify document is readable |
| Aggregator crashes on large set | Too many result files loaded at once | Process in batches of 50 results; use `--columns` to limit output width |
| Markdown table misaligned | Long values or special characters | Use `--format json` for machine processing; truncate long values |
| Missing citations | Agent did not include page/section references | Reinforce citation requirement in agent prompt; check extraction schema |

## Success Criteria

- **Extraction Coverage**: 90%+ of defined columns populated across all documents
- **Confidence Distribution**: 70%+ of extractions rated HIGH confidence
- **Citation Accuracy**: Every extracted value includes verifiable page/section citation
- **Processing Speed**: 50+ documents processed within 30 minutes using parallel agents
- **Matrix Completeness**: Final matrix includes all documents and all columns with no orphan rows

## Scope & Limitations

**This skill covers:**
- Document inventory and discovery across PDF, DOCX, TXT, and MD formats
- Aggregation of extraction results from parallel agent processing into unified matrix
- Pre-defined column sets for contracts, NDAs, employment agreements, and leases
- Confidence scoring and conflict detection for extracted values
- Markdown and JSON output formats

**This skill does NOT cover:**
- Actual document parsing or text extraction (requires external libraries or AI agents)
- OCR processing for scanned documents
- Excel/XLSX output generation (use JSON output and convert externally)
- Automated legal analysis or risk assessment of extracted values
- Document comparison or redlining between versions

## Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
|--------------|-------------|-----------------|
| Vague column definitions | "Date" could match dozens of dates in a contract | Use specific definitions: "Effective Date" with guidance on where to look |
| Skipping document discovery | Unknown document count leads to wrong agent allocation | Always run discovery first; use manifest for pipeline planning |
| Ignoring LOW confidence results | Missing or uncertain data treated as fact | Review all LOW confidence cells manually; flag in final report |
| Processing 100+ docs with 1 agent | Slow, context window overflow, quality degradation | Use parallel processing: ceil(N/10) documents per agent, max 10 agents |
| No citation requirement | Cannot verify extracted values against source | Require page/section citation for every extraction; reject uncited values |

## Tool Reference

### `scripts/document_discovery.py`

Scan directory for legal documents and generate inventory manifest.

```
usage: document_discovery.py [-h] [--json]
                              [--types TYPES]
                              [--min-size MIN_SIZE]
                              [--max-size MAX_SIZE]
                              directory

positional arguments:
  directory             Path to directory containing documents

options:
  -h, --help            Show help message and exit
  --json                Output in JSON format
  --types TYPES         Comma-separated file extensions to include
                        (default: pdf,docx,doc,txt,md,rtf)
  --min-size MIN_SIZE   Minimum file size in bytes (default: 0)
  --max-size MAX_SIZE   Maximum file size in bytes (default: no limit)
```

### `scripts/extraction_aggregator.py`

Aggregate extraction results into unified comparison matrix.

```
usage: extraction_aggregator.py [-h] [--json]
                                 [--results RESULTS [RESULTS ...]]
                                 [--results-dir RESULTS_DIR]
                                 [--format {markdown,json}]
                                 [--columns COLUMNS]
                                 [--output OUTPUT]

options:
  -h, --help            Show help message and exit
  --json                Output in JSON format (alias for --format json)
  --results             One or more extraction result JSON files
  --results-dir         Directory containing extraction result JSON files
  --format              Output format: markdown table or JSON (default: markdown)
  --columns             Comma-separated column names to include (default: all)
  --output              Write output to file instead of stdout
```

---

## tech-contract-negotiation

Source path: `references/legal/tech-contract-negotiation/SKILL.md`

> **⚠️ EXPERIMENTAL** — This skill is provided for educational and informational purposes only. It does NOT constitute legal advice. All responsibility for usage rests with the user. Consult qualified legal professionals before acting on any output.

# Tech Contract Negotiation Skill

## Overview

Production-ready negotiation toolkit for technology services agreements, professional services contracts, and B2B transactions. Provides a Three-Position Framework (provider-favorable, balanced, client-favorable) for every major provision, Deal-Size Tactics across 5 tiers, Five-Tier Objection Handling, regulatory leverage arguments, and concession roadmaps. Designed for legal counsel, procurement leads, and sales/deal desk teams negotiating technology contracts from $100K to $10M+.

## Table of Contents

- [Tools](#tools)
- [Reference Guides](#reference-guides)
- [Workflows](#workflows)
- [Troubleshooting](#troubleshooting)
- [Success Criteria](#success-criteria)
- [Scope & Limitations](#scope--limitations)
- [Anti-Patterns](#anti-patterns)
- [Tool Reference](#tool-reference)

## Clarify First

Before the analysis, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which side you are on** — provider vs client — the `--perspective` input that flips position classification and your target positions
- [ ] **Deal value + complexity parameters** — drive the deal tier (1-5), expected timeline, and number of rounds
- [ ] **Your bright lines / non-negotiables** — define what cannot be conceded vs what can be traded in the concession roadmap
- [ ] **Applicable regulations** — GDPR, DORA, NIS2, SOX — determine which regulatory-leverage arguments are genuine vs would destroy credibility

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the analysis.

## Tools

### 1. Negotiation Position Analyzer (`scripts/negotiation_position_analyzer.py`)

Analyzes contract text and classifies each provision as provider-favorable, balanced, or client-favorable based on keyword patterns and structural analysis. Generates a position map and recommended negotiation priorities.

```bash
# Analyze a contract draft
python scripts/negotiation_position_analyzer.py contract_draft.txt

# JSON output for integration
python scripts/negotiation_position_analyzer.py contract_draft.txt --json

# Analyze from a specific party's perspective
python scripts/negotiation_position_analyzer.py contract_draft.txt --perspective client
```

### 2. Deal Complexity Scorer (`scripts/deal_complexity_scorer.py`)

Takes deal parameters and scores complexity across 7 dimensions. Recommends deal tier (1-5), expected timeline, number of rounds, and key focus areas.

```bash
# Score deal complexity from parameters file
python scripts/deal_complexity_scorer.py deal_params.json

# JSON output
python scripts/deal_complexity_scorer.py deal_params.json --json

# Override deal value for quick what-if
python scripts/deal_complexity_scorer.py deal_params.json --deal-value 5000000
```

## Reference Guides

| Reference | Purpose |
|-----------|---------|
| `references/three_position_framework.md` | Provider/balanced/client positions for 5 major provisions with deal-size tactics |
| `references/objection_handling.md` | Five-tier objection methodology, prediction matrix, communication templates |
| `references/regulatory_leverage.md` | GDPR, DORA, NIS2, SOX leverage arguments, concession roadmap, industry considerations |

## Workflows

### Workflow 1: Pre-Negotiation Assessment

1. **Classify the deal** -- Run `deal_complexity_scorer.py` with deal parameters to determine tier, timeline, and focus areas
2. **Analyze the draft** -- Run `negotiation_position_analyzer.py` on the initial contract to map current positions
3. **Identify gaps** -- Compare position map against your target positions from `three_position_framework.md`
4. **Prepare objection responses** -- Review `objection_handling.md` for predicted objections based on client type
5. **Map regulatory leverage** -- Identify applicable frameworks from `regulatory_leverage.md`

### Workflow 2: Active Negotiation

1. **Open with position** -- Use the Opening Position Statement template from `objection_handling.md`
2. **Handle pushback** -- Apply Five-Tier Objection Handling: Acknowledge, Market Context, Business Rationale, Alternatives, Bright Lines
3. **Track concessions** -- Follow the 4-tier concession roadmap (Easy Gives through Bright Lines)
4. **Re-analyze after redlines** -- Run `negotiation_position_analyzer.py` on each revised draft
5. **Close** -- Use Closing the Deal template; verify no Bright Lines were crossed

### Workflow 3: Deal Review and Approval

1. **Final position analysis** -- Run analyzer on execution-ready draft
2. **Complexity validation** -- Confirm final terms match expected deal tier parameters
3. **Regulatory check** -- Verify all mandatory regulatory provisions are present
4. **Document concessions** -- Record what was traded and why for future negotiations
5. **Approval package** -- Combine position map, complexity score, and concession log

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Analyzer flags everything as "provider-favorable" | Input is a vendor's first draft (expected behavior) | Use `--perspective provider` to flip the analysis; compare against balanced baseline |
| Complexity scorer returns Tier 5 for a small deal | High regulatory or multi-jurisdictional flags triggered | Review the regulatory and jurisdiction inputs; lower if overestimated |
| Position map shows no IP provisions detected | Contract uses non-standard terminology for IP clauses | Check for terms like "work product," "deliverables ownership," or "background IP" manually |
| Deal timeline estimate seems too short | Scorer does not account for internal approval delays | Add internal review buffer (typically 1-2 weeks per approval level) to the estimated timeline |
| Objection framework doesn't cover a specific pushback | Counterparty raised an atypical demand | Start with Acknowledge tier; frame using closest Market Context example; escalate to Bright Lines if needed |
| Regulatory leverage arguments rejected as irrelevant | Framework doesn't apply to counterparty's jurisdiction | Verify which regulations actually bind each party; remove inapplicable leverage points |

## Success Criteria

- **Position Accuracy**: Analyzer correctly classifies 85%+ of provisions when validated against expert review
- **Deal Tier Alignment**: Complexity scorer tier matches actual negotiation effort within one tier for 90% of deals
- **Negotiation Efficiency**: Average number of negotiation rounds reduced by 30% compared to ad-hoc approach
- **Concession Tracking**: 100% of material concessions documented with rationale and trade-off analysis
- **Bright Line Protection**: Zero instances of crossing defined Bright Lines without executive escalation and approval
- **Regulatory Coverage**: All applicable regulatory provisions identified and addressed in 95%+ of contracts
- **Time-to-Signature**: Deals close within estimated timeline +/- 20% for 80% of negotiations

## Scope & Limitations

**This skill covers:**
- Technology services agreements, SaaS subscriptions, professional services contracts, and B2B licensing deals
- Negotiation position analysis for liability, IP, payment, SLA, and warranty provisions
- Deal complexity scoring with tier-based recommendations for timeline, rounds, and focus areas
- Regulatory leverage for GDPR, DORA, NIS2, and SOX in technology contract contexts
- Objection handling frameworks and communication templates for common negotiation scenarios

**This skill does NOT cover:**
- Employment agreements, M&A transactions, real estate contracts, or consumer-facing terms of service
- Jurisdiction-specific legal advice or attorney-client privileged analysis (this is a framework, not legal counsel)
- Contract drafting from scratch (assumes an existing draft to analyze and negotiate)
- Litigation strategy, dispute resolution beyond contract clauses, or enforcement proceedings
- Price negotiation tactics for commodity purchases or non-technology procurement

## Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
|--------------|-------------|-----------------|
| Treating every provision as a Bright Line | Counterparty disengages when everything is non-negotiable | Classify provisions into 4 concession tiers; trade Easy Gives early to build goodwill |
| Skipping deal complexity assessment | Under-preparing for complex deals or over-preparing for simple ones | Always run complexity scorer first to calibrate effort, timeline, and approval requirements |
| Using regulatory leverage when the regulation doesn't apply | Destroys credibility and trust with informed counterparties | Verify applicability before citing any regulation; use the genuine-vs-preference test from the framework |
| Accepting "this is our standard template" at face value | Every template is negotiable; accepting defaults leaves value on the table | Analyze the "standard" template with the position analyzer to identify moveable provisions |
| Negotiating provisions in isolation | Conceding on SLAs without linking to liability caps creates exposure | Use the Three-Position Framework holistically; link related provisions (SLAs to credits to liability) |

## Tool Reference

### `scripts/negotiation_position_analyzer.py`

Analyze contract text and classify provisions by negotiation position.

```
usage: negotiation_position_analyzer.py [-h] [--json] [--perspective {provider,client}]
                                         input_file

positional arguments:
  input_file            Path to contract text file (.txt or .md)

options:
  -h, --help            Show help message and exit
  --json                Output results as JSON
  --perspective {provider,client}
                        Analysis perspective (default: client)
```

**Outputs:** Provision-by-provision position classification (provider-favorable / balanced / client-favorable), overall position score, position distribution summary, and prioritized negotiation recommendations.

### `scripts/deal_complexity_scorer.py`

Score deal complexity across 7 dimensions and recommend negotiation parameters.

```
usage: deal_complexity_scorer.py [-h] [--json] [--deal-value DEAL_VALUE]
                                  input_file

positional arguments:
  input_file            Path to JSON file with deal parameters

options:
  -h, --help            Show help message and exit
  --json                Output results as JSON
  --deal-value DEAL_VALUE
                        Override deal value in dollars
```

**Outputs:** 7-dimension complexity breakdown (value, regulatory, technical, multi-party, duration, strategic importance, IP sensitivity), composite score, deal tier (1-5), recommended timeline, expected negotiation rounds, and key focus areas.

---

## vendor-due-diligence

Source path: `references/legal/vendor-due-diligence/SKILL.md`

> **⚠️ EXPERIMENTAL** — This skill is provided for educational and informational purposes only. It does NOT constitute legal advice. All responsibility for usage rests with the user. Consult qualified legal professionals before acting on any output.

# Vendor Due Diligence Skill

## Overview

Production-ready framework for assessing IT service providers, technology vendors, and third-party partners. Provides a Three-Phase Assessment (Initial Screening, Detailed Assessment, Final Evaluation), Multi-Factor Risk Scoring across 6 dimensions with critical-service weighting, regulatory compliance checklists for 8 frameworks, vendor comparison matrices, and ongoing monitoring with Early Warning Indicators. Designed for procurement teams, legal counsel, IT security, and compliance officers evaluating technology vendors.

## Table of Contents

- [Tools](#tools)
- [Reference Guides](#reference-guides)
- [Workflows](#workflows)
- [Troubleshooting](#troubleshooting)
- [Success Criteria](#success-criteria)
- [Scope & Limitations](#scope--limitations)
- [Anti-Patterns](#anti-patterns)
- [Tool Reference](#tool-reference)

## Clarify First

Before scoring the vendor, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Is the service critical/essential** — the `--critical` flag applies a 2x weight to security and compliance, which can flip the composite score and the Approve/Reject recommendation
- [ ] **Applicable regulatory frameworks** — GDPR, DORA, NIS2, SOX, PCI DSS, ISO 27001/SOC 2, HIPAA, FedRAMP — selects which compliance checklists run
- [ ] **Questionnaire responses + independent evidence** — the 6-dimension scores; self-reported-only data inflates scores, so confirm whether SOC 2 / pen-test / financial evidence backs them

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the assessment.

## Tools

### 1. Vendor Risk Scorer (`scripts/vendor_risk_scorer.py`)

Scores a vendor across 6 risk dimensions based on questionnaire responses. Calculates weighted composite score with 2x multiplier for critical services. Generates risk heat map and overall recommendation.

```bash
# Score a vendor from questionnaire responses
python scripts/vendor_risk_scorer.py vendor_responses.json

# JSON output for dashboards
python scripts/vendor_risk_scorer.py vendor_responses.json --json

# Flag as critical service (2x weight on security + compliance)
python scripts/vendor_risk_scorer.py vendor_responses.json --critical
```

### 2. Vendor Comparison (`scripts/vendor_comparison.py`)

Takes multiple vendor risk assessment JSONs and generates a side-by-side comparison matrix. Ranks vendors by composite score and recommends preferred vendor with rationale.

```bash
# Compare two vendors
python scripts/vendor_comparison.py vendor_a.json vendor_b.json

# Compare multiple vendors with JSON output
python scripts/vendor_comparison.py vendor_a.json vendor_b.json vendor_c.json --json

# Compare with critical service weighting
python scripts/vendor_comparison.py vendor_a.json vendor_b.json --critical
```

## Reference Guides

| Reference | Purpose |
|-----------|---------|
| `references/risk_assessment_framework.md` | 6-dimension scoring system, weighting methodology, composite score interpretation |
| `references/regulatory_checklists.md` | Pre-built compliance checklists for GDPR, DORA, NIS2, SOX, PCI DSS, ISO 27001/SOC 2, HIPAA, FedRAMP |
| `references/monitoring_framework.md` | Quarterly reviews, Early Warning Indicators, KPI metrics, risk mitigation strategies, onboarding checklists |

## Workflows

### Workflow 1: Three-Phase Vendor Assessment

**Phase 1: Initial Screening (Days 1-5)**
1. Gather basic vendor information (company profile, financial health, certifications)
2. Run `vendor_risk_scorer.py` with preliminary data for initial risk classification
3. Check applicable regulatory frameworks from `regulatory_checklists.md`
4. Decision gate: Proceed to detailed assessment or reject early

**Phase 2: Detailed Assessment (Days 5-15)**
1. Issue comprehensive vendor questionnaire covering all 6 risk dimensions
2. Run `vendor_risk_scorer.py` with complete questionnaire responses
3. Execute regulatory compliance checklists for all applicable frameworks
4. Request supporting documentation (SOC 2 reports, pen test results, financials)
5. Conduct reference checks and public record searches

**Phase 3: Final Evaluation (Days 15-20)**
1. Run `vendor_comparison.py` if evaluating multiple vendors
2. Compile Vendor Risk Report with dimension breakdowns
3. Document gaps and required mitigations from `risk_assessment_framework.md`
4. Present recommendation (Approve / Approve with Conditions / Reject)
5. If approved, generate onboarding checklist from `monitoring_framework.md`

### Workflow 2: Competitive Vendor Selection

1. **Define requirements** -- Document must-have and nice-to-have criteria mapped to risk dimensions
2. **Screen candidates** -- Run initial scoring on all candidates; eliminate any with Critical risk
3. **Deep-dive finalists** -- Full 6-dimension assessment on top 2-3 vendors
4. **Compare** -- Run `vendor_comparison.py` on finalist assessments
5. **Negotiate** -- Use risk findings as leverage in contract negotiations (integrates with `tech-contract-negotiation` skill)
6. **Select and onboard** -- Approve preferred vendor; set up monitoring per `monitoring_framework.md`

### Workflow 3: Ongoing Vendor Monitoring

1. **Quarterly review** -- Re-score vendor using updated data; compare against baseline
2. **Event-triggered review** -- Re-assess on M&A, breaches, regulatory changes, or leadership turnover
3. **Annual re-assessment** -- Full 6-dimension re-evaluation with updated questionnaire
4. **Early Warning response** -- Monitor indicators from `monitoring_framework.md`; escalate per defined paths
5. **Exit planning** -- If risk exceeds threshold, activate exit provisions and dual-source strategy

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| All dimensions score 1 (Low Risk) | Vendor self-reported optimistically on questionnaire | Cross-reference with SOC 2 reports, pen test results, and financial filings; adjust scores based on evidence |
| Composite score doesn't reflect known security issues | Security dimension not weighted for critical service | Re-run with `--critical` flag to apply 2x multiplier on security and compliance dimensions |
| Comparison matrix shows all vendors tied | Scoring inputs are too similar or too coarse | Request more granular data; use the 5-level scoring criteria from the risk framework to differentiate |
| Regulatory checklist seems incomplete for your industry | Only 8 frameworks are pre-built | Customize checklists by adding industry-specific requirements as additional items |
| Vendor refuses to complete questionnaire | Vendor sees assessment as overly burdensome | Share only the dimensions relevant to their service scope; offer to accept SOC 2/ISO 27001 reports as partial substitutes |
| Risk score changed dramatically between quarters | Major event occurred (breach, M&A, leadership change) | This is expected behavior; document the trigger event and follow the event-triggered review process |

## Success Criteria

- **Assessment Completeness**: 100% of vendor assessments cover all 6 risk dimensions with evidence-backed scores
- **Timeline Adherence**: Three-phase assessment completed within 20 business days for 90% of evaluations
- **Risk Prediction Accuracy**: Vendors flagged as High/Critical risk experience 3x more incidents than Low risk vendors over 12 months
- **Regulatory Coverage**: All applicable regulatory checklists completed with zero missed frameworks for 95% of assessments
- **Comparison Consistency**: Vendor comparison rankings remain stable when re-scored by different assessors (inter-rater reliability > 85%)
- **Monitoring Compliance**: 100% of quarterly reviews completed on schedule with documented findings
- **Early Warning Detection**: 80%+ of vendor incidents preceded by at least one Early Warning Indicator flagged in monitoring

## Scope & Limitations

**This skill covers:**
- Multi-factor risk scoring across 6 dimensions (Financial, Operational, Compliance, Security, Reputational, Strategic) with critical-service weighting
- Regulatory compliance checklists for GDPR, DORA, NIS2, SOX, PCI DSS, ISO 27001/SOC 2, HIPAA, and FedRAMP
- Side-by-side vendor comparison with composite ranking and dimension-level analysis
- Ongoing monitoring framework with quarterly reviews, Early Warning Indicators, and escalation paths
- Risk mitigation strategies and onboarding checklists by risk level

**This skill does NOT cover:**
- Real-time vendor monitoring dashboards, automated data feeds, or integration with GRC platforms (all input is via JSON files)
- Financial auditing, forensic accounting, or detailed financial statement analysis of vendors (use the `finance/financial-analyst` skill)
- Physical security assessments, on-site facility audits, or hardware supply chain verification
- Legal review of vendor contracts or negotiation of terms (use the `legal/tech-contract-negotiation` skill)
- Vendor relationship management, performance optimization, or strategic partnership development beyond risk assessment

## Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
|--------------|-------------|-----------------|
| Relying solely on vendor self-assessment questionnaires | Vendors underreport risks; no independent verification | Cross-reference questionnaire responses with SOC 2/ISO 27001 reports, pen test results, and public records |
| Applying the same weight to all dimensions regardless of service type | A payroll vendor and a marketing tool have different risk profiles | Use `--critical` flag for critical services; adjust dimension weights based on service classification |
| Completing due diligence once and never revisiting | Vendor risk changes over time due to M&A, breaches, market shifts | Implement quarterly monitoring with annual re-assessment per the monitoring framework |
| Rejecting vendors for a single high-risk dimension without considering mitigations | Eliminates potentially strong vendors with addressable gaps | Use the gap analysis severity classification; require remediation plans for major concerns before final decision |
| Skipping the comparison matrix for sole-source procurements | Misses opportunity to benchmark the vendor against market standards | Run comparison against industry benchmarks or previous vendor assessments to establish a risk baseline |

## Tool Reference

### `scripts/vendor_risk_scorer.py`

Score a vendor across 6 risk dimensions and generate an overall recommendation.

```
usage: vendor_risk_scorer.py [-h] [--json] [--critical]
                              input_file

positional arguments:
  input_file            Path to JSON file with vendor questionnaire responses

options:
  -h, --help            Show help message and exit
  --json                Output results as JSON
  --critical            Apply 2x weight to security and compliance
                        dimensions (for critical/essential services)
```

**Outputs:** 6-dimension risk scores (1-5 each), weighted composite score, risk level classification (Low/Moderate/High/Critical), overall recommendation (Approve/Approve with Conditions/Reject), dimension-level findings, and gap analysis.

### `scripts/vendor_comparison.py`

Compare multiple vendors side-by-side and recommend preferred vendor.

```
usage: vendor_comparison.py [-h] [--json] [--critical]
                             input_files [input_files ...]

positional arguments:
  input_files           Paths to vendor assessment JSON files (minimum 2)

options:
  -h, --help            Show help message and exit
  --json                Output results as JSON
  --critical            Apply 2x weight to security and compliance
                        dimensions (for critical/essential services)
```

**Outputs:** Side-by-side comparison matrix, composite score ranking, per-dimension strength/weakness analysis, preferred vendor recommendation with rationale, and risk delta highlights.

---

## whistleblower-compliance

Source path: `references/legal/whistleblower-compliance/SKILL.md`

> **⚠️ EXPERIMENTAL** — This skill is provided for educational and informational purposes only. It does NOT constitute legal advice. All responsibility for usage rests with the user. Consult qualified legal professionals before acting on any output.

# Whistleblower Compliance Skill

## Overview

Production-ready whistleblower compliance toolkit for auditing existing reporting systems and drafting compliant policies. Covers EU Directive 2019/1937, US SOX Section 806, US Dodd-Frank, and UK Public Interest Disclosure Act 1998. Operates in two modes: Mode A (Assessment) runs an 8-phase, 56-checkpoint audit of existing systems; Mode B (Drafting) generates jurisdiction-specific reporting policies.

## Table of Contents

- [Tools](#tools)
- [Reference Guides](#reference-guides)
- [Workflows](#workflows)
- [Troubleshooting](#troubleshooting)
- [Success Criteria](#success-criteria)
- [Scope & Limitations](#scope--limitations)
- [Anti-Patterns](#anti-patterns)
- [Tool Reference](#tool-reference)

## Clarify First

Before generating output, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Mode: assess an existing system or draft a policy** — Mode A runs a 56-checkpoint audit with gap scoring; Mode B produces a policy skeleton — completely different artifacts
- [ ] **Jurisdiction** — EU, US, or UK — sets which regulation's requirements, thresholds, and timelines apply (EU 7-day ack / 3-month feedback vs SOX 180-day filing)
- [ ] **Headcount + org type** — EU thresholds differ (private 50+, public sector all); determines applicability and which sections are mandatory
- [ ] **Sector** — financial, healthcare, defense, nuclear, transport — triggers the Phase 8 sector-specific requirements

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the output.

## Tools

### 1. Compliance Checker (`scripts/whistleblower_compliance_checker.py`)

Assess an existing whistleblower system against regulatory requirements. Takes organizational parameters and outputs a compliance score with priority-classified gaps.

```bash
python scripts/whistleblower_compliance_checker.py \
  --jurisdiction EU --headcount 300 --sector financial \
  --channels internal,external --has-designated-person \
  --has-confidentiality --has-gdpr-measures --has-dissemination

python scripts/whistleblower_compliance_checker.py \
  --jurisdiction US --headcount 5000 --sector healthcare \
  --channels internal --json

python scripts/whistleblower_compliance_checker.py \
  --jurisdiction UK --headcount 50 --sector technology \
  --channels none
```

### 2. Policy Scaffolder (`scripts/whistleblower_policy_scaffolder.py`)

Generate a whistleblower policy skeleton pre-populated with required sections per regulatory framework.

```bash
python scripts/whistleblower_policy_scaffolder.py \
  --jurisdiction EU --org-type private --headcount 500 \
  --org-name "Acme Corp"

python scripts/whistleblower_policy_scaffolder.py \
  --jurisdiction US --org-type public --headcount 10000 \
  --org-name "MegaCorp Inc" --json

python scripts/whistleblower_policy_scaffolder.py \
  --jurisdiction UK --org-type nonprofit --headcount 100 \
  --org-name "CharityOrg" --output policy-draft.md
```

## Reference Guides

| Reference | Purpose |
|-----------|---------|
| `references/regulatory_framework.md` | Multi-jurisdiction whistleblower regulations, comparison matrix |
| `references/assessment_checklist.md` | 8-phase, 56-checkpoint assessment with priority classifications |

## Workflows

### Mode A: Assessment Workflow

1. **Gather Parameters** -- Collect jurisdiction, headcount, sector, and system description
2. **Run Compliance Checker** -- Execute `whistleblower_compliance_checker.py` with parameters
3. **Review Gaps** -- Prioritize CRITICAL gaps first, then IMPORTANT, then IMPROVEMENT
4. **Cross-Reference Checklist** -- Walk through `assessment_checklist.md` for manual verification
5. **Generate Remediation Plan** -- Address gaps by priority, set deadlines per regulatory timelines

### Mode B: Drafting Workflow

1. **Determine Jurisdiction** -- Identify applicable regulations based on headquarters and operations
2. **Generate Scaffold** -- Run `whistleblower_policy_scaffolder.py` with organization details
3. **Customize Sections** -- Replace placeholders with organization-specific information
4. **Legal Review** -- Route draft through legal counsel for jurisdiction-specific validation
5. **Approval & Publication** -- Obtain board/management approval and disseminate to all personnel

### 8-Phase Assessment Framework

| Phase | Focus | Checkpoints |
|-------|-------|-------------|
| 1. Applicability | Regulatory scope determination | 3 |
| 2. Reception Channel | Reporting channel adequacy | 5 |
| 3. Designated Persons | Personnel and independence | 7 |
| 4. Verification/Processing | Investigation procedures | 8 |
| 5. Confidentiality | Identity and data protection | 9 |
| 6. Dissemination/Information | Awareness and accessibility | 10 |
| 7. Data Protection/GDPR | Privacy compliance | 12 |
| 8. Sector-Specific | Industry requirements | 6 |
| **Total** | | **60** |

### Three Reporting Channels

| Channel | When Used | Key Requirements |
|---------|-----------|-----------------|
| Internal | First preference; report to organization | Acknowledge within 7 days; feedback within 3 months |
| External (Regulatory) | When internal fails or is inappropriate | Report to competent authority; same protections apply |
| Public Disclosure | Last resort; imminent danger or retaliation | Protected only if internal/external channels exhausted |

### Whistleblower Protections

| Protection | Description |
|------------|-------------|
| Civil immunity | No liability for breach of confidentiality obligations |
| Criminal immunity | No criminal liability for acquiring reported information |
| Prohibited retaliation | Dismissal, demotion, harassment, blacklisting, discrimination |
| Burden of proof reversal | Employer must prove action was not retaliatory |
| Interim relief | Provisional protection during investigation |
| Legal aid access | Access to legal counsel and support |

### Priority Classification

| Priority | Definition | Example |
|----------|-----------|---------|
| CRITICAL | Legal non-compliance; immediate regulatory risk | No reporting channel exists; no confidentiality measures |
| IMPORTANT | Significant gap reducing system effectiveness | Acknowledgment timeline exceeds 7 days; no designated person |
| IMPROVEMENT | Enhancement opportunity; not currently non-compliant | Training frequency below best practice; limited channel types |

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Checker reports all CRITICAL | No system parameters provided | Provide accurate `--channels`, `--has-designated-person`, and other flags |
| Wrong jurisdiction requirements | Multi-jurisdiction entity using single jurisdiction | Run checker separately per jurisdiction; use strictest requirements |
| Policy scaffold missing sections | Jurisdiction flag incorrect | Verify `--jurisdiction` matches EU, US, or UK |
| Headcount threshold confusion | EU directive has different thresholds by entity type | Private sector: 50+ employees; public sector: all municipalities |
| Sector-specific gaps not flagged | Generic sector value used | Use specific sector: `financial`, `healthcare`, `defense`, `nuclear` |
| GDPR checks fail for US entity | US entities may still need GDPR compliance | If processing EU citizen data, add `--has-gdpr-measures` |
| Timeline requirements unclear | Different jurisdictions have different timelines | EU: 7-day ack, 3-month feedback; SOX: 180-day filing deadline |
| Policy output too generic | Minimal parameters provided | Add `--org-name`, `--org-type`, and `--headcount` for specificity |

## Success Criteria

- **Compliance Coverage**: Assessment covers 100% of applicable regulatory requirements for specified jurisdiction
- **Gap Identification**: All CRITICAL and IMPORTANT gaps identified with clear remediation guidance
- **Policy Completeness**: Generated policies include all mandatory sections per applicable regulation
- **Timeline Compliance**: Policies reflect correct acknowledgment (7 days) and feedback (3 months) timelines
- **Audit Readiness**: Assessment output sufficient for regulatory audit preparation and evidence gathering

## Scope & Limitations

**This skill covers:**
- Compliance assessment against EU Directive 2019/1937, US SOX/Dodd-Frank, UK PIDA
- Policy scaffolding with jurisdiction-specific mandatory sections
- Gap analysis with priority classification and remediation guidance
- Multi-sector considerations (financial, healthcare, defense, nuclear, transport)

**This skill does NOT cover:**
- Actual whistleblower case management or investigation procedures
- Legal advice or attorney-client privileged analysis
- Real-time regulatory monitoring or automatic updates when laws change
- Whistleblower hotline software implementation or vendor selection
- Cross-border reporting coordination between multiple regulators

## Anti-Patterns

| Anti-Pattern | Why It Fails | Better Approach |
|--------------|-------------|-----------------|
| Copy-pasting policy from another jurisdiction | Regulations differ materially; EU requires 7-day ack, SOX has 180-day filing | Run scaffolder with correct jurisdiction; customize per local requirements |
| Treating all gaps as equal priority | Wastes resources on improvements while CRITICAL gaps remain | Address CRITICAL first, IMPORTANT second, IMPROVEMENT last |
| Single assessment for multi-jurisdiction org | Each jurisdiction has unique requirements and thresholds | Run separate assessments per jurisdiction; merge into unified policy |
| Skipping sector-specific phase | Regulated sectors (financial, healthcare) have additional requirements | Always complete Phase 8 for regulated industries |
| No periodic reassessment | Regulations evolve; transposition deadlines pass | Schedule annual reassessment; monitor legislative changes |

## Tool Reference

### `scripts/whistleblower_compliance_checker.py`

Assess whistleblower system compliance against regulatory requirements.

```
usage: whistleblower_compliance_checker.py [-h] [--json]
                                           --jurisdiction {EU,US,UK}
                                           --headcount HEADCOUNT
                                           --sector SECTOR
                                           [--channels CHANNELS]
                                           [--has-designated-person]
                                           [--has-confidentiality]
                                           [--has-gdpr-measures]
                                           [--has-dissemination]
                                           [--has-acknowledgment-timeline]
                                           [--has-feedback-timeline]

options:
  -h, --help            Show help message and exit
  --json                Output in JSON format
  --jurisdiction        Regulatory jurisdiction: EU, US, or UK
  --headcount           Number of employees in the organization
  --sector              Industry sector (financial, healthcare, technology, etc.)
  --channels            Comma-separated channel types: internal, external, none
  --has-designated-person  Designated person(s) appointed for handling reports
  --has-confidentiality    Confidentiality measures in place
  --has-gdpr-measures      GDPR/data protection measures implemented
  --has-dissemination      Policy disseminated to all personnel
  --has-acknowledgment-timeline  7-day acknowledgment timeline met
  --has-feedback-timeline  3-month feedback timeline met
```

### `scripts/whistleblower_policy_scaffolder.py`

Generate jurisdiction-specific whistleblower policy skeleton.

```
usage: whistleblower_policy_scaffolder.py [-h] [--json]
                                          --jurisdiction {EU,US,UK}
                                          --org-type {public,private,nonprofit}
                                          --headcount HEADCOUNT
                                          [--org-name ORG_NAME]
                                          [--output OUTPUT]

options:
  -h, --help            Show help message and exit
  --json                Output in JSON format
  --jurisdiction        Regulatory jurisdiction: EU, US, or UK
  --org-type            Organization type
  --headcount           Number of employees
  --org-name            Organization name (used in policy template)
  --output              Write policy to file instead of stdout
```
