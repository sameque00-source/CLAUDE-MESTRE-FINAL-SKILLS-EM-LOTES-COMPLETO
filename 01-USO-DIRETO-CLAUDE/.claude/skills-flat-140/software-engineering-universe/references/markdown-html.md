# Domain: markdown-html
Source Skills in this domain: 4

---

## design-system

Source path: `references/markdown-html/design-system/SKILL.md`

# Document Design System

The visual layer for HTML documents and slide decks: a token file in, a single
self-contained CSS bundle out, with every color pairing checked against WCAG
before it ships. This is the theming layer for **documents** — type scales,
reading measure, print roles, light/dark surfaces. It is not a product UI
component library; there are no buttons, form states, or component variants here.

## When to use this skill

- **Theming a report or whitepaper** that must render as one self-contained HTML file
- **Building a deck theme** where type must stay legible at projection distance
- **Auditing an existing palette** before a public or regulated publication
- **Diagnosing dark-mode drift** — text that reads fine in light mode and fails in dark
- **Standardizing across documents** so a series of reports looks like one series
- **Answering "does this pass AA?"** with a number instead of an opinion

## Inputs the skill expects

- A design-token JSON file (or the intent to generate one from `assets/sample_tokens.json`)
- Brand colors, if any exist — a hex value and where it came from
- Typeface choices plus their fallback stacks (self-contained HTML cannot fetch web fonts)
- The conformance target: AA (default) or AAA
- Which artifacts consume the theme: document, deck, or both
- Whether the output will be printed or exported to PDF

## Clarify First

Before generating a theme, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Conformance target (AA vs AAA)** — why it changes the output: AAA at 7:1 rules out most saturated mid-tones, so the accent and warning colors must be picked differently from the start
- [ ] **Print / PDF export required** — why it changes the output: print needs a forced light role set and page-break rules; retrofitting them means re-deriving every dark value
- [ ] **Document or deck** — why it changes the output: the type ratio differs (1.25 vs 1.333) and decks need larger minimum sizes for projection
- [ ] **Existing brand colors** — why it changes the output: a fixed brand hex constrains the accent ramp and may force the underline-links decision

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Generate a themed CSS bundle from tokens

1. Copy `assets/sample_tokens.json` and edit the palette, roles, and scales.
2. Lint the token file first — a malformed ramp produces a valid-looking bundle
   with inverted colors.
3. Compile the bundle and inline the result into the target HTML document.

```bash
python3 markdown-html/design-system/scripts/token_linter.py \
  --input markdown-html/design-system/assets/sample_tokens.json --format text

python3 markdown-html/design-system/scripts/theme_builder.py \
  --input markdown-html/design-system/assets/sample_tokens.json \
  --out build/theme.css --format text
```

### Workflow 2 — Gate a palette on WCAG contrast

1. Declare every real foreground/background combination in the `pairings` block,
   each with its usage class.
2. Run the AA gate; it exits non-zero on any failure, so it drops into CI directly.
3. Run `--all-pairs` to find combinations nobody declared but a stylesheet will
   eventually produce, and `--level AAA --no-gate` as an aspirational report.

```bash
python3 markdown-html/design-system/scripts/contrast_validator.py \
  --input markdown-html/design-system/assets/sample_tokens.json \
  --level AA --format text

python3 markdown-html/design-system/scripts/contrast_validator.py \
  --input markdown-html/design-system/assets/sample_tokens.json \
  --level AAA --no-gate --format json
```

### Workflow 3 — Audit and repair an inherited theme

1. Run the linter to surface structural rot: non-monotonic ramps, roles present
   in one mode only, literal hex values that will not respond to theming.
2. Run the validator with `--all-pairs` to get the full contrast matrix.
3. Fix in this order — ramp order first, then mode parity, then contrast. Ramp
   and parity errors invalidate the contrast numbers, so fixing contrast first
   wastes the work.

`assets/sample_tokens_legacy.json` is a deliberately damaged theme carrying all
four failure classes, so this workflow demonstrates real repair rather than a
clean run. Expect findings from both commands: the linter reports 4 errors and
5 warnings and **exits 2**; the validator is pinned to report-only with
`--no-gate` and finds 13 failing pairings.

```bash
python3 markdown-html/design-system/scripts/token_linter.py \
  --input markdown-html/design-system/assets/sample_tokens_legacy.json \
  --max-severity warning --format json

python3 markdown-html/design-system/scripts/contrast_validator.py \
  --input markdown-html/design-system/assets/sample_tokens_legacy.json \
  --all-pairs --no-gate --format text
```

## Decision frameworks

### Type ratio selection

| Ratio | Name | Use for | Top step of an 8-step scale |
|-------|------|---------|------------------------------|
| 1.125 | Major second | Dense reference docs | 1.8x base |
| 1.200 | Minor third | Technical documentation | 2.5x base |
| **1.250** | **Major third** | **Reports, whitepapers [PROVEN]** | **3.1x base** |
| 1.333 | Perfect fourth | Slide decks [PROVEN] | 4.2x base |
| 1.500 | Perfect fifth | Title treatments only | 8.5x base — unusable in a document |

**Use 1.25 for documents and 1.333 for decks.** A document needs 7-8 usable steps
from caption to H1; at 1.5 the top of that range is 8.5x the base, which no
report can place on a page. Escape hatch: a single-page poster or title card can
use 1.5 because it has one heading and no hierarchy to preserve.

### Contrast usage classes

