

===== SOURCE: 02-programming/go-practical-guide/SKILL.md =====

[日本語版](../../ja/02-programming/go-practical-guide/SKILL.md)

# Go Practical Guide

> Go is a language that prioritizes simplicity and concurrency. This guide covers all the practical aspects of Go -- from concurrent programming with goroutines and channels to web development, CLI tool development, and testing strategies.

## Target Audience

- Engineers who want to learn Go through a practical approach
- Developers building high-performance backends
- Those who want to build CLI tools and microservices in Go

## Prerequisites

- Experience with any programming language
- Basic knowledge of web development

## Study Guide

### 00-basics -- Go Basics

| # | File | Content |
|---|------|---------|

### 01-concurrency -- Concurrent Programming

| # | File | Content |
|---|------|---------|

### 02-web -- Web Development

| # | File | Content |
|---|------|---------|

### 03-tools -- Tool Development

| # | File | Content |
|---|------|---------|

## Quick Reference

```
Go Cheat Sheet:
  go mod init myapp     -- Initialize a module
  go run main.go        -- Run
  go build -o app       -- Build
  go test ./...         -- Test
  go vet ./...          -- Static analysis
  golangci-lint run     -- Lint
```

## References

1. Go. "Documentation." go.dev/doc, 2024.
2. Donovan, A. & Kernighan, B. "The Go Programming Language." Addison-Wesley, 2015.
3. Go. "Effective Go." go.dev/doc/effective_go, 2024.



===== SOURCE: 02-programming/go-practical-guide/docs/00-basics/00-go-overview.md =====

# Go Language Overview -- Design Philosophy and Ecosystem

> Go is a statically typed, compiled language from Google, designed around the three pillars of simplicity, concurrency, and fast compilation.

---

## What You Will Learn in This Chapter

1. **Go's design philosophy** -- Why "fewer features" becomes a strength
2. **Concurrency model** -- The problems goroutines and channels solve
3. **Development workflow** -- The fast cycle of compile, test, and deploy
4. **Type system characteristics** -- The power of structural subtyping and interfaces
5. **Standard library** -- "Batteries included" in practice
6. **Ecosystem** -- Toolchain, package management, and CI/CD integration
7. **History and evolution** -- The progression from Go 1.0 to the latest version


## Prerequisites

Before reading this guide, the following knowledge will help deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts

---

## 1. Go's Design Philosophy

### 1.1 The Pursuit of Simplicity

Go's design was started in 2007 at Google by Robert Griesemer, Rob Pike, and Ken Thompson. The shared concern they had was "the explosion of complexity in large-scale software development." The long compile times of C++, the verbose syntax of Java, the lack of type safety in dynamic languages -- they aimed to create a language that would solve these problems simultaneously.

Go's design principles can be summarized as the following three:

1. **Orthogonality**: Each feature is independent, and expressiveness is gained through combination
2. **Explicitness**: Eliminates implicit behavior; code clearly expresses intent
3. **Pragmatism**: Prioritizes productivity in real-world software development over theoretical beauty

There are many features Go intentionally omitted. Class inheritance, exception mechanisms, assertions, generics (initially), macros, operator overloading, and more. This is based on the recognition that "adding features is easy, but removing them is impossible."

### 1.2 Go Proverbs

The Go Proverbs, proposed by Rob Pike, concisely express Go's design philosophy:

- **Don't communicate by sharing memory; share memory by communicating.**
- **Concurrency is not parallelism.**
- **Channels orchestrate; mutexes serialize.**
- **The bigger the interface, the weaker the abstraction.**
- **Make the zero value useful.**
- **interface{} says nothing.**
- **Gofmt's style is no one's favorite, yet gofmt is everyone's favorite.**
- **A little copying is better than a little dependency.**
- **Clear is better than clever.**
- **Errors are values.**

### Code Example 1: Hello World

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

Even this minimal program reflects Go's philosophy. `package main` makes the entry point explicit, `import` declares dependencies, and `func main()` defines the program's starting point. Unused imports cause compile errors -- this is one example of Go's "explicitness."

### Code Example 2: Multiple Return Values

```go
package main

import (
    "fmt"
    "math"
)

func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

// A variation using named return values
func safeSqrt(x float64) (result float64, err error) {
    if x < 0 {
        err = fmt.Errorf("cannot take square root of negative number: %f", x)
        return // result=0.0, err=the error above
    }
    result = math.Sqrt(x)
    return // result=computed value, err=nil
}

func main() {
    // Receiving multiple return values
    result, err := divide(10, 3)
    if err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    fmt.Printf("10 / 3 = %.4f\n", result)

    // Function with named return values
    sqrt, err := safeSqrt(16)
    if err != nil {
        fmt.Printf("Error: %v\n", err)
        return
    }
    fmt.Printf("sqrt(16) = %.1f\n", sqrt)

    // Verifying the error case
    _, err = safeSqrt(-4)
    if err != nil {
        fmt.Printf("Expected error: %v\n", err)
    }
}
```

Go's multiple return values act as an alternative to exception mechanisms. A function returns both a normal result and an error simultaneously, and the caller immediately checks for errors. This explicit error handling underpins the robustness of Go code.

### Code Example 3: Structs and Methods

```go
package main

import (
    "fmt"
    "strings"
)

// Server is a struct representing HTTP server configuration
type Server struct {
    Host     string
    Port     int
    TLS      bool
    CertFile string
    KeyFile  string
}

// Address returns the connection address (value receiver)
func (s Server) Address() string {
    return fmt.Sprintf("%s:%d", s.Host, s.Port)
}

// URL returns the full URL (value receiver)
func (s Server) URL() string {
    scheme := "http"
    if s.TLS {
        scheme = "https"
    }
    return fmt.Sprintf("%s://%s", scheme, s.Address())
}

// String implements the fmt.Stringer interface
func (s Server) String() string {
    var parts []string
    parts = append(parts, fmt.Sprintf("host=%s", s.Host))
    parts = append(parts, fmt.Sprintf("port=%d", s.Port))
    if s.TLS {
        parts = append(parts, "tls=enabled")
    }
    return fmt.Sprintf("Server{%s}", strings.Join(parts, ", "))
}

// EnableTLS enables TLS (pointer receiver -- modifies the struct)
func (s *Server) EnableTLS(certFile, keyFile string) {
    s.TLS = true
    s.CertFile = certFile
    s.KeyFile = keyFile
}

func main() {
    srv := Server{Host: "localhost", Port: 8080}
    fmt.Println(srv)           // Server{host=localhost, port=8080}
    fmt.Println(srv.URL())     // http://localhost:8080

    srv.EnableTLS("/etc/certs/cert.pem", "/etc/certs/key.pem")
    fmt.Println(srv)           // Server{host=localhost, port=8080, tls=enabled}
    fmt.Println(srv.URL())     // https://localhost:8080
}
```

### Code Example 4: Interfaces and Structural Subtyping

```go
package main

import (
    "fmt"
    "io"
    "strings"
)

// Writer interface (same signature as io.Writer)
type Writer interface {
    Write(p []byte) (n int, err error)
}

// A struct implicitly satisfies an interface -- no declaration needed
type FileWriter struct {
    Path string
}

func (fw FileWriter) Write(p []byte) (int, error) {
    fmt.Printf("[FileWriter] writing %d bytes to %s\n", len(p), fw.Path)
    return len(p), nil
}

// ConsoleWriter also satisfies the same interface
type ConsoleWriter struct {
    Prefix string
}

func (cw ConsoleWriter) Write(p []byte) (int, error) {
    fmt.Printf("[%s] %s", cw.Prefix, string(p))
    return len(p), nil
}

// Interface composition
type ReadWriteCloser interface {
    io.Reader
    io.Writer
    io.Closer
}

// Leveraging polymorphism: a function that accepts a Writer
func writeMessage(w Writer, msg string) error {
    _, err := w.Write([]byte(msg))
    return err
}

// Empty interface and any
func printType(v any) {
    fmt.Printf("type=%T, value=%v\n", v, v)
}

func main() {
    // FileWriter and ConsoleWriter satisfy the same interface
    var w Writer

    w = FileWriter{Path: "/tmp/log.txt"}
    writeMessage(w, "hello from file writer\n")

    w = ConsoleWriter{Prefix: "CONSOLE"}
    writeMessage(w, "hello from console writer\n")

    // The standard library's strings.Reader also satisfies io.Reader
    reader := strings.NewReader("Go is great!")
    buf := make([]byte, 12)
    n, _ := reader.Read(buf)
    fmt.Printf("Read %d bytes: %s\n", n, string(buf[:n]))
}
```

### Code Example 5: Goroutines and Channels

```go
package main

import (
    "fmt"
    "math/rand"
    "sync"
    "time"
)

// Worker pattern: process tasks with multiple goroutines
func worker(id int, tasks <-chan int, results chan<- string, wg *sync.WaitGroup) {
    defer wg.Done()
    for task := range tasks {
        // Simulated processing
        duration := time.Duration(rand.Intn(100)) * time.Millisecond
        time.Sleep(duration)
        results <- fmt.Sprintf("worker %d processed task %d in %v", id, task, duration)
    }
}

func main() {
    // Channel basics
    ch := make(chan string)
    go func() {
        ch <- "hello from goroutine"
    }()
    msg := <-ch
    fmt.Println(msg)

    // Worker pool
    const numWorkers = 3
    const numTasks = 10

    tasks := make(chan int, numTasks)
    results := make(chan string, numTasks)

    var wg sync.WaitGroup
    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go worker(i, tasks, results, &wg)
    }

    // Send tasks
    for i := 0; i < numTasks; i++ {
        tasks <- i
    }
    close(tasks) // Close after sending all tasks

    // Collect results in a separate goroutine
    go func() {
        wg.Wait()
        close(results) // Close after all workers complete
    }()

    // Display results
    for result := range results {
        fmt.Println(result)
    }
}
```

### Code Example 6: defer, panic, recover

```go
package main

import (
    "fmt"
    "os"
)

// defer basics: executed in LIFO order
func deferExample() {
    fmt.Println("start")
    defer fmt.Println("deferred 1")
    defer fmt.Println("deferred 2")
    defer fmt.Println("deferred 3")
    fmt.Println("end")
    // Output: start, end, deferred 3, deferred 2, deferred 1
}

// Closing a file with defer (a typical resource management pattern)
func readFile(path string) ([]byte, error) {
    f, err := os.Open(path)
    if err != nil {
        return nil, fmt.Errorf("open %s: %w", path, err)
    }
    defer f.Close() // Always close when the function exits

    info, err := f.Stat()
    if err != nil {
        return nil, fmt.Errorf("stat %s: %w", path, err)
    }

    buf := make([]byte, info.Size())
    _, err = f.Read(buf)
    if err != nil {
        return nil, fmt.Errorf("read %s: %w", path, err)
    }
    return buf, nil
}

// panic/recover: panic recovery at library boundaries
func safeDivide(a, b int) (result int, err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("recovered from panic: %v", r)
        }
    }()

    // When b is 0, integer division panics
    return a / b, nil
}

func main() {
    deferExample()

    result, err := safeDivide(10, 0)
    if err != nil {
        fmt.Printf("Error: %v\n", err)
    } else {
        fmt.Printf("Result: %d\n", result)
    }

    result, err = safeDivide(10, 3)
    if err != nil {
        fmt.Printf("Error: %v\n", err)
    } else {
        fmt.Printf("Result: %d\n", result)
    }
}
```

### Code Example 7: Slice and Map Operations

```go
package main

import (
    "fmt"
    "sort"
    "strings"
)

func main() {
    // Basic slice operations
    numbers := []int{5, 3, 8, 1, 9, 2, 7}

    // Sort
    sort.Ints(numbers)
    fmt.Println("sorted:", numbers)

    // append
    numbers = append(numbers, 10, 11)
    fmt.Println("appended:", numbers)

    // Slice expressions
    first3 := numbers[:3]
    last3 := numbers[len(numbers)-3:]
    fmt.Println("first 3:", first3)
    fmt.Println("last 3:", last3)

    // Specifying size with make
    buf := make([]byte, 0, 1024) // length=0, capacity=1024
    buf = append(buf, "hello"...)
    fmt.Printf("buf: %s (len=%d, cap=%d)\n", buf, len(buf), cap(buf))

    // Basic map operations
    scores := map[string]int{
        "Alice": 95,
        "Bob":   87,
        "Carol": 92,
    }

    // Adding and retrieving elements
    scores["Dave"] = 88

    // Existence check
    if score, ok := scores["Eve"]; ok {
        fmt.Printf("Eve's score: %d\n", score)
    } else {
        fmt.Println("Eve not found")
    }

    // Deletion
    delete(scores, "Bob")

    // Map iteration (order is non-deterministic)
    for name, score := range scores {
        fmt.Printf("%s: %d\n", name, score)
    }

    // String operations
    text := "Go is a statically typed, compiled language"
    words := strings.Fields(text)
    fmt.Printf("Word count: %d\n", len(words))
    fmt.Printf("Contains 'typed': %v\n", strings.Contains(text, "typed"))
    fmt.Printf("Upper: %s\n", strings.ToUpper(text))
}
```

### Code Example 8: Generics (Go 1.18+)

```go
package main

import (
    "fmt"
    "golang.org/x/exp/constraints"
)

// A function with type parameters
func MinT constraints.Ordered T {
    if a < b {
        return a
    }
    return b
}

func MaxT constraints.Ordered T {
    if a > b {
        return a
    }
    return b
}

// Generic slice operations
func FilterT any bool) []T {
    var result []T
    for _, v := range slice {
        if predicate(v) {
            result = append(result, v)
        }
    }
    return result
}

func MapT any, U any U) []U {
    result := make([]U, len(slice))
    for i, v := range slice {
        result[i] = transform(v)
    }
    return result
}

func ReduceT any, U any U) U {
    result := initial
    for _, v := range slice {
        result = reducer(result, v)
    }
    return result
}

// Defining a type constraint
type Number interface {
    ~int | ~int8 | ~int16 | ~int32 | ~int64 |
        ~float32 | ~float64
}

func SumT Number T {
    var total T
    for _, n := range numbers {
        total += n
    }
    return total
}

// A generic data structure
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, bool) {
    if len(s.items) == 0 {
        var zero T
        return zero, false
    }
    item := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return item, true
}

func (s *Stack[T]) Peek() (T, bool) {
    if len(s.items) == 0 {
        var zero T
        return zero, false
    }
    return s.items[len(s.items)-1], true
}

func (s *Stack[T]) Len() int {
    return len(s.items)
}

func main() {
    // Call generic functions with type inference
    fmt.Println(Min(3, 7))         // 3
    fmt.Println(Min("apple", "banana")) // "apple"
    fmt.Println(Max(3.14, 2.71))   // 3.14

    // Filter/Map/Reduce
    numbers := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}

    evens := Filter(numbers, func(n int) bool { return n%2 == 0 })
    fmt.Println("evens:", evens)

    doubled := Map(numbers, func(n int) int { return n * 2 })
    fmt.Println("doubled:", doubled)

    sum := Reduce(numbers, 0, func(acc, n int) int { return acc + n })
    fmt.Println("sum:", sum)

    // Generic Stack
    stack := &Stack[string]{}
    stack.Push("first")
    stack.Push("second")
    stack.Push("third")

    for stack.Len() > 0 {
        if item, ok := stack.Pop(); ok {
            fmt.Println("popped:", item)
        }
    }
}
```

---

## 2. History and Evolution of Go

### 2.1 Timeline

| Year | Version | Major Changes |
|-----|-----------|-----------|
| 2007 | -- | Design started (Griesemer, Pike, Thompson) |
| 2009 | -- | Released as open source |
| 2012 | Go 1.0 | Stable release. Go 1 compatibility guarantee begins |
| 2013 | Go 1.1 | Method values, improved integer division |
| 2014 | Go 1.3 | Contiguous stack memory (changed from segmented approach) |
| 2015 | Go 1.5 | Self-hosting (migrated from C to Go), concurrent GC |
| 2016 | Go 1.7 | context package added to the standard library |
| 2017 | Go 1.9 | Type aliases, sync.Map |
| 2018 | Go 1.11 | Go Modules introduced (experimental) |
| 2019 | Go 1.13 | Go Modules made default, errors.Is/As |
| 2020 | Go 1.16 | embed package, io/fs |
| 2022 | Go 1.18 | **Generics**, Fuzzing, Workspace |
| 2023 | Go 1.21 | min/max built-in functions, slog (structured logging) |
| 2023 | Go 1.22 | Loop variable scoping fix, enhanced net/http routing |
| 2024 | Go 1.23 | Iterators (range over func), timer improvements |

### 2.2 The Go 1 Compatibility Guarantee

One of Go's greatest strengths is the **Go 1 compatibility guarantee**. Code written for Go 1.0 can (in principle) still be compiled and executed with the latest Go compiler. This guarantee means:

- Source-level backward compatibility
- Behavioral compatibility of compiled binaries
- API stability of the standard library

However, changes due to bug fixes or clarification of undefined behavior may occur. Code using the `unsafe` package is also excluded from the guarantee.

---

## 3. ASCII Diagrams

### Diagram 1: Go's Compilation Flow

```
┌──────────┐    ┌──────────┐    ┌──────────────┐    ┌────────────┐
│ .go file │───>│  Parser  │───>│ Type Checker │───>│   Native   │
│ (source) │    │  (AST)   │    │  (SSA/IR)    │    │   Binary   │
└──────────┘    └──────────┘    └──────────────┘    └────────────┘
          The entire process completes in seconds (even for large projects)

Detailed flow:
┌─────────┐   ┌─────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│ Lexical │──>│ Parsing │──>│   Type   │──>│   SSA    │──>│   Code   │
│ (Lexer) │   │ (Parser)│   │ Checking │   │ Generate │   │   Gen    │
└─────────┘   └─────────┘   └──────────┘   └──────────┘   └──────────┘
     │              │              │              │              │
     ▼              ▼              ▼              ▼              ▼
  Token stream     AST         Typed AST     Optimized IR   Machine code

Optimization passes:
  SSA → dead code elimination → inlining → escape analysis → register allocation
```

### Diagram 2: Go's Memory Model

```
┌─────────────────────────────────────┐
│             Go Runtime              │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ G1   │ │ G2   │ │ G3   │ goroutine│
│  └──┬───┘ └──┬───┘ └──┬───┘        │
│     │        │        │             │
│  ┌──▼────────▼────────▼───┐         │
│  │    Scheduler (M:N)     │         │
│  └──┬────────┬────────┬───┘         │
│     │        │        │             │
│  ┌──▼───┐ ┌──▼───┐ ┌──▼───┐        │
│  │ OS   │ │ OS   │ │ OS   │ Thread  │
│  │Thread│ │Thread│ │Thread│        │
│  └──────┘ └──────┘ └──────┘        │
└─────────────────────────────────────┘

Memory management details:
┌─────────────────────────────────────┐
│                Heap                  │
│  ┌─────────┐ ┌─────────┐            │
│  │ Small   │ │ Large   │            │
│  │ objects │ │ objects │            │
│  │(mcache) │ │ (mheap) │            │
│  └─────────┘ └─────────┘            │
│                                      │
│  Escape analysis:                    │
│  - Local variables referenced outside│
│    their scope → allocated on heap   │
│  - Scope-contained → stack allocation│
│  - Verify with go build              │
│    -gcflags="-m"                     │
└─────────────────────────────────────┘
```

### Diagram 3: Go Toolchain

```
┌─────────────────────────────────────────┐
│           go command                    │
│                                         │
│  go build   ── Compile                  │
│  go test    ── Run tests                │
│  go run     ── Build + execute          │
│  go fmt     ── Format                   │
│  go vet     ── Static analysis          │
│  go mod     ── Module management        │
│  go generate── Code generation          │
│  go tool pprof ── Profiling             │
│  go doc     ── Show documentation       │
│  go install ── Install binaries         │
│  go env     ── Show environment vars    │
│  go clean   ── Delete build cache       │
│  go work    ── Workspace management     │
└─────────────────────────────────────────┘

Related external tools:
┌─────────────────────────────────────────┐
│  staticcheck  ── Advanced static analysis│
│  golangci-lint── Linter aggregator      │
│  dlv (delve)  ── Debugger               │
│  gopls        ── Language Server        │
│  govulncheck  ── Vulnerability checker  │
│  goreleaser   ── Release automation     │
└─────────────────────────────────────────┘
```

### Diagram 4: Go's Garbage Collection

```
Phases of Go GC:

Phase 1: Mark Setup (STW)
  Stop all goroutines → Enable write barrier
  ┌──────────────────────────────┐
  │  STW (< 1ms)                 │
  │  - Identify root objects     │
  │  - Enable write barrier      │
  └──────────────────────────────┘
              │
              ▼
Phase 2: Marking (Concurrent)
  Marking runs concurrently with the application
  ┌──────────────────────────────┐
  │  Concurrent marking          │
  │  - Mark reachable objects    │
  │  - Allocate 25% of CPU to GC │
  └──────────────────────────────┘
              │
              ▼
Phase 3: Mark Termination (STW)
  ┌──────────────────────────────┐
  │  STW (< 1ms)                 │
  │  - Confirm marking completion│
  │  - Disable write barrier     │
  └──────────────────────────────┘
              │
              ▼
Phase 4: Sweeping (Concurrent)
  ┌──────────────────────────────┐
  │  Concurrent sweep            │
  │  - Free unmarked objects     │
  │  - Performed gradually until │
  │    the next GC               │
  └──────────────────────────────┘

GOGC=100 (default):
  GC runs when the heap doubles compared to after the previous GC
  GOGC=50: more frequent GC (reduced memory, increased CPU load)
  GOGC=200: less frequent GC (increased memory, reduced CPU load)
  GOMEMLIMIT: set memory limit (Go 1.19+)
```

### Diagram 5: How Cross-Compilation Works

```
Go cross-compilation:

  Development machine (darwin/amd64)
  ┌────────────────────────────────────────┐
  │                                        │
  │  GOOS=linux GOARCH=amd64 go build      │
  │  → Generates a linux/amd64 binary      │
  │                                        │
  │  GOOS=windows GOARCH=amd64 go build    │
  │  → Generates a windows/amd64 binary    │
  │                                        │
  │  GOOS=linux GOARCH=arm64 go build      │
  │  → Generates a linux/arm64 binary      │
  │                                        │
  │  Use CGO_ENABLED=0 to force pure Go    │
  │  → Portable binary with no external C  │
  │    dependencies                        │
  └────────────────────────────────────────┘

List of supported platforms (partial):
  ┌─────────┬───────────────────────────┐
  │  GOOS   │  GOARCH                   │
  ├─────────┼───────────────────────────┤
  │ linux   │ amd64, arm64, 386, arm    │
  │ darwin  │ amd64, arm64              │
  │ windows │ amd64, arm64, 386         │
  │ freebsd │ amd64, arm64              │
  │ js      │ wasm                      │
  │ wasip1  │ wasm                      │
  └─────────┴───────────────────────────┘
```

---

## 4. Comparison Tables

### Table 1: Go vs Other Languages -- Design Philosophy Comparison

| Item | Go | Rust | Java | Python | TypeScript |
|------|-----|------|------|--------|------------|
| Type system | Static, structural subtyping | Static, ownership | Static, nominal | Dynamic | Static (gradual typing) |
| Memory management | GC | Ownership system | GC | GC + reference counting | GC (V8) |
| Concurrency model | goroutine + channel | async/await + thread | Thread + Virtual Thread | asyncio/thread | async/await (event loop) |
| Compilation speed | Very fast | Slow | Moderate | N/A (interpreted) | Fast (type checking only) |
| Binary size | Medium (statically linked) | Small-medium | Large (requires JVM) | N/A | N/A (requires runtime) |
| Learning curve | Gentle | Steep | Moderate | Gentle | Gentle to moderate |
| Error handling | Explicit (error) | Result/Option | Exceptions | Exceptions | Exceptions + Promise |
| Null safety | nil (pointers only) | Option type | Nullable annotation | None | strictNullChecks |

### Table 2: Domains Where Go Excels and Where It Doesn't

| Well-suited domain | Reason | Representative projects |
|-----------|------|-------------------|
| Microservices / API servers | Fast startup, low memory, concurrent processing | Docker, Kubernetes |
| CLI tools | Single binary, cross-compilation | Terraform, Hugo |
| DevOps / infrastructure tools | Single-binary deployment | Prometheus, Grafana |
| Network programming | Rich net package | CoreDNS, Caddy |
| Data pipelines | Ease of concurrency | CockroachDB, InfluxDB |
| Blockchain | Performance and concurrency | Ethereum (go-ethereum) |

| Unsuited domain | Reason |
|-------------|------|
| GUI desktop apps | Native GUI libraries are weak |
| Building ML models | Far from matching the Python ecosystem |
| Real-time systems (due to GC) | GC STW is unpredictable |
| Complex type-level programming | Type system is intentionally simple |
| Dynamic metaprogramming | reflect is limited, no macros |
| Game development | Lack of game engines, GC impact |

### Table 3: Build Mode Comparison

| Build mode | Command | Output | Use case |
|-------------|---------|------|------|
| Executable binary | `go build` | Single binary | Deployment |
| Run + build | `go run` | Temporary binary | Testing during development |
| Plugin | `go build -buildmode=plugin` | .so file | Dynamic loading |
| Shared library | `go build -buildmode=c-shared` | .so + .h | C/FFI integration |
| Static library | `go build -buildmode=c-archive` | .a + .h | C/FFI integration |

---

## 5. Overview of the Standard Library

Go's standard library is designed around the "batteries included" spirit, and it covers many use cases without requiring third-party dependencies.

### Table 4: Key Packages in the Standard Library

| Package | Purpose | Notable features |
|-----------|------|---------|
| `fmt` | Formatted I/O | Printf, Sprintf, Errorf |
| `io` | I/O primitives | Reader, Writer, Closer interfaces |
| `os` | OS features | File operations, environment variables, processes |
| `net/http` | HTTP client/server | Provides a production-quality HTTP server by default |
| `encoding/json` | JSON handling | Marshal/Unmarshal, streaming |
| `database/sql` | DB abstraction | Driver interface |
| `sync` | Synchronization primitives | Mutex, WaitGroup, Once |
| `context` | Cancellation and timeouts | Standard approach for goroutine control |
| `testing` | Test framework | Unit tests, benchmarks, fuzzing |
| `crypto` | Cryptography | TLS, AES, RSA, SHA |
| `strings` / `bytes` | String/byte operations | Builder, Reader, various conversions |
| `regexp` | Regular expressions | RE2 syntax (linear-time guarantee) |
| `time` | Time operations | Duration, Timer, Ticker |
| `log/slog` | Structured logging (Go 1.21+) | JSON/Text handlers |
| `embed` | File embedding (Go 1.16+) | Bundles files into the binary |
| `reflect` | Reflection | Runtime type info retrieval and manipulation |
| `sort` | Sorting | Slice, SliceStable |
| `math` | Math functions | Floating-point operations, random numbers |
| `html/template` | HTML templates | Automatic escaping to prevent XSS |
| `text/template` | Text templates | General-purpose template engine |

### Code Example 9: Building an HTTP Server with Only the Standard Library

```go
package main

import (
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "sync"
    "time"
)

// User represents user information
type User struct {
    ID        int       `json:"id"`
    Name      string    `json:"name"`
    Email     string    `json:"email"`
    CreatedAt time.Time `json:"created_at"`
}

// In-memory store
type UserStore struct {
    mu    sync.RWMutex
    users map[int]*User
    nextID int
}

func NewUserStore() *UserStore {
    return &UserStore{
        users:  make(map[int]*User),
        nextID: 1,
    }
}

func (s *UserStore) Create(name, email string) *User {
    s.mu.Lock()
    defer s.mu.Unlock()
    user := &User{
        ID:        s.nextID,
        Name:      name,
        Email:     email,
        CreatedAt: time.Now(),
    }
    s.users[user.ID] = user
    s.nextID++
    return user
}

func (s *UserStore) List() []*User {
    s.mu.RLock()
    defer s.mu.RUnlock()
    users := make([]*User, 0, len(s.users))
    for _, u := range s.users {
        users = append(users, u)
    }
    return users
}

func main() {
    store := NewUserStore()

    // Sample data
    store.Create("Alice", "alice@example.com")
    store.Create("Bob", "bob@example.com")

    // Routing (pattern matching in Go 1.22+)
    mux := http.NewServeMux()

    mux.HandleFunc("GET /api/users", func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(store.List())
    })

    mux.HandleFunc("POST /api/users", func(w http.ResponseWriter, r *http.Request) {
        var input struct {
            Name  string `json:"name"`
            Email string `json:"email"`
        }
        if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
            http.Error(w, "invalid request body", http.StatusBadRequest)
            return
        }
        user := store.Create(input.Name, input.Email)
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusCreated)
        json.NewEncoder(w).Encode(user)
    })

    mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprintln(w, "OK")
    })

    // Middleware: logging
    handler := loggingMiddleware(mux)

    server := &http.Server{
        Addr:         ":8080",
        Handler:      handler,
        ReadTimeout:  5 * time.Second,
        WriteTimeout: 10 * time.Second,
        IdleTimeout:  120 * time.Second,
    }

    log.Printf("Starting server on %s", server.Addr)
    log.Fatal(server.ListenAndServe())
}

func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
    })
}
```

### Code Example 10: How to Write Tests

```go
package main

import (
    "testing"
)

// Function under test
func Add(a, b int) int {
    return a + b
}

func Divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return a / b, nil
}

// Basic test
func TestAdd(t *testing.T) {
    got := Add(2, 3)
    want := 5
    if got != want {
        t.Errorf("Add(2, 3) = %d; want %d", got, want)
    }
}

// Table-driven tests (the standard Go pattern)
func TestDivide(t *testing.T) {
    tests := []struct {
        name    string
        a, b    float64
        want    float64
        wantErr bool
    }{
        {"normal division", 10, 3, 3.3333333333333335, false},
        {"exact division", 10, 2, 5.0, false},
        {"division by zero", 10, 0, 0, true},
        {"negative numbers", -10, 3, -3.3333333333333335, false},
        {"zero dividend", 0, 5, 0, false},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := Divide(tt.a, tt.b)
            if (err != nil) != tt.wantErr {
                t.Errorf("Divide(%v, %v) error = %v, wantErr %v",
                    tt.a, tt.b, err, tt.wantErr)
                return
            }
            if !tt.wantErr && got != tt.want {
                t.Errorf("Divide(%v, %v) = %v, want %v",
                    tt.a, tt.b, got, tt.want)
            }
        })
    }
}

// Benchmark
func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(100, 200)
    }
}

// Subtests, parallel tests
func TestAddParallel(t *testing.T) {
    t.Parallel()
    tests := []struct {
        a, b, want int
    }{
        {1, 2, 3},
        {0, 0, 0},
        {-1, 1, 0},
        {1000000, 1000000, 2000000},
    }

    for _, tt := range tests {
        tt := tt // Capture required prior to Go 1.21
        t.Run(fmt.Sprintf("%d+%d", tt.a, tt.b), func(t *testing.T) {
            t.Parallel()
            if got := Add(tt.a, tt.b); got != tt.want {
                t.Errorf("Add(%d, %d) = %d, want %d", tt.a, tt.b, got, tt.want)
            }
        })
    }
}
```

---

## 6. Anti-Patterns

### Anti-Pattern 1: Overusing init()

```go
// BAD: Performing complex initialization in init()
var db *sql.DB

func init() {
    db, _ = sql.Open("postgres", os.Getenv("DB_URL")) // Error ignored
    db.Ping()                                          // Hard to test
}

// Problems:
// 1. Errors are ignored
// 2. DB connection becomes mandatory during testing
// 3. Initialization order is unclear
// 4. Implicit dependency on environment variables

// GOOD: Call an initialization function explicitly
func NewDB(url string) (*sql.DB, error) {
    db, err := sql.Open("postgres", url)
    if err != nil {
        return nil, fmt.Errorf("db open: %w", err)
    }
    if err := db.Ping(); err != nil {
        return nil, fmt.Errorf("db ping: %w", err)
    }
    return db, nil
}

// Situations where init() is appropriate:
// - Driver registration: sql.Register(), image.RegisterFormat()
// - Constant computation: compiling regular expressions
```

### Anti-Pattern 2: Using panic in Place of Error Handling

```go
// BAD: Propagating errors via panic
func MustParse(s string) int {
    v, err := strconv.Atoi(s)
    if err != nil {
        panic(err) // Libraries should not panic
    }
    return v
}

// Situations where the Must pattern is acceptable:
// - Loading configuration in main() or during package initialization
// - Test helper functions
// - Global constant initialization like template.Must()

// GOOD: Return an error
func Parse(s string) (int, error) {
    v, err := strconv.Atoi(s)
    if err != nil {
        return 0, fmt.Errorf("parse %q: %w", s, err)
    }
    return v, nil
}

// A safe implementation when using the Must pattern
func MustCompileRegex(pattern string) *regexp.Regexp {
    re, err := regexp.Compile(pattern)
    if err != nil {
        panic(fmt.Sprintf("regexp: Compile(%q): %v", pattern, err))
    }
    return re
}

// Use at the package level (a value determined at init time)
var emailRegex = MustCompileRegex(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$`)
```

### Anti-Pattern 3: Over-Defining Interfaces Up Front

```go
// BAD: Defining an interface before it is used (Java-style thinking)
// Defining the interface on the producer side
package storage

type Storage interface {  // A large interface from the start
    Get(key string) ([]byte, error)
    Set(key, value string) error
    Delete(key string) error
    List(prefix string) ([]string, error)
    Watch(key string) <-chan Event
}

type S3Storage struct { /* ... */ }
// S3Storage implements Storage

// GOOD: Define the minimum required interface on the consumer side
package handler

// Getter is the interface the handler package needs
type Getter interface {
    Get(key string) ([]byte, error)
}

// UserHandler only needs Get from Storage
type UserHandler struct {
    store Getter  // Small interface
}

func NewUserHandler(store Getter) *UserHandler {
    return &UserHandler{store: store}
}
```

### Anti-Pattern 4: Excessive Use of context.Background()

```go
// BAD: Using context.Background() everywhere
func fetchData() (*Data, error) {
    ctx := context.Background() // Cannot be cancelled
    resp, err := http.NewRequestWithContext(ctx, "GET", url, nil)
    // ...
}

// GOOD: Receive the context from the caller
func fetchData(ctx context.Context) (*Data, error) {
    req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
    if err != nil {
        return nil, fmt.Errorf("create request: %w", err)
    }
    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return nil, fmt.Errorf("do request: %w", err)
    }
    defer resp.Body.Close()
    // ...
}

// It is conventional to pass context as the first argument
// func DoSomething(ctx context.Context, args ...T) error
```

### Anti-Pattern 5: Skipping Error Checks

```go
// BAD: Ignoring errors with _
data, _ := json.Marshal(user)
_ = os.Remove(tmpFile)
fmt.Fprintf(w, "hello") // io.Writer error ignored

// GOOD: Check all errors
data, err := json.Marshal(user)
if err != nil {
    return fmt.Errorf("marshal user: %w", err)
}

if err := os.Remove(tmpFile); err != nil {
    log.Printf("warning: failed to remove temp file: %v", err)
    // Cleanup failures are fine to log only if non-fatal
}

if _, err := fmt.Fprintf(w, "hello"); err != nil {
    return fmt.Errorf("write response: %w", err)
}
```

---

## 7. Development Environment Setup

### 7.1 Installation and Initial Setup

```bash
# macOS
brew install go

# Linux
wget https://go.dev/dl/go1.23.0.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.23.0.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin

# Check version
go version

# Environment variables
go env GOPATH    # Path to the workspace
go env GOROOT    # Go installation location
go env GOPROXY   # Module proxy

# Create a new project
mkdir myproject && cd myproject
go mod init github.com/myorg/myproject
```

### 7.2 Editors / IDEs

| Editor | Go support | Features |
|---------|-----------|------|
| VS Code + Go extension | gopls (Language Server) | Most widely used. Debugging, test integration |
| GoLand (JetBrains) | Native | Most feature-rich. Paid |
| Vim/Neovim + vim-go | gopls | Lightweight. For Vim users |
| Emacs + lsp-mode | gopls | For Emacs users |

### 7.3 Commonly Used Commands

```bash
# Build and test
go build ./...              # Build all packages
go test ./...               # Run all tests
go test -race ./...         # Detect race conditions
go test -cover ./...        # Tests with coverage
go test -bench=. ./...      # Run benchmarks
go test -fuzz=FuzzXxx ./... # Fuzzing tests (Go 1.18+)

# Code quality
go fmt ./...                # Format
go vet ./...                # Static analysis
golangci-lint run ./...     # Composite linter

# Dependency management
go mod tidy                 # Remove unused dependencies, add missing ones
go mod download             # Download dependencies
go mod vendor               # Copy dependencies to vendor directory
go mod graph                # Show the dependency graph

# Documentation and profiling
go doc fmt.Println          # Show documentation
go tool pprof cpu.prof      # Analyze CPU profile
go tool trace trace.out     # Analyze trace
```


---

## Practical Exercises

### Exercise 1: Basic Implementation

Implement code that satisfies the following requirements.

**Requirements:**
- Validate input data
- Implement proper error handling
- Write test code as well

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
        """Main data processing logic"""
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
        assert False, "Should have raised an exception"
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
        """Get statistics"""
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

    print(f"Inefficient version: {slow_time:.4f}s")
    print(f"Efficient version:   {fast_time:.6f}s")
    print(f"Speedup: {slow_time/fast_time:.0f}x")

benchmark()
```

**Key points:**
- Be aware of algorithmic complexity
- Choose appropriate data structures
- Measure the effect with benchmarks
---

## 8. FAQ

### Q1: Why were generics added to Go later?

Go's designers prioritized "simplicity" above all else and intentionally omitted generics from the initial release (2009). Type parameters were introduced in Go 1.18 (2022) after more than ten years of debate and design study. It was a philosophical decision to wait until a design was found that could preserve simplicity while providing practical type safety.

Before generics were introduced, Go developers compensated for their absence in the following ways:
- Using `interface{}` (any) for generic code (at the cost of type safety)
- Code generation tools (`go generate`, `stringer`, etc.)
- Copy and paste (duplicating the same logic for each type)

The generics introduced in Go 1.18 are simple compared to those of other languages. Type constraints are expressed as interfaces, and higher-kinded types and specialization are not included.

### Q2: Does Go's garbage collector affect latency?

Go's GC is designed for low latency (target: STW < 1ms). Since Go 1.5, concurrent GC has significantly improved this. It is rarely a problem for most web services, but if microsecond-level latency is required, consider the following:

- Reduce GC load with `sync.Pool` and object reuse
- Tune GC frequency with the `GOGC` environment variable
- Set a memory limit with `GOMEMLIMIT` (Go 1.19+)
- Experimental use of the arena package
- Reduce allocations (maximize stack allocation)

```go
// GC tuning example
// GOGC=100 (default): run GC when the heap grows by 100%
// GOGC=50: more frequent GC, reduces memory usage
// GOGC=200: less frequent GC, saves CPU
// GOMEMLIMIT=4GiB: set a heap upper limit

// Check from within the program
import "runtime/debug"

func init() {
    debug.SetGCPercent(100)
    debug.SetMemoryLimit(4 << 30) // 4 GiB
}
```

### Q3: Is Go suitable for large-scale development?

Yes. Google operates Go codebases comprising millions of lines internally. Factors that support large-scale development:

1. **gofmt**: All code uses the same style. No style debates in code review
2. **Fast compilation**: Millions of lines can be built in tens of seconds
3. **Package system**: Clear visibility control (uppercase/lowercase, internal)
4. **Static typing**: Refactoring is safe
5. **go vet / staticcheck**: Automatic bug detection
6. **Standardized testing**: The testing package is integrated into the language

However, the expressive power of the type system is inferior to Rust or Haskell in some respects. You may feel constrained when you want to express complex domain models through types.

### Q4: How should Go and Rust be used differently?

| Criterion | Choose Go | Choose Rust |
|---------|----------|------------|
| Development speed | Team-wide productivity matters | Performance is the top priority |
| GC | Acceptable (e.g., web APIs) | Not acceptable (OS, embedded) |
| Team size | Large, diverse skill levels | Small, high-skill |
| Safety | Memory safety (guaranteed by GC) | Memory safety (guaranteed by ownership) + concurrency safety |
| Ecosystem | Rich in cloud-native | Rich in systems programming |
| Learning curve | Days to weeks | Weeks to months |

### Q5: How should dependency injection be done in Go?

In Go, framework-based dependency injection (Spring, Guice, etc.) is uncommon. Instead, simple dependency injection via constructor functions is recommended:

```go
// Define dependencies as interfaces
type UserRepository interface {
    FindByID(ctx context.Context, id int) (*User, error)
}

type EmailSender interface {
    Send(ctx context.Context, to, subject, body string) error
}

// Inject through a constructor
type UserService struct {
    repo   UserRepository
    mailer EmailSender
    logger *slog.Logger
}

func NewUserService(repo UserRepository, mailer EmailSender, logger *slog.Logger) *UserService {
    return &UserService{
        repo:   repo,
        mailer: mailer,
        logger: logger,
    }
}

// Assemble in main() (Composition Root)
func main() {
    db := connectDB()
    repo := postgres.NewUserRepository(db)
    mailer := smtp.NewEmailSender(smtpConfig)
    logger := slog.Default()

    svc := NewUserService(repo, mailer, logger)
    handler := NewUserHandler(svc)
    // ...
}
```

### Q6: Isn't Go's error handling too verbose?

The repetition of `if err != nil` can certainly look verbose, but it has the following benefits:

1. **Missed error handling stands out**: Explicit checks make intentional choices to ignore errors obvious
2. **Clear control flow**: Without try-catch style jumps, the flow of code is easy to read
3. **Easy to add context**: `fmt.Errorf("context: %w", err)` lets each layer add information
4. **Easy to test**: Error-path testing is straightforward

Techniques to reduce verbosity:
```go
// Bundle with a helper function
func mustT any T {
    if err != nil {
        panic(err)
    }
    return v
}

// errWriter pattern (used in bufio.Scanner, etc.)
type errWriter struct {
    w   io.Writer
    err error
}

func (ew *errWriter) write(buf []byte) {
    if ew.err != nil {
        return
    }
    _, ew.err = ew.w.Write(buf)
}
```

---


## FAQ

### Q1: What is the most important point to focus on when learning this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory, but by actually writing and running code to see how things work.

### Q2: What are common mistakes beginners make?

Skipping the basics and jumping to advanced topics. We recommend solidly understanding the fundamental concepts explained in this guide before moving on to the next step.

### Q3: How is this applied in real-world development?

The knowledge from this topic is frequently applied in day-to-day development work. It becomes especially important during code reviews and architecture design.

---

## 9. Summary

| Concept | Key points |
|------|------|
| Design philosophy | Simplicity, orthogonality, explicit error handling |
| Concurrency | The CSP model with goroutines + channels |
| Compilation | Static linking, fast builds, cross-compilation support |
| Toolchain | go build/test/fmt/vet integrated by default |
| Type system | Structural subtyping, generics in Go 1.18+ |
| GC | Low-latency, concurrent GC, tunable via GOGC/GOMEMLIMIT |
| Ecosystem | Rich standard library, third-party managed with go get |
| Compatibility guarantee | Long-term stability via the Go 1 compatibility guarantee |
| Developer experience | Unified by gofmt, IDE integration via gopls, race detector included |
| Deployment | Single binary, easy to minimize Docker images |

---

## Recommended Next Reads

- [01-types-and-structs.md](./01-types-and-structs.md) -- Details of types and structs
- [02-error-handling.md](./02-error-handling.md) -- Error handling patterns
- [../01-concurrency/00-goroutines-channels.md](../01-concurrency/00-goroutines-channels.md) -- Introduction to concurrent programming

---

## References

1. **The Go Programming Language Specification** -- https://go.dev/ref/spec
2. **Effective Go** -- https://go.dev/doc/effective_go
3. **Rob Pike, "Go Proverbs"** -- https://go-proverbs.github.io/
4. **Donovan, A. & Kernighan, B. (2015) "The Go Programming Language"** -- Addison-Wesley
5. **Go Blog** -- https://go.dev/blog/
6. **Go Wiki: Go Code Review Comments** -- https://go.dev/wiki/CodeReviewComments
7. **Go FAQ** -- https://go.dev/doc/faq
8. **Russ Cox, "Go & Versioning"** -- https://research.swtch.com/vgo
9. **Go Memory Model** -- https://go.dev/ref/mem
10. **Go Release Notes** -- https://go.dev/doc/devel/release



===== SOURCE: 02-programming/go-practical-guide/docs/00-basics/01-types-and-structs.md =====

# Types and Structs -- Understanding Go's Type System

> Go adopts static typing and structural subtyping, achieving flexible yet safe data modeling through structs, interfaces, and type assertions.

---

## What You Will Learn in This Chapter

1. **Basic and composite types** -- From int/string/slice to struct
2. **Interfaces and structural subtyping** -- Implicit interface satisfaction
3. **Type assertion and type switch** -- Safe ways to perform dynamic type checks
4. **Generics and type constraints** -- Type parameters in Go 1.18+
5. **Practical data modeling** -- Techniques for designing domain models


## Prerequisites

Before reading this guide, the following knowledge will help deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts
- Understanding of [Go Language Overview -- Design Philosophy and Ecosystem](./00-go-overview.md)

---

## 1. Basic Types

### 1.1 Details of Numeric Types

Go gives its integer and floating-point types explicit bit widths. This makes behavior predictable across platforms.

| Type | Size | Range | Use Case |
|----|--------|------|------|
| `int8` | 1 byte | -128 to 127 | When memory conservation is needed |
| `int16` | 2 bytes | -32768 to 32767 | When memory conservation is needed |
| `int32` | 4 bytes | -2^31 to 2^31-1 | Alias for rune |
| `int64` | 8 bytes | -2^63 to 2^63-1 | Timestamps, large integers |
| `int` | 4 or 8 bytes | Platform-dependent | General-purpose integer (default) |
| `uint8` | 1 byte | 0 to 255 | Alias for byte |
| `uint16` | 2 bytes | 0 to 65535 | Port numbers, etc. |
| `uint32` | 4 bytes | 0 to 2^32-1 | IPv4 addresses, etc. |
| `uint64` | 8 bytes | 0 to 2^64-1 | Hash values, etc. |
| `float32` | 4 bytes | IEEE 754 single precision | GPU computation, memory saving |
| `float64` | 8 bytes | IEEE 754 double precision | General-purpose floating-point (default) |
| `complex64` | 8 bytes | float32 real+imaginary | Signal processing, etc. |
| `complex128` | 16 bytes | float64 real+imaginary | Scientific computing, etc. |

### Code Example 1: Declaring and Manipulating Basic Types

```go
package main

import (
    "fmt"
    "math"
    "unicode/utf8"
)

func main() {
    // Declaring basic types
    var (
        i    int     = 42
        f    float64 = 3.14
        s    string  = "hello"
        b    bool    = true
        r    rune    = '日'    // alias for int32
        by   byte    = 0xFF   // alias for uint8
    )

    // Short declaration (type inference)
    x := 100           // int
    pi := 3.14159      // float64
    msg := "Go言語"     // string
    flag := true        // bool

    // Type conversion (implicit conversion is not allowed; explicit conversion is required)
    var n int = 42
    var f64 float64 = float64(n)       // int -> float64
    var n32 int32 = int32(n)           // int -> int32
    var u uint = uint(n)               // int -> uint (beware of negative values)

    // Relationship between strings and byte sequences
    str := "Hello, 世界"
    bytes := []byte(str)               // string -> byte slice
    runes := []rune(str)               // string -> rune slice

    fmt.Printf("len(str)=%d bytes\n", len(str))           // 13 bytes (UTF-8)
    fmt.Printf("rune count=%d\n", utf8.RuneCountInString(str)) // 9 characters
    fmt.Printf("runes=%v\n", runes)                       // Unicode code points

    // Numeric limits
    fmt.Printf("int8 max: %d\n", math.MaxInt8)
    fmt.Printf("int64 max: %d\n", math.MaxInt64)
    fmt.Printf("float64 max: %e\n", math.MaxFloat64)

    // Bitwise operations
    a := 0b1010  // 10
    b2 := 0b1100 // 12
    fmt.Printf("AND: %04b\n", a&b2)   // 1000
    fmt.Printf("OR:  %04b\n", a|b2)   // 1110
    fmt.Printf("XOR: %04b\n", a^b2)   // 0110
    fmt.Printf("NOT: %04b\n", ^a)     // ...0101

    _ = i; _ = f; _ = s; _ = b; _ = r; _ = by
    _ = x; _ = pi; _ = msg; _ = flag
    _ = f64; _ = n32; _ = u; _ = bytes
}
```

### 1.2 Internal Structure of Strings

Strings in Go are immutable byte sequences. Internally, `string` has the following structure:

```go
// runtime/string.go (conceptual structure)
type stringHeader struct {
    Data unsafe.Pointer  // pointer to the byte sequence
    Len  int             // byte length
}
```

Important characteristics of strings:
- Immutable (cannot be changed once created)
- UTF-8 encoding
- `len()` returns the number of bytes (not characters)
- Index access is byte-based
- `range` loops iterate by rune (Unicode code points)

```go
package main

import (
    "fmt"
    "strings"
    "unicode/utf8"
)

func main() {
    s := "Go言語プログラミング"

    // Byte-level operations
    fmt.Printf("len=%d bytes\n", len(s))  // number of bytes

    // Rune-level iteration
    for i, r := range s {
        fmt.Printf("byte_offset=%d, rune=%c, unicode=%U\n", i, r, r)
    }

    // String concatenation
    // For a small number of concatenations, the + operator is sufficient
    greeting := "Hello" + ", " + "World"

    // For many concatenations, use strings.Builder (efficient)
    var builder strings.Builder
    for i := 0; i < 1000; i++ {
        fmt.Fprintf(&builder, "item %d, ", i)
    }
    result := builder.String()
    _ = result

    // String slicing (byte-based)
    sub := s[:2]  // "Go" (ASCII characters, so bytes and runes match)
    fmt.Println(sub)

    // Safely handling multi-byte characters
    runes := []rune(s)
    first3 := string(runes[:3])  // "Go言"
    fmt.Println(first3)

    // Character count
    fmt.Printf("rune count=%d\n", utf8.RuneCountInString(s))

    _ = greeting
}
```

### Code Example 2: Struct Definition and Methods

```go
package main

import (
    "encoding/json"
    "fmt"
    "time"
)

// User is a struct representing user information
type User struct {
    ID        int       `json:"id"`
    Name      string    `json:"name"`
    Email     string    `json:"email"`
    Age       int       `json:"age,omitempty"`       // omit when 0
    IsAdmin   bool      `json:"is_admin"`
    CreatedAt time.Time `json:"created_at"`
    password  string    // private field (starts with lowercase)
}

// NewUser is a factory function for User (equivalent to a constructor)
func NewUser(name, email string) *User {
    return &User{
        Name:      name,
        Email:     email,
        CreatedAt: time.Now(),
    }
}

// DisplayName returns the display name (value receiver -- does not modify the struct)
func (u User) DisplayName() string {
    return fmt.Sprintf("%s (%d)", u.Name, u.ID)
}

// UpdateEmail updates the email address (pointer receiver -- modifies the struct)
func (u *User) UpdateEmail(email string) {
    u.Email = email
}

// SetPassword sets the password
func (u *User) SetPassword(password string) {
    u.password = password // access to a private field
}

// Validate performs validation
func (u User) Validate() error {
    if u.Name == "" {
        return fmt.Errorf("name is required")
    }
    if u.Email == "" {
        return fmt.Errorf("email is required")
    }
    if u.Age < 0 || u.Age > 200 {
        return fmt.Errorf("invalid age: %d", u.Age)
    }
    return nil
}

// String implements the fmt.Stringer interface
func (u User) String() string {
    return fmt.Sprintf("User{id=%d, name=%q, email=%q}", u.ID, u.Name, u.Email)
}

// MarshalJSON provides custom JSON serialization
func (u User) MarshalJSON() ([]byte, error) {
    type Alias User // avoid infinite recursion
    return json.Marshal(&struct {
        Alias
        CreatedAtStr string `json:"created_at_formatted"`
    }{
        Alias:        Alias(u),
        CreatedAtStr: u.CreatedAt.Format("2006-01-02 15:04:05"),
    })
}

func main() {
    user := NewUser("Alice", "alice@example.com")
    user.ID = 1
    user.Age = 30
    user.SetPassword("secret123")

    fmt.Println(user)
    fmt.Println(user.DisplayName())

    if err := user.Validate(); err != nil {
        fmt.Printf("Validation error: %v\n", err)
    }

    // JSON serialization
    data, _ := json.MarshalIndent(user, "", "  ")
    fmt.Println(string(data))

    // JSON deserialization
    jsonStr := `{"id":2,"name":"Bob","email":"bob@example.com","age":25}`
    var user2 User
    json.Unmarshal([]byte(jsonStr), &user2)
    fmt.Println(user2)
}
```

### Code Example 3: Struct Embedding and Delegation

```go
package main

import (
    "fmt"
    "time"
)

// BaseModel provides common fields
type BaseModel struct {
    ID        int
    CreatedAt time.Time
    UpdatedAt time.Time
}

// BeforeSave updates timestamps before saving
func (b *BaseModel) BeforeSave() {
    now := time.Now()
    if b.CreatedAt.IsZero() {
        b.CreatedAt = now
    }
    b.UpdatedAt = now
}

// Animal holds basic animal information
type Animal struct {
    Name string
    Age  int
}

func (a Animal) Speak() string {
    return fmt.Sprintf("I am %s, %d years old", a.Name, a.Age)
}

func (a Animal) Move() string {
    return "moving..."
}

// Dog embeds Animal (composition, not inheritance)
type Dog struct {
    Animal        // embedding
    Breed  string
}

// Speak overrides Animal's Speak (method shadowing)
func (d Dog) Speak() string {
    return fmt.Sprintf("Woof! I am %s the %s", d.Name, d.Breed)
}

// Cat also embeds Animal
type Cat struct {
    Animal
    Indoor bool
}

func (c Cat) Speak() string {
    return fmt.Sprintf("Meow! I am %s", c.Name)
}

// Product is a practical example that embeds BaseModel
type Product struct {
    BaseModel
    Name     string
    Price    float64
    Category string
    Tags     []string
}

func (p *Product) Save() {
    p.BeforeSave() // BaseModel's method is promoted and usable
    fmt.Printf("Saving product: %s (created=%v, updated=%v)\n",
        p.Name, p.CreatedAt.Format("15:04:05"), p.UpdatedAt.Format("15:04:05"))
}

// Multiple embedding
type Logger struct{}
func (l Logger) Log(msg string) { fmt.Printf("[LOG] %s\n", msg) }

type Metrics struct{}
func (m Metrics) Record(name string, value float64) {
    fmt.Printf("[METRIC] %s=%.2f\n", name, value)
}

type Service struct {
    Logger  // logging capability
    Metrics // metrics capability
    Name string
}

func main() {
    d := Dog{
        Animal: Animal{Name: "Pochi", Age: 3},
        Breed:  "Shiba",
    }
    fmt.Println(d.Speak())  // Dog.Speak() is called
    fmt.Println(d.Move())   // Animal.Move() is promoted and called
    fmt.Println(d.Name)     // shorthand for d.Animal.Name
    fmt.Println(d.Animal.Speak()) // explicitly call the original Animal.Speak()

    p := &Product{
        Name:     "Go Book",
        Price:    4980,
        Category: "Books",
        Tags:     []string{"programming", "golang"},
    }
    p.Save()

    svc := Service{Name: "UserService"}
    svc.Log("service started")        // Logger.Log is promoted
    svc.Record("requests", 42.0)      // Metrics.Record is promoted
}
```

### Code Example 4: Interfaces and Structural Subtyping

```go
package main

import (
    "fmt"
    "io"
    "math"
    "strings"
)

// Small interfaces (the recommended pattern in Go)
type Stringer interface {
    String() string
}

type Area interface {
    Area() float64
}

type Perimeter interface {
    Perimeter() float64
}

// Composing interfaces
type Shape interface {
    Area
    Perimeter
    Stringer
}

// Concrete type: Circle
type Circle struct {
    Radius float64
}

func (c Circle) Area() float64 {
    return math.Pi * c.Radius * c.Radius
}

func (c Circle) Perimeter() float64 {
    return 2 * math.Pi * c.Radius
}

func (c Circle) String() string {
    return fmt.Sprintf("Circle{radius=%.2f}", c.Radius)
}

// Concrete type: Rectangle
type Rectangle struct {
    Width, Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func (r Rectangle) Perimeter() float64 {
    return 2 * (r.Width + r.Height)
}

func (r Rectangle) String() string {
    return fmt.Sprintf("Rectangle{%.2f x %.2f}", r.Width, r.Height)
}

// Concrete type: Triangle
type Triangle struct {
    A, B, C float64 // lengths of the three sides
}

func (t Triangle) Area() float64 {
    s := (t.A + t.B + t.C) / 2
    return math.Sqrt(s * (s - t.A) * (s - t.B) * (s - t.C))
}

func (t Triangle) Perimeter() float64 {
    return t.A + t.B + t.C
}

func (t Triangle) String() string {
    return fmt.Sprintf("Triangle{a=%.2f, b=%.2f, c=%.2f}", t.A, t.B, t.C)
}

// Function that takes a Shape (polymorphism)
func printShapeInfo(s Shape) {
    fmt.Printf("%s: area=%.2f, perimeter=%.2f\n", s, s.Area(), s.Perimeter())
}

// Function that requires only Area (minimal interface)
func totalArea(shapes []Area) float64 {
    var total float64
    for _, s := range shapes {
        total += s.Area()
    }
    return total
}

// Example using io.Reader
func countLines(r io.Reader) (int, error) {
    buf := make([]byte, 32*1024)
    count := 0
    for {
        n, err := r.Read(buf)
        for i := 0; i < n; i++ {
            if buf[i] == '\n' {
                count++
            }
        }
        if err != nil {
            if err == io.EOF {
                return count, nil
            }
            return count, err
        }
    }
}

func main() {
    shapes := []Shape{
        Circle{Radius: 5},
        Rectangle{Width: 10, Height: 3},
        Triangle{A: 3, B: 4, C: 5},
    }

    for _, s := range shapes {
        printShapeInfo(s)
    }

    // Use as Area interface
    areas := make([]Area, len(shapes))
    for i, s := range shapes {
        areas[i] = s
    }
    fmt.Printf("Total area: %.2f\n", totalArea(areas))

    // Using io.Reader
    text := "line 1\nline 2\nline 3\n"
    reader := strings.NewReader(text)
    lines, _ := countLines(reader)
    fmt.Printf("Lines: %d\n", lines)
}
```

### Code Example 5: Type Assertion and Type Switch

```go
package main

import (
    "fmt"
    "io"
    "os"
    "strings"
)

// Practical use of type switch
type Result struct {
    Value interface{}
    Err   error
}

func describe(i interface{}) string {
    switch v := i.(type) {
    case nil:
        return "nil"
    case int:
        return fmt.Sprintf("integer: %d", v)
    case int64:
        return fmt.Sprintf("int64: %d", v)
    case float64:
        return fmt.Sprintf("float64: %.2f", v)
    case string:
        return fmt.Sprintf("string: %q (len=%d)", v, len(v))
    case bool:
        return fmt.Sprintf("bool: %t", v)
    case []byte:
        return fmt.Sprintf("bytes: %x (len=%d)", v, len(v))
    case []int:
        return fmt.Sprintf("[]int: %v (len=%d)", v, len(v))
    case map[string]interface{}:
        return fmt.Sprintf("map: %d entries", len(v))
    case error:
        return fmt.Sprintf("error: %v", v)
    case fmt.Stringer:
        return fmt.Sprintf("Stringer: %s", v.String())
    case io.Reader:
        return "io.Reader"
    default:
        return fmt.Sprintf("unknown: %T = %v", v, v)
    }
}

// Safe type assertion (comma-ok idiom)
func toInt(i interface{}) (int, bool) {
    v, ok := i.(int)
    return v, ok
}

// Extending functionality via interface type assertion
type Closer interface {
    Close() error
}

type Flusher interface {
    Flush() error
}

func cleanup(w io.Writer) error {
    // If the writer also implements the Flusher interface, call Flush
    if f, ok := w.(Flusher); ok {
        if err := f.Flush(); err != nil {
            return fmt.Errorf("flush: %w", err)
        }
    }

    // If the writer also implements the Closer interface, call Close
    if c, ok := w.(Closer); ok {
        if err := c.Close(); err != nil {
            return fmt.Errorf("close: %w", err)
        }
    }

    return nil
}

// Type constraint that requires multiple interfaces
type ReadWriteCloser interface {
    io.Reader
    io.Writer
    io.Closer
}

// Type-safe handling of JSON decoded results
func processJSON(data map[string]interface{}) {
    for key, val := range data {
        switch v := val.(type) {
        case string:
            fmt.Printf("  %s: string = %q\n", key, v)
        case float64: // JSON numbers become float64
            if v == float64(int(v)) {
                fmt.Printf("  %s: int = %d\n", key, int(v))
            } else {
                fmt.Printf("  %s: float = %.2f\n", key, v)
            }
        case bool:
            fmt.Printf("  %s: bool = %t\n", key, v)
        case nil:
            fmt.Printf("  %s: null\n", key)
        case []interface{}:
            fmt.Printf("  %s: array (len=%d)\n", key, len(v))
        case map[string]interface{}:
            fmt.Printf("  %s: object (keys=%d)\n", key, len(v))
        }
    }
}

func main() {
    // Usage example for describe
    values := []interface{}{
        42, 3.14, "hello", true, nil,
        []byte{0xDE, 0xAD},
        []int{1, 2, 3},
        os.Stdout,
    }

    for _, v := range values {
        fmt.Println(describe(v))
    }

    // Safe type assertion
    var i interface{} = 42
    if n, ok := toInt(i); ok {
        fmt.Printf("Got int: %d\n", n)
    }

    var s interface{} = "not an int"
    if _, ok := toInt(s); !ok {
        fmt.Println("Not an int")
    }

    // Usage example for cleanup
    reader := strings.NewReader("test")
    cleanup(reader) // Does not have Close/Flush -> does nothing

    // Processing JSON results
    data := map[string]interface{}{
        "name":   "Alice",
        "age":    30.0,
        "active": true,
        "score":  95.5,
        "tags":   []interface{}{"go", "programming"},
    }
    fmt.Println("JSON data:")
    processJSON(data)
}
```

### Code Example 6: Custom Types and Type Conversion

```go
package main

import (
    "fmt"
    "strings"
    "time"
)

// Increase type safety with custom types
type UserID int64
type OrderID int64
type ProductID int64

// Prevent mixing different ID types
// var uid UserID = OrderID(1) // compile error: cannot use OrderID(1) as type UserID

// Temperature type example
type Celsius float64
type Fahrenheit float64
type Kelvin float64

func (c Celsius) ToFahrenheit() Fahrenheit {
    return Fahrenheit(c*9/5 + 32)
}

func (c Celsius) ToKelvin() Kelvin {
    return Kelvin(c + 273.15)
}

func (f Fahrenheit) ToCelsius() Celsius {
    return Celsius((f - 32) * 5 / 9)
}

func (c Celsius) String() string {
    return fmt.Sprintf("%.1f°C", float64(c))
}

func (f Fahrenheit) String() string {
    return fmt.Sprintf("%.1f°F", float64(f))
}

func (k Kelvin) String() string {
    return fmt.Sprintf("%.1fK", float64(k))
}

// Custom string type
type Email string

func (e Email) Validate() error {
    s := string(e)
    if !strings.Contains(s, "@") {
        return fmt.Errorf("invalid email: %q", s)
    }
    parts := strings.Split(s, "@")
    if len(parts) != 2 || parts[0] == "" || parts[1] == "" {
        return fmt.Errorf("invalid email format: %q", s)
    }
    if !strings.Contains(parts[1], ".") {
        return fmt.Errorf("invalid email domain: %q", parts[1])
    }
    return nil
}

func (e Email) Domain() string {
    parts := strings.Split(string(e), "@")
    if len(parts) == 2 {
        return parts[1]
    }
    return ""
}

func (e Email) String() string {
    return string(e)
}

// Custom Duration wrapper
type Timeout time.Duration

func (t Timeout) Duration() time.Duration {
    return time.Duration(t)
}

func (t Timeout) String() string {
    return time.Duration(t).String()
}

// Emulating an enum (using iota)
type Status int

const (
    StatusPending  Status = iota // 0
    StatusActive                  // 1
    StatusInactive                // 2
    StatusDeleted                 // 3
)

func (s Status) String() string {
    names := [...]string{"pending", "active", "inactive", "deleted"}
    if int(s) < len(names) {
        return names[s]
    }
    return fmt.Sprintf("Status(%d)", s)
}

func (s Status) IsValid() bool {
    return s >= StatusPending && s <= StatusDeleted
}

// Bit-flag enum
type Permission uint8

const (
    PermRead    Permission = 1 << iota // 1
    PermWrite                           // 2
    PermExecute                         // 4
    PermAdmin                           // 8
)

func (p Permission) Has(flag Permission) bool {
    return p&flag != 0
}

func (p Permission) String() string {
    var perms []string
    if p.Has(PermRead) {
        perms = append(perms, "read")
    }
    if p.Has(PermWrite) {
        perms = append(perms, "write")
    }
    if p.Has(PermExecute) {
        perms = append(perms, "execute")
    }
    if p.Has(PermAdmin) {
        perms = append(perms, "admin")
    }
    if len(perms) == 0 {
        return "none"
    }
    return strings.Join(perms, "|")
}

func main() {
    // Temperature conversion
    temp := Celsius(100)
    fmt.Printf("%s = %s = %s\n", temp, temp.ToFahrenheit(), temp.ToKelvin())

    // Email validation
    emails := []Email{
        "alice@example.com",
        "invalid-email",
        "bob@",
    }
    for _, e := range emails {
        if err := e.Validate(); err != nil {
            fmt.Printf("  %s: %v\n", e, err)
        } else {
            fmt.Printf("  %s: valid (domain=%s)\n", e, e.Domain())
        }
    }

    // Status
    status := StatusActive
    fmt.Printf("Status: %s (valid=%t)\n", status, status.IsValid())

    // Permissions (bit flags)
    perm := PermRead | PermWrite
    fmt.Printf("Permissions: %s\n", perm)
    fmt.Printf("Has read: %t\n", perm.Has(PermRead))
    fmt.Printf("Has admin: %t\n", perm.Has(PermAdmin))

    perm = perm | PermAdmin
    fmt.Printf("After adding admin: %s\n", perm)
}
```

### Code Example 7: Internal Structure and Operations of Slices

```go
package main

import (
    "fmt"
    "slices" // Go 1.21+
    "sort"
)

// Internal structure of a slice (conceptual)
// type slice struct {
//     array unsafe.Pointer  // pointer to the underlying array
//     len   int             // length
//     cap   int             // capacity
// }

func main() {
    // Ways to create slices
    s1 := []int{1, 2, 3, 4, 5}       // literal
    s2 := make([]int, 5)              // make (length=5, capacity=5)
    s3 := make([]int, 0, 10)          // make (length=0, capacity=10)

    fmt.Printf("s1: len=%d, cap=%d, %v\n", len(s1), cap(s1), s1)
    fmt.Printf("s2: len=%d, cap=%d, %v\n", len(s2), cap(s2), s2)
    fmt.Printf("s3: len=%d, cap=%d, %v\n", len(s3), cap(s3), s3)

    // append and capacity growth
    var growing []int
    prevCap := cap(growing)
    for i := 0; i < 20; i++ {
        growing = append(growing, i)
        if cap(growing) != prevCap {
            fmt.Printf("len=%2d, cap changed: %d -> %d\n",
                len(growing), prevCap, cap(growing))
            prevCap = cap(growing)
        }
    }

    // Slices share the underlying array (be careful)
    original := []int{1, 2, 3, 4, 5}
    sub := original[1:3]         // [2, 3]
    sub[0] = 99                  // original is modified too!
    fmt.Println("original:", original) // [1, 99, 3, 4, 5]

    // Create an independent slice by copying
    independent := make([]int, len(original))
    copy(independent, original)
    independent[0] = 777
    fmt.Println("original:", original)    // unchanged
    fmt.Println("independent:", independent) // [777, 99, 3, 4, 5]

    // Using the slices package (Go 1.21+)
    nums := []int{3, 1, 4, 1, 5, 9, 2, 6}
    slices.Sort(nums)
    fmt.Println("sorted:", nums)

    idx, found := slices.BinarySearch(nums, 5)
    fmt.Printf("BinarySearch(5): idx=%d, found=%t\n", idx, found)

    // Contains
    fmt.Printf("Contains(9): %t\n", slices.Contains(nums, 9))
    fmt.Printf("Contains(7): %t\n", slices.Contains(nums, 7))

    // Filtering (manually)
    evens := make([]int, 0)
    for _, n := range nums {
        if n%2 == 0 {
            evens = append(evens, n)
        }
    }
    fmt.Println("evens:", evens)

    // Custom sort
    type Person struct {
        Name string
        Age  int
    }
    people := []Person{
        {"Alice", 30},
        {"Bob", 25},
        {"Carol", 35},
    }
    sort.Slice(people, func(i, j int) bool {
        return people[i].Age < people[j].Age
    })
    fmt.Println("sorted by age:", people)
}
```

### Code Example 8: Maps in Detail

```go
package main

import (
    "fmt"
    "maps" // Go 1.21+
    "sort"
    "sync"
)

func main() {
    // Creating a map
    m1 := map[string]int{
        "alice": 95,
        "bob":   87,
        "carol": 92,
    }

    // Create an empty map with make
    m2 := make(map[string]int)
    m2["dave"] = 88

    // Retrieving elements (comma-ok idiom)
    score, ok := m1["alice"]
    fmt.Printf("alice: score=%d, exists=%t\n", score, ok)

    score, ok = m1["eve"]
    fmt.Printf("eve: score=%d, exists=%t\n", score, ok) // 0, false

    // Deletion
    delete(m1, "bob")
    fmt.Printf("After delete: %v\n", m1)

    // Iterating the map (order is non-deterministic)
    for key, val := range m1 {
        fmt.Printf("  %s: %d\n", key, val)
    }

    // Iterating with sorted keys
    keys := make([]string, 0, len(m1))
    for k := range m1 {
        keys = append(keys, k)
    }
    sort.Strings(keys)
    fmt.Println("Sorted iteration:")
    for _, k := range keys {
        fmt.Printf("  %s: %d\n", k, m1[k])
    }

    // nil map vs empty map
    var nilMap map[string]int
    emptyMap := map[string]int{}
    fmt.Printf("nil map == nil: %t\n", nilMap == nil)     // true
    fmt.Printf("empty map == nil: %t\n", emptyMap == nil)  // false
    // nilMap["key"] = 1  // panic: assignment to entry in nil map
    _ = nilMap["key"]    // reads are OK (zero value is returned)

    // Nested maps (map of maps)
    graph := map[string]map[string]int{
        "A": {"B": 1, "C": 4},
        "B": {"C": 2, "D": 5},
        "C": {"D": 1},
    }

    // Safe access to nested maps
    if neighbors, ok := graph["A"]; ok {
        for node, weight := range neighbors {
            fmt.Printf("A -> %s: weight=%d\n", node, weight)
        }
    }

    // Using a map as a set
    set := make(map[string]struct{})
    set["apple"] = struct{}{}
    set["banana"] = struct{}{}
    set["cherry"] = struct{}{}

    if _, exists := set["apple"]; exists {
        fmt.Println("apple is in the set")
    }

    // maps package (Go 1.21+)
    clone := maps.Clone(m1)
    fmt.Printf("clone: %v\n", clone)

    // Word count (practical example)
    text := "the quick brown fox jumps over the lazy dog the fox"
    wordCount := make(map[string]int)
    for _, word := range splitWords(text) {
        wordCount[word]++
    }
    fmt.Println("Word counts:", wordCount)

    // Concurrency-safe map operations (see the separate section on sync.Map)
    _ = sync.Map{}
}

func splitWords(s string) []string {
    var words []string
    word := ""
    for _, r := range s {
        if r == ' ' || r == '\n' || r == '\t' {
            if word != "" {
                words = append(words, word)
                word = ""
            }
        } else {
            word += string(r)
        }
    }
    if word != "" {
        words = append(words, word)
    }
    return words
}
```

### Code Example 9: Generics and Type Constraints (Go 1.18+)

```go
package main

import (
    "cmp"
    "fmt"
    "slices"
)

// Type constraint: Ordered constrains types that are comparable
type Ordered interface {
    ~int | ~int8 | ~int16 | ~int32 | ~int64 |
        ~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64 | ~uintptr |
        ~float32 | ~float64 |
        ~string
}

// Generic Pair type
type Pair[T, U any] struct {
    First  T
    Second U
}

func NewPairT, U any Pair[T, U] {
    return Pair[T, U]{First: first, Second: second}
}

func (p Pair[T, U]) String() string {
    return fmt.Sprintf("(%v, %v)", p.First, p.Second)
}

// Generic Optional type (equivalent to Rust's Option)
type Optional[T any] struct {
    value   T
    present bool
}

func SomeT any Optional[T] {
    return Optional[T]{value: value, present: true}
}

func None[T any]() Optional[T] {
    return Optional[T]{}
}

func (o Optional[T]) Get() (T, bool) {
    return o.value, o.present
}

func (o Optional[T]) GetOrElse(defaultValue T) T {
    if o.present {
        return o.value
    }
    return defaultValue
}

func (o Optional[T]) Map(f func(T) T) Optional[T] {
    if o.present {
        return Some(f(o.value))
    }
    return None[T]()
}

// Generic Set
type Set[T comparable] struct {
    items map[T]struct{}
}

func NewSetT comparable *Set[T] {
    s := &Set[T]{items: make(map[T]struct{})}
    for _, item := range items {
        s.Add(item)
    }
    return s
}

func (s *Set[T]) Add(item T) {
    s.items[item] = struct{}{}
}

func (s *Set[T]) Remove(item T) {
    delete(s.items, item)
}

func (s *Set[T]) Contains(item T) bool {
    _, ok := s.items[item]
    return ok
}

func (s *Set[T]) Len() int {
    return len(s.items)
}

func (s *Set[T]) Union(other *Set[T]) *Set[T] {
    result := NewSet[T]()
    for item := range s.items {
        result.Add(item)
    }
    for item := range other.items {
        result.Add(item)
    }
    return result
}

func (s *Set[T]) Intersection(other *Set[T]) *Set[T] {
    result := NewSet[T]()
    for item := range s.items {
        if other.Contains(item) {
            result.Add(item)
        }
    }
    return result
}

// Generic function using cmp.Ordered (Go 1.21+)
func ClampT cmp.Ordered T {
    if value < min {
        return min
    }
    if value > max {
        return max
    }
    return value
}

// Generic LinkedList
type Node[T any] struct {
    Value T
    Next  *Node[T]
}

type LinkedList[T any] struct {
    Head *Node[T]
    Len  int
}

func (ll *LinkedList[T]) Push(value T) {
    ll.Head = &Node[T]{Value: value, Next: ll.Head}
    ll.Len++
}

func (ll *LinkedList[T]) Pop() (T, bool) {
    if ll.Head == nil {
        var zero T
        return zero, false
    }
    value := ll.Head.Value
    ll.Head = ll.Head.Next
    ll.Len--
    return value, true
}

func (ll *LinkedList[T]) ForEach(fn func(T)) {
    for node := ll.Head; node != nil; node = node.Next {
        fn(node.Value)
    }
}

func main() {
    // Pair
    p1 := NewPair("name", 42)
    p2 := NewPair(3.14, true)
    fmt.Println(p1, p2)

    // Optional
    opt1 := Some(42)
    opt2 := None[string]()

    if v, ok := opt1.Get(); ok {
        fmt.Printf("opt1: %d\n", v)
    }
    fmt.Printf("opt2: %q\n", opt2.GetOrElse("default"))

    doubled := opt1.Map(func(n int) int { return n * 2 })
    fmt.Printf("doubled: %v\n", doubled.GetOrElse(0))

    // Set
    s1 := NewSet("go", "rust", "python")
    s2 := NewSet("python", "java", "go")

    union := s1.Union(s2)
    intersection := s1.Intersection(s2)

    fmt.Printf("s1 contains 'go': %t\n", s1.Contains("go"))
    fmt.Printf("union size: %d\n", union.Len())
    fmt.Printf("intersection size: %d\n", intersection.Len())

    // Clamp
    fmt.Printf("Clamp(15, 0, 10): %d\n", Clamp(15, 0, 10))
    fmt.Printf("Clamp(-5, 0, 10): %d\n", Clamp(-5, 0, 10))
    fmt.Printf("Clamp(5, 0, 10): %d\n", Clamp(5, 0, 10))

    // LinkedList
    ll := &LinkedList[int]{}
    ll.Push(1)
    ll.Push(2)
    ll.Push(3)

    ll.ForEach(func(v int) {
        fmt.Printf("%d -> ", v)
    })
    fmt.Println("nil")

    // The slices package with generics
    nums := []int{5, 3, 8, 1, 9}
    slices.Sort(nums)
    fmt.Println("sorted:", nums)
}
```

---

## 2. ASCII Diagrams

### Diagram 1: Go's Type Hierarchy

```
                     ┌──────────┐
                     │   any    │
                     │(interface│
                     │   {})    │
                     └────┬─────┘
           ┌──────────────┼──────────────┐
     ┌─────▼─────┐  ┌─────▼─────┐  ┌────▼──────┐
     │ Basic     │  │ Composite │  │ Reference │
     │ int,float │  │ struct    │  │ slice,map │
     │ string    │  │ array     │  │ channel   │
     │ bool,rune │  │           │  │ pointer   │
     │ complex   │  │           │  │ function  │
     └───────────┘  └──────────┘  └───────────┘

Details of integer types:
  ┌─────────────────────────────────────────┐
  │ Signed                                   │
  │  int8 - int16 - int32 - int64 - int      │
  │  (rune = int32)                          │
  │                                          │
  │ Unsigned                                 │
  │  uint8 - uint16 - uint32 - uint64 - uint │
  │  (byte = uint8)                          │
  │                                          │
  │ Special                                  │
  │  uintptr (pointer-sized unsigned int)    │
  └─────────────────────────────────────────┘
```

### Diagram 2: Memory Layout of Struct Embedding

```
Dog struct:
┌──────────────────────────────────┐
│  Animal (embedded)               │
│  ┌──────────────────────────┐    │
│  │ Name string              │    │
│  │ Age  int                 │    │
│  └──────────────────────────┘    │
│  Breed string                    │
└──────────────────────────────────┘

Access:
  d.Name   ->  d.Animal.Name  (shorthand)
  d.Age    ->  d.Animal.Age   (shorthand)
  d.Speak() -> d.Animal.Speak() (method promotion)

Name collision with multiple embeddings:
┌──────────────────────────────────┐
│  Service                         │
│  ┌─────────────┐ ┌────────────┐ │
│  │ Logger      │ │ Metrics    │ │
│  │  Log()      │ │  Record()  │ │
│  └─────────────┘ └────────────┘ │
│  Name string                     │
│  * If Logger and Metrics have    │
│    methods with the same name,   │
│    it's a compile error          │
│    (explicit access required)    │
└──────────────────────────────────┘
```

### Diagram 3: How Interface Satisfaction Works

```
┌────────────────┐          ┌────────────────┐
│  io.Reader     │          │  *os.File      │
│  ┌────────────┐│          │  ┌────────────┐│
│  │ Read([]byte)│├satisfies┤  │ Read([]byte)││
│  │ (int, error)││(implicit)│  │ (int, error)││
│  └────────────┘│          │  │ Write(...)  ││
└────────────────┘          │  │ Close()     ││
                            │  │ Stat()      ││
┌────────────────┐          │  └────────────┘│
│  io.ReadCloser │          └────────────────┘
│  ┌────────────┐│               ▲
│  │ Read(...)   ││   also        │
│  │ Close()     ││── satisfies ──┘
│  └────────────┘│
└────────────────┘

Internal representation of an interface (iface):
┌──────────────────────────┐
│  interface value          │
│  ┌──────────┐ ┌────────┐│
│  │  type    │ │ value  ││
│  │  *itab   │ │ *data  ││
│  └──────────┘ └────────┘│
└──────────────────────────┘

itab = interface table (cache for the method table)
data = pointer to the actual value

nil interface vs nil pointer:
  var w io.Writer         // type=nil, data=nil -> w == nil (true)
  var f *os.File = nil
  w = f                   // type=*os.File, data=nil -> w == nil (false!)
```

### Diagram 4: Internal Structure of a Slice

```
s := []int{1, 2, 3, 4, 5}

Slice header:
┌─────────┐
│ ptr  ────┼──> ┌───┬───┬───┬───┬───┐
│ len = 5  │    │ 1 │ 2 │ 3 │ 4 │ 5 │  underlying array
│ cap = 5  │    └───┴───┴───┴───┴───┘
└─────────┘

sub := s[1:3]

┌─────────┐          ┌───┬───┬───┬───┬───┐
│ ptr  ────┼──────────┼───┤ 2 │ 3 │ 4 │ 5 │
│ len = 2  │          │ 1 │   │   │   │   │
│ cap = 4  │          └───┴───┴───┴───┴───┘
└─────────┘          ↑       ↑
                     s[0]    sub[0] = s[1]

Reallocation due to append:
s2 := append(s, 6)

cap is insufficient -> allocate a new array (roughly double the capacity)
┌─────────┐
│ ptr  ────┼──> ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
│ len = 6  │    │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │   │   │   │   │
│ cap = 10 │    └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
└─────────┘
* The underlying array is different from the original slice (independent)
```

### Diagram 5: Conceptual Internal Structure of a Map

```
map[string]int:
┌──────────────────────────────────────┐
│ Hash table                           │
│                                      │
│  Bucket array:                        │
│  ┌─────────┐                          │
│  │bucket[0]│──> [key1:val1, key2:val2]│
│  ├─────────┤                          │
│  │bucket[1]│──> [key3:val3]           │
│  ├─────────┤                          │
│  │bucket[2]│──> (empty)               │
│  ├─────────┤                          │
│  │bucket[3]│──> [key4:val4, ...]      │
│  └─────────┘                          │
│                                      │
│  Each bucket holds up to 8 entries    │
│  On overflow, it chains to            │
│  an overflow bucket                   │
│                                      │
│  Growth: when items/buckets > 6.5,    │
│  the bucket array doubles             │
└──────────────────────────────────────┘
```

---

## 3. Comparison Tables

### Table 1: Value Receiver vs Pointer Receiver

| Item | Value receiver `(t T)` | Pointer receiver `(t *T)` |
|------|-------------------|------------------------|
| Copy | Copied on every call | Only the pointer is copied |
| Modification of original | Not possible | Possible |
| Call on nil | Not possible | Possible (requires nil check) |
| Interface satisfaction | Both T and *T | Only *T |
| Recommended use | Small structs, immutable | Large structs, mutable |
| Contains sync.Mutex | Not allowed (gets copied) | Required (copying is forbidden) |
| Storage in slices | The value is copied | The pointer is stored |

### Table 2: Zero Values for Go Types

| Type | Zero value | Notes |
|-----|-------|------|
| int, float64 | `0`, `0.0` | All numeric types are 0 |
| string | `""` | Empty string |
| bool | `false` | |
| pointer | `nil` | |
| slice | `nil` | `len()=0`, `cap()=0`. append is allowed |
| map | `nil` | Readable; make is required before assignment |
| channel | `nil` | Send/receive blocks forever |
| struct | Zero value of each field | |
| interface | `nil` | Both type and value are nil |
| function | `nil` | |
| array | Zero value of each element | Fixed length |

### Table 3: Comparison of Collection Types

| Characteristic | Array | Slice | Map | sync.Map |
|------|-------|-------|-----|----------|
| Size | Fixed | Dynamic | Dynamic | Dynamic |
| Memory | Can be on stack | Heap | Heap | Heap |
| Key type | int (index) | int (index) | comparable | any |
| Order guarantee | Yes | Yes | No | No |
| Concurrency safe | No | No | No | Yes |
| Zero value | Usable | nil (append OK) | nil (assignment not allowed) | Usable |
| Equality comparison | `==` allowed | Not allowed (reflect) | Not allowed | Not allowed |

### Table 4: Interface Design Guidelines

| Principle | Description | Example |
|------|------|-----|
| Keep them small | 1-3 methods is ideal | io.Reader (1), io.ReadWriter (2) |
| Define on consumer side | The consumer declares the interface | handler.Getter |
| Name as verb + "er" | Name based on the action | Reader, Writer, Closer |
| Abstract only when needed | Avoid pre-defining | When a mock becomes necessary in tests |
| Extend via composition | Embed existing interfaces | io.ReadWriteCloser |

---

## 4. Anti-Patterns

### Anti-Pattern 1: The Giant Interface

```go
// BAD: A giant interface (God Interface)
type Repository interface {
    FindUser(id int) (*User, error)
    CreateUser(u *User) error
    UpdateUser(u *User) error
    DeleteUser(id int) error
    FindOrder(id int) (*Order, error)
    CreateOrder(o *Order) error
    UpdateOrder(o *Order) error
    DeleteOrder(id int) error
    FindProduct(id int) (*Product, error)
    // ... more than 20 methods
}

// Problems:
// 1. Creating mocks for tests is tedious
// 2. Implementations are forced to implement methods they don't need
// 3. The blast radius of changes is large

// GOOD: Split into small, role-based interfaces
type UserReader interface {
    FindUser(id int) (*User, error)
}

type UserWriter interface {
    CreateUser(u *User) error
    UpdateUser(u *User) error
    DeleteUser(id int) error
}

// Compose as needed
type UserRepository interface {
    UserReader
    UserWriter
}

// In tests, only mock the interfaces you need
type mockUserReader struct {
    users map[int]*User
}

func (m *mockUserReader) FindUser(id int) (*User, error) {
    u, ok := m.users[id]
    if !ok {
        return nil, ErrNotFound
    }
    return u, nil
}
```

### Anti-Pattern 2: The nil Interface Trap

```go
// BAD: Storing a nil pointer in an interface breaks the nil check
type Logger interface {
    Log(msg string)
}

type FileLogger struct {
    Path string
}

func (f *FileLogger) Log(msg string) {
    fmt.Printf("[%s] %s\n", f.Path, msg)
}

func getLogger() *FileLogger {
    // returns nil depending on conditions
    return nil
}

func processWithLogger() {
    var logger Logger = getLogger()  // Assigns *FileLogger(nil)
    if logger != nil {
        // Execution reaches here!
        // interface{type:*FileLogger, value:nil} is not nil
        logger.Log("hello") // nil pointer dereference -> PANIC
    }
}

// GOOD: Explicitly return a nil interface
func getLoggerSafe() Logger {
    f := findLogger()
    if f == nil {
        return nil  // the interface itself becomes nil
    }
    return f
}

// GOOD: nil check using reflect (expensive, not recommended)
import "reflect"

func isNil(v interface{}) bool {
    if v == nil {
        return true
    }
    rv := reflect.ValueOf(v)
    switch rv.Kind() {
    case reflect.Ptr, reflect.Map, reflect.Slice, reflect.Chan, reflect.Func:
        return rv.IsNil()
    }
    return false
}
```

### Anti-Pattern 3: Mistakes in Struct Field Tags

```go
// BAD: Whitespace mistakes in JSON tags
type Config struct {
    Host string `json: "host"` // Contains a space -> tag is ignored
    Port int    `json:"port" `  // Trailing whitespace -> doesn't work properly
}

// BAD: Inconsistencies in validation tags
type Request struct {
    Name  string `json:"name" validate:"required"`
    Email string `json:"email" validate:"required,email"`
    Age   int    `json:"age" validate:"min=0,max=200"`  // OK
    // Age   int    `json:"age" validate:"min=0, max=200"` // BAD: contains a space
}

// GOOD: go vet can detect some of these, but manual checking is also needed
type Config struct {
    Host     string        `json:"host" yaml:"host" env:"APP_HOST"`
    Port     int           `json:"port" yaml:"port" env:"APP_PORT"`
    Timeout  time.Duration `json:"timeout" yaml:"timeout" env:"APP_TIMEOUT"`
    LogLevel string        `json:"log_level" yaml:"log_level" env:"APP_LOG_LEVEL"`
}
```

### Anti-Pattern 4: Slice Capacity Leaks

```go
// BAD: Holding only a part of a large slice -> the underlying array is not GC'd
func getFirstThree(data []byte) []byte {
    return data[:3]  // the entire original data remains in memory
}

// GOOD: Copy to cut off the reference to the underlying array
func getFirstThreeSafe(data []byte) []byte {
    result := make([]byte, 3)
    copy(result, data[:3])
    return result
}

// BAD: append unintentionally modifies the original slice
func appendToSlice(s []int) []int {
    return append(s, 999)  // if there is spare cap, it mutates the original underlying array
}

// GOOD: Use the full slice expression to cap the capacity
func safeSubslice(s []int) []int {
    sub := s[1:3:3]  // s[low:high:max] -> cap = max - low
    return append(sub, 999)  // a new array is guaranteed to be allocated
}
```

### Anti-Pattern 5: Forgetting to Leverage Zero Values

```go
// BAD: Unnecessary initialization
var mu = &sync.Mutex{}     // no need to make this a pointer
var buf = bytes.Buffer{}   // explicit initialization is unnecessary
var wg = &sync.WaitGroup{} // the zero value is sufficient

// GOOD: Leverage the zero value
var mu sync.Mutex           // usable from its zero value
var buf bytes.Buffer         // usable from its zero value
var wg sync.WaitGroup        // usable from its zero value
var once sync.Once           // usable from its zero value

// Examples of types with useful zero values:
// sync.Mutex      -> an unlocked state
// sync.WaitGroup  -> counter of 0
// bytes.Buffer    -> an empty buffer
// strings.Builder -> an empty builder
```

---

## 5. FAQ

### Q1: Do structs have "constructors"?

Go has no constructor syntax, but by convention you use `New<TypeName>`. Example: `func NewUser(name string) *User`. This is the factory function pattern and is well suited for validation and setting default values.

```go
// Basic factory function
func NewUser(name, email string) *User {
    return &User{
        Name:      name,
        Email:     email,
        CreatedAt: time.Now(),
    }
}

// Functional Options pattern (for complex initialization)
type ServerOption func(*Server)

func WithPort(port int) ServerOption {
    return func(s *Server) { s.Port = port }
}

func WithTLS(cert, key string) ServerOption {
    return func(s *Server) {
        s.TLS = true
        s.CertFile = cert
        s.KeyFile = key
    }
}

func NewServer(host string, opts ...ServerOption) *Server {
    s := &Server{
        Host: host,
        Port: 8080, // default value
    }
    for _, opt := range opts {
        opt(s)
    }
    return s
}

// Usage example
srv := NewServer("localhost",
    WithPort(9090),
    WithTLS("cert.pem", "key.pem"),
)
```

### Q2: When should I use value receivers vs pointer receivers?

Rules of thumb: (1) if you mutate the struct, use a pointer receiver; (2) if the struct is large (many fields), use a pointer receiver; (3) for consistency, keep receivers of the same type uniform. When in doubt, prefer a pointer receiver.

Specific criteria:
- **Pointer receiver required**: contains a `sync.Mutex`, mutates fields, large struct (rule of thumb: more than 3 fields)
- **Value receiver appropriate**: small struct (like `time.Time`), immutable methods, custom types over basic types
- **Mixing forbidden**: do not mix value and pointer receivers on the same type (causes issues with interface satisfaction)

### Q3: Is it OK to use the any type (interface{}) a lot?

Avoid it. Since Go 1.18, you can use generics, so limit `any` to situations where you genuinely need to accept arbitrary types (JSON parsing, etc.). It harms type safety, so use concrete types or interfaces whenever possible.

Acceptable uses of `any`:
- Marshal/Unmarshal in `encoding/json`
- Arguments to logging libraries
- Situations that require reflection
- Test helpers

### Q4: Does the field order of a struct affect memory usage?

Yes. The Go compiler inserts padding to align struct fields on memory boundaries. By adjusting the field order, you can reduce padding and improve memory efficiency.

```go
// BAD: Lots of padding (24 bytes)
type BadLayout struct {
    A bool    // 1 byte + 7 bytes padding
    B int64   // 8 bytes
    C bool    // 1 byte + 7 bytes padding
}

// GOOD: Less padding (16 bytes)
type GoodLayout struct {
    B int64   // 8 bytes
    A bool    // 1 byte
    C bool    // 1 byte + 6 bytes padding
}

// You can verify this with the fieldalignment tool
// go install golang.org/x/tools/go/analysis/passes/fieldalignment/cmd/fieldalignment@latest
// fieldalignment -fix ./...
```

### Q5: What is the comparable constraint?

`comparable` is a built-in type constraint introduced in Go 1.18 that constrains types on which the `==` and `!=` operators can be used. It is used for `map` key types and for the element type of generic sets.

Types included in `comparable`: bool, integer types, floating-point types, complex, string, pointer, channel, array (if elements are comparable), struct (if all fields are comparable)

Types not included in `comparable`: slice, map, function

---


## FAQ

### Q1: What is the most important point when learning this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory but by actually writing and running code to see how things work.

### Q2: What are common mistakes beginners make?

Skipping the basics and jumping to advanced topics. We recommend solidly understanding the fundamental concepts explained in this guide before moving on to the next step.

### Q3: How is this applied in real-world development?

The knowledge from this topic is frequently applied in day-to-day development work. It becomes especially important during code reviews and architecture design.

---

## 6. Summary

| Concept | Key Points |
|------|------|
| Basic types | int, float64, string, bool, rune, byte. Explicit bit widths are recommended in some situations |
| struct | A collection of fields. Can have methods. JSON tags control serialization |
| Embedding | Composition, not inheritance. Methods and fields are promoted |
| interface | A method set. Satisfied implicitly. Defining on the consumer side is recommended |
| type assertion | Safely check with `v, ok := i.(Type)` |
| type switch | Branch with `switch v := i.(type)` |
| Zero value | Every type has a zero value. Design for useful zero values |
| Custom types | `type X underlying` improves type safety. Emulate enums with iota |
| Generics | Type parameters in Go 1.18+. Type constraints like `comparable`, `any` |
| Slice | Dynamic array. Be careful about sharing the underlying array. append may reallocate |
| Map | Hash table. Assignment to a nil map panics. Order is non-deterministic |

---

## Recommended Next Reads

- [02-error-handling.md](./02-error-handling.md) -- Error handling
- [03-packages-modules.md](./03-packages-modules.md) -- Packages and modules
- [../03-tools/01-generics.md](../03-tools/01-generics.md) -- Generics

---

## References

1. **The Go Programming Language Specification -- Types** -- https://go.dev/ref/spec#Types
2. **Effective Go -- Interfaces** -- https://go.dev/doc/effective_go#interfaces
3. **Go Blog, "The Laws of Reflection"** -- https://go.dev/blog/laws-of-reflection
4. **Go Blog, "Strings, bytes, runes and characters in Go"** -- https://go.dev/blog/strings
5. **Go Wiki, "SliceTricks"** -- https://go.dev/wiki/SliceTricks
6. **Go Blog, "An Introduction to Generics"** -- https://go.dev/blog/intro-generics
7. **Go Blog, "Maps in Go"** -- https://go.dev/blog/maps



===== SOURCE: 02-programming/go-practical-guide/docs/00-basics/02-error-handling.md =====

# Error Handling -- Go's Error Design Philosophy

> Go adopts explicit error handling centered on the error interface, and achieves robust error propagation through errors.Is/As, sentinel errors, and wrapping.

---

## What You Will Learn in This Chapter

1. **error interface** -- Why errors in Go are simply an interface
2. **errors.Is / errors.As** -- How to inspect error chains
3. **Error wrapping** -- Adding context with `fmt.Errorf("%w", err)`
4. **Custom error types** -- Designing domain-specific errors
5. **Error handling strategies** -- Processing policies by layer
6. **panic/recover** -- Appropriate use cases and recovery patterns


## Prerequisites

Before reading this guide, the following knowledge will help deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts
- Understanding the content of [Types and Structs -- Understanding Go's Type System](./01-types-and-structs.md)

---

## 1. Basics of the error Interface

### 1.1 Definition of the error Interface

In Go, errors are not a special syntax but simply an interface. This forms the foundation of Go's error design.

```go
// Defined in the builtin package
type error interface {
    Error() string
}
```

Benefits of this design:
- Errors can be treated as values (first-class values)
- Any type can implement the error interface
- Errors can carry additional information (codes, fields, stack traces, etc.)
- They can be used in conditionals, comparisons, and storage just like any other value

### Code Example 1: Basics and Implementation of the error Interface

```go
package main

import (
    "fmt"
    "net"
    "os"
    "strconv"
    "time"
)

// error is a built-in interface
// type error interface {
//     Error() string
// }

// Custom error type: validation error
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation error: field=%q, message=%q", e.Field, e.Message)
}

// Custom error type: business logic error
type BusinessError struct {
    Code    string
    Message string
    Details map[string]string
}

func (e *BusinessError) Error() string {
    return fmt.Sprintf("[%s] %s", e.Code, e.Message)
}

// Custom error type: temporary error (retryable)
type RetryableError struct {
    Err       error
    RetryAfter time.Duration
}

func (e *RetryableError) Error() string {
    return fmt.Sprintf("retryable error (retry after %v): %v", e.RetryAfter, e.Err)
}

func (e *RetryableError) Unwrap() error {
    return e.Err
}

func (e *RetryableError) Temporary() bool {
    return true
}

// Create a simple error with errors.New
func validateAge(age int) error {
    if age < 0 {
        return &ValidationError{Field: "age", Message: "must be non-negative"}
    }
    if age > 200 {
        return &ValidationError{Field: "age", Message: "unreasonable value"}
    }
    return nil
}

func main() {
    // Examples of errors from the standard library
    _, err := strconv.Atoi("not_a_number")
    fmt.Printf("strconv error: %v (type: %T)\n", err, err)

    _, err = os.Open("/nonexistent/file")
    fmt.Printf("os error: %v (type: %T)\n", err, err)

    _, err = net.Dial("tcp", "invalid:address")
    fmt.Printf("net error: %v (type: %T)\n", err, err)

    // Using custom errors
    err = validateAge(-5)
    fmt.Printf("validation error: %v\n", err)

    err = validateAge(30)
    fmt.Printf("valid age: error=%v\n", err) // nil
}
```

### Code Example 2: Sentinel Errors

```go
package main

import (
    "errors"
    "fmt"
)

// Definition of sentinel errors
// Exposed at the package level; callers use them for checks
var (
    ErrNotFound      = errors.New("not found")
    ErrUnauthorized  = errors.New("unauthorized")
    ErrForbidden     = errors.New("forbidden")
    ErrConflict      = errors.New("conflict")
    ErrInternalError = errors.New("internal error")
    ErrInvalidInput  = errors.New("invalid input")
    ErrTimeout       = errors.New("timeout")
    ErrRateLimited   = errors.New("rate limited")
)

// User repository
type User struct {
    ID    int
    Name  string
    Email string
}

var db = map[int]*User{
    1: {ID: 1, Name: "Alice", Email: "alice@example.com"},
    2: {ID: 2, Name: "Bob", Email: "bob@example.com"},
}

func FindUser(id int) (*User, error) {
    if id <= 0 {
        return nil, fmt.Errorf("find user: invalid id %d: %w", id, ErrInvalidInput)
    }
    user, exists := db[id]
    if !exists {
        return nil, fmt.Errorf("find user (id=%d): %w", id, ErrNotFound)
    }
    return user, nil
}

func FindUserByEmail(email string) (*User, error) {
    if email == "" {
        return nil, fmt.Errorf("find user by email: empty email: %w", ErrInvalidInput)
    }
    for _, u := range db {
        if u.Email == email {
            return u, nil
        }
    }
    return nil, fmt.Errorf("find user by email %q: %w", email, ErrNotFound)
}

func CreateUser(name, email string) (*User, error) {
    if name == "" || email == "" {
        return nil, fmt.Errorf("create user: name and email required: %w", ErrInvalidInput)
    }

    // Duplicate check
    existing, err := FindUserByEmail(email)
    if err == nil && existing != nil {
        return nil, fmt.Errorf("create user: email %q already exists: %w", email, ErrConflict)
    }
    // ErrNotFound is an expected result (no duplicate)
    if err != nil && !errors.Is(err, ErrNotFound) {
        return nil, fmt.Errorf("create user: check existing: %w", err)
    }

    user := &User{
        ID:    len(db) + 1,
        Name:  name,
        Email: email,
    }
    db[user.ID] = user
    return user, nil
}

func main() {
    // Success case
    user, err := FindUser(1)
    if err != nil {
        fmt.Printf("Error: %v\n", err)
    } else {
        fmt.Printf("Found: %+v\n", user)
    }

    // NotFound case
    _, err = FindUser(999)
    if errors.Is(err, ErrNotFound) {
        fmt.Println("User not found (expected)")
    }

    // InvalidInput case
    _, err = FindUser(-1)
    if errors.Is(err, ErrInvalidInput) {
        fmt.Println("Invalid input (expected)")
    }

    // Conflict case
    _, err = CreateUser("Charlie", "alice@example.com")
    if errors.Is(err, ErrConflict) {
        fmt.Printf("Conflict: %v\n", err)
    }

    // Successful creation
    user, err = CreateUser("Charlie", "charlie@example.com")
    if err == nil {
        fmt.Printf("Created: %+v\n", user)
    }
}
```

### Code Example 3: Error Wrapping and Adding Context

```go
package main

import (
    "database/sql"
    "encoding/json"
    "errors"
    "fmt"
    "io"
    "net/http"
    "os"
)

var ErrNotFound = errors.New("not found")

type Profile struct {
    Bio    string
    Avatar string
}

type User struct {
    ID   int
    Name string
}

// Layer 1: repository layer
func findUserInDB(id int) (*User, error) {
    // Simulating a DB operation
    if id > 100 {
        return nil, fmt.Errorf("query users where id=%d: %w", id, ErrNotFound)
    }
    return &User{ID: id, Name: "TestUser"}, nil
}

func loadProfileFromDB(userID int) (*Profile, error) {
    if userID > 50 {
        return nil, fmt.Errorf("query profiles where user_id=%d: %w", userID, ErrNotFound)
    }
    return &Profile{Bio: "Hello", Avatar: "/avatars/default.png"}, nil
}

// Layer 2: service layer (wraps with added context)
func GetUserProfile(id int) (*Profile, error) {
    user, err := findUserInDB(id)
    if err != nil {
        return nil, fmt.Errorf("get user profile: find user (id=%d): %w", id, err)
    }

    profile, err := loadProfileFromDB(user.ID)
    if err != nil {
        return nil, fmt.Errorf("get user profile: load profile for %q (id=%d): %w",
            user.Name, user.ID, err)
    }

    return profile, nil
}

// Layer 3: handler layer (HTTP response depending on error type)
func handleGetProfile(w http.ResponseWriter, r *http.Request) {
    userID := 200 // simulation

    profile, err := GetUserProfile(userID)
    if err != nil {
        // HTTP status code depending on the kind of error
        switch {
        case errors.Is(err, ErrNotFound):
            http.Error(w, "user or profile not found", http.StatusNotFound)
        default:
            // Do not return internal error details to the client
            http.Error(w, "internal server error", http.StatusInternalServerError)
        }
        // Output details to the log
        fmt.Printf("ERROR: %v\n", err)
        return
    }

    json.NewEncoder(w).Encode(profile)
}

// Practical error wrapping patterns
func readConfig(path string) ([]byte, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return nil, fmt.Errorf("read config %q: %w", path, err)
    }
    return data, nil
}

func parseConfig(data []byte) (map[string]string, error) {
    var config map[string]string
    if err := json.Unmarshal(data, &config); err != nil {
        return nil, fmt.Errorf("parse config: %w", err)
    }
    return config, nil
}

func loadConfig(path string) (map[string]string, error) {
    data, err := readConfig(path)
    if err != nil {
        return nil, fmt.Errorf("load config: %w", err)
    }

    config, err := parseConfig(data)
    if err != nil {
        return nil, fmt.Errorf("load config: %w", err)
    }

    return config, nil
}

// Proper error handling in file processing
func copyFile(src, dst string) (int64, error) {
    srcFile, err := os.Open(src)
    if err != nil {
        return 0, fmt.Errorf("copy file: open src %q: %w", src, err)
    }
    defer srcFile.Close()

    dstFile, err := os.Create(dst)
    if err != nil {
        return 0, fmt.Errorf("copy file: create dst %q: %w", dst, err)
    }

    // Also check the error from Close in a defer
    defer func() {
        if cerr := dstFile.Close(); cerr != nil && err == nil {
            err = fmt.Errorf("copy file: close dst %q: %w", dst, cerr)
        }
    }()

    n, err := io.Copy(dstFile, srcFile)
    if err != nil {
        return 0, fmt.Errorf("copy file: copy data: %w", err)
    }

    return n, nil
}

func main() {
    // Inspect the error chain
    _, err := GetUserProfile(200)
    fmt.Printf("Error: %v\n", err)
    fmt.Printf("Is ErrNotFound: %t\n", errors.Is(err, ErrNotFound))

    // Example of checking sql.ErrNoRows
    sqlErr := fmt.Errorf("get user: %w", sql.ErrNoRows)
    fmt.Printf("Is sql.ErrNoRows: %t\n", errors.Is(sqlErr, sql.ErrNoRows))
}
```

### Code Example 4: errors.Is and errors.As in Detail

```go
package main

import (
    "errors"
    "fmt"
    "net"
    "os"
)

// Custom error type
type HTTPError struct {
    StatusCode int
    Message    string
    Err        error
}

func (e *HTTPError) Error() string {
    if e.Err != nil {
        return fmt.Sprintf("HTTP %d: %s: %v", e.StatusCode, e.Message, e.Err)
    }
    return fmt.Sprintf("HTTP %d: %s", e.StatusCode, e.Message)
}

func (e *HTTPError) Unwrap() error {
    return e.Err
}

// Custom Is method: treats errors with the same StatusCode as identical
func (e *HTTPError) Is(target error) bool {
    t, ok := target.(*HTTPError)
    if !ok {
        return false
    }
    return e.StatusCode == t.StatusCode
}

// ValidationError type
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation error: %s - %s", e.Field, e.Message)
}

// NotFoundError type
type NotFoundError struct {
    Resource string
    ID       interface{}
}

func (e *NotFoundError) Error() string {
    return fmt.Sprintf("%s (id=%v) not found", e.Resource, e.ID)
}

func handleError(err error) {
    // errors.Is: checks whether the error chain contains a specific error
    if errors.Is(err, os.ErrNotExist) {
        fmt.Println("→ File does not exist")
        return
    }

    if errors.Is(err, os.ErrPermission) {
        fmt.Println("→ Permission denied")
        return
    }

    // errors.As: extracts a specific type from the error chain
    var httpErr *HTTPError
    if errors.As(err, &httpErr) {
        fmt.Printf("→ HTTP error: status=%d, message=%q\n",
            httpErr.StatusCode, httpErr.Message)
        return
    }

    var validErr *ValidationError
    if errors.As(err, &validErr) {
        fmt.Printf("→ Validation error: field=%q, message=%q\n",
            validErr.Field, validErr.Message)
        return
    }

    var notFoundErr *NotFoundError
    if errors.As(err, &notFoundErr) {
        fmt.Printf("→ Not found: resource=%q, id=%v\n",
            notFoundErr.Resource, notFoundErr.ID)
        return
    }

    // Interface check for net.Error
    var netErr net.Error
    if errors.As(err, &netErr) {
        fmt.Printf("→ Network error: timeout=%t, temporary=%t\n",
            netErr.Timeout(), netErr.Temporary())
        return
    }

    // Check for os.PathError
    var pathErr *os.PathError
    if errors.As(err, &pathErr) {
        fmt.Printf("→ Path error: op=%q, path=%q, err=%v\n",
            pathErr.Op, pathErr.Path, pathErr.Err)
        return
    }

    fmt.Printf("→ Unexpected error: %v\n", err)
}

func main() {
    // Test various errors
    errors_to_test := []error{
        fmt.Errorf("open config: %w", os.ErrNotExist),
        &HTTPError{StatusCode: 404, Message: "page not found", Err: nil},
        &ValidationError{Field: "email", Message: "invalid format"},
        &NotFoundError{Resource: "User", ID: 42},
        fmt.Errorf("service layer: %w",
            &HTTPError{StatusCode: 500, Message: "database error",
                Err: fmt.Errorf("connection refused")}),
    }

    for _, err := range errors_to_test {
        fmt.Printf("\nError: %v\n", err)
        handleError(err)
    }

    // Test the custom Is method
    err1 := &HTTPError{StatusCode: 404, Message: "user not found"}
    err2 := &HTTPError{StatusCode: 404, Message: "different message"}
    err3 := &HTTPError{StatusCode: 500, Message: "internal error"}

    fmt.Printf("\nerr1 Is err2 (same status): %t\n", errors.Is(err1, err2)) // true
    fmt.Printf("err1 Is err3 (diff status): %t\n", errors.Is(err1, err3))  // false

    // Searching within a wrapped error
    wrapped := fmt.Errorf("handler: %w",
        fmt.Errorf("service: %w",
            &NotFoundError{Resource: "Order", ID: 123}))

    var nfe *NotFoundError
    if errors.As(wrapped, &nfe) {
        fmt.Printf("\nFound NotFoundError in chain: %s id=%v\n",
            nfe.Resource, nfe.ID)
    }
}
```

### Code Example 5: Joining Multiple Errors (Go 1.20+)

```go
package main

import (
    "errors"
    "fmt"
    "strings"
)

type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("%s: %s", e.Field, e.Message)
}

type User struct {
    Name     string
    Email    string
    Password string
    Age      int
}

// Validation: returns multiple errors together
func validateUser(u *User) error {
    var errs []error

    if u.Name == "" {
        errs = append(errs, &ValidationError{Field: "name", Message: "required"})
    } else if len(u.Name) < 2 {
        errs = append(errs, &ValidationError{Field: "name", Message: "too short (min 2)"})
    } else if len(u.Name) > 100 {
        errs = append(errs, &ValidationError{Field: "name", Message: "too long (max 100)"})
    }

    if u.Email == "" {
        errs = append(errs, &ValidationError{Field: "email", Message: "required"})
    } else if !strings.Contains(u.Email, "@") {
        errs = append(errs, &ValidationError{Field: "email", Message: "invalid format"})
    }

    if len(u.Password) < 8 {
        errs = append(errs, &ValidationError{
            Field: "password", Message: "too short (min 8 characters)"})
    }
    if u.Password != "" {
        hasUpper := false
        hasDigit := false
        for _, c := range u.Password {
            if c >= 'A' && c <= 'Z' { hasUpper = true }
            if c >= '0' && c <= '9' { hasDigit = true }
        }
        if !hasUpper {
            errs = append(errs, &ValidationError{
                Field: "password", Message: "must contain uppercase letter"})
        }
        if !hasDigit {
            errs = append(errs, &ValidationError{
                Field: "password", Message: "must contain digit"})
        }
    }

    if u.Age < 0 || u.Age > 200 {
        errs = append(errs, &ValidationError{
            Field: "age", Message: fmt.Sprintf("invalid value: %d", u.Age)})
    }

    return errors.Join(errs...) // Go 1.20+: joins multiple errors. Returns nil if errs is empty
}

// Custom MultiError type (for compatibility with pre-Go 1.20)
type MultiError struct {
    Errors []error
}

func (e *MultiError) Error() string {
    if len(e.Errors) == 1 {
        return e.Errors[0].Error()
    }
    var msgs []string
    for _, err := range e.Errors {
        msgs = append(msgs, err.Error())
    }
    return fmt.Sprintf("%d errors: [%s]", len(e.Errors), strings.Join(msgs, "; "))
}

// Unwrap supports the multiple unwrap feature in Go 1.20+
func (e *MultiError) Unwrap() []error {
    return e.Errors
}

func main() {
    // User with every field invalid
    badUser := &User{
        Name:     "",
        Email:    "invalid",
        Password: "short",
        Age:      -5,
    }

    err := validateUser(badUser)
    if err != nil {
        fmt.Printf("Validation errors:\n%v\n\n", err)

        // Search for a specific type with errors.As
        var ve *ValidationError
        if errors.As(err, &ve) {
            fmt.Printf("First validation error: field=%s, msg=%s\n\n",
                ve.Field, ve.Message)
        }
    }

    // Valid user
    goodUser := &User{
        Name:     "Alice",
        Email:    "alice@example.com",
        Password: "SecureP4ss",
        Age:      30,
    }

    err = validateUser(goodUser)
    if err == nil {
        fmt.Println("Valid user!")
    }

    // Partially invalid user
    partialUser := &User{
        Name:     "Bob",
        Email:    "bob@example.com",
        Password: "weak",
        Age:      25,
    }

    err = validateUser(partialUser)
    if err != nil {
        fmt.Printf("Partial errors:\n%v\n", err)
    }
}
```

### Code Example 6: Implementing Unwrap on a Custom Error Type

```go
package main

import (
    "errors"
    "fmt"
    "time"
)

// AppError is an error type used throughout the application
type AppError struct {
    Code       string
    Message    string
    Err        error
    Timestamp  time.Time
    RequestID  string
    StackTrace string // In production, obtain with runtime/debug.Stack(), etc.
}

func NewAppError(code, message string, err error) *AppError {
    return &AppError{
        Code:      code,
        Message:   message,
        Err:       err,
        Timestamp: time.Now(),
    }
}

func (e *AppError) Error() string {
    if e.Err != nil {
        return fmt.Sprintf("[%s] %s: %v", e.Code, e.Message, e.Err)
    }
    return fmt.Sprintf("[%s] %s", e.Code, e.Message)
}

func (e *AppError) Unwrap() error {
    return e.Err
}

func (e *AppError) WithRequestID(id string) *AppError {
    e.RequestID = id
    return e
}

// Error code constants
const (
    ErrCodeNotFound      = "NOT_FOUND"
    ErrCodeUnauthorized  = "UNAUTHORIZED"
    ErrCodeValidation    = "VALIDATION_ERROR"
    ErrCodeInternal      = "INTERNAL_ERROR"
    ErrCodeTimeout       = "TIMEOUT"
    ErrCodeConflict      = "CONFLICT"
    ErrCodeRateLimited   = "RATE_LIMITED"
)

// Mapping to HTTP status codes
func (e *AppError) HTTPStatus() int {
    switch e.Code {
    case ErrCodeNotFound:
        return 404
    case ErrCodeUnauthorized:
        return 401
    case ErrCodeValidation:
        return 400
    case ErrCodeConflict:
        return 409
    case ErrCodeRateLimited:
        return 429
    case ErrCodeTimeout:
        return 504
    default:
        return 500
    }
}

// Struct for JSON responses
type ErrorResponse struct {
    Code      string `json:"code"`
    Message   string `json:"message"`
    RequestID string `json:"request_id,omitempty"`
}

func (e *AppError) ToResponse() ErrorResponse {
    return ErrorResponse{
        Code:      e.Code,
        Message:   e.Message,
        RequestID: e.RequestID,
    }
}

// Convenient constructor functions
var ErrNotFound = errors.New("not found")
var ErrTimeout = errors.New("timeout")

func NotFoundError(resource string, id interface{}) *AppError {
    return NewAppError(ErrCodeNotFound,
        fmt.Sprintf("%s (id=%v) not found", resource, id),
        ErrNotFound)
}

func TimeoutError(operation string, duration time.Duration) *AppError {
    return NewAppError(ErrCodeTimeout,
        fmt.Sprintf("%s timed out after %v", operation, duration),
        ErrTimeout)
}

func ValidationError(field, message string) *AppError {
    return NewAppError(ErrCodeValidation,
        fmt.Sprintf("validation failed: %s - %s", field, message),
        nil)
}

func main() {
    // Usage example of AppError
    err := NotFoundError("User", 42).WithRequestID("req-abc-123")
    fmt.Println(err)
    fmt.Printf("HTTP Status: %d\n", err.HTTPStatus())
    fmt.Printf("Response: %+v\n", err.ToResponse())

    // Unwrap chain
    fmt.Println(errors.Is(err, ErrNotFound)) // true

    // Extracting AppError
    wrapped := fmt.Errorf("handler: %w", err)
    var appErr *AppError
    if errors.As(wrapped, &appErr) {
        fmt.Printf("Code: %s, Message: %s\n", appErr.Code, appErr.Message)
    }

    // Timeout error
    tErr := TimeoutError("database query", 5*time.Second)
    fmt.Println(tErr)
    fmt.Println(errors.Is(tErr, ErrTimeout)) // true
}
```

### Code Example 7: Appropriate Use of panic/recover

```go
package main

import (
    "fmt"
    "log"
    "net/http"
    "runtime/debug"
)

// Situations where panic is appropriate:
// 1. Programming errors (unreachable code)
// 2. Unrecoverable errors during initialization
// 3. Detecting bugs inside a library

// Middleware using recover
func recoveryMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        defer func() {
            if rec := recover(); rec != nil {
                // Log the stack trace
                log.Printf("PANIC recovered: %v\n%s", rec, debug.Stack())

                // Return 500 to the client
                http.Error(w, "Internal Server Error", http.StatusInternalServerError)
            }
        }()
        next.ServeHTTP(w, r)
    })
}

// Use panic internally in a library, but recover in the public API
func parseExpression(expr string) (result float64, err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("parse expression %q: %v", expr, r)
        }
    }()

    // Internally, propagate errors concisely with panic
    result = evalExpr(expr)
    return result, nil
}

func evalExpr(expr string) float64 {
    if expr == "" {
        panic("empty expression") // panic only internally
    }
    // Hardcoded for simplicity
    return 42.0
}

// Must pattern: use only in main/init
func MustParseConfig(path string) map[string]string {
    config, err := loadConfig(path)
    if err != nil {
        panic(fmt.Sprintf("failed to load config %q: %v", path, err))
    }
    return config
}

func loadConfig(path string) (map[string]string, error) {
    // Simulation
    return map[string]string{"key": "value"}, nil
}

// assertNever: indicates unreachable code
func processStatus(status string) string {
    switch status {
    case "active":
        return "User is active"
    case "inactive":
        return "User is inactive"
    case "deleted":
        return "User is deleted"
    default:
        // An unknown status is a programming error
        panic(fmt.Sprintf("unexpected status: %q", status))
    }
}

// Panic-safe handling inside a cleanup deferred function
func processFile(path string) (err error) {
    // recover in defer
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("process file: panic: %v", r)
        }
    }()

    fmt.Printf("Processing %s\n", path)
    // Processing...
    return nil
}

func main() {
    // Must pattern
    config := MustParseConfig("config.json")
    fmt.Printf("Config: %v\n", config)

    // recover in parseExpression
    result, err := parseExpression("1+2")
    if err != nil {
        fmt.Printf("Parse error: %v\n", err)
    } else {
        fmt.Printf("Result: %.1f\n", result)
    }

    result, err = parseExpression("")
    if err != nil {
        fmt.Printf("Parse error: %v\n", err) // panic is converted into an error
    }

    // processStatus
    fmt.Println(processStatus("active"))

    // An invalid status will panic, but we can recover in defer
    func() {
        defer func() {
            if r := recover(); r != nil {
                fmt.Printf("Recovered: %v\n", r)
            }
        }()
        processStatus("unknown")
    }()
}
```

### Code Example 8: Practical Patterns for Error Handling

```go
package main

import (
    "context"
    "errors"
    "fmt"
    "log/slog"
    "time"
)

// errWriter pattern: aggregating errors across consecutive I/O operations
type errWriter struct {
    err error
}

func (ew *errWriter) writeString(s string) {
    if ew.err != nil {
        return // Do nothing after the first error
    }
    fmt.Print(s) // In practice, write to an io.Writer
}

func (ew *errWriter) writef(format string, args ...interface{}) {
    if ew.err != nil {
        return
    }
    fmt.Printf(format, args...)
}

// Retry pattern
type RetryConfig struct {
    MaxRetries int
    BaseDelay  time.Duration
    MaxDelay   time.Duration
}

func retry(ctx context.Context, config RetryConfig, operation func() error) error {
    var lastErr error
    delay := config.BaseDelay

    for attempt := 0; attempt <= config.MaxRetries; attempt++ {
        if attempt > 0 {
            slog.Info("retrying operation",
                "attempt", attempt,
                "delay", delay,
                "last_error", lastErr)

            select {
            case <-time.After(delay):
            case <-ctx.Done():
                return fmt.Errorf("retry cancelled: %w", ctx.Err())
            }

            // Exponential backoff
            delay *= 2
            if delay > config.MaxDelay {
                delay = config.MaxDelay
            }
        }

        lastErr = operation()
        if lastErr == nil {
            return nil
        }

        // Do not retry non-temporary errors
        if !isRetryable(lastErr) {
            return fmt.Errorf("non-retryable error: %w", lastErr)
        }
    }

    return fmt.Errorf("max retries (%d) exceeded: %w", config.MaxRetries, lastErr)
}

func isRetryable(err error) bool {
    // Do not retry on context cancellation
    if errors.Is(err, context.Canceled) || errors.Is(err, context.DeadlineExceeded) {
        return false
    }
    // Check for specific error types
    var tempErr interface{ Temporary() bool }
    if errors.As(err, &tempErr) {
        return tempErr.Temporary()
    }
    return true // By default, treat as retryable
}

// Best practices for error logging
func handleRequest(ctx context.Context, userID int) error {
    logger := slog.With("user_id", userID, "request_id", "req-123")

    user, err := findUser(ctx, userID)
    if err != nil {
        if errors.Is(err, ErrNotFound) {
            // Expected error: INFO level
            logger.Info("user not found", "error", err)
            return err
        }
        // Unexpected error: ERROR level
        logger.Error("failed to find user", "error", err)
        return fmt.Errorf("handle request: %w", err)
    }

    logger.Info("user found", "user_name", user.Name)
    return nil
}

var ErrNotFound = errors.New("not found")

type User struct {
    ID   int
    Name string
}

func findUser(ctx context.Context, id int) (*User, error) {
    if id > 100 {
        return nil, ErrNotFound
    }
    return &User{ID: id, Name: "Alice"}, nil
}

// Error aggregation pattern (concurrent processing)
func fetchAll(ctx context.Context, urls []string) ([]string, error) {
    type result struct {
        url  string
        body string
        err  error
    }

    results := make(chan result, len(urls))

    for _, url := range urls {
        go func(u string) {
            // Simulating HTTP GET
            body := fmt.Sprintf("body of %s", u)
            results <- result{url: u, body: body, err: nil}
        }(url)
    }

    var bodies []string
    var errs []error

    for range urls {
        r := <-results
        if r.err != nil {
            errs = append(errs, fmt.Errorf("fetch %s: %w", r.url, r.err))
        } else {
            bodies = append(bodies, r.body)
        }
    }

    if len(errs) > 0 {
        return bodies, errors.Join(errs...)
    }
    return bodies, nil
}

func main() {
    // errWriter pattern
    ew := &errWriter{}
    ew.writeString("Hello ")
    ew.writef("World %d\n", 42)
    if ew.err != nil {
        fmt.Printf("Write error: %v\n", ew.err)
    }

    // Retry pattern
    ctx := context.Background()
    attempt := 0
    err := retry(ctx, RetryConfig{
        MaxRetries: 3,
        BaseDelay:  10 * time.Millisecond,
        MaxDelay:   100 * time.Millisecond,
    }, func() error {
        attempt++
        if attempt < 3 {
            return fmt.Errorf("temporary error (attempt %d)", attempt)
        }
        return nil // Succeeds on the 3rd try
    })

    if err != nil {
        fmt.Printf("Retry failed: %v\n", err)
    } else {
        fmt.Printf("Succeeded after %d attempts\n", attempt)
    }

    // Concurrent error aggregation
    urls := []string{"http://a.com", "http://b.com", "http://c.com"}
    bodies, err := fetchAll(ctx, urls)
    if err != nil {
        fmt.Printf("Fetch errors: %v\n", err)
    }
    fmt.Printf("Fetched %d bodies\n", len(bodies))
}
```

---

## 2. ASCII Diagrams

### Diagram 1: Error Chain

```
fmt.Errorf("handler: %w",
  fmt.Errorf("service: %w",
    fmt.Errorf("repo: %w",
      ErrNotFound)))

Error chain:
┌─────────────────┐
│ "handler: ..."  │
│   Unwrap() ─────┼──> ┌──────────────────┐
└─────────────────┘    │ "service: ..."   │
                       │   Unwrap() ──────┼──> ┌────────────────┐
                       └──────────────────┘    │ "repo: ..."    │
                                               │   Unwrap() ────┼──> ErrNotFound
                                               └────────────────┘
errors.Is(err, ErrNotFound) → walks the chain and returns true

Error message:
"handler: service: repo: not found"
                         ↑
                 the original sentinel error
```

### Diagram 2: errors.Is vs errors.As

```
┌─────────────────────────────────────────────┐
│              errors.Is(err, target)          │
│  Purpose: check whether a specific error     │
│           value matches                      │
│  Traversal: recursively follows Unwrap()     │
│  Comparison: == or the Is() method           │
│  Returns: bool                                │
│                                              │
│  Use cases:                                    │
│  - Checking for sentinel errors                │
│  - errors.Is(err, ErrNotFound)               │
│  - errors.Is(err, context.Canceled)          │
│  - errors.Is(err, sql.ErrNoRows)            │
├─────────────────────────────────────────────┤
│              errors.As(err, &target)         │
│  Purpose: extract a specific error type      │
│  Traversal: recursively follows Unwrap()     │
│  Comparison: type assertion                  │
│  Returns: bool (target is set to the value)  │
│                                              │
│  Use cases:                                    │
│  - Retrieving details from custom error types  │
│  - var httpErr *HTTPError                    │
│    errors.As(err, &httpErr)                  │
│  - var pathErr *os.PathError                 │
│    errors.As(err, &pathErr)                  │
└─────────────────────────────────────────────┘
```

### Diagram 3: Decision Flow for Error Handling

```
         An error occurs
              │
              ▼
     ┌────────────────┐
     │ What kind of error? │
     └───┬────────┬───┘
         │        │
     Expected   Unexpected
      error      error
         │        │
         ▼        ▼
   ┌──────────┐ ┌──────────────┐
   │ Handle    │ │ Wrap with %w │
   │ properly  │ │ and return   │
   │ (log etc.)│ │ to caller    │
   └──────────┘ └──────────────┘
         │              │
         ▼              ▼
   ┌──────────┐  ┌──────────────┐
   │ Can it   │  │ Add context  │
   │ recover? │  │ and return   │
   │ YES→fix  │  └──────────────┘
   │ NO→return│         │
   └──────────┘         ▼
                  ┌──────────────┐
                  │ Log and      │
                  │ respond at   │
                  │ the top      │
                  └──────────────┘

Layer-specific responsibilities:
┌────────────────────────────────────────┐
│ Handler layer: error type → HTTP status │
│ ├─ ErrNotFound → 404                  │
│ ├─ ErrValidation → 400                │
│ ├─ ErrUnauthorized → 401              │
│ └─ Other → 500                         │
├────────────────────────────────────────┤
│ Service layer: add business-logic context│
│ └─ fmt.Errorf("get user: %w", err)    │
├────────────────────────────────────────┤
│ Repository layer: add data-access context│
│ └─ fmt.Errorf("query users: %w", err) │
├────────────────────────────────────────┤
│ Infrastructure layer: produces low-level errors│
│ └─ sql.ErrNoRows, net.Error, etc.     │
└────────────────────────────────────────┘
```

### Diagram 4: How errors.Join Works (Go 1.20+)

```
errors.Join(err1, err2, err3)

Result:
┌──────────────────────────────────────┐
│  joinError                           │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ err1 │ │ err2 │ │ err3 │        │
│  └──────┘ └──────┘ └──────┘        │
│                                      │
│  Unwrap() []error → [err1, err2, err3]│
│                                      │
│  errors.Is(joined, err1) → true      │
│  errors.Is(joined, err2) → true      │
│  errors.Is(joined, err3) → true      │
│                                      │
│  Error() → "err1\nerr2\nerr3"       │
└──────────────────────────────────────┘

Using it in validation:
  validate(user) → errors.Join(
    nameErr,    // "name: required"
    emailErr,   // "email: invalid format"
    passErr,    // "password: too short"
  )

  ↓ Individual errors can also be retrieved with errors.As

  var ve *ValidationError
  errors.As(joined, &ve) → true (the first match)
```

### Diagram 5: panic/recover Flow

```
Execution flow of a goroutine:

Normal completion:
  main() → f1() → f2() → return → return → return

Panic occurs:
  main() → f1() → f2() → panic("!!")
                              │
                    ┌─────────▼──────────┐
                    │ Execute the defer   │
                    │ stack in reverse    │
                    │                     │
                    │ f2's defer → run    │
                    │ f1's defer → run    │
                    │ main's defer → run  │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │ If there is no      │
                    │ recover(), the      │
                    │ program terminates  │
                    └─────────────────────┘

When recover() is present:
  main() → f1() → f2() → panic("!!")
                              │
                    ┌─────────▼──────────┐
                    │ f2's defer:        │
                    │   recover() → "!!" │ ← captures the panic
                    │   convert to err   │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │ f2 returns normally │
                    │ (returns err)       │
                    └──────────┬──────────┘
                               │
                    f1 and main continue executing normally
```

---

## 3. Comparison Tables

### Table 1: Comparison of Error Handling Approaches

| Approach | Go | Java | Rust | Python | TypeScript |
|-----------|-----|------|------|--------|------------|
| Mechanism | Return value (error) | Exception | Result<T,E> | Exception | Exception + Promise |
| Behavior when unhandled | Compiles fine | Crashes | Compile error | Crashes | Crashes |
| Type information | interface (dynamic) | Class hierarchy | enum (static) | Class hierarchy | any |
| Exhaustiveness check | None | None (except checked) | Yes (match) | None | None |
| Control flow | Explicit if err != nil | try-catch | ? operator | try-except | try-catch + .catch |
| Multiple errors | errors.Join | suppressed | -- | ExceptionGroup | AggregateError |
| Stack trace | None (implement manually) | Automatically attached | None | Automatically attached | Automatically attached |

### Table 2: Comparison of Go Error Patterns

| Pattern | Use case | Example | Benefits | Drawbacks |
|---------|---------|---------|----------|-----------|
| sentinel error | Known error conditions | `ErrNotFound` | Simple, fast comparison | No additional information |
| Custom error type | When additional information is needed | `*ValidationError` | Rich information, type safe | Verbose to define |
| `fmt.Errorf("%w")` | Adding context | `"open config: %w"` | Easy, chain inspectable | Loses type information |
| `errors.Join` | Aggregating multiple errors | Validation | Exhaustive validation possible | Longer error messages |
| panic/recover | Truly unrecoverable state | Programming errors | Concise | Dangerous when abused |
| AppError (structured) | API errors | `{code, msg, err}` | HTTP integration, log integration | Adds complexity |

### Table 3: Criteria for Choosing %w vs %v

| Situation | Format to use | Reason |
|-----------|--------------|--------|
| Propagating an internal error as-is | `%w` | Enables chain inspection |
| Library public API | `%v` | Hides internal implementation details |
| Within the same package | `%w` | Detailed error checks are needed |
| External package boundaries | Depends | Use `%w` only for stable errors |
| Log output | `%v` | Just record as a string |
| Propagating a sentinel error | `%w` | To enable inspection with errors.Is |

---

## 4. Anti-Patterns

### Anti-Pattern 1: Swallowing Errors

```go
// BAD: ignoring the error
result, _ := doSomething()

// BAD: only logging and not handling
if err != nil {
    log.Println(err) // the caller thinks it succeeded
    // no return!
}

// BAD: empty error check
if err != nil {
    // TODO: handle error
}

// GOOD: return the error
result, err := doSomething()
if err != nil {
    return fmt.Errorf("do something: %w", err)
}

// GOOD: add a comment when deliberately ignoring an error
_ = conn.Close() // best-effort close, error is intentionally ignored
```

### Anti-Pattern 2: Redundant Error Messages

```go
// BAD: "failed to" chains become verbose
// Result: "failed to get user: failed to query db: failed to connect: timeout"
func getUser(id int) (*User, error) {
    user, err := queryDB(id)
    if err != nil {
        return nil, fmt.Errorf("failed to get user: %w", err)
    }
    return user, nil
}

func queryDB(id int) (*User, error) {
    conn, err := connect()
    if err != nil {
        return nil, fmt.Errorf("failed to query db: %w", err)
    }
    _ = conn
    return nil, nil
}

// GOOD: add context concisely (omit verbs)
// Result: "get user: query db: connect: timeout"
func getUser(id int) (*User, error) {
    user, err := queryDB(id)
    if err != nil {
        return nil, fmt.Errorf("get user (id=%d): %w", id, err)
    }
    return user, nil
}

func queryDB(id int) (*User, error) {
    conn, err := connect()
    if err != nil {
        return nil, fmt.Errorf("query db: %w", err)
    }
    _ = conn
    return nil, nil
}
```

### Anti-Pattern 3: Double-Handling Errors

```go
// BAD: logging the same error and then returning it
func processOrder(id int) error {
    order, err := findOrder(id)
    if err != nil {
        log.Printf("ERROR: failed to find order: %v", err) // log output
        return fmt.Errorf("find order: %w", err)            // and also return
        // → it will be logged by the caller as well → the same error is recorded twice
    }
    _ = order
    return nil
}

// GOOD: log in only one layer (usually the top)
func processOrder(id int) error {
    order, err := findOrder(id)
    if err != nil {
        return fmt.Errorf("process order: find order (id=%d): %w", id, err)
    }
    _ = order
    return nil
}

// Log in the top-level handler
func handleOrder(w http.ResponseWriter, r *http.Request) {
    if err := processOrder(42); err != nil {
        log.Printf("ERROR: %v", err) // log only here
        http.Error(w, "error", 500)
    }
}
```

### Anti-Pattern 4: Using panic in Place of Error Handling

```go
// BAD: library function panics
func ParseConfig(data []byte) *Config {
    var config Config
    if err := json.Unmarshal(data, &config); err != nil {
        panic(fmt.Sprintf("invalid config: %v", err)) // NG: crashes the caller
    }
    return &config
}

// GOOD: return an error
func ParseConfig(data []byte) (*Config, error) {
    var config Config
    if err := json.Unmarshal(data, &config); err != nil {
        return nil, fmt.Errorf("parse config: %w", err)
    }
    return &config, nil
}

// The Must pattern is limited to main/init
func MustParseConfig(data []byte) *Config {
    config, err := ParseConfig(data)
    if err != nil {
        panic(err)
    }
    return config
}

// Use Must only in main()
func main() {
    config := MustParseConfig(configData)
    _ = config
}
```

### Anti-Pattern 5: Using the Result Before Checking the Error

```go
// BAD: using result before checking err
func process() {
    result, err := fetchData()
    fmt.Println(result.Name) // if err is non-nil, result may be invalid
    if err != nil {
        log.Fatal(err)
    }
}

// GOOD: check the error first
func process() {
    result, err := fetchData()
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(result.Name) // use after confirming there is no error
}
```

---

## 5. FAQ

### Q1: When should panic be used?

Use panic only for programming errors (nil pointer dereferences, out-of-range access, etc.) or unrecoverable initialization errors. For ordinary business logic, always return an `error`. Libraries must not let panic leak out to their callers.

Situations where panic is appropriate:
1. Configuration loading failures in `main()` or `init()`
2. When program invariants are violated
3. Asserting unreachable code (e.g., `default` cases)
4. Preconditions in test helpers

### Q2: What is the difference between `%w` and `%v`?

`%w` wraps an error and makes chain inspection with `errors.Is`/`errors.As` possible. `%v` simply embeds the error message as a string. As a rule, use `%w`, but use `%v` when you want to hide internal implementation (e.g., in a library's public API).

```go
// %w: the error chain is preserved
err := fmt.Errorf("open: %w", os.ErrNotExist)
errors.Is(err, os.ErrNotExist) // true

// %v: the error chain is broken
err := fmt.Errorf("open: %v", os.ErrNotExist)
errors.Is(err, os.ErrNotExist) // false
```

### Q3: What are the naming conventions for error messages?

Go's conventions: (1) start with a lowercase letter, (2) do not prefix with "failed to", (3) do not prefix with the package name (it is added naturally by wrapping), (4) do not end with punctuation. Example: `"open config file: %w"` is a good form.

```go
// BAD
return fmt.Errorf("Failed to open the config file: %w", err)

// GOOD
return fmt.Errorf("open config: %w", err)

// BAD
return fmt.Errorf("mypackage.ReadConfig: %w", err)

// GOOD
return fmt.Errorf("read config: %w", err)
```

### Q4: What is the difference between errors.Is and ==?

`==` performs a direct comparison only. `errors.Is` walks the error chain to search.

```go
base := errors.New("base error")
wrapped := fmt.Errorf("wrapped: %w", base)

wrapped == base          // false (different objects)
errors.Is(wrapped, base) // true (base is contained in the chain)
```

Also, `errors.Is` calls a custom `Is()` method if one exists. This enables flexible comparisons such as partial value matching.

### Q5: How did error handling change from pre-Go 1.13 to post-Go 1.13?

`errors.Is`, `errors.As`, and `fmt.Errorf("%w")` were introduced in Go 1.13. As a result:

- **Pre-1.13**: Direct comparison with `err == ErrNotFound`. Wrapping made comparison impossible
- **Post-1.13**: `errors.Is(err, ErrNotFound)` searches the entire chain. Detection still works even after wrapping

In Go 1.20, `errors.Join` was added, standardizing the aggregation of multiple errors.

### Q6: Should errors include a stack trace?

Go's standard library is designed not to include stack traces. The reasons are: (1) performance impact, (2) adding context to error messages provides sufficient traceability, (3) combining with structured logging works well.

When a stack trace is needed, these approaches are available:
- Output `runtime/debug.Stack()` to logs
- Use a third-party library (`pkg/errors`, etc.)
- Obtain it via panic/recover (in production, use recovery middleware)
- Tracing via OpenTelemetry

---


## FAQ

### Q1: What is the most important point to focus on when learning this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory, but by actually writing and running code to see how things work.

### Q2: What are common mistakes beginners make?

Skipping the basics and jumping to advanced topics. We recommend solidly understanding the fundamental concepts explained in this guide before moving on to the next step.

### Q3: How is this applied in real-world development?

The knowledge from this topic is frequently applied in day-to-day development work. It becomes especially important during code reviews and architecture design.

---

## 6. Summary

| Concept | Key Points |
|---------|------------|
| error interface | An interface with `Error() string` |
| sentinel error | Defined as `var ErrXxx = errors.New(...)` |
| Wrapping | `fmt.Errorf("context: %w", err)` |
| errors.Is | Whether the error chain contains a specific error |
| errors.As | Extracts a specific type from the error chain |
| errors.Join | Joins multiple errors (Go 1.20+) |
| panic/recover | Only for unrecoverable errors. Libraries must not let it leak |
| Error messages | Lowercase start, concise, add context, no "failed to" |
| Layered handling | Lower: wrap and return; Upper: identify kind + respond |

---

## Recommended Next Reads

- [03-packages-modules.md](./03-packages-modules.md) -- Packages and modules
- [../02-web/04-testing.md](../02-web/04-testing.md) -- Error verification in testing
- [../03-tools/04-best-practices.md](../03-tools/04-best-practices.md) -- Best practices

---

## References

1. **Go Blog, "Working with Errors in Go 1.13"** -- https://go.dev/blog/go1.13-errors
2. **Go Blog, "Error handling and Go"** -- https://go.dev/blog/error-handling-and-go
3. **Standard library: errors package** -- https://pkg.go.dev/errors
4. **Go Blog, "Errors are values"** -- https://go.dev/blog/errors-are-values
5. **Go Wiki: Errors** -- https://go.dev/wiki/Errors
6. **Dave Cheney, "Don't just check errors, handle them gracefully"** -- https://dave.cheney.net/2016/04/27/dont-just-check-errors-handle-them-gracefully



===== SOURCE: 02-programming/go-practical-guide/docs/00-basics/03-packages-modules.md =====

# Packages and Modules -- Organizing Go Code

> Go manages packages through a go.mod-based module system, achieving robust dependency management via imports, internal packages, and versioning.

---

## What You Will Learn in This Chapter

1. **How packages work** -- The directory-equals-package principle
2. **go.mod / go.sum** -- The foundation of the module system
3. **internal packages** -- Visibility control and API design
4. **Workspaces** -- Multi-module development
5. **Dependency management in practice** -- go get, go mod tidy, vendor, proxies
6. **Project design patterns** -- Layout, avoiding circular dependencies, layered architecture


## Prerequisites

Before reading this guide, the following knowledge will help deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts
- Familiarity with the content of [Error Handling -- Go's Error Design Philosophy](./02-error-handling.md)

---

## 1. Package Basics

### Code Example 1: Package Structure

```
myproject/
├── go.mod
├── go.sum
├── main.go
├── internal/
│   ├── config/
│   │   ├── config.go
│   │   └── config_test.go
│   ├── handler/
│   │   ├── user.go
│   │   ├── order.go
│   │   └── middleware.go
│   ├── repository/
│   │   ├── user_repo.go
│   │   └── order_repo.go
│   ├── service/
│   │   ├── user_service.go
│   │   └── order_service.go
│   └── model/
│       ├── user.go
│       └── order.go
├── pkg/
│   ├── validator/
│   │   ├── validator.go
│   │   └── validator_test.go
│   └── httputil/
│       ├── response.go
│       └── middleware.go
├── cmd/
│   ├── server/
│   │   └── main.go
│   └── worker/
│       └── main.go
├── api/
│   ├── proto/
│   │   └── user.proto
│   └── openapi/
│       └── spec.yaml
├── migrations/
│   ├── 001_create_users.up.sql
│   └── 001_create_users.down.sql
├── scripts/
│   └── setup.sh
├── Makefile
├── Dockerfile
└── README.md
```

### Code Example 2: Package Declaration and Basic Rules

```go
// A package declaration is required at the top of every file
// The directory name and package name should match (by convention)
package user

import (
    "context"
    "fmt"
    "time"

    // Separate standard library and third-party imports with a blank line
    "github.com/google/uuid"

    // Intra-project packages
    "github.com/myorg/myproject/internal/model"
)

// Multiple package declarations in a single directory are not allowed
// However, _test packages are an exception (for black-box testing)

// All files in the same package share the same package name
// user.go, user_service.go, user_repo.go → all "package user"
```

### Code Example 3: go.mod File in Detail

```go
// go.mod is placed at the root of the module
// Generated by "go mod init"

module github.com/myorg/myproject

go 1.22

// Direct dependencies
require (
    github.com/gin-gonic/gin v1.9.1
    github.com/lib/pq v1.10.9
    go.uber.org/zap v1.27.0
    github.com/stretchr/testify v1.9.0
    github.com/redis/go-redis/v9 v9.5.1
    google.golang.org/grpc v1.63.2
    google.golang.org/protobuf v1.33.0
)

// Indirect dependencies (those required by direct dependencies)
require (
    github.com/bytedance/sonic v1.11.3 // indirect
    github.com/gabriel-vasile/mimetype v1.4.3 // indirect
    golang.org/x/net v0.22.0 // indirect
    golang.org/x/sys v0.18.0 // indirect
    golang.org/x/text v0.14.0 // indirect
)

// retract: do not use this version (for your own module)
retract (
    v1.0.0 // critical bug
    [v0.9.0, v0.9.5] // security vulnerability
)
```

### Code Example 4: Structure of go.sum

```
// go.sum records the hashes of modules
// Each entry has the following format:
// <module> <version> <hash>
// <module> <version>/go.mod <hash>

github.com/gin-gonic/gin v1.9.1 h1:4idEAncQnU5cB7BeOkPtxjfCSye0AAm1R0RVIqFPSHw=
github.com/gin-gonic/gin v1.9.1/go.mod h1:hPrL/0KcuKM0A0CD0A0CD=
github.com/lib/pq v1.10.9 h1:YXG7RB+JIjhP29X+OtkiDnYaXQwpS4JEWq7dtCCRUEw=
github.com/lib/pq v1.10.9/go.mod h1:AlVN5x4E4T544tWzH6hKFbGRn7nbIqu9HhEDnDfBSXo=

// h1: is the SHA-256 hash
// The hash of go.mod is recorded separately
// This enables detection of tampered dependencies
```

### Code Example 5: Export Rules in Detail

```go
package user

import (
    "encoding/json"
    "fmt"
    "strings"
    "time"
)

// ==========================================
// Starts with an uppercase letter = exported (public)
// Starts with a lowercase letter = unexported (private)
// ==========================================

// User is a public type (starts with uppercase)
// Accessible from other packages as user.User
type User struct {
    ID        int       `json:"id"`         // public field
    Name      string    `json:"name"`       // public field
    Email     string    `json:"email"`      // public field
    CreatedAt time.Time `json:"created_at"` // public field
    age       int       // private field (package-internal only)
    password  string    // private field
}

// NewUser is a constructor function (public)
// Since Go has no classes, use the "New + type name" naming convention
func NewUser(name, email string) *User {
    return &User{
        Name:      name,
        Email:     email,
        CreatedAt: time.Now(),
        age:       defaultAge(),
        password:  "",
    }
}

// Validate is a public method
func (u *User) Validate() error {
    if u.Name == "" {
        return fmt.Errorf("name is required")
    }
    if !strings.Contains(u.Email, "@") {
        return fmt.Errorf("invalid email: %s", u.Email)
    }
    return nil
}

// SetPassword is a public method (accessor for a private field)
func (u *User) SetPassword(plain string) error {
    if len(plain) < 8 {
        return fmt.Errorf("password must be at least 8 characters")
    }
    u.password = hashPassword(plain) // uses a private function
    return nil
}

// String implements the fmt.Stringer interface
func (u *User) String() string {
    return fmt.Sprintf("User{ID:%d, Name:%s, Email:%s}", u.ID, u.Name, u.Email)
}

// MarshalJSON implements json.Marshaler
// Private fields are excluded from serialization
func (u *User) MarshalJSON() ([]byte, error) {
    type Alias User // prevent infinite recursion
    return json.Marshal(&struct {
        *Alias
        Age int `json:"age,omitempty"`
    }{
        Alias: (*Alias)(u),
        Age:   u.age,
    })
}

// defaultAge is a private function (starts with lowercase)
func defaultAge() int {
    return 0
}

// hashPassword is a private function
func hashPassword(plain string) string {
    // In reality, use bcrypt or similar
    return "hashed_" + plain
}

// UserRole is a group of public type constants
type UserRole string

const (
    RoleAdmin  UserRole = "admin"   // public constant
    RoleUser   UserRole = "user"    // public constant
    RoleGuest  UserRole = "guest"   // public constant
    roleSystem UserRole = "system"  // private constant
)

// UserOption is a public type used in the Functional Options pattern
type UserOption func(*User)

// WithAge is an option function (public)
func WithAge(age int) UserOption {
    return func(u *User) {
        u.age = age // set a private field via an option
    }
}

// WithPassword is an option function (public)
func WithPassword(password string) UserOption {
    return func(u *User) {
        u.password = hashPassword(password)
    }
}

// NewUserWithOptions is a constructor that uses Functional Options
func NewUserWithOptions(name, email string, opts ...UserOption) *User {
    u := NewUser(name, email)
    for _, opt := range opts {
        opt(u)
    }
    return u
}
```

### Code Example 6: internal Package in Detail

```go
// ==========================================
// Access control with internal packages
// ==========================================

// Project structure:
// github.com/myorg/myproject/
// ├── internal/
// │   ├── database/    ← accessible only within myproject
// │   │   └── db.go
// │   ├── auth/        ← accessible only within myproject
// │   │   └── jwt.go
// │   └── middleware/  ← accessible only within myproject
// │       └── cors.go
// ├── cmd/server/
// │   └── main.go      ← can access internal/*
// └── pkg/client/
//     └── client.go    ← can access internal/*

// === internal/database/db.go ===
package database

import (
    "context"
    "database/sql"
    "fmt"
    "time"

    _ "github.com/lib/pq" // blank import (runs only init())
)

// Config is a private configuration type (used only within internal)
type Config struct {
    Host     string
    Port     int
    User     string
    Password string
    DBName   string
    SSLMode  string
    MaxConns int
    Timeout  time.Duration
}

// DefaultConfig returns the default configuration
func DefaultConfig() Config {
    return Config{
        Host:     "localhost",
        Port:     5432,
        SSLMode:  "disable",
        MaxConns: 25,
        Timeout:  30 * time.Second,
    }
}

// DB is a wrapper around a database connection
type DB struct {
    conn *sql.DB
    cfg  Config
}

// Connect connects to the database
func Connect(cfg Config) (*DB, error) {
    dsn := fmt.Sprintf(
        "host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
        cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.DBName, cfg.SSLMode,
    )

    conn, err := sql.Open("postgres", dsn)
    if err != nil {
        return nil, fmt.Errorf("database open: %w", err)
    }

    conn.SetMaxOpenConns(cfg.MaxConns)
    conn.SetMaxIdleConns(cfg.MaxConns / 2)
    conn.SetConnMaxLifetime(cfg.Timeout)

    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    if err := conn.PingContext(ctx); err != nil {
        conn.Close()
        return nil, fmt.Errorf("database ping: %w", err)
    }

    return &DB{conn: conn, cfg: cfg}, nil
}

// Close closes the database connection
func (db *DB) Close() error {
    return db.conn.Close()
}

// Conn returns the internal *sql.DB
func (db *DB) Conn() *sql.DB {
    return db.conn
}
```

```go
// === internal/auth/jwt.go ===
package auth

import (
    "errors"
    "time"

    "github.com/golang-jwt/jwt/v5"
)

var (
    ErrInvalidToken = errors.New("invalid token")
    ErrExpiredToken = errors.New("token expired")
)

// Claims represents the JWT claims
type Claims struct {
    UserID int    `json:"user_id"`
    Role   string `json:"role"`
    jwt.RegisteredClaims
}

// TokenService generates and verifies JWT tokens
type TokenService struct {
    secretKey []byte
    issuer    string
    duration  time.Duration
}

// NewTokenService creates a TokenService
func NewTokenService(secret, issuer string, duration time.Duration) *TokenService {
    return &TokenService{
        secretKey: []byte(secret),
        issuer:    issuer,
        duration:  duration,
    }
}

// Generate creates a JWT token
func (ts *TokenService) Generate(userID int, role string) (string, error) {
    claims := &Claims{
        UserID: userID,
        Role:   role,
        RegisteredClaims: jwt.RegisteredClaims{
            ExpiresAt: jwt.NewNumericDate(time.Now().Add(ts.duration)),
            IssuedAt:  jwt.NewNumericDate(time.Now()),
            Issuer:    ts.issuer,
        },
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString(ts.secretKey)
}

// Validate verifies a JWT token
func (ts *TokenService) Validate(tokenString string) (*Claims, error) {
    token, err := jwt.ParseWithClaims(tokenString, &Claims{},
        func(token *jwt.Token) (interface{}, error) {
            return ts.secretKey, nil
        },
    )
    if err != nil {
        if errors.Is(err, jwt.ErrTokenExpired) {
            return nil, ErrExpiredToken
        }
        return nil, ErrInvalidToken
    }

    claims, ok := token.Claims.(*Claims)
    if !ok || !token.Valid {
        return nil, ErrInvalidToken
    }

    return claims, nil
}
```

### Code Example 7: Workspaces (Go 1.18+) in Detail

```go
// ==========================================
// Multi-module development with Go Workspaces
// ==========================================

// Project structure (monorepo):
// mycompany/
// ├── go.work            ← workspace definition
// ├── api/
// │   ├── go.mod         ← module github.com/mycompany/api
// │   ├── server.go
// │   └── handler/
// │       └── user.go
// ├── shared/
// │   ├── go.mod         ← module github.com/mycompany/shared
// │   ├── model/
// │   │   └── user.go
// │   └── util/
// │       └── string.go
// ├── worker/
// │   ├── go.mod         ← module github.com/mycompany/worker
// │   └── processor.go
// └── tools/
//     ├── go.mod         ← module github.com/mycompany/tools
//     └── generator.go

// === go.work ===
// Generated by "go work init ./api ./shared ./worker ./tools"
```

```go
// go.work file
go 1.22

use (
    ./api
    ./shared
    ./worker
    ./tools
)

// replace can also be specified within go.work
// Enables local development without modifying individual go.mod files
replace github.com/external/lib => ../local-fork/lib
```

```go
// === api/go.mod ===
module github.com/mycompany/api

go 1.22

require (
    github.com/mycompany/shared v0.0.0
    github.com/gin-gonic/gin v1.9.1
)

// When go.work exists, the local "shared" is referenced automatically
// When go.work does not exist (e.g., in CI), fetched from the public registry
```

```go
// === shared/model/user.go ===
package model

import "time"

// User is a model shared across multiple modules
type User struct {
    ID        int       `json:"id" db:"id"`
    Name      string    `json:"name" db:"name"`
    Email     string    `json:"email" db:"email"`
    CreatedAt time.Time `json:"created_at" db:"created_at"`
}

// Validate performs user validation
func (u *User) Validate() error {
    if u.Name == "" {
        return ErrNameRequired
    }
    return nil
}
```

```go
// === api/handler/user.go ===
package handler

import (
    "net/http"

    "github.com/gin-gonic/gin"
    "github.com/mycompany/shared/model" // local reference via go.work
)

// UserHandler is an HTTP handler for user-related endpoints
type UserHandler struct {
    // dependency injection
}

func (h *UserHandler) GetUser(c *gin.Context) {
    user := model.User{
        ID:   1,
        Name: "Alice",
    }
    c.JSON(http.StatusOK, user)
}
```

### Code Example 8: How init() Works and How to Use It

```go
// ==========================================
// init() function in detail
// ==========================================

// init() is a special function:
// - No arguments, no return values
// - Executed automatically when the package is imported
// - Multiple definitions per file are allowed (executed top to bottom)
// - Cannot be called directly

// === driver/postgres.go ===
package driver

import (
    "database/sql"
    "log"
)

// init() registers the driver when used as a blank import
func init() {
    sql.Register("postgres-custom", &PostgresDriver{})
    log.Println("PostgreSQL custom driver registered")
}

type PostgresDriver struct{}

// ... implementation of the Driver interface
```

```go
// === main.go ===
package main

import (
    "database/sql"
    "fmt"

    // Blank import: runs only init() (does not add the name to the namespace)
    _ "github.com/myorg/driver"
    // Standard pattern for driver registration
    _ "github.com/lib/pq"
)

func main() {
    // The driver has already been registered by init()
    db, err := sql.Open("postgres", "host=localhost dbname=test")
    if err != nil {
        panic(err)
    }
    defer db.Close()

    fmt.Println("Connected successfully")
}
```

```go
// === Execution order of multiple init() functions ===
package mypackage

import "fmt"

// Within the same file, executed from top to bottom
func init() {
    fmt.Println("init 1")
}

func init() {
    fmt.Println("init 2")
}

func init() {
    fmt.Println("init 3")
}

// Output:
// init 1
// init 2
// init 3
```

```go
// === init() execution order (across packages) ===
// Executed in topological-sort order based on import dependencies
//
// main → A → C
//      → B → C
//
// Execution order: C's init() → A's init() → B's init() → main's init()
// C is initialized first because both A and B depend on it

// === Appropriate use of init() ===
package config

import (
    "log"
    "os"
)

var (
    // package-level variable initialization
    AppEnv    string
    DebugMode bool
)

func init() {
    // Load configuration from environment variables
    AppEnv = os.Getenv("APP_ENV")
    if AppEnv == "" {
        AppEnv = "development"
    }
    DebugMode = AppEnv == "development"
    log.Printf("Environment: %s, Debug: %v", AppEnv, DebugMode)
}
```

### Code Example 9: Using the go get Command

```bash
# Add a module
go get github.com/gin-gonic/gin@latest

# Specify a particular version
go get github.com/gin-gonic/gin@v1.9.1

# Specify a commit hash
go get github.com/gin-gonic/gin@abc1234

# Specify a branch
go get github.com/gin-gonic/gin@main

# Update versions
go get -u github.com/gin-gonic/gin        # minor/patch updates
go get -u=patch github.com/gin-gonic/gin   # patch updates only

# Remove a module (after removing it from go.mod)
go mod tidy

# Update all dependencies
go get -u ./...

# Install a tool with go install (Go 1.17+)
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
go install golang.org/x/tools/cmd/goimports@latest
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
```

### Code Example 10: The go mod Command Family

```bash
# Initialize a module
go mod init github.com/myorg/myproject

# Remove unused dependencies and add any that are missing
go mod tidy

# Verify go.mod / go.sum
go mod verify

# Display the dependency graph
go mod graph

# Show why a particular package is included in dependencies
go mod why github.com/stretchr/testify

# Generate the vendor directory
go mod vendor

# Edit go.mod (for scripts)
go mod edit -require github.com/gin-gonic/gin@v1.9.1
go mod edit -replace github.com/old/pkg=github.com/new/pkg@v1.0.0
go mod edit -retract v1.0.0
go mod edit -go 1.22

# Fetch downloaded dependencies from the cache
go mod download

# Show where dependencies are downloaded to
go env GOMODCACHE    # typically $GOPATH/pkg/mod
```

### Code Example 11: Using the vendor Directory

```bash
# Generate the vendor directory
go mod vendor

# Build using vendor
go build -mod=vendor ./...

# Test using vendor
go test -mod=vendor ./...

# Always use vendor via GOFLAGS
export GOFLAGS="-mod=vendor"
```

```go
// Directory structure when using vendor
// myproject/
// ├── go.mod
// ├── go.sum
// ├── vendor/
// │   ├── modules.txt            ← list of vendored modules
// │   ├── github.com/
// │   │   └── gin-gonic/
// │   │       └── gin/
// │   │           ├── gin.go
// │   │           └── ...
// │   └── golang.org/
// │       └── x/
// │           └── net/
// │               └── ...
// └── main.go
```

### Code Example 12: Using the replace Directive

```go
module github.com/myorg/myproject

go 1.22

require (
    github.com/myorg/shared v1.2.0
    github.com/external/lib v2.0.0
)

// Use case 1: Reference a module during local development
replace github.com/myorg/shared => ../shared

// Use case 2: Use a forked module
replace github.com/external/lib => github.com/myorg/lib-fork v2.0.1

// Use case 3: Override a specific version (security patch)
replace golang.org/x/net v0.17.0 => golang.org/x/net v0.19.0

// Note: replace is effective only when directly building that module
// It is ignored when the module is pulled in as a dependency from another module
// → go.work is often preferred
```

### Code Example 13: Semantic Versioning and Module Paths

```go
// ==========================================
// Semantic Versioning and import paths
// ==========================================

// Go Modules follow Semantic Versioning (semver)
// v<major>.<minor>.<patch>
// v1.2.3

// === v0 / v1 ===
// Do not include the version number in the import path
import "github.com/myorg/mylib"       // v0.x.x or v1.x.x

// === v2 and beyond ===
// Include the major version in the import path (Import Compatibility Rule)
import "github.com/myorg/mylib/v2"    // v2.x.x
import "github.com/myorg/mylib/v3"    // v3.x.x

// go.mod declaration
// module github.com/myorg/mylib/v2
// → v2 is part of the module path
```

```go
// === Procedure for a major version upgrade ===

// Method 1: Major branches
// v1 branch: module github.com/myorg/mylib
// v2 branch: module github.com/myorg/mylib/v2

// Method 2: Subdirectory
// mylib/
// ├── go.mod           ← module github.com/myorg/mylib (v1)
// ├── v2/
// │   ├── go.mod       ← module github.com/myorg/mylib/v2
// │   └── ...
// └── ...

// === Special handling of v0 ===
// v0.x.x is treated as unstable API
// Breaking changes are permitted during the v0 → v1 migration
// While in v0.x.x, do not include v0 in the import path
```

### Code Example 14: Proxy and Checksum DB

```bash
# Go Module Proxy configuration
# Default: proxy.golang.org (operated by Google)
export GOPROXY=https://proxy.golang.org,direct

# For private repositories
# Use GOPRIVATE to bypass the proxy
export GOPRIVATE=github.com/myorg/*,gitlab.mycompany.com/*

# Use GONOSUMCHECK to skip checksum verification
export GONOSUMCHECK=github.com/myorg/*

# Use GONOSUMDB to skip queries to the checksum DB
export GONOSUMDB=github.com/myorg/*

# Configuring an internal proxy
export GOPROXY=https://goproxy.mycompany.com,https://proxy.golang.org,direct

# Checksum DB
# Default: sum.golang.org
# Records hashes of all public modules in a transparency log
export GONOSUMDB=github.com/myorg/*
```

```go
// === Authenticating to private repositories via .netrc ===
// ~/.netrc
// machine github.com
//   login USERNAME
//   password PERSONAL_ACCESS_TOKEN

// === SSH → HTTPS rewriting via Git configuration ===
// git config --global url."ssh://git@github.com/".insteadOf "https://github.com/"

// === Example CI/CD configuration ===
// GitHub Actions
// env:
//   GOPRIVATE: github.com/myorg/*
//   GOPROXY: https://proxy.golang.org,direct
// steps:
//   - uses: actions/setup-go@v4
//     with:
//       go-version: '1.22'
//   - run: |
//       git config --global url."https://${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/"
//       go mod download
```

### Code Example 15: Build Tags and Platform-Specific Code

```go
// ==========================================
// Build tags (build constraints)
// ==========================================

// === New syntax in Go 1.17+ ===
//go:build linux && amd64

package mypackage

// === Old syntax in Go 1.16 and earlier ===
// +build linux,amd64

// === Combining multiple conditions ===
//go:build (linux || darwin) && amd64

//go:build !windows

//go:build integration

// === Implicit build tags based on file names ===
// file_linux.go     → compiled only on linux
// file_darwin.go    → compiled only on macOS
// file_windows.go   → compiled only on Windows
// file_amd64.go     → compiled only on amd64
// file_linux_arm64.go → linux + arm64 only

// === Build tag for tests ===
//go:build integration

package mypackage_test

import "testing"

func TestIntegration(t *testing.T) {
    // go test -tags=integration ./...
    // Runs only when this tag is specified
}
```

```go
// === Platform-specific code example ===

// config_unix.go
//go:build !windows

package config

func defaultConfigPath() string {
    return "/etc/myapp/config.yaml"
}

// config_windows.go
//go:build windows

package config

func defaultConfigPath() string {
    return `C:\ProgramData\myapp\config.yaml`
}
```

### Code Example 16: Naming Conventions for Test Packages

```go
// ==========================================
// Two styles of test packages
// ==========================================

// === Style 1: White-box testing ===
// File: user_test.go
// Package name: user (same as the subject)
package user

import "testing"

func TestValidate(t *testing.T) {
    u := &User{Name: "", Email: ""}
    // Can access private fields and methods
    u.age = 25
    u.password = "secret"

    err := u.Validate()
    if err == nil {
        t.Error("expected validation error for empty name")
    }
}

func Test_defaultAge(t *testing.T) {
    // Private functions can also be tested directly
    if defaultAge() != 0 {
        t.Error("expected default age to be 0")
    }
}
```

```go
// === Style 2: Black-box testing ===
// File: user_test.go
// Package name: user_test (with _test suffix)
package user_test

import (
    "testing"

    "github.com/myorg/myproject/internal/model/user"
)

func TestNewUser(t *testing.T) {
    // Only use the public API (same viewpoint as external users)
    u := user.NewUser("Alice", "alice@example.com")

    if u.Name != "Alice" {
        t.Errorf("expected Name=Alice, got %s", u.Name)
    }
    // u.age cannot be accessed (private)
    // u.password cannot be accessed either
}

func ExampleNewUser() {
    u := user.NewUser("Bob", "bob@example.com")
    fmt.Println(u)
    // Output: User{ID:0, Name:Bob, Email:bob@example.com}
}
```

### Code Example 17: Package Design in a Layered Architecture

```go
// ==========================================
// Clean-architecture-style package layout
// ==========================================

// Project structure:
// github.com/myorg/orderservice/
// ├── go.mod
// ├── cmd/
// │   └── server/
// │       └── main.go           ← entry point
// ├── internal/
// │   ├── domain/               ← domain layer (no dependencies)
// │   │   ├── order.go
// │   │   ├── product.go
// │   │   └── repository.go     ← interface definitions
// │   ├── usecase/              ← use case layer
// │   │   ├── order_service.go
// │   │   └── order_service_test.go
// │   ├── adapter/              ← adapter layer
// │   │   ├── handler/          ← HTTP handlers
// │   │   │   ├── order.go
// │   │   │   └── middleware.go
// │   │   └── repository/      ← repository implementations
// │   │       ├── postgres/
// │   │       │   └── order_repo.go
// │   │       └── redis/
// │   │           └── cache_repo.go
// │   └── infrastructure/      ← infrastructure layer
// │       ├── database.go
// │       ├── redis.go
// │       └── logger.go
// └── pkg/
//     └── apierror/            ← shared API error types
//         └── error.go
```

```go
// === internal/domain/order.go ===
package domain

import (
    "errors"
    "time"
)

var (
    ErrOrderNotFound  = errors.New("order not found")
    ErrInvalidAmount  = errors.New("invalid order amount")
    ErrAlreadyShipped = errors.New("order already shipped")
)

// OrderStatus represents an order's status
type OrderStatus string

const (
    OrderStatusPending   OrderStatus = "pending"
    OrderStatusConfirmed OrderStatus = "confirmed"
    OrderStatusShipped   OrderStatus = "shipped"
    OrderStatusDelivered OrderStatus = "delivered"
    OrderStatusCancelled OrderStatus = "cancelled"
)

// Order is a domain entity
type Order struct {
    ID         string
    CustomerID string
    Items      []OrderItem
    Status     OrderStatus
    TotalPrice float64
    CreatedAt  time.Time
    UpdatedAt  time.Time
}

// OrderItem represents an order line item
type OrderItem struct {
    ProductID string
    Quantity  int
    Price     float64
}

// Validate enforces domain rules
func (o *Order) Validate() error {
    if len(o.Items) == 0 {
        return errors.New("order must have at least one item")
    }
    if o.TotalPrice <= 0 {
        return ErrInvalidAmount
    }
    return nil
}

// Ship ships the order (domain logic)
func (o *Order) Ship() error {
    if o.Status != OrderStatusConfirmed {
        return ErrAlreadyShipped
    }
    o.Status = OrderStatusShipped
    o.UpdatedAt = time.Now()
    return nil
}
```

```go
// === internal/domain/repository.go ===
package domain

import "context"

// OrderRepository is the repository interface (defined in the domain layer)
// Implementations live in the adapter layer (dependency inversion principle)
type OrderRepository interface {
    FindByID(ctx context.Context, id string) (*Order, error)
    FindByCustomerID(ctx context.Context, customerID string) ([]*Order, error)
    Save(ctx context.Context, order *Order) error
    Update(ctx context.Context, order *Order) error
    Delete(ctx context.Context, id string) error
}

// OrderCache is the cache interface
type OrderCache interface {
    Get(ctx context.Context, id string) (*Order, error)
    Set(ctx context.Context, order *Order) error
    Invalidate(ctx context.Context, id string) error
}
```

```go
// === internal/usecase/order_service.go ===
package usecase

import (
    "context"
    "fmt"
    "time"

    "github.com/myorg/orderservice/internal/domain"
)

// OrderService is a service in the use case layer
type OrderService struct {
    repo  domain.OrderRepository
    cache domain.OrderCache
}

// NewOrderService creates an OrderService
func NewOrderService(repo domain.OrderRepository, cache domain.OrderCache) *OrderService {
    return &OrderService{repo: repo, cache: cache}
}

// CreateOrder creates a new order
func (s *OrderService) CreateOrder(ctx context.Context, customerID string, items []domain.OrderItem) (*domain.Order, error) {
    var total float64
    for _, item := range items {
        total += item.Price * float64(item.Quantity)
    }

    order := &domain.Order{
        ID:         generateID(),
        CustomerID: customerID,
        Items:      items,
        Status:     domain.OrderStatusPending,
        TotalPrice: total,
        CreatedAt:  time.Now(),
        UpdatedAt:  time.Now(),
    }

    if err := order.Validate(); err != nil {
        return nil, fmt.Errorf("validation: %w", err)
    }

    if err := s.repo.Save(ctx, order); err != nil {
        return nil, fmt.Errorf("save order: %w", err)
    }

    // Save to cache (ignore errors)
    _ = s.cache.Set(ctx, order)

    return order, nil
}

// GetOrder retrieves an order (prefers cache)
func (s *OrderService) GetOrder(ctx context.Context, id string) (*domain.Order, error) {
    // Try to fetch from the cache
    if order, err := s.cache.Get(ctx, id); err == nil {
        return order, nil
    }

    // Fetch from the DB
    order, err := s.repo.FindByID(ctx, id)
    if err != nil {
        return nil, fmt.Errorf("find order: %w", err)
    }

    // Save to the cache
    _ = s.cache.Set(ctx, order)

    return order, nil
}

// ShipOrder ships an order
func (s *OrderService) ShipOrder(ctx context.Context, id string) error {
    order, err := s.repo.FindByID(ctx, id)
    if err != nil {
        return fmt.Errorf("find order: %w", err)
    }

    if err := order.Ship(); err != nil {
        return fmt.Errorf("ship order: %w", err)
    }

    if err := s.repo.Update(ctx, order); err != nil {
        return fmt.Errorf("update order: %w", err)
    }

    _ = s.cache.Invalidate(ctx, id)
    return nil
}

func generateID() string {
    return fmt.Sprintf("order_%d", time.Now().UnixNano())
}
```

```go
// === internal/adapter/repository/postgres/order_repo.go ===
package postgres

import (
    "context"
    "database/sql"
    "fmt"

    "github.com/myorg/orderservice/internal/domain"
)

// OrderRepo is an implementation of OrderRepository using PostgreSQL
type OrderRepo struct {
    db *sql.DB
}

// NewOrderRepo creates an OrderRepo
func NewOrderRepo(db *sql.DB) *OrderRepo {
    return &OrderRepo{db: db}
}

// FindByID finds an order by ID
func (r *OrderRepo) FindByID(ctx context.Context, id string) (*domain.Order, error) {
    query := `
        SELECT id, customer_id, status, total_price, created_at, updated_at
        FROM orders WHERE id = $1
    `

    order := &domain.Order{}
    err := r.db.QueryRowContext(ctx, query, id).Scan(
        &order.ID, &order.CustomerID, &order.Status,
        &order.TotalPrice, &order.CreatedAt, &order.UpdatedAt,
    )
    if err == sql.ErrNoRows {
        return nil, domain.ErrOrderNotFound
    }
    if err != nil {
        return nil, fmt.Errorf("query order: %w", err)
    }

    items, err := r.findItems(ctx, id)
    if err != nil {
        return nil, err
    }
    order.Items = items

    return order, nil
}

// Save persists an order
func (r *OrderRepo) Save(ctx context.Context, order *domain.Order) error {
    tx, err := r.db.BeginTx(ctx, nil)
    if err != nil {
        return fmt.Errorf("begin tx: %w", err)
    }
    defer tx.Rollback()

    query := `
        INSERT INTO orders (id, customer_id, status, total_price, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6)
    `
    _, err = tx.ExecContext(ctx, query,
        order.ID, order.CustomerID, order.Status,
        order.TotalPrice, order.CreatedAt, order.UpdatedAt,
    )
    if err != nil {
        return fmt.Errorf("insert order: %w", err)
    }

    for _, item := range order.Items {
        itemQuery := `
            INSERT INTO order_items (order_id, product_id, quantity, price)
            VALUES ($1, $2, $3, $4)
        `
        _, err = tx.ExecContext(ctx, itemQuery,
            order.ID, item.ProductID, item.Quantity, item.Price,
        )
        if err != nil {
            return fmt.Errorf("insert item: %w", err)
        }
    }

    return tx.Commit()
}

// findItems retrieves the order line items (internal function)
func (r *OrderRepo) findItems(ctx context.Context, orderID string) ([]domain.OrderItem, error) {
    query := `SELECT product_id, quantity, price FROM order_items WHERE order_id = $1`
    rows, err := r.db.QueryContext(ctx, query, orderID)
    if err != nil {
        return nil, fmt.Errorf("query items: %w", err)
    }
    defer rows.Close()

    var items []domain.OrderItem
    for rows.Next() {
        var item domain.OrderItem
        if err := rows.Scan(&item.ProductID, &item.Quantity, &item.Price); err != nil {
            return nil, fmt.Errorf("scan item: %w", err)
        }
        items = append(items, item)
    }
    return items, rows.Err()
}

// FindByCustomerID, Update, Delete are implemented similarly...
func (r *OrderRepo) FindByCustomerID(ctx context.Context, customerID string) ([]*domain.Order, error) {
    return nil, nil // omitted
}
func (r *OrderRepo) Update(ctx context.Context, order *domain.Order) error {
    return nil // omitted
}
func (r *OrderRepo) Delete(ctx context.Context, id string) error {
    return nil // omitted
}
```

```go
// === cmd/server/main.go ===
package main

import (
    "database/sql"
    "log"
    "net/http"

    "github.com/myorg/orderservice/internal/adapter/handler"
    "github.com/myorg/orderservice/internal/adapter/repository/postgres"
    "github.com/myorg/orderservice/internal/adapter/repository/redis"
    "github.com/myorg/orderservice/internal/usecase"
)

func main() {
    // Initialize the infrastructure layer
    db, err := sql.Open("postgres", "host=localhost dbname=orders")
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    redisClient := redis.NewClient("localhost:6379")

    // Dependency injection (manual DI)
    orderRepo := postgres.NewOrderRepo(db)
    orderCache := redis.NewOrderCache(redisClient)
    orderService := usecase.NewOrderService(orderRepo, orderCache)
    orderHandler := handler.NewOrderHandler(orderService)

    // Routing
    mux := http.NewServeMux()
    mux.HandleFunc("GET /orders/{id}", orderHandler.GetOrder)
    mux.HandleFunc("POST /orders", orderHandler.CreateOrder)
    mux.HandleFunc("POST /orders/{id}/ship", orderHandler.ShipOrder)

    log.Println("Server starting on :8080")
    log.Fatal(http.ListenAndServe(":8080", mux))
}
```

### Code Example 18: Using go generate

```go
// ==========================================
// Automatic code generation with go generate
// ==========================================

// === Generate a mock from an interface ===
//go:generate mockgen -source=repository.go -destination=mock_repository.go -package=domain

// === Use stringer to generate String() for constants ===
//go:generate stringer -type=OrderStatus

// === Generate Go code from protocol buffers ===
//go:generate protoc --go_out=. --go-grpc_out=. proto/order.proto

// === Embed files using embed ===
package templates

import "embed"

//go:embed templates/*.html
var TemplateFS embed.FS

//go:embed version.txt
var Version string

//go:embed config/default.json
var DefaultConfig []byte
```

```bash
# Run go generate
go generate ./...

# Only for a specific package
go generate ./internal/domain/...

# Filter with -run
go generate -run "stringer" ./...

# Verbose output with -v
go generate -v ./...
```

### Code Example 19: Managing Tool Dependencies (the tools.go Pattern)

```go
// ==========================================
// The tools.go pattern
// ==========================================

// Use a tools.go file to manage build-tool dependencies
// Exclude from normal builds via a build tag, but record them in go.mod

//go:build tools

package tools

import (
    // code generation tools
    _ "github.com/golang/mock/mockgen"
    _ "golang.org/x/tools/cmd/stringer"
    _ "google.golang.org/protobuf/cmd/protoc-gen-go"
    _ "google.golang.org/grpc/cmd/protoc-gen-go-grpc"

    // static analysis tools
    _ "github.com/golangci/golangci-lint/cmd/golangci-lint"
    _ "golang.org/x/vuln/cmd/govulncheck"

    // migration tools
    _ "github.com/golang-migrate/migrate/v4/cmd/migrate"
)

// This achieves:
// 1. "go mod tidy" records tool dependencies in go.mod
// 2. Tools are not compiled during normal builds
// 3. CI/CD can install everything at once with "go install ./tools/..."
```

### Code Example 20: Build Management with Makefile

```makefile
# ==========================================
# Makefile: standard tasks for a Go project
# ==========================================

.PHONY: all build test lint clean run generate vendor

# Variables
APP_NAME := myproject
VERSION := $(shell git describe --tags --always --dirty)
BUILD_TIME := $(shell date -u +"%Y-%m-%dT%H:%M:%SZ")
LDFLAGS := -ldflags "-X main.version=$(VERSION) -X main.buildTime=$(BUILD_TIME)"
GOFLAGS := -trimpath

# Default target
all: lint test build

# Build
build:
	go build $(GOFLAGS) $(LDFLAGS) -o bin/$(APP_NAME) ./cmd/server/

# Build multiple binaries
build-all:
	go build $(GOFLAGS) $(LDFLAGS) -o bin/server ./cmd/server/
	go build $(GOFLAGS) $(LDFLAGS) -o bin/worker ./cmd/worker/
	go build $(GOFLAGS) $(LDFLAGS) -o bin/cli ./cmd/cli/

# Test
test:
	go test -race -coverprofile=coverage.out ./...

# Coverage report
coverage: test
	go tool cover -html=coverage.out -o coverage.html
	open coverage.html

# Integration tests
test-integration:
	go test -race -tags=integration -count=1 ./...

# Static analysis
lint:
	golangci-lint run ./...
	go vet ./...

# Dependency management
tidy:
	go mod tidy
	go mod verify

# vendor
vendor:
	go mod vendor

# Code generation
generate:
	go generate ./...

# Run
run:
	go run ./cmd/server/

# Clean
clean:
	rm -rf bin/ coverage.out coverage.html

# Docker
docker-build:
	docker build -t $(APP_NAME):$(VERSION) .

# Cross-compilation
build-linux:
	GOOS=linux GOARCH=amd64 go build $(GOFLAGS) $(LDFLAGS) -o bin/$(APP_NAME)-linux-amd64 ./cmd/server/

build-darwin:
	GOOS=darwin GOARCH=arm64 go build $(GOFLAGS) $(LDFLAGS) -o bin/$(APP_NAME)-darwin-arm64 ./cmd/server/

# Vulnerability check
vuln:
	govulncheck ./...
```

---

## 2. ASCII Diagrams

### Diagram 1: Relationship Between Modules and Packages

```
┌─── module: github.com/myorg/myproject ─────────────────────┐
│                                                              │
│  go.mod                                                      │
│  ┌──────────────────────────────────────────┐               │
│  │ module github.com/myorg/myproject        │               │
│  │ go 1.22                                   │               │
│  │ require (                                 │               │
│  │   github.com/gin-gonic/gin v1.9.1        │               │
│  │   github.com/lib/pq v1.10.9              │               │
│  │ )                                         │               │
│  └──────────────────────────────────────────┘               │
│                                                              │
│  ┌─ package: main ─────┐  ┌─ package: config ──────────┐   │
│  │ cmd/server/          │  │ internal/config/            │   │
│  │   main.go            │  │   config.go                 │   │
│  │   ← entry point      │  │   config_test.go           │   │
│  └─────────────────────┘  │   ← not accessible from outside│   │
│                            └────────────────────────────┘   │
│  ┌─ package: handler ──┐  ┌─ package: model ────────────┐  │
│  │ internal/handler/    │  │ pkg/model/                   │  │
│  │   user.go            │  │   user.go                    │  │
│  │   order.go           │  │   order.go                   │  │
│  │   middleware.go      │  │   ← accessible from outside  │  │
│  └─────────────────────┘  └─────────────────────────────┘  │
│                                                              │
│  ┌─ package: service ──┐  ┌─ package: repository ───────┐  │
│  │ internal/service/    │  │ internal/repository/         │  │
│  │   user_service.go    │  │   user_repo.go               │  │
│  │   order_service.go   │  │   order_repo.go              │  │
│  └─────────────────────┘  └─────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### Diagram 2: Version Resolution in go mod (MVS in Detail)

```
The Minimum Version Selection (MVS) algorithm:

myproject
├── require A v1.2.0
│   ├── require C v1.0.0
│   └── require D v2.1.0
├── require B v1.3.0
│   ├── require C v1.1.0   ← latest C requirement
│   └── require D v2.0.0   ← A's requirement v2.1.0 takes precedence for D
│
│  Required versions per module:
│  C: v1.0.0 (from A), v1.1.0 (from B)
│     → selected: v1.1.0 (smallest compatible version = maximum of the requirements)
│  D: v2.1.0 (from A), v2.0.0 (from B)
│     → selected: v2.1.0 (maximum of the requirements)
│
│  Characteristics of MVS:
│  - Selects "the minimum version that was required" (not the latest)
│  - Highly reproducible (not affected by releases from other modules)
│  - A different approach from npm/pip's SAT solver
│
└── Final build list:
    A v1.2.0, B v1.3.0, C v1.1.0, D v2.1.0

Comparison: npm (semver resolution)
  C: ^1.0.0, ^1.1.0 → v1.9.9 (latest compatible)
  → Results can change when new versions are published

Comparison: Go MVS
  C: v1.0.0, v1.1.0 → v1.1.0 (maximum of the requirements, fixed)
  → Results do not change when new versions are published
```

### Diagram 3: Import Resolution Flow (Detailed Version)

```
import "github.com/myorg/pkg/util"
            │
            ▼
    ┌───────────────────┐
    │ Standard library? │──YES──> Fetched from $GOROOT/src
    └───────┬───────────┘           (fmt, net/http, etc.)
            │NO
            ▼
    ┌───────────────────┐
    │ Listed in go.work?│──YES──> Local directory reference
    └───────┬───────────┘           (multi-module development)
            │NO
            ▼
    ┌───────────────────┐
    │ Specified in      │──YES──> Fetched from the target
    │ replace?          │          (local or remote)
    └───────┬───────────┘
            │NO
            ▼
    ┌───────────────────┐
    │ Present in        │──YES──> Fetched from vendor/
    │ vendor/?          │          (when -mod=vendor is set)
    └───────┬───────────┘
            │NO
            ▼
    ┌───────────────────┐
    │ Present in        │──YES──> Fetched from the cache
    │ GOMODCACHE?       │          ($GOPATH/pkg/mod)
    └───────┬───────────┘
            │NO
            ▼
    ┌───────────────────┐
    │ Matches           │──YES──> Fetched directly from the repo
    │ GOPRIVATE?        │          (git clone, etc.)
    └───────┬───────────┘
            │NO
            ▼
    ┌───────────────────┐
    │ Fetch via GOPROXY │
    │ proxy.golang.org  │
    └───────┬───────────┘
            │
            ▼
    ┌───────────────────┐
    │ Checksum          │──FAIL──> Build error
    │ verification on   │          (tampering detected)
    │ sum.golang.org    │
    └───────┬───────────┘
            │OK
            ▼
    ┌───────────────────┐
    │ Saved to          │
    │ GOMODCACHE,       │
    │ recorded in       │
    │ go.sum            │
    └───────────────────┘
```

### Diagram 4: Package Initialization Order

```
init() execution order:

Dependency graph:
  main ──> pkg/handler ──> pkg/model
       ──> pkg/service ──> pkg/model
       ──> pkg/repository ──> pkg/model
                          ──> database/sql

Execution order (topological sort):
  1. init() of standard library (database/sql, fmt, etc.)
  2. init() of pkg/model        ← most depended-upon
  3. init() of pkg/handler
  4. init() of pkg/service
  5. init() of pkg/repository
  6. init() of main             ← last
  7. main()                     ← after init()

Order within the same package:
  ┌─ a.go ──┐  ┌─ b.go ──┐  ┌─ c.go ──┐
  │ init()  │  │ init()  │  │ init()  │
  │ init()  │  │         │  │ init()  │
  └────┬────┘  └────┬────┘  └────┬────┘
       │            │            │
       ▼            ▼            ▼
  In alphabetical order by filename (a → b → c)
  Within each file, top to bottom
```

### Diagram 5: Access Control via internal Packages

```
internal visibility rules:

github.com/myorg/myproject/
├── internal/
│   ├── config/     ← (A)
│   └── handler/    ← (B)
├── pkg/
│   └── client/     ← (C)
├── cmd/
│   └── server/     ← (D)
└── main.go         ← (E)

Accessible:
  (D) → (A) ✓  cmd/server → internal/config
  (D) → (B) ✓  cmd/server → internal/handler
  (E) → (A) ✓  main.go → internal/config
  (C) → (A) ✓  pkg/client → internal/config (within the same module)

Not accessible:
  External module → (A) ✗  compile error
  External module → (B) ✗  compile error

Nested internal:
github.com/myorg/myproject/
├── pkg/
│   └── server/
│       ├── internal/      ← sub-internal
│       │   └── parser/    ← (F)
│       └── server.go      ← (G)
│
│  (G) → (F) ✓  server.go → server/internal/parser
│  (E) → (F) ✗  main.go → server/internal/parser ← not allowed!
│  Inaccessible from outside the "server" package
```

### Diagram 6: Multi-Module Development with go.work

```
Monorepo layout:
┌─────────────────────────────────────────────────┐
│  mycompany/                                      │
│  ├── go.work                                     │
│  │   use (./api, ./shared, ./worker)             │
│  │                                               │
│  ├── api/                                        │
│  │   ├── go.mod (module github.com/mycompany/api)│
│  │   └── require github.com/mycompany/shared     │
│  │                    │                          │
│  │                    │ via go.work              │
│  │                    │ local reference ─────┐   │
│  │                    │                      │   │
│  ├── shared/          ▼                      │   │
│  │   ├── go.mod (module github.com/mycompany/shared)│
│  │   └── model/user.go                          │
│  │                                               │
│  └── worker/                                     │
│      ├── go.mod (module github.com/mycompany/worker)│
│      └── require github.com/mycompany/shared     │
│                       │                          │
│                       └── local reference via go.work│
│                                                  │
│  Without go.work:                                │
│  → Each go.mod's require is used to fetch from the registry│
│                                                  │
│  With go.work:                                   │
│  → The local shared/ is referenced directly     │
│  → go.mod's require is kept for CI/CD           │
└─────────────────────────────────────────────────┘

Do not use go.work in CI/CD:
  Include go.work in .gitignore (recommended)
  Alternatively, disable go.work in CI:
    GOWORK=off go build ./...
```

---

## 3. Comparison Tables

### Table 1: Evolution of Package Management

| Generation | Approach | Period | Characteristics | Issues |
|------------|----------|--------|-----------------|--------|
| 1st | GOPATH | 2009-2018 | Global workspace | No version management, hard to isolate projects |
| Transitional | dep / glide | 2016-2019 | Vendor directory, lock file | Tool fragmentation, not standardized |
| 2nd | Go Modules | 2019- | go.mod, MVS, proxy support | Learning curve (replace, retract, etc.) |
| Extension | Workspace | 2022- | go.work, multi-module development | Needs careful use with CI/CD |

### Table 2: Directory Conventions Comparison (Detailed Version)

| Directory | Purpose | Visibility | Required? | Notes |
|-----------|---------|------------|-----------|-------|
| `cmd/` | Entry points (main packages) | -- | Recommended | Required when there are multiple binaries |
| `pkg/` | Libraries usable from outside | Usable outside the module | Optional | Not needed for small projects |
| `internal/` | Internal implementation | Within the module only | Strongly recommended | Enforced by the compiler |
| `vendor/` | Local copy of dependencies | -- | Optional | For offline builds |
| `api/` | API definitions (proto, OpenAPI) | -- | Optional | gRPC/REST definitions |
| `docs/` | Documentation | -- | Optional | -- |
| `scripts/` | Build/deploy scripts | -- | Optional | -- |
| `migrations/` | DB migrations | -- | Optional | -- |
| `testdata/` | Data for tests | -- | Optional | Ignored by go tooling |
| `tools/` | Build-tool dependencies | -- | Optional | The tools.go pattern |
| `examples/` | Usage examples | -- | Optional | Recommended for libraries |

### Table 3: Go Modules vs Dependency Management in Other Languages

| Item | Go Modules | npm (Node.js) | pip (Python) | Cargo (Rust) | Maven (Java) |
|------|-----------|---------------|-------------|-------------|-------------|
| Config file | go.mod | package.json | requirements.txt / pyproject.toml | Cargo.toml | pom.xml |
| Lock file | go.sum | package-lock.json | -- (pipenv: Pipfile.lock) | Cargo.lock | -- |
| Version resolution | MVS (minimum) | SAT solver (latest compatible) | Latest compatible | SAT solver | nearest-wins |
| Reproducibility | Very high | High (with lock) | Low (no lock) | High | Medium |
| Central registry | proxy.golang.org | npmjs.com | pypi.org | crates.io | Maven Central |
| Checksum verification | go.sum + sum.golang.org | npm audit | -- | -- | Checksums |
| Major version | Path change required | Same package | Same package | Same package | GAV coordinates |
| Vendor | go mod vendor | node_modules | -- | cargo vendor | -- |
| Workspaces | go.work | npm workspaces | -- | cargo workspaces | reactor |

### Table 4: Export Rules in Detail

| Kind | Starts with uppercase | Starts with lowercase | Example |
|------|-----------------------|------------------------|---------|
| Type | Exported | Unexported | `User` vs `user` |
| Function | Exported | Unexported | `NewUser()` vs `newUser()` |
| Method | Exported | Unexported | `u.Validate()` vs `u.validate()` |
| Field | Exported | Unexported | `u.Name` vs `u.name` |
| Constant | Exported | Unexported | `MaxRetries` vs `maxRetries` |
| Variable | Exported | Unexported | `DefaultTimeout` vs `defaultTimeout` |
| Interface | Exported | Unexported | `Reader` vs `reader` |
| Embedded field | Follows the type name | Follows the type name | `User` (public) vs `user` (private) |

### Table 5: replace vs go.work -- When to Use Each

| Item | replace (go.mod) | go.work |
|------|------------------|---------|
| Scope | Only during a direct build | All modules within the workspace |
| Transitivity | None (does not propagate to other modules) | None |
| Version management | Should be committed (except for temporary ones) | .gitignore recommended |
| CI/CD | Remains effective | Disable via GOWORK=off |
| Purpose | Forks, temporary patches | Multi-module development |
| Multiple modules | Configure individually in each go.mod | Configure once in one place |
| Recommendation | Limited (minimize) | Recommended for multi-module setups |

---

## 4. Anti-Patterns

### Anti-Pattern 1: Circular Imports

```go
// BAD: package A imports B, and B imports A
// ── package a/a.go ──
package a

import "myproject/b" // compile error: import cycle

func ProcessA() {
    b.ProcessB()
}

type ResultA struct {
    Value string
}

// ── package b/b.go ──
package b

import "myproject/a" // cycle!

func ProcessB() {
    a.ProcessA()
}

func FormatResult(r a.ResultA) string {
    return r.Value
}

// GOOD: Invert the dependency with an interface (DIP)
// ── package a/a.go ──
package a

// Processor is an interface defined by package a
type Processor interface {
    Process() error
}

type ServiceA struct {
    processor Processor // receives b.ProcessorImpl
}

func NewServiceA(p Processor) *ServiceA {
    return &ServiceA{processor: p}
}

func (s *ServiceA) Run() error {
    return s.processor.Process()
}

// ── package b/b.go ──
package b

// b does not import a
// Implicitly implements the a.Processor interface
type ProcessorImpl struct{}

func (p *ProcessorImpl) Process() error {
    // processing
    return nil
}

// ── package main ──
package main

import (
    "myproject/a"
    "myproject/b"
)

func main() {
    processor := &b.ProcessorImpl{}
    service := a.NewServiceA(processor) // dependency injection
    service.Run()
}
```

### Anti-Pattern 2: A Huge util Package

```go
// BAD: a util package that contains anything and everything
package util

import (
    "crypto/rand"
    "encoding/csv"
    "fmt"
    "io"
    "net/smtp"
    "time"
)

func FormatDate(t time.Time) string { return t.Format("2006-01-02") }
func HashPassword(p string) string { /* ... */ return "" }
func ParseCSV(r io.Reader) ([][]string, error) {
    return csv.NewReader(r).ReadAll()
}
func SendEmail(to, subject, body string) error { /* ... */ return nil }
func GenerateID() string {
    b := make([]byte, 16)
    rand.Read(b)
    return fmt.Sprintf("%x", b)
}

// Problems:
// 1. Low cohesion (unrelated features mixed together)
// 2. Hard to test (too many dependencies)
// 3. Risk of name collisions
// 4. Tends to cause import cycles
// 5. Encourages the bad habit of "just put it in util"

// GOOD: Split packages by responsibility
// ── package timeutil ──
package timeutil

import "time"

func FormatDate(t time.Time) string {
    return t.Format("2006-01-02")
}

func FormatDateTime(t time.Time) string {
    return t.Format("2006-01-02T15:04:05Z07:00")
}

// ── package auth ──
package auth

import "golang.org/x/crypto/bcrypt"

func HashPassword(plain string) (string, error) {
    hash, err := bcrypt.GenerateFromPassword([]byte(plain), bcrypt.DefaultCost)
    return string(hash), err
}

func VerifyPassword(hash, plain string) bool {
    return bcrypt.CompareHashAndPassword([]byte(hash), []byte(plain)) == nil
}

// ── package csvutil ──
package csvutil

import (
    "encoding/csv"
    "io"
)

func Parse(r io.Reader) ([][]string, error) {
    return csv.NewReader(r).ReadAll()
}
```

### Anti-Pattern 3: Abusing init()

```go
// BAD: doing heavy work inside init()
package database

import (
    "database/sql"
    "log"
    "os"
)

var db *sql.DB

func init() {
    var err error
    // This runs during tests too!
    // Panics if the environment variable is missing!
    db, err = sql.Open("postgres", os.Getenv("DATABASE_URL"))
    if err != nil {
        log.Fatal(err) // tests crash
    }
    if err = db.Ping(); err != nil {
        log.Fatal(err) // instantly fatal on network errors
    }
}

func GetDB() *sql.DB {
    return db
}

// Problems:
// 1. Tests also require a DB connection
// 2. log.Fatal terminates the process on errors
// 3. Hard to control initialization order
// 4. Cannot be swapped for mocks

// GOOD: Use an explicit initialization function
package database

import (
    "context"
    "database/sql"
    "fmt"
    "time"
)

type DB struct {
    conn *sql.DB
}

// Connect creates a DB connection explicitly
func Connect(ctx context.Context, dsn string) (*DB, error) {
    conn, err := sql.Open("postgres", dsn)
    if err != nil {
        return nil, fmt.Errorf("open database: %w", err)
    }

    ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
    defer cancel()

    if err := conn.PingContext(ctx); err != nil {
        conn.Close()
        return nil, fmt.Errorf("ping database: %w", err)
    }

    return &DB{conn: conn}, nil
}

// Close closes the connection
func (db *DB) Close() error {
    return db.conn.Close()
}

// Mocks can be injected during tests
// main() explicitly calls Connect()
```

### Anti-Pattern 4: Package Granularity Too Fine

```go
// BAD: one file per package (Java-style layout)
// myproject/
// ├── user/
// │   ├── model/
// │   │   └── user.go          ← package model
// │   ├── repository/
// │   │   └── user_repo.go     ← package repository
// │   ├── service/
// │   │   └── user_service.go  ← package service
// │   └── handler/
// │       └── user_handler.go  ← package handler

// Problem: cross-package interactions become complex, with frequent type conversions

// GOOD: A flat layout more idiomatic to Go
// myproject/
// ├── user/
// │   ├── user.go              ← type User, type Repository interface
// │   ├── service.go           ← type Service struct
// │   ├── handler.go           ← type Handler struct
// │   └── postgres.go          ← type PostgresRepo struct
//
// All "package user"
// Types are shared within the package; no conversions needed

package user

// Within the same package, User can be used directly
type User struct {
    ID    int
    Name  string
    Email string
}

type Repository interface {
    FindByID(ctx context.Context, id int) (*User, error)
    Save(ctx context.Context, user *User) error
}

type Service struct {
    repo Repository
}

func NewService(repo Repository) *Service {
    return &Service{repo: repo}
}

func (s *Service) GetUser(ctx context.Context, id int) (*User, error) {
    return s.repo.FindByID(ctx, id) // no type conversion needed
}
```

### Anti-Pattern 5: Not Committing go.sum

```bash
# BAD: including go.sum in .gitignore
# .gitignore
# go.sum  ← this is wrong!

# Problems with not committing go.sum:
# 1. Supply-chain attacks cannot be detected
# 2. Build reproducibility is lost
# 3. CI/CD may use modules with different hashes

# GOOD: commit both go.mod and go.sum
git add go.mod go.sum
git commit -m "Update dependencies"

# go.work may be included in .gitignore (for local development)
# .gitignore
# go.work
# go.work.sum
```

### Anti-Pattern 6: Inappropriate Use of replace

```go
// BAD: leaving a committed replace untouched
module github.com/myorg/myproject

go 1.22

require (
    github.com/myorg/shared v1.2.0
)

// A replace for local development that was left behind...
replace github.com/myorg/shared => ../shared
// CI/CD fails because ../shared does not exist

// GOOD: Use go.work and limit replace to temporary needs
// go.work (gitignored)
go 1.22
use (
    .
    ../shared
)

// Keep go.mod clean
module github.com/myorg/myproject

go 1.22

require (
    github.com/myorg/shared v1.2.0
)
// No replace
```

---

## 5. FAQ

### Q1: Is the pkg/ directory required?

Not required. The official Go position is that no particular layout is recommended. `pkg/` is a convention that indicates "packages exposed externally," but it is unnecessary for small projects. What matters is using `internal/` to protect internal implementation. Go's standard library itself does not use a `pkg/` directory.

Criteria for large projects:
- Libraries imported directly from other projects → use `pkg/`
- Microservices and similarly independently-deployed services → `pkg/` is unnecessary; `internal/` is enough
- Shared code inside a monorepo → `shared/` or `common/` are also options

### Q2: What is go.sum for?

`go.sum` records the checksums (SHA-256 hashes) of dependent packages. This makes supply-chain attacks detectable and guarantees build reproducibility. It is a file that should be committed to version control.

The concrete protection mechanism:
1. Hashes are recorded on the first download
2. Hashes are verified on subsequent builds
3. Cross-checked against `sum.golang.org` (the transparency log)
4. Builds are aborted if hashes do not match

Manual verification is also possible with `go mod verify`.

### Q3: When should you use the replace directive?

Legitimate uses of `replace`:
1. Referencing a module during local development (temporary)
2. Using a forked module (until upstream merges a PR)
3. Temporarily applying a security patch
4. Pointing to a different location for a private module

Caveats:
- replace is only effective during direct builds (replaces in dependencies are ignored)
- For multi-module development, go.work is preferred
- In production code, minimize usage and limit it to temporary measures

### Q4: Should you use the vendor directory?

Consider vendor in the following cases:
1. **Offline builds** -- When you want to build without network access
2. **CI/CD stability** -- When you want builds to work even if the proxy goes down
3. **Audit requirements** -- When dependency source code must be included in the repository
4. **Legacy tooling** -- When compatibility with GOPATH-era tools is required

When not using vendor:
- Leverage the cache with `go mod download`
- In CI/CD, persist the module cache via `actions/cache` and similar
- Operate an internal proxy via `GOPROXY`

### Q5: What are the naming conventions for test files?

Go's test file naming rules:
- `*_test.go` -- test files (excluded from go build, included in go test)
- `package foo` -- white-box test (can access private members)
- `package foo_test` -- black-box test (public API only)
- `Example*` -- executable examples for documentation
- `Benchmark*` -- benchmark tests
- `Fuzz*` -- fuzz tests (Go 1.18+)
- `testdata/` -- a data directory for tests (ignored by go tooling)

### Q6: How should you organize standard-library and third-party imports?

The recommended format that `goimports` produces automatically:

```go
import (
    // Group 1: standard library
    "context"
    "fmt"
    "net/http"

    // Group 2: third-party
    "github.com/gin-gonic/gin"
    "go.uber.org/zap"

    // Group 3: intra-project packages
    "github.com/myorg/myproject/internal/config"
    "github.com/myorg/myproject/internal/handler"
)
```

By setting the project prefix in the `goimports` section of `.golangci.yml`, it is split automatically into three groups:
```yaml
linters-settings:
  goimports:
    local-prefixes: github.com/myorg/myproject
```

### Q7: How do you perform a major version upgrade of a module?

In Go Modules, major versions v2 and above require a change to the import path (the Import Compatibility Rule):

Procedure:
1. Append `/v2` to the module path in `go.mod`
2. Update all import paths
3. Make the breaking changes
4. Tag `v2.0.0`

```bash
# Method 1: Major branch
git checkout -b v2
# go.mod: module github.com/myorg/mylib/v2
# Update import paths in all files
# git tag v2.0.0

# Method 2: Subdirectory
mkdir v2
cp -r *.go v2/
# v2/go.mod: module github.com/myorg/mylib/v2
# git tag v2.0.0
```

On the consumer side:
```go
// v1 and v2 can be used simultaneously
import (
    v1user "github.com/myorg/mylib/user"
    v2user "github.com/myorg/mylib/v2/user"
)
```

### Q8: What is the retract directive used for?

`retract` is used to "withdraw" a specific version of a module. Retracted versions are excluded from `go get`'s default selection, but they can still be used if explicitly specified:

```go
module github.com/myorg/mylib

go 1.22

// Retract individual versions
retract v1.0.0 // critical bug: possible data corruption

// Retract a version range
retract [v0.9.0, v0.9.5] // security vulnerability CVE-2024-XXXX

// A version that was published accidentally
retract v2.0.0-beta.1 // incomplete release
```

Note: `retract` only takes effect after a version containing the `retract` directive has been published. In other words, to retract v1.0.0, you need to release a v1.0.1 that contains the retract.

---


## FAQ

### Q1: What is the most important point to focus on when learning this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory, but by actually writing and running code to see how things work.

### Q2: What are common mistakes beginners make?

Skipping the basics and jumping to advanced topics. We recommend solidly understanding the fundamental concepts explained in this guide before moving on to the next step.

### Q3: How is this applied in real-world development?

The knowledge from this topic is frequently applied in day-to-day development work. It becomes especially important during code reviews and architecture design.

---

## Summary

| Concept | Key Points |
|---------|------------|
| Package | Directory = package. Starts with uppercase to export |
| go.mod | Declares the module name, Go version, and dependencies |
| go.sum | Detects tampering via dependency checksums. Always commit |
| MVS | Minimum Version Selection for highly reproducible dependency resolution |
| internal | Compiler forbids access from outside the module |
| workspace | go.work for multi-module development. Disable in CI/CD |
| init() | Runs automatically when the package is loaded. Avoid heavy work |
| vendor | For offline builds and auditing. Usually unnecessary |
| replace | For temporary patches. Prefer go.work |
| retract | Retracts problematic versions |
| Build tags | Platform-specific and conditional compilation |
| go generate | Standard mechanism for automatic code generation |

---

## Recommended Next Reads

- [../01-concurrency/00-goroutines-channels.md](../01-concurrency/00-goroutines-channels.md) -- Concurrent programming
- [../02-web/00-net-http.md](../02-web/00-net-http.md) -- Web development
- [../03-tools/04-best-practices.md](../03-tools/04-best-practices.md) -- Best practices for project structure

---

## References

1. **Go Modules Reference** -- https://go.dev/ref/mod
2. **Go Blog, "Using Go Modules"** -- https://go.dev/blog/using-go-modules
3. **Russ Cox, "Minimal Version Selection"** -- https://research.swtch.com/vgo-mvs
4. **Go Blog, "Go Modules: v2 and Beyond"** -- https://go.dev/blog/v2-go-modules
5. **Go Blog, "Publishing Go Modules"** -- https://go.dev/blog/publishing-go-modules
6. **Go Workspace Tutorial** -- https://go.dev/doc/tutorial/workspaces



===== SOURCE: 02-programming/go-practical-guide/docs/01-concurrency/00-goroutines-channels.md =====

# Goroutines and Channels -- The Foundation of Go Concurrent Programming

> Goroutines are lightweight threads, channels are type-safe communication paths, and together they form the core of Go's concurrency model based on CSP.

---

## What You Will Learn in This Chapter

1. **goroutine** -- Lightweight concurrent execution via the go statement
2. **channel** -- Safe data passing and the select statement
3. **sync.WaitGroup** -- Waiting for goroutines to complete
4. **Patterns and Practice** -- Practical use of goroutines and channels in real applications


## Prerequisites

Before reading this guide, the following knowledge will help deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts

---

## 1. Goroutine Basics

### Code Example 1: Starting a goroutine

```go
func main() {
    go func() {
        fmt.Println("Executing in a goroutine")
    }()

    go sayHello("World")

    time.Sleep(100 * time.Millisecond) // Wait (in real code, use WaitGroup)
}

func sayHello(name string) {
    fmt.Printf("Hello, %s!\n", name)
}
```

### How goroutines Work Internally

A goroutine is a lightweight execution unit multiplexed on top of OS threads. The Go runtime adopts an M:N scheduling model, running M goroutines on N OS threads.

```go
// Demo illustrating goroutine characteristics
package main

import (
    "fmt"
    "runtime"
    "sync"
)

func main() {
    // GOMAXPROCS controls the number of OS threads
    fmt.Printf("Logical CPUs: %d\n", runtime.NumCPU())
    fmt.Printf("GOMAXPROCS: %d\n", runtime.GOMAXPROCS(0))

    var wg sync.WaitGroup
    const N = 100000

    // Starting 100,000 goroutines works fine
    for i := 0; i < N; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            // Each goroutine starts with about a 2KB stack
            // and can grow up to 1GB as needed
            _ = id
        }(i)
    }

    wg.Wait()
    fmt.Printf("All %d goroutines completed\n", N)
    fmt.Printf("Current goroutine count: %d\n", runtime.NumGoroutine())
}
```

### The GMP Model of the goroutine Scheduler

```
G = Goroutine (execution unit)
M = Machine  (OS thread)
P = Processor (logical processor, configured via GOMAXPROCS)

                 Global Run Queue
                 [G10][G11][G12]...
                        │
        ┌───────────────┼───────────────┐
        │               │               │
   ┌────▼────┐    ┌────▼────┐    ┌────▼────┐
   │   P0    │    │   P1    │    │   P2    │
   │ Local Q │    │ Local Q │    │ Local Q │
   │[G1][G2] │    │[G4][G5] │    │[G7][G8] │
   │         │    │         │    │         │
   │ current │    │ current │    │ current │
   │   G3    │    │   G6    │    │   G9    │
   └────┬────┘    └────┬────┘    └────┬────┘
        │              │              │
   ┌────▼────┐    ┌────▼────┐    ┌────▼────┐
   │   M0    │    │   M1    │    │   M2    │
   │ (Thread)│    │ (Thread)│    │ (Thread)│
   └─────────┘    └─────────┘    └─────────┘
        │              │              │
   ─────┴──────────────┴──────────────┴──── OS

Work stealing:
  P0's Local Queue is empty → steal half from P1's Local Queue
  → Also pull from the Global Queue
```

### Code Example: Observing goroutine Scheduling

```go
package main

import (
    "fmt"
    "runtime"
    "time"
)

func main() {
    // Set GOMAXPROCS to 1 to observe cooperative scheduling
    runtime.GOMAXPROCS(1)

    go func() {
        for i := 0; i < 5; i++ {
            fmt.Printf("goroutine A: %d\n", i)
            // Without calling runtime.Gosched(),
            // this goroutine may monopolize the CPU
            runtime.Gosched() // Explicitly yield control to the scheduler
        }
    }()

    go func() {
        for i := 0; i < 5; i++ {
            fmt.Printf("goroutine B: %d\n", i)
            runtime.Gosched()
        }
    }()

    time.Sleep(time.Second)
}
```

---

## 2. Channel Basics

### Code Example 2: Unbuffered Channels (Synchronous Channels)

```go
func main() {
    ch := make(chan int)    // Unbuffered channel

    go func() {
        ch <- 42            // Send (blocks until received)
    }()

    value := <-ch           // Receive (blocks until sent)
    fmt.Println(value)      // 42
}
```

The essence of an unbuffered channel lies in its "rendezvous" semantics. A send and a receive are guaranteed to occur simultaneously. This lets you create a reliable synchronization point between two goroutines.

```go
// Application of rendezvous: reliable notification between goroutines
func main() {
    done := make(chan struct{}) // struct{} is zero-byte and memory-efficient

    go func() {
        fmt.Println("Processing...")
        time.Sleep(time.Second)
        fmt.Println("Processing complete")
        done <- struct{}{} // Completion notification
    }()

    <-done // Wait for completion
    fmt.Println("Main goroutine also exiting")
}
```

### Code Example 3: Buffered Channels

```go
func main() {
    ch := make(chan string, 3) // Buffer size 3

    ch <- "a" // Does not block (buffer has space)
    ch <- "b"
    ch <- "c"
    // ch <- "d" // Would block here (buffer is full)

    fmt.Println(<-ch) // "a" (FIFO)
    fmt.Println(<-ch) // "b"
}
```

### Guidelines for Buffer Size Design

```go
// Buffer size 0: synchronous communication (rendezvous)
// Sender blocks until a receiver is ready
done := make(chan struct{})

// Buffer size 1: signaling
// Can buffer one notification
signal := make(chan os.Signal, 1)

// Buffer size N: pipeline / work queue
// Absorbs speed differences between producers and consumers
jobs := make(chan Job, 100)

// Criteria for choosing buffer size:
//   0: when synchronization is required
//   1: for notification use (e.g., signal.Notify)
//   N: to absorb throughput differences between producer/consumer
//   Oversized buffers waste memory and
//   may delay the discovery of problems
```

### Code Example: Channel Direction Constraints

```go
// Ensure type safety with send-only and receive-only channels
func producer(out chan<- int) {
    // chan<- int is send-only. Attempting to receive causes a compile error
    for i := 0; i < 10; i++ {
        out <- i * i
    }
    close(out)
}

func consumer(in <-chan int) {
    // <-chan int is receive-only. Attempting to send causes a compile error
    for v := range in {
        fmt.Println(v)
    }
}

func main() {
    ch := make(chan int, 5)

    go producer(ch)  // chan int is implicitly converted to chan<- int
    consumer(ch)     // chan int is implicitly converted to <-chan int
}
```

---

## 3. The select Statement

### Code Example 4: select Statement Basics

```go
func main() {
    ch1 := make(chan string)
    ch2 := make(chan string)

    go func() { time.Sleep(100 * time.Millisecond); ch1 <- "one" }()
    go func() { time.Sleep(200 * time.Millisecond); ch2 <- "two" }()

    for i := 0; i < 2; i++ {
        select {
        case msg := <-ch1:
            fmt.Println("ch1:", msg)
        case msg := <-ch2:
            fmt.Println("ch2:", msg)
        }
    }
}
```

### Code Example: Applied select Patterns

```go
// Operations with timeout
func fetchWithTimeout(url string, timeout time.Duration) ([]byte, error) {
    result := make(chan []byte, 1)
    errCh := make(chan error, 1)

    go func() {
        resp, err := http.Get(url)
        if err != nil {
            errCh <- err
            return
        }
        defer resp.Body.Close()
        body, err := io.ReadAll(resp.Body)
        if err != nil {
            errCh <- err
            return
        }
        result <- body
    }()

    select {
    case body := <-result:
        return body, nil
    case err := <-errCh:
        return nil, err
    case <-time.After(timeout):
        return nil, fmt.Errorf("fetch %s: timeout after %v", url, timeout)
    }
}

// Non-blocking operation (select with default)
func tryReceive(ch <-chan int) (int, bool) {
    select {
    case v := <-ch:
        return v, true
    default:
        return 0, false // Return immediately if no data on the channel
    }
}

// Combining periodic polling with signal reception
func monitor(ctx context.Context, events <-chan Event) {
    ticker := time.NewTicker(5 * time.Second)
    defer ticker.Stop()

    for {
        select {
        case event := <-events:
            processEvent(event)
        case <-ticker.C:
            checkHealth()
        case <-ctx.Done():
            fmt.Println("Monitoring stopped:", ctx.Err())
            return
        }
    }
}
```

### Random Selection and Fairness in select

```go
// When multiple channels are ready simultaneously,
// select picks one at random (fairness guarantee)
func demonstrateFairness() {
    ch1 := make(chan string, 100)
    ch2 := make(chan string, 100)

    // Populate both channels
    for i := 0; i < 100; i++ {
        ch1 <- "A"
        ch2 <- "B"
    }

    countA, countB := 0, 0
    for i := 0; i < 200; i++ {
        select {
        case <-ch1:
            countA++
        case <-ch2:
            countB++
        }
    }

    // Result is about 100:100 (not exact since it is random)
    fmt.Printf("ch1: %d, ch2: %d\n", countA, countB)
}
```

---

## 4. WaitGroup and Waiting for Completion

### Code Example 5: WaitGroup Basics

```go
func main() {
    var wg sync.WaitGroup
    urls := []string{
        "https://example.com",
        "https://go.dev",
        "https://github.com",
    }

    for _, url := range urls {
        wg.Add(1)
        go func(u string) {
            defer wg.Done()
            resp, err := http.Get(u)
            if err != nil {
                log.Printf("error: %s: %v", u, err)
                return
            }
            defer resp.Body.Close()
            fmt.Printf("%s: %d\n", u, resp.StatusCode)
        }(url)
    }

    wg.Wait() // Wait for all goroutines to complete
}
```

### WaitGroup Pitfalls

```go
// NG: Calling wg.Add inside the goroutine
// wg.Wait() may execute before Add
func badPattern() {
    var wg sync.WaitGroup
    for i := 0; i < 10; i++ {
        go func(id int) {
            wg.Add(1)   // ← NG: Add is called after the goroutine starts
            defer wg.Done()
            process(id)
        }(i)
    }
    wg.Wait() // Wait may run before Add
}

// OK: Call wg.Add before starting the goroutine
func goodPattern() {
    var wg sync.WaitGroup
    for i := 0; i < 10; i++ {
        wg.Add(1) // ← OK: Add before starting the goroutine
        go func(id int) {
            defer wg.Done()
            process(id)
        }(i)
    }
    wg.Wait()
}
```

### Code Example: WaitGroup + Error Collection

```go
// Process concurrently with WaitGroup while also collecting errors
func fetchAllURLs(ctx context.Context, urls []string) ([]Result, []error) {
    var (
        wg      sync.WaitGroup
        mu      sync.Mutex
        results []Result
        errs    []error
    )

    for _, url := range urls {
        wg.Add(1)
        go func(u string) {
            defer wg.Done()

            result, err := fetchURL(ctx, u)

            mu.Lock()
            defer mu.Unlock()
            if err != nil {
                errs = append(errs, fmt.Errorf("fetch %s: %w", u, err))
            } else {
                results = append(results, result)
            }
        }(url)
    }

    wg.Wait()
    return results, errs
}
```

---

## 5. Closing Channels and range

### Code Example 6: Closing a Channel and range

```go
func generate(n int) <-chan int {
    ch := make(chan int)
    go func() {
        defer close(ch) // Close after sending is complete
        for i := 0; i < n; i++ {
            ch <- i * i
        }
    }()
    return ch
}

func main() {
    for v := range generate(5) { // Loop until the channel is closed
        fmt.Println(v) // 0, 1, 4, 9, 16
    }
}
```

### Safe Handling of close

```go
// Receiving from a closed channel
func main() {
    ch := make(chan int, 3)
    ch <- 1
    ch <- 2
    close(ch)

    // Method 1: the ok pattern
    v, ok := <-ch
    fmt.Println(v, ok)  // 1 true
    v, ok = <-ch
    fmt.Println(v, ok)  // 2 true
    v, ok = <-ch
    fmt.Println(v, ok)  // 0 false (closed, zero value)

    // Method 2: range (recommended)
    ch2 := make(chan int, 3)
    ch2 <- 10
    ch2 <- 20
    close(ch2)
    for v := range ch2 {
        fmt.Println(v) // 10, 20
    }
}

// Closing when there are multiple senders
type FanIn struct {
    ch   chan int
    once sync.Once
}

func (f *FanIn) Close() {
    f.once.Do(func() {
        close(f.ch) // Prevent double-close with sync.Once
    })
}
```

---

## 6. Practical goroutine and channel Patterns

### Pattern 1: Fan-out / Fan-in

```go
// Fan-out: distribute from one channel to multiple goroutines
// Fan-in:  merge multiple channels into one channel

func fanOut(input <-chan int, workers int) []<-chan int {
    outputs := make([]<-chan int, workers)
    for i := 0; i < workers; i++ {
        outputs[i] = worker(input)
    }
    return outputs
}

func worker(input <-chan int) <-chan int {
    output := make(chan int)
    go func() {
        defer close(output)
        for v := range input {
            output <- heavyComputation(v)
        }
    }()
    return output
}

func fanIn(channels ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    merged := make(chan int)

    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan int) {
            defer wg.Done()
            for v := range c {
                merged <- v
            }
        }(ch)
    }

    go func() {
        wg.Wait()
        close(merged)
    }()

    return merged
}

func main() {
    // Create the input channel
    input := make(chan int, 100)
    go func() {
        defer close(input)
        for i := 0; i < 1000; i++ {
            input <- i
        }
    }()

    // Fan-out: distribute across 5 workers
    outputs := fanOut(input, 5)

    // Fan-in: merge the results
    results := fanIn(outputs...)

    // Consume the results
    for result := range results {
        fmt.Println(result)
    }
}
```

### Pattern 2: Pipeline

```go
// The pipeline pattern chains stages together
func generate(ctx context.Context, nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            select {
            case out <- n:
            case <-ctx.Done():
                return
            }
        }
    }()
    return out
}

func square(ctx context.Context, in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            select {
            case out <- n * n:
            case <-ctx.Done():
                return
            }
        }
    }()
    return out
}

func filter(ctx context.Context, in <-chan int, pred func(int) bool) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for n := range in {
            if pred(n) {
                select {
                case out <- n:
                case <-ctx.Done():
                    return
                }
            }
        }
    }()
    return out
}

func main() {
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()

    // Build the pipeline: generate -> square -> filter
    nums := generate(ctx, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    squared := square(ctx, nums)
    even := filter(ctx, squared, func(n int) bool {
        return n%2 == 0
    })

    for result := range even {
        fmt.Println(result) // 4, 16, 36, 64, 100
    }
}
```

### Pattern 3: Semaphore (Concurrency Limiting)

```go
// Use a buffered channel as a semaphore
type Semaphore struct {
    ch chan struct{}
}

func NewSemaphore(maxConcurrency int) *Semaphore {
    return &Semaphore{
        ch: make(chan struct{}, maxConcurrency),
    }
}

func (s *Semaphore) Acquire(ctx context.Context) error {
    select {
    case s.ch <- struct{}{}:
        return nil
    case <-ctx.Done():
        return ctx.Err()
    }
}

func (s *Semaphore) Release() {
    <-s.ch
}

// Usage: HTTP requests with up to 10 concurrent
func fetchConcurrently(ctx context.Context, urls []string) []Result {
    sem := NewSemaphore(10) // Up to 10 concurrent
    var wg sync.WaitGroup
    results := make([]Result, len(urls))

    for i, url := range urls {
        wg.Add(1)
        go func(idx int, u string) {
            defer wg.Done()

            if err := sem.Acquire(ctx); err != nil {
                results[idx] = Result{Error: err}
                return
            }
            defer sem.Release()

            resp, err := http.Get(u)
            if err != nil {
                results[idx] = Result{Error: err}
                return
            }
            defer resp.Body.Close()
            body, _ := io.ReadAll(resp.Body)
            results[idx] = Result{Body: body}
        }(i, url)
    }

    wg.Wait()
    return results
}
```

### Pattern 4: Concurrency via errgroup

```go
import "golang.org/x/sync/errgroup"

// errgroup = WaitGroup + error aggregation + context integration
func processOrders(ctx context.Context, orders []Order) error {
    g, ctx := errgroup.WithContext(ctx)

    // Concurrency limit (Go 1.20+)
    g.SetLimit(5)

    for _, order := range orders {
        order := order // Local copy required before Go 1.21
        g.Go(func() error {
            // ctx is automatically linked
            // If any goroutine returns an error,
            // ctx is canceled and the other goroutines also stop
            return processOrder(ctx, order)
        })
    }

    return g.Wait() // Returns the first error
}

// Running multiple kinds of processing concurrently with errgroup
func aggregateData(ctx context.Context, userID string) (*Dashboard, error) {
    g, ctx := errgroup.WithContext(ctx)

    var (
        profile  *Profile
        orders   []Order
        activity []Activity
    )

    g.Go(func() error {
        var err error
        profile, err = fetchProfile(ctx, userID)
        return err
    })

    g.Go(func() error {
        var err error
        orders, err = fetchOrders(ctx, userID)
        return err
    })

    g.Go(func() error {
        var err error
        activity, err = fetchActivity(ctx, userID)
        return err
    })

    if err := g.Wait(); err != nil {
        return nil, fmt.Errorf("aggregateData(%s): %w", userID, err)
    }

    return &Dashboard{
        Profile:  profile,
        Orders:   orders,
        Activity: activity,
    }, nil
}
```

### Pattern 5: Or-Done Channel

```go
// Use the result of whichever of multiple operations completes first
func firstResult(ctx context.Context, fns ...func(context.Context) (string, error)) (string, error) {
    ctx, cancel := context.WithCancel(ctx)
    defer cancel()

    type result struct {
        val string
        err error
    }

    ch := make(chan result, len(fns))

    for _, fn := range fns {
        fn := fn
        go func() {
            val, err := fn(ctx)
            ch <- result{val, err}
        }()
    }

    // Return the first successful result
    var lastErr error
    for i := 0; i < len(fns); i++ {
        r := <-ch
        if r.err == nil {
            cancel() // Cancel the other goroutines
            return r.val, nil
        }
        lastErr = r.err
    }

    return "", fmt.Errorf("all attempts failed, last error: %w", lastErr)
}

// Usage: get the result from the fastest DNS server
result, err := firstResult(ctx,
    func(ctx context.Context) (string, error) {
        return queryDNS(ctx, "8.8.8.8", domain)
    },
    func(ctx context.Context) (string, error) {
        return queryDNS(ctx, "1.1.1.1", domain)
    },
    func(ctx context.Context) (string, error) {
        return queryDNS(ctx, "9.9.9.9", domain)
    },
)
```

### Pattern 6: Ticker and Periodic Processing

```go
// Periodic background processing
func startPeriodicTask(ctx context.Context, interval time.Duration, task func(context.Context) error) {
    ticker := time.NewTicker(interval)
    defer ticker.Stop()

    // Run once right after startup as well
    if err := task(ctx); err != nil {
        log.Printf("Initial run error: %v", err)
    }

    for {
        select {
        case <-ticker.C:
            if err := task(ctx); err != nil {
                log.Printf("Periodic task error: %v", err)
            }
        case <-ctx.Done():
            log.Println("Periodic task stopped")
            return
        }
    }
}

// Usage
func main() {
    ctx, cancel := context.WithCancel(context.Background())

    go startPeriodicTask(ctx, 30*time.Second, func(ctx context.Context) error {
        return cleanupExpiredSessions(ctx)
    })

    go startPeriodicTask(ctx, 5*time.Minute, func(ctx context.Context) error {
        return reportMetrics(ctx)
    })

    // Stop on SIGTERM
    sigCh := make(chan os.Signal, 1)
    signal.Notify(sigCh, syscall.SIGTERM, syscall.SIGINT)
    <-sigCh
    cancel()
    time.Sleep(time.Second) // Wait for cleanup
}
```

---

## 7. Detecting and Preventing goroutine Leaks

### Typical Cases of goroutine Leaks

```go
// Case 1: Sending to a channel that is never received from
func leakySearch(query string) string {
    ch := make(chan string)
    go func() { ch <- searchAPI1(query) }()
    go func() { ch <- searchAPI2(query) }()
    return <-ch // Only one is received. The other goroutine leaks
}

// Fix: buffered channel
func safeSearch(query string) string {
    ch := make(chan string, 2) // All goroutines can send
    go func() { ch <- searchAPI1(query) }()
    go func() { ch <- searchAPI2(query) }()
    return <-ch
}

// Case 2: Generating a channel that is never consumed
func leakyProducer() <-chan int {
    ch := make(chan int)
    go func() {
        i := 0
        for {
            ch <- i // Blocks forever once there is no consumer
            i++
        }
    }()
    return ch
}

// Fix: cancel via context
func safeProducer(ctx context.Context) <-chan int {
    ch := make(chan int)
    go func() {
        defer close(ch)
        i := 0
        for {
            select {
            case ch <- i:
                i++
            case <-ctx.Done():
                return // Guaranteed termination on cancellation
            }
        }
    }()
    return ch
}

// Case 3: Blocking forever waiting on a lock
func leakyLock() {
    var mu sync.Mutex
    mu.Lock()
    go func() {
        mu.Lock()   // Deadlock: the parent goroutine never unlocks
        defer mu.Unlock()
        doWork()
    }()
    // mu.Unlock() is missing
}
```

### Methods for Detecting goroutine Leaks

```go
// Method 1: monitor with runtime.NumGoroutine()
func monitorGoroutines(ctx context.Context) {
    ticker := time.NewTicker(10 * time.Second)
    defer ticker.Stop()

    baseline := runtime.NumGoroutine()

    for {
        select {
        case <-ticker.C:
            current := runtime.NumGoroutine()
            if current > baseline*2 {
                log.Printf("WARNING: Suspected goroutine leak: baseline=%d, current=%d",
                    baseline, current)
                // Dump the stack trace
                buf := make([]byte, 1<<20)
                n := runtime.Stack(buf, true)
                log.Printf("Stack trace:\n%s", buf[:n])
            }
        case <-ctx.Done():
            return
        }
    }
}

// Method 2: leak detection in tests (go.uber.org/goleak)
import "go.uber.org/goleak"

func TestMain(m *testing.M) {
    goleak.VerifyTestMain(m)
}

func TestNoLeak(t *testing.T) {
    defer goleak.VerifyNone(t)

    ctx, cancel := context.WithCancel(context.Background())
    ch := safeProducer(ctx)

    // Consume a few
    for i := 0; i < 10; i++ {
        <-ch
    }

    cancel() // Ensure the goroutine stops
}
```

---

## 8. ASCII Diagrams

### Figure 1: Relationship Between goroutines and OS Threads (M:N Scheduling)

```
┌─────────────── Go Runtime ──────────────────┐
│                                              │
│  G = goroutine    M = OS Thread   P = Proc   │
│                                              │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐             │
│  │G1 │ │G2 │ │G3 │ │G4 │ │G5 │  Run Queue  │
│  └─┬─┘ └─┬─┘ └─┬─┘ └─┬─┘ └─┬─┘             │
│    │      │      │      │      │              │
│  ┌─▼──────▼─┐  ┌─▼──────▼─┐                  │
│  │   P1     │  │   P2     │   Processor      │
│  └────┬─────┘  └────┬─────┘                  │
│       │              │                        │
│  ┌────▼─────┐  ┌────▼─────┐                  │
│  │   M1     │  │   M2     │   OS Thread      │
│  └──────────┘  └──────────┘                  │
└──────────────────────────────────────────────┘
```

### Figure 2: Unbuffered vs Buffered Channels

```
Unbuffered (make(chan int)):
  Sender ──[sync]──> Receiver
  Send blocks until the receiver is ready

  Sender    Channel    Receiver
    │                    │
    ├──── send ────>     │ (blocked)
    │              ├──── recv
    │              │
    │   (sync complete)  │

Buffered (make(chan int, 3)):
  Sender ──[buf]──[buf]──[buf]──> Receiver
  Blocks only when the buffer is full

  Sender    Buffer[3]    Receiver
    │      [_][_][_]       │
    ├─send─>[A][_][_]      │
    ├─send─>[A][B][_]      │
    │       [A][B][_]──recv─┤  → A
    │       [_][B][_]       │
```

### Figure 3: How the select Statement Works

```
select {
case msg := <-ch1:     ┐
case msg := <-ch2:     ├── Execute the ready case
case ch3 <- value:     │   If multiple are ready, pick randomly
default:               ┘   default avoids blocking
}

       ┌─ ch1 ready? ──YES──> run case 1
       │
select─┼─ ch2 ready? ──YES──> run case 2
       │
       ├─ ch3 ready? ──YES──> run case 3
       │
       └─ none ready ──────> run default
                              (block if no default)
```

### Figure 4: Fan-out / Fan-in Pattern

```
Fan-out (distribute from one source to multiple workers):

            ┌──> Worker1 ──┐
  Source ───┼──> Worker2 ──┼──> Merged Output
            ├──> Worker3 ──┤
            └──> Worker4 ──┘

Pipeline (chain of stages):

  Generate ──> Transform ──> Filter ──> Consume
    (chan)       (chan)        (chan)

Or-Done (adopt the first result):

  Query DNS A ──┐
  Query DNS B ──┼──> First Result
  Query DNS C ──┘
```

### Figure 5: goroutine Lifecycle

```
┌─────────────────────────────────────────────┐
│             goroutine Lifecycle              │
│                                             │
│  ┌──────────┐    ┌──────────┐               │
│  │ Runnable │───>│ Running  │               │
│  │ (waiting)│    │(executing)│              │
│  └──────────┘    └────┬─────┘               │
│       ▲               │                     │
│       │               ├──> I/O wait          │
│       │               │    → Waiting state   │
│       │               │    → Runnable on I/O completion│
│       │               │                     │
│       │               ├──> channel wait      │
│       │               │    → Waiting state   │
│       │               │    → Runnable on send/recv │
│       │               │                     │
│       │               ├──> preemption        │
│       │               │    → back to Runnable│
│       │               │                     │
│       └───────────────┘                     │
│                       │                     │
│                       ▼                     │
│               ┌──────────┐                  │
│               │   Dead   │                  │
│               │(terminated)│                │
│               └──────────┘                  │
└─────────────────────────────────────────────┘
```

---

## 9. Comparison Tables

### Table 1: Kinds of Channels

| Kind | Syntax | Send blocks when | Receive blocks when | Use case |
|------|--------|------------------|---------------------|----------|
| Unbuffered | `make(chan T)` | No receiver present | No sender present | Synchronous communication |
| Buffered | `make(chan T, n)` | Buffer full | Buffer empty | Asynchronous communication |
| Send-only | `chan<- T` | Same as above | Compile error | API constraint |
| Receive-only | `<-chan T` | Compile error | Same as above | API constraint |

### Table 2: goroutine vs OS Thread vs async/await

| Item | goroutine | OS Thread | async/await (JS) |
|------|-----------|-----------|------------------|
| Initial stack size | ~2KB | ~1MB | N/A |
| Context switch cost | Low (user space) | High (kernel) | Low (event loop) |
| Practical concurrency | Hundreds of thousands to millions | Thousands | Tens of thousands |
| Scheduling | Go runtime (M:N) | OS | Event loop |
| Memory model | happens-before | OS-dependent | Single-threaded |
| Blocking I/O | Threads added automatically | Thread occupied | Not supported (different mechanism needed) |

### Table 3: Guidelines for Choosing Concurrency Patterns

| Pattern | Use case | Complexity | Number of goroutines |
|---------|----------|------------|---------------------|
| WaitGroup | Wait for all to complete | Low | Known |
| errgroup | Concurrent processing with errors | Low | Known |
| Fan-out/Fan-in | Parallel processing and result aggregation | Medium | Number of workers |
| Pipeline | Stage-based processing | Medium | Number of stages |
| Semaphore | Concurrency limit | Low | Limited |
| Or-Done | Adopt fastest result | Medium | Number of candidates |
| Worker Pool | Continuous job processing | Medium | Fixed |

### Table 4: Results of Channel Operations

| Operation | nil channel | Closed | Buffer empty/full | Normal |
|-----------|-------------|--------|-------------------|--------|
| Send `ch <-` | Blocks forever | **panic** | Blocks (full) | Sends |
| Receive `<-ch` | Blocks forever | Zero value, false | Blocks (empty) | Receives |
| close | **panic** | **panic** | Remaining data still receivable | Closes |
| len | 0 | Items in buffer | Items in buffer | Items in buffer |
| cap | 0 | Buffer size | Buffer size | Buffer size |

---

## 10. Anti-Patterns

### Anti-Pattern 1: goroutine Leak

```go
// BAD: The channel is never received from, so the goroutine blocks forever
func leakySearch(query string) string {
    ch := make(chan string)
    go func() { ch <- searchAPI1(query) }()
    go func() { ch <- searchAPI2(query) }()
    return <-ch // Only one is received; the other goroutine leaks
}

// GOOD: Use context cancellation or a buffered channel
func safeSearch(ctx context.Context, query string) string {
    ch := make(chan string, 2) // Buffer allows all goroutines to send
    go func() { ch <- searchAPI1(query) }()
    go func() { ch <- searchAPI2(query) }()
    return <-ch
}
```

### Anti-Pattern 2: Capturing Loop Variables (before Go 1.21)

```go
// BAD (before Go 1.21): loop variable is shared
for _, url := range urls {
    go func() {
        fetch(url) // All goroutines reference the last url
    }()
}

// GOOD: pass as a parameter (not needed from Go 1.22 onward)
for _, url := range urls {
    url := url // Local copy
    go func() {
        fetch(url)
    }()
}
```

### Anti-Pattern 3: Synchronizing with time.Sleep

```go
// BAD: Wait for goroutine completion with time.Sleep
func badSync() {
    go processData()
    time.Sleep(5 * time.Second) // It is not guaranteed to finish in 5 seconds
}

// GOOD: Synchronize with WaitGroup or a channel
func goodSync() {
    done := make(chan struct{})
    go func() {
        defer close(done)
        processData()
    }()
    <-done // Reliably wait for completion
}
```

### Anti-Pattern 4: Overusing Channels

```go
// BAD: Using a channel for a simple counter
type Counter struct {
    ch chan int
}
func (c *Counter) Inc() {
    c.ch <- 1
}
func (c *Counter) Value() int {
    return <-c.ch
}

// GOOD: Use atomic for a simple counter
type Counter struct {
    count atomic.Int64
}
func (c *Counter) Inc() {
    c.count.Add(1)
}
func (c *Counter) Value() int64 {
    return c.count.Load()
}
```


---

## Practical Exercises

### Exercise 1: Basic Implementation

Implement code that satisfies the following requirements.

**Requirements:**
- Validate input data
- Implement proper error handling
- Write test code as well

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
        """Main data processing logic"""
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
        assert False, "Should have raised an exception"
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
        """Add item (with size limit)"""
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
        """Get statistics"""
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

    print(f"Inefficient version: {slow_time:.4f}s")
    print(f"Efficient version:   {fast_time:.6f}s")
    print(f"Speedup: {slow_time/fast_time:.0f}x")

benchmark()
```

**Key points:**
- Be aware of algorithmic complexity
- Choose appropriate data structures
- Measure the effect with benchmarks

---

## Troubleshooting

### Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| Initialization error | Configuration file issue | Verify config file path and format |
| Timeout | Network latency / insufficient resources | Adjust timeout values, add retry logic |
| Out of memory | Growing data volume | Introduce batch processing, implement pagination |
| Permission error | Insufficient access rights | Check executing user's permissions, review settings |
| Data inconsistency | Concurrent processing conflict | Introduce locking, manage transactions |

### Debugging Steps

1. **Check error messages**: Read the stack trace and identify where it occurs
2. **Establish reproduction steps**: Reproduce the error with minimal code
3. **Form hypotheses**: List possible causes
4. **Verify step by step**: Use logging and debuggers to verify hypotheses
5. **Fix and regression test**: After fixing, run related tests too

```python
# Debugging utility
import logging
import traceback
from functools import wraps

# Logger setup
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s [%(levelname)s] %(name)s: %(message)s'
)
logger = logging.getLogger(__name__)

def debug_decorator(func):
    """Decorator that logs a function's input and output"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        logger.debug(f"Call: {func.__name__}(args={args}, kwargs={kwargs})")
        try:
            result = func(*args, **kwargs)
            logger.debug(f"Return: {func.__name__} -> {result}")
            return result
        except Exception as e:
            logger.error(f"Exception: {func.__name__}: {e}")
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
2. **Check memory usage**: Check for memory leaks
3. **Check I/O waits**: Check disk and network I/O status
4. **Check concurrent connections**: Check connection pool state

| Problem type | Diagnostic tool | Countermeasure |
|--------------|-----------------|----------------|
| CPU load | cProfile, py-spy | Algorithm improvement, parallelization |
| Memory leak | tracemalloc, objgraph | Properly release references |
| I/O bottleneck | strace, iostat | Async I/O, caching |
| DB latency | EXPLAIN, slow query log | Indexing, query optimization |

---

## Design Decision Guide

### Selection Criteria Matrix

The criteria for making technology choices are summarized below.

| Criterion | When to prioritize | When it can be compromised |
|-----------|-------------------|----------------------------|
| Performance | Real-time processing, large-scale data | Admin panels, batch processing |
| Maintainability | Long-term operation, team development | Prototypes, short-term projects |
| Scalability | Services expected to grow | Internal tools, fixed user base |
| Security | Personal info, financial data | Public data, internal use |
| Development speed | MVP, time-to-market | Quality focus, mission-critical |

### Choosing an Architecture Pattern

```
┌─────────────────────────────────────────────────┐
│           Architecture Selection Flow             │
├─────────────────────────────────────────────────┤
│                                                 │
│  1) What is your team size?                     │
│    ├─ Small (1-5) → Monolith                    │
│    └─ Large (10+) → Go to 2)                    │
│                                                 │
│  2) Deployment frequency?                       │
│    ├─ Weekly or less → Monolith + modularization │
│    └─ Daily/multiple → Go to 3)                 │
│                                                 │
│  3) Inter-team independence?                    │
│    ├─ High → Microservices                      │
│    └─ Moderate → Modular monolith               │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Trade-off Analysis

Technical decisions always involve trade-offs. Analyze them from the following perspectives:

**1. Short-term vs long-term cost**
- A short-term fast approach can become long-term technical debt
- Conversely, over-engineering is costly short-term and can delay the project

**2. Consistency vs flexibility**
- A unified tech stack has a low learning cost
- Adopting a variety of technologies allows best-fit choices but increases operational cost

**3. Level of abstraction**
- High abstraction is highly reusable but can make debugging harder
- Low abstraction is intuitive but tends to duplicate code

```python
# Template for recording design decisions
class ArchitectureDecisionRecord:
    """Creation of an ADR (Architecture Decision Record)"""

    def __init__(self, title: str):
        self.title = title
        self.context = ""
        self.decision = ""
        self.consequences = []
        self.alternatives = []

    def set_context(self, context: str):
        """Describe background and problem"""
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
            icon = "[+]" if c['type'] == 'positive' else "[!]"
            md += f"- {icon} {c['description']}\n"
        md += "\n## Rejected Alternatives\n"
        for a in self.alternatives:
            md += f"- **{a['name']}**: {a['reason_rejected']}\n"
        return md
```

---

## Real-World Application Scenarios

### Scenario 1: MVP Development at a Startup

**Situation:** You need to release a product quickly with limited resources.

**Approach:**
- Choose a simple architecture
- Focus on the minimum necessary features
- Automated tests only for the critical path
- Introduce monitoring early

**Lessons learned:**
- Don't strive for perfection (YAGNI principle)
- Obtain user feedback early
- Manage technical debt consciously

### Scenario 2: Modernizing a Legacy System

**Situation:** Gradually renewing a system that has been running for more than 10 years.

**Approach:**
- Migrate gradually with the Strangler Fig pattern
- If no tests exist, write Characterization Tests first
- Use an API gateway to let old and new systems coexist
- Migrate data in phases

| Phase | Work | Duration | Risk |
|-------|------|----------|------|
| 1. Investigation | Analyze current state, map dependencies | 2-4 weeks | Low |
| 2. Foundation | Build CI/CD, test environment | 4-6 weeks | Low |
| 3. Migration start | Migrate peripheral features first | 3-6 months | Medium |
| 4. Core migration | Migrate core features | 6-12 months | High |
| 5. Completion | Retire the old system | 2-4 weeks | Medium |

### Scenario 3: Development with a Large Team

**Situation:** 50+ engineers working on the same product.

**Approach:**
- Clarify boundaries with domain-driven design
- Assign ownership per team
- Manage shared libraries with an Inner Source approach
- Design API-first to minimize inter-team dependencies

```python
# Defining API contracts between teams
from dataclasses import dataclass
from typing import List, Optional
from enum import Enum

class Priority(Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

@dataclass
class APIContract:
    """API contract between teams"""
    endpoint: str
    method: str
    owner_team: str
    consumers: List[str]
    sla_ms: int  # Response time SLA
    priority: Priority

    def validate_sla(self, actual_ms: int) -> bool:
        """Check SLA compliance"""
        return actual_ms <= self.sla_ms

    def to_openapi(self) -> dict:
        """Output in OpenAPI format"""
        return {
            'path': self.endpoint,
            'method': self.method,
            'x-owner': self.owner_team,
            'x-consumers': self.consumers,
            'x-sla-ms': self.sla_ms
        }

# Usage
contracts = [
    APIContract(
        endpoint="/api/v1/users",
        method="GET",
        owner_team="user-team",
        consumers=["order-team", "notification-team"],
        sla_ms=200,
        priority=Priority.HIGH
    ),
    APIContract(
        endpoint="/api/v1/orders",
        method="POST",
        owner_team="order-team",
        consumers=["payment-team", "inventory-team"],
        sla_ms=500,
        priority=Priority.CRITICAL
    )
]
```

### Scenario 4: A Performance-Critical System

**Situation:** A system that requires millisecond-level response times.

**Optimization points:**
1. Caching strategy (L1: in-memory, L2: Redis, L3: CDN)
2. Use of asynchronous processing
3. Connection pooling
4. Query optimization and index design

| Optimization | Effect | Implementation cost | When to apply |
|--------------|--------|---------------------|---------------|
| In-memory cache | High | Low | Frequently accessed data |
| CDN | High | Low | Static content |
| Asynchronous processing | Medium | Medium | I/O-heavy processing |
| DB optimization | High | High | When queries are slow |
| Code optimization | Low-Medium | High | When CPU-bound |
---

## 11. FAQ

### Q1: How many goroutines can you start?

Theoretically, millions. Each goroutine starts with about a 2KB stack, which grows dynamically as needed. However, CPU-bound work will not exceed the parallelism of `runtime.GOMAXPROCS` (which defaults to the number of CPUs). For I/O-bound work, starting many goroutines makes sense. Even 1 million goroutines can be started with about 2GB of memory, but scheduling overhead increases.

### Q2: Should you use channels or Mutex?

Rule of thumb: "Use a channel to transfer ownership of data; use a Mutex to protect shared state." The Go Proverb says "Don't communicate by sharing memory; share memory by communicating," but a Mutex is appropriate for simple counters or caches. Channels feel natural for pipelines and event notifications. Note that when performance matters, channels are slower than Mutex (they use a Mutex internally as well).

### Q3: What happens if you send to a closed channel?

A panic occurs. The "sender" should close the channel, and the "receiver" detects it via range or the ok check. When there are multiple senders, protect closing with sync.Once. The receiver should not close the channel.

### Q4: Should you change GOMAXPROCS?

Usually not. It defaults to the number of CPU cores and is optimal for most workloads. However, in container environments (Docker/Kubernetes), the host CPU count may be visible. Using the `uber-go/automaxprocs` package automatically adjusts it to the CPUs allocated to the container.

### Q5: How do you stop a goroutine from outside?

Go provides no way to forcibly stop a goroutine from outside. Instead, use a design pattern where the goroutine cooperatively checks the cancellation signal from a `context.Context`. Inside the goroutine, periodically check the `ctx.Done()` channel and return if canceled. This is an intentional design decision that guarantees safe resource cleanup.

### Q6: What are nil channels used for?

Sends and receives on a nil channel block forever. This can be used to dynamically disable a specific case in a select statement. For example, if you want to temporarily stop receiving from a channel, setting that channel variable to nil means its case will no longer be selected by select.

```go
func dynamicSelect(ch1, ch2 <-chan int) {
    for ch1 != nil || ch2 != nil {
        select {
        case v, ok := <-ch1:
            if !ok {
                ch1 = nil // Disable ch1
                continue
            }
            fmt.Println("ch1:", v)
        case v, ok := <-ch2:
            if !ok {
                ch2 = nil // Disable ch2
                continue
            }
            fmt.Println("ch2:", v)
        }
    }
}
```

### Q7: Should you use for-range over channel or for-select?

`for v := range ch` is optimal for receiving from a single channel, and the loop terminates automatically when the channel is closed. On the other hand, `for-select` is used when waiting on multiple channels simultaneously, or when you need to detect context cancellation at the same time. Even with a single channel, choose for-select if you need context cancellation.

---


## FAQ

### Q1: What is the most important point to focus on when learning this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory, but by actually writing and running code to see how things work.

### Q2: What are common mistakes beginners make?

Skipping the basics and jumping to advanced topics. We recommend solidly understanding the fundamental concepts explained in this guide before moving on to the next step.

### Q3: How is this applied in real-world development?

The knowledge from this topic is frequently applied in day-to-day development work. It becomes especially important during code reviews and architecture design.

---

## Summary

| Concept | Key points |
|---------|------------|
| goroutine | Start with `go f()`. Lightweight (~2KB), M:N scheduling |
| GMP model | Three-layer structure of Goroutine-Machine-Processor |
| channel | Type-safe communication path. Two kinds: buffered/unbuffered |
| Direction constraints | `chan<-` send-only, `<-chan` receive-only |
| select | Wait on multiple channels. Non-deterministic selection |
| WaitGroup | Wait for a group of goroutines to complete |
| errgroup | WaitGroup + error aggregation + context integration |
| close | Close a channel. Done by the sender |
| range over channel | Loop-receive until closed |
| Fan-out/Fan-in | Parallel distribution and result aggregation |
| Pipeline | Processing flow of chained stages |
| Semaphore | Limit concurrent executions with a channel |

---

## Recommended Next Reads

- [01-sync-primitives.md](./01-sync-primitives.md) -- Synchronization primitives like Mutex/atomic
- [02-concurrency-patterns.md](./02-concurrency-patterns.md) -- Concurrency patterns such as Fan-out/Fan-in
- [03-context.md](./03-context.md) -- Cancellation control with Context

---

## References

1. **Go Blog, "Share Memory By Communicating"** -- https://go.dev/blog/codelab-share
2. **Go Blog, "Go Concurrency Patterns"** -- https://go.dev/blog/concurrency-patterns
3. **Go Blog, "Advanced Go Concurrency Patterns"** -- https://go.dev/blog/io2013-talk-concurrency
4. **Go Blog, "Go Concurrency Patterns: Pipelines and cancellation"** -- https://go.dev/blog/pipelines
5. **Hoare, C.A.R. (1978) "Communicating Sequential Processes"** -- https://www.cs.cmu.edu/~crary/819-f09/Hoare78.pdf
6. **golang.org/x/sync/errgroup** -- https://pkg.go.dev/golang.org/x/sync/errgroup
7. **uber-go/goleak** -- https://github.com/uber-go/goleak



===== SOURCE: 02-programming/go-practical-guide/docs/01-concurrency/01-sync-primitives.md =====

# Synchronization Primitives -- Mutex, RWMutex, Once, Pool, atomic

> The sync package provides synchronization primitives such as Mutex, RWMutex, Once, and Pool, while sync/atomic offers lock-free atomic operations.

---

## What You Will Learn in This Chapter

1. **Mutex / RWMutex** -- Exclusive control and read/write locks
2. **sync.Once / sync.Pool** -- One-time initialization and object reuse
3. **sync/atomic** -- Lock-free atomic operations
4. **sync.Cond / sync.Map** -- Condition variables and concurrency-safe maps
5. **Practical patterns** -- Leveraging synchronization primitives in production code


## Prerequisites

Before reading this guide, the following knowledge will help deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts
- Understanding the content of [Goroutines and Channels -- The Foundation of Go Concurrent Programming](./00-goroutines-channels.md)

---

## 1. Mutex

### Code Example 1: Basics of sync.Mutex

```go
type SafeCounter struct {
    mu sync.Mutex
    v  map[string]int
}

func (c *SafeCounter) Inc(key string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.v[key]++
}

func (c *SafeCounter) Value(key string) int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.v[key]
}
```

### How Mutex Works Internally

Go's Mutex has two modes: Normal mode and Starvation mode.

```
Normal mode:
  Newly arriving goroutines attempt to acquire the lock
  ┌──────────┐     ┌──────────┐     ┌──────────┐
  │ Waiting  │────>│ Spinning │────>│ Acquired │
  │ goroutine│     │ (CAS)    │     │ Lock     │
  └──────────┘     └──────────┘     └──────────┘
  → A newly arrived goroutine can acquire the lock before
    goroutines already waiting (good performance but not fair)

Starvation mode:
  Entered when a goroutine has been waiting for more than 1ms
  ┌──────────┐     ┌──────────┐
  │ FIFO     │────>│ Acquired │
  │ Queue    │     │ Lock     │
  └──────────┘     └──────────┘
  → The lock is granted in strict FIFO order
  → No spinning; fairness is guaranteed
  → Returns to normal mode when the wait queue is empty
    or the last waiter's wait time is < 1ms
```

### Code Example: A Mutex-Protected Cache

```go
type TTLCache struct {
    mu      sync.Mutex
    items   map[string]cacheItem
    ttl     time.Duration
    cleanCh chan struct{}
}

type cacheItem struct {
    value     interface{}
    expiresAt time.Time
}

func NewTTLCache(ttl time.Duration) *TTLCache {
    c := &TTLCache{
        items:   make(map[string]cacheItem),
        ttl:     ttl,
        cleanCh: make(chan struct{}),
    }
    go c.cleanup()
    return c
}

func (c *TTLCache) Set(key string, value interface{}) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.items[key] = cacheItem{
        value:     value,
        expiresAt: time.Now().Add(c.ttl),
    }
}

func (c *TTLCache) Get(key string) (interface{}, bool) {
    c.mu.Lock()
    defer c.mu.Unlock()

    item, ok := c.items[key]
    if !ok {
        return nil, false
    }
    if time.Now().After(item.expiresAt) {
        delete(c.items, key)
        return nil, false
    }
    return item.value, true
}

func (c *TTLCache) Delete(key string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    delete(c.items, key)
}

func (c *TTLCache) Len() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return len(c.items)
}

func (c *TTLCache) cleanup() {
    ticker := time.NewTicker(c.ttl / 2)
    defer ticker.Stop()

    for {
        select {
        case <-ticker.C:
            c.mu.Lock()
            now := time.Now()
            for key, item := range c.items {
                if now.After(item.expiresAt) {
                    delete(c.items, key)
                }
            }
            c.mu.Unlock()
        case <-c.cleanCh:
            return
        }
    }
}

func (c *TTLCache) Close() {
    close(c.cleanCh)
}
```

---

## 2. RWMutex

### Code Example 2: sync.RWMutex

```go
type Cache struct {
    mu   sync.RWMutex
    data map[string]string
}

func (c *Cache) Get(key string) (string, bool) {
    c.mu.RLock()         // Read lock (multiple readers allowed simultaneously)
    defer c.mu.RUnlock()
    v, ok := c.data[key]
    return v, ok
}

func (c *Cache) Set(key, value string) {
    c.mu.Lock()          // Write lock (exclusive)
    defer c.mu.Unlock()
    c.data[key] = value
}
```

### Detailed Behavior of RWMutex

```go
// Read/write behavior of RWMutex
//
// Read lock (RLock):
//   - Acquired immediately if no write lock is held
//   - Multiple goroutines can hold RLock simultaneously
//   - If a write lock is waiting, new RLocks must wait
//     (to prevent writer starvation)
//
// Write lock (Lock):
//   - Waits until all RLocks are released
//   - Once acquired, no other RLock or Lock can be obtained

type ConfigManager struct {
    mu     sync.RWMutex
    config map[string]string
}

func NewConfigManager() *ConfigManager {
    return &ConfigManager{
        config: make(map[string]string),
    }
}

// Reads can happen concurrently
func (cm *ConfigManager) Get(key string) string {
    cm.mu.RLock()
    defer cm.mu.RUnlock()
    return cm.config[key]
}

// GetAll returns a snapshot of the config
func (cm *ConfigManager) GetAll() map[string]string {
    cm.mu.RLock()
    defer cm.mu.RUnlock()

    // Return a copy (to prevent modification outside the lock)
    snapshot := make(map[string]string, len(cm.config))
    for k, v := range cm.config {
        snapshot[k] = v
    }
    return snapshot
}

// Writes are exclusive
func (cm *ConfigManager) Set(key, value string) {
    cm.mu.Lock()
    defer cm.mu.Unlock()
    cm.config[key] = value
}

// Bulk update (transactional-style update)
func (cm *ConfigManager) Update(updates map[string]string) {
    cm.mu.Lock()
    defer cm.mu.Unlock()

    for k, v := range updates {
        cm.config[k] = v
    }
}
```

### RWMutex vs Mutex Benchmark

```go
// Benchmark to measure performance difference based on read ratio
func BenchmarkMutexRead(b *testing.B) {
    var mu sync.Mutex
    data := map[string]int{"key": 42}

    b.RunParallel(func(pb *testing.PB) {
        for pb.Next() {
            mu.Lock()
            _ = data["key"]
            mu.Unlock()
        }
    })
}

func BenchmarkRWMutexRead(b *testing.B) {
    var mu sync.RWMutex
    data := map[string]int{"key": 42}

    b.RunParallel(func(pb *testing.PB) {
        for pb.Next() {
            mu.RLock()
            _ = data["key"]
            mu.RUnlock()
        }
    })
}

// Approximate results (8-core machine):
// BenchmarkMutexRead-8      20000000    60 ns/op
// BenchmarkRWMutexRead-8    50000000    25 ns/op
//
// → When reads are 95%+, RWMutex is advantageous
// → When writes are 50%+, Mutex can be better
//   (due to RWMutex overhead)
```

---

## 3. sync.Once

### Code Example 3: Basics of sync.Once

```go
var (
    instance *Database
    once     sync.Once
)

func GetDB() *Database {
    once.Do(func() {
        // Executed only once even when called from multiple goroutines
        instance = &Database{
            conn: connectDB(),
        }
    })
    return instance
}
```

### OnceFunc / OnceValue / OnceValues in Go 1.21+

```go
// Convenient helpers added in Go 1.21

// sync.OnceFunc: returns a wrapper that runs the function only once
cleanup := sync.OnceFunc(func() {
    fmt.Println("Running cleanup")
    db.Close()
})

cleanup() // Outputs "Running cleanup"
cleanup() // Nothing happens (second call is not executed)

// sync.OnceValue: returns a wrapper that computes a value only once
getConfig := sync.OnceValue(func() *Config {
    fmt.Println("Loading config...")
    cfg, err := loadConfig("config.yaml")
    if err != nil {
        panic(err) // Panics are re-raised on subsequent calls
    }
    return cfg
})

cfg := getConfig() // Outputs "Loading config..."
cfg = getConfig()  // Returns the cached value

// sync.OnceValues: version that returns a value and an error
loadCert := sync.OnceValues(func() (*tls.Certificate, error) {
    return tls.LoadX509KeyPair("cert.pem", "key.pem")
})

cert, err := loadCert() // First call: reads the files
cert, err = loadCert()  // Second call: returns the cached result
```

### Error-Handling Patterns with Once

```go
// Pattern for safely handling initialization errors with sync.Once
type LazyDB struct {
    once sync.Once
    db   *sql.DB
    err  error
}

func (l *LazyDB) Get() (*sql.DB, error) {
    l.once.Do(func() {
        l.db, l.err = sql.Open("postgres", os.Getenv("DATABASE_URL"))
        if l.err != nil {
            return
        }
        l.err = l.db.Ping()
    })
    return l.db, l.err
}

// Note: Once.Do considers the call "done" even if it panics
// If you want to retry on error, you need a different approach

// Retryable initialization (sync.Once cannot be used)
type RetryableInit struct {
    mu       sync.Mutex
    db       *sql.DB
    initDone bool
}

func (r *RetryableInit) Get() (*sql.DB, error) {
    r.mu.Lock()
    defer r.mu.Unlock()

    if r.initDone {
        return r.db, nil
    }

    db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
    if err != nil {
        return nil, err // Can be retried on the next call
    }

    if err := db.Ping(); err != nil {
        db.Close()
        return nil, err // Can be retried on the next call
    }

    r.db = db
    r.initDone = true
    return r.db, nil
}
```

---

## 4. sync.Pool

### Code Example 4: Basics of sync.Pool

```go
var bufPool = sync.Pool{
    New: func() interface{} {
        return new(bytes.Buffer)
    },
}

func processRequest(data []byte) string {
    buf := bufPool.Get().(*bytes.Buffer)
    defer func() {
        buf.Reset()
        bufPool.Put(buf) // Return to the pool
    }()

    buf.Write(data)
    return buf.String()
}
```

### Practical Uses of sync.Pool

```go
// Pool of JSON encoders
var encoderPool = sync.Pool{
    New: func() interface{} {
        return &bytes.Buffer{}
    },
}

func respondJSON(w http.ResponseWriter, data interface{}) error {
    buf := encoderPool.Get().(*bytes.Buffer)
    defer func() {
        buf.Reset()
        encoderPool.Put(buf)
    }()

    if err := json.NewEncoder(buf).Encode(data); err != nil {
        return err
    }

    w.Header().Set("Content-Type", "application/json")
    _, err := w.Write(buf.Bytes())
    return err
}

// Slice pool (fixed-size buffer)
var slicePool = sync.Pool{
    New: func() interface{} {
        s := make([]byte, 0, 4096)
        return &s
    },
}

func processData(input []byte) []byte {
    bufPtr := slicePool.Get().(*[]byte)
    buf := (*bufPtr)[:0] // Reset the length, keep the capacity
    defer func() {
        *bufPtr = buf[:0]
        slicePool.Put(bufPtr)
    }()

    // Use buf for processing
    buf = append(buf, input...)
    // ... processing ...

    // Copy and return the result (copying is required when taking data out of the pool)
    result := make([]byte, len(buf))
    copy(result, buf)
    return result
}

// A log formatter using sync.Pool
type LogFormatter struct {
    pool sync.Pool
}

func NewLogFormatter() *LogFormatter {
    return &LogFormatter{
        pool: sync.Pool{
            New: func() interface{} {
                return &strings.Builder{}
            },
        },
    }
}

func (f *LogFormatter) Format(level, msg string, fields map[string]interface{}) string {
    sb := f.pool.Get().(*strings.Builder)
    defer func() {
        sb.Reset()
        f.pool.Put(sb)
    }()

    sb.WriteString(time.Now().Format(time.RFC3339))
    sb.WriteString(" [")
    sb.WriteString(level)
    sb.WriteString("] ")
    sb.WriteString(msg)

    for k, v := range fields {
        sb.WriteString(" ")
        sb.WriteString(k)
        sb.WriteString("=")
        fmt.Fprintf(sb, "%v", v)
    }

    return sb.String()
}
```

### Caveats of sync.Pool

```
┌──────────────────────────────────────────────────────┐
│                Characteristics of sync.Pool          │
│                                                      │
│  Appropriate uses:                                   │
│    - Temporary objects frequently allocated/freed    │
│    - Buffers, encoders, formatters                   │
│    - Goal is to reduce GC pressure                   │
│                                                      │
│  Inappropriate uses:                                 │
│    - Using as a cache                                │
│      → Objects can be reclaimed by GC without notice │
│    - Connection pools (DB, HTTP)                     │
│      → Cannot manage connection state                │
│    - Long-lived objects                              │
│      → Contradicts the purpose of Pool               │
│                                                      │
│  Cautions:                                           │
│    - Always initialize the result of Pool.Get()      │
│    - Reset the object before calling Pool.Put()      │
│    - Do not let objects from the pool escape         │
│    - Verify the benefits with benchmarks first       │
└──────────────────────────────────────────────────────┘
```

---

## 5. sync/atomic

### Code Example 5: Basics of atomic (Go 1.19+ type-safe API)

```go
type AtomicCounter struct {
    count atomic.Int64  // Go 1.19+
}

func (c *AtomicCounter) Inc() {
    c.count.Add(1)
}

func (c *AtomicCounter) Value() int64 {
    return c.count.Load()
}

// Safely read/write arbitrary values with atomic.Value
var config atomic.Value // *Config

func UpdateConfig(cfg *Config) {
    config.Store(cfg)
}

func GetConfig() *Config {
    return config.Load().(*Config)
}
```

### Detailed Usage of atomic

```go
// Type-safe atomic types in Go 1.19+
type Metrics struct {
    RequestCount  atomic.Int64
    ErrorCount    atomic.Int64
    ActiveConns   atomic.Int32
    BytesReceived atomic.Uint64
    IsHealthy     atomic.Bool
}

func (m *Metrics) RecordRequest(success bool, bytes uint64) {
    m.RequestCount.Add(1)
    m.BytesReceived.Add(bytes)
    if !success {
        m.ErrorCount.Add(1)
    }
}

func (m *Metrics) ConnectionOpened() {
    m.ActiveConns.Add(1)
}

func (m *Metrics) ConnectionClosed() {
    m.ActiveConns.Add(-1)
}

func (m *Metrics) Snapshot() map[string]interface{} {
    return map[string]interface{}{
        "requests":       m.RequestCount.Load(),
        "errors":         m.ErrorCount.Load(),
        "active_conns":   m.ActiveConns.Load(),
        "bytes_received": m.BytesReceived.Load(),
        "healthy":        m.IsHealthy.Load(),
    }
}
```

### Compare-And-Swap (CAS) Pattern

```go
// Lock-free stack using CAS
type LockFreeStack struct {
    top atomic.Pointer[node]
}

type node struct {
    value int
    next  *node
}

func (s *LockFreeStack) Push(value int) {
    newNode := &node{value: value}
    for {
        oldTop := s.top.Load()
        newNode.next = oldTop
        // CAS: replace with newNode only if top is still oldTop
        if s.top.CompareAndSwap(oldTop, newNode) {
            return
        }
        // Retry on failure (another goroutine modified it first)
    }
}

func (s *LockFreeStack) Pop() (int, bool) {
    for {
        oldTop := s.top.Load()
        if oldTop == nil {
            return 0, false
        }
        // CAS: replace with next only if top is still oldTop
        if s.top.CompareAndSwap(oldTop, oldTop.next) {
            return oldTop.value, true
        }
        // Retry on failure
    }
}

// Config hot reload using atomic.Value
type HotConfig struct {
    value atomic.Value
}

func NewHotConfig(initial *AppConfig) *HotConfig {
    hc := &HotConfig{}
    hc.value.Store(initial)
    return hc
}

func (hc *HotConfig) Get() *AppConfig {
    return hc.value.Load().(*AppConfig)
}

func (hc *HotConfig) Reload(newConfig *AppConfig) {
    hc.value.Store(newConfig)
    // Readers will get the new config on the next Load()
    // No locking needed; reads are always non-blocking
}

// Hot reload combined with file watching
func (hc *HotConfig) WatchFile(ctx context.Context, path string) error {
    ticker := time.NewTicker(5 * time.Second)
    defer ticker.Stop()

    var lastModified time.Time

    for {
        select {
        case <-ticker.C:
            info, err := os.Stat(path)
            if err != nil {
                log.Printf("Error checking config file: %v", err)
                continue
            }

            if info.ModTime().After(lastModified) {
                cfg, err := loadAppConfig(path)
                if err != nil {
                    log.Printf("Error loading config: %v", err)
                    continue
                }
                hc.Reload(cfg)
                lastModified = info.ModTime()
                log.Printf("Config reload complete: %s", path)
            }

        case <-ctx.Done():
            return ctx.Err()
        }
    }
}
```

---

## 6. sync.Map

### Code Example 6: Basics of sync.Map

```go
var cache sync.Map

func main() {
    // Store
    cache.Store("key1", "value1")
    cache.Store("key2", "value2")

    // Load
    if v, ok := cache.Load("key1"); ok {
        fmt.Println(v.(string))
    }

    // LoadOrStore: retrieve if present, otherwise store
    actual, loaded := cache.LoadOrStore("key3", "value3")
    fmt.Println(actual, loaded) // "value3" false

    // Range: iterate over all entries
    cache.Range(func(key, value any) bool {
        fmt.Printf("%s: %s\n", key, value)
        return true // return false to stop iteration
    })
}
```

### When sync.Map Is and Isn't Appropriate

```go
// When sync.Map is appropriate:
//
// 1. Keys are stable (additions are common, deletions are rare)
// 2. Reads vastly outnumber writes
// 3. Different goroutines access different keys (key-level distribution)

// Case 1: Routing table (set at startup, read at runtime)
var routeHandlers sync.Map

func registerRoute(pattern string, handler http.Handler) {
    routeHandlers.Store(pattern, handler)
}

func findHandler(pattern string) (http.Handler, bool) {
    v, ok := routeHandlers.Load(pattern)
    if !ok {
        return nil, false
    }
    return v.(http.Handler), true
}

// Case 2: Goroutine-local storage
var goroutineData sync.Map

func processWithID(id int) {
    goroutineData.Store(id, &ProcessState{
        StartTime: time.Now(),
    })
    defer goroutineData.Delete(id)

    // Processing...
}

// When sync.Map is inappropriate → use map + RWMutex
//
// 1. Frequent writes
// 2. Frequent iteration over all entries (Range)
// 3. Type safety is required

// Type-safe generic map (generics + RWMutex)
type SafeMap[K comparable, V any] struct {
    mu   sync.RWMutex
    data map[K]V
}

func NewSafeMap[K comparable, V any]() *SafeMap[K, V] {
    return &SafeMap[K, V]{
        data: make(map[K]V),
    }
}

func (m *SafeMap[K, V]) Get(key K) (V, bool) {
    m.mu.RLock()
    defer m.mu.RUnlock()
    v, ok := m.data[key]
    return v, ok
}

func (m *SafeMap[K, V]) Set(key K, value V) {
    m.mu.Lock()
    defer m.mu.Unlock()
    m.data[key] = value
}

func (m *SafeMap[K, V]) Delete(key K) {
    m.mu.Lock()
    defer m.mu.Unlock()
    delete(m.data, key)
}

func (m *SafeMap[K, V]) Len() int {
    m.mu.RLock()
    defer m.mu.RUnlock()
    return len(m.data)
}

func (m *SafeMap[K, V]) Range(fn func(K, V) bool) {
    m.mu.RLock()
    defer m.mu.RUnlock()
    for k, v := range m.data {
        if !fn(k, v) {
            break
        }
    }
}
```

---

## 7. sync.Cond

### Using Condition Variables

```go
// sync.Cond makes goroutines wait until a condition is satisfied.
// It enables "broadcast notification" which is hard to achieve with channels.

type BoundedQueue struct {
    mu       sync.Mutex
    notEmpty *sync.Cond
    notFull  *sync.Cond
    items    []interface{}
    maxSize  int
}

func NewBoundedQueue(maxSize int) *BoundedQueue {
    q := &BoundedQueue{
        items:   make([]interface{}, 0, maxSize),
        maxSize: maxSize,
    }
    q.notEmpty = sync.NewCond(&q.mu)
    q.notFull = sync.NewCond(&q.mu)
    return q
}

func (q *BoundedQueue) Put(item interface{}) {
    q.mu.Lock()
    defer q.mu.Unlock()

    // Wait while the queue is full
    for len(q.items) >= q.maxSize {
        q.notFull.Wait() // mu.Unlock() → wait → mu.Lock()
    }

    q.items = append(q.items, item)
    q.notEmpty.Signal() // Wake up one waiting goroutine
}

func (q *BoundedQueue) Take() interface{} {
    q.mu.Lock()
    defer q.mu.Unlock()

    // Wait while the queue is empty
    for len(q.items) == 0 {
        q.notEmpty.Wait()
    }

    item := q.items[0]
    q.items = q.items[1:]
    q.notFull.Signal()
    return item
}

// Example of Broadcast: notifying all waiters
type ReadyGate struct {
    mu    sync.Mutex
    cond  *sync.Cond
    ready bool
}

func NewReadyGate() *ReadyGate {
    g := &ReadyGate{}
    g.cond = sync.NewCond(&g.mu)
    return g
}

func (g *ReadyGate) Wait() {
    g.mu.Lock()
    defer g.mu.Unlock()
    for !g.ready {
        g.cond.Wait()
    }
}

func (g *ReadyGate) Open() {
    g.mu.Lock()
    defer g.mu.Unlock()
    g.ready = true
    g.cond.Broadcast() // Wake up all waiting goroutines
}

// Usage example
func main() {
    gate := NewReadyGate()

    // Multiple workers wait for the gate to open
    for i := 0; i < 10; i++ {
        go func(id int) {
            gate.Wait()
            fmt.Printf("Worker %d: started\n", id)
        }(i)
    }

    time.Sleep(time.Second)
    fmt.Println("Opening gate...")
    gate.Open() // All workers start simultaneously
}
```

---

## 8. Advanced Use of sync.WaitGroup

```go
// WaitGroup + semaphore: concurrency-limited parallel processing
func processWithLimit(items []Item, maxConcurrency int) error {
    var wg sync.WaitGroup
    sem := make(chan struct{}, maxConcurrency)
    errCh := make(chan error, len(items))

    for _, item := range items {
        wg.Add(1)
        go func(it Item) {
            defer wg.Done()

            sem <- struct{}{}        // Acquire semaphore
            defer func() { <-sem }() // Release semaphore

            if err := process(it); err != nil {
                errCh <- err
            }
        }(item)
    }

    wg.Wait()
    close(errCh)

    // Aggregate errors
    var errs []error
    for err := range errCh {
        errs = append(errs, err)
    }
    if len(errs) > 0 {
        return fmt.Errorf("%d processing errors: %v", len(errs), errs[0])
    }
    return nil
}

// WaitGroup + progress reporting
type ProgressTracker struct {
    total     int
    completed atomic.Int64
    wg        sync.WaitGroup
}

func NewProgressTracker(total int) *ProgressTracker {
    pt := &ProgressTracker{total: total}
    pt.wg.Add(total)
    return pt
}

func (pt *ProgressTracker) Done() {
    pt.completed.Add(1)
    pt.wg.Done()
}

func (pt *ProgressTracker) Wait() {
    pt.wg.Wait()
}

func (pt *ProgressTracker) Progress() float64 {
    return float64(pt.completed.Load()) / float64(pt.total) * 100
}

// Usage example
func processFiles(files []string) {
    pt := NewProgressTracker(len(files))

    // Progress reporting goroutine
    go func() {
        ticker := time.NewTicker(time.Second)
        defer ticker.Stop()
        for {
            select {
            case <-ticker.C:
                fmt.Printf("Progress: %.1f%%\n", pt.Progress())
                if pt.Progress() >= 100 {
                    return
                }
            }
        }
    }()

    for _, file := range files {
        go func(f string) {
            defer pt.Done()
            processFile(f)
        }(file)
    }

    pt.Wait()
    fmt.Println("All files processed")
}
```

---

## 9. Practical Patterns: Combining Multiple Synchronization Primitives

### Pattern 1: Sharded Map

```go
// Sharding to improve the performance of a concurrent map with many keys
const numShards = 32

type ShardedMap[V any] struct {
    shards [numShards]struct {
        mu    sync.RWMutex
        items map[string]V
    }
}

func NewShardedMap[V any]() *ShardedMap[V] {
    sm := &ShardedMap[V]{}
    for i := range sm.shards {
        sm.shards[i].items = make(map[string]V)
    }
    return sm
}

func (sm *ShardedMap[V]) shard(key string) int {
    h := fnv.New32a()
    h.Write([]byte(key))
    return int(h.Sum32()) % numShards
}

func (sm *ShardedMap[V]) Get(key string) (V, bool) {
    s := &sm.shards[sm.shard(key)]
    s.mu.RLock()
    defer s.mu.RUnlock()
    v, ok := s.items[key]
    return v, ok
}

func (sm *ShardedMap[V]) Set(key string, value V) {
    s := &sm.shards[sm.shard(key)]
    s.mu.Lock()
    defer s.mu.Unlock()
    s.items[key] = value
}

func (sm *ShardedMap[V]) Delete(key string) {
    s := &sm.shards[sm.shard(key)]
    s.mu.Lock()
    defer s.mu.Unlock()
    delete(s.items, key)
}

func (sm *ShardedMap[V]) Len() int {
    total := 0
    for i := range sm.shards {
        sm.shards[i].mu.RLock()
        total += len(sm.shards[i].items)
        sm.shards[i].mu.RUnlock()
    }
    return total
}
```

### Pattern 2: Singleton with Lazy Init

```go
// Generic singleton pattern using generics
type Singleton[T any] struct {
    once     sync.Once
    value    T
    initFunc func() T
}

func NewSingletonT any T) *Singleton[T] {
    return &Singleton[T]{initFunc: init}
}

func (s *Singleton[T]) Get() T {
    s.once.Do(func() {
        s.value = s.initFunc()
    })
    return s.value
}

// Usage example
var dbSingleton = NewSingleton(func() *sql.DB {
    db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
    if err != nil {
        log.Fatal(err)
    }
    db.SetMaxOpenConns(25)
    db.SetMaxIdleConns(5)
    return db
})

func handler(w http.ResponseWriter, r *http.Request) {
    db := dbSingleton.Get()
    // Use db...
}
```

### Pattern 3: Rate Limiter (Token Bucket)

```go
// Token bucket rate limiter using atomic
type TokenBucket struct {
    tokens     atomic.Int64
    maxTokens  int64
    refillRate int64 // Refill amount per second
    lastRefill atomic.Int64
}

func NewTokenBucket(maxTokens, refillRate int64) *TokenBucket {
    tb := &TokenBucket{
        maxTokens:  maxTokens,
        refillRate: refillRate,
    }
    tb.tokens.Store(maxTokens)
    tb.lastRefill.Store(time.Now().UnixNano())
    return tb
}

func (tb *TokenBucket) refill() {
    now := time.Now().UnixNano()
    last := tb.lastRefill.Load()
    elapsed := float64(now-last) / float64(time.Second)

    if elapsed < 0.001 { // Ignore intervals less than 1ms
        return
    }

    if tb.lastRefill.CompareAndSwap(last, now) {
        newTokens := int64(elapsed * float64(tb.refillRate))
        if newTokens > 0 {
            current := tb.tokens.Load()
            updated := current + newTokens
            if updated > tb.maxTokens {
                updated = tb.maxTokens
            }
            tb.tokens.Store(updated)
        }
    }
}

func (tb *TokenBucket) Allow() bool {
    tb.refill()
    for {
        current := tb.tokens.Load()
        if current <= 0 {
            return false
        }
        if tb.tokens.CompareAndSwap(current, current-1) {
            return true
        }
    }
}
```

---

## 10. ASCII Diagrams

### Diagram 1: Mutex vs RWMutex

```
Mutex (sync.Mutex):
  G1: [===Lock===]
  G2:             [===Lock===]
  G3:                         [===Lock===]
  → All access is serialized

RWMutex (sync.RWMutex):
  G1(R): [==RLock==]
  G2(R): [==RLock==]  ← Reads can happen concurrently
  G3(R): [==RLock==]
  G4(W):              [===Lock===]  ← Writes are exclusive
  G5(R):                           [==RLock==]

  → Improves throughput when reads are frequent

RWMutex writer starvation prevention:
  G1(R): [==RLock==]
  G4(W):              waiting → [===Lock===]
  G5(R):              waiting──────────────>[==RLock==]
  → G5(R) arriving while G4(W) is waiting is also made to wait
```

### Diagram 2: sync.Pool Lifecycle

```
┌──────────────────────────────────────┐
│            sync.Pool                 │
│  ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ buf1 │ │ buf2 │ │ buf3 │ pool    │
│  └──┬───┘ └──────┘ └──────┘        │
│     │                                │
│  Get()  ───> retrieve buf1           │
│              (calls New() if pool is empty) │
│                                      │
│  Put(buf1) ──> return buf1 to pool   │
│                                      │
│  * Objects in the pool may be        │
│    reclaimed during GC               │
└──────────────────────────────────────┘

Internal structure of Pool:
  ┌─────────────────────────────────────┐
  │  P0 (Processor)                     │
  │  ┌─────────────┐  ┌──────────────┐ │
  │  │ private     │  │ shared       │ │
  │  │ (only one)  │  │ (lock-free)  │ │
  │  │ ┌───┐      │  │ ┌───┐┌───┐  │ │
  │  │ │buf│      │  │ │buf││buf│  │ │
  │  │ └───┘      │  │ └───┘└───┘  │ │
  │  └─────────────┘  └──────────────┘ │
  │                                     │
  │  Get: private → shared → other P's shared → New()
  │  Put: private (if empty) → shared   │
  └─────────────────────────────────────┘
```

### Diagram 3: atomic operations vs Mutex

```
atomic.Add:
  Indivisible operation at the CPU instruction level
  ┌─────┐
  │ CAS │  Compare-And-Swap
  │instr│  Read + compare + write in a single instruction
  └─────┘
  → No lock required, fastest

Mutex:
  ┌──────────┐
  │ Lock()   │ ← Spin lock or OS scheduler
  │ operation│
  │ Unlock() │
  └──────────┘
  → Context switching overhead

Performance comparison (approximate):
  atomic.Int64.Add:     ~5ns/op
  sync.Mutex + op:      ~25ns/op  (no contention)
  sync.Mutex + op:      ~100ns/op (high contention)
  sync.RWMutex (Read):  ~15ns/op  (no contention)
```

### Diagram 4: Architecture of ShardedMap

```
Key "user:123" → hash → shard 7

┌─────────────────────────────────────────┐
│              ShardedMap                  │
│                                         │
│  Shard[0]   Shard[1]   ...   Shard[31] │
│  ┌───────┐  ┌───────┐       ┌───────┐ │
│  │RWMutex│  │RWMutex│       │RWMutex│ │
│  │┌─────┐│  │┌─────┐│       │┌─────┐│ │
│  ││ map ││  ││ map ││       ││ map ││ │
│  │└─────┘│  │└─────┘│       │└─────┘│ │
│  └───────┘  └───────┘       └───────┘ │
│                                         │
│  → Each shard has its own independent lock │
│  → Access to different shards can be concurrent │
│  → With 32 shards, up to 32x throughput theoretically │
└─────────────────────────────────────────┘
```

---

## 11. Comparison Tables

### Table 1: Selection Guide for Synchronization Primitives

| Primitive | Purpose | Cost | Thread-safe |
|-----------|---------|------|-------------|
| sync.Mutex | Simple exclusive control | Medium | Yes |
| sync.RWMutex | Read-heavy workloads | Medium | Yes |
| sync.Once | One-time initialization | Low | Yes |
| sync.OnceValue | One-time computation (returns value) | Low | Yes |
| sync.Pool | Object reuse | Low | Yes |
| sync.Map | Map with specific access patterns | Medium | Yes |
| sync.Cond | Condition waiting, broadcasting | Medium | Yes |
| atomic.Int64 | Simple counters | Lowest | Yes |
| atomic.Value | Atomic read/write of any value | Low | Yes |
| atomic.Pointer | CAS operations on pointers | Low | Yes |
| channel | Transferring data ownership | Medium to high | Yes |

### Table 2: sync.Map vs map+Mutex vs ShardedMap

| Item | sync.Map | map + RWMutex | ShardedMap |
|------|----------|---------------|------------|
| Read performance | Very high | High | Very high |
| Write performance | Low to medium | Medium | High |
| Best for | Stable keys, read-heavy | Frequent writes | Many keys, high concurrency |
| Type safety | `any` (type assertion needed) | Type-safe with generics | Type-safe with generics |
| GC pressure | Somewhat high | Low | Low |
| Implementation complexity | Simplest | Simple | Moderate |
| Recommendation | Limited scenarios | Generally recommended | When high performance is needed |

### Table 3: Comparison of Lock Acquisition Strategies

| Strategy | Mechanism | CPU usage | Latency | Use case |
|----------|-----------|-----------|---------|----------|
| Spin lock | Repeated CAS in a loop | High | Low | Short-lived lock holding |
| Mutex (Go) | Spin then semaphore | Adaptive | Medium | General-purpose |
| Channel | Runtime scheduler | Low | Medium to high | Message passing |
| atomic CAS | Single CPU instruction | Lowest | Lowest | Updating a single variable |

---

## 12. Anti-Patterns

### Anti-pattern 1: Copying a Mutex

```go
// BAD: Copying a struct that contains a Mutex
type Counter struct {
    mu sync.Mutex
    n  int
}

func (c Counter) Value() int { // Value receiver → the struct is copied!
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.n
}

// GOOD: Use a pointer receiver
func (c *Counter) Value() int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.n
}

// Detectable by go vet: copies lock value
```

### Anti-pattern 2: Lock Granularity Too Coarse

```go
// BAD: Locking the entire function
func (s *Service) ProcessOrder(order *Order) error {
    s.mu.Lock()
    defer s.mu.Unlock()

    validated := validate(order)        // Does not require the lock
    enriched := enrichData(validated)    // Does not require the lock
    s.orders[order.ID] = enriched       // Only this requires the lock
    return nil
}

// GOOD: Lock only where needed
func (s *Service) ProcessOrder(order *Order) error {
    validated := validate(order)
    enriched := enrichData(validated)

    s.mu.Lock()
    s.orders[order.ID] = enriched
    s.mu.Unlock()
    return nil
}
```

### Anti-pattern 3: Deadlock

```go
// BAD: Deadlock due to inconsistent lock ordering
func transfer(from, to *Account, amount int) {
    from.mu.Lock()   // goroutine1: A → B order
    to.mu.Lock()     // goroutine2: B → A order (deadlock!)
    // ...
}

// GOOD: Enforce a consistent lock order
func transfer(from, to *Account, amount int) {
    // Lock the one with the smaller ID first (consistent order)
    first, second := from, to
    if from.ID > to.ID {
        first, second = to, from
    }
    first.mu.Lock()
    second.mu.Lock()
    defer first.mu.Unlock()
    defer second.mu.Unlock()

    from.Balance -= amount
    to.Balance += amount
}
```

### Anti-pattern 4: Mixing atomic and Mutex

```go
// BAD: Mixing atomic and Mutex on the same data
type Counter struct {
    mu    sync.Mutex
    count int64
}

func (c *Counter) Inc() {
    atomic.AddInt64(&c.count, 1) // Updated with atomic
}

func (c *Counter) Reset() {
    c.mu.Lock() // Protected by Mutex
    c.count = 0
    c.mu.Unlock()
}
// → atomic and Mutex protections conflict, causing potential data races

// GOOD: Use a consistent synchronization mechanism
type Counter struct {
    count atomic.Int64
}

func (c *Counter) Inc()       { c.count.Add(1) }
func (c *Counter) Reset()     { c.count.Store(0) }
func (c *Counter) Value() int64 { return c.count.Load() }
```


---

## Practical Exercises

### Exercise 1: Basic Implementation

Implement code that satisfies the following requirements.

**Requirements:**
- Validate input data
- Implement proper error handling
- Write test code as well

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
        """Main data processing logic"""
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
        assert False, "Should have raised an exception"
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
        """Get statistics"""
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

    print(f"Inefficient version: {slow_time:.4f}s")
    print(f"Efficient version:   {fast_time:.6f}s")
    print(f"Speedup: {slow_time/fast_time:.0f}x")

benchmark()
```

**Key points:**
- Be aware of algorithmic complexity
- Choose appropriate data structures
- Measure the effect with benchmarks

---

## Troubleshooting

### Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| Initialization error | Faulty config file | Check config file path and format |
| Timeout | Network latency / insufficient resources | Adjust timeout values, add retry logic |
| Out of memory | Increasing data volume | Introduce batch processing, implement pagination |
| Permission error | Insufficient access rights | Check the executing user's permissions, review settings |
| Data inconsistency | Concurrent processing conflicts | Introduce locking mechanisms, manage transactions |

### Debugging Steps

1. **Check error messages**: Read the stack trace and identify where the problem occurred
2. **Establish reproduction steps**: Reproduce the error with minimal code
3. **Form hypotheses**: List possible causes
4. **Verify incrementally**: Use logging or a debugger to test hypotheses
5. **Fix and regression test**: After the fix, also test related areas

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
        logger.debug(f"Call: {func.__name__}(args={args}, kwargs={kwargs})")
        try:
            result = func(*args, **kwargs)
            logger.debug(f"Return: {func.__name__} -> {result}")
            return result
        except Exception as e:
            logger.error(f"Exception: {func.__name__}: {e}")
            logger.error(traceback.format_exc())
            raise
    return wrapper

@debug_decorator
def process_data(items):
    """Process data (the debugging target)"""
    if not items:
        raise ValueError("Empty data")
    return [item * 2 for item in items]
```

### Diagnosing Performance Issues

Steps to diagnose performance issues when they occur:

1. **Identify bottlenecks**: Measure with profiling tools
2. **Check memory usage**: Check for memory leaks
3. **Check I/O waits**: Check disk and network I/O status
4. **Check concurrent connection counts**: Check connection pool state

| Problem type | Diagnostic tool | Countermeasure |
|--------------|-----------------|-----------------|
| CPU load | cProfile, py-spy | Improve algorithms, parallelize |
| Memory leak | tracemalloc, objgraph | Properly release references |
| I/O bottleneck | strace, iostat | Async I/O, caching |
| DB latency | EXPLAIN, slow query log | Indexes, query optimization |

---

## Design Decision Guide

### Selection Criteria Matrix

Criteria to consider when making technical choices:

| Criterion | When to prioritize | When it can be compromised |
|-----------|-------------------|----------------------------|
| Performance | Real-time processing, large data | Admin dashboards, batch jobs |
| Maintainability | Long-term operation, team development | Prototypes, short-term projects |
| Scalability | Services expected to grow | Internal tools, fixed user base |
| Security | Personal information, financial data | Public data, internal use |
| Development speed | MVP, time-to-market | Quality-critical, mission-critical |

### Choosing Architecture Patterns

```
┌─────────────────────────────────────────────────┐
│         Architecture Selection Flow              │
├─────────────────────────────────────────────────┤
│                                                 │
│  1. What's the team size?                       │
│    ├─ Small (1-5) → Monolith                    │
│    └─ Large (10+) → Go to 2                     │
│                                                 │
│  2. How often do you deploy?                    │
│    ├─ Weekly or less → Monolith + modular split │
│    └─ Daily / multiple times → Go to 3          │
│                                                 │
│  3. How independent are the teams?              │
│    ├─ Highly → Microservices                    │
│    └─ Moderately → Modular monolith             │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Analyzing Trade-offs

Technical decisions always involve trade-offs. Analyze them from the following perspectives:

**1. Short-term vs long-term cost**
- A fast short-term approach may become technical debt in the long run
- Conversely, over-engineering raises short-term costs and can delay the project

**2. Consistency vs flexibility**
- A unified tech stack has a lower learning curve
- Adopting diverse technologies allows picking the right tool for the job, but increases operational cost

**3. Level of abstraction**
- High abstraction increases reusability, but can make debugging harder
- Low abstraction is intuitive, but code duplication tends to emerge

```python
# Template for recording design decisions
class ArchitectureDecisionRecord:
    """Creating an ADR (Architecture Decision Record)"""

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
        """Output as Markdown"""
        md = f"# ADR: {self.title}\n\n"
        md += f"## Context\n{self.context}\n\n"
        md += f"## Decision\n{self.decision}\n\n"
        md += "## Consequences\n"
        for c in self.consequences:
            icon = "[+]" if c['type'] == 'positive' else "[!]"
            md += f"- {icon} {c['description']}\n"
        md += "\n## Rejected Alternatives\n"
        for a in self.alternatives:
            md += f"- **{a['name']}**: {a['reason_rejected']}\n"
        return md
```
---

## 13. FAQ

### Q1: What happens if the func in sync.Once panics?

`sync.Once` considers the call "done" even if it panics the first time it runs. It will not be called again. In Go 1.21, `sync.OnceFunc`/`sync.OnceValue` were added, making panic re-raising and error handling easier. `OnceFunc` re-raises the same panic on subsequent calls if a panic occurred.

### Q2: Can sync.Pool be used as a cache?

No. Objects in `sync.Pool` can be reclaimed at any time by the GC. Use `map+Mutex` or a dedicated library (such as groupcache) for caches. Pool should be limited to reusing temporary objects (e.g., buffers). By specification, all objects in the pool are reclaimed after two consecutive GC cycles.

### Q3: Which is faster, atomic or Mutex?

For simple integer operations, atomic is orders of magnitude faster (no locking required). Benchmarks show that atomic is more than 5x faster than Mutex under low contention. However, atomic is limited to operations on a single value. A Mutex is required to maintain consistency across multiple fields.

### Q4: Should I use sync.Cond or a channel?

In most cases, a channel is recommended. sync.Cond is advantageous in only three cases: (1) when broadcast notification is needed (similar to channel close, but repeatable), (2) when waiting on complex conditions is required (condition checks inside a for loop), and (3) when integration with existing Mutex-based code is needed.

### Q5: Can go vet or -race detect synchronization problems?

`go vet` finds statically detectable problems such as Mutex copies. `go test -race` enables the data race detector, which detects data races at runtime. However, `-race` only detects races on code paths that are executed, so test coverage matters. In production, `-race` is usually disabled because of its performance penalty (2-10x slowdown).

### Q6: What happens if the same goroutine holds RLock on RWMutex and then calls Lock?

It deadlocks. Go's RWMutex is not reentrant. If the same goroutine calls Lock while holding RLock, it will wait for the RLock to be released—but since the same goroutine is holding it, it will wait forever. This is a design constraint, and you must carefully manage lock acquisition order.

---


## FAQ

### Q1: What is the most important point to focus on when learning this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory, but by actually writing and running code to see how things work.

### Q2: What are common mistakes beginners make?

Skipping the basics and jumping to advanced topics. We recommend solidly understanding the fundamental concepts explained in this guide before moving on to the next step.

### Q3: How is this applied in real-world development?

The knowledge from this topic is frequently applied in day-to-day development work. It becomes especially important during code reviews and architecture design.

---

## Summary

| Concept | Key Points |
|---------|------------|
| Mutex | The basis of exclusive control. Always use defer Unlock() |
| RWMutex | Improves performance for read-heavy workloads. Has writer starvation prevention |
| Once | Safely runs initialization only once. Go 1.21+ adds OnceValue |
| Pool | Reuses temporary objects to reduce GC pressure. Not a cache |
| atomic | Fast lock-free value operations. Supports CAS patterns |
| sync.Map | Concurrency-safe map for specific patterns. In general, prefer map+RWMutex |
| sync.Cond | Condition variable. Use when broadcast notification is needed |
| ShardedMap | Map for large key counts in high-concurrency environments. Independent locks per shard |

---

## Recommended Next Reads

- [02-concurrency-patterns.md](./02-concurrency-patterns.md) -- Concurrency patterns
- [03-context.md](./03-context.md) -- Context
- [../03-tools/02-profiling.md](../03-tools/02-profiling.md) -- Profiling

---

## References

1. **Go Standard Library: sync** -- https://pkg.go.dev/sync
2. **Go Standard Library: sync/atomic** -- https://pkg.go.dev/sync/atomic
3. **Go Memory Model** -- https://go.dev/ref/mem
4. **Go Blog: "Introducing the Go Race Detector"** -- https://go.dev/blog/race-detector
5. **Bryan C. Mills: "Rethinking Classical Concurrency Patterns"** -- GopherCon 2018



===== SOURCE: 02-programming/go-practical-guide/docs/01-concurrency/02-concurrency-patterns.md =====

# Concurrency Patterns -- Fan-out/Fan-in, Pipeline, Worker Pool

> Go's concurrency patterns combine goroutines and channels to build practical concurrent processing through Fan-out/Fan-in, Pipeline, Worker Pool, and Context.

---

## What You Will Learn in This Chapter

1. **Pipeline pattern** -- A processing flow that connects stages via channels
2. **Fan-out / Fan-in** -- Parallel distribution and result aggregation
3. **Worker Pool** -- Concurrent processing with a limited number of goroutines
4. **errgroup / semaphore** -- Concurrency control with error handling
5. **Or-Done / Tee / Bridge** -- Advanced channel composition patterns
6. **Rate Limiter** -- Throughput control patterns
7. **Practical use cases** -- Application examples in production environments


## Prerequisites

Before reading this guide, the following knowledge will help deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts
- Understanding of [Synchronization Primitives -- Mutex, RWMutex, Once, Pool, atomic](./01-sync-primitives.md)

---

## 1. Pipeline Pattern

The Pipeline pattern is a design pattern that divides data processing into multiple stages and connects each stage with channels. Each stage runs in its own goroutine, receives data from an input channel, and sends the processing results to an output channel.

### 1.1 Design Principles of a Pipeline

The basic principles when designing a Pipeline are as follows:

- **Single responsibility**: Each stage is responsible for only one operation
- **Channel ownership**: The goroutine that creates a channel is responsible for closing it
- **Buffering**: Speed differences between stages are absorbed with buffered channels
- **Cancellation support**: Every stage should support cancellation via context

### Code Example 1: Basic Pipeline

```go
package main

import (
	"context"
	"fmt"
)

// generate is a generator stage that sends slice elements to a channel in order
func generate(nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for _, n := range nums {
			out <- n
		}
	}()
	return out
}

// square is a stage that squares the input values and outputs them
func square(in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for n := range in {
			out <- n * n
		}
	}()
	return out
}

// filter is a stage that passes through only values matching the condition
func filter(in <-chan int, predicate func(int) bool) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for n := range in {
			if predicate(n) {
				out <- n
			}
		}
	}()
	return out
}

func main() {
	// Pipeline: generate -> filter(even) -> square -> output
	ch := generate(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
	even := filter(ch, func(n int) bool { return n%2 == 0 })
	out := square(even)

	for v := range out {
		fmt.Println(v) // 4, 16, 36, 64, 100
	}
}
```

### Code Example 2: Context-Aware Pipeline

In production Pipelines, cancellation support is essential. Design every stage to accept a context and respond to cancellation signals.

```go
package main

import (
	"context"
	"fmt"
	"time"
)

// generateWithCtx is a context-aware generator
func generateWithCtx(ctx context.Context, nums ...int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for _, n := range nums {
			select {
			case <-ctx.Done():
				return // Exit immediately on cancellation
			case out <- n:
			}
		}
	}()
	return out
}

// squareWithCtx is a context-aware squaring stage
func squareWithCtx(ctx context.Context, in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for {
			select {
			case <-ctx.Done():
				return
			case n, ok := <-in:
				if !ok {
					return
				}
				select {
				case <-ctx.Done():
					return
				case out <- n * n:
				}
			}
		}
	}()
	return out
}

// accumulate is a stage that accumulates input values
func accumulate(ctx context.Context, in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		sum := 0
		for {
			select {
			case <-ctx.Done():
				return
			case n, ok := <-in:
				if !ok {
					// Send the final result
					select {
					case <-ctx.Done():
					case out <- sum:
					}
					return
				}
				sum += n
			}
		}
	}()
	return out
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	ch := generateWithCtx(ctx, 1, 2, 3, 4, 5)
	squared := squareWithCtx(ctx, ch)
	result := accumulate(ctx, squared)

	for v := range result {
		fmt.Println("Sum of squares:", v) // 55
	}
}
```

### Code Example 3: Batch Processing Pipeline

When processing large amounts of data, improve throughput by using batch processing instead of per-item processing.

```go
package main

import (
	"context"
	"fmt"
)

// batch is a stage that groups input channel values into batches of a given size
func batch(ctx context.Context, in <-chan int, size int) <-chan []int {
	out := make(chan []int)
	go func() {
		defer close(out)
		buf := make([]int, 0, size)
		for {
			select {
			case <-ctx.Done():
				return
			case v, ok := <-in:
				if !ok {
					// Send the remaining buffer
					if len(buf) > 0 {
						select {
						case <-ctx.Done():
						case out <- buf:
						}
					}
					return
				}
				buf = append(buf, v)
				if len(buf) >= size {
					// Send a copy of the buffer (the original slice will be reused)
					batch := make([]int, len(buf))
					copy(batch, buf)
					select {
					case <-ctx.Done():
						return
					case out <- batch:
					}
					buf = buf[:0]
				}
			}
		}
	}()
	return out
}

// processBatch is a stage that processes data in batch units
func processBatch(ctx context.Context, in <-chan []int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for {
			select {
			case <-ctx.Done():
				return
			case items, ok := <-in:
				if !ok {
					return
				}
				// Calculate the sum within the batch
				sum := 0
				for _, v := range items {
					sum += v
				}
				select {
				case <-ctx.Done():
					return
				case out <- sum:
				}
			}
		}
	}()
	return out
}

func main() {
	ctx := context.Background()

	// Generate numbers from 1 to 100
	gen := func() <-chan int {
		ch := make(chan int)
		go func() {
			defer close(ch)
			for i := 1; i <= 100; i++ {
				ch <- i
			}
		}()
		return ch
	}

	// Pipeline: generate -> batch (10 at a time) -> batch processing
	numbers := gen()
	batched := batch(ctx, numbers, 10)
	results := processBatch(ctx, batched)

	for sum := range results {
		fmt.Println("Batch sum:", sum)
	}
}
```

---

## 2. Fan-out / Fan-in

Fan-out is a pattern that distributes work from a single input channel across multiple workers. Fan-in is a pattern that merges outputs from multiple channels into a single channel. By combining these, you can efficiently parallelize CPU-bound or I/O-bound processing.

### 2.1 Criteria for Applying Fan-out / Fan-in

Cases where Fan-out/Fan-in is effective include:

- When each operation is independent and order does not matter
- When you want to parallelize I/O-bound operations (API calls, DB queries, etc.)
- When you want to distribute CPU-bound operations across multiple cores

### Code Example 4: Basic Fan-out / Fan-in Implementation

```go
package main

import (
	"context"
	"fmt"
	"math/rand"
	"sync"
	"time"
)

// fanOut distributes work from the input channel to multiple workers
func fanOut(ctx context.Context, in <-chan int, workers int) []<-chan int {
	channels := make([]<-chan int, workers)
	for i := 0; i < workers; i++ {
		channels[i] = worker(ctx, in, i)
	}
	return channels
}

// worker is an individual worker goroutine
func worker(ctx context.Context, in <-chan int, id int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for {
			select {
			case <-ctx.Done():
				return
			case n, ok := <-in:
				if !ok {
					return
				}
				// Simulate heavy processing
				time.Sleep(time.Duration(rand.Intn(100)) * time.Millisecond)
				result := n * n
				select {
				case <-ctx.Done():
					return
				case out <- result:
				}
			}
		}
	}()
	return out
}

// fanIn merges multiple channels into one
func fanIn(ctx context.Context, channels ...<-chan int) <-chan int {
	var wg sync.WaitGroup
	merged := make(chan int)

	// Start a goroutine that forwards values from each input channel to the merged channel
	for _, ch := range channels {
		wg.Add(1)
		go func(c <-chan int) {
			defer wg.Done()
			for {
				select {
				case <-ctx.Done():
					return
				case v, ok := <-c:
					if !ok {
						return
					}
					select {
					case <-ctx.Done():
						return
					case merged <- v:
					}
				}
			}
		}(ch)
	}

	// Close the merged channel after all workers complete
	go func() {
		wg.Wait()
		close(merged)
	}()

	return merged
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Generate input data
	input := make(chan int)
	go func() {
		defer close(input)
		for i := 1; i <= 20; i++ {
			select {
			case <-ctx.Done():
				return
			case input <- i:
			}
		}
	}()

	// Fan-out: distribute across 4 workers
	workers := fanOut(ctx, input, 4)

	// Fan-in: merge the results
	results := fanIn(ctx, workers...)

	// Collect the results
	for result := range results {
		fmt.Println("Result:", result)
	}
}
```

### Code Example 5: Order-Preserving Fan-out / Fan-in

Normal Fan-out/Fan-in does not guarantee the order of results. When order must be preserved, attach an index.

```go
package main

import (
	"context"
	"fmt"
	"sort"
	"sync"
	"time"
)

// IndexedItem is an indexed data item
type IndexedItem struct {
	Index  int
	Value  int
	Result int
}

// orderedFanOut is a Fan-out that preserves ordering information
func orderedFanOut(ctx context.Context, items []int, workers int) <-chan IndexedItem {
	input := make(chan IndexedItem, len(items))
	go func() {
		defer close(input)
		for i, v := range items {
			select {
			case <-ctx.Done():
				return
			case input <- IndexedItem{Index: i, Value: v}:
			}
		}
	}()

	// Output channel for each worker
	outputs := make([]<-chan IndexedItem, workers)
	for w := 0; w < workers; w++ {
		out := make(chan IndexedItem)
		outputs[w] = out
		go func() {
			defer close(out)
			for item := range input {
				select {
				case <-ctx.Done():
					return
				default:
					// Simulate heavy processing
					time.Sleep(10 * time.Millisecond)
					item.Result = item.Value * item.Value
					select {
					case <-ctx.Done():
						return
					case out <- item:
					}
				}
			}
		}()
	}

	// Fan-in
	merged := make(chan IndexedItem)
	var wg sync.WaitGroup
	for _, ch := range outputs {
		wg.Add(1)
		go func(c <-chan IndexedItem) {
			defer wg.Done()
			for item := range c {
				select {
				case <-ctx.Done():
					return
				case merged <- item:
				}
			}
		}(ch)
	}
	go func() {
		wg.Wait()
		close(merged)
	}()

	return merged
}

func main() {
	ctx := context.Background()
	items := []int{10, 20, 30, 40, 50, 60, 70, 80, 90, 100}

	results := make([]IndexedItem, 0, len(items))
	for item := range orderedFanOut(ctx, items, 4) {
		results = append(results, item)
	}

	// Sort by index to restore the original order
	sort.Slice(results, func(i, j int) bool {
		return results[i].Index < results[j].Index
	})

	for _, r := range results {
		fmt.Printf("Index=%d, Value=%d, Result=%d\n", r.Index, r.Value, r.Result)
	}
}
```

---

## 3. Worker Pool

The Worker Pool pattern pre-starts a fixed number of goroutines (workers) and has them retrieve tasks from a job queue for processing. It prevents unbounded goroutine creation and allows you to control resource usage.

### 3.1 Worker Pool Design Guidelines

- **Number of workers**: For CPU-bound work, use `runtime.NumCPU()`; for I/O-bound work, match the constraints of external resources
- **Job queue**: Control backpressure with a buffered channel
- **Result channel**: Aggregate processing results from workers
- **Error handling**: Handle errors on a per-job basis

### Code Example 6: Generic Worker Pool

```go
package main

import (
	"context"
	"fmt"
	"log"
	"sync"
	"time"
)

// Job represents a task to be processed
type Job struct {
	ID      int
	Payload string
}

// Result represents a processing result
type Result struct {
	JobID    int
	Output   string
	Duration time.Duration
	Err      error
}

// WorkerPool is a pool that processes jobs with a fixed number of workers
type WorkerPool struct {
	numWorkers int
	jobs       chan Job
	results    chan Result
	wg         sync.WaitGroup
}

// NewWorkerPool creates a new WorkerPool
func NewWorkerPool(numWorkers, jobBufferSize int) *WorkerPool {
	return &WorkerPool{
		numWorkers: numWorkers,
		jobs:       make(chan Job, jobBufferSize),
		results:    make(chan Result, jobBufferSize),
	}
}

// Start launches the workers
func (wp *WorkerPool) Start(ctx context.Context) {
	for i := 0; i < wp.numWorkers; i++ {
		wp.wg.Add(1)
		go wp.runWorker(ctx, i)
	}

	// Close the results channel after all workers finish
	go func() {
		wp.wg.Wait()
		close(wp.results)
	}()
}

// runWorker is the processing loop for an individual worker
func (wp *WorkerPool) runWorker(ctx context.Context, id int) {
	defer wp.wg.Done()
	for {
		select {
		case <-ctx.Done():
			log.Printf("Worker %d: shutting down (context cancelled)", id)
			return
		case job, ok := <-wp.jobs:
			if !ok {
				log.Printf("Worker %d: no more jobs", id)
				return
			}
			start := time.Now()
			output, err := processJob(ctx, job)
			wp.results <- Result{
				JobID:    job.ID,
				Output:   output,
				Duration: time.Since(start),
				Err:      err,
			}
		}
	}
}

// Submit adds a job to the queue
func (wp *WorkerPool) Submit(job Job) {
	wp.jobs <- job
}

// Close closes the job queue (stops accepting new jobs)
func (wp *WorkerPool) Close() {
	close(wp.jobs)
}

// Results returns the results channel
func (wp *WorkerPool) Results() <-chan Result {
	return wp.results
}

// processJob is the processing logic for an individual job
func processJob(ctx context.Context, job Job) (string, error) {
	// Simulate processing
	select {
	case <-ctx.Done():
		return "", ctx.Err()
	case <-time.After(50 * time.Millisecond):
		return fmt.Sprintf("Processed: %s", job.Payload), nil
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	pool := NewWorkerPool(5, 100)
	pool.Start(ctx)

	// Submit jobs
	go func() {
		for i := 0; i < 50; i++ {
			pool.Submit(Job{ID: i, Payload: fmt.Sprintf("task-%d", i)})
		}
		pool.Close()
	}()

	// Collect results
	successCount := 0
	errorCount := 0
	for result := range pool.Results() {
		if result.Err != nil {
			errorCount++
			log.Printf("Job %d failed: %v", result.JobID, result.Err)
		} else {
			successCount++
		}
	}

	fmt.Printf("Completed: %d success, %d errors\n", successCount, errorCount)
}
```

### Code Example 7: Dynamically Scaling Worker Pool

A Worker Pool that dynamically adjusts the number of workers based on load.

```go
package main

import (
	"context"
	"fmt"
	"log"
	"sync"
	"sync/atomic"
	"time"
)

// DynamicPool is a WorkerPool that scales dynamically
type DynamicPool struct {
	minWorkers  int
	maxWorkers  int
	activeCount int64
	jobs        chan func()
	wg          sync.WaitGroup
	mu          sync.Mutex
	workerCount int
}

// NewDynamicPool creates a dynamic pool
func NewDynamicPool(minWorkers, maxWorkers, queueSize int) *DynamicPool {
	dp := &DynamicPool{
		minWorkers: minWorkers,
		maxWorkers: maxWorkers,
		jobs:       make(chan func(), queueSize),
	}
	return dp
}

// Start launches the pool with the minimum number of workers
func (dp *DynamicPool) Start(ctx context.Context) {
	for i := 0; i < dp.minWorkers; i++ {
		dp.addWorker(ctx)
	}

	// Load monitoring goroutine
	go dp.monitor(ctx)
}

// addWorker adds one worker
func (dp *DynamicPool) addWorker(ctx context.Context) {
	dp.mu.Lock()
	dp.workerCount++
	dp.mu.Unlock()

	dp.wg.Add(1)
	go func() {
		defer dp.wg.Done()
		defer func() {
			dp.mu.Lock()
			dp.workerCount--
			dp.mu.Unlock()
		}()

		for {
			select {
			case <-ctx.Done():
				return
			case job, ok := <-dp.jobs:
				if !ok {
					return
				}
				atomic.AddInt64(&dp.activeCount, 1)
				job()
				atomic.AddInt64(&dp.activeCount, -1)
			}
		}
	}()
}

// monitor watches the load and adjusts the number of workers
func (dp *DynamicPool) monitor(ctx context.Context) {
	ticker := time.NewTicker(500 * time.Millisecond)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			queueLen := len(dp.jobs)
			active := atomic.LoadInt64(&dp.activeCount)
			dp.mu.Lock()
			current := dp.workerCount
			dp.mu.Unlock()

			// Add workers if the queue is about to overflow
			if queueLen > current && current < dp.maxWorkers {
				toAdd := min(dp.maxWorkers-current, queueLen-current)
				for i := 0; i < toAdd; i++ {
					dp.addWorker(ctx)
				}
				log.Printf("Scaled up: %d -> %d workers (queue=%d, active=%d)",
					current, current+toAdd, queueLen, active)
			}
		}
	}
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}

// Submit submits a job
func (dp *DynamicPool) Submit(job func()) {
	dp.jobs <- job
}

// Shutdown shuts down the pool
func (dp *DynamicPool) Shutdown() {
	close(dp.jobs)
	dp.wg.Wait()
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	pool := NewDynamicPool(2, 10, 100)
	pool.Start(ctx)

	var completed int64

	// Submit a large number of jobs all at once
	for i := 0; i < 200; i++ {
		i := i
		pool.Submit(func() {
			time.Sleep(10 * time.Millisecond)
			atomic.AddInt64(&completed, 1)
			if i%50 == 0 {
				log.Printf("Progress: job %d completed", i)
			}
		})
	}

	pool.Shutdown()
	fmt.Printf("All %d jobs completed\n", atomic.LoadInt64(&completed))
}
```

---

## 4. Concurrent Processing with errgroup

`golang.org/x/sync/errgroup` is a package that integrates waiting for multiple goroutines to complete with error handling. It replaces `sync.WaitGroup` and automates error propagation and context cancellation.

### Code Example 8: Basic errgroup Pattern

```go
package main

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"time"

	"golang.org/x/sync/errgroup"
)

// fetchURL retrieves content from a URL
func fetchURL(ctx context.Context, url string) (string, error) {
	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return "", fmt.Errorf("create request: %w", err)
	}

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("fetch %s: %w", url, err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("read body: %w", err)
	}
	return string(body), nil
}

// fetchAll fetches multiple URLs concurrently
func fetchAll(ctx context.Context, urls []string) ([]string, error) {
	g, ctx := errgroup.WithContext(ctx)
	results := make([]string, len(urls))

	for i, url := range urls {
		i, url := i, url // Loop variable capture
		g.Go(func() error {
			body, err := fetchURL(ctx, url)
			if err != nil {
				return err // A single error cancels the whole group
			}
			results[i] = body
			return nil
		})
	}

	if err := g.Wait(); err != nil {
		return nil, err
	}
	return results, nil
}

func main() {
	ctx := context.Background()
	urls := []string{
		"https://httpbin.org/get",
		"https://httpbin.org/headers",
		"https://httpbin.org/ip",
	}

	results, err := fetchAll(ctx, urls)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}

	for i, r := range results {
		fmt.Printf("URL %d: %d bytes\n", i, len(r))
	}
}
```

### Code Example 9: Limiting Concurrency with errgroup.SetLimit

```go
package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"golang.org/x/sync/errgroup"
)

// Task represents a processing task
type Task struct {
	ID   int
	Name string
}

// processTask processes an individual task
func processTask(ctx context.Context, task Task) error {
	log.Printf("Start task %d: %s", task.ID, task.Name)

	select {
	case <-ctx.Done():
		return ctx.Err()
	case <-time.After(100 * time.Millisecond):
		log.Printf("Done task %d: %s", task.ID, task.Name)
		return nil
	}
}

func main() {
	ctx := context.Background()

	tasks := make([]Task, 50)
	for i := range tasks {
		tasks[i] = Task{ID: i, Name: fmt.Sprintf("task-%d", i)}
	}

	g, ctx := errgroup.WithContext(ctx)
	g.SetLimit(5) // Limit concurrency to 5

	for _, task := range tasks {
		task := task
		g.Go(func() error {
			return processTask(ctx, task)
		})
	}

	if err := g.Wait(); err != nil {
		log.Fatalf("Error: %v", err)
	}
	fmt.Println("All tasks completed")
}
```

### Code Example 10: Non-Blocking Submission with errgroup.TryGo

```go
package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"golang.org/x/sync/errgroup"
)

func main() {
	ctx := context.Background()
	g, ctx := errgroup.WithContext(ctx)
	g.SetLimit(3) // Up to 3 concurrent executions

	submitted := 0
	dropped := 0

	for i := 0; i < 20; i++ {
		i := i
		// TryGo returns false if the limit has been reached (does not block)
		if g.TryGo(func() error {
			log.Printf("Processing task %d", i)
			time.Sleep(100 * time.Millisecond)
			return nil
		}) {
			submitted++
		} else {
			dropped++
			log.Printf("Task %d dropped (pool full)", i)
		}
	}

	if err := g.Wait(); err != nil {
		log.Fatalf("Error: %v", err)
	}

	fmt.Printf("Submitted: %d, Dropped: %d\n", submitted, dropped)
}
```

---

## 5. Semaphore Pattern

The semaphore pattern is a simple pattern that uses a buffered channel to limit concurrency. It is lighter-weight than errgroup's SetLimit and allows for fine-grained control.

### Code Example 11: Basic Semaphore

```go
package main

import (
	"fmt"
	"sync"
	"time"
)

// Item is an item to be processed
type Item struct {
	ID   int
	Data string
}

func processWithLimit(items []Item, maxConcurrency int) {
	sem := make(chan struct{}, maxConcurrency)
	var wg sync.WaitGroup

	for _, item := range items {
		wg.Add(1)
		sem <- struct{}{} // Acquire the semaphore (blocks if full)
		go func(it Item) {
			defer wg.Done()
			defer func() { <-sem }() // Release the semaphore
			process(it)
		}(item)
	}
	wg.Wait()
}

func process(item Item) {
	time.Sleep(50 * time.Millisecond) // Simulate processing
	fmt.Printf("Processed: %d\n", item.ID)
}

func main() {
	items := make([]Item, 100)
	for i := range items {
		items[i] = Item{ID: i, Data: fmt.Sprintf("data-%d", i)}
	}

	start := time.Now()
	processWithLimit(items, 10) // Max 10 concurrent
	fmt.Printf("Elapsed: %v\n", time.Since(start))
}
```

### Code Example 12: Using golang.org/x/sync/semaphore

The standard extension library's `semaphore` package provides a weighted semaphore.

```go
package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"golang.org/x/sync/semaphore"
)

func main() {
	ctx := context.Background()

	// Weighted semaphore (total weight of 10)
	sem := semaphore.NewWeighted(10)

	type Task struct {
		Name   string
		Weight int64 // Resource consumption
	}

	tasks := []Task{
		{"light-1", 1},
		{"light-2", 1},
		{"medium-1", 3},
		{"heavy-1", 5},
		{"medium-2", 3},
		{"light-3", 1},
		{"heavy-2", 5},
		{"light-4", 1},
	}

	for _, task := range tasks {
		task := task

		// Acquire the semaphore according to the task's weight
		if err := sem.Acquire(ctx, task.Weight); err != nil {
			log.Printf("Failed to acquire semaphore for %s: %v", task.Name, err)
			continue
		}

		go func() {
			defer sem.Release(task.Weight)
			log.Printf("Start: %s (weight=%d)", task.Name, task.Weight)
			time.Sleep(100 * time.Millisecond)
			log.Printf("Done: %s", task.Name)
		}()
	}

	// Wait for all tasks to complete (acquire the full weight of the semaphore)
	if err := sem.Acquire(ctx, 10); err != nil {
		log.Fatal(err)
	}
	fmt.Println("All tasks completed")
}
```

---

## 6. Or-Done Pattern

The Or-Done pattern is a helper that handles channel reads and cancellation at the same time. It eliminates the verbosity of select statements.

### Code Example 13: Or-Done Channel

```go
package main

import (
	"context"
	"fmt"
)

// orDone reads from a channel while respecting context cancellation
func orDone(ctx context.Context, in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for {
			select {
			case <-ctx.Done():
				return
			case v, ok := <-in:
				if !ok {
					return
				}
				select {
				case <-ctx.Done():
					return
				case out <- v:
				}
			}
		}
	}()
	return out
}

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Channel that generates values infinitely
	infinite := make(chan int)
	go func() {
		defer close(infinite)
		for i := 0; ; i++ {
			select {
			case <-ctx.Done():
				return
			case infinite <- i:
			}
		}
	}()

	// Take only the first 10 values
	count := 0
	for v := range orDone(ctx, infinite) {
		fmt.Println(v)
		count++
		if count >= 10 {
			cancel()
			break
		}
	}
}
```

---

## 7. Tee Pattern

The Tee pattern is a pattern that distributes values from a single channel to two channels. It uses the same concept as the Unix tee command and is used when you want to send the same data to two different processing pipelines.

### Code Example 14: Tee Channel

```go
package main

import (
	"context"
	"fmt"
)

// tee duplicates values from the input channel to two output channels
func tee(ctx context.Context, in <-chan int) (<-chan int, <-chan int) {
	out1 := make(chan int)
	out2 := make(chan int)

	go func() {
		defer close(out1)
		defer close(out2)
		for {
			select {
			case <-ctx.Done():
				return
			case v, ok := <-in:
				if !ok {
					return
				}
				// Send to both output channels (protected by local variables)
				ch1, ch2 := out1, out2
				for i := 0; i < 2; i++ {
					select {
					case <-ctx.Done():
						return
					case ch1 <- v:
						ch1 = nil // Nil out after sending to block further sends
					case ch2 <- v:
						ch2 = nil
					}
				}
			}
		}
	}()

	return out1, out2
}

func main() {
	ctx := context.Background()

	// Generate data
	input := make(chan int)
	go func() {
		defer close(input)
		for i := 1; i <= 5; i++ {
			input <- i
		}
	}()

	// Branch with Tee
	ch1, ch2 := tee(ctx, input)

	// Two processing pipelines
	done := make(chan struct{})
	go func() {
		defer close(done)
		for v := range ch1 {
			fmt.Printf("Pipeline A: %d * 2 = %d\n", v, v*2)
		}
	}()

	for v := range ch2 {
		fmt.Printf("Pipeline B: %d ^ 2 = %d\n", v, v*v)
	}

	<-done
}
```

---

## 8. Bridge Pattern

The Bridge pattern is a pattern that flattens a "channel of channels" (`<-chan <-chan T`) into a single channel. It is useful when dynamically adding or switching between multiple data sources.

### Code Example 15: Bridge Channel

```go
package main

import (
	"context"
	"fmt"
)

// bridge flattens a channel of channels into a single channel
func bridge(ctx context.Context, chanStream <-chan <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		defer close(out)
		for {
			var stream <-chan int
			select {
			case <-ctx.Done():
				return
			case maybeStream, ok := <-chanStream:
				if !ok {
					return
				}
				stream = maybeStream
			}

			for {
				select {
				case <-ctx.Done():
					return
				case v, ok := <-stream:
					if !ok {
						break // Move to the next stream
					}
					select {
					case <-ctx.Done():
						return
					case out <- v:
					}
					continue
				}
				break
			}
		}
	}()
	return out
}

// genRange generates a channel for the range from start to end
func genRange(start, end int) <-chan int {
	ch := make(chan int)
	go func() {
		defer close(ch)
		for i := start; i <= end; i++ {
			ch <- i
		}
	}()
	return ch
}

func main() {
	ctx := context.Background()

	// Generate a channel of channels
	chanStream := make(chan (<-chan int))
	go func() {
		defer close(chanStream)
		chanStream <- genRange(1, 3)
		chanStream <- genRange(10, 13)
		chanStream <- genRange(100, 102)
	}()

	// Flatten with Bridge
	for v := range bridge(ctx, chanStream) {
		fmt.Println(v) // 1, 2, 3, 10, 11, 12, 13, 100, 101, 102
	}
}
```

---

## 9. Rate Limiter Pattern

The Rate Limiter pattern is a pattern that limits processing throughput to a constant rate. It is used for limiting API calls and preventing resource overload.

### Code Example 16: time.Ticker-Based Rate Limiter

```go
package main

import (
	"context"
	"fmt"
	"log"
	"time"
)

// RateLimiter is a token bucket rate limiter
type RateLimiter struct {
	ticker *time.Ticker
	tokens chan struct{}
}

// NewRateLimiter creates a limiter with the specified rate
func NewRateLimiter(rate int, burst int) *RateLimiter {
	rl := &RateLimiter{
		ticker: time.NewTicker(time.Second / time.Duration(rate)),
		tokens: make(chan struct{}, burst),
	}

	// Inject initial tokens equal to the burst size
	for i := 0; i < burst; i++ {
		rl.tokens <- struct{}{}
	}

	// Replenish tokens periodically
	go func() {
		for range rl.ticker.C {
			select {
			case rl.tokens <- struct{}{}:
			default: // Discard if the bucket is full
			}
		}
	}()

	return rl
}

// Wait waits until a token becomes available
func (rl *RateLimiter) Wait(ctx context.Context) error {
	select {
	case <-ctx.Done():
		return ctx.Err()
	case <-rl.tokens:
		return nil
	}
}

// Stop stops the limiter
func (rl *RateLimiter) Stop() {
	rl.ticker.Stop()
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// 5 requests per second, burst of 10
	limiter := NewRateLimiter(5, 10)
	defer limiter.Stop()

	for i := 0; i < 30; i++ {
		if err := limiter.Wait(ctx); err != nil {
			log.Printf("Rate limiter error: %v", err)
			break
		}
		fmt.Printf("[%s] Request %d\n", time.Now().Format("15:04:05.000"), i)
	}
}
```

### Code Example 17: Using golang.org/x/time/rate

```go
package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"golang.org/x/time/rate"
)

func main() {
	ctx := context.Background()

	// 10 events per second, burst of 3
	limiter := rate.NewLimiter(rate.Limit(10), 3)

	// Wait: blocks until a token becomes available
	for i := 0; i < 20; i++ {
		if err := limiter.Wait(ctx); err != nil {
			log.Fatal(err)
		}
		fmt.Printf("[%s] Event %d\n", time.Now().Format("15:04:05.000"), i)
	}

	// Allow: non-blocking (returns true/false immediately)
	fmt.Println("\n--- Allow (non-blocking) ---")
	for i := 0; i < 10; i++ {
		if limiter.Allow() {
			fmt.Printf("Event %d: allowed\n", i)
		} else {
			fmt.Printf("Event %d: rate limited\n", i)
		}
	}

	// Reserve: token reservation (retrieves the wait time)
	fmt.Println("\n--- Reserve ---")
	r := limiter.Reserve()
	if r.OK() {
		fmt.Printf("Delay: %v\n", r.Delay())
		time.Sleep(r.Delay())
		fmt.Println("Executed after delay")
	}
}
```

---

## 10. ASCII Diagrams

### Figure 1: Pipeline Pattern

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ generate │───>│ filter   │───>│ square   │───>│ consumer │
│  ch out  │    │ ch in/out│    │ ch in/out│    │  ch in   │
└──────────┘    └──────────┘    └──────────┘    └──────────┘

Data flow:
  [1,2,3,4,5] → [2,4] → [4,16] → print
```

### Figure 2: Fan-out / Fan-in

```
                    Fan-out              Fan-in
               ┌──> Worker1 ──┐
               │              │
Input ─────────┼──> Worker2 ──┼──────> Output
               │              │
               └──> Worker3 ──┘

  Input ch ──┬──> [Worker 1] ──┐
             ├──> [Worker 2] ──┼──> Merged ch
             └──> [Worker 3] ──┘
```

### Figure 3: Worker Pool

```
┌─────────────────────────────────────────┐
│              Worker Pool                 │
│                                          │
│  Jobs Queue    Workers        Results    │
│  ┌─────────┐  ┌──────────┐  ┌────────┐ │
│  │ Job 1   │  │ Worker 1 │  │ Res 1  │ │
│  │ Job 2   │──>│ Worker 2 │──>│ Res 2 │ │
│  │ Job 3   │  │ Worker 3 │  │ Res 3  │ │
│  │ ...     │  └──────────┘  │ ...    │ │
│  └─────────┘  (fixed count) └────────┘ │
│                                          │
│  Concurrency = Number of Workers (controllable) │
└─────────────────────────────────────────┘
```

### Figure 4: Or-Done Pattern

```
Normal channel read:            Or-Done pattern:

for v := range ch {             for v := range orDone(ctx, ch) {
    // No ctx cancel support       // Automatic ctx cancel support
    process(v)                      process(v)
}                               }

[!] Does not watch ctx.Done()   [OK] Automatically checks ctx.Done()
```

### Figure 5: Tee Pattern

```
                    ┌──> Pipeline A (ch1)
                    │
  Input ── Tee ─────┤
                    │
                    └──> Pipeline B (ch2)

  Distributes the same data to two independent processes
```

### Figure 6: Bridge Pattern

```
  Chan of Chans:
  ┌────────────────────────────────────────┐
  │ chanStream: <-chan (<-chan int)         │
  │                                        │
  │  ┌──── [1, 2, 3] ────┐                │
  │  ├──── [10, 11, 12] ──┤  → Bridge →  [1, 2, 3, 10, 11, 12, 100, 101]
  │  └──── [100, 101] ────┘                │
  │                                        │
  └────────────────────────────────────────┘
```

### Figure 7: Rate Limiter (Token Bucket)

```
  ┌─────────────────────────────────┐
  │       Token Bucket              │
  │                                 │
  │  Bucket capacity = Burst Size   │
  │  ┌────────────────────────┐    │
  │  │ O O O O O _ _ _ _ _    │    │  O = token
  │  │ 5/10 tokens remaining  │    │  _ = empty slot
  │  └────────────────────────┘    │
  │       ↑              ↓         │
  │   Refill tokens  Consume tokens │
  │   at Rate(r/s)   on request     │
  └─────────────────────────────────┘
```

---

## 11. Comparison Tables

### Table 1: Comparison of Concurrency Patterns

| Pattern | Use Case | Complexity | Goroutine Count | Cancellation Support |
|---------|----------|------------|-----------------|----------------------|
| Pipeline | Serial data processing | Low | One per stage | select in each stage |
| Fan-out/Fan-in | Parallel distributed processing | Medium | One per worker | context propagation |
| Worker Pool | Limited parallel processing | Medium | Fixed (configurable) | context + jobs close |
| errgroup | Parallel with error handling | Low | One per task | Automatic (WithContext) |
| Semaphore | Concurrency limit | Low | Per task (limited) | Pass context |
| Or-Done | Cancellable reads | Low | 1 | Built-in |
| Tee | Channel distribution | Low | 1 | Context-aware |
| Bridge | Channel flattening | Medium | 1 | Context-aware |
| Rate Limiter | Throughput control | Medium | 1-2 | context/Timer |
| Pipeline + Cancel | Cancellable processing | High | One per stage | All stages |

### Table 2: errgroup vs WaitGroup vs Semaphore

| Item | errgroup | sync.WaitGroup | Semaphore |
|------|----------|----------------|-----------|
| Error propagation | Returns the first error | None | None |
| Cancellation | Automatic via context integration | Manual | Manual |
| Concurrency limit | `SetLimit(n)` | Not available (implement separately) | Buffer size |
| Non-blocking submission | `TryGo()` | Not available | `TryAcquire` |
| Package | `golang.org/x/sync` | Standard `sync` | channel or `x/sync` |
| Return value | `error` | None | None |
| Weighted | Not available | Not available | `semaphore.Weighted` |
| Use case | Concurrent processing with errors | Simple completion wait | Resource limiting |

### Table 3: Comparison of Rate Limiter Implementations

| Implementation | Package | Algorithm | Burst | Distributed Support |
|----------------|---------|-----------|-------|---------------------|
| time.Ticker | Standard | Fixed rate | No | No |
| Buffered channel | Standard | Token bucket | Yes | No |
| rate.Limiter | `x/time/rate` | Token bucket | Yes | No |
| Redis + Lua | redis-go | Sliding window | Yes | Yes |
| leaky bucket | Custom | Leaky bucket | No | No |

### Table 4: Pattern Selection Flowchart

| Requirement | Recommended Pattern |
|-------------|---------------------|
| Transform data in sequence | Pipeline |
| Parallelize the same operation | Fan-out/Fan-in |
| Limit the number of goroutines | Worker Pool / Semaphore |
| Stop everything on error | errgroup |
| Limit API call frequency | Rate Limiter |
| Distribute one input to many | Tee |
| Read from multiple sources sequentially | Bridge |
| Cancellable reads | Or-Done |

---

## 12. Anti-Patterns

### Anti-Pattern 1: Unbounded Goroutine Creation

```go
// BAD: spawns an unlimited number of goroutines per request
func handler(w http.ResponseWriter, r *http.Request) {
	for _, item := range getItems() { // 100,000 items
		go process(item) // goroutine explosion, OOM
	}
}

// GOOD: limit with a Worker Pool
func handler(w http.ResponseWriter, r *http.Request) {
	items := getItems()
	sem := make(chan struct{}, 100) // Max 100 concurrent
	var wg sync.WaitGroup
	for _, item := range items {
		wg.Add(1)
		sem <- struct{}{}
		go func(it Item) {
			defer wg.Done()
			defer func() { <-sem }()
			process(it)
		}(item)
	}
	wg.Wait()
}
```

### Anti-Pattern 2: Forgetting to Close a Channel

```go
// BAD: not closing the channel -> receiver blocks forever on range
func produce(ch chan<- int) {
	for i := 0; i < 10; i++ {
		ch <- i
	}
	// close(ch) is missing
}

// GOOD: ensure close with defer
func produce(ch chan<- int) {
	defer close(ch)
	for i := 0; i < 10; i++ {
		ch <- i
	}
}
```

### Anti-Pattern 3: Asymmetric Close Between Send and Receive

```go
// BAD: closing the channel on the receiving side
func consumer(ch <-chan int) {
	for v := range ch {
		process(v)
	}
	close(ch) // Compile error (cannot close a receive-only channel)
}

// BAD: closing the same channel from multiple goroutines
func multipleProducers(ch chan<- int) {
	for i := 0; i < 3; i++ {
		go func(id int) {
			ch <- id
			close(ch) // panic: close of closed channel
		}(i)
	}
}

// GOOD: a single owner is responsible for closing
func multipleProducers(ch chan<- int) {
	var wg sync.WaitGroup
	for i := 0; i < 3; i++ {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			ch <- id
		}(i)
	}
	go func() {
		wg.Wait()
		close(ch) // Close only once after the WaitGroup completes
	}()
}
```

### Anti-Pattern 4: Busy-Wait in a select Statement

```go
// BAD: busy-wait via the default branch
func waitForResult(ch <-chan int) int {
	for {
		select {
		case v := <-ch:
			return v
		default:
			// A busy loop that consumes 100% CPU
		}
	}
}

// GOOD: block without a default branch (or use time.After for timeout)
func waitForResult(ch <-chan int, timeout time.Duration) (int, error) {
	select {
	case v := <-ch:
		return v, nil
	case <-time.After(timeout):
		return 0, fmt.Errorf("timeout waiting for result")
	}
}
```

### Anti-Pattern 5: Goroutine Leak

```go
// BAD: a goroutine sending to a channel with no receiver leaks
func leakyFunction() <-chan int {
	ch := make(chan int)
	go func() {
		result := heavyComputation()
		ch <- result // If no receiver exists, blocks forever -> goroutine leak
	}()
	return ch
}

// When the caller discards the result
func caller() {
	_ = leakyFunction() // Discarding the channel -> goroutine leaks forever
}

// GOOD: make it cancellable with a context
func safeFunction(ctx context.Context) <-chan int {
	ch := make(chan int, 1) // Buffer of 1 so the sender does not block
	go func() {
		result := heavyComputation()
		select {
		case <-ctx.Done():
			return // Exit if cancelled
		case ch <- result:
		}
	}()
	return ch
}
```

---

## 13. Practical Use Cases

### Use Case 1: Image Processing Pipeline

```go
package main

import (
	"context"
	"fmt"
	"log"
	"sync"
	"time"
)

// Image is an image to be processed
type Image struct {
	ID       int
	Filename string
	Data     []byte
	Width    int
	Height   int
}

// ProcessedImage is a processed image
type ProcessedImage struct {
	Original  Image
	Thumbnail []byte
	Optimized []byte
	Duration  time.Duration
}

// download is a stage that downloads images
func download(ctx context.Context, urls <-chan string) <-chan Image {
	out := make(chan Image)
	go func() {
		defer close(out)
		id := 0
		for url := range urls {
			select {
			case <-ctx.Done():
				return
			default:
				// Download processing (simulated)
				time.Sleep(20 * time.Millisecond)
				img := Image{
					ID:       id,
					Filename: url,
					Data:     make([]byte, 1024),
					Width:    1920,
					Height:   1080,
				}
				id++
				select {
				case <-ctx.Done():
					return
				case out <- img:
				}
			}
		}
	}()
	return out
}

// resize is a stage that generates thumbnails (parallelized with Fan-out)
func resize(ctx context.Context, in <-chan Image, workers int) <-chan ProcessedImage {
	out := make(chan ProcessedImage)
	var wg sync.WaitGroup

	for i := 0; i < workers; i++ {
		wg.Add(1)
		go func(workerID int) {
			defer wg.Done()
			for img := range in {
				select {
				case <-ctx.Done():
					return
				default:
					start := time.Now()
					// Resize processing (simulated)
					time.Sleep(30 * time.Millisecond)
					processed := ProcessedImage{
						Original:  img,
						Thumbnail: make([]byte, 256),
						Optimized: make([]byte, 512),
						Duration:  time.Since(start),
					}
					select {
					case <-ctx.Done():
						return
					case out <- processed:
					}
				}
			}
		}(i)
	}

	go func() {
		wg.Wait()
		close(out)
	}()

	return out
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Generate image URLs
	urls := make(chan string)
	go func() {
		defer close(urls)
		for i := 0; i < 20; i++ {
			urls <- fmt.Sprintf("https://example.com/image-%d.jpg", i)
		}
	}()

	// Pipeline: download -> resize (4 workers)
	images := download(ctx, urls)
	results := resize(ctx, images, 4)

	// Collect results
	count := 0
	for result := range results {
		count++
		log.Printf("Processed %s in %v", result.Original.Filename, result.Duration)
	}
	fmt.Printf("Total: %d images processed\n", count)
}
```

### Use Case 2: Microservice Data Aggregation

```go
package main

import (
	"context"
	"fmt"
	"time"

	"golang.org/x/sync/errgroup"
)

// UserProfile is a user profile
type UserProfile struct {
	UserID   int
	Name     string
	Email    string
	Orders   []Order
	Reviews  []Review
	Points   int
	IsPremium bool
}

type Order struct {
	ID     int
	Amount float64
}

type Review struct {
	ID      int
	Content string
}

// getUserProfile aggregates data from multiple services
func getUserProfile(ctx context.Context, userID int) (*UserProfile, error) {
	profile := &UserProfile{UserID: userID}

	g, ctx := errgroup.WithContext(ctx)

	// Fetch basic user information
	g.Go(func() error {
		name, email, err := fetchUserInfo(ctx, userID)
		if err != nil {
			return fmt.Errorf("user info: %w", err)
		}
		profile.Name = name
		profile.Email = email
		return nil
	})

	// Fetch order history
	g.Go(func() error {
		orders, err := fetchOrders(ctx, userID)
		if err != nil {
			return fmt.Errorf("orders: %w", err)
		}
		profile.Orders = orders
		return nil
	})

	// Fetch reviews
	g.Go(func() error {
		reviews, err := fetchReviews(ctx, userID)
		if err != nil {
			return fmt.Errorf("reviews: %w", err)
		}
		profile.Reviews = reviews
		return nil
	})

	// Fetch points balance
	g.Go(func() error {
		points, err := fetchPoints(ctx, userID)
		if err != nil {
			return fmt.Errorf("points: %w", err)
		}
		profile.Points = points
		return nil
	})

	// Check premium status
	g.Go(func() error {
		premium, err := checkPremium(ctx, userID)
		if err != nil {
			return fmt.Errorf("premium: %w", err)
		}
		profile.IsPremium = premium
		return nil
	})

	if err := g.Wait(); err != nil {
		return nil, err
	}
	return profile, nil
}

// The following are mock service calls
func fetchUserInfo(ctx context.Context, id int) (string, string, error) {
	time.Sleep(50 * time.Millisecond)
	return "Tanaka", "tanaka@example.com", nil
}

func fetchOrders(ctx context.Context, id int) ([]Order, error) {
	time.Sleep(80 * time.Millisecond)
	return []Order{{ID: 1, Amount: 1000}, {ID: 2, Amount: 2000}}, nil
}

func fetchReviews(ctx context.Context, id int) ([]Review, error) {
	time.Sleep(60 * time.Millisecond)
	return []Review{{ID: 1, Content: "Great product!"}}, nil
}

func fetchPoints(ctx context.Context, id int) (int, error) {
	time.Sleep(30 * time.Millisecond)
	return 5000, nil
}

func checkPremium(ctx context.Context, id int) (bool, error) {
	time.Sleep(20 * time.Millisecond)
	return true, nil
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	start := time.Now()
	profile, err := getUserProfile(ctx, 1)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}

	fmt.Printf("Profile: %+v\n", profile)
	fmt.Printf("Elapsed: %v (vs sequential ~240ms)\n", time.Since(start))
}
```

---

## 14. FAQ

### Q1: How do I decide the number of workers in a Worker Pool?

For CPU-bound work, use `runtime.NumCPU()` as a baseline. For I/O-bound work, match the acceptable concurrency of external resources (DB connection pool size, API rate limits, etc.). Find the optimal value through benchmarking. As a general guideline:

- **CPU-bound**: `runtime.NumCPU()` or less
- **I/O-bound (local disk)**: `runtime.NumCPU() * 2`
- **I/O-bound (network)**: 50 to 200 (depends on the limits of the external service)
- **Mixed workload**: Identify the optimal value through benchmarking

### Q2: Should I use errgroup or WaitGroup?

Use errgroup when error handling is required; use WaitGroup for simple completion waiting. errgroup also integrates easily with Context, and in modern Go code errgroup is recommended in most cases. Specific advantages of errgroup include concurrency limiting via `SetLimit` and non-blocking submission via `TryGo`.

### Q3: What happens if there is a slow stage in a Pipeline pattern?

The slowest stage becomes the bottleneck. Countermeasures include (1) parallelizing the slow stage with Fan-out, (2) absorbing temporary speed differences with buffered channels, and (3) improving throughput with batch processing. Use pprof/trace to identify bottlenecks.

### Q4: How do I detect goroutine leaks?

(1) Monitor `runtime.NumGoroutine()` periodically. (2) In tests, use the `goleak` package (`go.uber.org/goleak`). (3) Check the `/debug/pprof/goroutine` endpoint of pprof. (4) Use `context.WithCancel` appropriately to ensure that all goroutines terminate on cancellation.

### Q5: How can I guarantee the order of Fan-out results?

Use an indexed result struct and sort all results after collection. Alternatively, pre-allocate an array mapped by index and have each worker write directly to its own index (`results[i] = ...` pattern).

### Q6: How are channels prioritized in a select statement?

Go's select statement has no priority (when multiple cases are ready simultaneously, one is chosen at random). When prioritization is needed, use nested select statements:

```go
// Prioritize checking ctx.Done()
select {
case <-ctx.Done():
    return ctx.Err()
default:
    select {
    case <-ctx.Done():
        return ctx.Err()
    case v := <-dataCh:
        process(v)
    }
}
```

### Q7: How do I decide the buffer size of a channel?

- **Unbuffered (0)**: Send and receive are synchronized. Use when strict step-by-step control is required
- **Small buffer (1 to 10)**: Absorbs minor speed differences between stages
- **Medium buffer (10 to 100)**: Effective for Pipelines with many I/O waits
- **Large buffer (100+)**: When accepting bursty input. Be mindful of memory consumption

---


## FAQ

### Q1: What is the most important point to focus on when learning this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory, but by actually writing code and observing how it behaves.

### Q2: What are common mistakes beginners make?

Skipping the basics and jumping to advanced topics. We recommend solidly understanding the fundamental concepts explained in this guide before moving on to the next step.

### Q3: How is this applied in real-world development?

The knowledge from this topic is frequently applied in day-to-day development work. It becomes especially important during code reviews and architecture design.

---

## Summary

| Concept | Key Points |
|---------|------------|
| Pipeline | Connect stages with channels. Data flow is explicit |
| Fan-out/Fan-in | Distribute processing and aggregate results |
| Worker Pool | Limit the number of goroutines for stable operation |
| errgroup | Standard pattern for concurrent processing with errors |
| Semaphore | Limit concurrency using a buffered channel |
| Or-Done | Helper for cancellation-aware channel reading |
| Tee | Distribute one input to two outputs |
| Bridge | Flatten a channel of channels |
| Rate Limiter | Control throughput to protect external resources |

---

## Recommended Next Reads

- [03-context.md](./03-context.md) -- Cancellation control with Context
- [../02-web/00-net-http.md](../02-web/00-net-http.md) -- Concurrency in HTTP servers
- [../03-tools/02-profiling.md](../03-tools/02-profiling.md) -- Profiling concurrent code

---

## References

1. **Go Blog, "Go Concurrency Patterns: Pipelines and cancellation"** -- https://go.dev/blog/pipelines
2. **Go Blog, "Advanced Go Concurrency Patterns"** -- https://go.dev/blog/io2013-talk-concurrency
3. **golang.org/x/sync/errgroup** -- https://pkg.go.dev/golang.org/x/sync/errgroup
4. **golang.org/x/time/rate** -- https://pkg.go.dev/golang.org/x/time/rate
5. **golang.org/x/sync/semaphore** -- https://pkg.go.dev/golang.org/x/sync/semaphore
6. **Katherine Cox-Buday, "Concurrency in Go"** -- O'Reilly Media



===== SOURCE: 02-programming/go-practical-guide/docs/01-concurrency/03-context.md =====

# Context -- Cancellation, Timeouts, and Value Propagation

> context.Context is the standard mechanism for propagating cancellation signals, timeouts, and request-scoped values across goroutines.

---

## What You Will Learn in This Chapter

1. **context.WithCancel** -- Manual cancellation
2. **context.WithTimeout / WithDeadline** -- Timeout control
3. **context.WithValue** -- Value propagation and best practices
4. **context.AfterFunc (Go 1.21+)** -- Callbacks on cancellation
5. **context.WithoutCancel (Go 1.21+)** -- Severing cancellation propagation
6. **Practical patterns** -- Using Context in HTTP servers, databases, and microservices


## Prerequisites

Before reading this guide, the following knowledge will help deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts
- Familiarity with the content of [Concurrency Patterns -- Fan-out/Fan-in, Pipeline, Worker Pool](./02-concurrency-patterns.md)

---

## 1. Core Concepts of Context

context.Context provides the following four capabilities.

1. **Cancellation propagation**: Cancellation of a parent automatically propagates to all descendants
2. **Deadline management**: Sets time limits on processing
3. **Value propagation**: Passes request-scoped cross-cutting concerns
4. **Done() channel**: Provides a channel for detecting cancellation

### 1.1 Design Principles of Context

- **Pass as the first argument**: Make the first argument of functions `ctx context.Context`
- **Don't store in structs**: Do not hold request-scoped contexts as fields
- **Don't pass nil**: Use `context.TODO()` when unsure
- **Values for cross-cutting concerns only**: Don't put business logic parameters in it
- **Always call the cancel function**: Write `defer cancel()` immediately after obtaining it

---

## 2. context.WithCancel

WithCancel creates a context for manually sending a cancellation signal. When the cancel function is called, all child contexts derived from that context are also cancelled.

### Code Example 1: context.WithCancel Basics

```go
package main

import (
	"context"
	"fmt"
	"time"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	// Background worker
	go func() {
		for {
			select {
			case <-ctx.Done():
				fmt.Println("cancelled:", ctx.Err())
				return
			default:
				fmt.Println("working...")
				time.Sleep(500 * time.Millisecond)
			}
		}
	}()

	time.Sleep(2 * time.Second)
	cancel() // Notify the goroutine of cancellation
	time.Sleep(100 * time.Millisecond) // Wait for the goroutine to finish
}
```

### Code Example 2: Simultaneous Cancellation of Multiple Goroutines

```go
package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

// worker is a worker that processes jobs periodically
func worker(ctx context.Context, id int, wg *sync.WaitGroup) {
	defer wg.Done()
	for {
		select {
		case <-ctx.Done():
			fmt.Printf("Worker %d: stopped (reason: %v)\n", id, ctx.Err())
			return
		case <-time.After(200 * time.Millisecond):
			fmt.Printf("Worker %d: processing\n", id)
		}
	}
}

func main() {
	ctx, cancel := context.WithCancel(context.Background())

	var wg sync.WaitGroup
	// Launch 5 workers
	for i := 1; i <= 5; i++ {
		wg.Add(1)
		go worker(ctx, i, &wg)
	}

	// Stop all workers after 1 second
	time.Sleep(1 * time.Second)
	fmt.Println("Cancelling all workers...")
	cancel()

	wg.Wait()
	fmt.Println("All workers stopped")
}
```

### Code Example 3: Conditional Cancellation

```go
package main

import (
	"context"
	"errors"
	"fmt"
	"math/rand"
	"time"
)

var ErrCriticalFailure = errors.New("critical failure detected")

// monitor watches system state and cancels on anomaly detection
func monitor(ctx context.Context, cancel context.CancelFunc) {
	ticker := time.NewTicker(100 * time.Millisecond)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			// Simulation that randomly detects an anomaly
			if rand.Float64() < 0.05 {
				fmt.Println("Monitor: critical failure detected!")
				cancel() // Cancel all processing
				return
			}
		}
	}
}

// processData processes data sequentially
func processData(ctx context.Context) error {
	for i := 0; i < 100; i++ {
		select {
		case <-ctx.Done():
			return fmt.Errorf("processing interrupted at item %d: %w", i, ctx.Err())
		default:
			time.Sleep(50 * time.Millisecond)
			fmt.Printf("Processing item %d\n", i)
		}
	}
	return nil
}

func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	go monitor(ctx, cancel)

	if err := processData(ctx); err != nil {
		fmt.Printf("Error: %v\n", err)
	} else {
		fmt.Println("All items processed successfully")
	}
}
```

---

## 3. context.WithTimeout / WithDeadline

WithTimeout creates a context that is automatically cancelled after a specified duration. WithDeadline specifies a deadline as an absolute point in time. Internally, WithTimeout is a thin wrapper around WithDeadline.

### Code Example 4: context.WithTimeout

```go
package main

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"time"
)

// fetchWithTimeout performs an HTTP request with a timeout
func fetchWithTimeout(url string, timeout time.Duration) ([]byte, error) {
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel() // Always call cancel even if completed before the timeout

	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("create request: %w", err)
	}

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("do request: %w", err) // On timeout: context deadline exceeded
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("read body: %w", err)
	}
	return body, nil
}

func main() {
	body, err := fetchWithTimeout("https://httpbin.org/delay/2", 5*time.Second)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}
	fmt.Printf("Response: %d bytes\n", len(body))

	// Case that times out
	_, err = fetchWithTimeout("https://httpbin.org/delay/10", 3*time.Second)
	if err != nil {
		fmt.Printf("Expected timeout error: %v\n", err)
	}
}
```

### Code Example 5: context.WithDeadline

```go
package main

import (
	"context"
	"fmt"
	"time"
)

// processUntilDeadline continues processing until the deadline
func processUntilDeadline(ctx context.Context) (int, error) {
	count := 0
	for {
		select {
		case <-ctx.Done():
			return count, ctx.Err() // context.DeadlineExceeded
		default:
			// Simulate processing a single item
			time.Sleep(100 * time.Millisecond)
			count++
			fmt.Printf("Processed item %d\n", count)
		}
	}
}

func main() {
	// Set the deadline 1 second from now
	deadline := time.Now().Add(1 * time.Second)
	ctx, cancel := context.WithDeadline(context.Background(), deadline)
	defer cancel()

	// Check the deadline
	if d, ok := ctx.Deadline(); ok {
		fmt.Printf("Deadline: %v (in %v)\n", d.Format(time.RFC3339), time.Until(d))
	}

	count, err := processUntilDeadline(ctx)
	fmt.Printf("Processed %d items, error: %v\n", count, err)
}
```

### Code Example 6: Nested Timeouts

```go
package main

import (
	"context"
	"fmt"
	"time"
)

// When the parent's timeout is shorter than the child's, the parent's timeout takes precedence
func demonstrateNestedTimeout() {
	// Parent: 2-second timeout
	parentCtx, parentCancel := context.WithTimeout(context.Background(), 2*time.Second)
	defer parentCancel()

	// Child: 5-second timeout (but effectively 2 seconds because the parent cancels at 2 seconds)
	childCtx, childCancel := context.WithTimeout(parentCtx, 5*time.Second)
	defer childCancel()

	// Grandchild: 1-second timeout (this is the shortest)
	grandchildCtx, grandchildCancel := context.WithTimeout(childCtx, 1*time.Second)
	defer grandchildCancel()

	// Grandchild times out in 1 second
	select {
	case <-grandchildCtx.Done():
		fmt.Printf("Grandchild done: %v\n", grandchildCtx.Err())
	}

	// Child times out at the parent's 2 seconds (not 5 seconds)
	select {
	case <-childCtx.Done():
		fmt.Printf("Child done: %v\n", childCtx.Err())
	}
}

func main() {
	demonstrateNestedTimeout()
}
```

### Code Example 7: Branching Based on Remaining Timeout

```go
package main

import (
	"context"
	"fmt"
	"time"
)

// adaptiveProcess changes its processing approach based on the remaining timeout
func adaptiveProcess(ctx context.Context) error {
	deadline, ok := ctx.Deadline()
	if !ok {
		// No deadline set
		return fullProcess(ctx)
	}

	remaining := time.Until(deadline)
	fmt.Printf("Remaining time: %v\n", remaining)

	if remaining < 1*time.Second {
		// Little remaining time -> simplified processing
		return quickProcess(ctx)
	} else if remaining < 5*time.Second {
		// Moderate remaining time -> standard processing
		return standardProcess(ctx)
	} else {
		// Ample remaining time -> full processing
		return fullProcess(ctx)
	}
}

func quickProcess(ctx context.Context) error {
	fmt.Println("Quick process (minimal)")
	return nil
}

func standardProcess(ctx context.Context) error {
	fmt.Println("Standard process")
	select {
	case <-ctx.Done():
		return ctx.Err()
	case <-time.After(2 * time.Second):
		return nil
	}
}

func fullProcess(ctx context.Context) error {
	fmt.Println("Full process (comprehensive)")
	select {
	case <-ctx.Done():
		return ctx.Err()
	case <-time.After(5 * time.Second):
		return nil
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	if err := adaptiveProcess(ctx); err != nil {
		fmt.Printf("Error: %v\n", err)
	} else {
		fmt.Println("Done")
	}
}
```

---

## 4. context.WithValue

WithValue stores request-scoped values in a context. However, you should only store cross-cutting concerns (trace IDs, authentication information, locale, etc.), not business logic parameters.

### Code Example 8: context.WithValue Basics

```go
package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
)

// Define a custom key type to prevent key collisions
type contextKey string

const (
	requestIDKey contextKey = "requestID"
	userIDKey    contextKey = "userID"
	localeKey    contextKey = "locale"
)

// requestIDMiddleware sets the request ID on the context
func requestIDMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		reqID := r.Header.Get("X-Request-ID")
		if reqID == "" {
			reqID = generateRequestID() // Generate UUID
		}
		ctx := context.WithValue(r.Context(), requestIDKey, reqID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// authMiddleware sets the user ID on the context
func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("Authorization")
		userID, err := validateToken(token)
		if err != nil {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}
		ctx := context.WithValue(r.Context(), userIDKey, userID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// localeMiddleware sets locale information on the context
func localeMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		locale := r.Header.Get("Accept-Language")
		if locale == "" {
			locale = "ja-JP"
		}
		ctx := context.WithValue(r.Context(), localeKey, locale)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// handler retrieves values from the context
func handler(w http.ResponseWriter, r *http.Request) {
	reqID, _ := r.Context().Value(requestIDKey).(string)
	userID, _ := r.Context().Value(userIDKey).(int)
	locale, _ := r.Context().Value(localeKey).(string)

	log.Printf("[%s] User %d, Locale: %s", reqID, userID, locale)
	fmt.Fprintf(w, "Hello, user %d!", userID)
}

func generateRequestID() string {
	return "req-12345" // In practice, generate a UUID
}

func validateToken(token string) (int, error) {
	return 42, nil // In practice, validate the token
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/profile", handler)

	h := requestIDMiddleware(authMiddleware(localeMiddleware(mux)))
	http.ListenAndServe(":8080", h)
}
```

### Code Example 9: Type-Safe Context Value Accessors

```go
package main

import (
	"context"
	"errors"
	"fmt"
)

// --- Key definitions ---

type contextKey int

const (
	requestIDKey contextKey = iota
	userIDKey
	traceIDKey
	tenantIDKey
)

// --- Type-safe accessors ---

// SetRequestID sets the request ID on the context
func SetRequestID(ctx context.Context, id string) context.Context {
	return context.WithValue(ctx, requestIDKey, id)
}

// GetRequestID retrieves the request ID from the context
func GetRequestID(ctx context.Context) (string, bool) {
	id, ok := ctx.Value(requestIDKey).(string)
	return id, ok
}

// MustGetRequestID retrieves the request ID (panics if not present)
func MustGetRequestID(ctx context.Context) string {
	id, ok := GetRequestID(ctx)
	if !ok {
		panic("requestID not found in context")
	}
	return id
}

// SetUserID sets the user ID on the context
func SetUserID(ctx context.Context, id int) context.Context {
	return context.WithValue(ctx, userIDKey, id)
}

// GetUserID retrieves the user ID from the context
func GetUserID(ctx context.Context) (int, error) {
	id, ok := ctx.Value(userIDKey).(int)
	if !ok {
		return 0, errors.New("userID not found in context")
	}
	return id, nil
}

// SetTraceID sets the trace ID on the context
func SetTraceID(ctx context.Context, id string) context.Context {
	return context.WithValue(ctx, traceIDKey, id)
}

// GetTraceID retrieves the trace ID from the context
func GetTraceID(ctx context.Context) string {
	id, _ := ctx.Value(traceIDKey).(string)
	return id // Empty string by default
}

func main() {
	ctx := context.Background()
	ctx = SetRequestID(ctx, "req-abc-123")
	ctx = SetUserID(ctx, 42)
	ctx = SetTraceID(ctx, "trace-xyz-789")

	reqID, _ := GetRequestID(ctx)
	userID, _ := GetUserID(ctx)
	traceID := GetTraceID(ctx)

	fmt.Printf("RequestID: %s, UserID: %d, TraceID: %s\n", reqID, userID, traceID)
}
```

---

## 5. Context Propagation Chains

In real web applications, the HTTP request's context serves as the starting point, propagating down through the service layer, repository layer, and external API calls.

### Code Example 10: Complete Propagation Chain from HTTP Request to Database

```go
package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

// --- Handler layer ---

func handleGetUser(userService *UserService) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Use the HTTP request's Context as the foundation
		ctx := r.Context()

		// Add a handler-specific timeout
		ctx, cancel := context.WithTimeout(ctx, 10*time.Second)
		defer cancel()

		userID := r.PathValue("id")
		user, err := userService.GetUser(ctx, userID)
		if err != nil {
			switch {
			case err == context.Canceled:
				// Client disconnected
				log.Printf("Client disconnected: %v", err)
				return
			case err == context.DeadlineExceeded:
				// Timeout
				http.Error(w, "request timeout", http.StatusGatewayTimeout)
				return
			default:
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(user)
	}
}

// --- Service layer ---

type User struct {
	ID    string `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

type UserService struct {
	repo         *UserRepository
	cacheService *CacheService
}

func (s *UserService) GetUser(ctx context.Context, id string) (*User, error) {
	// Try the cache first
	user, err := s.cacheService.Get(ctx, "user:"+id)
	if err == nil && user != nil {
		return user, nil
	}

	// Fetch from the database
	user, err = s.repo.FindByID(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("find user: %w", err)
	}

	// Save to cache (only if the context is still valid)
	if ctx.Err() == nil {
		_ = s.cacheService.Set(ctx, "user:"+id, user, 5*time.Minute)
	}

	return user, nil
}

// --- Repository layer ---

type UserRepository struct {
	db *sql.DB
}

func (r *UserRepository) FindByID(ctx context.Context, id string) (*User, error) {
	var user User
	err := r.db.QueryRowContext(ctx,
		"SELECT id, name, email FROM users WHERE id = $1", id,
	).Scan(&user.ID, &user.Name, &user.Email)
	if err != nil {
		return nil, fmt.Errorf("query user: %w", err)
	}
	return &user, nil
}

// --- Cache layer ---

type CacheService struct{}

func (c *CacheService) Get(ctx context.Context, key string) (*User, error) {
	// Redis GET with context
	select {
	case <-ctx.Done():
		return nil, ctx.Err()
	default:
		return nil, fmt.Errorf("cache miss") // Simulated
	}
}

func (c *CacheService) Set(ctx context.Context, key string, user *User, ttl time.Duration) error {
	select {
	case <-ctx.Done():
		return ctx.Err()
	default:
		return nil // Simulated
	}
}

func main() {
	// Omitted: DB connection, server startup
	log.Println("Server starting on :8080")
}
```

### Code Example 11: Context Propagation Between Microservices

```go
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

// Propagating from context to HTTP headers
func propagateContext(ctx context.Context, req *http.Request) {
	// Propagate the trace ID into HTTP headers
	if traceID := GetTraceID(ctx); traceID != "" {
		req.Header.Set("X-Trace-ID", traceID)
	}

	// Also propagate the request ID
	if reqID, ok := GetRequestID(ctx); ok {
		req.Header.Set("X-Request-ID", reqID)
	}

	// Propagate the deadline via a header (optional)
	if deadline, ok := ctx.Deadline(); ok {
		remaining := time.Until(deadline)
		req.Header.Set("X-Timeout-Ms", fmt.Sprintf("%d", remaining.Milliseconds()))
	}
}

// callExternalService calls an external service
func callExternalService(ctx context.Context, url string) (map[string]interface{}, error) {
	req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
	if err != nil {
		return nil, err
	}

	// Propagate context information into HTTP headers
	propagateContext(ctx, req)

	client := &http.Client{Timeout: 30 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("call %s: %w", url, err)
	}
	defer resp.Body.Close()

	var result map[string]interface{}
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("decode response: %w", err)
	}
	return result, nil
}

func main() {
	ctx := context.Background()
	ctx = SetTraceID(ctx, "trace-abc-123")
	ctx = SetRequestID(ctx, "req-xyz-789")

	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	result, err := callExternalService(ctx, "https://httpbin.org/get")
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}
	fmt.Printf("Result: %v\n", result)
}
```

---

## 6. context.AfterFunc (Go 1.21+)

`context.AfterFunc`, added in Go 1.21, runs a callback function after a context is cancelled. It is used for resource cleanup and notifications.

### Code Example 12: context.AfterFunc

```go
package main

import (
	"context"
	"fmt"
	"time"
)

func main() {
	ctx, cancel := context.WithCancel(context.Background())

	// Run cleanup when the context is cancelled
	stop := context.AfterFunc(ctx, func() {
		fmt.Println("AfterFunc: context was cancelled, cleaning up...")
		// Resource cleanup processing
		closeConnections()
		flushLogs()
	})

	// The return value of AfterFunc can be used to unregister
	_ = stop // Calling stop() can unregister the AfterFunc

	// Execute processing
	fmt.Println("Processing...")
	time.Sleep(1 * time.Second)

	// Cancel -> AfterFunc runs
	cancel()
	time.Sleep(100 * time.Millisecond) // Wait for AfterFunc to run
}

func closeConnections() {
	fmt.Println("  Connections closed")
}

func flushLogs() {
	fmt.Println("  Logs flushed")
}
```

### Code Example 13: Resource Release Pattern with AfterFunc

```go
package main

import (
	"context"
	"fmt"
	"sync"
)

// Resource is a resource automatically released on cancellation
type Resource struct {
	name   string
	mu     sync.Mutex
	closed bool
}

func (r *Resource) Close() {
	r.mu.Lock()
	defer r.mu.Unlock()
	if r.closed {
		return
	}
	r.closed = true
	fmt.Printf("Resource %s: closed\n", r.name)
}

func (r *Resource) Use() error {
	r.mu.Lock()
	defer r.mu.Unlock()
	if r.closed {
		return fmt.Errorf("resource %s is closed", r.name)
	}
	fmt.Printf("Resource %s: used\n", r.name)
	return nil
}

// acquireResource acquires a resource tied to the context
func acquireResource(ctx context.Context, name string) *Resource {
	r := &Resource{name: name}

	// Automatically release the resource when the context is cancelled
	context.AfterFunc(ctx, func() {
		r.Close()
	})

	return r
}

func main() {
	ctx, cancel := context.WithCancel(context.Background())

	r1 := acquireResource(ctx, "db-conn")
	r2 := acquireResource(ctx, "cache-conn")

	r1.Use()
	r2.Use()

	// Cancel -> all resources are released automatically
	cancel()

	// Access after release is an error
	if err := r1.Use(); err != nil {
		fmt.Printf("Expected error: %v\n", err)
	}
}
```

---

## 7. context.WithoutCancel (Go 1.21+)

`context.WithoutCancel`, added in Go 1.21, creates a new context that inherits the parent's values but does not propagate cancellation signals. It is useful for background processing and cleanup tasks.

### Code Example 14: context.WithoutCancel

```go
package main

import (
	"context"
	"fmt"
	"time"
)

func main() {
	// Parent context: 1-second timeout
	parentCtx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

	// Set a value
	parentCtx = SetTraceID(parentCtx, "trace-abc")

	// WithoutCancel: does not propagate the parent's cancellation
	backgroundCtx := context.WithoutCancel(parentCtx)

	// Values are inherited
	fmt.Printf("TraceID in background: %s\n", GetTraceID(backgroundCtx))

	// Unaffected even when the parent times out
	time.Sleep(2 * time.Second)

	if parentCtx.Err() != nil {
		fmt.Printf("Parent: cancelled (%v)\n", parentCtx.Err())
	}
	if backgroundCtx.Err() == nil {
		fmt.Println("Background: still active!")
	}
}
```

### Code Example 15: Practical Use of WithoutCancel

```go
package main

import (
	"context"
	"fmt"
	"log"
	"time"
)

// handleRequest handles an HTTP request
func handleRequest(ctx context.Context) {
	// Main processing (tied to the request context)
	result, err := processRequest(ctx)
	if err != nil {
		log.Printf("Error: %v", err)
		return
	}

	// Asynchronous background task (unaffected by the request context's cancellation)
	bgCtx := context.WithoutCancel(ctx)
	// However, set its own timeout
	bgCtx, bgCancel := context.WithTimeout(bgCtx, 30*time.Second)

	go func() {
		defer bgCancel()
		// Record audit log (should complete even after the request ends)
		writeAuditLog(bgCtx, result)
		// Send metrics
		sendMetrics(bgCtx, result)
	}()

	fmt.Println("Request handled, background tasks started")
}

func processRequest(ctx context.Context) (string, error) {
	select {
	case <-ctx.Done():
		return "", ctx.Err()
	case <-time.After(100 * time.Millisecond):
		return "result-data", nil
	}
}

func writeAuditLog(ctx context.Context, data string) {
	select {
	case <-ctx.Done():
		log.Printf("Audit log write cancelled: %v", ctx.Err())
	case <-time.After(500 * time.Millisecond):
		log.Printf("Audit log written: %s", data)
	}
}

func sendMetrics(ctx context.Context, data string) {
	select {
	case <-ctx.Done():
		log.Printf("Metrics send cancelled: %v", ctx.Err())
	case <-time.After(200 * time.Millisecond):
		log.Printf("Metrics sent: %s", data)
	}
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	handleRequest(ctx)
	time.Sleep(1 * time.Second) // Wait for background tasks to complete
}
```

---

## 8. context.WithCancelCause (Go 1.20+)

`context.WithCancelCause`, added in Go 1.20, creates a context that allows attaching a cancellation cause. It is useful for debugging and error reporting.

### Code Example 16: context.WithCancelCause

```go
package main

import (
	"context"
	"errors"
	"fmt"
	"time"
)

var (
	ErrUserAborted    = errors.New("user aborted the operation")
	ErrResourceLimit  = errors.New("resource limit exceeded")
	ErrHealthCheck    = errors.New("health check failed")
)

func main() {
	ctx, cancel := context.WithCancelCause(context.Background())

	go func() {
		// Cancel under some condition
		time.Sleep(1 * time.Second)
		cancel(ErrResourceLimit) // Cancel with a cause
	}()

	<-ctx.Done()

	// Retrieve the cancellation cause
	fmt.Printf("Context error: %v\n", ctx.Err())           // context canceled
	fmt.Printf("Cancel cause: %v\n", context.Cause(ctx))   // resource limit exceeded

	// Branch based on the cause
	cause := context.Cause(ctx)
	switch {
	case errors.Is(cause, ErrUserAborted):
		fmt.Println("User chose to abort")
	case errors.Is(cause, ErrResourceLimit):
		fmt.Println("Resource limit reached, retry later")
	case errors.Is(cause, ErrHealthCheck):
		fmt.Println("System unhealthy, alerting")
	default:
		fmt.Printf("Unknown cause: %v\n", cause)
	}
}
```

---

## 9. Graceful Shutdown and context

Context plays a crucial role in the graceful shutdown of HTTP servers.

### Code Example 17: Graceful Shutdown

```go
package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "OK")
	})
	mux.HandleFunc("GET /slow", func(w http.ResponseWriter, r *http.Request) {
		select {
		case <-r.Context().Done():
			log.Println("Client disconnected during slow request")
			return
		case <-time.After(10 * time.Second):
			fmt.Fprintf(w, "Done after 10s")
		}
	})

	server := &http.Server{
		Addr:         ":8080",
		Handler:      mux,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start the server in the background
	go func() {
		log.Printf("Server starting on %s", server.Addr)
		if err := server.ListenAndServe(); err != http.ErrServerClosed {
			log.Fatalf("Server error: %v", err)
		}
	}()

	// Wait for a signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	sig := <-quit
	log.Printf("Received signal: %v, shutting down...", sig)

	// Graceful shutdown: wait up to 30 seconds for in-flight requests to complete
	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer shutdownCancel()

	if err := server.Shutdown(shutdownCtx); err != nil {
		log.Printf("Graceful shutdown failed: %v", err)
		// Force termination
		server.Close()
	}

	log.Println("Server stopped")
}
```

### Code Example 18: Graceful Shutdown with Background Workers

```go
package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"sync"
	"syscall"
	"time"
)

// Application manages the lifecycle of the entire application
type Application struct {
	ctx    context.Context
	cancel context.CancelFunc
	wg     sync.WaitGroup
}

func NewApplication() *Application {
	ctx, cancel := context.WithCancel(context.Background())
	return &Application{ctx: ctx, cancel: cancel}
}

// StartWorker starts a background worker
func (app *Application) StartWorker(name string, fn func(context.Context)) {
	app.wg.Add(1)
	go func() {
		defer app.wg.Done()
		log.Printf("Worker %s: started", name)
		fn(app.ctx)
		log.Printf("Worker %s: stopped", name)
	}()
}

// Shutdown shuts down the application
func (app *Application) Shutdown(timeout time.Duration) {
	log.Println("Application: initiating shutdown")
	app.cancel()

	done := make(chan struct{})
	go func() {
		app.wg.Wait()
		close(done)
	}()

	select {
	case <-done:
		log.Println("Application: all workers stopped gracefully")
	case <-time.After(timeout):
		log.Println("Application: shutdown timeout, some workers may not have stopped")
	}
}

func main() {
	app := NewApplication()

	// Message processing worker
	app.StartWorker("message-processor", func(ctx context.Context) {
		ticker := time.NewTicker(1 * time.Second)
		defer ticker.Stop()
		for {
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				log.Println("Processing messages...")
			}
		}
	})

	// Metrics collection worker
	app.StartWorker("metrics-collector", func(ctx context.Context) {
		ticker := time.NewTicker(5 * time.Second)
		defer ticker.Stop()
		for {
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				log.Println("Collecting metrics...")
			}
		}
	})

	// Health check worker
	app.StartWorker("health-checker", func(ctx context.Context) {
		ticker := time.NewTicker(10 * time.Second)
		defer ticker.Stop()
		for {
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				log.Println("Health check passed")
			}
		}
	})

	// Wait for signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	app.Shutdown(10 * time.Second)
}
```

---

## 10. ASCII Diagrams

### Diagram 1: Propagation of a Context Tree

```
context.Background()
    │
    ├── WithCancel ──────────── API Handler
    │       │
    │       ├── WithTimeout(5s) ── DB Query
    │       │
    │       └── WithTimeout(3s) ── External API Call
    │
    └── WithCancel ──────────── Background Worker
            │
            └── WithValue(traceID) ── Logger

Cancellation propagation: parent cancels -> all children are also cancelled
```

### Diagram 2: Cancellation Propagation Flow

```
     Client disconnects
          │
          ▼
  ┌───────────────┐
  │ HTTP Handler  │ ctx.Done() signal
  │  (ctx)        │──────┐
  └───────────────┘      │
          │              ▼
          ▼        ┌───────────┐
  ┌───────────────┐│ Service   │
  │ Middleware    ││ (ctx)     │──┐
  │  (ctx)        ││           │  │
  └───────────────┘└───────────┘  ▼
                            ┌───────────┐
                            │ DB Query  │
                            │ (ctx)     │ <- gets cancelled
                            └───────────┘
```

### Diagram 3: Internal Behavior of WithTimeout

```
t=0s          t=3s          t=5s
 │             │             │
 ├─ ctx created┤             │
 │  Timeout=5s │             │
 │             │             │
 │ processing..│ processing..│ ctx.Done()
 │             │             │ <- signal sent
 │             │             │
 │             │          ctx.Err() =
 │             │          DeadlineExceeded
 │             │
 │  Can finish │
 │  early with │
 │  cancel()   │
```

### Diagram 4: Nested Timeouts

```
t=0s    t=1s    t=2s    t=3s    t=4s    t=5s
 │       │       │       │       │       │
 │  ┌────┼───────┼───────┼───────┼───────┤ Parent: Timeout=5s
 │  │    │       │       │       │       │
 │  │ ┌──┼───────┤       │       │       │ Child: Timeout=2s
 │  │ │  │       │       │       │       │
 │  │ │┌─┤       │       │       │       │ Grandchild: Timeout=1s
 │  │ ││ │       │       │       │       │
 │  │ │└─┘ Done  │       │       │       │ Grandchild: times out at 1s
 │  │ └── Done   │       │       │       │ Child: times out at 2s
 │  └──────────── Done   │       │       │ Parent: times out at 5s
 │       │       │       │       │       │
 In practice: cancellation order is grandchild(1s) -> child(2s) -> parent(5s)
```

### Diagram 5: Behavior of WithoutCancel

```
  parent (WithTimeout 5s)
      │
      ├── child1 (normal)
      │     └── Cancelled when parent is cancelled (yes)
      │
      └── child2 (WithoutCancel)
            └── Continues even when parent is cancelled (no cancellation propagation)
            └── Values are inherited (yes)

  Use cases: background tasks, audit log recording, metrics sending
```

### Diagram 6: Using WithCancelCause

```
  ctx, cancel := context.WithCancelCause(parent)
      │
      ├── cancel(ErrUserAborted)
      │     └── context.Cause(ctx) -> ErrUserAborted
      │
      ├── cancel(ErrResourceLimit)
      │     └── context.Cause(ctx) -> ErrResourceLimit
      │
      └── cancel(nil)
            └── context.Cause(ctx) -> context.Canceled

  Useful for debugging and error reporting
```

---

## 11. Comparison Tables

### Table 1: Context Creation Functions

| Function | Purpose | Trigger for Done() | Go Version |
|----------|---------|--------------------|------------|
| `context.Background()` | Root. Used in main, init, tests | Never fires | 1.7+ |
| `context.TODO()` | Temporary placeholder when undecided | Never fires | 1.7+ |
| `WithCancel(parent)` | Manual cancellation | cancel() call | 1.7+ |
| `WithCancelCause(parent)` | Cancellation with cause | cancel(err) call | 1.20+ |
| `WithTimeout(parent, d)` | Time limit | After duration d or cancel() | 1.7+ |
| `WithDeadline(parent, t)` | Absolute time limit | Reaching t or cancel() | 1.7+ |
| `WithValue(parent, k, v)` | Value propagation | Depends on parent | 1.7+ |
| `WithoutCancel(parent)` | Non-propagating cancellation | Never fires | 1.21+ |
| `AfterFunc(ctx, fn)` | Callback on cancellation | - | 1.21+ |

### Table 2: Return Values of context.Err()

| State | ctx.Err() | ctx.Done() | context.Cause(ctx) |
|-------|-----------|-----------|-------------------|
| Not cancelled | nil | blocks | nil |
| cancel() called | context.Canceled | closed | cancel argument or Canceled |
| Timed out | context.DeadlineExceeded | closed | DeadlineExceeded |

### Table 3: What to Put / Not Put in Context Values

| Should put in | Should NOT put in |
|---------------|-------------------|
| Trace ID / Span ID | User ID (pass as argument) |
| Request ID | Search criteria / filters |
| Auth tokens / claims | Pagination information |
| Locale / timezone | Business logic parameters |
| Logger instance | DB connection / HTTP client |
| Tenant ID (multi-tenant) | Configuration values / flags |

### Table 4: Propagation Targets for Context

| Target | Method example | Importance |
|--------|----------------|------------|
| database/sql | QueryContext, ExecContext | Required |
| net/http | NewRequestWithContext | Required |
| gRPC | Automatic propagation via metadata | Automatic |
| Redis | client.WithContext | Recommended |
| Logs | logger.WithContext | Recommended |
| External APIs | NewRequestWithContext | Required |
| goroutines | Pass as argument | Required |

---

## 12. Anti-Patterns

### Anti-Pattern 1: Storing context in a struct

```go
// BAD: Making context a field of a struct
type Service struct {
	ctx context.Context // Cannot hold a different context per request
	db  *sql.DB
}

// GOOD: Pass context as the first argument of a method
type Service struct {
	db *sql.DB
}

func (s *Service) GetUser(ctx context.Context, id int) (*User, error) {
	return s.db.QueryRowContext(ctx, "SELECT ...", id).Scan(...)
}
```

### Anti-Pattern 2: Abusing WithValue

```go
// BAD: Putting business logic parameters in context
ctx = context.WithValue(ctx, "userID", 42)
ctx = context.WithValue(ctx, "orderID", 100)
ctx = context.WithValue(ctx, "limit", 50)

// GOOD: Pass them as function arguments; context is for cross-cutting concerns only
func GetOrders(ctx context.Context, userID, limit int) ([]Order, error) {
	// Only cross-cutting concerns like trace ID and auth info in context
	traceID := ctx.Value(traceIDKey).(string)
	// ...
}
```

### Anti-Pattern 3: Not calling the cancel function

```go
// BAD: Not calling cancel function -> resource leak
func processRequest(parentCtx context.Context) {
	ctx, _ := context.WithTimeout(parentCtx, 5*time.Second)
	// cancel is not called -> timer goroutine leaks
	doWork(ctx)
}

// GOOD: Write defer cancel() immediately
func processRequest(parentCtx context.Context) {
	ctx, cancel := context.WithTimeout(parentCtx, 5*time.Second)
	defer cancel() // Always release the resource
	doWork(ctx)
}
```

### Anti-Pattern 4: Using string keys

```go
// BAD: Using strings as keys (collision risk)
ctx = context.WithValue(ctx, "userID", 42)
ctx = context.WithValue(ctx, "userID", "conflict!") // Another package might use the same key

// GOOD: Use a custom unexported type as the key
type contextKey int

const userIDKey contextKey = 0

ctx = context.WithValue(ctx, userIDKey, 42)
```

### Anti-Pattern 5: Overusing context.Background()

```go
// BAD: Ignoring the parent context and using Background
func (s *Service) GetUser(ctx context.Context, id int) (*User, error) {
	// Ignores the argument ctx and uses Background -> cancellation/timeout don't work
	dbCtx := context.Background()
	return s.db.QueryRowContext(dbCtx, "SELECT ...", id).Scan(...)
}

// GOOD: Propagate the received context as-is
func (s *Service) GetUser(ctx context.Context, id int) (*User, error) {
	return s.db.QueryRowContext(ctx, "SELECT ...", id).Scan(...)
}
```

### Anti-Pattern 6: Using resources after context cancellation

```go
// BAD: Writing to the response after context is cancelled
func handler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	result, err := longRunningTask(ctx)
	if err != nil {
		// Writes to ResponseWriter even if the context was cancelled
		http.Error(w, err.Error(), 500) // Meaningless if the client disconnected
		return
	}
	json.NewEncoder(w).Encode(result)
}

// GOOD: Check the context state before responding
func handler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	result, err := longRunningTask(ctx)
	if ctx.Err() != nil {
		// Client has already disconnected -> no need to respond
		log.Printf("Client disconnected: %v", ctx.Err())
		return
	}
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}
	json.NewEncoder(w).Encode(result)
}
```


---

## Practical Exercises

### Exercise 1: Basic Implementation

Implement code that satisfies the following requirements.

**Requirements:**
- Validate input data
- Implement proper error handling
- Write test code as well

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
        """Main data processing logic"""
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
        assert False, "Should have raised an exception"
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
        """Add item (with size limit)"""
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
        """Get statistics"""
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

    print(f"Inefficient version: {slow_time:.4f}s")
    print(f"Efficient version:   {fast_time:.6f}s")
    print(f"Speedup: {slow_time/fast_time:.0f}x")

benchmark()
```

**Key points:**
- Be aware of algorithmic complexity
- Choose appropriate data structures
- Measure the effect with benchmarks

---

## Troubleshooting

### Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| Initialization error | Configuration file issue | Check the config file path and format |
| Timeout | Network latency / resource shortage | Adjust timeout values, add retry logic |
| Out of memory | Data volume growth | Introduce batch processing, implement pagination |
| Permission error | Insufficient access rights | Check the executing user's permissions and settings |
| Data inconsistency | Concurrency contention | Introduce locking, manage transactions |

### Debugging Steps

1. **Check error messages**: Read the stack trace and identify the location of the issue
2. **Establish reproduction steps**: Reproduce the error with minimal code
3. **Formulate hypotheses**: List possible causes
4. **Verify step by step**: Use logging and debuggers to test hypotheses
5. **Fix and regression test**: After the fix, run tests in related areas as well

```python
# Debugging utilities
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
    """Decorator that logs function input and output"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        logger.debug(f"Call: {func.__name__}(args={args}, kwargs={kwargs})")
        try:
            result = func(*args, **kwargs)
            logger.debug(f"Return value: {func.__name__} -> {result}")
            return result
        except Exception as e:
            logger.error(f"Exception: {func.__name__}: {e}")
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

Steps to take when diagnosing performance problems:

1. **Identify bottlenecks**: Measure with profiling tools
2. **Check memory usage**: Look for memory leaks
3. **Check I/O waits**: Examine disk and network I/O status
4. **Check concurrent connections**: Inspect connection pool state

| Problem type | Diagnostic tools | Countermeasures |
|--------------|------------------|-----------------|
| CPU load | cProfile, py-spy | Algorithmic improvements, parallelization |
| Memory leaks | tracemalloc, objgraph | Proper release of references |
| I/O bottlenecks | strace, iostat | Async I/O, caching |
| DB latency | EXPLAIN, slow query log | Indexing, query optimization |
---

## 13. FAQ

### Q1: What is the difference between context.Background() and context.TODO()?

They are functionally identical, but their intent differs. `Background()` is used when you intentionally want a root context, while `TODO()` is used when the appropriate context is not yet decided and you plan to fix it later. Linters can detect `TODO()` to prevent oversights.

### Q2: Must the cancel function always be called?

Yes. Failing to call the cancel function returned by `WithCancel`/`WithTimeout`/`WithDeadline` causes a resource leak. It is conventional to write `defer cancel()` immediately after obtaining it. Even if cancellation happens automatically via timeout, `cancel()` can be called safely (it can be called multiple times without error).

### Q3: In what situations should context values be used?

Only for request-scoped cross-cutting concerns: trace IDs, authentication information, locale, etc. Do not use them for business logic parameters. Define a custom key type (`type contextKey string`) to prevent key collisions.

### Q4: Should I use context.WithTimeout or http.Client.Timeout?

The two are complementary. `http.Client.Timeout` sets a timeout for the entire client (from connection through response read). `context.WithTimeout` allows setting different timeouts per request and also supports cancellation propagation. Generally, you set both: `http.Client.Timeout` as a longer safety net, and the context timeout to a request-specific value.

### Q5: What happens if the context is cancelled during a database transaction?

`database/sql` detects context cancellation and aborts the query. However, transaction state is driver-dependent. Generally:
- In-flight queries are aborted
- If not yet committed, the transaction is rolled back
- Use the `defer tx.Rollback()` pattern to clean up safely

### Q6: What should I be careful of when passing context to goroutines?

- Copy values before passing them to goroutines (be careful with objects that become invalid after the request ends, such as gin.Context)
- Consider `context.WithoutCancel` for background goroutines
- Set your own timeouts
- To prevent goroutine leaks, always ensure a cancellation path

### Q7: How do I choose between Go 1.21's AfterFunc and WithoutCancel?

- `AfterFunc`: When you want to run specific cleanup (resource release, logging, etc.) on cancellation
- `WithoutCancel`: When you want processing to continue unaffected by the parent's cancellation (background tasks, audit logs, etc.)

### Q8: How should context be handled in tests?

In tests, set an appropriate timeout on `context.Background()`. Since tests with long deadlines can cause flaky (unstable) tests in CI environments, set short timeouts:

```go
func TestGetUser(t *testing.T) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	user, err := service.GetUser(ctx, 1)
	if err != nil {
		t.Fatalf("GetUser: %v", err)
	}
	// ...
}
```

---


## FAQ

### Q1: What is the most important point to focus on when learning this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory, but by actually writing code and verifying its behavior.

### Q2: What are common mistakes beginners make?

Skipping the basics and jumping to advanced topics. We recommend solidly understanding the fundamental concepts explained in this guide before moving on to the next step.

### Q3: How is this applied in real-world development?

The knowledge from this topic is frequently applied in day-to-day development work. It becomes especially important during code reviews and architecture design.

---

## Summary

| Concept | Key Points |
|---------|------------|
| Context | Cancellation, timeouts, and value propagation across goroutines |
| WithCancel | Manual cancellation control |
| WithCancelCause | Cancellation with cause (Go 1.20+) |
| WithTimeout | Processing with time limits |
| WithDeadline | Deadline based on absolute time |
| WithValue | Use only for propagating cross-cutting concerns |
| WithoutCancel | Severs cancellation propagation (Go 1.21+) |
| AfterFunc | Callback on cancellation (Go 1.21+) |
| cancel() | Always call via defer cancel() |
| Propagation | Parent cancellation -> cancellation propagates to all descendants |

---

## Recommended Next Reads

- [../02-web/00-net-http.md](../02-web/00-net-http.md) -- Using Context in HTTP servers
- [../02-web/02-database.md](../02-web/02-database.md) -- Context control in DB queries
- [../02-web/03-grpc.md](../02-web/03-grpc.md) -- Context in gRPC

---

## References

1. **Go Blog, "Go Concurrency Patterns: Context"** -- https://go.dev/blog/context
2. **Go Standard Library: context** -- https://pkg.go.dev/context
3. **Go Blog, "Contexts and structs"** -- https://go.dev/blog/context-and-structs
4. **Go 1.20 Release Notes (WithCancelCause)** -- https://go.dev/doc/go1.20
5. **Go 1.21 Release Notes (AfterFunc, WithoutCancel)** -- https://go.dev/doc/go1.21



===== SOURCE: 02-programming/go-practical-guide/docs/02-web/00-net-http.md =====

# net/http -- Go Standard HTTP Server

> net/http implements HTTP servers and clients with Go's standard library, enabling production-quality web services through Handler, ServeMux, and middleware patterns.

---

## What You Will Learn in This Chapter

1. **Handler / HandlerFunc** -- The basics of HTTP request processing
2. **ServeMux (Go 1.22+)** -- Enhanced routing
3. **Middleware Patterns** -- Separation of cross-cutting concerns
4. **HTTP Client** -- Calling external services
5. **Graceful Shutdown** -- Safe server termination
6. **httptest** -- Testing HTTP handlers
7. **Production Operations** -- Security and performance configuration


## Prerequisites

Before reading this guide, the following knowledge will help deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts

---

## 1. Handler / HandlerFunc

Go's HTTP server is designed around the `http.Handler` interface. This interface has just one method: `ServeHTTP(ResponseWriter, *Request)`.

### 1.1 Handler Interface Basics

```go
// Standard library definition
type Handler interface {
    ServeHTTP(ResponseWriter, *Request)
}
```

`HandlerFunc` is an adapter type that converts a function into the `Handler` interface.

```go
type HandlerFunc func(ResponseWriter, *Request)

func (f HandlerFunc) ServeHTTP(w ResponseWriter, r *Request) {
    f(w, r)
}
```

### Code Example 1: Basic HTTP Server

```go
package main

import (
	"fmt"
	"log"
	"net/http"
	"time"
)

func main() {
	mux := http.NewServeMux()

	// HandlerFunc pattern
	mux.HandleFunc("GET /hello", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello, World!")
	})

	// Handler interface implementation pattern
	mux.Handle("GET /health", &healthHandler{})

	server := &http.Server{
		Addr:         ":8080",
		Handler:      mux,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  120 * time.Second,
	}

	log.Printf("Server starting on %s", server.Addr)
	log.Fatal(server.ListenAndServe())
}

// healthHandler is a struct that implements the Handler interface
type healthHandler struct{}

func (h *healthHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, `{"status":"ok"}`)
}
```

### Code Example 2: Go 1.22+ Pattern Matching

In Go 1.22, `ServeMux` was significantly enhanced, adding native support for HTTP method specification, path parameters, and wildcards.

```go
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"
)

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

var users = map[int]*User{
	1: {ID: 1, Name: "Tanaka", Email: "tanaka@example.com"},
	2: {ID: 2, Name: "Suzuki", Email: "suzuki@example.com"},
}

func main() {
	mux := http.NewServeMux()

	// Method + path pattern (Go 1.22+)
	mux.HandleFunc("GET /users", listUsers)
	mux.HandleFunc("POST /users", createUser)
	mux.HandleFunc("GET /users/{id}", getUser)       // Path parameter
	mux.HandleFunc("PUT /users/{id}", updateUser)
	mux.HandleFunc("DELETE /users/{id}", deleteUser)

	// Wildcard (Go 1.22+)
	mux.HandleFunc("GET /files/{path...}", serveFile) // Capture remaining path

	// Priority: more specific patterns take precedence
	mux.HandleFunc("GET /users/me", getCurrentUser)   // Prioritized over /users/{id}

	server := &http.Server{
		Addr:    ":8080",
		Handler: mux,
	}
	server.ListenAndServe()
}

func listUsers(w http.ResponseWriter, r *http.Request) {
	userList := make([]*User, 0, len(users))
	for _, u := range users {
		userList = append(userList, u)
	}
	writeJSON(w, http.StatusOK, userList)
}

func getUser(w http.ResponseWriter, r *http.Request) {
	idStr := r.PathValue("id") // Go 1.22+ path parameter
	id, err := strconv.Atoi(idStr)
	if err != nil {
		writeError(w, http.StatusBadRequest, "invalid user id")
		return
	}

	user, ok := users[id]
	if !ok {
		writeError(w, http.StatusNotFound, "user not found")
		return
	}
	writeJSON(w, http.StatusOK, user)
}

func createUser(w http.ResponseWriter, r *http.Request) {
	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		writeError(w, http.StatusBadRequest, "invalid json")
		return
	}
	user.ID = len(users) + 1
	users[user.ID] = &user
	writeJSON(w, http.StatusCreated, user)
}

func updateUser(w http.ResponseWriter, r *http.Request) {
	idStr := r.PathValue("id")
	id, _ := strconv.Atoi(idStr)

	var update User
	if err := json.NewDecoder(r.Body).Decode(&update); err != nil {
		writeError(w, http.StatusBadRequest, "invalid json")
		return
	}

	user, ok := users[id]
	if !ok {
		writeError(w, http.StatusNotFound, "user not found")
		return
	}

	if update.Name != "" {
		user.Name = update.Name
	}
	if update.Email != "" {
		user.Email = update.Email
	}
	writeJSON(w, http.StatusOK, user)
}

func deleteUser(w http.ResponseWriter, r *http.Request) {
	idStr := r.PathValue("id")
	id, _ := strconv.Atoi(idStr)
	delete(users, id)
	w.WriteHeader(http.StatusNoContent)
}

func getCurrentUser(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, users[1]) // Dummy: current user
}

func serveFile(w http.ResponseWriter, r *http.Request) {
	path := r.PathValue("path") // Wildcard: entire remaining path
	fmt.Fprintf(w, "Serving file: %s", path)
}

// --- Helper functions ---

func writeJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, map[string]string{"error": message})
}
```

---

## 2. Middleware Patterns

Middleware is a function with the signature `func(http.Handler) http.Handler` that injects cross-cutting concerns (logging, authentication, CORS, etc.) before and after request processing.

### Code Example 3: Basic Middleware

```go
package main

import (
	"log"
	"net/http"
	"time"
)

// loggingMiddleware records request logs
func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		// Custom ResponseWriter to capture status code
		wrapped := &responseWriter{ResponseWriter: w, statusCode: http.StatusOK}

		next.ServeHTTP(wrapped, r)

		log.Printf(
			"%s %s %d %v",
			r.Method,
			r.URL.Path,
			wrapped.statusCode,
			time.Since(start),
		)
	})
}

// responseWriter is a wrapper that captures the status code
type responseWriter struct {
	http.ResponseWriter
	statusCode int
}

func (rw *responseWriter) WriteHeader(code int) {
	rw.statusCode = code
	rw.ResponseWriter.WriteHeader(code)
}

// authMiddleware performs authentication checks
func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get("Authorization")
		if token == "" {
			http.Error(w, `{"error":"unauthorized"}`, http.StatusUnauthorized)
			return
		}
		// Token validation (omitted)
		next.ServeHTTP(w, r)
	})
}

// corsMiddleware sets CORS headers
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}

// recoveryMiddleware recovers from panics
func recoveryMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if err := recover(); err != nil {
				log.Printf("PANIC: %v", err)
				http.Error(w, `{"error":"internal server error"}`, http.StatusInternalServerError)
			}
		}()
		next.ServeHTTP(w, r)
	})
}

// rateLimitMiddleware applies rate limiting
func rateLimitMiddleware(rps int) func(http.Handler) http.Handler {
	limiter := make(chan struct{}, rps)
	// Token replenishment
	go func() {
		ticker := time.NewTicker(time.Second / time.Duration(rps))
		defer ticker.Stop()
		for range ticker.C {
			select {
			case limiter <- struct{}{}:
			default:
			}
		}
	}()
	// Initial tokens
	for i := 0; i < rps; i++ {
		limiter <- struct{}{}
	}

	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			select {
			case <-limiter:
				next.ServeHTTP(w, r)
			default:
				http.Error(w, `{"error":"rate limit exceeded"}`, http.StatusTooManyRequests)
			}
		})
	}
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/data", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusOK, map[string]string{"data": "hello"})
	})

	// Middleware chain (applied from inner to outer)
	handler := recoveryMiddleware(
		loggingMiddleware(
			corsMiddleware(
				authMiddleware(mux),
			),
		),
	)

	http.ListenAndServe(":8080", handler)
}
```

### Code Example 4: Middleware Chain Builder Helper

```go
package main

import "net/http"

// Middleware is the type definition for middleware
type Middleware func(http.Handler) http.Handler

// Chain concatenates multiple middleware
func Chain(handler http.Handler, middlewares ...Middleware) http.Handler {
	// Applied in reverse order (first middleware becomes outermost)
	for i := len(middlewares) - 1; i >= 0; i-- {
		handler = middlewares[i](handler)
	}
	return handler
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/users", listUsersHandler)
	mux.HandleFunc("GET /api/public", publicHandler)

	// Common middleware
	commonMiddlewares := []Middleware{
		recoveryMiddleware,
		loggingMiddleware,
		corsMiddleware,
	}

	// API requiring authentication
	authMiddlewares := append(commonMiddlewares, authMiddleware)
	authHandler := Chain(mux, authMiddlewares...)

	// Apply common middleware to all routes
	handler := Chain(mux, commonMiddlewares...)
	_ = handler
	_ = authHandler
}

func listUsersHandler(w http.ResponseWriter, r *http.Request) {}
func publicHandler(w http.ResponseWriter, r *http.Request)    {}
```

### Code Example 5: Context-Integrated Middleware

```go
package main

import (
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/google/uuid"
)

type contextKey string

const (
	requestIDKey contextKey = "requestID"
	userIDKey    contextKey = "userID"
)

// requestIDMiddleware generates a request ID and sets it in the Context
func requestIDMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		reqID := r.Header.Get("X-Request-ID")
		if reqID == "" {
			reqID = uuid.New().String()
		}

		ctx := context.WithValue(r.Context(), requestIDKey, reqID)
		w.Header().Set("X-Request-ID", reqID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

// getRequestID retrieves the request ID from the Context
func getRequestID(ctx context.Context) string {
	id, _ := ctx.Value(requestIDKey).(string)
	return id
}

// structuredLoggingMiddleware outputs structured logs
func structuredLoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		reqID := getRequestID(r.Context())
		log.Printf("request_id=%s method=%s path=%s remote=%s",
			reqID, r.Method, r.URL.Path, r.RemoteAddr)
		next.ServeHTTP(w, r)
	})
}

func handler(w http.ResponseWriter, r *http.Request) {
	reqID := getRequestID(r.Context())
	fmt.Fprintf(w, "Request ID: %s", reqID)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /api/data", handler)

	h := requestIDMiddleware(structuredLoggingMiddleware(mux))
	http.ListenAndServe(":8080", h)
}
```

---

## 3. JSON Response and Request Processing

### Code Example 6: Generic JSON Processing

```go
package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strings"
)

// --- Response helpers ---

// APIResponse is a unified API response
type APIResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   *APIError   `json:"error,omitempty"`
}

// APIError contains error information
type APIError struct {
	Code    string `json:"code"`
	Message string `json:"message"`
}

// respondJSON sends a JSON response
func respondJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)

	resp := APIResponse{
		Success: status >= 200 && status < 300,
		Data:    data,
	}
	json.NewEncoder(w).Encode(resp)
}

// respondError sends an error response
func respondError(w http.ResponseWriter, status int, code, message string) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)

	resp := APIResponse{
		Success: false,
		Error: &APIError{
			Code:    code,
			Message: message,
		},
	}
	json.NewEncoder(w).Encode(resp)
}

// --- Request body decoding ---

// decodeJSON decodes the request body as JSON
func decodeJSON(r *http.Request, dst interface{}) error {
	// Content-Type check
	ct := r.Header.Get("Content-Type")
	if !strings.HasPrefix(ct, "application/json") {
		return errors.New("content-type must be application/json")
	}

	// Body size limit (1MB)
	r.Body = http.MaxBytesReader(nil, r.Body, 1<<20)

	dec := json.NewDecoder(r.Body)
	dec.DisallowUnknownFields() // Reject unknown fields

	if err := dec.Decode(dst); err != nil {
		return fmt.Errorf("invalid json: %w", err)
	}

	// Check that the body doesn't contain multiple JSON objects
	if dec.More() {
		return errors.New("request body must contain a single json object")
	}

	return nil
}

// --- Handlers ---

type CreateUserRequest struct {
	Name  string `json:"name"`
	Email string `json:"email"`
}

func (r *CreateUserRequest) Validate() error {
	if r.Name == "" {
		return errors.New("name is required")
	}
	if r.Email == "" {
		return errors.New("email is required")
	}
	if !strings.Contains(r.Email, "@") {
		return errors.New("invalid email format")
	}
	return nil
}

func createUserHandler(w http.ResponseWriter, r *http.Request) {
	var req CreateUserRequest
	if err := decodeJSON(r, &req); err != nil {
		respondError(w, http.StatusBadRequest, "INVALID_JSON", err.Error())
		return
	}

	if err := req.Validate(); err != nil {
		respondError(w, http.StatusBadRequest, "VALIDATION_ERROR", err.Error())
		return
	}

	user := User{ID: 1, Name: req.Name, Email: req.Email}
	respondJSON(w, http.StatusCreated, user)
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("POST /api/users", createUserHandler)
	http.ListenAndServe(":8080", mux)
}
```

### Code Example 7: Streaming JSON

```go
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

// streamEvents streams data using Server-Sent Events (SSE)
func streamEvents(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "streaming not supported", http.StatusInternalServerError)
		return
	}

	for i := 0; i < 10; i++ {
		select {
		case <-r.Context().Done():
			// Client disconnected
			return
		default:
			data, _ := json.Marshal(map[string]interface{}{
				"event": i,
				"time":  time.Now().Format(time.RFC3339),
			})
			fmt.Fprintf(w, "data: %s\n\n", data)
			flusher.Flush()
			time.Sleep(1 * time.Second)
		}
	}
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /events", streamEvents)
	http.ListenAndServe(":8080", mux)
}
```

---

## 4. HTTP Client

### Code Example 8: Production-Quality HTTP Client

```go
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"
)

// HTTPClient is a reusable HTTP client
type HTTPClient struct {
	client  *http.Client
	baseURL string
}

// NewHTTPClient creates a configured HTTP client
func NewHTTPClient(baseURL string) *HTTPClient {
	return &HTTPClient{
		client: &http.Client{
			Timeout: 30 * time.Second,
			Transport: &http.Transport{
				MaxIdleConns:        100,
				MaxIdleConnsPerHost: 10,
				IdleConnTimeout:     90 * time.Second,
			},
		},
		baseURL: baseURL,
	}
}

// Get sends a GET request
func (c *HTTPClient) Get(ctx context.Context, path string, result interface{}) error {
	req, err := http.NewRequestWithContext(ctx, "GET", c.baseURL+path, nil)
	if err != nil {
		return fmt.Errorf("create request: %w", err)
	}

	req.Header.Set("Accept", "application/json")

	resp, err := c.client.Do(req)
	if err != nil {
		return fmt.Errorf("do request: %w", err)
	}
	defer resp.Body.Close()

	// Response body size limit
	body, err := io.ReadAll(io.LimitReader(resp.Body, 10<<20)) // 10MB limit
	if err != nil {
		return fmt.Errorf("read body: %w", err)
	}

	if resp.StatusCode >= 400 {
		return fmt.Errorf("HTTP %d: %s", resp.StatusCode, string(body))
	}

	if result != nil {
		if err := json.Unmarshal(body, result); err != nil {
			return fmt.Errorf("decode json: %w", err)
		}
	}

	return nil
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client := NewHTTPClient("https://httpbin.org")

	var result map[string]interface{}
	if err := client.Get(ctx, "/get", &result); err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}
	fmt.Printf("Result: %v\n", result)
}
```

### Code Example 9: HTTP Client with Retry

```go
package main

import (
	"context"
	"fmt"
	"math"
	"math/rand"
	"net/http"
	"time"
)

// RetryConfig holds retry configuration
type RetryConfig struct {
	MaxRetries  int
	BaseDelay   time.Duration
	MaxDelay    time.Duration
	RetryOn     []int // HTTP status codes to retry on
}

// DefaultRetryConfig is the default retry configuration
var DefaultRetryConfig = RetryConfig{
	MaxRetries: 3,
	BaseDelay:  100 * time.Millisecond,
	MaxDelay:   5 * time.Second,
	RetryOn:    []int{429, 500, 502, 503, 504},
}

// doWithRetry executes an HTTP request with retries
func doWithRetry(ctx context.Context, client *http.Client, req *http.Request, config RetryConfig) (*http.Response, error) {
	var lastErr error

	for attempt := 0; attempt <= config.MaxRetries; attempt++ {
		if attempt > 0 {
			// Exponential backoff + jitter
			delay := time.Duration(math.Pow(2, float64(attempt-1))) * config.BaseDelay
			jitter := time.Duration(rand.Int63n(int64(delay / 2)))
			delay = delay + jitter

			if delay > config.MaxDelay {
				delay = config.MaxDelay
			}

			select {
			case <-ctx.Done():
				return nil, ctx.Err()
			case <-time.After(delay):
			}
		}

		// Clone the request (for Body reuse)
		clonedReq := req.Clone(ctx)

		resp, err := client.Do(clonedReq)
		if err != nil {
			lastErr = fmt.Errorf("attempt %d: %w", attempt+1, err)
			continue
		}

		// Check if the status code is retryable
		if shouldRetry(resp.StatusCode, config.RetryOn) {
			resp.Body.Close()
			lastErr = fmt.Errorf("attempt %d: HTTP %d", attempt+1, resp.StatusCode)
			continue
		}

		return resp, nil
	}

	return nil, fmt.Errorf("all %d attempts failed: %w", config.MaxRetries+1, lastErr)
}

func shouldRetry(statusCode int, retryOn []int) bool {
	for _, code := range retryOn {
		if statusCode == code {
			return true
		}
	}
	return false
}

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	client := &http.Client{Timeout: 10 * time.Second}
	req, _ := http.NewRequestWithContext(ctx, "GET", "https://httpbin.org/status/500", nil)

	resp, err := doWithRetry(ctx, client, req, DefaultRetryConfig)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}
	defer resp.Body.Close()
	fmt.Printf("Status: %d\n", resp.StatusCode)
}
```

---

## 5. Graceful Shutdown

### Code Example 10: Complete Graceful Shutdown

```go
package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, `{"status":"ok"}`)
	})

	mux.HandleFunc("GET /slow", func(w http.ResponseWriter, r *http.Request) {
		// Simulate a slow operation
		select {
		case <-r.Context().Done():
			log.Println("Client disconnected during slow request")
			return
		case <-time.After(5 * time.Second):
			fmt.Fprintf(w, "Completed after 5 seconds")
		}
	})

	server := &http.Server{
		Addr:         ":8080",
		Handler:      mux,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start server in the background
	serverErr := make(chan error, 1)
	go func() {
		log.Printf("Server starting on %s", server.Addr)
		if err := server.ListenAndServe(); !errors.Is(err, http.ErrServerClosed) {
			serverErr <- err
		}
	}()

	// Wait for signal
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	select {
	case err := <-serverErr:
		log.Fatalf("Server error: %v", err)
	case sig := <-quit:
		log.Printf("Received signal: %v", sig)
	}

	// Graceful Shutdown
	log.Println("Shutting down server...")
	shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer shutdownCancel()

	if err := server.Shutdown(shutdownCtx); err != nil {
		log.Printf("Server shutdown error: %v", err)
		server.Close() // Force stop
	}

	log.Println("Server stopped gracefully")
}
```

### Code Example 11: Graceful Shutdown with Health Check Support

In Kubernetes environments, a grace period (preStop hook) is needed between receiving SIGTERM and the health check starting to fail.

```go
package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"sync/atomic"
	"syscall"
	"time"
)

var isReady int32 = 1 // 1 = ready, 0 = shutting down

func healthHandler(w http.ResponseWriter, r *http.Request) {
	if atomic.LoadInt32(&isReady) == 1 {
		w.WriteHeader(http.StatusOK)
		fmt.Fprintf(w, `{"status":"ok"}`)
	} else {
		w.WriteHeader(http.StatusServiceUnavailable)
		fmt.Fprintf(w, `{"status":"shutting_down"}`)
	}
}

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /healthz", healthHandler)
	mux.HandleFunc("GET /readyz", healthHandler)
	mux.HandleFunc("GET /api/data", func(w http.ResponseWriter, r *http.Request) {
		time.Sleep(100 * time.Millisecond)
		fmt.Fprintf(w, `{"data":"hello"}`)
	})

	server := &http.Server{
		Addr:    ":8080",
		Handler: mux,
	}

	go func() {
		log.Fatal(server.ListenAndServe())
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Received shutdown signal")

	// Step 1: Fail the health check (wait for load balancer to stop sending traffic)
	atomic.StoreInt32(&isReady, 0)
	log.Println("Health check now returns 503, waiting for LB drain...")
	time.Sleep(10 * time.Second) // Part of Kubernetes terminationGracePeriodSeconds

	// Step 2: Stop the server
	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Printf("Shutdown error: %v", err)
	}
	log.Println("Server stopped")
}
```

---

## 6. Testing with httptest

### Code Example 12: Unit Testing Handlers

```go
package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestGetUser(t *testing.T) {
	// Create request
	req := httptest.NewRequest("GET", "/users/1", nil)
	rec := httptest.NewRecorder()

	// Execute handler
	getUser(rec, req)

	// Verify response
	resp := rec.Result()
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		t.Errorf("expected status 200, got %d", resp.StatusCode)
	}

	contentType := resp.Header.Get("Content-Type")
	if !strings.Contains(contentType, "application/json") {
		t.Errorf("expected Content-Type application/json, got %s", contentType)
	}

	var user User
	if err := json.NewDecoder(resp.Body).Decode(&user); err != nil {
		t.Fatalf("decode json: %v", err)
	}

	if user.Name != "Tanaka" {
		t.Errorf("expected name Tanaka, got %s", user.Name)
	}
}

func TestCreateUser(t *testing.T) {
	body := `{"name":"Yamada","email":"yamada@example.com"}`
	req := httptest.NewRequest("POST", "/users", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()

	createUserHandler(rec, req)

	resp := rec.Result()
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated {
		t.Errorf("expected status 201, got %d", resp.StatusCode)
	}
}

func TestCreateUser_InvalidJSON(t *testing.T) {
	body := `{invalid json}`
	req := httptest.NewRequest("POST", "/users", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()

	createUserHandler(rec, req)

	resp := rec.Result()
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusBadRequest {
		t.Errorf("expected status 400, got %d", resp.StatusCode)
	}
}
```

### Code Example 13: Table-Driven Tests

```go
package main

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestUserEndpoints(t *testing.T) {
	tests := []struct {
		name           string
		method         string
		path           string
		body           string
		expectedStatus int
	}{
		{
			name:           "list users",
			method:         "GET",
			path:           "/users",
			expectedStatus: http.StatusOK,
		},
		{
			name:           "get existing user",
			method:         "GET",
			path:           "/users/1",
			expectedStatus: http.StatusOK,
		},
		{
			name:           "get non-existing user",
			method:         "GET",
			path:           "/users/999",
			expectedStatus: http.StatusNotFound,
		},
		{
			name:           "create user with valid data",
			method:         "POST",
			path:           "/users",
			body:           `{"name":"Test","email":"test@example.com"}`,
			expectedStatus: http.StatusCreated,
		},
		{
			name:           "create user with missing name",
			method:         "POST",
			path:           "/users",
			body:           `{"email":"test@example.com"}`,
			expectedStatus: http.StatusBadRequest,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			var req *http.Request
			if tt.body != "" {
				req = httptest.NewRequest(tt.method, tt.path, strings.NewReader(tt.body))
				req.Header.Set("Content-Type", "application/json")
			} else {
				req = httptest.NewRequest(tt.method, tt.path, nil)
			}

			rec := httptest.NewRecorder()

			// Pass the request to the router
			mux := setupRoutes() // Set up the router under test
			mux.ServeHTTP(rec, req)

			resp := rec.Result()
			defer resp.Body.Close()

			if resp.StatusCode != tt.expectedStatus {
				t.Errorf("expected status %d, got %d", tt.expectedStatus, resp.StatusCode)
			}
		})
	}
}

func setupRoutes() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /users", listUsers)
	mux.HandleFunc("POST /users", createUserHandler)
	mux.HandleFunc("GET /users/{id}", getUser)
	return mux
}
```

### Code Example 14: Integration Tests with httptest.Server

```go
package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestUserAPI_Integration(t *testing.T) {
	mux := setupRoutes()

	// Start test server
	server := httptest.NewServer(mux)
	defer server.Close()

	// Make requests with an actual HTTP client
	client := server.Client()

	t.Run("list users", func(t *testing.T) {
		resp, err := client.Get(server.URL + "/users")
		if err != nil {
			t.Fatalf("request failed: %v", err)
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			t.Errorf("expected 200, got %d", resp.StatusCode)
		}

		var users []User
		json.NewDecoder(resp.Body).Decode(&users)
		if len(users) == 0 {
			t.Error("expected at least one user")
		}
	})

	t.Run("get user by id", func(t *testing.T) {
		resp, err := client.Get(fmt.Sprintf("%s/users/1", server.URL))
		if err != nil {
			t.Fatalf("request failed: %v", err)
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			t.Errorf("expected 200, got %d", resp.StatusCode)
		}
	})
}
```

### Code Example 15: Testing Middleware

```go
package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestLoggingMiddleware(t *testing.T) {
	inner := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	handler := loggingMiddleware(inner)

	req := httptest.NewRequest("GET", "/test", nil)
	rec := httptest.NewRecorder()

	handler.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", rec.Code)
	}
}

func TestAuthMiddleware_NoToken(t *testing.T) {
	inner := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	handler := authMiddleware(inner)

	req := httptest.NewRequest("GET", "/test", nil)
	// No Authorization header
	rec := httptest.NewRecorder()

	handler.ServeHTTP(rec, req)

	if rec.Code != http.StatusUnauthorized {
		t.Errorf("expected 401, got %d", rec.Code)
	}
}

func TestAuthMiddleware_WithToken(t *testing.T) {
	inner := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	handler := authMiddleware(inner)

	req := httptest.NewRequest("GET", "/test", nil)
	req.Header.Set("Authorization", "Bearer valid-token")
	rec := httptest.NewRecorder()

	handler.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", rec.Code)
	}
}

func TestCORSMiddleware(t *testing.T) {
	inner := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	handler := corsMiddleware(inner)

	// OPTIONS preflight request
	req := httptest.NewRequest("OPTIONS", "/test", nil)
	rec := httptest.NewRecorder()

	handler.ServeHTTP(rec, req)

	if rec.Code != http.StatusNoContent {
		t.Errorf("expected 204, got %d", rec.Code)
	}

	if got := rec.Header().Get("Access-Control-Allow-Origin"); got != "*" {
		t.Errorf("expected CORS header *, got %s", got)
	}
}
```

---

## 7. File Upload and Download

### Code Example 16: File Upload

```go
package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
)

func uploadHandler(w http.ResponseWriter, r *http.Request) {
	// Parse multipart form (max 32MB)
	if err := r.ParseMultipartForm(32 << 20); err != nil {
		http.Error(w, "file too large", http.StatusBadRequest)
		return
	}

	file, header, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "missing file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Sanitize filename
	filename := filepath.Base(header.Filename)

	// Destination path
	savePath := filepath.Join("uploads", filename)

	// Save file
	dst, err := os.Create(savePath)
	if err != nil {
		http.Error(w, "failed to create file", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	written, err := io.Copy(dst, file)
	if err != nil {
		http.Error(w, "failed to save file", http.StatusInternalServerError)
		return
	}

	respondJSON(w, http.StatusOK, map[string]interface{}{
		"filename": filename,
		"size":     written,
	})
}

func downloadHandler(w http.ResponseWriter, r *http.Request) {
	filename := r.PathValue("filename")
	filePath := filepath.Join("uploads", filepath.Base(filename))

	// Check file existence
	info, err := os.Stat(filePath)
	if os.IsNotExist(err) {
		http.Error(w, "file not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Disposition", fmt.Sprintf("attachment; filename=%q", filename))
	w.Header().Set("Content-Type", "application/octet-stream")
	w.Header().Set("Content-Length", fmt.Sprintf("%d", info.Size()))

	http.ServeFile(w, r, filePath)
}

func main() {
	os.MkdirAll("uploads", 0755)

	mux := http.NewServeMux()
	mux.HandleFunc("POST /upload", uploadHandler)
	mux.HandleFunc("GET /download/{filename}", downloadHandler)
	http.ListenAndServe(":8080", mux)
}
```

---

## 8. ASCII Diagrams

### Diagram 1: HTTP Request Processing Flow

```
Client Request
     |
     v
+----------+   +----------+   +----------+   +----------+
| Recovery |-->| Logging  |-->| Auth     |-->| CORS     |
| MW       |   | MW       |   | MW       |   | MW       |
+----------+   +----------+   +----------+   +----------+
                                                   |
                                                   v
                                             +----------+   +----------+
                                             | ServeMux |-->| Handler  |
                                             | (Router) |   | (Logic)  |
                                             +----------+   +----------+
                                                                  |
     +------------------------------------------------------------+
     |              Response (passes through in reverse order)
     v
  Client
```

### Diagram 2: Handler Interface

```
+-------------------------------+
| type Handler interface {      |
|   ServeHTTP(ResponseWriter,   |
|             *Request)         |
| }                             |
+-----------+-------------------+
            | implements
    +-------+-------+
    v       v       v
 ServeMux  HandlerFunc  Custom Handler
 (router)  (function    (method on
            to Handler   a struct)
            adapter)
```

### Diagram 3: Middleware Chain

```
Middleware stacking (nested structure):

recovery(logging(auth(cors(mux))))

Request direction ->
+-------------------------------------+
| recovery                            |
|  +------------------------------+   |
|  | logging                      |   |
|  |  +----------------------+   |   |
|  |  | auth                 |   |   |
|  |  |  +--------------+   |   |   |
|  |  |  | cors         |   |   |   |
|  |  |  |  +--------+  |   |   |   |
|  |  |  |  |ServeMux|  |   |   |   |
|  |  |  |  |->Handler| |   |   |   |
|  |  |  |  +--------+  |   |   |   |
|  |  |  +--------------+   |   |   |
|  |  +----------------------+   |   |
|  +------------------------------+   |
+-------------------------------------+
<- Response direction
```

### Diagram 4: Go 1.22 Pattern Matching

```
Pattern:  "GET /users/{id}"
             |       |    |
             |       |    +-- Path parameter: r.PathValue("id")
             |       +------ Path prefix
             +-------------- HTTP method constraint

Priority (more specific patterns take precedence):
  "GET /users/me"       > "GET /users/{id}"
  "GET /users/{id}"     > "GET /users/{path...}"
  "GET /users/{id}"     > "GET /{rest...}"
```

### Diagram 5: Graceful Shutdown Flow

```
                 SIGTERM
                    |
                    v
  +---------------------------------+
  | 1. Health check -> 503          | <- LB stops sending traffic
  |    atomic.Store(&isReady, 0)    |
  |    wait(10s)                    |
  +---------------------------------+
  | 2. server.Shutdown(ctx)         | <- Reject new connections
  |    Wait for in-flight requests  |
  +---------------------------------+
  | 3. All requests completed       |
  |    or timeout(30s)              |
  +---------------------------------+
  | 4. server.Close() (force stop)  | <- Fallback on timeout
  +---------------------------------+
```

---

## 9. Comparison Tables

### Table 1: ServeMux Before Go 1.21 vs Go 1.22+

| Feature | Before Go 1.21 | Go 1.22+ |
|---------|---------------|----------|
| Method specification | Not possible (manual check) | `"GET /path"` |
| Path parameters | Not possible (third-party required) | `"/users/{id}"` |
| Wildcards | Not possible | `"/files/{path...}"` |
| Priority | Longest match | Most specific pattern |
| External dependencies | gorilla/mux, chi, etc. required | Standard library sufficient |
| Path parameter retrieval | mux.Vars(r), etc. | r.PathValue("id") |

### Table 2: Standard net/http vs Third-Party Frameworks

| Item | net/http (1.22+) | Gin | Echo | chi |
|------|-----------------|-----|------|-----|
| Performance | High | Very high | Very high | Very high |
| Routing | Pattern matching | Radix tree | Radix tree | Radix tree |
| Validation | None | binding | validator | None |
| Swagger generation | Manual | swaggo support | swaggo support | swaggo support |
| Dependencies | None | Yes | Yes | Few |
| Standard compatibility | Native | Custom Context | Custom Context | net/http compatible |

### Table 3: http.Server Timeout Settings

| Parameter | Target | Recommended | Description |
|-----------|--------|-------------|-------------|
| ReadTimeout | Request reading | 5-15s | Entire header + body |
| ReadHeaderTimeout | Headers only | 5s | Slowloris protection |
| WriteTimeout | Response writing | 10-30s | Includes handler processing time |
| IdleTimeout | Keep-Alive connections | 60-120s | Idle connection retention time |
| MaxHeaderBytes | Header size | 1MB | DoS protection |

### Table 4: HTTP Client Transport Settings

| Parameter | Default | Recommended | Description |
|-----------|---------|-------------|-------------|
| MaxIdleConns | 100 | 100 | Total idle connections across all hosts |
| MaxIdleConnsPerHost | 2 | 10-25 | Idle connections per host |
| IdleConnTimeout | 90s | 90s | Idle connection timeout |
| TLSHandshakeTimeout | 10s | 10s | TLS handshake time limit |
| ResponseHeaderTimeout | None | 30s | Response header wait time |
| ExpectContinueTimeout | 1s | 1s | 100-continue wait time |

---

## 10. Anti-Patterns

### Anti-Pattern 1: Server Without Timeout Settings

```go
// BAD: Default http.ListenAndServe
http.ListenAndServe(":8080", mux) // No timeout -> vulnerable to Slowloris attacks

// GOOD: Explicitly set timeouts
server := &http.Server{
	Addr:              ":8080",
	Handler:           mux,
	ReadTimeout:       10 * time.Second,
	ReadHeaderTimeout: 5 * time.Second,
	WriteTimeout:      10 * time.Second,
	IdleTimeout:       120 * time.Second,
	MaxHeaderBytes:    1 << 20, // 1MB
}
server.ListenAndServe()
```

### Anti-Pattern 2: Double Writing to ResponseWriter

```go
// BAD: Calling http.Error after WriteHeader
func handler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	// ... error occurs during processing
	http.Error(w, "error", http.StatusInternalServerError) // Has no effect!
}

// GOOD: Perform error checks first
func handler(w http.ResponseWriter, r *http.Request) {
	data, err := process()
	if err != nil {
		http.Error(w, "error", http.StatusInternalServerError)
		return // Always return
	}
	w.WriteHeader(http.StatusOK)
	w.Write(data)
}
```

### Anti-Pattern 3: Using http.DefaultClient

```go
// BAD: Default client without timeout
resp, err := http.Get("https://example.com/api") // No timeout

// GOOD: Custom client with timeout
client := &http.Client{
	Timeout: 30 * time.Second,
	Transport: &http.Transport{
		MaxIdleConnsPerHost: 10,
	},
}
resp, err := client.Get("https://example.com/api")
```

### Anti-Pattern 4: Forgetting to Read Response Body

```go
// BAD: Closing without reading the response body
resp, err := http.Get("https://example.com")
if err != nil {
	return err
}
resp.Body.Close() // Body not read -> TCP connection cannot be reused

// GOOD: Fully read the body before closing
resp, err := http.Get("https://example.com")
if err != nil {
	return err
}
defer resp.Body.Close()
io.Copy(io.Discard, resp.Body) // Fully read the body
```

### Anti-Pattern 5: Using ResponseWriter in a Goroutine

```go
// BAD: Using ResponseWriter after handler returns
func handler(w http.ResponseWriter, r *http.Request) {
	go func() {
		time.Sleep(1 * time.Second)
		fmt.Fprintf(w, "delayed response") // Handler already returned -> race condition
	}()
}

// GOOD: Complete all necessary processing within the handler
func handler(w http.ResponseWriter, r *http.Request) {
	// Complete processing synchronously
	result := process()
	fmt.Fprintf(w, "result: %s", result)

	// Handle async tasks separately
	go func() {
		sendNotification(result)
	}()
}
```

---

## 11. Production Best Practices

### Security Header Configuration

```go
func securityHeadersMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("X-Content-Type-Options", "nosniff")
		w.Header().Set("X-Frame-Options", "DENY")
		w.Header().Set("X-XSS-Protection", "1; mode=block")
		w.Header().Set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
		w.Header().Set("Content-Security-Policy", "default-src 'self'")
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")
		next.ServeHTTP(w, r)
	})
}
```

### Distributed Tracing with Request-ID

```go
func traceMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		traceID := r.Header.Get("X-Trace-ID")
		if traceID == "" {
			traceID = generateUUID()
		}
		spanID := generateUUID()

		ctx := context.WithValue(r.Context(), "traceID", traceID)
		ctx = context.WithValue(ctx, "spanID", spanID)

		w.Header().Set("X-Trace-ID", traceID)
		w.Header().Set("X-Span-ID", spanID)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func generateUUID() string {
	return "uuid-placeholder" // In practice, use uuid.New().String()
}
```

---

## 12. FAQ

### Q1: Can a production server be built with net/http alone?

With Go 1.22 and later, it is entirely possible. Path parameters, method matching, and wildcards are now natively supported. However, validation, automatic Swagger generation, BindJSON, and similar features still require third-party libraries. For simple APIs and microservices, the standard library is sufficient.

### Q2: How should Graceful Shutdown be implemented?

Use `server.Shutdown(ctx)`. Catch SIGTERM, wait for in-flight requests to complete, then shut down. In Kubernetes environments, also consider the health check 503 switch and preStop hook wait time.

### Q3: Are timeouts necessary for http.Client as well?

Absolutely. The default `http.DefaultClient` has no timeout. Use `&http.Client{Timeout: 30 * time.Second}` or Context-based timeouts. For external service calls, also consider combining retries with a Circuit Breaker.

### Q4: What ordering rules apply when writing to ResponseWriter?

Follow the order: Headers -> WriteHeader -> Body. Modifying headers after `WriteHeader` or the first `Write` call will have no effect. `http.Error` internally calls `WriteHeader`, so any subsequent status code changes are ignored.

### Q5: Is ServeMux thread-safe?

`http.ServeMux` is thread-safe. There are no issues if routes are registered before the server starts. However, dynamic route addition after server startup requires protection with `sync.Mutex`.

### Q6: What is the relationship between Context cancellation and ResponseWriter?

When a client disconnects, `r.Context().Done()` fires. Long-running handlers should check the context state and abort processing if the client has disconnected. Note that writes to `ResponseWriter` often do not error out even after context cancellation (though the output is meaningless).

### Q7: How should http.FileServer be used, and what are the caveats?

`http.FileServer(http.Dir("./static"))` serves static files. However, directory listing is enabled by default. To disable it, implement a custom FileSystem or place an `index.html` in each directory.

---


## FAQ

### Q1: What is the most important point when learning this topic?

Gaining practical experience is the most important aspect. Understanding deepens not just through theory but by actually writing code and verifying its behavior.

### Q2: What are common mistakes beginners make?

Skipping the basics and jumping straight to advanced topics. We recommend thoroughly understanding the fundamental concepts explained in this guide before moving to the next step.

### Q3: How is this knowledge applied in practice?

Knowledge of this topic is frequently applied in daily development work. It becomes particularly important during code reviews and architecture design.

---

## Summary

| Concept | Key Point |
|---------|-----------|
| Handler | Interface with `ServeHTTP(w, r)` |
| ServeMux | Go 1.22+ supports methods and path parameters |
| Middleware | `func(http.Handler) http.Handler` pattern |
| Server settings | Timeouts must always be configured |
| HTTP Client | Timeout and Transport settings are essential |
| Graceful Shutdown | server.Shutdown(ctx) + signal handling |
| httptest | Recorder/Request/Server for testing |

---

## Recommended Next Reads

- [01-gin-echo.md](./01-gin-echo.md) -- Gin/Echo Frameworks
- [02-database.md](./02-database.md) -- Database Connectivity
- [04-testing.md](./04-testing.md) -- HTTP Testing

---

## References

1. **Go Standard Library: net/http** -- https://pkg.go.dev/net/http
2. **Go Blog, "Routing Enhancements for Go 1.22"** -- https://go.dev/blog/routing-enhancements
3. **Go Wiki: LearnServerProgramming** -- https://go.dev/wiki/LearnServerProgramming
4. **Cloudflare Blog, "So you want to expose Go on the Internet"** -- https://blog.cloudflare.com/exposing-go-on-the-internet/



===== SOURCE: 02-programming/go-practical-guide/docs/02-web/01-gin-echo.md =====

# Gin / Echo -- Go Web Frameworks

> Gin and Echo are the most popular web frameworks in Go, providing high-performance routing, middleware, validation, and Swagger integration.

---

## What You Will Learn in This Chapter

1. **Gin / Echo Basics** -- Routing and Handlers
2. **Middleware and Validation** -- Implementing Cross-Cutting Concerns
3. **Swagger / OpenAPI** -- Automatic API Specification Generation
4. **Testing** -- Testing Techniques for Handlers and Middleware
5. **Production Operations** -- Graceful Shutdown, Structured Logging, and Health Checks


## Prerequisites

Before reading this guide, having the following knowledge will help deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts
- Familiarity with the content of [net/http -- Go Standard HTTP Server](./00-net-http.md)

---

### Code Example 1: Gin Basic Setup

```go
import "github.com/gin-gonic/gin"

func main() {
    r := gin.Default() // Includes Logger + Recovery middleware

    r.GET("/users", listUsers)
    r.POST("/users", createUser)
    r.GET("/users/:id", getUser)
    r.PUT("/users/:id", updateUser)
    r.DELETE("/users/:id", deleteUser)

    r.Run(":8080")
}

func getUser(c *gin.Context) {
    id := c.Param("id")
    c.JSON(http.StatusOK, gin.H{"id": id, "name": "Tanaka"})
}
```

Gin's `Default()` returns an engine with `Logger` and `Recovery` middleware automatically included. Using `New()` gives you a bare engine without any middleware. In production environments, it is recommended to use `New()` and explicitly add the required middleware.

Routing parameters are defined in the `:id` format and retrieved with `c.Param("id")`. Wildcard parameters use the `*filepath` format and are retrieved with `c.Param("filepath")`.

```go
// Wildcard routing example
r.GET("/files/*filepath", func(c *gin.Context) {
    filepath := c.Param("filepath")
    // filepath = "/images/logo.png" (includes leading slash)
    c.String(http.StatusOK, "Serving: %s", filepath)
})
```

There are also multiple ways to retrieve query parameters.

```go
func listUsers(c *gin.Context) {
    // Query parameters
    page := c.DefaultQuery("page", "1")
    limit := c.DefaultQuery("limit", "20")
    sort := c.Query("sort") // Empty string as default

    // Numeric conversion
    pageNum, err := strconv.Atoi(page)
    if err != nil || pageNum < 1 {
        pageNum = 1
    }
    limitNum, err := strconv.Atoi(limit)
    if err != nil || limitNum < 1 || limitNum > 100 {
        limitNum = 20
    }

    // Response with pagination
    c.JSON(http.StatusOK, gin.H{
        "page":  pageNum,
        "limit": limitNum,
        "sort":  sort,
        "users": []gin.H{},
    })
}
```

### Code Example 2: Echo Basic Setup

```go
import "github.com/labstack/echo/v4"

func main() {
    e := echo.New()
    e.Use(middleware.Logger())
    e.Use(middleware.Recover())

    e.GET("/users", listUsers)
    e.POST("/users", createUser)
    e.GET("/users/:id", getUser)

    e.Logger.Fatal(e.Start(":8080"))
}

func getUser(c echo.Context) error {
    id := c.Param("id")
    return c.JSON(http.StatusOK, map[string]string{"id": id})
}
```

A key feature of Echo is that handlers return `error`. This enables centralized error handling and prevents bugs where you forget to `return nil` after calling `c.JSON()` in a handler.

```go
// Echo's error handling is controlled by the handler's return value
func getUser(c echo.Context) error {
    id := c.Param("id")
    user, err := userService.FindByID(c.Request().Context(), id)
    if err != nil {
        if errors.Is(err, ErrNotFound) {
            return echo.NewHTTPError(http.StatusNotFound, "user not found")
        }
        return echo.NewHTTPError(http.StatusInternalServerError, err.Error())
    }
    return c.JSON(http.StatusOK, user)
}
```

Echo also supports wildcards that capture everything after a path segment, in addition to routing parameters.

```go
// Echo wildcard
e.GET("/files/*", func(c echo.Context) error {
    filepath := c.Param("*")
    return c.String(http.StatusOK, "Serving: "+filepath)
})

// Query parameters
func listUsers(c echo.Context) error {
    page := c.QueryParam("page")
    limit := c.QueryParam("limit")
    if page == "" {
        page = "1"
    }
    if limit == "" {
        limit = "20"
    }
    return c.JSON(http.StatusOK, map[string]string{
        "page":  page,
        "limit": limit,
    })
}
```

### Code Example 3: Gin Validation

```go
type CreateUserRequest struct {
    Name     string `json:"name" binding:"required,min=2,max=50"`
    Email    string `json:"email" binding:"required,email"`
    Age      int    `json:"age" binding:"gte=0,lte=150"`
    Password string `json:"password" binding:"required,min=8"`
}

func createUser(c *gin.Context) {
    var req CreateUserRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    // Validation passed
    c.JSON(http.StatusCreated, gin.H{"name": req.Name})
}
```

Gin's validation internally uses `go-playground/validator`. You can also register custom validation rules.

```go
// Registering custom validation rules
func setupValidator() {
    if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
        // Custom validation: Japanese phone number
        v.RegisterValidation("jpphone", func(fl validator.FieldLevel) bool {
            phone := fl.Field().String()
            matched, _ := regexp.MatchString(`^0\d{1,4}-?\d{1,4}-?\d{4}$`, phone)
            return matched
        })

        // Custom validation: password strength
        v.RegisterValidation("strongpassword", func(fl validator.FieldLevel) bool {
            password := fl.Field().String()
            hasUpper := regexp.MustCompile(`[A-Z]`).MatchString(password)
            hasLower := regexp.MustCompile(`[a-z]`).MatchString(password)
            hasNumber := regexp.MustCompile(`[0-9]`).MatchString(password)
            hasSpecial := regexp.MustCompile(`[!@#$%^&*]`).MatchString(password)
            return hasUpper && hasLower && hasNumber && hasSpecial
        })

        // Use JSON tag names in error messages
        v.RegisterTagNameFunc(func(fld reflect.StructField) string {
            name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]
            if name == "-" {
                return ""
            }
            return name
        })
    }
}

// Struct using custom validations
type RegisterRequest struct {
    Name     string `json:"name" binding:"required,min=2,max=50"`
    Email    string `json:"email" binding:"required,email"`
    Phone    string `json:"phone" binding:"required,jpphone"`
    Password string `json:"password" binding:"required,min=8,strongpassword"`
}
```

It is also important to have a function that converts validation errors into user-friendly messages.

```go
// Converting validation errors
func formatValidationErrors(err error) []map[string]string {
    var ve validator.ValidationErrors
    if !errors.As(err, &ve) {
        return []map[string]string{{"error": err.Error()}}
    }

    errs := make([]map[string]string, len(ve))
    for i, fe := range ve {
        errs[i] = map[string]string{
            "field":   fe.Field(),
            "tag":     fe.Tag(),
            "value":   fmt.Sprintf("%v", fe.Value()),
            "message": validationMessage(fe),
        }
    }
    return errs
}

func validationMessage(fe validator.FieldError) string {
    switch fe.Tag() {
    case "required":
        return fmt.Sprintf("%s is required", fe.Field())
    case "email":
        return fmt.Sprintf("%s is not a valid email address", fe.Field())
    case "min":
        return fmt.Sprintf("%s must be at least %s", fe.Field(), fe.Param())
    case "max":
        return fmt.Sprintf("%s must be at most %s", fe.Field(), fe.Param())
    case "jpphone":
        return fmt.Sprintf("%s is not a valid Japanese phone number", fe.Field())
    case "strongpassword":
        return "Password must contain uppercase, lowercase, numbers, and special characters"
    default:
        return fmt.Sprintf("%s does not satisfy %s", fe.Field(), fe.Tag())
    }
}

// Usage in handler
func createUser(c *gin.Context) {
    var req CreateUserRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "code":   "VALIDATION_ERROR",
            "errors": formatValidationErrors(err),
        })
        return
    }
    // ...
}
```

### Code Example 4: Gin Middleware Groups

```go
func main() {
    r := gin.Default()

    // Public API
    public := r.Group("/api/v1")
    {
        public.POST("/login", login)
        public.POST("/register", register)
    }

    // Authentication required API
    authorized := r.Group("/api/v1")
    authorized.Use(authMiddleware())
    {
        authorized.GET("/profile", getProfile)
        authorized.PUT("/profile", updateProfile)
    }

    // Admin API
    admin := r.Group("/api/v1/admin")
    admin.Use(authMiddleware(), adminMiddleware())
    {
        admin.GET("/users", adminListUsers)
    }

    r.Run(":8080")
}

func authMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        if token == "" {
            c.AbortWithStatusJSON(401, gin.H{"error": "unauthorized"})
            return
        }
        claims, err := validateToken(token)
        if err != nil {
            c.AbortWithStatusJSON(401, gin.H{"error": "invalid token"})
            return
        }
        c.Set("userID", claims.UserID)
        c.Next()
    }
}
```

The execution order of middleware is important. Calling `c.Next()` executes the subsequent middleware and handler, after which the code following `c.Next()` is executed. Calling `c.Abort()` interrupts the chain.

```go
// Example to understand middleware execution order
func middleware1() gin.HandlerFunc {
    return func(c *gin.Context) {
        fmt.Println("middleware1: before")
        c.Next()
        fmt.Println("middleware1: after")
    }
}

func middleware2() gin.HandlerFunc {
    return func(c *gin.Context) {
        fmt.Println("middleware2: before")
        c.Next()
        fmt.Println("middleware2: after")
    }
}

// Output order:
// middleware1: before
// middleware2: before
// handler
// middleware2: after
// middleware1: after
```

### Code Example 5: Echo Custom Validator

```go
import "github.com/go-playground/validator/v10"

type CustomValidator struct {
    validator *validator.Validate
}

func (cv *CustomValidator) Validate(i interface{}) error {
    return cv.validator.Struct(i)
}

func main() {
    e := echo.New()
    e.Validator = &CustomValidator{validator: validator.New()}

    e.POST("/users", func(c echo.Context) error {
        u := new(CreateUserRequest)
        if err := c.Bind(u); err != nil {
            return echo.NewHTTPError(http.StatusBadRequest, err.Error())
        }
        if err := c.Validate(u); err != nil {
            return echo.NewHTTPError(http.StatusBadRequest, err.Error())
        }
        return c.JSON(http.StatusCreated, u)
    })
}
```

When using a custom validator in Echo, you can also customize the validation error formatting.

```go
// Extended custom validator
type CustomValidator struct {
    validator *validator.Validate
}

func NewCustomValidator() *CustomValidator {
    v := validator.New()

    // Use JSON tag names as field names
    v.RegisterTagNameFunc(func(fld reflect.StructField) string {
        name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]
        if name == "-" {
            return ""
        }
        return name
    })

    return &CustomValidator{validator: v}
}

func (cv *CustomValidator) Validate(i interface{}) error {
    if err := cv.validator.Struct(i); err != nil {
        var ve validator.ValidationErrors
        if errors.As(err, &ve) {
            return &ValidationError{Errors: formatErrors(ve)}
        }
        return err
    }
    return nil
}

// Custom error type
type ValidationError struct {
    Errors []FieldError `json:"errors"`
}

type FieldError struct {
    Field   string `json:"field"`
    Message string `json:"message"`
}

func (e *ValidationError) Error() string {
    return "validation failed"
}

func formatErrors(ve validator.ValidationErrors) []FieldError {
    errs := make([]FieldError, len(ve))
    for i, fe := range ve {
        errs[i] = FieldError{
            Field:   fe.Field(),
            Message: msgForTag(fe),
        }
    }
    return errs
}

func msgForTag(fe validator.FieldError) string {
    switch fe.Tag() {
    case "required":
        return "This field is required"
    case "email":
        return "Please enter a valid email address"
    default:
        return fe.Error()
    }
}
```

### Code Example 6: Gin Unified Response Structure

A unified response structure is important in production APIs.

```go
// Unified response struct
type Response struct {
    Code    int         `json:"code"`
    Message string      `json:"message"`
    Data    interface{} `json:"data,omitempty"`
    Meta    *Meta       `json:"meta,omitempty"`
}

type Meta struct {
    Page       int   `json:"page"`
    PerPage    int   `json:"per_page"`
    Total      int64 `json:"total"`
    TotalPages int   `json:"total_pages"`
}

type ErrorDetail struct {
    Code    string      `json:"code"`
    Message string      `json:"message"`
    Field   string      `json:"field,omitempty"`
    Details interface{} `json:"details,omitempty"`
}

type ErrorResponse struct {
    Code    int           `json:"code"`
    Message string        `json:"message"`
    Errors  []ErrorDetail `json:"errors,omitempty"`
}

// Response helper functions
func respondOK(c *gin.Context, data interface{}) {
    c.JSON(http.StatusOK, Response{
        Code:    http.StatusOK,
        Message: "success",
        Data:    data,
    })
}

func respondCreated(c *gin.Context, data interface{}) {
    c.JSON(http.StatusCreated, Response{
        Code:    http.StatusCreated,
        Message: "created",
        Data:    data,
    })
}

func respondPaginated(c *gin.Context, data interface{}, page, perPage int, total int64) {
    totalPages := int(total) / perPage
    if int(total)%perPage > 0 {
        totalPages++
    }
    c.JSON(http.StatusOK, Response{
        Code:    http.StatusOK,
        Message: "success",
        Data:    data,
        Meta: &Meta{
            Page:       page,
            PerPage:    perPage,
            Total:      total,
            TotalPages: totalPages,
        },
    })
}

func respondError(c *gin.Context, status int, code, message string) {
    c.JSON(status, ErrorResponse{
        Code:    status,
        Message: message,
        Errors:  []ErrorDetail{{Code: code, Message: message}},
    })
}

func respondValidationError(c *gin.Context, errors []ErrorDetail) {
    c.JSON(http.StatusBadRequest, ErrorResponse{
        Code:    http.StatusBadRequest,
        Message: "validation error",
        Errors:  errors,
    })
}

// Usage example in handler
func listUsers(c *gin.Context) {
    page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
    perPage, _ := strconv.Atoi(c.DefaultQuery("per_page", "20"))

    users, total, err := userService.List(c.Request.Context(), page, perPage)
    if err != nil {
        respondError(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Failed to retrieve user list")
        return
    }
    respondPaginated(c, users, page, perPage, total)
}
```

### Code Example 7: Echo Middleware Details

Echo provides a rich set of built-in middleware.

```go
func setupMiddlewares(e *echo.Echo) {
    // Recovery
    e.Use(middleware.RecoverWithConfig(middleware.RecoverConfig{
        StackSize:         4 << 10, // 4 KB
        DisableStackAll:   false,
        DisablePrintStack: false,
        LogErrorFunc: func(c echo.Context, err error, stack []byte) error {
            log.Printf("PANIC: %v\n%s", err, stack)
            return nil
        },
    }))

    // CORS
    e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
        AllowOrigins: []string{"https://example.com", "https://app.example.com"},
        AllowMethods: []string{http.MethodGet, http.MethodPost, http.MethodPut, http.MethodDelete},
        AllowHeaders: []string{
            echo.HeaderOrigin,
            echo.HeaderContentType,
            echo.HeaderAccept,
            echo.HeaderAuthorization,
        },
        AllowCredentials: true,
        MaxAge:           3600,
    }))

    // Rate limiting
    e.Use(middleware.RateLimiterWithConfig(middleware.RateLimiterConfig{
        Skipper: middleware.DefaultSkipper,
        Store: middleware.NewRateLimiterMemoryStoreWithConfig(
            middleware.RateLimiterMemoryStoreConfig{
                Rate:      10,              // 10 requests
                Burst:     30,              // burst of 30
                ExpiresIn: 3 * time.Minute, // TTL
            },
        ),
        IdentifierExtractor: func(ctx echo.Context) (string, error) {
            id := ctx.RealIP()
            return id, nil
        },
        ErrorHandler: func(ctx echo.Context, err error) error {
            return ctx.JSON(http.StatusForbidden, map[string]string{
                "error": "rate limit exceeded",
            })
        },
        DenyHandler: func(ctx echo.Context, identifier string, err error) error {
            return ctx.JSON(http.StatusTooManyRequests, map[string]string{
                "error": "too many requests",
            })
        },
    }))

    // Request ID
    e.Use(middleware.RequestID())

    // Timeout
    e.Use(middleware.TimeoutWithConfig(middleware.TimeoutConfig{
        Timeout: 30 * time.Second,
    }))

    // Gzip compression
    e.Use(middleware.GzipWithConfig(middleware.GzipConfig{
        Level: 5,
        Skipper: func(c echo.Context) bool {
            return strings.Contains(c.Path(), "ws")
        },
    }))

    // Security headers
    e.Use(middleware.SecureWithConfig(middleware.SecureConfig{
        XSSProtection:         "1; mode=block",
        ContentTypeNosniff:    "nosniff",
        XFrameOptions:         "DENY",
        HSTSMaxAge:            31536000,
        ContentSecurityPolicy: "default-src 'self'",
    }))
}
```

### Code Example 8: Gin Custom Middleware Collection

A collection of custom middleware commonly used in production environments.

```go
// Request ID middleware
func RequestIDMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        requestID := c.GetHeader("X-Request-ID")
        if requestID == "" {
            requestID = uuid.New().String()
        }
        c.Set("requestID", requestID)
        c.Header("X-Request-ID", requestID)
        c.Next()
    }
}

// Structured logger middleware
func StructuredLoggerMiddleware(logger *slog.Logger) gin.HandlerFunc {
    return func(c *gin.Context) {
        start := time.Now()
        path := c.Request.URL.Path
        raw := c.Request.URL.RawQuery

        c.Next()

        latency := time.Since(start)
        status := c.Writer.Status()
        clientIP := c.ClientIP()
        method := c.Request.Method
        requestID, _ := c.Get("requestID")

        attrs := []slog.Attr{
            slog.String("request_id", fmt.Sprintf("%v", requestID)),
            slog.String("method", method),
            slog.String("path", path),
            slog.String("query", raw),
            slog.Int("status", status),
            slog.Duration("latency", latency),
            slog.String("client_ip", clientIP),
            slog.Int("body_size", c.Writer.Size()),
        }

        if status >= 500 {
            logger.LogAttrs(c.Request.Context(), slog.LevelError, "Server error", attrs...)
        } else if status >= 400 {
            logger.LogAttrs(c.Request.Context(), slog.LevelWarn, "Client error", attrs...)
        } else {
            logger.LogAttrs(c.Request.Context(), slog.LevelInfo, "Request", attrs...)
        }
    }
}

// CORS middleware
func CORSMiddleware(allowOrigins []string) gin.HandlerFunc {
    originMap := make(map[string]bool)
    for _, o := range allowOrigins {
        originMap[o] = true
    }

    return func(c *gin.Context) {
        origin := c.Request.Header.Get("Origin")
        if originMap[origin] {
            c.Header("Access-Control-Allow-Origin", origin)
            c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
            c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization, X-Request-ID")
            c.Header("Access-Control-Allow-Credentials", "true")
            c.Header("Access-Control-Max-Age", "3600")
        }

        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(http.StatusNoContent)
            return
        }

        c.Next()
    }
}

// Rate limiting middleware (Token Bucket)
func RateLimitMiddleware(rps int, burst int) gin.HandlerFunc {
    var mu sync.Mutex
    limiters := make(map[string]*rate.Limiter)

    getLimiter := func(key string) *rate.Limiter {
        mu.Lock()
        defer mu.Unlock()
        if limiter, exists := limiters[key]; exists {
            return limiter
        }
        limiter := rate.NewLimiter(rate.Limit(rps), burst)
        limiters[key] = limiter
        return limiter
    }

    // Periodic cleanup of stale entries
    go func() {
        for range time.Tick(10 * time.Minute) {
            mu.Lock()
            limiters = make(map[string]*rate.Limiter)
            mu.Unlock()
        }
    }()

    return func(c *gin.Context) {
        limiter := getLimiter(c.ClientIP())
        if !limiter.Allow() {
            c.AbortWithStatusJSON(http.StatusTooManyRequests, gin.H{
                "code":    "RATE_LIMIT_EXCEEDED",
                "message": "Request rate limit exceeded",
            })
            return
        }
        c.Next()
    }
}

// Timeout middleware
func TimeoutMiddleware(timeout time.Duration) gin.HandlerFunc {
    return func(c *gin.Context) {
        ctx, cancel := context.WithTimeout(c.Request.Context(), timeout)
        defer cancel()

        c.Request = c.Request.WithContext(ctx)

        done := make(chan struct{})
        go func() {
            c.Next()
            close(done)
        }()

        select {
        case <-done:
            return
        case <-ctx.Done():
            c.AbortWithStatusJSON(http.StatusGatewayTimeout, gin.H{
                "code":    "TIMEOUT",
                "message": "Request timed out",
            })
        }
    }
}

// Security headers middleware
func SecurityHeadersMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Header("X-Content-Type-Options", "nosniff")
        c.Header("X-Frame-Options", "DENY")
        c.Header("X-XSS-Protection", "1; mode=block")
        c.Header("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
        c.Header("Content-Security-Policy", "default-src 'self'")
        c.Header("Referrer-Policy", "strict-origin-when-cross-origin")
        c.Header("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
        c.Next()
    }
}
```

### Code Example 9: Complete Gin JWT Authentication Implementation

JWT authentication is required in many APIs.

```go
import (
    "github.com/golang-jwt/jwt/v5"
)

// JWT configuration
type JWTConfig struct {
    SecretKey     []byte
    Issuer        string
    AccessExpiry  time.Duration
    RefreshExpiry time.Duration
}

// Custom claims
type Claims struct {
    UserID int64  `json:"user_id"`
    Email  string `json:"email"`
    Role   string `json:"role"`
    jwt.RegisteredClaims
}

// Token pair
type TokenPair struct {
    AccessToken  string `json:"access_token"`
    RefreshToken string `json:"refresh_token"`
    ExpiresAt    int64  `json:"expires_at"`
}

// Token generation
func (cfg *JWTConfig) GenerateTokenPair(userID int64, email, role string) (*TokenPair, error) {
    now := time.Now()

    // Access token
    accessClaims := Claims{
        UserID: userID,
        Email:  email,
        Role:   role,
        RegisteredClaims: jwt.RegisteredClaims{
            Issuer:    cfg.Issuer,
            Subject:   strconv.FormatInt(userID, 10),
            ExpiresAt: jwt.NewNumericDate(now.Add(cfg.AccessExpiry)),
            IssuedAt:  jwt.NewNumericDate(now),
            NotBefore: jwt.NewNumericDate(now),
            ID:        uuid.New().String(),
        },
    }
    accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, accessClaims)
    accessTokenStr, err := accessToken.SignedString(cfg.SecretKey)
    if err != nil {
        return nil, fmt.Errorf("access token signing: %w", err)
    }

    // Refresh token
    refreshClaims := jwt.RegisteredClaims{
        Issuer:    cfg.Issuer,
        Subject:   strconv.FormatInt(userID, 10),
        ExpiresAt: jwt.NewNumericDate(now.Add(cfg.RefreshExpiry)),
        IssuedAt:  jwt.NewNumericDate(now),
        ID:        uuid.New().String(),
    }
    refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims)
    refreshTokenStr, err := refreshToken.SignedString(cfg.SecretKey)
    if err != nil {
        return nil, fmt.Errorf("refresh token signing: %w", err)
    }

    return &TokenPair{
        AccessToken:  accessTokenStr,
        RefreshToken: refreshTokenStr,
        ExpiresAt:    accessClaims.ExpiresAt.Unix(),
    }, nil
}

// Token validation
func (cfg *JWTConfig) ValidateToken(tokenStr string) (*Claims, error) {
    token, err := jwt.ParseWithClaims(tokenStr, &Claims{}, func(token *jwt.Token) (interface{}, error) {
        if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
        }
        return cfg.SecretKey, nil
    })
    if err != nil {
        return nil, fmt.Errorf("token parse: %w", err)
    }

    claims, ok := token.Claims.(*Claims)
    if !ok || !token.Valid {
        return nil, fmt.Errorf("invalid token claims")
    }
    return claims, nil
}

// JWT authentication middleware
func JWTAuthMiddleware(jwtCfg *JWTConfig) gin.HandlerFunc {
    return func(c *gin.Context) {
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
                "code":    "UNAUTHORIZED",
                "message": "Authorization header is required",
            })
            return
        }

        // Validate "Bearer <token>" format
        parts := strings.SplitN(authHeader, " ", 2)
        if len(parts) != 2 || !strings.EqualFold(parts[0], "bearer") {
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
                "code":    "INVALID_TOKEN_FORMAT",
                "message": "Invalid Bearer token format",
            })
            return
        }

        claims, err := jwtCfg.ValidateToken(parts[1])
        if err != nil {
            c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
                "code":    "INVALID_TOKEN",
                "message": "Token is invalid or expired",
            })
            return
        }

        // Set user info in context
        c.Set("userID", claims.UserID)
        c.Set("email", claims.Email)
        c.Set("role", claims.Role)
        c.Set("claims", claims)
        c.Next()
    }
}

// Role-based authorization middleware
func RequireRole(roles ...string) gin.HandlerFunc {
    roleSet := make(map[string]bool)
    for _, r := range roles {
        roleSet[r] = true
    }

    return func(c *gin.Context) {
        role, exists := c.Get("role")
        if !exists {
            c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
                "code":    "FORBIDDEN",
                "message": "Permission denied",
            })
            return
        }

        if !roleSet[role.(string)] {
            c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
                "code":    "INSUFFICIENT_ROLE",
                "message": fmt.Sprintf("Required role: %v", roles),
            })
            return
        }
        c.Next()
    }
}

// Login handler
func loginHandler(jwtCfg *JWTConfig, userService UserService) gin.HandlerFunc {
    return func(c *gin.Context) {
        var req LoginRequest
        if err := c.ShouldBindJSON(&req); err != nil {
            respondError(c, http.StatusBadRequest, "VALIDATION_ERROR", err.Error())
            return
        }

        user, err := userService.Authenticate(c.Request.Context(), req.Email, req.Password)
        if err != nil {
            respondError(c, http.StatusUnauthorized, "INVALID_CREDENTIALS", "Invalid email or password")
            return
        }

        tokens, err := jwtCfg.GenerateTokenPair(user.ID, user.Email, user.Role)
        if err != nil {
            respondError(c, http.StatusInternalServerError, "TOKEN_GENERATION_ERROR", "Failed to generate token")
            return
        }

        c.JSON(http.StatusOK, gin.H{
            "code":    200,
            "message": "success",
            "data":    tokens,
        })
    }
}
```

### Code Example 10: Echo Groups and Custom Context

In Echo, you can extend common handler functionality using a custom context.

```go
// Custom context
type AppContext struct {
    echo.Context
    UserID int64
    Role   string
}

// Custom context middleware
func CustomContextMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
    return func(c echo.Context) error {
        cc := &AppContext{Context: c}
        return next(cc)
    }
}

// Handler using custom context
func getProfile(c echo.Context) error {
    cc := c.(*AppContext)
    user, err := userService.FindByID(cc.Request().Context(), cc.UserID)
    if err != nil {
        return echo.NewHTTPError(http.StatusNotFound, "user not found")
    }
    return cc.JSON(http.StatusOK, user)
}

// Echo group configuration
func setupRoutes(e *echo.Echo, jwtCfg *JWTConfig) {
    // API versioning
    v1 := e.Group("/api/v1")
    v1.Use(CustomContextMiddleware)

    // Public endpoints
    public := v1.Group("")
    {
        public.POST("/auth/login", loginHandler)
        public.POST("/auth/register", registerHandler)
        public.POST("/auth/refresh", refreshTokenHandler)
    }

    // Authentication required endpoints
    auth := v1.Group("")
    auth.Use(echoJWTMiddleware(jwtCfg))
    {
        auth.GET("/profile", getProfile)
        auth.PUT("/profile", updateProfile)
        auth.GET("/users/:id", getUserByID)
    }

    // Admin endpoints
    admin := v1.Group("/admin")
    admin.Use(echoJWTMiddleware(jwtCfg), echoRequireRole("admin"))
    {
        admin.GET("/users", adminListUsers)
        admin.DELETE("/users/:id", adminDeleteUser)
        admin.GET("/stats", getStats)
    }
}
```

### Code Example 11: Swagger / OpenAPI Integration

Auto-generating Swagger API documentation with Gin.

```go
// Handler with Swagger annotations

// @Summary Get user list
// @Description Get a paginated list of users
// @Tags users
// @Accept json
// @Produce json
// @Param page query int false "Page number" default(1)
// @Param per_page query int false "Items per page" default(20) maximum(100)
// @Param sort query string false "Sort field" Enums(name, email, created_at)
// @Param order query string false "Sort order" Enums(asc, desc) default(asc)
// @Success 200 {object} Response{data=[]User,meta=Meta} "Success"
// @Failure 400 {object} ErrorResponse "Validation error"
// @Failure 401 {object} ErrorResponse "Authentication error"
// @Failure 500 {object} ErrorResponse "Server error"
// @Security BearerAuth
// @Router /api/v1/users [get]
func listUsers(c *gin.Context) {
    // Implementation
}

// @Summary Create user
// @Description Create a new user
// @Tags users
// @Accept json
// @Produce json
// @Param request body CreateUserRequest true "Create user request"
// @Success 201 {object} Response{data=User} "Created successfully"
// @Failure 400 {object} ErrorResponse "Validation error"
// @Failure 409 {object} ErrorResponse "Email already exists"
// @Failure 500 {object} ErrorResponse "Server error"
// @Security BearerAuth
// @Router /api/v1/users [post]
func createUser(c *gin.Context) {
    // Implementation
}

// @Summary Get user
// @Description Get a user by ID
// @Tags users
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {object} Response{data=User} "Success"
// @Failure 404 {object} ErrorResponse "User not found"
// @Failure 500 {object} ErrorResponse "Server error"
// @Security BearerAuth
// @Router /api/v1/users/{id} [get]
func getUser(c *gin.Context) {
    // Implementation
}

// Swagger configuration
// @title My API
// @version 1.0
// @description User Management API
// @host localhost:8080
// @BasePath /api/v1
// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization

func main() {
    r := gin.Default()

    // Swagger endpoint
    r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

    // API routing
    v1 := r.Group("/api/v1")
    {
        v1.GET("/users", listUsers)
        v1.POST("/users", createUser)
        v1.GET("/users/:id", getUser)
    }

    r.Run(":8080")
}
```

Command to generate Swagger documentation.

```bash
# Install swag
go install github.com/swaggo/swag/cmd/swag@latest

# Generate documentation
swag init -g cmd/api/main.go -o docs

# Generated files:
# docs/docs.go
# docs/swagger.json
# docs/swagger.yaml
```

### Code Example 12: Gin Testing

Handler testing uses httptest.

```go
import (
    "net/http"
    "net/http/httptest"
    "testing"

    "github.com/gin-gonic/gin"
    "github.com/stretchr/testify/assert"
    "github.com/stretchr/testify/require"
)

// Helper to create a Gin engine for testing
func setupTestRouter() *gin.Engine {
    gin.SetMode(gin.TestMode)
    r := gin.New()
    return r
}

// Unit test for handler
func TestGetUser(t *testing.T) {
    r := setupTestRouter()

    mockService := &MockUserService{
        users: map[int64]*User{
            1: {ID: 1, Name: "Tanaka", Email: "tanaka@example.com"},
        },
    }

    r.GET("/users/:id", getUserHandler(mockService))

    tests := []struct {
        name       string
        userID     string
        wantStatus int
        wantBody   string
    }{
        {
            name:       "Success: get user",
            userID:     "1",
            wantStatus: http.StatusOK,
            wantBody:   `"name":"Tanaka"`,
        },
        {
            name:       "Error: user does not exist",
            userID:     "999",
            wantStatus: http.StatusNotFound,
            wantBody:   `"code":"NOT_FOUND"`,
        },
        {
            name:       "Error: invalid ID",
            userID:     "abc",
            wantStatus: http.StatusBadRequest,
            wantBody:   `"code":"INVALID_ID"`,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            req := httptest.NewRequest(http.MethodGet, "/users/"+tt.userID, nil)
            w := httptest.NewRecorder()

            r.ServeHTTP(w, req)

            assert.Equal(t, tt.wantStatus, w.Code)
            assert.Contains(t, w.Body.String(), tt.wantBody)
        })
    }
}

// POST handler test
func TestCreateUser(t *testing.T) {
    r := setupTestRouter()
    mockService := &MockUserService{users: make(map[int64]*User)}
    r.POST("/users", createUserHandler(mockService))

    tests := []struct {
        name       string
        body       string
        wantStatus int
    }{
        {
            name:       "Success: create user",
            body:       `{"name":"Yamada","email":"yamada@example.com","password":"P@ssw0rd!"}`,
            wantStatus: http.StatusCreated,
        },
        {
            name:       "Error: empty name",
            body:       `{"name":"","email":"yamada@example.com","password":"P@ssw0rd!"}`,
            wantStatus: http.StatusBadRequest,
        },
        {
            name:       "Error: invalid email",
            body:       `{"name":"Yamada","email":"invalid","password":"P@ssw0rd!"}`,
            wantStatus: http.StatusBadRequest,
        },
        {
            name:       "Error: JSON parse error",
            body:       `{invalid json`,
            wantStatus: http.StatusBadRequest,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            req := httptest.NewRequest(http.MethodPost, "/users",
                strings.NewReader(tt.body))
            req.Header.Set("Content-Type", "application/json")
            w := httptest.NewRecorder()

            r.ServeHTTP(w, req)

            assert.Equal(t, tt.wantStatus, w.Code)
        })
    }
}

// Middleware test
func TestAuthMiddleware(t *testing.T) {
    jwtCfg := &JWTConfig{
        SecretKey:    []byte("test-secret"),
        Issuer:       "test",
        AccessExpiry: time.Hour,
    }

    r := setupTestRouter()
    r.Use(JWTAuthMiddleware(jwtCfg))
    r.GET("/protected", func(c *gin.Context) {
        userID := c.GetInt64("userID")
        c.JSON(http.StatusOK, gin.H{"user_id": userID})
    })

    t.Run("No token", func(t *testing.T) {
        req := httptest.NewRequest(http.MethodGet, "/protected", nil)
        w := httptest.NewRecorder()
        r.ServeHTTP(w, req)
        assert.Equal(t, http.StatusUnauthorized, w.Code)
    })

    t.Run("Valid token", func(t *testing.T) {
        tokens, err := jwtCfg.GenerateTokenPair(42, "test@example.com", "user")
        require.NoError(t, err)

        req := httptest.NewRequest(http.MethodGet, "/protected", nil)
        req.Header.Set("Authorization", "Bearer "+tokens.AccessToken)
        w := httptest.NewRecorder()
        r.ServeHTTP(w, req)

        assert.Equal(t, http.StatusOK, w.Code)
        assert.Contains(t, w.Body.String(), `"user_id":42`)
    })

    t.Run("Invalid token", func(t *testing.T) {
        req := httptest.NewRequest(http.MethodGet, "/protected", nil)
        req.Header.Set("Authorization", "Bearer invalid-token")
        w := httptest.NewRecorder()
        r.ServeHTTP(w, req)
        assert.Equal(t, http.StatusUnauthorized, w.Code)
    })
}
```

### Code Example 13: Echo Testing

```go
func TestEchoGetUser(t *testing.T) {
    e := echo.New()
    e.Validator = NewCustomValidator()

    mockService := &MockUserService{
        users: map[int64]*User{
            1: {ID: 1, Name: "Tanaka", Email: "tanaka@example.com"},
        },
    }

    tests := []struct {
        name       string
        userID     string
        wantStatus int
        wantBody   string
    }{
        {
            name:       "Success",
            userID:     "1",
            wantStatus: http.StatusOK,
            wantBody:   `"name":"Tanaka"`,
        },
        {
            name:       "User not found",
            userID:     "999",
            wantStatus: http.StatusNotFound,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            req := httptest.NewRequest(http.MethodGet, "/", nil)
            rec := httptest.NewRecorder()
            c := e.NewContext(req, rec)
            c.SetPath("/users/:id")
            c.SetParamNames("id")
            c.SetParamValues(tt.userID)

            handler := getUserHandler(mockService)
            err := handler(c)

            if tt.wantStatus >= 400 {
                he, ok := err.(*echo.HTTPError)
                assert.True(t, ok)
                assert.Equal(t, tt.wantStatus, he.Code)
            } else {
                assert.NoError(t, err)
                assert.Equal(t, tt.wantStatus, rec.Code)
                if tt.wantBody != "" {
                    assert.Contains(t, rec.Body.String(), tt.wantBody)
                }
            }
        })
    }
}

// Echo middleware test
func TestEchoRateLimitMiddleware(t *testing.T) {
    e := echo.New()
    e.Use(middleware.RateLimiterWithConfig(middleware.RateLimiterConfig{
        Store: middleware.NewRateLimiterMemoryStoreWithConfig(
            middleware.RateLimiterMemoryStoreConfig{
                Rate:  2,
                Burst: 2,
            },
        ),
        IdentifierExtractor: func(ctx echo.Context) (string, error) {
            return ctx.RealIP(), nil
        },
        DenyHandler: func(ctx echo.Context, identifier string, err error) error {
            return ctx.JSON(http.StatusTooManyRequests, map[string]string{
                "error": "rate limited",
            })
        },
    }))
    e.GET("/test", func(c echo.Context) error {
        return c.String(http.StatusOK, "ok")
    })

    // First 2 requests succeed
    for i := 0; i < 2; i++ {
        req := httptest.NewRequest(http.MethodGet, "/test", nil)
        rec := httptest.NewRecorder()
        e.ServeHTTP(rec, req)
        assert.Equal(t, http.StatusOK, rec.Code)
    }

    // Third request is rate limited
    req := httptest.NewRequest(http.MethodGet, "/test", nil)
    rec := httptest.NewRecorder()
    e.ServeHTTP(rec, req)
    assert.Equal(t, http.StatusTooManyRequests, rec.Code)
}
```

### Code Example 14: Gin Graceful Shutdown

```go
func main() {
    // Set release mode
    gin.SetMode(gin.ReleaseMode)

    r := gin.New()

    // Middleware setup
    r.Use(RequestIDMiddleware())
    r.Use(StructuredLoggerMiddleware(slog.Default()))
    r.Use(gin.Recovery())
    r.Use(CORSMiddleware([]string{"https://example.com"}))
    r.Use(SecurityHeadersMiddleware())

    // Health check
    r.GET("/health", func(c *gin.Context) {
        c.JSON(http.StatusOK, gin.H{
            "status": "ok",
            "time":   time.Now().UTC().Format(time.RFC3339),
        })
    })

    // Readiness check (also verifies external dependencies such as DB)
    r.GET("/ready", func(c *gin.Context) {
        if err := db.PingContext(c.Request.Context()); err != nil {
            c.JSON(http.StatusServiceUnavailable, gin.H{
                "status": "not ready",
                "error":  err.Error(),
            })
            return
        }
        c.JSON(http.StatusOK, gin.H{"status": "ready"})
    })

    // API routing
    setupRoutes(r)

    // Server configuration
    srv := &http.Server{
        Addr:         ":8080",
        Handler:      r,
        ReadTimeout:  15 * time.Second,
        WriteTimeout: 30 * time.Second,
        IdleTimeout:  60 * time.Second,
        // Header size limit
        MaxHeaderBytes: 1 << 20, // 1 MB
    }

    // Graceful Shutdown
    go func() {
        slog.Info("Server starting", "addr", srv.Addr)
        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            slog.Error("Server error", "error", err)
            os.Exit(1)
        }
    }()

    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    sig := <-quit
    slog.Info("Shutdown signal received", "signal", sig)

    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()

    if err := srv.Shutdown(ctx); err != nil {
        slog.Error("Server forced to shutdown", "error", err)
        os.Exit(1)
    }

    slog.Info("Server exited properly")
}
```

### Code Example 15: Echo Graceful Shutdown

```go
func main() {
    e := echo.New()
    e.HideBanner = true

    // Middleware setup
    setupMiddlewares(e)

    // Routing setup
    setupRoutes(e, jwtCfg)

    // Health check
    e.GET("/health", func(c echo.Context) error {
        return c.JSON(http.StatusOK, map[string]string{
            "status": "ok",
            "time":   time.Now().UTC().Format(time.RFC3339),
        })
    })

    // Custom HTTP error handler
    e.HTTPErrorHandler = func(err error, c echo.Context) {
        if c.Response().Committed {
            return
        }

        var he *echo.HTTPError
        if errors.As(err, &he) {
            msg := he.Message
            if m, ok := msg.(string); ok {
                c.JSON(he.Code, map[string]interface{}{
                    "code":    he.Code,
                    "message": m,
                })
            } else {
                c.JSON(he.Code, map[string]interface{}{
                    "code":    he.Code,
                    "message": msg,
                })
            }
            return
        }

        var ve *ValidationError
        if errors.As(err, &ve) {
            c.JSON(http.StatusBadRequest, map[string]interface{}{
                "code":    http.StatusBadRequest,
                "message": "validation error",
                "errors":  ve.Errors,
            })
            return
        }

        // Unknown error
        slog.Error("Unhandled error", "error", err, "path", c.Path())
        c.JSON(http.StatusInternalServerError, map[string]interface{}{
            "code":    http.StatusInternalServerError,
            "message": "internal server error",
        })
    }

    // Graceful Shutdown
    go func() {
        if err := e.Start(":8080"); err != nil && err != http.ErrServerClosed {
            e.Logger.Fatal("shutting down the server")
        }
    }()

    quit := make(chan os.Signal, 1)
    signal.Notify(quit, os.Interrupt, syscall.SIGTERM)
    <-quit

    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()

    if err := e.Shutdown(ctx); err != nil {
        e.Logger.Fatal(err)
    }
    slog.Info("Server exited")
}
```

### Code Example 16: File Upload

File upload handling in Gin and Echo.

```go
// Gin: Single file upload
func uploadFile(c *gin.Context) {
    file, err := c.FormFile("file")
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "File is required"})
        return
    }

    // Validation
    if file.Size > 10<<20 { // 10MB limit
        c.JSON(http.StatusBadRequest, gin.H{"error": "File size is too large (max 10MB)"})
        return
    }

    // MIME type check
    allowedTypes := map[string]bool{
        "image/jpeg": true,
        "image/png":  true,
        "image/gif":  true,
        "image/webp": true,
    }

    src, err := file.Open()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read file"})
        return
    }
    defer src.Close()

    // Determine MIME type from the first 512 bytes
    buffer := make([]byte, 512)
    _, err = src.Read(buffer)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to read file"})
        return
    }
    contentType := http.DetectContentType(buffer)
    if !allowedTypes[contentType] {
        c.JSON(http.StatusBadRequest, gin.H{
            "error": fmt.Sprintf("File type not allowed: %s", contentType),
        })
        return
    }

    // Save file (generate unique name)
    ext := filepath.Ext(file.Filename)
    filename := fmt.Sprintf("%s%s", uuid.New().String(), ext)
    dst := filepath.Join("uploads", filename)

    if err := c.SaveUploadedFile(file, dst); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "filename": filename,
        "size":     file.Size,
        "type":     contentType,
        "url":      fmt.Sprintf("/uploads/%s", filename),
    })
}

// Gin: Multiple file upload
func uploadMultipleFiles(c *gin.Context) {
    form, err := c.MultipartForm()
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    files := form.File["files"]
    if len(files) == 0 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Files are required"})
        return
    }
    if len(files) > 10 {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Maximum 10 files allowed"})
        return
    }

    var uploaded []gin.H
    for _, file := range files {
        ext := filepath.Ext(file.Filename)
        filename := fmt.Sprintf("%s%s", uuid.New().String(), ext)
        dst := filepath.Join("uploads", filename)

        if err := c.SaveUploadedFile(file, dst); err != nil {
            continue
        }
        uploaded = append(uploaded, gin.H{
            "filename": filename,
            "size":     file.Size,
        })
    }

    c.JSON(http.StatusOK, gin.H{
        "uploaded": uploaded,
        "count":    len(uploaded),
    })
}

// Echo: File upload
func echoUploadFile(c echo.Context) error {
    file, err := c.FormFile("file")
    if err != nil {
        return echo.NewHTTPError(http.StatusBadRequest, "File is required")
    }

    if file.Size > 10<<20 {
        return echo.NewHTTPError(http.StatusBadRequest, "File size is too large")
    }

    src, err := file.Open()
    if err != nil {
        return echo.NewHTTPError(http.StatusInternalServerError, "Failed to read file")
    }
    defer src.Close()

    ext := filepath.Ext(file.Filename)
    filename := fmt.Sprintf("%s%s", uuid.New().String(), ext)
    dst, err := os.Create(filepath.Join("uploads", filename))
    if err != nil {
        return echo.NewHTTPError(http.StatusInternalServerError, "Failed to save file")
    }
    defer dst.Close()

    if _, err = io.Copy(dst, src); err != nil {
        return echo.NewHTTPError(http.StatusInternalServerError, "Failed to copy file")
    }

    return c.JSON(http.StatusOK, map[string]interface{}{
        "filename": filename,
        "size":     file.Size,
    })
}
```

### Code Example 17: WebSocket

WebSocket implementation in Gin and Echo.

```go
import "github.com/gorilla/websocket"

// Gin WebSocket
var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
    CheckOrigin: func(r *http.Request) bool {
        origin := r.Header.Get("Origin")
        return origin == "https://example.com"
    },
}

// WebSocket Hub (connection management)
type Hub struct {
    clients    map[*Client]bool
    broadcast  chan []byte
    register   chan *Client
    unregister chan *Client
    mu         sync.RWMutex
}

type Client struct {
    hub  *Hub
    conn *websocket.Conn
    send chan []byte
}

func newHub() *Hub {
    return &Hub{
        broadcast:  make(chan []byte),
        register:   make(chan *Client),
        unregister: make(chan *Client),
        clients:    make(map[*Client]bool),
    }
}

func (h *Hub) run() {
    for {
        select {
        case client := <-h.register:
            h.mu.Lock()
            h.clients[client] = true
            h.mu.Unlock()
        case client := <-h.unregister:
            h.mu.Lock()
            if _, ok := h.clients[client]; ok {
                delete(h.clients, client)
                close(client.send)
            }
            h.mu.Unlock()
        case message := <-h.broadcast:
            h.mu.RLock()
            for client := range h.clients {
                select {
                case client.send <- message:
                default:
                    close(client.send)
                    delete(h.clients, client)
                }
            }
            h.mu.RUnlock()
        }
    }
}

// Gin WebSocket handler
func wsHandler(hub *Hub) gin.HandlerFunc {
    return func(c *gin.Context) {
        conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
        if err != nil {
            return
        }

        client := &Client{
            hub:  hub,
            conn: conn,
            send: make(chan []byte, 256),
        }
        hub.register <- client

        go client.writePump()
        go client.readPump()
    }
}

func (c *Client) readPump() {
    defer func() {
        c.hub.unregister <- c
        c.conn.Close()
    }()

    c.conn.SetReadLimit(512)
    c.conn.SetReadDeadline(time.Now().Add(60 * time.Second))
    c.conn.SetPongHandler(func(string) error {
        c.conn.SetReadDeadline(time.Now().Add(60 * time.Second))
        return nil
    })

    for {
        _, message, err := c.conn.ReadMessage()
        if err != nil {
            break
        }
        c.hub.broadcast <- message
    }
}

func (c *Client) writePump() {
    ticker := time.NewTicker(54 * time.Second)
    defer func() {
        ticker.Stop()
        c.conn.Close()
    }()

    for {
        select {
        case message, ok := <-c.send:
            c.conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
            if !ok {
                c.conn.WriteMessage(websocket.CloseMessage, []byte{})
                return
            }
            if err := c.conn.WriteMessage(websocket.TextMessage, message); err != nil {
                return
            }
        case <-ticker.C:
            c.conn.SetWriteDeadline(time.Now().Add(10 * time.Second))
            if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
                return
            }
        }
    }
}
```

### Code Example 18: Dependency Injection Pattern (Clean Architecture)

Clean architecture is important in real-world projects.

```go
// Domain layer (domain/user.go)
type User struct {
    ID        int64     `json:"id"`
    Name      string    `json:"name"`
    Email     string    `json:"email"`
    CreatedAt time.Time `json:"created_at"`
}

type UserRepository interface {
    FindByID(ctx context.Context, id int64) (*User, error)
    FindAll(ctx context.Context, page, perPage int) ([]User, int64, error)
    Create(ctx context.Context, user *User) error
    Update(ctx context.Context, user *User) error
    Delete(ctx context.Context, id int64) error
}

type UserService interface {
    GetUser(ctx context.Context, id int64) (*User, error)
    ListUsers(ctx context.Context, page, perPage int) ([]User, int64, error)
    CreateUser(ctx context.Context, req *CreateUserRequest) (*User, error)
    UpdateUser(ctx context.Context, id int64, req *UpdateUserRequest) (*User, error)
    DeleteUser(ctx context.Context, id int64) error
}

// Use case layer (usecase/user_service.go)
type userServiceImpl struct {
    repo   UserRepository
    logger *slog.Logger
}

func NewUserService(repo UserRepository, logger *slog.Logger) UserService {
    return &userServiceImpl{repo: repo, logger: logger}
}

func (s *userServiceImpl) GetUser(ctx context.Context, id int64) (*User, error) {
    user, err := s.repo.FindByID(ctx, id)
    if err != nil {
        s.logger.ErrorContext(ctx, "Failed to get user", "id", id, "error", err)
        return nil, fmt.Errorf("get user: %w", err)
    }
    return user, nil
}

func (s *userServiceImpl) CreateUser(ctx context.Context, req *CreateUserRequest) (*User, error) {
    user := &User{
        Name:      req.Name,
        Email:     req.Email,
        CreatedAt: time.Now(),
    }
    if err := s.repo.Create(ctx, user); err != nil {
        s.logger.ErrorContext(ctx, "Failed to create user", "error", err)
        return nil, fmt.Errorf("create user: %w", err)
    }
    s.logger.InfoContext(ctx, "User created", "id", user.ID, "email", user.Email)
    return user, nil
}

// Infrastructure layer (infrastructure/user_repository.go)
type postgresUserRepo struct {
    db *sqlx.DB
}

func NewPostgresUserRepo(db *sqlx.DB) UserRepository {
    return &postgresUserRepo{db: db}
}

func (r *postgresUserRepo) FindByID(ctx context.Context, id int64) (*User, error) {
    var user User
    err := r.db.GetContext(ctx, &user, "SELECT id, name, email, created_at FROM users WHERE id = $1", id)
    if errors.Is(err, sql.ErrNoRows) {
        return nil, ErrNotFound
    }
    return &user, err
}

// Presentation layer (handler/user_handler.go)
type UserHandler struct {
    service UserService
}

func NewUserHandler(service UserService) *UserHandler {
    return &UserHandler{service: service}
}

func (h *UserHandler) GetUser(c *gin.Context) {
    idStr := c.Param("id")
    id, err := strconv.ParseInt(idStr, 10, 64)
    if err != nil {
        respondError(c, http.StatusBadRequest, "INVALID_ID", "ID must be a number")
        return
    }

    user, err := h.service.GetUser(c.Request.Context(), id)
    if err != nil {
        if errors.Is(err, ErrNotFound) {
            respondError(c, http.StatusNotFound, "NOT_FOUND", "User not found")
            return
        }
        respondError(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Internal error")
        return
    }

    respondOK(c, user)
}

// Wiring (cmd/api/main.go)
func main() {
    // Build dependencies
    db := setupDB()
    logger := slog.New(slog.NewJSONHandler(os.Stdout, nil))

    userRepo := NewPostgresUserRepo(db)
    userService := NewUserService(userRepo, logger)
    userHandler := NewUserHandler(userService)

    // Routing
    r := gin.New()
    r.Use(gin.Recovery())

    v1 := r.Group("/api/v1")
    {
        users := v1.Group("/users")
        {
            users.GET("", userHandler.ListUsers)
            users.POST("", userHandler.CreateUser)
            users.GET("/:id", userHandler.GetUser)
            users.PUT("/:id", userHandler.UpdateUser)
            users.DELETE("/:id", userHandler.DeleteUser)
        }
    }

    // Start server
    srv := &http.Server{Addr: ":8080", Handler: r}
    // ... Graceful Shutdown
}
```

---

## 2. ASCII Diagrams

### Diagram 1: Gin Request Processing Flow

```
Request
  |
  v
+--------------+
| gin.Engine   |
| +----------+ |
| | Logger   | |  Global Middleware
| | Recovery | |
| +----+-----+ |
|      v       |
| +----------+ |
| | RadixTree| |  Route Matching
| | Router   | |  O(1) path lookup
| +----+-----+ |
|      v       |
| +----------+ |
| | Group MW | |  Group Middleware
| +----+-----+ |
|      v       |
| +----------+ |
| | Handler  | |  Business Logic
| +----------+ |
+--------------+
```

### Diagram 2: Routing Groups

```
/api/v1
+-- /login          [POST]  (Public)
+-- /register       [POST]  (Public)
+-- /profile        [GET]   (Auth required)
+-- /profile        [PUT]   (Auth required)
+-- /admin
    +-- /users      [GET]   (Auth + Admin role)

Middleware application:
  Public:        Logger -> Recovery -> Handler
  Auth required: Logger -> Recovery -> Auth -> Handler
  Admin:         Logger -> Recovery -> Auth -> Admin -> Handler
```

### Diagram 3: Validation Processing Flow

```
JSON Request Body
      |
      v
+--------------+
| Bind (JSON)  | -- Syntax error -> 400 Bad Request
+------+-------+
       v
+--------------+
| Validate     | -- Validation -- Failure -> 400 + Error details
|  required    |    error
|  min/max     |
|  email       |
|  custom      |
+------+-------+
       v
  Handler Logic
```

### Diagram 4: Middleware Chain Execution Order

```
Request
  |
  v
+-----------------------------------------+
| Middleware 1                             |
|  | Before processing                    |
|  |  +------------------------------+   |
|  |  | Middleware 2                  |   |
|  |  |  | Before processing         |   |
|  |  |  |  +-------------------+    |   |
|  |  |  |  | Middleware 3      |    |   |
|  |  |  |  |  | Before proc.  |    |   |
|  |  |  |  |  |  +----------+ |    |   |
|  |  |  |  |  |  | Handler  | |    |   |
|  |  |  |  |  |  +----------+ |    |   |
|  |  |  |  |  | After proc.   |    |   |
|  |  |  |  +-------------------+    |   |
|  |  |  | After processing          |   |
|  |  +------------------------------+   |
|  | After processing                     |
+-----------------------------------------+
  |
  v
Response
```

### Diagram 5: JWT Authentication Flow

```
Client                API Server              Auth Service
  |                      |                        |
  |  POST /auth/login    |                        |
  |  {email, password}   |                        |
  | ------------------> |                        |
  |                      |  verify credentials    |
  |                      | ---------------------> |
  |                      |  <-- user info ------  |
  |                      |                        |
  |                      |  generate JWT          |
  |  <-- {access_token,  |  (access + refresh)    |
  |       refresh_token} |                        |
  |                      |                        |
  |  GET /api/v1/users   |                        |
  |  Authorization:      |                        |
  |  Bearer <token>      |                        |
  | ------------------> |                        |
  |                      |  validate JWT          |
  |                      |  extract claims        |
  |  <-- 200 OK          |  set context           |
  |      {users: [...]}  |                        |
  |                      |                        |
  |  POST /auth/refresh  |                        |
  |  {refresh_token}     |                        |
  | ------------------> |                        |
  |                      |  validate refresh      |
  |  <-- {new tokens}    |  issue new pair        |
```

### Diagram 6: Clean Architecture Layers

```
+-------------------------------------------------+
|  Presentation Layer (Handler)                    |
|  +-------------------------------------------+  |
|  | Gin/Echo Handler                          |  |
|  | Parse request -> Call service -> Response  |  |
|  +--------------------+----------------------+  |
|                       | UserService interface    |
|  +--------------------v----------------------+  |
|  | Use Case Layer (Service)                  |  |
|  | Business logic and validation             |  |
|  +--------------------+----------------------+  |
|                       | UserRepository interface |
|  +--------------------v----------------------+  |
|  | Infrastructure Layer (Repository)         |  |
|  | DB operations and external API calls      |  |
|  +-------------------------------------------+  |
+-------------------------------------------------+

Dependency direction: Handler -> Service -> Repository (inward)
Interface definitions: Placed at layer boundaries
Testing: Each layer can be independently tested with mocks
```

### Diagram 7: WebSocket Communication Flow

```
Client A       Server (Hub)       Client B
  |                |                  |
  |-- HTTP GET -->|                  |
  |  Upgrade:      |                  |
  |  websocket     |                  |
  |<- 101 --------|                  |
  |  Switching     |                  |
  |                |<-- HTTP GET ----|
  |                |   Upgrade: ws   |
  |                |-- 101 -------->|
  |                |                  |
  |-- message --> |                  |
  |  "Hello"       |-- broadcast -->|
  |                |   "Hello"       |
  |                |                  |
  |                |<-- message ----|
  |<-- broadcast --|   "Hi"          |
  |    "Hi"        |                  |
  |                |                  |
  |-- ping ------>|                  |
  |<-- pong ------|                  |
```

---

## 3. Comparison Tables

### Table 1: Gin vs Echo vs Standard net/http

| Item | Gin | Echo | net/http (1.22+) |
|------|-----|------|-----------------|
| Performance | Very fast | Very fast | Fast |
| Routing | Radix tree | Radix tree | Pattern matching |
| Validation | binding (validator) | Separate addition | None |
| Middleware | `gin.HandlerFunc` | `echo.MiddlewareFunc` | `func(http.Handler) http.Handler` |
| Error handling | `c.AbortWithJSON` | `echo.HTTPError` | `http.Error` |
| GitHub Stars | 80k+ | 30k+ | Standard |
| Minimal dependencies | Medium | Medium | No dependencies |
| Handler type | `func(*gin.Context)` | `func(echo.Context) error` | `func(w, r)` |
| Custom context | `c.Set()/c.Get()` | Custom Context type | `context.Value()` |
| Swagger integration | gin-swagger | echo-swagger | Manual |
| WebSocket | gorilla/websocket | gorilla/websocket | gorilla/websocket |
| Testing | httptest | httptest | httptest |
| Graceful Shutdown | Manual implementation | `e.Shutdown()` | `srv.Shutdown()` |

### Table 2: Gin Validation Tags

| Tag | Meaning | Example |
|-----|---------|---------|
| `required` | Required | `binding:"required"` |
| `email` | Email format | `binding:"email"` |
| `min` | Minimum value/length | `binding:"min=3"` |
| `max` | Maximum value/length | `binding:"max=100"` |
| `oneof` | Enumerated values | `binding:"oneof=admin user"` |
| `gte` | Greater than or equal | `binding:"gte=0"` |
| `lte` | Less than or equal | `binding:"lte=150"` |
| `url` | URL format | `binding:"url"` |
| `uuid` | UUID format | `binding:"uuid"` |
| `datetime` | DateTime format | `binding:"datetime=2006-01-02"` |
| `len` | Fixed length | `binding:"len=10"` |
| `alphanum` | Alphanumeric only | `binding:"alphanum"` |
| `contains` | Contains | `binding:"contains=@"` |
| `excludes` | Excludes | `binding:"excludes= "` |
| `ip` | IP address | `binding:"ip"` |
| `numeric` | Numeric string | `binding:"numeric"` |

### Table 3: Middleware Comparison

| Middleware | Gin (built-in) | Echo (built-in) | Purpose |
|-----------|----------------|-----------------|---------|
| Logger | `gin.Logger()` | `middleware.Logger()` | Request logging |
| Recovery | `gin.Recovery()` | `middleware.Recover()` | Panic recovery |
| CORS | Separate addition | `middleware.CORS()` | Cross-origin |
| Rate Limit | Separate addition | `middleware.RateLimiter()` | Rate limiting |
| JWT | Separate addition | `middleware.JWT()` | JWT authentication |
| Basic Auth | `gin.BasicAuth()` | `middleware.BasicAuth()` | Basic authentication |
| Gzip | Separate addition | `middleware.Gzip()` | Compression |
| Request ID | Separate addition | `middleware.RequestID()` | Request tracking |
| Timeout | Separate addition | `middleware.Timeout()` | Timeout |
| Secure | Separate addition | `middleware.Secure()` | Security headers |
| CSRF | Separate addition | `middleware.CSRF()` | CSRF protection |
| Body Limit | Separate addition | `middleware.BodyLimit()` | Body size limit |

### Table 4: Error Handling Comparison

| Item | Gin | Echo |
|------|-----|------|
| Error response | `c.JSON()` + `return` | `return error` |
| Abort | `c.Abort()` / `c.AbortWithStatusJSON()` | `return echo.NewHTTPError()` |
| Custom error | Free-form with `gin.H{}` | `echo.HTTPError` struct |
| Centralized handler | None (implement via middleware) | `e.HTTPErrorHandler` |
| Error logging | Captured in middleware | Inside `HTTPErrorHandler` |
| Panic recovery | `gin.Recovery()` | `middleware.Recover()` |

### Table 5: Project Structure Comparison

| Scale | Recommended Structure | Framework Choice |
|-------|----------------------|-----------------|
| Small (API count < 10) | Flat structure | net/http (1.22+) |
| Medium (API count 10-50) | Layered | Gin / Echo |
| Large (API count 50+) | Clean Architecture | Gin / Echo + DI |
| Microservices | DDD + gRPC | Gin (REST gateway) + gRPC |

---

## 4. Anti-Patterns

### Anti-Pattern 1: Context Leaking

```go
// BAD: Passing gin.Context to a goroutine
func handler(c *gin.Context) {
    go func() {
        time.Sleep(5 * time.Second)
        c.JSON(200, gin.H{"ok": true}) // Response may have already been sent
    }()
}

// GOOD: Copy the needed values before passing to a goroutine
func handler(c *gin.Context) {
    userID := c.GetString("userID")
    go func() {
        processAsync(userID)
    }()
    c.JSON(200, gin.H{"accepted": true})
}
```

gin.Context is tied to the request lifecycle, and accessing it after the response has been sent can cause undefined behavior or panics. When passing to a goroutine, extract the needed values first and pass them as primitive types.

### Anti-Pattern 2: Inconsistent Error Responses

```go
// BAD: Inconsistent error response formats
c.JSON(400, gin.H{"error": "bad request"})
c.JSON(400, gin.H{"message": "invalid input"})
c.JSON(400, "error occurred")

// GOOD: Unified error response type
type ErrorResponse struct {
    Code    string `json:"code"`
    Message string `json:"message"`
}

func respondError(c *gin.Context, status int, code, msg string) {
    c.JSON(status, ErrorResponse{Code: code, Message: msg})
}
```

API clients need to predict and parse the error response format. Inconsistent formats make client-side implementation complex and become a source of bugs.

### Anti-Pattern 3: Forgetting c.Next() in Middleware

```go
// BAD: Forgetting c.Next() stops the chain
func loggingMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        log.Printf("Request: %s %s", c.Request.Method, c.Request.URL.Path)
        // c.Next() is missing! Subsequent handlers won't be executed
    }
}

// GOOD: Explicitly call c.Next()
func loggingMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        start := time.Now()
        log.Printf("Request: %s %s", c.Request.Method, c.Request.URL.Path)
        c.Next()
        log.Printf("Response: %d (%v)", c.Writer.Status(), time.Since(start))
    }
}
```

### Anti-Pattern 4: Duplicate Validation

```go
// BAD: Hand-writing validation logic in the handler
func createUser(c *gin.Context) {
    var req CreateUserRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }
    // Duplicate validation
    if len(req.Name) < 2 {
        c.JSON(400, gin.H{"error": "name too short"})
        return
    }
    if !strings.Contains(req.Email, "@") {
        c.JSON(400, gin.H{"error": "invalid email"})
        return
    }
    // ...
}

// GOOD: Consolidate validation in binding tags
type CreateUserRequest struct {
    Name  string `json:"name" binding:"required,min=2,max=50"`
    Email string `json:"email" binding:"required,email"`
}

func createUser(c *gin.Context) {
    var req CreateUserRequest
    if err := c.ShouldBindJSON(&req); err != nil {
        c.JSON(400, gin.H{"errors": formatValidationErrors(err)})
        return
    }
    // Only business logic after validation passes
}
```

### Anti-Pattern 5: Using gin.Default() in Production

```go
// BAD: gin.Default() includes debug-oriented Logger
func main() {
    r := gin.Default()
    r.Run(":8080")
}

// GOOD: Explicitly configure middleware in production
func main() {
    gin.SetMode(gin.ReleaseMode)
    r := gin.New()

    // Structured logging
    r.Use(StructuredLoggerMiddleware(slog.Default()))
    // Panic recovery (custom)
    r.Use(gin.CustomRecoveryWithWriter(nil, func(c *gin.Context, err any) {
        slog.Error("Panic recovered", "error", err)
        c.AbortWithStatusJSON(500, gin.H{
            "code":    "INTERNAL_ERROR",
            "message": "internal server error",
        })
    }))
    // Security
    r.Use(SecurityHeadersMiddleware())
    r.Use(CORSMiddleware(allowedOrigins))
    r.Use(RateLimitMiddleware(100, 200))

    r.Run(":8080")
}
```

### Anti-Pattern 6: Skipping the Service Layer

```go
// BAD: Writing DB access code directly in the handler
func getUser(c *gin.Context) {
    id := c.Param("id")
    var user User
    err := db.QueryRow("SELECT * FROM users WHERE id = $1", id).Scan(&user.ID, &user.Name)
    if err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }
    c.JSON(200, user)
}

// GOOD: Go through the service layer
func (h *UserHandler) GetUser(c *gin.Context) {
    id, err := strconv.ParseInt(c.Param("id"), 10, 64)
    if err != nil {
        respondError(c, http.StatusBadRequest, "INVALID_ID", "Invalid ID")
        return
    }

    user, err := h.service.GetUser(c.Request.Context(), id)
    if err != nil {
        if errors.Is(err, ErrNotFound) {
            respondError(c, http.StatusNotFound, "NOT_FOUND", "User not found")
            return
        }
        respondError(c, http.StatusInternalServerError, "INTERNAL_ERROR", "Internal error")
        return
    }
    respondOK(c, user)
}
```

Writing DB access directly in the handler makes testing difficult and prevents reuse of business logic. By introducing a service layer, handlers can focus on HTTP input/output transformation.

---

## 5. FAQ

### Q1: Should I choose Gin or Echo?

There is virtually no performance difference between the two. Gin has a larger ecosystem and more available resources. Echo has a cleaner code design with the distinctive error-returning handler pattern. You can choose based on team preference, but in many cases Go 1.22+'s standard net/http is sufficient.

Decision criteria:
- **Gin**: Want a large community, prefer more resources available (including in Japanese), following existing Gin projects
- **Echo**: Prefer the error return value pattern, want rich built-in middleware, want to use custom context
- **net/http**: Want to minimize external dependencies, Go 1.22+'s new routing is sufficient, want lightweight microservices

### Q2: What is Gin Release mode?

Switching to production mode with `gin.SetMode(gin.ReleaseMode)` suppresses debug logging and slightly improves performance. It can also be set with the environment variable `GIN_MODE=release`. Always use Release mode in production deployments. In Debug mode, unnecessary information such as routing table output will appear in the logs.

```go
// Switch via environment variable
func init() {
    mode := os.Getenv("GIN_MODE")
    if mode == "" {
        mode = gin.DebugMode
    }
    gin.SetMode(mode)
}
```

### Q3: How do you integrate Swagger/OpenAPI?

Use `swaggo/swag` to automatically generate Swagger specs from handler comments. Serve `/swagger/index.html` with `gin-swagger` or `echo-swagger`. It is common practice to run `swag init` in the CI/CD pipeline and include the generated files in version control.

### Q4: How do you use context.Context in Gin/Echo?

In Gin, you can get the standard `context.Context` with `c.Request.Context()`. Always propagate this context to the service and repository layers. In Echo, it can similarly be obtained with `c.Request().Context()`.

```go
// Gin: context propagation
func (h *UserHandler) GetUser(c *gin.Context) {
    ctx := c.Request.Context()
    user, err := h.service.GetUser(ctx, id) // Pass ctx
    // ...
}

// Echo: context propagation
func (h *UserHandler) GetUser(c echo.Context) error {
    ctx := c.Request().Context()
    user, err := h.service.GetUser(ctx, id) // Pass ctx
    // ...
}
```

### Q5: How should versioning be designed?

URL path versioning is the most common approach. Header-based versioning makes implementation complex, so URL path versioning is recommended.

```go
// URL path versioning
v1 := r.Group("/api/v1")
{
    v1.GET("/users", v1ListUsers)
}

v2 := r.Group("/api/v2")
{
    v2.GET("/users", v2ListUsers) // Different response structure
}
```

### Q6: How do you mock the database in tests?

Define interfaces and inject mock implementations during testing. This is naturally achieved with the Clean Architecture repository pattern.

```go
// Mock repository
type MockUserRepository struct {
    users map[int64]*User
}

func (m *MockUserRepository) FindByID(ctx context.Context, id int64) (*User, error) {
    user, ok := m.users[id]
    if !ok {
        return nil, ErrNotFound
    }
    return user, nil
}

// Usage in tests
func TestGetUser(t *testing.T) {
    mockRepo := &MockUserRepository{
        users: map[int64]*User{1: {ID: 1, Name: "Test"}},
    }
    service := NewUserService(mockRepo, slog.Default())
    handler := NewUserHandler(service)
    // ...
}
```

### Q7: How do you organize a large number of routes?

The best practice is to split routes into separate files and define them as SetupXxxRoutes functions.

```go
// routes/user.go
func SetupUserRoutes(group *gin.RouterGroup, handler *UserHandler) {
    users := group.Group("/users")
    {
        users.GET("", handler.ListUsers)
        users.POST("", handler.CreateUser)
        users.GET("/:id", handler.GetUser)
        users.PUT("/:id", handler.UpdateUser)
        users.DELETE("/:id", handler.DeleteUser)
    }
}

// routes/order.go
func SetupOrderRoutes(group *gin.RouterGroup, handler *OrderHandler) {
    orders := group.Group("/orders")
    {
        orders.GET("", handler.ListOrders)
        orders.POST("", handler.CreateOrder)
    }
}

// main.go
func setupRoutes(r *gin.Engine, handlers *Handlers) {
    v1 := r.Group("/api/v1")
    v1.Use(authMiddleware)

    SetupUserRoutes(v1, handlers.User)
    SetupOrderRoutes(v1, handlers.Order)
    SetupProductRoutes(v1, handlers.Product)
}
```

### Q8: What are the key points for WebSocket implementation in Gin/Echo?

WebSocket connections are registered via Gin/Echo routing and upgraded with `gorilla/websocket`. Use the Hub pattern for connection management, and separate read/write operations into different goroutines. In production, connection health monitoring via ping is essential.

---


## FAQ

### Q1: What is the most important point when learning this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory, but by actually writing code and verifying its behavior.

### Q2: What are common mistakes beginners make?

Skipping the fundamentals and jumping to advanced topics. We recommend thoroughly understanding the basic concepts explained in this guide before moving on to the next step.

### Q3: How is this knowledge applied in practice?

The knowledge from this topic is frequently used in day-to-day development work. It becomes particularly important during code reviews and architecture design.

---

## Summary

| Concept | Key Points |
|---------|------------|
| Gin | High performance, large ecosystem. gin.H, binding |
| Echo | Clean design. Error return value pattern |
| Routing | Fast path matching with Radix tree |
| Validation | Based on go-playground/validator |
| Middleware | Can be applied per group |
| JWT Authentication | Token issuance and validation with golang-jwt |
| Swagger | Auto-generation with swaggo |
| Testing | Unit/integration testing with httptest + testify |
| WebSocket | gorilla/websocket + Hub pattern |
| Production Operations | Graceful Shutdown, structured logging, health checks |
| Clean Architecture | Dependency direction: Handler -> Service -> Repository |

---

## Recommended Next Reads

- [02-database.md](./02-database.md) -- Database Connectivity
- [03-grpc.md](./03-grpc.md) -- gRPC
- [04-testing.md](./04-testing.md) -- Testing
- [00-net-http.md](./00-net-http.md) -- Standard net/http

---

## References

1. **Gin Web Framework** -- https://gin-gonic.com/docs/
2. **Echo -- High performance, extensible, minimalist Go web framework** -- https://echo.labstack.com/
3. **swaggo/swag** -- https://github.com/swaggo/swag
4. **go-playground/validator** -- https://github.com/go-playground/validator
5. **gorilla/websocket** -- https://github.com/gorilla/websocket
6. **golang-jwt/jwt** -- https://github.com/golang-jwt/jwt



===== SOURCE: 02-programming/go-practical-guide/docs/02-web/02-database.md =====

# Database -- database/sql, sqlx, GORM

> Go provides standard DB connectivity via database/sql, enhances productivity with sqlx and GORM, and supports production operations through migrations and connection pooling.

---

## What You Will Learn in This Chapter

1. **database/sql** -- DB operations and connection pool management with the standard library
2. **sqlx / GORM** -- Choosing between higher-level libraries and practical techniques
3. **Connection Pooling and Migrations** -- Best practices for production operations
4. **Transaction Design** -- Leveraging ACID properties and avoiding deadlocks
5. **Performance Optimization** -- Query optimization, detecting and addressing the N+1 problem
6. **Test Strategies** -- DB testing approaches and test containers


## Prerequisites

Before reading this guide, having the following knowledge will deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts
- Familiarity with the content in [Gin / Echo -- Go Web Frameworks](./01-gin-echo.md)

---

## 1. database/sql Basics

### Code Example 1: database/sql Connection and Pool Configuration

```go
package main

import (
    "context"
    "database/sql"
    "fmt"
    "log"
    "time"

    _ "github.com/lib/pq"
)

func main() {
    // sql.Open initializes the connection pool but does not establish an actual connection
    db, err := sql.Open("postgres", "postgres://user:pass@localhost/mydb?sslmode=disable")
    if err != nil {
        log.Fatal(err)
    }
    defer db.Close()

    // Connection pool settings (must be configured in production environments)
    db.SetMaxOpenConns(25)              // Maximum number of concurrent connections
    db.SetMaxIdleConns(5)               // Maximum number of idle connections
    db.SetConnMaxLifetime(5 * time.Minute) // Maximum lifetime of a connection
    db.SetConnMaxIdleTime(1 * time.Minute) // Maximum idle time for a connection

    // Verify the actual connection with Ping
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    if err := db.PingContext(ctx); err != nil {
        log.Fatal("DB connection failed:", err)
    }

    fmt.Println("DB connection successful")
}
```

### Code Example 2: Driver Registration and DSN Construction

```go
package database

import (
    "database/sql"
    "fmt"
    "net/url"

    _ "github.com/go-sql-driver/mysql" // MySQL
    _ "github.com/lib/pq"              // PostgreSQL
    _ "github.com/mattn/go-sqlite3"    // SQLite
    _ "modernc.org/sqlite"             // SQLite (no CGO required)
)

// Config represents DB connection settings
type Config struct {
    Driver   string
    Host     string
    Port     int
    User     string
    Password string
    DBName   string
    SSLMode  string
    Params   map[string]string
}

// DSN generates a DSN string for each driver
func (c *Config) DSN() string {
    switch c.Driver {
    case "postgres":
        return fmt.Sprintf(
            "postgres://%s:%s@%s:%d/%s?sslmode=%s",
            url.QueryEscape(c.User),
            url.QueryEscape(c.Password),
            c.Host, c.Port, c.DBName, c.SSLMode,
        )
    case "mysql":
        // user:password@tcp(host:port)/dbname?param=value
        return fmt.Sprintf(
            "%s:%s@tcp(%s:%d)/%s?parseTime=true&loc=Asia%%2FTokyo",
            c.User, c.Password, c.Host, c.Port, c.DBName,
        )
    case "sqlite3", "sqlite":
        return c.DBName // File path or ":memory:"
    default:
        panic("unsupported driver: " + c.Driver)
    }
}

// Open initializes the DB connection pool
func Open(cfg Config) (*sql.DB, error) {
    db, err := sql.Open(cfg.Driver, cfg.DSN())
    if err != nil {
        return nil, fmt.Errorf("sql.Open: %w", err)
    }

    // Pool settings based on the driver
    switch cfg.Driver {
    case "postgres", "mysql":
        db.SetMaxOpenConns(25)
        db.SetMaxIdleConns(5)
        db.SetConnMaxLifetime(5 * time.Minute)
    case "sqlite3", "sqlite":
        // Single connection is recommended for SQLite
        db.SetMaxOpenConns(1)
    }

    return db, nil
}
```

### Code Example 3: CRUD Operations (database/sql)

```go
package repository

import (
    "context"
    "database/sql"
    "errors"
    "fmt"
    "time"
)

// User represents a user entity
type User struct {
    ID        int64
    Name      string
    Email     string
    CreatedAt time.Time
    UpdatedAt time.Time
}

// ErrNotFound is the error returned when a resource is not found
var ErrNotFound = errors.New("resource not found")

// UserRepository provides access to user data
type UserRepository struct {
    db *sql.DB
}

// NewUserRepository creates a new UserRepository
func NewUserRepository(db *sql.DB) *UserRepository {
    return &UserRepository{db: db}
}

// GetByID retrieves a user by the specified ID
func (r *UserRepository) GetByID(ctx context.Context, id int64) (*User, error) {
    var u User
    err := r.db.QueryRowContext(ctx,
        `SELECT id, name, email, created_at, updated_at
         FROM users WHERE id = $1`, id,
    ).Scan(&u.ID, &u.Name, &u.Email, &u.CreatedAt, &u.UpdatedAt)

    if errors.Is(err, sql.ErrNoRows) {
        return nil, fmt.Errorf("user id=%d: %w", id, ErrNotFound)
    }
    if err != nil {
        return nil, fmt.Errorf("GetByID(%d): %w", id, err)
    }
    return &u, nil
}

// GetByEmail searches for a user by email address
func (r *UserRepository) GetByEmail(ctx context.Context, email string) (*User, error) {
    var u User
    err := r.db.QueryRowContext(ctx,
        `SELECT id, name, email, created_at, updated_at
         FROM users WHERE email = $1`, email,
    ).Scan(&u.ID, &u.Name, &u.Email, &u.CreatedAt, &u.UpdatedAt)

    if errors.Is(err, sql.ErrNoRows) {
        return nil, fmt.Errorf("user email=%s: %w", email, ErrNotFound)
    }
    if err != nil {
        return nil, fmt.Errorf("GetByEmail(%s): %w", email, err)
    }
    return &u, nil
}

// List retrieves all users (with pagination)
func (r *UserRepository) List(ctx context.Context, limit, offset int) ([]User, error) {
    rows, err := r.db.QueryContext(ctx,
        `SELECT id, name, email, created_at, updated_at
         FROM users
         ORDER BY id
         LIMIT $1 OFFSET $2`, limit, offset,
    )
    if err != nil {
        return nil, fmt.Errorf("List: %w", err)
    }
    defer rows.Close()

    var users []User
    for rows.Next() {
        var u User
        if err := rows.Scan(&u.ID, &u.Name, &u.Email, &u.CreatedAt, &u.UpdatedAt); err != nil {
            return nil, fmt.Errorf("List scan: %w", err)
        }
        users = append(users, u)
    }
    // Check for errors during iteration with rows.Err() (important)
    if err := rows.Err(); err != nil {
        return nil, fmt.Errorf("List rows: %w", err)
    }
    return users, nil
}

// Search searches for users by keyword
func (r *UserRepository) Search(ctx context.Context, keyword string) ([]User, error) {
    // Escape wildcards for LIKE search
    escapedKeyword := "%" + keyword + "%"

    rows, err := r.db.QueryContext(ctx,
        `SELECT id, name, email, created_at, updated_at
         FROM users
         WHERE name ILIKE $1 OR email ILIKE $1
         ORDER BY name`, escapedKeyword,
    )
    if err != nil {
        return nil, fmt.Errorf("Search: %w", err)
    }
    defer rows.Close()

    var users []User
    for rows.Next() {
        var u User
        if err := rows.Scan(&u.ID, &u.Name, &u.Email, &u.CreatedAt, &u.UpdatedAt); err != nil {
            return nil, err
        }
        users = append(users, u)
    }
    return users, rows.Err()
}

// Create creates a new user
func (r *UserRepository) Create(ctx context.Context, u *User) error {
    err := r.db.QueryRowContext(ctx,
        `INSERT INTO users (name, email, created_at, updated_at)
         VALUES ($1, $2, NOW(), NOW())
         RETURNING id, created_at, updated_at`,
        u.Name, u.Email,
    ).Scan(&u.ID, &u.CreatedAt, &u.UpdatedAt)

    if err != nil {
        return fmt.Errorf("Create user: %w", err)
    }
    return nil
}

// Update updates an existing user
func (r *UserRepository) Update(ctx context.Context, u *User) error {
    result, err := r.db.ExecContext(ctx,
        `UPDATE users SET name = $1, email = $2, updated_at = NOW()
         WHERE id = $3`,
        u.Name, u.Email, u.ID,
    )
    if err != nil {
        return fmt.Errorf("Update user: %w", err)
    }

    rowsAffected, err := result.RowsAffected()
    if err != nil {
        return fmt.Errorf("Update RowsAffected: %w", err)
    }
    if rowsAffected == 0 {
        return fmt.Errorf("user id=%d: %w", u.ID, ErrNotFound)
    }
    return nil
}

// Delete deletes a user
func (r *UserRepository) Delete(ctx context.Context, id int64) error {
    result, err := r.db.ExecContext(ctx,
        `DELETE FROM users WHERE id = $1`, id,
    )
    if err != nil {
        return fmt.Errorf("Delete user: %w", err)
    }

    rowsAffected, err := result.RowsAffected()
    if err != nil {
        return fmt.Errorf("Delete RowsAffected: %w", err)
    }
    if rowsAffected == 0 {
        return fmt.Errorf("user id=%d: %w", id, ErrNotFound)
    }
    return nil
}

// BulkCreate creates multiple users in bulk
func (r *UserRepository) BulkCreate(ctx context.Context, users []User) error {
    // For large volumes, the COPY protocol is faster,
    // but here we use multi-row INSERT ... VALUES
    tx, err := r.db.BeginTx(ctx, nil)
    if err != nil {
        return fmt.Errorf("BulkCreate begin: %w", err)
    }
    defer tx.Rollback()

    stmt, err := tx.PrepareContext(ctx,
        `INSERT INTO users (name, email, created_at, updated_at)
         VALUES ($1, $2, NOW(), NOW())
         RETURNING id`)
    if err != nil {
        return fmt.Errorf("BulkCreate prepare: %w", err)
    }
    defer stmt.Close()

    for i := range users {
        err := stmt.QueryRowContext(ctx, users[i].Name, users[i].Email).Scan(&users[i].ID)
        if err != nil {
            return fmt.Errorf("BulkCreate insert %d: %w", i, err)
        }
    }

    return tx.Commit()
}
```

### Code Example 4: Using Prepared Statements

```go
package repository

import (
    "context"
    "database/sql"
    "fmt"
)

// PreparedUserRepository is a repository that uses Prepared Statements
type PreparedUserRepository struct {
    db         *sql.DB
    stmtGetByID *sql.Stmt
    stmtList    *sql.Stmt
    stmtCreate  *sql.Stmt
    stmtUpdate  *sql.Stmt
    stmtDelete  *sql.Stmt
}

// NewPreparedUserRepository prepares statements in advance
func NewPreparedUserRepository(ctx context.Context, db *sql.DB) (*PreparedUserRepository, error) {
    r := &PreparedUserRepository{db: db}
    var err error

    r.stmtGetByID, err = db.PrepareContext(ctx,
        `SELECT id, name, email, created_at, updated_at FROM users WHERE id = $1`)
    if err != nil {
        return nil, fmt.Errorf("prepare GetByID: %w", err)
    }

    r.stmtList, err = db.PrepareContext(ctx,
        `SELECT id, name, email, created_at, updated_at FROM users ORDER BY id LIMIT $1 OFFSET $2`)
    if err != nil {
        return nil, fmt.Errorf("prepare List: %w", err)
    }

    r.stmtCreate, err = db.PrepareContext(ctx,
        `INSERT INTO users (name, email, created_at, updated_at)
         VALUES ($1, $2, NOW(), NOW()) RETURNING id, created_at, updated_at`)
    if err != nil {
        return nil, fmt.Errorf("prepare Create: %w", err)
    }

    r.stmtUpdate, err = db.PrepareContext(ctx,
        `UPDATE users SET name = $1, email = $2, updated_at = NOW() WHERE id = $3`)
    if err != nil {
        return nil, fmt.Errorf("prepare Update: %w", err)
    }

    r.stmtDelete, err = db.PrepareContext(ctx,
        `DELETE FROM users WHERE id = $1`)
    if err != nil {
        return nil, fmt.Errorf("prepare Delete: %w", err)
    }

    return r, nil
}

// Close closes all Prepared Statements
func (r *PreparedUserRepository) Close() error {
    stmts := []*sql.Stmt{r.stmtGetByID, r.stmtList, r.stmtCreate, r.stmtUpdate, r.stmtDelete}
    for _, stmt := range stmts {
        if stmt != nil {
            stmt.Close()
        }
    }
    return nil
}

// GetByID retrieves a user efficiently using a Prepared Statement
func (r *PreparedUserRepository) GetByID(ctx context.Context, id int64) (*User, error) {
    var u User
    err := r.stmtGetByID.QueryRowContext(ctx, id).
        Scan(&u.ID, &u.Name, &u.Email, &u.CreatedAt, &u.UpdatedAt)
    if err != nil {
        return nil, err
    }
    return &u, nil
}
```

### Code Example 5: Transaction Management

```go
package service

import (
    "context"
    "database/sql"
    "fmt"
)

// TxFunc is the function type executed within a transaction
type TxFunc func(tx *sql.Tx) error

// WithTransaction is a helper function for transaction management
// It automatically handles panic recovery, rollback, and commit
func WithTransaction(ctx context.Context, db *sql.DB, opts *sql.TxOptions, fn TxFunc) error {
    tx, err := db.BeginTx(ctx, opts)
    if err != nil {
        return fmt.Errorf("begin transaction: %w", err)
    }

    defer func() {
        if p := recover(); p != nil {
            // Rollback on panic
            _ = tx.Rollback()
            panic(p) // Re-panic
        }
    }()

    if err := fn(tx); err != nil {
        if rbErr := tx.Rollback(); rbErr != nil {
            return fmt.Errorf("rollback failed: %v (original: %w)", rbErr, err)
        }
        return err
    }

    if err := tx.Commit(); err != nil {
        return fmt.Errorf("commit: %w", err)
    }
    return nil
}

// Usage example: Money transfer
func (s *AccountService) Transfer(ctx context.Context, fromID, toID int64, amount float64) error {
    return WithTransaction(ctx, s.db, &sql.TxOptions{
        Isolation: sql.LevelSerializable,
    }, func(tx *sql.Tx) error {
        // Check sender's balance
        var balance float64
        err := tx.QueryRowContext(ctx,
            "SELECT balance FROM accounts WHERE id = $1 FOR UPDATE", fromID,
        ).Scan(&balance)
        if err != nil {
            return fmt.Errorf("get balance: %w", err)
        }

        if balance < amount {
            return fmt.Errorf("insufficient funds: balance=%.2f, amount=%.2f", balance, amount)
        }

        // Debit from sender
        _, err = tx.ExecContext(ctx,
            "UPDATE accounts SET balance = balance - $1, updated_at = NOW() WHERE id = $2",
            amount, fromID)
        if err != nil {
            return fmt.Errorf("debit: %w", err)
        }

        // Credit to recipient
        _, err = tx.ExecContext(ctx,
            "UPDATE accounts SET balance = balance + $1, updated_at = NOW() WHERE id = $2",
            amount, toID)
        if err != nil {
            return fmt.Errorf("credit: %w", err)
        }

        // Record transaction history
        _, err = tx.ExecContext(ctx,
            `INSERT INTO transactions (from_account_id, to_account_id, amount, created_at)
             VALUES ($1, $2, $3, NOW())`, fromID, toID, amount)
        if err != nil {
            return fmt.Errorf("record transaction: %w", err)
        }

        return nil
    })
}

// ReadOnlyTransaction is a read-only transaction
func ReadOnlyTransaction(ctx context.Context, db *sql.DB, fn TxFunc) error {
    return WithTransaction(ctx, db, &sql.TxOptions{
        ReadOnly: true,
    }, fn)
}

// Transaction isolation level usage guide
// sql.LevelDefault          - Driver default (PostgreSQL uses ReadCommitted)
// sql.LevelReadUncommitted  - Allows dirty reads (rarely used)
// sql.LevelReadCommitted    - Only reads committed data
// sql.LevelRepeatableRead   - Guarantees same results within a transaction
// sql.LevelSerializable     - Most strict (risk of deadlocks)
```

### Code Example 6: Handling Null Values

```go
package model

import (
    "database/sql"
    "encoding/json"
    "time"
)

// NullableUser is a user with nullable fields
type NullableUser struct {
    ID        int64
    Name      string
    Email     sql.NullString  // Nullable
    Phone     sql.NullString  // Nullable
    Age       sql.NullInt64   // Nullable
    Score     sql.NullFloat64 // Nullable
    IsActive  sql.NullBool    // Nullable
    DeletedAt sql.NullTime    // Nullable (soft delete)
}

// UserJSON is a struct for JSON responses
type UserJSON struct {
    ID        int64   `json:"id"`
    Name      string  `json:"name"`
    Email     *string `json:"email,omitempty"`
    Phone     *string `json:"phone,omitempty"`
    Age       *int64  `json:"age,omitempty"`
    Score     *float64 `json:"score,omitempty"`
    IsActive  *bool   `json:"is_active,omitempty"`
    DeletedAt *time.Time `json:"deleted_at,omitempty"`
}

// ToJSON converts NullableUser to a JSON-friendly struct
func (u *NullableUser) ToJSON() UserJSON {
    j := UserJSON{
        ID:   u.ID,
        Name: u.Name,
    }
    if u.Email.Valid {
        j.Email = &u.Email.String
    }
    if u.Phone.Valid {
        j.Phone = &u.Phone.String
    }
    if u.Age.Valid {
        j.Age = &u.Age.Int64
    }
    if u.Score.Valid {
        j.Score = &u.Score.Float64
    }
    if u.IsActive.Valid {
        j.IsActive = &u.IsActive.Bool
    }
    if u.DeletedAt.Valid {
        j.DeletedAt = &u.DeletedAt.Time
    }
    return j
}

// Custom Null type (a more idiomatic Go approach)
// Null representation using generics (Go 1.18+)
type Nullable[T any] struct {
    Value T
    Valid bool
}

func NewNullableT any Nullable[T] {
    return Nullable[T]{Value: v, Valid: true}
}

func NullValue[T any]() Nullable[T] {
    return Nullable[T]{Valid: false}
}

func (n Nullable[T]) MarshalJSON() ([]byte, error) {
    if !n.Valid {
        return []byte("null"), nil
    }
    return json.Marshal(n.Value)
}
```

---

## 2. Using sqlx

### Code Example 7: sqlx Basic Operations

```go
package repository

import (
    "context"
    "fmt"
    "time"

    "github.com/jmoiron/sqlx"
    _ "github.com/lib/pq"
)

// User is a struct using sqlx's db tags
type User struct {
    ID        int64     `db:"id" json:"id"`
    Name      string    `db:"name" json:"name"`
    Email     string    `db:"email" json:"email"`
    Role      string    `db:"role" json:"role"`
    CreatedAt time.Time `db:"created_at" json:"created_at"`
    UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
}

// SqlxUserRepository is a repository using sqlx
type SqlxUserRepository struct {
    db *sqlx.DB
}

// NewSqlxUserRepository initializes a sqlx connection
func NewSqlxUserRepository(dsn string) (*SqlxUserRepository, error) {
    // sqlx.Connect performs Open + Ping
    db, err := sqlx.Connect("postgres", dsn)
    if err != nil {
        return nil, fmt.Errorf("sqlx.Connect: %w", err)
    }

    db.SetMaxOpenConns(25)
    db.SetMaxIdleConns(5)
    db.SetConnMaxLifetime(5 * time.Minute)

    return &SqlxUserRepository{db: db}, nil
}

// GetByID retrieves a single row using sqlx.GetContext
func (r *SqlxUserRepository) GetByID(ctx context.Context, id int64) (*User, error) {
    var u User
    err := r.db.GetContext(ctx, &u,
        `SELECT id, name, email, role, created_at, updated_at
         FROM users WHERE id = $1`, id)
    if err != nil {
        return nil, fmt.Errorf("GetByID(%d): %w", id, err)
    }
    return &u, nil
}

// List retrieves multiple rows using sqlx.SelectContext
func (r *SqlxUserRepository) List(ctx context.Context, limit, offset int) ([]User, error) {
    var users []User
    err := r.db.SelectContext(ctx, &users,
        `SELECT id, name, email, role, created_at, updated_at
         FROM users ORDER BY id LIMIT $1 OFFSET $2`, limit, offset)
    if err != nil {
        return nil, fmt.Errorf("List: %w", err)
    }
    return users, nil
}

// Create inserts using NamedExecContext with named parameters
func (r *SqlxUserRepository) Create(ctx context.Context, u *User) error {
    query := `INSERT INTO users (name, email, role, created_at, updated_at)
              VALUES (:name, :email, :role, NOW(), NOW())
              RETURNING id, created_at, updated_at`
    rows, err := r.db.NamedQueryContext(ctx, query, u)
    if err != nil {
        return fmt.Errorf("Create: %w", err)
    }
    defer rows.Close()
    if rows.Next() {
        if err := rows.Scan(&u.ID, &u.CreatedAt, &u.UpdatedAt); err != nil {
            return fmt.Errorf("Create scan: %w", err)
        }
    }
    return nil
}

// Update updates using NamedExecContext with named parameters
func (r *SqlxUserRepository) Update(ctx context.Context, u *User) error {
    result, err := r.db.NamedExecContext(ctx,
        `UPDATE users SET name = :name, email = :email, role = :role, updated_at = NOW()
         WHERE id = :id`, u)
    if err != nil {
        return fmt.Errorf("Update: %w", err)
    }
    rowsAffected, _ := result.RowsAffected()
    if rowsAffected == 0 {
        return ErrNotFound
    }
    return nil
}

// ListByRole retrieves a list of users with a specific role
func (r *SqlxUserRepository) ListByRole(ctx context.Context, role string) ([]User, error) {
    var users []User
    err := r.db.SelectContext(ctx, &users,
        `SELECT id, name, email, role, created_at, updated_at
         FROM users WHERE role = $1 ORDER BY name`, role)
    return users, err
}

// SearchByNames performs a multi-value search using an IN clause (using sqlx's In function)
func (r *SqlxUserRepository) SearchByNames(ctx context.Context, names []string) ([]User, error) {
    // sqlx.In expands a slice into placeholders
    query, args, err := sqlx.In(
        `SELECT id, name, email, role, created_at, updated_at
         FROM users WHERE name IN (?) ORDER BY name`, names)
    if err != nil {
        return nil, fmt.Errorf("sqlx.In: %w", err)
    }

    // Rebind to $1-style placeholders for PostgreSQL
    query = r.db.Rebind(query)

    var users []User
    err = r.db.SelectContext(ctx, &users, query, args...)
    return users, err
}
```

### Code Example 8: Advanced sqlx Features

```go
package repository

import (
    "context"
    "database/sql"
    "fmt"

    "github.com/jmoiron/sqlx"
)

// Dynamic query builder
type UserFilter struct {
    Name     *string
    Email    *string
    Role     *string
    MinAge   *int
    MaxAge   *int
    IsActive *bool
    OrderBy  string
    Limit    int
    Offset   int
}

// BuildQuery constructs a dynamic query based on filter conditions
func (f *UserFilter) BuildQuery() (string, map[string]interface{}) {
    query := `SELECT id, name, email, role, created_at, updated_at FROM users WHERE 1=1`
    args := make(map[string]interface{})

    if f.Name != nil {
        query += ` AND name ILIKE :name`
        args["name"] = "%" + *f.Name + "%"
    }
    if f.Email != nil {
        query += ` AND email ILIKE :email`
        args["email"] = "%" + *f.Email + "%"
    }
    if f.Role != nil {
        query += ` AND role = :role`
        args["role"] = *f.Role
    }
    if f.MinAge != nil {
        query += ` AND age >= :min_age`
        args["min_age"] = *f.MinAge
    }
    if f.MaxAge != nil {
        query += ` AND age <= :max_age`
        args["max_age"] = *f.MaxAge
    }
    if f.IsActive != nil {
        query += ` AND is_active = :is_active`
        args["is_active"] = *f.IsActive
    }

    // ORDER BY
    if f.OrderBy != "" {
        // SQL injection prevention: whitelist
        allowed := map[string]bool{
            "name": true, "email": true, "created_at": true, "id": true,
        }
        if allowed[f.OrderBy] {
            query += fmt.Sprintf(` ORDER BY %s`, f.OrderBy)
        }
    } else {
        query += ` ORDER BY id`
    }

    // LIMIT / OFFSET
    if f.Limit > 0 {
        query += ` LIMIT :limit`
        args["limit"] = f.Limit
    }
    if f.Offset > 0 {
        query += ` OFFSET :offset`
        args["offset"] = f.Offset
    }

    return query, args
}

// SearchWithFilter searches for users with a dynamic filter
func (r *SqlxUserRepository) SearchWithFilter(ctx context.Context, filter UserFilter) ([]User, error) {
    query, args := filter.BuildQuery()

    // sqlx.Named converts a named query into a query with placeholders
    rows, err := r.db.NamedQueryContext(ctx, query, args)
    if err != nil {
        return nil, fmt.Errorf("SearchWithFilter: %w", err)
    }
    defer rows.Close()

    var users []User
    for rows.Next() {
        var u User
        if err := rows.StructScan(&u); err != nil {
            return nil, err
        }
        users = append(users, u)
    }
    return users, rows.Err()
}

// StructScan vs Scan comparison
func demonstrateScanDifference(db *sqlx.DB) {
    // database/sql: Manual Scan for each column
    row := db.QueryRow("SELECT id, name, email FROM users WHERE id = $1", 1)
    var id int64
    var name, email string
    row.Scan(&id, &name, &email) // Must match column order

    // sqlx: Automatic mapping to a struct
    var user User
    db.Get(&user, "SELECT id, name, email FROM users WHERE id = $1", 1)
    // Automatically mapped based on db tags
}
```

---

## 3. Using GORM

### Code Example 9: GORM Basic Operations

```go
package repository

import (
    "context"
    "errors"
    "fmt"
    "time"

    "gorm.io/driver/postgres"
    "gorm.io/gorm"
    "gorm.io/gorm/clause"
    "gorm.io/gorm/logger"
)

// GormUser is a GORM model
type GormUser struct {
    ID        uint           `gorm:"primarykey" json:"id"`
    Name      string         `gorm:"size:100;not null;index" json:"name"`
    Email     string         `gorm:"uniqueIndex;not null;size:255" json:"email"`
    Role      string         `gorm:"size:50;default:'user'" json:"role"`
    Age       int            `gorm:"check:age >= 0" json:"age"`
    Profile   *GormProfile   `gorm:"foreignKey:UserID" json:"profile,omitempty"` // has one
    Orders    []GormOrder    `gorm:"foreignKey:UserID" json:"orders,omitempty"`  // has many
    CreatedAt time.Time      `json:"created_at"`
    UpdatedAt time.Time      `json:"updated_at"`
    DeletedAt gorm.DeletedAt `gorm:"index" json:"deleted_at,omitempty"` // Soft delete
}

// TableName customizes the table name
func (GormUser) TableName() string {
    return "users"
}

// GormProfile is a user profile
type GormProfile struct {
    ID     uint   `gorm:"primarykey"`
    UserID uint   `gorm:"uniqueIndex;not null"`
    Bio    string `gorm:"type:text"`
    Avatar string `gorm:"size:500"`
}

// GormOrder is an order
type GormOrder struct {
    ID        uint      `gorm:"primarykey"`
    UserID    uint      `gorm:"index;not null"`
    ProductID uint      `gorm:"index;not null"`
    Quantity  int       `gorm:"not null;check:quantity > 0"`
    Amount    float64   `gorm:"type:decimal(10,2);not null"`
    Status    string    `gorm:"size:20;default:'pending'"`
    CreatedAt time.Time
}

// InitGorm initializes a GORM connection
func InitGorm(dsn string) (*gorm.DB, error) {
    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
        Logger: logger.Default.LogMode(logger.Info), // Output SQL logs
        NowFunc: func() time.Time {
            return time.Now().UTC()
        },
        // Disable Dry Run mode before SQL execution
        DryRun: false,
        // PrepareStmt: true caches Prepared Statements
        PrepareStmt: true,
    })
    if err != nil {
        return nil, fmt.Errorf("gorm.Open: %w", err)
    }

    // Connection pool settings
    sqlDB, err := db.DB()
    if err != nil {
        return nil, fmt.Errorf("get sql.DB: %w", err)
    }
    sqlDB.SetMaxOpenConns(25)
    sqlDB.SetMaxIdleConns(5)
    sqlDB.SetConnMaxLifetime(5 * time.Minute)

    return db, nil
}

// GormUserRepository is a repository using GORM
type GormUserRepository struct {
    db *gorm.DB
}

// Create creates a user
func (r *GormUserRepository) Create(ctx context.Context, user *GormUser) error {
    result := r.db.WithContext(ctx).Create(user)
    if result.Error != nil {
        return fmt.Errorf("Create: %w", result.Error)
    }
    return nil
}

// GetByID retrieves a user by ID (including related data)
func (r *GormUserRepository) GetByID(ctx context.Context, id uint) (*GormUser, error) {
    var user GormUser
    result := r.db.WithContext(ctx).
        Preload("Profile").                           // Also load profile
        Preload("Orders", "status = ?", "completed"). // Only completed orders
        First(&user, id)

    if errors.Is(result.Error, gorm.ErrRecordNotFound) {
        return nil, ErrNotFound
    }
    if result.Error != nil {
        return nil, fmt.Errorf("GetByID: %w", result.Error)
    }
    return &user, nil
}

// List retrieves a paginated list of users
func (r *GormUserRepository) List(ctx context.Context, page, pageSize int) ([]GormUser, int64, error) {
    var users []GormUser
    var total int64

    // Count query
    r.db.WithContext(ctx).Model(&GormUser{}).Count(&total)

    // Data retrieval
    result := r.db.WithContext(ctx).
        Order("id ASC").
        Limit(pageSize).
        Offset((page - 1) * pageSize).
        Find(&users)

    return users, total, result.Error
}

// Search performs a conditional search
func (r *GormUserRepository) Search(ctx context.Context, filter map[string]interface{}) ([]GormUser, error) {
    var users []GormUser
    query := r.db.WithContext(ctx)

    if name, ok := filter["name"]; ok {
        query = query.Where("name ILIKE ?", "%"+name.(string)+"%")
    }
    if role, ok := filter["role"]; ok {
        query = query.Where("role = ?", role)
    }
    if minAge, ok := filter["min_age"]; ok {
        query = query.Where("age >= ?", minAge)
    }

    result := query.Find(&users)
    return users, result.Error
}

// Update updates a user
func (r *GormUserRepository) Update(ctx context.Context, user *GormUser) error {
    // Save updates all fields
    result := r.db.WithContext(ctx).Save(user)
    return result.Error
}

// UpdatePartial updates only the specified fields
func (r *GormUserRepository) UpdatePartial(ctx context.Context, id uint, updates map[string]interface{}) error {
    result := r.db.WithContext(ctx).
        Model(&GormUser{}).
        Where("id = ?", id).
        Updates(updates)

    if result.RowsAffected == 0 {
        return ErrNotFound
    }
    return result.Error
}

// Delete performs a soft delete
func (r *GormUserRepository) Delete(ctx context.Context, id uint) error {
    result := r.db.WithContext(ctx).Delete(&GormUser{}, id)
    if result.RowsAffected == 0 {
        return ErrNotFound
    }
    return result.Error
}

// HardDelete performs a permanent (hard) delete
func (r *GormUserRepository) HardDelete(ctx context.Context, id uint) error {
    result := r.db.WithContext(ctx).Unscoped().Delete(&GormUser{}, id)
    return result.Error
}

// Upsert updates if exists, inserts if not
func (r *GormUserRepository) Upsert(ctx context.Context, user *GormUser) error {
    result := r.db.WithContext(ctx).
        Clauses(clause.OnConflict{
            Columns:   []clause.Column{{Name: "email"}},
            DoUpdates: clause.AssignmentColumns([]string{"name", "role", "updated_at"}),
        }).
        Create(user)
    return result.Error
}
```

### Code Example 10: GORM Transactions and Hooks

```go
package service

import (
    "context"
    "fmt"

    "gorm.io/gorm"
)

// GormOrderService is the order service
type GormOrderService struct {
    db *gorm.DB
}

// CreateOrder creates an order within a transaction
func (s *GormOrderService) CreateOrder(ctx context.Context, order *GormOrder) error {
    return s.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
        // Check inventory
        var product Product
        if err := tx.Clauses(clause.Locking{Strength: "UPDATE"}).
            First(&product, order.ProductID).Error; err != nil {
            return fmt.Errorf("product not found: %w", err)
        }

        if product.Stock < order.Quantity {
            return fmt.Errorf("insufficient stock: available=%d, requested=%d",
                product.Stock, order.Quantity)
        }

        // Reduce inventory
        if err := tx.Model(&product).
            Update("stock", gorm.Expr("stock - ?", order.Quantity)).Error; err != nil {
            return fmt.Errorf("update stock: %w", err)
        }

        // Create the order
        order.Amount = product.Price * float64(order.Quantity)
        if err := tx.Create(order).Error; err != nil {
            return fmt.Errorf("create order: %w", err)
        }

        return nil
    })
}

// GORM Hooks (lifecycle callbacks)
func (u *GormUser) BeforeCreate(tx *gorm.DB) error {
    // Validation
    if u.Name == "" {
        return fmt.Errorf("name is required")
    }
    if u.Role == "" {
        u.Role = "user" // Default value
    }
    return nil
}

func (u *GormUser) AfterCreate(tx *gorm.DB) error {
    // Record audit log, etc.
    tx.Exec("INSERT INTO audit_logs (action, entity, entity_id) VALUES (?, ?, ?)",
        "CREATE", "users", u.ID)
    return nil
}

func (u *GormUser) BeforeUpdate(tx *gorm.DB) error {
    // Validation on update
    if u.Email != "" && !isValidEmail(u.Email) {
        return fmt.Errorf("invalid email format")
    }
    return nil
}
```

---

## 4. Migrations

### Code Example 11: Using golang-migrate

```go
package migrations

import (
    "database/sql"
    "fmt"
    "log"

    "github.com/golang-migrate/migrate/v4"
    "github.com/golang-migrate/migrate/v4/database/postgres"
    _ "github.com/golang-migrate/migrate/v4/source/file"
)

// RunMigrations executes migrations
func RunMigrations(db *sql.DB, migrationsPath string) error {
    driver, err := postgres.WithInstance(db, &postgres.Config{})
    if err != nil {
        return fmt.Errorf("create driver: %w", err)
    }

    m, err := migrate.NewWithDatabaseInstance(
        "file://"+migrationsPath,
        "postgres",
        driver,
    )
    if err != nil {
        return fmt.Errorf("create migrate: %w", err)
    }

    // Execute migration
    if err := m.Up(); err != nil && err != migrate.ErrNoChange {
        return fmt.Errorf("migrate up: %w", err)
    }

    version, dirty, err := m.Version()
    if err != nil {
        return fmt.Errorf("get version: %w", err)
    }
    log.Printf("Migration version: %d, dirty: %v", version, dirty)

    return nil
}

// RollbackMigration rolls back to the previous version
func RollbackMigration(db *sql.DB, migrationsPath string) error {
    driver, err := postgres.WithInstance(db, &postgres.Config{})
    if err != nil {
        return err
    }

    m, err := migrate.NewWithDatabaseInstance(
        "file://"+migrationsPath,
        "postgres",
        driver,
    )
    if err != nil {
        return err
    }

    return m.Steps(-1)
}
```

Migration file examples:

```sql
-- migrations/000001_create_users.up.sql
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    age INTEGER CHECK (age >= 0),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at);

-- migrations/000001_create_users.down.sql
DROP TABLE IF EXISTS users;

-- migrations/000002_create_orders.up.sql
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id BIGINT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- migrations/000002_create_orders.down.sql
DROP TABLE IF EXISTS orders;

-- migrations/000003_add_users_phone.up.sql
ALTER TABLE users ADD COLUMN phone VARCHAR(20);
CREATE INDEX idx_users_phone ON users(phone) WHERE phone IS NOT NULL;

-- migrations/000003_add_users_phone.down.sql
DROP INDEX IF EXISTS idx_users_phone;
ALTER TABLE users DROP COLUMN IF EXISTS phone;
```

### Code Example 12: Using goose

```go
package migrations

import (
    "database/sql"
    "fmt"

    "github.com/pressly/goose/v3"
)

// GooseMigrate performs migration using goose
func GooseMigrate(db *sql.DB, dir string) error {
    goose.SetDialect("postgres")

    if err := goose.Up(db, dir); err != nil {
        return fmt.Errorf("goose up: %w", err)
    }
    return nil
}

// GooseStatus displays the current migration status
func GooseStatus(db *sql.DB, dir string) error {
    goose.SetDialect("postgres")
    return goose.Status(db, dir)
}

// GooseRollback rolls back one step
func GooseRollback(db *sql.DB, dir string) error {
    goose.SetDialect("postgres")
    return goose.Down(db, dir)
}

// Go function migration (goose-specific feature)
func init() {
    goose.AddMigration(upSeedData, downSeedData)
}

func upSeedData(tx *sql.Tx) error {
    _, err := tx.Exec(`
        INSERT INTO users (name, email, role) VALUES
        ('Admin', 'admin@example.com', 'admin'),
        ('User1', 'user1@example.com', 'user'),
        ('User2', 'user2@example.com', 'user')
    `)
    return err
}

func downSeedData(tx *sql.Tx) error {
    _, err := tx.Exec(`DELETE FROM users WHERE email IN ('admin@example.com', 'user1@example.com', 'user2@example.com')`)
    return err
}
```

---

## 5. Test Strategies

### Code Example 13: DB Testing with testcontainers-go

```go
package repository_test

import (
    "context"
    "database/sql"
    "fmt"
    "testing"
    "time"

    _ "github.com/lib/pq"
    "github.com/testcontainers/testcontainers-go"
    "github.com/testcontainers/testcontainers-go/wait"
)

// setupTestDB starts a PostgreSQL container for testing
func setupTestDB(t *testing.T) (*sql.DB, func()) {
    t.Helper()
    ctx := context.Background()

    // Start the PostgreSQL container
    container, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{
        ContainerRequest: testcontainers.ContainerRequest{
            Image:        "postgres:16-alpine",
            ExposedPorts: []string{"5432/tcp"},
            Env: map[string]string{
                "POSTGRES_USER":     "test",
                "POSTGRES_PASSWORD": "test",
                "POSTGRES_DB":       "testdb",
            },
            WaitingFor: wait.ForListeningPort("5432/tcp").
                WithStartupTimeout(60 * time.Second),
        },
        Started: true,
    })
    if err != nil {
        t.Fatalf("Failed to start container: %v", err)
    }

    // Build DSN
    host, _ := container.Host(ctx)
    port, _ := container.MappedPort(ctx, "5432")
    dsn := fmt.Sprintf("postgres://test:test@%s:%s/testdb?sslmode=disable", host, port.Port())

    // Connect to DB
    db, err := sql.Open("postgres", dsn)
    if err != nil {
        t.Fatalf("Failed to connect to DB: %v", err)
    }

    // Create tables
    _, err = db.ExecContext(ctx, `
        CREATE TABLE IF NOT EXISTS users (
            id BIGSERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
    `)
    if err != nil {
        t.Fatalf("Failed to create table: %v", err)
    }

    // Cleanup function
    cleanup := func() {
        db.Close()
        container.Terminate(ctx)
    }

    return db, cleanup
}

func TestUserRepository_Create(t *testing.T) {
    db, cleanup := setupTestDB(t)
    defer cleanup()

    repo := NewUserRepository(db)
    ctx := context.Background()

    user := &User{Name: "Test User", Email: "test@example.com"}
    err := repo.Create(ctx, user)
    if err != nil {
        t.Fatalf("Create failed: %v", err)
    }

    if user.ID == 0 {
        t.Error("ID was not set")
    }

    // Retrieve and verify
    got, err := repo.GetByID(ctx, user.ID)
    if err != nil {
        t.Fatalf("GetByID failed: %v", err)
    }

    if got.Name != "Test User" {
        t.Errorf("Name = %q, want %q", got.Name, "Test User")
    }
    if got.Email != "test@example.com" {
        t.Errorf("Email = %q, want %q", got.Email, "test@example.com")
    }
}

func TestUserRepository_Update(t *testing.T) {
    db, cleanup := setupTestDB(t)
    defer cleanup()

    repo := NewUserRepository(db)
    ctx := context.Background()

    // Setup
    user := &User{Name: "Original", Email: "original@example.com"}
    if err := repo.Create(ctx, user); err != nil {
        t.Fatalf("Create failed: %v", err)
    }

    // Update
    user.Name = "Updated"
    if err := repo.Update(ctx, user); err != nil {
        t.Fatalf("Update failed: %v", err)
    }

    // Verify
    got, err := repo.GetByID(ctx, user.ID)
    if err != nil {
        t.Fatalf("GetByID failed: %v", err)
    }
    if got.Name != "Updated" {
        t.Errorf("Name = %q, want %q", got.Name, "Updated")
    }
}
```

### Code Example 14: Mocking with Interfaces

```go
package service

import (
    "context"
)

// UserRepository is the repository interface
type UserRepository interface {
    GetByID(ctx context.Context, id int64) (*User, error)
    List(ctx context.Context, limit, offset int) ([]User, error)
    Create(ctx context.Context, u *User) error
    Update(ctx context.Context, u *User) error
    Delete(ctx context.Context, id int64) error
}

// UserService is the business logic layer
type UserService struct {
    repo UserRepository
}

func NewUserService(repo UserRepository) *UserService {
    return &UserService{repo: repo}
}

func (s *UserService) GetUser(ctx context.Context, id int64) (*User, error) {
    return s.repo.GetByID(ctx, id)
}

// --- Test side ---

// mockUserRepository is a mock for testing
type mockUserRepository struct {
    users map[int64]*User
}

func newMockUserRepository() *mockUserRepository {
    return &mockUserRepository{users: make(map[int64]*User)}
}

func (m *mockUserRepository) GetByID(ctx context.Context, id int64) (*User, error) {
    u, ok := m.users[id]
    if !ok {
        return nil, ErrNotFound
    }
    return u, nil
}

func (m *mockUserRepository) List(ctx context.Context, limit, offset int) ([]User, error) {
    var result []User
    for _, u := range m.users {
        result = append(result, *u)
    }
    return result, nil
}

func (m *mockUserRepository) Create(ctx context.Context, u *User) error {
    u.ID = int64(len(m.users) + 1)
    m.users[u.ID] = u
    return nil
}

func (m *mockUserRepository) Update(ctx context.Context, u *User) error {
    if _, ok := m.users[u.ID]; !ok {
        return ErrNotFound
    }
    m.users[u.ID] = u
    return nil
}

func (m *mockUserRepository) Delete(ctx context.Context, id int64) error {
    if _, ok := m.users[id]; !ok {
        return ErrNotFound
    }
    delete(m.users, id)
    return nil
}
```

---

## 6. ASCII Diagrams

### Figure 1: database/sql Connection Pool Architecture

```
Application
  |
  v
+------------------------------------------------------+
|                   database/sql                        |
|                                                      |
|  +----------------------------------------------+   |
|  |              Connection Pool                  |   |
|  |                                              |   |
|  |  +------+ +------+ +------+     +------+   |   |
|  |  |Active| |Active| |Active| ... |Active|   |   |
|  |  |Conn 1| |Conn 2| |Conn 3|     |Conn N|   |   |
|  |  +------+ +------+ +------+     +------+   |   |
|  |                                              |   |
|  |  MaxOpenConns = 25                           |   |
|  |                                              |   |
|  |  +------+ +------+ +------+                |   |
|  |  | Idle | | Idle | | Idle |                |   |
|  |  |Conn 1| |Conn 2| |Conn 3|                |   |
|  |  +------+ +------+ +------+                |   |
|  |                                              |   |
|  |  MaxIdleConns = 5                            |   |
|  |  ConnMaxLifetime = 5m                        |   |
|  |  ConnMaxIdleTime = 1m                        |   |
|  +----------------------------------------------+   |
|                                                      |
|  +----------------------------------------------+   |
|  |           Driver Interface                    |   |
|  |  driver.Driver / driver.Connector             |   |
|  |  +---------+  +---------+  +----------+    |   |
|  |  | lib/pq  |  |go-mysql |  |go-sqlite3|    |   |
|  |  |(Postgres)|  |(MySQL)  |  |(SQLite)  |    |   |
|  |  +---------+  +---------+  +----------+    |   |
|  +----------------------------------------------+   |
+------------------+-----------------------------------+
                   | TCP / Unix Socket
              +----v------+
              | Database   |
              | Server     |
              +-----------+
```

### Figure 2: ORM vs Raw SQL Selection Guide

```
        Query Complexity
          ^
          |
     High |   +-----------------+
          |   |  Raw SQL +        |  Report/analytics queries
          |   |  database/sql    |  Complex JOINs (5+ tables)
          |   |  -> Full control  |  Window functions
          |   +-----------------+  CTEs (WITH clause)
          |                         Recursive queries
          |
     Mid  |   +-----------------+
          |   |   sqlx            |  Type-safe raw SQL
          |   |  -> Struct mapping|  Moderate JOINs
          |   |  -> Named Query   |  Dynamic filters
          |   +-----------------+
          |
     Low  |   +-----------------+
          |   |   GORM            |  CRUD-centric apps
          |   |  -> Rapid dev     |  Basic relations
          |   |  -> Migration     |  Prototypes
          |   +-----------------+
          |
          +-----------------------------> Development Speed
              Low                  High

Recommendations:
  New projects     -> sqlx (best balance)
  CRUD-centric     -> GORM (prioritize development speed)
  High-load/analytics -> database/sql (full control)
  Hybrid           -> Use raw SQL via GORM's DB().Raw() as needed
```

### Figure 3: Migration Flow

```
migrations/
├── 000001_create_users.up.sql
├── 000001_create_users.down.sql
├── 000002_create_orders.up.sql
├── 000002_create_orders.down.sql
├── 000003_add_users_phone.up.sql
└── 000003_add_users_phone.down.sql

migrate up                     migrate down
---------->                    <----------
V1 -> V2 -> V3                V3 -> V2 -> V1

+--------------------------------------+
| schema_migrations table              |
|                                      |
| version | dirty  | applied_at        |
| --------|--------|------------------ |
| 1       | false  | 2024-01-01 00:00  |
| 2       | false  | 2024-01-15 00:00  |
| 3       | false  | 2024-02-01 00:00  |
+--------------------------------------+

When dirty = true:
  Migration failed partway through
  -> Reset the state with migrate force <version>
  -> Fix the failed SQL and re-run
```

### Figure 4: Repository Pattern

```
+--------------------------------------------------+
|                  HTTP Handler                     |
|  (net/http, gin, echo)                           |
+------------------+-------------------------------+
                   |
                   v
+--------------------------------------------------+
|                  Service Layer                    |
|  Business logic, transaction management           |
|  -> UserService, OrderService                     |
+------------------+-------------------------------+
                   | interface
                   v
+--------------------------------------------------+
|              Repository Interface                 |
|  type UserRepository interface {                 |
|      GetByID(ctx, id) (*User, error)             |
|      List(ctx, limit, offset) ([]User, error)    |
|      Create(ctx, *User) error                    |
|      Update(ctx, *User) error                    |
|      Delete(ctx, id) error                       |
|  }                                               |
+------------------+-------------------------------+
         +---------+---------+
         v         v         v
+------------+ +--------+ +----------+
| PostgreSQL | | MySQL  | |  Mock    |
| Repository | | Repo   | | (Test)   |
+------+-----+ +---+----+ +----------+
       |           |
       v           v
   PostgreSQL    MySQL
```

---

## 7. Comparison Tables

### Table 1: Detailed Comparison of Go DB Libraries

| Item | database/sql | sqlx | GORM | ent |
|------|-------------|------|------|-----|
| Type safety | Manual Scan | struct tags | Full ORM | Code generation |
| SQL writing | Raw SQL | Raw SQL | Method chaining | DSL/Raw SQL |
| Learning cost | Low | Low | Medium | High |
| Performance | Highest | High | Medium | High |
| Migration | None | None | AutoMigrate | atlas integration |
| N+1 detection | None | None | None (plugin) | Built-in |
| Transactions | Manual | Manual | Auto/Manual | Auto/Manual |
| Relations | Manual JOIN | Manual JOIN | Preload/Joins | Edge |
| Prepared Stmt | Manual | Manual | PrepareStmt config | Automatic |
| NULL handling | sql.Null* | sql.Null* | Pointer types | Optional field |
| Batch processing | Manual | Manual | CreateInBatches | Bulk operations |
| Recommended for | Small-scale/high-perf | Medium-scale | CRUD-centric | Large-scale/type-safe |

### Table 2: Detailed Comparison of Migration Tools

| Tool | Language | Approach | Features | CLI | Go API |
|------|----------|----------|----------|-----|--------|
| golang-migrate | Go | File-based | Lightweight, SQL/Go support | Yes | Yes |
| goose | Go | File-based | Simple, Go function support | Yes | Yes |
| atlas | Go | Declarative + versioned | HCL definitions, diff detection | Yes | Yes |
| GORM AutoMigrate | Go | Automatic | Inferred from structs | No | Yes |
| Flyway | Java | File-based | Enterprise, multi-DB support | Yes | No |
| dbmate | Go | File-based | Docker support, lightweight | Yes | No |

### Table 3: Connection Pool Parameter Configuration Guide

| Parameter | Small-scale | Medium-scale | Large-scale | Description |
|-----------|------------|--------------|-------------|-------------|
| MaxOpenConns | 5-10 | 15-30 | 50-100 | Maximum concurrent connections |
| MaxIdleConns | 2-3 | 5-10 | 10-25 | Number of idle connections to keep |
| ConnMaxLifetime | 10m | 5m | 3m | Maximum lifetime of a connection |
| ConnMaxIdleTime | 5m | 2m | 1m | Timeout for idle connections |

### Table 4: Transaction Isolation Levels

| Isolation Level | Dirty Read | Non-repeatable Read | Phantom Read | Use Case |
|----------------|------------|---------------------|--------------|----------|
| Read Uncommitted | Yes | Yes | Yes | Rarely used |
| Read Committed | No | Yes | Yes | PostgreSQL default |
| Repeatable Read | No | No | Yes(*) | MySQL InnoDB default |
| Serializable | No | No | No | Money transfers, inventory management |

(*) PostgreSQL's Repeatable Read also prevents phantom reads

---

## 8. Performance Optimization

### Detecting and Addressing the N+1 Problem

```go
// N+1 problem example
// BAD: Individual query per user for orders (N+1)
func (r *UserRepository) ListWithOrders_Bad(ctx context.Context) ([]UserWithOrders, error) {
    users, err := r.ListUsers(ctx) // 1 query
    if err != nil {
        return nil, err
    }

    var result []UserWithOrders
    for _, u := range users {
        // N queries (one per user)
        orders, err := r.GetOrdersByUserID(ctx, u.ID)
        if err != nil {
            return nil, err
        }
        result = append(result, UserWithOrders{User: u, Orders: orders})
    }
    return result, nil
}

// GOOD: Consolidate into a single query with JOIN
func (r *UserRepository) ListWithOrders_Good(ctx context.Context) ([]UserWithOrders, error) {
    rows, err := r.db.QueryContext(ctx, `
        SELECT u.id, u.name, u.email,
               o.id AS order_id, o.product_id, o.quantity, o.amount
        FROM users u
        LEFT JOIN orders o ON o.user_id = u.id
        ORDER BY u.id, o.id
    `)
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    // Group the results
    userMap := make(map[int64]*UserWithOrders)
    var orderedIDs []int64

    for rows.Next() {
        var (
            userID    int64
            userName  string
            userEmail string
            orderID   sql.NullInt64
            productID sql.NullInt64
            quantity  sql.NullInt32
            amount    sql.NullFloat64
        )
        if err := rows.Scan(&userID, &userName, &userEmail,
            &orderID, &productID, &quantity, &amount); err != nil {
            return nil, err
        }

        if _, ok := userMap[userID]; !ok {
            userMap[userID] = &UserWithOrders{
                User: User{ID: userID, Name: userName, Email: userEmail},
            }
            orderedIDs = append(orderedIDs, userID)
        }

        if orderID.Valid {
            userMap[userID].Orders = append(userMap[userID].Orders, Order{
                ID:        orderID.Int64,
                ProductID: productID.Int64,
                Quantity:  int(quantity.Int32),
                Amount:    amount.Float64,
            })
        }
    }

    var result []UserWithOrders
    for _, id := range orderedIDs {
        result = append(result, *userMap[id])
    }
    return result, rows.Err()
}

// GOOD: Optimize to 2 queries using an IN clause
func (r *UserRepository) ListWithOrders_Optimized(ctx context.Context) ([]UserWithOrders, error) {
    // Query 1: Retrieve user list
    users, err := r.ListUsers(ctx)
    if err != nil {
        return nil, err
    }

    // Collect user IDs
    userIDs := make([]int64, len(users))
    for i, u := range users {
        userIDs[i] = u.ID
    }

    // Query 2: Bulk retrieve all orders
    orders, err := r.GetOrdersByUserIDs(ctx, userIDs)
    if err != nil {
        return nil, err
    }

    // Mapping
    orderMap := make(map[int64][]Order)
    for _, o := range orders {
        orderMap[o.UserID] = append(orderMap[o.UserID], o)
    }

    result := make([]UserWithOrders, len(users))
    for i, u := range users {
        result[i] = UserWithOrders{
            User:   u,
            Orders: orderMap[u.ID],
        }
    }
    return result, nil
}
```

### Measuring Query Performance

```go
package middleware

import (
    "context"
    "database/sql"
    "log"
    "time"
)

// QueryLogger is a wrapper that measures query execution time
type QueryLogger struct {
    db        *sql.DB
    threshold time.Duration // Log queries exceeding this duration
}

func NewQueryLogger(db *sql.DB, threshold time.Duration) *QueryLogger {
    return &QueryLogger{db: db, threshold: threshold}
}

func (ql *QueryLogger) QueryContext(ctx context.Context, query string, args ...interface{}) (*sql.Rows, error) {
    start := time.Now()
    rows, err := ql.db.QueryContext(ctx, query, args...)
    duration := time.Since(start)

    if duration > ql.threshold {
        log.Printf("SLOW QUERY (%v): %s args=%v", duration, query, args)
    }

    return rows, err
}

// Connection pool monitoring
func MonitorPool(db *sql.DB) {
    ticker := time.NewTicker(30 * time.Second)
    defer ticker.Stop()

    for range ticker.C {
        stats := db.Stats()
        log.Printf("DB Pool Stats: "+
            "Open=%d MaxOpen=%d InUse=%d Idle=%d "+
            "WaitCount=%d WaitDuration=%v "+
            "MaxIdleClosed=%d MaxLifetimeClosed=%d",
            stats.OpenConnections,
            stats.MaxOpenConnections,
            stats.InUse,
            stats.Idle,
            stats.WaitCount,
            stats.WaitDuration,
            stats.MaxIdleClosed,
            stats.MaxLifetimeClosed,
        )
    }
}
```

---

## 9. Anti-patterns

### Anti-pattern 1: Forgetting rows.Close()

```go
// BAD: Forgetting to close rows causes connection leaks
func listUsers(db *sql.DB) ([]User, error) {
    rows, err := db.Query("SELECT * FROM users")
    if err != nil {
        return nil, err
    }
    // Missing rows.Close() -> Connection pool exhaustion

    var users []User
    for rows.Next() {
        var u User
        rows.Scan(&u.ID, &u.Name, &u.Email)
        users = append(users, u)
    }
    return users, nil
}

// GOOD: defer rows.Close()
func listUsers(db *sql.DB) ([]User, error) {
    rows, err := db.Query("SELECT * FROM users")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var users []User
    for rows.Next() {
        var u User
        if err := rows.Scan(&u.ID, &u.Name, &u.Email); err != nil {
            return nil, err
        }
        users = append(users, u)
    }
    return users, rows.Err() // Don't forget to check rows.Err()
}
```

### Anti-pattern 2: Using GORM AutoMigrate in Production

```go
// BAD: AutoMigrate in production is dangerous
func main() {
    db.AutoMigrate(&User{}, &Order{}, &Product{})
    // Problems:
    // - Columns are not dropped (even if fields are removed from the struct)
    // - Risk of data loss
    // - Cannot rollback
    // - Schema management becomes difficult in team development
    // - Table locks in production cause downtime
}

// GOOD: Use migration tools
// Development: AutoMigrate is OK
// Staging/Production: Manage explicitly with golang-migrate, goose, atlas
// migrate -path ./migrations -database $DB_URL up
```

### Anti-pattern 3: SQL Injection

```go
// BAD: Building SQL with string concatenation
func searchUsers(db *sql.DB, name string) ([]User, error) {
    query := fmt.Sprintf("SELECT * FROM users WHERE name = '%s'", name)
    // Exploitable with name = "'; DROP TABLE users; --"
    rows, err := db.Query(query)
    // ...
}

// GOOD: Use placeholders
func searchUsers(db *sql.DB, name string) ([]User, error) {
    rows, err := db.Query("SELECT * FROM users WHERE name = $1", name)
    // Placeholders automatically escape the input
    // ...
}
```

### Anti-pattern 4: Not Passing Context

```go
// BAD: Query without Context
func getUser(db *sql.DB, id int) (*User, error) {
    var u User
    // Query cannot be cancelled -> Continues executing even after request disconnect
    err := db.QueryRow("SELECT * FROM users WHERE id = $1", id).Scan(&u.ID, &u.Name)
    return &u, err
}

// GOOD: Query with Context
func getUser(ctx context.Context, db *sql.DB, id int) (*User, error) {
    var u User
    // QueryRowContext can cancel the query via context.Done()
    err := db.QueryRowContext(ctx,
        "SELECT id, name FROM users WHERE id = $1", id).Scan(&u.ID, &u.Name)
    return &u, err
}
```

### Anti-pattern 5: Holding DB in a Global Variable

```go
// BAD: Global variable
var globalDB *sql.DB

func init() {
    var err error
    globalDB, err = sql.Open("postgres", os.Getenv("DB_URL"))
    if err != nil {
        log.Fatal(err)
    }
}

func GetUser(id int) (*User, error) {
    return globalDB.QueryRow(...) // Difficult to swap DB for testing
}

// GOOD: Dependency injection
type UserRepository struct {
    db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
    return &UserRepository{db: db}
}

func (r *UserRepository) GetUser(ctx context.Context, id int) (*User, error) {
    return r.db.QueryRowContext(ctx, ...) // Can swap with a mock for testing
}
```

### Anti-pattern 6: Relying on Scan Column Order

```go
// BAD: Using SELECT * and implicitly relying on column order for Scan
func getUser(db *sql.DB, id int) (*User, error) {
    var u User
    // Scan breaks when columns are added to the table
    err := db.QueryRow("SELECT * FROM users WHERE id = $1", id).
        Scan(&u.ID, &u.Name, &u.Email)
    return &u, err
}

// GOOD: Explicitly specify columns
func getUser(ctx context.Context, db *sql.DB, id int) (*User, error) {
    var u User
    err := db.QueryRowContext(ctx,
        "SELECT id, name, email FROM users WHERE id = $1", id).
        Scan(&u.ID, &u.Name, &u.Email)
    return &u, err
}

// BETTER: Use sqlx to map with struct tags
func getUser(ctx context.Context, db *sqlx.DB, id int) (*User, error) {
    var u User
    err := db.GetContext(ctx, &u,
        "SELECT id, name, email FROM users WHERE id = $1", id)
    return &u, err
}
```

---

## 10. FAQ

### Q1: How should I determine the connection pool size?

A rule of thumb is `MaxOpenConns = DB max connections / number of app instances`. PostgreSQL defaults to 100 connections. With 3 instances, approximately 30 each. `MaxIdleConns` should be about 1/5 to 1/3 of `MaxOpenConns`.

Considerations:
- Increase `MaxOpenConns` if **WaitCount** is increasing
- Increase `MaxIdleConns` if **MaxIdleClosed** is high
- Extend `ConnMaxLifetime` if **MaxLifetimeClosed** is too high
- Use conservative app-side settings when using a connection pooler like PgBouncer
- Measure optimal values with benchmarks (`wrk`, `vegeta`, etc.)

### Q2: Should I choose database/sql or sqlx?

sqlx is a superset of database/sql that provides automatic struct mapping. Since there are virtually no downsides, sqlx is recommended for new projects. GORM is suitable for CRUD-centric apps, but for complex queries, you often end up writing raw SQL anyway.

Selection criteria:
- **database/sql**: When you want to minimize dependencies, for learning purposes
- **sqlx**: Recommended for almost all projects (standard compatibility + convenience features)
- **GORM**: Prototypes, CRUD-centric apps, when you want integrated migration
- **ent**: Large-scale projects, when type safety is the top priority

### Q3: How do you prevent SQL injection in Go?

Always use placeholders (`$1`, `?`). Never build SQL through string concatenation. sqlx's NamedQuery and GORM's Where also use placeholders internally. Using the standard methods of `database/sql` is safe.

Additional measures:
- Validate dynamic SQL parts like `ORDER BY` with a whitelist
- Always use placeholders for `LIMIT` and `OFFSET` as well
- Use SQL query builders (squirrel, goqu)
- Perform input validation at multiple layers

### Q4: How do you address the N+1 problem in GORM?

GORM's `Preload` can solve it with eager loading. However, since `Preload` internally issues IN clause queries, `Joins` may be more efficient when dealing with large volumes of data.

```go
// Preload: 2 queries (users + orders via IN clause)
db.Preload("Orders").Find(&users)

// Joins: 1 query (LEFT JOIN)
db.Joins("Profile").Find(&users)

// Conditional Preload
db.Preload("Orders", "status = ?", "completed").Find(&users)

// Nested Preload
db.Preload("Orders.OrderItems.Product").Find(&users)
```

### Q5: What are the best practices for migrations?

1. **Version control**: Manage migration files in Git
2. **Rollback support**: Always create down files
3. **Idempotency**: Use `IF NOT EXISTS`, `IF EXISTS`
4. **Small changes**: One change per file for easier management
5. **Separate data migrations**: Keep schema changes and data changes in separate files
6. **Review**: Migration files should also be subject to code review
7. **Testing**: Test migration up/down in CI/CD

### Q6: How do you avoid deadlocks?

1. **Consistent lock ordering**: Always lock tables/rows in the same order
2. **Minimize transaction duration**: Move unnecessary processing outside the transaction
3. **Appropriate isolation level**: Don't use a higher isolation level than necessary
4. **FOR UPDATE**: Lock only the required rows
5. **Retry**: Implement retry logic when deadlocks are detected

```go
// Retry pattern for deadlocks
func WithRetry(ctx context.Context, maxRetries int, fn func() error) error {
    for i := 0; i < maxRetries; i++ {
        err := fn()
        if err == nil {
            return nil
        }
        // PostgreSQL deadlock error code: 40P01
        if isDeadlockError(err) && i < maxRetries-1 {
            time.Sleep(time.Duration(i+1) * 100 * time.Millisecond) // Backoff
            continue
        }
        return err
    }
    return fmt.Errorf("max retries exceeded")
}
```

---


## FAQ

### Q1: What is the most important point to keep in mind when learning this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory but by actually writing and running code.

### Q2: What are common mistakes beginners make?

Skipping the fundamentals and jumping ahead to advanced topics. We recommend thoroughly understanding the basic concepts explained in this guide before moving on to the next step.

### Q3: How is this knowledge applied in real-world work?

The knowledge from this topic is frequently used in day-to-day development. It becomes especially important during code reviews and architecture design.

---

## Summary

| Concept | Key Points |
|---------|------------|
| database/sql | Standard library. Swappable drivers. Most lightweight |
| Connection Pool | Must configure MaxOpenConns/MaxIdleConns/ConnMaxLifetime in production |
| sqlx | Automatic struct mapping. Raw SQL. First choice for new projects |
| GORM | Full ORM. Rapid CRUD development. Relations via Preload/Joins |
| Transactions | BeginTx + defer Rollback + Commit. Manage with helper functions |
| Migrations | golang-migrate / goose / atlas. AutoMigrate is prohibited in production |
| Context | Pass context to all DB operations. Propagates cancellation and timeouts |
| N+1 Problem | Solve with JOIN / IN clause / Preload. Detect with monitoring |
| SQL Injection | Placeholders are mandatory. String concatenation is prohibited |
| Testing | testcontainers-go / interface mocking |

---

## Recommended Next Guides

- [03-grpc.md](./03-grpc.md) -- gRPC
- [04-testing.md](./04-testing.md) -- DB Testing
- [../03-tools/03-deployment.md](../03-tools/03-deployment.md) -- Deployment

---

## References

1. **Go Standard Library: database/sql** -- https://pkg.go.dev/database/sql
2. **jmoiron/sqlx** -- https://github.com/jmoiron/sqlx
3. **GORM** -- https://gorm.io/docs/
4. **golang-migrate** -- https://github.com/golang-migrate/migrate
5. **goose** -- https://github.com/pressly/goose
6. **atlas** -- https://atlasgo.io/
7. **ent** -- https://entgo.io/
8. **testcontainers-go** -- https://github.com/testcontainers/testcontainers-go
9. **Go Database/SQL Tutorial** -- http://go-database-sql.org/
10. **PgBouncer** -- https://www.pgbouncer.org/



===== SOURCE: 02-programming/go-practical-guide/docs/02-web/03-grpc.md =====

# gRPC -- Protocol Buffers, Service Definitions, Streaming

> gRPC is a high-performance RPC framework based on Protocol Buffers, enabling flexible API design through type-safe service definitions, bidirectional streaming, and gRPC-Gateway.

---

## What You Will Learn in This Chapter

1. **Protocol Buffers** -- Service definitions and code generation
2. **Four RPC patterns** -- Unary / Server / Client / Bi-directional Streaming
3. **gRPC-Gateway** -- Integration with REST APIs
4. **Interceptors** -- Middleware for authentication, logging, recovery, and more
5. **Error Handling** -- Status codes and error details
6. **Testing** -- bufconn, mocks, and integration tests
7. **Performance Optimization** -- Connection management, load balancing


## Prerequisites

Reading this guide will be easier if you have the following background knowledge:

- Basic programming knowledge
- Understanding of related foundational concepts
- Familiarity with the content of [Databases -- database/sql, sqlx, GORM](./02-database.md)

---

## 1. Protocol Buffers Basics

### Code Example 1: Designing a Proto Definition

```protobuf
syntax = "proto3";
package user.v1;
option go_package = "gen/user/v1;userv1";

import "google/protobuf/timestamp.proto";
import "google/protobuf/field_mask.proto";
import "google/protobuf/empty.proto";

// UserService is the user management service
service UserService {
  // Unary RPC: retrieve a single user
  rpc GetUser(GetUserRequest) returns (GetUserResponse);

  // Unary RPC: list users (with pagination)
  rpc ListUsers(ListUsersRequest) returns (ListUsersResponse);

  // Unary RPC: create a user
  rpc CreateUser(CreateUserRequest) returns (CreateUserResponse);

  // Unary RPC: update a user (supports partial updates)
  rpc UpdateUser(UpdateUserRequest) returns (UpdateUserResponse);

  // Unary RPC: delete a user
  rpc DeleteUser(DeleteUserRequest) returns (google.protobuf.Empty);

  // Server Streaming: deliver user changes in real time
  rpc WatchUsers(WatchUsersRequest) returns (stream UserEvent);

  // Client Streaming: batch user creation
  rpc BatchCreateUsers(stream CreateUserRequest) returns (BatchCreateUsersResponse);

  // Bidirectional Streaming: chat
  rpc Chat(stream ChatMessage) returns (stream ChatMessage);
}

// User is the user message
message User {
  int64 id = 1;
  string name = 2;
  string email = 3;
  UserRole role = 4;
  UserProfile profile = 5;
  google.protobuf.Timestamp created_at = 6;
  google.protobuf.Timestamp updated_at = 7;
}

// UserRole is the role of the user
enum UserRole {
  USER_ROLE_UNSPECIFIED = 0;
  USER_ROLE_ADMIN = 1;
  USER_ROLE_MEMBER = 2;
  USER_ROLE_VIEWER = 3;
}

// UserProfile holds the user's profile information
message UserProfile {
  string bio = 1;
  string avatar_url = 2;
  string location = 3;
  string website = 4;
}

// GetUserRequest is the request for GetUser
message GetUserRequest {
  int64 id = 1;
}

// GetUserResponse is the response for GetUser
message GetUserResponse {
  User user = 1;
}

// ListUsersRequest is the request for ListUsers (with pagination)
message ListUsersRequest {
  int32 page_size = 1;    // max 100
  string page_token = 2;  // token for the next page
  string filter = 3;      // filter condition (e.g., "role=admin")
  string order_by = 4;    // sort order (e.g., "name asc")
}

// ListUsersResponse is the response for ListUsers
message ListUsersResponse {
  repeated User users = 1;
  string next_page_token = 2;
  int32 total_count = 3;
}

// CreateUserRequest is the request for CreateUser
message CreateUserRequest {
  string name = 1;
  string email = 2;
  UserRole role = 3;
  UserProfile profile = 4;
}

// CreateUserResponse is the response for CreateUser
message CreateUserResponse {
  User user = 1;
}

// UpdateUserRequest is the request for UpdateUser (supports partial updates)
message UpdateUserRequest {
  User user = 1;
  // Specify fields to update (partial update)
  google.protobuf.FieldMask update_mask = 2;
}

// UpdateUserResponse is the response for UpdateUser
message UpdateUserResponse {
  User user = 1;
}

// DeleteUserRequest is the request for DeleteUser
message DeleteUserRequest {
  int64 id = 1;
}

// WatchUsersRequest is the request for WatchUsers
message WatchUsersRequest {
  repeated int64 user_ids = 1; // user IDs to watch (empty means all)
}

// UserEvent is a user change event
message UserEvent {
  EventType type = 1;
  User user = 2;
  google.protobuf.Timestamp occurred_at = 3;

  enum EventType {
    EVENT_TYPE_UNSPECIFIED = 0;
    EVENT_TYPE_CREATED = 1;
    EVENT_TYPE_UPDATED = 2;
    EVENT_TYPE_DELETED = 3;
  }
}

// BatchCreateUsersResponse is the response for batch creation
message BatchCreateUsersResponse {
  int32 created_count = 1;
  repeated User users = 2;
}

// ChatMessage is a chat message
message ChatMessage {
  string sender_id = 1;
  string content = 2;
  google.protobuf.Timestamp sent_at = 3;
}
```

### Code Example 2: Proto File Layout and Buf Configuration

```yaml
# buf.yaml -- Buf configuration file
version: v1
name: buf.build/myorg/myapi
breaking:
  use:
    - FILE
lint:
  use:
    - DEFAULT
  except:
    - PACKAGE_VERSION_SUFFIX
```

```yaml
# buf.gen.yaml -- code generation configuration
version: v1
managed:
  enabled: true
  go_package_prefix:
    default: github.com/myorg/myapp/gen
plugins:
  - plugin: buf.build/protocolbuffers/go
    out: gen
    opt: paths=source_relative
  - plugin: buf.build/grpc/go
    out: gen
    opt: paths=source_relative
  - plugin: buf.build/grpc-ecosystem/gateway
    out: gen
    opt:
      - paths=source_relative
      - generate_unbound_methods=true
  - plugin: buf.build/grpc-ecosystem/openapiv2
    out: gen
    opt:
      - allow_merge=true
      - merge_file_name=api
```

```bash
# Project layout
proto/
├── buf.yaml
├── buf.gen.yaml
├── buf.lock
└── user/
    └── v1/
        ├── user.proto
        └── user_service.proto

# Code generation command
buf generate

# Lint check
buf lint

# Detect breaking changes
buf breaking --against '.git#branch=main'
```

---

## 2. gRPC Server Implementation

### Code Example 3: Server Implementation (Unary RPC)

```go
package server

import (
    "context"
    "fmt"
    "log"
    "net"
    "sync"
    "time"

    "google.golang.org/grpc"
    "google.golang.org/grpc/codes"
    "google.golang.org/grpc/status"
    "google.golang.org/protobuf/types/known/emptypb"
    "google.golang.org/protobuf/types/known/timestamppb"

    userv1 "github.com/myorg/myapp/gen/user/v1"
)

// userServer is the implementation of UserService
type userServer struct {
    userv1.UnimplementedUserServiceServer
    mu    sync.RWMutex
    users map[int64]*userv1.User
    nextID int64
}

// NewUserServer creates a new UserServer
func NewUserServer() *userServer {
    return &userServer{
        users:  make(map[int64]*userv1.User),
        nextID: 1,
    }
}

// GetUser retrieves a user (Unary RPC)
func (s *userServer) GetUser(ctx context.Context, req *userv1.GetUserRequest) (*userv1.GetUserResponse, error) {
    // Validation
    if req.Id <= 0 {
        return nil, status.Errorf(codes.InvalidArgument, "invalid user id: %d", req.Id)
    }

    s.mu.RLock()
    defer s.mu.RUnlock()

    user, ok := s.users[req.Id]
    if !ok {
        return nil, status.Errorf(codes.NotFound, "user %d not found", req.Id)
    }

    return &userv1.GetUserResponse{User: user}, nil
}

// ListUsers retrieves a list of users (with pagination)
func (s *userServer) ListUsers(ctx context.Context, req *userv1.ListUsersRequest) (*userv1.ListUsersResponse, error) {
    s.mu.RLock()
    defer s.mu.RUnlock()

    pageSize := int(req.PageSize)
    if pageSize <= 0 || pageSize > 100 {
        pageSize = 20 // default
    }

    // Sort all users by ID
    var allUsers []*userv1.User
    for _, u := range s.users {
        allUsers = append(allUsers, u)
    }

    // Pagination (simplified)
    start := 0
    if req.PageToken != "" {
        // Restore offset from token
        fmt.Sscanf(req.PageToken, "%d", &start)
    }

    end := start + pageSize
    if end > len(allUsers) {
        end = len(allUsers)
    }

    var nextPageToken string
    if end < len(allUsers) {
        nextPageToken = fmt.Sprintf("%d", end)
    }

    return &userv1.ListUsersResponse{
        Users:         allUsers[start:end],
        NextPageToken: nextPageToken,
        TotalCount:    int32(len(allUsers)),
    }, nil
}

// CreateUser creates a user
func (s *userServer) CreateUser(ctx context.Context, req *userv1.CreateUserRequest) (*userv1.CreateUserResponse, error) {
    // Validation
    if req.Name == "" {
        return nil, status.Errorf(codes.InvalidArgument, "name is required")
    }
    if req.Email == "" {
        return nil, status.Errorf(codes.InvalidArgument, "email is required")
    }

    // Check for duplicate email
    s.mu.Lock()
    defer s.mu.Unlock()

    for _, u := range s.users {
        if u.Email == req.Email {
            return nil, status.Errorf(codes.AlreadyExists, "email %s already exists", req.Email)
        }
    }

    now := timestamppb.Now()
    user := &userv1.User{
        Id:        s.nextID,
        Name:      req.Name,
        Email:     req.Email,
        Role:      req.Role,
        Profile:   req.Profile,
        CreatedAt: now,
        UpdatedAt: now,
    }
    s.users[s.nextID] = user
    s.nextID++

    return &userv1.CreateUserResponse{User: user}, nil
}

// UpdateUser updates a user (supports FieldMask)
func (s *userServer) UpdateUser(ctx context.Context, req *userv1.UpdateUserRequest) (*userv1.UpdateUserResponse, error) {
    if req.User == nil || req.User.Id <= 0 {
        return nil, status.Error(codes.InvalidArgument, "user with valid id is required")
    }

    s.mu.Lock()
    defer s.mu.Unlock()

    existing, ok := s.users[req.User.Id]
    if !ok {
        return nil, status.Errorf(codes.NotFound, "user %d not found", req.User.Id)
    }

    // Partial update with FieldMask
    if req.UpdateMask != nil && len(req.UpdateMask.Paths) > 0 {
        for _, path := range req.UpdateMask.Paths {
            switch path {
            case "name":
                existing.Name = req.User.Name
            case "email":
                existing.Email = req.User.Email
            case "role":
                existing.Role = req.User.Role
            case "profile.bio":
                if existing.Profile == nil {
                    existing.Profile = &userv1.UserProfile{}
                }
                existing.Profile.Bio = req.User.Profile.GetBio()
            case "profile.avatar_url":
                if existing.Profile == nil {
                    existing.Profile = &userv1.UserProfile{}
                }
                existing.Profile.AvatarUrl = req.User.Profile.GetAvatarUrl()
            default:
                return nil, status.Errorf(codes.InvalidArgument, "unknown field: %s", path)
            }
        }
    } else {
        // Without FieldMask, update all fields
        existing.Name = req.User.Name
        existing.Email = req.User.Email
        existing.Role = req.User.Role
        existing.Profile = req.User.Profile
    }

    existing.UpdatedAt = timestamppb.Now()

    return &userv1.UpdateUserResponse{User: existing}, nil
}

// DeleteUser deletes a user
func (s *userServer) DeleteUser(ctx context.Context, req *userv1.DeleteUserRequest) (*emptypb.Empty, error) {
    if req.Id <= 0 {
        return nil, status.Errorf(codes.InvalidArgument, "invalid user id: %d", req.Id)
    }

    s.mu.Lock()
    defer s.mu.Unlock()

    if _, ok := s.users[req.Id]; !ok {
        return nil, status.Errorf(codes.NotFound, "user %d not found", req.Id)
    }

    delete(s.users, req.Id)
    return &emptypb.Empty{}, nil
}
```

### Code Example 4: Server Streaming RPC

```go
// WatchUsers streams user changes in real time (Server Streaming)
func (s *userServer) WatchUsers(req *userv1.WatchUsersRequest, stream userv1.UserService_WatchUsersServer) error {
    log.Printf("WatchUsers started for user IDs: %v", req.UserIds)

    // Watch event channel
    ticker := time.NewTicker(1 * time.Second)
    defer ticker.Stop()

    for {
        select {
        case <-stream.Context().Done():
            // Client disconnected
            log.Printf("WatchUsers: client disconnected")
            return nil
        case <-ticker.C:
            // Send event if a change occurred (in practice, fetched from an event bus)
            event := s.checkForChanges(req.UserIds)
            if event != nil {
                if err := stream.Send(event); err != nil {
                    return status.Errorf(codes.Internal, "failed to send event: %v", err)
                }
            }
        }
    }
}

func (s *userServer) checkForChanges(watchIDs []int64) *userv1.UserEvent {
    // A real implementation would use an event bus or CDC
    return nil
}
```

### Code Example 5: Client Streaming RPC

```go
// BatchCreateUsers performs batch user creation (Client Streaming)
func (s *userServer) BatchCreateUsers(stream userv1.UserService_BatchCreateUsersServer) error {
    var createdUsers []*userv1.User
    var count int32

    for {
        req, err := stream.Recv()
        if err != nil {
            if err.Error() == "EOF" {
                // Client finished sending
                return stream.SendAndClose(&userv1.BatchCreateUsersResponse{
                    CreatedCount: count,
                    Users:        createdUsers,
                })
            }
            return status.Errorf(codes.Internal, "failed to receive: %v", err)
        }

        // Create each user individually
        resp, err := s.CreateUser(stream.Context(), req)
        if err != nil {
            log.Printf("BatchCreateUsers: skip user %s: %v", req.Name, err)
            continue // Skip on error and continue
        }

        createdUsers = append(createdUsers, resp.User)
        count++
    }
}
```

### Code Example 6: Bidirectional Streaming RPC

```go
// Chat is a bidirectional streaming chat
func (s *userServer) Chat(stream userv1.UserService_ChatServer) error {
    log.Println("Chat: new connection")

    for {
        msg, err := stream.Recv()
        if err != nil {
            if err.Error() == "EOF" {
                log.Println("Chat: client closed")
                return nil
            }
            return status.Errorf(codes.Internal, "failed to receive: %v", err)
        }

        log.Printf("Chat: received from %s: %s", msg.SenderId, msg.Content)

        // Echo reply (in practice, broadcast or similar)
        reply := &userv1.ChatMessage{
            SenderId: "server",
            Content:  fmt.Sprintf("Echo: %s", msg.Content),
            SentAt:   timestamppb.Now(),
        }

        if err := stream.Send(reply); err != nil {
            return status.Errorf(codes.Internal, "failed to send: %v", err)
        }
    }
}
```

---

## 3. gRPC Client Implementation

### Code Example 7: Client Connection and Invocation

```go
package client

import (
    "context"
    "crypto/tls"
    "fmt"
    "io"
    "log"
    "time"

    "google.golang.org/grpc"
    "google.golang.org/grpc/credentials"
    "google.golang.org/grpc/credentials/insecure"
    "google.golang.org/grpc/keepalive"
    "google.golang.org/grpc/metadata"

    userv1 "github.com/myorg/myapp/gen/user/v1"
)

// UserClient is a wrapper around the gRPC client
type UserClient struct {
    conn   *grpc.ClientConn
    client userv1.UserServiceClient
}

// NewUserClient creates a new gRPC client
func NewUserClient(addr string, opts ...grpc.DialOption) (*UserClient, error) {
    // Default options
    defaultOpts := []grpc.DialOption{
        grpc.WithKeepaliveParams(keepalive.ClientParameters{
            Time:                10 * time.Second, // KeepAlive ping interval
            Timeout:             3 * time.Second,  // Ping response timeout
            PermitWithoutStream: false,             // Do not ping when no stream is active
        }),
        grpc.WithDefaultCallOptions(
            grpc.MaxCallRecvMsgSize(10 * 1024 * 1024), // 10MB
            grpc.MaxCallSendMsgSize(10 * 1024 * 1024), // 10MB
        ),
    }

    allOpts := append(defaultOpts, opts...)

    conn, err := grpc.NewClient(addr, allOpts...)
    if err != nil {
        return nil, fmt.Errorf("grpc dial: %w", err)
    }

    return &UserClient{
        conn:   conn,
        client: userv1.NewUserServiceClient(conn),
    }, nil
}

// NewInsecureUserClient creates a client without TLS (for development)
func NewInsecureUserClient(addr string) (*UserClient, error) {
    return NewUserClient(addr,
        grpc.WithTransportCredentials(insecure.NewCredentials()),
    )
}

// NewSecureUserClient creates a client with TLS (for production)
func NewSecureUserClient(addr string) (*UserClient, error) {
    tlsConfig := &tls.Config{
        MinVersion: tls.VersionTLS13,
    }
    return NewUserClient(addr,
        grpc.WithTransportCredentials(credentials.NewTLS(tlsConfig)),
    )
}

// Close closes the connection
func (c *UserClient) Close() error {
    return c.conn.Close()
}

// GetUser retrieves a user via Unary RPC
func (c *UserClient) GetUser(ctx context.Context, id int64) (*userv1.User, error) {
    // Set timeout
    ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
    defer cancel()

    resp, err := c.client.GetUser(ctx, &userv1.GetUserRequest{Id: id})
    if err != nil {
        return nil, fmt.Errorf("GetUser: %w", err)
    }
    return resp.User, nil
}

// ListAllUsers retrieves all users using pagination
func (c *UserClient) ListAllUsers(ctx context.Context) ([]*userv1.User, error) {
    var allUsers []*userv1.User
    pageToken := ""

    for {
        resp, err := c.client.ListUsers(ctx, &userv1.ListUsersRequest{
            PageSize:  100,
            PageToken: pageToken,
        })
        if err != nil {
            return nil, fmt.Errorf("ListUsers: %w", err)
        }

        allUsers = append(allUsers, resp.Users...)

        if resp.NextPageToken == "" {
            break
        }
        pageToken = resp.NextPageToken
    }

    return allUsers, nil
}

// WatchUsers receives user events via Server Streaming
func (c *UserClient) WatchUsers(ctx context.Context, userIDs []int64, handler func(*userv1.UserEvent)) error {
    stream, err := c.client.WatchUsers(ctx, &userv1.WatchUsersRequest{
        UserIds: userIDs,
    })
    if err != nil {
        return fmt.Errorf("WatchUsers: %w", err)
    }

    for {
        event, err := stream.Recv()
        if err == io.EOF {
            return nil
        }
        if err != nil {
            return fmt.Errorf("WatchUsers recv: %w", err)
        }
        handler(event)
    }
}

// CreateWithMetadata creates a user with attached metadata
func (c *UserClient) CreateWithMetadata(ctx context.Context, name, email, token string) (*userv1.User, error) {
    // Attach metadata (equivalent to HTTP headers)
    md := metadata.Pairs(
        "authorization", "Bearer "+token,
        "x-request-id", generateRequestID(),
    )
    ctx = metadata.NewOutgoingContext(ctx, md)

    // Receive response header and trailer
    var header, trailer metadata.MD

    resp, err := c.client.CreateUser(ctx,
        &userv1.CreateUserRequest{
            Name:  name,
            Email: email,
            Role:  userv1.UserRole_USER_ROLE_MEMBER,
        },
        grpc.Header(&header),
        grpc.Trailer(&trailer),
    )
    if err != nil {
        return nil, err
    }

    // Extract rate limit info from the response header
    if remaining := header.Get("x-ratelimit-remaining"); len(remaining) > 0 {
        log.Printf("Rate limit remaining: %s", remaining[0])
    }

    return resp.User, nil
}

func generateRequestID() string {
    return fmt.Sprintf("req-%d", time.Now().UnixNano())
}
```

---

## 4. Interceptors (Middleware)

### Code Example 8: Unary Interceptors

```go
package interceptor

import (
    "context"
    "log"
    "time"

    "google.golang.org/grpc"
    "google.golang.org/grpc/codes"
    "google.golang.org/grpc/metadata"
    "google.golang.org/grpc/status"
)

// LoggingUnaryInterceptor logs each request
func LoggingUnaryInterceptor(
    ctx context.Context,
    req interface{},
    info *grpc.UnaryServerInfo,
    handler grpc.UnaryHandler,
) (interface{}, error) {
    start := time.Now()

    // Retrieve request ID from metadata
    requestID := "unknown"
    if md, ok := metadata.FromIncomingContext(ctx); ok {
        if ids := md.Get("x-request-id"); len(ids) > 0 {
            requestID = ids[0]
        }
    }

    // Invoke the handler
    resp, err := handler(ctx, req)

    // Log output
    duration := time.Since(start)
    code := codes.OK
    if err != nil {
        code = status.Code(err)
    }

    log.Printf("[gRPC] method=%s request_id=%s code=%s duration=%v",
        info.FullMethod, requestID, code, duration)

    return resp, err
}

// AuthUnaryInterceptor performs authentication
func AuthUnaryInterceptor(
    ctx context.Context,
    req interface{},
    info *grpc.UnaryServerInfo,
    handler grpc.UnaryHandler,
) (interface{}, error) {
    // Skip methods that don't require authentication, such as health checks
    skipMethods := map[string]bool{
        "/grpc.health.v1.Health/Check": true,
        "/grpc.reflection.v1.ServerReflection/ServerReflectionInfo": true,
    }
    if skipMethods[info.FullMethod] {
        return handler(ctx, req)
    }

    // Retrieve token from metadata
    md, ok := metadata.FromIncomingContext(ctx)
    if !ok {
        return nil, status.Error(codes.Unauthenticated, "missing metadata")
    }

    tokens := md.Get("authorization")
    if len(tokens) == 0 {
        return nil, status.Error(codes.Unauthenticated, "missing authorization token")
    }

    // Validate token
    userID, err := validateToken(tokens[0])
    if err != nil {
        return nil, status.Errorf(codes.Unauthenticated, "invalid token: %v", err)
    }

    // Store user ID in the context
    ctx = context.WithValue(ctx, userIDKey{}, userID)

    return handler(ctx, req)
}

type userIDKey struct{}

func UserIDFromContext(ctx context.Context) (string, bool) {
    id, ok := ctx.Value(userIDKey{}).(string)
    return id, ok
}

func validateToken(token string) (string, error) {
    // In practice, perform JWT validation, etc.
    if token == "" {
        return "", fmt.Errorf("empty token")
    }
    return "user-123", nil
}

// RecoveryUnaryInterceptor recovers from panics
func RecoveryUnaryInterceptor(
    ctx context.Context,
    req interface{},
    info *grpc.UnaryServerInfo,
    handler grpc.UnaryHandler,
) (resp interface{}, err error) {
    defer func() {
        if r := recover(); r != nil {
            log.Printf("[PANIC] method=%s panic=%v", info.FullMethod, r)
            err = status.Errorf(codes.Internal, "internal server error")
        }
    }()
    return handler(ctx, req)
}

// RateLimitUnaryInterceptor enforces rate limits
func RateLimitUnaryInterceptor(limiter *RateLimiter) grpc.UnaryServerInterceptor {
    return func(
        ctx context.Context,
        req interface{},
        info *grpc.UnaryServerInfo,
        handler grpc.UnaryHandler,
    ) (interface{}, error) {
        if !limiter.Allow() {
            return nil, status.Error(codes.ResourceExhausted, "rate limit exceeded")
        }
        return handler(ctx, req)
    }
}

// ValidationUnaryInterceptor validates requests
func ValidationUnaryInterceptor(
    ctx context.Context,
    req interface{},
    info *grpc.UnaryServerInfo,
    handler grpc.UnaryHandler,
) (interface{}, error) {
    if v, ok := req.(interface{ Validate() error }); ok {
        if err := v.Validate(); err != nil {
            return nil, status.Errorf(codes.InvalidArgument, "validation failed: %v", err)
        }
    }
    return handler(ctx, req)
}

// TimeoutUnaryInterceptor sets a default timeout
func TimeoutUnaryInterceptor(defaultTimeout time.Duration) grpc.UnaryServerInterceptor {
    return func(
        ctx context.Context,
        req interface{},
        info *grpc.UnaryServerInfo,
        handler grpc.UnaryHandler,
    ) (interface{}, error) {
        if _, ok := ctx.Deadline(); !ok {
            var cancel context.CancelFunc
            ctx, cancel = context.WithTimeout(ctx, defaultTimeout)
            defer cancel()
        }
        return handler(ctx, req)
    }
}
```

### Code Example 9: Stream Interceptors

```go
package interceptor

import (
    "log"
    "time"

    "google.golang.org/grpc"
    "google.golang.org/grpc/codes"
    "google.golang.org/grpc/status"
)

// LoggingStreamInterceptor logs streaming calls
func LoggingStreamInterceptor(
    srv interface{},
    ss grpc.ServerStream,
    info *grpc.StreamServerInfo,
    handler grpc.StreamHandler,
) error {
    start := time.Now()
    log.Printf("[gRPC Stream] method=%s started", info.FullMethod)

    err := handler(srv, ss)

    duration := time.Since(start)
    code := codes.OK
    if err != nil {
        code = status.Code(err)
    }

    log.Printf("[gRPC Stream] method=%s code=%s duration=%v",
        info.FullMethod, code, duration)

    return err
}

// RecoveryStreamInterceptor recovers from panics in streams
func RecoveryStreamInterceptor(
    srv interface{},
    ss grpc.ServerStream,
    info *grpc.StreamServerInfo,
    handler grpc.StreamHandler,
) (err error) {
    defer func() {
        if r := recover(); r != nil {
            log.Printf("[PANIC] stream method=%s panic=%v", info.FullMethod, r)
            err = status.Errorf(codes.Internal, "internal server error")
        }
    }()
    return handler(srv, ss)
}
```

### Code Example 10: Starting the Server (Integrating Interceptors)

```go
package main

import (
    "context"
    "log"
    "net"
    "os"
    "os/signal"
    "syscall"
    "time"

    "google.golang.org/grpc"
    "google.golang.org/grpc/health"
    "google.golang.org/grpc/health/grpc_health_v1"
    "google.golang.org/grpc/reflection"
)

func main() {
    lis, err := net.Listen("tcp", ":50051")
    if err != nil {
        log.Fatalf("failed to listen: %v", err)
    }

    // Server options
    s := grpc.NewServer(
        // Unary interceptor chain (executed in order)
        grpc.ChainUnaryInterceptor(
            RecoveryUnaryInterceptor,
            LoggingUnaryInterceptor,
            TimeoutUnaryInterceptor(30*time.Second),
            AuthUnaryInterceptor,
            ValidationUnaryInterceptor,
        ),
        // Stream interceptor chain
        grpc.ChainStreamInterceptor(
            RecoveryStreamInterceptor,
            LoggingStreamInterceptor,
        ),
        // Message size limits
        grpc.MaxRecvMsgSize(10 * 1024 * 1024), // 10MB
        grpc.MaxSendMsgSize(10 * 1024 * 1024), // 10MB
        // KeepAlive configuration
        grpc.KeepaliveParams(keepalive.ServerParameters{
            MaxConnectionIdle:     15 * time.Minute,
            MaxConnectionAge:      30 * time.Minute,
            MaxConnectionAgeGrace: 5 * time.Second,
            Time:                  5 * time.Minute,
            Timeout:               1 * time.Second,
        }),
        grpc.KeepaliveEnforcementPolicy(keepalive.EnforcementPolicy{
            MinTime:             5 * time.Second,
            PermitWithoutStream: false,
        }),
    )

    // Register service
    userv1.RegisterUserServiceServer(s, NewUserServer())

    // Health check
    healthServer := health.NewServer()
    grpc_health_v1.RegisterHealthServer(s, healthServer)
    healthServer.SetServingStatus("user.v1.UserService", grpc_health_v1.HealthCheckResponse_SERVING)

    // Reflection (for development, used by grpcurl, etc.)
    reflection.Register(s)

    // Graceful shutdown
    go func() {
        log.Printf("gRPC server listening on :50051")
        if err := s.Serve(lis); err != nil {
            log.Fatalf("failed to serve: %v", err)
        }
    }()

    // Wait for signal
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit

    log.Println("Shutting down gRPC server...")
    healthServer.SetServingStatus("user.v1.UserService", grpc_health_v1.HealthCheckResponse_NOT_SERVING)

    // Graceful stop (wait for in-flight RPCs to complete)
    stopped := make(chan struct{})
    go func() {
        s.GracefulStop()
        close(stopped)
    }()

    // Wait with timeout
    select {
    case <-stopped:
        log.Println("Server stopped gracefully")
    case <-time.After(10 * time.Second):
        log.Println("Force stopping server")
        s.Stop()
    }
}
```

---

## 5. gRPC-Gateway (REST Translation)

### Code Example 11: gRPC-Gateway Definition

```protobuf
syntax = "proto3";
package user.v1;

import "google/api/annotations.proto";
import "google/api/field_behavior.proto";
import "protoc-gen-openapiv2/options/annotations.proto";

option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_swagger) = {
  info: {
    title: "User API";
    version: "1.0";
    description: "User management API";
  };
  schemes: HTTPS;
  consumes: "application/json";
  produces: "application/json";
  security_definitions: {
    security: {
      key: "BearerAuth";
      value: {
        type: TYPE_API_KEY;
        in: IN_HEADER;
        name: "Authorization";
      };
    };
  };
};

service UserService {
  rpc GetUser(GetUserRequest) returns (GetUserResponse) {
    option (google.api.http) = {
      get: "/api/v1/users/{id}"
    };
  }

  rpc ListUsers(ListUsersRequest) returns (ListUsersResponse) {
    option (google.api.http) = {
      get: "/api/v1/users"
    };
  }

  rpc CreateUser(CreateUserRequest) returns (CreateUserResponse) {
    option (google.api.http) = {
      post: "/api/v1/users"
      body: "*"
    };
  }

  rpc UpdateUser(UpdateUserRequest) returns (UpdateUserResponse) {
    option (google.api.http) = {
      patch: "/api/v1/users/{user.id}"
      body: "*"
    };
  }

  rpc DeleteUser(DeleteUserRequest) returns (google.protobuf.Empty) {
    option (google.api.http) = {
      delete: "/api/v1/users/{id}"
    };
  }
}
```

### Code Example 12: gRPC-Gateway Server

```go
package main

import (
    "context"
    "fmt"
    "log"
    "net"
    "net/http"
    "time"

    "github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
    "google.golang.org/grpc"
    "google.golang.org/grpc/credentials/insecure"
    "google.golang.org/protobuf/encoding/protojson"

    userv1 "github.com/myorg/myapp/gen/user/v1"
)

func main() {
    ctx := context.Background()

    // Start the gRPC server
    go runGRPCServer()

    // Configure gRPC-Gateway
    mux := runtime.NewServeMux(
        // JSON output options
        runtime.WithMarshalerOption(runtime.MIMEWildcard, &runtime.JSONPb{
            MarshalOptions: protojson.MarshalOptions{
                UseProtoNames:   true,  // snake_case field names
                EmitUnpopulated: false, // omit zero-value fields
            },
            UnmarshalOptions: protojson.UnmarshalOptions{
                DiscardUnknown: true, // ignore unknown fields
            },
        }),
        // Customize error handling
        runtime.WithErrorHandler(customErrorHandler),
        // Forward metadata
        runtime.WithMetadata(func(ctx context.Context, r *http.Request) metadata.MD {
            md := metadata.MD{}
            if auth := r.Header.Get("Authorization"); auth != "" {
                md.Set("authorization", auth)
            }
            if reqID := r.Header.Get("X-Request-ID"); reqID != "" {
                md.Set("x-request-id", reqID)
            }
            return md
        }),
    )

    // Connect to the gRPC backend
    opts := []grpc.DialOption{
        grpc.WithTransportCredentials(insecure.NewCredentials()),
    }
    err := userv1.RegisterUserServiceHandlerFromEndpoint(ctx, mux, "localhost:50051", opts)
    if err != nil {
        log.Fatalf("failed to register gateway: %v", err)
    }

    // HTTP server (with CORS and logging middleware)
    handler := corsMiddleware(loggingMiddleware(mux))

    log.Printf("gRPC-Gateway listening on :8080")
    if err := http.ListenAndServe(":8080", handler); err != nil {
        log.Fatalf("failed to serve: %v", err)
    }
}

// customErrorHandler converts gRPC errors to HTTP responses
func customErrorHandler(
    ctx context.Context,
    mux *runtime.ServeMux,
    marshaler runtime.Marshaler,
    w http.ResponseWriter,
    r *http.Request,
    err error,
) {
    st := status.Convert(err)
    httpStatus := runtime.HTTPStatusFromCode(st.Code())

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(httpStatus)

    body := map[string]interface{}{
        "error": map[string]interface{}{
            "code":    int(st.Code()),
            "message": st.Message(),
            "status":  st.Code().String(),
        },
    }

    // If error details are present
    for _, detail := range st.Details() {
        body["error"].(map[string]interface{})["details"] = detail
    }

    data, _ := json.Marshal(body)
    w.Write(data)
}

// corsMiddleware sets CORS headers
func corsMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Request-ID")

        if r.Method == "OPTIONS" {
            w.WriteHeader(http.StatusNoContent)
            return
        }

        next.ServeHTTP(w, r)
    })
}

// loggingMiddleware logs HTTP requests
func loggingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("[HTTP] %s %s %v", r.Method, r.URL.Path, time.Since(start))
    })
}
```

---

## 6. Testing

### Code Example 13: Testing with bufconn

```go
package server_test

import (
    "context"
    "log"
    "net"
    "testing"

    "google.golang.org/grpc"
    "google.golang.org/grpc/codes"
    "google.golang.org/grpc/credentials/insecure"
    "google.golang.org/grpc/status"
    "google.golang.org/grpc/test/bufconn"

    userv1 "github.com/myorg/myapp/gen/user/v1"
)

const bufSize = 1024 * 1024

// setupTestServer starts an in-memory gRPC server
func setupTestServer(t *testing.T) (userv1.UserServiceClient, func()) {
    t.Helper()

    lis := bufconn.Listen(bufSize)
    s := grpc.NewServer()
    userv1.RegisterUserServiceServer(s, NewUserServer())

    go func() {
        if err := s.Serve(lis); err != nil {
            log.Printf("server error: %v", err)
        }
    }()

    // Dialer for bufconn
    dialer := func(context.Context, string) (net.Conn, error) {
        return lis.Dial()
    }

    conn, err := grpc.NewClient("passthrough:///bufnet",
        grpc.WithContextDialer(dialer),
        grpc.WithTransportCredentials(insecure.NewCredentials()),
    )
    if err != nil {
        t.Fatalf("failed to dial bufnet: %v", err)
    }

    client := userv1.NewUserServiceClient(conn)
    cleanup := func() {
        conn.Close()
        s.Stop()
    }

    return client, cleanup
}

func TestGetUser_NotFound(t *testing.T) {
    client, cleanup := setupTestServer(t)
    defer cleanup()

    ctx := context.Background()
    _, err := client.GetUser(ctx, &userv1.GetUserRequest{Id: 999})
    if err == nil {
        t.Fatal("expected error, got nil")
    }

    st, ok := status.FromError(err)
    if !ok {
        t.Fatalf("expected gRPC status error, got: %v", err)
    }

    if st.Code() != codes.NotFound {
        t.Errorf("expected NotFound, got %v", st.Code())
    }
}

func TestCreateUser(t *testing.T) {
    client, cleanup := setupTestServer(t)
    defer cleanup()

    ctx := context.Background()
    resp, err := client.CreateUser(ctx, &userv1.CreateUserRequest{
        Name:  "Test User",
        Email: "test@example.com",
        Role:  userv1.UserRole_USER_ROLE_MEMBER,
    })
    if err != nil {
        t.Fatalf("CreateUser failed: %v", err)
    }

    if resp.User.Name != "Test User" {
        t.Errorf("Name = %q, want %q", resp.User.Name, "Test User")
    }
    if resp.User.Email != "test@example.com" {
        t.Errorf("Email = %q, want %q", resp.User.Email, "test@example.com")
    }
    if resp.User.Id <= 0 {
        t.Error("expected positive ID")
    }
}

func TestCreateUser_DuplicateEmail(t *testing.T) {
    client, cleanup := setupTestServer(t)
    defer cleanup()

    ctx := context.Background()

    // First call: success
    _, err := client.CreateUser(ctx, &userv1.CreateUserRequest{
        Name:  "User 1",
        Email: "dup@example.com",
    })
    if err != nil {
        t.Fatalf("first CreateUser failed: %v", err)
    }

    // Second call: duplicate error
    _, err = client.CreateUser(ctx, &userv1.CreateUserRequest{
        Name:  "User 2",
        Email: "dup@example.com",
    })
    if err == nil {
        t.Fatal("expected error for duplicate email")
    }

    st, _ := status.FromError(err)
    if st.Code() != codes.AlreadyExists {
        t.Errorf("expected AlreadyExists, got %v", st.Code())
    }
}

func TestListUsers_Pagination(t *testing.T) {
    client, cleanup := setupTestServer(t)
    defer cleanup()

    ctx := context.Background()

    // Create 5 users
    for i := 0; i < 5; i++ {
        _, err := client.CreateUser(ctx, &userv1.CreateUserRequest{
            Name:  fmt.Sprintf("User %d", i),
            Email: fmt.Sprintf("user%d@example.com", i),
        })
        if err != nil {
            t.Fatalf("CreateUser %d failed: %v", i, err)
        }
    }

    // Fetch with page size 2
    resp, err := client.ListUsers(ctx, &userv1.ListUsersRequest{PageSize: 2})
    if err != nil {
        t.Fatalf("ListUsers failed: %v", err)
    }

    if len(resp.Users) != 2 {
        t.Errorf("got %d users, want 2", len(resp.Users))
    }
    if resp.NextPageToken == "" {
        t.Error("expected next_page_token")
    }
    if resp.TotalCount != 5 {
        t.Errorf("total_count = %d, want 5", resp.TotalCount)
    }
}
```

---

## 7. Error Handling

### Code Example 14: Detailed Error Responses

```go
package server

import (
    "google.golang.org/genproto/googleapis/rpc/errdetails"
    "google.golang.org/grpc/codes"
    "google.golang.org/grpc/status"
)

// Build a validation error
func validationError(violations map[string]string) error {
    st := status.New(codes.InvalidArgument, "validation failed")

    var fieldViolations []*errdetails.BadRequest_FieldViolation
    for field, desc := range violations {
        fieldViolations = append(fieldViolations, &errdetails.BadRequest_FieldViolation{
            Field:       field,
            Description: desc,
        })
    }

    detailed, err := st.WithDetails(&errdetails.BadRequest{
        FieldViolations: fieldViolations,
    })
    if err != nil {
        return st.Err()
    }
    return detailed.Err()
}

// Resource not found error
func notFoundError(resourceType, resourceID string) error {
    st := status.New(codes.NotFound, fmt.Sprintf("%s not found", resourceType))
    detailed, err := st.WithDetails(&errdetails.ResourceInfo{
        ResourceType: resourceType,
        ResourceName: resourceID,
        Description:  fmt.Sprintf("%s with id %s was not found", resourceType, resourceID),
    })
    if err != nil {
        return st.Err()
    }
    return detailed.Err()
}

// Rate limit error
func rateLimitError(retryAfter time.Duration) error {
    st := status.New(codes.ResourceExhausted, "rate limit exceeded")
    detailed, err := st.WithDetails(&errdetails.RetryInfo{
        RetryDelay: durationpb.New(retryAfter),
    })
    if err != nil {
        return st.Err()
    }
    return detailed.Err()
}

// Extract error details on the client side
func handleGRPCError(err error) {
    st := status.Convert(err)

    log.Printf("Code: %s, Message: %s", st.Code(), st.Message())

    for _, detail := range st.Details() {
        switch d := detail.(type) {
        case *errdetails.BadRequest:
            for _, v := range d.FieldViolations {
                log.Printf("Field: %s, Description: %s", v.Field, v.Description)
            }
        case *errdetails.ResourceInfo:
            log.Printf("Resource: %s/%s", d.ResourceType, d.ResourceName)
        case *errdetails.RetryInfo:
            log.Printf("Retry after: %v", d.RetryDelay.AsDuration())
        }
    }
}
```

---

## 8. ASCII Diagrams

### Figure 1: gRPC Communication Flow

```
Client (Go)                    Server (Go)
┌──────────────────┐    HTTP/2 +      ┌──────────────────┐
│                  │    Protocol      │                  │
│ Generated Stub   │    Buffers       │ Generated Service│
│ (UserServiceClient)│ ──────────────>│(UserServiceServer)│
│                  │    (binary)      │                  │
│ .proto → Go code │ <──────────────│ .proto → Go code │
│                  │                  │                  │
│ grpc.ClientConn  │    TLS +        │ grpc.Server      │
│                  │    HTTP/2        │                  │
└──────────────────┘    Multiplexed  └──────────────────┘
                        Streams

Code generation pipeline:
  .proto ──> protoc / buf generate
                │
                ├── *.pb.go        (message types)
                ├── *_grpc.pb.go   (service interfaces)
                ├── *.pb.gw.go     (gRPC-Gateway)
                └── *.swagger.json (OpenAPI spec)
```

### Figure 2: The Four RPC Patterns

```
1. Unary RPC (1:1) -- GetUser, CreateUser
   Client ──[Request]──> Server
   Client <──[Response]── Server
   The most basic pattern. A REST API alternative.

2. Server Streaming (1:N) -- WatchUsers
   Client ──[Request]──────> Server
   Client <──[Response 1]── Server
   Client <──[Response 2]── Server
   Client <──[Response 3]── Server
   Client <──[EOF]────────── Server
   Real-time notifications, chunked delivery of large data.

3. Client Streaming (N:1) -- BatchCreateUsers
   Client ──[Request 1]──> Server
   Client ──[Request 2]──> Server
   Client ──[Request 3]──> Server
   Client ──[EOF]────────> Server
   Client <──[Response]──── Server
   File uploads, batch processing.

4. Bidirectional Streaming (N:M) -- Chat
   Client ──[Request 1]──> Server
   Client <──[Response 1]── Server
   Client ──[Request 2]──> Server
   Client ──[Request 3]──> Server
   Client <──[Response 2]── Server
   Client <──[Response 3]── Server
   Chat, games, real-time collaboration.
```

### Figure 3: gRPC-Gateway Architecture

```
                    ┌─────────────────────────────────────────┐
REST Client         │            gRPC-Gateway                 │     gRPC Server
┌──────────┐   HTTP │  ┌──────────────────────────────────┐  │ gRPC ┌──────────┐
│ Browser  │──────>│  │  HTTP/JSON → gRPC/Protobuf       │  │────>│ Service  │
│ curl     │       │  │  ┌──────┐    ┌───────┐           │  │     │ Handler  │
│ Postman  │       │  │  │Router│───>│Marshal│           │  │     │          │
│ Mobile   │       │  │  │Match │    │Convert│           │  │     │          │
│          │<──────│  │  └──────┘    └───────┘           │  │<────│          │
└──────────┘   HTTP │  │  gRPC/Protobuf → HTTP/JSON       │  │ gRPC └──────────┘
  :8080        JSON │  └──────────────────────────────────┘  │       :50051
                    └─────────────────────────────────────────┘

gRPC Client ────────────────────────────────────────────> gRPC Server
  (direct connection, highest performance)                 :50051

Supports both REST and gRPC:
  /api/v1/users/{id}  →  UserService.GetUser()
  /api/v1/users       →  UserService.ListUsers()
  POST /api/v1/users  →  UserService.CreateUser()
```

### Figure 4: Interceptor Chain

```
Request
  │
  ▼
┌────────────────────────────────────────────────┐
│              Interceptor Chain                  │
│                                                │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ Recovery │─>│ Logging  │─>│ Timeout  │    │
│  │panic recv│  │   logs   │  │ timeout  │    │
│  └──────────┘  └──────────┘  └──────────┘    │
│       │                                  │     │
│       ▼                                  ▼     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │   Auth   │─>│Validation│─>│ RateLimit│    │
│  │  authN   │  │input chk │  │rate limit│    │
│  └──────────┘  └──────────┘  └──────────┘    │
│                                    │           │
└────────────────────────────────────┼───────────┘
                                     │
                                     ▼
                              ┌──────────┐
                              │  Handler │
                              │ business │
                              └──────────┘
```

### Figure 5: gRPC Health Checks and Load Balancing

```
┌────────────────────────────────────────────────────────┐
│                  Load Balancer                          │
│  (Envoy / Nginx / Kubernetes Service)                  │
│                                                        │
│  Health check:                                         │
│  grpc_health_v1.Health/Check → SERVING / NOT_SERVING   │
│                                                        │
│  Load balancing strategies:                            │
│  ┌────────────┐  ┌──────────────┐  ┌─────────────┐   │
│  │ Round Robin│  │ Least Conn   │  │ Weighted     │   │
│  │ even split │  │ fewest conns │  │  weighted    │   │
│  └────────────┘  └──────────────┘  └─────────────┘   │
└─────────┬──────────────┬──────────────┬───────────────┘
          │              │              │
          ▼              ▼              ▼
    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │ Server 1 │  │ Server 2 │  │ Server 3 │
    │ :50051   │  │ :50052   │  │ :50053   │
    │ SERVING  │  │ SERVING  │  │ SERVING  │
    └──────────┘  └──────────┘  └──────────┘
```

---

## 9. Comparison Tables

### Table 1: Detailed Comparison of gRPC vs REST

| Item | gRPC | REST (JSON) |
|------|------|-------------|
| Protocol | HTTP/2 | HTTP/1.1 or HTTP/2 |
| Serialization | Protocol Buffers (binary) | JSON (text) |
| Performance | Very fast (10-100x) | Moderate |
| Type safety | Strong (generated from .proto) | Weak (supplemented by OpenAPI) |
| Streaming | Bidirectional support | SSE/WebSocket |
| Browser support | Requires grpc-web/Connect | Native |
| Debugging | grpcurl, grpcui | curl, Postman |
| Ecosystem | Medium | Very large |
| Code generation | Automatic (proto) | Manual/OpenAPI |
| Versioning | Package version | URL/header |
| Error model | gRPC Status Code | HTTP Status Code |
| Recommended use | Microservice-to-microservice communication | Public external APIs |

### Table 2: gRPC Status Codes in Detail

| gRPC Code | HTTP equivalent | Use | Example |
|-----------|-----------------|-----|---------|
| OK (0) | 200 | Success | Normal completion |
| Cancelled (1) | 499 | Client canceled | Request interrupted |
| Unknown (2) | 500 | Unknown error | Unexpected exception |
| InvalidArgument (3) | 400 | Validation error | Invalid email format |
| DeadlineExceeded (4) | 504 | Timeout | Processing time exceeded |
| NotFound (5) | 404 | Resource missing | User does not exist |
| AlreadyExists (6) | 409 | Resource conflict | Email already exists |
| PermissionDenied (7) | 403 | Permission error | Admin rights required |
| ResourceExhausted (8) | 429 | Resource exhausted | Rate limit exceeded |
| FailedPrecondition (9) | 400 | Precondition mismatch | ETag mismatch |
| Aborted (10) | 409 | Operation aborted | Transaction conflict |
| OutOfRange (11) | 400 | Out of range | Invalid page token |
| Unimplemented (12) | 501 | Not implemented | Method not supported |
| Internal (13) | 500 | Server error | Internal processing failure |
| Unavailable (14) | 503 | Service unavailable | Under maintenance |
| DataLoss (15) | 500 | Data loss | Data corruption detected |
| Unauthenticated (16) | 401 | Authentication error | Invalid token |

### Table 3: RPC Pattern Selection Guide

| Pattern | Use | Message count | Example |
|---------|-----|---------------|---------|
| Unary | Basic request/response | 1:1 | CRUD operations, authentication |
| Server Streaming | Continuous data from server | 1:N | Real-time notifications, large data retrieval |
| Client Streaming | Continuous data from client | N:1 | File uploads, batch processing |
| Bidirectional | Bidirectional real-time communication | N:M | Chat, games, collaborative editing |

### Table 4: Protocol Buffers Best Practices

| Rule | Description | Example |
|------|-------------|---------|
| Reserve field numbers | Mark deleted field numbers as reserved | `reserved 3, 15;` |
| Enum default value | The 0 value is UNSPECIFIED | `ROLE_UNSPECIFIED = 0;` |
| Package versioning | Include version in package name | `package user.v1;` |
| FieldMask | Use for partial updates | `update_mask` field |
| Pagination | page_size + page_token | `string next_page_token;` |
| Timestamp | Use google.protobuf.Timestamp for datetimes | `import "google/protobuf/timestamp.proto";` |

---

## 10. Anti-Patterns

### Anti-Pattern 1: Oversized Messages

```protobuf
// BAD: returning a huge amount of data in one response
message ListUsersResponse {
  repeated User users = 1;  // could return 1M rows → out of memory
}

// GOOD: use pagination or streaming
// Option 1: pagination
message ListUsersRequest {
  int32 page_size = 1;     // max 100
  string page_token = 2;   // cursor
}
message ListUsersResponse {
  repeated User users = 1;
  string next_page_token = 2;
}

// Option 2: Server Streaming (for large volumes)
rpc StreamUsers(StreamUsersRequest) returns (stream User);
```

### Anti-Pattern 2: Not Returning Error Details

```go
// BAD: generic error message
return nil, status.Error(codes.Internal, "error")
// → the client has no idea what went wrong

// GOOD: attach detailed error information
st := status.New(codes.InvalidArgument, "validation failed")
st, _ = st.WithDetails(&errdetails.BadRequest{
    FieldViolations: []*errdetails.BadRequest_FieldViolation{
        {Field: "email", Description: "invalid email format"},
        {Field: "name", Description: "name must be 1-100 characters"},
    },
})
return nil, st.Err()
```

### Anti-Pattern 3: Ignoring the Context

```go
// BAD: running a long operation while ignoring the context
func (s *server) SlowRPC(ctx context.Context, req *pb.Request) (*pb.Response, error) {
    result := heavyComputation() // does not check ctx.Done()
    return &pb.Response{Data: result}, nil
}

// GOOD: periodically check the context for cancellation
func (s *server) SlowRPC(ctx context.Context, req *pb.Request) (*pb.Response, error) {
    resultCh := make(chan string, 1)
    go func() {
        resultCh <- heavyComputation()
    }()

    select {
    case result := <-resultCh:
        return &pb.Response{Data: result}, nil
    case <-ctx.Done():
        return nil, status.FromContextError(ctx.Err()).Err()
    }
}
```

### Anti-Pattern 4: Changing Field Numbers

```protobuf
// BAD: changing the number of an existing field (breaks backward compatibility)
// Before:
message User {
  string name = 1;
  string email = 2;
}
// After (broken):
message User {
  string email = 1;  // number changed → existing clients break
  string name = 2;
}

// GOOD: add new fields with new numbers
message User {
  string name = 1;
  string email = 2;
  string phone = 3;  // new fields get the next available number
  reserved 4;        // reserve the numbers of deleted fields
}
```

### Anti-Pattern 5: Leaving Unimplemented Methods

```go
// BAD: simply embedding UnimplementedServer and nothing more
type myServer struct {
    pb.UnimplementedMyServiceServer
}
// Unimplemented methods return an Unimplemented error when called
// → you may not notice in production

// GOOD: use mustEmbedUnimplemented to detect unimplemented methods,
// or explicitly implement every method and return an error for those not yet supported.
func (s *myServer) NotYetImplemented(ctx context.Context, req *pb.Request) (*pb.Response, error) {
    return nil, status.Error(codes.Unimplemented,
        "NotYetImplemented is not yet available, planned for v2.0")
}
```

---

## 11. FAQ

### Q1: When should I choose gRPC?

Choose gRPC for microservice-to-microservice communication, internal APIs that require low latency, and situations where streaming is needed. REST (or REST combined with gRPC-Gateway) is more appropriate for public, externally exposed APIs.

Decision criteria:
- **gRPC fits**: inter-microservice communication, high throughput, strong emphasis on type safety, streaming required
- **REST fits**: public external APIs, direct browser communication, simple CRUD, integration with existing systems
- **Both**: use gRPC-Gateway to provide gRPC internally and REST externally

### Q2: What about Protocol Buffers version compatibility?

Backward compatibility is preserved as long as you do not change existing field numbers. Adding new fields is safe. When deleting a field, reserve its number with `reserved` so it cannot be reused. This enables rolling updates.

Compatibility rules:
- Adding a field: safe (old clients receive the default value)
- Deleting a field: safe if the number is reserved with `reserved`
- Changing a field's type: incompatible (add a new field with a new number instead)
- Adding an enum value: safe (old clients treat it as unknown)
- Adding a service method: safe

### Q3: How do I write gRPC tests?

Use the `bufconn` package to create an in-memory connection and start the actual gRPC server inside your tests. This allows fast testing without real network I/O and lets you test interceptors as well.

Testing strategy:
1. **Unit tests**: test server and client together using bufconn
2. **Integration tests**: start a real server and test against it
3. **Mocks**: generate client interface mocks with mockgen
4. **E2E tests**: manual testing with tools such as grpcurl

### Q4: What is the difference between gRPC-Gateway, grpc-web, and Connect?

- **gRPC-Gateway**: a reverse proxy that converts gRPC into REST/JSON. Runs as a separate process.
- **grpc-web**: a protocol for calling gRPC from browsers. Requires an Envoy proxy.
- **Connect**: Buf's RPC framework. Supports the gRPC, gRPC-Web, and Connect protocols through a single handler. No proxy required.

### Q5: How do I tune gRPC performance?

1. **KeepAlive settings**: reduce latency by reusing connections
2. **Message size limits**: enforce sensible size limits for safety
3. **Connection pooling**: use multiple connections to process in parallel
4. **Compression**: use gzip compression to save bandwidth
5. **Streaming**: split large data and send it via streaming
6. **Server reflection**: disable it in production to improve security

### Q6: How do I use grpcurl?

```bash
# List services
grpcurl -plaintext localhost:50051 list

# List methods
grpcurl -plaintext localhost:50051 list user.v1.UserService

# Call a Unary RPC
grpcurl -plaintext -d '{"id": 1}' localhost:50051 user.v1.UserService/GetUser

# With metadata
grpcurl -plaintext \
  -H 'Authorization: Bearer token123' \
  -d '{"name": "Test", "email": "test@example.com"}' \
  localhost:50051 user.v1.UserService/CreateUser

# Server Streaming
grpcurl -plaintext -d '{"user_ids": [1, 2, 3]}' \
  localhost:50051 user.v1.UserService/WatchUsers
```

---


## FAQ

### Q1: What is the single most important point when learning this topic?

Gaining practical experience is the most important thing. Understanding deepens when you go beyond theory and actually write code to verify how it behaves.

### Q2: What mistakes do beginners commonly make?

Skipping the fundamentals and jumping into advanced topics. We recommend firmly understanding the basic concepts explained in this guide before moving on to the next step.

### Q3: How is this used in real-world practice?

The knowledge in this topic is frequently applied in day-to-day development work. It becomes especially important during code reviews and architectural design.

---

## Summary

| Concept | Key point |
|---------|-----------|
| Protocol Buffers | Automatically generate Go (and other languages) code from .proto |
| Unary RPC | One request to one response. The basic pattern. |
| Server Streaming | Continuous responses from the server. Real-time notifications. |
| Client Streaming | Continuous requests from the client. Batch processing. |
| Bidirectional | Bidirectional real-time communication. Chat and similar use cases. |
| Interceptor | The gRPC equivalent of middleware. Authentication, logging, recovery. |
| Status Code | Its own code system. Attach error details with WithDetails. |
| gRPC-Gateway | Automatic REST API conversion. Coexistence with external-facing APIs. |
| FieldMask | The partial update pattern. Reduces bandwidth. |
| bufconn | In-memory testing. Fast and requires no network. |
| Health check | grpc_health_v1. Integrates with load balancers. |
| Graceful Shutdown | Safely stop the server with GracefulStop(). |

---

## Recommended Next Guides

- [04-testing.md](./04-testing.md) -- Testing
- [../03-tools/03-deployment.md](../03-tools/03-deployment.md) -- Deployment
- [../01-concurrency/03-context.md](../01-concurrency/03-context.md) -- Context

---

## References

1. **gRPC Go** -- https://grpc.io/docs/languages/go/
2. **Protocol Buffers Language Guide** -- https://protobuf.dev/programming-guides/proto3/
3. **gRPC-Gateway** -- https://grpc-ecosystem.github.io/grpc-gateway/
4. **Buf** -- https://buf.build/docs/
5. **Connect** -- https://connectrpc.com/
6. **Google API Design Guide** -- https://cloud.google.com/apis/design
7. **gRPC Status Codes** -- https://grpc.github.io/grpc/core/md_doc_statuscodes.html
8. **grpcurl** -- https://github.com/fullstorydev/grpcurl



===== SOURCE: 02-programming/go-practical-guide/docs/02-web/04-testing.md =====

# Complete Guide to Go Testing

> Practical testing techniques that guarantee Go code quality through table-driven tests, testify, and httptest

## What You Will Learn in This Chapter

1. How to write comprehensive and maintainable tests using the **table-driven tests** pattern
2. How to leverage the **testify** library for assertions, mocks, and suites
3. Techniques for testing HTTP handlers and clients with the **httptest** package
4. Design patterns for **integration tests** and test helpers
5. Practical use of **test coverage** and benchmarks


## Prerequisites

Before reading this guide, the following knowledge will deepen your understanding:

- Basic programming knowledge
- Understanding of related fundamental concepts
- Familiarity with the content of [gRPC -- Protocol Buffers, Service Definitions, Streaming](./03-grpc.md)

---

## 1. Basic Structure of Go Tests

### 1-1. Naming Conventions for Test Files

```
project/
├── handler.go
├── handler_test.go      ← Same package
├── service.go
├── service_test.go
├── handler_integration_test.go  ← Integration test
└── testdata/                    ← Directory for test data
    ├── golden_response.json
    └── fixtures/
        ├── users.json
        └── config.yaml
```

Go tests are written in files with the `_test.go` suffix. Test functions start with the `Test` prefix and take `*testing.T` as an argument. The `testdata` directory is ignored by the Go build system, making it ideal for storing test fixtures and golden files.

### 1-2. Choosing a Test Package

There are two approaches to naming the package in a test file.

```go
// Approach 1: Same-package test (white-box testing)
// handler_test.go
package myapp

// Can access private functions and fields
func TestInternalLogic(t *testing.T) {
    result := internalHelper("input")  // Directly tests unexported functions
    if result != "expected" {
        t.Errorf("internalHelper() = %q, want %q", result, "expected")
    }
}

// Approach 2: External-package test (black-box testing)
// handler_test.go
package myapp_test

import "myproject/myapp"

// Tests only the public API (user-perspective verification)
func TestPublicAPI(t *testing.T) {
    result := myapp.Process("input")
    if result != "expected" {
        t.Errorf("Process() = %q, want %q", result, "expected")
    }
}
```

### Code Example 1: Minimal Test

```go
package calc

import "testing"

func Add(a, b int) int {
    return a + b
}

func TestAdd(t *testing.T) {
    got := Add(2, 3)
    want := 5
    if got != want {
        t.Errorf("Add(2, 3) = %d, want %d", got, want)
    }
}
```

### Test Execution Flow

```
+------------------+     +------------------+     +------------------+
|  go test ./...   | --> | Compile          | --> | Test binary      |
|  command         |     | including        |     | execution &      |
|                  |     | *_test.go files  |     | result display   |
+------------------+     +------------------+     +------------------+
        |                        |                        |
        v                        v                        v
  Flag parsing             Discover test          PASS / FAIL decision
  -v, -run, -cover         functions              exit code 0 or 1
                           Test*, Benchmark*
```

### 1-3. Main Flags for Test Execution

```bash
# Basic execution
go test ./...                       # Run tests in all packages
go test -v ./...                    # Verbose output
go test -run TestAdd ./...          # Run only a specific test
go test -run TestDivide/ZeroDivision # Specify a subtest

# Parallel / timeout control
go test -parallel 4 ./...           # Specify number of parallel executions
go test -timeout 60s ./...          # Overall test timeout
go test -count=5 ./...              # Run repeatedly (invalidate cache)

# Coverage
go test -cover ./...                # Run with coverage
go test -coverprofile=coverage.out  # Output profile
go test -covermode=atomic ./...     # Concurrency-safe coverage

# Race detection
go test -race ./...                 # Detect data races
go test -race -count=10 ./...       # Improve race detection accuracy by repeating

# Build tags
go test -tags=integration ./...     # Run tests with specified tag
go test -short ./...                # Short-test mode
```

---

## 2. Table-Driven Tests

The most recommended testing pattern in Go. Test cases are defined as a slice and executed in a loop.

### Code Example 2: Basic Table-Driven Test

```go
func TestDivide(t *testing.T) {
    tests := []struct {
        name      string
        a, b      float64
        want      float64
        wantError bool
    }{
        {name: "normal division", a: 10, b: 2, want: 5, wantError: false},
        {name: "fractional result", a: 7, b: 3, want: 2.3333, wantError: false},
        {name: "division by zero", a: 5, b: 0, want: 0, wantError: true},
        {name: "negative number", a: -10, b: 2, want: -5, wantError: false},
        {name: "both negative", a: -10, b: -2, want: 5, wantError: false},
        {name: "very small number", a: 1, b: 1000000, want: 0.000001, wantError: false},
        {name: "very large number", a: 1e18, b: 1e9, want: 1e9, wantError: false},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := Divide(tt.a, tt.b)
            if (err != nil) != tt.wantError {
                t.Fatalf("Divide(%v, %v) error = %v, wantError %v",
                    tt.a, tt.b, err, tt.wantError)
            }
            if !tt.wantError && math.Abs(got-tt.want) > 0.001 {
                t.Errorf("Divide(%v, %v) = %v, want %v",
                    tt.a, tt.b, got, tt.want)
            }
        })
    }
}
```

### Structure of a Table-Driven Test

```
+------------------------------------------+
|  tests := []struct{ ... }{               |
|    +------------------------------------+|
|    | Case 1: name, input, expected      ||
|    +------------------------------------+|
|    | Case 2: name, input, expected      ||
|    +------------------------------------+|
|    | Case 3: name, input, expected      ||
|    +------------------------------------+|
|  }                                       |
|                                          |
|  for _, tt := range tests {              |
|    t.Run(tt.name, func(t *testing.T){    |
|      // Test logic                       |
|    })                                    |
|  }                                       |
+------------------------------------------+
         |
         v
  $ go test -run TestDivide/ZeroDivision
  --- Individual cases can also be executed
```

### Code Example 3: Parallel Table-Driven Test

```go
func TestSlowOperation(t *testing.T) {
    tests := []struct {
        name  string
        input string
        want  string
    }{
        {"case A", "hello", "HELLO"},
        {"case B", "world", "WORLD"},
        {"case C", "go", "GO"},
    }

    for _, tt := range tests {
        tt := tt // Capture loop variable (required before Go 1.22)
        t.Run(tt.name, func(t *testing.T) {
            t.Parallel() // Enable parallel execution
            got := strings.ToUpper(tt.input)
            if got != tt.want {
                t.Errorf("ToUpper(%q) = %q, want %q", tt.input, got, tt.want)
            }
        })
    }
}
```

### Code Example 4: Table-Driven Test with Setup/Teardown

```go
func TestDatabaseOperations(t *testing.T) {
    tests := []struct {
        name    string
        setup   func(db *sql.DB)    // Setup before the test
        action  func(db *sql.DB) error
        verify  func(t *testing.T, db *sql.DB)
        cleanup func(db *sql.DB)    // Cleanup after the test
    }{
        {
            name: "create user",
            setup: func(db *sql.DB) {
                db.Exec("DELETE FROM users")
            },
            action: func(db *sql.DB) error {
                _, err := db.Exec("INSERT INTO users (name, email) VALUES (?, ?)",
                    "Alice", "alice@example.com")
                return err
            },
            verify: func(t *testing.T, db *sql.DB) {
                var count int
                db.QueryRow("SELECT COUNT(*) FROM users").Scan(&count)
                if count != 1 {
                    t.Errorf("user count = %d, want 1", count)
                }
            },
            cleanup: func(db *sql.DB) {
                db.Exec("DELETE FROM users")
            },
        },
        {
            name: "reject duplicate email",
            setup: func(db *sql.DB) {
                db.Exec("DELETE FROM users")
                db.Exec("INSERT INTO users (name, email) VALUES (?, ?)",
                    "Alice", "alice@example.com")
            },
            action: func(db *sql.DB) error {
                _, err := db.Exec("INSERT INTO users (name, email) VALUES (?, ?)",
                    "Bob", "alice@example.com")
                return err
            },
            verify: func(t *testing.T, db *sql.DB) {
                // Verify that an error occurred (check via the action's return value)
            },
            cleanup: func(db *sql.DB) {
                db.Exec("DELETE FROM users")
            },
        },
    }

    db := setupTestDB(t) // Test DB connection
    defer db.Close()

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            if tt.setup != nil {
                tt.setup(db)
            }
            if tt.cleanup != nil {
                defer tt.cleanup(db)
            }

            err := tt.action(db)
            if tt.verify != nil {
                tt.verify(t, db)
            }
            _ = err // Verify error as needed
        })
    }
}
```

### Code Example 5: Table-Driven Test with Custom Matcher

```go
func TestParseConfig(t *testing.T) {
    tests := []struct {
        name    string
        input   string
        check   func(t *testing.T, cfg *Config, err error) // Custom verification function
    }{
        {
            name:  "complete config",
            input: `{"host": "localhost", "port": 8080, "debug": true}`,
            check: func(t *testing.T, cfg *Config, err error) {
                t.Helper()
                require.NoError(t, err)
                assert.Equal(t, "localhost", cfg.Host)
                assert.Equal(t, 8080, cfg.Port)
                assert.True(t, cfg.Debug)
            },
        },
        {
            name:  "apply default values",
            input: `{}`,
            check: func(t *testing.T, cfg *Config, err error) {
                t.Helper()
                require.NoError(t, err)
                assert.Equal(t, "0.0.0.0", cfg.Host, "default host")
                assert.Equal(t, 3000, cfg.Port, "default port")
                assert.False(t, cfg.Debug, "debug disabled by default")
            },
        },
        {
            name:  "invalid JSON",
            input: `{invalid`,
            check: func(t *testing.T, cfg *Config, err error) {
                t.Helper()
                require.Error(t, err)
                assert.Nil(t, cfg)
                assert.Contains(t, err.Error(), "invalid")
            },
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            cfg, err := ParseConfig([]byte(tt.input))
            tt.check(t, cfg, err)
        })
    }
}
```

---

## 3. The testify Library

### Installation

```bash
go get github.com/stretchr/testify
```

### Code Example 6: testify/assert and testify/require

```go
package user_test

import (
    "testing"

    "github.com/stretchr/testify/assert"
    "github.com/stretchr/testify/require"
)

func TestCreateUser(t *testing.T) {
    // assert: continues the test even on failure
    user, err := CreateUser("Alice", "alice@example.com")
    assert.NoError(t, err, "an error occurred while creating the user")
    assert.Equal(t, "Alice", user.Name)
    assert.NotEmpty(t, user.ID)

    // require: immediately aborts the test on failure
    token, err := user.GenerateToken()
    require.NoError(t, err, "token generation is required")
    require.NotEmpty(t, token)

    // Further test using the token
    claims, err := ParseToken(token)
    assert.NoError(t, err)
    assert.Equal(t, user.ID, claims.UserID)
}
```

### assert vs. require Comparison Table

| Item | `assert` | `require` |
|------|----------|-----------|
| Behavior on failure | Continue test (equivalent to `t.Errorf`) | Abort test immediately (equivalent to `t.Fatalf`) |
| Use case | Run multiple verifications at once | Verify prerequisites for subsequent tests |
| Return value | `bool` (success/failure) | None (calls t.FailNow on failure) |
| Recommended for | Value comparisons, attribute checks | Nil checks, error checks |
| Output | Shows all failures together | Shows only the first failure |

### Main testify Assertions

```go
// Equality comparison
assert.Equal(t, expected, actual)           // DeepEqual comparison
assert.NotEqual(t, unexpected, actual)
assert.EqualValues(t, expected, actual)     // Comparison including type conversion

// nil / empty checks
assert.Nil(t, obj)
assert.NotNil(t, obj)
assert.Empty(t, collection)                // len == 0
assert.NotEmpty(t, collection)

// Boolean
assert.True(t, condition)
assert.False(t, condition)

// Error
assert.NoError(t, err)
assert.Error(t, err)
assert.ErrorIs(t, err, ErrNotFound)        // Equivalent to errors.Is
assert.ErrorAs(t, err, &target)            // Equivalent to errors.As
assert.ErrorContains(t, err, "not found")

// Collection
assert.Contains(t, list, element)
assert.NotContains(t, list, element)
assert.Len(t, list, expectedLen)
assert.ElementsMatch(t, expected, actual)  // Order-independent comparison

// String
assert.Contains(t, str, substring)
assert.Regexp(t, regexp, str)

// Numeric
assert.Greater(t, a, b)
assert.GreaterOrEqual(t, a, b)
assert.InDelta(t, expected, actual, delta)  // Approximate floating-point comparison

// Panic
assert.Panics(t, func() { panicFunc() })
assert.NotPanics(t, func() { safeFunc() })

// JSON
assert.JSONEq(t, expectedJSON, actualJSON)  // Semantic comparison of JSON strings

// Time
assert.WithinDuration(t, expected, actual, delta)
```

### Code Example 7: testify/mock

```go
// Interface definition
type UserRepository interface {
    FindByID(id string) (*User, error)
    FindByEmail(email string) (*User, error)
    Save(user *User) error
    Delete(id string) error
    List(offset, limit int) ([]*User, error)
}

// Mock generation
type MockUserRepo struct {
    mock.Mock
}

func (m *MockUserRepo) FindByID(id string) (*User, error) {
    args := m.Called(id)
    if args.Get(0) == nil {
        return nil, args.Error(1)
    }
    return args.Get(0).(*User), args.Error(1)
}

func (m *MockUserRepo) FindByEmail(email string) (*User, error) {
    args := m.Called(email)
    if args.Get(0) == nil {
        return nil, args.Error(1)
    }
    return args.Get(0).(*User), args.Error(1)
}

func (m *MockUserRepo) Save(user *User) error {
    args := m.Called(user)
    return args.Error(0)
}

func (m *MockUserRepo) Delete(id string) error {
    args := m.Called(id)
    return args.Error(0)
}

func (m *MockUserRepo) List(offset, limit int) ([]*User, error) {
    args := m.Called(offset, limit)
    if args.Get(0) == nil {
        return nil, args.Error(1)
    }
    return args.Get(0).([]*User), args.Error(1)
}

// Usage in tests
func TestUpdateUserName(t *testing.T) {
    mockRepo := new(MockUserRepo)

    existingUser := &User{ID: "123", Name: "Alice"}
    mockRepo.On("FindByID", "123").Return(existingUser, nil)
    mockRepo.On("Save", mock.AnythingOfType("*User")).Return(nil)

    service := NewUserService(mockRepo)
    err := service.UpdateName("123", "Bob")

    assert.NoError(t, err)
    mockRepo.AssertExpectations(t)
    mockRepo.AssertCalled(t, "Save", mock.MatchedBy(func(u *User) bool {
        return u.Name == "Bob"
    }))
}

// More advanced mock patterns
func TestUserServiceEdgeCases(t *testing.T) {
    t.Run("when user is not found", func(t *testing.T) {
        mockRepo := new(MockUserRepo)
        mockRepo.On("FindByID", "999").Return(nil, ErrNotFound)

        service := NewUserService(mockRepo)
        err := service.UpdateName("999", "Bob")

        assert.ErrorIs(t, err, ErrNotFound)
        mockRepo.AssertNotCalled(t, "Save")
    })

    t.Run("rollback on save failure", func(t *testing.T) {
        mockRepo := new(MockUserRepo)
        existingUser := &User{ID: "123", Name: "Alice"}
        mockRepo.On("FindByID", "123").Return(existingUser, nil)
        mockRepo.On("Save", mock.Anything).Return(errors.New("db error"))

        service := NewUserService(mockRepo)
        err := service.UpdateName("123", "Bob")

        assert.Error(t, err)
        assert.Contains(t, err.Error(), "db error")
    })

    t.Run("verify call count", func(t *testing.T) {
        mockRepo := new(MockUserRepo)
        users := []*User{
            {ID: "1", Name: "Alice"},
            {ID: "2", Name: "Bob"},
        }
        mockRepo.On("List", 0, 10).Return(users, nil).Once()

        service := NewUserService(mockRepo)
        result, _ := service.ListUsers(0, 10)

        assert.Len(t, result, 2)
        mockRepo.AssertNumberOfCalls(t, "List", 1)
    })
}
```

### Code Example 8: testify/suite

```go
package user_test

import (
    "database/sql"
    "testing"

    "github.com/stretchr/testify/assert"
    "github.com/stretchr/testify/suite"
)

// Test suite definition
type UserServiceSuite struct {
    suite.Suite
    db      *sql.DB
    service *UserService
    repo    *UserRepo
}

// Run once before the suite starts
func (s *UserServiceSuite) SetupSuite() {
    db, err := sql.Open("sqlite3", ":memory:")
    s.Require().NoError(err)
    s.db = db

    // Create table
    _, err = db.Exec(`
        CREATE TABLE users (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `)
    s.Require().NoError(err)

    s.repo = NewUserRepo(db)
    s.service = NewUserService(s.repo)
}

// Run before each test
func (s *UserServiceSuite) SetupTest() {
    s.db.Exec("DELETE FROM users")
}

// Run after each test
func (s *UserServiceSuite) TearDownTest() {
    // Cleanup as needed
}

// Run once when the suite ends
func (s *UserServiceSuite) TearDownSuite() {
    s.db.Close()
}

// Test cases
func (s *UserServiceSuite) TestCreateUser() {
    user, err := s.service.Create("Alice", "alice@example.com")
    s.NoError(err)
    s.NotEmpty(user.ID)
    s.Equal("Alice", user.Name)
}

func (s *UserServiceSuite) TestCreateDuplicateEmail() {
    _, err := s.service.Create("Alice", "alice@example.com")
    s.NoError(err)

    _, err = s.service.Create("Bob", "alice@example.com")
    s.Error(err)
    s.ErrorIs(err, ErrDuplicate)
}

func (s *UserServiceSuite) TestFindUser() {
    created, _ := s.service.Create("Alice", "alice@example.com")

    found, err := s.service.FindByID(created.ID)
    s.NoError(err)
    s.Equal(created.ID, found.ID)
    s.Equal("Alice", found.Name)
}

func (s *UserServiceSuite) TestDeleteUser() {
    created, _ := s.service.Create("Alice", "alice@example.com")

    err := s.service.Delete(created.ID)
    s.NoError(err)

    _, err = s.service.FindByID(created.ID)
    s.ErrorIs(err, ErrNotFound)
}

// Entry point for running the suite
func TestUserServiceSuite(t *testing.T) {
    suite.Run(t, new(UserServiceSuite))
}
```

---

## 4. The httptest Package

### Overview of HTTP Testing

```
+----------------------------+
|  Choosing the test target  |
+----------------------------+
        |             |
        v             v
+-------------+ +----------------+
| Server-side | | Client-side    |
| Test        | | Test external  |
| handlers    | | API calls      |
+-------------+ +----------------+
        |             |
        v             v
+-------------+ +----------------+
| httptest.   | | httptest.      |
| NewRecorder | | NewServer      |
| Request →   | | Spin up a mock |
| Response    | | server to verify|
+-------------+ +----------------+
```

### Code Example 9: Handler Testing with httptest.NewRecorder

```go
func TestHealthHandler(t *testing.T) {
    // Handler definition
    handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        w.WriteHeader(http.StatusOK)
        json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
    })

    // Create request
    req := httptest.NewRequest("GET", "/health", nil)
    rec := httptest.NewRecorder()

    // Execute handler
    handler.ServeHTTP(rec, req)

    // Verify
    assert.Equal(t, http.StatusOK, rec.Code)
    assert.Contains(t, rec.Header().Get("Content-Type"), "application/json")

    var body map[string]string
    err := json.Unmarshal(rec.Body.Bytes(), &body)
    require.NoError(t, err)
    assert.Equal(t, "ok", body["status"])
}
```

### Code Example 10: Full Test for JSON Requests and Responses

```go
func TestCreateUserHandler(t *testing.T) {
    tests := []struct {
        name       string
        body       interface{}
        wantStatus int
        wantBody   map[string]interface{}
    }{
        {
            name:       "successful creation",
            body:       map[string]string{"name": "Alice", "email": "alice@example.com"},
            wantStatus: http.StatusCreated,
            wantBody:   map[string]interface{}{"name": "Alice", "email": "alice@example.com"},
        },
        {
            name:       "empty name",
            body:       map[string]string{"name": "", "email": "alice@example.com"},
            wantStatus: http.StatusBadRequest,
            wantBody:   map[string]interface{}{"error": "name is required"},
        },
        {
            name:       "invalid email",
            body:       map[string]string{"name": "Alice", "email": "invalid"},
            wantStatus: http.StatusBadRequest,
            wantBody:   map[string]interface{}{"error": "invalid email format"},
        },
        {
            name:       "invalid JSON",
            body:       "invalid json",
            wantStatus: http.StatusBadRequest,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            var bodyReader io.Reader
            switch v := tt.body.(type) {
            case string:
                bodyReader = strings.NewReader(v)
            default:
                jsonBytes, _ := json.Marshal(v)
                bodyReader = bytes.NewReader(jsonBytes)
            }

            req := httptest.NewRequest("POST", "/api/users", bodyReader)
            req.Header.Set("Content-Type", "application/json")
            rec := httptest.NewRecorder()

            handler := NewRouter() // Router under test
            handler.ServeHTTP(rec, req)

            assert.Equal(t, tt.wantStatus, rec.Code)

            if tt.wantBody != nil {
                var got map[string]interface{}
                err := json.Unmarshal(rec.Body.Bytes(), &got)
                require.NoError(t, err)
                for key, want := range tt.wantBody {
                    assert.Equal(t, want, got[key], "field %s does not match", key)
                }
            }
        })
    }
}
```

### Code Example 11: Mocking an External API with httptest.NewServer

```go
func TestFetchUserFromAPI(t *testing.T) {
    // Create a mock server
    mockServer := httptest.NewServer(http.HandlerFunc(
        func(w http.ResponseWriter, r *http.Request) {
            assert.Equal(t, "/api/users/42", r.URL.Path)
            assert.Equal(t, "Bearer test-token", r.Header.Get("Authorization"))

            w.Header().Set("Content-Type", "application/json")
            json.NewEncoder(w).Encode(map[string]interface{}{
                "id":   42,
                "name": "Alice",
            })
        },
    ))
    defer mockServer.Close()

    // Inject the mock URL into the client under test
    client := NewAPIClient(mockServer.URL, "test-token")
    user, err := client.FetchUser(42)

    require.NoError(t, err)
    assert.Equal(t, 42, user.ID)
    assert.Equal(t, "Alice", user.Name)
}
```

### Code Example 12: Mock Server with Multiple Endpoints

```go
func TestExternalAPIClient(t *testing.T) {
    // Mock server that handles multiple endpoints
    mockServer := httptest.NewServer(http.HandlerFunc(
        func(w http.ResponseWriter, r *http.Request) {
            switch {
            case r.Method == "GET" && r.URL.Path == "/api/users":
                // User list
                w.Header().Set("Content-Type", "application/json")
                json.NewEncoder(w).Encode([]map[string]interface{}{
                    {"id": 1, "name": "Alice"},
                    {"id": 2, "name": "Bob"},
                })

            case r.Method == "GET" && strings.HasPrefix(r.URL.Path, "/api/users/"):
                // Get individual user
                id := strings.TrimPrefix(r.URL.Path, "/api/users/")
                if id == "999" {
                    w.WriteHeader(http.StatusNotFound)
                    json.NewEncoder(w).Encode(map[string]string{"error": "not found"})
                    return
                }
                w.Header().Set("Content-Type", "application/json")
                json.NewEncoder(w).Encode(map[string]interface{}{
                    "id":   1,
                    "name": "Alice",
                })

            case r.Method == "POST" && r.URL.Path == "/api/users":
                // Create user
                var body map[string]string
                json.NewDecoder(r.Body).Decode(&body)
                w.WriteHeader(http.StatusCreated)
                json.NewEncoder(w).Encode(map[string]interface{}{
                    "id":   100,
                    "name": body["name"],
                })

            default:
                w.WriteHeader(http.StatusNotFound)
            }
        },
    ))
    defer mockServer.Close()

    client := NewAPIClient(mockServer.URL, "test-token")

    t.Run("fetch user list", func(t *testing.T) {
        users, err := client.ListUsers()
        require.NoError(t, err)
        assert.Len(t, users, 2)
    })

    t.Run("non-existent user", func(t *testing.T) {
        _, err := client.FetchUser(999)
        assert.ErrorIs(t, err, ErrNotFound)
    })

    t.Run("create user", func(t *testing.T) {
        user, err := client.CreateUser("Charlie")
        require.NoError(t, err)
        assert.Equal(t, "Charlie", user.Name)
    })
}
```

### Code Example 13: Testing Middleware

```go
func TestAuthMiddleware(t *testing.T) {
    tests := []struct {
        name       string
        token      string
        wantStatus int
    }{
        {"valid token", "valid-token", http.StatusOK},
        {"invalid token", "bad-token", http.StatusUnauthorized},
        {"no token", "", http.StatusUnauthorized},
        {"expired token", "expired-token", http.StatusUnauthorized},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            inner := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
                w.WriteHeader(http.StatusOK)
            })

            handler := AuthMiddleware(inner)
            req := httptest.NewRequest("GET", "/protected", nil)
            if tt.token != "" {
                req.Header.Set("Authorization", "Bearer "+tt.token)
            }
            rec := httptest.NewRecorder()

            handler.ServeHTTP(rec, req)
            assert.Equal(t, tt.wantStatus, rec.Code)
        })
    }
}

// Rate-limit middleware test
func TestRateLimitMiddleware(t *testing.T) {
    inner := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
    })

    // Rate limit of up to 3 requests per second
    handler := RateLimitMiddleware(3, time.Second)(inner)

    // The first 3 requests succeed
    for i := 0; i < 3; i++ {
        req := httptest.NewRequest("GET", "/api/data", nil)
        req.RemoteAddr = "192.168.1.1:12345"
        rec := httptest.NewRecorder()
        handler.ServeHTTP(rec, req)
        assert.Equal(t, http.StatusOK, rec.Code, "request %d", i+1)
    }

    // The 4th request is throttled
    req := httptest.NewRequest("GET", "/api/data", nil)
    req.RemoteAddr = "192.168.1.1:12345"
    rec := httptest.NewRecorder()
    handler.ServeHTTP(rec, req)
    assert.Equal(t, http.StatusTooManyRequests, rec.Code)
}

// CORS middleware test
func TestCORSMiddleware(t *testing.T) {
    inner := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
    })

    handler := CORSMiddleware(CORSConfig{
        AllowOrigins: []string{"https://example.com"},
        AllowMethods: []string{"GET", "POST"},
        AllowHeaders: []string{"Content-Type", "Authorization"},
    })(inner)

    t.Run("preflight request", func(t *testing.T) {
        req := httptest.NewRequest("OPTIONS", "/api/data", nil)
        req.Header.Set("Origin", "https://example.com")
        req.Header.Set("Access-Control-Request-Method", "POST")
        rec := httptest.NewRecorder()

        handler.ServeHTTP(rec, req)

        assert.Equal(t, http.StatusNoContent, rec.Code)
        assert.Equal(t, "https://example.com",
            rec.Header().Get("Access-Control-Allow-Origin"))
    })

    t.Run("disallowed origin", func(t *testing.T) {
        req := httptest.NewRequest("GET", "/api/data", nil)
        req.Header.Set("Origin", "https://evil.com")
        rec := httptest.NewRecorder()

        handler.ServeHTTP(rec, req)

        assert.Empty(t, rec.Header().Get("Access-Control-Allow-Origin"))
    })
}
```

### Code Example 14: Testing a TLS Server

```go
func TestHTTPSClient(t *testing.T) {
    // Test server with TLS
    tlsServer := httptest.NewTLSServer(http.HandlerFunc(
        func(w http.ResponseWriter, r *http.Request) {
            w.WriteHeader(http.StatusOK)
            w.Write([]byte("secure"))
        },
    ))
    defer tlsServer.Close()

    // Get the client for the TLS server
    client := tlsServer.Client()

    resp, err := client.Get(tlsServer.URL + "/secure")
    require.NoError(t, err)
    defer resp.Body.Close()

    body, _ := io.ReadAll(resp.Body)
    assert.Equal(t, "secure", string(body))
}
```

---

## 5. Test Helpers and Utilities

### Code Example 15: Test Helper Functions

```go
// testhelper.go (inside the test package)

// Use t.Helper() to display the caller's line number
func assertJSON(t *testing.T, body []byte, key, want string) {
    t.Helper() // Without this, this function's line number is displayed
    var m map[string]string
    require.NoError(t, json.Unmarshal(body, &m))
    assert.Equal(t, want, m[key])
}

// HTTP request builder for tests
func newJSONRequest(t *testing.T, method, url string, body interface{}) *http.Request {
    t.Helper()
    var reader io.Reader
    if body != nil {
        jsonBytes, err := json.Marshal(body)
        require.NoError(t, err)
        reader = bytes.NewReader(jsonBytes)
    }
    req := httptest.NewRequest(method, url, reader)
    req.Header.Set("Content-Type", "application/json")
    return req
}

// Test DB setup
func setupTestDB(t *testing.T) *sql.DB {
    t.Helper()
    db, err := sql.Open("sqlite3", ":memory:")
    require.NoError(t, err)

    // Run migrations
    _, err = db.Exec(testSchema)
    require.NoError(t, err)

    // Automatic cleanup via t.Cleanup (Go 1.14+)
    t.Cleanup(func() {
        db.Close()
    })

    return db
}

// Temporary file for tests
func createTempFile(t *testing.T, content string) string {
    t.Helper()
    f, err := os.CreateTemp("", "test-*")
    require.NoError(t, err)

    _, err = f.WriteString(content)
    require.NoError(t, err)
    f.Close()

    t.Cleanup(func() {
        os.Remove(f.Name())
    })

    return f.Name()
}

// Environment variable setup for tests
func setEnv(t *testing.T, key, value string) {
    t.Helper()
    original := os.Getenv(key)
    os.Setenv(key, value)
    t.Cleanup(func() {
        if original == "" {
            os.Unsetenv(key)
        } else {
            os.Setenv(key, original)
        }
    })
}
```

### Code Example 16: Golden File Testing

```go
// Golden file pattern: save expected output to a file
var update = flag.Bool("update", false, "update golden files")

func TestRenderTemplate(t *testing.T) {
    tests := []struct {
        name string
        data interface{}
    }{
        {"user profile", User{Name: "Alice", Age: 30}},
        {"empty data", User{}},
        {"Japanese name", User{Name: "Taro", Age: 25}},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := RenderTemplate(tt.data)

            goldenFile := filepath.Join("testdata", t.Name()+".golden")

            if *update {
                // Update the golden file
                os.MkdirAll(filepath.Dir(goldenFile), 0755)
                os.WriteFile(goldenFile, []byte(got), 0644)
                return
            }

            // Compare against the golden file
            want, err := os.ReadFile(goldenFile)
            require.NoError(t, err, "golden file not found. Generate it with the -update flag")
            assert.Equal(t, string(want), got)
        })
    }
}
```

### Code Example 17: Time Control for Tests

```go
// Abstract time via an interface
type Clock interface {
    Now() time.Time
}

// Production implementation
type RealClock struct{}
func (RealClock) Now() time.Time { return time.Now() }

// Test implementation
type FakeClock struct {
    current time.Time
}
func (c *FakeClock) Now() time.Time { return c.current }
func (c *FakeClock) Advance(d time.Duration) { c.current = c.current.Add(d) }

// Example usage
type TokenService struct {
    clock     Clock
    ttl       time.Duration
}

func (s *TokenService) IsExpired(token *Token) bool {
    return s.clock.Now().After(token.ExpiresAt)
}

// Test
func TestTokenExpiry(t *testing.T) {
    fakeClock := &FakeClock{current: time.Date(2024, 1, 1, 0, 0, 0, 0, time.UTC)}
    service := &TokenService{clock: fakeClock, ttl: time.Hour}

    token := &Token{
        ExpiresAt: time.Date(2024, 1, 1, 1, 0, 0, 0, time.UTC),
    }

    // Within the validity period
    assert.False(t, service.IsExpired(token))

    // Advance time
    fakeClock.Advance(2 * time.Hour)

    // Expired
    assert.True(t, service.IsExpired(token))
}
```

---

## 6. Integration Tests and Build Tags

### Code Example 18: Test Separation via Build Tags

```go
//go:build integration

package store_test

import (
    "database/sql"
    "os"
    "testing"

    _ "github.com/lib/pq"
)

func TestPostgresUserStore(t *testing.T) {
    dsn := os.Getenv("TEST_DATABASE_URL")
    if dsn == "" {
        t.Skip("TEST_DATABASE_URL is not set")
    }

    db, err := sql.Open("postgres", dsn)
    require.NoError(t, err)
    defer db.Close()

    store := NewUserStore(db)

    t.Run("CRUD operations", func(t *testing.T) {
        // Create
        user, err := store.Create(&User{Name: "Alice", Email: "alice@test.com"})
        require.NoError(t, err)
        assert.NotEmpty(t, user.ID)

        // Read
        found, err := store.FindByID(user.ID)
        require.NoError(t, err)
        assert.Equal(t, "Alice", found.Name)

        // Update
        found.Name = "Alice Updated"
        err = store.Update(found)
        require.NoError(t, err)

        // Delete
        err = store.Delete(user.ID)
        require.NoError(t, err)

        _, err = store.FindByID(user.ID)
        assert.ErrorIs(t, err, ErrNotFound)
    })
}
```

```bash
# Normal tests (integration tests excluded)
go test ./...

# Including integration tests
go test -tags=integration ./...

# Only integration tests
go test -tags=integration -run TestPostgres ./...
```

### Code Example 19: Short Tests via testing.Short()

```go
func TestHeavyComputation(t *testing.T) {
    if testing.Short() {
        t.Skip("skipping heavy computation test in short mode")
    }

    // Time-consuming test
    result := HeavyComputation(largeDataset)
    assert.Equal(t, expectedResult, result)
}
```

```bash
# Short mode (for fast CI feedback)
go test -short ./...

# Full tests
go test ./...
```

### Code Example 20: Docker-based Testing with testcontainers

```go
package store_test

import (
    "context"
    "testing"

    "github.com/testcontainers/testcontainers-go"
    "github.com/testcontainers/testcontainers-go/modules/postgres"
    "github.com/testcontainers/testcontainers-go/wait"
)

func TestWithPostgresContainer(t *testing.T) {
    if testing.Short() {
        t.Skip("skipping container test in short mode")
    }

    ctx := context.Background()

    // Start a PostgreSQL container
    container, err := postgres.RunContainer(ctx,
        testcontainers.WithImage("postgres:16-alpine"),
        postgres.WithDatabase("testdb"),
        postgres.WithUsername("test"),
        postgres.WithPassword("test"),
        testcontainers.WithWaitStrategy(
            wait.ForLog("database system is ready to accept connections").
                WithOccurrence(2),
        ),
    )
    require.NoError(t, err)
    defer container.Terminate(ctx)

    // Get the connection string
    connStr, err := container.ConnectionString(ctx, "sslmode=disable")
    require.NoError(t, err)

    // Connect to DB and run tests
    db, err := sql.Open("postgres", connStr)
    require.NoError(t, err)
    defer db.Close()

    // Run migrations
    runMigrations(t, db)

    // Run tests
    store := NewUserStore(db)
    user, err := store.Create(&User{Name: "Alice", Email: "alice@test.com"})
    require.NoError(t, err)
    assert.NotEmpty(t, user.ID)
}
```

---

## 7. Test Coverage and Benchmarks

### Coverage

```bash
# Run tests with coverage
go test -cover ./...

# Generate HTML report
go test -coverprofile=coverage.out ./...
go tool cover -html=coverage.out -o coverage.html

# Per-function coverage
go tool cover -func=coverage.out

# Coverage for specific packages
go test -coverprofile=coverage.out -coverpkg=./internal/... ./...

# Coverage threshold check (used in CI)
COVERAGE=$(go test -cover ./... | grep -oP '\d+\.\d+%' | head -1 | tr -d '%')
if (( $(echo "$COVERAGE < 70" | bc -l) )); then
    echo "coverage below 70%: $COVERAGE%"
    exit 1
fi
```

### Code Example 21: Benchmark Tests

```go
func BenchmarkJSONMarshal(b *testing.B) {
    user := User{ID: "1", Name: "Alice", Email: "alice@example.com"}

    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        json.Marshal(user)
    }
}

func BenchmarkJSONMarshalParallel(b *testing.B) {
    user := User{ID: "1", Name: "Alice", Email: "alice@example.com"}

    b.RunParallel(func(pb *testing.PB) {
        for pb.Next() {
            json.Marshal(user)
        }
    })
}

// Measure memory allocations
func BenchmarkStringConcat(b *testing.B) {
    b.Run("Plus operator", func(b *testing.B) {
        b.ReportAllocs()
        for i := 0; i < b.N; i++ {
            s := ""
            for j := 0; j < 100; j++ {
                s += "a"
            }
        }
    })

    b.Run("strings.Builder", func(b *testing.B) {
        b.ReportAllocs()
        for i := 0; i < b.N; i++ {
            var sb strings.Builder
            for j := 0; j < 100; j++ {
                sb.WriteString("a")
            }
            _ = sb.String()
        }
    })

    b.Run("bytes.Buffer", func(b *testing.B) {
        b.ReportAllocs()
        for i := 0; i < b.N; i++ {
            var buf bytes.Buffer
            for j := 0; j < 100; j++ {
                buf.WriteString("a")
            }
            _ = buf.String()
        }
    })
}
```

```bash
# Run benchmarks
go test -bench=BenchmarkJSON -benchmem ./...

# Example output:
# BenchmarkJSONMarshal-8       5000000    320 ns/op    128 B/op    2 allocs/op
# BenchmarkJSONMarshalParallel-8  20000000  85 ns/op   128 B/op    2 allocs/op

# Benchmark comparison (benchstat)
go test -bench=. -count=10 > old.txt
# After code changes
go test -bench=. -count=10 > new.txt
benchstat old.txt new.txt
```

### Code Example 22: Varying Input Size with Sub-Benchmarks

```go
func BenchmarkSort(b *testing.B) {
    sizes := []int{10, 100, 1000, 10000, 100000}

    for _, size := range sizes {
        b.Run(fmt.Sprintf("size=%d", size), func(b *testing.B) {
            // Prepare test data (outside measurement)
            data := make([]int, size)
            for i := range data {
                data[i] = rand.Intn(size * 10)
            }

            b.ResetTimer()
            for i := 0; i < b.N; i++ {
                // Copy data and sort
                cp := make([]int, len(data))
                copy(cp, data)
                sort.Ints(cp)
            }
        })
    }
}
```

---

## 8. Comparison of Testing Techniques

| Technique | Speed | External dependencies | Reliability | Maintenance cost | Applicable scenarios |
|-----------|-------|----------------------|-------------|------------------|----------------------|
| Unit test (table-driven) | Very fast | None | High | Low | Functions/methods |
| httptest.Recorder | Fast | None | High | Low | HTTP handlers |
| httptest.Server | Fast | None | Medium-High | Medium | HTTP clients |
| testify/mock | Fast | None | Medium | Medium | Components with many dependencies |
| testify/suite | Fast | Optional | High | Medium | Test series needing common setup |
| Golden file | Fast | None | High | Low | Template output, serialization |
| Integration test (with DB) | Slow | Yes | Very high | High | End-to-end verification |
| testcontainers | Slow | Docker | Very high | High | Verification in near-production environments |

---

## 9. Comparison of Test Doubles

```
+--------------------------------------------------------------+
|                    Types of test doubles                       |
+--------------------------------------------------------------+
|                                                              |
|  +----------+   +--------+   +------+   +------+   +------+ |
|  | Dummy    |   | Stub   |   | Spy  |   | Mock |   | Fake | |
|  | Not used |   | Returns|   | Record|  | Verify|  | Simple| |
|  | Fills    |   | fixed  |   | calls |  | calls |  | impl. | |
|  | args     |   | values |   |       |  |       |  |       | |
|  +----------+   +--------+   +------+   +------+   +------+ |
|                                                              |
|  Complexity:  Low ←←←←←←←←←←←←←←←←←←←→→→→→→→→→→→→→→→→→ High|
+--------------------------------------------------------------+
```

### Code Example 23: Implementation of Each Test Double

```go
// Interface under test
type EmailSender interface {
    Send(to, subject, body string) error
}

// Dummy: used solely to fill arguments
type DummyEmailSender struct{}
func (d DummyEmailSender) Send(to, subject, body string) error { return nil }

// Stub: returns a fixed value
type StubEmailSender struct {
    Err error // set the error to return
}
func (s StubEmailSender) Send(to, subject, body string) error { return s.Err }

// Spy: records calls
type SpyEmailSender struct {
    Calls []struct {
        To, Subject, Body string
    }
}
func (s *SpyEmailSender) Send(to, subject, body string) error {
    s.Calls = append(s.Calls, struct{ To, Subject, Body string }{to, subject, body})
    return nil
}

// Fake: simple implementation (stores in memory instead of actually sending email)
type FakeEmailSender struct {
    mu     sync.Mutex
    Inbox  map[string][]Message
}

type Message struct {
    Subject string
    Body    string
}

func NewFakeEmailSender() *FakeEmailSender {
    return &FakeEmailSender{Inbox: make(map[string][]Message)}
}

func (f *FakeEmailSender) Send(to, subject, body string) error {
    f.mu.Lock()
    defer f.mu.Unlock()
    f.Inbox[to] = append(f.Inbox[to], Message{Subject: subject, Body: body})
    return nil
}

// Choosing among them in tests
func TestNotificationService(t *testing.T) {
    t.Run("verify send content with Spy", func(t *testing.T) {
        spy := &SpyEmailSender{}
        service := NewNotificationService(spy)

        service.NotifyUser("alice@example.com", "Welcome!")

        require.Len(t, spy.Calls, 1)
        assert.Equal(t, "alice@example.com", spy.Calls[0].To)
        assert.Contains(t, spy.Calls[0].Subject, "Welcome")
    })

    t.Run("verify error case with Stub", func(t *testing.T) {
        stub := StubEmailSender{Err: errors.New("SMTP error")}
        service := NewNotificationService(stub)

        err := service.NotifyUser("alice@example.com", "Welcome!")
        assert.Error(t, err)
    })

    t.Run("verify multiple email sends with Fake", func(t *testing.T) {
        fake := NewFakeEmailSender()
        service := NewNotificationService(fake)

        service.NotifyUser("alice@example.com", "Welcome!")
        service.NotifyUser("alice@example.com", "Update!")

        assert.Len(t, fake.Inbox["alice@example.com"], 2)
    })
}
```

---

## 10. Optimizing Test Execution

### Improving Test Execution Speed

```go
// Package-level setup/teardown with TestMain
func TestMain(m *testing.M) {
    // Setup before all tests
    db := setupDatabase()
    seedTestData(db)

    // Run tests
    code := m.Run()

    // Cleanup after all tests
    db.Close()
    os.Exit(code)
}

// Parallelization via t.Parallel()
func TestParallelOperations(t *testing.T) {
    // t.Setenv() cannot be used in parallel tests (Go 1.17+)
    // Instead, design to avoid shared resources

    tests := []struct {
        name string
        fn   func(t *testing.T)
    }{
        {"test 1", func(t *testing.T) { /* ... */ }},
        {"test 2", func(t *testing.T) { /* ... */ }},
        {"test 3", func(t *testing.T) { /* ... */ }},
    }

    for _, tt := range tests {
        tt := tt
        t.Run(tt.name, func(t *testing.T) {
            t.Parallel()
            tt.fn(t)
        })
    }
}
```

### Test Configuration in a CI Environment

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: testdb
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with:
          go-version: '1.22'

      - name: Unit tests
        run: go test -race -cover -short ./...

      - name: Integration tests
        env:
          TEST_DATABASE_URL: postgres://test:test@localhost:5432/testdb?sslmode=disable
        run: go test -race -tags=integration ./...

      - name: Coverage report
        run: |
          go test -coverprofile=coverage.out ./...
          go tool cover -func=coverage.out
```

---

## 11. Anti-Patterns

### Anti-Pattern 1: Omitting Test Case Names

```go
// BAD: cannot tell which case failed
func TestParse(t *testing.T) {
    tests := []struct {
        input string
        want  int
    }{
        {"42", 42},
        {"abc", 0},
    }
    for _, tt := range tests {
        // No t.Run → hard to identify which case failed
        got, _ := Parse(tt.input)
        if got != tt.want {
            t.Errorf("Parse(%q) = %d, want %d", tt.input, got, tt.want)
        }
    }
}

// GOOD: name each case with t.Run
func TestParse(t *testing.T) {
    tests := []struct {
        name  string
        input string
        want  int
    }{
        {"numeric string", "42", 42},
        {"non-numeric", "abc", 0},
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, _ := Parse(tt.input)
            assert.Equal(t, tt.want, got)
        })
    }
}
```

### Anti-Pattern 2: Relying on sleep in Tests

```go
// BAD: time-dependent, leading to flaky tests
func TestAsyncProcess(t *testing.T) {
    go StartProcess()
    time.Sleep(2 * time.Second) // unstable depending on the environment
    assert.True(t, IsProcessDone())
}

// GOOD: synchronize with channels or contexts
func TestAsyncProcess(t *testing.T) {
    done := make(chan struct{})
    go func() {
        StartProcess()
        close(done)
    }()

    select {
    case <-done:
        assert.True(t, IsProcessDone())
    case <-time.After(5 * time.Second):
        t.Fatal("timeout: process did not complete")
    }
}
```

### Anti-Pattern 3: Dependencies Between Tests

```go
// BAD: depends on test execution order
var sharedState string

func TestStep1(t *testing.T) {
    sharedState = "initialized"
    // ...
}

func TestStep2(t *testing.T) {
    // Assumes sharedState is "initialized"
    // Fails unless TestStep1 runs first
    require.Equal(t, "initialized", sharedState)
}

// GOOD: each test can run independently
func TestStep1(t *testing.T) {
    state := setup()
    // ...
}

func TestStep2(t *testing.T) {
    state := setup() // Set up independently for each test
    require.Equal(t, "initialized", state)
}
```

### Anti-Pattern 4: Testing Implementation Details

```go
// BAD: test tightly coupled to internal implementation
func TestUserService_Create(t *testing.T) {
    service := NewUserService(repo)
    service.Create("Alice", "alice@example.com")

    // Directly inspect internal cache state
    assert.Len(t, service.cache, 1)                    // accessing internal fields
    assert.Equal(t, "Alice", service.cache["alice"].Name) // depends on implementation details
}

// GOOD: test the behavior of the public API
func TestUserService_Create(t *testing.T) {
    service := NewUserService(repo)
    user, err := service.Create("Alice", "alice@example.com")
    require.NoError(t, err)

    // Verify via the public API
    found, err := service.FindByEmail("alice@example.com")
    require.NoError(t, err)
    assert.Equal(t, user.ID, found.ID)
}
```

---

## FAQ

### Q1. What is the difference between `testing.T`'s `Error` and `Fatal`?

`t.Error` / `t.Errorf` marks the test as failed but continues execution. `t.Fatal` / `t.Fatalf` aborts the test immediately. Use `Fatal` when subsequent assertions depend on a prerequisite, and `Error` for independent checks. In testify, `assert` corresponds to `Error` and `require` corresponds to `Fatal`.

### Q2. Do test helper functions need `t.Helper()`?

Yes. Calling `t.Helper()` causes the error output on test failure to display the caller's line number rather than the helper function's. It dramatically improves debugging efficiency, so always add it to test utility functions.

```go
func assertJSON(t *testing.T, body []byte, key, want string) {
    t.Helper() // Without this, this function's line number is displayed
    var m map[string]string
    require.NoError(t, json.Unmarshal(body, &m))
    assert.Equal(t, want, m[key])
}
```

### Q3. What percentage of test coverage should you aim for?

In general, 70-80% is a realistic target. Aiming for 100% skyrockets maintenance costs and leads to writing tests even for trivial code. What matters is achieving high coverage on critical paths (business logic, error handling).

### Q4. What is the difference between t.Cleanup() and defer?

`t.Cleanup()` was added in Go 1.14 and registers a cleanup function to run at the end of the test function (including at the end of subtests). The difference from `defer` is that it can register resource cleanup from within test helper functions. A `defer` inside a helper function executes when the helper returns, whereas `t.Cleanup()` executes when the entire test ends.

```go
// defer executes when the helper function returns (not the intent)
func setupDB(t *testing.T) *sql.DB {
    db, _ := sql.Open("sqlite3", ":memory:")
    defer db.Close() // BAD: DB closes when this function exits
    return db
}

// t.Cleanup executes at the end of the test (correct)
func setupDB(t *testing.T) *sql.DB {
    t.Helper()
    db, _ := sql.Open("sqlite3", ":memory:")
    t.Cleanup(func() { db.Close() }) // GOOD: close at test end
    return db
}
```

### Q5. How do you handle flaky tests (unstable tests)?

Main causes of flaky tests and their mitigations:
1. **Time dependence** → Control time with the `FakeClock` pattern
2. **Concurrency races** → Detect with the `-race` flag; use synchronization primitives
3. **Dependency on external services** → Isolate with mocks/test containers
4. **Shared state between tests** → Make each test independent (easier to spot with `t.Parallel()`)
5. **Random inputs** → Fix the seed value and log output (make it reproducible)

### Q6. How do you disable the go test cache?

`go test` caches test results. To disable the cache, use one of the following:

```bash
# -count=1 disables the cache (the most common approach)
go test -count=1 ./...

# Clear the entire cache
go clean -testcache

# Can also be controlled via an environment variable
GOFLAGS="-count=1" go test ./...
```

---

## Summary

| Concept | Key point |
|---------|-----------|
| table-driven tests | Define test cases as a slice and loop them with `t.Run` |
| t.Parallel() | Speed up with parallel execution of subtests |
| testify/assert | Flexible assertions that continue on failure |
| testify/require | Immediately-aborting assertions for verifying prerequisites |
| testify/mock | Interface-based mock generation |
| testify/suite | Share setup/teardown |
| httptest.NewRecorder | Unit testing handlers |
| httptest.NewServer | Mocking external API calls |
| httptest.NewTLSServer | Testing TLS communication |
| Golden files | Manage expected output as files |
| Build tags | Separate integration tests with the integration tag |
| testcontainers | Production-like environment testing via Docker containers |
| t.Cleanup() | Register resource cleanup at test end |
| t.Helper() | Correctly display the error line number for helper functions |
| Coverage | Measure with `go test -cover`; 70-80% is a realistic target |
| Benchmarks | Measure performance with the `Benchmark` prefix |

---

## Recommended Next Guides

- **03-tools/00-cli-development.md** — CLI development: cobra, flag, promptui
- **03-tools/02-profiling.md** — Profiling: pprof, trace
- **03-tools/04-best-practices.md** — Best practices: Effective Go

---

## References

1. **Go official — Testing package** https://pkg.go.dev/testing
2. **stretchr/testify GitHub** https://github.com/stretchr/testify
3. **Go Blog — Using Subtests and Sub-benchmarks** https://go.dev/blog/subtests
4. **Dave Cheney — Writing Table Driven Tests in Go** https://dave.cheney.net/2019/05/07/prefer-table-driven-tests
5. **testcontainers-go GitHub** https://github.com/testcontainers/testcontainers-go
6. **Go official — Code Coverage for Go Integration Tests** https://go.dev/blog/integration-test-coverage



===== SOURCE: 02-programming/go-practical-guide/docs/03-tools/00-cli-development.md =====

# Go CLI Development Guide

> Building production-grade command-line tools in Go with cobra, flag, and promptui

## What You Will Learn in This Chapter

1. Designing and implementing CLI applications with subcommands using the **cobra** framework
2. Differences between the standard **flag** package and **pflag**, and best practices for flag management
3. How to build interactive CLIs (selection menus, input prompts) with **promptui**
4. Configuration management with **viper** (integrating files, environment variables, and flags)
5. Implementing **shell completion** and **automatic documentation generation**


## Prerequisites

Before reading this guide, your understanding will be deeper if you have:

- Basic programming knowledge
- Understanding of related fundamental concepts

---

## 1. Overview of Go CLIs

### CLI Framework Selection Flow

```
Want to build a CLI tool
        |
        +-- Simple (a few flags)
        |       |
        |       v
        |   Standard flag package
        |
        +-- Has subcommands
        |       |
        |       v
        |   cobra (industry standard)
        |
        +-- Requires interactive UI
        |       |
        |       v
        |   promptui / survey
        |
        +-- Ultra-lightweight (no dependencies)
                |
                v
            Manual parsing / standard flag + manually implemented subcommands
```

### CLI Architecture

```
+------------------------------------------------------+
|                     main.go                          |
|  func main() { cmd.Execute() }                       |
+------------------------------------------------------+
        |
        v
+------------------------------------------------------+
|                   cmd/root.go                        |
|  rootCmd: app name, version, global flags            |
+------------------------------------------------------+
        |
        +-------> cmd/serve.go   (serve subcommand)
        |
        +-------> cmd/migrate.go (migrate subcommand)
        |
        +-------> cmd/config.go  (config subcommand)
        |              |
        |              +-> cmd/config_set.go (config set)
        |              +-> cmd/config_get.go (config get)
        |              +-> cmd/config_list.go (config list)
        |
        +-------> cmd/version.go (version subcommand)
        |
        +-------> cmd/completion.go (shell completion)
```

### Project Directory Structure

```
myapp/
├── main.go                    # Entry point (minimal)
├── cmd/                       # Command definitions
│   ├── root.go               # Root command
│   ├── serve.go              # serve subcommand
│   ├── migrate.go            # migrate subcommand
│   ├── config.go             # config subcommand group
│   ├── version.go            # version subcommand
│   └── completion.go         # Shell completion command
├── internal/                  # Internal packages
│   ├── config/               # Configuration management
│   ├── server/               # Server logic
│   └── migration/            # Migration logic
├── pkg/                       # Externally exposed packages (optional)
├── .goreleaser.yaml           # GoReleaser configuration
├── Makefile                   # Build and test commands
└── go.mod
```

---

## 2. Standard flag Package

### Code Example 1: Basics of the flag Package

```go
package main

import (
    "flag"
    "fmt"
    "os"
)

func main() {
    // Flag definitions
    host := flag.String("host", "localhost", "Server host name")
    port := flag.Int("port", 8080, "Server port number")
    verbose := flag.Bool("verbose", false, "Enable verbose output")

    // Custom Usage
    flag.Usage = func() {
        fmt.Fprintf(os.Stderr, "Usage: %s [options]\n\nOptions:\n", os.Args[0])
        flag.PrintDefaults()
    }

    flag.Parse()

    // Remaining arguments (non-flags)
    args := flag.Args()

    if *verbose {
        fmt.Printf("Host: %s, Port: %d\n", *host, *port)
        fmt.Printf("Args: %v\n", args)
    }

    fmt.Printf("Starting server: %s:%d\n", *host, *port)
}
```

```bash
$ myapp -host 0.0.0.0 -port 3000 -verbose extra_arg
Host: 0.0.0.0, Port: 3000
Args: [extra_arg]
Starting server: 0.0.0.0:3000
```

### Code Example 2: Implementing Subcommands with FlagSet

```go
package main

import (
    "flag"
    "fmt"
    "os"
)

func main() {
    if len(os.Args) < 2 {
        fmt.Println("Usage: myapp <command> [options]")
        fmt.Println("Commands: serve, migrate, version")
        os.Exit(1)
    }

    // Define a FlagSet for each subcommand
    serveCmd := flag.NewFlagSet("serve", flag.ExitOnError)
    servePort := serveCmd.Int("port", 8080, "Port number")
    serveHost := serveCmd.String("host", "localhost", "Host name")

    migrateCmd := flag.NewFlagSet("migrate", flag.ExitOnError)
    migrateDir := migrateCmd.String("dir", "./migrations", "Migration directory")
    migrateDSN := migrateCmd.String("dsn", "", "Database connection string")

    switch os.Args[1] {
    case "serve":
        serveCmd.Parse(os.Args[2:])
        fmt.Printf("Starting server: %s:%d\n", *serveHost, *servePort)

    case "migrate":
        migrateCmd.Parse(os.Args[2:])
        if *migrateDSN == "" {
            fmt.Fprintln(os.Stderr, "Error: -dsn flag is required")
            migrateCmd.Usage()
            os.Exit(1)
        }
        fmt.Printf("Running migration: dir=%s, dsn=%s\n", *migrateDir, *migrateDSN)

    case "version":
        fmt.Println("myapp v1.0.0")

    default:
        fmt.Fprintf(os.Stderr, "Unknown command: %s\n", os.Args[1])
        os.Exit(1)
    }
}
```

### Code Example 3: Custom Flag Types

```go
// StringSlice is a flag that accepts comma-separated values or multiple specifications
type StringSlice []string

func (s *StringSlice) String() string {
    return fmt.Sprintf("%v", *s)
}

func (s *StringSlice) Set(value string) error {
    *s = append(*s, value)
    return nil
}

// Custom flag for Duration type
type DurationFlag struct {
    value time.Duration
}

func (d *DurationFlag) String() string {
    return d.value.String()
}

func (d *DurationFlag) Set(s string) error {
    dur, err := time.ParseDuration(s)
    if err != nil {
        return fmt.Errorf("invalid Duration: %s", s)
    }
    d.value = dur
    return nil
}

func main() {
    var tags StringSlice
    flag.Var(&tags, "tag", "Tags (can be specified multiple times)")

    var timeout DurationFlag
    timeout.value = 30 * time.Second
    flag.Var(&timeout, "timeout", "Timeout (e.g., 30s, 5m)")

    flag.Parse()

    fmt.Printf("Tags: %v\n", tags)
    fmt.Printf("Timeout: %v\n", timeout.value)
}
```

```bash
$ myapp -tag web -tag api -tag v2 -timeout 5m
Tags: [web api v2]
Timeout: 5m0s
```

---

## 3. The cobra Framework

### Installation

```bash
go get github.com/spf13/cobra@latest
go install github.com/spf13/cobra-cli@latest
```

### Code Example 4: cobra Root Command

```go
// cmd/root.go
package cmd

import (
    "fmt"
    "os"

    "github.com/spf13/cobra"
    "github.com/spf13/viper"
)

var (
    cfgFile string
    verbose bool
)

var rootCmd = &cobra.Command{
    Use:     "mytool",
    Short:   "My awesome CLI tool",
    Long:    `mytool is a multi-functional CLI tool built with Go.`,
    Version: "1.0.0",
}

func Execute() {
    if err := rootCmd.Execute(); err != nil {
        fmt.Fprintln(os.Stderr, err)
        os.Exit(1)
    }
}

func init() {
    cobra.OnInitialize(initConfig)

    // Persistent Flags: usable across all subcommands
    rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "",
        "Config file path (default: $HOME/.mytool.yaml)")
    rootCmd.PersistentFlags().BoolVarP(&verbose, "verbose", "v", false,
        "Verbose output")

    // Integrate with viper
    viper.BindPFlag("verbose", rootCmd.PersistentFlags().Lookup("verbose"))
}

func initConfig() {
    if cfgFile != "" {
        viper.SetConfigFile(cfgFile)
    } else {
        home, _ := os.UserHomeDir()
        viper.AddConfigPath(home)
        viper.AddConfigPath(".")
        viper.SetConfigName(".mytool")
        viper.SetConfigType("yaml")
    }
    viper.SetEnvPrefix("MYTOOL")
    viper.AutomaticEnv()
    viper.ReadInConfig()
}
```

### Code Example 5: Adding Subcommands

```go
// cmd/serve.go
package cmd

import (
    "fmt"
    "net/http"

    "github.com/spf13/cobra"
)

var (
    servePort int
    serveHost string
)

var serveCmd = &cobra.Command{
    Use:   "serve",
    Short: "Start the HTTP server",
    Long:  `Starts the HTTP server on the specified host and port.`,
    Example: `  mytool serve
  mytool serve --port 3000
  mytool serve --host 0.0.0.0 --port 8080`,
    RunE: func(cmd *cobra.Command, args []string) error {
        addr := fmt.Sprintf("%s:%d", serveHost, servePort)
        fmt.Printf("Starting server: http://%s\n", addr)

        mux := http.NewServeMux()
        mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
            fmt.Fprintln(w, "Hello from mytool!")
        })
        return http.ListenAndServe(addr, mux)
    },
}

func init() {
    rootCmd.AddCommand(serveCmd)

    // Local Flags: specific to this command
    serveCmd.Flags().IntVarP(&servePort, "port", "p", 8080, "Port number")
    serveCmd.Flags().StringVar(&serveHost, "host", "localhost", "Host name")
}
```

### Code Example 6: Nested Subcommands

```go
// cmd/config.go
package cmd

import (
    "fmt"

    "github.com/spf13/cobra"
    "github.com/spf13/viper"
)

var configCmd = &cobra.Command{
    Use:   "config",
    Short: "Manage configuration",
}

var configSetCmd = &cobra.Command{
    Use:   "set [key] [value]",
    Short: "Change a config value",
    Args:  cobra.ExactArgs(2),
    RunE: func(cmd *cobra.Command, args []string) error {
        key, value := args[0], args[1]
        viper.Set(key, value)
        return viper.WriteConfig()
    },
}

var configGetCmd = &cobra.Command{
    Use:   "get [key]",
    Short: "Display a config value",
    Args:  cobra.ExactArgs(1),
    Run: func(cmd *cobra.Command, args []string) {
        val := viper.GetString(args[0])
        if val == "" {
            fmt.Printf("Key '%s' is not set\n", args[0])
            return
        }
        fmt.Println(val)
    },
}

var configListCmd = &cobra.Command{
    Use:   "list",
    Short: "List all configuration settings",
    Run: func(cmd *cobra.Command, args []string) {
        for key, val := range viper.AllSettings() {
            fmt.Printf("%s = %v\n", key, val)
        }
    },
}

var configInitCmd = &cobra.Command{
    Use:   "init",
    Short: "Initialize the config file",
    RunE: func(cmd *cobra.Command, args []string) error {
        // Set default values
        viper.SetDefault("server.host", "localhost")
        viper.SetDefault("server.port", 8080)
        viper.SetDefault("database.driver", "postgres")
        viper.SetDefault("log.level", "info")
        viper.SetDefault("log.format", "json")

        if err := viper.SafeWriteConfig(); err != nil {
            return fmt.Errorf("failed to create config file: %w", err)
        }
        fmt.Println("Config file created")
        return nil
    },
}

func init() {
    rootCmd.AddCommand(configCmd)
    configCmd.AddCommand(configSetCmd)
    configCmd.AddCommand(configGetCmd)
    configCmd.AddCommand(configListCmd)
    configCmd.AddCommand(configInitCmd)
}
```

### Code Example 7: Argument Validation

```go
// List of cobra's argument validation functions
var exampleCmds = []*cobra.Command{
    // No arguments
    {
        Use:  "status",
        Args: cobra.NoArgs,
        Run:  func(cmd *cobra.Command, args []string) {},
    },
    // Exactly N
    {
        Use:  "rename [old] [new]",
        Args: cobra.ExactArgs(2),
        Run:  func(cmd *cobra.Command, args []string) {},
    },
    // At least N
    {
        Use:  "add [file...]",
        Args: cobra.MinimumNArgs(1),
        Run:  func(cmd *cobra.Command, args []string) {},
    },
    // At most N
    {
        Use:  "show [name]",
        Args: cobra.MaximumNArgs(1),
        Run:  func(cmd *cobra.Command, args []string) {},
    },
    // Range
    {
        Use:  "between [args...]",
        Args: cobra.RangeArgs(1, 3),
        Run:  func(cmd *cobra.Command, args []string) {},
    },
}

// Custom validation
var deployCmd = &cobra.Command{
    Use:   "deploy [environment]",
    Short: "Deploy to the specified environment",
    Args: func(cmd *cobra.Command, args []string) error {
        if len(args) != 1 {
            return fmt.Errorf("please specify exactly one environment name")
        }
        validEnvs := map[string]bool{
            "development": true,
            "staging":     true,
            "production":  true,
        }
        if !validEnvs[args[0]] {
            return fmt.Errorf("invalid environment name: %s (specify one of development, staging, production)", args[0])
        }
        return nil
    },
    RunE: func(cmd *cobra.Command, args []string) error {
        env := args[0]
        fmt.Printf("Deploying to %s environment\n", env)
        return nil
    },
}

// ValidArgsFunction: dynamic completion candidates
var connectCmd = &cobra.Command{
    Use:   "connect [server]",
    Short: "Connect to a server",
    Args:  cobra.ExactArgs(1),
    ValidArgsFunction: func(cmd *cobra.Command, args []string, toComplete string) ([]string, cobra.ShellCompDirective) {
        if len(args) != 0 {
            return nil, cobra.ShellCompDirectiveNoFileComp
        }
        // Retrieve the server list dynamically
        servers := []string{"web-01", "web-02", "db-01", "cache-01"}
        return servers, cobra.ShellCompDirectiveNoFileComp
    },
    RunE: func(cmd *cobra.Command, args []string) error {
        fmt.Printf("Connecting to %s...\n", args[0])
        return nil
    },
}
```

---

## 4. cobra Flag System

### Persistent Flags vs Local Flags Comparison

| Item | Persistent Flags | Local Flags |
|------|-----------------|-------------|
| Scope | Defining command + all child commands | Defining command only |
| Definition method | `PersistentFlags()` | `Flags()` |
| Use case | Common settings such as `--verbose`, `--config` | Command-specific options such as `--port`, `--output` |
| viper integration | Can be persisted via `BindPFlag` | Supported in the same way |
| Inheritance | Automatically inherited by child commands | Not inherited |

### flag vs pflag vs cobra Comparison

| Feature | Standard flag | pflag | cobra |
|---------|--------------|-------|-------|
| POSIX style `--flag` | `-flag` only | Supported | Supported (pflag built-in) |
| Short form `-v` | Not supported | Supported | Supported |
| Subcommands | Not supported | Not supported | Supported |
| Automatic help | Basic | Basic | Rich |
| Shell completion | Not supported | Not supported | bash/zsh/fish/powershell |
| Argument validation | Manual | Manual | Declaratively via `Args` |
| Config file integration | Manual | Manual | Integrated with viper |

### Code Example 8: Advanced Flag Usage

```go
// cmd/serve.go
func init() {
    rootCmd.AddCommand(serveCmd)

    // Basic flag definitions
    serveCmd.Flags().IntVarP(&port, "port", "p", 8080, "Port number")
    serveCmd.Flags().StringVar(&host, "host", "localhost", "Host name")

    // Required flag
    serveCmd.Flags().StringVar(&certFile, "cert", "", "TLS certificate file")
    serveCmd.MarkFlagRequired("cert")

    // Enable file path completion
    serveCmd.MarkFlagFilename("cert", "pem", "crt")

    // Mutually exclusive flags
    serveCmd.Flags().BoolVar(&useTLS, "tls", false, "Enable TLS")
    serveCmd.Flags().BoolVar(&useHTTP2, "h2c", false, "Use HTTP/2 Cleartext")
    serveCmd.MarkFlagsMutuallyExclusive("tls", "h2c")

    // Group (if one is specified, both are required)
    serveCmd.Flags().StringVar(&certFile, "cert-file", "", "Certificate file")
    serveCmd.Flags().StringVar(&keyFile, "key-file", "", "Private key file")
    serveCmd.MarkFlagsRequiredTogether("cert-file", "key-file")

    // Integration with environment variables
    viper.BindPFlag("server.port", serveCmd.Flags().Lookup("port"))
    viper.BindPFlag("server.host", serveCmd.Flags().Lookup("host"))

    // Take default values from environment variables
    viper.BindEnv("server.port", "MYAPP_PORT")
    viper.BindEnv("server.host", "MYAPP_HOST")
}
```

### Code Example 9: Custom Flag Validation

```go
// Port number validation
var serveCmd = &cobra.Command{
    Use: "serve",
    PreRunE: func(cmd *cobra.Command, args []string) error {
        port, _ := cmd.Flags().GetInt("port")
        if port < 1 || port > 65535 {
            return fmt.Errorf("port number must be in the range 1-65535: %d", port)
        }
        if port < 1024 {
            fmt.Fprintf(os.Stderr, "Warning: port %d is a privileged port (root privileges required)\n", port)
        }
        return nil
    },
    RunE: func(cmd *cobra.Command, args []string) error {
        // Main logic
        return nil
    },
}

// Enum-style flag
type LogLevel string

const (
    LogDebug LogLevel = "debug"
    LogInfo  LogLevel = "info"
    LogWarn  LogLevel = "warn"
    LogError LogLevel = "error"
)

func (l *LogLevel) String() string { return string(*l) }
func (l *LogLevel) Set(v string) error {
    switch v {
    case "debug", "info", "warn", "error":
        *l = LogLevel(v)
        return nil
    default:
        return fmt.Errorf("invalid log level: %s (must be one of debug, info, warn, error)", v)
    }
}
func (l *LogLevel) Type() string { return "LogLevel" }

var logLevel LogLevel = LogInfo

func init() {
    rootCmd.PersistentFlags().Var(&logLevel, "log-level", "Log level (debug|info|warn|error)")
    rootCmd.RegisterFlagCompletionFunc("log-level", func(cmd *cobra.Command, args []string, toComplete string) ([]string, cobra.ShellCompDirective) {
        return []string{"debug", "info", "warn", "error"}, cobra.ShellCompDirectiveNoFileComp
    })
}
```

---

## 5. Configuration Management with viper

### Configuration Priority

```
+----------------------------------------------------------+
|  viper configuration priority (higher is stronger)       |
+----------------------------------------------------------+
|                                                          |
|  1. Explicit settings via viper.Set()                    |
|     ↓                                                    |
|  2. Command-line flags (--port 3000)                     |
|     ↓                                                    |
|  3. Environment variables (MYAPP_PORT=3000)              |
|     ↓                                                    |
|  4. Config file (.mytool.yaml)                           |
|     ↓                                                    |
|  5. Key/value store (etcd, Consul)                       |
|     ↓                                                    |
|  6. Default values via viper.SetDefault()                |
+----------------------------------------------------------+
```

### Code Example 10: Comprehensive Configuration Management with viper

```go
package config

import (
    "fmt"
    "strings"
    "time"

    "github.com/spf13/viper"
)

// Config is the application's configuration struct
type Config struct {
    Server   ServerConfig   `mapstructure:"server"`
    Database DatabaseConfig `mapstructure:"database"`
    Log      LogConfig      `mapstructure:"log"`
    Auth     AuthConfig     `mapstructure:"auth"`
}

type ServerConfig struct {
    Host         string        `mapstructure:"host"`
    Port         int           `mapstructure:"port"`
    ReadTimeout  time.Duration `mapstructure:"read_timeout"`
    WriteTimeout time.Duration `mapstructure:"write_timeout"`
    MaxConns     int           `mapstructure:"max_connections"`
}

type DatabaseConfig struct {
    Driver   string `mapstructure:"driver"`
    Host     string `mapstructure:"host"`
    Port     int    `mapstructure:"port"`
    Name     string `mapstructure:"name"`
    User     string `mapstructure:"user"`
    Password string `mapstructure:"password"`
    SSLMode  string `mapstructure:"ssl_mode"`
}

type LogConfig struct {
    Level  string `mapstructure:"level"`
    Format string `mapstructure:"format"`
    Output string `mapstructure:"output"`
}

type AuthConfig struct {
    JWTSecret    string        `mapstructure:"jwt_secret"`
    TokenExpiry  time.Duration `mapstructure:"token_expiry"`
    RefreshToken bool          `mapstructure:"refresh_token"`
}

func Load() (*Config, error) {
    // Default values
    viper.SetDefault("server.host", "0.0.0.0")
    viper.SetDefault("server.port", 8080)
    viper.SetDefault("server.read_timeout", "30s")
    viper.SetDefault("server.write_timeout", "30s")
    viper.SetDefault("server.max_connections", 100)
    viper.SetDefault("database.driver", "postgres")
    viper.SetDefault("database.port", 5432)
    viper.SetDefault("database.ssl_mode", "disable")
    viper.SetDefault("log.level", "info")
    viper.SetDefault("log.format", "json")
    viper.SetDefault("log.output", "stdout")
    viper.SetDefault("auth.token_expiry", "24h")

    // Bind environment variables
    viper.SetEnvPrefix("MYAPP")
    viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
    viper.AutomaticEnv()

    // Read the config file
    if err := viper.ReadInConfig(); err != nil {
        if _, ok := err.(viper.ConfigFileNotFoundError); !ok {
            return nil, fmt.Errorf("failed to read config file: %w", err)
        }
        // Continue with default values if the config file is not found
    }

    var cfg Config
    if err := viper.Unmarshal(&cfg); err != nil {
        return nil, fmt.Errorf("failed to decode configuration: %w", err)
    }

    return &cfg, nil
}
```

### Example Config File

```yaml
# .mytool.yaml
server:
  host: "0.0.0.0"
  port: 8080
  read_timeout: "30s"
  write_timeout: "30s"
  max_connections: 200

database:
  driver: "postgres"
  host: "localhost"
  port: 5432
  name: "mydb"
  user: "admin"
  password: "${DB_PASSWORD}"  # Recommended to override via environment variable
  ssl_mode: "require"

log:
  level: "info"
  format: "json"
  output: "stdout"

auth:
  jwt_secret: ""  # Set via environment variable MYAPP_AUTH_JWT_SECRET
  token_expiry: "24h"
  refresh_token: true
```

### Code Example 11: Hot Reloading the Config File

```go
package config

import (
    "log"
    "sync"

    "github.com/fsnotify/fsnotify"
    "github.com/spf13/viper"
)

type ConfigWatcher struct {
    mu        sync.RWMutex
    config    *Config
    callbacks []func(*Config)
}

func NewConfigWatcher() *ConfigWatcher {
    return &ConfigWatcher{}
}

func (w *ConfigWatcher) Watch() {
    viper.OnConfigChange(func(e fsnotify.Event) {
        log.Printf("Config file changed: %s", e.Name)

        w.mu.Lock()
        defer w.mu.Unlock()

        var newCfg Config
        if err := viper.Unmarshal(&newCfg); err != nil {
            log.Printf("Failed to reload configuration: %v", err)
            return
        }

        w.config = &newCfg

        // Invoke callbacks
        for _, cb := range w.callbacks {
            cb(&newCfg)
        }
    })
    viper.WatchConfig()
}

func (w *ConfigWatcher) OnChange(cb func(*Config)) {
    w.mu.Lock()
    defer w.mu.Unlock()
    w.callbacks = append(w.callbacks, cb)
}

func (w *ConfigWatcher) Get() *Config {
    w.mu.RLock()
    defer w.mu.RUnlock()
    return w.config
}
```

---

## 6. Interactive CLIs with promptui

### Code Example 12: Selection Menus and Input Prompts

```go
package main

import (
    "fmt"
    "strings"

    "github.com/manifoldco/promptui"
)

func main() {
    // Selection prompt
    envSelect := promptui.Select{
        Label: "Select deployment environment",
        Items: []string{"development", "staging", "production"},
        Templates: &promptui.SelectTemplates{
            Active:   "▸ {{ . | cyan }}",
            Inactive: "  {{ . }}",
            Selected: "✓ {{ . | green }}",
        },
    }
    _, env, err := envSelect.Run()
    if err != nil {
        fmt.Printf("Selection canceled: %v\n", err)
        return
    }

    // Confirmation prompt for production
    if env == "production" {
        confirm := promptui.Prompt{
            Label:     "Confirm deployment to production (yes/no)",
            IsConfirm: true,
        }
        _, err := confirm.Run()
        if err != nil {
            fmt.Println("Deployment canceled")
            return
        }
    }

    // Input prompt (with validation)
    tagPrompt := promptui.Prompt{
        Label: "Release tag (e.g., v1.2.3)",
        Validate: func(input string) error {
            if !strings.HasPrefix(input, "v") {
                return fmt.Errorf("tag must start with 'v'")
            }
            return nil
        },
    }
    tag, err := tagPrompt.Run()
    if err != nil {
        return
    }

    fmt.Printf("Running deployment: env=%s, tag=%s\n", env, tag)
}
```

### Interactive Flow

```
$ mytool deploy

? Select deployment environment:
    development
  ▸ staging
    production

✓ staging

? Release tag (e.g., v1.2.3): v1.5.0

Running deployment: env=staging, tag=v1.5.0
```

### Code Example 13: Rich Selection Menu Using Structs

```go
type Server struct {
    Name   string
    Host   string
    Region string
    Status string
}

func selectServer() (*Server, error) {
    servers := []Server{
        {Name: "web-01", Host: "10.0.1.10", Region: "ap-northeast-1", Status: "running"},
        {Name: "web-02", Host: "10.0.1.11", Region: "ap-northeast-1", Status: "running"},
        {Name: "web-03", Host: "10.0.2.10", Region: "us-east-1", Status: "stopped"},
        {Name: "db-01", Host: "10.0.1.20", Region: "ap-northeast-1", Status: "running"},
    }

    templates := &promptui.SelectTemplates{
        Label:    "{{ . }}?",
        Active:   "▸ {{ .Name | cyan }} ({{ .Host }}) [{{ .Region }}] {{ if eq .Status \"running\" }}{{ .Status | green }}{{ else }}{{ .Status | red }}{{ end }}",
        Inactive: "  {{ .Name }} ({{ .Host }}) [{{ .Region }}] {{ .Status }}",
        Selected: "✓ {{ .Name | green }} ({{ .Host }})",
        Details: `
--------- Server Details ----------
{{ "Name:" | faint }}     {{ .Name }}
{{ "Host:" | faint }}     {{ .Host }}
{{ "Region:" | faint }}   {{ .Region }}
{{ "Status:" | faint }}   {{ .Status }}`,
    }

    // With search feature
    searcher := func(input string, index int) bool {
        s := servers[index]
        name := strings.Replace(strings.ToLower(s.Name), " ", "", -1)
        input = strings.Replace(strings.ToLower(input), " ", "", -1)
        return strings.Contains(name, input)
    }

    prompt := promptui.Select{
        Label:     "Select server to connect to",
        Items:     servers,
        Templates: templates,
        Size:      10,
        Searcher:  searcher,
    }

    i, _, err := prompt.Run()
    if err != nil {
        return nil, err
    }

    return &servers[i], nil
}
```

### Code Example 14: Password Input

```go
func promptPassword() (string, error) {
    prompt := promptui.Prompt{
        Label: "Password",
        Mask:  '*',
        Validate: func(input string) error {
            if len(input) < 8 {
                return fmt.Errorf("password must be at least 8 characters")
            }
            hasUpper := false
            hasDigit := false
            for _, c := range input {
                if c >= 'A' && c <= 'Z' {
                    hasUpper = true
                }
                if c >= '0' && c <= '9' {
                    hasDigit = true
                }
            }
            if !hasUpper {
                return fmt.Errorf("must include at least one uppercase letter")
            }
            if !hasDigit {
                return fmt.Errorf("must include at least one digit")
            }
            return nil
        },
    }

    return prompt.Run()
}
```

---

## 7. Shell Completion and Documentation Generation

### Code Example 15: Shell Completion Command

```go
// cmd/completion.go
package cmd

import (
    "os"

    "github.com/spf13/cobra"
)

var completionCmd = &cobra.Command{
    Use:   "completion [bash|zsh|fish|powershell]",
    Short: "Generate shell completion scripts",
    Long: `Generates a completion script for the specified shell.

Bash:
  $ source <(mytool completion bash)
  # To persist:
  $ mytool completion bash > /etc/bash_completion.d/mytool

Zsh:
  $ source <(mytool completion zsh)
  # To persist:
  $ mytool completion zsh > "${fpath[1]}/_mytool"

Fish:
  $ mytool completion fish | source
  # To persist:
  $ mytool completion fish > ~/.config/fish/completions/mytool.fish

PowerShell:
  PS> mytool completion powershell | Out-String | Invoke-Expression
`,
    DisableFlagsInUseLine: true,
    ValidArgs:             []string{"bash", "zsh", "fish", "powershell"},
    Args:                  cobra.ExactValidArgs(1),
    RunE: func(cmd *cobra.Command, args []string) error {
        switch args[0] {
        case "bash":
            return cmd.Root().GenBashCompletionV2(os.Stdout, true)
        case "zsh":
            return cmd.Root().GenZshCompletion(os.Stdout)
        case "fish":
            return cmd.Root().GenFishCompletion(os.Stdout, true)
        case "powershell":
            return cmd.Root().GenPowerShellCompletionWithDesc(os.Stdout)
        default:
            return fmt.Errorf("unsupported shell: %s", args[0])
        }
    },
}

func init() {
    rootCmd.AddCommand(completionCmd)
}
```

### Code Example 16: Automatic Markdown Documentation Generation

```go
// cmd/docs.go
package cmd

import (
    "github.com/spf13/cobra"
    "github.com/spf13/cobra/doc"
)

var docsCmd = &cobra.Command{
    Use:    "docs",
    Short:  "Generate documentation",
    Hidden: true, // Hidden from users
    RunE: func(cmd *cobra.Command, args []string) error {
        outputDir, _ := cmd.Flags().GetString("dir")

        // Generate Markdown documentation
        if err := doc.GenMarkdownTree(rootCmd, outputDir); err != nil {
            return fmt.Errorf("documentation generation failed: %w", err)
        }
        fmt.Printf("Documentation generated in %s\n", outputDir)
        return nil
    },
}

func init() {
    rootCmd.AddCommand(docsCmd)
    docsCmd.Flags().String("dir", "./docs", "Output directory")
}
```

---

## 8. CLI Design Best Practices

### Code Example 17: Error Handling and Exit Codes

```go
var rootCmd = &cobra.Command{
    // Use RunE and return errors
    RunE: func(cmd *cobra.Command, args []string) error {
        if err := doSomething(); err != nil {
            // Wrap user-facing messages before returning
            return fmt.Errorf("operation failed: %w", err)
        }
        return nil
    },
    // SilenceUsage: don't print Usage on error
    SilenceUsage: true,
    // SilenceErrors: suppress cobra's default error display
    SilenceErrors: true,
}

func Execute() {
    if err := rootCmd.Execute(); err != nil {
        // Print error to stderr
        fmt.Fprintf(os.Stderr, "Error: %v\n", err)

        // Exit code based on error type
        var exitErr *ExitError
        if errors.As(err, &exitErr) {
            os.Exit(exitErr.Code)
        }
        os.Exit(1)
    }
}

// Custom exit code
type ExitError struct {
    Code    int
    Message string
}

func (e *ExitError) Error() string {
    return e.Message
}
```

### Code Example 18: Testable CLI Design

```go
// main.go — minimal entry point
package main

import (
    "os"

    "myapp/cmd"
)

func main() {
    cmd.Execute()
}

// cmd/root.go — testable structure
package cmd

import (
    "io"
    "os"
)

// App groups the CLI application's dependencies
type App struct {
    Stdout io.Writer
    Stderr io.Writer
    Stdin  io.Reader
    Env    func(string) string
}

func DefaultApp() *App {
    return &App{
        Stdout: os.Stdout,
        Stderr: os.Stderr,
        Stdin:  os.Stdin,
        Env:    os.Getenv,
    }
}

// For testing
func TestApp(stdout, stderr io.Writer) *App {
    return &App{
        Stdout: stdout,
        Stderr: stderr,
        Stdin:  strings.NewReader(""),
        Env:    func(key string) string { return "" },
    }
}

// cmd/serve_test.go
func TestServeCommand(t *testing.T) {
    var stdout, stderr bytes.Buffer
    app := TestApp(&stdout, &stderr)

    cmd := newServeCmd(app)
    cmd.SetArgs([]string{"--port", "3000", "--host", "localhost"})

    err := cmd.Execute()
    require.NoError(t, err)
    assert.Contains(t, stdout.String(), "Starting server")
}
```

### Code Example 19: Progress Bars and Spinners

```go
package main

import (
    "fmt"
    "time"

    "github.com/schollz/progressbar/v3"
)

func downloadFiles(urls []string) error {
    bar := progressbar.NewOptions(len(urls),
        progressbar.OptionSetDescription("Downloading"),
        progressbar.OptionSetTheme(progressbar.Theme{
            Saucer:        "=",
            SaucerHead:    ">",
            SaucerPadding: " ",
            BarStart:      "[",
            BarEnd:        "]",
        }),
        progressbar.OptionShowCount(),
        progressbar.OptionShowIts(),
        progressbar.OptionSetWidth(40),
    )

    for _, url := range urls {
        // Download operation
        err := download(url)
        if err != nil {
            return fmt.Errorf("download %s: %w", url, err)
        }
        bar.Add(1)
    }

    fmt.Println("\nDone!")
    return nil
}

// Spinner implementation
func withSpinner(message string, fn func() error) error {
    done := make(chan struct{})
    spinner := []string{"⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"}

    go func() {
        i := 0
        for {
            select {
            case <-done:
                return
            default:
                fmt.Printf("\r%s %s", spinner[i%len(spinner)], message)
                i++
                time.Sleep(100 * time.Millisecond)
            }
        }
    }()

    err := fn()
    close(done)

    if err != nil {
        fmt.Printf("\r✗ %s: %v\n", message, err)
    } else {
        fmt.Printf("\r✓ %s\n", message)
    }
    return err
}
```

### Code Example 20: Switching Output Formats

```go
package output

import (
    "encoding/json"
    "fmt"
    "io"
    "text/tabwriter"

    "gopkg.in/yaml.v3"
)

type Format string

const (
    FormatTable Format = "table"
    FormatJSON  Format = "json"
    FormatYAML  Format = "yaml"
    FormatWide  Format = "wide"
)

type Printer struct {
    Format Format
    Writer io.Writer
}

func (p *Printer) PrintUsers(users []User) error {
    switch p.Format {
    case FormatJSON:
        enc := json.NewEncoder(p.Writer)
        enc.SetIndent("", "  ")
        return enc.Encode(users)

    case FormatYAML:
        return yaml.NewEncoder(p.Writer).Encode(users)

    case FormatWide:
        w := tabwriter.NewWriter(p.Writer, 0, 0, 2, ' ', 0)
        fmt.Fprintln(w, "ID\tNAME\tEMAIL\tCREATED\tLAST_LOGIN\tSTATUS")
        for _, u := range users {
            fmt.Fprintf(w, "%s\t%s\t%s\t%s\t%s\t%s\n",
                u.ID, u.Name, u.Email, u.CreatedAt, u.LastLogin, u.Status)
        }
        return w.Flush()

    default: // table
        w := tabwriter.NewWriter(p.Writer, 0, 0, 2, ' ', 0)
        fmt.Fprintln(w, "ID\tNAME\tEMAIL")
        for _, u := range users {
            fmt.Fprintf(w, "%s\t%s\t%s\n", u.ID, u.Name, u.Email)
        }
        return w.Flush()
    }
}

// Usage in CLI
var outputFormat string

var listCmd = &cobra.Command{
    Use:   "list",
    Short: "Display the user list",
    RunE: func(cmd *cobra.Command, args []string) error {
        users, err := fetchUsers()
        if err != nil {
            return err
        }

        printer := &output.Printer{
            Format: output.Format(outputFormat),
            Writer: cmd.OutOrStdout(),
        }
        return printer.PrintUsers(users)
    },
}

func init() {
    listCmd.Flags().StringVarP(&outputFormat, "output", "o", "table",
        "Output format (table|json|yaml|wide)")
    listCmd.RegisterFlagCompletionFunc("output", func(cmd *cobra.Command, args []string, toComplete string) ([]string, cobra.ShellCompDirective) {
        return []string{"table", "json", "yaml", "wide"}, cobra.ShellCompDirectiveNoFileComp
    })
}
```

---

## 9. Distributing CLI Binaries with GoReleaser

### Code Example 21: GoReleaser Configuration

```yaml
# .goreleaser.yaml
version: 2
project_name: mytool

before:
  hooks:
    - go mod tidy
    - go test ./...

builds:
  - main: ./main.go
    env:
      - CGO_ENABLED=0
    goos:
      - linux
      - darwin
      - windows
    goarch:
      - amd64
      - arm64
    ldflags:
      - -s -w
      - -X main.version={{.Version}}
      - -X main.commit={{.Commit}}
      - -X main.date={{.Date}}

archives:
  - format: tar.gz
    name_template: "{{ .ProjectName }}_{{ .Os }}_{{ .Arch }}"
    format_overrides:
      - goos: windows
        format: zip
    files:
      - README.md
      - LICENSE
      - completions/*

brews:
  - repository:
      owner: myorg
      name: homebrew-tap
    homepage: "https://github.com/myorg/mytool"
    description: "My awesome CLI tool"
    install: |
      bin.install "mytool"
      bash_completion.install "completions/mytool.bash" => "mytool"
      zsh_completion.install "completions/mytool.zsh" => "_mytool"

nfpms:
  - package_name: mytool
    homepage: "https://github.com/myorg/mytool"
    maintainer: "dev@example.com"
    description: "My awesome CLI tool"
    formats:
      - deb
      - rpm

checksum:
  name_template: 'checksums.txt'

changelog:
  sort: asc
  filters:
    exclude:
      - '^docs:'
      - '^test:'
```

---

## 10. Anti-patterns

### Anti-pattern 1: Writing Logic Directly in main()

```go
// BAD: not testable, not reusable
func main() {
    flag.Parse()
    db, _ := sql.Open("postgres", *dsn)
    rows, _ := db.Query("SELECT ...")
    for rows.Next() {
        // All processing concentrated in main
    }
}

// GOOD: separate logic; main is only an entry point
func main() {
    if err := run(os.Args[1:], os.Stdout); err != nil {
        fmt.Fprintf(os.Stderr, "error: %v\n", err)
        os.Exit(1)
    }
}

func run(args []string, stdout io.Writer) error {
    // Testable logic
    cfg, err := parseFlags(args)
    if err != nil {
        return err
    }
    return execute(cfg, stdout)
}
```

### Anti-pattern 2: Abuse of Global Variables

```go
// BAD: everything managed globally
var (
    db      *sql.DB
    logger  *log.Logger
    config  Config
    client  *http.Client
)

// GOOD: group them in a struct and inject dependencies
type App struct {
    DB     *sql.DB
    Logger *log.Logger
    Config Config
    Client *http.Client
}

func NewApp(cfg Config) (*App, error) {
    db, err := sql.Open("postgres", cfg.DSN)
    if err != nil {
        return nil, err
    }
    return &App{
        DB:     db,
        Logger: log.New(os.Stderr, "", log.LstdFlags),
        Config: cfg,
        Client: &http.Client{Timeout: 30 * time.Second},
    }, nil
}
```

### Anti-pattern 3: Unfriendly Error Messages for Users

```go
// BAD: display internal errors as-is
func RunE(cmd *cobra.Command, args []string) error {
    return db.Query("SELECT ...")  // "pq: relation \"users\" does not exist"
}

// GOOD: user-understandable message + details shown with verbose
func RunE(cmd *cobra.Command, args []string) error {
    _, err := db.Query("SELECT ...")
    if err != nil {
        if verbose {
            return fmt.Errorf("database query failed\n  details: %v\n  hint: run migrations with: mytool migrate up", err)
        }
        return fmt.Errorf("database query failed (use -v for details)")
    }
    return nil
}
```

### Anti-pattern 4: Missing Signal Handling

```go
// BAD: terminates immediately on Ctrl+C, resource leak
func main() {
    srv := startServer()
    select{} // Blocks forever
}

// GOOD: graceful shutdown
func main() {
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()

    // Signal handling
    sigCh := make(chan os.Signal, 1)
    signal.Notify(sigCh, syscall.SIGINT, syscall.SIGTERM)

    srv := startServer(ctx)

    // Wait for signal
    sig := <-sigCh
    fmt.Printf("\nReceived signal: %v, shutting down...\n", sig)

    // Graceful shutdown
    shutdownCtx, shutdownCancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer shutdownCancel()

    if err := srv.Shutdown(shutdownCtx); err != nil {
        fmt.Fprintf(os.Stderr, "Shutdown error: %v\n", err)
        os.Exit(1)
    }
    fmt.Println("Shut down gracefully")
}
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
# Exercise 1: template for basic implementation
class Exercise1:
    """Exercise in basic implementation patterns"""

    def __init__(self):
        self.data = []

    def validate_input(self, value):
        """Validate input value"""
        if value is None:
            raise ValueError("Input value is None")
        return True

    def process(self, value):
        """Main data processing logic"""
        self.validate_input(value)
        self.data.append(value)
        return self.data

    def get_results(self):
        """Retrieve processing results"""
        return {
            'count': len(self.data),
            'data': self.data
        }

# Test
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

Extend the basic implementation to add the following features.

```python
# Exercise 2: advanced patterns
from typing import List, Dict, Optional
from datetime import datetime

class AdvancedExercise:
    """Exercise in advanced patterns"""

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

# Test
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
- Be mindful of algorithmic complexity
- Choose appropriate data structures
- Measure the effect with benchmarks
---

## FAQ

### Q1. Should I choose cobra or urfave/cli?

cobra is adopted by large projects such as Docker, Kubernetes, Hugo, and GitHub CLI, and has a rich ecosystem. urfave/cli is simpler, but cobra is superior for features such as shell completion and viper integration. We recommend cobra for new projects.

### Q2. How should CLI tool binaries be distributed?

Using GoReleaser, you can trigger cross-compilation, GitHub Releases, Homebrew Tap, and Docker Image generation automatically from a `git tag`. Configuring `.goreleaser.yaml` and integrating it with GitHub Actions is the standard approach.

### Q3. What is the priority of config files, environment variables, and flags?

The standard viper priority is: 1) an explicit `Set()` call → 2) flags → 3) environment variables → 4) config file → 5) default values. This ordering allows users to use the config file as a baseline while overriding with environment variables or flags.

### Q4. How should I write tests for CLI tools?

Test in three layers. 1) Unit tests for business logic; 2) integration tests for command execution (using `cmd.SetArgs()` + `cmd.Execute()`); 3) E2E tests at the binary level (running the binary via `os/exec`). To make things testable, design so that you inject an `io.Writer` and don't write directly to `os.Stdout`.

### Q5. How do I use cobra's PreRun/PostRun appropriately?

`PersistentPreRun`: runs before every subcommand (logger initialization, loading configuration, etc.). `PreRun`: runs before a specific command (argument validation, prerequisite checks). `PostRun`: runs after a command (cleanup, logging). `PersistentPostRun` is executed regardless of whether RunE returned an error.

### Q6. What are best practices for structuring CLI output?

Write program results to standard output (stdout) and logs, progress, and error messages to standard error (stderr). This makes pipe processing such as `mytool list | jq .` work correctly. Supporting JSON output via an `--output json` flag makes consumption from scripts easier.

---

## Summary

| Concept | Key points |
|---------|-----------|
| Standard flag | Sufficient for simple CLIs, `-flag` style |
| FlagSet | How to implement subcommands with the standard flag |
| pflag | POSIX-compatible `--flag`, supports short form `-f` |
| cobra | Industry standard for subcommands, help, and completion |
| viper | Integrated management of config files, environment variables, and flags |
| promptui | Interactive selection menus and input prompts |
| RunE | Command execution returning an error (preferred over Run) |
| SilenceUsage | Suppress Usage display on errors |
| Shell completion | Completion scripts supporting bash/zsh/fish/powershell |
| GoReleaser | Automate cross-compilation and distribution |
| Output format | Support switching between table/json/yaml |
| Signal handling | Implement graceful shutdown |

---

## Recommended Next Guides

- **03-tools/01-generics.md** — Generics: type parameters, constraints
- **03-tools/03-deployment.md** — Deployment: Docker, cross-compilation
- **02-web/04-testing.md** — Testing: table-driven tests, testify, httptest

---

## References

1. **spf13/cobra GitHub** https://github.com/spf13/cobra
2. **spf13/viper GitHub** https://github.com/spf13/viper
3. **manifoldco/promptui GitHub** https://github.com/manifoldco/promptui
4. **GoReleaser Official Documentation** https://goreleaser.com/
5. **Go Official — flag package** https://pkg.go.dev/flag
6. **cobra Documentation — User Guide** https://cobra.dev/



===== SOURCE: 02-programming/go-practical-guide/docs/03-tools/01-generics.md =====

# Go Generics Guide

> Using type parameters and constraints introduced in Go 1.18 to write type-safe, reusable code

## What You'll Learn in This Chapter

1. **Type parameters** — syntax and basic usage (generic functions and types)
2. **Constraints** — how to define them and the standard library constraints package
3. **Practical patterns** — collection operations, repository pattern, Result type implementation
4. **Standard library** — leveraging the `slices`, `maps`, and `cmp` packages
5. **Performance characteristics** and criteria for deciding when to apply generics


## Prerequisites

Your understanding will deepen if you have the following knowledge before reading this guide:

- Basic programming knowledge
- Understanding of related fundamental concepts
- Familiarity with the content of [Go CLI Development Guide](./00-cli-development.md)

---

## 1. Generics Basics

### Before and After Generics

```
[Before] Duplicating functions for each type

func MaxInt(a, b int) int         { if a > b { return a }; return b }
func MaxFloat(a, b float64) float64 { if a > b { return a }; return b }
func MaxString(a, b string) string  { if a > b { return a }; return b }

           ↓ Unified with generics

[After] A single function handles all types

func MaxT cmp.Ordered T { if a > b { return a }; return b }
```

### Type Parameter Syntax

```
+-------- Type parameter list --------+
|                                     |
func  FuncName  T  constraint  returns
                 |       |
                 |       +--- Constraint: conditions T must satisfy
                 +----------- Type parameter name
```

### Code Example 1: Your First Generic Function

```go
package main

import (
    "cmp"
    "fmt"
)

// T is any type satisfying cmp.Ordered
func MaxT cmp.Ordered T {
    if a > b {
        return a
    }
    return b
}

func MinT cmp.Ordered T {
    if a < b {
        return a
    }
    return b
}

func ClampT cmp.Ordered T {
    return Max(lo, Min(val, hi))
}

func main() {
    fmt.Println(Max(3, 7))           // 7
    fmt.Println(Max(3.14, 2.71))     // 3.14
    fmt.Println(Max("apple", "banana")) // banana
    fmt.Println(Clamp(150, 0, 100))  // 100
}
```

### Code Example 2: Generic Slice Operations

```go
// Map applies a function to each element of a slice
func MapT, U any U) []U {
    result := make([]U, len(s))
    for i, v := range s {
        result[i] = f(v)
    }
    return result
}

// Filter extracts elements from a slice that satisfy a condition
func FilterT any bool) []T {
    var result []T
    for _, v := range s {
        if pred(v) {
            result = append(result, v)
        }
    }
    return result
}

// Reduce aggregates a slice into a single value
func ReduceT, U any U) U {
    acc := init
    for _, v := range s {
        acc = f(acc, v)
    }
    return acc
}

// Find returns the first element that satisfies the condition
func FindT any bool) (T, bool) {
    for _, v := range s {
        if pred(v) {
            return v, true
        }
    }
    var zero T
    return zero, false
}

// GroupBy groups elements based on a key function
func GroupByT any, K comparable K) map[K][]T {
    result := make(map[K][]T)
    for _, v := range s {
        key := keyFn(v)
        result[key] = append(result[key], v)
    }
    return result
}

// Chunk splits a slice into chunks of the specified size
func ChunkT any [][]T {
    if size <= 0 {
        return nil
    }
    var chunks [][]T
    for i := 0; i < len(s); i += size {
        end := i + size
        if end > len(s) {
            end = len(s)
        }
        chunks = append(chunks, s[i:end])
    }
    return chunks
}

// Unique returns a slice with duplicates removed
func UniqueT comparable []T {
    seen := make(map[T]struct{})
    var result []T
    for _, v := range s {
        if _, ok := seen[v]; !ok {
            seen[v] = struct{}{}
            result = append(result, v)
        }
    }
    return result
}

// Usage examples
func main() {
    nums := []int{1, 2, 3, 4, 5}
    doubled := Map(nums, func(n int) int { return n * 2 })
    // [2, 4, 6, 8, 10]

    evens := Filter(nums, func(n int) bool { return n%2 == 0 })
    // [2, 4]

    sum := Reduce(nums, 0, func(acc, n int) int { return acc + n })
    // 15

    // String operations
    words := []string{"hello", "world", "go", "generics"}
    lengths := Map(words, func(s string) int { return len(s) })
    // [5, 5, 2, 8]

    longWords := Filter(words, func(s string) bool { return len(s) > 3 })
    // ["hello", "world", "generics"]

    // Grouping
    type User struct {
        Name string
        Role string
    }
    users := []User{
        {"Alice", "admin"}, {"Bob", "user"}, {"Charlie", "admin"}, {"Dave", "user"},
    }
    byRole := GroupBy(users, func(u User) string { return u.Role })
    // map["admin":[Alice, Charlie] "user":[Bob, Dave]]

    // Deduplication
    ids := []int{1, 2, 3, 2, 1, 4, 3, 5}
    unique := Unique(ids) // [1, 2, 3, 4, 5]
}
```

### Code Example 3: FlatMap and Zip

```go
// FlatMap converts each element of a slice into a slice and flattens the result
func FlatMapT, U any []U) []U {
    var result []U
    for _, v := range s {
        result = append(result, f(v)...)
    }
    return result
}

// Zip pairs up elements from two slices
func ZipT, U any []Pair[T, U] {
    minLen := len(a)
    if len(b) < minLen {
        minLen = len(b)
    }
    result := make([]Pair[T, U], minLen)
    for i := 0; i < minLen; i++ {
        result[i] = Pair[T, U]{First: a[i], Second: b[i]}
    }
    return result
}

type Pair[T, U any] struct {
    First  T
    Second U
}

// Partition splits a slice into two based on a condition
func PartitionT any bool) (matched, unmatched []T) {
    for _, v := range s {
        if pred(v) {
            matched = append(matched, v)
        } else {
            unmatched = append(unmatched, v)
        }
    }
    return
}

// Usage examples
func example() {
    // FlatMap: split sentences into tokens
    sentences := []string{"hello world", "go generics"}
    tokens := FlatMap(sentences, func(s string) []string {
        return strings.Split(s, " ")
    })
    // ["hello", "world", "go", "generics"]

    // Zip: pair names with scores
    names := []string{"Alice", "Bob", "Charlie"}
    scores := []int{90, 85, 95}
    pairs := Zip(names, scores)
    // [{Alice, 90}, {Bob, 85}, {Charlie, 95}]

    // Partition: separate pass and fail
    pass, fail := Partition(scores, func(s int) bool { return s >= 90 })
    // pass: [90, 95], fail: [85]
}
```

---

## 2. Constraints

### Types of Constraints

```
+-------------------+
|   any (interface{})|  ← Loosest: accepts every type
+-------------------+
        |
+-------------------+
|   comparable      |  ← Types that support == and !=
+-------------------+
        |
+-------------------+
|   cmp.Ordered     |  ← Types that support comparison operators (<, >, <=, >=)
+-------------------+
        |
+-------------------+
|  Custom constraint |  ← Requires specific methods or types
+-------------------+
```

### Code Example 4: Defining Custom Constraints

```go
// Method-based constraint
type Stringer interface {
    String() string
}

// Type set-based constraint (union)
type Number interface {
    ~int | ~int8 | ~int16 | ~int32 | ~int64 |
    ~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64 |
    ~float32 | ~float64
}

// Constraint for integers only
type Integer interface {
    ~int | ~int8 | ~int16 | ~int32 | ~int64 |
    ~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64
}

// Constraint for floating-point only
type Float interface {
    ~float32 | ~float64
}

// The tilde (~) designates an underlying type
// ~int includes "all types whose underlying type is int"
type MyInt int      // included in ~int
type Score int      // included in ~int

// Composite constraint: methods + type set
type OrderedStringer interface {
    cmp.Ordered
    String() string
}

// Practical example: Sum function
func SumT Number T {
    var total T
    for _, n := range nums {
        total += n
    }
    return total
}

// Practical example: Average function (returns floating-point)
func AverageT Number float64 {
    if len(nums) == 0 {
        return 0
    }
    var sum T
    for _, n := range nums {
        sum += n
    }
    return float64(sum) / float64(len(nums))
}

// Practical example: Abs function (signed numbers)
type Signed interface {
    ~int | ~int8 | ~int16 | ~int32 | ~int64 | ~float32 | ~float64
}

func AbsT Signed T {
    if v < 0 {
        return -v
    }
    return v
}

fmt.Println(Sum([]int{1, 2, 3}))        // 6
fmt.Println(Sum([]float64{1.1, 2.2}))   // 3.3
fmt.Println(Average([]int{10, 20, 30})) // 20.0
fmt.Println(Abs(-42))                    // 42
```

### Comparison Table of Major Constraints

| Constraint | Allowed types | Available operations | Use cases |
|------|------------|-----------|------|
| `any` | All types | None (only through interface) | Containers, wrappers |
| `comparable` | Comparable types | `==`, `!=` | Map keys, deduplication |
| `cmp.Ordered` | Ordered types | `<`, `>`, `<=`, `>=`, `==` | Sorting, min/max |
| `~int \| ~float64` | Types with the specified underlying type | Numeric operations | Calculation, aggregation |
| Custom interface | Types with methods | Specified methods | Domain-specific logic |

### With/Without ~ (Tilde) Comparison Table

| Constraint definition | `int` | `type MyInt int` | `type Score int` |
|---------|-------|-----------------|-----------------|
| `int` | Match | Mismatch | Mismatch |
| `~int` | Match | Match | Match |

### Code Example 5: Composite Constraints in Practice

```go
// Constraint that satisfies both Comparable and Stringer
type ComparableStringer interface {
    comparable
    String() string
}

// Types that can be used as map keys and have string representations
func PrintMapK ComparableStringer, V any {
    for k, v := range m {
        fmt.Printf("%s: %v\n", k.String(), v)
    }
}

// Composition of constraint interfaces
type Numeric interface {
    Integer | Float
}

type Addable interface {
    Numeric
    comparable
}

// Constraint for JSON-serializable types
type JSONSerializable interface {
    comparable
    MarshalJSON() ([]byte, error)
    UnmarshalJSON([]byte) error
}

// Constraint for validatable types
type Validatable interface {
    Validate() error
}

// Save function with validation
func SaveAllT Validatable error {
    for i, item := range items {
        if err := item.Validate(); err != nil {
            return fmt.Errorf("item[%d]: %w", i, err)
        }
    }
    // Save processing...
    return nil
}
```

---

## 3. Generic Types

### Code Example 6: Generic Data Structures

```go
// Stack
type Stack[T any] struct {
    items []T
}

func NewStack[T any]() *Stack[T] {
    return &Stack[T]{}
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, bool) {
    if len(s.items) == 0 {
        var zero T
        return zero, false
    }
    last := len(s.items) - 1
    item := s.items[last]
    s.items = s.items[:last]
    return item, true
}

func (s *Stack[T]) Peek() (T, bool) {
    if len(s.items) == 0 {
        var zero T
        return zero, false
    }
    return s.items[len(s.items)-1], true
}

func (s *Stack[T]) Len() int {
    return len(s.items)
}

func (s *Stack[T]) IsEmpty() bool {
    return len(s.items) == 0
}

// Usage examples
intStack := NewStack[int]()
intStack.Push(1)
intStack.Push(2)
val, _ := intStack.Pop() // 2

strStack := NewStack[string]()
strStack.Push("hello")
```

### Code Example 7: Generic Queue

```go
// Queue is a generic FIFO queue
type Queue[T any] struct {
    items []T
}

func NewQueue[T any]() *Queue[T] {
    return &Queue[T]{}
}

func (q *Queue[T]) Enqueue(item T) {
    q.items = append(q.items, item)
}

func (q *Queue[T]) Dequeue() (T, bool) {
    if len(q.items) == 0 {
        var zero T
        return zero, false
    }
    item := q.items[0]
    q.items = q.items[1:]
    return item, true
}

func (q *Queue[T]) Peek() (T, bool) {
    if len(q.items) == 0 {
        var zero T
        return zero, false
    }
    return q.items[0], true
}

func (q *Queue[T]) Len() int {
    return len(q.items)
}

// PriorityQueue is a priority queue
type PriorityQueue[T any] struct {
    items []T
    less  func(a, b T) bool
}

func NewPriorityQueueT any bool) *PriorityQueue[T] {
    return &PriorityQueue[T]{less: less}
}

func (pq *PriorityQueue[T]) Push(item T) {
    pq.items = append(pq.items, item)
    pq.up(len(pq.items) - 1)
}

func (pq *PriorityQueue[T]) Pop() (T, bool) {
    if len(pq.items) == 0 {
        var zero T
        return zero, false
    }
    n := len(pq.items) - 1
    pq.items[0], pq.items[n] = pq.items[n], pq.items[0]
    item := pq.items[n]
    pq.items = pq.items[:n]
    if n > 0 {
        pq.down(0)
    }
    return item, true
}

func (pq *PriorityQueue[T]) up(j int) {
    for {
        i := (j - 1) / 2
        if i == j || !pq.less(pq.items[j], pq.items[i]) {
            break
        }
        pq.items[i], pq.items[j] = pq.items[j], pq.items[i]
        j = i
    }
}

func (pq *PriorityQueue[T]) down(i int) {
    n := len(pq.items)
    for {
        left := 2*i + 1
        if left >= n {
            break
        }
        j := left
        if right := left + 1; right < n && pq.less(pq.items[right], pq.items[left]) {
            j = right
        }
        if !pq.less(pq.items[j], pq.items[i]) {
            break
        }
        pq.items[i], pq.items[j] = pq.items[j], pq.items[i]
        i = j
    }
}

func (pq *PriorityQueue[T]) Len() int {
    return len(pq.items)
}

// Usage example
pq := NewPriorityQueue(func(a, b int) bool { return a < b })
pq.Push(3)
pq.Push(1)
pq.Push(2)
val, _ := pq.Pop() // 1 (the smallest value comes out first)
```

### Code Example 8: Generic Concurrency-Safe Map

```go
// SyncMap is a generic concurrency-safe map
type SyncMap[K comparable, V any] struct {
    mu sync.RWMutex
    m  map[K]V
}

func NewSyncMap[K comparable, V any]() *SyncMap[K, V] {
    return &SyncMap[K, V]{
        m: make(map[K]V),
    }
}

func (sm *SyncMap[K, V]) Get(key K) (V, bool) {
    sm.mu.RLock()
    defer sm.mu.RUnlock()
    val, ok := sm.m[key]
    return val, ok
}

func (sm *SyncMap[K, V]) Set(key K, value V) {
    sm.mu.Lock()
    defer sm.mu.Unlock()
    sm.m[key] = value
}

func (sm *SyncMap[K, V]) Delete(key K) {
    sm.mu.Lock()
    defer sm.mu.Unlock()
    delete(sm.m, key)
}

func (sm *SyncMap[K, V]) Len() int {
    sm.mu.RLock()
    defer sm.mu.RUnlock()
    return len(sm.m)
}

func (sm *SyncMap[K, V]) Range(fn func(K, V) bool) {
    sm.mu.RLock()
    defer sm.mu.RUnlock()
    for k, v := range sm.m {
        if !fn(k, v) {
            break
        }
    }
}

// GetOrSet sets and returns the value if it doesn't exist
func (sm *SyncMap[K, V]) GetOrSet(key K, defaultVal V) V {
    sm.mu.Lock()
    defer sm.mu.Unlock()
    if val, ok := sm.m[key]; ok {
        return val
    }
    sm.m[key] = defaultVal
    return defaultVal
}

// Usage example
cache := NewSyncMap[string, int]()
cache.Set("count", 42)
val, ok := cache.Get("count") // 42, true
```

### Code Example 9: Result Type (Improved Error Handling)

```go
// Result is a type that holds either an error or a value
type Result[T any] struct {
    value T
    err   error
}

func OkT any Result[T] {
    return Result[T]{value: value}
}

func ErrT any Result[T] {
    return Result[T]{err: err}
}

func (r Result[T]) IsOk() bool {
    return r.err == nil
}

func (r Result[T]) IsErr() bool {
    return r.err != nil
}

func (r Result[T]) Unwrap() (T, error) {
    return r.value, r.err
}

func (r Result[T]) UnwrapOr(defaultVal T) T {
    if r.err != nil {
        return defaultVal
    }
    return r.value
}

func (r Result[T]) UnwrapOrElse(fn func(error) T) T {
    if r.err != nil {
        return fn(r.err)
    }
    return r.value
}

// Map: applies the transformation only when there is a value
func MapResultT, U any U) Result[U] {
    if r.err != nil {
        return ErrU
    }
    return Ok(f(r.value))
}

// FlatMap: applies another Result-producing function when there is a value
func FlatMapResultT, U any Result[U]) Result[U] {
    if r.err != nil {
        return ErrU
    }
    return f(r.value)
}

// Collect: gathers success values from a slice of Results (fails if any one errors)
func CollectT any Result[[]T] {
    values := make([]T, 0, len(results))
    for _, r := range results {
        if r.IsErr() {
            return Err[[]T](r.err)
        }
        values = append(values, r.value)
    }
    return Ok(values)
}

// Usage examples
result := Ok(42)
doubled := MapResult(result, func(n int) int { return n * 2 })
val, _ := doubled.Unwrap() // 84

// Chaining
func fetchUser(id string) Result[User] {
    user, err := db.FindUser(id)
    if err != nil {
        return ErrUser
    }
    return Ok(*user)
}

func getEmail(u User) Result[string] {
    if u.Email == "" {
        return Errstring)
    }
    return Ok(u.Email)
}

// Result chain
email := FlatMapResult(fetchUser("123"), getEmail)
fmt.Println(email.UnwrapOr("no-email@example.com"))
```

### Code Example 10: Optional Type

```go
// Optional is a nil-safe value container
type Optional[T any] struct {
    value *T
}

func SomeT any Optional[T] {
    return Optional[T]{value: &v}
}

func None[T any]() Optional[T] {
    return Optional[T]{}
}

func (o Optional[T]) IsPresent() bool {
    return o.value != nil
}

func (o Optional[T]) Get() (T, bool) {
    if o.value == nil {
        var zero T
        return zero, false
    }
    return *o.value, true
}

func (o Optional[T]) OrElse(defaultVal T) T {
    if o.value == nil {
        return defaultVal
    }
    return *o.value
}

func (o Optional[T]) IfPresent(fn func(T)) {
    if o.value != nil {
        fn(*o.value)
    }
}

func MapOptionalT, U any U) Optional[U] {
    if o.value == nil {
        return None[U]()
    }
    return Some(f(*o.value))
}

// Usage examples
name := Some("Alice")
name.IfPresent(func(n string) {
    fmt.Printf("Hello, %s!\n", n)
})

empty := None[string]()
fmt.Println(empty.OrElse("anonymous")) // "anonymous"
```

---

## 4. Practical Patterns

### Code Example 11: Generic Repository Pattern

```go
type Entity interface {
    GetID() string
}

type Repository[T Entity] interface {
    FindByID(id string) (T, error)
    FindAll() ([]T, error)
    Save(entity T) error
    Delete(id string) error
}

// In-memory implementation
type InMemoryRepo[T Entity] struct {
    mu    sync.RWMutex
    store map[string]T
}

func NewInMemoryRepo[T Entity]() *InMemoryRepo[T] {
    return &InMemoryRepo[T]{
        store: make(map[string]T),
    }
}

func (r *InMemoryRepo[T]) FindByID(id string) (T, error) {
    r.mu.RLock()
    defer r.mu.RUnlock()
    entity, ok := r.store[id]
    if !ok {
        var zero T
        return zero, fmt.Errorf("entity %s not found", id)
    }
    return entity, nil
}

func (r *InMemoryRepo[T]) FindAll() ([]T, error) {
    r.mu.RLock()
    defer r.mu.RUnlock()
    result := make([]T, 0, len(r.store))
    for _, entity := range r.store {
        result = append(result, entity)
    }
    return result, nil
}

func (r *InMemoryRepo[T]) Save(entity T) error {
    r.mu.Lock()
    defer r.mu.Unlock()
    r.store[entity.GetID()] = entity
    return nil
}

func (r *InMemoryRepo[T]) Delete(id string) error {
    r.mu.Lock()
    defer r.mu.Unlock()
    if _, ok := r.store[id]; !ok {
        return fmt.Errorf("entity %s not found", id)
    }
    delete(r.store, id)
    return nil
}

// FindBy searches for entities matching a condition
func (r *InMemoryRepo[T]) FindBy(pred func(T) bool) []T {
    r.mu.RLock()
    defer r.mu.RUnlock()
    var result []T
    for _, entity := range r.store {
        if pred(entity) {
            result = append(result, entity)
        }
    }
    return result
}

// Usage examples
type User struct {
    ID   string
    Name string
    Age  int
}

func (u User) GetID() string { return u.ID }

repo := NewInMemoryRepo[User]()
repo.Save(User{ID: "1", Name: "Alice", Age: 30})
repo.Save(User{ID: "2", Name: "Bob", Age: 25})
user, _ := repo.FindByID("1")

// Conditional search
adults := repo.FindBy(func(u User) bool { return u.Age >= 18 })
```

### Code Example 12: Generic Pagination

```go
// Page represents a pagination result
type Page[T any] struct {
    Items      []T `json:"items"`
    Total      int `json:"total"`
    Page       int `json:"page"`
    PageSize   int `json:"page_size"`
    TotalPages int `json:"total_pages"`
    HasNext    bool `json:"has_next"`
    HasPrev    bool `json:"has_prev"`
}

// Paginate paginates a slice
func PaginateT any Page[T] {
    total := len(items)
    totalPages := (total + pageSize - 1) / pageSize

    if page < 1 {
        page = 1
    }
    if page > totalPages && totalPages > 0 {
        page = totalPages
    }

    start := (page - 1) * pageSize
    end := start + pageSize
    if start > total {
        start = total
    }
    if end > total {
        end = total
    }

    return Page[T]{
        Items:      items[start:end],
        Total:      total,
        Page:       page,
        PageSize:   pageSize,
        TotalPages: totalPages,
        HasNext:    page < totalPages,
        HasPrev:    page > 1,
    }
}

// Usage example
users := getAllUsers() // []User
page := Paginate(users, 2, 10) // Page 2, 10 items per page
fmt.Printf("Page %d/%d, %d items\n", page.Page, page.TotalPages, len(page.Items))
```

### Code Example 13: Generic Cache

```go
// Cache is a generic cache with TTL
type Cache[K comparable, V any] struct {
    mu      sync.RWMutex
    items   map[K]cacheItem[V]
    ttl     time.Duration
    maxSize int
}

type cacheItem[V any] struct {
    value     V
    expiresAt time.Time
}

func NewCacheK comparable, V any *Cache[K, V] {
    return &Cache[K, V]{
        items:   make(map[K]cacheItem[V]),
        ttl:     ttl,
        maxSize: maxSize,
    }
}

func (c *Cache[K, V]) Get(key K) (V, bool) {
    c.mu.RLock()
    defer c.mu.RUnlock()

    item, ok := c.items[key]
    if !ok || time.Now().After(item.expiresAt) {
        var zero V
        return zero, false
    }
    return item.value, true
}

func (c *Cache[K, V]) Set(key K, value V) {
    c.mu.Lock()
    defer c.mu.Unlock()

    // Evict expired items when maxSize is exceeded
    if len(c.items) >= c.maxSize {
        c.evictExpired()
    }

    c.items[key] = cacheItem[V]{
        value:     value,
        expiresAt: time.Now().Add(c.ttl),
    }
}

func (c *Cache[K, V]) Delete(key K) {
    c.mu.Lock()
    defer c.mu.Unlock()
    delete(c.items, key)
}

func (c *Cache[K, V]) evictExpired() {
    now := time.Now()
    for k, item := range c.items {
        if now.After(item.expiresAt) {
            delete(c.items, k)
        }
    }
}

// GetOrLoad retrieves via loader and caches the result if the value is absent
func (c *Cache[K, V]) GetOrLoad(key K, loader func(K) (V, error)) (V, error) {
    if val, ok := c.Get(key); ok {
        return val, nil
    }

    val, err := loader(key)
    if err != nil {
        var zero V
        return zero, err
    }

    c.Set(key, val)
    return val, nil
}

// Usage example
userCache := NewCachestring, *User
user, err := userCache.GetOrLoad("user-123", func(id string) (*User, error) {
    return db.FindUser(id)
})
```

### Type Inference Flow for Generics

```
Max(3, 7)
   |
   +-- Compiler infers the types of the arguments
   |     3 → int,  7 → int
   |
   +-- Determined: T = int
   |
   +-- Expanded as Maxint
   |
   +-- Does int satisfy cmp.Ordered? → Yes
   |
   +-- Compilation succeeds

Max(3, 7.0)
   |
   +-- 3 → int,  7.0 → float64
   |
   +-- Types don't match → compile error
   |
   +-- Fix: Max(float64(3), 7.0) or Maxfloat64
```

---

## 5. Generic Functions in the Standard Library

### Code Example 14: slices Package

```go
import "slices"

// Sorting
nums := []int{3, 1, 4, 1, 5, 9, 2, 6}
slices.Sort(nums) // [1, 1, 2, 3, 4, 5, 6, 9]

// Custom sort
type User struct {
    Name string
    Age  int
}
users := []User{{"Charlie", 30}, {"Alice", 25}, {"Bob", 35}}
slices.SortFunc(users, func(a, b User) int {
    return cmp.Compare(a.Age, b.Age)
})
// [{Alice 25}, {Charlie 30}, {Bob 35}]

// Stable sort (preserves order of elements with the same key)
slices.SortStableFunc(users, func(a, b User) int {
    return cmp.Compare(a.Name, b.Name)
})

// Binary search
sorted := []int{1, 2, 3, 4, 5, 6, 7, 8, 9}
idx, found := slices.BinarySearch(sorted, 5) // 4, true

// Containment check
slices.Contains([]string{"a", "b", "c"}, "b") // true

// Max / min
slices.Max([]int{3, 1, 4, 1, 5}) // 5
slices.Min([]int{3, 1, 4, 1, 5}) // 1

// Compact (removes consecutive duplicates)
nums = []int{1, 1, 2, 3, 3, 3, 4}
slices.Compact(nums) // [1, 2, 3, 4]

// Reverse
slices.Reverse([]int{1, 2, 3}) // [3, 2, 1]

// Index lookup
slices.Index([]string{"a", "b", "c"}, "b") // 1

// Equality comparison
slices.Equal([]int{1, 2, 3}, []int{1, 2, 3}) // true

// Clone
original := []int{1, 2, 3}
cloned := slices.Clone(original) // deep copy
```

### Code Example 15: maps Package

```go
import "maps"

m := map[string]int{"a": 1, "b": 2, "c": 3}

// List of keys
keys := maps.Keys(m) // returns an iterator (Go 1.23+)

// List of values
values := maps.Values(m) // returns an iterator

// Clone
cloned := maps.Clone(m) // shallow copy

// Equality comparison
maps.Equal(m, cloned) // true

// Copy (merges src into dst)
dst := map[string]int{"a": 10, "d": 4}
maps.Copy(dst, m) // dst = {"a": 1, "b": 2, "c": 3, "d": 4}

// Conditional deletion
maps.DeleteFunc(m, func(k string, v int) bool {
    return v < 2
})
// m = {"b": 2, "c": 3}
```

### Code Example 16: cmp Package

```go
import "cmp"

// Comparison
cmp.Compare(1, 2)     // -1
cmp.Compare(2, 2)     //  0
cmp.Compare(3, 2)     //  1

// Zero value check
cmp.Or(0, 42)         // 42 (first non-zero value)
cmp.Or("", "default") // "default"
cmp.Or("hello", "default") // "hello"

// Multiple fallbacks
cmp.Or("", "", "fallback") // "fallback"

// Compositing sort keys
type Employee struct {
    Department string
    Name       string
    Salary     int
}

employees := []Employee{...}
slices.SortFunc(employees, func(a, b Employee) int {
    // Sort by department first, then by name if equal
    if c := cmp.Compare(a.Department, b.Department); c != 0 {
        return c
    }
    return cmp.Compare(a.Name, b.Name)
})
```

---

## 6. Performance Characteristics

### GCShape Stenciling

```
+----------------------------------------------------------+
|  Go generics compilation strategy                        |
+----------------------------------------------------------+
|                                                          |
|  func MaxT cmp.Ordered T                                 |
|                                                          |
|  At compile time:                                        |
|  +-------------------+  +-------------------+            |
|  | Pointer types     |  | Value types       |            |
|  | (*User, *string, etc.) | (int, float64, etc.) |       |
|  | → share a common impl. | → specialized per type |     |
|  +-------------------+  +-------------------+            |
|                                                          |
|  GCShape = types with the same memory layout share one impl. |
|  → Prevents code size explosion                          |
|  → All pointer types share the same shape                |
+----------------------------------------------------------+
```

### Code Example 17: Performance Comparison via Benchmarks

```go
// Interface version
func SumInterface(nums []interface{}) int {
    sum := 0
    for _, n := range nums {
        sum += n.(int)
    }
    return sum
}

// Generic version
func SumGenericT Number T {
    var sum T
    for _, n := range nums {
        sum += n
    }
    return sum
}

// Concrete-type version
func SumInt(nums []int) int {
    sum := 0
    for _, n := range nums {
        sum += n
    }
    return sum
}

// Benchmarks
func BenchmarkSumInterface(b *testing.B) {
    nums := make([]interface{}, 1000)
    for i := range nums { nums[i] = i }
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        SumInterface(nums)
    }
}

func BenchmarkSumGeneric(b *testing.B) {
    nums := make([]int, 1000)
    for i := range nums { nums[i] = i }
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        SumGeneric(nums)
    }
}

func BenchmarkSumConcrete(b *testing.B) {
    nums := make([]int, 1000)
    for i := range nums { nums[i] = i }
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        SumInt(nums)
    }
}

// Typical results:
// BenchmarkSumInterface-8   500000  2800 ns/op  0 B/op  0 allocs/op
// BenchmarkSumGeneric-8    2000000   600 ns/op  0 B/op  0 allocs/op
// BenchmarkSumConcrete-8   2000000   580 ns/op  0 B/op  0 allocs/op
// → Generics perform roughly on par with concrete types, far faster than interface
```

---

## 7. Deciding When to Apply Generics

### When to Use Generics

```
+----------------------------------------------------------+
|  Decision flow for applying generics                     |
+----------------------------------------------------------+
|                                                          |
|  Want to apply the same logic to different types?        |
|    |                                                     |
|    +-- YES → Will the type parameter be used with 2+ concrete types? |
|    |           |                                         |
|    |           +-- YES → Generics are appropriate        |
|    |           +-- NO  → Use concrete types directly     |
|    |                                                     |
|    +-- NO  → Want to abstract different implementations into the same behavior? |
|              |                                           |
|              +-- YES → Use an interface                  |
|              +-- NO  → Generics aren't needed            |
+----------------------------------------------------------+
```

| Scenario | Recommendation | Rationale |
|------|------|------|
| Collection operations (Map, Filter, Reduce) | Generics | Same algorithm applied to all types |
| Data structures (Stack, Queue, Tree) | Generics | Type-safe containers |
| Abstracting DB connections | Interface | Implementations differ (MySQL vs PostgreSQL) |
| HTTP handlers | Interface | http.Handler pattern |
| Sorting algorithms | Generics | Supports all comparable types |
| Loggers | Interface | Different output destinations |
| Functions like `fmt.Println(v any)` | `any` parameter | Generics aren't needed |

---

## 8. Anti-Patterns

### Anti-Pattern 1: Unnecessary Use of Generics

```go
// BAD: a case where generics aren't needed
func PrintValueT any {
    fmt.Println(v) // For any, interface{} would suffice
}

// GOOD: use interface{} or any directly
func PrintValue(v any) {
    fmt.Println(v)
}

// BAD: type parameter used with only one concrete type
func ParseUserJSONT User (T, error) {
    var result T
    err := json.Unmarshal(data, &result)
    return result, err
}

// GOOD: use the concrete type directly
func ParseUserJSON(data []byte) (User, error) {
    var user User
    err := json.Unmarshal(data, &user)
    return user, err
}
```

### Anti-Pattern 2: Overly Complex Constraints

```go
// BAD: constraint is too complex and hard to read
type ComplexConstraint[K comparable, V interface {
    ~int | ~string
    fmt.Stringer
    encoding.BinaryMarshaler
}] struct {
    data map[K]V
}

// GOOD: split constraints and name them
type Serializable interface {
    fmt.Stringer
    encoding.BinaryMarshaler
}

type ValueType interface {
    ~int | ~string
    Serializable
}

type Store[K comparable, V ValueType] struct {
    data map[K]V
}
```

### Anti-Pattern 3: Trying to Achieve Polymorphism with Generics

```go
// BAD: switching behavior with generics
func ProcessT Animal string {
    // Wanting to change behavior based on the concrete type of T
    // → Generics don't support type-based dispatch
}

// GOOD: use an interface
type Animal interface {
    Speak() string
}

func Process(a Animal) string {
    return a.Speak()
}
```

### Anti-Pattern 4: Mishandling Zero Values

```go
// BAD: generic zero-value check
func IsZeroT any bool {
    // any doesn't support zero-value comparison → compile error
    return v == T{} // not allowed
}

// GOOD: use the comparable constraint
func IsZeroT comparable bool {
    var zero T
    return v == zero
}

// GOOD: use reflect (for the any case)
func IsZeroAny(v any) bool {
    return reflect.ValueOf(v).IsZero()
}
```


---

## Practice Exercises

### Exercise 1: Basic Implementation

Implement code that satisfies the following requirements.

**Requirements:**
- Validate the input data
- Implement error handling appropriately
- Write test code as well

```python
# Exercise 1: basic implementation template
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
        """Main data processing logic"""
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
# Exercise 2: advanced patterns
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
        """Look up by key"""
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

    print(f"Inefficient: {slow_time:.4f} sec")
    print(f"Efficient:   {fast_time:.6f} sec")
    print(f"Speedup:     {slow_time/fast_time:.0f}x")

benchmark()
```

**Key points:**
- Be aware of algorithmic complexity
- Choose appropriate data structures
- Measure improvements with benchmarks

---

## Troubleshooting

### Common Errors and Solutions

| Error | Cause | Solution |
|--------|------|--------|
| Initialization error | Incorrect configuration file | Verify the configuration file path and format |
| Timeout | Network latency/resource shortage | Adjust timeout values, add retry logic |
| Out of memory | Growing data volume | Introduce batch processing, implement pagination |
| Permission error | Insufficient access rights | Check the executing user's permissions, review settings |
| Data inconsistency | Concurrency conflicts | Introduce locking, manage transactions |

### Debugging Procedure

1. **Check the error message**: Read the stack trace and identify where the error occurred
2. **Establish reproduction steps**: Reproduce the error with minimal code
3. **Formulate hypotheses**: Enumerate possible causes
4. **Verify incrementally**: Use log output and a debugger to test the hypotheses
5. **Fix and regression test**: After fixing, run tests for related areas as well

```python
# Debugging utilities
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
        logger.debug(f"Call: {func.__name__}(args={args}, kwargs={kwargs})")
        try:
            result = func(*args, **kwargs)
            logger.debug(f"Return value: {func.__name__} -> {result}")
            return result
        except Exception as e:
            logger.error(f"Exception raised: {func.__name__}: {e}")
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

### Diagnosing Performance Problems

Diagnostic procedure when performance problems occur:

1. **Identify bottlenecks**: Measure with profiling tools
2. **Check memory usage**: Look for memory leaks
3. **Check for I/O waits**: Review disk and network I/O status
4. **Check concurrent connections**: Inspect the state of the connection pool

| Problem type | Diagnostic tools | Countermeasures |
|-----------|-----------|------|
| CPU load | cProfile, py-spy | Algorithmic improvements, parallelization |
| Memory leaks | tracemalloc, objgraph | Proper release of references |
| I/O bottleneck | strace, iostat | Asynchronous I/O, caching |
| DB latency | EXPLAIN, slow query log | Indexes, query optimization |

---

## Design Decision Guide

### Selection Criteria Matrix

The following summarizes criteria to apply when making technology choices.

| Criterion | When to prioritize | When compromises are acceptable |
|---------|------------|-------------|
| Performance | Real-time processing, large-scale data | Admin dashboards, batch processing |
| Maintainability | Long-term operations, team development | Prototypes, short-term projects |
| Scalability | Services expected to grow | Internal tools, fixed user base |
| Security | Personal information, financial data | Public data, internal use |
| Development speed | MVPs, time-to-market | Quality-first, mission-critical systems |

### Choosing an Architecture Pattern

```
┌─────────────────────────────────────────────────┐
│          Architecture selection flow             │
├─────────────────────────────────────────────────┤
│                                                 │
│  ① What is the team size?                        │
│    ├─ Small (1-5) → Monolith                     │
│    └─ Large (10+) → go to ②                      │
│                                                 │
│  ② What is the deployment frequency?             │
│    ├─ Weekly or less → Monolith + modular split  │
│    └─ Daily/multiple → go to ③                   │
│                                                 │
│  ③ How independent are the teams?                │
│    ├─ High → Microservices                       │
│    └─ Moderate → Modular monolith                │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Analyzing Trade-offs

Technical decisions always come with trade-offs. Analyze them from the following perspectives:

**1. Short-term vs. long-term cost**
- A method that is fast in the short term may become technical debt in the long run
- Conversely, over-engineering carries high short-term cost and can delay the project

**2. Consistency vs. flexibility**
- A unified tech stack has low learning cost
- Adopting diverse technologies enables the right tool for the job but increases operational cost

**3. Level of abstraction**
- Higher abstraction increases reusability but can make debugging harder
- Lower abstraction is intuitive but tends to produce code duplication

```python
# Template for recording design decisions
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
        md += "\n## Rejected alternatives\n"
        for a in self.alternatives:
            md += f"- **{a['name']}**: {a['reason_rejected']}\n"
        return md
```
---

## FAQ

### Q1. How do I choose between generics and interfaces?

Use generics when "applying the same algorithm to different types." Use interfaces when "abstracting different implementations as the same behavior." For example, sorting algorithms are a good fit for generics. On the other hand, polymorphism such as a database connection is a good fit for interfaces.

### Q2. Do generics affect performance?

Go's generics perform GCShape stenciling (shape-based specialization) at compile time. Pointer types share a common implementation, while value types are specialized as needed. In most cases they are as fast as, or faster than, invocations through an interface.

### Q3. How are generics used in the standard library since Go 1.18?

The `slices` package (sort, search, compare), the `maps` package (get keys, get values, clone), and the `cmp` package (comparison functions) have been added. There is no generic version of `sync.Map` in the standard library, but third-party packages provide one.

### Q4. Can you define methods on a type parameter?

You cannot define methods on a type parameter itself. However, you can define methods on a generic type (e.g., `Stack[T any]`). Methods use the type parameters declared in the type definition; you cannot add new type parameters in a method declaration.

```go
type Stack[T any] struct { items []T }

// OK: use T from the type definition
func (s *Stack[T]) Push(item T) { ... }

// BAD: adding a new type parameter to a method
func (s *Stack[T]) MapU any U) *Stack[U] { ... } // compile error

// OK: define it as a function
func MapStackT, U any U) *Stack[U] { ... }
```

### Q5. How do I choose between generics and reflect?

Generics guarantee compile-time type safety and offer good performance. reflect provides access to runtime type information and is very flexible, but it lacks type safety and has worse performance. As a rule, use generics when they can solve the problem; use reflect only when you need to handle types dynamically at runtime, such as in JSON marshaling or ORMs.

```go
// Case solvable with generics → use generics
func ContainsT comparable bool {
    for _, v := range slice {
        if v == target {
            return true
        }
    }
    return false
}

// Case that requires reflect → dynamically traverse struct fields
func StructToMap(v any) map[string]any {
    result := make(map[string]any)
    val := reflect.ValueOf(v)
    typ := val.Type()
    for i := 0; i < val.NumField(); i++ {
        field := typ.Field(i)
        if field.IsExported() {
            result[field.Name] = val.Field(i).Interface()
        }
    }
    return result
}
```

### Q6. Are recursive type constraints possible with generics?

As of Go 1.18, direct recursive constraints are not supported, but you can achieve them indirectly.

```go
// Self-referential type pattern
type Comparable[T any] interface {
    CompareTo(other T) int
}

// Usage example
type MyString string

func (s MyString) CompareTo(other MyString) int {
    return strings.Compare(string(s), string(other))
}

func Sort[T Comparable[T]](items []T) {
    slices.SortFunc(items, func(a, b T) int {
        return a.CompareTo(b)
    })
}
```

---

### Q7. Can I call methods inside a union-type constraint?

Union types (such as `int | string`) do not have methods, so you cannot call methods using only a union-type constraint. To call methods, you need to add interface methods to the constraint.

```go
// BAD: union types have no methods
type Numeric interface {
    ~int | ~float64
}

func DoubleT Numeric string {
    return v.String() // compile error: String() is not defined
}

// OK: include methods in the constraint
type StringableNumeric interface {
    ~int | ~float64
    String() string
}
```

### Q8. Can the iterator pattern be implemented with generics?

By combining generics with range-over-function (range functions) in Go 1.23 and later, you can implement type-safe iterators.

```go
// Generic iterator using iter.Seq (Go 1.23+)
func FilterT any bool) iter.Seq[T] {
    return func(yield func(T) bool) {
        for v := range seq {
            if predicate(v) {
                if !yield(v) {
                    return
                }
            }
        }
    }
}

func MapT, U any U) iter.Seq[U] {
    return func(yield func(U) bool) {
        for v := range seq {
            if !yield(transform(v)) {
                return
            }
        }
    }
}

// Usage example
numbers := slices.Values([]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10})
evens := Filter(numbers, func(n int) bool { return n%2 == 0 })
doubled := Map(evens, func(n int) int { return n * 2 })
for v := range doubled {
    fmt.Println(v) // 4, 8, 12, 16, 20
}
```

---

## Summary

| Concept | Key points |
|------|------|
| Type parameters `[T ...]` | Generalize functions and types over multiple types |
| `any` | Constraint that allows any type (= `interface{}`) |
| `comparable` | Constraint for types that support `==` / `!=` |
| `cmp.Ordered` | Constraint for types that support comparison operators |
| `~T` (tilde) | Includes all types whose underlying type is T |
| Type inference | Automatically infer type parameters from arguments |
| Zero value | Obtain the zero value of a generic type with `var zero T` |
| `slices` / `maps` | Generic utilities in the standard library |
| Result / Optional | Generic types for error handling and nil safety |
| GCShape stenciling | Type-specialization strategy at compile time |

---

## Recommended Next Guides

- **03-tools/02-profiling.md** — Profiling: pprof, trace
- **03-tools/04-best-practices.md** — Best practices: Effective Go
- **03-tools/00-cli-development.md** — CLI development: cobra, flag, promptui

---

## References

1. **Go Official — Type Parameters Proposal** https://go.googlesource.com/proposal/+/refs/heads/master/design/43651-type-parameters.md
2. **Go Official — Tutorial: Getting started with generics** https://go.dev/doc/tutorial/generics
3. **Go Blog — An Introduction To Generics** https://go.dev/blog/intro-generics
4. **Go Standard Library — slices package** https://pkg.go.dev/slices
5. **Go Standard Library — maps package** https://pkg.go.dev/maps
6. **Go Standard Library — cmp package** https://pkg.go.dev/cmp



===== SOURCE: 02-programming/go-practical-guide/docs/03-tools/02-profiling.md =====

# Go Profiling Guide

> Use pprof and trace to identify bottlenecks in Go applications and optimize performance

## What You'll Learn in This Chapter

1. **pprof** techniques for CPU, memory, and goroutine profiling
2. **runtime/trace** for visualizing goroutine scheduling and latency
3. **Benchmark integration** — how to acquire profiles from tests and run an optimization cycle
4. **Mutex/Block profiling** — analyzing lock contention and blocking operations
5. **Continuous profiling** — strategies for constant monitoring in production


## Prerequisites

Reading this guide is easier if you have the following knowledge:

- Basic programming knowledge
- Understanding of related fundamental concepts
- Understanding the content of [Go Generics Guide](./01-generics.md)

---

## 1. Overview of Go Profiling

### Classification of Profiling Tools

```
+----------------------------------------------------------+
|                  Go Profiling System                     |
+----------------------------------------------------------+
|                                                          |
|  +-----------------+  +------------------+  +-----------+|
|  | CPU Profile     |  | Memory Profile   |  | Trace     ||
|  | Where time is   |  | Where memory is  |  | When what ||
|  | being spent     |  | being allocated  |  | happened  ||
|  +-----------------+  +------------------+  +-----------+|
|         |                     |                   |      |
|         v                     v                   v      |
|  go tool pprof         go tool pprof       go tool trace |
|                                                          |
|  +-----------------+  +------------------+               |
|  | Goroutine Prof  |  | Block Profile    |               |
|  | Check the       |  | Analyze lock     |               |
|  | state of        |  | waits            |               |
|  | goroutines      |  |                  |               |
|  +-----------------+  +------------------+               |
|                                                          |
|  +-----------------+  +------------------+               |
|  | Mutex Profile   |  | Threadcreate     |               |
|  | Analyze mutex   |  | Track OS thread  |               |
|  | contention      |  | creation         |               |
|  +-----------------+  +------------------+               |
+----------------------------------------------------------+
```

### Choosing How to Acquire a Profile

```
Want to take a profile
        |
        +-- Production server (always running)
        |       |
        |       v
        |   net/http/pprof (HTTP endpoint)
        |
        +-- Tests / benchmarks
        |       |
        |       v
        |   go test -cpuprofile / -memprofile
        |
        +-- Short-lived programs (CLI, etc.)
        |       |
        |       v
        |   runtime/pprof (start/stop within the program)
        |
        +-- Continuous monitoring
                |
                v
            Pyroscope / Parca / Google Cloud Profiler
```

### Basic Profiling Flow

```
+----------------------------------------------------------+
|  Performance Optimization Cycle                          |
+----------------------------------------------------------+
|                                                          |
|  1. Measure                                              |
|     |  Quantify the current state via benchmarks /      |
|     |  load tests                                       |
|     v                                                    |
|  2. Profile                                              |
|     |  Identify hotspots with pprof                     |
|     v                                                    |
|  3. Analyze                                              |
|     |  Understand causes via flame graphs / call graphs |
|     v                                                    |
|  4. Optimize                                             |
|     |  Improve only the bottleneck                      |
|     v                                                    |
|  5. Verify                                               |
|     |  Quantitatively confirm the effect via benchmarks |
|     v                                                    |
|  6. Go back to 1 (repeat if improvement is insufficient)|
+----------------------------------------------------------+
```

---

## 2. net/http/pprof — Profiling HTTP Servers

### Code Example 1: Adding pprof Endpoints

```go
package main

import (
    "log"
    "net/http"
    _ "net/http/pprof" // Side-effect import registers endpoints
)

func main() {
    // Application routing
    mux := http.NewServeMux()
    mux.HandleFunc("/api/users", handleUsers)

    // pprof is registered on DefaultServeMux, so start a
    // dedicated pprof server on a separate port (recommended for prod)
    go func() {
        log.Println("pprof server: http://localhost:6060/debug/pprof/")
        log.Fatal(http.ListenAndServe(":6060", nil))
    }()

    // Application server
    log.Fatal(http.ListenAndServe(":8080", mux))
}
```

### Code Example 2: Registering pprof on a Custom mux

```go
package main

import (
    "net/http"
    "net/http/pprof"
    "log"
)

func main() {
    // mux for the application
    appMux := http.NewServeMux()
    appMux.HandleFunc("/api/users", handleUsers)

    // Dedicated mux for pprof (with authentication)
    debugMux := http.NewServeMux()
    debugMux.HandleFunc("/debug/pprof/", pprof.Index)
    debugMux.HandleFunc("/debug/pprof/cmdline", pprof.Cmdline)
    debugMux.HandleFunc("/debug/pprof/profile", pprof.Profile)
    debugMux.HandleFunc("/debug/pprof/symbol", pprof.Symbol)
    debugMux.HandleFunc("/debug/pprof/trace", pprof.Trace)

    // Apply authentication middleware
    protectedDebug := basicAuth(debugMux, "admin", "secret-password")

    go func() {
        log.Println("pprof server (auth required): http://localhost:6060/debug/pprof/")
        log.Fatal(http.ListenAndServe("127.0.0.1:6060", protectedDebug))
    }()

    log.Fatal(http.ListenAndServe(":8080", appMux))
}

func basicAuth(next http.Handler, username, password string) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        user, pass, ok := r.BasicAuth()
        if !ok || user != username || pass != password {
            w.Header().Set("WWW-Authenticate", `Basic realm="pprof"`)
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        next.ServeHTTP(w, r)
    })
}
```

### List of pprof Endpoints

| Endpoint | Content | How to Retrieve |
|--------------|------|---------|
| `/debug/pprof/` | Profile list page | Access directly in a browser |
| `/debug/pprof/profile?seconds=30` | CPU profile (30 seconds) | `go tool pprof URL` |
| `/debug/pprof/heap` | Heap memory profile | `go tool pprof URL` |
| `/debug/pprof/allocs` | Cumulative memory allocations | `go tool pprof URL` |
| `/debug/pprof/goroutine` | Goroutine stack traces | `go tool pprof URL` |
| `/debug/pprof/block` | Blocking operation profile | `go tool pprof URL` |
| `/debug/pprof/mutex` | Mutex contention profile | `go tool pprof URL` |
| `/debug/pprof/threadcreate` | OS thread creation profile | `go tool pprof URL` |
| `/debug/pprof/trace?seconds=5` | Execution trace (5 seconds) | `go tool trace` |

### Query Parameters for pprof Endpoints

| Parameter | Applies to | Description | Example |
|-----------|--------|------|-----|
| `seconds` | profile, trace | Sampling period (seconds) | `?seconds=60` |
| `debug` | goroutine, heap, etc. | Text output mode (0=binary, 1=text, 2=detailed) | `?debug=2` |
| `gc` | heap | Run GC before profiling (1=run) | `?gc=1` |

---

## 3. CPU Profiling

### Code Example 3: Using go tool pprof

```bash
# Acquire a CPU profile (30-second sampling)
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30

# Analyze a saved profile
go tool pprof cpu.prof

# Display in Web UI (opens browser)
go tool pprof -http=:8081 cpu.prof

# Focus on a specific function
go tool pprof -focus=handleRequest cpu.prof

# Exclude a specific function
go tool pprof -ignore=runtime cpu.prof

# Text output (for CI)
go tool pprof -text cpu.prof

# Show the diff between two profiles
go tool pprof -diff_base=before.prof after.prof
```

### pprof Interactive Mode

```bash
(pprof) top10
Showing nodes accounting for 4.5s, 90% of 5s total
      flat  flat%   sum%  cum   cum%
      2.0s 40.00% 40.00%  2.0s 40.00%  runtime.memmove
      1.0s 20.00% 60.00%  1.5s 30.00%  encoding/json.(*decodeState).object
      0.5s 10.00% 70.00%  0.5s 10.00%  runtime.mallocgc
      ...

(pprof) list encoding/json.(*decodeState).object
# Display the cost of each line with source code

(pprof) web
# Display the SVG call graph in a browser

(pprof) peek handleRequest
# Display callers/callees of handleRequest

(pprof) tree
# Display in call tree format

(pprof) disasm handleRequest
# Display profile with assembly code
```

### The Difference Between flat and cum

```
+----------------------------------------------------------+
|  Understanding flat vs cum                                |
+----------------------------------------------------------+
|                                                          |
|  func A() {          flat of A = 1s (A's own work)       |
|    doWork() // 1s    cum of A  = 4s (A + B + C total)    |
|    B()      // 3s                                        |
|  }                                                       |
|                                                          |
|  func B() {          flat of B = 1s (B's own work)       |
|    doWork() // 1s    cum of B  = 3s (B + C total)        |
|    C()      // 2s                                        |
|  }                                                       |
|                                                          |
|  func C() {          flat of C = 2s (C's own work)       |
|    doWork() // 2s    cum of C  = 2s (C only)             |
|  }                                                       |
|                                                          |
|  In the top command:                                     |
|  High flat  -> the function itself is heavy              |
|  High cum   -> the function's callees are heavy          |
|  Big gap between flat and cum -> cause is downstream     |
+----------------------------------------------------------+
```

### Code Example 4: Acquiring a CPU Profile from Within the Program

```go
package main

import (
    "flag"
    "log"
    "os"
    "runtime/pprof"
)

var cpuprofile = flag.String("cpuprofile", "", "Output destination for CPU profile")
var memprofile = flag.String("memprofile", "", "Output destination for memory profile")

func main() {
    flag.Parse()

    // Start CPU profile
    if *cpuprofile != "" {
        f, err := os.Create(*cpuprofile)
        if err != nil {
            log.Fatal(err)
        }
        defer f.Close()

        if err := pprof.StartCPUProfile(f); err != nil {
            log.Fatal(err)
        }
        defer pprof.StopCPUProfile()
    }

    // Work to be profiled
    doHeavyWork()

    // Acquire memory profile
    if *memprofile != "" {
        f, err := os.Create(*memprofile)
        if err != nil {
            log.Fatal(err)
        }
        defer f.Close()

        // Run GC to capture the latest memory state
        runtime.GC()
        if err := pprof.WriteHeapProfile(f); err != nil {
            log.Fatal(err)
        }
    }
}
```

### Code Example 5: HTTP Server with Profiling (Conditionally Enabled)

```go
package main

import (
    "log"
    "net/http"
    "os"
    "runtime"
)

func main() {
    // Enable pprof via an environment variable
    if os.Getenv("ENABLE_PPROF") == "true" {
        // Enable Block/Mutex profiling
        runtime.SetBlockProfileRate(1)
        runtime.SetMutexProfileFraction(1)

        // Adjust the sampling rate for memory profiling
        // Default: once every 512KB
        // For more detail: runtime.MemProfileRate = 1 (record every allocation)
        // Production: runtime.MemProfileRate = 524288 (default)

        go func() {
            import _ "net/http/pprof"
            log.Println("pprof enabled on :6060")
            log.Fatal(http.ListenAndServe("127.0.0.1:6060", nil))
        }()
    }

    // Start the application
    srv := &http.Server{Addr: ":8080", Handler: appRouter()}
    log.Fatal(srv.ListenAndServe())
}
```

---

## 4. Memory Profiling

### Code Example 6: Acquiring and Analyzing a Heap Profile

```bash
# Acquire a heap profile
go tool pprof http://localhost:6060/debug/pprof/heap

# Cumulative allocations (total since program start)
go tool pprof -alloc_space http://localhost:6060/debug/pprof/allocs

# Only memory currently in use
go tool pprof -inuse_space http://localhost:6060/debug/pprof/heap

# Number of allocations (object count)
go tool pprof -alloc_objects http://localhost:6060/debug/pprof/allocs

# Number of objects currently in use
go tool pprof -inuse_objects http://localhost:6060/debug/pprof/heap

# Display flame graph in Web UI
go tool pprof -http=:8081 http://localhost:6060/debug/pprof/heap
```

### Comparison of Memory Profile Modes

| Mode | Flag | Measured | Use Case |
|--------|--------|---------|------|
| inuse_space | `-inuse_space` | Amount of memory currently in use | Detecting memory leaks |
| inuse_objects | `-inuse_objects` | Number of objects currently in use | Investigating GC pressure |
| alloc_space | `-alloc_space` | Cumulative allocation size | Identifying hot paths |
| alloc_objects | `-alloc_objects` | Cumulative number of allocations | Identifying frequent allocation sites |

### Memory Profile Analysis Flow

```
+-------------------+     +-------------------+     +-------------------+
| Acquire heap      | --> | Identify          | --> | Identify          |
| profile           |     | allocation sites  |     | hotspots          |
|                   |     | with top / list   |     |                   |
+-------------------+     +-------------------+     +-------------------+
                                                            |
                                                            v
+-------------------+     +-------------------+     +-------------------+
| Apply the         | <-- | Consider          | <-- | sync.Pool?        |
| optimization,     |     | remediation       |     | Preallocate?      |
| verify via        |     | Buffer reuse?     |     |                   |
| benchmarks        |     |                   |     |                   |
+-------------------+     +-------------------+     +-------------------+
```

### Code Example 7: Patterns for Detecting Memory Leaks

```go
// Patterns prone to memory leaks and how to address them
package main

import (
    "context"
    "log"
    "os"
    "runtime"
    "runtime/pprof"
    "time"
)

// NG: goroutine leak
func leakyFunction() {
    for i := 0; i < 1000; i++ {
        go func() {
            ch := make(chan int)
            <-ch // Blocks forever -> goroutine leak
        }()
    }
}

// OK: cancellable via context
func safeFunction(ctx context.Context) {
    for i := 0; i < 1000; i++ {
        go func() {
            ch := make(chan int)
            select {
            case v := <-ch:
                process(v)
            case <-ctx.Done():
                return // Exit cleanly
            }
        }()
    }
}

// Monitor the number of goroutines
func monitorGoroutines() {
    ticker := time.NewTicker(10 * time.Second)
    for range ticker.C {
        log.Printf("goroutine count: %d", runtime.NumGoroutine())
    }
}

// Write the goroutine profile to a file
func dumpGoroutineProfile() {
    f, _ := os.Create("goroutine.prof")
    defer f.Close()
    pprof.Lookup("goroutine").WriteTo(f, 1)
}
```

### Code Example 8: Comparing Memory Leak Snapshots

```go
package main

import (
    "fmt"
    "net/http"
    "os"
    "runtime"
    "runtime/pprof"
    "time"
)

// Compare heap profiles at two points in time to detect leaks
func detectMemoryLeak() {
    // Take snapshot 1
    runtime.GC()
    f1, _ := os.Create("heap_before.prof")
    pprof.WriteHeapProfile(f1)
    f1.Close()

    // Apply load
    runLoad()

    // Wait a while and run GC
    time.Sleep(30 * time.Second)
    runtime.GC()
    time.Sleep(5 * time.Second) // Wait for GC to complete

    // Take snapshot 2
    f2, _ := os.Create("heap_after.prof")
    pprof.WriteHeapProfile(f2)
    f2.Close()

    // Diff analysis
    // go tool pprof -diff_base=heap_before.prof heap_after.prof
    fmt.Println("Run: go tool pprof -http=:8081 -diff_base=heap_before.prof heap_after.prof")
}

// Check memory usage with runtime.ReadMemStats
func printMemStats() {
    var m runtime.MemStats
    runtime.ReadMemStats(&m)

    fmt.Printf("Alloc      = %v MiB\n", m.Alloc/1024/1024)
    fmt.Printf("TotalAlloc = %v MiB\n", m.TotalAlloc/1024/1024)
    fmt.Printf("Sys        = %v MiB\n", m.Sys/1024/1024)
    fmt.Printf("NumGC      = %v\n", m.NumGC)
    fmt.Printf("HeapObjects= %v\n", m.HeapObjects)
    fmt.Printf("HeapInuse  = %v MiB\n", m.HeapInuse/1024/1024)
    fmt.Printf("StackInuse = %v MiB\n", m.StackInuse/1024/1024)
}
```

### Code Example 9: Slice Memory Leak Patterns

```go
// NG: Referencing part of a large slice -> the entire underlying array is not GC'd
func getFirstThree(data []byte) []byte {
    return data[:3]
    // The entire underlying array of data is retained (100MB -> 100MB held)
}

// OK: Copy to break the reference
func getFirstThree(data []byte) []byte {
    result := make([]byte, 3)
    copy(result, data[:3])
    return result
    // data becomes eligible for GC
}

// NG: Case where append leaves excessive capacity
func filterLarge(items []Item) []Item {
    // Filter from a slice of 10000 down to 10
    // But the underlying array still holds capacity for 10000
    var result []Item
    for _, item := range items {
        if item.IsImportant() {
            result = append(result, item)
        }
    }
    return result
}

// OK: Trim capacity as needed
func filterLarge(items []Item) []Item {
    var result []Item
    for _, item := range items {
        if item.IsImportant() {
            result = append(result, item)
        }
    }
    // Trim capacity to match length
    return slices.Clip(result) // Go 1.21+ (= result[:len(result):len(result)])
}
```

---

## 5. Mutex / Block Profiling

### Code Example 10: Mutex Profiling

```go
package main

import (
    "log"
    "net/http"
    _ "net/http/pprof"
    "runtime"
    "sync"
    "time"
)

func main() {
    // Enable Mutex profiling
    // Argument: n -> sample once every n mutex contentions
    // 1 = record every contention (for development)
    // 5 = record once every 5 (for production)
    runtime.SetMutexProfileFraction(5)

    // Enable Block profiling
    // Argument: threshold in nanoseconds
    // 1 = record every blocking event
    // 1000000 = record only blocks of 1ms or longer
    runtime.SetBlockProfileRate(1)

    go func() {
        log.Fatal(http.ListenAndServe(":6060", nil))
    }()

    // Workload that causes Mutex contention
    var mu sync.Mutex
    var counter int

    for i := 0; i < 100; i++ {
        go func() {
            for {
                mu.Lock()
                counter++
                time.Sleep(time.Millisecond)
                mu.Unlock()
            }
        }()
    }

    select {}
}
```

```bash
# Acquire a Mutex profile
go tool pprof http://localhost:6060/debug/pprof/mutex

# Acquire a Block profile
go tool pprof http://localhost:6060/debug/pprof/block

# Inspect in interactive mode
(pprof) top
(pprof) list main.main.func2
(pprof) web
```

### Code Example 11: Analyzing RWMutex Contention

```go
package main

import (
    "fmt"
    "runtime"
    "sync"
    "time"
)

// When reads dominate, RWMutex is more efficient
type Cache struct {
    mu    sync.RWMutex
    items map[string]string
}

func NewCache() *Cache {
    return &Cache{items: make(map[string]string)}
}

func (c *Cache) Get(key string) (string, bool) {
    c.mu.RLock()         // Read lock (allows concurrent reads)
    defer c.mu.RUnlock()
    v, ok := c.items[key]
    return v, ok
}

func (c *Cache) Set(key, value string) {
    c.mu.Lock()          // Write lock (exclusive)
    defer c.mu.Unlock()
    c.items[key] = value
}

// When to use Mutex vs RWMutex
//
// Mutex:
//   - Roughly equal read/write ratio
//   - Simple implementation
//   - Short lock hold time (RWMutex overhead becomes relatively large)
//
// RWMutex:
//   - Overwhelmingly read-heavy (90%+ reads)
//   - Read processing takes time
//   - Concurrent reads provide significant benefit
//
// sync.Map:
//   - Keys are stable (added but not removed)
//   - Overwhelmingly read-heavy
//   - Each goroutine accesses different keys

func benchmarkMutexVsRWMutex() {
    cache := NewCache()
    // Preload
    for i := 0; i < 1000; i++ {
        cache.Set(fmt.Sprintf("key_%d", i), fmt.Sprintf("value_%d", i))
    }

    start := time.Now()
    var wg sync.WaitGroup

    // 95% reads, 5% writes
    for i := 0; i < 100; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            for j := 0; j < 10000; j++ {
                key := fmt.Sprintf("key_%d", j%1000)
                if j%20 == 0 { // 5% writes
                    cache.Set(key, fmt.Sprintf("new_%d", j))
                } else { // 95% reads
                    cache.Get(key)
                }
            }
        }(i)
    }

    wg.Wait()
    fmt.Printf("Duration: %v\n", time.Since(start))
}
```

### Flow for Visualizing Lock Contention

```
+----------------------------------------------------------+
|  Workflow for investigating lock contention              |
+----------------------------------------------------------+
|                                                          |
|  1. Acquire Mutex profile                                |
|     go tool pprof http://localhost:6060/debug/pprof/mutex |
|     |                                                    |
|     v                                                    |
|  2. Identify contended locations with top                |
|     (pprof) top                                          |
|     -> functions with high contentions/delay             |
|     |                                                    |
|     v                                                    |
|  3. Check specific code lines with list                  |
|     (pprof) list MyFunction                              |
|     |                                                    |
|     v                                                    |
|  4. Consider remediations                                |
|     +--> Finer lock granularity (per struct field)       |
|     +--> Switch to RWMutex                               |
|     +--> Replace with sync.Map / atomic                  |
|     +--> Shorten lock hold time                          |
|     +--> Sharding (split into multiple Mutexes)          |
+----------------------------------------------------------+
```

---

## 6. runtime/trace — Execution Traces

### Code Example 12: Acquiring and Analyzing a Trace

```go
package main

import (
    "os"
    "runtime/trace"
)

func main() {
    f, err := os.Create("trace.out")
    if err != nil {
        panic(err)
    }
    defer f.Close()

    // Start the trace
    if err := trace.Start(f); err != nil {
        panic(err)
    }
    defer trace.Stop()

    // Work to be traced
    doWork()
}
```

```bash
# Visualize the trace (opens in a browser)
go tool trace trace.out
```

### Code Example 13: Custom Tasks and Regions

```go
package main

import (
    "context"
    "runtime/trace"
)

func processOrder(ctx context.Context, orderID string) error {
    // Create a task (grouped in the trace UI)
    ctx, task := trace.NewTask(ctx, "processOrder")
    defer task.End()

    // Regions (phases within the task)
    trace.WithRegion(ctx, "validate", func() {
        validateOrder(ctx, orderID)
    })

    trace.WithRegion(ctx, "payment", func() {
        processPayment(ctx, orderID)
    })

    trace.WithRegion(ctx, "shipping", func() {
        createShipment(ctx, orderID)
    })

    // Log events (viewable in the trace UI)
    trace.Log(ctx, "orderID", orderID)

    return nil
}

// Tracing in an HTTP handler
func handleOrder(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context()
    ctx, task := trace.NewTask(ctx, "handleOrder")
    defer task.End()

    trace.WithRegion(ctx, "decode", func() {
        // Decode the request
    })

    trace.WithRegion(ctx, "process", func() {
        // Business logic
    })

    trace.WithRegion(ctx, "respond", func() {
        // Send the response
    })
}
```

### Comparison Table: trace vs pprof

| Item | pprof | trace |
|------|-------|-------|
| Purpose | Identify CPU/memory hotspots | Time-series event analysis |
| Granularity | Function-level statistics | Goroutine-level events |
| Overhead | Low (sampling) | High (records every event) |
| Good for | Wanting to know "what is slow" | Wanting to know "why it is slow" |
| Visualization | Call graph, flame graph | Timeline, goroutine analysis |
| Capture time | 30 seconds to several minutes | A few seconds to 10 seconds recommended |
| GC analysis | Not possible | Detailed GC events visible |
| Network | Not possible | Network waits visible |
| Scheduler | Not possible | P/G/M relationships visible |

### What You Can See with trace

```
+----------------------------------------------------------+
| go tool trace Timeline View                              |
+----------------------------------------------------------+
|                                                          |
| Proc 0  |===G1====|  |==G3==|      |====G1====|         |
| Proc 1  |==G2====|      |==G4==|  |===G2===|            |
| Proc 2    |=G5=|  |===G6===|        |==G5==|            |
| Proc 3      |==G7==|  |=====G8=====|                    |
|                                                          |
| Network |---wait---|  |---wait------|                    |
| GC      |          |GC|             |GC|                 |
|                                                          |
| Time -> 0ms    50ms    100ms    150ms    200ms           |
+----------------------------------------------------------+
  G=goroutine, GC=garbage collection
```

### Code Example 14: GC Analysis via trace

```go
package main

import (
    "fmt"
    "os"
    "runtime"
    "runtime/debug"
    "runtime/trace"
    "time"
)

func main() {
    // Retrieve GC statistics
    var stats debug.GCStats
    debug.ReadGCStats(&stats)
    fmt.Printf("GC count: %d\n", stats.NumGC)
    fmt.Printf("Last GC: %v\n", stats.LastGC)
    fmt.Printf("Total GC time: %v\n", stats.PauseTotal)

    // Configure GC percentage
    // GOGC=100 is the default (GC when heap doubles)
    // GOGC=50 raises GC frequency (latency-focused)
    // GOGC=200 lowers GC frequency (throughput-focused)
    oldGOGC := debug.SetGCPercent(100)
    fmt.Printf("Previous GOGC: %d\n", oldGOGC)

    // Configure memory limit (Go 1.19+)
    // GOMEMLIMIT=1GiB or set from the program
    debug.SetMemoryLimit(1 << 30) // 1 GiB

    // Observe GC behavior with tracing
    f, _ := os.Create("gc_trace.out")
    defer f.Close()
    trace.Start(f)
    defer trace.Stop()

    // Work that allocates a lot of memory
    allocateAndRelease()

    // Check GC timing with: go tool trace gc_trace.out
}

func allocateAndRelease() {
    for i := 0; i < 100; i++ {
        data := make([]byte, 10*1024*1024) // 10MB
        _ = data
        time.Sleep(10 * time.Millisecond)
    }
}
```

### GC Tracing via the GODEBUG Environment Variable

```bash
# Print GC timing and duration to stderr
GODEBUG=gctrace=1 ./myapp

# Example output:
# gc 1 @0.012s 2%: 0.019+0.85+0.003 ms clock, 0.076+0.20/0.75/0+0.012 ms cpu, 4->4->0 MB, 4 MB goal, 0 MB stacks, 0 MB globals, 4 P
#
# How to read:
# gc 1         -> 1st GC
# @0.012s      -> 0.012 seconds after program start
# 2%           -> GC consumed 2% of CPU time
# 0.019+0.85+0.003 ms -> STW sweep start + concurrent + STW mark termination
# 4->4->0 MB   -> heap before GC -> heap after GC -> live data
# 4 MB goal     -> next GC trigger size

# Detailed scheduler info
GODEBUG=schedtrace=1000 ./myapp
# Outputs scheduler state every 1000ms
```

---

## 7. Benchmark-Integrated Profiling

### Code Example 15: Acquiring Profiles from Benchmarks

```bash
# Benchmark with CPU profile
go test -bench=BenchmarkSerialize -cpuprofile=cpu.prof -count=5

# Benchmark with memory profile
go test -bench=BenchmarkSerialize -memprofile=mem.prof -count=5

# Benchmark with trace
go test -bench=BenchmarkSerialize -trace=trace.out

# Benchmark with Block profile
go test -bench=BenchmarkSerialize -blockprofile=block.prof

# Benchmark with Mutex profile
go test -bench=BenchmarkSerialize -mutexprofile=mutex.prof

# Analyze the profiles
go tool pprof cpu.prof
go tool pprof mem.prof
go tool pprof -http=:8081 cpu.prof
```

### Code Example 16: A Memory Allocation Optimization Cycle

```go
// Before optimization
func ConcatStrings(strs []string) string {
    result := ""
    for _, s := range strs {
        result += s // Allocates a new string each time
    }
    return result
}

func BenchmarkConcatStrings(b *testing.B) {
    strs := make([]string, 1000)
    for i := range strs {
        strs[i] = "hello"
    }
    b.ResetTimer()
    b.ReportAllocs()
    for i := 0; i < b.N; i++ {
        ConcatStrings(strs)
    }
}
// BenchmarkConcatStrings    500   2145678 ns/op   5308416 B/op   999 allocs/op

// After optimization: strings.Builder
func ConcatStringsOptimized(strs []string) string {
    var b strings.Builder
    size := 0
    for _, s := range strs {
        size += len(s)
    }
    b.Grow(size) // Pre-allocate capacity
    for _, s := range strs {
        b.WriteString(s)
    }
    return b.String()
}
// BenchmarkConcatStringsOpt  50000   28456 ns/op   5120 B/op   1 allocs/op
//                                    75x faster            999x reduction
```

### Code Example 17: Reducing Allocations with sync.Pool

```go
package main

import (
    "bytes"
    "encoding/json"
    "sync"
    "testing"
)

// Buffer reuse using sync.Pool
var bufPool = sync.Pool{
    New: func() interface{} {
        return new(bytes.Buffer)
    },
}

// Version without Pool
func marshalJSON(v interface{}) ([]byte, error) {
    var buf bytes.Buffer // Allocates every time
    enc := json.NewEncoder(&buf)
    if err := enc.Encode(v); err != nil {
        return nil, err
    }
    return buf.Bytes(), nil
}

// Version with Pool
func marshalJSONPooled(v interface{}) ([]byte, error) {
    buf := bufPool.Get().(*bytes.Buffer)
    buf.Reset()
    defer bufPool.Put(buf)

    enc := json.NewEncoder(buf)
    if err := enc.Encode(v); err != nil {
        return nil, err
    }

    // Copy before returning to Pool (buf will be returned to the Pool)
    result := make([]byte, buf.Len())
    copy(result, buf.Bytes())
    return result, nil
}

func BenchmarkMarshalJSON(b *testing.B) {
    data := map[string]interface{}{"name": "Alice", "age": 30, "active": true}
    b.ReportAllocs()
    for i := 0; i < b.N; i++ {
        marshalJSON(data)
    }
}

func BenchmarkMarshalJSONPooled(b *testing.B) {
    data := map[string]interface{}{"name": "Alice", "age": 30, "active": true}
    b.ReportAllocs()
    for i := 0; i < b.N; i++ {
        marshalJSONPooled(data)
    }
}

// Typical results:
// BenchmarkMarshalJSON-8          500000   3200 ns/op   768 B/op   3 allocs/op
// BenchmarkMarshalJSONPooled-8    800000   1800 ns/op   256 B/op   2 allocs/op
```

### Code Example 18: Optimization via Preallocation

```go
package main

import "testing"

// NG: The underlying array is reallocated on every append
func collectItemsSlow(n int) []int {
    var result []int
    for i := 0; i < n; i++ {
        result = append(result, i*2)
    }
    return result
}

// OK: Pre-allocate capacity
func collectItemsFast(n int) []int {
    result := make([]int, 0, n)
    for i := 0; i < n; i++ {
        result = append(result, i*2)
    }
    return result
}

// Even faster: direct index assignment
func collectItemsFastest(n int) []int {
    result := make([]int, n)
    for i := 0; i < n; i++ {
        result[i] = i * 2
    }
    return result
}

func BenchmarkCollectSlow(b *testing.B) {
    for i := 0; i < b.N; i++ {
        collectItemsSlow(10000)
    }
}

func BenchmarkCollectFast(b *testing.B) {
    for i := 0; i < b.N; i++ {
        collectItemsFast(10000)
    }
}

func BenchmarkCollectFastest(b *testing.B) {
    for i := 0; i < b.N; i++ {
        collectItemsFastest(10000)
    }
}

// Typical results:
// BenchmarkCollectSlow-8      10000   152000 ns/op   386048 B/op   20 allocs/op
// BenchmarkCollectFast-8      50000    28000 ns/op    81920 B/op    1 allocs/op
// BenchmarkCollectFastest-8   50000    25000 ns/op    81920 B/op    1 allocs/op
```

---

## 8. How to Read a Flame Graph

### Flame Graph Structure

```
+----------------------------------------------------------+
|  How to read a flame graph                                |
+----------------------------------------------------------+
|                                                          |
|  X-axis = share of CPU time (wider = more time spent)    |
|  Y-axis = call stack depth (upward = callees)            |
|                                                          |
|  +---------------------------------------------------+   |
|  |                    main.main                       |   |
|  +---------------------------------------------------+   |
|  |         main.handleRequest          | main.other  |   |
|  +-------------------------------------+-------------+   |
|  | main.processData  | main.queryDB   |              |   |
|  +-------------------+----------------+              |   |
|  | json.Unmarshal    | sql.Query      |              |   |
|  +-------------------+----------------+              |   |
|                                                          |
|  -> json.Unmarshal and sql.Query are the main bottlenecks |
|  -> handleRequest accounts for 75% of the total          |
+----------------------------------------------------------+
```

### Key Points to Look For in Flame Graphs

```
1. Wide frames
   -> Functions consuming a lot of CPU time
   -> Prime candidates for optimization

2. Deep call stacks
   -> Deep call hierarchy (refactoring candidates)
   -> Consider inlining when many indirect calls exist

3. The share of runtime.*
   -> Large runtime.mallocgc -> excessive allocations
   -> Large runtime.gcBgMarkWorker -> high GC load
   -> runtime.futex / runtime.notesleep -> lock waits

4. The same function appearing in multiple places
   -> Called from different call paths
   -> Optimizing a hot shared function yields big gains
```

### Code Example 19: Tool for Comparing Benchmark Results

```bash
# Use benchstat to statistically compare benchmark results
# Install
go install golang.org/x/perf/cmd/benchstat@latest

# Benchmark before optimization
go test -bench=. -count=10 -benchmem > before.txt

# Benchmark after optimization
go test -bench=. -count=10 -benchmem > after.txt

# Compare
benchstat before.txt after.txt

# Example output:
# name           old time/op    new time/op    delta
# Serialize-8    2.15ms ± 3%    0.85ms ± 2%   -60.47%  (p=0.000 n=10+10)
#
# name           old alloc/op   new alloc/op   delta
# Serialize-8    5.30MB ± 0%    0.01MB ± 0%   -99.81%  (p=0.000 n=10+10)
#
# name           old allocs/op  new allocs/op  delta
# Serialize-8     999 ± 0%       1 ± 0%       -99.90%  (p=0.000 n=10+10)
```

---

## 9. Continuous Profiling

### The Need for Continuous Profiling

```
+----------------------------------------------------------+
|  Traditional profiling vs continuous profiling           |
+----------------------------------------------------------+
|                                                          |
|  Traditional:                                             |
|  - Acquire profiles only after problems occur            |
|  - Miss hard-to-reproduce problems                       |
|  - Hard to grasp dev vs production performance gaps      |
|                                                          |
|  Continuous:                                              |
|  - Constantly collect profiles                           |
|  - Analyze trends over time (detect regressions)         |
|  - Easy comparison before/after deploys                  |
|  - Can capture low-frequency problems                    |
+----------------------------------------------------------+
```

### Code Example 20: Continuous Profiling with Pyroscope

```go
package main

import (
    "log"
    "net/http"
    "os"

    "github.com/grafana/pyroscope-go"
)

func main() {
    // Pyroscope configuration
    pyroscope.Start(pyroscope.Config{
        ApplicationName: "myapp",
        ServerAddress:   os.Getenv("PYROSCOPE_SERVER"), // e.g. http://pyroscope:4040
        Logger:          pyroscope.StandardLogger,

        // Select which profile types to collect
        ProfileTypes: []pyroscope.ProfileType{
            pyroscope.ProfileCPU,
            pyroscope.ProfileAllocObjects,
            pyroscope.ProfileAllocSpace,
            pyroscope.ProfileInuseObjects,
            pyroscope.ProfileInuseSpace,
            pyroscope.ProfileGoroutines,
            pyroscope.ProfileMutexCount,
            pyroscope.ProfileMutexDuration,
            pyroscope.ProfileBlockCount,
            pyroscope.ProfileBlockDuration,
        },

        // Enable filtering by tags
        Tags: map[string]string{
            "env":     os.Getenv("APP_ENV"),
            "version": version,
            "region":  os.Getenv("AWS_REGION"),
        },
    })

    // Tag a specific piece of work
    pyroscope.TagWrapper(context.Background(), pyroscope.Labels(
        "handler", "processOrder",
        "orderType", "premium",
    ), func(ctx context.Context) {
        processOrder(ctx)
    })

    http.ListenAndServe(":8080", router())
}
```

### Code Example 21: Integration with Google Cloud Profiler

```go
package main

import (
    "log"

    "cloud.google.com/go/profiler"
)

func main() {
    // Google Cloud Profiler configuration
    cfg := profiler.Config{
        Service:        "myapp",
        ServiceVersion: version,
        ProjectID:      "my-gcp-project",
        // MutexProfiling: true,  // Enable Mutex profiling
    }

    if err := profiler.Start(cfg); err != nil {
        log.Printf("Failed to start Cloud Profiler: %v", err)
        // Profiler startup failure should not stop the application
    }

    // Start the application
    startServer()
}
```

### Comparison of Continuous Profiling Tools

| Tool | Provider | Price | Characteristics |
|--------|--------|------|------|
| Pyroscope | Grafana | OSS / Cloud | Grafana integration, rich Go SDK |
| Parca | Polar Signals | OSS | eBPF-based, low overhead |
| Cloud Profiler | Google | Included in GCP usage | GCP integration, easy setup |
| Datadog Profiler | Datadog | Paid | APM integration, rich analytics |
| pprof + custom collection | - | Free | Flexible but high operational cost |

---

## 10. Practical Optimization Patterns

### Code Example 22: HTTP Response Streaming Optimization

```go
package main

import (
    "encoding/json"
    "net/http"
    "sync"
)

// NG: Build the entire response in memory
func handleUsersNG(w http.ResponseWriter, r *http.Request) {
    users, err := db.GetAllUsers() // Loads all users into memory
    if err != nil {
        http.Error(w, err.Error(), 500)
        return
    }
    json.NewEncoder(w).Encode(users) // Encodes a massive JSON at once
}

// OK: Write out incrementally via streaming
func handleUsersOK(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    w.Write([]byte("["))

    rows, err := db.QueryUsers(r.Context())
    if err != nil {
        http.Error(w, err.Error(), 500)
        return
    }
    defer rows.Close()

    enc := json.NewEncoder(w)
    first := true
    for rows.Next() {
        var user User
        if err := rows.Scan(&user); err != nil {
            break
        }
        if !first {
            w.Write([]byte(","))
        }
        first = false
        enc.Encode(user)
    }
    w.Write([]byte("]"))
}
```

### Code Example 23: Pre-sizing Maps

```go
package main

import "testing"

// NG: No size specified -> rehashing happens multiple times
func createMapSlow(n int) map[string]int {
    m := make(map[string]int) // Small initial bucket count
    for i := 0; i < n; i++ {
        m[fmt.Sprintf("key_%d", i)] = i
    }
    return m
}

// OK: Size specified up front -> avoids rehashing
func createMapFast(n int) map[string]int {
    m := make(map[string]int, n) // Pre-reserves needed bucket count
    for i := 0; i < n; i++ {
        m[fmt.Sprintf("key_%d", i)] = i
    }
    return m
}

// Example benchmark results (n=10000):
// BenchmarkMapSlow-8    5000   312000 ns/op   687432 B/op   172 allocs/op
// BenchmarkMapFast-8    8000   198000 ns/op   473440 B/op    12 allocs/op
```

### Code Example 24: Optimizing String Operations

```go
package main

import (
    "fmt"
    "strconv"
    "strings"
    "testing"
)

// NG: fmt.Sprintf uses reflection and is slow
func formatUserSlow(name string, age int) string {
    return fmt.Sprintf("Name: %s, Age: %d", name, age)
}

// OK: strings.Builder + strconv is faster
func formatUserFast(name string, age int) string {
    var b strings.Builder
    b.Grow(20 + len(name)) // Pre-allocate required size
    b.WriteString("Name: ")
    b.WriteString(name)
    b.WriteString(", Age: ")
    b.WriteString(strconv.Itoa(age))
    return b.String()
}

// OK: For a small number of concatenations, the + operator is fine
func formatUserSimple(name string, age int) string {
    return "Name: " + name + ", Age: " + strconv.Itoa(age)
}

// Example benchmark results:
// BenchmarkFormatSlow-8      5000000    280 ns/op   64 B/op   2 allocs/op
// BenchmarkFormatFast-8     15000000     85 ns/op   48 B/op   1 allocs/op
// BenchmarkFormatSimple-8   12000000     95 ns/op   48 B/op   1 allocs/op
```

### Code Example 25: Optimization via Concrete-Type Interface Assertions

```go
package main

import (
    "io"
    "os"
)

// Optimization leveraging the io.WriterTo interface
// Many standard library types implement WriterTo
func copyData(dst io.Writer, src io.Reader) (int64, error) {
    // io.Copy internally checks for WriterTo / ReaderFrom:
    // - If src implements WriterTo, it calls src.WriteTo(dst)
    // - If dst implements ReaderFrom, it calls dst.ReadFrom(src)
    // - If neither, copies via an intermediate buffer
    return io.Copy(dst, src)
}

// Specify buffer size (for large files)
func copyLargeFile(dst io.Writer, src io.Reader) (int64, error) {
    // Use a larger buffer instead of the default 32KB
    buf := make([]byte, 1024*1024) // 1MB buffer
    return io.CopyBuffer(dst, src, buf)
}

// Use a type assertion to pick the optimal path
type Flusher interface {
    Flush() error
}

func writeWithFlush(w io.Writer, data []byte) error {
    if _, err := w.Write(data); err != nil {
        return err
    }
    // Flush if the writer implements Flusher
    if f, ok := w.(Flusher); ok {
        return f.Flush()
    }
    return nil
}
```

---

## 11. Anti-Patterns

### Anti-Pattern 1: Exposing pprof on a Public Port in Production

```go
// NG: pprof on a public port in production
import _ "net/http/pprof"

func main() {
    // pprof is accessible from the outside -> security risk
    http.ListenAndServe(":8080", nil)
}

// OK: Run pprof on a separate port, restricted to the internal network
func main() {
    go func() {
        // Localhost only, or the internal network only
        log.Fatal(http.ListenAndServe("127.0.0.1:6060", nil))
    }()
    http.ListenAndServe(":8080", appHandler)
}
```

### Anti-Pattern 2: Speculative Optimization Without Profiling

```go
// NG: Optimizing by guessing "this part must be slow"
// -> Wastes time on places that aren't actually bottlenecks

// OK: Profile-driven optimization cycle
// 1. Run benchmarks
// 2. Acquire a profile
// 3. Identify hotspots
// 4. Implement improvements
// 5. Verify the effect with benchmarks
// 6. Go back to 1
```

### Anti-Pattern 3: Misusing sync.Pool

```go
// NG: Using sync.Pool for objects that are too small
var intPool = sync.Pool{
    New: func() interface{} {
        v := 0
        return &v // int pointers are so small that Pool overhead dominates
    },
}

// NG: Using an object from the Pool without initializing it
var bufPool = sync.Pool{
    New: func() interface{} {
        return &bytes.Buffer{}
    },
}

func process() {
    buf := bufPool.Get().(*bytes.Buffer)
    defer bufPool.Put(buf)
    // Forgot buf.Reset() -> leftover data from the previous use
    buf.WriteString("new data")
}

// OK: Use Pool with appropriately sized objects and always initialize
var bufPool = sync.Pool{
    New: func() interface{} {
        return bytes.NewBuffer(make([]byte, 0, 4096))
    },
}

func process() {
    buf := bufPool.Get().(*bytes.Buffer)
    buf.Reset() // Always reset
    defer bufPool.Put(buf)
    buf.WriteString("new data")
}
```

### Anti-Pattern 4: Collecting a Trace for Too Long

```go
// NG: Collect a 60-second trace -> enormous data, UI freezes
// go tool trace trace_60s.out -> browser crashes

// OK: Limit traces to a short window (1-5 seconds)
// curl "http://localhost:6060/debug/pprof/trace?seconds=3" > trace.out
// go tool trace trace.out

// To trace a specific operation, control it from within the program
func traceOperation(ctx context.Context) error {
    f, _ := os.CreateTemp("", "trace_*.out")
    defer f.Close()

    trace.Start(f)
    defer trace.Stop()

    // Target operation (should complete quickly)
    return doOperation(ctx)
}
```

### Anti-Pattern 5: Running Production with MemProfileRate Set to 1

```go
// NG: Records every allocation (significant performance impact)
func init() {
    runtime.MemProfileRate = 1 // Records every allocation
}

// OK: Use the default value in production
// The default for runtime.MemProfileRate is 524288 (512KB)
// Adjust only if necessary
func init() {
    if os.Getenv("DETAILED_MEMPROFILE") == "true" {
        runtime.MemProfileRate = 1 // Only during debugging
    }
    // Otherwise use the default (sample once per 512KB)
}
```

---

## FAQ

### Q1. Is the overhead of profiling acceptable in production?

Merely having the `net/http/pprof` endpoints present adds virtually zero overhead. CPU profiling only samples while requests are in flight, typically causing a 1-5% impact. Memory profiling is controlled by `runtime.MemProfileRate`, sampling once every 512KB by default. Block/Mutex profiling is controlled via `SetBlockProfileRate` / `SetMutexProfileFraction`, and a low sampling rate is recommended in production.

### Q2. How do I read a flame graph?

A flame graph uses the X-axis for the share of CPU time and the Y-axis for the call stack depth. Wide frames are bottlenecks. Functions higher up are callees. You can view it via the Flame Graph tab of `go tool pprof -http=:8081 cpu.prof`. A wide `runtime.mallocgc` indicates excessive allocations; a wide `runtime.gcBgMarkWorker` indicates high GC load.

### Q3. How do I detect goroutine leaks?

Periodically log `runtime.NumGoroutine()` and watch for an upward trend. Check goroutine stack traces at `/debug/pprof/goroutine?debug=1`; if many goroutines share the same stack trace, a leak is likely. Integrating the `goleak` package (`go.uber.org/goleak`) into tests lets you detect unfinished goroutines at the end of a test.

```go
// Goroutine leak detection test using goleak
func TestMain(m *testing.M) {
    goleak.VerifyTestMain(m)
}

// When used per-test
func TestSomething(t *testing.T) {
    defer goleak.VerifyNone(t)
    // test code
}
```

### Q4. What views are available in the pprof Web UI?

The Web UI launched by `go tool pprof -http=:8081 profile.prof` offers the following views:
- **Top**: Ranking of CPU/memory consumption by function
- **Graph**: Call graph (call relationships between functions)
- **Flame Graph**: Flame graph (width = cost, height = call stack depth)
- **Peek**: Callers and callees of a specific function
- **Source**: Cost displayed over the source code
- **Disasm**: Cost displayed over the assembly code

### Q5. How should I choose between GOGC and GOMEMLIMIT?

`GOGC` triggers GC based on heap growth rate (default 100 = GC when heap doubles). `GOMEMLIMIT` (Go 1.19+) sets a memory upper bound and aggressively runs GC as it nears the limit. In container environments, setting `GOMEMLIMIT` to 80-90% of the container's memory limit is recommended. You can also combine both.

```bash
# Example recommended settings for a container environment
# Container memory limit: 1GB
GOMEMLIMIT=900MiB  # 90% of the memory limit
GOGC=100            # default (combined with GOMEMLIMIT)
```

### Q6. Why do benchmark results vary every run?

Causes include CPU thermal throttling, interference from other processes, and OS scheduling. To get stable results: (1) run `-count=10` multiple times and use `benchstat` for statistical processing, (2) pin CPUs with `taskset` / `cpuset`, (3) disable turbo boost, (4) minimize other processes. CI environments are noisy, so local measurement is recommended.

### Q7. How do I check the results of Escape Analysis?

```bash
# Check escapes to the heap
go build -gcflags="-m" ./...

# More detailed info
go build -gcflags="-m -m" ./...

# Example output:
# ./main.go:15:6: can inline NewUser
# ./main.go:20:10: &User{...} escapes to heap
# -> confirms that "&User{...}" is allocated on the heap
```

Values allocated on the stack don't burden the GC, so they are faster. Common causes of escaping to the heap: (1) returning a pointer, (2) assigning to an interface, (3) captured by a closure, (4) size too large (typically 64KB+).

---

## Summary

| Concept | Key Point |
|------|------|
| net/http/pprof | Acquire profiles via HTTP endpoints |
| go tool pprof | Tool for analyzing and visualizing profiles |
| CPU profile | Identify CPU consumption time per function |
| Heap profile | Identify memory allocation hotspots |
| goroutine profile | Detect goroutine leaks |
| Mutex/Block profile | Analyze lock contention and blocking operations |
| runtime/trace | Visualize time-series events |
| -bench + -cpuprofile | Integrate benchmarks and profiles |
| b.ReportAllocs() | Measure allocation counts |
| sync.Pool | Reduce allocations via object reuse |
| benchstat | Statistical comparison of benchmark results |
| GOGC / GOMEMLIMIT | Control GC behavior |
| Continuous profiling | Pyroscope / Parca / Cloud Profiler |
| Escape Analysis | Check heap allocations with `go build -gcflags="-m"` |

---

## Guides to Read Next

- **03-tools/03-deployment.md** — Deployment: Docker, cross-compilation
- **03-tools/04-best-practices.md** — Best Practices: Effective Go
- **02-web/04-testing.md** — Testing: table-driven tests, testify, httptest

---

## References

1. **Go Blog — Profiling Go Programs** https://go.dev/blog/pprof
2. **Go Official — runtime/pprof package** https://pkg.go.dev/runtime/pprof
3. **Go Official — runtime/trace package** https://pkg.go.dev/runtime/trace
4. **Julia Evans — A Practical Guide to pprof** https://jvns.ca/blog/2017/09/24/profiling-go-with-pprof/
5. **Go Official — runtime/debug package** https://pkg.go.dev/runtime/debug
6. **Pyroscope Official Documentation** https://pyroscope.io/docs/
7. **Google Cloud Profiler** https://cloud.google.com/profiler/docs
8. **benchstat tool** https://pkg.go.dev/golang.org/x/perf/cmd/benchstat



===== SOURCE: 02-programming/go-practical-guide/docs/03-tools/03-deployment.md =====

# Go Deployment Guide

> Build and deploy Go applications efficiently using Docker and cross-compilation

## What You Will Learn in This Chapter

1. How to build minimal container images with **Docker multi-stage builds**
2. Generating multi-platform binaries via **cross-compilation**
3. Automating build, test, and deploy in **CI/CD pipelines**
4. **Kubernetes deployment** -- manifest design, health checks, resource management
5. **Serverless deployment** -- AWS Lambda, Google Cloud Run
6. **Graceful Shutdown** -- safe process termination and connection management
7. **Configuration management** -- environment variables, config files, secret management


## Prerequisites

Reading this guide will be more effective if you have the following knowledge:

- Basic programming knowledge
- Understanding of related fundamental concepts
- Understanding the contents of the [Go Profiling Guide](./02-profiling.md)

---

## 1. Characteristics of Go Binaries and Deployment Strategies

### Choosing a Deployment Method

```
Want to deploy a Go app
        |
        +-- Single binary distribution
        |       |
        |       +-- Cross-compile → GitHub Releases
        |       +-- Automate with GoReleaser
        |       +-- Distribute via Homebrew tap
        |
        +-- Container deployment
        |       |
        |       +-- Docker multi-stage build
        |       +-- distroless / scratch base
        |       +-- Kubernetes / ECS / Cloud Run
        |
        +-- Serverless
        |       |
        |       +-- AWS Lambda (provided.al2023)
        |       +-- Google Cloud Functions (Go 1.22+)
        |       +-- Google Cloud Run (container)
        |       +-- Azure Functions
        |
        +-- PaaS
                |
                +-- Google App Engine
                +-- Heroku (Container Stack)
                +-- Fly.io
                +-- Railway
```

### Characteristics of Go Binaries

```
+------------------------------------------+
|  Go binary (statically linked)           |
+------------------------------------------+
|                                          |
|  +----------------+  +-----------------+ |
|  | App code       |  | Go runtime      | |
|  | Business logic |  | GC, scheduler   | |
|  +----------------+  +-----------------+ |
|                                          |
|  +----------------+  +-----------------+ |
|  | Standard lib   |  | Dependencies    | |
|  | net/http, etc  |  | All embedded    | |
|  +----------------+  +-----------------+ |
|                                          |
|  → No external dependencies, runs standalone |
|  → CGO_ENABLED=0 for fully static linking |
|  → Startup time: a few milliseconds      |
|  → Typical size: 10-30 MB                |
+------------------------------------------+

With CGO_ENABLED=0:
  ┌─────────────────────────────────────┐
  │ Go Runtime + App Code               │
  │ Everything implemented in Go (no C) │
  │ → Runnable on scratch/distroless    │
  └─────────────────────────────────────┘

With CGO_ENABLED=1:
  ┌─────────────────────────────────────┐
  │ Go Runtime + App Code               │
  │ + libc (glibc/musl)                 │
  │ → Requires alpine (musl) or         │
  │   debian (glibc) base image         │
  └─────────────────────────────────────┘
```

---

## 2. Docker Multi-Stage Builds

### Code Example 1: Production Dockerfile

```dockerfile
# ============================================
# Stage 1: Build stage
# ============================================
FROM golang:1.22-alpine AS builder

# Security updates and build tools
RUN apk add --no-cache git ca-certificates tzdata

# Build as non-root user (improved security)
RUN adduser -D -g '' appuser

# Dependency cache layer
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download && go mod verify

# Copy source and build
COPY . .

# Build arguments
ARG VERSION=dev
ARG BUILD_TIME=unknown
ARG GIT_COMMIT=unknown

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build \
    -trimpath \
    -ldflags="-w -s \
        -X main.version=${VERSION} \
        -X main.buildTime=${BUILD_TIME} \
        -X main.gitCommit=${GIT_COMMIT}" \
    -o /app/server ./cmd/server

# ============================================
# Stage 2: Runtime stage (minimal image)
# ============================================
FROM gcr.io/distroless/static-debian12

# Copy timezone data and certificates
COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

# Copy non-root user info
COPY --from=builder /etc/passwd /etc/passwd

# Run as non-root user
USER appuser

# Copy binary
COPY --from=builder /app/server /server

# Copy config files or migrations as needed
# COPY --from=builder /app/migrations /migrations
# COPY --from=builder /app/configs /configs

EXPOSE 8080

# Health check endpoint
# HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
#   CMD ["/server", "healthcheck"] || exit 1

ENTRYPOINT ["/server"]
```

### Code Example 2: Docker Compose (development environment)

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      args:
        VERSION: dev
        BUILD_TIME: "2024-01-01T00:00:00Z"
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb?sslmode=disable
      - REDIS_URL=redis://redis:6379/0
      - LOG_LEVEL=debug
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./migrations/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mydb"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  # For development: hot reload
  app-dev:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "8080:8080"
    volumes:
      - .:/app
    environment:
      - DATABASE_URL=postgres://user:pass@db:5432/mydb?sslmode=disable
    depends_on:
      - db
    profiles:
      - dev

volumes:
  postgres_data:
  redis_data:
```

```dockerfile
# Dockerfile.dev -- for development (hot reload enabled)
FROM golang:1.22-alpine

RUN go install github.com/air-verse/air@latest

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .

CMD ["air", "-c", ".air.toml"]
```

```toml
# .air.toml
root = "."
tmp_dir = "tmp"

[build]
  cmd = "go build -o ./tmp/server ./cmd/server"
  bin = "tmp/server"
  full_bin = "./tmp/server"
  include_ext = ["go", "tpl", "tmpl", "html", "sql"]
  exclude_dir = ["assets", "tmp", "vendor", "node_modules"]
  delay = 1000

[log]
  time = false

[color]
  main = "magenta"
  watcher = "cyan"
  build = "yellow"
  runner = "green"
```

### Docker Image Size Comparison

```
+----------------------------------------------+
| Size comparison by base image                |
+----------------------------------------------+
|                                              |
| golang:1.22          |████████████| 850 MB   |
| golang:1.22-alpine   |██████|      350 MB   |
| alpine:3.19          |█|            7 MB    |
| distroless/static    |░|            2 MB    |
| scratch              |░|            0 MB    |
|                                              |
| Final image (distroless + Go binary)         |
|                      |██|          15-20 MB  |
|                                              |
| Final image (scratch + Go binary)            |
|                      |█|           10-15 MB  |
+----------------------------------------------+
```

### Code Example 3: Minimal image based on scratch

```dockerfile
FROM golang:1.22-alpine AS builder

# Obtain certificates for TLS
RUN apk add --no-cache ca-certificates tzdata

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build -trimpath -ldflags="-w -s" -o /app/server ./cmd/server

# scratch: completely empty image
FROM scratch

# Required for TLS communication
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

# Timezone information
COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo

# Binary
COPY --from=builder /app/server /server

EXPOSE 8080
ENTRYPOINT ["/server"]
```

### Base Image Comparison Table

| Base image | Size | Shell | Package manager | Debugging | Security | Use case |
|--------------|--------|--------|-------------------|---------|------------|------|
| golang:1.22 | 850MB | bash | apt | Easy | Large attack surface | Development only |
| golang:1.22-alpine | 350MB | ash | apk | Possible | Good | Build stage |
| alpine:3.19 | 7MB | ash | apk | Possible | Good | When CGO is needed |
| distroless/static | 2MB | None | None | Difficult | Very good | Recommended for production |
| scratch | 0MB | None | None | Very difficult | Highest | Minimal configuration |

### Code Example 4: Debuggable image

```dockerfile
# Variant adding debug tools to the production image
FROM gcr.io/distroless/static-debian12:debug AS debug

COPY --from=builder /app/server /server

# The debug tag includes a busybox shell
# kubectl exec -it <pod> -- /busybox/sh
ENTRYPOINT ["/server"]

# Usage:
# Production: gcr.io/distroless/static-debian12 (no shell, minimal attack surface)
# Debug: gcr.io/distroless/static-debian12:debug (with busybox)
```

---

## 3. Cross-Compilation

### Code Example 5: Multi-platform builds

```bash
# Linux AMD64 (servers, CI/CD)
GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -o myapp-linux-amd64 ./cmd/myapp

# Linux ARM64 (AWS Graviton, Raspberry Pi 4)
GOOS=linux GOARCH=arm64 CGO_ENABLED=0 go build -o myapp-linux-arm64 ./cmd/myapp

# Linux ARM v7 (Raspberry Pi 3, older ARM)
GOOS=linux GOARCH=arm GOARM=7 CGO_ENABLED=0 go build -o myapp-linux-armv7 ./cmd/myapp

# macOS Intel
GOOS=darwin GOARCH=amd64 CGO_ENABLED=0 go build -o myapp-darwin-amd64 ./cmd/myapp

# macOS Apple Silicon
GOOS=darwin GOARCH=arm64 CGO_ENABLED=0 go build -o myapp-darwin-arm64 ./cmd/myapp

# Windows
GOOS=windows GOARCH=amd64 CGO_ENABLED=0 go build -o myapp-windows-amd64.exe ./cmd/myapp

# List of supported OS/ARCH combinations
go tool dist list
```

### Code Example 6: Managing builds with a Makefile

```makefile
APP_NAME := myapp
VERSION := $(shell git describe --tags --always --dirty)
BUILD_TIME := $(shell date -u +%Y-%m-%dT%H:%M:%SZ)
GIT_COMMIT := $(shell git rev-parse --short HEAD)
LDFLAGS := -ldflags "-w -s \
    -X main.version=$(VERSION) \
    -X main.buildTime=$(BUILD_TIME) \
    -X main.gitCommit=$(GIT_COMMIT)"

# Go build flags
GO_BUILD := CGO_ENABLED=0 go build -trimpath $(LDFLAGS)

# Targets
.PHONY: build build-all test lint clean docker docker-push help

## help: Display help
help:
	@grep -E '^## ' $(MAKEFILE_LIST) | sed 's/## //'

## build: Local build
build:
	$(GO_BUILD) -o bin/$(APP_NAME) ./cmd/$(APP_NAME)

## build-all: Build for all platforms
build-all:
	GOOS=linux   GOARCH=amd64 $(GO_BUILD) -o bin/$(APP_NAME)-linux-amd64 ./cmd/$(APP_NAME)
	GOOS=linux   GOARCH=arm64 $(GO_BUILD) -o bin/$(APP_NAME)-linux-arm64 ./cmd/$(APP_NAME)
	GOOS=darwin  GOARCH=amd64 $(GO_BUILD) -o bin/$(APP_NAME)-darwin-amd64 ./cmd/$(APP_NAME)
	GOOS=darwin  GOARCH=arm64 $(GO_BUILD) -o bin/$(APP_NAME)-darwin-arm64 ./cmd/$(APP_NAME)
	GOOS=windows GOARCH=amd64 $(GO_BUILD) -o bin/$(APP_NAME)-windows-amd64.exe ./cmd/$(APP_NAME)

## test: Run tests
test:
	go test -race -cover -coverprofile=coverage.out ./...

## test-integration: Integration tests
test-integration:
	go test -race -tags=integration -cover ./...

## lint: Linter check
lint:
	golangci-lint run ./...

## fmt: Code formatting
fmt:
	gofmt -w .
	goimports -w .

## vet: Static analysis
vet:
	go vet ./...

## docker: Build Docker image
docker:
	docker build \
		--build-arg VERSION=$(VERSION) \
		--build-arg BUILD_TIME=$(BUILD_TIME) \
		--build-arg GIT_COMMIT=$(GIT_COMMIT) \
		-t $(APP_NAME):$(VERSION) \
		-t $(APP_NAME):latest .

## docker-push: Push Docker image
docker-push: docker
	docker tag $(APP_NAME):$(VERSION) ghcr.io/myorg/$(APP_NAME):$(VERSION)
	docker push ghcr.io/myorg/$(APP_NAME):$(VERSION)

## docker-multi: Multi-architecture build
docker-multi:
	docker buildx build \
		--platform linux/amd64,linux/arm64 \
		--build-arg VERSION=$(VERSION) \
		-t ghcr.io/myorg/$(APP_NAME):$(VERSION) \
		--push .

## migrate-up: Run migrations
migrate-up:
	migrate -path ./migrations -database $(DATABASE_URL) up

## migrate-down: Rollback migration
migrate-down:
	migrate -path ./migrations -database $(DATABASE_URL) down 1

## migrate-create: Create a migration file
migrate-create:
	@read -p "Migration name: " name; \
	migrate create -ext sql -dir ./migrations -seq $$name

## clean: Remove build artifacts
clean:
	rm -rf bin/ tmp/ coverage.out

## coverage: Display coverage report
coverage: test
	go tool cover -html=coverage.out -o coverage.html
	open coverage.html
```

### Code Example 7: Embedding variables at build time

```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "os"
    "runtime"
    "runtime/debug"
)

// Injected at build time via -ldflags
var (
    version   = "dev"
    buildTime = "unknown"
    gitCommit = "unknown"
)

// BuildInfo represents build information
type BuildInfo struct {
    Version   string `json:"version"`
    BuildTime string `json:"build_time"`
    GitCommit string `json:"git_commit"`
    GoVersion string `json:"go_version"`
    OS        string `json:"os"`
    Arch      string `json:"arch"`
    Compiler  string `json:"compiler"`
}

// GetBuildInfo retrieves build information
func GetBuildInfo() BuildInfo {
    info := BuildInfo{
        Version:   version,
        BuildTime: buildTime,
        GitCommit: gitCommit,
        GoVersion: runtime.Version(),
        OS:        runtime.GOOS,
        Arch:      runtime.GOARCH,
        Compiler:  runtime.Compiler,
    }

    // Module info can also be obtained via debug.ReadBuildInfo()
    if bi, ok := debug.ReadBuildInfo(); ok {
        for _, s := range bi.Settings {
            switch s.Key {
            case "vcs.revision":
                if info.GitCommit == "unknown" {
                    info.GitCommit = s.Value
                }
            }
        }
    }

    return info
}

// HandleVersion is an HTTP handler that returns version info as JSON
func HandleVersion(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(GetBuildInfo())
}

// PrintVersion prints version information to standard output
func PrintVersion() {
    info := GetBuildInfo()
    fmt.Printf("%s version %s\n", os.Args[0], info.Version)
    fmt.Printf("  Built:    %s\n", info.BuildTime)
    fmt.Printf("  Commit:   %s\n", info.GitCommit)
    fmt.Printf("  Go:       %s\n", info.GoVersion)
    fmt.Printf("  OS/Arch:  %s/%s\n", info.OS, info.Arch)
}

func main() {
    // Handle --version flag
    if len(os.Args) > 1 && (os.Args[1] == "--version" || os.Args[1] == "-v") {
        PrintVersion()
        return
    }

    // Start server
    http.HandleFunc("/version", HandleVersion)
    http.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
        w.Write([]byte("ok"))
    })

    fmt.Printf("Starting server %s on :8080\n", version)
    if err := http.ListenAndServe(":8080", nil); err != nil {
        fmt.Fprintf(os.Stderr, "Server error: %v\n", err)
        os.Exit(1)
    }
}
```

---

## 4. Graceful Shutdown

### Code Example 8: Production-ready Graceful Shutdown

```go
package main

import (
    "context"
    "database/sql"
    "fmt"
    "log"
    "net/http"
    "os"
    "os/signal"
    "sync"
    "syscall"
    "time"
)

// App manages the entire application
type App struct {
    httpServer *http.Server
    db         *sql.DB
    wg         sync.WaitGroup
}

// NewApp initializes the application
func NewApp(db *sql.DB) *App {
    mux := http.NewServeMux()

    app := &App{
        db: db,
        httpServer: &http.Server{
            Addr:         ":8080",
            Handler:      mux,
            ReadTimeout:  15 * time.Second,
            WriteTimeout: 15 * time.Second,
            IdleTimeout:  60 * time.Second,
        },
    }

    mux.HandleFunc("/healthz", app.handleHealth)
    mux.HandleFunc("/readyz", app.handleReady)
    mux.HandleFunc("/api/", app.handleAPI)

    return app
}

// Run starts the server and performs Graceful Shutdown on signal
func (app *App) Run() error {
    // Start server
    errCh := make(chan error, 1)
    go func() {
        log.Printf("Server starting on %s", app.httpServer.Addr)
        if err := app.httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            errCh <- err
        }
    }()

    // Wait for signal
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

    select {
    case err := <-errCh:
        return fmt.Errorf("server error: %w", err)
    case sig := <-quit:
        log.Printf("Received signal: %s", sig)
    }

    // Graceful Shutdown
    return app.Shutdown()
}

// Shutdown safely stops the application
func (app *App) Shutdown() error {
    log.Println("Starting graceful shutdown...")

    // Phase 1: Stop accepting new requests
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()

    // Shutdown HTTP server (wait for in-flight requests to complete)
    if err := app.httpServer.Shutdown(ctx); err != nil {
        log.Printf("HTTP server shutdown error: %v", err)
    }

    // Phase 2: Wait for background tasks to complete
    done := make(chan struct{})
    go func() {
        app.wg.Wait()
        close(done)
    }()

    select {
    case <-done:
        log.Println("All background tasks completed")
    case <-ctx.Done():
        log.Println("Timeout waiting for background tasks")
    }

    // Phase 3: Clean up resources
    if app.db != nil {
        if err := app.db.Close(); err != nil {
            log.Printf("DB close error: %v", err)
        }
    }

    log.Println("Graceful shutdown completed")
    return nil
}

// handleHealth is for the Liveness probe
func (app *App) handleHealth(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK)
    w.Write([]byte("ok"))
}

// handleReady is for the Readiness probe
func (app *App) handleReady(w http.ResponseWriter, r *http.Request) {
    if err := app.db.PingContext(r.Context()); err != nil {
        http.Error(w, "db not ready", http.StatusServiceUnavailable)
        return
    }
    w.WriteHeader(http.StatusOK)
    w.Write([]byte("ready"))
}

// handleAPI is a business logic handler
func (app *App) handleAPI(w http.ResponseWriter, r *http.Request) {
    // Track background tasks
    app.wg.Add(1)
    defer app.wg.Done()

    // Processing...
    w.Write([]byte("ok"))
}
```

---

## 5. CI/CD Pipelines

### Code Example 9: GitHub Actions workflow (full configuration)

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

permissions:
  contents: read

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with:
          go-version: '1.22'
      - name: golangci-lint
        uses: golangci/golangci-lint-action@v4
        with:
          version: latest

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: testdb
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with:
          go-version: '1.22'
      - name: Run tests
        env:
          DATABASE_URL: postgres://test:test@localhost:5432/testdb?sslmode=disable
        run: |
          go test -race -coverprofile=coverage.out -covermode=atomic ./...
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage.out

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with:
          go-version: '1.22'
      - name: Run govulncheck
        run: |
          go install golang.org/x/vuln/cmd/govulncheck@latest
          govulncheck ./...
      - name: Run gosec
        uses: securego/gosec@master
        with:
          args: ./...

  build:
    needs: [lint, test, security]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with:
          go-version: '1.22'
      - name: Build
        run: |
          CGO_ENABLED=0 go build -trimpath -ldflags="-w -s" -o bin/server ./cmd/server
      - uses: actions/upload-artifact@v4
        with:
          name: server
          path: bin/server
```

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

permissions:
  contents: write
  packages: write

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with:
          go-version: '1.22'
      - run: go test -race -cover ./...

  release:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-go@v5
        with:
          go-version: '1.22'
      - uses: goreleaser/goreleaser-action@v5
        with:
          version: latest
          args: release --clean
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  docker:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v5
        with:
          push: true
          platforms: linux/amd64,linux/arm64
          build-args: |
            VERSION=${{ github.ref_name }}
            BUILD_TIME=${{ github.event.head_commit.timestamp }}
            GIT_COMMIT=${{ github.sha }}
          tags: |
            ghcr.io/${{ github.repository }}:${{ github.ref_name }}
            ghcr.io/${{ github.repository }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

### CI/CD Pipeline Flow

```
Pull Request → merge to main
    │
    ▼
┌─────────────────────────────────────────────┐
│  CI Pipeline (on push / PR)                  │
│                                             │
│  ┌──────────┐ ┌──────────┐ ┌─────────────┐ │
│  │   Lint   │ │   Test   │ │  Security   │ │
│  │golangci  │ │ go test  │ │ govulncheck │ │
│  │ -lint    │ │ -race    │ │ gosec       │ │
│  └──────────┘ └──────────┘ └─────────────┘ │
│       │            │              │         │
│       └────────────┼──────────────┘         │
│                    ▼                        │
│             ┌──────────┐                    │
│             │  Build   │                    │
│             │ artifact │                    │
│             └──────────┘                    │
└─────────────────────────────────────────────┘

git tag v1.2.3 && git push --tags
    │
    ▼
┌─────────────────────────────────────────────┐
│  Release Pipeline (on tag)                   │
│                                             │
│  ┌──────────┐                               │
│  │   Test   │                               │
│  └────┬─────┘                               │
│       │ PASS                                │
│       ▼                                     │
│  ┌──────────┐    ┌──────────────────────┐   │
│  │GoReleaser│    │  Docker Build        │   │
│  │          │    │                      │   │
│  │ linux/   │    │ linux/amd64 image    │   │
│  │  amd64   │    │ linux/arm64 image    │   │
│  │  arm64   │    │                      │   │
│  │ darwin/  │    │ → ghcr.io push       │   │
│  │  amd64   │    └──────────────────────┘   │
│  │  arm64   │                               │
│  │ windows/ │                               │
│  │  amd64   │                               │
│  │          │                               │
│  │ → GitHub │                               │
│  │  Release │                               │
│  └──────────┘                               │
└─────────────────────────────────────────────┘
```

---

## 6. GoReleaser Configuration

### Code Example 10: .goreleaser.yaml (full configuration)

```yaml
# .goreleaser.yaml
version: 2
project_name: myapp

before:
  hooks:
    - go mod tidy
    - go mod verify
    - go test ./...
    - go vet ./...

builds:
  - id: server
    main: ./cmd/server
    binary: myapp-server
    env:
      - CGO_ENABLED=0
    goos:
      - linux
      - darwin
      - windows
    goarch:
      - amd64
      - arm64
    ignore:
      - goos: windows
        goarch: arm64
    ldflags:
      - -s -w
      - -X main.version={{.Version}}
      - -X main.buildTime={{.Date}}
      - -X main.gitCommit={{.Commit}}
    flags:
      - -trimpath

  - id: cli
    main: ./cmd/cli
    binary: myapp
    env:
      - CGO_ENABLED=0
    goos:
      - linux
      - darwin
      - windows
    goarch:
      - amd64
      - arm64

archives:
  - id: server-archive
    builds:
      - server
    format: tar.gz
    name_template: "{{ .ProjectName }}-server_{{ .Os }}_{{ .Arch }}"
    format_overrides:
      - goos: windows
        format: zip
    files:
      - LICENSE
      - README.md
      - migrations/**/*

  - id: cli-archive
    builds:
      - cli
    format: tar.gz
    name_template: "{{ .ProjectName }}_{{ .Os }}_{{ .Arch }}"
    format_overrides:
      - goos: windows
        format: zip

dockers:
  - image_templates:
      - "ghcr.io/myorg/myapp:{{ .Version }}-amd64"
    use: buildx
    ids:
      - server
    build_flag_templates:
      - "--platform=linux/amd64"
      - "--label=org.opencontainers.image.source=https://github.com/myorg/myapp"
    goarch: amd64

  - image_templates:
      - "ghcr.io/myorg/myapp:{{ .Version }}-arm64"
    use: buildx
    ids:
      - server
    build_flag_templates:
      - "--platform=linux/arm64"
    goarch: arm64

docker_manifests:
  - name_template: "ghcr.io/myorg/myapp:{{ .Version }}"
    image_templates:
      - "ghcr.io/myorg/myapp:{{ .Version }}-amd64"
      - "ghcr.io/myorg/myapp:{{ .Version }}-arm64"
  - name_template: "ghcr.io/myorg/myapp:latest"
    image_templates:
      - "ghcr.io/myorg/myapp:{{ .Version }}-amd64"
      - "ghcr.io/myorg/myapp:{{ .Version }}-arm64"

brews:
  - name: myapp
    repository:
      owner: myorg
      name: homebrew-tap
    directory: Formula
    homepage: "https://github.com/myorg/myapp"
    description: "My awesome app"
    license: "MIT"
    install: |
      bin.install "myapp"
    test: |
      system "#{bin}/myapp", "--version"

checksum:
  name_template: 'checksums.txt'

changelog:
  sort: asc
  groups:
    - title: Features
      regexp: '^.*?feat(\(.+\))?\!?:.+$'
      order: 0
    - title: Bug fixes
      regexp: '^.*?fix(\(.+\))?\!?:.+$'
      order: 1
    - title: Others
      order: 999
  filters:
    exclude:
      - '^docs:'
      - '^test:'
      - '^chore:'
```

---

## 7. Kubernetes Deployment

### Code Example 11: Kubernetes manifests

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  labels:
    app: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  template:
    metadata:
      labels:
        app: myapp
    spec:
      serviceAccountName: myapp
      securityContext:
        runAsNonRoot: true
        runAsUser: 65534
        fsGroup: 65534
      containers:
        - name: myapp
          image: ghcr.io/myorg/myapp:v1.0.0
          ports:
            - containerPort: 8080
              name: http
              protocol: TCP
          env:
            - name: LOG_LEVEL
              value: "info"
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: myapp-secrets
                  key: database-url
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 256Mi
          # Liveness: whether the process is alive
          livenessProbe:
            httpGet:
              path: /healthz
              port: http
            initialDelaySeconds: 5
            periodSeconds: 10
            timeoutSeconds: 3
            failureThreshold: 3
          # Readiness: whether it can accept traffic
          readinessProbe:
            httpGet:
              path: /readyz
              port: http
            initialDelaySeconds: 5
            periodSeconds: 5
            timeoutSeconds: 3
            failureThreshold: 3
          # Startup: whether startup has completed (for slow starts)
          startupProbe:
            httpGet:
              path: /healthz
              port: http
            initialDelaySeconds: 0
            periodSeconds: 3
            failureThreshold: 10
      terminationGracePeriodSeconds: 30
---
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  selector:
    app: myapp
  ports:
    - port: 80
      targetPort: http
      protocol: TCP
  type: ClusterIP
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
---
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: myapp
spec:
  minAvailable: 1
  selector:
    matchLabels:
      app: myapp
```

---

## 8. Serverless Deployment

### Code Example 12: AWS Lambda

```go
package main

import (
    "context"
    "encoding/json"

    "github.com/aws/aws-lambda-go/events"
    "github.com/aws/aws-lambda-go/lambda"
)

// Handler is the Lambda handler
func Handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
    // Process the request
    body := map[string]interface{}{
        "message": "Hello from Lambda!",
        "path":    request.Path,
        "method":  request.HTTPMethod,
    }

    jsonBody, _ := json.Marshal(body)

    return events.APIGatewayProxyResponse{
        StatusCode: 200,
        Headers: map[string]string{
            "Content-Type": "application/json",
        },
        Body: string(jsonBody),
    }, nil
}

func main() {
    lambda.Start(Handler)
}
```

```makefile
# Lambda build
lambda-build:
	GOOS=linux GOARCH=arm64 CGO_ENABLED=0 \
		go build -trimpath -ldflags="-w -s" \
		-o bootstrap ./cmd/lambda
	zip function.zip bootstrap

lambda-deploy: lambda-build
	aws lambda update-function-code \
		--function-name myfunction \
		--zip-file fileb://function.zip \
		--architectures arm64
```

### Code Example 13: Google Cloud Run

```dockerfile
# Dockerfile for Cloud Run
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-w -s" -o server ./cmd/server

FROM gcr.io/distroless/static-debian12
COPY --from=builder /app/server /server
# Cloud Run specifies the port via the PORT environment variable
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["/server"]
```

```go
// Server for Cloud Run
func main() {
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }

    mux := http.NewServeMux()
    mux.HandleFunc("/", handler)

    log.Printf("Listening on :%s", port)
    if err := http.ListenAndServe(":"+port, mux); err != nil {
        log.Fatal(err)
    }
}
```

```bash
# Cloud Run deployment
gcloud run deploy myapp \
    --source . \
    --region asia-northeast1 \
    --allow-unauthenticated \
    --min-instances 0 \
    --max-instances 10 \
    --memory 256Mi \
    --cpu 1
```

---

## 9. Configuration Management

### Code Example 14: Environment-variable-based configuration management

```go
package config

import (
    "fmt"
    "os"
    "strconv"
    "time"
)

// Config represents application configuration
type Config struct {
    Server   ServerConfig
    Database DatabaseConfig
    Redis    RedisConfig
    Log      LogConfig
}

type ServerConfig struct {
    Port         int
    ReadTimeout  time.Duration
    WriteTimeout time.Duration
    IdleTimeout  time.Duration
}

type DatabaseConfig struct {
    URL             string
    MaxOpenConns    int
    MaxIdleConns    int
    ConnMaxLifetime time.Duration
}

type RedisConfig struct {
    URL string
}

type LogConfig struct {
    Level  string
    Format string
}

// Load reads configuration from environment variables
func Load() (*Config, error) {
    cfg := &Config{
        Server: ServerConfig{
            Port:         getEnvInt("PORT", 8080),
            ReadTimeout:  getEnvDuration("SERVER_READ_TIMEOUT", 15*time.Second),
            WriteTimeout: getEnvDuration("SERVER_WRITE_TIMEOUT", 15*time.Second),
            IdleTimeout:  getEnvDuration("SERVER_IDLE_TIMEOUT", 60*time.Second),
        },
        Database: DatabaseConfig{
            URL:             getEnvRequired("DATABASE_URL"),
            MaxOpenConns:    getEnvInt("DB_MAX_OPEN_CONNS", 25),
            MaxIdleConns:    getEnvInt("DB_MAX_IDLE_CONNS", 5),
            ConnMaxLifetime: getEnvDuration("DB_CONN_MAX_LIFETIME", 5*time.Minute),
        },
        Redis: RedisConfig{
            URL: getEnv("REDIS_URL", "redis://localhost:6379/0"),
        },
        Log: LogConfig{
            Level:  getEnv("LOG_LEVEL", "info"),
            Format: getEnv("LOG_FORMAT", "json"),
        },
    }

    return cfg, cfg.Validate()
}

func (c *Config) Validate() error {
    if c.Database.URL == "" {
        return fmt.Errorf("DATABASE_URL is required")
    }
    if c.Server.Port < 1 || c.Server.Port > 65535 {
        return fmt.Errorf("invalid PORT: %d", c.Server.Port)
    }
    return nil
}

func getEnv(key, defaultVal string) string {
    if v := os.Getenv(key); v != "" {
        return v
    }
    return defaultVal
}

func getEnvRequired(key string) string {
    v := os.Getenv(key)
    if v == "" {
        panic(fmt.Sprintf("required environment variable %s is not set", key))
    }
    return v
}

func getEnvInt(key string, defaultVal int) int {
    if v := os.Getenv(key); v != "" {
        i, err := strconv.Atoi(v)
        if err != nil {
            panic(fmt.Sprintf("invalid int value for %s: %s", key, v))
        }
        return i
    }
    return defaultVal
}

func getEnvDuration(key string, defaultVal time.Duration) time.Duration {
    if v := os.Getenv(key); v != "" {
        d, err := time.ParseDuration(v)
        if err != nil {
            panic(fmt.Sprintf("invalid duration for %s: %s", key, v))
        }
        return d
    }
    return defaultVal
}
```

---

## 10. ldflags Option Comparison Table

| Flag | Effect | Size reduction | Use case |
|--------|------|-----------|------|
| `-w` | Remove DWARF debug info | About 20-30% | Production builds |
| `-s` | Remove symbol table | About 10-20% | Production builds |
| `-X pkg.var=val` | Inject variable value at build time | None | Embedding version info |
| `-extldflags "-static"` | Static linking via external linker | None | Static build when using CGO |
| `-trimpath` | Remove build path | Minor | Improved security |

---

## 11. Anti-Patterns

### Anti-Pattern 1: Deploying the build stage as-is

```dockerfile
# BAD: Deploy the entire build environment (850MB+)
FROM golang:1.22
WORKDIR /app
COPY . .
RUN go build -o server .
CMD ["./server"]
# Problems: huge image size, build tools included (large attack surface)

# GOOD: Multi-stage build (15-20MB)
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -trimpath -ldflags="-w -s" -o server .

FROM gcr.io/distroless/static-debian12
COPY --from=builder /app/server /server
ENTRYPOINT ["/server"]
```

### Anti-Pattern 2: Not caching go mod download

```dockerfile
# BAD: Re-download dependencies every time source changes
FROM golang:1.22-alpine AS builder
COPY . .
RUN go build -o server .
# Changing one line of source → redo go mod download (several minutes lost)

# GOOD: Copy go.mod/go.sum first to leverage the cache
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./        # Copy only dependency definitions first
RUN go mod download          # This layer is cached
COPY . .                     # Download is skipped even when source changes
RUN go build -o server .
```

### Anti-Pattern 3: Running as the root user

```dockerfile
# BAD: Run as root (security risk)
FROM alpine:3.19
COPY --from=builder /app/server /server
CMD ["/server"]
# Root privileges inside the container → a vulnerability could affect the host

# GOOD: Run as a non-root user
FROM alpine:3.19
RUN adduser -D -g '' appuser
COPY --from=builder /app/server /server
USER appuser
CMD ["/server"]
```

### Anti-Pattern 4: No Graceful Shutdown

```go
// BAD: Ignore signals and exit immediately
func main() {
    http.ListenAndServe(":8080", handler)
}
// SIGTERM → in-flight requests are cut off

// GOOD: Graceful Shutdown
func main() {
    srv := &http.Server{Addr: ":8080", Handler: handler}

    go func() {
        if err := srv.ListenAndServe(); err != http.ErrServerClosed {
            log.Fatal(err)
        }
    }()

    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit

    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()
    srv.Shutdown(ctx)
}
```

### Anti-Pattern 5: Hardcoding secrets

```go
// BAD: Secrets written in code
db, _ := sql.Open("postgres", "postgres://admin:P@ssw0rd@prod-db:5432/mydb")

// GOOD: Read from environment variables
db, _ := sql.Open("postgres", os.Getenv("DATABASE_URL"))

// BETTER: Use a secret management service
// AWS Secrets Manager, GCP Secret Manager, HashiCorp Vault
```

### Anti-Pattern 6: No health check implementation

```go
// BAD: No health check endpoint
// → Kubernetes cannot determine Pod state; no automatic recovery on failure

// GOOD: Implement all three: Liveness/Readiness/Startup
http.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
    w.WriteHeader(http.StatusOK) // OK as long as the process is running
})

http.HandleFunc("/readyz", func(w http.ResponseWriter, r *http.Request) {
    if err := db.PingContext(r.Context()); err != nil {
        w.WriteHeader(http.StatusServiceUnavailable) // NG if DB is unreachable
        return
    }
    w.WriteHeader(http.StatusOK)
})
```


---

## Practical Exercises

### Exercise 1: Basic implementation

Implement code that satisfies the following requirements.

**Requirements:**
- Validate input data
- Implement proper error handling
- Also write test code

```python
# Exercise 1: Template for basic implementation
class Exercise1:
    """Practice for basic implementation patterns"""

    def __init__(self):
        self.data = []

    def validate_input(self, value):
        """Validate the input value"""
        if value is None:
            raise ValueError("Input value is None")
        return True

    def process(self, value):
        """Main data processing logic"""
        self.validate_input(value)
        self.data.append(value)
        return self.data

    def get_results(self):
        """Get the processing results"""
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

### Exercise 2: Advanced patterns

Extend the basic implementation by adding the following features.

```python
# Exercise 2: Advanced patterns
from typing import List, Dict, Optional
from datetime import datetime

class AdvancedExercise:
    """Practice for advanced patterns"""

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
    assert ex.add("d", 4) == False  # Size limit
    assert ex.find("b")['value'] == 2
    assert ex.remove("b") == True
    assert ex.find("b") is None
    stats = ex.stats()
    assert stats['total_items'] == 2
    print("All advanced tests passed!")

test_advanced()
```

### Exercise 3: Performance optimization

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
    print(f"Speedup ratio:       {slow_time/fast_time:.0f}x")

benchmark()
```

**Points:**
- Be mindful of algorithmic complexity
- Choose appropriate data structures
- Measure the effect with benchmarks
---

## FAQ

### Q1. When do I need to set CGO_ENABLED=0?

When running on images that do not include glibc, such as scratch or distroless, `CGO_ENABLED=0` is required. The standard library's `net` package and `os/user` package use CGO by default, but with `CGO_ENABLED=0` they fall back to pure Go implementations.

Situations where CGO is required:
- When using SQLite (go-sqlite3) → Alternative: `modernc.org/sqlite` (CGO not required)
- When using image processing (libvips, etc.)
- OS-specific libraries (e.g., macOS Security Framework)

### Q2. How do I create multi-platform Docker images?

You can create a manifest list with `docker buildx build --platform linux/amd64,linux/arm64`. When using GoReleaser, you can also build images for each architecture individually and combine them with `docker manifest create`.

```bash
# Multi-platform build with buildx
docker buildx create --name mybuilder --use
docker buildx build --platform linux/amd64,linux/arm64 \
    -t ghcr.io/myorg/myapp:v1.0.0 --push .
```

### Q3. How can I make the binary even smaller?

| Technique | Size reduction | Trade-off |
|------|-----------|------------|
| `-ldflags="-w -s"` | 30-50% | No debug info |
| `-trimpath` | Minor | No build path |
| `upx` compression | 50-70% | Startup decompression cost |
| Remove unused dependencies | Varies | None |
| Go 1.22+ improvements | Automatic | None |

### Q4. What are the recommended settings for Kubernetes?

- **Resource limits**: Always set requests/limits
- **Health checks**: All three -- liveness/readiness/startup
- **PDB**: Guarantee availability via minAvailable
- **HPA**: Auto-scaling based on CPU/memory
- **terminationGracePeriodSeconds**: Grace period for Graceful Shutdown
- **securityContext**: runAsNonRoot, readOnlyRootFilesystem

### Q5. How do I minimize downtime during deployment?

1. **Rolling Update**: Keep all Pods up with maxUnavailable=0
2. **Readiness Probe**: Block traffic until ready
3. **Graceful Shutdown**: Wait for in-flight requests to finish
4. **PreStop Hook**: `sleep 5` to wait for LB propagation
5. **PDB**: Limit simultaneous shutdowns via minAvailable

---

## Summary

| Concept | Key points |
|------|------|
| Multi-stage builds | Separate build and runtime environments for minimal images |
| distroless / scratch | Runtime images that minimize attack surface |
| CGO_ENABLED=0 | Remove external dependencies via fully static linking |
| -ldflags "-w -s" | Reduce binary size by removing debug info |
| -trimpath | Improve security by removing build paths |
| -X main.version=... | Embed version information at build time |
| GOOS/GOARCH | Environment variables for cross-compilation |
| GoReleaser | Automate multi-platform releases |
| GitHub Actions | Automate test/build/deploy in CI/CD |
| Graceful Shutdown | Receive SIGTERM → complete in-flight requests → release resources |
| Kubernetes | Health checks, HPA, PDB, resource limits |
| Serverless | Minimize operational cost with Lambda/Cloud Run |
| Configuration management | Environment variables, secret management services |

---

## Recommended Next Guides

- **03-tools/04-best-practices.md** -- Best Practices: Effective Go
- **03-tools/02-profiling.md** -- Profiling: pprof, trace
- **03-tools/00-cli-development.md** -- CLI Development: cobra, flag, promptui

---

## References

1. **Docker Official -- Multi-stage builds** https://docs.docker.com/build/building/multi-stage/
2. **GoReleaser Official Documentation** https://goreleaser.com/
3. **Google -- distroless container images** https://github.com/GoogleContainerTools/distroless
4. **Go Official -- Build constraints** https://pkg.go.dev/cmd/go#hdr-Build_constraints
5. **Kubernetes -- Configure Liveness, Readiness and Startup Probes** https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/
6. **AWS Lambda Go** https://docs.aws.amazon.com/lambda/latest/dg/lambda-golang.html
7. **Google Cloud Run** https://cloud.google.com/run/docs
8. **air -- Live reload for Go apps** https://github.com/air-verse/air



===== SOURCE: 02-programming/go-practical-guide/docs/03-tools/04-best-practices.md =====

# Go Best Practices Guide

> Guidelines for writing Go code that combines maintainability, readability, and performance, based on the spirit of Effective Go

## What You Will Learn in This Chapter

1. **The core of Effective Go** -- design principles and naming conventions for idiomatic Go code
2. **Error handling** -- designing error values, wrapping, and when to use sentinel errors
3. **Interface design** -- small interfaces, implicit implementation, dependency injection
4. **Concurrency patterns** -- goroutine management, channel design, context propagation
5. **Struct design** -- leveraging zero values, functional options, constructor patterns
6. **Package design** -- dependencies, avoiding circular dependencies, internal packages
7. **Testability** -- designing code that is easy to test
8. **Performance** -- memory efficiency, allocation optimization


## Prerequisites

Your understanding will deepen if you have the following knowledge before reading this guide:

- Basic programming knowledge
- Understanding of related fundamental concepts
- Understanding of the [Go Deployment Guide](./03-deployment.md)

---

## 1. Principles of Idiomatic Go Code

### Go's Design Philosophy

```
+-------------------------------------------------------+
|              Go's Design Philosophy                    |
+-------------------------------------------------------+
|                                                       |
|  +-------------+  +-----------+  +------------------+ |
|  | Simplicity  |  | Readability|  | Composition      | |
|  | Simplicity  |  | Readability|  | over inheritance | |
|  +-------------+  +-----------+  +------------------+ |
|                                                       |
|  +-------------+  +-----------+  +------------------+ |
|  | Explicit    |  | Minimal   |  | Convention       | |
|  | Explicit    |  | Minimal   |  | Convention-first | |
|  +-------------+  +-----------+  +------------------+ |
|                                                       |
|  +-------------+  +-----------+  +------------------+ |
|  | Concurrency |  | Orthogonal|  | Practical        | |
|  | Concurrency |  | Orthogonal|  | Practical        | |
|  +-------------+  +-----------+  +------------------+ |
|                                                       |
|  "Clear is better than clever"                        |
|  "Clarity over cleverness"                            |
|                                                       |
|  "A little copying is better than a little dependency"|
|  "A little copying beats a little dependency"         |
|                                                       |
|  "Don't communicate by sharing memory;                |
|   share memory by communicating"                      |
|  "Don't communicate by sharing memory;                |
|   share memory by communicating"                      |
+-------------------------------------------------------+
```

### Naming Conventions

```
+----------------------------------------------------------+
|  Go Naming Conventions                                   |
+----------------------------------------------------------+
|                                                          |
|  Package names: short, lowercase, singular               |
|    http, json, fmt, os, user, order                      |
|    NG: httpUtil, jsonParser, userService                 |
|    NG: utils, helpers, common, misc (ambiguous meaning)  |
|                                                          |
|  Exported: PascalCase                                    |
|    ReadFile, HTTPClient, UserID                          |
|                                                          |
|  Unexported: camelCase                                   |
|    readFile, httpClient, userID                          |
|                                                          |
|  Interfaces: -er suffix (for single-method interfaces)   |
|    Reader, Writer, Stringer                              |
|    Closer, Formatter, Handler                            |
|    Multi-method: ReadWriter, UserService                 |
|                                                          |
|  Acronyms: keep all uppercase                            |
|    HTTP, URL, ID, JSON, API, XML, SQL                    |
|    HTTPHandler (not HttpHandler)                         |
|    XMLRPC (not XmlRpc)                                   |
|    userID (not userId)                                   |
|                                                          |
|  Variable names: short scope -> short name               |
|    for i := 0; ...          // OK: short scope           |
|    for index := 0; ...      // NG: verbose               |
|    func process(r io.Reader) // OK: single letter clear  |
|                                                          |
|  Constants: PascalCase (CamelCase)                       |
|    MaxRetryCount, DefaultTimeout                         |
|    NG: MAX_RETRY_COUNT (not the Go convention)           |
+----------------------------------------------------------+
```

### Code Example 1: Good vs Bad Naming

```go
// NG: Verbose, Java-style
type IUserService interface { ... }       // I prefix unnecessary
type UserServiceImpl struct { ... }       // Impl suffix unnecessary
func (s *UserServiceImpl) GetUserByID(userID string) (*UserModel, error) { ... }

// OK: Go-style
type UserService interface { ... }        // Simple
type userService struct { ... }           // Unexported implementation
func (s *userService) User(id string) (*User, error) { ... }

// NG: Repeating the package name
package user
func UserCreate() { ... }   // user.UserCreate() is redundant
func UserDelete() { ... }   // user.UserDelete() is redundant

// OK: Leverage the package name
package user
func Create() { ... }       // user.Create() is clear
func Delete() { ... }       // user.Delete() is clear

// NG: Overuse of the Get prefix
func GetName() string { ... }      // Unnecessary in Go
func GetAge() int { ... }          // Getters don't use Get

// OK: Same name as the field
func (u *User) Name() string { return u.name }
func (u *User) Age() int { return u.age }
func (u *User) SetName(name string) { u.name = name }  // Setters use the Set prefix

// NG: Function names that return bool
func IsValid() bool { ... }     // OK (starting with Is is common)
func HasPermission() bool { ... }  // OK
func CheckValid() bool { ... }    // NG: Check should return error

// OK: Functions that return an error
func (u *User) Validate() error { ... }  // Check/Validate return errors
```

### Code Example 2: Package Design Best Practices

```go
// Example project structure

// Small project: flat structure
// project/
// |-- main.go
// |-- handler.go
// |-- store.go
// |-- model.go
// |-- go.mod

// Medium to large project: layered structure
// project/
// |-- cmd/
// |   |-- server/
// |       |-- main.go          -- entry point
// |-- internal/
// |   |-- handler/             -- HTTP handlers
// |   |   |-- user.go
// |   |   |-- order.go
// |   |-- service/             -- business logic
// |   |   |-- user.go
// |   |   |-- order.go
// |   |-- repository/          -- data access
// |   |   |-- user.go
// |   |   |-- order.go
// |   |-- model/               -- domain models
// |   |   |-- user.go
// |   |   |-- order.go
// |   |-- middleware/          -- middleware
// |       |-- auth.go
// |       |-- logging.go
// |-- pkg/                     -- public libraries (usable from other projects)
// |   |-- validator/
// |       |-- validator.go
// |-- migrations/              -- DB migrations
// |   |-- 000001_init.sql
// |-- configs/                 -- configuration files
// |-- go.mod
// |-- go.sum

// Direction of dependencies (keep it one-way)
// handler -> service -> repository -> model
//
// handler depends on the service interface
// service depends on the repository interface
// model depends on nothing (pure data structures)

// NG: Circular dependency
// package user -> package order -> package user (compile error)

// OK: Break dependencies with interfaces
// Define the interface in package service
// Implement in package repository
// Assemble in main.go (Dependency Injection)
```

---

## 2. Error Handling

### Code Example 3: Error Design Patterns

```go
package storage

import (
    "errors"
    "fmt"
)

// ===================================
// 1. Sentinel errors
// Fixed error values defined at package level
// Checked with errors.Is()
// ===================================
var (
    ErrNotFound     = errors.New("storage: not found")
    ErrDuplicate    = errors.New("storage: duplicate entry")
    ErrUnauthorized = errors.New("storage: unauthorized")
    ErrForbidden    = errors.New("storage: forbidden")
    ErrConflict     = errors.New("storage: conflict")
)

// ===================================
// 2. Custom error types
// Struct errors carrying additional information
// Checked with errors.As()
// ===================================
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation error: %s - %s", e.Field, e.Message)
}

// Bundle multiple validation errors together
type ValidationErrors struct {
    Errors []ValidationError
}

func (e *ValidationErrors) Error() string {
    return fmt.Sprintf("validation failed: %d errors", len(e.Errors))
}

func (e *ValidationErrors) Add(field, message string) {
    e.Errors = append(e.Errors, ValidationError{Field: field, Message: message})
}

func (e *ValidationErrors) HasErrors() bool {
    return len(e.Errors) > 0
}

// ===================================
// 3. Error wrapping
// Add context with fmt.Errorf("%w", err)
// ===================================
func (s *Store) FindUser(id string) (*User, error) {
    user, err := s.db.Get(id)
    if err != nil {
        if errors.Is(err, sql.ErrNoRows) {
            // Wrap in a sentinel error
            return nil, fmt.Errorf("FindUser(%s): %w", id, ErrNotFound)
        }
        // Wrap the internal error
        return nil, fmt.Errorf("FindUser(%s): %w", id, err)
    }
    return user, nil
}

// ===================================
// 4. Error inspection
// Traverse the error chain with errors.Is / errors.As
// ===================================
func handleError(err error) {
    // Value comparison (sentinel error)
    if errors.Is(err, ErrNotFound) {
        // 404 response
    }
    if errors.Is(err, ErrUnauthorized) {
        // 401 response
    }

    // Type comparison (custom error)
    var valErr *ValidationError
    if errors.As(err, &valErr) {
        fmt.Printf("Field: %s, Message: %s\n", valErr.Field, valErr.Message)
    }

    var valErrs *ValidationErrors
    if errors.As(err, &valErrs) {
        for _, ve := range valErrs.Errors {
            fmt.Printf("  %s: %s\n", ve.Field, ve.Message)
        }
    }
}
```

### Error Handling Decision Flow

```
An error occurred
    |
    +-- Is it recoverable?
    |       |
    |       +-- YES -> Return the error (return err)
    |       |         Add context (fmt.Errorf("...: %w", err))
    |       |
    |       +-- NO -> log.Fatal / panic (startup only)
    |                 e.g., failure to load config file
    |                      DB connection failure (after retries)
    |
    +-- Does the caller need to know the error kind?
    |       |
    |       +-- YES -> Sentinel error or custom error type
    |       |         e.g., ErrNotFound -> 404
    |       |              *ValidationError -> 400 + details
    |       |
    |       +-- NO -> Just wrap as a string with fmt.Errorf
    |                 e.g., internal implementation details the caller doesn't need
    |
    +-- Is the error context sufficient?
    |       |
    |       +-- NO -> fmt.Errorf("op(%s): %w", id, err)
    |       |         Include function name and argument values in the message
    |       |
    |       +-- YES -> Return as-is
    |
    +-- Should the error be logged?
            |
            +-- Log only once, in the handler layer
            +-- In intermediate layers, wrap and return without logging
            +-- Avoid duplicate logging
```

### Code Example 4: Practical Error Handling Patterns

```go
package handler

import (
    "encoding/json"
    "errors"
    "log"
    "net/http"
)

// ErrorResponse is the unified format for API error responses
type ErrorResponse struct {
    Error   string            `json:"error"`
    Code    string            `json:"code,omitempty"`
    Details map[string]string `json:"details,omitempty"`
}

// handleError converts an error into an HTTP response (only once, at the handler layer)
func handleError(w http.ResponseWriter, err error, logger *log.Logger) {
    var resp ErrorResponse
    var statusCode int

    switch {
    case errors.Is(err, ErrNotFound):
        statusCode = http.StatusNotFound
        resp = ErrorResponse{Error: "resource not found", Code: "NOT_FOUND"}

    case errors.Is(err, ErrUnauthorized):
        statusCode = http.StatusUnauthorized
        resp = ErrorResponse{Error: "unauthorized", Code: "UNAUTHORIZED"}

    case errors.Is(err, ErrForbidden):
        statusCode = http.StatusForbidden
        resp = ErrorResponse{Error: "forbidden", Code: "FORBIDDEN"}

    case errors.Is(err, ErrConflict):
        statusCode = http.StatusConflict
        resp = ErrorResponse{Error: "conflict", Code: "CONFLICT"}

    default:
        var valErrs *ValidationErrors
        if errors.As(err, &valErrs) {
            statusCode = http.StatusBadRequest
            details := make(map[string]string)
            for _, ve := range valErrs.Errors {
                details[ve.Field] = ve.Message
            }
            resp = ErrorResponse{
                Error:   "validation failed",
                Code:    "VALIDATION_ERROR",
                Details: details,
            }
        } else {
            // Unknown error -> 500
            statusCode = http.StatusInternalServerError
            resp = ErrorResponse{Error: "internal server error", Code: "INTERNAL"}
            // Log internal errors (do not include them in the response)
            logger.Printf("Internal error: %v", err)
        }
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(statusCode)
    json.NewEncoder(w).Encode(resp)
}
```

### errors.Is vs errors.As Comparison

| Function | Purpose | Compared against | When to use |
|----------|---------|------------------|-------------|
| `errors.Is(err, target)` | Whether the error chain contains an error equal to target | Value (sentinel error) | `ErrNotFound`, `sql.ErrNoRows` |
| `errors.As(err, &target)` | Whether the error chain contains an error of target's type | Type (custom error) | `*ValidationError`, `*os.PathError` |
| `errors.Unwrap(err)` | Unwrap only one layer | -- | Normally not used directly |
| `errors.Join(err1, err2)` | Combine multiple errors (Go 1.20+) | -- | Multiple post-processing errors |

---

## 3. Interface Design

### Code Example 5: The Principle of Small Interfaces

```go
// Elegant interface designs from the Go standard library

// Single method -- highest reusability
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

type Closer interface {
    Close() error
}

type Stringer interface {
    String() string
}

// Build the required interface via composition
type ReadWriter interface {
    Reader
    Writer
}

type ReadWriteCloser interface {
    Reader
    Writer
    Closer
}

// ReadCloser is a typical example from the io package
type ReadCloser interface {
    Reader
    Closer
}
```

### Code Example 6: How to Use Interfaces Correctly

```go
// ===================================
// Principle 1: "Define interfaces on the consumer side"
// ===================================

// NG: Define the interface on the implementation side
package repository

type UserRepository interface {  // Interface in the implementation package
    GetByID(ctx context.Context, id int64) (*User, error)
    Create(ctx context.Context, u *User) error
}

type postgresUserRepo struct { ... }
// -> Consumers are forced to depend on the repository package

// OK: Define the interface on the consumer side
package service

// Declare only the methods you need
type UserStore interface {
    GetByID(ctx context.Context, id int64) (*User, error)
    Create(ctx context.Context, u *User) error
}

type UserService struct {
    store UserStore  // Depend on the interface
}

// The repository package merely provides a struct
package repository

type PostgresUserRepo struct {
    db *sql.DB
}

func (r *PostgresUserRepo) GetByID(ctx context.Context, id int64) (*User, error) { ... }
func (r *PostgresUserRepo) Create(ctx context.Context, u *User) error { ... }
// -> Implicitly satisfies service.UserStore

// ===================================
// Principle 2: "Accept interfaces, return structs"
// ===================================

// NG: Return an interface
func NewUserService(repo UserStore) UserServiceInterface {
    return &userService{repo: repo}
}
// -> Type information is lost; concrete methods are inaccessible

// OK: Return a struct
func NewUserService(repo UserStore) *UserService {
    return &UserService{repo: repo}
}
// -> Struct methods are directly accessible

// ===================================
// Principle 3: "Ask only for the functionality you actually use"
// ===================================

// NG: Demand an oversized interface
func ProcessData(rw ReadWriteCloser) error {
    // Actually only uses Read
    buf := make([]byte, 1024)
    _, err := rw.Read(buf)
    return err
}

// OK: Ask only for the functionality you need
func ProcessData(r io.Reader) error {
    buf := make([]byte, 1024)
    _, err := r.Read(buf)
    return err
}
// -> *os.File, *bytes.Buffer, *strings.Reader, and net.Conn all work
```

### Interface Design Principles

```
+----------------------------------------------------------+
|  "Accept interfaces, return structs"                     |
|  "Accept interfaces, return structs"                     |
+----------------------------------------------------------+
|                                                          |
|  // Parameter: interface (flexibility)                   |
|  func NewService(repo UserRepository) *UserService       |
|                                                          |
|  // Return value: struct (concreteness)                  |
|  func NewService(...) *UserService  // NOT UserService   |
|                                                          |
+----------------------------------------------------------+
|                                                          |
|  "The bigger the interface, the weaker the abstraction"  |
|                                     -- Rob Pike          |
+----------------------------------------------------------+
|                                                          |
|  "Define interfaces at the point of use"                 |
+----------------------------------------------------------+
|                                                          |
|  "Don't export interfaces for implementation"            |
+----------------------------------------------------------+

Benefits of implicit interface implementation:
+-----------------------------------------+
| Go: implicit (Structural Typing)        |
|   -> Implementations need not know      |
|      the interface exists               |
|   -> Simple dependency relationships    |
|   -> Easy to mock for testing           |
|                                         |
| Java/C#: explicit (implements / :)      |
|   -> Implementations depend on the      |
|      interface                          |
|   -> Large blast radius on changes      |
+-----------------------------------------+
```

---

## 4. Concurrency Best Practices

### Code Example 7: Goroutine Lifecycle Management

```go
package main

import (
    "context"
    "fmt"
    "log"
    "sync"
    "time"

    "golang.org/x/sync/errgroup"
)

// ===================================
// Pattern 1: WaitGroup
// Simple parallel processing, when no error handling is needed
// ===================================
func processItems(items []Item) {
    var wg sync.WaitGroup
    for _, item := range items {
        wg.Add(1)
        go func(item Item) {
            defer wg.Done()
            process(item)
        }(item)
    }
    wg.Wait()
}

// ===================================
// Pattern 2: errgroup
// Parallel processing + error handling (recommended)
// ===================================
func fetchAll(ctx context.Context, urls []string) ([]Response, error) {
    g, ctx := errgroup.WithContext(ctx)
    responses := make([]Response, len(urls))

    for i, url := range urls {
        i, url := i, url  // Capture loop variables (unnecessary in Go 1.22+)
        g.Go(func() error {
            resp, err := fetch(ctx, url)
            if err != nil {
                return fmt.Errorf("fetch %s: %w", url, err)
            }
            responses[i] = resp  // Different indexes, no synchronization needed
            return nil
        })
    }

    if err := g.Wait(); err != nil {
        return nil, err  // The first error is returned
    }
    return responses, nil
}

// ===================================
// Pattern 3: errgroup + semaphore (concurrency limit)
// ===================================
func fetchAllWithLimit(ctx context.Context, urls []string, maxConcurrency int) ([]Response, error) {
    g, ctx := errgroup.WithContext(ctx)
    g.SetLimit(maxConcurrency)  // Limit concurrent execution

    responses := make([]Response, len(urls))

    for i, url := range urls {
        i, url := i, url
        g.Go(func() error {
            resp, err := fetch(ctx, url)
            if err != nil {
                return err
            }
            responses[i] = resp
            return nil
        })
    }

    return responses, g.Wait()
}

// ===================================
// Pattern 4: Worker Pool
// Bounded parallelism with a job queue
// ===================================
func workerPool(ctx context.Context, jobs <-chan int, results chan<- int) {
    var wg sync.WaitGroup
    numWorkers := 5

    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            for {
                select {
                case job, ok := <-jobs:
                    if !ok {
                        return // Channel closed
                    }
                    select {
                    case results <- process(job):
                    case <-ctx.Done():
                        return
                    }
                case <-ctx.Done():
                    return // Context canceled
                }
            }
        }(i)
    }

    // Close results after all workers finish
    go func() {
        wg.Wait()
        close(results)
    }()
}

// ===================================
// Pattern 5: Pipeline
// Stage-by-stage data processing
// ===================================
func pipeline(ctx context.Context, input <-chan int) <-chan string {
    // Stage 1: filter
    filtered := make(chan int)
    go func() {
        defer close(filtered)
        for v := range input {
            if v%2 == 0 {
                select {
                case filtered <- v:
                case <-ctx.Done():
                    return
                }
            }
        }
    }()

    // Stage 2: transform
    output := make(chan string)
    go func() {
        defer close(output)
        for v := range filtered {
            result := fmt.Sprintf("processed-%d", v*2)
            select {
            case output <- result:
            case <-ctx.Done():
                return
            }
        }
    }()

    return output
}

// ===================================
// Pattern 6: Fan-out / Fan-in
// Distributed processing and result aggregation
// ===================================
func fanOutFanIn(ctx context.Context, input <-chan int, numWorkers int) <-chan int {
    // Fan-out: distribute to multiple workers
    workers := make([]<-chan int, numWorkers)
    for i := 0; i < numWorkers; i++ {
        workers[i] = worker(ctx, input)
    }

    // Fan-in: aggregate results from multiple workers
    return merge(ctx, workers...)
}

func worker(ctx context.Context, input <-chan int) <-chan int {
    output := make(chan int)
    go func() {
        defer close(output)
        for v := range input {
            result := heavyProcess(v)
            select {
            case output <- result:
            case <-ctx.Done():
                return
            }
        }
    }()
    return output
}

func merge(ctx context.Context, channels ...<-chan int) <-chan int {
    var wg sync.WaitGroup
    merged := make(chan int)

    output := func(ch <-chan int) {
        defer wg.Done()
        for v := range ch {
            select {
            case merged <- v:
            case <-ctx.Done():
                return
            }
        }
    }

    wg.Add(len(channels))
    for _, ch := range channels {
        go output(ch)
    }

    go func() {
        wg.Wait()
        close(merged)
    }()

    return merged
}
```

### Code Example 8: Proper context Propagation

```go
// ===================================
// Rules for context
// ===================================

// 1. Pass context as the first parameter
func fetchData(ctx context.Context) (*Data, error) { ... }

// 2. Do not store context in a struct
// NG:
type Server struct {
    ctx context.Context  // NG: storing a request-scoped ctx
}
// OK: pass it as a method argument

// 3. Do not pass a nil context
// NG: fetchData(nil)
// OK: fetchData(context.Background())
//     fetchData(context.TODO())  // when you plan to replace it with a proper context later

// 4. Keep context.WithValue minimal (authentication info, etc., only)
// NG: cramming lots of data into context
// OK: only cross-cutting concerns such as request IDs and auth info

// Context chaining
func main() {
    // Root context (cancellable)
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()

    // Context with a timeout
    ctx, cancel = context.WithTimeout(ctx, 30*time.Second)
    defer cancel()

    // Context with a deadline
    deadline := time.Now().Add(1 * time.Minute)
    ctx, cancel = context.WithDeadline(ctx, deadline)
    defer cancel()

    // Context with a value (cross-cutting concerns only)
    ctx = context.WithValue(ctx, requestIDKey{}, "req-123")
}

// Using context inside an HTTP handler
http.HandleFunc("/api/data", func(w http.ResponseWriter, r *http.Request) {
    // Use the request's context
    // -> automatically canceled when the client disconnects
    ctx := r.Context()

    data, err := fetchData(ctx)
    if err != nil {
        if ctx.Err() == context.Canceled {
            // The client disconnected -> log only
            return
        }
        if ctx.Err() == context.DeadlineExceeded {
            http.Error(w, "timeout", http.StatusGatewayTimeout)
            return
        }
        http.Error(w, err.Error(), 500)
        return
    }
    json.NewEncoder(w).Encode(data)
})

// Propagate context downstream
func fetchData(ctx context.Context) (*Data, error) {
    req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
    if err != nil {
        return nil, err
    }
    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    // ...
}
```

### Concurrency Pattern Comparison

| Pattern | Use case | Error handling | Cancellation | Complexity | Recommendation |
|---------|----------|----------------|--------------|------------|----------------|
| goroutine + WaitGroup | Simple parallel processing | Manual (e.g., channels) | Manual (context) | Low | Basic |
| errgroup | Parallel processing + error aggregation | Automatic (first error) | Automatic (context-integrated) | Low | Recommended |
| errgroup + SetLimit | Concurrency-limited | Automatic | Automatic | Low | Recommended |
| Worker Pool | Job queues | Manual | context-aware | Medium | Special-purpose |
| Pipeline | Staged processing | Propagated between stages | context + done | High | Special-purpose |
| Fan-out/Fan-in | Distributed processing + aggregation | Handled at aggregation | context-aware | High | Special-purpose |

---

## 5. Struct and Method Design

### Code Example 9: Make Zero Values Useful

```go
// Great zero-value designs in the Go standard library

// sync.Mutex -- usable as its zero value
var mu sync.Mutex
mu.Lock() // No initialization required

// bytes.Buffer -- usable as its zero value
var buf bytes.Buffer
buf.WriteString("hello")

// sync.Once -- usable as its zero value
var once sync.Once
once.Do(func() { /* initialization */ })

// Design your own types so their zero value is useful
type Logger struct {
    output io.Writer // nil means use os.Stderr
    level  int       // 0 means INFO level
    prefix string    // "" means empty string
}

func (l *Logger) writer() io.Writer {
    if l.output == nil {
        return os.Stderr
    }
    return l.output
}

func (l *Logger) Info(msg string) {
    fmt.Fprintf(l.writer(), "%s[INFO] %s\n", l.prefix, msg)
}

// Usable as a zero value
var log Logger
log.Info("ready") // Outputs at INFO level to os.Stderr

// Explicit initialization is also possible
customLog := Logger{
    output: os.Stdout,
    level:  2,
    prefix: "[myapp] ",
}
customLog.Info("started")

// NG: design where the zero value is invalid
type BadConfig struct {
    MaxRetries int  // 0 = no retries? or unset?
    Timeout    time.Duration  // 0 = immediate timeout?
}

// OK: design that distinguishes the zero value
type GoodConfig struct {
    MaxRetries *int           // nil = unset (default 3)
    Timeout    time.Duration  // 0 = default (30 seconds)
}

func (c *GoodConfig) maxRetries() int {
    if c.MaxRetries == nil {
        return 3 // default
    }
    return *c.MaxRetries
}

func (c *GoodConfig) timeout() time.Duration {
    if c.Timeout == 0 {
        return 30 * time.Second // default
    }
    return c.Timeout
}
```

### Code Example 10: Functional Options Pattern

```go
// A complete implementation of the functional options pattern

type Server struct {
    addr         string
    readTimeout  time.Duration
    writeTimeout time.Duration
    idleTimeout  time.Duration
    maxConn      int
    logger       *log.Logger
    tlsConfig    *tls.Config
    middleware   []Middleware
}

// Option is a configuration option for Server
type Option func(*Server)

// WithReadTimeout sets the read timeout
func WithReadTimeout(d time.Duration) Option {
    return func(s *Server) { s.readTimeout = d }
}

// WithWriteTimeout sets the write timeout
func WithWriteTimeout(d time.Duration) Option {
    return func(s *Server) { s.writeTimeout = d }
}

// WithIdleTimeout sets the idle timeout
func WithIdleTimeout(d time.Duration) Option {
    return func(s *Server) { s.idleTimeout = d }
}

// WithMaxConnections sets the maximum number of connections
func WithMaxConnections(n int) Option {
    return func(s *Server) { s.maxConn = n }
}

// WithLogger sets the logger
func WithLogger(l *log.Logger) Option {
    return func(s *Server) { s.logger = l }
}

// WithTLS applies the TLS configuration
func WithTLS(config *tls.Config) Option {
    return func(s *Server) { s.tlsConfig = config }
}

// WithMiddleware appends middleware
func WithMiddleware(mw ...Middleware) Option {
    return func(s *Server) { s.middleware = append(s.middleware, mw...) }
}

// NewServer creates a new server
func NewServer(addr string, opts ...Option) *Server {
    s := &Server{
        addr:         addr,
        readTimeout:  5 * time.Second,   // default values
        writeTimeout: 10 * time.Second,
        idleTimeout:  120 * time.Second,
        maxConn:      100,
        logger:       log.Default(),
    }
    for _, opt := range opts {
        opt(s)
    }
    return s
}

// Example usage
func main() {
    srv := NewServer(":8080",
        WithReadTimeout(30*time.Second),
        WithMaxConnections(1000),
        WithLogger(customLogger),
        WithMiddleware(loggingMW, authMW),
    )

    // When the defaults are sufficient
    simpleSrv := NewServer(":8080")
}

// Benefits of the functional options pattern:
// 1. Backward compatibility: adding new options does not affect existing code
// 2. Readability: the meaning of each setting is clear
// 3. Default values: unspecified options use their defaults
// 4. Validation: validation can happen inside the Option functions
// 5. Documentation: you can write GoDoc for each With-function
```

### Code Example 11: Builder Pattern (Alternative to Functional Options)

```go
// Builder pattern (chained form)
type ServerBuilder struct {
    server *Server
    errs   []error
}

func NewServerBuilder(addr string) *ServerBuilder {
    return &ServerBuilder{
        server: &Server{
            addr:         addr,
            readTimeout:  5 * time.Second,
            writeTimeout: 10 * time.Second,
            maxConn:      100,
        },
    }
}

func (b *ServerBuilder) ReadTimeout(d time.Duration) *ServerBuilder {
    if d <= 0 {
        b.errs = append(b.errs, fmt.Errorf("read timeout must be positive"))
        return b
    }
    b.server.readTimeout = d
    return b
}

func (b *ServerBuilder) MaxConnections(n int) *ServerBuilder {
    if n <= 0 {
        b.errs = append(b.errs, fmt.Errorf("max connections must be positive"))
        return b
    }
    b.server.maxConn = n
    return b
}

func (b *ServerBuilder) Build() (*Server, error) {
    if len(b.errs) > 0 {
        return nil, fmt.Errorf("server builder errors: %v", b.errs)
    }
    return b.server, nil
}

// Example usage
srv, err := NewServerBuilder(":8080").
    ReadTimeout(30 * time.Second).
    MaxConnections(1000).
    Build()
```

---

## 6. Designing for Testability

### Code Example 12: Code That Is Easy to Test

```go
// ===================================
// Principle: inject dependencies and abstract with interfaces
// ===================================

// Hard-to-test code
// NG: Directly depends on a concrete implementation
type UserServiceBad struct {
    db *sql.DB  // Depends on a concrete type -> needs a DB for testing
}

func (s *UserServiceBad) GetUser(id int64) (*User, error) {
    return s.db.QueryRow("SELECT ...") // Accesses the DB directly
}

// Easy-to-test code
// OK: Depends on an interface
type UserRepository interface {
    GetByID(ctx context.Context, id int64) (*User, error)
}

type UserService struct {
    repo UserRepository  // Depends on the interface
}

func NewUserService(repo UserRepository) *UserService {
    return &UserService{repo: repo}
}

func (s *UserService) GetUser(ctx context.Context, id int64) (*User, error) {
    if id <= 0 {
        return nil, fmt.Errorf("invalid user id: %d", id)
    }
    return s.repo.GetByID(ctx, id)
}

// Mock for testing
type mockUserRepo struct {
    users map[int64]*User
    err   error // Error injection for tests
}

func (m *mockUserRepo) GetByID(ctx context.Context, id int64) (*User, error) {
    if m.err != nil {
        return nil, m.err
    }
    u, ok := m.users[id]
    if !ok {
        return nil, ErrNotFound
    }
    return u, nil
}

// Table-driven test
func TestUserService_GetUser(t *testing.T) {
    tests := []struct {
        name    string
        id      int64
        mock    *mockUserRepo
        want    *User
        wantErr bool
    }{
        {
            name: "success",
            id:   1,
            mock: &mockUserRepo{users: map[int64]*User{1: {ID: 1, Name: "Alice"}}},
            want: &User{ID: 1, Name: "Alice"},
        },
        {
            name:    "not found",
            id:      999,
            mock:    &mockUserRepo{users: map[int64]*User{}},
            wantErr: true,
        },
        {
            name:    "invalid id",
            id:      0,
            mock:    &mockUserRepo{},
            wantErr: true,
        },
        {
            name:    "db error",
            id:      1,
            mock:    &mockUserRepo{err: fmt.Errorf("connection refused")},
            wantErr: true,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            svc := NewUserService(tt.mock)
            got, err := svc.GetUser(context.Background(), tt.id)

            if (err != nil) != tt.wantErr {
                t.Errorf("GetUser() error = %v, wantErr %v", err, tt.wantErr)
                return
            }
            if tt.want != nil && got.Name != tt.want.Name {
                t.Errorf("GetUser() = %v, want %v", got, tt.want)
            }
        })
    }
}
```

### Code Example 13: Testability of Time

```go
// NG: Calling time.Now() directly makes tests flaky
func (s *TokenService) IsExpired(token *Token) bool {
    return time.Now().After(token.ExpiresAt) // Uncontrollable in tests
}

// OK: Make the time function injectable
type TokenService struct {
    now func() time.Time // Swappable in tests
}

func NewTokenService() *TokenService {
    return &TokenService{now: time.Now}
}

func (s *TokenService) IsExpired(token *Token) bool {
    return s.now().After(token.ExpiresAt)
}

// Test
func TestIsExpired(t *testing.T) {
    fixedTime := time.Date(2024, 6, 1, 12, 0, 0, 0, time.UTC)
    svc := &TokenService{
        now: func() time.Time { return fixedTime },
    }

    token := &Token{ExpiresAt: fixedTime.Add(-1 * time.Hour)}
    if !svc.IsExpired(token) {
        t.Error("expected expired token")
    }
}
```

---

## 7. Anti-patterns

### Anti-pattern 1: Swallowing Errors

```go
// NG: Ignoring errors
data, _ := json.Marshal(user)    // Discards the marshal error
f, _ := os.Open("config.yaml")  // Panics if the file does not exist
defer f.Close()

// OK: Handle errors properly
data, err := json.Marshal(user)
if err != nil {
    return fmt.Errorf("failed to marshal user to JSON: %w", err)
}

f, err := os.Open("config.yaml")
if err != nil {
    return fmt.Errorf("cannot open config file: %w", err)
}
defer f.Close()

// The only situations where ignoring errors is acceptable:
// 1. Close() in defer (though you should still log it)
defer func() {
    if err := f.Close(); err != nil {
        log.Printf("file close error: %v", err)
    }
}()
// 2. fmt.Fprint* family (almost never fails)
fmt.Fprintf(w, "hello")
```

### Anti-pattern 2: Abuse of init()

```go
// NG: Complex initialization in init()
func init() {
    db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
    if err != nil {
        log.Fatal(err) // Runs during tests too
    }
    globalDB = db
}
// Problems:
// - Requires a DB during testing
// - Initialization order is unclear
// - log.Fatal on error -> tests crash

// OK: Explicit initialization function
func NewApp(cfg Config) (*App, error) {
    db, err := sql.Open("postgres", cfg.DatabaseURL)
    if err != nil {
        return nil, fmt.Errorf("DB connection failed: %w", err)
    }
    return &App{db: db}, nil
}

// When init() is appropriate:
// - driver.Register (registering a database/sql driver)
// - Setting prerequisites for flag.Parse
// - Very simple initialization (assigning initial values to variables, etc.)
```

### Anti-pattern 3: Fire-and-Forget Goroutines

```go
// NG: Goroutine lifecycle is unmanaged
func handler(w http.ResponseWriter, r *http.Request) {
    go sendEmail(user.Email) // A panic goes unnoticed
    w.WriteHeader(200)       // No check of the email result
}
// Problems:
// - A panic -> the whole process crashes
// - Errors -> undetectable
// - Memory leak -> the goroutine may never terminate

// OK: Manage with errgroup or recover
func handler(w http.ResponseWriter, r *http.Request) {
    g, ctx := errgroup.WithContext(r.Context())
    g.Go(func() error {
        return sendEmail(ctx, user.Email)
    })
    if err := g.Wait(); err != nil {
        log.Printf("email send failed: %v", err)
    }
    w.WriteHeader(200)
}

// OK: A worker for background tasks
type BackgroundWorker struct {
    tasks chan func()
    wg    sync.WaitGroup
}

func (w *BackgroundWorker) Submit(task func()) {
    w.wg.Add(1)
    w.tasks <- func() {
        defer w.wg.Done()
        defer func() {
            if r := recover(); r != nil {
                log.Printf("background task panic: %v", r)
            }
        }()
        task()
    }
}

func (w *BackgroundWorker) Shutdown() {
    close(w.tasks)
    w.wg.Wait()
}
```

### Anti-pattern 4: Misuse of sync.Mutex

```go
// NG: Copying a Mutex
type Cache struct {
    mu    sync.Mutex
    items map[string]string
}

func (c Cache) Get(key string) string {  // Value receiver -> the Mutex is copied
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.items[key]
}

// OK: Use a pointer receiver
func (c *Cache) Get(key string) string {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.items[key]
}

// NG: Exposing the Mutex
type Cache struct {
    Mu    sync.Mutex  // Exported field -> external code can lock it
    Items map[string]string
}

// OK: Keep the Mutex unexported
type Cache struct {
    mu    sync.Mutex
    items map[string]string
}

// NG: Using a Mutex even for reads (should be an RWMutex)
func (c *Cache) Get(key string) string {
    c.mu.Lock()       // An exclusive lock for read-only access
    defer c.mu.Unlock()
    return c.items[key]
}

// OK: Use RLock for reads
type Cache struct {
    mu    sync.RWMutex
    items map[string]string
}

func (c *Cache) Get(key string) string {
    c.mu.RLock()       // Read lock (multiple goroutines can read concurrently)
    defer c.mu.RUnlock()
    return c.items[key]
}

func (c *Cache) Set(key, value string) {
    c.mu.Lock()        // Write lock (exclusive)
    defer c.mu.Unlock()
    c.items[key] = value
}
```

### Anti-pattern 5: Unnecessary else

```go
// NG: Redundant else
func process(data []byte) error {
    if len(data) == 0 {
        return errors.New("empty data")
    } else {
        return parse(data)  // else is unnecessary
    }
}

// OK: Early return
func process(data []byte) error {
    if len(data) == 0 {
        return errors.New("empty data")
    }
    return parse(data)  // Happy path at indentation 0
}

// NG: Deep nesting
func validate(user *User) error {
    if user != nil {
        if user.Name != "" {
            if user.Age > 0 {
                return nil
            } else {
                return errors.New("age must be positive")
            }
        } else {
            return errors.New("name is required")
        }
    } else {
        return errors.New("user is nil")
    }
}

// OK: Guard clauses with early returns
func validate(user *User) error {
    if user == nil {
        return errors.New("user is nil")
    }
    if user.Name == "" {
        return errors.New("name is required")
    }
    if user.Age <= 0 {
        return errors.New("age must be positive")
    }
    return nil
}
```

---

## 8. Performance Guidelines

### Memory Allocation Optimization

```go
// NG: Growing a slice dynamically inside a loop
func processItems(items []Item) []Result {
    var results []Result  // Unknown capacity
    for _, item := range items {
        results = append(results, process(item))
        // -> Memory reallocation + copy every time capacity runs out
    }
    return results
}

// OK: Pre-allocate capacity
func processItems(items []Item) []Result {
    results := make([]Result, 0, len(items))  // Pre-allocate capacity
    for _, item := range items {
        results = append(results, process(item))
    }
    return results
}

// String concatenation with strings.Builder
// NG: Concatenation via += (creates a new string each time)
func buildString(parts []string) string {
    result := ""
    for _, p := range parts {
        result += p  // O(n^2) memory allocations
    }
    return result
}

// OK: strings.Builder (O(n))
func buildString(parts []string) string {
    var b strings.Builder
    b.Grow(estimatedSize)  // Pre-allocate an estimated size
    for _, p := range parts {
        b.WriteString(p)
    }
    return b.String()
}

// Reuse objects with sync.Pool
var bufPool = sync.Pool{
    New: func() interface{} {
        return new(bytes.Buffer)
    },
}

func processRequest(data []byte) string {
    buf := bufPool.Get().(*bytes.Buffer)
    buf.Reset()
    defer bufPool.Put(buf)

    buf.Write(data)
    // ... processing
    return buf.String()
}
```

---

## FAQ

### Q1. How do I format Go code?

`gofmt` is Go's official formatter, applying a uniform style without room for debate. `goimports` goes further than `gofmt` and also organizes imports. In CI, run `gofmt -l .` to verify there are no unformatted files.

```bash
# Format
gofmt -w .
goimports -w .

# Check in CI
test -z "$(gofmt -l .)"
```

### Q2. What linter should I use?

`golangci-lint` is the industry standard. It can run many linters in a unified way, including `staticcheck`, `errcheck`, `govet`, and `gosimple`. You can configure project-specific rules in `.golangci.yml`.

```yaml
# .golangci.yml
linters:
  enable:
    - errcheck
    - govet
    - staticcheck
    - gosimple
    - ineffassign
    - unused
    - misspell
    - gofmt
    - goimports
    - gocritic
    - revive
    - prealloc      # Recommends pre-allocating slices
    - bodyclose     # Forgotten HTTP response Body close
    - nilerr        # nil error checks
    - exportloopref # Loop variable capture
```

### Q3. What is the best practice for package layout?

For small projects, a flat structure is sufficient. For large ones, use `internal/` to restrict external visibility and split packages per domain. Avoid circular dependencies and keep the dependency direction one-way. Place entry points under `cmd/`.

```
Recommended layout:
  cmd/server/main.go          -- entry point (keep it thin)
  internal/                    -- not externally visible
    handler/                   -- HTTP handlers
    service/                   -- business logic
    repository/                -- data access
    model/                     -- domain models
  pkg/                         -- externally visible libraries

Dependency direction:
  main -> handler -> service -> repository -> model
  (one-way, no cycles)
```

### Q4. When should I use a pointer receiver vs a value receiver?

```
Use a pointer receiver (*T) when:
  -> The struct is mutated (setter)
  -> The struct is large (copy cost is high)
  -> It contains fields that must not be copied, such as sync.Mutex
  -> For consistency (if any method has a pointer receiver, all methods should)

Use a value receiver (T) when:
  -> The struct is small and immutable (e.g., Point{x, y})
  -> A type used as a map key
  -> A type treated as a value, like time.Time
```

### Q5. What are the major improvements in Go 1.22 and later?

- **Loop variable scope fix**: the loop variable in `for i, v := range` is freshly allocated on each iteration
- **range over integers**: `for i := range 10` is now possible
- **Enhanced HTTP routing**: `http.ServeMux` supports path parameters
- **cmp package**: standardized comparison functions

---

## Summary

| Concept | Key points |
|---------|-----------|
| Naming conventions | PascalCase/camelCase, keep acronyms uppercase, short scope -> short name |
| Interfaces | Keep them small, define them on the consumer side, implicit implementation |
| Error handling | Wrap with %w, inspect with Is/As, log once in the handler layer |
| Zero values | Design useful zero values |
| Option pattern | Flexible initialization, backward compatibility |
| context | First argument, propagate cancellation, values for cross-cutting concerns only |
| errgroup | Recommended pattern for goroutine management |
| gofmt / golangci-lint | Automate code quality, wire it into CI |
| Testability | Enable mocking via interfaces and DI |
| Performance | Pre-allocate slices, strings.Builder, sync.Pool |
| Package design | One-way dependencies, no cycles, keep private with internal |
| Early return | Reduce nesting with guard clauses |

---

## Recommended Next Guides

- **02-web/04-testing.md** -- Testing: table-driven tests, testify, httptest
- **03-tools/01-generics.md** -- Generics: type parameters, constraints
- **03-tools/02-profiling.md** -- Profiling: pprof, trace

---

## References

1. **Go official -- Effective Go** https://go.dev/doc/effective_go
2. **Go official -- Code Review Comments** https://go.dev/wiki/CodeReviewComments
3. **Go Blog -- Error handling and Go** https://go.dev/blog/error-handling-and-go
4. **Uber Go Style Guide** https://github.com/uber-go/guide/blob/master/style.md
5. **Go Proverbs** https://go-proverbs.github.io/
6. **100 Go Mistakes and How to Avoid Them** -- Teiva Harsanyi
7. **Go official -- Package Names** https://go.dev/blog/package-names
8. **golang.org/x/sync/errgroup** https://pkg.go.dev/golang.org/x/sync/errgroup

