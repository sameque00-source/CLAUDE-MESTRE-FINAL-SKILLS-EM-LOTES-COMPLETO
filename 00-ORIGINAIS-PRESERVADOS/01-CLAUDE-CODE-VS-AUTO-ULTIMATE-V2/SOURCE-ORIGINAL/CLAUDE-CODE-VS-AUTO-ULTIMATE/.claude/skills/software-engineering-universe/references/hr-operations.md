# Domain: hr-operations
Source Skills in this domain: 4

---

## hr-business-partner

Source path: `references/hr-operations/hr-business-partner/SKILL.md`

# HR Business Partner

The agent operates as a strategic HRBP, partnering with business leaders to align people strategy with organizational goals across talent planning, performance management, employee relations, and compensation.

## Clarify First

Before generating the plan, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Business priority / strategic goal (next 1-4 quarters)** — drives the people plan's targets and gap analysis
- [ ] **Engagement (workforce plan, calibration, ER case, or comp/offer review)** — selects the framework and template
- [ ] **Current-state workforce data (headcount, voluntary vs regrettable attrition, engagement)** — the baseline for gap analysis (step 2)
- [ ] **Headcount / budget envelope** — bounds the hiring plan and succession depth

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

1. **Diagnose the business need** -- Meet with the business leader to understand their strategic priorities for the next 1-4 quarters. Identify people-related gaps: headcount, skills, retention, engagement, or organizational design.
2. **Assess current state** -- Pull workforce data: headcount, attrition rate, engagement scores, open roles, and performance distribution. Validate data accuracy before proceeding.
3. **Build the people plan** -- Develop a workforce plan using the template below. Include hiring targets, development investments, succession depth, and risk mitigation for attrition.
4. **Execute and advise** -- Partner with Talent Acquisition on hiring, run calibration sessions for performance, coach managers on difficult conversations, and resolve ER cases using the issue resolution framework.
5. **Measure and report** -- Track KPIs quarterly (see People Metrics). Present findings to leadership with recommendations.
6. **Iterate** -- Adjust the plan based on business changes, attrition trends, and engagement survey results.

> Checkpoint: After step 2, confirm that attrition data distinguishes voluntary from involuntary and regrettable from non-regrettable before planning.

## People Metrics

| Category | Metric | Formula / Source | Benchmark |
|----------|--------|-----------------|-----------|
| Headcount | Total HC | HRIS snapshot | -- |
| Attrition | Voluntary turnover | Voluntary exits / Avg HC x 100 | 10-15% |
| Attrition | Regrettable turnover | Regrettable exits / Total exits | < 30% |
| Hiring | Time to fill | Req open to offer accept | 30-45 days |
| Engagement | eNPS | Promoters - Detractors | 20-40 |
| Performance | High-performer ratio | Top-tier ratings / HC | 15-20% |
| Diversity | Representation | Demographic breakdown by level | Org-specific targets |
| Compensation | Compa-ratio | Actual pay / Band midpoint | 0.95-1.05 |

## Workforce Planning Template

```markdown
# Workforce Plan: [Department] -- [Year]

## Current State
- Headcount: [X]
- Open roles: [X]
- Voluntary attrition (trailing 12 mo): [X]%
- Engagement score: [X] / 100
- Regrettable turnover: [X]%

## Future State (12 months)
- Target headcount: [X] (growth: [X]%)
- Critical skills needed: [list]
- Organizational design changes: [if any]

## Gap Analysis
| Role / Skill | Current | Needed | Gap | Action |
|-------------|---------|--------|-----|--------|
| [Role A] | 3 | 5 | +2 | Hire Q1-Q2 |
| [Skill B] | Low proficiency | Intermediate | Gap | Training program |

## Hiring Plan
| Quarter | Roles | Headcount | Budget |
|---------|-------|-----------|--------|
| Q1 | [Roles] | [X] | $[Y] |
| Q2 | [Roles] | [X] | $[Y] |

## Succession Plan
| Critical Role | Incumbent | Ready Now | Ready 1-2 yr |
|---------------|-----------|-----------|--------------|
| [VP Engineering] | [Name] | [Name] | [Name, Name] |

## Risk Register
| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Key-person dependency | High | Critical | Cross-train 2 backups by Q2 |
| Attrition spike in Sales | Medium | High | Retention bonuses, stay interviews |
```

## Performance Management Cycle

| Quarter | Activity | HRBP Role |
|---------|----------|-----------|
| Q1 | Goal setting -- cascade company OKRs to individual goals | Review goal quality, ensure alignment |
| Q2 | Mid-year check-in -- progress review, feedback exchange | Coach managers on feedback delivery |
| Q3 | Ongoing development -- 1:1s, real-time feedback, training | Monitor development plan completion |
| Q4 | Year-end review -- self-assessment, manager assessment, calibration | Facilitate calibration, advise on ratings |

## Calibration Session Guide

1. **Prepare** -- Collect manager-submitted ratings. Flag outliers (> 40% top-tier or > 20% bottom-tier in any team). Pull performance data and promotion history.
2. **Facilitate** -- Walk through each team's distribution. Managers present evidence for outlier ratings. Challenge ratings that lack behavioral evidence.
3. **Align** -- Reach consensus on final ratings. Ensure the overall distribution is defensible (no forced curve, but consistent standards).
4. **Document** -- Record final ratings and rationale for any changes. Feed into compensation decisions.

> Checkpoint: Verify that every "exceeds expectations" rating has at least two documented behavioral examples before finalizing.

## Employee Relations: Issue Resolution Framework

1. **Listen** -- Hear the concern fully. Take notes. Acknowledge the employee's experience without making commitments.
2. **Investigate** -- Gather facts from all relevant parties. Review documentation, emails, and policies. Maintain confidentiality.
3. **Analyze** -- Identify root cause. Assess policy and legal implications (consult employment counsel if needed). Evaluate options.
4. **Resolve** -- Determine the appropriate action. Communicate the decision to all parties. Implement the resolution.
5. **Follow up** -- Check on the outcome within 2 weeks. Document the case. Identify systemic patterns that may need policy changes.

## Difficult Conversations Framework (SBI-E)

| Element | Description | Example |
|---------|-------------|---------|
| **Situation** | When and where | "In last Tuesday's team standup..." |
| **Behavior** | Observable action | "...you interrupted two colleagues mid-sentence." |
| **Impact** | Effect on team/work | "The team hesitated to share updates afterward." |
| **Expectation** | What needs to change | "Going forward, let each person finish before responding." |

## Example: Workforce Plan for a Scaling Engineering Org

```
CONTEXT
  Current: 45 engineers, 8% attrition, 3 open reqs, engagement 74/100
  Business goal: Launch 2 new products requiring +15 engineers in 12 months

WORKFORCE PLAN

  Gap Analysis:
    Frontend engineers: have 12, need 18 (+6)
    ML engineers: have 3, need 8 (+5)
    Engineering managers: have 5, need 7 (+2, promote from within if possible)
    Platform engineers: have 10, need 14 (+4)

  Hiring Plan:
    Q1: 5 hires (3 frontend, 2 ML) -- $25K recruiting cost
    Q2: 5 hires (2 ML, 2 platform, 1 frontend) -- $25K
    Q3: 4 hires (2 platform, 1 frontend, 1 ML) -- $20K
    Q4: 1 hire (manager backfill if internal promo) -- $5K

  Succession:
    Promote 2 senior engineers to EM by Q2 (already in leadership program)
    Backfill their IC roles in Q3

  Risks:
    ML talent market is tight -- offer 75th percentile comp, sign-on bonus
    2 senior engineers flagged as flight risk -- schedule stay interviews Q1

  Budget: $75K recruiting + $120K incremental comp (15 new heads, partial year)
```

