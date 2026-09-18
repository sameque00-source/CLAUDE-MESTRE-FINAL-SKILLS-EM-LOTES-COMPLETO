

===== SOURCE: 02-programming/regex-and-text-processing/SKILL.md =====

[日本語版](../../ja/02-programming/regex-and-text-processing/SKILL.md)

# Regular Expressions and Text Processing

> Regular expressions are a powerful tool for text processing. This guide covers everything about regex -- from basic syntax, lookahead/lookbehind, and named captures to Unicode support and implementations across different languages.

## Target Audience

- Engineers who want to systematically learn regular expressions
- Developers looking to streamline text processing and data cleansing
- Those who want to improve their validation implementations

## Prerequisites

- Basic programming experience
- Foundational knowledge of string manipulation

## Study Guide

### 00-basics -- Regex Basics

| # | File | Content |
|---|------|---------|

### 01-advanced -- Advanced Features

| # | File | Content |
|---|------|---------|

### 02-languages -- Language-Specific Implementations

| # | File | Content |
|---|------|---------|

## Quick Reference

```
Regex Cheat Sheet:
  .       -- Any single character
  \d \w \s -- Digit / word character / whitespace
  [abc]   -- Character class
  ^  $    -- Start / end of line
  *  +  ? -- 0 or more / 1 or more / 0 or 1
  {n,m}   -- Between n and m times
  (...)   -- Capture group
  (?:...) -- Non-capturing group
  (?=...) -- Lookahead
  (?<=..) -- Lookbehind
  \1      -- Backreference
```

## References

1. Friedl, J. "Mastering Regular Expressions." O'Reilly, 2006.
2. regular-expressions.info -- Comprehensive reference
3. regex101.com -- Online tester



===== SOURCE: 02-programming/regex-and-text-processing/docs/00-basics/00-regex-overview.md =====

# Regular Expression Overview

> A systematic guide to the historical background of Regular Expressions, their major use cases, and the internal workings of NFA/DFA engines.

## What You Will Learn in This Chapter

1. **Mathematical Origins and Historical Evolution of Regular Expressions** -- From Kleene's regular sets to PCRE
2. **The Two Major Regular Expression Engine Types (NFA/DFA)** -- Operating principles, performance characteristics, and selection criteria
3. **Application Domains and Limitations of Regular Expressions** -- From text search to compilers: when to use and when to avoid
4. **Implementation Comparison Across Major Engines** -- Engine characteristics and selection guidelines for each programming language
5. **Debugging and Testing Strategies for Regular Expressions** -- Efficient pattern development methods


## Prerequisites

Before reading this guide, having the following knowledge will deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts

---

## 1. What Are Regular Expressions?

Regular expressions are a formal language for **pattern matching**. They express sets of strings using finite notation and are used for searching, replacing, extracting, and validating.

```
Pattern: \d{3}-\d{4}
Target string: "The postal code is 100-0001"
Match result: "100-0001"
```

### 1.1 Basic Operating Model

```
Input string ──→ [Regex Engine] ──→ Match result
                    ↑
               Pattern (Regular Expression)
```

The regex engine internally converts the given pattern into an automaton (finite state machine) and processes the input string character by character to perform matching.

### 1.2 Components of Regular Expressions

Regular expression patterns are composed of the following basic elements:

```
Components of Regular Expressions:

1. Literal characters    -- 'a', 'b', '1', etc., match the character directly
2. Metacharacters        -- '.', '*', '+', '?', '|', etc., have special meaning
3. Character classes     -- [abc], [a-z], \d, \w, etc., represent sets of characters
4. Quantifiers           -- {n}, {n,m}, *, +, ?, etc., specify repetition
5. Anchors               -- ^, $, \b, etc., specify positions
6. Grouping              -- (), (?:), (?=), etc., group sub-patterns together
7. Escaping              -- \., \\, \n, etc., disable metacharacters or represent special characters
```

### 1.3 Overall Flow of Regular Expression Processing

```
                 Regex Pattern
                       │
                       ▼
               ┌──────────────┐
               │  Lexical      │  Decompose pattern string into a token sequence
               │  Analysis     │
               └──────┬───────┘
                       │
                       ▼
               ┌──────────────┐
               │  Syntax       │  Convert token sequence into an Abstract Syntax Tree (AST)
               │  Analysis     │
               └──────┬───────┘
                       │
                       ▼
               ┌──────────────┐
               │  Automaton    │  Build NFA/DFA from AST
               │  Construction │
               └──────┬───────┘
                       │
                       ▼
               ┌──────────────┐
               │  Matching     │  Execute automaton against the input string
               │  Execution    │
               └──────┬───────┘
                       │
                       ▼
                 Match Result
```

### 1.4 Types of Regular Expression Notation

```
Major notation systems:

1. POSIX BRE (Basic Regular Expression)
   - Metacharacters require \: \(, \), \{, \}, \+, \?
   - Example: grep 'a\(b\|c\)d' file.txt

2. POSIX ERE (Extended Regular Expression)
   - Metacharacters used directly: (, ), {, }, +, ?
   - Example: grep -E 'a(b|c)d' file.txt

3. PCRE (Perl Compatible Regular Expressions)
   - Extensions to ERE: lookahead/lookbehind, non-greedy quantifiers, named captures
   - Example: grep -P '(?<=prefix)\w+' file.txt

4. ECMAScript (JavaScript)
   - Subset of PCRE + proprietary extensions (u flag, s flag, etc.)
   - Example: /pattern/gimsuvy

5. RE2 Syntax
   - PCRE minus features requiring backtracking
   - Example: no backreferences, no lookahead/lookbehind
```

Since these notation systems are often incompatible, it is important to understand the regex dialect of the tool or programming language you are using.

### 1.5 How to Read Regular Expression Patterns

Here is the procedure for reading complex regular expressions:

```python
# Example: Simple email address pattern
pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

# Breaking it down:
# ^                    -- Start of string
# [a-zA-Z0-9._%+-]+   -- Local part (one or more alphanumeric characters and symbols)
# @                    -- Literal '@'
# [a-zA-Z0-9.-]+      -- Domain name (one or more alphanumeric characters, hyphens, and dots)
# \.                   -- Literal '.'
# [a-zA-Z]{2,}        -- TLD (two or more alphabetic characters)
# $                    -- End of string
```

```python
# Example: Japanese phone number pattern
pattern = r'^0\d{1,4}-\d{1,4}-\d{4}$'

# Breaking it down:
# ^           -- Start of string
# 0           -- Literal '0' (beginning of area code)
# \d{1,4}     -- 1 to 4 digits
# -           -- Literal '-'
# \d{1,4}     -- 1 to 4 digits (local exchange number)
# -           -- Literal '-'
# \d{4}       -- 4 digits (subscriber number)
# $           -- End of string
```

---

## 2. Historical Evolution

### 2.1 Timeline

```
1943  McCulloch & Pitts  ─ Mathematical model of neural networks
  │
1956  Stephen Kleene     ─ Formalization of Regular Sets theory
  │
1959  Michael Rabin &    ─ Formalization of Nondeterministic Finite Automata (NFA)
      Dana Scott           Turing Award recipients (1976)
  │
1968  Ken Thompson       ─ Implemented regex in QED/ed editors
  │                        Directly simulated NFA on IBM 7094
  │
1973  Thompson & Ritchie ─ Birth of grep (Unix V4)
  │                        "Global Regular Expression Print"
  │
1975  Alfred Aho         ─ Development of egrep (DFA-based)
  │                        Author of "Compilers: Principles, Techniques, and Tools"
  │
1979  AT&T Unix V7       ─ Introduction of awk (Aho, Weinberger, Kernighan)
  │                        Integrated regex into a programming language
  │
1986  Henry Spencer      ─ First free regex library
  │                        Became the foundation for many UNIX tools
  │
1986  POSIX Standardization ─ Standardized BRE/ERE as IEEE Std 1003.2
  │
1987  Larry Wall         ─ Shipped advanced regex in Perl 1.0
  │                        Introduced backreferences, lookahead, etc.
  │
1994  Perl 5.0           ─ Major regex extensions
  │                        Non-greedy quantifiers, lookahead/lookbehind
  │
1997  Philip Hazel       ─ PCRE (Perl Compatible Regular Expressions)
  │                        Made Perl's regex available as an independent library
  │
2002  .NET Framework     ─ Introduced balancing groups
  │                        Enabled limited matching of nested structures
  │
2006  Russ Cox           ─ RE2 (linear-time guaranteed engine)
  │                        Developed at Google, eliminates ReDoS by design
  │
2012  Rust regex crate   ─ Rust implementation inheriting RE2's philosophy
  │                        Combines safety and performance
  │
2017  ECMAScript 2018    ─ Standardized named captures and lookbehind
  │                        Added s flag (dotAll)
  │
2022  PCRE2 10.40+       ─ Improved JIT compilation
  │                        Significant performance improvements
  │
2024  ECMAScript 2024    ─ Added v flag (Unicode Sets)
                           Supports set operations in character classes
```

### 2.2 Major Milestones

| Year | Person/Project | Contribution |
|------|----------------|--------------|
| 1956 | Stephen Kleene | Mathematically formalized the concept of "regular expression" |
| 1959 | Rabin & Scott | Proved the equivalence of NFA/DFA (Turing Award) |
| 1968 | Ken Thompson | Implemented the first practical regex engine in the QED editor |
| 1973 | grep (Unix) | `g/re/p` -- Global Regular Expression Print |
| 1975 | egrep (Unix) | DFA-based high-speed regex matching |
| 1979 | awk | Integrated regex into a text processing language |
| 1986 | POSIX | Standardized BRE/ERE (Basic/Extended Regular Expressions) |
| 1987 | Perl | Added backreferences, lookahead, etc.; became the de facto standard |
| 1994 | Perl 5 | Non-greedy quantifiers, regex within code blocks |
| 1997 | PCRE | Provided a Perl-compatible engine as an independent library |
| 2002 | .NET | Addressed nested structures with balancing groups |
| 2006 | RE2 (Google) | DFA-based, eliminates ReDoS by design |
| 2017 | ES2018 | Added lookbehind and named captures to JavaScript |

### 2.3 Mathematical Foundations of Regular Expression Theory

Regular expression theory is closely tied to automaton theory, a fundamental area of computer science:

```
Kleene's Theorem (1956):

"Regular languages," "languages describable by regular expressions," and
"languages accepted by finite automata" are all equivalent.

That is:
  Regular expressions ⟺ NFA ⟺ DFA

Conversion directions:
  Regular expression → NFA  : Thompson's construction
  NFA → DFA                : Subset construction
  DFA → Regular expression : State elimination
  DFA → Minimal DFA        : Hopcroft's algorithm
```

```python
# Conceptual implementation of Thompson's construction
# NFA construction corresponding to basic regex operations

class NFAState:
    """State in an NFA"""
    def __init__(self):
        self.transitions = {}  # character -> [next states]
        self.epsilon = []      # epsilon transition targets
        self.is_accept = False

class NFAFragment:
    """Fragment of an NFA (partial NFA under construction)"""
    def __init__(self, start, accept):
        self.start = start
        self.accept = accept

def literal(char):
    """NFA for a literal character 'a'"""
    start = NFAState()
    accept = NFAState()
    accept.is_accept = True
    start.transitions[char] = [accept]
    return NFAFragment(start, accept)

def concatenation(frag1, frag2):
    """NFA for concatenation ab"""
    frag1.accept.is_accept = False
    frag1.accept.epsilon.append(frag2.start)
    return NFAFragment(frag1.start, frag2.accept)

def alternation(frag1, frag2):
    """NFA for alternation a|b"""
    start = NFAState()
    accept = NFAState()
    accept.is_accept = True
    start.epsilon.extend([frag1.start, frag2.start])
    frag1.accept.is_accept = False
    frag2.accept.is_accept = False
    frag1.accept.epsilon.append(accept)
    frag2.accept.epsilon.append(accept)
    return NFAFragment(start, accept)

def kleene_star(frag):
    """NFA for Kleene closure a*"""
    start = NFAState()
    accept = NFAState()
    accept.is_accept = True
    start.epsilon.extend([frag.start, accept])
    frag.accept.is_accept = False
    frag.accept.epsilon.extend([frag.start, accept])
    return NFAFragment(start, accept)
```

### 2.4 POSIX Standards and Dialect Divergence

```
The two POSIX regex standards:

┌─────────────────────────────────────────────────────────────┐
│  BRE (Basic Regular Expression)                             │
│                                                             │
│  Characteristics:                                           │
│  - Grouping as metacharacters: \( and \)                    │
│  - Alternation as metacharacter: not supported              │
│    (some implementations support \|)                        │
│  - Quantifiers as metacharacters: \{ and \}                 │
│  - +, ? are literal characters                              │
│    (some implementations support \+, \?)                    │
│                                                             │
│  Used by: grep (default), sed (default)                     │
│                                                             │
│  Example: grep 'a\{2,3\}' file.txt                         │
│      → Matches 'aa' or 'aaa'                                │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ERE (Extended Regular Expression)                          │
│                                                             │
│  Characteristics:                                           │
│  - Grouping: ( and )                                        │
│  - Alternation: |                                           │
│  - Quantifiers: { and }                                     │
│  - +, ? are metacharacters                                  │
│                                                             │
│  Used by: grep -E (egrep), sed -E, awk                      │
│                                                             │
│  Example: grep -E 'a{2,3}' file.txt                        │
│      → Matches 'aa' or 'aaa'                                │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Types of Regular Expression Engines

### 3.1 NFA vs DFA -- The Two Major Approaches

```
┌──────────────────────────────────────────────────────┐
│            Regular Expression Engines                  │
├─────────────────────┬────────────────────────────────┤
│   NFA (Nondeterministic) │    DFA (Deterministic)     │
│                     │                                │
│ - Backtracking-based │ - State transition table-based │
│ - Pattern-driven     │ - Text-driven                  │
│ - Supports backreferences │ - No backreference support│
│ - Worst case O(2^n)  │ - Always O(n)                 │
│                     │                                │
│ e.g.: Perl, Python, │ e.g.: awk, grep (some),       │
│     Java, .NET,     │     RE2, Rust regex            │
│     JavaScript      │                                │
└─────────────────────┴────────────────────────────────┘
```

### 3.2 NFA Operation Example

Matching the string `"acd"` against the pattern `a(b|c)d`:

```python
# NFA (Nondeterministic Finite Automaton) operation simulation
import re

pattern = r'a(b|c)d'
text = "acd"

# Internal operation:
# 1. State S0: read 'a' → match → transition to S1
# 2. State S1: read 'c' → try 'b' → fail
#                        → backtrack and try 'c' → match → transition to S2
# 3. State S2: read 'd' → match → accept state

result = re.match(pattern, text)
print(result.group())   # => "acd"
print(result.group(1))  # => "c"
```

### 3.3 DFA Operation Example

```python
# DFA (Deterministic Finite Automaton) expands all states in advance
# Pattern: a(b|c)d

# State transition table:
# Current State | Input 'a' | Input 'b' | Input 'c' | Input 'd'
# --------------|-----------|-----------|-----------|----------
# S0            | S1        | -         | -         | -
# S1            | -         | S2        | S2        | -
# S2            | -         | -         | -         | S3 (accept)

# DFA does not produce backtracking
# Only one state transition per character → O(n)

# Rust's regex crate is DFA-based
# RE2 is also DFA-based
```

### 3.4 Comparison Table: NFA vs DFA

| Property | NFA | DFA |
|----------|-----|-----|
| Time complexity (worst case) | O(2^n) -- exponential | O(n) -- linear |
| Time complexity (average) | O(n) -- practically fast | O(n) -- always linear |
| Space complexity | O(m) pattern size | O(2^m) worst case (state explosion) |
| Backreferences | Supported | Not supported |
| Lookahead/lookbehind | Supported | Limited/not supported |
| Lazy quantifiers | Supported | N/A (leftmost longest match) |
| ReDoS vulnerability | Yes | No |
| Implementation complexity | Relatively simple | Complex state table construction |
| Compile time | Short | Long (state expansion) |
| First match | Fast (left to right) | Varies by pattern |
| Representative implementations | Perl, Python, Java, JS | RE2, Rust regex, awk |

### 3.5 NFA Backtracking in Detail

```
Pattern: a.*b
Text: "axyzb123"

Step 1: 'a' → match
Step 2: '.*' → greedily consumes all characters "xyzb123"
Step 3: 'b' → match failure (end of string)
Step 4: backtrack → '.*' gives back to "xyzb12"
Step 5: 'b' → no match with '3'
Step 6: backtrack → '.*' gives back to "xyzb1"
Step 7: 'b' → no match with '2'
Step 8: backtrack → '.*' gives back to "xyzb"
Step 9: 'b' → no match with '1'
Step 10: backtrack → '.*' gives back to "xyz"
Step 11: 'b' → matches 'b'!

Result: "axyzb"
Backtrack count: 4 times

* Non-greedy version a.*?b:
Step 1: 'a' → match
Step 2: '.*?' → consumes minimum of 0 characters
Step 3: 'b' → no match with 'x'
Step 4: '.*?' → consumes 1 character "x"
Step 5: 'b' → no match with 'y'
Step 6: '.*?' → consumes 2 characters "xy"
Step 7: 'b' → no match with 'z'
Step 8: '.*?' → consumes 3 characters "xyz"
Step 9: 'b' → matches 'b'!

Result: "axyzb" (same result but different path taken)
```

### 3.6 Hybrid Approach

```
┌─────────────────────────────────────────┐
│           Hybrid Engine                  │
│                                         │
│  Pattern Analysis                        │
│      │                                   │
│      ├── No backreferences → Execute     │
│      │   with DFA                        │
│      │                                   │
│      └── Has backreferences → Fall back  │
│          to NFA                          │
│                                         │
│  Examples: .NET, Rust's fancy-regex      │
└─────────────────────────────────────────┘
```

### 3.7 Regex Engine List by Language

| Language/Tool | Engine Type | Library | Notes |
|--------------|-------------|---------|-------|
| Python | NFA | `re` (C implementation) | Extensible via `regex` module |
| JavaScript | NFA | V8 Irregexp | JIT-optimized |
| Java | NFA | `java.util.regex` | No atomic groups (partial support in Java 9+) |
| C# (.NET) | NFA | `System.Text.RegularExpressions` | Balancing groups supported |
| Perl | NFA | Built-in | Most feature-rich NFA implementation |
| Ruby | NFA | Onigmo | Comprehensive Unicode support |
| Go | DFA | `regexp` (RE2-based) | No backreference support |
| Rust | DFA | `regex` crate | Linear-time guarantee |
| PHP | NFA | PCRE2 | `preg_*` function family |
| C/C++ | Both | PCRE2, RE2, std::regex | Selectable |
| awk | DFA | Built-in | ERE-compliant |
| grep | Both | GNU grep | `-G` BRE, `-E` ERE, `-P` PCRE |
| sed | NFA | Built-in | BRE (default), ERE (`-E`) |

### 3.8 Engine Selection Flowchart

```
Does the pattern contain backreferences?
    │
    ├── Yes → Use an NFA engine
    │          │
    │          ├── Is the input untrusted?
    │          │   │
    │          │   ├── Yes → Timeout setting is mandatory
    │          │   │          (.NET: MatchTimeout,
    │          │   │           Java: interrupt,
    │          │   │           Python: signal.alarm)
    │          │   │
    │          │   └── No → Use NFA as-is
    │          │
    │          └── Is performance an issue?
    │              │
    │              ├── Yes → Consider rewriting the pattern
    │              │          (atomic groups, possessive quantifiers)
    │              │
    │              └── No → Use as-is
    │
    └── No → Is a DFA engine available?
                │
                ├── Yes → Use DFA (RE2, Rust regex, Go regexp)
                │          Linear-time guarantee for safety
                │
                └── No → NFA is fine
                             (avoid ReDoS patterns)
```

---

## 4. Major Use Cases for Regular Expressions

### 4.1 Code Examples by Use Case

```bash
# 1. Text search (grep)
grep -E 'ERROR|WARN' /var/log/syslog

# 2. Text replacement (sed)
sed 's/2025/2026/g' document.txt

# 3. Data extraction (Python)
python3 -c "
import re
log = '2026-02-11 10:30:45 [ERROR] Connection timeout (192.168.1.1)'
m = re.search(r'(\d{4}-\d{2}-\d{2}) .* \[(\w+)\] (.+)', log)
print(f'Date: {m.group(1)}, Level: {m.group(2)}, Message: {m.group(3)}')
"

# 4. Input validation (JavaScript)
node -e "
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
console.log(emailPattern.test('user@example.com'));  // true
console.log(emailPattern.test('invalid@'));           // false
"

# 5. Syntax highlighting -- How editors colorize keywords
# Pattern example: \b(if|else|for|while|return)\b → colored as keywords

# 6. Filename matching (find + grep)
find /var/log -name "*.log" -exec grep -l 'CRITICAL' {} \;

# 7. CSV data transformation (awk)
awk -F',' '/^2026/ {print $1, $3}' data.csv

# 8. Extract TODO comments from code
grep -rn 'TODO\|FIXME\|HACK\|XXX' --include='*.py' src/
```

### 4.2 Practical Log Analysis Example

```python
import re
from collections import Counter, defaultdict
from datetime import datetime

# Apache access log analysis
log_pattern = re.compile(
    r'(?P<ip>\d+\.\d+\.\d+\.\d+)'       # IP address
    r' - - '
    r'\[(?P<timestamp>[^\]]+)\]'           # Timestamp
    r' "(?P<method>\w+)'                   # HTTP method
    r' (?P<path>[^\s]+)'                   # Request path
    r' HTTP/[\d.]+"'                       # HTTP version
    r' (?P<status>\d{3})'                  # Status code
    r' (?P<size>\d+|-)'                    # Response size
    r'(?: "(?P<referer>[^"]*)")?'          # Referer (optional)
    r'(?: "(?P<useragent>[^"]*)")?'        # User agent (optional)
)

def analyze_access_log(log_file: str):
    """Analyze access log and output statistical information"""
    status_counter = Counter()
    path_counter = Counter()
    ip_counter = Counter()
    hourly_access = defaultdict(int)
    error_logs = []

    with open(log_file) as f:
        for line in f:
            m = log_pattern.match(line)
            if not m:
                continue

            data = m.groupdict()
            status = int(data['status'])
            path = data['path']
            ip = data['ip']

            status_counter[status] += 1
            path_counter[path] += 1
            ip_counter[ip] += 1

            # Hourly aggregation
            try:
                dt = datetime.strptime(
                    data['timestamp'],
                    '%d/%b/%Y:%H:%M:%S %z'
                )
                hourly_access[dt.hour] += 1
            except ValueError:
                pass

            # Collect error logs
            if status >= 400:
                error_logs.append({
                    'ip': ip,
                    'path': path,
                    'status': status,
                    'timestamp': data['timestamp']
                })

    return {
        'total_requests': sum(status_counter.values()),
        'status_distribution': dict(status_counter),
        'top_paths': path_counter.most_common(10),
        'top_ips': ip_counter.most_common(10),
        'hourly_distribution': dict(hourly_access),
        'error_count': len(error_logs),
        'recent_errors': error_logs[-10:]
    }
```

### 4.3 Practical Data Cleansing Example

```python
import re

def clean_text(text: str) -> str:
    """Text data cleansing"""
    # Normalize consecutive whitespace to a single space
    text = re.sub(r'\s+', ' ', text)

    # Convert full-width alphanumeric characters to half-width
    text = re.sub(r'[Ａ-Ｚａ-ｚ０-９]',
                  lambda m: chr(ord(m.group()) - 0xFEE0), text)

    # Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)

    # Remove control characters (preserve newlines and tabs)
    text = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]', '', text)

    # Strip leading and trailing whitespace
    text = text.strip()

    return text

def normalize_phone_number(phone: str) -> str:
    """Phone number normalization"""
    # Remove non-digit characters
    digits = re.sub(r'\D', '', phone)

    # Handle international phone numbers
    if digits.startswith('81') and len(digits) >= 11:
        digits = '0' + digits[2:]

    # Format (landline)
    if len(digits) == 10:
        m = re.match(r'(\d{2,4})(\d{2,4})(\d{4})', digits)
        if m:
            return f'{m.group(1)}-{m.group(2)}-{m.group(3)}'

    # Format (mobile)
    if len(digits) == 11:
        m = re.match(r'(\d{3})(\d{4})(\d{4})', digits)
        if m:
            return f'{m.group(1)}-{m.group(2)}-{m.group(3)}'

    return phone  # Return as-is if conversion is not possible

def extract_urls(text: str) -> list:
    """Extract URLs from text"""
    url_pattern = re.compile(
        r'https?://'                    # Scheme
        r'(?:[a-zA-Z0-9]'              # First character of domain
        r'(?:[a-zA-Z0-9-]{0,61}'       # Domain name body
        r'[a-zA-Z0-9])?\.)'            # End of domain
        r'+[a-zA-Z]{2,}'               # TLD
        r'(?::\d{1,5})?'               # Port (optional)
        r'(?:/[^\s]*)?'                # Path (optional)
    )
    return url_pattern.findall(text)

def mask_personal_info(text: str) -> str:
    """Mask personal information"""
    # Email addresses
    text = re.sub(
        r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}',
        '***@***.***',
        text
    )

    # Phone numbers (Japan)
    text = re.sub(
        r'0\d{1,4}[-\s]?\d{1,4}[-\s]?\d{4}',
        '***-****-****',
        text
    )

    # Credit card numbers
    text = re.sub(
        r'\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b',
        '****-****-****-****',
        text
    )

    # My Number (Japanese 12-digit identification number)
    text = re.sub(
        r'\b\d{4}[-\s]?\d{4}[-\s]?\d{4}\b',
        '****-****-****',
        text
    )

    return text
```

### 4.4 Application Domain Map

| Domain | Typical Usage | Recommendation | Notes |
|--------|--------------|----------------|-------|
| Log analysis | Error pattern extraction, aggregation | Optimal | Especially effective for structured logs |
| Input validation | Email, phone numbers, postal codes | Suitable | Don't over-rely; two-stage verification recommended |
| Text editors | Search and replace | Optimal | Essential for bulk replacement in IDEs |
| Web scraping | Information extraction from HTML | Caution | HTML parser recommended; regex as supplementary |
| Compilers/lexical analysis | Token splitting | Suitable | Used with lexer generators |
| Natural language processing | Preprocessing for morphological analysis | Limited | Combine with dedicated libraries |
| Data migration | Format conversion | Suitable | CSV, TSV column operations, etc. |
| Security | WAF rule definitions | Caution | Must consider ReDoS risk |
| Binary analysis | Pattern detection | Unsuitable | Use dedicated binary tools |
| Configuration files | Template expansion | Limited | Dedicated template engines recommended |

### 4.5 Regular Expressions in Text Processing Pipelines

```bash
# Regex usage in Unix pipelines

# Example 1: Aggregate IP addresses from error responses in access logs
cat access.log \
  | grep -E '" [45]\d{2} ' \
  | awk '{print $1}' \
  | sort | uniq -c | sort -rn \
  | head -20

# Example 2: Extract function definitions from source code
grep -rn 'def \w\+(' --include='*.py' src/ \
  | sed 's/.*def \(\w\+\)(.*/\1/' \
  | sort | uniq -c | sort -rn

# Example 3: Extract error messages from JSON logs
cat app.log \
  | grep -oP '"error":\s*"[^"]*"' \
  | sed 's/"error":\s*"\(.*\)"/\1/' \
  | sort | uniq -c | sort -rn

# Example 4: Extract ticket numbers from Git log
git log --oneline \
  | grep -oE '[A-Z]+-[0-9]+' \
  | sort | uniq -c | sort -rn
```

---

## 5. Limitations of Regular Expressions

### 5.1 What Regular Expressions Cannot Express

```
Chomsky Hierarchy:
┌─────────────────────────────────────┐
│ Type 0: Recursively Enumerable     │
│  ┌──────────────────────────────┐   │
│  │ Type 1: Context-Sensitive    │   │
│  │  ┌───────────────────────┐   │   │
│  │  │ Type 2: Context-Free  │   │   │
│  │  │  ┌────────────────┐   │   │   │
│  │  │  │ Type 3: Regular │   │   │   │
│  │  │  │ (Regex)         │   │   │   │
│  │  │  └────────────────┘   │   │   │
│  │  │  e.g.: HTML, JSON,    │   │   │
│  │  │  programming languages│   │   │
│  │  └───────────────────────┘   │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘

Regular expressions (Type 3) cannot count
matching pairs of nested parentheses.
Examples: ((())), {{{}}}, <div><div></div></div>
```

### 5.2 Concrete Examples of Theoretical Limitations

```python
# Patterns that regular expressions fundamentally cannot handle

# 1. Matching nested parentheses
#    a^n b^n (n 'a's followed by n 'b's) is not a regular language
#    Example: ab, aabb, aaabbb are accepted; aab, abbb are rejected
#    → Cannot be expressed with regular expressions

# 2. Palindrome recognition
#    Example: "abcba", "racecar"
#    → Cannot be expressed with regular expressions

# 3. Strings of prime length
#    Match only strings whose length is a prime number
#    → Cannot be expressed with regular expressions

# However, practical "regular expressions" (PCRE, etc.)
# have features that exceed theoretical regular languages:

import re

# .NET's balancing groups can match nested parentheses
# (theoretically in the domain of CFGs)
# (?<open>\()  (?<close-open>\))

# Perl/PCRE recursive patterns can also do this
# \((?:[^()]*|(?R))*\)
```

### 5.3 Practical Limitations

```python
# Cases where regular expressions are not suitable

# 1. Parsing complex grammars
# BAD: Parsing JSON with regex
json_text = '{"name": "John", "address": {"city": "Tokyo"}}'
# → Use a JSON parser instead

# 2. Advanced multibyte character processing
# BAD: Guessing kanji readings with regex
# → Use a morphological analyzer (MeCab, Janome, etc.) instead

# 3. Context-dependent parsing
# BAD: Python's indent-based block structure
# → Use a parser (AST) instead

# 4. Structural analysis of large-scale text
# BAD: Processing hundreds of MB of XML files with regex
# → Use streaming processing with a SAX parser, etc.

# 5. Semantic analysis of natural language
# BAD: Extracting subject and predicate from sentences with regex
# → Use NLP libraries (spaCy, GiNZA, etc.) instead
```

---

## 6. Anti-patterns

### 6.1 Anti-pattern: Parsing HTML with Regular Expressions

```python
# BAD: Attempting to process HTML with regular expressions
import re

html = '<div class="outer"><div class="inner">text</div></div>'

# This pattern cannot correctly handle nested divs
pattern = r'<div[^>]*>(.*?)</div>'
result = re.findall(pattern, html)
print(result)  # => ['<div class="inner">text']  -- inaccurate

# GOOD: Use an HTML parser
from html.parser import HTMLParser
# Or use Beautiful Soup, lxml, etc.
```

**Reason**: HTML is a context-free language, which exceeds the expressive power of regular expressions (regular languages). It cannot correctly track the correspondence of nested elements.

### 6.2 Anti-pattern: All-encompassing Validation Patterns

```python
# BAD: RFC 5322 fully compliant email address pattern (this actually exists)
# A regex spanning thousands of characters → unmaintainable, undebuggable

email_pattern_bad = r"""(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@..."""
# (truncated -- actually hundreds of characters or more)

# GOOD: Practical validation + confirmation email
import re

def validate_email(email: str) -> bool:
    """Practical email validation -- format check + confirmation email"""
    # Check basic format only
    if not re.match(r'^[^@\s]+@[^@\s]+\.[^@\s]+$', email):
        return False
    # The real validation is done by sending a confirmation email
    return True
```

**Reason**: Combining a simple pattern with a separate validation method is more maintainable and reliable than trying to write a perfect regex.

### 6.3 Anti-pattern: ReDoS-Vulnerable Patterns

```python
# BAD: Patterns that cause Catastrophic Backtracking
import re
import time

# Examples of dangerous patterns
dangerous_patterns = [
    r'(a+)+$',           # Nested quantifiers
    r'(a|a)+$',          # Overlapping alternatives
    r'(a+b?)+$',         # Combinatorial explosion
    r'([a-zA-Z]+)*$',    # Nested quantifiers (character class version)
]

# Attack string: many 'a's followed by a non-matching character
evil_input = 'a' * 30 + '!'

for pattern in dangerous_patterns:
    start = time.time()
    try:
        re.match(pattern, evil_input)
    except Exception:
        pass
    elapsed = time.time() - start
    print(f'Pattern: {pattern:30s} Time: {elapsed:.3f}s')
    # Some patterns may take seconds to tens of seconds

# GOOD: Writing ReDoS-resistant patterns
safe_patterns = [
    r'a+$',              # Avoid nesting
    r'(?:a+)+$',         # Non-capturing is equally dangerous → rewrite to a+$
    r'[a-zA-Z]+$',       # Avoid nesting
]

# GOOD: Matching with timeout (Python 3.11+)
# import signal
# signal.alarm(1)  # 1-second timeout
```

### 6.4 Anti-pattern: Low-Readability Patterns

```python
# BAD: A long pattern crammed into a single line
pattern_bad = r'^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'

# GOOD: Using verbose mode for readability
import re

pattern_good = re.compile(r'''
    ^
    (?:
        (?:
            25[0-5]           # 250-255
            | 2[0-4][0-9]     # 200-249
            | [01]?[0-9][0-9]? # 0-199
        )
        \.                     # Dot separator
    ){3}                       # First three octets
    (?:
        25[0-5]               # 250-255
        | 2[0-4][0-9]         # 200-249
        | [01]?[0-9][0-9]?    # 0-199
    )
    $
''', re.VERBOSE)

# Tests
assert pattern_good.match('192.168.1.1')
assert pattern_good.match('255.255.255.255')
assert not pattern_good.match('256.1.1.1')
assert not pattern_good.match('1.2.3.4.5')
```

### 6.5 Anti-pattern: Compilation Without Performance Consideration

```python
import re

# BAD: Compiling on every iteration in a loop
def search_bad(lines, pattern_str):
    results = []
    for line in lines:
        if re.search(pattern_str, line):  # Compiles every time
            results.append(line)
    return results

# GOOD: Pre-compile the pattern
def search_good(lines, pattern_str):
    pattern = re.compile(pattern_str)  # Compile only once
    results = []
    for line in lines:
        if pattern.search(line):       # Reuse compiled object
            results.append(line)
    return results

# GOOD: An even better approach (list comprehension)
def search_best(lines, pattern_str):
    pattern = re.compile(pattern_str)
    return [line for line in lines if pattern.search(line)]

# Note: Python's re module has an internal pattern cache (up to 512 entries),
#    so re.search() is fine for a small number of patterns,
#    but explicit compilation is recommended
```

---

## 7. Debugging and Testing Regular Expressions

### 7.1 Incremental Pattern Construction

```python
import re

# Build complex patterns incrementally

# Goal: Pattern for analyzing Apache logs
# Sample: 192.168.1.1 - - [10/Feb/2026:13:55:36 +0900] "GET /index.html HTTP/1.1" 200 2326

# Step 1: IP address portion
step1 = r'\d+\.\d+\.\d+\.\d+'
assert re.search(step1, '192.168.1.1')

# Step 2: Timestamp portion
step2 = r'\[([^\]]+)\]'
assert re.search(step2, '[10/Feb/2026:13:55:36 +0900]')

# Step 3: Request line
step3 = r'"(\w+) ([^\s]+) HTTP/[\d.]+"'
assert re.search(step3, '"GET /index.html HTTP/1.1"')

# Step 4: Status code and size
step4 = r'(\d{3}) (\d+|-)'
assert re.search(step4, '200 2326')

# Step 5: Combine everything
full_pattern = re.compile(
    rf'({step1})'     # IP
    r' - - '          # ident, auth
    rf'{step2}'       # timestamp
    r' '
    rf'{step3}'       # request
    r' '
    rf'{step4}'       # status, size
)

log_line = '192.168.1.1 - - [10/Feb/2026:13:55:36 +0900] "GET /index.html HTTP/1.1" 200 2326'
m = full_pattern.match(log_line)
assert m is not None
print(f'IP: {m.group(1)}')
print(f'Timestamp: {m.group(2)}')
print(f'Method: {m.group(3)}')
print(f'Path: {m.group(4)}')
print(f'Status: {m.group(5)}')
print(f'Size: {m.group(6)}')
```

### 7.2 Test-Driven Regex Development

```python
import re
import pytest

class TestPhoneNumberPattern:
    """Tests for phone number pattern"""

    pattern = re.compile(r'^0\d{1,4}-\d{1,4}-\d{4}$')

    # Positive cases: should match
    @pytest.mark.parametrize("phone", [
        "03-1234-5678",       # Tokyo
        "06-1234-5678",       # Osaka
        "090-1234-5678",      # Mobile
        "080-1234-5678",      # Mobile
        "0120-123-4567",      # Toll-free
        "0466-12-3456",       # 4-digit area code
    ])
    def test_valid_phones(self, phone):
        assert self.pattern.match(phone), f"{phone} should match"

    # Negative cases: should not match
    @pytest.mark.parametrize("phone", [
        "1234-5678",          # Does not start with 0
        "03-1234-567",        # Subscriber number is 3 digits
        "03-1234-56789",      # Subscriber number is 5 digits
        "abc-defg-hijk",      # Not digits
        "",                   # Empty string
        "03 1234 5678",       # Spaces instead of hyphens
    ])
    def test_invalid_phones(self, phone):
        assert not self.pattern.match(phone), f"{phone} should not match"

class TestEmailPattern:
    """Tests for email address pattern"""

    pattern = re.compile(
        r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    )

    @pytest.mark.parametrize("email", [
        "user@example.com",
        "user.name@example.co.jp",
        "user+tag@example.org",
        "user123@sub.domain.com",
    ])
    def test_valid_emails(self, email):
        assert self.pattern.match(email)

    @pytest.mark.parametrize("email", [
        "user@",
        "@example.com",
        "user@.com",
        "user@com",
        "",
        "user space@example.com",
    ])
    def test_invalid_emails(self, email):
        assert not self.pattern.match(email)
```

### 7.3 Using Debugging Tools

```python
# Use Python's re.DEBUG flag to inspect the internal structure of patterns
import re

# Display the parse result of a pattern
re.compile(r'\d{3}-\d{4}', re.DEBUG)
# Output:
# MAX_REPEAT 3 3
#   IN
#     CATEGORY CATEGORY_DIGIT
# LITERAL 45 ('-')
# MAX_REPEAT 4 4
#   IN
#     CATEGORY CATEGORY_DIGIT

# Verbose mode with commented patterns
pattern = re.compile(r"""
    (?P<year>\d{4})     # Year: 4-digit number
    [-/]                # Separator: hyphen or slash
    (?P<month>\d{2})    # Month: 2-digit number
    [-/]                # Separator
    (?P<day>\d{2})      # Day: 2-digit number
""", re.VERBOSE)

result = pattern.match('2026-02-15')
if result:
    print(result.groupdict())
    # => {'year': '2026', 'month': '02', 'day': '15'}
```

---

## 8. Regular Expression Best Practices

### 8.1 Design Principles

```
Design principles for regular expressions:

1. KISS Principle (Keep It Simple, Stupid)
   - Write the minimum necessary pattern
   - Aim for 80% coverage instead of perfection
   - Handle the remaining 20% with other logic

2. Incremental Refinement
   - Start with a simple pattern and gradually increase precision
   - Add tests at each stage

3. Comments Are Mandatory
   - Add comments to patterns longer than 10 characters
   - Verbose mode is recommended

4. Performance Consideration
   - Pre-compilation is the baseline
   - Avoid ReDoS patterns
   - Use anchors to limit search scope

5. Test-Driven
   - Write tests for positive cases, negative cases, and boundary values
   - Explicitly cover edge cases
```

### 8.2 Naming Conventions

```python
# Maintain consistency in pattern naming

# Validation patterns: is_* or validate_*
PATTERN_IS_EMAIL = re.compile(r'^[^@\s]+@[^@\s]+\.[^@\s]+$')
PATTERN_IS_URL = re.compile(r'^https?://[^\s]+$')
PATTERN_IS_IPV4 = re.compile(r'^\d{1,3}(\.\d{1,3}){3}$')

# Extraction patterns: extract_* or parse_*
PATTERN_EXTRACT_DATE = re.compile(r'(\d{4})-(\d{2})-(\d{2})')
PATTERN_EXTRACT_IP = re.compile(r'\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b')

# Replacement patterns: replace_* or clean_*
PATTERN_CLEAN_WHITESPACE = re.compile(r'\s+')
PATTERN_CLEAN_HTML_TAGS = re.compile(r'<[^>]+>')
```


---

## Hands-on Exercises

### Exercise 1: Basic Implementation

Implement code that satisfies the following requirements.

**Requirements:**
- Validate input data
- Implement appropriate error handling
- Create test code as well

```python
# Exercise 1: Basic implementation template
class Exercise1:
    """Exercise for basic implementation patterns"""

    def __init__(self):
        self.data = []

    def validate_input(self, value):
        """Validate input value"""
        if value is None:
            raise ValueError("Input value is None")
        return True

    def process(self, value):
        """Main processing logic"""
        self.validate_input(value)
        self.data.append(value)
        return self.data

    def get_results(self):
        """Retrieve processing results"""
        return {
            'count': len(self.data),
            'data': self.data
        }

# Tests
def test_exercise1():
    ex = Exercise1()
    assert ex.process(1) == [1]
    assert ex.process(2) == [1, 2]
    assert ex.get_results()['count'] == 2

    try:
        ex.process(None)
        assert False, "An exception should have been raised"
    except ValueError:
        pass

    print("All tests passed!")

test_exercise1()
```

### Exercise 2: Advanced Patterns

Extend the basic implementation by adding the following features.

```python
# Exercise 2: Advanced patterns
from typing import List, Dict, Optional
from datetime import datetime

class AdvancedExercise:
    """Exercise for advanced patterns"""

    def __init__(self, max_size: int = 100):
        self._items: List[Dict] = []
        self._max_size = max_size
        self._created_at = datetime.now()

    def add(self, key: str, value: any) -> bool:
        """Add an item (with size limit)"""
        if len(self._items) >= self._max_size:
            return False
        self._items.append({
            'key': key,
            'value': value,
            'timestamp': datetime.now().isoformat()
        })
        return True

    def find(self, key: str) -> Optional[Dict]:
        """Search by key"""
        for item in reversed(self._items):
            if item['key'] == key:
                return item
        return None

    def remove(self, key: str) -> bool:
        """Remove by key"""
        for i, item in enumerate(self._items):
            if item['key'] == key:
                self._items.pop(i)
                return True
        return False

    def stats(self) -> Dict:
        """Statistical information"""
        return {
            'total_items': len(self._items),
            'max_size': self._max_size,
            'usage_percent': len(self._items) / self._max_size * 100,
            'uptime': str(datetime.now() - self._created_at)
        }

# Tests
def test_advanced():
    ex = AdvancedExercise(max_size=3)
    assert ex.add("a", 1) == True
    assert ex.add("b", 2) == True
    assert ex.add("c", 3) == True
    assert ex.add("d", 4) == False  # Size limit
    assert ex.find("b")['value'] == 2
    assert ex.remove("b") == True
    assert ex.find("b") is None
    stats = ex.stats()
    assert stats['total_items'] == 2
    print("All advanced tests passed!")

test_advanced()
```

### Exercise 3: Performance Optimization

Improve the performance of the following code.

```python
# Exercise 3: Performance optimization
import time
from functools import lru_cache

# Before optimization (O(n^2))
def slow_search(data: list, target: int) -> int:
    """Inefficient search"""
    for i in range(len(data)):
        for j in range(i + 1, len(data)):
            if data[i] + data[j] == target:
                return (i, j)
    return (-1, -1)

# After optimization (O(n))
def fast_search(data: list, target: int) -> tuple:
    """Efficient search using a hash map"""
    seen = {}
    for i, num in enumerate(data):
        complement = target - num
        if complement in seen:
            return (seen[complement], i)
        seen[num] = i
    return (-1, -1)

# Benchmark
def benchmark():
    import random
    data = list(range(5000))
    random.shuffle(data)
    target = data[100] + data[4000]

    start = time.time()
    result1 = slow_search(data, target)
    slow_time = time.time() - start

    start = time.time()
    result2 = fast_search(data, target)
    fast_time = time.time() - start

    print(f"Inefficient: {slow_time:.4f}s")
    print(f"Efficient:   {fast_time:.6f}s")
    print(f"Speedup:     {slow_time/fast_time:.0f}x")

benchmark()
```

**Key Points:**
- Be mindful of algorithmic complexity
- Choose appropriate data structures
- Measure the effect with benchmarks

---

## Troubleshooting

### Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| Initialization error | Configuration file issues | Verify configuration file path and format |
| Timeout | Network latency / resource shortage | Adjust timeout values, add retry logic |
| Out of memory | Data volume growth | Introduce batch processing, implement pagination |
| Permission error | Insufficient access permissions | Verify executing user's permissions, review settings |
| Data inconsistency | Concurrent processing conflicts | Introduce locking mechanisms, transaction management |

### Debugging Procedure

1. **Check error messages**: Read the stack trace and identify the location of occurrence
2. **Establish reproduction steps**: Reproduce the error with minimal code
3. **Formulate hypotheses**: List possible causes
4. **Verify incrementally**: Use log output and debuggers to test hypotheses
5. **Fix and regression test**: After fixing, also run tests on related areas

```python
# Debugging utility
import logging
import traceback
from functools import wraps

# Logger configuration
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s [%(levelname)s] %(name)s: %(message)s'
)
logger = logging.getLogger(__name__)

def debug_decorator(func):
    """Decorator that logs function input/output"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        logger.debug(f"Called: {func.__name__}(args={args}, kwargs={kwargs})")
        try:
            result = func(*args, **kwargs)
            logger.debug(f"Return value: {func.__name__} -> {result}")
            return result
        except Exception as e:
            logger.error(f"Exception occurred: {func.__name__}: {e}")
            logger.error(traceback.format_exc())
            raise
    return wrapper

@debug_decorator
def process_data(items):
    """Data processing (debug target)"""
    if not items:
        raise ValueError("Empty data")
    return [item * 2 for item in items]
```

### Diagnosing Performance Issues

Diagnostic procedure when performance problems occur:

1. **Identify bottlenecks**: Measure with profiling tools
2. **Check memory usage**: Check for memory leaks
3. **Check I/O waits**: Examine disk and network I/O conditions
4. **Check concurrent connections**: Examine connection pool status

| Problem Type | Diagnostic Tools | Countermeasures |
|-------------|-----------------|-----------------|
| CPU load | cProfile, py-spy | Algorithm improvement, parallelization |
| Memory leak | tracemalloc, objgraph | Proper release of references |
| I/O bottleneck | strace, iostat | Asynchronous I/O, caching |
| DB latency | EXPLAIN, slow query log | Indexing, query optimization |

---

## Design Decision Guide

### Selection Criteria Matrix

The following summarizes the criteria for making technology choices.

| Criterion | Prioritize When | Acceptable to Compromise When |
|-----------|----------------|------------------------------|
| Performance | Real-time processing, large-scale data | Admin panels, batch processing |
| Maintainability | Long-term operation, team development | Prototypes, short-term projects |
| Scalability | Services expected to grow | Internal tools, fixed user base |
| Security | Personal information, financial data | Public data, internal use |
| Development speed | MVP, time-to-market | Quality-focused, mission-critical |

### Architecture Pattern Selection

```
┌─────────────────────────────────────────────────┐
│          Architecture Selection Flow              │
├─────────────────────────────────────────────────┤
│                                                 │
│  (1) Team size?                                  │
│    ├─ Small (1-5 people) → Monolith              │
│    └─ Large (10+ people) → Go to (2)             │
│                                                 │
│  (2) Deployment frequency?                       │
│    ├─ Once a week or less → Monolith +           │
│    │  modular decomposition                      │
│    └─ Daily/multiple times → Go to (3)           │
│                                                 │
│  (3) Team independence?                          │
│    ├─ High → Microservices                       │
│    └─ Moderate → Modular monolith                │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Trade-off Analysis

Technical decisions always involve trade-offs. Analyze from the following perspectives:

**1. Short-term vs Long-term Cost**
- A quick short-term approach can become technical debt in the long run
- Conversely, over-engineering has high short-term costs and can delay the project

**2. Consistency vs Flexibility**
- A unified technology stack has lower learning costs
- Adopting diverse technologies enables best-fit solutions but increases operational costs

**3. Level of Abstraction**
- High abstraction offers great reusability but can make debugging difficult
- Low abstraction is intuitive but prone to code duplication

```python
# Design decision recording template
class ArchitectureDecisionRecord:
    """Create an ADR (Architecture Decision Record)"""

    def __init__(self, title: str):
        self.title = title
        self.context = ""
        self.decision = ""
        self.consequences = []
        self.alternatives = []

    def set_context(self, context: str):
        """Describe the background and problem"""
        self.context = context
        return self

    def set_decision(self, decision: str):
        """Describe the decision"""
        self.decision = decision
        return self

    def add_consequence(self, consequence: str, positive: bool = True):
        """Add a consequence"""
        self.consequences.append({
            'description': consequence,
            'type': 'positive' if positive else 'negative'
        })
        return self

    def add_alternative(self, name: str, reason_rejected: str):
        """Add a rejected alternative"""
        self.alternatives.append({
            'name': name,
            'reason_rejected': reason_rejected
        })
        return self

    def to_markdown(self) -> str:
        """Output in Markdown format"""
        md = f"# ADR: {self.title}\n\n"
        md += f"## Background\n{self.context}\n\n"
        md += f"## Decision\n{self.decision}\n\n"
        md += "## Consequences\n"
        for c in self.consequences:
            icon = "+" if c['type'] == 'positive' else "!"
            md += f"- {icon} {c['description']}\n"
        md += "\n## Rejected Alternatives\n"
        for a in self.alternatives:
            md += f"- **{a['name']}**: {a['reason_rejected']}\n"
        return md
```
---

## 9. FAQ

### Q1: What is the best order for learning regular expressions?

**A**: The following order is recommended:

1. Literal matching → Metacharacters → Character classes → Quantifiers
2. Anchors → Groups → Backreferences
3. Lookahead/lookbehind → Unicode → Performance

It is most effective to master the basic syntax first, then practice with real use cases (log analysis, input validation, etc.).

### Q2: Should I choose NFA or DFA?

**A**: Use the following criteria:

- **Backreferences or lookahead required** → NFA (Perl, Python, JavaScript, etc.)
- **Matching against untrusted input** → DFA (RE2, Rust regex) to prevent ReDoS
- **Performance is the top priority** → Choose a DFA-based engine
- **Feature richness is the priority** → Choose an NFA-based engine

In most cases, using the default engine of your language is fine. Only consider DFA when ReDoS is a concern.

### Q3: What tools are available for debugging regular expressions?

**A**: Major tools:

- **regex101.com** -- Real-time pattern testing with explanations (supports PCRE, Python, JS, Go, Java)
- **Debuggex** -- Displays Railroad Diagrams of regular expressions
- **RegExr** -- Interactive regex tester
- **Verbose mode in each language** -- Python's `re.VERBOSE`, Perl's `/x` modifier
- **Debug flags in each language** -- Python's `re.DEBUG`

### Q4: What should I do when regex performance is poor?

**A**: Consider the following in order:

1. **Review the pattern**: Add anchors, eliminate unnecessary backtracking
2. **Pre-compile**: Reuse pattern objects with `re.compile()`
3. **Replace with string operations**: `str.startswith()`, `str.endswith()`, `in` operator
4. **Change the engine**: Migrate to RE2 or Rust regex
5. **Change the algorithm**: Consider solutions that don't use regular expressions

### Q5: How complex should a regular expression be allowed to get?

**A**: As a rule of thumb:

- **20 characters or fewer**: Can be used inline
- **20-50 characters**: Verbose mode with comments recommended
- **50-100 characters**: Split and build incrementally; testing is mandatory
- **100+ characters**: Consider using a parser or library

When readability degrades, it is time to split the regex or consider a different approach.

### Q6: How should I address security risks of regular expressions?

**A**: Major risks and countermeasures:

1. **ReDoS (Regular Expression Denial of Service)**
   - Avoid nested quantifiers: `(a+)+` → `a+`
   - Use a DFA engine for untrusted input
   - Set a timeout for matching

2. **Bypassing input validation**
   - Use `\A` and `\z` instead of just `^` and `$` (considering newline characters)
   - Prevent unintended activation of multiline mode
   - Perform Unicode normalization beforehand

3. **Injection attacks**
   - Do not embed user input directly into patterns
   - When embedding, always escape with `re.escape()`

---


## FAQ

### Q1: What is the most important point in learning this topic?

Gaining practical experience is the most important. Understanding deepens not only through theory, but by actually writing code and verifying its behavior.

### Q2: What common mistakes do beginners make?

Skipping the basics and jumping to advanced topics. We recommend thoroughly understanding the fundamental concepts explained in this guide before moving on to the next step.

### Q3: How is this used in professional practice?

Knowledge of this topic is frequently applied in daily development work. It becomes especially important during code reviews and architecture design.

---

## Summary

| Item | Description |
|------|-------------|
| Essence of regex | A formal language for pattern matching |
| Theoretical foundation | Kleene's regular sets (1956) |
| Origin of practical use | Thompson's implementation in QED/ed (1968) |
| Modern standard | PCRE (Perl Compatible Regular Expressions) |
| NFA | Backtracking-based, feature-rich, worst case O(2^n) |
| DFA | State transition-based, fast and stable, O(n) guaranteed |
| Primary uses | Text search, replacement, extraction, validation |
| Primary limitations | Cannot handle nested structures (HTML, etc.) by design |
| Major dialects | POSIX BRE/ERE, PCRE, ECMAScript, RE2 |
| Security | ReDoS countermeasures are essential (especially for NFA engines) |
| Best practices | Incremental construction, test-driven, verbose mode |
| Key to learning | Progress sequentially: basic syntax → advanced syntax → practical patterns |

---

## Recommended Next Guides

- [01-basic-syntax.md](./01-basic-syntax.md) -- Basic Syntax: Literals, Metacharacters, Escaping
- [02-character-classes.md](./02-character-classes.md) -- Character Classes in Detail
- [03-quantifiers-anchors.md](./03-quantifiers-anchors.md) -- Quantifiers and Anchors

---

## References

1. **Jeffrey E.F. Friedl** "Mastering Regular Expressions, 3rd Edition" O'Reilly Media, 2006 -- The definitive bible of regular expressions
2. **Russ Cox** "Regular Expression Matching Can Be Simple And Fast" https://swtch.com/~rsc/regexp/regexp1.html, 2007 -- Clear explanation of NFA/DFA theory and implementation
3. **Ken Thompson** "Regular Expression Search Algorithm" Communications of the ACM, 11(6):419-422, 1968 -- The original paper on regex engines
4. **Michael Rabin, Dana Scott** "Finite Automata and Their Decision Problems" IBM Journal of Research and Development, 3(2):114-125, 1959 -- The paper proving NFA/DFA equivalence
5. **PCRE2 Documentation** https://www.pcre.org/current/doc/html/ -- Current PCRE2 reference
6. **RE2 Documentation** https://github.com/google/re2/wiki/Syntax -- RE2 syntax reference
7. **ECMAScript Language Specification** https://tc39.es/ecma262/#sec-regexp-regular-expression-objects -- JavaScript regex specification
8. **POSIX Standard** IEEE Std 1003.1-2017, Section 9 "Regular Expressions" -- Official POSIX regex specification



===== SOURCE: 02-programming/regex-and-text-processing/docs/00-basics/01-basic-syntax.md =====

# Basic Syntax -- Literals, Metacharacters, Escaping

> A comprehensive guide to the operating principles and correct usage of literal characters, metacharacters (special characters), and escape sequences -- the most fundamental building blocks of regular expressions.

## What You Will Learn in This Chapter

1. **Distinguishing Literal Characters from Metacharacters** -- Which characters match directly and which have special meaning
2. **How Escaping Works and Its Pitfalls** -- Disabling metacharacters with backslash and the double-escaping problem
3. **Behavior Changes via Flags (Modifiers)** -- Case-insensitive, multiline mode, dotall mode
4. **Literal Notation Across Languages** -- Differences in how Python, JavaScript, Java, Perl, and Ruby express patterns
5. **Internal Workings of Matching** -- How the engine scans a string


## Prerequisites

Before reading this guide, having the following knowledge will deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts
- Understanding of the content in [Regular Expression Overview](./00-regex-overview.md)

---

## 1. Literal Characters

Literal characters match the corresponding character in the pattern directly.

```python
import re

# Pattern consisting only of literal characters
pattern = r'hello'
text = "say hello to the world"

match = re.search(pattern, text)
print(match.group())  # => "hello"
print(match.start())  # => 4
print(match.end())    # => 9
```

Rules for literal character matching:

```
Pattern    Target String        Result
────────   ──────────────────   ──────
cat        "the cat sat"        Match ("cat")
123        "abc123def"          Match ("123")
hello      "Hello World"        No match (case-sensitive)
hello      "Hello World"        Match (with i flag)
```

### 1.1 Detailed Behavior of Literal Matching

```python
import re

# Literal matching succeeds at the first position found, scanning left to right
text = "abcabcabc"
pattern = r'abc'

# search returns the first match
m = re.search(pattern, text)
print(f"First match: position {m.start()}-{m.end()}")  # => position 0-3

# findall returns all matches
all_matches = re.findall(pattern, text)
print(f"All matches: {all_matches}")  # => ['abc', 'abc', 'abc']

# finditer returns an iterator with position information
for m in re.finditer(pattern, text):
    print(f"  position {m.start()}-{m.end()}: '{m.group()}'")
# => position 0-3: 'abc'
# => position 3-6: 'abc'
# => position 6-9: 'abc'
```

### 1.2 Case Handling

```python
import re

text = "Python is Great. PYTHON IS GREAT. python is great."

# Default: case-sensitive
print(re.findall(r'python', text))
# => ['python']

# IGNORECASE flag: case-insensitive
print(re.findall(r'python', text, re.IGNORECASE))
# => ['Python', 'PYTHON', 'python']

# Inline flag: embed the flag within the pattern
print(re.findall(r'(?i)python', text))
# => ['Python', 'PYTHON', 'python']

# Partial flag application (Python 3.6+)
# (?i:pattern) applies case-insensitivity only to that portion
print(re.findall(r'(?i:python) is (?i:great)', text))
# => ['Python is Great', 'PYTHON IS GREAT', 'python is great']
```

### 1.3 Multibyte Character Literal Matching

```python
import re

# Literal matching with Japanese characters
text = "Tokyo is the capital of Japan. Tokyo is the capital of Japan."

# Japanese strings can be matched directly
print(re.findall(r'Tokyo', text))   # => ['Tokyo', 'Tokyo']

# Matching in mixed text
log = "2026-02-15 Error: File not found (error: file not found)"
m = re.search(r'Error', log)
print(m.group())  # => 'Error'

# Emoji can also be matched literally (Python 3)
emoji_text = "Hello! Nice to meet you!"
print(re.findall(r'Nice', emoji_text))  # => ['Nice']
```

### 1.4 Differences in Literal Notation Across Languages

```python
# Python: raw strings recommended
import re
pattern = r'hello\.\*world'
re.search(pattern, text)

# Python: pre-compile with re.compile
compiled = re.compile(r'hello\.\*world')
compiled.search(text)
```

```javascript
// JavaScript: literal notation
const pattern1 = /hello\.\*world/;
pattern1.test(text);

// JavaScript: constructor notation (for dynamic patterns)
const pattern2 = new RegExp('hello\\.\\*world');
pattern2.test(text);
// Note: constructor requires string escaping too, resulting in double escaping
```

```java
// Java: always string literals (no raw strings)
import java.util.regex.*;
Pattern pattern = Pattern.compile("hello\\.\\*world");
Matcher matcher = pattern.matcher(text);

// Java 13+: text blocks make it slightly more readable
// However, backslash escaping is still required
```

```ruby
# Ruby: Regexp literal
pattern = /hello\.\*world/
text =~ pattern

# Ruby: Regexp.new (for dynamic patterns)
pattern = Regexp.new('hello\.\*world')

# Ruby: %r{} notation (convenient for patterns with many slashes)
pattern = %r{http://example\.com/path}
```

```perl
# Perl: pattern match operator
if ($text =~ /hello\.\*world/) {
    print "Match\n";
}

# Perl: pre-compile with qr//
my $pattern = qr/hello\.\*world/;
if ($text =~ $pattern) { ... }
```

---

## 2. Metacharacter Reference

Characters that have special meaning in regular expressions:

```
Metacharacter Reference (12 characters + backslash):

.   Any single character (except newline)
^   Start of line / negation inside character class
$   End of line
*   Repeat the preceding element 0 or more times
+   Repeat the preceding element 1 or more times
?   The preceding element 0 or 1 time
|   Alternation (OR)
()  Grouping and capture
[]  Character class
{}  Quantifier {n,m}
\   Escape character

Metacharacters inside character class []:
]   End of character class
\   Escape
^   Negation (only at the beginning)
-   Range (only between characters)
```

### 2.1 Dot `.` -- Any Single Character

```python
import re

pattern = r'c.t'
texts = ["cat", "cot", "cut", "ct", "coat", "c\nt"]

for t in texts:
    m = re.search(pattern, t)
    result = m.group() if m else "no match"
    print(f"  '{t}' → {result}")

# Output:
#   'cat' → cat
#   'cot' → cot
#   'cut' → cut
#   'ct'  → no match     (dot requires exactly 1 character)
#   'coat' → coa is no match, does not match c.t
#   'c\nt' → no match    (dot does not match newline *except with DOTALL)

# DOTALL flag makes dot match newlines too
m = re.search(r'c.t', "c\nt", re.DOTALL)
print(m.group())  # => "c\nt"
```

```python
# Practical dot patterns

import re

# 1. Pattern including any single character
print(re.findall(r'b.g', "bag big bog bug"))
# => ['bag', 'big', 'bog', 'bug']

# 2. Fixed-length pattern matching
print(re.findall(r'...-....', "Tel: 03-1234-5678"))
# => ['03-1234']  *May not match intent

# 3. Correct use of dot: when a specific single character is unknown
# Filename pattern: any single character before the extension
print(re.findall(r'file.\.txt', "file1.txt file2.txt fileA.txt"))
# => ['file1.txt', 'file2.txt', 'fileA.txt']
```

### 2.2 Pipe `|` -- Alternation (OR)

```python
import re

# Alternation with pipe
pattern = r'cat|dog|bird'
texts = ["I have a cat", "I have a dog", "I have a fish"]

for t in texts:
    m = re.search(pattern, t)
    print(f"  '{t}' → {m.group() if m else 'no match'}")

# Output:
#   'I have a cat' → cat
#   'I have a dog' → dog
#   'I have a fish' → no match

# Note: Pipe precedence
# gr(a|e)y  → "gray" or "grey"     (alternation within group)
# gray|grey → "gray" or "grey"     (equivalent)
# gra|ey    → "gra" or "ey"        (may not match intent)
```

```python
# Understanding pipe precedence

import re

# Pipe is the lowest-precedence operator in regex
# Concatenation (adjacent characters) has higher precedence

# Example 1: abc|def is the same as (abc)|(def)
print(re.findall(r'abc|def', "abc def abdef"))
# => ['abc', 'def']

# Example 2: Restrict scope with groups
print(re.findall(r'gr(a|e)y', "gray grey graey"))
# => ['a', 'e']  *Returns the captured group content

# Non-capturing group returns the full match
print(re.findall(r'gr(?:a|e)y', "gray grey graey"))
# => ['gray', 'grey']

# Example 3: Pattern with multiple alternatives
log_pattern = r'ERROR|WARN|INFO|DEBUG'
log = "2026-02-15 [ERROR] Connection failed"
m = re.search(log_pattern, log)
print(m.group())  # => 'ERROR'

# Example 4: NFA engines try alternatives left to right
# The first matching alternative is selected
print(re.search(r'Java|JavaScript', "JavaScript").group())
# => 'Java' (tried first and matched)

# Place longer alternatives first to handle this
print(re.search(r'JavaScript|Java', "JavaScript").group())
# => 'JavaScript'
```

### 2.3 Asterisk `*`, Plus `+`, Question Mark `?`

```python
import re

# * : 0 or more times
print(re.findall(r'ab*c', "ac abc abbc"))     # => ['ac', 'abc', 'abbc']

# + : 1 or more times
print(re.findall(r'ab+c', "ac abc abbc"))     # => ['abc', 'abbc']

# ? : 0 or 1 time
print(re.findall(r'colou?r', "color colour"))  # => ['color', 'colour']
```

```python
# Detailed behavior of quantifiers

import re

# * (0 or more) -- beware of empty matches
print(re.findall(r'a*', "aaa"))
# => ['aaa', '']  *Empty match occurs at the end

print(re.findall(r'a*', "bbb"))
# => ['', '', '', '']  *0-length match at each position

# + (1 or more) -- no empty matches
print(re.findall(r'a+', "aaa"))
# => ['aaa']

print(re.findall(r'a+', "bbb"))
# => []

# ? (0 or 1) -- optional elements
print(re.findall(r'https?', "http and https"))
# => ['http', 'https']

# Greedy matching of quantifiers
# By default, they consume as many characters as possible
print(re.search(r'a+', "aaaaaa").group())
# => 'aaaaaa' (consumes all 'a's)

# Non-greedy (lazy) matching -- append ?
print(re.search(r'a+?', "aaaaaa").group())
# => 'a' (minimum of 1 character only)

# Practical example of non-greedy: text inside HTML tags
html = "<b>bold</b> and <i>italic</i>"
print(re.findall(r'<.+>', html))    # Greedy: ['<b>bold</b> and <i>italic</i>']
print(re.findall(r'<.+?>', html))   # Non-greedy: ['<b>', '</b>', '<i>', '</i>']
```

### 2.4 Parentheses `()` -- Grouping and Capture

```python
import re

# Basic grouping
pattern = r'(hello) (world)'
m = re.search(pattern, "say hello world")
print(m.group(0))  # => 'hello world' (entire match)
print(m.group(1))  # => 'hello' (group 1)
print(m.group(2))  # => 'world' (group 2)
print(m.groups())  # => ('hello', 'world')

# Non-capturing group (?:...)
# Groups without capturing
pattern = r'(?:hello|hi) (world)'
m = re.search(pattern, "say hello world")
print(m.group(1))  # => 'world' (group numbers are not shifted)

# Named group (?P<name>...)
pattern = r'(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})'
m = re.search(pattern, "Date: 2026-02-15")
print(m.group('year'))   # => '2026'
print(m.group('month'))  # => '02'
print(m.group('day'))    # => '15'
print(m.groupdict())     # => {'year': '2026', 'month': '02', 'day': '15'}
```

### 2.5 Square Brackets `[]` -- Character Class

```python
import re

# Basic character class
print(re.findall(r'[aeiou]', "hello world"))
# => ['e', 'o', 'o']  *Matches only vowels

# Range specification
print(re.findall(r'[a-z]', "Hello 123"))
# => ['e', 'l', 'l', 'o']

print(re.findall(r'[A-Za-z0-9]', "Hello 123!"))
# => ['H', 'e', 'l', 'l', 'o', '1', '2', '3']

# Negated character class
print(re.findall(r'[^a-z]', "hello 123!"))
# => [' ', '1', '2', '3', '!']

# Handling of metacharacters inside character classes
# Most metacharacters are treated as literals
print(re.findall(r'[.+*?]', "a.b+c*d?e"))
# => ['.', '+', '*', '?']

# However, the following are special:
# ] → End of character class (place at beginning or escape: [\]] or []abc])
# \ → Escape
# ^ → Negation only at the beginning
# - → Range only between characters (literal at beginning/end)
```

### 2.6 Curly Braces `{}` -- Quantifiers

```python
import re

# {n} exactly n times
print(re.findall(r'\d{3}', "12 123 1234 12345"))
# => ['123', '123', '123']  *Extracts 123 from 1234, 123 and 45 separate from 12345

# {n,m} between n and m times
print(re.findall(r'\d{2,4}', "1 12 123 1234 12345"))
# => ['12', '123', '1234', '1234']

# {n,} n or more times
print(re.findall(r'\d{3,}', "1 12 123 1234 12345"))
# => ['123', '1234', '12345']

# {,m} 0 to m times (= {0,m})
print(re.findall(r'a{,3}', "aaaa"))
# => ['aaa', 'a', '']  *Matches up to 3 'a's

# Practical example: postal code
print(re.findall(r'\d{3}-\d{4}', "100-0001 Chiyoda-ku, Tokyo"))
# => ['100-0001']

# Practical example: IPv4 address (simplified)
print(re.findall(r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}',
                 "Server: 192.168.1.1, Gateway: 10.0.0.1"))
# => ['192.168.1.1', '10.0.0.1']
```

### 2.7 Caret `^` and Dollar Sign `$` -- Anchors

```python
import re

# ^ matches the start of line
print(re.search(r'^hello', "hello world").group())    # => 'hello'
print(re.search(r'^hello', "say hello"))              # => None

# $ matches the end of line
print(re.search(r'world$', "hello world").group())    # => 'world'
print(re.search(r'world$', "world hello"))            # => None

# Combine ^ and $ for full-string matching
print(re.match(r'^\d{3}-\d{4}$', "100-0001"))
# => <re.Match object; ...>  Match succeeded

print(re.match(r'^\d{3}-\d{4}$', "100-0001 Tokyo"))
# => None  (extra characters at the end)

# ^ and $ in multiline mode
text = """line1
line2
line3"""

# Default: ^ matches only the start of the entire string
print(re.findall(r'^line\d', text))
# => ['line1']

# MULTILINE: ^ matches the start of each line
print(re.findall(r'^line\d', text, re.MULTILINE))
# => ['line1', 'line2', 'line3']
```

---

## 3. Escaping

### 3.1 Escaping Metacharacters

```python
import re

# Use a backslash to treat metacharacters as literals
price_pattern = r'\$\d+\.\d{2}'
text = "Price: $19.99 and $5.00"

matches = re.findall(price_pattern, text)
print(matches)  # => ['$19.99', '$5.00']

# Examples of metacharacters that need escaping:
#   \.  → Literal dot
#   \*  → Literal asterisk
#   \+  → Literal plus
#   \?  → Literal question mark
#   \(  → Literal opening parenthesis
#   \)  → Literal closing parenthesis
#   \[  → Literal opening square bracket
#   \{  → Literal opening curly brace
#   \|  → Literal pipe
#   \\  → Literal backslash
#   \^  → Literal caret
#   \$  → Literal dollar sign
```

```python
# Practical patterns requiring escaping

import re

# 1. File path (Windows)
path = r'C:\Users\gaku\Documents\file.txt'
pattern = r'C:\\Users\\(\w+)\\Documents\\(\w+\.txt)'
m = re.search(pattern, path)
if m:
    print(f"User: {m.group(1)}, File: {m.group(2)}")
    # => User: gaku, File: file.txt

# 2. URL pattern
url = "https://example.com/path?key=value&key2=value2"
pattern = r'https?://([^/]+)(/[^?]*)?\?(.+)'
m = re.search(pattern, url)
if m:
    print(f"Host: {m.group(1)}")   # => example.com
    print(f"Path: {m.group(2)}")   # => /path
    print(f"Query: {m.group(3)}")  # => key=value&key2=value2

# 3. Mathematical expression
expr = "f(x) = 3x^2 + 2x + 1"
pattern = r'f\(x\) = (\d+)x\^(\d+)'
m = re.search(pattern, expr)
if m:
    print(f"Coefficient: {m.group(1)}, Exponent: {m.group(2)}")
    # => Coefficient: 3, Exponent: 2

# 4. IP address (escaping dots is important)
ip_text = "Server 192.168.1.1 Port 8080"
pattern = r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}'
m = re.search(pattern, ip_text)
print(m.group())  # => '192.168.1.1'
```

### 3.2 The Double-Escaping Problem

```
Escape flow:

Source Code           Python String        Regex Engine
─────────────       ──────────────      ────────────────
"\\d"          →    \d             →    Matches one digit
"\\\\d"        →    \\d            →    Literal \ + d
r"\d"          →    \d             →    Matches one digit (raw string)
r"\\d"         →    \\d            →    Literal \ + d

* Using raw strings (r"...") avoids double escaping
```

```python
import re

# The double-escaping problem
# When matching Windows paths:

# BAD: Regular string -- backslashes are interpreted at two levels
pattern_bad = "C:\\\\Users\\\\\\w+"
# Python string interpretation: C:\\Users\\\w+
# Regex interpretation: C:\Users\ + word characters

# GOOD: Use raw strings
pattern_good = r"C:\\Users\\\w+"

text = r"C:\Users\gaku"
print(re.search(pattern_good, text).group())  # => C:\Users\gaku
```

```python
# Cases prone to double-escaping problems

import re

# Case 1: Matching a backslash itself
# Goal: Find \ in text
text = "path\\to\\file"

# BAD: Regular string
# "\\" → Python string: \ → Regex: incomplete escape
# GOOD: Raw string
pattern = r'\\'  # Raw string: \\ → Regex: literal \
print(re.findall(pattern, text))  # => ['\\', '\\']

# Case 2: Matching the literal string \n
# Goal: Find the character sequence "\n" (backslash + n) in text
text = r"Newline is represented by \n"

# BAD: "\n" → Python string: newline character → matches newline
# GOOD:
pattern = r'\\n'  # Raw string: \\n → Regex: literal \ + n
print(re.findall(pattern, text))  # => ['\\n']

# Case 3: Extra caution needed in Java / JavaScript
# Java: Pattern.compile("\\\\n") → \\ → literal \ + n
# JavaScript: /\\n/ → literal \ + n
# JavaScript: new RegExp("\\\\n") → string escape + regex escape
```

### 3.3 Special Escape Sequences

```
Escape Sequence Reference:

Character class shorthands:
  \d  → Digit [0-9]
  \D  → Non-digit [^0-9]
  \w  → Word character [a-zA-Z0-9_]
  \W  → Non-word character [^a-zA-Z0-9_]
  \s  → Whitespace [ \t\n\r\f\v]
  \S  → Non-whitespace [^ \t\n\r\f\v]

Anchors:
  \b  → Word boundary
  \B  → Non-word boundary

Special characters:
  \t  → Tab
  \n  → Newline (LF)
  \r  → Carriage return (CR)
  \f  → Form feed
  \v  → Vertical tab
  \0  → NULL character
  \a  → Bell character
  \e  → Escape character (ESC, 0x1B) *Some engines only

Numeric specification:
  \xHH    → Hexadecimal (e.g., \x41 = 'A')
  \uHHHH  → Unicode BMP (e.g., \u3042 = Japanese hiragana 'a')
  \UHHHHHHHH → Unicode (e.g., \U0001F600 = emoji)
  \N{name}   → Unicode name (e.g., \N{SNOWMAN} = snowman character) *Python
  \oOOO   → Octal (e.g., \o101 = 'A')
```

```python
import re

# Verifying shorthand behavior

# \d: digits
print(re.findall(r'\d+', "abc123def456"))
# => ['123', '456']

# \w: word characters
print(re.findall(r'\w+', "hello, world! 123"))
# => ['hello', 'world', '123']

# \s: whitespace characters
text = "hello\tworld\nnext line"
print(re.findall(r'\s', text))
# => ['\t', '\n', ' ']

# \b: word boundary
text = "cat caterpillar concatenate"
print(re.findall(r'\bcat\b', text))
# => ['cat']  *Exact match only

print(re.findall(r'\bcat', text))
# => ['cat', 'cat', 'cat']  *Words starting with cat

# Uppercase versions are negations
print(re.findall(r'\D+', "abc123def"))  # Non-digits
# => ['abc', 'def']

print(re.findall(r'\W+', "hello, world!"))  # Non-word characters
# => [', ', '!']

print(re.findall(r'\S+', "hello world"))  # Non-whitespace
# => ['hello', 'world']
```

### 3.4 Automatic Escaping with re.escape()

```python
import re

# When incorporating user input as a literal into a pattern
user_input = "file (1).txt"

# BAD: Using it directly causes metacharacters to be interpreted
try:
    re.search(user_input, "file (1).txt")  # () interpreted as a group
except re.error as e:
    print(f"Error: {e}")

# GOOD: Escape metacharacters with re.escape()
escaped = re.escape(user_input)
print(escaped)  # => 'file\\ \\(1\\)\\.txt'
m = re.search(escaped, "file (1).txt")
print(m.group())  # => 'file (1).txt'

# Practical example: literal search of user input
def search_literal(text, query):
    """Search for user input as a literal"""
    pattern = re.escape(query)
    return re.findall(pattern, text)

print(search_literal("price is $10.00", "$10.00"))
# => ['$10.00']

# Practical example: extract text between literal delimiters
def extract_between(text, start, end):
    """Extract strings between start and end"""
    pattern = re.escape(start) + r'(.+?)' + re.escape(end)
    return re.findall(pattern, text)

print(extract_between("value = [hello]", "[", "]"))
# => ['hello']
```

### 3.5 Escape Functions in Various Languages

```python
# Python
import re
re.escape("hello.world")  # => 'hello\\.world'
```

```javascript
// JavaScript (not in the standard, but a commonly used utility)
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
escapeRegExp("hello.world");  // => "hello\\.world"
```

```java
// Java
java.util.regex.Pattern.quote("hello.world");
// => "\\Qhello.world\\E" (wrapped in a literal block)
```

```ruby
# Ruby
Regexp.escape("hello.world")  # => "hello\\.world"
```

---

## 4. Flags (Modifiers)

### 4.1 Major Flags Reference

```python
import re

text = """Hello World
hello python
HELLO REGEX"""

# i flag: ignore case
print(re.findall(r'hello', text, re.IGNORECASE))
# => ['Hello', 'hello', 'HELLO']

# m flag: multiline mode (^ and $ apply to each line)
print(re.findall(r'^hello', text, re.MULTILINE | re.IGNORECASE))
# => ['Hello', 'hello', 'HELLO']

# s flag: dot matches newlines too
print(re.search(r'Hello.+REGEX', text, re.DOTALL).group())
# => 'Hello World\nhello python\nHELLO REGEX'

# x flag: verbose mode (ignores whitespace and comments)
pattern = re.compile(r'''
    \d{4}       # Year (4 digits)
    -            # Hyphen separator
    \d{2}       # Month (2 digits)
    -            # Hyphen separator
    \d{2}       # Day (2 digits)
''', re.VERBOSE)
print(pattern.search("Date: 2026-02-11").group())
# => '2026-02-11'
```

### 4.2 Flag Comparison Table

| Flag | Python | JavaScript | Perl | Java | Effect |
|------|--------|------------|------|------|--------|
| Case-insensitive | `re.IGNORECASE` / `re.I` | `/i` | `/i` | `CASE_INSENSITIVE` | Ignore case differences |
| Multiline | `re.MULTILINE` / `re.M` | `/m` | `/m` | `MULTILINE` | `^` `$` match start/end of each line |
| Dotall | `re.DOTALL` / `re.S` | `/s` | `/s` | `DOTALL` | `.` matches newlines too |
| Verbose | `re.VERBOSE` / `re.X` | Not supported | `/x` | `COMMENTS` | Ignores whitespace and comments |
| Unicode | `re.UNICODE` / `re.U` | `/u` | Default | `UNICODE_CHARACTER_CLASS` | Unicode support |
| Global | N/A (`findall`) | `/g` | `/g` | N/A (`Matcher.find()`) | Return all matches |
| Sticky | N/A | `/y` | N/A | N/A | Match only from lastIndex position |
| ASCII | `re.ASCII` / `re.A` | N/A | `/a` | N/A | Restrict \d \w \s to ASCII only |

### 4.3 Inline Flags

```python
import re

# Embed flags within the pattern
# (?flags) format

# (?i) ignore case
print(re.findall(r'(?i)hello', "Hello HELLO hello"))
# => ['Hello', 'HELLO', 'hello']

# (?m) multiline mode
text = "line1\nline2\nline3"
print(re.findall(r'(?m)^\w+', text))
# => ['line1', 'line2', 'line3']

# (?s) dotall
print(re.search(r'(?s)line1.+line3', text).group())
# => 'line1\nline2\nline3'

# (?x) verbose mode
pattern = r'''(?x)
    (\d{4})     # Year
    -(\d{2})    # Month
    -(\d{2})    # Day
'''
m = re.search(pattern, "2026-02-15")
print(m.groups())  # => ('2026', '02', '15')

# Combining multiple flags
print(re.findall(r'(?im)^hello', "Hello\nhello\nHELLO"))
# => ['Hello', 'hello', 'HELLO']

# Scoped flags (Python 3.6+)
# (?i:pattern) applies the flag only to that portion
pattern = r'(?i:hello) world'  # hello is case-insensitive, world is case-sensitive
print(re.findall(pattern, "Hello world HELLO world hello World"))
# => ['Hello world', 'hello world']  *'HELLO world' matches, 'hello World' does not
# In practice:
# 'Hello world' → match
# 'HELLO world' → match
# 'hello World' → no match (world is uppercase)
```

### 4.4 Practical Flag Patterns

```python
import re

# 1. Log file analysis (multiline + case-insensitive)
log = """
2026-02-15 10:30:00 [ERROR] Database connection failed
2026-02-15 10:31:00 [Warning] High memory usage
2026-02-15 10:32:00 [error] Disk space low
"""

# Matches ERROR, Warning, and error
errors = re.findall(
    r'^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} \[(?:error|warning)\] (.+)$',
    log,
    re.MULTILINE | re.IGNORECASE
)
print(errors)
# => ['Database connection failed', 'High memory usage', 'Disk space low']

# 2. Improving readability of complex patterns (verbose mode)
email_pattern = re.compile(r'''
    ^                       # Start of string
    [a-zA-Z0-9._%+-]+      # Local part
    @                       # At sign
    [a-zA-Z0-9.-]+          # Domain name
    \.                      # Dot
    [a-zA-Z]{2,}            # TLD
    $                       # End of string
''', re.VERBOSE)

# 3. Multiline text analysis (dotall + multiline)
html = """<div class="content">
    <p>First paragraph</p>
    <p>Second paragraph</p>
</div>"""

# Extract the entire contents of the div
m = re.search(r'<div[^>]*>(.*?)</div>', html, re.DOTALL)
if m:
    print(m.group(1).strip())
```

---

## 5. ASCII Diagrams: Pattern Matching Flow

### 5.1 Basic Matching Procedure

```
Pattern: h.llo
Text: "say hello world"

Position: s a y   h e l l o   w o r l d
          0 1 2 3 4 5 6 7 8 9 ...

Attempt 1: position 0, 's' != 'h' → fail, move to position 1
Attempt 2: position 1, 'a' != 'h' → fail, move to position 2
Attempt 3: position 2, 'y' != 'h' → fail, move to position 3
Attempt 4: position 3, ' ' != 'h' → fail, move to position 4
Attempt 5: position 4, 'h' = 'h' → match
           position 5, 'e' = '.' → match (any single character)
           position 6, 'l' = 'l' → match
           position 7, 'l' = 'l' → match
           position 8, 'o' = 'o' → match
           → Match succeeded: "hello" (position 4-8)
```

### 5.2 Metacharacter Meaning Map

```
┌─────────────────────────────────────────────────┐
│         Components of Regular Expressions         │
├────────────┬────────────────────────────────────┤
│ Literals   │  a b c 1 2 3 etc.                   │
│ (as-is)    │  → Matches the character itself       │
├────────────┼────────────────────────────────────┤
│ Metacharacters │  . ^ $ * + ? | ( ) [ ] { } \   │
│ (special)  │  → Instructs special behavior         │
├────────────┼────────────────────────────────────┤
│ Escapes    │  \. \* \+ \? \( \) \[ \{ \\ etc.    │
│ (disable)  │  → Reverts metacharacters to literals  │
├────────────┼────────────────────────────────────┤
│ Shorthands │  \d \w \s \b \t \n etc.              │
│ (abbreviations) │  → Abbreviated character class    │
│            │    notation                            │
└────────────┴────────────────────────────────────┘
```

### 5.3 Structure of Escape Layers

```
  Source Code Layer      Language Layer        Regex Engine Layer
 ┌──────────┐      ┌──────────┐      ┌──────────────┐
 │ "\\d+"   │ ───→ │  \d+     │ ───→ │ 1+ digits     │
 │ r"\d+"   │ ───→ │  \d+     │ ───→ │ 1+ digits     │
 │ "\\\\n"  │ ───→ │  \\n     │ ───→ │ \ + n (2 chars)│
 │ r"\\n"   │ ───→ │  \\n     │ ───→ │ \ + n (2 chars)│
 │ "\n"     │ ───→ │  newline │ ───→ │ newline char   │
 │ r"\n"    │ ───→ │  \n      │ ───→ │ newline char   │
 └──────────┘      └──────────┘      └──────────────┘

 Key point: Raw strings (r"...") disable escaping
            at the language layer.
            Regex engine layer escaping is separate.
```

### 5.4 Quantifier Behavior Comparison

```
Pattern: a{2,4}
Text: "aaaaaa"

Greedy match (default):
  Position 0: a{2,4} → "aaaa" (consumes maximum 4 characters)
  Position 4: a{2,4} → "aa"   (consumes remaining 2 characters)
  Result: ["aaaa", "aa"]

Non-greedy match (a{2,4}?):
  Position 0: a{2,4}? → "aa" (consumes minimum 2 characters)
  Position 2: a{2,4}? → "aa" (consumes minimum 2 characters)
  Position 4: a{2,4}? → "aa" (consumes minimum 2 characters)
  Result: ["aa", "aa", "aa"]
```

```
Pattern: <.+> vs <.+?>
Text: "<b>bold</b>"

Greedy <.+>:
  < matches → . greedily consumes "b>bold</b" → > matches
  Result: "<b>bold</b>" (one large match)

Non-greedy <.+?>:
  < matches → . consumes minimum "b" → > matches
  Result: "<b>" (minimum match)
  Continues: "<" matches → "..." → Result: "</b>"
```

---

## 6. Practical Pattern Examples

### 6.1 Basic Validation Patterns

```python
import re

# Japanese postal code
postal_code = re.compile(r'^\d{3}-\d{4}$')
assert postal_code.match('100-0001')
assert not postal_code.match('1000001')
assert not postal_code.match('100-000')

# Japanese mobile phone number
mobile_phone = re.compile(r'^0[789]0-\d{4}-\d{4}$')
assert mobile_phone.match('090-1234-5678')
assert mobile_phone.match('080-1234-5678')
assert not mobile_phone.match('03-1234-5678')

# Date in ISO format (YYYY-MM-DD)
date_pattern = re.compile(r'^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$')
assert date_pattern.match('2026-02-15')
assert date_pattern.match('2026-12-31')
assert not date_pattern.match('2026-13-01')
assert not date_pattern.match('2026-00-15')

# Time (HH:MM:SS)
time_pattern = re.compile(r'^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$')
assert time_pattern.match('00:00:00')
assert time_pattern.match('23:59:59')
assert not time_pattern.match('24:00:00')
assert not time_pattern.match('12:60:00')
```

### 6.2 Text Extraction Patterns

```python
import re

# Extract links from Markdown
text = "See the [official site](https://example.com) and [FAQ](https://example.com/faq) for details"
links = re.findall(r'\[([^\]]+)\]\(([^)]+)\)', text)
for label, url in links:
    print(f"  {label} → {url}")
# => official site → https://example.com
# => FAQ → https://example.com/faq

# Extract hashtags
tweet = "Beautiful weather today #sunny #tokyo Amazing!"
tags = re.findall(r'#(\w+)', tweet)
print(tags)  # => ['sunny', 'tokyo']

# Quoted strings
text = 'She said "hello" and "goodbye"'
quoted = re.findall(r'"([^"]*)"', text)
print(quoted)  # => ['hello', 'goodbye']

# Key-value pair extraction
config = "host=localhost port=3306 db=mydb user=admin"
pairs = re.findall(r'(\w+)=(\S+)', config)
print(dict(pairs))  # => {'host': 'localhost', 'port': '3306', 'db': 'mydb', 'user': 'admin'}
```

### 6.3 Text Replacement Patterns

```python
import re

# 1. Snake case → camel case
def snake_to_camel(name):
    return re.sub(r'_([a-z])', lambda m: m.group(1).upper(), name)

print(snake_to_camel('hello_world'))    # => 'helloWorld'
print(snake_to_camel('my_var_name'))    # => 'myVarName'

# 2. Camel case → snake case
def camel_to_snake(name):
    return re.sub(r'(?<!^)(?=[A-Z])', '_', name).lower()

print(camel_to_snake('helloWorld'))    # => 'hello_world'
print(camel_to_snake('myVarName'))     # => 'my_var_name'

# 3. Normalize consecutive whitespace
text = "hello   world\t\t\tnext"
print(re.sub(r'\s+', ' ', text))  # => 'hello world next'

# 4. Remove HTML tags
html = "<p>Hello <b>World</b></p>"
print(re.sub(r'<[^>]+>', '', html))  # => 'Hello World'

# 5. Date format conversion (YYYY/MM/DD → YYYY-MM-DD)
date = "2026/02/15"
print(re.sub(r'(\d{4})/(\d{2})/(\d{2})', r'\1-\2-\3', date))
# => '2026-02-15'

# 6. Detect and fix duplicate words using backreferences
text = "the the quick brown fox fox"
print(re.sub(r'\b(\w+)\s+\1\b', r'\1', text))
# => 'the quick brown fox'
```

---

## 7. Anti-patterns

### 7.1 Anti-pattern: Not Using Raw Strings

```python
import re

# BAD: Writing regex without raw strings
pattern_bad = "\\b\\w+\\b"  # Hard to read, prone to escape mistakes

# GOOD: Using raw strings
pattern_good = r"\b\w+\b"   # Clear and less error-prone

text = "hello world"
print(re.findall(pattern_good, text))  # => ['hello', 'world']

# A particularly dangerous example:
# "\b" in Python is the backspace character (0x08)
# r"\b" is the regex word boundary
print("\b" == "\x08")   # => True  -- backspace!
print(r"\b" == "\\b")   # => True  -- regex \b
```

### 7.2 Anti-pattern: Overuse of Dot

```python
import re

# BAD: Matching anything with dot
pattern_bad = r'\d+.\d+.\d+'

# This matches not only "192.168.1.1" but also:
texts = ["192.168.1.1", "192-168-1-1", "192x168x1x1", "192 168 1 1"]
for t in texts:
    m = re.search(pattern_bad, t)
    if m:
        print(f"  Match: {m.group()}")  # All match

# GOOD: Escape the dot to be explicit
pattern_good = r'\d+\.\d+\.\d+\.\d+'
for t in texts:
    m = re.search(pattern_good, t)
    if m:
        print(f"  Match: {m.group()}")  # Only "192.168.1.1" matches
```

### 7.3 Anti-pattern: Unnecessarily Complex Patterns

```python
import re

# BAD: Cases where regex is unnecessary

# Simple string search is sufficient with the in operator
text = "hello world"

# BAD
if re.search(r'hello', text):
    pass

# GOOD (fast and clear)
if 'hello' in text:
    pass

# BAD: Using regex to check start/end
if re.match(r'^hello', text):
    pass

# GOOD
if text.startswith('hello'):
    pass

# BAD: Using regex for fixed string replacement
re.sub(r'hello', 'hi', text)

# GOOD
text.replace('hello', 'hi')
```

### 7.4 Anti-pattern: Confusing match() and search()

```python
import re

text = "say hello world"

# match() only attempts matching from the start of the string
m = re.match(r'hello', text)
print(m)  # => None  *Start is 'say', so no match

# search() searches the entire string
m = re.search(r'hello', text)
print(m.group())  # => 'hello'

# fullmatch() checks if the entire string matches
m = re.fullmatch(r'hello', "hello")
print(m.group())  # => 'hello'

m = re.fullmatch(r'hello', "hello world")
print(m)  # => None  *Extra characters at the end

# Best practices for full matching:
# Use fullmatch() for input validation (Python 3.4+)
# Use search() for text searching
# Use match() for line-start matching
```

---

## 8. Performance Tips

### 8.1 Pattern Pre-compilation

```python
import re
import time

text_lines = [f"line {i}: some text here" for i in range(100000)]

# BAD: Using string pattern in every iteration
start = time.time()
for line in text_lines:
    re.search(r'\d+', line)
print(f"Not compiled: {time.time() - start:.3f}s")

# GOOD: Pre-compile
pattern = re.compile(r'\d+')
start = time.time()
for line in text_lines:
    pattern.search(line)
print(f"Pre-compiled: {time.time() - start:.3f}s")

# Note: Python's re module has an internal cache (up to 512 patterns),
#    so the difference is small when reusing a few patterns repeatedly,
#    but explicit compilation makes the intent clear
```

### 8.2 Writing Efficient Patterns

```python
import re

# 1. Character classes are faster than alternatives
# BAD
pattern_slow = r'a|b|c|d|e'
# GOOD
pattern_fast = r'[a-e]'

# 2. Non-capturing groups save memory
# BAD (when capture is not needed)
pattern_slow = r'(foo|bar|baz)+'
# GOOD
pattern_fast = r'(?:foo|bar|baz)+'

# 3. Anchors limit the search scope
# BAD
pattern_slow = r'error'  # Scans the entire string
# GOOD (when error is at the start of line)
pattern_fast = r'^error'  # Only checks the start of each line

# 4. Specific patterns are preferred
# BAD
pattern_slow = r'.+@.+\..+'  # Too vague
# GOOD
pattern_fast = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'

# 5. Place longer alternatives first
# BAD (shorter alternative matches first, causing issues)
pattern_slow = r'Java|JavaScript'
# GOOD
pattern_fast = r'JavaScript|Java'
```


---

## Hands-on Exercises

### Exercise 1: Basic Implementation

Implement code that satisfies the following requirements.

**Requirements:**
- Validate input data
- Implement appropriate error handling
- Create test code as well

```python
# Exercise 1: Basic implementation template
class Exercise1:
    """Exercise for basic implementation patterns"""

    def __init__(self):
        self.data = []

    def validate_input(self, value):
        """Validate input value"""
        if value is None:
            raise ValueError("Input value is None")
        return True

    def process(self, value):
        """Main processing logic"""
        self.validate_input(value)
        self.data.append(value)
        return self.data

    def get_results(self):
        """Retrieve processing results"""
        return {
            'count': len(self.data),
            'data': self.data
        }

# Tests
def test_exercise1():
    ex = Exercise1()
    assert ex.process(1) == [1]
    assert ex.process(2) == [1, 2]
    assert ex.get_results()['count'] == 2

    try:
        ex.process(None)
        assert False, "An exception should have been raised"
    except ValueError:
        pass

    print("All tests passed!")

test_exercise1()
```

### Exercise 2: Advanced Patterns

Extend the basic implementation by adding the following features.

```python
# Exercise 2: Advanced patterns
from typing import List, Dict, Optional
from datetime import datetime

class AdvancedExercise:
    """Exercise for advanced patterns"""

    def __init__(self, max_size: int = 100):
        self._items: List[Dict] = []
        self._max_size = max_size
        self._created_at = datetime.now()

    def add(self, key: str, value: any) -> bool:
        """Add an item (with size limit)"""
        if len(self._items) >= self._max_size:
            return False
        self._items.append({
            'key': key,
            'value': value,
            'timestamp': datetime.now().isoformat()
        })
        return True

    def find(self, key: str) -> Optional[Dict]:
        """Search by key"""
        for item in reversed(self._items):
            if item['key'] == key:
                return item
        return None

    def remove(self, key: str) -> bool:
        """Remove by key"""
        for i, item in enumerate(self._items):
            if item['key'] == key:
                self._items.pop(i)
                return True
        return False

    def stats(self) -> Dict:
        """Statistical information"""
        return {
            'total_items': len(self._items),
            'max_size': self._max_size,
            'usage_percent': len(self._items) / self._max_size * 100,
            'uptime': str(datetime.now() - self._created_at)
        }

# Tests
def test_advanced():
    ex = AdvancedExercise(max_size=3)
    assert ex.add("a", 1) == True
    assert ex.add("b", 2) == True
    assert ex.add("c", 3) == True
    assert ex.add("d", 4) == False  # Size limit
    assert ex.find("b")['value'] == 2
    assert ex.remove("b") == True
    assert ex.find("b") is None
    stats = ex.stats()
    assert stats['total_items'] == 2
    print("All advanced tests passed!")

test_advanced()
```

### Exercise 3: Performance Optimization

Improve the performance of the following code.

```python
# Exercise 3: Performance optimization
import time
from functools import lru_cache

# Before optimization (O(n^2))
def slow_search(data: list, target: int) -> int:
    """Inefficient search"""
    for i in range(len(data)):
        for j in range(i + 1, len(data)):
            if data[i] + data[j] == target:
                return (i, j)
    return (-1, -1)

# After optimization (O(n))
def fast_search(data: list, target: int) -> tuple:
    """Efficient search using a hash map"""
    seen = {}
    for i, num in enumerate(data):
        complement = target - num
        if complement in seen:
            return (seen[complement], i)
        seen[num] = i
    return (-1, -1)

# Benchmark
def benchmark():
    import random
    data = list(range(5000))
    random.shuffle(data)
    target = data[100] + data[4000]

    start = time.time()
    result1 = slow_search(data, target)
    slow_time = time.time() - start

    start = time.time()
    result2 = fast_search(data, target)
    fast_time = time.time() - start

    print(f"Inefficient: {slow_time:.4f}s")
    print(f"Efficient:   {fast_time:.6f}s")
    print(f"Speedup:     {slow_time/fast_time:.0f}x")

benchmark()
```

**Key Points:**
- Be mindful of algorithmic complexity
- Choose appropriate data structures
- Measure the effect with benchmarks

---

## Troubleshooting

### Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| Initialization error | Configuration file issues | Verify configuration file path and format |
| Timeout | Network latency / resource shortage | Adjust timeout values, add retry logic |
| Out of memory | Data volume growth | Introduce batch processing, implement pagination |
| Permission error | Insufficient access permissions | Verify executing user's permissions, review settings |
| Data inconsistency | Concurrent processing conflicts | Introduce locking mechanisms, transaction management |

### Debugging Procedure

1. **Check error messages**: Read the stack trace and identify the location of occurrence
2. **Establish reproduction steps**: Reproduce the error with minimal code
3. **Formulate hypotheses**: List possible causes
4. **Verify incrementally**: Use log output and debuggers to test hypotheses
5. **Fix and regression test**: After fixing, also run tests on related areas

```python
# Debugging utility
import logging
import traceback
from functools import wraps

# Logger configuration
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s [%(levelname)s] %(name)s: %(message)s'
)
logger = logging.getLogger(__name__)

def debug_decorator(func):
    """Decorator that logs function input/output"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        logger.debug(f"Called: {func.__name__}(args={args}, kwargs={kwargs})")
        try:
            result = func(*args, **kwargs)
            logger.debug(f"Return value: {func.__name__} -> {result}")
            return result
        except Exception as e:
            logger.error(f"Exception occurred: {func.__name__}: {e}")
            logger.error(traceback.format_exc())
            raise
    return wrapper

@debug_decorator
def process_data(items):
    """Data processing (debug target)"""
    if not items:
        raise ValueError("Empty data")
    return [item * 2 for item in items]
```

### Diagnosing Performance Issues

Diagnostic procedure when performance problems occur:

1. **Identify bottlenecks**: Measure with profiling tools
2. **Check memory usage**: Check for memory leaks
3. **Check I/O waits**: Examine disk and network I/O conditions
4. **Check concurrent connections**: Examine connection pool status

| Problem Type | Diagnostic Tools | Countermeasures |
|-------------|-----------------|-----------------|
| CPU load | cProfile, py-spy | Algorithm improvement, parallelization |
| Memory leak | tracemalloc, objgraph | Proper release of references |
| I/O bottleneck | strace, iostat | Asynchronous I/O, caching |
| DB latency | EXPLAIN, slow query log | Indexing, query optimization |

---

## Design Decision Guide

### Selection Criteria Matrix

The following summarizes the criteria for making technology choices.

| Criterion | Prioritize When | Acceptable to Compromise When |
|-----------|----------------|------------------------------|
| Performance | Real-time processing, large-scale data | Admin panels, batch processing |
| Maintainability | Long-term operation, team development | Prototypes, short-term projects |
| Scalability | Services expected to grow | Internal tools, fixed user base |
| Security | Personal information, financial data | Public data, internal use |
| Development speed | MVP, time-to-market | Quality-focused, mission-critical |

### Architecture Pattern Selection

```
┌─────────────────────────────────────────────────┐
│          Architecture Selection Flow              │
├─────────────────────────────────────────────────┤
│                                                 │
│  (1) Team size?                                  │
│    ├─ Small (1-5 people) → Monolith              │
│    └─ Large (10+ people) → Go to (2)             │
│                                                 │
│  (2) Deployment frequency?                       │
│    ├─ Once a week or less → Monolith +           │
│    │  modular decomposition                      │
│    └─ Daily/multiple times → Go to (3)           │
│                                                 │
│  (3) Team independence?                          │
│    ├─ High → Microservices                       │
│    └─ Moderate → Modular monolith                │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Trade-off Analysis

Technical decisions always involve trade-offs. Analyze from the following perspectives:

**1. Short-term vs Long-term Cost**
- A quick short-term approach can become technical debt in the long run
- Conversely, over-engineering has high short-term costs and can delay the project

**2. Consistency vs Flexibility**
- A unified technology stack has lower learning costs
- Adopting diverse technologies enables best-fit solutions but increases operational costs

**3. Level of Abstraction**
- High abstraction offers great reusability but can make debugging difficult
- Low abstraction is intuitive but prone to code duplication

```python
# Design decision recording template
class ArchitectureDecisionRecord:
    """Create an ADR (Architecture Decision Record)"""

    def __init__(self, title: str):
        self.title = title
        self.context = ""
        self.decision = ""
        self.consequences = []
        self.alternatives = []

    def set_context(self, context: str):
        """Describe the background and problem"""
        self.context = context
        return self

    def set_decision(self, decision: str):
        """Describe the decision"""
        self.decision = decision
        return self

    def add_consequence(self, consequence: str, positive: bool = True):
        """Add a consequence"""
        self.consequences.append({
            'description': consequence,
            'type': 'positive' if positive else 'negative'
        })
        return self

    def add_alternative(self, name: str, reason_rejected: str):
        """Add a rejected alternative"""
        self.alternatives.append({
            'name': name,
            'reason_rejected': reason_rejected
        })
        return self

    def to_markdown(self) -> str:
        """Output in Markdown format"""
        md = f"# ADR: {self.title}\n\n"
        md += f"## Background\n{self.context}\n\n"
        md += f"## Decision\n{self.decision}\n\n"
        md += "## Consequences\n"
        for c in self.consequences:
            icon = "+" if c['type'] == 'positive' else "!"
            md += f"- {icon} {c['description']}\n"
        md += "\n## Rejected Alternatives\n"
        for a in self.alternatives:
            md += f"- **{a['name']}**: {a['reason_rejected']}\n"
        return md
```
---

## 9. FAQ

### Q1: What if it's tedious to escape every metacharacter?

**A**: Most languages have a function to "escape the entire string":

```python
import re
user_input = "price is $10.00 (tax+)"
escaped = re.escape(user_input)
print(escaped)  # => 'price\\ is\\ \\$10\\.00\\ \\(tax\\+\\)'

# Can be safely used as a regex pattern
pattern = re.compile(escaped)
```

In JavaScript, you can achieve the same with `string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')`.

### Q2: How do I make `.` match newlines too?

**A**: Use the DOTALL (Python) / `s` flag (JavaScript ES2018+):

```python
import re
text = "line1\nline2\nline3"
# Default: dot does not match newlines
print(re.search(r'line1.+line3', text))  # => None

# DOTALL: dot matches newlines too
m = re.search(r'line1.+line3', text, re.DOTALL)
print(m.group())  # => 'line1\nline2\nline3'
```

Alternatively, you can use `[\s\S]` which works in any language.

### Q3: Can multiple regex flags be used simultaneously?

**A**: Yes. In Python, combine them with bitwise OR (`|`):

```python
import re
pattern = re.compile(r'^hello.+world$', re.IGNORECASE | re.MULTILINE | re.DOTALL)
# JavaScript: /^hello.+world$/ims
# Perl: /^hello.+world$/ims
```

In Python, inline flags `(?ims)` can also be used:
```python
pattern = re.compile(r'(?ims)^hello.+world$')
```

### Q4: Does \d match full-width digits?

**A**: It depends on the engine and flags:

```python
import re

# Python default (Unicode mode)
print(re.findall(r'\d+', "half-width 123 full-width \uff11\uff12\uff13"))
# => ['123', '\uff11\uff12\uff13']  *Also matches full-width digits!

# Restrict to ASCII mode
print(re.findall(r'\d+', "half-width 123 full-width \uff11\uff12\uff13", re.ASCII))
# => ['123']  *Half-width digits only

# JavaScript /u flag
# /\d+/u matches Unicode digits
# /\d+/ matches ASCII digits only (varies by engine)
```

### Q5: What is the difference between match(), search(), and fullmatch()?

**A**:

```python
import re

text = "hello world"

# match(): attempts matching from the start of the string only
re.match(r'hello', text)       # => match
re.match(r'world', text)       # => None

# search(): searches the entire string
re.search(r'hello', text)      # => match
re.search(r'world', text)      # => match

# fullmatch(): checks if the entire string matches the pattern
re.fullmatch(r'hello', text)   # => None
re.fullmatch(r'hello world', text)  # => match
```

### Q6: How do I write comments in regex?

**A**: Use verbose mode (`re.VERBOSE` / `re.X`):

```python
import re

pattern = re.compile(r'''
    ^                   # Start of string
    (?P<protocol>       # Protocol portion
        https?          #   http or https
    )
    ://                 # Scheme separator
    (?P<host>           # Host portion
        [^/]+           #   One or more non-slash characters
    )
    (?P<path>           # Path portion (optional)
        /[^\s]*         #   Starts with a slash
    )?
    $                   # End of string
''', re.VERBOSE)

m = pattern.match('https://example.com/path/to/page')
if m:
    print(m.groupdict())
    # => {'protocol': 'https', 'host': 'example.com', 'path': '/path/to/page'}
```

When a literal space is needed inside verbose mode, use `\ ` or the class `[ ]`.

---


## FAQ

### Q1: What is the most important point in learning this topic?

Gaining practical experience is the most important. Understanding deepens not only through theory, but by actually writing code and verifying its behavior.

### Q2: What common mistakes do beginners make?

Skipping the basics and jumping to advanced topics. We recommend thoroughly understanding the fundamental concepts explained in this guide before moving on to the next step.

### Q3: How is this used in professional practice?

Knowledge of this topic is frequently applied in daily development work. It becomes especially important during code reviews and architecture design.

---

## Summary

| Item | Description |
|------|-------------|
| Literal characters | Match the corresponding character directly |
| Metacharacters | 13 types: `. ^ $ * + ? \| ( ) [ ] { } \` |
| Escaping | `\` reverts metacharacters to literals |
| Raw strings | `r"..."` disables language-level escaping (Python) |
| Shorthands | Abbreviated notations such as `\d` `\w` `\s` `\b` |
| Flags | `i` (case-insensitive), `m` (multiline), `s` (dotall), `x` (verbose) |
| Double escaping | Two layers of escaping occur at the source code and regex engine levels |
| Inline flags | Embed flags within patterns using `(?i)` `(?m)` `(?s)` `(?x)` |
| Pre-compilation | Create pattern objects with `re.compile()` for reuse |
| re.escape() | Automatically escapes metacharacters in user input |
| Golden rule | Always use raw strings, and use dot only when necessary |

---

## Recommended Next Guides

- [02-character-classes.md](./02-character-classes.md) -- Character Classes: `[abc]`, `\d`, `\w`, `\s`, POSIX classes
- [03-quantifiers-anchors.md](./03-quantifiers-anchors.md) -- Quantifiers and Anchors in Detail

---

## References

1. **Jeffrey E.F. Friedl** "Mastering Regular Expressions, 3rd Edition" O'Reilly Media, 2006 -- Chapter 3 "Basic Syntax" is especially helpful
2. **Python re module documentation** https://docs.python.org/3/library/re.html -- Official reference for Python regular expressions
3. **MDN Web Docs - Regular Expressions** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions -- Comprehensive guide to JavaScript regular expressions
4. **Java Pattern class documentation** https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/util/regex/Pattern.html -- Official reference for Java regular expressions
5. **Ruby Regexp documentation** https://docs.ruby-lang.org/en/3.2/Regexp.html -- Official reference for Ruby regular expressions



===== SOURCE: 02-programming/regex-and-text-processing/docs/00-basics/02-character-classes.md =====

# Character Classes -- [abc], \d, \w, \s, POSIX

> Character classes are a core feature of regular expressions, defining "the set of characters that may match at a given position." This guide covers bracket notation, shorthand classes, and POSIX classes comprehensively.

## What You Will Learn in This Chapter

1. **Bracket character class `[...]` syntax and behavior** -- Precise rules for positive, negative, and range specifications
2. **Shorthand class meanings and cross-language differences** -- How `\d` `\w` `\s` differ in Unicode support across languages
3. **POSIX character classes and practical selection criteria** -- When to use `[:alpha:]`, `[:digit:]`, etc.
4. **Leveraging Unicode character properties** -- Specifying Unicode categories with `\p{L}`, `\p{N}`, etc.
5. **Set operations on character classes** -- Implementing intersection, subtraction, and union


## Prerequisites

Before reading this guide, the following knowledge will help deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts
- Understanding of the content in [Basic Syntax -- Literals, Metacharacters, Escaping](./01-basic-syntax.md)

---

## 1. Bracket Character Class `[...]`

### 1.1 Basic Form

```python
import re

# [abc] -- matches any single character: a, b, or c
print(re.findall(r'[abc]', "abcdef"))
# => ['a', 'b', 'c']

# [aeiou] -- matches a single vowel
text = "Hello World"
print(re.findall(r'[aeiou]', text, re.IGNORECASE))
# => ['e', 'o', 'o']

# Character order within a class has no significance
# [abc], [cba], and [bac] are all equivalent
```

```python
# Basic usage of character classes

import re

# 1. Selecting from a specific character set
vowels = re.compile(r'[aeiouAEIOU]')
text = "Hello Beautiful World"
print(vowels.findall(text))
# => ['e', 'o', 'E', 'a', 'u', 'i', 'u', 'o']

# 2. Note that a character class matches "one character" at a time
print(re.findall(r'[abc]', "aabbcc"))
# => ['a', 'a', 'b', 'b', 'c', 'c']  # Each character matches individually

# 3. Combine with quantifiers to match multiple characters
print(re.findall(r'[abc]+', "aabbcc def aab"))
# => ['aabbcc', 'aab']

# 4. Order within a character class is irrelevant
assert re.findall(r'[abc]', "abc") == re.findall(r'[cba]', "abc")
assert re.findall(r'[abc]', "abc") == re.findall(r'[bca]', "abc")
```

### 1.2 Range Specification `-`

```python
import re

# [a-z]  lowercase alphabetic characters
# [A-Z]  uppercase alphabetic characters
# [0-9]  digits
# [a-zA-Z0-9]  alphanumeric characters

text = "Item-42: Price $9.99"

# Alphabetic characters only
print(re.findall(r'[a-zA-Z]+', text))
# => ['Item', 'Price']

# Digits only
print(re.findall(r'[0-9]+', text))
# => ['42', '9', '99']

# Combining multiple ranges
print(re.findall(r'[a-zA-Z0-9]+', text))
# => ['Item', '42', 'Price', '9', '99']

# To include a literal hyphen:
# At the start: [-abc]  At the end: [abc-]  Escaped: [a\-c]
print(re.findall(r'[-+*/]', "3+4-2*1/5"))
# => ['+', '-', '*', '/']
```

```python
# Range specification details

import re

# Multiple contiguous ranges
# Alphanumeric characters and underscore
print(re.findall(r'[a-zA-Z0-9_]+', "hello_world 123"))
# => ['hello_world', '123']

# Hexadecimal characters
print(re.findall(r'[0-9a-fA-F]+', "0xFF 0xAB 0xGG"))
# => ['0', 'xFF', '0', 'xAB', '0', 'xGG']  # xGG is invalid hex

# A more precise hexadecimal pattern
print(re.findall(r'0x[0-9a-fA-F]+', "0xFF 0xAB 0xGG"))
# => ['0xFF', '0xAB']  # 0xGG does not partially match

# Partial ranges
print(re.findall(r'[a-f]+', "abcdefghij"))
# => ['abcdef']

print(re.findall(r'[2-7]+', "0123456789"))
# => ['234567']

# Multiple independent ranges
print(re.findall(r'[a-cm-o1-3]+', "abcmnop123456"))
# => ['abc', 'mno', '123']
```

### 1.3 Negated Character Class `[^...]`

```python
import re

# [^abc] -- matches any single character except a, b, or c
print(re.findall(r'[^abc]', "abcdef"))
# => ['d', 'e', 'f']

# [^0-9] -- anything except digits
print(re.findall(r'[^0-9]+', "abc123def456"))
# => ['abc', 'def']

# ^ means negation only when at the start
# [a^b] -- matches a, ^, or b (^ is treated as a literal)
print(re.findall(r'[a^b]', "a^b"))
# => ['a', '^', 'b']
```

```python
# Practical uses of negated character classes

import re

# 1. Extract content inside quotes (excluding the quotes themselves)
text = '"hello" and "world"'
print(re.findall(r'"([^"]*)"', text))
# => ['hello', 'world']

# 2. Extract HTML tag attribute values
html = '<a href="https://example.com" class="link">'
print(re.findall(r'(\w+)="([^"]*)"', html))
# => [('href', 'https://example.com'), ('class', 'link')]

# 3. Fields separated by commas (excluding the commas)
csv_line = "field1,field2,field3"
print(re.findall(r'[^,]+', csv_line))
# => ['field1', 'field2', 'field3']

# 4. Last component of a path (after the final slash)
path = "/usr/local/bin/python3"
print(re.findall(r'[^/]+$', path))
# => ['python3']

# 5. Extract file extension (after the dot)
filename = "document.backup.tar.gz"
print(re.findall(r'[^.]+', filename))
# => ['document', 'backup', 'tar', 'gz']

# 6. Consecutive non-whitespace characters
text = "  hello   world  "
print(re.findall(r'[^\s]+', text))
# => ['hello', 'world']

# 7. Match excluding specific characters
# Exclude control characters and special characters
text = "hello\x00world\x1b[31mred"
print(re.findall(r'[^\x00-\x1f\x7f]+', text))
# => ['hello', 'world', '[31mred']
```

### 1.4 Metacharacter Rules Inside Character Classes

```
Characters with special meaning inside brackets [...]:

Char   Meaning                    How to use as literal
----   -------                    ---------------------
]      End of class               Place at start: []abc] or escape: [\]]
\      Escape                     Escape: [\\]
^      Negation (start only)      Place anywhere but start: [a^b]
-      Range (between chars only) Place at start/end: [-abc] [abc-]

Inside brackets, . * + ? | ( ) { } are treated as literals:
  [.*+?]  -> dot, asterisk, plus, question mark
```

```python
# Verifying metacharacter behavior

import re

# Most metacharacters are literals inside a character class
print(re.findall(r'[.+*?|(){}]', "a.b+c*d?e|f(g)h{i}"))
# => ['.', '+', '*', '?', '|', '(', ')', '{', '}']

# How to include ] in a character class
# Method 1: Place at the start
print(re.findall(r'[]ab]', "a]b"))
# => ['a', ']', 'b']

# Method 2: Escape
print(re.findall(r'[a\]b]', "a]b"))
# => ['a', ']', 'b']

# Including \ in a character class
print(re.findall(r'[a\\b]', r"a\b"))
# => ['a', '\\', 'b']

# How to include - in a character class
# Method 1: At the start
print(re.findall(r'[-ab]', "a-b"))   # => ['a', '-', 'b']
# Method 2: At the end
print(re.findall(r'[ab-]', "a-b"))   # => ['a', '-', 'b']
# Method 3: Escape
print(re.findall(r'[a\-b]', "a-b"))  # => ['a', '-', 'b']

# Including ^ for purposes other than negation
# Place anywhere but the start
print(re.findall(r'[a^b]', "a^b"))   # => ['a', '^', 'b']
# Escape
print(re.findall(r'[\^ab]', "a^b"))  # => ['a', '^', 'b']
```

### 1.5 Character Class Combination Techniques

```python
import re

# 1. Combining shorthands with character classes
# Digits, hyphens, and dots (for phone numbers or IP addresses)
print(re.findall(r'[\d.-]+', "IP: 192.168.1.1 Tel: 03-1234-5678"))
# => ['192.168.1.1', '03-1234-5678']

# 2. Word characters and hyphens (CSS class names or slugs)
print(re.findall(r'[\w-]+', "my-class another_class third-class-name"))
# => ['my-class', 'another_class', 'third-class-name']

# 3. Combining negated shorthands with character classes
# Non-whitespace and non-comma
print(re.findall(r'[^\s,]+', "apple, banana, cherry"))
# => ['apple', 'banana', 'cherry']

# 4. Japanese-related character classes
# Hiragana
print(re.findall(r'[\u3040-\u309F]+', "こんにちは Hello 世界"))
# => ['こんにちは']

# Katakana
print(re.findall(r'[\u30A0-\u30FF]+', "カタカナ ひらがな ABC"))
# => ['カタカナ']

# Kanji (basic CJK Unified Ideographs block)
print(re.findall(r'[\u4E00-\u9FFF]+', "漢字テスト hello 東京タワー"))
# => ['漢字', '東京']

# Hiragana + Katakana + Kanji
print(re.findall(r'[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+',
                 "東京タワーへ行こう ABC 123"))
# => ['東京タワーへ行こう']

# 5. Detecting full-width characters
# Full-width alphanumeric
print(re.findall(r'[Ａ-Ｚａ-ｚ０-９]+', "Ｈｅｌｌｏ 123 Ｗｏｒｌｄ"))
# => ['Ｈｅｌｌｏ', 'Ｗｏｒｌｄ']
```

---

## 2. Shorthand Classes

### 2.1 List and Equivalent Expressions

```
┌──────────┬───────────┬─────────────────────────────────┐
│ Shorthand│  Negation │  Equivalent class (ASCII)         │
├──────────┼───────────┼─────────────────────────────────┤
│ \d       │ \D        │ [0-9]                           │
│ \w       │ \W        │ [a-zA-Z0-9_]                    │
│ \s       │ \S        │ [ \t\n\r\f\v]                   │
│ \b       │ \B        │ (Anchor: word/non-word boundary) │
└──────────┴───────────┴─────────────────────────────────┘

* In Unicode mode, the range expands significantly (see below)
```

### 2.2 Code Examples

```python
import re

text = "User: 田中太郎, Age: 25, Email: tanaka@example.com"

# \d -- digits
print(re.findall(r'\d+', text))
# => ['25']

# \w -- word characters (Unicode-aware in Python 3)
print(re.findall(r'\w+', text))
# => ['User', '田中太郎', 'Age', '25', 'Email', 'tanaka', 'example', 'com']

# \s -- whitespace characters
print(re.split(r'\s+', "hello   world\tfoo\nbar"))
# => ['hello', 'world', 'foo', 'bar']

# \D, \W, \S -- negated forms
print(re.findall(r'\D+', "abc123def456"))
# => ['abc', 'def']
```

### 2.3 Differences in \w Under Unicode Mode

```python
import re

text = "Hello 世界 café 123"

# Python 3: \w is Unicode-aware by default
print(re.findall(r'\w+', text))
# => ['Hello', '世界', 'café', '123']

# To restrict to ASCII mode
print(re.findall(r'\w+', text, re.ASCII))
# => ['Hello', 'caf', '123']  -- 'é' and '世界' do not match
```

```javascript
// JavaScript: Unicode support with the u flag
const text = "Hello 世界 café 123";

// Without u flag: \w is ASCII only
console.log(text.match(/\w+/g));
// => ['Hello', 'caf', '123']

// Unicode property escape (ES2018+)
console.log(text.match(/[\p{L}\p{N}]+/gu));
// => ['Hello', '世界', 'café', '123']
```

### 2.4 Detailed Unicode Behavior of \d

```python
import re

# Python 3's \d matches all Unicode digits
# Examples beyond ASCII digits:

test_strings = [
    "Half-width: 0123456789",             # ASCII digits
    "Full-width: ０１２３４５６７８９",     # Full-width digits
    "Arabic-Indic: ٠١٢٣٤٥٦٧٨٩",         # Arabic-Indic digits
    "Devanagari: ०१२३",                   # Devanagari digits
    "Thai: ๐๑๒๓๔๕๖๗๘๙",                # Thai digits
]

for s in test_strings:
    matches = re.findall(r'\d+', s)
    ascii_matches = re.findall(r'\d+', s, re.ASCII)
    print(f"  {s}")
    print(f"    Unicode \\d: {matches}")
    print(f"    ASCII \\d:   {ascii_matches}")

# Three ways to restrict to ASCII digits only:
# 1. re.ASCII flag
print(re.findall(r'\d+', "123 ０１２", re.ASCII))
# => ['123']

# 2. Explicit character class [0-9]
print(re.findall(r'[0-9]+', "123 ０１２"))
# => ['123']

# 3. Inline flag (?a)
print(re.findall(r'(?a)\d+', "123 ０１２"))
# => ['123']
```

### 2.5 Details of \s: Types of Whitespace Characters

```python
import re

# Characters matched by \s (ASCII mode)
whitespace_chars = {
    ' ':  'Space (0x20)',
    '\t': 'Tab (0x09)',
    '\n': 'Line Feed LF (0x0A)',
    '\r': 'Carriage Return CR (0x0D)',
    '\f': 'Form Feed (0x0C)',
    '\v': 'Vertical Tab (0x0B)',
}

for char, desc in whitespace_chars.items():
    matches = bool(re.match(r'\s', char))
    print(f"  {desc}: {'Match' if matches else 'No match'}")

# Additional whitespace characters in Unicode mode
unicode_spaces = {
    '\u00A0': 'No-Break Space (NBSP)',
    '\u2000': 'En Quad',
    '\u2001': 'Em Quad',
    '\u2002': 'En Space',
    '\u2003': 'Em Space',
    '\u2004': 'Three-Per-Em Space',
    '\u2005': 'Four-Per-Em Space',
    '\u2006': 'Six-Per-Em Space',
    '\u2007': 'Figure Space',
    '\u2008': 'Punctuation Space',
    '\u2009': 'Thin Space',
    '\u200A': 'Hair Space',
    '\u2028': 'Line Separator',
    '\u2029': 'Paragraph Separator',
    '\u202F': 'Narrow No-Break Space',
    '\u205F': 'Medium Mathematical Space',
    '\u3000': 'Ideographic Space (Full-width Space)',
    '\uFEFF': 'BOM (Byte Order Mark)',
}

for char, desc in unicode_spaces.items():
    # Python 3 uses Unicode mode by default
    matches_unicode = bool(re.match(r'\s', char))
    matches_ascii = bool(re.match(r'\s', char, re.ASCII))
    print(f"  {desc}: Unicode={matches_unicode}, ASCII={matches_ascii}")

# Practical example: handling full-width spaces
text = "Hello　World"  # Contains a full-width space
print(re.split(r'\s+', text))
# => ['Hello', 'World']  # Full-width space is also matched by \s

# In ASCII mode, full-width spaces are ignored
print(re.split(r'\s+', text, flags=re.ASCII))
# => ['Hello\u3000World']  # Full-width space is not matched
```

### 2.6 Detailed Look at \b Word Boundary

```python
import re

# \b matches a "position" (zero-width assertion)
# It does not consume characters

# Word boundary definition:
# The position between \w and \W
# The position at the start of the string if followed by \w
# The position at the end of the string if preceded by \w

text = "cat caterpillar concatenate category the_cat"

# \bcat\b: only the complete word "cat"
print(re.findall(r'\bcat\b', text))
# => ['cat']

# \bcat: words starting with "cat"
print(re.findall(r'\bcat\w*', text))
# => ['cat', 'caterpillar', 'concatenate', 'category']

# cat\b: words ending with "cat"
print(re.findall(r'\w*cat\b', text))
# => ['cat', 'the_cat']

# \B: non-word boundary (inside a word)
print(re.findall(r'\Bcat\B', text))
# => ['cat']  # The "cat" inside "concatenate"

# Practical example: exact word search
def find_exact_word(text, word):
    """Search for an exact word match"""
    pattern = r'\b' + re.escape(word) + r'\b'
    return re.findall(pattern, text)

print(find_exact_word("Java JavaScript JavaEE", "Java"))
# => ['Java']

# Word boundaries with Unicode
text = "東京は首都です。Tokyo is capital."
print(re.findall(r'\b\w+\b', text))
# => ['東京は首都です', 'Tokyo', 'is', 'capital']
# Since Japanese has no spaces between words, consecutive \w characters match together
```

### 2.7 Cross-Language Differences in Shorthands

```
Behavior of \w across languages:

┌──────────────┬──────────────────────────────────────────┐
│ Language     │ Range of \w                               │
├──────────────┼──────────────────────────────────────────┤
│ Python 3     │ Unicode Letters + Digits + _             │
│ (default)    │ → Matches Japanese, Chinese, etc.        │
├──────────────┼──────────────────────────────────────────┤
│ Python 3     │ [a-zA-Z0-9_]                             │
│ (re.ASCII)   │ → ASCII only                             │
├──────────────┼──────────────────────────────────────────┤
│ JavaScript   │ [a-zA-Z0-9_]                             │
│ (default)    │ → ASCII only                             │
├──────────────┼──────────────────────────────────────────┤
│ JavaScript   │ Use \p{L} for Unicode support            │
│ (/u flag)    │ → \w itself does not change              │
├──────────────┼──────────────────────────────────────────┤
│ Java         │ [a-zA-Z0-9_]                             │
│ (default)    │ → ASCII only                             │
├──────────────┼──────────────────────────────────────────┤
│ Java         │ Unicode Letters + Digits + _             │
│ (UNICODE_    │ → Matches Japanese, etc.                 │
│  CHARACTER_  │                                          │
│  CLASS)      │                                          │
├──────────────┼──────────────────────────────────────────┤
│ Perl         │ Unicode Letters + Digits + _             │
│              │ → Unicode-aware by default               │
├──────────────┼──────────────────────────────────────────┤
│ Ruby         │ Unicode Letters + Digits + _             │
│              │ → Unicode-aware by default               │
├──────────────┼──────────────────────────────────────────┤
│ Go           │ [0-9A-Za-z_]                             │
│ (RE2)        │ → ASCII only                             │
├──────────────┼──────────────────────────────────────────┤
│ Rust         │ Unicode-aware (regex crate)              │
│              │ → ASCII mode specified separately        │
└──────────────┴──────────────────────────────────────────┘
```

---

## 3. POSIX Character Classes

### 3.1 List

```
┌──────────────┬──────────────────────┬──────────────────┐
│ POSIX Class  │ Equivalent (ASCII)    │ Meaning          │
├──────────────┼──────────────────────┼──────────────────┤
│ [:alpha:]    │ [a-zA-Z]             │ Alphabetic chars │
│ [:digit:]    │ [0-9]                │ Digits           │
│ [:alnum:]    │ [a-zA-Z0-9]          │ Alphanumeric     │
│ [:upper:]    │ [A-Z]                │ Uppercase        │
│ [:lower:]    │ [a-z]                │ Lowercase        │
│ [:space:]    │ [ \t\n\r\f\v]        │ Whitespace       │
│ [:blank:]    │ [ \t]                │ Space & tab only │
│ [:punct:]    │ [!"#$%&'()*+,-./:;  │ Punctuation      │
│              │  <=>?@[\]^_`{|}~]    │                  │
│ [:print:]    │ [ -~]                │ Printable chars  │
│ [:graph:]    │ [!-~]                │ Printable (no sp)│
│ [:cntrl:]    │ [\x00-\x1f\x7f]     │ Control chars    │
│ [:xdigit:]   │ [0-9a-fA-F]          │ Hex digits       │
│ [:ascii:]    │ [\x00-\x7f]          │ ASCII chars      │
└──────────────┴──────────────────────┴──────────────────┘
```

### 3.2 Using POSIX Classes

```bash
# POSIX classes are primarily used in grep, sed, and awk

# Extract alphabetic characters only
# => Hello
# => World

# Extract digits only
# => 19
# => 99

# Extract hexadecimal digits
# => FF00AA

# Negating POSIX classes
echo "abc123" | grep -oE '[^[:digit:]]+'
# => abc
```

```bash
# Practical examples of POSIX classes

# 1. Extract alphanumeric characters and underscores (variable name pattern)
echo "hello-world my_var 123abc" | grep -oE '[[:alnum:]_]+'
# => hello
# => world
# => my_var
# => 123abc

# 2. Extract punctuation
# => ,
# => !
# => ?

# 3. Detect non-printable characters (control characters)
# => 2 (two control characters)

# 4. Split fields by whitespace (blank matches space and tab only)
# => 3

# 5. Using POSIX classes in sed
# => Hello  World

# 6. Convert uppercase to lowercase (POSIX class based)
# => hello world

# 7. Keep only safe filename characters
echo "my file (1).txt" | sed 's/[^[:alnum:]._-]/_/g'
# => my_file__1_.txt

# 8. Remove blank lines
# => Only non-empty lines are displayed
```

### 3.3 POSIX vs Shorthand Comparison

| Purpose | POSIX | Shorthand | Available Environments |
|---------|-------|-----------|----------------------|
| Word characters | None | `\w` | Shorthand only |

### 3.4 Notes on POSIX Classes

```bash
# Note 1: POSIX classes must always be used inside brackets
# NG: [:digit:] -- matches individual characters :, d, i, g, t

# Note 2: POSIX classes can be combined with other characters
echo "abc-123_def" | grep -oE '[[:alnum:]_-]+'
# => abc-123_def

# Note 3: Behavior changes depending on locale
# LC_ALL=C matches ASCII only
# LC_ALL=ja_JP.UTF-8 also matches Japanese
# => a, b (é does not match)

# => aéb (é also matches)

# Note 4: grep -P (PCRE) may not support POSIX classes
# grep -E (ERE) or grep (BRE) is recommended
```

---

## 4. Unicode Character Properties

### 4.1 Unicode General Category

```python
# Using Unicode properties with Python's regex module (third-party)
# pip install regex

# Usage examples with the regex module
try:
    import regex

    text = "Hello 世界 café 123 !@#"

    # \p{L} -- Unicode "Letter"
    print(regex.findall(r'\p{L}+', text))
    # => ['Hello', '世界', 'café']

    # \p{N} -- Unicode "Number"
    print(regex.findall(r'\p{N}+', text))
    # => ['123']

    # \p{P} -- Unicode "Punctuation"
    print(regex.findall(r'\p{P}', text))
    # => ['!']

    # \p{S} -- Unicode "Symbol"
    print(regex.findall(r'\p{S}', text))
    # => ['@', '#']

    # \p{Z} -- Unicode "Separator"
    # Spaces, etc.

except ImportError:
    # Fallback when the regex module is not available
    import re

    # Python's standard re does not directly support Unicode properties
    # Alternative: specify Unicode categories using ranges

    # Japanese characters (Hiragana, Katakana, Kanji)
    print(re.findall(r'[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+', text))
```

### 4.2 Major Unicode Categories

```
Unicode General Category:

L  (Letter)       -- Letters
├── Lu (Uppercase) -- Uppercase letters (A, B, C, ...)
├── Ll (Lowercase) -- Lowercase letters (a, b, c, ...)
├── Lt (Titlecase) -- Titlecase letters (Dž, Lj, ...)
├── Lm (Modifier)  -- Modifier letters
└── Lo (Other)     -- Other letters (Kanji, Hiragana, ...)

M  (Mark)          -- Marks (combining characters)
├── Mn (Nonspacing)
├── Mc (Spacing Combining)
└── Me (Enclosing)

N  (Number)        -- Numbers
├── Nd (Decimal)   -- Decimal digits (0-9, ０-９, ...)
├── Nl (Letter)    -- Letterlike numbers (Ⅰ, Ⅱ, ...)
└── No (Other)     -- Other numbers (½, ⅓, ...)

P  (Punctuation)   -- Punctuation
├── Pc (Connector) -- Connector punctuation (_)
├── Pd (Dash)      -- Dashes (-, –, —)
├── Ps (Open)      -- Opening brackets ((, [, {)
├── Pe (Close)     -- Closing brackets (), ], })
├── Pi (Initial)   -- Opening quotation marks («, ', ")
├── Pf (Final)     -- Closing quotation marks (», ', ")
└── Po (Other)     -- Other punctuation (., ,, !, ?)

S  (Symbol)        -- Symbols
├── Sm (Math)      -- Mathematical symbols (+, =, <, >)
├── Sc (Currency)  -- Currency symbols ($, €, ¥, £)
├── Sk (Modifier)  -- Modifier symbols
└── So (Other)     -- Other symbols (©, ®, ™)

Z  (Separator)     -- Separators
├── Zs (Space)     -- Space separators
├── Zl (Line)      -- Line separators
└── Zp (Paragraph) -- Paragraph separators

C  (Other)         -- Other
├── Cc (Control)   -- Control characters
├── Cf (Format)    -- Format characters (BOM, etc.)
├── Cs (Surrogate) -- Surrogates
├── Co (Private)   -- Private use characters
└── Cn (Unassigned)-- Unassigned
```

### 4.3 Character Classes by Unicode Script

```javascript
// JavaScript ES2018+ Unicode Property Escape

const text = "Hello こんにちは 世界 Привет مرحبا";

// Japanese Hiragana
console.log(text.match(/\p{Script=Hiragana}+/gu));
// => ['こんにちは']

// Kanji (Han)
console.log(text.match(/\p{Script=Han}+/gu));
// => ['世界']

// Cyrillic
console.log(text.match(/\p{Script=Cyrillic}+/gu));
// => ['Привет']

// Arabic
console.log(text.match(/\p{Script=Arabic}+/gu));
// => ['مرحبا']

// Latin
console.log(text.match(/\p{Script=Latin}+/gu));
// => ['Hello']

// Emoji
const emoji_text = "Hello! Nice day!";
console.log(emoji_text.match(/\p{Emoji}/gu));
// => ['', '']
```

```python
# Unicode Script with Python's regex module

try:
    import regex

    text = "Hello こんにちは 世界 カタカナ"

    # Hiragana
    print(regex.findall(r'\p{Hiragana}+', text))
    # => ['こんにちは']

    # Katakana
    print(regex.findall(r'\p{Katakana}+', text))
    # => ['カタカナ']

    # Kanji
    print(regex.findall(r'\p{Han}+', text))
    # => ['世界']

    # All Japanese (Hiragana + Katakana + Kanji)
    print(regex.findall(r'[\p{Hiragana}\p{Katakana}\p{Han}]+', text))
    # => ['こんにちは', '世界', 'カタカナ']

except ImportError:
    pass
```

### 4.4 ECMAScript 2024 v Flag (Unicode Sets)

```javascript
// The v flag in ECMAScript 2024 enables set operations on character classes

// Intersection (&&) -- characters in both sets
// /[\p{Script=Latin}&&\p{Letter}]/v

// Subtraction (--) -- left set minus right set
// /[\p{Letter}--\p{Script=Latin}]/v

// Union -- same as traditional character classes
// /[\p{Script=Latin}\p{Script=Greek}]/v

// Example: Latin characters excluding ASCII (accented characters only)
// /[\p{Script=Latin}--[a-zA-Z]]/v

// Example: Alphanumeric minus digits = letters only
// /[\p{Alnum}--\p{Number}]/v
```

---

## 5. Combination Patterns

### 5.1 Combining Character Classes

```python
import re

# Alphanumeric, hyphens, and underscores
slug_pattern = r'[a-zA-Z0-9_-]+'
print(re.findall(slug_pattern, "my-page_title 2026"))
# => ['my-page_title', '2026']

# Japanese characters (Unicode ranges)
jp_pattern = r'[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]+'
print(re.findall(jp_pattern, "Hello 東京タワーへ行こう"))
# => ['東京タワーへ行こう']

# Character class subtraction (.NET only)
# [a-z-[aeiou]] -- lowercase consonants only

# Character class intersection (Java)
# [a-z&&[^aeiou]] -- lowercase consonants only
```

### 5.2 Common Character Class Patterns

```python
import re

# Characters allowed in filenames
filename_pattern = r'[a-zA-Z0-9._-]+'
print(re.findall(filename_pattern, "report_2026-02.pdf"))
# => ['report_2026-02.pdf']

# Hexadecimal color codes
hex_color = r'#[0-9a-fA-F]{6}\b'
print(re.findall(hex_color, "color: #FF5733; bg: #00aaff;"))
# => ['#FF5733', '#00aaff']

# Quoted strings (excluding the quotes themselves)
quoted = r'"[^"]*"'
print(re.findall(quoted, 'name="John" age="25"'))
# => ['"John"', '"25"']

# Printable characters excluding control characters
printable = r'[^\x00-\x1f\x7f]+'
print(re.findall(printable, "hello\x00world\x1b[31m"))
# => ['hello', 'world', '[31m']
```

### 5.3 Advanced Character Class Patterns

```python
import re

# 1. Characters allowed in email local parts
local_part = r'[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+'
print(re.findall(local_part, "user.name+tag@example.com"))
# => ["user.name+tag"]

# 2. URL-safe characters (RFC 3986)
url_safe = r'[a-zA-Z0-9._~:/?#\[\]@!$&\'()*+,;=-]+'
print(re.findall(url_safe, "https://example.com/path?q=hello&lang=ja"))

# 3. Characters allowed in CSS selectors
css_selector = r'[a-zA-Z0-9_-]+'

# 4. Shell-safe filename characters
safe_filename = r'[a-zA-Z0-9._-]+'

# 5. SQL injection prevention: allow only alphanumeric and spaces
safe_input = r'^[a-zA-Z0-9 ]+$'

# 6. Base64 encoded strings
base64_pattern = r'[A-Za-z0-9+/]+=*'
print(re.findall(base64_pattern, "SGVsbG8gV29ybGQ= next"))
# => ['SGVsbG8gV29ybGQ=']

# 7. UUID pattern
uuid_pattern = r'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
print(re.findall(uuid_pattern, "id: 550e8400-e29b-41d4-a716-446655440000", re.IGNORECASE))
# => ['550e8400-e29b-41d4-a716-446655440000']

# 8. Semantic versioning
semver_pattern = r'[0-9]+\.[0-9]+\.[0-9]+(?:-[a-zA-Z0-9.]+)?(?:\+[a-zA-Z0-9.]+)?'
print(re.findall(semver_pattern, "v1.2.3-beta.1+build.123"))
# => ['1.2.3-beta.1+build.123']
```

---

## 6. ASCII Diagrams

### 6.1 Conceptual Diagram of Character Classes

```
Entire character space (Unicode: ~150,000 characters)
┌─────────────────────────────────────────┐
│                                         │
│   [a-z]  ┌─────────┐                   │
│          │a b c ... z│  26 characters   │
│          └─────────┘                    │
│                                         │
│   \d     ┌────────────┐                 │
│          │0 1 2 ... 9  │  10 characters │
│          │(Unicode: hundreds)│           │
│          └────────────┘                 │
│                                         │
│   \w     ┌──────────────────────┐       │
│          │a-z A-Z 0-9 _         │       │
│          │(Unicode: tens of thousands)│  │
│          └──────────────────────┘       │
│                                         │
│   \s     ┌──────────────┐               │
│          │Space TAB LF CR│  6 characters│
│          │FF VT          │              │
│          └──────────────┘               │
│                                         │
│   [^a-z] = complement of [a-z] above   │
│   \D     = complement of \d             │
│   \W     = complement of \w             │
│   \S     = complement of \s             │
└─────────────────────────────────────────┘
```

### 6.2 How Negated Character Classes Work

```
Pattern: [^aeiou]  (non-vowels)
Text:    "regex"

  r -> match [^aeiou]? -> 'r' is not a vowel -> Match
  e -> match [^aeiou]? -> 'e' is a vowel -> No match
  g -> match [^aeiou]? -> 'g' is not a vowel -> Match
  e -> match [^aeiou]? -> 'e' is a vowel -> No match
  x -> match [^aeiou]? -> 'x' is not a vowel -> Match

Result: r, g, x match
```

### 6.3 Range Specification Based on ASCII Codes

```
Ranges based on ASCII codes:

[0-9]  = ASCII 48-57
  48: '0'  49: '1'  50: '2' ... 57: '9'

[A-Z]  = ASCII 65-90
  65: 'A'  66: 'B'  67: 'C' ... 90: 'Z'

[a-z]  = ASCII 97-122
  97: 'a'  98: 'b'  99: 'c' ... 122: 'z'

Warning: [A-z] includes unintended characters!
  65: 'A' ... 90: 'Z'
  91: '['  92: '\'  93: ']'  94: '^'  95: '_'  96: '`'
  97: 'a' ... 122: 'z'

  -> [ \ ] ^ _ ` are also included!
  -> Use [A-Za-z] instead
```

### 6.4 Set Operations on Character Classes

```
Set operation concepts:

Union:        [a-z0-9]  = [a-z] ∪ [0-9]
Complement:   [^a-z]    = U \ [a-z]
Intersection: Java: [a-z&&[aeiou]]  = [a-z] ∩ [aeiou] = [aeiou]
Subtraction:  .NET: [a-z-[aeiou]]   = [a-z] \ [aeiou] = consonants

Visual representation:

     [a-z]           [aeiou]
  ┌──────────┐    ┌─────────┐
  │ bcdfgh...│    │ a e i   │
  │ jklmnp...│ ∩  │ o u     │
  │  a e i   │    │         │
  │  o u     │    │         │
  └──────────┘    └─────────┘

  Intersection [a-z&&[aeiou]] = {a, e, i, o, u}
  Subtraction  [a-z-[aeiou]]  = {b, c, d, f, g, h, ...}
```

---

## 7. Anti-Patterns

### 7.1 Anti-Pattern: Using [A-z]

```python
import re

# NG: [A-z] includes unexpected characters
pattern_bad = r'[A-z]+'
text = "Hello[World]_test"
print(re.findall(pattern_bad, text))
# => ['Hello[World]_test']  -- [ ] _ also match!

# OK: Use [A-Za-z]
pattern_good = r'[A-Za-z]+'
print(re.findall(pattern_good, text))
# => ['Hello', 'World', 'test']
```

### 7.2 Anti-Pattern: Ignoring Unicode Behavior of Shorthands

```python
import re

# NG: Forgetting that \d also matches Unicode digits
text = "Price: ١٢٣ yen"  # Arabic digits (U+0661, U+0662, U+0663)
print(re.findall(r'\d+', text))
# => ['١٢٣']  -- Python 3 matches Unicode digits

# This can be a security issue (unexpected values during numeric parsing)

# OK: Be explicit when targeting ASCII digits only
print(re.findall(r'[0-9]+', text))
# => []  -- ASCII digits only

# Or use the re.ASCII flag
print(re.findall(r'\d+', text, re.ASCII))
# => []
```

### 7.3 Anti-Pattern: Unnecessary Character Classes

```python
import re

# NG: Character class with only one character
pattern_bad = r'[a]'   # Same as 'a' but needlessly verbose
# NG: Wrapping a shorthand in a character class adds nothing
pattern_bad2 = r'[\d]'  # Same as \d

# OK: Write simply
pattern_good = r'a'
pattern_good2 = r'\d'

# However, character classes are needed when combining:
pattern_ok = r'[\d_-]'  # Digits, underscores, and hyphens
```

### 7.4 Anti-Pattern: Confusing Negated Character Classes with Dot

```python
import re

# NG: [^...] matches newlines but . does not
text = "hello\nworld"

# . does not match newlines by default
print(re.findall(r'.+', text))
# => ['hello', 'world']  # Split at the newline

# [^\n] is everything except newlines (equivalent to . but explicit)
print(re.findall(r'[^\n]+', text))
# => ['hello', 'world']

# [^a] also matches newlines!
print(re.findall(r'[^a]+', text))
# => ['hello\nworld']  # Includes the newline

# Not understanding this difference can cause bugs
```

### 7.5 Anti-Pattern: Overly Broad Character Classes

```python
import re

# NG: Using \d for numeric validation
# Port number validation
port = "65536"
if re.match(r'^\d+$', port):
    print("Valid port?")  # NG: 65536 is not a valid port number

# OK: Perform range checks in code, not with regex alone
def is_valid_port(s):
    if not re.match(r'^[0-9]+$', s):
        return False
    return 0 <= int(s) <= 65535

# NG: Using only \d{1,3} for IP address validation
ip_bad = r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$'
# Also matches 999.999.999.999

# OK: Validate each octet's range
ip_good = re.compile(r'''
    ^
    (?:
        (?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)  # 0-255
        \.
    ){3}
    (?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)      # 0-255
    $
''', re.VERBOSE)
```

---

## 8. Practical Pattern Collection

### 8.1 Japanese Text Processing

```python
import re

# Detecting Hiragana
hiragana = re.compile(r'[\u3040-\u309F]+')
print(hiragana.findall("東京タワーへ行こう"))
# => ['へ', 'こう']  # Hiragana parts: particles and verb endings

# Detecting Katakana
katakana = re.compile(r'[\u30A0-\u30FF]+')
print(katakana.findall("東京タワーへ行こう"))
# => ['タワー']

# Converting full-width alphanumeric to half-width
def zen_to_han(text):
    """Convert full-width alphanumeric characters to half-width"""
    return re.sub(r'[Ａ-Ｚａ-ｚ０-９]',
                  lambda m: chr(ord(m.group()) - 0xFEE0), text)

print(zen_to_han("Ｈｅｌｌｏ ０１２３"))
# => "Hello 0123"

# Mapping for half-width to full-width Katakana conversion
han_to_zen_map = str.maketrans(
    'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ',
    'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン'
)

def han_kata_to_zen(text):
    """Convert half-width Katakana to full-width"""
    return text.translate(han_to_zen_map)

# Japanese sentence splitting
sentences = re.split(r'[。！？\n]+', "今日は天気がいい。明日も晴れるだろう！楽しみだ。")
print([s for s in sentences if s])
# => ['今日は天気がいい', '明日も晴れるだろう', '楽しみだ']
```

### 8.2 Numeric Character Class Patterns

```python
import re

# Integers (positive/negative)
integer_pattern = r'[+-]?[0-9]+'
print(re.findall(integer_pattern, "x=42, y=-17, z=+3"))
# => ['+42', '-17', '+3']  # Leading + may also be an operator

# More precise integer pattern
integer_strict = r'(?<![0-9])[+-]?[0-9]+(?![0-9.])'

# Decimals (fixed-point)
decimal_pattern = r'[+-]?[0-9]+\.[0-9]+'
print(re.findall(decimal_pattern, "pi=3.14159, e=2.71828"))
# => ['3.14159', '2.71828']

# Scientific notation
scientific = r'[+-]?[0-9]+\.?[0-9]*[eE][+-]?[0-9]+'
print(re.findall(scientific, "speed=3.0e8 tiny=1.6e-19"))
# => ['3.0e8', '1.6e-19']

# Comma-separated numbers
comma_number = r'[0-9]{1,3}(?:,[0-9]{3})*'
print(re.findall(comma_number, "Population: 1,234,567 Area: 377,975"))
# => ['1,234,567', '377,975']

# Currency notation
currency = r'[¥$€£][0-9,]+(?:\.[0-9]{2})?'
print(re.findall(currency, "Price: $1,299.99 and ¥150,000"))
# => ['$1,299.99', '¥150,000']
```


---

## Hands-On Exercises

### Exercise 1: Basic Implementation

Implement code that satisfies the following requirements.

**Requirements:**
- Validate input data
- Implement proper error handling
- Create test code as well

```python
# Exercise 1: Basic implementation template
class Exercise1:
    """Exercise for basic implementation patterns"""

    def __init__(self):
        self.data = []

    def validate_input(self, value):
        """Validate the input value"""
        if value is None:
            raise ValueError("Input value is None")
        return True

    def process(self, value):
        """Main processing logic"""
        self.validate_input(value)
        self.data.append(value)
        return self.data

    def get_results(self):
        """Retrieve processing results"""
        return {
            'count': len(self.data),
            'data': self.data
        }

# Tests
def test_exercise1():
    ex = Exercise1()
    assert ex.process(1) == [1]
    assert ex.process(2) == [1, 2]
    assert ex.get_results()['count'] == 2

    try:
        ex.process(None)
        assert False, "An exception should have been raised"
    except ValueError:
        pass

    print("All tests passed!")

test_exercise1()
```

### Exercise 2: Advanced Patterns

Extend the basic implementation by adding the following features.

```python
# Exercise 2: Advanced patterns
from typing import List, Dict, Optional
from datetime import datetime

class AdvancedExercise:
    """Exercise for advanced patterns"""

    def __init__(self, max_size: int = 100):
        self._items: List[Dict] = []
        self._max_size = max_size
        self._created_at = datetime.now()

    def add(self, key: str, value: any) -> bool:
        """Add an item (with size limit)"""
        if len(self._items) >= self._max_size:
            return False
        self._items.append({
            'key': key,
            'value': value,
            'timestamp': datetime.now().isoformat()
        })
        return True

    def find(self, key: str) -> Optional[Dict]:
        """Search by key"""
        for item in reversed(self._items):
            if item['key'] == key:
                return item
        return None

    def remove(self, key: str) -> bool:
        """Delete by key"""
        for i, item in enumerate(self._items):
            if item['key'] == key:
                self._items.pop(i)
                return True
        return False

    def stats(self) -> Dict:
        """Statistics"""
        return {
            'total_items': len(self._items),
            'max_size': self._max_size,
            'usage_percent': len(self._items) / self._max_size * 100,
            'uptime': str(datetime.now() - self._created_at)
        }

# Tests
def test_advanced():
    ex = AdvancedExercise(max_size=3)
    assert ex.add("a", 1) == True
    assert ex.add("b", 2) == True
    assert ex.add("c", 3) == True
    assert ex.add("d", 4) == False  # Size limit
    assert ex.find("b")['value'] == 2
    assert ex.remove("b") == True
    assert ex.find("b") is None
    stats = ex.stats()
    assert stats['total_items'] == 2
    print("All advanced tests passed!")

test_advanced()
```

### Exercise 3: Performance Optimization

Improve the performance of the following code.

```python
# Exercise 3: Performance optimization
import time
from functools import lru_cache

# Before optimization (O(n^2))
def slow_search(data: list, target: int) -> int:
    """Inefficient search"""
    for i in range(len(data)):
        for j in range(i + 1, len(data)):
            if data[i] + data[j] == target:
                return (i, j)
    return (-1, -1)

# After optimization (O(n))
def fast_search(data: list, target: int) -> tuple:
    """Efficient search using a hash map"""
    seen = {}
    for i, num in enumerate(data):
        complement = target - num
        if complement in seen:
            return (seen[complement], i)
        seen[num] = i
    return (-1, -1)

# Benchmark
def benchmark():
    import random
    data = list(range(5000))
    random.shuffle(data)
    target = data[100] + data[4000]

    start = time.time()
    result1 = slow_search(data, target)
    slow_time = time.time() - start

    start = time.time()
    result2 = fast_search(data, target)
    fast_time = time.time() - start

    print(f"Inefficient version: {slow_time:.4f} sec")
    print(f"Efficient version:   {fast_time:.6f} sec")
    print(f"Speedup: {slow_time/fast_time:.0f}x")

benchmark()
```

**Key Points:**
- Be mindful of algorithmic complexity
- Choose appropriate data structures
- Measure effectiveness with benchmarks

---

## Troubleshooting

### Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| Initialization error | Configuration file issues | Check configuration file path and format |
| Timeout | Network latency / insufficient resources | Adjust timeout values, add retry logic |
| Out of memory | Increased data volume | Introduce batch processing, implement pagination |
| Permission error | Insufficient access permissions | Check execution user permissions, review settings |
| Data inconsistency | Concurrent processing conflicts | Introduce locking mechanisms, transaction management |

### Debugging Procedure

1. **Check the error message**: Read the stack trace to identify the location
2. **Establish reproduction steps**: Reproduce the error with minimal code
3. **Formulate hypotheses**: List possible causes
4. **Verify incrementally**: Use logging or debuggers to test hypotheses
5. **Fix and regression test**: After fixing, also run tests on related areas

```python
# Debugging utility
import logging
import traceback
from functools import wraps

# Logger configuration
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s [%(levelname)s] %(name)s: %(message)s'
)
logger = logging.getLogger(__name__)

def debug_decorator(func):
    """Decorator that logs function inputs and outputs"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        logger.debug(f"Called: {func.__name__}(args={args}, kwargs={kwargs})")
        try:
            result = func(*args, **kwargs)
            logger.debug(f"Return value: {func.__name__} -> {result}")
            return result
        except Exception as e:
            logger.error(f"Exception in: {func.__name__}: {e}")
            logger.error(traceback.format_exc())
            raise
    return wrapper

@debug_decorator
def process_data(items):
    """Data processing (debug target)"""
    if not items:
        raise ValueError("Empty data")
    return [item * 2 for item in items]
```

### Diagnosing Performance Issues

Steps for diagnosing performance problems:

1. **Identify the bottleneck**: Measure with profiling tools
2. **Check memory usage**: Look for memory leaks
3. **Check I/O waits**: Examine disk and network I/O status
4. **Check concurrent connections**: Examine connection pool status

| Problem Type | Diagnostic Tool | Solution |
|-------------|----------------|----------|
| CPU load | cProfile, py-spy | Algorithm improvement, parallelization |
| Memory leak | tracemalloc, objgraph | Proper reference cleanup |
| I/O bottleneck | strace, iostat | Asynchronous I/O, caching |
| DB latency | EXPLAIN, slow query log | Indexing, query optimization |

---

## Design Decision Guide

### Selection Criteria Matrix

The following summarizes criteria for making technology choices.

| Criterion | When to prioritize | When to compromise |
|-----------|-------------------|-------------------|
| Performance | Real-time processing, large-scale data | Admin panels, batch processing |
| Maintainability | Long-term operation, team development | Prototypes, short-term projects |
| Scalability | Services with expected growth | Internal tools, fixed user base |
| Security | Personal data, financial data | Public data, internal use |
| Development speed | MVP, time to market | Quality-focused, mission-critical |

### Choosing an Architecture Pattern

```
┌─────────────────────────────────────────────────┐
│          Architecture Selection Flow              │
├─────────────────────────────────────────────────┤
│                                                 │
│  1. Team size?                                  │
│    ├─ Small (1-5) -> Monolith                   │
│    └─ Large (10+) -> Go to 2                    │
│                                                 │
│  2. Deployment frequency?                       │
│    ├─ Weekly or less -> Monolith + modules      │
│    └─ Daily/multiple -> Go to 3                 │
│                                                 │
│  3. Team independence?                          │
│    ├─ High -> Microservices                     │
│    └─ Moderate -> Modular monolith              │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Trade-off Analysis

Technical decisions always involve trade-offs. Analyze from the following perspectives:

**1. Short-term vs. Long-term Cost**
- A fast approach in the short term can become technical debt in the long term
- Conversely, over-engineering incurs high short-term costs and delays the project

**2. Consistency vs. Flexibility**
- A unified technology stack reduces learning costs
- Adopting diverse technologies enables best-fit choices but increases operational costs

**3. Level of Abstraction**
- High abstraction increases reusability but can make debugging harder
- Low abstraction is intuitive but prone to code duplication

```python
# Design decision recording template
class ArchitectureDecisionRecord:
    """Create an ADR (Architecture Decision Record)"""

    def __init__(self, title: str):
        self.title = title
        self.context = ""
        self.decision = ""
        self.consequences = []
        self.alternatives = []

    def set_context(self, context: str):
        """Describe the background and problem"""
        self.context = context
        return self

    def set_decision(self, decision: str):
        """Describe the decision"""
        self.decision = decision
        return self

    def add_consequence(self, consequence: str, positive: bool = True):
        """Add a consequence"""
        self.consequences.append({
            'description': consequence,
            'type': 'positive' if positive else 'negative'
        })
        return self

    def add_alternative(self, name: str, reason_rejected: str):
        """Add a rejected alternative"""
        self.alternatives.append({
            'name': name,
            'reason_rejected': reason_rejected
        })
        return self

    def to_markdown(self) -> str:
        """Output in Markdown format"""
        md = f"# ADR: {self.title}\n\n"
        md += f"## Background\n{self.context}\n\n"
        md += f"## Decision\n{self.decision}\n\n"
        md += "## Consequences\n"
        for c in self.consequences:
            icon = "✅" if c['type'] == 'positive' else "⚠️"
            md += f"- {icon} {c['description']}\n"
        md += "\n## Rejected Alternatives\n"
        for a in self.alternatives:
            md += f"- **{a['name']}**: {a['reason_rejected']}\n"
        return md
```
---

## 9. FAQ

### Q1: How do I use a hyphen as a literal inside a character class?

**A**: There are three methods:

```python
import re

# Method 1: Place at the start
print(re.findall(r'[-abc]', "a-b"))  # => ['a', '-', 'b']

# Method 2: Place at the end
print(re.findall(r'[abc-]', "a-b"))  # => ['a', '-', 'b']

# Method 3: Escape it
print(re.findall(r'[a\-c]', "a-b"))  # => ['a', '-']
```

Placing it at the start is the most common and readable approach.

### Q2: Are `\w` and `[a-zA-Z0-9_]` always the same?

**A**: **No, they are not**. When Unicode mode is enabled, `\w` also matches characters from various scripts (Kanji, Hiragana, etc.):

```python
import re

text = "hello_世界"

# Unicode mode (Python 3 default)
print(re.findall(r'\w+', text))            # => ['hello_世界']
print(re.findall(r'[a-zA-Z0-9_]+', text))  # => ['hello_']

# ASCII mode
print(re.findall(r'\w+', text, re.ASCII))  # => ['hello_']
```

### Q3: Can POSIX classes be used in Python?

**A**: Python's `re` module does **not directly support** POSIX character classes. Alternatives:

```python
import re

# Alternative for [:alpha:]
# Method 1: Use Unicode categories (regex module)
# pip install regex
# import regex
# regex.findall(r'\p{Alpha}+', text)

# Method 2: Specify ranges explicitly
alpha_ascii = r'[a-zA-Z]'

# Method 3: Combine with str.isalpha()
text = "Hello 123 World"
words = re.findall(r'\S+', text)
alpha_words = [w for w in words if w.isalpha()]
print(alpha_words)  # => ['Hello', 'World']
```

### Q4: What are Unicode Property Escapes?

**A**: `\p{...}` allows specifying Unicode categories or scripts (support varies by engine):

```javascript
// JavaScript (ES2018+ with /u flag)
const text = "Hello 世界 café";

// All Unicode "letters"
console.log(text.match(/\p{L}+/gu));
// => ['Hello', '世界', 'café']

// Japanese script
console.log(text.match(/\p{Script=Hiragana}+/gu));
// => (none)

// Kanji
console.log(text.match(/\p{Script=Han}+/gu));
// => ['世界']
```

### Q5: What about the performance of character classes?

**A**: Character classes are generally fast, but note the following:

```python
import re

# 1. Character classes are faster than alternation (|)
# Slow: a|b|c|d|e
# Fast: [a-e]

# 2. Negated character classes may be slightly slower than positive ones
# [^abc] internally checks "all characters except abc"

# 3. Unicode character classes are slower than ASCII-only
# \d (Unicode) > [0-9] (ASCII only)
# If speed matters, consider re.ASCII

# 4. Character class optimization is engine-dependent
# Many engines optimize [a-z] into a bitmap
# Large Unicode ranges may use tree-based lookups
```

### Q6: Can shorthands be used inside character classes?

**A**: Yes, they can. Shorthands are expanded inside character classes:

```python
import re

# Digits, underscores, and hyphens
print(re.findall(r'[\d_-]+', "hello_123-world"))
# => ['_123-']

# Whitespace and punctuation
print(re.findall(r'[\s,.!?]+', "hello, world! foo"))
# => [', ', '! ']

# Word characters and dots (for domain names)
print(re.findall(r'[\w.]+', "example.com hello"))
# => ['example.com', 'hello']

# Negated shorthands work too
print(re.findall(r'[\D]+', "abc123def"))  # Non-digits
# => ['abc', 'def']
```

---


## FAQ

### Q1: What is the most important point when learning this topic?

Building practical experience is the most important thing. Understanding deepens not just through theory, but by actually writing code and verifying how it works.

### Q2: What are common mistakes beginners make?

Skipping the fundamentals and jumping to advanced topics. We recommend thoroughly understanding the basic concepts covered in this guide before moving to the next step.

### Q3: How is this applied in real-world work?

Knowledge of this topic is frequently applied in everyday development work. It is especially important during code reviews and architecture design.

---

## Summary

| Item | Description |
|------|-------------|
| `[abc]` | Any single character: a, b, or c |
| `[a-z]` | Range from a to z |
| `[^abc]` | Any single character except a, b, c (negation) |
| `\d` / `\D` | Digit / Non-digit |
| `\w` / `\W` | Word character / Non-word character |
| `\s` / `\S` | Whitespace / Non-whitespace |
| `\b` / `\B` | Word boundary / Non-word boundary (zero-width) |
| `\p{L}` | Unicode character property (supported engines only) |
| `\p{Script=...}` | Unicode script specification |
| Unicode note | `\d` `\w` ranges vary by language and mode |
| Set operations | Java: `&&` (intersection), .NET: `-` (subtraction), ES2024: `v` flag |
| Golden rule | Do not use `[A-z]`; understand Unicode behavior |

---

## Recommended Next Guides

- [03-quantifiers-anchors.md](./03-quantifiers-anchors.md) -- Quantifiers and Anchors
- [../01-advanced/00-groups-backreferences.md](../01-advanced/00-groups-backreferences.md) -- Groups and Backreferences
- [../01-advanced/02-unicode-regex.md](../01-advanced/02-unicode-regex.md) -- Unicode Regular Expressions in Detail

---

## References

1. **Unicode Technical Standard #18** "Unicode Regular Expressions" https://unicode.org/reports/tr18/ -- International standard for Unicode regular expressions
2. **Jeffrey E.F. Friedl** "Mastering Regular Expressions" O'Reilly, 2006 -- Detailed coverage of character classes in Chapter 5
3. **POSIX.1-2017** "Regular Expressions" https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap09.html -- Official POSIX regular expression specification
4. **ECMAScript Language Specification** -- Unicode Property Escapes specification
5. **Python regex module** https://pypi.org/project/regex/ -- Advanced regular expression module for Python



===== SOURCE: 02-programming/regex-and-text-processing/docs/00-basics/03-quantifiers-anchors.md =====

# Quantifiers and Anchors -- *+?{n,m}, ^$\b, Greedy/Lazy

> Quantifiers control repetition counts, and anchors constrain positions. Accurately understanding the difference between greedy matching and lazy matching is the key to writing patterns that behave as intended.

## What You Will Learn in This Chapter

1. **Types and behavior of quantifiers** -- Precise meanings and usage of `*` `+` `?` `{n,m}`
2. **Greedy matching vs. lazy matching** -- Why the default behavior is "longest match" and how to control it
3. **Possessive quantifiers and atomic groups** -- Speed optimization by preventing backtracking
4. **Types and applications of anchors** -- All position-specification patterns using `^` `$` `\b` `\A` `\Z` `\G`
5. **Cross-language differences** -- Behavioral comparison across Python / JavaScript / Java / Ruby / Perl / Go / Rust
6. **Impact on performance** -- How quantifier choice affects backtracking count


## Prerequisites

Before reading this guide, the following knowledge will help deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts
- Understanding of the content in [Character Classes -- [abc], \d, \w, \s, POSIX](./02-character-classes.md)

---

## 1. Quantifiers

### 1.1 Basic Quantifiers

```python
import re

text = "aaabbbccc"

# * : 0 or more times (matches even with 0 occurrences)
print(re.findall(r'a*', text))
# => ['aaa', '', '', '', '', '', '', '']
# Note: Also matches the empty string (0 repetitions)

# + : 1 or more times (requires at least 1)
print(re.findall(r'a+', text))
# => ['aaa']

# ? : 0 or 1 time
print(re.findall(r'a?', text))
# => ['a', 'a', 'a', '', '', '', '', '', '', '']
```

**Why does `*` match the empty string?**

`*` means "0 or more times," so it matches the empty string as "0 repetitions" even at positions where the target character does not exist. This originates from the mathematical definition of regular expressions. In formal language theory, the empty string (epsilon, ε) is included in the Kleene closure of any language.

```python
import re

# Detailed behavior of empty string matching
text = "XY"
matches = list(re.finditer(r'a*', text))
for m in matches:
    print(f"Position {m.start()}-{m.end()}: '{m.group()}'")
# Position 0-0: ''    <- Before X (no 'a' = 0 matches)
# Position 1-1: ''    <- Before Y (no 'a' = 0 matches)
# Position 2-2: ''    <- End of string (no 'a' = 0 matches)

# Practical issue: situations where + should be used instead of *
text = "abc 123 def"
# NG: Also matches the empty string
print(re.findall(r'\d*', text))
# => ['', '', '', '', '123', '', '', '', '', '']

# OK: Require at least 1 digit
print(re.findall(r'\d+', text))
# => ['123']
```

### 1.2 Range Specification `{n,m}`

```python
import re

# {n}   : exactly n times
# {n,}  : n or more times
# {n,m} : between n and m times (inclusive)
# {,m}  : 0 to m times (some engines only)

text = "1 12 123 1234 12345"

print(re.findall(r'\d{3}', text))     # Exactly 3 digits: ['123', '123', '123']
print(re.findall(r'\b\d{3}\b', text)) # With word boundaries: ['123']
print(re.findall(r'\d{2,4}', text))   # 2-4 digits: ['12', '123', '1234', '1234']
print(re.findall(r'\d{3,}', text))    # 3+ digits: ['123', '1234', '12345']
```

**Syntax notes for `{n,m}`**:

```python
import re

# Spaces are not allowed in {n,m} (engine-dependent)
text = "aaa"

# Python: With a space, it is treated as a literal
print(re.findall(r'a{2,3}', text))   # => ['aaa']  (quantifier)
print(re.findall(r'a{2, 3}', text))  # => []  (literal string "a{2, 3}")

# {n,m} where n > m is an error
try:
    re.compile(r'a{3,2}')
except re.error as e:
    print(f"Error: {e}")
    # => "min repeat greater than max repeat"

# Limits on large repetition counts
try:
    re.compile(r'a{1,65536}')  # Python has an upper limit
except re.error as e:
    print(f"Error: {e}")
```

**Support for `{,m}` across languages**:

```
┌──────────────┬─────────────────────────────────────┐
│ Language/     │ Support for {,m}                     │
│ Engine       │                                      │
├──────────────┼─────────────────────────────────────┤
│ Python       │ ○ Supported (equivalent to {0,m})   │
│ JavaScript   │ ✗ Treated as literal                 │
│ Java         │ ✗ Treated as literal                 │
│ PCRE         │ ○ Supported                          │
│ Ruby         │ ○ Supported                          │
│ Perl         │ ○ Supported                          │
│ Go (RE2)     │ ○ Supported                          │
│ Rust (regex) │ ○ Supported                          │
│ .NET         │ ○ Supported                          │
└──────────────┴─────────────────────────────────────┘
```

### 1.3 Equivalence Relationships of Quantifiers

```
Quantifier syntactic sugar:

  *     ≡  {0,}    0 or more
  +     ≡  {1,}    1 or more
  ?     ≡  {0,1}   0 or 1

  {3}   -> exactly 3 times
  {3,}  -> 3 or more (no upper limit)
  {3,5} -> between 3 and 5 (inclusive)
  {0,5} -> between 0 and 5 (inclusive)
```

### 1.4 What Quantifiers Apply To

A quantifier applies to the "preceding element." It is important to accurately understand what this "preceding element" is.

```python
import re

text = "abcabcabc"

# Applied to a single character: 'c' repeated 0 or more times
print(re.findall(r'abc*', text))      # => ['abc', 'abc', 'abc']
# c* is the repetition of 'c'

# Applied to a group: 'abc' repeated 1 or more times
print(re.findall(r'(?:abc)+', text))  # => ['abcabcabc']
# (?:abc)+ is the repetition of the 'abc' group

# Applied to a character class: [a-c] repeated 2 or more times
print(re.findall(r'[a-c]{2,}', text)) # => ['abcabcabc']

# Applied to an escape sequence: \d repeated 3 times
text2 = "abc123def456"
print(re.findall(r'\d{3}', text2))    # => ['123', '456']
```

**Consecutive (nested) quantifiers**:

```python
import re

# Directly chaining quantifiers causes an error
try:
    re.compile(r'a**')
except re.error as e:
    print(f"Error: {e}")  # multiple repeat

# You can nest them using groups
text = "aaa bbb aaa bbb aaa"
print(re.findall(r'(?:a{3}\s?){2,}', text))
# => ['aaa bbb aaa bbb aaa']

# Practical example: repeated IP address pattern
ip_pattern = r'(?:\d{1,3}\.){3}\d{1,3}'
print(re.findall(ip_pattern, "Server 192.168.1.100 and 10.0.0.1"))
# => ['192.168.1.100', '10.0.0.1']
```

### 1.5 Quantifiers and Empty Matches

```python
import re

# How findall/finditer handle empty matches
text = "abc"

# Python 3.7+ includes a specification change to prevent consecutive empty matches
# Python 3.6 and earlier: retries at the same position after an empty match
# Python 3.7+: advances one character before retrying after an empty match

# Empty matches with *
for m in re.finditer(r'x*', text):
    print(f"Position {m.start()}-{m.end()}: '{m.group()}'")
# Python 3.7+:
# Position 0-0: ''
# Position 1-1: ''
# Position 2-2: ''
# Position 3-3: ''

# How sub handles empty matches
print(re.sub(r'x*', '-', 'abc'))
# Python 3.7+: '-a-b-c-'
# Python 3.6 and earlier: '-a-b-c-' (varies by implementation)
```

```javascript
// Empty matches in JavaScript
const text = "abc";

// ES2020+ matchAll
const matches = [...text.matchAll(/x*/g)];
console.log(matches.map(m => `${m.index}: '${m[0]}'`));
// ["0: ''", "1: ''", "2: ''", "3: ''"]

// Empty matches in replace
console.log("abc".replace(/x*/g, "-"));
// "-a-b-c-"
```

---

## 2. Greedy Matching vs. Lazy Matching

### 2.1 Greedy -- Default Behavior

```python
import re

text = '<div>hello</div><div>world</div>'

# Greedy matching (default): tries to match as much as possible
greedy = re.search(r'<div>.*</div>', text)
print(greedy.group())
# => '<div>hello</div><div>world</div>'
#    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
#    Longest match: from the first <div> to the last </div>
```

**Internal workings of greedy matching (backtracking details)**:

```
Pattern: <div>.*</div>
Text:    <div>hello</div><div>world</div>
         0123456789...

Step 1: '<div>' matches text positions 0-4
Step 2: '.*' greedily consumes all remaining characters
        -> Match range: position 5 to position 37 (end)
Step 3: Attempts to match '</div>'
        -> No remaining characters -> Failure -> Backtrack
Step 4: Back up 1 char (pos 36): '>' ≠ '<' -> Failure -> Backtrack
Step 5: Back up 1 char (pos 35): '>' ≠ '<' -> Failure -> Backtrack
  ...
Step N: Back up to position 31: '</div>' matches!
        -> Result: '<div>hello</div><div>world</div>'

Backtrack count: approximately 6 times
```

### 2.2 Lazy -- Appending `?`

```python
import re

text = '<div>hello</div><div>world</div>'

# Lazy matching: tries to match as little as possible
lazy = re.findall(r'<div>.*?</div>', text)
print(lazy)
# => ['<div>hello</div>', '<div>world</div>']
#    Shortest match: from the first <div> to the nearest </div>
```

**Internal workings of lazy matching**:

```
Pattern: <div>.*?</div>
Text:    <div>hello</div><div>world</div>

Step 1: '<div>' matches text positions 0-4
Step 2: '.*?' lazily tries 0 characters first
Step 3: Attempts '</div>' -> pos 5 'h' ≠ '<' -> Failure
        -> Expand .*? by 1 character
Step 4: .*? = 'h', attempt '</div>' from pos 6 -> 'e' ≠ '<' -> Failure
        -> Expand .*? by 1 character
Step 5: .*? = 'he', attempt '</div>' from pos 7 -> 'l' ≠ '<' -> Failure
  ...
Step 8: .*? = 'hello', attempt '</div>' from pos 10 -> Match!
        -> Result: '<div>hello</div>'

Expansion attempts: 5
```

### 2.3 Greedy vs. Lazy -- All Quantifiers

```python
import re

text = "aabab"

# Greedy (default)            Lazy (with ? appended)
print(re.search(r'a.*b', text).group())    # => 'aabab' (longest)
print(re.search(r'a.*?b', text).group())   # => 'aab'   (shortest)

print(re.search(r'a.+b', text).group())    # => 'aabab' (longest)
print(re.search(r'a.+?b', text).group())   # => 'aabab' (.+ requires at least 1 char)

print(re.search(r'a.?b', text).group())    # => 'aab'
print(re.search(r'a.??b', text).group())   # => 'ab' (positions 2-3)
```

**Important note: Lazy matching is "shortest" but not "leftmost shortest"**:

```python
import re

text = "aXbYaZb"

# Lazy matching starts from the left (the leftmost match principle still applies)
print(re.search(r'a.*?b', text).group())  # => 'aXb' (shortest from the left)
# 'aZb' is shorter, but 'aXb' is found first

# findall returns all non-overlapping matches
print(re.findall(r'a.*?b', text))  # => ['aXb', 'aZb']
```

### 2.4 Visualizing the Behavior

```
Greedy match: .*  (Pattern: <.*>, Text: <b>bold</b>)

Step 1: < matches                              <
Step 2: .* swallows all characters             <b>bold</b>
Step 3: > doesn't match (end of string)        -> Backtrack
Step 4: Back up 1 char, try >                  <b>bold</b  -> > ≠ b -> back up
Step 5: Back up 1 more char                    <b>bold</b> -> > = > -> Match!
Result: <b>bold</b>  (longest match)

─────────────────────────────────────────

Lazy match: .*?  (Pattern: <.*?>, Text: <b>bold</b>)

Step 1: < matches                              <
Step 2: .*? tries 0 chars first                <  -> > ≠ b -> expand
Step 3: Expand by 1 char                       <b -> > ≠ o -> expand
Step 4: Expand 1 more... wait                  <b> -> > = > -> Match!
Result: <b>  (shortest match)
```

### 2.5 Possessive Quantifiers -- No Backtracking

```java
// Supported in Java and PCRE (not supported by Python's re)
// Available in Python via the regex module (third-party)

// Greedy:     .*   (with backtracking)
// Lazy:       .*?  (shortest match)
// Possessive: .*+  (no backtracking -> fast but more likely to fail)

// Java example:
String text = "aaaa";
// Greedy:     a*a  -> "aaaa" (a* takes 3, last a takes 1)
// Possessive: a*+a -> No match (a*+ takes all, no backtracking)
```

**Practical use of possessive quantifiers**:

```java
import java.util.regex.*;

public class PossessiveExample {
    public static void main(String[] args) {
        // 1. Fast non-match detection
        // Possessive quantifiers quickly determine "no match"
        String longText = "a".repeat(100000) + "X";

        // Greedy: a*a -> massive backtracking
        long start1 = System.nanoTime();
        Pattern.matches("a*a$", longText);  // Slow
        long time1 = System.nanoTime() - start1;

        // Possessive: a*+X -> immediate determination with no backtracking
        long start2 = System.nanoTime();
        Pattern.matches("a*+X", longText);  // Fast
        long time2 = System.nanoTime() - start2;

        System.out.println("Greedy: " + time1 + "ns");
        System.out.println("Possessive: " + time2 + "ns");

        // 2. Use in CSV parsing
        String csvLine = "field1,field2,\"field with, comma\",field4";

        // Quoted field: possessively consume non-quote characters
        Pattern csvQuoted = Pattern.compile("\"[^\"]*+\"");
        Matcher m = csvQuoted.matcher(csvLine);
        while (m.find()) {
            System.out.println("Match: " + m.group());
        }
        // => Match: "field with, comma"

        // 3. Parsing numeric literals
        // Possessively consume the integer part, handle decimal part separately
        Pattern numPattern = Pattern.compile("\\d++\\.?\\d*+");
        String expr = "3.14 + 42 - 0.5";
        m = numPattern.matcher(expr);
        while (m.find()) {
            System.out.println("Number: " + m.group());
        }
        // => Number: 3.14
        // => Number: 42
        // => Number: 0.5
    }
}
```

**Possessive quantifiers in Python's regex module**:

```python
# pip install regex
import regex

text = "aaaaab"

# Possessive quantifier
m = regex.search(r'a++b', text)
print(m.group())  # => 'aaaaab'

# Case where possessive quantifier causes match failure
m = regex.search(r'a++a', text)
print(m)  # => None (a++ consumes all a's and does not backtrack)

# Atomic group (?>...) provides equivalent functionality
m = regex.search(r'(?>a+)b', text)
print(m.group())  # => 'aaaaab'

m = regex.search(r'(?>a+)a', text)
print(m)  # => None
```

### 2.6 Atomic Groups

An atomic group `(?>...)` is a group that does not backtrack once its internal match is established. It is conceptually equivalent to a possessive quantifier but can be applied to a broader range of constructs.

```java
import java.util.regex.*;

public class AtomicGroupExample {
    public static void main(String[] args) {
        // Possessive quantifier: applies to a single quantifier
        // a*+  ≡  (?>a*)

        // Atomic group: can apply to multiple elements
        // (?>abc|abcd)  -- once abc matches, no backtracking

        String text = "abcd";

        // Normal alternation
        Pattern p1 = Pattern.compile("(?:abc|abcd)d");
        System.out.println(p1.matcher(text).find());  // false
        // abc matches -> expects d -> d is there -> overall match... wait
        // Actually "abcd" is the entire target, abc + d = abcd -> OK

        // A clearer example
        String text2 = "abcde";
        Pattern p2 = Pattern.compile("(?:abc|abcde)$");
        Pattern p3 = Pattern.compile("(?>abc|abcde)$");

        System.out.println(p2.matcher(text2).find());  // true (matches abcde)
        System.out.println(p3.matcher(text2).find());  // false (commits to abc, fails at $ without backtracking)
    }
}
```

```ruby
# Ruby natively supports atomic groups
text = "aaaaab"

# Atomic group
puts text.match(/(?>a+)b/)    # => aaaaab
puts text.match(/(?>a+)a/)    # => nil (no backtracking)

# Practical example: fast email validation
email_pattern = /\A(?>[\w.+-]+)@(?>[\w-]+\.)+\w{2,}\z/
puts "user@example.com".match?(email_pattern)  # => true
puts "invalid@@email".match?(email_pattern)     # => false
```

### 2.7 Quantifier Comparison Table

| Greedy | Lazy | Possessive | Behavior |
|--------|------|-----------|----------|
| `*` | `*?` | `*+` | 0 or more |
| `+` | `+?` | `++` | 1 or more |
| `?` | `??` | `?+` | 0 or 1 |
| `{n,m}` | `{n,m}?` | `{n,m}+` | n to m times |

| Property | Greedy | Lazy | Possessive |
|----------|--------|------|-----------|
| Match strategy | Longest match | Shortest match | Longest (no backtracking on failure) |
| Backtracking | Yes | Yes | No |
| Speed | Normal | Normal | Fast (on match) |
| Use case | Default | Tag extraction, etc. | Performance optimization |
| Support | All engines | All engines | Java/PCRE/regex (Python) |

### 2.8 Comparing Backtrack Counts

Comparing backtrack counts with concrete examples to visualize their performance impact.

```python
import re
import time

# Test case: extracting HTML tags
html = '<div class="container">' + 'x' * 10000 + '</div>'

# Pattern 1: Greedy + negated character class (fastest)
pattern1 = r'<div[^>]*>[^<]*</div>'

# Pattern 2: Lazy (medium speed)
pattern2 = r'<div.*?>.*?</div>'

# Pattern 3: Greedy (slowest -- massive backtracking)
pattern3 = r'<div.*>.*</div>'

for name, pattern in [("Negated class", pattern1), ("Lazy", pattern2), ("Greedy", pattern3)]:
    start = time.perf_counter()
    for _ in range(1000):
        re.search(pattern, html, re.DOTALL)
    elapsed = time.perf_counter() - start
    print(f"{name}: {elapsed:.4f} sec")

# Typical results:
# Negated class: 0.0150 sec
# Lazy:          0.0450 sec
# Greedy:        0.0800 sec
```

```
Estimated backtrack counts:

Pattern: <div>.*</div>  (greedy)
Text:    <div>XXXX...XXXX</div> (10000 X's)

1. .* consumes 10006 characters ('XXXX...XXXX</div>' entirely)
2. Attempts to match '</div>' -> Failure
3. Backtracks 1 character at a time x ~10000 times
4. Reaches the '</div>' position -> Match
-> Backtrack count: ~10000 times

Pattern: <div>.*?</div>  (lazy)
1. .*? starts with 0 characters
2. Attempts to match '</div>' -> Failure -> Expand by 1 character
3. Repeats x ~10000 times
4. After consuming all 'X' characters, '</div>' matches
-> Expansion attempts: ~10000 times (comparable to greedy but in reverse direction)

Pattern: <div>[^<]*</div>  (negated class)
1. [^<]* consumes all non-< characters at once
2. Attempts to match </div> -> Success
-> Backtrack count: 0 times (fastest)
```

---

## 3. Anchors

### 3.1 Line Start/End Anchors

```python
import re

text = """first line
second line
third line"""

# ^ : Line start (by default, matches only the start of the string)
print(re.findall(r'^.+', text))
# => ['first line']

# $ : Line end (by default, matches only the end of the string)
print(re.findall(r'.+$', text))
# => ['third line']

# re.MULTILINE: ^ and $ match the start/end of each line
print(re.findall(r'^.+', text, re.MULTILINE))
# => ['first line', 'second line', 'third line']

print(re.findall(r'^\w+', text, re.MULTILINE))
# => ['first', 'second', 'third']
```

**Subtle behavior of `$` with trailing newlines**:

```python
import re

# Python's $ also matches "before" a trailing newline at the end of the string
text_with_newline = "hello\n"
text_without_newline = "hello"

print(re.search(r'hello$', text_with_newline))       # Matches!
print(re.search(r'hello$', text_without_newline))     # Matches

# \Z matches at the very end (Python-specific)
print(re.search(r'hello\Z', text_with_newline))       # None!
print(re.search(r'hello\Z', text_without_newline))    # Matches

# To match including the trailing newline exactly
print(re.search(r'hello\n?\Z', text_with_newline))    # Matches
```

```javascript
// Behavior of $ in JavaScript
const text = "hello\n";

// $ by default matches only the end of the string
console.log(/hello$/.test(text));        // false (because of the newline)
console.log(/hello$/.test("hello"));     // true

// With m flag, matches each line end
console.log(/hello$/m.test(text));       // true
```

```ruby
# In Ruby, $ always matches the end of a line (just before \n)
text = "hello\nworld"
puts text.scan(/\w+$/)   # => ["hello", "world"]
# In Ruby, $ behaves like MULTILINE by default
# To match only the end of the string, use \z
puts text.match?(/world\z/)  # => true
puts text.match?(/hello\z/)  # => false
```

### 3.2 String Boundary Anchors

```python
import re

text = "hello\nworld"

# \A : Absolute start of the string (not affected by MULTILINE)
print(re.search(r'\Ahello', text).group())  # => 'hello'
print(re.search(r'\Aworld', text))          # => None

# \Z : Absolute end of the string (not affected by MULTILINE)
print(re.search(r'world\Z', text).group())  # => 'world'

# ^ vs \A (MULTILINE mode)
print(re.findall(r'^\w+', text, re.M))   # => ['hello', 'world']
print(re.findall(r'\A\w+', text, re.M))  # => ['hello'] (start only)
```

**Differences between `\z` and `\Z` across languages**:

```
┌──────────────┬──────────────────────────────────────────┐
│ Anchor       │ Behavior                                  │
├──────────────┼──────────────────────────────────────────┤
│ \Z (Python)  │ End of string; does not include trailing  │
│              │ newline                                    │
│ \z (Python)  │ Not supported                             │
│ \Z (Ruby)    │ End of string (also before trailing \n)   │
│ \z (Ruby)    │ Absolute end of string (past trailing \n) │
│ \Z (Java)    │ End of string (also before trailing \n)   │
│ \z (Java)    │ Absolute end of string                    │
│ \Z (Perl)    │ End of string (also before trailing \n)   │
│ \z (Perl)    │ Absolute end of string                    │
└──────────────┴──────────────────────────────────────────┘

Note: Python's \Z is equivalent to \z in other languages.
Python has no anchor equivalent to \Z in other languages.
```

```ruby
# Clear difference between \z and \Z in Ruby
text = "hello\n"

puts text.match?(/hello\Z/)  # => true  (matches before the \n)
puts text.match?(/hello\z/)  # => false (absolute end is \n)
puts text.match?(/hello\n\z/) # => true (including the newline up to the end)
```

### 3.3 Word Boundary `\b`

```python
import re

text = "cat concatenate category caterpillar"

# \b : Word boundary
# The position between a word character (\w) and a non-word character (\W),
# or the start/end of the string

# Search for "cat" as a standalone word
print(re.findall(r'\bcat\b', text))
# => ['cat']  -- Does not match "concatenate", etc.

# Words starting with "cat"
print(re.findall(r'\bcat\w*', text))
# => ['cat', 'concatenate', 'category', 'caterpillar']

# \B : Non-word boundary (inside a word)
print(re.findall(r'\Bcat\B', text))
# => ['cat']  -- Only the "cat" in the middle of "concatenate"
```

**Precise definition of word boundaries**:

```python
import re

# \b matches a "position" (does not consume characters)
# \b matches at the following 4 positions:
# 1. Start of string, if the first character is \w
# 2. End of string, if the last character is \w
# 3. Position immediately after \w followed by \W
# 4. Position immediately after \W followed by \w

text = "Hello, World! 123"
#       ^     ^^ ^^  ^ ^  ^
#       1     34 34  1 34  2

boundaries = []
for i in range(len(text) + 1):
    if re.search(r'\b', text[max(0,i-1):i+1] if i > 0 else text[0:1]):
        pass  # Simplified

# Checking specific boundary positions
for m in re.finditer(r'\b', text):
    print(f"Position {m.start()}: ...{text[max(0,m.start()-1):m.start()+1]}...")
# Position 0:  ...H...
# Position 5:  ...o,...
# Position 7:  ...W...
# Position 12: ...d!...
# Position 14: ...1...
# Position 17: ...3 (end)
```

**Word boundaries and Japanese**:

```python
import re

# \b is based on ASCII word characters (\w = [a-zA-Z0-9_])
# -> Japanese characters are treated as \W, so each character boundary applies

text = "Hello世界World"
print(re.findall(r'\b\w+\b', text))
# => ['Hello', 'World']
# '世界' is not included in \w, so it is not recognized as a standalone word

# For Unicode-aware word boundaries, use the regex module
import regex
# The regex module's UNICODE flag
print(regex.findall(r'\b\w+\b', text, flags=regex.UNICODE))
# => ['Hello世界World']  (Japanese characters are included in \w)
```

```javascript
// JavaScript \b and Unicode
const text = "Hello世界World";

// Even with the ES2015+ u flag, \b is ASCII-based
console.log(text.match(/\b\w+\b/gu));
// => ['Hello', 'World'] ('世界' not included)

// To use Unicode word boundaries:
// ECMAScript 2024 /v flag + Unicode property
console.log(text.match(/[\p{L}\p{N}]+/gu));
// => ['Hello世界World'] (Unicode character properties as an alternative)
```

### 3.4 Conceptual Diagram of Anchors

```
Text: "Hello World"

Position:  ^  H  e  l  l  o     W  o  r  l  d  $
           ↑                                    ↑
           String start (^, \A)                 String end ($, \Z)

Word boundary (\b) positions:
           \b H  e  l  l  o \b  \b W  o  r  l  d \b
           ↑                ↑   ↑                ↑
           Word start        Word end/start       Word end

Non-word boundary (\B) positions:
              \B \B \B \B      \B \B \B \B
              H--e--l--l--o    W--o--r--l--d
              Between characters (both are \w)
```

### 3.5 Complete Anchor Reference

```
┌────────┬──────────────────────────────────────┐
│ Anchor │ Meaning                               │
├────────┼──────────────────────────────────────┤
│ ^      │ Line start (MULTILINE) / String start│
│ $      │ Line end (MULTILINE) / String end    │
│ \A     │ Absolute start of string              │
│ \Z     │ Absolute end of string                │
│ \z     │ Absolute end of string (ignores       │
│        │ trailing newline)                      │
│ \b     │ Word boundary                         │
│ \B     │ Non-word boundary                     │
│ \G     │ End position of previous match        │
│        │ (Java/Perl/.NET)                      │
└────────┴──────────────────────────────────────┘
```

### 3.6 The `\G` Anchor in Detail

`\G` is a special anchor that anchors to "the position where the previous match ended." It is useful for consecutive repeated matches.

```java
import java.util.regex.*;

public class GAnchorExample {
    public static void main(String[] args) {
        // \G anchors to the end position of the previous match
        // On the first match, it is at the same position as the string start (\A)

        String text = "abc123def456ghi";
        Pattern p = Pattern.compile("\\G\\w");
        Matcher m = p.matcher(text);

        StringBuilder result = new StringBuilder();
        while (m.find()) {
            result.append(m.group());
        }
        System.out.println(result);
        // => "abc123def456ghi" (all characters match consecutively)

        // If the match breaks in the middle, \G does not resume
        text = "abc 123 def";
        p = Pattern.compile("\\G\\w");
        m = p.matcher(text);

        result = new StringBuilder();
        while (m.find()) {
            result.append(m.group());
        }
        System.out.println(result);
        // => "abc" (breaks at the space; nothing matches afterward)
    }
}
```

```perl
# Using \G in Perl: a tokenizer
my $text = "3.14 + 42 * 2.0";
my @tokens;

while ($text =~ /\G\s*/gc) {  # Skip whitespace
    if ($text =~ /\G(\d+\.?\d*)/gc) {
        push @tokens, {type => 'NUMBER', value => $1};
    } elsif ($text =~ /\G([+\-*\/])/gc) {
        push @tokens, {type => 'OP', value => $1};
    } else {
        die "Unexpected character at position " . pos($text);
    }
}

for my $token (@tokens) {
    print "$token->{type}: $token->{value}\n";
}
# NUMBER: 3.14
# OP: +
# NUMBER: 42
# OP: *
# NUMBER: 2.0
```

---

## 4. Combining Quantifiers and Anchors

### 4.1 Matching Entire Lines

```python
import re

log = """2026-02-11 10:00 INFO Server started
2026-02-11 10:05 ERROR Connection failed
2026-02-11 10:10 INFO Request received
2026-02-11 10:15 WARN Memory usage high"""

# Extract entire lines containing ERROR
error_lines = re.findall(r'^.*ERROR.*$', log, re.MULTILINE)
print(error_lines)
# => ['2026-02-11 10:05 ERROR Connection failed']

# Lines containing WARN or ERROR
issues = re.findall(r'^.*(ERROR|WARN).*$', log, re.MULTILINE)
print(issues)
# => ['2026-02-11 10:05 ERROR Connection failed',
#     '2026-02-11 10:15 WARN Memory usage high']
```

### 4.2 Full-Match Validation

```python
import re

# Verify that the entire string matches the pattern exactly
# Use ^...$ (or re.fullmatch)

def validate_date(s):
    """Validate date in YYYY-MM-DD format"""
    return bool(re.fullmatch(r'\d{4}-\d{2}-\d{2}', s))

print(validate_date("2026-02-11"))      # => True
print(validate_date("2026-02-11 "))     # => False (trailing space)
print(validate_date("date: 2026-02-11"))# => False (text before the date)

def validate_hex_color(s):
    """Validate #RRGGBB color code format"""
    return bool(re.fullmatch(r'#[0-9a-fA-F]{6}', s))

print(validate_hex_color("#FF5733"))  # => True
print(validate_hex_color("#GG5733"))  # => False
```

**Full-match methods across languages**:

```javascript
// JavaScript: Use ^...$ (no fullmatch method)
function validateDate(s) {
    return /^\d{4}-\d{2}-\d{2}$/.test(s);
}
console.log(validateDate("2026-02-11"));  // true
console.log(validateDate("2026-02-11 ")); // false
```

```java
// Java: matches() method implicitly adds ^...$
String date = "2026-02-11";
System.out.println(date.matches("\\d{4}-\\d{2}-\\d{2}"));  // true

// find() does partial matching
Pattern p = Pattern.compile("\\d{4}-\\d{2}-\\d{2}");
Matcher m = p.matcher("date: 2026-02-11");
System.out.println(m.find());     // true (partial match)
System.out.println(m.matches());  // false (full match)
```

```ruby
# Ruby: \A...\z is recommended (^ $ are line-based)
def validate_date(s)
  s.match?(/\A\d{4}-\d{2}-\d{2}\z/)
end

puts validate_date("2026-02-11")       # => true
puts validate_date("2026-02-11\nfoo")  # => false (\z is end of string)
# Using ^ $:
puts "2026-02-11\nfoo".match?(/^\d{4}-\d{2}-\d{2}$/)  # => true (matches line end!)
```

```go
// Go (RE2): MatchString does partial matching; always use ^...$ for full match
package main

import (
    "fmt"
    "regexp"
)

func main() {
    // MatchString does partial matching
    matched, _ := regexp.MatchString(`\d{4}-\d{2}-\d{2}`, "date: 2026-02-11")
    fmt.Println(matched)  // true

    // Use ^...$ explicitly for full match
    matched, _ = regexp.MatchString(`^\d{4}-\d{2}-\d{2}$`, "2026-02-11")
    fmt.Println(matched)  // true
    matched, _ = regexp.MatchString(`^\d{4}-\d{2}-\d{2}$`, "date: 2026-02-11")
    fmt.Println(matched)  // false
}
```

### 4.3 Composite Validation Patterns

```python
import re

# Password strength check: combining multiple conditions with lookaheads
def validate_password(pw):
    """
    Requirements:
    - 8 to 20 characters
    - At least 1 uppercase letter
    - At least 1 lowercase letter
    - At least 1 digit
    - At least 1 special character
    """
    pattern = r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$'
    return bool(re.match(pattern, pw))

print(validate_password("Abc123!x"))    # True
print(validate_password("abc123!x"))    # False (no uppercase)
print(validate_password("Abc!x"))       # False (fewer than 8 chars)
print(validate_password("Abcdefgh"))    # False (no digits/special chars)

# Validating usernames that may contain Japanese
def validate_username(name):
    """
    Requirements:
    - 2 to 20 characters
    - Only Japanese (Hiragana, Katakana, Kanji), alphanumeric, and underscores
    - Must start with a letter or Japanese character
    """
    pattern = r'^[a-zA-Z\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF][\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]{1,19}$'
    return bool(re.match(pattern, name))

print(validate_username("田中太郎"))     # True
print(validate_username("user_123"))     # True
print(validate_username("1abc"))         # False (starts with digit)
print(validate_username("a"))            # False (fewer than 2 chars)
```

### 4.4 Text Replacement Using Boundaries

```python
import re

# Word-level replacement (preventing partial matches)
text = "The cat concatenated the catalog"

# NG: Replaces partial matches
bad = re.sub(r'cat', 'dog', text)
print(bad)  # => 'The dog dogdogenated the dogalog'

# OK: Use word boundaries
good = re.sub(r'\bcat\b', 'dog', text)
print(good)  # => 'The dog concatenated the catalog'

# Variable renaming (useful in programming)
code = """
count = 0
count += 1
account = get_account()
print(count)
"""

# Rename variable count to total
renamed = re.sub(r'\bcount\b', 'total', code)
print(renamed)
# count -> total is changed, but account is left unchanged
```

```javascript
// Text replacement using word boundaries in JavaScript
const code = `
function getData() {
    const data = fetchData();
    const dataMap = new Map();
    return processData(data);
}`;

// Rename data to info (leave getData, fetchData, processData unchanged)
const renamed = code.replace(/\bdata\b/g, "info");
console.log(renamed);
// data -> info is changed; getData/fetchData/processData/dataMap are unchanged
```

### 4.5 Formatting Using Line Start/End

```python
import re

# Removing comment lines
config = """# Database settings
host = localhost
# port = 5432
port = 3306
# Comment
user = admin
"""

# Remove lines starting with #
cleaned = re.sub(r'^#.*$\n?', '', config, flags=re.MULTILINE)
print(cleaned)
# host = localhost
# port = 3306
# user = admin

# Adding indentation to each line
text = """line 1
line 2
line 3"""

indented = re.sub(r'^', '    ', text, flags=re.MULTILINE)
print(indented)
#     line 1
#     line 2
#     line 3

# Removing trailing whitespace from each line
text_with_trailing = "hello   \nworld  \nfoo \n"
trimmed = re.sub(r' +$', '', text_with_trailing, flags=re.MULTILINE)
print(repr(trimmed))
# 'hello\nworld\nfoo\n'

# Removing blank lines
text_with_blanks = """first

second


third"""
no_blanks = re.sub(r'^\s*$\n', '', text_with_blanks, flags=re.MULTILINE)
print(no_blanks)
# first
# second
# third
```

---

## 5. Cross-Language Differences in Quantifiers and Anchors

### 5.1 Quantifier Support Status

```
┌──────────────┬───────┬───────┬──────────┬────────────┐
│ Feature      │ Python│ JS    │ Java     │ Ruby/Perl  │
├──────────────┼───────┼───────┼──────────┼────────────┤
│ Greedy       │ ○     │ ○     │ ○        │ ○          │
│ *+?{n,m}     │       │       │          │            │
│ Lazy *? +?   │ ○     │ ○     │ ○        │ ○          │
│ Possessive   │ ✗(re) │ ✗     │ ○        │ ✗(*1)      │
│ *+ ++        │       │       │          │            │
│ Atomic (?>)  │ ✗(re) │ ✗(*2) │ ○(*3)    │ ○          │
│ {,m} short   │ ○     │ ✗     │ ✗        │ ○          │
└──────────────┴───────┴───────┴──────────┴────────────┘

*1: Partially supported in Ruby 3.0+ (regex literals only)
*2: Under ECMAScript 2025 proposal
*3: Java supports its own (?>...) syntax
```

### 5.2 Anchor Differences Across Languages

```python
# Python
import re
text = "line1\nline2\n"

# ^ $ default to string start/end
# re.MULTILINE changes them to each line's start/end
print(re.findall(r'^\w+', text, re.M))  # => ['line1', 'line2']

# \A \Z are not affected by MULTILINE
print(re.findall(r'\A\w+', text, re.M))  # => ['line1']
```

```javascript
// JavaScript
const text = "line1\nline2\n";

// ^ $ default to string start/end
// m flag changes them to each line's start/end
console.log(text.match(/^\w+/gm));  // => ['line1', 'line2']

// JavaScript does NOT have \A or \Z!
// Use ^ $ without the m flag instead,
// or use lookahead/lookbehind as alternatives
console.log(text.match(/^\w+/g));  // => ['line1']  (no m = string start)
```

```ruby
# Ruby
text = "line1\nline2\n"

# Ruby's ^ $ always work line-by-line (equivalent to MULTILINE)
puts text.scan(/^\w+/)   # => ["line1", "line2"]

# Use \A and \z for string start/end
puts text.scan(/\A\w+/)  # => ["line1"]

# Ruby has both \Z (matches before trailing \n) and \z (absolute end)
puts "hello\n".match?(/hello\Z/)  # => true
puts "hello\n".match?(/hello\z/)  # => false
```

```go
// Go (RE2 engine)
package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := "line1\nline2\n"

    // Go default: ^ $ are string start/end
    re1 := regexp.MustCompile(`^\w+`)
    fmt.Println(re1.FindAllString(text, -1))  // => [line1]

    // (?m) flag for MULTILINE mode
    re2 := regexp.MustCompile(`(?m)^\w+`)
    fmt.Println(re2.FindAllString(text, -1))  // => [line1 line2]

    // Go does NOT have \A, \Z, or \z
    // Use ^ $ with appropriate flag control
}
```

### 5.3 JavaScript-Specific Notes

```javascript
// The dotAll flag (s) introduced in ES2018
const text = "line1\nline2\nline3";

// Without s flag: . does not match newlines
console.log(text.match(/^.+$/));       // => ['line1']
console.log(text.match(/^.+$/m));      // => ['line1'] (first line)
console.log(text.match(/^.+$/gm));     // => ['line1', 'line2', 'line3']

// With s flag: . also matches newlines
console.log(text.match(/^.+$/s));      // => ['line1\nline2\nline3']
console.log(text.match(/^.+$/ms));     // => ['line1\nline2\nline3']
// sm combination: ^ matches line start, but .+ includes newlines so the whole string matches

// The v flag in ES2024 (Unicode Sets)
// The v flag is a superset of the u flag
const emoji = "Hello 🌍 World 🎉";
console.log(emoji.match(/\p{Emoji}/gv));  // => ['🌍', '🎉']
```

---

## 6. Anti-Patterns

### 6.1 Anti-Pattern: Uncontrolled Use of `.*`

```python
import re

# NG: Greedy .* matches an unexpectedly wide range
html = '<span class="a">hello</span><span class="b">world</span>'
bad = re.search(r'<span.*>.*</span>', html)
print(bad.group())
# => '<span class="a">hello</span><span class="b">world</span>'
# The entire string matches!

# OK: Use negated character classes or lazy quantifiers
# Method 1: Lazy quantifier
good1 = re.findall(r'<span.*?>.*?</span>', html)
print(good1)  # => ['<span class="a">hello</span>', ...]

# Method 2: Negated character class (faster)
good2 = re.findall(r'<span[^>]*>[^<]*</span>', html)
print(good2)  # => ['<span class="a">hello</span>', ...]
```

### 6.2 Anti-Pattern: Forgetting the MULTILINE Flag with `^` and `$`

```python
import re

text = """user: admin
user: guest
user: root"""

# NG: Expecting to match each line start without MULTILINE
bad = re.findall(r'^user: (\w+)', text)
print(bad)  # => ['admin']  -- first line only

# OK: Add the MULTILINE flag
good = re.findall(r'^user: (\w+)', text, re.MULTILINE)
print(good)  # => ['admin', 'guest', 'root']
```

### 6.3 Anti-Pattern: ReDoS from Nested Quantifiers

```python
import re
import time

# Dangerous: Nested quantifiers cause exponential backtracking
dangerous_patterns = [
    r'(a+)+b',          # Nested +
    r'(a*)*b',          # Nested *
    r'(a|a)*b',         # Overlapping alternatives + quantifier
    r'(.*a){10}',       # Mass repetition of .*
    r'(\w+\s*)+$',      # Common input validation pattern
]

safe_input = "a" * 20 + "b"      # Matches -> fast
evil_input = "a" * 25             # No match -> exponentially slow

for pattern in dangerous_patterns:
    # Safe input
    start = time.perf_counter()
    re.search(pattern, safe_input)
    safe_time = time.perf_counter() - start

    # Malicious input (with timeout)
    # Warning: actual execution can be extremely slow
    print(f"Pattern: {pattern}")
    print(f"  Safe input: {safe_time:.6f} sec")
    # evil_input test omitted (ReDoS risk)

# Safe alternative patterns
safe_alternatives = {
    r'(a+)+b':     r'a+b',           # Remove nesting
    r'(a*)*b':     r'a*b',           # Remove nesting
    r'(a|a)*b':    r'a*b',           # Remove duplication
    r'(\w+\s*)+$': r'[\w\s]+$',      # Consolidate into character class
}
```

### 6.4 Anti-Pattern: Unnecessary Quantifiers

```python
import re

# NG: Unnecessarily complex quantifiers
bad_patterns = {
    r'\d{1,}':    r'\d+',       # {1,} is the same as +
    r'\d{0,}':    r'\d*',       # {0,} is the same as *
    r'\d{0,1}':   r'\d?',       # {0,1} is the same as ?
    r'[a-z]{1}':  r'[a-z]',     # {1} is unnecessary
    r'(?:ab){1}': r'ab',        # Group with {1} is also unnecessary
}

for bad, good in bad_patterns.items():
    print(f"NG: {bad:20s} -> OK: {good}")

# NG: Unnecessary quantifiers inside groups
# When (?:  )+ has a quantifier inside, check if both inner and outer are needed
text = "hello   world   foo"

# Redundant: group is unnecessary
print(re.split(r'(?:\s)+', text))    # => ['hello', 'world', 'foo']
# Concise:
print(re.split(r'\s+', text))        # => ['hello', 'world', 'foo']
```

### 6.5 Anti-Pattern: Misusing `\b`

```python
import re

# NG: Incorrect assumptions about word boundaries with digit-only sequences
text = "item123"
print(re.findall(r'\b\d+\b', text))
# => [] (empty!) -- The \b before '123' is between 'm' and '1', but
#    there is no non-word character before 123 (\b is the \w->\W transition point)

# Correct understanding:
# In 'item123':
# - \b before 'i' (start of string)
# - \b after '3' (end of string)
# - Between 'm' and '1' is \w->\w so it is NOT \b!
# Therefore \b\d+\b does not find '123' as a standalone word

# OK: Use the correct pattern for the purpose
# 1. Search for standalone numbers (preceded/followed by non-word chars)
print(re.findall(r'(?<!\w)\d+(?!\w)', text))  # => []
# 2. Extract digit portions from a string
print(re.findall(r'\d+', text))  # => ['123']
# 3. Standalone numbers only (whitespace-separated)
text2 = "item123 456 foo"
print(re.findall(r'\b\d+\b', text2))  # => ['456']
```

---

## 7. Practical Pattern Collection

### 7.1 Log Analysis Patterns

```python
import re

log_entries = """
2026-02-11T10:30:45.123Z INFO  [main] Application starting
2026-02-11T10:30:46.456Z DEBUG [db] Connection pool initialized (size=10)
2026-02-11T10:30:47.789Z ERROR [api] Request timeout after 30000ms
2026-02-11T10:30:48.012Z WARN  [mem] Memory usage: 85% (threshold: 80%)
2026-02-11T10:30:49.345Z ERROR [api] Internal server error: NullPointerException
2026-02-11T10:30:50.678Z INFO  [main] Shutdown initiated
"""

# 1. Decompose timestamp, level, component, and message
log_pattern = r'^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)\s+(INFO|DEBUG|WARN|ERROR)\s+\[(\w+)\]\s+(.+)$'

for match in re.finditer(log_pattern, log_entries, re.MULTILINE):
    ts, level, component, message = match.groups()
    print(f"[{level:5s}] {component:6s} | {message}")

# 2. Extract only ERROR level (entire lines)
errors = re.findall(r'^.*ERROR.*$', log_entries, re.MULTILINE)
for err in errors:
    print(f"ERROR: {err.strip()}")

# 3. Extract numerical values (metrics analysis)
metrics = re.findall(r'(\w+)[=:]\s*(\d+(?:\.\d+)?)', log_entries)
for key, value in metrics:
    print(f"  {key} = {value}")
# size = 10, threshold = 80, etc.

# 4. Time range filter
def filter_time_range(logs, start_time, end_time):
    """Filter logs within a specified time range"""
    pattern = rf'^({re.escape(start_time)}.*?{re.escape(end_time)}.*?)$'
    # More accurate approach: compare each line's timestamp
    result = []
    for line in logs.strip().split('\n'):
        m = re.match(r'^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})', line)
        if m:
            ts = m.group(1)
            if start_time <= ts <= end_time:
                result.append(line)
    return result

filtered = filter_time_range(log_entries, "2026-02-11T10:30:47", "2026-02-11T10:30:49")
for line in filtered:
    print(line.strip())
```

### 7.2 Data Cleansing Patterns

```python
import re

# 1. Phone number normalization
def normalize_phone(phone):
    """Convert various phone number formats to a unified format"""
    # Remove non-digits
    digits = re.sub(r'\D', '', phone)

    # Japanese phone number patterns
    # Mobile: 090-XXXX-XXXX / 080-XXXX-XXXX / 070-XXXX-XXXX
    if re.match(r'^0[789]0\d{8}$', digits):
        return f"{digits[:3]}-{digits[3:7]}-{digits[7:]}"
    # Landline (Tokyo): 03-XXXX-XXXX
    elif re.match(r'^0[3-9]\d{8}$', digits):
        return f"{digits[:2]}-{digits[2:6]}-{digits[6:]}"
    # Landline (other): 0XXX-XX-XXXX
    elif re.match(r'^0\d{9}$', digits):
        return f"{digits[:4]}-{digits[4:6]}-{digits[6:]}"
    return phone  # Unable to convert

tests = [
    "090-1234-5678", "09012345678", "090 1234 5678",
    "03-1234-5678", "0312345678", "(03) 1234-5678"
]
for t in tests:
    print(f"{t:20s} -> {normalize_phone(t)}")

# 2. Currency normalization
def normalize_currency(text):
    """Convert currency notation to a unified format"""
    # Remove comma separators
    text = re.sub(r'(\d),(\d)', r'\1\2', text)
    # Full-width digits -> half-width
    zen_to_han = str.maketrans('０１２３４５６７８９', '0123456789')
    text = text.translate(zen_to_han)
    # Handle "man" (10,000) and "oku" (100,000,000) units
    text = re.sub(r'(\d+)万(\d*)', lambda m: str(int(m.group(1)) * 10000 + int(m.group(2) or 0)), text)
    text = re.sub(r'(\d+)億', lambda m: str(int(m.group(1)) * 100000000), text)
    return text

print(normalize_currency("1,234,567円"))  # => 1234567円
print(normalize_currency("１２３４円"))     # => 1234円
print(normalize_currency("5万3000"))       # => 53000

# 3. Address normalization
def normalize_address(addr):
    """Standardize notation variations in Japanese addresses"""
    # Full-width digits -> half-width
    zen_to_han = str.maketrans('０１２３４５６７８９', '0123456789')
    addr = addr.translate(zen_to_han)
    # Standardize "chome" "banchi" "go" notation
    addr = re.sub(r'(\d+)丁目(\d+)番地?(\d+)号?', r'\1-\2-\3', addr)
    addr = re.sub(r'(\d+)丁目(\d+)番地?', r'\1-\2', addr)
    addr = re.sub(r'(\d+)丁目', r'\1', addr)
    return addr

print(normalize_address("東京都港区赤坂1丁目2番地3号"))
# => 東京都港区赤坂1-2-3
print(normalize_address("東京都港区赤坂１丁目２番地３号"))
# => 東京都港区赤坂1-2-3
```

### 7.3 Programming Language Token Analysis

```python
import re

def tokenize(source_code):
    """Simple tokenizer: parses Python-like expressions"""
    token_spec = [
        ('NUMBER',    r'\d+\.?\d*(?:[eE][+-]?\d+)?'),  # Integer, decimal, exponent
        ('STRING',    r'"(?:[^"\\]|\\.)*"|\'(?:[^\'\\]|\\.)*\''),  # Strings
        ('IDENT',     r'[a-zA-Z_]\w*'),                 # Identifiers
        ('OP',        r'[+\-*/=<>!]=?|[(){}[\],;.]'),   # Operators
        ('NEWLINE',   r'\n'),                            # Newlines
        ('SKIP',      r'[ \t]+'),                        # Whitespace (skip)
        ('COMMENT',   r'#.*'),                           # Comments
        ('MISMATCH',  r'.'),                             # Unknown characters
    ]

    tok_regex = '|'.join(f'(?P<{name}>{pattern})' for name, pattern in token_spec)
    tokens = []

    for m in re.finditer(tok_regex, source_code):
        kind = m.lastgroup
        value = m.group()
        if kind == 'SKIP' or kind == 'COMMENT':
            continue
        elif kind == 'MISMATCH':
            raise SyntaxError(f"Unexpected character: {value!r}")
        tokens.append((kind, value))

    return tokens

# Test
code = 'x = 3.14 + y * 2  # calculation'
for tok in tokenize(code):
    print(f"  {tok[0]:10s}: {tok[1]}")
# NUMBER    : 3.14
# OP        : +
# IDENT     : y
# OP        : *
# NUMBER    : 2
# etc.
```

### 7.4 URL / URI Parsing

```python
import re

def parse_url(url):
    """URI parsing based on RFC 3986"""
    pattern = r'''
        ^
        (?:(?P<scheme>[a-zA-Z][a-zA-Z0-9+.-]*):)?  # Scheme
        (?://
            (?:(?P<userinfo>[^@]*)@)?               # User info
            (?P<host>[^/:?#]*)                      # Host
            (?::(?P<port>\d+))?                     # Port
        )?
        (?P<path>[^?#]*)                            # Path
        (?:\?(?P<query>[^#]*))?                     # Query
        (?:\#(?P<fragment>.*))?                      # Fragment
        $
    '''

    m = re.match(pattern, url, re.VERBOSE)
    if not m:
        return None

    return {k: v for k, v in m.groupdict().items() if v is not None}

# Test
urls = [
    "https://user:pass@example.com:8080/path/to/page?q=hello&lang=ja#section",
    "ftp://files.example.com/pub/docs/readme.txt",
    "/api/v2/users?page=1&limit=20",
    "mailto:user@example.com",
]

for url in urls:
    print(f"\nURL: {url}")
    parts = parse_url(url)
    for k, v in parts.items():
        print(f"  {k:12s}: {v}")
```

### 7.5 Parsing Markdown Inline Elements

```python
import re

def parse_markdown_inline(text):
    """Parse Markdown inline elements"""
    patterns = [
        # Bold (**bold** / __bold__)
        (r'\*\*(.+?)\*\*|__(.+?)__', 'bold'),
        # Italic (*italic* / _italic_)
        (r'(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)|(?<!_)_(?!_)(.+?)(?<!_)_(?!_)', 'italic'),
        # Inline code (`code`)
        (r'`([^`]+)`', 'code'),
        # Link ([text](url))
        (r'\[([^\]]+)\]\(([^)]+)\)', 'link'),
        # Image (![alt](url))
        (r'!\[([^\]]*)\]\(([^)]+)\)', 'image'),
        # Strikethrough (~~text~~)
        (r'~~(.+?)~~', 'strikethrough'),
    ]

    elements = []
    for pattern, elem_type in patterns:
        for m in re.finditer(pattern, text):
            elements.append({
                'type': elem_type,
                'match': m.group(),
                'start': m.start(),
                'end': m.end(),
            })

    # Sort by position
    elements.sort(key=lambda x: x['start'])
    return elements

md_text = "This is **bold** and *italic* with `code` and [link](https://example.com)"
for elem in parse_markdown_inline(md_text):
    print(f"  {elem['type']:15s}: {elem['match']}")
```

---

## 8. FAQ

### Q1: Which is faster, `.*` or `[^X]*`?

**A**: In general, **`[^X]*` is faster**. `.*` is prone to backtracking, while `[^X]*` explicitly specifies the stop character, avoiding unnecessary backtracking:

```python
import re

# Slow: .* causes heavy backtracking
slow = r'<tag>.*</tag>'

# Fast: [^<]* matches only non-< characters
fast = r'<tag>[^<]*</tag>'

# Even faster: possessive quantifier (Java, etc.)
# fastest = '<tag>[^<]*+</tag>'
```

### Q2: Is there a difference between `{0,}` and `*`?

**A**: The meaning is completely identical. `*` is syntactic sugar for `{0,}`. They are processed identically inside the engine. Prefer `*` `+` `?` for readability, and use `{n,m}` when specific repetition counts are needed.

### Q3: Is it always safe to use lazy quantifiers?

**A**: **No**. Lazy quantifiers only change the direction of backtracking; they do not eliminate backtracking itself. Certain patterns can still cause ReDoS even with lazy quantifiers:

```python
# Example of a pattern that is slow even when lazy:
# Pattern: (a+?)+b
# Text:    "aaaaaaaaaaaaaaaaac"
# -> Exponential backtracking occurs even with lazy matching

# What IS safe:
# 1. Use negated character classes [^X]*
# 2. Use a DFA engine (RE2, etc.)
# 3. Use possessive quantifiers/atomic groups
```

### Q4: Does `\b` work with Japanese text?

**A**: The standard `\b` is an **ASCII word character boundary** and often does not work as expected with Japanese text:

```python
import re

text = "東京タワーは333mです"

# \b is based on ASCII's \w ([a-zA-Z0-9_])
# Japanese characters are treated as \W -> every character boundary applies
print(re.findall(r'\b.+?\b', text))
# => ['東', '京', 'タ', 'ワ', 'ー', 'は', '333', 'm', 'で', 'す']

# To handle Japanese "words":
# 1. Use morphological analysis like MeCab (recommended)
# 2. Use Unicode word boundaries (ICU)
# 3. Use \b{w} from the regex module
import regex
print(regex.findall(r'\b{w}.+?\b{w}', text))
# Segmentation by Unicode word boundaries
```

### Q5: What is the difference between `re.fullmatch` and `^...$`?

**A**: They are equivalent in most cases, but differ in interaction with the MULTILINE flag:

```python
import re

text = "hello\nworld"

# re.fullmatch always checks the entire string
print(re.fullmatch(r'\w+', text))  # => None (newline present)

# ^...$ behavior changes with MULTILINE
print(re.match(r'^\w+$', text, re.M))  # => <Match: 'hello'> (matches first line)
print(re.fullmatch(r'\w+', "hello"))    # => <Match: 'hello'>

# fullmatch is not affected by MULTILINE (always checks the entire string)
print(re.fullmatch(r'\w+', text, re.M))  # => None
```

### Q6: What are alternatives when possessive quantifiers are unavailable?

**A**: Use atomic groups or in-code countermeasures:

```python
import re

# Python's re module does not support possessive quantifiers
# Alternatives:

# 1. Use the regex module (recommended)
# import regex
# regex.search(r'a++b', text)

# 2. Use negated character classes to avoid backtracking
# NG: .*  (massive backtracking)
# OK: [^<]*  (explicitly specify stop character)

# 3. Set a timeout
import signal

def timeout_handler(signum, frame):
    raise TimeoutError("Regex timeout")

def safe_search(pattern, text, timeout_sec=1):
    """Regex search with timeout"""
    old_handler = signal.signal(signal.SIGALRM, timeout_handler)
    signal.alarm(timeout_sec)
    try:
        return re.search(pattern, text)
    except TimeoutError:
        return None
    finally:
        signal.alarm(0)
        signal.signal(signal.SIGALRM, old_handler)

# 4. Limit input length
def safe_match(pattern, text, max_len=10000):
    """Regex match with input length restriction"""
    if len(text) > max_len:
        raise ValueError(f"Input too long: {len(text)} > {max_len}")
    return re.search(pattern, text)
```

### Q7: Is there a hard limit on quantifier upper bounds?

**A**: It varies by engine:

```
┌──────────────┬──────────────────────────────┐
│ Engine       │ Upper limit for {n,m}        │
├──────────────┼──────────────────────────────┤
│ Python (re)  │ 2^31 - 1 (2147483647)        │
│ JavaScript   │ 2^32 - 1 (browser-dependent) │
│ Java         │ 2^31 - 1                     │
│ PCRE         │ 65535                         │
│ Ruby         │ No limit (memory-dependent)   │
│ Go (RE2)     │ 1000 (default)               │
│ Rust (regex) │ No limit (memory-dependent)   │
└──────────────┴──────────────────────────────┘

# In practice, overly large {n,m} values increase
# compile time and memory usage, so ~100 is a
# reasonable practical upper bound
```

### Q8: How can I use the `\G` anchor in Python?

**A**: Python's `re` module does not have `\G`, but you can use the `regex` module or `re.scanner` as alternatives:

```python
# regex module
import regex

text = "abc123def456"
tokens = []
pos = 0

# Consecutive matching using \G
for m in regex.finditer(r'\G(?:(\w+)|(\d+))', text):
    tokens.append(m.group())

# Alternative with the re module: Scanner
import re
scanner = re.Scanner([
    (r'[a-z]+', lambda s, t: ('WORD', t)),
    (r'\d+',    lambda s, t: ('NUM', t)),
    (r'\s+',    None),  # Skip
])

tokens, remainder = scanner.scan("abc 123 def 456")
for tok in tokens:
    print(tok)
# ('WORD', 'abc')
# ('NUM', '123')
# ('WORD', 'def')
# ('NUM', '456')
```

---


## FAQ

### Q1: What is the most important point when learning this topic?

Building practical experience is the most important thing. Understanding deepens not just through theory, but by actually writing code and verifying how it works.

### Q2: What are common mistakes beginners make?

Skipping the fundamentals and jumping to advanced topics. We recommend thoroughly understanding the basic concepts covered in this guide before moving to the next step.

### Q3: How is this applied in real-world work?

Knowledge of this topic is frequently applied in everyday development work. It is especially important during code reviews and architecture design.

---

## Summary

| Item | Description |
|------|-------------|
| `*` | 0 or more (greedy) |
| `+` | 1 or more (greedy) |
| `?` | 0 or 1 (greedy) |
| `{n,m}` | n to m times |
| `*?` `+?` `??` | Lazy (shortest match) versions |
| `*+` `++` `?+` | Possessive (no backtracking) versions |
| `(?>...)` | Atomic group |
| `^` | Line start / string start |
| `$` | Line end / string end |
| `\b` | Word boundary |
| `\B` | Non-word boundary |
| `\A` / `\Z` | Absolute string start/end |
| `\z` | Absolute string end (some languages) |
| `\G` | End position of previous match |
| Greedy vs. Lazy | Greedy is longest, lazy is shortest |
| Performance | `[^X]*` > `.*?` > `.*` (generally) |
| ReDoS prevention | Avoid nested quantifiers; use negated classes or possessive quantifiers |

## Recommended Next Guides

- [../01-advanced/00-groups-backreferences.md](../01-advanced/00-groups-backreferences.md) -- Groups and Backreferences
- [../01-advanced/01-lookaround.md](../01-advanced/01-lookaround.md) -- Lookahead and Lookbehind
- [../01-advanced/03-performance.md](../01-advanced/03-performance.md) -- Performance Optimization and ReDoS Prevention

## References

1. **Jeffrey E.F. Friedl** "Mastering Regular Expressions" O'Reilly, 2006 -- Chapter 4 "The Mechanics of Quantifiers" and Chapter 6 "Backtracking" are essential reading
2. **Russ Cox** "Regular Expression Matching: the Virtual Machine Approach" https://swtch.com/~rsc/regexp/regexp2.html, 2009 -- Theoretical analysis of backtracking
3. **Jan Goyvaerts** "Regular-Expressions.info" https://www.regular-expressions.info/repeat.html -- Practical explanation of quantifiers
4. **OWASP** "Regular expression Denial of Service - ReDoS" https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS -- ReDoS attacks and defenses
5. **Python Documentation** "re --- Regular expression operations" https://docs.python.org/3/library/re.html -- Official Python reference



===== SOURCE: 02-programming/regex-and-text-processing/docs/01-advanced/00-groups-backreferences.md =====

# Groups and Backreferences -- Capturing, Named Groups, Lookahead/Lookbehind

> Grouping bundles subexpressions of a pattern, and backreferences reuse matched substrings. Accurately understand the differences between capture groups, non-capture groups, and named groups, and apply them in replacement, extraction, and validation. This guide also covers advanced group syntax including lookahead/lookbehind, atomic groups, and conditional branching patterns.

## What You Will Learn

1. **Capture Groups and Non-Capture Groups** -- The difference between `(...)` and `(?:...)`, and their impact on performance
2. **Named Groups** -- Designing readable patterns with `(?P<name>...)`
3. **Backreferences and Replacement** -- Reusing match results with `\1` and `\k<name>`
4. **Lookahead and Lookbehind (Lookaround)** -- Zero-width assertions with `(?=...)`, `(?!...)`, `(?<=...)`, `(?<!...)`
5. **Atomic Groups** -- Suppressing backtracking with `(?>...)` for performance optimization
6. **Conditional Branching Patterns** -- Conditional matching with `(?(id)yes|no)`


## Prerequisites

The following knowledge will help you get the most out of this guide:

- Basic programming knowledge
- Understanding of related foundational concepts

---

## 1. Capture Groups `(...)`

### 1.1 Basic Usage

```python
import re

# Extract year, month, and day individually from a date pattern
pattern = r'(\d{4})-(\d{2})-(\d{2})'
text = "Today is 2026-02-11"

match = re.search(pattern, text)
print(match.group(0))  # => '2026-02-11' (entire match)
print(match.group(1))  # => '2026'       (group 1: year)
print(match.group(2))  # => '02'         (group 2: month)
print(match.group(3))  # => '11'         (group 3: day)
print(match.groups())  # => ('2026', '02', '11')
```

### 1.2 Group Numbering

```
Pattern: ((A)(B(C)))

Group number assignment (in order of opening parenthesis appearance):

  (  (  A  )  (  B  (  C  )  )  )
  ^  ^        ^     ^
  1  2        3     4

  Group 0: entire match
  Group 1: ((A)(B(C)))  = "ABC"
  Group 2: (A)          = "A"
  Group 3: (B(C))       = "BC"
  Group 4: (C)          = "C"
```

```python
import re

pattern = r'((A)(B(C)))'
match = re.search(pattern, "ABC")

print(match.group(0))  # => 'ABC'
print(match.group(1))  # => 'ABC'
print(match.group(2))  # => 'A'
print(match.group(3))  # => 'BC'
print(match.group(4))  # => 'C'
```

### 1.3 Combining Groups with Alternation

```python
import re

# Alternation (|) inside a group
pattern = r'(cat|dog|bird)s?'
text = "I have 2 cats and 3 dogs"

matches = re.findall(pattern, text)
print(matches)  # => ['cat', 'dog']
# Note: findall returns group contents when groups are present

# When you need the full match rather than just group contents
matches_full = re.finditer(pattern, text)
for m in matches_full:
    print(f"  Full: {m.group(0)}, Group 1: {m.group(1)}")
# => Full: cats, Group 1: cat
# => Full: dogs, Group 1: dog
```

### 1.4 Practical Example with Nested Groups

```python
import re

# Extracting HTML attributes: class="value" or class='value'
html = '<div class="main container" id="app" data-role=\'admin\'>'
pattern = r'(\w+)=((["\'])(.*?)\3)'

for m in re.finditer(pattern, html):
    print(f"  Attribute: {m.group(1)}, Value: {m.group(4)}, Quote: {m.group(3)}")
# => Attribute: class, Value: main container, Quote: "
# => Attribute: id, Value: app, Quote: "
# => Attribute: data-role, Value: admin, Quote: '
```

### 1.5 Using Multiple Groups Simultaneously

```python
import re

# Log analysis: extract timestamp, level, and message in one pass
log_pattern = re.compile(
    r'\[(\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2})\]\s+'  # Group 1: timestamp
    r'\[(DEBUG|INFO|WARN|ERROR|FATAL)\]\s+'              # Group 2: log level
    r'\[(\w+)\]\s+'                                      # Group 3: module name
    r'(.*)'                                              # Group 4: message
)

log_lines = [
    "[2026-02-11 10:30:45] [ERROR] [AuthModule] Login failed for user admin",
    "[2026-02-11 10:31:00] [INFO] [Database] Connection pool initialized (size=10)",
    "[2026-02-11 10:31:15] [WARN] [Cache] Cache miss rate exceeds 50%",
]

for line in log_lines:
    m = log_pattern.search(line)
    if m:
        ts, level, module, msg = m.groups()
        print(f"  {ts} | {level:5s} | {module:12s} | {msg}")
```

### 1.6 Capture Groups in JavaScript

```javascript
// Capture groups in JavaScript
const text = "2026-02-11 Error at 10:30:45";
const pattern = /(\d{4})-(\d{2})-(\d{2})/;

const match = text.match(pattern);
console.log(match[0]);  // '2026-02-11' (full match)
console.log(match[1]);  // '2026' (group 1)
console.log(match[2]);  // '02' (group 2)
console.log(match[3]);  // '11' (group 3)

// Retrieving all groups with matchAll (ES2020)
const logPattern = /\[(\w+)\]\s+(\w+)/g;
const logText = "[ERROR] AuthFailed [WARN] HighLoad";

for (const m of logText.matchAll(logPattern)) {
    console.log(`Level: ${m[1]}, Message: ${m[2]}`);
}
// => Level: ERROR, Message: AuthFailed
// => Level: WARN, Message: HighLoad
```

### 1.7 Capture Groups in Go

```go
package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := "2026-02-11 Error at 10:30:45"
    re := regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)

    // FindStringSubmatch: returns result with submatches
    match := re.FindStringSubmatch(text)
    if match != nil {
        fmt.Printf("Full: %s, Year: %s, Month: %s, Day: %s\n",
            match[0], match[1], match[2], match[3])
    }

    // FindAllStringSubmatch: submatches for all matches
    allMatches := re.FindAllStringSubmatch(text, -1)
    for _, m := range allMatches {
        fmt.Printf("  Match: %v\n", m)
    }
}
```

### 1.8 Capture Groups in Rust

```rust
use regex::Regex;

fn main() {
    let text = "2026-02-11 Error at 10:30:45";
    let re = Regex::new(r"(\d{4})-(\d{2})-(\d{2})").unwrap();

    // captures: match with capture groups
    if let Some(caps) = re.captures(text) {
        println!("Full: {}", &caps[0]);
        println!("Year: {}", &caps[1]);
        println!("Month: {}", &caps[2]);
        println!("Day: {}", &caps[3]);
    }

    // captures_iter: captures for all matches
    for caps in re.captures_iter(text) {
        println!("  Match: {}", &caps[0]);
    }
}
```

---

## 2. Non-Capture Groups `(?:...)`

### 2.1 Grouping Without Capturing

```python
import re

# Capture group -- a group number is assigned
pattern_capture = r'(https?)://([\w.]+)'
match = re.search(pattern_capture, "https://example.com")
print(match.group(1))  # => 'https'
print(match.group(2))  # => 'example.com'

# Non-capture group -- no group number is assigned
pattern_noncapture = r'(?:https?)://([\w.]+)'
match = re.search(pattern_noncapture, "https://example.com")
print(match.group(1))  # => 'example.com' (numbering doesn't shift)
# match.group(2) -> error (group 2 does not exist)
```

### 2.2 Guidelines for Choosing Between Them

```
When to use capture groups:
  * You want to use the matched substring later (extraction)
  * You need backreferences (\1, \2)
  * You want to reference in replacement (\1 or $1)

When to use non-capture groups:
  * Grouping is needed for quantifiers or alternation but the value is not needed
  * You want to gain a slight performance improvement
  * You don't want group numbers to shift
```

```python
import re

# BAD: Unnecessary capturing -- group numbers increase needlessly
pattern_bad = r'(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar) (\d{4})'
# Groups: 1=weekday, 2=day, 3=month, 4=year
# If weekday (group 1) is not needed, numbers shift unnecessarily

# GOOD: Non-capture for unnecessary parts
pattern_good = r'(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar) (\d{4})'
# Groups: 1=day, 2=month, 3=year -- only needed parts get numbered
```

### 2.3 Performance Measurement

```python
import re
import timeit

text = "The quick brown fox jumps over the lazy dog" * 1000

# Capture group version
pattern_capture = re.compile(r'(\w+)\s+(\w+)\s+(\w+)\s+(\w+)')

# Non-capture group version
pattern_noncapture = re.compile(r'(?:\w+)\s+(?:\w+)\s+(?:\w+)\s+(?:\w+)')

# Benchmark
t_capture = timeit.timeit(
    lambda: pattern_capture.findall(text), number=1000
)
t_noncapture = timeit.timeit(
    lambda: pattern_noncapture.findall(text), number=1000
)

print(f"Capture version:     {t_capture:.4f}s")
print(f"Non-capture version: {t_noncapture:.4f}s")
print(f"Speed difference: {(t_capture - t_noncapture) / t_capture * 100:.1f}%")
# Non-capture version is typically 5-15% faster
```

### 2.4 Using Non-Capture Groups in Complex Patterns

```python
import re

# DateTime pattern: structured with non-capture, capturing only needed parts
datetime_pattern = re.compile(r'''
    (?P<date>                          # Full date (named capture)
        (?P<year>\d{4})                # Year (named capture)
        [-/]                           # Separator (no grouping needed)
        (?P<month>\d{2})               # Month (named capture)
        [-/]                           # Separator
        (?P<day>\d{2})                 # Day (named capture)
    )
    (?:\s+|T)                          # Date-time separator (non-capture)
    (?P<time>                          # Full time (named capture)
        (?P<hour>\d{2})                # Hour (named capture)
        :(?P<minute>\d{2})             # Minute (named capture)
        (?::(?P<second>\d{2}))?        # Second (optional, named capture)
    )
    (?:\s*(?P<tz>[A-Z]{3,4}|[+-]\d{2}:?\d{2}))?  # Timezone (optional)
''', re.VERBOSE)

test_strings = [
    "2026-02-11 10:30:45 JST",
    "2026/02/11T10:30",
    "2026-02-11 10:30:45+09:00",
]

for s in test_strings:
    m = datetime_pattern.search(s)
    if m:
        print(f"  Input: {s}")
        print(f"    Date: {m.group('date')}, Time: {m.group('time')}")
        print(f"    Year: {m.group('year')}, Month: {m.group('month')}, Day: {m.group('day')}")
        tz = m.group('tz')
        if tz:
            print(f"    TZ: {tz}")
```

---

## 3. Named Groups

### 3.1 Syntax (by Language)

```
+------------+----------------------+------------------+
| Language   | Definition           | Reference        |
+------------+----------------------+------------------+
| Python     | (?P<name>...)        | (?P=name), \g<name>|
| Perl       | (?<name>...)         | \k<name>          |
| Java       | (?<name>...)         | \k<name>          |
| .NET       | (?<name>...)         | \k<name>          |
| JavaScript | (?<name>...)         | \k<name>          |
| Go (RE2)   | (?P<name>...)        | (no backreference)|
| Rust       | (?P<name>...)        | (no backreference)|
+------------+----------------------+------------------+
```

### 3.2 Named Groups in Python

```python
import re

# Parse a date using named groups
pattern = r'(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})'
text = "Date: 2026-02-11"

match = re.search(pattern, text)

# Access by name
print(match.group('year'))   # => '2026'
print(match.group('month'))  # => '02'
print(match.group('day'))    # => '11'

# Get as dictionary with groupdict()
print(match.groupdict())
# => {'year': '2026', 'month': '02', 'day': '11'}

# Access by number is also possible
print(match.group(1))  # => '2026'
```

### 3.3 Named Groups in JavaScript (ES2018+)

```javascript
// Named groups in JavaScript
const pattern = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const text = "Date: 2026-02-11";

const match = text.match(pattern);
console.log(match.groups);
// => { year: '2026', month: '02', day: '11' }
console.log(match.groups.year);   // => '2026'

// Combining with destructuring
const { year, month, day } = match.groups;
console.log(`${year}/${month}/${day}`);
// => '2026/02/11'

// Named group reference in replace
const result = "2026-02-11".replace(
    /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/,
    '$<day>/$<month>/$<year>'
);
console.log(result);  // => '11/02/2026'

// String.prototype.replaceAll + named groups (ES2021)
const multiDates = "Start: 2026-02-11, End: 2026-03-15";
const formatted = multiDates.replaceAll(
    /(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})/g,
    '$<d>/$<m>/$<y>'
);
console.log(formatted);
// => 'Start: 11/02/2026, End: 15/03/2026'
```

### 3.4 Named Groups in Go

```go
package main

import (
    "fmt"
    "regexp"
)

func main() {
    // Named groups in Go: (?P<name>...)
    re := regexp.MustCompile(`(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})`)
    text := "Date: 2026-02-11"

    match := re.FindStringSubmatch(text)
    if match == nil {
        return
    }

    // Get names with SubexpNames()
    result := make(map[string]string)
    for i, name := range re.SubexpNames() {
        if i != 0 && name != "" {
            result[name] = match[i]
        }
    }

    fmt.Printf("Year: %s, Month: %s, Day: %s\n",
        result["year"], result["month"], result["day"])
    // => Year: 2026, Month: 02, Day: 11

    // Organized as a helper function
    fmt.Println(extractNamedGroups(re, text))
}

// Generic helper function
func extractNamedGroups(re *regexp.Regexp, text string) map[string]string {
    match := re.FindStringSubmatch(text)
    if match == nil {
        return nil
    }
    result := make(map[string]string)
    for i, name := range re.SubexpNames() {
        if i != 0 && name != "" {
            result[name] = match[i]
        }
    }
    return result
}
```

### 3.5 Named Groups in Rust

```rust
use regex::Regex;
use std::collections::HashMap;

fn main() {
    let re = Regex::new(r"(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})").unwrap();
    let text = "Date: 2026-02-11";

    if let Some(caps) = re.captures(text) {
        // Access by name
        println!("Year: {}", &caps["year"]);    // => Year: 2026
        println!("Month: {}", &caps["month"]);   // => Month: 02
        println!("Day: {}", &caps["day"]);     // => Day: 11

        // Get Option<Match> with the name() method
        if let Some(year) = caps.name("year") {
            println!("Year position: {}-{}", year.start(), year.end());
        }
    }

    // Convert named groups from all matches to HashMap
    let results: Vec<HashMap<&str, &str>> = re.captures_iter(text)
        .map(|caps| {
            re.capture_names()
                .flatten()
                .filter_map(|name| {
                    caps.name(name).map(|m| (name, m.as_str()))
                })
                .collect()
        })
        .collect();

    println!("{:?}", results);
}
```

### 3.6 Naming Conventions for Named Groups

```
Recommended naming conventions:
+--------------------------------------------------------+
| * Lowercase letters + underscores (snake_case)         |
|   e.g., (?P<first_name>...) (?P<area_code>...)        |
|                                                        |
| * Clear, meaningful names                              |
|   e.g., (?P<protocol>https?) (?P<port>\d{1,5})        |
|                                                        |
| x Avoid:                                               |
|   - Names too short: (?P<p>...) (?P<x>...)             |
|   - Number-like names: (?P<group1>...) (?P<g2>...)     |
|   - Hyphens: (?P<first-name>...) -> syntax error       |
|   - Reserved-word-like: (?P<class>...) (?P<type>...)   |
+--------------------------------------------------------+
```

---

## 4. Backreferences

### 4.1 Backreferences Within a Pattern

```python
import re

# \1 references the match from group 1
# Detect repetitions of the same string

# Matching HTML opening and closing tags
pattern = r'<(\w+)>.*?</\1>'
text = '<div>hello</div> <span>world</span>'

matches = re.findall(pattern, text)
print(matches)  # => ['div', 'span']

# Detecting duplicate words
pattern = r'\b(\w+)\s+\1\b'
text = "the the quick brown fox fox"
print(re.findall(pattern, text))  # => ['the', 'fox']
```

### 4.2 Named Backreferences

```python
import re

# (?P=name) backreferences a named group
pattern = r'(?P<quote>["\']).*?(?P=quote)'
text = """He said "hello" and 'world'"""

matches = re.findall(pattern, text)
print(matches)  # => ['"', "'"]

# Use finditer to get the full match
for m in re.finditer(pattern, text):
    print(m.group())
# => "hello"
# => 'world'
```

### 4.3 Backreferences in Replacement

```python
import re

# \1 or \g<1> references a group during replacement
text = "2026-02-11"

# Date format conversion: YYYY-MM-DD -> DD/MM/YYYY
result = re.sub(r'(\d{4})-(\d{2})-(\d{2})', r'\3/\2/\1', text)
print(result)  # => '11/02/2026'

# Replacement with named groups
result = re.sub(
    r'(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})',
    r'\g<day>/\g<month>/\g<year>',
    text
)
print(result)  # => '11/02/2026'

# Advanced replacement using a function
def format_date(match):
    y, m, d = match.group('year'), match.group('month'), match.group('day')
    return f"{y}/{m}/{d}"

result = re.sub(
    r'(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})',
    format_date,
    text
)
print(result)  # => '2026/02/11'
```

### 4.4 Applied Backreference Patterns

```python
import re

# 1. Palindrome detection (3-5 character palindromes)
palindrome_3 = r'\b(\w)(\w)\2\1\b'  # 4-character palindrome
text = "abba deed noon hello"
for m in re.finditer(palindrome_3, text):
    print(f"  Palindrome: {m.group()}")
# => Palindrome: abba
# => Palindrome: deed
# => Palindrome: noon

# 2. XML/HTML matching tag detection (no nesting)
xml_tag = r'<(?P<tag>\w+)(?:\s[^>]*)?>(?P<content>.*?)</(?P=tag)>'
html = '<p class="intro">Hello</p> <div>World</div>'
for m in re.finditer(xml_tag, html):
    print(f"  Tag: {m.group('tag')}, Content: {m.group('content')}")

# 3. Quoted fields in CSV
csv_field = r'(?P<quote>["\'])(?P<value>(?:(?!(?P=quote)).)*|(?:(?P=quote){2})*)(?P=quote)'
csv_line = '"hello","world","it""s a test"'
for m in re.finditer(csv_field, csv_line):
    print(f"  Value: {m.group('value')}")

# 4. Detecting repeated characters (password checks, etc.)
repeated_char = r'(.)\1{2,}'  # Same character repeated 3+ times
passwords = ["abc", "aabbc", "aaabbb", "password111"]
for pwd in passwords:
    m = re.search(repeated_char, pwd)
    if m:
        print(f"  FAIL: {pwd} ('{m.group(1)}' repeated {len(m.group())} times)")
```

### 4.5 Backreferences in JavaScript

```javascript
// Backreferences in JavaScript

// 1. Backreference within a pattern
const html = '<div>hello</div> <span>world</span>';
const tagPattern = /<(\w+)>.*?<\/\1>/g;
let m;
while ((m = tagPattern.exec(html)) !== null) {
    console.log(`  Match: ${m[0]}, Tag: ${m[1]}`);
}

// 2. Named backreference (ES2018)
const quotePattern = /(?<q>["']).*?\k<q>/g;
const text = `He said "hello" and 'world'`;
for (const match of text.matchAll(quotePattern)) {
    console.log(`  Match: ${match[0]}`);
}

// 3. Backreference in replacement
const date = "2026-02-11";
console.log(date.replace(
    /(\d{4})-(\d{2})-(\d{2})/,
    '$3/$2/$1'
));  // => '11/02/2026'

// Named group replacement
console.log(date.replace(
    /(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})/,
    '$<d>/$<m>/$<y>'
));  // => '11/02/2026'
```

---

## 5. Lookahead and Lookbehind (Lookaround)

Lookahead and lookbehind are called zero-width assertions -- they check conditions without consuming characters.

### 5.1 Lookaround Syntax Overview

```
+--------------------+--------------+------------------------------+
| Type               | Syntax       | Meaning                      |
+--------------------+--------------+------------------------------+
| Positive lookahead | (?=...)      | Matches position followed by ...|
| Negative lookahead | (?!...)      | Matches position NOT followed by ...|
| Positive lookbehind| (?<=...)     | Matches position preceded by ...|
| Negative lookbehind| (?<!...)     | Matches position NOT preceded by ...|
+--------------------+--------------+------------------------------+

Note: Go (RE2) and Rust (regex) do NOT support lookahead/lookbehind.
      -> fancy-regex (Rust) or regexp2 (Go) can be used as alternatives.
```

### 5.2 Positive Lookahead `(?=...)`

```python
import re

# Match positions "followed by a specific pattern"

# 1. Detect currency symbols before amounts (numbers are not consumed)
text = "$100 EUR200 JPY300"
pattern = r'$\u20ac\u00a5'
for m in re.finditer(pattern, text):
    print(f"  Currency symbol: {m.group()} at {m.start()}")

# 2. Password strength check: simultaneously checking multiple conditions
# Lookahead lets you check multiple conditions without consuming the pattern
password_pattern = re.compile(r'''
    ^
    (?=.*[A-Z])        # Contains uppercase
    (?=.*[a-z])        # Contains lowercase
    (?=.*\d)           # Contains a digit
    (?=.*[!@#$%^&*])   # Contains a symbol
    .{8,}              # 8 or more characters
    $
''', re.VERBOSE)

passwords = ["MyP@ss1", "MyP@ssw0rd", "password", "PASSWORD1!", "Ab1!abcd"]
for pwd in passwords:
    result = "OK" if password_pattern.match(pwd) else "FAIL"
    print(f"  {result}: {pwd}")

# 3. Inserting commas every 3 digits
def add_commas(number_str):
    """Insert commas every 3 digits using lookahead"""
    return re.sub(r'(?<=\d)(?=(\d{3})+(?!\d))', ',', number_str)

print(add_commas("1234567890"))   # => '1,234,567,890'
print(add_commas("12345"))        # => '12,345'
print(add_commas("123"))          # => '123'
```

### 5.3 Negative Lookahead `(?!...)`

```python
import re

# Match positions "NOT followed by a specific pattern"

# 1. Filenames with extensions other than .exe
filenames = ["report.pdf", "virus.exe", "photo.jpg", "setup.exe", "data.csv"]
pattern = r'\w+\.(?!exe\b)\w+'
for f in filenames:
    m = re.fullmatch(pattern, f)
    if m:
        print(f"  Safe: {f}")
# => Safe: report.pdf
# => Safe: photo.jpg
# => Safe: data.csv

# 2. Identifiers that are not reserved words
reserved = "if|else|for|while|return|class|def"
identifier_pattern = re.compile(rf'\b(?!(?:{reserved})\b)[a-zA-Z_]\w*\b')
code = "if x > 0: return calculate(x) else: count = 0"
identifiers = identifier_pattern.findall(code)
print(f"  Identifiers: {identifiers}")
# => Identifiers: ['x', 'calculate', 'x', 'count']

# 3. URL extraction excluding specific domains
urls = [
    "https://example.com/page",
    "https://spam.example.net/malware",
    "https://trusted.org/resource",
    "https://ads.tracker.com/pixel",
]
blocked_domains = r'spam\.example\.net|ads\.tracker\.com'
safe_url_pattern = re.compile(rf'https?://(?!{blocked_domains})[^\s]+')
for url in urls:
    m = safe_url_pattern.match(url)
    if m:
        print(f"  Allowed: {url}")
```

### 5.4 Positive Lookbehind `(?<=...)`

```python
import re

# Match positions "preceded by a specific pattern"

# 1. Extract amounts after currency symbols
text = "$100 EUR200 JPY300 free"
dollar_amounts = re.findall(r'(?<=\$)\d+', text)
print(f"  Dollar amounts: {dollar_amounts}")  # => ['100']

# 2. Extract @mentions
tweet = "Hello @alice and @bob, check out @charlie's work"
mentions = re.findall(r'(?<=@)\w+', tweet)
print(f"  Mentions: {mentions}")  # => ['alice', 'bob', 'charlie']

# 3. Extract JSON values (value after a key name)
json_text = '"name": "Alice", "age": 30, "city": "Tokyo"'
name_value = re.search(r'(?<="name":\s*")[^"]+', json_text)
if name_value:
    print(f"  name value: {name_value.group()}")  # => Alice
```

### 5.5 Negative Lookbehind `(?<!...)`

```python
import re

# Match positions "NOT preceded by a specific pattern"

# 1. Detect unescaped quotes
text = r'He said \"hello\" and "world"'
# Exclude \" and match only "
unescaped_quotes = re.findall(r'(?<!\\)"', text)
print(f"  Unescaped quote count: {len(unescaped_quotes)}")

# 2. URL paths without protocol prefix (i.e., not preceded by http://)
paths = ["/api/users", "http://example.com/api", "/api/items", "https://x.com"]
path_only = re.compile(r'(?<!https?)(?<!:)/\w[\w/]*')

# 3. Detect extra spaces that are not leading indentation
code = "def foo():\n    return bar  + baz"
# 2+ consecutive spaces (excluding line beginnings)
extra_spaces = re.findall(r'(?<=\S)\s{2,}(?=\S)', code)
print(f"  Extra space occurrences: {len(extra_spaces)}")
```

### 5.6 Combining Lookahead and Lookbehind

```python
import re

# Combine lookahead and lookbehind to extract only enclosed content

# 1. Extract only the content inside HTML tags (excluding the tags themselves)
html = "<b>bold</b> and <i>italic</i>"
content = re.findall(r'(?<=<\w+>).*?(?=</\w+>)', html)
print(f"  Tag content: {content}")  # => ['bold', 'italic']

# 2. Extract only content inside parentheses
text = "Function foo(x, y) calls bar(z)"
args = re.findall(r'(?<=\()[^)]+(?=\))', text)
print(f"  Arguments: {args}")  # => ['x, y', 'z']

# 3. Insert spaces at word boundaries in camelCase
camel = "getUserNameFromDatabase"
result = re.sub(r'(?<=[a-z])(?=[A-Z])', ' ', camel)
print(f"  Converted: {result}")  # => 'get User Name From Database'

# Convert to snake_case
snake = re.sub(r'(?<=[a-z])(?=[A-Z])', '_', camel).lower()
print(f"  snake_case: {snake}")  # => 'get_user_name_from_database'
```

### 5.7 Lookaround Language Support

```
+--------------------+--------+------------+-----+------+------+
| Feature            | Python | JavaScript | Go  | Rust | Java |
+--------------------+--------+------------+-----+------+------+
| Positive lookahead (?=)  | OK | OK     | N/A | N/A  | OK   |
| Negative lookahead (?!)  | OK | OK     | N/A | N/A  | OK   |
| Positive lookbehind(fixed)| OK | OK    | N/A | N/A  | OK   |
| Positive lookbehind(var) | N/A*| OK (V8)| N/A | N/A  | N/A  |
| Negative lookbehind(fixed)| OK | OK    | N/A | N/A  | OK   |
| Negative lookbehind(var) | N/A*| OK (V8)| N/A | N/A  | N/A  |
+--------------------+--------+------------+-----+------+------+
| Alt. crate/package | regex  | --         |regexp2|fancy-| --  |
|                    | module |            |      |regex |      |
+--------------------+--------+------------+-----+------+------+

* Python's third-party regex module supports variable-length lookbehind
```

### 5.8 Lookaround in JavaScript (ES2018+)

```javascript
// JavaScript (ES2018) also supports variable-length lookbehind

// Positive lookbehind (variable-length)
const text1 = "USD100 EUR200 JPY3000";
const amounts = text1.match(/(?<=USD|EUR|JPY)\d+/g);
console.log(amounts);  // => ['100', '200', '3000']
// Note: USD (3 chars) and JPY (3 chars) are the same length,
// but JavaScript allows variable-length lookbehind

// Negative lookbehind + positive lookahead combined
const code = "let x = 10; const y = 20; var z = 30;";
// Get only variable names declared with const/let (exclude var)
const modernVars = code.match(/(?<=(?:const|let)\s+)\w+/g);
console.log(modernVars);  // => ['x', 'y']
```

---

## 6. Atomic Groups `(?>...)`

### 6.1 What Are Atomic Groups?

Atomic groups prohibit backtracking once a portion has matched. This prevents catastrophic backtracking.

```
Normal group:
  Pattern: (a+)b
  Input:   aaac

  Attempt 1: capture "aaa" -> b not found
  Backtrack: capture "aa" -> b not found
  Backtrack: capture "a" -> b not found
  -> Failure (3 backtracks)

Atomic group:
  Pattern: (?>a+)b
  Input:   aaac

  Attempt 1: capture "aaa" -> b not found
  -> Immediate failure (no backtracking)
  -> Completed in 1 attempt
```

### 6.2 Support Status

```
+----------+------------------------------------------------------+
| Language | Atomic Group Support                                  |
+----------+------------------------------------------------------+
| Perl     | (?>...) supported                                    |
| Java 20+ | (?>...) supported (added in Java 20)                 |
| Java <20 | Not supported -> use possessive quantifiers (*+, ++, ?+) |
| .NET     | (?>...) supported                                    |
| Python   | re: not supported / regex module: supported           |
| JavaScript| Not supported                                       |
| Go       | Not supported (not needed due to RE2 base)            |
| Rust     | Not supported (not needed due to DFA base)            |
+----------+------------------------------------------------------+
```

### 6.3 Relationship with Possessive Quantifiers

```
Atomic groups and possessive quantifiers are equivalent:

  (?>a+)    ==  a++     (1 or more, no backtracking)
  (?>a*)    ==  a*+     (0 or more, no backtracking)
  (?>a?)    ==  a?+     (0 or 1, no backtracking)
  (?>a{2,5}) == a{2,5}+ (2-5 times, no backtracking)

Languages supporting possessive quantifiers:
  * Java
  * Perl 5.10+
  x Python (re)
  x JavaScript
  x Go
  x Rust
```

### 6.4 Catastrophic Backtracking: Examples and Countermeasures

```python
import re
import time

# Dangerous pattern: (a+)+ causes catastrophic backtracking
dangerous_pattern = re.compile(r'(a+)+b')

# Short input: fast
text_short = "aaaaab"
start = time.time()
dangerous_pattern.search(text_short)
print(f"  Short input: {time.time() - start:.4f}s")

# Long non-matching input: exponential time
# WARNING: the line below is extremely slow to execute (n=25 takes several seconds)
# text_long = "a" * 25 + "c"
# dangerous_pattern.search(text_long)  # Dangerous! Takes seconds to minutes

# Safe alternative pattern
safe_pattern = re.compile(r'a+b')  # Remove nested groups
# Or use non-capture + possessive quantifiers (in languages that support them)
```

```java
// Possessive quantifier countermeasure in Java
import java.util.regex.*;

public class AtomicExample {
    public static void main(String[] args) {
        // Dangerous: catastrophic backtracking
        // Pattern dangerous = Pattern.compile("(a+)+b");

        // Safe: possessive quantifier
        Pattern safe = Pattern.compile("a++b");

        String input = "a".repeat(30) + "c";
        long start = System.nanoTime();
        safe.matcher(input).find();
        long elapsed = System.nanoTime() - start;
        System.out.printf("  Elapsed: %.3f ms%n", elapsed / 1e6);
        // => Completes instantly
    }
}
```

---

## 7. Conditional Branching Pattern `(?(id)yes|no)`

### 7.1 Basic Syntax

```
(?(id)yes-pattern|no-pattern)

id:           Group number or name to reference
yes-pattern:  Pattern to use if the group matched
no-pattern:   Pattern to use if the group did not match (optional)
```

### 7.2 Practical Examples

```python
import re

# 1. If there is an opening parenthesis, require a closing parenthesis
pattern = r'(\()?hello(?(1)\))'
# (?(1)\)) = if group 1 matched, require \)

print(re.search(pattern, "hello").group())    # => 'hello'
print(re.search(pattern, "(hello)").group())  # => '(hello)'
print(re.search(pattern, "(hello").group())   # => 'hello' (matches the unparenthesized version)

# 2. Quote matching check
# If there is an opening quote, require the same closing quote
quote_pattern = r'(?P<q>["\'])?(?P<content>\w+)(?(q)(?P=q))'
test_strings = ['"hello"', "'world'", 'plain', '"mismatch\'']
for s in test_strings:
    m = re.search(quote_pattern, s)
    if m:
        print(f"  {s} -> content: {m.group('content')}")

# 3. Format changes based on optional prefix
# If +81 is present, international format; otherwise, domestic format
phone_pattern = r'(\+81)?-?(?(1)\d{1,4}-\d{1,4}-\d{4}|0\d{1,4}-\d{1,4}-\d{4})'
phones = ["+81-90-1234-5678", "090-1234-5678", "+81-3-1234-5678", "03-1234-5678"]
for p in phones:
    m = re.match(phone_pattern, p)
    if m:
        print(f"  Match: {m.group()}")
```

### 7.3 Conditional Branching with Named Groups

```python
import re

# Conditional branching using named groups
# Email display name: "Name <email>" or standalone "email"
pattern = r'(?:(?P<display_name>[^<]+)\s+)?<(?P<email>[^>]+)>(?(display_name)|\s*(?P<email_only>[^\s]+))?'

# More practical example: tag format or plain format
# <tag attr="val">content</tag> or plain text
tag_or_plain = r'(?P<open><(?P<tagname>\w+)[^>]*>)?(?(open)(?P<content>.*?)</(?P=tagname)>|(?P<plain>.+))'
tests = ["<b>bold text</b>", "plain text", "<a href='url'>link</a>"]
for t in tests:
    m = re.match(tag_or_plain, t)
    if m:
        if m.group('open'):
            print(f"  Tag: {m.group('tagname')}, Content: {m.group('content')}")
        else:
            print(f"  Plain: {m.group('plain')}")
```

### 7.4 Conditional Branching Support Status

```
+----------+--------------------------------------+
| Language | (?(id)yes|no) Support                |
+----------+--------------------------------------+
| Python   | OK (standard support in re module)   |
| Perl     | OK                                   |
| .NET     | OK                                   |
| Java     | Not supported                        |
| JavaScript| Not supported                       |
| Go       | Not supported                        |
| Rust     | Not supported                        |
+----------+--------------------------------------+
```

---

## 8. ASCII Diagrams

### 8.1 Nested Group Structure

```
Pattern: ((\d{4})-(\d{2})-(\d{2}))T((\d{2}):(\d{2}):(\d{2}))

Input:   2026-02-11T10:30:45

Group structure:
+--- Group 1: 2026-02-11 ------------------------------------------+
| +- Group 2: 2026 --+   +- Group 3: 02 --+  +- Group 4: 11 --+   |
| |    \d{4}          | - |    \d{2}        |- |    \d{2}        |  |
| |    2026           |   |    02           |  |    11           |  |
| +-------------------+   +----------------+  +----------------+   |
+-------------------------------------------------------------------+
                           T
+--- Group 5: 10:30:45 --------------------------------------------+
| +- Group 6: 10 --+   +- Group 7: 30 --+  +- Group 8: 45 --+    |
| |    \d{2}        | : |    \d{2}        |: |    \d{2}        |   |
| |    10           |   |    30           |  |    45           |   |
| +-----------------+   +----------------+  +----------------+    |
+-------------------------------------------------------------------+
```

### 8.2 How Backreferences Work

```
Pattern: <(\w+)>.*?</\1>
Input:   <div>hello</div>

Step 1: < matches
Step 2: (\w+) captures "div" -> Group 1 = "div"
Step 3: > matches
Step 4: .*? matches "hello" (lazy)
Step 5: </ matches
Step 6: \1 -> compare with group 1 ("div") -> "div" matches
Step 7: > matches

Result: <div>hello</div>

If the input were <div>hello</span>:
  Step 6: \1 ("div") != "span" -> failure -> backtrack
```

### 8.3 Internal Behavior: Capture vs Non-Capture

```
Capture group (pattern):
+------------------------------------------+
|  Pattern: (a)(b)(c)                      |
|                                          |
|  Engine internal state:                  |
|  +----------------------+               |
|  | Group array:          |               |
|  |  [0] = "abc" (full)  |  <- allocated  |
|  |  [1] = "a"           |  <- allocated  |
|  |  [2] = "b"           |  <- allocated  |
|  |  [3] = "c"           |  <- allocated  |
|  +----------------------+               |
+------------------------------------------+

Non-capture group (?:pattern):
+------------------------------------------+
|  Pattern: (?:a)(b)(?:c)                  |
|                                          |
|  Engine internal state:                  |
|  +----------------------+               |
|  | Group array:          |               |
|  |  [0] = "abc" (full)  |  <- allocated  |
|  |  [1] = "b"           |  <- allocated  |
|  +----------------------+               |
|  -> Less memory usage                    |
+------------------------------------------+
```

### 8.4 Lookahead Operation Flow

```
Pattern: \d+(?=円)
Input:   "100円 200ドル 300円"

+------------------------------------------------------+
| Position 0: "1"                                      |
|   \d+ -> matches "100"                               |
|   (?=円) -> next char is "円" -> lookahead success!  |
|   -> "100" added to results (* "円" is not consumed) |
|                                                      |
| Position 5: "2"                                      |
|   \d+ -> matches "200"                               |
|   (?=円) -> next char is "ド" -> lookahead fails     |
|   -> backtrack -> "20" -> fail -> "2" -> fail        |
|                                                      |
| Position 10: "3"                                     |
|   \d+ -> matches "300"                               |
|   (?=円) -> next char is "円" -> lookahead success!  |
|   -> "300" added to results                          |
+------------------------------------------------------+

Result: ["100", "300"]
```

### 8.5 Lookbehind Operation Flow

```
Pattern: (?<=\$)\d+
Input:   "$100 €200 $300"

+------------------------------------------------------+
| Position 0: "$"                                      |
|   -> not a digit -> skip                             |
|                                                      |
| Position 1: "1"                                      |
|   (?<=\$) -> preceding char is "$" -> success!       |
|   \d+ -> matches "100"                               |
|   -> "100" added to results                          |
|                                                      |
| Position 5: "€"                                      |
|   -> not a digit -> skip                             |
|                                                      |
| Position 7: "2"                                      |
|   (?<=\$) -> preceding char is "€" -> failure        |
|                                                      |
| Position 12: "3"                                     |
|   (?<=\$) -> preceding char is "$" -> success!       |
|   \d+ -> matches "300"                               |
|   -> "300" added to results                          |
+------------------------------------------------------+

Result: ["100", "300"]
```

### 8.6 Conditional Branching Operation Flow

```
Pattern: (\()?hello(?(1)\))
Input 1: "(hello)"
Input 2: "hello"

Processing input 1:
+------------------------------------------+
| (\()? -> matches "(" -> Group 1 = "("   |
| hello -> matches "hello"                 |
| (?(1)\)) -> Group 1 exists -> \) needed  |
| \) -> matches ")"                        |
| -> Success: "(hello)"                    |
+------------------------------------------+

Processing input 2:
+------------------------------------------+
| (\()? -> no match -> Group 1 = none      |
| hello -> matches "hello"                 |
| (?(1)\)) -> Group 1 absent -> nothing needed |
| -> Success: "hello"                      |
+------------------------------------------+
```

---

## 9. Comparison Tables

### 9.1 Group Type Comparison

| Type | Syntax | Captures | Number | Name | Purpose |
|------|--------|----------|--------|------|---------|
| Capture | `(...)` | Yes | Yes | No | Extraction/backreference |
| Non-capture | `(?:...)` | No | No | No | Grouping only |
| Named | `(?P<n>...)` | Yes | Yes | Yes | Readable extraction |
| Atomic | `(?>...)` | No | No | No | Backtrack suppression |
| Conditional | `(?(id)yes\|no)` | -- | -- | -- | Conditional branching |
| Positive lookahead | `(?=...)` | No | No | No | Zero-width assertion |
| Negative lookahead | `(?!...)` | No | No | No | Zero-width assertion |
| Positive lookbehind | `(?<=...)` | No | No | No | Zero-width assertion |
| Negative lookbehind | `(?<!...)` | No | No | No | Zero-width assertion |

### 9.2 Backreference Syntax (by Language)

| Language | In-pattern reference | Replacement reference | Named reference |
|----------|---------------------|----------------------|-----------------|
| Python | `\1`, `(?P=name)` | `\1`, `\g<1>`, `\g<name>` | `(?P<name>...)` |
| JavaScript | `\1`, `\k<name>` | `$1`, `$<name>` | `(?<name>...)` |
| Java | `\1`, `\k<name>` | `$1`, `${name}` | `(?<name>...)` |
| Perl | `\1`, `\k<name>` | `$1`, `$+{name}` | `(?<name>...)` |
| Go (RE2) | Not supported | `${1}`, `${name}` | `(?P<name>...)` |
| Rust | Not supported | `$1`, `$name` | `(?P<name>...)` |

### 9.3 Lookaround Constraint Comparison

| Constraint | Python re | JavaScript | Java | Perl | .NET |
|------------|----------|------------|------|------|------|
| Lookbehind length | Fixed-length only | Variable OK | Fixed-length only | Variable OK | Variable OK |
| Nestable | OK | OK | OK | OK | OK |
| Capture inside lookahead | OK | OK | OK | OK | OK |
| Capture inside lookbehind | OK | OK | OK | OK | OK |
| Quantifiers inside lookahead | OK | OK | OK | OK | OK |

### 9.4 Comprehensive Group Feature Comparison

| Feature | Python re | Python regex | JavaScript | Java | Go | Rust |
|---------|----------|-------------|------------|------|----|------|
| Capture `()` | OK | OK | OK | OK | OK | OK |
| Non-capture `(?:)` | OK | OK | OK | OK | OK | OK |
| Named | `(?P<>)` | `(?P<>)` | `(?<>)` | `(?<>)` | `(?P<>)` | `(?P<>)` |
| Backreference | OK | OK | OK | OK | N/A | N/A |
| Lookahead | OK | OK | OK | OK | N/A | N/A |
| Lookbehind | Fixed | Variable | Variable | Fixed | N/A | N/A |
| Atomic | N/A | OK | N/A | Java 20+ | N/A | N/A |
| Conditional | OK | OK | N/A | N/A | N/A | N/A |
| Branch reset | N/A | `(?|)` | N/A | N/A | N/A | N/A |

---

## 10. Anti-Patterns

### 10.1 Anti-Pattern: Excessive Capture Groups

```python
import re

# BAD: Making everything a capture group
pattern_bad = r'(https?)://(www\.)?(\w+)\.(\w+)/(\w+)/(\w+)'
# 6 groups -> group numbers become difficult to manage

# GOOD: Capture only needed parts + named groups
pattern_good = r'(?:https?)://(?:www\.)?(?P<domain>\w+\.\w+)/(?P<path>\w+/\w+)'

text = "https://www.example.com/api/users"
match = re.search(pattern_good, text)
if match:
    print(match.group('domain'))  # => 'example.com'
    print(match.group('path'))    # => 'api/users'
```

### 10.2 Anti-Pattern: Hard-Coding Backreference Group Numbers

```python
import re

# BAD: Hard-coded group numbers -- causes bugs when patterns change
pattern = r'(\w+)\s+(\d+)\s+(\w+)'
text = "item 42 completed"
match = re.search(pattern, text)
name = match.group(1)    # Shifts when pattern changes
count = match.group(2)   # Shifts when pattern changes

# GOOD: Named groups -- resilient to pattern changes
pattern = r'(?P<name>\w+)\s+(?P<count>\d+)\s+(?P<status>\w+)'
match = re.search(pattern, text)
name = match.group('name')      # Referenced by name -> doesn't shift
count = match.group('count')    # Referenced by name -> doesn't shift
```

### 10.3 Anti-Pattern: Overuse of Lookahead

```python
import re

# BAD: Validating password with lookahead only (hard to understand)
password_bad = r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})(?!.*(.)\1{2,})(?!.*(?:123|abc|password)).*$'
# -> Crammed into one line and unmaintainable

# GOOD: Structured with VERBOSE flag + comments
password_good = re.compile(r'''
    ^
    (?=.*[A-Z])            # Condition 1: contains uppercase
    (?=.*[a-z])            # Condition 2: contains lowercase
    (?=.*\d)               # Condition 3: contains digit
    (?=.*[!@#$%^&*])       # Condition 4: contains symbol
    (?!.*(.)\1{2,})        # Condition 5: no 3 consecutive identical chars
    (?!.*(?:123|abc|pwd))  # Condition 6: no weak patterns
    .{8,}                  # Body: 8 or more characters
    $
''', re.VERBOSE)

# Even better: individual check functions
def validate_password(pwd: str) -> list[str]:
    """Password validation: checks each condition individually, returns failure reasons"""
    errors = []
    if len(pwd) < 8:
        errors.append("Must be 8 or more characters")
    if not re.search(r'[A-Z]', pwd):
        errors.append("Must contain an uppercase letter")
    if not re.search(r'[a-z]', pwd):
        errors.append("Must contain a lowercase letter")
    if not re.search(r'\d', pwd):
        errors.append("Must contain a digit")
    if not re.search(r'[!@#$%^&*]', pwd):
        errors.append("Must contain a symbol")
    if re.search(r'(.)\1{2,}', pwd):
        errors.append("Must not have 3 or more consecutive identical characters")
    return errors
```

### 10.4 Anti-Pattern: Attempting Lookaround in Go/Rust

```go
// BAD: Lookahead is not available in Go
// re := regexp.MustCompile(`\d+(?=円)`)  // Panic!

// GOOD: Alternative approach - capture with groups and post-process
package main

import (
    "fmt"
    "regexp"
)

func main() {
    re := regexp.MustCompile(`(\d+)円`)
    text := "100円 200ドル 300円"

    matches := re.FindAllStringSubmatch(text, -1)
    for _, m := range matches {
        fmt.Printf("  Amount: %s\n", m[1])
    }
    // => Amount: 100
    // => Amount: 300
}
```

```rust
// BAD: Lookahead is not available in the Rust regex crate
// let re = Regex::new(r"\d+(?=円)").unwrap();  // Error!

// GOOD 1: Use capture groups as an alternative
use regex::Regex;

fn main() {
    let re = Regex::new(r"(\d+)円").unwrap();
    let text = "100円 200ドル 300円";

    for caps in re.captures_iter(text) {
        println!("  Amount: {}", &caps[1]);
    }

    // GOOD 2: Use fancy-regex (supports lookahead/lookbehind)
    // use fancy_regex::Regex;
    // let re = Regex::new(r"\d+(?=円)").unwrap();
}
```

---

## 11. Best Practices

### 11.1 Group Design Principles

```
+----------------------------------------------------------------+
| Principle 1: Minimal Capture Principle                         |
|   Capture only the needed parts; use (?:...) for everything else|
|                                                                |
| Principle 2: Prefer Named Groups                               |
|   Use named groups when there are 3 or more groups             |
|                                                                |
| Principle 3: Use VERBOSE Mode                                  |
|   Structure complex patterns with re.VERBOSE + comments        |
|                                                                |
| Principle 4: Test-Driven Pattern Design                        |
|   List cases that should/shouldn't match before writing the    |
|   pattern                                                      |
|                                                                |
| Principle 5: When to Use Lookaround                            |
|   - Simultaneous multi-condition checks (passwords, etc.)      |
|   - Pinpointing positions without consuming (comma insertion)  |
|   - Context-dependent matching (amounts after currency symbols)|
+----------------------------------------------------------------+
```

### 11.2 Designing Patterns for Readability

```python
import re

# BAD: A single unreadable line
bad = r'((?:\+81|0)[\d-]{9,13})|(\d{3}-?\d{4})|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})'

# GOOD: VERBOSE + named groups + comments
good = re.compile(r'''
    (?P<phone>                              # Phone number
        (?:\+81|0)                          #   Country code or leading 0
        [\d-]{9,13}                         #   Digits and hyphens
    )
    |
    (?P<postal>                             # Postal code
        \d{3}-?\d{4}                        #   XXX-XXXX format
    )
    |
    (?P<email>                              # Email address
        [a-zA-Z0-9._%+-]+                   #   Local part
        @                                   #   @
        [a-zA-Z0-9.-]+                      #   Domain
        \.[a-zA-Z]{2,}                      #   TLD
    )
''', re.VERBOSE)

text = "Contact: 090-1234-5678, Postal 100-0001, info@example.com"
for m in good.finditer(text):
    for name in ['phone', 'postal', 'email']:
        if m.group(name):
            print(f"  {name}: {m.group(name)}")
```

### 11.3 Designing Patterns for Performance

```python
import re

# 1. Limit lookahead to where it is truly needed
# BAD: Pointless lookahead
bad1 = r'(?=\d)\d+'  # Lookahead followed by the same pattern -> pointless

# GOOD: Same result without lookahead
good1 = r'\d+'

# 2. Suppress backtracking with non-capture groups
# BAD: Nested capture groups + quantifiers
bad2 = r'((\w+)\s*)+'  # Risk of catastrophic backtracking

# GOOD: Flat structure
good2 = r'\w+(?:\s+\w+)*'

# 3. Optimize alternation (|) order
# Place shorter patterns first when short strings are more common
# BAD: Starting with long patterns
bad3 = r'(?:January|February|March|April|May|June|July|August|September|October|November|December)'

# GOOD: Group by first character (some engines auto-optimize this)
good3 = r'(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)'
```

---

## 12. FAQ

### Q1: How do I get both the group and the full match with `findall`?

**A**: `findall` returns group contents when groups are present. If you also need the full match, use `finditer` or add an enclosing group:

```python
import re

text = "cats and dogs"
# findall + group -> returns group contents only
print(re.findall(r'(cat|dog)s', text))  # => ['cat', 'dog']

# Method 1: Use finditer
for m in re.finditer(r'(cat|dog)s', text):
    print(f"Full: {m.group(0)}, Animal: {m.group(1)}")

# Method 2: Use a non-capture group
print(re.findall(r'(?:cat|dog)s', text))  # => ['cats', 'dogs']
```

### Q2: What is a conditional group `(?(id)yes|no)`?

**A**: A pattern that branches based on whether a group matched:

```python
import re

# If there is an opening parenthesis, require a closing parenthesis
pattern = r'(\()?hello(?(1)\))'
# (?(1)\)) = if group 1 matched, require \)

print(re.search(pattern, "hello").group())    # => 'hello'
print(re.search(pattern, "(hello)").group())  # => '(hello)'
print(re.search(pattern, "(hello").group())   # => 'hello' (matches the unparenthesized version)
```

### Q3: Can the same name be used for multiple named groups?

**A**: It depends on the language. Python's `re` module does **not** allow it. .NET allows same-named groups on both sides of a pipe. Python's third-party `regex` module enables similar behavior with the `(?|...)` branch reset group:

```python
# .NET example (conceptual):
# (?<digit>\d+)|(?<digit>[a-f]+)  -- both are "digit" group

# Python regex module branch reset:
# (?|(\d+)|([a-f]+))  -- both are group 1
```

### Q4: Can capture groups be used inside a lookahead?

**A**: Yes. Capture groups inside a lookahead are included in the match result when the lookahead succeeds:

```python
import re

# Capture group inside a lookahead
pattern = r'(?=(\d+)円)\d+'
text = "100円 200ドル 300円"

for m in re.finditer(pattern, text):
    print(f"  Number: {m.group()}, Lookahead group: {m.group(1)}")
# => Number: 100, Lookahead group: 100
# => Number: 300, Lookahead group: 300
```

### Q5: What are alternatives when lookaround is not available in Go or Rust?

**A**: There are three approaches:

1. **Capture group alternative**: Capture the surrounding context and exclude it in post-processing
2. **Two-pass matching**: Match with a broad pattern first, then filter the results further
3. **Third-party libraries**: `regexp2` for Go, `fancy-regex` for Rust

```rust
// Rust: Example using fancy-regex for lookahead
// Cargo.toml: fancy-regex = "0.13"
use fancy_regex::Regex;

fn main() {
    // Positive lookahead: numbers followed by "円"
    let re = Regex::new(r"\d+(?=円)").unwrap();
    let text = "100円 200ドル 300円";

    for m in re.find_iter(text) {
        if let Ok(m) = m {
            println!("  Amount: {}", m.as_str());
        }
    }
}
```

### Q6: Should I use atomic groups or possessive quantifiers?

**A**: They are functionally equivalent, so choose based on language support. In Java, possessive quantifiers (`a++`) are more concise. In Perl/.NET, both are available. They are worth considering for performance-critical cases in languages using NFA engines (Python, JavaScript, Java). In Go/Rust (DFA-based), catastrophic backtracking cannot occur by design, so they are unnecessary.

---


## FAQ

### Q1: What is the most important point when learning this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory but by actually writing code and verifying how it works.

### Q2: What are common mistakes beginners make?

Skipping the basics and jumping to advanced topics. We recommend thoroughly understanding the fundamental concepts explained in this guide before moving on to the next step.

### Q3: How is this applied in real-world work?

Knowledge of this topic is frequently used in day-to-day development work. It is particularly important during code reviews and architecture design.

---

## Summary

| Item | Description |
|------|-------------|
| `(...)` | Capture group -- saves results with a number |
| `(?:...)` | Non-capture group -- grouping only |
| `(?P<name>...)` | Named group -- accessible by name |
| `\1`, `\2` | Backreference -- reuses a group within the pattern |
| `(?P=name)` | Named backreference (Python) |
| `\g<1>`, `\g<name>` | Group reference in replacement (Python) |
| `$1`, `$<name>` | Group reference in replacement (JavaScript) |
| `(?=...)`, `(?!...)` | Lookahead -- zero-width check ahead |
| `(?<=...)`, `(?<!...)` | Lookbehind -- zero-width check behind |
| `(?>...)` | Atomic group -- suppresses backtracking |
| `(?(id)yes\|no)` | Conditional branch -- branches based on group presence |
| Group numbering | Assigned from 1 in order of opening parenthesis |
| Design guideline | Capture only needed parts; prefer named groups |

---

## 13. Exercises

### Exercise 1: HTML Tag Attribute Extraction

Write a regular expression using named groups to extract all tag names and attributes from the following HTML.

```html
<div class="container" id="main">
<img src="photo.jpg" alt="Photo">
<a href="https://example.com" target="_blank">Link</a>
```

Expected output: a list of tag names, attribute names, and attribute values

### Exercise 2: Detecting Duplicate Lines

Write a regular expression that detects consecutive identical lines in a text file (ignoring whitespace differences). Use backreferences.

```
Input:
Hello World
Hello World
Foo Bar
  Foo Bar
Baz
```

### Exercise 3: Password Validation with Lookahead

Build a password pattern using lookahead that satisfies all of the following conditions:
- 10 to 20 characters
- Contains at least one uppercase letter, one lowercase letter, one digit, and one symbol
- No 4 or more consecutive identical characters
- Does not contain "password", "12345", or "qwerty" (case-insensitive)

### Exercise 4: Conditional Branching Pattern

Build a phone number validation pattern using conditional branching:
- If it starts with `+81`, international format (`+81-XX-XXXX-XXXX`)
- If it starts with `0`, domestic format (`0XX-XXXX-XXXX`)
- Otherwise, invalid

### Exercise 5: CamelCase to snake_case Conversion

Write a regular expression using lookahead/lookbehind to convert camelCase identifiers to snake_case.

```
Input: getUserNameFromDatabase
Output: get_user_name_from_database

Input: XMLParser
Output: xml_parser

Input: getHTTPResponse
Output: get_http_response
```

Hint: Pay attention to how consecutive uppercase letters are handled.

### Exercise 6: Matching the Outermost Nested Parentheses

Extract the outermost parenthesized portions from the following string (using recursive patterns or an iterative approach):

```
Input: "func(a, (b + c), d) + other(x)"
Expected: ["func(a, (b + c), d)", "other(x)"]
```

Hint: Fully handling nesting with regular expressions alone is difficult. Consider recursive patterns in `.NET` or `Perl`, or a combination of regex and program logic.

### Exercise 7: Structured Log File Analysis

Build a pattern using named groups that fully parses the following log format:

```
[2026-02-11T10:30:45.123+09:00] [ERROR] [com.example.auth.LoginService] [req-id=abc123] User login failed: invalid credentials for user "admin" from IP 192.168.1.100
```

Fields to extract: timestamp, log level, class name, request ID, message body

---

## Recommended Next Guides

- [01-lookaround.md](./01-lookaround.md) -- Lookahead and Lookbehind in Detail
- [02-unicode-regex.md](./02-unicode-regex.md) -- Unicode Regular Expressions

## References

1. **Jeffrey E.F. Friedl** "Mastering Regular Expressions" O'Reilly, 2006 -- Chapter 7: "Groups and Backreferences"
2. **Python re module - Grouping** https://docs.python.org/3/library/re.html#regular-expression-syntax -- Official Python group syntax reference
3. **TC39 Named Capture Groups Proposal** https://tc39.es/proposal-regexp-named-groups/ -- JavaScript named capture groups specification
4. **MDN Lookahead and Lookbehind** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Assertions -- JavaScript lookahead/lookbehind documentation
5. **RE2 Syntax** https://github.com/google/re2/wiki/Syntax -- Syntax specification of the RE2 engine used in Go/Rust
6. **fancy-regex** https://docs.rs/fancy-regex/ -- Rust crate for lookahead/lookbehind support
7. **regex module for Python** https://pypi.org/project/regex/ -- Extended regular expression module for Python



===== SOURCE: 02-programming/regex-and-text-processing/docs/01-advanced/01-lookaround.md =====

# Lookaround -- (?=)(?!)(?<=)(?<!)

> Lookahead and lookbehind are zero-width assertions that specify positional conditions without consuming characters. They are powerful features that enable constraints difficult to express with ordinary patterns, such as password strength validation, complex extraction conditions, and limiting replacement targets.

## What You Will Learn

1. **Syntax and behavior of all 4 lookaround types** -- The precise meaning of positive/negative lookahead/lookbehind
2. **The concept of zero-width assertions** -- How matching without consuming characters works and its applications
3. **Practical use cases** -- Password validation, number formatting, compound condition extraction
4. **Behavioral differences and constraints across languages** -- Implementation differences in Python, JavaScript, Java, Go, and Rust
5. **Performance impact and optimization** -- The cost of lookaround and how to mitigate it
6. **Nested lookaround** -- Advanced techniques for complex conditions
7. **Test-driven pattern development** -- Methods for safely developing lookaround patterns


## Prerequisites

The following knowledge will help you get the most out of this guide:

- Basic programming knowledge
- Understanding of related foundational concepts
- Understanding of the content in [Groups and Backreferences -- Capturing, Named Groups, Lookahead/Lookbehind](./00-groups-backreferences.md)

---

## 1. The 4 Types of Lookaround

### 1.1 Overview

```
+------------------------------------------------------+
|              Lookaround Overview                      |
+------------+--------------+--------------------------+
|            | Positive (=) | Negative (!)              |
+------------+--------------+--------------------------+
| Lookahead  | (?=pattern)  | (?!pattern)              |
| (forward)  | Followed by  | NOT followed by          |
+------------+--------------+--------------------------+
| Lookbehind | (?<=pattern) | (?<!pattern)             |
| (backward) | Preceded by  | NOT preceded by          |
+------------+--------------+--------------------------+
```

### 1.2 Conceptual Diagram

```
Text: "price: $100"

         p r i c e :   $ 1 0 0
                        ^
                    Current position

Lookahead (?=...):  "To the right of this position, ... exists"
Lookbehind (?<=...): "To the left of this position, ... exists"

Example: (?<=\$)\d+
  -> "A digit sequence starting from a position with $ to its left"
  -> Matches "100" ($ is not included)
```

### 1.3 Internal Mechanism of Lookaround

To accurately understand how lookaround works, let's look at how the regex engine processes it internally.

```
NFA engine lookaround processing flow:

1. Engine records current position (position = P)
2. Attempts to match the pattern inside the lookaround
   - Positive: match success -> assertion success
   - Negative: match failure -> assertion success
3. Restores current position to P (zero-width: position doesn't advance)
4. Proceeds to the next element of the main pattern

Concrete example: Pattern (?<=\$)\d+ applied to "price: $100"

Step 1: Position 0 'p' -- (?<=\$) check
  Nothing to the left -> failure -> advance position by 1

Step 2: Position 1 'r' -- (?<=\$) check
  Left side 'p' is not '$' -> failure -> advance position by 1

...

Step 8: Position 8 '1' -- (?<=\$) check
  Left side '$' is '$' -> success!
  -> Try \d+ from position 8
  -> '1','0','0' match
  -> Result: "100" (position 8-11)
```

### 1.4 Comparison of Lookaround with Other Zero-Width Assertions

```
Zero-width assertion list:

Assertion           Syntax     Meaning
--------------     ------     --------------------------
Line start         ^          Beginning of line
Line end           $          End of line
Word boundary      \b         Boundary between word and non-word chars
Non-word boundary  \B         Position that is NOT \b
String start       \A         Beginning of entire string (even in multiline)
String end         \Z, \z     End of entire string
Positive lookahead (?=...)    Position where pattern exists to the right
Negative lookahead (?!...)    Position where pattern does NOT exist to the right
Positive lookbehind(?<=...)   Position where pattern exists to the left
Negative lookbehind(?<!...)   Position where pattern does NOT exist to the left

Common trait: all check a "position" and do not consume characters
```

```python
import re

# Comparison of various zero-width assertions
text = "Hello World 123"

# ^ -- beginning of line
print(re.findall(r'^.', text))          # => ['H']

# \b -- word boundary
print(re.findall(r'\b\w', text))        # => ['H', 'W', '1']

# (?=...) -- positive lookahead
print(re.findall(r'\w(?=\s)', text))    # => ['o', 'd']

# (?<=...) -- positive lookbehind
print(re.findall(r'(?<=\s)\w', text))   # => ['W', '1']

# All are zero-width: they do not consume characters
```

---

## 2. Positive Lookahead `(?=pattern)`

### 2.1 Basic Behavior

```python
import re

# Extract "numbers followed by 円"
pattern = r'\d+(?=円)'
text = "Product A: 1000円, Product B: 2500円, Product C: 30 dollars"

print(re.findall(pattern, text))
# => ['1000', '2500']
# Note: "30" does not match (followed by "dollars", not "円")
# Note: "円" itself is not included in the match (zero-width)
```

### 2.2 Proof of Zero-Width

```python
import re

text = "100円"

# Without lookahead: includes digits + 円
m1 = re.search(r'\d+円', text)
print(m1.group())   # => '100円' (includes 円)
print(m1.end())     # => 4

# With lookahead: digits only (円 is not consumed)
m2 = re.search(r'\d+(?=円)', text)
print(m2.group())   # => '100' (doesn't include 円)
print(m2.end())     # => 3 (zero-width: position is right before 円)
```

### 2.3 Compound Conditions with Lookahead

Multiple lookaheads can be chained to create AND conditions.

```python
import re

# Build AND conditions with multiple positive lookaheads
# "Words that contain uppercase AND a digit AND are 6+ characters"
pattern = r'\b(?=\w*[A-Z])(?=\w*\d)\w{6,}\b'
text = "Hello World Pass1word abc123 Test99 MyPW short A1"

print(re.findall(pattern, text))
# => ['Pass1word', 'Test99']
# "Hello" -- no digit -> NG
# "abc123" -- no uppercase -> NG
# "MyPW" -- 4 chars < 6 -> NG
# "A1" -- 2 chars < 6 -> NG
```

### 2.4 Overlapping Matches with Lookahead

Normal `findall` returns only non-overlapping matches, but lookahead can detect overlapping patterns.

```python
import re

# Normal pattern: no overlap
text = "abcabc"
print(re.findall(r'ab', text))
# => ['ab', 'ab']

# Detect overlapping matches with lookahead
text = "aaaa"
# Normal: detect consecutive "aa" (no overlap)
print(re.findall(r'aa', text))
# => ['aa', 'aa']  -- positions 0 and 2

# Lookahead to detect all "aa" start positions (with overlap)
print(re.findall(r'(?=aa)', text))
# => ['', '', '']  -- positions 0, 1, 2 (3 locations)

# Practical example: detect overlapping substrings in text
text = "abcabcabc"
positions = [(m.start(), m.end()) for m in re.finditer(r'(?=(abc))', text)]
print(positions)
# => [(0, 0), (3, 3), (6, 6)]
# Get content via capture group inside the lookahead
print(re.findall(r'(?=(abc))', text))
# => ['abc', 'abc', 'abc']

# Practical example: overlapping motif detection in DNA sequences
dna = "ATGATGATG"
# Normal: "ATG" appears 3 times without overlap
print(re.findall(r'ATG', dna))  # => ['ATG', 'ATG', 'ATG']
# Overlapping pattern detection: positions where "ATGATG" appears
overlapping = [m.start() for m in re.finditer(r'(?=ATGATG)', dna)]
print(overlapping)  # => [0, 3]
```

### 2.5 Interaction Between Lookahead and Quantifiers

```python
import re

# Lookahead and greedy/non-greedy behavior
text = "abc123def456"

# Greedy: matches as long as possible
print(re.findall(r'\w+(?=\d)', text))
# => ['abc12', 'def45']
# Note: greedy \w+ consumes up to just before the last digit

# Non-greedy: matches as short as possible
print(re.findall(r'\w+?(?=\d)', text))
# => ['abc', '1', '2', 'def', '4', '5']
# Note: tries to match one character at a time

# Proper pattern design is needed for intended results
# "alphabetic characters followed by digits"
print(re.findall(r'[a-z]+(?=\d)', text))
# => ['abc', 'def']
```

---

## 3. Negative Lookahead `(?!pattern)`

### 3.1 Basic Behavior

```python
import re

# "Numbers NOT followed by ドル"
pattern = r'\d+(?!ドル|\d)'
text = "100円 200ドル 300ユーロ"

print(re.findall(pattern, text))
# => ['100', '300']
# "200" doesn't match (followed by "ドル")
```

### 3.2 Exclusion Patterns

```python
import re

# Exclude specific words from matches
# Extract words that don't start with "test"
pattern = r'\b(?!test)\w+'
text = "testing hello testcase world testify"

print(re.findall(pattern, text))
# => ['hello', 'world']

# JavaScript identifiers excluding reserved words
reserved = r'\b(?!if|else|for|while|return|function\b)\w+'
code = "function hello if world return value"
print(re.findall(reserved, code))
# => ['hello', 'world', 'value']
```

### 3.3 Practical Negative Lookahead Patterns

```python
import re

# Pattern 1: Match filenames excluding specific extensions
files = "main.py config.yaml app.js test.pyc utils.py data.json"
# Extract .py files excluding .pyc
pattern = r'\b\w+\.py(?!c)\b'
print(re.findall(pattern, files))
# => ['main.py', 'utils.py']

# Pattern 2: URL extraction excluding specific domains
urls = "http://example.com http://spam.evil.com http://good-site.org"
# Extract URLs that don't contain "spam"
pattern = r'https?://(?!spam)\S+'
print(re.findall(pattern, urls))
# => ['http://example.com', 'http://good-site.org']

# Pattern 3: Extract non-comment lines
lines = """
# This is a comment
data = 123
// This is also a comment
result = data + 1
"""
# Non-empty lines not starting with # or //
pattern = r'^(?!#|//)(?!\s*$).+'
print(re.findall(pattern, lines.strip(), re.MULTILINE))
# => ['data = 123', 'result = data + 1']
```

### 3.4 Prohibited Patterns in Passwords via Negative Lookahead

```python
import re

def validate_no_common_patterns(password: str) -> tuple[bool, list[str]]:
    """Validate that the password doesn't contain common weak patterns"""
    errors = []

    # Prohibit consecutive identical characters (aaa, 111, etc.)
    if re.search(r'(.)\1{2,}', password):
        errors.append("Contains 3 or more consecutive identical characters")

    # Prohibit sequential character patterns (abc, 123, etc.)
    sequential_patterns = [
        'abc', 'bcd', 'cde', 'def', 'efg', 'fgh',
        '123', '234', '345', '456', '567', '678', '789',
        'qwerty', 'asdf', 'zxcv'
    ]
    for seq in sequential_patterns:
        if seq in password.lower():
            errors.append(f"Contains sequential pattern '{seq}'")

    # Strong password: all conditions in one pattern
    # - 8+ characters
    # - No 3 consecutive identical characters
    # - Does not contain "password"
    # - Does not contain "12345"
    strong_pattern = re.compile(
        r'^(?!.*(.)\1{2})'     # No 3 consecutive identical chars
        r'(?!.*password)'       # Does not contain "password"
        r'(?!.*12345)'          # Does not contain "12345"
        r'.{8,}$',              # 8+ characters
        re.IGNORECASE
    )

    if not strong_pattern.match(password):
        errors.append("Password is too weak")

    return (len(errors) == 0, errors)

# Test
test_passwords = [
    "Str0ng!Pass",    # OK
    "password123!",   # Contains "password"
    "aaabbb1234!",   # Consecutive characters
    "P@ss12345word",  # Contains "12345"
    "Sh0rt!",         # Too short
]

for pw in test_passwords:
    valid, errs = validate_no_common_patterns(pw)
    status = "OK" if valid else "NG"
    print(f"  {pw}: {status} {errs if errs else ''}")
```

### 3.5 Common Pitfalls with Negative Lookahead

```python
import re

# Pitfall 1: Watch the position of negative lookahead
# Intent: exclude only the word "test"
text = "testing test tested"

# Wrong: \b(?!test)\w+ also matches parts of "test"
print(re.findall(r'\b(?!test)\w+', text))
# => ['esting', 'ed']  -- "esting" from "testing" matches!

# Correct: use \b to exclude the whole word
print(re.findall(r'\b(?!test\b)\w+', text))
# => ['testing', 'tested']
# Only exact "test" is excluded; "testing" and "tested" are OK

# Pitfall 2: Combining negative lookahead with quantifiers
text = "foobar foobaz foo"

# Intent: extract "foo" not followed by "bar"
# Wrong: match range becomes unexpected
print(re.findall(r'foo(?!bar)', text))
# => ['foo', 'foo']  -- "foo" from "foobaz" and standalone "foo"

# If you also want the following part
print(re.findall(r'foo(?!bar)\w*', text))
# => ['foobaz', 'foo']

# Pitfall 3: Watch for empty string matches
text = "abc"
print(re.findall(r'(?!abc)', text))
# => ['', '', '']  -- matches at positions 1, 2, 3 (position 0 matches 'abc' so excluded)
# Zero-width, so empty strings match
```

---

## 4. Positive Lookbehind `(?<=pattern)`

### 4.1 Basic Behavior

```python
import re

# Extract "numbers preceded by $"
pattern = r'(?<=\$)\d+'
text = "Price: $100, Tax: $15, Total: 115"

print(re.findall(pattern, text))
# => ['100', '15']
# "115" doesn't match (no $ before it)
```

### 4.2 Lookbehind Constraints

```
Lookbehind width constraints (by engine):

Engine          Variable-length   Constraint
----------      ---------------  ----------
Python re       Not allowed      Fixed-length only
JavaScript      Allowed (ES2018+) No restriction
Java            Not allowed      Fixed-length only
.NET            Allowed          No restriction
Perl            Not allowed      Fixed-length only
PCRE2           Allowed          No restriction
Ruby            Not allowed      Fixed-length only (Onigmo)
PHP (PCRE)      Not allowed      Fixed-length only (PCRE1 era)

Fixed-length constraints:
  (?<=abc)    OK  -- 3 characters fixed
  (?<=ab|cd)  OK  -- each alternative is the same length
  (?<=a{3})   OK  -- fixed repetition count
  (?<=a+)     NG  -- variable-length (not allowed in Python, Java, Perl)
  (?<=a*)     NG  -- variable-length

  Note: (?<=ab|cde) can be used in Python even with different-length
        alternatives, as long as each alternative is fixed-length (Python 3.6+)
```

```python
import re

# Fixed-length: OK
print(re.findall(r'(?<=\$)\d+', "$100 $200"))
# => ['100', '200']

# Variable-length: error (Python)
try:
    re.findall(r'(?<=\$+)\d+', "$100 $$200")
except re.error as e:
    print(f"Error: {e}")
# => Error: look-behind requires fixed-width pattern

# Workaround: use the regex module (third-party)
# import regex
# regex.findall(r'(?<=\$+)\d+', "$100 $$200")
# => ['100', '200']
```

### 4.3 Lookbehind Alternative Behavior in Python 3.6+

```python
import re

# In Python 3.6+, alternatives with different fixed lengths
# in each branch are allowed
text = "USD100 JPY200 EUR300"

# Each alternative is fixed-length (3 characters) -- OK
pattern = r'(?<=USD|JPY|EUR)\d+'
print(re.findall(pattern, text))
# => ['100', '200', '300']

# Alternatives with different lengths, but each is fixed -- OK in Python 3.6+
text = "$100 USD200 EURO300"
pattern = r'(?<=\$|USD|EURO)\d+'
print(re.findall(pattern, text))
# => ['100', '200', '300']

# However, quantifiers within alternatives are not allowed
try:
    re.findall(r'(?<=\$+|USD)\d+', text)
except re.error as e:
    print(f"Error: {e}")
# => Error: look-behind requires fixed-width pattern
```

### 4.4 Data Extraction with Lookbehind

```python
import re

# Extract HTML tag attribute values
html = '<div class="main" id="content" data-value="42">'

# Extract class attribute value
pattern = r'(?<=class=")\w+'
print(re.findall(pattern, html))
# => ['main']

# Extract id attribute value
pattern = r'(?<=id=")\w+'
print(re.findall(pattern, html))
# => ['content']

# Extract data-value
pattern = r'(?<=data-value=")\d+'
print(re.findall(pattern, html))
# => ['42']

# Extract request paths after IP addresses from log files
log_lines = [
    '192.168.1.1 - - [01/Jan/2024] "GET /api/users HTTP/1.1" 200',
    '10.0.0.5 - - [01/Jan/2024] "POST /api/login HTTP/1.1" 401',
    '172.16.0.1 - - [01/Jan/2024] "GET /index.html HTTP/1.1" 200',
]
for line in log_lines:
    # Extract path after "GET " or "POST "
    m = re.search(r'(?<=(?:GET|POST) )/\S+', line)
    if m:
        print(f"  Path: {m.group()}")
# => Path: /api/users
# => Path: /api/login
# => Path: /index.html
```

### 4.5 Combining Lookbehind and Lookahead

```python
import re

# Extract content enclosed by specific delimiters
text = "[Important] This is an important message [Info] This is information"

# Extract strings inside [] (lookbehind + lookahead)
pattern = r'(?<=\[)[^\]]+(?=\])'
print(re.findall(pattern, text))
# => ['Important', 'Info']

# Extract content enclosed in quotes
text = 'name="Alice" age="30" city="Tokyo"'
pattern = r'(?<=")[^"]+(?=")'
print(re.findall(pattern, text))
# => ['Alice', '30', 'Tokyo']

# Extract specific column values from CSV
csv_line = "Alice,30,Tokyo,Engineer"
# After the 2nd comma, before the 3rd comma
pattern = r'(?<=,)[^,]+(?=,)'
print(re.findall(pattern, csv_line))
# => ['30', 'Tokyo']  -- all fields except first and last
```

---

## 5. Negative Lookbehind `(?<!pattern)`

### 5.1 Basic Behavior

```python
import re

# Extract "numbers NOT preceded by $"
pattern = r'(?<!\$)\b\d+'
text = "Price: $100, Qty: 5, Tax: $15, Count: 42"

print(re.findall(pattern, text))
# => ['5', '42']
# "$100" and "$15" don't match (preceded by $)
```

### 5.2 Compound Conditions

```python
import re

# Negative lookbehind + negative lookahead combined
# "Numbers not enclosed in quotes"
pattern = r'(?<!["\'`])\b\d+\b(?!["\'`])'
text = 'value is 42 and "100" and \'200\''

print(re.findall(pattern, text))
# => ['42']
```

### 5.3 Practical Negative Lookbehind Examples

```python
import re

# Detect unescaped special characters
text = r'Hello\nWorld\tTab\\Backslash\xHex'

# Detect 'n' not preceded by backslash
# (position where it's not an escape sequence)
# * Note: raw string required
pattern = r'(?<!\\)n'
# Note: raw string must be used in this example

# Extract code parts excluding comments
code_lines = [
    "x = 10  # Variable initialization",
    "# This is a complete comment line",
    "y = x + 1  # Addition",
    "print(y)",
]

for line in code_lines:
    # Remove everything after # as a comment (simplified version)
    code_part = re.sub(r'\s*#.*$', '', line)
    if code_part.strip():
        print(f"  Code: {code_part.strip()}")
# => Code: x = 10
# => Code: y = x + 1
# => Code: print(y)

# Escape character handling with negative lookbehind
# Detect unescaped quotes
text = r'He said "hello" and "it\'s \"fine\""'
# Detect " that is not \"
unescaped_quotes = re.findall(r'(?<!\\)"', text)
print(f"Unescaped quotes: {len(unescaped_quotes)}")
```

### 5.4 Conditional Replacement with Negative Lookbehind

```python
import re

# Perform replacement only in specific contexts

# Example 1: Convert & that is not already HTML-entity-encoded
text = "Tom & Jerry &amp; Friends &lt;tag&gt;"
# Don't convert "&amp;", "&lt;", etc. as they're already escaped
result = re.sub(r'&(?!amp;|lt;|gt;|quot;|#\d+;)', '&amp;', text)
print(result)
# => "Tom &amp; Jerry &amp; Friends &lt;tag&gt;"

# Example 2: Auto-link URLs that are not already inside Markdown links
text = "Visit http://example.com or [click here](http://other.com)"
# Don't convert URLs already inside links
pattern = r'(?<!\()(https?://\S+)(?!\))'
result = re.sub(pattern, r'<a href="\1">\1</a>', text)
print(result)

# Example 3: Link-ify email addresses not already inside tags
text = "Contact: user@example.com <a>admin@example.com</a>"
pattern = r'(?<!>)\b[\w.+-]+@[\w-]+\.[\w.]+\b(?!<)'
result = re.sub(pattern, r'<a href="mailto:\g<0>">\g<0></a>', text)
print(result)
```

---

## 6. Lookaround Combination Patterns

### 6.1 AND Condition: Chaining Multiple Lookaheads

Placing multiple lookaheads at the same position requires all conditions to be satisfied simultaneously.

```python
import re

# Example: a string satisfying all of the following conditions
# - 8-20 characters
# - Contains uppercase
# - Contains lowercase
# - Contains a digit
# - Contains a symbol
# - No same character repeated 3+ times consecutively
pattern = re.compile(
    r'^'
    r'(?=.{8,20}$)'            # 8-20 characters
    r'(?=.*[A-Z])'              # Contains uppercase
    r'(?=.*[a-z])'              # Contains lowercase
    r'(?=.*\d)'                 # Contains a digit
    r'(?=.*[!@#$%^&*()_+=-])'  # Contains a symbol
    r'(?!.*(.)\1{2})'          # No 3 consecutive identical chars
    r'.*$'                      # Match entire string
)

test_cases = [
    ("Passw0rd!", True),
    ("weakpass", False),        # No digit/symbol/uppercase
    ("ALLCAPS1!", False),       # No lowercase
    ("Short1!", False),         # Less than 8 chars
    ("Tooooo0long!password!!", False),  # Over 20 chars
    ("Paaass0rd!", False),      # 'a' repeated 3 times
    ("C0mpl3x!Pwd", True),
]

for pw, expected in test_cases:
    result = bool(pattern.match(pw))
    status = "PASS" if result == expected else "FAIL"
    print(f"  [{status}] '{pw}' => {result} (expected: {expected})")
```

### 6.2 NOT Condition: Exclusion with Negative Lookahead

```python
import re

# Extract lines not containing specific patterns
text = """
DEBUG: Starting process
INFO: User logged in
ERROR: Connection failed
DEBUG: Processing data
WARN: Low memory
INFO: Task completed
ERROR: Timeout exceeded
"""

# Lines not containing ERROR or DEBUG
pattern = r'^(?!.*(ERROR|DEBUG)).*$'
lines = re.findall(pattern, text.strip(), re.MULTILINE)
print("Filtered results:")
for line in lines:
    if line.strip():
        print(f"  {line.strip()}")
# => INFO: User logged in
# => WARN: Low memory
# => INFO: Task completed
```

### 6.3 Position Sandwiching: Lookbehind + Lookahead

```python
import re

# Pattern: replace only words in a specific context
text = "The quick brown fox jumps over the lazy dog"

# Replace "the" with "THE", but leave "The" at the beginning as-is
# Lookbehind: preceded by a space, Lookahead: followed by a space
result = re.sub(r'(?<=\s)the(?=\s)', 'THE', text)
print(result)
# => "The quick brown fox jumps over THE lazy dog"

# Convert JSON key names (snake_case -> camelCase)
json_text = '{"user_name": "Alice", "first_name": "Alice", "last_name": "Smith"}'
# Detect underscores within keys using lookbehind, capitalize next character
def snake_to_camel(match):
    return match.group(1).upper()

result = re.sub(r'(?<="[a-z_]*)_([a-z])', snake_to_camel, json_text)
print(result)
```

### 6.4 Practical Multi-Condition Pattern Collection

```python
import re

# Pattern 1: Extract amounts by currency symbol
text = "Items: $100, EUR200, JPY15000, GBP50"
currencies = {
    'USD': re.findall(r'(?<=\$)\d+', text),
    'EUR': re.findall(r'(?<=EUR)\d+', text),
    'JPY': re.findall(r'(?<=JPY)\d+', text),
    'GBP': re.findall(r'(?<=GBP)\d+', text),
}
for currency, values in currencies.items():
    if values:
        print(f"  {currency}: {values}")

# Pattern 2: Extract content between XML/HTML tags
html = "<title>My Page</title><p>Hello World</p><span>Test</span>"

# Generic pattern: capture tag name, get content until matching closing tag
pattern = r'(?<=<(\w+)>).*?(?=</\1>)'
# Note: using capture groups inside lookbehind can cause issues in Python re
# Alternative approach:
tags = re.findall(r'<(\w+)>(.*?)</\1>', html)
for tag, content in tags:
    print(f"  <{tag}>: {content}")
# => <title>: My Page
# => <p>: Hello World
# => <span>: Test

# Pattern 3: Conditional email address extraction
# Detect email addresses outside the internal domain (@company.com)
emails = "alice@company.com bob@gmail.com carol@company.com dave@yahoo.co.jp"
external = re.findall(r'\b[\w.+-]+@(?!company\.com\b)[\w.-]+\.\w+', emails)
print(f"  External emails: {external}")
# => ['bob@gmail.com', 'dave@yahoo.co.jp']
```

---

## 7. Practical Use Cases

### 7.1 Password Strength Validation

```python
import re

def validate_password(password: str) -> tuple[bool, list[str]]:
    """Validate password strength (using lookaround)"""
    errors = []

    # 8 or more characters
    if len(password) < 8:
        errors.append("Must be at least 8 characters")

    # Contains uppercase (positive lookahead)
    if not re.search(r'(?=.*[A-Z])', password):
        errors.append("Must contain at least 1 uppercase letter")

    # Contains lowercase
    if not re.search(r'(?=.*[a-z])', password):
        errors.append("Must contain at least 1 lowercase letter")

    # Contains a digit
    if not re.search(r'(?=.*\d)', password):
        errors.append("Must contain at least 1 digit")

    # Contains a symbol
    if not re.search(r'(?=.*[!@#$%^&*])', password):
        errors.append("Must contain at least 1 symbol (!@#$%^&*)")

    return (len(errors) == 0, errors)

# As a single pattern:
strong_password = re.compile(
    r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$'
)

print(strong_password.match("Passw0rd!"))  # => match
print(strong_password.match("password"))   # => None
```

### 7.2 Digit Grouping

```python
import re

# Insert commas every 3 digits
def add_commas(n: str) -> str:
    """Insert digit separators using lookahead/lookbehind"""
    return re.sub(
        r'(?<=\d)(?=(?:\d{3})+(?!\d))',
        ',',
        n
    )

print(add_commas("1234567"))     # => '1,234,567'
print(add_commas("1234567890"))  # => '1,234,567,890'
print(add_commas("42"))          # => '42' (no change)

# Pattern explanation:
# (?<=\d)           -- position preceded by a digit
# (?=(?:\d{3})+     -- followed by one or more groups of 3 digits
#   (?!\d))         -- NOT followed by another digit
# -> Insert a comma at that position
```

### 7.3 Context-Specific Replacement

```python
import re

# Replace "foo" with "bar", but exclude occurrences inside quotes
text = 'Use foo here, but "foo" stays unchanged'

# Method: negative lookbehind + negative lookahead
# (Note: this has limitations for complete in-quote detection)
result = re.sub(r'(?<!")foo(?!")', 'bar', text)
print(result)
# => 'Use bar here, but "foo" stays unchanged'
```

### 7.4 Advanced Extraction in Log Analysis

```python
import re

# Apache/Nginx access log analysis
log_line = '192.168.1.100 - admin [10/Oct/2024:13:55:36 -0700] "GET /api/v2/users?page=1 HTTP/1.1" 200 2326'

# Extract each field using lookaround
ip = re.search(r'^\S+', log_line).group()
user = re.search(r'(?<=- )\w+', log_line).group()
timestamp = re.search(r'(?<=\[)[^\]]+(?=\])', log_line).group()
method = re.search(r'(?<=")\w+', log_line).group()
path = re.search(r'(?<=(?:GET|POST|PUT|DELETE|PATCH) )\S+', log_line).group()
status = re.search(r'(?<=" )\d{3}(?= )', log_line).group()
size = re.search(r'\d+$', log_line).group()

print(f"IP: {ip}")
print(f"User: {user}")
print(f"Timestamp: {timestamp}")
print(f"Method: {method}")
print(f"Path: {path}")
print(f"Status: {status}")
print(f"Size: {size}")
```

### 7.5 Text Conversion Utilities

```python
import re

# CamelCase -> snake_case conversion
def camel_to_snake(name: str) -> str:
    """Convert CamelCase to snake_case using lookaround"""
    # Step 1: Insert underscore at boundaries between lowercase and uppercase
    s1 = re.sub(r'(?<=[a-z0-9])(?=[A-Z])', '_', name)
    # Step 2: Boundary where consecutive uppercase is followed by lowercase
    s2 = re.sub(r'(?<=[A-Z])(?=[A-Z][a-z])', '_', s1)
    return s2.lower()

test_cases = [
    "camelCase",           # => "camel_case"
    "CamelCase",           # => "camel_case"
    "getHTTPResponse",     # => "get_http_response"
    "XMLParser",           # => "xml_parser"
    "parseJSON",           # => "parse_json"
    "myURLHandler",        # => "my_url_handler"
    "simpleTest",          # => "simple_test"
]

for tc in test_cases:
    print(f"  {tc:25s} => {camel_to_snake(tc)}")

# snake_case -> CamelCase conversion
def snake_to_camel(name: str, upper_first: bool = True) -> str:
    """Convert snake_case to CamelCase"""
    components = name.split('_')
    if upper_first:
        return ''.join(x.title() for x in components)
    else:
        return components[0] + ''.join(x.title() for x in components[1:])

test_cases_snake = [
    "camel_case",           # => "CamelCase"
    "get_http_response",    # => "GetHttpResponse"
    "xml_parser",           # => "XmlParser"
    "my_url_handler",       # => "MyUrlHandler"
]

for tc in test_cases_snake:
    print(f"  {tc:25s} => {snake_to_camel(tc)}")
```

### 7.6 Markdown Text Processing

```python
import re

# Transform text while protecting content inside Markdown inline code
markdown = "Use `foo` to call `bar()`, but foo outside code should change"

# Method: replace "foo" only outside inline code
# Step 1: Temporarily replace inline code with placeholders
placeholders = {}
counter = [0]

def save_code(match):
    key = f"\x00CODE{counter[0]}\x00"
    placeholders[key] = match.group()
    counter[0] += 1
    return key

protected = re.sub(r'`[^`]+`', save_code, markdown)

# Step 2: Replace "foo" outside placeholders
result = re.sub(r'foo', 'baz', protected)

# Step 3: Restore placeholders
for key, value in placeholders.items():
    result = result.replace(key, value)

print(result)
# => "Use `foo` to call `bar()`, but baz outside code should change"
```

### 7.7 Conditional Comment Removal

```python
import re

# Remove comments from source code (preserve comment symbols inside strings)
code = '''
x = "hello # world"  # This part is a comment
y = 'test // data'  // This is also a comment
z = 42  # A number
url = "http://example.com"  # // inside URL is preserved
'''

# Simplified version: comment removal considering string literals
def remove_comments(text: str) -> str:
    """Remove comments while preserving # and // inside string literals"""
    result = []
    for line in text.split('\n'):
        # Track whether we're inside a string literal
        in_string = False
        string_char = None
        comment_start = -1

        for i, ch in enumerate(line):
            if not in_string:
                if ch in ('"', "'"):
                    in_string = True
                    string_char = ch
                elif ch == '#':
                    comment_start = i
                    break
                elif i + 1 < len(line) and line[i:i+2] == '//':
                    comment_start = i
                    break
            else:
                if ch == string_char and (i == 0 or line[i-1] != '\\'):
                    in_string = False

        if comment_start >= 0:
            result.append(line[:comment_start].rstrip())
        else:
            result.append(line)

    return '\n'.join(result)

print(remove_comments(code))
```

---

## 8. Lookaround in JavaScript

### 8.1 Lookbehind Support Since ES2018

```javascript
// Lookbehind available since ES2018+

// Positive lookbehind
const text1 = "Price: $100, EUR200";
console.log(text1.match(/(?<=\$)\d+/g));
// => ['100']

// Negative lookbehind
const text2 = "$100 200 $300 400";
console.log(text2.match(/(?<!\$)\b\d+/g));
// => ['200', '400']

// JavaScript supports variable-length lookbehind
const text3 = "http://example.com https://secure.example.com";
console.log(text3.match(/(?<=https?:\/\/)\w+/g));
// => ['example', 'secure']
// This pattern would cause an error in Python re
```

### 8.2 Practical Examples in JavaScript

```javascript
// Number formatting
function formatNumber(num) {
    return num.toString().replace(/(?<=\d)(?=(\d{3})+(?!\d))/g, ',');
}

console.log(formatNumber(1234567));     // => "1,234,567"
console.log(formatNumber(1234567890));  // => "1,234,567,890"

// Detect variables inside template literals
const template = "Hello ${name}, your balance is ${balance}";
const variables = template.match(/(?<=\$\{)\w+(?=\})/g);
console.log(variables);
// => ['name', 'balance']

// Password strength check
function checkPasswordStrength(password) {
    const checks = {
        length: /.{8,}/.test(password),
        uppercase: /(?=.*[A-Z])/.test(password),
        lowercase: /(?=.*[a-z])/.test(password),
        number: /(?=.*\d)/.test(password),
        special: /(?=.*[!@#$%^&*])/.test(password),
    };

    const score = Object.values(checks).filter(Boolean).length;
    return { checks, score, strong: score >= 4 };
}

console.log(checkPasswordStrength("Passw0rd!"));
// => { checks: { length: true, uppercase: true, ... }, score: 5, strong: true }
```

### 8.3 Combining Named Capture Groups with Lookaround

```javascript
// Combining ES2018 named capture groups with lookaround
const logLine = '2024-01-15T10:30:45 [ERROR] Database connection failed: timeout';

const pattern = /(?<=\[)(?<level>\w+)(?=\])/;
const match = logLine.match(pattern);
console.log(match.groups.level);
// => 'ERROR'

// Bulk extraction of multiple log levels
const logs = `
2024-01-15 [INFO] Server started
2024-01-15 [ERROR] Connection failed
2024-01-15 [WARN] Low disk space
2024-01-15 [DEBUG] Processing request
`;

const levels = [...logs.matchAll(/(?<=\[)(?<level>\w+)(?=\])/g)];
levels.forEach(m => console.log(m.groups.level));
// => INFO, ERROR, WARN, DEBUG
```

---

## 9. Lookaround in Java

### 9.1 Basic Usage

```java
import java.util.regex.*;
import java.util.*;

public class LookaroundExample {
    public static void main(String[] args) {
        // Positive lookahead
        Pattern p1 = Pattern.compile("\\d+(?=円)");
        Matcher m1 = p1.matcher("Product A: 1000円, Product B: 2500円");
        while (m1.find()) {
            System.out.println("Amount: " + m1.group());
        }
        // => Amount: 1000
        // => Amount: 2500

        // Positive lookbehind (fixed-length only)
        Pattern p2 = Pattern.compile("(?<=\\$)\\d+");
        Matcher m2 = p2.matcher("$100 $200 300");
        while (m2.find()) {
            System.out.println("USD: " + m2.group());
        }
        // => USD: 100
        // => USD: 200

        // Digit grouping
        String number = "1234567890";
        String formatted = number.replaceAll(
            "(?<=\\d)(?=(\\d{3})+(?!\\d))", ","
        );
        System.out.println(formatted);
        // => 1,234,567,890
    }
}
```

### 9.2 Java-Specific Notes

```java
// Java lookbehind is fixed-length only
// The following causes a compile error

try {
    Pattern.compile("(?<=\\w+)\\d+");
    // => PatternSyntaxException: Look-behind group does not have
    //    an obvious maximum length
} catch (PatternSyntaxException e) {
    System.out.println("Error: " + e.getMessage());
}

// Workaround: use fixed-length alternatives
// (?<=\\w{1}|\\w{2}|\\w{3})\\d+  -- lookbehind of 1-3 characters
// However, this approach is impractical,
// so using capture groups is better

// Java 13+ has some improvements for variable-length lookbehind
// But officially only fixed-length is supported
```

---

## 10. ASCII Diagrams

### 10.1 The 4 Types of Lookaround in Action

```
Text: "$100"

Positive lookahead (?=\d):
  Position: $ [here] 1 0 0
  "Is there \d to the right?" -> 1 is there -> success

Negative lookahead (?!\$):
  Position: [here] $ 1 0 0
  "Is there no \$ to the right?" -> $ is there -> failure
  Position: $ [here] 1 0 0
  "Is there no \$ to the right?" -> 1 is not $ -> success

Positive lookbehind (?<=\$):
  Position: $ [here] 1 0 0
  "Is there \$ to the left?" -> $ is there -> success

Negative lookbehind (?<!\$):
  Position: [here] $ 1 0 0
  "Is there no \$ to the left?" -> nothing there -> success
  Position: $ [here] 1 0 0
  "Is there no \$ to the left?" -> $ is there -> failure
```

### 10.2 Password Validation Lookahead Chain

```
Pattern: ^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$

Input: "Passw0rd!"

Position 0 (start of string):
  (?=.*[A-Z])     -> lookahead: "P" is uppercase -> success (position resets)
  (?=.*[a-z])     -> lookahead: "a" is lowercase -> success (position resets)
  (?=.*\d)        -> lookahead: "0" is a digit -> success (position resets)
  (?=.*[!@#$%^&*])-> lookahead: "!" is a symbol -> success (position resets)
  .{8,}$          -> "Passw0rd!" is 9 chars >= 8 -> success

All lookaheads start from the same position 0
(zero-width, so position does not advance)
```

### 10.3 Digit Grouping Lookahead in Action

```
Input: "1234567"
Pattern: (?<=\d)(?=(?:\d{3})+(?!\d))

Checking each position:

  1 | 2 3 4 5 6 7
    ^
  (?<=\d): 1 is there -> OK
  (?=(?:\d{3})+(?!\d)): "234567" = 3 digits x 2 + no digit after -> OK
  -> Comma insertion point!

  1 2 | 3 4 5 6 7
      ^
  (?<=\d): 2 is there -> OK
  (?=(?:\d{3})+(?!\d)): "34567" = 3 digits x 1 + "67" remainder -> NG
  -> Skip

  1 2 3 | 4 5 6 7
        ^
  (?<=\d): 3 is there -> OK
  (?=(?:\d{3})+(?!\d)): "4567" = 3 digits x 1 + "7" remainder -> NG
  -> Skip

  1 2 3 4 | 5 6 7
          ^
  (?<=\d): 4 is there -> OK
  (?=(?:\d{3})+(?!\d)): "567" = 3 digits x 1 + no digit after -> OK
  -> Comma insertion point!

Result: "1,234,567"
```

### 10.4 Nested Lookaround in Action

```
Pattern: (?<=(?<=[A-Z])[a-z])\d
Text: "Ab1Cd2ef3"

Checking: 3 conditions checked at each position

Position 2 '1':
  Outer lookbehind (?<=...): check position 1
    Position 1 'b' is [a-z] -> OK
    Inner lookbehind (?<=[A-Z]): check position 0
      Position 0 'A' is [A-Z] -> OK
  -> All conditions passed! '1' matches

Position 5 '2':
  Outer lookbehind (?<=...): check position 4
    Position 4 'd' is [a-z] -> OK
    Inner lookbehind (?<=[A-Z]): check position 3
      Position 3 'C' is [A-Z] -> OK
  -> All conditions passed! '2' matches

Position 8 '3':
  Outer lookbehind (?<=...): check position 7
    Position 7 'f' is [a-z] -> OK
    Inner lookbehind (?<=[A-Z]): check position 6
      Position 6 'e' is [A-Z]? -> NO!
  -> Inner lookbehind fails! '3' does not match

Result: ['1', '2']
Meaning: the digit part of "uppercase -> lowercase -> digit" patterns
```

---

## 11. Comparison Tables

### 11.1 Complete Lookaround Comparison

| Type | Syntax | Meaning | Example | Match |
|------|--------|---------|---------|-------|
| Positive lookahead | `X(?=Y)` | X followed by Y | `\d+(?=円)` | "100" in "100円" |
| Negative lookahead | `X(?!Y)` | X NOT followed by Y | `\d+(?!円)` | "200" in "200ドル" |
| Positive lookbehind | `(?<=Y)X` | X preceded by Y | `(?<=\$)\d+` | "100" in "$100" |
| Negative lookbehind | `(?<!Y)X` | X NOT preceded by Y | `(?<!\$)\d+` | "42" in "count: 42" |

### 11.2 Language Support Status

| Feature | Python | JavaScript | Java | Go(RE2) | Rust | .NET | Perl | Ruby |
|---------|--------|------------|------|---------|------|------|------|------|
| Positive lookahead `(?=)` | OK | OK | OK | N/A | N/A | OK | OK | OK |
| Negative lookahead `(?!)` | OK | OK | OK | N/A | N/A | OK | OK | OK |
| Positive lookbehind `(?<=)` | OK(fixed) | OK(variable) | OK(fixed) | N/A | N/A | OK(variable) | OK(fixed) | OK(fixed) |
| Negative lookbehind `(?<!)` | OK(fixed) | OK(variable) | OK(fixed) | N/A | N/A | OK(variable) | OK(fixed) | OK(fixed) |
| Variable-length lookbehind | regex module | ES2018+ | N/A | N/A | fancy-regex | Standard | N/A | N/A |

### 11.3 Lookaround vs Capture Groups

| Comparison | Lookaround | Capture Groups |
|------------|-----------|----------------|
| Included in match? | No (zero-width) | Yes |
| Behavior in replacement | Preserves surrounding text | Can be referenced as a group |
| Performance | Slightly slower (backtracking) | Generally faster |
| Readability | Tends to be complex | Relatively readable |
| Use case | Positional condition specification | Substring extraction |
| AND conditions | Achievable by chaining | Not possible alone |
| Engine compatibility | Highly engine-dependent | Nearly all engines support |

```python
import re

# Comparison example: two approaches for the same result

text = "Price: $100, $200, $300"

# Approach 1: lookbehind (get number without $)
result1 = re.findall(r'(?<=\$)\d+', text)
print(f"Lookbehind: {result1}")   # => ['100', '200', '300']

# Approach 2: capture group
result2 = re.findall(r'\$(\d+)', text)
print(f"Capture:    {result2}")   # => ['100', '200', '300']

# Results are the same, but replacement behavior differs:
# Lookbehind replacement: $ is preserved
result3 = re.sub(r'(?<=\$)\d+', 'XXX', text)
print(f"Lookbehind replace: {result3}")
# => "Price: $XXX, $XXX, $XXX"

# Capture group replacement: $ must also be specified
result4 = re.sub(r'\$\d+', '$XXX', text)
print(f"Group replace:      {result4}")
# => "Price: $XXX, $XXX, $XXX"
```

---

## 12. Performance Considerations

### 12.1 Cost of Lookaround

```python
import re
import time

# Lookaround requires sub-pattern evaluation at each position
# This can affect performance on large texts

def benchmark(name, pattern, text, iterations=10000):
    compiled = re.compile(pattern)
    start = time.perf_counter()
    for _ in range(iterations):
        compiled.findall(text)
    elapsed = time.perf_counter() - start
    print(f"  {name}: {elapsed:.4f}s ({iterations} iterations)")

text = "The quick brown fox jumps over the lazy dog " * 100

# Simple pattern vs lookaround
benchmark("Simple match  ", r'\b\w+\b', text)
benchmark("With lookahead", r'\b\w+(?=\s)', text)
benchmark("With lookbehind", r'(?<=\s)\w+', text)
benchmark("Both combined ", r'(?<=\s)\w+(?=\s)', text)
```

### 12.2 Catastrophic Backtracking with Lookaround

```python
import re

# Examples of dangerous patterns

# Dangerous: nested lookahead with repetition
# pattern = r'(?=.*a)(?=.*b)(?=.*c).+'
# Can become exponentially slow with longer inputs

# Safe: place specific patterns after each lookahead
safe_pattern = r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$'
# Each lookahead is evaluated independently, .{8,} runs in linear time

# Patterns with ReDoS risk
# Quantifiers inside lookaheads like (?=.*a+)(?=.*b+)
# can cause backtracking

# Countermeasure: make patterns inside lookaheads as specific as possible
# BAD: (?=.*a+)
# OK:  (?=.*a)
# OK:  (?=[^a]*a)  -- use negated character class for efficiency
```

### 12.3 Optimization Techniques

```python
import re

# Technique 1: Speed up lookahead with negated character classes
text = "abc123def456ghi789"

# Slow: .* tries the entire string then backtracks
slow = r'(?=.*\d)\w+'
# Fast: [^\d]* skips only non-digit characters
fast = r'(?=[^\d]*\d)\w+'

# Technique 2: Atomic groups (for supported engines)
# Not supported in Python re; available in the regex module
# (?>pattern) prevents backtracking

# Technique 3: Optimize lookahead order
# Place conditions most likely to fail first for early failure
# Example: in password validation, check symbols first
# (since passwords without symbols are most common)
password_pattern = re.compile(
    r'^'
    r'(?=.*[!@#$%^&*])'  # Symbol check (most likely to fail)
    r'(?=.*\d)'            # Digit check
    r'(?=.*[A-Z])'         # Uppercase check
    r'(?=.*[a-z])'         # Lowercase check
    r'.{8,}$'
)

# Technique 4: Reuse compiled patterns
# Patterns with lookaround have especially high compilation costs
# Always pre-compile with re.compile()
compiled = re.compile(r'(?<=\$)\d+(?=\.\d{2})')
# Use compiled.findall(text) inside loops
```

---

## 13. Advanced Techniques

### 13.1 Conditional Patterns (Lookaround Applications)

```python
import re

# Context-dependent replacement
text = "foo_bar baz_qux FOO_BAR"

# If first character is uppercase, convert entire word to uppercase; if lowercase, capitalize
def context_aware_replace(match):
    word = match.group()
    parts = word.split('_')
    if parts[0][0].isupper():
        return ''.join(p.upper() for p in parts)
    else:
        return ''.join(p.capitalize() for p in parts)

result = re.sub(r'\w+(?:_\w+)+', context_aware_replace, text)
print(result)
# => "FooBar BazQux FOOBAR"
```

### 13.2 Simulating Recursive Patterns

```python
import re

# Python re doesn't support recursive patterns,
# but some can be simulated with lookaround

# Split at commas outside nested parentheses
text = "a(b,c),d,(e,f(g,h)),i"

# Step 1: Track parenthesis nesting level and split
def split_at_top_level(text: str, delimiter: str = ',') -> list[str]:
    """Split at top-level delimiters (ignoring content inside parentheses)"""
    result = []
    current = []
    depth = 0

    for ch in text:
        if ch == '(':
            depth += 1
            current.append(ch)
        elif ch == ')':
            depth -= 1
            current.append(ch)
        elif ch == delimiter and depth == 0:
            result.append(''.join(current))
            current = []
        else:
            current.append(ch)

    result.append(''.join(current))
    return result

print(split_at_top_level(text))
# => ['a(b,c)', 'd', '(e,f(g,h))', 'i']
```

### 13.3 Complex Validation with Multiple Lookarounds

```python
import re

def validate_credit_card(number: str) -> dict:
    """Credit card number validation (using lookaround)"""
    # Remove spaces and hyphens
    clean = re.sub(r'[\s-]', '', number)

    result = {
        'number': clean,
        'valid_format': False,
        'card_type': 'Unknown',
        'luhn_valid': False,
    }

    # Card type detection (checking number patterns with lookahead)
    card_patterns = {
        'Visa': r'^4\d{12}(?:\d{3})?$',
        'MasterCard': r'^5[1-5]\d{14}$',
        'AmEx': r'^3[47]\d{13}$',
        'Discover': r'^6(?:011|5\d{2})\d{12}$',
        'JCB': r'^(?:2131|1800|35\d{3})\d{11}$',
    }

    for card_type, pattern in card_patterns.items():
        if re.match(pattern, clean):
            result['card_type'] = card_type
            result['valid_format'] = True
            break

    # Luhn algorithm validation
    if result['valid_format']:
        digits = [int(d) for d in clean]
        checksum = 0
        for i, d in enumerate(reversed(digits)):
            if i % 2 == 1:
                d *= 2
                if d > 9:
                    d -= 9
            checksum += d
        result['luhn_valid'] = (checksum % 10 == 0)

    return result

# Test
test_cards = [
    "4111 1111 1111 1111",   # Visa test card
    "5500 0000 0000 0004",   # MasterCard test card
    "3400 000000 00009",     # AmEx test card
    "1234 5678 9012 3456",   # Invalid
]

for card in test_cards:
    result = validate_credit_card(card)
    print(f"  {card}: {result['card_type']} "
          f"(format: {result['valid_format']}, luhn: {result['luhn_valid']})")
```

### 13.4 Using Lookaround for Text Tokenization

```python
import re

# Advanced tokenization using lookaround
# Split at character type boundaries

def tokenize_mixed(text: str) -> list[str]:
    """Split at boundaries between alphabetic, numeric, and Japanese characters"""
    # Insert spaces at character type boundaries
    # Boundary between letters and digits
    result = re.sub(r'(?<=[a-zA-Z])(?=\d)', ' ', text)
    result = re.sub(r'(?<=\d)(?=[a-zA-Z])', ' ', result)
    # Boundary between alphanumeric and Japanese characters
    result = re.sub(r'(?<=[a-zA-Z0-9])(?=[\u3040-\u9fff])', ' ', result)
    result = re.sub(r'(?<=[\u3040-\u9fff])(?=[a-zA-Z0-9])', ' ', result)

    return result.split()

test_cases = [
    "Hello123World",        # => ['Hello', '123', 'World']
    "test42data",           # => ['test', '42', 'data']
    "Hello世界2024",        # => ['Hello', '世界', '2024']
    "Python3プログラミング", # => ['Python', '3', 'プログラミング']
]

for tc in test_cases:
    tokens = tokenize_mixed(tc)
    print(f"  '{tc}' => {tokens}")
```

### 13.5 CSV Parser Using Lookaround

```python
import re

def parse_csv_field(line: str) -> list[str]:
    """CSV field parsing leveraging lookaround

    Correctly handles commas inside double-quoted fields
    """
    fields = []
    # Handle both quoted and unquoted fields
    pattern = re.compile(
        r'"([^"]*(?:""[^"]*)*)"|'  # Inside double quotes ("" is escape)
        r'([^,]*)'                  # Unquoted field
    )

    pos = 0
    while pos <= len(line):
        m = pattern.match(line, pos)
        if m:
            if m.group(1) is not None:
                # Quoted field: convert "" to "
                fields.append(m.group(1).replace('""', '"'))
            else:
                fields.append(m.group(2))
            pos = m.end()
            # Skip comma
            if pos < len(line) and line[pos] == ',':
                pos += 1
            elif pos >= len(line):
                break
        else:
            break

    return fields

# Test
test_lines = [
    'Alice,30,Tokyo',
    '"Bob ""Jr""",25,"New York, NY"',
    '"contains,comma",normal,"also ""quoted"""',
]

for line in test_lines:
    fields = parse_csv_field(line)
    print(f"  Input:  {line}")
    print(f"  Result: {fields}")
    print()
```

---

## 14. Lookaround Alternatives for Go and Rust

### 14.1 Alternative Approaches in Go (RE2)

```go
package main

import (
    "fmt"
    "regexp"
    "strings"
)

func main() {
    // Go's RE2 engine does not support lookaround
    // Use capture groups as an alternative

    // Alternative 1: instead of (?<=\$)\d+
    text := "Price: $100, $200, 300"
    re := regexp.MustCompile(`\$(\d+)`)
    matches := re.FindAllStringSubmatch(text, -1)
    for _, m := range matches {
        fmt.Println("Amount:", m[1]) // Capture group 1
    }
    // => Amount: 100
    // => Amount: 200

    // Alternative 2: digit grouping (without lookaround)
    number := "1234567890"
    formatted := addCommas(number)
    fmt.Println("Formatted:", formatted)
    // => Formatted: 1,234,567,890

    // Alternative 3: password validation (individual checks)
    password := "Passw0rd!"
    fmt.Println("Password strength:", validatePassword(password))
}

func addCommas(s string) string {
    // Implement digit grouping without lookaround
    n := len(s)
    if n <= 3 {
        return s
    }

    var result strings.Builder
    remainder := n % 3
    if remainder > 0 {
        result.WriteString(s[:remainder])
        if remainder < n {
            result.WriteByte(',')
        }
    }
    for i := remainder; i < n; i += 3 {
        if i > remainder {
            result.WriteByte(',')
        }
        result.WriteString(s[i : i+3])
    }
    return result.String()
}

func validatePassword(pw string) bool {
    // Check each condition individually (alternative to lookahead)
    hasUpper := regexp.MustCompile(`[A-Z]`).MatchString(pw)
    hasLower := regexp.MustCompile(`[a-z]`).MatchString(pw)
    hasDigit := regexp.MustCompile(`\d`).MatchString(pw)
    hasSpecial := regexp.MustCompile(`[!@#$%^&*]`).MatchString(pw)
    hasLength := len(pw) >= 8

    return hasUpper && hasLower && hasDigit && hasSpecial && hasLength
}
```

### 14.2 Alternative Approaches in Rust

```rust
use regex::Regex;

fn main() {
    // Rust's regex crate does not support lookaround
    // fancy-regex crate can be used for support

    // Standard regex alternative: capture groups
    let re = Regex::new(r"\$(\d+)").unwrap();
    let text = "Price: $100, $200, 300";

    for cap in re.captures_iter(text) {
        println!("Amount: {}", &cap[1]);
    }
    // => Amount: 100
    // => Amount: 200

    // Password validation: individual checks
    let password = "Passw0rd!";
    println!("Valid: {}", validate_password(password));
}

fn validate_password(pw: &str) -> bool {
    let has_upper = Regex::new(r"[A-Z]").unwrap().is_match(pw);
    let has_lower = Regex::new(r"[a-z]").unwrap().is_match(pw);
    let has_digit = Regex::new(r"\d").unwrap().is_match(pw);
    let has_special = Regex::new(r"[!@#$%^&*]").unwrap().is_match(pw);
    let has_length = pw.len() >= 8;

    has_upper && has_lower && has_digit && has_special && has_length
}

// To use fancy-regex:
// [dependencies]
// fancy-regex = "0.11"
//
// use fancy_regex::Regex;
//
// fn with_lookaround() {
//     let re = Regex::new(r"(?<=\$)\d+").unwrap();
//     let text = "Price: $100, $200";
//     for m in re.find_iter(text) {
//         if let Ok(m) = m {
//             println!("Amount: {}", m.as_str());
//         }
//     }
// }
```

---

## 15. Test-Driven Pattern Development

### 15.1 Unit Testing Lookaround Patterns

```python
import re
import unittest

class TestLookaroundPatterns(unittest.TestCase):
    """Test suite for lookaround patterns"""

    def test_positive_lookahead_yen(self):
        """Positive lookahead: extract numbers before yen"""
        pattern = re.compile(r'\d+(?=円)')
        self.assertEqual(pattern.findall("1000円"), ['1000'])
        self.assertEqual(pattern.findall("1000ドル"), [])
        self.assertEqual(pattern.findall("1000円と2000円"), ['1000', '2000'])
        self.assertEqual(pattern.findall("円1000"), [])

    def test_negative_lookahead_exclusion(self):
        """Negative lookahead: exclude specific words"""
        pattern = re.compile(r'\b(?!test\b)\w+')
        words = pattern.findall("test hello testing world")
        self.assertIn('hello', words)
        self.assertIn('testing', words)
        self.assertIn('world', words)
        self.assertNotIn('test', words)

    def test_positive_lookbehind_dollar(self):
        """Positive lookbehind: extract numbers after $"""
        pattern = re.compile(r'(?<=\$)\d+')
        self.assertEqual(pattern.findall("$100 $200 300"), ['100', '200'])
        self.assertEqual(pattern.findall("100 200"), [])

    def test_negative_lookbehind_no_dollar(self):
        """Negative lookbehind: extract numbers without $"""
        pattern = re.compile(r'(?<!\$)\b\d+')
        self.assertEqual(pattern.findall("$100 200 $300 400"), ['200', '400'])

    def test_password_validation(self):
        """Password validation pattern"""
        pattern = re.compile(
            r'^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$'
        )
        self.assertIsNotNone(pattern.match("Passw0rd!"))
        self.assertIsNone(pattern.match("password"))
        self.assertIsNone(pattern.match("SHORT1!"))
        self.assertIsNone(pattern.match("nouppercase1!"))
        self.assertIsNone(pattern.match("NOLOWERCASE1!"))
        self.assertIsNone(pattern.match("NoDigits!!"))
        self.assertIsNone(pattern.match("NoSpecial1a"))

    def test_comma_formatting(self):
        """Digit grouping format"""
        pattern = re.compile(r'(?<=\d)(?=(?:\d{3})+(?!\d))')

        def add_commas(n):
            return pattern.sub(',', n)

        self.assertEqual(add_commas("1234567"), "1,234,567")
        self.assertEqual(add_commas("42"), "42")
        self.assertEqual(add_commas("1000"), "1,000")
        self.assertEqual(add_commas("1234567890"), "1,234,567,890")

    def test_camel_to_snake(self):
        """CamelCase -> snake_case conversion"""
        def camel_to_snake(name):
            s1 = re.sub(r'(?<=[a-z0-9])(?=[A-Z])', '_', name)
            s2 = re.sub(r'(?<=[A-Z])(?=[A-Z][a-z])', '_', s1)
            return s2.lower()

        self.assertEqual(camel_to_snake("camelCase"), "camel_case")
        self.assertEqual(camel_to_snake("CamelCase"), "camel_case")
        self.assertEqual(camel_to_snake("getHTTPResponse"), "get_http_response")
        self.assertEqual(camel_to_snake("XMLParser"), "xml_parser")
        self.assertEqual(camel_to_snake("simple"), "simple")

if __name__ == '__main__':
    unittest.main()
```

### 15.2 Testing Edge Cases

```python
import re

# Comprehensive lookaround edge cases
def test_edge_cases():
    """Comprehensively test edge cases"""

    # 1. Empty string
    pattern = re.compile(r'(?=\d)\d+')
    assert pattern.findall("") == []

    # 2. Lookaround at string start/end
    # Lookbehind at start: always fails (nothing before)
    assert re.findall(r'(?<=x)\w+', "abc") == []
    # When matching character is at the start
    assert re.findall(r'(?<=x)\w+', "xabc") == ['abc']

    # 3. Multiline support
    text = "line1\nline2\nline3"
    # ^ matches each line start (with re.MULTILINE)
    assert re.findall(r'(?<=^)line\d', text, re.MULTILINE) == ['line1', 'line2', 'line3']

    # 4. Lookaround with Unicode characters
    text = "Price: 100円, 200 dollars"
    assert re.findall(r'\d+(?=円)', text) == ['100']
    assert re.findall(r'(?<=: )\d+', text) == ['100']

    # 5. Overlapping lookaround conditions
    # Contradictory conditions at the same position: always fails
    assert re.findall(r'(?=a)(?=b)', "ab") == []
    # Conditions that can both be satisfied at the same position
    assert len(re.findall(r'(?=a)(?!b)', "a")) == 1

    # 6. Consecutive zero-width matches
    text = "abc"
    # Matches at all positions (4 positions: 0,1,2,3)
    assert len(re.findall(r'(?=.)?', text)) >= 3

    print("All edge case tests passed!")

test_edge_cases()
```

---

## 16. Anti-Patterns

### 16.1 Anti-Pattern: Overuse of Lookaround

```python
import re

# BAD: Using lookaround for a simple condition
pattern_bad = r'(?<=price: )\d+'
# ^ Extraction is possible without lookbehind

# GOOD: A capture group is sufficient
pattern_good = r'price: (\d+)'
match = re.search(pattern_good, "price: 100")
print(match.group(1))  # => '100'

# Scenarios where lookaround is genuinely needed:
# - When you want to preserve surrounding text during replacement
# - When you need to combine multiple positional conditions with AND
# - When you don't want specific strings included in the match result
```

### 16.2 Anti-Pattern: Assuming Variable-Length Lookbehind

```python
import re

# BAD: Using variable-length lookbehind in Python re
try:
    re.search(r'(?<=https?://)\w+', "https://example.com")
except re.error as e:
    print(f"Error: {e}")
    # => look-behind requires fixed-width pattern
    # "https?" is 4 or 5 characters -> variable-length

# OK: Enumerate each fixed length with OR
pattern = r'(?<=http://|https://)\w+'
# This also causes an error in Python re (different-length alternatives)
# * In Python 3.6+, alternatives with different fixed lengths are allowed

# Workaround 1: Different approach
pattern = r'https?://(\w+)'
match = re.search(pattern, "https://example.com")
print(match.group(1))  # => 'example'

# Workaround 2: regex module (supports variable-length lookbehind)
# import regex
# regex.search(r'(?<=https?://)\w+', "https://example.com")
```

### 16.3 Anti-Pattern: Trying to Solve Everything with Lookaround

```python
import re

# BAD: Overly complex lookaround chain
# "Words starting with uppercase, containing a digit, 5-10 chars, not containing 'test'"
bad_pattern = r'\b(?=[A-Z])(?=\w*\d)(?!\w*test)(?=\w{5,10}\b)\w+'

# GOOD: Process in stages
def find_valid_words(text: str) -> list[str]:
    """Apply multiple conditions in stages"""
    words = re.findall(r'\b\w+\b', text)
    result = []
    for word in words:
        if not (5 <= len(word) <= 10):
            continue
        if not word[0].isupper():
            continue
        if not re.search(r'\d', word):
            continue
        if 'test' in word.lower():
            continue
        result.append(word)
    return result

# Staged processing is:
# - More readable
# - Easier to debug
# - Each condition can be tested independently
# - Performance is comparable (for short texts)
```

### 16.4 Anti-Pattern: Getting the Lookaround Direction Wrong

```python
import re

# Common beginner mistakes

# Wrong: want to extract "100" from "100円"
# Lookahead and lookbehind are reversed
try:
    wrong = re.findall(r'(?=円)\d+', "100円")
    print(f"Wrong: {wrong}")  # => [] -- nothing matches!
except:
    pass

# Correct: "円" is to the right of the number -> use lookahead
correct = re.findall(r'\d+(?=円)', "100円")
print(f"Correct: {correct}")  # => ['100']

# How to remember:
# Lookahead  = look forward  = check the right side  = (?=...) or (?!...)
# Lookbehind = look backward = check the left side   = (?<=...) or (?<!...)
#
# "ahead" = the direction we're going   = right side
# "behind" = the direction we came from = left side
```

### 16.5 Anti-Pattern: Group Reference Mistakes in Replacement

```python
import re

# Capture groups in lookaround can be referenced, but be careful

text = "old_value: 100"

# BAD: trying to reference captures inside lookaround
# Lookaround doesn't consume, so it's not part of the replacement target
result = re.sub(r'(?<=old_value: )(\d+)', r'NEW_\1', text)
print(result)
# => "old_value: NEW_100"  -- this works, but...

# Note: putting capture groups inside lookbehind
# can lead to unexpected behavior
# It's safer to capture in the main pattern instead
result = re.sub(r'(old_value: )(\d+)', r'\1NEW_\2', text)
print(result)
# => "old_value: NEW_100"  -- more explicit
```

---

## 17. FAQ

### Q1: Why is lookaround called "zero-width"?

**A**: Lookaround only checks a "position" in the string and does not "consume" characters. This means it is not included in the match result and the engine's current position does not advance. It is a type of "assertion" just like `^` and `\b`:

```python
import re
text = "100円200ドル"
# (?=円) only checks the position -- 円 itself is available for the next match
for m in re.finditer(r'\d+(?=円)', text):
    print(f"Position {m.start()}-{m.end()}: '{m.group()}'")
# => Position 0-3: '100'
# "円" is not included in the match
```

### Q2: Can lookaround be nested?

**A**: Yes. It is possible to put another lookaround inside a lookaround:

```python
import re
# "Character at a position where the previous char is uppercase and the next is a digit"
pattern = r'(?<=(?<=[A-Z])\w)(?=\d)'
# This is complex, so it's usually recommended to decompose into simpler patterns
```

However, nesting significantly reduces readability, so it is recommended to avoid complex lookaround nesting and instead split into multiple patterns or handle it with program logic.

### Q3: Why is lookaround not available in Go and Rust?

**A**: Go's RE2 and Rust's regex crate use **DFA-based engines** that prioritize O(n) linear time guarantees. Lookaround can require backtracking, which is incompatible with linear time guarantees. In Rust, the `fancy-regex` crate provides an NFA engine with lookaround support, but the O(n) guarantee is lost:

```rust
// Rust standard regex: lookaround not available
// use regex::Regex;

// fancy-regex: lookaround supported
// use fancy_regex::Regex;
// let re = Regex::new(r"(?<=\$)\d+").unwrap();
```

### Q4: Can capture groups be used inside lookaround?

**A**: Yes, but with caveats:

```python
import re

# Capture group inside lookahead
text = "100円 200ドル 300ユーロ"
pattern = r'\d+(?=(円|ドル|ユーロ))'
matches = re.findall(pattern, text)
print(matches)
# => ['円', 'ドル', 'ユーロ']
# Note: findall returns the capture group contents

# When you need both the number and the group
pattern = r'(\d+)(?=(円|ドル|ユーロ))'
matches = re.findall(pattern, text)
print(matches)
# => [('100', '円'), ('200', 'ドル'), ('300', 'ユーロ')]
```

### Q5: What is the difference between lookaround and `\b`?

**A**: `\b` is a fixed positional condition for "word boundaries", while lookaround is a general-purpose assertion that can use any pattern as a positional condition:

```python
import re

text = "hello world 123"

# \b: detects boundaries between word and non-word characters
print(re.findall(r'\b\w+\b', text))
# => ['hello', 'world', '123']

# (?=...): checks any condition to the right
# Example: "words at positions followed by a space or end"
print(re.findall(r'\w+(?=\s|$)', text))
# => ['hello', 'world', '123']

# \b is fixed but fast
# Lookaround is flexible but slightly slower
```

### Q6: Can lookaround be used in POSIX regular expressions?

**A**: No. POSIX BRE/ERE does not support lookaround. It is a PCRE (Perl Compatible Regular Expressions) feature. Use `grep -P` to access PCRE:

```bash
# POSIX ERE (grep -E): lookaround not available
# grep -E '(?<=\$)\d+' file.txt  # Error

# PCRE (grep -P): lookaround available
grep -P '(?<=\$)\d+' file.txt

# macOS grep may not support -P
# In that case, install ggrep (GNU grep):
# brew install grep
# ggrep -P '(?<=\$)\d+' file.txt
```

### Q7: Can lookahead be placed inside another lookahead?

**A**: Yes. Lookaround can be nested freely:

```python
import re

# Lookahead inside a lookahead
# "Position where there is a digit to the right, and to the right of that digit is a letter"
text = "a1b c2d e3 4f"
pattern = r'(?=\d(?=[a-z]))\d'
print(re.findall(pattern, text))
# => ['1', '2']
# '3' doesn't match (followed by a space)
# '4' doesn't match (the lookahead (?=\d...) checks the position,
# needing \d(?=[a-z]) to the right of that position)

# Practical use cases are rare, but theoretically nestable to any depth
# However, it's recommended to avoid for readability
```

### Q8: What is the relationship between lookaround and atomic groups?

**A**: Atomic groups `(?>...)` are groups that prohibit backtracking, and they are related to the internal behavior of lookaround. Matching inside lookaround is essentially atomic (once success/failure is determined, it is not reversed):

```python
# Atomic groups not supported in Python re
# Available in the regex module:
# import regex
# pattern = regex.compile(r'(?>abc|ab)c')
# regex.search(pattern, "abc")  # Doesn't match
# Normal (abc|ab)c would match "abc"

# Lookaround internals are always atomic:
# (?=abc|ab) -- once it succeeds with "abc", it doesn't try "ab"
# This is beneficial for performance but can cause unexpected behavior
```

---

## 18. Debugging and Troubleshooting

### 18.1 Debugging Lookaround

```python
import re

# Method 1: Build patterns incrementally
text = "Price: $100.50, Tax: $15.00, Total: 115.50"

# Step 1: First verify matches without lookaround
print("Step 1:", re.findall(r'\d+\.\d{2}', text))
# => ['100.50', '15.00', '115.50']

# Step 2: Add lookbehind
print("Step 2:", re.findall(r'(?<=\$)\d+\.\d{2}', text))
# => ['100.50', '15.00']

# Step 3: Add lookahead
print("Step 3:", re.findall(r'(?<=\$)\d+(?=\.\d{2})', text))
# => ['100', '15']

# Method 2: Commented patterns with verbose mode
pattern = re.compile(r'''
    (?<=\$)         # Position preceded by $ (lookbehind)
    \d+             # 1+ digits (integer part)
    (?=\.\d{2})     # Position followed by .XX (lookahead)
''', re.VERBOSE)

matches = pattern.findall(text)
print("Verbose:", matches)

# Method 3: Verify position info with finditer
for m in re.finditer(r'(?<=\$)\d+\.\d{2}', text):
    print(f"  Match: '{m.group()}' at [{m.start()}:{m.end()}]")
```

### 18.2 Common Errors and Solutions

```python
import re

# Error 1: look-behind requires fixed-width pattern
try:
    re.compile(r'(?<=\w+)\d+')
except re.error as e:
    print(f"Error 1: {e}")
# Solution: use capture groups
# re.findall(r'\w+(\d+)', text)

# Error 2: lookahead not working as intended
text = "abc123"
# Intent: get alphabetic characters before a digit
wrong = re.findall(r'(?=\d)[a-z]+', text)
print(f"Wrong: {wrong}")  # => []
# Reason: at the position of (?=\d), [a-z] cannot match
correct = re.findall(r'[a-z]+(?=\d)', text)
print(f"Correct: {correct}")  # => ['abc']

# Error 3: negative lookahead matching too much
text = "foo foobar foobaz"
wrong = re.findall(r'(?!foo)\w+', text)
print(f"Wrong: {wrong}")  # => unexpected results
# Reason: from position 1, 'oo', 'oobar', etc. also match
correct = re.findall(r'\b(?!foo)\w+', text)
print(f"Improved: {correct}")  # => [] -- all words start with foo

# Error 4: lookaround range mistake
text = "12ab34cd56"
# Intent: extract digits sandwiched between alphabetic chars
wrong = re.findall(r'(?<=[a-z])\d+(?=[a-z])', text)
print(f"Result: {wrong}")  # => ['34']
# "12" has no alphabetic char before it, "56" has none after
# If intended, this is fine; adjust conditions if "12" should also be included
```

### 18.3 Debugging with regex101

```
regex101.com is extremely useful for debugging lookaround:

1. Go to https://regex101.com/
2. Select the language (Python, JavaScript, Java, etc.) in the top left
3. Enter the pattern
4. Enter test strings
5. Check the pattern explanation in "EXPLANATION" on the right
6. Check match details in "MATCH INFORMATION" at the bottom
7. Trace step-by-step behavior in "REGEX DEBUGGER"

The REGEX DEBUGGER is particularly useful as it lets you visually
confirm success/failure at each position during lookaround evaluation.
```

---


## FAQ

### Q1: What is the most important point when learning this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory but by actually writing code and verifying how it works.

### Q2: What are common mistakes beginners make?

Skipping the basics and jumping to advanced topics. We recommend thoroughly understanding the fundamental concepts explained in this guide before moving on to the next step.

### Q3: How is this applied in real-world work?

Knowledge of this topic is frequently used in day-to-day development work. It is particularly important during code reviews and architecture design.

---

## Summary

| Item | Description |
|------|-------------|
| `(?=X)` | Positive lookahead -- position where X is to the right |
| `(?!X)` | Negative lookahead -- position where X is NOT to the right |
| `(?<=X)` | Positive lookbehind -- position where X is to the left |
| `(?<!X)` | Negative lookbehind -- position where X is NOT to the left |
| Zero-width | Does not consume characters (checks position only) |
| Lookbehind constraint | Fixed-length only in many engines |
| AND condition | Achieved by chaining multiple lookaheads |
| NOT condition | Achieved with negative lookahead/lookbehind |
| Primary use cases | Password validation, digit grouping, conditional extraction/replacement |
| DFA engines | Lookaround not supported (RE2, Rust regex) |
| Design guideline | Avoid when a simpler pattern can achieve the same result |
| Performance | Optimize lookahead order; leverage negated character classes |
| Testing | Incremental pattern construction; comprehensive edge case coverage |

## Recommended Next Guides

- [02-unicode-regex.md](./02-unicode-regex.md) -- Unicode Regular Expressions
- [03-performance.md](./03-performance.md) -- Performance and ReDoS Prevention

## References

1. **Jeffrey E.F. Friedl** "Mastering Regular Expressions" O'Reilly, 2006 -- Chapter 5: "Lookaround"
2. **MDN - Lookahead assertion** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Lookahead_assertion -- JavaScript lookaround specification
3. **Regular-Expressions.info - Lookaround** https://www.regular-expressions.info/lookaround.html -- Comprehensive lookaround explanation and cross-engine comparison
4. **Python re module documentation** https://docs.python.org/3/library/re.html -- Python standard library lookaround specification
5. **TC39 Proposal - Lookbehind Assertions** https://github.com/tc39/proposal-regexp-lookbehind -- JavaScript ES2018 lookbehind proposal
6. **RE2 Syntax** https://github.com/google/re2/wiki/Syntax -- RE2 (Go) supported syntax list and reasons for no lookaround support
7. **fancy-regex crate** https://docs.rs/fancy-regex/ -- Rust crate for using lookaround
8. **regex101.com** https://regex101.com/ -- Online tool useful for debugging lookaround



===== SOURCE: 02-programming/regex-and-text-processing/docs/01-advanced/02-unicode-regex.md =====

# Unicode Regular Expressions -- \p{Script}, Flags, and Normalization

> In global text processing, Unicode-aware regular expressions are essential. This guide systematically explains Unicode property escapes (`\p{...}`), normalization forms (NFC/NFD), and matching by writing system (Script).

## What You Will Learn in This Chapter

1. **The Unicode Property Escape System** -- Category and property classification of `\p{L}`, `\p{Script=Han}`, etc.
2. **The Relationship Between Unicode Normalization and Regular Expressions** -- How NFC/NFD/NFKC/NFKD affect search results
3. **Practical Multilingual Text Processing** -- Matching techniques for Japanese, Chinese, Arabic, and more
4. **Regex Processing of Emoji** -- Handling compound emoji and grapheme clusters
5. **Unicode Support Differences Across Languages** -- Differences between Python, JavaScript, Java, Go, and Rust
6. **Building Normalization Pipelines in Practice** -- Pre-processing for search, comparison, and validation


## Prerequisites

Before reading this guide, having the following knowledge will deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts
- Familiarity with the content of [Lookahead and Lookbehind -- (?=)(?!)(?<=)(?<!)](./01-lookaround.md)

---

## 1. Unicode Fundamentals

### 1.1 The Structure of Unicode

```
Unicode code point space:

U+0000 - U+007F    Basic Latin (ASCII)              128 characters
U+0080 - U+07FF    Latin, Greek, Cyrillic, etc.     ~1,920 characters
U+0800 - U+FFFF    CJK, Hiragana, Katakana, etc.   ~63,488 characters
U+10000 - U+10FFFF Emoji, ancient scripts, etc.     ~1,048,576 characters

Total: approximately 149,000 characters assigned (Unicode 16.0)

UTF-8 encoding:
+-------------------+-----------+----------------+
| Code Point        | Bytes     | Example        |
+-------------------+-----------+----------------+
| U+0000-U+007F    | 1 byte    | 'A' = 0x41     |
| U+0080-U+07FF    | 2 bytes   | 'e' = C3 A9    |
| U+0800-U+FFFF    | 3 bytes   | 'Han' = E6 BC A2|
| U+10000-U+10FFFF | 4 bytes   | '😀' = F0 9F 98 80|
+-------------------+-----------+----------------+
```

### 1.2 Unicode Categories (General Category)

```
+---------------------------------------------------+
|              Unicode General Category               |
+------+--------------------------------------------+
| L    | Letter                                      |
|  Lu  |  Uppercase Letter                           |
|  Ll  |  Lowercase Letter                           |
|  Lt  |  Titlecase Letter                           |
|  Lm  |  Modifier Letter                            |
|  Lo  |  Other Letter (CJK characters, kana, etc.)  |
+------+--------------------------------------------+
| M    | Mark (combining characters)                  |
|  Mn  |  Nonspacing Mark                            |
|  Mc  |  Spacing Combining Mark                     |
|  Me  |  Enclosing Mark                             |
+------+--------------------------------------------+
| N    | Number                                       |
|  Nd  |  Decimal Digit Number                       |
|  Nl  |  Letter Number (Roman numerals, etc.)       |
|  No  |  Other Number (fractions, etc.)             |
+------+--------------------------------------------+
| P    | Punctuation                                  |
|  Pc  |  Connector Punctuation (_ etc.)             |
|  Pd  |  Dash Punctuation (- - -- etc.)             |
|  Ps  |  Open Punctuation (( [ { etc.)              |
|  Pe  |  Close Punctuation () ] } etc.)             |
|  Pi  |  Initial Quote (« ' " etc.)                 |
|  Pf  |  Final Quote (» ' " etc.)                   |
|  Po  |  Other Punctuation (. , ; : ! ? etc.)       |
+------+--------------------------------------------+
| S    | Symbol                                       |
|  Sc  |  Currency Symbol ($ € ¥ £ etc.)             |
|  Sk  |  Modifier Symbol (^ ` ´ ¨ etc.)            |
|  Sm  |  Math Symbol (+ = < > ± × ÷ etc.)          |
|  So  |  Other Symbol (© ® ™ ° etc.)               |
+------+--------------------------------------------+
| Z    | Separator                                    |
|  Zs  |  Space Separator                            |
|  Zl  |  Line Separator                             |
|  Zp  |  Paragraph Separator                        |
+------+--------------------------------------------+
| C    | Other (control characters, etc.)              |
|  Cc  |  Control                                    |
|  Cf  |  Format (ZWJ, BOM, etc.)                    |
|  Cs  |  Surrogate                                  |
|  Co  |  Private Use                                |
|  Cn  |  Unassigned                                 |
+------+--------------------------------------------+
```

### 1.3 Major Unicode Writing Systems (Script)

```
+------------------------------------------------------------+
|              Major Unicode Script List                       |
+------------------+-----------------------------------------+
| Script Name      | Example Characters                       |
+------------------+-----------------------------------------+
| Latin            | A-Z a-z À-ÿ (Latin characters)           |
| Han              | 漢 字 東 京 (CJK Unified Ideographs)     |
| Hiragana         | あ い う え お (Hiragana)                 |
| Katakana         | ア イ ウ エ オ (Katakana)                 |
| Hangul           | 가 나 다 라 (Korean)                     |
| Cyrillic         | А Б В Г (Russian, etc.)                  |
| Arabic           | ا ب ت ث (Arabic)                        |
| Devanagari       | अ आ इ ई (Hindi, etc.)                   |
| Greek            | Α Β Γ Δ (Greek)                          |
| Thai             | ก ข ค ง (Thai)                           |
| Hebrew           | א ב ג ד (Hebrew)                        |
| Bengali          | অ আ ই ঈ (Bengali)                       |
| Tamil            | அ ஆ இ ஈ (Tamil)                         |
| Ethiopic         | ሀ ለ ሐ መ (Amharic, etc.)                 |
| Common           | 0-9 , . ! ? @ (shared across scripts)    |
| Inherited        | Combining characters (inherit parent      |
|                  | script)                                   |
+------------------+-----------------------------------------+
```

### 1.4 Unicode Binary Properties

```python
import regex

# Unicode binary properties (have true/false values)
text = "Hello! 123 café Α Β"

# Alphabetic -- alphabetic characters
print(regex.findall(r'\p{Alphabetic}+', text))
# => ['Hello', 'café', 'Α', 'Β']

# White_Space -- whitespace characters
print(regex.findall(r'\p{White_Space}+', text))
# => [' ', ' ', ' ', ' ']

# Uppercase / Lowercase
print(regex.findall(r'\p{Uppercase}+', text))
# => ['H', 'Α', 'Β']

print(regex.findall(r'\p{Lowercase}+', text))
# => ['ello', 'caf', 'é']

# ID_Start / ID_Continue -- programming language identifiers
# ID_Start: characters valid at the start of an identifier
# ID_Continue: characters valid from the 2nd position onward
identifier_pattern = regex.compile(r'\p{ID_Start}\p{ID_Continue}*')
code_text = "変数名 variable_1 _private 42invalid"
print(identifier_pattern.findall(code_text))
# => ['変数名', 'variable_1', '_private']

# Emoji properties
emoji_text = "Hello 👋 World 🌍 Test 1️⃣ #️⃣"
print(regex.findall(r'\p{Emoji_Presentation}', emoji_text))
# => ['👋', '🌍']

# Extended_Pictographic -- broader emoji range
print(regex.findall(r'\p{Extended_Pictographic}', emoji_text))
```

---

## 2. Unicode Property Escapes `\p{...}`

### 2.1 Basic Syntax

```python
# Python: requires the regex module (third-party)
# pip install regex
import regex

text = "Hello 世界 café 123 ١٢٣"

# \p{L} -- all letters
print(regex.findall(r'\p{L}+', text))
# => ['Hello', '世界', 'café']

# \p{N} -- all numbers
print(regex.findall(r'\p{N}+', text))
# => ['123', '١٢٣']

# \p{Lu} -- uppercase only
print(regex.findall(r'\p{Lu}', text))
# => ['H']

# \P{L} -- non-letters (negation)
print(regex.findall(r'\P{L}+', text))
# => [' ', ' ', ' ', ' ١٢٣']

# \p{Ll} -- lowercase only
print(regex.findall(r'\p{Ll}+', text))
# => ['ello', '世界', 'café']
# Note: CJK characters are Lo (Other Letter), not Ll

# \p{Lo} -- other letters (CJK characters, kana, etc.)
print(regex.findall(r'\p{Lo}+', text))
# => ['世界']
```

### 2.2 Unicode Properties in JavaScript (ES2018+)

```javascript
const text = "Hello 世界 café 123 ١٢٣";

// \p{L} -- all letters
console.log(text.match(/\p{L}+/gu));
// => ['Hello', '世界', 'café']

// \p{Script=Han} -- CJK characters only
console.log(text.match(/\p{Script=Han}+/gu));
// => ['世界']

// \p{Emoji} -- emoji
const emojiText = "Hello 👋 World 🌍!";
console.log(emojiText.match(/\p{Emoji}/gu));
// => ['👋', '🌍']

// The u flag is required
// /\p{L}/g  -> SyntaxError (without u flag)
// /\p{L}/gu -> OK

// v flag (ES2024): extended version of u
// Enables set operations
// /[\p{L}&&\p{ASCII}]/gv  -- ASCII characters that are also Letters
// /[\p{L}--\p{Script=Latin}]/gv  -- Letters other than Latin
```

### 2.3 Script (Writing System) Properties

```python
import regex

text = "日本語テスト English Русский العربية"

# Extract each writing system individually
print(regex.findall(r'\p{Script=Han}+', text))
# => ['日本語']  (CJK characters)

print(regex.findall(r'\p{Script=Hiragana}+', text))
# => []  (no hiragana in this example)

print(regex.findall(r'\p{Script=Katakana}+', text))
# => ['テスト']

print(regex.findall(r'\p{Script=Latin}+', text))
# => ['English']

print(regex.findall(r'\p{Script=Cyrillic}+', text))
# => ['Русский']

print(regex.findall(r'\p{Script=Arabic}+', text))
# => ['العربية']
```

### 2.4 The Script_Extensions Property

```python
import regex

# Difference between Script and Script_Extensions
# Script: belongs to only one writing system
# Script_Extensions: includes characters used in multiple writing systems

# Example: the prolonged sound mark "ー" (U+30FC)
# Script=Katakana, but Script_Extensions also includes Hiragana

text = "カタカナ ひらがなー"

# Script=Katakana only
print(regex.findall(r'\p{Script=Katakana}+', text))
# => ['カタカナ', 'ー']  -- ー has Script of Katakana

# CJK number characters have Script=Han
text2 = "一二三 123"
print(regex.findall(r'\p{Script=Han}+', text2))
# => ['一二三']

# CJK punctuation has Common Script
text3 = "日本語。English"
print(regex.findall(r'\p{Script=Common}', text3))
# => ['。']  -- Punctuation is Common
```

### 2.5 Processing Japanese Text

```python
import regex

text = "東京都は Tokyo とも呼ばれ、人口は約1400万人です。"

# Kanji (CJK characters)
kanji = regex.findall(r'\p{Script=Han}+', text)
print(f"Kanji: {kanji}")
# => Kanji: ['東京都', '呼', '人口', '約', '万人']

# Hiragana
hiragana = regex.findall(r'\p{Script=Hiragana}+', text)
print(f"Hiragana: {hiragana}")
# => Hiragana: ['は', 'とも', 'ばれ', 'は', 'です']

# Katakana
katakana = regex.findall(r'\p{Script=Katakana}+', text)
print(f"Katakana: {katakana}")
# => Katakana: []

# All Japanese characters (Kanji + Hiragana + Katakana)
japanese = regex.findall(r'[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]+', text)
print(f"Japanese: {japanese}")
# => Japanese: ['東京都は', 'とも呼ばれ', '人口は約', '万人です']

# Numbers (both full-width and half-width)
numbers = regex.findall(r'[\p{Nd}]+', text)
print(f"Numbers: {numbers}")
# => Numbers: ['1400']
```

### 2.6 Japanese-Specific Character Ranges and Regular Expressions

```python
import regex
import re

# Unicode blocks/ranges commonly used in Japanese processing
# These can be used with re (no regex module needed)

# Hiragana: U+3040 - U+309F
# Katakana: U+30A0 - U+30FF
# CJK Unified Ideographs: U+4E00 - U+9FFF
# CJK Unified Ideographs Extension A: U+3400 - U+4DBF
# Fullwidth Alphanumerics: U+FF01 - U+FF5E
# Halfwidth Katakana: U+FF65 - U+FF9F
# CJK Symbols and Punctuation: U+3000 - U+303F

text = "東京タワー（とうきょうタワー）は高さ333mの電波塔です。"

# Match CJK characters with re module
# Kanji
print(re.findall(r'[\u4e00-\u9fff]+', text))
# => ['東京', '高', '電波塔']

# Hiragana
print(re.findall(r'[\u3040-\u309f]+', text))
# => ['とうきょう', 'は', 'さ', 'の', 'です']

# Katakana
print(re.findall(r'[\u30a0-\u30ff]+', text))
# => ['タワー', 'タワー']

# All Japanese (Kanji + Hiragana + Katakana)
print(re.findall(r'[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff]+', text))
# => ['東京タワー', 'とうきょうタワー', 'は高さ', 'の電波塔です']

# Estimating morphological boundaries from Japanese text
# (Simplified: split at character type boundaries)
def split_japanese(text: str) -> list[str]:
    """Split Japanese text at character type boundaries"""
    # Boundaries like Kanji->Hiragana, Katakana->Kanji, etc.
    pattern = regex.compile(
        r'[\p{Script=Han}]+'
        r'|[\p{Script=Hiragana}]+'
        r'|[\p{Script=Katakana}ー]+'  # Include prolonged sound mark
        r'|[\p{Script=Latin}]+'
        r'|[\p{Nd}]+'
        r'|\S'
    )
    return pattern.findall(text)

result = split_japanese("東京タワーは高さ333mの電波塔です")
print(result)
# => ['東京', 'タワー', 'は', '高', 'さ', '333', 'm', 'の', '電波塔', 'です']
```

### 2.7 Processing Various Number Systems

```python
import regex

# Unicode has various number systems
text = "Latin: 123, Arabic: ١٢٣, Devanagari: १२३, Thai: ๑๒๓, CJK: ３２１"

# \p{Nd} -- all decimal digits
all_digits = regex.findall(r'\p{Nd}+', text)
print(f"All digits: {all_digits}")
# => ['123', '١٢٣', '१२३', '๑๒๓', '３２１']

# Specific script digits only
# Latin digits only
print(regex.findall(r'[0-9]+', text))
# => ['123']

# Arabic-Indic digits
print(regex.findall(r'[\u0660-\u0669]+', text))
# => ['١٢٣']

# Fullwidth digits
print(regex.findall(r'[\uff10-\uff19]+', text))
# => ['３２１']

# Convert all Unicode digits to ASCII digits
import unicodedata

def normalize_digits(text: str) -> str:
    """Normalize all Unicode digits to ASCII digits"""
    result = []
    for ch in text:
        if unicodedata.category(ch) == 'Nd':
            # Get numeric value via digit_value
            result.append(str(unicodedata.digit(ch)))
        else:
            result.append(ch)
    return ''.join(result)

normalized = normalize_digits(text)
print(f"After normalization: {normalized}")
# => "Latin: 123, Arabic: 123, Devanagari: 123, Thai: 123, CJK: 321"
```

---

## 3. Unicode Normalization

### 3.1 The Four Normalization Forms

```
NFC  (Canonical Decomposition + Canonical Composition)
NFD  (Canonical Decomposition)
NFKC (Compatibility Decomposition + Canonical Composition)
NFKD (Compatibility Decomposition)

Example: ways to represent "cafe"

NFC:  c a f e        (4 characters -- e is 1 code point U+00E9)
NFD:  c a f e ◌́      (5 characters -- e + combining acute U+0301)

Both look the same, but the byte sequences differ!

NFKC/NFKD additionally decompose compatibility characters:
  "ﬁ" (U+FB01) -> "fi" (2 characters)
  "①" (U+2460) -> "1"
  "Ｈｅｌｌｏ" (fullwidth) -> "Hello" (halfwidth)
```

### 3.2 How Normalization Affects Regular Expressions

```python
import unicodedata
import re

# Example where NFD and NFC produce different search results
cafe_nfc = "café"                    # NFC: é = U+00E9
cafe_nfd = "cafe\u0301"             # NFD: e + ◌́ = U+0065 + U+0301

print(f"NFC: {repr(cafe_nfc)}")     # => 'caf\xe9'
print(f"NFD: {repr(cafe_nfd)}")     # => 'cafe\u0301'
print(f"Visually identical: {cafe_nfc} == {cafe_nfd}")  # Look the same

# Search for "é" with regex
pattern = r'café'
print(bool(re.search(pattern, cafe_nfc)))  # => True
print(bool(re.search(pattern, cafe_nfd)))  # => False!

# Solution: normalize before searching
normalized = unicodedata.normalize('NFC', cafe_nfd)
print(bool(re.search(pattern, normalized)))  # => True
```

### 3.3 Detailed Behavior of Normalization Forms

```python
import unicodedata

# Detailed differences between each normalization form

# Test case 1: Accented character
e_acute = '\u00e9'          # é (NFC form)
e_combining = 'e\u0301'     # e + combining acute (NFD form)

print("=== Accented character ===")
print(f"NFC:  {repr(unicodedata.normalize('NFC', e_acute))}")   # => '\xe9'
print(f"NFD:  {repr(unicodedata.normalize('NFD', e_acute))}")   # => 'e\u0301'
print(f"NFKC: {repr(unicodedata.normalize('NFKC', e_acute))}")  # => '\xe9'
print(f"NFKD: {repr(unicodedata.normalize('NFKD', e_acute))}")  # => 'e\u0301'

# Test case 2: Ligature
fi_ligature = '\ufb01'  # ﬁ

print("\n=== Ligature ===")
print(f"NFC:  {repr(unicodedata.normalize('NFC', fi_ligature))}")   # => '\ufb01'
print(f"NFD:  {repr(unicodedata.normalize('NFD', fi_ligature))}")   # => '\ufb01'
print(f"NFKC: {repr(unicodedata.normalize('NFKC', fi_ligature))}")  # => 'fi'
print(f"NFKD: {repr(unicodedata.normalize('NFKD', fi_ligature))}")  # => 'fi'

# Test case 3: Fullwidth alphanumerics
fullwidth = '\uff28\uff45\uff4c\uff4c\uff4f'  # Ｈｅｌｌｏ

print("\n=== Fullwidth alphanumerics ===")
print(f"NFC:  {unicodedata.normalize('NFC', fullwidth)}")   # => Ｈｅｌｌｏ
print(f"NFD:  {unicodedata.normalize('NFD', fullwidth)}")   # => Ｈｅｌｌｏ
print(f"NFKC: {unicodedata.normalize('NFKC', fullwidth)}")  # => Hello
print(f"NFKD: {unicodedata.normalize('NFKD', fullwidth)}")  # => Hello

# Test case 4: Circled numbers
circled = '\u2460\u2461\u2462'  # ①②③

print("\n=== Circled numbers ===")
print(f"NFC:  {unicodedata.normalize('NFC', circled)}")   # => ①②③
print(f"NFKC: {unicodedata.normalize('NFKC', circled)}")  # => 123

# Test case 5: Roman numerals
roman = '\u2160\u2161\u2162'  # ⅠⅡⅢ

print("\n=== Roman numerals ===")
print(f"NFC:  {unicodedata.normalize('NFC', roman)}")   # => ⅠⅡⅢ
print(f"NFKC: {unicodedata.normalize('NFKC', roman)}")  # => III
```

### 3.4 Practical Normalization Pipeline

```python
import unicodedata
import re

def normalize_and_search(pattern: str, text: str, form: str = 'NFC') -> list:
    """Normalize, then search"""
    norm_text = unicodedata.normalize(form, text)
    norm_pattern = unicodedata.normalize(form, pattern)
    return re.findall(norm_pattern, norm_text)

# Handle mixed fullwidth/halfwidth text (NFKC)
text = "Ｈｅｌｌｏ　Ｗｏｒｌｄ　１２３"  # Fullwidth
normalized = unicodedata.normalize('NFKC', text)
print(normalized)         # => "Hello World 123"
print(re.findall(r'\w+', normalized))
# => ['Hello', 'World', '123']
```

### 3.5 Japanese Text Normalization Pipeline

```python
import unicodedata
import re

def normalize_japanese_text(text: str) -> str:
    """Comprehensive normalization of Japanese text

    Performs the following:
    1. NFKC normalization (fullwidth alphanumerics -> halfwidth, unify compatibility chars)
    2. Fullwidth space -> halfwidth space
    3. Consolidate consecutive whitespace
    4. Strip leading/trailing whitespace
    """
    # Step 1: NFKC normalization
    text = unicodedata.normalize('NFKC', text)

    # Step 2: Fullwidth space -> halfwidth space
    text = text.replace('\u3000', ' ')

    # Step 3: Collapse consecutive whitespace to one
    text = re.sub(r'\s+', ' ', text)

    # Step 4: Strip leading/trailing whitespace
    text = text.strip()

    return text

# Test
test_cases = [
    "Ｈｅｌｌｏ　Ｗｏｒｌｄ",          # Fullwidth alphanumerics and fullwidth spaces
    "テスト　　テスト",                  # Consecutive fullwidth spaces
    "①②③の手順",                       # Circled numbers
    "ﬁnally　ﬁnished",               # Ligatures
    "  前後に  スペース  ",             # Leading/trailing whitespace
]

for tc in test_cases:
    result = normalize_japanese_text(tc)
    print(f"  '{tc}' => '{result}'")

# Pre-search normalization pipeline
def search_normalized(pattern: str, text: str, flags=0) -> list:
    """Search in normalized text"""
    norm_text = normalize_japanese_text(text)
    norm_pattern = normalize_japanese_text(pattern)
    return re.findall(norm_pattern, norm_text, flags)

# Usage: search text with mixed fullwidth/halfwidth
text = "電話番号は０３−１２３４−５６７８です"
results = search_normalized(r'\d{2,4}[-−]\d{4}[-−]\d{4}', text)
print(f"Phone number: {results}")
# => ['03-1234-5678']
```

### 3.6 Normalization Caveats and Edge Cases

```python
import unicodedata

# Caveat 1: NFKC includes irreversible transformations
# Circled number ① -> 1 is irreversible
circled_1 = '\u2460'  # ①
nfkc = unicodedata.normalize('NFKC', circled_1)
print(f"NFKC of ①: '{nfkc}' (U+{ord(nfkc):04X})")
# => '1' (U+0031) -- becomes a regular digit

# Caveat 2: Normalization of CJK Compatibility Ideographs
# Some CJK compatibility ideographs are unified by NFKC
# Example: U+FA30 (CJK compat) -> may remain U+FA30 (not always changed)

# Caveat 3: Katakana "ヴ" and combining characters
# "ヴ" (U+30F4) stays as a single character in both NFC and NFD
vu = '\u30f4'  # ヴ
print(f"NFC: {repr(unicodedata.normalize('NFC', vu))}")   # => '\u30f4'
print(f"NFD: {repr(unicodedata.normalize('NFD', vu))}")   # => '\u30f4'

# Caveat 4: Normalization of halfwidth katakana
# NFKC converts halfwidth katakana to fullwidth katakana
halfwidth_katakana = '\uff76\uff80\uff76\uff85'  # ｶﾀｶﾅ
nfkc = unicodedata.normalize('NFKC', halfwidth_katakana)
print(f"NFKC of halfwidth katakana: '{nfkc}'")
# => 'カタカナ' (converted to fullwidth katakana)

# Caveat 5: Handling voiced/semi-voiced marks
# Halfwidth katakana "ガ" = ｶ + ﾞ (2 characters)
# NFKC combines them into fullwidth "ガ" (1 character)
ga_halfwidth = '\uff76\uff9e'  # ｶﾞ
ga_nfkc = unicodedata.normalize('NFKC', ga_halfwidth)
print(f"NFKC of ｶﾞ: '{ga_nfkc}' (len={len(ga_nfkc)})")
# => 'ガ' (len=1)
```

---

## 4. Unicode Flags and Modes

### 4.1 Unicode Flags by Language

```python
import re

text = "café CAFÉ"

# Python 3: Unicode-aware by default
# \w matches Unicode characters
print(re.findall(r'\w+', text))
# => ['café', 'CAFÉ']

# re.ASCII: restrict to ASCII only
print(re.findall(r'\w+', text, re.ASCII))
# => ['caf', 'CAF']   # é does not match

# re.IGNORECASE + Unicode
print(re.findall(r'café', text, re.IGNORECASE))
# => ['café', 'CAFÉ']
```

```javascript
// JavaScript: u flag (ES2015+)
const text = "café CAFÉ";

// Without u flag: surrogate pair issues
console.log("😀".match(/^.$/));   // => null (2 code units)
console.log("😀".match(/^.$/u));  // => ['😀'] (1 code point)

// v flag (ES2024): extension of u
// Set operations: intersection, difference
console.log("aéあ".match(/[\p{L}&&\p{ASCII}]/gv));
// => ['a']  (ASCII AND Letter)
```

### 4.2 Differences in Unicode Support Across Languages

```python
# Python 3 Unicode support
import re

text = "café naïve résumé"

# In Python 3, \w, \d, \s are Unicode-aware by default
print(re.findall(r'\w+', text))
# => ['café', 'naïve', 'résumé']

# \b is also a Unicode word boundary
print(re.findall(r'\b\w+\b', text))
# => ['café', 'naïve', 'résumé']

# re.ASCII flag restricts to ASCII mode
print(re.findall(r'\w+', text, re.ASCII))
# => ['caf', 'na', 've', 'r', 'sum']

# Can also be specified as an inline flag
print(re.findall(r'(?a)\w+', text))  # (?a) = re.ASCII
# => ['caf', 'na', 've', 'r', 'sum']
```

```java
// Java Unicode support
import java.util.regex.*;

public class UnicodeJava {
    public static void main(String[] args) {
        String text = "café naïve 東京";

        // Default: \w is [a-zA-Z_0-9] only (not Unicode-aware)
        Pattern p1 = Pattern.compile("\\w+");
        Matcher m1 = p1.matcher(text);
        while (m1.find()) {
            System.out.println(m1.group());
        }
        // => "caf", "na", "ve", (東京 does not match)

        // UNICODE_CHARACTER_CLASS flag enables Unicode support
        Pattern p2 = Pattern.compile("\\w+",
            Pattern.UNICODE_CHARACTER_CLASS);
        Matcher m2 = p2.matcher(text);
        while (m2.find()) {
            System.out.println(m2.group());
        }
        // => "café", "naïve", "東京"

        // \p{L} works in Java without any flag
        Pattern p3 = Pattern.compile("\\p{L}+");
        Matcher m3 = p3.matcher(text);
        while (m3.find()) {
            System.out.println(m3.group());
        }
        // => "café", "naïve", "東京"
    }
}
```

```go
// Go (RE2) Unicode support
package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := "café naïve 東京"

    // Go's \w is ASCII only
    re1 := regexp.MustCompile(`\w+`)
    fmt.Println(re1.FindAllString(text, -1))
    // => ["caf", "na", "ve"]

    // Unicode character properties are available
    // \p{L} -- Unicode Letter
    re2 := regexp.MustCompile(`\p{L}+`)
    fmt.Println(re2.FindAllString(text, -1))
    // => ["café", "naïve", "東京"]

    // \p{Han} -- CJK characters
    re3 := regexp.MustCompile(`\p{Han}+`)
    fmt.Println(re3.FindAllString(text, -1))
    // => ["東京"]

    // \p{Hiragana}, \p{Katakana} are also available
    text2 := "ひらがなカタカナ漢字"
    re4 := regexp.MustCompile(`\p{Hiragana}+`)
    fmt.Println(re4.FindAllString(text2, -1))
    // => ["ひらがな"]
}
```

### 4.3 Unicode Case Conversion Issues

```python
import re

# Unicode case conversion is not always 1:1
# German ß -> SS (1 character becomes 2)
text = "straße STRASSE"

print(re.findall(r'stra(?:ße|sse)', text, re.IGNORECASE))
# => ['straße', 'STRASSE']

# Turkish i/I problem
# Turkish: İ (U+0130) <-> i, I <-> ı (U+0131)
# English: I <-> i
# -> IGNORECASE results vary by locale

# Case Folding
# Unicode-standard case unification transformation
text = "Straße straße STRASSE"
for word in text.split():
    print(f"  {word} -> casefold: {word.casefold()}")
# => straße -> casefold: strasse
# => straße -> casefold: strasse
# => STRASSE -> casefold: strasse
# casefold() converts more aggressively than lower()

# Unicode case-insensitive regex
# Python's re.IGNORECASE is Unicode-aware
print(re.findall(r'straße', text, re.IGNORECASE))
# => ['Straße', 'straße']
# Note: 'STRASSE' may not match in some cases (implementation-dependent)
```

### 4.4 Comprehensive Comparison of Unicode Regex Flags

```
Unicode flags by language:

Language      Flag/Option                       Effect
--------      -----------                       ------
Python        re.UNICODE (default)              \w, \d, \s are Unicode-aware
              re.ASCII (or (?a))                Restrict to ASCII only
              re.IGNORECASE                     Unicode case-insensitive

JavaScript    /u                                Unicode-aware (code point level)
              /v (ES2024)                       /u + set operations
              /i                                Case-insensitive

Java          Pattern.UNICODE_CHARACTER_CLASS   \w, \d are Unicode-aware
              Pattern.CASE_INSENSITIVE          Case-insensitive
              Pattern.UNICODE_CASE              Unicode case (requires CASE_INSENSITIVE)

Go            (default)                         \p{...} is Unicode-aware
                                                \w, \d are ASCII only

Rust          (?u) (default)                    Unicode-aware
              (?-u)                             ASCII only
```

---

## 5. Emoji Regular Expressions

### 5.1 Challenges of Emoji Matching

```python
import regex

text = "Hello 👋🏽 World 🇯🇵 Nice 👨‍👩‍👧‍👦"

# Emoji structure:
# 👋🏽 = 👋 (U+1F44B) + 🏽 (U+1FFFE, skin tone modifier) -> 2 code points
# 🇯🇵 = 🇯 (U+1F1EF) + 🇵 (U+1F1F5)                    -> 2 code points (flag)
# 👨‍👩‍👧‍👦 = 👨 + ZWJ + 👩 + ZWJ + 👧 + ZWJ + 👦         -> 7 code points

# Python regex module
emojis = regex.findall(r'\p{Emoji_Presentation}', text)
print(emojis)

# More accurate emoji pattern (grapheme clusters)
graphemes = regex.findall(r'\X', text)  # \X = grapheme cluster
print([g for g in graphemes if regex.match(r'\p{Emoji}', g)])
```

```javascript
// JavaScript (ES2024 v flag)
const text = "Hello 👋 World 🌍!";
const emojis = text.match(/\p{Emoji_Presentation}/gu);
console.log(emojis);
// => ['👋', '🌍']
```

### 5.2 Types and Structure of Emoji

```
Types of emoji:

1. Basic Emoji
   😀 = U+1F600 (1 code point)

2. Text/Emoji Presentation Toggle
   ☺️ = ☺ (U+263A) + VS16 (U+FE0F)  -- emoji presentation
   ☺ = U+263A                         -- text presentation

3. Skin Tone Modifier
   👋🏽 = 👋 (U+1F44B) + 🏽 (U+1F3FD)

4. Flags (Regional Indicator)
   🇯🇵 = 🇯 (U+1F1EF) + 🇵 (U+1F1F5)

5. ZWJ Sequences (Zero Width Joiner)
   👨‍💻 = 👨 (U+1F468) + ZWJ (U+200D) + 💻 (U+1F4BB)
   👨‍👩‍👧‍👦 = 👨 + ZWJ + 👩 + ZWJ + 👧 + ZWJ + 👦

6. Keycap
   1️⃣ = 1 (U+0031) + VS16 (U+FE0F) + ⃣ (U+20E3)

7. Tag Sequence -- sub-regional flags
   🏴󠁧󠁢󠁥󠁮󠁧󠁿 = 🏴 + TAG_g + TAG_b + TAG_e + TAG_n + TAG_g + CANCEL_TAG
```

### 5.3 Comprehensive Emoji Regex Pattern

```python
import regex

def extract_emojis(text: str) -> list[str]:
    """Extract all emoji from text as grapheme cluster units"""
    # Split into grapheme clusters with \X
    graphemes = regex.findall(r'\X', text)

    # Determine if each is an emoji
    emoji_pattern = regex.compile(
        r'[\p{Emoji_Presentation}\p{Extended_Pictographic}]'
    )

    emojis = []
    for g in graphemes:
        if emoji_pattern.search(g):
            # Exclude false positives like digits and hash
            if not regex.match(r'^[\d#*]$', g):
                emojis.append(g)

    return emojis

# Test
test_texts = [
    "Hello 😀 World",
    "Flag: 🇯🇵 🇺🇸 🇬🇧",
    "Family: 👨‍👩‍👧‍👦",
    "Skin: 👋🏻 👋🏽 👋🏿",
    "Mix: テスト🎉テスト",
    "Numbers: 1️⃣2️⃣3️⃣",
]

for text in test_texts:
    emojis = extract_emojis(text)
    print(f"  '{text}' => {emojis}")
```

### 5.4 Removing and Replacing Emoji

```python
import regex
import re

def remove_emojis(text: str) -> str:
    """Remove all emoji from text"""
    # Method 1: Use the regex module (recommended)
    return regex.sub(
        r'[\p{Emoji_Presentation}\p{Extended_Pictographic}]'
        r'[\p{Emoji_Modifier}\p{Emoji_Component}\u200d\ufe0f\ufe0e]*',
        '',
        text
    )

def replace_emojis_with_text(text: str) -> str:
    """Replace emoji with their text representation"""
    import unicodedata
    result = []
    for grapheme in regex.findall(r'\X', text):
        name = None
        for ch in grapheme:
            try:
                n = unicodedata.name(ch, None)
                if n and 'EMOJI' not in n.upper():
                    name = n
                    break
            except ValueError:
                continue
        if name and regex.search(r'[\p{Emoji_Presentation}]', grapheme):
            result.append(f'[{name}]')
        else:
            result.append(grapheme)
    return ''.join(result)

# Test
text = "素晴らしい! 🎉 今日は天気がいい ☀️ 散歩に行こう 🚶"
print(f"Original: {text}")
print(f"After removal: {remove_emojis(text)}")
```

### 5.5 Emoji Processing in JavaScript

```javascript
// Grapheme cluster segmentation using ES2024 Intl.Segmenter
function extractEmojis(text) {
    const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' });
    const segments = [...segmenter.segment(text)];

    return segments
        .filter(seg => /\p{Emoji_Presentation}/u.test(seg.segment))
        .map(seg => seg.segment);
}

console.log(extractEmojis("Hello 😀 World 🌍 Family 👨‍👩‍👧‍👦"));
// => ['😀', '🌍', '👨‍👩‍👧‍👦']

// Character counting (by grapheme cluster)
function graphemeLength(text) {
    const segmenter = new Intl.Segmenter('ja', { granularity: 'grapheme' });
    return [...segmenter.segment(text)].length;
}

console.log("👨‍👩‍👧‍👦".length);           // => 11 (UTF-16 code unit count)
console.log(graphemeLength("👨‍👩‍👧‍👦"));  // => 1 (visual character count)
```

---

## 6. Grapheme Clusters

### 6.1 What Are Grapheme Clusters?

```
Difference between code points and grapheme clusters:

Text: "café"
  Code points (NFC): c a f é  -> 4
  Grapheme clusters:  c a f é  -> 4 (same)

Text: "cafe\u0301" (NFD)
  Code points:       c a f e ́  -> 5
  Grapheme clusters: c a f é  -> 4 (matches visual appearance)

Text: "👨‍👩‍👧‍👦"
  Code points:       👨 ZWJ 👩 ZWJ 👧 ZWJ 👦  -> 7
  Grapheme clusters: 👨‍👩‍👧‍👦                       -> 1 (visually 1 character)

Text: "🇯🇵"
  Code points:       🇯 🇵  -> 2
  Grapheme clusters: 🇯🇵   -> 1

Text: "ก้" (Thai "kor" + mai tho tone mark)
  Code points:       ก ้  -> 2
  Grapheme clusters: ก้   -> 1
```

### 6.2 Regular Expressions with Grapheme Clusters

```python
import regex

# \X -- matches a grapheme cluster (regex module)
text = "café 👨‍👩‍👧‍👦 🇯🇵 naïve"

# By code point (normal .)
import re
print(f"Code point count: {len(text)}")

# By grapheme cluster (\X)
graphemes = regex.findall(r'\X', text)
print(f"Grapheme cluster count: {len(graphemes)}")
print(f"Graphemes: {graphemes}")

# Get the first N characters by grapheme cluster
def truncate_graphemes(text: str, max_graphemes: int) -> str:
    """Truncate by visual character count"""
    graphemes = regex.findall(r'\X', text)
    return ''.join(graphemes[:max_graphemes])

# Test
long_text = "こんにちは👨‍👩‍👧‍👦世界🌍テスト"
for n in [5, 8, 10]:
    truncated = truncate_graphemes(long_text, n)
    print(f"  First {n} graphemes: '{truncated}'")
```

### 6.3 Accurate Character Count Implementation

```python
import regex
import unicodedata

def count_characters(text: str) -> dict:
    """Count various character metrics for text"""
    graphemes = regex.findall(r'\X', text)

    return {
        'bytes_utf8': len(text.encode('utf-8')),
        'bytes_utf16': len(text.encode('utf-16-le')),
        'codepoints': len(text),
        'grapheme_clusters': len(graphemes),
        'nfc_codepoints': len(unicodedata.normalize('NFC', text)),
        'nfd_codepoints': len(unicodedata.normalize('NFD', text)),
    }

# Test
test_texts = [
    ("ASCII", "Hello"),
    ("Japanese", "こんにちは"),
    ("Accent (NFC)", "caf\u00e9"),
    ("Accent (NFD)", "cafe\u0301"),
    ("Emoji", "👨‍👩‍👧‍👦"),
    ("Flag", "🇯🇵"),
    ("Mixed", "Hello世界😀"),
]

for label, text in test_texts:
    counts = count_characters(text)
    print(f"\n{label}: '{text}'")
    for key, value in counts.items():
        print(f"  {key}: {value}")
```

---

## 7. Practical Multilingual Text Processing

### 7.1 Script Detection in Multilingual Text

```python
import regex

def detect_scripts(text: str) -> dict[str, int]:
    """Detect and count writing systems present in the text"""
    scripts = {}

    script_patterns = {
        'Latin': r'\p{Script=Latin}',
        'Han': r'\p{Script=Han}',
        'Hiragana': r'\p{Script=Hiragana}',
        'Katakana': r'\p{Script=Katakana}',
        'Cyrillic': r'\p{Script=Cyrillic}',
        'Arabic': r'\p{Script=Arabic}',
        'Devanagari': r'\p{Script=Devanagari}',
        'Hangul': r'\p{Script=Hangul}',
        'Thai': r'\p{Script=Thai}',
        'Greek': r'\p{Script=Greek}',
    }

    for script_name, pattern in script_patterns.items():
        count = len(regex.findall(pattern, text))
        if count > 0:
            scripts[script_name] = count

    return scripts

# Test
test_texts = [
    "Hello World",
    "こんにちは世界",
    "Hello 世界 Мир العالم",
    "東京タワー Tokyo Tower",
    "한국어 테스트",
]

for text in test_texts:
    scripts = detect_scripts(text)
    print(f"  '{text}' => {scripts}")
```

### 7.2 Processing Arabic and Hebrew (RTL) Text

```python
import regex

# Regex processing of RTL (right-to-left) text

# Arabic text
arabic_text = "مرحبا بالعالم"  # "Hello World" in Arabic
print(regex.findall(r'\p{Script=Arabic}+', arabic_text))
# => ['مرحبا', 'بالعالم']

# Hebrew text
hebrew_text = "שלום עולם"  # "Hello World" in Hebrew
print(regex.findall(r'\p{Script=Hebrew}+', hebrew_text))
# => ['שלום', 'עולם']

# Text with mixed RTL and LTR
mixed = "Hello مرحبا World عالم"
# Extract Latin and Arabic characters separately
latin = regex.findall(r'\p{Script=Latin}+', mixed)
arabic = regex.findall(r'\p{Script=Arabic}+', mixed)
print(f"Latin: {latin}, Arabic: {arabic}")
# => Latin: ['Hello', 'World'], Arabic: ['مرحبا', 'عالم']

# BiDi (bidirectional) text processing
# Unicode directional control characters
# U+200E: LEFT-TO-RIGHT MARK (LRM)
# U+200F: RIGHT-TO-LEFT MARK (RLM)
# U+202A-U+202E: Directional control characters
# These are invisible but affect text processing

# Regex to remove directional control characters
bidi_cleanup = regex.compile(r'[\u200e\u200f\u202a-\u202e\u2066-\u2069]')
clean_text = bidi_cleanup.sub('', mixed)
print(f"After BiDi removal: {clean_text}")
```

### 7.3 Processing Chinese (Simplified/Traditional)

```python
import regex

# Distinguishing simplified and traditional Chinese
# In Unicode, they often share the same CJK Unified Ideograph code point
# Complete distinction requires specialized libraries

simplified_text = "简体中文测试"  # Simplified Chinese
traditional_text = "繁體中文測試"  # Traditional Chinese
japanese_text = "日本語漢字テスト"

# Extract CJK Unified Ideographs
for label, text in [("Simplified", simplified_text),
                     ("Traditional", traditional_text),
                     ("Japanese", japanese_text)]:
    cjk = regex.findall(r'\p{Script=Han}+', text)
    print(f"  {label}: {cjk}")

# CJK Unified Ideograph code point ranges
# U+4E00-U+9FFF: CJK Unified Ideographs (basic)
# U+3400-U+4DBF: CJK Unified Ideographs Extension A
# U+20000-U+2A6DF: CJK Unified Ideographs Extension B
# U+2A700-U+2B73F: CJK Unified Ideographs Extension C
# U+2B740-U+2B81F: CJK Unified Ideographs Extension D
# U+2B820-U+2CEAF: CJK Unified Ideographs Extension E
# U+2CEB0-U+2EBEF: CJK Unified Ideographs Extension F
# U+30000-U+3134F: CJK Unified Ideographs Extension G
```

### 7.4 Processing Korean (Hangul)

```python
import regex

korean_text = "한국어 테스트 123 Hello"

# Extract Hangul syllables
hangul = regex.findall(r'\p{Script=Hangul}+', korean_text)
print(f"Hangul: {hangul}")
# => ['한국어', '테스트']

# Hangul structure:
# Hangul syllable = Initial consonant + Medial vowel + Final consonant (optional)
# U+AC00-U+D7AF: Hangul Syllables (11,172 characters)
# U+1100-U+11FF: Hangul Jamo
# U+3130-U+318F: Hangul Compatibility Jamo

# Decompose a Hangul syllable character into Jamo
def decompose_hangul(ch: str) -> tuple[str, str, str]:
    """Decompose a Hangul syllable into initial, medial, and final"""
    code = ord(ch) - 0xAC00
    if code < 0 or code > 11171:
        return (ch, '', '')

    # Initial: 19 types, Medial: 21 types, Final: 28 types (including none)
    initial = code // (21 * 28)
    medial = (code % (21 * 28)) // 28
    final = code % 28

    initials = "ᄀᄁᄂᄃᄄᄅᄆᄇᄈᄉᄊᄋᄌᄍᄎᄏᄐᄑᄒ"
    medials = "ᅡᅢᅣᅤᅥᅦᅧᅨᅩᅪᅫᅬᅭᅮᅯᅰᅱᅲᅳᅴᅵ"
    finals = "\0ᆨᆩᆪᆫᆬᆭᆮᆯᆰᆱᆲᆳᆴᆵᆶᆷᆸᆹᆺᆻᆼᆽᆾᆿᇀᇁᇂ"

    i = initials[initial]
    m = medials[medial]
    f = finals[final] if final > 0 else ''

    return (i, m, f)

# Test
for ch in "한국":
    i, m, f = decompose_hangul(ch)
    print(f"  {ch} => Initial:{i} Medial:{m} Final:{f}")
```

### 7.5 Processing Indic Scripts (Devanagari)

```python
import regex

# Hindi text processing
hindi_text = "नमस्ते दुनिया 123"  # "Hello World" in Hindi

# Extract Devanagari characters
devanagari = regex.findall(r'\p{Script=Devanagari}+', hindi_text)
print(f"Devanagari: {devanagari}")
# => ['नमस्ते', 'दुनिया']

# Devanagari numerals
hindi_numbers = "१२३४५६७८९०"  # 1234567890 in Devanagari
print(regex.findall(r'\p{Nd}+', hindi_numbers))
# => ['१२३४५६७८९०']

# Handling combining characters
# In Devanagari, consonants are joined with virama (्)
# "स्ते" = स + ् + त + े (4 code points, 1 grapheme cluster)
graphemes = regex.findall(r'\X', "नमस्ते")
print(f"Grapheme clusters: {graphemes} (count: {len(graphemes)})")
```

---

## 8. ASCII Diagrams

### 8.1 Unicode Property Hierarchy

```
\p{L}  Letter (all letters)
+-- \p{Lu}  Uppercase    A B C ... Z  Á É  А Б В
+-- \p{Ll}  Lowercase    a b c ... z  á é  а б в
+-- \p{Lt}  Titlecase    ǅ ǈ ǋ (rare)
+-- \p{Lm}  Modifier     ʰ ʲ ˈ
+-- \p{Lo}  Other        漢 字 あ い う ア イ ウ

\p{N}  Number (all numbers)
+-- \p{Nd}  Decimal      0-9  ٠-٩  ०-९  ０-９
+-- \p{Nl}  Letter Num   Ⅰ Ⅱ Ⅲ Ⅳ Ⅴ
+-- \p{No}  Other Num    ½ ¼ ① ②

\p{P}  Punctuation
+-- \p{Pc}  Connector    _
+-- \p{Pd}  Dash         - – —
+-- \p{Ps}  Open         ( [ {
+-- \p{Pe}  Close        ) ] }
+-- ...

\p{S}  Symbol
+-- \p{Sc}  Currency     $ € ¥ £
+-- \p{Sm}  Math         + = < > ≤ ≥
+-- ...
```

### 8.2 Normalization Form Relationship Diagram

```
         Canonical decomposition
  NFC <---------------------------> NFD
   |                                 |
   |Compatibility                    |Compatibility
   |composition                      |decomposition
   v                                 v
  NFKC <-------------------------> NFKD
         Canonical decomposition

Example: "ﬁ" (U+FB01 LATIN SMALL LIGATURE FI)

NFC:  ﬁ (unchanged)
NFD:  ﬁ (unchanged -- no canonical decomposition)
NFKC: fi (decomposed to 2 characters)
NFKD: fi (decomposed to 2 characters)

Example: "é" (U+00E9 LATIN SMALL LETTER E WITH ACUTE)

NFC:  é        (1 character: U+00E9)
NFD:  e + ◌́    (2 characters: U+0065 + U+0301)
NFKC: é        (1 character: U+00E9)
NFKD: e + ◌́    (2 characters: U+0065 + U+0301)

Normalization selection flow:

  Storing/exchanging text?
  +-- Yes -> NFC (Web standard, most common)
  +-- No
      Searching/collating/comparing?
      +-- Yes -> NFKC (unify compatibility characters)
      +-- No
          Processing accent marks individually?
          +-- Yes -> NFD (decomposed form)
          +-- No -> NFC (recommended default)
```

### 8.3 How Surrogate Pairs Work

```
Code point representation in UTF-16:

BMP (U+0000 - U+FFFF): Represented directly as 16 bits
  'A' = U+0041 -> 0x0041 (1 code unit)
  '漢' = U+6F22 -> 0x6F22 (1 code unit)

Supplementary Planes (U+10000+): Surrogate pair (two 16-bit values)
  '😀' = U+1F600
  -> 0xD83D 0xDE00 (2 code units = surrogate pair)

  Calculation:
  code = 0x1F600 - 0x10000 = 0xF600
  high = (0xF600 >> 10) + 0xD800 = 0xD83D
  low  = (0xF600 & 0x3FF) + 0xDC00 = 0xDE00

JavaScript . (without u flag):
  "😀".length      -> 2 (surrogate pair)
  "😀".match(/./)  -> "\uD83D" (high surrogate only)

JavaScript . (with u flag):
  "😀".match(/./u) -> "😀" (correctly treated as 1 character)
```

### 8.4 How UTF-8 Encoding Works

```
UTF-8 byte structure:

1-byte character (U+0000-U+007F):
  0xxxxxxx
  Example: 'A' = 01000001 = 0x41

2-byte character (U+0080-U+07FF):
  110xxxxx 10xxxxxx
  Example: 'é' (U+00E9) = 11000011 10101001 = 0xC3 0xA9

3-byte character (U+0800-U+FFFF):
  1110xxxx 10xxxxxx 10xxxxxx
  Example: '漢' (U+6F22) = 11100110 10111100 10100010 = 0xE6 0xBC 0xA2

4-byte character (U+10000-U+10FFFF):
  11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
  Example: '😀' (U+1F600) = 11110000 10011111 10011000 10000000
                           = 0xF0 0x9F 0x98 0x80

Regex engines operate at the code point level,
so you generally do not need to be aware of UTF-8 byte structure.
However, care is needed with byte-level pattern matching (e.g., grep -P).
```

---

## 9. Comparison Tables

### 9.1 Unicode Property Support by Language

| Property | Python re | Python regex | JavaScript | Java | Go | Rust | Perl |
|----------|----------|-------------|------------|------|----|------|------|
| `\p{L}` | No | Yes | Yes (ES2018+u) | Yes | Yes | Yes | Yes |
| `\p{Lu}` | No | Yes | Yes | Yes | Yes | Yes | Yes |
| `\p{Script=Han}` | No | Yes | Yes | No | No | No | Yes |
| `\p{Han}` (short form) | No | Yes | No | No | Yes | Yes | Yes |
| `\p{Emoji}` | No | Yes | Yes | No | No | No | Yes |
| `\p{Block=CJK}` | No | Yes | No | Yes | No | No | Yes |
| `\X` (grapheme) | No | Yes | No | No | No | No | Yes |
| Unicode `\w` | Default | Default | Requires `/u` | Requires flag | No (use `\p{L}`) | Default | Default |

### 9.2 When to Use Each Normalization Form

| Form | Use Case | Characteristics | Recommended Scenarios |
|------|----------|----------------|----------------------|
| NFC | Standard for text storage/exchange | Composed form. Recommended by web standards | HTML, JSON, database storage |
| NFD | When you need to process decomposed text | Separates accent marks | Text analysis, sorting |
| NFKC | Search/collation | Unifies compatibility characters (fullwidth -> halfwidth, etc.) | Full-text search, user input normalization |
| NFKD | Search pre-processing | Maximum decomposition | Index construction |

### 9.3 Cross-Language Comparison of \w

| Language | Default `\w` Range | How to Enable Unicode |
|----------|-------------------|----------------------|
| Python 3 | Unicode characters + digits + `_` | Unicode-aware by default |
| JavaScript (no flag) | `[a-zA-Z0-9_]` | No expansion with `/u` flag |
| JavaScript `/u` | `[a-zA-Z0-9_]` | Use `\p{L}` instead |
| Java | `[a-zA-Z_0-9]` | `UNICODE_CHARACTER_CLASS` flag |
| Go | `[0-9A-Za-z_]` | Use `\p{L}` instead |
| Rust | Unicode characters + digits + `_` | `(?-u)` to restrict to ASCII |
| Perl | Unicode characters + digits + `_` | Unicode-aware by default |

---

## 10. Practical Pattern Collection

### 10.1 Internationalized Email Addresses

```python
import regex

# Internationalized email addresses (RFC 6531)
# Allow Unicode characters in local part and domain

# Basic email pattern (ASCII)
ascii_email = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'

# Unicode-aware email pattern
unicode_email = r'[\p{L}\p{N}._%+-]+@[\p{L}\p{N}.-]+\.[\p{L}]{2,}'

test_emails = [
    "user@example.com",           # Normal
    "田中@例え.jp",                # Japanese (internationalized)
    "пользователь@пример.рф",     # Russian (internationalized)
    "user@例え.com",               # Mixed
]

import re
for email in test_emails:
    ascii_match = bool(re.match(ascii_email, email))
    unicode_match = bool(regex.match(unicode_email, email))
    print(f"  {email}: ASCII={ascii_match}, Unicode={unicode_match}")
```

### 10.2 International Phone Numbers

```python
import re

# International phone number pattern (E.164 format)
# +[country code][number] with max 15 digits
e164_pattern = r'\+[1-9]\d{1,14}'

# Country-specific phone number formats
phone_patterns = {
    'JP': r'(?:0\d{1,4}[-\s]?\d{1,4}[-\s]?\d{4}|\+81\s?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{4})',
    'US': r'(?:\+1[-\s]?)?\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}',
    'UK': r'(?:\+44[-\s]?)?\d{2,5}[-\s]?\d{3,8}',
}

test_numbers = [
    "+81-90-1234-5678",   # Japan
    "03-1234-5678",        # Japan (with area code)
    "+1 (555) 123-4567",   # US
    "+44 20 7123 4567",    # UK
]

for num in test_numbers:
    for country, pattern in phone_patterns.items():
        if re.search(pattern, num):
            print(f"  {num} => {country}")
            break
```

### 10.3 Unicode-Aware Validation

```python
import regex
import unicodedata

def validate_username(username: str) -> tuple[bool, list[str]]:
    """Unicode-aware username validation

    Rules:
    - 3 to 20 characters (by grapheme cluster count)
    - Only Unicode letters, digits, underscores, and hyphens
    - Must start with a letter
    - No control or invisible characters
    - Prohibit mixing multiple writing systems to avoid visual confusion
    """
    errors = []

    # Count grapheme clusters
    graphemes = regex.findall(r'\X', username)
    if len(graphemes) < 3:
        errors.append("Must be at least 3 characters")
    if len(graphemes) > 20:
        errors.append("Must be 20 characters or fewer")

    # Allowed characters check
    if not regex.match(r'^[\p{L}\p{N}_-]+$', username):
        errors.append("Only letters, digits, _, and - are allowed")

    # First character check
    if username and not regex.match(r'^\p{L}', username):
        errors.append("Must start with a letter")

    # Control character check
    if regex.search(r'\p{C}', username):
        errors.append("Control characters are not allowed")

    # Mixed script check (confusable attack prevention)
    scripts = set()
    for ch in username:
        cat = unicodedata.category(ch)
        if cat.startswith('L'):
            try:
                script = unicodedata.script(ch) if hasattr(unicodedata, 'script') else 'Unknown'
            except:
                script = 'Unknown'
            if script not in ('Common', 'Inherited', 'Unknown'):
                scripts.add(script)

    if len(scripts) > 1:
        errors.append(f"Mixing multiple writing systems is prohibited: {scripts}")

    return (len(errors) == 0, errors)

# Test
test_usernames = [
    "alice",           # OK: ASCII
    "田中太郎",         # OK: Japanese
    "Алексей",         # OK: Cyrillic
    "ab",              # NG: too short
    "alice_tanaka",    # OK: ASCII + underscore
    "123start",        # NG: starts with digit
]

for username in test_usernames:
    valid, errors = validate_username(username)
    status = "OK" if valid else "NG"
    print(f"  '{username}': {status} {errors if errors else ''}")
```

### 10.4 Detecting Confusable Characters

```python
import regex

# Examples of confusable characters
# These can be exploited for phishing and impersonation

confusable_pairs = [
    ('a', 'а'),      # Latin 'a' vs Cyrillic 'а' (U+0430)
    ('e', 'е'),      # Latin 'e' vs Cyrillic 'е' (U+0435)
    ('o', 'о'),      # Latin 'o' vs Cyrillic 'о' (U+043E)
    ('p', 'р'),      # Latin 'p' vs Cyrillic 'р' (U+0440)
    ('c', 'с'),      # Latin 'c' vs Cyrillic 'с' (U+0441)
    ('x', 'х'),      # Latin 'x' vs Cyrillic 'х' (U+0445)
    ('0', 'О'),      # Digit '0' vs Cyrillic 'О' (U+041E)
    ('1', 'l'),      # Digit '1' vs Latin 'l'
    ('I', 'l'),      # Latin 'I' vs Latin 'l'
]

# Detect mixed scripts
def detect_mixed_scripts(text: str) -> bool:
    """Detect mixed scripts that could indicate a confusable attack"""
    has_latin = bool(regex.search(r'\p{Script=Latin}', text))
    has_cyrillic = bool(regex.search(r'\p{Script=Cyrillic}', text))
    has_greek = bool(regex.search(r'\p{Script=Greek}', text))

    # Mixing Latin with Cyrillic or Greek characters is dangerous
    scripts = sum([has_latin, has_cyrillic, has_greek])
    return scripts > 1

# Test
suspicious_urls = [
    "example.com",      # Normal
    "ехаmple.com",      # Cyrillic 'е' and 'х' mixed in
    "gооgle.com",       # Cyrillic 'о' mixed in
    "paypal.com",       # Normal
    "раypal.com",       # Cyrillic 'р' and 'а' mixed in
]

for url in suspicious_urls:
    is_mixed = detect_mixed_scripts(url)
    if is_mixed:
        print(f"  [WARNING] '{url}' -- Mixed script detected!")
    else:
        print(f"  [OK] '{url}'")
```

---

## 11. Anti-patterns

### 11.1 Anti-pattern: Hardcoding Unicode Ranges

```python
import re
import regex

# BAD: Manually specifying Unicode ranges
pattern_bad = r'[\u3040-\u309F]+'  # Hardcoded hiragana range
# Unicode version updates may change the range

# GOOD: Use Unicode properties
pattern_good = r'\p{Script=Hiragana}+'  # regex module

text = "こんにちは"
print(regex.findall(pattern_good, text))
# => ['こんにちは']
```

### 11.2 Anti-pattern: Comparing Without Normalization

```python
import unicodedata
import re

# BAD: Comparing strings without normalization
text_nfc = "caf\u00e9"      # NFC: é (1 character)
text_nfd = "cafe\u0301"     # NFD: e + ́ (2 characters)

# They look the same, but...
print(text_nfc == text_nfd)             # => False!
print(re.search(r'café', text_nfd))     # => None!

# GOOD: Normalize before comparing
text_normalized = unicodedata.normalize('NFC', text_nfd)
print(text_nfc == text_normalized)      # => True
print(re.search(r'café', text_normalized))  # => match
```

### 11.3 Anti-pattern: Assuming . Matches All Characters

```python
import re

# BAD: . does not match newlines, and
# without the u flag (JavaScript), it matches half of a surrogate pair

# In Python this is not an issue, but...
text = "Hello 😀 World"
print(re.findall(r'.', text))
# Python 3: correctly matches one code point at a time

# BAD: combined emoji sequences get broken
text = "👨‍👩‍👧‍👦"
print(re.findall(r'.', text))
# => ['👨', '\u200d', '👩', '\u200d', '👧', '\u200d', '👦']
# ZWJ-joined emoji gets decomposed

# GOOD: process by grapheme cluster
import regex
print(regex.findall(r'\X', text))
# => ['👨\u200d👩\u200d👧\u200d👦']  -- one grapheme cluster
```

### 11.4 Anti-pattern: Using len() to Determine Character Count

```python
# BAD: len() returns the code point count
text1 = "café"           # NFC: 4 code points
text2 = "cafe\u0301"     # NFD: 5 code points
text3 = "👨‍👩‍👧‍👦"          # 7 code points

print(f"len(text1) = {len(text1)}")  # => 4
print(f"len(text2) = {len(text2)}")  # => 5 (visually 4 characters!)
print(f"len(text3) = {len(text3)}")  # => 7 (visually 1 character!)

# GOOD: Count by grapheme cluster
import regex

def visual_length(text: str) -> int:
    """Return the visual character count"""
    return len(regex.findall(r'\X', text))

print(f"visual_length(text1) = {visual_length(text1)}")  # => 4
print(f"visual_length(text2) = {visual_length(text2)}")  # => 4
print(f"visual_length(text3) = {visual_length(text3)}")  # => 1
```

### 11.5 Anti-pattern: Assuming a Specific Encoding

```python
import re

# BAD: Processing characters at the byte level
text = "漢字"
# bad: expecting text.encode('utf-8')[0:3] to get 1 character
# CJK characters are 3 bytes in UTF-8, but different in other encodings

# GOOD: Process at the string level
first_char = text[0]  # '漢'
print(first_char)

# BAD: Using byte patterns in regex
# bad: re.findall(rb'\xe6[\x80-\xbf][\x80-\xbf]', text.encode())
# This matches 3-byte UTF-8 characters but is fragile

# GOOD: Use string-level regex
print(re.findall(r'[\u4e00-\u9fff]', text))
# => ['漢', '字']

# Even better: Use Unicode properties
import regex
print(regex.findall(r'\p{Script=Han}', text))
# => ['漢', '字']
```

---

## 12. FAQ

### Q1: How can I use `\p{L}` in Python's `re` module?

**A**: The standard `re` module does not support it. Use the third-party `regex` module:

```bash
pip install regex
```

```python
import regex

text = "Hello 世界"
print(regex.findall(r'\p{L}+', text))
# => ['Hello', '世界']

# Alternative with the re module:
import re
# Method 1: Unicode category flag workaround
print(re.findall(r'[^\W\d_]+', text))  # Negate \W and exclude digits and _
# => ['Hello', '世界']
```

### Q2: What is the best way to accurately detect emoji?

**A**: Emoji consist of multiple code points, so simple patterns are insufficient. Using grapheme clusters (`\X`) is the best approach:

```python
import regex

text = "Hi 👨‍👩‍👧‍👦 there 🇯🇵"

# Split into grapheme clusters with \X
graphemes = regex.findall(r'\X', text)
emoji_graphemes = [g for g in graphemes if regex.search(r'\p{Emoji}', g) and not regex.match(r'[\d#*]', g)]
print(emoji_graphemes)
```

In JavaScript, you can also use `Intl.Segmenter` (ES2022).

### Q3: How do I unify fullwidth and halfwidth characters for searching?

**A**: Apply NFKC normalization as a pre-processing step:

```python
import unicodedata
import re

text = "Ｈｅｌｌｏ　Ｗｏｒｌｄ　１２３"

# NFKC normalization: convert fullwidth alphanumerics to halfwidth
normalized = unicodedata.normalize('NFKC', text)
print(normalized)  # => "Hello World 123"

# After normalization, you can search with normal regex
print(re.findall(r'[A-Za-z]+', normalized))
# => ['Hello', 'World']

print(re.findall(r'\d+', normalized))
# => ['123']
```

### Q4: Can Unicode version upgrades change regex behavior?

**A**: Yes. When new characters are added in a new Unicode version, the match range of `\p{L}` or `\p{Script=Han}` may change:

```python
# Example: characters added in Unicode 15.0 will not
# be recognized by older versions of Python/regex

# Countermeasures:
# 1. Regularly update the runtime version
# 2. Explicitly document the Unicode version dependency
# 3. Verify character range coverage with unit tests
```

### Q5: Is there a way to automatically perform Unicode normalization in regex?

**A**: Some engines support "canonical equivalence matching," but it is not common:

```python
# ICU (International Components for Unicode)-based engines:
# CANONICAL_EQUIVALENCE flag enables canonically equivalent pattern matching

# In Java:
# Pattern.compile("café", Pattern.CANON_EQ)
# This matches both "café" (NFC) and "cafe\u0301" (NFD)

# In Python, pre-normalizing is the standard approach:
import unicodedata
import re

def canonical_search(pattern: str, text: str):
    """Canonical equivalence match"""
    nfc_text = unicodedata.normalize('NFC', text)
    nfc_pattern = unicodedata.normalize('NFC', pattern)
    return re.findall(nfc_pattern, nfc_text)
```

### Q6: What is the difference between `\w` and `\p{L}`?

**A**: `\w` is "word characters" equivalent to `[\p{L}\p{N}\p{Pc}]` (letters, numbers, and connector punctuation). `\p{L}` is "letters" only:

```python
import regex

text = "hello_123_世界"

# \w: letters + digits + _
print(regex.findall(r'\w+', text))
# => ['hello_123_世界']

# \p{L}: letters only
print(regex.findall(r'\p{L}+', text))
# => ['hello', '世界']

# \p{N}: digits only
print(regex.findall(r'\p{N}+', text))
# => ['123']
```

---


## FAQ

### Q1: What is the most important point to keep in mind when studying this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory, but by actually writing code and verifying its behavior.

### Q2: What are common mistakes that beginners make?

Skipping the fundamentals and jumping to advanced topics. We recommend thoroughly understanding the basic concepts explained in this guide before moving on to the next steps.

### Q3: How is this knowledge applied in real-world work?

The knowledge from this topic is frequently used in day-to-day development work. It becomes particularly important during code reviews and architecture design.

---

## Summary

| Item | Description |
|------|-------------|
| `\p{L}` | Matches all Unicode letters |
| `\p{N}` | Matches all Unicode numbers |
| `\p{Script=Han}` | Matches CJK characters only |
| `\p{Script=Hiragana}` | Matches hiragana only |
| `\p{Script=Katakana}` | Matches katakana only |
| `\p{Emoji}` | Matches emoji |
| `\X` | Grapheme cluster (regex module) |
| NFC | Composed form (web standard, text storage) |
| NFD | Decomposed form (accent processing) |
| NFKC | Compatibility decomposition + composition (for search, fullwidth -> halfwidth) |
| NFKD | Compatibility decomposition (maximum decomposition) |
| `/u` flag | Enables Unicode support in JavaScript |
| `/v` flag | JavaScript ES2024 set operations |
| Golden rule | Normalize before searching; do not hardcode properties |
| Character count | Count by grapheme cluster, not len() |

## Recommended Next Reads

- [03-performance.md](./03-performance.md) -- Performance and ReDoS countermeasures
- [../02-practical/00-language-specific.md](../02-practical/00-language-specific.md) -- Language-specific regex differences

## References

1. **Unicode Technical Standard #18** "Unicode Regular Expressions" https://unicode.org/reports/tr18/ -- The international standard specification for Unicode regular expressions
2. **Unicode Technical Report #15** "Unicode Normalization Forms" https://unicode.org/reports/tr15/ -- Official specification for normalization forms
3. **Unicode Technical Standard #51** "Unicode Emoji" https://unicode.org/reports/tr51/ -- Official specification for emoji
4. **Mathias Bynens** "JavaScript has a Unicode problem" https://mathiasbynens.be/notes/javascript-unicode -- Unicode issues and solutions in JavaScript
5. **Python regex module** https://github.com/mrabarnett/mrab-regex -- Feature-rich regex module for Python
6. **TC39 RegExp v flag proposal** https://github.com/tc39/proposal-regexp-v-flag -- JavaScript ES2024 v flag specification
7. **Unicode CLDR** https://cldr.unicode.org/ -- Unicode Common Locale Data Repository (locale-specific character processing)
8. **Unicode Confusables** https://unicode.org/reports/tr39/ -- Unicode Security Mechanisms (confusable character detection)



===== SOURCE: 02-programming/regex-and-text-processing/docs/01-advanced/03-performance.md =====

# Performance -- ReDoS, Backtracking Explosion, and Optimization

> Performance issues in regular expressions can have serious consequences, ranging from security vulnerabilities (ReDoS) to complete service outages. This guide explains the principles of backtracking explosion, and how to design safe and fast patterns.

## What You Will Learn in This Chapter

1. **The Principles of ReDoS (Regular Expression Denial of Service)** -- Why certain patterns become exponentially slow
2. **Detecting and Avoiding Backtracking Explosion** -- How to identify dangerous patterns and their safe alternatives
3. **Regex Optimization Techniques** -- Compilation, anchors, negated character classes, possessive quantifiers
4. **Understanding Engine-Specific Characteristics** -- How NFA vs DFA engines work and their tradeoffs
5. **Security Measures in Practice** -- Designing input validation pipelines
6. **Benchmarking Methods** -- Measuring and comparing regex performance


## Prerequisites

Before reading this guide, having the following knowledge will deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts
- Familiarity with the content of [Unicode Regular Expressions -- \p{Script}, Flags, and Normalization](./02-unicode-regex.md)

---

## 1. Fundamentals of Regex Engines

### 1.1 Differences Between NFA and DFA

```
The Two Major Regex Engine Architectures:

NFA (Non-deterministic Finite Automaton)
  Behavior: Pattern-driven. Tries each element of the pattern in order,
           and backtracks to explore other possibilities on failure.
  Characteristics:
  - Supports backreferences, lookaround, and possessive quantifiers
  - Worst-case exponential time complexity O(2^n)
  - Used by: Python re, JavaScript, Java, Perl, PCRE

DFA (Deterministic Finite Automaton)
  Behavior: Text-driven. Processes each character of the input exactly once,
           determining the next state via a state transition table.
  Characteristics:
  - No backtracking -> Always linear time O(n)
  - Cannot support backreferences or lookaround in principle
  - Used by: RE2, Rust regex, awk, grep (basic)

Hybrid:
  Some engines combine DFA and NFA
  - PCRE2 JIT: NFA-based but accelerated with JIT compilation
  - .NET: NFA-based but includes a timeout mechanism
  - RE2: Primarily DFA, but falls back to NFA for some features
```

### 1.2 How Backtracking Works

```python
import re

# Detailed tracking of how backtracking operates

# Pattern: a+b
# Input: "aaac"

# Engine behavior:
# Position 0: a+ -> matches "aaa" (greedy)
#             b  -> 'c' != 'b' -> fail
#             Backtrack: a+ -> matches "aa"
#             b  -> 'a' != 'b' -> fail
#             Backtrack: a+ -> matches "a"
#             b  -> 'a' != 'b' -> fail
# Position 1: a+ -> matches "aa"
#             b  -> 'c' != 'b' -> fail
#             Backtrack...
# Position 2: a+ -> matches "a"
#             b  -> 'c' != 'b' -> fail
# Position 3: a+ -> no match
# Result: No match

# This pattern is safe -- backtracking is linear

# Dangerous pattern: (a+)+b -- backtracking becomes exponential
```

### 1.3 Backtracking Limits in NFA Engines

```python
# Backtracking limits by language
#
# Python re:      No limit (default)
# Python regex:   Can be limited via timeout parameter
# JavaScript V8:  --regexp-backtracks-limit (default: several million)
# Java:           No limit (default)
# .NET:           Can be limited via Regex.MatchTimeout
# PCRE2:          Can be limited via pcre2_set_match_limit
# Perl:           No limit (default)

# JavaScript V8 example:
# node --regexp-backtracks-limit=10000 script.js

# .NET example:
# var regex = new Regex(pattern, RegexOptions.None,
#                       TimeSpan.FromSeconds(1));
```

---

## 2. What Is ReDoS?

### 2.1 Overview of ReDoS

```
ReDoS (Regular Expression Denial of Service):
A denial-of-service attack that forces a regex engine into
exponential time complexity through malicious input.

Attack flow:
+------------+    Vulnerable pattern    +----------------+
| Attacker   | ----------------------> | Web Server     |
|            |   Malicious input       |                |
|            |                         |  Regex engine  |
|            |                         |  enters        |
|            |                         |  infinite loop |
|            |                         |  -> CPU 100%   |
|            |                         |  -> DoS        |
+------------+                         +----------------+

ReDoS severity levels:
+----------------------------------------------+
| Severity Level | Situation                    |
+----------------+------------------------------+
| Minor          | Single request delay         |
| Moderate       | Worker thread exhaustion     |
| Major          | Server-wide CPU exhaustion   |
| Critical       | Cascading failure, full      |
|                | service outage               |
+----------------+------------------------------+
```

### 2.2 Real-World ReDoS Incidents

```
Notable past ReDoS incidents:

1. Stack Overflow (2016)
   Cause: Regex in HTML sanitizer
   Impact: 34 minutes of downtime
   Pattern: Caused by a whitespace repetition pattern

2. Cloudflare (2019)
   Cause: Regex in WAF rules
   Impact: 27-minute global service disruption
   Pattern: (?:(?:\"|'|\]|\}|\\|\d|(?:nan|infinity|true|false|
             null|undefined|symbol|math)|\`|\-|\+)+[)]*;?((?:\s|
             -|~|!|{}|\|\||\+)*.*(?:.*=.*)))

3. Node.js (2017) -- CVE-2017-15896
   Cause: Regex in HTTP header parser
   Impact: Affected all Node.js applications

4. npm (2018) -- event-stream
   Cause: Regex processing within a package
   Impact: Rippled across the entire npm ecosystem
```

### 2.3 Examples of Vulnerable Patterns

```python
import re
import time

# Vulnerable pattern: (a+)+b
pattern = re.compile(r'(a+)+b')

# Safe input: completes instantly
start = time.time()
pattern.search("aaaaab")
print(f"Safe input: {time.time() - start:.4f}s")

# Malicious input: becomes exponentially slow
# Warning: the following will be extremely slow to execute
for length in [15, 20, 25]:
    malicious = "a" * length + "c"  # Non-matching input
    start = time.time()
    pattern.search(malicious)
    elapsed = time.time() - start
    print(f"Length {length}: {elapsed:.4f}s")

# Example output:
# Length 15: 0.01s
# Length 20: 0.30s
# Length 25: 9.50s    <- Exponential growth!
```

### 2.4 The Mechanism of Backtracking Explosion

```
Pattern: (a+)+b
Input:   "aaaaac" (6 characters, no match)

Engine behavior -- tries all possible partitions:

Attempt 1: (aaaaa)b     -> b != c -> fail
Attempt 2: (aaaa)(a)b   -> b != c -> fail
Attempt 3: (aaa)(aa)b   -> b != c -> fail
Attempt 4: (aaa)(a)(a)b -> b != c -> fail
Attempt 5: (aa)(aaa)b   -> b != c -> fail
Attempt 6: (aa)(aa)(a)b -> b != c -> fail
Attempt 7: (aa)(a)(aa)b -> b != c -> fail
...

For n characters of 'a', approximately 2^n partitions are attempted
-> n=25: approximately 33 million
-> n=30: approximately 1 billion!

Why does it become exponential?
  (a+)+ means "repeat a group of one or more 'a' characters one or more times"
  This means "aaa" can be partitioned as:
    (aaa)         -- 1 group
    (aa)(a)       -- 2 groups
    (a)(aa)       -- 2 groups
    (a)(a)(a)     -- 3 groups
  Each partition pattern is equivalent to integer partitioning -> exponential
```

---

## 3. Classification of Dangerous Patterns

### 3.1 Three Types of ReDoS-Vulnerable Patterns

```
+----------------------------------------------------+
|         Types of ReDoS-Vulnerable Patterns          |
+----------------------------------------------------+
|                                                     |
| 1. Nested Quantifiers                               |
|    (a+)+   (a*)*   (a+)*   (a*)+                   |
|    -> Inner and outer quantifiers match              |
|       the same characters                            |
|                                                     |
| 2. Overlapping Alternation                          |
|    (a|a)+  (a|ab)+  (\w|\d)+                        |
|    -> Alternatives can match the same characters     |
|                                                     |
| 3. Overlapping Quantifiers                          |
|    \d+\d+  a+a+  .*.*                               |
|    -> Consecutive quantifiers compete for            |
|       the same characters                            |
|                                                     |
+----------------------------------------------------+
```

### 3.2 Detailed Analysis by Type

```python
# === Type 1: Nested Quantifiers ===

# Pattern: (a+)+
# Why is it dangerous?
# The inner a+ matches "one or more a's"
# The outer + "repeats the group one or more times"
# -> "aaaa" can be partitioned into (aa)(aa), (a)(aaa), (aaa)(a), (a)(a)(aa), ...
#   exponentially many ways

# Pattern: (\d+)*
# Why is it dangerous?
# The inner \d+ matches "one or more digits"
# The outer * "repeats zero or more times"
# -> "12345" can be partitioned into (12)(345), (1)(2345), (123)(45), ...

# === Type 2: Overlapping Alternation ===

# Pattern: (a|ab)+
# Why is it dangerous?
# For "ab", there are two choices: match as a + b or as ab
# This creates 2 choices at each step
# -> For n repetitions of "ab", there are 2^n possibilities

# Pattern: (\w|\d)+
# Why is it dangerous?
# \d is a subset of \w
# For digits, both \w and \d are attempted
# -> Exponential backtracking with digit-only input

# === Type 3: Overlapping Quantifiers ===

# Pattern: \d+\d+\d+
# Why is it dangerous?
# How to distribute "12345" among each \d+
# (1)(2)(345), (1)(23)(45), (12)(3)(45), ...
# -> Combinatorial explosion
```

### 3.3 Examples of Real-World Vulnerable Patterns

```python
# Catalog of vulnerable patterns (avoid executing these)

vulnerable_patterns = {
    # Nested quantifiers
    "(a+)+":           "aaaaaaaaaaaaaaac",
    "(a+)+b":          "aaaaaaaaaaaaaaac",
    "(a*)*b":          "aaaaaaaaaaaaaaac",
    "([a-z]+)+$":      "aaaaaaaaaaaaaaa!",

    # Overlapping alternation
    "(a|a)+b":         "aaaaaaaaaaaaaaac",
    "(\\w|\\d)+$":     "aaaaaaaaaaaaaaaa!",
    "(.*a){20}":       "aaaaaaaaaaaaaaaaaaaaX",

    # Real-world vulnerable patterns
    # Email validation
    r"^([a-zA-Z0-9])(([\-.]|[_]+)?([a-zA-Z0-9]+))*(@)":
        "aaaaaaaaaaaaaaaaaaaaa!",

    # URL validation
    r"^(https?://)([\w-]+(\.[\w-]+)+)(/[\w-./?%&=]*)*$":
        "http://a.b.c.d.e.f.g.h.i.j.k.l.m.n.o.p!",
}
```

### 3.4 Mathematical Analysis of Vulnerable Patterns

```
Calculating backtracking count:

For pattern (a+)+b with input "a^n c":

  The number of ways to partition n characters of 'a'
  into k groups is C(n-1, k-1) (combination)

  Summing over all possible group counts:
  Sum_{k=1}^{n} C(n-1, k-1) = 2^(n-1)

  -> O(2^n) backtracking

Concrete examples:
  n=10:  2^9  =    512 attempts
  n=20:  2^19 = 524,288 attempts
  n=25:  2^24 = 16,777,216 attempts
  n=30:  2^29 = 536,870,912 attempts (over 500 million)

  Assuming 100ns per backtracking step:
  n=25: approximately 1.7 seconds
  n=30: approximately 54 seconds
  n=35: approximately 1,718 seconds (about 29 minutes)

For pattern (a|aa)+ with input "a^n c":
  Grows like the Fibonacci sequence -> O(phi^n) ~ O(1.618^n)
  Exponential but slower growth than (a+)+

For pattern (\d+)+ with input "d^n c":
  Equivalent to (a+)+ -> O(2^n)
```

---

## 4. Designing Safe Patterns

### 4.1 Fundamental Principles of Fixing Patterns

```python
import re

# Principle 1: Eliminate nested quantifiers

# BAD: (a+)+
# GOOD: a+
pattern_safe1 = r'a+b'

# Principle 2: Eliminate overlapping alternatives

# BAD: (\w|\d)+  (\w includes \d)
# GOOD: \w+
pattern_safe2 = r'\w+$'

# Principle 3: Use negated character classes for explicit constraints

# BAD: ".*"  (greedy, matches past the closing quote)
# GOOD: "[^"]*"  (matches only within quotes)
pattern_safe3 = r'"[^"]*"'

# Principle 4: Use atomic groups or possessive quantifiers
# (Python regex module, Java, PCRE)

# BAD: (a+)+b       -> backtracking explosion
# GOOD: (?>a+)+b    -> atomic group (backtracking prohibited)

# Principle 5: Limit input length
# Not just pattern fixes -- limit the input itself

def safe_match(pattern, text, max_length=10000):
    """Safe match with input length limit"""
    if len(text) > max_length:
        raise ValueError(f"Input too long: {len(text)} > {max_length}")
    return re.search(pattern, text)
```

### 4.2 Pattern Fix Examples

```python
import re

# Example 1: Email validation
# BAD: vulnerable
email_bad = r'^([a-zA-Z0-9])(([\-.]|[_]+)?([a-zA-Z0-9]+))*(@)'

# GOOD: safe and practical
email_good = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

# Example 2: Extracting HTML tag content
# BAD: vulnerable (nested quantifiers)
tag_bad = r'<(\w+)(\s+\w+="[^"]*")*>'

# GOOD: safe
tag_good = r'<\w+(?:\s+\w+="[^"]*")*>'

# Example 3: CSV fields
# BAD: vulnerable
csv_bad = r'^("(?:[^"]|"")*"|[^,]*)(,("(?:[^"]|"")*"|[^,]*))*$'

# GOOD: process field by field
csv_good = r'"(?:[^"]|"")*"|[^,]+'

text = '"hello, world","test""quote"",normal'
print(re.findall(csv_good, text))

# Example 4: Whitespace handling
# BAD: vulnerable (overlapping like \s+\s*)
whitespace_bad = r'(\s+\w+)*\s*$'

# GOOD: safe (clear delimiters)
whitespace_good = r'(?:\s+\w+)*\s*$'
# Even safer: constrain with negated character class
whitespace_best = r'(?:\s\S+)*\s*$'

# Example 5: Multi-line text processing
# BAD: .* matches across lines
multiline_bad = r'START.*END'

# GOOD: match within a single line only
multiline_good = r'START[^\n]*END'
# Or explicitly control the DOTALL flag
```

### 4.3 Possessive Quantifiers and Atomic Groups

```python
# Possessive Quantifier: X++, X*+, X?+
# Atomic Group: (?>X)
#
# Both prohibit backtracking
# -> Once matched, characters are never relinquished

# Atomic groups with the Python regex module
import regex

# Normal quantifier: backtracks
# Pattern: a+b against "aaac"
# a+ -> "aaa" -> expects b but gets c -> backtracks
# a+ -> "aa" -> expects b but gets a -> backtracks
# ...

# Atomic group: does not backtrack
# Pattern: (?>a+)b against "aaac"
# (?>a+) -> "aaa" (backtracking prohibited) -> expects b but gets c -> immediate failure

pattern_atomic = regex.compile(r'(?>a+)b')
print(pattern_atomic.search("aaab"))   # => match
print(pattern_atomic.search("aaac"))   # => None (immediate failure)

# Possessive quantifier (Java, PCRE2, regex module)
pattern_possessive = regex.compile(r'a++b')
print(pattern_possessive.search("aaab"))   # => match
print(pattern_possessive.search("aaac"))   # => None

# Atomic groups as ReDoS countermeasure
# BAD: (a+)+b -> backtracking explosion
# GOOD: (?>(a+))+b -> inner a+ is atomic -> no explosion
safe_pattern = regex.compile(r'(?>(a+))+b')
import time
start = time.time()
safe_pattern.search("a" * 30 + "c")
print(f"Atomic version: {time.time() - start:.4f}s")
# => completes instantly
```

```java
// Possessive quantifiers in Java
import java.util.regex.*;

public class PossessiveExample {
    public static void main(String[] args) {
        // Normal: backtracking enabled
        Pattern greedy = Pattern.compile("(a+)+b");

        // Possessive: backtracking disabled
        Pattern possessive = Pattern.compile("(a++)+b");

        String input = "a".repeat(30) + "c";

        // Possessive quantifier fails immediately
        long start = System.nanoTime();
        possessive.matcher(input).find();
        long elapsed = System.nanoTime() - start;
        System.out.println("Possessive: " + (elapsed / 1_000_000) + "ms");
        // => Possessive: 0ms
    }
}
```

### 4.4 Timeout Mechanisms

```python
import re
import signal

# Python: timeout using signal (Unix-like systems only)
class RegexTimeout(Exception):
    pass

def timeout_handler(signum, frame):
    raise RegexTimeout("Regex timed out")

def safe_search(pattern, text, timeout_sec=1):
    """Regex search with timeout"""
    signal.signal(signal.SIGALRM, timeout_handler)
    signal.alarm(timeout_sec)
    try:
        result = re.search(pattern, text)
        signal.alarm(0)  # Cancel timer
        return result
    except RegexTimeout:
        return None

# Usage example
result = safe_search(r'(a+)+b', "a" * 30 + "c", timeout_sec=2)
if result is None:
    print("Timeout or no match")
```

```python
# Cross-platform timeout using multiprocessing
import re
from multiprocessing import Process, Queue
import time

def regex_worker(pattern_str, text, result_queue):
    """Execute regex in a separate process"""
    try:
        pattern = re.compile(pattern_str)
        result = pattern.search(text)
        result_queue.put(('success', result is not None))
    except Exception as e:
        result_queue.put(('error', str(e)))

def safe_regex_search(pattern_str, text, timeout_sec=2):
    """Process-based regex search with timeout"""
    result_queue = Queue()
    p = Process(target=regex_worker, args=(pattern_str, text, result_queue))
    p.start()
    p.join(timeout=timeout_sec)

    if p.is_alive():
        p.terminate()
        p.join()
        return None, "timeout"

    if not result_queue.empty():
        status, result = result_queue.get()
        return result, status

    return None, "unknown error"

# Usage example
result, status = safe_regex_search(r'(a+)+b', "a" * 30 + "c", timeout_sec=2)
print(f"Result: {result}, Status: {status}")
```

```javascript
// JavaScript: third-party libraries for safe regex
// re2 package (RE2 engine bindings)
// npm install re2

// const RE2 = require('re2');
// const pattern = new RE2('(a+)+b');
// RE2 automatically optimizes this

// Timeout using Worker
function safeRegexTest(pattern, text, timeoutMs = 1000) {
    return new Promise((resolve, reject) => {
        const worker = new Worker(
            URL.createObjectURL(new Blob([`
                self.onmessage = function(e) {
                    const regex = new RegExp(e.data.pattern);
                    const result = regex.test(e.data.text);
                    self.postMessage({ result });
                };
            `]))
        );

        const timer = setTimeout(() => {
            worker.terminate();
            reject(new Error('Regex timeout'));
        }, timeoutMs);

        worker.onmessage = (e) => {
            clearTimeout(timer);
            worker.terminate();
            resolve(e.data.result);
        };

        worker.postMessage({ pattern: pattern.source, text });
    });
}
```

---

## 5. Performance Optimization

### 5.1 Compilation (Pre-compilation)

```python
import re
import time

text = "The quick brown fox jumps over the lazy dog" * 1000

# BAD: Compile on every iteration
start = time.time()
for _ in range(10000):
    re.search(r'\b\w{5}\b', text)
time_uncompiled = time.time() - start

# GOOD: Pre-compile
pattern = re.compile(r'\b\w{5}\b')
start = time.time()
for _ in range(10000):
    pattern.search(text)
time_compiled = time.time() - start

print(f"Uncompiled: {time_uncompiled:.3f}s")
print(f"Compiled:   {time_compiled:.3f}s")
# Pre-compiled is faster (especially with repeated use)

# Note: Python internally caches up to 512 patterns,
# but explicit compilation is recommended
```

### 5.2 Speedup with Anchors

```python
import re
import time

# Anchors let the engine skip unnecessary positions

text = "2024-01-15 Some log entry here" * 10000

# Slow: tries at every position
slow = r'\d{4}-\d{2}-\d{2}'

# Fast: only tries at line start
fast = r'^\d{4}-\d{2}-\d{2}'

# Fast: constrained by word boundaries
fast2 = r'\b\d{4}-\d{2}-\d{2}\b'

# Benchmark
for label, pattern in [("No anchor", slow), ("With ^", fast), ("With \\b", fast2)]:
    compiled = re.compile(pattern)
    start = time.time()
    for _ in range(1000):
        compiled.search(text)
    elapsed = time.time() - start
    print(f"  {label}: {elapsed:.4f}s")
```

### 5.3 Negated Character Class vs Lazy Quantifier

```python
import re
import time

html = '<div class="test">' * 10000 + 'content</div>'

# Slow: lazy quantifier (backtracking occurs)
start = time.time()
re.search(r'<div.*?>', html)
lazy_time = time.time() - start

# Fast: negated character class (no backtracking)
start = time.time()
re.search(r'<div[^>]*>', html)
negated_time = time.time() - start

print(f"Lazy quantifier:        {lazy_time:.6f}s")
print(f"Negated character class: {negated_time:.6f}s")

# Why is the negated character class faster?
#
# Lazy quantifier .*?> behavior:
#   1. .  matches (starting from 0 characters)
#   2. Try > -> fail
#   3. . matches one more character
#   4. Try > -> fail
#   5. Repeat... (2 steps each time)
#
# Negated character class [^>]*> behavior:
#   1. [^>]* matches all non-> characters at once
#   2. Try > -> success
#   (No backtracking occurs)
```

### 5.4 Summary of Optimization Techniques

```python
import re

# 1. Pre-check with fixed strings
text = "long text without the target pattern..."

# Slow: search with regex every time
if re.search(r'target\s+\w+\s+pattern', text):
    pass

# Fast: pre-check with string search
if 'target' in text and 'pattern' in text:
    if re.search(r'target\s+\w+\s+pattern', text):
        pass

# 2. Leverage fixed prefixes
# The engine can optimize patterns with fixed prefixes

# Easy to optimize: starts with a fixed string
good = r'ERROR: \w+'

# Hard to optimize: starts with a variable pattern
bad = r'.*ERROR: \w+'

# 3. Eliminate unnecessary captures
# Capture groups -> non-capture groups
slow = r'(https?)://([\w.]+)/([\w/]+)'
fast = r'(?:https?)://(?:[\w.]+)/(?:[\w/]+)'

# 4. Optimize alternation order
# Put more frequent alternatives first
slow_alt = r'(?:rare_pattern|common_pattern)'
fast_alt = r'(?:common_pattern|rare_pattern)'

# 5. Use specific character classes
# Slow: .* (matches anything -> source of backtracking)
slow_dot = r'<.*>'
# Fast: [^>]* (constrained -> minimizes backtracking)
fast_neg = r'<[^>]*>'

# 6. Match only the required portion
# Slow: match the entire string then extract groups
slow_full = r'^.*?(\d{4}-\d{2}-\d{2}).*$'
# Fast: search only for the needed part
fast_part = r'\d{4}-\d{2}-\d{2}'
```

### 5.5 Optimizing Large Data Processing

```python
import re
import time

# Optimization for processing large log files

def benchmark(name, func, lines, iterations=3):
    """Run benchmark"""
    times = []
    for _ in range(iterations):
        start = time.perf_counter()
        func(lines)
        times.append(time.perf_counter() - start)
    avg = sum(times) / len(times)
    print(f"  {name}: {avg:.4f}s (average)")

# Generate test data
log_lines = []
for i in range(100000):
    if i % 3 == 0:
        log_lines.append(f"2024-01-15 10:30:{i%60:02d} [ERROR] Something failed: {i}")
    elif i % 3 == 1:
        log_lines.append(f"2024-01-15 10:30:{i%60:02d} [INFO] Processing item {i}")
    else:
        log_lines.append(f"some other line without timestamp {i}")

# Method 1: Naive (re.search on every line)
def naive_search(lines):
    results = []
    for line in lines:
        m = re.search(r'\[ERROR\]', line)
        if m:
            results.append(line)
    return results

# Method 2: Pre-compiled
error_pattern = re.compile(r'\[ERROR\]')
def compiled_search(lines):
    results = []
    for line in lines:
        if error_pattern.search(line):
            results.append(line)
    return results

# Method 3: Pre-filter with string search
def prefiltered_search(lines):
    results = []
    for line in lines:
        if '[ERROR]' in line:
            results.append(line)
    return results

# Method 4: List comprehension (Python optimization)
def list_comp_search(lines):
    return [line for line in lines if '[ERROR]' in line]

# Run benchmarks
print("Benchmark results (100K lines):")
benchmark("Naive re.search", naive_search, log_lines)
benchmark("Pre-compiled", compiled_search, log_lines)
benchmark("String pre-filter", prefiltered_search, log_lines)
benchmark("List comprehension", list_comp_search, log_lines)
```

### 5.6 Regex vs String Operations Benchmark

```python
import re
import time

# When to use regex vs string operations

text = "user@example.com" * 10000

# Task: Check if "@" is present

# Method 1: re.search
pattern = re.compile(r'@')
start = time.perf_counter()
for _ in range(100000):
    pattern.search(text)
regex_time = time.perf_counter() - start

# Method 2: in operator
start = time.perf_counter()
for _ in range(100000):
    '@' in text
string_time = time.perf_counter() - start

print(f"re.search:   {regex_time:.4f}s")
print(f"in operator: {string_time:.4f}s")
print(f"Speed ratio: {regex_time / string_time:.1f}x")

# General guidelines:
# - Simple string search -> in, find(), startswith(), endswith()
# - Pattern matching -> regex
# - String replacement (fixed) -> str.replace()
# - String replacement (pattern) -> re.sub()
# - String splitting (fixed) -> str.split()
# - String splitting (pattern) -> re.split()
```

---

## 6. Security Design for Input Validation

### 6.1 Defense-in-Depth Architecture

```
Input Validation Pipeline:

+---------------------------------------------------+
|            Input Validation Pipeline               |
+---------------------------------------------------+
|                                                    |
|  Layer 1: Length Limits                            |
|  +-- Limit maximum character count (e.g., 1000)   |
|  +-- Empty string check                           |
|                                                    |
|  Layer 2: Character Type Restrictions              |
|  +-- Allow only permitted character classes        |
|  +-- Remove control and invisible characters       |
|                                                    |
|  Layer 3: Simple Pattern Pre-check                 |
|  +-- Pre-check with string operations              |
|  +-- Early rejection of obviously invalid input    |
|                                                    |
|  Layer 4: Detailed Regex Validation                |
|  +-- Use safe patterns                             |
|  +-- Set timeouts                                  |
|  +-- Prefer DFA engines                            |
|                                                    |
|  Layer 5: Business Logic Validation                |
|  +-- Application-specific rules                    |
|                                                    |
+---------------------------------------------------+
```

```python
import re

class InputValidator:
    """Input validation with defense in depth"""

    def __init__(self, max_length=1000, allowed_chars=None,
                 pattern=None, timeout_sec=1):
        self.max_length = max_length
        self.allowed_chars = allowed_chars
        self.pattern = re.compile(pattern) if pattern else None
        self.timeout_sec = timeout_sec

    def validate(self, value: str) -> tuple[bool, str]:
        """Validate input value"""
        # Layer 1: Length limit
        if not value:
            return False, "Empty input"
        if len(value) > self.max_length:
            return False, f"Input too long ({len(value)} > {self.max_length})"

        # Layer 2: Character type restriction
        if self.allowed_chars:
            invalid = set(value) - set(self.allowed_chars)
            if invalid:
                return False, f"Disallowed characters: {invalid}"

        # Layer 3: Regex check
        if self.pattern:
            if not self.pattern.match(value):
                return False, "Does not match the expected pattern"

        return True, "OK"

# Usage example: email address validator
email_validator = InputValidator(
    max_length=254,
    pattern=r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
)

test_emails = [
    "user@example.com",
    "a" * 300 + "@test.com",
    "invalid-email",
    "<script>alert('xss')</script>@evil.com",
]

for email in test_emails:
    valid, msg = email_validator.validate(email)
    print(f"  {email[:40]:40s} => {msg}")
```

### 6.2 Safe Use of User Input as Regular Expressions

```python
import re

# BAD: Using user input directly as a regex
def search_bad(user_input: str, text: str):
    return re.search(user_input, text)  # ReDoS attack possible!

# Attack example:
# user_input = "(a+)+b"
# text = "a" * 30 + "c"
# -> CPU goes to 100%

# GOOD: Escape user input
def search_safe(user_input: str, text: str):
    escaped = re.escape(user_input)  # Escape all metacharacters
    return re.search(escaped, text)

# GOOD: Or use a DFA engine
# import re2
# def search_safe_re2(pattern: str, text: str):
#     return re2.search(pattern, text)  # O(n) guaranteed

# GOOD: Allow only a restricted regex subset
def search_limited(user_pattern: str, text: str, max_length=100):
    """Allow only a safe subset of regex"""
    if len(user_pattern) > max_length:
        raise ValueError("Pattern too long")

    # Detect dangerous constructs
    dangerous = [
        r'\(.+[+*]\).+[+*]',  # Nested quantifiers
        r'\(\?\:.*\|.*\)[+*]', # Repeated alternation
    ]
    for d in dangerous:
        if re.search(d, user_pattern):
            raise ValueError("Dangerous pattern detected")

    return re.search(user_pattern, text)
```

### 6.3 Pattern Design for WAF (Web Application Firewall)

```python
import re

# Safe WAF rule design

# BAD: Dangerous WAF rules
waf_rules_bad = {
    'sql_injection': r"('.+--)|(--.+')",  # No nesting but .+ is risky
    'xss': r"(<script.*>.*</script.*>)",  # .* is dangerous
}

# GOOD: Safe WAF rules
waf_rules_good = {
    'sql_injection': r"(?:'\s*(?:--|;|/\*)|(?:--|;|/\*)\s*')",
    'xss': r"<script[^>]*>[^<]*</script[^>]*>",
    'path_traversal': r"(?:\.\./|\.\.\\){2,}",
}

def check_waf_rules(input_text: str, rules: dict) -> list[str]:
    """Check input against WAF rules"""
    violations = []
    for rule_name, pattern in rules.items():
        compiled = re.compile(pattern, re.IGNORECASE)
        if compiled.search(input_text):
            violations.append(rule_name)
    return violations

# Test
test_inputs = [
    "normal input",
    "'; DROP TABLE users; --",
    "<script>alert('xss')</script>",
    "../../../etc/passwd",
]

for inp in test_inputs:
    violations = check_waf_rules(inp, waf_rules_good)
    if violations:
        print(f"  [BLOCKED] '{inp[:40]}' => {violations}")
    else:
        print(f"  [PASS]    '{inp[:40]}'")
```

---

## 7. Benchmarking Methods

### 7.1 Regex Benchmark Framework

```python
import re
import time
import statistics

class RegexBenchmark:
    """Performance benchmark for regular expressions"""

    def __init__(self, pattern: str, description: str = ""):
        self.pattern = re.compile(pattern)
        self.pattern_str = pattern
        self.description = description

    def run(self, text: str, iterations: int = 1000,
            warmup: int = 100) -> dict:
        """Run benchmark"""
        # Warmup
        for _ in range(warmup):
            self.pattern.search(text)

        # Measurement
        times = []
        for _ in range(iterations):
            start = time.perf_counter_ns()
            self.pattern.search(text)
            elapsed = time.perf_counter_ns() - start
            times.append(elapsed)

        return {
            'pattern': self.pattern_str,
            'description': self.description,
            'iterations': iterations,
            'min_ns': min(times),
            'max_ns': max(times),
            'mean_ns': statistics.mean(times),
            'median_ns': statistics.median(times),
            'stdev_ns': statistics.stdev(times) if len(times) > 1 else 0,
            'p95_ns': sorted(times)[int(len(times) * 0.95)],
            'p99_ns': sorted(times)[int(len(times) * 0.99)],
        }

    def print_result(self, result: dict):
        """Print results"""
        print(f"Pattern: {result['pattern']}")
        print(f"Description: {result['description']}")
        print(f"  Mean:   {result['mean_ns']/1000:.2f}us")
        print(f"  Median: {result['median_ns']/1000:.2f}us")
        print(f"  P95:    {result['p95_ns']/1000:.2f}us")
        print(f"  P99:    {result['p99_ns']/1000:.2f}us")
        print()

# Usage example
text = "The quick brown fox jumps over the lazy dog" * 100

benchmarks = [
    RegexBenchmark(r'\bfox\b', 'Word boundary match'),
    RegexBenchmark(r'fox', 'Simple match'),
    RegexBenchmark(r'(?<=\s)fox(?=\s)', 'Lookaround match'),
    RegexBenchmark(r'.*fox.*', '.* match'),
    RegexBenchmark(r'[^ ]*fox[^ ]*', 'Negated character class match'),
]

print("=== Benchmark Results ===\n")
for bench in benchmarks:
    result = bench.run(text)
    bench.print_result(result)
```

### 7.2 Scalability Testing

```python
import re
import time

def scalability_test(pattern_str: str, char: str = 'a',
                     lengths: list[int] = None):
    """Test scalability against input length"""
    if lengths is None:
        lengths = [10, 50, 100, 500, 1000, 5000, 10000]

    pattern = re.compile(pattern_str)
    print(f"Pattern: {pattern_str}")
    print(f"{'Length':>10s} {'Time(us)':>12s} {'Ratio':>8s}")
    print("-" * 35)

    prev_time = None
    for n in lengths:
        text = char * n
        start = time.perf_counter()
        pattern.search(text)
        elapsed = (time.perf_counter() - start) * 1_000_000  # us

        ratio = f"{elapsed / prev_time:.1f}x" if prev_time else "-"
        prev_time = elapsed

        print(f"{n:>10d} {elapsed:>12.2f} {ratio:>8s}")

        # Safety: abort if over 1 second
        if elapsed > 1_000_000:
            print("  [Aborted: exceeded 1 second]")
            break

# Test
print("=== Safe Pattern ===")
scalability_test(r'[a-z]+$')
print()

print("=== Linear Pattern (negated character class) ===")
scalability_test(r'[^b]*b')
print()

# Warning: the following can be extremely slow with long inputs
# print("=== Dangerous Pattern ===")
# scalability_test(r'(a+)+b', lengths=[10, 15, 20, 25])
```

---

## 8. Security Measures by Language

### 8.1 Python

```python
import re

# ReDoS countermeasures in Python

# Countermeasure 1: regex module's timeout parameter
import regex
try:
    result = regex.search(r'(a+)+b', 'a' * 30 + 'c', timeout=1)
except TimeoutError:
    print("Timeout")

# Countermeasure 2: google-re2 package
# pip install google-re2
# import re2
# result = re2.search(r'(a+)+b', 'a' * 30 + 'c')
# RE2 automatically converts to a safe pattern

# Countermeasure 3: Static analysis of patterns
def audit_pattern(pattern_str: str) -> list[str]:
    """Audit pattern safety"""
    warnings = []

    # Nested quantifiers
    if re.search(r'\([^)]*[+*][^)]*\)[+*]', pattern_str):
        warnings.append("Nested quantifiers")

    # Unanchored .*
    if '.*' in pattern_str and not pattern_str.startswith('^'):
        warnings.append("Unanchored .*")

    # Huge repetition
    large_repeat = re.search(r'\{(\d+)\}', pattern_str)
    if large_repeat and int(large_repeat.group(1)) > 1000:
        warnings.append(f"Large repetition count: {large_repeat.group(1)}")

    return warnings

# Test
patterns = [
    r'(a+)+b',
    r'^[a-z]+$',
    r'.*error.*',
    r'a{10000}',
]

for p in patterns:
    warnings = audit_pattern(p)
    status = "WARN" if warnings else "OK"
    print(f"  [{status}] {p}: {warnings or 'clean'}")
```

### 8.2 JavaScript / Node.js

```javascript
// ReDoS countermeasures in JavaScript / Node.js

// Countermeasure 1: Use the re2 package
// const RE2 = require('re2');
// const safe = new RE2('(a+)+b');

// Countermeasure 2: Static analysis with safe-regex
// const safe = require('safe-regex');
// if (!safe(userPattern)) {
//     throw new Error('Unsafe regex pattern');
// }

// Countermeasure 3: Sandboxed execution using the vm module
// const vm = require('vm');
// const script = new vm.Script(`
//     const result = /${pattern}/.test(input);
// `);
// const context = vm.createContext({ input, pattern });
// script.runInContext(context, { timeout: 1000 });

// Countermeasure 4: Node.js v20+ RegExp timeout (experimental)
// Using --experimental-regexp-engine may enable
// an RE2-style safe engine

// Best practices:
// 1. Always escape user input
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// 2. Limit pattern complexity
function isPatternSafe(pattern) {
    // Detect nested quantifiers
    if (/\(.+[+*]\).+[+*]/.test(pattern)) return false;
    // Limit pattern length
    if (pattern.length > 200) return false;
    return true;
}

// 3. Limit input length
function safeMatch(pattern, text, maxLength) {
    maxLength = maxLength || 10000;
    if (text.length > maxLength) {
        throw new Error('Input too long');
    }
    return new RegExp(pattern).test(text);
}
```

### 8.3 Java

```java
import java.util.regex.*;
import java.util.concurrent.*;

public class SafeRegex {

    // Countermeasure 1: Regex match with timeout
    public static boolean safeMatch(String pattern, String text,
                                     long timeoutMs)
            throws TimeoutException {
        ExecutorService executor = Executors.newSingleThreadExecutor();
        Future<Boolean> future = executor.submit(() -> {
            Pattern p = Pattern.compile(pattern);
            return p.matcher(text).matches();
        });

        try {
            return future.get(timeoutMs, TimeUnit.MILLISECONDS);
        } catch (TimeoutException e) {
            future.cancel(true);
            throw e;
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            executor.shutdownNow();
        }
    }

    // Countermeasure 2: Use possessive quantifiers
    public static void possessiveExample() {
        // Normal: backtracking enabled
        Pattern greedy = Pattern.compile("(a+)+b");

        // Possessive: backtracking disabled
        Pattern possessive = Pattern.compile("(a++)+b");

        // Atomic group
        Pattern atomic = Pattern.compile("(?>a+)+b");
    }

    // Countermeasure 3: Pre-validate patterns
    public static boolean isPatternSafe(String pattern) {
        // Detect nested quantifiers
        if (pattern.matches(".*\\(.+[+*]\\).+[+*].*")) {
            return false;
        }
        // Limit pattern length
        if (pattern.length() > 200) {
            return false;
        }
        return true;
    }
}
```

### 8.4 Go (RE2)

```go
package main

import (
    "fmt"
    "regexp"
    "time"
)

func main() {
    // Go's regexp package is RE2-based
    // -> Inherently safe against ReDoS

    pattern := regexp.MustCompile(`(a+)+b`)
    input := string(make([]byte, 30)) + "c"
    for i := range input[:30] {
        input = input[:i] + "a" + input[i+1:]
    }

    start := time.Now()
    pattern.MatchString("a]" + input)
    elapsed := time.Since(start)
    fmt.Printf("RE2: %v\n", elapsed)
    // => Always fast (O(n))

    // However, RE2 has limitations:
    // - No backreferences (\1)
    // - No lookaround (?=) (?<=)
    // - No possessive quantifiers (a++) (unnecessary)
    // - No atomic groups (?>...) (unnecessary)

    // If you need features with these limitations:
    // Use the github.com/dlclark/regexp2 package
    // Note: this reintroduces ReDoS risk
}
```

### 8.5 Rust

```rust
use regex::Regex;
use std::time::Instant;

fn main() {
    // Rust's regex crate is DFA-based, similar to RE2
    // -> Inherently safe against ReDoS

    let re = Regex::new(r"(a+)+b").unwrap();
    // Note: Rust regex automatically converts to a safe pattern

    let input = "a".repeat(100) + "c";
    let start = Instant::now();
    re.is_match(&input);
    let elapsed = start.elapsed();
    println!("Rust regex: {:?}", elapsed);
    // => Always fast (O(n))

    // If you need lookaround:
    // Use the fancy-regex crate
    // use fancy_regex::Regex;
    // Note: this reintroduces ReDoS risk

    // Limitations of the regex crate:
    // - No backreferences
    // - No lookaround
    // - Compile time limits
    //   (overly complex patterns produce compilation errors)
}
```

---

## 9. ASCII Diagrams

### 9.1 Visualizing Backtracking Explosion

```
Pattern: (a+)+b
Input:   "aaac" (4 characters)

Tree of all attempts:

(aaaa) -> b? -> c != b -> fail
|
+-- (aaa)(a) -> b? -> c != b -> fail
|
+-- (aa)(aa) -> b? -> c != b -> fail
|   +-- (aa)(a)(a) -> b? -> c != b -> fail
|
+-- (a)(aaa) -> b? -> c != b -> fail
|   +-- (a)(aa)(a) -> b? -> c != b -> fail
|   +-- (a)(a)(aa) -> b? -> c != b -> fail
|       +-- (a)(a)(a)(a) -> b? -> c != b -> fail
|
Total: 8 attempts (input length n=4)
n=10 -> 512 attempts
n=20 -> 524,288 attempts
n=30 -> 536,870,912 attempts (over 500 million!)
```

### 9.2 NFA vs DFA Behavior Comparison

```
Pattern: a+b
Input: "aaac"

=== NFA Engine (Python re, JavaScript) ===

State transitions + backtracking:

  Position 0:
    a+ -> 'a','a','a' (greedy match)
    b -> 'c' != 'b' -> backtrack
    a+ -> 'a','a'
    b -> 'a' != 'b' -> backtrack
    a+ -> 'a'
    b -> 'a' != 'b' -> fail

  Position 1: similar attempts...
  Position 2: similar attempts...
  Position 3: a+ cannot match -> fail

  Total steps: O(n^2) (in this case)

=== DFA Engine (RE2, Rust regex) ===

State transition table:

  Current State  Input  Next State
  -------------  -----  ----------
  Start          'a'    State1 (a+)
  State1         'a'    State1 (a+ repeat)
  State1         'b'    Accept (match success)
  State1         other  Fail

  Position 0: Start -> 'a' -> State1
  Position 1:         'a' -> State1
  Position 2:         'a' -> State1
  Position 3:         'c' -> Fail

  Total steps: O(n) (always linear)
```

### 9.3 Vulnerable Patterns vs Safe Alternatives

```
Vulnerable Pattern      Safe Alternative         Reason
------------------      ----------------         ------
(a+)+                   a+                       Nesting unnecessary
(a|a)+                  a+                       Overlap removed
(.*a){n}                Max length check         Eliminate nested quantifiers
".*"                    "[^"]*"                  Explicitly constrain range
(\w+\s*)+               [\w\s]+                  Flattened
(.+)+                   .+                       Nesting unnecessary
(a+|b+)+                [ab]+                    Flattened
\d+\d+                  \d{2,}                   Overlap removed
(\w+\.)+                [\w.]+                   Flattened
(.*\n)*                 [^]*                     Flattened (language-dependent)
```

### 9.4 Performance Improvement Flowchart

```
Regex is slow?
    |
    +-- Analyze the pattern
    |   |
    |   +-- Nested quantifiers?
    |   |   +-- YES -> Flatten or make atomic
    |   |
    |   +-- Overlapping alternatives?
    |   |   +-- YES -> Merge into character class
    |   |
    |   +-- Uses .*?
    |   |   +-- YES -> Replace with [^X]*
    |   |
    |   +-- No anchor?
    |   |   +-- YES -> Add ^, \b, etc.
    |   |
    |   +-- Unnecessary captures?
    |       +-- YES -> Change to (?:...)
    |
    +-- Is it compiled?
    |   +-- NO -> Use re.compile()
    |
    +-- Is the input untrusted?
    |   +-- YES -> Consider RE2/DFA engine
    |   +-- YES -> Set a timeout
    |   +-- YES -> Limit input length
    |
    +-- Processing large data?
    |   +-- YES -> Add pre-filter
    |   +-- YES -> Consider batch processing
    |   +-- YES -> Consider parallel processing
    |
    +-- Still slow?
        +-- Consider alternatives to regex
            (string operations, parsers, dedicated libraries, etc.)
```

---

## 10. Comparison Tables

### 10.1 Performance Characteristics by Engine

| Engine | Worst-Case Complexity | ReDoS Resistance | Features | Language |
|--------|----------------------|-----------------|----------|----------|
| Python re | O(2^n) | None | Rich | Python |
| Python regex | O(2^n) | timeout available | Richest | Python |
| JavaScript V8 | O(2^n) | backtracks-limit | Rich | JavaScript |
| Java Pattern | O(2^n) | None | Rich (possessive quantifiers) | Java |
| RE2 | O(n) | Yes | Limited | Go, C++ |
| Rust regex | O(n) | Yes | Limited | Rust |
| PCRE2 JIT | O(2^n) | match_limit | Richest | C |
| .NET | O(2^n) | MatchTimeout | Rich | C# |
| Oniguruma | O(2^n) | None | Rich | Ruby |

### 10.2 Optimization Technique Effectiveness Comparison

| Technique | Impact | Use Case | Implementation Cost |
|-----------|--------|----------|-------------------|
| re.compile() | Low-Medium | Repeated use | Low |
| Adding anchors | Medium | When position is known | Low |
| Negated character class | Medium-High | Tag extraction, etc. | Low |
| Possessive quantifier | High | Preventing backtracking | Medium |
| Atomic group | High | Preventing backtracking | Medium |
| DFA engine (RE2) | Highest | Untrusted input | High (library change) |
| String pre-check | Medium | Low occurrence frequency | Low |
| Pattern splitting | Medium | Complex patterns | Medium |
| Input length limit | High | All cases | Low |
| Timeout setting | High | External input processing | Medium |

### 10.3 Security Countermeasure Priority

| Countermeasure | Priority | Impact | Cost |
|---------------|----------|--------|------|
| Input length limit | Highest | High | Low |
| Pattern static analysis | High | Medium | Low |
| Timeout setting | High | High | Medium |
| DFA engine usage | Medium-High | Highest | High |
| User input escaping | Highest | High | Low |
| Pattern simplification | Medium | Medium | Medium |
| Code review auditing | Medium | Medium | Medium |
| CI/CD automated checks | High | High | Medium |

---

## 11. Vulnerability Detection Tools

### 11.1 Static Analysis Tools

```bash
# recheck: detect regex vulnerabilities
# npm install -g recheck
# recheck "(a+)+b"

# redos-checker (Python)
# pip install redos-checker

# safe-regex (JavaScript)
# npm install safe-regex

# semgrep: static analysis for entire codebase
# semgrep --config "p/regex-dos" .
```

```javascript
// safe-regex usage example
// const safe = require('safe-regex');
// console.log(safe('(a+)+b'));      // => false (vulnerable)
// console.log(safe('[a-z]+'));       // => true  (safe)
// console.log(safe('(a|b|c)+'));     // => true  (safe)
```

### 11.2 Simple Checker in Python

```python
import re

def is_potentially_vulnerable(pattern: str) -> tuple[bool, list[str]]:
    """Simple vulnerability check for regex patterns"""
    warnings = []

    # Detect nested quantifiers
    if re.search(r'\([^)]*[+*][^)]*\)[+*]', pattern):
        warnings.append("Nested quantifiers detected")

    # Detect unrestricted .* usage
    if re.search(r'\.\*(?!\?)', pattern) and '^' not in pattern:
        warnings.append("Unanchored .* detected")

    # Detect overlapping alternation (simple check)
    if re.search(r'\((?:[^)]*\|[^)]*)\)[+*]', pattern):
        warnings.append("Repeated alternation detected")

    # Detect huge repetition count
    large_repeat = re.search(r'\{(\d+)', pattern)
    if large_repeat and int(large_repeat.group(1)) > 1000:
        warnings.append(f"Large repetition count: {large_repeat.group(1)}")

    # Detect backreference usage
    if re.search(r'\\[1-9]', pattern):
        warnings.append("Backreference used (be aware of performance impact)")

    return (len(warnings) > 0, warnings)

# Test
patterns = [
    r'(a+)+b',
    r'(\w|\d)+',
    r'[a-z]+',
    r'.*error.*',
    r'^[a-z]+$',
    r'(\w+\.)+\w+',
    r'(.)\1{100}',
    r'a{10000}',
]

for p in patterns:
    vulnerable, msgs = is_potentially_vulnerable(p)
    status = "VULNERABLE" if vulnerable else "SAFE"
    print(f"  {status}: {p}")
    for msg in msgs:
        print(f"    - {msg}")
```

### 11.3 Integration into CI/CD Pipelines

```python
#!/usr/bin/env python3
"""
regex_audit.py -- Script for auditing regular expressions in CI/CD pipelines

Usage:
    python regex_audit.py path/to/source/

Return codes:
    0: No issues
    1: Warnings found
    2: Dangerous patterns found
"""

import re
import sys
import os

def find_regex_patterns(filepath: str) -> list[tuple[int, str]]:
    """Extract regex patterns from source code"""
    patterns = []

    # Python: re.compile(), re.search(), re.match(), etc.
    regex_call = re.compile(
        r're\.(?:compile|search|match|findall|sub|split)\s*\(\s*'
        r'(?:r)?"\'["\']'
    )

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            for lineno, line in enumerate(f, 1):
                for m in regex_call.finditer(line):
                    patterns.append((lineno, m.group(1)))
    except (UnicodeDecodeError, PermissionError):
        pass

    return patterns

def audit_pattern(pattern: str) -> list[str]:
    """Audit pattern safety"""
    warnings = []

    # Nested quantifiers
    if re.search(r'\([^)]*[+*][^)]*\)[+*]', pattern):
        warnings.append("CRITICAL: Nested quantifiers")

    # Unanchored .*
    if '.*' in pattern and not pattern.startswith('^'):
        warnings.append("WARNING: Unanchored .*")

    # Huge repetition
    repeat = re.search(r'\{(\d+)', pattern)
    if repeat and int(repeat.group(1)) > 100:
        warnings.append(f"WARNING: Large repetition count: {repeat.group(1)}")

    return warnings

def main():
    if len(sys.argv) < 2:
        print("Usage: python regex_audit.py <path>")
        sys.exit(1)

    path = sys.argv[1]
    exit_code = 0

    for root, dirs, files in os.walk(path):
        for filename in files:
            if filename.endswith('.py'):
                filepath = os.path.join(root, filename)
                patterns = find_regex_patterns(filepath)
                for lineno, pattern in patterns:
                    warnings = audit_pattern(pattern)
                    for w in warnings:
                        print(f"{filepath}:{lineno}: {w}: {pattern}")
                        if 'CRITICAL' in w:
                            exit_code = max(exit_code, 2)
                        elif 'WARNING' in w:
                            exit_code = max(exit_code, 1)

    if exit_code == 0:
        print("All regex patterns passed audit.")
    sys.exit(exit_code)

if __name__ == '__main__':
    main()
```

---

## 12. Best Practices in Practice

### 12.1 Regex Review Checklist

```
Regex Code Review Checklist:

[ ] Is the purpose and intent of the pattern documented in comments?
[ ] Are test cases sufficient? (normal cases, edge cases, boundary values)
[ ] Are there no nested quantifiers?
[ ] Are there no overlapping alternatives?
[ ] Is .* usage appropriate? (consider anchors or negated character classes)
[ ] Is user input not included in the pattern?
[ ] Is input length limited?
[ ] Is a timeout set? (for external input)
[ ] Is the pattern pre-compiled with re.compile()?
[ ] Are there no unnecessary capture groups?
[ ] Is the pattern not overly complex? (consider splitting)
[ ] Can the regex be replaced with non-regex alternatives?
```

### 12.2 Documenting Regular Expressions

```python
import re

# Example of good documentation
EMAIL_PATTERN = re.compile(
    r'''
    ^                       # Start of string
    [a-zA-Z0-9._%+-]+      # Local part: alphanumeric and special chars
    @                       # @ symbol
    [a-zA-Z0-9.-]+          # Domain: alphanumeric, dots, hyphens
    \.                      # Dot separator
    [a-zA-Z]{2,}            # TLD: 2+ alphabetic characters
    $                       # End of string
    ''',
    re.VERBOSE              # Allow whitespace and comments
)

# When not using the VERBOSE flag, supplement with comments
# Simplified version of RFC 5322. Does not support internationalized domains.
# ReDoS safety: OK (no nested quantifiers, uses negated character classes)
# Maximum input length: should be limited to 254 characters
```

---

## 13. Anti-patterns

### 13.1 Anti-pattern: Using User Input Directly as Regex

```python
import re

# BAD: Using user input directly as a regex
def search_bad(user_input: str, text: str):
    return re.search(user_input, text)  # ReDoS attack possible!

# GOOD: Escape user input
def search_safe(user_input: str, text: str):
    escaped = re.escape(user_input)  # Escape all metacharacters
    return re.search(escaped, text)
```

### 13.2 Anti-pattern: Processing Large Data Without Optimization

```python
import re

# BAD: Processing large logs inefficiently
def process_logs_bad(log_lines: list[str]):
    results = []
    for line in log_lines:
        # Running a complex regex on every line
        m = re.search(r'(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})\s+\[(\w+)\]\s+(.*)', line)
        if m:
            results.append(m.groups())
    return results

# GOOD: Pre-compile + pre-filter
def process_logs_good(log_lines: list[str]):
    pattern = re.compile(
        r'(\d{4}-\d{2}-\d{2})\s+(\d{2}:\d{2}:\d{2})\s+\[(\w+)\]\s+(.*)'
    )
    results = []
    for line in log_lines:
        if '[' in line:  # Pre-filter: only process lines containing [
            m = pattern.search(line)
            if m:
                results.append(m.groups())
    return results
```

### 13.3 Anti-pattern: Overusing Regular Expressions

```python
import re

# BAD: Using regex for simple operations
def check_email_bad(email):
    return bool(re.match(r'.+@.+', email))

# GOOD: String operations are sufficient
def check_email_good(email):
    return '@' in email and '.' in email.split('@')[1]

# BAD: Using regex for fixed-string replacement
text = "Hello World"
result_bad = re.sub(r'World', 'Python', text)

# GOOD: Use str.replace()
result_good = text.replace('World', 'Python')

# BAD: Using regex for fixed-string splitting
data = "a,b,c,d"
parts_bad = re.split(r',', data)

# GOOD: Use str.split()
parts_good = data.split(',')
```

---

## 14. FAQ

### Q1: How can I determine if my pattern is vulnerable to ReDoS?

**A**: Follow these 3 steps:

1. **Visual inspection**: Check for nested quantifiers `(X+)+` or overlapping alternation `(a|a)+`
2. **Use static analysis tools**: `safe-regex`, `recheck`, etc.
3. **Stress test**: Measure speed with long non-matching inputs

```python
import re, time

def stress_test(pattern_str, char='a', max_len=30):
    pattern = re.compile(pattern_str)
    for n in range(10, max_len + 1, 5):
        text = char * n + '!'
        start = time.time()
        pattern.search(text)
        elapsed = time.time() - start
        print(f"  n={n}: {elapsed:.4f}s")
        if elapsed > 1.0:
            print("  -> Vulnerability detected!")
            break
```

### Q2: Does using RE2 solve all problems?

**A**: **No**. RE2 guarantees O(n) but cannot use backreferences or lookaround. Choose with an understanding of the tradeoffs:

- Untrusted input -> Strongly recommend RE2
- Backreferences needed -> NFA + timeout + pattern auditing
- Internal processing only -> NFA is usually fine

### Q3: Does Python's `re` module have a timeout feature?

**A**: The standard `re` module does **not** have one. Countermeasures:

1. External timeout with `signal.alarm()` (Unix-like systems only)
2. `timeout` parameter in the `regex` module (v2021.4.4+)
3. Run in a separate process and timeout with `multiprocessing`
4. Use RE2 bindings (`google-re2` package)

```python
# regex module timeout
import regex
try:
    result = regex.search(r'(a+)+b', 'a' * 30 + 'c', timeout=1)
except TimeoutError:
    print("Timeout")
```

### Q4: When can you avoid using regex altogether?

**A**: The following cases have more efficient alternatives:

```python
# Fixed-string search -> in operator
if 'error' in log_line:  # Faster than re.search(r'error', log_line)

# Prefix/suffix matching -> startswith() / endswith()
if filename.endswith('.py'):  # Faster than re.match(r'.*\.py$', filename)

# Simple splitting -> str.split()
fields = line.split(',')  # Faster than re.split(r',', line)

# Simple replacement -> str.replace()
result = text.replace('old', 'new')  # Faster than re.sub(r'old', 'new', text)

# Parsing structured data -> dedicated parsers
import json  # Use json module for JSON
import csv   # Use csv module for CSV
# HTML -> Beautiful Soup / lxml
# XML -> ElementTree
# URL -> urllib.parse
```

### Q5: Should I use a lazy quantifier or a negated character class?

**A**: Always prefer the negated character class when applicable:

```python
# Lazy quantifier: .*? (backtracking occurs)
# Negated character class: [^X]* (no backtracking)

# Example: Extracting HTML tag attribute values
# Slow: <div class=".*?">
# Fast: <div class="[^"]*">

# Example: Extracting quoted strings
# Slow: ".*?"
# Fast: "[^"]*"

# Example: Extracting comments
# Slow: /\*.*?\*/  (requires DOTALL)
# Fast: /\*[^*]*\*+(?:[^/*][^*]*\*+)*/
# ^ When it becomes complex, consider the readability tradeoff
```

### Q6: What is the difference between atomic groups and possessive quantifiers?

**A**: They provide the same functionality with different syntax. Both prohibit backtracking:

```
Atomic group:          (?>pattern)
Possessive quantifier: pattern++, pattern*+, pattern?+

(?>a+)  is equivalent to  a++
(?>a*)  is equivalent to  a*+
(?>a?)  is equivalent to  a?+

However, atomic groups are more versatile:
(?>abc|ab) -- applies atomic behavior to the entire alternation
^ This cannot be expressed with possessive quantifiers

Support status:
  Possessive quantifier: Java, PCRE, Python regex
  Atomic group: Java, PCRE, Python regex, Perl, .NET
  Neither supported: Python re, JavaScript, Go, Rust
```

---


## FAQ

### Q1: What is the most important point to keep in mind when studying this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory, but by actually writing code and verifying its behavior.

### Q2: What are common mistakes that beginners make?

Skipping the fundamentals and jumping to advanced topics. We recommend thoroughly understanding the basic concepts explained in this guide before moving on to the next steps.

### Q3: How is this knowledge applied in real-world work?

The knowledge from this topic is frequently used in day-to-day development work. It becomes particularly important during code reviews and architecture design.

---

## Summary

| Item | Description |
|------|-------------|
| ReDoS | Denial-of-service attack via regular expressions |
| Cause | Backtracking explosion (exponential time complexity) |
| Vulnerable patterns | `(a+)+`, `(a\|a)+`, unrestricted `.*` |
| NFA | Backtracking-based, potentially O(2^n) |
| DFA | Linear time guarantee O(n), limited features |
| Defense 1 | Constrain range with negated character class `[^X]*` |
| Defense 2 | Eliminate nested quantifiers |
| Defense 3 | Use a DFA engine (RE2, etc.) |
| Defense 4 | Set timeout mechanisms |
| Defense 5 | Limit input length |
| Optimization | `re.compile()`, anchors, pre-filters |
| Possessive quantifier | `a++` -- prohibits backtracking |
| Atomic group | `(?>...)` -- prohibits backtracking |
| Golden rule | Use DFA for untrusted input; audit patterns with static analysis |

## Recommended Next Reads

- [../02-practical/00-language-specific.md](../02-practical/00-language-specific.md) -- Language-specific regex (engine differences)
- [../02-practical/03-regex-alternatives.md](../02-practical/03-regex-alternatives.md) -- Alternatives to regular expressions

## References

1. **Russ Cox** "Regular Expression Matching Can Be Simple And Fast" https://swtch.com/~rsc/regexp/regexp1.html, 2007 -- Theoretical background of ReDoS and the design philosophy of RE2
2. **OWASP** "Regular expression Denial of Service - ReDoS" https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS -- ReDoS explained from a security perspective
3. **James Davis et al.** "The Impact of Regular Expression Denial of Service (ReDoS) in Practice" FSE 2018 -- Academic study of ReDoS impact in the real world
4. **Google RE2** https://github.com/google/re2 -- Linear-time-guaranteed regex engine
5. **recheck** https://makenowjust-labs.github.io/recheck/ -- ReDoS vulnerability detection tool for regular expressions
6. **Cloudflare Outage Post-mortem** https://blog.cloudflare.com/details-of-the-cloudflare-outage-on-july-2-2019/ -- Real-world ReDoS incident case study
7. **PCRE2 Documentation** https://www.pcre.org/current/doc/html/ -- PCRE2 backtracking limits and optimizations
8. **Rust regex crate** https://docs.rs/regex/ -- Rust's O(n)-guaranteed regex engine



===== SOURCE: 02-programming/regex-and-text-processing/docs/02-practical/00-language-specific.md =====

# Language-Specific Regular Expressions -- Differences Across JS/Python/Go/Rust/Java

> Even with the same regular expression, the syntax, flags, Unicode handling, and performance characteristics vary across languages and engines. This guide systematically compares the design philosophies and practical differences of each language's regex API.

## What You Will Learn

1. **Differences across the regex APIs of 5 languages** -- Variations in syntax, flags, return values, and matching models
2. **Understanding engine characteristics and constraints** -- Differences between NFA/DFA, backreference support, and Unicode handling
3. **Points to watch out for when porting between languages** -- Cases where the same pattern produces different results


## Prerequisites

You will get more out of this guide if you are familiar with the following:

- Basic programming knowledge
- Understanding of related fundamental concepts

---

## 1. Per-Language Overview

### 1.1 Engine Mapping

```
┌──────────┬──────────────┬──────────────────────────┐
│ Language  │ Engine        │ Characteristics           │
├──────────┼──────────────┼──────────────────────────┤
│ Python   │ re (NFA)     │ PCRE-like, Unicode default│
│ JavaScript│ V8 (NFA)    │ ECMA-262 compliant, ES2018│
│ Java     │ Pattern (NFA)│ PCRE-like, possessive quant│
│ Go       │ RE2 (DFA)    │ Linear time guaranteed     │
│ Rust     │ regex (DFA)  │ Linear time guaranteed     │
└──────────┴──────────────┴──────────────────────────┘
```

### 1.2 Engine Design Philosophy in Detail

The design philosophy of each language's adopted engine has wide-ranging effects, from the API design to the available features.

**NFA (Non-deterministic Finite Automaton) Engine**

NFA engines work based on backtracking. They try each branch of the pattern in order, and if a match fails, they return to the previous choice point and try a different branch. This mechanism enables advanced features such as backreferences and lookarounds, but carries the risk of exponential time complexity in worst-case scenarios. Adopted by Python, JavaScript, and Java.

```
NFA backtracking behavior:

Input:   "aaaaab"
Pattern: a*ab

Step 1: a* greedily matches "aaaaa" → "b" and "ab" don't match
Step 2: Backtrack, a* matches "aaaa" → "ab" matches!
→ Match succeeds

Depending on the pattern:
Input:   "aaaaaaaaaaaaaaaaac"
Pattern: (a+)+b
→ Exponential backtracking occurs (ReDoS)
```

**DFA (Deterministic Finite Automaton) Engine**

DFA engines scan the input string only once, deterministically choosing the next state for each character. Since no backtracking occurs, matching always completes in O(n) linear time. However, features that require backtracking, such as backreferences and lookarounds, cannot be implemented. Adopted by Go and Rust.

```
DFA behavior:

Input:   "aaaaab"
Pattern: a*ab

Simulate all states simultaneously:
Position 0 'a': states {S0, S1}
Position 1 'a': states {S0, S1}
Position 2 'a': states {S0, S1}
Position 3 'a': states {S0, S1}
Position 4 'a': states {S0, S1, S2}
Position 5 'b': states {S3 (accept)}
→ Match succeeds (always O(n))
```

---

## 2. Python

### 2.1 Basic API

```python
import re

text = "2026-02-11 Error: Connection failed at 10:30:45"

# search: returns the first match
m = re.search(r'\d{4}-\d{2}-\d{2}', text)
print(m.group())  # => '2026-02-11'

# findall: returns all matches as a list
print(re.findall(r'\d+', text))
# => ['2026', '02', '11', '10', '30', '45']

# finditer: returns an iterator (memory efficient)
for m in re.finditer(r'\d+', text):
    print(f"  {m.group()} at {m.span()}")

# sub: substitution
result = re.sub(r'(\d{4})-(\d{2})-(\d{2})', r'\3/\2/\1', text)
print(result)  # => '11/02/2026 Error: ...'

# split: splitting
print(re.split(r'\s+', "hello  world\tfoo"))
# => ['hello', 'world', 'foo']

# compile: precompile
pattern = re.compile(r'\d+', re.ASCII)
print(pattern.findall(text))
```

### 2.2 Python-Specific Features

```python
import re

# fullmatch: whether the entire string matches the pattern
print(re.fullmatch(r'\d{4}', '2026'))   # => Match
print(re.fullmatch(r'\d{4}', '2026a'))  # => None

# (?P<name>...) named groups (Python-specific syntax)
m = re.search(r'(?P<year>\d{4})-(?P<month>\d{2})', "2026-02-11")
print(m.groupdict())  # => {'year': '2026', 'month': '02'}

# Conditional patterns (?(id)yes|no)
pattern = r'(\()?\d+(?(1)\))'
print(re.search(pattern, "(42)").group())  # => '(42)'
print(re.search(pattern, "42").group())    # => '42'

# Patterns with comments using re.VERBOSE
pattern = re.compile(r'''
    (?P<year>\d{4})   # year
    -(?P<month>\d{2}) # month
    -(?P<day>\d{2})   # day
''', re.VERBOSE)
```

### 2.3 Advanced Patterns and Practical Techniques in Python

```python
import re

# --- Function-based replacement with sub ---
# When you pass a function as the second argument, it's called with the match object
def celsius_to_fahrenheit(match):
    celsius = float(match.group(1))
    fahrenheit = celsius * 9 / 5 + 32
    return f"{fahrenheit:.1f}F"

text = "The temperature ranges from 20C to 35C"
result = re.sub(r'(\d+(?:\.\d+)?)C', celsius_to_fahrenheit, text)
print(result)  # => 'The temperature ranges from 68.0F to 95.0F'

# --- subn: also returns the number of replacements ---
result, count = re.subn(r'\d+', 'X', "abc 123 def 456")
print(f"result: {result}, replacements: {count}")
# => 'result: abc X def X, replacements: 2'

# --- maxsplit in split ---
print(re.split(r'[,;]', "a,b;c,d", maxsplit=2))
# => ['a', 'b', 'c,d']

# --- split includes separators in result when groups are used ---
print(re.split(r'([,;])', "a,b;c"))
# => ['a', ',', 'b', ';', 'c']

# --- re.escape: escape metacharacters ---
user_input = "price is $100 (USD)"
safe_pattern = re.escape(user_input)
print(safe_pattern)
# => 'price\\ is\\ \\$100\\ \\(USD\\)'
# Essential when incorporating user input into a pattern

# --- Combining multiple flags ---
pattern = re.compile(
    r'''
    (?P<protocol>https?)    # protocol
    ://
    (?P<host>[^/\s]+)       # hostname
    (?P<path>/[^\s]*)?      # path (optional)
    ''',
    re.VERBOSE | re.IGNORECASE
)
m = pattern.search("Visit HTTP://Example.COM/path?q=1 now")
if m:
    print(m.groupdict())
    # => {'protocol': 'HTTP', 'host': 'Example.COM', 'path': '/path?q=1'}
```

### 2.4 Python regex Module (Third-Party)

```python
# pip install regex
# A drop-in upgrade for the standard re, with many additional features
import regex

# Variable-length lookbehind
m = regex.search(r'(?<=ab+)', "abbb_test")
print(m.start())  # Not possible with the standard re

# Unicode category properties
print(regex.findall(r'\p{Han}+', "hello 世界 test"))
# => ['世界']

# Fuzzy matching
# {e<=1} allows edit distance of 1 or less
m = regex.search(r'(?:hello){e<=1}', "helo world")
print(m.group())  # => 'helo'

# Atomic group
m = regex.search(r'(?>a+)b', "aab")
print(m.group())  # => 'aab'

# Possessive quantifier
m = regex.search(r'a++b', "aab")
print(m.group())  # => 'aab'

# POSIX character classes
# => ['hello', 'world']

# Recursive patterns (handle nested parentheses)
pattern = regex.compile(r'\((?:[^()]*|(?R))*\)')
text = "outer (inner (deep) end) rest"
print(pattern.findall(text))
# => ['(inner (deep) end)']
```

### 2.5 Python Performance Optimization

```python
import re
import timeit

# --- Effect of precompiling ---
# When repeating the same pattern in a loop, compile is effective
# However, Python also caches internally (up to 512 patterns),
# so the difference is small in simple cases

compiled = re.compile(r'\d{4}-\d{2}-\d{2}')
text = "date: 2026-02-11"

# With compile:    compiled.search(text)
# Without compile: re.search(r'\d{4}-\d{2}-\d{2}', text)
# → compile becomes effective when there are many patterns (over 512) and cache overflows

# --- findall vs finditer ---
# When there are many matches, finditer is more memory-efficient
large_text = "num " * 100000
# findall:  stores all results in a list (high memory)
# finditer: returns an iterator one at a time (low memory)

# --- Use of non-capturing groups ---
# Use (?:...) for groups that don't need to be captured
# findall returns the contents of groups when groups exist
text = "2026-02-11 and 2025-12-25"
print(re.findall(r'(\d{4})-(\d{2})-(\d{2})', text))
# => [('2026', '02', '11'), ('2025', '12', '25')]  ← list of tuples
print(re.findall(r'\d{4}-\d{2}-\d{2}', text))
# => ['2026-02-11', '2025-12-25']  ← list of strings
print(re.findall(r'(?:\d{4})-(?:\d{2})-(?:\d{2})', text))
# => ['2026-02-11', '2025-12-25']  ← list of strings (same)

# --- Choosing greedy vs lazy ---
html = "<b>bold</b> and <i>italic</i>"
print(re.findall(r'<.+>', html))    # => ['<b>bold</b> and <i>italic</i>'] greedy
print(re.findall(r'<.+?>', html))   # => ['<b>', '</b>', '<i>', '</i>'] lazy
print(re.findall(r'<[^>]+>', html)) # => ['<b>', '</b>', '<i>', '</i>'] negated class (fastest)
```

---

## 3. JavaScript

### 3.1 Basic API

```javascript
const text = "2026-02-11 Error: Connection failed at 10:30:45";

// Literal syntax
const pattern = /\d{4}-\d{2}-\d{2}/;
const match = text.match(pattern);
console.log(match[0]);  // => '2026-02-11'

// g flag: all matches
console.log(text.match(/\d+/g));
// => ['2026', '02', '11', '10', '30', '45']

// matchAll (ES2020): returns an iterator
for (const m of text.matchAll(/\d+/g)) {
    console.log(`  ${m[0]} at index ${m.index}`);
}

// replace: substitution
const result = text.replace(
    /(\d{4})-(\d{2})-(\d{2})/,
    '$3/$2/$1'
);
console.log(result);  // => '11/02/2026 Error: ...'

// replaceAll (ES2021): replace all
console.log("aaa".replaceAll(/a/g, "b"));  // => 'bbb'

// Constructor syntax (dynamic patterns)
const dynamic = new RegExp("\\d{4}", "g");
console.log(text.match(dynamic));
```

### 3.2 JavaScript-Specific Features (ES2018+)

```javascript
// Named groups (ES2018)
const m = "2026-02-11".match(
    /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
);
console.log(m.groups);
// => { year: '2026', month: '02', day: '11' }

// Lookbehind (ES2018)
console.log("$100 €200".match(/(?<=\$)\d+/g));
// => ['100']

// s flag: dotAll (ES2018)
console.log("a\nb".match(/a.b/s));
// => ['a\nb']

// d flag: index info (ES2022)
const result2 = /(?<name>\w+)/.exec("hello");
// result.indices[0] => [0, 5]
// result.indices.groups.name => [0, 5]

// v flag: Unicode set operations (ES2024)
// /[\p{L}&&\p{ASCII}]/v  -- ASCII and letter
```

### 3.3 Advanced Patterns and Practical Techniques in JavaScript

```javascript
// --- Function-based replacement with replace ---
const text2 = "Price: $100, Tax: $15, Total: $115";
const formatted = text2.replace(/\$(\d+)/g, (match, amount) => {
    return `$${Number(amount).toLocaleString()}`;
});
console.log(formatted);
// => 'Price: $100, Tax: $15, Total: $115'

// Function-based replacement using named groups
const dates = "Start: 2026-02-11, End: 2026-03-15";
const converted = dates.replace(
    /(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})/g,
    (match, y, m, d, offset, string, groups) => {
        return `${groups.d}/${groups.m}/${groups.y}`;
    }
);
console.log(converted);
// => 'Start: 11/02/2026, End: 15/03/2026'

// --- Sequential matching with exec() ---
const re = /(\w+)=(\w+)/g;
const params = "name=Alice&age=30&city=Tokyo";
let execMatch;
while ((execMatch = re.exec(params)) !== null) {
    console.log(`${execMatch[1]}: ${execMatch[2]}`);
}
// name: Alice
// age: 30
// city: Tokyo

// --- Pitfalls of g flag and lastIndex ---
const reG = /abc/g;
console.log(reG.test("abc def"));  // true
console.log(reG.lastIndex);        // 3
console.log(reG.test("abc def"));  // false! (search starts from lastIndex=3)
reG.lastIndex = 0;                 // reset is required
console.log(reG.test("abc def"));  // true

// --- String.prototype.search() ---
// Returns the index of the match (g flag is ignored)
console.log("hello world".search(/world/));  // => 6
console.log("hello world".search(/xyz/));    // => -1

// --- split limits and caveats ---
console.log("a1b2c3d".split(/(\d)/));
// => ['a', '1', 'b', '2', 'c', '3', 'd']
// With capturing groups, separators are also included in the result

console.log("a,,b,,c".split(/,+/));
// => ['a', 'b', 'c']
```

### 3.4 JavaScript v Flag (ES2024) Details

```javascript
// The v flag is an extended version of the u flag, enabling set operations on character classes

// Difference: \p{L} excluding ASCII → only non-ASCII letters
// /[\p{L}--\p{ASCII}]/v
const nonAsciiLetters = "hello 世界 café".match(/[\p{L}--\p{ASCII}]/gv);
console.log(nonAsciiLetters);
// => ['世', '界', 'é']

// Intersection: both \p{L} and \p{ASCII} → ASCII letters only
// /[\p{L}&&\p{ASCII}]/v
const asciiLetters = "hello 世界 café".match(/[\p{L}&&\p{ASCII}]/gv);
console.log(asciiLetters);
// => ['h', 'e', 'l', 'l', 'o', 'c', 'a', 'f']

// Union (nested character classes)
// /[[\p{Decimal_Number}][\p{L}]]/v
// → matches digits or letters

// Notes when using v flag:
// - The u and v flags cannot be used simultaneously
// - The v flag includes all features of the u flag
// - Special character handling within character classes becomes stricter
```

### 3.5 JavaScript Regex Performance

```javascript
// --- Internal cache of RegExp ---
// The V8 engine caches regexes in literal syntax
// new RegExp() creates a new object each time

// Fast: literal (the same pattern is internally cached)
function matchLiteral(text) {
    return /\d+/g.test(text);
}

// Caution: dynamic patterns cannot be cached
function matchDynamic(text, pattern) {
    return new RegExp(pattern, 'g').test(text);
}

// --- ReDoS countermeasures ---
// V8 has a RegExp timeout mechanism (--regex-timeout in Node.js)
// However, fundamentally it should be prevented through pattern design

// Dangerous patterns:
// /(a+)+b/          → exponential backtracking
// /([a-zA-Z]+)*$/   → exponential backtracking
// /(\w+\s?)+$/      → exponential backtracking

// Rewriting to safe patterns:
// /(a+)+b/  →  /a+b/
// /([a-zA-Z]+)*$/  →  /[a-zA-Z]*$/
// /(\w+\s?)+$/  →  /[\w\s]*$/

// --- Advantages of matchAll ---
// match(g) loses capture group information
const text3 = "2026-02-11 2025-12-25";
console.log(text3.match(/(\d{4})-(\d{2})-(\d{2})/g));
// => ['2026-02-11', '2025-12-25']  ← no group info!

// matchAll preserves group information
for (const m of text3.matchAll(/(\d{4})-(\d{2})-(\d{2})/g)) {
    console.log(`${m[0]} → year: ${m[1]}, month: ${m[2]}, day: ${m[3]}`);
}
// '2026-02-11 → year: 2026, month: 02, day: 11'
// '2025-12-25 → year: 2025, month: 12, day: 25'
```

---

## 4. Go

### 4.1 Basic API

```go
package main

import (
    "fmt"
    "regexp"
)

func main() {
    text := "2026-02-11 Error: Connection failed"

    // Compile: compile the pattern (returns an error)
    re, err := regexp.Compile(`\d{4}-\d{2}-\d{2}`)
    if err != nil {
        panic(err)
    }

    // MustCompile: panicking version (for constant patterns)
    re = regexp.MustCompile(`\d{4}-\d{2}-\d{2}`)

    // FindString: first match
    fmt.Println(re.FindString(text))
    // => "2026-02-11"

    // FindAllString: all matches
    reDigit := regexp.MustCompile(`\d+`)
    fmt.Println(reDigit.FindAllString(text, -1))
    // => [2026 02 11]

    // FindStringSubmatch: with submatches
    re2 := regexp.MustCompile(`(\d{4})-(\d{2})-(\d{2})`)
    matches := re2.FindStringSubmatch(text)
    fmt.Printf("whole: %s, year: %s, month: %s, day: %s\n",
        matches[0], matches[1], matches[2], matches[3])

    // ReplaceAllString: substitution
    result := re2.ReplaceAllString(text, "${3}/${2}/${1}")
    fmt.Println(result)

    // Named groups
    re3 := regexp.MustCompile(`(?P<year>\d{4})-(?P<month>\d{2})`)
    match := re3.FindStringSubmatch(text)
    for i, name := range re3.SubexpNames() {
        if name != "" {
            fmt.Printf("  %s: %s\n", name, match[i])
        }
    }
}
```

### 4.2 Go Constraints

```go
// Features not supported in Go (RE2 engine):
// ✗ Backreferences (\1, \k<name>)
// ✗ Lookahead (?=...), (?!...)
// ✗ Lookbehind (?<=...), (?<!...)
// ✗ Conditional patterns (?(id)yes|no)
// ✗ Possessive quantifiers (*+, ++, ?+)
// ✗ Atomic groups (?>...)
// ✗ Some Unicode properties

// In return, the following is guaranteed:
// ✓ Always O(n) linear time
// ✓ ReDoS is fundamentally impossible
// ✓ Memory usage is predictable
```

### 4.3 Advanced APIs and Practical Techniques in Go

```go
package main

import (
    "fmt"
    "regexp"
    "strings"
)

func main() {
    // --- ReplaceAllStringFunc: replace using a function ---
    re := regexp.MustCompile(`[a-z]+`)
    result := re.ReplaceAllStringFunc("hello WORLD foo BAR", strings.ToUpper)
    fmt.Println(result)
    // => "HELLO WORLD FOO BAR"

    // --- ReplaceAllLiteralString: literal replacement ---
    // No expansion of $1 etc.
    re2 := regexp.MustCompile(`\d+`)
    result2 := re2.ReplaceAllLiteralString("price: 100", "$1")
    fmt.Println(result2)
    // => "price: $1" ($1 is inserted as literal text)

    // --- Split: split ---
    re3 := regexp.MustCompile(`\s*[,;]\s*`)
    parts := re3.Split("a, b; c , d", -1)
    fmt.Println(parts)
    // => [a b c d]

    // The n argument limits the number of splits
    parts2 := re3.Split("a, b; c , d", 2)
    fmt.Println(parts2)
    // => [a b; c , d]

    // --- FindAllStringSubmatchIndex: all matches with position info ---
    re4 := regexp.MustCompile(`(\w+)=(\w+)`)
    text := "name=Alice age=30"
    indices := re4.FindAllStringSubmatchIndex(text, -1)
    for _, idx := range indices {
        // idx[0:2] = start/end of overall match
        // idx[2:4] = start/end of group 1
        // idx[4:6] = start/end of group 2
        key := text[idx[2]:idx[3]]
        val := text[idx[4]:idx[5]]
        fmt.Printf("  %s = %s\n", key, val)
    }

    // --- MatchString: just check whether there is a match ---
    // Faster than Find* (no position calculation needed)
    re5 := regexp.MustCompile(`^\d{4}-\d{2}-\d{2}$`)
    fmt.Println(re5.MatchString("2026-02-11"))  // true
    fmt.Println(re5.MatchString("not a date"))  // false

    // --- []byte version of API ---
    // Process byte sequences directly without string conversion
    reB := regexp.MustCompile(`\d+`)
    data := []byte("hello 123 world 456")
    allBytes := reB.FindAll(data, -1)
    for _, b := range allBytes {
        fmt.Printf("  %s\n", b)
    }

    // --- Expand: template expansion ---
    re6 := regexp.MustCompile(`(?P<first>\w+)\s+(?P<last>\w+)`)
    template := []byte("$last, $first")
    src := []byte("John Smith")
    match := re6.FindSubmatchIndex(src)
    var dst []byte
    dst = re6.Expand(dst, template, src, match)
    fmt.Printf("%s\n", dst)
    // => "Smith, John"
}
```

### 4.4 Alternatives to Lookahead/Lookbehind in Go

```go
package main

import (
    "fmt"
    "regexp"
    "strings"
)

func main() {
    // Since Go does not support lookahead/lookbehind, alternative approaches are required

    // --- Alternative 1: Use capture groups to extract the needed part ---
    // Python: (?<=\$)\d+  (digits after $)
    // Go: use \$(\d+) and refer to group 1
    re := regexp.MustCompile(`\$(\d+)`)
    text := "$100 and $200"
    matches := re.FindAllStringSubmatch(text, -1)
    for _, m := range matches {
        fmt.Println(m[1])  // "100", "200"
    }

    // --- Alternative 2: Process in multiple steps ---
    // Python: (?<=<tag>).*?(?=</tag>)
    // Go: use <tag>(.*?)</tag> and refer to group 1
    re2 := regexp.MustCompile(`<title>(.*?)</title>`)
    html := "<title>My Page</title>"
    if m := re2.FindStringSubmatch(html); m != nil {
        fmt.Println(m[1])  // "My Page"
    }

    // --- Alternative 3: Alternative to negative lookahead ---
    // Python: \b\w+(?!ing)\b  (words not ending in 'ing')
    // Go: filter after matching
    re3 := regexp.MustCompile(`\b\w+\b`)
    text2 := "running jumping hello world coding"
    words := re3.FindAllString(text2, -1)
    for _, w := range words {
        if !strings.HasSuffix(w, "ing") {
            fmt.Printf("  %s\n", w)
        }
    }
    // => hello, world

    // --- Alternative 4: Alternative to backreferences ---
    // Python: <(\w+)>.*?</\1>  (matching open/close tags)
    // Go: process in two passes
    re4 := regexp.MustCompile(`<(\w+)>[^<]*</(\w+)>`)
    html2 := "<div>content</div><span>text</span><div>bad</span>"
    allMatches := re4.FindAllStringSubmatch(html2, -1)
    for _, m := range allMatches {
        if m[1] == m[2] {  // open tag matches close tag
            fmt.Printf("  valid: %s\n", m[0])
        } else {
            fmt.Printf("  invalid: %s\n", m[0])
        }
    }
}
```

### 4.5 Go Performance Optimization

```go
package main

import (
    "regexp"
    "sync"
)

// --- Compile at package level ---
// MustCompile runs only once at program startup
var (
    datePattern  = regexp.MustCompile(`\d{4}-\d{2}-\d{2}`)
    emailPattern = regexp.MustCompile(`[\w.+-]+@[\w-]+\.[\w.]+`)
    urlPattern   = regexp.MustCompile(`https?://[^\s]+`)
)

// --- Reuse Regexp objects with sync.Pool ---
// (usually unnecessary; only when there are many dynamic patterns)
var regexpPool = sync.Pool{
    New: func() interface{} {
        return regexp.MustCompile(`\d+`)
    },
}

func processWithPool(text string) []string {
    re := regexpPool.Get().(*regexp.Regexp)
    defer regexpPool.Put(re)
    return re.FindAllString(text, -1)
}

// --- Regexp is goroutine-safe ---
// The same Regexp object can be safely used from multiple goroutines
// (because it uses internal locks)
func processParallel(texts []string) {
    var wg sync.WaitGroup
    for _, t := range texts {
        wg.Add(1)
        go func(text string) {
            defer wg.Done()
            datePattern.FindString(text)  // safe
        }(t)
    }
    wg.Wait()
}

// --- Avoid lock contention with Copy() ---
// In high-load parallel processing, making a copy with Copy() can be faster
func processHighConcurrency(texts []string) {
    var wg sync.WaitGroup
    for _, t := range texts {
        wg.Add(1)
        go func(text string) {
            defer wg.Done()
            re := datePattern.Copy()  // avoid contention with a copy
            re.FindString(text)
        }(t)
    }
    wg.Wait()
}
```

---

## 5. Rust

### 5.1 Basic API

```rust
use regex::Regex;

fn main() {
    let text = "2026-02-11 Error: Connection failed";

    // Compile
    let re = Regex::new(r"\d{4}-\d{2}-\d{2}").unwrap();

    // find: first match
    if let Some(m) = re.find(text) {
        println!("match: {} (position: {}-{})", m.as_str(), m.start(), m.end());
    }

    // find_iter: iterator over all matches
    let re_digit = Regex::new(r"\d+").unwrap();
    let numbers: Vec<&str> = re_digit.find_iter(text)
        .map(|m| m.as_str())
        .collect();
    println!("{:?}", numbers);
    // => ["2026", "02", "11"]

    // captures: capture groups
    let re2 = Regex::new(r"(?P<year>\d{4})-(?P<month>\d{2})-(?P<day>\d{2})").unwrap();
    if let Some(caps) = re2.captures(text) {
        println!("year: {}, month: {}, day: {}",
            &caps["year"], &caps["month"], &caps["day"]);
    }

    // replace: substitution
    let result = re2.replace(text, "$day/$month/$year");
    println!("{}", result);
}
```

### 5.2 Rust Characteristics

```rust
// Characteristics of Rust regex:
// ✓ DFA-based: O(n) guaranteed
// ✓ ReDoS impossible
// ✓ Zero-cost lazy compilation (lazy_static!, once_cell)
// ✓ Unicode supported by default
// ✗ No backreferences
// ✗ No lookarounds

// When you need lookarounds: fancy-regex
// use fancy_regex::Regex;
// let re = Regex::new(r"(?<=\$)\d+").unwrap();
// → Falls back to NFA (no O(n) guarantee)

// Performance optimization: RegexSet (matching multiple patterns simultaneously)
use regex::RegexSet;

let set = RegexSet::new(&[
    r"ERROR",
    r"WARN",
    r"INFO",
]).unwrap();

let text = "2026-02-11 ERROR: Something failed";
let matches: Vec<_> = set.matches(text).into_iter().collect();
println!("{:?}", matches);  // => [0] (matches ERROR)
```

### 5.3 Advanced APIs and Practical Techniques in Rust

```rust
use regex::Regex;
use std::borrow::Cow;

fn main() {
    // --- replace_all: replace all ---
    let re = Regex::new(r"\d+").unwrap();
    let result = re.replace_all("abc 123 def 456", "NUM");
    println!("{}", result);
    // => "abc NUM def NUM"

    // replace returns Cow<str>
    // If there is no match, returns a reference to the original string (zero-copy)
    let no_match: Cow<str> = re.replace("no numbers here", "NUM");
    match no_match {
        Cow::Borrowed(_) => println!("no copy"),                 // this branch
        Cow::Owned(_) => println!("new string generated"),
    }

    // --- replace_all with closure ---
    let re2 = Regex::new(r"(?P<word>[a-z]+)").unwrap();
    let result2 = re2.replace_all("hello world", |caps: &regex::Captures| {
        caps["word"].to_uppercase()
    });
    println!("{}", result2);
    // => "HELLO WORLD"

    // --- captures_iter: iterator over all captures ---
    let re3 = Regex::new(r"(?P<key>\w+)=(?P<val>\w+)").unwrap();
    let text = "name=Alice age=30 city=Tokyo";
    for caps in re3.captures_iter(text) {
        println!("  {} = {}", &caps["key"], &caps["val"]);
    }

    // --- split: split ---
    let re4 = Regex::new(r"[,;\s]+").unwrap();
    let parts: Vec<&str> = re4.split("a, b; c d").collect();
    println!("{:?}", parts);
    // => ["a", "b", "c", "d"]

    // --- splitn: limit number of splits ---
    let parts2: Vec<&str> = re4.splitn("a, b; c d", 2).collect();
    println!("{:?}", parts2);
    // => ["a", "b; c d"]

    // --- shortest_match: only the end position of the shortest match ---
    // Faster than find (no need to compute the start position)
    let re5 = Regex::new(r"\d+").unwrap();
    if let Some(end) = re5.shortest_match("abc 123") {
        println!("shortest match end position: {}", end);
    }

    // --- is_match: only whether there is a match ---
    // Faster than find (no need to compute position info)
    println!("{}", re5.is_match("abc 123"));  // true
    println!("{}", re5.is_match("no nums"));  // false
}
```

### 5.4 Lazy Compilation and Performance in Rust

```rust
// --- lazy_static! / once_cell / std::sync::LazyLock ---
// Compiling regexes is expensive. It should be done once globally

// Option 1: once_cell (recommended; expected to be included in std)
use once_cell::sync::Lazy;
use regex::Regex;

static DATE_RE: Lazy<Regex> = Lazy::new(|| {
    Regex::new(r"\d{4}-\d{2}-\d{2}").unwrap()
});

// Option 2: std::sync::LazyLock (Rust 1.80+)
// use std::sync::LazyLock;
// static DATE_RE: LazyLock<Regex> = LazyLock::new(|| {
//     Regex::new(r"\d{4}-\d{2}-\d{2}").unwrap()
// });

// Option 3: lazy_static! macro
// use lazy_static::lazy_static;
// lazy_static! {
//     static ref DATE_RE: Regex = Regex::new(r"\d{4}-\d{2}-\d{2}").unwrap();
// }

fn process(text: &str) -> Option<&str> {
    DATE_RE.find(text).map(|m| m.as_str())
}

// --- Practical example of RegexSet: log level classification ---
use regex::RegexSet;

fn classify_log_lines(lines: &[&str]) {
    let set = RegexSet::new(&[
        r"(?i)\berror\b",
        r"(?i)\bwarn(ing)?\b",
        r"(?i)\binfo\b",
        r"(?i)\bdebug\b",
    ]).unwrap();

    let labels = ["ERROR", "WARN", "INFO", "DEBUG"];

    for line in lines {
        let matches: Vec<_> = set.matches(line).into_iter().collect();
        if matches.is_empty() {
            println!("  UNKNOWN: {}", line);
        } else {
            for idx in matches {
                println!("  {}: {}", labels[idx], line);
            }
        }
    }
}

// --- bytes::Regex: directly process byte sequences ---
// When processing non-UTF-8 data (such as binary logs)
use regex::bytes::Regex as BytesRegex;

fn search_binary_log(data: &[u8]) {
    let re = BytesRegex::new(r"ERROR: (.+)").unwrap();
    for caps in re.captures_iter(data) {
        if let Some(msg) = caps.get(1) {
            println!("  error: {:?}", msg.as_bytes());
        }
    }
}

// --- regex-automata: low-level API ---
// Directly manipulate the internal engine of the regex crate
// DFA state tables can be serialized/deserialized
// Useful for embedded systems where you want to reduce compile time
```

### 5.5 Rust fancy-regex Details

```rust
// fancy-regex supports lookarounds and backreferences
// A hybrid engine combining the regex crate's DFA and an NFA
// Parts that can be processed with DFA are O(n); only lookaround parts fall back to NFA

use fancy_regex::Regex;

fn main() {
    // Positive lookahead
    let re = Regex::new(r"\w+(?=\s*=)").unwrap();
    let text = "name = Alice";
    if let Ok(Some(m)) = re.find(text) {
        println!("{}", m.as_str());  // "name"
    }

    // Negative lookahead
    let re2 = Regex::new(r"\b\w+\b(?!\s*=)").unwrap();
    // Matches words not followed by "="

    // Positive lookbehind
    let re3 = Regex::new(r"(?<=\$)\d+").unwrap();
    let text2 = "price: $100";
    if let Ok(Some(m)) = re3.find(text2) {
        println!("{}", m.as_str());  // "100"
    }

    // Backreference
    let re4 = Regex::new(r"<(\w+)>[^<]*</\1>").unwrap();
    let html = "<div>content</div>";
    if let Ok(Some(m)) = re4.find(html) {
        println!("{}", m.as_str());  // "<div>content</div>"
    }

    // Note: fancy_regex::Regex and regex::Regex are different types
    // The APIs are similar but differ in that they return Result
    // Error handling is required:
    // regex:       re.find(text)        → Option<Match>
    // fancy_regex: re.find(text)        → Result<Option<Match>>
}
```

---

## 6. Java

### 6.1 Basic API

```java
import java.util.regex.*;

public class RegexExample {
    public static void main(String[] args) {
        String text = "2026-02-11 Error: Connection failed";

        // Pattern + Matcher
        Pattern pattern = Pattern.compile("(\\d{4})-(\\d{2})-(\\d{2})");
        Matcher matcher = pattern.matcher(text);

        if (matcher.find()) {
            System.out.println("whole: " + matcher.group(0));
            System.out.println("year: " + matcher.group(1));
            System.out.println("month: " + matcher.group(2));
            System.out.println("day: " + matcher.group(3));
        }

        // All matches
        Pattern digits = Pattern.compile("\\d+");
        Matcher dm = digits.matcher(text);
        while (dm.find()) {
            System.out.println("  " + dm.group());
        }

        // Substitution
        String result = pattern.matcher(text)
            .replaceAll("$3/$2/$1");
        System.out.println(result);

        // Named groups
        Pattern named = Pattern.compile(
            "(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})"
        );
        Matcher nm = named.matcher(text);
        if (nm.find()) {
            System.out.println("year: " + nm.group("year"));
        }
    }
}
```

### 6.2 Java-Specific Features

```java
// Possessive Quantifiers
// Forbid backtracking for performance
Pattern.compile("a++b");    // possessively consume a's
Pattern.compile("[^\"]*+"); // possessively consume non-" chars

// Atomic groups (not available in Java → use possessive quantifiers as alternative)
// (?>pattern) was added in Java 20+

// String.matches(): whether the entire string matches
boolean valid = "2026-02-11".matches("\\d{4}-\\d{2}-\\d{2}");

// Pattern.UNICODE_CHARACTER_CLASS (Java 7+)
// Extends \w to Unicode characters
Pattern unicode = Pattern.compile("\\w+",
    Pattern.UNICODE_CHARACTER_CLASS);
```

### 6.3 Advanced APIs and Practical Techniques in Java

```java
import java.util.regex.*;
import java.util.stream.*;

public class AdvancedRegex {
    public static void main(String[] args) {
        // --- Matcher.appendReplacement / appendTail ---
        // Functional replacement (the pre-Java 8 approach)
        Pattern p = Pattern.compile("\\d+");
        Matcher m = p.matcher("abc 123 def 456");
        StringBuffer sb = new StringBuffer();
        while (m.find()) {
            int num = Integer.parseInt(m.group());
            m.appendReplacement(sb, String.valueOf(num * 2));
        }
        m.appendTail(sb);
        System.out.println(sb.toString());
        // => "abc 246 def 912"

        // --- Matcher.replaceAll with Function (Java 9+) ---
        String result = Pattern.compile("\\d+")
            .matcher("abc 123 def 456")
            .replaceAll(mr -> String.valueOf(Integer.parseInt(mr.group()) * 2));
        System.out.println(result);
        // => "abc 246 def 912"

        // --- Pattern.splitAsStream (Java 8+) ---
        Pattern sep = Pattern.compile("[,;\\s]+");
        long count = sep.splitAsStream("a, b; c d e")
            .filter(s -> !s.isEmpty())
            .count();
        System.out.println("element count: " + count);  // => 5

        // --- Pattern.asPredicate (Java 8+) ---
        // Convenient for filtering streams
        Pattern emailP = Pattern.compile("\\w+@\\w+\\.\\w+");
        java.util.List<String> items = java.util.List.of(
            "alice@example.com", "not-email", "bob@test.org"
        );
        items.stream()
            .filter(emailP.asPredicate())
            .forEach(System.out::println);
        // => alice@example.com
        //    bob@test.org

        // --- Pattern.asMatchPredicate (Java 11+) ---
        // Equivalent to matches() (whether the entire string matches)
        Pattern dateP = Pattern.compile("\\d{4}-\\d{2}-\\d{2}");
        System.out.println(dateP.asMatchPredicate().test("2026-02-11"));
        // => true
        System.out.println(dateP.asMatchPredicate().test("date: 2026-02-11"));
        // => false (not a full match)

        // --- region: limit the matching range ---
        String text = "hello world foo bar";
        Matcher rm = Pattern.compile("\\w+").matcher(text);
        rm.region(6, 11);  // only the range of "world"
        if (rm.find()) {
            System.out.println(rm.group());  // => "world"
        }

        // --- lookingAt: partial match from the beginning ---
        // (Equivalent to Python's re.match)
        Matcher lm = Pattern.compile("\\d+").matcher("123abc");
        System.out.println(lm.lookingAt());  // true
        System.out.println(lm.group());       // "123"

        // --- hitEnd / requireEnd ---
        // Useful when implementing parsers
        Matcher he = Pattern.compile("abc").matcher("ab");
        he.find();
        System.out.println(he.hitEnd());
        // => true (reached the end of input = a longer input might match)
    }
}
```

### 6.4 Java Possessive Quantifiers and Atomic Groups in Detail

```java
import java.util.regex.*;

public class PossessiveQuantifiers {
    public static void main(String[] args) {
        // --- Greedy vs Lazy vs Possessive ---
        //
        // Greedy:    .*  → match as much as possible, backtrack if needed
        // Lazy:      .*? → match as little as possible, expand if needed
        // Possessive: .*+ → match as much as possible, no backtracking
        String text = "\"hello\" and \"world\"";

        // Greedy: with backtracking
        System.out.println(
            Pattern.compile("\".*\"").matcher(text).results()
                .map(MatchResult::group).collect(java.util.stream.Collectors.toList())
        );
        // => ["hello" and "world"] (maximum range)

        // Lazy: minimum range
        System.out.println(
            Pattern.compile("\".*?\"").matcher(text).results()
                .map(MatchResult::group).collect(java.util.stream.Collectors.toList())
        );
        // => ["hello", "world"]

        // Possessive: no backtracking
        // ".*+" consumes everything and never gives back → cannot match the final "
        System.out.println(
            Pattern.compile("\".*+\"").matcher(text).find()
        );
        // => false (no match!)

        // Correct usage of possessive quantifiers:
        // Combine with negated character class
        System.out.println(
            Pattern.compile("\"[^\"]*+\"").matcher(text).results()
                .map(MatchResult::group).collect(java.util.stream.Collectors.toList())
        );
        // => ["hello", "world"] (fast and accurate)

        // --- Performance differences ---
        // Pattern vulnerable to ReDoS:
        // Pattern.compile("(a+)+b");  → O(2^n)
        //
        // Defense with possessive quantifiers:
        // Pattern.compile("(a++)+b"); → no backtracking, fails fast

        // --- Atomic groups (Java 20+) ---
        // (?>pattern) forbids backtracking for the entire group
        // Pattern.compile("(?>a+)b");
        // Equivalent to possessive a++, but usable for more complex patterns
        // Pattern.compile("(?>abc|ab)c");
        // → After matching "abc", does not backtrack to try "ab"
    }
}
```

### 6.5 Java Performance Optimization

```java
import java.util.regex.*;

public class RegexPerformance {
    // --- Pattern is thread-safe but Matcher is not ---
    // Pattern is compiled and immutable → can be shared with static final
    // Matcher has internal state → create one per thread
    private static final Pattern DATE_PATTERN =
        Pattern.compile("(\\d{4})-(\\d{2})-(\\d{2})");

    public static String findDate(String text) {
        Matcher m = DATE_PATTERN.matcher(text);  // Matcher created each time
        return m.find() ? m.group() : null;
    }

    // --- Pitfalls of String.matches() ---
    // String.matches() calls Pattern.compile() each time
    public static boolean isDateBad(String text) {
        return text.matches("\\d{4}-\\d{2}-\\d{2}");
        // ↑ compiles every time! Very slow when used in a loop
    }

    // Pre-compiled version
    public static boolean isDateGood(String text) {
        return DATE_PATTERN.matcher(text).matches();
        // ↑ reuses the compiled pattern
    }

    // --- Reuse object via Matcher.reset() ---
    // Effective when processing many strings
    public static void processMany(String[] texts) {
        Pattern p = Pattern.compile("\\d+");
        Matcher m = p.matcher("");  // initialize with empty string
        for (String text : texts) {
            m.reset(text);  // reuse Matcher
            while (m.find()) {
                System.out.println(m.group());
            }
        }
    }
}
```

---

## 7. ASCII Diagrams

### 7.1 Differences in Per-Language Match Models

```
Python re.search()  →  match anywhere in the string
Python re.match()   →  match from the beginning of the string
Python re.fullmatch()→  match the entire string

JavaScript .match()  →  match anywhere (only first match without g)
JavaScript .match(g) →  return all matches as an array
JavaScript .test()   →  boolean

Go FindString()     →  match anywhere in the string
Go MatchString()    →  whether there is a match anywhere (boolean)

Java find()         →  match anywhere in the string
Java matches()      →  match the entire string

Rust find()         →  match anywhere in the string
Rust is_match()     →  boolean

┌──────────┬──────────┬──────────┬──────────┐
│ Behavior  │ Partial   │ Beginning │ Full      │
├──────────┼──────────┼──────────┼──────────┤
│ Python   │ search() │ match()  │fullmatch()│
│ JavaScript│ .match()│ /^.../   │ /^...$/ │
│ Go       │ Find()   │ ―       │ Match()※│
│ Java     │ find()   │ ―       │matches()│
│ Rust     │ find()   │ ―       │ ―       │
└──────────┴──────────┴──────────┴──────────┘
※ Go's Match() is a partial match
```

### 7.2 Comparison of Flag Syntax

```
Different syntax for the same effect:

Case-insensitive:
  Python:     re.IGNORECASE / re.I / (?i)
  JavaScript: /pattern/i
  Go:         (?i)pattern
  Java:       Pattern.CASE_INSENSITIVE / (?i)
  Rust:       (?i)pattern

Multiline:
  Python:     re.MULTILINE / re.M / (?m)
  JavaScript: /pattern/m
  Go:         (?m)pattern
  Java:       Pattern.MULTILINE / (?m)
  Rust:       (?m)pattern

Dot-all:
  Python:     re.DOTALL / re.S / (?s)
  JavaScript: /pattern/s
  Go:         (?s)pattern
  Java:       Pattern.DOTALL / (?s)
  Rust:       (?s)pattern
```

### 7.3 Differences in Escaping

```
Backslash escaping:

Python:
  Regular string: "\\d+"  → \d+
  raw string:     r"\d+"  → \d+  (recommended)

JavaScript:
  Literal:       /\d+/          (no escaping needed)
  Constructor:   "\\d+"          (double escape)

Go:
  Backquotes:    `\d+`           (raw string, recommended)
  Regular string:"\\d+"          (double escape)

Java:
  Regular string:"\\d+"          (double escape, the only option)
  Text block:    \"""
    \d+                          (Java 15+ raw-string-like)
  \"""

Rust:
  raw string:    r"\d+"          (no escaping needed)
  Regular string:"\\d+"          (double escape)
```

### 7.4 API Call Flow Diagram

```
Typical regex processing flow per language:

Python:
  pattern string → re.compile() → Pattern object
                                    ├─ .search(text) → Match | None
                                    ├─ .findall(text) → [str, ...]
                                    ├─ .finditer(text) → Iterator[Match]
                                    ├─ .sub(repl, text) → str
                                    └─ .split(text) → [str, ...]

JavaScript:
  /pattern/flags → RegExp object
                    ├─ .test(str) → boolean
                    ├─ .exec(str) → Array | null
                    │
  str.match(re)  → Array | null (without g) / [str, ...] (with g)
  str.matchAll(re) → Iterator
  str.replace(re, repl) → string
  str.split(re) → [string, ...]

Go:
  pattern string → regexp.Compile() → (*Regexp, error)
                   regexp.MustCompile() → *Regexp
                    ├─ .FindString(s) → string
                    ├─ .FindAllString(s, n) → []string
                    ├─ .FindStringSubmatch(s) → []string
                    ├─ .ReplaceAllString(s, repl) → string
                    ├─ .MatchString(s) → bool
                    └─ .Split(s, n) → []string

Rust:
  pattern string → Regex::new() → Result<Regex>
                    ├─ .find(text) → Option<Match>
                    ├─ .find_iter(text) → Iterator<Match>
                    ├─ .captures(text) → Option<Captures>
                    ├─ .captures_iter(text) → Iterator<Captures>
                    ├─ .replace(text, rep) → Cow<str>
                    ├─ .replace_all(text, rep) → Cow<str>
                    ├─ .is_match(text) → bool
                    └─ .split(text) → Iterator<&str>

Java:
  pattern string → Pattern.compile() → Pattern
                    ├─ .matcher(text) → Matcher
                    │   ├─ .find() → boolean
                    │   ├─ .matches() → boolean
                    │   ├─ .group(n) → String
                    │   ├─ .replaceAll(repl) → String
                    │   └─ .results() → Stream<MatchResult>
                    ├─ .split(text) → String[]
                    ├─ .splitAsStream(text) → Stream<String>
                    └─ .asPredicate() → Predicate<String>
```

---

## 8. Comparison Tables

### 8.1 Feature Support Comparison

| Feature | Python | JavaScript | Go | Rust | Java |
|------|--------|------------|-----|------|------|
| Backreferences `\1` | OK | OK | No | No | OK |
| Named groups | `(?P<>)` | `(?<>)` | `(?P<>)` | `(?P<>)` | `(?<>)` |
| Positive lookahead `(?=)` | OK | OK | No | No | OK |
| Negative lookahead `(?!)` | OK | OK | No | No | OK |
| Positive lookbehind `(?<=)` | Fixed-length | Variable-length | No | No | Fixed-length |
| Possessive quantifiers `*+` | No | No | No | No | OK |
| Atomic groups | No | No | No | No | Java 20+ |
| Unicode `\p{}` | regex module | `/u` | Partial | OK | OK |
| VERBOSE/comments | `re.X` | No | No | `(?x)` | `(?x)` |
| O(n) guarantee | No | No | OK | OK | No |

### 8.2 Performance Characteristics Comparison

| Language | Engine | Worst-Case Complexity | Compilation Type | Concurrency Safety |
|------|---------|----------|-------------|---------|
| Python | re (NFA) | O(2^n) | Bytecode | Thread-safe |
| JavaScript | V8 Irregexp | O(2^n) | JIT | -- |
| Go | RE2 (DFA) | O(n) | DFA table | Goroutine-safe |
| Rust | regex (DFA) | O(n) | DFA + NFA hybrid | Send + Sync |
| Java | Pattern (NFA) | O(2^n) | NFA bytecode | Thread-safe |

### 8.3 Detailed Unicode Support Comparison

| Feature | Python re | Python regex | JavaScript | Go | Rust | Java |
|------|-----------|-------------|------------|-----|------|------|
| `\w` Unicode support | Default | Default | `\p{L}` required | ASCII | Unicode | Flag required |
| `\d` Unicode support | Default | Default | `/u` | ASCII | Unicode | Flag required |
| `\p{Script}` | No | OK | `/u` | Partial | OK | OK |
| `\p{General_Category}` | No | OK | `/u` | Partial | OK | OK |
| Grapheme cluster `\X` | No | OK | No | No | No | No |
| Emoji support | Limited | OK | `/v` | Limited | OK | Java 20+ |

```
Differences in \w behavior under Unicode:

Input: "hello 世界 café"

Python 3 re:         \w+ → ['hello', '世界', 'café']    (Unicode)
Python 3 re(ASCII):  \w+ → ['hello', 'caf']             (ASCII)
JavaScript:          \w+ → ['hello', 'caf']              (ASCII)
JavaScript (/u):     \w+ → ['hello', 'caf']              (still ASCII even with u!)
Go:                  \w+ → ['hello', 'caf']              (ASCII)
Rust:                \w+ → ['hello', '世界', 'café']     (Unicode)
Java:                \w+ → ['hello', 'caf']              (ASCII)
Java (UNICODE):      \w+ → ['hello', '世界', 'café']     (Unicode)
```

### 8.4 Comparison of Compilation Cache Mechanisms

```
┌──────────┬────────────────────┬─────────────────────────────┐
│ Language  │ Cache mechanism     │ Recommendation               │
├──────────┼────────────────────┼─────────────────────────────┤
│ Python   │ Internal cache(512)│ compile() helps beyond 512   │
│ JavaScript│ V8 internal cache  │ Literals auto-cached         │
│ Go       │ None (manual)      │ Hold in package-level vars   │
│ Rust     │ None (manual)      │ Hold via once_cell / LazyLock│
│ Java     │ None (manual)      │ Hold Pattern as static final │
└──────────┴────────────────────┴─────────────────────────────┘

Performance impact (10,000 matches in a loop):

Python re.search(r'\d+', text) × 10000
  Cache hit:        ~15ms
  Cache miss:       ~50ms  (when over 512 patterns)
  Using compile():  ~12ms

JavaScript /\d+/.test(text) × 10000
  Literal:          ~5ms
  new RegExp():     ~20ms  (compiles each time)

Go re.FindString(text) × 10000
  MustCompiled:     ~8ms
  Compile each time: ~200ms  (extremely slow!)

Rust re.find(text) × 10000
  Lazy::new() done: ~3ms
  Regex::new() each time: ~300ms  (extremely slow!)

Java pattern.matcher(text).find() × 10000
  Pattern.compile() done: ~6ms
  String.matches():       ~60ms  (compiles each time)

※ Numbers are approximate. Actual values depend on hardware and pattern complexity
```

---

## 9. Anti-Patterns

### 9.1 Anti-Pattern: Porting Patterns As-Is Between Languages

```python
# Pattern that works in Python
import re
pattern_py = r'(?P<date>\d{4}-\d{2}-\d{2})'
# (?P<name>...) is the syntax for Python/Go/Rust

# When porting to JavaScript:
# NG: (?P<date>...) is a SyntaxError in JavaScript
# OK: must convert to (?<date>...)
```

```javascript
// Pattern that works in JavaScript
const pattern_js = /(?<=\$)\d+/;
// Variable-length lookbehind is JavaScript-specific

// When porting to Python:
// NG: variable-length lookbehind is not supported in Python re
// OK: use the regex module or change the pattern
```

### 9.2 Anti-Pattern: Not Considering the Unicode Behavior of `\w`

```python
# Python 3: \w matches Unicode characters (by default)
import re
print(re.findall(r'\w+', "hello 世界"))
# => ['hello', '世界']
```

```javascript
// JavaScript: \w is ASCII-only (the u flag does not change this)
console.log("hello 世界".match(/\w+/g));
// => ['hello']  -- '世界' does not match!

// To include Unicode characters:
console.log("hello 世界".match(/[\p{L}\p{N}_]+/gu));
// => ['hello', '世界']
```

### 9.3 Anti-Pattern: Implicit Assumption of Greedy Matching

```python
# Common pitfall across all languages: greedy matching by default
import re

html = '<div class="a">text1</div><div class="b">text2</div>'

# NG: greedy match grabs the entire thing
print(re.findall(r'<div.*>.*</div>', html))
# => ['<div class="a">text1</div><div class="b">text2</div>']

# OK: lazy match
print(re.findall(r'<div.*?>.*?</div>', html))
# => ['<div class="a">text1</div>', '<div class="b">text2</div>']

# BETTER: negated character class (fastest)
print(re.findall(r'<div[^>]*>[^<]*</div>', html))
# => ['<div class="a">text1</div>', '<div class="b">text2</div>']
```

### 9.4 Anti-Pattern: Patterns That Cause ReDoS

```
ReDoS (Regular Expression Denial of Service) is an attack that exploits
the backtracking of NFA engines. Go and Rust are unaffected because they use DFA.

Common structures of dangerous patterns:
  1. Nested quantifiers:           (a+)+
  2. Overlapping alternatives:     (a|a)*
  3. Overlapping character classes:(\w|\d)+

Examples and fixes:

Dangerous: /([\w.]+)+@/         ← nested quantifiers
Safe:      /[\w.]+@/            ← nesting removed

Dangerous: /([a-zA-Z]|[0-9])+/  ← overlapping alternatives
Safe:      /[a-zA-Z0-9]+/       ← merged

Dangerous: /^(a+)+$/            ← classic ReDoS pattern
Safe:      /^a+$/               ← nesting removed

Visualizing backtracking:

Pattern: (a+)+b
Input:   "aaaaaac"

Try 1: (aaaaa)(a) → b? mismatch
Try 2: (aaaa)(aa) → b? mismatch
Try 3: (aaaa)(a)(a) → b? mismatch
Try 4: (aaa)(aaa) → b? mismatch
Try 5: (aaa)(aa)(a) → b? mismatch
...
→ Tries 2^n partitions (32 for n=6, 1 billion for n=30)
```

### 9.5 Anti-Pattern: Unnecessary Capture Groups

```python
# Common across all languages: unnecessary captures impact performance
import re

# NG: using a group when no capture is needed
pattern_bad = re.compile(r'(https?)://([\w.-]+)(/[\w./]*)?')

# OK: use non-capturing groups
pattern_good = re.compile(r'(?:https?)://(?:[\w.-]+)(?:/[\w./]*)?')

# Even better: remove the group entirely if it isn't needed
pattern_best = re.compile(r'https?://[\w.-]+(?:/[\w./]*)?')
```

```go
// Particularly important in Go: FindAllString vs FindAllStringSubmatch
// Return type differs depending on the presence of capture groups
re1 := regexp.MustCompile(`\d+`)
re2 := regexp.MustCompile(`(\d+)`)

// re1.FindAllString()       → []string (efficient)
// re2.FindAllStringSubmatch() → [][]string (more memory)
```

---

## 10. FAQ

### Q1: What is the difference between Python's `re.match` and `re.search`?

**A**: `re.match` only attempts to match from the **beginning** of the string. `re.search` attempts to match at **any position** in the string:

```python
import re
text = "say hello"
print(re.match(r'hello', text))    # => None (beginning is 'say')
print(re.search(r'hello', text))   # => Match (matches at position 4)
```

There is no `match` equivalent in other languages (use the `^` anchor as a substitute).

### Q2: Is precompilation necessary in JavaScript?

**A**: Literal syntax `/pattern/` is compiled at parse time, so explicit precompilation is usually unnecessary. However, if you generate dynamically with `new RegExp()`, you should generate it outside the loop:

```javascript
// OK: literals are compiled at parse time
for (const line of lines) {
    line.match(/\d+/g);  // fast
}

// NG: compiles every iteration of the loop
for (const line of lines) {
    const re = new RegExp("\\d+", "g");  // compiles every time
    line.match(re);
}

// OK: compile outside the loop
const re = /\d+/g;
for (const line of lines) {
    re.lastIndex = 0;  // reset is required for the g flag
    line.match(re);
}
```

### Q3: What should I do in Go when backreferences are needed?

**A**: Backreferences cannot be used in Go's standard `regexp` package. Alternatives:

1. **Split into multiple patterns and match in stages**: use the first match's result to build a second pattern
2. **Use string operations**: substitute with functions from the `strings` package
3. **Third-party library**: `github.com/dlclark/regexp2` (PCRE-compatible)

```go
// Example with regexp2:
// import "github.com/dlclark/regexp2"
// re := regexp2.MustCompile(`<(\w+)>.*?</\1>`, 0)
// match, _ := re.FindStringMatch("<div>test</div>")
```

### Q4: What is the best practice for holding a regex globally in Rust?

**A**: Since `Regex::new()` is expensive in Rust, you should reuse a compiled pattern. The current recommendation is `std::sync::LazyLock` (Rust 1.80+) or `once_cell::sync::Lazy`:

```rust
// For Rust 1.80+
use std::sync::LazyLock;
use regex::Regex;

static EMAIL_RE: LazyLock<Regex> = LazyLock::new(|| {
    Regex::new(r"[\w.+-]+@[\w-]+\.[\w.]+").unwrap()
});

// For earlier than 1.80
use once_cell::sync::Lazy;
static EMAIL_RE: Lazy<Regex> = Lazy::new(|| {
    Regex::new(r"[\w.+-]+@[\w-]+\.[\w.]+").unwrap()
});
```

### Q5: Why is Java's `String.matches()` slow?

**A**: `String.matches()` internally calls `Pattern.compile()` every time. Using it in a loop causes the same pattern to be compiled repeatedly, causing significant performance degradation:

```java
// NG: 10,000 compilations occur
for (String line : lines) {
    if (line.matches("\\d{4}-\\d{2}-\\d{2}")) { ... }
}

// OK: compiles only once
Pattern p = Pattern.compile("\\d{4}-\\d{2}-\\d{2}");
for (String line : lines) {
    if (p.matcher(line).matches()) { ... }
}
```

### Q6: What is the common subset for using the same pattern across multiple languages?

**A**: The following syntax can be used in common across all five languages:

```
Common subset across 5 languages:
  ✓ Character classes:       [abc], [a-z], [^abc]
  ✓ Metacharacters:          \d, \D, \s, \S, \w (* Unicode behavior differs)
  ✓ Quantifiers:             *, +, ?, {n}, {n,}, {n,m}
  ✓ Lazy quantifiers:        *?, +?, ??
  ✓ Anchors:                 ^, $, \b
  ✓ Alternation:             a|b
  ✓ Groups:                  (...)
  ✓ Non-capturing:           (?:...)
  ✓ Inline flags:            (?i), (?m), (?s) (* some restrictions)

Syntax requiring caution:
  △ Named groups:    (?P<name>...) for Python/Go/Rust
                     (?<name>...) for JavaScript/Java
  △ \w Unicode:      Python/Rust are Unicode, others ASCII
  × Lookarounds:     not available in Go/Rust
  × Backreferences:  not available in Go/Rust
```

### Q7: How does regex debugging differ across languages?

**A**: Each language has its own features useful for debugging regular expressions:

```python
# Python: re.DEBUG flag
import re
re.compile(r'(\d{4})-(\d{2})', re.DEBUG)
# Displays the parse tree of the pattern:
# SUBPATTERN 1 0 0
#   MAX_REPEAT 4 4
#     IN
#       CATEGORY CATEGORY_DIGIT
# LITERAL 45
# SUBPATTERN 2 0 0
#   MAX_REPEAT 2 2
#     IN
#       CATEGORY CATEGORY_DIGIT
```

```go
// Go: regexp.Compile error messages are detailed
_, err := regexp.Compile(`(?<=abc)`)
// err: "error parsing regexp: invalid or unsupported Perl syntax: `(?<`"

// Use the regexp/syntax package for syntactic analysis
import "regexp/syntax"
prog, err := syntax.Parse(`\d+`, syntax.Perl)
// Get the syntax tree to analyze
```

```java
// Java: Matcher.toMatchResult() saves the match state
Pattern p = Pattern.compile("(\\w+)");
Matcher m = p.matcher("hello world");
while (m.find()) {
    MatchResult mr = m.toMatchResult();
    System.out.printf("group=%s start=%d end=%d%n",
        mr.group(), mr.start(), mr.end());
}
```

### Q8: What are the pitfalls of JavaScript's g flag?

**A**: A RegExp with the `g` flag has internal `lastIndex` state, and consecutive `test()` or `exec()` calls start searching from the previous match position. This can cause unexpected `false` returns:

```javascript
const re = /abc/g;

// 1st call: search from lastIndex=0 → match, lastIndex=3
console.log(re.test("abcabc"));  // true

// 2nd call: search from lastIndex=3 → match, lastIndex=6
console.log(re.test("abcabc"));  // true

// 3rd call: search from lastIndex=6 → no match, lastIndex=0
console.log(re.test("abcabc"));  // false!

// Countermeasure 1: reset lastIndex each time
re.lastIndex = 0;

// Countermeasure 2: don't use the g flag with test()
const reNoG = /abc/;
console.log(reNoG.test("abcabc"));  // always true

// Countermeasure 3: use String.prototype.match()
console.log("abcabc".match(/abc/g));  // ['abc', 'abc']
```

---

## 11. Practical Pattern Collection: Cross-Language Reference

### 11.1 Email Address Validation

```python
# Python
import re
email_re = re.compile(r'^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$')
print(email_re.match("user@example.com"))  # Match
print(email_re.match("invalid@"))          # None
```

```javascript
// JavaScript
const emailRe = /^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/;
console.log(emailRe.test("user@example.com"));  // true
console.log(emailRe.test("invalid@"));           // false
```

```go
// Go
emailRe := regexp.MustCompile(`^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$`)
fmt.Println(emailRe.MatchString("user@example.com"))  // true
fmt.Println(emailRe.MatchString("invalid@"))           // false
```

```rust
// Rust
let email_re = Regex::new(r"^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$").unwrap();
println!("{}", email_re.is_match("user@example.com"));  // true
println!("{}", email_re.is_match("invalid@"));           // false
```

```java
// Java
Pattern emailRe = Pattern.compile("[\\w.+-]+@[\\w-]+(?:\\.[\\w-]+)+");
System.out.println(emailRe.matcher("user@example.com").matches());  // true
System.out.println(emailRe.matcher("invalid@").matches());           // false
```

### 11.2 Extracting IPv4 Addresses

```python
# Python
import re
ipv4_re = re.compile(
    r'\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}'
    r'(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b'
)
text = "Server at 192.168.1.100, gateway 10.0.0.1, invalid 999.999.999.999"
print(ipv4_re.findall(text))
# => ['192.168.1.100', '10.0.0.1']
```

```javascript
// JavaScript
const ipv4Re = /\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b/g;
const text = "Server at 192.168.1.100, gateway 10.0.0.1, invalid 999.999.999.999";
console.log(text.match(ipv4Re));
// => ['192.168.1.100', '10.0.0.1']
```

```go
// Go
ipv4Re := regexp.MustCompile(
    `\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b`,
)
text := "Server at 192.168.1.100, gateway 10.0.0.1"
fmt.Println(ipv4Re.FindAllString(text, -1))
// => [192.168.1.100 10.0.0.1]
```

```rust
// Rust
let ipv4_re = Regex::new(
    r"\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b"
).unwrap();
let text = "Server at 192.168.1.100, gateway 10.0.0.1";
let ips: Vec<&str> = ipv4_re.find_iter(text).map(|m| m.as_str()).collect();
println!("{:?}", ips);
// => ["192.168.1.100", "10.0.0.1"]
```

```java
// Java
Pattern ipv4Re = Pattern.compile(
    "\\b(?:(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\b"
);
String text = "Server at 192.168.1.100, gateway 10.0.0.1";
Matcher m = ipv4Re.matcher(text);
while (m.find()) {
    System.out.println(m.group());
}
// => 192.168.1.100
//    10.0.0.1
```

### 11.3 Parsing a Log File

```python
# Python: structured log analysis
import re

log_re = re.compile(r'''
    ^(?P<timestamp>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})  # ISO 8601
    \s+\[(?P<level>\w+)\]                                  # log level
    \s+(?P<source>[\w.]+):                                  # source
    \s+(?P<message>.+)$                                     # message
''', re.VERBOSE | re.MULTILINE)

log_text = """2026-02-11T10:30:45 [ERROR] app.server: Connection refused
2026-02-11T10:30:46 [INFO] app.db: Retry attempt 1
2026-02-11T10:30:47 [WARN] app.cache: Cache miss for key 'user:123'"""

for m in log_re.finditer(log_text):
    d = m.groupdict()
    print(f"  [{d['level']}] {d['source']} → {d['message']}")
```

```javascript
// JavaScript: parsing the same log
const logRe = /^(?<timestamp>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})\s+\[(?<level>\w+)\]\s+(?<source>[\w.]+):\s+(?<message>.+)$/gm;

const logText = `2026-02-11T10:30:45 [ERROR] app.server: Connection refused
2026-02-11T10:30:46 [INFO] app.db: Retry attempt 1
2026-02-11T10:30:47 [WARN] app.cache: Cache miss for key 'user:123'`;

for (const m of logText.matchAll(logRe)) {
    const { level, source, message } = m.groups;
    console.log(`  [${level}] ${source} → ${message}`);
}
```

```go
// Go: parsing the same log
logRe := regexp.MustCompile(
    `(?m)^(?P<timestamp>\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})\s+` +
    `\[(?P<level>\w+)\]\s+(?P<source>[\w.]+):\s+(?P<message>.+)$`,
)

logText := `2026-02-11T10:30:45 [ERROR] app.server: Connection refused
2026-02-11T10:30:46 [INFO] app.db: Retry attempt 1`

names := logRe.SubexpNames()
for _, match := range logRe.FindAllStringSubmatch(logText, -1) {
    for i, name := range names {
        if name != "" {
            fmt.Printf("  %s: %s\n", name, match[i])
        }
    }
    fmt.Println()
}
```

### 11.4 Parsing and Decomposing URLs

```python
# Python
import re

url_re = re.compile(r'''
    ^(?P<scheme>https?)://
    (?P<host>[^/:]+)
    (?::(?P<port>\d+))?
    (?P<path>/[^?#]*)?
    (?:\?(?P<query>[^#]*))?
    (?:\#(?P<fragment>.*))?$
''', re.VERBOSE)

urls = [
    "https://example.com:8080/api/v1/users?page=1&limit=10#section",
    "http://localhost/health",
    "https://cdn.example.com/assets/style.css",
]

for url in urls:
    m = url_re.match(url)
    if m:
        d = {k: v for k, v in m.groupdict().items() if v is not None}
        print(f"  {d}")
```

```javascript
// JavaScript
const urlRe = /^(?<scheme>https?):\/\/(?<host>[^\/:]+)(?::(?<port>\d+))?(?<path>\/[^?#]*)?(?:\?(?<query>[^#]*))?(?:#(?<fragment>.*))?$/;

const urls = [
    "https://example.com:8080/api/v1/users?page=1&limit=10#section",
    "http://localhost/health",
];

for (const url of urls) {
    const m = url.match(urlRe);
    if (m) {
        // exclude undefined
        const parts = Object.fromEntries(
            Object.entries(m.groups).filter(([_, v]) => v !== undefined)
        );
        console.log(parts);
    }
}
```

### 11.5 Parsing CSV Fields (Quote-Aware)

```python
# Python: parsing CSV with quoted fields
import re

# Correctly split quoted fields and regular fields
csv_field_re = re.compile(r'''
    (?:                     # start of a field
      "([^"]*(?:""[^"]*)*)" # quoted: "..." (internal "" is an escape)
      |                     # or
      ([^,]*)               # unquoted: until ,
    )
    (?:,|$)                 # , or end of line
''', re.VERBOSE)

line = '"John ""Johnny"" Doe",30,"New York, NY",active'
fields = []
for m in csv_field_re.finditer(line):
    if m.group(1) is not None:
        fields.append(m.group(1).replace('""', '"'))
    else:
        fields.append(m.group(2))
print(fields)
# => ['John "Johnny" Doe', '30', 'New York, NY', 'active']
```

---

## 12. Porting Checklist

Checklist when porting regular expressions between languages:

```
┌─────────────────────────────────────────────────────────────────┐
│ Source → Destination                                            │
├─────────────────────────────────────────────────────────────────┤
│ Python → JavaScript                                            │
│  □ Change (?P<name>...) to (?<name>...)                        │
│  □ Remove re.VERBOSE comments (JS does not support comments)   │
│  □ Change \w Unicode behavior to [\p{L}\p{N}_]                 │
│  □ Change fullmatch() to /^...$/                               │
│  □ Conditional patterns (?(id)yes|no) unavailable, use logic   │
│  □ Change re.sub function callback to replace callback         │
├─────────────────────────────────────────────────────────────────┤
│ Python → Go                                                    │
│  □ Replace lookarounds with capture group + post-processing    │
│  □ Replace backreferences with multi-step processing           │
│  □ \w Unicode behavior is ASCII-only in Go                     │
│  □ Change re.sub function callback to ReplaceAllStringFunc     │
│  □ Change findall to FindAllString (-1 needed as second arg)   │
├─────────────────────────────────────────────────────────────────┤
│ JavaScript → Python                                            │
│  □ Change (?<name>...) to (?P<name>...)                        │
│  □ Variable-length lookbehind → fixed-length or regex module   │
│  □ /pattern/flags → re.compile(r'pattern', flags)              │
│  □ $1, $2 → \1, \2 (in sub replacement string)                │
│  □ g flag → use findall/finditer for all matches               │
│  □ v flag set operations → substitute with the regex module    │
├─────────────────────────────────────────────────────────────────┤
│ Java → Rust                                                    │
│  □ Change (?<name>...) to (?P<name>...)                        │
│  □ Lookarounds → switch to fancy-regex or remove               │
│  □ Backreferences → switch to fancy-regex or remove            │
│  □ Possessive quantifiers *+ → remove (not in Rust regex)      │
│  □ Double escapes \\\\ → change to raw strings r""             │
│  □ Matcher state management → switch to iterator-based API     │
├─────────────────────────────────────────────────────────────────┤
│ From any language to Go/Rust                                    │
│  □ Lookarounds in general → remove and substitute with logic   │
│  □ Backreferences → remove and substitute with logic           │
│  □ Atomic groups → not needed (DFA, no backtracking)           │
│  □ Possessive quantifiers → not needed (DFA, no backtracking)  │
│  □ ReDoS countermeasures → not needed (O(n) guaranteed)        │
└─────────────────────────────────────────────────────────────────┘
```

---


## FAQ

### Q1: What is the most important point when learning this topic?

The most important thing is to gain practical experience. Beyond just theory, your understanding deepens by actually writing code and verifying its behavior.

### Q2: What are common mistakes that beginners make?

Skipping the fundamentals and jumping into advanced topics. We recommend thoroughly understanding the basic concepts explained in this guide before moving on to the next step.

### Q3: How is this used in practice?

Knowledge of this topic is frequently used in everyday development work. It becomes especially important during code reviews and architecture design.

---

## Summary

| Item | Content |
|------|------|
| Python | NFA, Unicode default, `(?P<>)` syntax, `re.VERBOSE` |
| JavaScript | NFA, significantly extended in ES2018, `/u` `/s` `/d` flags |
| Go | RE2 (DFA), O(n) guaranteed, no backreferences/lookarounds |
| Rust | DFA hybrid, O(n) guaranteed, simultaneous multi-match with `RegexSet` |
| Java | NFA, supports possessive quantifiers, double escapes mandatory |
| Porting caveats | Named group syntax, `\w` Unicode behavior, lookbehind constraints differ |

## Recommended Next Reading

- [01-common-patterns.md](./01-common-patterns.md) -- Collection of frequently used patterns
- [02-text-processing.md](./02-text-processing.md) -- Text processing tools

## References

1. **Python re module** https://docs.python.org/3/library/re.html -- Official reference for Python regular expressions
2. **MDN RegExp** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp -- Comprehensive guide to the JavaScript RegExp
3. **Go regexp package** https://pkg.go.dev/regexp -- Specification of Go's regexp package
4. **Rust regex crate** https://docs.rs/regex/latest/regex/ -- Documentation for Rust's regex crate
5. **Java Pattern class** https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/regex/Pattern.html -- Official reference for Java's Pattern class
6. **RE2 Syntax** https://github.com/google/re2/wiki/Syntax -- Syntax specification of the RE2 engine
7. **fancy-regex** https://docs.rs/fancy-regex/latest/fancy_regex/ -- Rust regex crate with lookaround support
8. **Python regex module** https://pypi.org/project/regex/ -- Python's extended regular expression module
9. **ECMAScript 2024 RegExp v flag** https://tc39.es/ecma262/ -- The latest JavaScript RegExp specification
10. **Russ Cox "Regular Expression Matching Can Be Simple And Fast"** https://swtch.com/~rsc/regexp/regexp1.html -- Explanation of the principles of NFA/DFA engines



===== SOURCE: 02-programming/regex-and-text-processing/docs/02-practical/01-common-patterns.md =====

# Common Patterns -- Email, URL, Date, Phone Number

> This guide explains frequently used regular expression patterns from both a "practical level" and a "strict level" perspective. Understand the limits of each pattern correctly and learn robust validation designs that don't rely solely on regular expressions.

## What You Will Learn in This Chapter

1. **Practical implementations of common patterns** -- email, URL, date, phone number, IP address, etc.
2. **Trade-offs between strict specification compliance and practicality** -- why full RFC compliance is usually unnecessary
3. **Design patterns combining regex + additional validation** -- validation that cannot be completed by pattern matching alone


## Prerequisites

To deepen your understanding of this guide, the following knowledge is helpful:

- Basic programming knowledge
- Understanding of related foundational concepts
- Familiarity with the content of [Language-specific Regex -- Differences across JS/Python/Go/Rust/Java](./00-language-specific.md)

---

## 1. Email Address

### 1.1 Practical Pattern

```python
import re

# Practical level: matches most real-world email addresses
email_pattern = re.compile(
    r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
)

test_emails = [
    "user@example.com",           # OK
    "user.name+tag@domain.co.jp", # OK
    "user@sub.domain.example.com",# OK
    "user@",                      # NG
    "@domain.com",                # NG
    "user@domain",                # NG (no TLD)
    "user name@domain.com",       # NG (whitespace)
]

for email in test_emails:
    result = "OK" if email_pattern.match(email) else "NG"
    print(f"  {result}: {email}")
```

### 1.2 Why You Should Not Use a Fully RFC 5322 Compliant Pattern

```
RFC 5322 compliant pattern: a regex of thousands of characters
-> Unmaintainable, undebuggable, performance risk

Practical approach:
+-----------------------------------------+
| 1. Check basic format with regex        |
|    (has @, has domain, has TLD)         |
|                                         |
| 2. Send a confirmation email to verify  |
|    existence (this is the only          |
|    correct verification)                |
+-----------------------------------------+

Reasons:
- "Valid" but non-existent addresses cannot be detected by regex
- Some existing addresses don't comply with RFC
- The job of regex is only to "reject obvious typos"
```

### 1.3 Email Address Edge Cases in Detail

This section explains in detail the boundary cases of email addresses encountered in practice.

```python
import re

email_pattern = re.compile(
    r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
)

# Edge cases: understand the limits of the practical pattern
edge_cases = {
    # --- Cases that are valid per RFC but NG with the practical pattern ---
    '"user name"@example.com': "RFC valid: quoted local part",
    'user@[192.168.1.1]':      "RFC valid: IP literal domain",
    '(comment)user@example.com': "RFC valid: with comment",
    'user@example':            "RFC valid: local domain without TLD",

    # --- Cases that are correctly rejected by the practical pattern ---
    'user@.example.com':       "NG: domain starts with a dot",
    'user@example..com':       "NG: consecutive dots in domain",
    '.user@example.com':       "NG: local part starts with a dot",
    'user.@example.com':       "NG: local part ends with a dot",

    # --- Support for new TLDs ---
    'user@example.photography': "OK: long TLD (.photography)",
    'user@example.museum':      "OK: .museum",
    'user@example.co.uk':       "OK: double TLD",
    'user@example.xn--p1ai':    "OK: internationalized TLD (Punycode)",
}

for email, description in edge_cases.items():
    result = "OK" if email_pattern.match(email) else "NG"
    print(f"  {result}: {email:<40} -- {description}")
```

### 1.4 Improved Email Pattern

This shows an improved version that strengthens the weaknesses of the basic pattern.

```python
import re

# Improved version: rejects consecutive dots and dots at the start/end
email_improved = re.compile(
    r'^'
    r'(?![.])'                      # does not start with a dot
    r'[a-zA-Z0-9]'                  # starts with alphanumeric
    r'(?:[a-zA-Z0-9._%+-]*'         # middle part
    r'[a-zA-Z0-9_%+-])?'            # does not end with a dot (optional for single character)
    r'@'
    r'(?![.-])'                     # domain does not start with a dot or hyphen
    r'[a-zA-Z0-9]'                  # domain head
    r'(?:[a-zA-Z0-9.-]*'            # domain middle
    r'[a-zA-Z0-9])?'               # domain does not end with a hyphen
    r'\.[a-zA-Z]{2,}$'             # TLD
)

test_improved = [
    ("user@example.com",        True),
    (".user@example.com",       False),  # starts with dot
    ("user.@example.com",       False),  # ends with dot
    ("user..name@example.com",  False),  # consecutive dots
    ("u@example.com",           True),   # single-character local part
    ("user@-domain.com",        False),  # domain starting with hyphen
    ("user@domain-.com",        False),  # domain ending with hyphen
]

for email, expected in test_improved:
    result = bool(email_improved.match(email))
    status = "PASS" if result == expected else "FAIL"
    print(f"  {status}: {email:<30} expected={expected}, got={result}")
```

### 1.5 Email Validation in Multiple Languages

```javascript
// JavaScript version
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// HTML5 input[type="email"] uses its own pattern
// Leveraging the browser's standard validation is the best approach
const form = document.createElement('form');
const input = document.createElement('input');
input.type = 'email';
input.value = 'test@example.com';
console.log(input.checkValidity()); // true
```

```go
// Go version
package main

import (
    "fmt"
    "net/mail"
    "regexp"
)

func main() {
    // Basic check via regex
    pattern := regexp.MustCompile(
        `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`,
    )
    fmt.Println(pattern.MatchString("user@example.com")) // true

    // Recommended: use the net/mail package
    _, err := mail.ParseAddress("user@example.com")
    fmt.Println(err == nil) // true
}
```

```ruby
# Ruby version
# Use the standard library URI::MailTo
require 'uri'

email = "user@example.com"
pattern = /\A[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\z/

puts email.match?(pattern)  # => true

# URI::MailTo::EMAIL_REGEXP is also available
puts email.match?(URI::MailTo::EMAIL_REGEXP)  # => true
```

---

## 2. URL

### 2.1 Practical Pattern

```python
import re

# Practical pattern for HTTP/HTTPS URLs
url_pattern = re.compile(
    r'https?://'                # protocol
    r'(?:[a-zA-Z0-9]'          # domain head
    r'(?:[a-zA-Z0-9-]{0,61}'   # domain middle
    r'[a-zA-Z0-9])?\.)'        # domain tail + dot
    r'+[a-zA-Z]{2,}'           # TLD
    r'(?:/[^\s]*)?'            # path (optional)
)

test_urls = [
    "https://example.com",
    "https://www.example.com/path/to/page",
    "http://sub.domain.example.co.jp/path?q=1&p=2#hash",
    "ftp://example.com",          # NG (only http/https)
    "not a url",                  # NG
]

for url in test_urls:
    m = url_pattern.search(url)
    result = m.group() if m else "NG"
    print(f"  {result}")
```

### 2.2 Extracting URLs from Text

```python
import re

text = """
Official site: https://example.com/docs
Reference: http://sub.domain.co.jp/path?key=value
Contact: mailto:info@example.com (this should not match)
"""

# Extract HTTP URLs from text
url_extract = re.compile(r'https?://[^\s<>"]+')

urls = url_extract.findall(text)
for url in urls:
    print(f"  {url}")
# => https://example.com/docs
# => http://sub.domain.co.jp/path?key=value
```

### 2.3 Decomposing and Extracting URL Components

This shows a pattern that decomposes a URL into capture groups so each component can be obtained individually.

```python
import re

# Extract each URL component using named capture groups
url_decompose = re.compile(
    r'^'
    r'(?P<scheme>https?)'              # scheme
    r'://'
    r'(?:(?P<user>[^:@]+)'             # user (optional)
    r'(?::(?P<password>[^@]+))?@)?'    # password (optional)
    r'(?P<host>[a-zA-Z0-9.-]+)'        # host
    r'(?::(?P<port>\d{1,5}))?'         # port (optional)
    r'(?P<path>/[^?#]*)?'              # path (optional)
    r'(?:\?(?P<query>[^#]*))?'         # query (optional)
    r'(?:#(?P<fragment>.*))?'          # fragment (optional)
    r'$'
)

test_urls_decompose = [
    "https://www.example.com/path/to/page?key=value&lang=ja#section1",
    "http://user:pass@host.example.com:8080/api/v1?format=json",
    "https://example.co.jp",
    "http://localhost:3000/dashboard",
]

for url in test_urls_decompose:
    m = url_decompose.match(url)
    if m:
        print(f"\n  URL: {url}")
        for name in ['scheme', 'user', 'password', 'host', 'port', 'path', 'query', 'fragment']:
            value = m.group(name)
            if value:
                print(f"    {name:>10}: {value}")
```

Example output:

```
  URL: https://www.example.com/path/to/page?key=value&lang=ja#section1
      scheme: https
        host: www.example.com
        path: /path/to/page
       query: key=value&lang=ja
    fragment: section1

  URL: http://user:pass@host.example.com:8080/api/v1?format=json
      scheme: http
        user: user
    password: pass
        host: host.example.com
        port: 8080
        path: /api/v1
       query: format=json
```

### 2.4 Parsing and Extracting Query Parameters

```python
import re
from urllib.parse import urlparse, parse_qs

url = "https://example.com/search?q=python+regex&page=2&lang=ja&sort=date"

# Method 1: extract individual query parameters using regex
param_pattern = re.compile(r'?&=([^&]*)')
params_regex = param_pattern.findall(url)
print("Regex:")
for key, value in params_regex:
    print(f"  {key} = {value}")

# Method 2: use urllib.parse (recommended)
parsed = urlparse(url)
params_lib = parse_qs(parsed.query)
print("\nurllib.parse:")
for key, values in params_lib.items():
    print(f"  {key} = {values}")

# Note: regex is insufficient for handling encoded parameters
# Use a library for decoding things like %E6%97%A5%E6%9C%AC -> "日本"
```

### 2.5 Extracting Links from Markdown or HTML

```python
import re

# Extract markdown links: text
markdown_link = re.compile(
    r'\[([^\]]+)\]'          # link text
    r'\(([^)]+)\)'           # URL
)

md_text = """
For details, see [Official Documentation](https://docs.example.com/guide).
Also check [API Reference](https://api.example.com/v2/docs).
Image: ![alt text](https://img.example.com/logo.png)
"""

for m in markdown_link.finditer(md_text):
    print(f"  Text: {m.group(1)}")
    print(f"  URL:  {m.group(2)}\n")

# Extract links from HTML <a> tags
html_link = re.compile(
    r'<a\s+[^>]*href="\'["\'][^>]*>'   # href attribute
    r'(.*?)'                                        # link text
    r'</a>',
    re.DOTALL
)

html_text = """
<a href="https://example.com" class="link">Example</a>
<a href="/relative/path" target="_blank">Relative Link</a>
"""

for m in html_link.finditer(html_text):
    print(f"  href: {m.group(1)}, text: {m.group(2)}")

# Note: for serious HTML parsing, use BeautifulSoup
```

---

## 3. Date

### 3.1 Patterns for Various Formats

```python
import re

# YYYY-MM-DD
iso_date = re.compile(r'\b(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])\b')

# YYYY/MM/DD
slash_date = re.compile(r'\b(\d{4})/(0[1-9]|1[0-2])/(0[1-9]|[12]\d|3[01])\b')

# DD/MM/YYYY (European style)
eu_date = re.compile(r'\b(0[1-9]|[12]\d|3[01])/(0[1-9]|1[0-2])/(\d{4})\b')

# MM/DD/YYYY (American style)
us_date = re.compile(r'\b(0[1-9]|1[0-2])/(0[1-9]|[12]\d|3[01])/(\d{4})\b')

# Japanese date
jp_date = re.compile(r'(\d{4})年(0?[1-9]|1[0-2])月(0?[1-9]|[12]\d|3[01])日')

# Test
texts = [
    "2026-02-11",
    "2026/02/11",
    "11/02/2026",
    "02/11/2026",
    "2026年2月11日",
]

patterns = {
    "ISO": iso_date,
    "Slash": slash_date,
    "EU": eu_date,
    "US": us_date,
    "Japanese": jp_date,
}

for text in texts:
    for name, pat in patterns.items():
        m = pat.search(text)
        if m:
            print(f"  {text} -> {name}: {m.groups()}")
```

### 3.2 Caveats for Date Validation

```python
import re
from datetime import datetime

# Examples where regex alone is insufficient:
# "2026-02-30" -- format is correct, but February 30 does not exist
# "2025-02-29" -- not a leap year, so it does not exist
# "2024-02-29" -- a leap year, so it exists

def validate_date(date_str: str) -> bool:
    """Validate a date with regex + datetime"""
    if not re.match(r'^\d{4}-\d{2}-\d{2}$', date_str):
        return False
    try:
        datetime.strptime(date_str, '%Y-%m-%d')
        return True
    except ValueError:
        return False

print(validate_date("2026-02-11"))  # => True
print(validate_date("2026-02-30"))  # => False (day 30 does not exist)
print(validate_date("2025-02-29"))  # => False (not a leap year)
print(validate_date("2024-02-29"))  # => True  (leap year)
```

### 3.3 DateTime Patterns

This shows patterns that include time as well as date.

```python
import re
from datetime import datetime

# ISO 8601 datetime format: YYYY-MM-DDTHH:MM:SS
iso_datetime = re.compile(
    r'\b(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])'  # date part
    r'[T ]'                                                # separator (T or space)
    r'([01]\d|2[0-3]):([0-5]\d):([0-5]\d)'                # time part
    r'(?:\.(\d{1,6}))?'                                   # microseconds (optional)
    r'(?:Z|([+-])([01]\d|2[0-3]):?([0-5]\d))?\b'          # timezone (optional)
)

test_datetimes = [
    "2026-02-11T14:30:00",           # local time
    "2026-02-11T14:30:00Z",          # UTC
    "2026-02-11T14:30:00+09:00",     # JST
    "2026-02-11 14:30:00.123456",    # with microseconds
    "2026-02-11T14:30:00-05:00",     # EST
    "2026-02-11T25:00:00",           # NG: hour 25 does not exist
]

for dt_str in test_datetimes:
    m = iso_datetime.search(dt_str)
    if m:
        print(f"  OK: {dt_str}")
        print(f"      Date: {m.group(1)}-{m.group(2)}-{m.group(3)}")
        print(f"      Time: {m.group(4)}:{m.group(5)}:{m.group(6)}")
    else:
        print(f"  NG: {dt_str}")
```

### 3.4 Parsing Relative Date Expressions

Extract relative date expressions like "3 days ago" or "2 weeks from now" from logs and text.

```python
import re
from datetime import datetime, timedelta

# Japanese relative date expressions
relative_date_jp = re.compile(
    r'(\d+)\s*'
    r'(秒|分|時間|日|週間?|ヶ月|か月|カ月|年)'
    r'\s*(前|後|先|以内)'
)

# English relative date expressions
relative_date_en = re.compile(
    r'(\d+)\s+'
    r'(seconds?|minutes?|hours?|days?|weeks?|months?|years?)'
    r'\s+(ago|later|from now)',
    re.IGNORECASE
)

test_relative = [
    "このイベントは3日前に発生しました",
    "レポートは2週間以内に提出してください",
    "5年前のデータを参照",
    "The error occurred 30 minutes ago",
    "Delivery expected 2 weeks from now",
]

for text in test_relative:
    m = relative_date_jp.search(text) or relative_date_en.search(text)
    if m:
        print(f"  '{text}'")
        print(f"    Extracted: {m.group(0)}")
        print(f"    Number: {m.group(1)}, Unit: {m.group(2)}, Direction: {m.group(3)}")
```

### 3.5 Date Range Validation

```python
import re
from datetime import datetime

def validate_date_range(start_str: str, end_str: str) -> dict:
    """Validate a date range"""
    date_pattern = re.compile(r'^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$')

    result = {"valid": True, "errors": []}

    # Format check
    if not date_pattern.match(start_str):
        result["valid"] = False
        result["errors"].append(f"Invalid start date format: {start_str}")
    if not date_pattern.match(end_str):
        result["valid"] = False
        result["errors"].append(f"Invalid end date format: {end_str}")

    if not result["valid"]:
        return result

    # Date validity check
    try:
        start = datetime.strptime(start_str, '%Y-%m-%d')
        end = datetime.strptime(end_str, '%Y-%m-%d')
    except ValueError as e:
        result["valid"] = False
        result["errors"].append(f"Date does not exist: {e}")
        return result

    # Logical check: start <= end
    if start > end:
        result["valid"] = False
        result["errors"].append("Start date is after end date")

    # Range check: within 365 days
    if (end - start).days > 365:
        result["valid"] = False
        result["errors"].append("Date range exceeds 365 days")

    return result

# Test
cases = [
    ("2026-01-01", "2026-12-31"),  # OK
    ("2026-12-31", "2026-01-01"),  # NG: reversed
    ("2026-02-29", "2026-03-01"),  # NG: 2026-02-29 does not exist
    ("2025-01-01", "2026-12-31"),  # NG: exceeds 365 days
]

for start, end in cases:
    r = validate_date_range(start, end)
    status = "OK" if r["valid"] else "NG"
    print(f"  {status}: {start} ~ {end}")
    for err in r["errors"]:
        print(f"       {err}")
```

---

## 4. Phone Number

### 4.1 Patterns by Country

```python
import re

# Japanese phone numbers
jp_phone_patterns = {
    # Mobile: 090/080/070-XXXX-XXXX
    "Mobile": re.compile(r'0[789]0-?\d{4}-?\d{4}'),
    # Landline (Tokyo): 03-XXXX-XXXX
    "Landline (Tokyo)": re.compile(r'03-?\d{4}-?\d{4}'),
    # Landline (Osaka): 06-XXXX-XXXX
    "Landline (Osaka)": re.compile(r'06-?\d{4}-?\d{4}'),
    # Toll-free: 0120-XXX-XXX
    "Toll-free": re.compile(r'0120-?\d{3}-?\d{3}'),
    # International format: +81-XX-XXXX-XXXX
    "International": re.compile(r'\+81-?\d{1,4}-?\d{1,4}-?\d{4}'),
}

# General Japanese phone number pattern
jp_phone_general = re.compile(
    r'(?:\+81|0)'           # +81 or 0
    r'[\d-]{9,13}'          # 9-13 characters of digits and hyphens
)

test_phones = [
    "090-1234-5678",
    "09012345678",
    "03-1234-5678",
    "0120-123-456",
    "+81-90-1234-5678",
]

for phone in test_phones:
    m = jp_phone_general.search(phone)
    print(f"  {phone}: {'OK' if m else 'NG'}")
```

### 4.2 International Phone Number (E.164)

```python
import re

# E.164 format: +[country code][phone number] (max 15 digits)
e164_pattern = re.compile(r'^\+[1-9]\d{1,14}$')

test_numbers = [
    "+819012345678",     # Japan
    "+14155551234",      # USA
    "+442012345678",     # UK
    "+0123456789",       # NG (no country code starts with 0)
    "+123456789012345",  # NG (16 digits -- exceeds upper limit)
]

for num in test_numbers:
    result = "OK" if e164_pattern.match(num) else "NG"
    print(f"  {result}: {num}")

# Note: for strict phone number validation,
# Google's libphonenumber library is recommended
```

### 4.3 Phone Number Patterns by Country in Detail

```python
import re

# Collection of phone number patterns by country
international_phone_patterns = {
    # USA/Canada (NANP): +1-NXX-NXX-XXXX
    "US/CA": re.compile(
        r'(?:\+1[-.\s]?)?'            # country code (optional)
        r'\(?[2-9]\d{2}\)?'            # area code
        r'[-.\s]?'
        r'[2-9]\d{2}'                  # exchange
        r'[-.\s]?'
        r'\d{4}'                       # subscriber number
    ),

    # UK: +44 XXXX XXXXXX
    "UK": re.compile(
        r'(?:\+44[-.\s]?|0)'           # country code or trunk prefix
        r'[1-9]\d{1,4}'               # area code
        r'[-.\s]?'
        r'\d{4,8}'                     # subscriber number
    ),

    # Germany: +49 XXXX XXXXXXX
    "DE": re.compile(
        r'(?:\+49[-.\s]?|0)'
        r'[1-9]\d{1,4}'
        r'[-.\s]?'
        r'\d{3,8}'
    ),

    # China: +86 1XX XXXX XXXX (mobile)
    "CN_mobile": re.compile(
        r'(?:\+86[-.\s]?)?'
        r'1[3-9]\d'                    # mobile prefix
        r'[-.\s]?'
        r'\d{4}'
        r'[-.\s]?'
        r'\d{4}'
    ),

    # Korea: +82 01X-XXXX-XXXX (mobile)
    "KR_mobile": re.compile(
        r'(?:\+82[-.\s]?|0)'
        r'1[016789]'                   # mobile prefix
        r'[-.\s]?'
        r'\d{3,4}'
        r'[-.\s]?'
        r'\d{4}'
    ),
}

test_international = [
    ("US/CA", "(415) 555-1234"),
    ("US/CA", "+1-415-555-1234"),
    ("UK",    "+44 20 7946 0958"),
    ("UK",    "020 7946 0958"),
    ("DE",    "+49 30 12345678"),
    ("CN_mobile", "+86 138 1234 5678"),
    ("KR_mobile", "010-1234-5678"),
]

for country, phone in test_international:
    pattern = international_phone_patterns[country]
    m = pattern.search(phone)
    print(f"  {country:>10}: {phone:<25} {'OK' if m else 'NG'}")
```

### 4.4 Bulk Extraction of Phone Numbers from Text

```python
import re

# General-purpose pattern for extracting phone-number-like strings from text
phone_extractor = re.compile(
    r'(?:'
    r'\+\d{1,3}[-.\s]?'               # with country code
    r'|'
    r'0'                               # domestic number
    r')'
    r'(?:\d[-.\s]?){8,13}'            # sequence of 8 to 13 digits
)

document = """
Contact Information:
  Tokyo HQ: 03-1234-5678
  Osaka Branch: 06-9876-5432
  Mobile (direct line): 090-1111-2222
  Toll-free: 0120-456-789
  International inquiries: +81-3-1234-5678

* Business hours: 9:00-18:00 (digits but not a phone number)
* FAX: 03-1234-5679
"""

phones = phone_extractor.findall(document)
print("Extracted phone numbers:")
for phone in phones:
    # Normalize: remove hyphens and spaces
    normalized = re.sub(r'[-.\s]', '', phone)
    print(f"  Original: {phone:<25} Normalized: {normalized}")
```

---

## 5. IP Address

### 5.1 IPv4

```python
import re

# IPv4: from 0.0.0.0 to 255.255.255.255
ipv4_pattern = re.compile(
    r'\b'
    r'(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.'   # 1st octet
    r'(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.'   # 2nd octet
    r'(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.'   # 3rd octet
    r'(?:25[0-5]|2[0-4]\d|[01]?\d\d?)'     # 4th octet
    r'\b'
)

test_ips = [
    "192.168.1.1",      # OK
    "10.0.0.0",         # OK
    "255.255.255.255",  # OK
    "0.0.0.0",          # OK
    "256.1.1.1",        # NG (256 is out of range)
    "192.168.1",        # NG (only 3 octets)
    "192.168.1.1.1",    # NG (5 octets)
]

for ip in test_ips:
    result = "OK" if ipv4_pattern.fullmatch(ip) else "NG"
    print(f"  {result}: {ip}")
```

### 5.2 IPv6 (Simplified)

```python
import re
import ipaddress

# Strict IPv6 matching with regex alone is difficult
# Recommendation: simple pattern + library validation

ipv6_simple = re.compile(
    r'(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}'  # full form only
)

# Recommended: use the ipaddress module
def validate_ip(addr: str) -> str:
    try:
        obj = ipaddress.ip_address(addr)
        return f"IPv{obj.version}"
    except ValueError:
        return "Invalid"

print(validate_ip("192.168.1.1"))                # => IPv4
print(validate_ip("2001:db8::1"))                 # => IPv6
print(validate_ip("fe80::1%eth0"))                # => Invalid
```

### 5.3 CIDR Notation Pattern

```python
import re
import ipaddress

# IPv4 CIDR notation: 192.168.1.0/24
ipv4_cidr = re.compile(
    r'\b'
    r'(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.'
    r'(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.'
    r'(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.'
    r'(?:25[0-5]|2[0-4]\d|[01]?\d\d?)'
    r'/([12]?\d|3[0-2])'      # subnet mask: 0-32
    r'\b'
)

test_cidrs = [
    "192.168.1.0/24",      # OK: /24 subnet
    "10.0.0.0/8",          # OK: Class A
    "172.16.0.0/12",       # OK: private address
    "192.168.1.0/33",      # NG: /33 is out of range
    "256.0.0.0/24",        # NG: 256 is out of range
]

for cidr in test_cidrs:
    m = ipv4_cidr.fullmatch(cidr)
    if m:
        # Also validate with the library
        try:
            network = ipaddress.ip_network(cidr, strict=False)
            print(f"  OK: {cidr:<20} network={network.network_address}, "
                  f"hosts={network.num_addresses}")
        except ValueError as e:
            print(f"  NG: {cidr:<20} {e}")
    else:
        print(f"  NG: {cidr}")
```

### 5.4 Identifying Private IP Addresses

```python
import re

# Private IP address ranges
# 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16

private_ipv4 = re.compile(
    r'\b(?:'
    r'10\.\d{1,3}\.\d{1,3}\.\d{1,3}'            # 10.0.0.0/8
    r'|'
    r'172\.(?:1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}'  # 172.16.0.0/12
    r'|'
    r'192\.168\.\d{1,3}\.\d{1,3}'               # 192.168.0.0/16
    r'|'
    r'127\.\d{1,3}\.\d{1,3}\.\d{1,3}'           # 127.0.0.0/8 (loopback)
    r')\b'
)

test_private = [
    "10.0.0.1",        # private
    "172.16.0.1",      # private
    "172.31.255.255",  # private
    "172.32.0.1",      # public (172.32 is out of range)
    "192.168.1.1",     # private
    "127.0.0.1",       # loopback
    "8.8.8.8",         # public
    "203.0.113.1",     # public (documentation)
]

for ip in test_private:
    is_private = bool(private_ipv4.match(ip))
    print(f"  {'Private' if is_private else 'Public ':>7}: {ip}")
```

### 5.5 Extracting and Aggregating IP Addresses from Log Files

```python
import re
from collections import Counter

# Extract IPs from Apache/Nginx access logs
ipv4_pattern = re.compile(
    r'\b(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.'
    r'(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.'
    r'(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.'
    r'(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b'
)

sample_log = """
192.168.1.100 - - [11/Feb/2026:14:30:00 +0900] "GET /index.html HTTP/1.1" 200 1234
10.0.0.50 - - [11/Feb/2026:14:30:01 +0900] "POST /api/data HTTP/1.1" 201 567
192.168.1.100 - - [11/Feb/2026:14:30:02 +0900] "GET /style.css HTTP/1.1" 200 890
203.0.113.42 - - [11/Feb/2026:14:30:03 +0900] "GET /admin HTTP/1.1" 403 0
192.168.1.100 - - [11/Feb/2026:14:30:04 +0900] "GET /favicon.ico HTTP/1.1" 404 0
203.0.113.42 - - [11/Feb/2026:14:30:05 +0900] "GET /admin HTTP/1.1" 403 0
10.0.0.50 - - [11/Feb/2026:14:30:06 +0900] "GET /api/health HTTP/1.1" 200 15
"""

# Extract IPs and aggregate
ips = ipv4_pattern.findall(sample_log)
ip_counts = Counter(ips)

print("Access counts per IP address:")
for ip, count in ip_counts.most_common():
    print(f"  {ip:<16} {count} times")

# Identify IPs with 403 errors
error_pattern = re.compile(
    r'(\d+\.\d+\.\d+\.\d+).*?"(?:GET|POST|PUT|DELETE)\s+\S+\s+HTTP/\d\.\d"\s+403'
)

error_ips = error_pattern.findall(sample_log)
error_counts = Counter(error_ips)
print("\nIPs with 403 errors:")
for ip, count in error_counts.most_common():
    print(f"  {ip:<16} {count} times -- possibly unauthorized access")
```

---

## 6. Other Common Patterns

### 6.1 Postal Code (Japan)

```python
import re

# Japanese postal code: XXX-XXXX
jp_postal = re.compile(r'\b\d{3}-?\d{4}\b')

test_codes = ["100-0001", "1000001", "100-001"]
for code in test_codes:
    result = "OK" if jp_postal.fullmatch(code) else "NG"
    print(f"  {result}: {code}")
# => OK: 100-0001
# => OK: 1000001
# => NG: 100-001
```

### 6.2 Credit Card Number (with Luhn Check)

```python
import re

# Patterns for major card brands
card_patterns = {
    "Visa":       re.compile(r'^4\d{12}(?:\d{3})?$'),
    "Mastercard": re.compile(r'^5[1-5]\d{14}$'),
    "AMEX":       re.compile(r'^3[47]\d{13}$'),
    "JCB":        re.compile(r'^(?:2131|1800|35\d{3})\d{11}$'),
}

def luhn_check(number: str) -> bool:
    """Validate the check digit using the Luhn algorithm"""
    digits = [int(d) for d in number]
    checksum = 0
    for i, d in enumerate(reversed(digits)):
        if i % 2 == 1:
            d *= 2
            if d > 9:
                d -= 9
        checksum += d
    return checksum % 10 == 0

def validate_card(number: str) -> tuple[str, bool]:
    """Validate a card number (format + Luhn)"""
    clean = number.replace(' ', '').replace('-', '')
    for brand, pattern in card_patterns.items():
        if pattern.match(clean):
            return brand, luhn_check(clean)
    return "Unknown", False

print(validate_card("4111 1111 1111 1111"))  # => ('Visa', True)
```

### 6.3 Password Strength

```python
import re

def check_password_strength(password: str) -> dict:
    """Check password strength against multiple criteria"""
    checks = {
        "8 characters or more": len(password) >= 8,
        "Contains uppercase":   bool(re.search(r'[A-Z]', password)),
        "Contains lowercase":   bool(re.search(r'[a-z]', password)),
        "Contains digit":       bool(re.search(r'\d', password)),
        "Contains symbol":      bool(re.search(r'[!@#$%^&*(),.?":{}|<>]', password)),
        "No consecutive chars": not bool(re.search(r'(.)\1{2,}', password)),
    }
    strength = sum(checks.values())
    return {"checks": checks, "score": f"{strength}/6"}

result = check_password_strength("MyP@ssw0rd")
for check, passed in result["checks"].items():
    print(f"  {'OK' if passed else 'NG'}: {check}")
print(f"  Score: {result['score']}")
```

### 6.4 Username Validation

This shows a typical username validation pattern for web services.

```python
import re

# Username requirements:
# - 3 to 20 characters
# - Only alphanumerics, underscores, and hyphens
# - Must start with a letter
# - No consecutive underscores or hyphens

username_pattern = re.compile(
    r'^'
    r'[a-zA-Z]'                  # starts with a letter
    r'(?!.*[-_]{2})'             # forbid consecutive symbols via negative lookahead
    r'[a-zA-Z0-9_-]{2,19}'      # remaining 2-19 characters (3-20 total)
    r'$'
)

test_usernames = [
    ("alice",           True,  "OK: basic name"),
    ("user_name",       True,  "OK: with underscore"),
    ("user-name",       True,  "OK: with hyphen"),
    ("a1b2c3",          True,  "OK: alphanumeric mix"),
    ("ab",              False, "NG: 2 chars (min 3)"),
    ("1user",           False, "NG: starts with digit"),
    ("_user",           False, "NG: starts with underscore"),
    ("user__name",      False, "NG: consecutive underscores"),
    ("user--name",      False, "NG: consecutive hyphens"),
    ("user name",       False, "NG: contains space"),
    ("user@name",       False, "NG: contains special char"),
    ("a" * 21,          False, "NG: 21 chars (max 20)"),
]

for username, expected, description in test_usernames:
    result = bool(username_pattern.match(username))
    status = "PASS" if result == expected else "FAIL"
    display_name = username if len(username) <= 20 else username[:17] + "..."
    print(f"  {status}: {display_name:<20} -- {description}")
```

### 6.5 File Path Patterns

```python
import re

# Unix/Linux file path
unix_path = re.compile(
    r'^(/[a-zA-Z0-9._-]+)+/?$'
)

# Windows file path
windows_path = re.compile(
    r'^[A-Z]:\\(?:[^\\/:*?"<>|\r\n]+\\)*[^\\/:*?"<>|\r\n]*$'
)

# Extract file extension
extension = re.compile(r'\.([a-zA-Z0-9]+)$')

test_paths = {
    "/home/user/file.txt":           "Unix",
    "/var/log/syslog":               "Unix",
    "C:\\Users\\user\\file.txt":     "Windows",
    "C:\\Program Files\\app.exe":    "Windows",
}

for path, os_type in test_paths.items():
    pattern = unix_path if os_type == "Unix" else windows_path
    valid = bool(pattern.match(path))
    ext_match = extension.search(path)
    ext = ext_match.group(1) if ext_match else "(none)"
    print(f"  {os_type:>7}: {path:<40} valid={valid}, ext={ext}")
```

### 6.6 Hexadecimal Color Codes

```python
import re

# CSS color codes
hex_color = re.compile(
    r'^#(?:'
    r'[0-9a-fA-F]{3}'    # short form: #RGB
    r'|'
    r'[0-9a-fA-F]{4}'    # short form + alpha: #RGBA
    r'|'
    r'[0-9a-fA-F]{6}'    # full form: #RRGGBB
    r'|'
    r'[0-9a-fA-F]{8}'    # full form + alpha: #RRGGBBAA
    r')$'
)

# CSS rgb()/rgba() function form
rgb_color = re.compile(
    r'^rgba?\(\s*'
    r'(\d{1,3})\s*,\s*'     # R: 0-255
    r'(\d{1,3})\s*,\s*'     # G: 0-255
    r'(\d{1,3})'             # B: 0-255
    r'(?:\s*,\s*'
    r'([01]?\.?\d*)'         # A: 0-1 (optional)
    r')?\s*\)$'
)

# HSL form
hsl_color = re.compile(
    r'^hsla?\(\s*'
    r'(\d{1,3})\s*,\s*'     # H: 0-360
    r'(\d{1,3})%\s*,\s*'    # S: 0-100%
    r'(\d{1,3})%'            # L: 0-100%
    r'(?:\s*,\s*'
    r'([01]?\.?\d*)'         # A: 0-1 (optional)
    r')?\s*\)$'
)

test_colors = [
    "#fff",                 # OK: short form
    "#FF5733",              # OK: full form
    "#FF573380",            # OK: with alpha
    "#GGHHII",              # NG: invalid hex
    "rgb(255, 87, 51)",     # OK: RGB
    "rgba(255, 87, 51, 0.5)", # OK: RGBA
    "hsl(9, 100%, 60%)",    # OK: HSL
]

for color in test_colors:
    matched = (
        hex_color.match(color) or
        rgb_color.match(color) or
        hsl_color.match(color)
    )
    print(f"  {'OK' if matched else 'NG'}: {color}")
```

### 6.7 UUID Validation

```python
import re

# UUID v4: xxxxxxxx-xxxx-4xxx-[89ab]xxx-xxxxxxxxxxxx
uuid_v4 = re.compile(
    r'^[0-9a-f]{8}-'
    r'[0-9a-f]{4}-'
    r'4[0-9a-f]{3}-'          # version 4
    r'[89ab][0-9a-f]{3}-'     # variant 1
    r'[0-9a-f]{12}$',
    re.IGNORECASE
)

# UUID of any version
uuid_any = re.compile(
    r'^[0-9a-f]{8}-'
    r'[0-9a-f]{4}-'
    r'[1-5][0-9a-f]{3}-'      # versions 1-5
    r'[89ab][0-9a-f]{3}-'
    r'[0-9a-f]{12}$',
    re.IGNORECASE
)

test_uuids = [
    "550e8400-e29b-41d4-a716-446655440000",  # OK: v4
    "6ba7b810-9dad-11d1-80b4-00c04fd430c8",  # OK: v1
    "not-a-uuid",                              # NG
    "550e8400-e29b-61d4-a716-446655440000",   # NG: version 6 (only v1-5 supported)
    "550e8400-e29b-41d4-c716-446655440000",   # NG: invalid variant
]

for uuid_str in test_uuids:
    v4 = "v4" if uuid_v4.match(uuid_str) else "--"
    any_v = "OK" if uuid_any.match(uuid_str) else "NG"
    print(f"  {any_v}({v4}): {uuid_str}")
```

### 6.8 Japanese Text Patterns

```python
import re

# Hiragana
hiragana = re.compile(r'^[\u3040-\u309F]+$')

# Katakana
katakana = re.compile(r'^[\u30A0-\u30FF]+$')

# Kanji (CJK Unified Ideographs)
kanji = re.compile(r'^[\u4E00-\u9FFF]+$')

# Full-width characters
zenkaku = re.compile(r'^[\uFF01-\uFF5E]+$')

# Japanese name (family given): kanji + space + kanji
jp_name = re.compile(r'^[\u4E00-\u9FFF\u3040-\u309F]{1,10}\s[\u4E00-\u9FFF\u3040-\u309F]{1,10}$')

# Furigana (katakana)
furigana = re.compile(r'^[\u30A0-\u30FF\s]{2,20}$')

test_japanese = [
    ("あいうえお",     hiragana,  "Hiragana"),
    ("アイウエオ",     katakana,  "Katakana"),
    ("漢字",           kanji,     "Kanji"),
    ("山田 太郎",      jp_name,   "Japanese name"),
    ("ヤマダ タロウ",  furigana,  "Furigana"),
    ("ABC",            hiragana,  "Latin letters (NG)"),
]

for text, pattern, description in test_japanese:
    result = "OK" if pattern.match(text) else "NG"
    print(f"  {result}: {text:<15} -- {description}")
```

### 6.9 Numeric Format Patterns

```python
import re

# Integer (with comma separators)
integer_comma = re.compile(r'^-?(?:\d{1,3}(?:,\d{3})*|\d+)$')

# Decimal number
decimal_number = re.compile(r'^-?\d+(?:\.\d+)?$')

# Scientific notation
scientific = re.compile(r'^-?\d+(?:\.\d+)?[eE][+-]?\d+$')

# Percentage
percentage = re.compile(r'^-?\d+(?:\.\d+)?%$')

# Currency (Japanese yen)
yen = re.compile(r'^[¥￥]?\d{1,3}(?:,\d{3})*(?:\.\d{2})?$')

# Currency (US dollar)
usd = re.compile(r'^\$?\d{1,3}(?:,\d{3})*(?:\.\d{2})?$')

test_numbers = [
    ("1,234,567",     integer_comma,  "Comma-separated integer"),
    ("-42",           integer_comma,  "Negative integer"),
    ("3.14159",       decimal_number, "Decimal"),
    ("6.022e23",      scientific,     "Scientific notation"),
    ("1.5E-10",       scientific,     "Scientific notation (negative exponent)"),
    ("85.5%",         percentage,     "Percentage"),
    ("¥1,234,567",    yen,            "Japanese yen"),
    ("$99.99",        usd,            "US dollar"),
    ("1,23,456",      integer_comma,  "Invalid comma separation (NG)"),
]

for text, pattern, description in test_numbers:
    result = "OK" if pattern.match(text) else "NG"
    print(f"  {result}: {text:<20} -- {description}")
```

---

## 7. ASCII Diagrams

### 7.1 Validation Design Flow

```
User input
    |
    v
+-------------------------+
| Step 1: Format check    |
| (regex)                 |
| e.g.: is it email shape?|
| -> reject obvious typos |
+------------+------------+
             | pass
             v
+-------------------------+
| Step 2: Logical check   |
| (program logic)         |
| e.g.: does the date     |
|       actually exist?   |
| e.g.: is the value      |
|       within range?     |
+------------+------------+
             | pass
             v
+-------------------------+
| Step 3: Existence check |
| (external service)      |
| e.g.: email deliverable |
| e.g.: address API check |
+------------+------------+
             | pass
             v
        Accept input
```

### 7.2 Structure of the Email Address Pattern

```
Pattern: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$

^                              $
|                              |
|  +---- local part --------+  |
|  | [a-zA-Z0-9._%+-]+      |  |
|  | alphanumerics + . _ % + - |
|  | one or more characters |  |
|  +------------------------+  |
|              @               |
|  +---- domain part -------+  |
|  | [a-zA-Z0-9.-]+         |  |
|  | alphanumerics + . -    |  |
|  | one or more characters |  |
|  +------------------------+  |
|              .               |
|  +---- TLD ---------------+  |
|  | [a-zA-Z]{2,}           |  |
|  | letters only, 2 or more|  |
|  +------------------------+  |

Example: user.name+tag@sub.domain.co.jp
         ^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^ ^^
         local          domain         TLD
```

### 7.3 Decomposition of Each Octet in the IPv4 Pattern

```
IPv4 octet: 0 to 255

Pattern: (?:25[0-5]|2[0-4]\d|[01]?\d\d?)

Branch 1: 25[0-5]     -> 250, 251, 252, 253, 254, 255
Branch 2: 2[0-4]\d    -> 200-249
Branch 3: [01]?\d\d?  -> 0-199

The order of branches is important:
  25[0-5]  -> first check 250-255
  2[0-4]\d -> next check 200-249
  [01]?\d\d? -> finally check 0-199

If you reverse the order:
  [01]?\d\d? -> matches "25" -> "5" is left over
  -> may not match correctly
```

### 7.4 URL Structure Decomposition Diagram

```
URL structure (RFC 3986):

  https://user:pass@www.example.com:443/path/to/page?key=val&k2=v2#section
  +-+-+   +-+-+ +-----+--------+++-++----+-+------++----+-+----+
  scheme   userinfo     host     port    path         query     fragment

Regex for each component:
  scheme:    [a-zA-Z][a-zA-Z0-9+.-]*
  userinfo:  [^@]+
  host:      [a-zA-Z0-9.-]+
  port:      \d{1,5}
  path:      /[^?#]*
  query:     [^#]*
  fragment:  .*

Full decomposition pattern:
  ^(?P<scheme>[a-zA-Z][a-zA-Z0-9+.-]*)://
   (?:(?P<userinfo>[^@]+)@)?
   (?P<host>[a-zA-Z0-9.-]+)
   (?::(?P<port>\d{1,5}))?
   (?P<path>/[^?#]*)?
   (?:\?(?P<query>[^#]*))?
   (?:#(?P<fragment>.*))?$
```

### 7.5 International Comparison of Phone Number Patterns

```
Phone number formats by country:

Japan (+81):
  Mobile:        0[789]0-XXXX-XXXX     e.g.: 090-1234-5678
  Landline:      0X-XXXX-XXXX          e.g.: 03-1234-5678
  International: +81-X0-XXXX-XXXX      e.g.: +81-90-1234-5678

  Pattern: 0[789]0-?\d{4}-?\d{4}
           +-+ +-+  +----+  +----+
           mobile hyphen  4 digits 4 digits
           prefix optional

USA (+1):
  Format:        (NXX) NXX-XXXX        e.g.: (415) 555-1234
  International: +1-NXX-NXX-XXXX       e.g.: +1-415-555-1234

  Pattern: \(?[2-9]\d{2}\)?[-.\s]?[2-9]\d{2}[-.\s]?\d{4}
           +-----------+          +------+        +----+
           area code              exchange         subscriber

UK (+44):
  Mobile:        07XXX XXXXXX          e.g.: 07911 123456
  Landline:      0XX XXXX XXXX         e.g.: 020 7946 0958
  International: +44 XXXX XXXXXX       e.g.: +44 20 7946 0958
```

---

## 8. Comparison Tables

### 8.1 Pattern Accuracy vs. Complexity

| Pattern | Simple version | Practical version | Strict version | Recommended |
|---------|--------|--------|--------|------|
| Email | `.+@.+\..+` | `[a-zA-Z0-9._%+-]+@...` | RFC 5322 (thousands of chars) | Practical + delivery confirmation |
| URL | `https?://\S+` | with domain validation | full RFC 3986 compliance | Practical |
| Date | `\d{4}-\d{2}-\d{2}` | month/day range check | leap year support | Practical + datetime |
| Phone number | `[\d-+]+` | per-country/region patterns | libphonenumber | Practical or library |
| IPv4 | `\d+\.\d+\.\d+\.\d+` | 0-255 range check | full validation | Practical |

### 8.2 Regex vs. Dedicated Libraries

| Validation target | Is regex sufficient? | Recommended library |
|---------|---------------|--------------|
| Email format | Sufficient at practical level | -- |
| Email existence | Not possible | SMTP verification / confirmation email |
| URL format | Sufficient at practical level | urllib.parse (Python) |
| Date validity | Not possible (leap years, etc.) | datetime (Python) |
| Phone number | Basic format possible | libphonenumber |
| Credit card | Format possible | Luhn + payment API |
| HTML | Not possible | BeautifulSoup, lxml |
| JSON | Not possible | json.loads() |

### 8.3 Comparison of Regex Support by Language

| Feature | Python (`re`) | Python (`regex`) | JavaScript | Go | Ruby | Java |
|------|--------------|-----------------|------------|-----|------|------|
| Named groups | `(?P<name>...)` | `(?P<name>...)` | `(?<name>...)` | `(?P<name>...)` | `(?<name>...)` | `(?<name>...)` |
| Lookahead | Supported | Supported | Supported | Not supported | Supported | Supported |
| Lookbehind | Fixed-length only | Variable-length supported | Supported | Not supported | Supported | Supported |
| Unicode properties | `\p{...}` not supported | Supported | Supported | Supported | Supported | Supported |
| Recursive patterns | Not supported | Supported | Not supported | Not supported | Not supported | Not supported |
| Atomic groups | Not supported | Supported | Not supported | Not supported | Supported | Supported |
| POSIX character classes | Not supported | Supported | Not supported | Supported | Supported | Supported |

---

## 9. Anti-patterns

### 9.1 Anti-pattern: Fully Validating Dates with Regex Alone

```python
import re

# NG: trying to handle leap years in regex
# (the pattern becomes extremely complex and unmaintainable)
leap_year_pattern = r"""...(pattern of hundreds of characters)..."""

# OK: regex only checks the format; logical checks are done in code
def validate_date(s: str) -> bool:
    if not re.match(r'^\d{4}-\d{2}-\d{2}$', s):
        return False
    from datetime import datetime
    try:
        datetime.strptime(s, '%Y-%m-%d')
        return True
    except ValueError:
        return False
```

### 9.2 Anti-pattern: Copy-Pasting Patterns

```python
import re

# NG: using a pattern copy-pasted from StackOverflow as-is
# Reason: the context (language, Unicode settings) may differ
email_copied = r"(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08...]"
# -> unknown source, unmaintainable, unknown edge cases

# OK: design the pattern yourself to match your requirements and write tests
email_own = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')

# Always prepare test cases
assert email_own.match("user@example.com")
assert email_own.match("a.b+c@d.co.jp")
assert not email_own.match("user@")
assert not email_own.match("@domain.com")
```

### 9.3 Anti-pattern: Rejecting Valid Input with an Overly Strict Pattern

```python
import re

# NG: restricting the TLD to 2-3 characters
email_strict_tld = re.compile(
    r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$'
)

# With this restriction, the following valid addresses will be rejected:
rejected_valid = [
    "user@example.museum",       # .museum (6 chars)
    "user@example.photography",  # .photography (11 chars)
    "user@example.technology",   # .technology (10 chars)
    "user@example.international",# .international (13 chars)
]

for email in rejected_valid:
    result = "OK" if email_strict_tld.match(email) else "NG"
    print(f"  {result}: {email}  -- valid but rejected!")

# OK: set TLD to 2 or more characters (no upper limit)
email_flexible_tld = re.compile(
    r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
)
```

### 9.4 Anti-pattern: Parsing HTML with Regex

```python
import re

# NG: trying to parse HTML with regex
# As the famous StackOverflow answer shows, this is impossible
html = '<div class="outer"><div class="inner">text</div></div>'

# This regex cannot correctly handle nested tags
bad_tag_extract = re.compile(r'<div[^>]*>(.*?)</div>')
# -> the match ends at the first </div>, breaking the nested structure

# OK: regex can be used for limited purposes
# e.g.: extracting self-contained tags
img_tag = re.compile(r'<img\s+[^>]*src="\'["\'][^>]*/?>')
link_href = re.compile(r'<a\s+[^>]*href="\'["\'][^>]*>')

# OK: for serious HTML parsing, use a library
# from bs4 import BeautifulSoup
# soup = BeautifulSoup(html, 'html.parser')
# divs = soup.find_all('div', class_='inner')
```

### 9.5 Anti-pattern: Patterns Vulnerable to ReDoS (Regular Expression Denial of Service)

```python
import re
import time

# NG: patterns that cause catastrophic backtracking
# Using these against user input poses a DoS attack risk

vulnerable_patterns = [
    # Pattern 1: nested quantifiers
    (r'(a+)+$', 'a' * 25 + 'b'),
    # Pattern 2: overlapping character classes
    (r'([a-zA-Z]+)*@', 'a' * 25 + '!'),
    # Pattern 3: alternation with overlap
    (r'(a|aa)+$', 'a' * 25 + 'b'),
]

for pattern, evil_input in vulnerable_patterns:
    print(f"\n  Pattern: {pattern}")
    print(f"  Input:   '{evil_input[:30]}...' ({len(evil_input)} chars)")
    start = time.time()
    try:
        # Run with a timeout (in real code, set a timeout)
        re.match(pattern, evil_input[:20])  # delay is visible even with short input
        elapsed = time.time() - start
        print(f"  Time:    {elapsed:.4f}s")
        print(f"  Warning: time grows exponentially as input length increases!")
    except Exception as e:
        print(f"  Error:   {e}")

# OK: safe patterns that prevent ReDoS
safe_patterns = [
    r'[a-zA-Z]+$',          # non-nested quantifier
    r'[a-zA-Z]+@',          # remove group quantifier
    r'a+$',                 # simple quantifier
]

# Mitigations:
# 1. Avoid nested quantifiers like (a+)+
# 2. Limit input length
# 3. Use atomic groups (?>...) (only in supported languages)
# 4. Set a timeout
# 5. Consider regex engines with guarantees, such as re2
```

---

## 10. FAQ

### Q1: How strict should an email regex be?

**A**: In practice, "basic format check + sending a confirmation email" is sufficient. Full RFC 5322 compliance is discouraged for maintainability and performance reasons:

```python
# Practical criteria:
# 1. Has exactly one @
# 2. Has a local part and a domain part
# 3. The TLD is 2 or more characters
# -> Anything beyond this is guaranteed by the confirmation email
```

### Q2: What is the most easily overlooked case in URL validation?

**A**: The following cases are easy to miss:

- **Internationalized Domain Names (IDN)**: `https://日本語.jp` -- Punycode conversion required
- **Port numbers**: `http://localhost:3000`
- **Authentication info**: `http://user:pass@host.com` -- security risk
- **Fragment**: `https://example.com/page#section`
- **Encoded query parameters**: `?q=%E6%97%A5%E6%9C%AC`

Using a library (`urllib.parse`, `URL` API) is recommended.

### Q3: What is the recommended approach for international phone number support?

**A**: Using Google's **libphonenumber** is the best option. Phone number rules vary by country and change frequently, so handling them completely with regex is impractical:

```python
# pip install phonenumbers
import phonenumbers

number = phonenumbers.parse("+819012345678", None)
print(phonenumbers.is_valid_number(number))  # => True
print(phonenumbers.format_number(
    number,
    phonenumbers.PhoneNumberFormat.INTERNATIONAL
))
# => '+81 90-1234-5678'
```

### Q4: How can I improve regex pattern performance?

**A**: The following techniques are effective:

```python
import re

# 1. Compile patterns and reuse them
# NG: compiling inside the loop every iteration
for line in lines:
    if re.match(r'^\d{4}-\d{2}-\d{2}', line):  # compiles every time
        pass

# OK: compile in advance
date_pattern = re.compile(r'^\d{4}-\d{2}-\d{2}')
for line in lines:
    if date_pattern.match(line):  # reuse compiled pattern
        pass

# 2. Avoid unnecessary capture groups
# NG: grouping when capture is not needed
pattern_capture = re.compile(r'(https?)://([\w.]+)')

# OK: use non-capturing groups
pattern_noncapture = re.compile(r'(?:https?)://(?:[\w.]+)')

# 3. Put more specific patterns first
# NG: generic pattern first
pattern_slow = re.compile(r'.*error.*fatal')

# OK: start with anchors or specific characters
pattern_fast = re.compile(r'^.*?error.*?fatal', re.MULTILINE)

# 4. Minimize quantifiers
# NG: greedy matching
greedy = re.compile(r'<.*>')       # longest match

# OK: lazy matching (depending on use case)
lazy = re.compile(r'<.*?>')       # shortest match
```

### Q5: What is the difference between input sanitization and regex validation?

**A**: They serve different purposes; neither alone is sufficient:

```python
import re
import html

user_input = '<script>alert("XSS")</script>Hello, World!'

# Validation: judge whether input is in an acceptable format
# -> reject invalid input
is_safe = bool(re.match(r'^[a-zA-Z0-9\s,.!?]+$', user_input))
print(f"Validation: {'OK' if is_safe else 'NG'}")
# => NG (contains HTML tags)

# Sanitization: remove or neutralize dangerous elements from input
# -> transform input into a safe form
sanitized = html.escape(user_input)
print(f"After sanitization: {sanitized}")
# => &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;Hello, World!

# To strip tags entirely
stripped = re.sub(r'<[^>]+>', '', user_input)
print(f"After tag removal: {stripped}")
# => alert("XSS")Hello, World!

# Iron rules:
# 1. First, reject invalid input via validation
# 2. Sanitize the passing input for safe handling
# 3. Also escape on output (defense in depth)
```

### Q6: Should I do numeric range checks with regex?

**A**: Generally, do them in code. Range checks via regex are less readable and bug-prone:

```python
import re

# NG: expressing the 0-255 range with regex (IPv4 example)
# It works but is hard to read and maintain
range_regex = re.compile(r'^(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$')

# OK: regex only checks "is a digit string"; do range in code
def validate_range(value_str: str, min_val: int, max_val: int) -> bool:
    if not re.match(r'^\d+$', value_str):
        return False
    value = int(value_str)
    return min_val <= value <= max_val

# Guidelines:
# - Simple range (0-9, 0-99, etc.) -> regex is fine
# - Complex range (0-255, 1-366, etc.) -> handle in code
# - Well-known patterns like IPv4 -> regex (because they are widely known)
```

### Q7: How should I design test cases?

**A**: Combine boundary value testing with equivalence partitioning:

```python
import re

def create_test_cases(pattern_name: str, pattern: re.Pattern) -> list:
    """Test case design guidelines for regex patterns"""

    # Test case categories:
    categories = {
        "Normal (typical)":        "the most common input",
        "Normal (boundary)":       "input at the pattern's boundary",
        "Normal (minimum)":        "the shortest matching input",
        "Normal (maximum)":        "the longest matching input",
        "Abnormal (format viol.)": "obviously non-matching input",
        "Abnormal (boundary)":     "non-matching input near the boundary",
        "Abnormal (empty)":        "empty string",
        "Abnormal (special)":      "control chars, Unicode, newlines, etc.",
    }
    return categories

# Example: email address test cases
email_pattern = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')

test_matrix = [
    # (input, expected, category)
    ("user@example.com",          True,  "Normal (typical)"),
    ("a@b.cd",                    True,  "Normal (minimum)"),
    ("a" * 64 + "@example.com",   True,  "Normal (near boundary)"),
    ("user.name+tag@domain.co.jp",True,  "Normal (special chars)"),

    ("",                          False, "Abnormal (empty)"),
    ("user",                      False, "Abnormal (no @)"),
    ("user@",                     False, "Abnormal (no domain)"),
    ("@domain.com",               False, "Abnormal (no local part)"),
    ("user@domain",               False, "Abnormal (no TLD)"),
    ("user @domain.com",          False, "Abnormal (contains space)"),
    ("user@domain.c",             False, "Abnormal (TLD 1 char)"),
]

print(f"Email pattern tests ({len(test_matrix)} cases):")
all_passed = True
for email, expected, category in test_matrix:
    result = bool(email_pattern.match(email))
    passed = result == expected
    if not passed:
        all_passed = False
    status = "PASS" if passed else "FAIL"
    display = email if email else "(empty string)"
    print(f"  {status}: {display:<40} -- {category}")

print(f"\nResult: {'All tests passed' if all_passed else 'Some tests failed'}")
```

---

## 11. Practical Scenarios

### 11.1 Bulk Validation of Form Input

This shows a comprehensive validation function for use in real-world web forms.

```python
import re
from dataclasses import dataclass
from typing import Optional

@dataclass
class ValidationResult:
    field: str
    valid: bool
    value: str
    error: Optional[str] = None

class FormValidator:
    """Bulk validation of form input"""

    PATTERNS = {
        "email": re.compile(
            r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        ),
        "phone_jp": re.compile(
            r'^(?:0[789]0-?\d{4}-?\d{4}|0\d{1,4}-?\d{1,4}-?\d{4})$'
        ),
        "postal_jp": re.compile(r'^\d{3}-?\d{4}$'),
        "date_iso": re.compile(
            r'^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$'
        ),
        "url": re.compile(r'^https?://[^\s<>"]+$'),
        "username": re.compile(r'^[a-zA-Z][a-zA-Z0-9_-]{2,19}$'),
    }

    MESSAGES = {
        "email":     "Please enter a valid email address",
        "phone_jp":  "Please enter a valid phone number (e.g., 090-1234-5678)",
        "postal_jp": "Please enter a valid postal code (e.g., 100-0001)",
        "date_iso":  "Please enter a valid date (e.g., 2026-01-01)",
        "url":       "Please enter a valid URL",
        "username":  "Please enter 3-20 alphanumeric characters (must start with a letter)",
    }

    def validate_field(
        self, field_name: str, value: str, field_type: str, required: bool = True
    ) -> ValidationResult:
        """Validate a single field"""
        if not value.strip():
            if required:
                return ValidationResult(field_name, False, value, "This field is required")
            return ValidationResult(field_name, True, value)

        pattern = self.PATTERNS.get(field_type)
        if pattern and not pattern.match(value.strip()):
            return ValidationResult(
                field_name, False, value,
                self.MESSAGES.get(field_type, "Invalid input format")
            )

        return ValidationResult(field_name, True, value)

    def validate_form(self, form_data: dict, schema: dict) -> list:
        """Validate the entire form"""
        results = []
        for field_name, config in schema.items():
            value = form_data.get(field_name, "")
            result = self.validate_field(
                field_name, value,
                config["type"],
                config.get("required", True)
            )
            results.append(result)
        return results


# Usage example
validator = FormValidator()

form_data = {
    "name":    "山田太郎",
    "email":   "yamada@example.com",
    "phone":   "090-1234-5678",
    "postal":  "100-0001",
    "website": "https://yamada.example.com",
}

schema = {
    "email":   {"type": "email",     "required": True},
    "phone":   {"type": "phone_jp",  "required": True},
    "postal":  {"type": "postal_jp", "required": True},
    "website": {"type": "url",       "required": False},
}

results = validator.validate_form(form_data, schema)
for r in results:
    status = "OK" if r.valid else "NG"
    print(f"  {status}: {r.field:<10} = {r.value}")
    if r.error:
        print(f"         Error: {r.error}")
```

### 11.2 Structured Parsing of Log Files

```python
import re
from datetime import datetime
from collections import defaultdict

# Parser for the Apache Combined Log Format
apache_log = re.compile(
    r'(?P<ip>\d+\.\d+\.\d+\.\d+)\s+'           # client IP
    r'(?P<ident>\S+)\s+'                         # identd
    r'(?P<user>\S+)\s+'                          # username
    r'\[(?P<datetime>[^\]]+)\]\s+'               # datetime
    r'"(?P<method>GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)\s+'  # HTTP method
    r'(?P<path>\S+)\s+'                          # request path
    r'(?P<protocol>HTTP/\d\.\d)"\s+'             # protocol
    r'(?P<status>\d{3})\s+'                      # status code
    r'(?P<size>\d+|-)\s+'                        # response size
    r'"(?P<referer>[^"]*)"\s+'                   # referer
    r'"(?P<useragent>[^"]*)"'                    # user agent
)

sample_logs = [
    '192.168.1.100 - admin [11/Feb/2026:14:30:00 +0900] "GET /dashboard HTTP/1.1" 200 5432 "https://example.com/" "Mozilla/5.0"',
    '10.0.0.50 - - [11/Feb/2026:14:30:01 +0900] "POST /api/users HTTP/1.1" 201 128 "-" "curl/7.68.0"',
    '203.0.113.42 - - [11/Feb/2026:14:30:02 +0900] "GET /admin/login HTTP/1.1" 401 0 "-" "Python-urllib/3.9"',
    '192.168.1.100 - admin [11/Feb/2026:14:30:03 +0900] "DELETE /api/users/42 HTTP/1.1" 204 0 "https://example.com/admin" "Mozilla/5.0"',
]

stats = defaultdict(int)
for line in sample_logs:
    m = apache_log.match(line)
    if m:
        data = m.groupdict()
        status_class = f"{data['status'][0]}xx"
        stats[status_class] += 1
        print(f"  {data['method']:>6} {data['path']:<25} "
              f"{data['status']} from {data['ip']}")

print("\nStatus aggregation:")
for status_class, count in sorted(stats.items()):
    print(f"  {status_class}: {count} entries")
```

### 11.3 Parsing Configuration Files

```python
import re

# INI-format configuration file parser
section_pattern = re.compile(r'^\[([^\]]+)\]$')
kv_pattern = re.compile(r'^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+?)\s*$')
comment_pattern = re.compile(r'^\s*[;#]')
empty_pattern = re.compile(r'^\s*$')

ini_content = """
; Database settings
[database]
host = localhost
port = 5432
name = myapp_production
user = dbadmin
password = s3cret!

# Application settings
[application]
debug = false
log_level = INFO
max_connections = 100
timeout = 30

[email]
smtp_host = smtp.example.com
smtp_port = 587
from_address = noreply@example.com
"""

config = {}
current_section = None

for line in ini_content.strip().split('\n'):
    # Skip empty lines and comments
    if empty_pattern.match(line) or comment_pattern.match(line):
        continue

    # Section header
    section_match = section_pattern.match(line)
    if section_match:
        current_section = section_match.group(1)
        config[current_section] = {}
        continue

    # key=value
    kv_match = kv_pattern.match(line)
    if kv_match and current_section:
        key, value = kv_match.groups()
        config[current_section][key] = value

# Display results
for section, values in config.items():
    print(f"\n  [{section}]")
    for key, value in values.items():
        print(f"    {key} = {value}")
```

### 11.4 CSV Field Extraction (with Quote Support)

```python
import re

# Regex-based CSV field parsing
# Supports quoted fields (which may contain commas)
csv_field = re.compile(
    r'(?:'
    r'"([^"]*(?:""[^"]*)*)"'   # quoted field (supports "" escape)
    r'|'
    r'([^,]*)'                  # unquoted field
    r')'
)

def parse_csv_line(line: str) -> list:
    """Decompose a CSV line into a list of fields"""
    fields = []
    for m in csv_field.finditer(line):
        quoted = m.group(1)
        unquoted = m.group(2)
        if quoted is not None:
            # Convert "" -> "
            fields.append(quoted.replace('""', '"'))
        elif unquoted is not None:
            fields.append(unquoted)
    return fields

test_csv_lines = [
    'John,Doe,30,New York',
    '"Smith, Jr.",Jane,25,"Los Angeles, CA"',
    'Alice,"She said ""hello""",28,Tokyo',
]

for line in test_csv_lines:
    fields = parse_csv_line(line)
    print(f"\n  Input: {line}")
    for i, field in enumerate(fields):
        print(f"    [{i}] {field}")

# Note: for serious CSV parsing, use the csv module
# import csv
# reader = csv.reader(io.StringIO(line))
```

---

## 12. Performance Optimization

### 12.1 Pattern Compilation and Reuse

```python
import re
import time

# Benchmark: precompiled vs. compiled each time
test_data = ["user@example.com"] * 10000

# Method 1: call re.match() each iteration (uses internal cache)
start = time.time()
for email in test_data:
    re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email)
method1_time = time.time() - start

# Method 2: use a precompiled pattern
pattern = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
start = time.time()
for email in test_data:
    pattern.match(email)
method2_time = time.time() - start

print(f"  re.match() each time: {method1_time:.4f}s")
print(f"  Precompiled:          {method2_time:.4f}s")
print(f"  Speed ratio:          {method1_time / method2_time:.1f}x")

# Note: Python's re module caches recently used patterns internally,
# so the difference is small, but using precompiled patterns is best practice
```

### 12.2 Efficient Matching on Large Datasets

```python
import re
from typing import Iterator

def efficient_search(pattern: re.Pattern, lines: Iterator[str]) -> list:
    """Efficient regex search for large data sets"""
    results = []

    # Use match() rather than search() (faster for anchored matches)
    # Use search() only when leading match is not needed

    for line in lines:
        m = pattern.match(line)
        if m:
            results.append(m.group())
    return results

# Process line-by-line without loading the whole file
def search_large_file(filepath: str, pattern: re.Pattern):
    """Search a large file line-by-line (memory-efficient)"""
    with open(filepath, 'r', encoding='utf-8') as f:
        for line_num, line in enumerate(f, 1):
            m = pattern.search(line)
            if m:
                yield (line_num, m.group(), line.rstrip())

# Bulk matching of multiple patterns
def multi_pattern_search(patterns: dict, text: str) -> dict:
    """Search multiple patterns in one pass"""
    # Combine individual patterns with | so a single match suffices
    combined = '|'.join(f'(?P<{name}>{pat.pattern})'
                        for name, pat in patterns.items())
    combined_re = re.compile(combined)

    results = {}
    for m in combined_re.finditer(text):
        for name in patterns:
            if m.group(name):
                results.setdefault(name, []).append(m.group(name))
    return results
```

---


## FAQ

### Q1: What is the most important point in learning this topic?

Gaining hands-on experience is the most important thing. Beyond theory, writing actual code and verifying behavior deepens your understanding.

### Q2: What mistakes do beginners commonly make?

Skipping the fundamentals and jumping to advanced topics. We recommend firmly understanding the basic concepts explained in this guide before moving on to the next step.

### Q3: How is this used in practice?

The knowledge in this topic is frequently applied in everyday development work. It is especially important during code reviews and architecture design.

---

## Summary

| Pattern | Practical regex | Additional validation |
|---------|-------------|---------|
| Email | `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$` | Send confirmation email |
| URL | `https?://[^\s<>"]+` | `urllib.parse` / `URL` API |
| ISO date | `\d{4}-(0[1-9]\|1[0-2])-(0[1-9]\|[12]\d\|3[01])` | Parse with datetime |
| Phone (Japan) | `0[789]0-?\d{4}-?\d{4}` | libphonenumber |
| IPv4 | `(?:25[0-5]\|2[0-4]\d\|[01]?\d\d?)\.{4 parts}` | `ipaddress` module |
| Postal code (Japan) | `\d{3}-?\d{4}` | API verification |
| Username | `^[a-zA-Z][a-zA-Z0-9_-]{2,19}$` | Duplicate check (DB) |
| UUID v4 | `^[0-9a-f]{8}-...-[0-9a-f]{12}$` | Library validation |
| Color code | `^#[0-9a-fA-F]{3,8}$` | CSS parser |
| Iron rule | Regex is for format only. Logical and existence checks belong to code/libraries |

### Reaffirming Design Principles

```
+--------------------------------------------------------------+
|        Five Principles of Regex Pattern Design                |
|                                                              |
|  1. Principle of necessary sufficiency                       |
|     Avoid being overly strict; stay at a practical level     |
|     The regex's job is to "reject obviously invalid input"   |
|                                                              |
|  2. Principle of defense in depth                            |
|     Validate in three stages: regex -> logic -> external     |
|     Don't load all responsibility onto one layer             |
|                                                              |
|  3. Principle of testability                                 |
|     Always prepare test cases for your patterns              |
|     Cover normal, abnormal, and boundary cases               |
|                                                              |
|  4. Principle of maintainability                             |
|     Don't use unreadable patterns                            |
|     Express intent with comments and named groups            |
|                                                              |
|  5. Principle of safety                                      |
|     Consider ReDoS risk                                      |
|     Set input length limits for user input                   |
+--------------------------------------------------------------+
```

## Recommended Next Reading

- [02-text-processing.md](./02-text-processing.md) -- Text processing (sed/awk/grep)
- [03-regex-alternatives.md](./03-regex-alternatives.md) -- Alternatives to regular expressions

## References

1. **RFC 5322** "Internet Message Format" https://tools.ietf.org/html/rfc5322 -- Official specification of email addresses
2. **RFC 3986** "Uniform Resource Identifier (URI): Generic Syntax" https://tools.ietf.org/html/rfc3986 -- Official specification of URIs
3. **Google libphonenumber** https://github.com/google/libphonenumber -- The de facto standard library for phone number validation
4. **OWASP Input Validation Cheat Sheet** https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html -- Security best practices for input validation
5. **Regular Expression Denial of Service (ReDoS)** https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS -- Explanation and mitigation of ReDoS attacks
6. **Python re module documentation** https://docs.python.org/3/library/re.html -- Python standard library regex reference
7. **regex101.com** https://regex101.com/ -- Online regex testing and debugging tool



===== SOURCE: 02-programming/regex-and-text-processing/docs/02-practical/02-text-processing.md =====

# Text Processing -- sed/awk/grep, Log Parsing, CSV

> Unix text processing tools (grep, sed, awk) represent the most practical applications of regular expressions. Through log parsing, CSV processing, and building data transformation pipelines, this chapter systematically explains how to leverage regular expressions on the command line.

## What You Will Learn

1. **Regex syntax of grep/sed/awk and how to choose between them** -- Each tool's strengths and how to select the right one
2. **Building log parsing pipelines** -- Practical workflows for extraction, aggregation, and formatting
3. **Regex approaches to CSV/TSV processing and their limits** -- The scope of regex applicability for structured data
4. **Integration with modern tools** -- Combined usage with ripgrep, miller, jq, and more
5. **Best practices in production** -- Techniques that balance performance, safety, and maintainability


## Prerequisites

For deeper understanding of this guide, the following knowledge is helpful:

- Basic programming knowledge
- Understanding of related foundational concepts
- Familiarity with the content of [Common Patterns -- Email, URL, Date, Phone Number](./01-common-patterns.md)

---

## 1. grep -- Pattern Search

### 1.1 Basic Usage

```bash
# Basic search: display lines matching the pattern
grep 'ERROR' /var/log/syslog

# -E: use extended regular expressions (ERE)
grep -E 'ERROR|WARN' /var/log/syslog

# -i: ignore case
grep -i 'error' /var/log/syslog

# -n: show line numbers
grep -n 'ERROR' /var/log/syslog

# -c: count matching lines
grep -c 'ERROR' /var/log/syslog

# -v: show non-matching lines (invert)
grep -v 'DEBUG' /var/log/syslog

# -o: show only the matched part
grep -oE '\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}' access.log

# -A/-B/-C: show surrounding context lines
grep -A 3 'ERROR' /var/log/syslog    # 3 lines after
grep -B 2 'ERROR' /var/log/syslog    # 2 lines before
grep -C 2 'ERROR' /var/log/syslog    # 2 lines before and after
```

### 1.2 grep's Regex Options

```bash
# BRE (Basic Regular Expression) -- default
# Metacharacters + ? | ( ) { } require escaping
grep 'hello\(world\)' file.txt
grep 'a\{3\}' file.txt

# ERE (Extended Regular Expression) -- -E option
# Metacharacters can be used directly (recommended)
grep -E 'hello(world)' file.txt
grep -E 'a{3}' file.txt

# PCRE (Perl Compatible) -- -P option (GNU grep)
# Lookahead, lookbehind, \d etc. are available
grep -P '(?<=\$)\d+' file.txt
grep -P '\d+(?=円)' file.txt

# Fixed-string search -- -F option (fast)
# Does not use regex (metacharacters are literal)
grep -F '*.txt' file.txt    # search "*" as a literal
```

### 1.3 Practical grep Patterns

```bash
# Extract IP addresses
grep -oE '\b([0-9]{1,3}\.){3}[0-9]{1,3}\b' access.log

# Extract email addresses
grep -oE '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' contacts.txt

# Specific HTTP status codes
grep -E 'HTTP/[0-9.]+" (4[0-9]{2}|5[0-9]{2})' access.log

# Filter by date range
grep -E '2026-02-(1[0-9]|2[0-9])' logfile.txt

# AND of multiple conditions (chained via pipes)
grep 'ERROR' logfile.txt | grep 'database' | grep -v 'timeout'
```

### 1.4 Recursive Search and File Selection

```bash
# -r: recursively search a directory
grep -r 'TODO' /path/to/project/

# -l: show only matching file names
grep -rl 'deprecated' src/

# --include: specify target files by pattern
grep -rn 'import' --include='*.py' src/

# --exclude: exclude specific files
grep -rn 'password' --exclude='*.log' --exclude='*.bak' .

# --exclude-dir: exclude specific directories
grep -rn 'API_KEY' --exclude-dir=node_modules --exclude-dir=.git .

# -L: show file names that did NOT match
grep -rL 'Copyright' --include='*.py' src/
```

### 1.5 Controlling grep Output and Formatting

```bash
# --color=auto: highlight matched portions
grep --color=auto 'ERROR' logfile.txt

# -H/-h: show/hide file names
grep -H 'ERROR' *.log    # with file name (default for multiple files)
grep -h 'ERROR' *.log    # without file name

# -w: word-boundary match (prevents partial matches)
grep -w 'error' logfile.txt    # matches "error" but not "errors"

# -x: only match lines that match the pattern entirely
grep -x 'OK' status.txt

# -m: limit the number of matches
grep -m 5 'ERROR' huge.log    # stop after the first 5 hits

# -q: no output (for use in conditional scripts)
if grep -q 'ERROR' logfile.txt; then
    echo "An error has been detected"
fi

# Combination of --count and --files-with-matches
grep -rl 'TODO' src/ | xargs grep -c 'TODO' | sort -t: -k2 -rn | head -10
# -> Ranking of files with the most TODOs
```

### 1.6 Performance Tuning grep and Regex

```bash
# -F (fixed strings) is faster than regex
# Always use -F when regex is unnecessary
grep -F 'NullPointerException' huge.log

# LC_ALL=C speeds up processing (avoids locale overhead)
LC_ALL=C grep 'ERROR' huge.log

# Control line buffering
grep --line-buffered 'ERROR' /var/log/syslog    # for real-time monitoring

# Handling binary files
grep -a 'pattern' binary_file       # treat binary as text
grep -I 'pattern' mixed_files       # skip binary files

# Parallel search of many files (xargs + grep)
find /var/log -name '*.log' -print0 | xargs -0 -P 4 grep -l 'ERROR'
# -P 4: run with 4 parallel processes
```

---

## 2. sed -- Stream Editing

### 2.1 Basic Usage

```bash
# Substitution: s/pattern/replacement/
sed 's/old/new/' file.txt          # replace first match per line
sed 's/old/new/g' file.txt         # replace all matches (global)
sed 's/old/new/gi' file.txt        # ignore case

# Deletion: d
sed '/^#/d' file.txt               # delete comment lines
sed '/^$/d' file.txt               # delete empty lines
sed '1,5d' file.txt                # delete lines 1-5

# Line targeting
sed '3s/old/new/' file.txt         # replace only on line 3
sed '1,10s/old/new/g' file.txt     # replace within lines 1-10
sed '/ERROR/s/old/new/g' file.txt  # replace only on lines containing ERROR

# In-place editing (-i)
sed -i 's/old/new/g' file.txt      # modify file directly (GNU)
sed -i '' 's/old/new/g' file.txt   # macOS (backup extension required)
sed -i.bak 's/old/new/g' file.txt  # with backup
```

### 2.2 Advanced sed Patterns

```bash
# Capture groups and backreferences
# Date format conversion: YYYY-MM-DD -> DD/MM/YYYY
sed -E 's/([0-9]{4})-([0-9]{2})-([0-9]{2})/\3\/\2\/\1/g' dates.txt

# Strip HTML tags
sed 's/<[^>]*>//g' page.html

# Add to start/end of line
sed 's/^/PREFIX: /' file.txt       # prepend
sed 's/$/ SUFFIX/' file.txt        # append

# Run multiple substitutions in sequence
sed -e 's/foo/bar/g' -e 's/baz/qux/g' file.txt

# Extract lines between patterns
sed -n '/START/,/END/p' file.txt   # output from START to END

# Odd/even lines
sed -n '1~2p' file.txt             # only odd lines (GNU sed)
sed -n '2~2p' file.txt             # only even lines (GNU sed)

# Whitespace normalization
```

### 2.3 sed Script Examples

```bash
# Cleansing a log file
sed -E '
    /^$/d                          # delete empty lines
    s/\t/  /g                      # tabs to 2 spaces
    s/([0-9]{4})-([0-9]{2})-([0-9]{2})/\1年\2月\3日/g  # date conversion
' logfile.txt
```

### 2.4 Advanced Operations Using sed's Hold Space

```bash
# Hold space: sed's secondary buffer
# Pattern space: the line currently being processed (used most often)
# Hold space: storage area for cross-line processing

# h: pattern space -> hold space (copy)
# H: pattern space -> hold space (append)
# g: hold space -> pattern space (copy)
# G: hold space -> pattern space (append)
# x: swap pattern space and hold space

# Reverse the order of lines
sed -n '1!G;h;$p' file.txt

# Collapse consecutive empty lines into one
sed '/^$/N;/^\n$/d' file.txt

# Join every two lines
sed 'N;s/\n/ /' file.txt

# Delete lines between patterns (keep START and END themselves)
sed '/START/,/END/{/START/!{/END/!d}}' file.txt

# Insert a line before a pattern
sed '/TARGET/i\--- inserted here ---' file.txt

# Append a line after a pattern
sed '/TARGET/a\--- appended here ---' file.txt

# Complex processing with labels and branching
# Join consecutive lines into one (handling backslash-continued lines)
sed -E ':loop; /\\$/{ N; s/\\\n/ /; b loop }' file.txt
```

### 2.5 Practical Examples of File Transformation with sed

```bash
# Convert INI file to JSON-like
# Input: [section]
#         key=value
sed -E '
    /^\[.*\]$/ {
        s/\[(.*)\]/"\1": {/
    }
    /^[^[#].*=/ {
        s/^([^=]+)=(.*)$/  "\1": "\2",/
    }
    /^$/d
' config.ini

# Convert Markdown headings to HTML
sed -E '
    s/^### (.*)$/<h3>\1<\/h3>/
    s/^## (.*)$/<h2>\1<\/h2>/
    s/^# (.*)$/<h1>\1<\/h1>/
    s/\*\*([^*]+)\*\*/<strong>\1<\/strong>/g
    s/\*([^*]+)\*/<em>\1<\/em>/g
' document.md

# Change values in a specific section of a config file
sed -E '/^\[database\]$/,/^\[/ {
    s/^(host\s*=\s*).*/\1db.production.example.com/
    s/^(port\s*=\s*).*/\15432/
}' config.ini

# Mask a CSV column value (mask the third column)
sed -E 's/^([^,]+,[^,]+,)[^,]+(.*)/\1****\2/' data.csv

# Bulk replacement across multiple files (with safe backup)
find src/ -name '*.py' -exec sed -i.bak -E \
    's/from old_module import/from new_module import/g' {} +
# Delete backups after verification
find src/ -name '*.py.bak' -delete

# Mask personal information in log files
sed -E '
    s/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/[EMAIL MASKED]/g
    s/\b[0-9]{3}-[0-9]{4}-[0-9]{4}\b/[PHONE MASKED]/g
    s/\b[0-9]{1,3}(\.[0-9]{1,3}){3}\b/[IP MASKED]/g
' sensitive.log > sanitized.log
```

---

## 3. awk -- Pattern Scanning and Processing

### 3.1 Basic Usage

```bash
# Field extraction (default separator: whitespace)
awk '{print $1}' file.txt          # 1st field
awk '{print $1, $3}' file.txt      # 1st and 3rd fields
awk '{print $NF}' file.txt         # last field
awk '{print NR, $0}' file.txt      # with line number

# Specifying the separator
awk -F',' '{print $1, $2}' data.csv      # CSV
awk -F'\t' '{print $1, $2}' data.tsv     # TSV
awk -F':' '{print $1, $3}' /etc/passwd   # colon-separated

# Pattern matching
awk '/ERROR/ {print}' logfile.txt           # lines containing ERROR
awk '/^2026-02-11/ {print}' logfile.txt     # filter by date
awk '$3 > 100 {print $1, $3}' data.txt     # 3rd field > 100

# Regex matching
awk '$2 ~ /^ERR/ {print}' logfile.txt       # 2nd field starts with ERR
awk '$2 !~ /DEBUG/ {print}' logfile.txt     # 2nd field is not DEBUG
```

### 3.2 awk's Aggregation Features

```bash
# Line count
awk 'END {print NR}' file.txt

# Sum
awk '{sum += $3} END {print "Sum:", sum}' data.txt

# Average
awk '{sum += $3; n++} END {print "Average:", sum/n}' data.txt

# Max/min
awk 'NR==1 || $3 > max {max=$3} END {print "Max:", max}' data.txt

# Group-wise aggregation
awk '{count[$1]++} END {for (k in count) print k, count[k]}' access.log

# Unique count
awk '!seen[$0]++' file.txt         # remove duplicate lines (preserves order)
```

### 3.3 Using Regex in awk

```bash
# Split fields by regex
awk -F'[,;|]' '{print $1, $2}' data.txt

# Extract substring with the match() function
awk '{
    if (match($0, /[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
        print substr($0, RSTART, RLENGTH)
    }
}' logfile.txt

# Substitution with gsub()
awk '{gsub(/ERROR/, "***ERROR***"); print}' logfile.txt

# Processing multiple patterns
awk '
    /ERROR/  {errors++}
    /WARN/   {warns++}
    /INFO/   {infos++}
    END {
        print "ERROR:", errors+0
        print "WARN:",  warns+0
        print "INFO:",  infos+0
    }
' logfile.txt
```

### 3.4 awk Built-in Variables and Advanced Features

```bash
# Key built-in variables
# NR:   current line number (cumulative across all input)
# NF:   number of fields in the current line
# FNR:  current line number within the current file
# FS:   input field separator
# OFS:  output field separator
# RS:   record separator
# ORS:  output record separator
# FILENAME: name of the file currently being processed

# Control output format using OFS
awk -F',' 'BEGIN {OFS="\t"} {print $1, $2, $3}' data.csv
# Convert CSV -> TSV

# Change record separator (paragraph-level processing)
awk 'BEGIN {RS=""; FS="\n"} {print NR": "$1}' paragraphs.txt
# Process each paragraph separated by blank lines

# Processing multiple files and using FNR
awk 'FNR==1 {print "=== " FILENAME " ==="} {print}' file1.txt file2.txt

# Formatted output with printf
awk '{printf "%-20s %10d %8.2f\n", $1, $2, $3}' data.txt

# Complex aggregation using associative arrays
awk -F',' '{
    category = $1
    amount = $3
    total[category] += amount
    count[category]++
}
END {
    for (cat in total) {
        avg = total[cat] / count[cat]
        printf "%-15s Total: %10.0f  Avg: %8.0f  Count: %d\n", cat, total[cat], avg, count[cat]
    }
}' sales.csv
```

### 3.5 Practical awk Programming Techniques

```bash
# Generate a histogram with awk
awk '{
    len = length($0)
    bucket = int(len / 10) * 10
    hist[bucket]++
}
END {
    for (b in hist) {
        printf "%3d-%3d: ", b, b+9
        for (i = 0; i < hist[b]; i++) printf "#"
        printf " (%d)\n", hist[b]
    }
}' file.txt

# Top-N aggregation in awk (without sorting)
awk '{
    count[$1]++
}
END {
    # Get top 5
    for (i = 1; i <= 5; i++) {
        max_val = 0; max_key = ""
        for (k in count) {
            if (count[k] > max_val) {
                max_val = count[k]; max_key = k
            }
        }
        if (max_key != "") {
            printf "%5d %s\n", max_val, max_key
            delete count[max_key]
        }
    }
}' access.log

# Sliding window (moving average) in awk
awk '{
    window[NR % 5] = $1
    if (NR >= 5) {
        sum = 0
        for (i in window) sum += window[i]
        printf "%d: %.2f\n", NR, sum / 5
    }
}' numbers.txt

# JOIN two files with awk
awk -F',' '
    NR==FNR { lookup[$1] = $2; next }
    { print $0, ($1 in lookup) ? lookup[$1] : "N/A" }
' master.csv detail.csv

# Session analysis of a transaction log with awk
awk '
    /session_start/ {
        match($0, /session_id=([^ ]+)/, arr)
        sid = arr[1]
        start_time[sid] = $1
    }
    /session_end/ {
        match($0, /session_id=([^ ]+)/, arr)
        sid = arr[1]
        if (sid in start_time) {
            duration = $1 - start_time[sid]
            total_duration += duration
            session_count++
            if (duration > max_duration) max_duration = duration
        }
    }
    END {
        printf "Sessions: %d\n", session_count
        printf "Average duration: %.2fs\n", total_duration / session_count
        printf "Max duration: %.2fs\n", max_duration
    }
' transaction.log
```

---

## 4. Log Parsing Pipelines

### 4.1 Parsing Apache Access Logs

```bash
# Apache Combined Log Format:
# 192.168.1.1 - - [11/Feb/2026:10:30:45 +0900] "GET /path HTTP/1.1" 200 1234

# Top IP addresses (by request count)
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10

# Counts by HTTP status code
awk '{print $9}' access.log | sort | uniq -c | sort -rn

# Extract URLs of 404 errors
awk '$9 == 404 {print $7}' access.log | sort | uniq -c | sort -rn

# Access counts by hour
awk -F'[\\[:]' '{print $3}' access.log | sort | uniq -c

# Total response size
awk '{sum += $10} END {printf "Total: %.2f MB\n", sum/1024/1024}' access.log

# Slow requests (response time at or above threshold)
awk '$NF > 1000 {print $7, $NF "ms"}' access.log | sort -t' ' -k2 -rn | head -10
```

### 4.2 Parsing Application Logs

```bash
# JSON logs (combined with jq)
# {"timestamp":"2026-02-11T10:30:45","level":"ERROR","message":"..."}

# Extract ERROR-level logs
grep '"level":"ERROR"' app.log | head -20

# Extract fields with jq
grep '"level":"ERROR"' app.log | jq -r '.timestamp + " " + .message'

# Pattern parsing of plain text logs
# [2026-02-11 10:30:45] [ERROR] [module] message

# Error counts by hour
grep -E '\[ERROR\]' app.log | \
    grep -oE '\d{2}:\d{2}' | \
    awk -F: '{print $1":00"}' | \
    sort | uniq -c | sort -rn

# Top 10 error messages
grep -E '\[ERROR\]' app.log | \
    sort | uniq -c | sort -rn | head -10
```

### 4.3 Real-Time Log Monitoring

```bash
# Real-time monitoring with tail -f + grep
tail -f /var/log/syslog | grep --color=auto -E 'ERROR|WARN'

# Watch multiple files at once
tail -f /var/log/*.log | grep --color=auto -E 'ERROR|CRITICAL'

# Real-time aggregation with awk
tail -f access.log | awk '
    {
        status[$9]++
        if (NR % 100 == 0) {
            for (s in status) printf "%s: %d  ", s, status[s]
            print ""
        }
    }
'
```

### 4.4 Advanced Nginx Log Analysis

```bash
# Example Nginx log format:
# $remote_addr - $remote_user [$time_local] "$request" $status $body_bytes_sent
# "$http_referer" "$http_user_agent" $request_time

# Show distribution of request times as a histogram
awk '{
    time = $NF
    if (time < 0.1) bucket = "0-0.1s"
    else if (time < 0.5) bucket = "0.1-0.5s"
    else if (time < 1.0) bucket = "0.5-1.0s"
    else if (time < 5.0) bucket = "1.0-5.0s"
    else bucket = "5.0s+"
    count[bucket]++
}
END {
    order[1] = "0-0.1s"; order[2] = "0.1-0.5s"; order[3] = "0.5-1.0s"
    order[4] = "1.0-5.0s"; order[5] = "5.0s+"
    for (i = 1; i <= 5; i++) {
        b = order[i]
        printf "%-12s %6d ", b, count[b]+0
        for (j = 0; j < count[b] / 100; j++) printf "#"
        print ""
    }
}' access.log

# Access breakdown by user agent
awk -F'"' '{print $6}' access.log | \
    sed -E 's/([^ ]+).*/\1/' | \
    sort | uniq -c | sort -rn | head -10

# Inbound traffic analysis by referer
awk -F'"' '$4 !~ /^-$/ && $4 !~ /^$/ {print $4}' access.log | \
    awk -F'/' '{print $1"//"$3}' | \
    sort | uniq -c | sort -rn | head -10

# Time-series of 5xx errors (per minute)
awk '$9 >= 500 {
    match($0, /\[([0-9]+\/[A-Za-z]+\/[0-9]+:[0-9]+:[0-9]+)/, arr)
    print arr[1]
}' access.log | \
    sort | uniq -c | \
    awk '{printf "%s %5d ", $2, $1; for(i=0;i<$1;i++) printf "*"; print ""}'

# P50/P90/P99 response times for a specific endpoint
awk '$7 == "/api/users" {print $NF}' access.log | \
    sort -n | awk '
    {vals[NR] = $1}
    END {
        n = NR
        printf "Count: %d\n", n
        printf "P50: %.3fs\n", vals[int(n*0.50)]
        printf "P90: %.3fs\n", vals[int(n*0.90)]
        printf "P99: %.3fs\n", vals[int(n*0.99)]
        printf "Max: %.3fs\n", vals[n]
    }'
```

### 4.5 Compound Log Parsing Pipelines

```bash
# Auto-generate a report from access logs
cat > /tmp/log_report.sh << 'SCRIPT'
#!/bin/bash
LOG_FILE=${1:-/var/log/nginx/access.log}
echo "=== Log Analysis Report ==="
echo "Target: $LOG_FILE"
echo "Generated: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

echo "--- Total requests ---"
wc -l < "$LOG_FILE"
echo ""

echo "--- By status code ---"
awk '{print $9}' "$LOG_FILE" | sort | uniq -c | sort -rn
echo ""

echo "--- Top 10 IP addresses ---"
awk '{print $1}' "$LOG_FILE" | sort | uniq -c | sort -rn | head -10
echo ""

echo "--- Top 10 URLs ---"
awk '{print $7}' "$LOG_FILE" | sort | uniq -c | sort -rn | head -10
echo ""

echo "--- Access counts by hour ---"
awk -F'[\\[:]' '{print $3":00"}' "$LOG_FILE" | sort | uniq -c | \
    awk '{printf "%s %5d ", $2, $1; for(i=0;i<$1/50;i++) printf "#"; print ""}'
echo ""

echo "--- Error rate ---"
awk '
    {total++; if ($9 >= 400) errors++}
    END {printf "Total: %d, Errors: %d, Error rate: %.2f%%\n", total, errors+0, (errors+0)*100/total}
' "$LOG_FILE"
SCRIPT
chmod +x /tmp/log_report.sh

# Analyzing systemd journal logs
journalctl -u nginx --since "1 hour ago" --no-pager | \
    grep -E 'error|warn' -i | \
    awk '{print $1, $2, $3}' | \
    sort | uniq -c | sort -rn

# Combine multiple days of logs and analyze
zcat /var/log/nginx/access.log.*.gz | \
    cat - /var/log/nginx/access.log | \
    awk '$9 == 500 {print $7}' | \
    sort | uniq -c | sort -rn | head -20
```

### 4.6 Security Log Analysis

```bash
# Detect SSH brute-force attempts
grep 'Failed password' /var/log/auth.log | \
    awk '{print $(NF-3)}' | \
    sort | uniq -c | sort -rn | head -20

# Signs of malicious access (SQL injection attempts)
grep -iE "(union\+select|or\+1=1|drop\+table|;--)" access.log | \
    awk '{print $1, $7}' | sort | uniq -c | sort -rn

# Analyzing blocked requests from WAF logs
grep 'BLOCKED' waf.log | \
    awk -F'|' '{print $3}' | \    # attack category
    sort | uniq -c | sort -rn

# Anomaly detection of login attempts (many attempts from a single IP in a short time)
awk '/login_attempt/ {
    # Extract timestamp and IP
    match($0, /ip=([0-9.]+)/, ip_arr)
    match($0, /\[([0-9:]+)\]/, time_arr)
    ip = ip_arr[1]
    attempts[ip]++
}
END {
    for (ip in attempts) {
        if (attempts[ip] > 10) {
            printf "Suspicious IP: %-15s  Attempts: %d\n", ip, attempts[ip]
        }
    }
}' auth.log

# File access auditing (auditd logs)
grep 'type=SYSCALL' /var/log/audit/audit.log | \
    grep -E 'syscall=(2|257)' | \
    awk -F' ' '{
        for (i=1; i<=NF; i++) {
            if ($i ~ /^comm=/) comm = $i
            if ($i ~ /^uid=/) uid = $i
        }
        print uid, comm
    }' | sort | uniq -c | sort -rn | head -20
```

---

## 5. CSV Processing

### 5.1 Basic CSV Processing

```bash
# Simple CSV (without quotes)
# name,age,city
# Alice,30,Tokyo
# Bob,25,Osaka

# Extract specific columns
awk -F',' '{print $1, $3}' data.csv

# Conditional filtering
awk -F',' '$2 > 25 {print}' data.csv

# Reorder columns
awk -F',' '{print $3","$1","$2}' data.csv

# Process with header
awk -F',' 'NR==1 {print; next} $2 > 25 {print}' data.csv
```

### 5.2 Issues with Quoted CSV

```
Problems with CSV:
+------------------------------------------------+
| When a field contains a comma:                 |
|   "Tokyo, Japan",30,engineer                   |
|                                                |
| When a field contains quotes:                  |
|   "He said ""hello""",30,engineer              |
|                                                |
| When a field contains newlines:                |
|   "Line 1                                      |
|   Line 2",30,engineer                          |
|                                                |
| -> Cannot be processed correctly with regex    |
|    alone!                                      |
| -> Use a dedicated parser                      |
+------------------------------------------------+
```

```python
# Correct CSV processing in Python
import csv
import re

# BAD: split CSV with regex
def parse_csv_bad(line):
    return line.split(',')  # breaks on commas inside quotes

# GOOD: use the csv module
with open('data.csv', 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)

# When regex is useful: processing each field of a CSV
with open('data.csv', 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        # Apply regex per field
        for field in row:
            if re.match(r'\d{4}-\d{2}-\d{2}', field):
                print(f"  Date field: {field}")
```

### 5.3 Advanced CSV Processing with csvkit and miller

```bash
# === Using csvkit ===

# csvlook: display CSV in a readable table format
csvlook data.csv

# csvcut: column extraction (can specify by column name)
csvcut -c name,age data.csv
csvcut -c 1,3 data.csv              # indexes also work

# csvgrep: grep over CSV (handles quotes correctly)
csvgrep -c status -m 'active' data.csv
csvgrep -c age -r '^[3-4][0-9]$' data.csv  # regex is supported too

# csvsort: sort a CSV
csvsort -c age -r data.csv           # sort by age column descending

# csvstat: display statistics
csvstat data.csv

# csvjoin: JOIN two CSVs
csvjoin -c user_id users.csv orders.csv

# csvsql: run SQL queries over CSV
csvsql --query "SELECT name, AVG(score) as avg_score \
    FROM data GROUP BY name HAVING avg_score > 80" data.csv

# csvformat: format conversion
csvformat -T data.csv                # CSV -> TSV
csvformat -D '|' data.csv           # CSV -> pipe-separated

# === Using miller (mlr) ===

# Basic filtering
mlr --csv filter '$age > 25' data.csv

# Column selection
mlr --csv cut -f name,city data.csv

# Renaming columns
mlr --csv rename name,full_name data.csv

# Group-wise aggregation
mlr --csv stats1 -a mean,count -f age -g city data.csv

# Sorting
mlr --csv sort-by -nr age data.csv

# Format conversion
mlr --icsv --ojson cat data.csv          # CSV -> JSON
mlr --icsv --opprint cat data.csv        # CSV -> pretty table
mlr --ijson --ocsv cat data.json         # JSON -> CSV

# Complex transformation pipeline
mlr --csv \
    filter '$status == "active"' \
    then sort-by -nr revenue \
    then head -n 10 \
    then put '$revenue_formatted = format_values($revenue, "%,.0f")' \
    data.csv

# Time-series data processing
mlr --csv \
    put '$date = strftime(strptime($timestamp, "%Y-%m-%d %H:%M:%S"), "%Y-%m-%d")' \
    then group-by date \
    then stats1 -a sum,mean -f amount \
    transactions.csv
```

### 5.4 Processing TSV/Fixed-Width/Other Formats

```bash
# TSV processing
awk -F'\t' '{print $1, $3}' data.tsv
awk -F'\t' 'BEGIN{OFS=","} {print $1,$2,$3}' data.tsv > data.csv

# Fixed-width record processing
# Example: name (20 chars), age (3 chars), city (15 chars)
awk '{
    name = substr($0, 1, 20)
    age  = substr($0, 21, 3)
    city = substr($0, 24, 15)
    printf "%s,%s,%s\n", name, age+0, city
}' fixed_width.dat

# Processing LTSV (Labeled Tab-Separated Values)
# host:127.0.0.1\tident:-\tuser:-\ttime:[10/Oct/2000:13:55:36 -0700]
awk -F'\t' '{
    for (i=1; i<=NF; i++) {
        split($i, kv, ":")
        fields[kv[1]] = substr($i, length(kv[1])+2)
    }
    print fields["host"], fields["status"], fields["size"]
}' access.ltsv

# Convert Apache logs to CSV
sed -E 's/^([^ ]+) [^ ]+ [^ ]+ \[([^\]]+)\] "([^"]+)" ([0-9]+) ([0-9]+|-)/\1,\2,\3,\4,\5/' access.log

# Convert JSON Lines to CSV
jq -r '[.timestamp, .level, .message] | @csv' app.jsonl > app.csv
```

---

## 6. ASCII Diagrams

### 6.1 Choosing Between grep/sed/awk

```
Tool selection by use case:

Text search (line filtering)
  -> grep
  grep 'ERROR' log.txt

Text replacement (line-level transformation)
  -> sed
  sed 's/old/new/g' file.txt

Field processing (column extraction/aggregation)
  -> awk
  awk -F',' '{print $1, $3}' data.csv

+----------+------------+----------+----------+
| Operation| grep       | sed      | awk      |
+----------+------------+----------+----------+
| Search   | ***        | *        | **       |
| Replace  | -          | ***      | **       |
| Extract  | ** (-o)    | *        | ***      |
| Aggregate| -          | -        | ***      |
| Filter   | ***        | **       | ***      |
| Transform| -          | ***      | ***      |
+----------+------------+----------+----------+
```

### 6.2 Pipeline Structure

```
A typical log analysis pipeline:

access.log
    |
    v
+--------+   lines containing  +--------+
|  grep  | ------ ERROR -----> |  awk   |
| 'ERROR'|                     | '{$1}' |
+--------+                     +---+----+
                                   | IP address column
                                   v
                              +--------+
                              |  sort  |
                              +---+----+
                                  | sorted
                                  v
                              +--------+
                              | uniq -c|
                              +---+----+
                                  | with counts
                                  v
                              +----------+
                              |sort -rn  |
                              | head -10 |
                              +----------+
                                  |
                                  v
                              Top 10 IPs
```

### 6.3 Syntax Differences Between BRE / ERE / PCRE

```
Different ways to write the same pattern:

"3 or more digits"
  BRE:  [0-9]\{3,\}        (braces require escaping)
  ERE:  [0-9]{3,}          (as is)
  PCRE: \d{3,}             (\d is available)

"cat or dog"
  BRE:  cat\|dog           (pipe requires escaping)
  ERE:  cat|dog            (as is)
  PCRE: cat|dog            (as is)

"group + backreference"
  BRE:  \(hello\) \1       (parentheses require escaping)
  ERE:  (hello) \1         (parens as is, reference is \1)
  PCRE: (hello) \1         (parens as is, reference is \1)

Tool support:
  grep:       BRE (default), ERE (-E), PCRE (-P)
  sed:        BRE (default), ERE (-E)
  awk:        ERE (default)
```

### 6.4 Big-Picture Data Flow of Text Processing

```
The overall architecture of a text processing pipeline:

[Input source]                    [Processing pipeline]                [Output]

 Log file -----+              +--> grep (filter) --+              +--> file
               |              |                    |              |
 stdin -------+  -> select ---+--> sed  (transform)+--> format ---+--> stdout
               |              |                    |              |
 Network -----+              +--> awk  (aggregate)-+              +--> pipe
               |
 Compressed --+
   (zcat/zgrep)

Example data transformation flows:

 Raw JSON log                          Structured data
 ------------                          ----------------
 {"ts":"...",     extract              CSV/TSV
  "level":"ERR",  fields with    -->   aggregate/   --> report
  "msg":"..."}    jq                   analyze with mlr

 Apache log                            Statistics
 -----------                           -----------
 192.168.1.1 -    extract              sort |
 [date] "GET      fields with    -->   uniq -c   --> ranking
 /path" 200       awk                  sort -rn
```

---

## 7. Comparison Tables

### 7.1 Tool Characteristics

| Trait | grep | sed | awk |
|-------|------|-----|-----|
| Primary use | Pattern search | Stream editing | Field processing |
| Regex flavor | BRE/ERE/PCRE | BRE/ERE | ERE |
| Line operations | Filter | Transform | Transform + aggregate |
| Fields | None | Limited | Powerful |
| Computation | None | None | Yes |
| Variables | None | Hold space | Arrays/variables |
| Speed | Fastest | Fast | Somewhat slower |
| Learning curve | Low | Medium | High |

### 7.2 Modern Alternatives

| Traditional tool | Modern alternative | Features |
|------------------|--------------------|----------|
| grep | ripgrep (rg) | Fast, .gitignore aware, Unicode support |
| sed | sd | Simple syntax, PCRE support |
| awk | miller (mlr) | Native CSV/JSON/TSV support |
| find + grep | fd + rg | Fast, intuitive UI |
| cat + grep | bat | Syntax highlighting |
| -- | jq | Specialized JSON processing |
| -- | xsv/qsv | Specialized CSV processing |

### 7.3 Recommended Tool Choice by Use Case

| Use case | Best tool | Reason |
|----------|-----------|--------|
| Source code search | ripgrep (rg) | Honors .gitignore, recursive by default |
| Real-time log monitoring | tail -f + grep | Simple, lightweight |
| Log aggregation/statistics | awk | Built-in arithmetic |
| Bulk config file changes | sed -i | In-place editing |
| CSV aggregation | miller (mlr) | Native CSV support |
| JSON log analysis | jq | Native JSON support |
| Massive parallel data processing | GNU parallel + grep | Faster via parallelism |
| Structured log conversion | awk + jq | Field extraction + structured transformation |
| Searching binary files | grep -a / strings | Binary-aware modes |
| Multibyte string processing | grep -P / rg | Unicode support |

---

## 8. Anti-Patterns

### 8.1 Anti-Pattern: Processing CSV with Regex Alone

```bash
# BAD: split on commas (breaks on commas inside quotes)
awk -F',' '{print $2}' data.csv
# Input: "Tokyo, Japan",30 -> $2 = " Japan" (broken)

# GOOD: use a dedicated tool
# csvkit
csvcut -c 2 data.csv

# Miller
mlr --csv cut -f name data.csv

# Python
python3 -c "
import csv, sys
for row in csv.reader(sys.stdin):
    print(row[1])
" < data.csv
```

### 8.2 Anti-Pattern: Inefficient Pipelines on Huge Files

```bash
# BAD: inefficient (scans the file multiple times)
ERROR_COUNT=$(grep -c 'ERROR' huge.log)
WARN_COUNT=$(grep -c 'WARN' huge.log)
INFO_COUNT=$(grep -c 'INFO' huge.log)
# -> reads the file 3 times

# GOOD: count everything in a single pass
awk '
    /ERROR/ {e++}
    /WARN/  {w++}
    /INFO/  {i++}
    END {
        print "ERROR:", e+0
        print "WARN:",  w+0
        print "INFO:",  i+0
    }
' huge.log
# -> reads the file only once
```

### 8.3 Anti-Pattern: Useless Use of Cat

```bash
# BAD: useless cat (UUOC)
cat file.txt | grep 'ERROR'
cat file.txt | awk '{print $1}'
cat file.txt | sed 's/old/new/g'

# GOOD: pass the file directly as an argument
grep 'ERROR' file.txt
awk '{print $1}' file.txt
sed 's/old/new/g' file.txt

# GOOD: use redirection
grep 'ERROR' < file.txt
```

### 8.4 Anti-Pattern: Writing Complex Logic in sed

```bash
# BAD: heavy use of branches/loops in sed (hard to maintain)
sed -E '
    :start
    /\\$/ {
        N
        s/\\\n/ /
        b start
    }
    /^#/d
    /^$/d
    s/([^=]+)=([^;]+);?/\1 = "\2"\n/g
' complex_config.txt

# GOOD: write clearly with Python or awk
awk '
    /\\$/ {
        # join backslash-continued lines
        line = line substr($0, 1, length($0)-1)
        next
    }
    {
        line = line $0
        # exclude comments and empty lines
        if (line !~ /^#/ && line != "") {
            print line
        }
        line = ""
    }
' complex_config.txt
```

### 8.5 Anti-Pattern: Overconfidence in Regex-Based Validation

```bash
# BAD: try to do "complete" email validation with regex
# An RFC 5322 compliant email regex is thousands of characters long
grep -E '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' emails.txt
# -> this is only a rough check (does not handle IDN domains, etc.)

# GOOD: rough check + validation with a dedicated library
# narrow with grep -> strictly validate with a dedicated library
grep -E '@.*\.' emails.txt | python3 -c "
import sys
from email_validator import validate_email, EmailNotValidError
for line in sys.stdin:
    email = line.strip()
    try:
        validate_email(email)
        print(f'VALID: {email}')
    except EmailNotValidError as e:
        print(f'INVALID: {email} ({e})')
"
```

### 8.6 Anti-Pattern: Not Inspecting Intermediate Pipeline Results

```bash
# BAD: write a long pipeline at once without debugging
awk -F',' '{print $3}' data.csv | sed 's/"//g' | sort | uniq -c | sort -rn | head -5

# GOOD: inspect intermediate results with the tee command
awk -F',' '{print $3}' data.csv | \
    tee /dev/stderr | \           # send intermediate result to stderr
    sed 's/"//g' | \
    tee /tmp/debug_step2.txt | \  # also save to a file
    sort | uniq -c | sort -rn | head -5

# GOOD: build the pipeline incrementally
# Step 1: verify awk output
awk -F',' '{print $3}' data.csv | head -5
# Step 2: add sed
awk -F',' '{print $3}' data.csv | sed 's/"//g' | head -5
# Step 3: add sort and aggregation
awk -F',' '{print $3}' data.csv | sed 's/"//g' | sort | uniq -c | sort -rn | head -5
```


---

## Practical Exercises

### Exercise 1: Basic Implementation

Implement code that satisfies the following requirements.

**Requirements:**
- Validate input data
- Implement appropriate error handling
- Also write test code

```python
# Exercise 1: template for the basic implementation
class Exercise1:
    """Exercise on basic implementation patterns"""

    def __init__(self):
        self.data = []

    def validate_input(self, value):
        """Validate the input value"""
        if value is None:
            raise ValueError("Input value is None")
        return True

    def process(self, value):
        """Main logic for data processing"""
        self.validate_input(value)
        self.data.append(value)
        return self.data

    def get_results(self):
        """Get processing results"""
        return {
            'count': len(self.data),
            'data': self.data
        }

# Tests
def test_exercise1():
    ex = Exercise1()
    assert ex.process(1) == [1]
    assert ex.process(2) == [1, 2]
    assert ex.get_results()['count'] == 2

    try:
        ex.process(None)
        assert False, "An exception should be raised"
    except ValueError:
        pass

    print("All tests passed!")

test_exercise1()
```

### Exercise 2: Advanced Patterns

Extend the basic implementation by adding the following features.

```python
# Exercise 2: advanced patterns
from typing import List, Dict, Optional
from datetime import datetime

class AdvancedExercise:
    """Exercise on advanced patterns"""

    def __init__(self, max_size: int = 100):
        self._items: List[Dict] = []
        self._max_size = max_size
        self._created_at = datetime.now()

    def add(self, key: str, value: any) -> bool:
        """Add an item (with size limit)"""
        if len(self._items) >= self._max_size:
            return False
        self._items.append({
            'key': key,
            'value': value,
            'timestamp': datetime.now().isoformat()
        })
        return True

    def find(self, key: str) -> Optional[Dict]:
        """Search by key"""
        for item in reversed(self._items):
            if item['key'] == key:
                return item
        return None

    def remove(self, key: str) -> bool:
        """Remove by key"""
        for i, item in enumerate(self._items):
            if item['key'] == key:
                self._items.pop(i)
                return True
        return False

    def stats(self) -> Dict:
        """Statistics"""
        return {
            'total_items': len(self._items),
            'max_size': self._max_size,
            'usage_percent': len(self._items) / self._max_size * 100,
            'uptime': str(datetime.now() - self._created_at)
        }

# Tests
def test_advanced():
    ex = AdvancedExercise(max_size=3)
    assert ex.add("a", 1) == True
    assert ex.add("b", 2) == True
    assert ex.add("c", 3) == True
    assert ex.add("d", 4) == False  # size limit
    assert ex.find("b")['value'] == 2
    assert ex.remove("b") == True
    assert ex.find("b") is None
    stats = ex.stats()
    assert stats['total_items'] == 2
    print("All advanced tests passed!")

test_advanced()
```

### Exercise 3: Performance Optimization

Improve the performance of the following code.

```python
# Exercise 3: performance optimization
import time
from functools import lru_cache

# Before optimization (O(n^2))
def slow_search(data: list, target: int) -> int:
    """Inefficient search"""
    for i in range(len(data)):
        for j in range(i + 1, len(data)):
            if data[i] + data[j] == target:
                return (i, j)
    return (-1, -1)

# After optimization (O(n))
def fast_search(data: list, target: int) -> tuple:
    """Efficient search using a hash map"""
    seen = {}
    for i, num in enumerate(data):
        complement = target - num
        if complement in seen:
            return (seen[complement], i)
        seen[num] = i
    return (-1, -1)

# Benchmark
def benchmark():
    import random
    data = list(range(5000))
    random.shuffle(data)
    target = data[100] + data[4000]

    start = time.time()
    result1 = slow_search(data, target)
    slow_time = time.time() - start

    start = time.time()
    result2 = fast_search(data, target)
    fast_time = time.time() - start

    print(f"Inefficient: {slow_time:.4f}s")
    print(f"Efficient:   {fast_time:.6f}s")
    print(f"Speedup:     {slow_time/fast_time:.0f}x")

benchmark()
```

**Key points:**
- Be aware of algorithmic complexity
- Choose the right data structures
- Measure the effect with benchmarks
---

## 9. FAQ

### Q1: What is the difference between grep -E and egrep?

**A**: They are functionally identical. `egrep` is an alias for `grep -E`, but it has been deprecated in POSIX.1-2008. Use `grep -E`. Likewise, prefer `grep -F` over `fgrep`.

### Q2: Does sed's `-i` option behave differently between GNU and macOS (BSD)?

**A**: **Yes, it differs.** GNU sed works with just `-i`, but BSD sed (macOS) requires an empty extension argument such as `-i ''`:

```bash
# GNU (Linux):
sed -i 's/old/new/g' file.txt

# BSD (macOS):
sed -i '' 's/old/new/g' file.txt

# Works on both:
sed -i.bak 's/old/new/g' file.txt && rm file.txt.bak
```

### Q3: Can awk use regex capture group backreferences?

**A**: POSIX awk does not support backreferences to capture groups. Use the `match()` function and `substr()` instead:

```bash
# POSIX awk: match + substr
awk '{
    if (match($0, /([0-9]+)-([0-9]+)/, arr)) {
        print arr[1], arr[2]
    }
}' file.txt
# Note: the third (array) argument is GNU awk (gawk) only

# gawk: array captures
gawk 'match($0, /([0-9]+)-([0-9]+)/, a) {print a[1], a[2]}' file.txt
```

### Q4: Should I use ripgrep (rg) or grep?

**A**: For new projects, **ripgrep is recommended**. Reasons:

- Honors `.gitignore` by default
- Recursive search by default
- Full Unicode support
- Several times faster on large repositories
- Supports PCRE2 (lookahead, etc.)

```bash
# Basic usage of ripgrep
rg 'ERROR' .                      # recursive search (default)
rg -i 'error' --type py           # only Python files
rg 'pattern' -g '*.log'           # specify files via glob
rg -P '(?<=\$)\d+' .              # PCRE2 (lookahead/lookbehind)
```

### Q5: Tips for processing very large log files (tens of GB)?

**A**: Combine the following approaches:

```bash
# 1. Use LC_ALL=C to skip locale processing (2-3x speedup)
LC_ALL=C grep 'ERROR' huge.log

# 2. Early termination with grep -m
LC_ALL=C grep -m 1000 'ERROR' huge.log    # stop after the first 1000 hits

# 3. Parallel processing with GNU parallel
parallel --pipepart -a huge.log --block 100M grep 'ERROR'

# 4. split + parallel for chunked processing
split -l 1000000 huge.log /tmp/chunk_
ls /tmp/chunk_* | parallel "grep -c 'ERROR' {}" | awk '{sum+=$1} END{print sum}'

# 5. Direct processing of compressed files
zgrep 'ERROR' huge.log.gz           # search inside gzip
bzgrep 'ERROR' huge.log.bz2        # search inside bzip2
xzgrep 'ERROR' huge.log.xz         # search inside xz

# 6. Cases where awk is more efficient than grep
# When handling multiple conditions in a single pass, awk wins
awk '/ERROR/{e++} /WARN/{w++} END{print e+0, w+0}' huge.log
```

### Q6: How do I correctly process multibyte characters (e.g., Japanese) with grep/sed/awk?

**A**: Pay attention to locale settings and character encoding:

```bash
# Check locale
locale

# Search Japanese in a UTF-8 environment
grep '東京' data.txt

# Be careful with character classes (locale-dependent)
grep '[a-zA-Z]' data.txt        # ASCII only

# Replace Japanese in sed
sed 's/東京都/東京/g' addresses.txt

# Process Japanese in awk
awk '/東京/ {count++} END {print count+0}' data.txt

# Combine with character encoding conversion
# Convert Shift_JIS -> UTF-8 before processing
iconv -f SHIFT_JIS -t UTF-8 sjis_file.txt | grep 'パターン'

# Encoding conversion with nkf
nkf -w sjis_file.txt | grep 'パターン'
```

### Q7: When awk scripts get long, should I move them to a file?

**A**: For awk scripts longer than 10 lines, **moving them to a file is recommended**:

```bash
# awk script file: analyze.awk
cat > analyze.awk << 'AWK'
BEGIN {
    FS = ","
    OFS = "\t"
    print "Category", "Count", "Total", "Average"
}
NR > 1 {
    category = $1
    amount = $3
    count[category]++
    total[category] += amount
}
END {
    for (cat in count) {
        avg = total[cat] / count[cat]
        printf "%-15s\t%d\t%.0f\t%.0f\n", cat, count[cat], total[cat], avg
    }
}
AWK

# Run
awk -f analyze.awk data.csv

# Benefits:
# - Easier to put under version control
# - Editor syntax highlighting works
# - Testable
# - Easy to reuse
```

### Q8: Should I use sed or perl -pe?

**A**: For basic substitutions, prefer sed; for complex patterns, prefer perl -pe:

```bash
# Examples where sed is sufficient
sed 's/old/new/g' file.txt
sed '/pattern/d' file.txt

# Examples where perl -pe is more appropriate
# Zero-width assertions (lookahead/lookbehind)
perl -pe 's/(?<=\$)\d+/XXX/g' file.txt

# Non-greedy match
perl -pe 's/<.*?>/[TAG]/g' file.html

# Multiline match
perl -0pe 's/start.*?end/REPLACED/gs' file.txt

# Substitution with computed values
perl -pe 's/(\d+)/sprintf("%05d", $1)/ge' file.txt
```

---

## 10. Real-World Scenarios

### 10.1 Log Analysis for Incident Investigation

```bash
# Scenario: 500 errors are spiking on a web app; investigate the cause

# Step 1: check error frequency over time
awk '$9 == 500 {
    match($0, /\[([0-9]+\/[A-Za-z]+\/[0-9]+:[0-9]+:[0-9]+)/, arr)
    print arr[1]
}' access.log | sort | uniq -c | tail -20

# Step 2: identify which endpoints are erroring
awk '$9 == 500 {print $7}' access.log | sort | uniq -c | sort -rn | head -10

# Step 3: check IP addresses of error requests (is it an attack from a specific IP?)
awk '$9 == 500 {print $1}' access.log | sort | uniq -c | sort -rn | head -10

# Step 4: cross-reference with the application log
# Use timestamps from access.log to find corresponding errors in app.log
awk '$9 == 500 {
    match($4, /([0-9]+:[0-9]+:[0-9]+)/, arr)
    print arr[1]
}' access.log | head -5 | while read ts; do
    grep "$ts" app.log | grep -i 'error\|exception\|traceback'
done

# Step 5: classify root causes by pattern
grep -A 5 'ERROR' app.log | \
    grep -E 'Exception|Error' | \
    sed -E 's/^.*: //' | \
    sort | uniq -c | sort -rn | head -10
```

### 10.2 Pre-Deployment Code Quality Check

```bash
# List TODO/FIXME/HACK
rg -n 'TODO|FIXME|HACK|XXX' --type py src/ | \
    awk -F: '{printf "%-40s %s: %s\n", $1, $2, $3}'

# Detect debug print statements
rg -n '^\s*(print\(|console\.log|System\.out\.print)' src/

# Detect hardcoded credentials
rg -in '(password|secret|api_key|token)\s*=\s*["\x27][^"\x27]+["\x27]' \
    --type py --type js --type ts src/

# Detect unused imports (Python)
for f in $(find src/ -name '*.py'); do
    awk '
        /^import / { modules[$2] = NR }
        /^from .* import / {
            split($0, a, "import ")
            split(a[2], b, ",")
            for (i in b) {
                modules[b[i]] = NR
            }
        }
        !/^import |^from / {
            for (m in modules) {
                if (index($0, m) > 0) delete modules[m]
            }
        }
        END {
            for (m in modules) print FILENAME":"modules[m]": unused import: "m
        }
    ' "$f"
done

# Detect overly long lines
awk 'length > 120 {printf "%s:%d: line length %d chars\n", FILENAME, NR, length}' src/*.py
```

### 10.3 Pre-Processing for Data Migration

```bash
# Scenario: migrate CSV data from a legacy system to a new system

# Step 1: get an overview of the data
head -1 old_system.csv                    # check the header
wc -l old_system.csv                      # number of rows
awk -F',' '{print NF}' old_system.csv | sort -u  # check field counts

# Step 2: data quality checks
# Detect empty fields
awk -F',' '{
    for (i=1; i<=NF; i++) {
        if ($i == "" || $i == "NULL" || $i == "null") {
            empty[i]++
        }
    }
    total++
}
END {
    for (i in empty) {
        printf "Column %d: %d empty (%.1f%%)\n", i, empty[i], empty[i]*100/total
    }
}' old_system.csv

# Step 3: unify date formats
sed -E '
    # MM/DD/YYYY -> YYYY-MM-DD
    s,([0-9]{2})/([0-9]{2})/([0-9]{4}),\3-\1-\2,g
    # DD-Mon-YYYY -> YYYY-MM-DD (simplified)
    s/Jan/01/g; s/Feb/02/g; s/Mar/03/g; s/Apr/04/g
    s/May/05/g; s/Jun/06/g; s/Jul/07/g; s/Aug/08/g
    s/Sep/09/g; s/Oct/10/g; s/Nov/11/g; s/Dec/12/g
' old_system.csv > normalized_dates.csv

# Step 4: normalize phone numbers
sed -E '
    s/\+81-?/0/g           # international -> domestic
    s/[()-]//g              # remove punctuation
    s/([0-9]{3})([0-9]{4})([0-9]{4})/\1-\2-\3/g  # insert hyphens
' normalized_dates.csv > normalized_phones.csv

# Step 5: detect duplicate records
awk -F',' 'NR>1 {
    key = $1","$2","$3    # treat name+email+phone as the dedup key
    if (key in seen) {
        print "Duplicate: line "seen[key]" and line "NR": "$0
    } else {
        seen[key] = NR
    }
}' old_system.csv
```

---


## FAQ

### Q1: What is the most important point when learning this topic?

Gaining hands-on experience is most important. Beyond theory, your understanding deepens when you actually write code and verify how it behaves.

### Q2: What mistakes do beginners commonly make?

Skipping the basics and jumping into advanced material. We recommend solidly grasping the foundational concepts described in this guide before moving on to the next step.

### Q3: How is this used in real-world work?

Knowledge of this topic is frequently used in everyday development. It is especially important during code reviews and architectural design.

---

## Summary

| Item | Description |
|------|-------------|
| grep | The fundamental tool for pattern search; leverage -E (ERE) and -P (PCRE) |
| sed | Stream-based substitution/deletion/transformation; use -E for ERE |
| awk | Field processing and aggregation; pattern match with regex |
| Pipelines | Combining `grep \| awk \| sort \| uniq -c` is powerful |
| CSV | Regex alone is insufficient; combine with dedicated tools (csvkit, miller) |
| Log analysis | Aggregate multiple metrics in a single pass for efficiency |
| Modern alternatives | ripgrep, sd, miller speed up the traditional tools |
| Performance | Handle large data with LC_ALL=C, the -F option, and parallel |
| Safety | Always edit with backups and build pipelines incrementally |

## What to Read Next

- [03-regex-alternatives.md](./03-regex-alternatives.md) -- Alternatives to regular expressions
- [../01-advanced/03-performance.md](../01-advanced/03-performance.md) -- Performance optimization

## References

1. **Dale Dougherty & Arnold Robbins** "sed & awk, 2nd Edition" O'Reilly, 1997 -- the classic on sed/awk
2. **GNU Grep Manual** https://www.gnu.org/software/grep/manual/ -- official reference for GNU grep
3. **The AWK Programming Language** Aho, Kernighan, Weinberger, 2024 (2nd Edition) -- revised edition by the original authors of awk
4. **ripgrep** https://github.com/BurntSushi/ripgrep -- a modern grep alternative
5. **Miller (mlr)** https://miller.readthedocs.io/ -- Swiss Army knife for CSV/JSON/TSV processing
6. **csvkit** https://csvkit.readthedocs.io/ -- command-line toolkit for CSV processing
7. **jq Manual** https://stedolan.github.io/jq/manual/ -- the standard tool for JSON processing
8. **GNU Parallel** https://www.gnu.org/software/parallel/ -- a tool for running commands in parallel



===== SOURCE: 02-programming/regex-and-text-processing/docs/02-practical/03-regex-alternatives.md =====

# Alternatives to Regular Expressions

> Master alternative approaches to text analysis tasks where regex falls short, including parser combinators, PEG, and structured text processing

## What You Will Learn

1. **Limits of regex** -- Why recursive structures, nesting, and context-sensitive grammars cannot be handled
2. **Parser combinators** -- Composing small parsers to analyze complex grammars
3. **PEG and practical tools** -- Properties of Parsing Expression Grammar and tools like tree-sitter
4. **ANTLR and yacc/bison** -- Full-fledged language processing with parser generators
5. **Dedicated parsers for structured data** -- Practical processing techniques for JSON, HTML, XML, YAML, etc.
6. **Leveraging tree-sitter** -- Practical use of incremental parsers


## Prerequisites

Reading the following beforehand will deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts
- Familiarity with the content of [Text Processing -- sed/awk/grep, Log Analysis, CSV](./02-text-processing.md)

---

## 1. Limits of Regular Expressions

```
Chomsky Hierarchy and Corresponding Parsers
=================================

Type 0: Phrase structure grammar    <-- Turing machine
Type 1: Context-sensitive grammar  <-- Linear bounded automaton
Type 2: Context-free grammar       <-- Pushdown automaton ★
Type 3: Regular grammar            <-- Finite automaton (regex)

What regex cannot handle:
  - Matching parentheses:  ((()))     ★ Context-free grammar
  - Nested HTML: <div><div></div></div>
  - Programming language syntax
  - Recursive structures in general

Things you should NOT do with regex:
  - Parsing HTML/XML
  - Parsing JSON
  - Parsing programming languages
  - Matching nested parentheses
```

### 1.1 Concrete Examples Showing the Limits of Regex

```python
import re

# [NG] Parsing HTML with regex
html = '<div class="outer"><div class="inner">text</div></div>'
# This regex cannot handle nesting
pattern = r'<div[^>]*>(.*?)</div>'
matches = re.findall(pattern, html)
# Expected: contents of inner div -> Actual: incorrect result due to shortest match

# [OK] Use a dedicated parser
from html.parser import HTMLParser
# Or BeautifulSoup, lxml, etc.

# [NG] Parsing JSON with regex
json_str = '{"key": {"nested": [1, 2, 3]}}'
# Recursive structures are impossible with regex

# [OK] Use the json module
import json
data = json.loads(json_str)
```

### 1.2 Typical Cases Where Regex Fails

```python
import re

# Case 1: Matching nested parentheses
# Regex cannot recognize matching parenthesis pairs
text = "f(g(x, y), h(z))"
# Correctly extracting "the entire arguments of f" is impossible
# The following yields incorrect results
match = re.search(r'f\((.+)\)', text)
# match.group(1) = "g(x, y), h(z)" -- happens to be correct, but the next case fails
text2 = "f(g(x), y) + f(a)"
match2 = re.search(r'f\((.+)\)', text2)
# match2.group(1) = "g(x), y) + f(a" -- broken (greedy match)

# Case 2: Handling escapes inside string literals
code = 'print("He said \\"hello\\"", end="")'
# Regex makes it difficult to accurately extract strings containing escaped quotes
# The following is inaccurate
strings = re.findall(r'"([^"]*)"', code)
# Cannot correctly handle escaped \"

# Case 3: Code-like text inside comments
code2 = """
# print("this is a comment")
print("this is real code")
"""
# Determining whether a line is a comment or executable code with regex alone
# is difficult because it requires understanding the language syntax

# Case 4: Heredocs and template literals
ruby_code = '''
text = <<~HEREDOC
  This contains "quotes" and #{interpolation}
  And even regex: /pattern/
HEREDOC
'''
# Correctly tracking the start and end of a heredoc
# requires a state machine
```

### 1.3 The Pumping Lemma -- Mathematical Proof of the Limits of Regular Languages

```
Pumping Lemma:
=================================

Theorem: If a language L is regular, there exists a constant p such that
     for any string w in L with |w| >= p,
     w can be decomposed as w = xyz, satisfying:
       1. |y| > 0
       2. |xy| <= p
       3. For any i >= 0, xy^iz is in L

Counterexample: L = { a^n b^n | n >= 0 } is not a regular language
     "n a's followed by n b's" cannot be expressed by regex

Practical implications:
  - "Matching parentheses" is not a regular language
  - "Matching tags" is not a regular language
  - Trying to fully process these with regex is theoretically impossible

However, note:
  - The "extended" regex of Perl/PCRE goes beyond theoretical regular languages
  - Recursive patterns like (?R) can handle some context-free languages
  - But from a readability/maintainability perspective, you should use a parser
```

### 1.4 PCRE Recursive Patterns -- Extensions of Regex

```python
import regex  # Python's regex module (an extension of re)

# Match matching parentheses with PCRE recursive patterns
# (?R) is a recursive call to the entire pattern
pattern = r'\((?:[^()]*|(?R))*\)'

text = "f(g(x, y), h(z))"
matches = regex.findall(pattern, text)
# matches = ['(g(x, y), h(z))', '(x, y)', '(z)']

# Recursion with named groups
# Use (?P<name>...) and (?&name)
pattern2 = r'(?P<brackets>\{(?:[^{}]*|(?&brackets))*\})'
json_like = '{"a": {"b": {"c": 1}}}'
match = regex.search(pattern2, json_like)
# Match: {"a": {"b": {"c": 1}}}

# Note: This is "possible" but not "recommended"
# From a readability/maintainability standpoint, complex recursive patterns
# should use parser combinators or PEG
```

---

## 2. Parser Combinators

```
The Concept of Parser Combinators
==============================

Build large parsers by combining small parsers

Basic parsers:
  digit    : Parses a single character "0"-"9"
  letter   : Parses a single character "a"-"z"
  string   : Parses a fixed string

Combinators:
  seq(a, b)    : a followed by b   (sequencing)
  alt(a, b)    : a or b   (choice)
  many(a)      : zero or more repetitions of a
  map(a, f)    : apply f to the result of a

Example: integer parser
  integer = map(many1(digit), digits => parseInt(digits.join('')))

Example: arithmetic expression parser
  expr   = alt(addExpr, term)
  term   = alt(mulExpr, factor)
  factor = alt(number, parens(expr))  <- recursion!
```

### 2.1 Parser Combinators in TypeScript

```typescript
// Parser type definition
type Parser<T> = (input: string, pos: number) => ParseResult<T>;
type ParseResult<T> =
  | { success: true; value: T; pos: number }
  | { success: false; expected: string; pos: number };

// Basic parsers
function char(c: string): Parser<string> {
  return (input, pos) =>
    input[pos] === c
      ? { success: true, value: c, pos: pos + 1 }
      : { success: false, expected: `'${c}'`, pos };
}

function regex(pattern: RegExp): Parser<string> {
  return (input, pos) => {
    const match = input.slice(pos).match(pattern);
    if (match && match.index === 0) {
      return { success: true, value: match[0], pos: pos + match[0].length };
    }
    return { success: false, expected: pattern.toString(), pos };
  };
}

// Combinators
function seq<A, B>(pa: Parser<A>, pb: Parser<B>): Parser<[A, B]> {
  return (input, pos) => {
    const ra = pa(input, pos);
    if (!ra.success) return ra as any;
    const rb = pb(input, ra.pos);
    if (!rb.success) return rb as any;
    return { success: true, value: [ra.value, rb.value], pos: rb.pos };
  };
}

function alt<T>(...parsers: Parser<T>[]): Parser<T> {
  return (input, pos) => {
    for (const p of parsers) {
      const r = p(input, pos);
      if (r.success) return r;
    }
    return { success: false, expected: "one of alternatives", pos };
  };
}

function many<T>(parser: Parser<T>): Parser<T[]> {
  return (input, pos) => {
    const results: T[] = [];
    let current = pos;
    while (true) {
      const r = parser(input, current);
      if (!r.success) break;
      results.push(r.value);
      current = r.pos;
    }
    return { success: true, value: results, pos: current };
  };
}

function map<A, B>(parser: Parser<A>, fn: (a: A) => B): Parser<B> {
  return (input, pos) => {
    const r = parser(input, pos);
    if (!r.success) return r as any;
    return { success: true, value: fn(r.value), pos: r.pos };
  };
}

// Usage example: arithmetic expression parser
const digit = regex(/[0-9]+/);
const number = map(digit, s => parseInt(s, 10));
const ws = regex(/\s*/);

function token<T>(p: Parser<T>): Parser<T> {
  return (input, pos) => {
    const r = ws(input, pos);
    return p(input, r.success ? r.pos : pos);
  };
}

// Parse "123 + 456"
const addExpr = (input: string, pos: number): ParseResult<number> => {
  const left = token(number)(input, pos);
  if (!left.success) return left;
  const op = token(char('+'))(input, left.pos);
  if (!op.success) return left;  // No addition -> just a number
  const right = addExpr(input, op.pos);  // Recursion
  if (!right.success) return right;
  return { success: true, value: left.value + right.value, pos: right.pos };
};
```

### 2.2 Extending the TypeScript Parser Combinator: Error Reporting

```typescript
// More practical parser combinators: report error position and expected values

interface ParseError {
  pos: number;
  line: number;
  column: number;
  expected: string[];
  found: string;
}

type BetterParser<T> = (input: string, pos: number) => BetterParseResult<T>;
type BetterParseResult<T> =
  | { success: true; value: T; pos: number }
  | { success: false; error: ParseError };

// Compute line and column from an error position
function getLineAndColumn(input: string, pos: number): { line: number; column: number } {
  const lines = input.slice(0, pos).split('\n');
  return { line: lines.length, column: lines[lines.length - 1].length + 1 };
}

// Generate an error message
function formatError(input: string, error: ParseError): string {
  const lines = input.split('\n');
  const line = lines[error.line - 1] || '';
  const pointer = ' '.repeat(error.column - 1) + '^';
  return [
    `Parse error at line ${error.line}, column ${error.column}:`,
    `  ${line}`,
    `  ${pointer}`,
    `Expected: ${error.expected.join(' or ')}`,
    `Found: ${error.found || 'end of input'}`,
  ].join('\n');
}

// Practical example: configuration file parser
// Parse a configuration file in key = value format
function configParser(input: string): Map<string, string> {
  const result = new Map<string, string>();
  const lines = input.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === '' || line.startsWith('#')) continue;

    const keyParser = regex(/[a-zA-Z_][a-zA-Z0-9_]*/);
    const r = keyParser(line, 0);
    if (!r.success) {
      const { line: ln, column } = getLineAndColumn(input, i);
      throw new Error(`Invalid key at line ${ln + 1}`);
    }

    const key = r.value;
    const eqParser = seq(ws, char('='));
    const eq = eqParser(line, r.pos);
    if (!eq.success) {
      throw new Error(`Expected '=' after key '${key}' at line ${i + 1}`);
    }

    const valueStart = eq.success ? eq.pos : r.pos;
    const wsResult = ws(line, valueStart);
    const value = line.slice(wsResult.success ? wsResult.pos : valueStart).trim();
    result.set(key, value);
  }

  return result;
}
```

### 2.3 Haskell Parser Combinators (Parsec / Megaparsec)

```haskell
-- Megaparsec is the most mature parser combinator library in Haskell
-- It enables type-safe parsing of context-free grammars that are impossible with regex

import Text.Megaparsec
import Text.Megaparsec.Char
import qualified Text.Megaparsec.Char.Lexer as L
import Data.Void (Void)

type Parser = Parsec Void String

-- Skip whitespace and comments
sc :: Parser ()
sc = L.space space1 (L.skipLineComment "//") (L.skipBlockComment "/*" "*/")

-- Lexer helpers
lexeme :: Parser a -> Parser a
lexeme = L.lexeme sc

symbol :: String -> Parser String
symbol = L.symbol sc

-- Integer literal
integer :: Parser Integer
integer = lexeme L.decimal

-- Identifier
identifier :: Parser String
identifier = lexeme $ do
  first <- letterChar
  rest  <- many (alphaNumChar <|> char '_')
  return (first : rest)

-- JSON parser example
data JsonValue
  = JsonNull
  | JsonBool Bool
  | JsonNumber Double
  | JsonString String
  | JsonArray [JsonValue]
  | JsonObject [(String, JsonValue)]
  deriving (Show)

jsonValue :: Parser JsonValue
jsonValue = sc *> choice
  [ JsonNull   <$ symbol "null"
  , JsonBool True  <$ symbol "true"
  , JsonBool False <$ symbol "false"
  , JsonNumber <$> lexeme L.float
  , JsonString <$> stringLiteral
  , JsonArray  <$> brackets (jsonValue `sepBy` symbol ",")
  , JsonObject <$> braces (keyValue `sepBy` symbol ",")
  ]
  where
    stringLiteral = lexeme $ char '"' *> manyTill L.charLiteral (char '"')
    brackets = between (symbol "[") (symbol "]")
    braces   = between (symbol "{") (symbol "}")
    keyValue = do
      key <- stringLiteral
      _   <- symbol ":"
      val <- jsonValue
      return (key, val)

-- Usage example
-- parse jsonValue "" "{\"name\": \"Alice\", \"scores\": [95, 87, 92]}"
-- Right (JsonObject [("name", JsonString "Alice"), ("scores", JsonArray [...])])
```

### 2.4 Python Parser Combinator (lark)

```python
from lark import Lark, Transformer, v_args

# lark is one of the most user-friendly parser libraries in Python
# It auto-generates a parser from an EBNF-style grammar definition

# Grammar definition for arithmetic expressions
calc_grammar = """
    ?start: expr

    ?expr: term
        | expr "+" term   -> add
        | expr "-" term   -> sub

    ?term: factor
        | term "*" factor -> mul
        | term "/" factor -> div

    ?factor: NUMBER       -> number
        | "-" factor      -> neg
        | "(" expr ")"

    %import common.NUMBER
    %import common.WS
    %ignore WS
"""

# Transformer that converts the AST into the computed result
@v_args(inline=True)
class CalcTransformer(Transformer):
    from operator import add, sub, mul, truediv as div

    def number(self, n):
        return float(n)

    def neg(self, n):
        return -n

# Generate and use the parser
calc_parser = Lark(calc_grammar, parser='lalr', transformer=CalcTransformer())

# Run the calculation
result = calc_parser.parse("(1 + 2) * 3 - 4 / 2")
print(result)  # 7.0

# More complex example: SQL SELECT statement parser
sql_grammar = """
    start: select_stmt

    select_stmt: "SELECT"i column_list "FROM"i table_name where_clause?
                 order_clause? limit_clause?

    column_list: "*" | column ("," column)*
    column: IDENTIFIER ("." IDENTIFIER)? alias?
    alias: "AS"i IDENTIFIER

    table_name: IDENTIFIER alias?

    where_clause: "WHERE"i condition
    condition: comparison (("AND"i | "OR"i) comparison)*
    comparison: column_ref operator value
    column_ref: IDENTIFIER ("." IDENTIFIER)?
    operator: "=" | "!=" | "<" | ">" | "<=" | ">=" | "LIKE"i | "IN"i
    value: STRING | NUMBER | "NULL"i | "(" value ("," value)* ")"

    order_clause: "ORDER"i "BY"i order_item ("," order_item)*
    order_item: column_ref ("ASC"i | "DESC"i)?

    limit_clause: "LIMIT"i NUMBER ("OFFSET"i NUMBER)?

    IDENTIFIER: /[a-zA-Z_][a-zA-Z0-9_]*/
    STRING: "'" /[^']*/ "'"
    NUMBER: /[0-9]+(\.[0-9]+)?/

    %import common.WS
    %ignore WS
"""

sql_parser = Lark(sql_grammar, parser='earley')
tree = sql_parser.parse("SELECT name, age FROM users WHERE status = 'active' ORDER BY age DESC LIMIT 10")
print(tree.pretty())
```

---

## 3. PEG (Parsing Expression Grammar)

### 3.1 Defining Grammars with PEG.js / Peggy

```javascript
// grammar.pegjs (Peggy format)
// PEG grammar for a JSON parser

Value
  = Object / Array / String / Number / Boolean / Null

Object
  = "{" _ head:Pair tail:("," _ p:Pair { return p; })* _ "}"
    { return Object.fromEntries([head, ...tail]); }
  / "{" _ "}" { return {}; }

Pair
  = key:String _ ":" _ value:Value { return [key, value]; }

Array
  = "[" _ head:Value tail:("," _ v:Value { return v; })* _ "]"
    { return [head, ...tail]; }
  / "[" _ "]" { return []; }

String
  = '"' chars:[^"]* '"' { return chars.join(""); }

Number
  = digits:[0-9]+ { return parseInt(digits.join(""), 10); }

Boolean
  = "true" { return true; }
  / "false" { return false; }

Null
  = "null" { return null; }

_ = [ \t\n\r]*
```

```bash
# Generate a parser with Peggy
npx peggy grammar.pegjs --output parser.js

# Usage
node -e "const p = require('./parser'); console.log(p.parse('{\"a\": 1}'))"
```

### 3.2 Properties of PEG and Differences from Regex

```
PEG vs Regex vs CFG:
========================

Regex:
  - Choice is "longest match" or "shortest match"
  - Risk of exponential execution time due to backtracking
  - Recursion is impossible (except in PCRE extensions)

PEG:
  - Choice is "prioritized" (the first matching alternative is chosen)
  - No ambiguity (the grammar produces a unique parse tree)
  - Recursion is possible (handles context-free grammars)
  - Linear time can be guaranteed with packrat parsers

CFG (Context-Free Grammar):
  - Choice is "non-deterministic" (multiple parse trees possible)
  - May contain ambiguity
  - Parsed with algorithms like LR, LL, Earley

PEG's choice operator "/" is "ordered choice":
  rule = A / B
  -> Try A first
  -> If A succeeds -> use A's result (don't try B)
  -> If A fails -> try B

This results in:
  - Eliminating grammar ambiguity
  - Predictable parser behavior
  - But there's risk of "oversights" (order matters)
```

### 3.3 Practical Grammar Definition Patterns in PEG

```javascript
// Practical grammar pattern collection in Peggy

// Pattern 1: Configuration file parser (INI format)
// File: ini_parser.pegjs

IniFile
  = sections:Section* { return Object.fromEntries(sections); }

Section
  = _ "[" name:SectionName "]" _ "\n" entries:Entry*
    { return [name, Object.fromEntries(entries)]; }

SectionName
  = chars:[a-zA-Z0-9._-]+ { return chars.join(""); }

Entry
  = _ key:Key _ "=" _ value:Value _ "\n"?
    { return [key, value]; }
  / Comment { return null; }

Key
  = chars:[a-zA-Z0-9._-]+ { return chars.join(""); }

Value
  = QuotedString / UnquotedValue

QuotedString
  = '"' chars:[^"]* '"' { return chars.join(""); }

UnquotedValue
  = chars:[^\n#;]* { return chars.join("").trim(); }

Comment
  = _ [#;] [^\n]* "\n"?

_ = [ \t]*

// Pattern 2: Markdown inline format parser
// File: markdown_inline.pegjs

InlineContent
  = elements:InlineElement* { return elements; }

InlineElement
  = Bold / Italic / Code / Link / Text

Bold
  = "**" content:$[^*]+ "**"
    { return { type: "bold", content }; }

Italic
  = "*" content:$[^*]+ "*"
    { return { type: "italic", content }; }

Code
  = "`" content:$[^`]+ "`"
    { return { type: "code", content }; }

Link
  = "[" text:$[^\]]+ "]" "(" url:$[^)]+ ")"
    { return { type: "link", text, url }; }

Text
  = chars:$[^*`\[]+ { return { type: "text", content: chars }; }

// Pattern 3: URL parser
// File: url_parser.pegjs

URL
  = scheme:Scheme "://" authority:Authority path:Path? query:Query? fragment:Fragment?
    { return { scheme, ...authority, path: path || "/", query, fragment }; }

Scheme
  = chars:[a-zA-Z]+ { return chars.join(""); }

Authority
  = userinfo:(Userinfo "@")? host:Host port:(":" Port)?
    { return { userinfo: userinfo?.[0], host, port: port?.[1] }; }

Userinfo
  = chars:[a-zA-Z0-9._~!$&'()*+,;=:-]+ { return chars.join(""); }

Host
  = chars:[a-zA-Z0-9.-]+ { return chars.join(""); }

Port
  = digits:[0-9]+ { return parseInt(digits.join(""), 10); }

Path
  = segments:("/" PathSegment)* { return segments.map(s => "/" + s[1]).join(""); }

PathSegment
  = chars:[a-zA-Z0-9._~!$&'()*+,;=:@-]* { return chars.join(""); }

Query
  = "?" params:QueryParam* { return Object.fromEntries(params); }

QueryParam
  = key:$[^=&#]+ "=" value:$[^&#]* "&"?
    { return [decodeURIComponent(key), decodeURIComponent(value)]; }

Fragment
  = "#" chars:$[a-zA-Z0-9._~!$&'()*+,;=:@/?-]* { return chars; }
```

---

## 4. Practical Alternative Tools

### 4.1 Python's pyparsing

```python
from pyparsing import (
    Word, alphas, alphanums, nums, Suppress, Group,
    Forward, Optional, ZeroOrMore, Literal, quotedString
)

# SQL SELECT statement parser (simplified)
identifier = Word(alphas + "_", alphanums + "_")
number = Word(nums)
string_literal = quotedString

# SELECT column1, column2 FROM table WHERE condition
select_stmt = (
    Suppress(Literal("SELECT")) +
    Group(identifier + ZeroOrMore(Suppress(",") + identifier))("columns") +
    Suppress(Literal("FROM")) +
    identifier("table") +
    Optional(
        Suppress(Literal("WHERE")) +
        identifier("where_col") +
        Literal("=") +
        (number | string_literal)("where_val")
    )
)

# Run the parse
result = select_stmt.parseString("SELECT name, age FROM users WHERE status = 'active'")
print(result.columns.asList())  # ['name', 'age']
print(result.table)             # 'users'
print(result.where_col)         # 'status'
```

### 4.2 Rust's nom Parser Combinator

```rust
use nom::{
    IResult,
    bytes::complete::{tag, take_while1},
    character::complete::{char, digit1, space0},
    combinator::{map, map_res},
    multi::separated_list1,
    sequence::{delimited, preceded, tuple},
    branch::alt,
};

// Integer parser
fn integer(input: &str) -> IResult<&str, i64> {
    map_res(digit1, |s: &str| s.parse::<i64>())(input)
}

// Comma-separated list of integers
fn integer_list(input: &str) -> IResult<&str, Vec<i64>> {
    separated_list1(
        delimited(space0, char(','), space0),
        integer,
    )(input)
}

// Parse "[1, 2, 3]"
fn bracketed_list(input: &str) -> IResult<&str, Vec<i64>> {
    delimited(
        char('['),
        delimited(space0, integer_list, space0),
        char(']'),
    )(input)
}

fn main() {
    let (remaining, result) = bracketed_list("[1, 2, 3, 42]").unwrap();
    assert_eq!(result, vec![1, 2, 3, 42]);
    assert_eq!(remaining, "");
}
```

### 4.3 Rust's nom -- A Practical Log Parser

```rust
use nom::{
    IResult,
    bytes::complete::{tag, take_while, take_until, take_while1},
    character::complete::{char, digit1, space0, space1},
    combinator::{map, map_res, opt},
    sequence::{delimited, tuple, preceded},
    branch::alt,
};
use std::net::Ipv4Addr;

// Struct for parsing one line of an Apache log
#[derive(Debug)]
struct AccessLogEntry {
    ip: Ipv4Addr,
    timestamp: String,
    method: String,
    path: String,
    protocol: String,
    status: u16,
    size: u64,
}

// IP address parser
fn ip_address(input: &str) -> IResult<&str, Ipv4Addr> {
    map_res(
        take_while1(|c: char| c.is_ascii_digit() || c == '.'),
        |s: &str| s.parse::<Ipv4Addr>(),
    )(input)
}

// Timestamp parser: [10/Oct/2000:13:55:36 -0700]
fn timestamp(input: &str) -> IResult<&str, String> {
    map(
        delimited(char('['), take_until("]"), char(']')),
        |s: &str| s.to_string(),
    )(input)
}

// Request line parser: "GET /path HTTP/1.1"
fn request_line(input: &str) -> IResult<&str, (String, String, String)> {
    let (input, _) = char('"')(input)?;
    let (input, method) = take_while1(|c: char| c.is_ascii_alphabetic())(input)?;
    let (input, _) = space1(input)?;
    let (input, path) = take_while1(|c: char| c != ' ')(input)?;
    let (input, _) = space1(input)?;
    let (input, protocol) = take_until("\"")(input)?;
    let (input, _) = char('"')(input)?;
    Ok((input, (method.to_string(), path.to_string(), protocol.to_string())))
}

// Status code parser
fn status_code(input: &str) -> IResult<&str, u16> {
    map_res(digit1, |s: &str| s.parse::<u16>())(input)
}

// Parser for a full log line
fn log_entry(input: &str) -> IResult<&str, AccessLogEntry> {
    let (input, ip) = ip_address(input)?;
    let (input, _) = tag(" - - ")(input)?;
    let (input, ts) = timestamp(input)?;
    let (input, _) = space1(input)?;
    let (input, (method, path, protocol)) = request_line(input)?;
    let (input, _) = space1(input)?;
    let (input, status) = status_code(input)?;
    let (input, _) = space1(input)?;
    let (input, size) = map_res(digit1, |s: &str| s.parse::<u64>())(input)?;

    Ok((input, AccessLogEntry {
        ip, timestamp: ts, method, path, protocol, status, size,
    }))
}

// Usage example
fn main() {
    let line = r#"192.168.1.1 - - [11/Feb/2026:10:30:45 +0900] "GET /api/users HTTP/1.1" 200 1234"#;
    match log_entry(line) {
        Ok((_, entry)) => {
            println!("IP: {}", entry.ip);
            println!("Status: {}", entry.status);
            println!("Path: {}", entry.path);
        }
        Err(e) => eprintln!("Parse error: {:?}", e),
    }
}
```

### 4.4 Go's participle Parser Library

```go
package main

import (
    "fmt"
    "github.com/alecthomas/participle/v2"
    "github.com/alecthomas/participle/v2/lexer"
)

// Go's participle auto-generates parsers from struct tags
// It can type-safely parse recursive structures that are impossible with regex

// AST definition for arithmetic expressions
type Expression struct {
    Left  *Term   `@@`
    Op    string  `@("+" | "-")?`
    Right *Term   `@@?`
}

type Term struct {
    Left  *Factor `@@`
    Op    string  `@("*" | "/")?`
    Right *Factor `@@?`
}

type Factor struct {
    Number *float64    `  @Float | @Int`
    Sub    *Expression `| "(" @@ ")"`
}

func main() {
    parser := participle.MustBuild[Expression]()

    expr := &Expression{}
    err := parser.ParseString("", "1 + 2 * (3 - 4)", expr)
    if err != nil {
        panic(err)
    }
    fmt.Printf("Parsed: %+v\n", expr)
}

// Configuration file parser example
type Config struct {
    Sections []*Section `@@*`
}

type Section struct {
    Name    string   `"[" @Ident "]"`
    Entries []*Entry `@@*`
}

type Entry struct {
    Key   string `@Ident "="`
    Value string `@(String | Ident | Int)`
}

func parseConfig(input string) (*Config, error) {
    configLexer := lexer.MustSimple([]lexer.SimpleRule{
        {Name: "String", Pattern: `"[^"]*"`},
        {Name: "Ident", Pattern: `[a-zA-Z_][a-zA-Z0-9_]*`},
        {Name: "Int", Pattern: `[0-9]+`},
        {Name: "Punct", Pattern: `[\[\]=]`},
        {Name: "whitespace", Pattern: `[\s]+`},
        {Name: "comment", Pattern: `#[^\n]*`},
    })

    parser := participle.MustBuildConfig,
    )

    config := &Config{}
    err := parser.ParseString("", input, config)
    return config, err
}
```

---

## 5. ANTLR -- A Parser Generator

### 5.1 Defining and Using Grammars in ANTLR

```antlr
// Calculator.g4 -- ANTLR grammar file
grammar Calculator;

// Parser rules
prog: stat+ ;

stat: expr NEWLINE          # printExpr
    | ID '=' expr NEWLINE   # assign
    | NEWLINE               # blank
    ;

expr: expr op=('*'|'/') expr   # MulDiv
    | expr op=('+'|'-') expr   # AddSub
    | INT                      # int
    | ID                       # id
    | '(' expr ')'             # parens
    ;

// Lexer rules
MUL : '*' ;
DIV : '/' ;
ADD : '+' ;
SUB : '-' ;
ID  : [a-zA-Z]+ ;
INT : [0-9]+ ;
NEWLINE : '\r'? '\n' ;
WS  : [ \t]+ -> skip ;
```

```java
// Example of using a parser generated by ANTLR (Java)
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.tree.*;

public class CalcApp {
    public static void main(String[] args) throws Exception {
        // Prepare the input stream
        CharStream input = CharStreams.fromString("x = 1 + 2 * 3\n");

        // Lexer -> token stream -> parser
        CalculatorLexer lexer = new CalculatorLexer(input);
        CommonTokenStream tokens = new CommonTokenStream(lexer);
        CalculatorParser parser = new CalculatorParser(tokens);

        // Get the parse tree
        ParseTree tree = parser.prog();

        // Walk the AST with the visitor pattern
        CalcVisitor visitor = new CalcVisitor();
        visitor.visit(tree);
    }
}

// Visitor implementation
class CalcVisitor extends CalculatorBaseVisitor<Integer> {
    Map<String, Integer> memory = new HashMap<>();

    @Override
    public Integer visitAssign(CalculatorParser.AssignContext ctx) {
        String id = ctx.ID().getText();
        int value = visit(ctx.expr());
        memory.put(id, value);
        return value;
    }

    @Override
    public Integer visitMulDiv(CalculatorParser.MulDivContext ctx) {
        int left = visit(ctx.expr(0));
        int right = visit(ctx.expr(1));
        if (ctx.op.getType() == CalculatorParser.MUL) return left * right;
        return left / right;
    }

    @Override
    public Integer visitAddSub(CalculatorParser.AddSubContext ctx) {
        int left = visit(ctx.expr(0));
        int right = visit(ctx.expr(1));
        if (ctx.op.getType() == CalculatorParser.ADD) return left + right;
        return left - right;
    }
}
```

```bash
# How to use ANTLR
# 1. Create the grammar file
# 2. Generate the parser
antlr4 Calculator.g4 -Dlanguage=Python3  # For Python
antlr4 Calculator.g4 -Dlanguage=Java     # For Java
antlr4 Calculator.g4 -Dlanguage=Go       # For Go

# 3. Test with grun (visualize the parse tree in a GUI)
grun Calculator prog -gui
```

---

## 6. tree-sitter -- An Incremental Parser

### 6.1 Overview and Use of tree-sitter

```
Features of tree-sitter:
====================

1. Incremental parsing
   - Re-parses only the modified parts
   - Optimal for real-time syntax analysis in editors
   - O(log n) re-parsing after edits

2. Error recovery
   - Continues parsing as much as possible despite syntax errors
   - The editor can keep highlighting even broken code

3. Multi-language support
   - Grammars for 200+ programming languages are available
   - JavaScript, Python, Rust, Go, Java, C/C++, ...

4. Query system
   - Pattern matching with S-expressions
   - Enables semantic code search

Use cases:
  - Editor syntax highlighting (Neovim, Helix, Zed, etc.)
  - Code navigation (jump to definition/reference)
  - Implementing linters and formatters
  - Code transformation tools
  - GitHub code search and security scanning
```

### 6.2 The tree-sitter Query System

```scheme
;; tree-sitter queries: match code structures using S-expressions

;; Match all Python function definitions
(function_definition
  name: (identifier) @function.name
  parameters: (parameters) @function.params
  body: (block) @function.body)

;; Match only methods inside class definitions
(class_definition
  name: (identifier) @class.name
  body: (block
    (function_definition
      name: (identifier) @method.name)))

;; Match import statements
(import_statement
  name: (dotted_name) @import.module)

(import_from_statement
  module_name: (dotted_name) @import.from
  name: (dotted_name) @import.name)

;; Function calls with a specific pattern
;; Example: calls like logging.error("...")
(call
  function: (attribute
    object: (identifier) @object (#eq? @object "logging")
    attribute: (identifier) @method (#eq? @method "error"))
  arguments: (argument_list
    (string) @message))

;; Match TypeScript type definitions
(type_alias_declaration
  name: (type_identifier) @type.name
  value: (_) @type.definition)

(interface_declaration
  name: (type_identifier) @interface.name
  body: (object_type) @interface.body)
```

### 6.3 A Code Analysis Tool Using tree-sitter (Python)

```python
# Code analysis using tree-sitter's Python bindings

from tree_sitter import Language, Parser
import tree_sitter_python as tspython

# Set up the parser
PY_LANGUAGE = Language(tspython.language())
parser = Parser(PY_LANGUAGE)

# Parse the source code
source_code = b"""
class UserService:
    def __init__(self, db):
        self.db = db

    def get_user(self, user_id: int) -> dict:
        query = "SELECT * FROM users WHERE id = ?"
        return self.db.execute(query, (user_id,))

    def create_user(self, name: str, email: str) -> int:
        query = "INSERT INTO users (name, email) VALUES (?, ?)"
        return self.db.execute(query, (name, email))

def helper_function():
    pass
"""

tree = parser.parse(source_code)
root_node = tree.root_node

# Extract function definitions
def find_functions(node, depth=0):
    """Recursively explore function definitions"""
    if node.type == 'function_definition':
        name_node = node.child_by_field_name('name')
        params_node = node.child_by_field_name('parameters')
        return_type = node.child_by_field_name('return_type')

        info = {
            'name': name_node.text.decode(),
            'params': params_node.text.decode(),
            'return_type': return_type.text.decode() if return_type else None,
            'line': node.start_point[0] + 1,
            'depth': depth,
        }
        print(f"{'  ' * depth}Function: {info['name']}{info['params']}"
              f"{' -> ' + info['return_type'] if info['return_type'] else ''}"
              f" (line {info['line']})")

    for child in node.children:
        find_functions(child, depth + (1 if node.type == 'class_definition' else 0))

find_functions(root_node)

# Extract class definitions
def find_classes(node):
    """Extract class definitions and their methods"""
    if node.type == 'class_definition':
        name = node.child_by_field_name('name').text.decode()
        methods = []
        body = node.child_by_field_name('body')
        if body:
            for child in body.children:
                if child.type == 'function_definition':
                    method_name = child.child_by_field_name('name').text.decode()
                    methods.append(method_name)
        print(f"Class: {name}")
        print(f"  Methods: {', '.join(methods)}")

    for child in node.children:
        find_classes(child)

find_classes(root_node)

# Detect SQL injection vulnerabilities (simplified)
def find_sql_injection_risks(node):
    """Detect places where SQL is built using string formatting"""
    if node.type == 'binary_operator':
        # Detect SQL constructed via string concatenation (+)
        left = node.children[0]
        if left.type == 'string' and any(
            keyword in left.text.decode().upper()
            for keyword in ['SELECT', 'INSERT', 'UPDATE', 'DELETE']
        ):
            print(f"Warning: SQL string concatenation (line {node.start_point[0] + 1})")
            print(f"  {node.text.decode()}")

    if node.type == 'call':
        # Detect SQL built with f-strings or .format()
        func = node.child_by_field_name('function')
        if func and func.type == 'attribute' and func.text.decode().endswith('.format'):
            # Check whether the caller of .format() contains SQL
            pass

    for child in node.children:
        find_sql_injection_risks(child)

find_sql_injection_risks(root_node)
```

---

## 7. Dedicated Parsers for Structured Data

### 7.1 HTML Processing -- Beautiful Soup and lxml

```python
from bs4 import BeautifulSoup
import lxml.html

# === Beautiful Soup ===
html = """
<html>
<body>
  <div class="container">
    <h1>Title</h1>
    <ul class="items">
      <li class="item active">Item 1</li>
      <li class="item">Item 2</li>
      <li class="item">Item 3</li>
    </ul>
    <div class="nested">
      <div class="deep">
        <p>Deeply nested text</p>
      </div>
    </div>
  </div>
</body>
</html>
"""

soup = BeautifulSoup(html, 'html.parser')

# Search with CSS selectors (far more reliable than regex)
items = soup.select('ul.items li.item')
for item in items:
    print(item.text)  # "Item 1", "Item 2", "Item 3"

# Get nested elements
deep_text = soup.select_one('.nested .deep p').text
print(deep_text)  # "Deeply nested text"

# Filter by attribute
active = soup.find('li', class_='active')
print(active.text)  # "Item 1"

# Cases impossible with regex: self-closing tags, attribute value quotes, etc.
complex_html = '<img src="photo.jpg" alt="He said &quot;hello&quot;" />'
soup2 = BeautifulSoup(complex_html, 'html.parser')
img = soup2.find('img')
print(img['alt'])  # 'He said "hello"' -- entities are correctly decoded too

# === lxml (XPath) ===
doc = lxml.html.fromstring(html)

# Search with XPath
titles = doc.xpath('//h1/text()')
print(titles)  # ['Title']

items_xpath = doc.xpath('//ul[@class="items"]/li/text()')
print(items_xpath)  # ['Item 1', 'Item 2', 'Item 3']

# Complex conditions
active_xpath = doc.xpath('//li[contains(@class, "active")]/text()')
print(active_xpath)  # ['Item 1']
```

### 7.2 JSON Processing -- jq and Python

```bash
# jq: a command-line JSON processor
# Handles nested JSON that is impossible with regex

# Basic field extraction
echo '{"name": "Alice", "age": 30}' | jq '.name'
# "Alice"

# Nested fields
echo '{"user": {"name": "Alice", "address": {"city": "Tokyo"}}}' | \
    jq '.user.address.city'
# "Tokyo"

# Array processing
echo '[{"name": "Alice"}, {"name": "Bob"}]' | jq '.[].name'
# "Alice"
# "Bob"

# Filtering
echo '[{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}]' | \
    jq '.[] | select(.age > 28)'
# {"name": "Alice", "age": 30}

# Transformation
echo '[{"name": "Alice", "scores": [90, 85, 92]}]' | \
    jq '.[] | {name, avg_score: (.scores | add / length)}'
# {"name": "Alice", "avg_score": 89}

# Stream processing of JSON Lines
cat events.jsonl | jq -c 'select(.level == "ERROR") | {timestamp, message}'

# Conversion to CSV
echo '[{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}]' | \
    jq -r '.[] | [.name, .age] | @csv'
# "Alice",30
# "Bob",25
```

```python
# JSON processing in Python
import json
from pathlib import Path

# Load and transform a JSON file
with open('data.json') as f:
    data = json.load(f)

# Safe access to nested data
def safe_get(data, *keys, default=None):
    """Safely access nested keys"""
    current = data
    for key in keys:
        if isinstance(current, dict):
            current = current.get(key)
        elif isinstance(current, list) and isinstance(key, int):
            current = current[key] if key < len(current) else None
        else:
            return default
        if current is None:
            return default
    return current

# Usage example
config = {"database": {"host": "localhost", "port": 5432}}
host = safe_get(config, "database", "host")  # "localhost"
missing = safe_get(config, "database", "timeout", default=30)  # 30

# Validation with JSON Schema
from jsonschema import validate, ValidationError

schema = {
    "type": "object",
    "required": ["name", "age"],
    "properties": {
        "name": {"type": "string", "minLength": 1},
        "age": {"type": "integer", "minimum": 0, "maximum": 150},
        "email": {"type": "string", "format": "email"},
    },
}

try:
    validate(instance={"name": "Alice", "age": 30}, schema=schema)
    print("Validation succeeded")
except ValidationError as e:
    print(f"Validation failed: {e.message}")
```

### 7.3 YAML Processing

```python
import yaml
from pathlib import Path

# YAML parser (structures impossible to process with regex)
yaml_content = """
server:
  host: localhost
  port: 8080
  ssl:
    enabled: true
    cert: /path/to/cert.pem

database:
  primary:
    host: db-primary.example.com
    port: 5432
    credentials:
      username: admin
      password: ${DB_PASSWORD}  # Environment variable reference
  replicas:
    - host: db-replica-1.example.com
      port: 5432
    - host: db-replica-2.example.com
      port: 5432

logging:
  level: INFO
  handlers:
    - type: console
      format: "%(asctime)s [%(levelname)s] %(message)s"
    - type: file
      path: /var/log/app.log
      rotation: daily
"""

config = yaml.safe_load(yaml_content)

# Nested access
print(config['server']['ssl']['enabled'])  # True
print(config['database']['replicas'][0]['host'])  # db-replica-1.example.com

# YAML anchors and aliases (impossible to process with regex)
yaml_with_anchors = """
defaults: &defaults
  adapter: postgres
  host: localhost
  port: 5432

development:
  <<: *defaults
  database: myapp_dev

production:
  <<: *defaults
  host: db.production.com
  database: myapp_prod
"""

envs = yaml.safe_load(yaml_with_anchors)
print(envs['production']['host'])  # db.production.com (overridden)
print(envs['production']['port'])  # 5432 (inherited from defaults)
```

### 7.4 XML Processing

```python
import xml.etree.ElementTree as ET
from lxml import etree

# XML parser (correctly handles namespaces and nesting)
xml_content = """<?xml version="1.0" encoding="UTF-8"?>
<bookstore xmlns:bk="http://example.com/books">
  <bk:book category="programming">
    <bk:title lang="ja">Introduction to Programming</bk:title>
    <bk:author>Taro Yamada</bk:author>
    <bk:price currency="JPY">3000</bk:price>
  </bk:book>
  <bk:book category="science">
    <bk:title lang="en">Introduction to Physics</bk:title>
    <bk:author>John Smith</bk:author>
    <bk:price currency="USD">45</bk:price>
  </bk:book>
</bookstore>
"""

# Processing with ElementTree
root = ET.fromstring(xml_content)
ns = {'bk': 'http://example.com/books'}

for book in root.findall('bk:book', ns):
    title = book.find('bk:title', ns).text
    author = book.find('bk:author', ns).text
    price = book.find('bk:price', ns)
    print(f"{title} by {author} - {price.get('currency')} {price.text}")

# lxml + XPath (more powerful queries)
doc = etree.fromstring(xml_content.encode())
nsmap = {'bk': 'http://example.com/books'}

# Title of books in the programming category
titles = doc.xpath('//bk:book[@category="programming"]/bk:title/text()', namespaces=nsmap)
print(titles)  # ['Introduction to Programming']

# Search for Japanese-language books
ja_books = doc.xpath('//bk:title[@lang="ja"]/text()', namespaces=nsmap)
print(ja_books)  # ['Introduction to Programming']
```

---

## Comparison Table of Approaches

| Approach | Expressiveness | Performance | Learning Cost | Use Cases |
|---|---|---|---|---|
| **Regex** | Regular grammar | Fast | Low | Pattern matching, search & replace |
| **Parser combinators** | Context-free grammar | Medium-High | Medium | DSLs, config files, protocols |
| **PEG** | Context-free grammar+ | High | Medium | Language processing, syntax analysis |
| **ANTLR/yacc** | Context-free grammar | High | High | Programming languages, SQL |
| **tree-sitter** | Context-free grammar | Very High | Medium | Editor syntax highlighting |
| **Dedicated parsers** | Arbitrary | Highest | Low | Standard formats like JSON, HTML, CSV |
| **lark (Python)** | Context-free grammar | Medium | Low-Medium | DSLs, custom grammars, prototypes |
| **nom (Rust)** | Context-free grammar | Very High | Medium-High | Binary protocols, high-performance parsers |

### Selection Criteria Comparison

| Requirement | Recommended Approach |
|---|---|
| Simple pattern matching | Regex |
| Standard formats (JSON/HTML/CSV) | Dedicated parser library |
| Designing a custom DSL | Parser combinators or PEG |
| Parsing programming languages | ANTLR / tree-sitter |
| Editor integration (highlighting, etc.) | tree-sitter |
| High-performance binary protocols | nom (Rust) / hand-written parser |
| Rapid prototyping | lark (Python) / Peggy (JS) |
| Type-safe grammar definition | participle (Go) / nom (Rust) |

### Recommended Parser Libraries by Language

| Language | Library | Features |
|---|---|---|
| **Python** | lark | EBNF-style grammar, supports Earley/LALR |
| **Python** | pyparsing | Intuitive API, low learning cost |
| **Rust** | nom | Zero-copy, high performance |
| **Rust** | winnow | Successor to nom, improved error messages |
| **Haskell** | megaparsec | Most theoretically refined |
| **TypeScript** | Peggy | PEG-based, browser support |
| **Go** | participle | Struct-tag based, type-safe |
| **Java** | ANTLR | Industry standard, visual debugger |
| **C/C++** | tree-sitter | Incremental, error recovery |

---

## Anti-patterns

### 1. Parsing HTML with Regex

**Problem**: HTML has nested structure and cannot be expressed by a regular grammar. Countless edge cases exist that regex cannot handle, such as cases where attribute values contain quotes and self-closing tags.

```python
# [NG] Parsing HTML with regex
import re
html = '<div class="outer"><div class="inner">text</div></div>'
# This regex cannot handle nesting
divs = re.findall(r'<div[^>]*>(.*?)</div>', html)
# Expected: ['text'] -> Actual: ['<div class="inner">text'] (broken)

# [OK] Use Beautiful Soup
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'html.parser')
inner = soup.find('div', class_='inner')
print(inner.text)  # "text"
```

**Solution**: Use dedicated parsers like BeautifulSoup, cheerio, or lxml.

### 2. Trying to Solve Everything with Parser Combinators

**Problem**: Writing a custom parser for standard formats like JSON, CSV, or YAML leads to missed edge cases and security issues.

```python
# [NG] Building your own JSON parser
def parse_json(text):
    # String escaping, Unicode surrogate pairs, numeric precision,
    # BOM handling, recursion depth limits... you have to implement them all
    pass

# [OK] Use the standard library's json module
import json
data = json.loads('{"key": "value"}')
```

**Solution**: Use battle-tested libraries for standard formats. Limit parser combinators to custom DSLs and proprietary protocols.

### 3. Ignoring the Middle Ground Between Regex and Parsers

**Problem**: In situations where "regex isn't enough but a parser is overkill," people fail to choose either and end up writing a hand-rolled state machine.

```python
# [NG] Hand-rolled state machine (hard to maintain)
def parse_key_value(text):
    state = 'KEY'
    key = ''
    value = ''
    results = {}
    for ch in text:
        if state == 'KEY':
            if ch == '=':
                state = 'VALUE'
            else:
                key += ch
        elif state == 'VALUE':
            if ch == '\n':
                results[key.strip()] = value.strip()
                key = value = ''
                state = 'KEY'
            else:
                value += ch
    if key:
        results[key.strip()] = value.strip()
    return results

# [OK] Sometimes regex is sufficient
import re
def parse_key_value_regex(text):
    return dict(re.findall(r'([^=\n]+)=([^\n]*)', text))

# [OK] If more complex, use a lightweight parser
from configparser import ConfigParser
parser = ConfigParser()
parser.read_string('[DEFAULT]\n' + text)
```

### 4. Choosing a Parser Without Considering Performance

**Problem**: Choosing a slow library for processing large amounts of data.

```python
# [Caution] Beautiful Soup is convenient but slow for huge HTML
# When parsing a million HTML fragments

# Slow: Beautiful Soup (pure Python parser)
from bs4 import BeautifulSoup
for html_fragment in million_fragments:
    soup = BeautifulSoup(html_fragment, 'html.parser')  # Slow

# Fast: lxml (C implementation)
from lxml import html
for html_fragment in million_fragments:
    doc = html.fromstring(html_fragment)  # Several times faster

# Even faster: Pre-filter with regex + parser
import re
pattern = re.compile(r'class="target"')
for html_fragment in million_fragments:
    if pattern.search(html_fragment):  # Narrow candidates with regex
        doc = html.fromstring(html_fragment)  # Run parser only on candidates
```

---

## FAQ

### Q1: How does the performance of parser combinators compare to regex?

**A**: For simple pattern matching, regex is faster. However, for complex patterns where regex frequently backtracks, PEG and parser combinators deliver more predictable performance. nom (Rust) can sometimes achieve performance on par with regex.

```
Benchmark guide (relative values):
  Regex (simple pattern)    : 1.0x
  Regex (complex pattern)   : 1.0x to 100x (depends on backtracking)
  nom (Rust)                : 1.0x to 2.0x
  Megaparsec (Haskell)      : 2.0x to 5.0x
  lark (Python, LALR)       : 5.0x to 20x
  pyparsing (Python)        : 10x to 50x
  PEG (Peggy, JavaScript)   : 3.0x to 10x
```

### Q2: Can tree-sitter be used outside of editors?

**A**: Yes. As an incremental parser, tree-sitter is also useful in code analysis tools, linters, and code transformation tools. It is also used in GitHub's code search and security scanning.

Concrete examples:

1. **GitHub Code Search**: Uses tree-sitter to understand code's syntactic structure and enable semantic search
2. **Semgrep**: A tree-sitter-based static analysis tool that detects security vulnerabilities
3. **Difftastic**: A syntax-aware diff tool using tree-sitter
4. **Neovim / Helix**: tree-sitter-based syntax highlighting, folding, and text objects

### Q3: Which language has the most mature parser combinator library?

**A**: Haskell's `parsec`/`megaparsec` is the most theoretically refined. In practical terms, Rust's `nom`/`winnow` (high performance), Python's `pyparsing` (readability), and JavaScript's `Peggy` (web integration) are mature in their respective domains.

### Q4: What are concrete criteria for choosing between regex and a parser?

**A**: Decide using the following flowchart:

```
Is the target a standard format (JSON/HTML/CSV/XML/YAML)?
  -> Yes: Use a dedicated parser library
  -> No: v

Is there nested structure or recursion?
  -> Yes: Use a parser combinator / PEG
  -> No: v

Does the pattern fit on one line?
  -> Yes: Regex is sufficient
  -> No: v

Is it a multi-line pattern?
  -> Yes: If regex's multiline / dotall flag can handle it, use regex
  -> No: Consider a parser

Does the regex pattern exceed 50 characters?
  -> Yes: Strongly recommend switching to a parser
  -> No: Regex is OK (but with comments)
```

### Q5: What is the difference between PEG and CFG (context-free grammar)?

**A**: The main difference is how "choice" is handled:

- **CFG choice (|)**: Non-deterministic. Multiple alternatives are considered simultaneously, and ambiguity may arise
- **PEG choice (/)**: Prioritized. The first matching alternative is chosen (no ambiguity)

```
Example: ambiguity of "if-then-else"

CFG:
  stmt = "if" expr "then" stmt "else" stmt
       | "if" expr "then" stmt
  -> "if a then if b then x else y" has two possible interpretations (dangling else)

PEG:
  stmt = "if" expr "then" stmt "else" stmt
       / "if" expr "then" stmt
  -> The first rule (with else) takes priority, eliminating ambiguity
```

### Q6: What should I do if I want to use a parser in WASM?

**A**: There are several options:

1. **tree-sitter**: WASM builds are officially supported. Code analysis is possible in the browser
2. **Peggy**: Native JavaScript, so it runs as-is in the browser
3. **nom (Rust)**: Can be compiled with `wasm-pack` and used as a WASM module
4. **ANTLR**: The JavaScript target enables it to run in the browser

```javascript
// Example of using tree-sitter in WASM
import Parser from 'web-tree-sitter';

async function initParser() {
    await Parser.init();
    const parser = new Parser();
    const Lang = await Parser.Language.load('/tree-sitter-python.wasm');
    parser.setLanguage(Lang);

    const tree = parser.parse('def hello(): pass');
    console.log(tree.rootNode.toString());
    // (module (function_definition name: (identifier) parameters: (parameters) body: (block (pass_statement))))
}
```

---

## Summary

| Topic | Key Point |
|---|---|
| Limits of regex | Cannot handle nested structures, recursion, or context dependence |
| Parser combinators | Compose small parsers to analyze complex grammars |
| PEG | Auto-generate parsers from grammar definitions. Prioritized choice |
| ANTLR | Industry-standard parser generator. Multi-language support |
| nom (Rust) | Zero-copy, high-performance parser combinator |
| lark (Python) | Easily build parsers with EBNF-style grammar |
| tree-sitter | Incremental parser. Ideal for editor integration |
| Selection criteria | Use dedicated libraries for standard formats; combinators/PEG for custom grammars |
| Performance | Regex > nom > PEG > pyparsing (general trend) |

## Recommended Next Reading

- Regex Fundamentals -- How to use regex effectively in appropriate situations
- [Practical Text Processing](../02-practical/02-text-processing.md) -- Practical text-processing patterns with sed/awk/grep

## References

1. **Bryan Ford**: [Parsing Expression Grammars (2004)](https://bford.info/pub/lang/peg.pdf) -- The original PEG paper
2. **nom official**: [nom Documentation](https://docs.rs/nom/latest/nom/) -- Comprehensive documentation for the Rust parser combinator
3. **tree-sitter official**: [tree-sitter](https://tree-sitter.github.io/tree-sitter/) -- Incremental parser framework
4. **ANTLR official**: [ANTLR](https://www.antlr.org/) -- Official site of the parser generator
5. **lark official**: [lark-parser](https://lark-parser.readthedocs.io/) -- Modern parser library for Python
6. **Peggy official**: [Peggy](https://peggyjs.org/) -- PEG parser generator for JavaScript
7. **megaparsec official**: [megaparsec](https://hackage.haskell.org/package/megaparsec) -- Industrial-strength parser combinator for Haskell
8. **Terence Parr**: "The Definitive ANTLR 4 Reference" Pragmatic Bookshelf, 2013 -- The standard book on ANTLR
9. **Semgrep**: [semgrep.dev](https://semgrep.dev/) -- tree-sitter-based static analysis tool