| Class | Threshold (AA) | Applies to | WCAG criterion |
|-------|----------------|------------|----------------|
| `body` | 4.5:1 | Body copy, captions, footnotes, inline links | 1.4.3 |
| `large` | 3:1 | Text >= 18.66px bold or >= 24px regular | 1.4.3 |
| `ui` | 3:1 | Component boundaries, meaningful graphics | 1.4.11 |
| `decor` | 1.5:1 | Table rules, dividers — losslessly removable | none (practical floor) |

Classify honestly. A border that is the only thing separating two data regions is
`ui`, not `decor`. The 1.5:1 `decor` floor is not a WCAG number — it is the point
below which a rule stops being visible on a mid-quality screen, so it fails at its
decorative job too.

### Contrast targets beyond the minimum

| Element | Gate | Target | Why the target exceeds the gate |
|---------|------|--------|----------------------------------|
| Body text | 4.5:1 | **10-16:1** | Below ~8:1 tires sustained reading; above ~17:1 causes halation on OLED |
| Captions | 4.5:1 | 5.5-8:1 | Must stay subordinate to body yet readable |
| Code text | 4.5:1 | 9-14:1 | Measured against its own tinted surface |
| Focus ring | 3:1 | 3-6:1 | Against both the element and the adjacent background |

**[RECOMMENDED] Do not use pure black on pure white.** 21:1 is the maximum and it
is worse than ~16:1 for extended reading — glyph edges bleed on bright displays,
and readers with astigmatism report the most discomfort at that pairing.

### Dark-mode role derivation

| Light role points at | Dark role points at | Reason |
|----------------------|---------------------|--------|
| neutral 900 (text) | neutral 100 | Read the same ramp from the other end |
| neutral 0 (surface) | neutral 1000 | Not pure black — 1000 leaves room for raised surfaces |
| accent 600 | accent **300** | [PROVEN] Move accents 2-3 steps, not 1 |

Moving an accent only one step is the most common dark-mode bug in this domain:
`accent.600` scores 5.9:1 on white and 3.4:1 on near-black, so it passes the light
gate and fails the dark one.

## Anti-Patterns

### The mode-in-the-name role
**Mistake:** Defining `light-text` and `dark-text` as two separate roles instead of one `text` role with two mode values.
**Why it happens:** It mirrors how the designer thinks — two comps, two palettes — and each role reads unambiguously in isolation.
**Instead:** Keep one semantic role and let `roles.light` and `roles.dark` supply the values. The mode belongs in the mode map, not the name. The linter's parity check enforces this by failing any role defined in only one mode.

### The literal hex escape hatch
**Mistake:** Hard-coding one color directly in a component rule because no existing role quite fits.
**Why it happens:** Adding a role feels like ceremony for a one-off, and the deadline is real.
**Instead:** Add the role or reuse the nearest one. That hard-coded value will not respond to theming and surfaces months later as the single element that stays dark in light mode. The linter flags it as `ROLE_LITERAL` specifically because it is always cheaper to fix on the day it is written.

### Untested dark mode
**Mistake:** Authoring the light theme carefully, mechanically inverting for dark, and never rendering the result.
**Why it happens:** Dark mode looks like a mechanical transform, and the CSS compiles either way.
**Instead:** Run the contrast validator across both modes — it checks every mode in the roles map for exactly this reason — and then actually open the document in dark mode. The failures cluster in the mode nobody looked at, especially in saturated accent and warning colors.

### Trusting a green contrast run
**Mistake:** Treating a passing validator as proof the theme is accessible.
**Why it happens:** The tool gives a number and the number is above the threshold, which feels conclusive.
**Instead:** Read the list of what pairing math cannot see: text over images, semi-transparent overlays, hover and focus states nobody declared, two chart series that both pass against the background but not against each other, and red/green pairs at equal luminance that pass every ratio test and vanish for a deuteranopic reader. Contrast ratio is a luminance metric and is hue-blind by construction.

### The 40-role sprawl
**Mistake:** Adding a role per component — `table-header-bg`, `figure-caption-color`, `toc-link-hover`.
**Why it happens:** Each addition is locally reasonable; no single one looks like a mistake.
**Instead:** Treat roles as a vocabulary, not a mapping table. Eleven roles cover a document; twenty is a smell; forty means the semantic and component layers have merged and the theme can no longer be re-skinned.

## Files

| File | Purpose |
|------|---------|
| `scripts/theme_builder.py` | Compile a token JSON file into one inlinable CSS bundle with light/dark blocks |
| `scripts/contrast_validator.py` | Score every declared pairing against WCAG AA/AAA in both modes; CI gate |
| `scripts/token_linter.py` | Structural audit — scale sanity, ramp monotonicity, mode parity, orphan stops |
| `references/token-architecture.md` | Three-layer token model, role vocabulary, type and spacing scales, dark-mode delivery |
| `references/wcag-contrast-reference.md` | Luminance math, thresholds, exemptions, remediation recipes, blind spots |
| `assets/sample_tokens.json` | Working token file — passes the linter and the AA gate as shipped |
| `assets/sample_tokens_legacy.json` | Deliberately damaged theme for Workflow 3: non-monotonic ramp, mode-parity gap, literal hex, un-re-anchored dark accent |
| `assets/theme_brief_template.md` | Pre-work brief: decisions to settle before writing hex values |

All scripts share one exit-code contract: **0** clean, **2** gate failed (findings at or above the threshold), **1** the tool itself errored. A CI job can therefore tell a real defect from a broken invocation.

---

## md-document

Source path: `references/markdown-html/md-document/SKILL.md`

# Markdown Document Publishing

