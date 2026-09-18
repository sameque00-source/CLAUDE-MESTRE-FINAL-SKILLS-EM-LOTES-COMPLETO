# Domain: documents
Source Skills in this domain: 4

---

## docx-toolkit

Source path: `references/documents/docx-toolkit/SKILL.md`

# Docx Toolkit

Audit `.docx` files using the standard library only — no `python-docx` required. Reads OOXML directly with `zipfile` + `xml.etree`.

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

docx, Word, Microsoft Word, document, document review, comments, tracked changes, redline, headings, style guide, word count, document audit

---

## Clarify First

Before running the audit, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Audit purpose (pre-handoff cleanup, contract-review triage, or style-guide enforcement)** — selects the workflow and the thresholds you apply
- [ ] **Recipient (external customer, opposing counsel, internal)** — sets the tolerance for leftover comments and tracked changes
- [ ] **Allowed style set (for style-guide enforcement)** — defines what counts as a non-conforming style

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
python scripts/docx_auditor.py contract.docx
```

Outputs: word count, paragraph count, heading hierarchy, comment count, tracked-changes status, hyperlink count, list of unique paragraph styles used.

---

## Core Workflows

### Workflow 1: Pre-Handoff Document Audit

**Goal:** Catch the issues that embarrass a sender — leftover comments, unresolved track changes, broken heading hierarchy — before the document leaves.

**Steps:**
1. Run: `python scripts/docx_auditor.py document.docx`
2. Review the audit output:
   - Comment count > 0 → resolve or remove before sending
   - Tracked changes detected → accept or reject before sending
   - Heading-hierarchy gaps (H1 → H3 with no H2) → restructure
   - Style sprawl (more than 8 paragraph styles) → consolidate
3. Re-run until clean

**Time Estimate:** 5-15 minutes per document.

### Workflow 2: Contract Review Triage

**Goal:** Quantify how much rework a returned contract needs before reading it line-by-line.

**Steps:**
1. Run audit on the returned `.docx`
2. Comment count > 20 or tracked-change paragraphs > 30% → expect a heavy review pass; schedule time
3. Comment count < 5 → likely cosmetic; quick turnaround possible
4. Use `references/docx_review_checklist.md` for the actual content review

**Time Estimate:** 1 minute per document for triage.

### Workflow 3: Style-Guide Enforcement

**Goal:** Detect documents drifting from your style guide before they ship to a customer.

**Steps:**
1. Define allowed styles in your style guide (see `assets/style_compliance_template.md`)
2. Run audit on candidate documents
3. Flag any document using styles outside the allowed set
4. Map non-conforming paragraphs back to standard styles

**Time Estimate:** 2-5 minutes per document.

---

## Tools

### docx_auditor.py

Reads a `.docx` file as a ZIP archive and parses OOXML directly. No external dependencies.

```bash
# Human-readable
python scripts/docx_auditor.py document.docx

# JSON
python scripts/docx_auditor.py document.docx --json
```

**Reports:**
- Word and paragraph counts
- Heading hierarchy (with gap detection)
- Number of comments
- Whether tracked changes are present
- Unique paragraph styles used
- Hyperlink count
- Image count
- Table count

**Limits:** This tool reads existing docx files. For *generating* docx, use the templates in `assets/` and edit in Word, or install `python-docx` separately.

---

## Reference Guides

- **`references/docx_review_checklist.md`** — Pre-handoff checklist; common rework triggers; mistakes that survive automated audits

---

## Templates

- **`assets/style_compliance_template.md`** — Format for declaring allowed paragraph styles
- **`assets/handoff_checklist_template.md`** — Pre-send checklist with sign-off boxes

---

## Best Practices

- **Audit before every external send.** A 30-second audit catches 80% of avoidable embarrassment.
- **Resolve comments before "Final v3.docx".** Files named "final" with active comments are how lawyers get tickled.
- **Lock heading hierarchy.** H1 → H3 with no H2 breaks navigation, accessibility, and table-of-contents generation.
- **Prefer styles over inline formatting.** A style change in one place beats hundreds of inline overrides.

---

## Integration Points

- Pairs with `legal/` skills for contract redlines
- Pairs with `marketing/copywriting/` for content review
- Used by `c-level-advisor/board-deck-builder` for board-pack documents

---

## pdf-toolkit

Source path: `references/documents/pdf-toolkit/SKILL.md`

# PDF Toolkit

Audit `.pdf` files for metadata, page count, encryption status, embedded JavaScript, embedded files, and PDF version — using the standard library only.

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

pdf, pdf audit, pdf metadata, pdf review, pdf leakage, pdf security, redaction, document handoff

---

## Clarify First

Before running the audit, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Audit purpose (pre-handoff metadata scrub, inbound security triage, or bulk outbound check)** — selects which of the 3 workflows and which fields you act on
- [ ] **Recipient / handling context (external party, managed laptop)** — sets what counts as a leak or a threat worth quarantining
- [ ] **Expected legitimate metadata (who the author/title should be)** — without it you can't distinguish a leak from expected data

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
python scripts/pdf_auditor.py contract.pdf
```

