

===== SOURCE: 04-web-and-network/nodejs-development/SKILL.md =====

# Node.js Development Skill

> A practical guide collection for Node.js development. Covers all aspects of Node.js application development, including Express, NestJS, asynchronous patterns, and performance optimization.

## Overview

This skill covers the following topics:

- **Express & NestJS**: When to use a lightweight framework vs. an enterprise framework
- **Asynchronous Patterns**: Promise, async/await, Event Emitter, Streams, Worker Threads, Cluster
- **Performance Optimization**: Memory management, database optimization, caching, load testing

---

## 📚 Official Documentation & Reference Resources

**What you'll learn from this guide**: Framework patterns, asynchronous design, performance optimization strategies
**What to check in official docs**: Latest APIs, new features in Node.js 22, security updates, best practices

### Key Official Documentation

- **[Node.js Documentation](https://nodejs.org/docs/latest/api/)** - Official Node.js docs
  - [API Reference](https://nodejs.org/docs/latest/api/) - Complete reference for all modules
  - [Guides](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs) - Learning guides
  - [About Node.js](https://nodejs.org/en/about) - Architecture and event loop explanation

- **[Express.js](https://expressjs.com/)** - Official Express site
  - [Getting Started](https://expressjs.com/en/starter/installing.html) - Quick start
  - [API Reference](https://expressjs.com/en/4x/api.html) - Complete API reference
  - [Advanced Topics](https://expressjs.com/en/advanced/best-practice-security.html) - Security, performance

- **[NestJS](https://docs.nestjs.com/)** - Official NestJS documentation
  - [Overview](https://docs.nestjs.com/first-steps) - Core concepts
  - [Fundamentals](https://docs.nestjs.com/fundamentals/dependency-injection) - DI, module design
  - [Techniques](https://docs.nestjs.com/techniques/database) - Database, validation

- **[Fastify](https://fastify.dev/)** - Official Fastify documentation
  - High-speed lightweight framework
  - Schema-based validation

### Related Resources

- **[Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)** - Best practices collection
- **[npm Documentation](https://docs.npmjs.com/)** - Package management
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - Official TypeScript guide
- **[MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** - Complete JavaScript reference

---

## Learning Path

### For Complete Beginners: Learn Node.js Development from the Ground Up

**Target audience**: Programming beginners, those new to Node.js development

**Estimated time**: Approximately 6–8 hours

We have prepared 6 guides to systematically learn the fundamentals of Node.js development. By studying them in order, you'll be able to build a practical web server.

#### 📚 Basics Guides (6 chapters)

1. **[What is Node.js](./docs/01-basics/01-what-is-nodejs.md)** (30–40 min)
   - Core concepts of Node.js
   - How to install
   - Running your first program
   - Using the REPL

2. **[JavaScript Basics](./docs/01-basics/02-javascript-basics.md)** (1–1.5 hours)
   - Basic JavaScript syntax
   - Variables, functions, arrays, objects
   - Modern ES6+ features
   - Key concepts used in Node.js

3. **[NPM and Package Management](./docs/01-basics/03-npm-basics.md)** (40–50 min)
   - Core NPM concepts
   - Managing package.json
   - Installing and removing packages
   - Using NPM scripts

4. **[Express Basics](./docs/01-basics/04-express-intro.md)** (1–1.5 hours)
   - Fundamentals of the Express framework
   - Basic routing
   - Middleware concepts
   - Handling requests and responses

5. **[Asynchronous Programming](./docs/01-basics/05-async-programming.md)** (1–1.5 hours)
   - Difference between synchronous and asynchronous
   - Callbacks, Promises
   - How to use async/await
   - Error handling

6. **[Building Your First Server](./docs/01-basics/06-first-server-tutorial.md)** (2–3 hours)
   - Comprehensive exercise: Task management API
   - Building an API with Express
   - Data persistence
   - Implementing CRUD operations

#### 🎯 How to Study

```
Week 1: 01→02→03 (Environment setup, JavaScript basics)
Week 2: 04→05 (Express, asynchronous processing)
Week 3: 06 (Practical integration)
```

**What you'll be able to build after studying**:
- ✅ REST API server
- ✅ Task management system
- ✅ App with data persistence

---

## Async Patterns Guides

Step-by-step guides on Node.js asynchronous patterns. Study in order after completing the Basics section.

1. **[Callbacks in Node.js](./docs/02-async-patterns/01-callbacks.md)**
   - Callback fundamentals and callback hell
   - Error-first callback pattern
   - Anti-patterns to avoid

2. **[Promises in Node.js](./docs/02-async-patterns/02-promises.md)**
   - Promise states (pending / fulfilled / rejected)
   - `.then()` / `.catch()` chaining
   - `Promise.all`, `Promise.race`, `Promise.allSettled`

3. **[async/await in Node.js](./docs/02-async-patterns/03-async-await.md)**
   - Writing async code in a synchronous style
   - Error handling with try/catch
   - Parallel execution patterns

4. **[The Node.js Event Loop](./docs/02-async-patterns/04-event-loop.md)**
   - How the event loop works
   - Call stack, task queue, microtask queue
   - Diagnosing performance issues

---

## Framework Guides

Practical guides for building production-ready web applications with Express.

1. **[Express Fundamentals](./docs/03-frameworks/01-express-fundamentals.md)**
   - Core Express concepts
   - Routing, request/response handling
   - Project structure

2. **[Middleware in Express](./docs/03-frameworks/02-middleware.md)**
   - What middleware is and how it works
   - Built-in, third-party, and custom middleware
   - Middleware ordering and error middleware

3. **[Building REST APIs with Express](./docs/03-frameworks/03-rest-api.md)**
   - REST API design principles
   - CRUD endpoints implementation
   - Input validation and response formatting

4. **[Error Handling in Node.js and Express](./docs/03-frameworks/04-error-handling.md)**
   - Error types in Node.js
   - Centralized error handling middleware
   - Async error propagation

---

## Detailed Guides

### 1. [Express & NestJS Complete Guide](./docs/02-guides/express-nestjs-complete.md)

A comprehensive explanation of implementation patterns, architecture design, and dependency injection for Express and NestJS.

**Key contents:**
- **Express**: Layered architecture (Controller/Service/Repository), middleware patterns, routing design
- **NestJS**: Module design, decorator usage, dependency injection, DTO validation, custom guards and interceptors
- **Implementation examples**: Product management API (complete CRUD implementation)
- **Comparison**: Express vs NestJS (learning curve, scalability, flexibility)
- **Troubleshooting**: 10 issues (middleware ordering errors, circular dependencies, DTO validation not working, etc.)

**Measured results:**
- Development efficiency: Code volume -35% (12,000 lines → 7,800 lines)
- Test coverage: 45% → 87%
- Bug occurrence rate: 8.2/month → 2.1/month (-74%)

### 2. [Node.js Async Patterns Complete Guide](./docs/02-guides/async-patterns-complete.md)

A thorough explanation of Node.js asynchronous processing patterns from basics to advanced.

**Key contents:**
- **Promise**: Parallel execution (Promise.all/allSettled/race/any), timeout implementation, retry patterns
- **Async/Await**: Error handling, parallel processing optimization, async generators
- **Event Emitter**: Type safety with TypedEventEmitter, custom event design
- **Streams**: Readable/Writable/Transform, backpressure control, CSV/JSON parsing
- **Worker Threads**: Offloading CPU-intensive processing, Worker pool implementation
- **Cluster**: Multi-process setup, zero-downtime deployment, graceful shutdown
- **Troubleshooting**: 10 issues (Unhandled Rejection, memory leaks, Promise.all failures, etc.)

**Measured results:**
- Parallel processing: User data retrieval (1,000 records) 45s → 2.1s (-95%)
- Worker Threads: Fibonacci calculation event loop block 18s → 0s (-100%)
- Stream processing: CSV processing (1 million rows) memory usage 1.2GB → 45MB (-96%)
- Cluster: Request throughput 850 req/s → 3,200 req/s (+276%)

### 3. [Node.js Performance Optimization Complete Guide](./docs/02-guides/performance-complete.md)

Practical techniques for performance measurement, optimization, and scaling.

**Key contents:**
- **Measurement**: Node.js Profiler, performance_hooks, APM (New Relic, Sentry)
- **Memory management**: Heap snapshots, memory leak detection, LRU cache, V8 optimization
- **Database optimization**: Resolving N+1 problems, index design, connection pooling, batch processing
- **Caching**: Redis integration, Cache-Aside/Write-Through/Write-Behind patterns, Cache Warming, HTTP cache headers
- **Load testing**: Autocannon, k6, Clinic.js
- **Event loop**: Blocking detection, splitting CPU-intensive tasks, Worker Thread usage
- **Troubleshooting**: 10 issues (OOM, connection pool exhaustion, N+1 queries, async array operations, etc.)

**Measured results:**
- API response time: 850ms → 52ms (-94%)
- Throughput: 420 req/s → 2,850 req/s (+579%)
- Memory usage: 1.2GB → 380MB (-68%)
- Database query count: 45 → 3 (-93%)
- Cache hit rate: 85%

---

## Supported Versions

- **Node.js**: 20.0.0 or later
- **Express**: 4.18.0 or later
- **NestJS**: 10.0.0 or later
- **TypeScript**: 5.0.0 or later
- **Fastify**: 4.25.0 or later

---

## Learning Paths

### Beginner (1–2 weeks)
1. Express basics and layered architecture
2. Promise and async/await fundamentals
3. Basic performance measurement

### Intermediate (2–4 weeks)
1. NestJS module design and dependency injection
2. Practical use of Event Emitter and Streams
3. Redis caching and database optimization

### Advanced (4–8 weeks)
1. Scaling with Worker Threads and Cluster
2. APM tool integration and full-scale load testing
3. Memory profiling and optimization

---

## Related Skills

- **backend-development**: API design, error handling, security
- **database-design**: Prisma optimization, index design
- **testing-strategy**: NestJS testing, load testing
- **ci-cd-automation**: Deploying Node.js applications

---

## Summary

Total: **~83,500 characters** | **3 complete guides + 8 step-by-step guides**

Provides practical patterns and best practices for Node.js development. With Express's flexibility and NestJS's enterprise-grade capabilities, deep understanding of asynchronous processing, and concrete performance optimization techniques, you'll be able to build scalable, high-performance Node.js applications.



===== SOURCE: 04-web-and-network/nodejs-development/docs/01-basics/01-what-is-nodejs.md =====

# What is Node.js - Complete Beginner's Guide

## Table of Contents

1. [Overview](#overview)
2. [What is Node.js](#what-is-nodejs)
3. [Why is Node.js Popular](#why-is-nodejs-popular)
4. [Installing Node.js](#installing-nodejs)
5. [Your First Node.js Program](#your-first-nodejs-program)
6. [Using the REPL](#using-the-repl)
7. [Next Steps](#next-steps)

---

## Overview

### What You'll Learn

- Core concepts of Node.js
- Running JavaScript on the server side
- How to install Node.js
- Running your first program

### Estimated Time: 30–40 minutes

---

## What is Node.js

### Definition

**Node.js** is a runtime environment for executing JavaScript on the server side.

```
Browser (frontend)
   JavaScript → Manipulates HTML

Node.js (backend)
   JavaScript → Manipulates servers, databases, files
```

### Features

1. **Uses JavaScript**
   - Same language as the frontend
   - Low learning cost

2. **Asynchronous I/O**
   - Fast and efficient
   - Handles many simultaneous connections

3. **NPM Ecosystem**
   - Over 1 million packages
   - Rich library selection

---

## Why is Node.js Popular

### 1. Full-Stack Development

```
Frontend: JavaScript (React, Vue)
    ↕
Backend: JavaScript (Node.js, Express)
    ↕
Database: JavaScript (MongoDB)
```

**Benefits**:
- Develop everything with one language
- Easy code reuse
- Improved team efficiency

### 2. High Performance

The **event loop** enables non-blocking I/O:

```javascript
// Synchronous (slow)
const data1 = readFileSync('file1.txt')
const data2 = readFileSync('file2.txt')  // waits for file1 to finish

// Asynchronous (fast)
readFile('file1.txt', (data1) => {})
readFile('file2.txt', (data2) => {})  // runs concurrently
```

### 3. Adoption by Major Companies

- **Netflix**: API servers
- **LinkedIn**: Backend
- **Uber**: Real-time matching
- **PayPal**: Payment systems

---

## Installing Node.js

### macOS

```bash
# Install via Homebrew (recommended)
brew install node

# Verify versions
node --version  # v20.10.0
npm --version   # 10.2.3
```

### Windows

```bash
# Download installer from official site
# https://nodejs.org/

# After installation, verify
node --version
npm --version
```

### Linux (Ubuntu)

```bash
# Install via NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

### Version Management (Recommended)

```bash
# Manage Node.js versions with nvm
# macOS/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash

# Install Node.js 20
nvm install 20
nvm use 20
```

---

## Your First Node.js Program

### 1. Create a Project Directory

```bash
mkdir hello-node
cd hello-node
```

### 2. Create a JavaScript File

Create `index.js`:

```javascript
// index.js
console.log('Hello, Node.js!')

// Calculation
const sum = (a, b) => a + b
console.log('2 + 3 =', sum(2, 3))

// Current time
const now = new Date()
console.log('Current time:', now.toLocaleString())
```

### 3. Run It

```bash
node index.js
```

**Output**:
```
Hello, Node.js!
2 + 3 = 5
Current time: 12/24/2024, 10:30:00 AM
```

---

## Using the REPL

### What is the REPL

**REPL (Read-Eval-Print Loop)** is an interactive environment where you can execute code on the fly.

```bash
# Start the REPL
node

# A prompt appears
>
```

### Usage Examples

```javascript
> 2 + 3
5

> const name = 'Alice'
undefined

> console.log(`Hello, ${name}!`)
Hello, Alice!
undefined

> [1, 2, 3].map(x => x * 2)
[ 2, 4, 6 ]

> .exit  // exit
```

---

## What You Can Do with Node.js

### 1. Web Servers

```javascript
const http = require('http')

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello, World!')
})

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/')
})
```

### 2. File Operations

```javascript
const fs = require('fs')

// Read file
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) throw err
  console.log(data)
})

// Write file
fs.writeFile('output.txt', 'Hello, Node.js!', (err) => {
  if (err) throw err
  console.log('File saved')
})
```

### 3. API Development

```javascript
const express = require('express')
const app = express()

app.get('/api/users', (req, res) => {
  res.json({ users: ['Alice', 'Bob'] })
})

app.listen(3000)
```

---

## Frequently Asked Questions

### Q1: Do I need to know JavaScript first?

**A**: Yes, a basic knowledge of JavaScript is required.

**Learning order**:
1. JavaScript basics (variables, functions, arrays)
2. ES6+ features (arrow functions, async/await)
3. Node.js

### Q2: What is the difference between browser JavaScript and Node.js?

| Item | Browser | Node.js |
|------|---------|---------|
| **DOM manipulation** | ✅ Available | ❌ Not available |
| **File I/O** | ❌ Not available | ✅ Available |
| **Modules** | ES Modules | CommonJS/ES Modules |
| **Global object** | window | global |

### Q3: What kinds of projects is it suited for?

**Good fit**:
- REST APIs
- Real-time apps (chat, games)
- Microservices
- CLI tools

**Not a good fit**:
- CPU-intensive processing (video encoding, etc.)
- Large-scale numerical computation

---

## Next Steps

### What You Learned in This Guide

- ✅ Core concepts of Node.js
- ✅ How to install
- ✅ Running your first program
- ✅ Using the REPL

### Next Guide to Study

**Next guide**: [02-javascript-basics.md](./02-javascript-basics.md) - JavaScript Basics

---

**Parent guide**: [Node.js Development - SKILL.md](../../SKILL.md)



===== SOURCE: 04-web-and-network/nodejs-development/docs/01-basics/02-javascript-basics.md =====

# JavaScript Basics - Complete Beginner's Guide

## Table of Contents

1. [Overview](#overview)
2. [Variables and Constants](#variables-and-constants)
3. [Data Types](#data-types)
4. [Functions](#functions)
5. [Arrays and Objects](#arrays-and-objects)
6. [ES6+ Features](#es6-features)
7. [Exercises](#exercises)
8. [Next Steps](#next-steps)

---

## Overview

### What You'll Learn

- Basic JavaScript syntax
- Variables, functions, arrays, objects
- Modern ES6+ features
- Key concepts used in Node.js

### Estimated Time: 1–1.5 hours

---

## Variables and Constants

### let (variable)

```javascript
let count = 0
count = 10  // reassignment allowed

let message = 'Hello'
message = 'Hi'  // OK
```

### const (constant)

```javascript
const PI = 3.14159
// PI = 3.14  // Error: cannot reassign

const user = { name: 'Alice' }
user.name = 'Bob'  // OK: the object's contents can be changed
// user = {}  // Error: cannot reassign the variable itself
```

### var (not recommended)

```javascript
// Don't use var (scoping issues)
// Use let / const instead
```

---

## Data Types

### Primitive Types

```javascript
// Number
const age = 25
const price = 1980.5

// String
const name = 'Alice'
const message = "Hello"

// Boolean
const isActive = true
const hasPermission = false

// null / undefined
const empty = null
const notDefined = undefined
```

### Type Conversion

```javascript
// String → Number
const str = '42'
const num = Number(str)  // 42
const num2 = parseInt(str)  // 42
const num3 = parseFloat('3.14')  // 3.14

// Number → String
const n = 123
const s = String(n)  // '123'
const s2 = n.toString()  // '123'

// Boolean conversion
Boolean(1)  // true
Boolean(0)  // false
Boolean('')  // false
Boolean('text')  // true
```

---

## Functions

### Traditional Function Declaration

```javascript
function greet(name) {
  return `Hello, ${name}!`
}

console.log(greet('Alice'))  // Hello, Alice!
```

### Arrow Functions (recommended)

```javascript
// Basic form
const add = (a, b) => {
  return a + b
}

// Shorthand (implicit return)
const add2 = (a, b) => a + b

// Single parameter
const double = x => x * 2

// No parameters
const getTime = () => new Date()
```

### Default Parameters

```javascript
const greet = (name = 'Guest') => {
  return `Hello, ${name}!`
}

console.log(greet())        // Hello, Guest!
console.log(greet('Alice')) // Hello, Alice!
```

---

## Arrays and Objects

### Arrays

```javascript
const fruits = ['apple', 'banana', 'grape']

// Access
console.log(fruits[0])  // apple

// Length
console.log(fruits.length)  // 3

// Add
fruits.push('strawberry')

// Remove
fruits.pop()  // removes the last element

// map (transform)
const numbers = [1, 2, 3]
const doubled = numbers.map(n => n * 2)  // [2, 4, 6]

// filter (narrow down)
const ages = [15, 25, 35]
const adults = ages.filter(age => age >= 18)  // [25, 35]

// find (search)
const users = ['Alice', 'Bob', 'Charlie']
const user = users.find(u => u === 'Bob')  // Bob
```

### Objects

```javascript
const user = {
  name: 'Alice',
  age: 25,
  email: 'alice@example.com'
}

// Access
console.log(user.name)    // Alice
console.log(user['age'])  // 25

// Add / modify
user.city = 'New York'
user.age = 26

// Methods
const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
}

console.log(calculator.add(10, 5))  // 15
```

---

## ES6+ Features

### Template Literals

```javascript
const name = 'Alice'
const age = 25

// Old way
const message1 = 'Hello, ' + name + '! You are ' + age + ' years old.'

// Template literals (recommended)
const message2 = `Hello, ${name}! You are ${age} years old.`

// Multi-line
const html = `
  <div>
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`
```

### Destructuring Assignment

```javascript
// Array
const [a, b, c] = [1, 2, 3]
console.log(a)  // 1

// Object
const user = { name: 'Alice', age: 25 }
const { name, age } = user
console.log(name)  // Alice

// Function parameters
const greet = ({ name, age }) => {
  return `${name} (${age} years old)`
}

greet({ name: 'Alice', age: 25 })
```

### Spread Syntax

```javascript
// Merge arrays
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const combined = [...arr1, ...arr2]  // [1, 2, 3, 4, 5, 6]

// Merge objects
const user = { name: 'Alice', age: 25 }
const updated = { ...user, age: 26 }  // { name: 'Alice', age: 26 }

// Spread as function arguments
const numbers = [1, 2, 3]
console.log(Math.max(...numbers))  // 3
```

### Modules

```javascript
// math.js (export)
export const add = (a, b) => a + b
export const subtract = (a, b) => a - b

// Default export
export default class Calculator {}

// main.js (import)
import { add, subtract } from './math.js'
import Calculator from './math.js'

console.log(add(10, 5))  // 15
```

---

## Node.js-Specific Concepts

### CommonJS Modules

```javascript
// math.js (export)
const add = (a, b) => a + b
const subtract = (a, b) => a - b

module.exports = { add, subtract }

// main.js (import)
const { add, subtract } = require('./math')

console.log(add(10, 5))  // 15
```

### The process Object

```javascript
// Environment variables
console.log(process.env.NODE_ENV)

// Command-line arguments
console.log(process.argv)
// node app.js arg1 arg2
// ['node', '/path/to/app.js', 'arg1', 'arg2']

// Current directory
console.log(process.cwd())

// Exit the process
process.exit(0)
```

---

## Exercises

### Exercise 1: FizzBuzz

```javascript
// For numbers 1 to 100:
// Multiples of 3: Fizz
// Multiples of 5: Buzz
// Multiples of both: FizzBuzz

for (let i = 1; i <= 100; i++) {
  if (i % 15 === 0) {
    console.log('FizzBuzz')
  } else if (i % 3 === 0) {
    console.log('Fizz')
  } else if (i % 5 === 0) {
    console.log('Buzz')
  } else {
    console.log(i)
  }
}
```

### Exercise 2: Array Operations

```javascript
// Extract names of users who are 18 or older

const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 17 },
  { name: 'Charlie', age: 30 }
]

const adults = users
  .filter(user => user.age >= 18)
  .map(user => user.name)

console.log(adults)  // ['Alice', 'Charlie']
```

---

## Common Mistakes

### ❌ Mistake 1: Using var

```javascript
var x = 10  // not recommended
```

**✅ Correct approach**:

```javascript
const x = 10  // recommended (when not reassigning)
let y = 20    // recommended (when reassigning)
```

### ❌ Mistake 2: Using == instead of ===

```javascript
'5' == 5  // true (type coercion occurs)
```

**✅ Correct approach**:

```javascript
'5' === 5  // false (type is also compared)
```

### ❌ Mistake 3: Misusing this

```javascript
const obj = {
  name: 'Alice',
  greet: function() {
    setTimeout(function() {
      console.log(this.name)  // undefined
    }, 1000)
  }
}
```

**✅ Correct approach**:

```javascript
const obj = {
  name: 'Alice',
  greet: function() {
    setTimeout(() => {
      console.log(this.name)  // Alice
    }, 1000)
  }
}
```

---

## Next Steps

### What You Learned in This Guide

- ✅ Basic JavaScript syntax
- ✅ Variables, functions, arrays, objects
- ✅ Modern ES6+ features
- ✅ Key concepts used in Node.js

### Next Guide to Study

**Next guide**: [03-npm-basics.md](./03-npm-basics.md) - NPM and Package Management

---

**Previous guide**: [01-what-is-nodejs.md](./01-what-is-nodejs.md)

**Parent guide**: [Node.js Development - SKILL.md](../../SKILL.md)



===== SOURCE: 04-web-and-network/nodejs-development/docs/01-basics/03-npm-basics.md =====

# NPM and Package Management — Complete Beginner's Guide

## Table of Contents

1. [Overview](#overview)
2. [What is NPM?](#what-is-npm)
3. [Creating package.json](#creating-packagejson)
4. [Installing Packages](#installing-packages)
5. [Managing Dependencies](#managing-dependencies)
6. [NPM Scripts](#npm-scripts)
7. [Commonly Used Packages](#commonly-used-packages)
8. [Next Steps](#next-steps)

---

## Overview

### What You'll Learn

- Core concepts of NPM
- Managing package.json
- Installing and removing packages
- Using NPM scripts

### Estimated Time: 40–50 minutes

---

## What is NPM?

### Definition

**NPM (Node Package Manager)** is the package management tool for Node.js.

**Features**:
- Install packages
- Manage dependencies
- Run scripts
- Publish packages

### NPM Registry

**npmjs.com** hosts over one million packages.

```bash
# Search for a package
npm search express

# View package info
npm info express
```

---

## Creating package.json

### Initialization

```bash
# Create a new project
mkdir myproject
cd myproject

# Create package.json interactively
npm init

# Create with default settings
npm init -y
```

### package.json Structure

```json
{
  "name": "myproject",
  "version": "1.0.0",
  "description": "My awesome project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["nodejs", "express"],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

---

## Installing Packages

### Production Dependencies (dependencies)

```bash
# Install express
npm install express

# Shorthand
npm i express

# Install multiple packages
npm i express body-parser cors
```

### Development Dependencies (devDependencies)

```bash
# Install nodemon as a dev dependency
npm install --save-dev nodemon

# Shorthand
npm i -D nodemon
```

### Global Install

```bash
# Install globally
npm install -g typescript

# Verify
npm list -g --depth=0
```

---

## Managing Dependencies

### package-lock.json

**package-lock.json** records the exact versions of all dependencies.

```bash
# Install all dependencies
npm install

# package-lock.json is also generated
```

**Important**:
- Commit `package-lock.json` to Git
- Ensures everyone on the team uses the same versions

### node_modules

**node_modules** is the directory where installed packages are stored.

```bash
# List installed packages
npm list --depth=0

# Check node_modules size
du -sh node_modules
```

Add to **.gitignore**:

```
node_modules/
```

### Version Specifiers

```json
{
  "dependencies": {
    "express": "4.18.2",      // Exact version
    "lodash": "^4.17.21",    // Allow minor updates
    "axios": "~1.6.0"        // Allow patch updates only
  }
}
```

---

## NPM Scripts

### Defining Scripts

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "build": "webpack",
    "lint": "eslint ."
  }
}
```

### Running Scripts

```bash
# start and test can be run without "run"
npm start
npm test

# All others require "run"
npm run dev
npm run build
npm run lint
```

### Practical Example

```json
{
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest --watch",
    "test:ci": "jest --coverage",
    "lint": "eslint src/**/*.js",
    "lint:fix": "eslint src/**/*.js --fix",
    "format": "prettier --write src/**/*.js"
  }
}
```

---

## Commonly Used Packages

### Web Frameworks

```bash
# Express - most popular framework
npm i express

# Fastify - high-performance framework
npm i fastify

# Koa - lightweight framework
npm i koa
```

### Utilities

```bash
# lodash - utility function library
npm i lodash

# dayjs - date/time manipulation (preferred over moment)
npm i dayjs

# dotenv - environment variable management
npm i dotenv
```

### Development Tools

```bash
# nodemon - auto-restart on file changes
npm i -D nodemon

# eslint - code linting
npm i -D eslint

# prettier - code formatting
npm i -D prettier

# jest - testing framework
npm i -D jest
```

---

## Practical Example

### Project Setup

```bash
# 1. Create project
mkdir express-app
cd express-app
npm init -y

# 2. Install dependencies
npm i express dotenv
npm i -D nodemon

# 3. Directory structure
mkdir src
touch src/index.js
touch .env
touch .gitignore
```

### package.json Configuration

```json
{
  "name": "express-app",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

### .gitignore

```
node_modules/
.env
npm-debug.log
.DS_Store
```

---

## Package Management Commands

### Install

```bash
# Install everything from package.json
npm install

# Install a specific package
npm install express

# Install a specific version
npm install express@4.18.2
```

### Uninstall

```bash
# Remove a package
npm uninstall express

# Shorthand
npm un express
```

### Update

```bash
# Update all packages
npm update

# Update a specific package
npm update express

# Check for outdated packages
npm outdated
```

### Inspect

```bash
# List installed packages
npm list

# List global packages
npm list -g --depth=0

# View package info
npm info express
```

---

## Common Problems and Solutions

### Problem 1: Dependency Errors

```bash
# Error
npm ERR! peer dep missing

# Fix
rm -rf node_modules package-lock.json
npm install
```

### Problem 2: Permission Error (EACCES)

```bash
# Error
npm ERR! EACCES: permission denied

# Fix (macOS/Linux)
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

### Problem 3: Outdated Packages

```bash
# Check for outdated packages
npm outdated

# Update
npm update

# Major version upgrade (use carefully)
npx npm-check-updates -u
npm install
```

---

## Exercise

### Task: Project Setup

Set up a project with the following requirements:
1. Create a `todo-app` project
2. Install `express` and `dotenv`
3. Install `nodemon` as a dev dependency
4. Add `start` and `dev` scripts

**Example solution**:

```bash
mkdir todo-app
cd todo-app
npm init -y

npm i express dotenv
npm i -D nodemon
```

```json
{
  "name": "todo-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

---

## Next Steps

### What You Learned

- ✅ Core concepts of NPM
- ✅ Managing package.json
- ✅ Installing and removing packages
- ✅ Using NPM scripts

**Next guide**: [04-express-intro.md](./04-express-intro.md) — Express Basics

---

**Previous guide**: [02-javascript-basics.md](./02-javascript-basics.md)

**Parent**: [Node.js Development - SKILL.md](../../SKILL.md)



===== SOURCE: 04-web-and-network/nodejs-development/docs/01-basics/04-express-intro.md =====

# Express Basics — Complete Beginner's Guide

## Table of Contents

1. [Overview](#overview)
2. [What is Express?](#what-is-express)
3. [Your First Express App](#your-first-express-app)
4. [Routing](#routing)
5. [Middleware](#middleware)
6. [Request and Response](#request-and-response)
7. [Exercises](#exercises)
8. [Next Steps](#next-steps)

---

## Overview

### What You'll Learn

- Express framework fundamentals
- Basic routing
- The middleware concept
- Handling requests and responses

### Estimated Time: 1–1.5 hours

---

## What is Express?

### Definition

**Express** is the most popular web framework for Node.js.

**Features**:
- Minimal and simple
- Highly flexible
- Rich middleware ecosystem
- Large community

### Installation

```bash
mkdir express-app
cd express-app
npm init -y

npm install express
```

---

## Your First Express App

### Hello World

Create `index.js`:

```javascript
const express = require('express')
const app = express()
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Hello, Express!')
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
```

### Run It

```bash
node index.js
```

Open `http://localhost:3000` in your browser.

---

## Routing

### HTTP Methods

```javascript
const express = require('express')
const app = express()

// GET
app.get('/users', (req, res) => {
  res.json({ users: ['Alice', 'Bob'] })
})

// POST
app.post('/users', (req, res) => {
  res.status(201).json({ message: 'User created' })
})

// PUT
app.put('/users/:id', (req, res) => {
  res.json({ message: `User ${req.params.id} updated` })
})

// DELETE
app.delete('/users/:id', (req, res) => {
  res.json({ message: `User ${req.params.id} deleted` })
})

app.listen(3000)
```

### Path Parameters

```javascript
// /users/123
app.get('/users/:id', (req, res) => {
  const userId = req.params.id
  res.json({ userId })
})

// Multiple parameters
app.get('/users/:userId/posts/:postId', (req, res) => {
  const { userId, postId } = req.params
  res.json({ userId, postId })
})
```

### Query Parameters

```javascript
// /search?q=express&limit=10
app.get('/search', (req, res) => {
  const { q, limit } = req.query
  res.json({ query: q, limit: limit || 20 })
})
```

---

## Middleware

### What is Middleware?

**Middleware** is a function that runs between the request and the response.

```
Request → Middleware 1 → Middleware 2 → Route Handler → Response
```

### Built-in Middleware

```javascript
const express = require('express')
const app = express()

// JSON parser
app.use(express.json())

// URL-encoded data
app.use(express.urlencoded({ extended: true }))

// Serve static files
app.use(express.static('public'))
```

### Custom Middleware

```javascript
// Logging middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()  // Pass control to the next middleware
}

app.use(logger)

// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  req.user = { id: 1, name: 'Alice' }
  next()
}

// Apply to a specific route
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ user: req.user })
})
```

---

## Request and Response

### req (Request) Object

```javascript
app.post('/api/users', (req, res) => {
  const body = req.body          // Request body
  const id = req.params.id       // Path parameters
  const query = req.query        // Query parameters
  const contentType = req.get('Content-Type')  // Headers
  const method = req.method      // HTTP method
  const url = req.url            // Full URL
  const path = req.path          // Path only

  res.json({ received: true })
})
```

### res (Response) Object

```javascript
app.get('/api/users', (req, res) => {
  res.json({ name: 'Alice' })              // JSON response
  res.send('Hello')                        // Text response
  res.status(404).json({ error: 'Not Found' })  // With status code
  res.redirect('/home')                    // Redirect
  res.set('Content-Type', 'application/json')   // Set header
  res.sendFile('/path/to/file.pdf')        // Send file
})
```

---

## Practical Example

### User CRUD API

```javascript
const express = require('express')
const app = express()

app.use(express.json())

let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
]

// GET /api/users
app.get('/api/users', (req, res) => {
  res.json({ users })
})

// GET /api/users/:id
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const user = users.find(u => u.id === id)

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  res.json({ user })
})

// POST /api/users
app.post('/api/users', (req, res) => {
  const { name, email } = req.body

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' })
  }

  const newUser = { id: users.length + 1, name, email }
  users.push(newUser)
  res.status(201).json({ user: newUser })
})

// PUT /api/users/:id
app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body
  const index = users.findIndex(u => u.id === id)

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' })
  }

  users[index] = { id, name, email }
  res.json({ user: users[index] })
})

// DELETE /api/users/:id
app.delete('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = users.findIndex(u => u.id === id)

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' })
  }

  users.splice(index, 1)
  res.json({ message: 'User deleted' })
})

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
```

### Testing with curl

```bash
curl http://localhost:3000/api/users
curl http://localhost:3000/api/users/1
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Charlie","email":"charlie@example.com"}'
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Smith","email":"alice@example.com"}'
curl -X DELETE http://localhost:3000/api/users/1
```

---

## Error Handling

### Error Handlers

```javascript
// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

// Error handler (must be last)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal Server Error' })
})
```

### try-catch Pattern

```javascript
app.get('/api/users/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    const user = await getUserById(id)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ user })
  } catch (error) {
    next(error)
  }
})
```

---

## Common Mistakes

### Forgetting next()

```javascript
// ❌ Without next(), the request hangs
app.use((req, res, next) => {
  console.log('Middleware')
})

// ✅ Always call next()
app.use((req, res, next) => {
  console.log('Middleware')
  next()
})
```

### Sending Multiple Responses

```javascript
// ❌ Error: cannot send headers after they are sent
app.get('/', (req, res) => {
  res.send('Hello')
  res.send('World')
})

// ✅ Send exactly one response
app.get('/', (req, res) => {
  res.send('Hello World')
})
```

---

## Exercises

### Task: Task Management API

Build an API with:
- GET /api/tasks — list all tasks
- POST /api/tasks — create a task
- DELETE /api/tasks/:id — delete a task

---

## Next Steps

### What You Learned

- ✅ Express framework fundamentals
- ✅ Basic routing
- ✅ The middleware concept
- ✅ Handling requests and responses

**Next guide**: [05-async-programming.md](./05-async-programming.md) — Asynchronous Programming

---

**Previous guide**: [03-npm-basics.md](./03-npm-basics.md)

**Parent**: [Node.js Development - SKILL.md](../../SKILL.md)



===== SOURCE: 04-web-and-network/nodejs-development/docs/01-basics/05-async-programming.md =====

# Asynchronous Programming — Complete Beginner's Guide

## Table of Contents

1. [Overview](#overview)
2. [Synchronous vs Asynchronous](#synchronous-vs-asynchronous)
3. [Callbacks](#callbacks)
4. [Promises](#promises)
5. [async/await](#asyncawait)
6. [Error Handling](#error-handling)
7. [Exercises](#exercises)
8. [Next Steps](#next-steps)

---

## Overview

### What You'll Learn

- The difference between synchronous and asynchronous code
- Callback functions
- How to use Promises
- How to use async/await

### Estimated Time: 1–1.5 hours

---

## Synchronous vs Asynchronous

### Synchronous (Blocking)

```javascript
const fs = require('fs')

console.log('Start')

// Synchronous: waits for file read to complete
const data = fs.readFileSync('file.txt', 'utf8')
console.log(data)

console.log('End')
```

**Execution order**:
```
1. Start
2. (waiting for file read)
3. File contents
4. End
```

### Asynchronous (Non-blocking)

```javascript
const fs = require('fs')

console.log('Start')

// Asynchronous: continues without waiting
fs.readFile('file.txt', 'utf8', (err, data) => {
  console.log(data)
})

console.log('End')
```

**Execution order**:
```
1. Start
2. End
3. File contents
```

---

## Callbacks

### What is a Callback?

A **callback** is a function executed after an asynchronous operation completes.

```javascript
// Basic form
setTimeout(() => {
  console.log('2 seconds later')
}, 2000)

// Callback arguments
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})
```

### Callback Hell

```javascript
// ❌ Callback hell (avoid this)
fs.readFile('file1.txt', 'utf8', (err, data1) => {
  if (err) return console.error(err)

  fs.readFile('file2.txt', 'utf8', (err, data2) => {
    if (err) return console.error(err)

    fs.readFile('file3.txt', 'utf8', (err, data3) => {
      if (err) return console.error(err)

      console.log(data1, data2, data3)
    })
  })
})
```

---

## Promises

### What is a Promise?

A **Promise** is an object representing the eventual result of an asynchronous operation.

**States**:
- **Pending**: operation in progress
- **Fulfilled**: operation succeeded
- **Rejected**: operation failed

### Basic Usage

```javascript
const readFileAsync = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

readFileAsync('file.txt')
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.error(err)
  })
```

### Promise Chaining

```javascript
// ✅ Promise chain (readable)
readFileAsync('file1.txt')
  .then(data1 => {
    console.log('File 1:', data1)
    return readFileAsync('file2.txt')
  })
  .then(data2 => {
    console.log('File 2:', data2)
    return readFileAsync('file3.txt')
  })
  .then(data3 => {
    console.log('File 3:', data3)
  })
  .catch(err => {
    console.error(err)
  })
```

### Promise.all (Parallel Execution)

```javascript
const promises = [
  readFileAsync('file1.txt'),
  readFileAsync('file2.txt'),
  readFileAsync('file3.txt')
]

Promise.all(promises)
  .then(([data1, data2, data3]) => {
    console.log(data1, data2, data3)
  })
  .catch(err => {
    console.error(err)
  })
```

---

## async/await

### What is async/await?

**async/await** is syntax that makes Promises easier to read and write.

### Basic Usage

```javascript
async function readFiles() {
  try {
    const data1 = await readFileAsync('file1.txt')
    console.log('File 1:', data1)

    const data2 = await readFileAsync('file2.txt')
    console.log('File 2:', data2)

    const data3 = await readFileAsync('file3.txt')
    console.log('File 3:', data3)
  } catch (err) {
    console.error(err)
  }
}

readFiles()
```

### Arrow Function Syntax

```javascript
const readFiles = async () => {
  try {
    const data = await readFileAsync('file.txt')
    console.log(data)
  } catch (err) {
    console.error(err)
  }
}
```

### Parallel Execution

```javascript
// ❌ Sequential (slow)
async function sequential() {
  const data1 = await readFileAsync('file1.txt')  // 1s
  const data2 = await readFileAsync('file2.txt')  // 1s
  const data3 = await readFileAsync('file3.txt')  // 1s
  // Total: 3s
}

// ✅ Parallel (fast)
async function parallel() {
  const [data1, data2, data3] = await Promise.all([
    readFileAsync('file1.txt'),
    readFileAsync('file2.txt'),
    readFileAsync('file3.txt')
  ])
  // Total: 1s
}
```

---

## Error Handling

### try-catch

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error:', error.message)
    throw error
  }
}
```

### Multiple try-catch Blocks

```javascript
async function process() {
  let data

  try {
    data = await fetchData()
  } catch (error) {
    console.error('Fetch failed:', error)
    return
  }

  try {
    await saveData(data)
  } catch (error) {
    console.error('Save failed:', error)
  }
}
```

---

## Practical Examples

### Example 1: API Request

```javascript
const fetch = require('node-fetch')

// Using async/await (recommended)
async function getUser(id) {
  try {
    const response = await fetch(`https://api.example.com/users/${id}`)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const user = await response.json()
    return user
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw error
  }
}

getUser(1)
  .then(user => console.log(user))
  .catch(err => console.error(err))
```

### Example 2: Multiple API Calls

```javascript
async function fetchMultipleUsers() {
  try {
    const [user1, user2, user3] = await Promise.all([
      getUser(1),
      getUser(2),
      getUser(3)
    ])

    console.log('Users:', user1, user2, user3)
  } catch (error) {
    console.error('Failed to fetch users:', error)
  }
}
```

---

## async/await in Express

### Route Handlers

```javascript
const express = require('express')
const app = express()

// ❌ Errors are not caught
app.get('/users/:id', async (req, res) => {
  const user = await getUser(req.params.id)
  res.json({ user })
})

// ✅ Wrap in try-catch
app.get('/users/:id', async (req, res, next) => {
  try {
    const user = await getUser(req.params.id)
    res.json({ user })
  } catch (error) {
    next(error)
  }
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
})
```

### Async Wrapper Utility

```javascript
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await getUser(req.params.id)
  res.json({ user })
}))
```

---

## Common Mistakes

### Forgetting await

```javascript
// ❌ Returns a Promise object, not the data
async function fetchData() {
  const data = fetch('https://api.example.com')
  console.log(data)  // [Promise]
}

// ✅ Correct
async function fetchData() {
  const data = await fetch('https://api.example.com')
  console.log(data)
}
```

### Using await Outside async

```javascript
// ❌ Error: await outside async function
const data = await fetchData()

// ✅ Correct
async function main() {
  const data = await fetchData()
}

main()
```

---

## Exercises

### Task: sleep Function

Implement a `sleep` function.

```javascript
const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function example() {
  console.log('Start')
  await sleep(2000)
  console.log('2 seconds later')
}

example()
```

---

## Next Steps

### What You Learned

- ✅ The difference between synchronous and asynchronous code
- ✅ Callback functions
- ✅ How to use Promises
- ✅ How to use async/await

**Next guide**: [06-first-server-tutorial.md](./06-first-server-tutorial.md) — Building Your First Server

---

**Previous guide**: [04-express-intro.md](./04-express-intro.md)

**Parent**: [Node.js Development - SKILL.md](../../SKILL.md)



===== SOURCE: 04-web-and-network/nodejs-development/docs/01-basics/06-first-server-tutorial.md =====

# Building Your First Server — Comprehensive Tutorial

## Table of Contents

1. [Overview](#overview)
2. [Project Goal](#project-goal)
3. [Project Setup](#project-setup)
4. [Server Implementation](#server-implementation)
5. [Data Management](#data-management)
6. [Error Handling](#error-handling)
7. [Testing and Debugging](#testing-and-debugging)
8. [Summary](#summary)

---

## Overview

### What You'll Build

This tutorial integrates all concepts learned so far to implement a **Task Management API**.

### Features

- ✅ List all tasks
- ✅ Create a task
- ✅ Update a task
- ✅ Delete a task
- ✅ Data persistence (JSON file)
- ✅ Error handling

### Estimated Time: 2–3 hours

---

## Project Goal

### The Final API

```
GET    /api/tasks          - List tasks
POST   /api/tasks          - Create a task
GET    /api/tasks/:id      - Get task details
PUT    /api/tasks/:id      - Update a task
DELETE /api/tasks/:id      - Delete a task
```

---

## Project Setup

### Step 1: Create the Project

```bash
mkdir task-api
cd task-api

npm init -y

npm install express
npm install --save-dev nodemon
```

### Step 2: Directory Structure

```bash
task-api/
├── src/
│   ├── server.js          # Server entry point
│   ├── routes/
│   │   └── tasks.js       # Tasks router
│   └── data/
│       └── tasks.json     # Data file
├── package.json
└── .gitignore
```

```bash
mkdir -p src/routes src/data
touch src/server.js
touch src/routes/tasks.js
touch src/data/tasks.json
echo "node_modules/" > .gitignore
```

### Step 3: Configure package.json

```json
{
  "name": "task-api",
  "version": "1.0.0",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

---

## Server Implementation

### src/server.js

```javascript
const express = require('express')
const tasksRouter = require('./routes/tasks')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Task API',
    endpoints: {
      tasks: '/api/tasks',
      task: '/api/tasks/:id'
    }
  })
})

app.use('/api/tasks', tasksRouter)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal Server Error' })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
```

---

## Data Management

### src/data/tasks.json (initial data)

```json
[
  {
    "id": 1,
    "title": "Go grocery shopping",
    "completed": false,
    "createdAt": "2024-12-24T10:00:00.000Z"
  },
  {
    "id": 2,
    "title": "Reply to emails",
    "completed": true,
    "createdAt": "2024-12-24T11:00:00.000Z"
  }
]
```

### src/routes/tasks.js

```javascript
const express = require('express')
const fs = require('fs').promises
const path = require('path')

const router = express.Router()
const DATA_FILE = path.join(__dirname, '../data/tasks.json')

async function readTasks() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Failed to read tasks:', error)
    return []
  }
}

async function writeTasks(tasks) {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2))
  } catch (error) {
    console.error('Failed to write tasks:', error)
    throw error
  }
}

// GET /api/tasks
router.get('/', async (req, res, next) => {
  try {
    const tasks = await readTasks()
    res.json({ tasks })
  } catch (error) {
    next(error)
  }
})

// GET /api/tasks/:id
router.get('/:id', async (req, res, next) => {
  try {
    const tasks = await readTasks()
    const task = tasks.find(t => t.id === parseInt(req.params.id))

    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }

    res.json({ task })
  } catch (error) {
    next(error)
  }
})

// POST /api/tasks
router.post('/', async (req, res, next) => {
  try {
    const { title } = req.body

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return res.status(400).json({ error: 'Title is required' })
    }

    const tasks = await readTasks()
    const newTask = {
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    }

    tasks.push(newTask)
    await writeTasks(tasks)

    res.status(201).json({ task: newTask })
  } catch (error) {
    next(error)
  }
})

// PUT /api/tasks/:id
router.put('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    const { title, completed } = req.body

    if (title !== undefined && (typeof title !== 'string' || title.trim().length === 0)) {
      return res.status(400).json({ error: 'Invalid title' })
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Invalid completed value' })
    }

    const tasks = await readTasks()
    const taskIndex = tasks.findIndex(t => t.id === id)

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' })
    }

    if (title !== undefined) tasks[taskIndex].title = title.trim()
    if (completed !== undefined) tasks[taskIndex].completed = completed

    await writeTasks(tasks)
    res.json({ task: tasks[taskIndex] })
  } catch (error) {
    next(error)
  }
})

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id)
    const tasks = await readTasks()
    const taskIndex = tasks.findIndex(t => t.id === id)

    if (taskIndex === -1) {
      return res.status(404).json({ error: 'Task not found' })
    }

    tasks.splice(taskIndex, 1)
    await writeTasks(tasks)

    res.json({ message: 'Task deleted' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
```

---

## Testing and Debugging

### Start the Server

```bash
# Development mode (auto-restart)
npm run dev

# Production mode
npm start
```

### Test with curl

```bash
# 1. List tasks
curl http://localhost:3000/api/tasks

# 2. Create a task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"New task"}'

# 3. Get task details
curl http://localhost:3000/api/tasks/1

# 4. Update a task
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# 5. Delete a task
curl -X DELETE http://localhost:3000/api/tasks/1
```

---

## Extension Ideas

### 1. Search and Filtering

```javascript
// GET /api/tasks?completed=false
router.get('/', async (req, res, next) => {
  try {
    let tasks = await readTasks()

    if (req.query.completed !== undefined) {
      const completed = req.query.completed === 'true'
      tasks = tasks.filter(t => t.completed === completed)
    }

    res.json({ tasks })
  } catch (error) {
    next(error)
  }
})
```

### 2. Sorting

```javascript
// GET /api/tasks?sort=createdAt&order=desc
router.get('/', async (req, res, next) => {
  try {
    let tasks = await readTasks()
    const { sort = 'id', order = 'asc' } = req.query
    tasks.sort((a, b) => {
      const aVal = a[sort]
      const bVal = b[sort]
      return order === 'asc' ? aVal > bVal ? 1 : -1 : aVal < bVal ? 1 : -1
    })
    res.json({ tasks })
  } catch (error) {
    next(error)
  }
})
```

### 3. Pagination

```javascript
// GET /api/tasks?page=1&limit=10
router.get('/', async (req, res, next) => {
  try {
    const tasks = await readTasks()
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const startIndex = (page - 1) * limit
    const paginatedTasks = tasks.slice(startIndex, startIndex + limit)

    res.json({
      tasks: paginatedTasks,
      pagination: {
        page,
        limit,
        total: tasks.length,
        totalPages: Math.ceil(tasks.length / limit)
      }
    })
  } catch (error) {
    next(error)
  }
})
```

---

## Summary

### What You Learned

- ✅ Building an API with Express
- ✅ Routing and middleware
- ✅ File-based data management
- ✅ Asynchronous programming (async/await)
- ✅ Error handling
- ✅ CRUD operations

### Next Steps

1. **Database integration**: MongoDB, PostgreSQL, etc.
2. **Authentication**: JWT, OAuth
3. **Validation**: Joi, express-validator
4. **Testing**: Jest, Supertest
5. **Deployment**: Heroku, Render, AWS, etc.

---

**Previous guide**: [05-async-programming.md](./05-async-programming.md)

**Parent**: [Node.js Development - SKILL.md](../../SKILL.md)

**Congratulations!** You've learned all the Node.js development fundamentals.



===== SOURCE: 04-web-and-network/nodejs-development/docs/02-async-patterns/01-callbacks.md =====

# Callbacks in Node.js

Callbacks are the foundation of asynchronous programming in Node.js. Understanding them is essential before moving to Promises and async/await.

---

## Table of Contents

1. [What is a Callback](#1-what-is-a-callback)
2. [Basic Callback Patterns](#2-basic-callback-patterns)
3. [Callback Hell](#3-callback-hell)
4. [Problems with Callback Hell](#4-problems-with-callback-hell)
5. [Anti-patterns](#5-anti-patterns)
6. [FAQ](#6-faq)

---

## 1. What is a Callback

A **callback** is a function passed as an argument to another function, which is then invoked once the operation completes. In Node.js, callbacks are the primary mechanism for handling asynchronous I/O operations.

```js
// Basic callback concept
function greet(name, callback) {
  const message = `Hello, ${name}!`;
  callback(message);
}

greet("Alice", (msg) => {
  console.log(msg); // Hello, Alice!
});
```

Node.js adopts the **error-first callback convention** (also called "Node-style callbacks" or "errbacks"). The first argument is always an error object (or `null` if no error), and the second argument is the result.

```js
// Error-first callback convention
function readData(id, callback) {
  if (id <= 0) {
    return callback(new Error("ID must be positive"));
  }
  // simulate async work
  setTimeout(() => {
    callback(null, { id, value: "data" });
  }, 100);
}

readData(1, (err, data) => {
  if (err) {
    console.error("Error:", err.message);
    return;
  }
  console.log("Data:", data);
});
```

**Why error-first?**
- Enforces consistent error handling across all async APIs
- Node.js core modules (`fs`, `net`, `http`) all follow this convention
- Makes it obvious to callers that they must handle errors

---

## 2. Basic Callback Patterns

### 2.1 File System Operations

The most common real-world callback usage in Node.js is `fs` module operations.

```js
const fs = require("fs");

// Reading a file asynchronously
fs.readFile("./data.txt", "utf8", (err, content) => {
  if (err) {
    console.error("Failed to read file:", err.message);
    return;
  }
  console.log("File content:", content);
});

console.log("This runs before file content is logged");
```

```
Output:
  This runs before file content is logged
  File content: (file contents here)
```

### 2.2 Writing Files

```js
const fs = require("fs");

const data = JSON.stringify({ name: "Alice", age: 30 }, null, 2);

fs.writeFile("./output.json", data, "utf8", (err) => {
  if (err) {
    console.error("Write failed:", err.message);
    return;
  }
  console.log("File written successfully");
});
```

### 2.3 HTTP Request with Callbacks

```js
const https = require("https");

function fetchData(url, callback) {
  https
    .get(url, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        try {
          const parsed = JSON.parse(body);
          callback(null, parsed);
        } catch (parseErr) {
          callback(parseErr);
        }
      });
    })
    .on("error", (err) => {
      callback(err);
    });
}

fetchData("https://jsonplaceholder.typicode.com/todos/1", (err, data) => {
  if (err) {
    console.error("Fetch error:", err.message);
    return;
  }
  console.log("Fetched:", data);
});
```

### 2.4 Database Query Simulation

```js
// Simulating an async database query
function queryUser(userId, callback) {
  // Simulate network latency
  setTimeout(() => {
    const users = {
      1: { id: 1, name: "Alice", role: "admin" },
      2: { id: 2, name: "Bob", role: "user" },
    };

    const user = users[userId];
    if (!user) {
      return callback(new Error(`User ${userId} not found`));
    }
    callback(null, user);
  }, 50);
}

queryUser(1, (err, user) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Found user:", user.name); // Found user: Alice
});
```

---

## 3. Callback Hell

**Callback hell** (also called the "pyramid of doom") occurs when multiple async operations depend on each other and each must be nested inside the previous callback.

### 3.1 A Real-World Scenario

Imagine a workflow: read a config file → query a database → fetch additional data from an API → write the combined result to a file.

```js
const fs = require("fs");

fs.readFile("./config.json", "utf8", (err, configData) => {
  if (err) {
    console.error("Config read error:", err.message);
    return;
  }

  const config = JSON.parse(configData);

  queryUser(config.userId, (err, user) => {
    if (err) {
      console.error("User query error:", err.message);
      return;
    }

    fetchUserPosts(user.id, (err, posts) => {
      if (err) {
        console.error("Posts fetch error:", err.message);
        return;
      }

      const report = JSON.stringify({ user, posts }, null, 2);

      fs.writeFile("./report.json", report, "utf8", (err) => {
        if (err) {
          console.error("Write error:", err.message);
          return;
        }

        console.log("Report written successfully");

        notifyAdmin(user.name, (err) => {
          if (err) {
            console.error("Notification error:", err.message);
            return;
          }
          console.log("Admin notified");
        });
      });
    });
  });
});
```

The indentation visualizes the problem:

```
readFile(
  queryUser(
    fetchUserPosts(
      writeFile(
        notifyAdmin(
          // callback hell
        )
      )
    )
  )
)
```

---

## 4. Problems with Callback Hell

### 4.1 Readability

Code grows horizontally instead of vertically. Deep nesting makes it hard to follow the logical flow at a glance.

### 4.2 Error Handling Duplication

Every nested callback must handle its own error, leading to repetitive `if (err) { return; }` blocks scattered throughout.

```js
// Error handling repeated at every level
step1((err, result1) => {
  if (err) return handleError(err); // repeated
  step2(result1, (err, result2) => {
    if (err) return handleError(err); // repeated
    step3(result2, (err, result3) => {
      if (err) return handleError(err); // repeated
      // ...
    });
  });
});
```

### 4.3 Difficult Refactoring

Adding a new step in the middle requires restructuring the entire nesting hierarchy.

### 4.4 No Return Values

Callbacks cannot use `return` to propagate values up the call stack. All data must be threaded through callback arguments.

### 4.5 Partial Mitigation: Named Functions

One way to reduce visual nesting is to extract callbacks into named functions:

```js
const fs = require("fs");

function onAdminNotified(err) {
  if (err) {
    console.error("Notification error:", err.message);
    return;
  }
  console.log("Admin notified");
}

function onReportWritten(err, user) {
  // note: user must be closed over or passed differently
  if (err) {
    console.error("Write error:", err.message);
    return;
  }
  notifyAdmin(user.name, onAdminNotified);
}

// This approach helps with indentation but still has sequential dependencies
```

Named functions reduce nesting visually but do not solve the fundamental issues of error propagation or composability.

---

## 5. Anti-patterns

### 5.1 Forgetting to Return After Callback

```js
// WRONG: callback is called twice if there is no return
function badFunction(input, callback) {
  if (!input) {
    callback(new Error("No input")); // execution continues!
  }
  callback(null, processInput(input)); // called again → bug
}

// CORRECT: always return after calling back with an error
function goodFunction(input, callback) {
  if (!input) {
    return callback(new Error("No input")); // stops here
  }
  callback(null, processInput(input));
}
```

### 5.2 Throwing Instead of Passing Errors

```js
// WRONG: throwing inside an async callback crashes the process
fs.readFile("file.txt", "utf8", (err, data) => {
  if (err) throw err; // unhandled exception in async context
});

// CORRECT: pass errors through the callback
function readAndProcess(path, callback) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) return callback(err);
    callback(null, data.toUpperCase());
  });
}
```

### 5.3 Synchronous Code Inside Async Wrappers

```js
// WRONG: using sync fs inside what should be async
function getConfig(callback) {
  try {
    const data = fs.readFileSync("config.json"); // blocks the event loop
    callback(null, JSON.parse(data));
  } catch (err) {
    callback(err);
  }
}

// CORRECT: use the async version
function getConfig(callback) {
  fs.readFile("config.json", "utf8", (err, data) => {
    if (err) return callback(err);
    try {
      callback(null, JSON.parse(data));
    } catch (parseErr) {
      callback(parseErr);
    }
  });
}
```

### 5.4 Mixing Sync and Async Returns

```js
// WRONG: sometimes async, sometimes sync — unpredictable behavior
function getData(useCache, callback) {
  if (useCache) {
    callback(null, cachedData); // sync call — fires before current tick ends
  } else {
    fetchFromDB(callback); // async call
  }
}

// CORRECT: always async using process.nextTick
function getData(useCache, callback) {
  if (useCache) {
    return process.nextTick(() => callback(null, cachedData));
  }
  fetchFromDB(callback);
}
```

---

## 6. FAQ

**Q: Is the error-first callback convention mandatory?**

A: It is not enforced by the language, but it is a de-facto standard in the Node.js ecosystem. Breaking this convention makes your API harder to integrate with utilities like `util.promisify`.

---

**Q: Can I use `util.promisify` to convert callback-based functions to Promises?**

A: Yes, as long as the function follows the error-first callback convention.

```js
const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);

readFile("./data.txt", "utf8")
  .then((content) => console.log(content))
  .catch((err) => console.error(err));
```

---

**Q: Should I still learn callbacks if I always use async/await?**

A: Yes. Many Node.js core modules and third-party libraries still expose callback-based APIs. Knowing callbacks lets you understand what async/await compiles down to and helps you debug event-loop issues.

---

**Q: What is `process.nextTick` and when should I use it?**

A: `process.nextTick` schedules a callback to run at the end of the current operation, before the event loop continues to the next phase. Use it to ensure callbacks always fire asynchronously even when the result is available synchronously.

```js
function alwaysAsync(value, callback) {
  process.nextTick(() => callback(null, value));
}
```

---

**Q: How many levels of nesting are acceptable before refactoring?**

A: As a guideline, more than 2–3 levels of callback nesting is a signal to refactor. Use Promises or async/await for any workflow with more than two sequential async steps.

---

**Parent guide**: [Node.js Development - SKILL.md](../../SKILL.md)



===== SOURCE: 04-web-and-network/nodejs-development/docs/02-async-patterns/02-promises.md =====

# Promises in Node.js

Promises provide a cleaner, more composable way to handle asynchronous operations compared to callbacks. They were standardized in ES2015 and are natively supported in all modern Node.js versions.

---

## Table of Contents

1. [What is a Promise](#1-what-is-a-promise)
2. [Three States of a Promise](#2-three-states-of-a-promise)
3. [`.then()` and `.catch()` Chaining](#3-then-and-catch-chaining)
4. [`Promise.all()` / `Promise.race()` / `Promise.allSettled()`](#4-promiseall--promiserace--promiseallsettled)
5. [Error Handling](#5-error-handling)
6. [Anti-patterns](#6-anti-patterns)
7. [FAQ](#7-faq)

---

## 1. What is a Promise

A **Promise** is an object representing the eventual completion or failure of an asynchronous operation. It solves the two core problems of callback-based code:

- **Callback hell** — sequential async steps can now be chained with `.then()` instead of nested
- **Inconsistent error handling** — a single `.catch()` at the end of a chain handles all errors

```js
// Callback style
readFile("config.json", (err, data) => {
  if (err) return handleError(err);
  processData(data, (err, result) => {
    if (err) return handleError(err);
    saveResult(result, (err) => {
      if (err) return handleError(err);
      console.log("Done");
    });
  });
});

// Promise style — same logic, linear flow
readFile("config.json")
  .then((data) => processData(data))
  .then((result) => saveResult(result))
  .then(() => console.log("Done"))
  .catch((err) => handleError(err));
```

### Creating a Promise

Use `new Promise(executor)` where the executor receives `resolve` and `reject` functions.

```js
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function fetchUser(id) {
  return new Promise((resolve, reject) => {
    if (id <= 0) {
      return reject(new Error("Invalid ID"));
    }
    setTimeout(() => {
      resolve({ id, name: "Alice" });
    }, 100);
  });
}

fetchUser(1).then((user) => console.log(user.name)); // Alice
```

### Promisifying Callbacks with `util.promisify`

Node.js provides a built-in utility to convert error-first callback functions into Promise-returning functions.

```js
const fs = require("fs");
const { promisify } = require("util");

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

readFile("./data.txt", "utf8")
  .then((content) => {
    console.log(content);
    return writeFile("./copy.txt", content, "utf8");
  })
  .then(() => console.log("Copy written"))
  .catch((err) => console.error(err));
```

---

## 2. Three States of a Promise

A Promise is always in one of three mutually exclusive states:

```
            ┌─────────────────────────────┐
            │         PENDING             │
            │  (initial state — waiting)  │
            └──────────┬──────────────────┘
                       │
          ┌────────────┴────────────┐
          │ resolve(value)          │ reject(reason)
          ▼                         ▼
  ┌──────────────┐         ┌──────────────────┐
  │  FULFILLED   │         │    REJECTED       │
  │ (succeeded)  │         │ (failed)          │
  └──────────────┘         └──────────────────┘
```

- **Pending**: the async operation has not completed yet
- **Fulfilled**: the operation completed successfully; `resolve(value)` was called
- **Rejected**: the operation failed; `reject(reason)` was called

Once a Promise settles (transitions from pending to either fulfilled or rejected), its state is **immutable**. Calling `resolve` or `reject` a second time has no effect.

```js
const p = new Promise((resolve, reject) => {
  resolve("first");
  resolve("second"); // ignored — already settled
  reject(new Error("too late")); // also ignored
});

p.then((val) => console.log(val)); // "first"
```

---

## 3. `.then()` and `.catch()` Chaining

### `.then(onFulfilled, onRejected)`

`.then()` accepts up to two callbacks: one for success and one for failure.

```js
fetchUser(1)
  .then(
    (user) => console.log("Success:", user.name),
    (err) => console.error("Error:", err.message)
  );
```

In practice, separating success and error handlers into `.then()` and `.catch()` is cleaner:

```js
fetchUser(1)
  .then((user) => console.log("Success:", user.name))
  .catch((err) => console.error("Error:", err.message));
```

### Chaining `.then()`

Each `.then()` returns a **new Promise**, enabling linear chaining of sequential async steps.

```js
const { promisify } = require("util");
const fs = require("fs");
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

readFile("./input.txt", "utf8")
  .then((content) => {
    const transformed = content.toUpperCase();
    return writeFile("./output.txt", transformed, "utf8");
  })
  .then(() => {
    console.log("Transformation complete");
    return readFile("./output.txt", "utf8");
  })
  .then((result) => {
    console.log("Verified output:", result.slice(0, 50));
  })
  .catch((err) => {
    console.error("Pipeline failed:", err.message);
  });
```

### Passing Values Through the Chain

Whatever a `.then()` callback returns becomes the resolved value of the next `.then()`.

```js
Promise.resolve(1)
  .then((n) => n + 1)   // returns 2
  .then((n) => n * 3)   // returns 6
  .then((n) => console.log(n)); // 6
```

### `.finally()`

`.finally()` runs regardless of success or failure — useful for cleanup operations.

```js
let connection;

openConnection()
  .then((conn) => {
    connection = conn;
    return conn.query("SELECT * FROM users");
  })
  .then((rows) => console.log(rows))
  .catch((err) => console.error(err))
  .finally(() => {
    if (connection) connection.close();
  });
```

---

## 4. `Promise.all()` / `Promise.race()` / `Promise.allSettled()`

### `Promise.all(iterable)`

Runs multiple Promises **in parallel** and resolves when **all** of them fulfill. Rejects immediately if **any** one rejects.

```js
const fetchPost = (id) =>
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((r) =>
    r.json()
  );

Promise.all([fetchPost(1), fetchPost(2), fetchPost(3)])
  .then(([post1, post2, post3]) => {
    console.log(post1.title);
    console.log(post2.title);
    console.log(post3.title);
  })
  .catch((err) => {
    // fires if ANY request fails
    console.error("One or more requests failed:", err.message);
  });
```

```
Timing:
  Sequential:  [---1---][---2---][---3---]  ~300ms
  Parallel:    [---1---]
               [---2---]                    ~100ms (all run at once)
               [---3---]
```

### `Promise.race(iterable)`

Resolves or rejects with the **first** Promise that settles, ignoring all others.

```js
function timeout(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms)
  );
}

function fetchWithTimeout(url, ms) {
  return Promise.race([fetch(url).then((r) => r.json()), timeout(ms)]);
}

fetchWithTimeout("https://api.example.com/data", 3000)
  .then((data) => console.log(data))
  .catch((err) => console.error(err.message));
```

### `Promise.allSettled(iterable)`

Waits for **all** Promises to settle (fulfill or reject), and returns an array of result objects. Never rejects.

```js
const requests = [
  fetch("https://api.example.com/users").then((r) => r.json()),
  fetch("https://api.example.com/posts").then((r) => r.json()),
  fetch("https://api.invalid.com/data").then((r) => r.json()), // will fail
];

Promise.allSettled(requests).then((results) => {
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`Request ${index + 1} succeeded:`, result.value);
    } else {
      console.log(`Request ${index + 1} failed:`, result.reason.message);
    }
  });
});
```

### `Promise.any(iterable)` (ES2021)

Resolves with the **first fulfilled** Promise. Rejects only if **all** Promises reject.

```js
// Try multiple mirrors and use whichever responds first
Promise.any([
  fetch("https://mirror1.example.com/file"),
  fetch("https://mirror2.example.com/file"),
  fetch("https://mirror3.example.com/file"),
])
  .then((response) => response.blob())
  .then((blob) => console.log("Downloaded from fastest mirror"))
  .catch((err) => console.error("All mirrors failed"));
```

### Comparison Table

| Method              | Resolves when         | Rejects when         |
|---------------------|-----------------------|----------------------|
| `Promise.all`       | All fulfill           | Any one rejects      |
| `Promise.race`      | First settles         | First settles (fail) |
| `Promise.allSettled`| All settle            | Never                |
| `Promise.any`       | First fulfills        | All reject           |

---

## 5. Error Handling

### Single `.catch()` for the Entire Chain

```js
readConfig()
  .then((config) => validateConfig(config))
  .then((config) => connectDB(config.dbUrl))
  .then((db) => db.query("SELECT 1"))
  .then((result) => console.log("DB OK:", result))
  .catch((err) => {
    // catches errors from any step above
    console.error("Pipeline error:", err.message);
  });
```

### Recovering from Errors Mid-Chain

A `.catch()` in the middle of a chain can handle the error and return a fallback value, allowing the chain to continue.

```js
fetchUserFromAPI(userId)
  .catch((err) => {
    console.warn("API unavailable, falling back to cache:", err.message);
    return fetchUserFromCache(userId); // recovery — chain continues
  })
  .then((user) => {
    console.log("Got user:", user.name);
  })
  .catch((err) => {
    console.error("Both API and cache failed:", err.message);
  });
```

### Re-throwing Errors

```js
fetchData()
  .catch((err) => {
    if (err.code === "ENOENT") {
      return defaultData; // handle and recover
    }
    throw err; // re-throw unknown errors
  })
  .then((data) => process(data))
  .catch((err) => console.error("Unhandled:", err.message));
```

### Unhandled Promise Rejections

Node.js emits an `unhandledRejection` event when a rejected Promise has no `.catch()`. In recent Node.js versions (v15+), this crashes the process.

```js
// Always attach .catch() or use async/await with try/catch
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled rejection:", reason);
  process.exit(1);
});
```

---

## 6. Anti-patterns

### 6.1 The Promise Constructor Anti-pattern (Deferred)

```js
// WRONG: wrapping an existing Promise in a new Promise
function getUser(id) {
  return new Promise((resolve, reject) => {
    fetchUser(id) // fetchUser already returns a Promise
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
}

// CORRECT: return the Promise directly
function getUser(id) {
  return fetchUser(id);
}
```

### 6.2 Forgetting to Return a Promise in `.then()`

```js
// WRONG: the chain does not wait for saveUser to complete
fetchUser(1)
  .then((user) => {
    saveUser(user); // missing return — fire and forget
  })
  .then(() => console.log("Saved")); // runs before saveUser finishes

// CORRECT: return the inner Promise
fetchUser(1)
  .then((user) => {
    return saveUser(user); // chain waits for this
  })
  .then(() => console.log("Saved"));
```

### 6.3 Swallowing Errors with Empty `.catch()`

```js
// WRONG: errors are silently ignored
doSomething()
  .catch(() => {}); // black hole — errors vanish

// CORRECT: at minimum, log the error
doSomething()
  .catch((err) => console.error("doSomething failed:", err));
```

### 6.4 Mixing Callbacks and Promises

```js
// WRONG: unpredictable — callback fires, then .then() also fires
function mixedBad(callback) {
  return fetchData().then((data) => {
    callback(null, data);
    return data; // .then() also runs
  });
}

// CORRECT: pick one style and stick to it
function promiseBased() {
  return fetchData();
}
```

---

## 7. FAQ

**Q: What is the difference between `.then(null, onRejected)` and `.catch(onRejected)`?**

A: They are functionally equivalent — `.catch(fn)` is syntactic shorthand for `.then(undefined, fn)`. Prefer `.catch()` for clarity.

---

**Q: Can I `await` a non-Promise value?**

A: Yes. `await someValue` wraps any non-thenable value in `Promise.resolve()`, so it resolves immediately. This is useful but rarely necessary.

---

**Q: Does `Promise.all` run requests in parallel?**

A: The Promises passed to `Promise.all` are already executing (they start when created). `Promise.all` merely waits for all of them to settle. The parallelism is determined by when you create the Promises, not by `Promise.all` itself.

---

**Q: How do I cancel a Promise?**

A: Native Promises cannot be cancelled. Common workarounds include `AbortController` (for `fetch` and some Node.js APIs) and `Promise.race` with a timeout or a manually-rejected Promise.

```js
const controller = new AbortController();

fetch("https://api.example.com/data", { signal: controller.signal })
  .then((r) => r.json())
  .then(console.log)
  .catch((err) => {
    if (err.name === "AbortError") {
      console.log("Request cancelled");
    }
  });

// Cancel after 2 seconds
setTimeout(() => controller.abort(), 2000);
```

---

**Q: When should I use `Promise.allSettled` vs `Promise.all`?**

A: Use `Promise.allSettled` when you need to process the results of all operations regardless of individual failures (e.g., batch API calls where partial success is acceptable). Use `Promise.all` when all operations must succeed for the workflow to continue.

---

**Parent guide**: [Node.js Development - SKILL.md](../../SKILL.md)



===== SOURCE: 04-web-and-network/nodejs-development/docs/02-async-patterns/03-async-await.md =====

# async/await in Node.js

`async/await` is syntactic sugar over Promises that allows you to write asynchronous code in a synchronous style. It was introduced in ES2017 (Node.js 7.6+) and is now the dominant pattern for async Node.js code.

---

## Table of Contents

1. [What is async/await](#1-what-is-asyncawait)
2. [Basic `async` Function](#2-basic-async-function)
3. [How `await` Works](#3-how-await-works)
4. [Error Handling with try/catch](#4-error-handling-with-trycatch)
5. [Parallel Execution with `Promise.all`](#5-parallel-execution-with-promiseall)
6. [Common Mistakes](#6-common-mistakes)
7. [FAQ](#7-faq)

---

## 1. What is async/await

`async/await` does not introduce new async capabilities — it is a layer on top of Promises. Every `async` function returns a Promise, and `await` pauses execution of that function until the awaited Promise settles.

**The same logic, three styles:**

```js
// 1. Callback style
readFile("config.json", "utf8", (err, data) => {
  if (err) return console.error(err);
  const cfg = JSON.parse(data);
  connectDB(cfg.dbUrl, (err, db) => {
    if (err) return console.error(err);
    console.log("Connected");
  });
});

// 2. Promise chain style
readFile("config.json", "utf8")
  .then((data) => JSON.parse(data))
  .then((cfg) => connectDB(cfg.dbUrl))
  .then(() => console.log("Connected"))
  .catch(console.error);

// 3. async/await style
async function init() {
  const data = await readFile("config.json", "utf8");
  const cfg = JSON.parse(data);
  await connectDB(cfg.dbUrl);
  console.log("Connected");
}

init().catch(console.error);
```

All three are equivalent in behavior. The async/await version reads like synchronous code while remaining non-blocking.

---

## 2. Basic `async` Function

### Declaring an async Function

The `async` keyword can be placed before any function declaration or expression.

```js
// Function declaration
async function fetchUser(id) {
  return { id, name: "Alice" };
}

// Function expression
const fetchPost = async function (id) {
  return { id, title: "Hello" };
};

// Arrow function
const fetchComment = async (id) => {
  return { id, body: "Great post!" };
};

// Class method
class UserService {
  async getUser(id) {
    return { id, name: "Bob" };
  }
}
```

### Return Value

An `async` function **always returns a Promise**, even if you return a plain value.

```js
async function add(a, b) {
  return a + b; // equivalent to: return Promise.resolve(a + b)
}

add(2, 3).then(console.log); // 5
```

### Practical Example: File Operations

```js
const fs = require("fs/promises"); // Node.js 14+ built-in Promise API

async function processConfig(path) {
  const raw = await fs.readFile(path, "utf8");
  const config = JSON.parse(raw);

  config.processedAt = new Date().toISOString();

  const output = JSON.stringify(config, null, 2);
  await fs.writeFile(path.replace(".json", ".out.json"), output, "utf8");

  return config;
}

processConfig("./config.json")
  .then((cfg) => console.log("Processed:", cfg.processedAt))
  .catch((err) => console.error("Failed:", err.message));
```

---

## 3. How `await` Works

### Pausing Execution

`await` suspends the execution of the `async` function at that point and yields control back to the event loop. When the awaited Promise settles, execution resumes.

```js
async function demo() {
  console.log("1 - before await");

  const result = await new Promise((resolve) => {
    setTimeout(() => resolve("done"), 1000);
  });

  console.log("3 - after await:", result); // runs ~1 second later
}

demo();
console.log("2 - this runs while demo() is awaiting");
```

```
Output:
  1 - before await
  2 - this runs while demo() is awaiting
  3 - after await: done
```

### `await` on Non-Promise Values

`await` wraps any non-Promise value in `Promise.resolve()`. This means `await 42` is valid but returns `42` immediately.

```js
async function test() {
  const x = await 42;       // resolves immediately
  const y = await "hello";  // also fine
  console.log(x, y);        // 42 hello
}
```

### `await` Only Works Inside `async`

Attempting to use `await` at the top level of a CommonJS module causes a syntax error. Use an async IIFE or switch to ES modules (which support top-level `await` since Node.js 14.8).

```js
// CommonJS — wrap in async function
(async () => {
  const data = await fetchData();
  console.log(data);
})();

// ES module (.mjs or "type": "module" in package.json) — top-level await OK
const data = await fetchData();
console.log(data);
```

### Under the Hood

`async/await` desugars to generator-based coroutine scheduling over Promises. The following two snippets are equivalent:

```js
// async/await
async function getUser(id) {
  const user = await fetchUser(id);
  return user.name;
}

// Equivalent Promise chain
function getUser(id) {
  return fetchUser(id).then((user) => user.name);
}
```

---

## 4. Error Handling with try/catch

### Basic try/catch

Wrap `await` expressions in try/catch to handle rejected Promises.

```js
async function loadUser(id) {
  try {
    const user = await fetchUser(id);
    console.log("User:", user.name);
    return user;
  } catch (err) {
    console.error("Failed to load user:", err.message);
    return null;
  }
}
```

### Handling Multiple Steps

A single try block can cover multiple awaited operations.

```js
const fs = require("fs/promises");

async function buildReport(userId) {
  try {
    const user = await fetchUser(userId);
    const posts = await fetchPosts(userId);
    const report = { user, posts, generatedAt: new Date() };
    await fs.writeFile("./report.json", JSON.stringify(report, null, 2));
    console.log("Report saved");
    return report;
  } catch (err) {
    console.error("Report generation failed:", err.message);
    throw err; // re-throw so the caller knows it failed
  }
}
```

### Granular Error Handling

When different errors require different handling, use separate try/catch blocks.

```js
async function syncData(userId) {
  let user;

  try {
    user = await fetchUser(userId);
  } catch (err) {
    console.error("Could not fetch user:", err.message);
    return; // bail early
  }

  try {
    await syncToRemote(user);
    console.log("Sync complete");
  } catch (err) {
    // sync failure is non-fatal — log and continue
    console.warn("Sync failed, will retry later:", err.message);
    await scheduleRetry(userId);
  }
}
```

### Helper: `to` Pattern (Optional)

Some teams adopt a helper that converts a rejected Promise to `[err, null]` / `[null, data]` to avoid nested try/catch blocks.

```js
async function to(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (err) {
    return [err, null];
  }
}

async function getUser(id) {
  const [err, user] = await to(fetchUser(id));
  if (err) {
    console.error("Fetch failed:", err.message);
    return null;
  }
  return user;
}
```

---

## 5. Parallel Execution with `Promise.all`

### The Sequential Trap

A common mistake is awaiting operations one by one when they could run in parallel.

```js
// SLOW: 300ms total (100 + 100 + 100)
async function slowFetch() {
  const user = await fetchUser(1);    // wait 100ms
  const posts = await fetchPosts(1);  // then wait 100ms
  const tags = await fetchTags(1);    // then wait 100ms
  return { user, posts, tags };
}
```

### Running in Parallel with `Promise.all`

```js
// FAST: ~100ms total (all run at the same time)
async function fastFetch() {
  const [user, posts, tags] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchTags(1),
  ]);
  return { user, posts, tags };
}
```

```
Sequential:  [fetchUser][fetchPosts][fetchTags]   ~300ms
Parallel:    [fetchUser ]
             [fetchPosts]                          ~100ms
             [fetchTags ]
```

### Combining Sequential and Parallel

Some steps are independent (run in parallel); others depend on earlier results (run sequentially).

```js
async function loadDashboard(userId) {
  // Step 1: fetch user first (required for next steps)
  const user = await fetchUser(userId);

  // Step 2: fetch posts and preferences in parallel (both need userId)
  const [posts, preferences] = await Promise.all([
    fetchPosts(user.id),
    fetchPreferences(user.id),
  ]);

  return { user, posts, preferences };
}
```

### Handling Partial Failures with `Promise.allSettled`

```js
async function loadOptionalData(userId) {
  const results = await Promise.allSettled([
    fetchUser(userId),          // required
    fetchRecommendations(userId), // optional
    fetchAds(userId),           // optional
  ]);

  const [userResult, recsResult, adsResult] = results;

  if (userResult.status === "rejected") {
    throw userResult.reason; // user is required
  }

  return {
    user: userResult.value,
    recommendations: recsResult.status === "fulfilled" ? recsResult.value : [],
    ads: adsResult.status === "fulfilled" ? adsResult.value : [],
  };
}
```

---

## 6. Common Mistakes

### 6.1 Sequential await in a Loop (Unnecessary Serialization)

```js
const userIds = [1, 2, 3, 4, 5];

// WRONG: each fetch waits for the previous to finish
async function slowAll() {
  const users = [];
  for (const id of userIds) {
    const user = await fetchUser(id); // sequential!
    users.push(user);
  }
  return users;
}

// CORRECT: start all fetches, then await all results
async function fastAll() {
  const promises = userIds.map((id) => fetchUser(id));
  return await Promise.all(promises);
}
```

**Exception**: Use sequential await in loops when each iteration depends on the previous result (e.g., paginated API traversal).

### 6.2 Unhandled Rejected Promises from async Functions

```js
// WRONG: async function called without .catch() or try/catch
async function dangerousOperation() {
  await doSomethingRisky(); // may reject
}

dangerousOperation(); // rejection goes unhandled — Node.js may crash

// CORRECT: handle at the call site
dangerousOperation().catch((err) => console.error(err));

// or with try/catch in an async context
async function safeWrapper() {
  try {
    await dangerousOperation();
  } catch (err) {
    console.error(err);
  }
}
```

### 6.3 `await` Inside `forEach` Does Not Work as Expected

```js
const ids = [1, 2, 3];

// WRONG: forEach does not await the async callbacks
async function wrong() {
  ids.forEach(async (id) => {
    const user = await fetchUser(id); // these run but forEach does not wait
    console.log(user.name);
  });
  console.log("Done?"); // prints before users are fetched
}

// CORRECT: use for...of for sequential, or map + Promise.all for parallel
async function correctSequential() {
  for (const id of ids) {
    const user = await fetchUser(id);
    console.log(user.name);
  }
}

async function correctParallel() {
  await Promise.all(ids.map(async (id) => {
    const user = await fetchUser(id);
    console.log(user.name);
  }));
  console.log("All done");
}
```

### 6.4 Ignoring the Return Value of `await`

```js
// WRONG: result is discarded, variable is undefined
async function bad() {
  const user = fetchUser(1); // missing await!
  console.log(user.name);   // TypeError: cannot read property of Promise
}

// CORRECT
async function good() {
  const user = await fetchUser(1);
  console.log(user.name);
}
```

### 6.5 Using `async` When Not Needed

```js
// UNNECESSARY: the function body has no await expressions
async function getConfig() {
  return { host: "localhost", port: 3000 }; // no async operation
}

// SIMPLER: return a plain value or Promise.resolve if needed
function getConfig() {
  return { host: "localhost", port: 3000 };
}
```

---

## 7. FAQ

**Q: Is `async/await` just syntactic sugar?**

A: Yes. Every `async` function returns a Promise, and `await` is equivalent to `.then()`. The JavaScript engine compiles `async/await` to Promise chains under the hood. There is no performance difference.

---

**Q: Can I use `async/await` with older Node.js versions?**

A: `async/await` requires Node.js 7.6+ (natively) or Node.js 4+ with Babel transpilation. As of 2025, Node.js 18+ is the LTS baseline, so native support is universal.

---

**Q: Does `await` block the thread?**

A: No. `await` suspends the current `async` function but yields control back to the event loop, allowing other callbacks and Promises to execute. The thread is never blocked.

---

**Q: When should I use `Promise.all` vs sequential `await`?**

A: Use `Promise.all` when operations are **independent** (order does not matter, no data dependencies). Use sequential `await` when each step **depends on the result of the previous** step or when order matters (e.g., read before write).

---

**Q: How do I handle timeouts with `async/await`?**

A: Combine `Promise.race` with a timeout Promise.

```js
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms)
  );
  return Promise.race([promise, timeout]);
}

async function fetchWithTimeout(url) {
  try {
    const data = await withTimeout(fetch(url).then((r) => r.json()), 5000);
    return data;
  } catch (err) {
    console.error(err.message);
    throw err;
  }
}
```

---

**Q: Can I use top-level `await` in Node.js?**

A: Yes, in ES modules (files with `.mjs` extension or `"type": "module"` in `package.json`). In CommonJS modules, wrap your code in an async IIFE.

---

**Parent guide**: [Node.js Development - SKILL.md](../../SKILL.md)



===== SOURCE: 04-web-and-network/nodejs-development/docs/02-async-patterns/04-event-loop.md =====

# The Node.js Event Loop

The event loop is the core mechanism that enables Node.js to perform non-blocking I/O despite running on a single thread. Understanding it is essential for writing predictable async code and diagnosing performance issues.

---

## Table of Contents

1. [What is the Event Loop](#1-what-is-the-event-loop)
2. [Call Stack](#2-call-stack)
3. [Task Queue (Macrotasks)](#3-task-queue-macrotasks)
4. [Microtask Queue](#4-microtask-queue)
5. [Event Loop Phases](#5-event-loop-phases)
6. [Execution Order Examples](#6-execution-order-examples)
7. [Common Interview Questions](#7-common-interview-questions)

---

## 1. What is the Event Loop

Node.js is built on **libuv**, a C library that provides the event loop and async I/O primitives. The event loop continuously checks for pending operations and dispatches their callbacks.

```
  ┌─────────────────────────────────────────┐
  │         Node.js Process                 │
  │                                         │
  │  ┌───────────┐   ┌───────────────────┐  │
  │  │ Call Stack│   │   libuv / OS      │  │
  │  │ (V8)      │   │  Thread Pool      │  │
  │  └─────┬─────┘   │  (fs, crypto...)  │  │
  │        │          └────────┬──────────┘  │
  │        │                   │             │
  │  ┌─────▼─────────────────▼──────────┐  │
  │  │            Event Loop             │  │
  │  │  timers → I/O → poll → check     │  │
  │  └──────────────────────────────────┘  │
  └─────────────────────────────────────────┘
```

**Key insight**: The event loop itself runs on the main thread. When I/O operations (file reads, network requests) are dispatched, libuv offloads them to OS kernel async APIs or the thread pool. Their callbacks are queued for the event loop to pick up — the main thread is never blocked waiting.

---

## 2. Call Stack

The **call stack** is a LIFO (last-in, first-out) data structure that tracks currently executing functions. When a function is called, a frame is pushed; when it returns, the frame is popped.

```js
function multiply(a, b) {
  return a * b;
}

function square(n) {
  return multiply(n, n);
}

function main() {
  const result = square(5);
  console.log(result);
}

main();
```

```
Call stack progression:

  main()          →  square(5)       →  multiply(5,5)
  ┌─────────┐       ┌─────────┐        ┌─────────────┐
  │  main   │       │ square  │        │  multiply   │
  └─────────┘       │  main   │        │  square     │
                    └─────────┘        │  main       │
                                       └─────────────┘
                    ← multiply returns
                    ← square returns
  ← main returns  (stack empty → event loop checks queues)
```

**Blocking the call stack**: If a synchronous operation takes a long time (e.g., `fs.readFileSync` on a large file, heavy computation), the call stack is occupied for that duration. The event loop cannot process any callbacks until the stack is empty — this is what "blocking Node.js" means.

```js
// DANGER: blocks the call stack for potentially seconds
const data = fs.readFileSync("huge-file.csv"); // no I/O during this time

// SAFE: yields to the event loop between chunks
const stream = fs.createReadStream("huge-file.csv");
stream.on("data", (chunk) => processChunk(chunk));
```

---

## 3. Task Queue (Macrotasks)

The **task queue** (also called the macrotask queue or callback queue) holds callbacks ready to be executed. Common sources of macrotasks:

| Source | Description |
|--------|-------------|
| `setTimeout(fn, delay)` | Fires after at least `delay` ms |
| `setInterval(fn, delay)` | Repeats every `delay` ms |
| `setImmediate(fn)` | Fires in the check phase (after I/O) |
| I/O callbacks | `fs.readFile`, network responses, etc. |

The event loop processes **one macrotask per loop iteration**, then drains the microtask queue before moving on.

```js
setTimeout(() => console.log("setTimeout"), 0);
setImmediate(() => console.log("setImmediate"));

// Output order in Node.js (when not inside an I/O callback):
// Either order is possible — depends on system timer resolution
// Inside an I/O callback: setImmediate always fires before setTimeout
```

---

## 4. Microtask Queue

The **microtask queue** holds callbacks that should run as soon as the current operation completes, before the event loop moves to the next phase or processes another macrotask.

Sources of microtasks:

| Source | Description |
|--------|-------------|
| `Promise.then()` / `.catch()` / `.finally()` | Promise resolution callbacks |
| `queueMicrotask(fn)` | Explicit microtask scheduling |
| `process.nextTick(fn)` | Node.js-specific — highest priority microtask |

### Priority Order

```
After each task (or at startup):
  1. Drain process.nextTick queue (all of them)
  2. Drain Promise microtask queue (all of them)
  3. Return to event loop → next macrotask
```

```js
Promise.resolve().then(() => console.log("Promise microtask"));
process.nextTick(() => console.log("nextTick"));
setTimeout(() => console.log("setTimeout macrotask"), 0);

console.log("synchronous");

// Output:
// synchronous
// nextTick          ← process.nextTick runs first
// Promise microtask ← then Promise .then()
// setTimeout macrotask ← then macrotask queue
```

### Microtask Starvation

Because the microtask queue is fully drained before any macrotask runs, an infinitely-recursive microtask can starve the event loop.

```js
// DANGER: starves I/O callbacks forever
function infinite() {
  Promise.resolve().then(infinite);
}
infinite();
// setTimeout callbacks never fire, I/O never responds
```

---

## 5. Event Loop Phases

The Node.js event loop has six phases, executed in a fixed order. Each phase has a FIFO queue of callbacks.

```
  ┌──────────────────────────────────────────────┐
  │                                              │
  │   ┌─────────┐                               │
  │   │ timers  │  setTimeout, setInterval       │
  │   └────┬────┘                               │
  │        │                                    │
  │   ┌────▼──────────┐                         │
  │   │ pending I/O   │  deferred I/O errors    │
  │   └────┬──────────┘                         │
  │        │                                    │
  │   ┌────▼──────┐                             │
  │   │  idle,    │  internal use only          │
  │   │  prepare  │                             │
  │   └────┬──────┘                             │
  │        │                                    │
  │   ┌────▼──────┐     ┌──────────────────┐   │
  │   │   poll    │◄────│ incoming I/O /   │   │
  │   └────┬──────┘     │ block if empty   │   │
  │        │            └──────────────────┘   │
  │   ┌────▼──────┐                             │
  │   │   check   │  setImmediate               │
  │   └────┬──────┘                             │
  │        │                                    │
  │   ┌────▼───────────┐                        │
  │   │ close callbacks│  socket.on('close')    │
  │   └────────────────┘                        │
  │        │                                    │
  └────────┘ (loop repeats)
```

### Phase Details

**Timers phase**: Executes callbacks scheduled by `setTimeout` and `setInterval` whose delay threshold has passed. Note: `setTimeout(fn, 0)` is internally clamped to at least 1ms.

**Pending I/O phase**: Executes I/O callbacks deferred to the next loop iteration (mostly error callbacks from the previous cycle).

**Poll phase**: The most critical phase.
- Calculates how long to block and wait for new I/O events
- Processes I/O callbacks in the poll queue
- If the poll queue is empty, waits for I/O events (unless `setImmediate` callbacks are pending)

**Check phase**: Executes `setImmediate` callbacks. Always runs after the poll phase completes.

**Close callbacks phase**: Executes callbacks for closed handles (e.g., `socket.on('close', ...)`).

**Between every phase**: The microtask queues (`process.nextTick` then Promises) are fully drained.

---

## 6. Execution Order Examples

### Example 1: Basic Ordering

```js
console.log("A"); // synchronous

setTimeout(() => console.log("B"), 0); // macrotask

Promise.resolve().then(() => console.log("C")); // microtask

process.nextTick(() => console.log("D")); // highest-priority microtask

console.log("E"); // synchronous

// Output: A, E, D, C, B
```

Explanation:
1. `A` and `E` run synchronously (call stack)
2. `D` runs — `process.nextTick` queue is drained first
3. `C` runs — Promise microtask queue is drained
4. `B` runs — event loop enters timers phase

### Example 2: Nested Microtasks

```js
process.nextTick(() => {
  console.log("nextTick 1");
  process.nextTick(() => console.log("nextTick 2 (nested)"));
});

Promise.resolve().then(() => {
  console.log("Promise 1");
  return Promise.resolve();
}).then(() => console.log("Promise 2 (chained)"));

// Output:
// nextTick 1
// nextTick 2 (nested)  ← nextTick queue fully drained before Promises
// Promise 1
// Promise 2 (chained)
```

### Example 3: `setImmediate` vs `setTimeout` Inside I/O

```js
const fs = require("fs");

fs.readFile(__filename, () => {
  // Inside an I/O callback — poll phase just completed
  setTimeout(() => console.log("setTimeout"), 0);
  setImmediate(() => console.log("setImmediate"));
});

// Output (deterministic inside I/O callback):
// setImmediate  ← check phase always comes before next timers phase
// setTimeout
```

### Example 4: Full Pipeline

```js
const fs = require("fs/promises");

async function pipeline() {
  console.log("1 - start");

  const data = await fs.readFile(__filename, "utf8"); // suspends here

  console.log("3 - after await (I/O complete)");

  process.nextTick(() => console.log("4 - nextTick after resume"));

  await Promise.resolve();

  console.log("5 - after inner await");
}

pipeline();
console.log("2 - synchronous after pipeline() call");

// Output:
// 1 - start
// 2 - synchronous after pipeline() call
// 3 - after await (I/O complete)
// 4 - nextTick after resume
// 5 - after inner await
```

### Example 5: Timer Precision

```js
const start = Date.now();

setTimeout(() => {
  console.log(`Timer fired after ${Date.now() - start}ms`);
}, 100);

// Simulate blocking work
const until = Date.now() + 200;
while (Date.now() < until) {} // blocks the call stack for 200ms

// Output: Timer fired after ~200ms (not 100ms)
// The callback was queued at ~100ms but could not run until the stack was free
```

This demonstrates why blocking the call stack delays all pending callbacks.

---

## 7. Common Interview Questions

### Q1: What is the difference between `process.nextTick` and `Promise.then`?

Both are microtasks, but `process.nextTick` callbacks run **before** Promise callbacks in every microtask drain cycle.

```js
Promise.resolve().then(() => console.log("Promise"));
process.nextTick(() => console.log("nextTick"));

// Output:
// nextTick
// Promise
```

Use `process.nextTick` when you need to schedule a callback before any I/O or Promise resolution in the current turn. Use `Promise.then` for standard async sequencing.

---

### Q2: What is the difference between `setImmediate` and `setTimeout(fn, 0)`?

- `setImmediate` runs in the **check phase**, after the poll phase
- `setTimeout(fn, 0)` runs in the **timers phase** at the start of the next iteration

Inside an I/O callback, `setImmediate` always fires first. Outside I/O callbacks, the order is non-deterministic (depends on OS timer resolution).

```js
// Inside I/O callback → setImmediate always first
fs.readFile("file.txt", () => {
  setImmediate(() => console.log("setImmediate")); // first
  setTimeout(() => console.log("setTimeout"), 0);  // second
});
```

---

### Q3: Can the event loop get "stuck"?

Yes, in two ways:

1. **Blocking the call stack** — synchronous CPU-intensive code (heavy loops, `readFileSync` on large files) prevents the event loop from processing callbacks.

2. **Microtask starvation** — an infinite chain of microtasks (recursive `Promise.resolve().then(...)` or `process.nextTick(...)`) never allows macrotasks to run.

---

### Q4: How does `async/await` interact with the event loop?

An `await` expression suspends the `async` function and schedules its resumption as a **microtask** when the awaited Promise settles. This means code after `await` runs in the microtask queue, not as a new macrotask.

```js
async function example() {
  await Promise.resolve(); // suspends here
  console.log("resumed"); // queued as a microtask
}

example();
console.log("synchronous");

// Output:
// synchronous
// resumed
```

---

### Q5: Why does `setTimeout(fn, 0)` not fire immediately?

Three reasons:
1. The minimum clamp: Node.js internally clamps `setTimeout` delays to at least 1ms.
2. The event loop must finish the current phase before reaching the timers phase.
3. All microtasks (nextTick + Promises) must drain before macrotasks run.

---

### Q6: What is the thread pool, and how does it relate to the event loop?

libuv uses a thread pool (default size: 4 threads, configurable via `UV_THREADPOOL_SIZE`) for operations that cannot be performed asynchronously at the OS level, including:

- File system operations (`fs.readFile`, etc.)
- `crypto` module operations
- `dns.lookup` (not `dns.resolve`)
- Some `zlib` operations

The thread pool runs **off the main thread**. When a thread pool task completes, its callback is placed in the poll queue for the event loop to pick up on the main thread.

```
  Main Thread        Thread Pool (4 threads)
  ┌──────────┐       ┌────────────────────┐
  │ Event    │──────►│ fs.readFile        │
  │ Loop     │       │ crypto.pbkdf2      │
  │          │◄──────│ (callbacks queued  │
  └──────────┘       │  when done)        │
                     └────────────────────┘
```

If all 4 thread pool slots are busy, subsequent I/O operations queue up and wait — this is why CPU-intensive crypto operations can degrade I/O throughput.

---

**Parent guide**: [Node.js Development - SKILL.md](../../SKILL.md)



===== SOURCE: 04-web-and-network/nodejs-development/docs/02-guides/async-patterns-complete.md =====

# Node.js Async Patterns — Complete Guide

## Supported Versions
- **Node.js**: 20.0.0+
- **TypeScript**: 5.0.0+

---

## Asynchronous Processing Fundamentals

Node.js runs on a single-threaded event loop and achieves high performance through non-blocking I/O.

### How the Event Loop Works

```
   ┌───────────────────────────┐
┌─>│           timers          │ setTimeout/setInterval
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │ I/O callbacks deferred from last loop
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │ internal use only
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │ retrieve & execute I/O events
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │ setImmediate
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──│      close callbacks      │ close events
   └───────────────────────────┘
```

### Microtasks vs Macrotasks

```typescript
// Microtasks (higher priority)
Promise.resolve().then(() => console.log('Promise'))
process.nextTick(() => console.log('nextTick'))
queueMicrotask(() => console.log('queueMicrotask'))

// Macrotasks (lower priority)
setTimeout(() => console.log('setTimeout'), 0)
setImmediate(() => console.log('setImmediate'))

// Execution order:
// 1. nextTick
// 2. Promise
// 3. queueMicrotask
// 4. setTimeout (or setImmediate, environment-dependent)
// 5. setImmediate (or setTimeout, environment-dependent)
```

---

## Promises

### Basic Promise Patterns

```typescript
function fetchUserData(userId: string): Promise<User> {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE id = ?', [userId], (err, result) => {
      if (err) {
        reject(new Error(`Database error: ${err.message}`))
        return
      }
      if (!result) {
        reject(new Error(`User ${userId} not found`))
        return
      }
      resolve(result as User)
    })
  })
}

fetchUserData('123')
  .then((user) => {
    console.log('User:', user)
    return fetchUserOrders(user.id)
  })
  .then((orders) => console.log('Orders:', orders))
  .catch((error) => console.error('Error:', error))
  .finally(() => console.log('Cleanup'))
```

### Parallel Execution Patterns

```typescript
// ❌ Sequential (slow)
async function getDataSequential() {
  const user = await fetchUser()      // 100ms
  const orders = await fetchOrders()  // 100ms
  const products = await fetchProducts() // 100ms
  return { user, orders, products }
  // Total: 300ms
}

// ✅ Parallel (fast)
async function getDataParallel() {
  const [user, orders, products] = await Promise.all([
    fetchUser(),
    fetchOrders(),
    fetchProducts(),
  ])
  return { user, orders, products }
  // Total: 100ms
}

// ✅ Promise.allSettled — continues even if some fail
async function getDataAllSettled() {
  const results = await Promise.allSettled([
    fetchUser(),
    fetchOrders(),
    fetchProducts(),
  ])

  const successful = results
    .filter((r) => r.status === 'fulfilled')
    .map((r) => (r as PromiseFulfilledResult<any>).value)

  const failed = results
    .filter((r) => r.status === 'rejected')
    .map((r) => (r as PromiseRejectedResult).reason)

  return { successful, failed }
}

// ✅ Promise.race — first to complete wins
async function getDataRace() {
  return await Promise.race([fetchFromPrimaryDB(), fetchFromBackupDB()])
}

// ✅ Promise.any — first to succeed wins
async function getDataAny() {
  try {
    return await Promise.any([fetchFromServer1(), fetchFromServer2(), fetchFromServer3()])
  } catch (error) {
    throw new Error('All servers failed')
  }
}
```

### Promise Timeout

```typescript
function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${timeoutMs}ms`)), timeoutMs)
    ),
  ])
}

try {
  const user = await withTimeout(fetchUser(), 5000)
  console.log(user)
} catch (error) {
  console.error('Timeout or error:', error)
}
```

### Retry Pattern

```typescript
async function retry<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries: number
    delay: number
    backoff?: number
    shouldRetry?: (error: Error) => boolean
  }
): Promise<T> {
  const { maxRetries, delay, backoff = 2, shouldRetry = () => true } = options
  let lastError: Error

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      if (attempt === maxRetries || !shouldRetry(lastError)) throw lastError
      const waitTime = delay * Math.pow(backoff, attempt)
      console.log(`Retry ${attempt + 1}/${maxRetries} after ${waitTime}ms`)
      await new Promise((resolve) => setTimeout(resolve, waitTime))
    }
  }

  throw lastError!
}

const data = await retry(() => fetchDataFromAPI(), {
  maxRetries: 3,
  delay: 1000,
  backoff: 2,
  shouldRetry: (error) =>
    error.message.includes('ECONNREFUSED') || error.message.includes('ETIMEDOUT'),
})
```

---

## Async/Await

### Error Handling Patterns

```typescript
// ❌ Error not caught — app crashes
async function badExample() {
  const user = await fetchUser()
  return user
}

// ✅ try-catch
async function goodExample1() {
  try {
    const user = await fetchUser()
    return user
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}

// ✅ Result wrapper (Go-style)
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E }

async function tryCatch<T>(promise: Promise<T>): Promise<Result<T>> {
  try {
    const data = await promise
    return { success: true, data }
  } catch (error) {
    return { success: false, error: error as Error }
  }
}

const result = await tryCatch(fetchUser())
if (result.success) {
  console.log('User:', result.data)
} else {
  console.error('Error:', result.error)
}
```

### Parallel Processing Optimization

```typescript
// ❌ await in for loop = sequential
async function processUsersSequential(userIds: string[]) {
  const users = []
  for (const id of userIds) {
    const user = await fetchUser(id)
    users.push(user)
  }
  return users
}

// ✅ Promise.all = parallel
async function processUsersParallel(userIds: string[]) {
  return await Promise.all(userIds.map((id) => fetchUser(id)))
}

// ✅ Batch processing with controlled concurrency
async function processUsersBatch(userIds: string[], batchSize: number = 10) {
  const results = []
  for (let i = 0; i < userIds.length; i += batchSize) {
    const batch = userIds.slice(i, i + batchSize)
    const batchResults = await Promise.all(batch.map((id) => fetchUser(id)))
    results.push(...batchResults)
  }
  return results
}
```

### Async Generators

```typescript
async function* fetchUsersGenerator(userIds: string[]): AsyncGenerator<User> {
  for (const id of userIds) {
    const user = await fetchUser(id)
    yield user
  }
}

for await (const user of fetchUsersGenerator(['1', '2', '3'])) {
  console.log('User:', user)
}

// Paginated async generator
async function* fetchAllProductsPaginated(pageSize: number = 100): AsyncGenerator<Product> {
  let page = 1
  let hasMore = true

  while (hasMore) {
    const response = await fetchProducts(page, pageSize)
    for (const product of response.data) yield product
    hasMore = response.hasMore
    page++
  }
}

for await (const product of fetchAllProductsPaginated()) {
  await processProduct(product)
}
```

---

## Event Emitters

### Basic EventEmitter

```typescript
import { EventEmitter } from 'events'

class OrderService extends EventEmitter {
  async createOrder(orderData: OrderData) {
    this.emit('order:creating', orderData)

    try {
      const order = await this.db.createOrder(orderData)
      this.emit('order:created', order)

      this.sendNotifications(order).catch((err) => {
        this.emit('order:notification-failed', { order, error: err })
      })

      return order
    } catch (error) {
      this.emit('order:creation-failed', { orderData, error })
      throw error
    }
  }

  private async sendNotifications(order: Order) {
    await Promise.all([
      this.emailService.send(order.userEmail, 'Order Confirmation'),
      this.smsService.send(order.userPhone, 'Order placed'),
    ])
  }
}

const orderService = new OrderService()

orderService.on('order:created', (order) => {
  console.log('Order created:', order.id)
})

orderService.on('order:creation-failed', ({ orderData, error }) => {
  console.error('Order creation failed:', error)
})
```

### Type-Safe EventEmitter

```typescript
interface OrderEvents {
  'order:created': (order: Order) => void
  'order:updated': (order: Order) => void
  'order:deleted': (orderId: string) => void
  'order:failed': (error: Error) => void
}

class TypedEventEmitter<Events extends Record<string, (...args: any[]) => void>> {
  private emitter = new EventEmitter()

  on<K extends keyof Events>(event: K, listener: Events[K]): this {
    this.emitter.on(event as string, listener)
    return this
  }

  emit<K extends keyof Events>(event: K, ...args: Parameters<Events[K]>): boolean {
    return this.emitter.emit(event as string, ...args)
  }

  off<K extends keyof Events>(event: K, listener: Events[K]): this {
    this.emitter.off(event as string, listener)
    return this
  }

  once<K extends keyof Events>(event: K, listener: Events[K]): this {
    this.emitter.once(event as string, listener)
    return this
  }
}

class OrderEventEmitter extends TypedEventEmitter<OrderEvents> {}

const emitter = new OrderEventEmitter()

// ✅ Fully type-checked
emitter.on('order:created', (order) => {
  console.log(order.id)
})
```

---

## Streams

### Readable Streams

```typescript
import { Readable } from 'stream'
import * as fs from 'fs'

const readStream = fs.createReadStream('large-file.txt', {
  highWaterMark: 64 * 1024,
  encoding: 'utf8',
})

readStream.on('data', (chunk) => console.log('Received chunk:', chunk.length))
readStream.on('end', () => console.log('Stream ended'))
readStream.on('error', (error) => console.error('Stream error:', error))

// Custom Readable stream
class NumberStream extends Readable {
  private current = 1

  constructor(private max: number) {
    super({ objectMode: true })
  }

  _read() {
    if (this.current <= this.max) {
      this.push({ value: this.current++ })
    } else {
      this.push(null)
    }
  }
}
```

### Writable Streams

```typescript
import { Writable } from 'stream'

const writeStream = fs.createWriteStream('output.txt')
writeStream.write('Line 1\n')
writeStream.write('Line 2\n')
writeStream.end('Final line\n')
writeStream.on('finish', () => console.log('Write complete'))

// Custom Writable — writes to database in batches
class DatabaseWriteStream extends Writable {
  private buffer: any[] = []
  private batchSize = 100

  constructor(private db: any) {
    super({ objectMode: true })
  }

  async _write(chunk: any, encoding: string, callback: (error?: Error | null) => void) {
    this.buffer.push(chunk)
    if (this.buffer.length >= this.batchSize) await this.flush()
    callback()
  }

  async _final(callback: (error?: Error | null) => void) {
    await this.flush()
    callback()
  }

  private async flush() {
    if (this.buffer.length === 0) return
    await this.db.insertMany(this.buffer)
    this.buffer = []
  }
}
```

### Transform Streams and Pipeline

```typescript
import { Transform, pipeline } from 'stream'
import { pipeline as pipelinePromise } from 'stream/promises'

class UpperCaseStream extends Transform {
  _transform(chunk: Buffer, encoding: string, callback: Function) {
    this.push(chunk.toString().toUpperCase())
    callback()
  }
}

// ✅ Use pipeline for automatic backpressure and error handling
async function processLargeFile() {
  await pipelinePromise(
    fs.createReadStream('input.txt'),
    new UpperCaseStream(),
    fs.createWriteStream('output.txt')
  )
  console.log('Processing complete')
}
```

---

## Worker Threads

### Basic Worker Threads

```typescript
// main.ts
import { Worker } from 'worker_threads'

function runWorker(workerData: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', { workerData })
    worker.on('message', resolve)
    worker.on('error', reject)
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`))
    })
  })
}

async function calculateFibonacci(n: number) {
  return await runWorker({ n })
}

const result = await calculateFibonacci(40)
console.log('Fibonacci(40):', result)
```

```typescript
// worker.ts
import { parentPort, workerData } from 'worker_threads'

function fibonacci(n: number): number {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

parentPort?.postMessage(fibonacci(workerData.n))
```

---

## Cluster Module

### Multi-Process Setup

```typescript
import cluster from 'cluster'
import * as os from 'os'
import express from 'express'

const numCPUs = os.cpus().length

if (cluster.isPrimary) {
  console.log(`Primary process ${process.pid} is running`)

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`)
    cluster.fork()
  })
} else {
  const app = express()

  app.get('/', (req, res) => {
    res.send(`Hello from worker ${process.pid}`)
  })

  app.listen(3000, () => {
    console.log(`Worker ${process.pid} started on port 3000`)
  })
}
```

---

## Common Pitfalls and Fixes

### 1. Unhandled Promise Rejection

```typescript
// ❌ No error handling
async function badCode() {
  const data = await fetchData()
}

// ✅ try-catch
async function goodCode() {
  try {
    const data = await fetchData()
  } catch (error) {
    console.error('Error:', error)
  }
}

// ✅ Global handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})
```

### 2. EventEmitter Memory Leak

```typescript
// ❌ Listeners accumulate
function badCode() {
  setInterval(() => {
    emitter.on('data', handleData)
  }, 1000)
}

// ✅ Register once
emitter.once('data', handleData)

// ✅ Remove when done
const handleData = (data: any) => console.log(data)
emitter.on('data', handleData)
const cleanup = () => emitter.off('data', handleData)
```

### 3. Promise.all Fails on First Error

```typescript
// ❌ One failure loses all results
const results = await Promise.all([fetchUser1(), fetchUser2(), fetchUser3()])

// ✅ Use Promise.allSettled
const results = await Promise.allSettled([fetchUser1(), fetchUser2(), fetchUser3()])

results.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    console.log(`User ${index}:`, result.value)
  } else {
    console.error(`User ${index} failed:`, result.reason)
  }
})
```

### 4. await in forEach

```typescript
// ❌ await doesn't work as expected in forEach
userIds.forEach(async (id) => {
  await processUser(id)
})

// ✅ for...of (sequential)
for (const id of userIds) {
  await processUser(id)
}

// ✅ Promise.all (parallel)
await Promise.all(userIds.map((id) => processUser(id)))
```

### 5. Event Loop Blocking

```typescript
// ❌ CPU-heavy computation blocks the event loop
app.get('/fibonacci/:n', (req, res) => {
  const result = fibonacci(parseInt(req.params.n))
  res.json({ result })
})

// ✅ Offload to Worker Thread
app.get('/fibonacci/:n', async (req, res) => {
  const result = await runWorker({ n: parseInt(req.params.n) })
  res.json({ result })
})
```

### 6. Missing return in Promise Chain

```typescript
// ❌ Forgot to return
fetchUser()
  .then((user) => {
    fetchOrders(user.id)  // no return
  })
  .then((orders) => {
    console.log(orders)  // undefined
  })

// ✅ Return the next Promise
fetchUser()
  .then((user) => {
    return fetchOrders(user.id)
  })
  .then((orders) => {
    console.log(orders)
  })
```

### 7. Request Timeout

```typescript
// ❌ No timeout — hangs forever
const response = await fetch('https://slow-api.example.com/data')

// ✅ AbortController timeout
const controller = new AbortController()
const timeout = setTimeout(() => controller.abort(), 5000)

try {
  const response = await fetch('https://slow-api.example.com/data', {
    signal: controller.signal,
  })
  return await response.json()
} catch (error) {
  if ((error as Error).name === 'AbortError') throw new Error('Request timeout')
  throw error
} finally {
  clearTimeout(timeout)
}
```

---

## Performance Results

| Scenario | Before | After | Improvement |
|----------|--------|-------|-------------|
| Fetch 1000 users | 45s | 2.1s | -95% |
| Fibonacci(45) blocking | 18s block | 0ms block | -100% |
| CSV processing (1M rows) memory | 1.2GB | 45MB | -96% |
| Request throughput (4-core cluster) | 850 req/s | 3,200 req/s | +276% |

---

## Checklist

### Promise / Async-Await
- [ ] All Promises have error handling
- [ ] Use Promise.all for parallelizable operations
- [ ] Set appropriate timeouts
- [ ] Global unhandledRejection handler is configured
- [ ] Use for...of or Promise.all instead of forEach

### Event Emitters
- [ ] Remove listeners when no longer needed
- [ ] Use TypedEventEmitter for type safety
- [ ] Always handle error events

### Streams
- [ ] Error handlers on all streams
- [ ] Use pipeline for automatic backpressure management
- [ ] Use streams for large data processing

### Worker Threads
- [ ] CPU-intensive work runs in Worker Threads
- [ ] Use a Worker Pool for efficient resource management
- [ ] Only send serializable data to workers

### Cluster
- [ ] Consider clustering in production
- [ ] Implement graceful shutdown
- [ ] Monitor workers and auto-restart on failure



===== SOURCE: 04-web-and-network/nodejs-development/docs/02-guides/express-nestjs-complete.md =====

# Express & NestJS — Complete Guide

## Supported Versions
- **Node.js**: 20.0.0+
- **Express**: 4.18.0+
- **NestJS**: 10.0.0+
- **TypeScript**: 5.0.0+
- **Fastify**: 4.25.0+

---

## Express.js — Lightweight and Flexible Web Framework

### Basic Architecture

Express is a minimal web framework centered around middleware composition.

```typescript
// src/app.ts
import express, { Express, Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import { errorHandler } from './middleware/error-handler'
import { router } from './routes'

export function createApp(): Express {
  const app = express()

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }))

  // CORS
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }))

  // Parsers
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ extended: true, limit: '10mb' }))

  // Compression
  app.use(compression())

  // Logging
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

  // Health check
  app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() })
  })

  // Router
  app.use('/api/v1', router)

  // Error handler (must be last)
  app.use(errorHandler)

  return app
}
```

### Layered Architecture

**Directory structure:**

```
src/
├── controllers/      # Request handling & response
├── services/         # Business logic
├── repositories/     # Data access layer
├── models/           # Data models & schemas
├── middleware/       # Custom middleware
├── routes/           # Route definitions
├── validators/       # Input validation
├── utils/            # Utilities
└── types/            # TypeScript type definitions
```

**Controller layer:**

```typescript
// src/controllers/product.controller.ts
import { Request, Response, NextFunction } from 'express'
import { ProductService } from '../services/product.service'

export class ProductController {
  constructor(private productService: ProductService) {}

  async getProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { page = 1, limit = 20, category, sortBy = 'createdAt', order = 'desc' } = req.query

      const result = await this.productService.findAll({
        page: Number(page),
        limit: Number(limit),
        category: category as string,
        sortBy: sortBy as string,
        order: order as string,
      })

      res.json({
        success: true,
        data: result.products,
        meta: {
          page: result.page,
          limit: result.limit,
          total: result.total,
          totalPages: Math.ceil(result.total / result.limit),
        },
      })
    } catch (error) {
      next(error)
    }
  }

  async getProductById(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await this.productService.findById(req.params.id)
      res.json({ success: true, data: product })
    } catch (error) {
      next(error)
    }
  }

  async createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await this.productService.create(req.body)
      res.status(201).json({ success: true, data: product })
    } catch (error) {
      next(error)
    }
  }

  async updateProduct(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
      const product = await this.productService.update(req.params.id, req.body)
      res.json({ success: true, data: product })
    } catch (error) {
      next(error)
    }
  }

  async deleteProduct(req: Request<{ id: string }>, res: Response, next: NextFunction): Promise<void> {
    try {
      await this.productService.delete(req.params.id)
      res.status(204).send()
    } catch (error) {
      next(error)
    }
  }
}
```

**Service layer:**

```typescript
// src/services/product.service.ts
import { ProductRepository } from '../repositories/product.repository'
import { CacheService } from './cache.service'

export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private cacheService: CacheService
  ) {}

  async findAll(query: ProductQuery) {
    const cacheKey = `products:${JSON.stringify(query)}`

    // Check cache
    const cached = await this.cacheService.get(cacheKey)
    if (cached) return cached

    const result = await this.productRepository.findAll(query)

    // Cache for 5 minutes
    await this.cacheService.set(cacheKey, result, 300)

    return result
  }

  async findById(id: string) {
    const product = await this.productRepository.findById(id)
    if (!product) throw new NotFoundError(`Product ${id} not found`)
    return product
  }

  async create(dto: CreateProductDto) {
    if (dto.price <= 0) throw new ValidationError('Price must be positive')
    return await this.productRepository.create(dto)
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.findById(id)  // Verify existence
    return await this.productRepository.update(id, dto)
  }

  async delete(id: string) {
    await this.findById(id)
    await this.productRepository.delete(id)
  }
}
```

### Middleware Patterns

```typescript
// Rate limiting
import rateLimit from 'express-rate-limit'

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api/', apiLimiter)

// Auth middleware
import jwt from 'jsonwebtoken'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header required' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}

// Error handler middleware
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err)

  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message, details: err.details })
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({ error: err.message })
  }

  if (err instanceof UnauthorizedError) {
    return res.status(401).json({ error: err.message })
  }

  res.status(500).json({ error: 'Internal Server Error' })
}
```

### Router Structure

```typescript
// src/routes/index.ts
import { Router } from 'express'
import { productRouter } from './product.routes'
import { userRouter } from './user.routes'
import { orderRouter } from './order.routes'

export const router = Router()

router.use('/products', productRouter)
router.use('/users', userRouter)
router.use('/orders', orderRouter)
```

```typescript
// src/routes/product.routes.ts
import { Router } from 'express'
import { ProductController } from '../controllers/product.controller'
import { authMiddleware } from '../middleware/auth'
import { validateBody } from '../middleware/validate'
import { CreateProductDto } from '../types/product.dto'

const controller = new ProductController(productService)
export const productRouter = Router()

productRouter.get('/', controller.getProducts.bind(controller))
productRouter.get('/:id', controller.getProductById.bind(controller))
productRouter.post('/', authMiddleware, validateBody(CreateProductDto), controller.createProduct.bind(controller))
productRouter.put('/:id', authMiddleware, controller.updateProduct.bind(controller))
productRouter.delete('/:id', authMiddleware, controller.deleteProduct.bind(controller))
```

---

## NestJS — Enterprise-Grade Framework

### Core Architecture

NestJS uses decorators and dependency injection for a structured, testable codebase.

```typescript
// src/products/products.module.ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { Product } from './entities/product.entity'
import { CacheModule } from '../cache/cache.module'

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CacheModule],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
```

```typescript
// src/products/products.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, HttpCode } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger'
import { ProductsService } from './products.service'
import { CreateProductDto, UpdateProductDto } from './dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  async findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAll(query)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return this.productsService.remove(id)
  }
}
```

```typescript
// src/products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from './entities/product.entity'
import { CacheService } from '../cache/cache.service'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly cacheService: CacheService
  ) {}

  async findAll(query: ProductQueryDto) {
    const cacheKey = `products:${JSON.stringify(query)}`
    const cached = await this.cacheService.get<Product[]>(cacheKey)
    if (cached) return cached

    const [products, total] = await this.productRepository.findAndCount({
      where: query.category ? { category: query.category } : {},
      take: query.limit ?? 20,
      skip: ((query.page ?? 1) - 1) * (query.limit ?? 20),
      order: { [query.sortBy ?? 'createdAt']: query.order ?? 'DESC' },
    })

    const result = { products, total, page: query.page, limit: query.limit }
    await this.cacheService.set(cacheKey, result, 300)
    return result
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({ where: { id } })
    if (!product) throw new NotFoundException(`Product ${id} not found`)
    return product
  }

  async create(dto: CreateProductDto) {
    const product = this.productRepository.create(dto)
    return this.productRepository.save(product)
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.findOne(id)
    await this.productRepository.update(id, dto)
    return this.findOne(id)
  }

  async remove(id: string) {
    await this.findOne(id)
    await this.productRepository.delete(id)
  }
}
```

### Pipes, Guards, and Interceptors

```typescript
// Validation pipe (global)
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: { enableImplicitConversion: true },
}))