## Compensation Philosophy

| Element | Approach |
|---------|----------|
| Market positioning | Target 50th-75th percentile for base; equity for upside |
| Pay components | Base (70%), variable/bonus (15%), equity (15%) |
| Pay decisions | Based on role level, performance, market data, internal equity |
| Review cadence | Annual merit cycle + promotion adjustments + market corrections |
| Transparency | Share band ranges with employees; publish leveling framework |

## Offer Approval Workflow

1. Recruiter proposes offer based on compensation band and candidate profile.
2. Hiring manager confirms level, scope, and team fit.
3. HRBP reviews for internal equity (compa-ratio within 0.90-1.10 for same level/geo).
4. Finance approves if above band midpoint or if headcount was not pre-approved.
5. Offer extended.

## Reference Materials

- `references/talent_planning.md` - Workforce planning guide
- `references/performance.md` - Performance management
- `references/employee_relations.md` - ER best practices
- `references/compensation.md` - Comp philosophy and guidelines

## Scripts

```bash
# Score organizational health from workforce metrics
python scripts/org_health_scorer.py --file org_metrics.csv
python scripts/org_health_scorer.py --file org_metrics.csv --json

# Analyze compensation for pay equity
python scripts/compensation_analyzer.py --file comp_data.csv
python scripts/compensation_analyzer.py --file comp_data.csv --json

# Generate workforce dashboard from HR data
python scripts/workforce_dashboard.py --file workforce.csv
python scripts/workforce_dashboard.py --file workforce.csv --json
```

## Troubleshooting

| Problem | Root Cause | Resolution |
|---------|-----------|------------|
| Business leaders treat HRBP as transactional HR | Unclear role definition, reactive posture, or lack of business acumen | Establish a formal operating model: 70% strategic / 30% operational; present quarterly people plans tied to business OKRs; delegate administrative tasks to HR shared services |
| Calibration sessions devolve into arguments | No shared rubric, manager defensiveness, or lack of pre-work | Require managers to submit ratings with 2+ behavioral evidence examples before the session; facilitate with a neutral framework; start with aligned ratings and work through outliers |
| Workforce plan disconnected from business strategy | HRBP not included in business planning, or plan built in isolation | Attend leadership team meetings; build workforce plan as an appendix to the business plan; tie every headcount request to a revenue or product milestone |
| High regrettable turnover in specific teams | Manager quality issues, compensation misalignment, or stalled career paths | Run stay interviews with high performers; analyze exit data by manager; benchmark comp by role and level; publish career ladders with clear promotion criteria |
| Employee relations cases escalate unnecessarily | Late intervention, poor documentation, or inconsistent policy application | Train managers on early issue identification; standardize the ER intake and investigation framework; conduct monthly ER case reviews to identify patterns |
| Performance review cycle seen as bureaucratic | Too many forms, unclear purpose, or ratings disconnected from comp | Simplify to a 2-page template; connect review outcomes directly to merit and promotion decisions; train managers on feedback delivery (SBI-E model) |
| Change management initiatives fail to stick | Insufficient sponsorship, poor communication cadence, or no measurement | Apply Kotter's 8-step model; secure visible executive sponsorship; communicate in 5+ channels; measure adoption at 30/60/90 days |

## Success Criteria

| Dimension | Metric | Target | Measurement |
|-----------|--------|--------|-------------|
| Strategic Impact | Business leader satisfaction with HRBP | > 4.0 / 5.0 | Annual stakeholder survey |
| Strategic Impact | % time spent on strategic activities | > 60% | HRBP time allocation self-report (quarterly) |
| Workforce Health | Voluntary attrition (supported business units) | < 12% annualized | HRIS termination data, voluntary flag |
| Workforce Health | Regrettable turnover | < 25% of total exits | HRIS termination data, regrettable flag |
| Workforce Health | Engagement score (supported BUs) | > 75 / 100 | Annual or semi-annual engagement survey |
| Performance | Calibration completion rate | 100% of BUs complete on schedule | HRIS performance cycle tracking |
| Performance | Performance distribution alignment | No team with > 40% top-tier or > 20% bottom-tier | Post-calibration distribution analysis |
| Compensation | Compa-ratio within band | 0.90-1.10 for 90%+ of employees | Quarterly comp analysis |
| ER Effectiveness | ER case resolution within SLA | > 90% resolved within 30 days | ER case management system |
| Development | Manager capability score | > 3.5 / 5.0 on upward feedback | 360 or upward feedback survey |

## Scope & Limitations

**In Scope:**
- Strategic workforce planning: headcount forecasting, gap analysis, succession planning
- Performance management cycle: goal setting, calibration facilitation, rating alignment
- Employee relations: intake, investigation, resolution, and pattern identification
- Compensation advisory: internal equity analysis, offer review, merit and promotion recommendations
- Manager coaching: difficult conversations, feedback delivery, team development
- Organizational design advisory: spans of control, reporting structure, team topology
- Change management support: stakeholder mapping, communication planning, adoption tracking

**Out of Scope:**
- Benefits plan design and administration (owned by Total Rewards / Benefits)
- Payroll processing and tax compliance (owned by Payroll)
- Learning and development program design (owned by L&D; HRBP identifies needs)
- Legal counsel on employment law matters (HRBP escalates to Legal)
- Recruiting execution (owned by Talent Acquisition; HRBP sets hiring priorities)
- HRIS system configuration and administration (owned by HR Technology)

**Known Limitations:**
- Organizational health scoring is based on available metrics; cultural factors and informal dynamics require qualitative assessment alongside quantitative data
- Compensation analysis depends on accurate market data; benchmark sources (Radford, Mercer, Levels.fyi) should be refreshed at least annually
- The SBI-E framework works best for individualized feedback; systemic team issues require different interventions (team retrospectives, org design changes)
- HRBP effectiveness depends heavily on the quality of the business leader relationship; new partnerships require 1-2 quarters to reach full strategic impact

## Integration Points

| System / Skill | Integration | Data Flow |
|----------------|-------------|-----------|
| **HRIS** (Workday, BambooHR) | Headcount, attrition, performance ratings, compensation data | HRIS -> org_health_scorer.py, workforce_dashboard.py; HRBP recommendations -> HRIS updates |
| **People Analytics** skill | Workforce insights, attrition risk, engagement drivers, pay equity | Analytics insights -> HRBP strategic recommendations; HRBP questions -> analytics projects |
| **Talent Acquisition** skill | Hiring pipeline, offer approvals, headcount planning | HRBP workforce plan -> TA hiring targets; TA pipeline updates -> HRBP capacity planning |
| **Operations Manager** skill | Capacity planning, org structure, process efficiency | Ops headcount needs -> HRBP workforce plan; HRBP org design -> Ops team structure |
| **Finance** skill | Compensation budgets, headcount costs, merit pool allocation | Finance budget -> HRBP comp decisions; HRBP headcount plan -> Finance modeling |
| **C-Level Advisor** skill | Strategic workforce direction, org transformation, leadership succession | C-level priorities -> HRBP strategic plan; HRBP org health insights -> executive briefings |
| **Performance Platform** (Lattice, Culture Amp, 15Five) | Goal tracking, review cycles, calibration data | Platform -> performance metrics; calibration outcomes -> platform updates |
| **ER Case Management** (Ethena, NAVEX, HR Acuity) | Case intake, investigation tracking, resolution documentation | ER cases -> investigation workflow; resolution data -> pattern analysis |
| **Survey Platform** (Culture Amp, Qualtrics) | Engagement survey results, pulse check data | Survey data -> HRBP action planning; HRBP priorities -> survey design |

