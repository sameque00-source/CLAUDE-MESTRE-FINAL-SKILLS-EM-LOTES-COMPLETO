# Domain: data-analytics
Source Skills in this domain: 6

---

## analytics-engineer

Source path: `references/data-analytics/analytics-engineer/SKILL.md`

# Analytics Engineer

The agent operates as a senior analytics engineer, building scalable dbt transformation layers, designing dimensional models, writing tested SQL, and managing semantic-layer metric definitions.

## Clarify First

Before building the models, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Required grain + downstream consumers** — the row grain of the target model and who queries it (dashboard, notebook, reverse-ETL) (drives the dimensional model and materialization)
- [ ] **Source tables and freshness** — which sources exist, their keys, and load cadence (determines staging models and incremental logic)
- [ ] **Data volume + refresh SLA** — table size and how often it must rebuild (selects view vs. table vs. incremental materialization)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

1. **Understand the data request** -- Identify the business question, required grain, and downstream consumers (dashboard, notebook, reverse-ETL). Confirm source tables exist and check freshness.
2. **Design the dimensional model** -- Choose star or snowflake schema. Map source entities to dimension and fact tables at the correct grain. Document grain, primary keys, and foreign keys.
3. **Build staging models** -- One `stg_` model per source table. Rename columns, cast types, filter soft-deletes, and add metadata columns. Validate: `dbt build --select stg_*`.
4. **Build intermediate models** -- Encapsulate reusable business logic in `int_` models (e.g., `int_orders_enriched`). Keep each CTE single-purpose.
5. **Build mart models** -- Create `dim_` and `fct_` models for consumption. Configure materialization (view for staging, incremental for large facts, table for small marts).
6. **Add tests and documentation** -- Every primary key gets `unique` + `not_null`. Foreign keys get `relationships`. Add `accepted_values` for enums. Write model descriptions in YAML.
7. **Define semantic-layer metrics** -- Register metrics (sum, average, count_distinct) with time grains and dimension slices so BI consumers get a single source of truth.
8. **Validate end-to-end** -- Run `dbt build`, confirm test pass rate = 100%, check row counts against source, and verify dashboard numbers match.

## dbt Project Structure

```
analytics/
  dbt_project.yml
  models/
    staging/          # stg_<source>__<table>.sql  (one per source table)
    intermediate/     # int_<entity>_<verb>.sql     (reusable logic)
    marts/
      core/           # dim_*.sql, fct_*.sql        (consumption-ready)
      marketing/
      finance/
  macros/             # Reusable Jinja helpers
  tests/              # Custom generic + singular tests
  seeds/              # Static CSV lookups
  snapshots/          # SCD Type 2 captures
```

## Concrete Example: Customer Dimension

**Staging model** (`models/staging/crm/stg_crm__customers.sql`):
```sql
WITH source AS (
    SELECT * FROM {{ source('crm', 'customers') }}
),

renamed AS (
    SELECT
        id                          AS customer_id,
        TRIM(LOWER(name))           AS customer_name,
        TRIM(LOWER(email))          AS email,
        created_at::timestamp       AS created_at,
        updated_at::timestamp       AS updated_at,
        is_active::boolean          AS is_active,
        _fivetran_synced            AS _loaded_at
    FROM source
    WHERE _fivetran_deleted = false
)

SELECT * FROM renamed
```

**Mart model** (`models/marts/core/dim_customer.sql`):
```sql
WITH customers AS (
    SELECT * FROM {{ ref('stg_crm__customers') }}
),

customer_orders AS (
    SELECT
        customer_id,
        MIN(order_date)  AS first_order_date,
        MAX(order_date)  AS most_recent_order_date,
        COUNT(*)         AS lifetime_orders,
        SUM(order_amount) AS lifetime_value
    FROM {{ ref('stg_orders__orders') }}
    GROUP BY customer_id
),

final AS (
    SELECT
        c.customer_id,
        c.customer_name,
        c.email,
        c.created_at,
        co.first_order_date,
        co.most_recent_order_date,
        co.lifetime_orders,
        co.lifetime_value,
        CASE
            WHEN co.lifetime_value >= 10000 THEN 'platinum'
            WHEN co.lifetime_value >= 5000  THEN 'gold'
            WHEN co.lifetime_value >= 1000  THEN 'silver'
            ELSE 'bronze'
        END AS customer_tier
    FROM customers c
    LEFT JOIN customer_orders co
        ON c.customer_id = co.customer_id
)

SELECT * FROM final
```

**Test configuration** (`models/marts/core/_core__models.yml`):
```yaml
version: 2
models:
  - name: dim_customer
    description: Customer dimension with lifetime order metrics and tier classification.
    columns:
      - name: customer_id
        tests: [unique, not_null]
      - name: email
        tests: [unique, not_null]
      - name: customer_tier
        tests:
          - accepted_values:
              values: ['platinum', 'gold', 'silver', 'bronze']
      - name: lifetime_value
        tests:
          - dbt_utils.expression_is_true:
              expression: ">= 0"
```

## Incremental Fact Table Pattern

```sql
-- models/marts/core/fct_orders.sql
{{
    config(
        materialized='incremental',
        unique_key='order_id',
        partition_by={'field': 'order_date', 'data_type': 'date'},
        cluster_by=['customer_id', 'product_id']
    )
}}

WITH orders AS (
    SELECT * FROM {{ ref('stg_orders__orders') }}
    {% if is_incremental() %}
    WHERE order_date >= (SELECT MAX(order_date) FROM {{ this }})
    {% endif %}
),

order_items AS (
    SELECT * FROM {{ ref('stg_orders__order_items') }}
),

final AS (
    SELECT
        o.order_id,
        o.order_date,
        o.customer_id,
        oi.product_id,
        o.store_id,
        oi.quantity,
        oi.unit_price,
        oi.quantity * oi.unit_price AS line_total,
        o.discount_amount,
        o.tax_amount,
        o.total_amount
    FROM orders o
    INNER JOIN order_items oi ON o.order_id = oi.order_id
)

SELECT * FROM final
```

## Materialization Strategy

| Layer | Materialization | Rationale |
|-------|----------------|-----------|
| Staging | View | Thin wrappers; no storage cost |
| Intermediate | Ephemeral / View | Business logic; referenced multiple times |
| Marts (small) | Table | Query performance for BI tools |
| Marts (large) | Incremental | Efficient appends for large fact tables |

## Semantic-Layer Metric Definition

```yaml
# models/marts/core/_core__metrics.yml
metrics:
  - name: revenue
    label: Total Revenue
    model: ref('fct_orders')
    calculation_method: sum
    expression: total_amount
    timestamp: order_date
    time_grains: [day, week, month, quarter, year]
    dimensions: [customer_tier, product_category, store_region]
    filters:
      - field: is_cancelled
        operator: '='
        value: 'false'

  - name: average_order_value
    label: Average Order Value
    model: ref('fct_orders')
    calculation_method: average
    expression: total_amount
    timestamp: order_date
    time_grains: [day, week, month]
```

## Useful Macros

```sql
-- macros/cents_to_dollars.sql
{% macro cents_to_dollars(column_name) %}
    ({{ column_name }} / 100.0)::decimal(18,2)
{% endmacro %}

-- macros/get_incremental_filter.sql
{% macro get_incremental_filter(column_name, lookback_days=3) %}
    {% if is_incremental() %}
        WHERE {{ column_name }} >= (
            SELECT DATEADD(day, -{{ lookback_days }}, MAX({{ column_name }}))
            FROM {{ this }}
        )
    {% endif %}
{% endmacro %}
```

## CI/CD: Slim CI for Pull Requests

```bash
# Only run modified models and their downstream dependents
dbt run  --select state:modified+ --defer --state ./target-base
dbt test --select state:modified+ --defer --state ./target-base
```

For full CI/CD pipeline configuration, see `REFERENCE.md`.

## Reference Materials

- `REFERENCE.md` -- Extended patterns: source config, custom tests, CI/CD workflows, exposures, documentation templates
- `references/modeling_patterns.md` -- Data modeling best practices
- `references/dbt_style_guide.md` -- SQL and dbt conventions
- `references/testing_guide.md` -- Testing strategies
- `references/optimization.md` -- Performance tuning

## Scripts

```bash
python scripts/impact_analyzer.py --model dim_customer
python scripts/schema_diff.py --source prod --target dev
python scripts/doc_generator.py --format markdown
python scripts/quality_scorer.py --model fct_orders
```

## Tool Reference

