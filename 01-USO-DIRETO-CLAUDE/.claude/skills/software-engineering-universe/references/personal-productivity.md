# Domain: personal-productivity
Source Skills in this domain: 13

---

## calendar-prep

Source path: `references/personal-productivity/calendar-prep/SKILL.md`

# Calendar Prep

Convert structured meeting context into a one-page briefing in seconds.

---

## Keywords

meeting prep, calendar prep, briefing, pre-read, pre-meeting, talking points, agenda, board meeting, customer call, 1:1

---

## Clarify First

Before generating the briefing, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Meeting type & attendees** — customer call vs board vs 1:1 changes the briefing's structure, tone, and emphasis
- [ ] **Your goal / decision sought** — this becomes the front-loaded first line of the briefing
- [ ] **Prior context** — last contact, open issues, current status; without it the briefing is generic and useless

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## Quick Start

1. Fill in `assets/meeting_input.json` with attendees, context, decisions needed, supporting links
2. Run: `python scripts/meeting_prep_briefer.py meeting_input.json`
3. Read the briefing 5 minutes before the meeting

---

## Core Workflows

### Workflow 1: Customer Call Prep
1. Pull the customer's recent activity, last meeting notes, current account status
2. Fill input JSON with: attendees, last contact, open issues, your goal, decisions you're trying to make
3. Run briefer
4. Walk in knowing: what you want, what they want, where you have leverage

**Time Estimate:** 10-15 minutes per major customer call.

### Workflow 2: Board / Investor Meeting Prep
1. Pull metrics dashboard, prior board deck, last investor update
2. Build input JSON; emphasize decisions sought from the board
3. Pair output with `documents/pptx-toolkit/` deck audit

**Time Estimate:** 30-60 minutes per board meeting.

### Workflow 3: Manager 1:1 Prep
1. Compress the past two weeks: top 3 wins, top 3 challenges, top 3 asks
2. Run briefer
3. Lead with asks (1:1s default to status; the leverage is in asking)

**Time Estimate:** 5-10 minutes per 1:1.

---

## Tools

### meeting_prep_briefer.py

Reads a structured JSON input describing meeting context and produces a one-page briefing in markdown.

```bash
python scripts/meeting_prep_briefer.py meeting_input.json
python scripts/meeting_prep_briefer.py meeting_input.json --json
```

---

## Reference Guides

- **`references/briefing_methodology.md`** — When briefings help and when they don't, format conventions

---

## Templates

- **`assets/meeting_input.json`** — Input file template

---

## Best Practices

- **One page max.** A 3-page briefing is one you won't read.
- **Front-load the decision.** The first sentence should be the decision you want.
- **Read the briefing.** Generating one without reading it is performance theater.
- **Capture outputs.** Pair with `personal-productivity/meeting-insights/` post-meeting to convert the briefing's questions into the meeting's decisions.

---

## capture

Source path: `references/personal-productivity/capture/SKILL.md`

# Capture

A reliable front door for every commitment, idea, and open loop — and a
processing pass that empties it. Capture is cheap and fails silently: you never
notice the thought you didn't record, only the dropped commitment weeks later.
This skill covers the capture conventions, the triage decision rules that
convert fragments into executable next actions, and the weekly pass that keeps
the inbox at zero.

## When to use this skill

- Commitments keep slipping and you are discovering them from other people's follow-ups
- Your notes app, task inbox, and paper notebook have all become backlogs nobody drains
- The same items get reviewed week after week and never get done
- You are rebuilding a productivity system that collapsed and want the load-bearing part first
- Captured items are phrased as topics (`pricing`, `taxes`) rather than actions
- You want to measure whether the capture habit is actually working, not assume it

## Inputs the skill expects

- A capture log — JSON with `text` and ideally `captured_at`, or a markdown bullet list
- The set of surfaces you currently capture into (phone, notebook, email, chat)
- Which single place you intend to use as the processing inbox
- Your current weekly processing slot, if one exists
- A reference date for staleness analysis (passed explicitly — the tools never read the clock)

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which inbox is the processing inbox** — the whole design collapses if items drain to more than two places
- [ ] **Whether the log carries capture timestamps** — without them, staleness and habit-health analysis are unavailable and the audit degrades to phrasing only
- [ ] **Whether a weekly processing slot already exists** — determines whether this is a setup job or a repair job
- [ ] **Tolerance for dropping items** — sets how aggressive the drop recommendations are; some users need permission, others need a brake

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Triage the inbox into buckets with next actions

Run this at the start of every weekly pass. It does the mechanical sorting so
your judgement is spent on the genuinely ambiguous items.

1. Drain every capture surface into one file (JSON or markdown bullets).
2. Run the triage tool with today's date so ageing is computed.
3. Do the flagged 2-minute items immediately, before filing anything else.
4. Rewrite every item flagged `no-verb` or `unactionable-phrasing` using the
   grammar `<concrete verb> <specific object> <qualifier>`.
5. Move each remaining item to its destination — actions, projects, calendar,
   waiting-for, reference, someday, or the bin.

```bash
python3 personal-productivity/capture/scripts/capture_triage.py \
  --input personal-productivity/capture/assets/sample_capture_log.json \
  --today 2026-07-21
```

Filter to one bucket when working a single destination at a time:

```bash
python3 personal-productivity/capture/scripts/capture_triage.py \
  --input personal-productivity/capture/assets/sample_capture_log.json \
  --today 2026-07-21 --bucket project --format json
```

### Workflow 2 — Audit whether the capture habit is real

Monthly. Answers a different question from triage: not "what is in the inbox"
but "is this system actually working."

1. Run the audit against the full log with a reference date.
2. Read the status line — `healthy`, `at-risk`, or `failing` — and the verdict,
   which names the dominant failure (processing vs phrasing).
3. Check the source breakdown for the leakiest capture surface.
4. Fix exactly one thing before the next month: either restore the processing
   pass, or fix the phrasing habit. Not both — they need different attention.

```bash
python3 personal-productivity/capture/scripts/capture_audit.py \
  --input personal-productivity/capture/assets/sample_capture_log.json \
  --today 2026-07-21
```

Tighten the staleness threshold if you process more than weekly:

```bash
python3 personal-productivity/capture/scripts/capture_audit.py \
  --input personal-productivity/capture/assets/sample_capture_log.json \
  --today 2026-07-21 --stale-days 7 --format json
```

### Workflow 3 — Run the weekly inbox-zero pass

The load-bearing habit. 45 minutes, same slot weekly, defended like a meeting
with someone you respect.

1. Open `assets/weekly-processing-pass.md` and work down it.
2. Gather from every surface (5 min), then triage (5 min).
3. Process every item one at a time without skipping (20 min) — skipping is how
   items become permanently stale.
4. Review projects for missing next actions (8 min), then waiting-for items (5 min).
5. Record the outcome counts on the checklist. Watch the drop rate specifically:
   below 15% means you are filtering too early at capture time.

```bash
mkdir -p build
python3 personal-productivity/capture/scripts/capture_triage.py \
  --input personal-productivity/capture/assets/sample_capture_log.json \
  --today 2026-07-21 --format json > build/triaged.json
```

## Decision frameworks

### The processing sequence

Apply in this order for every item. The order prevents the most common error —
doing a 90-second task that should have been deleted.

| Step | Question | If no | If yes |
|---|---|---|---|
| 1 | Is it actionable? | Reference, someday, or **drop** | Continue |
| 2 | What does done look like? | It is a decision, not a task | Continue |
| 3 | One step only? | Project + define first action | Action |
| 4 | Under 2 minutes? | Continue | Do it now |
| 5 | Am I the right person? | Delegate + follow-up date | Continue |
| 6 | Date-specific? | Next-actions list | Calendar |

### Do / defer / delegate / drop

| Decision | Test | [PROVEN] threshold |
|---|---|---|
| **Do** | Under 2 min and you are in processing mode | 2 min — filing plus re-contextualising exceeds the task past this point |
| **Defer** | Yours, over 2 min, no one else can do it | Costs a list slot and a weekly re-read, forever |
| **Delegate** | Someone else is better placed | Always creates a waiting-for entry with a date — 3 working days for same-week items, 1 week otherwise |
| **Drop** | No meaningful consequence if never done | Survived 3 weekly reviews with no progress = drop it; that is a decision, so record it as one |

**Drop is the most under-used outcome and the highest-leverage one.** A healthy
pass drops 15-25% of items. Below that you are filtering at capture time, which
uses exactly the tired, distracted judgement that capture exists to protect you
from.

### Habit-health thresholds

| Metric | Healthy | Warning | Broken |
|---|---|---|---|
| Median inbox age | < 7 days | 7-14 days | > 14 days |
| Share older than 14 days | < 20% | 20-40% | > 40% |
| Share with no concrete verb | < 25% | 25-50% | > 50% |
| Inbox size after a pass | 0-3 | 4-10 | > 10 |
| Capture latency (locked phone to saved text) | < 2 sec | 2-5 sec | > 15 sec — you are running on memory |