// JWT Auth Guard
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }
}

// Logging interceptor
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const start = Date.now()

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start
        console.log(`${request.method} ${request.url} - ${duration}ms`)
      })
    )
  }
}
```

---

## Express vs NestJS Comparison

| Feature | Express | NestJS |
|---------|---------|--------|
| Learning curve | Low | Moderate |
| Structure | Flexible | Opinionated |
| TypeScript support | Add-on | Built-in |
| Dependency injection | Manual | Built-in |
| Testing | Manual setup | Built-in utilities |
| Swagger/OpenAPI | Manual | Auto-generated |
| Best for | Small-medium APIs | Large enterprise apps |

### When to Choose Express

- Small to medium projects
- Maximum flexibility needed
- Minimal boilerplate
- Team already knows Express

### When to Choose NestJS

- Large, complex applications
- Need strong structure and conventions
- Built-in DI, testing, validation
- Auto-generated OpenAPI docs are valuable



===== SOURCE: 04-web-and-network/nodejs-development/docs/02-guides/performance-complete.md =====

# Node.js Performance Optimization — Complete Guide

## Supported Versions
- **Node.js**: 20.0.0+
- **Express**: 4.18.0+
- **TypeScript**: 5.0.0+

---

## Profiling and Measurement

### Node.js Built-in Profiler

```typescript
import { Session } from 'inspector'
import * as fs from 'fs'