| Tool | Purpose | Key Flags |
|------|---------|-----------|
| `impact_analyzer.py` | Trace downstream impact of a dbt model via BFS on the manifest DAG | `--model <name>`, `--manifest <path>`, `--json` |
| `schema_diff.py` | Compare two dbt catalog.json files to detect column additions, removals, and type changes | `--source <path>`, `--target <path>`, `--json` |
| `doc_generator.py` | Generate markdown documentation (column dictionary, dependencies, tests) for a dbt model | `--model <name>`, `--manifest <path>`, `--catalog <path>` |
| `quality_scorer.py` | Score a dbt model 0-100 based on documentation, testing, and layer-convention adherence | `--model <name>`, `--manifest <path>`, `--json` |

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| `dbt build` fails with "relation does not exist" | Upstream model was not run or materialization changed | Run `dbt build --select +<model>` to build the full upstream chain |
| Incremental model produces duplicates | `unique_key` does not match the actual grain | Verify the `unique_key` config matches the primary key columns; run a full refresh with `--full-refresh` |
| Test failures on `not_null` after deployment | Source data introduced unexpected NULLs in a previously clean column | Add a staging-layer `COALESCE` or adjust the test to `warn` severity while investigating upstream |
| Schema drift detected by `schema_diff.py` | Upstream source changed column types or removed columns | Coordinate with the data engineering team; update staging model casts and regenerate documentation |
| Semantic-layer metric values differ from dashboard | Dashboard applies its own filters or calculations outside the semantic layer | Move all calculation logic into the semantic layer; audit dashboard-level computed fields |
| Slow `dbt run` on large incremental models | Lookback window is too wide or partition pruning is not engaged | Narrow the incremental filter, verify `partition_by` config, and check warehouse query plan |
| `quality_scorer.py` reports low score despite good coverage | Staging model contains JOINs or GROUP BY operations triggering layer-violation penalties | Refactor aggregation logic into intermediate or mart models; keep staging models as thin wrappers |

## Success Criteria

- All dbt models pass `dbt build` with a 100% test pass rate before merging to production.
- Every model has a YAML description and at least one test per primary key (`unique` + `not_null`).
- Incremental models process new data in under 5 minutes for tables up to 100M rows.
- Schema drift between prod and dev environments is detected and reviewed before each release.
- `quality_scorer.py` reports >= 80/100 for every mart model.
- Downstream dashboards refresh within SLA (< 5 s load time) after transformation runs complete.
- Semantic-layer metrics are the single source of truth -- no ad-hoc metric calculations exist in BI tools.

## Scope & Limitations

**In scope:** dbt project design, dimensional modeling (Kimball methodology), SQL transformation logic, data testing, semantic-layer metric definition, CI/CD for dbt, and warehouse query optimization.

**Out of scope:** Raw data ingestion and extraction (ELT/ETL orchestration tools like Fivetran or Airbyte), data infrastructure provisioning, BI tool configuration beyond semantic-layer integration, and real-time streaming pipelines.

**Limitations:** The Python tools operate on dbt manifest/catalog JSON artifacts and do not query the warehouse directly. Scoring heuristics in `quality_scorer.py` use rule-based deductions that may not cover every project convention. All scripts use the Python standard library only -- no external dependencies required.

## Integration Points

- **Data Engineer** (`engineering/senior-data-engineer`): Coordinates on source table contracts, ingestion SLAs, and schema change notifications.
- **Business Intelligence** (`data-analytics/business-intelligence`): Consumes mart models and semantic-layer metrics; dashboard specs reference model outputs.
- **Data Analyst** (`data-analytics/data-analyst`): Writes ad-hoc queries against mart models; reports data quality issues back to the analytics engineer.
- **MLOps Engineer** (`data-analytics/ml-ops-engineer`): Feature engineering pipelines may depend on intermediate or mart models as upstream inputs.
- **CI/CD Workflows** (`templates/`): Slim CI patterns (`state:modified+`) integrate into GitHub Actions or similar runners for automated PR validation.

---

## business-intelligence

Source path: `references/data-analytics/business-intelligence/SKILL.md`

# Business Intelligence

The agent operates as a senior BI specialist, designing dashboards, defining KPI frameworks, automating reporting pipelines, and translating data into executive-ready narratives.

## Clarify First

Before designing the dashboard, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Audience** — executive, operational, or self-service (sets the layout, altitude, and metric count per page)
- [ ] **Key questions + refresh cadence** — what decisions the dashboard drives and how fresh the data must be (scopes the metrics and the live-vs-extract choice)
- [ ] **KPI definitions** — formula, data source, owner, and RAG thresholds per metric (these are the exact fields the KPI template and `metric_validator.py` require)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

1. **Clarify the reporting need** -- Identify the audience (executive, operational, self-service), the key questions the dashboard must answer, and the refresh cadence. Validate that required data sources exist and are accessible.
2. **Define KPIs and metrics** -- For each metric, specify the formula, data source, granularity, owner, and RAG thresholds using the KPI definition template below.
3. **Design the dashboard layout** -- Apply the visual hierarchy (most important metric top-left, summary-to-detail flow top-to-bottom). Select chart types using the chart selection matrix. Limit to 5-8 visualizations per page.
4. **Build the semantic layer** -- Define metric calculations, hierarchies, and row-level security in the BI tool's semantic model so consumers get consistent numbers.
5. **Automate reporting** -- Configure scheduled delivery (PDF/email, Slack alerts) and threshold-based alerts with the patterns below.
6. **Validate and iterate** -- Confirm KPI values match source-of-truth queries. Check dashboard load time (<5 s target). Gather stakeholder feedback and refine.

## KPI Definition Template

```yaml
# Copy and fill for each metric
kpi:
  name: "Monthly Recurring Revenue"
  owner: "Finance"
  purpose: "Track subscription revenue health"
  formula: "SUM(subscription_amount) WHERE status = 'active'"
  data_source: "billing.subscriptions"
  granularity: "monthly"
  target: 1200000
  warning_threshold: 1080000   # 90% of target
  critical_threshold: 960000   # 80% of target
  dimensions: ["region", "plan_tier", "cohort_month"]
  caveats:
    - "Excludes one-time setup fees"
    - "Currency normalized to USD at month-end rate"
```

## Dashboard Design Principles

**Visual hierarchy:**
1. Most important metrics at top-left
2. Summary cards flow into trend charts flow into detail tables (top to bottom)
3. Related metrics grouped; white space separates logical sections
4. RAG status colors: Green `#28A745` | Yellow `#FFC107` | Red `#DC3545` | Gray `#6C757D`

**Chart selection matrix:**

| Data question | Chart type | Alternative |
|---------------|-----------|-------------|
| Trend over time | Line | Area |
| Part of whole | Donut / Treemap | Stacked bar |
| Comparison across categories | Bar / Column | Bullet |
| Distribution | Histogram | Box plot |
| Relationship | Scatter | Bubble |
| Geographic | Choropleth | Filled map |

## Executive Dashboard Example

```
+------------------------------------------------------------+
|                   EXECUTIVE SUMMARY                         |
| Revenue: $12.4M (+15% YoY)   Pipeline: $45.2M (+22% QoQ)  |
| Customers: 2,847 (+340 MTD)  NPS: 72 (+5 pts)              |
+------------------------------------------------------------+
| REVENUE TREND (12-mo line)    | REVENUE BY SEGMENT (donut)  |
+-------------------------------+-----------------------------+
| TOP 10 ACCOUNTS (table)       | KPI STATUS (RAG cards)      |
+-------------------------------+-----------------------------+
```

## Report Automation Patterns

**Scheduled report (cron-style):**
```yaml
report:
  name: Weekly Sales Report
  schedule: "0 8 * * MON"
  recipients: [sales-team@company.com, leadership@company.com]
  format: PDF
  pages: [Executive Summary, Pipeline Analysis, Rep Performance]
```

**Threshold alert:**
```yaml
alert:
  name: Revenue Below Target
  metric: daily_revenue
  condition: "actual < target * 0.9"
  channels:
    email: finance@company.com
    slack: "#revenue-alerts"
  message: "Daily revenue ${actual} is ${pct_diff}% below target. Top factors: ${top_factors}"
```

**Automated generation workflow (Python):**
```python
def generate_report(config: dict) -> str:
    """Generate and distribute a scheduled report."""
    # 1. Refresh data sources
    refresh_data_sources(config["sources"])
    # 2. Calculate metrics
    metrics = calculate_metrics(config["metrics"])
    # 3. Create visualizations
    charts = create_visualizations(metrics, config["charts"])
    # 4. Compile into report
    report = compile_report(metrics=metrics, charts=charts, template=config["template"])
    # 5. Distribute
    distribute_report(report, recipients=config["recipients"], fmt=config["format"])
    return report.path
```

## Self-Service BI Maturity Model

| Level | Capability | Users can... |
|-------|-----------|-------------|
| 1 - Consumers | View & filter | Open dashboards, apply filters, export data |
| 2 - Explorers | Ad-hoc queries | Write simple queries, create basic charts, share findings |
| 3 - Builders | Design dashboards | Combine data sources, create calculated fields, publish reports |
| 4 - Modelers | Define data models | Create semantic models, define metrics, optimize performance |

## Performance Optimization Checklist