---

## operations-manager

Source path: `references/hr-operations/operations-manager/SKILL.md`

# Operations Manager

The agent operates as a senior operations manager, applying Lean Six Sigma, PDCA, and capacity-planning frameworks to drive measurable efficiency gains.

## Clarify First

Before generating the plan, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The operation/process in scope + its KPIs** — drives the baseline measurement (step 3); without a reliable data source per KPI the analysis is guesswork
- [ ] **Target/benchmark each KPI must hit** — defines the gap to close (step 4); without it there is no "improvement" to design
- [ ] **Engagement type (process redesign, capacity plan, vendor scorecard, or DMAIC project)** — selects which framework and template apply
- [ ] **Hard constraint (budget, headcount, timeline)** — bounds the improvement design and pilot scope

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

1. **Assess maturity** -- Classify the operation against the five-level maturity model (Reactive through Optimized). Record the current level and the evidence that supports the classification.
2. **Map the process** -- Document the target process using the process documentation template. Identify every decision point, handoff, and system dependency.
3. **Measure baseline** -- Capture KPIs: throughput, cycle time, first-pass yield, cost per unit, and utilization. Validate each metric has a reliable data source before proceeding.
4. **Analyze gaps** -- Run root-cause analysis (5 Whys or fishbone). Quantify the gap between baseline and target for each KPI.
5. **Design improvement** -- Propose changes using DMAIC or PDCA. Include a pilot scope, rollback criteria, and expected ROI.
6. **Implement and control** -- Execute the pilot, collect post-change metrics, and compare to baseline. If improvement meets threshold, standardize; otherwise iterate from step 4.

> Checkpoint: After step 3, confirm that every KPI has an owner and a data source before moving to analysis.

## Operations Maturity Model

| Level | Name | Characteristics |
|-------|------|-----------------|
| 1 | Reactive | Ad-hoc processes, hero-dependent, crisis management, limited visibility |
| 2 | Managed | Documented processes, basic metrics, standard procedures, some automation |
| 3 | Defined | Consistent processes, performance tracking, cross-functional coordination, continuous improvement |
| 4 | Measured | Data-driven decisions, predictive analytics, optimized workflows, proactive management |
| 5 | Optimized | Self-optimizing systems, innovation culture, industry-leading efficiency, strategic advantage |

## KPI Framework

| Category | Metric | Formula | Target |
|----------|--------|---------|--------|
| Efficiency | Utilization | Active time / Available time | 85%+ |
| Productivity | Output per FTE | Units / FTE hours | Varies |
| Quality | First-pass yield | Good units / Total | 95%+ |
| Speed | Cycle time | End time - Start time | Varies |
| Cost | Cost per unit | Total cost / Units | Varies |
| Customer | CSAT | Satisfied / Total responses | 90%+ |

## Process Documentation Template

```markdown
# Process: [Name]

- **Owner:** [Role]
- **Frequency:** [Daily / Weekly / On-demand]
- **Trigger:** [What starts this process]
- **Output:** [Deliverable or state change]

## Steps

| # | Action | Owner | Input | Output | SLA |
|---|--------|-------|-------|--------|-----|
| 1 | Receive request | Ops team | Ticket | Validated ticket | 1 hr |
| 2 | Validate request | Analyst | Validated ticket | Approved / Rejected | 2 hr |
| 3 | Execute action | Specialist | Approved ticket | Completed work | 4 hr |
| 4 | Notify requester | System | Completion record | Notification sent | 15 min |

## Decision Points

| Decision | Criteria | Yes Path | No Path |
|----------|----------|----------|---------|
| Valid request? | Meets intake checklist | Step 2 | Reject and notify |
| Approval required? | Value > $5K | Escalate to manager | Step 3 |

## Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Cycle time | < 8 hours | |
| Error rate | < 2% | |
| Volume | 50/day | |
```

## Example: DMAIC Cycle Time Reduction

A fulfillment team running 6.5-hour average cycle time against a 5-hour target:

```
DEFINE
  Problem: Cycle time 30% above target (6.5 hr vs 5.0 hr)
  Scope: Order-to-ship for domestic orders
  Metric: Average cycle time, measured from ERP timestamps

MEASURE
  Baseline data (30 days, n=1200 orders):
    Mean: 6.5 hr | Median: 6.1 hr | P95: 9.8 hr
    Bottleneck: Pick-and-pack stage accounts for 55% of total time

ANALYZE
  5 Whys on pick-and-pack delay:
    1. Why slow? -> Pickers walk long distances
    2. Why long walks? -> Items stored alphabetically, not by frequency
    3. Why alphabetical? -> Legacy warehouse layout from 2019
  Root cause: Storage layout does not reflect current SKU velocity

IMPROVE
  Action: Re-slot top 20% SKUs (by volume) to Zone A near packing stations
  Pilot: 2-week trial on Aisle 1-3
  Expected result: 25% reduction in pick time

CONTROL
  Post-pilot (14 days, n=580 orders):
    Mean: 4.8 hr | Median: 4.5 hr | P95: 7.2 hr
  Result: 26% reduction -- standardize across all aisles
  Control: Weekly cycle-time dashboard with alert at > 5.5 hr
```

## Capacity Planning

```
Capacity Required = Forecast Volume x Time per Unit
Capacity Available = FTE x Hours per Day x Productivity Factor

Gap = Required - Available

Planning Horizons:
  Daily    -> Staff scheduling, shift adjustments
  Weekly   -> Workload balancing across teams
  Monthly  -> Temp staffing, overtime authorization
  Quarterly -> Hiring plans, cross-training programs
  Annual   -> Strategic workforce and capex planning
```

## Vendor Scorecard

| Dimension | Weight | Metrics |
|-----------|--------|---------|
| Quality | 30% | Defect rate (< 1%), first-pass acceptance (> 95%) |
| Delivery | 25% | On-time delivery (> 98%), lead time (< 5 days) |
| Cost | 20% | Price vs market (within 5%), invoice accuracy (> 99%) |
| Service | 15% | Response time (< 24 hr), issue resolution (< 48 hr) |
| Relationship | 10% | Communication quality, flexibility |

Score each metric 1-5. Weighted total determines vendor tier: 4.5+ = Strategic Partner, 3.5-4.4 = Preferred, below 3.5 = Under Review.

## Cost Breakdown Structure

```
DIRECT COSTS
  Labor: Wages + Benefits + Overtime
  Materials: Raw materials + Supplies
  Equipment: Depreciation + Maintenance

INDIRECT COSTS
  Overhead: Facilities + Utilities + Insurance
  Administrative: Management + Support staff

Cost per Unit = (Direct + Indirect) / Units Produced
```

## Continuous Improvement: PDCA

1. **Plan** -- Identify the opportunity, analyze the current state, set an improvement target, develop the action plan.
2. **Do** -- Implement on a small scale, document observations, collect data.
3. **Check** -- Compare results to the target. If gap remains, perform root-cause analysis.
4. **Act** -- If successful, standardize and scale. If not, return to Plan with new hypotheses.

## Reference Materials

- `references/process_design.md` - Process design principles
- `references/lean_operations.md` - Lean methodology
- `references/vendor_management.md` - Vendor management guide
- `references/cost_optimization.md` - Cost reduction strategies

## Scripts