Turn an authored markdown file into a single HTML document you can email, host,
or print — semantic structure, an automatic table of contents, figures and
tables numbered and referenceable by number, footnotes, and a print stylesheet
that survives contact with a PDF exporter. One file out, no runtime dependencies,
no external assets.

## When to use this skill

- **Publishing a report or whitepaper** that must arrive as one file, not a folder
- **Producing a PDF** from markdown without a LaTeX or Pandoc toolchain
- **Numbering figures and tables** so prose can reference them instead of saying "below"
- **Converting untrusted or contributed markdown** where injection safety matters
- **Standardizing a document series** so every issue looks like the same publication
- **Catching broken cross-references** before a document reaches readers

## Inputs the skill expects

- A markdown source file, optionally with YAML frontmatter
- Figure images as relative paths (or data URIs, for true single-file output)
- The intended output: screen, print, or both
- Document length and whether a table of contents is warranted
- Page geometry, if printing: size, margins, single- or double-sided
- A stylesheet, if not using the bundled theme

## Clarify First

Before converting, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Screen, print, or both** — why it changes the output: print needs a page profile, forced light colors, and break control; skipping it produces a document that looks right on screen and breaks on paper
- [ ] **Whether images must be embedded** — why it changes the output: relative image paths mean the HTML file is not actually self-contained, which defeats the point if it will be emailed
- [ ] **Document length and TOC expectation** — why it changes the output: a TOC on a two-page memo is noise; depth 3 on a long report produces a TOC longer than some sections
- [ ] **Whether the markdown is trusted** — why it changes the output: it does not change escaping (always on), but it determines whether a review gate should run first

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Convert a document to self-contained HTML

1. Audit labels and references first — the converter's gate reports broken
   references, but the auditor explains what to do about each one.
2. Convert. The bundled theme is inlined automatically; pass `--css` to override.
3. Check the gate. A non-zero exit means the rendered document contains visible
   `[?fig:name]` markers where numbers should be.

```bash
python3 markdown-html/md-document/scripts/crossref_auditor.py \
  --input markdown-html/md-document/assets/sample_document.md --format text

python3 markdown-html/md-document/scripts/md_to_html.py \
  --input markdown-html/md-document/assets/sample_document.md \
  --out build/report.html --toc-depth 2 --format text
```

### Workflow 2 — Produce a print-ready PDF

1. Generate the print block from a page profile and append it to the theme, so
   the exported file carries its own print rules.
2. Convert with the extended stylesheet.
3. Open in a browser, print to PDF with margins set to **Default** — a browser
   margin setting overrides `@page` and will clip content.

```bash
python3 markdown-html/md-document/scripts/print_profile.py \
  --input markdown-html/md-document/assets/sample_print_profile.json \
  --out build/print.css --format text

cat markdown-html/md-document/assets/document_theme.css build/print.css > build/full.css

python3 markdown-html/md-document/scripts/md_to_html.py \
  --input markdown-html/md-document/assets/sample_document.md \
  --css build/full.css --out build/report.html
```

### Workflow 3 — Gate a document series in CI

1. Run the auditor at `warning` severity so unlabelled figures block, not just
   broken references.
2. Run the conversion gate; it fails on unresolved references and undefined
   footnotes — both render as visible defects.
3. Emit JSON for both so a CI job can annotate the diff.

```bash
python3 markdown-html/md-document/scripts/crossref_auditor.py \
  --input markdown-html/md-document/assets/sample_document.md --max-severity warning --format json

python3 markdown-html/md-document/scripts/md_to_html.py \
  --input markdown-html/md-document/assets/sample_document.md --out build/report.html --format json
```

## Decision frameworks

### Table-of-contents depth

| Document length | TOC | `--toc-depth` |
|-----------------|-----|---------------|
| Under 3 pages | none — omit `[TOC]` | n/a |
| 3-10 pages | yes | 1 (`##` only) |
| 10-30 pages | yes | 2 (default) [PROVEN] |
| Over 30 pages | yes | 2, plus per-section navigation |

If the TOC exceeds one screen, reduce the depth. A contents list longer than the
first section is a navigation failure, not thoroughness.

### Reference style

| Situation | Write | Not |
|-----------|-------|-----|
| Pointing at a figure | `[@fig:access]` | "the chart below" |
| Pointing at a table | `[@tbl:policies]` | "see the table above" |
| Pointing at a section | `[@sec:context]` | "as discussed earlier" |
| A caveat that breaks the sentence | a footnote | a parenthetical |
| Evidence the argument depends on | body text | a footnote |

**[PROVEN] Never use positional language in a document that may be paginated.**
"Below" breaks when the table lands on the next page, breaks silently when a
section is reordered, and means nothing to a reader navigating by heading.

### Alt text versus caption

| | Alt text | Caption |
|---|---------|---------|
| Audience | Non-sighted readers | Everyone |
| Length | 15-125 characters | One or two sentences |
| Says | What the image depicts | What to conclude, plus the number |
| Fails as | "chart", "figure 3", "" | "See above" |

The auditor flags placeholder alt text (`chart`, `image`, `screenshot`, empty) at
**error** severity and alt text under 15 or over 125 characters at **warning**.

### Print geometry

| Decision | Default | Change when |
|----------|---------|-------------|
| Page size | A4 [RECOMMENDED] | Audience is exclusively North American → Letter |
| Side margins | 25-30mm | Never below 20mm — the measure exceeds 90 characters |
| Body size | 11pt | 12pt for older audiences or dense reference material |
| Mirrored margins | off | The document will be bound double-sided |
| `break-inside: avoid` | figures, tables, code | Never on an element taller than one page |