function startProfiling(): Session {
  const session = new Session()
  session.connect()
  session.post('Profiler.enable', () => {
    session.post('Profiler.start')
  })
  return session
}

function stopProfiling(session: Session, outputPath: string) {
  session.post('Profiler.stop', (err, { profile }) => {
    if (err) {
      console.error('Profiling error:', err)
      return
    }
    fs.writeFileSync(outputPath, JSON.stringify(profile))
    console.log(`Profile saved to ${outputPath}`)
    session.disconnect()
  })
}

const session = startProfiling()
await performHeavyOperation()
stopProfiling(session, 'profile.cpuprofile')
// Open in Chrome DevTools for analysis
```

### performance_hooks API

```typescript
import { performance, PerformanceObserver } from 'perf_hooks'

const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`)
  })
})
obs.observe({ entryTypes: ['measure', 'function'] })

// Measure execution time
performance.mark('start-db-query')
await database.query('SELECT * FROM users')
performance.mark('end-db-query')
performance.measure('db-query', 'start-db-query', 'end-db-query')

// Utility wrapper
async function measurePerformance<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const start = performance.now()
  try {
    const result = await fn()
    console.log(`${name}: ${(performance.now() - start).toFixed(2)}ms`)
    return result
  } catch (error) {
    console.error(`${name} failed after ${(performance.now() - start).toFixed(2)}ms:`, error)
    throw error
  }
}

const users = await measurePerformance('fetchUsers', () => fetchAllUsers())
```