```bash
# Map and analyze business processes
python scripts/process_mapper.py --file process_steps.csv
python scripts/process_mapper.py --file process_steps.csv --json

# Resource capacity planning
python scripts/capacity_planner.py --file resources.csv --forecast demand.csv
python scripts/capacity_planner.py --file resources.csv --forecast demand.csv --json

# SLA compliance tracking
python scripts/sla_tracker.py --file tickets.csv
python scripts/sla_tracker.py --file tickets.csv --threshold 95 --json
```

## Troubleshooting

| Problem | Root Cause | Resolution |
|---------|-----------|------------|
| Cycle time increasing despite no volume change | Process drift, undocumented workarounds, or degraded tooling | Re-map the current process against documented standard; look for unofficial steps added over time; check system performance and integration latency |
| First-pass yield dropping below 95% | Training gaps, unclear specifications, or upstream quality issues | Run a fishbone analysis on defect categories; check if the issue correlates with new hires (training) or specific inputs (upstream); add quality gates at handoff points |
| Utilization consistently above 95% | Understaffing, poor demand forecasting, or inability to say no to ad-hoc requests | Sustained >95% utilization causes burnout and errors; hire or cross-train to reach 85% target; implement demand prioritization with SLA tiers |
| SLA compliance below target | Unrealistic SLAs, inconsistent triage, or capacity bottlenecks | Audit SLA definitions against actual capability; implement priority-based routing; add escalation triggers at 70% of SLA elapsed time |
| Cost per unit rising | Volume decline (fixed cost spread), scope creep, or vendor price increases | Decompose costs into fixed and variable; benchmark vendor costs annually; eliminate non-value-add process steps identified through value stream mapping |
| Cross-functional handoffs cause delays | No clear ownership at boundaries, different systems, or misaligned SLAs | Define RACI for every handoff; align upstream/downstream SLAs; implement handoff checklists with automated notifications |
| Improvement projects fail to sustain gains | No control plan, missing ownership, or competing priorities | Every DMAIC project must include a Control phase with dashboards, alert thresholds, and a named process owner; conduct 30/60/90 day post-implementation reviews |

## Success Criteria

| Dimension | Metric | Target | Measurement |
|-----------|--------|--------|-------------|
| Efficiency | Process cycle time | Within 10% of target for each process | ERP/workflow system timestamps |
| Efficiency | Resource utilization | 80-90% (avoid burnout above 95%) | Time tracking / capacity planning tool |
| Quality | First-pass yield | > 95% | Quality inspection data or error logs |
| Quality | Error/rework rate | < 2% | Defect tracking system |
| Cost | Cost per unit trend | Year-over-year reduction of 3-5% | Finance cost allocation reports |
| Cost | Budget variance | Within +/- 5% of plan | Monthly budget vs actual reporting |
| Customer | Internal CSAT | > 90% satisfied | Quarterly internal customer survey |
| Customer | SLA compliance | > 95% of commitments met | SLA tracking dashboard |
| Delivery | On-time delivery | > 98% | Order/ticket completion timestamps |
| Maturity | Operations maturity level | Advance 1 level per 12-18 months | Annual self-assessment against the Operations Maturity Model |
| Improvement | Completed improvement projects | 4+ DMAIC/PDCA cycles per year | Project tracking log |

## Scope & Limitations

**In Scope:**
- Process documentation, mapping, and optimization using Lean Six Sigma, DMAIC, and PDCA methodologies
- Capacity planning: demand forecasting, resource allocation, utilization tracking, and scenario modeling
- KPI framework design: defining, measuring, and reporting operational metrics
- SLA definition, tracking, compliance reporting, and escalation management
- Vendor management: scorecard design, performance evaluation, and relationship tiering
- Cost analysis: cost breakdown structures, cost-per-unit tracking, and reduction initiatives
- Continuous improvement: root cause analysis (5 Whys, fishbone), pilot design, and control plans

**Out of Scope:**
- IT infrastructure and systems administration (owned by IT Operations / SRE)
- Financial budgeting and capital expenditure approval (owned by Finance)
- HR policy creation and employee relations (owned by HRBP)
- Product development and engineering processes (owned by Engineering)
- Legal and regulatory compliance interpretation (owned by Legal / RA-QM)
- Supply chain logistics and procurement contract negotiation (owned by Supply Chain)

**Known Limitations:**
- Capacity planning accuracy depends on forecast quality; garbage-in-garbage-out applies strongly here
- Process mapping captures the designed flow; actual execution may differ due to informal workarounds -- validate with process observation
- Vendor scorecards are only as good as the data collection discipline; automate data feeds where possible
- SLA compliance tracking requires consistent timestamping; manual logging introduces measurement error
- Cost per unit calculations assume stable product/service definitions; changes in scope require rebasing

## Integration Points

| System / Skill | Integration | Data Flow |
|----------------|-------------|-----------|
| **ERP / Workflow** (SAP, Oracle, ServiceNow) | Process execution data, timestamps, volume metrics | ERP -> process_mapper.py, capacity_planner.py; optimization recommendations -> ERP workflow configuration |
| **Ticketing** (Jira Service Management, Zendesk) | Ticket lifecycle, SLA timestamps, resolution data | Ticketing -> sla_tracker.py; SLA breach alerts -> escalation workflows |
| **HR Business Partner** skill | Headcount planning, organizational design, team capacity | HRBP workforce plan -> capacity_planner.py; Ops capacity gaps -> HRBP hiring requests |
| **Talent Acquisition** skill | Hiring timelines for capacity gaps, onboarding scheduling | Ops capacity needs -> TA hiring priorities; TA hire dates -> Ops staffing plans |
| **People Analytics** skill | Productivity metrics, utilization data, workforce forecasting | Ops KPI data -> analytics models; analytics forecasts -> capacity planning inputs |
| **Finance** skill | Budget tracking, cost allocation, vendor spend analysis | Finance actuals -> cost analysis; Ops budget requests -> Finance approval |
| **Project Management** skill | Resource allocation across projects, milestone tracking | PM resource needs -> capacity_planner.py; Ops capacity data -> PM resource planning |
| **BI Platform** (Tableau, Looker, Power BI) | Operational dashboards, real-time monitoring, alerting | Ops metrics -> BI dashboards; alert thresholds -> automated notifications |
| **Vendor Management** (Coupa, SAP Ariba) | Vendor performance data, contract terms, spend analytics | Vendor data -> scorecard evaluation; scorecard results -> procurement decisions |

---

## people-analytics

Source path: `references/hr-operations/people-analytics/SKILL.md`

# People Analytics

The agent operates as a senior people analytics partner, translating workforce data into actionable insights using statistical modeling, segmentation analysis, and data governance best practices.

## Clarify First

Before generating the analysis, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Business question + success metric** — frames the entire analysis (step 1); a vague question yields an unfocused output
- [ ] **Analysis type (descriptive, attrition risk, pay equity, or engagement driver)** — selects the method and which script applies
- [ ] **Available data sources + their quality/completeness** — determines which method is even possible (step 2)
- [ ] **Segments + privacy threshold (minimum group size)** — drives segmentation and the anonymization/aggregation applied

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

1. **Frame the question** -- Clarify the business question with the HR or business stakeholder. Examples: "Why is Sales attrition 2x the company average?" or "Are we paying equitably across gender?" Define the success metric for the analysis.
2. **Assess data readiness** -- Identify required data sources (HRIS, ATS, survey platform, payroll). Check for completeness, recency, and quality. Flag any gaps before proceeding.
3. **Analyze** -- Apply the appropriate method from the analytics toolkit (descriptive stats, regression, classification, segmentation). Document assumptions and limitations.
4. **Validate findings** -- Sense-check results with domain experts (HRBPs, managers). Test for statistical significance and practical significance. Check predictive models for bias across protected groups.
5. **Recommend** -- Translate findings into 2-3 specific, actionable recommendations with expected impact and cost.
6. **Deliver and monitor** -- Present insights using the dashboard framework. Set up ongoing monitoring for key metrics with alert thresholds.