At A4 with 20mm margins the text column is ~92 characters — well outside the
55-85 comfort band. Widening the margins is the fix; `max-width: none` on `main`
is what causes the problem.

## Anti-Patterns

### The "see the table below" reference
**Mistake:** Writing positional prose — "the chart below", "as shown above" — instead of a numbered cross-reference.
**Why it happens:** It reads naturally while drafting, when the author can see the whole document at once and the table genuinely is below.
**Instead:** Write `[@tbl:policies]`. Pagination moves content, reordering breaks positional claims silently, and a reader navigating by heading has no "below". The auditor cannot detect a broken "below"; it fails the build on a broken `[@tbl:policies]`.

### Allowing raw HTML through the converter
**Mistake:** Adding an escape hatch so authors can drop `<div class="...">` or an embed into the markdown.
**Why it happens:** A real formatting need appears that the subset does not cover, and passing HTML through is a one-line change.
**Instead:** Extend the subset or the stylesheet. The escape-then-render ordering is the entire security model — the moment raw HTML passes through, every document becomes an injection vector, and the converter can no longer be pointed at contributed content. There is deliberately no `--allow-html` flag.

### Reusing the caption as alt text
**Mistake:** Writing one string and letting it serve as both the figure caption and the alt attribute.
**Why it happens:** The converter falls back to exactly this when no caption is given, which makes it look sanctioned.
**Instead:** Write both. The caption tells a sighted reader what to conclude; the alt text describes what the figure shows to someone who cannot see it. "Figure 3. Costs fall 40% under Policy B" is a fine caption and useless alt text — it states the conclusion without describing the chart.

### Print rules added after the fact
**Mistake:** Building the document for screen, then bolting on a print stylesheet when someone asks for a PDF.
**Why it happens:** Print feels like a rendering detail rather than a design constraint, and the screen version already looks finished.
**Instead:** Decide print-or-not before converting. Retrofitted print CSS produces the classic failures — stranded headings, tables split mid-row, dark theme reaching paper as invisible gray text, a 92-character measure. `print_profile.py` exists so the geometry is a reviewed input, not an afterthought.

### Trusting the gate as a proof of quality
**Mistake:** Treating a passing conversion as evidence the document is ready to publish.
**Why it happens:** The gate is automated and green, which reads as authoritative.
**Instead:** The gate checks that references resolve and footnotes are defined. It cannot see a stranded heading, a figure separated from its caption, a table split across pages, or a PDF whose margins clipped the content. Proof every page of the actual output at 100% zoom before publishing.

## Files

| File | Purpose |
|------|---------|
| `scripts/md_to_html.py` | CLI: convert markdown to a self-contained HTML document; gates on broken references |
| `scripts/md_render.py` | Markdown subset parser, escaping-first inline renderer, label numbering — imported by `md_to_html.py`, not a CLI |
| `scripts/crossref_auditor.py` | Audit labels, references, alt text, and heading hierarchy; CI gate |
| `scripts/print_profile.py` | Generate a print/PDF stylesheet from a JSON page profile |
| `references/markdown-conventions.md` | Supported syntax, labelling contract, escaping and URL-allowlist model |
| `references/print-and-pdf-production.md` | Paged media, break control, export mechanics, proofing checklist |
| `assets/sample_document.md` | Working document exercising every construct; converts clean |
| `assets/sample_print_profile.json` | A4 double-sided print profile with running heads |
| `assets/document_theme.css` | Bundled theme inlined by default — this skill's own copy |
| `assets/document_outline_template.md` | Starting structure for a new report or memo |

All scripts share one exit-code contract: **0** clean, **2** gate failed (findings at or above the threshold), **1** the tool itself errored. A CI job can therefore tell a real defect from a broken invocation.

**Three CLI tools, one module.** `md_render.py` is a library, not a fourth
command — it holds the parser that `md_to_html.py` imports. A single-file
converter came to 429 lines, well over the 300-line ceiling. Splitting CLI from
parser is the remedy the tool-design standard prescribes for an oversized script,
and same-directory imports keep the package self-contained: `md-slides` carries
its own separate `slide_render.py` rather than importing this one.

---

## md-review

Source path: `references/markdown-html/md-review/SKILL.md`

# Markdown Review Gate

The quality gate that runs *before* Markdown becomes HTML. A converter will happily render a
document with three H1s, four dead links, an image with no alt text, and a 67-word sentence — the
HTML validates and the page is still bad. This skill catches those defects while they are still
cheap to fix, and fails the build when they are blocking.

**Zero network calls, by design.** Relative links and anchors resolve on disk; external URLs are
inventoried and reported but never fetched. A gate that fails because someone else's server was
slow is a gate engineers learn to ignore.

## When to use this skill

- **Before publishing** a doc, guide, or article that will be converted to HTML
- **Wiring a docs CI gate** that must block a merge on real defects without blocking on style
- **Auditing an inherited Markdown corpus** to size the accessibility and link-rot backlog
- **Enforcing house terminology** across a docs set (`front-end` vs `frontend`, `GitHub` vs `Github`)
- **Checking accessibility of source content** against the WCAG criteria that survive conversion
- **Calibrating prose to an audience** — a runbook read at 3am needs a different band than an API reference

## Inputs the skill expects

