

===== SOURCE: 02-programming/python-development/SKILL.md =====

# Python Development

> A comprehensive guide to Python development covering FastAPI, Django, Flask, type hints, async programming, data processing, and performance optimization — everything you need to build high-quality Python applications.

## Target Audience

- Complete beginners new to Python or programming
- Developers looking to adopt Python best practices
- Engineers building web APIs or data pipelines with Python

## Prerequisites

- Basic computer literacy (for the beginner guides)
- Foundational Python knowledge (for the advanced guides)

## Study Guide

### 01-basics -- Python Fundamentals

| # | File | Content |
|---|------|---------|
| 01 | [01-python-intro.md](docs/01-basics/01-python-intro.md) | What Python is, installation, first program, REPL |
| 02 | [02-basic-syntax.md](docs/01-basics/02-basic-syntax.md) | Variables, data types, operators, string manipulation |
| 03 | [03-control-flow.md](docs/01-basics/03-control-flow.md) | if/elif/else, for/while loops, break/continue/pass |
| 04 | [04-functions.md](docs/01-basics/04-functions.md) | Defining functions, arguments, return values, scope, lambdas |
| 05 | [05-data-structures.md](docs/01-basics/05-data-structures.md) | Lists, tuples, dicts, sets, comprehensions |
| 06 | [06-modules-packages.md](docs/01-basics/06-modules-packages.md) | Imports, standard library, pip, virtual environments |

### 02-best-practices -- Python Best Practices

| # | File | Content |
|---|------|---------|
| 01 | [python-best-practices.md](docs/02-best-practices/python-best-practices.md) | Type hints, code quality, project structure, testing |

### 03-frameworks -- Web Frameworks

| # | File | Content |
|---|------|---------|
| 01 | [fastapi-django.md](docs/03-frameworks/fastapi-django.md) | FastAPI and Django development guide |

### 04-data-processing -- Data Processing

| # | File | Content |
|---|------|---------|
| 01 | [data-processing.md](docs/04-data-processing/data-processing.md) | CSV/JSON/Excel processing, pandas/NumPy, web scraping, automation |

### 05-performance -- Performance Optimization

| # | File | Content |
|---|------|---------|
| 01 | [performance-optimization.md](docs/05-performance/performance-optimization.md) | Profiling, data structure optimization, concurrency, caching |

## Quick Reference

```
Python Best Practices Cheat Sheet:

  Type Hints:
    str, int, float, bool     -- primitive types
    list[T], dict[K, V]       -- generics (Python 3.9+)
    T | None                  -- union with None (Python 3.10+)
    Optional[T]               -- equivalent to T | None
    Callable[[A], R]          -- callable type
    TypeVar, Generic[T]       -- generic classes

  Project Tools:
    ruff      -- fast linter + formatter
    mypy      -- static type checker
    pytest    -- test framework
    poetry    -- dependency management
    pre-commit -- git hooks for code quality

  Virtual Environments:
    python -m venv venv       -- create
    source venv/bin/activate  -- activate (Linux/macOS)
    venv\Scripts\activate     -- activate (Windows)
    deactivate                -- deactivate
```

## References

1. Python Software Foundation. "Python Documentation." docs.python.org, 2024.
2. Tiangolo, S. "FastAPI Documentation." fastapi.tiangolo.com, 2024.
3. Django Software Foundation. "Django Documentation." djangoproject.com, 2024.
4. McKinney, W. "Python for Data Analysis." O'Reilly, 2022.



===== SOURCE: 02-programming/python-development/docs/01-basics/01-python-intro.md =====