Outputs: PDF version, page count, file size, metadata (Author, Title, Producer, Creator, dates), encryption status, embedded JavaScript indicators, embedded file indicators.

---

## Core Workflows

### Workflow 1: Pre-Handoff PDF Metadata Audit

**Goal:** Stop leaking author identity, prior client names, or document history when handing a PDF to an external party.

**Steps:**
1. Run: `python scripts/pdf_auditor.py document.pdf`
2. Review metadata fields:
   - `Author` matches the sender (not "Bob's intern" from a prior project)
   - `Title` matches the document, not a leftover working title
   - `Producer` doesn't reveal an internal-only PDF tool
   - `CreationDate` and `ModDate` are reasonable for the deal
3. If metadata leaks, re-export from source with cleaned properties (or use a redaction tool)

**Time Estimate:** 2-3 minutes per document.

### Workflow 2: PDF Security Triage

**Goal:** Decide whether a received PDF can be opened safely on a managed laptop.

**Steps:**
1. Run audit
2. JavaScript indicator present → quarantine; review in a sandbox
3. Embedded files indicator present → list of file types; quarantine if unexpected
4. Encrypted with non-empty owner password → request password from sender via separate channel
5. Decision: open / quarantine / reject

**Time Estimate:** 1-2 minutes per inbound document.

### Workflow 3: Bulk Audit of an Outbound Document Set

**Goal:** Audit every PDF in a folder before zipping for a customer or partner.

**Steps:**
1. Loop: `for f in *.pdf; do python scripts/pdf_auditor.py "$f" --json; done > audit.jsonl`
2. Parse the JSON Lines for any metadata leakage or anomalies
3. Re-export problem files from source
4. Re-run audit until clean

**Time Estimate:** 1-2 minutes per file.

---

## Tools

### pdf_auditor.py

Reads a PDF using stdlib parsing — no `pypdf` or `pdfplumber` required. Detects:

- PDF version (from header)
- Page count (via `/Type /Page` object scan)
- File size
- Document Info / XMP metadata (Title, Author, Subject, Keywords, Producer, Creator, CreationDate, ModDate)
- Encryption status (`/Encrypt` reference present)
- JavaScript indicators (`/JS`, `/JavaScript`, `/AA` keys)
- Embedded files indicator (`/EmbeddedFiles`)

```bash
python scripts/pdf_auditor.py document.pdf
python scripts/pdf_auditor.py document.pdf --json
```

**Limits:**
- Does **not** extract text content — pure PDF text extraction with stdlib is unreliable. For text extraction install `pdfplumber` or `pypdf` separately.
- Cannot decrypt encrypted files.
- Detects only the presence of JavaScript/embedded files, not their behavior.

---

## Reference Guides

- **`references/pdf_handoff_guide.md`** — What to scrub from PDFs before external send; PDF/A and PDF/UA basics; common leakage patterns

---

## Templates

- **`assets/pdf_handoff_checklist.md`** — Pre-send PDF sign-off checklist

---

## Best Practices

- **Re-export rather than redact.** Redaction tools that "remove" content can leave it recoverable. The safest path is regenerating the PDF from the source document with sensitive fields removed.
- **Scrub document properties at the source.** In Word: File → Inspect Document → Document Inspector. In Pages: File → Properties. Then export to PDF.
- **Don't trust filenames.** A file named `Public-Report.pdf` can carry private metadata indistinguishable to the human eye.
- **Use PDF/A for archival.** PDF/A removes JavaScript and external dependencies, making documents safe for long-term archive.