### APM Integration

```typescript
// Sentry Performance Monitoring
import * as Sentry from '@sentry/node'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,  // Trace 10% of requests
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
  ],
})

app.use(Sentry.Handlers.requestHandler())
app.use(Sentry.Handlers.tracingHandler())

app.get('/api/users', async (req, res) => {
  const transaction = Sentry.getCurrentHub().getScope()?.getTransaction()
  const span = transaction?.startChild({
    op: 'database.query',
    description: 'Fetch users from database',
  })

  const users = await db.user.findMany()
  span?.finish()
  res.json(users)
})

app.use(Sentry.Handlers.errorHandler())
```

---

## Memory Management

### Monitoring Memory Usage

```typescript
function logMemoryUsage() {
  const used = process.memoryUsage()
  console.log('Memory Usage:')
  console.log(`  RSS: ${(used.rss / 1024 / 1024).toFixed(2)} MB`)
  console.log(`  Heap Total: ${(used.heapTotal / 1024 / 1024).toFixed(2)} MB`)
  console.log(`  Heap Used: ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB`)
  console.log(`  External: ${(used.external / 1024 / 1024).toFixed(2)} MB`)
}

setInterval(logMemoryUsage, 60000)

// Heap snapshot on large growth
let lastHeapUsed = 0
setInterval(() => {
  const { heapUsed } = process.memoryUsage()
  if (heapUsed > lastHeapUsed * 1.5) {
    const v8 = require('v8')
    v8.writeHeapSnapshot(`heap-${Date.now()}.heapsnapshot`)
  }
  lastHeapUsed = heapUsed
}, 30000)
```