- [ ] Limit visualizations per page (5-8 max)
- [ ] Use data extracts or materialized views instead of live connections for heavy dashboards
- [ ] Minimize calculated fields in the visualization layer; push logic to the semantic layer or warehouse
- [ ] Apply context filters to reduce query scope
- [ ] Aggregate at source when granularity allows
- [ ] Schedule data refreshes during off-peak hours
- [ ] Monitor and log query execution times; target < 5 s per dashboard load

**Query optimization example:**
```sql
-- Before: full table scan
SELECT * FROM large_table WHERE date >= '2024-01-01';

-- After: partitioned, filtered, and column-pruned
SELECT order_id, customer_id, amount
FROM large_table
WHERE partition_date >= '2024-01-01'
  AND status = 'active'
LIMIT 10000;
```

## Data Storytelling Structure

The agent frames every insight using Situation-Complication-Resolution:

1. **Situation** -- "Last quarter we targeted 10% retention improvement."
2. **Complication** -- "Enterprise churn rose 5%, driven by 30-day onboarding delays."
3. **Resolution** -- "Reducing onboarding to 14 days correlates with 40% lower churn and could save $2M annually."

## Governance

```yaml
security_model:
  row_level_security:
    - rule: region_access
      filter: "region = user.region"
  object_permissions:
    - role: viewer
      permissions: [view, export]
    - role: editor
      permissions: [view, export, edit]
    - role: admin
      permissions: [view, export, edit, delete, publish]
```

## Reference Materials

- `references/dashboard_patterns.md` -- Dashboard design patterns
- `references/visualization_guide.md` -- Chart selection guide
- `references/kpi_library.md` -- Standard KPI definitions
- `references/storytelling.md` -- Data storytelling techniques

## Scripts

```bash
python scripts/kpi_tracker.py --definitions kpis.json --data sales.csv
python scripts/kpi_tracker.py --definitions kpis.json --data sales.csv --json
python scripts/dashboard_spec_generator.py --definitions kpis.json --title "Sales Dashboard"
python scripts/dashboard_spec_generator.py --definitions kpis.json --layout 3-column --json
python scripts/metric_validator.py --definitions metrics.json --strict
python scripts/metric_validator.py --definitions metrics.json --json
```

## Tool Reference

| Tool | Purpose | Key Flags |
|------|---------|-----------|
| `kpi_tracker.py` | Calculate KPIs from data against targets; report RAG status and variance | `--definitions <json>`, `--data <csv/json>`, `--json` |
| `dashboard_spec_generator.py` | Generate dashboard layout specs (chart types, positions, filters) from KPI definitions | `--definitions <json>`, `--title`, `--layout 2-column/3-column`, `--json` |
| `metric_validator.py` | Validate metric definitions for completeness, naming, threshold logic, and consistency | `--definitions <json>`, `--strict`, `--json` |

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Dashboard loads slowly (> 5 s) | Too many visualizations or live-connection queries hitting raw tables | Reduce widgets to 5-8 per page; switch to extracts or materialized views for heavy dashboards |
| KPI values differ between dashboard and source query | Dashboard applies additional filters, currency conversion, or calculated fields not in the semantic layer | Centralize all metric logic in the semantic layer; remove dashboard-level computed fields |
| RAG thresholds trigger false alerts | Warning/critical percentages are miscalibrated for seasonal patterns | Adjust thresholds per season or use rolling baselines; validate with `metric_validator.py --strict` |
| Stakeholders ignore dashboards | Dashboard answers the wrong questions or lacks actionable context | Redesign using the Situation-Complication-Resolution storytelling framework; add annotations and targets |
| Row-level security hides data unexpectedly | Security rules are too broad or user-role mapping is incorrect | Audit RLS rules; test with a sample user from each role; log filtered row counts |
| Scheduled report emails land in spam | Large PDF attachments or sender reputation issues | Reduce attachment size; switch to embedded links; work with IT to whitelist the sender domain |
| `metric_validator.py` reports formula-aggregation mismatch | The `formula` field (e.g., "SUM(...)") does not match the declared `aggregation` | Align the two fields; the aggregation field drives the tool while the formula documents intent |

## Success Criteria

- Dashboard load time is under 5 seconds for 95% of page views.
- KPI definitions pass `metric_validator.py --strict` with zero errors before production deployment.
- Executive dashboards follow the visual hierarchy: summary cards at top-left, trends in the middle, detail tables at the bottom.
- Every KPI has a defined owner, target, and RAG thresholds documented in the definitions file.
- Self-service BI adoption reaches Level 2 (Explorers) for at least 60% of target users within 90 days.
- Scheduled reports are delivered within 15 minutes of the configured schedule window.
- Data storytelling follows the What / So What / Now What structure with quantified impact in every insight.

## Scope & Limitations

**In scope:** Dashboard design and layout, KPI framework definition, report automation patterns, data storytelling, self-service BI enablement, row-level security configuration, and visualization best practices.

**Out of scope:** Data warehouse infrastructure, ETL/ELT pipeline development, raw data ingestion, machine learning model building, and BI tool installation or licensing.

**Limitations:** The Python tools (`kpi_tracker.py`, `dashboard_spec_generator.py`, `metric_validator.py`) operate on local JSON and CSV files only -- they do not connect to live databases or BI platforms. All scripts use the Python standard library with no external dependencies. Dashboard specifications are platform-agnostic and require manual translation to specific BI tools (Tableau, Power BI, Looker, etc.).

## Integration Points

- **Analytics Engineer** (`data-analytics/analytics-engineer`): Provides the mart models and semantic-layer metrics that dashboards consume; schema changes require dashboard updates.
- **Data Analyst** (`data-analytics/data-analyst`): Creates ad-hoc analyses that may evolve into repeatable dashboards; shares visualization standards.
- **Product Team** (`product-team/`): Defines product KPIs and user-facing analytics requirements.
- **C-Level Advisor** (`c-level-advisor/`): Executive dashboards translate strategic objectives into measurable KPIs.
- **Finance** (`finance/`): Financial KPIs (MRR, CAC, LTV) require alignment between BI dashboards and finance team definitions.

---

## data-analyst

Source path: `references/data-analytics/data-analyst/SKILL.md`

# Data Analyst

The agent operates as a senior data analyst, writing production SQL, designing visualizations, running statistical tests, and translating findings into actionable business recommendations.

## Clarify First

Before the analysis, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Business question as a testable hypothesis** — with the specific metric and threshold (e.g., ">= 5% lift in 7-day retention") (frames the whole analysis and the headline)
- [ ] **Data sources and grain** — which tables/columns exist and the row grain (determines feasibility and the SQL you can write)
- [ ] **Audience and the decision** — who consumes the insight and what they will decide (sets altitude and the "Now What" recommendation)
- [ ] **Analysis type** — cohort, funnel, hypothesis test, or trend (selects the method and the chart)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

1. **Frame the business question** -- Restate the stakeholder's question as a testable hypothesis with a clear metric (e.g., "Did campaign X increase 7-day retention by >= 5%?"). Identify required data sources.
2. **Write and validate SQL** -- Use CTEs for readability. Filter early, aggregate late. Run `EXPLAIN ANALYZE` on complex queries to verify index usage and scan cost.
3. **Explore and profile data** -- Compute descriptive statistics (count, mean, median, std, quartiles, skewness). Check for nulls, duplicates, and outliers before drawing conclusions.
4. **Analyze** -- Apply the appropriate method: cohort analysis for retention, funnel analysis for conversion, hypothesis testing (t-test, chi-square) for group comparisons, regression for relationships.
5. **Visualize** -- Select chart type from the matrix below. Follow the design rules (Y-axis at zero for bars, <=7 colors, labels on axes, context via benchmarks/targets).
6. **Deliver the insight** -- Structure findings as What / So What / Now What. Lead with the headline, support with a chart, close with a concrete recommendation and expected impact.

## SQL Patterns

**Monthly aggregation with growth:**
```sql
WITH monthly AS (
    SELECT
        date_trunc('month', created_at) AS month,
        COUNT(*)                        AS total_orders,
        COUNT(DISTINCT customer_id)     AS unique_customers,
        SUM(amount)                     AS revenue
    FROM orders
    WHERE created_at >= '2024-01-01'
    GROUP BY 1
),
growth AS (
    SELECT month, revenue,
        LAG(revenue) OVER (ORDER BY month) AS prev_revenue
    FROM monthly
)
SELECT month, revenue,
    ROUND((revenue - prev_revenue) / prev_revenue * 100, 1) AS growth_pct
FROM growth
ORDER BY month;
```