> Checkpoint: After step 2, confirm that all data has been anonymized or aggregated to comply with privacy policy before analysis begins.

## Analytics Maturity Model

| Level | Name | Capabilities | Typical Questions Answered |
|-------|------|-------------|---------------------------|
| 1 | Operational Reporting | Headcount, compliance, ad-hoc queries | "How many people do we have?" |
| 2 | Advanced Reporting | Dashboards, trends, benchmarking, segmentation | "How has attrition changed by quarter?" |
| 3 | Analytics | Statistical analysis, correlation, root cause | "What drives attrition in Sales?" |
| 4 | Predictive | Turnover prediction, performance modeling, risk scoring | "Who is likely to leave in the next 6 months?" |
| 5 | Prescriptive | Automated recommendations, real-time interventions | "What should we do to retain this person?" |

## Core HR Metrics

### Workforce Metrics

| Metric | Formula | Benchmark |
|--------|---------|-----------|
| Turnover Rate | (Separations / Avg HC) x 100 | 10-15% |
| Retention Rate | (Retained / Starting HC) x 100 | 85-90% |
| Time to Fill | Days from req open to offer accept | 30-45 days |
| Cost per Hire | Total recruiting cost / Hires | $3-5K |
| Regrettable Turnover | Regrettable exits / Total exits | < 30% |

### Performance Metrics

| Metric | Formula | Benchmark |
|--------|---------|-----------|
| High Performers | % rated top tier | 15-20% |
| Goal Completion | Goals achieved / Goals set | 80%+ |
| Promotion Rate | Promotions / Headcount | 8-12% |

### Engagement Metrics

| Metric | Formula | Benchmark |
|--------|---------|-----------|
| eNPS | Promoters % - Detractors % | 20-40 |
| Engagement Score | Survey composite (1-100) | 70%+ |
| Absenteeism | Absent days / Work days | < 3% |

## Turnover Prediction Model

```python
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

def build_turnover_model(employee_data: pd.DataFrame) -> dict:
    """
    Build and evaluate a turnover prediction model.

    Input: DataFrame with columns for features + 'left_company' (0/1).
    Output: dict with model, feature importance, and evaluation metrics.
    """
    features = [
        'tenure_months', 'salary_ratio_to_market', 'performance_rating',
        'months_since_last_promotion', 'manager_tenure', 'team_size',
        'engagement_score', 'training_hours_ytd', 'projects_completed'
    ]

    X = employee_data[features]
    y = employee_data['left_company']

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    report = classification_report(y_test, y_pred, output_dict=True)

    importance = (
        pd.DataFrame({'feature': features, 'importance': model.feature_importances_})
        .sort_values('importance', ascending=False)
    )

    return {'model': model, 'importance': importance, 'evaluation': report}


def score_flight_risk(model, current_employees: pd.DataFrame) -> pd.DataFrame:
    """
    Score current employees for flight risk.

    Returns DataFrame with employee_id, flight_risk_score (0-1), and risk_level.
    """
    probabilities = model.predict_proba(current_employees[model.feature_names_in_])[:, 1]

    risk_levels = pd.cut(
        probabilities,
        bins=[0, 0.25, 0.50, 0.75, 1.0],
        labels=['Low', 'Medium', 'High', 'Critical']
    )

    return pd.DataFrame({
        'employee_id': current_employees['employee_id'],
        'flight_risk_score': probabilities.round(3),
        'risk_level': risk_levels
    }).sort_values('flight_risk_score', ascending=False)
```

## Example: Sales Attrition Root-Cause Analysis

```
QUESTION
  Sales voluntary turnover is 22% vs 12% company average. Why?

DATA
  Source: HRIS + engagement survey + exit interviews (n=45 exits, trailing 12 mo)

ANALYSIS
  Segmentation by tenure band:
    < 1 yr: 35% of exits (onboarding/ramp issues)
    1-2 yr: 40% of exits (comp dissatisfaction + career path)
    2+ yr: 25% of exits (manager relationship)

  Regression on exit survey scores (n=38 respondents):
    Top drivers of intent-to-leave:
      1. "I am paid fairly" (beta = -0.42, p < 0.01)
      2. "I see a career path here" (beta = -0.31, p < 0.01)
      3. "My manager supports my development" (beta = -0.28, p < 0.05)

  Compensation benchmark:
    Sales IC3 compa-ratio: 0.88 (12% below midpoint)
    Sales IC2 compa-ratio: 0.91 (9% below midpoint)
    Rest of company average: 0.98

FINDINGS
  1. Sales comp is significantly below market, especially at IC2-IC3
  2. No defined career ladder for Sales ICs beyond IC3
  3. New hires (< 1 yr) leaving due to unrealistic ramp expectations

RECOMMENDATIONS
  1. Market adjustment: Bring Sales IC2-IC3 to 95th percentile compa-ratio ($180K budget)
  2. Publish a Sales career ladder through IC5 with clear promotion criteria
  3. Redesign onboarding: extend ramp period from 30 to 90 days with milestone targets

EXPECTED IMPACT
  Reduce Sales attrition from 22% to 14-16% within 12 months
  ROI: $180K adjustment saves ~$450K in replacement costs (10 fewer exits x $45K/hire)
```

## Pay Equity Analysis

```python
import pandas as pd
import statsmodels.api as sm

def analyze_pay_equity(employee_data: pd.DataFrame) -> dict:
    """
    Conduct pay equity analysis controlling for legitimate pay factors.

    Returns raw gap, adjusted gap, model fit, and employees flagged for review.
    """
    # Raw gap
    avg_by_gender = employee_data.groupby('gender')['salary'].mean()
    raw_gap = (avg_by_gender['Female'] - avg_by_gender['Male']) / avg_by_gender['Male']

    # Adjusted gap (control for level, tenure, performance, location)
    controls = pd.get_dummies(
        employee_data[['job_level', 'tenure_years', 'performance_rating', 'department', 'location']],
        drop_first=True
    )
    controls = sm.add_constant(controls)
    controls['is_female'] = (employee_data['gender'] == 'Female').astype(int)

    model = sm.OLS(employee_data['salary'], controls).fit()
    adjusted_gap = model.params['is_female']

    # Flag outliers (residual > 2 std dev)
    employee_data['predicted'] = model.predict(controls)
    employee_data['residual'] = employee_data['salary'] - employee_data['predicted']
    threshold = 2 * employee_data['residual'].std()
    flagged = employee_data[abs(employee_data['residual']) > threshold]

    return {
        'raw_gap_pct': round(raw_gap * 100, 1),
        'adjusted_gap_usd': round(adjusted_gap, 0),
        'model_r_squared': round(model.rsquared, 3),
        'employees_flagged': len(flagged),
        'flagged_details': flagged[['employee_id', 'salary', 'predicted', 'residual']]
    }
```

## Engagement Survey Analysis

1. **Calculate response rate** -- Target 80%+ for statistical validity. Flag departments below 60%.
2. **Compute category scores** -- Average Likert responses by category (Manager, Growth, Culture, Compensation). Compare to prior period.
3. **Run driver analysis** -- Regress category scores against overall engagement to identify which categories have the highest impact on engagement.
4. **Segment** -- Break results by department, level, tenure band, and location. Identify where scores diverge most from company average.
5. **Prioritize** -- Plot categories on a 2x2 matrix (Impact vs Score). "High impact, low score" quadrant = priority action areas.