### Common Memory Leak Patterns

```typescript
// ❌ Unbounded cache growth
const cache: Record<string, any> = {}
app.get('/data/:id', async (req, res) => {
  const data = await fetchData(req.params.id)
  cache[req.params.id] = data  // Grows forever
  res.json(data)
})

// ✅ LRU cache with limits
import LRU from 'lru-cache'

const cache = new LRU<string, any>({
  max: 500,
  ttl: 1000 * 60 * 5,  // 5 minutes TTL
})

app.get('/data/:id', async (req, res) => {
  let data = cache.get(req.params.id)
  if (!data) {
    data = await fetchData(req.params.id)
    cache.set(req.params.id, data)
  }
  res.json(data)
})

// ❌ Event listeners not removed
class DataService {
  private emitter = new EventEmitter()
  subscribe(handler: (data: any) => void) {
    this.emitter.on('data', handler)  // Never removed
  }
}

// ✅ Return cleanup function
class DataService {
  private emitter = new EventEmitter()
  subscribe(handler: (data: any) => void): () => void {
    this.emitter.on('data', handler)
    return () => this.emitter.off('data', handler)
  }
}

const unsubscribe = dataService.subscribe(handleData)
// ... later ...
unsubscribe()

// ❌ Loading entire dataset into memory
async function processAllUsers() {
  const users = await db.user.findMany()  // 1M rows in memory
  for (const user of users) {
    await processUser(user)
  }
}

// ✅ Stream processing
async function* fetchUsersStream(batchSize: number = 1000) {
  let offset = 0
  while (true) {
    const users = await db.user.findMany({ skip: offset, take: batchSize })
    if (users.length === 0) break
    yield* users
    offset += batchSize
  }
}

async function processAllUsers() {
  for await (const user of fetchUsersStream()) {
    await processUser(user)
  }
}
```