**Cohort retention:**
```sql
WITH first_orders AS (
    SELECT customer_id,
        date_trunc('month', MIN(created_at)) AS cohort_month
    FROM orders GROUP BY 1
),
cohort_data AS (
    SELECT f.cohort_month,
        date_trunc('month', o.created_at) AS order_month,
        COUNT(DISTINCT o.customer_id)     AS customers
    FROM orders o
    JOIN first_orders f ON o.customer_id = f.customer_id
    GROUP BY 1, 2
)
SELECT cohort_month, order_month,
    EXTRACT(MONTH FROM AGE(order_month, cohort_month)) AS months_since,
    customers
FROM cohort_data ORDER BY 1, 2;
```

**Window functions (running total + previous order):**
```sql
SELECT customer_id, order_date, amount,
    SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date) AS running_total,
    LAG(amount) OVER (PARTITION BY customer_id ORDER BY order_date) AS prev_amount
FROM orders;
```

## Chart Selection Matrix

| Data question | Best chart | Alternative |
|---------------|-----------|-------------|
| Trend over time | Line | Area |
| Part of whole | Donut | Stacked bar |
| Comparison | Bar | Column |
| Distribution | Histogram | Box plot |
| Correlation | Scatter | Heatmap |
| Geographic | Choropleth | Bubble map |

**Design rules:** Start Y-axis at zero for bar charts. Use <= 7 colors. Label axes. Include benchmarks or targets for context. Avoid 3D charts and pie charts with > 5 slices.

## Dashboard Layout

```
+------------------------------------------------------------+
| KPI CARDS: Revenue | Customers | Conversion | NPS           |
+------------------------------------------------------------+
| TREND (line chart)            | BREAKDOWN (bar chart)       |
+-------------------------------+-----------------------------+
| COMPARISON vs target/LY      | DETAIL TABLE (top N)        |
+-------------------------------+-----------------------------+
```

## Statistical Methods

**Hypothesis testing (t-test):**
```python
from scipy import stats
import numpy as np

def compare_groups(a: np.ndarray, b: np.ndarray, alpha: float = 0.05) -> dict:
    """Compare two groups; return t-stat, p-value, Cohen's d, and significance."""
    stat, p = stats.ttest_ind(a, b)
    d = (a.mean() - b.mean()) / np.sqrt((a.std()**2 + b.std()**2) / 2)
    return {"t_statistic": stat, "p_value": p, "cohens_d": d, "significant": p < alpha}
```

**Chi-square test for independence:**
```python
def test_independence(table, alpha=0.05):
    chi2, p, dof, _ = stats.chi2_contingency(table)
    return {"chi2": chi2, "p_value": p, "dof": dof, "significant": p < alpha}
```

## Key Business Metrics

| Category | Metric | Formula |
|----------|--------|---------|
| Acquisition | CAC | Total S&M spend / New customers |
| Acquisition | Conversion rate | Conversions / Visitors |
| Engagement | DAU/MAU ratio | Daily active / Monthly active |
| Retention | Churn rate | Lost customers / Total at period start |
| Revenue | MRR | SUM(active subscription amounts) |
| Revenue | LTV | ARPU x Gross margin x Avg lifetime |

## Insight Delivery Template

```markdown
## [Headline: action-oriented finding]

**What:** One-sentence description of the observation.
**So What:** Why this matters to the business (revenue, retention, cost).
**Now What:** Recommended action with expected impact.
**Evidence:** [Chart or table supporting the finding]
**Confidence:** High / Medium / Low
```

## Analysis Framework

```markdown
# Analysis: [Topic]
## Business Question -- What are we trying to answer?
## Hypothesis -- What do we expect to find?
## Data Sources -- [Source]: [Description]
## Methodology -- Numbered steps
## Findings -- Finding 1, Finding 2 (with supporting data)
## Recommendations -- [Action]: [Expected impact]
## Limitations -- Known caveats
## Next Steps -- Follow-up actions
```

## Reference Materials

- `references/sql_patterns.md` -- Advanced SQL queries
- `references/visualization.md` -- Chart selection guide
- `references/statistics.md` -- Statistical methods
- `references/storytelling.md` -- Presentation best practices

## Scripts

```bash
python scripts/query_optimizer.py --file query.sql
python scripts/query_optimizer.py --sql "SELECT * FROM orders" --json
python scripts/data_profiler.py --file sales.csv
python scripts/data_profiler.py --file data.json --top 10 --json
python scripts/report_generator.py --file sales.csv --title "Monthly Sales Report"
python scripts/report_generator.py --file data.csv --group-by region --format markdown --json
```

## Tool Reference

| Tool | Purpose | Key Flags |
|------|---------|-----------|
| `query_optimizer.py` | Analyze SQL for anti-patterns: SELECT *, missing WHERE, cartesian joins, deep nesting, function-on-column in WHERE | `--file <sql>` or `--sql "<query>"`, `--json` |
| `data_profiler.py` | Profile CSV/JSON datasets with per-column stats, null rates, outlier detection (IQR), and quality flags | `--file <csv/json>`, `--top <n>`, `--json` |
| `report_generator.py` | Generate summary reports with numeric aggregations, group-by breakdowns, and highlights | `--file <csv/json>`, `--title`, `--group-by <col>`, `--format text/markdown`, `--json` |

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| SQL query runs for minutes on a table with indexes | Query uses functions on indexed columns in WHERE clause (e.g., `WHERE UPPER(name) = ...`) | Apply the function to the comparison value instead, or create an expression index; run `query_optimizer.py` to detect this pattern |
| `data_profiler.py` flags HIGH_NULL_RATE on expected optional fields | The tool flags any column with > 50% nulls regardless of business intent | Review flagged columns; suppress false positives by filtering the output or documenting expected null rates |
| Cohort retention query returns duplicate customers | JOIN logic counts the same customer multiple times across order items | Ensure `COUNT(DISTINCT customer_id)` is used and the cohort grain is correct |
| Bar chart Y-axis exaggerates differences | Y-axis does not start at zero | Always start bar-chart Y-axis at zero; use line charts when the baseline is not meaningful |
| Stakeholders challenge statistical significance | Sample size is too small or alpha threshold is unclear | Pre-register the hypothesis, calculate required sample size before analysis, and report confidence intervals alongside p-values |
| `report_generator.py` shows unexpected column as numeric | Column contains mostly numbers but includes some text codes | Clean the data upstream or pre-filter; the tool treats a column as numeric when > 80% of values parse as floats |
| EXPLAIN ANALYZE shows sequential scan despite index existence | Query predicates do not match the index columns or the table is too small for the planner to prefer an index | Verify index column order matches query predicates; for small tables, sequential scan may actually be faster |

## Success Criteria

- Every analysis follows the Frame-Query-Explore-Analyze-Visualize-Deliver workflow before presenting findings.
- SQL queries pass `query_optimizer.py` with zero critical issues before deployment to production dashboards.
- Data profiles are generated for every new dataset before analysis begins, documenting null rates and outliers.
- Statistical tests include effect size (Cohen's d or Cramer's V) and confidence intervals, not just p-values.
- Insights are delivered in the What / So What / Now What format with quantified business impact.
- Visualizations follow the chart selection matrix and design rules (Y-axis at zero for bars, <= 7 colors, labeled axes).
- Reports generated by `report_generator.py` are reviewed for accuracy against source queries before distribution.

## Scope & Limitations

**In scope:** SQL query writing and optimization, data profiling and exploration, statistical hypothesis testing (t-test, chi-square, proportions), cohort and funnel analysis, data visualization design, and business insight delivery.

**Out of scope:** Data pipeline engineering, machine learning model training, dashboard platform administration, data warehouse infrastructure, and real-time streaming analytics.

**Limitations:** The Python tools use only the Python standard library -- statistical tests use approximations (Abramowitz-Stegun for normal CDF) rather than exact distributions. For production-grade statistics, use scipy or statsmodels. `query_optimizer.py` performs static analysis on SQL text and does not connect to a database or inspect actual query plans. `data_profiler.py` loads data into memory, so very large files (> 1 GB) may require chunked processing.

## Integration Points

- **Analytics Engineer** (`data-analytics/analytics-engineer`): Provides the clean mart models that analysts query; data quality issues found during analysis feed back to the analytics engineer.
- **Business Intelligence** (`data-analytics/business-intelligence`): Ad-hoc analyses that prove valuable often graduate into repeatable BI dashboards.
- **Data Scientist** (`data-analytics/data-scientist`): Complex findings requiring predictive modeling or causal inference are handed off to data science.
- **Product Team** (`product-team/`): Product managers consume funnel and cohort analyses for feature prioritization.
- **Business Growth** (`business-growth/`): Revenue and customer health analyses inform growth strategy.

---

## data-scientist

Source path: `references/data-analytics/data-scientist/SKILL.md`

# Data Scientist

The agent operates as a senior data scientist, selecting algorithms, engineering features, designing experiments, evaluating models, and translating predictions into business impact.

## Clarify First