- One or more Markdown files (with or without YAML frontmatter)
- A review config JSON: required frontmatter fields, structure and accessibility thresholds, term map, gate settings
- The target audience for the prose (drives the readability band — the single most consequential input)
- The project root, when the corpus uses root-relative (`/docs/...`) links
- The blocking policy: which severity fails the build, and the warning budget

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Target audience for the prose** — why it changes the output: selects the Flesch band and grade ceiling; a general-public band (60-80) and a specialist band (40-60) flag opposite sets of sentences
- [ ] **Required frontmatter fields** — why it changes the output: every missing field is an error, so guessing the schema produces either false blockers or a silent gap
- [ ] **Blocking severity and warning budget** — why it changes the output: decides whether the run reports or blocks, which determines whether this is an audit or a gate
- [ ] **Whether the corpus is new or inherited** — why it changes the output: an inherited corpus needs report-only phase 1, not a gate that fails on day one

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Gate a document before publication

The default path. Run all three tools; any non-zero exit blocks.

1. Pick or write a config profile (start from `assets/sample_review_config.json`).
2. Run the structure/frontmatter/accessibility gate.
3. Run the offline link checker.
4. Run the readability and terminology scorer.
5. Fix errors; triage warnings against the budget.

```bash
cd "$(git rev-parse --show-toplevel)"
CFG=markdown-html/md-review/assets/sample_review_config.json
DOC=markdown-html/md-review/assets/sample_article.md

python3 markdown-html/md-review/scripts/md_review_gate.py --input "$DOC" --config "$CFG" --format text
python3 markdown-html/md-review/scripts/link_checker.py --input "$DOC" --root "$PWD" --format text
python3 markdown-html/md-review/scripts/readability_scorer.py --input "$DOC" --config "$CFG" --format text
```

The shipped `sample_article.md` deliberately contains real defects, so this run exits non-zero.
Swap in `sample_article_clean.md` to see all three pass.

### Workflow 2 — Audit a corpus without blocking anything

Phase 1 of any rollout. Collect the real finding distribution before deciding what to enforce.

1. Run every file with `--fail-on never` so nothing exits non-zero.
2. Emit JSON and append to a single JSONL stream.
3. Rank rules by frequency; tune thresholds and the term map before switching the gate on.

```bash
cd "$(git rev-parse --show-toplevel)"
CFG=markdown-html/md-review/assets/sample_review_config.json

find markdown-html/md-review/assets -name '*.md' -print0 |
  xargs -0 -I{} python3 markdown-html/md-review/scripts/md_review_gate.py \
    --input {} --config "$CFG" --format json --fail-on never > /tmp/md_audit.jsonl

python3 -c "import json;[print(f['rule']) for l in open('/tmp/md_audit.jsonl') if l.strip().startswith('{')]" 2>/dev/null || \
  echo "inspect /tmp/md_audit.jsonl for the per-file finding arrays"
```

### Workflow 3 — Calibrate prose to an audience

When the complaint is "nobody reads our docs" rather than "our docs are broken".

1. Score the document and read the sentence-level findings, not just the aggregate.
2. Rewrite the very-long sentences first — they dominate the score and the reader's experience.
3. Re-score and confirm the long-sentence percentage is under 10%.

```bash
cd "$(git rev-parse --show-toplevel)"
CFG=markdown-html/md-review/assets/sample_review_config.json

# Full report, including passive-voice and terminology findings
python3 markdown-html/md-review/scripts/readability_scorer.py \
  --input markdown-html/md-review/assets/sample_article.md --config "$CFG" --format text

# Readability band only — ignore terminology while rewriting sentences
python3 markdown-html/md-review/scripts/readability_scorer.py \
  --input markdown-html/md-review/assets/sample_article.md --config "$CFG" \
  --fail-on readability --no-passive --format json
```

## Decision frameworks

### Severity assignment — what earns an error [PROVEN]

A finding blocks publication only if it passes all three tests. Everything else is a warning.

| Test | Question | Fails if |
| --- | --- | --- |
| Reader-visible | Is someone reading the published page worse off? | It only inconveniences maintainers |
| Unambiguous | Is there any legitimate reason to author it this way? | Reasonable authors disagree |
| Mechanically fixable | Can the author fix it without a product decision? | It needs a rewrite or a decision |

Broken link, missing alt text, skipped heading level, headerless table, missing required
frontmatter field → **error**. Long sections, terminology drift, heading capitalization,
readability band → **warning**. Passive voice → **info**.

**Never downgrade `a11y.missing-alt`.** Every other rule has a defensible exception; this one does
not. If an image is decorative, mark it decorative — do not suppress the rule.

### Readability target bands by audience [PROVEN]

The single table that makes readability scoring useful. A score without a target audience is noise.

| Audience | Flesch Reading Ease | Max FK grade | Max long-sentence % |
| --- | --- | --- | --- |
| Emergency / safety-critical runbook | 70-90 | 6.0 | 5% |
| General public / consumer | 60-80 | 8.0 | 8% |
| General technical (default) | 50-70 | 12.0 | 10% |
| Specialist practitioner | 40-60 | 14.0 | 12% |
| Academic / regulatory | 30-50 | 16.0 | 15% |

**Only the floor blocks.** Prose easier than its band is prose more people can read; the scorer
records it as info. Gating both bounds teaches authors to pad sentences, which inverts the point.

The safety-critical row is the one teams get wrong. Comprehension collapses under stress — an
incident runbook written at grade 12 is unreadable at 3am during an outage.

### Sentence-length thresholds [PROVEN]

| Words | Level | Action |
| --- | --- | --- |
| ≤ 20 | fine | None |
| 21-30 | acceptable | None |
| 31-45 | warning | Usually two sentences wearing a trench coat |
| 46+ | error | Split it; the reader is re-reading |