### V8 Heap Configuration

```json
// package.json
{
  "scripts": {
    "start": "node --max-old-space-size=4096 dist/server.js"
  }
}
```

---

## Database Query Optimization

### Solving the N+1 Problem

```typescript
// ❌ N+1 — one query per user
async function getUsersWithOrders() {
  const users = await prisma.user.findMany()
  for (const user of users) {
    user.orders = await prisma.order.findMany({ where: { userId: user.id } })
  }
  return users
}

// ✅ Single query with include
async function getUsersWithOrders() {
  return prisma.user.findMany({
    include: { orders: true },
  })
}

// ✅ Select only needed fields
async function getUsersOptimized() {
  return prisma.user.findMany({
    select: { id: true, name: true, email: true },
    // passwordHash excluded
  })
}

// ✅ Paginate for memory efficiency
async function getUsersPaginated(page: number, pageSize: number) {
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.user.count(),
  ])
  return { users, total, page, pageSize, totalPages: Math.ceil(total / pageSize) }
}
```

### Database Indexes

```prisma
// schema.prisma
model Product {
  id        String   @id @default(uuid())
  name      String
  category  String
  price     Float
  createdAt DateTime @default(now())

  @@index([category])
  @@index([price])
  @@index([createdAt])
  @@index([category, price])  // Composite index
}
```

### Connection Pooling

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Connection pool settings via DATABASE_URL:
  // ?connection_limit=10&pool_timeout=20
})

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
```

---

## Caching Strategies

### Redis Cache

```typescript
import { createClient } from 'redis'

const redis = createClient({ url: process.env.REDIS_URL })
await redis.connect()

class CacheService {
  async get<T>(key: string): Promise<T | null> {
    const value = await redis.get(key)
    if (!value) return null
    return JSON.parse(value) as T
  }

  async set(key: string, value: any, ttlSeconds: number = 300): Promise<void> {
    await redis.setEx(key, ttlSeconds, JSON.stringify(value))
  }

  async del(key: string): Promise<void> {
    await redis.del(key)
  }

  async invalidatePattern(pattern: string): Promise<void> {
    const keys = await redis.keys(pattern)
    if (keys.length > 0) await redis.del(keys)
  }
}

// Cache-aside pattern
async function getProduct(id: string) {
  const cacheKey = `product:${id}`

  const cached = await cacheService.get<Product>(cacheKey)
  if (cached) return cached

  const product = await db.findProduct(id)
  await cacheService.set(cacheKey, product, 3600)  // 1 hour TTL

  return product
}

// Invalidate on update
async function updateProduct(id: string, data: Partial<Product>) {
  const product = await db.updateProduct(id, data)
  await cacheService.del(`product:${id}`)
  await cacheService.invalidatePattern('products:*')
  return product
}
```

### HTTP Response Caching

```typescript
import { Request, Response, NextFunction } from 'express'

function cacheControl(maxAge: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    res.set('Cache-Control', `public, max-age=${maxAge}`)
    next()
  }
}

// Static assets — cache 1 year
app.use('/static', express.static('public', { maxAge: '1y' }))

// API responses — cache 5 minutes
app.get('/api/categories', cacheControl(300), async (req, res) => {
  const categories = await db.category.findMany()
  res.json(categories)
})
```

---

## Response Optimization

### Compression

```typescript
import compression from 'compression'

app.use(compression({
  level: 6,
  threshold: 1024,  // Only compress responses > 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false
    return compression.filter(req, res)
  },
}))
```

### Streaming Responses

```typescript
import { pipeline } from 'stream/promises'

// Stream large file downloads
app.get('/download/:filename', async (req, res) => {
  const filePath = path.join(__dirname, 'files', req.params.filename)

  res.set({
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': `attachment; filename="${req.params.filename}"`,
  })

  const readStream = fs.createReadStream(filePath)
  await pipeline(readStream, res)
})

// Stream JSON array response
app.get('/api/export/users', async (req, res) => {
  res.set('Content-Type', 'application/json')
  res.write('[')

  let first = true
  for await (const user of fetchUsersStream()) {
    if (!first) res.write(',')
    res.write(JSON.stringify(user))
    first = false
  }

  res.write(']')
  res.end()
})
```

---

## Common Performance Issues

| Issue | Symptom | Fix |
|-------|---------|-----|
| N+1 queries | Slow DB responses | Use `include` / `join` |
| No caching | High DB load | Add Redis cache |
| No pagination | High memory usage | Paginate all list endpoints |
| Missing indexes | Slow queries | Add indexes on filter/sort fields |
| Synchronous operations | CPU blocking | Use async/Worker Threads |
| Uncompressed responses | High bandwidth | Enable gzip compression |
| Unbounded cache | Memory leak | Use LRU with TTL |
| No connection pool | DB connection errors | Configure pool size |

---

## Checklist

### Measurement
- [ ] Profiling in place for CPU bottlenecks
- [ ] Memory usage monitored
- [ ] Slow query logging enabled
- [ ] APM integrated (Sentry, Datadog, New Relic)

### Memory
- [ ] LRU cache with max size and TTL
- [ ] Event listeners removed when done
- [ ] Large datasets processed with streams
- [ ] Heap size configured appropriately

### Database
- [ ] N+1 queries eliminated
- [ ] Indexes on filtered/sorted columns
- [ ] Select only needed columns
- [ ] Connection pooling configured
- [ ] Pagination on all list endpoints

### Caching
- [ ] Frequently read data cached in Redis
- [ ] Cache invalidated on write
- [ ] HTTP Cache-Control headers set
- [ ] Static assets cached long-term

### Response
- [ ] Gzip compression enabled
- [ ] Large files streamed
- [ ] Response size minimized



===== SOURCE: 04-web-and-network/nodejs-development/docs/03-frameworks/01-express-fundamentals.md =====

# Express Fundamentals — Complete Guide

## Table of Contents

1. [What is Express?](#what-is-express)
2. [Installing and Basic Setup](#installing-and-basic-setup)
3. [Routing Basics](#routing-basics)
4. [Request and Response Objects](#request-and-response-objects)
5. [Serving Static Files](#serving-static-files)
6. [FAQ](#faq)

---

## What is Express?

Express is a minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications. It is the most popular Node.js framework and the foundation of many production-grade systems.

```
┌─────────────────────────────────────────────┐
│              Node.js Runtime                │
│  ┌───────────────────────────────────────┐  │
│  │         Express Framework             │  │
│  │  ┌──────────┐  ┌──────────────────┐  │  │
│  │  │  Router  │  │   Middleware      │  │  │
│  │  └──────────┘  └──────────────────┘  │  │
│  │  ┌──────────┐  ┌──────────────────┐  │  │
│  │  │   Req    │  │      Res         │  │  │
│  │  └──────────┘  └──────────────────┘  │  │
│  └───────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Why Use Express?