> Checkpoint: Suppress results for any segment with fewer than 5 respondents to protect anonymity.

## DEI Metrics Framework

| Domain | Metrics | Data Source |
|--------|---------|-------------|
| Representation | Gender / ethnicity distribution by level | HRIS |
| Pay equity | Raw gap, adjusted gap (controlled regression) | Payroll + HRIS |
| Progression | Promotion rates by demographic group | HRIS |
| Hiring | Offer and accept rates by demographic group | ATS |
| Inclusion | Inclusion index, belonging score, psychological safety | Survey |

## Data Governance Checklist

Before starting any people analytics project:

- [ ] Business question and purpose clearly documented
- [ ] Data minimization applied (only collect what is needed)
- [ ] Privacy impact assessment completed
- [ ] Anonymization or aggregation applied where possible
- [ ] Predictive models tested for bias across protected groups
- [ ] Role-based access controls implemented
- [ ] Data retention policy defined
- [ ] Employee communication planned (transparency principle)

## Reference Materials

- `references/hr_metrics.md` - Complete HR metrics guide
- `references/predictive_models.md` - Predictive modeling approaches
- `references/survey_design.md` - Survey methodology
- `references/data_ethics.md` - Ethical analytics practices

## Scripts

```bash
# Analyze engagement survey results with driver analysis
python scripts/survey_analyzer.py --file survey_results.csv
python scripts/survey_analyzer.py --file survey_results.csv --prior prior_survey.csv --json

# Score attrition risk from employee data
python scripts/attrition_predictor.py --file employees.csv
python scripts/attrition_predictor.py --file employees.csv --threshold 0.7 --json

# Workforce headcount planning calculations
python scripts/headcount_planner.py --file workforce.csv --growth 0.15 --attrition 0.12
python scripts/headcount_planner.py --file workforce.csv --growth 0.15 --attrition 0.12 --json
```

## Troubleshooting

| Problem | Root Cause | Resolution |
|---------|-----------|------------|
| Low survey response rate (< 70%) | Survey fatigue, lack of trust in anonymity, or no visible action from prior surveys | Shorten survey to 15-20 questions max; communicate anonymity safeguards clearly; publish and act on top 3 findings from prior survey before launching next one |
| Attrition model produces too many false positives | Overfitting on historical data, missing key features, or class imbalance | Add regularization; use SMOTE or class weights to handle imbalance; validate with cross-validation not just train/test split; include manager quality and comp-ratio as features |
| Stakeholders distrust analytics findings | Results contradict lived experience, or methodology is opaque | Present methodology transparently; validate findings with HRBPs before publishing; use confidence intervals not point estimates; start with descriptive analytics to build trust before predictive |
| Data quality issues across HRIS sources | Inconsistent coding, missing fields, stale records, or duplicate entries | Establish data governance council; define data owners per field; run quarterly data quality audits; build automated validation checks at ingestion |
| Privacy concerns block analysis | Insufficient anonymization, no consent framework, or regulatory gaps | Apply k-anonymity (minimum group size of 5); conduct privacy impact assessment before each project; engage Legal early; use aggregated data when individual-level is not required |
| Engagement scores are flat despite interventions | Measuring wrong drivers, action plans not executed, or survey is too generic | Run driver analysis to identify high-impact low-score areas; assign action owners with quarterly check-ins; customize survey questions by department or function |
| Leadership does not act on insights | Insights are too academic, lack business framing, or arrive too late | Lead with business impact (revenue, cost, risk); limit recommendations to 2-3 with clear owners and timelines; deliver insights within 2 weeks of data collection |

## Success Criteria

| Dimension | Metric | Target | Measurement |
|-----------|--------|--------|-------------|
| Data Quality | HRIS data completeness | > 95% of required fields populated | Quarterly data audit report |
| Data Quality | Data freshness | All records updated within 30 days | HRIS last-modified timestamps |
| Adoption | Stakeholder usage of dashboards | > 70% of HRBPs and VPs access monthly | Dashboard analytics / login tracking |
| Adoption | Insight-to-action rate | > 60% of recommendations result in initiatives | Quarterly tracking of recommendation outcomes |
| Accuracy | Attrition prediction precision | > 70% precision at 50% recall | Model evaluation against actuals (6-month lag) |
| Accuracy | Survey driver analysis validity | Top 3 drivers validated by qualitative data | Cross-reference with exit interviews and focus groups |
| Impact | Regrettable attrition reduction | 10-20% reduction within 12 months of intervention | HRIS voluntary termination data, regrettable flag |
| Impact | Time from question to insight | < 2 weeks for standard analyses | Request-to-delivery tracking |
| Compliance | Privacy incidents | Zero breaches of anonymity thresholds | Audit log of all queries; minimum group size enforcement |
| Maturity | Analytics maturity level progression | Advance 1 level per 12-18 months | Self-assessment against the Analytics Maturity Model |

## Scope & Limitations

**In Scope:**
- Workforce descriptive analytics: headcount, turnover, retention, demographics, tenure distribution
- Engagement survey design, analysis, driver identification, and benchmarking
- Attrition risk scoring using rule-based and statistical methods (standard library only)
- Pay equity analysis: raw gap, controlled gap, outlier flagging
- DEI metrics: representation, progression rates, hiring funnel equity
- Workforce planning: headcount forecasting, scenario modeling, gap analysis
- Dashboard design and KPI framework recommendations

**Out of Scope:**
- Real-time predictive models requiring ML frameworks (scikit-learn, TensorFlow) -- scripts use rule-based scoring for portability
- Sentiment analysis of free-text survey responses (requires NLP libraries)
- Individual employee profiling or surveillance -- all analysis uses aggregated or anonymized data
- HRIS system administration, data pipeline engineering, or ETL development
- Legal interpretation of pay equity findings (requires Employment Law counsel)
- Organizational network analysis requiring email/calendar metadata

**Known Limitations:**
- Attrition risk scoring in scripts uses weighted heuristics, not trained ML models; accuracy depends on feature quality and weight calibration
- Pay equity analysis in the SKILL.md examples requires statsmodels (external dependency); scripts use standard-library approximations
- Survey analysis assumes Likert scale (1-5) responses; other formats require preprocessing
- Small population segments (< 30) produce unreliable statistical results; flag these in reporting
- Historical data biases (e.g., biased performance ratings) propagate into predictive models if not addressed

## Integration Points

| System / Skill | Integration | Data Flow |
|----------------|-------------|-----------|
| **HRIS** (Workday, BambooHR, HiBob) | Employee master data, tenure, compensation, performance ratings | HRIS -> analytics data lake; analytics insights -> HRBP workforce plans |
| **ATS** (Greenhouse, Lever) | Hiring funnel data, source-of-hire, time-to-fill | ATS -> hiring analytics; quality-of-hire scoring feeds back to TA strategy |
| **Survey Platform** (Culture Amp, Qualtrics, Lattice) | Engagement survey responses, eNPS, pulse check data | Survey platform -> survey_analyzer.py; driver analysis -> action planning |
| **Talent Acquisition** skill | Hiring funnel metrics, source effectiveness, quality of hire | TA pipeline data -> analytics models; analytics insights -> sourcing optimization |
| **HR Business Partner** skill | Workforce planning inputs, org health scoring, retention strategy | Analytics insights -> HRBP recommendations; HRBP questions -> analytics projects |
| **Operations Manager** skill | Headcount forecasting, capacity planning, productivity metrics | Ops demand forecast -> headcount_planner.py; workforce metrics -> ops capacity models |
| **Finance** skill | Compensation budgets, cost modeling, headcount budget vs actual | Finance comp data -> pay equity analysis; headcount plan -> Finance budget model |
| **Payroll** (ADP, Gusto) | Compensation actuals, bonus payouts, overtime data | Payroll -> comp analysis; pay equity findings -> comp adjustment recommendations |
| **BI Platform** (Tableau, Looker, Power BI) | Dashboard hosting, self-service analytics, scheduled reporting | Analytics outputs -> BI dashboards; BI usage metrics -> adoption tracking |

