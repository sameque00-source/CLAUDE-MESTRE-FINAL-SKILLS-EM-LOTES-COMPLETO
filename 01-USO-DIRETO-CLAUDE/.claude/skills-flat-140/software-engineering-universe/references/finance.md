# Domain: finance
Source Skills in this domain: 3

---

## business-investment-advisor

Source path: `references/finance/business-investment-advisor/SKILL.md`

# Business Investment Advisor Skill

## Overview

Production-ready investment analysis toolkit for screening opportunities, analyzing portfolio composition, and generating due diligence checklists. Designed for business owners, angel investors, and corporate development teams evaluating investments from $50K to $50M.

## Clarify First

Before the analysis, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which task** — screen opportunities, analyze a portfolio, or generate a DD checklist (selects the script and the required input JSON)
- [ ] **Screening thresholds** — minimum ROI, maximum payback, and acceptable risk level (drives which opportunities pass and how they rank)
- [ ] **Target profile for DD** — investment type, stage, and check size (drives which items and weights the due-diligence checklist generates)
- [ ] **Risk tolerance / concentration limits** — max exposure per holding or sector (drives portfolio rebalancing recommendations)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
# Screen investments by criteria (ROI, risk, payback)
python scripts/investment_screener.py opportunities.json --min-roi 15 --max-payback 36

# Analyze portfolio diversification and risk exposure
python scripts/portfolio_analyzer.py portfolio.json