# Introduction to Python -- A Complete Beginner's Guide

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [What Is Python?](#what-is-python)
4. [Why Learn Python?](#why-learn-python)
5. [Installing Python](#installing-python)
6. [Setting Up Your Development Environment](#setting-up-your-development-environment)
7. [Your First Python Program](#your-first-python-program)
8. [Using the REPL (Interactive Mode)](#using-the-repl-interactive-mode)
9. [Common Issues and Solutions](#common-issues-and-solutions)
10. [Practice Exercises](#practice-exercises)
11. [Next Steps](#next-steps)

---

## Overview

### What You Will Learn

- The basic concepts and characteristics of Python
- Why Python is popular and where it is used
- How to install Python
- Setting up a development environment (VS Code + Python extension)
- Running your first Python program
- Using the REPL (interactive mode)

### Why It Matters

**Python** is one of the most popular programming languages in the world (ranked #1 in TIOBE Index 2024). Learning Python gives you:

- **Beginner-friendly**: Simple, readable syntax
- **Broad applicability**: Web development, data analysis, AI/ML, automation, and more
- **Rich ecosystem**: Over 1.3 million packages on PyPI
- **Career opportunities**: Data scientist, backend engineer, AI engineer, and more

### Estimated Time

- Reading this guide: 30--40 minutes
- Including environment setup: 1--2 hours

---

## Prerequisites

### Required Knowledge

**None.** This guide is written for people who have never programmed before.

### Recommended Environment

- **OS**: Windows 10/11, macOS 10.15 or later, or Linux
- **Memory**: At least 4 GB (8 GB or more recommended)
- **Disk**: At least 2 GB of free space

---

## What Is Python?

### Official Definition

The official Python website defines Python as:

> "Python is a programming language that lets you work quickly and integrate systems more effectively."

### A More Detailed Explanation

Python is a **general-purpose programming language developed by Guido van Rossum in 1991**.

#### 1. Interpreted Language

Python is an **interpreted language**. There is no compilation step -- you can run code as soon as you write it.

```python
# Write this code and run it immediately
print("Hello, World!")
```

**Difference from compiled languages (C, Java, etc.)**:
- **Compiled**: code → compile → executable → run
- **Interpreted**: code → run (directly)

#### 2. Dynamically Typed Language

Python uses **dynamic typing**. You do not need to declare the type of a variable explicitly.

```python
# No type declaration needed (type is inferred automatically)
name = "Alice"      # string
age = 25            # integer
height = 175.5      # floating-point number
is_student = True   # boolean
```

**Difference from statically typed languages (TypeScript, Java, etc.)**:
```typescript
// TypeScript (static typing)
let name: string = "Alice";
let age: number = 25;
```

```python
# Python (dynamic typing)
name = "Alice"
age = 25
```

#### 3. Object-Oriented Language

Python supports **object-oriented programming**.

```python
class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        print(f"{self.name}: Woof!")

# Create an object
my_dog = Dog("Rex")
my_dog.bark()  # Output: Rex: Woof!
```

#### 4. Batteries Included

Python has a **rich standard library**. Many features are available without installing anything extra.

```python
# File operations
import os
print(os.getcwd())  # Print current directory

# Date and time
import datetime
print(datetime.datetime.now())  # Print current time

# HTTP requests
import urllib.request
response = urllib.request.urlopen('https://example.com')
```

---

## Why Learn Python?

### 1. Readable and Easy to Write

Python is designed with **readability** as a priority.

```python
# Python code (reads like English)
if age >= 20:
    print("Adult")
else:
    print("Minor")
```

```java
// Java (for comparison)
if (age >= 20) {
    System.out.println("Adult");
} else {
    System.out.println("Minor");
}
```

**Python's characteristics**:
- Indentation (whitespace) defines blocks
- No semicolons required
- No curly braces `{}` required

### 2. Used Across Many Fields

Python is widely used in:

#### Web Development
- **Django**: Used by Instagram, Pinterest, Disqus
- **Flask**: Used by Uber, Reddit
- **FastAPI**: The fastest Python web framework

#### Data Science and Machine Learning
- **NumPy, Pandas**: Data analysis
- **Matplotlib, Seaborn**: Visualization
- **scikit-learn**: Machine learning
- **TensorFlow, PyTorch**: Deep learning

#### Automation and Scripting
- **File processing**: Bulk operations on large numbers of files
- **Web scraping**: BeautifulSoup, Scrapy
- **Task automation**: Streamlining daily work

#### Other Areas
- **Game development**: Pygame
- **Desktop apps**: Tkinter, PyQt
- **Scientific computing**: SciPy, SymPy

### 3. Rich Library Ecosystem

**PyPI (Python Package Index)** hosts over 1.3 million packages.

```bash
# Install packages with pip
pip install requests      # HTTP library
pip install pandas        # Data analysis
pip install django        # Web framework
pip install opencv-python # Image processing
```

### 4. Active Community

- **Stack Overflow**: 19 million+ Python-related questions
- **GitHub**: Python repositories are #2 across all languages
- **PyCon**: Python conferences held worldwide

### 5. High Job Demand

Python-related job postings are growing:
- Data Scientist
- Machine Learning Engineer
- Backend Engineer
- DevOps Engineer

---

## Installing Python

### Python Versions

As of 2024, the main Python versions are:
- **Python 3.12.x**: Latest stable release (recommended)
- **Python 3.11.x**: Stable release
- **Python 2.7.x**: **Deprecated** (support ended in 2020)

**Note**: Always install **Python 3.x**.

### Installation

#### Windows

1. **Visit the official site**: https://www.python.org/downloads/

2. **Download the latest version**: Click "Download Python 3.12.x"

3. **Run the installer**:
   - Check **"Add Python to PATH"** -- this is important
   - Click "Install Now"

4. **Verify installation**:
```bash
# Check in Command Prompt
python --version
# Example output: Python 3.12.0

pip --version
# Example output: pip 23.3.1
```

#### macOS

**Option 1: Official installer (recommended)**

1. Download from https://www.python.org/downloads/
2. Run the `.pkg` file
3. Install with default settings

**Option 2: Homebrew**

```bash
# If Homebrew is already installed
brew install python@3.12

# Verify
python3 --version
pip3 --version
```

#### Linux (Ubuntu/Debian)

```bash
# Update system packages
sudo apt update

# Install Python
sudo apt install python3 python3-pip

# Verify
python3 --version
pip3 --version
```

---

## Setting Up Your Development Environment

### Recommended Editor: VS Code

**Visual Studio Code (VS Code)** is a free editor that works great with Python.

#### 1. Install VS Code

1. Visit https://code.visualstudio.com/
2. Download and install

#### 2. Install the Python Extension

1. Open VS Code
2. Click the "Extensions" icon in the left sidebar
3. Search for "Python"
4. Install the **official Python extension by Microsoft**

#### 3. Create a Project Folder

```bash
# Go to your home directory
cd ~

# Create a folder for Python learning
mkdir python-learning
cd python-learning

# Open in VS Code
code .
```

---

## Your First Python Program

### Hello, World!

1. **Create a file**: In VS Code, create a file named `hello.py`

2. **Write the code**:
```python
# hello.py
print("Hello, World!")
```

3. **Run it**

**Run from terminal**:
```bash
python hello.py
# or (macOS/Linux)
python3 hello.py
```

**Output**:
```
Hello, World!
```

**Run from VS Code**: Click the "Play" button (▷) in the top right, or press `F5`.

### A Slightly More Complex Example

```python
# greeting.py
name = input("Enter your name: ")
age = input("Enter your age: ")

print(f"Hello, {name}!")
print(f"You are {age} years old.")

# Convert age to a number
age_number = int(age)
if age_number >= 18:
    print("You are an adult!")
else:
    years_left = 18 - age_number
    print(f"You will be an adult in {years_left} year(s).")
```

**Example run**:
```
$ python greeting.py
Enter your name: Alice
Enter your age: 16
Hello, Alice!
You are 16 years old.
You will be an adult in 2 year(s).
```

---

## Using the REPL (Interactive Mode)

### What Is the REPL?

The **REPL** (Read-Eval-Print Loop) is a mode that lets you run Python interactively.

- **R**ead: reads your input
- **E**val: evaluates (executes) it
- **P**rint: prints the result
- **L**oop: repeats

### Starting the REPL

```bash
# In your terminal
python
# or
python3
```

**Output**:
```python
Python 3.12.0 (main, Oct  2 2023, 14:00:00)
[Clang 15.0.0 (clang-1500.0.40.1)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>>
```

### Experimenting in the REPL

```python
>>> 2 + 3
5

>>> name = "Alice"
>>> print(f"Hello, {name}!")
Hello, Alice!

>>> numbers = [1, 2, 3, 4, 5]
>>> sum(numbers)
15

>>> # Multi-line code
>>> for i in range(3):
...     print(f"Count: {i}")
...
Count: 0
Count: 1
Count: 2

>>> # Exit
>>> exit()
```

**Benefits of the REPL**:
- **Instant experimentation**: write code and see results immediately
- **Great for learning**: handy for trying out new features
- **Calculator**: useful for quick arithmetic

---

## Common Issues and Solutions

### Issue 1: `python: command not found`

**Symptom**:
```bash
$ python --version
python: command not found
```

**Causes**:
- Python is not installed
- Python is not on your PATH

**Solutions**:

**Windows**:
1. Reinstall Python
2. Make sure to check "Add Python to PATH"

**macOS/Linux**:
```bash
# Try python3
python3 --version

# Or set an alias
echo 'alias python=python3' >> ~/.bashrc
source ~/.bashrc
```

### Issue 2: `ModuleNotFoundError`

**Symptom**:
```python
>>> import requests
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ModuleNotFoundError: No module named 'requests'
```

**Cause**: The package is not installed.

**Solution**:
```bash
pip install requests
# or
pip3 install requests
```

### Issue 3: Indentation Error

**Symptom**:
```python
if age >= 18:
print("Adult")  # No indentation
```

**Error**:
```
IndentationError: expected an indented block
```

**Solution**:
```python
if age >= 18:
    print("Adult")  # 4 spaces of indentation
```

**Python indentation rules**:
- Use a tab or 4 spaces (4 spaces recommended)
- Do not mix tabs and spaces

### Issue 4: Character Encoding Issues

**Symptom**: Non-ASCII characters are garbled.

**Solution**:
```python
# Add at the top of the file
# -*- coding: utf-8 -*-

print("Hello")
```

---

## Practice Exercises

### Exercise 1: Self-Introduction Program

**Difficulty**: Beginner

**Task**: Create a program that displays:
- Your name
- Your age
- Your favorite food

**Sample solution**:
```python
# self_intro.py
name = "Alice Smith"
age = 25
favorite_food = "Pizza"

print("== About Me ==")
print(f"Name: {name}")
print(f"Age: {age}")
print(f"Favorite food: {favorite_food}")
```

### Exercise 2: Simple Calculator

**Difficulty**: Beginner--Intermediate

**Task**: Accept two numbers as input and display the results of all four arithmetic operations.

**Sample solution**:
```python
# calculator.py
print("=== Simple Calculator ===")

num1 = float(input("Enter the first number: "))
num2 = float(input("Enter the second number: "))

addition = num1 + num2
subtraction = num1 - num2
multiplication = num1 * num2
division = num1 / num2 if num2 != 0 else "Error (cannot divide by zero)"

print(f"\n== Results ==")
print(f"{num1} + {num2} = {addition}")
print(f"{num1} - {num2} = {subtraction}")
print(f"{num1} * {num2} = {multiplication}")
print(f"{num1} / {num2} = {division}")
```

---

## Next Steps

### What You Learned in This Guide

- The basic concepts and characteristics of Python
- How to install Python
- Setting up a development environment (VS Code)
- Running your first Python program
- Using the REPL (interactive mode)

### What to Study Next

1. **[02-basic-syntax.md](./02-basic-syntax.md)** -- Variables, types, operators, string manipulation
2. **[03-control-flow.md](./03-control-flow.md)** -- Conditionals and loops

### Related Resources

- [Python.org](https://www.python.org/)
- [Python Tutorial (official)](https://docs.python.org/3/tutorial/index.html)
- [Real Python](https://realpython.com/) -- practical tutorials
- [PyPI (Python Package Index)](https://pypi.org/)

---

**Next guide**: [02-basic-syntax.md](./02-basic-syntax.md)

**Previous guide**: None (this is the first guide)



===== SOURCE: 02-programming/python-development/docs/01-basics/02-basic-syntax.md =====

# Python Basic Syntax -- A Complete Beginner's Guide

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Variables and Assignment](#variables-and-assignment)
4. [Data Types](#data-types)
5. [Operators](#operators)
6. [String Operations](#string-operations)
7. [Type Conversion](#type-conversion)
8. [Comments](#comments)
9. [Common Mistakes](#common-mistakes)
10. [Practice Exercises](#practice-exercises)
11. [Next Steps](#next-steps)

---

## Overview

### What You Will Learn

- Declaring variables and assigning values
- Basic data types (int, float, str, bool)
- Arithmetic, comparison, and logical operators
- String manipulation and formatting
- Type conversion

### Estimated Time

- Reading: 30--40 minutes
- Including exercises: 2--3 hours

---

## Prerequisites

- Completion of [01-python-intro.md](./01-python-intro.md)

---

## Variables and Assignment

### What Is a Variable?

A **variable** is like a box that stores data.

```python
# Assign values to variables
name = "Alice"
age = 25
height = 175.5

print(name)    # Alice
print(age)     # 25
print(height)  # 175.5
```

### Variable Naming Rules

```python
# Valid variable names
user_name = "Alice"
userName = "Alice"
user1 = "Alice"
_private = "private"

# Invalid variable names
# 1user = "Alice"       # starts with a digit
# user-name = "Alice"   # contains a hyphen
# class = "A"           # reserved keyword
```

**Naming conventions**:
- Only letters, digits, and underscores `_`
- Must not start with a digit
- Reserved words (keywords) cannot be used
- **Convention**: use `snake_case` (lowercase + underscores)

### Assigning Multiple Variables

```python
# Assign simultaneously
x, y, z = 10, 20, 30

# Assign the same value
a = b = c = 0

# Swap values
x, y = y, x
```

---

## Data Types

### 1. Integer (int)

```python
age = 25
year = 2024
negative = -10

print(type(age))  # <class 'int'>
```

### 2. Floating-Point Number (float)

```python
height = 175.5
pi = 3.14159
temperature = -5.0

print(type(height))  # <class 'float'>
```

### 3. String (str)

```python
name = "Alice"
message = 'Hello'
multiline = """This is a
multi-line string"""

print(type(name))  # <class 'str'>
```

### 4. Boolean (bool)

```python
is_student = True
is_adult = False

print(type(is_student))  # <class 'bool'>
```

### Checking the Type

```python
x = 10
print(type(x))             # <class 'int'>
print(isinstance(x, int))  # True
```

---

## Operators

### 1. Arithmetic Operators

```python
a = 10
b = 3

# Basic operations
print(a + b)   # 13  addition
print(a - b)   # 7   subtraction
print(a * b)   # 30  multiplication
print(a / b)   # 3.333... division

# Additional operators
print(a // b)  # 3    integer division (floor)
print(a % b)   # 1    modulo (remainder)
print(a ** b)  # 1000 exponentiation
```

### 2. Comparison Operators

```python
x = 10
y = 20

print(x == y)  # False  equal
print(x != y)  # True   not equal
print(x > y)   # False  greater than
print(x < y)   # True   less than
print(x >= y)  # False  greater than or equal
print(x <= y)  # True   less than or equal
```

### 3. Logical Operators

```python
age = 25
has_license = True

# and
print(age >= 18 and has_license)  # True

# or
print(age < 18 or has_license)    # True

# not
print(not has_license)            # False
```

### 4. Assignment Operators

```python
x = 10

x += 5   # x = x + 5  -> 15
x -= 3   # x = x - 3  -> 12
x *= 2   # x = x * 2  -> 24
x /= 4   # x = x / 4  -> 6.0
```

---

## String Operations

### String Concatenation

```python
first_name = "Alice"
last_name = "Smith"

# + operator
full_name = last_name + " " + first_name
print(full_name)  # Smith Alice

# * operator (repetition)
print("=" * 20)  # ====================
```

### String Formatting

```python
name = "Alice"
age = 25

# f-string (recommended)
message = f"My name is {name} and I am {age} years old."
print(message)

# format()
message = "My name is {} and I am {} years old.".format(name, age)

# % operator (older style)
message = "My name is %s and I am %d years old." % (name, age)
```

### String Indexing and Slicing

```python
text = "Hello, World!"

# Indexing
print(text[0])      # H
print(text[-1])     # !

# Slicing
print(text[0:5])    # Hello
print(text[7:])     # World!
print(text[:5])     # Hello
print(text[::2])    # Hlo ol!  (every 2nd character)
```

### String Methods

```python
text = "  Hello, World!  "

print(text.upper())                      # "  HELLO, WORLD!  "
print(text.lower())                      # "  hello, world!  "
print(text.strip())                      # "Hello, World!"
print(text.replace("World", "Python"))   # "  Hello, Python!  "
print(text.split(","))                   # ['  Hello', ' World!  ']
print(len(text))                         # 17
```

---

## Type Conversion

### Explicit Type Conversion

```python
# String to integer
age_str = "25"
age_int = int(age_str)
print(type(age_int))  # <class 'int'>

# String to float
height_str = "175.5"
height_float = float(height_str)

# Integer to string
num = 100
num_str = str(num)

# Number to boolean
print(bool(0))    # False
print(bool(1))    # True
print(bool(""))   # False (empty string)
print(bool("a"))  # True
```

### Common Errors

```python
# Invalid string passed to int()
# age = int("twenty-five")  # ValueError

# Correct
age = int("25")

# Cannot concatenate string and number
# message = "I am " + 25 + " years old"  # TypeError

# Correct
message = "I am " + str(25) + " years old"
# or
message = f"I am {25} years old"
```

---

## Comments

### Single-Line Comments

```python
# This is a comment
print("Hello")  # Inline comment
```

### Multi-Line Comments

```python
"""
This is a
multi-line comment
"""

'''
Single quotes work
too
'''
```

### Docstrings

```python
def greet(name):
    """
    Displays a greeting.

    Args:
        name (str): The name to greet
    """
    print(f"Hello, {name}!")
```

---

## Common Mistakes

### Mistake 1: Type Mismatch

```python
# Error
age = "25"
next_year = age + 1  # TypeError

# Fixed
age = int("25")
next_year = age + 1
```

### Mistake 2: Typo in Variable Name

```python
user_name = "Alice"
print(username)  # NameError
```

### Mistake 3: Confusing Integer Division and Regular Division

```python
# In Python 3
print(10 / 3)   # 3.333... (float)
print(10 // 3)  # 3        (int)
```

---

## Practice Exercises

### Exercise 1: BMI Calculator

```python
# BMI = weight(kg) / height(m)^2

weight = float(input("Weight (kg): "))
height = float(input("Height (cm): "))

height_m = height / 100  # convert cm to m
bmi = weight / (height_m ** 2)

print(f"Your BMI is {bmi:.1f}")
```

### Exercise 2: Temperature Converter

```python
# Celsius to Fahrenheit: F = C * 9/5 + 32

celsius = float(input("Temperature in Celsius: "))
fahrenheit = celsius * 9/5 + 32

print(f"{celsius}°C = {fahrenheit:.1f}°F")
```

---

## Next Steps

### What You Learned in This Guide

- Variables and assignment
- Basic data types
- Operators
- String operations
- Type conversion

### What to Study Next

1. **[03-control-flow.md](./03-control-flow.md)** -- Conditionals and loops

---

**Next guide**: [03-control-flow.md](./03-control-flow.md)

**Previous guide**: [01-python-intro.md](./01-python-intro.md)



===== SOURCE: 02-programming/python-development/docs/01-basics/03-control-flow.md =====

# Control Flow -- A Complete Beginner's Guide

## Table of Contents

1. [Overview](#overview)
2. [if Statements (Conditionals)](#if-statements-conditionals)
3. [for Loops](#for-loops)
4. [while Loops](#while-loops)
5. [break, continue, and pass](#break-continue-and-pass)
6. [Practice Exercises](#practice-exercises)
7. [Next Steps](#next-steps)

---

## Overview

### What You Will Learn

- if/elif/else (conditionals)
- for loops (iteration)
- while loops
- break, continue, pass

### Estimated Time: 1--2 hours

---

## if Statements (Conditionals)

### Basic Form

```python
age = 20

if age >= 20:
    print("Adult")
```

### if-else

```python
age = 18

if age >= 20:
    print("Adult")
else:
    print("Minor")
```

### if-elif-else

```python
score = 85

if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("D")
```

### Multiple Conditions

```python
age = 25
has_license = True

if age >= 18 and has_license:
    print("You can drive")
elif age >= 18 and not has_license:
    print("Please get a license")
else:
    print("Under 18")
```

### Ternary Expression

```python
age = 20
status = "Adult" if age >= 20 else "Minor"
print(status)  # Adult
```

---

## for Loops

### Looping with range()

```python
# 0 to 4
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# 1 to 5
for i in range(1, 6):
    print(i)  # 1, 2, 3, 4, 5

# Step of 2
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8
```

### Looping Over a List

```python
fruits = ["apple", "banana", "orange"]

for fruit in fruits:
    print(fruit)

# With index
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
# 0: apple
# 1: banana
# 2: orange
```

### Nested Loops

```python
for i in range(3):
    for j in range(3):
        print(f"({i}, {j})", end=" ")
    print()  # newline
# (0, 0) (0, 1) (0, 2)
# (1, 0) (1, 1) (1, 2)
# (2, 0) (2, 1) (2, 2)
```

---

## while Loops

### Basic Form

```python
count = 0
while count < 5:
    print(count)
    count += 1
# 0, 1, 2, 3, 4
```

### Infinite Loop (with break)

```python
# Use break to exit
while True:
    answer = input("Continue? (y/n): ")
    if answer == "n":
        break
    print("Continuing...")
```

---

## break, continue, and pass

### break (exit the loop)

```python
for i in range(10):
    if i == 5:
        break
    print(i)
# 0, 1, 2, 3, 4
```

### continue (skip to the next iteration)

```python
for i in range(5):
    if i == 2:
        continue
    print(i)
# 0, 1, 3, 4
```

### pass (do nothing)

```python
for i in range(5):
    if i == 2:
        pass  # implement later
    else:
        print(i)
```

---

## Practice Exercises

### Exercise 1: Multiplication Table

```python
for i in range(1, 10):
    for j in range(1, 10):
        print(f"{i * j:3}", end=" ")
    print()
```

### Exercise 2: FizzBuzz

```python
for i in range(1, 101):
    if i % 15 == 0:
        print("FizzBuzz")
    elif i % 3 == 0:
        print("Fizz")
    elif i % 5 == 0:
        print("Buzz")
    else:
        print(i)
```

---

## Next Steps

**Next guide**: [04-functions.md](./04-functions.md) -- Defining and using functions



===== SOURCE: 02-programming/python-development/docs/01-basics/04-functions.md =====

# Functions -- A Complete Beginner's Guide

## Table of Contents

1. [Overview](#overview)
2. [Defining Functions](#defining-functions)
3. [Arguments](#arguments)
4. [Return Values](#return-values)
5. [Scope](#scope)
6. [Lambda Expressions](#lambda-expressions)
7. [Practice Exercises](#practice-exercises)
8. [Next Steps](#next-steps)

---

## Overview

### What You Will Learn

- Defining and calling functions
- Arguments (positional, keyword, default)
- Return values
- Scope (variable visibility)
- Lambda expressions (anonymous functions)

### Estimated Time: 1--2 hours

---

## Defining Functions

### Basic Form

```python
def greet():
    print("Hello!")

greet()  # Hello!
```

### Docstrings

```python
def greet():
    """
    Displays a greeting.
    """
    print("Hello!")

print(greet.__doc__)  # Displays the docstring
```

---

## Arguments

### Positional Arguments

```python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # Hello, Alice!
```

### Multiple Arguments

```python
def add(a, b):
    result = a + b
    print(f"{a} + {b} = {result}")

add(10, 20)  # 10 + 20 = 30
```

### Default Arguments

```python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")              # Hello, Alice!
greet("Bob", "Good morning")  # Good morning, Bob!
```

### Keyword Arguments

```python
def profile(name, age, city):
    print(f"Name: {name}, Age: {age}, City: {city}")

profile(name="Alice", age=25, city="New York")
profile(city="London", name="Bob", age=30)  # order does not matter
```

### Variable-Length Arguments

```python
# *args (tuple)
def sum_all(*numbers):
    total = sum(numbers)
    print(f"Total: {total}")

sum_all(1, 2, 3)        # Total: 6
sum_all(10, 20, 30, 40) # Total: 100

# **kwargs (dictionary)
def print_info(**info):
    for key, value in info.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="New York")
```

---

## Return Values

### The return Statement

```python
def add(a, b):
    return a + b

result = add(10, 20)
print(result)  # 30
```

### Multiple Return Values

```python
def calculate(a, b):
    return a + b, a - b, a * b, a / b

add, sub, mul, div = calculate(10, 2)
print(add, sub, mul, div)  # 12 8 20 5.0
```

### Early Return

```python
def is_adult(age):
    if age < 0:
        return None  # invalid value
    if age >= 18:
        return True
    return False

print(is_adult(25))   # True
print(is_adult(-5))   # None
```

---

## Scope

### Local and Global Variables

```python
# Global variable
x = 10

def func():
    # Local variable
    y = 20
    print(f"Inside function: x={x}, y={y}")

func()
print(f"Outside function: x={x}")
# print(y)  # NameError (y is not accessible outside the function)
```

### The global Declaration

```python
count = 0

def increment():
    global count
    count += 1

increment()
increment()
print(count)  # 2
```

---

## Lambda Expressions

### Basic Form

```python
# Regular function
def square(x):
    return x ** 2

# Lambda expression (same behavior)
square = lambda x: x ** 2

print(square(5))  # 25
```

### Usage Examples

```python
# Sorting a list
pairs = [(1, 'one'), (3, 'three'), (2, 'two')]
pairs.sort(key=lambda pair: pair[1])
print(pairs)  # [(1, 'one'), (3, 'three'), (2, 'two')]

# Combined with map()
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25]
```

---

## Practice Exercises

### Exercise 1: FizzBuzz Function

```python
def fizzbuzz(n):
    """
    Determines the FizzBuzz result for n.

    Args:
        n (int): The number to evaluate

    Returns:
        str: The result
    """
    if n % 15 == 0:
        return "FizzBuzz"
    elif n % 3 == 0:
        return "Fizz"
    elif n % 5 == 0:
        return "Buzz"
    else:
        return str(n)

for i in range(1, 21):
    print(fizzbuzz(i))
```

### Exercise 2: Factorial

```python
def factorial(n):
    """
    Computes the factorial of n.

    Args:
        n (int): The number to compute the factorial of

    Returns:
        int: n!
    """
    if n == 0 or n == 1:
        return 1
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

print(factorial(5))  # 120
```

---

## Next Steps

**Next guide**: [05-data-structures.md](./05-data-structures.md) -- Lists, dictionaries, and tuples



===== SOURCE: 02-programming/python-development/docs/01-basics/05-data-structures.md =====

# Data Structures -- A Complete Beginner's Guide

## Table of Contents

1. [Overview](#overview)
2. [Lists](#lists)
3. [Tuples](#tuples)
4. [Dictionaries](#dictionaries)
5. [Sets](#sets)
6. [Comprehensions](#comprehensions)
7. [Practice Exercises](#practice-exercises)
8. [Next Steps](#next-steps)

---

## Overview

### What You Will Learn

- Lists (mutable, ordered)
- Tuples (immutable, ordered)
- Dictionaries (key-value pairs)
- Sets (no duplicates, unordered)
- Comprehensions (concise syntax)

### Estimated Time: 2--3 hours

---

## Lists

### Basic Operations

```python
# Create a list
fruits = ["apple", "banana", "orange"]

# Index access
print(fruits[0])   # apple
print(fruits[-1])  # orange

# Slicing
print(fruits[0:2])  # ['apple', 'banana']

# Length
print(len(fruits))  # 3
```

### Modifying a List

```python
fruits = ["apple", "banana", "orange"]

# Add items
fruits.append("grape")
fruits.insert(1, "strawberry")  # insert at position 1

# Remove items
fruits.remove("banana")  # remove by value
del fruits[0]            # remove by index
last = fruits.pop()      # remove and return last item

# Change an item
fruits[0] = "melon"

# Sort
numbers = [3, 1, 4, 1, 5]
numbers.sort()    # [1, 1, 3, 4, 5]
numbers.reverse() # [5, 4, 3, 1, 1]
```

### List Methods

```python
numbers = [1, 2, 3, 2, 4]

numbers.count(2)         # count of 2 -> 2
numbers.index(3)         # position of 3 -> 2
numbers.extend([5, 6])   # merge another list
numbers.clear()          # remove all items
```

---

## Tuples

### Characteristics: Immutable

```python
# Create a tuple
point = (10, 20)
colors = ("red", "green", "blue")

# Access
print(point[0])   # 10

# Cannot modify
# point[0] = 15  # TypeError

# Unpacking
x, y = point
print(x, y)  # 10 20

# Single-element tuple (comma required)
single = (42,)
```

### Use Cases for Tuples

```python
# Multiple return values
def get_user():
    return "Alice", 25, "New York"

name, age, city = get_user()

# As dictionary keys (lists cannot be used as keys)
locations = {
    (0, 0): "origin",
    (1, 0): "right",
    (0, 1): "up"
}
```

---

## Dictionaries

### Basic Operations

```python
# Create a dictionary
user = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}

# Access
print(user["name"])                     # Alice
print(user.get("age"))                  # 25
print(user.get("email", "not set"))     # default value

# Add / update
user["email"] = "alice@example.com"
user["age"] = 26

# Delete
del user["city"]
email = user.pop("email")  # remove and return value
```

### Dictionary Methods

```python
user = {"name": "Alice", "age": 25}

# Keys, values, and pairs
print(user.keys())    # dict_keys(['name', 'age'])
print(user.values())  # dict_values(['Alice', 25])
print(user.items())   # dict_items([('name', 'Alice'), ('age', 25)])

# Loop
for key, value in user.items():
    print(f"{key}: {value}")

# Check for key
if "name" in user:
    print("'name' key exists")
```

---

## Sets

### Characteristics: No Duplicates, Unordered

```python
# Create a set
numbers = {1, 2, 3, 2, 1}  # duplicates are removed
print(numbers)  # {1, 2, 3}

# Add / remove
numbers.add(4)
numbers.remove(1)    # raises error if not present
numbers.discard(10)  # safe even if not present

# Set operations
a = {1, 2, 3}
b = {3, 4, 5}

print(a | b)  # union:        {1, 2, 3, 4, 5}
print(a & b)  # intersection: {3}
print(a - b)  # difference:   {1, 2}
print(a ^ b)  # symmetric diff: {1, 2, 4, 5}
```

---

## Comprehensions

### List Comprehensions

```python
# Traditional way
squares = []
for i in range(10):
    squares.append(i ** 2)

# List comprehension (concise)
squares = [i ** 2 for i in range(10)]

# With condition
evens = [i for i in range(10) if i % 2 == 0]
# [0, 2, 4, 6, 8]
```

### Dictionary Comprehensions

```python
squares = {i: i ** 2 for i in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
```

### Set Comprehensions

```python
unique_lengths = {len(word) for word in ["apple", "banana", "pear"]}
# {4, 5, 6}
```

---

## Practice Exercises

### Exercise 1: List Operations

```python
# Create a list of even numbers from 1 to 100
evens = [i for i in range(1, 101) if i % 2 == 0]

# Sum and average
total = sum(evens)
average = total / len(evens)
print(f"Sum: {total}, Average: {average}")
```

### Exercise 2: Dictionary Operations

```python
# Student grade management
students = {
    "Alice": {"math": 80, "english": 75},
    "Bob":   {"math": 90, "english": 85},
    "Carol": {"math": 70, "english": 80}
}

# Average score per student
for name, scores in students.items():
    avg = sum(scores.values()) / len(scores)
    print(f"{name}'s average: {avg}")
```

---

## Next Steps

**Next guide**: [06-modules-packages.md](./06-modules-packages.md) -- Modules and packages



===== SOURCE: 02-programming/python-development/docs/01-basics/06-modules-packages.md =====

# Modules and Packages -- A Complete Beginner's Guide

## Table of Contents

1. [Overview](#overview)
2. [What Are Modules?](#what-are-modules)
3. [The Standard Library](#the-standard-library)
4. [pip and Package Management](#pip-and-package-management)
5. [Virtual Environments](#virtual-environments)
6. [Practice Exercises](#practice-exercises)
7. [Next Steps](#next-steps)

---

## Overview

### What You Will Learn

- Importing modules
- Using the standard library
- Installing packages with pip
- Creating and using virtual environments

### Estimated Time: 1--2 hours

---

## What Are Modules?

### Importing Modules

```python
# Import an entire module
import math
print(math.pi)        # 3.141592...
print(math.sqrt(16))  # 4.0

# Import specific functions
from math import pi, sqrt
print(pi)
print(sqrt(16))

# Import with an alias
import math as m
print(m.pi)

# Import everything (not recommended)
from math import *
```

### Writing Your Own Module

```python
# mymodule.py
def greet(name):
    return f"Hello, {name}!"

PI = 3.14159

# main.py
import mymodule
print(mymodule.greet("Alice"))
print(mymodule.PI)
```

---

## The Standard Library

### Commonly Used Standard Libraries

#### os (Operating System)

```python
import os

# Current directory
print(os.getcwd())

# List files in the directory
print(os.listdir("."))

# Join paths
path = os.path.join("folder", "file.txt")
```

#### datetime (Date and Time)

```python
from datetime import datetime, timedelta

# Current time
now = datetime.now()
print(now.strftime("%Y-%m-%d %H:%M:%S"))

# Date arithmetic
tomorrow = now + timedelta(days=1)
print(tomorrow)
```

#### random (Random Numbers)

```python
import random

# Random integer
print(random.randint(1, 10))

# Random choice from a list
fruits = ["apple", "banana", "orange"]
print(random.choice(fruits))

# Shuffle
random.shuffle(fruits)
```

#### json (JSON Processing)

```python
import json

# Dictionary to JSON string
data = {"name": "Alice", "age": 25}
json_str = json.dumps(data)

# JSON string to dictionary
data2 = json.loads(json_str)
```

---

## pip and Package Management

### Basic pip Commands

```bash
# Install a package
pip install requests

# Install a specific version
pip install requests==2.28.0

# Install multiple packages
pip install requests pandas numpy

# List installed packages
pip list

# Uninstall a package
pip uninstall requests

# Show package information
pip show requests

# Upgrade a package
pip install --upgrade requests
```

### requirements.txt

```bash
# Save installed packages
pip freeze > requirements.txt

# Install from requirements.txt
pip install -r requirements.txt
```

**Example requirements.txt**:
```
requests==2.28.0
pandas==1.5.0
numpy==1.23.0
```

---

## Virtual Environments

### Why Virtual Environments?

- Use different package versions per project
- Avoid affecting the system-wide Python installation
- Reproduce environments reliably with requirements.txt

### Using venv

```bash
# Create a virtual environment
python -m venv myenv

# Activate
# Windows
myenv\Scripts\activate

# macOS/Linux
source myenv/bin/activate

# Install packages (inside the virtual environment)
pip install requests

# Deactivate
deactivate
```

### Example Project Structure

```
my_project/
├── myenv/              # virtual environment (.gitignore this)
├── src/
│   └── main.py
├── requirements.txt
└── README.md
```

---

## Practice Exercises

### Exercise 1: File Operations

```python
import os

# List all .py files in the current directory
for file in os.listdir("."):
    if file.endswith(".py"):
        print(file)
```

### Exercise 2: Date Arithmetic

```python
from datetime import datetime, timedelta

# Calculate the date 100 days from now
today = datetime.now()
future = today + timedelta(days=100)
print(f"100 days from now: {future.strftime('%Y-%m-%d')}")
```

### Exercise 3: Read and Write JSON

```python
import json

# Prepare data
users = [
    {"name": "Alice", "age": 25},
    {"name": "Bob", "age": 30}
]

# Write to a JSON file
with open("users.json", "w", encoding="utf-8") as f:
    json.dump(users, f, indent=2)

# Read from a JSON file
with open("users.json", "r", encoding="utf-8") as f:
    loaded_users = json.load(f)
    print(loaded_users)
```

---

## Next Steps

### What You Learned in This Guide

- Importing modules
- Using the standard library
- Managing packages with pip
- Creating virtual environments

### Congratulations!

You have completed the Python basics series.

### What to Learn Next

1. **Object-Oriented Programming** -- classes and objects, inheritance, encapsulation
2. **File I/O** -- reading and writing files, working with CSV
3. **Error Handling** -- try/except, custom exceptions
4. **Practical Projects** -- web scraping, data analysis, web APIs

### Related Resources

- [Python Official Documentation](https://docs.python.org/3/)
- [Real Python](https://realpython.com/)
- [PyPI](https://pypi.org/)

---

**Previous guide**: [05-data-structures.md](./05-data-structures.md)



===== SOURCE: 02-programming/python-development/docs/02-best-practices/python-best-practices.md =====

# Python Best Practices

> **Goal**: Learn best practices for type safety, code quality, and maintainability in Python development.

## Table of Contents

1. [Type Hints](#type-hints)
2. [Code Quality](#code-quality)
3. [Project Structure](#project-structure)
4. [Virtual Environment Management](#virtual-environment-management)
5. [Testing](#testing)
6. [Performance](#performance)

---

## Type Hints

### Basic Type Hints

```python
# Primitive types
def greet(name: str) -> str:
    return f"Hello, {name}"

# List
def process_numbers(numbers: list[int]) -> list[int]:
    return [n * 2 for n in numbers]

# Dictionary
User = dict[str, str | int]

def get_user(user_id: int) -> User:
    return {"id": user_id, "name": "John", "age": 30}

# Optional (can be None)
from typing import Optional

def find_user(user_id: int) -> Optional[User]:
    if user_id == 0:
        return None
    return {"id": user_id, "name": "John"}

# Union (multiple types)
def process_value(value: int | str) -> str:
    return str(value)
```

### Validation with Pydantic

```python
from pydantic import BaseModel, EmailStr, Field, validator

class User(BaseModel):
    id: int
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    age: int = Field(..., ge=0, le=120)

    @validator('age')
    def age_must_be_adult(cls, v):
        if v < 18:
            raise ValueError('Must be 18 or older')
        return v

# Usage
user = User(id=1, name="John", email="john@example.com", age=25)
print(user.dict())  # {'id': 1, 'name': 'John', 'email': 'john@example.com', 'age': 25}

# Validation error
try:
    User(id=1, name="", email="invalid", age=15)
except ValidationError as e:
    print(e.json())
```

### TypedDict

```python
from typing import TypedDict

class UserDict(TypedDict):
    id: int
    name: str
    email: str

def create_user() -> UserDict:
    return {
        "id": 1,
        "name": "John",
        "email": "john@example.com"
    }

# mypy will catch type errors
user: UserDict = create_user()
print(user["name"])  # OK
# print(user["age"]) # Error: TypedDict "UserDict" has no key "age"
```

---

## Code Quality

### Linter / Formatter

**ruff (fast linter + formatter)**:
```bash
# Install
pip install ruff

# Configuration (pyproject.toml)
[tool.ruff]
line-length = 100
target-version = "py311"

[tool.ruff.lint]
select = ["E", "F", "I", "N", "W", "UP"]
ignore = ["E501"]  # leave line length to formatter

# Run
ruff check .      # Lint
ruff format .     # Format
```

**black (code formatter)**:
```bash
pip install black

# Run
black .

# Configuration (pyproject.toml)
[tool.black]
line-length = 100
target-version = ['py311']
```

**mypy (type checker)**:
```bash
pip install mypy

# Run
mypy .

# Configuration (pyproject.toml)
[tool.mypy]
python_version = "3.11"
strict = true
warn_return_any = true
warn_unused_configs = true
```

### Pre-commit Hooks

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.1.6
    hooks:
      - id: ruff
        args: [--fix]
      - id: ruff-format

  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v1.7.1
    hooks:
      - id: mypy
        additional_dependencies: [pydantic]

# Install
pip install pre-commit
pre-commit install

# Run
pre-commit run --all-files
```

---

## Project Structure

### Directory Layout

```
my-project/
├── src/
│   └── myapp/
│       ├── __init__.py
│       ├── main.py
│       ├── models/
│       │   ├── __init__.py
│       │   └── user.py
│       ├── api/
│       │   ├── __init__.py
│       │   └── routes.py
│       └── utils/
│           ├── __init__.py
│           └── helpers.py
├── tests/
│   ├── __init__.py
│   ├── test_models.py
│   └── test_api.py
├── pyproject.toml
├── requirements.txt
├── .gitignore
└── README.md
```

### pyproject.toml

```toml
[project]
name = "myapp"
version = "1.0.0"
description = "My Application"
requires-python = ">=3.11"
dependencies = [
    "fastapi>=0.104.0",
    "uvicorn>=0.24.0",
    "pydantic>=2.5.0",
]

[project.optional-dependencies]
dev = [
    "pytest>=7.4.0",
    "ruff>=0.1.6",
    "mypy>=1.7.0",
]

[build-system]
requires = ["setuptools>=68.0"]
build-backend = "setuptools.build_meta"

[tool.ruff]
line-length = 100

[tool.mypy]
strict = true

[tool.pytest.ini_options]
testpaths = ["tests"]
```

---

## Virtual Environment Management

### venv (Standard)

```bash
# Create
python -m venv venv

# Activate
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Install
pip install -r requirements.txt

# Deactivate
deactivate
```

### Poetry (Recommended)

```bash
# Install
curl -sSL https://install.python-poetry.org | python3 -

# Initialize a project
poetry init

# Add dependencies
poetry add fastapi uvicorn
poetry add --group dev pytest ruff mypy

# Install
poetry install

# Run
poetry run python main.py
poetry run pytest

# Open shell
poetry shell
```

**pyproject.toml** (Poetry):
```toml
[tool.poetry]
name = "myapp"
version = "1.0.0"
description = "My Application"

[tool.poetry.dependencies]
python = "^3.11"
fastapi = "^0.104.0"
uvicorn = "^0.24.0"

[tool.poetry.group.dev.dependencies]
pytest = "^7.4.0"
ruff = "^0.1.6"
mypy = "^1.7.0"
```

---

## Testing

### pytest

```python
# tests/test_user.py
import pytest
from myapp.models.user import User

def test_user_creation():
    user = User(id=1, name="John", email="john@example.com")
    assert user.id == 1
    assert user.name == "John"

def test_user_validation():
    with pytest.raises(ValidationError):
        User(id=1, name="", email="invalid")

# Fixture
@pytest.fixture
def sample_user():
    return User(id=1, name="John", email="john@example.com")

def test_user_name(sample_user):
    assert sample_user.name == "John"

# Parametrize
@pytest.mark.parametrize("age,expected", [
    (0, False),
    (17, False),
    (18, True),
    (30, True),
])
def test_is_adult(age, expected):
    assert is_adult(age) == expected
```

### FastAPI Testing

```python
from fastapi.testclient import TestClient
from myapp.main import app

client = TestClient(app)

def test_read_users():
    response = client.get("/users/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_user():
    response = client.post("/users/", json={
        "name": "John",
        "email": "john@example.com"
    })
    assert response.status_code == 201
    assert response.json()["name"] == "John"

def test_user_not_found():
    response = client.get("/users/999")
    assert response.status_code == 404
```

### Coverage

```bash
# Install
pip install pytest-cov

# Run
pytest --cov=src --cov-report=html

# Enforce threshold
pytest --cov=src --cov-fail-under=80
```

---

## Performance

### List Comprehensions

```python
# Slow
result = []
for i in range(1000):
    result.append(i * 2)

# Fast
result = [i * 2 for i in range(1000)]

# Generator (memory-efficient)
result = (i * 2 for i in range(1000000))
```

### Dictionary Access

```python
# Slow
if 'key' in my_dict:
    value = my_dict['key']
else:
    value = default

# Fast
value = my_dict.get('key', default)
```

### f-strings

```python
# Slow
message = "Hello, " + name + "!"

# Fast
message = f"Hello, {name}!"
```

### functools.lru_cache

```python
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n: int) -> int:
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Memoization gives instant results
print(fibonacci(100))
```

---

## Summary

### Checklist

**Type Safety**:
- [ ] Add type hints to all functions
- [ ] Use Pydantic for data validation
- [ ] Run mypy for type checking

**Code Quality**:
- [ ] Format with ruff or black
- [ ] Type-check with mypy
- [ ] Set up pre-commit hooks

**Project Structure**:
- [ ] Manage dependencies with pyproject.toml
- [ ] Use an appropriate directory structure
- [ ] Use Poetry or venv for virtual environments

**Testing**:
- [ ] Write unit tests with pytest
- [ ] Maintain at least 80% coverage
- [ ] Run tests automatically in CI/CD

---

## Next Steps

1. **fastapi-django.md**: FastAPI/Django development guide
2. **data-processing.md**: Data processing and automation guide



===== SOURCE: 02-programming/python-development/docs/03-frameworks/fastapi-django.md =====

# FastAPI & Django Development Guide

> **Goal**: Learn practical techniques for building high-quality web applications with FastAPI and Django.

## Table of Contents

1. [FastAPI Basics](#fastapi-basics)
2. [FastAPI + SQLAlchemy](#fastapi--sqlalchemy)
3. [FastAPI Authentication](#fastapi-authentication)
4. [Django Basics](#django-basics)
5. [Django REST Framework](#django-rest-framework)
6. [Performance Optimization](#performance-optimization)

---

## FastAPI Basics

### Project Setup

```bash
# Create project
mkdir myapi && cd myapi
poetry init

# Add dependencies
poetry add fastapi uvicorn[standard] pydantic pydantic-settings
poetry add --group dev pytest httpx ruff mypy

# Create directory structure
mkdir -p src/myapi/{api,models,schemas,services}
touch src/myapi/__init__.py
```

**Directory structure**:
```
myapi/
├── src/
│   └── myapi/
│       ├── __init__.py
│       ├── main.py           # application entry point
│       ├── config.py         # settings management
│       ├── api/              # API endpoints
│       │   ├── __init__.py
│       │   ├── deps.py       # dependency injection
│       │   └── v1/
│       │       ├── __init__.py
│       │       ├── users.py
│       │       └── posts.py
│       ├── models/           # database models
│       │   ├── __init__.py
│       │   └── user.py
│       ├── schemas/          # Pydantic schemas
│       │   ├── __init__.py
│       │   └── user.py
│       └── services/         # business logic
│           ├── __init__.py
│           └── user.py
├── tests/
├── pyproject.toml
└── .env
```

### Basic API Endpoints

**src/myapi/main.py**:
```python
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field

app = FastAPI(
    title="My API",
    description="FastAPI Example",
    version="1.0.0",
)


class User(BaseModel):
    id: int
    name: str = Field(..., min_length=1, max_length=100)
    email: str


class UserCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: str


# In-memory storage (for demo purposes)
users_db: dict[int, User] = {}
next_id = 1


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/users", response_model=list[User])
async def list_users():
    """List all users"""
    return list(users_db.values())


@app.get("/users/{user_id}", response_model=User)
async def get_user(user_id: int):
    """Get a specific user"""
    if user_id not in users_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    return users_db[user_id]


@app.post("/users", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_user(user: UserCreate):
    """Create a user"""
    global next_id
    new_user = User(id=next_id, **user.model_dump())
    users_db[next_id] = new_user
    next_id += 1
    return new_user


@app.put("/users/{user_id}", response_model=User)
async def update_user(user_id: int, user: UserCreate):
    """Update a user"""
    if user_id not in users_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    updated_user = User(id=user_id, **user.model_dump())
    users_db[user_id] = updated_user
    return updated_user


@app.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: int):
    """Delete a user"""
    if user_id not in users_db:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    del users_db[user_id]
```

**Run**:
```bash
# Start development server
poetry run uvicorn src.myapi.main:app --reload

# View docs
# http://localhost:8000/docs  (Swagger UI)
# http://localhost:8000/redoc (ReDoc)
```

### Environment Variable Management

**src/myapi/config.py**:
```python
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Application settings
    app_name: str = "My API"
    debug: bool = False

    # Database settings
    database_url: str = "postgresql://user:password@localhost/dbname"

    # Security settings
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    # CORS settings
    cors_origins: list[str] = ["http://localhost:3000"]

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )


settings = Settings()
```

**Add CORS to main.py**:
```python
from fastapi.middleware.cors import CORSMiddleware
from src.myapi.config import settings

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## FastAPI + SQLAlchemy

### Setup

```bash
# Add dependencies
poetry add sqlalchemy alembic psycopg2-binary
```

### Database Models

**src/myapi/database.py**:
```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from src.myapi.config import settings

engine = create_engine(settings.database_url)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    """DB session for dependency injection"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

**src/myapi/models/user.py**:
```python
from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func

from src.myapi.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
```

### Pydantic Schemas

**src/myapi/schemas/user.py**:
```python
from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


class UserBase(BaseModel):
    email: EmailStr
    name: str = Field(..., min_length=1, max_length=100)


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserUpdate(BaseModel):
    email: EmailStr | None = None
    name: str | None = Field(None, min_length=1, max_length=100)
    password: str | None = Field(None, min_length=8)


class UserInDB(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime | None

    model_config = {"from_attributes": True}


class User(UserInDB):
    """API response (excludes hashed_password)"""
    pass
```

### CRUD Operations

**src/myapi/services/user.py**:
```python
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from src.myapi.models.user import User as UserModel
from src.myapi.schemas.user import UserCreate, UserUpdate


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_user(db: Session, user_id: int) -> UserModel | None:
    return db.query(UserModel).filter(UserModel.id == user_id).first()


def get_user_by_email(db: Session, email: str) -> UserModel | None:
    return db.query(UserModel).filter(UserModel.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100) -> list[UserModel]:
    return db.query(UserModel).offset(skip).limit(limit).all()


def create_user(db: Session, user: UserCreate) -> UserModel:
    hashed_password = get_password_hash(user.password)
    db_user = UserModel(
        email=user.email,
        name=user.name,
        hashed_password=hashed_password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def update_user(db: Session, user_id: int, user: UserUpdate) -> UserModel | None:
    db_user = get_user(db, user_id)
    if not db_user:
        return None

    update_data = user.model_dump(exclude_unset=True)
    if "password" in update_data:
        update_data["hashed_password"] = get_password_hash(update_data.pop("password"))

    for field, value in update_data.items():
        setattr(db_user, field, value)

    db.commit()
    db.refresh(db_user)
    return db_user


def delete_user(db: Session, user_id: int) -> bool:
    db_user = get_user(db, user_id)
    if not db_user:
        return False
    db.delete(db_user)
    db.commit()
    return True
```

### Alembic Migrations

```bash
# Initialize
poetry run alembic init alembic

# Create migration
poetry run alembic revision --autogenerate -m "Create users table"

# Apply migration
poetry run alembic upgrade head

# Rollback
poetry run alembic downgrade -1
```

---

## FastAPI Authentication

### JWT Token Authentication

```bash
# Add dependencies
poetry add python-jose[cryptography] passlib[bcrypt]
```

**src/myapi/auth.py**:
```python
from datetime import datetime, timedelta
from typing import Any

from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from src.myapi.config import settings
from src.myapi.database import get_db
from src.myapi.services import user as user_service

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


def create_access_token(data: dict[str, Any], expires_delta: timedelta | None = None) -> str:
    """Create an access token"""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_minutes)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
    return encoded_jwt


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """Get the current user (authentication required)"""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=[settings.algorithm])
        user_id: int = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = user_service.get_user(db, user_id=user_id)
    if user is None:
        raise credentials_exception

    return user


def get_current_active_user(current_user=Depends(get_current_user)):
    """Get the current active user"""
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Inactive user"
        )
    return current_user
```

**Login endpoint (src/myapi/api/v1/auth.py)**:
```python
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from pydantic import BaseModel

from src.myapi.database import get_db
from src.myapi.services.user import verify_password, get_user_by_email
from src.myapi.auth import create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])


class Token(BaseModel):
    access_token: str
    token_type: str


@router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Login and obtain token"""
    user = get_user_by_email(db, form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(data={"sub": user.id})
    return {"access_token": access_token, "token_type": "bearer"}
```

**Protected endpoint example**:
```python
from fastapi import APIRouter, Depends
from src.myapi.auth import get_current_active_user
from src.myapi.schemas.user import User

router = APIRouter()


@router.get("/me", response_model=User)
def read_users_me(current_user: User = Depends(get_current_active_user)):
    """Get current user information"""
    return current_user
```

---

## Django Basics

### Project Setup

```bash
# Create project
mkdir myproject && cd myproject
poetry init
poetry add django psycopg2-binary
poetry add --group dev pytest pytest-django

# Create Django project
poetry run django-admin startproject config .
poetry run python manage.py startapp users
```

**Directory structure**:
```
myproject/
├── config/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── users/
│   ├── migrations/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── views.py
│   └── urls.py
├── manage.py
└── pyproject.toml
```

### Model Definitions

**users/models.py**:
```python
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """Custom user model"""
    email = models.EmailField(unique=True)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email


class Post(models.Model):
    """Post model"""
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
        ]

    def __str__(self):
        return self.title
```

### Migrations

```bash
# Create migrations
poetry run python manage.py makemigrations

# Apply migrations
poetry run python manage.py migrate

# Create superuser
poetry run python manage.py createsuperuser
```

---

## Django REST Framework

### Setup

```bash
# Add dependencies
poetry add djangorestframework djangorestframework-simplejwt
```

**config/settings.py**:
```python
INSTALLED_APPS = [
    # ...
    'rest_framework',
    'users',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
}
```

### Serializers

**users/serializers.py**:
```python
from rest_framework import serializers
from .models import User, Post


class UserSerializer(serializers.ModelSerializer):
    posts_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'bio', 'avatar', 'posts_count', 'created_at']
        read_only_fields = ['id', 'created_at']

    def get_posts_count(self, obj):
        return obj.posts.count()


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['email', 'username', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'author', 'published', 'created_at', 'updated_at']
        read_only_fields = ['id', 'author', 'created_at', 'updated_at']
```

### ViewSets

**users/views.py**:
```python
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User, Post
from .serializers import UserSerializer, UserCreateSerializer, PostSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

    @action(detail=False, methods=['get'])
    def me(self, request):
        """Get current user information"""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.select_related('author').all()

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return PostCreateSerializer
        return PostSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        if not self.request.user.is_authenticated:
            # Unauthenticated users see only published posts
            queryset = queryset.filter(published=True)
        return queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
```

### URL Configuration

**users/urls.py**:
```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, PostViewSet

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
```

**config/urls.py**:
```python
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('users.urls')),
    path('api/v1/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
```

### Testing

```python
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import User, Post


class UserAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email='test@example.com',
            username='testuser',
            password='testpass123'
        )

    def test_create_user(self):
        """Test user creation"""
        url = reverse('user-list')
        data = {
            'email': 'newuser@example.com',
            'username': 'newuser',
            'password': 'newpass123'
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)

    def test_get_me(self):
        """Test fetching own user info"""
        self.client.force_authenticate(user=self.user)
        url = reverse('user-me')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['email'], 'test@example.com')
```

```bash
# Run tests
poetry run python manage.py test
```

---

## Performance Optimization

### FastAPI Optimization

**Async processing**:
```python
from fastapi import FastAPI
import httpx
import asyncio

app = FastAPI()


@app.get("/fetch")
async def fetch_data():
    """Async call to external API"""
    async with httpx.AsyncClient() as client:
        response = await client.get("https://api.example.com/data")
        return response.json()


@app.get("/fetch-multiple")
async def fetch_multiple():
    """Call multiple APIs in parallel"""
    async with httpx.AsyncClient() as client:
        tasks = [
            client.get("https://api.example.com/data1"),
            client.get("https://api.example.com/data2"),
            client.get("https://api.example.com/data3"),
        ]
        responses = await asyncio.gather(*tasks)
        return [r.json() for r in responses]
```

**Caching**:
```python
from functools import lru_cache
from fastapi import Depends

@lru_cache()
def get_settings():
    """Cache settings"""
    return Settings()


@app.get("/config")
def get_config(settings: Settings = Depends(get_settings)):
    return {"app_name": settings.app_name}
```

**Background tasks**:
```python
from fastapi import BackgroundTasks

def send_email(email: str, message: str):
    """Email sending (slow operation)"""
    print(f"Sending email to {email}: {message}")


@app.post("/send-notification")
async def send_notification(email: str, background_tasks: BackgroundTasks):
    """Send notification (runs in background)"""
    background_tasks.add_task(send_email, email, "Welcome!")
    return {"message": "Notification sent"}
```

### Django Optimization

**Solving the N+1 problem**:
```python
# N+1 problem
posts = Post.objects.all()
for post in posts:
    print(post.author.email)  # separate DB query per post

# select_related (1-to-1, ForeignKey)
posts = Post.objects.select_related('author').all()
for post in posts:
    print(post.author.email)  # fetched with a single JOIN

# prefetch_related (ManyToMany, reverse relations)
users = User.objects.prefetch_related('posts').all()
for user in users:
    print(user.posts.count())  # fetched in 2 queries
```

**Adding indexes**:
```python
class Post(models.Model):
    # ...

    class Meta:
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['author', 'published']),
        ]
```

**Query optimization**:
```python
# Fetch all fields (avoid)
posts = Post.objects.all()

# Fetch only required fields
posts = Post.objects.only('id', 'title', 'created_at')

# Defer heavy fields
posts = Post.objects.defer('content')
```

**Caching with Redis**:
```bash
poetry add django-redis
```

```python
# config/settings.py
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}
```

```python
# Usage
from django.core.cache import cache

def get_posts():
    """Cache post list"""
    posts = cache.get('posts')
    if posts is None:
        posts = list(Post.objects.select_related('author').all())
        cache.set('posts', posts, 60 * 15)  # cache for 15 minutes
    return posts
```

---

## Summary

### FastAPI Checklist

- [ ] Type safety with Pydantic schemas
- [ ] Environment variable management (pydantic-settings)
- [ ] SQLAlchemy + Alembic for database management
- [ ] JWT authentication
- [ ] Async processing for external API calls
- [ ] Tests with pytest + httpx

### Django Checklist

- [ ] Custom user model (AbstractUser)
- [ ] Django REST Framework setup
- [ ] JWT authentication (simplejwt)
- [ ] N+1 problem resolved (select_related / prefetch_related)
- [ ] Redis caching
- [ ] Tests with pytest-django



===== SOURCE: 02-programming/python-development/docs/04-data-processing/data-processing.md =====

# Python Data Processing and Automation Guide

> **Goal**: Learn practical techniques for efficient data processing, automation, scraping, and data analysis with Python.

## Table of Contents

1. [Data Processing Basics](#data-processing-basics)
2. [File Processing](#file-processing)
3. [Data Analysis](#data-analysis)
4. [Web Scraping](#web-scraping)
5. [Automation](#automation)
6. [Parallel Processing](#parallel-processing)

---

## Data Processing Basics

### List and Dictionary Operations

**List comprehensions**:
```python
# Basic
numbers = [1, 2, 3, 4, 5]
squared = [n ** 2 for n in numbers]
# [1, 4, 9, 16, 25]

# With condition
evens = [n for n in numbers if n % 2 == 0]
# [2, 4]

# Complex transformation
users = [
    {"name": "Alice", "age": 25},
    {"name": "Bob", "age": 30},
]
names = [user["name"].upper() for user in users if user["age"] >= 25]
# ['ALICE', 'BOB']

# Nested loops
matrix = [[1, 2], [3, 4], [5, 6]]
flattened = [num for row in matrix for num in row]
# [1, 2, 3, 4, 5, 6]
```

**Dictionary comprehensions**:
```python
# Basic
numbers = [1, 2, 3, 4, 5]
squared_dict = {n: n ** 2 for n in numbers}
# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Transform keys
user = {"name": "Alice", "age": 25, "city": "Tokyo"}
upper_keys = {k.upper(): v for k, v in user.items()}
# {'NAME': 'Alice', 'AGE': 25, 'CITY': 'Tokyo'}

# Filtering
filtered = {k: v for k, v in user.items() if isinstance(v, str)}
# {'name': 'Alice', 'city': 'Tokyo'}

# Build dict from two lists
keys = ["name", "age", "city"]
values = ["Alice", 25, "Tokyo"]
user_dict = {k: v for k, v in zip(keys, values)}
# {'name': 'Alice', 'age': 25, 'city': 'Tokyo'}
```

### Dataclasses

```python
from dataclasses import dataclass, field


@dataclass
class User:
    name: str
    age: int
    email: str
    tags: list[str] = field(default_factory=list)

    def __post_init__(self):
        if self.age < 0:
            raise ValueError("Age must be positive")


# Usage
user = User(name="Alice", age=25, email="alice@example.com")
print(user)
# User(name='Alice', age=25, email='alice@example.com', tags=[])

user.tags.append("admin")
print(user.tags)
# ['admin']


@dataclass(frozen=True)  # Immutable
class Point:
    x: int
    y: int


point = Point(x=10, y=20)
# point.x = 30  # Error: frozen dataclass
```

### Iterators and Generators

**Generators**:
```python
# Basic
def count_up(max_count: int):
    """Count-up generator"""
    count = 0
    while count < max_count:
        yield count
        count += 1


for num in count_up(5):
    print(num)  # 0, 1, 2, 3, 4


# Generator expression
squared = (n ** 2 for n in range(1000000))  # memory-efficient
first_10 = list(squared)[:10]


# Reading large files efficiently
def read_large_file(file_path: str):
    """Process a large file line by line"""
    with open(file_path) as f:
        for line in f:
            yield line.strip()


for line in read_large_file("large_file.txt"):
    process_line(line)
```

**itertools**:
```python
from itertools import chain, combinations, groupby, islice, product

# chain: combine multiple iterables
list1 = [1, 2, 3]
list2 = [4, 5, 6]
combined = list(chain(list1, list2))
# [1, 2, 3, 4, 5, 6]

# combinations: all combinations
items = ['A', 'B', 'C']
combos = list(combinations(items, 2))
# [('A', 'B'), ('A', 'C'), ('B', 'C')]

# product: Cartesian product
colors = ['red', 'green']
sizes = ['S', 'M', 'L']
products = list(product(colors, sizes))
# [('red', 'S'), ('red', 'M'), ('red', 'L'), ('green', 'S'), ...]

# groupby: group items
data = [
    {"name": "Alice", "dept": "Sales"},
    {"name": "Bob", "dept": "Sales"},
    {"name": "Charlie", "dept": "Engineering"},
]
data.sort(key=lambda x: x["dept"])  # must sort before groupby

for dept, group in groupby(data, key=lambda x: x["dept"]):
    print(f"{dept}: {[user['name'] for user in group]}")
# Sales: ['Alice', 'Bob']
# Engineering: ['Charlie']

# islice: slice an iterable
numbers = range(100)
first_10 = list(islice(numbers, 10))
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
```

---

## File Processing

### CSV Processing

```python
import csv
from pathlib import Path
from typing import Iterator


def read_csv(file_path: str) -> Iterator[dict[str, str]]:
    """Read CSV as an iterator of dicts"""
    with open(file_path, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            yield row


def write_csv(file_path: str, data: list[dict[str, str]], fieldnames: list[str]):
    """Write list of dicts to CSV"""
    with open(file_path, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data)


# Usage
users = [
    {"name": "Alice", "age": "25", "city": "Tokyo"},
    {"name": "Bob", "age": "30", "city": "Osaka"},
]
write_csv("users.csv", users, fieldnames=["name", "age", "city"])

for user in read_csv("users.csv"):
    print(user["name"], user["age"])
```

**CSV processing with pandas**:
```python
import pandas as pd

# Read CSV
df = pd.read_csv("users.csv")

# Inspect data
print(df.head())
print(df.info())
print(df.describe())

# Filter
adults = df[df["age"] >= 20]

# Add column
df["age_group"] = df["age"].apply(lambda age: "adult" if age >= 20 else "minor")

# Group by
grouped = df.groupby("city")["age"].mean()

# Write CSV
df.to_csv("output.csv", index=False, encoding='utf-8')
```

### JSON Processing

```python
import json
from typing import Any


def read_json(file_path: str) -> dict[str, Any]:
    """Read a JSON file"""
    with open(file_path, encoding='utf-8') as f:
        return json.load(f)


def write_json(file_path: str, data: dict[str, Any], indent: int = 2):
    """Write to a JSON file"""
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=indent, ensure_ascii=False)


# Usage
data = {
    "users": [
        {"name": "Alice", "age": 25},
        {"name": "Bob", "age": 30},
    ]
}
write_json("data.json", data)

loaded = read_json("data.json")
print(loaded["users"][0]["name"])  # Alice


# JSON Lines (JSONL) processing
def read_jsonl(file_path: str):
    """Read JSONL line by line"""
    with open(file_path, encoding='utf-8') as f:
        for line in f:
            yield json.loads(line.strip())


def write_jsonl(file_path: str, data: list[dict[str, Any]]):
    """Write JSONL"""
    with open(file_path, 'w', encoding='utf-8') as f:
        for item in data:
            f.write(json.dumps(item, ensure_ascii=False) + '\n')
```

### Excel Processing

```bash
pip install openpyxl pandas
```

```python
import pandas as pd

# Read Excel
df = pd.read_excel("data.xlsx", sheet_name="Sheet1")

# Read all sheets
dfs = pd.read_excel("data.xlsx", sheet_name=None)
for sheet_name, df in dfs.items():
    print(f"Sheet: {sheet_name}")
    print(df.head())

# Write Excel
df.to_excel("output.xlsx", index=False, sheet_name="Results")

# Write multiple sheets
with pd.ExcelWriter("multi_sheet.xlsx") as writer:
    df1.to_excel(writer, sheet_name="Sheet1", index=False)
    df2.to_excel(writer, sheet_name="Sheet2", index=False)
```

**Direct manipulation with openpyxl**:
```python
from openpyxl import Workbook, load_workbook

# Create new workbook
wb = Workbook()
ws = wb.active
ws.title = "Users"

# Write data
ws['A1'] = "Name"
ws['B1'] = "Age"
ws.append(["Alice", 25])
ws.append(["Bob", 30])

wb.save("users.xlsx")

# Read existing file
wb = load_workbook("users.xlsx")
ws = wb["Users"]

for row in ws.iter_rows(min_row=2, values_only=True):
    name, age = row
    print(f"{name}: {age}")

wb.close()
```

---

## Data Analysis

### pandas Basics

```bash
pip install pandas numpy matplotlib
```

**Basic operations**:
```python
import pandas as pd
import numpy as np

# Create DataFrame
df = pd.DataFrame({
    "name": ["Alice", "Bob", "Charlie"],
    "age": [25, 30, 35],
    "city": ["Tokyo", "Osaka", "Tokyo"],
    "salary": [50000, 60000, 70000],
})

# Inspect
print(df.head())
print(df.info())
print(df.describe())

# Select columns
names = df["name"]
subset = df[["name", "age"]]

# Select rows
first_row = df.iloc[0]
tokyo_users = df[df["city"] == "Tokyo"]
high_salary = df[df["salary"] >= 60000]

# Multiple conditions
tokyo_adults = df[(df["city"] == "Tokyo") & (df["age"] >= 30)]

# Sort
sorted_df = df.sort_values("age", ascending=False)

# Aggregate
print(df["age"].mean())
print(df["salary"].sum())
print(df.groupby("city")["salary"].mean())
```

**Data cleaning**:
```python
# Handle missing values
df = pd.DataFrame({
    "name": ["Alice", "Bob", None],
    "age": [25, None, 35],
})

# Check for missing values
print(df.isnull().sum())

# Drop missing values
df_dropped = df.dropna()

# Fill missing values
df_filled = df.fillna({"age": df["age"].mean()})

# Remove duplicates
df_unique = df.drop_duplicates()

# Type conversion
df["age"] = df["age"].astype(int)
```

**Merging data**:
```python
users = pd.DataFrame({
    "user_id": [1, 2, 3],
    "name": ["Alice", "Bob", "Charlie"],
})

orders = pd.DataFrame({
    "order_id": [101, 102, 103],
    "user_id": [1, 1, 2],
    "amount": [100, 200, 150],
})

# Inner Join
merged = pd.merge(users, orders, on="user_id", how="inner")

# Left Join
merged_left = pd.merge(users, orders, on="user_id", how="left")

# Concat (vertical)
df1 = pd.DataFrame({"name": ["Alice"]})
df2 = pd.DataFrame({"name": ["Bob"]})
combined = pd.concat([df1, df2], ignore_index=True)
```

### Data Visualization

```python
import matplotlib.pyplot as plt
import pandas as pd

# Sample data
df = pd.DataFrame({
    "month": ["Jan", "Feb", "Mar", "Apr", "May"],
    "sales": [100, 120, 140, 130, 160],
    "costs": [80, 90, 100, 95, 110],
})

# Line chart
plt.figure(figsize=(10, 6))
plt.plot(df["month"], df["sales"], marker='o', label='Sales')
plt.plot(df["month"], df["costs"], marker='s', label='Costs')
plt.xlabel("Month")
plt.ylabel("Amount")
plt.title("Sales and Costs")
plt.legend()
plt.grid(True)
plt.savefig("sales_chart.png")
plt.close()

# Bar chart
plt.figure(figsize=(8, 6))
df.plot(x="month", y=["sales", "costs"], kind="bar")
plt.savefig("bar_chart.png")
plt.close()

# Scatter plot
plt.figure(figsize=(8, 6))
plt.scatter(df["sales"], df["costs"])
plt.xlabel("Sales")
plt.ylabel("Costs")
plt.title("Sales vs Costs")
plt.savefig("scatter.png")
plt.close()
```

---

## Web Scraping

### requests + BeautifulSoup

```bash
pip install requests beautifulsoup4 lxml
```

```python
import requests
from bs4 import BeautifulSoup


def scrape_articles(url: str) -> list[dict[str, str]]:
    """Scrape article list"""
    response = requests.get(url, headers={
        "User-Agent": "Mozilla/5.0 (compatible; MyBot/1.0)"
    })
    response.raise_for_status()

    soup = BeautifulSoup(response.content, 'lxml')
    articles = []

    for article in soup.select(".article-item"):
        title = article.select_one(".title").get_text(strip=True)
        link = article.select_one("a")["href"]
        date = article.select_one(".date").get_text(strip=True)

        articles.append({
            "title": title,
            "link": link,
            "date": date,
        })

    return articles


# Usage
articles = scrape_articles("https://example.com/articles")
for article in articles:
    print(f"{article['title']} - {article['date']}")
```

**Rate limiting**:
```python
import time
import requests


def scrape_multiple_pages(base_url: str, max_pages: int = 10) -> list[dict]:
    """Scrape multiple pages with rate limiting"""
    all_articles = []

    for page in range(1, max_pages + 1):
        url = f"{base_url}?page={page}"
        print(f"Scraping page {page}...")

        articles = scrape_articles(url)
        all_articles.extend(articles)

        # Rate limit: wait 1 second between requests
        time.sleep(1)

    return all_articles
```

### Selenium for Dynamic Content

```bash
pip install selenium webdriver-manager
```

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


def scrape_dynamic_content(url: str) -> list[dict[str, str]]:
    """Scrape JavaScript-rendered content"""
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    driver = webdriver.Chrome(service=service, options=options)

    try:
        driver.get(url)

        # Wait for elements to load
        wait = WebDriverWait(driver, 10)
        wait.until(EC.presence_of_element_located((By.CLASS_NAME, "article-item")))

        articles = []
        elements = driver.find_elements(By.CLASS_NAME, "article-item")

        for element in elements:
            title = element.find_element(By.CLASS_NAME, "title").text
            link = element.find_element(By.TAG_NAME, "a").get_attribute("href")

            articles.append({
                "title": title,
                "link": link,
            })

        return articles

    finally:
        driver.quit()
```

---

## Automation

### Command-Line Scripts

```python
import argparse
import pandas as pd


def main():
    parser = argparse.ArgumentParser(description="CSV data processing tool")
    parser.add_argument("input", type=str, help="Input CSV file")
    parser.add_argument("output", type=str, help="Output CSV file")
    parser.add_argument("--filter-age", type=int, help="Filter by minimum age")
    parser.add_argument("--verbose", "-v", action="store_true", help="Verbose output")

    args = parser.parse_args()

    if args.verbose:
        print(f"Input: {args.input}")
        print(f"Output: {args.output}")

    df = pd.read_csv(args.input)

    if args.filter_age:
        df = df[df["age"] >= args.filter_age]

    df.to_csv(args.output, index=False)

    if args.verbose:
        print(f"Processed {len(df)} rows")


if __name__ == "__main__":
    main()
```

**Usage**:
```bash
python process_csv.py input.csv output.csv --filter-age 20 --verbose
```

### Task Scheduling

**cron (Linux/macOS)**:
```bash
# Edit crontab
crontab -e

# Run daily at 9:00 AM
0 9 * * * /usr/bin/python3 /path/to/script.py

# Run every hour
0 * * * * /usr/bin/python3 /path/to/script.py

# Run every Monday at 10:00 AM
0 10 * * 1 /usr/bin/python3 /path/to/script.py
```

**schedule library (Python)**:
```bash
pip install schedule
```

```python
import schedule
import time


def job():
    print("Running scheduled job...")
    # Data processing


schedule.every().day.at("09:00").do(job)
schedule.every().hour.do(job)
schedule.every().monday.at("10:00").do(job)

while True:
    schedule.run_pending()
    time.sleep(60)
```

### Sending Email

```python
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from pathlib import Path
import os
from dotenv import load_dotenv

load_dotenv()


def send_email(
    to: str,
    subject: str,
    body: str,
    attachments: list[str] | None = None
):
    """Send an email"""
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_user = os.getenv("SMTP_USER")
    smtp_password = os.getenv("SMTP_PASSWORD")

    msg = MIMEMultipart()
    msg["From"] = smtp_user
    msg["To"] = to
    msg["Subject"] = subject

    msg.attach(MIMEText(body, "plain"))

    if attachments:
        for file_path in attachments:
            with open(file_path, "rb") as f:
                part = MIMEApplication(f.read(), Name=Path(file_path).name)
                part["Content-Disposition"] = f'attachment; filename="{Path(file_path).name}"'
                msg.attach(part)

    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.send_message(msg)


# Usage
send_email(
    to="recipient@example.com",
    subject="Daily Report",
    body="Please find the daily report attached.",
    attachments=["report.csv", "chart.png"]
)
```

---

## Parallel Processing

### multiprocessing

```python
from multiprocessing import Pool
import time


def process_item(item: int) -> int:
    """Heavy computation"""
    time.sleep(0.1)
    return item ** 2


def process_sequential(items: list[int]) -> list[int]:
    """Sequential processing"""
    return [process_item(item) for item in items]


def process_parallel(items: list[int], num_workers: int = 4) -> list[int]:
    """Parallel processing"""
    with Pool(processes=num_workers) as pool:
        results = pool.map(process_item, items)
    return results


# Benchmark
items = list(range(100))

start = time.time()
results_seq = process_sequential(items)
print(f"Sequential: {time.time() - start:.2f}s")

start = time.time()
results_par = process_parallel(items, num_workers=4)
print(f"Parallel: {time.time() - start:.2f}s")
```

### concurrent.futures

```python
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor, as_completed
import requests


def fetch_url(url: str) -> dict[str, str]:
    """Fetch a URL (I/O-bound)"""
    response = requests.get(url)
    return {"url": url, "status": response.status_code}


def process_urls_parallel(urls: list[str], max_workers: int = 10) -> list[dict]:
    """Fetch multiple URLs in parallel"""
    results = []

    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        future_to_url = {executor.submit(fetch_url, url): url for url in urls}

        for future in as_completed(future_to_url):
            url = future_to_url[future]
            try:
                result = future.result()
                results.append(result)
            except Exception as exc:
                print(f"{url} raised an exception: {exc}")

    return results


# CPU-bound tasks: use ProcessPoolExecutor
def cpu_bound_task(n: int) -> int:
    return sum(i * i for i in range(n))


def process_cpu_bound(numbers: list[int]) -> list[int]:
    with ProcessPoolExecutor(max_workers=4) as executor:
        results = list(executor.map(cpu_bound_task, numbers))
    return results
```



===== SOURCE: 02-programming/python-development/docs/05-performance/performance-optimization.md =====

# Python Performance Optimization Guide

> **Goal**: Learn practical optimization techniques, profiling, and benchmarking to maximize the performance of Python applications.

## Table of Contents

1. [Measuring Performance](#measuring-performance)
2. [Profiling](#profiling)
3. [Data Structure Optimization](#data-structure-optimization)
4. [Algorithm Optimization](#algorithm-optimization)
5. [Memory Optimization](#memory-optimization)
6. [Concurrency and Async](#concurrency-and-async)
7. [NumPy/Pandas Optimization](#numpypandas-optimization)
8. [Caching Strategies](#caching-strategies)
9. [Database Optimization](#database-optimization)

---

## Measuring Performance

### The time Module

**Basic timing**:
```python
import time

# Measure function execution time
start = time.time()
result = some_function()
end = time.time()
print(f"Execution time: {end - start:.4f} seconds")

# Higher precision (time.perf_counter)
start = time.perf_counter()
result = some_function()
end = time.perf_counter()
print(f"Execution time: {end - start:.6f} seconds")
```

**Timing decorator**:
```python
import time
from functools import wraps
from typing import Callable, Any


def timeit(func: Callable) -> Callable:
    """Decorator to measure function execution time"""
    @wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        start = time.perf_counter()
        result = func(*args, **kwargs)
        end = time.perf_counter()
        print(f"{func.__name__} took {end - start:.6f} seconds")
        return result
    return wrapper


@timeit
def process_data(data: list[int]) -> int:
    return sum(x ** 2 for x in data)


result = process_data(list(range(1000000)))
# process_data took 0.234567 seconds
```

### The timeit Module

**Benchmarking code snippets**:
```python
import timeit

# Simple timing
execution_time = timeit.timeit(
    stmt='sum(range(100))',
    number=10000
)
print(f"Time: {execution_time:.6f} seconds")

# With setup code
execution_time = timeit.timeit(
    stmt='result = [x ** 2 for x in data]',
    setup='data = list(range(1000))',
    number=10000
)
print(f"Time: {execution_time:.6f} seconds")
```

**Comparing implementations**:
```python
import timeit


def compare_implementations():
    # List comprehension
    time1 = timeit.timeit(
        stmt='[x ** 2 for x in range(1000)]',
        number=10000
    )

    # map + lambda
    time2 = timeit.timeit(
        stmt='list(map(lambda x: x ** 2, range(1000)))',
        number=10000
    )

    # for loop
    time3 = timeit.timeit(
        stmt='''
result = []
for x in range(1000):
    result.append(x ** 2)
''',
        number=10000
    )

    print(f"List comprehension: {time1:.6f}s")
    print(f"Map + lambda:       {time2:.6f}s")
    print(f"For loop:           {time3:.6f}s")


compare_implementations()
# List comprehension is fastest
```

---

## Profiling

### cProfile

```python
import cProfile
import pstats
from io import StringIO


def expensive_function():
    total = 0
    for i in range(1000000):
        total += i ** 2
    return total


def main():
    result = expensive_function()


if __name__ == "__main__":
    profiler = cProfile.Profile()
    profiler.enable()

    main()

    profiler.disable()

    stats = pstats.Stats(profiler)
    stats.sort_stats('cumulative')
    stats.print_stats(10)  # top 10
```

**Run from the command line**:
```bash
# Profile and save results
python -m cProfile -o output.prof script.py

# View results
python -m pstats output.prof
# stats> sort cumulative
# stats> stats 10
```

### line_profiler

```bash
pip install line-profiler
```

```python
# script.py
@profile  # line_profiler magic decorator
def process_data(data: list[int]) -> list[int]:
    result = []
    for item in data:
        squared = item ** 2
        if squared > 100:
            result.append(squared)
    return result


def main():
    data = list(range(10000))
    result = process_data(data)


if __name__ == "__main__":
    main()
```

```bash
# Profile line by line
kernprof -l -v script.py
```

### memory_profiler

```bash
pip install memory-profiler
```

```python
from memory_profiler import profile


@profile
def memory_intensive_function():
    data = [i for i in range(1000000)]
    squared = [x ** 2 for x in data]
    result = {i: x for i, x in enumerate(squared)}
    return result


if __name__ == "__main__":
    memory_intensive_function()
```

```bash
python -m memory_profiler script.py
```

---

## Data Structure Optimization

### List vs Tuple vs Set vs Dict

```python
import timeit


def compare_data_structures():
    # List lookup (O(n))
    list_lookup = timeit.timeit(
        stmt='999 in data',
        setup='data = list(range(1000))',
        number=10000
    )

    # Set lookup (O(1))
    set_lookup = timeit.timeit(
        stmt='999 in data',
        setup='data = set(range(1000))',
        number=10000
    )

    # Dict lookup (O(1))
    dict_lookup = timeit.timeit(
        stmt='999 in data',
        setup='data = {i: i for i in range(1000)}',
        number=10000
    )

    print(f"List lookup: {list_lookup:.6f}s")  # O(n) -- slow
    print(f"Set lookup:  {set_lookup:.6f}s")    # O(1) -- fast!
    print(f"Dict lookup: {dict_lookup:.6f}s")   # O(1) -- fast!


compare_data_structures()
```

**Choosing the right structure**:
```python
# Slow: membership test on a list
def slow_check(items: list[int], target: int) -> bool:
    return target in items  # O(n)


# Fast: membership test on a set
def fast_check(items: set[int], target: int) -> bool:
    return target in items  # O(1)
```

### collections Module

**defaultdict**:
```python
from collections import defaultdict


# Slow: manual key check
def group_slow(items: list[dict]) -> dict[str, list[dict]]:
    result = {}
    for item in items:
        category = item['category']
        if category not in result:
            result[category] = []
        result[category].append(item)
    return result


# Fast: defaultdict
def group_fast(items: list[dict]) -> dict[str, list[dict]]:
    result = defaultdict(list)
    for item in items:
        result[item['category']].append(item)
    return result
```

**Counter**:
```python
from collections import Counter


# Slow: manual counting
def count_slow(words: list[str]) -> dict[str, int]:
    counts = {}
    for word in words:
        counts[word] = counts.get(word, 0) + 1
    return counts


# Fast: Counter
def count_fast(words: list[str]) -> dict[str, int]:
    return Counter(words)
```

**deque (double-ended queue)**:
```python
from collections import deque
import timeit

# List insert at front is slow (O(n))
list_insert = timeit.timeit(
    stmt='data.insert(0, 1)',
    setup='data = list(range(10000))',
    number=1000
)

# deque insert at front is fast (O(1))
deque_insert = timeit.timeit(
    stmt='data.appendleft(1)',
    setup='from collections import deque; data = deque(range(10000))',
    number=1000
)

print(f"List insert at front:  {list_insert:.6f}s")
print(f"Deque insert at front: {deque_insert:.6f}s")  # 100x+ faster
```

---

## Algorithm Optimization

### Improving Complexity

**O(n²) → O(n)**:
```python
# Slow: O(n²) nested loop
def find_duplicates_slow(nums: list[int]) -> list[int]:
    duplicates = []
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] == nums[j] and nums[i] not in duplicates:
                duplicates.append(nums[i])
    return duplicates


# Fast: O(n) using a set
def find_duplicates_fast(nums: list[int]) -> list[int]:
    seen = set()
    duplicates = set()
    for num in nums:
        if num in seen:
            duplicates.add(num)
        else:
            seen.add(num)
    return list(duplicates)
```

---

## Memory Optimization

### Generators vs Lists

```python
# List: loads all items into memory
def get_all_items() -> list[int]:
    return [i for i in range(1000000)]


# Generator: loads one item at a time
def get_items_generator():
    for i in range(1000000):
        yield i


# Memory comparison
import sys

data_list = [i for i in range(10000)]
data_gen = (i for i in range(10000))

print(f"List:      {sys.getsizeof(data_list)} bytes")
print(f"Generator: {sys.getsizeof(data_gen)} bytes")  # much smaller
```

### slots

```python
# Without __slots__: each instance uses a __dict__
class UserNormal:
    def __init__(self, name: str, age: int, email: str):
        self.name = name
        self.age = age
        self.email = email


# With __slots__: fixed attribute set, lower memory
class UserSlots:
    __slots__ = ['name', 'age', 'email']

    def __init__(self, name: str, age: int, email: str):
        self.name = name
        self.age = age
        self.email = email


import sys

normal = UserNormal("Alice", 25, "alice@example.com")
slots = UserSlots("Alice", 25, "alice@example.com")

print(f"Normal: {sys.getsizeof(normal)} bytes")
print(f"Slots:  {sys.getsizeof(slots)} bytes")  # smaller
```

---

## Concurrency and Async

### asyncio

```python
import asyncio
import aiohttp
from typing import List


async def fetch_url(session: aiohttp.ClientSession, url: str) -> dict:
    """Async URL fetch"""
    async with session.get(url) as response:
        return {"url": url, "status": response.status}


async def fetch_all(urls: List[str]) -> List[dict]:
    """Fetch multiple URLs in parallel"""
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
    return results


# Usage
urls = [
    "https://api.example.com/data1",
    "https://api.example.com/data2",
    "https://api.example.com/data3",
]

results = asyncio.run(fetch_all(urls))
```

### Threading for I/O-Bound Tasks

```python
from concurrent.futures import ThreadPoolExecutor
import requests


def fetch_url(url: str) -> dict:
    response = requests.get(url)
    return {"url": url, "status": response.status_code}


urls = ["https://api.example.com/data1", "https://api.example.com/data2"]

with ThreadPoolExecutor(max_workers=10) as executor:
    results = list(executor.map(fetch_url, urls))
```

### Multiprocessing for CPU-Bound Tasks

```python
from multiprocessing import Pool


def cpu_intensive(n: int) -> int:
    return sum(i * i for i in range(n))


data = [100000, 200000, 300000, 400000]

with Pool(processes=4) as pool:
    results = pool.map(cpu_intensive, data)

print(results)
```

---

## NumPy/Pandas Optimization

### NumPy Vectorization

```python
import numpy as np
import timeit


# Slow: Python loop
def python_sum(n: int) -> float:
    total = 0.0
    for i in range(n):
        total += i ** 2
    return total


# Fast: NumPy vectorization
def numpy_sum(n: int) -> float:
    arr = np.arange(n)
    return np.sum(arr ** 2)


time_python = timeit.timeit(
    stmt='python_sum(100000)',
    globals=globals(),
    number=100
)

time_numpy = timeit.timeit(
    stmt='numpy_sum(100000)',
    globals=globals(),
    number=100
)

print(f"Python loop: {time_python:.4f}s")
print(f"NumPy:       {time_numpy:.4f}s")  # much faster
```

### pandas Optimization

```python
import pandas as pd
import numpy as np


# Create sample DataFrame
df = pd.DataFrame({
    "name": ["Alice", "Bob", "Charlie"] * 10000,
    "age": np.random.randint(18, 65, 30000),
    "salary": np.random.randint(30000, 120000, 30000),
})

# Slow: apply with lambda
df["salary_tax"] = df["salary"].apply(lambda x: x * 0.2)

# Fast: vectorized operation
df["salary_tax"] = df["salary"] * 0.2

# Use query() for filtering
result = df.query("age > 30 and salary > 50000")

# Use categorical for repeated string values
df["name"] = df["name"].astype("category")
```

---

## Caching Strategies

### functools.lru_cache

```python
from functools import lru_cache


@lru_cache(maxsize=128)
def fibonacci(n: int) -> int:
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)


# Instant result with memoization
print(fibonacci(100))
```

### Redis Caching

```bash
pip install redis
```

```python
import redis
import json
from functools import wraps
from typing import Callable, Any


r = redis.Redis(host='localhost', port=6379, db=0)


def cache(expire: int = 300):
    """Cache decorator using Redis"""
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> Any:
            cache_key = f"{func.__name__}:{str(args)}:{str(kwargs)}"

            # Check cache
            cached = r.get(cache_key)
            if cached:
                return json.loads(cached)

            # Compute and store
            result = func(*args, **kwargs)
            r.setex(cache_key, expire, json.dumps(result))
            return result

        return wrapper
    return decorator


@cache(expire=300)
def get_user_data(user_id: int) -> dict:
    """Fetch user data (cached for 5 minutes)"""
    # Simulate DB query
    return {"id": user_id, "name": "Alice", "age": 25}
```

---

## Database Optimization

### Connection Pooling

```python
from sqlalchemy import create_engine
from sqlalchemy.pool import QueuePool


engine = create_engine(
    "postgresql://user:password@localhost/mydb",
    poolclass=QueuePool,
    pool_size=10,          # number of connections in the pool
    max_overflow=20,       # additional connections allowed
    pool_pre_ping=True,    # verify connections before use
    pool_recycle=3600,     # recycle connections after 1 hour
)
```

### Query Optimization

```python
from sqlalchemy.orm import Session
from sqlalchemy import select


# Fetch only required columns
def get_user_names(db: Session) -> list[str]:
    result = db.execute(select(User.name)).scalars().all()
    return result


# Eager loading to avoid N+1
def get_posts_with_authors(db: Session):
    from sqlalchemy.orm import joinedload
    return db.query(Post).options(joinedload(Post.author)).all()


# Batch insert
def create_users_batch(db: Session, users: list[dict]):
    db.bulk_insert_mappings(User, users)
    db.commit()
```