---

## talent-acquisition

Source path: `references/hr-operations/talent-acquisition/SKILL.md`

# Talent Acquisition

The agent operates as a senior talent acquisition partner, applying structured hiring methodology to build high-performing teams efficiently and equitably.

## Clarify First

Before generating the artifact, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Role + level + must-have vs nice-to-have** — drives the job description, comp band, and scorecard competencies
- [ ] **Deliverable (job description, sourcing plan, interview scorecard, or funnel analysis)** — selects the template
- [ ] **Compensation band / budget** — drives the JD comp section and offer; also confirms the role is approved
- [ ] **Role type (tech vs non-tech, IC vs exec)** — sets the funnel benchmarks and source channel matrix

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

1. **Define the role** -- Collaborate with the hiring manager to draft a job description using the template below. Confirm level, compensation band, and must-have vs nice-to-have requirements. Validate that the role is approved and budgeted before proceeding.
2. **Build sourcing strategy** -- Select channels based on the role profile (see Source Channel Matrix). Set weekly outreach targets and pipeline stage goals.
3. **Screen candidates** -- Apply the structured phone screen framework. Score against must-have criteria. Pass or reject within 48 hours.
4. **Run interviews** -- Use competency-based scorecards. Every interviewer scores independently before the debrief to prevent anchoring bias.
5. **Extend offer** -- Follow the offer approval workflow. Present a verbal offer, handle negotiation, and send the written offer within 24 hours of verbal acceptance.
6. **Close and onboard** -- Confirm start date, initiate background check, and hand off to hiring manager with a 30-60-90 day plan.

> Checkpoint: After step 1, validate the job description against DEI inclusive language guidelines before posting.

## Hiring Funnel Metrics

| Stage | Metric | Benchmark |
|-------|--------|-----------|
| Application to Screen | Conversion rate | 40-50% |
| Screen to Interview | Conversion rate | 30-40% |
| Interview to Offer | Conversion rate | 15-25% |
| Offer to Accept | Acceptance rate | 80-90% |
| End-to-end | Time to fill | 30-45 days |
| End-to-end | Cost per hire | $3,000-5,000 |
| Post-hire | Quality of hire (90-day performance + retention) | 80%+ |

## Source Channel Matrix

| Channel | Best For | Cost | Quality | Typical Yield |
|---------|----------|------|---------|---------------|
| LinkedIn Recruiter | All roles | $$ | High | 8-12% response |
| Employee referrals | Culture-fit roles | $ | Highest | 40-60% interview rate |
| Job boards (Indeed, etc.) | Volume hiring | $$ | Medium | 2-5% qualified |
| Agencies | Specialized / executive | $$$ | High | 50-70% submit-to-interview |
| Events / meetups | Early career, niche | $$ | Medium | Relationship-driven |
| Direct sourcing | Executives, passive | $ | High | 5-10% response |

## Job Description Template

```markdown
# [Job Title] - [Level]

## About [Company]
[2-3 sentences: mission, stage, team size]

## The Role
[What the person will own and why it matters to the business]

## Responsibilities
- [Action verb] + [deliverable] + [impact]
- [Action verb] + [deliverable] + [impact]
- [Action verb] + [deliverable] + [impact]

## Requirements
**Must have:**
- [X] years in [domain]
- Demonstrated skill in [specific competency]

**Nice to have:**
- Experience with [tool/framework]
- Background in [adjacent domain]

## Compensation
- Base: $[min]-$[max]
- Equity: [details]
- Benefits: [highlights]

## Hiring Process
1. Application review (48 hr)
2. Recruiter screen (30 min)
3. Hiring manager interview (45 min)
4. Skills assessment (1-2 hr)
5. Final panel (2-3 hr)
6. Offer
```

## Compensation Band Framework

| Level | Title | Base Range | Equity | Total Comp Target |
|-------|-------|-----------|--------|-------------------|
| IC1 | Entry-level (0-2 yr) | $70-90K | $5-15K | $80-100K |
| IC2 | Mid-level (2-5 yr) | $90-120K | $15-30K | $105-140K |
| IC3 | Senior (5-8 yr) | $120-160K | $30-60K | $150-200K |
| IC4 | Staff (8-12 yr) | $160-200K | $60-120K | $220-300K |
| IC5 | Principal (12+ yr) | $200-250K | $120-200K | $320-420K |

Position within band based on: scope of role, candidate experience, internal equity, and market data percentile (target 50th-75th).

## Interview Scorecard

```markdown
# Scorecard: [Candidate] for [Role]

**Interviewer:** [Name]
**Date:** [Date]
**Stage:** [Phone Screen / Technical / Final]

## Competency Ratings (1-5 scale)

| Competency | Weight | Rating | Evidence |
|------------|--------|--------|----------|
| Technical depth | 40% | | [Specific example from interview] |
| Problem solving | 20% | | [Specific example from interview] |
| Communication | 20% | | [Specific example from interview] |
| Culture alignment | 20% | | [Specific example from interview] |

**Weighted Score:** [calculated]

## Recommendation
[ ] Strong Hire  [ ] Hire  [ ] No Hire  [ ] Strong No Hire

## Key Strengths
-

## Key Concerns
-
```

## Behavioral Interview Questions (STAR Format)

| Competency | Question |
|------------|----------|
| Leadership | Tell me about a time you led a team through a difficult situation. What was the outcome? |
| Problem Solving | Describe a complex problem you solved. Walk me through your approach step by step. |
| Collaboration | Give an example of a successful cross-functional project you contributed to. |
| Conflict Resolution | Tell me about a disagreement with a colleague and how you resolved it. |
| Resilience | Describe a time you failed. What did you learn and what did you do differently? |

## Example: Hiring Funnel Analysis

A company struggling with a 45-day time-to-fill and 65% offer acceptance rate:

```
DATA (Q4, 12 open reqs)
  Applications: 600
  Screened:     288 (48% pass rate)
  Interviewed:   86 (30% pass rate)
  Offers:        14 (16% pass rate)
  Accepted:       9 (64% acceptance -- below 80% benchmark)

BOTTLENECK ANALYSIS
  1. Offer acceptance (64%) -- 36% decline rate
     Root cause: Offers extended 5+ days after final interview.
     Candidates accept competing offers in the gap.

  2. Interview-to-offer (16%) -- slightly below benchmark
     Root cause: Panel interviews adding 7 days to process.

ACTIONS
  1. Compress offer timeline: verbal offer within 48 hr of final interview
  2. Replace 4-person panel with 2 focused 1:1s (saves 5 days)
  3. Add "warm close" step: recruiter checks candidate sentiment before offer

RESULT (Q1, 10 open reqs)
  Time to fill: 32 days (-29%)
  Offer acceptance: 85% (+21 points)
  Cost per hire: $3,800 (-15%)
```

## Offer Approval Workflow