# Generate due diligence checklist for an investment target
python scripts/due_diligence_checklist.py --type saas --stage series-a --amount 500000
```

## Tools Overview

| Tool | Purpose | Input | Output |
|------|---------|-------|--------|
| `investment_screener.py` | Filter & rank investments | JSON with opportunity data | Ranked opportunities + scores |
| `portfolio_analyzer.py` | Portfolio risk & diversification | JSON with holdings | Risk report + recommendations |
| `due_diligence_checklist.py` | DD checklist generation | Investment parameters | Structured checklist + scoring |

## Workflows

### Workflow 1: Opportunity Evaluation Pipeline

1. Compile investment opportunities into JSON format (see Common Patterns)
2. Run `investment_screener.py` with your criteria filters
3. Review ranked results focusing on composite score
4. For top candidates, run `due_diligence_checklist.py` to generate investigation plan
5. After DD completion, update portfolio model and run `portfolio_analyzer.py`

### Workflow 2: Portfolio Health Check

1. Export current holdings to JSON format
2. Run `portfolio_analyzer.py` to assess diversification
3. Review concentration risk, sector exposure, and liquidity analysis
4. Use recommendations to identify rebalancing opportunities
5. Screen new opportunities with `investment_screener.py` to fill gaps

### Workflow 3: Due Diligence Sprint

1. Run `due_diligence_checklist.py` with target parameters
2. Assign checklist items to team members with deadlines
3. Score each item as investigation progresses (0-10)
4. Re-run with `--score-file` to get weighted DD score
5. Use composite score to support go/no-go decision

## Reference Documentation

See `references/investment-frameworks.md` for detailed frameworks including:
- Investment scoring methodology
- Risk assessment matrix
- Portfolio diversification guidelines
- Due diligence phase frameworks
- Industry-specific evaluation criteria

## Common Patterns

### Pattern: Investment Opportunities JSON
```json
{
  "opportunities": [
    {
      "name": "TechCo SaaS",
      "type": "equity",
      "sector": "technology",
      "stage": "series-a",
      "amount": 250000,
      "expected_roi_pct": 25.0,
      "risk_level": "high",
      "payback_months": 36,
      "revenue": 1200000,
      "revenue_growth_pct": 85.0,
      "gross_margin_pct": 78.0,
      "burn_rate_monthly": 80000,
      "runway_months": 18
    }
  ]
}
```

### Pattern: Portfolio Holdings JSON
```json
{
  "portfolio": {
    "total_invested": 2000000,
    "holdings": [
      {
        "name": "Investment A",
        "type": "equity",
        "sector": "technology",
        "invested": 250000,
        "current_value": 375000,
        "date_invested": "2024-06-15",
        "stage": "series-a",
        "liquidity": "illiquid",
        "status": "active"
      }
    ]
  }
}
```

### Risk Level Definitions

| Level | Expected Return | Loss Probability | Typical Payback |
|-------|----------------|-----------------|-----------------|
| Low | 5-10% | < 10% | < 24 months |
| Medium | 10-20% | 10-30% | 24-48 months |
| High | 20-40% | 30-50% | 36-60 months |
| Very High | 40%+ | > 50% | 48+ months |

---

## financial-analyst

Source path: `references/finance/financial-analyst/SKILL.md`

# Financial Analyst Skill

## Overview

Production-ready financial analysis toolkit providing ratio analysis, DCF valuation, budget variance analysis, and rolling forecast construction. Designed for financial analysts with 3-6 years experience performing financial modeling, forecasting & budgeting, management reporting, business performance analysis, and investment analysis.

## Use when

- The user asks to "run financial ratios", "build a DCF", "analyze budget variance", or "build a forecast"
- A valuation range is needed for an acquisition, fundraise, or board presentation
- Actuals vs budget needs investigation (which variances are material, favorable/unfavorable, department breakdown)
- A rolling 13-week cash flow or driver-based revenue forecast needs construction
- Sensitivity analysis is required to stress-test valuation or forecast assumptions
- The user asks about profitability, liquidity, leverage, efficiency, or valuation metrics with industry context

## Clarify First

Before the analysis, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which analysis** — ratios, DCF valuation, budget variance, or forecast (selects the tool and the required input schema; each needs different data)
- [ ] **The decision it supports** — acquisition, fundraise, board review, or budget reforecast (sets the executive-summary conclusion and which metrics lead)
- [ ] **Materiality threshold** — absolute $ or % of budget (drives which variances surface vs. go to the appendix; default 10% / $50K)
- [ ] **Key assumptions + as-of date** — WACC inputs, terminal growth, or forecast drivers and when each was last sourced (drives DCF/forecast outputs and the assumptions appendix)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## 5-Phase Workflow

### Phase 1: Scoping
- Define analysis objectives and stakeholder requirements
- Identify data sources and time periods
- Establish materiality thresholds and accuracy targets
- Select appropriate analytical frameworks
- *Validate:* materiality threshold is explicit (absolute $ or %), accuracy target is a number, and the decision the analysis supports is named

### Phase 2: Data Analysis & Modeling
- Collect and validate financial data (income statement, balance sheet, cash flow)
- Calculate financial ratios across 5 categories (profitability, liquidity, leverage, efficiency, valuation)
- Build DCF models with WACC and terminal value calculations
- Construct budget variance analyses with favorable/unfavorable classification
- Develop driver-based forecasts with scenario modeling
- *Validate:* input JSON conforms to the expected schema (no missing statements, no mixed periods); WACC inputs sourced within the last quarter; terminal growth rate ≤ long-run GDP growth

### Phase 3: Insight Generation
- Interpret ratio trends and benchmark against industry standards
- Identify material variances and root causes
- Assess valuation ranges through sensitivity analysis
- Evaluate forecast scenarios (base/bull/bear) for decision support
- *Validate:* every material variance has a root-cause hypothesis; DCF sensitivity range is wider than ±15% on WACC and terminal growth

### Phase 4: Reporting
- Generate executive summaries with key findings
- Produce detailed variance reports by department and category
- Deliver DCF valuation reports with sensitivity tables
- Present rolling forecasts with trend analysis
- *Validate:* executive summary leads with the decision-relevant conclusion, not the method; assumptions appendix lists source + last-reviewed date for each

### Phase 5: Follow-up
- Track forecast accuracy (target: +/-5% revenue, +/-3% expenses)
- Monitor report delivery timeliness (target: 100% on time)
- Update models with actuals as they become available
- Refine assumptions based on variance analysis

## Tools

### 1. Ratio Calculator (`scripts/ratio_calculator.py`)

Calculate and interpret financial ratios from financial statement data.

**Ratio Categories:**
- **Profitability:** ROE, ROA, Gross Margin, Operating Margin, Net Margin
- **Liquidity:** Current Ratio, Quick Ratio, Cash Ratio
- **Leverage:** Debt-to-Equity, Interest Coverage, DSCR
- **Efficiency:** Asset Turnover, Inventory Turnover, Receivables Turnover, DSO
- **Valuation:** P/E, P/B, P/S, EV/EBITDA, PEG Ratio

```bash
python scripts/ratio_calculator.py sample_financial_data.json
python scripts/ratio_calculator.py sample_financial_data.json --format json
python scripts/ratio_calculator.py sample_financial_data.json --category profitability
```

### 2. DCF Valuation (`scripts/dcf_valuation.py`)

Discounted Cash Flow enterprise and equity valuation with sensitivity analysis.

**Features:**
- WACC calculation via CAPM
- Revenue and free cash flow projections (5-year default)
- Terminal value via perpetuity growth and exit multiple methods
- Enterprise value and equity value derivation
- Two-way sensitivity analysis (discount rate vs growth rate)

```bash
python scripts/dcf_valuation.py valuation_data.json
python scripts/dcf_valuation.py valuation_data.json --format json
python scripts/dcf_valuation.py valuation_data.json --projection-years 7
```

### 3. Budget Variance Analyzer (`scripts/budget_variance_analyzer.py`)

Analyze actual vs budget vs prior year performance with materiality filtering.

**Features:**
- Dollar and percentage variance calculation
- Materiality threshold filtering (default: 10% or $50K)
- Favorable/unfavorable classification with revenue/expense logic
- Department and category breakdown
- Executive summary generation

```bash
python scripts/budget_variance_analyzer.py budget_data.json
python scripts/budget_variance_analyzer.py budget_data.json --format json
python scripts/budget_variance_analyzer.py budget_data.json --threshold-pct 5 --threshold-amt 25000
```

### 4. Forecast Builder (`scripts/forecast_builder.py`)

Driver-based revenue forecasting with rolling cash flow projection and scenario modeling.

**Features:**
- Driver-based revenue forecast model
- 13-week rolling cash flow projection
- Scenario modeling (base/bull/bear cases)
- Trend analysis using simple linear regression (standard library)

```bash
python scripts/forecast_builder.py forecast_data.json
python scripts/forecast_builder.py forecast_data.json --format json
python scripts/forecast_builder.py forecast_data.json --scenarios base,bull,bear
```

## Knowledge Bases

| Reference | Purpose |
|-----------|---------|
| `references/financial-ratios-guide.md` | Ratio formulas, interpretation, industry benchmarks |
| `references/valuation-methodology.md` | DCF methodology, WACC, terminal value, comps |
| `references/forecasting-best-practices.md` | Driver-based forecasting, rolling forecasts, accuracy |

## Templates

| Template | Purpose |
|----------|---------|
| `assets/variance_report_template.md` | Budget variance report template |
| `assets/dcf_analysis_template.md` | DCF valuation analysis template |
| `assets/forecast_report_template.md` | Revenue forecast report template |

## Industry Adaptations

### SaaS
- Key metrics: MRR, ARR, CAC, LTV, Churn Rate, Net Revenue Retention
- Revenue recognition: subscription-based, deferred revenue tracking
- Unit economics: CAC payback period, LTV/CAC ratio
- Cohort analysis for retention and expansion revenue

### Retail
- Key metrics: Same-store sales, Revenue per square foot, Inventory turnover
- Seasonal adjustment factors in forecasting
- Gross margin analysis by product category
- Working capital cycle optimization

### Manufacturing
- Key metrics: Gross margin by product line, Capacity utilization, COGS breakdown
- Bill of materials cost analysis
- Absorption vs variable costing impact
- Capital expenditure planning and ROI

### Financial Services
- Key metrics: Net Interest Margin, Efficiency Ratio, ROA, Tier 1 Capital
- Regulatory capital requirements
- Credit loss provisioning and reserves
- Fee income analysis and diversification

### Healthcare
- Key metrics: Revenue per patient, Payer mix, Days in A/R, Operating margin
- Reimbursement rate analysis by payer
- Case mix index impact on revenue
- Compliance cost allocation

## Key Metrics & Targets

| Metric | Target |
|--------|--------|
| Forecast accuracy (revenue) | +/-5% |
| Forecast accuracy (expenses) | +/-3% |
| Report delivery | 100% on time |
| Model documentation | Complete for all assumptions |
| Variance explanation | 100% of material variances |

## Input Data Format

All scripts accept JSON input files. See `assets/sample_financial_data.json` for the complete input schema covering all four tools.

## Dependencies

**None** - All scripts use Python standard library only (`math`, `statistics`, `json`, `argparse`, `datetime`). No numpy, pandas, or scipy required.

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| All ratios return 0.00 | Missing or zeroed financial statement fields in input JSON | Verify `income_statement`, `balance_sheet`, and `cash_flow` keys are populated with non-zero values; check field names match expected schema |
| DCF yields negative equity value | Net debt exceeds enterprise value, or WACC is set lower than terminal growth rate | Confirm `net_debt` is accurate; ensure `terminal_growth_rate` < WACC (typically 2-3% vs 8-12%); review capital structure assumptions |
| Sensitivity table shows "N/A" across entire row | WACC value in that row is less than or equal to every terminal growth rate in the range | Widen the gap between WACC and terminal growth; raise WACC inputs or lower the growth range in `assumptions.terminal_growth_rate` |
| Budget variance analyzer flags every line as material | Materiality thresholds set too low relative to the data scale | Increase `--threshold-pct` (e.g., from 5 to 10) and `--threshold-amt` (e.g., from 25000 to 100000) to match organizational materiality policy |
| Forecast builder produces flat projections | Historical data has fewer than 2 periods, or `revenue_growth_rate` is set to 0 | Provide at least 3-4 historical periods in `historical_periods`; set a non-zero `revenue_growth_rate` in `assumptions` |
| JSON parsing error on script execution | Malformed JSON input file (trailing commas, unquoted keys, encoding issues) | Validate input with `python -m json.tool input_file.json`; ensure UTF-8 encoding; remove trailing commas and comments |
| Valuation ratios all show "Insufficient data" | Missing `market_data` section in input JSON (share price, shares outstanding) | Add the `market_data` object with `share_price`, `shares_outstanding`, and `earnings_growth_rate` fields to the input file |

## Success Criteria

- **Forecast Accuracy**: Revenue forecasts land within +/-5% of actuals; expense forecasts within +/-3% over rolling 12-month periods
- **Variance Coverage**: 100% of material variances (exceeding threshold) include documented root-cause explanations and corrective action plans
- **Valuation Confidence**: DCF-derived equity value falls within 15% of comparable-company and precedent-transaction benchmarks, validated through sensitivity analysis
- **Report Timeliness**: All financial analysis deliverables (ratio reports, variance analyses, forecast updates) published within agreed SLA -- target 100% on-time delivery
- **Model Integrity**: Every assumption in DCF and forecast models is documented with source, rationale, and last-reviewed date; WACC inputs refresh quarterly against market data
- **Stakeholder Adoption**: Financial models and dashboards referenced in at least 80% of executive budget reviews, board presentations, and investment committee decisions
- **Analytical Efficiency**: End-to-end analysis cycle time (data collection through report delivery) reduced by 40%+ compared to manual spreadsheet workflows, measured per reporting period

## Scope & Limitations

**This skill covers:**
- Quantitative financial ratio analysis across profitability, liquidity, leverage, efficiency, and valuation categories with built-in industry benchmarking
- Discounted Cash Flow (DCF) enterprise and equity valuation using CAPM-based WACC, perpetuity growth and exit multiple terminal value methods, and two-way sensitivity analysis
- Budget variance analysis with materiality filtering, favorable/unfavorable classification, department and category breakdowns, and executive summary generation
- Driver-based revenue forecasting with 13-week rolling cash flow projection, base/bull/bear scenario modeling, and linear regression trend analysis

**This skill does NOT cover:**
- Real-time market data feeds, live stock price retrieval, or automated data ingestion from ERP/accounting systems (all input is via static JSON files)
- Qualitative analysis such as management quality assessment, competitive moat evaluation, ESG scoring, or regulatory risk judgment
- Tax optimization, transfer pricing, multi-entity consolidation, or jurisdiction-specific accounting treatments (IFRS vs GAAP reconciliation)
- Monte Carlo simulation, options pricing (Black-Scholes), credit risk modeling, or any analysis requiring external libraries beyond the Python standard library

## Anti-patterns

| Anti-pattern | Failure mode | Fix |
|--------------|--------------|-----|
| Building a DCF on a single-scenario forecast | False precision; one number presented as a target price | Always run base/bull/bear; present valuation as a range with sensitivity tables |
| Terminal growth rate ≥ long-run GDP growth | Valuation dominated by terminal value assuming perpetual above-economy growth | Cap terminal growth at 2-3% (long-run GDP proxy); if comps justify higher, flag explicitly |
| WACC inputs more than a quarter old | Rate environment moved; discount rate is wrong; valuation wrong | Refresh risk-free rate, ERP, and beta quarterly; document "last reviewed" date per input |
| Benchmarking ratios against a generic "industry average" | Peer set is wrong; conclusions are wrong | Use a specific comparable-company set (size, geography, business model) — see industry benchmarks in `references/financial-ratios-guide.md` |
| Reporting every variance instead of filtering by materiality | Stakeholders tune out; real issues buried | Apply a materiality threshold (absolute $ or % of budget); below threshold goes into an appendix, not the report |
| Favorable variance = "good"; unfavorable = "bad" | Misses revenue shortfalls masked by expense underspend; misses over-delivery hiding scope cuts | Always pair the classification with a root-cause note — direction alone is not insight |
| Mixing forecast periods (quarterly actuals against annual budget) | Variances that don't reconcile; trust collapses | Run the tools on matched periods only; if a period is partial, annotate and use period-adjusted comparisons |
| Treating model output as the answer | Model is a reasoning aid, not a decision | Lead the executive summary with the decision; put the model outputs in support |

## Integration Points

| Related Skill | Domain | Integration Use Case |
|---------------|--------|---------------------|
| `c-level-advisor/ceo-advisor` | C-Level Advisory | Feed DCF valuation outputs and scenario comparisons into CEO strategic investment decisions and board-ready presentations |
| `c-level-advisor/cto-advisor` | C-Level Advisory | Provide technology investment ROI analysis and CapEx forecasts to support build-vs-buy and infrastructure scaling decisions |
| `business-growth/revenue-operations` | Business & Growth | Connect revenue forecasts and unit-economics metrics (CAC, LTV, payback period) to pipeline and go-to-market planning |
| `product-team/product-manager` | Product Team | Supply budget variance data and RICE-weighted financial projections for feature prioritization and resource allocation |
| `data-analytics/data-analyst` | Data Analytics | Export ratio analysis and forecast outputs as structured JSON for BI dashboard integration and trend visualization |
| `project-management/project-financial-management` | Project Management | Align budget variance analysis with project-level cost tracking, earned value management, and milestone-based funding releases |

## Tool Reference

### `scripts/ratio_calculator.py`

Calculate and interpret financial ratios across 5 categories with industry benchmarking.

```
usage: ratio_calculator.py [-h] [--format {text,json}]
                           [--category {profitability,liquidity,leverage,efficiency,valuation}]
                           input_file