Before modeling, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **ML task + primary metric** — classification, regression, ranking, or clustering, and the metric that defines success (e.g., F1, RMSE) (drives algorithm selection and evaluation)
- [ ] **Constraints** — latency, interpretability, and data volume (decides where on the simple→complex model ladder to land)
- [ ] **Target variable and label quality** — what is being predicted and how clean/balanced the labels are (drives feature engineering and imbalance handling)
- [ ] **For an A/B test: baseline rate + MDE** — current conversion and the smallest lift worth detecting (drives the required sample size)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

1. **Define the problem** -- Restate the business objective as an ML task (classification, regression, ranking, clustering). Define the primary evaluation metric (e.g., F1 for imbalanced classification, RMSE for regression). Document constraints (latency, interpretability, data volume).
2. **Collect and profile data** -- Identify sources, check row counts, null rates, class balance, and feature distributions. Flag data-quality issues before modeling.
3. **Engineer features** -- Create numerical transforms (log, binning), encode categoricals (one-hot, target, frequency), extract time components (hour, day-of-week, cyclical sin/cos). Select top features via importance, mutual information, or RFE.
4. **Select and train models** -- Use the algorithm selection matrix below. Start simple (logistic/linear regression), then add complexity (Random Forest, XGBoost, neural nets) only if needed. Use cross-validation.
5. **Evaluate rigorously** -- Report classification metrics (accuracy, precision, recall, F1, AUC-ROC) or regression metrics (MAE, RMSE, R-squared, MAPE). Compare against a baseline. Check for overfitting (train vs. test gap).
6. **Communicate results** -- Present business impact (e.g., "model reduces false positives by 30%, saving $500K/yr"). Recommend deployment path or next experiment.

## Algorithm Selection Matrix

| Scenario | Recommended | When to upgrade |
|----------|------------|-----------------|
| Need interpretability | Logistic / Linear Regression | Always start here for stakeholder-facing models |
| Small data (< 10K rows) | Random Forest | Move to XGBoost if accuracy insufficient |
| Medium data, high accuracy needed | XGBoost / LightGBM | Default workhorse for tabular data |
| Large data, complex patterns | Neural Network | Only when tree methods plateau |
| Unsupervised grouping | K-Means / DBSCAN | Use silhouette score to validate k |

## Feature Engineering Examples

**Numerical transforms:**
```python
import numpy as np, pandas as pd

def engineer_numerical(df: pd.DataFrame, col: str) -> pd.DataFrame:
    return pd.DataFrame({
        f'{col}_log':     np.log1p(df[col]),
        f'{col}_sqrt':    np.sqrt(df[col].clip(lower=0)),
        f'{col}_squared': df[col] ** 2,
        f'{col}_binned':  pd.cut(df[col], bins=5, labels=False),
    })
```

**Time-based features with cyclical encoding:**
```python
def engineer_time(df: pd.DataFrame, col: str) -> pd.DataFrame:
    dt = pd.to_datetime(df[col])
    return pd.DataFrame({
        f'{col}_hour':      dt.dt.hour,
        f'{col}_dayofweek': dt.dt.dayofweek,
        f'{col}_month':     dt.dt.month,
        f'{col}_is_weekend': dt.dt.dayofweek.isin([5, 6]).astype(int),
        f'{col}_hour_sin':  np.sin(2 * np.pi * dt.dt.hour / 24),
        f'{col}_hour_cos':  np.cos(2 * np.pi * dt.dt.hour / 24),
    })
```

**Feature selection (importance-based):**
```python
from sklearn.ensemble import RandomForestClassifier

def select_top_features(X, y, n=20):
    rf = RandomForestClassifier(n_estimators=100, random_state=42)
    rf.fit(X, y)
    importance = pd.Series(rf.feature_importances_, index=X.columns)
    return importance.nlargest(n).index.tolist()
```

## Model Evaluation

**Classification:**
```python
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score

def evaluate_classifier(y_true, y_pred, y_proba=None) -> dict:
    m = {
        "accuracy":  accuracy_score(y_true, y_pred),
        "precision": precision_score(y_true, y_pred),
        "recall":    recall_score(y_true, y_pred),
        "f1":        f1_score(y_true, y_pred),
    }
    if y_proba is not None:
        m["auc_roc"] = roc_auc_score(y_true, y_proba)
    return m
```

**Regression:**
```python
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

def evaluate_regressor(y_true, y_pred) -> dict:
    return {
        "mae":  mean_absolute_error(y_true, y_pred),
        "rmse": np.sqrt(mean_squared_error(y_true, y_pred)),
        "r2":   r2_score(y_true, y_pred),
    }
```

## A/B Test Design and Analysis

**Sample size calculation:**
```python
from scipy import stats
import numpy as np

def required_sample_size(baseline_rate: float, mde: float, alpha: float = 0.05, power: float = 0.8) -> int:
    """Return required N per variant. mde is relative (e.g., 0.10 = 10% lift)."""
    effect = baseline_rate * mde
    z_a = stats.norm.ppf(1 - alpha / 2)
    z_b = stats.norm.ppf(power)
    p = baseline_rate
    return int(np.ceil(2 * p * (1 - p) * (z_a + z_b) ** 2 / effect ** 2))

# Example: baseline 5% conversion, detect 10% relative lift
# >>> required_sample_size(0.05, 0.10)  -> ~62,214 per variant
```

**Result analysis:**
```python
def analyze_ab(control: np.ndarray, treatment: np.ndarray, alpha: float = 0.05) -> dict:
    """Analyze A/B test with proportions z-test."""
    n_c, n_t = len(control), len(treatment)
    p_c, p_t = control.mean(), treatment.mean()
    p_pool = (control.sum() + treatment.sum()) / (n_c + n_t)
    se = np.sqrt(p_pool * (1 - p_pool) * (1/n_c + 1/n_t))
    z = (p_t - p_c) / se
    p_val = 2 * (1 - stats.norm.cdf(abs(z)))
    return {
        "control_rate": p_c, "treatment_rate": p_t,
        "lift": (p_t - p_c) / p_c,
        "p_value": p_val, "significant": p_val < alpha,
        "ci_95": ((p_t - p_c) - 1.96 * se, (p_t - p_c) + 1.96 * se),
    }
```

## Project Template

```markdown
# Data Science Project: [Name]
## Business Objective -- What problem are we solving?
## Success Metrics -- Primary: [metric]; Secondary: [metric]
## Data -- Sources, size (rows/features), time period
## Methodology -- Numbered steps
## Results
| Metric | Baseline | Model | Improvement |
|--------|----------|-------|-------------|
## Business Impact -- [Quantified impact]
## Recommendations -- [Next actions]
## Limitations -- [Known caveats]
```

## Reference Materials

- `references/ml_algorithms.md` -- Algorithm deep dives
- `references/feature_engineering.md` -- Feature engineering patterns
- `references/experimentation.md` -- A/B testing guide
- `references/statistics.md` -- Statistical methods

## Scripts

```bash
python scripts/experiment_tracker.py log --name "xgb_v2" --params '{"lr":0.1,"depth":6}' --metrics '{"f1":0.87,"auc":0.92}'
python scripts/experiment_tracker.py list --sort-by f1 --top 5
python scripts/experiment_tracker.py compare --ids 1 3 5 --json
python scripts/hypothesis_tester.py ttest --file data.csv --col-a group_a --col-b group_b
python scripts/hypothesis_tester.py proportion --successes-a 120 --trials-a 1000 --successes-b 145 --trials-b 1000
python scripts/hypothesis_tester.py chi-square --file contingency.csv --json
python scripts/feature_selector.py --file dataset.csv --target churn --top 10
python scripts/feature_selector.py --file dataset.csv --target revenue --method correlation --json
```

## Tool Reference