Target mean ≤ 20 words with ≤ 10% of sentences over 30. **The percentage matters more than the
mean** — an 18-word average with 20% monsters reads worse than a 22-word average with none.

### WCAG coverage — what source-level checks can and cannot prove [RECOMMENDED]

| Success criterion | Level | Checked here | Mechanism |
| --- | --- | --- | --- |
| 1.1.1 Non-text Content | A | Yes | Alt text present, non-placeholder, 10-150 chars |
| 1.3.1 Info and Relationships | A | Yes | Heading hierarchy + table header rows |
| 2.4.4 Link Purpose (In Context) | A | Yes | Link text not in the non-descriptive list |
| 2.4.9 Link Purpose (Link Only) | AAA | Yes | Same check, stricter target — aim here |
| 2.4.6 Headings and Labels | AA | Partial | Single-H1 and minimum-section rules |
| 3.1.1 Language of Page | A | Optional | Add `lang` to `required_fields` |
| 1.4.3 Contrast | AA | No | Needs computed colors |
| 2.1.1 Keyboard | A | No | Needs an interactive DOM |
| 4.1.2 Name, Role, Value | A | No | Needs the accessibility tree |

Run the bottom three against converted HTML. Claiming source-level checks prove WCAG conformance
is how teams end up with a compliance badge on an inaccessible site.

### Rollout sequence for an existing corpus [PROVEN]

Switching a gate on across a legacy corpus in one step fails every time.

| Phase | Duration | `fail_on` | Goal |
| --- | --- | --- | --- |
| 1. Observe | 2 weeks | `never` | Learn the real finding distribution; tune the term map |
| 2. Changed files only | 4 weeks | `error` on the diff | Stop the bleeding without a backlog cleanup |
| 3. Ratchet | 1-2 quarters | `error`, descending `max_warnings` | Burn down legacy debt |
| 4. Steady state | ongoing | `error`, fixed budget | Maintain |

Phase 2 carries the value. Gating only the files a change touches makes the gate immediately
useful and never blocking on unrelated debt.

### Exit code contract [PROVEN]

| Code | Meaning | Who fixes it |
| --- | --- | --- |
| 0 | Passed | Nobody |
| 1 | Tool error — bad path, malformed config | Repository maintainer |
| 2 | Gate failed — blocking findings | Document author |

Keep 1 and 2 distinct. Collapsing them sends every failure to the wrong person first.

## Anti-Patterns

### The Network Link Checker In The Merge Gate
**Mistake:** Wiring an HTTP link checker into the blocking pre-merge gate so every external URL gets fetched on every run.
**Why it happens:** Dead external links are a real problem, and checking them feels like the same job as checking internal ones. The tooling usually offers both behind one flag.
**Instead:** Resolve internal targets on disk in the blocking gate — it is deterministic and finishes in milliseconds. Inventory external URLs and verify them in a separate scheduled, non-blocking job. A gate that intermittently fails on someone else's 503 gets re-run reflexively within two weeks, and then nobody reads the real failures either.

### Gating On The Readability Ceiling
**Mistake:** Failing the build when a document scores *above* its target Flesch band, on the theory that the band is a specification to hit.
**Why it happens:** The band is written as a range, so both ends look like thresholds. Treating it symmetrically feels rigorous.
**Instead:** Block only on the floor. Prose easier than its audience requires is a win, not a defect — record it as info. Teams that gate both ends get authors padding sentences with subordinate clauses to climb back into range, producing exactly the writing the metric exists to prevent.

### The Term Map That Only Grows
**Mistake:** Adding every style disagreement to the terminology map and never removing anything, until the map has 400 entries and every document produces twenty warnings.
**Why it happens:** Adding an entry is a one-line fix that closes a style argument permanently. Removing one requires re-litigating it.
**Instead:** Cap the map at the terms that actually matter — product names with canonical capitalization, contested hyphenation, deprecated names, inclusive-language replacements — and review it quarterly. Every entry should have a reason someone can state out loud. Keep terminology at warning severity; blocking a release on `Github` teaches authors the gate is petty, and a gate perceived as petty gets bypassed.

### Zero Warnings On Day One
**Mistake:** Adopting the gate with `max_warnings: 0` against an inherited corpus, producing a 400-finding first run.
**Why it happens:** Zero is the obviously correct end state, and starting anywhere else feels like tolerating defects.
**Instead:** Set the budget at the current warning count, then ratchet down 10-20% per quarter. A first run that produces one enormous cleanup PR gets rubber-stamped, not reviewed, and the debt returns within a release. Phase the rollout: observe, then gate changed files, then ratchet.

### Inline Suppression Comments
**Mistake:** Adding `<!-- md-review-disable a11y.missing-alt -->` markers in documents to silence findings the author disagrees with.
**Why it happens:** It unblocks the immediate merge and feels surgical compared to changing the shared config.
**Instead:** Fix the config, downgrade the severity, or disable the rule globally with a recorded reason. Inline suppressions spread by copy-paste, are never reviewed, and become permanent exemptions nobody can justify. If a rule needs suppression often enough to want an inline escape hatch, the rule itself is wrong — change it once, in the open.

## Files