positional arguments:
  input_file            Path to JSON file with financial statement data
                        (must contain income_statement, balance_sheet,
                        cash_flow, and optionally market_data objects)

options:
  -h, --help            Show help message and exit
  --format {text,json}  Output format (default: text)
  --category {profitability,liquidity,leverage,efficiency,valuation}
                        Calculate only a specific ratio category;
                        omit to calculate all 5 categories (20 ratios)
```

**Ratios computed:** ROE, ROA, Gross Margin, Operating Margin, Net Margin, Current Ratio, Quick Ratio, Cash Ratio, Debt-to-Equity, Interest Coverage, DSCR, Asset Turnover, Inventory Turnover, Receivables Turnover, DSO, P/E, P/B, P/S, EV/EBITDA, PEG Ratio.

### `scripts/dcf_valuation.py`

Discounted Cash Flow enterprise and equity valuation with WACC calculation and sensitivity analysis.

```
usage: dcf_valuation.py [-h] [--format {text,json}]
                        [--projection-years PROJECTION_YEARS]
                        input_file

positional arguments:
  input_file            Path to JSON file with valuation data
                        (must contain historical and assumptions objects)

options:
  -h, --help            Show help message and exit
  --format {text,json}  Output format (default: text)
  --projection-years PROJECTION_YEARS
                        Number of projection years; overrides the value
                        in the input file (default: 5)