- **Minimal footprint** — No opinions on database, template engine, or structure
- **Middleware ecosystem** — Thousands of compatible npm packages
- **Fast routing** — Clean, chainable route definitions
- **Large community** — Extensive documentation and Stack Overflow answers
- **Proven in production** — Used by major companies worldwide

---

## Installing and Basic Setup

### Prerequisites

- Node.js 18 or later installed
- npm or yarn available in your terminal

### Initialize a Project

```bash
mkdir my-express-app
cd my-express-app
npm init -y
npm install express
```

### Minimal Server

```javascript
// server.js
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

Run it:

```bash
node server.js
# → Server running on http://localhost:3000
```

### Project Structure (Recommended)

```
my-express-app/
├── server.js          ← entry point
├── routes/
│   ├── users.js
│   └── products.js
├── middleware/
│   └── auth.js
├── controllers/
│   └── userController.js
├── package.json
└── .env
```

### Using nodemon for Development

```bash
npm install --save-dev nodemon
```

Add to `package.json`:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

```bash
npm run dev
# Auto-restarts when files change
```

---

## Routing Basics

Routing maps HTTP methods and URL paths to handler functions.

### Syntax

```javascript
app.METHOD(PATH, HANDLER);
//  ^^^^^^  ^^^^  ^^^^^^^
//  HTTP    URL   function(req, res)
```

### GET — Read Data

```javascript
// List all users
app.get('/users', (req, res) => {
  res.json({ users: [] });
});

// Get a single user by ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id, name: 'Alice' });
});
```

### POST — Create Data

```javascript
app.use(express.json()); // Must parse JSON body first

app.post('/users', (req, res) => {
  const { name, email } = req.body;
  // Save to database ...
  res.status(201).json({ id: 1, name, email });
});
```

### PUT — Replace Data

```javascript
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  // Replace user in database ...
  res.json({ id, name, email });
});
```

### PATCH — Update Partial Data

```javascript
app.patch('/users/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  // Apply partial update ...
  res.json({ id, ...updates });
});
```

### DELETE — Remove Data

```javascript
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  // Delete from database ...
  res.status(204).send(); // No content
});
```

### Route Parameters and Query Strings

```javascript
// Route parameter: /products/42
app.get('/products/:id', (req, res) => {
  console.log(req.params.id); // "42"
});

// Query string: /search?q=node&limit=10
app.get('/search', (req, res) => {
  console.log(req.query.q);     // "node"
  console.log(req.query.limit); // "10"
});
```

### Express Router — Modular Routes

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ users: [] }));
router.get('/:id', (req, res) => res.json({ id: req.params.id }));
router.post('/', (req, res) => res.status(201).json(req.body));
router.delete('/:id', (req, res) => res.status(204).send());

module.exports = router;
```

```javascript
// server.js
const usersRouter = require('./routes/users');

app.use('/users', usersRouter);
// GET  /users      → router.get('/')
// GET  /users/42   → router.get('/:id')
// POST /users      → router.post('/')
```

### Route Chaining

```javascript
app.route('/books')
  .get((req, res) => res.json({ books: [] }))
  .post((req, res) => res.status(201).json(req.body));

app.route('/books/:id')
  .get((req, res) => res.json({ id: req.params.id }))
  .put((req, res) => res.json(req.body))
  .delete((req, res) => res.status(204).send());
```

---

## Request and Response Objects

### Request Object (`req`)

```javascript
app.post('/example', (req, res) => {
  // URL parameters (/example/:id)
  console.log(req.params);       // { id: '42' }

  // Query string (?page=2&limit=20)
  console.log(req.query);        // { page: '2', limit: '20' }

  // Request body (JSON or form data)
  console.log(req.body);         // { name: 'Alice', email: '...' }

  // HTTP headers
  console.log(req.headers);      // { 'content-type': 'application/json', ... }
  console.log(req.get('Authorization')); // 'Bearer token123'

  // Request metadata
  console.log(req.method);       // 'POST'
  console.log(req.path);         // '/example'
  console.log(req.url);          // '/example?page=2'
  console.log(req.ip);           // '127.0.0.1'
  console.log(req.protocol);     // 'http'
  console.log(req.secure);       // false (true if HTTPS)
});
```

### Response Object (`res`)

```javascript
app.get('/response-demo', (req, res) => {
  // Send plain text
  res.send('Hello World');

  // Send JSON
  res.json({ message: 'Success', data: [] });

  // Set status code then send
  res.status(201).json({ id: 1 });
  res.status(404).json({ error: 'Not found' });
  res.status(204).send(); // No content

  // Set response headers
  res.set('X-Custom-Header', 'value');
  res.set({ 'Cache-Control': 'no-store', 'X-Powered-By': 'Express' });

  // Redirect
  res.redirect('/new-path');
  res.redirect(301, '/permanent-new-path');

  // Send a file
  res.sendFile('/absolute/path/to/file.pdf');

  // Download a file
  res.download('/path/to/report.pdf', 'report.pdf');

  // Render a template (requires view engine setup)
  res.render('index', { title: 'Home', user: req.user });
});
```

### Content Type Helpers

```javascript
// Express sets Content-Type automatically:
res.send('text');           // text/html
res.json({ key: 'val' });   // application/json
res.sendFile('image.png');  // image/png (detected)

// Override manually:
res.type('application/xml').send('<root/>');
```

---

## Serving Static Files

Use `express.static` to serve HTML, CSS, JavaScript, images, and other assets.

### Basic Setup

```javascript
const path = require('path');

// Serve files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
```

```
public/
├── index.html        → accessible at /index.html (or /)
├── css/
│   └── style.css     → accessible at /css/style.css
├── js/
│   └── app.js        → accessible at /js/app.js
└── images/
    └── logo.png      → accessible at /images/logo.png
```

### With a Virtual Path Prefix

```javascript
// Files in "public" served under /static/...
app.use('/static', express.static(path.join(__dirname, 'public')));
// /static/css/style.css → public/css/style.css
```

### Multiple Static Directories

```javascript
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
// Express searches directories in order
```

### Cache Control

```javascript
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',        // Cache for 1 day
  etag: true,          // Enable ETags
  lastModified: true,  // Enable Last-Modified headers
}));
```

---

## FAQ

**Q: Do I need Express to build a web server in Node.js?**
No. Node.js has a built-in `http` module. Express builds on top of it to reduce boilerplate and provide routing, middleware, and helpers.

**Q: What is the difference between `app.use` and `app.get`?**
`app.use` matches any HTTP method and optionally any path prefix. `app.get` matches only GET requests to an exact path. Use `app.use` for middleware and `app.get`/`app.post`/etc. for route handlers.

**Q: How do I handle 404 errors in Express?**
Add a catch-all route at the end of your middleware chain:
```javascript
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
```

**Q: Can I use ES modules (`import`/`export`) with Express?**
Yes. Set `"type": "module"` in `package.json` and use `.js` files with `import express from 'express'`. Note that `__dirname` and `__filename` are not available in ES modules — use `import.meta.url` with `new URL`.

**Q: What version of Express should I use?**
Express 5 (stable as of 2024) is recommended for new projects. It adds native async/await error propagation and other improvements.

---

**Parent guide**: [Node.js Development - SKILL.md](../../SKILL.md)



===== SOURCE: 04-web-and-network/nodejs-development/docs/03-frameworks/02-middleware.md =====

# Middleware in Express — Complete Guide

## Table of Contents