| File | Purpose |
| --- | --- |
| `scripts/md_review_gate.py` | Heading structure, frontmatter schema, and accessibility checks with a configurable severity gate; exits 2 on blocking findings |
| `scripts/link_checker.py` | Resolves relative file targets and anchor fragments on disk, reports duplicate heading anchors, inventories external URLs without fetching them |
| `scripts/readability_scorer.py` | Flesch Reading Ease, Flesch-Kincaid grade, syllable counting, long-sentence and passive-voice heuristics, and term-map consistency |
| `references/review-rulebook-and-severity-model.md` | Full rule catalog with default severities, config schema, slug algorithm, gate design, and CI integration patterns |
| `references/readability-accessibility-and-terminology.md` | Readability formulas, audience target bands, syllable heuristic and its failure cases, WCAG success criteria per check, term-map governance |
| `assets/sample_review_config.json` | Working config profile: required frontmatter fields, thresholds, term map, severity overrides, gate settings |
| `assets/sample_article.md` | Sample input containing deliberate defects; drives the non-zero-exit demonstration for all three scripts |
| `assets/sample_article_clean.md` | Clean sample input that passes all three scripts with exit code 0 |
| `assets/review_report_template.md` | Reviewer-facing report template with verdict, findings, link, readability, accessibility, and sign-off sections |

---

## md-slides

Source path: `references/markdown-html/md-slides/SKILL.md`

# Markdown Slide Decks

Turn a markdown file into a slide deck that is one HTML file: six layouts,
speaker notes, keyboard and remote navigation, light/dark theming, and handout
printing. The density linter is the part that matters most — it catches the
slides an audience cannot absorb before you are standing in front of them.

## When to use this skill

- **Building a deck from markdown** you want to keep in version control
- **Presenting from a laptop** without a presentation app or a cloud account
- **Cutting an overloaded deck** where every slide is a wall of text
- **Timing a talk** against a fixed slot before rehearsing it
- **Converting a document into a deck** as a starting point, then editing down
- **Producing a handout** that includes speaker notes alongside each slide

## Inputs the skill expects

- A markdown deck source, slides separated by `---`
- The talk length and format — presented live, or circulated to be read
- Layout intent per slide: title, section divider, bullets, two-column, quote, image
- Speaker notes after a `???` marker on each content slide
- Images as relative paths, or as data URIs for a genuinely single-file deck
- The presentation environment: room lighting and display size

## Clarify First

Before building, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Presented live or circulated to read** — why it changes the output: it selects the density profile, and the two budgets differ by roughly 2x; the wrong one produces a deck that fails at the job it actually has
- [ ] **Talk length and slot** — why it changes the output: it sets the slide count and drives the runsheet; a 60-slide deck for a 15-minute slot is an unfinished edit, not a pacing choice
- [ ] **Whether images must be embedded** — why it changes the output: relative paths mean the deck is a folder, not a file, and it breaks when emailed
- [ ] **Room lighting, if presenting** — why it changes the output: dark themes wash out under ambient light; this decides the default theme and the contrast floor

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Build a deck and check its density

1. Lint first. Building an overloaded deck and reading it on screen is a slower
   way to learn the same thing.
2. Fix what the linter flags — usually by moving sentences into speaker notes.
3. Build. The theme and navigation script are inlined automatically.

```bash
python3 markdown-html/md-slides/scripts/slide_density_linter.py \
  --input markdown-html/md-slides/assets/sample_deck.md --profile present

python3 markdown-html/md-slides/scripts/md_to_slides.py \
  --input markdown-html/md-slides/assets/sample_deck.md \
  --out build/deck.html --format text
```

### Workflow 2 — Time a talk against its slot

1. Generate the runsheet at your actual speaking rate, not the default.
2. Read the `*` markers — those slides have no notes, so their duration is
   guessed from on-slide content and is the least reliable number in the sheet.
3. If the total is over, cut slides. Speaking faster does not create time.

```bash
python3 markdown-html/md-slides/scripts/notes_runsheet.py \
  --input markdown-html/md-slides/assets/sample_deck.md \
  --wpm 130 --target-minutes 15 --format text

python3 markdown-html/md-slides/scripts/notes_runsheet.py \
  --input markdown-html/md-slides/assets/sample_deck.md \
  --format markdown > build/runsheet.md
```

### Workflow 3 — Convert a document into a deck

1. Split on every `## ` heading to get a first pass with the document's own
   structure.
2. Lint immediately. The result will fail — a document section carries far more
   than a slide's budget. That failure list is the edit plan.
3. Rewrite headings as claims, demote sentences to notes, then rebuild.

```bash
python3 markdown-html/md-slides/scripts/md_to_slides.py \
  --input markdown-html/md-slides/assets/sample_deck.md --split-on h2 --out build/draft.html

python3 markdown-html/md-slides/scripts/slide_density_linter.py \
  --input markdown-html/md-slides/assets/sample_deck.md --profile present --format json
```

## Decision frameworks

### Density budget

| Metric | `present` target | Warn | Error | `read` warn / error |
|--------|------------------|------|-------|---------------------|
| Words per slide | <= 40 | 50 | 75 | 90 / 130 |
| Bullets per slide | <= 5 | 6 | 8 | 8 / 12 |
| Words per bullet | <= 8 | 12 | 20 | 18 / 28 |
| Heading characters | <= 50 | 60 | 90 | 70 / 100 |
| Table rows | <= 5 | 6 | 9 | 9 / 14 |
| Code lines | <= 10 | 12 | 20 | 18 / 30 |

Every threshold is a proxy for one rule: **a slide must be readable in under 5
seconds, or it competes with the presenter.** An audience cannot read and listen
simultaneously — when a slide carries prose, the room reads it faster than you
can say it and then disengages.

`title`, `section`, `quote`, and `image` layouts are exempt from the body rules.

### Layout selection