```

**Outputs:** WACC (CAPM), projected revenue and FCF, terminal value (perpetuity growth + exit multiple), enterprise value, equity value, value per share, and a two-way sensitivity table (WACC vs terminal growth rate).

### `scripts/budget_variance_analyzer.py`

Analyze actual vs budget vs prior year performance with materiality filtering and executive summaries.

```
usage: budget_variance_analyzer.py [-h] [--format {text,json}]
                                   [--threshold-pct THRESHOLD_PCT]
                                   [--threshold-amt THRESHOLD_AMT]
                                   input_file

positional arguments:
  input_file            Path to JSON file with budget data
                        (must contain line_items array with actual,
                        budget, and optionally prior_year values)

options:
  -h, --help            Show help message and exit
  --format {text,json}  Output format (default: text)
  --threshold-pct THRESHOLD_PCT
                        Materiality threshold as percentage (default: 10.0)
  --threshold-amt THRESHOLD_AMT
                        Materiality threshold as dollar amount (default: 50000.0)
```

**Outputs:** Executive summary (revenue/expense/net impact), all variances with favorability classification, material variances filtered by threshold, department summary, and category summary.

### `scripts/forecast_builder.py`

Driver-based revenue forecasting with rolling cash flow projection and multi-scenario modeling.

```
usage: forecast_builder.py [-h] [--format {text,json}]
                           [--scenarios SCENARIOS]
                           input_file