### Converting a vague capture

Two questions unstick anything. `[PROVEN]`

1. **"What does done look like?"** → produces the outcome. No one-sentence
   answer means it is a project, or an undecided commitment.
2. **"What is the very next physical thing I would do?"** → produces the action.
   The honest answer is usually smaller than expected and often
   information-gathering: find the file, ask the question, check the constraint.

If both fail, it is not a task but an unmade decision. File it as
`Decide whether to X by <date>`.

## Anti-Patterns

### The Multi-Inbox System
**Mistake:** Capturing into six places and reviewing all six, so no single review ever produces the feeling of having seen everything.
**Why it happens:** Each surface was added for a good local reason — voice memos for the car, a notebook for meetings, chat-to-self for links. Nobody decides to have six inboxes; they accumulate.
**Instead:** Keep as many capture *surfaces* as you need, but exactly one *processing* inbox (two at the outside, when email is unavoidable). Every surface must drain into it. List every place an unprocessed commitment can currently live, and for each decide: drains into the primary, or is the primary. Anything else gets closed.

### Filtering at Capture Time
**Mistake:** Deciding whether something is worth capturing before writing it down, to keep the list manageable.
**Why it happens:** A long list feels like failure, so people self-censor. It sounds like discipline.
**Instead:** Capture with zero filtering and filter hard at processing. The judgement you apply mid-meeting or half-asleep is exactly the judgement capture exists to bypass. If your processing pass drops nothing, that is the tell — you are pre-filtering, and the items you silently discard are the small commitments whose loss damages trust most.

### The Permanent Almost-Task
**Mistake:** Leaving items phrased as topics or mental states — `pricing`, `follow up with Sam`, `think about the roadmap` — and reviewing them week after week.
**Why it happens:** The phrasing feels sufficient at capture time because the full context is still in your head. It evaporates within days, leaving a fragment that reads as a task but cannot be executed.
**Instead:** Enforce the grammar `<concrete verb> <specific object> <qualifier>`, where the verb names something physically visible. "Decide," "handle," and "follow up" fail the test. Run `capture_triage.py` and rewrite everything it flags `no-verb` — those are the items your mind has been quietly skipping at every review.

### Triaged But Not Empty
**Mistake:** Reading through the whole inbox during the weekly pass, feeling current, and leaving the items in place.
**Why it happens:** Reading is fast and feels like progress; deciding is slow and each decision has a small cost. Under time pressure, review substitutes for processing.
**Instead:** Inbox zero means every item has physically left the inbox for a specific destination. Items remaining after a pass have had a decision deferred, and the same decision will be deferred next week — that is precisely how a five-item inbox becomes a fifty-item one. If the backlog is genuinely too large, declare bankruptcy on anything over 60 days old and archive it wholesale rather than skipping the pass.

## Files

| File | Purpose |
|---|---|
| `scripts/capture_triage.py` | Sorts a capture log into action / project / reference / someday / drop, suggests a next action per item, flags 2-minute tasks and unactionable phrasing |
| `scripts/capture_audit.py` | Scores capture-habit health — staleness, rot, phrasing quality, source leaks — and names the dominant failure mode |
| `references/capture-conventions.md` | Friction budget, capture-surface ranking, the one-inbox principle, metadata worth recording, how trust is lost |
| `references/triage-decision-rules.md` | Processing sequence, 2-minute rule constraints, do/defer/delegate/drop tests, vague-to-actionable conversion, weekly pass mechanics |
| `assets/weekly-processing-pass.md` | Timed 45-minute checklist for the weekly inbox-zero pass with outcome-count targets |
| `assets/capture-log-template.md` | Capture-log format, quality reminders, and the JSON schema the scripts read |
| `assets/sample_capture_log.json` | 14-item sample log exercising every bucket and flag, so both workflows run out of the box |

---

## deep-work

Source path: `references/personal-productivity/deep-work/SKILL.md`

# Deep Work

Blocking time on a calendar is the easy half; making the time inside the block
convert into output is the hard half. This skill covers both — measuring how
badly meetings fragment your week, defending blocks against encroachment, and
designing sessions so that protected time produces a finished artefact rather
than a warm feeling.

## When to use this skill

- Your calendar looks manageable in total meeting hours but no real work gets done
- Focus blocks exist but keep getting moved, split, or quietly cancelled
- You need to argue for protected time and want fragmentation data rather than a preference
- Sessions happen but produce fragments — nothing reaches a finished state
- You want to know whether your deep-work practice is improving or decaying over months
- A 30-minute meeting keeps landing in the middle of your only long block

## Inputs the skill expects

- A calendar export as JSON — `date`, `start`, `end`, `title`, optional `fixed` flag
- Your working-window hours (defaults to 09:00-17:00)
- Your role, which sets a realistic deep-work ratio target (40-60% IC, 20-30% manager)
- A session log with `date` and `actual_min`, ideally `interruptions` and `artefact`
- Your current weekly deep-work target in minutes, set from logged history rather than aspiration

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Role and realistic target ratio** — the 0.40 default is an IC figure and will flag every manager's calendar as failing, which is noise not signal
- [ ] **Which meetings are genuinely immovable** — the `fixed` flag determines whether a reschedule proposal is actionable or fantasy
- [ ] **Working-window hours** — a 9-5 window on someone who works 07:00-15:00 produces meaningless ratios
- [ ] **Whether the goal is diagnosis or advocacy** — arguing for protected time leads with recovery cost; personal tuning leads with block length

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Diagnose calendar fragmentation and get a reschedule

Run weekly against the coming week, before it fills up.

1. Export the calendar to JSON with `date`, `start`, `end`, `title`.
2. Mark genuinely immovable events with `"fixed": true` — the search skips them.
3. Run the analyser with your role's target ratio.
4. Read the per-day table: any day with a longest block under 90 minutes
   produced no substantive individual work, whatever your output log says.
5. Make the one move it proposes. One move per week is politically sustainable;
   a wholesale calendar rewrite is not.

```bash
python3 personal-productivity/deep-work/scripts/calendar_fragmentation.py \
  --input personal-productivity/deep-work/assets/sample_calendar.json \
  --target 0.40
```

For a manager's calendar with a longer working window and a role-appropriate
target — the same file scored at the 0.40 IC default reads as failing on 14 of
20 days, which is target miscalibration rather than a real finding:

```bash
python3 personal-productivity/deep-work/scripts/calendar_fragmentation.py \
  --input personal-productivity/deep-work/assets/sample_calendar_manager_4weeks.json \
  --day-start 08:00 --day-end 18:00 --min-block 90 --target 0.25
```

### Workflow 2 — Track whether the practice is improving

Monthly, not weekly. Weekly volume is noisy enough that reacting to it produces
thrashing.

1. Log each session at close-out using `assets/session-log-template.md`.
2. Run the analyser with a weekly target set from your own logged history.
3. Read the trend line — a change over 10% between the first and second half of
   the period is real; anything less is noise.
4. Read the findings, which name specific structural failures rather than
   general encouragement.
5. Fix exactly one thing. Volume, block length, and defence are three different
   problems; working all three at once teaches you nothing about which mattered.

```bash
python3 personal-productivity/deep-work/scripts/session_log_analyzer.py \
  --input personal-productivity/deep-work/assets/sample_sessions.json \
  --weekly-target 600
```

### Workflow 3 — Make the case for protected time

When you need a manager or team to concede structural change.

1. Export two to four weeks of calendar history and run the fragmentation tool.
2. Lead with the **recovery cost** figure, not the meeting-hours figure.
   "Meetings take 9 hours a week" invites a debate about which meetings matter;
   "fragmentation costs another 6 hours a week in re-immersion, on top of the
   meetings" reframes it as waste.
3. Show the count of days with zero viable blocks.
4. Propose the specific single move the tool identifies — concrete, small, and
   reversible asks get agreed; general ones get sympathy.
5. Re-run after four weeks and report the delta. The follow-up measurement is
   what turns a one-off concession into a standing arrangement.

```bash
mkdir -p build
python3 personal-productivity/deep-work/scripts/calendar_fragmentation.py \
  --input personal-productivity/deep-work/assets/sample_calendar_manager_4weeks.json \
  --target 0.40 --format json > build/fragmentation.json
```

## Decision frameworks

### Block length vs usable output

| Block | Warmup share | Verdict |
|---|---|---|
| 25 min | ~70% | Pre-defined execution only. Not deep work. |
| 45 min | ~40% | Marginal — works only when resuming something touched hours ago |
| **90 min** | ~20% | **[PROVEN] Minimum viable block.** Warmup amortises; one real problem gets solved |
| 120 min | ~15% | The default target — depth without quality decay |
| 180 min | ~10% | Excellent for absorbing work; needs a real break after |
| 240+ min | ~8% | Diminishing returns; split it |

Problem-state reload costs 15-20 minutes and is paid on every re-entry. This is
why five 30-minute gaps are not equivalent to one 150-minute block — the gaps
yield close to zero.