| Layout | Use for | Limit |
|--------|---------|-------|
| `title` | Opening slide | One per deck; heading plus one subtitle line |
| `section` | Divider between movements | One every 5-8 content slides |
| `default` | Heading plus content | The workhorse; full density budget applies |
| `two-column` | A comparison, or image beside explanation | [RECOMMENDED] Not a way to fit twice the content |
| `quote` | One sentence worth sitting with | One per deck; a second dilutes the first |
| `image` | Full-bleed visual | Alt text mandatory — the linter errors without it |

### Deck length by slot

| Talk length | Content slides | Note |
|-------------|----------------|------|
| 5 min | 5-7 | ~45s per slide |
| 15 min | 12-18 | The common conference slot |
| 30 min | 20-30 | Plus 2-3 section dividers |
| 60 min | 30-45 | Needs interaction, not more slides |

The runsheet adds a **4-second transition allowance per slide** — real, and
routinely forgotten. Thirty slides carry two minutes of dead air before anyone
speaks.

### Where content goes when a slide is too dense

| Content | Belongs |
|---------|---------|
| The claim | Slide heading |
| The evidence, compressed | Slide body, at label length |
| The sentences | Speaker notes [PROVEN] |
| The full table | Appendix slide |
| The caveat | Speaker notes, then Q&A |

### Contrast at projection

| Context | Minimum |
|---------|---------|
| Monitor / screen share | 4.5:1 (WCAG AA) |
| Well-lit room | 7:1 |
| Bright room, weak projector | 10:1 |

**[PROVEN] Present light in a bright room, dark in a dark one.** The `T` key
toggles theme so this is decided in the room, not an hour before.

## Anti-Patterns

### The document in slide clothing
**Mistake:** Full paragraphs on every slide, because the deck must also work as a leave-behind for people who were not there.
**Why it happens:** It is one artifact instead of two, and the request to "make sure it stands alone" is reasonable on its face.
**Instead:** Pick one job. A presented deck uses the `present` budget with the sentences in speaker notes; a circulated deck uses `--profile read`. Trying to serve both produces something too dense to present and too fragmentary to read. If it will mostly be read, write a document and build a thin deck that points at it.

### Bullets as sentences
**Mistake:** Writing each bullet as a complete sentence, so the slide reads correctly on its own.
**Why it happens:** Fragments feel unfinished while drafting, and complete sentences feel more rigorous.
**Instead:** A bullet is a label the presenter expands, not a sentence the audience reads. Past roughly 12 words it is prose and the room stops listening. Move the sentence into the speaker notes, where it is genuinely useful — that is what notes are for, and it is why the linter flags a dense slide with empty notes.

### Topic headings
**Mistake:** Heading a slide with its subject — "Options", "Results", "Storage costs".
**Why it happens:** It matches how the deck was outlined, and outlines are built from topics.
**Instead:** Write the heading as the sentence you want remembered: "Cold data is paying hot prices", "Latency held; spend fell 31%". Someone who reads only the headings should still receive the argument. This single change improves a deck more than any layout decision.

### Speaking faster to fit the slot
**Mistake:** Discovering the deck runs long and planning to talk quickly rather than cutting slides.
**Why it happens:** Cutting means giving up content you already built and believe in.
**Instead:** Cut. Speaking faster converts an over-long talk into an over-long talk nobody follows, and it eliminates the pauses that let a point land. The runsheet says "cut content, do not speak faster" for this reason.

### Skipping the full-screen proof
**Mistake:** Authoring in a windowed browser and presenting full screen without checking.
**Why it happens:** The deck looks finished on the laptop, and full screen feels like the same thing but bigger.
**Instead:** Open it full screen on the actual display and walk every slide with the actual remote. Type scales with viewport width, so every size decision changes — tables and code blocks are set smaller than body text and are the first things to become unreadable from the back row. Presenter remotes send PageUp/PageDown, which is also worth confirming before you are on stage.

## Files

| File | Purpose |
|------|---------|
| `scripts/md_to_slides.py` | CLI: build a self-contained HTML deck with inlined theme and navigation |
| `scripts/slide_render.py` | Slide splitting, layouts, note extraction, escaping-first renderer — imported by `md_to_slides.py`, not a CLI |
| `scripts/slide_density_linter.py` | Flag slides over the word, bullet, table, and code budgets; CI gate |
| `scripts/notes_runsheet.py` | Timed runsheet from speaker notes; text, JSON, or markdown |
| `references/slide-density-and-layout.md` | Thresholds and their rationale, layout patterns, deck length |
| `references/deck-accessibility-and-delivery.md` | Focus management, keyboard interface, projection contrast, pre-flight |
| `assets/sample_deck.md` | Working deck using every layout; passes the density gate |
| `assets/deck_theme.css` | Bundled deck theme — this skill's own copy |
| `assets/deck_nav.js` | Inlined navigation: keyboard, hash routing, notes, theme toggle |
| `assets/deck_outline_template.md` | Starting structure for a new deck |

All scripts share one exit-code contract: **0** clean, **2** gate failed (findings at or above the threshold), **1** the tool itself errored. A CI job can therefore tell a real defect from a broken invocation.

**Three CLI tools, one module.** `slide_render.py` is a library, not a fourth
command — it holds the parser and renderer that `md_to_slides.py` imports. A
single-file converter came to 324 lines, over the 300-line ceiling, and the only
ways to fit were deleting docstrings or dropping features. Splitting CLI from
parser is the remedy the tool-design standard prescribes for an oversized
script, and same-directory imports keep the package self-contained: nothing here
imports from another skill, and `md-document` carries its own separate copy of
the equivalent renderer rather than sharing this one.