positional arguments:
  input_file            Path to JSON file with forecast data
                        (must contain historical_periods, drivers,
                        assumptions, cash_flow_inputs, and scenarios objects)

options:
  -h, --help            Show help message and exit
  --format {text,json}  Output format (default: text)
  --scenarios SCENARIOS
                        Comma-separated list of scenarios to model
                        (default: base,bull,bear)
```

**Outputs:** Trend analysis (linear regression, growth rates, seasonality index), scenario comparison table, per-period forecast detail (revenue, COGS, gross profit, OpEx, operating income), and 13-week rolling cash flow projection with runway calculation.

---

## saas-metrics-coach

Source path: `references/finance/saas-metrics-coach/SKILL.md`

# SaaS Metrics Coach Skill

## Overview

Production-ready SaaS metrics toolkit for calculating MRR/ARR, analyzing cohort retention, and evaluating unit economics. Designed for SaaS founders, finance teams, and growth operators who need precise subscription revenue analysis without spreadsheet gymnastics.

## Clarify First

Before calculating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which metric set** — MRR/ARR growth, cohort retention, or unit economics (selects the script and the input format: subscription CSV, activity CSV, or metrics JSON)
- [ ] **Reporting period + currency handling** — the window and how multi-currency MRR is normalized (changes every revenue and churn figure)
- [ ] **Gross margin** — the margin to apply (drives LTV and CAC payback; LTV = ARPU x margin / churn)
- [ ] **Churn definition** — gross vs. net, logo vs. revenue (changes churn rate, NRR, and the health-flag verdict)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
# Calculate MRR, ARR, growth rate, and churn from subscription data
python scripts/mrr_calculator.py subscriptions.csv

# Run cohort retention analysis
python scripts/cohort_analyzer.py users.csv --cohort-period monthly

# Calculate LTV, CAC, LTV:CAC ratio, and payback period
python scripts/unit_economics.py metrics.json
```