### Interruption budget

Each interruption costs roughly **23 minutes** of degraded output, not the
duration of the interruption. `[PROVEN]`

| Interruptions/hour | Effective output | Verdict |
|---|---|---|
| 0 | ~100% | The block is real |
| 0.5 | ~80% | Acceptable — the practical target |
| 1.0 | ~60% | Ceiling. Above this, blocked but not defended |
| 2.0 | ~30% | Shallow work in a room labelled deep work |
| 3+ | ~10% | Move the slot; this one cannot be defended |

Set the budget one step below your measured rate, never at zero — zero is
unachievable in most roles and failing it immediately kills the practice. Define
the consequence in advance: exceeding the budget means **reschedule the block**,
not push through. Pushing through teaches you that protected time yields shallow
work, which is the belief you are trying to disprove.

### Role-calibrated targets

| Role | Deep-work ratio | Daily sustainable |
|---|---|---|
| IC — engineer, writer, analyst, designer | 40-60% | 2-4 h |
| Senior IC / tech lead | 30-40% | 2-3 h |
| Team manager | 20-30% | 1-2 h, two blocks a week |
| Director+ | 10-20% | Defended pockets |
| On-call rotation | 0-10% | Do not schedule deep work into a rotation |

**Most people sustain 3-4 hours of genuine deep work per day as an upper bound.**
Beyond that the work continues but the quality does not, and the deficit shows
up as needing to redo it.

### Session design rules `[PROVEN]`

| Rule | Why |
|---|---|
| Pre-commit the artefact the night before | Deciding inside the block burns your freshest attention on a decision you could make while tired |
| One session, one artefact — not one project | Two artefacts means paying warmup twice and finishing neither |
| Stop mid-thought at close-out | An unfinished sentence halves tomorrow's warmup; finishing cleanly feels better and costs more |
| No 2-minute tasks inside the block | The 2-minute rule is a processing-mode rule; here it costs the task plus 23 minutes of re-entry |
| Place blocks at a day boundary | A midday block has two exposed edges and collects meetings on both |

## Anti-Patterns

### Blocking Time Without Defending It
**Mistake:** Putting recurring "Focus time" on the calendar, then moving or shortening it whenever anyone asks.
**Why it happens:** The block is self-imposed, so it feels like the one commitment with no external cost to breaking. Each individual concession is genuinely reasonable.
**Instead:** Name the block after the actual work (`Migration RFC — drafting`), set it busy rather than free, and place it at a day boundary so it has one exposed edge instead of two. When it must move, move it the same day — "sometime this week" means never. Track how often you move it; a block that relocates weekly is not a block, it is a preference.

### Conceding the 30-Minute Wedge
**Mistake:** Accepting a short meeting into the middle of a long block because giving up 30 minutes seems like a small concession.
**Why it happens:** The arithmetic of block splitting is invisible. Losing 30 minutes from 120 looks like a 25% cost.
**Instead:** Recognise that it costs the whole block — two 45-minute halves are both under the viable threshold, so the real loss is 120 minutes, not 30. Counter with placement rather than refusal: "Can we put it against the 11:00 meeting so the morning stays whole?" Scheduling people have one slot to fill and no visibility into what they are displacing; naming the cost converts an invisible loss into a visible tradeoff, and most people adjust.

### Deciding What to Work On Inside the Block
**Mistake:** Arriving at a protected block and spending the first 20 minutes choosing what to do with it.
**Why it happens:** The block was defended as generic focus time rather than committed to a specific artefact, so the decision has nowhere else to live.
**Instead:** Write one line the night before: "Tomorrow 09:30-11:30 I will work on `<artefact>` until `<observable state>`." If you cannot name an observable done-state, the work is not ready for a deep block — it needs a planning pass first, which is itself a legitimate and much shorter session.

### Measuring Hours Blocked Instead of Work Done
**Mistake:** Tracking calendar time reserved for deep work and treating a full-looking week as a successful one.
**Why it happens:** Blocked hours are trivially countable; actual focus is not. The metric that is easy to collect displaces the one that matters.
**Instead:** Log `actual_min`, `interruptions`, and the single `artefact` per session, then run `session_log_analyzer.py`. Plan-vs-actual drift over 20% and interruption rates above 1.0/hour are the two numbers that predict whether the habit survives — and both are invisible if you only count what the calendar reserved.

## Files

| File | Purpose |
|---|---|
| `scripts/calendar_fragmentation.py` | Per-day longest block, context-switch count, deep-work ratio vs target, plus a searched single-meeting reschedule proposal |
| `scripts/session_log_analyzer.py` | Weekly volume rollup, session-length distribution, interruption rate, plan-vs-actual drift, single-artefact adherence, and trend detection |
| `references/focus-block-design.md` | Block-length economics, daily ceilings, four-part session structure, placement by chronotype, interruption budgeting, diagnostic table |
| `references/defending-focus-time.md` | Encroachment patterns, calendar mechanics ranked by social cost, decline scripts, self-encroachment, role-calibrated targets, making the data case |
| `assets/session-log-template.md` | Pre-commitment prompt, session-entry schema, close-out checklist, monthly review table |
| `assets/sample_calendar.json` | Five-day IC calendar with one heavily fragmented day, so the reschedule search has something to find |
| `assets/sample_calendar_manager_4weeks.json` | 104 events over 20 working days of a meeting-dense manager calendar — drives the role-calibrated target example and the four-week advocacy export |
| `assets/sample_sessions.json` | Four weeks of sessions with a visible improving trend and two failed sessions, exercising every finding |

---

## domain-name-brainstormer

Source path: `references/personal-productivity/domain-name-brainstormer/SKILL.md`

# Domain Name Brainstormer

Generate and score candidate brand / domain names from seed words using common naming patterns. The script does not check live registration — it produces candidates fast so you can spend your time evaluating the best ones.

---

## Table of Contents