---

## Integration Points

- Pairs with `legal/` for redacted contract handoffs
- Pairs with `c-level-advisor/board-deck-builder` for board pack handoff
- Used by `marketing/` for whitepaper / case-study handoff

---

## pptx-toolkit

Source path: `references/documents/pptx-toolkit/SKILL.md`

# Pptx Toolkit

Audit `.pptx` files using the standard library only — no `python-pptx` required. Reads OOXML directly via `zipfile` + `xml.etree`.

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

pptx, PowerPoint, slide deck, presentation, board deck, sales deck, deck review, slide density, speaker notes, animation, hidden slides

---

## Clarify First

Before running the audit, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Deck purpose (board/investor, sales, or conference talk)** — sets the density caps, speaker-notes coverage, and animation limits (the rubric differs per type)
- [ ] **Delivery context (sent to be read vs presented live from notes)** — changes whether bare slides and animations are acceptable
- [ ] **Whether hidden slides should ship** — distinguishes intentional backup slides from leftover narrative cruft

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
python scripts/pptx_auditor.py deck.pptx
```

Outputs: slide count, hidden slide count, slides with speaker notes, words per slide (with per-slide breakdown), image and embedded-media count, animation node count, theme name.

---

## Core Workflows

### Workflow 1: Pre-Meeting Deck Review

**Goal:** Catch the issues that make decks look unprofessional in the room — overstuffed slides, missing speaker notes, leftover hidden slides from prior versions.

**Steps:**
1. Run audit
2. Slides with > 50 words → flag for content reduction
3. Slides without speaker notes for a board / investor deck → add notes or mark "intentionally bare"
4. Hidden slides → confirm they should ship hidden, or delete
5. Animation count > 100 across deck → likely over-animated; trim

**Time Estimate:** 5-10 minutes per deck.

### Workflow 2: Board / Investor Deck Audit

**Goal:** Hold a board / investor deck to a higher quality bar with a structured audit trail.

**Steps:**
1. Run audit; export JSON for archival alongside the deck
2. Apply the rubric in `references/deck_density_rubric.md`
3. Flag slides over density caps; trim to one idea per slide
4. Pair with `cs-board-deck-builder` skill for narrative review

**Time Estimate:** 30-60 minutes per board deck.

### Workflow 3: Pre-Conference Talk Deck Check

**Goal:** Stage-ready deck — hidden / cut slides removed, speaker notes complete, animations rehearsable.

**Steps:**
1. Audit; ensure slide count matches dry-run timing budget
2. Speaker notes coverage > 90% (for talks where you'll deliver from notes)
3. Animations under 50 across the talk (more invites timing accidents on stage)
4. Embedded video / audio: confirm present and play locally

**Time Estimate:** 15 minutes pre-rehearsal.

---

## Tools

### pptx_auditor.py

Reads a `.pptx` file as a ZIP archive and parses OOXML directly. No external dependencies.

```bash
python scripts/pptx_auditor.py deck.pptx
python scripts/pptx_auditor.py deck.pptx --json
```

**Reports:**
- Slide count and hidden-slide count
- Slides with speaker notes (count and percentage)
- Words per slide (mean, max, full distribution)
- Top-N densest slides
- Image / embedded-media count
- Animation timing node count
- Theme name

---

## Reference Guides

- **`references/deck_density_rubric.md`** — Words-per-slide guidance by deck purpose (board, sales, talk, training); animation philosophy; speaker-notes pattern

---

## Templates

- **`assets/deck_handoff_checklist.md`** — Pre-meeting deck sign-off checklist

---

## Best Practices

- **One idea per slide.** If you can't summarize the slide in one sentence, it has more than one idea.
- **Speaker notes are documentation.** Slides without notes leave readers (post-meeting) guessing what the talk track was.
- **Delete hidden slides before sending.** Hidden slides are often older versions left for "just in case" — they survive forever and leak narrative context.
- **Animations are timing risk.** Every animation is a place where the live demo can desync from the speaker.

---

## Integration Points

- Pairs with `c-level-advisor/board-deck-builder` for board / investor decks
- Pairs with `marketing/launch-strategy` for launch-deck reviews
- Used by `cs-pr-comms-lead` for press / partner decks

---

## xlsx-toolkit

Source path: `references/documents/xlsx-toolkit/SKILL.md`

# Xlsx Toolkit

Audit `.xlsx` files using the standard library only — no `openpyxl` required. Reads OOXML directly via `zipfile` + `xml.etree`.

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

xlsx, Excel, spreadsheet, workbook, financial model, formula audit, hidden sheets, external references, named ranges, data validation

---

## Clarify First

Before running the audit, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Audit purpose (pre-send leak check, financial-model review, or handoff portability check)** — selects the workflow and what you flag
- [ ] **Recipient context (external partner, another team, their machine)** — sets the tolerance for hidden sheets and external links
- [ ] **Which sheets are inputs vs calculations (for model review)** — drives where to focus formula-density reading

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Quick Start

```bash
python scripts/xlsx_auditor.py model.xlsx
```

Outputs: sheet count and names, hidden-sheet count, cell count per sheet, formula count per sheet, external link count, named range count, data validation rule count.

---

## Core Workflows

### Workflow 1: Pre-Send Workbook Audit

**Goal:** Catch the issues that embarrass the sender — leftover hidden sheets, broken external links, unused named ranges, formulas referencing local file paths.

**Steps:**
1. Run audit
2. Hidden sheets > 0 → confirm intentional or delete
3. External links > 0 → verify links point to public / shared sources, not your local drive
4. Named-range count anomalies (very high) → likely cruft from prior model versions; clean up
5. Re-run until clean

**Time Estimate:** 5-10 minutes per workbook.

### Workflow 2: Financial Model Review

**Goal:** Quantify the rough complexity of a financial model before reading cell-by-cell.

**Steps:**
1. Run audit; capture per-sheet cell counts and formula counts
2. Sheets with formula density > 70% are calculation sheets; should be well-structured
3. Sheets with formula density 0-10% are inputs; should be obviously labeled
4. Sheets with formula density 10-70% are mixed — easiest place for errors to hide
5. Cross-reference with `references/financial_model_audit_guide.md`

**Time Estimate:** 30-60 minutes per model audit (audit + targeted reading).

### Workflow 3: Workbook Handoff Check

**Goal:** Ensure a workbook handed off to another team or partner won't break on their machine.

**Steps:**
1. Run audit
2. External links → re-link to shared paths (OneDrive, SharePoint, S3) or hard-code values
3. Custom named ranges → document if recipient is expected to extend; remove if internal
4. Macros (xlsm) → audit shows non-`.xlsx` extension expected; convert if recipient cannot run macros
5. File size > 10 MB → consider splitting or removing image / chart blobs

**Time Estimate:** 10-20 minutes per workbook.

---

## Tools

### xlsx_auditor.py

Reads a `.xlsx` file as a ZIP archive and parses OOXML directly.

```bash
python scripts/xlsx_auditor.py model.xlsx
python scripts/xlsx_auditor.py model.xlsx --json
```

**Reports:**
- Sheet list with name, hidden status, cell count, formula count, formula density %
- Total cell and formula counts
- Named ranges and their scopes
- External link references (file paths or URLs)
- Data validation rule count
- File size

**Limits:**
- Does **not** evaluate formulas. To check whether formulas are *correct*, use Excel itself or a financial-model-checker library.
- Does **not** read cell values for non-shared-string cells beyond counting; full value extraction requires more parsing than this tool does.

---

## Reference Guides

- **`references/financial_model_audit_guide.md`** — Patterns for auditing financial models; common error categories; defensive structure tips

---

## Templates

- **`assets/workbook_handoff_checklist.md`** — Pre-send xlsx sign-off checklist

---

## Best Practices

- **Hide internal-only sheets only when intended.** If a sheet is hidden because it's WIP, delete it before sending.
- **Avoid external links across handoffs.** A formula referencing `'C:\Users\you\Desktop\old-model.xlsx'` is the workbook equivalent of leaving your laptop name in the document author field.
- **Name your inputs.** Cells like `Inputs!B7` mean nothing. Named ranges like `WACC` and `RevenueGrowth` survive structural changes.
- **One model, one purpose.** Workbooks that calculate, present, and serve as a database of records always end up broken.

---

## Integration Points

- Pairs with `finance/` skills for financial-model review
- Pairs with `c-level-advisor/cfo-advisor` for board-pack workbook review
- Used by `data-analytics/` for ad-hoc analytics handoff