## Tools Overview

| Tool | Purpose | Input | Output |
|------|---------|-------|--------|
| `mrr_calculator.py` | MRR, ARR, growth rate, churn | CSV with subscription data | Revenue metrics + trends |
| `cohort_analyzer.py` | Cohort retention analysis | CSV with user signup/activity data | Retention matrix + curves |
| `unit_economics.py` | LTV, CAC, LTV:CAC, payback | JSON with acquisition/revenue data | Unit economics dashboard |

## Workflows

### Workflow 1: Monthly SaaS Health Check

1. Export subscription data as CSV (columns: customer_id, plan, mrr, start_date, end_date)
2. Run `mrr_calculator.py` to get current MRR, ARR, net new MRR, churn rate
3. Run `cohort_analyzer.py` on user activity data to identify retention trends
4. Run `unit_economics.py` to validate LTV:CAC ratio stays above 3:1
5. Review output for warning flags (churn > 5%, LTV:CAC < 3, payback > 18 months)

### Workflow 2: Investor Deck Preparation

1. Run `mrr_calculator.py --format json` to get growth metrics for charts
2. Run `cohort_analyzer.py --format json` for retention curves
3. Run `unit_economics.py --format json` for unit economics summary
4. Use JSON output to populate investor deck data points

### Workflow 3: Churn Investigation