1. [What is Middleware?](#what-is-middleware)
2. [Built-in Middleware](#built-in-middleware)
3. [Third-party Middleware](#third-party-middleware)
4. [Writing Custom Middleware](#writing-custom-middleware)
5. [Middleware Execution Order](#middleware-execution-order)
6. [Error Handling Middleware](#error-handling-middleware)
7. [FAQ](#faq)

---

## What is Middleware?

Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the `next` function in the application's request-response cycle.

```
HTTP Request
     │
     ▼
┌────────────┐
│ Middleware │  → can read/modify req and res
│     1      │  → can end the cycle (res.send)
└─────┬──────┘  → or pass control (next())
      │ next()
      ▼
┌────────────┐
│ Middleware │
│     2      │
└─────┬──────┘
      │ next()
      ▼
┌────────────┐
│   Route    │
│  Handler   │  → sends final response
└────────────┘
     │
     ▼
HTTP Response
```

### What Middleware Can Do

- Execute any code
- Make changes to the request and response objects
- End the request-response cycle
- Call the next middleware in the stack

### Middleware Signature

```javascript
// Regular middleware
function myMiddleware(req, res, next) {
  // do something
  next(); // pass control to the next middleware
}

// Error-handling middleware (4 arguments — Express detects this)
function errorMiddleware(err, req, res, next) {
  res.status(500).json({ error: err.message });
}
```

---

## Built-in Middleware

Express ships with several built-in middleware functions since version 4.16.

### `express.json()`

Parses incoming requests with JSON payloads (replaces the old `body-parser` package).

```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/data', (req, res) => {
  console.log(req.body); // parsed JSON object
  res.json({ received: req.body });
});
```

Options:

```javascript
app.use(express.json({
  limit: '10kb',    // maximum request body size
  strict: true,     // only accept arrays and objects
}));
```

### `express.urlencoded()`

Parses requests with URL-encoded payloads (HTML form submissions).

```javascript
app.use(express.urlencoded({ extended: true }));

app.post('/form', (req, res) => {
  console.log(req.body); // { username: 'alice', password: '...' }
  res.redirect('/dashboard');
});
```

`extended: true` uses the `qs` library (supports nested objects). `extended: false` uses the built-in `querystring` module.

### `express.static()`

Serves static assets from a directory.

```javascript
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
```

### `express.raw()` and `express.text()`

```javascript
// Parse body as a Buffer (binary data)
app.use(express.raw({ type: 'application/octet-stream' }));

// Parse body as a plain string
app.use(express.text({ type: 'text/plain' }));
```

---

## Third-party Middleware

### morgan — HTTP Request Logger

```bash
npm install morgan
```

```javascript
const morgan = require('morgan');

// Predefined formats: combined, common, dev, short, tiny
app.use(morgan('dev'));
// GET /users 200 12.345 ms - 42

// Combined format (standard Apache-style logging)
app.use(morgan('combined'));

// Custom format
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

// Log only errors (4xx and 5xx) in production
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined', {
    skip: (req, res) => res.statusCode < 400,
  }));
}
```

### cors — Cross-Origin Resource Sharing

```bash
npm install cors
```

```javascript
const cors = require('cors');

// Allow all origins (development only)
app.use(cors());

// Restrict to specific origins
app.use(cors({
  origin: ['https://myapp.com', 'https://staging.myapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // allow cookies and auth headers
}));

// Per-route CORS
app.get('/public-data', cors(), (req, res) => {
  res.json({ data: 'publicly accessible' });
});
```

### helmet — Security HTTP Headers

```bash
npm install helmet
```

```javascript
const helmet = require('helmet');

// Apply all default security headers
app.use(helmet());

// Customize individual headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'cdn.jsdelivr.net'],
    },
  },
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
}));
```

Helmet sets headers like:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security`
- `Content-Security-Policy`

### express-rate-limit — Rate Limiting

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                  // limit each IP to 100 requests per window
  standardHeaders: true,     // Return rate limit info in RateLimit-* headers
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

app.use('/api', limiter);

// Stricter limit for auth routes
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: { error: 'Too many login attempts.' },
});
app.use('/api/auth', authLimiter);
```

### compression — Gzip Compression

```bash
npm install compression
```

```javascript
const compression = require('compression');

app.use(compression({
  threshold: 1024, // only compress responses larger than 1 KB
  level: 6,        // compression level (1-9)
}));
```

---

## Writing Custom Middleware

### Logging Middleware

```javascript
function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
  });

  next();
}

app.use(requestLogger);
```

### Authentication Middleware

```javascript
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or invalid Authorization header' });
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user to request
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Apply to specific routes
app.get('/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});

// Apply to all routes under /api
app.use('/api', authenticate);
```

### Role-based Authorization

```javascript
function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

app.delete('/admin/users/:id', authenticate, authorize('admin'), (req, res) => {
  res.status(204).send();
});
```

### Request Validation Middleware

```javascript
function validateUserBody(req, res, next) {
  const { name, email } = req.body;

  const errors = [];
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    errors.push('name is required');
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('valid email is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  req.body.name = name.trim();
  next();
}

app.post('/users', express.json(), validateUserBody, (req, res) => {
  res.status(201).json(req.body);
});
```

---

## Middleware Execution Order

Order matters. Express executes middleware in the order it is registered.

```javascript
const express = require('express');
const app = express();

// 1. Applied to ALL routes — register first
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// 2. Route-specific middleware — register before route handlers
app.use('/api', authenticate);

// 3. Route handlers
app.get('/api/users', (req, res) => res.json({ users: [] }));
app.post('/api/users', validateUserBody, (req, res) => res.status(201).json(req.body));

// 4. 404 handler — after all routes
app.use((req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.path}` });
});

// 5. Error handler — always last, always 4 arguments
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message });
});
```

```
Request arrives
      │
      ▼
 helmet()          ← security headers
      │
      ▼
 morgan()          ← logging
      │
      ▼
 express.json()    ← body parsing
      │
      ▼
 authenticate()    ← only for /api/* routes
      │
      ▼
 Route Handler     ← business logic
      │
      ▼ (if next(err) called)
 Error Handler     ← 4-argument middleware
```

### Calling `next()` Variants

```javascript
function middleware(req, res, next) {
  next();           // proceed to next middleware
  next('route');    // skip remaining handlers for this route
  next(new Error('Something went wrong')); // pass error to error handler
}
```

---

## Error Handling Middleware

Error-handling middleware has **exactly four parameters**: `(err, req, res, next)`.

### Basic Error Handler

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
});
```

### Custom Error Class

```javascript
class AppError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = 'AppError';
    this.status = status;
  }
}

// In a route handler
app.get('/items/:id', (req, res, next) => {
  const item = findItem(req.params.id);
  if (!item) {
    return next(new AppError('Item not found', 404));
  }
  res.json(item);
});

// In error handler — distinguish custom vs unexpected errors
app.use((err, req, res, next) => {
  if (err.name === 'AppError') {
    return res.status(err.status).json({ error: err.message });
  }

  // Unexpected error — hide details in production
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});
```

### Async Error Propagation (Express 5)

```javascript
// Express 5: async errors are automatically passed to next(err)
app.get('/users/:id', async (req, res) => {
  const user = await db.findUser(req.params.id); // throws → caught automatically
  res.json(user);
});
```

### Async Error Propagation (Express 4)

```javascript
// Express 4: wrap async handlers manually
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await db.findUser(req.params.id);
  res.json(user);
}));
```

---

## FAQ

**Q: What happens if I forget to call `next()`?**
The request will hang indefinitely. The client will wait for a response that never comes. Always either call `next()`, `next(err)`, or send a response (`res.send`, `res.json`, etc.).

**Q: Can middleware be applied to a specific HTTP method?**
Yes. Use `app.METHOD(path, middleware, handler)` or mount it on a router that only handles that method.

**Q: How do I share data between middleware functions?**
Attach properties to `req`. For example: `req.user = decoded` in auth middleware, then access `req.user` in the next handler. Do not mutate `res.locals` unless you are using template rendering.

**Q: Is the order of `app.use` and route handlers important?**
Yes. Middleware registered before a route affects that route. Middleware registered after does not. The 404 handler must come after all routes, and the error handler must come last.

**Q: How do I skip middleware for certain routes?**
Use conditional logic inside the middleware:
```javascript
function skipForPublic(req, res, next) {
  if (req.path.startsWith('/public')) return next();
  authenticate(req, res, next);
}
```
Or mount route-specific middleware instead of global middleware.

---

**Parent guide**: [Node.js Development - SKILL.md](../../SKILL.md)



===== SOURCE: 04-web-and-network/nodejs-development/docs/03-frameworks/03-rest-api.md =====

# Building REST APIs with Express — Complete Guide

## Table of Contents

1. [REST API Design Principles](#rest-api-design-principles)
2. [Building a Complete CRUD API](#building-a-complete-crud-api)
3. [Request Validation](#request-validation)
4. [Response Formatting](#response-formatting)
5. [HTTP Status Codes](#http-status-codes)
6. [API Versioning](#api-versioning)
7. [FAQ](#faq)

---

## REST API Design Principles

REST (Representational State Transfer) is an architectural style for networked applications. A RESTful API uses HTTP methods and URIs to expose resources.

### Core Constraints

| Constraint       | Description                                              |
|-----------------|----------------------------------------------------------|
| Stateless        | Each request contains all information needed to process it |
| Client–Server    | Client and server are decoupled                          |
| Uniform Interface| Consistent resource naming and HTTP methods              |
| Cacheable        | Responses must define themselves as cacheable or not     |
| Layered System   | Client cannot tell if it is connected to the end server  |

### Resource Naming Conventions

```
✅ Good (nouns, plural)
GET    /users              → list users
GET    /users/42           → get user 42
POST   /users              → create user
PUT    /users/42           → replace user 42
PATCH  /users/42           → partially update user 42
DELETE /users/42           → delete user 42

GET    /users/42/posts     → posts belonging to user 42
GET    /users/42/posts/7   → post 7 belonging to user 42

❌ Bad (verbs in URL)
GET    /getUsers
POST   /createUser
DELETE /deleteUser/42
```

### HTTP Methods and Idempotency

```
Method  │ Safe │ Idempotent │ Use Case
────────┼──────┼────────────┼────────────────────────
GET     │  ✓   │     ✓      │ Read resource(s)
HEAD    │  ✓   │     ✓      │ Read headers only
POST    │  ✗   │     ✗      │ Create resource
PUT     │  ✗   │     ✓      │ Replace entire resource
PATCH   │  ✗   │     ✗      │ Partial update
DELETE  │  ✗   │     ✓      │ Delete resource
OPTIONS │  ✓   │     ✓      │ CORS preflight
```

---

## Building a Complete CRUD API

### Project Setup

```bash
mkdir rest-api-demo
cd rest-api-demo
npm init -y
npm install express express-validator
npm install --save-dev nodemon
```

### Entry Point

```javascript
// server.js
const express = require('express');
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/users', usersRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.path}`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));

module.exports = app;
```

### In-memory Data Store (for demonstration)

```javascript
// data/store.js
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin', createdAt: new Date().toISOString() },
  { id: 2, name: 'Bob',   email: 'bob@example.com',   role: 'user',  createdAt: new Date().toISOString() },
];
let nextId = 3;

module.exports = {
  findAll: () => [...users],
  findById: (id) => users.find(u => u.id === Number(id)),
  create: (data) => {
    const user = { id: nextId++, ...data, createdAt: new Date().toISOString() };
    users.push(user);
    return user;
  },
  update: (id, data) => {
    const index = users.findIndex(u => u.id === Number(id));
    if (index === -1) return null;
    users[index] = { ...users[index], ...data };
    return users[index];
  },
  remove: (id) => {
    const index = users.findIndex(u => u.id === Number(id));
    if (index === -1) return false;
    users.splice(index, 1);
    return true;
  },
};
```

### CRUD Routes

```javascript
// routes/users.js
const express = require('express');
const router = express.Router();
const store = require('../data/store');

// GET /api/v1/users — list with pagination and filtering
router.get('/', (req, res) => {
  const { page = 1, limit = 10, role } = req.query;

  let users = store.findAll();

  // Filter
  if (role) {
    users = users.filter(u => u.role === role);
  }

  // Pagination
  const total = users.length;
  const start = (Number(page) - 1) * Number(limit);
  const paginated = users.slice(start, start + Number(limit));

  res.json({
    success: true,
    data: paginated,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

// GET /api/v1/users/:id — get one
router.get('/:id', (req, res, next) => {
  const user = store.findById(req.params.id);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    return next(err);
  }
  res.json({ success: true, data: user });
});

// POST /api/v1/users — create
router.post('/', (req, res) => {
  const { name, email, role = 'user' } = req.body;
  const user = store.create({ name, email, role });
  res
    .status(201)
    .set('Location', `/api/v1/users/${user.id}`)
    .json({ success: true, data: user });
});

// PUT /api/v1/users/:id — replace
router.put('/:id', (req, res, next) => {
  const { name, email, role } = req.body;
  const user = store.update(req.params.id, { name, email, role });
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    return next(err);
  }
  res.json({ success: true, data: user });
});

// PATCH /api/v1/users/:id — partial update
router.patch('/:id', (req, res, next) => {
  const allowed = ['name', 'email', 'role'];
  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([k]) => allowed.includes(k))
  );
  const user = store.update(req.params.id, updates);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    return next(err);
  }
  res.json({ success: true, data: user });
});

// DELETE /api/v1/users/:id — delete
router.delete('/:id', (req, res, next) => {
  const deleted = store.remove(req.params.id);
  if (!deleted) {
    const err = new Error('User not found');
    err.status = 404;
    return next(err);
  }
  res.status(204).send();
});

module.exports = router;
```

---

## Request Validation

Never trust user input. Validate early and return clear error messages.

### Manual Validation

```javascript
router.post('/', (req, res, next) => {
  const { name, email, role } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'Valid email is required' });
  }
  if (role && !['admin', 'user', 'moderator'].includes(role)) {
    errors.push({ field: 'role', message: 'Role must be admin, user, or moderator' });
  }

  if (errors.length > 0) {
    return res.status(422).json({ success: false, errors });
  }

  const user = store.create({ name: name.trim(), email, role: role || 'user' });
  res.status(201).json({ success: true, data: user });
});
```

### Using express-validator

```bash
npm install express-validator
```

```javascript
const { body, param, query, validationResult } = require('express-validator');

// Reusable validation middleware
function validate(validations) {
  return async (req, res, next) => {
    await Promise.all(validations.map(v => v.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
      });
    }
    next();
  };
}

// Validation rules
const createUserRules = [
  body('name').trim().notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be 2–50 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('role').optional().isIn(['admin', 'user', 'moderator'])
    .withMessage('Role must be admin, user, or moderator'),
];

const userIdRule = [
  param('id').isInt({ min: 1 }).withMessage('ID must be a positive integer'),
];

const paginationRules = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be ≥ 1'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be 1–100'),
];

// Apply to routes
router.get('/',    validate(paginationRules), listUsers);
router.post('/',   validate(createUserRules), createUser);
router.get('/:id', validate(userIdRule), getUser);
```

---

## Response Formatting

Consistent response shapes make APIs predictable and easy to consume.

### Standard Success Response

```javascript
// Single resource
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com"
  }
}

// Collection with pagination
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "total": 100,
    "page": 2,
    "limit": 10,
    "totalPages": 10
  }
}
```

### Standard Error Response

```javascript
// Single error
{
  "success": false,
  "error": "User not found"
}

// Validation errors
{
  "success": false,
  "errors": [
    { "field": "email", "message": "Valid email is required" },
    { "field": "name",  "message": "Name is required" }
  ]
}
```

### Response Helper

```javascript
// utils/response.js
const send = {
  ok: (res, data, meta = undefined) => {
    const body = { success: true, data };
    if (meta) body.meta = meta;
    res.status(200).json(body);
  },
  created: (res, data, location) => {
    if (location) res.set('Location', location);
    res.status(201).json({ success: true, data });
  },
  noContent: (res) => res.status(204).send(),
  badRequest: (res, errors) => res.status(400).json({ success: false, errors }),
  unauthorized: (res, message = 'Unauthorized') =>
    res.status(401).json({ success: false, error: message }),
  forbidden: (res, message = 'Forbidden') =>
    res.status(403).json({ success: false, error: message }),
  notFound: (res, resource = 'Resource') =>
    res.status(404).json({ success: false, error: `${resource} not found` }),
  unprocessable: (res, errors) =>
    res.status(422).json({ success: false, errors }),
  internal: (res, message = 'Internal server error') =>
    res.status(500).json({ success: false, error: message }),
};

module.exports = send;
```

---

## HTTP Status Codes

### 2xx — Success

| Code | Name       | When to Use                                        |
|------|------------|----------------------------------------------------|
| 200  | OK         | Successful GET, PUT, PATCH                         |
| 201  | Created    | Successful POST that creates a resource            |
| 204  | No Content | Successful DELETE, or POST/PUT with no body needed |

### 3xx — Redirection

| Code | Name              | When to Use                          |
|------|-------------------|--------------------------------------|
| 301  | Moved Permanently | Resource permanently moved           |
| 304  | Not Modified      | Cached resource is still valid       |

### 4xx — Client Errors

| Code | Name                 | When to Use                                       |
|------|----------------------|---------------------------------------------------|
| 400  | Bad Request          | Malformed request syntax, invalid parameters      |
| 401  | Unauthorized         | Authentication required or failed                 |
| 403  | Forbidden            | Authenticated but not authorized                  |
| 404  | Not Found            | Resource does not exist                           |
| 405  | Method Not Allowed   | HTTP method not supported for this resource       |
| 409  | Conflict             | State conflict (e.g., duplicate email)            |
| 422  | Unprocessable Entity | Validation errors (semantically invalid request)  |
| 429  | Too Many Requests    | Rate limit exceeded                               |

### 5xx — Server Errors

| Code | Name                  | When to Use                                    |
|------|-----------------------|------------------------------------------------|
| 500  | Internal Server Error | Unexpected server-side error                   |
| 502  | Bad Gateway           | Upstream service returned an invalid response  |
| 503  | Service Unavailable   | Server temporarily unavailable (maintenance)   |

```javascript
// Decision tree for common cases
function respondToCreate(res, data, error) {
  if (!error)           return res.status(201).json({ success: true, data });
  if (error.isDuplicate) return res.status(409).json({ success: false, error: 'Already exists' });
  if (error.isValidation) return res.status(422).json({ success: false, errors: error.details });
                          return res.status(500).json({ success: false, error: 'Server error' });
}
```

---

## API Versioning

Versioning allows you to evolve your API without breaking existing clients.

### Strategy 1: URL Path Versioning (Most Common)

```
/api/v1/users
/api/v2/users
```

```javascript
// server.js
const v1Router = require('./routes/v1');
const v2Router = require('./routes/v2');

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);
```

```
routes/
├── v1/
│   ├── index.js
│   └── users.js
└── v2/
    ├── index.js
    └── users.js
```

### Strategy 2: Header Versioning

```javascript
function versionMiddleware(req, res, next) {
  const version = req.headers['api-version'] || '1';
  req.apiVersion = parseInt(version, 10);
  next();
}

app.use(versionMiddleware);

app.get('/users', (req, res) => {
  if (req.apiVersion >= 2) {
    return res.json({ data: [], links: {} }); // v2 shape
  }
  res.json([]); // v1 shape
});
```

### Strategy 3: Query String Versioning

```
GET /users?version=2
```

```javascript
app.get('/users', (req, res) => {
  const version = Number(req.query.version) || 1;
  // handle per version
});
```

### Deprecation Headers

Signal clients that a version will be removed:

```javascript
router.use((req, res, next) => {
  res.set('Deprecation', 'true');
  res.set('Sunset', 'Sat, 01 Jan 2027 00:00:00 GMT');
  res.set('Link', '</api/v2/users>; rel="successor-version"');
  next();
});
```

### Version Lifecycle

```
v1 ──────────────────────────────────── deprecated ── sunset
v2 ─────────────────────────────────────────────────────────
v3                        ── released ──────────────────────
     │                    │             │
  launch               announce      v1 removed
  v2 beta              v3 stable
```

---

## FAQ

**Q: Should I use PUT or PATCH for updates?**
Use PUT when replacing the entire resource (client sends all fields). Use PATCH when partially updating (client sends only changed fields). PATCH is more common in practice.

**Q: How do I handle pagination for large datasets?**
Prefer cursor-based pagination for large or frequently updated datasets:
```javascript
// Offset pagination (simple, but slow on large tables)
GET /users?page=5&limit=20

// Cursor pagination (efficient, consistent)
GET /users?cursor=eyJpZCI6MTAwfQ&limit=20
// Response includes: { data: [...], nextCursor: "eyJpZCI6MTIwfQ" }
```

**Q: What is the difference between 400 and 422?**
Use 400 for malformed syntax (e.g., invalid JSON). Use 422 for structurally valid but semantically invalid data (e.g., `"age": "not-a-number"` when age must be an integer).

**Q: Should I return the deleted resource in a DELETE response?**
Typically no. Return 204 No Content with an empty body. Some APIs return 200 with the deleted object to confirm what was deleted — both are acceptable.

**Q: How do I document my REST API?**
Use OpenAPI (formerly Swagger). The `swagger-jsdoc` and `swagger-ui-express` packages let you generate interactive docs from JSDoc comments in your Express route files.

---

**Parent guide**: [Node.js Development - SKILL.md](../../SKILL.md)



===== SOURCE: 04-web-and-network/nodejs-development/docs/03-frameworks/04-error-handling.md =====

# Error Handling in Node.js and Express — Complete Guide

## Table of Contents

1. [Error Types in Node.js](#error-types-in-nodejs)
2. [Synchronous vs Asynchronous Error Handling](#synchronous-vs-asynchronous-error-handling)
3. [Global Error Handling Middleware](#global-error-handling-middleware)
4. [Operational vs Programmer Errors](#operational-vs-programmer-errors)
5. [Logging Errors](#logging-errors)
6. [Best Practices](#best-practices)
7. [FAQ](#faq)

---

## Error Types in Node.js

Node.js distinguishes several categories of errors. Understanding them is the first step to handling them correctly.

```
Error (base class)
├── SyntaxError         — invalid JavaScript syntax
├── ReferenceError      — accessing undefined variable
├── TypeError           — wrong type for an operation
├── RangeError          — value out of allowed range
├── URIError            — malformed URI functions
├── EvalError           — issues with eval()
└── SystemError         — OS-level errors (ENOENT, ECONNREFUSED …)
```

### Built-in Error Properties

```javascript
try {
  null.property; // TypeError
} catch (err) {
  console.log(err.name);    // "TypeError"
  console.log(err.message); // "Cannot read properties of null"
  console.log(err.stack);   // full stack trace string
}
```

### System (OS) Errors

```javascript
const fs = require('fs');

fs.readFile('/nonexistent', (err, data) => {
  if (err) {
    console.log(err.code);    // "ENOENT"
    console.log(err.errno);   // -2
    console.log(err.syscall); // "open"
    console.log(err.path);    // "/nonexistent"
  }
});
```

Common system error codes:

| Code            | Meaning                            |
|-----------------|------------------------------------|
| ENOENT          | No such file or directory          |
| EACCES          | Permission denied                  |
| ECONNREFUSED    | Connection refused                 |
| ECONNRESET      | Connection reset by peer           |
| ETIMEDOUT       | Connection or operation timed out  |
| EADDRINUSE      | Address already in use             |

### Custom Error Class

```javascript
class AppError extends Error {
  constructor(message, status = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.code = code;
    this.isOperational = true; // mark as expected error

    // Maintains proper prototype chain
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

class ValidationError extends AppError {
  constructor(errors) {
    super('Validation failed', 422, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
    this.errors = errors;
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401, 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}
```

---

## Synchronous vs Asynchronous Error Handling

### Synchronous Errors

```javascript
// throw — caught by try/catch
function divide(a, b) {
  if (b === 0) throw new AppError('Division by zero', 400, 'BAD_INPUT');
  return a / b;
}

try {
  const result = divide(10, 0);
} catch (err) {
  console.error(err.message); // "Division by zero"
}

// In Express: synchronous throws are automatically caught
app.get('/sync', (req, res) => {
  throw new NotFoundError('Item'); // Express catches this
});
```

### Asynchronous Errors — Callbacks

```javascript
const fs = require('fs');

// Old style: error-first callback (err, data)
fs.readFile('./config.json', 'utf8', (err, data) => {
  if (err) {
    // Handle error — do NOT throw here
    console.error('Failed to read config:', err.message);
    return;
  }
  console.log(data);
});
```

### Asynchronous Errors — Promises

```javascript
// .catch() on rejected promises
fetch('https://api.example.com/data')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error('Fetch failed:', err.message));

// Unhandled promise rejections crash Node.js (v15+)
// Always attach .catch() or use try/await
```

### Asynchronous Errors — async/await

```javascript
async function fetchUser(id) {
  try {
    const response = await fetch(`https://api.example.com/users/${id}`);
    if (!response.ok) {
      throw new AppError(`Upstream API error: ${response.status}`, 502);
    }
    return await response.json();
  } catch (err) {
    // Re-throw to propagate to caller
    throw err;
  }
}

// In Express 4 — wrap async handlers
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

app.get('/users/:id', asyncHandler(async (req, res) => {
  const user = await fetchUser(req.params.id);
  res.json({ success: true, data: user });
}));

// In Express 5 — no wrapper needed
app.get('/users/:id', async (req, res) => {
  const user = await fetchUser(req.params.id); // rejection auto-forwarded to next(err)
  res.json({ success: true, data: user });
});
```

### Asynchronous Errors — EventEmitter

```javascript
const { EventEmitter } = require('events');
const emitter = new EventEmitter();

// Always handle 'error' events — unhandled ones crash Node.js
emitter.on('error', (err) => {
  console.error('Emitter error:', err.message);
});

emitter.emit('error', new Error('Something went wrong'));
```

---

## Global Error Handling Middleware

Express provides a dedicated error-handling middleware pattern (4 arguments).

### Basic Structure

```javascript
// server.js — register AFTER all routes

// 404 — route not matched
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.path}`,
  });
});

// Error handler — must have exactly 4 parameters
app.use((err, req, res, next) => {
  handleError(err, req, res);
});
```

### Production-Grade Error Handler

```javascript
// middleware/errorHandler.js
const { AppError, ValidationError } = require('../errors');
const logger = require('../utils/logger');

function handleError(err, req, res, next) {
  // Normalize status
  let status = err.status || err.statusCode || 500;
  let message = err.message || 'Internal server error';
  let code = err.code || 'INTERNAL_ERROR';
  let errors = undefined;

  // Handle known third-party error types
  if (err.name === 'JsonWebTokenError') {
    status = 401; message = 'Invalid token'; code = 'INVALID_TOKEN';
  } else if (err.name === 'TokenExpiredError') {
    status = 401; message = 'Token expired'; code = 'TOKEN_EXPIRED';
  } else if (err.name === 'CastError') {
    // Mongoose invalid ObjectId
    status = 400; message = 'Invalid ID format'; code = 'INVALID_ID';
  } else if (err.name === 'ValidationError' && err.errors) {
    // Mongoose validation
    status = 422; code = 'VALIDATION_ERROR';
    errors = Object.values(err.errors).map(e => ({
      field: e.path,
      message: e.message,
    }));
  }

  // Log appropriately
  if (status >= 500) {
    logger.error({ err, req: { method: req.method, url: req.url } });
  } else {
    logger.warn({ code, message, url: req.url });
  }

  // Build response
  const body = { success: false, error: { code, message } };
  if (errors) body.error.details = errors;

  // Include stack trace only in development
  if (process.env.NODE_ENV === 'development') {
    body.error.stack = err.stack;
  }

  res.status(status).json(body);
}

module.exports = handleError;
```

### Unhandled Exceptions and Rejections

```javascript
// server.js — register BEFORE starting the server

process.on('uncaughtException', (err) => {
  logger.fatal({ err }, 'Uncaught exception — shutting down');
  // Gracefully close the server then exit
  server.close(() => process.exit(1));
  // Force exit after 10 seconds if close hangs
  setTimeout(() => process.exit(1), 10_000).unref();
});

process.on('unhandledRejection', (reason, promise) => {
  logger.fatal({ reason, promise }, 'Unhandled rejection — shutting down');
  server.close(() => process.exit(1));
  setTimeout(() => process.exit(1), 10_000).unref();
});

const server = app.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
});
```

---

## Operational vs Programmer Errors

This distinction determines how you handle and recover from errors.

```
All Errors
├── Operational Errors (expected)
│   ├── Invalid user input (400, 422)
│   ├── Resource not found (404)
│   ├── Authentication failure (401, 403)
│   ├── Network timeout (503)
│   └── Disk full, DB connection lost (503)
│
└── Programmer Errors (bugs)
    ├── Reading property of undefined
    ├── Calling a function with wrong arguments
    ├── Async code without error handling
    └── Logic bugs
```

### Detecting Operational Errors

```javascript
// Mark your custom errors as operational
class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.isOperational = true; // key flag
  }
}

function isOperationalError(err) {
  return err instanceof AppError && err.isOperational;
}
```

### Recovery Strategy

```javascript
// In error handler:
function handleError(err, req, res, next) {
  if (isOperationalError(err)) {
    // Safe to respond and continue running
    return res.status(err.status).json({
      success: false,
      error: err.message,
    });
  }

  // Programmer error — log and restart
  logger.fatal({ err }, 'Programmer error detected');
  process.exit(1); // Let process manager (PM2/Docker) restart the app
}
```

```
Operational Error              Programmer Error
      │                               │
      ▼                               ▼
  Log as warning              Log as fatal
  Send HTTP response          Graceful shutdown
  Continue running            Restart via PM2/k8s
```

---

## Logging Errors

### Using pino (Recommended for Production)

```bash
npm install pino pino-pretty
```

```javascript
// utils/logger.js
const pino = require('pino');

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV === 'development'
    ? { target: 'pino-pretty', options: { colorize: true } }
    : undefined, // JSON output in production
  redact: ['req.headers.authorization', 'body.password'], // hide secrets
});

module.exports = logger;
```

```javascript
// Usage
logger.info('Server started');
logger.warn({ userId: 42 }, 'Rate limit approached');
logger.error({ err }, 'Database query failed');
logger.fatal({ err }, 'Unrecoverable error');
```

### Using winston

```bash
npm install winston
```

```javascript
// utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    process.env.NODE_ENV === 'development'
      ? winston.format.prettyPrint()
      : winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

module.exports = logger;
```

### Log Levels and When to Use Them

```
FATAL  — app must shut down (unhandled exception)
ERROR  — request failed, needs investigation (5xx)
WARN   — unexpected but handled (4xx, rate limit)
INFO   — normal operational events (server start, request)
DEBUG  — detailed diagnostic information
TRACE  — very verbose, rarely used in production
```

### Structured Logging

Log in JSON to make logs searchable in Datadog, CloudWatch, or ELK:

```javascript
// Good — structured and searchable
logger.error({
  err,
  requestId: req.id,
  userId: req.user?.id,
  method: req.method,
  url: req.url,
  duration: Date.now() - req.startTime,
}, 'Request failed');

// Bad — hard to parse
console.log(`ERROR: ${err.message} for user ${req.user?.id} on ${req.url}`);
```

---

## Best Practices

### 1. Always Use Async/Await with Try/Catch or asyncHandler

```javascript
// Never leave unhandled promise rejections
app.get('/bad', async (req, res) => {
  const data = await riskyOperation(); // ❌ No error handling in Express 4
});

// Wrap with asyncHandler in Express 4
app.get('/good', asyncHandler(async (req, res) => {
  const data = await riskyOperation(); // ✅ Errors forwarded to error handler
  res.json(data);
}));
```

### 2. Never Expose Internal Errors to Clients

```javascript
// ❌ Leaks implementation details
res.status(500).json({ error: err.stack });

// ✅ Safe for production
res.status(500).json({ error: 'Internal server error' });

// ✅ Full details in development only
if (process.env.NODE_ENV === 'development') {
  res.status(500).json({ error: err.message, stack: err.stack });
} else {
  res.status(500).json({ error: 'Internal server error' });
}
```

### 3. Validate Input Early

```javascript
// Validate at the boundary — before any business logic
router.post('/users',
  validate(createUserRules), // 422 if invalid
  asyncHandler(createUser)   // business logic
);
```

### 4. Use a Centralized Error Handler

```javascript
// ❌ Error handling scattered across routes
app.get('/a', (req, res) => { try { ... } catch (e) { res.status(500)... } });
app.get('/b', (req, res) => { try { ... } catch (e) { res.status(500)... } });

// ✅ One error handler for all routes
app.get('/a', asyncHandler(handlerA));
app.get('/b', asyncHandler(handlerB));
app.use(centralErrorHandler); // handles everything
```

### 5. Set Timeouts

```javascript
// Request timeout middleware
app.use((req, res, next) => {
  req.setTimeout(30_000, () => {
    const err = new AppError('Request timeout', 408, 'TIMEOUT');
    next(err);
  });
  next();
});

// Upstream fetch with timeout
async function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return await res.json();
  } catch (err) {
    if (err.name === 'AbortError') throw new AppError('Upstream timeout', 504);
    throw err;
  } finally {
    clearTimeout(timer);
  }
}
```

### 6. Graceful Shutdown

```javascript
function shutdown(signal) {
  logger.info(`${signal} received — shutting down gracefully`);

  server.close((err) => {
    if (err) {
      logger.error({ err }, 'Error during shutdown');
      process.exit(1);
    }
    // Close DB connections, flush logs, etc.
    logger.info('Shutdown complete');
    process.exit(0);
  });

  // Force exit after 30 seconds
  setTimeout(() => {
    logger.warn('Forced shutdown after timeout');
    process.exit(1);
  }, 30_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM')); // Docker/k8s
process.on('SIGINT',  () => shutdown('SIGINT'));  // Ctrl+C
```

### Summary Checklist

```
✅ asyncHandler wrapping or Express 5 for async routes
✅ Centralized error handler with 4 arguments
✅ Input validation at route entry points
✅ Custom error classes with isOperational flag
✅ Structured logging (JSON) with appropriate log levels
✅ No sensitive data in responses or logs
✅ Unhandled rejection and uncaught exception listeners
✅ Graceful shutdown on SIGTERM/SIGINT
✅ Timeouts on all external calls
✅ Different behavior in development vs production
```

---

## FAQ

**Q: What happens if I throw inside an async middleware in Express 4?**
The error is not automatically caught and becomes an unhandled rejection. Wrap every async middleware with `asyncHandler` or upgrade to Express 5.

**Q: Should I use `next(err)` or `throw err` in route handlers?**
In Express 4 synchronous code, both work. In async functions (without Express 5), only `next(err)` reliably forwards the error. Prefer `next(err)` for clarity and compatibility.

**Q: How do I test error handling?**
Use supertest to make requests that trigger errors and assert the response shape:
```javascript
const request = require('supertest');
const app = require('../server');

test('returns 404 for unknown user', async () => {
  const res = await request(app).get('/api/v1/users/99999');
  expect(res.status).toBe(404);
  expect(res.body.success).toBe(false);
});
```

**Q: Should I exit the process on programmer errors?**
Yes. Programmer errors leave the application in an unknown state. Terminate and let your process manager (PM2, Docker, Kubernetes) restart it in a clean state.

**Q: How do I avoid `console.log` vs a real logger?**
`console.log` lacks log levels, structured fields, and transport options. Install `pino` or `winston` from the start — switching later is painful. At minimum, use `console.error` for errors and `console.info` for informational messages.

---

**Parent guide**: [Node.js Development - SKILL.md](../../SKILL.md)