- [Keywords](#keywords)
- [Quick Start](#quick-start)
- [Core Workflows](#core-workflows)
- [Tools](#tools)
- [Reference Guides](#reference-guides)
- [Best Practices](#best-practices)

---

## Keywords

domain, domain name, naming, brand naming, product name, company name, .com, brainstorm, naming brainstorm, brand identity, naming strategy

---

## Clarify First

Before generating names, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Seed words** — 3-7 words describing the product, value, or feeling; every candidate is built from these
- [ ] **Brand tone** — serious/technical vs playful/coined steers which patterns (blend, vowel-drop, prefix-suffix) to favor
- [ ] **TLD preference** — .com vs .ai/.io/.co changes the shortlist and whether the `tld_suffix` pattern applies

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## Quick Start

### Generate 200 Candidates in 30 Seconds

```bash
python scripts/name_generator.py "data,insight,signal" --count 200
```

Then:
1. Eliminate anything > 12 characters
2. Eliminate anything that's hard to spell after hearing it once
3. Eliminate anything that sounds like a competitor
4. Take the top 10-15 to a registrar (manually) to check availability across .com / .ai / .io / .co

---

## Core Workflows

### Workflow 1: Seed-Word Brainstorm

**Goal:** Convert a few keywords describing the product into 100+ ranked candidates.

**Steps:**
1. List 3-7 seed words that describe the product, value, or feeling
2. Run: `python scripts/name_generator.py "seed1,seed2,seed3" --count 200`
3. Sort the output by score (highest first)
4. Apply the elimination filter from `references/naming_framework.md`
5. Pick a shortlist of 10-15 to manually check for trademark and domain availability

**Expected Output:** Ranked list of candidates with scores, classified by pattern (vowel-drop, blend, prefix-suffix, TLD-as-suffix).

**Time Estimate:** 5-10 minutes.

### Workflow 2: Pattern-Specific Generation

**Goal:** Get more of one specific pattern (e.g., only blends, or only TLD-as-suffix names).

**Steps:**
1. Run with pattern filter: `python scripts/name_generator.py "fast,ship" --pattern blend --count 100`
2. Available patterns: `vowel_drop`, `prefix_suffix`, `blend`, `tld_suffix`, `repeat`, `all`
3. Iterate seeds until you have 20+ candidates worth taking to availability checks

**Expected Output:** Pattern-specific list.

**Time Estimate:** 5 minutes per pattern variation.

### Workflow 3: Trademark / Availability Pre-Check

**Goal:** Avoid wasting energy on names that are obviously taken.

**Steps:**
1. Take the shortlist from Workflow 1 or 2
2. **Manually** check each on:
   - A domain registrar (Namecheap, Cloudflare, Porkbun) for .com / .ai / .io / .co
   - The USPTO TESS database (or your jurisdiction's trademark office) for live trademarks in the relevant class
   - A regular Google search for existing usage
3. Drop anything with a live trademark in the same product class, an active product on a similar domain, or a trademarked .com that you do not own

> The script does **not** automate registrar lookups — those need real network calls and rate-limited APIs. Doing this step manually for a 10-name shortlist takes 10-15 minutes.

---

## Tools

### name_generator.py

Generates candidate names by applying naming patterns to seed words and scores each on length, pronounceability, and uniqueness.

```bash
# Default: 100 candidates, all patterns
python scripts/name_generator.py "data,signal,insight"

# More results
python scripts/name_generator.py "data,signal" --count 300

# One pattern only
python scripts/name_generator.py "data,signal" --pattern vowel_drop

# JSON for programmatic use
python scripts/name_generator.py "data,signal" --json
```

**Patterns implemented:**
- `vowel_drop` — Remove inner vowels: "data" → "dta", "insight" → "nsght"
- `prefix_suffix` — Add common naming prefixes/suffixes: "ly", "ify", "io", "lab", "labs", "hq", "co", "stack", "kit", "app"
- `blend` — Combine two seeds: "data" + "signal" → "dasignal", "datignal"
- `tld_suffix` — Treat TLD as part of the name: "send.fast" reads as "sendfast"
- `repeat` — Doubling pattern: "data" → "datadata"

**Score (0-100) factors:**
- Length 5-10 chars scores highest
- Pronounceability via consonant-vowel ratio
- Penalty for common-word collisions
- Penalty for hyphens or numbers (these dilute brand)

---

## Reference Guides

- **`references/naming_framework.md`** — Why names matter, the elimination filter, naming-pattern playbook, common pitfalls

---

## Best Practices

- **Don't pre-commit to .com.** A `.io` or `.ai` is fine for most B2B products in 2026; `.com` matters less than it did a decade ago.
- **Say it out loud.** If you can't tell someone the domain in a noisy bar and have them spell it correctly, drop it.
- **Avoid naming-collisions.** A "DataLoop" in your space and a "DataLoop" in adjacent SaaS will cause confusion forever.
- **Don't pick the first one.** Generate 200, filter to 30, shortlist 10, sit on the shortlist for 24 hours. The one that still feels right after sleeping is the one.
- **Trademark before launching.** A great name with a trademark conflict will cost you a rebrand later.

---

## Integration Points

- Pairs with `marketing/brand-strategist/` for brand-narrative work
- Pairs with `marketing/landing-page-generator/` for messaging once a name is chosen
- Used by `c-level-advisor/` workflows during company / product launches

---

## email-triage

Source path: `references/personal-productivity/email-triage/SKILL.md`

# Email Triage

Classify a batch of email subjects + senders into action buckets and surface inbox-zero candidates.

---

## Keywords

email, inbox, inbox zero, triage, unsubscribe, mailing list, mailbox, gmail, outlook, productivity

---

## Clarify First

Before triaging, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Inbox export fields** — subject, sender, snippet drive classification accuracy; missing columns degrade the buckets
- [ ] **Priority / VIP senders** — who always routes to reply_now regardless of content
- [ ] **Unsubscribe tolerance** — purge all marketing vs keep newsletters you value; sets how aggressive the unsubscribe/delete buckets are

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## Quick Start

1. Export inbox to CSV with columns: `subject,sender,snippet,received_at`
2. Run: `python scripts/email_classifier.py inbox.csv`
3. Review action buckets; act on each in order

---

## Core Workflows

### Workflow 1: Weekly Inbox Triage
1. Export the past week's inbox
2. Run classifier
3. Action in order: reply-now → reply-later (move to follow-up folder) → archive → unsubscribe → delete
4. Apply Gmail filters (see `assets/gmail_filter_template.md`) so future similar emails route automatically

**Time Estimate:** 30-45 minutes for a busy week.

### Workflow 2: Unsubscribe Pass
1. Run classifier; review unsubscribe candidates
2. Unsubscribe in batch (most senders honor unsubscribe links within ~10 days)
3. For senders that don't honor, set Gmail filter to auto-delete

**Time Estimate:** 15 minutes per pass.

### Workflow 3: Inbox-Zero Reset
1. Apply the full inbox-zero method from `references/inbox_zero_method.md`
2. Move every email older than 30 days to archive (you'll find 1% later via search)
3. Triage the remaining recent emails using the classifier

**Time Estimate:** 1-2 hours one-time; then 20 min/week to maintain.

---

## Tools

### email_classifier.py

Classifies email rows into action buckets using rule-based pattern matching on sender domain, subject line, and snippet.

```bash
python scripts/email_classifier.py inbox.csv
python scripts/email_classifier.py inbox.csv --json
```

Action buckets:
- **reply_now** — direct addressing, time-sensitive language, named-person sender
- **reply_later** — informational threads, longer non-urgent
- **archive** — receipts, confirmations, completed transactions
- **unsubscribe** — newsletters, marketing, promotional
- **delete** — spam patterns, low-signal senders
- **review** — couldn't classify confidently

---

## Reference Guides

- **`references/inbox_zero_method.md`** — Method, daily routine, common pitfalls

---

## Templates

- **`assets/gmail_filter_template.md`** — Common Gmail filter recipes for the action buckets above

---

## Best Practices

- **The 2-minute rule:** if a reply takes < 2 minutes, do it now.
- **Don't archive instead of unsubscribing.** Recurring senders compound — kill the source.
- **Process in batches.** Constant inbox checking destroys focus more than email itself.
- **Inbox is not a to-do list.** Move action items to a real task tool.

---

## investor-update-generator

Source path: `references/personal-productivity/investor-update-generator/SKILL.md`

# Investor Update Generator

Validate a draft monthly investor update against a rubric of what makes them work — and provide a starting template if you don't have one yet.

---

## Keywords

investor update, monthly update, founder update, investor communication, fundraise, lead investor, board, KPIs, asks

---

## Clarify First

Before generating the update, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Stage & cadence** — early-stage monthly vs later-stage quarterly changes which sections the rubric expects
- [ ] **This period's metrics** — the same defined set every month; re-defining metrics signals dishonest reporting
- [ ] **Specific asks** — what you need from investors (intros, hires, advice); the highest-leverage section
- [ ] **Bad news / risks** — strong updates lead with these, so they must be surfaced, not buried

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## Quick Start

1. Draft your update as `update.md`
2. Run: `python scripts/investor_update_validator.py update.md`
3. Address any missing sections; aim for the rubric score > 80

OR start from scratch with `assets/investor_update_template.md`.

---

## Core Workflows

### Workflow 1: Monthly Update Production
1. First of month: pull metrics dashboard, last update, current asks
2. Draft against `assets/investor_update_template.md`
3. Validate: `python scripts/investor_update_validator.py update.md`
4. Send within 5 business days of month-end

**Time Estimate:** 1-2 hours/month.

### Workflow 2: Update Cadence Establishment
1. Read `references/what_makes_good_updates.md`
2. Decide cadence: monthly is standard for early-stage; quarterly for later-stage
3. Pick distribution: investors only, or extended (advisors, helpful operators)
4. Commit publicly — once you start, don't skip months

**Time Estimate:** 1 week to set up; recurring monthly thereafter.

---

## Tools

### investor_update_validator.py

Scans an update markdown file for the structural sections of a strong update and scores it.

```bash
python scripts/investor_update_validator.py update.md
python scripts/investor_update_validator.py update.md --json
```

---

## Reference Guides

- **`references/what_makes_good_updates.md`** — What separates good investor updates from bad

---

## Templates

- **`assets/investor_update_template.md`** — Monthly update template

---

## Best Practices

- **Send the bad news first.** Investors notice when they only hear the good.
- **Asks specific.** "Help with sales" is too vague; "Intros to VPs of Engineering at SaaS companies 100-1000 employees in NA" is actionable.
- **Cadence > perfection.** A consistent OK update beats a perfect annual one.
- **Same metrics every month.** Defining and re-defining metrics signals dishonest reporting.
- **One page (or one screen).** Past two screens, attention drops.

---

## invoice-organizer

Source path: `references/personal-productivity/invoice-organizer/SKILL.md`

# Invoice Organizer

Bulk-categorize a CSV of invoices or receipts, detect duplicates, and produce a tax-ready monthly summary.

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

invoice, invoices, receipt, receipts, expense, expenses, bookkeeping, accounting, tax, tax prep, categorization, vendor, reimbursement, monthly summary

---

## Clarify First

Before categorizing, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Receipt CSV fields** — date, vendor, description, amount drive categorization and duplicate detection
- [ ] **Tax bucket scheme** — US Schedule C vs UK self-employment vs generic sets which categories the summary maps to
- [ ] **Recurring-vendor rules** — known vendor→category mappings to seed `category_rules.json` and cut the uncategorized bucket

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## Quick Start

### Categorize 200 Receipts in 1 Minute

1. Export receipts from your bank or expense tool as a CSV with columns: `date,vendor,description,amount,currency`
2. Run:
   ```bash
   python scripts/invoice_categorizer.py receipts.csv
   ```
3. Review the categorized output and override anything wrong via the rules file
4. Export the monthly summary for handoff to your accountant

---

## Core Workflows

### Workflow 1: Monthly Bookkeeping

**Goal:** Convert a month of unstructured receipts into a categorized, tax-ready summary in under 10 minutes.

**Steps:**
1. Export receipts as CSV from your bank, card, or expense tool
2. Run: `python scripts/invoice_categorizer.py receipts.csv`
3. Review the **uncategorized** bucket — these need rules added or manual override
4. Add rules to `assets/category_rules.json` for any recurring vendors
5. Re-run; uncategorized count should drop each month as the rules file grows
6. Drop the monthly summary into `assets/monthly_summary_template.md`

**Expected Output:** Categorized expense list + monthly totals by category + duplicate-suspect list.

**Time Estimate:** 10 minutes/month after initial rules are seeded.

### Workflow 2: Duplicate Detection

**Goal:** Catch double-entered receipts before they reach the books.

**Steps:**
1. Run: `python scripts/invoice_categorizer.py receipts.csv --json`
2. Inspect the `duplicates_suspected` list
3. Confirm whether each is a true duplicate (same charge entered twice) or a coincidence (same amount on different days at different vendors)
4. Remove confirmed duplicates from the source CSV; re-run

**Expected Output:** Cleaned CSV with no duplicate rows.

**Time Estimate:** 2-3 minutes per month.

### Workflow 3: Vendor Spend Review

**Goal:** Find spend creep — vendors whose monthly total grew significantly without you noticing.

**Steps:**
1. Run categorizer for the last 3-6 months separately
2. Compare per-vendor totals month-over-month
3. Flag any vendor where total grew > 25% with no obvious business reason
4. Either renegotiate, switch, or accept; revisit quarterly

**Expected Output:** Vendor-spend trend list with flagged growth.

**Time Estimate:** 15 minutes per quarter.

---

## Tools

### invoice_categorizer.py

Reads a CSV of receipts/invoices and:

- **Categorizes** each row by vendor + description against rules in `assets/category_rules.json` (extensible)
- **Aggregates** totals per category and per vendor
- **Detects** likely duplicates (same vendor + amount within 3 days)
- **Flags** uncategorized items for manual review

```bash
# Human-readable summary
python scripts/invoice_categorizer.py receipts.csv

# JSON for programmatic use
python scripts/invoice_categorizer.py receipts.csv --json

# Use a custom rules file
python scripts/invoice_categorizer.py receipts.csv --rules my-rules.json
```

**Expected CSV columns:** `date, vendor, description, amount` (currency optional)
**Date formats accepted:** `YYYY-MM-DD`, `MM/DD/YYYY`, `DD/MM/YYYY`

---

## Reference Guides

- **`references/expense_categorization_guide.md`** — Standard expense categories, common tax buckets (US Schedule C, UK self-employment, generic), how to map vendors to categories

---

## Templates

- **`assets/category_rules.json`** — Default rules; extend with your recurring vendors
- **`assets/monthly_summary_template.md`** — Format for handing the monthly summary to an accountant

---

## Best Practices

- **Categorize monthly, not annually.** Annual catch-up bookkeeping always misses receipts and produces guess-categorization.
- **Grow the rules file over time.** First month: 30% uncategorized. Sixth month: < 5%. The compounding return on rule-writing is high.
- **Keep evidence.** Categorization is bookkeeping; receipts (PDFs, photos) are tax evidence. Store separately from this script's output.
- **Don't trust auto-categorization for tax filing.** Use it for prep; have a human (you or your accountant) sign off before filing.
- **Currency consistency.** If you have multi-currency receipts, convert at month-end FX rate before this script; it does not handle FX.

---

## Integration Points

- Pairs with `finance/` skills for budgeting and forecasting
- Feeds into `c-level-advisor/cs-cfo-advisor` cash-flow workflows
- Used by solo-founder persona for monthly close

---

## lead-researcher

Source path: `references/personal-productivity/lead-researcher/SKILL.md`

# Lead Researcher

Score and qualify sales leads against an Ideal Customer Profile (ICP) definition, then draft outreach hooks tied to specific ICP signals.

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

lead, leads, prospect, prospecting, sales, outbound, ICP, ideal customer profile, qualify, qualification, scoring, account list, target account, outreach, cold email, BDR, SDR, account executive

---

## Clarify First

Before scoring leads, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **ICP definition** — the must-have / nice-to-have / disqualifier attributes; this IS the scoring model
- [ ] **Lead list columns** — company, industry, size, country at minimum; missing fields mean no usable score
- [ ] **GTM motion** — PLG vs sales-led vs channel changes which signals weight highest and the outreach-hook framing

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## Quick Start

### Score a Lead List in 10 Minutes

1. Define your ICP in `icp.json` using the schema in `assets/icp_schema.json`
2. Save your lead list as a CSV with columns: `company,industry,size,country,website,signals`
3. Run the qualifier:
   ```bash
   python scripts/lead_qualifier.py icp.json leads.csv
   ```
4. Review the ranked output — top 20% is your A-tier outreach list

---

## Core Workflows

### Workflow 1: ICP-Based Lead Scoring

**Goal:** Rank a list of candidate accounts so the top of the list reflects the best fit, not the most recent import.

**Steps:**
1. Build your ICP in `icp.json` — see `assets/icp_schema.json` for the full schema
2. Capture leads in a CSV with at minimum: `company,industry,size,country`
3. Run: `python scripts/lead_qualifier.py icp.json leads.csv`
4. Sort the result by `score` (highest first); the top 20% is your A-tier
5. Discard everything below the disqualification threshold rather than mass-emailing

**Expected Output:** Ranked list with score, tier (A/B/C/disqualified), and reason per lead.

**Time Estimate:** 10-15 minutes for a list of 200 leads.

### Workflow 2: ICP Definition

**Goal:** Convert a fuzzy "we sell to ops teams at mid-market SaaS" intuition into a structured ICP that the qualifier can actually score against.

**Steps:**
1. Pull the company names of your last 20-50 best customers
2. Identify the shared signals: industry, size band, geography, tech stack, pain trigger
3. For each, decide whether it's a **must-have**, **nice-to-have**, or **disqualifier**
4. Encode in `icp.json` per `references/icp_framework.md`
5. Pressure-test by scoring last quarter's closed-won and closed-lost accounts — the model should rank the wins above the losses

**Expected Output:** A versioned `icp.json` that retroactively predicts your past wins.

**Time Estimate:** 1-2 hours for first pass, 30 minutes per quarterly refresh.

### Workflow 3: Outreach Hook Drafting

**Goal:** Write outreach where the personalization actually mentions a real signal, not a fake "I noticed you posted on LinkedIn."

**Steps:**
1. Take the qualifier output for an A-tier lead
2. Read the matched ICP signals — these are your hooks
3. Use the outreach template in `assets/outreach_template.md`
4. Personalize the opening line with the strongest signal (e.g., recent funding, hiring spike, product launch, public quote about a pain you solve)
5. Keep the rest of the email short — sub-90 words

**Expected Output:** First-touch outreach email under 90 words with a real signal-based hook.

**Time Estimate:** 5 minutes per A-tier lead.

---

## Tools

### lead_qualifier.py

Reads an ICP JSON file and a leads CSV, returns a scored & tiered list.

```bash
# Human-readable
python scripts/lead_qualifier.py icp.json leads.csv

# JSON for programmatic use
python scripts/lead_qualifier.py icp.json leads.csv --json
```

**Scoring model:**
- Each ICP attribute has a weight (default 10) and direction (must / nice / disqualify)
- Must-have hits: full weight
- Nice-to-have hits: half weight
- Disqualifier hits: lead drops out of consideration entirely
- Score is normalized to 0-100

---

## Reference Guides

- **`references/icp_framework.md`** — How to define an ICP that actually predicts deal velocity, with worked examples by GTM motion (PLG, sales-led, channel)

---

## Templates

- **`assets/icp_schema.json`** — JSON schema for an ICP definition file
- **`assets/outreach_template.md`** — Cold-touch email template with placeholder slots tied to ICP signals

---

## Best Practices

- **Disqualify hard.** Mediocre leads are worse than no leads — they consume rep time and damage sender reputation.
- **Keep ICP versioned.** When deal velocity drops, your ICP is often stale. Re-derive every quarter.
- **One signal per email.** Multi-signal openers feel like research dumps; one well-chosen signal feels human.
- **Leads are not opportunities.** A scored A-tier lead is permission to reach out, not a forecasted deal.
- **Logs over feel.** Track which signals correlate with closed-won — let data update the ICP, not vibes.

---

## Integration Points

- Pairs with `marketing/cold-email/` for sequence design
- Pairs with `sales-success/` skills for account executive handoff
- Feeds into `business-growth/` revenue forecasting

---

## meeting-insights

Source path: `references/personal-productivity/meeting-insights/SKILL.md`

# Meeting Insights

Turn raw meeting transcripts into a structured set of decisions, action items, owners, due dates, open questions, and risks.

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

meeting, meetings, transcript, notes, minutes, action items, decisions, decision log, follow-up, recap, sales call, customer interview, retrospective, standup, planning, async

---

## Clarify First

Before extracting insights, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Transcript with speaker labels** — `Speaker: text` format drives owner attribution on action items
- [ ] **Meeting type** — recap vs customer interview vs decision log changes which extractions matter (decisions/actions vs pains/quotes)
- [ ] **Output target** — recap email, append-only decision log, or interview synthesis sets the structure of the deliverable

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## Quick Start

### Process a Transcript in 5 Minutes

1. Save your transcript text as `transcript.txt` (one speaker turn per line, format `Speaker: text`)
2. Run:
   ```bash
   python scripts/transcript_analyzer.py transcript.txt
   ```
3. Review the structured output: decisions, action items, owners, due dates, open questions
4. Drop into `assets/recap_template.md` to send a follow-up

---

## Core Workflows

### Workflow 1: Post-Meeting Recap

**Goal:** Convert a 60-minute conversation into a 90-second readable summary that everyone can act on.

**Steps:**
1. Export the transcript (Otter, Fireflies, Zoom, Google Meet, etc.)
2. Run: `python scripts/transcript_analyzer.py transcript.txt`
3. Verify owners and due dates — the analyzer is heuristic; humans correct
4. Paste structured output into `assets/recap_template.md`
5. Send within 24 hours of the meeting

**Expected Output:** Recap with decisions, action items (owner + due date), open questions, and risks.

**Time Estimate:** 5-10 minutes vs. 30+ for manual note review.

### Workflow 2: Customer Interview Synthesis

**Goal:** Pull the signals out of a discovery call without losing the customer's actual words.

**Steps:**
1. Run analyzer in JSON mode: `python scripts/transcript_analyzer.py transcript.txt --json`
2. Filter for `pains` and `quotes` — these are the discovery signals
3. Use `references/insight_extraction_patterns.md` to triangulate across multiple interviews
4. Tag findings by ICP segment for product / marketing handoff

**Expected Output:** Tagged customer pain list with verbatim quotes per insight.

**Time Estimate:** 15 minutes per interview after the call.

### Workflow 3: Decision Log Maintenance

**Goal:** Build an organizational memory so the same decision is not re-litigated quarter after quarter.

**Steps:**
1. After each meeting, run the analyzer to extract decisions
2. Append to a running decision log keyed by date and topic
3. When a future meeting raises an old topic, search the log first
4. Re-open formally rather than silently overturning

**Expected Output:** Append-only decision log searchable by topic and date.

**Time Estimate:** 2-3 minutes per meeting.

---

## Tools

### transcript_analyzer.py

Reads a transcript text file and extracts:

- **Decisions** — sentences with decision markers ("we decided", "agreed", "going with")
- **Action items** — sentences with action markers ("will", "going to", "by next week"), with heuristic owner + due date
- **Open questions** — sentences ending in "?" or marked with "open question"
- **Risks** — sentences with risk markers ("risk", "concern", "blocker", "if X then Y")
- **Quotes** — distinctive verbatim sentences > 12 words (for customer interview workflows)

```bash
# Human-readable
python scripts/transcript_analyzer.py transcript.txt

# JSON for programmatic use
python scripts/transcript_analyzer.py transcript.txt --json
```

**Transcript format expected:**

```
Alice: We need to decide on the launch date this week.
Bob: I'll send the draft by Friday.
Alice: Are we blocked on legal review?
Bob: Yes, that's the risk — if legal slips, launch slips.
```

---

## Reference Guides

- **`references/insight_extraction_patterns.md`** — Heuristic triggers for decisions, actions, and risks; how to triangulate across interviews

---

## Templates

- **`assets/recap_template.md`** — Post-meeting recap email with placeholder sections

---

## Best Practices

- **Verify before sending.** The analyzer is heuristic; an unverified recap that mis-attributes an action item destroys trust.
- **Owner + date or it does not exist.** An action item without an owner is a hope; without a date, it is a wish.
- **Send within 24 hours.** Memory of who said what fades fast; recap latency directly correlates with action-item completion rate.
- **Quote verbatim.** For customer interviews, the customer's words matter more than your summary of them.
- **Decision log is append-only.** Never silently overturn — re-open with a dated update.

---

## Integration Points

- Pairs with `product-team/user-story/` for converting interview pains into stories
- Pairs with `project-management/` for action-item tracking
- Feeds into `marketing/` voice-of-customer workflows

---

## pitch-deck-reviewer

Source path: `references/personal-productivity/pitch-deck-reviewer/SKILL.md`

# Pitch Deck Reviewer

Score a pitch deck's structure against the YC / Sequoia / a16z heuristics.

> **Note:** This evaluates *structure*, not *content quality*. A perfectly-structured deck for a bad business is still a bad pitch. But a poorly-structured deck for a great business often gets passed.

---

## Keywords

pitch deck, pitch, fundraise, fundraising, seed deck, Series A deck, investor deck, slide deck, YC, Y Combinator, Sequoia, a16z

---

## Clarify First

Before scoring the deck, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Funding stage** — seed vs Series A sets the required-slide rubric (`--stage` flag) and what counts as a gap
- [ ] **Slide-by-slide summary** — one bullet per slide (number + title + 1-2 sentences); vague summaries produce false gaps
- [ ] **Round context** — amount raising and traction stage, so the "ask" and "traction" slides are judged against the right bar

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## Quick Start

1. Summarize each slide as one bullet in `deck_summary.md` (slide number + title + 1-2 sentences of content)
2. Run: `python scripts/deck_structure_scorer.py deck_summary.md`
3. Address gaps; iterate

---

## Core Workflows

### Workflow 1: Pre-Send Deck Review
1. Summarize deck slide-by-slide in `deck_summary.md`
2. Run scorer
3. Add missing slides (the scorer flags by category)
4. Re-order if structure flow is off
5. Pair with `documents/pptx-toolkit/` for actual pptx audit

**Time Estimate:** 1-2 hours per major deck iteration.

### Workflow 2: First Deck Build (No Existing Deck)
1. Read `references/pitch_deck_heuristics.md`
2. Use the structure rubric (10-15 slides covering specific topics)
3. Draft slide-by-slide
4. Validate as Workflow 1

**Time Estimate:** 1-2 weeks for first complete draft.

---

## Tools

### deck_structure_scorer.py

Reads a markdown file describing the deck slide-by-slide and scores it against required slides per stage.

```bash
python scripts/deck_structure_scorer.py deck_summary.md
python scripts/deck_structure_scorer.py deck_summary.md --json

# For Series A
python scripts/deck_structure_scorer.py deck_summary.md --stage series-a
```

Stages: `seed` (default), `series-a`.

---

## Reference Guides

- **`references/pitch_deck_heuristics.md`** — YC, Sequoia, a16z deck structure heuristics; common mistakes; stage differences

---

## Templates

- **`assets/deck_summary_template.md`** — Slide-by-slide summary template

---

## Best Practices

- **One idea per slide.** If you can't summarize it in one sentence, split it.
- **Numbers, not adjectives.** "Strong growth" is weak. "$80k → $312k MRR over 12 months" is strong.
- **Order matters.** Most decks under-invest in problem framing and the "why now" slide.
- **Don't ship 30+ slides.** A seed deck is 10-12 slides; a Series A deck is 12-15.
- **Demo is not the deck.** Decks introduce; demos persuade. Plan both.

---

## reflect

Source path: `references/personal-productivity/reflect/SKILL.md`

# Reflect

Structured reflection at daily, weekly, and quarterly cadence that ends in a
changed behaviour rather than a paragraph of feelings. The mechanism is testing
recorded beliefs against outcomes: written predictions scored for calibration,
and commitments tracked for whether they actually held.

**Boundary with `weekly-review`:** that skill runs the weekly operating cadence —
what happened, what is next, priorities and blockers. This one is the learning
layer on top: was my judgement any good across weeks and quarters, and what
should change as a result. Run them back to back, operating review first, using
its output as this skill's raw material. Do not duplicate the wins/blockers
synthesis here.

## When to use this skill

- Your reviews produce pleasant notes but nothing ever changes as a result
- You want to know whether to trust your own confidence when making a call
- Delivery dates keep slipping and you suspect the estimates, not the execution
- The same commitment has been carried for months without progress or a decision
- It is quarter end and you need to score judgement, not just report outcomes
- You are starting a prediction log and want a scoring method rather than a journal

## Inputs the skill expects

- A prediction log — `statement`, `confidence`, and `outcome` once resolved
- A commitment log — `text`, `status` (kept/missed/partial/open), optional `due` and `carried_cycles`
- The cadence you are running: daily, weekly, or quarterly
- A reference date for overdue calculations (passed explicitly — the tools never read the clock)
- Optionally a `domain` per prediction, which is where the most actionable signal appears

## Clarify First

Before generating, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Which cadence is being run** — daily, weekly, and quarterly ask genuinely different questions; the wrong set produces either triviality or an hour-long session that gets skipped
- [ ] **Whether resolved predictions exist** — below 20 resolved, calibration is too noisy to act on and the honest output is "keep logging," not a score
- [ ] **Whether a weekly operating review already runs** — determines whether this layers on top or has to carry the operating cadence too
- [ ] **Carry-count history on open commitments** — the three-cycle rule is the sharpest mechanic here and needs the count to fire

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

## Workflows

### Workflow 1 — Score prediction calibration

Quarterly. The step that converts reflection from storytelling into measurement.

1. Resolve every prediction past its date — true or false, no revising the
   original confidence.
2. Run the scorer with 5 buckets (10 buckets need roughly 50+ predictions to be
   readable).
3. Read the calibration table first: gaps above 10 points in buckets holding 5+
   predictions are real bias, not noise.
4. Read the domain breakdown — bias is rarely uniform, and the worst domain is
   usually your own delivery dates.
5. Pick exactly one correction and re-measure over a full quarter.

```bash
python3 personal-productivity/reflect/scripts/calibration_scorer.py \
  --input personal-productivity/reflect/assets/sample_predictions.json \
  --buckets 5
```

The decomposition is computed over distinct confidence values, so `--buckets`
changes only the displayed table and never the statistics. Verify the identity
`BS = REL - RES + UNC` and the other scoring invariants at any time:

```bash
python3 personal-productivity/reflect/scripts/calibration_scorer.py --selftest
```

Isolate a single domain once you know where the bias lives:

```bash
python3 personal-productivity/reflect/scripts/calibration_scorer.py \
  --input personal-productivity/reflect/assets/sample_predictions.json \
  --domain delivery --buckets 5 --format json
```

### Workflow 2 — Generate a cadence-appropriate prompt set

Weekly, or at whichever cadence you are running.

1. Update commitment statuses from the past cycle — kept, missed, partial, open.
2. Increment `carried_cycles` on anything that rolled over again.
3. Run the generator for the cadence, with today's date for overdue detection.
4. Work the core prompts, then the accountability prompts — each of those needs
   a decision, not a note.
5. Satisfy the closing requirement. If nothing changed, the session was
   journaling.

```bash
python3 personal-productivity/reflect/scripts/reflection_prompt_generator.py \
  --input personal-productivity/reflect/assets/sample_commitments.json \
  --cadence weekly --as-of 2026-07-21
```

Quarterly, where structural change is allowed — note the quarterly log carries
`carried_cycles`, which is what fires the three-cycle rule:

```bash
python3 personal-productivity/reflect/scripts/reflection_prompt_generator.py \
  --input personal-productivity/reflect/assets/sample_commitments_quarterly.json \
  --cadence quarterly --as-of 2026-07-21 --format json
```

### Workflow 3 — Run the quarterly reflection end to end

90 minutes, once a quarter. The only cadence where role, commitments, and method
are on the table.

1. Score the prediction log (20 min) — Workflow 1.
2. Read the quarter's weekly reflections in one sitting (15 min). Individually
   unremarkable; in a batch they expose patterns invisible at weekly resolution.
3. Work the quarterly prompts from `assets/quarterly-reflection-template.md` (20 min).
4. Decide (20 min): kill one commitment, change one method, and give every
   chronic commitment an explicit date/delegate/kill decision.
5. Write next quarter's predictions with confidence numbers (15 min).

```bash
python3 personal-productivity/reflect/scripts/reflection_prompt_generator.py \
  --input personal-productivity/reflect/assets/sample_commitments_quarterly.json \
  --cadence quarterly --as-of 2026-07-21
```

## Decision frameworks

### Cadence selection

| Cadence | Time | Question it answers | Skip it when |
|---|---|---|---|
| Daily | 5 min | What did today prove me wrong about? | Time is short — this is the optional layer |
| **Weekly** | 20 min | Did my commitments hold, and what pattern explains the misses? | **Never — this is the load-bearing cadence** |
| Quarterly | 90 min | Is my judgement calibrated, and what structural thing must change? | Never; it is the only place structural change happens |

**[PROVEN] Start with weekly only.** The most common failure is starting daily
because it looks smallest, missing three days, and abandoning everything. Weekly
carries most of the value and survives a missed week without collapsing.

### Reading a Brier score

| Brier | Reading |
|---|---|
| < 0.10 | Excellent — or the predictions were too easy; check the skill score |
| 0.10-0.15 | Strong |
| 0.15-0.20 | Good; typical for a practised forecaster on genuinely uncertain questions |
| 0.20-0.25 | Weak — approaching a coin flip |
| > 0.25 | Worse than always saying 50%. Your confidence is actively misleading you |

The score decomposes into **reliability** (miscalibration — lower better) and
**resolution** (discrimination — higher better). The common pattern is decent
reliability with near-zero resolution: you have learned to hedge everything to
the base rate, which is safe and useless. The reverse — sharp judgement, wrong
numbers — is more valuable, because numeric calibration is easy to correct and
directional judgement is not.

### Commitment keep rate

| Keep rate | Reading | Action |
|---|---|---|
| > 85% | Under-committing; commitments are safe rather than execution strong | Commit to something that might fail |
| 60-85% | Healthy | Continue |
| < 60% | Committing to more than you deliver | **Cut the number of commitments before trying to improve execution** |

The instinct at a low keep rate is to try harder, which reliably fails — the
cause is volume, not effort. Halve the commitments and the rate usually recovers
on its own.

### The three-cycle rule `[PROVEN]`

A commitment carried three cycles without progress is not waiting for time; it
is waiting for a decision you keep declining to make. Carrying it a fourth time
*is* the decision — to never do it — so make it explicitly: commit to a date,
delegate it, or kill it.

### Where overconfidence concentrates

| Domain | Typical bias |
|---|---|
| **Your own delivery dates** | **Strongly overconfident — the most reliable bias in professional forecasting** |
| Sales / deal closing | Overconfident; role-required optimism leaks in |
| Competitor timing | Overconfident on when, decent on what |
| Other teams' delivery | Better calibrated — no inside view to be optimistic with |
| Metrics and trends | Reasonably calibrated; anchored to observable history |
| Hiring outcomes | Often underconfident; rejection memories are salient |

If you log only one category, log your own delivery dates: largest bias, fastest
resolution cycle, most immediate payoff in planning.

## Anti-Patterns

### Reflection as Journaling
**Mistake:** Writing a thoughtful account of how the period went, feeling clarified, and changing nothing.
**Why it happens:** Writing is pleasant and feels productive; deciding is uncomfortable and can be wrong. Given a prompt with no wrong answer — "how did the week go?" — the session drifts to narration.
**Instead:** Require every session to close with a named change, phrased as a rule rather than an intention. "No meetings before 11:00 on Tuesdays and Thursdays" is testable next week; "be better about deep work" can survive years unkept. If a session produces no rule, mark it as journaling in the log — after three consecutive entries, the prompts are wrong and need replacing.

### Reflecting Against Memory Instead of Records
**Mistake:** Asking "was I right about that?" and consulting recollection for the answer.
**Why it happens:** It does not feel like a failure mode. Memory reconstructs rather than replays, and it edits the prior belief toward the known outcome — so you sincerely remember having been less surprised, and having assigned more probability to what happened, than you did.
**Instead:** Write predictions with explicit confidence numbers before outcomes are known, and treat the log as append-only. The number written in advance is the only thing later reflection cannot quietly rewrite. This is precisely why calibration scoring is the core of the practice rather than an optional extra.

### Only Predicting Safe Things
**Mistake:** Filling the prediction log with claims you are already confident about, then reading the excellent Brier score as evidence of good judgement.
**Why it happens:** A bad score feels like a grade, so the log drifts toward things that will score well. Predicting "the sun rises tomorrow" at 99% produces a superb Brier and teaches nothing.
**Instead:** Watch the skill score, which compares you against always predicting the base rate. At or below zero, your forecasts carry no information beyond knowing how often things generally go your way. Deliberately log predictions you might be wrong about — finding your errors is the log's only job, and a log with no errors in it has failed at it.

### Scoring Too Often
**Mistake:** Reviewing calibration monthly or after every significant miss, then adjusting the approach each time.
**Why it happens:** A bad outcome creates an urge to fix something immediately, and the log is right there.
**Instead:** Score quarterly. With 15-30 predictions per quarter, a month yields too few resolved items to distinguish bias from luck, and reacting to that noise produces exactly the thrashing the practice exists to eliminate. Apply one correction per quarter and hold it for a full cycle — changing several things at once means you learn nothing about which of them worked.

## Files

| File | Purpose |
|---|---|
| `scripts/calibration_scorer.py` | CLI entry point: assembles the report (Brier, Murphy decomposition, calibration table, per-domain breakdown, skill score vs base rate, worst-calls list), renders text/JSON, and runs `--selftest` asserting 12 scoring invariants |
| `scripts/calibration_core.py` | Scoring internals imported by `calibration_scorer.py`: log loading, record normalisation, Murphy decomposition (exact — grouped on distinct forecast values, independent of `--buckets`), bucketing, per-domain stats, and the significance thresholds |
| `scripts/reflection_prompt_generator.py` | Cadence-specific prompt sets with per-commitment accountability prompts, keep-rate interpretation, and a closing requirement |
| `references/calibration-and-forecasting.md` | Writing scoreable predictions, Brier and skill-score interpretation, Murphy decomposition, domain-specific bias table, correction protocols |
| `references/reflection-cadences.md` | Daily/weekly/quarterly prompt sets, the boundary with the weekly operating review, three-cycle rule, keep-rate bands, what makes reflection fail |
| `assets/prediction-log-template.md` | Prediction-log format, confidence conventions, weekly resolution ritual, quarterly scoring table |
| `assets/quarterly-reflection-template.md` | Timed 90-minute quarterly agenda with the kill list, chronic-commitment decisions, and next-quarter predictions |
| `assets/sample_predictions.json` | 30 predictions (27 resolved, 3 pending) showing realistic delivery-date overconfidence, so scoring runs out of the box |
| `assets/sample_commitments.json` | One week of commitments — 10 items spanning kept/missed/partial/open with two chronic carries, for the weekly cadence |
| `assets/sample_commitments_quarterly.json` | One quarter of commitments — 18 items with four chronic carries and three overdue, for the quarterly cadence |

---

## resume-tailor

Source path: `references/personal-productivity/resume-tailor/SKILL.md`

# Resume Tailor

Tailor a base resume to a specific job description with keyword-match scoring, gap analysis, and rewritten-bullet suggestions.

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

resume, CV, job application, ATS, applicant tracking system, keyword match, resume tailoring, cover letter, job description, hiring, recruiter, career, job search, bullet rewrite, accomplishment, impact statement

---

## Clarify First

Before tailoring the resume, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **Target job description** — the verbatim JD; it drives keyword extraction and the entire match score
- [ ] **Base resume content** — your actual experience and bullets; without it there is nothing to score or rewrite
- [ ] **Target seniority / title** — IC vs lead vs exec sets which keywords matter and the altitude of rewritten bullets
- [ ] **Truth boundary** — which listed skills you genuinely have vs. aspirational, so additions are honest rather than keyword-stuffed

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## Quick Start

### Tailor a Resume in 5 Minutes

1. Save the job description as `jd.txt`
2. Save your base resume text as `resume.txt`
3. Run the matcher:
   ```bash
   python scripts/resume_matcher.py resume.txt jd.txt
   ```
4. Review the keyword-gap report
5. Rewrite low-scoring bullets using `references/bullet_rewrite_patterns.md`
6. Cross-check the final resume against the rewritten template in `assets/tailored_resume_template.md`

---

## Core Workflows

### Workflow 1: Match Score and Keyword Gap

**Goal:** Get a quantitative score for how well the current resume matches a target job description before submitting.

**Steps:**
1. Capture the job description verbatim into `jd.txt`
2. Run: `python scripts/resume_matcher.py resume.txt jd.txt`
3. Review the score — anything below 70% means significant gaps
4. Read the missing-keywords list; classify each as (a) skills you have but did not list, (b) skills you do not have, (c) buzzwords that do not apply
5. Add (a) to the resume; ignore (c); be honest about (b)

**Expected Output:** A score, a kept-keyword list, and a missing-keyword list.

**Time Estimate:** 5-10 minutes per job description.

### Workflow 2: Bullet Rewrite for Impact

**Goal:** Convert task-oriented bullets ("responsible for…") into impact bullets that match recruiter and ATS expectations.

**Steps:**
1. Identify weak bullets — anything starting with "Responsible for" or "Helped with"
2. Apply the **CAR pattern** (Challenge, Action, Result) from `references/bullet_rewrite_patterns.md`
3. Quantify wherever possible (percentages, dollar amounts, time saved, scale)
4. Re-run the matcher to confirm score improvement

**Expected Output:** Bullet list rewritten in CAR format with metrics.

**Time Estimate:** 5 minutes per bullet.

### Workflow 3: Cover Letter Hooks

**Goal:** Pull the strongest 3-5 hooks from the resume that map directly to the top requirements in the job description.

**Steps:**
1. Run matcher in JSON mode: `python scripts/resume_matcher.py resume.txt jd.txt --json`
2. Take the top 5 matched keywords by relevance
3. For each, find the matching resume bullet
4. Use them as evidence sentences in the cover letter

**Expected Output:** 3-5 evidence sentences for the cover letter.

**Time Estimate:** 10 minutes.

---

## Tools

### resume_matcher.py

Reads a resume text file and a job description text file, returns:

- A **match score** (0-100) based on keyword overlap weighted by JD frequency
- A **kept keywords** list (in both resume and JD)
- A **missing keywords** list (in JD only)
- A **resume-only keywords** list (in resume but not JD — candidate to drop)

```bash
# Human-readable
python scripts/resume_matcher.py resume.txt jd.txt

# JSON for programmatic use
python scripts/resume_matcher.py resume.txt jd.txt --json
```

---

## Reference Guides

- **`references/bullet_rewrite_patterns.md`** — CAR pattern, action-verb library, quantification examples, weak-phrase blacklist
- **`references/ats_optimization_guide.md`** — How ATS parses resumes, formatting do's and don'ts, keyword density bounds

---

## Templates

- **`assets/tailored_resume_template.md`** — A bare resume skeleton with section ordering, length guidance, and keyword-placement notes. Fill in your content.

---

## Best Practices

- **Tailor every time.** A generic resume sent to ten roles performs worse than ten tailored versions.
- **Honesty over keyword stuffing.** Add only skills you actually have. Hiring managers can tell.
- **Keep one master resume.** Tailor variants from a single source of truth.
- **Two pages max.** Even for senior roles, two pages is the ceiling outside academia.
- **Plain text, single-column.** ATS systems still mishandle tables, graphics, and multi-column layouts.

---

## Integration Points

- Pairs with `personal-productivity/lead-researcher/` for prepping informational interviews
- Pairs with `marketing/copywriting/` for cover letter prose quality
- Used by `agents/personas/` workflows when authoring sample profiles

---

## weekly-review

Source path: `references/personal-productivity/weekly-review/SKILL.md`

# Weekly Review

Synthesize a week into a structured review covering wins, learnings, blockers, and next-week priorities.

---

## Keywords

weekly review, GTD, getting things done, OKR check-in, retrospective, weekly retro, journal, reflection, end of week, EOW

---

## Clarify First

Before synthesizing the review, confirm these inputs. If any is unknown or vague, ASK — do not assume:

- [ ] **The week's raw inputs** — actual wins, learnings, and blockers; this is the content the review synthesizes, not invented
- [ ] **OKR / goal progress** — current numbers vs target drives the check-in section and flags drift
- [ ] **Next-week priorities** — the top 1-3 commitments the review must end on

Stop rule: ask only the 2-3 that most change the output. If the user says "just draft it," proceed and list your assumptions at the top of the artifact.

---

## Quick Start

1. Fill in `assets/weekly_review_input.json` with the past week's wins, learnings, blockers, OKR progress
2. Run: `python scripts/weekly_review_synthesizer.py weekly_review_input.json`
3. Save the output as your week's review

---

## Core Workflows

### Workflow 1: Standard Friday Review (30 min)
1. Capture 3-5 wins from the past week
2. Capture 1-3 learnings (what surprised you, what you got wrong)
3. Capture top 1-3 blockers / risks for next week
4. Update OKR / goal progress
5. List top 3 priorities for next week
6. Run synthesizer

**Time Estimate:** 30-45 minutes weekly.

### Workflow 2: Bootstrap (First Time)
1. Read `references/weekly_review_methodology.md`
2. Decide cadence (Friday afternoon vs Sunday evening — both work)
3. Block 30-45 min recurring on calendar
4. Use input template; tune over 4 weeks until format works for you

**Time Estimate:** 1 hour to set up; 30-45 min weekly thereafter.

### Workflow 3: Quarterly Pattern Review
1. Save weekly reviews in a single folder
2. Quarterly: read all 12-13 weeks
3. Look for patterns: recurring blockers, energy patterns, OKR drift
4. Adjust cadence, cadence, or commitments based on patterns

**Time Estimate:** 1-2 hours quarterly.

---

## Tools

### weekly_review_synthesizer.py

Reads structured weekly input JSON and produces a markdown weekly review.

```bash
python scripts/weekly_review_synthesizer.py input.json
python scripts/weekly_review_synthesizer.py input.json --json
```

---

## Reference Guides

- **`references/weekly_review_methodology.md`** — GTD weekly review, OKR check-in patterns, common pitfalls

---

## Templates

- **`assets/weekly_review_input.json`** — Input template

---

## Best Practices

- **Block the time.** 30 min recurring; defend against rescheduling.
- **Same time each week.** Habits stick when the trigger is consistent.
- **Capture the pattern, not the noise.** Weekly review is a layer above the moment-to-moment task list.
- **OKR check-in over chase.** Weekly OKR progress is signal; quarterly is the action moment.
- **Compound across weeks.** Reviews are most useful when read in batches.
- **Don't over-format.** A messy review you actually do beats a perfect one you skip.