1. Recruiter determines initial offer based on compensation band and candidate profile.
2. Hiring manager reviews and confirms level and scope alignment.
3. HRBP checks internal equity and budget availability.
4. Finance approves if offer exceeds band midpoint or total comp threshold.
5. Verbal offer extended. Written offer sent within 24 hours of verbal acceptance.

## Employer Value Proposition

Structure the EVP around five pillars:

| Pillar | Key Message | Proof Points |
|--------|-------------|--------------|
| Mission | Why the company exists | Customer impact stories |
| Culture | How the team works | Glassdoor rating, employee testimonials |
| Growth | Career development | Promotion rate, learning budget |
| Rewards | Total compensation | Comp percentile positioning, benefits |
| Flexibility | Work-life integration | Remote policy, PTO structure |

## Hiring Analytics

| Metric | Formula | Benchmark |
|--------|---------|-----------|
| Time to Fill | Req open date to offer accept date | 30-45 days |
| Time to Hire | First candidate contact to accept | 14-21 days |
| Cost per Hire | Total recruiting spend / Hires | $3-5K |
| Quality of Hire | (90-day performance + 1-yr retention) / 2 | 80%+ |
| Offer Accept Rate | Accepts / Offers extended | 85%+ |
| Source Effectiveness | Hires per source / Cost per source | Varies |

## Reference Materials

- `references/interviewing.md` - Interview best practices
- `references/sourcing.md` - Sourcing strategies
- `references/employer_brand.md` - Employer branding guide
- `references/dei_hiring.md` - Inclusive hiring practices

## Scripts

```bash
# Analyze job descriptions for bias, readability, and quality
python scripts/job_posting_analyzer.py --file job_description.md
python scripts/job_posting_analyzer.py --file job_description.md --json

# Track candidate pipeline funnel metrics
python scripts/candidate_pipeline_tracker.py --file pipeline.csv
python scripts/candidate_pipeline_tracker.py --file pipeline.csv --json

# Generate structured interview scorecards
python scripts/interview_scorecard.py --role "Senior Engineer" --level IC3
python scripts/interview_scorecard.py --role "Product Manager" --level IC2 --json
```

## Troubleshooting

| Problem | Root Cause | Resolution |
|---------|-----------|------------|
| Low application volume | Poor job distribution, weak employer brand, or overly narrow requirements | Audit posting reach across channels; A/B test job titles; reduce must-have requirements to true essentials (aim for 5-7 max) |
| High screen-to-interview drop-off | Misalignment between recruiter screen criteria and hiring manager expectations | Run a calibration session with the hiring manager before sourcing; agree on 3-4 non-negotiable criteria with concrete examples |
| Low offer acceptance rate (< 80%) | Slow offer turnaround, uncompetitive compensation, or poor candidate experience | Compress decision-to-offer to 48 hours; benchmark comp at 50th-75th percentile; add a "warm close" step where the recruiter gauges candidate sentiment before extending |
| High first-year attrition (> 20%) | Expectation mismatch during hiring, weak onboarding, or manager misalignment | Implement realistic job previews; extend structured onboarding to 90 days; pair new hires with a buddy |
| Interviewer inconsistency | No shared rubric, anchoring bias in debriefs, or untrained interviewers | Mandate independent scoring before debrief; train all interviewers on structured behavioral techniques; rotate interview panels quarterly |
| Diversity pipeline is thin | Over-reliance on referrals and single-channel sourcing | Add 2-3 diversity-focused sourcing channels; partner with ERGs for referrals; blind resume screening for initial pass |
| Candidate ghosting after interview | Lengthy process, lack of communication, or competing offers | Send status updates within 24 hours of each stage; target 5-day max between stages; collect feedback even from declined candidates |

## Success Criteria

| Dimension | Metric | Target | Measurement |
|-----------|--------|--------|-------------|
| Speed | Time to fill | < 35 days (tech), < 25 days (non-tech) | ATS req-open to offer-accept timestamps |
| Speed | Time to hire | < 18 days from first contact to accept | ATS candidate journey timestamps |
| Cost | Cost per hire | < $4,500 (direct roles), < $8,000 (agency) | Total recruiting spend / hires per quarter |
| Quality | Quality of hire | > 80% (90-day performance + 1-yr retention average) | HRIS performance data + retention tracking |
| Quality | Offer acceptance rate | > 85% | Offers accepted / offers extended |
| Quality | First-year retention | > 85% | New hires retained at 12 months / total hires |
| Experience | Candidate NPS (cNPS) | > 50 | Post-process candidate survey |
| Diversity | Diverse slate rate | 100% of final rounds include underrepresented candidates | ATS demographic flags (voluntary self-ID) |
| Efficiency | Recruiter capacity | 15-25 active reqs per recruiter | ATS workload reporting |
| Pipeline | Source channel yield | Top 3 channels produce > 60% of hires | Source-of-hire attribution in ATS |

## Scope & Limitations

**In Scope:**
- End-to-end recruiting workflow from requisition approval through offer acceptance
- Job description creation, sourcing strategy, screening, interviewing, and offer management
- Hiring funnel analytics, source channel effectiveness, and pipeline health reporting
- Employer branding strategy and candidate experience design
- Compensation band guidance for offer decisions
- DEI-focused hiring practices and inclusive language review

**Out of Scope:**
- Background check execution and adjudication (handled by third-party vendor + Legal)
- Immigration and visa sponsorship (requires Employment Law / Legal counsel)
- Onboarding program design beyond the hiring handoff (owned by HR Operations / L&D)
- Headcount budgeting and approval (owned by Finance + hiring manager)
- Employment contract drafting (owned by Legal)
- Internal mobility and transfer processes (owned by HRBP)

**Known Limitations:**
- Compensation benchmarks in this skill are illustrative; always validate against current market data from Radford, Mercer, or Levels.fyi before extending offers
- Funnel conversion benchmarks vary significantly by industry, geography, role type, and seniority level
- DEI metrics require voluntary self-identification data; coverage may be incomplete
- Quality of hire is a lagging indicator -- meaningful measurement requires 6-12 months post-hire

## Integration Points

| System / Skill | Integration | Data Flow |
|----------------|-------------|-----------|
| **ATS** (Greenhouse, Lever, Ashby) | Pipeline stages, candidate data, offer tracking | ATS -> funnel metrics, source attribution, time-to-fill |
| **HRIS** (Workday, BambooHR) | New hire records, headcount, compensation bands | HRIS -> internal equity checks; ATS -> HRIS on hire |
| **People Analytics** skill | Quality of hire scoring, attrition correlation, source ROI | TA pipeline data -> analytics models; analytics insights -> sourcing strategy |
| **HR Business Partner** skill | Workforce planning, headcount approval, hiring prioritization | HRBP workforce plan -> TA hiring plan; TA pipeline updates -> HRBP capacity planning |
| **Operations Manager** skill | Hiring capacity planning, onboarding process handoff | Ops headcount forecast -> TA demand; TA offer accept -> Ops onboarding trigger |
| **Finance** skill | Compensation budgeting, cost-per-hire tracking, headcount approval | Finance approved budget -> TA comp bands; TA spend data -> Finance reporting |
| **Scheduling** (Calendly, GoodTime) | Interview scheduling automation | Candidate availability -> scheduler -> interviewer calendars |
| **Background Check** (Checkr, Sterling) | Pre-hire verification | Offer accepted -> background check initiated -> clearance status |
| **Candidate Survey** (SurveyMonkey, Qualtrics) | Candidate experience measurement | Process completion -> survey trigger -> cNPS scores |