| Tool | Purpose | Key Flags |
|------|---------|-----------|
| `experiment_tracker.py` | Log, list, and compare experiments with parameters, metrics, and tags in a local JSON file | `log --name --params --metrics --tags`, `list --sort-by --top`, `compare --ids`, `--json` |
| `hypothesis_tester.py` | Run statistical tests: Welch's t-test, paired t-test, proportion z-test, chi-square independence | `ttest --file --col-a --col-b [--paired]`, `proportion --successes-a --trials-a ...`, `chi-square --file`, `--json` |
| `feature_selector.py` | Rank features by composite score (variance, correlation, mutual information, null rate) for a target column | `--file <csv>`, `--target <col>`, `--top <n>`, `--method all/correlation/mutual_info`, `--json` |

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Model overfits (large train-test gap in metrics) | Too many features, insufficient regularization, or data leakage | Reduce feature count with `feature_selector.py`, add regularization, and audit feature engineering for temporal leakage |
| A/B test shows significant result but tiny effect size | Large sample size makes small differences statistically significant | Always report effect size (Cohen's d) alongside p-value; use practical significance thresholds |
| `hypothesis_tester.py` p-value differs from scipy | The tool uses normal/t-distribution approximations (standard library only) | For publication-grade analysis, validate with scipy.stats; the tool is designed for fast directional estimates |
| Feature importance scores are near-zero for all features | Target variable has extremely low variance or the feature set lacks predictive signal | Check target distribution; consider feature engineering or collecting additional data sources |
| `experiment_tracker.py` shows experiment IDs out of order | Experiments were logged non-sequentially or the log file was manually edited | IDs are auto-incremented; use `--sort-by` on a metric for meaningful ordering |
| Chi-square test fails with "table must be at least 2x2" | CSV contingency table has fewer than 2 rows or 2 columns of numeric data | Ensure the CSV has a header row and at least 2x2 numeric cells; verify the format matches expectations |
| Class imbalance causes misleading accuracy | Accuracy inflated by majority class predictions | Use F1, precision-recall, or AUC-ROC instead; apply SMOTE or class weights during training |

## Success Criteria

- Every ML project follows the Define-Collect-Engineer-Train-Evaluate-Communicate workflow before deployment.
- Feature selection is documented: `feature_selector.py` output is saved with the experiment record.
- All experiments are tracked with `experiment_tracker.py` including parameters, metrics, and a descriptive name.
- Model evaluation reports include at least 3 metrics (e.g., F1, AUC-ROC, precision) and comparison against a baseline.
- A/B tests pre-register the hypothesis, sample size calculation, and primary metric before data collection begins.
- Statistical tests report effect size and confidence intervals, not just p-values.
- Business impact is quantified in dollar terms or user-metric terms (e.g., "reduces false positives by 30%, saving $500K/yr").

## Scope & Limitations

**In scope:** Machine learning algorithm selection, feature engineering, model training and evaluation, A/B test design and analysis, statistical hypothesis testing, experiment tracking, and communicating results to stakeholders.

**Out of scope:** Model deployment to production (see ml-ops-engineer), data pipeline infrastructure, dashboard development, and real-time serving architecture.

**Limitations:** The Python tools use only the Python standard library. `hypothesis_tester.py` uses normal and t-distribution approximations that are accurate for moderate sample sizes but should be validated with scipy for edge cases (very small n, extreme skew). `feature_selector.py` computes approximate mutual information using binned discretization -- for high-precision feature selection, use sklearn's mutual_info_classif or permutation importance. All tools process local files and do not integrate with MLflow, W&B, or other tracking platforms.

## Integration Points

- **MLOps Engineer** (`data-analytics/ml-ops-engineer`): Trained models are handed off for production deployment, monitoring, and registry management.
- **Data Analyst** (`data-analytics/data-analyst`): Complex analytical questions requiring predictive modeling are escalated from the analyst to the data scientist.
- **Analytics Engineer** (`data-analytics/analytics-engineer`): Feature engineering pipelines may depend on mart models as upstream data sources.
- **Product Team** (`product-team/`): Experiment results inform product decisions; A/B test designs are co-created with product managers.
- **Engineering** (`engineering/senior-ml-engineer`): Algorithm implementation details and model architecture decisions bridge data science and ML engineering.

---

## ml-ops-engineer

Source path: `references/data-analytics/ml-ops-engineer/SKILL.md`

# MLOps Engineer

The agent operates as a senior MLOps engineer, deploying models to production, orchestrating training pipelines, monitoring model health, managing feature stores, and automating ML CI/CD.

## Clarify First

Before deploying, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Serving mode + latency SLA** — real-time (FastAPI/K8s) or batch, and the P99 target (drives the entire deployment architecture)
- [ ] **Current MLOps maturity** — manual, pipeline, CI/CD, or full (identifies the highest-impact gap to close first)
- [ ] **Model artifact + registry/infra** — framework, where it is stored, and target platform (MLflow, K8s) (drives the serving and registry config)
- [ ] **Monitoring thresholds** — drift and accuracy-drop limits plus check cadence (drives alert rules and drift detection)

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflow

1. **Assess ML maturity** -- Determine the current level (manual notebooks vs. automated pipelines vs. full CI/CD). Identify the highest-impact gap to close first.
2. **Build or extend training pipeline** -- Define fetch-data, validate, preprocess, train, evaluate stages. Use Kubeflow, Airflow, or equivalent. Gate deployment on an accuracy threshold (e.g., > 0.85).
3. **Deploy model for serving** -- Choose real-time (FastAPI + K8s) or batch (Spark/Parquet) based on latency requirements. Configure health checks, autoscaling, and resource limits.
4. **Register in model registry** -- Log parameters, metrics, and artifacts in MLflow. Transition the winning version to Production stage; archive the previous version.
5. **Instrument monitoring** -- Set up latency (P50/P95/P99), error rate, prediction-distribution, and feature-drift dashboards. Configure alerting thresholds.
6. **Validate end-to-end** -- Run smoke tests against the serving endpoint. Confirm monitoring dashboards populate. Verify rollback procedure works.

## MLOps Maturity Model

| Level | Capabilities | Key signals |
|-------|-------------|------------|
| 0 - Manual | Jupyter notebooks, manual deploy | No version control on models |
| 1 - Pipeline | Automated training, versioned models | MLflow tracking in use |
| 2 - CI/CD | Continuous training, automated tests | Feature store operational |
| 3 - Full MLOps | Auto-retraining on drift, A/B testing | SLA-backed monitoring |

## Real-Time Serving Example

```python
# model_server.py -- FastAPI model serving
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import mlflow.pyfunc, time

app = FastAPI()
model = mlflow.pyfunc.load_model("models:/fraud_detector/Production")

class PredictionRequest(BaseModel):
    features: list[float]

class PredictionResponse(BaseModel):
    prediction: float
    model_version: str
    latency_ms: float

@app.post("/predict", response_model=PredictionResponse)
async def predict(req: PredictionRequest):
    start = time.time()
    try:
        pred = model.predict([req.features])[0]
        return PredictionResponse(
            prediction=pred,
            model_version=model.metadata.run_id,
            latency_ms=(time.time() - start) * 1000,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "healthy", "model_loaded": model is not None}
```

## Kubernetes Deployment

```yaml
# k8s/model-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: model-server
spec:
  replicas: 3
  selector:
    matchLabels: {app: model-server}
  template:
    metadata:
      labels: {app: model-server}
    spec:
      containers:
      - name: model-server
        image: gcr.io/project/model-server:v1.2.3
        ports: [{containerPort: 8080}]
        resources:
          requests: {memory: "2Gi", cpu: "1000m"}
          limits: {memory: "4Gi", cpu: "2000m", nvidia.com/gpu: 1}
        env:
        - {name: MODEL_URI, value: "s3://models/production/v1.2.3"}
        readinessProbe:
          httpGet: {path: /health, port: 8080}
          initialDelaySeconds: 30
          periodSeconds: 10
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: model-server-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: model-server
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target: {type: Utilization, averageUtilization: 70}
```

## Drift Detection

```python
# monitoring/drift_detector.py
import numpy as np
from scipy import stats
from dataclasses import dataclass

@dataclass
class DriftResult:
    feature: str
    drift_score: float
    is_drifted: bool
    p_value: float

def detect_drift(reference: np.ndarray, current: np.ndarray, threshold: float = 0.05) -> DriftResult:
    """Detect distribution drift using Kolmogorov-Smirnov test."""
    statistic, p_value = stats.ks_2samp(reference, current)
    return DriftResult(feature="", drift_score=statistic, is_drifted=p_value < threshold, p_value=p_value)

def monitor_all_features(reference: dict, current: dict, threshold: float = 0.05) -> list[DriftResult]:
    """Run drift detection across all features; return list of results."""
    results = []
    for feat in reference:
        r = detect_drift(reference[feat], current[feat], threshold)
        r.feature = feat
        results.append(r)
    return results
```

## Alert Rules

```python
ALERT_RULES = {
    "latency_p99":    {"threshold": 200,  "severity": "warning",  "msg": "P99 latency exceeded 200 ms"},
    "error_rate":     {"threshold": 0.01, "severity": "critical", "msg": "Error rate exceeded 1%"},
    "accuracy_drop":  {"threshold": 0.05, "severity": "critical", "msg": "Accuracy dropped > 5%"},
    "drift_score":    {"threshold": 0.15, "severity": "warning",  "msg": "Feature drift detected"},
}
```

## Feature Store (Feast)

```python
# features/customer_features.py
from feast import Entity, Feature, FeatureView, FileSource, ValueType
from datetime import timedelta

customer = Entity(name="customer_id", value_type=ValueType.INT64)

customer_stats = FeatureView(
    name="customer_stats",
    entities=["customer_id"],
    ttl=timedelta(days=1),
    features=[
        Feature(name="total_purchases",       dtype=ValueType.FLOAT),
        Feature(name="avg_order_value",        dtype=ValueType.FLOAT),
        Feature(name="days_since_last_order",  dtype=ValueType.INT32),
        Feature(name="lifetime_value",         dtype=ValueType.FLOAT),
    ],
    online=True,
    source=FileSource(
        path="gs://features/customer_stats.parquet",
        timestamp_field="event_timestamp",
    ),
)
```

**Online retrieval at serving time:**
```python
from feast import FeatureStore
store = FeatureStore(repo_path=".")
features = store.get_online_features(
    features=["customer_stats:total_purchases", "customer_stats:avg_order_value"],
    entity_rows=[{"customer_id": 1234}],
).to_dict()
```

## Experiment Tracking (MLflow)

```python
import mlflow

mlflow.set_tracking_uri("http://mlflow.company.com")
mlflow.set_experiment("fraud_detection")

with mlflow.start_run(run_name="xgboost_v2"):
    mlflow.log_params({"n_estimators": 100, "max_depth": 6, "learning_rate": 0.1})
    model = train_model(X_train, y_train)
    mlflow.log_metrics({
        "accuracy": accuracy_score(y_test, preds),
        "f1": f1_score(y_test, preds),
    })
    mlflow.sklearn.log_model(model, "model", registered_model_name="fraud_detector")
```

For extended pipeline examples (Kubeflow, Airflow DAGs, full CI/CD workflows), see `REFERENCE.md`.

## Reference Materials

- `REFERENCE.md` -- Extended patterns: Kubeflow pipelines, Airflow DAGs, CI/CD workflows, model registry operations
- `references/deployment_patterns.md` -- Model deployment strategies
- `references/monitoring_guide.md` -- ML monitoring best practices
- `references/feature_store.md` -- Feature store patterns
- `references/pipeline_design.md` -- ML pipeline architecture

## Scripts

```bash
python scripts/model_registry.py register --name fraud_detector --version v2.3 --metrics '{"f1":0.91,"auc":0.95}' --params '{"n_estimators":200}'
python scripts/model_registry.py promote --name fraud_detector --version v2.3 --stage production
python scripts/model_registry.py list --stage production --json
python scripts/model_registry.py compare --name fraud_detector --versions v2.2 v2.3
python scripts/drift_detector.py --reference train_data.csv --current prod_data.csv
python scripts/drift_detector.py --reference baseline.csv --current latest.csv --threshold 0.1 --json
python scripts/pipeline_validator.py --pipeline pipeline.json --strict
python scripts/pipeline_validator.py --pipeline pipeline.json --json
```

## Tool Reference

| Tool | Purpose | Key Flags |
|------|---------|-----------|
| `model_registry.py` | Register, promote, list, and compare model versions with metrics, parameters, and lifecycle stages | `register --name --version --metrics --params`, `promote --stage`, `list`, `compare --versions`, `--json` |
| `drift_detector.py` | Detect data/model drift between reference and current datasets using KS statistic, PSI, and chi-square | `--reference <csv>`, `--current <csv>`, `--columns`, `--threshold`, `--json` |
| `pipeline_validator.py` | Validate ML pipeline definitions for completeness, stage ordering, evaluation gates, and rollback config | `--pipeline <json>`, `--strict`, `--json` |

## Troubleshooting

| Problem | Likely Cause | Resolution |
|---------|-------------|------------|
| Model latency exceeds P99 SLA (> 200 ms) | Model is too large, input preprocessing is slow, or pod resources are undersized | Profile the serving endpoint; consider model distillation, input caching, or increasing CPU/memory limits |
| `drift_detector.py` flags all features as drifted | Threshold is too low or the reference data is from a different time period than expected | Increase the threshold (try 0.15-0.2) or regenerate the reference dataset from a more representative window |
| Pipeline fails at the evaluation gate | Model accuracy dropped below the configured threshold | Check for data quality issues upstream; compare feature distributions with `drift_detector.py`; retrain with fresh data |
| Model registry shows "already registered" error | The exact name + version combination was previously registered | Use a new version string (e.g., v2.3.1) or remove the old entry if it was a test |
| Kubernetes pods crash-loop on model server | OOM kill due to model size exceeding memory limits, or health check timeout too short | Increase `resources.limits.memory`; extend `initialDelaySeconds` on readiness probe for large models |
| Feature store returns stale features | Materialization job failed or ran outside the TTL window | Check materialization logs; re-run `materialize_features`; consider reducing TTL or adding freshness alerts |
| `pipeline_validator.py` reports STAGE_ORDER error | Pipeline stages are defined out of the expected sequence (data -> transform -> train -> evaluate -> deploy) | Reorder stages to follow the canonical sequence; the validator expects data stages before training stages |

## Success Criteria

- All production models are registered in the model registry with version, metrics, and parameters before serving traffic.
- Drift detection runs on a scheduled cadence (at least weekly) with alerts when PSI > 0.2 or KS > 0.15.
- ML pipelines pass `pipeline_validator.py --strict` with zero errors before deployment.
- Model serving latency stays within SLA: P50 < 50 ms, P95 < 100 ms, P99 < 200 ms.
- Every model promotion to production automatically archives the previous production version.
- Rollback to the previous model version completes in under 5 minutes with zero downtime.
- Pipeline stages include evaluation gates that block deployment when accuracy drops below the defined threshold.

## Scope & Limitations

**In scope:** Model deployment (real-time and batch), ML pipeline orchestration, model registry management, drift detection (data drift, concept drift, prediction drift), feature store patterns, monitoring and alerting, Kubernetes deployment configurations, and CI/CD for ML.

**Out of scope:** Model architecture design and algorithm selection (see data-scientist), raw data ingestion pipelines, BI dashboard development, and business strategy.

**Limitations:** The Python tools use only the Python standard library. `drift_detector.py` computes KS statistic and PSI using approximations suitable for most distributions but does not support multivariate drift detection or Evidently/Alibi Detect integration. `model_registry.py` stores state in a local JSON file -- for production use, integrate with MLflow Model Registry or a similar platform. `pipeline_validator.py` validates structure and conventions but does not execute pipeline stages.

## Integration Points

- **Data Scientist** (`data-analytics/data-scientist`): Receives trained models with experiment metadata; promotes winning experiments to the registry for deployment.
- **Analytics Engineer** (`data-analytics/analytics-engineer`): Feature engineering pipelines may depend on dbt mart models; schema changes trigger pipeline revalidation.
- **Engineering** (`engineering/senior-ml-engineer`): Collaborates on model architecture optimization for serving constraints (latency, memory, GPU).
- **Infrastructure** (`engineering/`): Kubernetes configurations, autoscaling policies, and CI/CD workflows are co-managed with platform engineering.
- **Business Intelligence** (`data-analytics/business-intelligence`): Model predictions may feed into BI dashboards; monitoring metrics are surfaced in operational dashboards.

---

## statistical-analyst

Source path: `references/data-analytics/statistical-analyst/SKILL.md`

# Statistical Analyst

Most bad statistics in business are not arithmetic errors. They are the wrong
test on the right data, a null result reported as "no difference," a p-value
mistaken for an effect size, or twenty comparisons run and the one that cleared
0.05 written up. This skill covers the applied path: pick the test the data
shape actually calls for, check the assumptions that carry weight, size the
study before running it, report effects with intervals rather than bare
p-values, and say what you found to people who do not want a statistics lecture.

Everything here runs on the Python standard library — the t, chi-square, and
normal distributions are implemented directly, so there is no scipy dependency
between a question and an answer. Because those implementations are hand-rolled,
`stats_core.py --selftest` verifies all of them against published reference
values; run it once before trusting any result.

## When to use this skill

- An A/B test finished and someone needs to know whether to ship
- A study is being designed and nobody has computed how many observations it needs
- A stakeholder is quoting a p-value as if it were an effect size
- A "no difference" result is about to be reported from a study that was underpowered
- Several variants, metrics, or segments were compared and no correction was applied
- The data are skewed or outlier-heavy and the default t test is about to be run anyway

## Inputs the skill expects

- The business question and what decision it will change
- The outcome variable and its type (binary, continuous, count, ordinal, categorical)
- Group structure — how many groups, independent or paired, randomized or observational
- Observation counts per group, and the unit of measurement (user, session, order)
- The baseline value and the smallest effect worth acting on
- How many comparisons are in the family, and which metric was named primary before the data arrived

## Clarify First

Before analyzing, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The unit of measurement, and whether each unit appears once** — clustering (many sessions per user counted as independent rows) deflates standard errors and manufactures significance; it invalidates every test below
- [ ] **The smallest effect worth acting on** — without it there is no way to size the study or to say whether a significant result matters
- [ ] **How many comparisons are in the family, and which metric was primary** — decides the correction and whether the result is confirmatory or exploratory
- [ ] **Whether anyone has already looked at the data while it accumulated** — peeking invalidates a fixed-horizon test and changes the whole approach

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Choose the test and size the study before collecting data

1. Write down the business question and the decision it changes. If the answer
   changes nothing, stop — do not run the study.
2. Fill in the outcome type, group structure, baseline, and the minimum effect
   worth shipping into a question spec.
3. Run the selector. It returns one test, its load-bearing assumptions, the
   fallback when they fail, and the sample size the stated effect requires.
4. If the achievable sample is below the required sample, say so **before**
   running. An underpowered study should be a conscious decision, not a
   discovery at write-up time.
5. Record everything in `assets/experiment_design_template.md`.

```bash
python3 data-analytics/statistical-analyst/scripts/test_selector.py \
  --input data-analytics/statistical-analyst/assets/sample_question.json \
  --power 0.9
```

### Workflow 2 — Run the test and report the effect, not the p-value

1. Check independence first: count units versus count rows. More rows than
   units means clustering, and no test below is valid until that is handled.
2. Inspect skew and outliers (mean vs median, top and bottom five values). If
   the data are heavy-tailed at small n, switch to Mann-Whitney.
3. Run the test with the number of comparisons in the family declared, so the
   threshold is corrected.
4. Read the effect size and the interval first. Report the effect in domain
   units, the interval in the same units, and the decision implication.

```bash
python3 data-analytics/statistical-analyst/scripts/stats_core.py --selftest

python3 data-analytics/statistical-analyst/scripts/run_test.py \
  --input data-analytics/statistical-analyst/assets/sample_experiment.json \
  --comparisons 3
```

### Workflow 3 — Audit someone else's statistical claim

1. Ask what the unit of measurement was and whether units repeat. This finds
   more real errors than every distributional check combined.
2. Ask how many comparisons were run in total, including the ones not reported,
   and whether the primary metric was named before the data arrived.
3. Re-run the test from the raw counts, with the true comparison count.
4. If the claim is a null result, compute the interval and state the largest
   effect the study could have missed — "no difference" and "we could not tell"
   look identical in a significance test and are opposite conclusions.

```bash
python3 data-analytics/statistical-analyst/scripts/run_test.py \
  --input data-analytics/statistical-analyst/assets/sample_revenue.json \
  --test welch_t --comparisons 4 --format json
```

## Decision frameworks

### Test selection

| Question | Outcome | Groups | Test | Effect size |
|----------|---------|--------|------|-------------|
| Difference | Binary | 2 independent | [PROVEN] Two-proportion z | Absolute difference; Cohen's h |
| Difference | Binary | 2 paired | [PROVEN] McNemar | Odds ratio on discordant pairs |
| Difference | Binary/categorical | 3+ | [PROVEN] Chi-square of independence | Cramér's V |
| Difference | Continuous, symmetric | 2 independent | [PROVEN] Welch's t | Mean difference; Hedges' g |
| Difference | Continuous, skewed or n<15 | 2 independent | [PROVEN] Mann-Whitney U | Rank-biserial r |
| Difference | Continuous | 3+ | [RECOMMENDED] One-way ANOVA | Eta-squared |
| Difference | Count per exposure | 2 | [RECOMMENDED] Poisson rate ratio | Rate ratio |
| Association | Two continuous | — | [PROVEN] Pearson, or Spearman if skewed | r, r² |
| Change over time | Any | — | [RECOMMENDED] Interrupted time series | Level and slope change |

**Use Welch's t, never Student's t, as the two-group default.** It does not
assume equal variances and costs a fraction of a degree of freedom when they
are equal. Testing for equal variance first and then choosing is worse than
always using Welch — the pre-test inflates the error rate of the whole
procedure.

### Reading an interval against your decision threshold

| Interval position | Reading | Action |
|-------------------|---------|--------|
| Entirely above the threshold | Real and big enough | Ship |
| Above zero, straddles the threshold | Real, unclear if it clears the bar | Collect more, or decide on cost |
| Straddles zero, **narrow** | Genuinely no meaningful effect | Do not ship — and this is the only case where "no difference" is honest |
| Straddles zero, **wide** | Study could not answer the question | Report as inconclusive, state the upper bound |

The last two are identical in a significance test and are opposite conclusions.
That is the strongest single argument for reporting intervals.

### Sample size reality check

Per group, α = 0.05, power = 0.80:

| Baseline rate | Relative effect to detect | n per group |
|---------------|---------------------------|-------------|
| 2% | +10% | ~78,000 |
| 8% | +10% | ~28,500 |
| 8% | +25% | ~4,900 |
| 20% | +10% | ~9,000 |
| 20% | +25% | ~1,600 |

Most product experiments are sized by "how long can we wait," which is how
underpowered studies get written up as "no difference."

## Anti-Patterns

### P-hacking by exploration
**Mistake:** Twenty metrics, six segments, and three time windows get compared; the one combination that clears p < 0.05 becomes the headline.
**Why it happens:** It rarely feels like cheating. Each individual comparison is a reasonable question, the analyst is genuinely curious, and the tooling makes slicing free. Nobody counts the comparisons because nobody wrote them down.
**Instead:** Name one primary metric before the data arrive and pre-register the subgroups you will examine. Everything else is exploratory, gets Benjamini-Hochberg correction, and is reported as hypothesis-generating rather than decisive. With α = 0.05 and 20 uncorrected comparisons, the chance of at least one false positive is 64% — a coin flip dressed as a finding.

### Peeking at a running experiment
**Mistake:** The dashboard is checked daily and the test is stopped the moment p dips below 0.05.
**Why it happens:** The data are right there, stopping early saves time and traffic, and each individual look feels harmless. The intuition that "more data can only help" is exactly backwards here.
**Instead:** Fix the horizon, compute n up front, and do not look — or use a method built for continuous monitoring (group sequential with O'Brien-Fleming spending, or always-valid confidence sequences). Repeated peeking at an uncorrected fixed-horizon test drives the real false-positive rate to 20-30%: a random walk crosses the threshold eventually even when nothing is happening. If it has already happened, report the result as exploratory and re-run with a fixed horizon.

### Reading a null result as "no effect"
**Mistake:** p = 0.31, so the memo says the change made no difference and the feature is killed.
**Why it happens:** "Not significant" sounds like "no effect," and the alternative sentence — "we ran a study that could not answer the question" — is uncomfortable to write.
**Instead:** Report the interval. If it runs from −0.2% to +4.1%, the study is consistent with a substantial gain and has ruled out almost nothing. State the largest effect you could have missed. Only a *narrow* interval around zero supports "no meaningful effect," and that distinction is invisible in the p-value.

### Confusing significance with importance
**Mistake:** At n = 400,000 a 0.02% conversion difference reaches p < 0.001 and gets a roadmap slot.
**Why it happens:** p-values conflate effect size with sample size, so at large n everything is significant. The number looks impressive precisely because the sample is large.
**Instead:** Set the decision threshold from the economics — cost to ship divided by value per unit — before the analysis. Then compare the interval to that threshold, not to zero. The reciprocal error matters equally: at small n, an important effect can miss significance and get discarded.

### Ignoring the unit of measurement
**Mistake:** A test on 50,000 sessions from 4,000 users treats every session as an independent observation.
**Why it happens:** The event table has 50,000 rows, the tooling counts rows, and the resulting p-value is gratifyingly small. It is invisible unless someone explicitly compares row count to unit count.
**Instead:** Aggregate to the unit of assignment before testing, or use a cluster-robust method. Treating clustered rows as independent can understate the standard error several-fold and turn pure noise into a highly significant result. This is the single most common invalidating error in applied product analytics, and the cheapest to check.

## Files

| File | Purpose |
|------|---------|
| `scripts/test_selector.py` | Recommends one test from question type, outcome type, group structure, and distribution; returns assumptions, fallback, required sample size for a stated MDE, and design warnings |
| `scripts/run_test.py` | Runs two-proportion z, Welch's t, chi-square, and Mann-Whitney with effect sizes, confidence intervals, Bonferroni-adjusted thresholds, and assumption warnings |
| `scripts/test_impl.py` | The four test implementations behind `run_test.py`, with their effect-size magnitude readings; `--selftest` verifies each against a worked example |
| `scripts/stats_core.py` | Normal, Student's t, and chi-square distributions plus the Wilson interval, in stdlib `math` only; `--selftest` verifies all 18 against published reference values |
| `references/test-selection-and-assumptions.md` | Selection tree, which assumptions are load-bearing and how each fails, power formulas and sizing tables, multiple-comparison corrections, sequential testing |
| `references/effect-sizes-and-communication.md` | Effect sizes per test with thresholds, interval choice and interpretation, language for non-statisticians, practical-vs-statistical significance, reporting checklist |
| `assets/sample_question.json` | Question spec for the selector — an underpowered 3-variant conversion test |
| `assets/sample_experiment.json` | Two-proportion conversion data |
| `assets/sample_revenue.json` | Continuous order-value data for Welch's t |
| `assets/sample_contingency.json` | 3x4 contingency table for chi-square |
| `assets/sample_session_times.json` | Right-skewed time-on-task data for Mann-Whitney |
| `assets/experiment_design_template.md` | Pre-registration template: question, primary metric, decision threshold, sizing, stopping rule, deviations log |