1. Run `mrr_calculator.py` with `--breakdown` to see churn by plan tier
2. Run `cohort_analyzer.py` to identify which cohorts churn fastest
3. Cross-reference cohort drop-off periods with product changes
4. Identify if churn is concentrated in specific segments or time windows

## Reference Documentation

### Key SaaS Metrics Definitions

- **MRR (Monthly Recurring Revenue):** Sum of all active subscription revenue normalized to monthly
- **ARR (Annual Recurring Revenue):** MRR x 12
- **Net New MRR:** New MRR + Expansion MRR - Churned MRR - Contraction MRR
- **Gross Churn Rate:** Lost MRR / Beginning MRR for the period
- **Net Revenue Retention (NRR):** (Beginning MRR + Expansion - Churn - Contraction) / Beginning MRR
- **LTV (Lifetime Value):** ARPU / Monthly Churn Rate (simplified) or ARPU x Gross Margin / Churn
- **CAC (Customer Acquisition Cost):** Total Sales & Marketing Spend / New Customers Acquired
- **LTV:CAC Ratio:** Target 3:1 or higher for healthy SaaS
- **CAC Payback Period:** CAC / (ARPU x Gross Margin) in months

See `references/saas-metrics-guide.md` for comprehensive framework details.

## Common Patterns

### Pattern: Subscription CSV Format
```csv
customer_id,plan,mrr,start_date,end_date,status
C001,pro,99.00,2025-01-15,,active
C002,basic,29.00,2025-02-01,2025-08-15,churned
C003,enterprise,499.00,2025-03-10,,active
```

### Pattern: User Activity CSV Format
```csv
user_id,signup_date,last_active_date,activity_month
U001,2025-01-05,2025-06-15,2025-06
U002,2025-01-12,2025-03-20,2025-03
```

### Pattern: Unit Economics JSON Format
```json
{
  "period": "2025-Q4",
  "total_customers": 1200,
  "new_customers": 150,
  "churned_customers": 45,
  "total_mrr": 89500.00,
  "arpu": 74.58,
  "gross_margin": 0.82,
  "sales_marketing_spend": 45000.00,
  "monthly_churn_rate": 0.0375
}
```

### Healthy SaaS Benchmarks

| Metric | Concerning | Acceptable | Strong |
|--------|-----------|------------|--------|
| Monthly Churn | > 5% | 2-5% | < 2% |
| Net Revenue Retention | < 90% | 90-110% | > 120% |
| LTV:CAC | < 1:1 | 1:1-3:1 | > 3:1 |
| CAC Payback | > 24 mo | 12-18 mo | < 12 mo |
| Gross Margin | < 60% | 60-75% | > 75% |
