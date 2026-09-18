# Domain: ra-qm-team
Source Skills in this domain: 27

---

## ai-act-readiness

Source path: `references/ra-qm-team/audit-prep/ai-act-readiness/SKILL.md`

# EU AI Act Readiness

Operational playbook for EU AI Act compliance readiness — focused on the sprint to demonstrate readiness for the Aug 2026 high-risk AI deadline and ongoing conformity assessments.

When to use this skill vs. eu-ai-act-specialist:
- **This skill**: assessment imminent; need readiness sprint
- **eu-ai-act-specialist**: building AI Act compliance program; classifying systems; designing conformity processes

---

## When to use this skill

| Situation | Skill applies |
|-----------|---------------|
| Aug 2026 high-risk deadline approaching | Yes — readiness sprint |
| Notified body conformity assessment scheduled | Yes — full prep |
| GPAI model obligations apply (Aug 2025+) | Yes — GPAI-specific checklist |
| Annual readiness review | Yes — periodic sprint |
| Building AI Act program from scratch | Use `ra-qm-team/eu-ai-act-specialist` |
| AI system classification | Use `ra-qm-team/eu-ai-act-specialist` |

---

## Key AI Act timelines

| Date | Requirement |
|------|-------------|
| Aug 2, 2024 | AI Act enters into force |
| Feb 2, 2025 | Prohibited practices effective; AI literacy requirements |
| Aug 2, 2025 | GPAI provider obligations effective |
| Aug 2, 2026 | Most high-risk AI requirements effective |
| Aug 2, 2027 | All high-risk AI requirements + product safety harmonization |

---

## The readiness sprint

### 8-week sprint (high-risk system, conformity assessment prep)

```
Week 1-2: System classification confirmation; gap analysis
Week 3-5: Documentation buildout (technical file, risk management, data governance)
Week 6-7: Conformity assessment internal dry-run
Week 8: External notified-body engagement / assessment
```

### 4-week sprint (GPAI obligations)

```
Week 1: System classification (provider/deployer/importer/etc.)
Week 2: Documentation prep (model card, training data summary, copyright compliance)
Week 3: Risk assessment + transparency obligations
Week 4: Submission / publication of required information
```

---

## Critical AI Act areas

### Risk classification

Per Article 6 / Annex III, AI systems classify into risk categories:

| Category | Examples | Requirements |
|----------|----------|--------------|
| **Prohibited** | Social scoring; behavior manipulation of vulnerable groups | Cannot deploy |
| **High-risk** | Biometric ID; critical infrastructure; education; employment; access to essential services; law enforcement | Comprehensive obligations |
| **Limited-risk (transparency)** | Chatbots; deepfakes; emotion recognition | Disclosure obligation |
| **Minimal-risk** | Most enterprise AI; spam filters | Voluntary code of conduct |
| **GPAI** | Large language models; foundation models | Separate obligations (Article 51+) |

### High-risk system requirements (Articles 9-15, plus 16-22)

| Requirement | Article |
|-------------|---------|
| Risk management system | Art. 9 |
| Data governance + quality | Art. 10 |
| Technical documentation | Art. 11 |
| Record-keeping (logging) | Art. 12 |
| Transparency to users | Art. 13 |
| Human oversight | Art. 14 |
| Accuracy, robustness, cybersecurity | Art. 15 |
| Quality management system | Art. 17 |
| Conformity assessment | Art. 43 |
| Registration in EU database | Art. 71 |
| Post-market monitoring | Art. 72 |
| Serious incident reporting | Art. 73 |

### GPAI provider obligations (Article 53+)

| Requirement | Detail |
|-------------|--------|
| Technical documentation | Per Annex XI |
| Training data summary (public) | Sufficiently detailed |
| Copyright compliance | Honor opt-outs from text/data mining |
| Information to downstream providers | Enable downstream compliance |
| Code of practice compliance | (Optional but presumed conformity) |

### GPAI with systemic risk (Article 55, models > 10^25 FLOPs training compute)

Additional requirements:
- Model evaluations
- Adversarial testing
- Systemic risk assessment + mitigation
- Serious incident reporting
- Cybersecurity protection

---

## Clarify First

Before running the readiness assessment, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **AI system risk class** — high-risk (Annex III), GPAI, or limited-risk (determines whether to run the 8-week high-risk sprint or the 4-week GPAI sprint, and which checklist applies)
- [ ] **Trigger event** — Aug 2026 high-risk deadline, scheduled notified-body conformity assessment, GPAI obligations, or annual review (sets sprint length and scope)
- [ ] **Your role** — provider, deployer, or importer (determines which obligation set is assessed)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the assessment.

## Quick start

1. **Run readiness score**: `python3 scripts/ai_act_readiness_score.py --config ai-system.yaml`
2. **Check GPAI obligations (if applicable)**: `python3 scripts/gpai_obligation_checker.py --model model.yaml`
3. **Pick sprint length** based on score + system risk class
4. **Execute sprint** per [references/ai-act-readiness-checklist.md](references/ai-act-readiness-checklist.md)

---

## Common AI Act readiness failures

- **Misclassification**: deploying system as "limited-risk" when it's actually "high-risk" (Annex III)
- **Risk management as one-time**: AI Act requires continuous risk management
- **Data governance gaps**: training data without representativeness analysis
- **Logging missing**: post-market monitoring requires logs you don't have
- **Human oversight theater**: oversight that can't actually intervene
- **GPAI training data summary missing**: required since Aug 2025
- **No conformity assessment plan**: assuming notified body assessment is automatic
- **AI literacy training skipped**: required for staff working with AI systems

---

## Tooling

| Script | Purpose |
|--------|---------|
| `scripts/ai_act_readiness_score.py` | Score current AI Act readiness per system |
| `scripts/gpai_obligation_checker.py` | Validate GPAI provider obligations (Article 53+) |

---

## References

- [ai-act-readiness-checklist.md](references/ai-act-readiness-checklist.md) — full punch list per requirement
- [high-risk-system-readiness-playbook.md](references/high-risk-system-readiness-playbook.md) — high-risk-specific deep prep

---

## Related skills

- `ra-qm-team/eu-ai-act-specialist` — deep AI Act program management
- `ra-qm-team/iso42001-ai-management` — ISO 42001 AIMS (companion AI governance)
- `ra-qm-team/audit-prep/aims-audit` — AIMS audit-prep variant
- `ra-qm-team/audit-prep/gdpr-audit-prep` — GDPR overlay for AI processing personal data
- `ra-qm-team/audit-prep/compliance-readiness` — multi-framework readiness

---

## aims-audit

Source path: `references/ra-qm-team/audit-prep/aims-audit/SKILL.md`

# AIMS Audit Prep (ISO 42001)

Operational playbook for ISO 42001:2023 AI Management System (AIMS) audit preparation. Whether targeting initial certification, surveillance audit, or annual internal audit.

When to use this skill vs. iso42001-ai-management:
- **This skill**: audit imminent; need readiness sprint
- **iso42001-ai-management**: building AIMS from scratch; multi-quarter program

---

## When to use this skill

| Situation | Skill applies |
|-----------|---------------|
| ISO 42001 Stage 1 audit scheduled | Yes — documentation review prep |
| Stage 2 (onsite/operational) audit | Yes — operational evidence sprint |
| Annual surveillance audit | Yes — surveillance prep |
| Internal AIMS audit | Yes — internal audit playbook |
| AI Impact Assessment for new system | Yes — `scripts/ai_impact_assessment_checker.py` |
| Building AIMS from scratch | Use `ra-qm-team/iso42001-ai-management` |

---

## ISO 42001 audit structure

### Stage 1 (documentation review)

- Auditor reviews AIMS documentation (typically 1-3 days)
- Confirms scope, applicability, key documents present
- Identifies gaps before Stage 2
- Typically 2-3 weeks before Stage 2

### Stage 2 (operational assessment)

- Auditor onsite (or remote) verifies AIMS operating effectively
- 3-10 days depending on scope + system count
- Walkthroughs, interviews, evidence sampling
- Conclusion: certification recommended (subject to non-conformity closure) or not

### Surveillance audits

- Annual; reduced scope vs initial
- Typically 1-3 days
- Focus on high-risk areas + changes since prior audit

### Re-certification (year 3)

- Full audit; similar to initial
- Typically every 3 years

---

## AIMS audit-prep sprint

### 4-week sprint (mature AIMS, surveillance audit)

```
Week 1: Internal audit + gap analysis
Week 2: Remediation + AI inventory refresh
Week 3: Documentation review + walkthrough rehearsal
Week 4: Auditor onsite
```

### 8-week sprint (Stage 1 + Stage 2 initial certification)

```
Weeks 1-3: AIMS documentation completion (Annex A controls coverage)
Weeks 4-5: Stage 1 audit + gap closure
Weeks 6-7: Stage 2 operational evidence prep + mock walkthroughs
Week 8: Stage 2 audit
```

---

## ISO 42001 clauses + Annex A controls

### Clauses (4-10): management system

| Clause | Topic |
|--------|-------|
| 4 | Context of the organization |
| 5 | Leadership |
| 6 | Planning (including AI risk + AI objectives) |
| 7 | Support (resources, competence, awareness, communication, documentation) |
| 8 | Operation (AI lifecycle, supplier relationships) |
| 9 | Performance evaluation (monitoring, internal audit, management review) |
| 10 | Improvement (nonconformity, continual improvement) |

### Annex A controls (10 areas)

| Annex A area | Topics |
|--------------|--------|
| A.2 | Policies related to AI |
| A.3 | Internal organization |
| A.4 | Resources for AI systems |
| A.5 | Assessing impacts of AI systems |
| A.6 | AI system lifecycle |
| A.7 | Data for AI systems |
| A.8 | Information for interested parties |
| A.9 | Use of AI systems |
| A.10 | Third-party relationships |

---

## Critical audit areas

### AI Inventory + Impact Assessments

| Item | Evidence | Common gap |
|------|----------|------------|
| Complete AI system inventory | Inventory document | Shadow AI not captured |
| AI Impact Assessment (AIIA) per system | Per-system AIIA | Skipped for "low-risk" systems |
| AIIA reviewed periodically | Review records | One-time only |
| Risk classification of systems | Per system | Not documented |

### AI Policy + Governance

| Item | Evidence | Common gap |
|------|----------|------------|
| AI policy approved + dated | Signed policy | Not signed / stale |
| AI ethics principles | Documented principles | Generic; not actionable |
| AI governance body | Charter / minutes | Not formalized |
| Roles + responsibilities | RACI | Not defined |

### AI Lifecycle Management (Annex A.6)

| Item | Evidence | Common gap |
|------|----------|------------|
| AI development lifecycle defined | Process documentation | Not formalized |
| Data quality controls | Per system | Generic only |
| Model validation procedures | Per system | Validation skipped |
| AI system testing | Per system | Inadequate testing |
| Deployment controls | Per system | No controls |
| Operational monitoring | Per system | Drift not monitored |
| Decommissioning procedures | Per system | Not defined |

### Data Governance (Annex A.7)

| Item | Evidence | Common gap |
|------|----------|------------|
| Data sources documented | Per system | Vague |
| Data quality assessed | Quality metrics | Not measured |
| Data lineage tracked | Documentation | Untracked |
| Sensitive data protection | Controls | Insufficient |

### Third-party AI (Annex A.10)

| Item | Evidence | Common gap |
|------|----------|------------|
| Third-party AI inventory | List | Incomplete |
| Vendor due diligence for AI | Per vendor | Generic IT only |
| Contract terms for AI vendors | AI-specific clauses | Standard MSA only |

---

## Clarify First

Before running the audit-prep, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Audit type and stage** — Stage 1 documentation review, Stage 2 operational, surveillance, or internal (sets sprint length and whether the focus is documentation or operational evidence)
- [ ] **AIMS maturity** — mature system vs building from gaps (picks the 4-week vs 8-week sprint)
- [ ] **AI systems in scope** — which systems and how many (drives the AIIA count and Annex A coverage)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the readiness assessment.

## Quick start

1. **Run readiness score**: `python3 scripts/aims_readiness_score.py --config aims-controls.yaml`
2. **Check AIIA per system**: `python3 scripts/ai_impact_assessment_checker.py --aiia system-aiia.yaml`
3. **Pick sprint length** based on score
4. **Execute sprint** per [references/iso42001-aims-readiness-checklist.md](references/iso42001-aims-readiness-checklist.md)

---

## Common AIMS audit findings

- **AI inventory incomplete** — shadow AI not captured
- **AIIA missing** for systems that look "small" but have impact
- **AI lifecycle process** not implemented (designed only)
- **Data governance generic** — not AI-specific
- **Performance monitoring missing** — drift not detected
- **AI policy stale** — written before current AI deployment
- **Third-party AI vendors** not assessed
- **Continual improvement** not evidenced

---

## Tooling

| Script | Purpose |
|--------|---------|
| `scripts/aims_readiness_score.py` | Score AIMS readiness per clause + Annex A area |
| `scripts/ai_impact_assessment_checker.py` | Validate AI Impact Assessment completeness |

---

## References

- [iso42001-aims-readiness-checklist.md](references/iso42001-aims-readiness-checklist.md) — punch list per clause + Annex A
- [aims-internal-audit-playbook.md](references/aims-internal-audit-playbook.md) — internal audit execution playbook

---

## Related skills

- `ra-qm-team/iso42001-ai-management` — deep ISO 42001 AIMS program management
- `ra-qm-team/eu-ai-act-specialist` — EU AI Act regulatory companion
- `ra-qm-team/audit-prep/ai-act-readiness` — AI Act audit-prep variant
- `ra-qm-team/audit-prep/compliance-readiness` — multi-framework readiness

---

## capa-officer

Source path: `references/ra-qm-team/capa-officer/SKILL.md`

# CAPA Officer

Corrective and Preventive Action (CAPA) management within Quality Management Systems, focusing on systematic root cause analysis, action implementation, and effectiveness verification.

---

## Table of Contents

- [CAPA Investigation Workflow](#capa-investigation-workflow)
- [Root Cause Analysis](#root-cause-analysis)
- [Corrective Action Planning](#corrective-action-planning)
- [Effectiveness Verification](#effectiveness-verification)
- [CAPA Metrics and Reporting](#capa-metrics-and-reporting)
- [Reference Documentation](#reference-documentation)
- [Tools](#tools)

---

## Clarify First

Before starting a CAPA investigation, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Trigger event and objective evidence** — what happened, where/when, and what records exist (drives the problem statement and RCA scope)
- [ ] **Severity classification** — Critical, Major, or Minor (sets investigation team composition, action depth, and verification timeline)
- [ ] **Source** — complaint, audit finding, recurring NC, or trend (determines whether a CAPA is required and the regulatory linkage)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the CAPA record.

## CAPA Investigation Workflow

Conduct systematic CAPA investigation from initiation through closure:

1. Document trigger event with objective evidence
2. Assess significance and determine CAPA necessity
3. Form investigation team with relevant expertise
4. Collect data and evidence systematically
5. Select and apply appropriate RCA methodology
6. Identify root cause(s) with supporting evidence
7. Develop corrective and preventive actions
8. **Validation:** Root cause explains all symptoms; if eliminated, problem would not recur

### CAPA Necessity Determination

| Trigger Type | CAPA Required | Criteria |
|--------------|---------------|----------|
| Customer complaint (safety) | Yes | Any complaint involving patient/user safety |
| Customer complaint (quality) | Evaluate | Based on severity and frequency |
| Internal audit finding (Major) | Yes | Systematic failure or absence of element |
| Internal audit finding (Minor) | Recommended | Isolated lapse or partial implementation |
| Nonconformance (recurring) | Yes | Same NC type occurring 3+ times |
| Nonconformance (isolated) | Evaluate | Based on severity and risk |
| External audit finding | Yes | All Major and Minor findings |
| Trend analysis | Evaluate | Based on trend significance |

### Investigation Team Composition

| CAPA Severity | Required Team Members |
|---------------|----------------------|
| Critical | CAPA Officer, Process Owner, QA Manager, Subject Matter Expert, Management Rep |
| Major | CAPA Officer, Process Owner, Subject Matter Expert |
| Minor | CAPA Officer, Process Owner |

### Evidence Collection Checklist

- [ ] Problem description with specific details (what, where, when, who, how much)
- [ ] Timeline of events leading to issue
- [ ] Relevant records and documentation
- [ ] Interview notes from involved personnel
- [ ] Photos or physical evidence (if applicable)
- [ ] Related complaints, NCs, or previous CAPAs
- [ ] Process parameters and specifications

---

## Root Cause Analysis

Select and apply appropriate RCA methodology based on problem characteristics.

### RCA Method Selection Decision Tree

```
Is the issue safety-critical or involves system reliability?
├── Yes → Use FAULT TREE ANALYSIS
└── No → Is human error the suspected primary cause?
    ├── Yes → Use HUMAN FACTORS ANALYSIS
    └── No → How many potential contributing factors?
        ├── 1-2 factors (linear causation) → Use 5 WHY ANALYSIS
        ├── 3-6 factors (complex, systemic) → Use FISHBONE DIAGRAM
        └── Unknown/proactive assessment → Use FMEA
```

### 5 Why Analysis

Use when: Single-cause issues with linear causation, process deviations with clear failure point.

**Template:**

```
PROBLEM: [Clear, specific statement]

WHY 1: Why did [problem] occur?
BECAUSE: [First-level cause]
EVIDENCE: [Supporting data]

WHY 2: Why did [first-level cause] occur?
BECAUSE: [Second-level cause]
EVIDENCE: [Supporting data]

WHY 3: Why did [second-level cause] occur?
BECAUSE: [Third-level cause]
EVIDENCE: [Supporting data]

WHY 4: Why did [third-level cause] occur?
BECAUSE: [Fourth-level cause]
EVIDENCE: [Supporting data]

WHY 5: Why did [fourth-level cause] occur?
BECAUSE: [Root cause]
EVIDENCE: [Supporting data]
```

**Example - Calibration Overdue:**

```
PROBLEM: pH meter (EQ-042) found 2 months overdue for calibration

WHY 1: Why was calibration overdue?
BECAUSE: Equipment was not on calibration schedule
EVIDENCE: Calibration schedule reviewed, EQ-042 not listed

WHY 2: Why was it not on the schedule?
BECAUSE: Schedule not updated when equipment was purchased
EVIDENCE: Purchase date 2023-06-15, schedule dated 2023-01-01

WHY 3: Why was the schedule not updated?
BECAUSE: No process requires schedule update at equipment purchase
EVIDENCE: SOP-EQ-001 reviewed, no such requirement

WHY 4: Why is there no such requirement?
BECAUSE: Procedure written before equipment tracking was centralized
EVIDENCE: SOP last revised 2019, equipment system implemented 2021

WHY 5: Why has procedure not been updated?
BECAUSE: Periodic review did not assess compatibility with new systems
EVIDENCE: No review against new equipment system documented

ROOT CAUSE: Procedure review process does not assess compatibility
with organizational systems implemented after original procedure creation.
```

### Fishbone Diagram Categories (6M)

| Category | Focus Areas | Typical Causes |
|----------|-------------|----------------|
| Man (People) | Training, competency, workload | Skill gaps, fatigue, communication |
| Machine (Equipment) | Calibration, maintenance, age | Wear, malfunction, inadequate capacity |
| Method (Process) | Procedures, work instructions | Unclear steps, missing controls |
| Material | Specifications, suppliers, storage | Out-of-spec, degradation, contamination |
| Measurement | Calibration, methods, interpretation | Instrument error, wrong method |
| Mother Nature | Temperature, humidity, cleanliness | Environmental excursions |

See `references/rca-methodologies.md` for complete method details and templates.

### Root Cause Validation

Before proceeding to action planning, validate root cause:

- [ ] Root cause can be verified with objective evidence
- [ ] If root cause is eliminated, problem would not recur
- [ ] Root cause is within organizational control
- [ ] Root cause explains all observed symptoms
- [ ] No other significant causes remain unaddressed

---

## Corrective Action Planning

Develop effective actions addressing identified root causes:

1. Define immediate containment actions
2. Develop corrective actions targeting root cause
3. Identify preventive actions for similar processes
4. Assign responsibilities and resources
5. Establish timeline with milestones
6. Define success criteria and verification method
7. Document in CAPA action plan
8. **Validation:** Actions directly address root cause; success criteria are measurable

### Action Types

| Type | Purpose | Timeline | Example |
|------|---------|----------|---------|
| Containment | Stop immediate impact | 24-72 hours | Quarantine affected product |
| Correction | Fix the specific occurrence | 1-2 weeks | Rework or replace affected items |
| Corrective | Eliminate root cause | 30-90 days | Revise procedure, add controls |
| Preventive | Prevent in other areas | 60-120 days | Extend solution to similar processes |

### Action Plan Components

```
ACTION PLAN TEMPLATE

CAPA Number: [CAPA-XXXX]
Root Cause: [Identified root cause]

ACTION 1: [Specific action description]
- Type: [ ] Containment [ ] Correction [ ] Corrective [ ] Preventive
- Responsible: [Name, Title]
- Due Date: [YYYY-MM-DD]
- Resources: [Required resources]
- Success Criteria: [Measurable outcome]
- Verification Method: [How success will be verified]

ACTION 2: [Specific action description]
...

IMPLEMENTATION TIMELINE:
Week 1: [Milestone]
Week 2: [Milestone]
Week 4: [Milestone]
Week 8: [Milestone]

APPROVAL:
CAPA Owner: _____________ Date: _______
Process Owner: _____________ Date: _______
QA Manager: _____________ Date: _______
```

### Action Effectiveness Indicators

| Indicator | Target | Red Flag |
|-----------|--------|----------|
| Action scope | Addresses root cause completely | Treats only symptoms |
| Specificity | Measurable deliverables | Vague commitments |
| Timeline | Aggressive but achievable | No due dates or unrealistic |
| Resources | Identified and allocated | Not specified |
| Sustainability | Permanent solution | Temporary fix |

---

## Effectiveness Verification

Verify corrective actions achieved intended results:

1. Allow adequate implementation period (minimum 30-90 days)
2. Collect post-implementation data
3. Compare to pre-implementation baseline
4. Evaluate against success criteria
5. Verify no recurrence during verification period
6. Document verification evidence
7. Determine CAPA effectiveness
8. **Validation:** All criteria met with objective evidence; no recurrence observed

### Verification Timeline Guidelines

| CAPA Severity | Wait Period | Verification Window |
|---------------|-------------|---------------------|
| Critical | 30 days | 30-90 days post-implementation |
| Major | 60 days | 60-180 days post-implementation |
| Minor | 90 days | 90-365 days post-implementation |

### Verification Methods

| Method | Use When | Evidence Required |
|--------|----------|-------------------|
| Data trend analysis | Quantifiable issues | Pre/post comparison, trend charts |
| Process audit | Procedure compliance issues | Audit checklist, interview notes |
| Record review | Documentation issues | Sample records, compliance rate |
| Testing/inspection | Product quality issues | Test results, pass/fail data |
| Interview/observation | Training issues | Interview notes, observation records |

### Effectiveness Determination

```
Did recurrence occur during verification period?
├── Yes → CAPA INEFFECTIVE (re-investigate root cause)
└── No → Were all effectiveness criteria met?
    ├── Yes → CAPA EFFECTIVE (proceed to closure)
    └── No → Extent of gap?
        ├── Minor gap → Extend verification or accept with justification
        └── Significant gap → CAPA INEFFECTIVE (revise actions)
```

See `references/effectiveness-verification-guide.md` for detailed procedures.

---

## CAPA Metrics and Reporting

Monitor CAPA program performance through key indicators.

### Key Performance Indicators

| Metric | Target | Calculation |
|--------|--------|-------------|
| CAPA cycle time | <60 days average | (Close Date - Open Date) / Number of CAPAs |
| Overdue rate | <10% | Overdue CAPAs / Total Open CAPAs |
| First-time effectiveness | >90% | Effective on first verification / Total verified |
| Recurrence rate | <5% | Recurred issues / Total closed CAPAs |
| Investigation quality | 100% root cause validated | Root causes validated / Total CAPAs |

### Aging Analysis Categories

| Age Bucket | Status | Action Required |
|------------|--------|-----------------|
| 0-30 days | On track | Monitor progress |
| 31-60 days | Monitor | Review for delays |
| 61-90 days | Warning | Escalate to management |
| >90 days | Critical | Management intervention required |

### Management Review Inputs

Monthly CAPA status report includes:
- Open CAPA count by severity and status
- Overdue CAPA list with owners
- Cycle time trends
- Effectiveness rate trends
- Source analysis (complaints, audits, NCs)
- Recommendations for improvement

---

## Reference Documentation

### Root Cause Analysis Methodologies

`references/rca-methodologies.md` contains:

- Method selection decision tree
- 5 Why analysis template and example
- Fishbone diagram categories and template
- Fault Tree Analysis for safety-critical issues
- Human Factors Analysis for people-related causes
- FMEA for proactive risk assessment
- Hybrid approach guidance

### Effectiveness Verification Guide

`references/effectiveness-verification-guide.md` contains:

- Verification planning requirements
- Verification method selection
- Effectiveness criteria definition (SMART)
- Closure requirements by severity
- Ineffective CAPA process
- Documentation templates

---

## Tools

### CAPA Tracker

```bash
# Generate CAPA status report
python scripts/capa_tracker.py --capas capas.json

# Interactive mode for manual entry
python scripts/capa_tracker.py --interactive

# JSON output for integration
python scripts/capa_tracker.py --capas capas.json --output json

# Generate sample data file
python scripts/capa_tracker.py --sample > sample_capas.json
```

Calculates and reports:
- Summary metrics (open, closed, overdue, cycle time, effectiveness)
- Status distribution
- Severity and source analysis
- Aging report by time bucket
- Overdue CAPA list
- Actionable recommendations

### Sample CAPA Input

```json
{
  "capas": [
    {
      "capa_number": "CAPA-2024-001",
      "title": "Calibration overdue for pH meter",
      "description": "pH meter EQ-042 found 2 months overdue",
      "source": "AUDIT",
      "severity": "MAJOR",
      "status": "VERIFICATION",
      "open_date": "2024-06-15",
      "target_date": "2024-08-15",
      "owner": "J. Smith",
      "root_cause": "Procedure review gap",
      "corrective_action": "Updated SOP-EQ-001"
    }
  ]
}
```

---

## Regulatory Requirements

### ISO 13485:2016 Clause 8.5

| Sub-clause | Requirement | Key Activities |
|------------|-------------|----------------|
| 8.5.2 Corrective Action | Eliminate cause of nonconformity | NC review, cause determination, action evaluation, implementation, effectiveness review |
| 8.5.3 Preventive Action | Eliminate potential nonconformity | Trend analysis, cause determination, action evaluation, implementation, effectiveness review |

### FDA 21 CFR 820.100

Required CAPA elements:
- Procedures for implementing corrective and preventive action
- Analyzing quality data sources (complaints, NCs, audits, service records)
- Investigating cause of nonconformities
- Identifying actions needed to correct and prevent recurrence
- Verifying actions are effective and do not adversely affect device
- Submitting relevant information for management review

### Common FDA 483 Observations

| Observation | Root Cause Pattern |
|-------------|-------------------|
| CAPA not initiated for recurring issue | Trend analysis not performed |
| Root cause analysis superficial | Inadequate investigation training |
| Effectiveness not verified | No verification procedure |
| Actions do not address root cause | Symptom treatment vs. cause elimination |

---

## Troubleshooting

| Problem | Possible Cause | Resolution |
|---------|---------------|------------|
| Root cause analysis yields only symptoms | Investigation stopped too early or used wrong RCA method | Apply the RCA Method Selection Decision Tree; ensure at least 5 levels of "why" with evidence at each level |
| CAPA effectiveness verification fails repeatedly | Corrective action addresses symptoms, not true root cause | Re-open investigation, consider hybrid RCA approach (e.g., Fishbone + 5-Why), involve additional subject matter experts |
| CAPA cycle times consistently exceed 60-day target | Insufficient resources allocated or unclear ownership | Escalate during management review; assign dedicated CAPA coordinator; break complex CAPAs into phased actions |
| Overdue CAPA rate exceeds 10% | Lack of automated tracking or reminder system | Implement automated alerts via QMS software; run `python scripts/capa_tracker.py --capas capas.json` weekly to identify aging items |
| Auditors cite "superficial root cause analysis" | Inadequate training on RCA methodologies | Conduct RCA methodology training for investigation teams; use templates from `references/rca-methodologies.md`; require evidence at each analysis step |
| Recurring issues despite closed CAPAs | Preventive actions not extended to similar processes | During action planning, explicitly assess all analogous processes; add preventive actions targeting systemic causes, not just the specific instance |
| Stakeholders disagree on CAPA severity classification | No standardized severity criteria applied | Use the CAPA Necessity Determination table and Severity definitions consistently; document classification rationale with objective evidence |

---

## Success Criteria

- **First-time effectiveness rate exceeds 90%** -- verified through post-implementation data collection showing no recurrence during the verification window
- **Average CAPA cycle time under 60 days** -- measured from open date to close date across all severity levels, tracked via `capa_tracker.py` metrics
- **Overdue rate maintained below 10%** -- monitored through aging analysis with escalation triggers at 61-day and 90-day thresholds
- **100% of root causes validated with objective evidence** -- every root cause passes the validation checklist (explains all symptoms, elimination prevents recurrence, within organizational control)
- **All critical and major CAPAs include preventive actions** -- corrective actions address the specific occurrence while preventive actions extend solutions to analogous processes
- **Management review receives monthly CAPA status reports** -- including open count by severity, overdue list, cycle time trends, and effectiveness rate trends
- **Recurrence rate below 5%** -- tracked by monitoring closed CAPAs for reappearance of the same issue type within 12 months of closure

---

## Scope & Limitations

**In Scope:**
- CAPA investigation workflow from trigger event through closure
- Root cause analysis using 5-Why, Fishbone (6M), Fault Tree Analysis, Human Factors Analysis, and FMEA methodologies
- Corrective and preventive action planning, implementation tracking, and effectiveness verification
- CAPA metrics calculation, aging analysis, and management reporting
- Alignment with ISO 13485:2016 Clause 8.5 and FDA 21 CFR 820.100 requirements

**Out of Scope:**
- This skill does not replace a validated eQMS (electronic Quality Management System) for production CAPA tracking -- it provides analysis templates and metric calculations
- Statistical process control and advanced trend analysis requiring specialized SPC software
- Regulatory submission preparation (use `fda-consultant-specialist` or `mdr-745-specialist` for submission-related CAPAs)
- Supplier CAPA management beyond internal investigation (use `quality-manager-qms-iso13485` for supplier qualification)
- Clinical investigation CAPAs requiring medical/scientific expertise beyond procedural guidance

**Important Notes:**
- Under the FDA QMSR (effective February 2, 2026), CAPA requirements align with ISO 13485:2016 Clause 8.5 rather than the legacy 21 CFR 820.100 structure -- this skill covers both frameworks
- The `capa_tracker.py` tool works with JSON input and does not connect to live QMS databases; export data from your eQMS for analysis

---

## Integration Points

| Skill | Integration | When to Use |
|-------|-------------|-------------|
| `quality-manager-qms-iso13485` | CAPA findings feed into QMS process improvements and supplier corrective actions | When root cause involves QMS process gaps or supplier nonconformances |
| `qms-audit-expert` | Audit findings are a primary CAPA source; CAPA closure evidence supports audit follow-up | When CAPAs originate from internal or external audit findings |
| `risk-management-specialist` | CAPA outcomes update risk assessments; FMEA results may trigger preventive CAPAs | When root cause analysis reveals previously unassessed risks |
| `fda-consultant-specialist` | FDA 483 observations and warning letters require formal CAPA responses | When CAPA originates from FDA inspection findings |
| `mdr-745-specialist` | EU MDR vigilance reports and FSCA may trigger CAPAs; CAPA data feeds PMS/PSUR | When post-market surveillance identifies safety or performance issues |
| `quality-documentation-manager` | Document control updates resulting from CAPA actions; 21 CFR Part 11 compliance for electronic CAPA records | When corrective actions require SOP revisions or new document creation |

---

## Tool Reference

### capa_tracker.py

Tracks CAPA status, calculates metrics, identifies overdue items, and generates management review reports.

| Flag | Required | Description |
|------|----------|-------------|
| `--capas <file>` | Yes (unless `--interactive` or `--sample`) | Path to JSON file containing CAPA records |
| `--interactive` | No | Launch interactive mode for manual CAPA entry |
| `--output <format>` | No | Output format: `json` for machine-readable, default is human-readable text |
| `--sample` | No | Generate a sample CAPA JSON file to stdout for use as a template |

**Calculated Metrics:**
- Total, open, closed, and overdue CAPA counts
- Average cycle time (days from open to close)
- First-time effectiveness rate (effective on first verification / total verified)
- Status distribution, severity breakdown, and source analysis
- Aging report bucketed by 0-30, 31-60, 61-90, and 90+ days
- Overdue CAPA list with owners and days past target

**Example:**
```bash
# Generate sample data, then analyze
python scripts/capa_tracker.py --sample > sample_capas.json
python scripts/capa_tracker.py --capas sample_capas.json
python scripts/capa_tracker.py --capas sample_capas.json --output json
```

---

## ccpa-cpra-privacy-expert

Source path: `references/ra-qm-team/ccpa-cpra-privacy-expert/SKILL.md`

# CCPA/CPRA Privacy Expert

Tools and guidance for California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA) compliance.

---

## Table of Contents

- [Tools](#tools)
  - [CCPA Compliance Checker](#ccpa-compliance-checker)
  - [CCPA Data Mapper](#ccpa-data-mapper)
- [Reference Guides](#reference-guides)
- [Workflows](#workflows)
- [Regulatory Overview](#regulatory-overview)

---

## Tools

### CCPA Compliance Checker

Evaluates organizational readiness against all CCPA/CPRA requirements. Validates privacy policies, consumer rights handling, technical safeguards, and opt-out mechanisms.

```bash
# Check compliance from a JSON profile
python scripts/ccpa_compliance_checker.py --input company_profile.json

# Generate a blank input template
python scripts/ccpa_compliance_checker.py --template > company_profile.json

# JSON output for automation
python scripts/ccpa_compliance_checker.py --input company_profile.json --json

# Export report to file
python scripts/ccpa_compliance_checker.py --input company_profile.json --output report.json
```

**Assessment Categories:**

| Category | Key Checks |
|----------|-----------|
| Applicability | Revenue threshold, consumer count, data selling revenue |
| Privacy Policy | Required disclosures, update cadence, accessibility |
| Consumer Rights | Request handling, verification, timelines |
| Opt-Out Mechanisms | "Do Not Sell" link, GPC signal, cookie consent |
| Sensitive PI | SPI categories, use limitation link, handling controls |
| Technical Safeguards | Encryption, access controls, security measures |
| Service Providers | Agreement requirements, data processing terms |
| Risk Assessments | Annual audits, processing risk evaluations |

**Output:**
- Overall compliance score (0-100)
- Per-category scores with pass/fail/partial status
- Prioritized findings with regulatory references
- Remediation recommendations

---

### CCPA Data Mapper

Maps personal information categories, identifies sensitive personal information, tracks data flows across collection, use, sharing, and selling. Generates data inventory reports.

```bash
# Map data from a JSON data inventory
python scripts/ccpa_data_mapper.py --input data_inventory.json

# Generate a blank inventory template
python scripts/ccpa_data_mapper.py --template > data_inventory.json

# Export mapping report
python scripts/ccpa_data_mapper.py --input data_inventory.json --output mapping_report.json

# Generate data flow diagram (text-based)
python scripts/ccpa_data_mapper.py --input data_inventory.json --flow-diagram
```

**Features:**
- Maps all 11 CCPA personal information categories
- Identifies sensitive personal information (SPI) per CPRA definitions
- Tracks data flows: collection sources, business purposes, sharing/selling recipients
- Maps data to service providers, contractors, and third parties
- Generates CCPA-compliant data inventory for privacy policy disclosures
- Flags cross-border data transfers
- Detects data retention gaps

**Personal Information Categories Tracked:**

| Category | CCPA Section | Examples |
|----------|-------------|---------|
| Identifiers | 1798.140(v)(1)(A) | Name, SSN, IP address, email |
| Customer Records | 1798.140(v)(1)(B) | Financial info, medical info |
| Protected Classifications | 1798.140(v)(1)(C) | Race, sex, age, disability |
| Commercial Information | 1798.140(v)(1)(D) | Purchase history, tendencies |
| Biometric Information | 1798.140(v)(1)(E) | Fingerprints, face geometry |
| Internet Activity | 1798.140(v)(1)(F) | Browsing, search, interaction |
| Geolocation Data | 1798.140(v)(1)(G) | Precise location |
| Sensory Data | 1798.140(v)(1)(H) | Audio, visual, thermal |
| Professional Info | 1798.140(v)(1)(I) | Employment, education |
| Education Info | 1798.140(v)(1)(J) | Non-public education records |
| Inferences | 1798.140(v)(1)(K) | Profiles, preferences |

---

## Reference Guides

### CCPA/CPRA Requirements Guide
`references/ccpa-cpra-requirements-guide.md`

Complete regulatory requirements covering:
- Full CCPA/CPRA text analysis with section references
- Consumer rights implementation guidance (Right to Know, Delete, Opt-Out, Correct, Portability, Limit SPI Use)
- Privacy policy content requirements and templates
- Service provider and contractor agreement requirements
- Comparison with Virginia VCDPA, Colorado CPA, Connecticut CTDPA, and GDPR
- Enforcement and penalty structure

### CCPA Implementation Playbook
`references/ccpa-implementation-playbook.md`

Step-by-step implementation guidance:
- 6-month implementation roadmap
- Data mapping methodology and templates
- Privacy policy drafting guide
- Opt-out mechanism implementation (website, GPC, universal opt-out)
- Consumer request workflow design with SLA tracking
- Employee and vendor training program outline
- Annual cybersecurity audit planning
- Ongoing compliance monitoring

---

## Clarify First

Before running the assessment, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Applicability** — whether the business meets a CCPA threshold ($25M revenue, 100K+ consumers/households, or 50%+ revenue from selling/sharing PI) (determines whether obligations apply at all)
- [ ] **Entity role** — business, service provider, contractor, or third party (determines which obligation set applies)
- [ ] **Assessment goal** — compliance readiness, data mapping, consumer-request handling, or privacy-policy review (selects the tool and workflow)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the assessment.

## Workflows

### Workflow 1: Initial CCPA/CPRA Compliance Assessment

```
Step 1: Determine applicability
        → Check $25M revenue, 100K+ consumers, 50%+ PI revenue thresholds
        → Review exemptions (HIPAA, GLBA, employment data)

Step 2: Generate compliance profile template
        → python scripts/ccpa_compliance_checker.py --template > profile.json
        → Fill in organizational details

Step 3: Run compliance assessment
        → python scripts/ccpa_compliance_checker.py --input profile.json

Step 4: Review scores and findings
        → Address critical gaps first (opt-out link, privacy policy)
        → Plan remediation by category

Step 5: Create data inventory
        → python scripts/ccpa_data_mapper.py --template > inventory.json
        → Document all PI categories collected
        → python scripts/ccpa_data_mapper.py --input inventory.json

Step 6: Develop implementation plan
        → See references/ccpa-implementation-playbook.md
```

### Workflow 2: Consumer Rights Request Handling

```
Step 1: Receive consumer request
        → Identify request type (Know, Delete, Opt-Out, Correct, Portability, Limit SPI)

Step 2: Acknowledge within 10 business days (confirm receipt)
        → Document request in tracking system

Step 3: Verify consumer identity
        → Match 2+ data points for standard requests
        → Match 3+ data points for sensitive data requests
        → No verification needed for opt-out requests

Step 4: Fulfill request within 45 calendar days
        → Extension: up to 45 additional days with notice
        → Search all systems using data inventory
        → python scripts/ccpa_data_mapper.py --input inventory.json

Step 5: Deliver response
        → Provide information in portable format if requested
        → Document completion and response

Step 6: Monitor compliance
        → Track response times and completion rates
        → Generate quarterly compliance reports
```

### Workflow 3: Privacy Policy Update Cycle

```
Step 1: Review current privacy policy against requirements
        → python scripts/ccpa_compliance_checker.py --input profile.json
        → Check privacy_policy category score

Step 2: Update data inventory
        → python scripts/ccpa_data_mapper.py --input inventory.json
        → Verify all PI categories are disclosed

Step 3: Verify required disclosures
        → Categories of PI collected (past 12 months)
        → Sources of PI
        → Business/commercial purposes
        → Categories of third parties
        → Consumer rights description
        → "Do Not Sell or Share" link
        → "Limit the Use of My Sensitive PI" link

Step 4: Update and publish
        → Annual update at minimum
        → Update within 30 days of material changes
        → Maintain prior version archive
```

---

## Regulatory Overview

### CCPA/CPRA Timeline

| Date | Milestone |
|------|-----------|
| Jan 1, 2020 | CCPA effective |
| Jul 1, 2020 | AG enforcement begins |
| Nov 3, 2020 | CPRA passed (Proposition 24) |
| Jan 1, 2023 | CPRA amendments effective |
| Jul 1, 2023 | CPPA enforcement of CPRA begins |
| 2026 | Employment and B2B data exemptions status review |

### Scope and Applicability

A **business** is subject to CCPA/CPRA if it:
- Has annual gross revenue exceeding **$25 million**
- Buys, sells, or shares PI of **100,000+ consumers or households** annually
- Derives **50% or more** of annual revenue from selling or sharing consumers' PI

**Entity Types:**

| Entity | Definition | Obligations |
|--------|-----------|------------|
| Business | Determines purposes and means of processing | Full CCPA/CPRA compliance |
| Service Provider | Processes PI on behalf of a business (contractual) | Limited use, deletion obligations |
| Contractor | Processes PI via written contract (CPRA addition) | Certification, limited use, audit rights |
| Third Party | Receives PI not as service provider/contractor | Subject to opt-out rights |

**Exemptions:**
- **HIPAA-covered entities**: Health data governed by HIPAA exempt
- **GLBA**: Financial data subject to GLBA exempt
- **Employment data**: Employee/applicant PI (subject to review through 2026)
- **B2B data**: Business contact PI in B2B transactions (subject to review through 2026)
- **FCRA**: Data subject to Fair Credit Reporting Act

### Consumer Rights

| Right | CCPA Section | Description | Timeline |
|-------|-------------|-------------|----------|
| Right to Know | §1798.100, §1798.110 | Categories and specific pieces of PI collected | 45 days |
| Right to Delete | §1798.105 | Delete PI collected from the consumer | 45 days |
| Right to Opt-Out | §1798.120 | Opt out of sale or sharing of PI | Immediate |
| Right to Non-Discrimination | §1798.125 | No retaliation for exercising rights | Ongoing |
| Right to Correct | §1798.106 | Correct inaccurate PI (CPRA) | 45 days |
| Right to Limit SPI Use | §1798.121 | Limit use of sensitive PI (CPRA) | Immediate |
| Right to Data Portability | §1798.130 | Receive PI in portable format (CPRA) | 45 days |

### Sensitive Personal Information (CPRA)

SPI categories requiring enhanced protections under CPRA §1798.140(ae):
- Social Security number, driver's license, state ID, passport number
- Account log-in credentials (username + password/security question)
- Financial account number with access credentials
- Precise geolocation (within 1,850 feet / radius)
- Racial or ethnic origin
- Religious or philosophical beliefs
- Union membership
- Contents of mail, email, and text messages (unless business is intended recipient)
- Genetic data
- Biometric data for identification
- Health information
- Sex life or sexual orientation data

### Enforcement and Penalties

| Violation Type | Penalty | Enforcer |
|---------------|---------|----------|
| Unintentional violation | $2,500 per violation | CPPA / AG |
| Intentional violation | $7,500 per violation | CPPA / AG |
| Violations involving minors (under 16) | $7,500 per violation | CPPA / AG |
| Data breach (private action) | $100-$750 per consumer per incident | Consumer (court) |

**Enforcement Bodies:**
- **California Privacy Protection Agency (CPPA)**: Primary enforcer under CPRA (operational 2023)
- **California Attorney General**: Retains enforcement authority
- **Private right of action**: Limited to data breaches from failure to maintain reasonable security

### CCPA vs GDPR Comparison

| Aspect | CCPA/CPRA | GDPR |
|--------|----------|------|
| Scope | California consumers | EU/EEA data subjects |
| Legal basis | Opt-out model | Opt-in (consent or legal basis) |
| Data covered | Personal information | Personal data |
| Sensitive data | SPI with limit-use right | Special category with explicit consent |
| Breach notification | AG notification, private action | 72-hour DPA notification |
| DPO requirement | None | Required for certain processing |
| Penalties | $2,500-$7,500 per violation | Up to 4% global revenue or €20M |
| Private right of action | Data breaches only | Varies by member state |
| Cross-border transfers | No restrictions | Adequacy decisions, SCCs, BCRs |
| Children's data | Opt-in for under 16, parental for under 13 | Parental consent for under 16 (variable) |

### Infrastructure Privacy Controls

**Cookie Consent Management:**
- Implement cookie consent banner for non-essential cookies
- Honor Global Privacy Control (GPC) browser signals (legally required)
- Maintain cookie inventory with retention periods
- Categorize cookies: strictly necessary, functional, analytics, advertising

**Global Privacy Control (GPC):**
- Businesses must treat GPC signal as valid opt-out request (§1798.135)
- Technical implementation: detect `Sec-GPC: 1` header or `navigator.globalPrivacyControl`
- Apply opt-out to sale AND sharing of PI
- No re-authentication required for GPC

**Privacy by Design:**
- Data minimization: collect only PI necessary for disclosed purposes
- Purpose limitation: use PI only for purposes disclosed at collection
- Storage limitation: retain PI only as long as necessary
- Security by default: encrypt PI at rest and in transit

**Data Inventory and Mapping:**
- Maintain comprehensive PI inventory across all systems
- Map data flows: collection → processing → sharing → deletion
- Document retention schedules per PI category
- Track cross-border data transfers

**Automated Decision-Making:**
- Disclose use of automated decision-making technology
- Provide opt-out for profiling that produces legal or significant effects
- CPRA regulations may require access to logic of automated decisions

### Compliance Roadmap

**Month 1-2: Discovery and Assessment**
- Determine CCPA/CPRA applicability
- Conduct data inventory and mapping
- Gap analysis against requirements
- Assign compliance ownership

**Month 3-4: Implementation**
- Draft/update privacy policy
- Implement "Do Not Sell or Share" link
- Implement "Limit Use of SPI" link
- Deploy GPC signal detection
- Build consumer request intake and fulfillment workflows
- Draft service provider/contractor agreements

**Month 5-6: Operationalization**
- Train employees on privacy obligations
- Test consumer request workflows end-to-end
- Conduct initial risk assessment
- Plan annual cybersecurity audit
- Establish ongoing monitoring and metrics
- Document compliance program for regulatory defense

---

## Troubleshooting

| Problem | Possible Cause | Resolution |
|---------|---------------|------------|
| Compliance score unexpectedly low despite privacy policy updates | Policy disclosures incomplete -- missing SPI categories, retention periods, or sale/sharing categories | Run `ccpa_compliance_checker.py --input profile.json` and review per-category scores; cross-reference privacy policy against the 17+ required disclosure elements |
| Data mapper flags cross-border transfers but organization operates only in US | Data inventory includes cloud services with non-US processing locations | Review data inventory entries for cloud provider data processing locations; document all sub-processor locations per service provider agreements |
| Consumer rights requests consistently exceed 45-day response deadline | Manual fulfillment process without tracking system or unclear ownership | Implement `ccpa_data_mapper.py` to map PI across all systems; deploy request tracking with automated deadline alerts; assign per-system data stewards |
| GPC signal detection not working | Application does not check `Sec-GPC: 1` header or `navigator.globalPrivacyControl` | Implement server-side header detection and client-side JavaScript check; test with browsers that support GPC (Firefox, Brave); log detection events |
| CPPA enforcement inquiry received | Potential compliance gap discovered during regulatory sweep or consumer complaint | Immediately run full compliance assessment; prioritize critical gaps (opt-out link, GPC, privacy policy); engage privacy counsel; document remediation timeline |
| Vendor contracts missing CCPA-required provisions | Service provider agreements predate CPRA amendments | Audit all vendor agreements against CCPA service provider/contractor requirements; update contracts to include certification, limited use, audit rights, and data deletion obligations |
| Risk assessment requirements unclear | New CPRA regulations (effective January 1, 2026) mandate risk assessments for six processing categories | Review processing activities against the six "significant risk" categories; document risk assessments per CPPA regulatory template; plan for April 2028 attestation deadline |

---

## Success Criteria

- **Overall compliance score of 80+ on initial assessment** -- indicating foundational CCPA/CPRA controls are in place, with per-category scores identifying targeted remediation areas
- **All consumer rights requests fulfilled within 45 calendar days** -- with 10-business-day acknowledgment, tracked through a request management system with automated deadline alerts
- **Privacy policy updated at least annually** -- with documented reviews quarterly, disclosing all 11 PI categories collected, sources, purposes, third-party sharing, and all seven consumer rights
- **GPC signal honored automatically** -- detected via `Sec-GPC: 1` header and `navigator.globalPrivacyControl`, applied to both sale and sharing of PI, with no re-authentication required
- **Complete data inventory maintained** -- all PI categories mapped to collection sources, business purposes, sharing recipients, and retention schedules using `ccpa_data_mapper.py`
- **Service provider and contractor agreements include all CCPA-required provisions** -- including certification of limited use, deletion obligations, audit rights, and sub-contractor chain documentation
- **Risk assessments completed for all applicable processing activities** -- covering the six CPRA significant-risk categories, with attestation readiness by the April 2028 deadline

---

## Scope & Limitations

**In Scope:**
- CCPA/CPRA applicability determination (revenue, consumer count, PI revenue thresholds)
- Privacy policy compliance assessment against all required disclosures
- Consumer rights readiness validation (Know, Delete, Opt-Out, Correct, Portability, Limit SPI Use)
- Data inventory mapping across all 11 CCPA personal information categories
- Sensitive personal information identification per CPRA definitions
- Technical safeguard assessment (encryption, access controls, opt-out mechanisms)
- Service provider and contractor agreement requirements

**Out of Scope:**
- Legal advice or determination of exemption applicability (HIPAA, GLBA, FCRA, employment data) -- consult privacy counsel for exemption analysis
- Implementation of cookie consent management platforms or GPC signal handling code
- CCPA private right of action defense (data breach litigation) -- consult legal counsel
- Other state privacy laws (Virginia VCDPA, Colorado CPA, Connecticut CTDPA) beyond the comparison tables provided -- use jurisdiction-specific guidance
- Automated decision-making technology (ADMT) compliance under CPRA regulations effective January 2027 -- monitor CPPA rulemaking for final requirements

**Important Notes:**
- CPPA enforcement is escalating significantly in 2025-2026, with fines exceeding $1.3M in individual cases and joint multi-state enforcement sweeps targeting GPC non-compliance
- New CPRA regulations effective January 1, 2026 add risk assessment, cybersecurity audit, and updated compliance requirements -- plan implementation accordingly

---

## Integration Points

| Skill | Integration | When to Use |
|-------|-------------|-------------|
| `gdpr-dsgvo-expert` | Unified privacy program satisfying both GDPR and CCPA; cross-framework privacy mapping | When organization operates in both EU and California markets |
| `infrastructure-compliance-auditor` | Technical safeguard validation (encryption, access controls, logging) for CCPA reasonable security | When assessing infrastructure controls supporting CCPA compliance |
| `information-security-manager-iso27001` | Security controls supporting CCPA "reasonable security" requirement | When building security program that satisfies both ISO 27001 and CCPA |
| `soc2-compliance-expert` | SOC 2 controls mapped to CCPA technical safeguard requirements | When SOC 2 audit evidence supports CCPA security compliance |

---

## Tool Reference

### ccpa_compliance_checker.py

Evaluates organizational readiness against all CCPA/CPRA requirements across 8 assessment categories.

| Flag | Required | Description |
|------|----------|-------------|
| `--input <file>` | Yes (unless `--template`) | Path to JSON company profile for assessment |
| `--template` | No | Generate blank input template to stdout |
| `--json` | No | Output results in JSON format for automation |
| `--output <file>` | No | Export report to specified file path |

**Output:** Overall compliance score (0-100), per-category scores with pass/fail/partial status, prioritized findings with regulatory references, and remediation recommendations.

### ccpa_data_mapper.py

Maps personal information categories, tracks data flows, and generates data inventory reports.

| Flag | Required | Description |
|------|----------|-------------|
| `--input <file>` | Yes (unless `--template`) | Path to JSON data inventory for mapping |
| `--template` | No | Generate blank inventory template to stdout |
| `--output <file>` | No | Export mapping report to specified file path |
| `--flow-diagram` | No | Generate text-based data flow diagram showing collection, use, sharing, and selling paths |

**Output:** PI category mapping across all 11 CCPA categories, SPI identification, data flow analysis (sources, purposes, recipients), cross-border transfer flags, and data retention gap detection.

---

## compliance-readiness

Source path: `references/ra-qm-team/audit-prep/compliance-readiness/SKILL.md`

# Compliance Readiness (Cross-Framework)

The orchestrator skill for organizations pursuing multiple compliance frameworks. Reduces duplication, accelerates certification, and shares evidence across SOC 2, ISO 27001, NIST CSF, GDPR, HIPAA, and others.

When to use this skill vs. framework-specific audit-prep:
- **This skill**: 2+ frameworks pursued in parallel; need shared-evidence strategy
- **Framework-specific** (`soc2-audit-prep`, `gdpr-audit-prep`, etc.): single-framework sprint

---

## When to use this skill

| Situation | Skill applies |
|-----------|---------------|
| Pursuing SOC 2 + ISO 27001 + NIST CSF in parallel | Yes — start here |
| Healthcare org pursuing SOC 2 + HIPAA + ISO 27001 | Yes |
| Building shared-evidence platform | Yes — see **shared evidence strategy** |
| Mapping one control to multiple frameworks | Yes — `scripts/shared_evidence_finder.py` |
| Deciding which framework to certify first | Yes — see **sequencing decisions** |
| Generating multi-framework roadmap | Yes — `scripts/readiness_roadmap_generator.py` |
| Single-framework audit prep | Use framework-specific skill |

---

## The strategic insight

Most controls are shared across compliance frameworks. A well-designed control catalog satisfies multiple frameworks simultaneously. Without coordination, you build separate evidence + procedures per framework — 3x the work, 3x the maintenance, 3x the auditor confusion.

Common shared controls:

| Control area | SOC 2 | ISO 27001 | NIST CSF | NIS2 | DORA | PCI-DSS | HIPAA | GDPR |
|--------------|-------|-----------|----------|------|------|---------|-------|------|
| Access control | CC6.1 | A.8.5 | PR.AA | Art.21.2.j | Art.9.4 | Req 7-8 | §164.312(d) | Art.32 |
| Encryption | CC6.7 | A.8.24 | PR.DS | Art.21.2.h | Art.9.2 | Req 3-4 | §164.312(a)(2)(iv) | Art.32 |
| Incident response | CC7.4 | A.5.24 | RS.MA | Art.23 | Art.17 | Req 12.10 | §164.308(a)(6) | Art.33 |
| Risk assessment | CC3.1 | Cl.6.1 | ID.RA | Art.21.1 | Art.6 | Req 12.2 | §164.308(a)(1) | Art.35 |
| Logging | CC7.2 | A.8.15 | DE.CM | Art.21.2.b | Art.10 | Req 10 | §164.312(b) | Art.30 |
| Vendor management | CC9.2 | A.5.19 | GV.SC | Art.21.2.d | Art.28 | Req 12.8 | §164.308(b) | Art.28 |

See [references/control-mapping-soc2-iso27001-nist.md](references/control-mapping-soc2-iso27001-nist.md) for the full mapping.

---

## Sequencing decisions

Which framework to pursue first?

### Common patterns

**SaaS / Tech (B2B enterprise customers):**
- SOC 2 Type I first (3-6 months) — customer-demanded entry ticket
- SOC 2 Type II (next 6-12 months after Type I)
- ISO 27001 (often after SOC 2 Type II; substantial overlap)
- NIST CSF (as internal framework; supports SOC 2 / ISO 27001)
- GDPR (separately, ongoing)

**Healthcare (US):**
- HIPAA (immediately if covered entity / BA)
- SOC 2 (for tech-side customer requirements)
- ISO 27001 (for international expansion)

**FinTech / financial services (EU):**
- DORA (mandatory effective Jan 2025)
- NIS2 (mandatory)
- PCI-DSS (if handling card data)
- ISO 27001 (standard)
- SOC 2 (for B2B customers)

**Medical devices:**
- ISO 13485 / 14971 / MDR / FDA (industry mandatory)
- ISO 27001 (for digital health components)
- SOC 2 (for SaaS components)

### Sequencing factors

1. **Customer demand** — what blocks deals?
2. **Regulatory mandate** — what's required by law?
3. **Time to certify** — SOC 2 Type I (3-6 mo) vs ISO 27001 (6-12 mo)
4. **Shared-evidence opportunity** — frameworks that overlap (SOC 2 + ISO 27001)
5. **Cost** — certification + ongoing surveillance

---

## Shared evidence strategy

### Strategy 1: Common control catalog

Build one control catalog covering all in-scope frameworks. Each control maps to multiple frameworks. One implementation; one evidence trail.

```
Control: Access Reviews (Quarterly)
- SOC 2: CC6.3
- ISO 27001: A.5.18
- NIST CSF: PR.AA-04
- HIPAA: §164.308(a)(4)
- GDPR: Art.32 (security of processing)

Evidence: Quarterly access-review records, signed by team lead
Frequency: Quarterly
Owner: IT Security
```

One artifact satisfies five frameworks.

### Strategy 2: Unified evidence collection

Single source-of-truth for evidence (Drata / Vanta / Thoropass / Sprinto / homegrown):
- Configurations + access reviews + change records auto-collected
- Tagged per framework
- Auditor (per framework) gets relevant subset

### Strategy 3: Single management review

Annual management review covers all frameworks:
- SOC 2 management review
- ISO 27001 management review (Clause 9.3)
- ISO 42001 management review (if AIMS)
- Internal audit findings
- Risk register update
- Continual improvement decisions

### Strategy 4: Single internal audit

Plan internal audit to cover overlapping clauses:
- ISO 27001 Clause 9.2 internal audit
- SOC 2 controls testing
- NIST CSF self-assessment
- All produce one audit report; distributed per framework

---

## Multi-framework readiness sprint

### 16-week sprint (initial: SOC 2 + ISO 27001 in parallel)

```
Weeks 1-4: Common control catalog build; gap analysis per framework
Weeks 5-8: Gap remediation (technical + procedural)
Weeks 9-12: Evidence collection + walkthroughs
Weeks 13-14: SOC 2 audit
Weeks 15-16: ISO 27001 Stage 1
(then ISO 27001 Stage 2 ~4-8 weeks later)
```

### 12-week sprint (annual: SOC 2 + ISO 27001 surveillance)

```
Weeks 1-2: Audit readiness assessment per framework
Weeks 3-6: Gap remediation
Weeks 7-9: Walkthroughs + evidence finalization
Weeks 10-12: Audits (sequential or parallel depending on auditor capacity)
```

---

## Clarify First

Before generating the roadmap, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Target frameworks** — which set (SOC 2, ISO 27001, NIST CSF, GDPR, HIPAA, DORA…) is pursued in parallel (drives the control mapping and shared-evidence strategy)
- [ ] **Industry and region** — determines which frameworks are legally mandated vs customer-demanded, and the sequencing
- [ ] **Initial vs renewal** — first-time certification vs annual surveillance (picks the 16-week vs 12-week sprint)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the roadmap.

## Quick start

1. **Score multi-framework readiness**: `python3 scripts/multi_framework_scorer.py --config controls.yaml`
2. **Find shared evidence opportunities**: `python3 scripts/shared_evidence_finder.py --frameworks SOC2,ISO27001`
3. **Generate roadmap**: `python3 scripts/readiness_roadmap_generator.py --target-frameworks SOC2,ISO27001,GDPR`
4. **Execute sprint** per [references/multi-framework-readiness-matrix.md](references/multi-framework-readiness-matrix.md)

---

## Common multi-framework readiness failures

- **Separate teams per framework** — duplicates work, inconsistent decisions, wasted time
- **Separate evidence collection** — same screenshot taken 3x for 3 frameworks
- **Auditor doesn't accept overlap** — push back; most accept SOC 2 evidence for ISO 27001 controls
- **Framework-specific tooling** — one tool per framework instead of unified GRC platform
- **No control owner** — control exists across frameworks but no single owner
- **Mapping not maintained** — control changes; mappings go stale
- **Auditor cycles cause crunches** — schedule auditors not to overlap (or do overlap by design)

---

## Tooling

| Script | Purpose |
|--------|---------|
| `scripts/multi_framework_scorer.py` | Score readiness across multiple frameworks |
| `scripts/shared_evidence_finder.py` | Identify shared controls; map evidence to frameworks |
| `scripts/readiness_roadmap_generator.py` | Generate multi-framework readiness roadmap |

---

## References

- [multi-framework-readiness-matrix.md](references/multi-framework-readiness-matrix.md) — per-framework requirements + cadences + cost
- [shared-evidence-strategy.md](references/shared-evidence-strategy.md) — implementation patterns for shared evidence
- [control-mapping-soc2-iso27001-nist.md](references/control-mapping-soc2-iso27001-nist.md) — detailed control mapping

---

## Related skills

- `ra-qm-team/soc2-compliance-expert` — deep SOC 2 program
- `ra-qm-team/information-security-manager-iso27001` — deep ISO 27001 program
- `ra-qm-team/nist-csf-specialist` — deep NIST CSF program
- `ra-qm-team/gdpr-dsgvo-expert` — deep GDPR program
- `ra-qm-team/fda-consultant-specialist` — deep FDA program
- `ra-qm-team/infrastructure-compliance-auditor` — cross-framework infra audit
- `ra-qm-team/audit-prep/*` — framework-specific audit-prep skills

---

## dora-compliance-expert

Source path: `references/ra-qm-team/dora-compliance-expert/SKILL.md`

# DORA Compliance Expert

Tools and guidance for Regulation (EU) 2022/2554 on digital operational resilience for the financial sector (Digital Operational Resilience Act — DORA). DORA is a directly applicable EU regulation (applicable since January 17, 2025) covering 20 types of financial entities and their critical ICT third-party providers. This skill assesses readiness against the five pillars, classifies ICT incidents and computes reporting deadlines, and structures third-party risk and resilience-testing programs.

## Core Capabilities

- **5-pillar readiness assessment** — score ICT risk management, incident management, resilience testing, third-party risk, and information sharing (0–100 per pillar) with gap analysis and prioritized remediation
- **Incident classification & reporting** — classify ICT incidents per Article 18 criteria, determine major-incident status, and compute the 4h / 72h / 1-month reporting deadlines
- **Third-party ICT risk** — register structure, Article 30 contractual provisions, exit strategies, and concentration-risk assessment
- **Resilience testing program design** — basic testing (12 test types) plus advanced Threat-Led Penetration Testing (TLPT) per the TIBER-EU framework

## When to Use

- Running a DORA gap assessment or readiness scorecard for a financial entity
- Classifying an ICT incident and confirming reporting obligations to a competent authority
- Building or auditing an ICT third-party register and contracts
- Designing a digital operational resilience testing program (basic + TLPT)
- Determining whether and how DORA applies to your entity

## Clarify First

Before running the assessment, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Entity scope** — whether the organization is one of DORA's 20 financial-entity types (determines applicability and proportionality)
- [ ] **Task** — 5-pillar readiness, incident classification, third-party register, or testing-program design (picks the tool and workflow)
- [ ] **Incident facts (if classifying)** — clients affected, duration, data loss, criticality, economic impact (drives major-incident determination and the 4h/72h/1-month deadlines)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the assessment.

## Quick Start

```bash
# Generate and run a 5-pillar readiness assessment
python scripts/dora_readiness_checker.py --template > assessment.json
python scripts/dora_readiness_checker.py --config assessment.json --json

# Classify an ICT incident and get reporting deadlines
python scripts/dora_incident_classifier.py --clients-affected 5000 --duration-hours 4 \
  --data-loss yes --services-critical yes --economic-impact 500000
```

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/framework-overview.md](references/framework-overview.md)** — DORA background, legal nature, relationship to NIS2/GDPR/PSD2/MiCA/ISO 27001, the 20 in-scope entity types, proportionality, CTPP designation, and the penalty/enforcement regime. Read when scoping applicability or assessing enforcement exposure.
- **[references/five-pillars-detail.md](references/five-pillars-detail.md)** — article-by-article requirements for all 5 pillars (Articles 5–45), incident classification & reporting deadlines, testing/TLPT, and third-party contractual provisions. Read when assessing a specific pillar or mapping a requirement to its article.
- **[references/dora-five-pillars-guide.md](references/dora-five-pillars-guide.md)** — complete implementation guidance for all 5 pillars with ISO 27001 control mapping, financial-sector-specific requirements, and RTS/ITS references. Read when implementing controls aligned to ISO 27001.
- **[references/dora-third-party-management.md](references/dora-third-party-management.md)** — ICT third-party register template, contractual requirements checklist, exit strategy framework, concentration-risk methodology, and critical-provider oversight. Read when building the register or reviewing contracts.
- **[references/implementation-and-infrastructure.md](references/implementation-and-infrastructure.md)** — 9-month implementation roadmap, quick wins, infrastructure verification checklists, troubleshooting table, and success criteria. Read when planning the program or diagnosing assessment results.
- **[references/tools-and-cli.md](references/tools-and-cli.md)** — full command examples, feature lists, and flag-by-flag reference for both Python scripts. Read when running or scripting the tools.

## Scope & Limitations

**In Scope:**
- Readiness assessment against all 5 DORA pillars with per-pillar scoring
- ICT incident classification per Article 18 criteria with major incident determination
- Reporting deadline calculation (4-hour initial, 72-hour intermediate, 1-month final)
- Incident notification template generation for competent authority submissions
- Third-party risk management guidance including register template and contractual requirements
- Resilience testing program design covering basic and advanced (TLPT) testing
- Gap analysis with prioritized remediation recommendations

**Out of Scope:**
- Actual penetration testing execution or vulnerability scanning -- this skill provides planning and assessment frameworks, not testing tools
- Direct interaction with competent authorities or ESAs (EBA, ESMA, EIOPA)
- Legal determination of entity scope (whether your organization falls under DORA's 20 entity types) -- consult regulatory counsel
- CTPP (Critical Third-Party Provider) oversight framework compliance -- applicable only to ESA-designated providers
- Real-time ICT monitoring or SIEM implementation -- use `infrastructure-compliance-auditor` for technical security controls

**Important Notes:**
- DORA became applicable January 17, 2025; regulators are treating 2025 as a transition year but enforcement is expected to intensify in 2026
- Non-compliance penalties can reach up to 2% of total annual worldwide turnover or 1% of average daily global turnover for up to 6 months (for CTPPs)

## Integration Points

| Skill | Integration | When to Use |
|-------|-------------|-------------|
| `information-security-manager-iso27001` | ISO 27001 controls map directly to DORA Pillar 1 requirements; ISO 27001 certification supports DORA compliance evidence | When building ICT risk management framework aligned with both ISO 27001 and DORA |
| `nis2-directive-specialist` | DORA is lex specialis for financial sector; NIS2 applies residually; coordinate incident reporting timelines | When financial entity also falls under NIS2 scope for non-financial ICT services |
| `infrastructure-compliance-auditor` | Technical infrastructure checks validate DORA Pillar 1 (protection, detection) and Pillar 3 (resilience testing) controls | When assessing actual infrastructure security posture against DORA requirements |
| `nist-csf-specialist` | NIST CSF 2.0 functions map to DORA pillars; useful for organizations with US operations | When building a unified resilience framework across US and EU requirements |

---

*Last Updated: June 2026*
*Regulation Reference: EU 2022/2554*
*Applicable From: January 17, 2025*

---

## eu-ai-act-specialist

Source path: `references/ra-qm-team/eu-ai-act-specialist/SKILL.md`

# EU AI Act Compliance Specialist

Production-ready compliance patterns for Regulation (EU) 2024/1689 -- the EU Artificial Intelligence Act. Covers risk classification, provider/deployer obligations, GPAI model requirements, conformity assessment, and AI governance.

---

## Clarify First

Before classifying or mapping obligations, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Intended purpose and domain** — what the system does and its Annex III area (drives the risk classification and which obligations apply)
- [ ] **Role** — provider, deployer, GPAI provider, or importer (determines the obligation set)
- [ ] **Biometric / GPAI characteristics** — uses biometrics, is a GPAI model, or trained with >10^25 FLOPs (drives the prohibited / high-risk / systemic-risk path and the conformity-assessment route)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the classification.

## AI System Inventory and Classification Workflow

The agent classifies AI systems under the EU AI Act's risk-based framework and maps applicable obligations.

### Workflow: Classify and Map Obligations

1. **Inventory all AI systems** -- for each system, document: name, provider/developer, description, intended purpose, deployment status, affected persons, geographic scope, data processed, and decision impact level.
2. **Apply classification decision tree** to each system:
   - Does it meet the Art. 3(1) definition of an AI system? If no, document exclusion.
   - Does it fall under a prohibited practice (Art. 5)? If yes, flag as UNACCEPTABLE RISK -- must be discontinued.
   - Is it a safety component of an Annex I product? If yes, HIGH-RISK (product legislation path).
   - Does it fall under an Annex III category? If yes, apply Art. 6(3) exception analysis. If exception does not apply, HIGH-RISK.
   - Does Art. 50 transparency obligation apply? If yes, LIMITED RISK. Otherwise, MINIMAL RISK.
3. **Map obligations** based on classification -- assign compliance owners for each obligation.
4. **Run gap analysis** using `scripts/ai_compliance_checker.py` to identify compliance gaps.
5. **Prioritize remediation** by deadline urgency, penalty severity, and number of affected persons.
6. **Validation checkpoint:** Every AI system classified; prohibited practices flagged for immediate action; high-risk systems have assigned compliance owners and remediation timelines.

### Example: AI System Classification Output

```json
{
  "system_name": "Resume Screener v2.1",
  "provider": "Internal ML Team",
  "intended_purpose": "Screen job applications and rank candidates for recruiter review",
  "ai_act_classification": "HIGH-RISK",
  "classification_rationale": "Annex III Category 4 - Employment: AI for recruitment and screening of job applicants",
  "art_6_3_exception": false,
  "exception_rationale": "System directly influences which candidates proceed to interview stage - not a narrow procedural task",
  "applicable_obligations": [
    "Risk management system (Art. 9)",
    "Data governance (Art. 10)",
    "Technical documentation (Art. 11)",
    "Record-keeping / automatic logging (Art. 12)",
    "Transparency and information to deployers (Art. 13)",
    "Human oversight (Art. 14)",
    "Accuracy, robustness, cybersecurity (Art. 15)",
    "Quality management system (Art. 17)",
    "Conformity assessment (Art. 43)",
    "CE marking (Art. 48)",
    "EU database registration (Art. 49)",
    "Post-market monitoring (Art. 72)"
  ],
  "compliance_deadline": "2026-08-02",
  "assigned_owner": "Head of AI Governance"
}
```

---

## Risk Classification System

The AI Act uses a risk-based approach with four tiers.

### Tier 1: Prohibited Practices (Art. 5) -- Banned from 2 February 2025

| Prohibited Practice | Article |
|---------------------|---------|
| Social scoring by public authorities | Art. 5(1)(c) |
| Real-time remote biometric identification in public spaces (with narrow exceptions) | Art. 5(1)(h) |
| Emotion recognition in workplace and education (except medical/safety) | Art. 5(1)(f) |
| Individual predictive policing based solely on profiling | Art. 5(1)(d) |
| Exploitation of vulnerabilities (age, disability, social/economic situation) | Art. 5(1)(b) |
| Subliminal manipulation causing significant harm | Art. 5(1)(a) |
| Untargeted facial image scraping for recognition databases | Art. 5(1)(e) |
| Biometric categorization by sensitive attributes (race, religion, etc.) | Art. 5(1)(g) |

### Tier 2: High-Risk AI Systems (Art. 6, Annex III)

An AI system is high-risk if it falls under Annex III categories OR is a safety component of a product covered by Annex I harmonization legislation.

**Annex III Categories:**

| # | Category | Examples |
|---|----------|----------|
| 1 | Biometric identification and categorization | Remote biometric ID, emotion recognition |
| 2 | Critical infrastructure management | Road traffic, water/gas/electricity supply, digital infrastructure |
| 3 | Education and vocational training | Admissions, learning outcome evaluation, test monitoring |
| 4 | Employment and workers management | Recruitment/screening, promotion/termination, performance monitoring |
| 5 | Essential private and public services | Creditworthiness, insurance risk, public assistance eligibility |
| 6 | Law enforcement | Polygraph, deepfake detection, crime analytics |
| 7 | Migration, asylum, border control | Asylum risk assessment, visa/permit examination |
| 8 | Administration of justice | Judicial fact-finding, election influence |

### Tier 3: Limited Risk -- Transparency Obligations (Art. 50)

| System Type | Transparency Requirement |
|-------------|------------------------|
| Chatbots / AI interacting with persons | Inform person they are interacting with AI |
| Emotion recognition / biometric categorization | Inform exposed persons of system operation |
| Deepfakes / AI-generated content | Disclose AI generation; machine-readable labelling |
| AI-generated text on public interest matters | Disclose AI generation unless editorially reviewed |

### Tier 4: Minimal Risk

No mandatory requirements. Voluntary codes of conduct encouraged (Art. 95).

---

## Provider Obligations for High-Risk AI

Providers of high-risk AI systems must comply with all of the following:

| # | Obligation | Article | Key Requirement |
|---|-----------|---------|-----------------|
| 1 | Risk Management System | Art. 9 | Continuous iterative process throughout lifecycle; test against defined metrics |
| 2 | Data Governance | Art. 10 | Training/validation/testing datasets meet quality, representativeness, and bias criteria |
| 3 | Technical Documentation | Art. 11 | Drawn up before market placement; kept up to date throughout lifecycle |
| 4 | Record-Keeping / Logging | Art. 12 | Automatic recording of events enabling traceability |
| 5 | Transparency | Art. 13 | Instructions for use with capabilities, limitations, and oversight measures |
| 6 | Human Oversight | Art. 14 | Human-in-the-loop, on-the-loop, or in-command depending on risk |
| 7 | Accuracy, Robustness, Cybersecurity | Art. 15 | Appropriate levels declared and maintained; adversarial resilience |
| 8 | Quality Management System | Art. 17 | Documented QMS covering design, development, testing, data management, post-market |
| 9 | Conformity Assessment | Art. 43 | Internal control (Annex VI) or third-party assessment (Annex VII) |
| 10 | CE Marking | Art. 48 | Affix CE marking before market placement |
| 11 | EU Database Registration | Art. 49 | Register in EU database before market placement |
| 12 | Post-Market Monitoring | Art. 72 | Active systematic data collection; serious incident reporting within 15 days |

---

## Deployer Obligations (Art. 26)

| Obligation | Detail |
|-----------|--------|
| Use per instructions | Operate per provider's instructions for use |
| Human oversight | Assign competent, trained, authorized oversight personnel |
| Input data relevance | Ensure input data is relevant and representative |
| Monitoring | Monitor operation; inform provider of risks/incidents |
| Record-keeping | Keep auto-generated logs (minimum 6 months) |
| Inform workers | Notify workers/representatives before deployment of high-risk AI |
| DPIA | Carry out GDPR Art. 35 data protection impact assessment when required |
| Fundamental Rights Impact Assessment | Required for public bodies / private entities providing public services (Art. 27) |

---

## General-Purpose AI Models (GPAI)

### GPAI Provider Obligations (Art. 53) -- Effective 2 August 2025

| Obligation | Detail |
|-----------|--------|
| Technical documentation | Maintain documentation of model training/testing process |
| Information for downstream | Provide sufficient info for downstream AI system providers |
| Copyright compliance | Comply with EU copyright law; honor opt-out mechanisms |
| Training data summary | Publish detailed summary of training content per AI Office template |
| EU representative | Non-EU providers must appoint EU-based representative |

### Systemic Risk GPAI Models (Art. 51, 55)

Classified as systemic risk if: high impact capabilities, AI Office designation, or trained with >10^25 FLOPs (rebuttable presumption).

**Additional obligations:** Model evaluation with adversarial testing, red-teaming proportionate to risk, systemic risk assessment and mitigation, incident tracking and reporting, cybersecurity protection, energy consumption reporting.

---

## Conformity Assessment Workflow

The agent guides organizations through conformity assessment for high-risk AI systems.

### Workflow: Internal Control (Annex VI)

1. **Establish QMS** per Art. 17 -- document design, development, testing, data management, and post-market monitoring processes.
2. **Compile technical documentation** per Art. 11 -- system description, development process, risk management, data governance, performance metrics.
3. **Implement all Chapter III Section 2 requirements** -- verify each obligation is addressed.
4. **Conduct internal assessment:**
   - Verify risk management system addresses all identified risks (Art. 9)
   - Verify data governance meets Art. 10 requirements
   - Verify technical documentation is complete and current (Art. 11)
   - Verify logging capability (Art. 12)
   - Verify transparency and instructions for use (Art. 13)
   - Verify human oversight design (Art. 14)
   - Verify accuracy, robustness, cybersecurity (Art. 15)
   - Confirm QMS covers all required elements (Art. 17)
5. **Sign EU Declaration of Conformity** (Art. 47), affix CE marking (Art. 48), register in EU database (Art. 49).
6. **Implement post-market monitoring** (Art. 72) and maintain documentation updates.
7. **Validation checkpoint:** All 12 provider obligations verified; declaration signed; CE marking affixed; EU database registration complete; post-market monitoring operational.

### Workflow: Third-Party Assessment (Annex VII)

Required for biometric identification systems (Annex III point 1) and cases where harmonized standards are insufficient.

1. **Complete all internal control steps** above.
2. **Select and engage notified body** with relevant AI system expertise.
3. **QMS assessment** -- notified body reviews and assesses QMS; issues certificate or requires corrective action; annual surveillance.
4. **Technical documentation assessment** -- notified body reviews documentation, tests system, issues type-examination certificate.
5. **Sign EU Declaration of Conformity** with notified body identification number on CE marking.
6. **Maintain ongoing compliance** -- notified body surveillance, notify of significant changes, maintain all documentation.
7. **Validation checkpoint:** Notified body certificates issued; CE marking with NB number affixed; ongoing surveillance scheduled.

---

## Bias Detection and Fairness Testing

The agent performs bias detection per Art. 10 data governance requirements.

### Workflow: Bias Testing

1. **Define protected attributes** -- age, gender, ethnicity, disability, religion, and other relevant characteristics for the system's context.
2. **Analyze data distribution** -- check representation ratios (target: 0.8-1.25 vs. population), class imbalance ratios (>0.5), and coverage of all known groups.
3. **Evaluate outcome fairness** using these metrics:
   - Demographic parity: P(positive outcome) equal across groups (within 80% / four-fifths rule)
   - Equalized odds: TPR and FPR equal across groups (within 80%)
   - Predictive parity: PPV equal across groups (within 80%)
   - Calibration: Predicted probabilities accurate for all groups (within 5pp)
4. **Identify proxy variables** -- check for features correlated with protected attributes.
5. **Implement mitigation** -- data augmentation, re-sampling, re-weighting, adversarial debiasing, threshold adjustment, or reject option classification as appropriate.
6. **Validate** -- re-run analysis to confirm improvement.
7. **Document** -- record all findings, measures taken, and residual bias levels in technical documentation.
8. **Validation checkpoint:** All protected attributes tested; fairness metrics within thresholds or residual bias documented with justification; mitigation measures recorded.

### Example: Bias Detection Command

```bash
# Analyze dataset statistics for bias indicators
python scripts/ai_bias_detector.py --input dataset_stats.json \
  --protected-attributes gender,age_group,ethnicity

# Output as JSON for integration with compliance documentation
python scripts/ai_bias_detector.py --input dataset_stats.json --json
```

---

## Implementation Timeline

| Date | Milestone | Key Requirements |
|------|-----------|-----------------|
| 1 Aug 2024 | Entry into force | Regulation published |
| 2 Feb 2025 | Prohibited practices + AI literacy | Art. 5 prohibitions; Art. 4 AI literacy |
| 2 Aug 2025 | GPAI obligations + governance | Art. 53, 55 GPAI obligations; AI Office operational |
| 2 Aug 2026 | **Full application** | All remaining: high-risk, deployer, transparency, conformity, CE marking |
| 2 Aug 2027 | Extended deadline | Certain Annex I Section B high-risk safety components |

### Penalties (Art. 99)

| Violation Type | Maximum Fine | % Global Turnover |
|---------------|-------------|-------------------|
| Prohibited AI practices | EUR 35 million | 7% (whichever higher) |
| High-risk non-compliance | EUR 15 million | 3% (whichever higher) |
| Misleading information to authorities | EUR 7.5 million | 1% (whichever higher) |

SMEs and startups receive proportionate treatment (lower of absolute or percentage).

---

## AI Model Documentation Templates

### Template: AI System Description

```
AI SYSTEM DESCRIPTION
=====================
System Name:
Version:
Provider:
Date:

1. GENERAL INFORMATION
   - Intended purpose:
   - Target users (deployers):
   - Affected persons:
   - Geographic scope:
   - AI Act classification:
   - Annex III category (if applicable):

2. TECHNICAL ARCHITECTURE
   - Model type:
   - Input data modalities:
   - Output description:
   - Key design choices and rationale:

3. TRAINING AND DATA
   - Training data sources:
   - Data volume and characteristics:
   - Data preparation methods:
   - Bias examination results:

4. PERFORMANCE
   - Accuracy metrics:
   - Robustness testing results:
   - Known limitations:
   - Performance across demographic groups:

5. HUMAN OVERSIGHT
   - Oversight level: [human-in-the-loop / on-the-loop / in-command]
   - Override mechanism:
   - Automation bias safeguards:
```

### Template: Risk Management Documentation

```
RISK MANAGEMENT SYSTEM -- AI SYSTEM
====================================
System Name:
Version:
Risk Management Lead:
Date:

1. RISK IDENTIFICATION
   | Risk ID | Description | Likelihood | Severity | Risk Level |
   |---------|-------------|------------|----------|------------|
   | R-001   |             |            |          |            |

2. RISK CONTROL MEASURES
   | Risk ID | Measure | Type | Verification | Status |
   |---------|---------|------|-------------|--------|
   | R-001   |         |      |             |        |

3. RESIDUAL RISK ASSESSMENT
   - Acceptability determination:
   - Overall risk-benefit analysis:

4. POST-MARKET DATA INTEGRATION
   - Review frequency:
   - Trigger conditions for update:
```

---

## Tools

### AI Risk Classifier

```bash
# Classify AI system from JSON description
python scripts/ai_risk_classifier.py --input system_description.json

# Classify from inline JSON
python scripts/ai_risk_classifier.py --inline '{
  "name": "Resume Screener",
  "description": "AI system that screens job applications and ranks candidates",
  "domain": "employment",
  "uses_biometrics": false,
  "decision_type": "automated_with_review",
  "affected_persons": "job applicants",
  "eu_deployment": true
}'

# JSON output for programmatic use
python scripts/ai_risk_classifier.py --input system.json --json
```

### AI Compliance Checker

```bash
# Full compliance check with gap analysis
python scripts/ai_compliance_checker.py --input compliance_status.json

# Check deployer obligations only
python scripts/ai_compliance_checker.py --input compliance_status.json --role deployer

# JSON output with remediation steps
python scripts/ai_compliance_checker.py --input compliance_status.json --json
```

### AI Bias Detector

```bash
# Analyze dataset for bias indicators mapped to Art. 10
python scripts/ai_bias_detector.py --input dataset_stats.json

# Specify protected attributes explicitly
python scripts/ai_bias_detector.py --input dataset_stats.json \
  --protected-attributes gender,age_group,ethnicity --json
```

---

## Reference Documentation

| Document | Path | Description |
|----------|------|-------------|
| Classification Guide | `references/ai-act-classification-guide.md` | Complete Annex III categories, decision trees, prohibited practices, GPAI classification |
| Governance Framework | `references/ai-governance-framework.md` | Organizational structure, ethics board, model lifecycle, conformity assessment procedures |
| Documentation Templates | `references/ai-technical-documentation-templates.md` | Full templates for system description, risk management, data governance, testing, oversight, post-market monitoring, incident reporting, FRIA |

---

---

## Troubleshooting

| Problem | Possible Cause | Resolution |
|---------|---------------|------------|
| AI system classified as HIGH-RISK but organization believes it qualifies for Art. 6(3) exception | Exception analysis incomplete or domain mapping incorrect | Re-evaluate against all Art. 6(3) exception criteria; the system must perform a narrow procedural task, improve the result of a previously completed human activity, or be purely preparatory; document rationale with legal review |
| Bias detector reports disparate impact but model performs well overall | Aggregated metrics mask subgroup disparities; four-fifths rule violation on specific protected attributes | Analyze per-group positive outcome rates using `--protected-attributes` flag; implement targeted mitigation (re-sampling, threshold adjustment) for affected groups; document residual bias with justification |
| Compliance checker returns low score despite extensive documentation | Documentation exists but key compliance fields marked as incomplete or not up to date | Verify each obligation field in the input JSON reflects current state; ensure `kept_up_to_date` and `lifecycle_coverage` flags are set; update technical documentation per Art. 11 before reassessment |
| System falls under multiple Annex III categories simultaneously | AI system serves multiple domains (e.g., employment + education) | Classify under the highest-risk applicable category; apply the most stringent obligations; document classification rationale for each category |
| GPAI model obligations unclear for downstream provider | Upstream GPAI provider has not supplied sufficient documentation per Art. 53 | Request technical documentation, training data summary, and copyright compliance information from the GPAI provider; if unavailable, document the gap and assess independent obligations |
| Conformity assessment route uncertain (internal vs. third-party) | Biometric identification system or insufficient harmonized standards | Biometric ID systems (Annex III point 1) require third-party assessment (Annex VII); all others may use internal control (Annex VI) unless harmonized standards are unavailable; consult notified body |
| Post-market monitoring shows model performance degradation | Data drift, concept drift, or deployment context changed since initial assessment | Trigger Art. 72 post-market monitoring procedures; report serious incidents within 15 days; update risk management system and technical documentation; consider re-running conformity assessment |

---

## Success Criteria

- **All AI systems inventoried and classified** -- every system assessed against the risk-based framework with documented classification rationale, including Art. 6(3) exception analysis where applicable
- **Prohibited practices identified and discontinued** -- all Art. 5 prohibited practices flagged by February 2, 2025, with documented evidence of discontinuation or lawful exception application
- **High-risk systems fully compliant by August 2, 2026** -- all 12 provider obligations verified, EU Declaration of Conformity signed, CE marking affixed, and EU database registration complete
- **Bias testing completed for all high-risk systems** -- demographic parity, equalized odds, and predictive parity metrics within four-fifths threshold for all protected attributes, or residual bias documented with justification
- **GPAI model obligations met by August 2, 2025** -- technical documentation maintained, downstream provider information supplied, copyright compliance verified, and training data summary published
- **Conformity assessment completed per correct route** -- internal control (Annex VI) or third-party assessment (Annex VII) selected based on system classification, with all certificates issued and filed

---

## Scope & Limitations

**In Scope:**
- AI system risk classification across all four tiers (Prohibited, High-Risk, Limited Risk, Minimal Risk)
- Annex III category analysis and Art. 6(3) exception evaluation
- Provider and deployer obligation mapping with compliance gap analysis
- GPAI model classification including systemic risk determination (10^25 FLOPs threshold)
- Bias detection and fairness testing mapped to Art. 10 data governance requirements
- Conformity assessment workflow guidance (Annex VI internal control and Annex VII third-party)
- Implementation timeline tracking with penalty exposure assessment

**Out of Scope:**
- Actual ML model training, retraining, or adversarial testing -- this skill provides compliance frameworks, not ML engineering tools
- Notified body selection, engagement, or audit execution
- National regulatory sandbox applications or experimental AI system exemptions
- Detailed GPAI Code of Practice implementation beyond obligation mapping
- CE marking physical affixation or EU database registration system interaction
- Legal advice on liability, insurance, or contractual allocation of AI Act obligations

**Important Notes:**
- The EU AI Act compliance deadline of August 2, 2026 for high-risk systems is firm -- organizations should begin classification and gap analysis immediately
- Penalties are severe: up to EUR 35 million or 7% of global turnover for prohibited practices, EUR 15 million or 3% for high-risk non-compliance
- SMEs and startups receive proportionate penalty treatment (lower of absolute or percentage)

---

## Integration Points

| Skill | Integration | When to Use |
|-------|-------------|-------------|
| `iso42001-ai-management` | ISO 42001 AIMS provides organizational framework for EU AI Act compliance; certification demonstrates Art. 17 QMS | When building AI governance program that satisfies both ISO 42001 and EU AI Act |
| `gdpr-dsgvo-expert` | Art. 10 data governance overlaps with GDPR; high-risk AI systems processing personal data require DPIA per GDPR Art. 35 | When AI system processes personal data and requires combined DPIA + conformity assessment |
| `mdr-745-specialist` | AI medical devices fall under both EU AI Act and MDR; MDR conformity assessment may satisfy AI Act per Art. 120 | When AI-enabled medical device requires dual MDR and AI Act compliance |
| `fda-consultant-specialist` | Cross-jurisdictional AI/ML SaMD compliance mapping between FDA PCCP and EU AI Act | When AI medical device is marketed in both US and EU |
| `infrastructure-compliance-auditor` | Technical security controls supporting Art. 15 accuracy, robustness, and cybersecurity requirements | When validating infrastructure security for deployed high-risk AI systems |

---

## Tool Reference

### ai_risk_classifier.py

Classifies AI systems into EU AI Act risk categories based on a JSON system description.

| Flag | Required | Description |
|------|----------|-------------|
| `--input <file>` | Yes (unless `--inline`) | Path to JSON file containing AI system description |
| `--inline '<json>'` | No | Inline JSON system description for quick classification |
| `--json` | No | Output results in JSON format for programmatic use |
| `--output <file>` | No | Export classification report to specified file path |

**Input Fields:** `name`, `description`, `domain`, `sub_domain`, `uses_biometrics`, `biometric_type`, `biometric_context`, `interacts_with_persons`, `generates_content`, `content_type`, `decision_type`, `affected_persons`, `is_safety_component`, `product_legislation`, `eu_deployment`, `social_scoring`, `manipulates_behavior`, `targets_vulnerable_groups`, `predictive_policing_individual`, `untargeted_scraping`, `is_gpai`, `training_compute_flops`, `critical_infrastructure`, `infrastructure_type`.

### ai_compliance_checker.py

Validates AI system compliance against all provider and deployer obligations with gap analysis.

| Flag | Required | Description |
|------|----------|-------------|
| `--input <file>` | Yes | Path to JSON compliance status file |
| `--role <role>` | No | Check obligations for specific role: `provider` (default) or `deployer` |
| `--json` | No | Output results in JSON format with remediation steps |
| `--output <file>` | No | Export compliance report to specified file path |

**Output:** Overall compliance score (0-100), per-obligation status, gap analysis with Art. references, and prioritized remediation recommendations.

### ai_bias_detector.py

Analyzes dataset statistics for bias indicators mapped to Art. 10 data governance requirements.

| Flag | Required | Description |
|------|----------|-------------|
| `--input <file>` | Yes | Path to JSON file with dataset statistics (demographics, outcomes, correlations) |
| `--protected-attributes <attrs>` | No | Comma-separated list of protected attributes to analyze (e.g., `gender,age_group,ethnicity`) |
| `--json` | No | Output results in JSON format |
| `--output <file>` | No | Export bias assessment report to specified file path |

**Thresholds:** Representation ratio 0.8-1.25 (within 20% of population), class imbalance >0.5, four-fifths rule (0.8) for disparate impact, proxy correlation >0.5 for proxy variable detection.

---

**Regulation Reference:** Regulation (EU) 2024/1689 of the European Parliament and of the Council of 13 June 2024
**Last Updated:** March 2026
**Version:** 1.0.0

---

## fda-consultant-specialist

Source path: `references/ra-qm-team/fda-consultant-specialist/SKILL.md`

# FDA Consultant Specialist

FDA regulatory consulting for medical device manufacturers covering submission pathways, Quality System Regulation (QSR), HIPAA compliance, and device cybersecurity requirements.

## Table of Contents

- [FDA Pathway Selection](#fda-pathway-selection)
- [510(k) Submission Process](#510k-submission-process)
- [QSR Compliance](#qsr-compliance)
- [HIPAA for Medical Devices](#hipaa-for-medical-devices)
- [Device Cybersecurity](#device-cybersecurity)
- [Resources](#resources)

---

## Clarify First

Before selecting a pathway or assessing compliance, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Device class and predicate** — Class I/II/III and whether a predicate device exists (drives 510(k) vs De Novo vs PMA)
- [ ] **Intended use / indications** — what the device claims and its use environment (sets the substantial-equivalence argument and clinical-evidence needs)
- [ ] **Software/AI nature** — SaMD, adaptive AI needing a PCCP, or connected device (cybersecurity/SBOM) (changes the required documentation set)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the analysis.

## FDA Pathway Selection

Determine the appropriate FDA regulatory pathway based on device classification and predicate availability.

### Decision Framework

```
Predicate device exists?
├── YES → Substantially equivalent?
│   ├── YES → 510(k) Pathway
│   │   ├── No design changes → Abbreviated 510(k)
│   │   ├── Manufacturing only → Special 510(k)
│   │   └── Design/performance → Traditional 510(k)
│   └── NO → PMA or De Novo
└── NO → Novel device?
    ├── Low-to-moderate risk → De Novo
    └── High risk (Class III) → PMA
```

### Pathway Comparison

| Pathway | When to Use | Timeline | Cost |
|---------|-------------|----------|------|
| 510(k) Traditional | Predicate exists, design changes | 90 days | $21,760 |
| 510(k) Special | Manufacturing changes only | 30 days | $21,760 |
| 510(k) Abbreviated | Guidance/standard conformance | 30 days | $21,760 |
| De Novo | Novel, low-moderate risk | 150 days | $134,676 |
| PMA | Class III, no predicate | 180+ days | $425,000+ |

### Pre-Submission Strategy

1. Identify product code and classification
2. Search 510(k) database for predicates
3. Assess substantial equivalence feasibility
4. Prepare Q-Sub questions for FDA
5. Schedule Pre-Sub meeting if needed

**Reference:** See [fda_submission_guide.md](references/fda_submission_guide.md) for pathway decision matrices and submission requirements.

---

## 510(k) Submission Process

### Workflow

```
Phase 1: Planning
├── Step 1: Identify predicate device(s)
├── Step 2: Compare intended use and technology
├── Step 3: Determine testing requirements
└── Checkpoint: SE argument feasible?

Phase 2: Preparation
├── Step 4: Complete performance testing
├── Step 5: Prepare device description
├── Step 6: Document SE comparison
├── Step 7: Finalize labeling
└── Checkpoint: All required sections complete?

Phase 3: Submission
├── Step 8: Assemble submission package
├── Step 9: Submit via eSTAR
├── Step 10: Track acknowledgment
└── Checkpoint: Submission accepted?

Phase 4: Review
├── Step 11: Monitor review status
├── Step 12: Respond to AI requests
├── Step 13: Receive decision
└── Verification: SE letter received?
```

### Required Sections (21 CFR 807.87)

| Section | Content |
|---------|---------|
| Cover Letter | Submission type, device ID, contact info |
| Form 3514 | CDRH premarket review cover sheet |
| Device Description | Physical description, principles of operation |
| Indications for Use | Form 3881, patient population, use environment |
| SE Comparison | Side-by-side comparison with predicate |
| Performance Testing | Bench, biocompatibility, electrical safety |
| Software Documentation | Level of concern, hazard analysis (IEC 62304) |
| Labeling | IFU, package labels, warnings |
| 510(k) Summary | Public summary of submission |

### Common RTA Issues

| Issue | Prevention |
|-------|------------|
| Missing user fee | Verify payment before submission |
| Incomplete Form 3514 | Review all fields, ensure signature |
| No predicate identified | Confirm K-number in FDA database |
| Inadequate SE comparison | Address all technological characteristics |

---

## QSR Compliance

Quality System Regulation (21 CFR Part 820) requirements for medical device manufacturers.

### Key Subsystems

| Section | Title | Focus |
|---------|-------|-------|
| 820.20 | Management Responsibility | Quality policy, org structure, management review |
| 820.30 | Design Controls | Input, output, review, verification, validation |
| 820.40 | Document Controls | Approval, distribution, change control |
| 820.50 | Purchasing Controls | Supplier qualification, purchasing data |
| 820.70 | Production Controls | Process validation, environmental controls |
| 820.100 | CAPA | Root cause analysis, corrective actions |
| 820.181 | Device Master Record | Specifications, procedures, acceptance criteria |

### Design Controls Workflow (820.30)

```
Step 1: Design Input
└── Capture user needs, intended use, regulatory requirements
    Verification: Inputs reviewed and approved?

Step 2: Design Output
└── Create specifications, drawings, software architecture
    Verification: Outputs traceable to inputs?

Step 3: Design Review
└── Conduct reviews at each phase milestone
    Verification: Review records with signatures?

Step 4: Design Verification
└── Perform testing against specifications
    Verification: All tests pass acceptance criteria?

Step 5: Design Validation
└── Confirm device meets user needs in actual use conditions
    Verification: Validation report approved?

Step 6: Design Transfer
└── Release to production with DMR complete
    Verification: Transfer checklist complete?
```

### CAPA Process (820.100)

1. **Identify**: Document nonconformity or potential problem
2. **Investigate**: Perform root cause analysis (5 Whys, Fishbone)
3. **Plan**: Define corrective/preventive actions
4. **Implement**: Execute actions, update documentation
5. **Verify**: Confirm implementation complete
6. **Effectiveness**: Monitor for recurrence (30-90 days)
7. **Close**: Management approval and closure

**Reference:** See [qsr_compliance_requirements.md](references/qsr_compliance_requirements.md) for detailed QSR implementation guidance.

---

## HIPAA for Medical Devices

HIPAA requirements for devices that create, store, transmit, or access Protected Health Information (PHI).

### Applicability

| Device Type | HIPAA Applies |
|-------------|---------------|
| Standalone diagnostic (no data transmission) | No |
| Connected device transmitting patient data | Yes |
| Device with EHR integration | Yes |
| SaMD storing patient information | Yes |
| Wellness app (no diagnosis) | Only if stores PHI |

### Required Safeguards

```
Administrative (§164.308)
├── Security officer designation
├── Risk analysis and management
├── Workforce training
├── Incident response procedures
└── Business associate agreements

Physical (§164.310)
├── Facility access controls
├── Workstation security
└── Device disposal procedures

Technical (§164.312)
├── Access control (unique IDs, auto-logoff)
├── Audit controls (logging)
├── Integrity controls (checksums, hashes)
├── Authentication (MFA recommended)
└── Transmission security (TLS 1.2+)
```

### Risk Assessment Steps

1. Inventory all systems handling ePHI
2. Document data flows (collection, storage, transmission)
3. Identify threats and vulnerabilities
4. Assess likelihood and impact
5. Determine risk levels
6. Implement controls
7. Document residual risk

**Reference:** See [hipaa_compliance_framework.md](references/hipaa_compliance_framework.md) for implementation checklists and BAA templates.

---

## Device Cybersecurity

FDA cybersecurity requirements for connected medical devices.

### Premarket Requirements

| Element | Description |
|---------|-------------|
| Threat Model | STRIDE analysis, attack trees, trust boundaries |
| Security Controls | Authentication, encryption, access control |
| SBOM | Software Bill of Materials (CycloneDX or SPDX) |
| Security Testing | Penetration testing, vulnerability scanning |
| Vulnerability Plan | Disclosure process, patch management |

### Device Tier Classification

**Tier 1 (Higher Risk):**
- Connects to network/internet
- Cybersecurity incident could cause patient harm

**Tier 2 (Standard Risk):**
- All other connected devices

### Postmarket Obligations

1. Monitor NVD and ICS-CERT for vulnerabilities
2. Assess applicability to device components
3. Develop and test patches
4. Communicate with customers
5. Report to FDA per guidance

### Coordinated Vulnerability Disclosure

```
Researcher Report
    ↓
Acknowledgment (48 hours)
    ↓
Initial Assessment (5 days)
    ↓
Fix Development
    ↓
Coordinated Public Disclosure
```

**Reference:** See [device_cybersecurity_guidance.md](references/device_cybersecurity_guidance.md) for SBOM format examples and threat modeling templates.

---

## Resources

### scripts/

| Script | Purpose |
|--------|---------|
| `fda_submission_tracker.py` | Track 510(k)/PMA/De Novo submission milestones and timelines |
| `qsr_compliance_checker.py` | Assess 21 CFR 820 compliance against project documentation |
| `hipaa_risk_assessment.py` | Evaluate HIPAA safeguards in medical device software |

### references/

| File | Content |
|------|---------|
| `fda_submission_guide.md` | 510(k), De Novo, PMA submission requirements and checklists |
| `qsr_compliance_requirements.md` | 21 CFR 820 implementation guide with templates |
| `hipaa_compliance_framework.md` | HIPAA Security Rule safeguards and BAA requirements |
| `device_cybersecurity_guidance.md` | FDA cybersecurity requirements, SBOM, threat modeling |
| `fda_capa_requirements.md` | CAPA process, root cause analysis, effectiveness verification |

### Usage Examples

```bash
# Track FDA submission status
python scripts/fda_submission_tracker.py /path/to/project --type 510k

# Assess QSR compliance
python scripts/qsr_compliance_checker.py /path/to/project --section 820.30

# Run HIPAA risk assessment
python scripts/hipaa_risk_assessment.py /path/to/project --category technical
```

---

## FDA QMSR — Quality Management System Regulation

### Transition from QSR (21 CFR 820) to QMSR

The FDA finalized the Quality Management System Regulation (QMSR) in January 2024, replacing the legacy Quality System Regulation (QSR) with ISO 13485:2016 alignment. The rule became effective **February 2, 2026**.

| Aspect | Legacy QSR (21 CFR 820) | QMSR (Effective Feb 2026) |
|--------|------------------------|---------------------------|
| Framework | FDA-specific prescriptive requirements | Incorporates ISO 13485:2016 by reference |
| Design controls | 820.30 (FDA-specific) | ISO 13485 Clause 7.3 |
| CAPA | 820.100 | ISO 13485 Clause 8.5 |
| Document control | 820.40 | ISO 13485 Clause 4.2 |
| Management responsibility | 820.20 | ISO 13485 Clause 5 |
| Purchasing controls | 820.50 | ISO 13485 Clause 7.4 |

**Key differences under QMSR:**
- ISO 13485:2016 is incorporated by reference as the primary QMS standard
- FDA retains certain device-specific requirements not covered by ISO 13485 (e.g., complaint handling per 21 CFR 820.198)
- Organizations already ISO 13485 certified have a significant head start
- No separate FDA registration for QMS — single system serves both ISO and FDA

### QMSR Transition Checklist

- [ ] Gap analysis: ISO 13485:2016 vs. current QSR compliance
- [ ] Update Quality Manual to reference ISO 13485 clause structure
- [ ] Map existing SOPs to ISO 13485 clauses
- [ ] Address FDA-specific retained requirements (complaint handling, MDR reporting)
- [ ] Train staff on ISO 13485 terminology and structure
- [ ] Update supplier agreements to reference new regulatory framework
- [ ] Conduct internal audit against QMSR requirements
- [ ] Update design history files to ISO 13485 Clause 7.3 format

---

## AI/ML-Based Software as Medical Device (SaMD)

### FDA AI/ML SaMD Framework

| Category | Description | FDA Pathway |
|----------|-------------|-------------|
| Locked algorithm | Algorithm does not change after deployment | Standard 510(k)/De Novo/PMA |
| Adaptive algorithm (PCCP) | Algorithm learns and changes with use | Predetermined Change Control Plan |
| Continuously learning | Real-time adaptation from new data | Case-by-case; PCCP required |

### AI/ML SaMD Submission Requirements

```
AI/ML SaMD Submission Package
├── Algorithm description and architecture
├── Training data characterization
│   ├── Data sources and collection methods
│   ├── Demographics and representativeness
│   ├── Data quality and labeling methodology
│   └── Training/validation/test split rationale
├── Performance evaluation
│   ├── Pre-specified performance goals
│   ├── Standalone performance metrics (sensitivity, specificity, AUC)
│   ├── Subgroup analysis (age, sex, race, site)
│   └── Real-world performance data (if available)
├── Reference standard justification
├── Predetermined Change Control Plan (if adaptive)
├── Human factors / user interface
├── Cybersecurity documentation
└── Software documentation per IEC 62304
```

### Good Machine Learning Practice (GMLP) Principles

1. Multi-disciplinary expertise throughout product lifecycle
2. Good software engineering and security practices
3. Representative training and test datasets
4. Independent test datasets separate from training
5. Reference datasets based on best available methods
6. Model design tailored to available data and intended use
7. Focus on performance of human-AI team
8. Clinical study testing demonstrates real-world performance
9. Users provided clear, essential information
10. Deployed models monitored for performance with retraining managed

---

## Predetermined Change Control Plan (PCCP) for AI/ML Devices

### PCCP Structure

| Section | Content | Evidence |
|---------|---------|----------|
| Description of modifications | Types of changes the algorithm will make | Change specification document |
| Modification protocol | How changes will be developed and tested | Validation protocol |
| Impact assessment | How each change type affects safety and effectiveness | Risk analysis per change type |
| Performance monitoring | Ongoing real-world performance tracking | Monitoring plan with metrics |
| Update verification | How each update will be verified before deployment | Verification and validation plan |
| Transparency | How users will be notified of changes | Communication plan |

### PCCP Change Categories

| Category | Example | Verification Level |
|----------|---------|-------------------|
| Performance improvement | Retrained model with additional data | Automated testing + clinical validation |
| Input adaptation | New imaging modality support | Full V&V cycle |
| Output modification | New risk categories or confidence levels | Clinical study |
| Architecture change | Model architecture update | New submission (510(k)/PMA supplement) |

---

## Enhanced Cybersecurity Requirements (PATCH Act)

The PATCH Act (effective March 2023, codified in FD&C Act §524B) requires:

| Requirement | Details | Evidence |
|-------------|---------|----------|
| Cybersecurity plan | Submit plan to monitor, identify, and address vulnerabilities | Premarket submission section |
| SBOM | Software Bill of Materials including commercial, open-source, off-the-shelf components | CycloneDX or SPDX format |
| Patch/update capability | Design device to be patchable throughout lifecycle | Architecture documentation |
| Coordinated vulnerability disclosure | Establish and maintain CVD process | Published security policy |
| Postmarket updates | Provide patches and updates in a reasonably justified cycle | Patch management plan |

### Cybersecurity Documentation for Premarket Submissions

```
Cybersecurity Premarket Package
├── Security risk assessment
│   ├── Threat model (STRIDE or equivalent)
│   ├── Security risk analysis per AAMI TIR57
│   └── Attack surface analysis
├── Security architecture
│   ├── Security controls implementation
│   ├── Cryptographic architecture
│   └── Network architecture and trust boundaries
├── SBOM (Software Bill of Materials)
│   ├── All software components (commercial, open-source, custom)
│   ├── Version information
│   └── Known vulnerability status
├── Security testing
│   ├── Static analysis (SAST)
│   ├── Dynamic analysis (DAST)
│   ├── Penetration testing report
│   ├── Fuzz testing results
│   └── Vulnerability scanning results
├── Lifecycle security plan
│   ├── Patch management process
│   ├── End-of-life/end-of-support plan
│   └── Customer communication plan
└── Coordinated vulnerability disclosure policy
```

---

## Cross-Reference: EU AI Act for AI Medical Devices

AI-enabled medical devices must comply with both FDA requirements and EU AI Act when marketed in both jurisdictions:

| Aspect | FDA Approach | EU AI Act Approach | Harmonization Strategy |
|--------|-------------|-------------------|----------------------|
| Risk classification | SaMD risk framework (IMDRF) | Annex III high-risk (medical devices) | Map to both frameworks; use higher standard |
| Transparency | Labeling requirements | Art. 13 transparency obligations | Unified transparency documentation |
| Data governance | GMLP principles | Art. 10 data and data governance | Comprehensive data quality program |
| Human oversight | Human factors per IEC 62366 | Art. 14 human oversight | Integrated human factors + oversight design |
| Post-market | Real-world performance monitoring | Art. 72 post-market monitoring | Single monitoring system serving both |
| Technical documentation | FDA premarket submission | Annex IV technical documentation | Unified technical file |

> **See also:** `../mdr-745-specialist/SKILL.md` for EU MDR classification of AI/ML medical devices and `../risk-management-specialist/SKILL.md` for ISO 14971 risk management for AI devices.

---

## Updated 510(k) Electronic Submission Requirements (eSTAR)

### eSTAR Mandate

As of October 1, 2023, FDA requires all 510(k) submissions to use the eSTAR template format. Paper submissions are no longer accepted.

| eSTAR Requirement | Details |
|-------------------|---------|
| Template | FDA eSTAR template (fillable PDF) |
| Format | Structured data fields + attachments |
| Attachments | PDF/A format, bookmarked, OCR-searchable |
| File naming | FDA naming convention required |
| Submission portal | CDRH Customer Collaboration Portal or FDA ESG |
| Maximum file size | 100MB per individual file; no total limit |

### eSTAR Section Mapping

| eSTAR Section | Content | Common Deficiencies |
|---------------|---------|---------------------|
| Administrative | Cover letter, user fee, truthful/accurate statement | Missing signatures, incorrect fee |
| Device Description | Complete device description with images/diagrams | Insufficient detail, missing accessories |
| Substantial Equivalence | Predicate comparison table | Incomplete comparison criteria |
| Performance Testing | All test reports with summaries | Missing acceptance criteria, incomplete protocols |
| Software | Level of concern, hazard analysis, architecture | Outdated IEC 62304 compliance |
| Biocompatibility | ISO 10993 evaluation or testing | Missing risk assessment, incomplete contact analysis |
| Sterility | Sterilization validation summary | Missing reprocessing instructions (reusable devices) |
| Labeling | Device labels, IFU, patient materials | Non-compliant with 21 CFR 801 |
| EMC/Electrical Safety | IEC 60601-1 compliance | Missing particular standards |
| Clinical | Clinical data summary (if applicable) | Insufficient clinical evidence for new indications |

---

## Cross-Framework: FDA ↔ MDR ↔ ISO 13485 Mapping

| Process Area | FDA (QMSR/QSR) | EU MDR 2017/745 | ISO 13485:2016 |
|-------------|-----------------|-----------------|----------------|
| Quality management system | 21 CFR 820 / QMSR | Annex IX, Annex XI | Clause 4 |
| Management responsibility | 820.20 / ISO 13485 Cl. 5 | Annex IX §2.2 | Clause 5 |
| Design controls | 820.30 / ISO 13485 Cl. 7.3 | Annex II §6.1, GSPR | Clause 7.3 |
| Document control | 820.40 / ISO 13485 Cl. 4.2 | Annex IX §2.3 | Clause 4.2 |
| Purchasing | 820.50 / ISO 13485 Cl. 7.4 | Annex IX §2.4 | Clause 7.4 |
| Production | 820.70 / ISO 13485 Cl. 7.5 | Annex IX §2.5 | Clause 7.5 |
| CAPA | 820.100 / ISO 13485 Cl. 8.5 | Art. 83 (PMS), Art. 89 (FSCA) | Clause 8.5 |
| Risk management | 820.30(g) / ISO 14971 | Annex I (GSPR), ISO 14971 | Clause 7.1 |
| Clinical evidence | 820.30(f) / clinical data | Annex XIV (clinical evaluation) | N/A (separate) |
| Post-market | 820.198 / MDR/MedWatch | Art. 83-86 (PMS), Art. 87-92 (vigilance) | Clause 8.2.1-8.2.3 |
| Labeling | 21 CFR 801 | Art. 10-13, Annex I Ch. III | N/A (separate) |
| UDI | 21 CFR 830 (FDA UDI) | Art. 27-29 (UDI-DI/PI) | N/A (separate) |
| Cybersecurity | §524B FD&C (PATCH Act) | MDCG 2019-16 | N/A (separate) |
| AI/ML devices | AI/ML SaMD framework + PCCP | EU AI Act + MDR | ISO 13485 + ISO 42001 |

> **Cross-references:** See `../quality-manager-qms-iso13485/SKILL.md` for ISO 13485 implementation aligned with QMSR, and `../mdr-745-specialist/SKILL.md` for EU MDR technical documentation requirements.

---

## FDA Regulatory Updates & Cross-Framework Integration

### FDA QMSR — Quality Management System Regulation

The FDA is aligning 21 CFR Part 820 with ISO 13485:2016 through the Quality Management System Regulation (QMSR), effective February 2, 2026:

- **Key Change:** QSR (21 CFR 820) replaced by ISO 13485 as the recognized quality system standard
- **Impact:** Manufacturers must comply with ISO 13485:2016 instead of QSR-specific requirements
- **Design Controls:** ISO 13485 Clause 7.3 replaces 820.30
- **CAPA:** ISO 13485 Clause 8.5 replaces 820.90/820.100
- **Transition:** FDA accepting both QSR and QMSR during transition period

### AI/ML-Based Software as Medical Device (SaMD)

- **Predetermined Change Control Plan (PCCP):** Required for AI/ML devices that learn and adapt
- **Good Machine Learning Practice (GMLP):** FDA's 10 guiding principles for AI/ML in medical devices
- **Transparency:** Clear labeling of AI/ML-based functionality and limitations
- **Real-World Performance:** Post-market monitoring of AI model performance drift
- **Cross-reference:** See `eu-ai-act-specialist` for EU AI Act requirements for AI medical devices

### Enhanced Cybersecurity Requirements (PATCH Act)

- **Premarket Submissions:** Cybersecurity documentation required for all connected devices
- **Software Bill of Materials (SBOM):** Mandatory for all premarket submissions
- **Coordinated Vulnerability Disclosure:** Required policy for all connected device manufacturers
- **Postmarket Patches:** Cybersecurity patches exempt from 510(k) requirements
- **Cross-reference:** See `infrastructure-compliance-auditor` for technical cybersecurity checks

### Cross-Framework Mapping (FDA ↔ MDR ↔ ISO 13485)

| Area | FDA (QSR/QMSR) | EU MDR 2017/745 | ISO 13485:2016 |
|------|----------------|-----------------|----------------|
| Design Controls | 820.30 / QMSR | Annex II | Clause 7.3 |
| Risk Management | 820.30(g) | Annex I GSPR | ISO 14971 |
| Clinical Evidence | 820.30(f) | Annex XIV | Clause 7.3.7 |
| CAPA | 820.90/100 | Art. 83, 89 | Clause 8.5 |
| Post-Market | 822, MDR | Chapter VII | Clause 8.2.1 |
| Cybersecurity | FDA Guidance | MDCG 2019-16 | IEC 62443 |
| AI/ML | PCCP Framework | EU AI Act | ISO 42001 |

---

## Troubleshooting

| Problem | Possible Cause | Resolution |
|---------|---------------|------------|
| 510(k) submission returned as RTA (Refuse to Accept) | Missing user fee, incomplete Form 3514, no predicate identified, or inadequate SE comparison | Review the RTA checklist per FDA guidance; verify payment, complete all eSTAR fields, confirm K-number in FDA database, and address all technological characteristics in SE comparison |
| QSR compliance checker shows gaps in design controls (820.30) | Design History File incomplete or not aligned with ISO 13485 Clause 7.3 under QMSR | Map existing DHF to ISO 13485 Clause 7.3 structure; ensure design inputs, outputs, reviews, verification, and validation are documented with traceability |
| HIPAA risk assessment returns low score for technical safeguards | Missing encryption at rest/transit, no MFA implementation, or audit logging not enabled | Implement AES-256 encryption at rest, TLS 1.2+ in transit, MFA for all users with ePHI access, and comprehensive audit logging; run `hipaa_risk_assessment.py` with `--category technical` to validate |
| FDA AI request (Additional Information) received during 510(k) review | Performance testing insufficient, SE argument incomplete, or software documentation gaps | Respond within 180 days; address each question specifically; supplement with additional test data, clinical evidence, or software documentation per IEC 62304 |
| QMSR transition gap analysis reveals significant differences | Organization structured QMS around legacy 21 CFR 820 rather than ISO 13485 | Conduct systematic gap analysis mapping 820 subsections to ISO 13485 clauses; prioritize complaint handling (retained FDA requirement), risk-based evidence across all processes, and updated Quality Manual |
| Cybersecurity documentation rejected in premarket submission | SBOM incomplete, threat model missing, or coordinated vulnerability disclosure policy not published | Generate comprehensive SBOM in CycloneDX or SPDX format; complete STRIDE threat model per AAMI TIR57; publish CVD policy; document patch management lifecycle plan |
| AI/ML SaMD submission lacks Predetermined Change Control Plan | Adaptive algorithm deployed without PCCP framework | Develop PCCP covering modification types, validation protocol, impact assessment, performance monitoring, and user notification plan; include all four change categories with appropriate verification levels |

---

## Success Criteria

- **510(k) submission accepted on first attempt** -- zero RTA deficiencies, with all eSTAR sections complete, user fee verified, predicate identified, and SE comparison addressing all technological characteristics
- **QSR/QMSR compliance score above 85%** -- as measured by `qsr_compliance_checker.py`, with all critical subsections (design controls, CAPA, document control) showing evidence of implementation
- **HIPAA technical safeguards fully implemented** -- AES-256 encryption at rest, TLS 1.2+ in transit, MFA enforced, audit controls active, and automatic logoff configured for all systems handling ePHI
- **FDA submission timeline targets met** -- 510(k) traditional within 90 days, De Novo within 150 days, PMA within 180 days, tracked via `fda_submission_tracker.py` milestones
- **QMSR transition completed** -- Quality Manual references ISO 13485 clause structure, all SOPs mapped, FDA-specific retained requirements addressed, and internal audit conducted against QMSR requirements
- **Cybersecurity documentation complete for all connected devices** -- SBOM, threat model, security testing reports, vulnerability disclosure policy, and patch management plan included in premarket submissions

---

## Scope & Limitations

**In Scope:**
- FDA regulatory pathway selection (510(k), De Novo, PMA) with decision framework and comparison
- 510(k) submission process including eSTAR requirements, SE comparison, and RTA prevention
- Quality System Regulation (21 CFR 820) and QMSR (ISO 13485:2016 alignment) compliance assessment
- HIPAA Security Rule safeguard evaluation for medical device software
- Device cybersecurity requirements including SBOM, threat modeling, and PATCH Act compliance
- AI/ML SaMD framework including PCCP, GMLP principles, and training data characterization
- Cross-framework mapping between FDA, EU MDR, and ISO 13485

**Out of Scope:**
- Preparation or writing of actual FDA submission documents -- this skill provides frameworks and gap analysis, not document authoring
- Clinical trial design, execution, or statistical analysis for PMA clinical data
- FDA establishment registration, device listing, or UDI system implementation
- Post-market surveillance reporting (MDR, MedWatch) beyond process guidance
- De novo classification request scientific review preparation
- Direct interaction with FDA reviewers or Pre-Submission (Q-Sub) meeting facilitation

**Important Notes:**
- The QMSR became effective February 2, 2026 -- all manufacturers must now comply with ISO 13485:2016 as incorporated by reference, with FDA-specific retained requirements
- The Quality System Inspection Technique (QSIT) has been withdrawn and replaced with updated inspection procedures under Compliance Program 7382.850
- Risk-based thinking is now expected across all QMS processes under QMSR, not just design controls

---

## Integration Points

| Skill | Integration | When to Use |
|-------|-------------|-------------|
| `quality-manager-qms-iso13485` | ISO 13485 QMS implementation aligned with QMSR; process management and supplier qualification | When implementing QMS satisfying both ISO 13485 certification and FDA QMSR requirements |
| `mdr-745-specialist` | Cross-framework mapping for dual US/EU market submissions; technical documentation alignment | When medical device requires both FDA clearance/approval and EU MDR CE marking |
| `capa-officer` | CAPA process management per ISO 13485 Clause 8.5 (replacing legacy 820.100 under QMSR) | When managing corrective and preventive actions within the FDA quality system |
| `risk-management-specialist` | ISO 14971 risk management integrated with design controls and cybersecurity risk assessment | When conducting risk analysis for premarket submissions per 820.30(g) and AAMI TIR57 |
| `eu-ai-act-specialist` | Cross-jurisdictional AI/ML compliance for devices marketed in both US and EU | When AI-enabled medical device requires both FDA PCCP framework and EU AI Act conformity assessment |
| `infrastructure-compliance-auditor` | Technical cybersecurity validation for connected device security controls | When documenting cybersecurity architecture and SBOM for premarket submissions |

---

## Tool Reference

### fda_submission_tracker.py

Tracks FDA submission milestones and calculates regulatory timelines for 510(k), De Novo, and PMA pathways.

| Flag | Required | Description |
|------|----------|-------------|
| `<project_dir>` | Yes | Path to project directory containing submission documents |
| `--type <pathway>` | No | Submission type: `510k` (default), `de_novo`, `pma`, `pma_supplement` |
| `--json` | No | Output results in JSON format |

**Output:** Milestone tracking with completion status, timeline calculations against FDA review goals, phase progress (planning, preparation, submission, review, decision), and overdue milestone alerts.

### qsr_compliance_checker.py

Assesses compliance with 21 CFR Part 820 / QMSR by analyzing project documentation for evidence of implementation.

| Flag | Required | Description |
|------|----------|-------------|
| `<project_dir>` | Yes | Path to project directory containing QMS documentation |
| `--section <section>` | No | Check specific QSR section (e.g., `820.30` for design controls, `820.100` for CAPA) |
| `--json` | No | Output results in JSON format |

**Output:** Per-section compliance status, evidence found (document patterns and keyword matches), compliance percentage, gap identification with required evidence descriptions.

### hipaa_risk_assessment.py

Evaluates HIPAA Security Rule safeguards for medical device software and connected devices.

| Flag | Required | Description |
|------|----------|-------------|
| `<project_dir>` | Yes | Path to project directory for assessment |
| `--category <cat>` | No | Assess specific category: `administrative`, `physical`, `technical`, or all (default) |
| `--json` | No | Output results in JSON format |

**Output:** Per-safeguard compliance status across administrative (Section 164.308), physical (Section 164.310), and technical (Section 164.312) categories, with weighted scoring, evidence detection, and remediation recommendations.

---

## fda-qsr-audit-prep

Source path: `references/ra-qm-team/audit-prep/fda-qsr-audit-prep/SKILL.md`

# FDA QSR / QMSR Audit Prep

Operational playbook for FDA inspection preparation under Quality System Regulation (21 CFR 820) and the transitioning Quality Management System Regulation (QMSR, fully effective 2026, harmonizing with ISO 13485:2016).

When to use this skill vs. fda-consultant-specialist:
- **This skill**: FDA inspection imminent OR 483/Warning Letter received; need sprint
- **fda-consultant-specialist**: building / maintaining QMS; multi-quarter

---

## When to use this skill

| Situation | Skill applies |
|-----------|---------------|
| FDA inspection announced (or unannounced visit imminent) | Yes — start immediately |
| Form 483 observation received | Yes — `scripts/qsr_readiness_score.py` to assess + plan response |
| Warning Letter received | Yes — plus engage outside FDA counsel |
| Annual readiness assessment | Yes — periodic sprint |
| Building QMS from scratch | Use `ra-qm-team/fda-consultant-specialist` |
| Medical device submission (510k / PMA) | Use `ra-qm-team/fda-consultant-specialist` |

---

## The audit-prep sprint at a glance

### 2-week sprint (announced inspection, mature QMS)

```
Week 1: Inventory, walkthrough rehearsal, gap remediation
Week 2: Inspection week (front room + back room operation)
```

### 8-week sprint (gaps identified, scheduled inspection)

```
Weeks 1-2: Readiness assessment + 483 / WL prior issue review
Weeks 3-6: Gap remediation (DHF, CAPA, complaint records, etc.)
Weeks 7-8: Mock inspection + final remediation + inspection prep
```

### Reactive: 483 / Warning Letter response

```
- 483: 15 business days to respond (then ongoing)
- Warning Letter: 15 business days to respond (then full corrective action plan)
- Approach: Acknowledge + investigate root cause + corrective action plan + commitment + evidence
```

---

## QSR / QMSR key audit areas

| 21 CFR 820 Subpart | Topic | Audit focus |
|--------------------|-------|-------------|
| Subpart B | Quality system | Management responsibility, quality policy, planning |
| Subpart C | Design controls | Design history file (DHF), design reviews, V&V |
| Subpart D | Document controls | Document approval, change control, distribution |
| Subpart E | Purchasing controls | Supplier qualification, agreements, evaluations |
| Subpart F | Identification and traceability | Product ID, lot/batch traceability |
| Subpart G | Production and process controls | Process validation, environmental controls, equipment maintenance |
| Subpart H | Acceptance activities | Receiving, in-process, finished device acceptance |
| Subpart I | Nonconforming product | Identification, segregation, disposition |
| Subpart J | Corrective and preventive action (CAPA) | CAPA process, root cause analysis, effectiveness verification |
| Subpart K | Labeling and packaging | Label inspection, packaging validation |
| Subpart L | Handling, storage, distribution | Procedures, shelf-life, distribution records |
| Subpart M | Records | Device Master Record (DMR), Device History Record (DHR), QSR records |
| Subpart N | Servicing | Servicing procedures, complaint review |
| Subpart O | Statistical techniques | Sampling, statistical methods |

**QMSR transition (effective Feb 2026)**: Harmonizes 21 CFR 820 with ISO 13485:2016. Adds requirements for risk management (ISO 14971), software lifecycle (IEC 62304), usability (IEC 62366).

---

## Clarify First

Before running the audit-prep, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Trigger** — announced inspection, Form 483 received, Warning Letter, or annual readiness (chooses between the sprint track and the reactive 15-day response track, and sets deadlines)
- [ ] **Framework** — legacy QSR (21 CFR 820) vs QMSR (ISO 13485-harmonized, effective Feb 2026) (changes which requirements and subparts apply)
- [ ] **QMS maturity and known issues** — mature vs gaps, plus prior 483/WL findings (picks the 2-week vs 8-week sprint)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the readiness assessment.

## Quick start

1. **Run readiness score**: `python3 scripts/qsr_readiness_score.py --config qsr-controls.yaml`
2. **Check DHF completeness for in-scope devices**: `python3 scripts/dhf_completeness_checker.py --dhf device-dhf.yaml`
3. **Pick sprint length** based on score + known issues
4. **Execute sprint** per [references/fda-qsr-pre-inspection-checklist.md](references/fda-qsr-pre-inspection-checklist.md)

---

## Common FDA inspection findings (highest 483 / Warning Letter trigger)

1. **CAPA failures** — root cause not addressed, ineffective corrective action
2. **Complaint handling** — complaints not investigated, MDR (Medical Device Reporting) missed
3. **Design controls (Subpart C)** — DHF incomplete, V&V gaps, no design reviews
4. **Process validation** — processes not validated, validation stale
5. **Supplier controls** — suppliers not qualified, agreements missing, evaluations skipped
6. **Document control** — old procedures in use, no document approval evidence
7. **Management responsibility** — no management review, no quality policy, no objectives
8. **Records (DHR)** — incomplete records, missing lot traceability

See [references/483-warning-letter-prevention.md](references/483-warning-letter-prevention.md) for prevention patterns + response templates.

---

## Inspection-week operations

### Front room (where inspector works)

- Designated front room (conference room, not someone's office)
- Front-room lead (often Quality Manager) accompanies inspector all day
- All requests routed through front-room lead
- Inspector requests evidence; front-room asks back-room

### Back room (where requests are fulfilled)

- Cross-functional team available
- Document retrieval, witness preparation, technical questions answered
- Inspector requests evidence; back-room delivers (filtered through front-room lead)

### Daily debrief

- End of each inspection day: review what was inspected, observations, next-day topics
- Prepare overnight any evidence needed for next day

### After inspection

- Form 483 review (if issued): consult with QA Lead + outside counsel
- 15 business days to respond
- Full corrective action plan
- Ongoing engagement with FDA office

---

## Tooling

| Script | Purpose |
|--------|---------|
| `scripts/qsr_readiness_score.py` | Score current QSR/QMSR state per subpart |
| `scripts/dhf_completeness_checker.py` | Validate Design History File completeness per device |

---

## References

- [fda-qsr-pre-inspection-checklist.md](references/fda-qsr-pre-inspection-checklist.md) — full pre-inspection punch list per subpart
- [483-warning-letter-prevention.md](references/483-warning-letter-prevention.md) — common triggers + prevention + response patterns

---

## Related skills

- `ra-qm-team/fda-consultant-specialist` — deep FDA program (510k, PMA, QMSR build)
- `ra-qm-team/quality-manager-qms-iso13485` — ISO 13485 QMS (QMSR harmonized)
- `ra-qm-team/risk-management-specialist` — ISO 14971 (required for QMSR)
- `ra-qm-team/capa-officer` — CAPA process specialist
- `ra-qm-team/qms-audit-expert` — internal/external QMS audits
- `ra-qm-team/audit-prep/compliance-readiness` — multi-framework readiness

---

## gdpr-audit-prep

Source path: `references/ra-qm-team/audit-prep/gdpr-audit-prep/SKILL.md`

# GDPR Audit Prep

Operational playbook for GDPR audit preparation — whether triggered by a Data Protection Authority (DPA) inquiry, customer-side DPA review, internal compliance audit, or annual self-assessment.

When to use this skill vs. gdpr-dsgvo-expert:
- **This skill**: audit imminent (4-12 weeks); need execution sprint
- **gdpr-dsgvo-expert**: building GDPR program; designing DPIA process; multi-quarter

---

## When to use this skill

| Situation | Skill applies |
|-----------|---------------|
| Supervisory authority inquiry received | Yes — start immediately; engage DPO |
| Customer DPA audit / questionnaire | Yes — `scripts/gdpr_readiness_score.py` first |
| Annual internal GDPR audit | Yes — standard sprint |
| ROPA needs rapid update | Yes — `scripts/ropa_completeness_checker.py` |
| New high-risk processing → DPIA needed | Use `ra-qm-team/gdpr-dsgvo-expert` for DPIA design |

---

## The audit-prep sprint at a glance

### 4-week sprint (well-prepared org, periodic review)

```
Week 1: ROPA review + DPO engagement plan
Week 2: Gap remediation (policies, notices, technical)
Week 3: Evidence compilation + walkthroughs
Week 4: Audit week / submission
```

### 8-week sprint (gaps remaining)

```
Weeks 1-2: ROPA update + gap identification
Weeks 3-5: Gap closure (DPAs, notices, security, retention)
Weeks 6-7: Evidence + walkthroughs
Week 8: Audit
```

### 12-week sprint (DPA inquiry response)

```
Weeks 1-2: Inquiry analysis + response strategy + DPO engagement
Weeks 3-8: Targeted evidence collection + remediation
Weeks 9-10: Formal response drafting + legal review
Weeks 11-12: Submission + ongoing dialogue
```

See [references/gdpr-pre-audit-checklist.md](references/gdpr-pre-audit-checklist.md) for the full pre-audit punch list and [references/dpo-engagement-playbook.md](references/dpo-engagement-playbook.md) for DPO-coordinated audit response.

---

## Critical GDPR audit areas

### 1. ROPA (Records of Processing Activities, Article 30)

Every processing activity documented:
- Purpose of processing
- Categories of data subjects + data types
- Recipients (internal + external)
- International transfers (and lawful basis)
- Retention periods
- Security measures
- Lawful basis (consent, contract, legitimate interest, etc.)
- DPIA reference (if high-risk)

Audit gap: ROPA incomplete, stale, or missing for processing activities surfaced during audit.

### 2. Privacy Notices (Article 13/14)

- Privacy notice published + current
- Contains all required information (data controller, purposes, lawful basis, retention, rights, complaints contact, etc.)
- Easily accessible (no dark patterns)
- Translated for EU member states (where required)

### 3. Data Subject Rights (Article 12-23)

- Process documented + tested
- Response time tracked (< 1 month standard; extension possible)
- Identity verification
- Records of requests and responses (last 12 months)

### 4. Data Protection Impact Assessments (DPIAs, Article 35)

- High-risk processing activities identified
- DPIA conducted for each
- Mitigations documented
- DPO consulted (Article 35.2)

### 5. Data Processing Agreements (Article 28)

- DPA with every processor (vendor, sub-service org)
- Covers required clauses (Article 28.3)
- Annual review

### 6. Security Measures (Article 32)

- Technical and organizational measures documented
- Risk-appropriate (encryption, access control, backup, etc.)
- Tested and reviewed

### 7. Breach Notification (Article 33/34)

- Process documented
- 72-hour authority notification capability
- Past-period breaches: notified appropriately + documented

### 8. International Transfers (Chapter V)

- Mechanism for each transfer (SCCs, BCRs, adequacy decision)
- Transfer Impact Assessment (TIA) for non-adequacy countries
- Schrems II compliance for US transfers

---

## Clarify First

Before running the audit-prep, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Audit trigger** — supervisory-authority inquiry, customer DPA audit, internal audit, or annual self-assessment (sets the 4/8/12-week sprint and whether formal response drafting is needed)
- [ ] **Org readiness** — well-prepared vs gaps remaining (picks the 4-week vs 8-week sprint)
- [ ] **Processing scope and role** — controller vs processor, and which activities/ROPA are in scope (drives the ROPA and DPA focus)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the readiness assessment.

## Quick start

1. **Run readiness score**: `python3 scripts/gdpr_readiness_score.py --config gdpr-controls.yaml`
2. **Check ROPA completeness**: `python3 scripts/ropa_completeness_checker.py --ropa ropa.yaml`
3. **Engage DPO**: Walk through findings with DPO; finalize sprint scope
4. **Execute sprint** per [references/gdpr-pre-audit-checklist.md](references/gdpr-pre-audit-checklist.md)

---

## Common GDPR audit failures

- **ROPA missing or out-of-date.** Often the first thing an auditor asks.
- **Privacy notice generic** — boilerplate not actually reflecting actual processing.
- **DPIA missing for high-risk processing** (AI / profiling / large-scale monitoring / sensitive data).
- **DPAs not signed with all processors** — easy oversight; substantial finding.
- **International transfer mechanism** unclear post-Schrems II.
- **Breach notification process untested** — first breach is the test.
- **Consent not freely given** — bundled consent, pre-ticked boxes, take-it-or-leave-it.
- **No DPO appointed** when required (Article 37 — public authority, large-scale monitoring, etc.).
- **Data subject rights process untested** — request comes in, no one knows what to do.

---

## Tooling

| Script | Purpose |
|--------|---------|
| `scripts/gdpr_readiness_score.py` | Score current state per GDPR area; identify gaps |
| `scripts/ropa_completeness_checker.py` | Validate ROPA structure and completeness per Article 30 |

---

## References

- [gdpr-pre-audit-checklist.md](references/gdpr-pre-audit-checklist.md) — full checklist per GDPR area
- [dpo-engagement-playbook.md](references/dpo-engagement-playbook.md) — DPO-coordinated audit response

---

## Related skills

- `ra-qm-team/gdpr-dsgvo-expert` — deep GDPR program management
- `ra-qm-team/audit-prep/compliance-readiness` — multi-framework readiness (GDPR + ISO 27001 + SOC 2)
- `ra-qm-team/ccpa-cpra-privacy-expert` — US privacy counterpart
- `ra-qm-team/audit-prep/ai-act-readiness` — EU AI Act overlay for AI processing

---

## gdpr-dsgvo-expert

Source path: `references/ra-qm-team/gdpr-dsgvo-expert/SKILL.md`

# GDPR/DSGVO Expert

Tools and guidance for EU General Data Protection Regulation (GDPR) and German Bundesdatenschutzgesetz (BDSG) compliance.

---

## Table of Contents

- [Tools](#tools)
  - [GDPR Compliance Checker](#gdpr-compliance-checker)
  - [DPIA Generator](#dpia-generator)
  - [Data Subject Rights Tracker](#data-subject-rights-tracker)
- [Reference Guides](#reference-guides)
- [Workflows](#workflows)

---

## Tools

### GDPR Compliance Checker

Scans codebases for potential GDPR compliance issues including personal data patterns and risky code practices.

```bash
# Scan a project directory
python scripts/gdpr_compliance_checker.py /path/to/project

# JSON output for CI/CD integration
python scripts/gdpr_compliance_checker.py . --json --output report.json
```

**Detects:**
- Personal data patterns (email, phone, IP addresses)
- Special category data (health, biometric, religion)
- Financial data (credit cards, IBAN)
- Risky code patterns:
  - Logging personal data
  - Missing consent mechanisms
  - Indefinite data retention
  - Unencrypted sensitive data
  - Disabled deletion functionality

**Output:**
- Compliance score (0-100)
- Risk categorization (critical, high, medium)
- Prioritized recommendations with GDPR article references

---

### DPIA Generator

Generates Data Protection Impact Assessment documentation following Art. 35 requirements.

```bash
# Get input template
python scripts/dpia_generator.py --template > input.json

# Generate DPIA report
python scripts/dpia_generator.py --input input.json --output dpia_report.md
```

**Features:**
- Automatic DPIA threshold assessment
- Risk identification based on processing characteristics
- Legal basis requirements documentation
- Mitigation recommendations
- Markdown report generation

**DPIA Triggers Assessed:**
- Systematic monitoring (Art. 35(3)(c))
- Large-scale special category data (Art. 35(3)(b))
- Automated decision-making (Art. 35(3)(a))
- WP29 high-risk criteria

---

### Data Subject Rights Tracker

Manages data subject rights requests under GDPR Articles 15-22.

```bash
# Add new request
python scripts/data_subject_rights_tracker.py add \
  --type access --subject "John Doe" --email "john@example.com"

# List all requests
python scripts/data_subject_rights_tracker.py list

# Update status
python scripts/data_subject_rights_tracker.py status --id DSR-202601-0001 --update verified

# Generate compliance report
python scripts/data_subject_rights_tracker.py report --output compliance.json

# Generate response template
python scripts/data_subject_rights_tracker.py template --id DSR-202601-0001
```

**Supported Rights:**

| Right | Article | Deadline |
|-------|---------|----------|
| Access | Art. 15 | 30 days |
| Rectification | Art. 16 | 30 days |
| Erasure | Art. 17 | 30 days |
| Restriction | Art. 18 | 30 days |
| Portability | Art. 20 | 30 days |
| Objection | Art. 21 | 30 days |
| Automated decisions | Art. 22 | 30 days |

**Features:**
- Deadline tracking with overdue alerts
- Identity verification workflow
- Response template generation
- Compliance reporting

---

## Reference Guides

### GDPR Compliance Guide
`references/gdpr_compliance_guide.md`

Comprehensive implementation guidance covering:
- Legal bases for processing (Art. 6)
- Special category requirements (Art. 9)
- Data subject rights implementation
- Accountability requirements (Art. 30)
- International transfers (Chapter V)
- Breach notification (Art. 33-34)

### German BDSG Requirements
`references/german_bdsg_requirements.md`

German-specific requirements including:
- DPO appointment threshold (§ 38 BDSG - 20+ employees)
- Employment data processing (§ 26 BDSG)
- Video surveillance rules (§ 4 BDSG)
- Credit scoring requirements (§ 31 BDSG)
- State data protection laws (Landesdatenschutzgesetze)
- Works council co-determination rights

### DPIA Methodology
`references/dpia_methodology.md`

Step-by-step DPIA process:
- Threshold assessment criteria
- WP29 high-risk indicators
- Risk assessment methodology
- Mitigation measure categories
- DPO and supervisory authority consultation
- Templates and checklists

---

## Clarify First

Before running the assessment, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Task** — codebase compliance scan, DPIA generation, or data-subject-rights tracking (selects the tool and workflow)
- [ ] **Role and jurisdiction** — controller vs processor; GDPR-only vs German BDSG applies (BDSG adds the DPO threshold, §26 employment, and §4 video rules)
- [ ] **Processing characteristics** — high-risk processing such as profiling, AI, or large-scale special-category data (determines whether a DPIA is required)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the assessment.

## Workflows

### Workflow 1: New Processing Activity Assessment

```
Step 1: Run compliance checker on codebase
        → python scripts/gdpr_compliance_checker.py /path/to/code

Step 2: Review findings and compliance score
        → Address critical and high issues

Step 3: Determine if DPIA required
        → Check references/dpia_methodology.md threshold criteria

Step 4: If DPIA required, generate assessment
        → python scripts/dpia_generator.py --template > input.json
        → Fill in processing details
        → python scripts/dpia_generator.py --input input.json --output dpia.md

Step 5: Document in records of processing activities
```

### Workflow 2: Data Subject Request Handling

```
Step 1: Log request in tracker
        → python scripts/data_subject_rights_tracker.py add --type [type] ...

Step 2: Verify identity (proportionate measures)
        → python scripts/data_subject_rights_tracker.py status --id [ID] --update verified

Step 3: Gather data from systems
        → python scripts/data_subject_rights_tracker.py status --id [ID] --update in_progress

Step 4: Generate response
        → python scripts/data_subject_rights_tracker.py template --id [ID]

Step 5: Send response and complete
        → python scripts/data_subject_rights_tracker.py status --id [ID] --update completed

Step 6: Monitor compliance
        → python scripts/data_subject_rights_tracker.py report
```

### Workflow 3: German BDSG Compliance Check

```
Step 1: Determine if DPO required
        → 20+ employees processing personal data automatically
        → OR processing requires DPIA
        → OR business involves data transfer/market research

Step 2: If employees involved, review § 26 BDSG
        → Document legal basis for employee data
        → Check works council requirements

Step 3: If video surveillance, comply with § 4 BDSG
        → Install signage
        → Document necessity
        → Limit retention

Step 4: Register DPO with supervisory authority
        → See references/german_bdsg_requirements.md for authority list
```

---

## Key GDPR Concepts

### Legal Bases (Art. 6)

- **Consent**: Marketing, newsletters, analytics (must be freely given, specific, informed)
- **Contract**: Order fulfillment, service delivery
- **Legal obligation**: Tax records, employment law
- **Legitimate interests**: Fraud prevention, security (requires balancing test)

### Special Category Data (Art. 9)

Requires explicit consent or Art. 9(2) exception:
- Health data
- Biometric data
- Racial/ethnic origin
- Political opinions
- Religious beliefs
- Trade union membership
- Genetic data
- Sexual orientation

### Data Subject Rights

All rights must be fulfilled within **30 days** (extendable to 90 for complex requests):
- **Access**: Provide copy of data and processing information
- **Rectification**: Correct inaccurate data
- **Erasure**: Delete data (with exceptions for legal obligations)
- **Restriction**: Limit processing while issues are resolved
- **Portability**: Provide data in machine-readable format
- **Object**: Stop processing based on legitimate interests

### German BDSG Additions

| Topic | BDSG Section | Key Requirement |
|-------|--------------|-----------------|
| DPO threshold | § 38 | 20+ employees = mandatory DPO |
| Employment | § 26 | Detailed employee data rules |
| Video | § 4 | Signage and proportionality |
| Scoring | § 31 | Explainable algorithms |

---

## Cross-Reference: CCPA/CPRA US Privacy Comparison

When operating across EU and US jurisdictions, align GDPR compliance with California Consumer Privacy Act (CCPA) as amended by CPRA. Key differences to manage:

| Dimension | GDPR | CCPA/CPRA |
|-----------|------|-----------|
| Scope | Any org processing EU resident data | For-profit businesses meeting revenue/data thresholds |
| Legal basis | 6 lawful bases required (Art. 6) | No legal basis requirement; opt-out model |
| Consent | Opt-in by default | Opt-out (except minors and sensitive data) |
| Data subject rights | Access, rectification, erasure, portability, objection | Know, delete, correct, opt-out of sale/sharing, limit sensitive data use |
| Breach notification | 72 hours to supervisory authority (Art. 33) | "Most expedient time possible" to consumers |
| Enforcement | DPAs with fines up to 4% global turnover | California Privacy Protection Agency (CPPA), $2,500-$7,500 per violation |
| DPO requirement | Mandatory in many cases (Art. 37) | No DPO requirement |
| Children's data | Under 16 requires parental consent (Art. 8) | Under 16 opt-in for sale; under 13 parental consent |

**Practical alignment:** Build a unified privacy program that satisfies the stricter GDPR requirements by default, then layer CCPA/CPRA-specific mechanisms (e.g., "Do Not Sell or Share My Personal Information" link, annual metrics disclosure).

> **See also:** `../ccpa-cpra-specialist/SKILL.md` for full CCPA/CPRA compliance workflows and tools.

---

## Infrastructure Privacy Controls

### Cookie Consent and Tracking

Implement compliant cookie consent per GDPR Art. 6 + ePrivacy Directive:

| Category | Examples | Consent Required | Default State |
|----------|----------|------------------|---------------|
| Strictly Necessary | Session, CSRF, load balancer | No | Active |
| Functional | Language preference, UI settings | Yes | Inactive |
| Analytics | Google Analytics, Matomo, Hotjar | Yes | Inactive |
| Marketing | Facebook Pixel, Google Ads, retargeting | Yes | Inactive |

**Implementation requirements:**
- Banner must block all non-essential cookies until explicit consent
- Pre-checked boxes are NOT valid consent (Planet49 ruling, CJEU C-673/17)
- Consent must be as easy to withdraw as to give
- Record consent proof (timestamp, version, choices made)
- Re-consent on material changes to cookie policy

### Global Privacy Control (GPC) Signal

Per CCPA/CPRA regulations and emerging EU guidance:
- Detect `Sec-GPC: 1` HTTP header and `navigator.globalPrivacyControl` JavaScript API
- Treat GPC as valid opt-out signal for CCPA/CPRA
- For GDPR: GPC can serve as a signal of objection under Art. 21 — evaluate on a case-by-case basis
- Log GPC signal detection and honor it automatically

### Data Localization and Cross-Border Transfers

| Transfer Mechanism | Status (post-Schrems II) | When to Use |
|---------------------|--------------------------|-------------|
| EU Adequacy Decision | Valid | Transfers to adequate countries (e.g., Japan, UK, South Korea, US via DPF) |
| Standard Contractual Clauses (SCCs) | Valid with TIA | Default mechanism for non-adequate countries |
| Binding Corporate Rules (BCRs) | Valid | Intra-group transfers in multinationals |
| EU-US Data Privacy Framework (DPF) | Valid (since July 2023) | US companies certified under DPF |
| Derogations (Art. 49) | Limited use only | Explicit consent, contract necessity — not for systematic transfers |

**Transfer Impact Assessment (TIA) requirements for SCCs:**
1. Map the data flow (what data, to whom, where)
2. Assess recipient country legal framework (surveillance laws, access by authorities)
3. Evaluate supplementary measures needed (encryption, pseudonymization, contractual)
4. Document assessment and review annually

---

## AI-Specific GDPR Requirements

### Automated Decision-Making (Art. 22)

Art. 22 restricts decisions based solely on automated processing that produce legal or similarly significant effects:

| Requirement | Implementation |
|-------------|----------------|
| Right not to be subject to automated decisions | Provide human review mechanism for consequential decisions |
| Right to explanation | Document and explain logic, significance, and consequences |
| Right to contest | Enable data subjects to challenge automated decisions |
| Explicit consent or contract necessity | Secure Art. 22(2) legal basis before deploying |
| Suitable safeguards | Implement human oversight, right to express point of view |

**AI transparency checklist:**
- [ ] Document algorithmic logic in plain language
- [ ] Implement human-in-the-loop for high-stakes decisions (credit, employment, insurance)
- [ ] Provide opt-out mechanism for fully automated decisions
- [ ] Conduct and document bias testing (protected characteristics under Art. 9)
- [ ] Log all automated decisions with reasoning for auditability
- [ ] Include AI decision-making in privacy notice (Art. 13(2)(f), Art. 14(2)(g))

### AI Training Data Requirements

| Requirement | GDPR Basis | Action |
|-------------|------------|--------|
| Lawful basis for training data | Art. 6 | Legitimate interest (with DPIA) or consent |
| Purpose limitation | Art. 5(1)(b) | Training purpose must be compatible with original collection |
| Data minimization | Art. 5(1)(c) | Use minimum data necessary; prefer synthetic/anonymized data |
| Accuracy | Art. 5(1)(d) | Ensure training data is accurate and up-to-date |
| Storage limitation | Art. 5(1)(e) | Define retention for training datasets |
| Special category data | Art. 9 | Explicit consent or Art. 9(2)(j) research exemption for health/biometric data |
| Right to erasure | Art. 17 | Implement mechanism to remove individual data from training sets (or document inability) |
| Data scraping | Art. 14 | Inform data subjects when using publicly available data for training |

---

## Enhanced DPIA Methodology with EU AI Act Integration

### When DPIA + AI Act Conformity Assessment Overlap

For AI systems processing personal data, both GDPR Art. 35 DPIA and EU AI Act conformity assessment may apply:

| AI Risk Level (EU AI Act) | GDPR DPIA Required? | Combined Assessment Approach |
|---------------------------|----------------------|------------------------------|
| Unacceptable (Art. 5) | N/A — prohibited | Do not deploy |
| High-risk (Annex III) | Almost always yes | Joint DPIA + conformity assessment |
| Limited risk (Art. 50) | Evaluate per Art. 35 criteria | DPIA if systematic monitoring or profiling |
| Minimal risk | Evaluate per Art. 35 criteria | Standard DPIA threshold assessment |

### Enhanced DPIA Process for AI Systems

```
Step 1: AI System Classification
        → Classify under EU AI Act risk levels
        → Map to GDPR Art. 35(3) triggers

Step 2: Data Flow and Processing Analysis
        → Document training data sources and legal basis
        → Map inference data flows
        → Identify automated decision points (Art. 22)

Step 3: AI-Specific Risk Assessment
        → Bias and discrimination risk (protected groups)
        → Accuracy and reliability risk
        → Explainability and transparency gaps
        → Data quality and representativeness
        → Model drift and ongoing monitoring needs

Step 4: Fundamental Rights Impact
        → Right to non-discrimination
        → Right to privacy and data protection
        → Freedom of expression (content moderation AI)
        → Right to an effective remedy

Step 5: Combined Mitigation Measures
        → Technical: differential privacy, federated learning, model cards
        → Organizational: AI ethics board, human oversight procedures
        → Contractual: AI-specific DPA clauses with processors
        → Monitoring: continuous bias monitoring, performance drift detection

Step 6: DPO and Supervisory Authority Consultation
        → Consult DPO on combined assessment
        → Prior consultation with SA if high residual risk (Art. 36)
        → Notify national AI authority if high-risk AI system
```

---

## Privacy by Design Technical Controls

### Data Minimization Techniques

| Technique | Description | Use Case |
|-----------|-------------|----------|
| Field-level encryption | Encrypt specific PII fields at rest | Database storage |
| Tokenization | Replace PII with non-reversible tokens | Payment processing, analytics |
| Data masking | Obscure portions of data (e.g., email: j***@example.com) | UI display, logging |
| Aggregation | Process only aggregated/statistical data | Analytics, reporting |
| Purpose-scoped access | Limit data access to specific processing purposes | Multi-purpose systems |
| Automatic expiration | TTL-based data deletion | Session data, temporary processing |

### Pseudonymization Implementation (Recital 26, Art. 4(5))

| Method | Reversibility | Strength | Best For |
|--------|---------------|----------|----------|
| HMAC-based | Reversible with key | Strong | Internal analytics with re-identification need |
| Format-preserving encryption | Reversible with key | Strong | Legacy system compatibility |
| Deterministic hashing (salted) | One-way | Medium | Cross-dataset linkage without PII |
| Random ID mapping | Reversible with lookup table | Strong | Research datasets |

**Key management for pseudonymization:**
- Store re-identification keys separately from pseudonymized data
- Apply strict access controls to key material (minimum two-person rule)
- Document key rotation schedule
- Log all re-identification events

### Encryption Standards

| Layer | Minimum Standard | Recommended |
|-------|------------------|-------------|
| At rest | AES-256 | AES-256-GCM with envelope encryption |
| In transit | TLS 1.2 | TLS 1.3 |
| Database | Transparent Data Encryption (TDE) | Column-level encryption for PII |
| Backups | AES-256 | AES-256 + separate key from production |
| Key management | Hardware-backed (HSM/KMS) | Cloud KMS with customer-managed keys (BYOK) |

---

## Cross-Framework Privacy Mapping

| Requirement | GDPR Article | CCPA/CPRA Section | HIPAA Rule | NIS2 Article |
|-------------|-------------|-------------------|------------|--------------|
| Risk assessment | Art. 35 (DPIA) | §1798.185 (risk assessment regs) | §164.308(a)(1) | Art. 21(2)(a) |
| Breach notification | Art. 33-34 (72 hrs to SA) | §1798.150 (to consumers) | §164.404-408 (60 days) | Art. 23 (24 hrs early warning) |
| Data minimization | Art. 5(1)(c) | §1798.100(c) (collection limitation) | §164.502(b) (minimum necessary) | Art. 21(2)(e) |
| Encryption | Art. 32(1)(a) | Implicit (reasonable security) | §164.312(a)(2)(iv) (addressable) | Art. 21(2)(e) |
| Access controls | Art. 32(1)(b) | Implicit (reasonable security) | §164.312(a)(1) (access control) | Art. 21(2)(d) |
| Incident response | Art. 33-34 | §1798.150 | §164.308(a)(6) | Art. 21(2)(b) |
| Supply chain security | Art. 28 (processor agreements) | §1798.140(ag) (service provider contracts) | §164.308(b) (BAAs) | Art. 21(2)(d) |
| Governance/accountability | Art. 5(2), Art. 24 | §1798.185 (audit regs) | §164.308(a)(1) | Art. 20 (governance) |
| Right to delete/erasure | Art. 17 | §1798.105 | Limited (retention rules) | N/A |
| Data portability | Art. 20 | §1798.130(a)(2) | N/A | N/A |

> **Cross-references:** See `../information-security-manager-iso27001/SKILL.md` for ISO 27001 security controls, and `../mdr-745-specialist/SKILL.md` for healthcare device data protection under MDR.

---

## Cross-Framework Privacy Integration

### GDPR ↔ CCPA/CPRA Comparison

| Aspect | GDPR | CCPA/CPRA |
|--------|------|-----------|
| Scope | Any org processing EU residents' data | $25M+ revenue, 100K+ consumers, or 50%+ revenue from selling PI |
| Legal Basis | 6 legal bases required (Art. 6) | Opt-out model (no legal basis needed for collection) |
| Consent | Opt-in required | Opt-out for sale/sharing |
| Right to Delete | Art. 17 | §1798.105 |
| Data Portability | Art. 20 | §1798.130 |
| Penalties | Up to €20M or 4% global turnover | $2,500-$7,500 per violation |
| DPO Required | Yes (in many cases) | No |
| DPIA Required | Yes (high risk processing) | Risk assessments (CPRA) |

### AI-Specific GDPR Requirements

- **Automated Decision-Making (Art. 22):** Right not to be subject to decisions based solely on automated processing with legal/significant effects
- **AI Training Data:** Legitimate interest or consent required; purpose limitation applies to model training
- **Profiling:** Requires explicit consent for automated profiling with significant effects
- **EU AI Act Integration:** High-risk AI systems processing personal data require DPIA per Art. 35 GDPR
- **Cross-reference:** See `eu-ai-act-specialist` for AI-specific compliance

### Infrastructure Privacy Controls

- **Cookie Consent:** TCF 2.2 compliant consent management platform (CMP)
- **Global Privacy Control (GPC):** Must honor GPC browser signals (also CCPA requirement)
- **Data Localization:** EU data residency requirements, Schrems II adequacy decisions
- **Cross-Border Transfers:** Standard Contractual Clauses (SCCs), adequacy decisions, binding corporate rules
- **Privacy by Design Controls:** Data minimization, pseudonymization, encryption at rest/transit, access logging

### Cross-Framework Mapping

| Control | GDPR | CCPA | HIPAA | NIS2 |
|---------|------|------|-------|------|
| Privacy Notice | Art. 13-14 | §1798.100 | Privacy Practices | — |
| Data Subject Rights | Art. 15-22 | §1798.100-125 | Access/Amendment | — |
| Breach Notification | Art. 33-34 | §1798.150 | §164.404-408 | Art. 23 |
| DPO/Privacy Officer | Art. 37-39 | — | Privacy Officer | — |
| Risk Assessment | Art. 35 (DPIA) | Risk Assessment | §164.308(a)(1) | Art. 21 |
| Encryption | Art. 32 | Reasonable Security | §164.312(a)(2)(iv) | Art. 21.2.h |
| Training | Art. 39.1.b | — | §164.308(a)(5) | Art. 21.2.g |

---

## Troubleshooting

| Problem | Possible Cause | Resolution |
|---------|---------------|------------|
| Compliance checker reports critical findings for special category data | Code processes health, biometric, or religious data without explicit consent or Art. 9(2) exception | Identify all special category data processing; secure explicit consent or document applicable Art. 9(2) exception; implement field-level encryption for sensitive fields |
| DPIA generator determines assessment required but organization has no DPIA process | Processing triggers Art. 35(3) criteria (systematic monitoring, large-scale special categories, or automated decision-making) | Follow the DPIA methodology in `references/dpia_methodology.md`; generate template with `dpia_generator.py --template`; consult DPO before proceeding; consider prior consultation with supervisory authority if high residual risk (Art. 36) |
| Data subject rights requests consistently exceed 30-day deadline | Manual fulfillment without tracking system, unclear data location, or complex verification requirements | Deploy `data_subject_rights_tracker.py` for automated deadline monitoring; map all personal data locations using data inventory; streamline identity verification to proportionate measures |
| Cross-border transfer mechanism invalidated or uncertain | Reliance on deprecated mechanism or Transfer Impact Assessment not completed for SCCs | Review current adequacy decisions (UK, Japan, South Korea, US via DPF); for SCCs, complete Transfer Impact Assessment per Schrems II requirements; document supplementary measures (encryption, pseudonymization) |
| Cookie consent banner flagged as non-compliant | Pre-checked boxes, cookie wall blocking access, or reject button harder to find than accept | Implement TCF 2.2 compliant CMP; ensure all non-essential cookies blocked until explicit consent; make reject as prominent as accept (per Planet49 ruling, CJEU C-673/17); record consent proof |
| GDPR compliance checker detects personal data in application logs | Application logs contain email addresses, IP addresses, or user identifiers | Implement log sanitization to mask or pseudonymize personal data before storage; configure logging frameworks to exclude PII fields; set log retention limits aligned with purpose |
| AI system processing personal data lacks Art. 22 safeguards | Automated decision-making produces legal or significant effects without human review mechanism | Implement human-in-the-loop for high-stakes decisions; provide right to explanation and right to contest; document algorithmic logic in plain language; include AI decision-making in privacy notice per Art. 13(2)(f) |

---

## Success Criteria

- **Compliance score of 80+ on codebase scan** -- indicating no critical personal data exposure issues, with all high-risk patterns addressed and documented
- **All data subject rights requests fulfilled within 30 days** -- tracked via `data_subject_rights_tracker.py` with identity verification completed, response templates generated, and compliance reports showing zero overdue requests
- **DPIA completed for all high-risk processing activities** -- covering Art. 35(3) triggers, WP29 criteria, risk mitigation measures, and DPO consultation; prior SA consultation documented where required
- **Records of Processing Activities (Art. 30) maintained and current** -- covering all processing activities with purposes, legal bases, data categories, recipients, retention periods, and transfer mechanisms
- **Cross-border transfer mechanisms validated** -- adequacy decisions, SCCs with TIA, or BCRs in place for all international data flows, reviewed annually
- **Cookie consent implementation compliant** -- non-essential cookies blocked until explicit consent, reject as easy as accept, consent proof recorded with timestamp and version, GPC signal honored
- **DPO appointed and registered where required** -- including German BDSG Section 38 threshold (20+ employees processing personal data automatically), with supervisory authority notification

---

## Scope & Limitations

**In Scope:**
- Codebase scanning for personal data patterns and risky processing practices
- DPIA generation following Art. 35 requirements with threshold assessment and risk mitigation
- Data subject rights request tracking (Art. 15-22) with deadline monitoring and response templates
- German BDSG-specific requirements (DPO threshold, employment data, video surveillance, credit scoring)
- Cross-border transfer mechanism assessment (adequacy decisions, SCCs, BCRs, DPF)
- AI-specific GDPR requirements (Art. 22 automated decisions, training data governance, profiling)
- Cross-framework privacy mapping (GDPR, CCPA/CPRA, HIPAA, NIS2)

**Out of Scope:**
- Legal advice on specific legal basis selection or legitimate interest balancing tests -- consult DPO and legal counsel
- Supervisory authority notification or interaction for breach reporting (Art. 33-34)
- Implementation of cookie consent management platforms or consent management code
- GDPR representative appointment logistics for non-EU organizations (Art. 27)
- Binding Corporate Rules (BCR) application or approval process
- German Landesdatenschutzgesetze (state-level data protection laws) beyond general guidance

**Important Notes:**
- GDPR enforcement fines reached EUR 2.3 billion in 2025, a 38% year-over-year increase; healthcare violations spiked with average penalties of EUR 203,000
- The EU AI Act creates dual obligations for AI systems processing personal data -- both DPIA (GDPR Art. 35) and conformity assessment (AI Act) may apply simultaneously
- Dark patterns in consent interfaces are under heightened enforcement scrutiny; regulators are penalizing cookie walls, manipulative UI, and buried reject options

---

## Integration Points

| Skill | Integration | When to Use |
|-------|-------------|-------------|
| `ccpa-cpra-privacy-expert` | Unified privacy program covering both GDPR and CCPA/CPRA; cross-framework mapping | When organization processes data of both EU residents and California consumers |
| `eu-ai-act-specialist` | Combined DPIA + AI Act conformity assessment for high-risk AI systems processing personal data | When AI system triggers both GDPR Art. 35 DPIA and EU AI Act high-risk classification |
| `information-security-manager-iso27001` | ISO 27001 security controls support GDPR Art. 32 security of processing requirements | When implementing technical and organizational measures for personal data protection |
| `infrastructure-compliance-auditor` | Technical privacy controls validation (encryption, access controls, logging, data masking) | When assessing infrastructure supporting GDPR privacy-by-design requirements |
| `dora-compliance-expert` | DORA complements GDPR for financial sector ICT systems processing personal data | When financial entity must align DORA ICT security with GDPR data protection requirements |

---

## Tool Reference

### gdpr_compliance_checker.py

Scans codebases for potential GDPR compliance issues including personal data patterns and risky code practices.

| Flag | Required | Description |
|------|----------|-------------|
| `<project_dir>` | Yes | Path to project directory to scan |
| `--json` | No | Output results in JSON format for CI/CD integration |
| `--output <file>` | No | Export report to specified file path |

**Detects:** Email, phone, IP address, credit card, IBAN, German ID patterns; special category data (health, biometric, religion); risky code patterns (logging PII, missing consent, indefinite retention, unencrypted sensitive data, disabled deletion). **Output:** Compliance score (0-100), risk categorization (critical/high/medium), and prioritized recommendations with GDPR article references.

### dpia_generator.py

Generates Data Protection Impact Assessment documentation following Art. 35 requirements.

| Flag | Required | Description |
|------|----------|-------------|
| `--template` | No | Generate blank DPIA input template to stdout |
| `--input <file>` | Yes (unless `--template` or `--interactive`) | Path to JSON processing activity description |
| `--output <file>` | No | Export DPIA report to specified file path (markdown format) |
| `--interactive` | No | Launch interactive mode for guided DPIA creation |

**Features:** Automatic DPIA threshold assessment against Art. 35(3) triggers and WP29 criteria, risk identification based on processing characteristics, legal basis documentation, mitigation recommendations, and markdown report generation.

### data_subject_rights_tracker.py

Manages data subject rights requests under GDPR Articles 15-22 with deadline tracking and response templates.

| Subcommand | Description |
|------------|-------------|
| `add` | Add new request (`--type`, `--subject`, `--email` required) |
| `list` | List all tracked requests |
| `status` | View or update request status (`--id` required, `--update` to change status) |
| `report` | Generate compliance report (`--output` for file export) |
| `template` | Generate response template for specific request (`--id` required) |

| Flag | Description |
|------|-------------|
| `--type <right>` | Right type: `access`, `rectification`, `erasure`, `restriction`, `portability`, `objection`, `automated` |
| `--subject <name>` | Data subject name |
| `--email <email>` | Data subject email address |
| `--id <request_id>` | Request identifier (e.g., `DSR-202601-0001`) |
| `--update <status>` | New status: `received`, `verified`, `in_progress`, `completed`, `denied`, `extended` |
| `--output <file>` | Export report or template to specified file path |

**Features:** 30-day deadline tracking with overdue alerts, identity verification workflow, response template generation per right type, and compliance reporting with metrics.

---

## information-security-manager-iso27001

Source path: `references/ra-qm-team/information-security-manager-iso27001/SKILL.md`

# Information Security Manager - ISO 27001

Implement and manage Information Security Management Systems (ISMS) aligned with ISO 27001:2022 and healthcare regulatory requirements. Covers the full lifecycle: scoping, risk assessment per Clause 6.1.2, selection and implementation of the 93 Annex A controls across four themes, certification readiness, incident response, and cross-framework mapping to SOC 2, NIST CSF 2.0, and NIS2 — with cloud-specific (AWS/Azure/GCP) and Zero Trust guidance.

## Core Capabilities

- **ISMS implementation** — scope/context definition, risk treatment, Statement of Applicability (SoA), monitoring metrics, certification readiness (Stage 1/2)
- **Risk assessment** — Clause 6.1.2 methodology, asset classification, threat/vulnerability modeling, Likelihood × Impact scoring, treatment planning
- **Control implementation** — all 93 Annex A:2022 controls (Organizational, People, Physical, Technological) with cloud-provider mappings and Zero Trust integration
- **Incident response** — detection, triage/classification, containment, recovery, and lessons learned
- **Cross-framework alignment** — ISO 27001 ↔ SOC 2 TSC ↔ NIST CSF 2.0 ↔ NIS2, plus supply chain and hardware-key (FIDO2) requirements

## When to Use

Use this skill when you hear: "implement ISO 27001", "ISMS implementation", "security risk assessment", "information security policy", "ISO 27001 certification", "security controls implementation", "incident response plan", "healthcare data security", "medical device cybersecurity", or "security compliance audit".

## Clarify First

Before running the assessment, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **ISMS scope** — which systems, locations, and data are inside the boundary (drives the Statement of Applicability and risk assessment)
- [ ] **Task** — ISMS implementation, risk assessment, gap analysis, or incident response (picks the workflow and script)
- [ ] **Threat context** — general, healthcare, or cloud (selects the threat catalog and changes the risk register inputs)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the report.

## Quick Start

```bash
# Run a security risk assessment
python scripts/risk_assessment.py --scope "patient-data-system" --output risk_register.json

# Check ISO 27001 compliance status
python scripts/compliance_checker.py --standard iso27001 --controls-file controls.csv

# Generate a gap analysis report
python scripts/compliance_checker.py --standard iso27001 --gap-analysis --output gaps.md
```

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/workflows-and-tools.md](references/workflows-and-tools.md)** — step-by-step ISMS implementation, risk assessment, and incident-response workflows; validation checkpoints; certification-readiness checklists; worked healthcare example; troubleshooting; success criteria; and full `risk_assessment.py` / `compliance_checker.py` flag tables. Read when executing any end-to-end workflow or looking up a script flag.
- **[references/annex-a-controls.md](references/annex-a-controls.md)** — complete enumeration of all 93 Annex A:2022 controls across the four themes plus the 11 controls new in 2022. Read when building/updating a Statement of Applicability or mapping a 2013 SoA to 2022.
- **[references/cloud-and-cross-framework.md](references/cloud-and-cross-framework.md)** — AWS/Azure/GCP control mappings, Zero Trust architecture integration, hardware security key (FIDO2/WebAuthn) requirements, supply chain security, and ISO 27001 ↔ SOC 2 / NIST CSF / NIS2 mappings. Read when implementing in a specific cloud, designing Zero Trust, or pursuing multiple certifications.
- **[references/iso27001-controls.md](references/iso27001-controls.md)** — Annex A control implementation guidance with evidence requirements and audit preparation. Read for control selection for the SoA and audit prep.
- **[references/risk-assessment-guide.md](references/risk-assessment-guide.md)** — risk methodology selection, asset classification criteria, threat modeling approaches, and risk calculation methods. Read before designing the risk assessment process.
- **[references/incident-response.md](references/incident-response.md)** — detailed response procedures, escalation matrices, communication templates, and recovery checklists. Read when building or running the incident response plan.

## Scope & Limitations

**In Scope:** ISO 27001:2022 ISMS implementation (all 93 Annex A controls across 4 themes); risk assessment per Clause 6.1.2 with configurable threat catalogs (general, healthcare, cloud); compliance checking and gap analysis against ISO 27001/27002; cross-framework mapping to SOC 2 TSC, NIST CSF 2.0, and NIS2; cloud-specific controls for AWS/Azure/GCP; Zero Trust integration with phased roadmap; hardware security key (FIDO2/WebAuthn) requirements; supply chain controls including SBOM and vendor risk tiering.

**Out of Scope:** ISO 27001 certification audit execution (preparation guidance only, not audit services); implementation of specific security tools (SIEM, EDR, DLP, WAF — mapped to categories only); penetration testing or vulnerability scanning execution (use `infrastructure-compliance-auditor`); ISO 27701/27017/27018 implementation beyond cross-reference; physical security system design beyond control requirements.

**Important Notes:**
- The ISO 27001:2013 to 2022 transition deadline was October 2025; all certifications must now conform to the 2022 edition.
- The 2022 revision introduced 11 entirely new controls, notably A.5.7 (Threat intelligence), A.5.23 (Cloud services), A.8.9 (Configuration management), A.8.16 (Monitoring activities), and A.8.28 (Secure coding).
- Integration with other standards (ISO 27701, ISO 42001, ISO 9001) via the harmonized Annex SL structure is becoming standard practice.

## Integration Points

| Skill | Integration | When to Use |
|-------|-------------|-------------|
| `isms-audit-expert` | Internal and external ISMS audit management; control testing and finding management | When planning or executing ISO 27001 audits and tracking corrective actions |
| `infrastructure-compliance-auditor` | Technical infrastructure checks validate ISO 27001 Annex A technological controls | When assessing actual infrastructure security posture against ISO 27001 requirements |
| `soc2-compliance-expert` | SOC 2 Trust Services Criteria mapped to ISO 27001 controls for dual compliance | When organization requires both ISO 27001 certification and SOC 2 Type II report |
| `gdpr-dsgvo-expert` | GDPR Art. 32 security of processing aligned with ISO 27001 controls; A.5.34 PII protection | When ISMS must support GDPR compliance requirements |
| `nist-csf-specialist` | NIST CSF 2.0 functions mapped to ISO 27001 for organizations with US operations | When building unified security framework across ISO 27001 and NIST CSF |
| `dora-compliance-expert` | ISO 27001 controls support DORA Pillar 1 (ICT Risk Management) requirements for financial entities | When financial entity uses ISO 27001 as foundation for DORA compliance |

---

## infrastructure-compliance-auditor

Source path: `references/ra-qm-team/infrastructure-compliance-auditor/SKILL.md`

# Infrastructure Compliance Auditor

Cross-cutting infrastructure security audit across ALL compliance frameworks. Replaces manual Vanta-style checks with deterministic, repeatable, evidence-generating infrastructure audits covering cloud, DNS, TLS, endpoints, access control, network, containers, CI/CD, secrets, logging, and physical security. Maps 250+ controls to 10 standards (SOC 2, ISO 27001, HIPAA, GDPR, PCI-DSS, NIS2, DORA, NIST CSF, FedRAMP, CCPA) with severity-weighted scoring.

## Core Capabilities

- **11 audit domains** — cloud (AWS/Azure/GCP), DNS, TLS/SSL, endpoints, access control, network, container/K8s, CI/CD, secrets, logging/monitoring, physical security
- **250+ controls** — each with a check ID, severity rating, and multi-framework mapping
- **Framework mapping** — collect-evidence-once, map-to-many strategy across 10 standards
- **Deterministic scoring** — severity-weighted per-domain and overall scores (0-100) with an audit-readiness rating
- **Evidence generation** — JSON and markdown reports suitable for auditor consumption

## When to Use

Reach for this skill on: "infrastructure audit", "cloud security audit", "infrastructure compliance", "DNS security audit", "TLS audit", "endpoint security", "access control audit", "network security assessment", "infrastructure security", "cloud compliance", "Vanta alternative", "compliance automation", "security posture assessment", "hardware security keys", or "YubiKey compliance".

## Clarify First

Before running the audit, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Audit domains** — which of the 11 (cloud, DNS, TLS, endpoints, access, network, container, CI/CD, secrets, logging, physical) are in scope (determines which checks run)
- [ ] **Target frameworks** — which standards to map findings to (SOC 2, ISO 27001, HIPAA, PCI-DSS, NIS2…) (drives the control mapping and report)
- [ ] **Infrastructure config** — the JSON describing actual state, including cloud provider (AWS/Azure/GCP) (the checks and CIS baseline depend on it)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the audit report.

## Quick Start

### Run Full Infrastructure Audit

```bash
python scripts/infra_audit_runner.py --config infrastructure.json --output audit_report.json
```

### Audit DNS Security for a Domain

```bash
python scripts/dns_security_checker.py --domain example.com --output dns_report.json
```

### Audit Access Controls

```bash
python scripts/access_control_auditor.py --config access_controls.json --output access_report.json
```

### Generate Compliance-Mapped Report

```bash
python scripts/infra_audit_runner.py --config infrastructure.json --frameworks soc2,iso27001,hipaa --format markdown --output compliance_report.md
```

## Tools

| Tool | Purpose | Input |
|------|---------|-------|
| `infra_audit_runner.py` | Full infrastructure audit across all 11 domains | JSON config describing infrastructure |
| `dns_security_checker.py` | DNS-specific security audit (SPF, DKIM, DMARC, DNSSEC, CAA, MTA-STS) | Domain name |
| `access_control_auditor.py` | Access control, MFA, SSO, PAM, RBAC audit | JSON config describing access controls |

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/audit-control-catalog.md](references/audit-control-catalog.md)** — the full 250+ control catalog across all 11 audit domains plus the framework coverage matrix. Read when you need exact check IDs, controls, severities, and framework mappings for any domain.
- **[references/audit-workflows.md](references/audit-workflows.md)** — audit workflows, pre/post-audit validation checklists, the severity-weighted scoring methodology, and success criteria. Read when planning or executing an audit and interpreting scores.
- **[references/tool-reference.md](references/tool-reference.md)** — CLI flag reference for the three audit scripts plus a troubleshooting table. Read when running the tools or diagnosing unexpected output.
- **[references/cloud-security-baseline.md](references/cloud-security-baseline.md)** — AWS / Azure / GCP CIS Benchmark deep-dive. Read for cloud-provider hardening detail beyond the catalog.
- **[references/access-control-standards.md](references/access-control-standards.md)** — MFA, SSO, PAM, Zero Trust, and YubiKey implementation standards. Read when designing identity and access controls.
- **[references/compliance-framework-mapping.md](references/compliance-framework-mapping.md)** — control-to-framework master mapping. Read when aligning evidence across multiple certifications.

## Scope & Limitations

**In Scope:**
- Infrastructure security audit across 11 domains: Cloud, DNS, TLS/SSL, Endpoints, Access Control, Network, Containers/K8s, CI/CD, Secrets, Logging/Monitoring, Physical Security
- Framework mapping to 10 compliance standards: SOC 2, ISO 27001, HIPAA, GDPR, PCI-DSS, NIS2, DORA, NIST CSF, FedRAMP, CCPA
- 250+ individual control checks with severity-weighted scoring
- DNS security validation including SPF, DKIM, DMARC, DNSSEC, CAA, MTA-STS, and subdomain takeover risk
- Access control audit covering IdP, SSO, MFA, FIDO2/hardware keys, PAM, RBAC, service accounts, SSH keys, API keys, and Zero Trust
- Evidence-generating reports in JSON and markdown formats for auditor consumption

**Out of Scope:**
- Actual penetration testing, vulnerability scanning, or active exploitation -- this skill performs configuration-based assessment, not active testing
- Cloud provider API calls or live infrastructure scanning -- the tool works with JSON configuration input describing your infrastructure state
- Compliance certification or attestation -- this skill identifies gaps but does not replace formal SOC 2, ISO 27001, or PCI-DSS audits
- Application security testing (SAST/DAST) beyond CI/CD pipeline configuration checks
- Compliance program management, policy writing, or governance documentation

**Important Notes:**
- SOC 2 2026 best practices demand real-time monitoring dashboards flagging control deficiencies within 48 hours; periodic spot-checks are no longer sufficient
- Zero Trust architecture is increasingly expected across all frameworks; perimeter-based security alone is insufficient for SOC 2, ISO 27001, and NIS2
- Compliance automation platforms (Drata, Vanta, Sprinto) complement but do not replace the deterministic checks this tool provides

## Integration Points

| Skill | Integration | When to Use |
|-------|-------------|-------------|
| `soc2-compliance-expert` | SOC 2 Trust Services Criteria mapped to infrastructure controls; evidence collection for SOC 2 Type II | When infrastructure audit supports SOC 2 certification |
| `information-security-manager-iso27001` | ISO 27001 Annex A technological controls validated by infrastructure checks | When ISO 27001 certification requires evidence of technical control implementation |
| `nist-csf-specialist` | NIST CSF 2.0 Protect and Detect functions mapped to infrastructure domains | When building unified security posture across NIST and other frameworks |
| `dora-compliance-expert` | DORA Pillar 1 and Pillar 3 controls validated by infrastructure security checks | When financial entity requires infrastructure evidence for DORA compliance |
| `pci-dss-specialist` | PCI-DSS v4.0 network security, encryption, and access control requirements mapped to checks | When cardholder data environment requires infrastructure compliance validation |
| `gdpr-dsgvo-expert` | Technical privacy controls (encryption, access controls, data masking) supporting GDPR Art. 32 | When infrastructure controls support personal data protection requirements |

---

## isms-audit-expert

Source path: `references/ra-qm-team/isms-audit-expert/SKILL.md`

# ISMS Audit Expert

Internal and external ISMS audit management for ISO 27001 compliance verification, security control assessment, and certification support.

---

## Clarify First

Before planning or executing the audit, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Audit type** — internal annual, Stage 1, Stage 2, surveillance, or recertification (sets the scope and checklist depth)
- [ ] **Controls in scope** — which Annex A controls / SoA coverage for this engagement (drives the schedule and testing)
- [ ] **Risk ratings and prior findings** — per-control risk and outstanding nonconformities (picks audit frequency and sample size)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the audit plan.

## Audit Program Management

### Risk-Based Audit Schedule

| Risk Level | Audit Frequency | Examples |
|------------|-----------------|----------|
| Critical | Quarterly | Privileged access, vulnerability management, logging |
| High | Semi-annual | Access control, incident response, encryption |
| Medium | Annual | Policies, awareness training, physical security |
| Low | Annual | Documentation, asset inventory |

### Workflow: Annual Audit Planning

1. **Review prior audit results** -- analyze previous findings, open items, and risk assessment outputs from the most recent cycle.
2. **Identify high-risk controls** -- flag controls involved in recent security incidents or with outstanding nonconformities.
3. **Determine audit scope** -- define ISMS boundaries, confirm Statement of Applicability (SoA) coverage for the certification cycle.
4. **Assign auditors** -- ensure independence from audited areas; verify auditor competency (ISO 27001 Lead Auditor certification preferred).
5. **Create audit schedule** -- allocate resources, assign dates, and distribute across the year by risk priority.
6. **Obtain management approval** for the finalized audit plan.
7. **Validation checkpoint:** Audit plan covers all 93 Annex A controls within the certification cycle; schedule approved by management; auditor independence confirmed.

### Example: Annual Audit Plan Output

```
ISMS AUDIT PLAN 2026

Prepared by: Information Security Manager
Approved by: CISO
Date: 2026-01-15

Q1 2026 (January-March)
  Scope: Privileged access (A.8.2, A.8.18), Logging (A.8.15, A.8.16)
  Auditor: External consultant (independence required)
  Risk level: Critical

Q2 2026 (April-June)
  Scope: Access control (A.8.3-A.8.5), Incident response (A.5.24-A.5.28)
  Auditor: Internal audit team
  Risk level: High

Q3 2026 (July-September)
  Scope: Physical security (A.7.1-A.7.14), HR security (A.6.1-A.6.8)
  Auditor: Internal audit team
  Risk level: Medium

Q4 2026 (October-December)
  Scope: Policies (A.5.1-A.5.8), Asset management (A.5.9-A.5.14)
  Auditor: Internal audit team
  Risk level: Medium-Low

Coverage: 93/93 Annex A controls scheduled across 4 quarters
```

---

## Audit Execution

### Workflow: Pre-Audit Preparation

1. **Review ISMS documentation** -- policies, Statement of Applicability, risk assessment, and risk treatment plan.
2. **Analyze previous audit reports** -- note open findings and areas requiring follow-up.
3. **Prepare audit plan** -- define interview schedule, control sample, and evidence requirements.
4. **Notify auditees** -- communicate scope, timing, and documentation needed at least 2 weeks in advance.
5. **Prepare control-specific checklists** for all controls in scope.
6. **Validation checkpoint:** All documentation received and reviewed before the opening meeting.

### Workflow: Audit Conduct

1. **Opening Meeting** -- confirm scope, introduce audit team, agree on communication channels and logistics.
2. **Evidence Collection** -- interview control owners, review documentation and records, observe processes in operation, inspect technical configurations.
3. **Control Verification** -- test control design (does it address the risk?), test control operation (is it working as intended?), sample transactions and records, document all evidence.
4. **Closing Meeting** -- present preliminary findings, clarify factual inaccuracies, agree on finding classification, confirm corrective action timelines.
5. **Validation checkpoint:** All controls in scope assessed with documented evidence; findings classified and communicated.

### Evidence Collection Methods

| Method | Use Case | Example |
|--------|----------|---------|
| Inquiry | Process understanding | Interview Security Manager about incident response |
| Observation | Operational verification | Watch visitor sign-in process at reception |
| Inspection | Documentation review | Check access approval records for last quarter |
| Re-performance | Control testing | Attempt login with weak password to verify policy enforcement |

---

## Control Assessment

### ISO 27002 Control Categories

**Organizational Controls (A.5):** Information security policies, roles and responsibilities, segregation of duties, contact with authorities, threat intelligence, information security in projects.

**People Controls (A.6):** Screening and background checks, employment terms, security awareness and training, disciplinary process, remote working security.

**Physical Controls (A.7):** Physical security perimeters, entry controls, securing offices and facilities, physical security monitoring, equipment protection.

**Technological Controls (A.8):** User endpoint devices, privileged access rights, access restriction, secure authentication, malware protection, vulnerability management, backup and recovery, logging and monitoring, network security, cryptography.

### Workflow: Control Testing

1. **Identify control objective** from the relevant ISO 27002 clause.
2. **Determine testing method** -- inquiry, observation, inspection, or re-performance based on control type.
3. **Define sample size** -- base on population size and risk level (e.g., 25 samples for quarterly access reviews, 5 for annual policy reviews).
4. **Execute test** and document results with specific evidence references.
5. **Evaluate control effectiveness** -- effective, partially effective, or ineffective.
6. **Validation checkpoint:** Evidence supports conclusion; finding documented if control is not fully effective.

### Example: Control Test Working Paper

```
CONTROL TEST WORKING PAPER

Control: A.8.2 - Privileged access rights
Objective: Privileged access is restricted and managed
Test date: 2026-03-10
Auditor: J. Smith

Test procedure:
  1. Obtained list of privileged accounts from IAM system (42 accounts)
  2. Selected sample of 10 accounts (25% sample rate)
  3. For each account, verified:
     - Documented business justification exists
     - Manager approval on file
     - Quarterly access review completed
     - No dormant accounts (last login within 90 days)

Results:
  - 8/10 accounts: All criteria met (PASS)
  - 1/10: Missing quarterly review for Q4 2025 (MINOR NC)
  - 1/10: No documented business justification (MINOR NC)

Conclusion: Control partially effective - minor nonconformity raised
Finding reference: ISMS-2026-007
```

---

## Finding Management

### Finding Classification

| Severity | Definition | Response Time |
|----------|------------|---------------|
| Major Nonconformity | Control failure creating significant risk | 30 days |
| Minor Nonconformity | Isolated deviation with limited impact | 90 days |
| Observation | Improvement opportunity | Next audit cycle |

### Finding Documentation Template

```
Finding ID: ISMS-2026-007
Control Reference: A.8.2 - Privileged access rights
Severity: Minor Nonconformity

Evidence:
- 1 of 10 sampled privileged accounts missing Q4 2025 review
- 1 of 10 sampled accounts lacks documented business justification
- Screenshots of IAM records and review log exported 2026-03-10

Risk Impact:
- Unreviewed privileged access increases insider threat exposure
- Non-justified accounts may represent unnecessary attack surface

Root Cause:
- Access review process relies on manual tracking; no automated reminder

Recommendation:
- Implement automated quarterly review reminders via IAM platform
- Require business justification field as mandatory in provisioning workflow
- Backfill missing reviews within 14 days
```

### Workflow: Corrective Action

1. **Auditee acknowledges** finding and severity classification.
2. **Root cause analysis** completed within 10 business days.
3. **Corrective action plan** submitted with target dates and responsible owners.
4. **Actions implemented** by responsible parties per the plan.
5. **Auditor verifies effectiveness** -- re-tests control with fresh evidence.
6. **Finding closed** with documented evidence of resolution.
7. **Validation checkpoint:** Root cause addressed; recurrence prevented; evidence of effective correction on file.

---

## Certification Support

### Stage 1 Audit Preparation Checklist

- [ ] ISMS scope statement finalized
- [ ] Information security policy (management signed)
- [ ] Statement of Applicability (SoA) complete
- [ ] Risk assessment methodology and results documented
- [ ] Risk treatment plan current
- [ ] Internal audit results available (past 12 months)
- [ ] Management review minutes on file

### Stage 2 Audit Preparation Checklist

- [ ] All Stage 1 findings addressed and closed
- [ ] ISMS operational for minimum 3 months
- [ ] Evidence of control implementation across all SoA controls
- [ ] Security awareness training records for all personnel
- [ ] Incident response evidence (if incidents occurred)
- [ ] Access review documentation for the audit period

### Surveillance Audit Cycle

| Period | Focus |
|--------|-------|
| Year 1, Q2 | High-risk controls, Stage 2 findings follow-up |
| Year 1, Q4 | Continual improvement, control sample |
| Year 2, Q2 | Full surveillance |
| Year 2, Q4 | Re-certification preparation |

---

## Tools

| Script | Purpose | Usage |
|--------|---------|-------|
| `isms_audit_scheduler.py` | Generate risk-based audit plans | `python scripts/isms_audit_scheduler.py --year 2026 --format markdown` |

```bash
# Generate annual audit plan
python scripts/isms_audit_scheduler.py --year 2026 --output audit_plan.json

# With custom control risk ratings
python scripts/isms_audit_scheduler.py --controls controls.csv --format markdown

# Generate plan for specific quarters only
python scripts/isms_audit_scheduler.py --year 2026 --quarters Q1 Q2 --format json
```

---

## References

| File | Content |
|------|---------|
| [iso27001-audit-methodology.md](references/iso27001-audit-methodology.md) | Audit program structure, pre-audit phase, certification support |
| [security-control-testing.md](references/security-control-testing.md) | Technical verification procedures for ISO 27002 controls |
| [cloud-security-audit.md](references/cloud-security-audit.md) | Cloud provider assessment, configuration security, IAM review |

---

## Audit Performance Metrics

| KPI | Target | Measurement |
|-----|--------|-------------|
| Audit plan completion | 100% | Audits completed vs. planned |
| Finding closure rate | >90% within SLA | Closed on time vs. total |
| Major nonconformities | 0 at certification | Count per certification cycle |
| Audit effectiveness | Incidents prevented | Security improvements implemented |

---

## Compliance Framework Integration

| Framework | ISMS Audit Relevance |
|-----------|---------------------|
| GDPR | A.5.34 Privacy, A.8.10 Information deletion |
| HIPAA | Access controls, audit logging, encryption |
| PCI DSS | Network security, access control, monitoring |
| SOC 2 | Trust Services Criteria mapped to ISO 27002 |

---

## Troubleshooting

| Problem | Possible Cause | Resolution |
|---------|---------------|------------|
| Audit plan does not cover all 93 Annex A controls within the certification cycle | Controls not inventoried against the 2022 four-theme structure or risk-based scheduling gaps | Use `isms_audit_scheduler.py` with a complete controls CSV covering all 93 controls; ensure the 3-year cycle allocates quarterly audits for critical controls and annual coverage for all others |
| Major nonconformity found during certification audit | Systemic control failure or complete absence of a required ISMS element | Conduct immediate root cause analysis; develop corrective action plan with 30-day target; re-test the control with fresh evidence; schedule verification audit with certification body |
| Auditor independence challenged by certification body | Internal auditors assigned to areas they manage or operate | Establish clear auditor independence policy; never assign auditors to areas they are responsible for; consider external consultants for high-risk control areas; document independence verification for each audit |
| Evidence collection incomplete for technological controls (A.8) | Technical configurations not captured, logs not retained, or screenshots not timestamped | Prepare control-specific evidence checklists before audit; request system administrators to export configurations; ensure log retention covers the audit period; timestamp all evidence artifacts |
| Finding closure rate below 90% target | Corrective actions not prioritized, unclear ownership, or insufficient follow-up | Assign specific owners with due dates for every finding; implement automated tracking with escalation at 50% and 75% of SLA; conduct monthly corrective action reviews |
| Surveillance audit identifies regression in previously passed controls | Controls degraded after initial certification due to staff changes, system updates, or process drift | Implement continuous compliance monitoring (not just annual checks); schedule monthly control spot-checks for high-risk areas; include control effectiveness in management review |
| Sample-based testing misses systemic issues | Sample size too small or selection biased toward known-good records | Calculate sample size based on population and risk level (minimum 25 for quarterly reviews); use random selection methods; increase sample for areas with prior findings |

---

## Success Criteria

- **Audit plan completion rate of 100%** -- all scheduled audits executed within the planned quarter, with no deferrals or cancellations without management approval
- **Zero major nonconformities at certification/surveillance audits** -- all systemic control failures identified and corrected during internal audits before external assessment
- **Finding closure rate above 90% within SLA** -- major nonconformities closed within 30 days, minor within 90 days, observations addressed by next audit cycle
- **All 93 Annex A controls audited within the 3-year certification cycle** -- with critical controls (A.8.2, A.8.5, A.8.8, A.8.15) audited quarterly and high-risk controls semi-annually
- **Audit evidence documented with specific references** -- every finding includes control reference, evidence type (inquiry/observation/inspection/re-performance), sample details, and conclusion
- **Auditor competency verified** -- all assigned auditors have ISO 27001 Lead Auditor certification or equivalent, with independence confirmed for each audit engagement

---

## Scope & Limitations

**In Scope:**
- Risk-based annual audit planning and scheduling across all 93 ISO 27001:2022 Annex A controls
- Audit execution workflows including pre-audit preparation, evidence collection, control testing, and closing meetings
- Finding management with severity classification (Major NC, Minor NC, Observation) and corrective action tracking
- Certification support for Stage 1 (documentation review) and Stage 2 (implementation effectiveness) audits
- Surveillance audit preparation and recertification planning
- Control-specific testing procedures for organizational, people, physical, and technological control themes
- Audit performance metrics and KPI tracking

**Out of Scope:**
- Actual certification body selection, engagement, or fee negotiation
- Technical penetration testing or vulnerability scanning -- use `infrastructure-compliance-auditor` for technical checks
- ISO 27001 ISMS implementation -- use `information-security-manager-iso27001` for implementation guidance
- SOC 2 or other framework-specific audit execution beyond ISO 27001 cross-reference
- Legal or contractual advice on audit findings or regulatory reporting obligations

**Important Notes:**
- ISO 27001:2013 certifications expired after October 2025; all audits must now conform to the 2022 edition with 93 controls across 4 themes
- 81% of organizations are pursuing ISO 27001 certification as of 2025 (up from 67% in 2024), reflecting heightened market demand for certified security programs
- Best practice is to embed ISMS audit findings into continuous improvement rather than treating audits as periodic compliance events

---

## Integration Points

| Skill | Integration | When to Use |
|-------|-------------|-------------|
| `information-security-manager-iso27001` | ISMS implementation provides the controls and documentation that audits assess | When audit findings require control improvements or ISMS enhancements |
| `infrastructure-compliance-auditor` | Technical infrastructure checks provide audit evidence for Annex A technological controls | When audit requires evidence of A.8 technological control implementation |
| `soc2-compliance-expert` | SOC 2 audit evidence and Trust Services Criteria overlap with ISO 27001 controls | When organization maintains both ISO 27001 and SOC 2 compliance programs |
| `capa-officer` | Audit findings requiring formal corrective action feed into CAPA process | When major nonconformities require structured root cause analysis and corrective action |

---

## Tool Reference

### isms_audit_scheduler.py

Generates risk-based annual audit plans with quarterly scheduling based on control risk ratings.

| Flag | Required | Description |
|------|----------|-------------|
| `--year <year>` | No | Target year for audit plan (default: current year) |
| `--controls <file>` | No | CSV file with custom control risk ratings (columns: `control_id`, `name`, `risk`); defaults to built-in risk ratings for 18 key controls |
| `--quarters <list>` | No | Generate plan for specific quarters only (e.g., `--quarters Q1 Q2`) |
| `--format <fmt>` | No | Output format: `json` (default) or `markdown` |
| `--output <file>` | No | Export audit plan to specified file path |

**Audit Frequency by Risk Level:**
- `critical`: Quarterly (4x per year) -- e.g., A.8.2 Privileged access, A.8.5 Authentication, A.8.8 Vulnerabilities, A.8.15 Logging
- `high`: Semi-annual (2x per year) -- e.g., A.5.15 Access control, A.5.24 Incident management, A.8.7 Malware protection
- `medium`: Annual (1x per year) -- e.g., A.5.1 Policies, A.6.3 Awareness training, A.7.1 Physical perimeters
- `low`: Annual (1x per year) -- e.g., Documentation, asset inventory

**Output:** Quarterly audit schedule with control assignments, auditor allocation guidance, risk-based prioritization, and coverage tracking ensuring all controls are scheduled within the certification cycle.

---

## iso42001-ai-management

Source path: `references/ra-qm-team/iso42001-ai-management/SKILL.md`

# ISO 42001 AI Management System

Tools and guidance for ISO/IEC 42001:2023 — the first international standard for AI Management Systems (AIMS).

---

## Table of Contents

- [Tools](#tools)
  - [AIMS Readiness Checker](#aims-readiness-checker)
  - [AI Impact Assessor](#ai-impact-assessor)
- [Reference Guides](#reference-guides)
- [Workflows](#workflows)
- [Standard Overview](#standard-overview)

---

## Tools

### AIMS Readiness Checker

Assesses organizational readiness against all ISO 42001 clauses and Annex A controls. Scores each clause on a 0-100 scale and identifies gaps for certification preparation.

```bash
# Assess readiness from a JSON profile
python scripts/aims_readiness_checker.py --input org_profile.json

# Generate a blank input template
python scripts/aims_readiness_checker.py --template > org_profile.json

# JSON output for automation
python scripts/aims_readiness_checker.py --input org_profile.json --json

# Export report to file
python scripts/aims_readiness_checker.py --input org_profile.json --output report.json
```

**Assessment Areas:**

| Clause | Area | Key Checks |
|--------|------|-----------|
| Clause 4 | Context | Scope defined, interested parties, AIMS boundaries |
| Clause 5 | Leadership | AI policy, governance structure, management commitment |
| Clause 6 | Planning | Risk assessment methodology, AI objectives, impact assessments |
| Clause 7 | Support | Resources, competence, awareness, documentation |
| Clause 8 | Operation | AI lifecycle, data management, risk treatment, third-party controls |
| Clause 9 | Performance | Monitoring, internal audit, management review |
| Clause 10 | Improvement | Corrective actions, continual improvement, incident management |
| Annex A | Controls | A.2-A.10 control implementation status |

**Output:**
- Overall readiness score (0-100)
- Per-clause scores with maturity level (Initial/Developing/Defined/Managed/Optimized)
- Annex A control implementation status (Implemented/Partial/Not Implemented/Not Applicable)
- Gap analysis with prioritized recommendations
- Certification readiness assessment (Ready/Near Ready/Significant Gaps)

---

### AI Impact Assessor

Generates comprehensive AI impact assessments evaluating fairness, transparency, safety, privacy, and security dimensions. Maps impacts to interested parties and provides risk treatment recommendations.

```bash
# Assess an AI system from a JSON description
python scripts/ai_impact_assessor.py --input ai_system.json

# Generate a blank input template
python scripts/ai_impact_assessor.py --template > ai_system.json

# Export assessment report
python scripts/ai_impact_assessor.py --input ai_system.json --output assessment.json

# Generate markdown report
python scripts/ai_impact_assessor.py --input ai_system.json --format markdown --output assessment.md
```

**Assessment Dimensions:**

| Dimension | Evaluates | Key Factors |
|-----------|----------|-------------|
| Fairness | Bias, discrimination, equity | Training data diversity, protected attributes, outcome parity |
| Transparency | Explainability, interpretability | Model complexity, decision documentation, user disclosure |
| Safety | Reliability, robustness, harm prevention | Failure modes, edge cases, human oversight, fallback mechanisms |
| Privacy | Data protection, consent, minimization | PI processing, consent mechanisms, data retention, anonymization |
| Security | Adversarial resilience, access control | Attack vectors, model integrity, access management, audit logging |
| Accountability | Governance, responsibility, auditability | Decision ownership, audit trails, escalation procedures |

**Features:**
- Risk scoring per dimension (Low/Medium/High/Critical)
- Interested party impact mapping (users, affected individuals, society, regulators)
- Risk treatment options (Avoid, Mitigate, Transfer, Accept)
- Regulatory mapping (EU AI Act risk tier, ISO 42001 Annex A controls)
- Residual risk calculation after treatment
- Markdown and JSON report generation

---

## Reference Guides

### ISO 42001 Clause Guide
`references/iso42001-clause-guide.md`

Comprehensive clause-by-clause guidance:
- All clauses (4-10) with requirements and implementation steps
- Annex A controls (A.2-A.10) detailed with evidence requirements
- Audit questions per clause for internal audit preparation
- Common nonconformity findings and how to avoid them
- Required documented information per clause
- Cross-references to ISO 27001, ISO 9001, and EU AI Act

### AI Lifecycle Management
`references/ai-lifecycle-management.md`

End-to-end AI system lifecycle guidance:
- Lifecycle stages: design, development, testing, deployment, monitoring, retirement
- Design and development controls (requirements, architecture, coding standards)
- Testing and validation requirements (functional, bias, robustness, performance)
- Deployment procedures (staging, canary, rollback, approval gates)
- Monitoring and maintenance (drift detection, performance degradation, retraining)
- Retirement and decommissioning (data disposal, model archival, stakeholder notification)
- Data management across lifecycle (quality, provenance, bias assessment, lineage)
- Model versioning and change management (version control, change impact, approval workflows)

---

## Clarify First

Before running the assessment, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **AIMS scope** — which AI systems and organizational boundaries are in scope (drives the readiness assessment and per-system impact assessments)
- [ ] **Task** — AIMS readiness assessment vs per-system AI impact assessment (selects the tool and workflow)
- [ ] **Certification target** — initial certification, surveillance, or internal-only (sets the score threshold and evidence depth)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the assessment.

## Workflows

### Workflow 1: ISO 42001 Readiness Assessment

```
Step 1: Define AIMS scope
        → Identify AI systems in scope
        → Determine organizational boundaries
        → Document interested parties and requirements

Step 2: Generate assessment template
        → python scripts/aims_readiness_checker.py --template > org_profile.json
        → Fill in organizational details and current state

Step 3: Run readiness assessment
        → python scripts/aims_readiness_checker.py --input org_profile.json

Step 4: Review results
        → Address critical gaps (Clauses 5, 6, 8 typically weakest)
        → Prioritize Annex A controls by risk
        → Develop remediation roadmap

Step 5: Conduct AI impact assessments
        → python scripts/ai_impact_assessor.py --template > ai_system.json
        → Assess each in-scope AI system
        → python scripts/ai_impact_assessor.py --input ai_system.json

Step 6: Plan implementation
        → See references/iso42001-clause-guide.md for requirements
        → See references/ai-lifecycle-management.md for operational controls
```

### Workflow 2: AI System Impact Assessment

```
Step 1: Identify AI system for assessment
        → Document system purpose, inputs, outputs, and decisions
        → Identify affected individuals and groups

Step 2: Generate assessment template
        → python scripts/ai_impact_assessor.py --template > ai_system.json
        → Complete all sections (model details, data sources, deployment context)

Step 3: Conduct assessment
        → python scripts/ai_impact_assessor.py --input ai_system.json --format markdown --output report.md

Step 4: Review dimension scores
        → Fairness: check for bias in training data and outcomes
        → Transparency: verify explainability mechanisms
        → Safety: validate failure modes and human oversight
        → Privacy: confirm data protection measures
        → Security: assess adversarial resilience

Step 5: Implement risk treatments
        → Apply recommended mitigations per dimension
        → Document residual risk acceptance decisions
        → Assign treatment owners and timelines

Step 6: Monitor and review
        → Schedule periodic reassessment (quarterly minimum)
        → Track treatment implementation progress
        → Update assessment when system changes materially
```

### Workflow 3: AIMS Certification Preparation

```
Step 1: Gap analysis
        → python scripts/aims_readiness_checker.py --input org_profile.json
        → Target overall score of 80+ for certification readiness

Step 2: Document AIMS
        → AI policy (Clause 5.2)
        → AIMS scope (Clause 4.3)
        → Risk assessment methodology (Clause 6.1)
        → Statement of Applicability for Annex A controls
        → AI objectives (Clause 6.2)

Step 3: Implement operational controls
        → AI lifecycle procedures (Clause 8)
        → Data management processes (Annex A.7)
        → Third-party management (Annex A.10)
        → Impact assessments for all AI systems (Annex A.5)

Step 4: Conduct internal audit
        → Use references/iso42001-clause-guide.md audit questions
        → Document findings and corrective actions
        → Verify closure of nonconformities

Step 5: Management review
        → Present AIMS performance to top management
        → Review AI objectives achievement
        → Obtain commitment for continual improvement

Step 6: Stage 1 and Stage 2 audits
        → Stage 1: Documentation review (readiness check)
        → Stage 2: Implementation effectiveness audit
        → Address any nonconformities from audit
```

---

## Standard Overview

### ISO 42001:2023 Overview

ISO/IEC 42001:2023 is the world's first international standard for **AI Management Systems (AIMS)**. Published in December 2023, it provides a framework for organizations to responsibly develop, provide, and use AI systems. The standard follows the ISO Harmonized Structure (Annex SL) for management system standards, enabling integration with ISO 27001, ISO 9001, and ISO 14001.

**Key Characteristics:**
- Certifiable management system standard
- Technology-neutral (applies to any AI approach)
- Risk-based approach to AI governance
- PDCA (Plan-Do-Check-Act) cycle
- Applicable to organizations of any size and sector

### AIMS Framework (Plan-Do-Check-Act)

#### Context of the Organization (Clause 4)

| Requirement | Section | Description |
|------------|---------|-------------|
| Organization context | 4.1 | Internal/external issues relevant to AI objectives |
| Interested parties | 4.2 | Stakeholders, their requirements, and expectations |
| AIMS scope | 4.3 | Boundaries and applicability of the AIMS |
| AIMS establishment | 4.4 | Establish, implement, maintain, and improve the AIMS |

#### Leadership (Clause 5)

| Requirement | Section | Description |
|------------|---------|-------------|
| Leadership commitment | 5.1 | Top management demonstrates commitment to AIMS |
| AI policy | 5.2 | Responsible AI principles, ethical guidelines, organizational values |
| Roles and responsibilities | 5.3 | Clear assignment of AIMS roles, authority, and accountability |

**AI Policy Must Include:**
- Commitment to responsible AI development and use
- Ethical principles guiding AI decisions
- Alignment with applicable legal and regulatory requirements
- Commitment to continual improvement of the AIMS
- Framework for setting AI objectives

**AI Governance Structure:**
- AI governance board or committee
- AI system owners with defined accountability
- Data stewards for AI data management
- Ethics review function
- Incident response roles

#### Planning (Clause 6)

| Requirement | Section | Description |
|------------|---------|-------------|
| Risks and opportunities | 6.1 | Actions to address AI-specific risks and opportunities |
| AI risk assessment | 6.1.2 | Methodology for identifying and evaluating AI risks |
| AI objectives | 6.2 | Measurable objectives for responsible AI |
| Impact assessment | 6.1.4 | Assessment of AI system impacts on individuals and society |

**AI Risk Assessment Must Cover:**
- Fairness and non-discrimination risks
- Transparency and explainability gaps
- Safety and reliability concerns
- Privacy and data protection risks
- Security vulnerabilities
- Accountability gaps
- Societal and environmental impacts

#### Support (Clause 7)

| Requirement | Section | Description |
|------------|---------|-------------|
| Resources | 7.1 | Compute, data, expertise, and infrastructure |
| Competence | 7.2 | Required skills for AI roles, training plans |
| Awareness | 7.3 | AI literacy across the organization |
| Communication | 7.4 | Internal/external communication on AI matters |
| Documented information | 7.5 | Document creation, control, and retention |

#### Operation (Clause 8)

| Requirement | Section | Description |
|------------|---------|-------------|
| Operational planning | 8.1 | Planning and controlling AI processes |
| AI risk assessment | 8.2 | Executing risk assessments per methodology |
| AI risk treatment | 8.3 | Implementing risk treatment plans |
| AI system lifecycle | 8.4 | Managing AI systems through all lifecycle stages |

**AI System Lifecycle Stages:**
1. **Design**: Requirements, architecture, ethical review
2. **Development**: Data preparation, model training, coding standards
3. **Testing**: Functional, bias, robustness, performance validation
4. **Deployment**: Staging, approval, monitoring setup
5. **Operation**: Performance monitoring, drift detection, incident response
6. **Retirement**: Decommissioning, data disposal, stakeholder notification

**Data Management for AI:**
- Data quality assessment and improvement
- Data provenance and lineage tracking
- Bias assessment in training and evaluation data
- Data governance and access controls
- Personal data protection measures
- Data retention and disposal procedures

**Third-Party and Supplier Management:**
- AI component supplier evaluation
- Third-party AI service agreements
- Supply chain risk assessment
- Ongoing supplier monitoring

#### Performance Evaluation (Clause 9)

| Requirement | Section | Description |
|------------|---------|-------------|
| Monitoring and measurement | 9.1 | AI system performance metrics and KPIs |
| Internal audit | 9.2 | Planned audits of the AIMS |
| Management review | 9.3 | Top management review of AIMS effectiveness |

**AI Performance Metrics:**
- Model accuracy, precision, recall
- Fairness metrics (demographic parity, equalized odds)
- Latency and availability
- Drift indicators (data drift, concept drift)
- Incident frequency and severity
- Consumer complaint rates

#### Improvement (Clause 10)

| Requirement | Section | Description |
|------------|---------|-------------|
| Nonconformity | 10.1 | Corrective actions for nonconformities |
| Continual improvement | 10.2 | Ongoing enhancement of the AIMS |
| AI incident management | 10.3 | Handling AI system incidents and near-misses |

### Annex A Controls

| Control | Title | Description |
|---------|-------|-------------|
| A.2 | AI Policies | Policies for responsible AI aligned with organizational objectives |
| A.3 | Internal Organization | Roles, responsibilities, segregation of duties for AI |
| A.4 | Resources for AI Systems | Compute, data, tools, and expertise management |
| A.5 | Assessing AI System Impact | Impact assessment processes for AI systems |
| A.6 | AI System Lifecycle | Controls across design, development, deployment, retirement |
| A.7 | Data for AI Systems | Data quality, provenance, bias, governance, protection |
| A.8 | Information for Interested Parties | Transparency, disclosure, and communication |
| A.9 | Use of AI Systems | Acceptable use policies, human oversight, user guidance |
| A.10 | Third-Party Relationships | Supplier management, outsourced AI, component evaluation |

### Annex B — Implementation Guidance

Annex B provides non-normative guidance for implementing Annex A controls:
- Practical examples for each control objective
- Scalability guidance for different organization sizes
- Sector-specific considerations
- Integration points with existing management systems

### Annex C — AI Risk Sources and Objectives

AI-specific risk sources organized by category:
- **Technical risks**: Model failure, data quality, adversarial attacks, drift
- **Ethical risks**: Bias, discrimination, lack of transparency, autonomy erosion
- **Legal risks**: Regulatory non-compliance, liability, intellectual property
- **Societal risks**: Job displacement, misinformation, environmental impact
- **Organizational risks**: Skill gaps, dependency, reputation damage

AI-specific control objectives:
- Ensure fairness and non-discrimination
- Maintain transparency and explainability
- Guarantee safety and reliability
- Protect privacy and data
- Secure AI systems against threats
- Enable accountability and governance

### Annex D — Use of AIMS Across Domains

Sector-specific considerations:
- **Healthcare**: Patient safety, clinical validation, regulatory approval (FDA, MDR)
- **Finance**: Algorithmic trading, credit scoring, anti-money laundering
- **Autonomous systems**: Safety-critical decisions, human override, fail-safe design
- **Human resources**: Hiring bias, employee monitoring, fairness
- **Public sector**: Citizen impact, democratic values, public trust

### Relationship to Other Standards

| Standard | Relationship | Integration Points |
|----------|-------------|-------------------|
| ISO 27001 | Information security | Risk assessment, access controls, incident management |
| ISO 9001 | Quality management | Process approach, document control, continual improvement |
| ISO 14001 | Environmental management | Impact assessment, lifecycle thinking |
| ISO 31000 | Risk management | Risk framework, assessment methodology |
| ISO 22989 | AI concepts/terminology | Foundational definitions |
| ISO 23894 | AI risk management | Risk management guidance |

### Relationship to EU AI Act

| EU AI Act Requirement | ISO 42001 Mapping |
|----------------------|-------------------|
| Risk management system (Art. 9) | Clause 6.1, 8.2, 8.3, Annex A.5 |
| Data governance (Art. 10) | Clause 8.4, Annex A.7 |
| Technical documentation (Art. 11) | Clause 7.5, Annex A.6 |
| Transparency (Art. 13) | Annex A.8 |
| Human oversight (Art. 14) | Annex A.9 |
| Accuracy, robustness, security (Art. 15) | Clause 9.1, Annex A.6 |
| Quality management system (Art. 17) | Full AIMS (Clauses 4-10) |
| Conformity assessment | Certification process |

### Certification Process

| Phase | Activity | Duration |
|-------|----------|----------|
| Preparation | Gap analysis, implementation, internal audit | 6-12 months |
| Stage 1 Audit | Documentation review, readiness assessment | 1-2 days |
| Gap Remediation | Address Stage 1 findings | 1-3 months |
| Stage 2 Audit | Implementation effectiveness assessment | 2-5 days |
| Certification | Certificate issued (3-year validity) | Upon passing |
| Surveillance | Annual surveillance audits | 1-2 days/year |
| Recertification | Full reassessment every 3 years | 2-4 days |

### Implementation Roadmap

**Phase 1 — Foundation (Months 1-3):**
- Define AIMS scope and boundaries
- Establish AI governance structure
- Develop AI policy
- Conduct initial AI system inventory
- Define risk assessment methodology

**Phase 2 — Core Implementation (Months 4-6):**
- Conduct AI risk assessments for all in-scope systems
- Perform impact assessments (Annex A.5)
- Implement AI lifecycle controls (Annex A.6)
- Establish data management processes (Annex A.7)
- Develop third-party management procedures (Annex A.10)

**Phase 3 — Operationalize (Months 7-9):**
- Deploy monitoring and measurement (Clause 9.1)
- Train personnel on AIMS roles and responsibilities
- Implement incident management procedures
- Conduct awareness programs for AI literacy
- Establish communication processes

**Phase 4 — Verify and Certify (Months 10-12):**
- Conduct internal audit (Clause 9.2)
- Hold management review (Clause 9.3)
- Address nonconformities
- Prepare for Stage 1 certification audit
- Compile evidence packages per clause

---

## Troubleshooting

| Problem | Possible Cause | Resolution |
|---------|---------------|------------|
| Readiness score low on Clause 5 (Leadership) despite executive sponsorship | AI policy does not include ethical principles, responsible AI commitment, or framework for setting AI objectives | Update AI policy to explicitly address all required elements: ethical principles, responsible AI, legal alignment, continual improvement commitment, and AI objectives framework; obtain formal management sign-off |
| AI impact assessment returns High/Critical risk across all dimensions | AI system processes sensitive personal data, makes autonomous decisions, and affects large populations without safeguards | Implement targeted mitigations per dimension: human-in-the-loop for safety, bias testing for fairness, explainability mechanisms for transparency, data protection for privacy; re-run assessment after mitigation |
| Annex A controls scored as "Not Implemented" despite operational practices | Practices exist informally but are not documented per ISO 42001 requirements | Document all existing AI practices as formal procedures; create evidence artifacts (policy documents, meeting minutes, risk registers, training records); map to specific Annex A control objectives |
| Certification body auditor questions AI risk assessment methodology | Risk assessment does not cover all seven required risk categories (fairness, transparency, safety, privacy, security, accountability, societal) | Update risk assessment methodology to explicitly address all ISO 42001 risk categories; use `ai_impact_assessor.py` template to ensure comprehensive coverage; document risk criteria and tolerance levels |
| Third-party AI components lack governance controls | Organization uses third-party AI models or APIs without formal evaluation or supplier management | Implement Annex A.10 (Third-Party Relationships) controls; evaluate all third-party AI components; establish contractual requirements for AI service providers; monitor supplier AI practices |
| Data management procedures incomplete for AI lifecycle | Data quality, provenance, and bias assessment not systematically performed for training and evaluation data | Implement Annex A.7 (Data for AI Systems) controls; establish data quality assessment procedures; document data provenance and lineage; conduct bias assessments per dataset; define retention and disposal procedures |
| Stage 1 audit finds AIMS documentation insufficient | Documentation follows generic QMS structure without AI-specific elements | Restructure documentation to address all ISO 42001 clauses (4-10) and Annex A controls (A.2-A.10); include AI-specific policies, risk assessments, impact assessments, and lifecycle procedures |

---

## Success Criteria

- **Overall readiness score of 80+ for certification readiness** -- as measured by `aims_readiness_checker.py`, with all clauses at Defined maturity level or above
- **AI policy established and communicated** -- including ethical principles, responsible AI commitment, legal compliance alignment, continual improvement, and framework for AI objectives, with formal management approval
- **AI impact assessments completed for all in-scope AI systems** -- covering all six dimensions (fairness, transparency, safety, privacy, security, accountability) with risk treatments documented and residual risk accepted by management
- **AI risk assessment methodology covers all required categories** -- fairness, transparency, safety, privacy, security, accountability, and societal/environmental impacts, with defined risk criteria and tolerance levels
- **Annex A controls implemented with evidence** -- A.2 (Policies) through A.10 (Third-Party) with documented procedures, records, and evidence artifacts suitable for certification audit
- **Internal audit conducted against all AIMS clauses** -- with findings documented, corrective actions tracked to closure, and management review completed with documented improvement decisions
- **AI lifecycle procedures operational** -- covering design, development, testing, deployment, monitoring, and retirement stages with documented controls at each gate

---

## Scope & Limitations

**In Scope:**
- ISO 42001:2023 readiness assessment across all clauses (4-10) and Annex A controls (A.2-A.10)
- AI impact assessment across six dimensions (fairness, transparency, safety, privacy, security, accountability)
- AIMS certification preparation including gap analysis, implementation roadmap, and audit readiness
- AI lifecycle management guidance (design through retirement)
- Data management for AI systems (quality, provenance, bias, governance)
- Third-party AI supplier management and evaluation
- Regulatory mapping to EU AI Act requirements
- Integration guidance with ISO 27001, ISO 9001, and ISO 14001

**Out of Scope:**
- Actual AI model development, training, testing, or deployment -- this skill provides governance frameworks, not ML engineering
- Certification body selection, audit scheduling, or certification fee negotiation
- Ethical review board establishment or ethical decision-making beyond procedural guidance
- Specific AI fairness algorithm implementation (e.g., adversarial debiasing, calibrated equalized odds) -- use `eu-ai-act-specialist` bias detector for technical testing
- Environmental impact measurement or carbon footprint calculation for AI training

**Important Notes:**
- ISO 42001 certification follows a 3-year cycle with annual surveillance audits at 12-month intervals
- Major certification bodies (BSI, DNV, TUV, LRQA) have operationalized ISO 42001 audit services as of 2025-2026
- Many organizations pursue dual alignment: ISO 42001 certification for governance controls plus EU AI Code of Practice for regulatory expectations
- The standard's Annex SL structure enables direct integration with ISO 27001, reducing redundant documentation and audit effort

---

## Integration Points

| Skill | Integration | When to Use |
|-------|-------------|-------------|
| `eu-ai-act-specialist` | ISO 42001 AIMS maps directly to EU AI Act requirements; certification demonstrates Art. 17 QMS compliance | When building AI governance satisfying both ISO 42001 and EU AI Act obligations |
| `information-security-manager-iso27001` | ISO 27001 security controls integrate with AIMS via shared Annex SL structure; risk assessment methodologies align | When implementing joint ISMS + AIMS covering both information security and AI governance |
| `gdpr-dsgvo-expert` | AIMS data management (Annex A.7) aligns with GDPR data protection requirements; AI processing requires DPIA | When AI systems process personal data and require both AIMS and GDPR compliance |
| `isms-audit-expert` | Internal audit methodology and finding management shared between ISO 27001 and ISO 42001 | When conducting internal audits covering both ISMS and AIMS |

---

## Tool Reference

### aims_readiness_checker.py

Assesses organizational readiness against all ISO 42001:2023 clauses and Annex A controls.

| Flag | Required | Description |
|------|----------|-------------|
| `--input <file>` | Yes (unless `--template`) | Path to JSON organizational profile for assessment |
| `--template` | No | Generate blank input template to stdout |
| `--json` | No | Output results in JSON format for automation |
| `--output <file>` | No | Export report to specified file path |

**Assessment Scope:** Clause 4 (Context), Clause 5 (Leadership), Clause 6 (Planning), Clause 7 (Support), Clause 8 (Operation), Clause 9 (Performance), Clause 10 (Improvement), and Annex A controls (A.2-A.10).

**Output:** Overall readiness score (0-100), per-clause scores with maturity level (Initial/Developing/Defined/Managed/Optimized), Annex A control implementation status, gap analysis with prioritized recommendations, and certification readiness assessment (Ready/Near Ready/Significant Gaps).

### ai_impact_assessor.py

Generates comprehensive AI impact assessments across six risk dimensions with regulatory mapping.

| Flag | Required | Description |
|------|----------|-------------|
| `--input <file>` | Yes (unless `--template`) | Path to JSON AI system description for assessment |
| `--template` | No | Generate blank AI system template to stdout |
| `--format <fmt>` | No | Output format: `json` (default) or `markdown` |
| `--output <file>` | No | Export assessment report to specified file path |

**Assessment Dimensions:** Fairness (bias, discrimination, equity), Transparency (explainability, interpretability), Safety (reliability, robustness, harm prevention), Privacy (data protection, consent, minimization), Security (adversarial resilience, access control), Accountability (governance, responsibility, auditability).

**Output:** Per-dimension risk scoring (Low/Medium/High/Critical), interested party impact mapping, risk treatment options (Avoid/Mitigate/Transfer/Accept), regulatory mapping (EU AI Act risk tier, ISO 42001 Annex A controls), residual risk calculation, and markdown or JSON report.

---

## mdr-745-specialist

Source path: `references/ra-qm-team/mdr-745-specialist/SKILL.md`

# MDR 2017/745 Specialist

EU MDR compliance patterns for medical device classification, technical documentation, and clinical evidence.

---

## Table of Contents

- [Device Classification Workflow](#device-classification-workflow)
- [Technical Documentation](#technical-documentation)
- [Clinical Evidence](#clinical-evidence)
- [Post-Market Surveillance](#post-market-surveillance)
- [EUDAMED and UDI](#eudamed-and-udi)
- [Reference Documentation](#reference-documentation)
- [Tools](#tools)

---

## Clarify First

Before classifying the device or analyzing gaps, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Device characteristics** — duration, invasiveness, body-system contact, and whether it is active/software (drives the Annex VIII classification)
- [ ] **Intended purpose** — the device's claimed clinical purpose (sets the applicable rule and clinical-evidence level)
- [ ] **Software/AI nature** — whether it is software as a medical device (MDCG 2019-11) or AI/ML (changes classification and the documentation set)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the classification.

## Device Classification Workflow

Classify device under MDR Annex VIII:

1. Identify device duration (transient, short-term, long-term)
2. Determine invasiveness level (non-invasive, body orifice, surgical)
3. Assess body system contact (CNS, cardiac, other)
4. Check if active device (energy dependent)
5. Apply classification rules 1-22
6. For software, apply MDCG 2019-11 algorithm
7. Document classification rationale
8. **Validation:** Classification confirmed with Notified Body

### Classification Matrix

| Factor | Class I | Class IIa | Class IIb | Class III |
|--------|---------|-----------|-----------|-----------|
| Duration | Any | Short-term | Long-term | Long-term |
| Invasiveness | Non-invasive | Body orifice | Surgical | Implantable |
| System | Any | Non-critical | Critical organs | CNS/cardiac |
| Risk | Lowest | Low-medium | Medium-high | Highest |

### Software Classification (MDCG 2019-11)

| Information Use | Condition Severity | Class |
|-----------------|-------------------|-------|
| Informs decision | Non-serious | IIa |
| Informs decision | Serious | IIb |
| Drives/treats | Critical | III |

### Classification Examples

**Example 1: Absorbable Surgical Suture**
- Rule 8 (implantable, long-term)
- Duration: > 30 days (absorbed)
- Contact: General tissue
- Classification: **Class IIb**

**Example 2: AI Diagnostic Software**
- Rule 11 + MDCG 2019-11
- Function: Diagnoses serious condition
- Classification: **Class IIb**

**Example 3: Cardiac Pacemaker**
- Rule 8 (implantable)
- Contact: Central circulatory system
- Classification: **Class III**

---

## Technical Documentation

Prepare technical file per Annex II and III:

1. Create device description (variants, accessories, intended purpose)
2. Develop labeling (Article 13 requirements, IFU)
3. Document design and manufacturing process
4. Complete GSPR compliance matrix
5. Prepare benefit-risk analysis
6. Compile verification and validation evidence
7. Integrate risk management file (ISO 14971)
8. **Validation:** Technical file reviewed for completeness

### Technical File Structure

```
ANNEX II TECHNICAL DOCUMENTATION
├── Device description and UDI-DI
├── Label and instructions for use
├── Design and manufacturing info
├── GSPR compliance matrix
├── Benefit-risk analysis
├── Verification and validation
└── Clinical evaluation report
```

### GSPR Compliance Checklist

| Requirement | Evidence | Status |
|-------------|----------|--------|
| Safe design (GSPR 1-3) | Risk management file | ☐ |
| Chemical properties (GSPR 10.1) | Biocompatibility report | ☐ |
| Infection risk (GSPR 10.2) | Sterilization validation | ☐ |
| Software requirements (GSPR 17) | IEC 62304 documentation | ☐ |
| Labeling (GSPR 23) | Label artwork, IFU | ☐ |

### Conformity Assessment Routes

| Class | Route | NB Involvement |
|-------|-------|----------------|
| I | Annex II self-declaration | None |
| Is/Im | Annex II + IX/XI | Sterile/measuring aspects |
| IIa | Annex II + IX or XI | Product or QMS |
| IIb | Annex IX + X or X + XI | Type exam + production |
| III | Annex IX + X | Full QMS + type exam |

---

## Clinical Evidence

Develop clinical evidence strategy per Annex XIV:

1. Define clinical claims and endpoints
2. Conduct systematic literature search
3. Appraise clinical data quality
4. Assess equivalence (technical, biological, clinical)
5. Identify evidence gaps
6. Determine if clinical investigation required
7. Prepare Clinical Evaluation Report (CER)
8. **Validation:** CER reviewed by qualified evaluator

### Evidence Requirements by Class

| Class | Minimum Evidence | Investigation |
|-------|------------------|---------------|
| I | Risk-benefit analysis | Not typically required |
| IIa | Literature + post-market | May be required |
| IIb | Systematic literature review | Often required |
| III | Comprehensive clinical data | Required (Article 61) |

### Clinical Evaluation Report Structure

```
CER CONTENTS
├── Executive summary
├── Device scope and intended purpose
├── Clinical background (state of the art)
├── Literature search methodology
├── Data appraisal and analysis
├── Safety and performance conclusions
├── Benefit-risk determination
└── PMCF plan summary
```

### Qualified Evaluator Requirements

- Medical degree or equivalent healthcare qualification
- 4+ years clinical experience in relevant field
- Training in clinical evaluation methodology
- Understanding of MDR requirements

---

## Post-Market Surveillance

Establish PMS system per Chapter VII:

1. Develop PMS plan (Article 84)
2. Define data collection methods
3. Establish complaint handling procedures
4. Create vigilance reporting process
5. Plan Periodic Safety Update Reports (PSUR)
6. Integrate with PMCF activities
7. Define trend analysis and signal detection
8. **Validation:** PMS system audited annually

### PMS System Components

| Component | Requirement | Frequency |
|-----------|-------------|-----------|
| PMS Plan | Article 84 | Maintain current |
| PSUR | Class IIa and higher | Per class schedule |
| PMCF Plan | Annex XIV Part B | Update with CER |
| PMCF Report | Annex XIV Part B | Annual (Class III) |
| Vigilance | Articles 87-92 | As events occur |

### PSUR Schedule

| Class | Frequency |
|-------|-----------|
| Class III | Annual |
| Class IIb implantable | Annual |
| Class IIb | Every 2 years |
| Class IIa | When necessary |

### Serious Incident Reporting

| Timeline | Requirement |
|----------|-------------|
| 2 days | Serious public health threat |
| 10 days | Death or serious deterioration |
| 15 days | Other serious incidents |

---

## EUDAMED and UDI

Implement UDI system per Article 27:

1. Obtain issuing entity code (GS1, HIBCC, ICCBBA)
2. Assign UDI-DI to each device variant
3. Assign UDI-PI (production identifier)
4. Apply UDI carrier to labels (AIDC + HRI)
5. Register actor in EUDAMED
6. Register devices in EUDAMED
7. Upload certificates when available
8. **Validation:** UDI verified on sample labels

### EUDAMED Modules

| Module | Content | Actor |
|--------|---------|-------|
| Actor | Company registration | Manufacturer, AR |
| UDI/Device | Device and variant data | Manufacturer |
| Certificates | NB certificates | Notified Body |
| Clinical Investigation | Study registration | Sponsor |
| Vigilance | Incident reports | Manufacturer |
| Market Surveillance | Authority actions | Competent Authority |

### UDI Label Requirements

Required elements per Article 13:

- [ ] UDI-DI (device identifier)
- [ ] UDI-PI (production identifier) for Class II+
- [ ] AIDC format (barcode/RFID)
- [ ] HRI format (human-readable)
- [ ] Manufacturer name and address
- [ ] Lot/serial number
- [ ] Expiration date (if applicable)

---

## Reference Documentation

### MDR Classification Guide

`references/mdr-classification-guide.md` contains:

- Complete Annex VIII classification rules (Rules 1-22)
- Software classification per MDCG 2019-11
- Worked classification examples
- Conformity assessment route selection

### Clinical Evidence Requirements

`references/clinical-evidence-requirements.md` contains:

- Clinical evidence framework and hierarchy
- Literature search methodology
- Clinical Evaluation Report structure
- PMCF plan and evaluation report guidance

### Technical Documentation Templates

`references/technical-documentation-templates.md` contains:

- Annex II and III content requirements
- Design History File structure
- GSPR compliance matrix template
- Declaration of Conformity template
- Notified Body submission checklist

---

## Tools

### MDR Gap Analyzer

```bash
# Quick gap analysis
python scripts/mdr_gap_analyzer.py --device "Device Name" --class IIa

# JSON output for integration
python scripts/mdr_gap_analyzer.py --device "Device Name" --class III --output json

# Interactive assessment
python scripts/mdr_gap_analyzer.py --interactive
```

Analyzes device against MDR requirements, identifies compliance gaps, generates prioritized recommendations.

**Output includes:**
- Requirements checklist by category
- Gap identification with priorities
- Critical gap highlighting
- Compliance roadmap recommendations

---

## Notified Body Interface

### Selection Criteria

| Factor | Considerations |
|--------|----------------|
| Designation scope | Covers your device type |
| Capacity | Timeline for initial audit |
| Geographic reach | Markets you need to access |
| Technical expertise | Experience with your technology |
| Fee structure | Transparency, predictability |

### Pre-Submission Checklist

- [ ] Technical documentation complete
- [ ] GSPR matrix fully addressed
- [ ] Risk management file current
- [ ] Clinical evaluation report complete
- [ ] QMS (ISO 13485) certified
- [ ] Labeling and IFU finalized
- [ ] **Validation:** Internal gap assessment complete

---

## MDCG Guidance Documents Update (2024-2025)

### Key MDCG Guidance Documents

| Document | Title | Status | Key Impact |
|----------|-------|--------|------------|
| MDCG 2024-1 | Transition provisions under MDR Art. 120 | Final (2024) | Extended transition deadlines for legacy devices |
| MDCG 2024-6 | Clinical evidence needed for medical devices previously CE marked under Directives | Final (2024) | Reduced clinical evidence burden for well-established devices |
| MDCG 2023-4 Rev.1 | Notified Body capacity and availability | Revised (2024) | NB capacity monitoring and optimization |
| MDCG 2022-18 Rev.1 | Software qualification and classification under MDR | Revised (2024) | Updated software classification algorithm |
| MDCG 2020-1 Rev.1 | Clinical evaluation — equivalence | Revised (2024) | Refined equivalence demonstration requirements |
| MDCG 2019-16 Rev.1 | Cybersecurity for medical devices | Revised (2024) | Enhanced cybersecurity requirements for connected devices |
| MDCG 2019-11 Rev.1 | Qualification and classification of software | Active | Software as medical device classification |

### MDR Transition Timeline (Post-Amendment Regulation 2023/607)

| Device Category | Transition Deadline | Conditions |
|----------------|--------------------|-----------|
| Class III and implantable | 26 May 2026 | Valid MDD/AIMDD certificate + QMS application to NB by 26 May 2024 |
| Class IIb | 31 December 2027 | Valid certificate + QMS application to NB |
| Class IIa and Class I (sterile/measuring) | 31 December 2028 | Valid certificate + QMS application to NB |
| Class I (up-classified under MDR) | 31 December 2028 | Previously exempt from NB involvement |

**Conditions for extended deadlines:**
- Device continues to comply with MDD/AIMDD
- No significant changes in design or intended purpose
- No unacceptable safety or performance risk
- Manufacturer has applied to Notified Body for MDR conformity assessment before applicable deadline

---

## Software as Medical Device Under MDR (MDCG 2019-11 Rev.1)

### Software Qualification Decision

```
Is the software a medical device?
        │
        ▼
Does the software perform an action on data?
        │
    Yes─┴─No → NOT a medical device (data storage/communication only)
     │
     ▼
Is the action for the benefit of individual patients?
        │
    Yes─┴─No → NOT a medical device (population health/admin)
     │
     ▼
Is the action one of: treatment, diagnosis, monitoring, prediction?
        │
    Yes─┴─No → NOT a medical device (lifestyle/wellness)
     │
     ▼
QUALIFIES AS MEDICAL DEVICE SOFTWARE → Apply classification rules
```

### Software Classification Under MDR

| Decision Factor | Class IIa | Class IIb | Class III |
|----------------|-----------|-----------|-----------|
| Provides information to inform clinical management | Non-serious conditions | Serious conditions | N/A |
| Drives clinical management or diagnoses | N/A | Non-serious conditions | Serious or critical conditions |
| Monitors physiological processes | Non-vital parameters | Vital parameters (not immediate danger) | Vital parameters (immediate danger) |

### Software Lifecycle Requirements Under MDR

| MDR Requirement | IEC 62304 Mapping | Documentation |
|----------------|-------------------|---------------|
| GSPR 17.1 (repeatability, reliability) | Software development process | Software development plan |
| GSPR 17.2 (state of the art) | Software architecture | Architecture design document |
| GSPR 17.3 (minimum IT requirements) | System requirements | IT environment specification |
| GSPR 17.4 (foreseeable misuse) | Risk management | Software risk analysis |
| Annex II §6.5 (software verification) | Software testing | Test plans and reports |
| Annex I §23.4 (labeling for software) | Release documentation | Software release notes |

---

## AI/ML Medical Devices Under MDR

### AI/ML Classification Considerations

| AI/ML Capability | MDR Classification Impact | Regulatory Consideration |
|-----------------|--------------------------|-------------------------|
| AI-assisted detection | Typically Class IIa-IIb (Rule 11) | Must demonstrate clinical performance per intended use |
| AI-driven diagnosis | Typically Class IIb-III (Rule 11) | Requires clinical investigation for novel indications |
| AI treatment optimization | Typically Class IIb-III (Rule 11 + specific rules) | Benefit-risk analysis must account for AI uncertainty |
| Continuously learning AI | Classification per highest risk output | Post-market monitoring must track algorithm evolution |

### AI/ML-Specific Technical Documentation

In addition to standard Annex II requirements, AI/ML devices must document:

| Section | Content | MDCG Reference |
|---------|---------|----------------|
| Algorithm description | Architecture, training approach, feature engineering | MDCG 2019-11, IMDRF SaMD WG |
| Training data | Sources, demographics, size, labeling methodology, quality | MDCG 2020-1 (equivalence) |
| Validation methodology | Test dataset independence, performance metrics, subgroup analysis | Annex XIV |
| Clinical performance | Sensitivity, specificity, AUC, PPV, NPV per intended population | CER requirements |
| Change management | How algorithm updates are validated and deployed | GSPR 17 |
| Explainability | How the AI's output can be understood by intended users | GSPR 23 (labeling) |

### EU AI Act Interaction with MDR

| EU AI Act Requirement | MDR Equivalent | Combined Approach |
|----------------------|----------------|-------------------|
| High-risk classification (Annex III, Point 10) | Annex VIII classification rules | Both classifications apply; meet stricter requirement |
| Conformity assessment (Art. 43) | Annex IX/X/XI assessment | MDR conformity assessment satisfies AI Act (Art. 120) |
| Technical documentation (Annex IV) | Annex II technical documentation | Extend MDR technical file with AI Act-specific elements |
| Risk management (Art. 9) | ISO 14971 + GSPR | ISO 14971 satisfies both when AI risks are included |
| Data governance (Art. 10) | GSPR 17 + Annex XIV | Add AI-specific data governance to clinical evaluation |
| Post-market monitoring (Art. 72) | Chapter VII PMS | Single PMS system covering both AI Act and MDR |

> **See also:** `../risk-management-specialist/SKILL.md` for AI-specific risk management under ISO 14971, and `../fda-consultant-specialist/SKILL.md` for FDA's AI/ML SaMD framework and PCCP.

---

## Eudamed Implementation Status and Requirements

### Eudamed Module Deployment Status (as of 2025)

| Module | Status | Mandatory Date | Content |
|--------|--------|----------------|---------|
| Actor Registration | Operational | Available now | Economic operator registration |
| UDI/Device Registration | Operational | 6 months after Eudamed fully functional | Device and UDI-DI data |
| Notified Body and Certificates | Operational | Available now | Certificate data upload by NBs |
| Clinical Investigations | Operational | Available now | Study registration and reporting |
| Vigilance | Partially operational | 24 months after fully functional | Incident reports, FSCAs, trend reports |
| Market Surveillance | In development | 18 months after fully functional | CA market surveillance activities |

**Key consideration:** Until Eudamed is declared fully functional by the European Commission, manufacturers must use existing national systems (e.g., BfArM in Germany, ANSM in France) for vigilance reporting.

### Eudamed Registration Requirements for Manufacturers

| Data Element | Required For | Update Frequency |
|-------------|-------------|-----------------|
| SRN (Single Registration Number) | All manufacturers | On change |
| Authorized representative details | Non-EU manufacturers | On change |
| Device identification (UDI-DI) | All devices placed on market | Before first placing on market |
| Basic UDI-DI | Device model/family grouping | Before first placing on market |
| GMDN code | Device nomenclature | On initial registration |
| Risk class | Classification per Annex VIII | On initial registration |
| NB certificate reference | Class IIa and above | When certificate issued |
| Clinical investigation registration | Interventional studies | Before study start |

---

## UDI-DI and UDI-PI Detailed Requirements

### UDI-DI (Device Identifier) — Static Information

| Element | Description | Example |
|---------|-------------|---------|
| Device identifier | Unique code for device model/version | 04069876543219 (GS1 GTIN) |
| Issuing entity | GS1, HIBCC, ICCBBA, or IFA | Selected by manufacturer |
| Device model | Specific device configuration | "CardioMonitor X200" |
| Device version | Software version (for SaMD) | "v3.1.0" |
| Applicable regulations | MDR or IVDR reference | MDR 2017/745 |
| Risk class | Per Annex VIII | Class IIa |
| Basic UDI-DI | Grouping identifier for device family | 04069876500001 |

### UDI-PI (Production Identifier) — Variable Information

| PI Element | When Required | Format |
|-----------|---------------|--------|
| Lot/batch number | When tracking by lot | Lot: ABC123 |
| Serial number | When individual tracking required (Class III, implantable) | SN: 2024-00001 |
| Manufacturing date | When relevant to safety | Mfg: 2024-06-15 |
| Expiry date | When device has shelf life | Exp: 2026-06-15 |
| Software version | SaMD and software-driven devices | SW: v3.1.0 |

### UDI Carrier Requirements

| Carrier Type | Format | Where Applied |
|-------------|--------|---------------|
| AIDC (barcode/2D code) | GS1 DataMatrix, GS1-128, HIBC | Device label, package label |
| HRI (human-readable) | Plain text interpretation of AIDC | Adjacent to AIDC on label |
| RFID | GS1 EPC/RFID | Optional, in addition to AIDC |

**Labeling placement rules:**
- UDI on each level of packaging (unit, intermediate, case)
- For reusable devices requiring sterilization: UDI on device itself (direct marking)
- Class III implantable: UDI on device or packaging that remains with patient record
- UDI must survive device lifecycle (including reprocessing cycles for reusable devices)

### UDI Database Submission Timeline

| Device Class | Submission Deadline |
|-------------|-------------------|
| Class III and implantable | Before placing on the market |
| Class IIb | Before placing on the market |
| Class IIa | Before placing on the market |
| Class I | Before placing on the market |

> **Note:** All timelines are contingent on Eudamed being declared fully functional. Until then, manufacturers should pre-register in Eudamed (available modules) and maintain data readiness.

---

## Cross-Reference: NIS2 for Critical Infrastructure (Healthcare)

Healthcare organizations manufacturing or deploying medical devices may be classified as essential entities under NIS2:

| NIS2 Requirement | MDR Impact | Action for Manufacturers |
|-----------------|-----------|--------------------------|
| Art. 21: Cybersecurity risk management | MDCG 2019-16 cybersecurity guidance | Align device cybersecurity with organizational NIS2 compliance |
| Art. 23: Incident reporting (24h/72h) | Art. 87-92 vigilance reporting | Unified incident reporting covering both device and infrastructure incidents |
| Art. 21(2)(d): Supply chain security | Art. 11 authorized representatives, supply chain | Assess cybersecurity of device component suppliers |
| Art. 20: Governance and accountability | Art. 10 manufacturer obligations | Senior management oversight of both NIS2 and MDR compliance |

> **See also:** `../information-security-manager-iso27001/SKILL.md` for ISO 27001 alignment with NIS2 requirements.

---

## MDR Updates & Cross-Framework Integration

### Latest MDCG Guidance Documents

- **MDCG 2019-11 Rev.1:** Qualification and classification of software — updated algorithm for SaMD
- **MDCG 2020-1 Rev.1:** Clinical evaluation (Annex XIV) — updated methodologies
- **MDCG 2024-8:** EU AI Act interaction with MDR for AI-enabled medical devices
- **MDCG 2023-4:** Legacy devices and Article 120 transition provisions

### AI/ML Medical Devices Under MDR

- **Classification:** AI/ML-based SaMD typically Class IIa or higher (Rule 11)
- **Clinical Evidence:** Must demonstrate AI algorithm clinical performance (sensitivity, specificity, AUC)
- **Continuous Learning:** PCCP-equivalent under MDR for adaptive AI devices
- **Post-Market:** Enhanced PMCF for AI devices monitoring real-world algorithm performance
- **EU AI Act Interaction:** High-risk AI medical devices subject to BOTH MDR and EU AI Act
- **Cross-reference:** See `eu-ai-act-specialist` for AI Act obligations

### NIS2 Impact on Healthcare

- Healthcare entities are "Essential Entities" under NIS2 Directive
- Medical device manufacturers may be "Important Entities"
- NIS2 cybersecurity requirements supplement MDR cybersecurity expectations
- **Cross-reference:** See `nis2-directive-specialist` for NIS2 compliance

### EUDAMED Implementation Status

- **Actor Registration Module:** Operational — all economic operators must register
- **UDI/Device Registration Module:** Operational — mandatory device registration
- **Notified Body Module:** Operational — certificate information
- **Clinical Investigation Module:** Available
- **Vigilance Module:** Under development
- **Market Surveillance Module:** Under development

### UDI Detailed Requirements

- **UDI-DI (Device Identifier):** Unique to device model — used for EUDAMED registration
- **UDI-PI (Production Identifier):** Identifies production unit — lot, serial, expiry, manufacturing date
- **Issuing Entities:** GS1, HIBCC, ICCBBA, IFA
- **Carrier Types:** AIDC (barcode/2D) + HRI (human readable)
- **Implant Card:** Required for Class III implantable devices (UDI + patient information)

---

## Troubleshooting

| Problem | Possible Cause | Resolution |
|---------|---------------|------------|
| Device classification unclear -- rules yield different results | Multiple classification rules apply; highest class must be selected per MDR Article 51(7) | Apply all applicable rules from Annex VIII (Rules 1-22); use the implementing rule that gives the highest classification; for software, apply MDCG 2019-11 Rev.1 algorithm; document rationale for each rule considered |
| Notified Body rejects technical file for incompleteness | GSPR compliance matrix gaps, missing clinical evaluation, or insufficient risk management documentation | Review GSPR checklist in this skill; ensure Annex II technical file structure is complete; verify CER meets Annex XIV requirements; confirm ISO 14971 risk management file is current and comprehensive |
| EUDAMED registration delays blocking market access | Module not operational or manufacturer SRN not obtained | Check current EUDAMED module status; obtain SRN via actor registration module (operational); use national systems for vigilance reporting until Eudamed Vigilance module is fully functional |
| Clinical evidence insufficient for Class IIb/III device | Equivalence route rejected by NB or clinical investigation not planned | Reassess equivalence per MDCG 2020-1 Rev.1 (technical, biological, clinical equivalence with access to data); if equivalence fails, plan clinical investigation per Article 61; consider MDCG 2024-6 for reduced evidence burden on well-established devices |
| MDR transition deadline approaching with NB application pending | Limited NB capacity (approximately 40 designated EU-wide as of 2025) | Verify transition deadline for your device class (Class III: May 2026, Class IIb: Dec 2027, Class IIa: Dec 2028); ensure QMS application was submitted to NB by applicable deadline; maintain MDD/AIMDD compliance during transition |
| UDI labeling rejected by NB or competent authority | UDI-DI/UDI-PI format incorrect, AIDC carrier unreadable, or missing elements | Verify all required UDI elements per Article 27; ensure AIDC format (GS1 DataMatrix preferred) is scannable; include HRI adjacent to barcode; for reusable devices, apply direct marking that survives reprocessing |
| AI/ML medical device faces dual regulatory obligations | Device classified under both MDR and EU AI Act as high-risk | Assess both MDR Annex VIII classification and EU AI Act Annex III categorization; MDR conformity assessment may satisfy AI Act per Art. 120; extend technical documentation with AI-specific elements per MDCG 2024-8 |

---

## Success Criteria

- **Device correctly classified with documented rationale** -- classification per Annex VIII with all applicable rules evaluated, highest class selected, and rationale documented for NB review
- **Complete technical file per Annex II structure** -- device description, labeling/IFU, design and manufacturing info, GSPR compliance matrix, benefit-risk analysis, verification and validation, and clinical evaluation report all present and current
- **GSPR compliance matrix fully addressed** -- all applicable General Safety and Performance Requirements mapped to evidence with cross-references to risk management file, biocompatibility reports, sterilization validation, software documentation, and labeling
- **Clinical evaluation report meets Annex XIV requirements** -- literature search methodology documented, data appraised and analyzed, safety and performance conclusions stated, benefit-risk determined, and PMCF plan included
- **PMS system operational** -- PMS plan per Article 84, complaint handling procedures, vigilance reporting process, PSUR schedule defined by class, and PMCF activities integrated with CER
- **UDI system fully implemented** -- UDI-DI assigned per device variant, UDI-PI applied (lot/serial/dates), AIDC and HRI carriers on all packaging levels, EUDAMED registration complete (when applicable)
- **MDR gap analysis shows zero critical gaps** -- as measured by `mdr_gap_analyzer.py`, with all requirements addressed or in-progress with documented timeline

---

## Scope & Limitations

**In Scope:**
- Device classification per MDR Annex VIII (Rules 1-22) including software classification per MDCG 2019-11 Rev.1
- Technical documentation structure and requirements per Annex II and Annex III
- GSPR compliance matrix with evidence mapping
- Clinical evidence strategy including equivalence assessment, CER structure, and PMCF planning
- Post-market surveillance system design including PMS plan, PSUR schedule, and vigilance reporting timelines
- EUDAMED and UDI system implementation guidance
- Conformity assessment route selection by device class
- MDR transition timeline tracking (post-Amendment Regulation 2023/607)
- AI/ML medical device considerations including EU AI Act interaction

**Out of Scope:**
- Clinical investigation protocol design, execution, or statistical analysis
- Biocompatibility testing per ISO 10993 (beyond evidence mapping in GSPR)
- Sterilization validation per ISO 11135/11137 (beyond evidence mapping)
- Notified Body selection, engagement, or commercial negotiation
- Quality Management System implementation -- use `quality-manager-qms-iso13485` for ISO 13485 QMS
- Risk management process implementation -- use `risk-management-specialist` for ISO 14971

**Important Notes:**
- EUDAMED's first four modules became mandatory from May 28, 2026; manufacturers must have SRN and device registrations ready
- Only approximately 40 Notified Bodies are designated EU-wide as of 2025, creating capacity constraints; early NB engagement is critical
- The European Commission published updated transition timelines in December 2025 extending deadlines for certain device categories
- Manufacturers must adopt recently harmonized standards with no formal transition period (Decision EU 2025/2078)

---

## Integration Points

| Skill | Integration | When to Use |
|-------|-------------|-------------|
| `fda-consultant-specialist` | Cross-framework mapping for dual US/EU market; FDA QMSR aligns with ISO 13485 used by MDR | When device requires both FDA clearance/approval and EU MDR CE marking |
| `quality-manager-qms-iso13485` | ISO 13485 QMS is prerequisite for MDR conformity assessment (Annex IX, XI) | When establishing or auditing QMS for MDR compliance |
| `risk-management-specialist` | ISO 14971 risk management file is core component of MDR technical documentation | When developing risk management file, FMEA, and benefit-risk analysis |
| `eu-ai-act-specialist` | AI medical devices subject to both MDR and EU AI Act; classification and conformity assessment interaction | When AI-enabled medical device requires dual regulatory compliance |
| `capa-officer` | CAPA process supports MDR vigilance obligations and FSCA implementation | When post-market surveillance identifies safety or performance issues requiring corrective action |
| `infrastructure-compliance-auditor` | Cybersecurity validation per MDCG 2019-16 Rev.1 for connected medical devices | When connected device requires cybersecurity documentation for technical file |

---

## Tool Reference

### mdr_gap_analyzer.py

Analyzes device against MDR requirements, identifies compliance gaps, and generates prioritized recommendations.

| Flag | Required | Description |
|------|----------|-------------|
| `--device <name>` | Yes (unless `--interactive`) | Device name for gap analysis |
| `--class <class>` | Yes (unless `--interactive`) | Device classification: `I`, `Is`, `Im`, `IIa`, `IIb`, `III` |
| `--output <format>` | No | Output format: `json` for machine-readable output; default is human-readable text |
| `--interactive` | No | Launch interactive assessment mode with guided questions |

**Analysis Categories:** Technical documentation (Annex II), GSPR compliance, clinical evidence (Annex XIV), post-market surveillance (Chapter VII), UDI/EUDAMED, labeling (Article 13), quality management system, risk management, and conformity assessment route.

**Output:** Requirements checklist with per-item status (Not Started/In Progress/Complete/N/A), gap identification with priority (Critical/High/Medium/Low), critical gap highlighting, completion percentage, and compliance roadmap recommendations.

---

## nis2-directive-specialist

Source path: `references/ra-qm-team/nis2-directive-specialist/SKILL.md`

# NIS2 Directive Specialist

Tools and guidance for EU Directive 2022/2555 on measures for a high common level of cybersecurity across the Union (NIS2 Directive).

---

## Table of Contents

- [NIS2 Overview](#nis2-overview)
- [Scope and Applicability](#scope-and-applicability)
- [10 Minimum Security Measures](#10-minimum-security-measures-article-21)
- [Incident Reporting Requirements](#incident-reporting-requirements)
- [Management Accountability](#management-accountability-article-20)
- [Supply Chain Security](#supply-chain-security-deep-dive)
- [Penalties](#penalties)
- [NIS2 vs NIS1 Comparison](#nis2-vs-nis1-comparison)
- [Infrastructure Security Checks](#infrastructure-security-checks)
- [Tools](#tools)
- [Reference Guides](#reference-guides)
- [Compliance Assessment Workflow](#compliance-assessment-workflow)
- [NIS2 Implementation Roadmap](#nis2-implementation-roadmap)

---

## NIS2 Overview

The **NIS2 Directive (EU 2022/2555)** is the EU's updated framework for cybersecurity, replacing the original NIS Directive (EU 2016/1148). It entered into force on January 16, 2023, with Member States required to transpose it into national law by **October 17, 2024**.

**Key objectives:**

- Establish a high common level of cybersecurity across the EU
- Harmonize cybersecurity requirements and enforcement
- Expand scope to cover more sectors and entities
- Strengthen incident reporting obligations
- Introduce management accountability for cybersecurity
- Enhance supply chain security requirements

**Legal basis:** Article 114 TFEU (internal market harmonization)

**Relationship to other frameworks:**

| Framework | Relationship |
|-----------|-------------|
| ISO 27001 | NIS2 measures map closely to ISO 27001 controls |
| GDPR | NIS2 complements GDPR for security of processing |
| CER Directive | Critical Entities Resilience — physical security complement |
| DORA | Lex specialis for financial sector entities |
| Cyber Resilience Act | Product security requirements for hardware/software |

---

## Scope and Applicability

### Essential Entities (Annex I — High Criticality Sectors)

| Sector | Sub-sectors |
|--------|------------|
| **Energy** | Electricity (DSOs, TSOs, producers, storage), oil (pipelines, production, refineries, storage), gas (DSOs, TSOs, LNG, storage), hydrogen, district heating/cooling |
| **Transport** | Air (carriers, airports, traffic management), rail (infrastructure managers, operators), water (inland, maritime, port operators), road (traffic management, ITS operators) |
| **Banking** | Credit institutions as defined in Regulation (EU) No 575/2013 |
| **Financial market infrastructure** | Trading venues, central counterparties |
| **Health** | Healthcare providers, EU reference laboratories, entities manufacturing pharmaceutical products, entities manufacturing medical devices considered critical during public health emergencies |
| **Drinking water** | Suppliers and distributors of water intended for human consumption |
| **Waste water** | Entities collecting, disposing, or treating urban waste water, domestic waste water, or industrial waste water |
| **Digital infrastructure** | IXPs, DNS providers, TLD registries, cloud computing providers, data center operators, CDN providers, trust service providers, public electronic communications networks, publicly available electronic communications services |
| **ICT service management (B2B)** | Managed service providers, managed security service providers |
| **Public administration** | Central government entities, regional government entities at NUTS level 1 and 2 |
| **Space** | Operators of ground-based infrastructure supporting space-based services |

### Important Entities (Annex II — Other Critical Sectors)

| Sector | Sub-sectors |
|--------|------------|
| **Postal and courier services** | Providers of postal services including courier services |
| **Waste management** | Entities carrying out waste management (excluding those for whom waste management is not their principal economic activity) |
| **Chemicals** | Entities manufacturing, producing, or distributing chemical substances and mixtures |
| **Food** | Food businesses engaged in wholesale distribution, industrial production, and processing |
| **Manufacturing** | Medical devices and in vitro diagnostics, computer/electronic/optical products, electrical equipment, machinery and equipment, motor vehicles/trailers, other transport equipment |
| **Digital providers** | Online marketplaces, online search engines, social networking services platforms |
| **Research** | Research organizations |

### Size Thresholds

| Category | Employees | Annual Turnover | Annual Balance Sheet |
|----------|-----------|----------------|---------------------|
| **Medium enterprise** | 50–249 | €10M–€50M | €10M–€43M |
| **Large enterprise** | 250+ | €50M+ | €43M+ |

**Automatic inclusion regardless of size:**

- Trust service providers
- TLD name registries
- DNS service providers
- Public electronic communications networks/services
- Public administration entities
- Sole provider of a service in a Member State
- Entity whose disruption could have significant impact on public safety, security, or health
- Entity whose disruption could induce systemic risk (especially cross-border)

**Exclusions:**

- Micro and small enterprises (generally excluded unless specifically designated)
- National security, public security, defense, law enforcement
- Judiciary, parliaments, central banks

---

## 10 Minimum Security Measures (Article 21)

All essential and important entities must implement appropriate and proportionate technical, operational, and organizational measures to manage cybersecurity risks. These measures must be based on an **all-hazards approach** and cover at minimum:

### 1. Risk Analysis and Information System Security Policies

Establish and maintain comprehensive risk analysis processes and information security policies covering all information systems.

**Requirements:**
- Formal risk assessment methodology
- Asset inventory and classification
- Security policy framework (approved by management body)
- Regular policy review cycles (at least annually)
- Risk appetite and tolerance definitions
- Documented risk treatment plans

### 2. Incident Handling

Implement procedures for detecting, managing, and responding to cybersecurity incidents.

**Requirements:**
- Incident detection capabilities
- Incident classification and triage procedures
- Incident response plans and playbooks
- Incident escalation procedures
- Post-incident review process
- Integration with CSIRT reporting (see Incident Reporting section)

### 3. Business Continuity and Crisis Management

Ensure service continuity during and after cybersecurity incidents.

**Requirements:**
- Business impact analysis (BIA)
- Business continuity plans (BCP)
- Disaster recovery plans (DRP)
- Backup management policies
- Crisis management procedures
- Regular testing of continuity plans (at least annually)
- Recovery time objectives (RTO) and recovery point objectives (RPO)

### 4. Supply Chain Security

Address security risks in relationships with direct suppliers and service providers.

**Requirements:**
- Supplier risk assessment process
- Security requirements in contracts with suppliers
- Monitoring of supplier security posture
- Supplier incident notification requirements
- Assessment of aggregate supply chain risks
- Product/service quality and cybersecurity practices of suppliers

### 5. Security in Network and Information Systems Acquisition, Development, and Maintenance

Integrate security throughout the system lifecycle.

**Requirements:**
- Secure development lifecycle (SDLC) practices
- Vulnerability management procedures
- Security testing (SAST, DAST, penetration testing)
- Patch management processes
- Change management with security review
- Secure configuration management

### 6. Policies and Procedures for Assessing Effectiveness

Evaluate whether cybersecurity risk management measures are effective.

**Requirements:**
- Security metrics and KPIs
- Regular security assessments and audits
- Penetration testing program
- Vulnerability scanning
- Compliance monitoring
- Continuous improvement processes

### 7. Basic Cyber Hygiene Practices and Cybersecurity Training

Ensure all personnel have adequate cybersecurity awareness and skills.

**Requirements:**
- Cybersecurity awareness training for all staff
- Role-based security training for technical staff
- Management body cybersecurity training (mandatory under Article 20)
- Phishing simulation exercises
- Security awareness campaigns
- Training records and effectiveness measurement

### 8. Policies and Procedures Regarding Use of Cryptography and Encryption

Protect data confidentiality and integrity through cryptographic controls.

**Requirements:**
- Cryptography policy
- Encryption standards for data at rest and in transit
- Key management procedures
- Certificate management
- Cryptographic algorithm selection guidance
- Regular review of cryptographic implementations

### 9. Human Resources Security, Access Control Policies, and Asset Management

Manage people, access, and assets securely.

**Requirements:**
- Pre-employment screening and security checks
- Security responsibilities in employment contracts
- Departure procedures (access revocation)
- Role-based access control (RBAC)
- Privileged access management (PAM)
- Asset inventory and ownership
- Acceptable use policies

### 10. Multi-Factor Authentication, Secured Communications, and Emergency Communications

Deploy strong authentication and secure communication channels.

**Requirements:**
- MFA for all remote access and privileged accounts
- MFA for access to critical systems
- Continuous authentication where appropriate
- Encrypted communications (TLS 1.2+ minimum)
- Secure emergency communication channels
- Out-of-band communication capabilities
- Secure voice and video communications

---

## Incident Reporting Requirements

NIS2 introduces a **multi-stage incident reporting regime** for significant incidents. An incident is considered significant if it causes or is capable of causing:

- Severe operational disruption or financial loss
- Considerable material or non-material damage to other persons

### Reporting Timeline

| Stage | Deadline | Content |
|-------|----------|---------|
| **Early warning** | Within **24 hours** of becoming aware | Whether the incident is suspected of being caused by unlawful or malicious acts, whether it could have cross-border impact |
| **Incident notification** | Within **72 hours** of becoming aware | Update of early warning, initial assessment of severity and impact, indicators of compromise where applicable |
| **Intermediate report** | Upon CSIRT/authority request | Status update on incident handling and response |
| **Final report** | Within **1 month** of incident notification | Detailed description of the incident and its root cause, mitigation measures applied and ongoing, cross-border impact if applicable |

### Additional Requirements

- Entities must **inform recipients of their services** without undue delay if the significant incident is likely to adversely affect the provision of those services
- Member States may require entities to use specific platforms or templates
- CSIRTs must provide feedback and guidance within 24 hours of receiving early warning
- Active cyber threats must be reported to recipients of services along with remediation measures

---

## Management Accountability (Article 20)

NIS2 introduces **personal accountability for management bodies** — a significant departure from NIS1.

**Key requirements:**

1. **Approval and oversight**: Management bodies must approve cybersecurity risk management measures and oversee their implementation
2. **Liability**: Management bodies can be held liable for infringements of Article 21
3. **Training**: Members of management bodies must undergo cybersecurity training and encourage similar training for employees
4. **Sufficient knowledge**: Management bodies must have sufficient knowledge and skills to assess cybersecurity risks and management practices

**Consequences of non-compliance:**

- Member States may impose a **temporary prohibition** on natural persons holding management responsibilities at CEO or legal representative level in essential entities
- Administrative fines and other enforcement measures
- Personal liability for management body members who fail to comply

---

## Supply Chain Security Deep-Dive

Supply chain security is one of the most impactful new requirements under NIS2.

### Requirements

Entities must take into account:

1. **Vulnerabilities specific to each direct supplier and service provider**
2. **Overall quality of products and cybersecurity practices** of suppliers, including secure development procedures
3. **Results of coordinated security risk assessments** of critical supply chains (per Article 22)
4. **Supplier contractual arrangements** including:
   - Security requirements and certifications
   - Right to audit
   - Incident notification obligations
   - Sub-contractor security requirements

### Implementation Framework

**Tier 1 — Critical suppliers:**
- Full security assessment before onboarding
- Annual security audits or certification verification (ISO 27001, SOC 2)
- Real-time incident notification requirements
- Right to audit clauses
- Exit strategy and data portability requirements

**Tier 2 — Important suppliers:**
- Security questionnaire and self-assessment
- Periodic security review (biannual)
- Contractual security requirements
- Incident notification within 48 hours

**Tier 3 — Standard suppliers:**
- Basic security questionnaire
- Annual review of security posture
- Standard contractual security clauses

### Coordinated Risk Assessments (Article 22)

The NIS Cooperation Group may carry out coordinated risk assessments of critical supply chains, considering:

- Technical and non-technical risk factors
- Dependencies and potential points of failure
- Risks from non-EU influence on supply chains

---

## Penalties

### Administrative Fines

| Entity Type | Maximum Fine |
|------------|-------------|
| **Essential entities** | **€10,000,000** or **2% of total worldwide annual turnover**, whichever is higher |
| **Important entities** | **€7,000,000** or **1.4% of total worldwide annual turnover**, whichever is higher |

### Other Enforcement Measures

**For essential entities (Article 32):**
- Binding instructions
- Orders to implement security audit recommendations
- Orders to bring measures into compliance
- Temporary suspension of certifications or authorizations
- Temporary prohibition of management responsibilities for responsible natural persons

**For important entities (Article 33):**
- Binding instructions
- Orders to implement security audit recommendations
- Orders to bring measures into compliance
- Administrative fines

### Supervisory Regime Differences

| Aspect | Essential Entities | Important Entities |
|--------|-------------------|-------------------|
| **Supervision** | Ex-ante (proactive) | Ex-post (reactive/complaint-based) |
| **Audits** | Regular security audits | Audits when justified |
| **On-site inspections** | Yes | Upon reasonable request |
| **Management bans** | Yes (temporary) | No |

---

## NIS2 vs NIS1 Comparison

| Aspect | NIS1 (2016/1148) | NIS2 (2022/2555) |
|--------|-------------------|-------------------|
| **Scope** | 7 sectors, ~10K entities | 18 sectors, ~160K entities |
| **Entity classification** | OES and DSP | Essential and Important |
| **Security measures** | General requirements | 10 specific minimum measures |
| **Incident reporting** | No specific timeline | 24h / 72h / 1 month staged |
| **Management accountability** | Not specified | Mandatory training, personal liability |
| **Supply chain** | Not addressed | Explicit requirements |
| **Penalties** | Set by Member States | Harmonized: €10M/2% or €7M/1.4% |
| **Supervision** | Varied | Harmonized ex-ante/ex-post |
| **Peer review** | Limited | Enhanced peer review mechanism |
| **Vulnerability disclosure** | Not addressed | Coordinated vulnerability disclosure |
| **Size threshold** | Member State designation | Clear size-cap rules |
| **Enforcement** | Weak, inconsistent | Strong, harmonized |

---

## Infrastructure Security Checks

### DNS Security

- **DNSSEC implementation** is effectively mandatory for DNS service providers and TLD registries under NIS2
- Validate DNSSEC chain of trust for all zones
- Implement DNS monitoring and anomaly detection
- Consider DNS-over-HTTPS (DoH) or DNS-over-TLS (DoT) for internal resolution
- Monitor for DNS tunneling and exfiltration

### Network Monitoring and Segmentation

- Deploy network monitoring for anomaly detection (Article 21(2)(b))
- Implement network segmentation between critical and non-critical systems
- Monitor east-west traffic within data centers
- Deploy network-based intrusion detection/prevention systems
- Maintain network flow logs for forensic analysis

### Endpoint Detection and Response

- Deploy EDR solutions on all endpoints accessing critical systems
- Configure automated threat detection and response
- Maintain endpoint inventory with health status
- Implement application whitelisting for critical systems
- Regular endpoint compliance scanning

### MFA Enforcement (Article 21(2)(j))

- Deploy MFA for all remote access
- Enforce MFA for privileged accounts
- Implement MFA for access to critical systems and data
- Consider passwordless authentication where feasible
- Support hardware security keys (FIDO2/WebAuthn) for high-risk accounts

### Encryption Requirements

- TLS 1.2 minimum for all external communications; TLS 1.3 preferred
- Encrypt data at rest using AES-256 or equivalent
- Implement end-to-end encryption for sensitive communications
- Deploy certificate management and monitoring
- Regular cryptographic algorithm review

### Vulnerability Disclosure Coordination

- Establish a coordinated vulnerability disclosure (CVD) policy
- Designate a vulnerability disclosure contact
- Participate in ENISA's vulnerability database
- Implement responsible disclosure processes
- Track and remediate disclosed vulnerabilities within defined timelines

### Physical Security for Critical Infrastructure

- Physical access controls for data centers and critical facilities
- Environmental monitoring (temperature, humidity, water detection)
- Surveillance and intrusion detection systems
- Visitor management and escort procedures
- Physical security testing as part of overall resilience testing

---

## Tools

### NIS2 Scope Analyzer

Determines whether an organization falls within NIS2 scope and classifies it as Essential or Important.

```bash
# Analyze scope interactively
python scripts/nis2_scope_analyzer.py --sector energy --sub-sector electricity --employees 500 --turnover 100

# Full analysis with JSON output
python scripts/nis2_scope_analyzer.py --sector health --sub-sector healthcare_providers --employees 75 --turnover 15 --json

# Generate compliance checklist
python scripts/nis2_scope_analyzer.py --sector digital_infrastructure --sub-sector cloud_computing --employees 200 --turnover 50 --checklist

# Load from config file
python scripts/nis2_scope_analyzer.py --config organization.json --json --output scope_report.json
```

**Features:**
- Sector and sub-sector classification against Annex I and Annex II
- Size threshold evaluation (employees, turnover, balance sheet)
- Automatic inclusion detection (DNS providers, TLD registries, etc.)
- Entity type determination (Essential vs Important)
- Applicable obligations summary
- Compliance checklist generation

---

### NIS2 Compliance Checker

Assesses compliance against all 10 minimum security measures with per-measure scoring.

```bash
# Run full compliance check
python scripts/nis2_compliance_checker.py --config assessment.json

# Generate assessment template
python scripts/nis2_compliance_checker.py --template > assessment.json

# Check specific measures only
python scripts/nis2_compliance_checker.py --config assessment.json --measures 1 2 4 --json

# Generate gap analysis report
python scripts/nis2_compliance_checker.py --config assessment.json --output gap_report.json --json
```

**Features:**
- Assessment against all 10 Article 21 minimum measures
- Per-measure compliance scoring (0–100)
- Overall compliance score
- Incident reporting readiness validation
- Supply chain security assessment
- Management accountability verification
- Gap analysis with prioritized remediation recommendations

---

## Reference Guides

### [NIS2 Requirements Guide](references/nis2-requirements-guide.md)

Complete coverage of all 10 minimum security measures with implementation guidance, incident reporting procedures, management accountability requirements, supply chain security framework, and ISO 27001 control mapping.

### [NIS2 Implementation Playbook](references/nis2-implementation-playbook.md)

12-month implementation roadmap with resource requirements, policy templates, technical controls checklist, training requirements, and cost estimation framework.

---

## Clarify First

Before running the assessment, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Entity scope** — sector (Annex I vs Annex II), size thresholds, and any automatic-inclusion criteria (determines Essential vs Important classification and the obligation set)
- [ ] **Task** — scope determination, 10-measure compliance check, or supply-chain assessment (selects the tool and workflow)
- [ ] **Member State** — which national transposition applies (the tools assess the directive baseline, not country-specific law)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the assessment.

## Compliance Assessment Workflow

### Phase 1: Scope Determination

```
1. Identify sector and sub-sector classification
   → Use NIS2 Scope Analyzer tool
2. Determine entity size (employees, turnover, balance sheet)
3. Check for automatic inclusion criteria
4. Classify as Essential or Important entity
5. Identify applicable Member State transposition requirements
```

### Phase 2: Gap Assessment

```
1. Document current security posture
2. Map existing controls to NIS2 10 minimum measures
   → Use NIS2 Compliance Checker tool
3. Assess incident reporting readiness
4. Evaluate supply chain security maturity
5. Review management accountability compliance
6. Generate gap analysis report
```

### Phase 3: Remediation Planning

```
1. Prioritize gaps by risk and regulatory impact
2. Develop remediation roadmap (see Implementation Playbook)
3. Allocate budget and resources
4. Define project milestones and ownership
5. Establish governance structure
```

### Phase 4: Implementation

```
1. Implement technical controls
2. Develop and approve policies
3. Deploy monitoring and detection capabilities
4. Establish incident reporting procedures
5. Conduct supply chain security assessments
6. Train management body and staff
```

### Phase 5: Continuous Compliance

```
1. Regular compliance assessments (quarterly minimum)
2. Annual management body training refresh
3. Incident response exercises (biannual)
4. Supply chain security reviews (annual)
5. Policy review and update cycles
6. Audit preparation and execution
```

---

## NIS2 Implementation Roadmap

### 12-Month Plan

| Month | Phase | Key Activities |
|-------|-------|---------------|
| 1–2 | **Assessment** | Scope determination, gap analysis, current state documentation |
| 3–4 | **Planning** | Remediation roadmap, budget allocation, governance setup, quick wins |
| 5–6 | **Foundation** | Core policies, risk framework, asset inventory, management training |
| 7–8 | **Implementation** | Technical controls, monitoring deployment, incident response setup |
| 9–10 | **Supply Chain** | Supplier assessments, contractual updates, third-party risk program |
| 11 | **Testing** | Incident response exercises, penetration testing, compliance validation |
| 12 | **Operationalize** | Final audit, continuous monitoring, ongoing compliance program launch |

### Quick Wins (Month 1–3)

1. Enable MFA for all remote access and privileged accounts
2. Document existing security policies
3. Establish incident reporting contact with national CSIRT
4. Begin management body cybersecurity training
5. Create asset inventory of critical systems
6. Review and update backup procedures

### Resource Estimates

| Organization Size | FTE Requirement | Estimated Budget |
|-------------------|----------------|-----------------|
| Medium (50–249) | 1–2 dedicated + project team | €200K–€500K |
| Large (250–999) | 2–4 dedicated + project team | €500K–€1.5M |
| Enterprise (1000+) | 4–8 dedicated + project team | €1.5M–€5M+ |

---

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Scope Analyzer returns "out of scope" for an entity that should be in scope | Automatic inclusion criteria not triggered; size thresholds not met | Check for automatic inclusion flags (DNS providers, TLD registries, sole provider). Verify `--turnover` and `--employees` values. Use `--checklist` flag to review all criteria. |
| Compliance Checker scores are unexpectedly low | Assessment JSON has missing or null control responses | Run `--template` to regenerate a fresh assessment template. Ensure every control question has a boolean or score value. |
| Gap report does not cover all 10 measures | `--measures` flag is filtering output | Remove the `--measures` flag to assess all 10 Article 21 measures. Verify the config JSON includes all measure sections. |
| Entity classified as "Important" instead of "Essential" | Sector falls under Annex II rather than Annex I | Review sector/sub-sector classification. Annex I sectors produce Essential entities; Annex II sectors produce Important entities. Size also matters. |
| National transposition requirements unclear | Member State has not yet fully transposed NIS2 | As of early 2026, 13 of 27 EU Member States have incomplete transposition. Check the ECSO NIS2 Transposition Tracker for country-specific status. Apply the directive's baseline requirements. |
| Supply chain assessment section incomplete | Supplier tier classification not provided in config | Populate supplier data with tier levels (Critical/Important/Standard) and include contractual security requirements for each tier. |
| Incident reporting readiness score is zero | No incident handling controls documented in assessment | Complete Measure 2 (Incident Handling) controls in the assessment JSON, including detection capabilities, classification procedures, and CSIRT reporting integration. |

---

## Success Criteria

- All in-scope entities correctly classified as Essential or Important with documented rationale for the classification decision
- Compliance scores of 70% or higher across all 10 minimum security measures within the first assessment cycle, trending toward 90%+ within 12 months
- Incident reporting procedures tested and validated against the 24h/72h/1-month staged timeline, with documented CSIRT contact and reporting templates
- Management body members have completed mandatory cybersecurity training with documented attendance and knowledge assessment records
- Supply chain security program covers 100% of Tier 1 (critical) suppliers with quality agreements, right-to-audit clauses, and incident notification requirements in contracts
- Gap analysis produces a prioritized remediation roadmap with assigned owners, budgets, and milestone dates for every identified gap
- Quarterly compliance reassessments demonstrate measurable improvement with trending metrics reported to management

---

## Scope & Limitations

**In Scope:**
- NIS2 Directive (EU 2022/2555) compliance assessment and gap analysis
- Entity classification (Essential vs Important) per Annex I and Annex II
- All 10 Article 21 minimum security measures assessment
- Incident reporting readiness evaluation against the multi-stage reporting regime
- Supply chain security framework assessment (Tier 1/2/3 suppliers)
- Management accountability verification per Article 20
- Cross-framework mapping to ISO 27001 controls

**Out of Scope:**
- National transposition specifics (varies by Member State; the tools assess against the directive baseline, not country-specific implementing legislation)
- Technical penetration testing or vulnerability scanning (use infrastructure-compliance-auditor for technical checks)
- CER Directive (EU 2022/2557) physical resilience requirements (complementary but separate regulation)
- DORA (EU 2022/2554) requirements for financial sector entities (use dora-compliance-expert for lex specialis)
- Legal advice on penalty exposure or liability (consult qualified legal counsel)
- Real-time infrastructure monitoring or SIEM deployment

---

## Integration Points

| Skill | Integration |
|-------|------------|
| [information-security-manager-iso27001](../information-security-manager-iso27001/) | NIS2 measures map closely to ISO 27001 Annex A controls; use ISO 27001 ISMS as the implementation backbone for NIS2 compliance |
| [infrastructure-compliance-auditor](../infrastructure-compliance-auditor/) | Validate technical controls (DNS, TLS, MFA, encryption, monitoring) that satisfy NIS2 Article 21 requirements |
| [dora-compliance-expert](../dora-compliance-expert/) | DORA is lex specialis for financial sector entities; coordinate NIS2 and DORA assessments to avoid duplication |
| [nist-csf-specialist](../nist-csf-specialist/) | NIST CSF 2.0 functions map to NIS2 measures; use CSF maturity assessor to benchmark cybersecurity posture |
| [soc2-compliance-expert](../soc2-compliance-expert/) | SOC 2 Trust Services Criteria overlap significantly with NIS2 measures; leverage existing SOC 2 evidence |
| [isms-audit-expert](../isms-audit-expert/) | ISO 27001 audit evidence directly supports NIS2 compliance demonstrations |

---

## Tool Reference

### nis2_scope_analyzer.py

Determines NIS2 applicability and entity classification.

| Flag | Required | Description |
|------|----------|-------------|
| `--sector` | Yes (or `--config`) | Sector identifier (e.g., `energy`, `health`, `digital_infrastructure`) |
| `--sub-sector` | Yes (or `--config`) | Sub-sector identifier (e.g., `electricity`, `healthcare_providers`, `cloud_computing`) |
| `--employees` | Yes (or `--config`) | Number of employees in the organization |
| `--turnover` | Yes (or `--config`) | Annual turnover in millions of euros |
| `--config` | No | Path to organization JSON config file (alternative to individual flags) |
| `--json` | No | Output results in JSON format |
| `--checklist` | No | Generate a compliance checklist based on entity classification |
| `--output` | No | Path to write the output report file |

### nis2_compliance_checker.py

Assesses compliance against all 10 Article 21 minimum security measures.

| Flag | Required | Description |
|------|----------|-------------|
| `--config` | Yes (or `--template`) | Path to assessment JSON file with control responses |
| `--template` | No | Generate a blank assessment template (pipe to file with `>`) |
| `--measures` | No | Space-separated list of measure numbers to assess (e.g., `1 2 4`). Omit for all 10. |
| `--json` | No | Output results in JSON format |
| `--output` | No | Path to write the gap analysis report |

---

*Last Updated: March 2026*
*Directive Reference: EU 2022/2555*
*Applicable From: October 17, 2024 (Member State transposition deadline)*

---

## nist-csf-specialist

Source path: `references/ra-qm-team/nist-csf-specialist/SKILL.md`

# NIST CSF 2.0 Specialist

Implement, assess, and manage cybersecurity programs aligned with the NIST Cybersecurity Framework 2.0 — the definitive standard for organizational cybersecurity risk management. CSF 2.0 (Feb 2024) applies to all organizations and adds GOVERN as a sixth, top-level function alongside IDENTIFY, PROTECT, DETECT, RESPOND, and RECOVER.

## Core Capabilities

- **Maturity assessment** — score all 22 categories across 6 functions on the 1–4 tier scale (Partial → Risk Informed → Repeatable → Adaptive) with evidence-backed gap analysis
- **Profiles & gap analysis** — build current and target profiles, then derive a prioritized, phased remediation roadmap
- **Cross-framework mapping** — map CSF categories to ISO 27001:2022, SOC 2 TSC, HIPAA Security Rule, and PCI-DSS v4.0 to reduce dual-audit burden
- **Program implementation** — 12-month phased roadmap covering governance, core protections, detection/response, and resilience

## When to Use

Use this skill when you hear: "NIST cybersecurity framework", "CSF 2.0", "NIST compliance", "cybersecurity risk management", "NIST controls", "NIST assessment", "cybersecurity maturity", "NIST CSF profile", "cybersecurity governance", "cybersecurity program assessment", "CSF gap analysis", or "cross-framework compliance mapping".

## Clarify First

Before running the assessment, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Target tier** — Partial, Risk Informed, Repeatable, or Adaptive goal (drives the gap analysis and remediation roadmap)
- [ ] **Current-state data** — the present maturity scores across the 6 functions / 22 categories (the scoring depends on it)
- [ ] **Task** — maturity assessment, profile/gap analysis, or cross-framework mapping (selects the script and any target framework)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the maturity report.

## Quick Start

```bash
# Assess cybersecurity maturity against a target tier
python scripts/csf_maturity_assessor.py --input assessment.json --target-tier 3 --output maturity_report.json

# Map controls across frameworks
python scripts/csf_control_mapper.py --source-framework nist-csf --target-framework iso27001 --output mapping.json

# Generate a markdown gap analysis
python scripts/csf_maturity_assessor.py --input assessment.json --target-tier 4 --format markdown --output gap_analysis.md

# Build a multi-framework unified matrix
python scripts/csf_control_mapper.py --source-framework nist-csf --target-framework all --output unified_matrix.json
```

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/framework-reference.md](references/framework-reference.md)** — CSF 2.0 overview, the six functions with all categories (key activities, implementation guidance, maturity indicators), profiles, tiers, and the full cross-framework mapping tables (ISO 27001, SOC 2, HIPAA, PCI-DSS). Read when you need framework foundations or mapping detail.
- **[references/assessment-and-roadmap.md](references/assessment-and-roadmap.md)** — per-function assessment checklists, the 5-week maturity-assessment workflow, the 12-month implementation roadmap, validation checkpoints, and success criteria. Read when planning or running an engagement.
- **[references/tools-and-troubleshooting.md](references/tools-and-troubleshooting.md)** — detailed tool capabilities, input JSON format, full usage examples, flag reference tables, and the troubleshooting guide. Read when running the scripts or debugging output.
- **[references/csf-functions-guide.md](references/csf-functions-guide.md)** — complete CSF 2.0 taxonomy: every function, category, subcategory, evidence requirement, and common assessment question. Read for subcategory-level depth during detailed assessment.
- **[references/csf-implementation-playbook.md](references/csf-implementation-playbook.md)** — step-by-step implementation guide with templates, prioritization, and budgeting. Read when standing up or maturing a program.

## Scope & Limitations

**In Scope:**
- NIST CSF 2.0 maturity assessment across all 6 functions and 22 categories
- Current and target profile creation with gap analysis
- Cross-framework control mapping to ISO 27001:2022, SOC 2 TSC, HIPAA Security Rule, and PCI-DSS v4.0
- Implementation roadmap generation with phased milestones
- Tier-based scoring (Partial, Risk Informed, Repeatable, Adaptive)

**Out of Scope:**
- NIST SP 800-53 control-level implementation (CSF is a framework, not a control catalog; use SP 800-53 for prescriptive controls)
- Technical security testing, vulnerability scanning, or penetration testing (use infrastructure-compliance-auditor)
- Sector-specific Community Profiles (the tool provides organizational profiles; community profiles require sector-specific customization)
- Real-time security monitoring or SIEM configuration
- Compliance certification (NIST CSF is voluntary and does not offer formal certification)
- Legal or regulatory advice on specific compliance obligations

## Integration Points

| Skill | Integration |
|-------|------------|
| [soc2-compliance-expert](../soc2-compliance-expert/) | SOC 2 TSC maps directly to CSF functions; use the control mapper to generate a unified control matrix reducing dual-audit burden |
| [information-security-manager-iso27001](../information-security-manager-iso27001/) | ISO 27001 Annex A controls are the implementation backbone for CSF categories; CSF maturity scores inform ISMS continual improvement |
| [infrastructure-compliance-auditor](../infrastructure-compliance-auditor/) | Validates technical controls (access, encryption, monitoring, endpoints) that underpin PROTECT and DETECT function scores |
| [pci-dss-specialist](../pci-dss-specialist/) | PCI-DSS v4.0 requirements map to CSF categories; use cross-framework mapper for payment environments |
| [nis2-directive-specialist](../nis2-directive-specialist/) | NIS2 Article 21 measures align to CSF functions; CSF maturity assessment benchmarks NIS2 compliance posture |
| [dora-compliance-expert](../dora-compliance-expert/) | DORA ICT risk management pillars map to GOVERN and IDENTIFY functions; use CSF as the unifying assessment framework |

---

## pci-dss-specialist

Source path: `references/ra-qm-team/pci-dss-specialist/SKILL.md`

# PCI-DSS v4.0 Specialist

Implement, assess, and maintain compliance with the Payment Card Industry Data Security Standard version 4.0 — the global standard for protecting cardholder data in payment processing environments. Covers CDE scoping, SAQ/ROC selection, gap assessment against all 12 requirements, scope reduction (tokenization, P2PE, segmentation), and the future-dated v4.0 controls that became mandatory March 31, 2025.

## Core Capabilities

- **Compliance assessment** — score against all 12 PCI DSS v4.0 requirements, identify gaps, and prioritize remediation (`pci_compliance_checker.py`)
- **Scoping & SAQ selection** — map the cardholder data environment, classify connected and security-impacting systems, and determine the correct SAQ type or ROC requirement (`pci_scope_analyzer.py`)
- **Scope reduction** — tokenization, P2PE, network segmentation, and outsourced/iFrame processing to remove systems from scope
- **v4.0 readiness** — MFA for all CDE access, 12-char passwords, payment-page script controls (6.4.3/11.6.1), anti-phishing, automated log review, targeted risk analysis
- **Infrastructure controls** — network segmentation, TLS/DNS, endpoint/POS, cloud (AWS/Azure/GCP), container, and API security; encryption key lifecycle and DUKPT

## When to Use

Trigger on: "PCI DSS", "payment card security", "cardholder data", "PCI compliance", "payment security", "PCI assessment", "SAQ", "ROC", "QSA", "credit card security", "payment processing security", "tokenization", "CDE scoping", or "merchant level compliance".

## Clarify First

Before running the assessment or scoping, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Business model / payment flow** — how cards are accepted (e-commerce, terminal, P2PE, fully outsourced/iFrame) (determines the CDE scope and correct SAQ type)
- [ ] **Merchant / service-provider level** — annual transaction volume (sets the validation path: SAQ vs ROC)
- [ ] **CDE scope** — which systems store, process, or transmit cardholder data plus connected systems (drives which of the 12 requirements are in scope)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the report.

## Quick Start

```bash
# Check PCI compliance status (JSON report)
python scripts/pci_compliance_checker.py --input controls.json --output compliance_report.json

# Compliance gap report for stakeholders (Markdown)
python scripts/pci_compliance_checker.py --input controls.json --format markdown --output gap_report.md

# Determine SAQ type / analyze CDE scope
python scripts/pci_scope_analyzer.py --input business_model.json --output scope_report.json
python scripts/pci_scope_analyzer.py --input business_model.json --format markdown --output scope_analysis.md
```

Run `--requirements 3,4,7,8` to scope the checker to specific requirements. Full tool detail, input JSON formats, and flag reference live in the tools reference below.

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/requirements-and-changes.md](references/requirements-and-changes.md)** — PCI DSS overview, the 12 requirements deep-dive (objective + key sub-requirements + implementation guidance each), and the v4.0 changes / future-dated requirements summary. Read when implementing or explaining a requirement.
- **[references/pci-dss-requirements-guide.md](references/pci-dss-requirements-guide.md)** — tabular reference: every sub-requirement with testing procedures and v4.0 change status. Read when you need exact sub-requirement IDs or auditor testing procedures.
- **[references/scoping-and-assessment.md](references/scoping-and-assessment.md)** — CDE definition and system classification, scope reduction strategies, SAQ types + selection decision tree, assessment types (SAQ/ROC/AOC), and merchant/service-provider levels. Read when scoping or choosing a validation path.
- **[references/infrastructure-controls-and-roadmap.md](references/infrastructure-controls-and-roadmap.md)** — technical controls (segmentation, DNS/TLS, endpoint/POS, cloud, container, API, tokenization architecture, key management) and the 5-phase 12-month compliance roadmap. Read when building or planning the program.
- **[references/pci-infrastructure-security.md](references/pci-infrastructure-security.md)** — deep architecture: reference network diagrams, per-cloud build-outs, mPOS, e-commerce script controls, and Kubernetes manifests. Read when designing CDE infrastructure in detail.
- **[references/tools-validation-troubleshooting.md](references/tools-validation-troubleshooting.md)** — full tool capabilities, input JSON formats, CLI flag tables, validation checkpoints, troubleshooting table, and success criteria. Read when running the tools or validating an engagement.

## Scope & Limitations

**In Scope:**
- PCI DSS v4.0/v4.0.1 compliance assessment against all 12 requirements
- SAQ type determination based on business model and payment processing architecture
- CDE scoping with connected system and security-impacting system identification
- Technical control validation (encryption, access control, logging, network segmentation)
- Compliance scoring with per-requirement gap analysis and remediation priorities
- Scope reduction strategy recommendations (tokenization, segmentation, P2PE)

**Out of Scope:**
- Approved Scanning Vendor (ASV) vulnerability scans (requires PCI SSC-approved ASV vendor)
- Qualified Security Assessor (QSA) on-site assessment or Report on Compliance (ROC) generation
- Payment application security validation (PA-DSS / PCI SSF scope)
- PIN Transaction Security (PTS) device certification
- Card brand-specific program requirements (Visa, Mastercard, Amex each have additional program rules)
- Legal advice on contractual obligations with acquiring banks or card brands
- Real-time transaction monitoring or fraud detection

## Integration Points

| Skill | Integration |
|-------|------------|
| [infrastructure-compliance-auditor](../infrastructure-compliance-auditor/) | Validates network segmentation, TLS configuration, endpoint security, and logging controls that satisfy PCI DSS Requirements 1, 2, 4, 10, 11 |
| [nist-csf-specialist](../nist-csf-specialist/) | CSF functions map to PCI DSS requirements; use the control mapper to build unified control matrices for dual-compliance programs |
| [soc2-compliance-expert](../soc2-compliance-expert/) | SOC 2 CC6 (access), CC7 (operations), CC8 (change management) overlap significantly with PCI DSS; leverage shared evidence |
| [information-security-manager-iso27001](../information-security-manager-iso27001/) | ISO 27001 Annex A controls provide a management system framework supporting PCI DSS compliance |
| [nis2-directive-specialist](../nis2-directive-specialist/) | EU entities subject to both NIS2 and PCI DSS can map shared controls (encryption, incident response, access control) |

---

## qms-audit-expert

Source path: `references/ra-qm-team/qms-audit-expert/SKILL.md`

# QMS Audit Expert

ISO 13485 internal audit methodology for medical device quality management systems.

---

## Table of Contents

- [Audit Planning Workflow](#audit-planning-workflow)
- [Audit Execution](#audit-execution)
- [Nonconformity Management](#nonconformity-management)
- [External Audit Preparation](#external-audit-preparation)
- [Reference Documentation](#reference-documentation)
- [Tools](#tools)

---

## Clarify First

Before planning or executing the audit, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Audit purpose** — internal scheduled audit, external/certification prep, or mock audit (sets the scope and formality)
- [ ] **Processes/clauses in scope** — which ISO 13485 clauses (drives the checklist and frequency)
- [ ] **Risk level and prior findings per process** — picks audit frequency and sample size

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the audit plan.

## Audit Planning Workflow

Plan risk-based internal audit program:

1. List all QMS processes requiring audit
2. Assign risk level to each process (High/Medium/Low)
3. Review previous audit findings and trends
4. Determine audit frequency by risk level
5. Assign qualified auditors (verify independence)
6. Create annual audit schedule
7. Communicate schedule to process owners
8. **Validation:** All ISO 13485 clauses covered within cycle

### Risk-Based Audit Frequency

| Risk Level | Frequency | Criteria |
|------------|-----------|----------|
| High | Quarterly | Design control, CAPA, production validation |
| Medium | Semi-annual | Purchasing, training, document control |
| Low | Annual | Infrastructure, management review (if stable) |

### Audit Scope by Clause

| Clause | Process | Focus Areas |
|--------|---------|-------------|
| 4.2 | Document Control | Document approval, distribution, obsolete control |
| 5.6 | Management Review | Inputs complete, decisions documented, actions tracked |
| 6.2 | Training | Competency defined, records complete, effectiveness verified |
| 7.3 | Design Control | Inputs, reviews, V&V, transfer, changes |
| 7.4 | Purchasing | Supplier evaluation, incoming inspection |
| 7.5 | Production | Work instructions, process validation, DHR |
| 7.6 | Calibration | Equipment list, calibration status, out-of-tolerance |
| 8.2.2 | Internal Audit | Schedule compliance, auditor independence |
| 8.3 | NC Product | Identification, segregation, disposition |
| 8.5 | CAPA | Root cause, implementation, effectiveness |

### Auditor Independence

Verify auditor independence before assignment:

- [ ] Auditor not responsible for area being audited
- [ ] No direct reporting relationship to auditee
- [ ] Not involved in recent activities under audit
- [ ] Documented qualification for audit scope

---

## Audit Execution

Conduct systematic internal audit:

1. Prepare audit plan (scope, criteria, schedule)
2. Review relevant documentation before audit
3. Conduct opening meeting with auditee
4. Collect evidence (records, interviews, observation)
5. Classify findings (Major/Minor/Observation)
6. Conduct closing meeting with preliminary findings
7. Prepare audit report within 5 business days
8. **Validation:** All scope items covered, findings supported by evidence

### Evidence Collection

| Method | Use For | Documentation |
|--------|---------|---------------|
| Document review | Procedures, records | Document number, version, date |
| Interview | Process understanding | Interviewee name, role, summary |
| Observation | Actual practice | What, where, when observed |
| Record trace | Process flow | Record IDs, dates, linkage |

### Audit Questions by Clause

**Document Control (4.2):**
- Show me the document master list
- How do you control obsolete documents?
- Show me evidence of document change approval

**Design Control (7.3):**
- Show me the Design History File for [product]
- Who participates in design reviews?
- Show me design input to output traceability

**CAPA (8.5):**
- Show me the CAPA log with open items
- How do you determine root cause?
- Show me effectiveness verification records

See `references/iso13485-audit-guide.md` for complete question sets.

### Finding Documentation

Document each finding with:

```
Requirement: [Specific ISO 13485 clause or procedure]
Evidence: [What was observed, reviewed, or heard]
Gap: [How evidence fails to meet requirement]
```

**Example:**
```
Requirement: ISO 13485:2016 Clause 7.6 requires calibration
at specified intervals.

Evidence: Calibration records for pH meter (EQ-042) show
last calibration 2024-01-15. Calibration interval is
12 months. Today is 2025-03-20.

Gap: Equipment is 2 months overdue for calibration,
representing a gap in calibration program execution.
```

---

## Nonconformity Management

Classify and manage audit findings:

1. Evaluate finding against classification criteria
2. Assign severity (Major/Minor/Observation)
3. Document finding with objective evidence
4. Communicate to process owner
5. Initiate CAPA for Major/Minor findings
6. Track to closure
7. Verify effectiveness at follow-up
8. **Validation:** Finding closed only after effective CAPA

### Classification Criteria

| Category | Definition | CAPA Required | Timeline |
|----------|------------|---------------|----------|
| Major | Systematic failure or absence of element | Yes | 30 days |
| Minor | Isolated lapse or partial implementation | Recommended | 60 days |
| Observation | Improvement opportunity | Optional | As appropriate |

### Classification Decision

```
Is required element absent or failed?
├── Yes → Systematic (multiple instances)? → MAJOR
│   └── No → Could affect product safety? → MAJOR
│       └── No → MINOR
└── No → Deviation from procedure?
    ├── Yes → Recurring? → MAJOR
    │   └── No → MINOR
    └── No → Improvement opportunity? → OBSERVATION
```

### CAPA Integration

| Finding Severity | CAPA Depth | Verification |
|------------------|------------|--------------|
| Major | Full root cause analysis (5-Why, Fishbone) | Next audit or within 6 months |
| Minor | Immediate cause identification | Next scheduled audit |
| Observation | Not required | Noted at next audit |

See `references/nonconformity-classification.md` for detailed guidance.

---

## External Audit Preparation

Prepare for certification body or regulatory audit:

1. Complete all scheduled internal audits
2. Verify all findings closed with effective CAPA
3. Review documentation for currency and accuracy
4. Conduct management review with audit as input
5. Prepare facility and personnel
6. Conduct mock audit (full scope)
7. Brief personnel on audit protocol
8. **Validation:** Mock audit findings addressed before external audit

### Pre-Audit Readiness Checklist

**Documentation:**
- [ ] Quality Manual current
- [ ] Procedures reflect actual practice
- [ ] Records complete and retrievable
- [ ] Previous audit findings closed

**Personnel:**
- [ ] Key personnel available during audit
- [ ] Subject matter experts identified
- [ ] Personnel briefed on audit protocol
- [ ] Escorts assigned

**Facility:**
- [ ] Work areas organized
- [ ] Documents at point of use current
- [ ] Equipment calibration status visible
- [ ] Nonconforming product segregated

### Mock Audit Protocol

1. Use external auditor or qualified internal auditor
2. Cover full scope of upcoming external audit
3. Simulate actual audit conditions (timing, formality)
4. Document findings as for real audit
5. Address all Major and Minor findings before external audit
6. Brief management on readiness status

---

## Reference Documentation

### ISO 13485 Audit Guide

`references/iso13485-audit-guide.md` contains:

- Clause-by-clause audit methodology
- Sample audit questions for each clause
- Evidence collection requirements
- Common nonconformities by clause
- Finding severity classification

### Nonconformity Classification

`references/nonconformity-classification.md` contains:

- Severity classification criteria and decision tree
- Impact vs. occurrence matrix
- CAPA integration requirements
- Finding documentation templates
- Closure requirements by severity

---

## Tools

### Audit Schedule Optimizer

```bash
# Generate optimized audit schedule
python scripts/audit_schedule_optimizer.py --processes processes.json

# Interactive mode
python scripts/audit_schedule_optimizer.py --interactive

# JSON output for integration
python scripts/audit_schedule_optimizer.py --processes processes.json --output json
```

Generates risk-based audit schedule considering:
- Process risk level
- Previous findings
- Days since last audit
- Criticality scores

**Output includes:**
- Prioritized audit schedule
- Quarterly distribution
- Overdue audit alerts
- Resource recommendations

### Sample Process Input

```json
{
  "processes": [
    {
      "name": "Design Control",
      "iso_clause": "7.3",
      "risk_level": "HIGH",
      "last_audit_date": "2024-06-15",
      "previous_findings": 2
    },
    {
      "name": "Document Control",
      "iso_clause": "4.2",
      "risk_level": "MEDIUM",
      "last_audit_date": "2024-09-01",
      "previous_findings": 0
    }
  ]
}
```

---

## Audit Program Metrics

Track audit program effectiveness:

| Metric | Target | Measurement |
|--------|--------|-------------|
| Schedule compliance | >90% | Audits completed on time |
| Finding closure rate | >95% | Findings closed by due date |
| Repeat findings | <10% | Same finding in consecutive audits |
| CAPA effectiveness | >90% | Verified effective at follow-up |
| Auditor utilization | 4 days/month | Audit days per qualified auditor |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Schedule optimizer produces no audits for a process | `last_audit_date` is recent and risk level is Low | Low-risk processes are scheduled annually. If the last audit was within 365 days, no new audit is generated. Increase `risk_level` or `criticality_score` to trigger earlier scheduling. |
| Optimizer flags all processes as overdue | Date format in `processes.json` is incorrect | Use ISO 8601 format (`YYYY-MM-DD`) for `last_audit_date`. Invalid dates cause the tool to treat the last audit as missing. |
| Interactive mode does not accept input | Terminal does not support stdin prompts | Use file-based input with `--processes processes.json` instead of `--interactive`. |
| Audit schedule does not cover all ISO 13485 clauses | Input process list is incomplete | The optimizer schedules only the processes provided. Ensure all required clauses (4.2, 5.6, 6.2, 7.3, 7.4, 7.5, 7.6, 8.2.2, 8.3, 8.5) are represented in the input. |
| Finding classified as Minor but should be Major | Classification was applied inconsistently | Apply the decision tree: systematic failure or absent element = Major; isolated lapse = Minor. Consider whether the finding could affect product safety (auto-escalate to Major). |
| External auditor raises finding already closed internally | CAPA effectiveness verification not completed before external audit | Ensure all internal audit findings have completed CAPA with documented effectiveness verification before the external audit date. Close the loop, do not just complete the action. |
| Audit report rejected by process owner | Findings not supported by objective evidence | Every finding must reference specific evidence (document number, record ID, observation details). Rework findings using the Requirement-Evidence-Gap format documented in this skill. |

---

## Success Criteria

- Annual audit schedule covers 100% of ISO 13485 clauses with risk-based frequency (quarterly for high-risk, semi-annual for medium, annual for low)
- Schedule compliance rate exceeds 90% (audits completed on time vs. planned)
- All Major findings result in full root cause analysis CAPA initiated within 30 days and verified effective within 6 months
- Finding closure rate exceeds 95% by due date, with no overdue Major findings at any point
- Repeat finding rate below 10% across consecutive audit cycles, demonstrating effective corrective actions
- Auditor independence verified and documented for every audit assignment (no self-auditing of own work area)
- Mock audit conducted before every external certification or surveillance audit with all Major and Minor findings resolved

---

## Scope & Limitations

**In Scope:**
- ISO 13485:2016 internal audit planning, scheduling, and execution
- Risk-based audit frequency optimization
- Nonconformity classification (Major/Minor/Observation) with decision tree
- CAPA integration for audit findings
- External audit preparation and mock audit protocols
- Audit program metrics and effectiveness tracking

**Out of Scope:**
- External audit execution (this skill supports preparation for and response to external audits, not conducting them)
- Regulatory inspection management (FDA, Notified Body inspections have jurisdiction-specific protocols beyond internal audit scope)
- Detailed CAPA root cause analysis methodology (use capa-officer skill for 5-Why, Fishbone, FTA, FMEA)
- ISO 19011 auditor certification or training program administration
- Technical product testing or process validation
- QMSR-specific audit checklist generation (use quality-manager-qms-iso13485 for QMSR gap analysis)

---

## Integration Points

| Skill | Integration |
|-------|------------|
| [quality-manager-qms-iso13485](../quality-manager-qms-iso13485/) | Provides the QMS process framework that the audit program evaluates; audit results feed into management review inputs |
| [capa-officer](../capa-officer/) | Major and Minor audit findings trigger CAPA initiation; CAPA effectiveness verification closes the audit finding loop |
| [quality-documentation-manager](../quality-documentation-manager/) | Document control audit coverage (Clause 4.2) validates document numbering, approval workflows, and Part 11 compliance |
| [quality-manager-qmr](../quality-manager-qmr/) | Audit program results are a required management review input (Clause 5.6.2); QMR oversees audit program effectiveness |
| [risk-management-specialist](../risk-management-specialist/) | Risk management process audit (Clause 7.1) verifies ISO 14971 implementation and risk file completeness |

---

## Tool Reference

### audit_schedule_optimizer.py

Generates risk-based audit schedules optimized by process risk, findings history, and time since last audit.

| Flag | Required | Description |
|------|----------|-------------|
| `--processes` | Yes (or `--interactive`) | Path to JSON file containing process definitions with `name`, `iso_clause`, `risk_level` (HIGH/MEDIUM/LOW), `last_audit_date`, `previous_findings`, and `criticality_score` |
| `--interactive` | No | Launch interactive mode for guided process entry (alternative to file input) |
| `--output` | No | Output format: `json` for structured output, omit for human-readable text |

---

## quality-documentation-manager

Source path: `references/ra-qm-team/quality-documentation-manager/SKILL.md`

# Quality Documentation Manager

Document control system design and management for ISO 13485-compliant quality management systems, including numbering conventions, approval workflows, change control, and electronic record compliance.

---

## Table of Contents

- [Document Control Workflow](#document-control-workflow)
- [Document Numbering System](#document-numbering-system)
- [Approval and Review Process](#approval-and-review-process)
- [Change Control Process](#change-control-process)
- [21 CFR Part 11 Compliance](#21-cfr-part-11-compliance)
- [Reference Documentation](#reference-documentation)
- [Tools](#tools)

---

## Clarify First

Before setting up document control or validating a document, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Document type** — QM, SOP, WI, TF, SPEC, or PLN (sets the required reviewers, approvers, and numbering)
- [ ] **Regulatory scope** — ISO 13485 only vs 21 CFR Part 11 electronic records (determines whether audit-trail and e-signature controls are required)
- [ ] **Change classification** — administrative, minor, major, or emergency (sets the approval path and impact assessment)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the document.

## Document Control Workflow

Implement document control from creation through obsolescence:

1. Assign document number per numbering procedure
2. Create document using controlled template
3. Route for review to required reviewers
4. Address review comments and document responses
5. Obtain required approval signatures
6. Assign effective date and distribute
7. Update Document Master List
8. **Validation:** Document accessible at point of use; obsolete versions removed

### Document Lifecycle Stages

| Stage | Definition | Actions Required |
|-------|------------|------------------|
| Draft | Under creation or revision | Author editing, not for use |
| Review | Circulated for review | Reviewers provide feedback |
| Approved | All signatures obtained | Ready for training/distribution |
| Effective | Training complete, released | Available for use |
| Superseded | Replaced by newer revision | Remove from active use |
| Obsolete | No longer applicable | Archive per retention schedule |

### Document Types and Prefixes

| Prefix | Document Type | Typical Content |
|--------|---------------|-----------------|
| QM | Quality Manual | QMS overview, scope, policy |
| SOP | Standard Operating Procedure | Process-level procedures |
| WI | Work Instruction | Task-level step-by-step |
| TF | Template/Form | Controlled forms |
| SPEC | Specification | Product/process specs |
| PLN | Plan | Quality/project plans |

### Required Reviewers by Document Type

| Document Type | Required Reviewers | Required Approvers |
|---------------|-------------------|-------------------|
| SOP | Process Owner, QA | QA Manager, Process Owner |
| WI | Area Supervisor, QA | Area Manager |
| SPEC | Engineering, QA | Engineering Manager, QA |
| TF | Process Owner | QA |
| Design Documents | Design Team, QA | Design Control Authority |

---

## Document Numbering System

Assign consistent document numbers for identification and retrieval.

### Numbering Format

Standard format: `PREFIX-CATEGORY-SEQUENCE[-REVISION]`

```
Example: SOP-02-001-A

SOP = Document type (Standard Operating Procedure)
02  = Category code (Document Control)
001 = Sequential number
A   = Revision indicator
```

### Category Codes

| Code | Functional Area | Description |
|------|-----------------|-------------|
| 01 | Quality Management | QMS procedures, management review |
| 02 | Document Control | This area |
| 03 | Human Resources | Training, competency |
| 04 | Design & Development | Design control processes |
| 05 | Purchasing | Supplier management |
| 06 | Production | Manufacturing procedures |
| 07 | Quality Control | Inspection, testing |
| 08 | CAPA | Corrective/preventive actions |
| 09 | Risk Management | ISO 14971 processes |
| 10 | Regulatory Affairs | Submissions, compliance |

### Numbering Workflow

1. Author requests document number from Document Control
2. Document Control verifies category assignment
3. Document Control assigns next available sequence number
4. Number recorded in Document Master List
5. Author creates document using assigned number
6. **Validation:** Number format matches standard; no duplicates in Master List

### Revision Designation

| Change Type | Revision Increment | Example |
|-------------|-------------------|---------|
| Major revision | Increment number | Rev 01 → Rev 02 |
| Minor revision | Increment sub-revision | Rev 01 → Rev 01.1 |
| Administrative | No change or letter suffix | Rev 01 → Rev 01a |

See `references/document-control-procedures.md` for complete numbering guidance.

---

## Approval and Review Process

Obtain required reviews and approvals before document release.

### Review Workflow

1. Author completes document draft
2. Author submits for review via routing form or DMS
3. Reviewers assigned based on document type
4. Reviewers provide comments within review period (5-10 business days)
5. Author addresses comments and documents responses
6. Author resubmits revised document
7. Approvers sign and date
8. **Validation:** All required reviewers completed; all comments addressed with documented disposition

### Comment Disposition

| Disposition | Action Required |
|-------------|-----------------|
| Accept | Incorporate comment as written |
| Accept with modification | Incorporate with changes, document rationale |
| Reject | Do not incorporate, document justification |
| Defer | Address in future revision, document reason |

### Approval Matrix

```
Document Level 1 (Policy/QM): CEO or delegate + QA Manager
Document Level 2 (SOP): Department Manager + QA Manager
Document Level 3 (WI/TF): Area Supervisor + QA Representative
```

### Signature Requirements

| Element | Requirement |
|---------|-------------|
| Name | Printed name of signer |
| Signature | Handwritten or electronic signature |
| Date | Date signature applied |
| Role | Function/role of signer |

---

## Change Control Process

Manage document changes systematically through review and approval.

### Change Control Workflow

1. Identify need for document change
2. Complete Change Request Form with justification
3. Document Control assigns change number and logs request
4. Route to reviewers for impact assessment
5. Obtain approvals based on change classification
6. Author implements approved changes
7. Update revision number and change history
8. **Validation:** Changes match approved scope; change history complete

### Change Classification

| Class | Definition | Approval Level | Examples |
|-------|------------|----------------|----------|
| Administrative | No content impact | Document Control | Typos, formatting |
| Minor | Limited content change | Process Owner + QA | Clarifications |
| Major | Significant content change | Full review cycle | New requirements |
| Emergency | Urgent safety/compliance | Expedited + retrospective | Safety issues |

### Impact Assessment Checklist

| Impact Area | Assessment Questions |
|-------------|---------------------|
| Training | Does change require retraining? |
| Equipment | Does change affect equipment or systems? |
| Validation | Does change require revalidation? |
| Regulatory | Does change affect regulatory filings? |
| Other Documents | Which related documents need updating? |
| Records | What records are affected? |

### Change History Documentation

Each document must include change history:

```
| Revision | Date | Description | Author | Approver |
|----------|------|-------------|--------|----------|
| 01 | 2023-01-15 | Initial release | J. Smith | M. Jones |
| 02 | 2024-03-01 | Updated workflow | J. Smith | M. Jones |
```

---

## 21 CFR Part 11 Compliance

Implement electronic record and signature controls for FDA compliance.

### Part 11 Scope

| Applies To | Does Not Apply To |
|------------|-------------------|
| Records required by FDA regulations | Paper records |
| Records submitted to FDA | Internal non-regulated documents |
| Electronic signatures on required records | General email communication |

### Electronic Record Controls

1. Validate system for accuracy and reliability
2. Implement secure audit trail for all changes
3. Restrict system access to authorized individuals
4. Generate accurate copies in human-readable format
5. Protect records throughout retention period
6. **Validation:** Audit trail captures who, what, when for all changes

### Audit Trail Requirements

| Requirement | Implementation |
|-------------|----------------|
| Secure | Cannot be modified by users |
| Computer-generated | System creates automatically |
| Time-stamped | Date and time of each action |
| Original values | Previous values retained |
| User identity | Who made each change |

### Electronic Signature Requirements

| Requirement | Implementation |
|-------------|----------------|
| Unique to individual | Not shared between persons |
| At least 2 components | User ID + password minimum |
| Signature manifestation | Name, date/time, meaning displayed |
| Linked to record | Cannot be excised or copied |

### Signature Manifestation

Every electronic signature must display:

| Element | Example |
|---------|---------|
| Printed name | John Smith |
| Date and time | 2024-03-15 14:32:05 EST |
| Meaning | Approved for Release |

### System Controls Checklist

**Access Controls:**
- [ ] Unique user ID for each person
- [ ] Password complexity enforced
- [ ] Account lockout after failed attempts
- [ ] Session timeout after inactivity

**Audit Trail:**
- [ ] All record creation logged
- [ ] All modifications logged with old/new values
- [ ] User identity captured
- [ ] Date/time stamp on all entries

**Security:**
- [ ] Role-based access control
- [ ] Encryption for data at rest and in transit
- [ ] Regular backup and tested recovery

See `references/21cfr11-compliance-guide.md` for detailed compliance requirements.

---

## Reference Documentation

### Document Control Procedures

`references/document-control-procedures.md` contains:

- Document numbering system and format
- Document lifecycle stages and transitions
- Review and approval workflow details
- Change control process with classification criteria
- Distribution and access control methods
- Record retention periods and disposal procedures
- Document Master List requirements

### 21 CFR Part 11 Compliance Guide

`references/21cfr11-compliance-guide.md` contains:

- Part 11 scope and applicability
- Electronic record requirements (§11.10)
- Electronic signature requirements (§11.50, 11.100, 11.200)
- System control specifications
- Validation approach and documentation
- Compliance checklist and gap assessment template
- Common FDA deficiencies and prevention

---

## Tools

### Document Validator

```bash
# Validate document metadata
python scripts/document_validator.py --doc document.json

# Interactive validation mode
python scripts/document_validator.py --interactive

# JSON output for integration
python scripts/document_validator.py --doc document.json --output json

# Generate sample document JSON
python scripts/document_validator.py --sample > sample_doc.json
```

Validates:
- Document numbering convention compliance
- Title and status requirements
- Date validation (effective, review due)
- Approval requirements by document type
- Change history completeness
- 21 CFR Part 11 controls (audit trail, signatures)

### Sample Document Input

```json
{
  "number": "SOP-02-001",
  "title": "Document Control Procedure",
  "doc_type": "SOP",
  "revision": "03",
  "status": "Effective",
  "effective_date": "2024-01-15",
  "review_date": "2025-01-15",
  "author": "J. Smith",
  "approver": "M. Jones",
  "change_history": [
    {"revision": "01", "date": "2022-01-01", "description": "Initial release"},
    {"revision": "02", "date": "2023-01-15", "description": "Updated workflow"},
    {"revision": "03", "date": "2024-01-15", "description": "Added e-signature requirements"}
  ],
  "has_audit_trail": true,
  "has_electronic_signature": true,
  "signature_components": 2
}
```

---

## Document Control Metrics

Track document control system performance.

### Key Performance Indicators

| Metric | Target | Calculation |
|--------|--------|-------------|
| Document cycle time | <30 days | Average days from draft to effective |
| Review completion rate | >95% | Reviews completed on time / Total reviews |
| Change request backlog | <10 | Open change requests at month end |
| Overdue review rate | <5% | Documents past review date / Total effective |
| Audit finding rate | <2 per audit | Document control findings per internal audit |

### Periodic Review Schedule

| Document Type | Review Frequency |
|---------------|------------------|
| Policy | Every 3 years |
| SOP | Every 2 years |
| WI | Every 2 years |
| Specifications | As needed or with product changes |
| Forms/Templates | Every 3 years |

---

## Regulatory Requirements

### ISO 13485:2016 Clause 4.2

| Sub-clause | Requirement |
|------------|-------------|
| 4.2.1 | Quality management system documentation |
| 4.2.2 | Quality manual |
| 4.2.3 | Medical device file (technical documentation) |
| 4.2.4 | Control of documents |
| 4.2.5 | Control of records |

### FDA 21 CFR 820

| Section | Requirement |
|---------|-------------|
| 820.40 | Document controls |
| 820.180 | General record requirements |
| 820.181 | Device master record |
| 820.184 | Device history record |
| 820.186 | Quality system record |

### Common Audit Findings

| Finding | Prevention |
|---------|------------|
| Obsolete documents in use | Implement distribution control |
| Missing approval signatures | Enforce workflow before release |
| Incomplete change history | Require history update with each revision |
| No periodic review schedule | Establish and enforce review calendar |
| Inadequate audit trail | Validate DMS for Part 11 compliance |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Document validator reports "invalid numbering format" | Document number does not match the `PREFIX-CATEGORY-SEQUENCE` pattern | Ensure the number follows the format `SOP-02-001` (type prefix, 2-digit category code, 3-digit sequence). Check that the prefix matches a recognized document type (QM, SOP, WI, TF, SPEC, PLN). |
| Validation flags missing approver despite having signatures | `approver` field is null or empty in the input JSON | Populate the `approver` field with the name of the approving authority. For SOPs, both Process Owner and QA Manager are required. |
| Review date validation fails for a current document | `review_date` is in the past | Update the review date to reflect the next scheduled review. Documents past their review date should be flagged for periodic review and re-approval. |
| Change history marked incomplete | Not all revisions have entries in the `change_history` array | Every revision increment must have a corresponding change history entry with revision number, date, description, and author. Fill gaps in the history. |
| Part 11 controls flagged despite using an eDMS | `has_audit_trail` or `has_electronic_signature` set to false | Set both to `true` and ensure `signature_components` is at least 2 (user ID + password minimum per Part 11). Verify the eDMS produces computer-generated, timestamped audit trails. |
| Interactive mode does not display all validation rules | Terminal width too narrow for table output | Widen the terminal window or use `--output json` for structured output that is not affected by display width. |
| Obsolete documents still appearing as "Effective" | Status field not updated during revision cycle | When a new revision is released, update the prior revision's status to "Superseded" and ensure it is removed from points of use. Run the validator against the superseded document to confirm. |

---

## Success Criteria

- Document numbering system enforced with zero duplicate numbers in the Document Master List and 100% format compliance
- Document cycle time (draft to effective) averages less than 30 business days across all document types
- Review completion rate exceeds 95% (reviews completed on time vs. total reviews initiated)
- Overdue periodic review rate below 5% of total effective documents at any point
- 21 CFR Part 11 compliance verified for all electronic records: audit trails capture who/what/when for every change, electronic signatures include printed name, date/time, and meaning
- Change control process handles 100% of document changes through the classification workflow (Administrative/Minor/Major/Emergency) with documented impact assessments
- Zero external audit findings related to document control in the most recent certification or surveillance audit

---

## Scope & Limitations

**In Scope:**
- Document numbering convention design and validation
- Document lifecycle management (Draft through Obsolete)
- Review and approval workflow enforcement
- Change control process with classification and impact assessment
- 21 CFR Part 11 electronic record and electronic signature compliance validation
- Periodic review schedule management
- Document Master List maintenance

**Out of Scope:**
- eDMS software selection, implementation, or validation (the tool validates metadata, not the DMS platform itself)
- EU Annex 11 computerized system validation (complementary to Part 11 but requires separate assessment approach)
- Technical file / Design History File content creation (use regulatory-affairs-head for technical documentation)
- Record retention schedule creation (the tool validates dates but does not determine regulatory retention periods)
- Physical document distribution or archival logistics
- Training record management (the tool validates training-related documents but does not manage training programs)

---

## Integration Points

| Skill | Integration |
|-------|------------|
| [quality-manager-qms-iso13485](../quality-manager-qms-iso13485/) | Document control (Clause 4.2.3) and record control (Clause 4.2.4) are core QMS processes; the validator enforces ISO 13485 documentation requirements |
| [qms-audit-expert](../qms-audit-expert/) | Internal audits of Clause 4.2 verify document control effectiveness; audit findings drive document process improvements |
| [quality-manager-qmr](../quality-manager-qmr/) | Document control metrics (cycle time, overdue reviews, backlog) are reported to management review as QMS performance indicators |
| [fda-consultant-specialist](../fda-consultant-specialist/) | FDA QMSR (effective Feb 2026) incorporates ISO 13485 Clause 4.2 by reference; Part 11 compliance remains a separate FDA requirement for electronic records |
| [capa-officer](../capa-officer/) | CAPA actions frequently require document revisions; the change control process tracks CAPA-driven document changes |

---

## Tool Reference

### document_validator.py

Validates document metadata, numbering conventions, and regulatory control requirements.

| Flag | Required | Description |
|------|----------|-------------|
| `--doc` | Yes (or `--interactive` or `--sample`) | Path to document metadata JSON file containing number, title, type, revision, status, dates, approvers, change history, and Part 11 fields |
| `--interactive` | No | Launch interactive validation mode for guided document entry |
| `--output` | No | Output format: `json` for structured output with severity-rated findings, omit for human-readable text |
| `--sample` | No | Generate a sample document JSON template (pipe to file with `> sample_doc.json`) |

---

## quality-manager-qmr

Source path: `references/ra-qm-team/quality-manager-qmr/SKILL.md`

# Senior Quality Manager Responsible Person (QMR)

Quality system accountability, management review leadership, and regulatory compliance oversight per ISO 13485 Clause 5.5.2 requirements.

---

## QMR Responsibilities

### ISO 13485 Clause 5.5.2 Requirements

| Responsibility | Scope | Evidence |
|----------------|-------|----------|
| QMS effectiveness | Monitor system performance and suitability | Management review records |
| Reporting to management | Communicate QMS performance to top management | Quality reports, dashboards |
| Quality awareness | Promote regulatory and quality requirements | Training records, communications |
| Liaison with external parties | Interface with regulators, Notified Bodies | Meeting records, correspondence |

### QMR Accountability Matrix

| Domain | Accountable For | Reports To | Frequency |
|--------|-----------------|------------|-----------|
| Quality Policy | Policy adequacy and communication | CEO/Board | Annual review |
| Quality Objectives | Objective achievement and relevance | Executive Team | Quarterly |
| QMS Performance | System effectiveness metrics | Management | Monthly |
| Regulatory Compliance | Compliance status across jurisdictions | CEO | Quarterly |
| Audit Program | Audit schedule completion, findings closure | Management | Per audit |
| CAPA Oversight | CAPA effectiveness and timeliness | Executive Team | Monthly |

### Authority Boundaries

| Decision Type | QMR Authority | Escalation Required |
|---------------|---------------|---------------------|
| Process changes within QMS | Approve with owner | Major process redesign |
| Document approval | Final QA approval | Policy-level changes |
| Nonconformity disposition | Accept/reject with MRB | Product release decisions |
| Supplier quality actions | Quality holds, audits | Supplier termination |
| Audit scheduling | Adjust internal audit schedule | External audit timing |
| Training requirements | Define quality training needs | Organization-wide training budget |

---

## Clarify First

Before preparing a quality artifact, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which deliverable** — management review, quality objectives, KPI framework, or culture assessment (each has a distinct workflow and output)
- [ ] **Review period and organizational scope** — the quarter/period and which sites/jurisdictions (drives which inputs and metrics are collected)
- [ ] **Clause 5.6.2 inputs available** — audit results, customer feedback, CAPA status, prior actions (determines whether the management review is complete)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the deliverable.

## Management Review Workflow

The agent conducts management reviews per ISO 13485 Clause 5.6 requirements.

### Workflow: Prepare and Execute Management Review

1. **Schedule management review** -- minimum annually per ISO 13485; quarterly or semi-annual cadence recommended for active QMS.
2. **Notify required attendees** minimum 2 weeks prior -- CEO/GM, department heads, RA Manager, Production Manager, Customer Quality lead.
3. **Collect required inputs** from process owners:
   - Audit results (internal and external)
   - Customer feedback (complaints, satisfaction, returns)
   - Process performance and product conformity
   - CAPA status and effectiveness
   - Previous review action items
   - Changes affecting QMS (regulatory, organizational)
   - Recommendations for improvement
4. **Compile input summary report** with trend analysis covering the review period.
5. **Prepare presentation materials** with supporting data and visualizations.
6. **Distribute agenda and input package** 1 week prior to the meeting.
7. **Conduct review meeting** per agenda -- ensure all required inputs are discussed.
8. **Validation checkpoint:** All ISO 13485 Clause 5.6.2 inputs reviewed; decisions documented with owners and due dates; outputs satisfy Clause 5.6.3 requirements.

### Example: Management Review Input Summary

```
MANAGEMENT REVIEW INPUT SUMMARY

Review Period: 2025-Q3 to 2025-Q4
Review Date: 2026-01-20
Prepared By: J. Mueller, QMR

1. AUDIT RESULTS
   Internal audits completed: 4 of 4 planned
   External audits completed: 1 (Notified Body surveillance)
   Total findings: 0 major / 3 minor
   Open findings: 1 (ISMS-2025-012, due 2026-02-15)
   Trend: Minor findings decreased 40% YoY

2. CUSTOMER FEEDBACK
   Complaints received: 12
   Complaint rate: 0.08 per 1000 units (target: <0.1)
   Customer satisfaction score: 4.2/5.0 (target: >4.0)
   Returns: 3 units (0.02%)
   Top issues: Labeling clarity (5), packaging damage (3)

3. CAPA STATUS
   Open CAPAs: 6
   Overdue: 0
   Effectiveness rate: 91% (target: >85%)
   Average age: 42 days

4. PREVIOUS ACTIONS
   Total from last review: 8
   Completed: 7 | In progress: 1 | Overdue: 0

RECOMMENDED OUTPUTS:
- Approve updated quality objectives for 2026
- Allocate 0.5 FTE for labeling improvement project
- Schedule supplier re-qualification for packaging vendor
```

### Management Review Output Requirements

| Output | Documentation | Owner |
|--------|---------------|-------|
| QMS improvement decisions | Action items with due dates | Assigned per item |
| Resource needs | Resource plan updates | Department heads |
| Quality objectives changes | Updated objectives document | QMR |
| Process improvement needs | Improvement project charters | Process owners |

See: [references/management-review-guide.md](references/management-review-guide.md)

---

## Quality KPI Management Workflow

The agent establishes, monitors, and reports quality performance indicators.

### Workflow: Establish Quality KPI Framework

1. **Identify quality objectives** requiring measurement -- align each KPI to a specific objective.
2. **Select KPIs** per objective using SMART criteria: Specific (clear calculation), Measurable (quantifiable), Actionable (team can influence), Relevant (aligned to objectives), Time-bound (defined frequency).
3. **Define target values** based on baseline data and industry benchmarks.
4. **Assign data source** and collection responsibility for each KPI.
5. **Establish reporting frequency** per KPI category (see table below).
6. **Configure dashboard** displays and trend analysis views.
7. **Define escalation thresholds** and alert triggers for each KPI.
8. **Validation checkpoint:** Each KPI has an assigned owner, measurable target, identified data source, and documented escalation criteria.

### Core Quality KPIs

| Category | KPI | Target | Calculation |
|----------|-----|--------|-------------|
| Process | First Pass Yield | >95% | (Units passed first time / Total units) x 100 |
| Process | Nonconformance Rate | <1% | (NC count / Total units) x 100 |
| CAPA | CAPA Closure Rate | >90% | (On-time closures / Due closures) x 100 |
| CAPA | CAPA Effectiveness | >85% | (Effective CAPAs / Verified CAPAs) x 100 |
| Audit | Finding Closure Rate | >90% | (On-time closures / Due closures) x 100 |
| Audit | Repeat Finding Rate | <10% | (Repeat findings / Total findings) x 100 |
| Customer | Complaint Rate | <0.1% | (Complaints / Units sold) x 100 |
| Customer | Satisfaction Score | >4.0/5.0 | Average of survey scores |

### KPI Review Frequency

| KPI Type | Review Frequency | Trend Period | Audience |
|----------|------------------|--------------|----------|
| Safety/Compliance | Daily monitoring | Weekly | Operations |
| Production Quality | Weekly | Monthly | Department heads |
| Customer Quality | Monthly | Quarterly | Executive team |
| Strategic Quality | Quarterly | Annual | Board/C-suite |

### Performance Response Matrix

| Performance Level | Status | Action Required |
|-------------------|--------|-----------------|
| >110% of target | Exceeding | Consider raising target |
| 100-110% of target | Meeting | Maintain current approach |
| 90-100% of target | Approaching | Monitor closely |
| 80-90% of target | Below | Improvement plan required |
| <80% of target | Critical | Immediate intervention |

See: [references/quality-kpi-framework.md](references/quality-kpi-framework.md)

---

## Quality Objectives Workflow

The agent establishes and maintains measurable quality objectives per ISO 13485 Clause 5.4.1.

### Workflow: Annual Quality Objectives Setting

1. **Review prior year** objective achievement -- document status of each objective.
2. **Analyze quality performance** trends and gaps from KPI data.
3. **Align with organizational strategic plan** -- map objectives to business priorities.
4. **Draft objectives** with measurable targets using the structure below.
5. **Validate resource availability** for achievement of each objective.
6. **Obtain executive approval.**
7. **Communicate objectives** organization-wide with supporting rationale.
8. **Validation checkpoint:** Each objective is measurable, has an assigned owner, a defined target, and a timeline.

### Example: Quality Objective

```
QUALITY OBJECTIVE 2026-01

Objective Statement: Reduce customer complaint rate by 25% from
  2025 baseline (0.10 per 1000 units to 0.075 per 1000 units)

Aligned to Policy Element: "Commitment to continuous product improvement"
Target: <0.075 complaints per 1000 units sold
Baseline: 0.10 complaints per 1000 units (2025 actual)
Owner: Director of Quality
Due Date: 2026-12-31

Success Criteria:
- Complaint rate <0.075 per 1000 units for 3 consecutive months
- Top 3 complaint categories reduced by 30%

Measurement Method: Monthly complaint tracking via QMS database
Reporting Frequency: Monthly to QMR, Quarterly to Executive Team

Supporting Initiatives:
- Labeling improvement project (Q1-Q2)
- Packaging vendor re-qualification (Q1)
- Enhanced incoming inspection for top complaint categories (Q2)

Resource Requirements:
- 0.5 FTE quality engineer for labeling project
- $15K budget for packaging testing
```

### Objective Categories

| Category | Example Objectives | Typical Targets |
|----------|-------------------|-----------------|
| Customer Quality | Reduce complaint rate | <0.1% of units sold |
| Process Quality | Improve first pass yield | >96% |
| Compliance | Maintain certification | Zero major NCs |
| Efficiency | Reduce quality costs | <4% of revenue |
| Culture | Increase training completion | >98% on-time |

---

## Quality Culture Assessment Workflow

The agent assesses and improves organizational quality culture.

### Workflow: Annual Quality Culture Assessment

1. **Design or select** quality culture survey instrument covering leadership, ownership, communication, improvement, training, and problem-solving dimensions.
2. **Define survey population** -- all employees or statistically valid sample.
3. **Communicate survey purpose** and confidentiality assurances.
4. **Administer survey** with a 2-week response window.
5. **Analyze results** by department, role, and tenure -- identify patterns.
6. **Identify strengths** and top improvement areas (focus on bottom 3 dimension scores).
7. **Develop action plan** for culture gaps with owners and timelines.
8. **Validation checkpoint:** Response rate >60%; action plan addresses bottom 3 scores; results reported to management review.

### Quality Culture Dimensions

| Dimension | Indicators | Assessment Method |
|-----------|------------|-------------------|
| Leadership commitment | Management visible support for quality | Survey, observation |
| Quality ownership | Employees feel responsible for quality | Survey |
| Communication | Quality information flows effectively | Survey, audit |
| Continuous improvement | Suggestions submitted and implemented | Metrics |
| Training and competence | Employees feel adequately trained | Survey, records |
| Problem solving | Issues addressed at root cause | CAPA analysis |

### Culture Improvement Actions

| Gap Identified | Potential Actions |
|----------------|-------------------|
| Low leadership visibility | Quality gemba walks, all-hands quality updates |
| Inadequate training | Competency-based training program |
| Poor communication | Quality newsletters, department huddles |
| Low reporting | Anonymous reporting system, no-blame culture |
| Lack of recognition | Quality award program, team celebrations |

---

## Regulatory Compliance Oversight

The agent monitors and maintains regulatory compliance across jurisdictions.

### Multi-Jurisdictional Compliance Matrix

| Jurisdiction | Regulation | Requirement | Status Tracking |
|--------------|------------|-------------|-----------------|
| EU | MDR 2017/745 | CE marking, Notified Body | Technical file, annual review |
| USA | 21 CFR 820 | FDA registration, QSR compliance | Annual registration, inspections |
| International | ISO 13485 | QMS certification | Surveillance audits |
| Germany | MPG/MPDG | National implementation | Competent authority filings |

### Workflow: Compliance Monitoring

1. **Maintain regulatory requirement register** covering all applicable jurisdictions.
2. **Subscribe to regulatory update services** for each market.
3. **Assess impact of regulatory changes** monthly.
4. **Update affected processes** within 90 days of each change's effective date.
5. **Verify training completion** for all personnel affected by regulatory changes.
6. **Document compliance status** in management review inputs.
7. **Maintain inspection readiness** using the checklist below.
8. **Validation checkpoint:** All applicable requirements mapped; no expired registrations; inspection readiness confirmed.

### Inspection Readiness Checklist

| Area | Ready | Action Needed |
|------|-------|---------------|
| Document control system current | [ ] | |
| Training records complete | [ ] | |
| CAPA system current, no overdue items | [ ] | |
| Complaint files complete | [ ] | |
| Equipment calibration current | [ ] | |
| Supplier qualification files complete | [ ] | |
| Management review records available | [ ] | |
| Internal audit program current | [ ] | |

---

## Decision Frameworks

### Escalation Decision Tree

```
Issue Identified
      |
      v
Is it a regulatory violation?
      |
  Yes-+-No
  |      |
  v      v
Escalate to    Is it a safety issue?
Executive          |
immediately    Yes-+-No
               |      |
               v      v
          Escalate to   Does it affect
          Safety Team   multiple departments?
                             |
                         Yes-+-No
                         |      |
                         v      v
                    Escalate to  Handle at
                    Executive    department level
```

### Quality Investment Prioritization

| Criteria | Weight | Score Method |
|----------|--------|--------------|
| Regulatory requirement | 30% | Required=10, Recommended=5, Optional=2 |
| Customer impact | 25% | Direct=10, Indirect=5, None=0 |
| Cost savings potential | 20% | >$100K=10, $50-100K=7, <$50K=3 |
| Implementation complexity | 15% | Simple=10, Moderate=5, Complex=2 |
| Strategic alignment | 10% | Core=10, Supporting=5, Peripheral=2 |

---

## Tools and References

### Scripts

| Tool | Purpose | Usage |
|------|---------|-------|
| [management_review_tracker.py](scripts/management_review_tracker.py) | Track review inputs, actions, metrics | `python management_review_tracker.py --help` |

```bash
# Track input collection status from process owners
python scripts/management_review_tracker.py --status inputs --period Q4-2025

# Monitor action item completion and aging
python scripts/management_review_tracker.py --status actions --overdue

# Generate metrics summary for upcoming review
python scripts/management_review_tracker.py --summary --format markdown
```

### References

| Document | Content |
|----------|---------|
| [management-review-guide.md](references/management-review-guide.md) | ISO 13485 Clause 5.6 requirements, input/output templates, action tracking |
| [quality-kpi-framework.md](references/quality-kpi-framework.md) | KPI categories, targets, calculations, dashboard templates |

---

## Related Skills

| Skill | Integration Point |
|-------|-------------------|
| [quality-manager-qms-iso13485](../quality-manager-qms-iso13485/) | QMS process management |
| [capa-officer](../capa-officer/) | CAPA system oversight |
| [qms-audit-expert](../qms-audit-expert/) | Internal audit program |
| [quality-documentation-manager](../quality-documentation-manager/) | Document control oversight |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Management review tracker shows "Not Collected" for all inputs | Input data JSON is empty or incorrectly structured | Verify the JSON file contains `inputs` with `topic`, `responsible`, `status`, and `data_period` fields. Use `--summary` to check the expected structure. |
| Action items all showing as "Overdue" | Due dates in the data file are in the past with no completion dates | Update completed actions with `completion_date` and change status to `Complete` or `Verified`. For genuinely overdue items, escalate per the performance response matrix. |
| Metrics summary produces zeros for all KPIs | Metrics section missing from review data JSON | Add a `metrics` object with fields for `complaint_rate`, `capa_open`, `capa_effectiveness`, `first_pass_yield`, `customer_satisfaction`, and `training_compliance`. |
| Quality culture survey response rate below 60% | Survey not communicated effectively or confidentiality concerns | Re-communicate the survey purpose with explicit confidentiality assurances. Extend the response window. Consider anonymous submission to increase participation. |
| Quality objectives not measurable | Objectives written as aspirational statements rather than SMART criteria | Rewrite each objective with a quantifiable target, baseline, owner, timeline, and measurement method per the SMART format documented in this skill. |
| KPI dashboard shows conflicting trends | Data collected from multiple sources with different time periods | Standardize data collection periods across all KPI sources. Ensure all metrics use the same calendar quarter or review period boundaries. |
| Inspection readiness checklist incomplete | Multiple departments not providing status updates | Assign a readiness coordinator per department. Conduct weekly readiness stand-ups in the 30 days before an expected inspection. |

---

## Success Criteria

- Management reviews conducted at planned intervals (minimum annually, recommended quarterly) with all ISO 13485 Clause 5.6.2 required inputs collected and analyzed
- Every management review produces documented outputs per Clause 5.6.3: QMS improvement decisions, resource needs, and quality objective updates, each with assigned owners and due dates
- Quality KPI framework covers all required categories (process, CAPA, audit, customer) with measurable targets and documented escalation thresholds
- Action item completion rate from management reviews exceeds 90% by due date, with no overdue high-priority items
- Quality culture assessment conducted annually with response rate exceeding 60%, and action plans addressing the bottom 3 dimension scores
- Regulatory compliance monitoring covers all applicable jurisdictions with no expired registrations or certifications
- Cost of quality tracked and reported quarterly, demonstrating prevention investment reducing failure costs over time

---

## Scope & Limitations

**In Scope:**
- Management review preparation, execution, and output tracking per ISO 13485 Clause 5.6
- Quality KPI framework design, target setting, and performance monitoring
- Quality objective setting and tracking per Clause 5.4.1
- Quality culture assessment and improvement planning
- Multi-jurisdictional regulatory compliance monitoring
- Inspection readiness assessment and checklist management
- QMR accountability and authority framework

**Out of Scope:**
- Detailed CAPA management (use capa-officer for root cause analysis, implementation, and effectiveness verification)
- Internal audit program execution (use qms-audit-expert for audit planning, conduct, and finding classification)
- Document control operations (use quality-documentation-manager for numbering, approval workflows, and Part 11 compliance)
- Product-level quality engineering (process validation, statistical process control, Six Sigma methodologies)
- HR performance management or compensation decisions linked to quality objectives
- Financial budgeting or resource allocation decisions (the skill recommends resource needs but does not manage budgets)

---

## Integration Points

| Skill | Integration |
|-------|------------|
| [quality-manager-qms-iso13485](../quality-manager-qms-iso13485/) | QMS process management provides the operational foundation that the QMR oversees; QMS metrics feed into management review |
| [capa-officer](../capa-officer/) | CAPA status and effectiveness rates are required management review inputs; QMR oversees CAPA program performance |
| [qms-audit-expert](../qms-audit-expert/) | Audit results (internal and external) are required management review inputs; audit finding closure rate is a core QMR KPI |
| [quality-documentation-manager](../quality-documentation-manager/) | Document control metrics (cycle time, overdue reviews) feed into management review; QMR ensures document system adequacy |
| [regulatory-affairs-head](../regulatory-affairs-head/) | Regulatory changes affecting the QMS are a required management review input; RA and QMR coordinate compliance status reporting |
| [risk-management-specialist](../risk-management-specialist/) | Risk management file reviews and post-market risk data inform management review decisions on product safety |

---

## Tool Reference

### management_review_tracker.py

Tracks management review inputs, action items, and generates review metrics reports.

| Flag | Required | Description |
|------|----------|-------------|
| `--data` | Yes (or `--interactive`) | Path to review data JSON file containing inputs, action items, and metrics for the review period |
| `--interactive` | No | Launch interactive mode for guided data entry |
| `--output` | No | Output format: `json` for structured output, omit for human-readable text |
| `--status` | No | Filter view: `inputs` (show input collection status), `actions` (show action item status) |
| `--overdue` | No | Show only overdue action items (use with `--status actions`) |
| `--period` | No | Review period identifier (e.g., `Q4-2025`) to filter data |
| `--summary` | No | Generate a metrics summary report for the current review period |
| `--format` | No | Output format for summary: `markdown` for formatted text, omit for plain text |

---

## quality-manager-qms-iso13485

Source path: `references/ra-qm-team/quality-manager-qms-iso13485/SKILL.md`

# Quality Manager - QMS ISO 13485 Specialist

ISO 13485:2016 Quality Management System implementation, maintenance, and certification support for medical device organizations. Covers the full lifecycle from gap analysis through certification, plus the FDA QMSR transition (effective Feb 2026), digital/electronic QMS, and AI-enabled device considerations.

## Core Capabilities

- **QMS implementation** — gap analysis, Quality Manual (Clause 4.2.2), the 6 mandatory documented procedures, four-tier document hierarchy, certification readiness
- **Document control** — numbering conventions, change control, review schedules, electronic document management (eDMS)
- **Internal audit** — annual audit programs, individual audit execution, auditor qualification, finding classification (Clause 8.2.4)
- **Process validation** — IQ/OQ/PQ protocols, revalidation triggers, special-process examples (Clause 7.5.6)
- **Supplier qualification** — A/B/C categorization, scored evaluation, monitoring, software/cloud provider assessment (Clause 7.4)
- **Cross-framework integration** — FDA QMSR, 21 CFR Part 11 / EU Annex 11, ISO 42001 (AI), remote/hybrid audits, cybersecurity-driven CAPA

## When to Use

- Building an ISO 13485:2016 QMS from scratch or remediating gaps
- Preparing for or transitioning to the FDA QMSR
- Establishing document control, internal audit, validation, or supplier programs
- Modernizing to a digital/electronic QMS (Part 11 / Annex 11)
- Integrating AI-enabled device or cybersecurity requirements into the QMS

## Clarify First

Before building or assessing the QMS, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Task** — QMS implementation/gap analysis, internal audit, process validation, or supplier qualification (picks the workflow and script)
- [ ] **Standard scope** — ISO 13485 only, FDA QMSR transition, or digital QMS (Part 11 / Annex 11) (determines which requirements and retained FDA items apply)
- [ ] **Certification stage** — building from scratch, remediating gaps, or certification readiness (sets the depth)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the deliverable.

## Quick Start

```bash
# Generate an ISO 13485 audit checklist (clause, process, or full system)
python scripts/qms_audit_checklist.py --clause 7.3
python scripts/qms_audit_checklist.py --process design-control
python scripts/qms_audit_checklist.py --audit-type system --output json
python scripts/qms_audit_checklist.py --interactive
```

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/core-workflows.md](references/core-workflows.md)** — step-by-step workflows + tables for QMS implementation, document control, internal audit, process validation, and supplier qualification. Read when executing any core QMS process.
- **[references/process-reference.md](references/process-reference.md)** — ISO 13485 clause structure, management review inputs (5.6.2), record retention, and decision frameworks (exclusions, NC disposition tree, CAPA initiation). Read when mapping clauses or making disposition/CAPA decisions.
- **[references/advanced-integration.md](references/advanced-integration.md)** — FDA QMSR alignment, digital QMS, 21 CFR Part 11 / EU Annex 11, remote audits, ISO 42001 AI integration, software/cloud supplier qualification, cybersecurity CAPA. Read when modernizing the QMS or integrating cross-framework requirements.
- **[references/operations-and-troubleshooting.md](references/operations-and-troubleshooting.md)** — troubleshooting table, success criteria, and the full `qms_audit_checklist.py` flag reference. Read when diagnosing tool output or validating QMS completeness.
- **[references/iso13485-clause-requirements.md](references/iso13485-clause-requirements.md)** — detailed requirements for each ISO 13485:2016 clause with audit questions. Read when interpreting a specific clause in depth.
- **[references/qms-process-templates.md](references/qms-process-templates.md)** — ready-to-use templates for document control, audit, CAPA, supplier, and training. Read when producing QMS artifacts.

## Scope & Limitations

**In Scope:**
- ISO 13485:2016 QMS implementation from gap analysis through certification
- Document control system design (numbering, approval, change control, review schedules)
- Internal audit program planning and execution per Clause 8.2.4
- Process validation methodology (IQ/OQ/PQ) per Clause 7.5.6
- Supplier qualification and monitoring per Clause 7.4
- FDA QMSR transition planning and gap analysis
- Digital QMS implementation (eDMS, Part 11, Annex 11 requirements)
- Remote and hybrid audit methodology
- AI-enabled medical device QMS considerations (ISO 42001 integration)

**Out of Scope:**
- Clinical evaluation or clinical investigation management (use regulatory-affairs-head for clinical evidence strategy)
- Product-specific design control execution (the skill provides the design control framework, not product-specific design inputs/outputs)
- Sterilization validation protocol development (requires product-specific expertise per ISO 11135/11137/17665)
- Regulatory submission preparation (use fda-consultant-specialist or mdr-745-specialist)
- Post-market surveillance program execution (use risk-management-specialist for post-production risk monitoring)
- IT infrastructure or cybersecurity implementation (use infrastructure-compliance-auditor for technical security)

## Integration Points

| Skill | Integration |
|-------|------------|
| [quality-manager-qmr](../quality-manager-qmr/) | QMR oversees QMS effectiveness; management review inputs include QMS process performance metrics |
| [capa-officer](../capa-officer/) | CAPA system (Clause 8.5) is a core QMS process; CAPA effectiveness feeds into management review |
| [qms-audit-expert](../qms-audit-expert/) | Internal audit program (Clause 8.2.4) evaluates QMS processes; audit findings drive CAPA and improvement |
| [quality-documentation-manager](../quality-documentation-manager/) | Document and record control (Clause 4.2) provides the documentation foundation for the entire QMS |
| [risk-management-specialist](../risk-management-specialist/) | ISO 14971 risk management integrates with design control (Clause 7.3) and product realization planning (Clause 7.1) |
| [fda-consultant-specialist](../fda-consultant-specialist/) | QMSR alignment requires mapping FDA-specific requirements (MDR reporting, UDI, Part 11) beyond ISO 13485 |
| [regulatory-affairs-head](../regulatory-affairs-head/) | Regulatory strategy informs QMS scope, market-specific requirements, and certification timelines |

---

## regulatory-affairs-head

Source path: `references/ra-qm-team/regulatory-affairs-head/SKILL.md`

# Head of Regulatory Affairs

Regulatory strategy development, submission management, and global market access for medical device organizations.

---

## Clarify First

Before developing the regulatory strategy, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Device classification and intended use** — risk level and what the device does (drives the pathway: 510(k)/De Novo/PMA and MDR class)
- [ ] **Target markets** — US, EU, Canada, Japan, China… (determines which regulations apply and the submission sequencing)
- [ ] **Predicate availability** — whether a suitable predicate exists or the device is novel (selects 510(k) vs De Novo/PMA)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the strategy.

## Regulatory Strategy Workflow

The agent develops regulatory strategy aligned with business objectives and product characteristics.

### Workflow: New Product Regulatory Strategy

1. **Gather product information** -- collect intended use, device classification (risk level), technology platform, target markets, and timeline from stakeholders.
2. **Identify applicable regulations** per target market:
   - FDA (US): 21 CFR Part 820, 510(k)/PMA/De Novo
   - EU: MDR 2017/745, Notified Body requirements
   - Other markets: Health Canada, PMDA, NMPA, TGA
3. **Determine optimal regulatory pathway** using the pathway selection matrix below -- compare submission types, assess predicate device availability, evaluate clinical evidence requirements.
4. **Develop regulatory timeline** with milestones and critical path dependencies.
5. **Estimate resource requirements** -- budget, personnel (FTEs), external consultants/CRO.
6. **Identify regulatory risks** and define mitigation strategies for each.
7. **Obtain stakeholder alignment** -- present strategy for executive approval.
8. **Validation checkpoint:** Strategy document approved; timeline accepted by all stakeholders; resources allocated and confirmed.

### Regulatory Pathway Selection Matrix

| Factor | 510(k) | De Novo | PMA |
|--------|--------|---------|-----|
| Predicate Available | Yes | No | N/A |
| Risk Level | Low-Moderate | Low-Moderate | High |
| Clinical Data | Usually not required | May be required | Required |
| Review Time | 90 days (MDUFA) | 150 days | 180 days |
| User Fee | ~$22K (2024) | ~$135K | ~$440K |
| Best For | Me-too devices | Novel low-risk | High-risk, novel |

### Example: Regulatory Strategy Output

```
REGULATORY STRATEGY

Product: CardioSense Wearable ECG Monitor
Version: 1.0
Date: 2026-03-12

1. PRODUCT OVERVIEW
   - Intended use: Continuous ECG monitoring for arrhythmia detection
   - Device classification: Class II (FDA), Class IIa (EU MDR)
   - Technology: Single-lead ECG with ML-based AF detection

2. TARGET MARKETS
   | Market | Priority | Timeline    |
   |--------|----------|-------------|
   | USA    | 1        | Q3 2026     |
   | EU     | 2        | Q1 2027     |
   | Canada | 3        | Q2 2027     |

3. REGULATORY PATHWAY
   - FDA: 510(k) — Predicate: AliveCor KardiaMobile (K142743)
   - EU: Class IIa via Annex IX (QMS) + Annex XI Part A (Product)
   - Rationale: Established predicate supports SE argument;
     MDR IIa classification per Rule 10 (active diagnostic)

4. CLINICAL EVIDENCE STRATEGY
   - Requirements: SE comparison + analytical performance data
   - Approach: Literature review for AF detection + bench study

5. RISKS AND MITIGATION
   | Risk                     | Probability | Impact | Mitigation                    |
   |--------------------------|-------------|--------|-------------------------------|
   | FDA requests clinical    | Medium      | High   | Pre-Sub meeting to align      |
   | NB capacity delay        | High        | Medium | Engage NB by Q4 2025         |
   | ML algorithm as SaMD     | Medium      | High   | Follow FDA AI/ML SaMD guidance|
```

---

## FDA Submission Workflow

The agent prepares and submits FDA regulatory applications following established pathways.

### Workflow: 510(k) Submission

1. **Confirm 510(k) pathway suitability** -- verify predicate device identified, substantial equivalence supportable, no new intended use or technology concerns.
2. **Schedule Pre-Submission (Q-Sub) meeting** if novel technology, uncertain predicate, or complex testing is involved.
3. **Compile submission package:**
   - Cover letter and administrative information
   - Device description and intended use
   - Substantial equivalence comparison
   - Performance testing data
   - Biocompatibility (if patient contact, per ISO 10993)
   - Software documentation (if applicable, per IEC 62304)
   - Labeling and IFU
4. **Conduct internal review** -- quality check all sections against FDA checklist.
5. **Prepare eCopy** per current FDA format requirements.
6. **Submit via FDA ESG portal** with user fee payment.
7. **Monitor MDUFA clock** and respond to AI/RTA requests within deadline.
8. **Validation checkpoint:** Submission accepted (RTA complete); MDUFA goal date received; tracking system updated.

### Workflow: PMA Submission

1. **Confirm PMA pathway** -- Class III device or no suitable predicate; clinical data strategy defined.
2. **Complete IDE clinical study** if required -- IDE approval, protocol execution, study report.
3. **Conduct Pre-Submission meeting** with FDA.
4. **Compile PMA submission** -- administrative/device information, manufacturing information, nonclinical studies, clinical studies, labeling.
5. **Submit original PMA** application.
6. **Address FDA questions** and deficiency letters within specified timeframes.
7. **Prepare for FDA facility inspection** -- coordinate with Quality team.
8. **Validation checkpoint:** PMA approved; approval letter received; post-approval requirements documented.

### FDA Submission Timeline

| Milestone | 510(k) | De Novo | PMA |
|-----------|--------|---------|-----|
| Pre-Sub Meeting | Day -90 | Day -90 | Day -120 |
| Submission | Day 0 | Day 0 | Day 0 |
| RTA Review | Day 15 | Day 15 | Day 45 |
| Substantive Review | Days 15-90 | Days 15-150 | Days 45-180 |
| Decision | Day 90 | Day 150 | Day 180 |

### Common FDA Deficiencies

| Category | Common Issues | Prevention |
|----------|---------------|------------|
| Substantial Equivalence | Weak predicate comparison | Strong SE argument upfront |
| Performance Testing | Incomplete test protocols | Follow recognized standards |
| Biocompatibility | Missing endpoints | ISO 10993 risk assessment |
| Software | Inadequate documentation | IEC 62304 compliance |
| Labeling | Inconsistent claims | Early labeling review |

See: [references/fda-submission-guide.md](references/fda-submission-guide.md)

---

## EU MDR Submission Workflow

The agent achieves CE marking under EU MDR 2017/745.

### Workflow: MDR Technical Documentation

1. **Confirm device classification** per MDR Annex VIII rules.
2. **Select conformity assessment route** based on class:
   - Class I: Self-declaration
   - Class IIa/IIb: Notified Body involvement
   - Class III: Full NB assessment
3. **Select and engage Notified Body** (for Class IIa+) -- evaluate scope, capacity, experience, and timeline.
4. **Compile Technical Documentation** per Annex II:
   - Device description and specifications
   - Design and manufacturing information
   - GSPR checklist (General Safety and Performance Requirements)
   - Benefit-risk analysis and risk management (ISO 14971)
   - Clinical evaluation per Annex XIV
   - Post-market surveillance plan
5. **Establish and document QMS** per ISO 13485.
6. **Submit application to Notified Body.**
7. **Address NB questions** and coordinate audit logistics.
8. **Validation checkpoint:** CE certificate issued; Declaration of Conformity signed; EUDAMED registration complete.

### Clinical Evidence Requirements by Class

| Class | Clinical Requirement | Documentation |
|-------|---------------------|---------------|
| I | Clinical evaluation (CE) | CE report |
| IIa | CE with literature focus | CE report + PMCF plan |
| IIb | CE with clinical data | CE report + PMCF + clinical study (some) |
| III | CE with clinical investigation | CE report + PMCF + clinical investigation |

### Notified Body Selection Criteria

| Criterion | Consideration |
|-----------|---------------|
| Scope | Device category expertise |
| Capacity | Availability and review timeline |
| Experience | Track record in your technology |
| Geography | Proximity for audits |
| Cost | Fee structure transparency |
| Communication | Responsiveness and clarity |

See: [references/eu-mdr-submission-guide.md](references/eu-mdr-submission-guide.md)

---

## Global Market Access Workflow

The agent coordinates regulatory approvals across international markets.

### Workflow: Multi-Market Submission Strategy

1. **Define target markets** based on business priorities and revenue projections.
2. **Sequence markets** for efficient evidence leverage:
   - Phase 1: FDA + EU (reference markets)
   - Phase 2: Recognition markets (Canada via MDSAP, Australia via TGA)
   - Phase 3: Major markets (Japan PMDA, China NMPA)
   - Phase 4: Emerging markets
3. **Identify local requirements** per market -- clinical data acceptability, local agent/representative needs, language and labeling requirements.
4. **Develop master technical file** with localization plan.
5. **Establish in-country regulatory support.**
6. **Execute parallel or sequential submissions** per sequencing strategy.
7. **Track approvals** and coordinate product launches.
8. **Validation checkpoint:** All target market approvals obtained; registration database updated; launch dates confirmed.

### Market Priority Matrix

| Market | Size | Complexity | Recognition | Priority |
|--------|------|------------|-------------|----------|
| USA | Large | High | N/A | 1 |
| EU | Large | High | N/A | 1-2 |
| Canada | Medium | Medium | MDSAP | 2 |
| Australia | Medium | Low | EU accepted | 2 |
| Japan | Large | High | Local clinical | 3 |
| China | Large | Very High | Local testing | 3 |
| Brazil | Medium | High | GMP inspection | 3-4 |

See: [references/global-regulatory-pathways.md](references/global-regulatory-pathways.md)

---

## Regulatory Intelligence Workflow

The agent monitors and responds to regulatory changes affecting the product portfolio.

### Workflow: Regulatory Change Management

1. **Monitor regulatory sources** -- FDA Federal Register, EU Official Journal, MDCG guidance, Notified Body communications, industry associations (AdvaMed, MedTech Europe).
2. **Assess relevance** to current product portfolio and pipeline.
3. **Evaluate impact** -- timeline to compliance, resource requirements, product changes needed.
4. **Develop compliance action plan** with owners and deadlines.
5. **Communicate to affected stakeholders** across functions.
6. **Implement required changes** within established timelines.
7. **Document compliance status** for management review and audit readiness.
8. **Validation checkpoint:** Compliance action plan approved; changes implemented on schedule; no gaps at next audit.

### Regulatory Monitoring Sources

| Source | Type | Frequency |
|--------|------|-----------|
| FDA Federal Register | Regulations, guidance | Daily |
| FDA Device Database | 510(k), PMA, recalls | Weekly |
| EU Official Journal | MDR/IVDR updates | Weekly |
| MDCG Guidance | EU implementation | As published |
| ISO/IEC | Standards updates | Quarterly |
| Notified Body | Audit findings, trends | Per interaction |

---

## Decision Frameworks

### Pathway Selection Decision Tree

```
Is predicate device available?
            |
        Yes-+-No
         |     |
         v     v
    Is device   Is risk level
    substantially  Low-Moderate?
    equivalent?       |
         |        Yes-+-No
     Yes-+-No      |     |
      |     |      v     v
      v     v   De Novo  PMA
    510(k)  Consider      required
           De Novo
           or PMA
```

### Pre-Submission Meeting Decision

| Factor | Schedule Pre-Sub | Skip Pre-Sub |
|--------|------------------|--------------|
| Novel Technology | Yes | |
| New Intended Use | Yes | |
| Complex Testing | Yes | |
| Uncertain Predicate | Yes | |
| Clinical Data Needed | Yes | |
| Well-established | | Yes |
| Clear Predicate | | Yes |
| Standard Testing | | Yes |

### Regulatory Escalation Criteria

| Situation | Escalation Level | Action |
|-----------|------------------|--------|
| Submission rejection | VP Regulatory | Root cause analysis, strategy revision |
| Major deficiency | Director | Cross-functional response team |
| Timeline at risk | Management | Resource reallocation review |
| Regulatory change | VP Regulatory | Portfolio impact assessment |
| Safety signal | Executive | Immediate containment and reporting |

---

## Tools and References

### Scripts

| Tool | Purpose | Usage |
|------|---------|-------|
| [regulatory_tracker.py](scripts/regulatory_tracker.py) | Track submission status and timelines | `python regulatory_tracker.py --help` |

```bash
# Example: Track active submissions
python scripts/regulatory_tracker.py --status active --format markdown

# Example: Check overdue submissions
python scripts/regulatory_tracker.py --overdue --notify
```

### References

| Document | Content |
|----------|---------|
| [fda-submission-guide.md](references/fda-submission-guide.md) | FDA pathways, requirements, review process |
| [eu-mdr-submission-guide.md](references/eu-mdr-submission-guide.md) | MDR classification, technical documentation, clinical evidence |
| [global-regulatory-pathways.md](references/global-regulatory-pathways.md) | Canada, Japan, China, Australia, Brazil requirements |
| [iso-regulatory-requirements.md](references/iso-regulatory-requirements.md) | ISO 13485, 14971, 10993, IEC 62304, 62366 requirements |

### Key Performance Indicators

| KPI | Target | Calculation |
|-----|--------|-------------|
| First-time approval rate | >85% | (Approved without major deficiency / Total submitted) x 100 |
| On-time submission | >90% | (Submitted by target date / Total submissions) x 100 |
| Review cycle compliance | >95% | (Responses within deadline / Total requests) x 100 |
| Regulatory hold time | <20% | (Days on hold / Total review days) x 100 |

---

## Related Skills

| Skill | Integration Point |
|-------|-------------------|
| [mdr-745-specialist](../mdr-745-specialist/) | Detailed EU MDR technical requirements |
| [fda-consultant-specialist](../fda-consultant-specialist/) | FDA submission deep expertise |
| [quality-manager-qms-iso13485](../quality-manager-qms-iso13485/) | QMS for regulatory compliance |
| [risk-management-specialist](../risk-management-specialist/) | ISO 14971 risk management |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Regulatory tracker shows "No existing data file found" | Data file does not exist at the expected path | Create an initial submissions JSON file or use the tracker to add a first submission. The tool creates the file on first save. |
| Submission status shows as PLANNING when it should be SUBMITTED | Status not updated after submission | Update the submission record with `submission_status: SUBMITTED` and `submission_date`. The tracker does not auto-detect FDA ESG submission status. |
| Overdue notification fires for approved submission | `actual_approval_date` field not populated | Update the record with the actual approval date. The tracker compares `target_approval_date` against today when `actual_approval_date` is null. |
| 510(k) pathway selected but clinical data still needed | Novel technology or uncertain predicate | Schedule a Pre-Submission (Q-Sub) meeting with FDA. Novel technologies or complex testing may require clinical evidence even under the 510(k) pathway. |
| Notified Body timeline exceeds plan | NB capacity constraints (common in 2025-2026) | Engage the NB as early as possible (6+ months before target submission). The number of designated MDR NBs has grown to ~50 as of 2024, but capacity remains tight for complex device classes. |
| EUDAMED registration blocked | EUDAMED modules not yet mandatory or data upload issues | Develop a secure process for uploading device data into EUDAMED. Certain modules become mandatory in 2026. Prepare data structures proactively. |
| Multi-market submission timeline keeps slipping | Sequential submissions creating cascading delays | Where possible, shift to parallel submission strategy. Use FDA + EU as reference markets and leverage MDSAP for recognition markets (Canada, Australia, Japan, Brazil). |

---

## Success Criteria

- First-time regulatory approval rate exceeds 85% across all submission types (510(k), PMA, De Novo, CE marking)
- Regulatory submission timelines met for 90%+ of submissions (submitted by target date)
- Pre-Submission meetings scheduled and completed for all novel technology, uncertain predicate, or complex testing submissions
- FDA review cycle compliance exceeds 95% (responses to AI/RTA/deficiency requests submitted within deadline)
- EU MDR Technical Documentation complete and accepted by Notified Body with no critical findings on first review
- Global market access strategy documented with phased market sequencing, resource estimates, and risk mitigation for each target jurisdiction
- Regulatory intelligence monitoring active for all applicable jurisdictions with change assessments completed within 30 days of publication

---

## Scope & Limitations

**In Scope:**
- Regulatory strategy development for medical devices across FDA, EU MDR, and global markets
- FDA submission management (510(k), PMA, De Novo, Q-Sub/Pre-Submission)
- EU MDR conformity assessment route selection and Notified Body engagement
- Global market access planning and multi-market submission sequencing
- Regulatory intelligence monitoring and change management
- Submission timeline planning and milestone tracking
- Regulatory pathway selection decision frameworks

**Out of Scope:**
- Clinical trial design, execution, or data analysis (the skill addresses clinical evidence strategy but not clinical operations)
- Detailed technical file content creation (use mdr-745-specialist for GSPR checklists, Annex II documentation)
- Quality system management (use quality-manager-qms-iso13485 for QMS processes)
- Post-market surveillance program execution (the skill defines PMS strategy but execution is managed by PMS teams)
- Reimbursement strategy or health technology assessment (HTA) submissions
- Patent or intellectual property strategy related to regulatory pathways
- In vitro diagnostic (IVD) specific regulatory requirements under IVDR 2017/746

---

## Integration Points

| Skill | Integration |
|-------|------------|
| [mdr-745-specialist](../mdr-745-specialist/) | Detailed EU MDR technical requirements, GSPR checklists, Annex VIII classification rules, and EUDAMED registration |
| [fda-consultant-specialist](../fda-consultant-specialist/) | FDA submission deep expertise including QMSR alignment, HIPAA, cybersecurity guidance, and 510(k)/PMA specifics |
| [quality-manager-qms-iso13485](../quality-manager-qms-iso13485/) | QMS certification is a prerequisite for MDR conformity assessment and supports FDA QMSR compliance |
| [risk-management-specialist](../risk-management-specialist/) | ISO 14971 risk management file is required for both FDA submissions and EU MDR Technical Documentation |
| [quality-manager-qmr](../quality-manager-qmr/) | Regulatory changes affecting the QMS are management review inputs; QMR coordinates compliance across jurisdictions |

---

## Tool Reference

### regulatory_tracker.py

Tracks regulatory submission status, timelines, and overdue notifications across all markets.

| Flag | Required | Description |
|------|----------|-------------|
| `--status` | No | Filter submissions by status: `active`, `planning`, `submitted`, `approved`, `all` |
| `--overdue` | No | Show only submissions past their target approval date without an actual approval date |
| `--notify` | No | Generate notification alerts for overdue or at-risk submissions |
| `--format` | No | Output format: `markdown` for formatted text, omit for default display |

Note: The tracker operates on a `regulatory_submissions.json` data file (default path). Submissions are added and updated programmatically through the `RegulatoryTracker` class API. The tool supports submission types: FDA_510K, FDA_PMA, FDA_DE_NOVO, EU_MDR_CE, ISO_CERTIFICATION, GLOBAL_REGULATORY.

---

## risk-management-specialist

Source path: `references/ra-qm-team/risk-management-specialist/SKILL.md`

# Risk Management Specialist

ISO 14971:2019 risk management implementation throughout the medical device lifecycle — planning, hazard analysis, risk evaluation, risk control, residual-risk assessment, and post-production monitoring — extended for AI/ML, cybersecurity (IEC 81001-5-1), supply chain, and cross-framework alignment (NIST CSF, DORA, NIS2).

## Core Capabilities

- **Risk management planning** — scope, 5x5 acceptability matrix, RACI, verification and post-production planning
- **Risk analysis & evaluation** — hazard identification across 9 categories, P1-P5 / S1-S5 estimation, ALARP, benefit-risk triggers
- **Risk control** — priority hierarchy (inherent safety → protective measures → information for safety), verification methods, residual-risk evaluation
- **Post-production monitoring** — information sources, review triggers, RM-file update procedures, periodic review
- **Extended domains** — AI/ML risk (bias, drift, adversarial inputs), health-software cybersecurity, supply chain risk, cross-framework mapping

## When to Use

- Implementing ISO 14971:2019 across the device lifecycle
- Building a hazard analysis / risk register using FMEA, FTA, HAZOP, or Use Error Analysis
- Evaluating residual risk and demonstrating ALARP or benefit-risk acceptability
- Extending risk management to AI/ML devices, cybersecurity, or supply chain
- Setting up post-production risk monitoring and Risk Management File update triggers

## Clarify First

Before running the risk assessment, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Device and intended use** — what it is and its use context (drives the hazard categories and benefit-risk analysis)
- [ ] **Lifecycle stage** — planning, hazard analysis, risk control, or post-production (picks the workflow)
- [ ] **Acceptability criteria** — the 5x5 matrix thresholds and ALARP definition (determines the risk-evaluation outcomes)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the risk register.

## Quick Start

```bash
# ISO 14971 risk level (probability × severity, 1-5 each)
python scripts/risk_matrix_calculator.py --probability 3 --severity 4

# FMEA Risk Priority Number (severity / occurrence / detection, 1-10 each)
python scripts/risk_matrix_calculator.py --fmea --severity 8 --occurrence 4 --detection 3

# Guided interactive assessment, or list the full criteria scales
python scripts/risk_matrix_calculator.py --interactive
python scripts/risk_matrix_calculator.py --list-criteria
```

## References

Load the reference that matches the task — keep this file lean and pull detail on demand:

- **[references/risk-process.md](references/risk-process.md)** — full ISO 14971 process: planning, analysis, evaluation, control, and post-production workflows; 5x5 acceptability matrix; probability/severity criteria; hazard checklist; and the decision frameworks. Read when executing any lifecycle stage.
- **[references/risk-analysis-methods.md](references/risk-analysis-methods.md)** — FMEA, FTA, HAZOP, Use Error Analysis, and software hazard analysis methods. Read when choosing and applying a hazard-analysis technique.
- **[references/iso14971-implementation-guide.md](references/iso14971-implementation-guide.md)** — complete ISO 14971:2019 implementation framework with templates. Read for clause-level implementation detail.
- **[references/templates-and-tools.md](references/templates-and-tools.md)** — Hazard Analysis / FMEA worksheets, Risk Management Report template, full `risk_matrix_calculator.py` flag reference, troubleshooting table, and success criteria. Read when documenting assessments or diagnosing tool issues.
- **[references/extended-risk-domains.md](references/extended-risk-domains.md)** — AI/ML risk categories and methodology, IEC 81001-5-1 cybersecurity integration, supply chain risk, post-market monitoring automation, combined safety-security FMEA, and NIST CSF / DORA / NIS2 cross-framework mapping. Read for connected, software, or AI-enabled devices.

## Scope & Limitations

**In Scope:**
- ISO 14971:2019 risk management process implementation (planning, analysis, evaluation, control, residual risk, production/post-production)
- 5x5 risk matrix calculation and FMEA RPN scoring
- Hazard analysis methodology guidance (FMEA, FTA, HAZOP, Use Error Analysis, PHA)
- Risk control hierarchy application and verification planning
- Benefit-risk analysis framework
- Post-production risk monitoring and risk file update triggers
- AI/ML-specific risk management extensions (model bias, drift, adversarial inputs)
- Cybersecurity risk integration per IEC 81001-5-1
- Supply chain risk assessment methodology
- Cross-framework risk mapping (ISO 14971, NIST CSF, DORA, NIS2)

**Out of Scope:**
- Clinical investigation design or execution (risk management informs clinical strategy but does not execute studies)
- Software hazard analysis per IEC 62304 (the skill references software risk but detailed software lifecycle management requires IEC 62304 expertise)
- Biocompatibility testing or ISO 10993 evaluation (the skill identifies biological hazards but does not execute biocompatibility testing)
- Cybersecurity penetration testing or vulnerability scanning (use infrastructure-compliance-auditor for technical security testing)
- CAPA root cause analysis execution (use capa-officer for 5-Why, Fishbone, FTA, FMEA-based root cause investigation)
- Regulatory submission of risk management files (use regulatory-affairs-head for submission strategy and packaging)

## Integration Points

| Skill | Integration |
|-------|------------|
| [quality-manager-qms-iso13485](../quality-manager-qms-iso13485/) | Risk management (Clause 7.1) integrates with QMS product realization planning; risk file is part of the Design History File |
| [capa-officer](../capa-officer/) | Post-market risk signals may trigger CAPA; CAPA root cause analysis methods (FMEA, FTA) overlap with risk analysis techniques |
| [regulatory-affairs-head](../regulatory-affairs-head/) | Risk management file is required for FDA submissions and EU MDR Technical Documentation; benefit-risk analysis supports clinical evaluation |
| [quality-documentation-manager](../quality-documentation-manager/) | Risk management file and records must be controlled per document control procedures (Clause 4.2) |
| [fda-consultant-specialist](../fda-consultant-specialist/) | FDA cybersecurity guidance (2025 update) requires integration of security risks into ISO 14971 processes for premarket submissions |
| [infrastructure-compliance-auditor](../infrastructure-compliance-auditor/) | Technical security controls validated by the infrastructure auditor serve as risk mitigations for cybersecurity threats in the risk assessment |
| [nist-csf-specialist](../nist-csf-specialist/) | NIST CSF risk assessment (ID.RA) maps to ISO 14971 hazard identification and risk estimation; unified risk register possible |

---

## soc2-audit-prep

Source path: `references/ra-qm-team/audit-prep/soc2-audit-prep/SKILL.md`

# SOC 2 Audit Prep

Operational playbook for SOC 2 audit preparation. Designed to be picked up 4-12 weeks before an audit and run as a sprint to closure. Pairs with our deep `ra-qm-team/soc2-compliance-expert` skill (which builds the program from scratch).

When to use this skill vs. soc2-compliance-expert:
- **This skill**: audit scheduled in 4-12 weeks; gaps known; need to execute the sprint
- **soc2-compliance-expert**: building the SOC 2 program; designing controls; multi-quarter effort

---

## When to use this skill

| Situation | Skill applies |
|-----------|---------------|
| SOC 2 audit scheduled, need readiness sprint | Yes — start here |
| Type I audit in 4-12 weeks | Yes — use 4 or 8-week sprint plan |
| Type II observation period closing soon | Yes — use 12-week sprint plan |
| Readiness assessment surfaced gaps | Yes — `scripts/soc2_readiness_score.py` + `evidence_gap_finder.py` |
| Building SOC 2 program from scratch | Use `ra-qm-team/soc2-compliance-expert` instead |

---

## The audit-prep sprint at a glance

### 4-week sprint (Type I, mostly ready)

```
Week 1: Inventory + scoping
  - Confirm Trust Services Criteria scope (always Security; plus chosen others)
  - Pull current evidence per criterion
  - Identify gaps via scripts/evidence_gap_finder.py
  - Auditor kickoff scheduled

Week 2: Gap closure
  - Policy updates / approvals
  - Technical control fixes (MFA universal, logging coverage, etc.)
  - Evidence retrieval (access reviews, change tickets, on-call records)
  - Auditor information request preparation

Week 3: Evidence finalization
  - All evidence packets compiled per criterion
  - Walkthroughs / interviews scheduled with key control owners
  - Findings remediation
  - Pre-audit checkpoint with auditor (informal)

Week 4: Audit week
  - Walkthroughs executed
  - Sample testing
  - Q&A
  - Management responses to findings
```

### 8-week sprint (Type I, gaps remaining)

```
Weeks 1-2: Inventory + scoping + gap identification (same as 4-week W1)
Weeks 3-5: Gap closure (policies, technical, process)
Weeks 6-7: Evidence finalization + walkthroughs
Week 8: Audit week
```

### 12-week sprint (Type II observation prep)

```
Weeks 1-2: Inventory + scope + gap identification + auditor kickoff
Weeks 3-4: Gap closure
Weeks 5-12: Observation period (controls operating; evidence accumulating)
After observation period: audit week
```

See [references/evidence-collection-sprint-plan.md](references/evidence-collection-sprint-plan.md) for the detailed week-by-week plans.

---

## The pre-audit punch list

Standard pre-audit punch list, organized by Trust Services Criterion:

### CC1-CC5 (Common Criteria — control environment)
- [ ] Information security policy approved + dated within 12 months
- [ ] Org chart current (reflects actual reporting lines)
- [ ] Risk assessment performed + documented within 12 months
- [ ] Board / leadership oversight evidence (minutes referencing security)
- [ ] Code of conduct signed by all employees
- [ ] Background checks documented for all hires

### CC6 (Logical and Physical Access)
- [ ] SSO enforced for all production systems
- [ ] MFA universal (no exceptions documented for production access)
- [ ] Access review evidence (quarterly minimum)
- [ ] Privileged access management (PAM) for admin/root accounts
- [ ] Physical security evidence (office badge logs, data center attestation)
- [ ] Encryption at rest / in transit verified

### CC7 (System Operations)
- [ ] Vulnerability management evidence (scans, remediation tracking)
- [ ] Monitoring and alerting documented + tested
- [ ] Incident response plan + documented incidents from past period
- [ ] Business continuity / DR plan + test evidence
- [ ] Backup verification (not just configured — tested restore)

### CC8 (Change Management)
- [ ] Code change tickets with peer review + approval
- [ ] Production deployment evidence (who, what, when, approvers)
- [ ] Emergency change process documented + sample tickets

### CC9 (Risk Mitigation / Vendors)
- [ ] Vendor inventory current
- [ ] Vendor due diligence evidence per vendor
- [ ] Vendor SOC 2 reports collected (annual)

### A1 (Availability — if in scope)
- [ ] SLA monitoring + actuals
- [ ] Capacity planning evidence
- [ ] Recovery objective testing (RTO/RPO)

### PI1 (Processing Integrity — if in scope)
- [ ] Data validation controls documented
- [ ] Error handling + reconciliation evidence

### C1 (Confidentiality — if in scope)
- [ ] Data classification + handling procedures
- [ ] Encryption verified

### P1 (Privacy — if in scope)
- [ ] Privacy notice published + dated
- [ ] Data subject rights process documented
- [ ] Consent management evidence

See [references/soc2-pre-audit-punch-list.md](references/soc2-pre-audit-punch-list.md) for the detailed punch list with evidence templates per item.

---

## Clarify First

Before running the audit-prep sprint, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Audit type** — Type I (point-in-time) vs Type II (observation period) (sets the 4/8 vs 12-week sprint and the evidence-over-time requirement)
- [ ] **TSC scope** — which Trust Services Criteria beyond mandatory Security (Availability, Processing Integrity, Confidentiality, Privacy) (determines which punch-list sections apply)
- [ ] **Readiness score / gap level** — picks the 4-week vs 8-week vs 12-week sprint (or postpone)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the sprint plan.

## Quick start

1. **Run readiness score**: `python3 scripts/soc2_readiness_score.py --config controls.yaml`
2. **Identify evidence gaps**: `python3 scripts/evidence_gap_finder.py --evidence evidence.yaml --tsc CC6`
3. **Pick sprint length** based on score:
   - Score > 90: 4-week sprint
   - Score 75-90: 8-week sprint
   - Score < 75: 12-week sprint or postpone audit
4. **Execute sprint** per [references/evidence-collection-sprint-plan.md](references/evidence-collection-sprint-plan.md)
5. **Pre-audit checkpoint** with auditor 1 week before

---

## Common audit-prep failures

- **No designated audit owner.** Sprint flounders. Assign one person Day 1.
- **Treating evidence as one-time.** Type II requires controls operating over observation period. Evidence must accumulate continuously, not just at the end.
- **Untested backups.** Configuring backups isn't enough; you need restore test evidence.
- **Access review checked but not enforced.** Reviews happen; access not actually removed when flagged.
- **Vendor SOC 2 reports missing or stale.** Audit checks subservice org evidence.
- **No incident in observation period.** Looks suspicious to auditors. Either you had none (unusual) or you're not detecting them.
- **Late discovery of carve-out vs inclusive subservice orgs.** Re-scoping mid-sprint is painful.

---

## Tooling

| Script | Purpose |
|--------|---------|
| `scripts/soc2_readiness_score.py` | Score current state (0-100) per TSC; identify pillars needing attention |
| `scripts/evidence_gap_finder.py` | Cross-reference required evidence vs collected; output gap list with priorities |

---

## References

- [soc2-pre-audit-punch-list.md](references/soc2-pre-audit-punch-list.md) — detailed punch list per TSC with evidence templates
- [evidence-collection-sprint-plan.md](references/evidence-collection-sprint-plan.md) — 4/8/12-week sprint plans with week-by-week deliverables

---

## Related skills

- `ra-qm-team/soc2-compliance-expert` — deep SOC 2 program management (multi-quarter)
- `ra-qm-team/audit-prep/compliance-readiness` — multi-framework readiness (SOC 2 + ISO 27001 + NIST)
- `ra-qm-team/infrastructure-compliance-auditor` — automated infra scanning for evidence
- `engineering/observability-designer` — logging / monitoring evidence

---

## soc2-compliance-expert

Source path: `references/ra-qm-team/soc2-compliance-expert/SKILL.md`

# SOC 2 Compliance Expert

SOC 2 Type I and Type II compliance management covering all Trust Services Criteria (TSC), infrastructure security validation, evidence collection, and end-to-end audit preparation.

---

## SOC 2 Overview

### Type I vs Type II

| Aspect | Type I | Type II |
|--------|--------|---------|
| Scope | Design of controls at a point in time | Design AND operating effectiveness over a period |
| Duration | Single date (snapshot) | Observation period (3-12 months, typically 6-12) |
| Cost | $20K-$60K (first audit) | $40K-$150K (first audit) |
| Timeline | 1-3 months | 6-15 months (includes observation period) |
| Customer Preference | Early-stage acceptable | Enterprise customers require |

Start with Type I to validate control design, then transition to Type II within 6 months.

### Trust Services Criteria Summary

| Category | Focus | Controls |
|----------|-------|----------|
| CC1-CC5 | Common Criteria (COSO-based) | Control environment, communication, risk, monitoring, control activities |
| CC6 | Logical and Physical Access | Authentication, authorization, physical security, encryption |
| CC7 | System Operations | Vulnerability management, monitoring, incident response, BCP |
| CC8 | Change Management | Authorization, testing, deployment controls |
| CC9 | Risk Mitigation | Vendor management, business disruption, risk transfer |
| A1 | Availability | Capacity planning, DR, recovery testing |
| PI1 | Processing Integrity | Data validation, error handling, reconciliation |
| C1 | Confidentiality | Classification, encryption, disposal |
| P1 | Privacy | Notice, consent, data subject rights, retention |

For detailed control requirements per category, see [REFERENCE.md](REFERENCE.md).

---

## Clarify First

Before running the readiness assessment, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Report type** — Type I (design at a point in time) vs Type II (operating effectiveness over a period) (sets the observation-period requirement and timeline)
- [ ] **TSC scope** — which criteria beyond mandatory Security (Availability, Processing Integrity, Confidentiality, Privacy) (drives which controls and evidence are needed)
- [ ] **Subservice organizations** — carve-out vs inclusive (affects the scope and system description)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the assessment.

## Readiness Assessment Workflow

The agent guides organizations through SOC 2 readiness from gap analysis through audit completion.

### Workflow: Phase 1 -- Gap Analysis (Weeks 1-4)

1. **Define scope** -- determine which TSC categories to include (Security is mandatory), define system boundaries, identify subservice organizations (carve-out vs. inclusive), document principal service commitments.
2. **Assess current state** -- inventory existing policies and procedures, map current controls to TSC requirements, interview process owners and control operators.
3. **Run automated gap analysis** using `scripts/soc2_readiness_checker.py`.
4. **Document gaps** -- missing controls, controls lacking evidence, controls not operating effectively.
5. **Prioritize** gaps by risk level and remediation effort.
6. **Validation checkpoint:** Gap analysis covers all in-scope TSC categories; each gap has severity rating and remediation owner assigned.

### Workflow: Phase 2 -- Remediation (Weeks 5-16)

1. **Develop/update policies** -- information security policy, supporting procedures per control domain, policy review and approval workflows.
2. **Implement technical controls** -- configure IdP with SSO/MFA enforcement, deploy endpoint security (MDM, EDR, disk encryption), implement SIEM logging and monitoring, configure backup and DR, harden cloud infrastructure.
3. **Establish processes** -- access review procedures, change management workflow, incident response procedures, vendor management program, security awareness training.
4. **Set up evidence collection** -- configure automated collection, establish repository structure, define refresh cadence per TSC category.
5. **Validation checkpoint:** All identified gaps remediated; technical controls verified via `scripts/soc2_infrastructure_auditor.py`; evidence collection producing artifacts.

### Workflow: Phase 3 -- Pre-Audit (Weeks 17-20)

1. **Conduct internal readiness assessment** -- mock audit against all in-scope TSC, validate evidence completeness and quality, run infrastructure auditor for technical validation.
2. **Remediate pre-audit findings** -- address remaining gaps, strengthen evidence.
3. **Select and engage CPA firm** -- negotiate scope, timeline, fees; schedule kickoff; prepare system description draft.
4. **Validation checkpoint:** Mock audit passes with no critical gaps; system description reviewed; auditor engaged.

### Workflow: Phase 4 -- Audit Execution

1. **Type I audit** (if applicable) -- auditor reviews control design; management provides assertions; address findings before Type II.
2. **Type II observation period** (3-12 months) -- controls operate consistently, evidence collected continuously, quarterly self-assessments, regular auditor check-ins.
3. **Fieldwork** (2-4 weeks) -- auditor selects samples, tests controls, interviews personnel; draft report review; final report issuance.
4. **Validation checkpoint:** Clean opinion received; any findings have management response and remediation plan.

---

## Evidence Collection Framework

### Evidence by TSC Category

| TSC | Evidence Type | Collection Method | Refresh |
|-----|---------------|-------------------|---------|
| CC1 | Code of conduct acknowledgments | HR system export | Annual |
| CC2 | Security awareness training records | LMS export | Ongoing |
| CC3 | Risk assessment report, risk register | GRC platform | Annual/Quarterly |
| CC4 | Penetration test reports, vulnerability scans | Third-party/scanner | Annual/Monthly |
| CC5 | Policy documents with version history | Policy management | Annual review |
| CC6 | Access reviews, MFA enrollment, offboarding | IAM/IdP/HRIS | Quarterly/Per event |
| CC7 | Vulnerability remediation, incident records | Ticketing/ITSM | Ongoing |
| CC8 | Change tickets with approvals, code reviews | ITSM/Git | Per change |
| CC9 | Vendor risk assessments, vendor SOC 2 reports | GRC platform | Annual |
| A1 | Uptime reports, DR tests, backup logs | Monitoring/backup | Monthly/Semi-annual |
| PI1 | Data validation/reconciliation reports | Application logs | Per process |
| C1 | Data classification inventory, encryption configs | Manual/automated | Annual/Quarterly |
| P1 | PIAs, DSR response tracking | Privacy tool | Per event |

### Example: Evidence Collection Command

```bash
# Generate evidence checklist for all TSC categories
python scripts/evidence_collector.py --generate-checklist --categories all

# Track evidence status
python scripts/evidence_collector.py --status evidence-tracker.json

# Update specific evidence item
python scripts/evidence_collector.py --update evidence-tracker.json \
  --item CC6.1-MFA --status collected

# Generate readiness dashboard
python scripts/evidence_collector.py --dashboard evidence-tracker.json

# Export for auditor review
python scripts/evidence_collector.py --export evidence-tracker.json --format json
```

### Automation Strategies

**GRC Platforms:** Vanta, Drata, Secureframe, Laika, AuditBoard -- automated evidence collection via API integrations, continuous control monitoring, auditor collaboration portals.

**Infrastructure-as-Evidence:** Cloud configuration snapshots (AWS Config, Azure Policy, GCP Org Policies), Terraform state as configuration evidence, Git history as change management evidence, CI/CD pipeline logs as deployment control evidence.

---

## Infrastructure Security Validation

The agent validates infrastructure configurations against SOC 2 requirements.

### Quick Reference: Infrastructure Checks

| Domain | Key Checks | SOC 2 Mapping |
|--------|-----------|---------------|
| Cloud (AWS/Azure/GCP) | Encryption, IAM, logging, network, backup, secrets | CC6, CC7, A1, C1 |
| DNS | SPF, DKIM, DMARC, DNSSEC, CAA | CC6.6, CC2.2 |
| TLS/SSL | TLS 1.2+, AEAD ciphers, HSTS, auto-renewal | CC6.7 |
| Endpoint | MDM, disk encryption, EDR, patching, screen lock | CC6.1, CC6.8, CC7.1 |
| Network | Segmentation, WAF, DDoS, VPN/ZTNA, egress filtering | CC6.6, A1.1 |
| Container | Image scanning, minimal base, no privileged, RBAC | CC6.1, CC7.1 |
| CI/CD | Signed commits, branch protection, SAST/DAST, SBOM | CC7.1, CC8.1 |
| Secrets | Vault storage, rotation policies, git scanning | CC6.1 |

For detailed per-provider control mappings, see [REFERENCE.md](REFERENCE.md#infrastructure-security-checks).

### Example: Infrastructure Audit Command

```bash
# Full infrastructure audit
python scripts/soc2_infrastructure_auditor.py --config infra-config.json

# Audit specific domains only
python scripts/soc2_infrastructure_auditor.py --config infra-config.json \
  --domains dns tls cloud

# JSON output with severity ratings
python scripts/soc2_infrastructure_auditor.py --config infra-config.json --format json

# Generate sample configuration template
python scripts/soc2_infrastructure_auditor.py --generate-template
```

---

## Audit Timeline

### Typical Timeline (First SOC 2)

| Phase | Duration | Activities |
|-------|----------|------------|
| Scoping | 2-4 weeks | Define TSC, system boundaries, auditor selection |
| Gap Analysis | 2-4 weeks | Assess current controls, identify gaps |
| Remediation | 8-16 weeks | Implement missing controls, policies, procedures |
| Type I Audit | 2-4 weeks | Point-in-time control design assessment |
| Type II Observation | 3-12 months | Controls operate, evidence collected continuously |
| Type II Fieldwork | 2-4 weeks | Auditor testing, evidence review, interviews |
| Report Issuance | 2-4 weeks | Draft review, management response, final report |

### Annual Renewal

- Begin renewal planning 3 months before observation period ends
- Maintain continuous compliance between audit periods
- Address prior-year findings before new observation period
- Bridge letters available for gaps between reports

---

## Incident Response Requirements

### IRP Structure

1. **Preparation** -- IR team defined, communication channels established, runbooks for common incidents, legal/PR contacts on retainer.
2. **Detection and Analysis** -- monitoring/alerting coverage, severity classification (SEV1-SEV4), triage procedures, escalation matrix.
3. **Containment, Eradication, Recovery** -- isolate affected systems, preserve evidence, identify root cause, restore and validate.
4. **Post-Incident** -- blameless post-mortem within 5 business days, lessons learned, control improvements, notification assessment (MTTD, MTTR, MTTC tracking).

For severity level definitions and breach notification timelines, see [REFERENCE.md](REFERENCE.md#incident-response-plan).

---

## Tools

### SOC 2 Readiness Checker

```bash
# Full readiness assessment
python scripts/soc2_readiness_checker.py --config org-controls.json

# JSON output for programmatic use
python scripts/soc2_readiness_checker.py --config org-controls.json --format json

# Check specific TSC categories
python scripts/soc2_readiness_checker.py --config org-controls.json \
  --categories security availability

# Include cloud provider control mapping
python scripts/soc2_readiness_checker.py --config org-controls.json --cloud-mapping
```

### Evidence Collector

```bash
# Generate checklist and track status
python scripts/evidence_collector.py --generate-checklist --categories all
python scripts/evidence_collector.py --status evidence-tracker.json
python scripts/evidence_collector.py --dashboard evidence-tracker.json
```

### Infrastructure Auditor

```bash
# Validate infrastructure against SOC 2 requirements
python scripts/soc2_infrastructure_auditor.py --config infra-config.json
python scripts/soc2_infrastructure_auditor.py --config infra-config.json --format json
```

---

## References

| Document | Description |
|----------|-------------|
| [REFERENCE.md](REFERENCE.md) | Detailed TSC controls, infrastructure checks, access control specs, vendor management, training, IRP, BC/DR |
| [Trust Services Criteria Guide](references/trust-services-criteria-guide.md) | Complete TSC reference with control objectives and audit questions |
| [Infrastructure Security Controls](references/infrastructure-security-controls.md) | Cloud, DNS, TLS, endpoint, container, CI/CD security configurations |
| [Audit Preparation Playbook](references/audit-preparation-playbook.md) | End-to-end audit prep guide with timelines, checklists, cost estimation |

---

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Readiness checker scores are 0% across all categories | Controls JSON missing `config_key` values or all set to false | Verify the input JSON maps each TSC control to a boolean value under the correct `config_key`. Run `--generate-sample > sample-config.json` to see the expected structure. |
| Infrastructure auditor reports all checks as "fail" | Infrastructure config JSON is empty or uses wrong key names | Run `--generate-template` to produce a valid template. Populate DNS, TLS, cloud, endpoint, and other sections with actual infrastructure state. |
| Evidence collector checklist missing categories | `--categories` flag filtering output | Use `--categories all` to generate the complete checklist. Available categories: `security`, `availability`, `processing_integrity`, `confidentiality`, `privacy`. |
| Evidence tracker status not updating | Tracker file path incorrect or file not writable | Verify the path passed to `--status` or `--update` points to an existing tracker JSON file. Check file permissions. |
| Cloud mapping not appearing in readiness report | `--cloud-mapping` flag not included | Add `--cloud-mapping` to the readiness checker command to include AWS/Azure/GCP control mappings in the output. |
| Type II observation period too short for auditor | Observation period is less than 3 months | Most CPA firms require a minimum 3-month observation period for Type II. A 6-12 month period carries more weight. Plan the observation window during the scoping phase. |
| Auditor requests evidence not in the tracker | Evidence catalog does not cover all TSC subcriteria for the selected scope | Supplement the auto-generated checklist with auditor-specific evidence requests. Each CPA firm may have additional requirements beyond the standard TSC evidence items. |

---

## Success Criteria

- SOC 2 scope defined with all applicable TSC categories selected, system boundaries documented, and subservice organizations identified (carve-out vs inclusive)
- Gap analysis completed with every identified gap assigned a severity rating, remediation owner, and target completion date
- Readiness score of 80%+ across all in-scope TSC categories before engaging the CPA firm, trending to 95%+ before Type II fieldwork
- Evidence collection framework operational with centralized repository, defined refresh cadence per TSC category, and automated collection where possible
- Infrastructure audit passes with no critical or high-severity findings in DNS, TLS, cloud, endpoint, or access control domains
- Type II observation period of at least 6 months with continuous control operation, quarterly self-assessments, and no significant control failures
- Clean SOC 2 Type II opinion received with any findings addressed by management response and documented remediation plans

---

## Scope & Limitations

**In Scope:**
- SOC 2 Type I and Type II readiness assessment against all TSC categories (CC1-CC9, A1, PI1, C1, P1)
- Infrastructure security validation (DNS, TLS, cloud, endpoint, network, container, CI/CD, secrets)
- Evidence collection framework generation and tracking
- Gap analysis with severity-rated findings and remediation guidance
- Audit timeline planning and CPA firm engagement preparation
- Incident response plan structure and requirements
- Continuous compliance program design

**Out of Scope:**
- CPA firm audit execution (the tools prepare for audit; the actual Type I/II report requires an independent CPA firm)
- SOC 1 (ICFR) assessment (SOC 1 covers financial reporting controls, not security/availability/privacy)
- SOC 3 report generation (SOC 3 is a public-facing summary derived from SOC 2; it requires a completed SOC 2 audit)
- Penetration testing execution (use infrastructure-compliance-auditor or engage a third-party pentest firm)
- GRC platform selection or implementation (the skill is compatible with Vanta, Drata, Secureframe, etc., but does not implement them)
- Legal advice on customer contractual requirements for SOC 2 reports
- Physical security assessments (the infrastructure auditor covers logical controls; physical data center audits require on-site assessment)

---

## Integration Points

| Skill | Integration |
|-------|------------|
| [infrastructure-compliance-auditor](../infrastructure-compliance-auditor/) | Provides Vanta-level infrastructure checks across cloud, DNS, TLS, endpoints, access controls, and CI/CD that map directly to SOC 2 TSC requirements |
| [nist-csf-specialist](../nist-csf-specialist/) | NIST CSF functions map to SOC 2 TSC categories; use the control mapper to build unified control matrices for organizations pursuing both |
| [information-security-manager-iso27001](../information-security-manager-iso27001/) | ISO 27001 Annex A controls provide a management system backbone that satisfies many SOC 2 requirements; shared evidence reduces audit burden |
| [pci-dss-specialist](../pci-dss-specialist/) | PCI DSS requirements overlap with SOC 2 CC6 (access), CC7 (operations), CC8 (change management); shared controls for payment-processing organizations |
| [gdpr-dsgvo-expert](../gdpr-dsgvo-expert/) | GDPR requirements align with SOC 2 Privacy (P1) criteria; organizations processing EU personal data can leverage shared privacy controls |
| [nis2-directive-specialist](../nis2-directive-specialist/) | NIS2 minimum security measures overlap with SOC 2 security criteria; EU entities can map shared incident response, access control, and encryption controls |

---

## Tool Reference

### soc2_readiness_checker.py

Evaluates organizational controls against SOC 2 Trust Services Criteria with per-category scoring.

| Flag | Required | Description |
|------|----------|-------------|
| `--config` | Yes (or `--generate-sample`) | Path to organization controls JSON file with boolean values for each TSC control |
| `--format` | No | Output format: `json` for structured output, omit for human-readable text |
| `--categories` | No | Space-separated TSC categories to assess (e.g., `security availability`). Omit for all. |
| `--cloud-mapping` | No | Include cloud provider (AWS/Azure/GCP) control mappings in the output |
| `--generate-sample` | No | Generate a sample controls JSON template (pipe to file with `> sample-config.json`) |

### evidence_collector.py

Generates evidence collection checklists and tracks evidence gathering status.

| Flag | Required | Description |
|------|----------|-------------|
| `--generate-checklist` | No | Generate an evidence collection checklist for the specified categories |
| `--categories` | No | Space-separated TSC categories: `security`, `availability`, `processing_integrity`, `confidentiality`, `privacy`, or `all` |
| `--status` | No | Path to evidence tracker JSON file to display collection status |
| `--update` | No | Path to evidence tracker JSON file to update (use with `--item` and `--status`) |
| `--item` | No | Evidence item identifier to update (e.g., `CC6.1-MFA`) |
| `--dashboard` | No | Path to evidence tracker JSON file to generate a readiness dashboard |
| `--export` | No | Path to evidence tracker JSON file to export |
| `--format` | No | Export format: `json` for structured output |

### soc2_infrastructure_auditor.py

Audits infrastructure configurations against SOC 2 requirements with severity-rated findings.

| Flag | Required | Description |
|------|----------|-------------|
| `--config` | Yes (or `--generate-template`) | Path to infrastructure configuration JSON file with DNS, TLS, cloud, endpoint, and other domain settings |
| `--format` | No | Output format: `json` for structured findings with severity ratings, omit for human-readable text |
| `--domains` | No | Space-separated infrastructure domains to audit (e.g., `dns tls cloud`). Omit for all domains. |
| `--generate-template` | No | Generate a sample infrastructure configuration template (pipe to file with `> infra-config.json`) |
