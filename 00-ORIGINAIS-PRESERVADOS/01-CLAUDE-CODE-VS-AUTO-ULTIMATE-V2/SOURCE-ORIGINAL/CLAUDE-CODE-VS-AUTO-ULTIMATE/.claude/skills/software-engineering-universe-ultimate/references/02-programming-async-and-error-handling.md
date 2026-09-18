

===== SOURCE: 02-programming/async-and-error-handling/SKILL.md =====

[日本語版](../../ja/02-programming/async-and-error-handling/SKILL.md)

# Async Programming and Error Handling Complete Guide

> Async programming is the foundation of modern applications. Error handling is the cornerstone of software reliability. This guide systematically covers these two closely related topics, including implementations and best practices across multiple languages.

## Target Audience

- Engineers who want to deeply understand async programming mechanisms and patterns
- Developers seeking best practices for error handling
- Anyone looking to organize their understanding of Promise, async/await, and Result types

## Prerequisites

- Programming basics (functions, control flow)

## Guide Index

### 00-introduction (Introduction)
| File | Topic | Summary |
|------|-------|---------|
| [00-sync-vs-async.md](docs/00-introduction/00-sync-vs-async.md) | Sync vs Async | Blocking/non-blocking, why async is necessary |
| [01-concurrency-models.md](docs/00-introduction/01-concurrency-models.md) | Concurrency Models Overview | Multithreading, event loops, the actor model |

### 01-async-patterns (Async Patterns)
| File | Topic | Summary |
|------|-------|---------|
| [00-callbacks.md](docs/01-async-patterns/00-callbacks.md) | Callbacks | Callback hell, Node.js error-first pattern |
| [01-promises.md](docs/01-async-patterns/01-promises.md) | Promise | Promise chaining, Promise.all/race/allSettled |
| [02-async-await.md](docs/01-async-patterns/02-async-await.md) | async/await | Implementations across languages, concurrent execution patterns |
| [03-reactive-streams.md](docs/01-async-patterns/03-reactive-streams.md) | Reactive Streams | RxJS, Observable, backpressure |

### 02-error-handling (Error Handling)
| File | Topic | Summary |
|------|-------|---------|
| [00-exceptions.md](docs/02-error-handling/00-exceptions.md) | Exception Handling | try/catch/finally, exception hierarchies, checked/unchecked |
| [01-result-type.md](docs/02-error-handling/01-result-type.md) | Result Types | Rust Result, TypeScript never-throw, Go error |
| [02-error-boundaries.md](docs/02-error-handling/02-error-boundaries.md) | Error Boundaries | React Error Boundary, global handlers |
| [03-custom-errors.md](docs/02-error-handling/03-custom-errors.md) | Custom Errors | Error design, error codes, domain errors |

### 03-advanced (Advanced Topics)
| File | Topic | Summary |
|------|-------|---------|
| [00-event-loop.md](docs/03-advanced/00-event-loop.md) | Event Loop | Deep dive into the Node.js/browser event loop |
| [01-cancellation.md](docs/03-advanced/01-cancellation.md) | Cancellation | AbortController, CancellationToken, timeouts |
| [02-retry-and-backoff.md](docs/03-advanced/02-retry-and-backoff.md) | Retry Strategies | Exponential backoff, circuit breakers |
| [03-structured-concurrency.md](docs/03-advanced/03-structured-concurrency.md) | Structured Concurrency | Kotlin coroutines, Swift structured concurrency |

### 04-practical (Practical)
| File | Topic | Summary |
|------|-------|---------|
| [00-api-error-design.md](docs/04-practical/00-api-error-design.md) | API Error Design | HTTP status codes, error response design, RFC 7807 |
| [01-logging-and-monitoring.md](docs/04-practical/01-logging-and-monitoring.md) | Logging and Monitoring | Structured logging, error tracking, Sentry |
| [02-testing-async.md](docs/04-practical/02-testing-async.md) | Testing Async Code | Testing techniques for async code, mocks, timers |
| [03-real-world-patterns.md](docs/04-practical/03-real-world-patterns.md) | Real-World Patterns | Queue processing, WebSocket, file uploads |

## Learning Path

```
Fundamentals:  00-introduction -> 01-async-patterns (00 -> 02)
Error:         02-error-handling (00 -> 03)
Applied:       01-async-patterns/03 -> 03-advanced -> 04-practical
```

## Related Skills




===== SOURCE: 02-programming/async-and-error-handling/docs/00-introduction/00-sync-vs-async.md =====

# Synchronous vs Asynchronous

> Synchronous processing means "wait for the previous operation to finish before starting the next one," while asynchronous processing means "do other work during wait times." The key to web application performance is handling I/O waits efficiently.

## What You Will Learn in This Chapter

- [ ] Understand the fundamental difference between synchronous and asynchronous processing
- [ ] Grasp the meaning of blocking and non-blocking
- [ ] Understand concretely why asynchronous processing is necessary
- [ ] Compare the synchronous/asynchronous models across different languages
- [ ] Learn about typical real-world scenarios and optimal choices

## Prerequisites

Before reading this guide, the following knowledge will help deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts

---

## 1. Fundamental Concepts of Synchronous vs Asynchronous

### 1.1 Visual Understanding

```
Synchronous Processing:
  Task A ████████████████████
  Task B                     ████████████████████
  Task C                                         ████████████████████
  → Executed in order. The next one waits until the previous one finishes
  → Total time = A + B + C

Asynchronous Processing:
  Task A ████──────────████
  Task B     ████──────────████
  Task C         ████──────────████
  → Other tasks proceed during I/O waits (──)
  → Total time ≒ max(A, B, C)

Concrete example: 3 API calls (200ms each)
  Synchronous:  200 + 200 + 200 = 600ms
  Asynchronous: max(200, 200, 200) = 200ms (3x faster)
```

### 1.2 Understanding Through an Everyday Analogy

The difference between synchronous and asynchronous processing is easy to understand when compared to ordering at a restaurant.

```
Synchronous processing (one waiter fully attending one table at a time):
  Table 1: Take order → Wait for food to be ready → Serve → Bill
  Table 2:                                              Take order → Wait for food to be ready → Serve → Bill
  Table 3:                                                                                           Take order → ...
  → The waiter stands idle even while waiting for food to be prepared
  → Extremely inefficient

Asynchronous processing (one waiter efficiently handling multiple tables):
  Table 1: Take order → (pass to kitchen) → ... → Food ready! Serve
  Table 2:              Take order → (pass to kitchen) → ... → Food ready! Serve
  Table 3:                          Take order → (pass to kitchen) → ...
  → Attends to other tables while waiting for food
  → One waiter can efficiently handle many tables
```

### 1.3 Definitions in Programming

```
Synchronous:
  - The caller waits for the operation to complete before proceeding
  - Order of execution is guaranteed
  - Code flow is linear and easy to understand
  - Results are received directly as function return values

Asynchronous:
  - The caller proceeds without waiting for the operation to complete
  - Results are delivered later (via callbacks, Promises, events, etc.)
  - Order of execution can become non-deterministic
  - More complex, but uses resources more efficiently
```

---

## 2. Blocking vs Non-Blocking

### 2.1 Basic Concepts

```
Blocking I/O:
  → Thread is suspended until I/O completes
  → Thread does not consume CPU, but remains occupied

  Thread1: [Receive request] → [DB query... 100ms wait...] → [Response]
  Thread2: [Receive request] → [API call... 200ms wait...] → [Response]
  Thread3: [Receive request] → [File read... 50ms wait...] → [Response]
  → Concurrent connections are limited by the number of threads

Non-Blocking I/O:
  → Control returns immediately after I/O starts
  → Notification via callback/event upon completion

  Thread1: [Request 1] [Request 2] [Request 3] [DB result handling] [API result handling]
  → A single thread can handle many requests
  → The Node.js model
```

### 2.2 Blocking I/O in Detail

With blocking I/O, the thread is blocked until the OS system call (read, write, connect, etc.) completes.

```typescript
// Blocking I/O conceptual illustration (pseudocode)
function handleRequest(socket: Socket): void {
  // 1. Read request (blocks)
  const request = socket.read(); // ← Thread stops here

  // 2. Query DB (blocks)
  const data = database.query("SELECT * FROM users"); // ← Thread stops here

  // 3. Call external API (blocks)
  const externalData = http.get("https://api.example.com/data"); // ← Thread stops here

  // 4. Write response (blocks)
  socket.write(buildResponse(data, externalData)); // ← Thread stops here
}
```

```java
// Java: Traditional blocking server
import java.net.ServerSocket;
import java.net.Socket;
import java.io.*;

public class BlockingServer {
    public static void main(String[] args) throws IOException {
        ServerSocket serverSocket = new ServerSocket(8080);

        while (true) {
            // accept() blocks until a client connects
            Socket clientSocket = serverSocket.accept();

            // Assign one thread per connection
            new Thread(() -> {
                try {
                    BufferedReader reader = new BufferedReader(
                        new InputStreamReader(clientSocket.getInputStream())
                    );
                    PrintWriter writer = new PrintWriter(
                        clientSocket.getOutputStream(), true
                    );

                    // readLine() blocks until data arrives
                    String line = reader.readLine();
                    writer.println("Echo: " + line);

                    clientSocket.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }).start();
        }
        // Problem: 10,000 connections = 10,000 threads (1MB each) = 10GB memory
    }
}
```

### 2.3 Non-Blocking I/O in Detail

```typescript
// Node.js: Non-blocking I/O
import * as http from 'http';
import * as fs from 'fs';

const server = http.createServer(async (req, res) => {
  // Non-blocking: control returns immediately after I/O starts
  // Other requests can be processed in the meantime
  try {
    const data = await fs.promises.readFile('data.json', 'utf8');
    const parsed = JSON.parse(data);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(parsed));
  } catch (err) {
    res.writeHead(500);
    res.end('Internal Server Error');
  }
});

server.listen(8080);
// A single thread can handle tens of thousands of concurrent connections
```

### 2.4 Caution: Don't Confuse Blocking and Non-Blocking

"Synchronous" and "blocking," as well as "asynchronous" and "non-blocking," are closely related but are strictly separate concepts.

```
                  Blocking                Non-Blocking
Synchronous       Synchronous Blocking    Synchronous Non-Blocking
                  (typical I/O)           (polling)
Asynchronous      Asynchronous Blocking   Asynchronous Non-Blocking
                  (select/poll)           (epoll/kqueue/IOCP)

Synchronous Blocking:
  → Calling read() suspends the thread until data arrives
  → Simplest but does not scale

Synchronous Non-Blocking (polling):
  → Calling read() immediately returns EWOULDBLOCK if no data is available
  → Application must check repeatedly
  → Prone to wasting CPU time

Asynchronous Non-Blocking:
  → Initiates I/O and returns immediately
  → Receives notification upon completion
  → Most efficient (the Node.js and nginx model)
```

### 2.5 OS-Level I/O Multiplexing

```
Linux:
  select()  → Limited number of monitored fds (1024)
  poll()    → No fd count limit, but scans all fds every time
  epoll()   → Event-driven, highly efficient (Linux 2.6+)

macOS/BSD:
  kqueue()  → Equivalent to epoll, for BSD-based OSes

Windows:
  IOCP (I/O Completion Ports) → Completion port model

Node.js's libuv:
  → Abstracts the optimal mechanism for each OS
  → Linux: epoll, macOS: kqueue, Windows: IOCP
  → File I/O: thread pool (4 threads by default)
  → Network I/O: OS async I/O
```

```c
// How to use epoll (C language, Linux)
#include <sys/epoll.h>
#include <stdio.h>
#include <unistd.h>
#include <fcntl.h>

int main() {
    int epoll_fd = epoll_create1(0);

    struct epoll_event event;
    event.events = EPOLLIN;  // Monitor for readable events
    event.data.fd = socket_fd;

    epoll_ctl(epoll_fd, EPOLL_CTL_ADD, socket_fd, &event);

    struct epoll_event events[MAX_EVENTS];

    while (1) {
        // Wait for events (blocks, but monitors multiple fds simultaneously)
        int nfds = epoll_wait(epoll_fd, events, MAX_EVENTS, -1);

        for (int i = 0; i < nfds; i++) {
            if (events[i].events & EPOLLIN) {
                // Data is readable
                handle_read(events[i].data.fd);
            }
        }
    }
}
```

---

## 3. Why Asynchronous Processing Is Necessary

### 3.1 CPU Cycles vs I/O Wait Times

```
CPU Cycles vs I/O Wait Times (approximate):

  Operation                 Time            CPU Cycle Equivalent
  ─────────────────────────────────────────────────
  L1 Cache                  1ns             1 cycle
  L2 Cache                  4ns             4 cycles
  L3 Cache                  12ns            12 cycles
  Main Memory               100ns           100 cycles
  SSD Random Read           16us            16,000 cycles
  SSD Sequential            50us            50,000 cycles
  HDD Random Read           4ms             4,000,000 cycles
  Network (same DC)         500us           500,000 cycles
  Network (same country)    30ms            30,000,000 cycles
  Network (intercontinental) 150ms          150,000,000 cycles
  TLS Handshake             250ms           250,000,000 cycles

  → During network I/O, the CPU does "nothing" for 150 million cycles
  → Asynchronous processing makes effective use of this wait time

In human time (if 1 CPU cycle = 1 second):
  L1 Cache       → 1 second
  Main Memory    → 1 minute 40 seconds
  SSD Read       → 4.5 hours
  HDD Read       → 46 days
  Network        → 4.8 years (!)
```

### 3.2 Concrete Effect: Web Server Response Time

```typescript
// Synchronous processing (not recommended in Node.js)
function syncHandler(req: Request): Response {
  const user = db.getUserSync(req.userId);      // 10ms wait
  const orders = db.getOrdersSync(user.id);     // 15ms wait
  const recommendations = api.getRecsSync(user); // 50ms wait
  return { user, orders, recommendations };
  // Total: 75ms (sequential execution)
}

// Asynchronous processing (concurrent execution)
async function asyncHandler(req: Request): Promise<Response> {
  const user = await db.getUser(req.userId);    // 10ms
  // After getting user, run the rest concurrently
  const [orders, recommendations] = await Promise.all([
    db.getOrders(user.id),                      // 15ms ┐
    api.getRecs(user),                           // 50ms ┤ concurrent
  ]);                                            //      ┘ max = 50ms
  return { user, orders, recommendations };
  // Total: 10 + 50 = 60ms (20% faster)
}
```

### 3.3 Impact on Throughput

```
Blocking server (thread pool approach):
  Thread count: 200 (Java Tomcat default)
  Average processing time per request: 100ms (of which I/O wait: 80ms)
  Max throughput: 200 / 0.1 = 2,000 req/sec

Non-blocking server (event loop approach):
  Thread count: 1 (Node.js)
  CPU execution time per request: 20ms (I/O wait time is used for other processing)
  Max throughput: 1 / 0.02 = 50 req/sec (when CPU-bound)
  However, there is no limit on concurrent connections
  → Even with 10,000 concurrent connections, memory usage remains low

Actual benchmarks (approximate):
  ┌────────────────────┬──────────────────┬───────────────────┐
  │ Server             │ 1,000 concurrent │ 10,000 concurrent │
  ├────────────────────┼──────────────────┼───────────────────┤
  │ Apache (prefork)   │ 5,000 req/s      │ Out of memory     │
  │ Nginx              │ 20,000 req/s     │ 18,000 req/s      │
  │ Node.js            │ 15,000 req/s     │ 12,000 req/s      │
  │ Go net/http        │ 25,000 req/s     │ 22,000 req/s      │
  └────────────────────┴──────────────────┴───────────────────┘
  * Actual numbers vary significantly depending on workload and hardware
```

### 3.4 The C10K Problem

```
The C10K Problem (proposed by Dan Kegel in 1999):
  → Can a single server handle 10,000 concurrent connections?

Traditional approach (one thread per connection):
  10,000 connections x 1MB/thread = 10GB memory
  → Enormous thread context switching overhead
  → Practically impossible

Solutions:
  1. Event-driven (epoll/kqueue) + non-blocking I/O
     → Nginx, Node.js, HAProxy
  2. Lightweight threads / coroutines
     → Go (goroutine: ~2KB), Erlang (process: ~2KB)
  3. Asynchronous I/O (io_uring, IOCP)
     → Latest Linux kernels (5.1+)

Current challenge: The C10M Problem
  → Handling 10 million connections on a single server
  → Kernel bypass (DPDK, XDP), user-space networking
```

### 3.5 Real-World Effects of Asynchronous Processing

```typescript
// E-commerce product page: sequential version
async function getProductPageSync(productId: string) {
  const start = Date.now();

  const product = await getProduct(productId);           // 20ms
  const reviews = await getReviews(productId);           // 30ms
  const relatedProducts = await getRelated(productId);   // 25ms
  const inventory = await getInventory(productId);       // 15ms
  const pricing = await getPricing(productId);           // 10ms
  const seller = await getSeller(product.sellerId);      // 20ms

  console.log(`Sequential execution: ${Date.now() - start}ms`);
  // → 120ms
  return { product, reviews, relatedProducts, inventory, pricing, seller };
}

// E-commerce product page: optimized version
async function getProductPageOptimized(productId: string) {
  const start = Date.now();

  // Stage 1: Run independent tasks concurrently
  const [product, reviews, relatedProducts, inventory, pricing] =
    await Promise.all([
      getProduct(productId),           // 20ms ┐
      getReviews(productId),           // 30ms ┤
      getRelated(productId),           // 25ms ┤ concurrent
      getInventory(productId),         // 15ms ┤
      getPricing(productId),           // 10ms ┘
    ]);
  // Stage 1: max(20, 30, 25, 15, 10) = 30ms

  // Stage 2: Processing that depends on product
  const seller = await getSeller(product.sellerId); // 20ms

  console.log(`Optimized version: ${Date.now() - start}ms`);
  // → 50ms (58% faster)
  return { product, reviews, relatedProducts, inventory, pricing, seller };
}
```

---

## 4. Asynchronous Models Across Languages

### 4.1 Model Overview

```
┌──────────────┬───────────────────────────────┐
│ Language     │ Asynchronous Model            │
├──────────────┼───────────────────────────────┤
│ JavaScript   │ Event loop + Promise          │
│ Python       │ asyncio (event loop)          │
│ Rust         │ async/await + runtime (tokio) │
│ Go           │ goroutine + channel           │
│ Java         │ Threads + CompletableFuture   │
│ Kotlin       │ coroutines                    │
│ Swift        │ structured concurrency        │
│ Elixir       │ Actor model (BEAM)            │
│ C#           │ Task + async/await            │
│ C++          │ std::async + co_await (C++20) │
└──────────────┴───────────────────────────────┘

Three major approaches:
  1. Event loop (JS, Python): Single-threaded + async I/O
  2. Green threads (Go, Erlang): Many lightweight threads
  3. OS threads + async (Java, C#): Thread pool + Future
```

### 4.2 JavaScript / TypeScript

```typescript
// JavaScript: Single-threaded + event loop
// Shared model for browser and Node.js

// 1. Promise-based
function fetchUserData(userId: string): Promise<User> {
  return fetch(`/api/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    });
}

// 2. async/await (syntactic sugar over Promises)
async function fetchUserData(userId: string): Promise<User> {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

// 3. Node.js specific: Worker Threads (for CPU-intensive tasks)
import { Worker, isMainThread, parentPort } from 'worker_threads';

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.on('message', (result) => {
    console.log('Computation result:', result);
  });
  worker.postMessage({ data: largeArray });
} else {
  parentPort?.on('message', (msg) => {
    // Execute CPU-intensive processing in a worker thread
    const result = heavyComputation(msg.data);
    parentPort?.postMessage(result);
  });
}
```

### 4.3 Python

```python
import asyncio
import aiohttp

# Python: asyncio event loop
# Due to the GIL (Global Interpreter Lock),
# use multiprocessing for CPU parallelism and asyncio for I/O concurrency

# Basic async function
async def fetch_user(user_id: str) -> dict:
    async with aiohttp.ClientSession() as session:
        async with session.get(f"https://api.example.com/users/{user_id}") as resp:
            return await resp.json()

# Concurrent execution
async def fetch_all_users(user_ids: list[str]) -> list[dict]:
    tasks = [fetch_user(uid) for uid in user_ids]
    return await asyncio.gather(*tasks)

# Execution
async def main():
    users = await fetch_all_users(["user-1", "user-2", "user-3"])
    for user in users:
        print(user["name"])

asyncio.run(main())

# CPU-intensive: multiprocessing
from concurrent.futures import ProcessPoolExecutor
import asyncio

async def cpu_intensive_async(data_list: list) -> list:
    loop = asyncio.get_event_loop()
    with ProcessPoolExecutor() as pool:
        results = await asyncio.gather(*[
            loop.run_in_executor(pool, heavy_computation, data)
            for data in data_list
        ])
    return results
```

### 4.4 Go

```go
package main

import (
    "fmt"
    "net/http"
    "sync"
    "time"
)

// Go: goroutine + channel
// Goroutines are lightweight threads (~2KB), scheduled by the runtime on top of OS threads

// Basic asynchronous execution
func fetchURL(url string, ch chan<- string, wg *sync.WaitGroup) {
    defer wg.Done()
    resp, err := http.Get(url)
    if err != nil {
        ch <- fmt.Sprintf("Error: %s", err)
        return
    }
    defer resp.Body.Close()
    ch <- fmt.Sprintf("%s: %d", url, resp.StatusCode)
}

func main() {
    urls := []string{
        "https://api.example.com/users",
        "https://api.example.com/orders",
        "https://api.example.com/products",
    }

    ch := make(chan string, len(urls))
    var wg sync.WaitGroup

    for _, url := range urls {
        wg.Add(1)
        go fetchURL(url, ch, &wg) // Concurrent execution with goroutines
    }

    // Wait for all to complete
    go func() {
        wg.Wait()
        close(ch)
    }()

    for result := range ch {
        fmt.Println(result)
    }
}

// Waiting on multiple channels with select
func fetchWithTimeout(url string, timeout time.Duration) (string, error) {
    ch := make(chan string, 1)
    errCh := make(chan error, 1)

    go func() {
        resp, err := http.Get(url)
        if err != nil {
            errCh <- err
            return
        }
        defer resp.Body.Close()
        ch <- resp.Status
    }()

    select {
    case result := <-ch:
        return result, nil
    case err := <-errCh:
        return "", err
    case <-time.After(timeout):
        return "", fmt.Errorf("timeout after %v", timeout)
    }
}
```

### 4.5 Rust

```rust
use tokio;
use reqwest;

// Rust: async/await + runtime (tokio)
// Zero-cost abstraction: async functions compile to state machines
// Futures are lazy: they don't execute until .await is called

async fn fetch_user(user_id: &str) -> Result<User, reqwest::Error> {
    let url = format!("https://api.example.com/users/{}", user_id);
    let user: User = reqwest::get(&url)
        .await?
        .json()
        .await?;
    Ok(user)
}

// Concurrent execution
async fn fetch_all_data(user_id: &str) -> Result<Dashboard, AppError> {
    // Concurrent execution with tokio::join!
    let (user, orders, notifications) = tokio::join!(
        fetch_user(user_id),
        fetch_orders(user_id),
        fetch_notifications(user_id),
    );

    Ok(Dashboard {
        user: user?,
        orders: orders?,
        notifications: notifications?,
    })
}

// Background tasks with tokio::spawn
async fn background_processing() {
    let handle = tokio::spawn(async {
        // Execute in the background
        heavy_async_work().await
    });

    // Continue with other work
    do_other_work().await;

    // Retrieve background task result
    let result = handle.await.unwrap();
}

#[tokio::main]
async fn main() {
    let dashboard = fetch_all_data("user-123").await.unwrap();
    println!("{:?}", dashboard);
}
```

### 4.6 Java

```java
import java.util.concurrent.*;

// Java: CompletableFuture (Java 8+)
// Virtual Threads (Java 21+ / Project Loom)

public class AsyncExample {

    // CompletableFuture-based
    public CompletableFuture<Dashboard> getDashboard(String userId) {
        CompletableFuture<User> userFuture =
            CompletableFuture.supplyAsync(() -> userRepo.findById(userId));

        CompletableFuture<List<Order>> ordersFuture =
            CompletableFuture.supplyAsync(() -> orderRepo.findByUserId(userId));

        CompletableFuture<List<Notification>> notifFuture =
            CompletableFuture.supplyAsync(() -> notifRepo.findByUserId(userId));

        // Combine when all complete
        return CompletableFuture.allOf(userFuture, ordersFuture, notifFuture)
            .thenApply(v -> new Dashboard(
                userFuture.join(),
                ordersFuture.join(),
                notifFuture.join()
            ));
    }

    // Java 21: Virtual Threads (Project Loom)
    public Dashboard getDashboardVirtualThreads(String userId) throws Exception {
        try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
            var userTask = scope.fork(() -> userRepo.findById(userId));
            var ordersTask = scope.fork(() -> orderRepo.findByUserId(userId));
            var notifTask = scope.fork(() -> notifRepo.findByUserId(userId));

            scope.join();
            scope.throwIfFailed();

            return new Dashboard(
                userTask.get(),
                ordersTask.get(),
                notifTask.get()
            );
        }
    }
}
```

### 4.7 C#

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

// C#: Task + async/await
// .NET's async model is one of the most mature

public class AsyncService
{
    private readonly HttpClient _httpClient;

    // async/await basics
    public async Task<Dashboard> GetDashboardAsync(string userId)
    {
        var user = await GetUserAsync(userId);

        // Concurrent execution
        var ordersTask = GetOrdersAsync(userId);
        var notificationsTask = GetNotificationsAsync(userId);

        await Task.WhenAll(ordersTask, notificationsTask);

        return new Dashboard
        {
            User = user,
            Orders = ordersTask.Result,
            Notifications = notificationsTask.Result
        };
    }

    // Cancellation token support
    public async Task<User> GetUserAsync(
        string userId,
        CancellationToken cancellationToken = default)
    {
        var response = await _httpClient.GetAsync(
            $"/api/users/{userId}",
            cancellationToken
        );
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<User>(
            cancellationToken: cancellationToken
        );
    }

    // ValueTask: hot path optimization
    public ValueTask<CachedData> GetCachedDataAsync(string key)
    {
        if (_cache.TryGetValue(key, out var cached))
        {
            // No heap allocation on cache hit
            return new ValueTask<CachedData>(cached);
        }

        // Async processing only on cache miss
        return new ValueTask<CachedData>(FetchAndCacheAsync(key));
    }
}
```

---

## 5. Choosing Between Synchronous and Asynchronous

### 5.1 Decision Criteria

```
Synchronous is appropriate:
  + CPU-intensive computation (numerical calculations, encryption, image processing)
  + Simple scripts and batch processing
  + Processing with little I/O
  + Processing that requires sequential execution (order guarantee needed)
  + When debuggability is important
  + Short-lived operations

Asynchronous is appropriate:
  + Network I/O (API calls, DB connections)
  + File I/O (large-scale file operations)
  + Servers handling many concurrent connections
  + Client apps where blocking the UI is undesirable
  + Real-time processing (WebSocket, chat)
  + Inter-microservice communication

Caveats:
  → Making CPU-intensive processing async is pointless
  → Don't block the event loop (a cardinal rule in Node.js)
  → Consider the overhead of async (context switching, memory)
```

### 5.2 Scenario-Based Guide

```typescript
// Scenario 1: File processing
// Good: Process many files concurrently with async
async function processFiles(filePaths: string[]): Promise<void> {
  const CONCURRENCY = 10; // Up to 10 files simultaneously
  const results: string[] = [];

  for (let i = 0; i < filePaths.length; i += CONCURRENCY) {
    const batch = filePaths.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map(async (filePath) => {
        const content = await fs.promises.readFile(filePath, 'utf8');
        return processContent(content);
      })
    );
    results.push(...batchResults);
  }
}

// Bad: For a single small file, synchronous is fine
// (startup scripts, config loading, etc.)
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
```

```python
# Scenario 2: Web scraping
import asyncio
import aiohttp
from typing import List, Dict

# Good: Fetch many URLs concurrently with async
async def scrape_urls(urls: list[str]) -> list[dict]:
    semaphore = asyncio.Semaphore(20)  # Limit concurrent connections

    async def fetch_one(session: aiohttp.ClientSession, url: str) -> dict:
        async with semaphore:
            async with session.get(url) as response:
                html = await response.text()
                return {"url": url, "status": response.status, "html": html}

    async with aiohttp.ClientSession() as session:
        tasks = [fetch_one(session, url) for url in urls]
        return await asyncio.gather(*tasks, return_exceptions=True)

# 100 URLs with 20 concurrent connections
# Synchronous: 100 x 200ms = 20 seconds
# Asynchronous: 100 / 20 x 200ms = 1 second (20x faster)
```

```go
// Scenario 3: Microservice API Gateway
package main

import (
    "context"
    "net/http"
    "time"
    "encoding/json"
    "golang.org/x/sync/errgroup"
)

type AggregatedResponse struct {
    User          *User          `json:"user"`
    Orders        []Order        `json:"orders"`
    Notifications []Notification `json:"notifications"`
}

// Good: Call multiple microservices concurrently
func aggregateHandler(w http.ResponseWriter, r *http.Request) {
    ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
    defer cancel()

    userID := r.URL.Query().Get("user_id")
    var resp AggregatedResponse

    g, ctx := errgroup.WithContext(ctx)

    g.Go(func() error {
        user, err := fetchUser(ctx, userID)
        if err != nil {
            return err
        }
        resp.User = user
        return nil
    })

    g.Go(func() error {
        orders, err := fetchOrders(ctx, userID)
        if err != nil {
            return err
        }
        resp.Orders = orders
        return nil
    })

    g.Go(func() error {
        notifs, err := fetchNotifications(ctx, userID)
        if err != nil {
            return err
        }
        resp.Notifications = notifs
        return nil
    })

    if err := g.Wait(); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(resp)
}
```

### 5.3 Anti-Patterns

```typescript
// Bad: Anti-pattern 1 - Running CPU-intensive work on the event loop
async function badImageProcessing(images: Buffer[]): Promise<Buffer[]> {
  // This blocks the event loop
  return images.map(img => {
    // Heavy image processing (synchronously occupies CPU)
    return sharp(img).resize(800, 600).toBuffer(); // ← Synchronous API
  });
}

// Good: Delegate CPU-intensive work to Worker Threads
import { Worker } from 'worker_threads';

async function goodImageProcessing(images: Buffer[]): Promise<Buffer[]> {
  const worker = new Worker('./image-worker.js');
  return new Promise((resolve, reject) => {
    worker.postMessage(images);
    worker.on('message', resolve);
    worker.on('error', reject);
  });
}

// Bad: Anti-pattern 2 - Unnecessary async
async function unnecessary(): Promise<number> {
  return 1 + 1; // ← No point making synchronous-sufficient code async
}

// Bad: Anti-pattern 3 - Ignoring async results
function fireAndForget(data: Data): void {
  saveToDatabase(data); // Promise result ignored → errors become invisible
}

// Good: Handle results properly
async function properSave(data: Data): Promise<void> {
  try {
    await saveToDatabase(data);
  } catch (error) {
    logger.error('Failed to save data', error);
    throw error; // Propagate to caller
  }
}
```

---

## 6. Patterns Frequently Encountered in Practice

### 6.1 Async Operations with Timeout

```typescript
// Fetch with timeout
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = 5000,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeoutMs}ms: ${url}`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Usage
try {
  const response = await fetchWithTimeout('https://api.example.com/data', {}, 3000);
  const data = await response.json();
} catch (error) {
  console.error('Request failed:', error.message);
}
```

### 6.2 Async Operations with Retry

```typescript
// Retry with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    initialDelayMs?: number;
    maxDelayMs?: number;
    backoffMultiplier?: number;
    retryableErrors?: (error: unknown) => boolean;
  } = {},
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelayMs = 1000,
    maxDelayMs = 30000,
    backoffMultiplier = 2,
    retryableErrors = () => true,
  } = options;

  let lastError: unknown;
  let delay = initialDelayMs;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === maxRetries || !retryableErrors(error)) {
        throw error;
      }

      // Add jitter (random variation)
      const jitter = delay * 0.1 * Math.random();
      const actualDelay = Math.min(delay + jitter, maxDelayMs);

      console.warn(
        `Attempt ${attempt + 1} failed, retrying in ${actualDelay}ms...`,
        error
      );

      await new Promise(resolve => setTimeout(resolve, actualDelay));
      delay *= backoffMultiplier;
    }
  }

  throw lastError;
}

// Usage
const data = await retryWithBackoff(
  () => fetchWithTimeout('https://api.example.com/data'),
  {
    maxRetries: 3,
    initialDelayMs: 1000,
    retryableErrors: (error) => {
      // Retry only on 5xx errors
      return error instanceof Error && error.message.includes('5');
    },
  }
);
```

### 6.3 Concurrency Limiting (Semaphore Pattern)

```typescript
// Semaphore: limits the number of concurrent executions
class Semaphore {
  private permits: number;
  private queue: (() => void)[] = [];

  constructor(permits: number) {
    this.permits = permits;
  }

  async acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
      return;
    }

    return new Promise<void>((resolve) => {
      this.queue.push(resolve);
    });
  }

  release(): void {
    const next = this.queue.shift();
    if (next) {
      next();
    } else {
      this.permits++;
    }
  }

  async use<T>(fn: () => Promise<T>): Promise<T> {
    await this.acquire();
    try {
      return await fn();
    } finally {
      this.release();
    }
  }
}

// Usage: API calls with 5 concurrent connections
const semaphore = new Semaphore(5);
const urls = Array.from({ length: 100 }, (_, i) => `https://api.example.com/item/${i}`);

const results = await Promise.all(
  urls.map(url =>
    semaphore.use(async () => {
      const response = await fetch(url);
      return response.json();
    })
  )
);
```

### 6.4 Cancellable Async Operations

```typescript
// Cancellation using AbortController
class CancellableTask<T> {
  private controller: AbortController;
  private promise: Promise<T>;

  constructor(executor: (signal: AbortSignal) => Promise<T>) {
    this.controller = new AbortController();
    this.promise = executor(this.controller.signal);
  }

  get result(): Promise<T> {
    return this.promise;
  }

  cancel(reason?: string): void {
    this.controller.abort(reason);
  }
}

// Usage: Auto-cancel search
let currentSearch: CancellableTask<SearchResult[]> | null = null;

async function search(query: string): Promise<SearchResult[]> {
  // Cancel previous search
  currentSearch?.cancel('New search started');

  currentSearch = new CancellableTask(async (signal) => {
    const response = await fetch(`/api/search?q=${query}`, { signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  });

  return currentSearch.result;
}
```

---

## 7. Performance Measurement and Optimization

### 7.1 Benchmarking Async Operations

```typescript
// Measuring processing time
async function benchmark<T>(
  name: string,
  fn: () => Promise<T>,
  iterations: number = 10,
): Promise<{ name: string; avg: number; min: number; max: number; p95: number }> {
  const times: number[] = [];

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    await fn();
    times.push(performance.now() - start);
  }

  times.sort((a, b) => a - b);

  return {
    name,
    avg: times.reduce((sum, t) => sum + t, 0) / times.length,
    min: times[0],
    max: times[times.length - 1],
    p95: times[Math.floor(times.length * 0.95)],
  };
}

// Comparison test
async function compareSyncVsAsync(): Promise<void> {
  const syncResult = await benchmark('Sequential', async () => {
    const a = await fetchA();
    const b = await fetchB();
    const c = await fetchC();
    return { a, b, c };
  });

  const asyncResult = await benchmark('Parallel', async () => {
    const [a, b, c] = await Promise.all([
      fetchA(),
      fetchB(),
      fetchC(),
    ]);
    return { a, b, c };
  });

  console.table([syncResult, asyncResult]);
  // ┌─────────────┬──────────┬──────────┬──────────┬──────────┐
  // │ name        │ avg      │ min      │ max      │ p95      │
  // ├─────────────┼──────────┼──────────┼──────────┼──────────┤
  // │ Sequential  │ 312.5ms  │ 301.2ms  │ 325.8ms  │ 321.3ms  │
  // │ Parallel    │ 105.3ms  │ 100.1ms  │ 115.2ms  │ 112.7ms  │
  // └─────────────┴──────────┴──────────┴──────────┴──────────┘
}
```

### 7.2 Common Bottlenecks and Countermeasures

```
Bottleneck 1: Insufficient DB connection pool
  Symptom: DB connection wait under high concurrent requests
  Solution: Set pool size appropriately (CPU cores x 2 + number of disks)

Bottleneck 2: External API rate limiting
  Symptom: 429 Too Many Requests
  Solution: Limit concurrency with semaphore, use rate-limiting libraries

Bottleneck 3: Memory leaks (Promise accumulation)
  Symptom: Heap memory continuously increasing
  Solution: Release unnecessary Promise references, use WeakRef

Bottleneck 4: Event loop blocking
  Symptom: Sudden spikes in response time
  Solution: Move CPU work to Worker Threads, detect with tools like blocked-at

Bottleneck 5: DNS resolution delay
  Symptom: Only the first request is slow
  Solution: DNS prefetch, use keep-alive connections
```

---

## 8. Testing Async Operations

### 8.1 Basic Test Patterns

```typescript
import { describe, it, expect, vi } from 'vitest';

// Testing async functions
describe('fetchUserData', () => {
  // Basic test
  it('successfully retrieves user data', async () => {
    const user = await fetchUserData('user-123');
    expect(user).toEqual({
      id: 'user-123',
      name: 'Test User',
    });
  });

  // Error test
  it('throws an error for non-existent user', async () => {
    await expect(fetchUserData('nonexistent'))
      .rejects.toThrow('User not found');
  });

  // Timeout test
  it('throws an error on timeout', async () => {
    vi.useFakeTimers();

    const promise = fetchWithTimeout('https://slow.api.com', {}, 3000);

    vi.advanceTimersByTime(3000);

    await expect(promise).rejects.toThrow('timeout');

    vi.useRealTimers();
  });

  // Using mocks
  it('tests with mocked API', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: '123', name: 'Test' }),
    });

    global.fetch = mockFetch;

    const result = await fetchUserData('123');
    expect(result.name).toBe('Test');
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/users/123')
    );
  });
});
```

### 8.2 Testing Concurrent Processing

```typescript
describe('Promise.all pattern tests', () => {
  it('confirms order independence of concurrent execution', async () => {
    const results: string[] = [];

    const task1 = async () => {
      await sleep(100);
      results.push('task1');
      return 'result1';
    };

    const task2 = async () => {
      await sleep(50);
      results.push('task2');
      return 'result2';
    };

    const [r1, r2] = await Promise.all([task1(), task2()]);

    expect(r1).toBe('result1');
    expect(r2).toBe('result2');
    // task2 completes first, but the result order is preserved
    expect(results).toEqual(['task2', 'task1']);
  });

  it('handles partial failures', async () => {
    const results = await Promise.allSettled([
      Promise.resolve('success'),
      Promise.reject(new Error('failure')),
      Promise.resolve('success2'),
    ]);

    expect(results[0]).toEqual({ status: 'fulfilled', value: 'success' });
    expect(results[1].status).toBe('rejected');
    expect(results[2]).toEqual({ status: 'fulfilled', value: 'success2' });
  });
});
```

---

## 9. Debugging Techniques

### 9.1 Debugging Async Operations

```typescript
// Tracing async operations using async_hooks (Node.js)
import { AsyncLocalStorage } from 'async_hooks';

const requestStorage = new AsyncLocalStorage<{ requestId: string }>();

// Propagate request ID as context
async function handleRequest(req: Request): Promise<Response> {
  const requestId = generateRequestId();

  return requestStorage.run({ requestId }, async () => {
    logger.info(`[${requestId}] Request started`);

    const user = await getUser(req.userId);
    logger.info(`[${requestId}] User retrieved`);

    const data = await processData(user);
    logger.info(`[${requestId}] Data processing complete`);

    return new Response(JSON.stringify(data));
  });
}

// Request ID can be retrieved from any async operation
function getRequestId(): string {
  return requestStorage.getStore()?.requestId ?? 'unknown';
}
```

### 9.2 Detecting Unhandled Rejections

```typescript
// Node.js: Detect unhandled Promise Rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Promise Rejection:', reason);
  console.error('Promise:', promise);
  // In production, log and send alerts
  logger.error('Unhandled Promise Rejection', {
    reason: reason instanceof Error ? reason.message : String(reason),
    stack: reason instanceof Error ? reason.stack : undefined,
  });
});

// Browser
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled Promise Rejection:', event.reason);
  event.preventDefault(); // Suppress default console error
  // Report to error tracking service
  errorTracker.captureException(event.reason);
});
```

### 9.3 Profiling Async Operations

```typescript
// Visualizing async operation performance
class AsyncProfiler {
  private traces: Map<string, { start: number; end?: number }[]> = new Map();

  wrap<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const entry = { start: performance.now() };

    if (!this.traces.has(name)) {
      this.traces.set(name, []);
    }
    this.traces.get(name)!.push(entry);

    return fn().finally(() => {
      entry.end = performance.now();
    });
  }

  report(): void {
    console.log('\n=== Async Performance Report ===');
    for (const [name, entries] of this.traces) {
      const durations = entries
        .filter(e => e.end !== undefined)
        .map(e => e.end! - e.start);
      const avg = durations.reduce((s, d) => s + d, 0) / durations.length;
      const max = Math.max(...durations);
      console.log(`${name}: calls=${entries.length}, avg=${avg.toFixed(1)}ms, max=${max.toFixed(1)}ms`);
    }
  }
}

// Usage
const profiler = new AsyncProfiler();

const user = await profiler.wrap('getUser', () => getUser(userId));
const [orders, reviews] = await Promise.all([
  profiler.wrap('getOrders', () => getOrders(user.id)),
  profiler.wrap('getReviews', () => getReviews(user.id)),
]);

profiler.report();
// === Async Performance Report ===
// getUser: calls=1, avg=12.3ms, max=12.3ms
// getOrders: calls=1, avg=18.7ms, max=18.7ms
// getReviews: calls=1, avg=45.2ms, max=45.2ms
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


## FAQ

### Q1: What is the most important point to focus on when learning this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory, but by actually writing and running code to see how things work.

### Q2: What are common mistakes beginners make?

Skipping the basics and jumping to advanced topics. We recommend solidly understanding the fundamental concepts explained in this guide before moving on to the next step.

### Q3: How is this applied in real-world development?

The knowledge from this topic is frequently applied in day-to-day development work. It becomes especially important during code reviews and architecture design.

---

## Summary

| Concept | Synchronous | Asynchronous |
|---------|-------------|--------------|
| Execution | Waits in order | Processes other work during wait times |
| I/O | Blocking | Non-blocking |
| Performance | Wastes time on I/O waits | Makes effective use of I/O waits |
| Complexity | Simple | Callbacks/Promises |
| Best for | CPU-intensive | I/O-intensive |
| Scalability | Limited by thread count | Handles many concurrent connections |
| Debugging | Easy (linear stack traces) | Difficult (async stack traces) |
| Memory | ~1MB per thread | ~2KB per event/goroutine |

### Decision Flowchart

```
What type of processing?
├── CPU-intensive (computation, encryption, image processing)
│   ├── Single task → Synchronous
│   └── Parallel computation needed → Worker Threads / multiprocessing
├── I/O-intensive (API, DB, files)
│   ├── Single operation → async/await
│   ├── Multiple independent I/O → Promise.all / gather / join!
│   └── Streams → Observable / AsyncIterator / Channel
└── Mixed
    ├── I/O → Asynchronous
    └── CPU → Delegate to workers
```

---

## Recommended Next Reads

---

## References
1. Kleppmann, M. "Designing Data-Intensive Applications." O'Reilly, 2017.
2. Node.js Documentation. "Don't Block the Event Loop."
3. Kegel, D. "The C10K Problem." 1999. http://www.kegel.com/c10k.html
4. Pike, R. "Concurrency Is Not Parallelism." Waza Conference, 2012.
5. Mozilla Developer Network. "Asynchronous JavaScript." MDN Web Docs.
6. Python Documentation. "asyncio - Asynchronous I/O." docs.python.org.
7. Tokio Documentation. "Tutorial." tokio.rs.
8. Microsoft. "Asynchronous programming with async and await." docs.microsoft.com.
9. OpenJDK. "JEP 444: Virtual Threads." openjdk.org.
10. Nginx Documentation. "Inside NGINX: How We Designed for Performance & Scale."



===== SOURCE: 02-programming/async-and-error-handling/docs/00-introduction/01-concurrency-models.md =====

# Concurrency Models Overview

> Three major models for programs to "do multiple things at once": multithreading, event loops, and the actor model. This guide compares the mechanics, advantages, and disadvantages of each.

## Learning Objectives

- [ ] Understand the difference between concurrency and parallelism
- [ ] Grasp the characteristics of the three major concurrency models
- [ ] Learn the use cases each model excels at
- [ ] Understand the CSP (Communicating Sequential Processes) model
- [ ] Acquire criteria for selecting concurrency models in practice

## Prerequisites

Having the following knowledge will deepen your understanding of this guide:

- Basic programming knowledge
- Understanding of related foundational concepts
- Understanding of the content in [Synchronous vs Asynchronous](./00-sync-vs-async.md)

---

## 1. Concurrency vs Parallelism

### 1.1 Fundamental Concepts

```
Concurrency:
  -> Progresses multiple tasks by "switching between" them
  -> Possible even with a single CPU core
  -> A matter of "structure"

  Core 1: [Task A] [Task B] [Task A] [Task C] [Task B]

Parallelism:
  -> Executes multiple tasks "simultaneously"
  -> Requires multiple CPU cores
  -> A matter of "execution"

  Core 1: [Task A] [Task A] [Task A]
  Core 2: [Task B] [Task B] [Task B]
  Core 3: [Task C] [Task C] [Task C]

Rob Pike (Go designer):
  "Concurrency is about dealing with lots of things at once.
   Parallelism is about doing lots of things at once."
```

### 1.2 Relationship Between Concurrency and Parallelism

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   Concurrent but not parallel:                      │
│   -> Switching tasks on a single core               │
│   -> Example: Node.js event loop                    │
│   -> 1 core handling multiple requests              │
│                                                     │
│   Parallel but not concurrent:                      │
│   -> SIMD (applying the same instruction to         │
│      multiple data)                                 │
│   -> Example: GPU matrix operations                 │
│   -> Parallel execution of the same operation       │
│      (not separate tasks)                           │
│                                                     │
│   Both concurrent and parallel:                     │
│   -> Multiple tasks running simultaneously on       │
│      multiple cores                                 │
│   -> Example: Go goroutines + multicore             │
│   -> Multiple tasks progressing simultaneously      │
│      on multiple cores                              │
│                                                     │
│   Neither:                                          │
│   -> Sequential execution of a single task          │
│      on a single core                               │
│   -> Example: an ordinary for loop                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 1.3 Levels of Concurrency

```
Level 1: Process-level concurrency
  -> OS schedules multiple processes
  -> Memory spaces are isolated between processes
  -> Communication via IPC (Inter-Process Communication)
  -> Example: fork(), multi-process web servers (Apache prefork)

Level 2: Thread-level concurrency
  -> Multiple threads within a single process
  -> Shared memory space -> synchronization required
  -> Example: Java threads, C++ std::thread, Python threading

Level 3: Coroutine/fiber-level concurrency
  -> Switching in user space (no kernel involvement)
  -> Extremely lightweight
  -> Example: Go goroutines, Kotlin coroutines, Python asyncio

Level 4: Instruction-level parallelism (ILP)
  -> CPU executes instructions in parallel via pipelining/superscalar
  -> Transparent to the programmer
  -> Example: CPU out-of-order execution

Level 5: Data-level parallelism (DLP)
  -> Applies the same instruction to multiple data elements
  -> Example: SIMD (SSE, AVX), GPU CUDA/OpenCL
```

### 1.4 Concurrency and Parallelism in Code

```go
package main

import (
    "fmt"
    "runtime"
    "sync"
    "time"
)

func main() {
    // Concurrent but not parallel (using only 1 core)
    runtime.GOMAXPROCS(1) // Limit the number of OS threads to 1

    var wg sync.WaitGroup
    start := time.Now()

    for i := 0; i < 4; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            time.Sleep(100 * time.Millisecond)
            fmt.Printf("goroutine %d done at %v\n", id, time.Since(start))
        }(i)
    }
    wg.Wait()
    fmt.Printf("1 core: total %v\n\n", time.Since(start))
    // -> About 100ms (I/O waits are processed concurrently, so total is ~100ms)

    // Both concurrent and parallel (using all cores)
    runtime.GOMAXPROCS(runtime.NumCPU())
    start = time.Now()

    for i := 0; i < 4; i++ {
        wg.Add(1)
        go func(id int) {
            defer wg.Done()
            // CPU-intensive processing
            sum := 0
            for j := 0; j < 100_000_000; j++ {
                sum += j
            }
            fmt.Printf("goroutine %d done at %v\n", id, time.Since(start))
        }(i)
    }
    wg.Wait()
    fmt.Printf("all cores: total %v\n", time.Since(start))
    // -> CPU-intensive work is accelerated through parallel execution
}
```

```python
import asyncio
import time
import multiprocessing

# Concurrency (asyncio) and parallelism (multiprocessing) in Python

# Concurrency: efficiently handling I/O waits
async def concurrent_io():
    """Single-threaded, but processes other tasks while waiting on I/O"""
    start = time.time()

    async def fetch(name: str, delay: float) -> str:
        await asyncio.sleep(delay)  # Simulate I/O wait
        return f"{name} done"

    # Run 4 I/O tasks concurrently
    results = await asyncio.gather(
        fetch("A", 0.1),
        fetch("B", 0.2),
        fetch("C", 0.15),
        fetch("D", 0.1),
    )
    print(f"Concurrent I/O: {time.time() - start:.3f}s")
    # -> About 0.2 seconds (the time of the slowest task)
    return results

# Parallelism: processing CPU-intensive work across multiple cores
def cpu_heavy(n: int) -> int:
    """CPU-intensive processing"""
    return sum(range(n))

def parallel_cpu():
    """Parallel execution across multiple processes"""
    start = time.time()
    with multiprocessing.Pool(4) as pool:
        results = pool.map(cpu_heavy, [10_000_000] * 4)
    print(f"Parallel CPU: {time.time() - start:.3f}s")
    return results

if __name__ == "__main__":
    asyncio.run(concurrent_io())
    parallel_cpu()
```

---

## 2. Multithreading Model

### 2.1 Basic Structure

```
Mechanism:
  -> Creates multiple OS threads
  -> Exchanges data via shared memory
  -> Uses locks (Mutex) for mutual exclusion

  Thread 1 ─────────────────────────→
  Thread 2 ─────────────────────────→
  Thread 3 ─────────────────────────→
       ↕ Shared Memory ↕
  ┌──────────────────┐
  │  Shared State    │ <- Locked with Mutex
  └──────────────────┘

Advantages:
  ✓ True parallel execution (utilizes multiple cores)
  ✓ Well suited for CPU-intensive tasks
  ✓ OS handles scheduling automatically

Disadvantages:
  ✗ Complex lock management for shared state
  ✗ Deadlocks, race conditions
  ✗ Thread creation overhead (~1MB/thread)
  ✗ Difficult to debug

Representative languages: Java, C++, Python (with GIL), Rust
```

### 2.2 Java Multithreading

```java
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicLong;
import java.util.concurrent.locks.ReentrantLock;

public class MultithreadingExamples {

    // Basic: Thread class
    public void basicThread() {
        Thread thread = new Thread(() -> {
            System.out.println("Running in thread: " + Thread.currentThread().getName());
        });
        thread.start();
    }

    // Thread pool: ExecutorService
    public void threadPool() {
        // Pool size matched to CPU count
        int poolSize = Runtime.getRuntime().availableProcessors();
        ExecutorService executor = Executors.newFixedThreadPool(poolSize);

        List<Future<String>> futures = new ArrayList<>();

        for (int i = 0; i < 10; i++) {
            final int taskId = i;
            futures.add(executor.submit(() -> {
                Thread.sleep(100);
                return "Task " + taskId + " completed";
            }));
        }

        // Collect results
        for (Future<String> future : futures) {
            try {
                System.out.println(future.get(5, TimeUnit.SECONDS));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        executor.shutdown();
    }

    // Managing shared state: synchronized
    private int counter = 0;

    public synchronized void incrementSafe() {
        counter++;
    }

    // Finer-grained lock control: ReentrantLock
    private final ReentrantLock lock = new ReentrantLock();
    private final Map<String, String> sharedMap = new HashMap<>();

    public void updateMap(String key, String value) {
        lock.lock();
        try {
            sharedMap.put(key, value);
        } finally {
            lock.unlock(); // Always release the lock in finally
        }
    }

    // Lock-free: Atomic variables
    private final AtomicLong atomicCounter = new AtomicLong(0);

    public void atomicIncrement() {
        atomicCounter.incrementAndGet(); // Thread-safe via CAS operation
    }

    // Producer-Consumer pattern
    public void producerConsumer() {
        BlockingQueue<String> queue = new LinkedBlockingQueue<>(100);

        // Producer
        new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                try {
                    queue.put("Item " + i); // Blocks if the queue is full
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }).start();

        // Consumer
        new Thread(() -> {
            while (true) {
                try {
                    String item = queue.take(); // Blocks if the queue is empty
                    process(item);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        }).start();
    }
}
```

### 2.3 Rust Thread Model

```rust
use std::sync::{Arc, Mutex, RwLock};
use std::thread;

// Rust: ownership system guarantees thread safety at compile time

fn basic_threading() {
    let mut handles = vec![];

    for i in 0..4 {
        let handle = thread::spawn(move || {
            println!("Thread {} running", i);
            i * 2
        });
        handles.push(handle);
    }

    let results: Vec<i32> = handles.into_iter()
        .map(|h| h.join().unwrap())
        .collect();
    println!("Results: {:?}", results);
}

// Shared state with Arc<Mutex<T>>
fn shared_state() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
            // Lock is automatically released when the scope ends
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Counter: {}", *counter.lock().unwrap());
}

// RwLock: multiple concurrent reads, exclusive writes
fn read_write_lock() {
    let data = Arc::new(RwLock::new(vec![1, 2, 3]));

    // Multiple reader threads
    let mut readers = vec![];
    for i in 0..5 {
        let data = Arc::clone(&data);
        readers.push(thread::spawn(move || {
            let values = data.read().unwrap(); // Read lock
            println!("Reader {}: {:?}", i, *values);
        }));
    }

    // Writer thread
    {
        let data = Arc::clone(&data);
        thread::spawn(move || {
            let mut values = data.write().unwrap(); // Write lock
            values.push(4);
        }).join().unwrap();
    }

    for reader in readers {
        reader.join().unwrap();
    }
}

// Compile error example: Rust prevents data races
// fn compile_error() {
//     let mut data = vec![1, 2, 3];
//
//     // Compile error: cannot move data into multiple threads
//     thread::spawn(|| { data.push(4); });
//     thread::spawn(|| { data.push(5); });
//
//     // -> Must use Arc<Mutex<Vec<i32>>> instead
// }
```

### 2.4 Dangers of Multithreading

```
Deadlock:
  Thread A: lock(X) -> lock(Y)
  Thread B: lock(Y) -> lock(X)
  -> Each thread waits indefinitely for the other to release its lock

  Prevention strategies:
  1. Unify lock acquisition order
  2. Timed locks (tryLock)
  3. Lock hierarchy protocol

Race condition:
  Thread A: read(x) -> x + 1 -> write(x)
  Thread B: read(x) -> x + 1 -> write(x)
  -> Both read x simultaneously and write the same value + 1
  -> x only increases by 1 (should increase by 2)

  Prevention strategies:
  1. Mutex / synchronized
  2. Atomic operations (CAS)
  3. Immutable data structures

Priority Inversion:
  -> Low-priority thread holds a lock
  -> High-priority thread waits for the lock
  -> Medium-priority thread preempts the low-priority thread
  -> High-priority thread waits forever

  Prevention strategies:
  1. Priority Inheritance Protocol
  2. Minimize lock hold time
```

```java
// Deadlock example
public class DeadlockExample {
    private final Object lockA = new Object();
    private final Object lockB = new Object();

    // Potential deadlock
    public void method1() {
        synchronized (lockA) {
            System.out.println("Thread 1: locked A");
            // Meanwhile, Thread 2 acquires lockB
            synchronized (lockB) {
                System.out.println("Thread 1: locked B");
            }
        }
    }

    public void method2() {
        synchronized (lockB) {
            System.out.println("Thread 2: locked B");
            // lockA is held by Thread 1 -> deadlock
            synchronized (lockA) {
                System.out.println("Thread 2: locked A");
            }
        }
    }

    // Fix: unify lock order
    public void method1Fixed() {
        synchronized (lockA) {  // Always acquire A first
            synchronized (lockB) {
                System.out.println("Thread 1: locked A, B");
            }
        }
    }

    public void method2Fixed() {
        synchronized (lockA) {  // Always acquire A first
            synchronized (lockB) {
                System.out.println("Thread 2: locked A, B");
            }
        }
    }
}
```

---

## 3. Event Loop Model

### 3.1 Basic Structure

```
Mechanism:
  -> Processes an event queue on a single thread
  -> I/O is non-blocking (delegated to the OS)
  -> Adds callbacks to the queue when I/O completes

  ┌──────────────────────────────────────┐
  │           Event Loop                 │
  │  ┌──────────────────────────────┐   │
  │  │ 1. Execute call stack        │   │
  │  │ 2. Process microtasks        │   │
  │  │ 3. Execute one macrotask     │   │
  │  │ 4. -> Return to step 1      │   │
  │  └──────────────────────────────┘   │
  │         ↑ Completion notification   │
  │  ┌──────────────────────────────┐   │
  │  │ OS / libuv (I/O management)  │   │
  │  │ Network, files, timers       │   │
  │  └──────────────────────────────┘   │
  └──────────────────────────────────────┘

Advantages:
  ✓ No lock needed for shared state (single-threaded)
  ✓ Excels at handling massive concurrent connections (solves C10K)
  ✓ Memory efficient

Disadvantages:
  ✗ Not suited for CPU-intensive tasks (blocks the event loop)
  ✗ Cannot directly utilize multiple cores
  ✗ Callback hell (improved with async/await)

Representative: JavaScript (Node.js/browser), Python (asyncio)
```

### 3.2 Node.js Event Loop in Detail

```
Node.js Event Loop Phases:

  ┌───────────────────────┐
  │        timers          │ <- setTimeout, setInterval
  ├───────────────────────┤
  │    pending callbacks   │ <- Deferred I/O callbacks
  ├───────────────────────┤
  │     idle, prepare      │ <- Internal use
  ├───────────────────────┤
  │         poll           │ <- Retrieve I/O events, execute callbacks
  ├───────────────────────┤
  │        check           │ <- setImmediate
  ├───────────────────────┤
  │    close callbacks     │ <- close events
  └───────────────────────┘

Microtasks vs Macrotasks:
  Microtasks (high priority):
    - Promise.then/catch/finally
    - process.nextTick (Node.js)
    - queueMicrotask
    -> All processed between each phase

  Macrotasks (normal priority):
    - setTimeout/setInterval
    - setImmediate
    - I/O callbacks
    -> Processed one at a time
```

```typescript
// Verifying event loop execution order
console.log('1. Synchronous code');

setTimeout(() => {
  console.log('5. setTimeout (macrotask)');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise (microtask)');
}).then(() => {
  console.log('4. Promise chain (microtask)');
});

process.nextTick(() => {
  console.log('2. nextTick (microtask, highest priority)');
});

console.log('1.5. Synchronous code 2');

// Output order:
// 1. Synchronous code
// 1.5. Synchronous code 2
// 2. nextTick (microtask, highest priority)
// 3. Promise (microtask)
// 4. Promise chain (microtask)
// 5. setTimeout (macrotask)
```

### 3.3 Browser Event Loop

```typescript
// The browser event loop differs slightly from Node.js
// requestAnimationFrame has its own timing

console.log('1. Synchronous');

requestAnimationFrame(() => {
  console.log('4. requestAnimationFrame (before paint)');
});

setTimeout(() => {
  console.log('5. setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('2. Promise (microtask)');
});

queueMicrotask(() => {
  console.log('3. queueMicrotask');
});

// Output order:
// 1. Synchronous
// 2. Promise (microtask)
// 3. queueMicrotask
// 4. requestAnimationFrame (before the next paint frame)
// 5. setTimeout
```

### 3.4 Detecting Event Loop Blocking

```typescript
// Detecting event loop blocking
function detectEventLoopBlocking(): void {
  let lastCheck = Date.now();

  setInterval(() => {
    const now = Date.now();
    const lag = now - lastCheck - 100; // Set at 100ms intervals

    if (lag > 50) { // Delay over 50ms
      console.warn(`Event loop blocked for ${lag}ms`);
      // Could capture a stack trace here, etc.
    }

    lastCheck = now;
  }, 100);
}

// Node.js: monitorEventLoopDelay API (v11.10+)
import { monitorEventLoopDelay } from 'perf_hooks';

const h = monitorEventLoopDelay({ resolution: 20 });
h.enable();

setInterval(() => {
  console.log({
    min: h.min / 1e6,       // nanoseconds -> milliseconds
    max: h.max / 1e6,
    mean: h.mean / 1e6,
    p99: h.percentile(99) / 1e6,
  });
  h.reset();
}, 5000);
```

### 3.5 Python asyncio Event Loop

```python
import asyncio
import time

# Python's asyncio event loop

# Basic coroutine
async def fetch_data(name: str, delay: float) -> str:
    print(f"[{time.time():.3f}] {name}: start")
    await asyncio.sleep(delay)  # Simulate I/O wait
    print(f"[{time.time():.3f}] {name}: done")
    return f"{name} result"

# Concurrent task execution
async def main():
    # Concurrent execution with asyncio.create_task
    task1 = asyncio.create_task(fetch_data("API-1", 0.2))
    task2 = asyncio.create_task(fetch_data("API-2", 0.3))
    task3 = asyncio.create_task(fetch_data("DB", 0.1))

    # Wait for all to complete
    results = await asyncio.gather(task1, task2, task3)
    print(f"All results: {results}")

    # With timeout
    try:
        result = await asyncio.wait_for(
            fetch_data("Slow API", 5.0),
            timeout=1.0
        )
    except asyncio.TimeoutError:
        print("Timeout!")

asyncio.run(main())

# Using a custom event loop
# uvloop: a high-performance event loop based on libuv
import uvloop

async def high_performance_main():
    # uvloop is 2-4x faster than CPython's default event loop
    pass

uvloop.install()
asyncio.run(high_performance_main())
```

---

## 4. Actor Model

### 4.1 Basic Structure

```
Mechanism:
  -> Everything is an "actor" (an independent process)
  -> Actors communicate via message passing
  -> No shared state (each actor owns its own state)

  ┌─────────┐  Message     ┌─────────┐
  │ Actor A │────────────→│ Actor B │
  │ state_a │             │ state_b │
  └─────────┘             └─────────┘
       │                       │
       │  Message              │ Message
       ↓                       ↓
  ┌─────────┐             ┌─────────┐
  │ Actor C │             │ Actor D │
  │ state_c │             │ state_d │
  └─────────┘             └─────────┘

Advantages:
  ✓ No shared state (no locks needed)
  ✓ Naturally extends to distributed systems
  ✓ Fault tolerance (actor restarts)
  ✓ Scalability

Disadvantages:
  ✗ Message passing overhead
  ✗ Difficult to debug (asynchronous messages)
  ✗ Steep learning curve

Representative: Erlang/Elixir (BEAM), Akka (Scala/Java)
```

### 4.2 Erlang/Elixir Actor Model

```elixir
# Elixir: a typical implementation of the actor model

# GenServer: a generic server process
defmodule CounterServer do
  use GenServer

  # Client API
  def start_link(initial_value \\ 0) do
    GenServer.start_link(__MODULE__, initial_value, name: __MODULE__)
  end

  def increment() do
    GenServer.cast(__MODULE__, :increment)  # Asynchronous message
  end

  def get_value() do
    GenServer.call(__MODULE__, :get_value)  # Synchronous message (waits for reply)
  end

  # Server callbacks
  @impl true
  def init(initial_value) do
    {:ok, initial_value}
  end

  @impl true
  def handle_cast(:increment, state) do
    {:noreply, state + 1}
  end

  @impl true
  def handle_call(:get_value, _from, state) do
    {:reply, state, state}
  end
end

# Supervisor: fault tolerance through supervision trees
defmodule MyApp.Supervisor do
  use Supervisor

  def start_link(opts) do
    Supervisor.start_link(__MODULE__, :ok, opts)
  end

  @impl true
  def init(:ok) do
    children = [
      {CounterServer, 0},
      {WebSocketHandler, []},
      {DatabasePool, pool_size: 10},
    ]

    # one_for_one: if one process crashes, only restart that one
    # one_for_all: if one crashes, restart all
    # rest_for_one: restart all processes started after the crashed one
    Supervisor.init(children, strategy: :one_for_one)
  end
end

# Spawning massive numbers of processes (lightweight: ~2KB/process)
defmodule MassiveSpawn do
  def run(count) do
    pids = for _ <- 1..count do
      spawn(fn ->
        receive do
          {:ping, sender} -> send(sender, :pong)
        end
      end)
    end

    # Send a message to all processes
    for pid <- pids do
      send(pid, {:ping, self()})
    end

    # Receive responses from all processes
    for _ <- pids do
      receive do
        :pong -> :ok
      end
    end

    IO.puts("#{count} processes completed")
  end
end

# MassiveSpawn.run(1_000_000)  # 1 million processes work practically
```

### 4.3 Akka (Scala/Java)

```scala
import akka.actor.{Actor, ActorSystem, Props, ActorRef}

// Akka: the actor model on the JVM

// Actor definition
class CounterActor extends Actor {
  private var count = 0

  def receive: Receive = {
    case "increment" =>
      count += 1

    case "get" =>
      sender() ! count  // Send reply

    case "reset" =>
      count = 0
  }
}

// Usage example
object Main extends App {
  val system = ActorSystem("MySystem")
  val counter = system.actorOf(Props[CounterActor], "counter")

  // Send message (asynchronous, fire-and-forget)
  counter ! "increment"
  counter ! "increment"
  counter ! "increment"

  // Wait for reply (Ask pattern)
  import akka.pattern.ask
  import scala.concurrent.duration._
  implicit val timeout: akka.util.Timeout = 5.seconds

  val future = counter ? "get"  // Returns Future[Any]
  future.foreach(println)       // 3
}

// Supervision
class ParentActor extends Actor {
  import akka.actor.SupervisorStrategy._
  import scala.concurrent.duration._

  override val supervisorStrategy = OneForOneStrategy(
    maxNrOfRetries = 3,
    withinTimeRange = 1.minute
  ) {
    case _: ArithmeticException => Resume    // Resume
    case _: NullPointerException => Restart  // Restart
    case _: Exception => Escalate            // Escalate to parent
  }

  val child: ActorRef = context.actorOf(Props[ChildActor], "child")

  def receive: Receive = {
    case msg => child forward msg
  }
}
```

### 4.4 Actor Model Patterns

```
Pattern 1: Request-Reply
  Client ──Request──→ Actor ──Reply──→ Client
  -> Synchronous interaction (with timeout)

Pattern 2: Fire-and-Forget
  Sender ──Message──→ Actor
  -> No reply needed, asynchronous

Pattern 3: Publish-Subscribe
  Publisher ──Message──→ EventBus ──→ Subscriber1
                                  ──→ Subscriber2
                                  ──→ Subscriber3

Pattern 4: Scatter-Gather
  Coordinator ──Task──→ Worker1 ──Result──→ Aggregator
              ──Task──→ Worker2 ──Result──→
              ──Task──→ Worker3 ──Result──→

Pattern 5: Pipeline
  Stage1 ──→ Stage2 ──→ Stage3 ──→ Stage4
  -> Each stage is an actor
  -> Backpressure is possible

Pattern 6: Circuit Breaker
  -> Blocks messages to an actor after a certain number of consecutive failures
  -> Retries after a specified time
  -> Prevents failure cascading
```

---

## 5. CSP (Communicating Sequential Processes)

### 5.1 Basic Structure

```
Mechanism:
  -> Lightweight threads (goroutines) x many
  -> Data is sent and received through channels
  -> "Don't communicate by sharing memory; share memory by communicating"

  goroutine 1 ───→ [channel] ───→ goroutine 2
  goroutine 3 ───→ [channel] ───→ goroutine 4

Advantages:
  ✓ Lightweight (goroutine: ~2KB, thread: ~1MB)
  ✓ Safe communication via channels
  ✓ Runtime handles scheduling automatically
  ✓ Automatic multicore utilization

Representative: Go, Clojure (core.async)
```

### 5.2 Go Channel Patterns

```go
package main

import (
    "context"
    "fmt"
    "sync"
    "time"
)

// Pattern 1: Generator
func fibonacci(ctx context.Context) <-chan int {
    ch := make(chan int)
    go func() {
        defer close(ch)
        a, b := 0, 1
        for {
            select {
            case <-ctx.Done():
                return
            case ch <- a:
                a, b = b, a+b
            }
        }
    }()
    return ch
}

// Pattern 2: Fan-Out / Fan-In
func fanOut(input <-chan int, workers int) []<-chan int {
    channels := make([]<-chan int, workers)
    for i := 0; i < workers; i++ {
        channels[i] = process(input)
    }
    return channels
}

func fanIn(channels ...<-chan int) <-chan int {
    merged := make(chan int)
    var wg sync.WaitGroup

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

func process(input <-chan int) <-chan int {
    output := make(chan int)
    go func() {
        defer close(output)
        for v := range input {
            output <- v * 2 // Processing
        }
    }()
    return output
}

// Pattern 3: Pipeline
func source(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        defer close(out)
        for _, n := range nums {
            out <- n
        }
    }()
    return out
}

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
    // Pipeline: source -> square -> filter
    numbers := source(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    squared := square(numbers)
    even := filter(squared, func(n int) bool { return n%2 == 0 })

    for n := range even {
        fmt.Println(n) // 4, 16, 36, 64, 100
    }
}

// Pattern 4: Worker Pool
func workerPool(jobs <-chan int, results chan<- int, workerCount int) {
    var wg sync.WaitGroup

    for i := 0; i < workerCount; i++ {
        wg.Add(1)
        go func(workerID int) {
            defer wg.Done()
            for job := range jobs {
                result := processJob(job) // Actual processing
                results <- result
            }
        }(i)
    }

    go func() {
        wg.Wait()
        close(results)
    }()
}

func processJob(job int) int {
    time.Sleep(10 * time.Millisecond) // Simulate processing
    return job * 2
}

// Pattern 5: Multiplexing with Select
func multiplexer(ctx context.Context) {
    ticker := time.NewTicker(1 * time.Second)
    defer ticker.Stop()

    heartbeat := make(chan struct{})
    data := make(chan string)

    for {
        select {
        case <-ctx.Done():
            fmt.Println("Shutting down")
            return
        case <-ticker.C:
            fmt.Println("Tick")
        case <-heartbeat:
            fmt.Println("Heartbeat received")
        case msg := <-data:
            fmt.Println("Data:", msg)
        }
    }
}

// Pattern 6: Rate Limiter
func rateLimiter(requests <-chan string, ratePerSecond int) <-chan string {
    output := make(chan string)
    ticker := time.NewTicker(time.Second / time.Duration(ratePerSecond))

    go func() {
        defer close(output)
        defer ticker.Stop()
        for req := range requests {
            <-ticker.C // Rate limiting
            output <- req
        }
    }()

    return output
}
```

### 5.3 CSP vs Actor Model Comparison

```
                    CSP (Go)               Actor Model (Erlang)
Communication      Channels (anonymous)     Messages (addressed)
Process identity   Anonymous (connected     PID / name
                   via channels)
Blocking           Can block on send/recv   Non-blocking (mailbox)
Synchronization    Synchronous by default   Asynchronous by default
Distribution       Not supported by default Native support
Fault tolerance    Must be implemented      Supervisor trees
                   manually
Buffering          Buffered channels        Unbounded mailboxes
                   available

CSP strengths:
  -> Synchronous communication makes data flow explicit
  -> select for waiting on multiple channels
  -> Channel directionality (send-only/receive-only) expressed in the type system

Actor model strengths:
  -> Naturally extends to distributed environments
  -> Rich fault tolerance frameworks
  -> Per-actor GC and memory management
```

---

## 6. Other Concurrency Models

### 6.1 Software Transactional Memory (STM)

```
STM: memory operations similar to database transactions

  atomically $ do
    balance1 <- readTVar account1
    balance2 <- readTVar account2
    writeTVar account1 (balance1 - 100)
    writeTVar account2 (balance2 + 100)
  -- Automatically retries on conflict

Advantages:
  ✓ Optimistic concurrency control (no locks)
  ✓ Composable (transactions can be combined)
  ✓ No deadlocks

Disadvantages:
  ✗ Cannot be used with side-effecting operations
  ✗ Retry overhead
  ✗ Potential for livelock (constant conflicts)

Representative: Haskell (STM), Clojure (Ref/STM)
```

```haskell
-- Haskell STM: bank account transfer
import Control.Concurrent.STM

type Account = TVar Int

transfer :: Account -> Account -> Int -> STM ()
transfer from to amount = do
    fromBalance <- readTVar from
    toBalance <- readTVar to
    if fromBalance >= amount
        then do
            writeTVar from (fromBalance - amount)
            writeTVar to (toBalance + amount)
        else retry  -- Wait for retry if insufficient balance

main :: IO ()
main = do
    account1 <- newTVarIO 1000
    account2 <- newTVarIO 500

    -- Execute atomically (auto-retries on conflict)
    atomically $ transfer account1 account2 200

    balance1 <- readTVarIO account1
    balance2 <- readTVarIO account2
    putStrLn $ "Account 1: " ++ show balance1  -- 800
    putStrLn $ "Account 2: " ++ show balance2  -- 700
```

### 6.2 Structured Concurrency

```
Structured Concurrency:
  -> Provides scopes (boundaries) for concurrent tasks
  -> Child tasks must complete when the parent task ends
  -> Prevents resource leaks
  -> Adopted in Kotlin coroutines, Swift concurrency, Java 21

Unstructured concurrency:
  func parent() {
    spawn(child1)  // Fire and forget -> potential leak
    spawn(child2)  // Fire and forget
    return         // Does not wait for child task completion
  }

Structured concurrency:
  func parent() {
    taskGroup {
      spawn(child1)  // Spawned within a scope
      spawn(child2)
    }  // <- Waits for all child tasks to complete here
    // Execution does not proceed until child1 and child2 are done
  }
```

```swift
// Swift: Structured Concurrency
func fetchDashboard() async throws -> Dashboard {
    // TaskGroup: structured concurrent execution
    try await withThrowingTaskGroup(of: DashboardComponent.self) { group in
        group.addTask { try await fetchUser() }
        group.addTask { try await fetchOrders() }
        group.addTask { try await fetchNotifications() }

        var components: [DashboardComponent] = []
        for try await component in group {
            components.append(component)
        }
        // When exiting the group, all tasks have completed
        return Dashboard(components: components)
    }
}

// TaskGroup cancellation
func fetchWithCancellation() async throws -> Data {
    try await withThrowingTaskGroup(of: Data.self) { group in
        group.addTask {
            try await fetchFromServer1() // Slow
        }
        group.addTask {
            try await fetchFromServer2() // Fast
        }

        // Use the first completed result, cancel the rest
        guard let result = try await group.next() else {
            throw FetchError.noResult
        }
        group.cancelAll() // Cancel remaining tasks
        return result
    }
}
```

```kotlin
// Kotlin: Structured Concurrency with Coroutines
import kotlinx.coroutines.*

suspend fun fetchDashboard(): Dashboard = coroutineScope {
    // Waits for all tasks within coroutineScope to complete
    val userDeferred = async { fetchUser() }
    val ordersDeferred = async { fetchOrders() }
    val notifsDeferred = async { fetchNotifications() }

    Dashboard(
        user = userDeferred.await(),
        orders = ordersDeferred.await(),
        notifications = notifsDeferred.await()
    )
    // If any throws an exception, the others are automatically cancelled
}

// SupervisorScope: one child's failure does not affect other children
suspend fun resilientFetch(): Dashboard = supervisorScope {
    val user = async { fetchUser() }
    val orders = async {
        try { fetchOrders() } catch (e: Exception) { emptyList() }
    }
    val notifs = async {
        try { fetchNotifications() } catch (e: Exception) { emptyList() }
    }

    Dashboard(
        user = user.await(),
        orders = orders.await(),
        notifications = notifs.await()
    )
}
```

### 6.3 Data Parallel Model

```
Data Parallelism:
  -> Applies the same operation to multiple data elements simultaneously
  -> GPU computing, SIMD instructions, MapReduce

  CPU SIMD:
    Normal:   a[0]*b[0]  a[1]*b[1]  a[2]*b[2]  a[3]*b[3]  (4 multiplications)
    SIMD:    [a[0] a[1] a[2] a[3]] * [b[0] b[1] b[2] b[3]]  (4 multiplications in 1 instruction)

  GPU (CUDA):
    -> Thousands of cores execute the same kernel
    -> Optimal for matrix operations and machine learning

  MapReduce:
    Map:    [data1, data2, data3, ...] -> [result1, result2, result3, ...]
    Reduce: [result1, result2, result3, ...] -> finalResult
    -> Data processing in distributed environments (Hadoop, Spark)
```

```python
# Python: data parallelism examples

# 1. Data parallelism with multiprocessing.Pool
from multiprocessing import Pool

def square(x):
    return x ** 2

with Pool(4) as p:
    results = p.map(square, range(100))
    # 100 data elements processed in parallel across 4 processes

# 2. NumPy: vectorization (implicit data parallelism)
import numpy as np

a = np.array([1, 2, 3, 4, 5])
b = np.array([10, 20, 30, 40, 50])
c = a * b  # Element-wise multiplication (utilizes SIMD)
# [10, 40, 90, 160, 250]

# 3. concurrent.futures: high-level API
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor

# I/O concurrency: ThreadPoolExecutor
with ThreadPoolExecutor(max_workers=10) as executor:
    urls = ["https://api.example.com/1", "https://api.example.com/2"]
    futures = [executor.submit(fetch_url, url) for url in urls]
    results = [f.result() for f in futures]

# CPU parallelism: ProcessPoolExecutor
with ProcessPoolExecutor(max_workers=4) as executor:
    data_chunks = [data[i::4] for i in range(4)]
    futures = [executor.submit(process_chunk, chunk) for chunk in data_chunks]
    results = [f.result() for f in futures]
```

---

## 7. Comparison and Selection

### 7.1 Comprehensive Comparison Table

```
┌──────────────┬────────────┬────────────┬────────────┬────────────┐
│              │ Multi-     │ Event      │ Actor      │ CSP        │
│              │ threading  │ Loop       │ Model      │            │
├──────────────┼────────────┼────────────┼────────────┼────────────┤
│ CPU-intensive│ Excellent  │ Poor       │ Good       │ Excellent  │
├──────────────┼────────────┼────────────┼────────────┼────────────┤
│ I/O-intensive│ Good       │ Excellent  │ Excellent  │ Excellent  │
├──────────────┼────────────┼────────────┼────────────┼────────────┤
│ Concurrent   │ ~thousands │ ~100K      │ ~millions  │ ~millions  │
│ connections  │            │            │            │            │
├──────────────┼────────────┼────────────┼────────────┼────────────┤
│ Safety       │ Low (locks)│ Medium     │ High       │ High       │
├──────────────┼────────────┼────────────┼────────────┼────────────┤
│ Debugging    │ Difficult  │ Moderate   │ Difficult  │ Moderate   │
├──────────────┼────────────┼────────────┼────────────┼────────────┤
│ Memory       │ Low        │ High       │ High       │ High       │
│ efficiency   │            │            │            │            │
├──────────────┼────────────┼────────────┼────────────┼────────────┤
│ Distribution │ Manual     │ Manual     │ Native     │ Manual     │
│ support      │            │            │            │            │
├──────────────┼────────────┼────────────┼────────────┼────────────┤
│ Learning     │ Medium     │ Low        │ High       │ Medium     │
│ curve        │            │            │            │            │
└──────────────┴────────────┴────────────┴────────────┴────────────┘

Selection guidelines:
  Web APIs (I/O-intensive) -> Event loop or CSP
  Real-time communication -> Actor model
  Image/video processing -> Multithreading
  Microservices -> Actor model or CSP
  Distributed systems -> Actor model
  High-performance servers -> CSP (Go)
  Frontend -> Event loop (JS)
```

### 7.2 Recommended Models by Use Case

```typescript
// Use case 1: REST API server
// -> Event loop (Node.js) or CSP (Go)

// Node.js: high productivity, NPM ecosystem
import express from 'express';
const app = express();

app.get('/api/users/:id', async (req, res) => {
  const user = await db.getUser(req.params.id);
  res.json(user);
});

// Go: high performance, static typing
// func handleUser(w http.ResponseWriter, r *http.Request) {
//     user, err := db.GetUser(r.PathValue("id"))
//     json.NewEncoder(w).Encode(user)
// }
```

```elixir
# Use case 2: Real-time chat
# -> Actor model (Elixir/Phoenix)

# Each chat room is an actor (process)
defmodule ChatRoom do
  use GenServer

  def start_link(room_id) do
    GenServer.start_link(__MODULE__, room_id, name: via(room_id))
  end

  def join(room_id, user_id) do
    GenServer.call(via(room_id), {:join, user_id})
  end

  def send_message(room_id, user_id, message) do
    GenServer.cast(via(room_id), {:message, user_id, message})
  end

  # State: member list
  def init(room_id) do
    {:ok, %{room_id: room_id, members: MapSet.new()}}
  end

  def handle_call({:join, user_id}, _from, state) do
    new_state = %{state | members: MapSet.put(state.members, user_id)}
    {:reply, :ok, new_state}
  end

  def handle_cast({:message, user_id, message}, state) do
    # Broadcast to all members
    Enum.each(state.members, fn member ->
      send_to_user(member, %{from: user_id, text: message})
    end)
    {:noreply, state}
  end

  defp via(room_id), do: {:via, Registry, {ChatRegistry, room_id}}
end
```

```go
// Use case 3: Data pipeline
// -> CSP (Go)

package main

import (
    "encoding/json"
    "fmt"
    "sync"
)

// ETL pipeline: Extract -> Transform -> Load
type Record struct {
    ID   int
    Data string
}

func extract(source string) <-chan Record {
    out := make(chan Record, 100) // Buffered channel
    go func() {
        defer close(out)
        // Read from data source
        for i := 0; i < 1000; i++ {
            out <- Record{ID: i, Data: fmt.Sprintf("raw-%d", i)}
        }
    }()
    return out
}

func transform(in <-chan Record, workers int) <-chan Record {
    out := make(chan Record, 100)
    var wg sync.WaitGroup

    for i := 0; i < workers; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for record := range in {
                // Transform data
                record.Data = fmt.Sprintf("transformed-%s", record.Data)
                out <- record
            }
        }()
    }

    go func() {
        wg.Wait()
        close(out)
    }()
    return out
}

func load(in <-chan Record) {
    for record := range in {
        // Write to database
        data, _ := json.Marshal(record)
        fmt.Println(string(data))
    }
}

func main() {
    // Build the pipeline
    records := extract("data-source")
    transformed := transform(records, 4) // 4 workers for concurrent transformation
    load(transformed)
}
```

### 7.3 Practical Selection Flowchart

```
Evaluate requirements:

1. What is the dominant workload?
   ├── I/O-intensive (APIs, databases, files)
   │   ├── Concurrent connections < 1,000 -> Anything works
   │   ├── Concurrent connections 1,000-10,000
   │   │   ├── Team experience: JS -> Node.js (event loop)
   │   │   ├── Team experience: Python -> asyncio
   │   │   └── Performance priority -> Go (CSP)
   │   └── Concurrent connections > 10,000
   │       ├── Go (CSP)
   │       └── Erlang/Elixir (actor model)
   │
   └── CPU-intensive (computation, image processing, ML)
       ├── Simple parallelism -> Multithreading (Rust, C++, Java)
       ├── Data parallelism -> GPU / SIMD
       └── Pipeline -> Go (CSP) or threads + queues

2. Is distribution required?
   ├── Yes -> Actor model (Erlang/Elixir, Akka)
   └── No -> Other models are sufficient

3. Is fault tolerance critical?
   ├── Yes -> Actor model (supervisor trees)
   └── No -> Other models are sufficient

4. Real-time requirements?
   ├── WebSocket / SSE -> Event loop or actor model
   └── REST API -> Event loop or CSP
```

---

## 8. Hybrid Approaches

### 8.1 Node.js: Event Loop + Worker Threads

```typescript
// Node.js: event loop for I/O, Worker Threads for CPU
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { cpus } from 'os';

// Main thread: request handling (I/O)
if (isMainThread) {
  const numCPUs = cpus().length;
  const workerPool: Worker[] = [];
  const taskQueue: { data: any; resolve: Function; reject: Function }[] = [];

  // Initialize worker pool
  for (let i = 0; i < numCPUs; i++) {
    const worker = new Worker(__filename);
    worker.on('message', (result) => {
      // Process the next task
      const nextTask = taskQueue.shift();
      if (nextTask) {
        worker.postMessage(nextTask.data);
      }
    });
    workerPool.push(worker);
  }

  // Offload CPU-intensive tasks to workers
  function offloadToWorker(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const freeWorker = workerPool.find(w => !w.isBusy);
      if (freeWorker) {
        freeWorker.postMessage(data);
      } else {
        taskQueue.push({ data, resolve, reject });
      }
    });
  }

  // Express server
  import express from 'express';
  const app = express();

  app.post('/api/process-image', async (req, res) => {
    // I/O: receive request (event loop)
    const image = await receiveUpload(req);

    // CPU: image processing (worker thread)
    const processed = await offloadToWorker({ type: 'resize', image });

    // I/O: upload to S3 (event loop)
    const url = await uploadToS3(processed);

    res.json({ url });
  });
}

// Worker thread: CPU-intensive processing
if (!isMainThread) {
  parentPort?.on('message', (data) => {
    const result = heavyComputation(data);
    parentPort?.postMessage(result);
  });
}
```

### 8.2 Python: asyncio + multiprocessing

```python
import asyncio
from concurrent.futures import ProcessPoolExecutor
from functools import partial

# CPU-intensive processing
def cpu_bound_task(data: bytes) -> bytes:
    """CPU-intensive tasks like image processing (executed in separate process)"""
    import hashlib
    result = hashlib.pbkdf2_hmac('sha256', data, b'salt', 100000)
    return result

# I/O-intensive processing
async def io_bound_task(url: str) -> dict:
    """I/O-intensive tasks like API calls (executed with asyncio)"""
    import aiohttp
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as resp:
            return await resp.json()

# Hybrid: asyncio + ProcessPoolExecutor
async def hybrid_handler(request_data: dict) -> dict:
    loop = asyncio.get_event_loop()

    # I/O: fetch external data asynchronously
    external_data = await io_bound_task("https://api.example.com/data")

    # CPU: heavy computation in a separate process
    with ProcessPoolExecutor(max_workers=4) as pool:
        computed = await loop.run_in_executor(
            pool,
            cpu_bound_task,
            external_data["payload"].encode()
        )

    # I/O: save results
    await save_result(computed)

    return {"status": "ok", "hash": computed.hex()}
```

---


## FAQ

### Q1: What is the most important point when studying this topic?

Gaining practical experience is most important. Understanding deepens not through theory alone but by actually writing code and observing how it behaves.

### Q2: What are common mistakes beginners make?

Skipping the fundamentals and jumping to advanced topics. We recommend building a solid understanding of the basic concepts explained in this guide before moving to the next step.

### Q3: How is this used in practice?

Knowledge of this topic is frequently applied in everyday development work. It becomes especially important during code reviews and architecture design.

---

## Summary

| Model | Core Concept | Representative Languages | Use Cases |
|-------|-------------|-------------------------|-----------|
| Multithreading | Shared memory + locks | Java, C++, Rust | CPU-intensive, legacy systems |
| Event loop | Single thread + async I/O | JS, Python | Web APIs, frontend |
| Actor model | Message passing | Erlang, Elixir | Distributed, real-time, high fault tolerance |
| CSP | Lightweight threads + channels | Go | High-performance servers |
| STM | Transactional memory | Haskell, Clojure | Complex shared state management |
| Structured concurrency | Scoped concurrency | Kotlin, Swift, Java 21 | Modern applications |

### Principles for Selection

```
1. Prioritize simplicity
   -> Do not choose an overly complex model
   -> If an event loop is sufficient, multithreading is unnecessary

2. Match the team's skill set
   -> Productivity is higher with familiar languages and models
   -> Allocate sufficient learning time when introducing a new model

3. Match the bottleneck
   -> I/O-intensive -> Event loop / CSP
   -> CPU-intensive -> Multithreading / data parallelism
   -> Mixed -> Hybrid approach

4. Consider scalability requirements
   -> Vertical scaling -> Multithreading
   -> Horizontal scaling -> Actor model / CSP
```

---

## Recommended Next Guides

---

## References
1. Hoare, C.A.R. "Communicating Sequential Processes." 1978.
2. Hewitt, C. "A Universal Modular Actor Formalism." 1973.
3. Pike, R. "Concurrency Is Not Parallelism." Waza Conference, 2012.
4. Armstrong, J. "Programming Erlang: Software for a Concurrent World." Pragmatic Bookshelf, 2013.
5. Goetz, B. "Java Concurrency in Practice." Addison-Wesley, 2006.
6. Klabnik, S. & Nichols, C. "The Rust Programming Language." No Starch Press, 2019.
7. Donovan, A. & Kernighan, B. "The Go Programming Language." Addison-Wesley, 2015.
8. Elizarov, R. "Structured Concurrency." Kotlin Blog, 2018.
9. Apple Developer Documentation. "Swift Concurrency."
10. Peierls, T. "STM in Haskell." Journal of Functional Programming, 2005.



===== SOURCE: 02-programming/async-and-error-handling/docs/01-async-patterns/00-callbacks.md =====

# Callbacks

> Callbacks are the most primitive pattern for asynchronous processing. Understand Node.js error-first callbacks, the callback hell problem, and the evolution toward Promises.

## What You Will Learn in This Chapter

- [ ] Understand how callbacks work and how to use them
- [ ] Identify the problems and causes of callback hell
- [ ] Learn the meaning of the error-first pattern
- [ ] Compare callback implementations across different languages
- [ ] Master the migration pattern from callbacks to Promises


## Prerequisites

Before reading this guide, having the following knowledge will deepen your understanding:

- Basic programming knowledge
- Understanding of related fundamental concepts

---

## 1. Callback Basics

### 1.1 What Is a Callback?

```
Callback = A function passed with the message "call me when processing is complete"

  Synchronous:
    const result = readFile("data.txt");
    console.log(result);

  Asynchronous (callback):
    readFile("data.txt", (error, result) => {
      console.log(result);
    });
    // readFile returns immediately. The result arrives later via the callback

Types of callbacks:
  1. Synchronous callbacks: map, filter, sort, etc. (executed immediately)
  2. Asynchronous callbacks: Called after I/O completion (setTimeout, fs.readFile, etc.)
```

### 1.2 Synchronous Callbacks vs Asynchronous Callbacks

```javascript
// === Synchronous Callbacks ===
// Passed as function arguments and executed immediately on the spot

// Array.map: Apply a callback to each element
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);  // [2, 4, 6, 8, 10]

// Array.filter: Keep only elements for which the callback returns true
const evens = numbers.filter((n) => n % 2 === 0);  // [2, 4]

// Array.reduce: Calculate an accumulated value
const sum = numbers.reduce((acc, n) => acc + n, 0);  // 15

// Array.sort: Inject comparison logic via a callback
const users = [
  { name: "Tanaka", age: 30 },
  { name: "Yamada", age: 25 },
  { name: "Suzuki", age: 35 },
];
users.sort((a, b) => a.age - b.age);
// [{ name: "Yamada", age: 25 }, { name: "Tanaka", age: 30 }, { name: "Suzuki", age: 35 }]

// Array.forEach: Execute side effects for each element
numbers.forEach((n) => {
  console.log(n);
});

// Array.find: Return the first element matching the condition
const firstEven = numbers.find((n) => n % 2 === 0);  // 2

// All of these are "synchronous callbacks"
// -> All processing is complete by the time the function returns
```

```javascript
// === Asynchronous Callbacks ===
// Passed to a function and executed after I/O completion or after a set time

const fs = require('fs');

// Node.js file reading
console.log('1. Starting read');

fs.readFile('/path/to/file', 'utf8', (err, data) => {
  // This function is called "later" (when file reading is complete)
  console.log('3. File read complete:', data);
});

console.log('2. After issuing read command (not yet complete)');

// Output order:
// 1. Starting read
// 2. After issuing read command (not yet complete)
// 3. File read complete: (file contents)
```

### 1.3 Callbacks as Event Listeners

```javascript
// Browser: Event listeners
document.getElementById('btn').addEventListener('click', (event) => {
  console.log('Clicked!', event.target);
});

// Registering multiple events
const button = document.getElementById('submit');

button.addEventListener('click', handleClick);
button.addEventListener('mouseenter', handleHover);
button.addEventListener('mouseleave', handleLeave);

function handleClick(event) {
  event.preventDefault();
  console.log('Button clicked');
}

function handleHover(event) {
  event.target.style.backgroundColor = '#f0f0f0';
}

function handleLeave(event) {
  event.target.style.backgroundColor = '';
}

// Removing an event listener
button.removeEventListener('click', handleClick);
```

### 1.4 Timer Callbacks

```javascript
// setTimeout: Execute once after a specified time
setTimeout(() => {
  console.log('Executed after 3 seconds');
}, 3000);

// setInterval: Execute repeatedly at a specified interval
const intervalId = setInterval(() => {
  console.log('Executed every 1 second');
}, 1000);

// Stop
setTimeout(() => {
  clearInterval(intervalId);
  console.log('Timer stopped');
}, 5000);

// requestAnimationFrame: Execute on each paint frame (browser)
function animate(timestamp) {
  // Animation processing
  updatePosition(timestamp);
  render();

  // Request the next frame
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
```

---

## 2. Node.js Error-First Callbacks

### 2.1 Basic Pattern

```
Node.js convention (error-first callback):
  callback(error, result)

  -> 1st argument: error (null on success)
  -> 2nd argument: result (undefined on error)

  Advantages:
  - Uniform error checking
  - Hard to ignore errors (habit of checking the 1st argument)

  Problems:
  - Requires if (err) check every time
  - No type safety (any)
  - Nesting tends to get deep
```

```javascript
const fs = require('fs');

// Basic error-first callback
fs.readFile('/path/to/file', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err.message);
    return;
  }
  console.log('Data:', data);
});

// Writing
fs.writeFile('/path/to/output', 'Hello, World!', 'utf8', (err) => {
  if (err) {
    console.error('Write failed:', err.message);
    return;
  }
  console.log('File written successfully');
});

// Reading a directory
fs.readdir('/path/to/dir', (err, files) => {
  if (err) {
    console.error('Failed to read directory:', err.message);
    return;
  }
  console.log('Files:', files);
});
```

### 2.2 Implementing the Error-First Pattern

```javascript
// Custom error-first function
function readJsonFile(path, callback) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    try {
      const parsed = JSON.parse(data);
      callback(null, parsed);
    } catch (parseError) {
      callback(parseError, null);
    }
  });
}

// Usage
readJsonFile('config.json', (err, config) => {
  if (err) {
    console.error('Failed to read config:', err.message);
    return;
  }
  console.log('Config loaded:', config);
});
```

```javascript
// Asynchronous database operations (callback style)
function getUser(userId, callback) {
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, rows) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (rows.length === 0) {
      callback(new Error(`User ${userId} not found`), null);
      return;
    }
    callback(null, rows[0]);
  });
}

function getUserOrders(userId, callback) {
  db.query('SELECT * FROM orders WHERE user_id = ?', [userId], (err, rows) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, rows);
  });
}

// HTTP request (callback style)
const http = require('http');

function fetchJSON(url, callback) {
  http.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('error', (err) => {
      callback(err, null);
    });

    res.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        callback(null, parsed);
      } catch (parseErr) {
        callback(parseErr, null);
      }
    });
  }).on('error', (err) => {
    callback(err, null);
  });
}

// Usage
fetchJSON('http://api.example.com/users/1', (err, user) => {
  if (err) {
    console.error('Failed to fetch user:', err.message);
    return;
  }
  console.log('User:', user);
});
```

### 2.3 Callback Design Patterns

```javascript
// Pattern 1: Configuration object and callback
function connectToDatabase(options, callback) {
  const { host, port, database, user, password } = options;

  const connection = new DatabaseConnection({
    host, port, database, user, password
  });

  connection.connect((err) => {
    if (err) {
      callback(err, null);
      return;
    }

    // Connection successful: Check migrations
    connection.checkMigrations((err, needsMigration) => {
      if (err) {
        connection.close();
        callback(err, null);
        return;
      }

      if (needsMigration) {
        connection.runMigrations((err) => {
          if (err) {
            connection.close();
            callback(err, null);
            return;
          }
          callback(null, connection);
        });
      } else {
        callback(null, connection);
      }
    });
  });
}

// Pattern 2: EventEmitter style
const EventEmitter = require('events');

class FileProcessor extends EventEmitter {
  process(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        this.emit('error', err);
        return;
      }

      this.emit('data', data);

      const lines = data.split('\n');
      this.emit('line-count', lines.length);

      for (const line of lines) {
        this.emit('line', line);
      }

      this.emit('complete', { totalLines: lines.length });
    });
  }
}

// Usage
const processor = new FileProcessor();

processor.on('data', (data) => {
  console.log(`Loaded ${data.length} bytes`);
});

processor.on('line', (line) => {
  // Process each line
});

processor.on('complete', ({ totalLines }) => {
  console.log(`Processed ${totalLines} lines`);
});

processor.on('error', (err) => {
  console.error('Error:', err.message);
});

processor.process('large-file.txt');
```

---

## 3. Callback Hell

### 3.1 The Core Problem

```javascript
// Bad: Callback hell: Nesting gets deep and readability collapses
getUser(userId, (err, user) => {
  if (err) { handleError(err); return; }
  getOrders(user.id, (err, orders) => {
    if (err) { handleError(err); return; }
    getOrderDetails(orders[0].id, (err, details) => {
      if (err) { handleError(err); return; }
      getShippingInfo(details.shippingId, (err, shipping) => {
        if (err) { handleError(err); return; }
        getTrackingInfo(shipping.trackingId, (err, tracking) => {
          if (err) { handleError(err); return; }
          // 5 levels of nesting at this point
          console.log(tracking);
        });
      });
    });
  });
});

// Problems:
// 1. "Pyramid-shaped" code expanding horizontally
// 2. Duplicated error handling
// 3. Difficult variable scope management
// 4. Hard to follow the flow of execution
// 5. Difficult to write tests
// 6. Complex control flow implementation (conditionals, loops)
```

### 3.2 Typical Callback Hell Encountered in Practice

```javascript
// E-commerce order processing (callback hell version)
function processOrder(userId, cartId, paymentInfo, callback) {
  // 1. User authentication
  authenticateUser(userId, (err, user) => {
    if (err) { callback(err); return; }

    // 2. Get cart
    getCart(cartId, (err, cart) => {
      if (err) { callback(err); return; }

      // 3. Check inventory
      checkInventory(cart.items, (err, availability) => {
        if (err) { callback(err); return; }

        if (!availability.allAvailable) {
          callback(new Error('Some items are out of stock'));
          return;
        }

        // 4. Calculate total
        calculateTotal(cart, user, (err, total) => {
          if (err) { callback(err); return; }

          // 5. Process payment
          processPayment(paymentInfo, total, (err, paymentResult) => {
            if (err) {
              // Rollback inventory on payment failure
              releaseInventory(cart.items, (rollbackErr) => {
                if (rollbackErr) {
                  console.error('Rollback failed:', rollbackErr);
                }
                callback(err);
              });
              return;
            }

            // 6. Create order
            createOrder(user, cart, paymentResult, (err, order) => {
              if (err) {
                // Refund payment on order creation failure
                refundPayment(paymentResult.id, (refundErr) => {
                  if (refundErr) {
                    console.error('Refund failed:', refundErr);
                  }
                  callback(err);
                });
                return;
              }

              // 7. Send notification
              sendOrderConfirmation(user.email, order, (err) => {
                if (err) {
                  console.error('Email failed:', err);
                  // Ignore email failure and treat as success
                }
                callback(null, order);
              });
            });
          });
        });
      });
    });
  });
}
```

### 3.3 Improvement Technique 1: Separate with Named Functions

```javascript
// Somewhat improved: Separate with named functions
function handleTracking(err, tracking) {
  if (err) { handleError(err); return; }
  console.log(tracking);
}

function handleShipping(err, shipping) {
  if (err) { handleError(err); return; }
  getTrackingInfo(shipping.trackingId, handleTracking);
}

function handleDetails(err, details) {
  if (err) { handleError(err); return; }
  getShippingInfo(details.shippingId, handleShipping);
}

function handleOrders(err, orders) {
  if (err) { handleError(err); return; }
  getOrderDetails(orders[0].id, handleDetails);
}

function handleUser(err, user) {
  if (err) { handleError(err); return; }
  getOrders(user.id, handleOrders);
}

// Entry point
getUser(userId, handleUser);

// Improvement: Shallow nesting
// Remaining problem: Functions are defined in reverse order, making the flow hard to follow
```

### 3.4 Improvement Technique 2: async Library

```javascript
// Flow control using the async.js library
const async = require('async');

// async.waterfall: Serial execution (passing previous result to next)
async.waterfall([
  // Step 1: Get user
  (cb) => getUser(userId, cb),

  // Step 2: Get orders (user is the result from the previous step)
  (user, cb) => getOrders(user.id, (err, orders) => {
    cb(err, user, orders);
  }),

  // Step 3: Get order details
  (user, orders, cb) => getOrderDetails(orders[0].id, (err, details) => {
    cb(err, user, orders, details);
  }),

  // Step 4: Get shipping info
  (user, orders, details, cb) => {
    getShippingInfo(details.shippingId, cb);
  },
], (err, shippingInfo) => {
  if (err) {
    handleError(err);
    return;
  }
  console.log('Shipping:', shippingInfo);
});

// async.parallel: Parallel execution
async.parallel({
  users: (cb) => fetchUsers(cb),
  orders: (cb) => fetchOrders(cb),
  products: (cb) => fetchProducts(cb),
}, (err, results) => {
  if (err) {
    handleError(err);
    return;
  }
  console.log(results.users, results.orders, results.products);
});

// async.series: Serial execution (results kept separate)
async.series([
  (cb) => createBackup(cb),
  (cb) => runMigrations(cb),
  (cb) => verifyData(cb),
], (err, results) => {
  if (err) {
    console.error('Pipeline failed:', err);
    return;
  }
  console.log('All steps completed');
});

// async.eachLimit: Iteration with concurrency limit
const urls = ['url1', 'url2', 'url3', /* ... */];

async.eachLimit(urls, 5, (url, cb) => {
  fetchAndProcess(url, cb);
}, (err) => {
  if (err) {
    console.error('Processing failed:', err);
    return;
  }
  console.log('All URLs processed');
});
```

### 3.5 Improvement Technique 3: Control Flow Abstraction

```javascript
// Custom flow control function
function waterfall(tasks, finalCallback) {
  let index = 0;

  function next(err, ...args) {
    if (err) {
      finalCallback(err);
      return;
    }

    if (index >= tasks.length) {
      finalCallback(null, ...args);
      return;
    }

    const task = tasks[index++];
    try {
      task(...args, next);
    } catch (e) {
      finalCallback(e);
    }
  }

  next(null);
}

// Usage
waterfall([
  (cb) => getUser(userId, cb),
  (user, cb) => getOrders(user.id, cb),
  (orders, cb) => getOrderDetails(orders[0].id, cb),
], (err, details) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Details:', details);
});

// Parallel execution function
function parallel(tasks, finalCallback) {
  const results = {};
  let completed = 0;
  let hasError = false;
  const keys = Object.keys(tasks);

  keys.forEach((key) => {
    taskskey => {
      if (hasError) return;

      if (err) {
        hasError = true;
        finalCallback(err);
        return;
      }

      results[key] = result;
      completed++;

      if (completed === keys.length) {
        finalCallback(null, results);
      }
    });
  });
}
```

---

## 4. Callback Patterns Across Languages

### 4.1 Python Callbacks

```python
import threading
import time
from typing import Callable, Optional, Any

# Callback patterns in Python

# Basic callback
def fetch_data(url: str, on_success: Callable, on_error: Callable) -> None:
    """Fetch data asynchronously (thread-based)"""
    def worker():
        try:
            import urllib.request
            response = urllib.request.urlopen(url)
            data = response.read().decode('utf-8')
            on_success(data)
        except Exception as e:
            on_error(e)

    thread = threading.Thread(target=worker)
    thread.start()

# Usage
def handle_success(data):
    print(f"Received: {data[:100]}...")

def handle_error(error):
    print(f"Error: {error}")

fetch_data("https://api.example.com/data", handle_success, handle_error)

# Decorators as callbacks
def retry(max_retries: int = 3, delay: float = 1.0):
    """Retry decorator"""
    def decorator(func):
        def wrapper(*args, **kwargs):
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_retries - 1:
                        raise
                    print(f"Attempt {attempt + 1} failed: {e}")
                    time.sleep(delay * (2 ** attempt))
        return wrapper
    return decorator

@retry(max_retries=3, delay=0.5)
def unreliable_api_call():
    """Unreliable API call"""
    import random
    if random.random() < 0.5:
        raise ConnectionError("Connection failed")
    return {"status": "ok"}

# Context manager + callback
class TimedOperation:
    """Measure operation time and report via callback"""
    def __init__(self, name: str, on_complete: Callable[[str, float], None]):
        self.name = name
        self.on_complete = on_complete
        self.start_time = None

    def __enter__(self):
        self.start_time = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        elapsed = time.time() - self.start_time
        self.on_complete(self.name, elapsed)
        return False

# Usage
def log_timing(name: str, elapsed: float):
    print(f"[TIMING] {name}: {elapsed:.3f}s")

with TimedOperation("data_processing", log_timing):
    time.sleep(0.5)  # Some processing
# Output: [TIMING] data_processing: 0.501s
```

### 4.2 Rust Callbacks

```rust
use std::thread;
use std::sync::mpsc;

// Rust: Using closures as callbacks
// Subject to ownership and lifetime constraints

// Basic callback
fn process_async<F>(data: Vec<i32>, callback: F)
where
    F: FnOnce(Vec<i32>) + Send + 'static,
{
    thread::spawn(move || {
        let result: Vec<i32> = data.iter().map(|x| x * 2).collect();
        callback(result);
    });
}

// Usage
fn main() {
    process_async(vec![1, 2, 3, 4, 5], |result| {
        println!("Result: {:?}", result);
    });

    thread::sleep(std::time::Duration::from_secs(1));
}

// Error handling with Result type
fn fetch_data<F>(url: &str, callback: F)
where
    F: FnOnce(Result<String, Box<dyn std::error::Error>>) + Send + 'static,
{
    let url = url.to_string();
    thread::spawn(move || {
        let result = reqwest::blocking::get(&url)
            .and_then(|resp| resp.text());
        match result {
            Ok(body) => callback(Ok(body)),
            Err(e) => callback(Err(Box::new(e))),
        }
    });
}

// Callbacks using trait objects
trait EventHandler: Send {
    fn on_data(&self, data: &[u8]);
    fn on_error(&self, error: &str);
    fn on_complete(&self);
}

struct DataProcessor {
    handler: Box<dyn EventHandler>,
}

impl DataProcessor {
    fn new(handler: Box<dyn EventHandler>) -> Self {
        DataProcessor { handler }
    }

    fn process(&self, data: &[u8]) {
        if data.is_empty() {
            self.handler.on_error("Empty data");
            return;
        }
        self.handler.on_data(data);
        self.handler.on_complete();
    }
}
```

### 4.3 Go Callbacks

```go
package main

import (
    "fmt"
    "io/ioutil"
    "net/http"
    "time"
)

// Go: Using functions as first-class citizens
// However, goroutine + channel is more idiomatic in Go

// Callback type definitions
type ResultCallback func(data []byte, err error)
type ProgressCallback func(current, total int)

// HTTP request with callback
func fetchWithCallback(url string, callback ResultCallback) {
    go func() {
        resp, err := http.Get(url)
        if err != nil {
            callback(nil, err)
            return
        }
        defer resp.Body.Close()

        body, err := ioutil.ReadAll(resp.Body)
        if err != nil {
            callback(nil, err)
            return
        }
        callback(body, nil)
    }()
}

// Download with progress
func downloadWithProgress(url string, progress ProgressCallback, done ResultCallback) {
    go func() {
        resp, err := http.Get(url)
        if err != nil {
            done(nil, err)
            return
        }
        defer resp.Body.Close()

        contentLength := int(resp.ContentLength)
        data := make([]byte, 0, contentLength)
        buf := make([]byte, 4096)
        received := 0

        for {
            n, err := resp.Body.Read(buf)
            if n > 0 {
                data = append(data, buf[:n]...)
                received += n
                progress(received, contentLength)
            }
            if err != nil {
                break
            }
        }

        done(data, nil)
    }()
}

func main() {
    // Usage example
    fetchWithCallback("https://api.example.com/data", func(data []byte, err error) {
        if err != nil {
            fmt.Println("Error:", err)
            return
        }
        fmt.Println("Received:", len(data), "bytes")
    })

    // Go idiom: channels are preferred
    ch := make(chan []byte, 1)
    errCh := make(chan error, 1)

    go func() {
        resp, err := http.Get("https://api.example.com/data")
        if err != nil {
            errCh <- err
            return
        }
        defer resp.Body.Close()
        body, _ := ioutil.ReadAll(resp.Body)
        ch <- body
    }()

    select {
    case data := <-ch:
        fmt.Println("Received:", len(data), "bytes")
    case err := <-errCh:
        fmt.Println("Error:", err)
    case <-time.After(5 * time.Second):
        fmt.Println("Timeout")
    }
}
```

### 4.4 C# Callbacks

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

// C#: Callbacks via delegates and events

// Delegate definitions
public delegate void DataCallback(string data);
public delegate void ErrorCallback(Exception error);

public class AsyncFetcher
{
    // Event-based callbacks
    public event EventHandler<DataEventArgs> DataReceived;
    public event EventHandler<ErrorEventArgs> ErrorOccurred;
    public event EventHandler Completed;

    // Method accepting callbacks
    public void FetchData(string url, Action<string> onSuccess, Action<Exception> onError)
    {
        Task.Run(async () =>
        {
            try
            {
                using var client = new HttpClient();
                var data = await client.GetStringAsync(url);
                onSuccess(data);
            }
            catch (Exception ex)
            {
                onError(ex);
            }
        });
    }

    // Method that fires events
    public async void FetchDataEvent(string url)
    {
        try
        {
            using var client = new HttpClient();
            var data = await client.GetStringAsync(url);
            DataReceived?.Invoke(this, new DataEventArgs(data));
            Completed?.Invoke(this, EventArgs.Empty);
        }
        catch (Exception ex)
        {
            ErrorOccurred?.Invoke(this, new ErrorEventArgs(ex));
        }
    }
}

// Usage
var fetcher = new AsyncFetcher();

// Callback with lambda expressions
fetcher.FetchData(
    "https://api.example.com/data",
    data => Console.WriteLine($"Success: {data.Length} chars"),
    error => Console.WriteLine($"Error: {error.Message}")
);

// Callback with events
fetcher.DataReceived += (sender, args) =>
{
    Console.WriteLine($"Data received: {args.Data.Length} chars");
};
fetcher.ErrorOccurred += (sender, args) =>
{
    Console.WriteLine($"Error: {args.Error.Message}");
};
fetcher.FetchDataEvent("https://api.example.com/data");
```

---

## 5. Callbacks as Higher-Order Functions

### 5.1 Function Composition and Callbacks

```javascript
// Callbacks are a type of "higher-order function"
// Passing "what to do" as an argument

// Strategy pattern: Injecting algorithms via callbacks
function sortUsers(users, comparator) {
  return [...users].sort(comparator);
}

const users = [
  { name: "Tanaka", age: 30, score: 85 },
  { name: "Yamada", age: 25, score: 92 },
  { name: "Suzuki", age: 35, score: 78 },
];

// Sort by age
const byAge = sortUsers(users, (a, b) => a.age - b.age);

// Sort by score (descending)
const byScore = sortUsers(users, (a, b) => b.score - a.score);

// Sort by name
const byName = sortUsers(users, (a, b) => a.name.localeCompare(b.name, 'ja'));
```

```typescript
// Middleware pattern (Express style)
type Middleware = (req: Request, res: Response, next: () => void) => void;

class Router {
  private middlewares: Middleware[] = [];

  use(middleware: Middleware): void {
    this.middlewares.push(middleware);
  }

  handle(req: Request, res: Response): void {
    let index = 0;

    const next = () => {
      if (index < this.middlewares.length) {
        const middleware = this.middlewares[index++];
        middleware(req, res, next);
      }
    };

    next();
  }
}

// Usage
const router = new Router();

// Logging middleware
router.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Authentication middleware
router.use((req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send('Unauthorized');
    return;
  }
  next();
});

// Handler
router.use((req, res, next) => {
  res.json({ message: 'Hello, World!' });
});
```

### 5.2 Currying Callbacks

```typescript
// Curried callbacks
function createLogger(prefix: string) {
  return function(message: string) {
    console.log(`[${prefix}] ${new Date().toISOString()} ${message}`);
  };
}

const infoLog = createLogger('INFO');
const errorLog = createLogger('ERROR');
const debugLog = createLogger('DEBUG');

infoLog('Server started');    // [INFO] 2024-01-01T00:00:00.000Z Server started
errorLog('Connection lost');  // [ERROR] 2024-01-01T00:00:00.000Z Connection lost

// Callback factory
function createRetryCallback<T>(
  fn: (callback: (err: Error | null, result?: T) => void) => void,
  maxRetries: number,
  delay: number,
): Promise<T> {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    function attempt() {
      fn((err, result) => {
        if (!err) {
          resolve(result!);
          return;
        }

        attempts++;
        if (attempts >= maxRetries) {
          reject(err);
          return;
        }

        setTimeout(attempt, delay * Math.pow(2, attempts));
      });
    }

    attempt();
  });
}

// Usage
const result = await createRetryCallback(
  (cb) => fetchData('https://api.example.com/data', cb),
  3,
  1000,
);
```

---

## 6. Callback Pitfalls

### 6.1 The Zalgo Problem (Mixing Sync and Async)

```javascript
// Bad: Zalgo: Synchronous or asynchronous behavior depends on conditions
function getData(cache, key, callback) {
  if (cache[key]) {
    // Warning: Calling callback synchronously
    callback(null, cache[key]);
  } else {
    // Calling callback asynchronously
    db.query(key, (err, data) => {
      if (!err) cache[key] = data;
      callback(err, data);
    });
  }
}

// Problem: Execution order of calling code becomes unpredictable
let result;
getData(cache, 'key', (err, data) => {
  result = data;
});
// Whether result is set depends on the cache state
// -> Very bug-prone

// Good: Always make it asynchronous
function getDataFixed(cache, key, callback) {
  if (cache[key]) {
    // Make it asynchronous with process.nextTick
    process.nextTick(() => callback(null, cache[key]));
  } else {
    db.query(key, (err, data) => {
      if (!err) cache[key] = data;
      callback(err, data);
    });
  }
}

// Better: queueMicrotask (works in both browser and Node.js)
function getDataBetter(cache, key, callback) {
  if (cache[key]) {
    queueMicrotask(() => callback(null, cache[key]));
  } else {
    db.query(key, (err, data) => {
      if (!err) cache[key] = data;
      callback(err, data);
    });
  }
}
```

### 6.2 Double Callback Invocation

```javascript
// Bad: Callback may be called twice
function processFile(path, callback) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      callback(err);
      // Warning: Missing return!
    }
    // This executes even on error
    const processed = transform(data); // data is undefined -> error
    callback(null, processed);
  });
}

// Good: Early return
function processFileFixed(path, callback) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      callback(err);
      return; // <- Important
    }
    try {
      const processed = transform(data);
      callback(null, processed);
    } catch (transformErr) {
      callback(transformErr);
    }
  });
}

// Better: once wrapper
function once(fn) {
  let called = false;
  return function(...args) {
    if (called) {
      console.warn('Callback called more than once');
      return;
    }
    called = true;
    fn(...args);
  };
}

function processFileSafe(path, callback) {
  const safeCallback = once(callback);

  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      safeCallback(err);
      return;
    }
    try {
      const processed = transform(data);
      safeCallback(null, processed);
    } catch (transformErr) {
      safeCallback(transformErr);
    }
  });
}
```

### 6.3 Swallowed Errors

```javascript
// Bad: Errors inside callbacks do not propagate outward
try {
  getUser(userId, (err, user) => {
    if (err) throw err; // <- This will NOT be caught!
    // The callback executes in a separate call stack
    // so try-catch does not work
  });
} catch (err) {
  // This is never reached
  console.error(err);
}

// Good: Handle errors inside the callback
getUser(userId, (err, user) => {
  if (err) {
    console.error('Error:', err.message);
    // Error recovery or alerting
    return;
  }
  // Normal processing
});

// Acceptable: Catch errors with domain (deprecated, shown for reference)
const domain = require('domain');
const d = domain.create();

d.on('error', (err) => {
  console.error('Domain caught:', err);
});

d.run(() => {
  getUser(userId, (err, user) => {
    if (err) throw err; // Domain catches this
  });
});
```

### 6.4 Memory Leaks

```javascript
// Bad: Memory leak via closures
function createConnection(config) {
  const connection = new DatabaseConnection(config);
  const largeBuffer = Buffer.alloc(100 * 1024 * 1024); // 100MB

  return {
    query(sql, callback) {
      // largeBuffer is retained by the closure (even if unused)
      connection.execute(sql, (err, rows) => {
        callback(err, rows);
      });
    },
    close() {
      connection.close();
    }
  };
}

// Good: Do not hold unnecessary references
function createConnectionFixed(config) {
  const connection = new DatabaseConnection(config);

  // largeBuffer is outside the function scope
  function processLargeData() {
    const largeBuffer = Buffer.alloc(100 * 1024 * 1024);
    // Reference disappears after use
    return transform(largeBuffer);
  }

  return {
    query(sql, callback) {
      connection.execute(sql, callback);
    },
    close() {
      connection.close();
    }
  };
}

// Bad: Accumulating event listeners
function setupHandler(element) {
  // A listener is added every time this is called
  element.addEventListener('click', () => {
    doSomething();
  });
}

// Good: Remove existing listeners
function setupHandlerFixed(element) {
  // Keep a reference with a named function
  if (element._clickHandler) {
    element.removeEventListener('click', element._clickHandler);
  }

  element._clickHandler = () => {
    doSomething();
  };
  element.addEventListener('click', element._clickHandler);
}

// Better: Use AbortController
function setupHandlerModern(element) {
  const controller = new AbortController();

  element.addEventListener('click', () => {
    doSomething();
  }, { signal: controller.signal });

  // Cleanup
  return () => controller.abort();
}
```

---

## 7. Migrating from Callbacks to Promises

### 7.1 Manual Promisification

```javascript
// Manually promisify
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

// Usage
readFilePromise('file.txt')
  .then(data => console.log(data))
  .catch(err => console.error(err));

// async/await version
async function main() {
  try {
    const data = await readFilePromise('file.txt');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

### 7.2 util.promisify

```javascript
// Node.js: Convert callbacks to Promises with util.promisify
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);

// Callback version
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Promise version
readFile('file.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));

// async/await version
async function main() {
  try {
    const data = await readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// fs/promises (Node.js 14+)
const fsPromises = require('fs/promises');

async function modernFileOps() {
  const data = await fsPromises.readFile('file.txt', 'utf8');
  await fsPromises.writeFile('output.txt', data.toUpperCase());
  const files = await fsPromises.readdir('.');
  console.log(files);
}
```

### 7.3 Generic promisify Function

```typescript
// Generic promisify implementation
function promisify<T>(
  fn: (...args: [...any[], (err: Error | null, result: T) => void]) => void
): (...args: any[]) => Promise<T> {
  return function (...args: any[]): Promise<T> {
    return new Promise((resolve, reject) => {
      fn(...args, (err: Error | null, result: T) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

// promisify for callbacks with multiple return values
function promisifyMultiResult(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, ...results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };
}

// Convert EventEmitter to Promise
function waitForEvent(emitter, eventName, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Timeout waiting for event: ${eventName}`));
    }, timeout);

    emitter.once(eventName, (...args) => {
      clearTimeout(timer);
      resolve(args.length === 1 ? args[0] : args);
    });

    emitter.once('error', (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

// Usage
const server = createServer();
const connection = await waitForEvent(server, 'connection', 10000);
```

### 7.4 Wrapper Class for Callback APIs

```typescript
// Wrap a legacy callback API in a modern interface
class DatabaseWrapper {
  private db: LegacyDatabase;

  constructor(connectionString: string) {
    this.db = new LegacyDatabase(connectionString);
  }

  // Wrap the callback API with a Promise
  query<T>(sql: string, params?: any[]): Promise<T[]> {
    return new Promise((resolve, reject) => {
      this.db.query(sql, params || [], (err: Error | null, rows: T[]) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  // Transaction
  async transaction<T>(fn: (tx: TransactionContext) => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.db.beginTransaction((err: Error | null, tx: any) => {
        if (err) {
          reject(err);
          return;
        }

        const context = new TransactionContext(tx);

        fn(context)
          .then((result) => {
            tx.commit((err: Error | null) => {
              if (err) reject(err);
              else resolve(result);
            });
          })
          .catch((error) => {
            tx.rollback((rollbackErr: Error | null) => {
              if (rollbackErr) {
                console.error('Rollback failed:', rollbackErr);
              }
              reject(error);
            });
          });
      });
    });
  }

  // Connection pool
  getConnection(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      this.db.getConnection((err: Error | null, conn: any) => {
        if (err) reject(err);
        else resolve(new Connection(conn));
      });
    });
  }
}

// Usage (clean async/await)
const db = new DatabaseWrapper('postgres://localhost/mydb');

async function getUserOrders(userId: string) {
  const [user] = await db.query<User>('SELECT * FROM users WHERE id = $1', [userId]);
  if (!user) throw new Error('User not found');

  const orders = await db.query<Order>(
    'SELECT * FROM orders WHERE user_id = $1',
    [userId]
  );

  return { user, orders };
}
```

---

## 8. Best Practices in Production

### 8.1 Callback Design Rules

```
1. Always use the error-first pattern
   Follow the callback(err, result) format

2. Always call callbacks asynchronously
   Use process.nextTick / queueMicrotask to avoid the Zalgo problem

3. Call callbacks only once
   Prevent double invocation with a once() wrapper

4. Always pass errors through the callback
   Use callback(err) instead of throw

5. Keep nesting to 3 levels or fewer
   Separate into named functions, or use the async library

6. Migrate to Promise / async-await if possible
   Avoid callbacks in new code
```

### 8.2 Migration Strategy

```typescript
// Gradual migration strategy

// Step 1: Wrap existing callback APIs
const readFileAsync = promisify(fs.readFile);

// Step 2: Write new functions with async/await
async function loadConfig(): Promise<Config> {
  const data = await readFileAsync('config.json', 'utf8');
  return JSON.parse(data);
}

// Step 3: Create a dual interface for functions that accept callbacks
function getData(
  key: string,
  callback?: (err: Error | null, data?: Data) => void,
): Promise<Data> | void {
  const promise = getDataInternal(key);

  if (callback) {
    promise
      .then(data => callback(null, data))
      .catch(err => callback(err));
    return;
  }

  return promise;
}

// Use with callback style
getData('key', (err, data) => {
  if (err) handleError(err);
  else console.log(data);
});

// Use with Promise style
const data = await getData('key');
```


---

## Hands-On Exercises

### Exercise 1: Basic Implementation

Implement code that meets the following requirements.

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

    print(f"Inefficient version: {slow_time:.4f}s")
    print(f"Efficient version:   {fast_time:.6f}s")
    print(f"Speedup:             {slow_time/fast_time:.0f}x")

benchmark()
```

**Key Points:**
- Be aware of algorithmic complexity
- Choose appropriate data structures
- Measure results with benchmarks
---


## FAQ

### Q1: What is the most important point to focus on when learning this topic?

Gaining hands-on experience is the most important thing. Understanding deepens not just through theory, but by actually writing code and verifying its behavior.

### Q2: What are common mistakes that beginners make?

Skipping the fundamentals and jumping to advanced topics. We recommend thoroughly understanding the basic concepts covered in this guide before moving on to the next step.

### Q3: How is this applied in real-world development?

Knowledge of this topic is frequently used in everyday development work. It becomes especially important during code reviews and architecture design.

---

## Summary

| Concept | Key Point |
|---------|-----------|
| Callback | A function called upon completion |
| Error-first | The (err, result) convention |
| Callback hell | Deep nesting -> Solved with Promises |
| Synchronous callbacks | map, filter, sort, reduce |
| Asynchronous callbacks | I/O, timers, events |
| Zalgo problem | Avoid mixing sync and async |
| Double invocation | Prevent with a once() wrapper |
| Memory leaks | Watch out for closure references |

### The Evolution of Callbacks

```
Callbacks (1990s~)
  | Problem: Callback hell
Promise (ES2015 / 2015~)
  | Improvement: Chainable, error propagation
async/await (ES2017 / 2017~)
  | Improvement: Synchronous-style writing
Reactive Streams (RxJS, etc.)
  | Extension: Stream processing
AsyncIterator / for-await-of (ES2018)
  -> Asynchronous iteration
```

---

## Recommended Next Guides

---

## References
1. Node.js Documentation. "Asynchronous Programming."
2. Ogden, M. "Callback Hell." callbackhell.com.
3. Havoc Pennington. "Don't Release Zalgo!" blog.izs.me.
4. Casciaro, M. & Mammoliti, L. "Node.js Design Patterns." Packt Publishing, 2020.
5. Mozilla Developer Network. "Callback function." MDN Web Docs.
6. Caolan McMahon. "async.js." github.com/caolan/async.
7. Node.js API. "util.promisify." nodejs.org.
8. Rust Documentation. "Closures." doc.rust-lang.org.



===== SOURCE: 02-programming/async-and-error-handling/docs/01-async-patterns/01-promises.md =====

# Promise

> A Promise is an object representing a "future value." It resolves callback hell and makes asynchronous processing chainable. Master the usage of Promise.all, Promise.race, and Promise.allSettled.

## What You Will Learn in This Chapter

- [ ] Understand the three states and operational principles of a Promise
- [ ] Grasp Promise chaining and error propagation
- [ ] Learn concurrent execution patterns with Promises
- [ ] Compare Promise equivalents across different languages
- [ ] Master Promise patterns and anti-patterns used in production


## Prerequisites

Before reading this guide, having the following knowledge will deepen your understanding:

- Basic programming knowledge
- Understanding of related fundamental concepts
- Understanding of the content in [Callbacks](./00-callbacks.md)

---

## 1. Promise Basics

### 1.1 The Three States of a Promise

```
The three states of a Promise:
  pending  -> fulfilled (success) -> holds a value
           -> rejected (failure)  -> holds an error

  +---------+
  | pending |
  +----+----+
  +----+----+
  v         v
+----------+ +----------+
|fulfilled | | rejected |
| (value)  | | (error)  |
+----------+ +----------+

  Once fulfilled/rejected, it cannot change (immutable)
  -> This is called "settled"

State transition rules:
  1. pending -> fulfilled (transitions via resolve)
  2. pending -> rejected (transitions via reject)
  3. fulfilled -> cannot change
  4. rejected -> cannot change
  5. pending -> pending (stays as is)
```

### 1.2 Creating and Consuming a Promise

```javascript
// Creating a Promise
const promise = new Promise((resolve, reject) => {
  // Asynchronous processing
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) {
      resolve("Success!");         // Transitions to fulfilled state
    } else {
      reject(new Error("Failed")); // Transitions to rejected state
    }
  }, 1000);
});

// Consuming a Promise
promise
  .then(value => console.log(value))   // On fulfilled
  .catch(error => console.error(error)) // On rejected
  .finally(() => console.log("Done"));  // Either way
```

### 1.3 Immediately Resolved Promises

```typescript
// Promise that immediately becomes fulfilled
const resolved = Promise.resolve(42);
const resolvedObj = Promise.resolve({ name: "Taro" });

// Promise that immediately becomes rejected
const rejected = Promise.reject(new Error("Error"));

// If the value is a Promise, it is returned as-is (not wrapped)
const original = Promise.resolve(42);
const same = Promise.resolve(original);
console.log(original === same); // true

// Thenable objects (objects with a then method)
const thenable = {
  then(resolve) {
    resolve(42);
  }
};
const fromThenable = Promise.resolve(thenable);
fromThenable.then(value => console.log(value)); // 42
```

### 1.4 Promise Execution Timing

```typescript
// The Promise callback (executor) is executed synchronously
console.log('1. before');

const p = new Promise((resolve) => {
  console.log('2. executor (synchronous execution)');
  resolve('value');
});

console.log('3. after');

p.then((value) => {
  console.log('4. then (asynchronous execution, microtask)');
});

console.log('5. end');

// Output order:
// 1. before
// 2. executor (synchronous execution)
// 3. after
// 5. end
// 4. then (asynchronous execution, microtask)
```

---

## 2. Promise Chaining

### 2.1 Basic Chaining

```javascript
// then() returns a new Promise -> chainable
fetchUser(userId)
  .then(user => fetchOrders(user.id))         // Returns a Promise
  .then(orders => orders.filter(o => o.active)) // Returns a value -> wrapped with Promise.resolve()
  .then(activeOrders => {
    console.log(`${activeOrders.length} active orders`);
    return activeOrders;
  })
  .catch(error => {
    // Catches errors from anywhere in the chain
    console.error("Error:", error.message);
  });

// Error propagation
//  then -> then -> then -> catch
//    | error occurs          ^
//    +----------------------+
//    skipped
```

### 2.2 How Chaining Works

```typescript
// The value of the Promise returned by then() is determined by the callback's return value

// Case 1: Return a value -> Promise.resolve(value)
Promise.resolve(1)
  .then(x => x + 1)  // Promise.resolve(2)
  .then(x => x * 3)  // Promise.resolve(6)
  .then(x => console.log(x)); // 6

// Case 2: Return a Promise -> that Promise is used
Promise.resolve(1)
  .then(x => Promise.resolve(x + 1))  // Promise<2>
  .then(x => fetch(`/api/${x}`))       // fetch's Promise
  .then(response => response.json());

// Case 3: Throw an error -> Promise.reject(error)
Promise.resolve(1)
  .then(x => {
    if (x < 10) throw new Error('Too small');
    return x;
  })
  .catch(err => console.error(err.message)); // "Too small"

// Case 4: Return nothing -> Promise.resolve(undefined)
Promise.resolve(1)
  .then(x => { console.log(x); }) // undefined
  .then(x => console.log(x));     // undefined
```

### 2.3 Error Handling in Detail

```typescript
// catch is a shortcut for then(undefined, onRejected)
promise.catch(fn);
// is equivalent to promise.then(undefined, fn);

// However, there is a subtle difference in behavior
promise
  .then(
    value => { throw new Error('Error inside then'); },
    error => console.log('rejected:', error) // <- Does NOT catch errors inside then
  );

promise
  .then(value => { throw new Error('Error inside then'); })
  .catch(error => console.log('caught:', error)); // <- Catches errors inside then too

// Error recovery mid-chain
fetchUser(userId)
  .then(user => fetchAvatar(user.avatarId))
  .catch(error => {
    console.warn('Avatar fetch failed, using default');
    return '/images/default-avatar.png'; // Recovery value
  })
  .then(avatarUrl => {
    // Reaches here even after an error (with recovery value)
    displayAvatar(avatarUrl);
  });

// Segmented error handling with multiple catches
fetchUser(userId)
  .then(user => {
    return fetchOrders(user.id);
  })
  .catch(error => {
    // Error from fetchUser or fetchOrders
    console.error('Data fetch error:', error);
    return []; // Recovery with empty array
  })
  .then(orders => {
    return calculateTotal(orders);
  })
  .catch(error => {
    // Error from calculateTotal only
    console.error('Calculation error:', error);
    return 0;
  })
  .then(total => {
    displayTotal(total);
  });
```

### 2.4 Using finally

```typescript
// finally: Executes regardless of success or failure
// Does not alter the value (transparent)

async function fetchData(url: string): Promise<Data> {
  showLoadingSpinner();

  return fetch(url)
    .then(response => response.json())
    .finally(() => {
      // Hide spinner (whether success or failure)
      hideLoadingSpinner();
    });
}

// finally passes the value through (does not change it)
Promise.resolve(42)
  .finally(() => {
    console.log('cleanup');
    return 100; // Ignored
  })
  .then(value => console.log(value)); // 42 (not 100)

// However, throwing inside finally propagates the error
Promise.resolve(42)
  .finally(() => {
    throw new Error('cleanup failed');
  })
  .catch(err => console.error(err.message)); // "cleanup failed"
```

---

## 3. Concurrent Execution Patterns

### 3.1 Promise.all

```typescript
// Promise.all: Succeeds if all succeed. Fails if even one fails
const [users, orders, products] = await Promise.all([
  fetchUsers(),      // 100ms
  fetchOrders(),     // 200ms
  fetchProducts(),   // 150ms
]);
// Total: max(100, 200, 150) = 200ms

// Type-safe usage (TypeScript)
interface DashboardData {
  users: User[];
  orders: Order[];
  stats: Stats;
}

async function getDashboard(): Promise<DashboardData> {
  const [users, orders, stats] = await Promise.all([
    fetchUsers(),                    // Promise<User[]>
    fetchOrders(),                   // Promise<Order[]>
    fetchStats(),                    // Promise<Stats>
  ] as const);

  return { users, orders, stats };
}

// Dynamic arrays
async function fetchAllUserData(userIds: string[]): Promise<User[]> {
  return Promise.all(
    userIds.map(id => fetchUser(id))
  );
}

// Note: If even one fails, the entire operation fails
try {
  const results = await Promise.all([
    fetchFromAPI1(), // Succeeds
    fetchFromAPI2(), // Fails -> entire operation fails
    fetchFromAPI3(), // Succeeds but result is discarded
  ]);
} catch (error) {
  // Only the error from fetchFromAPI2
  console.error('One of the requests failed:', error);
}
```

### 3.2 Promise.allSettled

```typescript
// Promise.allSettled: Gets all results (both successes and failures)
// Added in ES2020
const results = await Promise.allSettled([
  fetchFromAPI1(),   // Succeeds
  fetchFromAPI2(),   // Fails
  fetchFromAPI3(),   // Succeeds
]);
// results = [
//   { status: "fulfilled", value: data1 },
//   { status: "rejected", reason: Error },
//   { status: "fulfilled", value: data3 },
// ]

// Practical example: Tolerating partial failure
async function fetchMultipleAPIs(urls: string[]): Promise<{
  succeeded: { url: string; data: any }[];
  failed: { url: string; error: Error }[];
}> {
  const results = await Promise.allSettled(
    urls.map(async url => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return { url, data: await response.json() };
    })
  );

  const succeeded = results
    .filter((r): r is PromiseFulfilledResult<{ url: string; data: any }> =>
      r.status === 'fulfilled'
    )
    .map(r => r.value);

  const failed = results
    .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
    .map((r, i) => ({ url: urls[i], error: r.reason }));

  return { succeeded, failed };
}

// Usage
const { succeeded, failed } = await fetchMultipleAPIs([
  'https://api1.example.com/data',
  'https://api2.example.com/data',
  'https://api3.example.com/data',
]);

console.log(`${succeeded.length} succeeded, ${failed.length} failed`);
```

### 3.3 Promise.race

```typescript
// Promise.race: Returns the first to complete
const fastest = await Promise.race([
  fetchFromServer1(), // 100ms
  fetchFromServer2(), // 50ms  <- This wins
  fetchFromServer3(), // 200ms
]);

// Practical example 1: Timeout implementation
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms);
  });

  return Promise.race([promise, timeout]);
}

// Usage
try {
  const data = await withTimeout(fetchData(), 5000);
} catch (error) {
  if (error.message.includes('Timeout')) {
    console.error('Request timed out');
  }
}

// Practical example 2: Cancellable Promise
function cancellable<T>(promise: Promise<T>): {
  promise: Promise<T>;
  cancel: () => void;
} {
  let cancelFn: () => void;

  const cancelPromise = new Promise<never>((_, reject) => {
    cancelFn = () => reject(new Error('Cancelled'));
  });

  return {
    promise: Promise.race([promise, cancelPromise]),
    cancel: cancelFn!,
  };
}

const { promise, cancel } = cancellable(fetchLargeData());
// Cancel after 5 seconds
setTimeout(cancel, 5000);
```

### 3.4 Promise.any

```typescript
// Promise.any: Returns the first to succeed (ES2021)
const firstSuccess = await Promise.any([
  fetchFromServer1(), // Fails
  fetchFromServer2(), // Succeeds <- This is returned
  fetchFromServer3(), // Succeeds
]);
// Only throws AggregateError if all fail

// Practical example: Fallback servers
async function fetchWithFallback(urls: string[]): Promise<Response> {
  try {
    return await Promise.any(
      urls.map(url => fetch(url).then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r;
      }))
    );
  } catch (error) {
    if (error instanceof AggregateError) {
      console.error('All servers failed:', error.errors);
      throw new Error('All fallback servers failed');
    }
    throw error;
  }
}

// Usage
const response = await fetchWithFallback([
  'https://primary.example.com/api/data',
  'https://secondary.example.com/api/data',
  'https://tertiary.example.com/api/data',
]);

// Practical example: Fastest DNS resolution
async function resolveFastest(hostname: string): Promise<string> {
  return Promise.any([
    resolveViaDoH('https://dns.google/resolve', hostname),
    resolveViaDoH('https://cloudflare-dns.com/dns-query', hostname),
    resolveViaSystem(hostname),
  ]);
}
```

### 3.5 Comparison of the Four Concurrent Methods

```
+------------------+-------------+-------------+--------------+
| Method           | Success     | Failure     | Use Case     |
|                  | Condition   | Condition   |              |
+------------------+-------------+-------------+--------------+
| Promise.all      | All succeed | Any one     | All data     |
|                  |             | fails       | required     |
+------------------+-------------+-------------+--------------+
| Promise.         | Always      | Never       | Partial      |
| allSettled       | succeeds    |             | failure OK   |
+------------------+-------------+-------------+--------------+
| Promise.race     | First       | First       | Timeout      |
|                  | result      | result      |              |
+------------------+-------------+-------------+--------------+
| Promise.any      | First       | All fail    | Fallback     |
|                  | success     |             |              |
+------------------+-------------+-------------+--------------+
```

---

## 4. Common Mistakes and Anti-Patterns

### 4.1 Forgetting to Return a Promise

```typescript
// Bad: Forgetting to return a Promise
async function bad() {
  fetchData(); // No await or return -> does not wait for result
}

// Good: Fixed
async function good() {
  return fetchData(); // or await fetchData();
}

// Bad: Forgetting to return Promises in map
async function badMap(items: Item[]) {
  items.map(async item => {
    await processItem(item); // Not returned -> cannot wait for completion
  });
}

// Good: Wait with Promise.all
async function goodMap(items: Item[]) {
  await Promise.all(
    items.map(async item => {
      await processItem(item);
    })
  );
}
```

### 4.2 Unnecessary Promise Wrappers

```typescript
// Bad: Unnecessary Promise wrapper
async function unnecessary() {
  return new Promise((resolve) => {
    resolve(fetchData()); // fetchData() already returns a Promise
  });
}
// Good: Return directly
async function correct() {
  return fetchData();
}

// Bad: Unnecessary async
async function alsoUnnecessary() {
  return 42; // async is unnecessary (just returning a synchronous value)
}
// Good: Remove async if unnecessary
function simple(): number {
  return 42;
}

// However, async is useful when you want errors to become Promise.reject
async function withErrorHandling(): Promise<number> {
  const value = validate(input); // validate may throw
  return value; // Since it's an async function, throw is automatically converted to reject
}
```

### 4.3 async with forEach

```typescript
// Bad: async with forEach (uncontrollable concurrency)
items.forEach(async (item) => {
  await processItem(item); // All start simultaneously, cannot wait for completion
});
console.log('done'); // <- Executes BEFORE processItem completes!

// Good: Sequential execution with for...of
for (const item of items) {
  await processItem(item); // Processes one at a time in order
}
console.log('done'); // Executes after all items are complete

// Good: Concurrent execution with Promise.all
await Promise.all(items.map(item => processItem(item)));
console.log('done'); // Executes after all items are complete

// Good: Controlled concurrency with for...of + batching
async function processBatch<T>(
  items: T[],
  fn: (item: T) => Promise<void>,
  batchSize: number,
): Promise<void> {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await Promise.all(batch.map(fn));
  }
}

await processBatch(items, processItem, 5); // Batch processing with 5 concurrent
```

### 4.4 Promise Without catch

```typescript
// Bad: Promise without catch
fetchData().then(data => use(data));
// -> UnhandledPromiseRejection on rejection

// Good: Fixed
fetchData().then(data => use(data)).catch(handleError);

// Good: try-catch with async/await
async function handler() {
  try {
    const data = await fetchData();
    use(data);
  } catch (error) {
    handleError(error);
  }
}

// Also set up a global handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Log recording, alert sending, etc.
});
```

### 4.5 Nesting then Chains

```typescript
// Bad: then inside then (callback hell returns)
fetchUser(userId).then(user => {
  fetchOrders(user.id).then(orders => {
    fetchOrderDetails(orders[0].id).then(details => {
      console.log(details); // Deep nesting
    });
  });
});

// Good: Flatten with chaining
fetchUser(userId)
  .then(user => fetchOrders(user.id))
  .then(orders => fetchOrderDetails(orders[0].id))
  .then(details => console.log(details))
  .catch(error => console.error(error));

// Better: Even simpler with async/await
async function getDetails(userId: string) {
  const user = await fetchUser(userId);
  const orders = await fetchOrders(user.id);
  const details = await fetchOrderDetails(orders[0].id);
  return details;
}
```

---

## 5. Concurrency Limiting

### 5.1 Promise Pool

```typescript
// Promise pool that limits concurrent execution
async function promisePool<T>(
  tasks: (() => Promise<T>)[],
  concurrency: number,
): Promise<T[]> {
  const results: T[] = [];
  const executing = new Set<Promise<void>>();

  for (const [index, task] of tasks.entries()) {
    const promise = task().then(result => {
      results[index] = result;
    });

    executing.add(promise);
    promise.finally(() => executing.delete(promise));

    if (executing.size >= concurrency) {
      await Promise.race(executing);
    }
  }

  await Promise.all(executing);
  return results;
}

// Usage: Fetch 1000 URLs with 5 concurrent
const urls = Array.from({ length: 1000 }, (_, i) =>
  `https://api.example.com/item/${i}`
);
const tasks = urls.map(url => () => fetch(url).then(r => r.json()));
const results = await promisePool(tasks, 5);
```

### 5.2 Semaphore-Based Concurrency Limiting

```typescript
class AsyncSemaphore {
  private permits: number;
  private waiting: (() => void)[] = [];

  constructor(permits: number) {
    this.permits = permits;
  }

  async acquire(): Promise<void> {
    if (this.permits > 0) {
      this.permits--;
      return;
    }
    return new Promise<void>(resolve => {
      this.waiting.push(resolve);
    });
  }

  release(): void {
    if (this.waiting.length > 0) {
      const resolve = this.waiting.shift()!;
      resolve();
    } else {
      this.permits++;
    }
  }

  async withPermit<T>(fn: () => Promise<T>): Promise<T> {
    await this.acquire();
    try {
      return await fn();
    } finally {
      this.release();
    }
  }
}

// Usage
const semaphore = new AsyncSemaphore(3); // Max 3 concurrent

const results = await Promise.all(
  urls.map(url =>
    semaphore.withPermit(() => fetch(url).then(r => r.json()))
  )
);
```

### 5.3 Queue-Based Concurrency Limiting

```typescript
class AsyncQueue<T> {
  private concurrency: number;
  private running = 0;
  private queue: {
    fn: () => Promise<T>;
    resolve: (value: T) => void;
    reject: (reason: any) => void;
  }[] = [];

  constructor(concurrency: number) {
    this.concurrency = concurrency;
  }

  add(fn: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({ fn, resolve, reject });
      this.processNext();
    });
  }

  private async processNext(): Promise<void> {
    if (this.running >= this.concurrency || this.queue.length === 0) {
      return;
    }

    this.running++;
    const { fn, resolve, reject } = this.queue.shift()!;

    try {
      const result = await fn();
      resolve(result);
    } catch (error) {
      reject(error);
    } finally {
      this.running--;
      this.processNext();
    }
  }

  get size(): number {
    return this.queue.length;
  }

  get pending(): number {
    return this.running;
  }
}

// Usage
const queue = new AsyncQueue<Response>(5);

const results = await Promise.all(
  urls.map(url =>
    queue.add(() => fetch(url))
  )
);
```

---

## 6. Practical Patterns

### 6.1 Retry Pattern

```typescript
async function retryPromise<T>(
  fn: () => Promise<T>,
  options: {
    retries?: number;
    delay?: number;
    backoff?: number;
    shouldRetry?: (error: unknown) => boolean;
    onRetry?: (error: unknown, attempt: number) => void;
  } = {},
): Promise<T> {
  const {
    retries = 3,
    delay = 1000,
    backoff = 2,
    shouldRetry = () => true,
    onRetry,
  } = options;

  let lastError: unknown;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt === retries || !shouldRetry(error)) {
        throw error;
      }

      const waitTime = delay * Math.pow(backoff, attempt);
      const jitter = waitTime * 0.1 * Math.random();

      onRetry?.(error, attempt + 1);

      await new Promise(resolve =>
        setTimeout(resolve, waitTime + jitter)
      );
    }
  }

  throw lastError;
}

// Usage
const data = await retryPromise(
  () => fetch('https://api.example.com/data').then(r => {
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  }),
  {
    retries: 3,
    delay: 1000,
    shouldRetry: (error) => {
      if (error instanceof Error) {
        return error.message.includes('5') || error.message.includes('429');
      }
      return false;
    },
    onRetry: (error, attempt) => {
      console.warn(`Attempt ${attempt} failed:`, error);
    },
  }
);
```

### 6.2 Cache Pattern

```typescript
// Promise caching (preventing duplicate requests)
class PromiseCache<K, V> {
  private cache = new Map<K, Promise<V>>();
  private ttl: number;

  constructor(ttlMs: number = 60000) {
    this.ttl = ttlMs;
  }

  get(key: K, factory: () => Promise<V>): Promise<V> {
    const existing = this.cache.get(key);
    if (existing) return existing;

    const promise = factory().then(value => {
      // Delete cache after TTL
      setTimeout(() => this.cache.delete(key), this.ttl);
      return value;
    }).catch(error => {
      // Delete cache immediately on error (allow retry next time)
      this.cache.delete(key);
      throw error;
    });

    this.cache.set(key, promise);
    return promise;
  }

  invalidate(key: K): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }
}

// Usage
const userCache = new PromiseCache<string, User>(30000); // 30-second TTL

async function getUser(userId: string): Promise<User> {
  return userCache.get(userId, () =>
    fetch(`/api/users/${userId}`).then(r => r.json())
  );
}

// Even if the same user is requested simultaneously, the API is called only once
const [user1, user2] = await Promise.all([
  getUser('user-123'),
  getUser('user-123'), // Cache hit (same Promise)
]);
```

### 6.3 Debounce Pattern

```typescript
// Promise-based debounce
function debouncePromise<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  delay: number,
): T {
  let timeoutId: ReturnType<typeof setTimeout>;
  let pendingResolve: ((value: any) => void) | null = null;
  let pendingReject: ((reason: any) => void) | null = null;

  return ((...args: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise((resolve, reject) => {
      // Cancel the previous pending
      if (pendingReject) {
        pendingReject(new Error('Debounced'));
      }

      clearTimeout(timeoutId);
      pendingResolve = resolve;
      pendingReject = reject;

      timeoutId = setTimeout(async () => {
        try {
          const result = await fn(...args);
          pendingResolve?.(result);
        } catch (error) {
          pendingReject?.(error);
        }
        pendingResolve = null;
        pendingReject = null;
      }, delay);
    });
  }) as T;
}

// Usage: Search API
const debouncedSearch = debouncePromise(
  (query: string) => fetch(`/api/search?q=${query}`).then(r => r.json()),
  300,
);

// Even if called multiple times within 300ms, only the last call executes
input.addEventListener('input', async (e) => {
  try {
    const results = await debouncedSearch(e.target.value);
    renderResults(results);
  } catch (error) {
    if (error.message !== 'Debounced') {
      console.error(error);
    }
  }
});
```

### 6.4 Pipeline Pattern

```typescript
// Promise pipeline: Build processing step by step
type AsyncPipe<T, R> = (input: T) => Promise<R>;

function pipeline<T>(...fns: AsyncPipe<any, any>[]): AsyncPipe<T, any> {
  return async (input: T) => {
    let result: any = input;
    for (const fn of fns) {
      result = await fn(result);
    }
    return result;
  };
}

// Usage
const processOrder = pipeline<OrderInput>(
  validateOrder,        // OrderInput -> ValidatedOrder
  calculatePricing,     // ValidatedOrder -> PricedOrder
  applyDiscounts,       // PricedOrder -> DiscountedOrder
  processPayment,       // DiscountedOrder -> PaidOrder
  createShipment,       // PaidOrder -> ShippedOrder
  sendConfirmation,     // ShippedOrder -> ConfirmedOrder
);

const order = await processOrder({
  items: [{ productId: 'p-1', quantity: 2 }],
  customerId: 'c-123',
});
```

---

## 7. Promise Equivalents in Other Languages

### 7.1 Python: asyncio.Future / coroutine

```python
import asyncio

# Python's coroutine is equivalent to JavaScript's async function
async def fetch_user(user_id: str) -> dict:
    # Use await to wait for another coroutine
    await asyncio.sleep(0.1)  # Simulate I/O
    return {"id": user_id, "name": "Taro"}

# asyncio.gather = Promise.all
async def fetch_all():
    users, orders, stats = await asyncio.gather(
        fetch_user("u-1"),
        fetch_orders("u-1"),
        fetch_stats(),
    )
    return {"users": users, "orders": orders, "stats": stats}

# asyncio.wait = More fine-grained control
async def fetch_with_timeout():
    tasks = [
        asyncio.create_task(fetch_user("u-1")),
        asyncio.create_task(fetch_orders("u-1")),
    ]

    done, pending = await asyncio.wait(
        tasks,
        timeout=5.0,
        return_when=asyncio.FIRST_COMPLETED,
    )

    for task in pending:
        task.cancel()  # Cancel timed-out tasks

    return [task.result() for task in done]

# asyncio.TaskGroup (Python 3.11+) = Structured concurrency
async def structured_fetch():
    async with asyncio.TaskGroup() as tg:
        user_task = tg.create_task(fetch_user("u-1"))
        orders_task = tg.create_task(fetch_orders("u-1"))

    # All tasks are complete by the time you exit the TaskGroup
    return user_task.result(), orders_task.result()
```

### 7.2 Rust: Future

```rust
use tokio;
use futures::future;

// Rust's Future = JavaScript's Promise
// However, it's lazy: it does not execute until .await

async fn fetch_user(user_id: &str) -> Result<User, AppError> {
    // An async function returns Future<Output = Result<User, AppError>>
    let url = format!("https://api.example.com/users/{}", user_id);
    let user: User = reqwest::get(&url).await?.json().await?;
    Ok(user)
}

// tokio::join! = Promise.all
async fn fetch_all(user_id: &str) -> Result<Dashboard, AppError> {
    let (user, orders, stats) = tokio::join!(
        fetch_user(user_id),
        fetch_orders(user_id),
        fetch_stats(),
    );

    Ok(Dashboard {
        user: user?,
        orders: orders?,
        stats: stats?,
    })
}

// tokio::select! = Promise.race
async fn fetch_with_timeout(user_id: &str) -> Result<User, AppError> {
    tokio::select! {
        result = fetch_user(user_id) => result,
        _ = tokio::time::sleep(Duration::from_secs(5)) => {
            Err(AppError::Timeout)
        }
    }
}

// futures::future::join_all = Promise.all (for dynamic count)
async fn fetch_all_users(user_ids: Vec<String>) -> Vec<Result<User, AppError>> {
    let futures: Vec<_> = user_ids.iter()
        .map(|id| fetch_user(id))
        .collect();

    future::join_all(futures).await
}
```

### 7.3 Java: CompletableFuture

```java
import java.util.concurrent.*;

// Java's CompletableFuture = JavaScript's Promise

public class CompletableFutureExamples {

    // Basic creation
    CompletableFuture<User> fetchUser(String userId) {
        return CompletableFuture.supplyAsync(() -> {
            // Runs on a background thread
            return userRepo.findById(userId);
        });
    }

    // Chaining (equivalent to then)
    CompletableFuture<String> getUserName(String userId) {
        return fetchUser(userId)
            .thenApply(user -> user.getName())        // map
            .thenApply(name -> name.toUpperCase());    // map
    }

    // Equivalent to flatMap
    CompletableFuture<List<Order>> getUserOrders(String userId) {
        return fetchUser(userId)
            .thenCompose(user -> fetchOrders(user.getId())); // flatMap
    }

    // Equivalent to Promise.all
    CompletableFuture<Dashboard> getDashboard(String userId) {
        CompletableFuture<User> userF = fetchUser(userId);
        CompletableFuture<List<Order>> ordersF = fetchOrders(userId);
        CompletableFuture<Stats> statsF = fetchStats(userId);

        return CompletableFuture.allOf(userF, ordersF, statsF)
            .thenApply(v -> new Dashboard(
                userF.join(),
                ordersF.join(),
                statsF.join()
            ));
    }

    // Equivalent to Promise.race
    CompletableFuture<User> fetchFastest(String userId) {
        return CompletableFuture.anyOf(
            fetchFromPrimary(userId),
            fetchFromSecondary(userId)
        ).thenApply(result -> (User) result);
    }

    // Error handling
    CompletableFuture<User> fetchWithFallback(String userId) {
        return fetchUser(userId)
            .exceptionally(error -> {
                // Equivalent to catch
                System.err.println("Fetch failed: " + error.getMessage());
                return User.defaultUser();
            });
    }

    // Timeout (Java 9+)
    CompletableFuture<User> fetchWithTimeout(String userId) {
        return fetchUser(userId)
            .orTimeout(5, TimeUnit.SECONDS)
            .exceptionally(error -> {
                if (error instanceof TimeoutException) {
                    return User.defaultUser();
                }
                throw new CompletionException(error);
            });
    }
}
```

### 7.4 C#: Task

```csharp
using System;
using System.Threading.Tasks;

// C#'s Task = JavaScript's Promise

public class TaskExamples
{
    // Basic
    async Task<User> FetchUserAsync(string userId)
    {
        var response = await httpClient.GetAsync($"/api/users/{userId}");
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<User>();
    }

    // Task.WhenAll = Promise.all
    async Task<Dashboard> GetDashboardAsync(string userId)
    {
        var userTask = FetchUserAsync(userId);
        var ordersTask = FetchOrdersAsync(userId);
        var statsTask = FetchStatsAsync(userId);

        await Task.WhenAll(userTask, ordersTask, statsTask);

        return new Dashboard
        {
            User = userTask.Result,
            Orders = ordersTask.Result,
            Stats = statsTask.Result,
        };
    }

    // Task.WhenAny = Promise.race
    async Task<User> FetchFastestAsync(string userId)
    {
        var task1 = FetchFromPrimaryAsync(userId);
        var task2 = FetchFromSecondaryAsync(userId);

        var completed = await Task.WhenAny(task1, task2);
        return await completed;
    }

    // Cancellation token
    async Task<User> FetchWithCancellationAsync(
        string userId,
        CancellationToken ct)
    {
        ct.ThrowIfCancellationRequested();

        var response = await httpClient.GetAsync(
            $"/api/users/{userId}", ct
        );
        return await response.Content.ReadFromJsonAsync<User>(ct);
    }
}
```

---

## 8. Testing Promises

### 8.1 Basic Tests

```typescript
import { describe, it, expect, vi } from 'vitest';

describe('Promise Pattern Tests', () => {
  it('tests normal Promise resolution', async () => {
    const result = await Promise.resolve(42);
    expect(result).toBe(42);
  });

  it('tests Promise rejection', async () => {
    await expect(Promise.reject(new Error('test')))
      .rejects.toThrow('test');
  });

  it('tests Promise.all behavior', async () => {
    const results = await Promise.all([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
    ]);
    expect(results).toEqual([1, 2, 3]);
  });

  it('tests Promise.all failure', async () => {
    await expect(
      Promise.all([
        Promise.resolve(1),
        Promise.reject(new Error('fail')),
        Promise.resolve(3),
      ])
    ).rejects.toThrow('fail');
  });

  it('tests Promise.allSettled behavior', async () => {
    const results = await Promise.allSettled([
      Promise.resolve('ok'),
      Promise.reject(new Error('fail')),
    ]);

    expect(results[0]).toEqual({ status: 'fulfilled', value: 'ok' });
    expect(results[1].status).toBe('rejected');
  });
});
```

### 8.2 Mocking Asynchronous Functions

```typescript
describe('Mocking Async Functions', () => {
  it('tests with mocked fetch', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ id: '123', name: 'Test' }),
    });

    global.fetch = mockFetch;

    const user = await fetchUser('123');
    expect(user.name).toBe('Test');
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/users/123')
    );
  });

  it('tests retry logic', async () => {
    const mockFn = vi.fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('success');

    const result = await retryPromise(mockFn, { retries: 3, delay: 10 });
    expect(result).toBe('success');
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  it('tests timeout', async () => {
    vi.useFakeTimers();

    const slowPromise = new Promise(resolve =>
      setTimeout(() => resolve('done'), 10000)
    );

    const promise = withTimeout(slowPromise, 5000);

    vi.advanceTimersByTime(5000);

    await expect(promise).rejects.toThrow('Timeout');

    vi.useRealTimers();
  });

  it('tests concurrency limiting', async () => {
    let concurrent = 0;
    let maxConcurrent = 0;

    const tasks = Array.from({ length: 10 }, () => async () => {
      concurrent++;
      maxConcurrent = Math.max(maxConcurrent, concurrent);
      await new Promise(r => setTimeout(r, 50));
      concurrent--;
      return 'done';
    });

    await promisePool(tasks, 3);
    expect(maxConcurrent).toBeLessThanOrEqual(3);
  });
});
```

---

## 9. Promise Internals

### 9.1 Simplified Promise Implementation

```typescript
// Simplified implementation to understand how Promises work internally
class SimplePromise<T> {
  private state: 'pending' | 'fulfilled' | 'rejected' = 'pending';
  private value: T | undefined;
  private reason: any;
  private onFulfilledCallbacks: ((value: T) => void)[] = [];
  private onRejectedCallbacks: ((reason: any) => void)[] = [];

  constructor(executor: (
    resolve: (value: T) => void,
    reject: (reason: any) => void,
  ) => void) {
    const resolve = (value: T) => {
      if (this.state !== 'pending') return;
      this.state = 'fulfilled';
      this.value = value;
      this.onFulfilledCallbacks.forEach(cb => cb(value));
    };

    const reject = (reason: any) => {
      if (this.state !== 'pending') return;
      this.state = 'rejected';
      this.reason = reason;
      this.onRejectedCallbacks.forEach(cb => cb(reason));
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then<U>(
    onFulfilled?: (value: T) => U | SimplePromise<U>,
    onRejected?: (reason: any) => U | SimplePromise<U>,
  ): SimplePromise<U> {
    return new SimplePromise<U>((resolve, reject) => {
      const handleFulfilled = (value: T) => {
        queueMicrotask(() => {
          try {
            if (onFulfilled) {
              const result = onFulfilled(value);
              if (result instanceof SimplePromise) {
                result.then(resolve, reject);
              } else {
                resolve(result);
              }
            } else {
              resolve(value as any);
            }
          } catch (error) {
            reject(error);
          }
        });
      };

      const handleRejected = (reason: any) => {
        queueMicrotask(() => {
          try {
            if (onRejected) {
              const result = onRejected(reason);
              if (result instanceof SimplePromise) {
                result.then(resolve, reject);
              } else {
                resolve(result);
              }
            } else {
              reject(reason);
            }
          } catch (error) {
            reject(error);
          }
        });
      };

      switch (this.state) {
        case 'fulfilled':
          handleFulfilled(this.value!);
          break;
        case 'rejected':
          handleRejected(this.reason);
          break;
        case 'pending':
          this.onFulfilledCallbacks.push(handleFulfilled);
          this.onRejectedCallbacks.push(handleRejected);
          break;
      }
    });
  }

  catch<U>(onRejected: (reason: any) => U | SimplePromise<U>): SimplePromise<U> {
    return this.then(undefined, onRejected);
  }

  static resolve<T>(value: T): SimplePromise<T> {
    return new SimplePromise(resolve => resolve(value));
  }

  static reject(reason: any): SimplePromise<never> {
    return new SimplePromise((_, reject) => reject(reason));
  }

  static all<T>(promises: SimplePromise<T>[]): SimplePromise<T[]> {
    return new SimplePromise((resolve, reject) => {
      const results: T[] = [];
      let completed = 0;

      if (promises.length === 0) {
        resolve([]);
        return;
      }

      promises.forEach((promise, index) => {
        promise.then(
          value => {
            results[index] = value;
            completed++;
            if (completed === promises.length) {
              resolve(results);
            }
          },
          reject,
        );
      });
    });
  }
}
```


---

## Hands-On Exercises

### Exercise 1: Basic Implementation

Implement code that meets the following requirements.

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

    print(f"Inefficient version: {slow_time:.4f}s")
    print(f"Efficient version:   {fast_time:.6f}s")
    print(f"Speedup:             {slow_time/fast_time:.0f}x")

benchmark()
```

**Key Points:**
- Be aware of algorithmic complexity
- Choose appropriate data structures
- Measure results with benchmarks
---


## FAQ

### Q1: What is the most important point to focus on when learning this topic?

Gaining hands-on experience is the most important thing. Understanding deepens not just through theory, but by actually writing code and verifying its behavior.

### Q2: What are common mistakes that beginners make?

Skipping the fundamentals and jumping to advanced topics. We recommend thoroughly understanding the basic concepts covered in this guide before moving on to the next step.

### Q3: How is this applied in real-world development?

Knowledge of this topic is frequently used in everyday development work. It becomes especially important during code reviews and architecture design.

---

## Summary

| Method | Behavior | Use Case |
|--------|----------|----------|
| Promise.all | Succeeds when all succeed | Independent multiple API calls |
| Promise.allSettled | Waits for all to complete | Tolerating partial failure |
| Promise.race | Fastest result | Timeout implementation |
| Promise.any | First success | Fallback servers |

### Promise Best Practices

```
1. Always handle errors
   -> .catch() or try-catch

2. Avoid unnecessary Promise wrapping
   -> async functions already return Promises

3. Use Promise.all for parallelizable operations
   -> Avoid wasteful sequential awaits

4. Limit concurrency for large-scale parallel operations
   -> Semaphore or pool pattern

5. Use Promise caching to prevent duplicate requests
   -> Consolidate simultaneous requests for the same key into one
```

---

## Recommended Next Guides

---

## References
1. MDN Web Docs. "Promise."
2. Archibald, J. "JavaScript Promises: An Introduction." web.dev.
3. Promises/A+ Specification. promisesaplus.com.
4. ECMAScript Language Specification. "Promise Objects."
5. Tokio Documentation. "Working with Futures." tokio.rs.
6. Python Documentation. "asyncio - Tasks and Coroutines."
7. Oracle. "CompletableFuture." docs.oracle.com.
8. Microsoft. "Task-based asynchronous pattern." docs.microsoft.com.



===== SOURCE: 02-programming/async-and-error-handling/docs/01-async-patterns/02-async-await.md =====

# async/await

> async/await is syntactic sugar that lets you "read asynchronous code as if it were synchronous." It provides an intuitive way to write Promise-based asynchronous operations. This guide covers implementations in JavaScript, Python, Rust, and C#, along with concurrent execution patterns.

## What You Will Learn in This Chapter

- [ ] Understand the mechanism and underlying principles of async/await
- [ ] Grasp the differences in async/await across languages
- [ ] Learn efficient concurrent execution patterns
- [ ] Master error handling best practices
- [ ] Implement cancellation, timeout, and retry patterns
- [ ] Understand testing and debugging techniques


## Prerequisites

Before reading this guide, the following knowledge will deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts
- Familiarity with the content of [Promises](./01-promises.md)

---

## 1. async/await Fundamentals

### 1.1 Concept and Underlying Principles

async/await is syntactic sugar that allows asynchronous operations to be written as if they were synchronous code. Internally, it is based on Promises (JavaScript), Futures (Rust), or Coroutines (Python).

```
async function:
  -> Returns a Promise
  -> Return values are automatically wrapped with Promise.resolve()
  -> Thrown values are wrapped with Promise.reject()

await expression:
  -> Suspends function execution until the Promise resolves
  -> Returns the resolved value
  -> Can only be used inside async functions (Top-Level Await added in ES2022)
  -> Rejected Promises are thrown as exceptions

Internal behavior:
  async function f() {
    const a = await fetchA();  // Suspends here
    const b = await fetchB();  // Resumes after a resolves
    return a + b;
  }

  // Equivalent to:
  function f() {
    return fetchA()
      .then(a => fetchB().then(b => a + b));
  }
```

### 1.2 async/await as a State Machine

The compiler (or engine) transforms async functions into state machines. This enables efficient suspension and resumption.

```typescript
// Code written by the developer
async function process() {
  console.log("Step 1");
  const a = await fetchA();
  console.log("Step 2");
  const b = await fetchB(a);
  console.log("Step 3");
  return a + b;
}

// Conceptual transformation inside the engine (pseudocode)
function process() {
  let state = 0;
  let a: any, b: any;

  function step(value?: any): Promise<any> {
    switch (state) {
      case 0:
        console.log("Step 1");
        state = 1;
        return fetchA().then(step);
      case 1:
        a = value;
        console.log("Step 2");
        state = 2;
        return fetchB(a).then(step);
      case 2:
        b = value;
        console.log("Step 3");
        return Promise.resolve(a + b);
    }
  }
  return step();
}
```

### 1.3 Relationship with the Microtask Queue

```typescript
// async/await uses the microtask queue
async function demo() {
  console.log("1: async function starts (executes synchronously)");
  const result = await Promise.resolve("hello");
  // ^ Suspends here and places the continuation in the microtask queue
  console.log("3: Resumes after await (executes as a microtask)");
  return result;
}

console.log("0: Before the call");
demo().then(() => console.log("4: then callback"));
console.log("2: After the call (executes synchronously)");

// Output order:
// 0: Before the call
// 1: async function starts (executes synchronously)
// 2: After the call (executes synchronously)
// 3: Resumes after await (executes as a microtask)
// 4: then callback
```

### 1.4 Top-Level Await (ES2022)

```typescript
// Top-Level Await is available in ES modules

// config.ts - Asynchronous loading of configuration
const response = await fetch("/api/config");
export const config = await response.json();

// main.ts - Automatically awaited on import
import { config } from "./config.ts";
console.log(config.apiKey); // Executes after configuration loading completes

// Caveats:
// 1. Cannot be used with CommonJS (require)
// 2. Affects module loading order
// 3. Be cautious of circular dependencies
// 4. Convenient for server-side initialization
```

---

## 2. JavaScript/TypeScript

### 2.1 Basic Patterns

```typescript
// Basic async function
async function getUserProfile(userId: string): Promise<UserProfile> {
  const user = await userRepo.findById(userId);
  if (!user) throw new Error("User not found");

  const [orders, reviews] = await Promise.all([
    orderRepo.findByUserId(userId),
    reviewRepo.findByUserId(userId),
  ]);

  return { user, orders, reviews };
}

// async with arrow functions
const fetchData = async (url: string): Promise<Response> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
  }
  return response;
};

// async in methods
class UserService {
  async findById(id: string): Promise<User | null> {
    const cached = await this.cache.get(`user:${id}`);
    if (cached) return cached;

    const user = await this.db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (user) {
      await this.cache.set(`user:${id}`, user, { ttl: 300 });
    }
    return user;
  }

  // Note: async cannot be used with getters
  // async get name() {} // SyntaxError

  // Alternative pattern
  async getName(): Promise<string> {
    const profile = await this.loadProfile();
    return profile.name;
  }
}
```

### 2.2 Error Handling

```typescript
// Basic error handling with try/catch
async function safeGetUser(userId: string): Promise<User | null> {
  try {
    return await userRepo.findById(userId);
  } catch (error) {
    logger.error("Failed to get user", { userId, error });
    return null;
  }
}

// Fine-grained error handling with multiple async operations
async function processOrder(orderId: string): Promise<OrderResult> {
  // Step 1: Retrieve the order
  let order: Order;
  try {
    order = await orderRepo.findById(orderId);
  } catch (error) {
    throw new OrderNotFoundError(orderId, { cause: error });
  }

  // Step 2: Check inventory
  try {
    await inventoryService.checkAvailability(order.items);
  } catch (error) {
    if (error instanceof OutOfStockError) {
      return { status: "out_of_stock", items: error.unavailableItems };
    }
    throw error; // Re-throw unexpected errors
  }

  // Step 3: Process payment
  try {
    const payment = await paymentService.charge(order.total, order.paymentMethod);
    return { status: "completed", payment };
  } catch (error) {
    // Restore inventory on payment failure
    await inventoryService.release(order.items);
    throw new PaymentFailedError(orderId, { cause: error });
  }
}

// Result type pattern (without exceptions)
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

async function safeAsync<T>(
  fn: () => Promise<T>
): Promise<Result<T>> {
  try {
    const value = await fn();
    return { ok: true, value };
  } catch (error) {
    return { ok: false, error: error as Error };
  }
}

// Usage example
async function handleRequest() {
  const userResult = await safeAsync(() => getUser("123"));
  if (!userResult.ok) {
    console.error("User fetch failed:", userResult.error.message);
    return;
  }

  const ordersResult = await safeAsync(() => getOrders(userResult.value.id));
  if (!ordersResult.ok) {
    console.error("Orders fetch failed:", ordersResult.error.message);
    return;
  }

  return { user: userResult.value, orders: ordersResult.value };
}
```

### 2.3 Sequential vs Concurrent

```typescript
// Sequential execution (serial)
async function sequential(): Promise<void> {
  const a = await fetchA(); // 100ms
  const b = await fetchB(); // 200ms
  // Total: 300ms (serial)
}

// Concurrent execution
async function concurrent(): Promise<void> {
  const [a, b] = await Promise.all([
    fetchA(), // 100ms |
    fetchB(), // 200ms | concurrent
  ]);        //       |
  // Total: 200ms (concurrent)
}

// Important: Execution starts at the moment a Promise is created
async function earlyStart(): Promise<void> {
  // Create Promises first (execution starts)
  const promiseA = fetchA(); // Starts immediately
  const promiseB = fetchB(); // Starts immediately

  // Wait for both results
  const a = await promiseA;
  const b = await promiseB;
  // Equivalent concurrent execution to Promise.all
}

// However, be careful with error handling
async function earlyStartWithErrorHandling(): Promise<void> {
  const promiseA = fetchA();
  const promiseB = fetchB();

  // If promiseB rejects first, we're still waiting on promiseA's await
  // -> May trigger an unhandled rejection warning
  // -> Using Promise.all is safer
  try {
    const [a, b] = await Promise.all([promiseA, promiseB]);
  } catch (error) {
    // Catches all errors
  }
}
```

### 2.4 Iteration Patterns

```typescript
// Bad: for...of + await (sequential execution)
async function processSequential(urls: string[]): Promise<Response[]> {
  const results: Response[] = [];
  for (const url of urls) {
    const response = await fetch(url); // One at a time...
    results.push(response);
  }
  return results;
}

// Good: Promise.all (fully concurrent)
async function processAllConcurrent(urls: string[]): Promise<Response[]> {
  return Promise.all(urls.map(url => fetch(url)));
}

// Good: Concurrency-limited execution (up to N at a time)
async function processWithConcurrencyLimit<T>(
  items: T[],
  fn: (item: T) => Promise<any>,
  limit: number
): Promise<any[]> {
  const results: any[] = [];
  const executing: Promise<void>[] = [];

  for (const [index, item] of items.entries()) {
    const promise = fn(item).then(result => {
      results[index] = result;
    });

    executing.push(promise);

    if (executing.length >= limit) {
      await Promise.race(executing);
      // Remove completed Promises
      const completed = executing.findIndex(
        p => p === Promise.race([p]).then(() => p)
      );
    }
  }

  await Promise.all(executing);
  return results;
}

// A more refined concurrency limiter: Semaphore
class Semaphore {
  private queue: (() => void)[] = [];
  private running = 0;

  constructor(private readonly limit: number) {}

  async acquire(): Promise<void> {
    if (this.running < this.limit) {
      this.running++;
      return;
    }
    return new Promise<void>(resolve => {
      this.queue.push(resolve);
    });
  }

  release(): void {
    this.running--;
    const next = this.queue.shift();
    if (next) {
      this.running++;
      next();
    }
  }

  async run<T>(fn: () => Promise<T>): Promise<T> {
    await this.acquire();
    try {
      return await fn();
    } finally {
      this.release();
    }
  }
}

// Semaphore usage example
async function fetchAllWithLimit(urls: string[], limit: number) {
  const semaphore = new Semaphore(limit);
  return Promise.all(
    urls.map(url => semaphore.run(() => fetch(url)))
  );
}

// for-await-of (async iteration)
async function* fetchPages(url: string): AsyncGenerator<Item[]> {
  let nextUrl: string | null = url;
  while (nextUrl) {
    const response = await fetch(nextUrl);
    const data = await response.json();
    yield data.items;
    nextUrl = data.nextPage;
  }
}

async function getAllItems(url: string): Promise<Item[]> {
  const allItems: Item[] = [];
  for await (const page of fetchPages(url)) {
    allItems.push(...page);
    console.log(`Fetched ${page.length} items, total: ${allItems.length}`);
  }
  return allItems;
}

// Async iteration of ReadableStream
async function readStream(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let result = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      result += decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }
  return result;
}
```

### 2.5 Cancellation with AbortController

```typescript
// Basic cancellation
async function fetchWithCancel(
  url: string,
  signal?: AbortSignal
): Promise<Response> {
  const response = await fetch(url, { signal });
  return response;
}

const controller = new AbortController();
const promise = fetchWithCancel("/api/data", controller.signal);

// Cancel as needed
setTimeout(() => controller.abort(), 5000);

try {
  const result = await promise;
} catch (error) {
  if (error instanceof DOMException && error.name === "AbortError") {
    console.log("Request was cancelled");
  } else {
    throw error;
  }
}

// Generic function with timeout
async function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  message = "Operation timed out"
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);

  try {
    const result = await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        controller.signal.addEventListener("abort", () => {
          reject(new Error(message));
        });
      }),
    ]);
    return result;
  } finally {
    clearTimeout(timeoutId);
  }
}

// AbortSignal.timeout() (newer API)
async function fetchWithTimeout(url: string): Promise<Response> {
  return fetch(url, {
    signal: AbortSignal.timeout(5000), // 5-second timeout
  });
}

// Batch cancellation of multiple requests
class RequestManager {
  private controller = new AbortController();

  async fetch(url: string): Promise<Response> {
    return fetch(url, { signal: this.controller.signal });
  }

  cancelAll(): void {
    this.controller.abort();
    this.controller = new AbortController(); // Reset
  }
}

// Usage in React
function useAsyncEffect(
  effect: (signal: AbortSignal) => Promise<void>,
  deps: React.DependencyList
): void {
  React.useEffect(() => {
    const controller = new AbortController();
    effect(controller.signal).catch(error => {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    });
    return () => controller.abort(); // Cleanup
  }, deps);
}

// Usage example
function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = React.useState<User | null>(null);

  useAsyncEffect(async (signal) => {
    const response = await fetch(`/api/users/${userId}`, { signal });
    const data = await response.json();
    setUser(data);
  }, [userId]);

  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}
```

### 2.6 Retry Patterns

```typescript
// Retry with exponential backoff
async function withRetry<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    baseDelay?: number;
    maxDelay?: number;
    shouldRetry?: (error: Error, attempt: number) => boolean;
    onRetry?: (error: Error, attempt: number) => void;
  } = {}
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 30000,
    shouldRetry = () => true,
    onRetry,
  } = options;

  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries || !shouldRetry(lastError, attempt)) {
        throw lastError;
      }

      onRetry?.(lastError, attempt);

      // Exponential backoff + jitter
      const delay = Math.min(
        baseDelay * Math.pow(2, attempt) + Math.random() * 1000,
        maxDelay
      );
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}

// Usage example
const data = await withRetry(
  () => fetch("/api/data").then(r => r.json()),
  {
    maxRetries: 3,
    baseDelay: 1000,
    shouldRetry: (error, attempt) => {
      // Only retry on network errors or 5xx
      if (error instanceof TypeError) return true; // Network error
      if (error instanceof HttpError && error.status >= 500) return true;
      return false;
    },
    onRetry: (error, attempt) => {
      console.log(`Retry ${attempt + 1}: ${error.message}`);
    },
  }
);

// Retry with circuit breaker
class CircuitBreaker {
  private failures = 0;
  private lastFailureTime = 0;
  private state: "closed" | "open" | "half-open" = "closed";

  constructor(
    private readonly threshold: number = 5,
    private readonly resetTimeout: number = 60000
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === "open") {
      if (Date.now() - this.lastFailureTime > this.resetTimeout) {
        this.state = "half-open";
      } else {
        throw new Error("Circuit breaker is open");
      }
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failures = 0;
    this.state = "closed";
  }

  private onFailure(): void {
    this.failures++;
    this.lastFailureTime = Date.now();
    if (this.failures >= this.threshold) {
      this.state = "open";
    }
  }
}
```

---

## 3. Python

### 3.1 asyncio Basics

```python
import asyncio
from typing import Any

# Basic async function
async def get_user_profile(user_id: str) -> dict:
    user = await user_repo.find_by_id(user_id)
    if not user:
        raise ValueError("User not found")

    # Concurrent execution with asyncio.gather
    orders, reviews = await asyncio.gather(
        order_repo.find_by_user_id(user_id),
        review_repo.find_by_user_id(user_id),
    )
    return {"user": user, "orders": orders, "reviews": reviews}

# Execution
async def main():
    profile = await get_user_profile("user-123")
    print(profile)

asyncio.run(main())
```

### 3.2 Task Management

```python
import asyncio

# Creating tasks and concurrent execution
async def process_items(items: list[str]) -> list[dict]:
    tasks = [asyncio.create_task(fetch_item(item)) for item in items]
    return await asyncio.gather(*tasks)

# Task cancellation
async def cancellable_operation():
    task = asyncio.create_task(long_running_operation())

    # Cancel after 5 seconds
    await asyncio.sleep(5)
    task.cancel()

    try:
        await task
    except asyncio.CancelledError:
        print("Task was cancelled")

# TaskGroup (Python 3.11+) - Structured concurrency
async def structured_concurrency():
    async with asyncio.TaskGroup() as tg:
        task1 = tg.create_task(fetch_users())
        task2 = tg.create_task(fetch_orders())
        task3 = tg.create_task(fetch_products())
    # Reaches here after all tasks complete
    # If any task raises an exception,
    # the others are also cancelled
    users = task1.result()
    orders = task2.result()
    products = task3.result()
    return users, orders, products

# Error handling with TaskGroup
async def safe_task_group():
    try:
        async with asyncio.TaskGroup() as tg:
            tg.create_task(might_fail_1())
            tg.create_task(might_fail_2())
    except* ValueError as eg:
        # Handle ExceptionGroup (Python 3.11+)
        for exc in eg.exceptions:
            print(f"ValueError: {exc}")
    except* TypeError as eg:
        for exc in eg.exceptions:
            print(f"TypeError: {exc}")
```

### 3.3 Timeouts and Deadlines

```python
import asyncio

# Timeout with wait_for
async def with_timeout():
    try:
        result = await asyncio.wait_for(
            slow_operation(),
            timeout=5.0
        )
    except asyncio.TimeoutError:
        print("Timed out")

# asyncio.timeout (Python 3.11+)
async def modern_timeout():
    async with asyncio.timeout(5.0):
        result = await slow_operation()
        return result

# Deadline
async def with_deadline():
    deadline = asyncio.get_event_loop().time() + 10.0
    async with asyncio.timeout_at(deadline):
        await step1()
        await step2()  # Executes within remaining time
        await step3()  # All within 10 seconds total

# Processing partial completion with asyncio.wait
async def partial_results():
    tasks = [
        asyncio.create_task(fetch(url))
        for url in urls
    ]

    # Get the first completed result
    done, pending = await asyncio.wait(
        tasks,
        return_when=asyncio.FIRST_COMPLETED
    )
    for task in done:
        print(f"Completed: {task.result()}")

    # Cancel the rest
    for task in pending:
        task.cancel()

# Streaming results with as_completed
async def stream_results():
    tasks = [
        asyncio.create_task(fetch(url))
        for url in urls
    ]

    for coro in asyncio.as_completed(tasks):
        result = await coro
        print(f"Got result: {result}")
        # Processed in completion order
```

### 3.4 Async Context Managers and Iterators

```python
import asyncio
from contextlib import asynccontextmanager

# Async context manager (class-based)
class AsyncDatabaseConnection:
    def __init__(self, dsn: str):
        self.dsn = dsn
        self.conn = None

    async def __aenter__(self):
        self.conn = await asyncpg.connect(self.dsn)
        return self.conn

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if self.conn:
            await self.conn.close()
        return False  # Re-raise the exception

# Usage
async def query_users():
    async with AsyncDatabaseConnection("postgresql://...") as conn:
        rows = await conn.fetch("SELECT * FROM users")
        return rows

# Decorator-based async context manager
@asynccontextmanager
async def managed_transaction(pool):
    conn = await pool.acquire()
    tx = conn.transaction()
    await tx.start()
    try:
        yield conn
        await tx.commit()
    except Exception:
        await tx.rollback()
        raise
    finally:
        await pool.release(conn)

# Async iterator
class AsyncPaginator:
    def __init__(self, url: str, page_size: int = 100):
        self.url = url
        self.page_size = page_size
        self.page = 0

    def __aiter__(self):
        return self

    async def __anext__(self):
        self.page += 1
        data = await fetch_page(self.url, self.page, self.page_size)
        if not data:
            raise StopAsyncIteration
        return data

# Usage
async def process_all_pages():
    async for page in AsyncPaginator("/api/users"):
        for user in page:
            await process_user(user)

# Async generator
async def async_range(start: int, stop: int, delay: float = 0.1):
    for i in range(start, stop):
        await asyncio.sleep(delay)
        yield i

async def use_async_generator():
    async for value in async_range(0, 10):
        print(value)
```

### 3.5 Practical HTTP Client with aiohttp

```python
import aiohttp
import asyncio
from typing import Any

class AsyncHttpClient:
    def __init__(self, base_url: str, max_concurrent: int = 10):
        self.base_url = base_url
        self.semaphore = asyncio.Semaphore(max_concurrent)
        self.session: aiohttp.ClientSession | None = None

    async def __aenter__(self):
        self.session = aiohttp.ClientSession(
            base_url=self.base_url,
            timeout=aiohttp.ClientTimeout(total=30),
        )
        return self

    async def __aexit__(self, *args):
        if self.session:
            await self.session.close()

    async def get(self, path: str) -> dict[str, Any]:
        async with self.semaphore:
            async with self.session.get(path) as response:
                response.raise_for_status()
                return await response.json()

    async def get_many(self, paths: list[str]) -> list[dict[str, Any]]:
        tasks = [self.get(path) for path in paths]
        return await asyncio.gather(*tasks)

    async def get_with_retry(
        self, path: str, max_retries: int = 3
    ) -> dict[str, Any]:
        for attempt in range(max_retries):
            try:
                return await self.get(path)
            except aiohttp.ClientError as e:
                if attempt == max_retries - 1:
                    raise
                delay = 2 ** attempt
                print(f"Retry {attempt + 1}/{max_retries} after {delay}s: {e}")
                await asyncio.sleep(delay)

# Usage example
async def main():
    async with AsyncHttpClient("https://api.example.com") as client:
        # Fetch 100 users concurrently (up to 10 at a time)
        paths = [f"/users/{i}" for i in range(100)]
        users = await client.get_many(paths)
        print(f"Fetched {len(users)} users")
```

---

## 4. Rust

### 4.1 The Future Trait and async/await

```rust
// Rust: async/await (tokio runtime)
use tokio;

// Rust's async fn returns a type that implements the Future trait
// Future trait:
// trait Future {
//     type Output;
//     fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output>;
// }

async fn get_user_profile(user_id: &str) -> Result<UserProfile, AppError> {
    let user = user_repo.find_by_id(user_id).await?;

    // Concurrent execution with tokio::join!
    let (orders, reviews) = tokio::join!(
        order_repo.find_by_user_id(user_id),
        review_repo.find_by_user_id(user_id),
    );

    Ok(UserProfile {
        user,
        orders: orders?,
        reviews: reviews?,
    })
}

#[tokio::main]
async fn main() {
    let profile = get_user_profile("user-123").await.unwrap();
    println!("{:?}", profile);
}

// Characteristics of Rust's async:
// -> Zero-cost abstraction (compiles to a state machine)
// -> Runtime is separate (tokio, async-std, smol)
// -> Futures are lazy (not executed until awaited)
// -> Send + 'static constraints (must be movable across threads)
```

### 4.2 tokio Concurrent Execution Patterns

```rust
use tokio;
use tokio::time::{timeout, Duration};

// Spawning tasks with tokio::spawn
async fn spawn_tasks() -> Result<(), Box<dyn std::error::Error>> {
    let handle1 = tokio::spawn(async {
        // Independent task
        fetch_users().await
    });

    let handle2 = tokio::spawn(async {
        fetch_orders().await
    });

    // Get both results
    let (users, orders) = (handle1.await??, handle2.await??);
    println!("Users: {}, Orders: {}", users.len(), orders.len());
    Ok(())
}

// Racing with tokio::select!
async fn fetch_with_timeout() -> Result<Data, AppError> {
    tokio::select! {
        result = fetch_data() => {
            result.map_err(|e| AppError::Fetch(e))
        }
        _ = tokio::time::sleep(Duration::from_secs(5)) => {
            Err(AppError::Timeout)
        }
    }
}

// Using tokio::select! to take the first response
async fn fastest_mirror(mirrors: Vec<String>) -> Result<Data, AppError> {
    tokio::select! {
        result = fetch_from(&mirrors[0]) => result,
        result = fetch_from(&mirrors[1]) => result,
        result = fetch_from(&mirrors[2]) => result,
    }
}

// Timeout
async fn with_timeout() -> Result<Data, AppError> {
    match timeout(Duration::from_secs(10), fetch_data()).await {
        Ok(Ok(data)) => Ok(data),
        Ok(Err(e)) => Err(AppError::Fetch(e)),
        Err(_) => Err(AppError::Timeout),
    }
}

// Buffered channel
async fn producer_consumer() {
    let (tx, mut rx) = tokio::sync::mpsc::channel::<String>(100);

    // Producer
    let producer = tokio::spawn(async move {
        for i in 0..1000 {
            tx.send(format!("message {}", i)).await.unwrap();
        }
    });

    // Consumer
    let consumer = tokio::spawn(async move {
        while let Some(msg) = rx.recv().await {
            process_message(&msg).await;
        }
    });

    let _ = tokio::join!(producer, consumer);
}
```

### 4.3 Stream (Async Iterator)

```rust
use tokio_stream::{self as stream, StreamExt};
use futures::stream::{self, Stream};

// Creating and consuming a Stream
async fn process_stream() {
    let mut stream = stream::iter(vec![1, 2, 3, 4, 5])
        .map(|x| async move {
            tokio::time::sleep(Duration::from_millis(100)).await;
            x * 2
        })
        .buffered(3); // Process up to 3 concurrently

    while let Some(value) = stream.next().await {
        println!("Got: {}", value);
    }
}

// Custom Stream
fn countdown(from: u32) -> impl Stream<Item = u32> {
    stream::unfold(from, |state| async move {
        if state == 0 {
            None
        } else {
            tokio::time::sleep(Duration::from_secs(1)).await;
            Some((state, state - 1))
        }
    })
}

// Stream composition
async fn merged_streams() {
    let stream1 = stream::iter(vec![1, 3, 5]);
    let stream2 = stream::iter(vec![2, 4, 6]);

    let mut merged = stream::select(stream1, stream2);
    while let Some(value) = merged.next().await {
        println!("{}", value);
    }
}

// Processing with concurrency limit
async fn process_with_limit(
    items: Vec<String>,
    limit: usize,
) -> Vec<Result<Data, Error>> {
    stream::iter(items)
        .map(|item| async move { fetch_data(&item).await })
        .buffer_unordered(limit)
        .collect()
        .await
}
```

### 4.4 Error Handling and the ? Operator

```rust
use thiserror::Error;

#[derive(Error, Debug)]
enum AppError {
    #[error("Network error: {0}")]
    Network(#[from] reqwest::Error),
    #[error("Database error: {0}")]
    Database(#[from] sqlx::Error),
    #[error("Not found: {0}")]
    NotFound(String),
    #[error("Timeout")]
    Timeout,
}

// Concise error handling with the ? operator
async fn get_user_with_orders(user_id: &str) -> Result<UserWithOrders, AppError> {
    let user = db::find_user(user_id)
        .await?  // sqlx::Error -> AppError::Database
        .ok_or_else(|| AppError::NotFound(user_id.to_string()))?;

    let orders = api::fetch_orders(user_id)
        .await?; // reqwest::Error -> AppError::Network

    Ok(UserWithOrders { user, orders })
}

// Retry
async fn with_retry<T, E, F, Fut>(
    mut f: F,
    max_retries: u32,
) -> Result<T, E>
where
    F: FnMut() -> Fut,
    Fut: std::future::Future<Output = Result<T, E>>,
    E: std::fmt::Debug,
{
    let mut attempt = 0;
    loop {
        match f().await {
            Ok(value) => return Ok(value),
            Err(e) if attempt < max_retries => {
                attempt += 1;
                eprintln!("Attempt {} failed: {:?}, retrying...", attempt, e);
                tokio::time::sleep(Duration::from_millis(
                    100 * 2u64.pow(attempt)
                )).await;
            }
            Err(e) => return Err(e),
        }
    }
}
```

---

## 5. Go (goroutine + channel)

Go does not have async/await syntax, but achieves equivalent functionality through goroutines and channels.

### 5.1 Basic Patterns

```go
package main

import (
    "context"
    "fmt"
    "sync"
    "time"
)

// In Go, all functions appear "synchronous"
// Asynchrony is achieved through goroutines
func getUserProfile(ctx context.Context, userID string) (*UserProfile, error) {
    user, err := userRepo.FindByID(ctx, userID)
    if err != nil {
        return nil, fmt.Errorf("find user: %w", err)
    }

    // Concurrent execution via goroutine + channel
    type ordersResult struct {
        orders []Order
        err    error
    }
    type reviewsResult struct {
        reviews []Review
        err     error
    }

    ordersCh := make(chan ordersResult, 1)
    reviewsCh := make(chan reviewsResult, 1)

    go func() {
        orders, err := orderRepo.FindByUserID(ctx, userID)
        ordersCh <- ordersResult{orders, err}
    }()

    go func() {
        reviews, err := reviewRepo.FindByUserID(ctx, userID)
        reviewsCh <- reviewsResult{reviews, err}
    }()

    or := <-ordersCh
    rr := <-reviewsCh

    if or.err != nil {
        return nil, fmt.Errorf("find orders: %w", or.err)
    }
    if rr.err != nil {
        return nil, fmt.Errorf("find reviews: %w", rr.err)
    }

    return &UserProfile{
        User:    user,
        Orders:  or.orders,
        Reviews: rr.reviews,
    }, nil
}
```

### 5.2 Concurrent Execution with errgroup

```go
import "golang.org/x/sync/errgroup"

func getDashboard(ctx context.Context, userID string) (*Dashboard, error) {
    var (
        profile       *Profile
        notifications []Notification
        stats         *Stats
    )

    g, ctx := errgroup.WithContext(ctx)

    g.Go(func() error {
        var err error
        profile, err = getProfile(ctx, userID)
        return err
    })

    g.Go(func() error {
        var err error
        notifications, err = getNotifications(ctx, userID)
        return err
    })

    g.Go(func() error {
        var err error
        stats, err = getStats(ctx, userID)
        return err
    })

    if err := g.Wait(); err != nil {
        return nil, err
    }

    return &Dashboard{
        Profile:       profile,
        Notifications: notifications,
        Stats:         stats,
    }, nil
}

// errgroup with concurrency limit
func processItems(ctx context.Context, items []string) error {
    g, ctx := errgroup.WithContext(ctx)
    g.SetLimit(10) // Up to 10 concurrent

    for _, item := range items {
        item := item // Capture loop variable (before Go 1.21)
        g.Go(func() error {
            return processItem(ctx, item)
        })
    }

    return g.Wait()
}
```

### 5.3 Cancellation and Timeout with Context

```go
import (
    "context"
    "time"
)

// Timeout
func fetchWithTimeout(url string) ([]byte, error) {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
    if err != nil {
        return nil, err
    }

    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return nil, err // May contain context.DeadlineExceeded
    }
    defer resp.Body.Close()

    return io.ReadAll(resp.Body)
}

// Cancellation propagation
func longOperation(ctx context.Context) error {
    for i := 0; i < 100; i++ {
        select {
        case <-ctx.Done():
            return ctx.Err() // context.Canceled or DeadlineExceeded
        default:
            // Continue processing
            if err := doStep(ctx, i); err != nil {
                return err
            }
        }
    }
    return nil
}

// Cancellation from parent context
func handler(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context() // Cancelled when the client disconnects

    result, err := longOperation(ctx)
    if err != nil {
        if ctx.Err() != nil {
            // Client disconnected
            return
        }
        http.Error(w, err.Error(), 500)
        return
    }

    json.NewEncoder(w).Encode(result)
}
```

---

## 6. C#

### 6.1 Task-Based async/await

```csharp
using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

// Basic
public async Task<UserProfile> GetUserProfileAsync(string userId)
{
    var user = await _userRepo.FindByIdAsync(userId);
    if (user == null)
        throw new NotFoundException($"User {userId} not found");

    var (orders, reviews) = await (
        _orderRepo.FindByUserIdAsync(userId),
        _reviewRepo.FindByUserIdAsync(userId)
    ).WhenAll();

    return new UserProfile(user, orders, reviews);
}

// ValueTask (value type, lightweight; effective when cache hits are frequent)
public ValueTask<User?> GetUserAsync(string userId)
{
    if (_cache.TryGetValue(userId, out var cached))
    {
        return ValueTask.FromResult(cached); // No heap allocation
    }

    return new ValueTask<User?>(GetUserFromDbAsync(userId));
}

private async Task<User?> GetUserFromDbAsync(string userId)
{
    var user = await _db.QueryAsync<User>(
        "SELECT * FROM Users WHERE Id = @Id", new { Id = userId });
    if (user != null)
    {
        _cache.Set(userId, user);
    }
    return user;
}

// CancellationToken
public async Task<Data> FetchDataAsync(
    string url,
    CancellationToken cancellationToken = default)
{
    using var client = new HttpClient();
    var response = await client.GetAsync(url, cancellationToken);
    response.EnsureSuccessStatusCode();

    var content = await response.Content.ReadAsStringAsync(cancellationToken);
    return JsonSerializer.Deserialize<Data>(content)!;
}

// Usage example
var cts = new CancellationTokenSource(TimeSpan.FromSeconds(10));
try
{
    var data = await FetchDataAsync("https://api.example.com", cts.Token);
}
catch (OperationCanceledException)
{
    Console.WriteLine("Operation was cancelled or timed out");
}
```

### 6.2 Concurrent Execution Patterns

```csharp
// Task.WhenAll
public async Task<Dashboard> GetDashboardAsync(string userId)
{
    var profileTask = GetProfileAsync(userId);
    var notificationsTask = GetNotificationsAsync(userId);
    var statsTask = GetStatsAsync(userId);

    await Task.WhenAll(profileTask, notificationsTask, statsTask);

    return new Dashboard
    {
        Profile = await profileTask,       // Already completed
        Notifications = await notificationsTask,
        Stats = await statsTask,
    };
}

// Task.WhenAny (use the first completion)
public async Task<Data> FetchFromFastestAsync(IEnumerable<string> urls)
{
    var tasks = urls.Select(url => FetchDataAsync(url)).ToList();
    var completed = await Task.WhenAny(tasks);
    return await completed;
}

// Concurrency limiting with SemaphoreSlim
public async Task ProcessAllAsync(
    IEnumerable<string> items,
    int maxConcurrency = 10)
{
    using var semaphore = new SemaphoreSlim(maxConcurrency);
    var tasks = items.Select(async item =>
    {
        await semaphore.WaitAsync();
        try
        {
            await ProcessItemAsync(item);
        }
        finally
        {
            semaphore.Release();
        }
    });

    await Task.WhenAll(tasks);
}

// IAsyncEnumerable (C# 8.0+)
public async IAsyncEnumerable<User> GetAllUsersAsync(
    [EnumeratorCancellation] CancellationToken ct = default)
{
    int page = 0;
    while (true)
    {
        var users = await _db.GetUsersPageAsync(page++, 100, ct);
        if (users.Count == 0) yield break;

        foreach (var user in users)
        {
            yield return user;
        }
    }
}

// Consumption
await foreach (var user in GetAllUsersAsync())
{
    Console.WriteLine(user.Name);
}
```

### 6.3 ConfigureAwait and Synchronization Context

```csharp
// Considerations for UI threads
// WPF and Windows Forms have a SynchronizationContext
public async void Button_Click(object sender, EventArgs e)
{
    var data = await FetchDataAsync("/api/data");
    // ^ Returns to the UI thread by default

    // UI update (executes on the UI thread)
    textBox.Text = data.ToString();
}

// Use ConfigureAwait(false) in library code
public async Task<Data> FetchDataLibraryAsync(string url)
{
    var response = await _client.GetAsync(url)
        .ConfigureAwait(false); // Continue on thread pool

    var content = await response.Content.ReadAsStringAsync()
        .ConfigureAwait(false);

    return JsonSerializer.Deserialize<Data>(content)!;
}

// Avoiding deadlocks
// Bad: Calling async from synchronous method causes deadlock
public Data GetDataSync()
{
    // Calling .Result on the UI thread causes deadlock!
    return FetchDataAsync("/api/data").Result;
}

// Good: async all the way (make everything async)
public async Task<Data> GetDataAsync()
{
    return await FetchDataAsync("/api/data");
}
```

---

## 7. Kotlin

### 7.1 Coroutine Basics

```kotlin
import kotlinx.coroutines.*

// suspend function
suspend fun getUserProfile(userId: String): UserProfile {
    val user = userRepo.findById(userId)
        ?: throw NotFoundException("User $userId not found")

    // Concurrent execution with coroutineScope
    return coroutineScope {
        val ordersDeferred = async { orderRepo.findByUserId(userId) }
        val reviewsDeferred = async { reviewRepo.findByUserId(userId) }

        UserProfile(
            user = user,
            orders = ordersDeferred.await(),
            reviews = reviewsDeferred.await()
        )
    }
}

// CoroutineScope and dispatchers
fun main() = runBlocking {
    // Dispatchers.IO: For I/O operations
    val data = withContext(Dispatchers.IO) {
        fetchFromNetwork()
    }

    // Dispatchers.Default: For CPU-intensive tasks
    val processed = withContext(Dispatchers.Default) {
        heavyComputation(data)
    }

    println(processed)
}

// Structured concurrency
suspend fun processDashboard(userId: String): Dashboard {
    return coroutineScope {
        val profile = async { getProfile(userId) }
        val notifications = async { getNotifications(userId) }
        val stats = async { getStats(userId) }

        // If any fails, the others are automatically cancelled
        Dashboard(
            profile = profile.await(),
            notifications = notifications.await(),
            stats = stats.await()
        )
    }
}
```

### 7.2 Flow (Cold Stream)

```kotlin
import kotlinx.coroutines.flow.*

// Creating a Flow
fun fetchUsers(): Flow<User> = flow {
    var page = 0
    while (true) {
        val users = api.getUsers(page++)
        if (users.isEmpty()) break
        users.forEach { emit(it) }
    }
}

// Transforming and consuming a Flow
suspend fun processUsers() {
    fetchUsers()
        .filter { it.isActive }
        .map { enrichUser(it) }
        .buffer(10) // Buffering for concurrency
        .collect { user ->
            println("Processed: ${user.name}")
        }
}

// StateFlow (Hot Stream, for UI)
class UserViewModel : ViewModel() {
    private val _uiState = MutableStateFlow<UiState>(UiState.Loading)
    val uiState: StateFlow<UiState> = _uiState.asStateFlow()

    fun loadUser(userId: String) {
        viewModelScope.launch {
            _uiState.value = UiState.Loading
            try {
                val user = userRepo.findById(userId)
                _uiState.value = UiState.Success(user)
            } catch (e: Exception) {
                _uiState.value = UiState.Error(e.message ?: "Unknown error")
            }
        }
    }
}
```

### 7.3 Cancellation and Timeout

```kotlin
import kotlinx.coroutines.*

// withTimeout
suspend fun fetchWithTimeout(): Data {
    return withTimeout(5000L) { // 5-second timeout
        fetchData()
    }
    // TimeoutCancellationException is thrown
}

// withTimeoutOrNull (returns null instead of throwing)
suspend fun safeFetch(): Data? {
    return withTimeoutOrNull(5000L) {
        fetchData()
    }
}

// Cooperative cancellation
suspend fun cancellableOperation() {
    for (i in 0..1000) {
        // Check for cancellation
        ensureActive() // Throws CancellationException

        // Or insert a suspension point with yield()
        yield()

        // Processing
        processItem(i)
    }
}

// Job cancellation
fun main() = runBlocking {
    val job = launch {
        repeat(1000) { i ->
            println("Processing $i...")
            delay(100)
        }
    }

    delay(500)
    job.cancelAndJoin() // Cancel and wait for completion
    println("Cancelled")
}
```

---

## 8. Swift

### 8.1 Structured Concurrency

```swift
import Foundation

// async function
func getUserProfile(userId: String) async throws -> UserProfile {
    let user = try await userRepo.findById(userId)

    // Concurrent execution with async let (structured concurrency)
    async let orders = orderRepo.findByUserId(userId)
    async let reviews = reviewRepo.findByUserId(userId)

    return UserProfile(
        user: user,
        orders: try await orders,
        reviews: try await reviews
    )
}

// TaskGroup
func fetchAllUsers(ids: [String]) async throws -> [User] {
    try await withThrowingTaskGroup(of: User.self) { group in
        for id in ids {
            group.addTask {
                try await fetchUser(id)
            }
        }

        var users: [User] = []
        for try await user in group {
            users.append(user)
        }
        return users
    }
}

// Task cancellation
func cancellableOperation() async throws {
    for i in 0..<1000 {
        // Check for cancellation
        try Task.checkCancellation()

        await processItem(i)
    }
}

// Actor (preventing data races)
actor UserCache {
    private var cache: [String: User] = [:]

    func get(_ id: String) -> User? {
        return cache[id]
    }

    func set(_ id: String, user: User) {
        cache[id] = user
    }

    func getOrFetch(_ id: String) async throws -> User {
        if let cached = cache[id] {
            return cached
        }
        let user = try await fetchUser(id)
        cache[id] = user
        return user
    }
}
```

### 8.2 AsyncSequence

```swift
// AsyncSequence
func fetchPages(url: URL) -> AsyncStream<[Item]> {
    AsyncStream { continuation in
        Task {
            var nextURL: URL? = url
            while let currentURL = nextURL {
                let (data, _) = try await URLSession.shared.data(from: currentURL)
                let page = try JSONDecoder().decode(Page.self, from: data)
                continuation.yield(page.items)
                nextURL = page.nextURL
            }
            continuation.finish()
        }
    }
}

// Consumption
func processAllPages() async {
    for await items in fetchPages(url: apiURL) {
        for item in items {
            print(item)
        }
    }
}

// URLSession bytes (streaming)
func downloadWithProgress(url: URL) async throws {
    let (bytes, response) = try await URLSession.shared.bytes(from: url)
    let totalSize = response.expectedContentLength
    var receivedSize: Int64 = 0

    for try await byte in bytes {
        receivedSize += 1
        if receivedSize % 1024 == 0 {
            let progress = Double(receivedSize) / Double(totalSize)
            print("Progress: \(Int(progress * 100))%")
        }
    }
}
```

---

## 9. Efficient Patterns

### 9.1 Execution Based on Dependency Graphs

```typescript
// Pattern 1: Early await (when there are dependencies)
async function orderPipeline(userId: string) {
  const user = await getUser(userId);         // Need user first
  const cart = await getCart(user.cartId);      // Depends on user
  const total = calculateTotal(cart.items);     // Synchronous
  const payment = await processPayment(total);  // Depends on total
  return payment;
}

// Pattern 2: Concurrent execution of independent tasks
async function dashboardData(userId: string) {
  // Fetch independent data concurrently
  const [profile, notifications, stats, feed] = await Promise.all([
    getProfile(userId),
    getNotifications(userId),
    getStats(userId),
    getFeed(userId),
  ]);
  return { profile, notifications, stats, feed };
}

// Pattern 3: Staged concurrent execution
async function complexPipeline(userId: string) {
  // Stage 1: Fetch user
  const user = await getUser(userId);

  // Stage 2: Three tasks that depend on user, in parallel
  const [orders, reviews, wishlist] = await Promise.all([
    getOrders(user.id),
    getReviews(user.id),
    getWishlist(user.id),
  ]);

  // Stage 3: Process tasks that depend on orders, in parallel
  const orderDetails = await Promise.all(
    orders.map(order => getOrderDetails(order.id))
  );

  return { user, orders: orderDetails, reviews, wishlist };
}

// Pattern 4: Automatic dependency graph resolution
type TaskDef<T> = {
  deps: string[];
  run: (results: Record<string, any>) => Promise<T>;
};

async function runTaskGraph(
  tasks: Record<string, TaskDef<any>>
): Promise<Record<string, any>> {
  const results: Record<string, any> = {};
  const completed = new Set<string>();
  const running = new Map<string, Promise<void>>();

  async function runTask(name: string): Promise<void> {
    if (completed.has(name)) return;
    if (running.has(name)) return running.get(name)!;

    const task = tasks[name];
    const promise = (async () => {
      // Execute dependent tasks first
      await Promise.all(task.deps.map(dep => runTask(dep)));
      results[name] = await task.run(results);
      completed.add(name);
    })();

    running.set(name, promise);
    await promise;
  }

  await Promise.all(Object.keys(tasks).map(name => runTask(name)));
  return results;
}

// Usage example
const result = await runTaskGraph({
  user: {
    deps: [],
    run: () => getUser("123"),
  },
  orders: {
    deps: ["user"],
    run: (r) => getOrders(r.user.id),
  },
  reviews: {
    deps: ["user"],
    run: (r) => getReviews(r.user.id),
  },
  recommendations: {
    deps: ["orders", "reviews"],
    run: (r) => getRecommendations(r.orders, r.reviews),
  },
});
```

### 9.2 Cache Patterns

```typescript
// Async cache (prevents duplicate requests)
class AsyncCache<K, V> {
  private cache = new Map<string, { value: V; expiresAt: number }>();
  private pending = new Map<string, Promise<V>>();

  constructor(
    private readonly fetcher: (key: K) => Promise<V>,
    private readonly keyFn: (key: K) => string = String,
    private readonly ttl: number = 60000
  ) {}

  async get(key: K): Promise<V> {
    const cacheKey = this.keyFn(key);

    // Cache hit
    const cached = this.cache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.value;
    }

    // If a request for the same key is in progress, wait for it (dedup)
    const pending = this.pending.get(cacheKey);
    if (pending) {
      return pending;
    }

    // New fetch
    const promise = this.fetcher(key)
      .then(value => {
        this.cache.set(cacheKey, {
          value,
          expiresAt: Date.now() + this.ttl,
        });
        return value;
      })
      .finally(() => {
        this.pending.delete(cacheKey);
      });

    this.pending.set(cacheKey, promise);
    return promise;
  }

  invalidate(key: K): void {
    this.cache.delete(this.keyFn(key));
  }

  clear(): void {
    this.cache.clear();
    this.pending.clear();
  }
}

// Usage example
const userCache = new AsyncCache<string, User>(
  (userId) => fetchUser(userId),
  (key) => key,
  5 * 60 * 1000 // 5 minutes
);

// Even if the same user is requested simultaneously, only one API call is made
const [user1, user2] = await Promise.all([
  userCache.get("user-123"),
  userCache.get("user-123"),
]);
```

### 9.3 Batch Processing and Debouncing

```typescript
// DataLoader pattern (solving the N+1 problem)
class DataLoader<K, V> {
  private batch: Map<K, {
    resolve: (value: V) => void;
    reject: (error: Error) => void;
  }[]> = new Map();
  private scheduled = false;

  constructor(
    private readonly batchFn: (keys: K[]) => Promise<Map<K, V>>
  ) {}

  async load(key: K): Promise<V> {
    return new Promise<V>((resolve, reject) => {
      if (!this.batch.has(key)) {
        this.batch.set(key, []);
      }
      this.batch.get(key)!.push({ resolve, reject });

      if (!this.scheduled) {
        this.scheduled = true;
        // Schedule batch execution as a microtask
        queueMicrotask(() => this.executeBatch());
      }
    });
  }

  private async executeBatch(): Promise<void> {
    const batch = this.batch;
    this.batch = new Map();
    this.scheduled = false;

    const keys = Array.from(batch.keys());
    try {
      const results = await this.batchFn(keys);
      for (const [key, callbacks] of batch) {
        const value = results.get(key);
        if (value !== undefined) {
          callbacks.forEach(cb => cb.resolve(value));
        } else {
          callbacks.forEach(cb => cb.reject(new Error(`Not found: ${key}`)));
        }
      }
    } catch (error) {
      for (const callbacks of batch.values()) {
        callbacks.forEach(cb => cb.reject(error as Error));
      }
    }
  }
}

// Usage example
const userLoader = new DataLoader<string, User>(
  async (ids) => {
    // SELECT * FROM users WHERE id IN (...)
    const users = await db.query(
      `SELECT * FROM users WHERE id = ANY($1)`, [ids]
    );
    return new Map(users.map(u => [u.id, u]));
  }
);

// Even when called individually, they are batched
async function resolveComment(comment: Comment) {
  const author = await userLoader.load(comment.authorId); // |
  const editor = await userLoader.load(comment.editorId); // | Becomes 1 SQL query
  return { ...comment, author, editor };                   // |
}

// Async debounce
function asyncDebounce<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  ms: number
): T {
  let timeoutId: NodeJS.Timeout;
  let pendingResolve: ((value: any) => void) | null = null;
  let pendingReject: ((error: any) => void) | null = null;

  return ((...args: any[]) => {
    return new Promise((resolve, reject) => {
      // Abort previous request
      if (pendingReject) {
        pendingReject(new Error("Debounced"));
      }

      pendingResolve = resolve;
      pendingReject = reject;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        try {
          const result = await fn(...args);
          pendingResolve?.(result);
        } catch (error) {
          pendingReject?.(error);
        } finally {
          pendingResolve = null;
          pendingReject = null;
        }
      }, ms);
    });
  }) as T;
}
```

### 9.4 for-await-of Patterns

```typescript
// Async generator
async function* fetchPages(url: string): AsyncGenerator<Item[]> {
  let nextUrl: string | null = url;
  while (nextUrl) {
    const response = await fetch(nextUrl);
    const data = await response.json();
    yield data.items;
    nextUrl = data.nextPage;
  }
}

for await (const page of fetchPages("/api/users")) {
  console.log(`Got ${page.length} users`);
}

// Pipeline: Async iterator with transformations
async function* map<T, U>(
  source: AsyncIterable<T>,
  fn: (item: T) => U | Promise<U>
): AsyncGenerator<U> {
  for await (const item of source) {
    yield await fn(item);
  }
}

async function* filter<T>(
  source: AsyncIterable<T>,
  predicate: (item: T) => boolean | Promise<boolean>
): AsyncGenerator<T> {
  for await (const item of source) {
    if (await predicate(item)) {
      yield item;
    }
  }
}

async function* take<T>(
  source: AsyncIterable<T>,
  count: number
): AsyncGenerator<T> {
  let taken = 0;
  for await (const item of source) {
    yield item;
    if (++taken >= count) break;
  }
}

// Pipeline usage example
const activeUsers = take(
  filter(
    map(
      fetchPages("/api/users"),
      page => page  // Get user array from page
    ),
    users => users.length > 0
  ),
  10 // Up to the first 10 pages
);

for await (const users of activeUsers) {
  await processUsers(users);
}
```

---

## 10. Common Mistakes and Anti-Patterns

### 10.1 Unnecessary Sequential Execution

```typescript
// Bad: Sequential await (when they could run concurrently)
const users = await getUsers();
const orders = await getOrders();
const products = await getProducts();
// -> Independent tasks running serially

// Good: Concurrent execution
const [users, orders, products] = await Promise.all([
  getUsers(), getOrders(), getProducts(),
]);
```

### 10.2 await Inside Loops

```typescript
// Bad: await inside a loop
for (const id of ids) {
  const data = await fetch(`/api/${id}`); // One at a time...
}

// Good: Concurrent execution
const results = await Promise.all(
  ids.map(id => fetch(`/api/${id}`))
);

// Good: Concurrency-limited (for large numbers of requests)
const semaphore = new Semaphore(10);
const results = await Promise.all(
  ids.map(id => semaphore.run(() => fetch(`/api/${id}`)))
);
```

### 10.3 Mixing async/await and .then()

```typescript
// Bad: Mixing .then() inside an async function
async function mixed() {
  return fetchData().then(data => data.value); // Mixed
}
// Good: Consistent style
async function clean() {
  const data = await fetchData();
  return data.value;
}
```

### 10.4 Unnecessary async

```typescript
// Bad: Unnecessary async (just return the Promise directly)
async function wrapper() {
  return await fetchData(); // Unnecessary async/await
}

// Good: Return directly (but be aware of error stack traces)
function wrapper() {
  return fetchData();
}

// Note: async/await is needed when try/catch is present
async function withErrorHandling() {
  try {
    return await fetchData(); // await is needed here
  } catch (error) {
    return fallbackData;
  }
}
```

### 10.5 Missing Error Handling

```typescript
// Bad: Unhandled rejection
async function firAndForget() {
  fetchData(); // Neither await nor catch!
}

// Good: Error handling even for fire-and-forget
async function safeFireAndForget() {
  fetchData().catch(error => {
    logger.error("Background task failed", error);
  });
}

// Bad: Promise.all fails entirely on partial failure
const results = await Promise.all([
  fetchA(), // Succeeds
  fetchB(), // Fails -> entire thing rejects
  fetchC(), // Succeeds but result is lost
]);

// Good: allSettled allows partial success
const results = await Promise.allSettled([
  fetchA(), fetchB(), fetchC(),
]);

const successful = results
  .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
  .map(r => r.value);

const failed = results
  .filter((r): r is PromiseRejectedResult => r.status === "rejected")
  .map(r => r.reason);
```

### 10.6 Memory Leaks

```typescript
// Bad: Forgetting cleanup
class DataFetcher {
  private intervalId?: NodeJS.Timeout;

  start() {
    this.intervalId = setInterval(async () => {
      const data = await fetchData();
      this.processData(data);
    }, 1000);
  }
  // Leaks if stop() is never called
}

// Good: Proper cleanup
class DataFetcher {
  private controller = new AbortController();
  private intervalId?: NodeJS.Timeout;

  start() {
    this.intervalId = setInterval(async () => {
      try {
        const data = await fetchData({ signal: this.controller.signal });
        this.processData(data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return; // Normal cancellation
        }
        throw error;
      }
    }, 1000);
  }

  stop() {
    this.controller.abort();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
```

---

## 11. Testing

### 11.1 Testing in JavaScript/TypeScript

```typescript
import { describe, it, expect, vi } from "vitest";

// Basic async test
describe("UserService", () => {
  it("should fetch user profile", async () => {
    const service = new UserService(mockRepo);
    const profile = await service.getUserProfile("user-123");

    expect(profile.user.id).toBe("user-123");
    expect(profile.orders).toHaveLength(3);
  });

  // Error case
  it("should throw on missing user", async () => {
    const service = new UserService(emptyRepo);

    await expect(
      service.getUserProfile("nonexistent")
    ).rejects.toThrow("User not found");
  });

  // Timeout test
  it("should timeout after 5 seconds", async () => {
    vi.useFakeTimers();

    const promise = fetchWithTimeout("/api/slow", 5000);

    // Advance time
    vi.advanceTimersByTime(5000);

    await expect(promise).rejects.toThrow("Timeout");

    vi.useRealTimers();
  });

  // Concurrent execution test
  it("should fetch in parallel", async () => {
    const startTime = Date.now();
    const callOrder: string[] = [];

    const mockFetchA = async () => {
      callOrder.push("A-start");
      await new Promise(r => setTimeout(r, 100));
      callOrder.push("A-end");
      return "A";
    };

    const mockFetchB = async () => {
      callOrder.push("B-start");
      await new Promise(r => setTimeout(r, 100));
      callOrder.push("B-end");
      return "B";
    };

    const [a, b] = await Promise.all([mockFetchA(), mockFetchB()]);

    expect(a).toBe("A");
    expect(b).toBe("B");
    // Verify concurrent execution: both start first
    expect(callOrder[0]).toBe("A-start");
    expect(callOrder[1]).toBe("B-start");
  });

  // Retry test
  it("should retry on failure", async () => {
    let attempts = 0;
    const unreliable = async () => {
      attempts++;
      if (attempts < 3) throw new Error("Temporary failure");
      return "success";
    };

    const result = await withRetry(unreliable, { maxRetries: 3, baseDelay: 10 });
    expect(result).toBe("success");
    expect(attempts).toBe(3);
  });

  // AbortController test
  it("should cancel on abort", async () => {
    const controller = new AbortController();

    const promise = fetchWithCancel("/api/data", controller.signal);
    controller.abort();

    await expect(promise).rejects.toThrow("AbortError");
  });
});
```

### 11.2 Testing in Python

```python
import pytest
import asyncio
from unittest.mock import AsyncMock, patch

# Using pytest-asyncio
@pytest.mark.asyncio
async def test_get_user_profile():
    mock_repo = AsyncMock()
    mock_repo.find_by_id.return_value = {"id": "123", "name": "Alice"}

    service = UserService(mock_repo)
    profile = await service.get_user_profile("123")

    assert profile["user"]["name"] == "Alice"
    mock_repo.find_by_id.assert_awaited_once_with("123")

@pytest.mark.asyncio
async def test_timeout():
    async def slow_operation():
        await asyncio.sleep(10)
        return "done"

    with pytest.raises(asyncio.TimeoutError):
        await asyncio.wait_for(slow_operation(), timeout=0.1)

@pytest.mark.asyncio
async def test_concurrent_execution():
    results = []

    async def task(name: str, delay: float):
        results.append(f"{name}-start")
        await asyncio.sleep(delay)
        results.append(f"{name}-end")
        return name

    a, b = await asyncio.gather(
        task("A", 0.1),
        task("B", 0.1),
    )

    assert a == "A"
    assert b == "B"
    assert results[0] == "A-start"
    assert results[1] == "B-start"

@pytest.mark.asyncio
async def test_task_cancellation():
    cancelled = False

    async def cancellable():
        nonlocal cancelled
        try:
            await asyncio.sleep(10)
        except asyncio.CancelledError:
            cancelled = True
            raise

    task = asyncio.create_task(cancellable())
    await asyncio.sleep(0.01)
    task.cancel()

    with pytest.raises(asyncio.CancelledError):
        await task

    assert cancelled is True
```

### 11.3 Testing in Rust

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use tokio;

    #[tokio::test]
    async fn test_get_user_profile() {
        let repo = MockUserRepo::new();
        repo.expect_find_by_id()
            .returning(|_| Ok(User { id: "123".into(), name: "Alice".into() }));

        let profile = get_user_profile(&repo, "123").await.unwrap();
        assert_eq!(profile.user.name, "Alice");
    }

    #[tokio::test]
    async fn test_timeout() {
        let result = tokio::time::timeout(
            Duration::from_millis(100),
            async {
                tokio::time::sleep(Duration::from_secs(10)).await;
                "done"
            }
        ).await;

        assert!(result.is_err()); // Elapsed error
    }

    #[tokio::test]
    async fn test_concurrent_tasks() {
        let (a, b) = tokio::join!(
            async { 1 + 1 },
            async { 2 + 2 },
        );

        assert_eq!(a, 2);
        assert_eq!(b, 4);
    }

    #[tokio::test]
    async fn test_cancellation() {
        let handle = tokio::spawn(async {
            tokio::time::sleep(Duration::from_secs(100)).await;
            42
        });

        handle.abort();
        let result = handle.await;
        assert!(result.unwrap_err().is_cancelled());
    }
}
```

---

## 12. Debugging Techniques

### 12.1 AsyncLocalStorage (Node.js)

```typescript
import { AsyncLocalStorage } from "node:async_hooks";

// Request tracking
const requestContext = new AsyncLocalStorage<{
  requestId: string;
  startTime: number;
}>();

// Set context in middleware
app.use((req, res, next) => {
  const context = {
    requestId: crypto.randomUUID(),
    startTime: Date.now(),
  };
  requestContext.run(context, next);
});

// Access context from anywhere
async function processOrder(orderId: string) {
  const ctx = requestContext.getStore()!;
  logger.info(`[${ctx.requestId}] Processing order ${orderId}`);

  const result = await orderService.process(orderId);

  logger.info(
    `[${ctx.requestId}] Order processed in ${Date.now() - ctx.startTime}ms`
  );
  return result;
}
```

### 12.2 Profiling Async Operations

```typescript
// Measuring execution time
async function withTiming<T>(
  label: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = performance.now();
  try {
    const result = await fn();
    const duration = performance.now() - start;
    console.log(`[${label}] completed in ${duration.toFixed(2)}ms`);
    return result;
  } catch (error) {
    const duration = performance.now() - start;
    console.error(`[${label}] failed after ${duration.toFixed(2)}ms`);
    throw error;
  }
}

// Usage
const user = await withTiming("getUser", () => getUser("123"));

// Visualizing parallel execution
async function traceParallel(
  tasks: Record<string, () => Promise<any>>
): Promise<Record<string, any>> {
  const startTime = performance.now();
  const timeline: { name: string; start: number; end: number }[] = [];

  const entries = Object.entries(tasks);
  const results = await Promise.all(
    entries.map(async ([name, fn]) => {
      const taskStart = performance.now() - startTime;
      const result = await fn();
      const taskEnd = performance.now() - startTime;
      timeline.push({ name, start: taskStart, end: taskEnd });
      return [name, result] as const;
    })
  );

  // Timeline output
  console.log("=== Execution Timeline ===");
  for (const entry of timeline.sort((a, b) => a.start - b.start)) {
    const bar = " ".repeat(Math.floor(entry.start / 10))
      + "=".repeat(Math.floor((entry.end - entry.start) / 10));
    console.log(`${entry.name.padEnd(20)} |${bar}| ${(entry.end - entry.start).toFixed(1)}ms`);
  }

  return Object.fromEntries(results);
}

// Usage
await traceParallel({
  users: () => fetchUsers(),
  orders: () => fetchOrders(),
  products: () => fetchProducts(),
});
// Output:
// === Execution Timeline ===
// users                |====      | 45.2ms
// orders               |========  | 82.1ms
// products             |=====     | 53.7ms
```

### 12.3 Detecting Unhandled Rejections

```typescript
// Global handler in Node.js
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Log the application state
  // Consider terminating the process in production
  process.exit(1);
});

// Browser
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled rejection:", event.reason);
  event.preventDefault(); // Suppress default console output
  // Send to error tracking service
  errorTracker.captureException(event.reason);
});

// Detect unhandled Promises with ESLint rules
// .eslintrc.json
// {
//   "rules": {
//     "no-floating-promises": "error",  // @typescript-eslint
//     "require-await": "warn"
//   }
// }
```

---


## FAQ

### Q1: What is the most important point in learning this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory, but by actually writing code and verifying how it works.

### Q2: What are common mistakes beginners make?

Skipping the basics and jumping to advanced topics. We recommend thoroughly understanding the fundamental concepts explained in this guide before moving on to the next step.

### Q3: How is this applied in real-world work?

Knowledge of this topic is frequently applied in day-to-day development work. It becomes especially important during code reviews and architecture design.

---

## Summary

### Cross-Language Comparison

| Language | async Syntax | Concurrent Execution | Runtime | Cancellation |
|----------|-------------|---------------------|---------|-------------|
| JS/TS | async/await | Promise.all | Event loop | AbortController |
| Python | async/await | asyncio.gather | asyncio | Task.cancel() |
| Rust | async/await | tokio::join! | tokio/async-std | tokio::select! |
| Go | goroutine | go + channel | Built-in runtime | context.Context |
| C# | async/await | Task.WhenAll | CLR | CancellationToken |
| Kotlin | suspend | coroutineScope | Dispatchers | Job.cancel() |
| Swift | async/await | async let | Swift Runtime | Task.cancel() |

### Design Guidelines

| Pattern | When to Use | Caveats |
|---------|-------------|---------|
| Sequential await | Operations with dependencies | Avoid unnecessary sequential execution |
| Promise.all | Multiple independent operations | One failure causes total failure |
| Promise.allSettled | When partial success is acceptable | Results need classification |
| Semaphore | Rate-limiting large concurrency | Prevents resource exhaustion |
| for-await-of | Stream processing | Watch out for backpressure |
| DataLoader | Solving the N+1 problem | Design of the batch window |
| Circuit breaker | Calls to unstable services | State management complexity |

---

## Recommended Next Guides

---

## References
1. MDN Web Docs. "async function."
2. Python Documentation. "Coroutines and Tasks."
3. Tokio Documentation. "Tutorial."
4. Kotlin Documentation. "Coroutines Guide."
5. Swift Documentation. "Concurrency."
6. C# Documentation. "Asynchronous programming with async and await."
7. Go Blog. "Go Concurrency Patterns."
8. Node.js Documentation. "Async Hooks."



===== SOURCE: 02-programming/async-and-error-handling/docs/01-async-patterns/03-reactive-streams.md =====

# Reactive Streams

> Reactive Streams is a pattern for declaratively processing "asynchronous data streams." Understand the foundations of RxJS Observables, backpressure, and event-driven architecture.

## What You Will Learn

- [ ] Understand how the Observable pattern works
- [ ] Grasp RxJS operators and pipelines
- [ ] Learn the concept of backpressure
- [ ] Understand the types and use cases of Subjects
- [ ] Master reactive patterns in Angular and React
- [ ] Acquire testing and debugging techniques


## Prerequisites

Before reading this guide, having the following knowledge will deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts
- Familiarity with the content of [async/await](./02-async-await.md)

---

## 1. Promise vs Observable

```
Promise:
  -> Single value (resolves only once)
  -> Execution starts upon creation (eager)
  -> Cannot be cancelled

Observable:
  -> Multiple values (a stream that flows over time)
  -> Execution starts upon subscription (lazy)
  -> Can be cancelled (unsubscribe)

  Promise:    ──────●              (single value)
  Observable: ──●──●──●──●──│     (multiple values, with completion)
              ──●──●──✗              (terminated by error)

Use cases:
  Promise: API calls, DB queries (single result)
  Observable: WebSocket, user input, timers (continuous events)
```

### 1.1 Observable Lifecycle

```
Observable Lifecycle:

  Creation
    │
    ▼
  Subscription  ← subscribe() call
    │
    ▼
  Emission
    │  next(value)  ──→ Observer's next callback
    │  next(value)  ──→ Observer's next callback
    │  ...
    │
    ├── complete()  ──→ Observer's complete callback ──→ End
    │
    └── error(err)  ──→ Observer's error callback ──→ End

  Unsubscription  ← unsubscribe() call
    │
    ▼
  Teardown  ← Execution of teardown logic
```

### 1.2 Hot Observable vs Cold Observable

```
Cold Observable:
  -> A new data stream is created each time it is subscribed to
  -> Each subscriber receives an independent stream
  -> Examples: HTTP requests, file reads

  Subscriber A: ──1──2──3──4──│
  Subscriber B:    ──1──2──3──4──│  (independent stream)

Hot Observable:
  -> The data source continues emitting values regardless of subscriptions
  -> Subscribing mid-stream means past values are not received
  -> Examples: WebSocket, mouse events, stock price feeds

  Source:       ──1──2──3──4──5──6──│
  Subscriber A: ──1──2──3──4──5──6──│  (subscribed from the start)
  Subscriber B:       ──3──4──5──6──│  (subscribed mid-stream)
```

```typescript
// Cold Observable example
const cold$ = new Observable(subscriber => {
  // New random value each time it is subscribed to
  subscriber.next(Math.random());
  subscriber.complete();
});

cold$.subscribe(v => console.log('A:', v)); // A: 0.123...
cold$.subscribe(v => console.log('B:', v)); // B: 0.456... (different value)

// Hot Observable example (using Subject)
const hot$ = new Subject<number>();

hot$.subscribe(v => console.log('A:', v));
hot$.next(1); // A: 1
hot$.next(2); // A: 2

hot$.subscribe(v => console.log('B:', v));
hot$.next(3); // A: 3, B: 3 (B only receives values from 3 onward)
```

---

## 2. RxJS Basics

```typescript
import { Observable, of, from, interval, fromEvent } from 'rxjs';
import { map, filter, take, debounceTime, switchMap } from 'rxjs/operators';

// Creating Observables
const numbers$ = of(1, 2, 3, 4, 5);
const array$ = from([10, 20, 30]);
const timer$ = interval(1000); // 0, 1, 2, ... every second

// Pipeline (operator chain)
numbers$.pipe(
  filter(n => n % 2 === 0),  // Even numbers only
  map(n => n * 10),          // Multiply by 10
).subscribe(value => console.log(value)); // 20, 40

// Practical search box example
const searchInput = document.getElementById('search');
fromEvent(searchInput, 'input').pipe(
  debounceTime(300),                           // Wait for 300ms of inactivity
  map(event => (event.target as HTMLInputElement).value),
  filter(query => query.length >= 2),          // At least 2 characters
  switchMap(query => fetch(`/api/search?q=${query}`).then(r => r.json())),
  // switchMap: cancels the previous request when a new value arrives
).subscribe(results => {
  renderSearchResults(results);
});
```

### 2.1 Ways to Create Observables

```typescript
import {
  Observable, of, from, interval, timer, fromEvent,
  defer, range, EMPTY, NEVER, throwError,
  generate, iif
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

// 1. Custom Observable
const custom$ = new Observable<number>(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);

  // Teardown logic (executed on unsubscription)
  return () => {
    console.log('Cleanup processing');
  };
});

// 2. Static creation functions
const values$ = of('a', 'b', 'c');                    // Synchronously emits 3 values
const arr$ = from([1, 2, 3]);                          // Observable from array
const promise$ = from(fetch('/api/data'));              // Observable from Promise
const iter$ = from(new Map([['a', 1], ['b', 2]]));    // Observable from Iterable

// 3. Timer-based
const interval$ = interval(1000);                       // 0, 1, 2, ... (1-second intervals)
const timerOnce$ = timer(3000);                         // Emits 0 after 3 seconds
const timerRepeat$ = timer(0, 1000);                    // Starts immediately, 1-second intervals

// 4. Event-based
const clicks$ = fromEvent(document, 'click');
const resize$ = fromEvent(window, 'resize');
const keydown$ = fromEvent<KeyboardEvent>(document, 'keydown');

// 5. AJAX
const data$ = ajax.getJSON('/api/users');
const post$ = ajax({
  url: '/api/users',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: { name: 'Tanaka', email: 'tanaka@example.com' },
});

// 6. Conditional branching
const source$ = iif(
  () => Math.random() > 0.5,
  of('heads'),
  of('tails'),
);

// 7. Deferred creation (Observable is created only at subscription time)
const deferred$ = defer(() => {
  const timestamp = Date.now();
  return of(timestamp);
});

// 8. Generator-style
const fib$ = generate(
  [0, 1],                           // Initial value
  ([a, b]) => a < 100,              // Condition
  ([a, b]) => [b, a + b] as [number, number],  // Update
  ([a, b]) => a,                     // Result selector
);
// -> 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
```

### 2.2 Observer Pattern Details

```typescript
// Observer interface
interface Observer<T> {
  next: (value: T) => void;
  error: (err: any) => void;
  complete: () => void;
}

// Passing a complete Observer
const subscription = numbers$.subscribe({
  next: value => console.log('Value:', value),
  error: err => console.error('Error:', err),
  complete: () => console.log('Complete'),
});

// Partial Observer (optional callbacks)
numbers$.subscribe(
  value => console.log(value),          // next only
);

numbers$.subscribe({
  next: value => console.log(value),
  error: err => console.error(err),     // complete omitted
});

// Subscription management
const sub = interval(1000).subscribe(v => console.log(v));

// Unsubscribe after 5 seconds
setTimeout(() => {
  sub.unsubscribe(); // Release resources
  console.log('Unsubscribed');
}, 5000);

// Managing multiple Subscriptions together
import { Subscription } from 'rxjs';

const parentSub = new Subscription();

parentSub.add(interval(1000).subscribe(v => console.log('A:', v)));
parentSub.add(interval(2000).subscribe(v => console.log('B:', v)));
parentSub.add(interval(3000).subscribe(v => console.log('C:', v)));

// Unsubscribe all at once
setTimeout(() => parentSub.unsubscribe(), 10000);
```

---

## 3. Key Operators

```
Transformation:
  map       — Transform values
  switchMap — Switch to a new Observable (cancels previous)
  mergeMap  — Execute Observables concurrently
  concatMap — Execute Observables sequentially
  exhaustMap — Ignore new Observables until the current one completes
  scan      — Calculate accumulated values (streaming version of reduce)
  pluck     — Extract a specific property from objects
  pairwise  — Pair the previous value with the current value

Filtering:
  filter       — Pass only values that match a condition
  take         — Take only the first N items
  takeUntil    — Take until another Observable emits
  takeWhile    — Take while the condition is true
  skip         — Skip the first N items
  debounceTime — Pass through after a period of inactivity
  throttleTime — Pass only one value per time interval
  distinctUntilChanged — Pass only when the value changes
  first        — First value (with optional condition)
  last         — Last value (with optional condition)
  elementAt    — Nth value

Combination:
  merge       — Merge multiple Observables
  combineLatest — Combine the latest values from each Observable
  zip         — Combine values from each Observable one-to-one
  forkJoin    — Get the last value from all Observables (similar to Promise.all)
  concat      — Concatenate sequentially (next starts after previous completes)
  race        — Adopt the Observable that emits first
  withLatestFrom — Attach the latest value from other streams when the main stream emits

Error:
  catchError  — Handle and recover from errors
  retry       — Retry on error
  retryWhen   — Conditional retry (deprecated in RxJS 7, merged into retry)

Utility:
  tap         — Side effects (debugging, logging)
  delay       — Delay value emission
  timeout     — Error if no value arrives within a specified time
  finalize    — Cleanup on completion/error/unsubscription
  share       — Convert Cold to Hot (multicast)
  shareReplay — Replay the latest N values
```

### 3.1 Transformation Operator Details

```typescript
import {
  of, from, interval, fromEvent, timer
} from 'rxjs';
import {
  map, switchMap, mergeMap, concatMap, exhaustMap,
  scan, pairwise, bufferTime, groupBy, toArray
} from 'rxjs/operators';

// === switchMap: Latest request only (search, autocomplete) ===
const search$ = fromEvent<Event>(searchInput, 'input').pipe(
  debounceTime(300),
  map(e => (e.target as HTMLInputElement).value),
  switchMap(query =>
    // Cancels the previous request when new input arrives
    fetch(`/api/search?q=${query}`).then(r => r.json())
  ),
);

// === mergeMap: Concurrent execution (bulk email sending, parallel file downloads) ===
const sendEmails$ = from(emailList).pipe(
  mergeMap(
    email => sendEmail(email),
    5,  // Limit max concurrency to 5
  ),
);

// === concatMap: Sequential execution (when order guarantee is required) ===
const uploadFiles$ = from(files).pipe(
  concatMap(file =>
    // Upload one at a time in order (next starts after previous completes)
    uploadFile(file)
  ),
);

// === exhaustMap: Preventing double submission (form submit button) ===
const submitForm$ = fromEvent(submitBtn, 'click').pipe(
  exhaustMap(() =>
    // Ignore new clicks while a request is in progress
    fetch('/api/submit', { method: 'POST', body: formData })
      .then(r => r.json())
  ),
);

// === scan: Accumulated computation (state management) ===
const actions$ = new Subject<{ type: string; payload: any }>();
const state$ = actions$.pipe(
  scan((state, action) => {
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, count: state.count + 1 };
      case 'DECREMENT':
        return { ...state, count: state.count - 1 };
      case 'SET_NAME':
        return { ...state, name: action.payload };
      default:
        return state;
    }
  }, { count: 0, name: '' }),
);

// === pairwise: Compare with the previous value ===
const scrollPosition$ = fromEvent(window, 'scroll').pipe(
  map(() => window.scrollY),
  pairwise(),
  map(([prev, curr]) => ({
    direction: curr > prev ? 'down' : 'up',
    delta: Math.abs(curr - prev),
  })),
);

// === bufferTime: Batch processing at regular intervals ===
const events$ = fromEvent(document, 'mousemove').pipe(
  bufferTime(1000),  // Emit as an array of events every second
  filter(events => events.length > 0),
  map(events => ({
    count: events.length,
    avgX: events.reduce((sum, e: any) => sum + e.clientX, 0) / events.length,
  })),
);

// === groupBy: Group a stream ===
interface LogEntry {
  level: 'info' | 'warn' | 'error';
  message: string;
}

const logs$ = from<LogEntry[]>([
  { level: 'info', message: 'Started' },
  { level: 'error', message: 'Failed' },
  { level: 'info', message: 'Processing' },
  { level: 'warn', message: 'Slow query' },
  { level: 'error', message: 'Timeout' },
]);

logs$.pipe(
  groupBy(log => log.level),
  mergeMap(group$ =>
    group$.pipe(
      toArray(),
      map(entries => ({ level: group$.key, entries })),
    )
  ),
).subscribe(group => {
  console.log(`${group.level}: ${group.entries.length} entries`);
});
```

### 3.2 Flattening Operator Comparison

```
switchMap vs mergeMap vs concatMap vs exhaustMap:

Input:    ──A─────B─────C──│

switchMap (latest only):
  A: ──a1──a2──(cancelled)
  B:       ──b1──b2──(cancelled)
  C:             ──c1──c2──c3──│
  Output: ──a1──a2──b1──b2──c1──c2──c3──│

mergeMap (concurrent):
  A: ──a1──a2──a3──│
  B:       ──b1──b2──b3──│
  C:             ──c1──c2──c3──│
  Output: ──a1──a2──b1──a3──b2──c1──b3──c2──c3──│

concatMap (sequential):
  A: ──a1──a2──a3──│
  B:               ──b1──b2──b3──│
  C:                             ──c1──c2──c3──│
  Output: ──a1──a2──a3──b1──b2──b3──c1──c2──c3──│

exhaustMap (ignore while in progress):
  A: ──a1──a2──a3──│
  B:  (ignored)
  C:             ──c1──c2──c3──│
  Output: ──a1──a2──a3──c1──c2──c3──│

When to use:
  switchMap  -> Search, autocomplete (only the latest is needed)
  mergeMap   -> Parallel downloads (all results needed, order doesn't matter)
  concatMap  -> Sequential file processing (order guarantee required)
  exhaustMap -> Form submission (prevent double submission)
```

### 3.3 Combination Operator Details

```typescript
import {
  merge, combineLatest, zip, forkJoin, concat, race, withLatestFrom
} from 'rxjs';

// === merge: Merging multiple streams ===
const keyboard$ = fromEvent(document, 'keydown');
const mouse$ = fromEvent(document, 'click');
const touch$ = fromEvent(document, 'touchstart');

const userActivity$ = merge(keyboard$, mouse$, touch$).pipe(
  throttleTime(1000),
  tap(() => resetIdleTimer()),
);

// === combineLatest: Combine the latest values from each stream ===
const selectedCategory$ = new BehaviorSubject<string>('all');
const searchQuery$ = new BehaviorSubject<string>('');
const sortOrder$ = new BehaviorSubject<string>('newest');

const filteredProducts$ = combineLatest([
  selectedCategory$,
  searchQuery$,
  sortOrder$,
]).pipe(
  debounceTime(100),
  switchMap(([category, query, sort]) =>
    fetch(`/api/products?category=${category}&q=${query}&sort=${sort}`)
      .then(r => r.json())
  ),
);

// === zip: Combine one-to-one ===
const names$ = of('Alice', 'Bob', 'Charlie');
const ages$ = of(25, 30, 35);
const cities$ = of('Tokyo', 'Osaka', 'Kyoto');

zip(names$, ages$, cities$).pipe(
  map(([name, age, city]) => ({ name, age, city })),
).subscribe(person => console.log(person));
// { name: 'Alice', age: 25, city: 'Tokyo' }
// { name: 'Bob', age: 30, city: 'Osaka' }
// { name: 'Charlie', age: 35, city: 'Kyoto' }

// === forkJoin: Get the last value after all complete (equivalent to Promise.all) ===
const dashboardData$ = forkJoin({
  users: ajax.getJSON('/api/users'),
  orders: ajax.getJSON('/api/orders'),
  stats: ajax.getJSON('/api/stats'),
  notifications: ajax.getJSON('/api/notifications'),
}).pipe(
  catchError(err => {
    console.error('Failed to fetch dashboard data:', err);
    return of({ users: [], orders: [], stats: null, notifications: [] });
  }),
);

// === race: Adopt the fastest stream ===
const primary$ = ajax.getJSON('https://primary-api.com/data');
const fallback$ = ajax.getJSON('https://fallback-api.com/data');

const data$ = race(primary$, fallback$); // Use whichever responds first

// === withLatestFrom: Attach the latest value from other streams when the main stream emits ===
const saveButton$ = fromEvent(saveBtn, 'click');
const formValue$ = new BehaviorSubject(getFormValues());

saveButton$.pipe(
  withLatestFrom(formValue$),
  switchMap(([_, formData]) =>
    fetch('/api/save', { method: 'POST', body: JSON.stringify(formData) })
  ),
).subscribe();
```

---

## 4. Types of Subjects

```
Types and Characteristics of Subjects:

Subject (basic):
  Cannot receive values emitted before subscription
  A subscribes -> next(1) -> next(2) -> B subscribes -> next(3)
  A: 1, 2, 3
  B:       3

BehaviorSubject (retains the latest value):
  Immediately receives the latest value upon subscription. Requires an initial value
  A subscribes(initial value 0) -> next(1) -> next(2) -> B subscribes -> next(3)
  A: 0, 1, 2, 3
  B:          2, 3

ReplaySubject (replays N past values):
  Buffers a specified number of past values and sends them to new subscribers
  A subscribes -> next(1) -> next(2) -> next(3) -> B subscribes(replay=2)
  A: 1, 2, 3
  B:          2, 3  (latest 2 values are replayed)

AsyncSubject (last value only):
  Emits only the last value at complete()
  next(1) -> next(2) -> next(3) -> complete()
  A: 3
  B: 3 (receives the last value even if subscribed after complete)
```

```typescript
import { Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';

// === BehaviorSubject: Ideal for current state management ===
interface AppState {
  user: User | null;
  theme: 'light' | 'dark';
  language: string;
}

class StateService {
  private state$ = new BehaviorSubject<AppState>({
    user: null,
    theme: 'light',
    language: 'ja',
  });

  // Get the current state (synchronous)
  get currentState(): AppState {
    return this.state$.getValue();
  }

  // Get a stream of state
  select<K extends keyof AppState>(key: K): Observable<AppState[K]> {
    return this.state$.pipe(
      map(state => state[key]),
      distinctUntilChanged(),
    );
  }

  // Update state
  update(partial: Partial<AppState>): void {
    this.state$.next({
      ...this.currentState,
      ...partial,
    });
  }
}

const stateService = new StateService();

// Watch for theme changes
stateService.select('theme').subscribe(theme => {
  document.body.className = `theme-${theme}`;
});

// Watch for user information changes
stateService.select('user').subscribe(user => {
  if (user) {
    console.log(`Welcome, ${user.name}`);
  }
});

// === ReplaySubject: Retaining event history ===
class EventBus {
  private events$ = new ReplaySubject<AppEvent>(10); // Retain the latest 10 events

  emit(event: AppEvent): void {
    this.events$.next(event);
  }

  on(type: string): Observable<AppEvent> {
    return this.events$.pipe(
      filter(event => event.type === type),
    );
  }

  // Get events including past ones
  history(): Observable<AppEvent> {
    return this.events$.asObservable();
  }
}

// === AsyncSubject: Final result upon completion ===
class ConfigLoader {
  private config$ = new AsyncSubject<Config>();

  async load(): Promise<void> {
    try {
      const config = await fetch('/api/config').then(r => r.json());
      this.config$.next(config);
      this.config$.complete(); // The last value is emitted upon complete()
    } catch (err) {
      this.config$.error(err);
    }
  }

  getConfig(): Observable<Config> {
    return this.config$.asObservable();
  }
}
```

---

## 5. Practical Example: Real-time Dashboard

```typescript
import { combineLatest, timer, Subject, BehaviorSubject } from 'rxjs';
import {
  switchMap, catchError, retry, map, share,
  distinctUntilChanged, tap, takeUntil, startWith, scan
} from 'rxjs/operators';

// === Dashboard Service ===
class DashboardService {
  private destroy$ = new Subject<void>();
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  // Stats (every 5 seconds + manual refresh)
  readonly stats$ = this.refreshTrigger$.pipe(
    switchMap(() => timer(0, 5000)),
    switchMap(() =>
      fetch('/api/stats')
        .then(r => r.json())
        .catch(() => ({ error: true }))
    ),
    retry({ count: 3, delay: 2000 }),
    catchError(() => of({ error: true, data: null })),
    share(), // Multicast (shared among multiple subscribers)
    takeUntil(this.destroy$),
  );

  // Alerts (every 10 seconds)
  readonly alerts$ = timer(0, 10000).pipe(
    switchMap(() =>
      fetch('/api/alerts')
        .then(r => r.json())
        .catch(() => [])
    ),
    catchError(() => of([])),
    share(),
    takeUntil(this.destroy$),
  );

  // Real-time updates via WebSocket
  readonly liveEvents$ = new Observable<ServerEvent>(subscriber => {
    const ws = new WebSocket('wss://api.example.com/events');

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        subscriber.next(data);
      } catch (err) {
        console.error('WebSocket parse error:', err);
      }
    };

    ws.onerror = (err) => subscriber.error(err);
    ws.onclose = () => subscriber.complete();

    return () => ws.close();
  }).pipe(
    retry({ count: 5, delay: (error, retryCount) => timer(Math.min(1000 * Math.pow(2, retryCount), 30000)) }),
    share(),
    takeUntil(this.destroy$),
  );

  // Integrated dashboard state
  readonly dashboardState$ = combineLatest([
    this.stats$.pipe(startWith(null)),
    this.alerts$.pipe(startWith([])),
    this.liveEvents$.pipe(
      scan((events: ServerEvent[], event) => [...events.slice(-50), event], []),
      startWith([]),
    ),
  ]).pipe(
    map(([stats, alerts, events]) => ({
      stats,
      alerts,
      events,
      lastUpdated: new Date(),
    })),
    distinctUntilChanged((prev, curr) =>
      JSON.stringify(prev) === JSON.stringify(curr)
    ),
  );

  refresh(): void {
    this.refreshTrigger$.next();
  }

  destroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

---

## 6. Backpressure

```
Backpressure:
  -> Control when the Producer is faster than the Consumer

  Producer: ──●●●●●●●●●●──→ Fast
  Consumer: ──●───●───●───→ Slow
                         -> Memory overflow / latency accumulation

Strategies:
  1. Buffering: Temporarily queue values (limited by memory)
  2. Dropping: Discard old values (keep only the latest)
  3. Sampling: Get the latest value at regular intervals
  4. Throttling: Pass only one value per time interval
  5. Windowing: Group by time or count

Backpressure in RxJS:
  -> bufferTime: Batch processing at time intervals
  -> bufferCount: Batch processing by count
  -> throttleTime: Pass values at regular intervals
  -> sampleTime: Get the latest value at regular intervals
  -> auditTime: Pass the latest value after a specified time from when a value arrives
  -> debounceTime: Pass the latest value after waiting a specified time from when a value arrives
  -> window/windowTime: Group by time windows
```

### 6.1 Practical Backpressure Examples

```typescript
import {
  fromEvent, interval, Subject
} from 'rxjs';
import {
  bufferTime, bufferCount, throttleTime, sampleTime,
  auditTime, debounceTime, windowTime, mergeAll,
  tap, filter, map, scan
} from 'rxjs/operators';

// === Throttling mouse movement ===
const mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');

// throttleTime: Pass the first value, ignore for the specified duration
mouseMove$.pipe(
  throttleTime(16), // ~60fps
  map(e => ({ x: e.clientX, y: e.clientY })),
).subscribe(pos => updateCursor(pos));

// sampleTime: Get the latest value at regular intervals
mouseMove$.pipe(
  sampleTime(100), // Latest position every 100ms
  map(e => ({ x: e.clientX, y: e.clientY })),
).subscribe(pos => sendAnalytics(pos));

// auditTime: Pass the latest value after a specified time from when a value arrives
mouseMove$.pipe(
  auditTime(200),
).subscribe(e => updateTooltip(e));

// === Batch log sending ===
const logStream$ = new Subject<LogEntry>();

// Batch send every 100 entries or every 5 seconds
logStream$.pipe(
  bufferTime(5000, undefined, 100), // 5 seconds or 100 entries
  filter(batch => batch.length > 0),
).subscribe(async batch => {
  await fetch('/api/logs', {
    method: 'POST',
    body: JSON.stringify(batch),
  });
});

// === Metrics aggregation with windows ===
const requestStream$ = new Subject<{ endpoint: string; duration: number }>();

requestStream$.pipe(
  windowTime(60000), // 1-minute window
  mergeAll(),
  scan((acc, req) => ({
    count: acc.count + 1,
    totalDuration: acc.totalDuration + req.duration,
    maxDuration: Math.max(acc.maxDuration, req.duration),
  }), { count: 0, totalDuration: 0, maxDuration: 0 }),
).subscribe(metrics => {
  console.log(`Requests/min: ${metrics.count}`);
  console.log(`Avg duration: ${metrics.totalDuration / metrics.count}ms`);
  console.log(`Max duration: ${metrics.maxDuration}ms`);
});

// === Difference between debounceTime and throttleTime ===
//
// debounceTime(300):
//   Input:  ──a─b─c───────d─e──────│
//   Output: ──────────c─────────e──│
//   -> Emits after input settles down (ideal for search)
//
// throttleTime(300):
//   Input:  ──a─b─c───────d─e──────│
//   Output: ──a───────────d────────│
//   -> Passes the first value immediately, then waits (ideal for scroll)
//
// auditTime(300):
//   Input:  ──a─b─c───────d─e──────│
//   Output: ──────c───────────e────│
//   -> Passes the latest value after a specified time from when a value arrives
//
// sampleTime(300):
//   Input:  ──a─b─c───────d─e──────│
//   Output: ──b─────c──────e───────│
//   -> Samples the latest value at regular intervals
```

---

## 7. Error Handling

```typescript
import { of, throwError, timer, EMPTY, Observable } from 'rxjs';
import {
  catchError, retry, retryWhen, delay, take,
  tap, finalize, timeout, switchMap
} from 'rxjs/operators';

// === Basic error handling ===
const data$ = ajax.getJSON('/api/data').pipe(
  catchError(err => {
    console.error('API error:', err);
    return of({ fallback: true, data: [] }); // Fallback value
  }),
);

// === Retry strategies ===
// Simple retry
const withRetry$ = ajax.getJSON('/api/unstable').pipe(
  retry(3), // Retry 3 times (4 total attempts)
  catchError(err => {
    console.error('All retries failed:', err);
    return EMPTY;
  }),
);

// Retry with exponential backoff (RxJS 7+)
const withBackoff$ = ajax.getJSON('/api/unstable').pipe(
  retry({
    count: 5,
    delay: (error, retryCount) => {
      const delayMs = Math.min(1000 * Math.pow(2, retryCount - 1), 30000);
      console.log(`Retry ${retryCount}: after ${delayMs}ms`);
      return timer(delayMs);
    },
    resetOnSuccess: true,
  }),
  catchError(err => {
    notifyUser('Unable to connect to the service');
    return EMPTY;
  }),
);

// === Conditional retry ===
const smartRetry$ = ajax('/api/data').pipe(
  retry({
    count: 3,
    delay: (error, retryCount) => {
      // Do not retry 4xx errors
      if (error.status >= 400 && error.status < 500) {
        return throwError(() => error);
      }
      // Retry only 5xx errors
      return timer(1000 * retryCount);
    },
  }),
);

// === Timeout ===
const withTimeout$ = ajax.getJSON('/api/slow-endpoint').pipe(
  timeout({
    each: 5000, // Error if the interval between emitted values exceeds 5 seconds
    with: () => throwError(() => new Error('Request timeout')),
  }),
  catchError(err => {
    if (err.message === 'Request timeout') {
      return of({ timeout: true });
    }
    return throwError(() => err);
  }),
);

// === finalize: Cleanup ===
function loadData(): Observable<Data> {
  showLoadingSpinner();

  return ajax.getJSON<Data>('/api/data').pipe(
    retry(2),
    catchError(err => {
      showErrorNotification(err.message);
      return EMPTY;
    }),
    finalize(() => {
      hideLoadingSpinner(); // Executed regardless of success/failure/unsubscription
    }),
  );
}

// === Error classification and handling ===
class ApiService {
  request<T>(url: string): Observable<T> {
    return ajax.getJSON<T>(url).pipe(
      catchError(err => {
        switch (err.status) {
          case 401:
            this.authService.logout();
            return throwError(() => new UnauthorizedError());
          case 403:
            return throwError(() => new ForbiddenError());
          case 404:
            return throwError(() => new NotFoundError(url));
          case 429:
            // Rate limit: respect the Retry-After header
            const retryAfter = parseInt(err.response?.headers?.get('Retry-After') || '5');
            return timer(retryAfter * 1000).pipe(
              switchMap(() => this.request<T>(url)),
            );
          default:
            return throwError(() => new ApiError(err.message, err.status));
        }
      }),
    );
  }
}
```

---

## 8. Reactive Patterns in Angular

```typescript
// === Usage in Angular components ===
@Component({
  selector: 'app-user-list',
  template: `
    <input [formControl]="searchControl" placeholder="Search...">

    <div *ngIf="loading$ | async" class="spinner">Loading...</div>

    <ul>
      <li *ngFor="let user of users$ | async; trackBy: trackById">
        {{ user.name }} - {{ user.email }}
      </li>
    </ul>

    <div *ngIf="error$ | async as error" class="error">
      {{ error.message }}
    </div>
  `,
})
export class UserListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  searchControl = new FormControl('');
  loading$ = new BehaviorSubject<boolean>(false);
  error$ = new BehaviorSubject<Error | null>(null);

  users$: Observable<User[]>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.loading$.next(true);
        this.error$.next(null);
      }),
      switchMap(query =>
        this.userService.searchUsers(query).pipe(
          catchError(err => {
            this.error$.next(err);
            return of([]);
          }),
          finalize(() => this.loading$.next(false)),
        )
      ),
      takeUntil(this.destroy$),
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackById(index: number, user: User): number {
    return user.id;
  }
}

// === Caching in Angular services ===
@Injectable({ providedIn: 'root' })
export class UserService {
  private cache$ = new Map<string, Observable<User>>();

  constructor(private http: HttpClient) {}

  getUser(id: string): Observable<User> {
    if (!this.cache$.has(id)) {
      this.cache$.set(id,
        this.http.get<User>(`/api/users/${id}`).pipe(
          shareReplay({ bufferSize: 1, refCount: true }),
          // refCount: true -> Discard the cache when subscriber count reaches 0
        )
      );
    }
    return this.cache$.get(id)!;
  }

  searchUsers(query: string): Observable<User[]> {
    return this.http.get<User[]>(`/api/users`, {
      params: { q: query },
    });
  }

  // Reactive CRUD
  private refresh$ = new Subject<void>();

  users$ = this.refresh$.pipe(
    startWith(undefined),
    switchMap(() => this.http.get<User[]>('/api/users')),
    shareReplay(1),
  );

  createUser(user: CreateUserDto): Observable<User> {
    return this.http.post<User>('/api/users', user).pipe(
      tap(() => this.refresh$.next()), // Refresh after creation
    );
  }
}
```

---

## 9. Reactive Patterns in React

```typescript
import { useEffect, useState, useRef, useMemo } from 'react';
import { Subject, BehaviorSubject, Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';

// === Custom hook: useObservable ===
function useObservable<T>(observable$: Observable<T>, initialValue: T): T {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const subscription = observable$.subscribe({
      next: setValue,
      error: err => console.error('Observable error:', err),
    });
    return () => subscription.unsubscribe();
  }, [observable$]);

  return value;
}

// === Custom hook: useSubject ===
function useSubject<T>(): [Subject<T>, (value: T) => void] {
  const subjectRef = useRef<Subject<T>>();
  if (!subjectRef.current) {
    subjectRef.current = new Subject<T>();
  }

  const emit = useMemo(
    () => (value: T) => subjectRef.current!.next(value),
    [],
  );

  useEffect(() => {
    return () => subjectRef.current!.complete();
  }, []);

  return [subjectRef.current, emit];
}

// === Search component ===
function SearchComponent() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchSubject = useRef(new Subject<string>());

  useEffect(() => {
    const subscription = searchSubject.current.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        setLoading(true);
        setError(null);
      }),
      switchMap(query =>
        from(fetch(`/api/search?q=${query}`).then(r => r.json())).pipe(
          catchError(err => {
            setError(err.message);
            return of([]);
          }),
        )
      ),
      tap(() => setLoading(false)),
    ).subscribe(setResults);

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <input
        type="text"
        onChange={e => searchSubject.current.next(e.target.value)}
        placeholder="Search..."
      />
      {loading && <div className="spinner">Searching...</div>}
      {error && <div className="error">{error}</div>}
      <ul>
        {results.map(r => (
          <li key={r.id}>{r.title}</li>
        ))}
      </ul>
    </div>
  );
}

// === WebSocket hook ===
function useWebSocket<T>(url: string): {
  messages$: Observable<T>;
  send: (data: any) => void;
  status: 'connecting' | 'connected' | 'disconnected';
} {
  const [status, setStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const wsRef = useRef<WebSocket | null>(null);
  const messages$ = useMemo(() => new Subject<T>(), []);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => setStatus('connected');
    ws.onclose = () => setStatus('disconnected');
    ws.onmessage = (event) => {
      try {
        messages$.next(JSON.parse(event.data));
      } catch (err) {
        console.error('Parse error:', err);
      }
    };

    return () => {
      ws.close();
      messages$.complete();
    };
  }, [url]);

  const send = (data: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  };

  return { messages$: messages$.asObservable(), send, status };
}
```

---

## 10. Testing and Debugging

```typescript
import { TestScheduler } from 'rxjs/testing';
import { map, filter, delay, debounceTime, switchMap } from 'rxjs/operators';

// === Marble Testing ===
describe('RxJS operator tests', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // Testing the map operator
  it('multiplies values by 10', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const source$ = cold(' -a-b-c-|', { a: 1, b: 2, c: 3 });
      const expected = '     -a-b-c-|';
      const result$ = source$.pipe(map(x => x * 10));

      expectObservable(result$).toBe(expected, { a: 10, b: 20, c: 30 });
    });
  });

  // Testing the filter operator
  it('passes only even numbers', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const source$ = cold(' -a-b-c-d-|', { a: 1, b: 2, c: 3, d: 4 });
      const expected = '     ---b---d-|';
      const result$ = source$.pipe(filter(x => x % 2 === 0));

      expectObservable(result$).toBe(expected, { b: 2, d: 4 });
    });
  });

  // Testing debounceTime
  it('300ms debounce works correctly', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const source$ = cold(' -a--b-----c--|');
      const expected = '     ---- 300ms b 196ms c--|';
      // b is emitted 300ms after a, c is emitted after 300ms+ since b

      const result$ = source$.pipe(debounceTime(300));
      expectObservable(result$).toBe(expected);
    });
  });

  // Testing errors
  it('catches errors and returns a fallback value', () => {
    scheduler.run(({ cold, expectObservable }) => {
      const source$ = cold(' -a-b-#', { a: 1, b: 2 }, new Error('fail'));
      const expected = '     -a-b-(c|)';

      const result$ = source$.pipe(
        catchError(() => of(0)),
      );

      expectObservable(result$).toBe(expected, { a: 1, b: 2, c: 0 });
    });
  });
});

// === Marble Syntax Reference ===
// -  : 1 frame (10ms in virtual time)
// a  : Value emission (values are defined in object literals)
// |  : complete
// #  : error
// ^  : subscribe point (used in hot observables)
// !  : unsubscribe point
// () : Synchronous group (emitting multiple values in the same frame)

// === Debugging with tap ===
const debuggedStream$ = source$.pipe(
  tap({
    next: val => console.log('[DEBUG] next:', val),
    error: err => console.error('[DEBUG] error:', err),
    complete: () => console.log('[DEBUG] complete'),
    subscribe: () => console.log('[DEBUG] subscribe'),
    unsubscribe: () => console.log('[DEBUG] unsubscribe'),
    finalize: () => console.log('[DEBUG] finalize'),
  }),
  map(transform),
  tap(val => console.log('[DEBUG] after map:', val)),
);
```

---

## 11. Reactive Streams Specification (Java/Kotlin)

```
Reactive Streams Specification (JVM):

  Publisher<T>
    └── subscribe(Subscriber<T>)

  Subscriber<T>
    ├── onSubscribe(Subscription)
    ├── onNext(T)
    ├── onError(Throwable)
    └── onComplete()

  Subscription
    ├── request(long n)    ← The core of backpressure
    └── cancel()

  Processor<T, R>
    └── Publisher<R> + Subscriber<T>

Implementation libraries:
  -> Project Reactor (Spring WebFlux)
  -> RxJava 3
  -> Akka Streams
  -> Kotlin Coroutines Flow
```

```kotlin
// Kotlin Flow example (lightweight version of Reactive Streams)
import kotlinx.coroutines.flow.*

// Creating a Flow
fun fibonacci(): Flow<Long> = flow {
    var a = 0L
    var b = 1L
    while (true) {
        emit(a)
        val temp = a + b
        a = b
        b = temp
    }
}

// Usage
suspend fun main() {
    fibonacci()
        .take(10)
        .filter { it % 2 == 0L }
        .map { it * it }
        .collect { println(it) }
}

// StateFlow (equivalent to BehaviorSubject)
class UserViewModel : ViewModel() {
    private val _state = MutableStateFlow(UserState())
    val state: StateFlow<UserState> = _state.asStateFlow()

    fun loadUser(id: String) {
        viewModelScope.launch {
            _state.update { it.copy(loading = true) }
            try {
                val user = userRepository.getUser(id)
                _state.update { it.copy(user = user, loading = false) }
            } catch (e: Exception) {
                _state.update { it.copy(error = e.message, loading = false) }
            }
        }
    }
}

// SharedFlow (equivalent to Subject)
class EventBus {
    private val _events = MutableSharedFlow<AppEvent>(
        replay = 0,
        extraBufferCapacity = 64,
        onBufferOverflow = BufferOverflow.DROP_OLDEST,
    )
    val events: SharedFlow<AppEvent> = _events.asSharedFlow()

    suspend fun emit(event: AppEvent) {
        _events.emit(event)
    }
}
```

---

## 12. Performance Optimization

```typescript
// === Leverage multicasting with share / shareReplay ===

// BAD: Each subscribe triggers an independent HTTP request
const user$ = ajax.getJSON('/api/user/1');
user$.subscribe(u => updateHeader(u));   // Request 1
user$.subscribe(u => updateSidebar(u));  // Request 2 (wasteful)

// GOOD: Share results with shareReplay
const user$ = ajax.getJSON('/api/user/1').pipe(
  shareReplay({ bufferSize: 1, refCount: true }),
);
user$.subscribe(u => updateHeader(u));   // Request 1
user$.subscribe(u => updateSidebar(u));  // Retrieved from cache (no request)

// === Preventing memory leaks ===

// BAD: Subscribing without takeUntil
class MyComponent {
  ngOnInit() {
    interval(1000).subscribe(v => this.update(v));
    // Memory leak after component is destroyed
  }
}

// GOOD: Auto-unsubscribe with takeUntil
class MyComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    interval(1000).pipe(
      takeUntil(this.destroy$),
    ).subscribe(v => this.update(v));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// === Avoid unnecessary recomputation ===
const expensive$ = source$.pipe(
  distinctUntilChanged(), // Only when the value changes
  map(computeExpensiveResult),
  shareReplay(1),         // Share results
);

// === Scheduling with observeOn / subscribeOn ===
import { asyncScheduler, asapScheduler, animationFrameScheduler } from 'rxjs';
import { observeOn, subscribeOn } from 'rxjs/operators';

// Render on animation frame
source$.pipe(
  observeOn(animationFrameScheduler), // Synchronize with requestAnimationFrame
).subscribe(value => {
  updateUI(value); // Smooth rendering at 60fps
});
```

---

## 13. When to Use

```
Observable is appropriate:
  ✓ WebSocket message streams
  ✓ User input (search, scroll, resize)
  ✓ Real-time data (stock prices, chat)
  ✓ Combining multiple event sources
  ✓ Angular HttpClient / Forms
  ✓ Complex async orchestration
  ✓ Scenarios requiring backpressure control

Promise/async-await is appropriate:
  ✓ One-off API calls
  ✓ DB queries
  ✓ File operations
  ✓ Simple async processing
  ✓ Node.js server-side processing

Signals (Angular/Solid/Preact) are appropriate:
  ✓ UI state management
  ✓ Derived value computation
  ✓ Synchronous reactivity

Guidelines:
  -> One-off -> Promise
  -> Stream -> Observable
  -> UI state -> Signals (if available)
  -> When in doubt -> Promise (simplicity first)
```


---

## Practical Exercises

### Exercise 1: Basic Implementation

Implement code that satisfies the following requirements.

**Requirements:**
- Perform input data validation
- Implement proper error handling
- Also create test code

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
        assert False, "An exception should have been raised"
    except ValueError:
        pass

    print("All tests passed!")

test_exercise1()
```

### Exercise 2: Advanced Patterns

Extend the basic implementation and add the following features.

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
    """Efficient search using hash map"""
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
    print(f"Speedup factor: {slow_time/fast_time:.0f}x")

benchmark()
```

**Key points:**
- Be mindful of algorithmic complexity
- Choose appropriate data structures
- Measure the effect with benchmarks
---


## FAQ

### Q1: What is the most important point when learning this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory, but by actually writing code and verifying how it works.

### Q2: What are common mistakes beginners make?

Skipping the fundamentals and jumping straight to advanced topics. We recommend thoroughly understanding the basic concepts explained in this guide before moving on to the next step.

### Q3: How is this used in practice?

Knowledge of this topic is frequently applied in day-to-day development work. It becomes especially important during code reviews and architecture design.

---

## Summary

| Concept | Promise | Observable |
|---------|---------|-----------|
| Number of values | 1 | 0 to infinite |
| Execution | Eager | Lazy |
| Cancellation | Not possible | Possible |
| Operators | Limited | Rich |
| Use case | One-off I/O | Streams |
| Backpressure | None | Supported |
| Multicast | N/A | share / Subject |

| Subject | Characteristic | Initial Value | Replay |
|---------|---------------|---------------|--------|
| Subject | Basic | None | None |
| BehaviorSubject | Retains latest value | Required | 1 |
| ReplaySubject | Replays N values | None | N |
| AsyncSubject | Last value only | None | On complete |

| Operator | Use Case | Cancellation | Order Guarantee |
|----------|----------|-------------|-----------------|
| switchMap | Search | Yes | Latest only |
| mergeMap | Concurrent processing | No | Unspecified |
| concatMap | Sequential processing | No | Guaranteed |
| exhaustMap | Prevent double submission | Ignored | First only |

---

## Recommended Next Guides

---

## References
1. RxJS Documentation. rxjs.dev.
2. Reactive Streams Specification. reactive-streams.org.
3. Ben Lesh. "RxJS: Observable, Observer, and Subscription." rxjs.dev.
4. Angular Documentation. "Observables in Angular." angular.dev.
5. Kotlin Documentation. "Asynchronous Flow." kotlinlang.org.
6. Erik Meijer. "Your Mouse is a Database." ACM Queue, 2012.



===== SOURCE: 02-programming/async-and-error-handling/docs/02-error-handling/00-exceptions.md =====

# Exception Handling

> Exceptions are a mechanism for representing "abnormal situations that cannot be handled through normal control flow." Understand the proper usage of try/catch/finally, exception hierarchy design, and the checked vs unchecked debate.

## What You Will Learn

- [ ] Understand the mechanism of exception handling and call stack unwinding
- [ ] Grasp the difference between proper use and abuse of exceptions
- [ ] Learn the differences in exception models across languages
- [ ] Master correct patterns and anti-patterns for try/catch/finally
- [ ] Understand the concept of Exception Safety
- [ ] Learn about performance impact and optimal usage decisions


## Prerequisites

Before reading this guide, having the following knowledge will deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts

---

## 1. Fundamentals of Exception Handling

### 1.1 What Are Exceptions?

Exceptions are a mechanism for expressing abnormal situations that cannot be handled through a program's normal execution flow. When an exception occurs, normal control flow (sequential execution, conditional branching, loops) is interrupted, and the call stack is unwound while searching for an appropriate handler.

```
Basic flow of exception handling:

  1. Exception occurrence (throw / raise)
     -> A function declares "I cannot handle this situation"

  2. Call stack unwinding (Stack Unwinding)
     -> Traverses back up the call stack until a catch/except is found
     -> All intermediate functions are skipped

  3. Exception capture (catch / except)
     -> An appropriate handler processes the exception

  4. Cleanup (finally / defer / with)
     -> Guarantees resource release

A world without exception handling:
  -> Every function must return an error code
  -> Callers must check for errors every time
  -> Error handling code buries the actual logic
  -> C's errno approach is exactly this

A world with exception handling:
  -> Normal-path code and error-path code can be separated
  -> Errors propagate automatically (no explicit passing needed)
  -> They can be handled collectively where they can be addressed
```

### 1.2 History of Exceptions

```
Evolution of exception handling:

  1960s: PL/I ON condition handling
    -> The first structured exception handling

  1985: Exceptions introduced in C++
    -> The prototype of try/catch/throw

  1995: Java's checked exceptions
    -> Compiler-enforced error handling

  2000s: C#, Python, Ruby unchecked exceptions
    -> A reaction against checked exceptions

  2010s: Go's multiple return values, Rust's Result<T, E>
    -> The rise of error handling without exceptions

  2020s: TypeScript's Effect, Rust's ? operator
    -> Refinement of type-safe error handling
```

---

## 2. try/catch/finally

### 2.1 Basic Pattern in TypeScript

```typescript
// TypeScript: Basic exception handling
async function fetchUserData(userId: string): Promise<UserData> {
  try {
    const response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      throw new HttpError(response.status, `HTTP ${response.status}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    if (error instanceof HttpError) {
      if (error.status === 404) {
        throw new UserNotFoundError(userId);
      }
      throw new ApiError(`API error: ${error.message}`);
    }
    // Network errors, etc.
    throw new NetworkError("Network request failed");

  } finally {
    // Executed regardless of success or failure
    // Use for resource cleanup
    logger.log(`fetchUserData completed for ${userId}`);
  }
}
```

### 2.2 Exception Handling in Python

```python
# Python: Exception handling
def parse_config(path: str) -> dict:
    try:
        with open(path, 'r') as f:
            data = json.load(f)
        return data
    except FileNotFoundError:
        raise ConfigError(f"Config file not found: {path}")
    except json.JSONDecodeError as e:
        raise ConfigError(f"Invalid JSON in {path}: {e}")
    except PermissionError:
        raise ConfigError(f"Permission denied: {path}")
    finally:
        logger.info(f"Config parsing attempted for {path}")
```

### 2.3 Python's else Clause

```python
# Python-specific: try/except/else/finally
def process_file(path: str) -> ProcessResult:
    """
    The else clause is executed only when the try block completes
    without raising an exception.
    Unlike finally, it is not executed when an exception occurs.
    """
    file_handle = None
    try:
        file_handle = open(path, 'r')
        data = file_handle.read()
    except FileNotFoundError:
        logger.warning(f"File not found: {path}")
        return ProcessResult(success=False, error="File not found")
    except PermissionError:
        logger.warning(f"Permission denied: {path}")
        return ProcessResult(success=False, error="Permission denied")
    else:
        # Executed only if try succeeds
        # Exceptions raised here are NOT caught by the except blocks
        result = parse_and_validate(data)
        logger.info(f"Successfully processed: {path}")
        return ProcessResult(success=True, data=result)
    finally:
        # Executed regardless of success or failure
        if file_handle:
            file_handle.close()

# Reasons to use the else clause:
# 1. Keeps the try block minimal (avoids catching unintended exceptions)
# 2. Clearly separates "success-only" processing
# 3. Makes the code's intent explicit
```

### 2.4 Java's try-with-resources

```java
// Java: try-with-resources (auto-closing AutoCloseable)
public List<String> readLines(String path) throws IOException {
    // Resources declared in try() are automatically closed
    try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
        List<String> lines = new ArrayList<>();
        String line;
        while ((line = reader.readLine()) != null) {
            lines.add(line);
        }
        return lines;
    }
    // reader.close() is called automatically (regardless of exceptions)
}

// Managing multiple resources
public void copyFile(String src, String dst) throws IOException {
    try (
        InputStream in = new FileInputStream(src);
        OutputStream out = new FileOutputStream(dst)
    ) {
        byte[] buffer = new byte[8192];
        int bytesRead;
        while ((bytesRead = in.read(buffer)) != -1) {
            out.write(buffer, 0, bytesRead);
        }
    }
    // Both in and out are automatically closed
    // Exceptions during close() are retained as Suppressed Exceptions
}

// Retrieving Suppressed Exceptions
public void demonstrateSuppressedException() {
    try {
        try (AutoCloseableResource resource = new AutoCloseableResource()) {
            throw new RuntimeException("Main exception");
        }
        // If resource.close() also throws an exception
    } catch (Exception e) {
        System.out.println("Main: " + e.getMessage());
        for (Throwable suppressed : e.getSuppressed()) {
            System.out.println("Suppressed: " + suppressed.getMessage());
        }
    }
}
```

### 2.5 C# using Statement

```csharp
// C#: using statement (auto-disposal of IDisposable)
public async Task<string> ReadFileAsync(string path)
{
    // using declaration (C# 8.0+): auto-Dispose at end of scope
    using var stream = new FileStream(path, FileMode.Open);
    using var reader = new StreamReader(stream);
    return await reader.ReadToEndAsync();
}

// using block (traditional syntax)
public void ProcessData(string connectionString)
{
    using (var connection = new SqlConnection(connectionString))
    {
        connection.Open();
        using (var command = new SqlCommand("SELECT * FROM Users", connection))
        using (var reader = command.ExecuteReader())
        {
            while (reader.Read())
            {
                ProcessRow(reader);
            }
        }
    }
    // connection, command, reader are all auto-Disposed
}

// await using (async Dispose, C# 8.0+)
public async Task ProcessStreamAsync()
{
    await using var stream = new AsyncStream();
    await stream.WriteAsync(data);
}
```

### 2.6 Go's defer

```go
// Go: Cleanup with defer
func readConfig(path string) (*Config, error) {
    file, err := os.Open(path)
    if err != nil {
        return nil, fmt.Errorf("failed to open config: %w", err)
    }
    defer file.Close() // Always executed when the function returns

    decoder := json.NewDecoder(file)
    var config Config
    if err := decoder.Decode(&config); err != nil {
        return nil, fmt.Errorf("failed to decode config: %w", err)
    }
    return &config, nil
}

// defer executes in LIFO (last in, first out) order
func multipleDefers() {
    fmt.Println("start")
    defer fmt.Println("first defer")  // Executed 3rd
    defer fmt.Println("second defer") // Executed 2nd
    defer fmt.Println("third defer")  // Executed 1st
    fmt.Println("end")
}
// Output: start, end, third defer, second defer, first defer

// Recovering from panics with defer + recover
func safeOperation() (result string, err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("panic recovered: %v", r)
        }
    }()

    // Even if a panic occurs, it is captured by recover
    riskyOperation()
    return "success", nil
}
```

### 2.7 Rust's Drop Trait and RAII

```rust
// Rust: RAII (Resource Acquisition Is Initialization)
// Auto-cleanup with the Drop trait
struct DatabaseConnection {
    connection_string: String,
    is_open: bool,
}

impl DatabaseConnection {
    fn new(conn_str: &str) -> Result<Self, DbError> {
        // Establish connection
        Ok(DatabaseConnection {
            connection_string: conn_str.to_string(),
            is_open: true,
        })
    }

    fn query(&self, sql: &str) -> Result<Vec<Row>, DbError> {
        if !self.is_open {
            return Err(DbError::ConnectionClosed);
        }
        // Execute query
        Ok(vec![])
    }
}

impl Drop for DatabaseConnection {
    fn drop(&mut self) {
        if self.is_open {
            // Close connection (called automatically)
            println!("Connection closed: {}", self.connection_string);
            self.is_open = false;
        }
    }
}

fn process_data() -> Result<(), DbError> {
    let conn = DatabaseConnection::new("postgres://localhost/mydb")?;
    let rows = conn.query("SELECT * FROM users")?;
    // conn is automatically dropped at the end of scope
    // -> Drop::drop() is called and the connection is closed
    Ok(())
}
```

---

## 3. Call Stack Unwinding

### 3.1 How Stack Unwinding Works

```
Call stack when an exception occurs:

  main()
    └── processOrder()
        └── validatePayment()
            └── chargeCard()
                └── apiCall()  ← Exception thrown!

  Unwinding (stack unwind):
  apiCall()    -> No catch -> Propagate
  chargeCard() -> No catch -> Propagate
  validatePayment() -> catch found! -> Handle here
                     -> Or re-throw

  Principles:
  -> Catch exceptions where they can be handled
  -> If you can't handle it, don't catch it (let it propagate to a higher level)
  -> Swallowing exceptions (catch and ignore) is strictly prohibited
```

### 3.2 How to Read Stack Traces

```typescript
// Stack trace example
// Error: User not found: user-123
//     at UserService.getUser (/app/services/user.ts:45:11)
//     at OrderService.createOrder (/app/services/order.ts:23:28)
//     at OrderController.create (/app/controllers/order.ts:15:30)
//     at Layer.handle [as handle_request] (/app/node_modules/express/lib/router/layer.js:95:5)
//     at next (/app/node_modules/express/lib/router/route.js:144:13)

// How to read a stack trace:
// 1. The top line is the error message
// 2. The 2nd line is the origin of the exception (most important)
// 3. Lines further down are closer to the caller (root)
// 4. Frames inside node_modules are usually ignored

// Custom stack trace
class AppError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        // Exclude the constructor itself from the stack
        Error.captureStackTrace(this, this.constructor);
    }
}

// The top of the stack becomes the call site of the AppError constructor,
// not the constructor itself
```

### 3.3 Stack Traces in Asynchronous Code

```typescript
// The problem of stack traces being broken in async code
async function fetchUser(id: string): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) throw new Error("Fetch failed");
    return response.json();
}

// Enable async stack traces with Node.js --async-stack-traces flag
// Or build a cause chain with Error.cause

async function processUser(id: string): Promise<void> {
    try {
        const user = await fetchUser(id);
        await updateUser(user);
    } catch (error) {
        // ES2022: Build a cause chain with Error.cause
        throw new ProcessError("User processing failed", {
            cause: error,  // Retain the original error as the cause
        });
    }
}

// Traversing the cause chain
function getRootCause(error: Error): Error {
    let current = error;
    while (current.cause instanceof Error) {
        current = current.cause;
    }
    return current;
}

// Python exception chaining
// try:
//     result = parse_data(raw)
// except ParseError as e:
//     raise ProcessingError("Data processing failed") from e
//     # The original exception is stored in __cause__
```

### 3.4 Cost of Exception Propagation

```
Performance cost of exceptions:

  Entering a try block:
  -> Nearly zero cost (optimized in most runtimes)
  -> "Zero-cost exception" model (C++, Rust panics)

  Throwing an exception:
  -> Very high cost
  -> Stack trace construction: O(n) (n is stack depth)
  -> Stack unwinding: calling destructors for each frame
  -> Generally 100-1000x slower than a normal function return

  Benchmark example (approximate):
  ┌──────────────────────┬────────────────┐
  │ Operation            │ Relative Cost  │
  ├──────────────────────┼────────────────┤
  │ Function return      │ 1x             │
  │ Entering try block   │ ~1x            │
  │ Throwing exception   │ 100-1000x      │
  │ Stack trace          │ 200-2000x      │
  └──────────────────────┴────────────────┘

  Conclusion:
  -> Writing try/catch itself is not a cost issue
  -> Use exceptions only for "exceptional" situations
  -> Using exceptions for control flow inside loops is absolutely unacceptable
```

---

## 4. Using Exceptions: Appropriate Situations and Abuse

### 4.1 When to Use Exceptions

```
When exceptions should be used:
  ✓ File not found
  ✓ Network connection error
  ✓ Database connection failure
  ✓ Invalid data (validation error)
  ✓ Resource exhaustion (memory, disk)
  ✓ Configuration file inconsistency
  ✓ External service failure
  ✓ Authentication/authorization failure
  ✓ Data integrity violation
  ✓ Timeout

When exceptions should NOT be used:
  ✗ Normal control flow (can be decided with if/else)
  ✗ Expected situations (user input mistakes)
  ✗ Performance-critical code
  ✗ A collection being empty
  ✗ Search results returning 0 items
  ✗ Reaching the end of a file
```

### 4.2 Anti-pattern: Control Flow via Exceptions

```typescript
// BAD: Control flow via exceptions (anti-pattern)
function findUserByEmail(email: string): User | null {
    try {
        const user = db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (!user) throw new Error("Not found");
        return user;
    } catch (e) {
        return null;  // "Not found" is not an exception
    }
}

// GOOD: Control flow via return values
function findUserByEmail(email: string): User | null {
    const user = db.query("SELECT * FROM users WHERE email = ?", [email]);
    return user ?? null;  // Return null (normal control flow)
}

// BAD: Using exceptions for control flow inside a loop (worst pattern)
function parseNumbers(inputs: string[]): number[] {
    const results: number[] = [];
    for (const input of inputs) {
        try {
            results.push(parseInt(input));
        } catch (e) {
            // Failing to parse = normal occurrence
            continue;
        }
    }
    return results;
}

// GOOD: Pre-validation
function parseNumbers(inputs: string[]): number[] {
    return inputs
        .filter(input => /^\d+$/.test(input))
        .map(input => parseInt(input, 10));
}
```

### 4.3 Anti-pattern: Pokemon Exception Handling

```typescript
// BAD: Catch everything (Pokemon: "Gotta Catch 'Em All")
async function processOrder(orderId: string): Promise<void> {
    try {
        const order = await getOrder(orderId);
        await validateOrder(order);
        await chargePayment(order);
        await sendConfirmation(order);
    } catch (error) {
        // Swallowing all exceptions!
        console.log("Something went wrong");
    }
}

// GOOD: Proper exception handling
async function processOrder(orderId: string): Promise<void> {
    try {
        const order = await getOrder(orderId);
        await validateOrder(order);
        await chargePayment(order);
        await sendConfirmation(order);
    } catch (error) {
        if (error instanceof ValidationError) {
            // Handle validation errors specifically
            await notifyUser(orderId, error.message);
            return;
        }
        if (error instanceof PaymentError) {
            // Payment errors may be retryable
            await queueForRetry(orderId);
            return;
        }
        // Propagate unexpected errors to upper levels
        throw error;
    }
}
```

### 4.4 Anti-pattern: Swallowing Exceptions

```python
# BAD: Swallowing Exception
def save_user(user):
    try:
        db.save(user)
    except Exception:
        pass  # Do nothing! Data is not saved but appears to have succeeded

# BAD: Log only and swallow
def save_user(user):
    try:
        db.save(user)
    except Exception as e:
        logger.error(f"Failed to save user: {e}")
        # The caller thinks it succeeded

# GOOD: Proper handling
def save_user(user) -> bool:
    try:
        db.save(user)
        return True
    except IntegrityError as e:
        logger.warning(f"Duplicate user: {e}")
        raise DuplicateUserError(user.email) from e
    except DatabaseError as e:
        logger.error(f"Database error: {e}")
        raise ServiceUnavailableError("Database unavailable") from e
```

### 4.5 Anti-pattern: Incorrect Re-throwing

```typescript
// BAD: Re-throw that loses information
try {
    await processPayment(order);
} catch (error) {
    throw new Error("Payment failed");  // All original error info is lost
}

// BAD: Re-throw that corrupts the stack trace
try {
    await processPayment(order);
} catch (error) {
    throw error;  // OK, but misses the opportunity to add context information
}

// GOOD: Re-throw that preserves the cause chain
try {
    await processPayment(order);
} catch (error) {
    throw new PaymentError("Payment processing failed", {
        cause: error,
        orderId: order.id,
        amount: order.total,
    });
}

// GOOD: Python exception chaining
# try:
#     process_payment(order)
# except StripeError as e:
#     raise PaymentError(f"Payment failed for order {order.id}") from e
```

---

## 5. Java: checked vs unchecked

### 5.1 Java Exception Hierarchy

```java
// Java exception hierarchy
// Throwable
// ├── Error (unrecoverable: OutOfMemoryError, StackOverflowError)
// └── Exception
//     ├── IOException (checked: enforced by compiler)
//     ├── SQLException (checked)
//     └── RuntimeException (unchecked: no compiler enforcement)
//         ├── NullPointerException
//         ├── IllegalArgumentException
//         └── IndexOutOfBoundsException

// checked exception: catch or throws declaration is mandatory
public String readFile(String path) throws IOException {
    return Files.readString(Path.of(path));
    // Must declare throws if IOException is not caught
}

// unchecked exception: no declaration needed
public void validateAge(int age) {
    if (age < 0) throw new IllegalArgumentException("Age must be >= 0");
    // No throws declaration needed
}
```

### 5.2 The Checked Exception Debate

```
The checked exception debate:

  Proponents:
  -> Prevents forgetting error handling
  -> Makes the API contract explicit
  -> Detects missing error handling at compile time

  Opponents (majority):
  -> Too much boilerplate
  -> Causes swallowing (catch and ignore)
  -> Kotlin, C#, Python, TS all use unchecked only
  -> Changes to exception specifications cascade through (throws propagation)
  -> Poor compatibility with lambda expressions

  Modern mainstream:
  -> unchecked exceptions + expressing errors with types (Result type)
```

### 5.3 Problems with Checked Exceptions (Concrete Examples)

```java
// Checked exception problem 1: Boilerplate
// Cannot use checked exceptions in lambda expressions
public List<String> readAllFiles(List<String> paths) throws IOException {
    // BAD: Compile error: checked exception in lambda
    // return paths.stream()
    //     .map(path -> Files.readString(Path.of(path))) // IOException!
    //     .collect(Collectors.toList());

    // GOOD: Workaround 1: Write try/catch inside the lambda (verbose)
    return paths.stream()
        .map(path -> {
            try {
                return Files.readString(Path.of(path));
            } catch (IOException e) {
                throw new UncheckedIOException(e);
            }
        })
        .collect(Collectors.toList());
}

// Checked exception problem 2: Cascading throws
// Low-level implementation details leak into upper-level interfaces
public interface UserRepository {
    // BAD: Implementation detail (SQL) leaks into the interface
    User findById(String id) throws SQLException;

    // GOOD: Abstracted error
    User findById(String id) throws RepositoryException;
}

// Checked exception problem 3: Encouraging swallowing
public void processData(String data) {
    try {
        riskyOperation(data);
    } catch (CheckedException e) {
        // Swallowed because it's tedious (worst pattern)
        // catch block exists solely to silence the compiler
    }
}
```

### 5.4 Kotlin's Approach

```kotlin
// Kotlin: Abolished checked exceptions
// No catch required even when calling Java's checked exceptions
fun readFile(path: String): String {
    return File(path).readText()  // IOException is treated as unchecked
}

// try can be used as an expression
val result: Int = try {
    input.toInt()
} catch (e: NumberFormatException) {
    0  // Default value
}

// runCatching (Result type-like usage)
val result: Result<Int> = runCatching {
    input.toInt()
}

result
    .onSuccess { value -> println("Parsed: $value") }
    .onFailure { error -> println("Failed: ${error.message}") }

val value: Int = result.getOrDefault(0)
val valueOrNull: Int? = result.getOrNull()
```

---

## 6. Exception Model Comparison Across Languages

### 6.1 TypeScript/JavaScript

```typescript
// TypeScript: All unchecked
// The type system cannot express exception types (no type annotation for thrown types)

// Problem of catching as any type (before TypeScript 4.0)
try {
    throw new Error("test");
} catch (error) {
    // error is unknown type (TypeScript 4.4+ useUnknownInCatchVariables)
    // Need to narrow the type
    if (error instanceof Error) {
        console.log(error.message);
    }
}

// Error types
// Error: Generic error
// TypeError: Type error
// ReferenceError: Reference to undefined variable
// RangeError: Out-of-range value
// SyntaxError: Syntax error
// URIError: URI encoding/decoding error

// Throwing non-Error objects (not recommended)
throw "An error occurred";    // BAD: string
throw 42;                     // BAD: number
throw { code: "ERR" };        // BAD: object
throw new Error("An error");  // GOOD: Error object
// Non-Error objects cannot provide stack traces
```

### 6.2 Python

```python
# Python: All unchecked + rich built-in exceptions

# Exception hierarchy
# BaseException
# ├── KeyboardInterrupt
# ├── SystemExit
# ├── GeneratorExit
# └── Exception
#     ├── StopIteration
#     ├── ArithmeticError
#     │   ├── ZeroDivisionError
#     │   └── OverflowError
#     ├── LookupError
#     │   ├── KeyError
#     │   └── IndexError
#     ├── OSError
#     │   ├── FileNotFoundError
#     │   └── PermissionError
#     ├── ValueError
#     ├── TypeError
#     └── RuntimeError

# Catching multiple exceptions simultaneously
try:
    result = process(data)
except (ValueError, TypeError) as e:
    logger.error(f"Data error: {e}")
except OSError as e:
    logger.error(f"System error: {e}")
except Exception as e:
    logger.error(f"Unexpected: {e}")
    raise  # Re-raise

# Context manager (with statement)
class DatabaseConnection:
    def __enter__(self):
        self.conn = create_connection()
        return self.conn

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is not None:
            self.conn.rollback()
            logger.error(f"Transaction rolled back: {exc_val}")
        else:
            self.conn.commit()
        self.conn.close()
        return False  # Returning True would swallow the exception

# Usage
with DatabaseConnection() as conn:
    conn.execute("INSERT INTO users ...")
    conn.execute("UPDATE accounts ...")
    # If an exception occurs -> rollback + close
    # If completes normally -> commit + close

# Python 3.11+: ExceptionGroup (multiple simultaneous exceptions)
async def fetch_all(urls: list[str]) -> list[str]:
    async with asyncio.TaskGroup() as tg:
        tasks = [tg.create_task(fetch(url)) for url in urls]
    # If multiple tasks fail simultaneously
    # an ExceptionGroup is raised

try:
    await fetch_all(urls)
except* ValueError as eg:
    # Handle only ValueError within the ExceptionGroup
    for exc in eg.exceptions:
        logger.error(f"Value error: {exc}")
except* OSError as eg:
    # Handle only OSError within the ExceptionGroup
    for exc in eg.exceptions:
        logger.error(f"OS error: {exc}")
```

### 6.3 C++ Exceptions

```cpp
// C++: Exceptions are available but performance cost is debated

#include <stdexcept>
#include <string>

// Standard exception hierarchy
// std::exception
// ├── std::logic_error
// │   ├── std::invalid_argument
// │   ├── std::out_of_range
// │   └── std::domain_error
// └── std::runtime_error
//     ├── std::overflow_error
//     ├── std::underflow_error
//     └── std::range_error

// Basic exception handling
void processFile(const std::string& path) {
    try {
        auto data = readFile(path);
        auto result = parseData(data);
        saveResult(result);
    } catch (const std::invalid_argument& e) {
        std::cerr << "Invalid argument: " << e.what() << std::endl;
    } catch (const std::runtime_error& e) {
        std::cerr << "Runtime error: " << e.what() << std::endl;
    } catch (...) {
        // Catch-all (C++ specific)
        std::cerr << "Unknown error" << std::endl;
        throw;  // Re-throw
    }
}

// noexcept specifier (C++11)
// Declares that this function does not throw exceptions
void swap(int& a, int& b) noexcept {
    int temp = a;
    a = b;
    b = temp;
}
// If an exception is thrown in a noexcept function, std::terminate() is called

// RAII pattern (Resource Acquisition Is Initialization)
class FileHandle {
    FILE* file_;
public:
    explicit FileHandle(const char* path) : file_(fopen(path, "r")) {
        if (!file_) throw std::runtime_error("Failed to open file");
    }
    ~FileHandle() {
        if (file_) fclose(file_);  // Auto-cleanup in destructor
    }
    // Copy prohibited
    FileHandle(const FileHandle&) = delete;
    FileHandle& operator=(const FileHandle&) = delete;
};
```

### 6.4 Go Error Handling (No Exceptions)

```go
// Go: Multiple return values instead of exceptions
// No exception mechanism (panic/recover exist but are rarely used)

func readConfig(path string) (*Config, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return nil, fmt.Errorf("failed to read %s: %w", path, err)
    }

    var config Config
    if err := json.Unmarshal(data, &config); err != nil {
        return nil, fmt.Errorf("failed to parse %s: %w", path, err)
    }

    return &config, nil
}

// Error wrapping and unwrapping
func processOrder(orderID string) error {
    order, err := getOrder(orderID)
    if err != nil {
        // Wrapping with %w (Go 1.13+)
        return fmt.Errorf("processOrder: get order: %w", err)
    }

    if err := validateOrder(order); err != nil {
        return fmt.Errorf("processOrder: validate: %w", err)
    }

    return nil
}

// errors.Is: Error identity check
if errors.Is(err, os.ErrNotExist) {
    fmt.Println("File does not exist")
}

// errors.As: Error type check
var pathErr *os.PathError
if errors.As(err, &pathErr) {
    fmt.Printf("Path error: %s, Op: %s\n", pathErr.Path, pathErr.Op)
}

// Go error handling debate:
// Proponents: Simple, explicit, hard to overlook
// Opponents: Repetitive if err != nil, boilerplate
```

### 6.5 Swift Error Handling

```swift
// Swift: do/try/catch + type-safe errors

// Enum conforming to the Error protocol
enum NetworkError: Error {
    case invalidURL(String)
    case timeout(seconds: Int)
    case serverError(statusCode: Int, message: String)
    case noConnection
}

// Function that throws errors (throws keyword)
func fetchData(from urlString: String) throws -> Data {
    guard let url = URL(string: urlString) else {
        throw NetworkError.invalidURL(urlString)
    }

    let (data, response) = try await URLSession.shared.data(from: url)

    if let httpResponse = response as? HTTPURLResponse,
       httpResponse.statusCode >= 400 {
        throw NetworkError.serverError(
            statusCode: httpResponse.statusCode,
            message: "Server error"
        )
    }

    return data
}

// Calling methods (3 patterns)
// 1. do/try/catch
do {
    let data = try fetchData(from: "https://api.example.com")
    process(data)
} catch NetworkError.invalidURL(let url) {
    print("Invalid URL: \(url)")
} catch NetworkError.timeout(let seconds) {
    print("Timeout after \(seconds)s")
} catch {
    print("Unknown error: \(error)")
}

// 2. try? (nil on failure)
let data = try? fetchData(from: "https://api.example.com")

// 3. try! (crash on failure)
let data = try! fetchData(from: "https://api.example.com")  // Dangerous
```

---

## 7. Designing Error Hierarchies

### 7.1 Error Hierarchy in TypeScript

```typescript
// Custom error hierarchy
class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number = 500,
    public readonly isOperational: boolean = true,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

// Authentication error
class AuthenticationError extends AppError {
  constructor(message: string = "Authentication required") {
    super(message, "AUTH_REQUIRED", 401);
  }
}

// Authorization error
class AuthorizationError extends AppError {
  constructor(message: string = "Permission denied") {
    super(message, "FORBIDDEN", 403);
  }
}

// Resource not found
class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super(`${resource} not found: ${id}`, "NOT_FOUND", 404);
  }
}

// Validation error
class ValidationError extends AppError {
  constructor(
    message: string,
    public readonly fields: Record<string, string[]>,
  ) {
    super(message, "VALIDATION_ERROR", 400);
  }
}

// Usage
function getUser(id: string): User {
  const user = db.findById(id);
  if (!user) throw new NotFoundError("User", id);
  return user;
}
```

### 7.2 Error Hierarchy Design Best Practices

```typescript
// Complete practical error hierarchy
abstract class AppError extends Error {
    abstract readonly code: string;
    abstract readonly httpStatus: number;
    readonly timestamp: string;
    readonly requestId?: string;

    constructor(
        message: string,
        public readonly isOperational: boolean = true,
        options?: { cause?: Error; requestId?: string }
    ) {
        super(message, { cause: options?.cause });
        this.name = this.constructor.name;
        this.timestamp = new Date().toISOString();
        this.requestId = options?.requestId;
        Error.captureStackTrace(this, this.constructor);
    }

    toJSON() {
        return {
            error: {
                code: this.code,
                message: this.message,
                timestamp: this.timestamp,
                ...(this.requestId && { requestId: this.requestId }),
            }
        };
    }
}

// ======== Authentication & Authorization ========
class AuthenticationError extends AppError {
    readonly code = "AUTHENTICATION_REQUIRED";
    readonly httpStatus = 401;
    constructor(message = "Authentication required", options?: { cause?: Error }) {
        super(message, true, options);
    }
}

class TokenExpiredError extends AuthenticationError {
    readonly code = "TOKEN_EXPIRED";
    constructor() {
        super("Token has expired");
    }
}

class InvalidCredentialsError extends AuthenticationError {
    readonly code = "INVALID_CREDENTIALS";
    constructor() {
        super("Invalid credentials");
    }
}

class AuthorizationError extends AppError {
    readonly code = "FORBIDDEN";
    readonly httpStatus = 403;
    constructor(
        public readonly requiredRole: string,
        public readonly actualRole: string,
    ) {
        super(`Insufficient permissions: ${requiredRole} required (current: ${actualRole})`);
    }
}

// ======== Resources ========
class NotFoundError extends AppError {
    readonly code = "NOT_FOUND";
    readonly httpStatus = 404;
    constructor(
        public readonly resourceType: string,
        public readonly resourceId: string,
    ) {
        super(`${resourceType} not found: ${resourceId}`);
    }
}

class ConflictError extends AppError {
    readonly code = "CONFLICT";
    readonly httpStatus = 409;
    constructor(message: string) {
        super(message);
    }
}

// ======== Validation ========
interface FieldError {
    field: string;
    message: string;
    value?: unknown;
}

class ValidationError extends AppError {
    readonly code = "VALIDATION_ERROR";
    readonly httpStatus = 400;
    constructor(public readonly fieldErrors: FieldError[]) {
        super(`Invalid input: ${fieldErrors.map(e => e.field).join(", ")}`);
    }

    toJSON() {
        return {
            error: {
                code: this.code,
                message: this.message,
                details: this.fieldErrors,
                timestamp: this.timestamp,
            }
        };
    }
}

// ======== External Services ========
class ExternalServiceError extends AppError {
    readonly code = "EXTERNAL_SERVICE_ERROR";
    readonly httpStatus = 502;
    constructor(
        public readonly serviceName: string,
        message: string,
        options?: { cause?: Error }
    ) {
        super(`${serviceName}: ${message}`, true, options);
    }
}

class RateLimitError extends AppError {
    readonly code = "RATE_LIMIT_EXCEEDED";
    readonly httpStatus = 429;
    constructor(
        public readonly retryAfterMs: number,
    ) {
        super(`Rate limit exceeded. Please retry after ${retryAfterMs}ms`);
    }
}

// ======== Internal Errors ========
class InternalError extends AppError {
    readonly code = "INTERNAL_ERROR";
    readonly httpStatus = 500;
    constructor(message: string, options?: { cause?: Error }) {
        super(message, false, options);  // isOperational = false
    }
}
```

### 7.3 Middleware Using Error Hierarchy

```typescript
// Express middleware for error handling
function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    // Assign request ID
    const requestId = req.headers['x-request-id'] as string || generateId();

    if (error instanceof AppError) {
        // Operational error: return appropriate response
        logger.warn({
            code: error.code,
            message: error.message,
            requestId,
            path: req.path,
            method: req.method,
        });

        res.status(error.httpStatus).json({
            ...error.toJSON(),
            error: {
                ...error.toJSON().error,
                requestId,
            }
        });
    } else {
        // Programmer error: hide internal information
        logger.error({
            message: error.message,
            stack: error.stack,
            requestId,
            path: req.path,
            method: req.method,
        });

        // Send to Sentry, etc.
        Sentry.captureException(error, {
            tags: { requestId },
            extra: { path: req.path },
        });

        res.status(500).json({
            error: {
                code: "INTERNAL_ERROR",
                message: "A server error occurred",
                requestId,
            }
        });
    }
}
```

---

## 8. Exception Safety

### 8.1 Levels of Exception Safety

```
4 levels of exception safety (originated in C++ but the concepts are language-agnostic):

  Level 0: Not exception-safe (No guarantee)
  -> Resource leaks and data corruption possible if an exception occurs
  -> Must be avoided

  Level 1: Basic guarantee
  -> No resource leaks if an exception occurs
  -> Object is valid but its content is indeterminate
  -> This is the minimum to aim for

  Level 2: Strong guarantee
  -> State is fully restored to pre-operation state if an exception occurs
  -> Equivalent to transaction rollback
  -> Costly but safe

  Level 3: No-throw guarantee
  -> Exceptions never occur
  -> Required for destructors and swap operations
```

### 8.2 Exception-safe Code Examples

```typescript
// BAD: Not exception-safe code (Level 0)
class UserService {
    async transferBalance(fromId: string, toId: string, amount: number): Promise<void> {
        const from = await this.getUser(fromId);
        from.balance -= amount;
        await this.saveUser(from);  // <- What if an exception occurs here?

        const to = await this.getUser(toId);
        to.balance += amount;
        await this.saveUser(to);  // <- from is debited, but to is not credited
        // Data inconsistency!
    }
}

// GOOD: Strong guarantee code (Level 2): Using transactions
class UserService {
    async transferBalance(fromId: string, toId: string, amount: number): Promise<void> {
        await this.db.transaction(async (tx) => {
            const from = await tx.getUser(fromId);
            const to = await tx.getUser(toId);

            if (from.balance < amount) {
                throw new InsufficientBalanceError(amount, from.balance);
            }

            from.balance -= amount;
            to.balance += amount;

            await tx.saveUser(from);
            await tx.saveUser(to);
            // tx.commit() is automatically executed at transaction end
            // tx.rollback() is automatically executed on exception
        });
    }
}

// GOOD: Strong guarantee code (Level 2): Copy-and-Swap idiom
class Configuration {
    private data: Map<string, string>;

    updateMultiple(updates: Record<string, string>): void {
        // 1. Create a copy
        const newData = new Map(this.data);

        // 2. Modify the copy (original data is untouched if an exception occurs here)
        for (const [key, value] of Object.entries(updates)) {
            if (!this.isValidKey(key)) {
                throw new ValidationError(`Invalid key: ${key}`);
            }
            newData.set(key, value);
        }

        // 3. Atomic swap (no-throw guarantee operation)
        this.data = newData;
    }
}
```

### 8.3 Proper Use of finally

```typescript
// finally best practices

// GOOD: Resource release
async function processWithLock(key: string): Promise<void> {
    const lock = await acquireLock(key);
    try {
        await doWork();
    } finally {
        await lock.release();  // Always release lock regardless of success or failure
    }
}

// GOOD: Temporary file deletion
async function processWithTempFile(): Promise<void> {
    const tempPath = await createTempFile();
    try {
        await writeToFile(tempPath, data);
        await processFile(tempPath);
    } finally {
        await fs.unlink(tempPath).catch(() => {});  // Best-effort deletion
    }
}

// BAD: Never return in finally
function badFinally(): number {
    try {
        throw new Error("error");
    } finally {
        return 42;  // BAD: The exception is swallowed and 42 is returned!
    }
}

// BAD: Never throw in finally (overwrites the original exception)
async function badFinallyThrow(): Promise<void> {
    try {
        throw new Error("original error");
    } finally {
        throw new Error("cleanup error");  // BAD: original error is lost
    }
}

// GOOD: Handle errors in finally safely
async function safeFinally(): Promise<void> {
    let resource: Resource | null = null;
    try {
        resource = await acquireResource();
        await resource.process();
    } finally {
        if (resource) {
            try {
                await resource.release();
            } catch (cleanupError) {
                logger.warn("Cleanup failed:", cleanupError);
                // Don't throw here to preserve the original exception
            }
        }
    }
}
```

---

## 9. Asynchronous Exception Handling

### 9.1 Promises and Exceptions

```typescript
// Exception handling in Promise chains
fetchUser(userId)
    .then(user => fetchOrders(user.id))
    .then(orders => calculateTotal(orders))
    .then(total => updateDashboard(total))
    .catch(error => {
        // Catches exceptions thrown anywhere in the chain
        if (error instanceof UserNotFoundError) {
            showEmptyState();
        } else if (error instanceof NetworkError) {
            showRetryButton();
        } else {
            showGenericError();
        }
    });

// Exception handling with async/await (recommended)
async function loadDashboard(userId: string): Promise<void> {
    try {
        const user = await fetchUser(userId);
        const orders = await fetchOrders(user.id);
        const total = calculateTotal(orders);
        updateDashboard(total);
    } catch (error) {
        handleDashboardError(error);
    }
}

// Exceptions with Promise.all
async function fetchMultiple(ids: string[]): Promise<User[]> {
    try {
        // If even one fails, the entire operation fails
        return await Promise.all(ids.map(id => fetchUser(id)));
    } catch (error) {
        // The exception from the first failed Promise
        throw new BatchFetchError("Some users could not be fetched", {
            cause: error,
        });
    }
}

// Handle individual errors with Promise.allSettled
async function fetchMultipleSafe(ids: string[]): Promise<{
    users: User[];
    errors: Array<{ id: string; error: Error }>;
}> {
    const results = await Promise.allSettled(
        ids.map(id => fetchUser(id).then(user => ({ id, user })))
    );

    const users: User[] = [];
    const errors: Array<{ id: string; error: Error }> = [];

    for (const result of results) {
        if (result.status === "fulfilled") {
            users.push(result.value.user);
        } else {
            errors.push({
                id: "unknown",  // Original id may not be available with allSettled
                error: result.reason,
            });
        }
    }

    return { users, errors };
}
```

### 9.2 Unhandled Promise Rejections

```typescript
// BAD: Unhandled rejection (UnhandledPromiseRejection)
async function dangerousCode(): Promise<void> {
    fetchUser("123");  // Forgot await!
    // If fetchUser rejects, nobody catches it
}

// BAD: Promise chain missing catch
someAsyncFunction().then(data => {
    process(data);
    // No .catch() -> rejection goes unhandled
});

// GOOD: Always attach await or .catch()
await someAsyncFunction().catch(error => {
    logger.error("Failed:", error);
});

// Global handlers (last resort)
// Node.js
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection:', reason);
    Sentry.captureException(reason);
    // In Node.js 15+, the process terminates
});

// Browser
window.addEventListener('unhandledrejection', (event) => {
    logger.error('Unhandled Rejection:', event.reason);
    event.preventDefault();  // Suppress browser's default error display
});
```

### 9.3 Exception Handling Patterns in Concurrent Processing

```typescript
// Pattern 1: fail-fast (abort all if one fails)
async function failFast(tasks: Array<() => Promise<void>>): Promise<void> {
    const controller = new AbortController();

    try {
        await Promise.all(
            tasks.map(async (task) => {
                if (controller.signal.aborted) return;
                try {
                    await task();
                } catch (error) {
                    controller.abort();  // Notify other tasks of cancellation
                    throw error;
                }
            })
        );
    } catch (error) {
        throw new BatchError("One or more tasks failed", { cause: error });
    }
}

// Pattern 2: best-effort (complete as many as possible)
async function bestEffort<T>(
    tasks: Array<() => Promise<T>>
): Promise<{ results: T[]; errors: Error[] }> {
    const settled = await Promise.allSettled(tasks.map(t => t()));

    const results: T[] = [];
    const errors: Error[] = [];

    for (const result of settled) {
        if (result.status === "fulfilled") {
            results.push(result.value);
        } else {
            errors.push(result.reason instanceof Error
                ? result.reason
                : new Error(String(result.reason)));
        }
    }

    return { results, errors };
}

// Pattern 3: retry-on-failure
async function withRetry<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    delayMs: number = 1000,
): Promise<T> {
    let lastError: Error;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error instanceof Error ? error : new Error(String(error));

            if (attempt < maxRetries) {
                const delay = delayMs * Math.pow(2, attempt - 1);  // Exponential backoff
                logger.warn(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    throw new RetryExhaustedError(
        `All ${maxRetries} attempts failed`,
        { cause: lastError! }
    );
}
```

---

## 10. Exception Handling in Testing

### 10.1 Testing Exceptions

```typescript
// Testing exceptions with Jest
describe("UserService", () => {
    describe("getUser", () => {
        it("throws NotFoundError for a non-existent user", async () => {
            await expect(
                userService.getUser("nonexistent-id")
            ).rejects.toThrow(NotFoundError);
        });

        it("NotFoundError has correct properties set", async () => {
            try {
                await userService.getUser("user-999");
                fail("An exception should have been thrown");
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundError);
                expect((error as NotFoundError).code).toBe("NOT_FOUND");
                expect((error as NotFoundError).httpStatus).toBe(404);
                expect(error.message).toContain("user-999");
            }
        });

        it("database errors are wrapped in InternalError", async () => {
            // Mock DB failure
            jest.spyOn(db, "findById").mockRejectedValue(
                new Error("Connection refused")
            );

            await expect(
                userService.getUser("user-1")
            ).rejects.toThrow(InternalError);
        });
    });
});

// Python: Testing exceptions with pytest
# def test_get_user_not_found():
#     with pytest.raises(NotFoundError) as exc_info:
#         user_service.get_user("nonexistent")
#
#     assert exc_info.value.code == "NOT_FOUND"
#     assert "nonexistent" in str(exc_info.value)

# def test_get_user_not_found_match():
#     with pytest.raises(NotFoundError, match="nonexistent"):
#         user_service.get_user("nonexistent")
```

### 10.2 Exception Path Testing Strategy

```typescript
// Exception testing in the test pyramid

// 1. Unit tests: Cover individual error cases thoroughly
describe("validateEmail", () => {
    it.each([
        ["", "Email address is required"],
        ["invalid", "Invalid email address format"],
        ["a@b", "Invalid email address format"],
        ["@example.com", "Invalid email address format"],
    ])("throws ValidationError for '%s': %s", (email, expectedMessage) => {
        expect(() => validateEmail(email)).toThrow(ValidationError);
        try {
            validateEmail(email);
        } catch (e) {
            expect((e as ValidationError).message).toBe(expectedMessage);
        }
    });
});

// 2. Integration tests: Verify error propagation
describe("POST /api/users", () => {
    it("returns 409 Conflict for duplicate email", async () => {
        // Create an existing user
        await createUser({ email: "test@example.com" });

        const response = await request(app)
            .post("/api/users")
            .send({ email: "test@example.com", name: "Test" });

        expect(response.status).toBe(409);
        expect(response.body.error.code).toBe("EMAIL_ALREADY_EXISTS");
    });

    it("returns 400 with details for validation errors", async () => {
        const response = await request(app)
            .post("/api/users")
            .send({});  // Empty body

        expect(response.status).toBe(400);
        expect(response.body.error.code).toBe("VALIDATION_ERROR");
        expect(response.body.error.details).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ field: "email" }),
                expect.objectContaining({ field: "name" }),
            ])
        );
    });
});
```

---

## 11. Best Practices in Practice

### 11.1 Logging and Monitoring

```typescript
// Structured error logging
interface ErrorLog {
    level: "warn" | "error" | "fatal";
    code: string;
    message: string;
    stack?: string;
    requestId?: string;
    userId?: string;
    path?: string;
    method?: string;
    duration?: number;
    metadata?: Record<string, unknown>;
}

function logError(error: Error, context: Partial<ErrorLog> = {}): void {
    const log: ErrorLog = {
        level: error instanceof AppError && error.isOperational ? "warn" : "error",
        code: error instanceof AppError ? error.code : "UNKNOWN_ERROR",
        message: error.message,
        stack: error.stack,
        ...context,
    };

    if (log.level === "error") {
        // Immediately alert for non-operational errors
        logger.error(log);
        Sentry.captureException(error, { extra: context });
        metrics.increment("app.errors.unexpected");
    } else {
        logger.warn(log);
        metrics.increment(`app.errors.operational.${log.code}`);
    }
}

// Error rate monitoring
class ErrorRateMonitor {
    private errors: Map<string, number[]> = new Map();

    record(code: string): void {
        const now = Date.now();
        const timestamps = this.errors.get(code) ?? [];
        timestamps.push(now);
        // Remove entries older than 5 minutes
        const fiveMinAgo = now - 5 * 60 * 1000;
        this.errors.set(code, timestamps.filter(t => t > fiveMinAgo));
    }

    getRate(code: string, windowMs: number = 60_000): number {
        const now = Date.now();
        const timestamps = this.errors.get(code) ?? [];
        return timestamps.filter(t => t > now - windowMs).length;
    }

    isAlerting(code: string, threshold: number = 10): boolean {
        return this.getRate(code) > threshold;
    }
}
```

### 11.2 Error Message Guidelines

```
Error message best practices:

  1. Clearly state what happened
     BAD: "Error"
     BAD: "Something went wrong"
     GOOD: "User user-123 not found"
     GOOD: "Invalid email address format: missing @"

  2. Indicate what should be done (for users)
     BAD: "Internal Server Error"
     GOOD: "The server is temporarily unavailable. Please wait and try again later"
     GOOD: "Your session has expired. Please log in again"

  3. Include context information (for developers)
     BAD: "Database error"
     GOOD: "Failed to insert user (email: test@example.com): unique constraint violation on 'users_email_key'"

  4. Be security-conscious
     BAD: "SQL syntax error: SELECT * FROM users WHERE password = '...'"
     BAD: "Authentication failed for admin@company.com"
     GOOD: "Authentication failed" (for users)
     GOOD: "Auth failed: invalid password for user_id=123" (for logs)

  5. Consider internationalization
     -> Error code (machine-readable) + message template
     -> Design to be usable as i18n keys
```

### 11.3 Error Handling Checklist

```
Error handling checklist at project start:

  [] Error hierarchy design
    -> AppError base class
    -> Domain error subclasses
    -> Error code system

  [] Global error handler
    -> Express/Fastify middleware
    -> React Error Boundary
    -> uncaughtException / unhandledRejection

  [] Logging and monitoring
    -> Structured logs (JSON)
    -> Error tracking (Sentry)
    -> Alert configuration (PagerDuty)

  [] API error responses
    -> Unified format (RFC 7807 compliant recommended)
    -> Proper HTTP status code usage
    -> Error code documentation

  [] Testing
    -> Both normal and error paths
    -> Error propagation path tests
    -> Edge case tests

  [] Documentation
    -> Error code reference
    -> Troubleshooting guide
    -> Error response examples
```

---

## 12. Performance and Trade-offs

### 12.1 Exceptions vs Result Type Performance

```typescript
// Performance comparison: Exceptions vs Result type

// BAD: Using exceptions in performance-critical code
function parseIntWithException(s: string): number {
    const n = Number(s);
    if (isNaN(n)) throw new Error(`Invalid number: ${s}`);
    return n;
}

// 100,000 calls (50% failure): ~500ms
// -> Stack trace construction on exception throw is expensive

// GOOD: Using Result type for performance-critical code
function parseIntWithResult(s: string): { ok: true; value: number } | { ok: false; error: string } {
    const n = Number(s);
    if (isNaN(n)) return { ok: false, error: `Invalid number: ${s}` };
    return { ok: true, value: n };
}

// 100,000 calls (50% failure): ~5ms
// -> Same cost as a normal function return

// Conclusion:
// -> Operations that frequently fail (validation, parsing) -> Result type
// -> Operations that rarely fail (I/O, network) -> Exceptions are fine
// -> The cost of exceptions is only at "throw time". try blocks themselves are free
```

### 12.2 Stack Trace Control

```typescript
// Omitting stack traces (performance optimization)
class LightweightError extends Error {
    constructor(message: string, public readonly code: string) {
        super(message);
        this.name = this.constructor.name;
        // Omit stack trace (improves performance)
        // However, use with caution as it makes debugging difficult
    }
}

// V8: Limit stack depth with Error.stackTraceLimit
Error.stackTraceLimit = 10;  // Default is 10 (Node.js)

// Conditional stack trace
class ConfigurableError extends Error {
    constructor(message: string, options?: { includeStack?: boolean }) {
        super(message);
        if (options?.includeStack === false) {
            this.stack = `${this.name}: ${this.message}`;
        }
    }
}
```

---


## FAQ

### Q1: What is the most important point when learning this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory, but by actually writing code and verifying how it works.

### Q2: What are common mistakes beginners make?

Skipping the fundamentals and jumping straight to advanced topics. We recommend thoroughly understanding the basic concepts explained in this guide before moving on to the next step.

### Q3: How is this used in practice?

Knowledge of this topic is frequently applied in day-to-day development work. It becomes especially important during code reviews and architecture design.

---

## Summary

| Concept | Key Point |
|---------|-----------|
| try/catch | Catch and handle exceptions |
| finally | Cleanup that always executes |
| Propagation | Catch where you can handle it |
| checked vs unchecked | Modern approach: unchecked + Result type |
| Custom errors | Design a hierarchy and codify |
| Exception safety | Basic guarantee as minimum, strong guarantee recommended |
| Async exceptions | Don't forget to handle Promise rejections |
| Performance | try is free, throw is expensive |
| Testing | Cover both normal and error paths |
| Logging | Structured logs + error tracking |

---

## Recommended Next Guides

---

## References
1. Bloch, J. "Effective Java." Items 69-77, 2018.
2. Sutter, H. "When and How to Use Exceptions." 2004.
3. Abramov, D. "Error Handling in React 16." React Blog, 2017.
4. Goldberg, J. "Error Handling in Node.js." joyent.com, 2014.
5. The Rust Programming Language. "Error Handling."
6. Go Blog. "Error handling and Go." 2011.
7. Python Documentation. "Errors and Exceptions."
8. Stroustrup, B. "The C++ Programming Language." 4th Edition, 2013.
9. Apple Developer Documentation. "Error Handling." Swift Documentation.
10. Node.js Documentation. "Errors."



===== SOURCE: 02-programming/async-and-error-handling/docs/02-error-handling/01-result-type.md =====

# Result Type

> The Result type is a technique for expressing "success or failure" through the type system. It handles errors explicitly without exceptions, allowing the compiler to detect "forgotten error handling." This guide compares implementations in Rust, Go, and TypeScript.

## What You Will Learn in This Chapter

- [ ] Understand the mechanism of the Result type and how it differs from exceptions
- [ ] Learn Result type implementations in each language
- [ ] Study the advantages and disadvantages of the Result type
- [ ] Understand monadic chaining operations (map, flatMap, andThen)
- [ ] Grasp the relationship between the Result type and Option/Maybe types
- [ ] Learn practical patterns for adopting the Result type


## Prerequisites

The following knowledge will deepen your understanding before reading this guide:

- Basic programming knowledge
- Understanding of related foundational concepts
- Familiarity with the content of [Exception Handling](./00-exceptions.md)

---

## 1. Exceptions vs Result Type

### 1.1 Fundamental Differences

```
Exceptions:
  function getUser(id: string): User {
    // The possibility of an error is not visible from the type
    // The caller might forget to use try/catch
  }

Result Type:
  function getUser(id: string): Result<User, AppError> {
    // Just by looking at the type, you know "failure is possible"
    // The compiler can enforce error handling
  }

Comparison:
  ┌──────────────────┬──────────────────┬──────────────────┐
  │                  │ Exceptions       │ Result Type      │
  ├──────────────────┼──────────────────┼──────────────────┤
  │ Error Visibility │ Not in the type  │ Visible in type  │
  ├──────────────────┼──────────────────┼──────────────────┤
  │ Enforcement      │ None             │ Compiler-enforced│
  ├──────────────────┼──────────────────┼──────────────────┤
  │ Code Style       │ try/catch        │ match/map/unwrap │
  ├──────────────────┼──────────────────┼──────────────────┤
  │ Performance      │ Stack unwinding  │ Normal return    │
  └──────────────────┴──────────────────┴──────────────────┘
```

### 1.2 Why the Result Type Is Gaining Attention

```
Reasons Why the Result Type Is Gaining Attention:

  1. Type Safety
     → Error types are explicitly declared in the type system
     → The compiler detects missing error handling
     → IDE autocompletion works effectively

  2. Explicitness
     → The possibility of failure is apparent from the function signature alone
     → No hidden control flow (exception propagation)
     → Easier code reviews

  3. Performance
     → No stack unwinding required
     → No stack trace construction needed
     → Same cost as a normal function return

  4. Composability
     → Chain processing with map, flatMap, andThen
     → High affinity with functional programming
     → Well-suited for pipeline processing

  5. Predictability
     → Error paths are clear
     → Tests are easy to write
     → Debugging is straightforward
```

### 1.3 Mathematical Background of the Result Type

```
Concepts Behind the Result Type:

  Sum Type (Tagged Union):
    Result<T, E> = Ok(T) | Err(E)
    → Always holds exactly one of T or E

  This is a kind of Algebraic Data Type (ADT):
    → Haskell: Either a b = Left a | Right b
    → Rust: enum Result<T, E> { Ok(T), Err(E) }
    → Scala: Either[L, R] = Left[L] | Right[R]
    → TypeScript: { ok: true; value: T } | { ok: false; error: E }

  Result as a Monad:
    → Chainable via flatMap (andThen)
    → Short-circuits when an error occurs
    → Has the same expressive power as try/catch with exceptions
```

---

## 2. Rust's Result

### 2.1 Basic Usage

```rust
// Rust: Result<T, E> is a standard library type
use std::fs;
use std::io;

fn read_config(path: &str) -> Result<Config, ConfigError> {
    let content = fs::read_to_string(path)
        .map_err(|e| ConfigError::IoError(e))?;  // ? for early return

    let config: Config = serde_json::from_str(&content)
        .map_err(|e| ConfigError::ParseError(e.to_string()))?;

    if config.port == 0 {
        return Err(ConfigError::ValidationError("port must be > 0".into()));
    }

    Ok(config)
}

// Error type definition
#[derive(Debug)]
enum ConfigError {
    IoError(io::Error),
    ParseError(String),
    ValidationError(String),
}

// Usage
fn main() {
    match read_config("config.json") {
        Ok(config) => println!("Port: {}", config.port),
        Err(ConfigError::IoError(e)) => eprintln!("File error: {}", e),
        Err(ConfigError::ParseError(e)) => eprintln!("Parse error: {}", e),
        Err(ConfigError::ValidationError(e)) => eprintln!("Validation: {}", e),
    }

    // Chain with the ? operator (propagate errors to the caller)
    // → Instead of try/catch, errors propagate through the type system
}

// Method chaining with Result
fn process() -> Result<String, Error> {
    read_file("input.txt")?
        .lines()
        .map(|line| parse_line(line))
        .collect::<Result<Vec<_>, _>>()?
        .iter()
        .map(|item| format_item(item))
        .collect::<Result<String, _>>()
}
```

### 2.2 The ? Operator in Detail

```rust
// The ? operator is syntactic sugar for the following:
fn read_file(path: &str) -> Result<String, io::Error> {
    // This:
    let content = fs::read_to_string(path)?;

    // Is equivalent to:
    let content = match fs::read_to_string(path) {
        Ok(c) => c,
        Err(e) => return Err(e.into()),  // Conversion via the From trait
    };

    Ok(content)
}

// Automatic error type conversion via the From trait
impl From<io::Error> for AppError {
    fn from(e: io::Error) -> Self {
        AppError::Io(e)
    }
}

impl From<serde_json::Error> for AppError {
    fn from(e: serde_json::Error) -> Self {
        AppError::Parse(e.to_string())
    }
}

// When From is implemented, the ? operator automatically converts
fn load_config(path: &str) -> Result<Config, AppError> {
    let content = fs::read_to_string(path)?;  // io::Error → AppError
    let config: Config = serde_json::from_str(&content)?;  // serde::Error → AppError
    Ok(config)
}
```

### 2.3 Result Method Reference

```rust
// Key methods on Result<T, E>

fn demonstrate_result_methods() {
    let ok_val: Result<i32, String> = Ok(42);
    let err_val: Result<i32, String> = Err("error".to_string());

    // ========== Extracting Values ==========

    // unwrap: Returns the value if Ok, panics if Err
    let value = ok_val.unwrap();  // 42
    // let value = err_val.unwrap();  // Panics! Do not use in production code

    // unwrap_or: Default value for Err case
    let value = err_val.unwrap_or(0);  // 0

    // unwrap_or_else: Generate a value via closure for Err case
    let value = err_val.unwrap_or_else(|e| {
        eprintln!("Error: {}", e);
        0
    });

    // expect: Same as unwrap but with a custom panic message
    let value = ok_val.expect("Config must be valid");

    // ========== Transformations ==========

    // map: Transform the Ok value
    let mapped: Result<String, String> = ok_val.map(|v| v.to_string());

    // map_err: Transform the Err value
    let mapped: Result<i32, i32> = err_val.map_err(|e| e.len() as i32);

    // and_then (flatMap): Apply a function that returns a Result (chaining)
    let chained: Result<String, String> = ok_val.and_then(|v| {
        if v > 0 {
            Ok(v.to_string())
        } else {
            Err("must be positive".to_string())
        }
    });

    // or_else: Return a different Result for the Err case
    let recovered: Result<i32, String> = err_val.or_else(|e| {
        eprintln!("Recovering from: {}", e);
        Ok(0)
    });

    // ========== Checks ==========

    // is_ok / is_err
    assert!(ok_val.is_ok());
    assert!(err_val.is_err());

    // ========== Conversion to/from Option ==========

    // ok(): Result<T, E> → Option<T>
    let opt: Option<i32> = ok_val.ok();  // Some(42)
    let opt: Option<i32> = err_val.ok();  // None

    // err(): Result<T, E> → Option<E>
    let opt: Option<String> = err_val.err();  // Some("error")

    // transpose: Result<Option<T>, E> → Option<Result<T, E>>
    let x: Result<Option<i32>, String> = Ok(Some(42));
    let y: Option<Result<i32, String>> = x.transpose();  // Some(Ok(42))
}

// collect to convert Vec<Result<T, E>> → Result<Vec<T>, E>
fn parse_all(inputs: &[&str]) -> Result<Vec<i32>, String> {
    inputs
        .iter()
        .map(|s| s.parse::<i32>().map_err(|e| e.to_string()))
        .collect()  // Short-circuits on the first Err
}
```

### 2.4 thiserror and anyhow

```rust
// thiserror: Structured errors for libraries
use thiserror::Error;

#[derive(Error, Debug)]
pub enum AppError {
    #[error("User not found: {user_id}")]
    UserNotFound { user_id: String },

    #[error("Email already exists: {email}")]
    EmailAlreadyExists { email: String },

    #[error("Validation error: {0}")]
    Validation(String),

    #[error("Database error")]
    Database(#[from] sqlx::Error),

    #[error("External API error")]
    ExternalApi(#[from] reqwest::Error),

    #[error("Internal error: {0}")]
    Internal(String),
}

// anyhow: Flexible errors for applications
use anyhow::{Context, Result, bail, ensure};

fn load_config(path: &str) -> Result<Config> {
    let content = fs::read_to_string(path)
        .context("Failed to read config file")?;  // Add context

    let config: Config = serde_json::from_str(&content)
        .context("Failed to parse config")?;

    ensure!(config.port > 0, "Port must be positive, got {}", config.port);
    // ensure! returns Err if the condition is false

    if config.host.is_empty() {
        bail!("Host cannot be empty");
        // bail! immediately returns Err
    }

    Ok(config)
}

// When to use thiserror vs anyhow:
// thiserror: Libraries (callers need to distinguish between error types)
// anyhow: Applications (human-readable messages are sufficient for error details)
```

---

## 3. Go Errors

### 3.1 Basic Pattern

```go
// Go: Returns errors via multiple return values
func readConfig(path string) (*Config, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return nil, fmt.Errorf("failed to read config: %w", err)
    }

    var config Config
    if err := json.Unmarshal(data, &config); err != nil {
        return nil, fmt.Errorf("failed to parse config: %w", err)
    }

    if config.Port == 0 {
        return nil, errors.New("port must be > 0")
    }

    return &config, nil
}

// Usage
func main() {
    config, err := readConfig("config.json")
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("Port: %d\n", config.Port)
}

// Characteristics of Go error handling:
// → Errors are values (the error interface)
// → if err != nil is ubiquitous (controversial)
// → errors.Is, errors.As for error inspection
// → fmt.Errorf("%w", err) for error wrapping
```

### 3.2 Custom Error Types

```go
// Custom error type definitions
type NotFoundError struct {
    Resource string
    ID       string
}

func (e *NotFoundError) Error() string {
    return fmt.Sprintf("%s not found: %s", e.Resource, e.ID)
}

type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation error on %s: %s", e.Field, e.Message)
}

// Sentinel errors (constant errors)
var (
    ErrNotFound      = errors.New("not found")
    ErrUnauthorized  = errors.New("unauthorized")
    ErrInternalError = errors.New("internal error")
)

// Error inspection
func handleError(err error) {
    // errors.Is: Compare with sentinel errors
    if errors.Is(err, ErrNotFound) {
        fmt.Println("Resource not found")
        return
    }

    // errors.As: Check for custom error types
    var validationErr *ValidationError
    if errors.As(err, &validationErr) {
        fmt.Printf("Validation failed: %s - %s\n",
            validationErr.Field, validationErr.Message)
        return
    }

    // Unknown error
    fmt.Printf("Unknown error: %v\n", err)
}
```

### 3.3 Error Wrapping Chains

```go
// Go 1.13+: Error wrapping
func getUser(id string) (*User, error) {
    row := db.QueryRow("SELECT * FROM users WHERE id = ?", id)
    var user User
    if err := row.Scan(&user.ID, &user.Name, &user.Email); err != nil {
        if errors.Is(err, sql.ErrNoRows) {
            return nil, fmt.Errorf("getUser(%s): %w", id, ErrNotFound)
        }
        return nil, fmt.Errorf("getUser(%s): database error: %w", id, err)
    }
    return &user, nil
}

func createOrder(userID string, items []Item) (*Order, error) {
    user, err := getUser(userID)
    if err != nil {
        return nil, fmt.Errorf("createOrder: %w", err)
    }
    // ...
    return &Order{UserID: user.ID}, nil
}

// Example of an error chain:
// "createOrder: getUser(user-123): not found"
// errors.Is(err, ErrNotFound) → true (traverses the chain for inspection)

// Go 1.20+: errors.Join to combine multiple errors
func validateOrder(order *Order) error {
    var errs []error

    if order.UserID == "" {
        errs = append(errs, &ValidationError{Field: "userID", Message: "required"})
    }
    if len(order.Items) == 0 {
        errs = append(errs, &ValidationError{Field: "items", Message: "at least one item required"})
    }
    if order.Total < 0 {
        errs = append(errs, &ValidationError{Field: "total", Message: "must be non-negative"})
    }

    if len(errs) > 0 {
        return errors.Join(errs...)
    }
    return nil
}
```

### 3.4 The Debate Over Go's Error Handling

```
The Debate Over Go's Error Handling:

  Proponents:
  → Simple and explicit
  → Hard to ignore errors (detected by lint tools)
  → No cost of stack traces
  → Error propagation is transparent

  Critics:
  → Boilerplate from if err != nil
  → Error handling dominates the codebase
  → Cannot compose like Result type's map/flatMap
  → No exhaustiveness checking through the type system

  Go 2 Proposals (Drafts):
  → check/handle syntax (proposed 2018, not adopted)
  → try built-in function (proposed 2019, rejected)
  → In the end, if err != nil remains

  Practical Mitigations:
  → Helper functions to reduce boilerplate
  → errgroup for aggregating goroutine errors
  → Structured logging to supplement error context
```

---

## 4. Result Type in TypeScript

### 4.1 Simple Implementation

```typescript
// TypeScript: Result type implementation
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

// Usage example
function parseJson<T>(text: string): Result<T, string> {
  try {
    return ok(JSON.parse(text));
  } catch (e) {
    return err(`Invalid JSON: ${(e as Error).message}`);
  }
}

function validateUser(data: unknown): Result<User, ValidationError> {
  if (!data || typeof data !== "object") {
    return err({ field: "root", message: "Invalid data" });
  }
  const { name, email } = data as any;
  if (!name) return err({ field: "name", message: "Name is required" });
  if (!email?.includes("@")) return err({ field: "email", message: "Invalid email" });
  return ok({ name, email } as User);
}

// Chaining usage
function processInput(input: string): Result<User, string> {
  const jsonResult = parseJson<unknown>(input);
  if (!jsonResult.ok) return err(jsonResult.error);

  const userResult = validateUser(jsonResult.value);
  if (!userResult.ok) return err(userResult.error.message);

  return userResult;
}
```

### 4.2 Feature-Rich Result Class Implementation

```typescript
// A more feature-rich Result implementation
class Result<T, E> {
    private constructor(
        private readonly _ok: boolean,
        private readonly _value?: T,
        private readonly _error?: E,
    ) {}

    static ok<T>(value: T): Result<T, never> {
        return new Result(true, value);
    }

    static err<E>(error: E): Result<never, E> {
        return new Result(false, undefined, error);
    }

    // Convert exceptions to Result
    static fromThrowable<T>(fn: () => T): Result<T, Error> {
        try {
            return Result.ok(fn());
        } catch (e) {
            return Result.err(e instanceof Error ? e : new Error(String(e)));
        }
    }

    // Async version
    static async fromPromise<T>(promise: Promise<T>): Promise<Result<T, Error>> {
        try {
            return Result.ok(await promise);
        } catch (e) {
            return Result.err(e instanceof Error ? e : new Error(String(e)));
        }
    }

    isOk(): this is Result<T, never> {
        return this._ok;
    }

    isErr(): this is Result<never, E> {
        return !this._ok;
    }

    // Transform the Ok value
    map<U>(fn: (value: T) => U): Result<U, E> {
        if (this._ok) {
            return Result.ok(fn(this._value!));
        }
        return Result.err(this._error!);
    }

    // Transform the Err value
    mapErr<F>(fn: (error: E) => F): Result<T, F> {
        if (this._ok) {
            return Result.ok(this._value!);
        }
        return Result.err(fn(this._error!));
    }

    // flatMap / andThen: Chain a function that returns a Result
    andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
        if (this._ok) {
            return fn(this._value!);
        }
        return Result.err(this._error!);
    }

    // Recovery on Err
    orElse<F>(fn: (error: E) => Result<T, F>): Result<T, F> {
        if (this._ok) {
            return Result.ok(this._value!);
        }
        return fn(this._error!);
    }

    // Extract the value
    unwrap(): T {
        if (this._ok) return this._value!;
        throw new Error(`Called unwrap on Err: ${this._error}`);
    }

    unwrapOr(defaultValue: T): T {
        return this._ok ? this._value! : defaultValue;
    }

    unwrapOrElse(fn: (error: E) => T): T {
        return this._ok ? this._value! : fn(this._error!);
    }

    // Pattern matching
    match<U>(handlers: { ok: (value: T) => U; err: (error: E) => U }): U {
        if (this._ok) {
            return handlers.ok(this._value!);
        }
        return handlers.err(this._error!);
    }

    // Conversion to Option
    toOption(): T | undefined {
        return this._ok ? this._value : undefined;
    }
}

// Usage example
const result = Result.fromThrowable(() => JSON.parse('{"name": "test"}'))
    .map(data => data as { name: string })
    .andThen(data => {
        if (!data.name) return Result.err(new Error("Name required"));
        return Result.ok(data);
    })
    .mapErr(e => `Validation failed: ${e.message}`);

result.match({
    ok: data => console.log(`User: ${data.name}`),
    err: msg => console.error(msg),
});
```

### 4.3 neverthrow Library

```typescript
// neverthrow: A popular Result type library for TypeScript
import { ok, err, Result, ResultAsync } from 'neverthrow';

// Basic usage
function divide(a: number, b: number): Result<number, string> {
    if (b === 0) return err("Division by zero");
    return ok(a / b);
}

// Chaining
function calculateAverage(numbers: number[]): Result<number, string> {
    if (numbers.length === 0) return err("Empty array");

    const sum = numbers.reduce((a, b) => a + b, 0);
    return divide(sum, numbers.length);
}

// map, mapErr, andThen
const result = calculateAverage([10, 20, 30])
    .map(avg => avg.toFixed(2))
    .mapErr(e => `Calculation error: ${e}`);

// ResultAsync: Async version
function fetchUser(id: string): ResultAsync<User, ApiError> {
    return ResultAsync.fromPromise(
        fetch(`/api/users/${id}`).then(r => r.json()),
        (e) => new ApiError("Fetch failed", e as Error)
    );
}

function fetchUserOrders(userId: string): ResultAsync<Order[], ApiError> {
    return fetchUser(userId)
        .andThen(user => {
            return ResultAsync.fromPromise(
                fetch(`/api/orders?userId=${user.id}`).then(r => r.json()),
                (e) => new ApiError("Fetch orders failed", e as Error)
            );
        });
}

// combine: Merge multiple Results
import { Result as NResult } from 'neverthrow';

function validateForm(data: FormData): Result<ValidatedForm, ValidationError[]> {
    const nameResult = validateName(data.name);
    const emailResult = validateEmail(data.email);
    const ageResult = validateAge(data.age);

    return NResult.combine([nameResult, emailResult, ageResult])
        .map(([name, email, age]) => ({ name, email, age }));
    // Ok if all succeed, first Err if any fail
}

// safeTry: Generator-based ? operator-like syntax
import { safeTry } from 'neverthrow';

function processOrder(orderId: string): Result<Receipt, AppError> {
    return safeTry(function* () {
        const order = yield* getOrder(orderId).safeUnwrap();
        const user = yield* getUser(order.userId).safeUnwrap();
        const payment = yield* chargePayment(user, order.total).safeUnwrap();
        return ok({ orderId, paymentId: payment.id, amount: order.total });
    });
}
```

### 4.4 ts-results Library

```typescript
// ts-results: Another popular library
import { Ok, Err, Result } from 'ts-results';

function parsePort(input: string): Result<number, string> {
    const port = parseInt(input, 10);
    if (isNaN(port)) return Err(`Invalid port number: ${input}`);
    if (port < 1 || port > 65535) return Err(`Port out of range: ${port}`);
    return Ok(port);
}

// Access Ok/Err values via the val property
const result = parsePort("8080");
if (result.ok) {
    console.log(`Port: ${result.val}`);  // 8080
} else {
    console.error(`Error: ${result.val}`);  // Error message
}

// expect: Returns the value if Ok, throws with a message if Err
const port = parsePort("8080").expect("Port must be valid");

// map and andThen
const configResult = parsePort("8080")
    .map(port => ({ port, host: "localhost" }))
    .andThen(config => {
        if (config.host === "") return Err("Host required");
        return Ok(config);
    });
```

---

## 5. Relationship with Option/Maybe Types

### 5.1 What Is the Option Type

```
Option<T> = Some(T) | None

Result<T, E> = Ok(T) | Err(E)

Difference:
  Option: Whether a value "exists or not"
  Result: Whether a value "exists, or why it doesn't"

  Option can be thought of as "a Result without error information":
  Option<T> ≒ Result<T, ()>  // No error information
```

```rust
// Rust: Interconversion between Option and Result
fn find_user(id: &str) -> Option<User> {
    users.get(id).cloned()
}

fn get_user(id: &str) -> Result<User, AppError> {
    find_user(id).ok_or_else(|| AppError::UserNotFound {
        user_id: id.to_string(),
    })
}

// Option methods
let opt: Option<i32> = Some(42);

opt.map(|v| v * 2);           // Some(84)
opt.and_then(|v| if v > 0 { Some(v) } else { None });
opt.unwrap_or(0);              // 42
opt.ok_or("value is none")?;  // Option → Result
```

```typescript
// TypeScript Option type
type Option<T> = T | null | undefined;

// When to use Result vs Option
function findUser(id: string): Option<User> {
    // "Not found" is a normal case → Option
    return users.get(id) ?? null;
}

function getUser(id: string): Result<User, NotFoundError> {
    // "Not found" is an error case → Result
    const user = users.get(id);
    if (!user) return err(new NotFoundError("User", id));
    return ok(user);
}

// Guidelines for choosing:
// Use Option when:
//   → The absence of a value is a normal situation
//   → Examples: Map.get(), Array.find(), cache.get()
//
// Use Result when:
//   → The reason for failure needs to be communicated
//   → Examples: API calls, validation, file reads
```

### 5.2 Haskell's Either and Maybe

```haskell
-- Haskell: Either and Maybe are the originals of Result and Option

-- Maybe a = Nothing | Just a
findUser :: String -> Maybe User
findUser userId = lookup userId userMap

-- Either e a = Left e | Right a (Left is error, Right is success)
getUser :: String -> Either AppError User
getUser userId = case findUser userId of
    Nothing -> Left (UserNotFound userId)
    Just user -> Right user

-- Chaining with do notation (Monad)
processOrder :: String -> Either AppError Receipt
processOrder orderId = do
    order <- getOrder orderId           -- Returns immediately on Err
    user  <- getUser (orderUserId order) -- Returns immediately on Err
    payment <- chargePayment user order  -- Returns immediately on Err
    return Receipt { receiptOrder = order, receiptPayment = payment }

-- This is equivalent to:
processOrder' :: String -> Either AppError Receipt
processOrder' orderId =
    getOrder orderId >>= \order ->
    getUser (orderUserId order) >>= \user ->
    chargePayment user order >>= \payment ->
    Right Receipt { receiptOrder = order, receiptPayment = payment }
```

---

## 6. Choosing Between Result Type and Exceptions

### 6.1 Scenario-Based Selection Criteria

```
When to Use the Result Type:
  ✓ Expected errors (validation, file not found)
  ✓ Public interfaces of libraries/APIs
  ✓ When type safety is critical
  ✓ When the set of error types is limited
  ✓ Performance-critical code
  ✓ Functional-style code
  ✓ When error composition is needed

When to Use Exceptions:
  ✓ Unexpected errors (programming mistakes)
  ✓ Unrecoverable errors (OutOfMemory)
  ✓ When the framework expects exceptions
  ✓ Error propagation from deep call stacks
  ✓ Errors in constructors or property access
  ✓ Boundaries with external libraries

Combined Approach (Recommended):
  → Domain logic: Result type (expected errors)
  → Infrastructure layer: Exceptions (network, DB failures)
  → Boundary (Controller): Convert exceptions to Result
```

### 6.2 Layer-Specific Usage

```typescript
// Layer-specific usage example

// ========== Infrastructure Layer: Throws exceptions ==========
class UserRepository {
    async findById(id: string): Promise<User | null> {
        // DB errors propagate as exceptions
        const row = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        return row ? mapToUser(row) : null;
    }
}

// ========== Domain Layer: Uses Result type ==========
class UserService {
    constructor(private repo: UserRepository) {}

    async getUser(id: string): Promise<Result<User, UserError>> {
        try {
            const user = await this.repo.findById(id);
            if (!user) return err(new UserNotFoundError(id));
            return ok(user);
        } catch (error) {
            // Convert infrastructure exceptions to Result
            return err(new UserServiceError("Database error", { cause: error }));
        }
    }

    async createUser(data: CreateUserDto): Promise<Result<User, UserError>> {
        // Validation
        const validation = validateCreateUser(data);
        if (!validation.ok) return validation;

        // Duplicate check
        const existing = await this.repo.findByEmail(data.email);
        if (existing) return err(new EmailAlreadyExistsError(data.email));

        try {
            const user = await this.repo.create(data);
            return ok(user);
        } catch (error) {
            return err(new UserServiceError("Failed to create user", { cause: error }));
        }
    }
}

// ========== Presentation Layer: Converts Result to HTTP response ==========
class UserController {
    constructor(private service: UserService) {}

    async getUser(req: Request, res: Response): Promise<void> {
        const result = await this.service.getUser(req.params.id);

        result.match({
            ok: user => res.json(user),
            err: error => {
                if (error instanceof UserNotFoundError) {
                    res.status(404).json({ error: error.message });
                } else {
                    res.status(500).json({ error: "Internal server error" });
                }
            }
        });
    }
}
```

### 6.3 Migration Strategy in Practice

```typescript
// Strategy for gradually migrating from exception-based code to Result type

// Step 1: Prepare Result type utilities
function tryCatch<T>(fn: () => T): Result<T, Error> {
    try {
        return ok(fn());
    } catch (e) {
        return err(e instanceof Error ? e : new Error(String(e)));
    }
}

async function tryCatchAsync<T>(fn: () => Promise<T>): Promise<Result<T, Error>> {
    try {
        return ok(await fn());
    } catch (e) {
        return err(e instanceof Error ? e : new Error(String(e)));
    }
}

// Step 2: Start using Result type in new code
// Convert at the boundary with existing code

// Exception → Result conversion
async function getUserSafe(id: string): Promise<Result<User, AppError>> {
    return tryCatchAsync(async () => {
        // Call existing exception-based functions
        return await legacyGetUser(id);
    }).then(result =>
        result.mapErr(e => new AppError("USER_FETCH_FAILED", e.message))
    );
}

// Result → Exception conversion (when the framework expects exceptions)
function unwrapOrThrow<T, E extends Error>(result: Result<T, E>): T {
    if (result.ok) return result.value;
    throw result.error;
}

// Step 3: Migrate from critical domain logic first
// Order: Validation → Business rules → Service layer
```

---

## 7. Advanced Patterns

### 7.1 Railway Oriented Programming

```
Railway Oriented Programming:

  Represents the success and failure paths as "two rails."
  Each function can switch from the Success rail to the Error rail.

  Success ──────→ validate ──→ transform ──→ save ──→ Success
                      │              │           │
  Error   ◁──────────┘    ◁─────────┘    ◁──────┘     Error

  Result type's andThen (flatMap) is exactly this pattern:
  → Only executes the next function on Success
  → On Error, flows along the Error rail as-is
```

```typescript
// Railway Oriented Programming implementation example
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

// Pipeline function
function pipe<T, E>(
    initial: Result<T, E>,
    ...fns: Array<(value: any) => Result<any, E>>
): Result<any, E> {
    let result: Result<any, E> = initial;
    for (const fn of fns) {
        if (!result.ok) return result;  // Pass through the Error rail as-is
        result = fn(result.value);
    }
    return result;
}

// Usage example: User registration pipeline
function registerUser(input: unknown): Result<User, AppError> {
    return pipe(
        ok(input),
        validateInput,    // Input validation
        normalizeEmail,   // Email normalization
        checkDuplicate,   // Duplicate check
        hashPassword,     // Password hashing
        saveToDatabase,   // Save to DB
        sendWelcomeEmail, // Send email
    );
}

// Each function can be tested independently
function validateInput(input: unknown): Result<RegisterDto, AppError> {
    if (!input || typeof input !== "object") {
        return err({ code: "INVALID_INPUT", message: "Invalid input" });
    }
    // ... validation logic
    return ok(input as RegisterDto);
}

function normalizeEmail(dto: RegisterDto): Result<RegisterDto, AppError> {
    return ok({ ...dto, email: dto.email.toLowerCase().trim() });
}
```

### 7.2 Parallel Processing with Result

```typescript
// Utilities for processing multiple Results in parallel

// all: Ok if all succeed, first Err if any fail
function all<T, E>(results: Result<T, E>[]): Result<T[], E> {
    const values: T[] = [];
    for (const result of results) {
        if (!result.ok) return result;
        values.push(result.value);
    }
    return ok(values);
}

// allSettled: Collect all results
function allSettled<T, E>(
    results: Result<T, E>[]
): { successes: T[]; failures: E[] } {
    const successes: T[] = [];
    const failures: E[] = [];
    for (const result of results) {
        if (result.ok) successes.push(result.value);
        else failures.push(result.error);
    }
    return { successes, failures };
}

// Async version
async function allAsync<T, E>(
    promises: Promise<Result<T, E>>[]
): Promise<Result<T[], E>> {
    const results = await Promise.all(promises);
    return all(results);
}

// Usage example
async function validateBulkUsers(
    users: CreateUserDto[]
): Promise<Result<ValidatedUser[], ValidationError[]>> {
    const results = users.map(user => validateUser(user));
    const { successes, failures } = allSettled(results);

    if (failures.length > 0) {
        return err(failures);
    }
    return ok(successes);
}
```

### 7.3 Extensions to Result and Either

```typescript
// Either type: A generalization of Result (no semantics assigned to Left/Right)
type Either<L, R> = { tag: "left"; value: L } | { tag: "right"; value: R };

function left<L>(value: L): Either<L, never> {
    return { tag: "left", value };
}

function right<R>(value: R): Either<never, R> {
    return { tag: "right", value };
}

// bimap: Transform both cases
function bimap<L, R, L2, R2>(
    either: Either<L, R>,
    leftFn: (l: L) => L2,
    rightFn: (r: R) => R2,
): Either<L2, R2> {
    if (either.tag === "left") return left(leftFn(either.value));
    return right(rightFn(either.value));
}

// Validation type: A Result that accumulates errors
type Validation<T, E> = { ok: true; value: T } | { ok: false; errors: E[] };

function validateAll<T, E>(
    validations: Validation<T, E>[]
): Validation<T[], E> {
    const values: T[] = [];
    const errors: E[] = [];

    for (const v of validations) {
        if (v.ok) {
            values.push(v.value);
        } else {
            errors.push(...v.errors);
        }
    }

    if (errors.length > 0) {
        return { ok: false, errors };
    }
    return { ok: true, value: values };
}

// Usage example: Form validation (return all errors at once)
function validateRegistrationForm(data: FormData): Validation<ValidForm, FieldError> {
    return validateAll([
        validateName(data.name),
        validateEmail(data.email),
        validatePassword(data.password),
        validateAge(data.age),
    ]).map(([name, email, password, age]) => ({
        name, email, password, age,
    }));
}
// Result.andThen short-circuits on the first error,
// while Validation.validateAll collects all errors
```

---

## 8. Result in Scala and Functional Languages

### 8.1 Scala's Either and Try

```scala
// Scala: Either[L, R]
def divide(a: Double, b: Double): Either[String, Double] = {
  if (b == 0) Left("Division by zero")
  else Right(a / b)
}

// Chaining with for comprehensions (equivalent to Haskell's do notation)
def calculate(a: Double, b: Double, c: Double): Either[String, Double] = {
  for {
    x <- divide(a, b)     // Returns immediately on Err
    y <- divide(x, c)     // Returns immediately on Err
    z <- if (y > 0) Right(y) else Left("Result must be positive")
  } yield z * 100
}

// Try[T]: Automatically catches exceptions
import scala.util.{Try, Success, Failure}

val result: Try[Int] = Try("42".toInt)
// Success(42)

val result: Try[Int] = Try("abc".toInt)
// Failure(java.lang.NumberFormatException)

val processed = Try("42".toInt)
  .map(_ * 2)
  .flatMap(n => if (n > 0) Success(n) else Failure(new Exception("negative")))
  .recover { case _: NumberFormatException => 0 }
  .getOrElse(-1)
```

### 8.2 F#'s Result

```fsharp
// F#: Result<'T, 'Error> is a standard library type
let divide a b : Result<float, string> =
    if b = 0.0 then Error "Division by zero"
    else Ok (a / b)

// Chaining with the pipe operator
let processOrder orderId =
    getOrder orderId
    |> Result.bind validateOrder
    |> Result.bind calculateTotal
    |> Result.bind processPayment
    |> Result.map createReceipt

// Computation Expression (equivalent to do notation)
type ResultBuilder() =
    member _.Bind(x, f) = Result.bind f x
    member _.Return(x) = Ok x

let result = ResultBuilder()

let processOrder orderId = result {
    let! order = getOrder orderId
    let! validated = validateOrder order
    let! total = calculateTotal validated
    let! payment = processPayment total
    return createReceipt payment
}
```

---

## 9. Testing Strategies

### 9.1 Testing with the Result Type

```typescript
// Testing code that uses the Result type
describe("UserService.createUser", () => {
    it("returns Ok(User) with valid data", async () => {
        const result = await userService.createUser({
            name: "Test User",
            email: "test@example.com",
            password: "SecurePass123!",
        });

        expect(result.ok).toBe(true);
        if (result.ok) {
            expect(result.value.name).toBe("Test User");
            expect(result.value.email).toBe("test@example.com");
            expect(result.value.id).toBeDefined();
        }
    });

    it("returns Err(ValidationError) with invalid email", async () => {
        const result = await userService.createUser({
            name: "Test User",
            email: "invalid-email",
            password: "SecurePass123!",
        });

        expect(result.ok).toBe(false);
        if (!result.ok) {
            expect(result.error).toBeInstanceOf(ValidationError);
            expect(result.error.code).toBe("VALIDATION_ERROR");
        }
    });

    it("returns Err(ConflictError) with duplicate email", async () => {
        // Create an existing user
        await userService.createUser({
            name: "Existing",
            email: "existing@example.com",
            password: "Pass123!",
        });

        const result = await userService.createUser({
            name: "New User",
            email: "existing@example.com",
            password: "Pass123!",
        });

        expect(result.ok).toBe(false);
        if (!result.ok) {
            expect(result.error.code).toBe("EMAIL_ALREADY_EXISTS");
        }
    });
});

// Helper functions for concise tests
function expectOk<T, E>(result: Result<T, E>): T {
    expect(result.ok).toBe(true);
    if (!result.ok) throw new Error(`Expected Ok, got Err: ${result.error}`);
    return result.value;
}

function expectErr<T, E>(result: Result<T, E>): E {
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error(`Expected Err, got Ok: ${result.value}`);
    return result.error;
}

// Usage examples
it("can create a user successfully", async () => {
    const user = expectOk(await userService.createUser(validData));
    expect(user.name).toBe("Test User");
});

it("returns a validation error", async () => {
    const error = expectErr(await userService.createUser(invalidData));
    expect(error.code).toBe("VALIDATION_ERROR");
});
```

### 9.2 Property-Based Testing

```typescript
// Property-based testing with fast-check
import fc from 'fast-check';

describe("Result invariants", () => {
    it("identity law for map: result.map(x => x) === result", () => {
        fc.assert(
            fc.property(fc.integer(), (n) => {
                const result = ok(n);
                const mapped = result.map(x => x);
                expect(mapped).toEqual(result);
            })
        );
    });

    it("associativity law for andThen", () => {
        fc.assert(
            fc.property(fc.integer(), (n) => {
                const f = (x: number) => ok(x * 2);
                const g = (x: number) => ok(x + 1);

                const left = ok(n).andThen(f).andThen(g);
                const right = ok(n).andThen(x => f(x).andThen(g));

                expect(left).toEqual(right);
            })
        );
    });

    it("parsePort always returns a value in 1-65535 or Err", () => {
        fc.assert(
            fc.property(fc.string(), (input) => {
                const result = parsePort(input);
                if (result.ok) {
                    expect(result.value).toBeGreaterThanOrEqual(1);
                    expect(result.value).toBeLessThanOrEqual(65535);
                }
                // If Err, validation is working correctly
            })
        );
    });
});
```

---

## 10. Adoption Patterns in Practice

### 10.1 Gradual Adoption Roadmap

```
Gradual Adoption of the Result Type:

  Phase 1: Prepare Utilities
  → Define the Result type (or select a library)
  → ok(), err() helper functions
  → tryCatch, tryCatchAsync utilities

  Phase 2: Start with the Validation Layer
  → Form validation
  → API request validation
  → Configuration value validation
  → ← Highest impact, lowest risk

  Phase 3: Expand to the Service Layer
  → Convert domain logic return values to Result
  → Clarify boundaries with exceptions
  → Keep the repository layer with exceptions

  Phase 4: Integrate with API Responses
  → Convert Result to HTTP responses in Controllers
  → Unify error response formats
  → Align with OpenAPI schemas

  Phase 5: Team-Wide Adoption
  → Update coding conventions
  → Establish code review guidelines
  → Standardize test patterns
```

### 10.2 Building Team Consensus

```
Discussion Points When Adopting the Result Type:

  1. Library Selection
     → neverthrow: Most popular, includes ResultAsync
     → ts-results: Lightweight, Rust-style
     → Custom implementation: Flexible but has maintenance cost
     → Built-in union types: No library needed but fewer features

  2. Boundary Rules with Exceptions
     → Which layer starts using Result
     → Where to convert exceptions to Result
     → Integration points with frameworks

  3. Error Type Design
     → string vs custom error classes
     → Error code taxonomy
     → Level of error detail

  4. Coexistence with Existing Code
     → Gradual migration vs all-at-once migration
     → Adapter layer design
     → Test migration strategy
```


---

## Practical Exercises

### Exercise 1: Basic Implementation

Implement code that meets the following requirements.

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

### Exercise 2: Applied Patterns

Extend the basic implementation by adding the following features.

```python
# Exercise 2: Applied patterns
from typing import List, Dict, Optional
from datetime import datetime

class AdvancedExercise:
    """Exercise for applied patterns"""

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
    print("All applied tests passed!")

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
    print(f"Speedup factor: {slow_time/fast_time:.0f}x")

benchmark()
```

**Key Points:**
- Be aware of algorithmic time complexity
- Choose appropriate data structures
- Measure the effect with benchmarks
---


## FAQ

### Q1: What is the most important point to keep in mind when learning this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory, but by actually writing code and verifying its behavior.

### Q2: What are common mistakes that beginners make?

Skipping the fundamentals and jumping into advanced topics. We recommend thoroughly understanding the basic concepts explained in this guide before moving on to the next step.

### Q3: How is this applied in professional settings?

The knowledge from this topic is frequently used in day-to-day development work. It is especially important during code reviews and architecture design.

---

## Summary

| Language | Error Approach | Characteristics |
|----------|---------------|-----------------|
| Rust | Result<T, E> + ? | Most refined Result type |
| Go | (value, error) | Simple but verbose |
| TypeScript | Union types / neverthrow | Expressible through types |
| Java | Exceptions (+ Optional) | Checked exceptions |
| Python | Exceptions | Supplemented by type hints |
| Haskell | Either a b | Original, chaining via Monads |
| Scala | Either / Try | Concise with for comprehensions |
| F# | Result<'T, 'E> | Computation Expressions |
| Kotlin | runCatching / Result | Java compatible |
| Swift | throws + Result | Both approaches available |

---

## Recommended Next Reading

---

## References
1. The Rust Programming Language. "Error Handling."
2. Go Blog. "Error handling and Go." 2011.
3. Wlaschin, S. "Railway Oriented Programming." F# for Fun and Profit.
4. neverthrow. "Type-Safe Error Handling in TypeScript." GitHub.
5. Bloch, J. "Effective Java." Item 71: Avoid unnecessary use of checked exceptions.
6. Syme, D. et al. "The F# Component Design Guidelines."
7. Kotlin Documentation. "Exceptions."
8. Apple Developer Documentation. "Error Handling in Swift."



===== SOURCE: 02-programming/async-and-error-handling/docs/02-error-handling/02-error-boundaries.md =====

# Error Boundaries

> Error boundaries are a mechanism for "localizing the impact of errors." Understand React Error Boundaries, global error handlers, and process-level error handling.

## What You Will Learn in This Chapter

- [ ] Understand the concept of error boundaries and layered design
- [ ] Grasp how to implement React Error Boundaries
- [ ] Learn how to design global error handlers
- [ ] Understand error boundaries in microservices
- [ ] Learn how to integrate error reporting and monitoring
- [ ] Design graduated fallback strategies


## Prerequisites

Before reading this guide, having the following knowledge will deepen your understanding:

- Basic programming knowledge
- Understanding of related fundamental concepts
- Understanding of the content in [Result Types](./01-result-type.md)

---

## 1. Error Boundary Layers

### 1.1 Layer Model Overview

```
The principle is to handle errors as close to the source as possible.
However, if they cannot be handled, they are caught at a higher layer.

  Layer 4: Process/Application Level
    -> Catching uncaught exceptions
    -> Error reporting (Sentry)
    -> Graceful shutdown

  Layer 3: Middleware/Framework
    -> Unified HTTP error responses
    -> Log output

  Layer 2: Service/Use Case
    -> Business logic error handling
    -> Retry, fallback

  Layer 1: Function/Method
    -> Input validation
    -> Individual try/catch
```

### 1.2 Responsibilities of Each Layer

```
Layer 1: Function/Method Level
  Responsibilities:
    -> Input value validation
    -> Catching exceptions from individual operations
    -> Converting to appropriate error types
  Do NOT:
    -> Swallow all exceptions silently
    -> Handle concerns belonging to higher layers
    -> Just log and ignore

Layer 2: Service/Use Case Level
  Responsibilities:
    -> Business logic error determination
    -> Retry logic
    -> Fallback strategies
    -> Transaction management
  Do NOT:
    -> Directly construct HTTP responses
    -> Control UI display
    -> Return infrastructure-specific errors directly

Layer 3: Middleware/Framework Level
  Responsibilities:
    -> Unified error response format
    -> Determining HTTP status codes
    -> Attaching request IDs
    -> Outputting access logs
  Do NOT:
    -> Make business logic decisions
    -> Branch in detail for individual error cases

Layer 4: Process/Application Level
  Responsibilities:
    -> Final catch for uncaught exceptions
    -> Sending to error reporting services
    -> Graceful shutdown
    -> Responding to health checks
  Do NOT:
    -> Attempt to recover individual errors
    -> Execute business logic
```

### 1.3 Error Propagation Flow

```
Error Propagation Flow (Practical Example):

  1. DB query timeout occurs
     Layer 1: repository.findById()
     -> Throws DatabaseTimeoutError

  2. Caught at service layer
     Layer 2: userService.getUser()
     -> Retry #1: Timeout again
     -> Retry #2: Timeout again
     -> Wraps in ServiceUnavailableError and re-throws

  3. Caught at middleware
     Layer 3: errorMiddleware()
     -> HTTP 503 Service Unavailable response
     -> Attaches Retry-After header
     -> Structured log output

  4. If middleware also fails to catch
     Layer 4: process.on('uncaughtException')
     -> Reports to Sentry
     -> Begins graceful shutdown
```

---

## 2. React Error Boundary

### 2.1 Basic Error Boundary

```tsx
// React: Error Boundary (requires a class component)
import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Send to error reporting service
    console.error('Error Boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div>
          <h2>An error occurred</h2>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Usage: Localizing the impact of errors
function App() {
  return (
    <div>
      <Header /> {/* Header always displays */}
      <ErrorBoundary fallback={<p>Failed to load sidebar</p>}>
        <Sidebar /> {/* Sidebar errors do not affect others */}
      </ErrorBoundary>
      <ErrorBoundary fallback={<p>Failed to load main content</p>}>
        <MainContent /> {/* Main content errors are also localized */}
      </ErrorBoundary>
    </div>
  );
}
```

### 2.2 Advanced Error Boundary

```tsx
// More practical Error Boundary implementation
import React, { Component, ReactNode, ErrorInfo } from 'react';
import * as Sentry from '@sentry/react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    onReset?: () => void;
    resetKeys?: unknown[];  // Reset when these values change
    level?: 'page' | 'section' | 'component';
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({ errorInfo });

        // Custom error handler
        this.props.onError?.(error, errorInfo);

        // Report to Sentry
        Sentry.captureException(error, {
            contexts: {
                react: {
                    componentStack: errorInfo.componentStack,
                },
            },
            tags: {
                errorBoundaryLevel: this.props.level ?? 'component',
            },
        });
    }

    componentDidUpdate(prevProps: ErrorBoundaryProps): void {
        // Reset error state when resetKeys change
        if (
            this.state.hasError &&
            this.props.resetKeys &&
            prevProps.resetKeys &&
            !arraysEqual(this.props.resetKeys, prevProps.resetKeys)
        ) {
            this.resetErrorBoundary();
        }
    }

    resetErrorBoundary = (): void => {
        this.props.onReset?.();
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render(): ReactNode {
        if (this.state.hasError && this.state.error) {
            // Function-type fallback (passes error info and reset function)
            if (typeof this.props.fallback === 'function') {
                return this.props.fallback(this.state.error, this.resetErrorBoundary);
            }

            // ReactNode-type fallback
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default fallback
            return (
                <div role="alert" className="error-boundary-fallback">
                    <h2>An unexpected error occurred</h2>
                    <p>Please reload the page or try again after a moment.</p>
                    <details>
                        <summary>Error details (for development)</summary>
                        <pre>{this.state.error.message}</pre>
                        <pre>{this.state.error.stack}</pre>
                    </details>
                    <button onClick={this.resetErrorBoundary}>
                        Retry
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

function arraysEqual(a: unknown[], b: unknown[]): boolean {
    if (a.length !== b.length) return false;
    return a.every((val, idx) => Object.is(val, b[idx]));
}

// ========== Usage Examples ==========

// Error Boundary placement by level
function App() {
    return (
        // App-wide Error Boundary (last resort)
        <ErrorBoundary
            level="page"
            fallback={(error, reset) => (
                <FullPageError error={error} onRetry={reset} />
            )}
        >
            <Layout>
                {/* Section-level Error Boundary */}
                <ErrorBoundary
                    level="section"
                    fallback={<SectionErrorFallback />}
                >
                    <DashboardWidgets />
                </ErrorBoundary>

                {/* Component-level Error Boundary */}
                <ErrorBoundary
                    level="component"
                    fallback={<p>Failed to load notifications</p>}
                >
                    <NotificationPanel />
                </ErrorBoundary>
            </Layout>
        </ErrorBoundary>
    );
}
```

### 2.3 react-error-boundary Library

```tsx
// react-error-boundary: Officially recommended library
import { ErrorBoundary, useErrorBoundary } from 'react-error-boundary';

// Basic usage
function App() {
    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={(error, info) => {
                // Error reporting
                reportError(error, info);
            }}
            onReset={(details) => {
                // Processing on reset (e.g., refetch data)
                queryClient.invalidateQueries();
            }}
            resetKeys={[userId]}  // Reset when userId changes
        >
            <UserProfile userId={userId} />
        </ErrorBoundary>
    );
}

// FallbackComponent
function ErrorFallback({
    error,
    resetErrorBoundary,
}: {
    error: Error;
    resetErrorBoundary: () => void;
}) {
    return (
        <div role="alert">
            <h2>Something went wrong</h2>
            <p>{error.message}</p>
            <button onClick={resetErrorBoundary}>Retry</button>
        </div>
    );
}

// useErrorBoundary hook: Explicitly throw errors from child components
function UserProfile({ userId }: { userId: string }) {
    const { showBoundary } = useErrorBoundary();

    const handleClick = async () => {
        try {
            await deleteUser(userId);
        } catch (error) {
            // Errors in event handlers are NOT caught by Error Boundaries
            // Use showBoundary to explicitly pass the error to the Error Boundary
            showBoundary(error);
        }
    };

    return <button onClick={handleClick}>Delete User</button>;
}

// withErrorBoundary HOC
const SafeComponent = withErrorBoundary(DangerousComponent, {
    FallbackComponent: ErrorFallback,
    onError: reportError,
});
```

### 2.4 Error Boundary Caveats

```
Errors that Error Boundaries do NOT catch:

  1. Event handlers
     -> Errors in onClick, onChange, etc. are not caught
     -> Solution: Use the useErrorBoundary() hook

  2. Asynchronous code
     -> Errors in setTimeout, Promise are not caught
     -> Solution: Use the useErrorBoundary() hook

  3. Server-side rendering (SSR)
     -> Error Boundaries are client-side only
     -> Solution: Handle errors separately on the server side

  4. Errors in the Error Boundary itself
     -> When the Error Boundary's own rendering throws an error
     -> Solution: A parent Error Boundary catches it

Error Boundary placement strategy:

  Choosing granularity:
  -> Too coarse: One for the entire app -> A trivial error causes full-page fallback
  -> Too fine: Wrapping every component -> Bloated code, fragmented UX

  Recommended:
  -> App level: One (last resort)
  -> Route/page level: One per page
  -> Section level: One per independent data source
  -> Component level: Parts that can fail without affecting others
```

### 2.5 Integration with Suspense

```tsx
// Combining Error Boundary and Suspense
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// React 18+: Suspense + Error Boundary pattern
function UserDashboard({ userId }: { userId: string }) {
    return (
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            resetKeys={[userId]}
        >
            <Suspense fallback={<DashboardSkeleton />}>
                <UserStats userId={userId} />
            </Suspense>
            <Suspense fallback={<OrdersSkeleton />}>
                <RecentOrders userId={userId} />
            </Suspense>
        </ErrorBoundary>
    );
}

// Integration with TanStack Query (React Query)
import { QueryErrorResetBoundary } from '@tanstack/react-query';

function DataSection() {
    return (
        <QueryErrorResetBoundary>
            {({ reset }) => (
                <ErrorBoundary
                    onReset={reset}
                    FallbackComponent={ErrorFallback}
                >
                    <Suspense fallback={<Loading />}>
                        <DataComponent />
                    </Suspense>
                </ErrorBoundary>
            )}
        </QueryErrorResetBoundary>
    );
}

// useQuery with suspense + throwOnError
function DataComponent() {
    const { data } = useQuery({
        queryKey: ['data'],
        queryFn: fetchData,
        throwOnError: true,  // Propagate errors to Error Boundary
    });

    return <div>{data}</div>;
}
```

---

## 3. Server-Side Error Boundaries

### 3.1 Express Error Middleware

```typescript
// Express: Global error middleware
import express, { Request, Response, NextFunction } from 'express';

const app = express();

// Route handler
app.get('/api/users/:id', async (req, res, next) => {
  try {
    const user = await userService.getUser(req.params.id);
    res.json(user);
  } catch (error) {
    next(error); // Delegate to error middleware
  }
});

// Error boundary: Global error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  // Branch response based on error type
  if (error instanceof ValidationError) {
    res.status(400).json({
      type: "validation_error",
      message: error.message,
      fields: error.fields,
    });
  } else if (error instanceof NotFoundError) {
    res.status(404).json({
      type: "not_found",
      message: error.message,
    });
  } else if (error instanceof AuthError) {
    res.status(401).json({
      type: "unauthorized",
      message: "Authentication required",
    });
  } else {
    // Unexpected error
    console.error("Unexpected error:", error);
    // Send to Sentry
    res.status(500).json({
      type: "internal_error",
      message: "A server error occurred",
    });
  }
});
```

### 3.2 Fastify Error Handling

```typescript
// Fastify: Schema-based error handling
import Fastify from 'fastify';

const fastify = Fastify({ logger: true });

// Register error handler
fastify.setErrorHandler(async (error, request, reply) => {
    const requestId = request.id;

    // Fastify validation error
    if (error.validation) {
        return reply.status(400).send({
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Request validation failed',
                details: error.validation.map(v => ({
                    field: v.params?.missingProperty || v.instancePath,
                    message: v.message,
                })),
                requestId,
            }
        });
    }

    // Custom error
    if (error instanceof AppError) {
        request.log.warn({
            code: error.code,
            message: error.message,
        });

        return reply.status(error.httpStatus).send({
            error: {
                code: error.code,
                message: error.message,
                requestId,
            }
        });
    }

    // Unexpected error
    request.log.error({
        err: error,
        message: 'Unhandled error',
    });

    Sentry.captureException(error, {
        tags: { requestId },
    });

    return reply.status(500).send({
        error: {
            code: 'INTERNAL_ERROR',
            message: 'A server error occurred',
            requestId,
        }
    });
});

// 404 handler
fastify.setNotFoundHandler(async (request, reply) => {
    return reply.status(404).send({
        error: {
            code: 'NOT_FOUND',
            message: `${request.method} ${request.url} was not found`,
        }
    });
});
```

### 3.3 NestJS Error Filters

```typescript
// NestJS: Exception Filter
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';

// Filter that catches all exceptions
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(
        private readonly logger: LoggerService,
        private readonly sentry: SentryService,
    ) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const requestId = request.headers['x-request-id'] || generateId();

        if (exception instanceof HttpException) {
            // Standard NestJS HTTP exception
            const status = exception.getStatus();
            const exceptionResponse = exception.getResponse();

            this.logger.warn({
                status,
                message: exception.message,
                requestId,
                path: request.url,
            });

            response.status(status).json({
                error: {
                    code: this.getErrorCode(status),
                    message: typeof exceptionResponse === 'string'
                        ? exceptionResponse
                        : (exceptionResponse as any).message,
                    requestId,
                    timestamp: new Date().toISOString(),
                }
            });
        } else if (exception instanceof AppError) {
            // Custom application error
            this.logger.warn({
                code: exception.code,
                message: exception.message,
                requestId,
            });

            response.status(exception.httpStatus).json({
                error: {
                    code: exception.code,
                    message: exception.message,
                    requestId,
                    timestamp: new Date().toISOString(),
                }
            });
        } else {
            // Unexpected error
            this.logger.error({
                error: exception,
                requestId,
                path: request.url,
            });

            this.sentry.captureException(exception);

            response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'A server error occurred',
                    requestId,
                    timestamp: new Date().toISOString(),
                }
            });
        }
    }

    private getErrorCode(status: number): string {
        const codeMap: Record<number, string> = {
            400: 'BAD_REQUEST',
            401: 'UNAUTHORIZED',
            403: 'FORBIDDEN',
            404: 'NOT_FOUND',
            409: 'CONFLICT',
            422: 'UNPROCESSABLE_ENTITY',
            429: 'TOO_MANY_REQUESTS',
        };
        return codeMap[status] || 'HTTP_ERROR';
    }
}

// Register in main.ts
async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new GlobalExceptionFilter(logger, sentry));
    await app.listen(3000);
}
```

### 3.4 Python (FastAPI) Error Handling

```python
# FastAPI: Exception handlers
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

app = FastAPI()

# Custom errors
class AppError(Exception):
    def __init__(self, code: str, message: str, status_code: int = 500):
        self.code = code
        self.message = message
        self.status_code = status_code
        super().__init__(message)

class NotFoundError(AppError):
    def __init__(self, resource: str, resource_id: str):
        super().__init__(
            code="NOT_FOUND",
            message=f"{resource} not found: {resource_id}",
            status_code=404,
        )

# AppError handler
@app.exception_handler(AppError)
async def app_error_handler(request: Request, exc: AppError):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": exc.code,
                "message": exc.message,
                "request_id": request.state.request_id,
            }
        },
    )

# Validation error handler
@app.exception_handler(RequestValidationError)
async def validation_error_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=400,
        content={
            "error": {
                "code": "VALIDATION_ERROR",
                "message": "Invalid input values",
                "details": [
                    {
                        "field": ".".join(str(loc) for loc in err["loc"]),
                        "message": err["msg"],
                        "type": err["type"],
                    }
                    for err in exc.errors()
                ],
            }
        },
    )

# Generic exception handler (last resort)
@app.exception_handler(Exception)
async def generic_error_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled error: {exc}", exc_info=True)
    sentry_sdk.capture_exception(exc)
    return JSONResponse(
        status_code=500,
        content={
            "error": {
                "code": "INTERNAL_ERROR",
                "message": "A server error occurred",
            }
        },
    )

# Middleware to attach request ID
@app.middleware("http")
async def add_request_id(request: Request, call_next):
    import uuid
    request.state.request_id = request.headers.get(
        "x-request-id", str(uuid.uuid4())
    )
    response = await call_next(request)
    response.headers["x-request-id"] = request.state.request_id
    return response
```

### 3.5 Go Error Middleware

```go
// Go (Gin): Error middleware
package middleware

import (
    "net/http"
    "github.com/gin-gonic/gin"
    "github.com/getsentry/sentry-go"
)

// Error response struct
type ErrorResponse struct {
    Error struct {
        Code      string `json:"code"`
        Message   string `json:"message"`
        RequestID string `json:"request_id,omitempty"`
    } `json:"error"`
}

// Global error handler
func ErrorHandler() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Next()

        // Check for errors after handler execution
        if len(c.Errors) > 0 {
            err := c.Errors.Last().Err
            requestID := c.GetString("request_id")

            switch e := err.(type) {
            case *NotFoundError:
                c.JSON(http.StatusNotFound, ErrorResponse{
                    Error: struct {
                        Code      string `json:"code"`
                        Message   string `json:"message"`
                        RequestID string `json:"request_id,omitempty"`
                    }{
                        Code:      "NOT_FOUND",
                        Message:   e.Error(),
                        RequestID: requestID,
                    },
                })
            case *ValidationError:
                c.JSON(http.StatusBadRequest, gin.H{
                    "error": gin.H{
                        "code":       "VALIDATION_ERROR",
                        "message":    e.Error(),
                        "details":    e.Fields,
                        "request_id": requestID,
                    },
                })
            default:
                // Unexpected error
                sentry.CaptureException(err)
                c.JSON(http.StatusInternalServerError, ErrorResponse{
                    Error: struct {
                        Code      string `json:"code"`
                        Message   string `json:"message"`
                        RequestID string `json:"request_id,omitempty"`
                    }{
                        Code:      "INTERNAL_ERROR",
                        Message:   "A server error occurred",
                        RequestID: requestID,
                    },
                })
            }
        }
    }
}

// Panic recovery middleware
func RecoveryHandler() gin.HandlerFunc {
    return func(c *gin.Context) {
        defer func() {
            if r := recover(); r != nil {
                sentry.CurrentHub().Recover(r)
                c.JSON(http.StatusInternalServerError, ErrorResponse{
                    Error: struct {
                        Code      string `json:"code"`
                        Message   string `json:"message"`
                        RequestID string `json:"request_id,omitempty"`
                    }{
                        Code:    "PANIC_RECOVERED",
                        Message: "A server error occurred",
                    },
                })
                c.Abort()
            }
        }()
        c.Next()
    }
}
```

---

## 4. Process-Level Error Handling

### 4.1 Node.js Process Error Handling

```typescript
// Node.js: Uncaught exceptions and unhandled rejections
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Error reporting
  // Graceful shutdown
  process.exit(1); // Must exit
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  // In Node.js 15+, terminates similarly to uncaughtException
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Graceful shutdown...');
  await server.close();
  await db.disconnect();
  process.exit(0);
});
```

### 4.2 Complete Graceful Shutdown Implementation

```typescript
// Production-quality graceful shutdown
class GracefulShutdown {
    private isShuttingDown = false;
    private shutdownTimeout = 30_000;  // 30 seconds
    private cleanupTasks: Array<() => Promise<void>> = [];

    constructor(private readonly server: Server) {
        this.setupHandlers();
    }

    register(task: () => Promise<void>): void {
        this.cleanupTasks.push(task);
    }

    private setupHandlers(): void {
        // SIGTERM (stop signal from Docker, Kubernetes)
        process.on('SIGTERM', () => this.shutdown('SIGTERM'));

        // SIGINT (Ctrl+C)
        process.on('SIGINT', () => this.shutdown('SIGINT'));

        // Uncaught exceptions
        process.on('uncaughtException', (error) => {
            logger.fatal('Uncaught Exception:', error);
            Sentry.captureException(error);
            this.shutdown('uncaughtException', 1);
        });

        // Unhandled Promise rejections
        process.on('unhandledRejection', (reason) => {
            logger.fatal('Unhandled Rejection:', reason);
            Sentry.captureException(reason);
            this.shutdown('unhandledRejection', 1);
        });
    }

    private async shutdown(signal: string, exitCode: number = 0): Promise<void> {
        if (this.isShuttingDown) {
            logger.warn(`Already shutting down. Ignoring ${signal}`);
            return;
        }
        this.isShuttingDown = true;
        logger.info(`${signal} received. Starting graceful shutdown...`);

        // Forced exit timer
        const forceExitTimer = setTimeout(() => {
            logger.error('Forced shutdown: cleanup timed out');
            process.exit(1);
        }, this.shutdownTimeout);
        forceExitTimer.unref();  // Prevent timer from blocking process exit

        try {
            // 1. Stop accepting new requests
            logger.info('Stopping HTTP server...');
            await new Promise<void>((resolve, reject) => {
                this.server.close((err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
            logger.info('HTTP server stopped');

            // 2. Wait for in-flight requests to complete
            // (server.close() waits for in-flight requests to finish)

            // 3. Run cleanup tasks
            logger.info('Running cleanup tasks...');
            for (const task of this.cleanupTasks) {
                try {
                    await task();
                } catch (error) {
                    logger.error('Cleanup task failed:', error);
                }
            }
            logger.info('Cleanup completed');

            // 4. Flush Sentry (send buffered events)
            await Sentry.flush(5000);

        } catch (error) {
            logger.error('Error during shutdown:', error);
            exitCode = 1;
        } finally {
            clearTimeout(forceExitTimer);
            logger.info(`Exiting with code ${exitCode}`);
            process.exit(exitCode);
        }
    }
}

// Usage example
const server = app.listen(3000);
const shutdown = new GracefulShutdown(server);

// Register cleanup tasks
shutdown.register(async () => {
    logger.info('Closing database connections...');
    await db.disconnect();
});

shutdown.register(async () => {
    logger.info('Closing Redis connections...');
    await redis.quit();
});

shutdown.register(async () => {
    logger.info('Closing message queue connections...');
    await messageQueue.close();
});
```

### 4.3 Integration with Kubernetes Health Checks

```typescript
// Kubernetes: Health check endpoints
class HealthCheck {
    private isReady = false;
    private isLive = true;
    private checks: Map<string, () => Promise<boolean>> = new Map();

    registerCheck(name: string, check: () => Promise<boolean>): void {
        this.checks.set(name, check);
    }

    setReady(ready: boolean): void {
        this.isReady = ready;
    }

    setLive(live: boolean): void {
        this.isLive = live;
    }

    setupRoutes(app: Express): void {
        // Liveness Probe: Is the process running normally?
        app.get('/healthz', (req, res) => {
            if (this.isLive) {
                res.status(200).json({ status: 'ok' });
            } else {
                res.status(503).json({ status: 'not healthy' });
            }
        });

        // Readiness Probe: Is it ready to accept requests?
        app.get('/readyz', async (req, res) => {
            if (!this.isReady) {
                return res.status(503).json({ status: 'not ready' });
            }

            // Check each dependent service
            const results: Record<string, boolean> = {};
            for (const [name, check] of this.checks) {
                try {
                    results[name] = await check();
                } catch {
                    results[name] = false;
                }
            }

            const allHealthy = Object.values(results).every(Boolean);
            res.status(allHealthy ? 200 : 503).json({
                status: allHealthy ? 'ready' : 'not ready',
                checks: results,
            });
        });
    }
}

// Usage example
const health = new HealthCheck();

health.registerCheck('database', async () => {
    try {
        await db.query('SELECT 1');
        return true;
    } catch {
        return false;
    }
});

health.registerCheck('redis', async () => {
    try {
        await redis.ping();
        return true;
    } catch {
        return false;
    }
});

health.setupRoutes(app);

// After application startup is complete
health.setReady(true);

// When shutdown begins
// health.setReady(false);
// -> Kubernetes routes traffic to other Pods
```

---

## 5. Error Boundary Design Principles

### 5.1 Graduated Fallback

```
1. Graduated fallback
   -> Component level -> Page level -> App level

2. Informing the user
   -> Tell them what happened and what they can do
   -> Hide technical details (security)

3. Error logging and reporting
   -> Output logs at every layer
   -> Send to Sentry etc. in production

4. Providing recovery options
   -> Retry button
   -> Guide to alternative actions
   -> Last resort: Page reload
```

### 5.2 Fallback Strategy Patterns

```typescript
// Pattern 1: Cache fallback
async function getUserWithFallback(id: string): Promise<User> {
    try {
        // Primary: Fetch from API
        const user = await apiClient.getUser(id);
        await cache.set(`user:${id}`, user, { ttl: 300 });
        return user;
    } catch (error) {
        // Fallback 1: Fetch from cache
        const cached = await cache.get(`user:${id}`);
        if (cached) {
            logger.warn(`Using cached data for user ${id}`);
            return cached;
        }

        // Fallback 2: Default value
        logger.error(`No data available for user ${id}`);
        return {
            id,
            name: 'Unknown User',
            isStale: true,
        };
    }
}

// Pattern 2: Graduated degradation
async function loadDashboard(userId: string): Promise<DashboardData> {
    const results = await Promise.allSettled([
        fetchUserStats(userId),
        fetchRecentOrders(userId),
        fetchNotifications(userId),
        fetchRecommendations(userId),
    ]);

    return {
        // Required data: Error if failed
        stats: unwrapOrThrow(results[0], 'Failed to load stats'),

        // Important data: Default if failed
        orders: unwrapOrDefault(results[1], []),

        // Supplementary data: Hide if failed
        notifications: unwrapOrDefault(results[2], null),
        recommendations: unwrapOrDefault(results[3], null),
    };
}

function unwrapOrThrow<T>(
    result: PromiseSettledResult<T>,
    message: string
): T {
    if (result.status === 'fulfilled') return result.value;
    throw new Error(message, { cause: result.reason });
}

function unwrapOrDefault<T>(
    result: PromiseSettledResult<T>,
    defaultValue: T
): T {
    if (result.status === 'fulfilled') return result.value;
    logger.warn('Degraded mode:', result.reason);
    return defaultValue;
}

// Pattern 3: Circuit breaker
class CircuitBreaker {
    private failures = 0;
    private lastFailure: number = 0;
    private state: 'closed' | 'open' | 'half-open' = 'closed';

    constructor(
        private readonly threshold: number = 5,
        private readonly resetTimeout: number = 60_000,
    ) {}

    async execute<T>(fn: () => Promise<T>): Promise<T> {
        if (this.state === 'open') {
            if (Date.now() - this.lastFailure > this.resetTimeout) {
                this.state = 'half-open';
            } else {
                throw new CircuitOpenError('Service unavailable');
            }
        }

        try {
            const result = await fn();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }

    private onSuccess(): void {
        this.failures = 0;
        this.state = 'closed';
    }

    private onFailure(): void {
        this.failures++;
        this.lastFailure = Date.now();
        if (this.failures >= this.threshold) {
            this.state = 'open';
            logger.warn('Circuit breaker opened');
        }
    }
}

// Usage example
const paymentCircuit = new CircuitBreaker(5, 30_000);

async function processPayment(order: Order): Promise<PaymentResult> {
    try {
        return await paymentCircuit.execute(() =>
            paymentGateway.charge(order.total, order.paymentMethod)
        );
    } catch (error) {
        if (error instanceof CircuitOpenError) {
            // Payment service is down
            await queueForLaterProcessing(order);
            return { status: 'queued', message: 'Will be processed later' };
        }
        throw error;
    }
}
```

---

## 6. Error Boundaries in Microservices

### 6.1 Error Propagation Between Services

```
Error boundaries in microservices:

  Client -> API Gateway -> Service A -> Service B -> Database
                                    |
                              Service C -> External API

  Error propagation rules:
  1. Do not leak internal errors externally
     -> Service B's DB error should not reach the Client directly
     -> Each service converts errors

  2. Maintain appropriate error granularity
     -> Aggregate downstream service errors
     -> Return minimal necessary information upstream

  3. Timeouts and retries
     -> Set timeouts for inter-service communication
     -> Only retry idempotent operations

  4. Circuit breakers
     -> Block calls to failing services
     -> Execute fallback processing
```

### 6.2 API Gateway Error Aggregation

```typescript
// API Gateway: Error conversion and aggregation
class ApiGateway {
    private circuits = new Map<string, CircuitBreaker>();

    async handleRequest(req: GatewayRequest): Promise<GatewayResponse> {
        const startTime = Date.now();

        try {
            // Routing
            const service = this.resolveService(req.path);
            const circuit = this.getCircuit(service.name);

            // Request via circuit breaker
            const response = await circuit.execute(async () => {
                return await this.forwardRequest(service, req, {
                    timeout: 5000,
                    retries: service.isIdempotent ? 2 : 0,
                });
            });

            return response;

        } catch (error) {
            // Error conversion
            return this.convertToGatewayError(error, {
                path: req.path,
                method: req.method,
                duration: Date.now() - startTime,
            });
        }
    }

    private convertToGatewayError(
        error: unknown,
        context: RequestContext
    ): GatewayResponse {
        if (error instanceof CircuitOpenError) {
            return {
                status: 503,
                body: {
                    error: {
                        code: 'SERVICE_UNAVAILABLE',
                        message: 'Service temporarily unavailable',
                        retryAfter: 30,
                    }
                }
            };
        }

        if (error instanceof TimeoutError) {
            return {
                status: 504,
                body: {
                    error: {
                        code: 'GATEWAY_TIMEOUT',
                        message: 'Request timed out',
                    }
                }
            };
        }

        // Pass through downstream service error response
        if (error instanceof UpstreamError) {
            // However, strip internal information
            return {
                status: error.status,
                body: {
                    error: {
                        code: error.code,
                        message: error.publicMessage,
                        // error.internalDetails is NOT included
                    }
                }
            };
        }

        // Unexpected error
        logger.error('Gateway error:', error, context);
        return {
            status: 500,
            body: {
                error: {
                    code: 'INTERNAL_ERROR',
                    message: 'A server error occurred',
                }
            }
        };
    }
}
```

### 6.3 Distributed Tracing and Error Tracking

```typescript
// Integration with OpenTelemetry
import { trace, SpanStatusCode } from '@opentelemetry/api';

const tracer = trace.getTracer('user-service');

async function getUser(id: string): Promise<User> {
    return tracer.startActiveSpan('getUser', async (span) => {
        try {
            span.setAttribute('user.id', id);
            const user = await userRepository.findById(id);

            if (!user) {
                span.setStatus({
                    code: SpanStatusCode.ERROR,
                    message: 'User not found',
                });
                throw new NotFoundError('User', id);
            }

            span.setStatus({ code: SpanStatusCode.OK });
            return user;

        } catch (error) {
            span.recordException(error as Error);
            span.setStatus({
                code: SpanStatusCode.ERROR,
                message: (error as Error).message,
            });
            throw error;
        } finally {
            span.end();
        }
    });
}

// Error Correlation ID
// -> Propagate the same ID throughout the entire request
// -> Link logs, traces, and error reports
class CorrelationContext {
    private static storage = new AsyncLocalStorage<{
        correlationId: string;
        requestId: string;
        userId?: string;
    }>();

    static run<T>(context: { correlationId: string; requestId: string }, fn: () => T): T {
        return this.storage.run(context, fn);
    }

    static get(): { correlationId: string; requestId: string } | undefined {
        return this.storage.getStore();
    }
}

// Set in middleware
app.use((req, res, next) => {
    const correlationId = req.headers['x-correlation-id'] as string || generateId();
    const requestId = generateId();

    CorrelationContext.run({ correlationId, requestId }, () => {
        res.setHeader('x-correlation-id', correlationId);
        res.setHeader('x-request-id', requestId);
        next();
    });
});
```

---

## 7. Error Reporting

### 7.1 Sentry Integration

```typescript
// Production-grade Sentry configuration
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV,
    release: process.env.APP_VERSION,

    // Sampling rate
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    profilesSampleRate: 0.1,

    // Error filtering
    beforeSend(event, hint) {
        const error = hint.originalException;

        // Do not report operational errors (AppError with isOperational = true)
        if (error instanceof AppError && error.isOperational) {
            return null;
        }

        // Remove sensitive information
        if (event.request?.cookies) {
            delete event.request.cookies;
        }

        return event;
    },

    // Breadcrumbs (history of actions leading to the error)
    beforeBreadcrumb(breadcrumb) {
        // Remove SQL query content
        if (breadcrumb.category === 'query') {
            breadcrumb.data = { ...breadcrumb.data, query: '[REDACTED]' };
        }
        return breadcrumb;
    },

    integrations: [
        nodeProfilingIntegration(),
    ],
});

// Attaching custom context
function reportError(error: Error, context: Record<string, unknown> = {}): void {
    Sentry.withScope((scope) => {
        // User information
        if (context.userId) {
            scope.setUser({ id: context.userId as string });
        }

        // Tags (searchable metadata)
        scope.setTag('error_code', (error as any).code || 'UNKNOWN');
        scope.setTag('service', 'user-service');

        // Context (detailed information)
        scope.setContext('request', {
            path: context.path,
            method: context.method,
            requestId: context.requestId,
        });

        // Fingerprint (custom grouping)
        if (error instanceof AppError) {
            scope.setFingerprint([error.code]);
        }

        Sentry.captureException(error);
    });
}
```

### 7.2 Integration with Structured Logging

```typescript
// Integration with structured logging (pino)
import pino from 'pino';

const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    formatters: {
        level(label) {
            return { level: label };
        },
    },
    mixin() {
        const context = CorrelationContext.get();
        return context ? {
            correlationId: context.correlationId,
            requestId: context.requestId,
        } : {};
    },
    serializers: {
        err: pino.stdSerializers.err,
        // Custom error serializer
        error(error: unknown) {
            if (error instanceof AppError) {
                return {
                    type: error.name,
                    code: error.code,
                    message: error.message,
                    httpStatus: error.httpStatus,
                    isOperational: error.isOperational,
                    stack: error.stack,
                };
            }
            if (error instanceof Error) {
                return {
                    type: error.name,
                    message: error.message,
                    stack: error.stack,
                };
            }
            return { message: String(error) };
        },
    },
});

// Log level usage guide
// fatal: Fatal error that terminates the process
// error: Unexpected error (also sent to Sentry)
// warn: Expected error (operational error)
// info: Record of normal processing
// debug: Debug information
// trace: Detailed trace information
```

---

## 8. RFC 7807: Problem Details for HTTP APIs

### 8.1 Standard Error Format

```typescript
// RFC 7807 compliant error response
interface ProblemDetails {
    type: string;        // URI indicating the type of error
    title: string;       // Human-readable summary of the error
    status: number;      // HTTP status code
    detail?: string;     // Human-readable detailed explanation
    instance?: string;   // URI of the request where this error occurred
    [key: string]: unknown;  // Extension fields
}

// Implementation example
function createProblemDetails(
    error: AppError,
    req: Request
): ProblemDetails {
    const base: ProblemDetails = {
        type: `https://api.example.com/errors/${error.code.toLowerCase()}`,
        title: error.message,
        status: error.httpStatus,
        instance: req.originalUrl,
    };

    // Error-specific extension fields
    if (error instanceof ValidationError) {
        return {
            ...base,
            errors: error.fieldErrors.map(e => ({
                field: e.field,
                message: e.message,
            })),
        };
    }

    if (error instanceof RateLimitError) {
        return {
            ...base,
            retryAfter: error.retryAfterMs / 1000,
        };
    }

    return base;
}

// Express middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        const problem = createProblemDetails(error, req);
        res.status(problem.status)
            .contentType('application/problem+json')
            .json(problem);
    } else {
        res.status(500)
            .contentType('application/problem+json')
            .json({
                type: 'https://api.example.com/errors/internal-error',
                title: 'Internal Server Error',
                status: 500,
                instance: req.originalUrl,
            });
    }
});
```

---

## 9. Frontend Error Boundaries

### 9.1 Global Error Handlers (Browser)

```typescript
// Browser global error handlers

// JavaScript runtime errors
window.onerror = (message, source, lineno, colno, error) => {
    reportError({
        type: 'runtime_error',
        message: String(message),
        source,
        lineno,
        colno,
        stack: error?.stack,
    });
    // Returning true suppresses default error handling
    return false;
};

// Unhandled Promise rejections
window.addEventListener('unhandledrejection', (event) => {
    reportError({
        type: 'unhandled_rejection',
        reason: event.reason,
        promise: event.promise,
    });
});

// Resource loading errors (images, scripts, etc.)
window.addEventListener('error', (event) => {
    if (event.target instanceof HTMLElement) {
        reportError({
            type: 'resource_error',
            tagName: event.target.tagName,
            src: (event.target as any).src || (event.target as any).href,
        });
    }
}, true);  // Capture in the capture phase

// Network error monitoring
window.addEventListener('offline', () => {
    showNotification('Network connection lost');
});

window.addEventListener('online', () => {
    showNotification('Network connection restored');
});
```

### 9.2 Vue Error Handling

```typescript
// Vue 3: Global error handler
import { createApp } from 'vue';

const app = createApp(App);

// Uncaught errors from all components
app.config.errorHandler = (error, instance, info) => {
    console.error('Vue Error:', error);
    console.error('Component:', instance);
    console.error('Info:', info);

    Sentry.captureException(error, {
        extra: {
            componentName: instance?.$options?.name,
            lifecycleHook: info,
        },
    });
};

// Warning handler (recommended for development only)
app.config.warnHandler = (msg, instance, trace) => {
    console.warn('Vue Warning:', msg);
    console.warn('Trace:', trace);
};

// Component-level error handling
// onErrorCaptured: Functions like an Error Boundary
import { onErrorCaptured, ref } from 'vue';

export default {
    setup() {
        const error = ref<Error | null>(null);

        onErrorCaptured((err, instance, info) => {
            error.value = err;
            // Returning false stops error propagation
            return false;
        });

        return { error };
    },
};
```

### 9.3 Angular Error Handling

```typescript
// Angular: ErrorHandler
import { ErrorHandler, Injectable, NgModule } from '@angular/core';

@Injectable()
class GlobalErrorHandler implements ErrorHandler {
    constructor(
        private logger: LoggingService,
        private notification: NotificationService,
    ) {}

    handleError(error: unknown): void {
        // Handle HttpErrorResponse
        if (error instanceof HttpErrorResponse) {
            this.handleHttpError(error);
            return;
        }

        // Client-side error
        const appError = error instanceof Error ? error : new Error(String(error));

        this.logger.error('Unhandled error', {
            message: appError.message,
            stack: appError.stack,
        });

        Sentry.captureException(appError);

        this.notification.showError(
            'An unexpected error occurred. Please reload the page.'
        );
    }

    private handleHttpError(error: HttpErrorResponse): void {
        switch (error.status) {
            case 0:
                this.notification.showError('Please check your network connection');
                break;
            case 401:
                this.notification.showError('Your session has expired');
                // Redirect
                break;
            case 403:
                this.notification.showError('You do not have permission to access this resource');
                break;
            case 404:
                this.notification.showError('The requested resource was not found');
                break;
            case 429:
                this.notification.showError('Too many requests. Please wait a moment');
                break;
            default:
                this.notification.showError('A server error occurred');
        }
    }
}

@NgModule({
    providers: [
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
    ],
})
export class AppModule {}

// HTTP Interceptor for error handling
@Injectable()
class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            retry({ count: 2, delay: 1000 }),  // Retry twice
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    // Attempt token refresh
                    return this.authService.refreshToken().pipe(
                        switchMap(() => next.handle(req)),
                    );
                }
                return throwError(() => error);
            }),
        );
    }
}
```

---

## 10. Testing Strategies

### 10.1 Testing Error Boundaries

```tsx
// Testing React Error Boundaries
import { render, screen, fireEvent } from '@testing-library/react';

// Component that intentionally throws an error
function ThrowError({ shouldThrow }: { shouldThrow: boolean }) {
    if (shouldThrow) {
        throw new Error('Test error');
    }
    return <div>Normal content</div>;
}

describe('ErrorBoundary', () => {
    // Suppress console.error output
    const originalError = console.error;
    beforeAll(() => { console.error = jest.fn(); });
    afterAll(() => { console.error = originalError; });

    it('catches errors from child components', () => {
        render(
            <ErrorBoundary fallback={<p>An error occurred</p>}>
                <ThrowError shouldThrow={true} />
            </ErrorBoundary>
        );

        expect(screen.getByText('An error occurred')).toBeInTheDocument();
        expect(screen.queryByText('Normal content')).not.toBeInTheDocument();
    });

    it('displays child components when there is no error', () => {
        render(
            <ErrorBoundary fallback={<p>An error occurred</p>}>
                <ThrowError shouldThrow={false} />
            </ErrorBoundary>
        );

        expect(screen.getByText('Normal content')).toBeInTheDocument();
        expect(screen.queryByText('An error occurred')).not.toBeInTheDocument();
    });

    it('can reset with the retry button', () => {
        const { rerender } = render(
            <ErrorBoundary
                fallback={(error, reset) => (
                    <div>
                        <p>Error: {error.message}</p>
                        <button onClick={reset}>Retry</button>
                    </div>
                )}
            >
                <ThrowError shouldThrow={true} />
            </ErrorBoundary>
        );

        expect(screen.getByText('Error: Test error')).toBeInTheDocument();

        // Change shouldThrow to false and retry
        fireEvent.click(screen.getByText('Retry'));

        // If no error occurs during re-render after reset, normal content displays
    });

    it('calls the onError callback', () => {
        const onError = jest.fn();

        render(
            <ErrorBoundary
                onError={onError}
                fallback={<p>Error</p>}
            >
                <ThrowError shouldThrow={true} />
            </ErrorBoundary>
        );

        expect(onError).toHaveBeenCalledWith(
            expect.any(Error),
            expect.objectContaining({
                componentStack: expect.any(String),
            })
        );
    });
});
```

### 10.2 Testing Error Middleware

```typescript
// Testing Express error middleware
import request from 'supertest';

describe('Error Middleware', () => {
    it('returns 400 for ValidationError', async () => {
        // Throw ValidationError in route handler
        app.get('/test-validation', (req, res, next) => {
            next(new ValidationError([
                { field: 'email', message: 'Required' },
            ]));
        });

        const response = await request(app)
            .get('/test-validation')
            .expect(400);

        expect(response.body.error.code).toBe('VALIDATION_ERROR');
        expect(response.body.error.details).toHaveLength(1);
    });

    it('returns 404 for NotFoundError', async () => {
        app.get('/test-not-found', (req, res, next) => {
            next(new NotFoundError('User', 'user-123'));
        });

        const response = await request(app)
            .get('/test-not-found')
            .expect(404);

        expect(response.body.error.code).toBe('NOT_FOUND');
    });

    it('returns 500 for unexpected errors', async () => {
        app.get('/test-internal', (req, res, next) => {
            next(new Error('Unexpected'));
        });

        const response = await request(app)
            .get('/test-internal')
            .expect(500);

        expect(response.body.error.code).toBe('INTERNAL_ERROR');
        // Verify internal information is not leaked
        expect(response.body.error.message).not.toContain('Unexpected');
    });
});
```

---


## FAQ

### Q1: What is the most important point to focus on when learning this topic?

Gaining hands-on experience is the most important thing. Understanding deepens not just through theory, but by actually writing code and verifying its behavior.

### Q2: What are common mistakes that beginners make?

Skipping the fundamentals and jumping to advanced topics. We recommend thoroughly understanding the basic concepts covered in this guide before moving on to the next step.

### Q3: How is this applied in real-world development?

Knowledge of this topic is frequently used in everyday development work. It becomes especially important during code reviews and architecture design.

---

## Summary

| Layer | Technique | Purpose |
|-------|-----------|---------|
| Component | Error Boundary | Partial UI errors |
| Middleware | Error handler | Unified HTTP responses |
| Process | uncaughtException | Last resort |
| External service | Sentry | Monitoring |
| Microservices | Circuit breaker | Preventing failure propagation |
| Frontend | Global handler | Collecting uncaught errors |
| API | RFC 7807 | Unified error format |

---

## Recommended Next Guides

---

## References
1. React Documentation. "Error Boundaries."
2. Express.js Documentation. "Error Handling."
3. NestJS Documentation. "Exception Filters."
4. RFC 7807. "Problem Details for HTTP APIs."
5. Sentry Documentation. "JavaScript SDK."
6. Nygard, M. "Release It!" 2nd Edition, 2018.
7. Newman, S. "Building Microservices." 2nd Edition, 2021.
8. react-error-boundary. GitHub.



===== SOURCE: 02-programming/async-and-error-handling/docs/02-error-handling/03-custom-errors.md =====

# Custom Error Design

> Properly modeling errors is the foundation of software reliability and maintainability. This guide covers error code systems, domain errors, and error serialization techniques.

## Learning Objectives

- [ ] Understand design principles for custom errors
- [ ] Learn how to build an error code system
- [ ] Study domain-driven error design
- [ ] Master custom error implementation patterns in various languages
- [ ] Learn error serialization and API design
- [ ] Understand error internationalization (i18n)


## Prerequisites

Understanding the following will help you get the most out of this guide:

- Basic programming knowledge
- Understanding of related foundational concepts
- Familiarity with [Error Boundaries](./02-error-boundaries.md)

---

## 1. Error Classification

### 1.1 Operational Errors vs Programmer Errors

```
Operational Error:
  -> Expected runtime errors
  -> Examples: Network disconnection, DB connection failure, validation failure
  -> Response: Retry, fallback, notify user

Programmer Error:
  -> Bugs. Code needs to be fixed
  -> Examples: Null reference, type error, array out-of-bounds access
  -> Response: Crash -> Fix -> Deploy

This distinction is important:
  -> Operational errors: Handle them (recoverable)
  -> Programmer errors: Let them crash (unrecoverable)
```

### 1.2 Detailed Error Classification System

```
Error Classification System:

  1. Client Errors (4xx)
     -> Validation Error (400)
     -> Authentication Error (401)
     -> Authorization Error (403)
     -> Resource Not Found (404)
     -> Conflict Error (409)
     -> Rate Limit (429)

  2. Server Errors (5xx)
     -> Internal Error (500)
     -> External Service Error (502)
     -> Service Unavailable (503)
     -> Timeout (504)

  3. Business Logic Errors
     -> Insufficient Balance
     -> Order Already Cancelled
     -> Out of Stock
     -> Expired
     -> Policy Violation

  4. Infrastructure Errors
     -> Database Connection Error
     -> Message Queue Connection Error
     -> File System Error
     -> Out of Memory

  Characteristics of each:
  +-------------------+------------+------------+-----------+
  | Category          | Recoverabi | Notify     | Log Level |
  |                   | lity       |            |           |
  +-------------------+------------+------------+-----------+
  | Client            | Possible   | User       | warn      |
  | Server            | Impossible | Developer  | error     |
  | Business Logic    | Possible   | User       | warn      |
  | Infrastructure    | Retryable  | Operations | error     |
  +-------------------+------------+------------+-----------+
```

---

## 2. Custom Errors in TypeScript

### 2.1 Base Error Class

```typescript
// Base error class
abstract class AppError extends Error {
  abstract readonly code: string;
  abstract readonly statusCode: number;
  readonly timestamp: Date;
  readonly isOperational: boolean;

  constructor(message: string, isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.timestamp = new Date();
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        timestamp: this.timestamp.toISOString(),
      },
    };
  }
}
```

### 2.2 Domain Error Implementation

```typescript
// Domain errors
class UserNotFoundError extends AppError {
  readonly code = "USER_NOT_FOUND";
  readonly statusCode = 404;

  constructor(public readonly userId: string) {
    super(`User not found: ${userId}`);
  }
}

class EmailAlreadyExistsError extends AppError {
  readonly code = "EMAIL_ALREADY_EXISTS";
  readonly statusCode = 409;

  constructor(public readonly email: string) {
    super(`Email already registered: ${email}`);
  }
}

class InsufficientBalanceError extends AppError {
  readonly code = "INSUFFICIENT_BALANCE";
  readonly statusCode = 400;

  constructor(
    public readonly required: number,
    public readonly available: number,
  ) {
    super(`Insufficient balance: required ${required}, available ${available}`);
  }
}

// Validation error (multiple fields)
class ValidationError extends AppError {
  readonly code = "VALIDATION_ERROR";
  readonly statusCode = 400;

  constructor(
    public readonly errors: { field: string; message: string }[],
  ) {
    super(`Validation failed: ${errors.map(e => e.field).join(", ")}`);
  }

  toJSON() {
    return {
      error: {
        code: this.code,
        message: this.message,
        details: this.errors,
        timestamp: this.timestamp.toISOString(),
      },
    };
  }
}
```

### 2.3 Complete Error Hierarchy Design Example

```typescript
// ========== Practical Complete Error Hierarchy ==========

// Base class
abstract class AppError extends Error {
    abstract readonly code: string;
    abstract readonly httpStatus: number;
    readonly timestamp: string;
    readonly correlationId?: string;

    constructor(
        message: string,
        public readonly isOperational: boolean = true,
        options?: { cause?: Error; correlationId?: string }
    ) {
        super(message, { cause: options?.cause });
        this.name = this.constructor.name;
        this.timestamp = new Date().toISOString();
        this.correlationId = options?.correlationId;
        Error.captureStackTrace(this, this.constructor);
    }

    // Serialization for API responses
    toResponse(): ErrorResponse {
        return {
            error: {
                code: this.code,
                message: this.message,
                timestamp: this.timestamp,
                ...(this.correlationId && { correlationId: this.correlationId }),
            }
        };
    }

    // Serialization for logging (includes internal information)
    toLog(): Record<string, unknown> {
        return {
            type: this.name,
            code: this.code,
            message: this.message,
            httpStatus: this.httpStatus,
            isOperational: this.isOperational,
            timestamp: this.timestamp,
            correlationId: this.correlationId,
            stack: this.stack,
            cause: this.cause instanceof Error ? {
                type: this.cause.name,
                message: this.cause.message,
            } : undefined,
        };
    }
}

// ---------- Authentication ----------
class AuthenticationError extends AppError {
    readonly code = "AUTHENTICATION_REQUIRED";
    readonly httpStatus = 401;
    constructor(message = "Authentication required", options?: { cause?: Error }) {
        super(message, true, options);
    }
}

class TokenExpiredError extends AppError {
    readonly code = "TOKEN_EXPIRED";
    readonly httpStatus = 401;
    constructor(public readonly expiredAt: Date) {
        super(`Token expired (${expiredAt.toISOString()})`);
    }
}

class InvalidTokenError extends AppError {
    readonly code = "INVALID_TOKEN";
    readonly httpStatus = 401;
    constructor(public readonly reason: string) {
        super(`Invalid token: ${reason}`);
    }
}

class AuthorizationError extends AppError {
    readonly code = "FORBIDDEN";
    readonly httpStatus = 403;
    constructor(
        public readonly requiredPermission: string,
        public readonly actualPermissions: string[] = [],
    ) {
        super(`Insufficient permissions: ${requiredPermission} required`);
    }
}

// ---------- Resources ----------
class NotFoundError extends AppError {
    readonly code = "NOT_FOUND";
    readonly httpStatus = 404;
    constructor(
        public readonly resourceType: string,
        public readonly resourceId: string,
    ) {
        super(`${resourceType} not found: ${resourceId}`);
    }
}

class ConflictError extends AppError {
    readonly code = "CONFLICT";
    readonly httpStatus = 409;
    constructor(
        public readonly resourceType: string,
        public readonly conflictField: string,
        public readonly conflictValue: string,
    ) {
        super(`${resourceType} ${conflictField} already exists: ${conflictValue}`);
    }
}

class GoneError extends AppError {
    readonly code = "GONE";
    readonly httpStatus = 410;
    constructor(
        public readonly resourceType: string,
        public readonly resourceId: string,
        public readonly deletedAt: Date,
    ) {
        super(`${resourceType} ${resourceId} has been deleted (${deletedAt.toISOString()})`);
    }
}

// ---------- Validation ----------
interface FieldError {
    field: string;
    message: string;
    code: string;
    value?: unknown;
    constraints?: Record<string, unknown>;
}

class ValidationError extends AppError {
    readonly code = "VALIDATION_ERROR";
    readonly httpStatus = 400;
    constructor(public readonly fieldErrors: FieldError[]) {
        super(`Invalid input: ${fieldErrors.map(e => e.field).join(", ")}`);
    }

    toResponse(): ErrorResponse {
        return {
            error: {
                code: this.code,
                message: this.message,
                timestamp: this.timestamp,
                details: this.fieldErrors.map(e => ({
                    field: e.field,
                    message: e.message,
                    code: e.code,
                })),
            }
        };
    }

    // Get error for a specific field
    getFieldError(field: string): FieldError | undefined {
        return this.fieldErrors.find(e => e.field === field);
    }

    // Add errors
    static builder(): ValidationErrorBuilder {
        return new ValidationErrorBuilder();
    }
}

// Validation error builder
class ValidationErrorBuilder {
    private errors: FieldError[] = [];

    addError(field: string, message: string, code: string, value?: unknown): this {
        this.errors.push({ field, message, code, value });
        return this;
    }

    required(field: string): this {
        return this.addError(field, `${field} is required`, "REQUIRED");
    }

    invalidFormat(field: string, expectedFormat: string): this {
        return this.addError(field, `${field} has an invalid format (expected: ${expectedFormat})`, "INVALID_FORMAT");
    }

    tooLong(field: string, maxLength: number): this {
        return this.addError(field, `${field} must be ${maxLength} characters or fewer`, "TOO_LONG");
    }

    tooShort(field: string, minLength: number): this {
        return this.addError(field, `${field} must be at least ${minLength} characters`, "TOO_SHORT");
    }

    outOfRange(field: string, min: number, max: number): this {
        return this.addError(field, `${field} must be between ${min} and ${max}`, "OUT_OF_RANGE");
    }

    hasErrors(): boolean {
        return this.errors.length > 0;
    }

    build(): ValidationError {
        if (this.errors.length === 0) {
            throw new Error("ValidationError requires at least one field error");
        }
        return new ValidationError(this.errors);
    }

    buildIfErrors(): ValidationError | null {
        return this.errors.length > 0 ? new ValidationError(this.errors) : null;
    }
}

// Usage example
function validateCreateUser(data: unknown): ValidationError | null {
    const builder = ValidationError.builder();

    if (!data || typeof data !== "object") {
        builder.addError("body", "Invalid request body", "INVALID_BODY");
        return builder.build();
    }

    const { name, email, password, age } = data as any;

    if (!name) builder.required("name");
    else if (name.length > 100) builder.tooLong("name", 100);

    if (!email) builder.required("email");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        builder.invalidFormat("email", "user@example.com");
    }

    if (!password) builder.required("password");
    else if (password.length < 8) builder.tooShort("password", 8);

    if (age !== undefined && (age < 0 || age > 150)) {
        builder.outOfRange("age", 0, 150);
    }

    return builder.buildIfErrors();
}

// ---------- Business Logic ----------
class InsufficientBalanceError extends AppError {
    readonly code = "INSUFFICIENT_BALANCE";
    readonly httpStatus = 400;
    constructor(
        public readonly required: number,
        public readonly available: number,
        public readonly currency: string = "JPY",
    ) {
        super(`Insufficient balance: ${required.toLocaleString()} ${currency} required, ${available.toLocaleString()} ${currency} available`);
    }
}

class OrderAlreadyCancelledError extends AppError {
    readonly code = "ORDER_ALREADY_CANCELLED";
    readonly httpStatus = 400;
    constructor(
        public readonly orderId: string,
        public readonly cancelledAt: Date,
    ) {
        super(`Order ${orderId} has already been cancelled (${cancelledAt.toISOString()})`);
    }
}

class StockNotAvailableError extends AppError {
    readonly code = "STOCK_NOT_AVAILABLE";
    readonly httpStatus = 400;
    constructor(
        public readonly productId: string,
        public readonly requested: number,
        public readonly available: number,
    ) {
        super(`Out of stock: product ${productId} (requested: ${requested}, available: ${available})`);
    }
}

class RateLimitExceededError extends AppError {
    readonly code = "RATE_LIMIT_EXCEEDED";
    readonly httpStatus = 429;
    constructor(
        public readonly limit: number,
        public readonly windowMs: number,
        public readonly retryAfterMs: number,
    ) {
        super(`Rate limit exceeded (${limit} requests / ${windowMs / 1000}s)`);
    }

    toResponse(): ErrorResponse {
        return {
            error: {
                code: this.code,
                message: this.message,
                timestamp: this.timestamp,
                retryAfter: Math.ceil(this.retryAfterMs / 1000),
            }
        };
    }
}

// ---------- External Services ----------
class ExternalServiceError extends AppError {
    readonly code = "EXTERNAL_SERVICE_ERROR";
    readonly httpStatus = 502;
    constructor(
        public readonly serviceName: string,
        public readonly serviceStatus?: number,
        options?: { cause?: Error }
    ) {
        super(
            `Error occurred in external service ${serviceName}${serviceStatus ? ` (HTTP ${serviceStatus})` : ''}`,
            true,
            options
        );
    }
}

class ServiceTimeoutError extends AppError {
    readonly code = "SERVICE_TIMEOUT";
    readonly httpStatus = 504;
    constructor(
        public readonly serviceName: string,
        public readonly timeoutMs: number,
    ) {
        super(`Connection to ${serviceName} timed out (${timeoutMs}ms)`);
    }
}

// ---------- Internal Errors ----------
class InternalError extends AppError {
    readonly code = "INTERNAL_ERROR";
    readonly httpStatus = 500;
    constructor(message: string, options?: { cause?: Error }) {
        super(message, false, options);  // isOperational = false
    }
}
```

---

## 3. Error Code System

### 3.1 Naming Conventions

```
Error Code Design:
  -> Unique string identifier
  -> Machine-readable (can be evaluated programmatically)
  -> Human-readable (understandable at a glance)

Naming Convention:
  {DOMAIN}_{ENTITY}_{ACTION}

  AUTH_TOKEN_EXPIRED         - Authentication token expired
  AUTH_CREDENTIALS_INVALID   - Invalid credentials
  USER_NOT_FOUND            - User not found
  USER_EMAIL_DUPLICATE      - Duplicate email
  ORDER_PAYMENT_FAILED      - Order payment failed
  ORDER_ALREADY_CANCELLED   - Order already cancelled
  RATE_LIMIT_EXCEEDED       - Rate limit exceeded
  INTERNAL_SERVER_ERROR     - Internal server error
```

### 3.2 Error Code Registry

```typescript
// Managing error codes as an enum
const ErrorCodes = {
  // Authentication
  AUTH_TOKEN_EXPIRED: { status: 401, message: "Token has expired" },
  AUTH_CREDENTIALS_INVALID: { status: 401, message: "Invalid credentials" },
  AUTH_FORBIDDEN: { status: 403, message: "Access forbidden" },

  // User
  USER_NOT_FOUND: { status: 404, message: "User not found" },
  USER_EMAIL_DUPLICATE: { status: 409, message: "Email address is already in use" },

  // Validation
  VALIDATION_ERROR: { status: 400, message: "Invalid input" },

  // Server
  INTERNAL_ERROR: { status: 500, message: "Server error occurred" },
} as const;

type ErrorCode = keyof typeof ErrorCodes;
```

### 3.3 Hierarchical Error Code Management

```typescript
// Hierarchical error code management
const ERROR_REGISTRY = {
    // ========== Authentication & Authorization ==========
    AUTH: {
        UNAUTHENTICATED: {
            httpStatus: 401,
            message: "Authentication required",
            retryable: false,
            userMessage: "Please log in",
        },
        TOKEN_EXPIRED: {
            httpStatus: 401,
            message: "Token has expired",
            retryable: true,
            userMessage: "Your session has expired. Please log in again",
        },
        INVALID_TOKEN: {
            httpStatus: 401,
            message: "Invalid token",
            retryable: false,
            userMessage: "Authentication failed. Please log in again",
        },
        FORBIDDEN: {
            httpStatus: 403,
            message: "Permission denied",
            retryable: false,
            userMessage: "You do not have permission to perform this action",
        },
    },

    // ========== User ==========
    USER: {
        NOT_FOUND: {
            httpStatus: 404,
            message: "User not found",
            retryable: false,
            userMessage: "The specified user does not exist",
        },
        EMAIL_DUPLICATE: {
            httpStatus: 409,
            message: "Duplicate email address",
            retryable: false,
            userMessage: "This email address is already registered",
        },
        PROFILE_INCOMPLETE: {
            httpStatus: 400,
            message: "Incomplete profile",
            retryable: false,
            userMessage: "Please fill in the required information",
        },
    },

    // ========== Order ==========
    ORDER: {
        NOT_FOUND: {
            httpStatus: 404,
            message: "Order not found",
            retryable: false,
            userMessage: "The specified order does not exist",
        },
        PAYMENT_FAILED: {
            httpStatus: 400,
            message: "Payment failed",
            retryable: true,
            userMessage: "We could not process your payment. Please try a different payment method",
        },
        ALREADY_CANCELLED: {
            httpStatus: 400,
            message: "Order already cancelled",
            retryable: false,
            userMessage: "This order has already been cancelled",
        },
        STOCK_UNAVAILABLE: {
            httpStatus: 400,
            message: "Out of stock",
            retryable: false,
            userMessage: "Sorry, this item is currently out of stock",
        },
    },

    // ========== System ==========
    SYSTEM: {
        INTERNAL_ERROR: {
            httpStatus: 500,
            message: "Internal error occurred",
            retryable: true,
            userMessage: "A server error occurred. Please wait and try again",
        },
        SERVICE_UNAVAILABLE: {
            httpStatus: 503,
            message: "Service temporarily unavailable",
            retryable: true,
            userMessage: "Currently under maintenance. Please try again later",
        },
        RATE_LIMITED: {
            httpStatus: 429,
            message: "Too many requests",
            retryable: true,
            userMessage: "Request frequency is too high. Please wait and try again",
        },
    },

    // ========== Validation ==========
    VALIDATION: {
        INVALID_INPUT: {
            httpStatus: 400,
            message: "Invalid input",
            retryable: false,
            userMessage: "There are errors in your input. Please check and re-enter",
        },
        MISSING_FIELD: {
            httpStatus: 400,
            message: "Required field is missing",
            retryable: false,
            userMessage: "Please fill in the required fields",
        },
        INVALID_FORMAT: {
            httpStatus: 400,
            message: "Invalid format",
            retryable: false,
            userMessage: "Please enter in the correct format",
        },
    },
} as const;

// Type-safe error code retrieval
type ErrorDomain = keyof typeof ERROR_REGISTRY;
type ErrorCodeOf<D extends ErrorDomain> = keyof typeof ERROR_REGISTRY[D];

function getErrorInfo<D extends ErrorDomain>(
    domain: D,
    code: ErrorCodeOf<D>
): typeof ERROR_REGISTRY[D][ErrorCodeOf<D>] {
    return ERROR_REGISTRY[domain][code];
}

// Usage example
const info = getErrorInfo('AUTH', 'TOKEN_EXPIRED');
// info.httpStatus === 401
// info.message === "Token has expired"
// info.retryable === true
```

---

## 4. Error Design in Rust

### 4.1 Custom Errors with thiserror

```rust
// Rust: Custom errors with the thiserror crate
use thiserror::Error;

#[derive(Error, Debug)]
pub enum AppError {
    #[error("User not found: {user_id}")]
    UserNotFound { user_id: String },

    #[error("Email already exists: {email}")]
    EmailAlreadyExists { email: String },

    #[error("Validation error: {0}")]
    Validation(String),

    #[error("Database error")]
    Database(#[from] sqlx::Error),

    #[error("External API error")]
    ExternalApi(#[from] reqwest::Error),

    #[error("Internal error: {0}")]
    Internal(String),
}

impl AppError {
    pub fn status_code(&self) -> u16 {
        match self {
            Self::UserNotFound { .. } => 404,
            Self::EmailAlreadyExists { .. } => 409,
            Self::Validation(_) => 400,
            Self::Database(_) => 500,
            Self::ExternalApi(_) => 502,
            Self::Internal(_) => 500,
        }
    }
}
```

### 4.2 Error Hierarchy

```rust
// Separate error types per domain
use thiserror::Error;

// User domain errors
#[derive(Error, Debug)]
pub enum UserError {
    #[error("User not found: {0}")]
    NotFound(String),

    #[error("Email already exists: {0}")]
    EmailDuplicate(String),

    #[error("Invalid user data: {0}")]
    InvalidData(String),

    #[error("User is deactivated: {0}")]
    Deactivated(String),
}

// Order domain errors
#[derive(Error, Debug)]
pub enum OrderError {
    #[error("Order not found: {0}")]
    NotFound(String),

    #[error("Insufficient balance: required {required}, available {available}")]
    InsufficientBalance { required: f64, available: f64 },

    #[error("Order already cancelled: {0}")]
    AlreadyCancelled(String),

    #[error("Stock not available: product {product_id}, requested {requested}, available {available}")]
    StockNotAvailable {
        product_id: String,
        requested: u32,
        available: u32,
    },
}

// Application-wide error (aggregating domain errors)
#[derive(Error, Debug)]
pub enum AppError {
    #[error(transparent)]
    User(#[from] UserError),

    #[error(transparent)]
    Order(#[from] OrderError),

    #[error("Authentication error: {0}")]
    Auth(String),

    #[error("Database error")]
    Database(#[from] sqlx::Error),

    #[error("Internal error: {0}")]
    Internal(String),
}

// Response conversion for Actix-web
impl actix_web::ResponseError for AppError {
    fn error_response(&self) -> actix_web::HttpResponse {
        let status = self.status_code();
        let body = serde_json::json!({
            "error": {
                "code": self.error_code(),
                "message": self.to_string(),
            }
        });
        actix_web::HttpResponse::build(status).json(body)
    }

    fn status_code(&self) -> actix_web::http::StatusCode {
        use actix_web::http::StatusCode;
        match self {
            AppError::User(UserError::NotFound(_)) => StatusCode::NOT_FOUND,
            AppError::User(UserError::EmailDuplicate(_)) => StatusCode::CONFLICT,
            AppError::User(UserError::InvalidData(_)) => StatusCode::BAD_REQUEST,
            AppError::Order(OrderError::NotFound(_)) => StatusCode::NOT_FOUND,
            AppError::Order(OrderError::InsufficientBalance { .. }) => StatusCode::BAD_REQUEST,
            AppError::Auth(_) => StatusCode::UNAUTHORIZED,
            AppError::Database(_) => StatusCode::INTERNAL_SERVER_ERROR,
            AppError::Internal(_) => StatusCode::INTERNAL_SERVER_ERROR,
            _ => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }
}

impl AppError {
    fn error_code(&self) -> &str {
        match self {
            AppError::User(UserError::NotFound(_)) => "USER_NOT_FOUND",
            AppError::User(UserError::EmailDuplicate(_)) => "USER_EMAIL_DUPLICATE",
            AppError::User(UserError::InvalidData(_)) => "USER_INVALID_DATA",
            AppError::Order(OrderError::NotFound(_)) => "ORDER_NOT_FOUND",
            AppError::Order(OrderError::InsufficientBalance { .. }) => "INSUFFICIENT_BALANCE",
            AppError::Order(OrderError::AlreadyCancelled(_)) => "ORDER_ALREADY_CANCELLED",
            AppError::Auth(_) => "AUTHENTICATION_ERROR",
            AppError::Database(_) => "DATABASE_ERROR",
            AppError::Internal(_) => "INTERNAL_ERROR",
            _ => "UNKNOWN_ERROR",
        }
    }
}
```

---

## 5. Custom Errors in Python

### 5.1 Error Hierarchy Design

```python
# Python: Custom exception hierarchy
from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Optional
import traceback

class AppError(Exception):
    """Base class for application errors"""
    code: str = "INTERNAL_ERROR"
    http_status: int = 500
    is_operational: bool = True

    def __init__(
        self,
        message: str,
        *,
        code: Optional[str] = None,
        http_status: Optional[int] = None,
        cause: Optional[Exception] = None,
        context: Optional[dict[str, Any]] = None,
    ):
        super().__init__(message)
        if code:
            self.code = code
        if http_status:
            self.http_status = http_status
        self.timestamp = datetime.utcnow().isoformat()
        self.context = context or {}
        if cause:
            self.__cause__ = cause

    def to_dict(self) -> dict:
        """Convert to dict for API response"""
        result = {
            "error": {
                "code": self.code,
                "message": str(self),
                "timestamp": self.timestamp,
            }
        }
        return result

    def to_log(self) -> dict:
        """Convert to dict for logging (includes internal information)"""
        return {
            "type": type(self).__name__,
            "code": self.code,
            "message": str(self),
            "http_status": self.http_status,
            "is_operational": self.is_operational,
            "context": self.context,
            "timestamp": self.timestamp,
            "traceback": traceback.format_exc() if self.__traceback__ else None,
            "cause": str(self.__cause__) if self.__cause__ else None,
        }


# ========== Authentication ==========
class AuthenticationError(AppError):
    code = "AUTHENTICATION_REQUIRED"
    http_status = 401

    def __init__(self, message: str = "Authentication required", **kwargs):
        super().__init__(message, **kwargs)


class TokenExpiredError(AuthenticationError):
    code = "TOKEN_EXPIRED"

    def __init__(self, expired_at: datetime, **kwargs):
        self.expired_at = expired_at
        super().__init__(f"Token expired ({expired_at.isoformat()})", **kwargs)


class AuthorizationError(AppError):
    code = "FORBIDDEN"
    http_status = 403

    def __init__(
        self,
        required_permission: str,
        actual_permissions: list[str] | None = None,
        **kwargs,
    ):
        self.required_permission = required_permission
        self.actual_permissions = actual_permissions or []
        super().__init__(
            f"Insufficient permissions: {required_permission} required",
            **kwargs,
        )


# ========== Resources ==========
class NotFoundError(AppError):
    code = "NOT_FOUND"
    http_status = 404

    def __init__(self, resource_type: str, resource_id: str, **kwargs):
        self.resource_type = resource_type
        self.resource_id = resource_id
        super().__init__(
            f"{resource_type} not found: {resource_id}",
            **kwargs,
        )


class ConflictError(AppError):
    code = "CONFLICT"
    http_status = 409

    def __init__(self, resource_type: str, conflict_field: str, conflict_value: str, **kwargs):
        self.resource_type = resource_type
        self.conflict_field = conflict_field
        self.conflict_value = conflict_value
        super().__init__(
            f"{resource_type} {conflict_field} already exists: {conflict_value}",
            **kwargs,
        )


# ========== Validation ==========
@dataclass
class FieldError:
    field: str
    message: str
    code: str = "INVALID"
    value: Any = None


class ValidationError(AppError):
    code = "VALIDATION_ERROR"
    http_status = 400

    def __init__(self, field_errors: list[FieldError], **kwargs):
        self.field_errors = field_errors
        fields = ", ".join(e.field for e in field_errors)
        super().__init__(f"Invalid input: {fields}", **kwargs)

    def to_dict(self) -> dict:
        result = super().to_dict()
        result["error"]["details"] = [
            {"field": e.field, "message": e.message, "code": e.code}
            for e in self.field_errors
        ]
        return result


# ========== Business Logic ==========
class InsufficientBalanceError(AppError):
    code = "INSUFFICIENT_BALANCE"
    http_status = 400

    def __init__(self, required: float, available: float, currency: str = "JPY", **kwargs):
        self.required = required
        self.available = available
        self.currency = currency
        super().__init__(
            f"Insufficient balance: {required:,.0f} {currency} required, {available:,.0f} {currency} available",
            **kwargs,
        )


# ========== Usage Examples ==========
def get_user(user_id: str) -> User:
    user = user_repository.find_by_id(user_id)
    if user is None:
        raise NotFoundError("User", user_id)
    return user


def create_user(data: dict) -> User:
    # Validation
    errors = []
    if not data.get("name"):
        errors.append(FieldError(field="name", message="Name is required", code="REQUIRED"))
    if not data.get("email"):
        errors.append(FieldError(field="email", message="Email is required", code="REQUIRED"))
    elif not is_valid_email(data["email"]):
        errors.append(FieldError(field="email", message="Invalid email format", code="INVALID_FORMAT"))

    if errors:
        raise ValidationError(errors)

    # Duplicate check
    existing = user_repository.find_by_email(data["email"])
    if existing:
        raise ConflictError("User", "email", data["email"])

    return user_repository.create(data)
```

---

## 6. Custom Errors in Go

### 6.1 Structured Errors

```go
// Go: Structured custom errors
package apperror

import (
    "fmt"
    "net/http"
    "time"
)

// AppError: Base application error
type AppError struct {
    Code       string         `json:"code"`
    Message    string         `json:"message"`
    HTTPStatus int            `json:"-"`
    Timestamp  time.Time      `json:"timestamp"`
    Details    map[string]any `json:"details,omitempty"`
    Err        error          `json:"-"`  // Internal error (not exposed externally)
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

// Factory functions
func NewNotFound(resourceType, resourceID string) *AppError {
    return &AppError{
        Code:       "NOT_FOUND",
        Message:    fmt.Sprintf("%s not found: %s", resourceType, resourceID),
        HTTPStatus: http.StatusNotFound,
        Timestamp:  time.Now(),
        Details: map[string]any{
            "resource_type": resourceType,
            "resource_id":   resourceID,
        },
    }
}

func NewValidationError(fields map[string]string) *AppError {
    return &AppError{
        Code:       "VALIDATION_ERROR",
        Message:    "Invalid input",
        HTTPStatus: http.StatusBadRequest,
        Timestamp:  time.Now(),
        Details: map[string]any{
            "fields": fields,
        },
    }
}

func NewConflict(resourceType, field, value string) *AppError {
    return &AppError{
        Code:       "CONFLICT",
        Message:    fmt.Sprintf("%s %s already exists: %s", resourceType, field, value),
        HTTPStatus: http.StatusConflict,
        Timestamp:  time.Now(),
    }
}

func NewInternalError(message string, cause error) *AppError {
    return &AppError{
        Code:       "INTERNAL_ERROR",
        Message:    message,
        HTTPStatus: http.StatusInternalServerError,
        Timestamp:  time.Now(),
        Err:        cause,
    }
}

func NewUnauthorized(message string) *AppError {
    if message == "" {
        message = "Authentication required"
    }
    return &AppError{
        Code:       "UNAUTHORIZED",
        Message:    message,
        HTTPStatus: http.StatusUnauthorized,
        Timestamp:  time.Now(),
    }
}

func NewForbidden(requiredPermission string) *AppError {
    return &AppError{
        Code:       "FORBIDDEN",
        Message:    fmt.Sprintf("Insufficient permissions: %s required", requiredPermission),
        HTTPStatus: http.StatusForbidden,
        Timestamp:  time.Now(),
        Details: map[string]any{
            "required_permission": requiredPermission,
        },
    }
}

// Error checking
func IsNotFound(err error) bool {
    var appErr *AppError
    if errors.As(err, &appErr) {
        return appErr.Code == "NOT_FOUND"
    }
    return false
}

func IsValidationError(err error) bool {
    var appErr *AppError
    if errors.As(err, &appErr) {
        return appErr.Code == "VALIDATION_ERROR"
    }
    return false
}

// Convert to HTTP response
func (e *AppError) ToResponse() map[string]any {
    response := map[string]any{
        "error": map[string]any{
            "code":      e.Code,
            "message":   e.Message,
            "timestamp": e.Timestamp.Format(time.RFC3339),
        },
    }
    if len(e.Details) > 0 {
        response["error"].(map[string]any)["details"] = e.Details
    }
    return response
}
```

---

## 7. Error Design Principles

### 7.1 Fundamental Principles

```
1. Be specific with errors
   x throw new Error("Error occurred")
   o throw new UserNotFoundError(userId)

2. Include context in errors
   x "Not found"
   o "User not found: user-123"
   o { code: "USER_NOT_FOUND", userId: "user-123" }

3. Separate user-facing and developer-facing messages
   User: "Login failed"
   Developer: "Auth0 returned 429: rate limit exceeded for IP 192.168.1.1"

4. Error cause chains
   -> Make root causes traceable
   -> Error.cause (ES2022), Rust's source(), Go's %w

5. Errors should be immutable
   -> Do not modify state after creation
   -> Safe to pass around, safe to log
```

### 7.2 Error Message Design

```
Guidelines for developer-facing messages:

  1. What (what happened)
     -> "Database connection refused"
     -> "JSON parse error at position 42"

  2. Where (where it happened)
     -> "in UserService.createUser"
     -> "while processing order ORD-123"

  3. Why (why it happened, suspected cause)
     -> "connection pool exhausted (max: 10, active: 10)"
     -> "unexpected field 'naem' (did you mean 'name'?)"

  4. How (how to resolve it)
     -> "retry after 5 seconds"
     -> "check database connection settings"
     -> "contact support with error code ERR-123"

Guidelines for user-facing messages:

  1. State what happened concisely
     -> "Login failed"
     -> "Could not process your order"

  2. Be specific about what to do
     -> "Please check your password and try again"
     -> "Please try a different payment method"

  3. Avoid technical jargon
     x "A NullPointerException occurred"
     o "An unexpected error occurred"

  4. Do not blame the user
     x "Invalid email address"
     o "Please check the email address format"
```

### 7.3 Error Cause Chains

```typescript
// ES2022: Error.cause
class ServiceError extends Error {
    constructor(message: string, options?: { cause?: Error }) {
        super(message, options);
    }
}

// Building a cause chain
async function processOrder(orderId: string): Promise<Order> {
    try {
        const order = await orderRepository.findById(orderId);
        if (!order) throw new NotFoundError("Order", orderId);

        const payment = await paymentService.charge(order);
        return { ...order, paymentId: payment.id };
    } catch (error) {
        if (error instanceof NotFoundError) throw error;

        // Build the cause chain
        throw new ServiceError(
            `Failed to process order ${orderId}`,
            { cause: error as Error }
        );
    }
}

// Traversing the cause chain
function getAllCauses(error: Error): Error[] {
    const causes: Error[] = [error];
    let current: unknown = error.cause;
    while (current instanceof Error) {
        causes.push(current);
        current = current.cause;
    }
    return causes;
}

// Output all causes when logging
function logErrorChain(error: Error): void {
    const causes = getAllCauses(error);
    logger.error({
        message: error.message,
        chain: causes.map((e, i) => ({
            depth: i,
            type: e.name,
            message: e.message,
        })),
    });
}
```

---

## 8. Error Serialization and API Design

### 8.1 Standardizing API Error Responses

```typescript
// RFC 7807 compliant error response
interface ApiErrorResponse {
    type: string;        // Error type URI
    title: string;       // Human-readable summary
    status: number;      // HTTP status code
    detail?: string;     // Detailed description
    instance?: string;   // URI of the resource where the error occurred
    errors?: FieldError[];  // Validation error details
    retryAfter?: number;    // Seconds until retry
    requestId?: string;     // Request ID
}

// Generating error responses
function createApiErrorResponse(
    error: AppError,
    requestId: string,
    requestPath: string
): ApiErrorResponse {
    const base: ApiErrorResponse = {
        type: `https://api.example.com/errors/${error.code.toLowerCase()}`,
        title: error.message,
        status: error.httpStatus,
        instance: requestPath,
        requestId,
    };

    if (error instanceof ValidationError) {
        return {
            ...base,
            errors: error.fieldErrors,
        };
    }

    if (error instanceof RateLimitExceededError) {
        return {
            ...base,
            retryAfter: Math.ceil(error.retryAfterMs / 1000),
        };
    }

    return base;
}
```

### 8.2 Error Design in GraphQL

```typescript
// GraphQL: Error design
// In GraphQL, errors are expressed in the response body rather than relying on HTTP status codes

// Schema definition
const typeDefs = `
  type Query {
    user(id: ID!): UserResult!
  }

  union UserResult = User | UserError

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type UserError {
    code: String!
    message: String!
  }

  # Or an approach using extensions
`;

// Resolvers
const resolvers = {
    Query: {
        user: async (_: any, { id }: { id: string }) => {
            try {
                const user = await userService.getUser(id);
                return { __typename: 'User', ...user };
            } catch (error) {
                if (error instanceof NotFoundError) {
                    return {
                        __typename: 'UserError',
                        code: error.code,
                        message: error.message,
                    };
                }
                throw error;  // Unexpected errors propagate as GraphQL errors
            }
        },
    },
};

// formatError: Formatting GraphQL errors
const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (formattedError, error) => {
        // Hide internal error information
        if (error instanceof GraphQLError) {
            const originalError = error.extensions?.originalError;
            if (originalError instanceof AppError) {
                return {
                    message: originalError.message,
                    extensions: {
                        code: originalError.code,
                    },
                };
            }
        }

        // Unexpected errors
        return {
            message: 'Internal server error',
            extensions: {
                code: 'INTERNAL_ERROR',
            },
        };
    },
});
```

---

## 9. Error Internationalization (i18n)

### 9.1 Multilingual Error Messages

```typescript
// Error message internationalization
const ERROR_MESSAGES: Record<string, Record<string, string>> = {
    "USER_NOT_FOUND": {
        en: "User not found: {userId}",
        ja: "User not found: {userId}",
        zh: "User not found: {userId}",
    },
    "EMAIL_ALREADY_EXISTS": {
        en: "Email already registered: {email}",
        ja: "Email already registered: {email}",
        zh: "Email already registered: {email}",
    },
    "VALIDATION_REQUIRED": {
        en: "{field} is required",
        ja: "{field} is required",
        zh: "{field} is required",
    },
    "VALIDATION_TOO_LONG": {
        en: "{field} must be {maxLength} characters or less",
        ja: "{field} must be {maxLength} characters or less",
        zh: "{field} must be {maxLength} characters or less",
    },
};

function getLocalizedMessage(
    code: string,
    locale: string,
    params: Record<string, string | number> = {}
): string {
    const templates = ERROR_MESSAGES[code];
    if (!templates) return code;

    const template = templates[locale] || templates["en"] || code;

    return template.replace(/\{(\w+)\}/g, (_, key) => {
        return String(params[key] ?? `{${key}}`);
    });
}

// Usage example
const message = getLocalizedMessage(
    "USER_NOT_FOUND",
    "ja",
    { userId: "user-123" }
);
// "User not found: user-123"

// Locale retrieval in API middleware
function getLocale(req: Request): string {
    // 1. Query parameter
    if (req.query.locale) return req.query.locale as string;

    // 2. Accept-Language header
    const acceptLanguage = req.headers['accept-language'];
    if (acceptLanguage) {
        const preferred = acceptLanguage.split(',')[0].split('-')[0].trim();
        if (['en', 'ja', 'zh'].includes(preferred)) return preferred;
    }

    // 3. Default
    return 'en';
}

// Integration into error responses
function createLocalizedErrorResponse(
    error: AppError,
    locale: string
): ErrorResponse {
    return {
        error: {
            code: error.code,
            message: getLocalizedMessage(error.code, locale, error.params),
            timestamp: error.timestamp,
        }
    };
}
```

---

## 10. Testing Patterns

### 10.1 Testing Custom Errors

```typescript
// Unit tests for custom errors
describe("NotFoundError", () => {
    it("sets the correct properties", () => {
        const error = new NotFoundError("User", "user-123");

        expect(error).toBeInstanceOf(AppError);
        expect(error).toBeInstanceOf(NotFoundError);
        expect(error.code).toBe("NOT_FOUND");
        expect(error.httpStatus).toBe(404);
        expect(error.message).toBe("User not found: user-123");
        expect(error.resourceType).toBe("User");
        expect(error.resourceId).toBe("user-123");
        expect(error.isOperational).toBe(true);
        expect(error.timestamp).toBeDefined();
    });

    it("toResponse() returns the correct format", () => {
        const error = new NotFoundError("User", "user-123");
        const response = error.toResponse();

        expect(response).toEqual({
            error: {
                code: "NOT_FOUND",
                message: expect.stringContaining("user-123"),
                timestamp: expect.any(String),
            }
        });
    });

    it("includes a stack trace", () => {
        const error = new NotFoundError("User", "user-123");
        expect(error.stack).toBeDefined();
        expect(error.stack).toContain("NotFoundError");
    });
});

describe("ValidationError", () => {
    it("can be built using the builder pattern", () => {
        const error = ValidationError.builder()
            .required("name")
            .invalidFormat("email", "user@example.com")
            .tooShort("password", 8)
            .build();

        expect(error.fieldErrors).toHaveLength(3);
        expect(error.fieldErrors[0].field).toBe("name");
        expect(error.fieldErrors[1].field).toBe("email");
        expect(error.fieldErrors[2].field).toBe("password");
    });

    it("buildIfErrors() returns null when there are no errors", () => {
        const error = ValidationError.builder().buildIfErrors();
        expect(error).toBeNull();
    });
});
```

---


## FAQ

### Q1: What is the most important point when studying this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory but by actually writing code and verifying its behavior.

### Q2: What are common mistakes beginners make?

Skipping the fundamentals and jumping to advanced topics. We recommend thoroughly understanding the basic concepts explained in this guide before moving on to the next step.

### Q3: How is this applied in professional practice?

Knowledge of this topic is frequently used in day-to-day development work. It becomes especially important during code reviews and architecture design.

---

## Summary

| Principle | Key Point |
|-----------|-----------|
| Classification | Operational errors vs programmer errors |
| Codes | DOMAIN_ENTITY_ACTION naming convention |
| Context | Include sufficient information in errors |
| Separation | User-facing vs developer-facing messages |
| Chaining | Make root causes traceable |
| Internationalization | Error codes + message templates |
| Testing | Test properties, serialization, and builders |

---

## Recommended Next Guides

---

## References
1. Goldberg, J. "Error Handling in Node.js." joyent.com, 2014.
2. RFC 7807. "Problem Details for HTTP APIs."
3. thiserror crate. Rust Documentation.
4. NestJS Documentation. "Exception Filters."
5. Python Documentation. "Built-in Exceptions."
6. Go Blog. "Working with Errors in Go 1.13."



===== SOURCE: 02-programming/async-and-error-handling/docs/03-advanced/00-event-loop.md =====

# The Event Loop

> The event loop is the heart of asynchronous processing in Node.js and browsers. By understanding microtasks, macrotasks, and execution order, you can accurately predict the behavior of asynchronous code.

## What You Will Learn in This Chapter

- [ ] Understand the mechanics and phases of the event loop
- [ ] Grasp the execution order of microtasks and macrotasks
- [ ] Learn best practices for avoiding event loop blocking
- [ ] Understand the differences between Node.js and browser event loops
- [ ] Master the use of Worker Threads / Web Workers
- [ ] Acquire performance measurement and debugging techniques


## Prerequisites

Before reading this guide, the following knowledge will help deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts

---

## 1. Overview of the Event Loop

```
Node.js Event Loop (libuv-based):

  ┌──────────────────────────────────────┐
  │           Event Loop                 │
  │                                      │
  │   ┌─────────────────────┐            │
  │   │ timers              │ ← setTimeout, setInterval │
  │   └──────────┬──────────┘            │
  │   ┌──────────▼──────────┐            │
  │   │ pending callbacks   │ ← I/O callbacks │
  │   └──────────┬──────────┘            │
  │   ┌──────────▼──────────┐            │
  │   │ idle, prepare       │ ← Internal use │
  │   └──────────┬──────────┘            │
  │   ┌──────────▼──────────┐            │
  │   │ poll                │ ← Retrieve I/O events │
  │   └──────────┬──────────┘            │
  │   ┌──────────▼──────────┐            │
  │   │ check               │ ← setImmediate │
  │   └──────────┬──────────┘            │
  │   ┌──────────▼──────────┐            │
  │   │ close callbacks     │ ← close events │
  │   └──────────┬──────────┘            │
  │              └──→ Next loop          │
  └──────────────────────────────────────┘

  Between each phase:
    → Process the process.nextTick() queue
    → Process the Promise microtask queue
```

### 1.1 Details of Each Phase

```
timers phase:
  → Executes callbacks for setTimeout() and setInterval()
  → Minimum delay is 1ms (even if 0 is specified, it is rounded up to 1ms)
  → Timers execute "at least N ms later," not exactly N ms later
  → A large number of timers will consume time in this phase

pending callbacks phase:
  → Executes I/O callbacks deferred from the previous iteration
  → Callbacks for system operations such as TCP connection errors
  → Example: callbacks for ECONNREFUSED errors

idle, prepare phase:
  → Used internally by Node.js only
  → Not directly accessible from user code

poll phase (the most important):
  → Retrieves new I/O events and executes I/O callbacks
  → Processes fs.readFile, HTTP request responses, DB query results, etc.
  → May block in this phase (if there are no other tasks)
  → Block duration is capped at the nearest timer in the next timers phase

check phase:
  → Executes setImmediate() callbacks
  → Guaranteed to execute immediately after the poll phase
  → Inside I/O callbacks, executes before setTimeout(fn, 0)

close callbacks phase:
  → Handles close events such as socket.on('close', ...)
  → Used for cleanup processing
```

### 1.2 Overall Execution Flow

```
Node.js Process Startup
    │
    ▼
┌──────────────────────────────────────┐
│ 1. Module loading and compilation    │
│    → Resolve require() / import      │
│    → Synchronous execution of        │
│      top-level code                  │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│ 2. Process the process.nextTick      │
│    queue                             │
│    → Process the microtask queue     │
└──────────────────┬───────────────────┘
                   │
                   ▼
┌──────────────────────────────────────┐
│ 3. Event Loop Starts                 │
│    ┌─→ timers                        │
│    │   → nextTick + microtasks       │
│    │   pending callbacks             │
│    │   → nextTick + microtasks       │
│    │   idle, prepare                 │
│    │   → nextTick + microtasks       │
│    │   poll (I/O wait)               │
│    │   → nextTick + microtasks       │
│    │   check (setImmediate)          │
│    │   → nextTick + microtasks       │
│    │   close callbacks               │
│    │   → nextTick + microtasks       │
│    └─← Next iteration               │
└──────────────────────────────────────┘
                   │
                   ▼ (When there are no more tasks to process)
┌──────────────────────────────────────┐
│ 4. Process Exit                      │
│    → Emit 'exit' event              │
│    → process.exit()                  │
└──────────────────────────────────────┘
```

---

## 2. Microtasks vs Macrotasks

```
Microtasks (Priority: High):
  → Promise.then/catch/finally
  → queueMicrotask()
  → process.nextTick() (Node.js, highest priority)
  → MutationObserver (Browser)

Macrotasks (Priority: Low):
  → setTimeout / setInterval
  → setImmediate (Node.js)
  → I/O callbacks
  → UI rendering (Browser)
  → requestAnimationFrame (Browser, before rendering)
  → MessageChannel

Execution Order:
  1. The call stack becomes empty
  2. Process all microtask queues
  3. Process one macrotask
  4. → Return to step 2

Priority Order in Node.js:
  process.nextTick > Promise microtask > setImmediate > setTimeout
```

### 2.1 Basic Execution Order

```javascript
// Execution order quiz
console.log("1: Synchronous");

setTimeout(() => console.log("2: setTimeout"), 0);

Promise.resolve().then(() => console.log("3: Promise"));

queueMicrotask(() => console.log("4: queueMicrotask"));

console.log("5: Synchronous");

// Output:
// 1: Synchronous
// 5: Synchronous
// 3: Promise        ← Microtask
// 4: queueMicrotask ← Microtask
// 2: setTimeout     ← Macrotask
```

### 2.2 Nested Asynchronous Processing

```javascript
// A slightly more complex example
console.log("start");

setTimeout(() => {
  console.log("timeout 1");
  Promise.resolve().then(() => console.log("promise in timeout"));
}, 0);

Promise.resolve().then(() => {
  console.log("promise 1");
  setTimeout(() => console.log("timeout in promise"), 0);
});

setTimeout(() => console.log("timeout 2"), 0);

console.log("end");

// Output:
// start
// end
// promise 1          ← Microtask
// timeout 1          ← Macrotask 1
// promise in timeout ← Microtask within timeout 1
// timeout 2          ← Macrotask 2
// timeout in promise ← Macrotask within promise 1
```

### 2.3 process.nextTick vs Promise vs queueMicrotask

```javascript
// Priority order in Node.js
console.log("1: Synchronous");

process.nextTick(() => {
  console.log("2: nextTick");
});

Promise.resolve().then(() => {
  console.log("3: Promise");
});

queueMicrotask(() => {
  console.log("4: queueMicrotask");
});

setImmediate(() => {
  console.log("5: setImmediate");
});

setTimeout(() => {
  console.log("6: setTimeout");
}, 0);

console.log("7: Synchronous");

// Output:
// 1: Synchronous
// 7: Synchronous
// 2: nextTick           ← nextTick queue (highest priority)
// 3: Promise            ← Microtask queue
// 4: queueMicrotask     ← Microtask queue
// 5: setImmediate       ← check phase
// 6: setTimeout         ← timers phase
// Note: The order of setImmediate and setTimeout(,0) may vary depending on timing
```

### 2.4 Danger of Recursive nextTick Calls

```javascript
// Bad: nextTick starvation problem
// When nextTick is called recursively, the event loop cannot progress
function recursiveNextTick() {
  process.nextTick(() => {
    console.log("nextTick");
    recursiveNextTick(); // nextTick executes forever
  });
}
recursiveNextTick();
// setTimeout callbacks will never execute!

// Good: Use setImmediate (allows one event loop iteration)
function recursiveImmediate() {
  setImmediate(() => {
    console.log("immediate");
    recursiveImmediate(); // Other tasks have a chance to execute
  });
}
```

### 2.5 Advanced Execution Order Puzzles

```javascript
// Execution order with async/await
async function asyncA() {
  console.log("A1");
  await Promise.resolve();
  console.log("A2");
}

async function asyncB() {
  console.log("B1");
  await asyncA();
  console.log("B2");
}

console.log("start");

asyncB();

Promise.resolve().then(() => console.log("P1"));

console.log("end");

// Output:
// start
// B1
// A1        ← Synchronous part of asyncA
// end
// A2        ← After await (microtask)
// P1        ← Promise.then (microtask)
// B2        ← After await asyncA() (microtask)

// Key points:
// - The portion of an async function before await executes synchronously
// - await is internally converted to .then()
// - The continuation after each await is queued as a microtask
```

```javascript
// Promise chain execution order
Promise.resolve()
  .then(() => console.log("then 1"))
  .then(() => console.log("then 2"))
  .then(() => console.log("then 3"));

Promise.resolve()
  .then(() => console.log("then A"))
  .then(() => console.log("then B"))
  .then(() => console.log("then C"));

// Output:
// then 1  ← First stage of the first Promise chain
// then A  ← First stage of the second Promise chain
// then 2  ← Second stage of the first Promise chain
// then B  ← Second stage of the second Promise chain
// then 3  ← Third stage of the first Promise chain
// then C  ← Third stage of the second Promise chain

// Key point: .then() is added to the microtask queue one stage at a time.
// When the first .then() executes, the next .then() is added to the queue.
// This results in round-robin-like alternating execution.
```

---

## 3. Blocking the Event Loop

```
Operations that block the event loop:
  → Synchronous file I/O (fs.readFileSync)
  → Heavy computation (encryption, image processing)
  → Parsing large JSON (JSON.parse)
  → Exponential backtracking in regular expressions
  → Infinite loops / long-running loops
  → Synchronous HTTP requests
  → Sorting large arrays

Impact of blocking:
  → All asynchronous processing stops
  → HTTP requests become unresponsive
  → WebSocket messages are delayed
  → Timers become inaccurate
  → Health checks time out
  → Clients receive timeout errors

Countermeasures:
  1. Do not use synchronous APIs (use fs.readFile, not fs.readFileSync)
  2. Delegate CPU-intensive processing to Worker threads
  3. Split large loops (yield with setImmediate)
  4. Use streaming to split large data
  5. Validate regex safety (ReDoS prevention)
```

### 3.1 Detecting and Avoiding Blocking

```javascript
// Bad: Blocking
function processLargeArray(items) {
  for (const item of items) { // 1 million items
    heavyComputation(item);   // Event loop stops
  }
}

// Good: Batched execution (yield control to event loop with setImmediate)
async function processLargeArrayAsync(items, batchSize = 1000) {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    for (const item of batch) {
      heavyComputation(item);
    }
    // Yield control to the event loop between batches
    await new Promise(resolve => setImmediate(resolve));
  }
}

// Good: Parallel execution with Worker Threads
const { Worker } = require('worker_threads');
function runInWorker(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./heavy-task.js', { workerData: data });
    worker.on('message', resolve);
    worker.on('error', reject);
  });
}
```

### 3.2 Streaming Large JSON

```javascript
const { createReadStream } = require('fs');
const { pipeline } = require('stream/promises');
const JSONStream = require('jsonstream2');

// Bad: Loading large JSON all at once (memory + blocking issues)
async function processLargeJsonBad(filePath) {
  const data = JSON.parse(await fs.readFile(filePath, 'utf8')); // 500MB → blocks
  for (const item of data) {
    await processItem(item);
  }
}

// Good: Streaming sequential processing
async function processLargeJsonGood(filePath) {
  const stream = createReadStream(filePath)
    .pipe(JSONStream.parse('*')); // Emit each array element one at a time

  for await (const item of stream) {
    await processItem(item);
  }
}

// Good: Streaming NDJSON (Newline Delimited JSON)
const readline = require('readline');

async function processNDJSON(filePath) {
  const rl = readline.createInterface({
    input: createReadStream(filePath),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (line.trim()) {
      const item = JSON.parse(line);
      await processItem(item);
    }
  }
}
```

### 3.3 Regex Backtracking Prevention (ReDoS)

```javascript
// Bad: Dangerous regex (exponential backtracking)
const dangerousRegex = /^(a+)+$/;
// Takes exponential time against "aaaaaaaaaaaaaaaaab"

// Bad: This is also a ReDoS vulnerability
const emailRegex = /^([a-zA-Z0-9]+\.)*[a-zA-Z0-9]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*$/;

// Good: Writing safe regular expressions
// 1. Use specific character classes that avoid backtracking
const safeEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 2. Use the re2 library (a regex engine that does not backtrack)
const RE2 = require('re2');
const safeRegex = new RE2('^[a-z]+$');

// 3. Execute regex with a timeout
function safeRegexTest(regex, input, timeoutMs = 100) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(`
      const { parentPort, workerData } = require('worker_threads');
      const result = new RegExp(workerData.pattern).test(workerData.input);
      parentPort.postMessage(result);
    `, {
      eval: true,
      workerData: { pattern: regex.source, input },
    });

    const timeout = setTimeout(() => {
      worker.terminate();
      reject(new Error('Regex execution timed out'));
    }, timeoutMs);

    worker.on('message', result => {
      clearTimeout(timeout);
      resolve(result);
    });
  });
}
```

### 3.4 Monitoring the Event Loop

```javascript
// Measure event loop delay
function monitorEventLoop(thresholdMs = 100) {
  let lastTime = process.hrtime.bigint();

  setInterval(() => {
    const now = process.hrtime.bigint();
    const delta = Number(now - lastTime) / 1_000_000; // ns → ms
    const lag = delta - 1000; // Difference from the expected 1000ms

    if (lag > thresholdMs) {
      console.warn(`Event loop lag: ${lag.toFixed(1)}ms`);
    }

    lastTime = now;
  }, 1000);
}

// Precise measurement using perf_hooks
const { monitorEventLoopDelay } = require('perf_hooks');

const histogram = monitorEventLoopDelay({ resolution: 20 });
histogram.enable();

// Periodically output statistics
setInterval(() => {
  console.log({
    min: histogram.min / 1e6,      // ns → ms
    max: histogram.max / 1e6,
    mean: histogram.mean / 1e6,
    p50: histogram.percentile(50) / 1e6,
    p95: histogram.percentile(95) / 1e6,
    p99: histogram.percentile(99) / 1e6,
  });
  histogram.reset();
}, 10000);

// Expose as Prometheus metrics
const { collectDefaultMetrics, register, Histogram } = require('prom-client');

collectDefaultMetrics(); // Default metrics include event loop delay

const eventLoopLag = new Histogram({
  name: 'nodejs_eventloop_lag_seconds',
  help: 'Lag of event loop in seconds',
  buckets: [0.001, 0.005, 0.01, 0.05, 0.1, 0.5, 1],
});

// Health check endpoint
app.get('/health', (req, res) => {
  const h = monitorEventLoopDelay({ resolution: 20 });
  h.enable();
  setTimeout(() => {
    h.disable();
    const p99 = h.percentile(99) / 1e6;
    if (p99 > 500) {
      res.status(503).json({ status: 'unhealthy', eventLoopLag: p99 });
    } else {
      res.status(200).json({ status: 'healthy', eventLoopLag: p99 });
    }
  }, 1000);
});
```

---

## 4. Worker Threads (Node.js)

```javascript
// === Main Thread ===
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

// Worker Pool implementation
class WorkerPool {
  constructor(workerPath, numWorkers) {
    this.workerPath = workerPath;
    this.workers = [];
    this.freeWorkers = [];
    this.taskQueue = [];

    for (let i = 0; i < numWorkers; i++) {
      this.addWorker();
    }
  }

  addWorker() {
    const worker = new Worker(this.workerPath);
    worker.on('message', (result) => {
      // Resolve the task's Promise
      worker.currentResolve(result);
      worker.currentResolve = null;

      // If there are tasks in the queue, execute the next one
      if (this.taskQueue.length > 0) {
        const { data, resolve, reject } = this.taskQueue.shift();
        this.runTask(worker, data, resolve, reject);
      } else {
        this.freeWorkers.push(worker);
      }
    });

    worker.on('error', (err) => {
      if (worker.currentReject) {
        worker.currentReject(err);
      }
    });

    this.workers.push(worker);
    this.freeWorkers.push(worker);
  }

  runTask(worker, data, resolve, reject) {
    worker.currentResolve = resolve;
    worker.currentReject = reject;
    worker.postMessage(data);
  }

  execute(data) {
    return new Promise((resolve, reject) => {
      if (this.freeWorkers.length > 0) {
        const worker = this.freeWorkers.pop();
        this.runTask(worker, data, resolve, reject);
      } else {
        this.taskQueue.push({ data, resolve, reject });
      }
    });
  }

  async shutdown() {
    for (const worker of this.workers) {
      await worker.terminate();
    }
  }
}

// Usage example
const pool = new WorkerPool('./crypto-worker.js', 4); // 4 workers

// Compute hashes concurrently
async function hashPasswords(passwords) {
  const results = await Promise.all(
    passwords.map(pw => pool.execute({ password: pw }))
  );
  return results;
}

// === Worker Thread (crypto-worker.js) ===
const { parentPort } = require('worker_threads');
const crypto = require('crypto');

parentPort.on('message', ({ password }) => {
  // Execute CPU-intensive processing in the worker
  const hash = crypto.pbkdf2Sync(password, 'salt', 100000, 64, 'sha512');
  parentPort.postMessage(hash.toString('hex'));
});
```

### 4.1 Shared Memory with SharedArrayBuffer

```javascript
// Main thread
const { Worker } = require('worker_threads');

// Shared memory buffer (accessible from all workers)
const sharedBuffer = new SharedArrayBuffer(1024 * Int32Array.BYTES_PER_ELEMENT);
const sharedArray = new Int32Array(sharedBuffer);

// Multiple workers write to shared memory
const workers = [];
for (let i = 0; i < 4; i++) {
  const worker = new Worker('./shared-worker.js', {
    workerData: { buffer: sharedBuffer, workerId: i },
  });
  workers.push(worker);
}

// === shared-worker.js ===
const { parentPort, workerData } = require('worker_threads');
const { buffer, workerId } = workerData;
const sharedArray = new Int32Array(buffer);

// Thread-safe operations with Atomics
Atomics.add(sharedArray, 0, 1); // Atomic addition

// Inter-thread synchronization with Atomics.wait / Atomics.notify
Atomics.wait(sharedArray, 1, 0); // Wait while sharedArray[1] is 0
// ... Another thread wakes it with Atomics.notify(sharedArray, 1)

parentPort.postMessage({ done: true, workerId });
```

---

## 5. The Browser Event Loop

```
Browser Event Loop:

  ┌──────────────────────────────────┐
  │ 1. Execute one macrotask         │
  │ 2. Execute all microtasks        │
  │ 3. Render (if necessary)         │
  │    → requestAnimationFrame       │
  │    → Style calculation           │
  │    → Layout                      │
  │    → Paint                       │
  │ 4. → Return to step 1           │
  └──────────────────────────────────┘

  Important: If there are a large number of microtasks
  → Rendering is delayed
  → The UI appears to freeze

requestAnimationFrame:
  → Executes before the next render
  → Optimal for animations (60fps = 16.6ms interval)
  → A separate queue, neither microtask nor macrotask
```

### 5.1 requestAnimationFrame in Detail

```javascript
// requestAnimationFrame executes before rendering
console.log("1: Synchronous");

requestAnimationFrame(() => console.log("2: rAF"));

setTimeout(() => console.log("3: setTimeout"), 0);

Promise.resolve().then(() => console.log("4: Promise"));

console.log("5: Synchronous");

// Output:
// 1: Synchronous
// 5: Synchronous
// 4: Promise         ← Microtask
// 2: rAF             ← Before rendering (usually before setTimeout)
// 3: setTimeout      ← Macrotask
// Note: The order of rAF and setTimeout may differ depending on browser implementation

// === Smooth Animation ===
function animate(element, targetX, duration) {
  const startX = element.offsetLeft;
  const startTime = performance.now();

  function frame(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic

    element.style.left = startX + (targetX - startX) * eased + 'px';

    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

// === requestIdleCallback (low-priority tasks) ===
// Executes when the browser is in an idle state
function processNonUrgentWork(tasks) {
  function doWork(deadline) {
    // Check remaining time in the frame with deadline.timeRemaining()
    while (tasks.length > 0 && deadline.timeRemaining() > 1) {
      const task = tasks.shift();
      task();
    }

    if (tasks.length > 0) {
      requestIdleCallback(doWork);
    }
  }

  requestIdleCallback(doWork, { timeout: 5000 }); // Wait up to 5 seconds
}

// Usage example: Sending analytics
processNonUrgentWork([
  () => sendAnalytics('page_view', { path: location.pathname }),
  () => preloadImages(nextPageImages),
  () => prefetchData('/api/next-page'),
]);
```

### 5.2 Web Workers

```javascript
// === Main Thread ===
const worker = new Worker('worker.js');

// Sending and receiving messages
worker.postMessage({ type: 'process', data: largeDataset });

worker.onmessage = (event) => {
  const { result, stats } = event.data;
  updateUI(result);
  console.log('Processing stats:', stats);
};

worker.onerror = (error) => {
  console.error('Worker error:', error.message);
};

// Transferable Objects (ownership transfer, not copying)
const buffer = new ArrayBuffer(1024 * 1024); // 1MB
worker.postMessage({ buffer }, [buffer]); // Transfer (no copy)
// At this point, buffer is no longer usable

// === worker.js ===
self.onmessage = (event) => {
  const { type, data } = event.data;

  switch (type) {
    case 'process': {
      const startTime = performance.now();

      // CPU-intensive processing (does not block the main thread)
      const result = data.map(item => {
        return heavyComputation(item);
      });

      const duration = performance.now() - startTime;

      self.postMessage({
        result,
        stats: {
          itemCount: data.length,
          duration: `${duration.toFixed(2)}ms`,
        },
      });
      break;
    }
  }
};

// === Using Workers like RPC with the Comlink library ===
// Main thread
import * as Comlink from 'comlink';

const api = Comlink.wrap(new Worker('api-worker.js'));

// Call Worker methods as if calling them directly
const result = await api.processData(largeDataset);
const hash = await api.hashPassword('secret');

// api-worker.js
import * as Comlink from 'comlink';

const api = {
  processData(data) {
    return data.map(item => heavyComputation(item));
  },
  hashPassword(password) {
    // CPU-intensive hash computation
    return computeHash(password);
  },
};

Comlink.expose(api);
```

---

## 6. Node.js vs Browser Differences

```
┌──────────────────────────────────────────────────┐
│              Node.js vs Browser                    │
├─────────────────┬────────────────────────────────┤
│     Node.js     │         Browser                 │
├─────────────────┼────────────────────────────────┤
│ libuv-based     │ Browser engine proprietary impl │
│ 6 phases        │ Task queue + rendering          │
│ setImmediate ○  │ setImmediate △ (IE only)        │
│ nextTick ○      │ nextTick ✗                      │
│ Worker Threads  │ Web Workers                     │
│ No rendering    │ Rendering is interleaved        │
│ Multiple task   │ Single task queue (basic)       │
│   queues        │                                 │
│ fs, net, etc    │ DOM, fetch, etc                 │
│ Server-side     │ Client-side                     │
└─────────────────┴────────────────────────────────┘

setImmediate vs setTimeout(fn, 0):
  Node.js:
    → Inside I/O callbacks: setImmediate runs first
    → Top level: order is non-deterministic
  Browser:
    → Only setTimeout(fn, 0) (minimum delay 4ms)
    → setImmediate is non-standard
```

```javascript
// Node.js: Order inside I/O callbacks
const fs = require('fs');

fs.readFile('file.txt', () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
});

// Output (always in this order):
// immediate    ← I/O callback → check phase runs first
// timeout

// Node.js: Order at top level (non-deterministic)
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));

// Output (may vary between runs):
// timeout   or  immediate
// immediate     timeout
// → Depends on process startup timing
```

---

## 7. Practical Patterns

### 7.1 Async Iterators and the Event Loop

```javascript
// for-await-of and the event loop
const { once } = require('events');
const { createReadStream } = require('fs');

async function processFile(filePath) {
  const stream = createReadStream(filePath, { encoding: 'utf8' });
  let lineCount = 0;

  for await (const chunk of stream) {
    const lines = chunk.split('\n');
    for (const line of lines) {
      lineCount++;
      await processLine(line);

      // Yield control to the event loop every 1000 lines
      if (lineCount % 1000 === 0) {
        await new Promise(resolve => setImmediate(resolve));
      }
    }
  }

  return lineCount;
}
```

### 7.2 Promise.all and the Event Loop

```javascript
// Promise.all starts all Promises simultaneously
// → Running a large number of Promises concurrently can exhaust resources

// Bad: 10,000 HTTP requests simultaneously
const urls = Array(10000).fill('https://api.example.com/data');
const results = await Promise.all(urls.map(url => fetch(url)));
// → Socket exhaustion, memory pressure

// Good: Limit concurrency
async function promisePool(tasks, concurrency = 10) {
  const results = [];
  const executing = new Set();

  for (const [index, task] of tasks.entries()) {
    const promise = task().then(result => {
      executing.delete(promise);
      return result;
    });
    executing.add(promise);
    results[index] = promise;

    if (executing.size >= concurrency) {
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
}

// Usage
const results = await promisePool(
  urls.map(url => () => fetch(url).then(r => r.json())),
  10, // Maximum 10 concurrent
);
```

### 7.3 Graceful Shutdown

```javascript
const http = require('http');

const server = http.createServer(handler);

// Track new requests
const connections = new Set();
server.on('connection', (conn) => {
  connections.add(conn);
  conn.on('close', () => connections.delete(conn));
});

// Signal handling
let isShuttingDown = false;

async function gracefulShutdown(signal) {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(`${signal} received. Starting graceful shutdown...`);

  // 1. Stop accepting new requests
  server.close(() => {
    console.log('Server closed');
  });

  // 2. Mark health check as unhealthy (detach from load balancer)
  // → Check isShuttingDown in the /health endpoint

  // 3. Wait for in-progress requests to complete (max 30 seconds)
  const forceTimeout = setTimeout(() => {
    console.log('Force shutdown: destroying remaining connections');
    connections.forEach(conn => conn.destroy());
  }, 30000);

  // 4. Clean up resources
  try {
    await Promise.allSettled([
      db.end(),
      redis.quit(),
      messageQueue.close(),
    ]);
    console.log('Resources cleaned up');
  } catch (err) {
    console.error('Cleanup error:', err);
  }

  clearTimeout(forceTimeout);
  process.exit(0);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Health check
app.get('/health', (req, res) => {
  if (isShuttingDown) {
    res.status(503).json({ status: 'shutting-down' });
  } else {
    res.status(200).json({ status: 'healthy' });
  }
});
```

### 7.4 Timer Precision Issues

```javascript
// setTimeout(fn, 0) is not actually 0ms
// Node.js: minimum 1ms
// Browser: minimum 4ms (when nested 5 or more times)

// When high-precision timing is needed
function preciseTimeout(callback, ms) {
  const start = performance.now();

  function check() {
    const elapsed = performance.now() - start;
    if (elapsed >= ms) {
      callback();
    } else if (ms - elapsed > 10) {
      setTimeout(check, 0); // Wait roughly
    } else {
      // Busy-wait for the last milliseconds (for precision)
      setImmediate(check);
    }
  }

  if (ms <= 0) {
    setImmediate(callback);
  } else {
    setTimeout(check, Math.max(0, ms - 10));
  }
}

// setInterval "drift" problem
// Bad: Want to execute every 1 second, but it gradually drifts
let count = 0;
const start = Date.now();
setInterval(() => {
  count++;
  const expected = count * 1000;
  const actual = Date.now() - start;
  console.log(`Drift: ${actual - expected}ms`);
}, 1000);

// Good: Self-correcting timer
function preciseInterval(callback, intervalMs) {
  let expected = Date.now() + intervalMs;

  function step() {
    const drift = Date.now() - expected;
    callback();
    expected += intervalMs;
    setTimeout(step, Math.max(0, intervalMs - drift));
  }

  setTimeout(step, intervalMs);
}
```

---

## 8. Debugging and Troubleshooting

### 8.1 Common Problem Patterns

```javascript
// Problem 1: Callbacks executing in unintended order
function fetchAndProcess() {
  let result = null;

  fetch('/api/data')
    .then(r => r.json())
    .then(data => { result = data; });

  console.log(result); // null! (async processing has not completed)
}

// Problem 2: Unhandled Promise Rejection
// In Node.js 15+, this crashes the process
async function riskyOperation() {
  const data = await fetch('/api/data'); // Error is not caught
  return data.json();
}

riskyOperation(); // No .catch() or try-catch → UnhandledPromiseRejection

// Countermeasure: Global handlers
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  // Send logs and shut down gracefully
  gracefulShutdown('unhandledRejection');
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Shut down immediately (state may be inconsistent)
  process.exit(1);
});

// Problem 3: Memory leak (forgetting to remove event listeners)
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Bad: Listeners accumulate
function handleRequest(req) {
  emitter.on('data', (data) => {
    // A new listener is added for each request
    // → Memory leak
  });
}

// Good: Use once, or manually remove
function handleRequestFixed(req) {
  const handler = (data) => {
    // Processing
  };
  emitter.on('data', handler);

  // Remove when the request ends
  req.on('close', () => {
    emitter.removeListener('data', handler);
  });
}

// Detecting MaxListenersExceededWarning
emitter.setMaxListeners(20); // Default is 10
// If this warning appears, suspect a listener leak
```

### 8.2 Node.js Diagnostic Tools

```javascript
// Connect to Chrome DevTools with the --inspect flag
// node --inspect server.js
// Open chrome://inspect in Chrome

// CPU Profiling
const { writeHeapSnapshot } = require('v8');
const { Session } = require('inspector');

// Taking a heap snapshot
app.get('/debug/heap', (req, res) => {
  const filename = writeHeapSnapshot();
  res.json({ file: filename });
});

// Taking a CPU profile
app.get('/debug/profile', async (req, res) => {
  const session = new Session();
  session.connect();

  session.post('Profiler.enable');
  session.post('Profiler.start');

  // Profile for 10 seconds
  await new Promise(resolve => setTimeout(resolve, 10000));

  session.post('Profiler.stop', (err, { profile }) => {
    session.disconnect();
    // Save profile as a .cpuprofile file
    fs.writeFileSync('profile.cpuprofile', JSON.stringify(profile));
    res.json({ message: 'Profile saved' });
  });
});

// Tracking the event loop with async_hooks
const async_hooks = require('async_hooks');

const resources = new Map();

const hook = async_hooks.createHook({
  init(asyncId, type, triggerAsyncId) {
    resources.set(asyncId, { type, triggerAsyncId, created: Date.now() });
  },
  destroy(asyncId) {
    resources.delete(asyncId);
  },
});

// Enable (has performance overhead, use only for debugging)
hook.enable();

// Display active async resources
setInterval(() => {
  console.log(`Active async resources: ${resources.size}`);
  const types = {};
  for (const [, { type }] of resources) {
    types[type] = (types[type] || 0) + 1;
  }
  console.log(types);
}, 10000);
```


---

## Practical Exercises

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
        assert False, "An exception should have been raised"
    except ValueError:
        pass

    print("All tests passed!")

test_exercise1()
```

### Exercise 2: Advanced Patterns

Extend the basic implementation to add the following features.

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

    print(f"Inefficient version: {slow_time:.4f}s")
    print(f"Efficient version:   {fast_time:.6f}s")
    print(f"Speedup factor: {slow_time/fast_time:.0f}x")

benchmark()
```

**Key Points:**
- Be aware of algorithmic time complexity
- Choose appropriate data structures
- Measure results with benchmarks

---

## Design Decision Guide

### Selection Criteria Matrix

The following summarizes the criteria for making technical choices.

| Criterion | When to Prioritize | When Compromise is Acceptable |
|---------|------------|-------------|
| Performance | Real-time processing, large-scale data | Admin panels, batch processing |
| Maintainability | Long-term operation, team development | Prototypes, short-term projects |
| Scalability | Services expected to grow | Internal tools, fixed user base |
| Security | Personal data, financial data | Public data, internal use |
| Development Speed | MVP, time-to-market | Quality-focused, mission-critical |

### Architecture Pattern Selection

```
┌─────────────────────────────────────────────────┐
│          Architecture Selection Flow             │
├─────────────────────────────────────────────────┤
│                                                 │
│  (1) Team size?                                 │
│    ├─ Small (1-5 people) → Monolith             │
│    └─ Large (10+ people) → Go to (2)            │
│                                                 │
│  (2) Deployment frequency?                      │
│    ├─ Once a week or less → Monolith +          │
│    │    module separation                       │
│    └─ Daily / multiple times → Go to (3)        │
│                                                 │
│  (3) Team independence?                         │
│    ├─ High → Microservices                      │
│    └─ Moderate → Modular monolith               │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Trade-off Analysis

Technical decisions always involve trade-offs. Analyze from the following perspectives:

**1. Short-term vs Long-term Cost**
- A method that is faster in the short term may become technical debt in the long term
- Conversely, over-engineering incurs high short-term costs and can delay the project

**2. Consistency vs Flexibility**
- A unified technology stack has lower learning costs
- Adopting diverse technologies enables best-fit choices but increases operational costs

**3. Level of Abstraction**
- Higher abstraction improves reusability but can make debugging difficult
- Lower abstraction is more intuitive but tends to produce code duplication

```python
# Architecture Decision Record template
class ArchitectureDecisionRecord:
    """Create an ADR (Architecture Decision Record)"""

    def __init__(self, title: str):
        self.title = title
        self.context = ""
        self.decision = ""
        self.consequences = []
        self.alternatives = []

    def set_context(self, context: str):
        """Describe the background and challenges"""
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

## Real-World Application Scenarios

### Scenario 1: MVP Development at a Startup

**Situation:** Need to quickly release a product with limited resources

**Approach:**
- Choose a simple architecture
- Focus on the minimum viable feature set
- Automated tests only for the critical path
- Introduce monitoring from the start

**Lessons Learned:**
- Do not aim for perfection (YAGNI principle)
- Obtain user feedback early
- Manage technical debt consciously

### Scenario 2: Modernizing a Legacy System

**Situation:** Incrementally renovating a system that has been in operation for over 10 years

**Approach:**
- Use the Strangler Fig pattern for gradual migration
- If existing tests are missing, create Characterization Tests first
- Use an API gateway to coexist old and new systems
- Perform data migration in stages

| Phase | Work | Estimated Duration | Risk |
|---------|---------|---------|--------|
| 1. Investigation | Current state analysis, dependency mapping | 2-4 weeks | Low |
| 2. Foundation | CI/CD setup, test environment | 4-6 weeks | Low |
| 3. Migration Start | Migrate peripheral features first | 3-6 months | Medium |
| 4. Core Migration | Migrate core features | 6-12 months | High |
| 5. Completion | Decommission old system | 2-4 weeks | Medium |

### Scenario 3: Development with a Large Team

**Situation:** 50+ engineers developing the same product

**Approach:**
- Clarify boundaries with Domain-Driven Design
- Set ownership per team
- Manage shared libraries using Inner Source
- Design API-first to minimize inter-team dependencies

```python
# API contract definition between teams
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

# Usage example
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

### Scenario 4: Performance-Critical System

**Situation:** A system that requires millisecond-level response times

**Optimization Points:**
1. Caching strategy (L1: In-memory, L2: Redis, L3: CDN)
2. Leverage asynchronous processing
3. Connection pooling
4. Query optimization and index design

| Optimization Method | Effect | Implementation Cost | Use Case |
|-----------|------|-----------|---------|
| In-memory cache | High | Low | Frequently accessed data |
| CDN | High | Low | Static content |
| Async processing | Medium | Medium | I/O-heavy processing |
| DB optimization | High | High | When queries are slow |
| Code optimization | Low-Medium | High | CPU-bound cases |

---

## Leveraging in Team Development

### Code Review Checklist

Points to check in code reviews related to this topic:

- [ ] Are naming conventions consistent?
- [ ] Is error handling appropriate?
- [ ] Is test coverage sufficient?
- [ ] Is there any performance impact?
- [ ] Are there any security concerns?
- [ ] Is documentation updated?

### Best Practices for Knowledge Sharing

| Method | Frequency | Audience | Effect |
|------|------|------|------|
| Pair programming | As needed | Complex tasks | Immediate feedback |
| Tech talks | Weekly | Entire team | Horizontal knowledge spread |
| ADR (Decision records) | Per decision | Future members | Decision transparency |
| Retrospectives | Biweekly | Entire team | Continuous improvement |
| Mob programming | Monthly | Important designs | Consensus building |

### Managing Technical Debt

```
Priority Matrix:

        High Impact
          │
    ┌─────┼─────┐
    │ Plan │ Act  │
    │ for  │ imme-│
    │ later│ dia- │
    │      │ tely │
    ├─────┼─────┤
    │ Record│ Next │
    │ only │Sprint│
    │      │      │
    └─────┼─────┘
          │
        Low Impact
    Low Frequency  High Frequency
```
---


## FAQ

### Q1: What is the most important point when learning this topic?

Gaining practical experience is the most important thing. Understanding deepens not only through theory but by actually writing code and observing its behavior.

### Q2: What mistakes do beginners commonly make?

Skipping the fundamentals and jumping to advanced topics. We recommend thoroughly understanding the basic concepts explained in this guide before moving on to the next step.

### Q3: How is this applied in practice?

Knowledge of this topic is frequently used in daily development work. It becomes particularly important during code reviews and architecture design.

---

## Summary

| Concept | Key Points |
|------|---------|
| Event Loop | Scheduler for async processing, composed of 6 phases (Node.js) |
| Microtasks | Promise.then, all processed after each macrotask |
| Macrotasks | setTimeout, processed one at a time |
| process.nextTick | Higher priority than microtasks, beware of starvation |
| Avoiding Blocking | No synchronous I/O, use Workers, split execution |
| Browser | Rendering occurs between macrotasks, rAF runs before rendering |
| Worker Threads | Delegate CPU-intensive processing, shared memory via SharedArrayBuffer |
| Monitoring | perf_hooks, async_hooks, heap snapshots |
| Graceful Shutdown | Signal handling, resource cleanup, timeouts |

---

## 9. FAQ

### Q1: Is setTimeout(fn, 0) really 0ms?

The minimum delay in Node.js is 1ms. In browsers, it is typically 4ms (when nesting is 5 levels or deeper). This is defined by the specification. When precise timing is needed, use `performance.now()` for self-correction, or use `setImmediate` (Node.js) or `requestAnimationFrame` (Browser).

### Q2: How does async/await affect the event loop?

`async/await` is syntactic sugar that internally uses Promises. The code immediately after `await` is queued as a microtask. Therefore, `await` does not block the event loop. However, if the awaited target performs synchronously heavy computation, that computation itself will block the event loop.

### Q3: Should I use process.nextTick() or queueMicrotask()?

For new code, `queueMicrotask()` is recommended. `process.nextTick()` is Node.js-specific and has higher priority than microtasks, which can cause starvation problems. `queueMicrotask()` is a web standard and works in browsers as well. However, `process.nextTick()` is appropriate when you need to ensure execution before I/O callbacks.

### Q4: Does the process exit when the event loop becomes empty?

Yes. Node.js automatically exits when all event loop queues are empty and there are no pending I/O operations or timers. Active handles such as `setInterval` or `server.listen()` prevent the process from exiting. Calling `unref()` excludes a handle from the event loop count, allowing the process to exit if there are no other active handles.

### Q5: Are the event loops in Deno/Bun different from Node.js?

Deno is based on Tokio (Rust's async runtime), which differs from Node.js's libuv, but the concepts of microtasks/macrotasks are the same. Bun has its own event loop implementation (JavaScriptCore + liburing on Linux) that maintains high compatibility with Node.js while improving performance. The fundamental execution order rules are common across all environments.

---

## Recommended Next Reading

---

## References
1. Node.js Documentation. "The Node.js Event Loop."
2. Jake Archibald. "In The Loop." JSConf.Asia, 2018.
3. Node.js Documentation. "Worker Threads."
4. MDN Web Docs. "The event loop." developer.mozilla.org.
5. libuv Documentation. "Design overview." docs.libuv.org.
6. Erin Zimmer. "Further Adventures of the Event Loop." JSConf EU, 2018.



===== SOURCE: 02-programming/async-and-error-handling/docs/03-advanced/01-cancellation.md =====

# Cancellation

> Cancellation of asynchronous operations is often overlooked, but it is a critical technique that directly impacts UX and resource management. This guide covers AbortController, timeouts, and cancellation token implementations.

## Learning Objectives

- [ ] Understand scenarios where cancellation of async operations is necessary
- [ ] Learn how to use AbortController
- [ ] Learn timeout pattern implementations
- [ ] Compare cancellation mechanisms across languages
- [ ] Master production-level cancellation design
- [ ] Learn how to implement testable cancellation logic


## Prerequisites

Understanding the following will help you get the most out of this guide:

- Basic programming knowledge
- Understanding of related foundational concepts
- Familiarity with [Event Loop](./00-event-loop.md)

---

## 1. Why Cancellation Is Necessary

```
Scenarios where cancellation is needed:
  1. User navigates to a different page -> Cancel the previous page's API request
  2. Search box input -> Cancel the previous search request
  3. Timeout -> Cancel if no response within a certain time
  4. Component unmount -> Cancel ongoing operations
  5. User clicks the "Cancel" button
  6. Cleanup of in-progress operations during server shutdown
  7. Cancel operations when resource limits are reached
  8. Cancel one of competing operations (race pattern)

Without cancellation:
  -> Unnecessary network requests remain
  -> Memory leaks (setState after component destruction)
  -> Race conditions (old results overwrite new results)
  -> Wasted server resources
  -> Degraded user experience (displaying stale data)
  -> DB connection pool exhaustion
```

### 1.1 Types of Cancellation

```
Types of cancellation:

1. User-initiated cancellation
   -> Cancel button press
   -> Page navigation
   -> Component unmount
   -> Closing a browser tab

2. System-initiated cancellation
   -> Timeout
   -> Server shutdown
   -> Resource limit reached
   -> Cancellation propagation from parent task

3. Logic-initiated cancellation
   -> New request cancels the previous request
   -> Cancel others once the first result is obtained
   -> Cancel processing when conditions change

Cancellation levels:
  +----------------------------------------+
  | Application level                      |
  |  -> UI events, routing                 |
  |                                        |
  |  +------------------------------------+|
  |  | Service level                      ||
  |  |  -> API calls, batch processing    ||
  |  |                                    ||
  |  |  +--------------------------------+||
  |  |  | Resource level                 |||
  |  |  |  -> DB connections, file handles|||
  |  |  +--------------------------------+||
  |  +------------------------------------+|
  +----------------------------------------+
```

---

## 2. AbortController (Web Standard)

### 2.1 Basic Usage

```typescript
// Cancelling a fetch request
const controller = new AbortController();
const { signal } = controller;

// Start request
const promise = fetch('/api/data', { signal })
  .then(res => res.json())
  .catch(err => {
    if (err.name === 'AbortError') {
      console.log('Request was cancelled');
    } else {
      throw err;
    }
  });

// Cancel after 3 seconds
setTimeout(() => controller.abort(), 3000);

// Specify cancellation reason with AbortSignal.reason (2022+ spec)
controller.abort(new Error('User navigated away'));
controller.abort('timeout'); // Strings are also valid

// Get cancellation reason with signal.reason
signal.addEventListener('abort', () => {
  console.log('Abort reason:', signal.reason);
});
```

### 2.2 Usage Pattern in React

```typescript
// Usage in React
function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`/api/search?q=${query}`, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setResults(data);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
        // Ignore AbortError (component destroyed or query changed)
      });

    // Cleanup: Cancel on component destruction or query change
    return () => controller.abort();
  }, [query]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <ul>{results.map(r => <li key={r.id}>{r.name}</li>)}</ul>
    </div>
  );
}
```

### 2.3 Advanced AbortSignal Usage

```typescript
// AbortSignal.timeout(): Signal with timeout
const response = await fetch('/api/data', {
  signal: AbortSignal.timeout(5000), // 5-second timeout
});

// AbortSignal.any(): Combine multiple signals (2023+)
const userCancel = new AbortController();
const timeoutSignal = AbortSignal.timeout(30000);
const shutdownSignal = getShutdownSignal();

const combinedSignal = AbortSignal.any([
  userCancel.signal,
  timeoutSignal,
  shutdownSignal,
]);

fetch('/api/data', { signal: combinedSignal });
// -> Cancelled by user cancellation, timeout, or shutdown — whichever comes first

// Passing AbortSignal to custom APIs
class DataFetcher {
  async fetchWithRetry(
    url: string,
    options: { signal?: AbortSignal; maxRetries?: number } = {},
  ): Promise<Response> {
    const { signal, maxRetries = 3 } = options;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      // Check for cancellation
      signal?.throwIfAborted();

      try {
        const response = await fetch(url, { signal });
        if (response.ok) return response;

        if (response.status >= 500 && attempt < maxRetries) {
          // Retry on server errors
          await this.delay(Math.pow(2, attempt) * 1000, signal);
          continue;
        }

        throw new Error(`HTTP ${response.status}`);
      } catch (err) {
        if ((err as Error).name === 'AbortError') throw err;
        if (attempt === maxRetries) throw err;
      }
    }

    throw new Error('Max retries exceeded');
  }

  private delay(ms: number, signal?: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
      if (signal?.aborted) {
        reject(signal.reason);
        return;
      }

      const timer = setTimeout(resolve, ms);

      signal?.addEventListener('abort', () => {
        clearTimeout(timer);
        reject(signal.reason);
      }, { once: true });
    });
  }
}
```

### 2.4 AbortController in Node.js

```typescript
import { readFile, writeFile } from 'fs/promises';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { setTimeout as sleep } from 'timers/promises';

// Cancelling fs/promises operations
const controller = new AbortController();
const { signal } = controller;

// Cancel file reading
try {
  const data = await readFile('large-file.txt', { signal });
} catch (err) {
  if ((err as NodeJS.ErrnoException).code === 'ABORT_ERR') {
    console.log('File read cancelled');
  }
}

// Cancelling timers/promises
try {
  await sleep(60000, null, { signal }); // 60-second wait
} catch (err) {
  // Resolves immediately when signal is aborted
}

// Cancelling streams
const readStream = createReadStream('data.csv', { signal });
const writeStream = createWriteStream('output.csv', { signal });

try {
  await pipeline(readStream, transformStream, writeStream, { signal });
} catch (err) {
  if ((err as Error).name === 'AbortError') {
    console.log('Pipeline cancelled');
  }
}

// Cancelling EventEmitter
import { once } from 'events';

const controller2 = new AbortController();
try {
  const [data] = await once(emitter, 'data', { signal: controller2.signal });
} catch (err) {
  // Wait is cancelled when signal is aborted
}

// Detecting request cancellation in HTTP server
import http from 'http';

const server = http.createServer(async (req, res) => {
  const controller = new AbortController();

  // Cancel when client disconnects
  req.on('close', () => {
    if (!res.writableEnded) {
      controller.abort();
    }
  });

  try {
    const data = await fetchExpensiveData({ signal: controller.signal });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  } catch (err) {
    if ((err as Error).name === 'AbortError') {
      // Client disconnected, no response needed
      return;
    }
    res.writeHead(500);
    res.end('Internal Server Error');
  }
});
```

---

## 3. Timeout Patterns

### 3.1 Basic Timeout

```typescript
// Fetch with timeout
async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeoutMs?: number } = {},
): Promise<Response> {
  const { timeoutMs = 5000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    return response;
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      throw new TimeoutError(`Request timed out after ${timeoutMs}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

// Custom error class
class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';
  }
}
```

### 3.2 Promise Timeout Wrapper

```typescript
// Promise timeout wrapper
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  const timeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new TimeoutError(`Timeout after ${ms}ms`)), ms);
  });
  return Promise.race([promise, timeout]);
}

// Usage
const data = await withTimeout(fetchData(), 5000);

// Cancellable timeout (prevents resource leaks)
function withCancellableTimeout<T>(
  promise: Promise<T>,
  ms: number,
  signal?: AbortSignal,
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    let settled = false;

    const timeoutId = setTimeout(() => {
      if (!settled) {
        settled = true;
        reject(new TimeoutError(`Timeout after ${ms}ms`));
      }
    }, ms);

    const cleanup = () => {
      clearTimeout(timeoutId);
    };

    // AbortSignal cancellation
    signal?.addEventListener('abort', () => {
      if (!settled) {
        settled = true;
        cleanup();
        reject(signal.reason);
      }
    }, { once: true });

    promise.then(
      value => {
        if (!settled) {
          settled = true;
          cleanup();
          resolve(value);
        }
      },
      error => {
        if (!settled) {
          settled = true;
          cleanup();
          reject(error);
        }
      },
    );
  });
}
```

### 3.3 Gradual Timeout

```typescript
// Gradual timeout: Warning -> Timeout -> Force terminate
class GradualTimeout {
  private timers: NodeJS.Timeout[] = [];

  constructor(
    private warningMs: number,
    private timeoutMs: number,
    private forceMs: number,
  ) {}

  async execute<T>(
    fn: (signal: AbortSignal) => Promise<T>,
    callbacks: {
      onWarning?: () => void;
      onTimeout?: () => void;
      onForce?: () => void;
    } = {},
  ): Promise<T> {
    const controller = new AbortController();

    // Stage 1: Warning
    this.timers.push(
      setTimeout(() => {
        callbacks.onWarning?.();
        console.warn(`Operation running for ${this.warningMs}ms`);
      }, this.warningMs),
    );

    // Stage 2: Timeout (cooperative cancellation)
    this.timers.push(
      setTimeout(() => {
        callbacks.onTimeout?.();
        controller.abort(new TimeoutError(`Timeout after ${this.timeoutMs}ms`));
      }, this.timeoutMs),
    );

    // Stage 3: Force terminate
    this.timers.push(
      setTimeout(() => {
        callbacks.onForce?.();
        console.error('Force terminating operation');
        // Force termination logic
      }, this.forceMs),
    );

    try {
      return await fn(controller.signal);
    } finally {
      this.timers.forEach(clearTimeout);
      this.timers = [];
    }
  }
}

// Usage example
const gradual = new GradualTimeout(5000, 10000, 30000);

const result = await gradual.execute(
  async (signal) => {
    return await fetchLargeDataset(signal);
  },
  {
    onWarning: () => showSlowOperationBanner(),
    onTimeout: () => logSlowOperation(),
    onForce: () => alertOpsTeam(),
  },
);
```

---

## 4. Cancellation Mechanisms Across Languages

### 4.1 Python Cancellation

```python
import asyncio

async def cancellable_task():
    try:
        while True:
            data = await fetch_data()
            process(data)
            await asyncio.sleep(1)
    except asyncio.CancelledError:
        # Cleanup processing
        print("Task was cancelled")
        await cleanup_resources()
        raise  # Re-raise (propagate the cancellation)

async def main():
    task = asyncio.create_task(cancellable_task())

    await asyncio.sleep(5)
    task.cancel()  # Cancel

    try:
        await task
    except asyncio.CancelledError:
        print("Task was successfully cancelled")

# Timeout
async def with_timeout():
    try:
        result = await asyncio.wait_for(slow_operation(), timeout=5.0)
    except asyncio.TimeoutError:
        print("Timeout")

# TaskGroup (Python 3.11+)
async def parallel_with_cancellation():
    async with asyncio.TaskGroup() as tg:
        task1 = tg.create_task(operation_a())
        task2 = tg.create_task(operation_b())
        # If one raises an error, all other tasks are cancelled

# Shield (prevent cancellation propagation)
async def critical_operation():
    # Wrapping with shield() prevents external cancellation from propagating
    result = await asyncio.shield(important_db_write())
    return result

# Structured concurrency (Python 3.12+, anyio)
import anyio

async def structured_cancellation():
    async with anyio.create_task_group() as tg:
        tg.start_soon(worker, "task1")
        tg.start_soon(worker, "task2")
        # All tasks are cancelled when leaving the scope

    # cancel_scope for timeout
    with anyio.move_on_after(5.0) as scope:
        await slow_operation()
    if scope.cancelled_caught:
        print("Timed out")
```

### 4.2 Go Cancellation (Context)

```go
package main

import (
    "context"
    "fmt"
    "net/http"
    "time"
)

// context.WithCancel: Manual cancellation
func manualCancel() {
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel() // Always call (prevents resource leaks)

    go func() {
        select {
        case <-ctx.Done():
            fmt.Println("Cancelled:", ctx.Err())
            return
        case result := <-doWork():
            fmt.Println("Result:", result)
        }
    }()

    time.Sleep(2 * time.Second)
    cancel() // Cancel
}

// context.WithTimeout: Timeout
func withTimeout() {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    req, _ := http.NewRequestWithContext(ctx, "GET", "https://api.example.com/data", nil)
    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        if ctx.Err() == context.DeadlineExceeded {
            fmt.Println("Timeout")
        }
        return
    }
    defer resp.Body.Close()
}

// context.WithDeadline: Deadline
func withDeadline() {
    deadline := time.Now().Add(10 * time.Second)
    ctx, cancel := context.WithDeadline(context.Background(), deadline)
    defer cancel()

    // Propagate context to DB query
    rows, err := db.QueryContext(ctx, "SELECT * FROM users")
    // ...
}

// context.WithCancelCause (Go 1.20+): Cancellation reason
func withCancelCause() {
    ctx, cancel := context.WithCancelCause(context.Background())

    go func() {
        // Cancel with a cause error attached
        cancel(fmt.Errorf("user interrupted"))
    }()

    <-ctx.Done()
    fmt.Println("Reason:", context.Cause(ctx))
}

// Context propagation in HTTP handlers
func handler(w http.ResponseWriter, r *http.Request) {
    ctx := r.Context() // Automatically cancelled on client disconnect

    // Add timeout to child context
    ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
    defer cancel()

    // Pass context to all downstream calls
    data, err := fetchData(ctx)
    if err != nil {
        if ctx.Err() == context.Canceled {
            // Client disconnected
            return
        }
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(data)
}

// Cancellation handling in goroutines
func worker(ctx context.Context, jobs <-chan Job) error {
    for {
        select {
        case <-ctx.Done():
            return ctx.Err()
        case job, ok := <-jobs:
            if !ok {
                return nil // Channel was closed
            }
            if err := processJob(ctx, job); err != nil {
                return fmt.Errorf("job %s failed: %w", job.ID, err)
            }
        }
    }
}
```

### 4.3 C# Cancellation (CancellationToken)

```csharp
using System;
using System.Threading;
using System.Threading.Tasks;

// Create a token with CancellationTokenSource
public class DataService
{
    public async Task<Data> FetchDataAsync(CancellationToken cancellationToken = default)
    {
        // Periodically check for cancellation
        cancellationToken.ThrowIfCancellationRequested();

        using var httpClient = new HttpClient();
        var response = await httpClient.GetAsync(
            "https://api.example.com/data",
            cancellationToken
        );

        return await response.Content.ReadFromJsonAsync<Data>(
            cancellationToken: cancellationToken
        );
    }
}

// Usage example
public async Task Main()
{
    // Manual cancellation
    using var cts = new CancellationTokenSource();

    var task = service.FetchDataAsync(cts.Token);

    // Cancel after 5 seconds
    cts.CancelAfter(TimeSpan.FromSeconds(5));

    try
    {
        var data = await task;
    }
    catch (OperationCanceledException)
    {
        Console.WriteLine("Operation was cancelled");
    }

    // LinkedToken: Combine multiple cancellation sources
    using var userCts = new CancellationTokenSource();
    using var timeoutCts = new CancellationTokenSource(TimeSpan.FromSeconds(30));
    using var linkedCts = CancellationTokenSource.CreateLinkedTokenSource(
        userCts.Token,
        timeoutCts.Token
    );

    await service.FetchDataAsync(linkedCts.Token);
}
```

### 4.4 Rust Cancellation

```rust
use tokio::select;
use tokio::sync::oneshot;
use tokio::time::{timeout, Duration};
use tokio_util::sync::CancellationToken;

// Cancellation with tokio::select!
async fn cancellable_operation(cancel_rx: oneshot::Receiver<()>) -> Result<Data, Error> {
    select! {
        result = fetch_data() => result,
        _ = cancel_rx => {
            println!("Operation cancelled");
            Err(Error::Cancelled)
        }
    }
}

// CancellationToken (tokio-util)
async fn with_cancellation_token() {
    let token = CancellationToken::new();
    let child_token = token.child_token();

    // Worker task
    let handle = tokio::spawn(async move {
        loop {
            select! {
                _ = child_token.cancelled() => {
                    println!("Worker cancelled");
                    break;
                }
                _ = do_work() => {}
            }
        }
    });

    // Cancel after 5 seconds
    tokio::time::sleep(Duration::from_secs(5)).await;
    token.cancel();

    handle.await.unwrap();
}

// Automatic cancellation via Drop trait
struct AutoCancelGuard {
    token: CancellationToken,
}

impl Drop for AutoCancelGuard {
    fn drop(&mut self) {
        self.token.cancel();
        // Automatically cancels when leaving scope
    }
}

// Timeout
async fn with_timeout() -> Result<Data, Error> {
    match timeout(Duration::from_secs(5), fetch_data()).await {
        Ok(result) => result,
        Err(_) => Err(Error::Timeout),
    }
}
```

---

## 5. Cancellation Design Principles

```
1. Cancellation is cooperative
   -> Rather than forcibly stopping a process,
     it notifies that "cancellation has been requested"
   -> The process cleans up before stopping

2. Guarantee cleanup
   -> Release resources in finally blocks
   -> Roll back DB transactions
   -> Delete temporary files
   -> Release locks

3. Design cancellable APIs
   -> Accept AbortSignal / CancellationToken / Context as parameters
   -> Document behavior on cancellation
   -> Clarify handling of partial results

4. Watch out for race conditions
   -> Cancellation and completion can occur simultaneously
   -> Perform state checks appropriately
   -> Handle the "already cancelled" state

5. Cancellation propagation
   -> Parent cancellation should propagate to children
   -> Child cancellation should not propagate to parent (normally)
   -> Design cancellation to propagate in a tree structure
```

### 5.1 Cancellable API Design

```typescript
// === Good API Design ===

// 1. Accept signal as part of options
interface FetchOptions {
  signal?: AbortSignal;
  timeout?: number;
  retries?: number;
}

async function fetchData(url: string, options: FetchOptions = {}): Promise<Data> {
  const { signal, timeout = 30000, retries = 3 } = options;

  // Combine external signal with timeout
  const timeoutSignal = AbortSignal.timeout(timeout);
  const combinedSignal = signal
    ? AbortSignal.any([signal, timeoutSignal])
    : timeoutSignal;

  for (let attempt = 0; attempt <= retries; attempt++) {
    combinedSignal.throwIfAborted();

    try {
      const response = await fetch(url, { signal: combinedSignal });
      if (response.ok) return await response.json();
    } catch (err) {
      if ((err as Error).name === 'AbortError') throw err;
      if (attempt === retries) throw err;
      await delay(Math.pow(2, attempt) * 1000, combinedSignal);
    }
  }

  throw new Error('Unreachable');
}

// 2. Cancellable iterator
async function* paginatedFetch<T>(
  baseUrl: string,
  signal?: AbortSignal,
): AsyncGenerator<T[]> {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    signal?.throwIfAborted();

    const response = await fetch(`${baseUrl}?page=${page}`, { signal });
    const data = await response.json();

    yield data.items;

    hasMore = data.hasMore;
    page++;
  }
}

// Usage example
const controller = new AbortController();

for await (const items of paginatedFetch<User>('/api/users', controller.signal)) {
  for (const user of items) {
    processUser(user);
  }
}

// 3. Cancellable batch processing
class BatchProcessor<T, R> {
  async process(
    items: T[],
    processor: (item: T, signal: AbortSignal) => Promise<R>,
    options: {
      signal?: AbortSignal;
      batchSize?: number;
      concurrency?: number;
      onProgress?: (completed: number, total: number) => void;
    } = {},
  ): Promise<{ results: R[]; errors: Array<{ item: T; error: Error }> }> {
    const { signal, batchSize = 100, concurrency = 5, onProgress } = options;
    const results: R[] = [];
    const errors: Array<{ item: T; error: Error }> = [];
    let completed = 0;

    for (let i = 0; i < items.length; i += batchSize) {
      signal?.throwIfAborted();

      const batch = items.slice(i, i + batchSize);

      // Process with concurrency limit
      const batchPromises = batch.map(async (item) => {
        try {
          signal?.throwIfAborted();
          const result = await processor(item, signal!);
          results.push(result);
        } catch (err) {
          if ((err as Error).name === 'AbortError') throw err;
          errors.push({ item, error: err as Error });
        } finally {
          completed++;
          onProgress?.(completed, items.length);
        }
      });

      await Promise.all(batchPromises);
    }

    return { results, errors };
  }
}
```

### 5.2 Cancellation Token Tree

```typescript
// Cancellation propagation tree
class CancellationScope {
  private controller: AbortController;
  private children: CancellationScope[] = [];
  private cleanupFns: Array<() => void | Promise<void>> = [];

  constructor(parentSignal?: AbortSignal) {
    this.controller = new AbortController();

    // Propagate parent's cancellation
    if (parentSignal) {
      parentSignal.addEventListener('abort', () => {
        this.cancel(parentSignal.reason);
      }, { once: true });
    }
  }

  get signal(): AbortSignal {
    return this.controller.signal;
  }

  // Create a child scope
  createChild(): CancellationScope {
    const child = new CancellationScope(this.signal);
    this.children.push(child);
    return child;
  }

  // Register a cleanup function
  onCancel(fn: () => void | Promise<void>): void {
    this.cleanupFns.push(fn);
  }

  // Execute cancellation
  async cancel(reason?: any): Promise<void> {
    if (this.controller.signal.aborted) return;

    // Cancel child scopes first
    await Promise.allSettled(
      this.children.map(child => child.cancel(reason)),
    );

    // Execute cleanup
    await Promise.allSettled(
      this.cleanupFns.map(fn => fn()),
    );

    this.controller.abort(reason);
  }
}

// Usage example
const rootScope = new CancellationScope();

const dbScope = rootScope.createChild();
dbScope.onCancel(async () => {
  await db.rollback();
  console.log('DB transaction rolled back');
});

const fileScope = rootScope.createChild();
fileScope.onCancel(async () => {
  await tempFile.delete();
  console.log('Temp file deleted');
});

// Cancelling root cancels all children
await rootScope.cancel('User requested cancellation');
```

---

## 6. Testable Cancellation Logic

```typescript
// === Tests ===
import { describe, it, expect, vi } from 'vitest';

describe('fetchWithTimeout', () => {
  it('throws TimeoutError on timeout', async () => {
    // Mock a slow response
    global.fetch = vi.fn().mockImplementation(
      () => new Promise(resolve => setTimeout(resolve, 10000)),
    );

    await expect(
      fetchWithTimeout('/api/slow', { timeoutMs: 100 }),
    ).rejects.toThrow(TimeoutError);
  });

  it('throws AbortError when signal is aborted', async () => {
    const controller = new AbortController();

    // Cancel immediately
    controller.abort();

    await expect(
      fetchWithTimeout('/api/data', { signal: controller.signal }),
    ).rejects.toThrow('AbortError');
  });

  it('returns a normal response', async () => {
    global.fetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: 'test' }), { status: 200 }),
    );

    const response = await fetchWithTimeout('/api/data', { timeoutMs: 5000 });
    expect(response.status).toBe(200);
  });

  it('executes cleanup after cancellation', async () => {
    const cleanup = vi.fn();
    const controller = new AbortController();

    const scope = new CancellationScope(controller.signal);
    scope.onCancel(cleanup);

    controller.abort();

    // Verify that cleanup was called
    await vi.waitFor(() => {
      expect(cleanup).toHaveBeenCalled();
    });
  });
});

// React component tests
import { render, screen, waitFor, act } from '@testing-library/react';

describe('SearchResults', () => {
  it('cancels the previous request when query changes', async () => {
    const abortSpy = vi.spyOn(AbortController.prototype, 'abort');

    const { rerender } = render(<SearchResults query="hello" />);

    // Change query
    rerender(<SearchResults query="world" />);

    // Verify that the previous request was cancelled
    expect(abortSpy).toHaveBeenCalled();
  });

  it('cancels the request on unmount', async () => {
    const abortSpy = vi.spyOn(AbortController.prototype, 'abort');

    const { unmount } = render(<SearchResults query="test" />);

    unmount();

    expect(abortSpy).toHaveBeenCalled();
  });
});
```

---

## 7. Practical Patterns

### 7.1 Debounced Cancellation

```typescript
// Search input debounce + cancellation
function useDebounceSearch(delayMs: number = 300) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const search = useCallback((searchQuery: string) => {
    // Clear previous debounce timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Cancel previous request
    controllerRef.current?.abort();

    if (!searchQuery.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    timeoutRef.current = window.setTimeout(async () => {
      const controller = new AbortController();
      controllerRef.current = controller;

      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(searchQuery)}`,
          { signal: controller.signal },
        );
        const data = await response.json();
        setResults(data);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Search error:', err);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, delayMs);
  }, [delayMs]);

  // Cleanup
  useEffect(() => {
    return () => {
      controllerRef.current?.abort();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { query, setQuery: (q: string) => { setQuery(q); search(q); }, results, loading };
}
```

### 7.2 Preventing Race Conditions

```typescript
// Pattern to only honor the latest request
function useLatestRequest<T>(
  fetchFn: (signal: AbortSignal) => Promise<T>,
  deps: any[],
): { data: T | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const controller = new AbortController();
    const requestId = ++requestIdRef.current;

    setLoading(true);
    setError(null);

    fetchFn(controller.signal)
      .then(result => {
        // Check if this request is still the latest
        if (requestId === requestIdRef.current) {
          setData(result);
          setLoading(false);
        }
      })
      .catch(err => {
        if (err.name !== 'AbortError' && requestId === requestIdRef.current) {
          setError(err);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, deps);

  return { data, loading, error };
}
```

### 7.3 Using the First Result from Concurrent Operations

```typescript
// Use the first result from multiple sources and cancel the rest
async function raceWithCancellation<T>(
  tasks: Array<(signal: AbortSignal) => Promise<T>>,
): Promise<T> {
  const controller = new AbortController();

  try {
    const result = await Promise.race(
      tasks.map(task => task(controller.signal)),
    );
    return result;
  } finally {
    controller.abort(); // Cancel remaining tasks
  }
}

// Usage example: Use the fastest result from multiple API endpoints
const data = await raceWithCancellation([
  (signal) => fetch('https://api1.example.com/data', { signal }).then(r => r.json()),
  (signal) => fetch('https://api2.example.com/data', { signal }).then(r => r.json()),
  (signal) => fetch('https://api3.example.com/data', { signal }).then(r => r.json()),
]);
```


---

## Practical Exercises

### Exercise 1: Basic Implementation

Implement code that meets the following requirements.

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
        """Main processing logic"""
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

Extend the basic implementation to add the following features.

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
    """Efficient search using hash map"""
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
- Be conscious of algorithm time complexity
- Choose appropriate data structures
- Measure the effect with benchmarks

---

## Troubleshooting

### Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| Initialization error | Configuration file issues | Check configuration file path and format |
| Timeout | Network latency / resource shortage | Adjust timeout values, add retry logic |
| Out of memory | Data volume growth | Introduce batch processing, implement pagination |
| Permission error | Insufficient access permissions | Check executing user's permissions, review settings |
| Data inconsistency | Concurrent processing conflicts | Introduce locking mechanisms, manage transactions |

### Debugging Steps

1. **Check the error message**: Read the stack trace to identify where the error occurred
2. **Establish reproduction steps**: Reproduce the error with minimal code
3. **Form hypotheses**: List possible causes
4. **Verify step by step**: Verify hypotheses using log output or a debugger
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

Steps for diagnosing performance issues:

1. **Identify bottlenecks**: Measure with profiling tools
2. **Check memory usage**: Check for memory leaks
3. **Check I/O wait**: Check disk and network I/O status
4. **Check concurrent connections**: Check connection pool status

| Issue Type | Diagnostic Tool | Countermeasure |
|-----------|----------------|----------------|
| CPU load | cProfile, py-spy | Algorithm improvement, parallelization |
| Memory leak | tracemalloc, objgraph | Proper release of references |
| I/O bottleneck | strace, iostat | Async I/O, caching |
| DB latency | EXPLAIN, slow query log | Indexes, query optimization |

---

## Design Decision Guide

### Selection Criteria Matrix

Here is a summary of criteria for making technology choices.

| Criterion | When to prioritize | When acceptable to compromise |
|-----------|-------------------|------------------------------|
| Performance | Real-time processing, large-scale data | Admin dashboards, batch processing |
| Maintainability | Long-term operation, team development | Prototypes, short-term projects |
| Scalability | Growing services | Internal tools, fixed user base |
| Security | Personal data, financial data | Public data, internal use |
| Development speed | MVP, time-to-market | Quality-focused, mission-critical |

### Architecture Pattern Selection

```
+--------------------------------------------------+
|          Architecture Selection Flow              |
+--------------------------------------------------+
|                                                   |
|  (1) Team size?                                   |
|    +-- Small (1-5 people) -> Monolith             |
|    +-- Large (10+ people) -> Go to (2)            |
|                                                   |
|  (2) Deploy frequency?                            |
|    +-- Weekly or less -> Monolith + module split   |
|    +-- Daily/multiple -> Go to (3)                |
|                                                   |
|  (3) Team independence?                           |
|    +-- High -> Microservices                      |
|    +-- Medium -> Modular monolith                 |
|                                                   |
+--------------------------------------------------+
```

### Trade-off Analysis

Technical decisions always involve trade-offs. Analyze from the following perspectives:

**1. Short-term vs Long-term Cost**
- A faster approach in the short term can become technical debt in the long term
- Conversely, over-engineering incurs high short-term costs and can delay projects

**2. Consistency vs Flexibility**
- A unified technology stack has lower learning costs
- Adopting diverse technologies enables best-fit choices but increases operational costs

**3. Level of Abstraction**
- Higher abstraction provides greater reusability but can make debugging more difficult
- Lower abstraction is more intuitive but more prone to code duplication

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
        """Describe the background and challenges"""
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
        md += f"## Context\n{self.context}\n\n"
        md += f"## Decision\n{self.decision}\n\n"
        md += "## Consequences\n"
        for c in self.consequences:
            icon = "+" if c['type'] == 'positive' else "!"
            md += f"- [{icon}] {c['description']}\n"
        md += "\n## Rejected Alternatives\n"
        for a in self.alternatives:
            md += f"- **{a['name']}**: {a['reason_rejected']}\n"
        return md
```
---


## FAQ

### Q1: What is the most important point when studying this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory but by actually writing code and verifying its behavior.

### Q2: What are common mistakes beginners make?

Skipping the fundamentals and jumping to advanced topics. We recommend thoroughly understanding the basic concepts explained in this guide before moving on to the next step.

### Q3: How is this applied in professional practice?

Knowledge of this topic is frequently used in day-to-day development work. It becomes especially important during code reviews and architecture design.

---

## Summary

| Technique | Language/Environment | Use Case |
|-----------|---------------------|----------|
| AbortController | JS/TS | fetch, events, streams |
| AbortSignal.timeout() | JS/TS | Timeouts |
| AbortSignal.any() | JS/TS | Combining multiple conditions |
| asyncio.cancel() | Python | asyncio tasks |
| asyncio.TaskGroup | Python | Structured concurrency |
| Context.cancel() | Go | goroutines, HTTP, DB |
| context.WithTimeout | Go | Timeouts |
| CancellationToken | C# | Tasks |
| CancellationTokenSource | C# | Token creation |
| tokio::select! | Rust | Async branching |
| CancellationToken | Rust (tokio-util) | Token-based cancellation |
| Drop trait | Rust | Automatic cancellation on scope exit |

| Design Principle | Description |
|-----------------|-------------|
| Cooperative cancellation | Notify -> Cleanup -> Stop, not force stop |
| Guarantee cleanup | Release resources with finally / defer / Drop |
| Cancellation propagation | Parent -> child propagation, tree structure |
| Race condition handling | Account for simultaneous cancellation and completion |
| Testability | Make signal injectable from outside |

---

## 8. FAQ

### Q1: Can AbortController be reused?

No. Once `abort()` has been called on an AbortController, it cannot be restored. Create a new AbortController for each new request. The signal's `aborted` property cannot be changed once it becomes `true`.

### Q2: How should partial results from cancelled operations be handled?

This should be clarified at design time. There are three options: (1) discard partial results and start over, (2) save partial results and make them resumable (checkpoint pattern), (3) return partial results as-is. For batch processing, (2) is common, and for file uploads, chunk-level checkpoints are effective.

### Q3: What should you be careful about when testing cancellation?

Tests that depend on timing tend to be flaky. Use techniques such as calling `AbortController.abort()` immediately to test the cancellation path, controlling timers with `vi.useFakeTimers()`, and injecting `signal` as a mock. Designing tests that don't depend on non-deterministic timing is important.

### Q4: What APIs besides fetch support AbortSignal?

In Node.js, `fs/promises` (readFile, writeFile, etc.), `timers/promises` (setTimeout), `events.once()`, `stream.pipeline()`, `child_process.exec()`, and more support it. In browsers, you can pass signal as an option to `addEventListener`, and `ReadableStream`, `WritableStream`, `Blob.text()`, etc. also support it. You can add support to custom APIs using `signal?.throwIfAborted()` and `signal?.addEventListener('abort', ...)`.

### Q5: What are the differences between Go's context.Context and JavaScript's AbortSignal?

Go's Context provides unified handling of cancellation plus timeout (WithTimeout/WithDeadline) and value propagation (WithValue). JavaScript's AbortSignal is cancellation-only, with timeouts achieved through `AbortSignal.timeout()`. Go has a convention of passing Context as the first argument, and all blocking operations support Context. JavaScript's AbortSignal adoption is still ongoing, and some APIs don't support it yet.

### Q6: How do you integrate cancellation with error handling?

Cancellation is commonly treated as a type of error. In TypeScript, you distinguish it with `err.name === 'AbortError'`, and in Go with `errors.Is(err, context.Canceled)`. Since cancellation errors usually don't need to be displayed to the user, they receive special treatment in the error handling layer. It is also recommended to set the log level lower than that of regular errors.

```typescript
// Example of integrating error handling and cancellation
class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly statusCode: number,
    public readonly isCancellation: boolean = false,
  ) {
    super(message);
    this.name = 'AppError';
  }

  static fromError(err: unknown): AppError {
    if (err instanceof AppError) return err;

    const error = err as Error;
    if (error.name === 'AbortError') {
      return new AppError('Operation cancelled', 'CANCELLED', 499, true);
    }
    if (error.name === 'TimeoutError') {
      return new AppError('Operation timed out', 'TIMEOUT', 504, false);
    }
    return new AppError(error.message, 'INTERNAL', 500, false);
  }
}

// Integrated handling in middleware
async function errorHandler(ctx: Context, next: () => Promise<void>) {
  try {
    await next();
  } catch (err) {
    const appError = AppError.fromError(err);

    if (appError.isCancellation) {
      // Log cancellation at debug level
      logger.debug('Request cancelled', { path: ctx.path });
      return; // No response needed
    }

    // Log regular errors at error level
    logger.error('Request failed', {
      path: ctx.path,
      code: appError.code,
      message: appError.message,
    });

    ctx.status = appError.statusCode;
    ctx.body = { error: { code: appError.code, message: appError.message } };
  }
}
```

---

## Recommended Next Guides

---

## References
1. MDN Web Docs. "AbortController."
2. Node.js Documentation. "AbortController."
3. Go Documentation. "context package."
4. Python Documentation. "asyncio - Tasks."
5. Microsoft Docs. "Cancellation in Managed Threads."
6. Tokio Documentation. "Cancellation."



===== SOURCE: 02-programming/async-and-error-handling/docs/03-advanced/02-retry-and-backoff.md =====

# Retry Strategies

> Transient failures are inevitable. Design reliable retry strategies using exponential backoff, jitter, circuit breakers, and more.

## What You Will Learn in This Chapter

- [ ] Distinguish between errors that should and should not be retried
- [ ] Understand how exponential backoff and jitter work
- [ ] Grasp the circuit breaker pattern
- [ ] Master testing techniques for retry strategies
- [ ] Understand retry design in distributed systems
- [ ] Learn how to combine retry with the bulkhead pattern


## Prerequisites

Before reading this guide, having the following knowledge will deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts
- Familiarity with the content in [Cancellation Handling](./01-cancellation.md)

---

## 1. Retry Fundamentals

### 1.1 Classifying Errors for Retry

```
Errors that should be retried (transient):
  ✓ HTTP 429 (Too Many Requests)
  ✓ HTTP 503 (Service Unavailable)
  ✓ HTTP 502 (Bad Gateway)
  ✓ HTTP 504 (Gateway Timeout)
  ✓ Network timeouts
  ✓ DB connection pool exhaustion
  ✓ Temporary DNS failures
  ✓ TCP connection reset (ECONNRESET)
  ✓ Socket disconnection (EPIPE)
  ✓ Temporary SSL/TLS handshake failures
  ✓ Transient AWS/GCP/Azure API errors

Errors that should NOT be retried (permanent):
  ✗ HTTP 400 (Bad Request) — Invalid request
  ✗ HTTP 401 (Unauthorized) — Authentication error
  ✗ HTTP 403 (Forbidden) — Authorization error
  ✗ HTTP 404 (Not Found) — Resource does not exist
  ✗ HTTP 405 (Method Not Allowed) — Invalid method
  ✗ HTTP 409 (Conflict) — Conflict on non-idempotent operation
  ✗ HTTP 413 (Payload Too Large) — Payload too large
  ✗ HTTP 422 (Unprocessable Entity) — Validation error
  ✗ Business logic errors
  ✗ Data inconsistency errors
```

### 1.2 Implementing Retry Decision Logic

```typescript
// Helper to determine whether an error is retryable
class RetryPolicy {
  // Determine by HTTP status code
  static isRetryableStatus(status: number): boolean {
    const retryableStatuses = new Set([
      408, // Request Timeout
      429, // Too Many Requests
      500, // Internal Server Error (depends on context)
      502, // Bad Gateway
      503, // Service Unavailable
      504, // Gateway Timeout
    ]);
    return retryableStatuses.has(status);
  }

  // Determine by network error
  static isRetryableNetworkError(error: Error): boolean {
    const retryableCodes = new Set([
      'ECONNRESET',
      'ECONNREFUSED',
      'ENOTFOUND',
      'EPIPE',
      'ETIMEDOUT',
      'EAI_AGAIN',
      'EHOSTUNREACH',
      'ENETUNREACH',
    ]);

    const code = (error as NodeJS.ErrnoException).code;
    if (code && retryableCodes.has(code)) {
      return true;
    }

    // AbortError (timeout) is also retryable
    if (error.name === 'AbortError') {
      return true;
    }

    return false;
  }

  // Combined determination
  static isRetryable(error: unknown): boolean {
    if (error instanceof HttpError) {
      return RetryPolicy.isRetryableStatus(error.statusCode);
    }
    if (error instanceof Error) {
      return RetryPolicy.isRetryableNetworkError(error);
    }
    return false;
  }
}
```

### 1.3 Idempotency and Its Relationship to Retry

```
Criteria for retry safety:

  Idempotent operations (safe to retry):
    ✓ GET  — Read (same result no matter how many times executed)
    ✓ PUT  — Full update (overwrites to the same state)
    ✓ DELETE — Delete (result is the same even if already deleted)
    ✓ HEAD — Header retrieval

  Non-idempotent operations (retry with caution):
    ⚠ POST — Create (risk of duplicate creation)
    ⚠ PATCH — Partial update (risk of double application with relative values)

  How to make POST/PATCH retry-safe:
    → Use an Idempotency Key
    → Client generates a unique key for each request
    → Server does not process the same key twice
```

```typescript
// Retry-safe POST using idempotency keys
class IdempotentClient {
  async createOrder(orderData: OrderData): Promise<Order> {
    const idempotencyKey = crypto.randomUUID();

    return retryWithBackoff(
      async () => {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Idempotency-Key': idempotencyKey, // Reuse the same key
          },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          throw new HttpError(response.status, await response.text());
        }

        return response.json();
      },
      {
        maxRetries: 3,
        shouldRetry: (error) => {
          if (error instanceof HttpError) {
            // 409 means already processed, so it can be treated as success
            return RetryPolicy.isRetryableStatus(error.statusCode);
          }
          return true;
        },
      },
    );
  }
}

// Server-side idempotency key handling
class IdempotencyMiddleware {
  private store = new Map<string, { response: any; timestamp: number }>();

  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const key = req.headers['idempotency-key'] as string;
    if (!key) {
      return next();
    }

    // Already processed request
    const cached = this.store.get(key);
    if (cached) {
      res.json(cached.response);
      return;
    }

    // In-progress flag (blocks other requests)
    this.store.set(key, { response: null, timestamp: Date.now() });

    // Intercept the original response
    const originalJson = res.json.bind(res);
    res.json = (body: any) => {
      this.store.set(key, { response: body, timestamp: Date.now() });
      return originalJson(body);
    };

    next();
  }
}
```

---

## 2. Exponential Backoff + Jitter

### 2.1 Core Concepts

```
Exponential Backoff:
  Retry 1: after 1 second
  Retry 2: after 2 seconds
  Retry 3: after 4 seconds
  Retry 4: after 8 seconds
  Retry 5: after 16 seconds
  → wait = base × 2^(attempt - 1)
  → Set a cap to prevent unbounded growth

Jitter:
  → Add random delay
  → Avoid simultaneous retries from multiple clients (thundering herd)

  Without jitter: All clients retry at the same time → Server overloaded again
  With jitter: Retries are spread out → Server load is distributed

Types of jitter:
  1. Full Jitter:
     → wait = random(0, min(cap, base × 2^attempt))
     → Highest distribution effect

  2. Equal Jitter:
     → temp = min(cap, base × 2^attempt)
     → wait = temp/2 + random(0, temp/2)
     → Guarantees a minimum wait time

  3. Decorrelated Jitter:
     → wait = min(cap, random(base, prev_wait × 3))
     → Based on the previous wait time
```

### 2.2 TypeScript Implementation

```typescript
// Exponential backoff + jitter (full implementation)
interface RetryOptions {
  maxRetries: number;
  baseDelayMs: number;
  maxDelayMs: number;
  jitterStrategy: 'full' | 'equal' | 'decorrelated';
  shouldRetry: (error: Error, attempt: number) => boolean;
  onRetry?: (error: Error, attempt: number, delayMs: number) => void;
}

const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxRetries: 3,
  baseDelayMs: 1000,
  maxDelayMs: 30000,
  jitterStrategy: 'full',
  shouldRetry: () => true,
};

// Jitter calculation
function calculateDelay(
  attempt: number,
  options: RetryOptions,
  previousDelay?: number,
): number {
  const { baseDelayMs, maxDelayMs, jitterStrategy } = options;
  const exponentialDelay = baseDelayMs * Math.pow(2, attempt);
  const cappedDelay = Math.min(exponentialDelay, maxDelayMs);

  switch (jitterStrategy) {
    case 'full':
      // Full jitter: [0, cappedDelay]
      return Math.random() * cappedDelay;

    case 'equal':
      // Equal jitter: [cappedDelay/2, cappedDelay]
      return cappedDelay / 2 + Math.random() * (cappedDelay / 2);

    case 'decorrelated':
      // Decorrelated jitter: [baseDelayMs, previousDelay * 3]
      const prev = previousDelay ?? baseDelayMs;
      return Math.min(
        maxDelayMs,
        baseDelayMs + Math.random() * (prev * 3 - baseDelayMs),
      );

    default:
      return cappedDelay;
  }
}

// Retry function
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: Partial<RetryOptions> = {},
): Promise<T> {
  const opts = { ...DEFAULT_RETRY_OPTIONS, ...options };
  let lastError: Error;
  let previousDelay: number | undefined;

  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === opts.maxRetries || !opts.shouldRetry(lastError, attempt)) {
        throw lastError;
      }

      const delay = calculateDelay(attempt, opts, previousDelay);
      previousDelay = delay;

      opts.onRetry?.(lastError, attempt + 1, delay);

      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}
```

### 2.3 Python Implementation

```python
import asyncio
import random
import logging
from typing import TypeVar, Callable, Awaitable, Optional
from functools import wraps

T = TypeVar('T')
logger = logging.getLogger(__name__)


class RetryError(Exception):
    """Raised when all retries have failed"""
    def __init__(self, message: str, attempts: int, last_error: Exception):
        super().__init__(message)
        self.attempts = attempts
        self.last_error = last_error


async def retry_with_backoff(
    fn: Callable[..., Awaitable[T]],
    *args,
    max_retries: int = 3,
    base_delay: float = 1.0,
    max_delay: float = 30.0,
    jitter: str = 'full',  # 'full', 'equal', 'decorrelated'
    should_retry: Optional[Callable[[Exception], bool]] = None,
    on_retry: Optional[Callable[[Exception, int, float], None]] = None,
    **kwargs,
) -> T:
    """Retry with exponential backoff + jitter"""
    last_error: Optional[Exception] = None
    prev_delay = base_delay

    for attempt in range(max_retries + 1):
        try:
            return await fn(*args, **kwargs)
        except Exception as e:
            last_error = e

            if attempt == max_retries:
                break

            if should_retry and not should_retry(e):
                raise

            # Jitter calculation
            exp_delay = base_delay * (2 ** attempt)
            capped = min(exp_delay, max_delay)

            if jitter == 'full':
                delay = random.uniform(0, capped)
            elif jitter == 'equal':
                delay = capped / 2 + random.uniform(0, capped / 2)
            elif jitter == 'decorrelated':
                delay = min(max_delay, random.uniform(base_delay, prev_delay * 3))
            else:
                delay = capped

            prev_delay = delay

            if on_retry:
                on_retry(e, attempt + 1, delay)

            logger.warning(
                f"Retry {attempt + 1}/{max_retries} after {delay:.2f}s: {e}"
            )
            await asyncio.sleep(delay)

    raise RetryError(
        f"All {max_retries} retries failed",
        attempts=max_retries,
        last_error=last_error,
    )


# Decorator version
def with_retry(
    max_retries: int = 3,
    base_delay: float = 1.0,
    max_delay: float = 30.0,
    should_retry: Optional[Callable[[Exception], bool]] = None,
):
    """Retry decorator"""
    def decorator(fn: Callable[..., Awaitable[T]]) -> Callable[..., Awaitable[T]]:
        @wraps(fn)
        async def wrapper(*args, **kwargs) -> T:
            return await retry_with_backoff(
                fn, *args,
                max_retries=max_retries,
                base_delay=base_delay,
                max_delay=max_delay,
                should_retry=should_retry,
                **kwargs,
            )
        return wrapper
    return decorator


# Usage example
@with_retry(max_retries=3, should_retry=lambda e: isinstance(e, (ConnectionError, TimeoutError)))
async def fetch_user_data(user_id: str) -> dict:
    """Fetch user data (with retry)"""
    async with aiohttp.ClientSession() as session:
        async with session.get(f"https://api.example.com/users/{user_id}") as resp:
            if resp.status >= 500:
                raise ConnectionError(f"Server error: {resp.status}")
            if resp.status == 429:
                raise ConnectionError("Rate limited")
            resp.raise_for_status()
            return await resp.json()
```

### 2.4 Go Implementation

```go
package retry

import (
	"context"
	"fmt"
	"math"
	"math/rand"
	"time"
)

// Config holds the retry configuration
type Config struct {
	MaxRetries   int
	BaseDelay    time.Duration
	MaxDelay     time.Duration
	Jitter       JitterStrategy
	ShouldRetry  func(error) bool
	OnRetry      func(err error, attempt int, delay time.Duration)
}

type JitterStrategy int

const (
	FullJitter JitterStrategy = iota
	EqualJitter
	DecorrelatedJitter
)

// DefaultConfig provides default settings
var DefaultConfig = Config{
	MaxRetries:  3,
	BaseDelay:   1 * time.Second,
	MaxDelay:    30 * time.Second,
	Jitter:     FullJitter,
	ShouldRetry: func(err error) bool { return true },
}

// Do executes a function with retry
func Do(ctx context.Context, fn func(ctx context.Context) error, cfg Config) error {
	var lastErr error
	prevDelay := cfg.BaseDelay

	for attempt := 0; attempt <= cfg.MaxRetries; attempt++ {
		// Check for context cancellation
		select {
		case <-ctx.Done():
			return ctx.Err()
		default:
		}

		err := fn(ctx)
		if err == nil {
			return nil
		}
		lastErr = err

		if attempt == cfg.MaxRetries {
			break
		}

		if cfg.ShouldRetry != nil && !cfg.ShouldRetry(err) {
			return err
		}

		delay := calculateDelay(attempt, cfg, prevDelay)
		prevDelay = delay

		if cfg.OnRetry != nil {
			cfg.OnRetry(err, attempt+1, delay)
		}

		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-time.After(delay):
		}
	}

	return fmt.Errorf("all %d retries failed: %w", cfg.MaxRetries, lastErr)
}

func calculateDelay(attempt int, cfg Config, prevDelay time.Duration) time.Duration {
	expDelay := time.Duration(float64(cfg.BaseDelay) * math.Pow(2, float64(attempt)))
	capped := expDelay
	if capped > cfg.MaxDelay {
		capped = cfg.MaxDelay
	}

	switch cfg.Jitter {
	case FullJitter:
		return time.Duration(rand.Int63n(int64(capped)))
	case EqualJitter:
		half := capped / 2
		return half + time.Duration(rand.Int63n(int64(half)))
	case DecorrelatedJitter:
		min := int64(cfg.BaseDelay)
		max := int64(prevDelay) * 3
		if max < min {
			max = min
		}
		d := time.Duration(min + rand.Int63n(max-min))
		if d > cfg.MaxDelay {
			d = cfg.MaxDelay
		}
		return d
	default:
		return capped
	}
}
```

### 2.5 Usage Examples and Benchmarks

```typescript
// Comparison of each jitter strategy
function benchmarkJitter(): void {
  const strategies: Array<'full' | 'equal' | 'decorrelated'> = [
    'full', 'equal', 'decorrelated',
  ];

  for (const strategy of strategies) {
    const delays: number[] = [];
    for (let attempt = 0; attempt < 5; attempt++) {
      const samples: number[] = [];
      for (let i = 0; i < 1000; i++) {
        samples.push(calculateDelay(attempt, {
          ...DEFAULT_RETRY_OPTIONS,
          jitterStrategy: strategy,
        }));
      }
      const avg = samples.reduce((a, b) => a + b) / samples.length;
      const min = Math.min(...samples);
      const max = Math.max(...samples);
      delays.push(avg);
      console.log(
        `${strategy} attempt=${attempt}: avg=${avg.toFixed(0)}ms, ` +
        `min=${min.toFixed(0)}ms, max=${max.toFixed(0)}ms`
      );
    }
  }
}

// Example output:
// full attempt=0: avg=497ms, min=2ms, max=999ms
// full attempt=1: avg=1003ms, min=3ms, max=1999ms
// full attempt=2: avg=1987ms, min=5ms, max=3998ms
// equal attempt=0: avg=752ms, min=500ms, max=999ms
// equal attempt=1: avg=1498ms, min=1000ms, max=1999ms
// decorrelated attempt=0: avg=1507ms, min=1001ms, max=2999ms
```

---

## 3. Circuit Breaker

### 3.1 Pattern Overview

```
Circuit Breaker Pattern:
  → Detects continuous failures and blocks requests
  → Returns "fail fast" until the failure recovers
  → Prevents cascading failures in microservices

  Three states:
  ┌────────┐  Success  ┌────────┐  Consecutive  ┌────────┐
  │ Closed │─────────→│ Closed │  failures    →│  Open  │
  │(Normal)│          │(Normal)│              │(Blocked)│
  └────────┘          └────────┘              └────┬───┘
                                                   │ After a set period
                                              ┌────▼─────┐
                                              │Half-Open │
                                              │ (Trial)  │
                                              └────┬─────┘
                                           Success ↙     ↘ Failure
                                       ┌────────┐   ┌────────┐
                                       │ Closed │   │  Open  │
                                       └────────┘   └────────┘

Design considerations:
  1. Threshold settings
     → Failure count-based vs. error rate-based
     → Window size (last N seconds or last N requests)

  2. Reset time
     → Wait time from Open → Half-Open
     → Too short is meaningless, too long delays recovery

  3. Half-Open behavior
     → Allow only 1 request vs. allow a limited number
     → Set a success rate threshold

  4. Fallback
     → Return from cache
     → Return default values
     → Use an alternative service
```

### 3.2 Full TypeScript Implementation

```typescript
// Circuit breaker states
type CircuitState = 'closed' | 'open' | 'half-open';

// Events
type CircuitEvent =
  | { type: 'state_change'; from: CircuitState; to: CircuitState }
  | { type: 'success'; duration: number }
  | { type: 'failure'; error: Error; duration: number }
  | { type: 'rejected' };

// Configuration
interface CircuitBreakerConfig {
  failureThreshold: number;      // Number of failures to transition to Open
  successThreshold: number;      // Number of successes to transition Half-Open → Closed
  resetTimeoutMs: number;        // Time from Open → Half-Open
  halfOpenMaxConcurrent: number; // Number of requests allowed in Half-Open
  monitorWindowMs: number;       // Window for failure counting
  errorRateThreshold?: number;   // Error rate threshold (0-1)
  minimumRequests?: number;      // Minimum requests to calculate error rate
  onStateChange?: (from: CircuitState, to: CircuitState) => void;
  onEvent?: (event: CircuitEvent) => void;
}

class CircuitOpenError extends Error {
  constructor(message: string = 'Circuit breaker is open') {
    super(message);
    this.name = 'CircuitOpenError';
  }
}

class CircuitBreaker {
  private state: CircuitState = 'closed';
  private failureCount = 0;
  private successCount = 0;
  private lastFailureTime = 0;
  private halfOpenInFlight = 0;
  private requestLog: Array<{ timestamp: number; success: boolean }> = [];

  constructor(private readonly config: CircuitBreakerConfig) {}

  get currentState(): CircuitState {
    return this.state;
  }

  get stats(): {
    state: CircuitState;
    failureCount: number;
    successCount: number;
    errorRate: number;
  } {
    return {
      state: this.state,
      failureCount: this.failureCount,
      successCount: this.successCount,
      errorRate: this.getErrorRate(),
    };
  }

  async execute<T>(fn: () => Promise<T>, fallback?: () => Promise<T>): Promise<T> {
    if (!this.canExecute()) {
      this.emitEvent({ type: 'rejected' });

      if (fallback) {
        return fallback();
      }

      throw new CircuitOpenError(
        `Circuit breaker is ${this.state}. ` +
        `Failures: ${this.failureCount}/${this.config.failureThreshold}`
      );
    }

    if (this.state === 'half-open') {
      this.halfOpenInFlight++;
    }

    const startTime = Date.now();

    try {
      const result = await fn();
      this.onSuccess(Date.now() - startTime);
      return result;
    } catch (error) {
      this.onFailure(error as Error, Date.now() - startTime);
      throw error;
    } finally {
      if (this.state === 'half-open') {
        this.halfOpenInFlight--;
      }
    }
  }

  // Manual reset
  reset(): void {
    this.transitionTo('closed');
    this.failureCount = 0;
    this.successCount = 0;
    this.requestLog = [];
  }

  private canExecute(): boolean {
    switch (this.state) {
      case 'closed':
        return true;

      case 'open':
        if (Date.now() - this.lastFailureTime >= this.config.resetTimeoutMs) {
          this.transitionTo('half-open');
          return true;
        }
        return false;

      case 'half-open':
        return this.halfOpenInFlight < this.config.halfOpenMaxConcurrent;

      default:
        return false;
    }
  }

  private onSuccess(duration: number): void {
    this.recordRequest(true);
    this.emitEvent({ type: 'success', duration });

    switch (this.state) {
      case 'half-open':
        this.successCount++;
        if (this.successCount >= this.config.successThreshold) {
          this.transitionTo('closed');
          this.failureCount = 0;
          this.successCount = 0;
        }
        break;

      case 'closed':
        // Reset failure count on success (design choice)
        this.failureCount = 0;
        break;
    }
  }

  private onFailure(error: Error, duration: number): void {
    this.recordRequest(false);
    this.lastFailureTime = Date.now();
    this.emitEvent({ type: 'failure', error, duration });

    switch (this.state) {
      case 'closed':
        this.failureCount++;
        if (this.shouldOpen()) {
          this.transitionTo('open');
        }
        break;

      case 'half-open':
        // Any failure in Half-Open transitions back to Open
        this.transitionTo('open');
        this.successCount = 0;
        break;
    }
  }

  private shouldOpen(): boolean {
    // Failure count-based
    if (this.failureCount >= this.config.failureThreshold) {
      return true;
    }

    // Error rate-based (optional)
    if (this.config.errorRateThreshold !== undefined) {
      const minReqs = this.config.minimumRequests ?? 10;
      const recentRequests = this.getRecentRequests();

      if (recentRequests.length >= minReqs) {
        const errorRate = this.getErrorRate();
        if (errorRate >= this.config.errorRateThreshold) {
          return true;
        }
      }
    }

    return false;
  }

  private recordRequest(success: boolean): void {
    const now = Date.now();
    this.requestLog.push({ timestamp: now, success });

    // Remove old logs outside the window
    const windowStart = now - this.config.monitorWindowMs;
    this.requestLog = this.requestLog.filter(r => r.timestamp >= windowStart);
  }

  private getRecentRequests(): Array<{ timestamp: number; success: boolean }> {
    const windowStart = Date.now() - this.config.monitorWindowMs;
    return this.requestLog.filter(r => r.timestamp >= windowStart);
  }

  private getErrorRate(): number {
    const recent = this.getRecentRequests();
    if (recent.length === 0) return 0;
    const failures = recent.filter(r => !r.success).length;
    return failures / recent.length;
  }

  private transitionTo(newState: CircuitState): void {
    const oldState = this.state;
    if (oldState === newState) return;

    this.state = newState;
    this.config.onStateChange?.(oldState, newState);
    this.emitEvent({ type: 'state_change', from: oldState, to: newState });
  }

  private emitEvent(event: CircuitEvent): void {
    this.config.onEvent?.(event);
  }
}
```

### 3.3 Python Implementation

```python
import asyncio
import time
from collections import deque
from enum import Enum
from dataclasses import dataclass, field
from typing import Callable, Awaitable, TypeVar, Optional, Generic

T = TypeVar('T')


class CircuitState(Enum):
    CLOSED = "closed"
    OPEN = "open"
    HALF_OPEN = "half-open"


class CircuitOpenError(Exception):
    """Raised when the circuit breaker is in the Open state"""
    pass


@dataclass
class CircuitBreakerConfig:
    failure_threshold: int = 5
    success_threshold: int = 2
    reset_timeout: float = 30.0  # seconds
    half_open_max_concurrent: int = 1
    monitor_window: float = 60.0  # seconds
    error_rate_threshold: Optional[float] = None
    minimum_requests: int = 10


@dataclass
class RequestRecord:
    timestamp: float
    success: bool


class AsyncCircuitBreaker:
    """Asynchronous circuit breaker"""

    def __init__(self, config: CircuitBreakerConfig = CircuitBreakerConfig()):
        self._config = config
        self._state = CircuitState.CLOSED
        self._failure_count = 0
        self._success_count = 0
        self._last_failure_time = 0.0
        self._half_open_semaphore = asyncio.Semaphore(config.half_open_max_concurrent)
        self._request_log: deque[RequestRecord] = deque()
        self._lock = asyncio.Lock()

    @property
    def state(self) -> CircuitState:
        return self._state

    async def execute(
        self,
        fn: Callable[..., Awaitable[T]],
        *args,
        fallback: Optional[Callable[..., Awaitable[T]]] = None,
        **kwargs,
    ) -> T:
        async with self._lock:
            if not self._can_execute():
                if fallback:
                    return await fallback(*args, **kwargs)
                raise CircuitOpenError(
                    f"Circuit is {self._state.value}. "
                    f"Failures: {self._failure_count}/{self._config.failure_threshold}"
                )

        try:
            result = await fn(*args, **kwargs)
            await self._on_success()
            return result
        except Exception as e:
            await self._on_failure(e)
            raise

    def _can_execute(self) -> bool:
        if self._state == CircuitState.CLOSED:
            return True
        elif self._state == CircuitState.OPEN:
            if time.monotonic() - self._last_failure_time >= self._config.reset_timeout:
                self._transition_to(CircuitState.HALF_OPEN)
                return True
            return False
        elif self._state == CircuitState.HALF_OPEN:
            return not self._half_open_semaphore.locked()
        return False

    async def _on_success(self) -> None:
        async with self._lock:
            self._record_request(True)
            if self._state == CircuitState.HALF_OPEN:
                self._success_count += 1
                if self._success_count >= self._config.success_threshold:
                    self._transition_to(CircuitState.CLOSED)
                    self._reset_counts()
            elif self._state == CircuitState.CLOSED:
                self._failure_count = 0

    async def _on_failure(self, error: Exception) -> None:
        async with self._lock:
            self._record_request(False)
            self._last_failure_time = time.monotonic()

            if self._state == CircuitState.CLOSED:
                self._failure_count += 1
                if self._should_open():
                    self._transition_to(CircuitState.OPEN)
            elif self._state == CircuitState.HALF_OPEN:
                self._transition_to(CircuitState.OPEN)
                self._success_count = 0

    def _should_open(self) -> bool:
        if self._failure_count >= self._config.failure_threshold:
            return True
        if self._config.error_rate_threshold is not None:
            recent = self._get_recent_requests()
            if len(recent) >= self._config.minimum_requests:
                error_rate = sum(1 for r in recent if not r.success) / len(recent)
                if error_rate >= self._config.error_rate_threshold:
                    return True
        return False

    def _record_request(self, success: bool) -> None:
        now = time.monotonic()
        self._request_log.append(RequestRecord(timestamp=now, success=success))
        cutoff = now - self._config.monitor_window
        while self._request_log and self._request_log[0].timestamp < cutoff:
            self._request_log.popleft()

    def _get_recent_requests(self) -> list[RequestRecord]:
        cutoff = time.monotonic() - self._config.monitor_window
        return [r for r in self._request_log if r.timestamp >= cutoff]

    def _transition_to(self, new_state: CircuitState) -> None:
        old_state = self._state
        self._state = new_state
        print(f"Circuit breaker: {old_state.value} -> {new_state.value}")

    def _reset_counts(self) -> None:
        self._failure_count = 0
        self._success_count = 0


# Usage example
async def main():
    breaker = AsyncCircuitBreaker(CircuitBreakerConfig(
        failure_threshold=3,
        reset_timeout=10.0,
    ))

    async def unreliable_api():
        import random
        if random.random() < 0.7:
            raise ConnectionError("Service unavailable")
        return {"status": "ok"}

    for i in range(20):
        try:
            result = await breaker.execute(
                unreliable_api,
                fallback=lambda: {"status": "fallback"},
            )
            print(f"Request {i}: {result}")
        except CircuitOpenError as e:
            print(f"Request {i}: REJECTED - {e}")
        except Exception as e:
            print(f"Request {i}: FAILED - {e}")
        await asyncio.sleep(1)
```

---

## 4. Bulkhead Pattern

### 4.1 Concept

```
Bulkhead Pattern:
  → A pattern derived from ship compartment walls (bulkheads)
  → Isolates resources into compartments so that a failure in one does not spread to the whole
  → Often used in combination with circuit breakers

  Example:
    Service A: max 10 connections
    Service B: max 20 connections
    Service C: max 5 connections

    → Even if Service A experiences delays, connections to Services B and C are unaffected

  Types of bulkheads:
    1. Thread pool isolation — Dedicated thread pool per service
    2. Semaphore isolation — Limit concurrent execution count
    3. Queue isolation — Dedicated queue per service
```

### 4.2 Implementation

```typescript
// Semaphore-based bulkhead
class Bulkhead {
  private currentConcurrency = 0;
  private queue: Array<{
    resolve: () => void;
    reject: (error: Error) => void;
    timer: ReturnType<typeof setTimeout>;
  }> = [];

  constructor(
    private readonly maxConcurrent: number,
    private readonly maxQueueSize: number = 100,
    private readonly queueTimeoutMs: number = 30000,
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    await this.acquire();

    try {
      return await fn();
    } finally {
      this.release();
    }
  }

  private async acquire(): Promise<void> {
    if (this.currentConcurrency < this.maxConcurrent) {
      this.currentConcurrency++;
      return;
    }

    if (this.queue.length >= this.maxQueueSize) {
      throw new Error(
        `Bulkhead queue full (${this.maxQueueSize}). ` +
        `Current concurrency: ${this.currentConcurrency}`
      );
    }

    return new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => {
        const index = this.queue.findIndex(item => item.resolve === resolve);
        if (index !== -1) {
          this.queue.splice(index, 1);
        }
        reject(new Error('Bulkhead queue timeout'));
      }, this.queueTimeoutMs);

      this.queue.push({ resolve, reject, timer });
    });
  }

  private release(): void {
    if (this.queue.length > 0) {
      const next = this.queue.shift()!;
      clearTimeout(next.timer);
      next.resolve();
    } else {
      this.currentConcurrency--;
    }
  }

  get stats(): { concurrent: number; queued: number } {
    return {
      concurrent: this.currentConcurrency,
      queued: this.queue.length,
    };
  }
}

// Isolate bulkheads per service
class BulkheadRegistry {
  private bulkheads = new Map<string, Bulkhead>();

  get(
    name: string,
    maxConcurrent: number = 10,
    maxQueue: number = 50,
  ): Bulkhead {
    if (!this.bulkheads.has(name)) {
      this.bulkheads.set(name, new Bulkhead(maxConcurrent, maxQueue));
    }
    return this.bulkheads.get(name)!;
  }

  stats(): Record<string, { concurrent: number; queued: number }> {
    const result: Record<string, { concurrent: number; queued: number }> = {};
    for (const [name, bulkhead] of this.bulkheads) {
      result[name] = bulkhead.stats;
    }
    return result;
  }
}
```

---

## 5. Practical Example: HTTP Client

### 5.1 Resilient HTTP Client

```typescript
// Combining retry + circuit breaker + bulkhead + timeout
interface ResilientClientConfig {
  timeout: number;
  maxRetries: number;
  circuitBreaker: CircuitBreakerConfig;
  bulkhead: {
    maxConcurrent: number;
    maxQueue: number;
  };
}

class ResilientHttpClient {
  private breaker: CircuitBreaker;
  private bulkhead: Bulkhead;

  constructor(private config: ResilientClientConfig) {
    this.breaker = new CircuitBreaker(config.circuitBreaker);
    this.bulkhead = new Bulkhead(
      config.bulkhead.maxConcurrent,
      config.bulkhead.maxQueue,
    );
  }

  async request(url: string, options?: RequestInit): Promise<Response> {
    // Outer layer: Bulkhead (concurrency limiting)
    return this.bulkhead.execute(() =>
      // Middle layer: Circuit breaker (failure blocking)
      this.breaker.execute(() =>
        // Inner layer: Retry + timeout
        retryWithBackoff(
          () => this.fetchWithTimeout(url, options),
          {
            maxRetries: this.config.maxRetries,
            shouldRetry: (error) => RetryPolicy.isRetryable(error),
            onRetry: (error, attempt, delay) => {
              console.log(
                `[${url}] Retry ${attempt} after ${delay.toFixed(0)}ms: ${error.message}`
              );
            },
          },
        ),
        // Fallback
        async () => {
          console.warn(`[${url}] Circuit open, returning cached response`);
          return this.getCachedResponse(url);
        },
      ),
    );
  }

  private async fetchWithTimeout(
    url: string,
    options?: RequestInit,
  ): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      this.config.timeout,
    );

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new HttpError(response.status, await response.text());
      }

      return response;
    } finally {
      clearTimeout(timeout);
    }
  }

  private async getCachedResponse(url: string): Promise<Response> {
    // Implementation omitted: return response from cache
    throw new Error('No cached response available');
  }

  // Statistics
  get stats() {
    return {
      circuitBreaker: this.breaker.stats,
      bulkhead: this.bulkhead.stats,
    };
  }
}

// Usage example
const client = new ResilientHttpClient({
  timeout: 5000,
  maxRetries: 3,
  circuitBreaker: {
    failureThreshold: 5,
    successThreshold: 2,
    resetTimeoutMs: 30000,
    halfOpenMaxConcurrent: 1,
    monitorWindowMs: 60000,
    onStateChange: (from, to) => {
      console.log(`Circuit breaker: ${from} -> ${to}`);
      if (to === 'open') {
        // Send alert
        alertService.send('Circuit breaker opened', { service: 'payment' });
      }
    },
  },
  bulkhead: {
    maxConcurrent: 10,
    maxQueue: 50,
  },
});

// API call
const response = await client.request('https://api.payment.example.com/charge', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ amount: 1000, currency: 'JPY' }),
});
```

### 5.2 Handling the Retry-After Header

```typescript
// Retry that respects the Retry-After header
async function retryWithRetryAfter<T>(
  fn: () => Promise<Response>,
  maxRetries: number = 3,
): Promise<Response> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fn();

    if (response.status === 429 || response.status === 503) {
      if (attempt === maxRetries) {
        throw new HttpError(response.status, 'Max retries exceeded');
      }

      const retryAfter = response.headers.get('Retry-After');
      let delayMs: number;

      if (retryAfter) {
        // Retry-After can be seconds or a date string
        const seconds = parseInt(retryAfter, 10);
        if (!isNaN(seconds)) {
          delayMs = seconds * 1000;
        } else {
          const date = new Date(retryAfter);
          delayMs = Math.max(0, date.getTime() - Date.now());
        }
      } else {
        // Exponential backoff when Retry-After is not present
        delayMs = Math.min(1000 * Math.pow(2, attempt), 30000);
      }

      console.log(`Rate limited. Waiting ${delayMs}ms before retry.`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
      continue;
    }

    return response;
  }

  throw new Error('Unexpected: loop exhausted');
}
```

---

## 6. Retry in Distributed Systems

### 6.1 Preventing Retry Storms

```
Retry Storm:
  → Service A calls Service B, which calls C
  → C fails → B retries × A retries
  → Retries multiply, causing an explosion of requests to C
  → A(3 retries) × B(3 retries) = 9 requests to C

  Countermeasures:
  1. Retry Budget
     → Limit the overall retry rate (e.g., up to 10% of recent requests)

  2. Per-layer retry limits
     → Retry only at the edge (API Gateway)
     → No retries between internal services

  3. Circuit breaker placement
     → Place circuit breakers between each service
     → Quickly block downstream failures

  4. Deadline propagation
     → Attach a deadline to each request
     → Do not retry if remaining time is insufficient
```

```typescript
// Retry budget
class RetryBudget {
  private requestCount = 0;
  private retryCount = 0;
  private windowStart = Date.now();

  constructor(
    private readonly maxRetryRatio: number = 0.1, // 10%
    private readonly windowMs: number = 10000,    // 10 seconds
    private readonly minRetriesPerSecond: number = 10, // Minimum guarantee
  ) {}

  canRetry(): boolean {
    this.maybeResetWindow();

    // OK if below the minimum guarantee
    const windowSeconds = (Date.now() - this.windowStart) / 1000;
    const minRetries = this.minRetriesPerSecond * windowSeconds;
    if (this.retryCount < minRetries) {
      return true;
    }

    // Check retry ratio
    if (this.requestCount === 0) return true;
    return this.retryCount / this.requestCount < this.maxRetryRatio;
  }

  recordRequest(): void {
    this.maybeResetWindow();
    this.requestCount++;
  }

  recordRetry(): void {
    this.maybeResetWindow();
    this.retryCount++;
  }

  private maybeResetWindow(): void {
    if (Date.now() - this.windowStart > this.windowMs) {
      this.requestCount = 0;
      this.retryCount = 0;
      this.windowStart = Date.now();
    }
  }
}

// Deadline propagation
class DeadlineContext {
  private deadline: number;

  constructor(timeoutMs: number) {
    this.deadline = Date.now() + timeoutMs;
  }

  get remaining(): number {
    return Math.max(0, this.deadline - Date.now());
  }

  get isExpired(): boolean {
    return this.remaining <= 0;
  }

  // Create a sub-deadline for child requests
  child(marginMs: number = 100): DeadlineContext {
    const remaining = this.remaining - marginMs;
    if (remaining <= 0) {
      throw new Error('Deadline already expired');
    }
    const ctx = new DeadlineContext(0);
    ctx.deadline = Date.now() + remaining;
    return ctx;
  }

  shouldRetry(estimatedDurationMs: number): boolean {
    return this.remaining > estimatedDurationMs;
  }
}

// Usage example: Retry with deadline
async function retryWithDeadline<T>(
  fn: () => Promise<T>,
  deadline: DeadlineContext,
  options: {
    maxRetries: number;
    baseDelayMs: number;
  },
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= options.maxRetries; attempt++) {
    if (deadline.isExpired) {
      throw new Error('Deadline expired before retry');
    }

    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === options.maxRetries) break;

      const delay = options.baseDelayMs * Math.pow(2, attempt);

      if (!deadline.shouldRetry(delay)) {
        throw new Error(
          `Insufficient time for retry (remaining: ${deadline.remaining}ms, ` +
          `needed: ${delay}ms)`
        );
      }

      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
}
```

### 6.2 gRPC Retry Strategy

```
gRPC Retry Policy:
  → gRPC allows retry policies to be declaratively defined in service configuration

  Retryable status codes:
    UNAVAILABLE  — Service unavailable (transient)
    DEADLINE_EXCEEDED — Deadline exceeded
    RESOURCE_EXHAUSTED — Resource exhaustion
    ABORTED — Transaction conflict

  Non-retryable:
    INVALID_ARGUMENT — Invalid argument
    NOT_FOUND — Resource does not exist
    PERMISSION_DENIED — No permission
    UNAUTHENTICATED — Not authenticated
```

```json
{
  "methodConfig": [{
    "name": [{ "service": "mypackage.MyService" }],
    "retryPolicy": {
      "maxAttempts": 4,
      "initialBackoff": "0.5s",
      "maxBackoff": "30s",
      "backoffMultiplier": 2,
      "retryableStatusCodes": ["UNAVAILABLE", "DEADLINE_EXCEEDED"]
    }
  }]
}
```

---

## 7. Testing Retry Strategies

### 7.1 Unit Tests

```typescript
describe('retryWithBackoff', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('does not retry on success', async () => {
    const fn = jest.fn().mockResolvedValue('success');

    const result = await retryWithBackoff(fn, { maxRetries: 3 });

    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('succeeds after transient failures', async () => {
    const fn = jest.fn()
      .mockRejectedValueOnce(new Error('transient'))
      .mockRejectedValueOnce(new Error('transient'))
      .mockResolvedValue('success');

    const promise = retryWithBackoff(fn, {
      maxRetries: 3,
      baseDelayMs: 100,
      jitterStrategy: 'equal', // Jitter that is more predictable for testing
    });

    // Wait for first retry
    await jest.advanceTimersByTimeAsync(200);
    // Wait for second retry
    await jest.advanceTimersByTimeAsync(400);

    const result = await promise;
    expect(result).toBe('success');
    expect(fn).toHaveBeenCalledTimes(3);
  });

  test('throws error after exceeding max retries', async () => {
    const error = new Error('persistent failure');
    const fn = jest.fn().mockRejectedValue(error);

    const promise = retryWithBackoff(fn, { maxRetries: 2, baseDelayMs: 100 });

    await jest.advanceTimersByTimeAsync(100);
    await jest.advanceTimersByTimeAsync(200);

    await expect(promise).rejects.toThrow('persistent failure');
    expect(fn).toHaveBeenCalledTimes(3); // Initial + 2 retries
  });

  test('does not retry when shouldRetry returns false', async () => {
    const fn = jest.fn().mockRejectedValue(new HttpError(404));

    await expect(
      retryWithBackoff(fn, {
        maxRetries: 3,
        shouldRetry: (err) => !(err instanceof HttpError && err.statusCode === 404),
      })
    ).rejects.toThrow();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('onRetry callback is called correctly', async () => {
    const onRetry = jest.fn();
    const fn = jest.fn()
      .mockRejectedValueOnce(new Error('fail1'))
      .mockResolvedValue('success');

    const promise = retryWithBackoff(fn, {
      maxRetries: 3,
      baseDelayMs: 100,
      onRetry,
    });

    await jest.advanceTimersByTimeAsync(200);
    await promise;

    expect(onRetry).toHaveBeenCalledTimes(1);
    expect(onRetry).toHaveBeenCalledWith(
      expect.any(Error),
      1,
      expect.any(Number),
    );
  });
});

describe('CircuitBreaker', () => {
  test('transitions to Open when threshold is reached', async () => {
    const breaker = new CircuitBreaker({
      failureThreshold: 3,
      successThreshold: 1,
      resetTimeoutMs: 1000,
      halfOpenMaxConcurrent: 1,
      monitorWindowMs: 60000,
    });

    const failingFn = () => Promise.reject(new Error('fail'));

    // 3 failures
    for (let i = 0; i < 3; i++) {
      await expect(breaker.execute(failingFn)).rejects.toThrow();
    }

    // 4th call gets CircuitOpenError
    await expect(breaker.execute(failingFn)).rejects.toThrow(CircuitOpenError);
    expect(breaker.currentState).toBe('open');
  });

  test('transitions to Half-Open after reset time', async () => {
    jest.useFakeTimers();

    const breaker = new CircuitBreaker({
      failureThreshold: 2,
      successThreshold: 1,
      resetTimeoutMs: 5000,
      halfOpenMaxConcurrent: 1,
      monitorWindowMs: 60000,
    });

    const failingFn = () => Promise.reject(new Error('fail'));

    // Transition to Open
    await expect(breaker.execute(failingFn)).rejects.toThrow();
    await expect(breaker.execute(failingFn)).rejects.toThrow();
    expect(breaker.currentState).toBe('open');

    // Wait 5 seconds
    jest.advanceTimersByTime(5001);

    // Next request transitions to Half-Open
    const successFn = () => Promise.resolve('ok');
    const result = await breaker.execute(successFn);
    expect(result).toBe('ok');
    expect(breaker.currentState).toBe('closed');

    jest.useRealTimers();
  });
});
```

### 7.2 Integration Tests

```typescript
// Integration tests using Nock
import nock from 'nock';

describe('ResilientHttpClient Integration', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('succeeds after transient 503 errors via retry', async () => {
    nock('https://api.example.com')
      .get('/data')
      .reply(503, 'Service Unavailable')
      .get('/data')
      .reply(503, 'Service Unavailable')
      .get('/data')
      .reply(200, { result: 'success' });

    const client = new ResilientHttpClient({
      timeout: 5000,
      maxRetries: 3,
      circuitBreaker: {
        failureThreshold: 10,
        successThreshold: 1,
        resetTimeoutMs: 30000,
        halfOpenMaxConcurrent: 1,
        monitorWindowMs: 60000,
      },
      bulkhead: { maxConcurrent: 10, maxQueue: 50 },
    });

    const response = await client.request('https://api.example.com/data');
    const data = await response.json();
    expect(data.result).toBe('success');
  });

  test('respects the Retry-After header', async () => {
    const start = Date.now();

    nock('https://api.example.com')
      .get('/limited')
      .reply(429, 'Too Many Requests', { 'Retry-After': '2' })
      .get('/limited')
      .reply(200, { result: 'ok' });

    const response = await retryWithRetryAfter(
      () => fetch('https://api.example.com/limited'),
      3,
    );

    const elapsed = Date.now() - start;
    expect(elapsed).toBeGreaterThanOrEqual(2000);
    expect(response.status).toBe(200);
  });
});
```

---

## 8. Major Libraries and Frameworks

### 8.1 Retry Libraries by Language

```
TypeScript/JavaScript:
  - p-retry: Promise-based retry
  - cockatiel: Circuit breaker + retry + bulkhead
  - axios-retry: Retry plugin for Axios
  - got: HTTP client (retry built-in)

Python:
  - tenacity: General-purpose retry library
  - aiohttp-retry: Retry for aiohttp
  - stamina: Modern retry library
  - pybreaker: Circuit breaker

Go:
  - cenkalti/backoff: Exponential backoff
  - sony/gobreaker: Circuit breaker
  - avast/retry-go: Retry library
  - hashicorp/go-retryablehttp: HTTP client

Java/Kotlin:
  - resilience4j: Circuit breaker + retry + bulkhead
  - Spring Retry: For the Spring framework
  - Failsafe: Retry + circuit breaker

Rust:
  - backon: Async retry
  - reqwest-retry: Retry middleware for reqwest
```

### 8.2 Library Usage Examples

```typescript
// cockatiel usage example
import {
  retry,
  handleAll,
  ExponentialBackoff,
  CircuitBreakerPolicy,
  ConsecutiveBreaker,
  wrap,
  bulkhead,
} from 'cockatiel';

// Retry policy
const retryPolicy = retry(handleAll, {
  maxAttempts: 3,
  backoff: new ExponentialBackoff({
    initialDelay: 1000,
    maxDelay: 30000,
  }),
});

// Circuit breaker policy
const circuitBreakerPolicy = new CircuitBreakerPolicy(handleAll, {
  halfOpenAfter: 30000,
  breaker: new ConsecutiveBreaker(5),
});

// Bulkhead policy
const bulkheadPolicy = bulkhead(10, 50);

// Combine policies
const policy = wrap(bulkheadPolicy, circuitBreakerPolicy, retryPolicy);

// Usage
const result = await policy.execute(() => fetch('https://api.example.com/data'));
```

```python
# tenacity usage example
from tenacity import (
    retry,
    stop_after_attempt,
    wait_exponential,
    retry_if_exception_type,
    before_sleep_log,
    after_log,
)
import logging

logger = logging.getLogger(__name__)


@retry(
    stop=stop_after_attempt(5),
    wait=wait_exponential(multiplier=1, min=1, max=30),
    retry=retry_if_exception_type((ConnectionError, TimeoutError)),
    before_sleep=before_sleep_log(logger, logging.WARNING),
    after=after_log(logger, logging.INFO),
)
async def fetch_data(url: str) -> dict:
    async with aiohttp.ClientSession() as session:
        async with session.get(url, timeout=5) as resp:
            resp.raise_for_status()
            return await resp.json()


# Custom retry condition
@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=60),
    retry=retry_if_exception_type(ConnectionError),
)
async def create_order(order_data: dict) -> dict:
    return await api_client.post("/orders", json=order_data)
```

```go
// go-retryablehttp usage example
package main

import (
	"log"
	"net/http"
	"time"

	"github.com/hashicorp/go-retryablehttp"
)

func main() {
	client := retryablehttp.NewClient()
	client.RetryMax = 3
	client.RetryWaitMin = 1 * time.Second
	client.RetryWaitMax = 30 * time.Second
	client.Logger = log.Default()

	// Custom retry condition
	client.CheckRetry = func(ctx context.Context, resp *http.Response, err error) (bool, error) {
		if err != nil {
			return true, nil // Retry on network errors
		}
		if resp.StatusCode == 429 || resp.StatusCode >= 500 {
			return true, nil
		}
		return false, nil
	}

	resp, err := client.Get("https://api.example.com/data")
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()
}
```

---

## 9. Operational Best Practices

### 9.1 Metrics and Monitoring

```
Important metrics for retry:
  1. Retry rate
     → Ratio of retries to total requests
     → If high, there may be issues with a downstream service

  2. Retry success rate
     → Percentage that ultimately succeeded via retry
     → If low, retries are adding unnecessary load

  3. Circuit breaker state transition count
     → Frequency of transitioning to Open
     → Frequency of transitioning from Half-Open back to Open

  4. Average retry count
     → Average number of retries before success
     → An increasing trend indicates a worsening problem

  5. Dead letter queue size
     → Number of jobs where all retries failed
     → Alert if increasing
```

```typescript
// Prometheus metrics collection example
import { Counter, Histogram, Gauge } from 'prom-client';

const retryCounter = new Counter({
  name: 'http_client_retries_total',
  help: 'Total number of retries',
  labelNames: ['service', 'status', 'method'],
});

const retryDuration = new Histogram({
  name: 'http_client_retry_duration_seconds',
  help: 'Duration of retry cycles',
  labelNames: ['service', 'result'],
  buckets: [0.1, 0.5, 1, 2, 5, 10, 30],
});

const circuitBreakerState = new Gauge({
  name: 'circuit_breaker_state',
  help: 'Circuit breaker state (0=closed, 1=open, 2=half-open)',
  labelNames: ['service'],
});

// Retry with metrics
async function retryWithMetrics<T>(
  serviceName: string,
  fn: () => Promise<T>,
  options: Partial<RetryOptions>,
): Promise<T> {
  const timer = retryDuration.startTimer({ service: serviceName });

  try {
    const result = await retryWithBackoff(fn, {
      ...options,
      onRetry: (error, attempt, delay) => {
        retryCounter.inc({
          service: serviceName,
          status: error instanceof HttpError ? String(error.statusCode) : 'network',
          method: 'GET',
        });
        options.onRetry?.(error, attempt, delay);
      },
    });

    timer({ result: 'success' });
    return result;
  } catch (error) {
    timer({ result: 'failure' });
    throw error;
  }
}
```

### 9.2 Configuration Tuning

```
Retry configuration guidelines:

  External API calls:
    maxRetries: 3
    baseDelay: 1000ms
    maxDelay: 30000ms
    jitter: full

  Database connections:
    maxRetries: 5
    baseDelay: 500ms
    maxDelay: 10000ms
    jitter: equal

  Message queues:
    maxRetries: 10
    baseDelay: 1000ms
    maxDelay: 60000ms
    jitter: decorrelated

  Circuit breaker:
    failureThreshold: 5-10
    resetTimeout: 15-60 seconds
    halfOpenMaxConcurrent: 1-3

  Bulkhead:
    maxConcurrent: Adjust according to service capacity
    maxQueue: 2-5 times maxConcurrent

  Notes:
    → Retry count × backoff time < request timeout
    → Consider upstream timeouts (deadline propagation)
    → Validate tuning with load tests
```

---


## FAQ

### Q1: What is the most important takeaway when learning this topic?

Gaining hands-on experience is the most important thing. Understanding deepens not just through theory, but by actually writing and running code.

### Q2: What common mistakes do beginners make?

Skipping the fundamentals and jumping to advanced topics. We recommend thoroughly understanding the basic concepts explained in this guide before moving to the next step.

### Q3: How is this knowledge applied in real-world work?

The knowledge covered in this topic is frequently used in day-to-day development work. It becomes especially important during code reviews and architecture design.

---

## Summary

| Strategy | Purpose | Use Case |
|----------|---------|----------|
| Fixed interval retry | Simple retry | Minor transient failures |
| Exponential backoff | Gradually reduce load | API limits, server failures |
| Jitter | Distribute simultaneous retries | Multi-client environments |
| Circuit breaker | Prevent cascading failures | Microservices |
| Bulkhead | Resource isolation | Multi-service dependencies |
| Retry budget | Prevent retry storms | Distributed systems |
| Deadline propagation | Control timeout chains | Multi-hop calls |
| Idempotency key | Safe retry | POST/PATCH operations |

---

## Recommended Next Guides

---

## References
1. AWS Architecture Blog. "Exponential Backoff and Jitter." 2015.
2. Nygard, M. "Release It!" Pragmatic Bookshelf, 2018.
3. Google SRE Book. "Handling Overload." O'Reilly, 2016.
4. Polly Project. "Resilience and transient-fault-handling." GitHub.
5. Netflix Tech Blog. "Making the Netflix API More Resilient." 2011.
6. Fowler, M. "CircuitBreaker." martinfowler.com, 2014.
7. gRPC Documentation. "Retry Design." grpc.io.
8. Microsoft Azure Architecture Center. "Retry Pattern." docs.microsoft.com.
9. Cockroach Labs. "Building a Resilient System with Retry Budgets." 2020.
10. Envoy Proxy. "Circuit Breaking." envoyproxy.io.



===== SOURCE: 02-programming/async-and-error-handling/docs/03-advanced/03-structured-concurrency.md =====

# Structured Concurrency

> Structured concurrency is a paradigm for "structurally managing the lifetime of concurrent operations." Through Kotlin coroutines, Swift structured concurrency, and Python TaskGroup, it enables safe concurrent programming.

## What You Will Learn in This Chapter

- [ ] Understand the principles of structured concurrency
- [ ] Grasp the problems of unstructured concurrency
- [ ] Learn implementations in various languages
- [ ] Understand cancellation propagation mechanisms
- [ ] Grasp integration with error handling
- [ ] Master practical application patterns

## Prerequisites

Before reading this guide, having the following knowledge will deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts
- Understanding of the content in [Retry Strategies](./02-retry-and-backoff.md)

---

## 1. What Is Structured Concurrency

### 1.1 Core Concept

```
Unstructured Concurrency (Traditional):
  -> Tasks are "fired and forgotten"
  -> Child tasks survive after parent terminates
  -> Errors are silently swallowed in child tasks
  -> Resource leaks

  function process() {
    startBackgroundTask(); // Fire and forget
    startAnotherTask();    // Who manages this task's lifetime?
  } // Tasks continue running after process returns

Structured Concurrency:
  -> Child tasks complete within the parent's scope
  -> Parent waits for all child tasks to complete
  -> If one child task fails, others are cancelled
  -> No resource leaks

  async function process() {
    await Promise.all([  // Wait for all child tasks to complete
      task1(),
      task2(),
    ]);
  } // All tasks are guaranteed to be complete here
```

### 1.2 Comparison with Structured Programming

```
Structured Programming (1968, Dijkstra):
  -> Eliminated goto, structured the control flow
  -> Scopes made explicit with if/else, while, for
  -> Clear entry and exit points in code

  Unstructured: goto label;  // No telling where it jumps
  Structured:   if (...) { ... }  // Scope is clear

Structured Concurrency (2018, Elizarov, Syme):
  -> Eliminated "fire and forget," structured the lifetime of concurrent operations
  -> Task scopes made explicit
  -> Clear start and end points for tasks

  Unstructured: Task.run(() => ...) // No telling where it ends
  Structured:   async with TaskGroup() { ... } // Completion guaranteed within scope

Common Principles:
  -> Clarification of control flow
  -> Scope-based resource management
  -> Improved readability and debuggability
```

### 1.3 Problems with Unstructured Concurrency

```
Problem 1: Resource Leaks
  function startProcessing() {
    setTimeout(() => {
      // Who manages this callback?
      // It outlives the scope of startProcessing
      processData();
    }, 5000);
  }

Problem 2: Swallowed Errors
  function fetchAll() {
    fetch('/api/users');     // No one catches errors
    fetch('/api/products');  // Same issue
  }

Problem 3: Difficulty of Cancellation
  function loadDashboard() {
    const p1 = fetch('/api/users');
    const p2 = fetch('/api/stats');
    // If the user navigates away, cancelling p1 and p2 is difficult
    // Each needs its own AbortController
  }

Problem 4: Difficulty of Debugging
  -> Stack traces of async tasks are fragmented
  -> Parent-child relationships are unclear
  -> Tracking which task is running at which point is difficult
```

---

## 2. Kotlin Coroutines

### 2.1 coroutineScope: The Basics of Structured Concurrency

```kotlin
import kotlinx.coroutines.*

// coroutineScope: Scope for structured concurrency
suspend fun loadDashboard(): Dashboard = coroutineScope {
    // Launch child coroutines
    val userDeferred = async { fetchUser() }
    val ordersDeferred = async { fetchOrders() }
    val statsDeferred = async { fetchStats() }

    // Wait for all results
    Dashboard(
        user = userDeferred.await(),
        orders = ordersDeferred.await(),
        stats = statsDeferred.await(),
    )
    // When exiting coroutineScope, all child coroutines are guaranteed to be complete
    // If one throws an exception, the others are cancelled
}
```

### 2.2 supervisorScope: Handling Child Errors Independently

```kotlin
// supervisorScope: Child errors do not affect siblings
suspend fun loadDashboardResilient(): Dashboard = supervisorScope {
    val user = async { fetchUser() }
    val orders = async {
        try { fetchOrders() }
        catch (e: Exception) { emptyList() } // Fallback
    }
    val stats = async {
        try { fetchStats() }
        catch (e: Exception) { Stats.empty() }
    }

    Dashboard(
        user = user.await(),
        orders = orders.await(),
        stats = stats.await(),
    )
}

// Choosing between coroutineScope and supervisorScope
//
// coroutineScope:
//   -> When all tasks must succeed
//   -> One failure -> cancel all
//   -> Example: Transaction-like operations
//
// supervisorScope:
//   -> When individual tasks are independent
//   -> One failure does not stop the others
//   -> Example: Loading individual dashboard components
```

### 2.3 Cancellation in Kotlin

```kotlin
import kotlinx.coroutines.*

// Cancellation basics
suspend fun processWithCancellation() {
    val job = CoroutineScope(Dispatchers.Default).launch {
        try {
            repeat(1000) { i ->
                println("Processing $i...")
                delay(100) // Cancellation point
            }
        } catch (e: CancellationException) {
            println("Cancelled!")
            // Cleanup operations
        } finally {
            // Release resources
            withContext(NonCancellable) {
                // This block executes even after cancellation
                cleanup()
            }
        }
    }

    delay(500)
    job.cancel() // Request cancellation
    job.join()   // Wait for cancellation to complete
}

// Best practices for cancellation support
suspend fun downloadFile(url: String, dest: File) = coroutineScope {
    val response = httpClient.get(url)
    val channel = response.bodyAsChannel()

    dest.outputStream().use { output ->
        val buffer = ByteArray(8192)
        while (true) {
            // Periodically check for cancellation with ensureActive()
            ensureActive()

            val bytesRead = channel.readAvailable(buffer)
            if (bytesRead == -1) break

            output.write(buffer, 0, bytesRead)
        }
    }
}

// Processing with timeout
suspend fun fetchWithTimeout(): Result {
    return withTimeout(5000) { // 5-second timeout
        fetchData()
    }
    // Throws TimeoutCancellationException on timeout
}

// Return null on timeout
suspend fun fetchWithTimeoutOrNull(): Result? {
    return withTimeoutOrNull(5000) {
        fetchData()
    }
    // Returns null on timeout (no exception)
}
```

### 2.4 Advanced Patterns in Kotlin

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

// Fan-out: One producer, multiple consumers
suspend fun fanOutExample() = coroutineScope {
    val channel = produce {
        repeat(100) { send(it) }
    }

    // Process with 5 workers
    repeat(5) { workerId ->
        launch {
            for (item in channel) {
                println("Worker $workerId processing $item")
                processItem(item)
            }
        }
    }
}

// Fan-in: Multiple producers, one consumer
suspend fun fanInExample() = coroutineScope {
    val results = Channel<ProcessResult>()

    // Multiple producers
    val sources = listOf("api-1", "api-2", "api-3")
    sources.forEach { source ->
        launch {
            val data = fetchFromSource(source)
            results.send(ProcessResult(source, data))
        }
    }

    // Collect all results
    launch {
        val allResults = mutableListOf<ProcessResult>()
        repeat(sources.size) {
            allResults.add(results.receive())
        }
        processAllResults(allResults)
        results.close()
    }
}

// Race pattern: Return the first success
suspend fun raceExample(): String = coroutineScope {
    select<String> {
        async { fetchFromPrimary() }.onAwait { it }
        async { fetchFromSecondary() }.onAwait { it }
        async { fetchFromTertiary() }.onAwait { it }
    }
    // Returns the first to complete, cancels the rest
}

// Concurrent processing with backpressure
fun processWithBackpressure(items: List<Item>): Flow<Result> = flow {
    coroutineScope {
        val semaphore = Semaphore(10) // Concurrency limit
        items.map { item ->
            async {
                semaphore.withPermit {
                    processItem(item)
                }
            }
        }.forEach { deferred ->
            emit(deferred.await())
        }
    }
}

// Structured concurrency with built-in error recovery
suspend fun resilientDashboard(): Dashboard = supervisorScope {
    val user = async {
        retryWithBackoff(maxRetries = 3) { fetchUser() }
    }

    val orders = async {
        try {
            withTimeout(5000) { fetchOrders() }
        } catch (e: Exception) {
            logger.warn("Failed to fetch orders: ${e.message}")
            emptyList()
        }
    }

    val recommendations = async {
        try {
            withTimeoutOrNull(3000) { fetchRecommendations() }
                ?: Recommendations.default()
        } catch (e: Exception) {
            Recommendations.default()
        }
    }

    Dashboard(
        user = user.await(),
        orders = orders.await(),
        recommendations = recommendations.await(),
    )
}
```

---

## 3. Swift Structured Concurrency

### 3.1 async let: Static Concurrency

```swift
// Swift: Concurrently execute a static number of tasks with async let
func loadDashboard() async throws -> Dashboard {
    async let user = fetchUser()           // Start concurrently
    async let orders = fetchOrders()       // Start concurrently
    async let stats = fetchStats()         // Start concurrently

    return try await Dashboard(
        user: user,
        orders: orders,
        stats: stats,
    )
    // Waits for all async let bindings to complete
    // If one throws, the others are automatically cancelled
}
```

### 3.2 TaskGroup: Dynamic Concurrency

```swift
// TaskGroup: Dynamic number of tasks
func processItems(_ items: [Item]) async throws -> [Result] {
    try await withThrowingTaskGroup(of: Result.self) { group in
        for item in items {
            group.addTask {
                try await processItem(item)
            }
        }

        var results: [Result] = []
        for try await result in group {
            results.append(result)
        }
        return results
    }
    // Outside TaskGroup scope = all tasks guaranteed complete
}

// TaskGroup with concurrency limit
func processWithConcurrencyLimit(
    items: [Item],
    maxConcurrent: Int = 5
) async throws -> [Result] {
    try await withThrowingTaskGroup(of: Result.self) { group in
        var results: [Result] = []
        var iterator = items.makeIterator()
        var inFlight = 0

        // Submit initial batch
        while inFlight < maxConcurrent, let item = iterator.next() {
            group.addTask { try await processItem(item) }
            inFlight += 1
        }

        // Submit next task as each one completes
        for try await result in group {
            results.append(result)
            inFlight -= 1
            if let item = iterator.next() {
                group.addTask { try await processItem(item) }
                inFlight += 1
            }
        }

        return results
    }
}
```

### 3.3 Cancellation in Swift

```swift
// Checking for and responding to cancellation
func downloadFile(url: URL) async throws -> Data {
    var data = Data()
    let (bytes, _) = try await URLSession.shared.bytes(from: url)

    for try await byte in bytes {
        // Periodically check for cancellation
        try Task.checkCancellation()
        data.append(byte)
    }

    return data
}

// Cleanup on cancellation
func processWithCleanup() async throws {
    let tempFile = createTempFile()

    do {
        try await longRunningProcess(tempFile)
    } catch is CancellationError {
        // Cleanup on cancellation
        try? FileManager.default.removeItem(at: tempFile)
        throw CancellationError()
    }
}

// withTaskCancellationHandler: Cancellation handler
func fetchData() async throws -> Data {
    let handle = startNetworkRequest()

    return try await withTaskCancellationHandler {
        // Main operation
        try await handle.result()
    } onCancel: {
        // Cancel network request on cancellation
        handle.cancel()
    }
}

// Implementing timeout
func fetchWithTimeout<T>(
    seconds: TimeInterval,
    operation: @Sendable () async throws -> T
) async throws -> T {
    try await withThrowingTaskGroup(of: T.self) { group in
        group.addTask {
            try await operation()
        }
        group.addTask {
            try await Task.sleep(nanoseconds: UInt64(seconds * 1_000_000_000))
            throw TimeoutError()
        }
        // Return the first to complete
        let result = try await group.next()!
        group.cancelAll() // Cancel the rest
        return result
    }
}
```

### 3.4 Actor: Preventing Data Races

```swift
// Actor: Thread-safe data access
actor UserCache {
    private var cache: [String: User] = [:]
    private var inFlightRequests: [String: Task<User, Error>] = [:]

    func getUser(id: String) async throws -> User {
        // Cache hit
        if let cached = cache[id] {
            return cached
        }

        // Wait if a request for the same user is already in flight
        if let existing = inFlightRequests[id] {
            return try await existing.value
        }

        // Start a new request
        let task = Task {
            let user = try await fetchUser(id: id)
            cache[id] = user
            inFlightRequests[id] = nil
            return user
        }

        inFlightRequests[id] = task
        return try await task.value
    }

    func invalidate(id: String) {
        cache.removeValue(forKey: id)
    }

    func invalidateAll() {
        cache.removeAll()
    }
}

// GlobalActor: Guaranteeing execution in a specific context
@globalActor
actor DatabaseActor {
    static let shared = DatabaseActor()
}

@DatabaseActor
class DatabaseManager {
    private var connection: Connection?

    func query(_ sql: String) async throws -> [Row] {
        // Executes in the DatabaseActor context
        // Automatically thread-safe
        guard let conn = connection else {
            throw DatabaseError.notConnected
        }
        return try await conn.execute(sql)
    }
}

// Sendable protocol: Guaranteeing concurrency-safe types
struct UserData: Sendable {
    let id: String
    let name: String
    let email: String
}

// @Sendable closure
func processInBackground(_ data: UserData) {
    Task.detached { @Sendable in
        // data is Sendable, so it can be safely passed
        await processUser(data)
    }
}
```

---

## 4. Python TaskGroup (3.11+)

### 4.1 Basic Usage

```python
import asyncio

# Python 3.11+: TaskGroup
async def load_dashboard():
    async with asyncio.TaskGroup() as tg:
        user_task = tg.create_task(fetch_user())
        orders_task = tg.create_task(fetch_orders())
        stats_task = tg.create_task(fetch_stats())

    # All tasks are complete after exiting async with
    # If one raises an exception -> others are cancelled -> ExceptionGroup is raised
    return Dashboard(
        user=user_task.result(),
        orders=orders_task.result(),
        stats=stats_task.result(),
    )
```

### 4.2 Handling ExceptionGroup

```python
# Handling ExceptionGroup (Python 3.11+)
async def resilient_load():
    try:
        async with asyncio.TaskGroup() as tg:
            tg.create_task(task_a())
            tg.create_task(task_b())
    except* ValueError as eg:
        print(f"ValueError group: {eg.exceptions}")
        for exc in eg.exceptions:
            print(f"  - {exc}")
    except* TypeError as eg:
        print(f"TypeError group: {eg.exceptions}")
    except* ConnectionError as eg:
        print(f"ConnectionError group: {eg.exceptions}")

# ExceptionGroup structure
# ExceptionGroup wraps multiple exceptions
# except* selectively catches only specific exception types
# Remaining exceptions are re-raised

# Multiple except* blocks
async def handle_multiple_errors():
    try:
        async with asyncio.TaskGroup() as tg:
            tg.create_task(task_that_may_raise_value_error())
            tg.create_task(task_that_may_raise_type_error())
            tg.create_task(task_that_may_raise_io_error())
    except* ValueError as eg:
        # Handle only ValueError
        for exc in eg.exceptions:
            log_validation_error(exc)
    except* (TypeError, IOError) as eg:
        # Handle TypeError and IOError together
        for exc in eg.exceptions:
            log_system_error(exc)
    # Exception types not handled above are re-raised
```

### 4.3 Cancellation

```python
import asyncio
from contextlib import asynccontextmanager


# TaskGroup with timeout
async def load_with_timeout():
    try:
        async with asyncio.timeout(5.0):
            async with asyncio.TaskGroup() as tg:
                user_task = tg.create_task(fetch_user())
                orders_task = tg.create_task(fetch_orders())
    except TimeoutError:
        print("Dashboard loading timed out")
        return Dashboard.default()

    return Dashboard(
        user=user_task.result(),
        orders=orders_task.result(),
    )


# Cancellation-aware task
async def cancellable_download(url: str, dest: str) -> None:
    """Download with cancellation support"""
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            with open(dest, 'wb') as f:
                async for chunk in response.content.iter_chunked(8192):
                    # asyncio.CancelledError propagates automatically
                    f.write(chunk)


# shield: Protect from cancellation
async def critical_operation():
    """Protect a critical operation from cancellation"""
    # Wrapping with shield prevents external cancellation from propagating inside
    result = await asyncio.shield(save_to_database(data))
    return result


# Cancellation handling pattern
async def process_with_cleanup():
    """Execute cleanup on cancellation"""
    resource = await acquire_resource()
    try:
        await long_running_process(resource)
    except asyncio.CancelledError:
        # Cleanup on cancellation
        await cleanup_resource(resource)
        raise  # CancelledError must always be re-raised
    finally:
        await release_resource(resource)
```

### 4.4 Advanced Patterns

```python
import asyncio
from typing import TypeVar, Callable, Awaitable, AsyncIterator
from dataclasses import dataclass

T = TypeVar('T')
R = TypeVar('R')


# Batch processing with concurrency limit
async def map_concurrent(
    items: list[T],
    func: Callable[[T], Awaitable[R]],
    max_concurrent: int = 10,
) -> list[R]:
    """Process items with a concurrency limit"""
    semaphore = asyncio.Semaphore(max_concurrent)
    results: list[R] = [None] * len(items)  # type: ignore

    async def process_with_limit(index: int, item: T) -> None:
        async with semaphore:
            results[index] = await func(item)

    async with asyncio.TaskGroup() as tg:
        for i, item in enumerate(items):
            tg.create_task(process_with_limit(i, item))

    return results


# Usage example
async def main():
    urls = [f"https://api.example.com/items/{i}" for i in range(100)]
    results = await map_concurrent(
        urls,
        fetch_url,
        max_concurrent=20,
    )


# Race: Return the first success
async def race(*coros: Awaitable[T]) -> T:
    """Return the result of the first coroutine to succeed"""
    async with asyncio.TaskGroup() as tg:
        done = asyncio.Event()
        result_holder: list[T] = []

        async def run_and_signal(coro: Awaitable[T]) -> None:
            try:
                result = await coro
                if not done.is_set():
                    result_holder.append(result)
                    done.set()
            except Exception:
                pass  # Ignore failures

        for coro in coros:
            tg.create_task(run_and_signal(coro))

        # Note: TaskGroup waits for all tasks to complete
        # TaskGroup is not ideal for the race pattern
        # asyncio.wait(return_when=FIRST_COMPLETED) is more appropriate

    if result_holder:
        return result_holder[0]
    raise RuntimeError("All tasks failed")


# Proper race implementation using asyncio.wait
async def race_proper(*coros: Awaitable[T]) -> T:
    """Wait for the first completion using asyncio.wait"""
    tasks = [asyncio.ensure_future(c) for c in coros]

    try:
        done, pending = await asyncio.wait(
            tasks, return_when=asyncio.FIRST_COMPLETED
        )

        # Cancel remaining tasks
        for task in pending:
            task.cancel()

        # Wait for cancellation to complete
        if pending:
            await asyncio.wait(pending)

        # Return the result of the first completed task
        result_task = done.pop()
        return result_task.result()

    except Exception:
        # Cancel all tasks on error
        for task in tasks:
            task.cancel()
        raise


# Pipeline: Process in stages
async def pipeline_example():
    """Multi-stage pipeline"""
    queue1: asyncio.Queue[RawData] = asyncio.Queue(maxsize=100)
    queue2: asyncio.Queue[ProcessedData] = asyncio.Queue(maxsize=100)

    async def stage1_fetch():
        """Stage 1: Data fetching"""
        for url in urls:
            data = await fetch_data(url)
            await queue1.put(data)
        await queue1.put(None)  # Termination signal

    async def stage2_process():
        """Stage 2: Data processing"""
        while True:
            data = await queue1.get()
            if data is None:
                await queue2.put(None)
                break
            processed = await process_data(data)
            await queue2.put(processed)

    async def stage3_save():
        """Stage 3: Data saving"""
        while True:
            data = await queue2.get()
            if data is None:
                break
            await save_data(data)

    async with asyncio.TaskGroup() as tg:
        tg.create_task(stage1_fetch())
        tg.create_task(stage2_process())
        tg.create_task(stage3_save())


# Resource management with structured concurrency
@asynccontextmanager
async def managed_workers(
    num_workers: int,
    work_queue: asyncio.Queue,
    handler: Callable,
):
    """Lifecycle management for a worker pool"""
    async def worker(worker_id: int):
        while True:
            try:
                item = await asyncio.wait_for(work_queue.get(), timeout=1.0)
                await handler(worker_id, item)
                work_queue.task_done()
            except asyncio.TimeoutError:
                continue
            except asyncio.CancelledError:
                break

    tasks = []
    try:
        for i in range(num_workers):
            task = asyncio.create_task(worker(i))
            tasks.append(task)
        yield tasks
    finally:
        for task in tasks:
            task.cancel()
        await asyncio.gather(*tasks, return_exceptions=True)


# Usage example
async def process_with_workers():
    queue: asyncio.Queue = asyncio.Queue()

    # Add items to the queue
    for item in items:
        await queue.put(item)

    async with managed_workers(5, queue, process_item):
        await queue.join()  # Wait for all items to be processed
```

---

## 5. Structured Concurrency in JavaScript/TypeScript

### 5.1 Promise.all -- Basic Concurrent Processing

```typescript
// Promise.all: Wait for all tasks to complete (partial structured concurrency)
async function loadDashboard(): Promise<Dashboard> {
  const [user, orders, stats] = await Promise.all([
    fetchUser(),
    fetchOrders(),
    fetchStats(),
  ]);

  return { user, orders, stats };
}

// Limitations:
// 1. If one fails, the others immediately reject, but are NOT cancelled
// 2. The remaining Promises continue executing in the background
// 3. There is no explicit cancellation mechanism
```

### 5.2 Promise.allSettled -- Error Resilience

```typescript
// Promise.allSettled: Wait for all tasks to complete (regardless of success/failure)
async function loadDashboardResilient(): Promise<Dashboard> {
  const results = await Promise.allSettled([
    fetchUser(),
    fetchOrders(),
    fetchStats(),
  ]);

  const user = results[0].status === 'fulfilled'
    ? results[0].value
    : null;

  const orders = results[1].status === 'fulfilled'
    ? results[1].value
    : [];

  const stats = results[2].status === 'fulfilled'
    ? results[2].value
    : Stats.default();

  if (!user) {
    throw new Error('Failed to fetch user');
  }

  return { user, orders, stats };
}

// Helper functions for easier use
function extractResult<T>(result: PromiseSettledResult<T>): T | null {
  return result.status === 'fulfilled' ? result.value : null;
}

function extractResults<T extends readonly unknown[]>(
  results: { [K in keyof T]: PromiseSettledResult<T[K]> },
): { [K in keyof T]: T[K] | null } {
  return results.map(extractResult) as any;
}
```

### 5.3 Pseudo-Structured Concurrency with AbortController

```typescript
// Cancellation-aware concurrent processing using AbortController
class StructuredScope {
  private controller = new AbortController();
  private tasks: Promise<any>[] = [];

  get signal(): AbortSignal {
    return this.controller.signal;
  }

  addTask<T>(fn: (signal: AbortSignal) => Promise<T>): Promise<T> {
    const task = fn(this.signal);
    this.tasks.push(task);
    return task;
  }

  async run<T>(
    fn: (scope: StructuredScope) => Promise<T>,
  ): Promise<T> {
    try {
      const result = await fn(this);
      // Wait for remaining tasks to complete
      await Promise.allSettled(this.tasks);
      return result;
    } catch (error) {
      // Cancel all tasks on error
      this.controller.abort();
      // Wait for cancellation to complete
      await Promise.allSettled(this.tasks);
      throw error;
    }
  }

  cancel(reason?: string): void {
    this.controller.abort(reason);
  }
}

// Usage example
async function loadWithScope(): Promise<Dashboard> {
  const scope = new StructuredScope();

  return scope.run(async (s) => {
    const userPromise = s.addTask(async (signal) => {
      const response = await fetch('/api/user', { signal });
      return response.json();
    });

    const ordersPromise = s.addTask(async (signal) => {
      const response = await fetch('/api/orders', { signal });
      return response.json();
    });

    const [user, orders] = await Promise.all([userPromise, ordersPromise]);
    return { user, orders, stats: null };
  });
}

// Scope with timeout
async function loadWithTimeout(): Promise<Dashboard> {
  const scope = new StructuredScope();

  // Cancel on timeout
  const timeout = setTimeout(() => scope.cancel('timeout'), 5000);

  try {
    return await scope.run(async (s) => {
      const user = await s.addTask((signal) =>
        fetchWithSignal('/api/user', signal)
      );
      const orders = await s.addTask((signal) =>
        fetchWithSignal('/api/orders', signal)
      );
      return { user, orders, stats: null };
    });
  } finally {
    clearTimeout(timeout);
  }
}
```

### 5.4 Concurrency-Limited Processing

```typescript
// Semaphore-based concurrency limiting
class AsyncSemaphore {
  private current = 0;
  private queue: Array<() => void> = [];

  constructor(private readonly limit: number) {}

  async acquire(): Promise<void> {
    if (this.current < this.limit) {
      this.current++;
      return;
    }

    return new Promise<void>((resolve) => {
      this.queue.push(resolve);
    });
  }

  release(): void {
    if (this.queue.length > 0) {
      const next = this.queue.shift()!;
      next();
    } else {
      this.current--;
    }
  }

  async withPermit<T>(fn: () => Promise<T>): Promise<T> {
    await this.acquire();
    try {
      return await fn();
    } finally {
      this.release();
    }
  }
}

// Concurrency-limited map
async function mapConcurrent<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  concurrency: number = 10,
): Promise<R[]> {
  const semaphore = new AsyncSemaphore(concurrency);
  return Promise.all(
    items.map((item) =>
      semaphore.withPermit(() => fn(item))
    ),
  );
}

// Usage example
const results = await mapConcurrent(
  urls,
  async (url) => {
    const response = await fetch(url);
    return response.json();
  },
  5, // Max 5 concurrent
);
```

---

## 6. Structured Concurrency in Rust

### 6.1 tokio::select! Macro

```rust
use tokio::time::{sleep, Duration};

// Wait for the first completion with select!
async fn fetch_with_timeout() -> Result<Data, Error> {
    tokio::select! {
        result = fetch_data() => result,
        _ = sleep(Duration::from_secs(5)) => {
            Err(Error::Timeout)
        }
    }
    // Returns the result of whichever completes first
    // The other is cancelled (Future is dropped)
}

// Receiving from multiple sources
async fn handle_messages(
    mut ws_rx: WebSocketReceiver,
    mut shutdown_rx: tokio::sync::watch::Receiver<bool>,
) {
    loop {
        tokio::select! {
            msg = ws_rx.next() => {
                match msg {
                    Some(Ok(message)) => handle_message(message).await,
                    Some(Err(e)) => {
                        eprintln!("WebSocket error: {}", e);
                        break;
                    }
                    None => break,
                }
            }
            _ = shutdown_rx.changed() => {
                println!("Shutdown signal received");
                break;
            }
        }
    }
}
```

### 6.2 tokio::spawn and JoinSet

```rust
use tokio::task::JoinSet;

// JoinSet: Structured management of concurrent tasks
async fn process_items(items: Vec<Item>) -> Vec<Result<ProcessResult, Error>> {
    let mut set = JoinSet::new();

    for item in items {
        set.spawn(async move {
            process_item(item).await
        });
    }

    let mut results = Vec::new();
    while let Some(result) = set.join_next().await {
        match result {
            Ok(process_result) => results.push(process_result),
            Err(join_error) => {
                eprintln!("Task panicked: {}", join_error);
            }
        }
    }

    results
}

// JoinSet + concurrency limit
async fn process_with_limit(
    items: Vec<Item>,
    max_concurrent: usize,
) -> Vec<ProcessResult> {
    let mut set = JoinSet::new();
    let mut results = Vec::new();
    let mut iter = items.into_iter();

    // Submit initial batch
    for _ in 0..max_concurrent {
        if let Some(item) = iter.next() {
            set.spawn(async move { process_item(item).await });
        }
    }

    // Submit next task as each one completes
    while let Some(result) = set.join_next().await {
        if let Ok(Ok(r)) = result {
            results.push(r);
        }
        if let Some(item) = iter.next() {
            set.spawn(async move { process_item(item).await });
        }
    }

    results
}

// Scoped tasks (Rust-specific)
// Local task management using tokio::task::LocalSet
async fn scoped_tasks() {
    let local = tokio::task::LocalSet::new();

    local.run_until(async {
        let handle1 = tokio::task::spawn_local(async {
            // Local task (Send not required)
            process_local_data().await
        });

        let handle2 = tokio::task::spawn_local(async {
            process_another_local_data().await
        });

        let (r1, r2) = tokio::join!(handle1, handle2);
        println!("Results: {:?}, {:?}", r1, r2);
    }).await;
    // All local tasks are complete when exiting LocalSet scope
}
```

---

## 7. Principles of Structured Concurrency

### 7.1 Three Core Principles

```
Three Principles:

  1. Child tasks live within the parent's scope
     -> Parent terminates = children terminate (leak prevention)
     -> Task lifetime matches the scope
     -> Parent-child relationships are clear when debugging

  2. Error propagation
     -> Child errors propagate to the parent
     -> Errors are not silently swallowed
     -> ExceptionGroup (Python) can handle multiple errors

  3. Cancellation propagation
     -> If the parent is cancelled, children are cancelled too
     -> If one child fails, siblings are also cancelled (coroutineScope)
     -> Cancellation is cooperative

Benefits:
  + Resource leak prevention
  + Reliable error handling
  + Code readability (clear scopes)
  + Ease of debugging
  + Improved testability
  + Ease of reasoning (function exit = all child tasks complete)
```

### 7.2 Cooperative Cancellation

```
Cancellation is a "request," not a "force":

  Cooperative cancellation:
    -> The task that receives the cancellation request voluntarily stops
    -> Tasks check for cancellation at safe stopping points
    -> An opportunity for cleanup is provided

  Cancellation points in each language:
    Kotlin: delay(), yield(), ensureActive(), suspend functions
    Swift:  Task.checkCancellation(), await
    Python: await (asyncio.CancelledError is raised)
    Rust:   When a Future's poll returns Pending

  Best practices on cancellation:
    1. Re-raise CancelledError/CancellationException
    2. Release resources in a finally block
    3. Protect critical sections from cancellation
       -> Kotlin: withContext(NonCancellable)
       -> Python: asyncio.shield()
    4. Periodically check for cancellation
```

### 7.3 Design Pattern Comparison

```
Pattern 1: All or Nothing (all succeed or all fail)
  -> Kotlin: coroutineScope
  -> Swift:  withThrowingTaskGroup
  -> Python: asyncio.TaskGroup
  -> Use case: Transaction-like operations, when all data is required

Pattern 2: Best Effort (succeed as much as possible)
  -> Kotlin: supervisorScope
  -> Swift:  withTaskGroup (with individual error handling)
  -> Python: TaskGroup + except*
  -> JS/TS: Promise.allSettled
  -> Use case: Dashboards, when partial results are acceptable

Pattern 3: First Success (adopt the first success)
  -> Kotlin: select
  -> Swift:  TaskGroup + cancelAll
  -> Python: asyncio.wait(FIRST_COMPLETED)
  -> JS/TS: Promise.race
  -> Use case: Hedge requests, multi-source fetching

Pattern 4: Fan-Out/Fan-In
  -> Multiple producers and consumers
  -> Combined with channels or queues
  -> Use case: Pipeline processing, parallel data processing
```

---

## 8. Practical Application Patterns

### 8.1 Concurrent Microservice Calls

```typescript
// Concurrent API calls in BFF (Backend for Frontend) pattern
class DashboardBFF {
  async getDashboard(userId: string): Promise<DashboardResponse> {
    const [
      userResult,
      ordersResult,
      notificationsResult,
      recommendationsResult,
    ] = await Promise.allSettled([
      // Required: User information
      this.userService.getUser(userId),
      // Required: Order history
      this.orderService.getOrders(userId),
      // Optional: Notifications (failure is acceptable)
      this.notificationService.getUnread(userId),
      // Optional: Recommendations (failure is acceptable)
      this.recommendationService.getForUser(userId),
    ]);

    // Check required data
    if (userResult.status === 'rejected') {
      throw new ServiceError('Failed to fetch user data', userResult.reason);
    }
    if (ordersResult.status === 'rejected') {
      throw new ServiceError('Failed to fetch orders', ordersResult.reason);
    }

    return {
      user: userResult.value,
      orders: ordersResult.value,
      notifications: notificationsResult.status === 'fulfilled'
        ? notificationsResult.value
        : [],
      recommendations: recommendationsResult.status === 'fulfilled'
        ? recommendationsResult.value
        : [],
    };
  }
}
```

### 8.2 Batch Processing

```python
import asyncio
from typing import TypeVar, Callable, Awaitable

T = TypeVar('T')
R = TypeVar('R')


async def batch_process(
    items: list[T],
    processor: Callable[[T], Awaitable[R]],
    batch_size: int = 50,
    max_concurrent: int = 10,
    on_progress: Callable[[int, int], None] | None = None,
) -> tuple[list[R], list[tuple[T, Exception]]]:
    """Batch processing using structured concurrency"""
    results: list[R] = []
    errors: list[tuple[T, Exception]] = []
    completed = 0

    for i in range(0, len(items), batch_size):
        batch = items[i:i + batch_size]
        semaphore = asyncio.Semaphore(max_concurrent)

        async def process_item(item: T) -> tuple[T, R | None, Exception | None]:
            async with semaphore:
                try:
                    result = await processor(item)
                    return (item, result, None)
                except Exception as e:
                    return (item, None, e)

        async with asyncio.TaskGroup() as tg:
            tasks = [
                tg.create_task(process_item(item))
                for item in batch
            ]

        for task in tasks:
            item, result, error = task.result()
            if error:
                errors.append((item, error))
            else:
                results.append(result)

        completed += len(batch)
        if on_progress:
            on_progress(completed, len(items))

    return results, errors


# Usage example
async def main():
    users = await fetch_all_users()

    results, errors = await batch_process(
        users,
        send_notification,
        batch_size=100,
        max_concurrent=20,
        on_progress=lambda done, total: print(f"{done}/{total}"),
    )

    print(f"Sent: {len(results)}, Failed: {len(errors)}")
    for user, error in errors:
        print(f"  Failed for {user.id}: {error}")
```

### 8.3 Health Checks

```kotlin
// Health check for multiple dependent services
data class HealthStatus(
    val service: String,
    val healthy: Boolean,
    val latencyMs: Long,
    val error: String? = null,
)

suspend fun checkAllHealth(): List<HealthStatus> = supervisorScope {
    val services = mapOf(
        "database" to { checkDatabase() },
        "redis" to { checkRedis() },
        "elasticsearch" to { checkElasticsearch() },
        "external-api" to { checkExternalApi() },
    )

    services.map { (name, check) ->
        async {
            val start = System.currentTimeMillis()
            try {
                withTimeout(5000) { check() }
                HealthStatus(
                    service = name,
                    healthy = true,
                    latencyMs = System.currentTimeMillis() - start,
                )
            } catch (e: Exception) {
                HealthStatus(
                    service = name,
                    healthy = false,
                    latencyMs = System.currentTimeMillis() - start,
                    error = e.message,
                )
            }
        }
    }.awaitAll()
}
```

---

## 9. Testing Strategies

### 9.1 Testing Structured Concurrency

```kotlin
// Kotlin: Test dispatchers
@Test
fun `dashboard loads all data concurrently`() = runTest {
    val userService = FakeUserService()
    val orderService = FakeOrderService()

    val dashboard = loadDashboard(userService, orderService)

    assertEquals("Taro Tanaka", dashboard.user.name)
    assertEquals(3, dashboard.orders.size)
}

@Test
fun `partial failure returns fallback data`() = runTest {
    val userService = FakeUserService()
    val orderService = FailingOrderService()

    val dashboard = loadDashboardResilient(userService, orderService)

    assertEquals("Taro Tanaka", dashboard.user.name)
    assertEquals(emptyList(), dashboard.orders) // Fallback
}

@Test
fun `cancellation propagates to child tasks`() = runTest {
    val job = launch {
        loadDashboard(
            SlowUserService(delay = 10.seconds),
            SlowOrderService(delay = 10.seconds),
        )
    }

    advanceTimeBy(1.seconds)
    job.cancel()

    assertTrue(job.isCancelled)
    // Verify that child tasks are also cancelled
}
```

```python
# Python: Testing structured concurrency
import pytest
import asyncio


@pytest.mark.asyncio
async def test_task_group_all_succeed():
    """All tasks succeed"""
    results = []

    async with asyncio.TaskGroup() as tg:
        async def task(value):
            await asyncio.sleep(0.01)
            results.append(value)

        tg.create_task(task(1))
        tg.create_task(task(2))
        tg.create_task(task(3))

    assert sorted(results) == [1, 2, 3]


@pytest.mark.asyncio
async def test_task_group_one_fails():
    """When one task fails, the others are cancelled"""
    with pytest.raises(ExceptionGroup) as exc_info:
        async with asyncio.TaskGroup() as tg:
            tg.create_task(asyncio.sleep(10))  # This gets cancelled
            tg.create_task(failing_task())       # This fails

    assert len(exc_info.value.exceptions) == 1
    assert isinstance(exc_info.value.exceptions[0], ValueError)


@pytest.mark.asyncio
async def test_cancellation_propagation():
    """Cancellation propagates to child tasks"""
    cancelled = asyncio.Event()

    async def cancellable_task():
        try:
            await asyncio.sleep(100)
        except asyncio.CancelledError:
            cancelled.set()
            raise

    task = asyncio.create_task(cancellable_task())
    await asyncio.sleep(0.01)
    task.cancel()

    with pytest.raises(asyncio.CancelledError):
        await task

    assert cancelled.is_set()


@pytest.mark.asyncio
async def test_timeout_with_task_group():
    """Timeout cancels the entire TaskGroup"""
    with pytest.raises(TimeoutError):
        async with asyncio.timeout(0.1):
            async with asyncio.TaskGroup() as tg:
                tg.create_task(asyncio.sleep(10))
                tg.create_task(asyncio.sleep(10))
```

---

## 10. Anti-Patterns

### 10.1 Patterns to Avoid

```
Anti-Pattern 1: Fire and Forget
  x Bad:
    function handleRequest() {
      sendEmail(user.email);  // Does not wait for result, does not detect errors
      return { ok: true };
    }

  o Good:
    function handleRequest() {
      // Enqueue to a job queue (reliable async processing)
      await jobQueue.enqueue('send-email', { email: user.email });
      return { ok: true };
    }

Anti-Pattern 2: Ignoring Cancellation Indefinitely
  x Bad:
    async def process():
        while True:
            data = compute_heavy()  # No cancellation point
            results.append(data)

  o Good:
    async def process():
        while True:
            await asyncio.sleep(0)  # Cancellation check
            data = compute_heavy()
            results.append(data)

Anti-Pattern 3: Swallowing CancelledError
  x Bad:
    async def task():
        try:
            await operation()
        except Exception:  # Also catches CancelledError
            pass

  o Good:
    async def task():
        try:
            await operation()
        except asyncio.CancelledError:
            raise  # Must always re-raise
        except Exception:
            pass

Anti-Pattern 4: Unnecessary Global Scope
  x Bad (Kotlin):
    fun handleRequest() {
      GlobalScope.launch { ... }  // No lifecycle management
    }

  o Good (Kotlin):
    suspend fun handleRequest() = coroutineScope {
      launch { ... }  // Managed within scope
    }

Anti-Pattern 5: Excessive Concurrency
  x Bad:
    // Process all 100,000 items simultaneously
    await Promise.all(items.map(item => process(item)));

  o Good:
    // Limit concurrency
    await mapConcurrent(items, process, 20);
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
        """Validate input value"""
        if value is None:
            raise ValueError("Input value is None")
        return True

    def process(self, value):
        """Main logic for data processing"""
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

Extend the basic implementation with the following features.

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

    print(f"Inefficient version: {slow_time:.4f}s")
    print(f"Efficient version:   {fast_time:.6f}s")
    print(f"Speedup factor: {slow_time/fast_time:.0f}x")

benchmark()
```

**Key Points:**
- Be aware of algorithm complexity
- Choose appropriate data structures
- Measure the effect with benchmarks
---


## FAQ

### Q1: What is the most important point to keep in mind when learning this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory, but by actually writing code and verifying behavior.

### Q2: What are common mistakes beginners make?

Skipping the fundamentals and jumping to advanced topics. We recommend building a solid understanding of the basic concepts explained in this guide before moving to the next step.

### Q3: How is this used in practice?

Knowledge of this topic is frequently applied in day-to-day development work. It becomes especially important during code reviews and architecture design.

---

## Summary

| Language | Structured Concurrency | Scope | Cancellation | Error Propagation |
|----------|----------------------|-------|--------------|-------------------|
| Kotlin | coroutineScope | Waits for all children | CancellationException | Automatic propagation |
| Kotlin | supervisorScope | Waits for all children | Independent | Independent handling |
| Swift | async let | Waits for all children | Automatic cancellation | Propagated via throws |
| Swift | TaskGroup | Waits for all children | cancelAll() | Propagated via throws |
| Python | asyncio.TaskGroup | Waits for all children | CancelledError | ExceptionGroup |
| Rust | tokio JoinSet | Explicit waiting | Future drop | JoinError |
| JS/TS | Promise.all | Explicit waiting | AbortController | reject propagation |

---

## Recommended Next Guides

---

## References
1. Elizarov, R. "Structured Concurrency." vorpus.org, 2018.
2. Swift Evolution. "SE-0304: Structured Concurrency."
3. Python Documentation. "asyncio -- TaskGroup." docs.python.org.
4. Kotlin Documentation. "Coroutines guide." kotlinlang.org.
5. Smith, N. "Notes on structured concurrency, or: Go statement considered harmful." 2018.
6. Tokio Documentation. "Working with Tasks." tokio.rs.
7. Apple Developer. "Concurrency -- Swift Programming Language." developer.apple.com.
8. Syme, D. "The early history of F# async." fsharpforfunandprofit.com.
9. Sustrik, M. "Structured Concurrency." 250bpm.com, 2016.
10. Nygard, M. "Release It!" Pragmatic Bookshelf, 2018.



===== SOURCE: 02-programming/async-and-error-handling/docs/04-practical/00-api-error-design.md =====

# API Error Design

> API error responses directly affect the experience of client developers. This guide covers the proper use of HTTP status codes, RFC 7807 Problem Details, and best practices for error response design.

## What You Will Learn

- [ ] Understand the proper use of HTTP status codes
- [ ] Learn the standard format for error responses
- [ ] Learn practical API error design
- [ ] Master validation error design patterns
- [ ] Understand error internationalization (i18n)
- [ ] Understand error design differences in GraphQL/gRPC

## Prerequisites

Before reading this guide, having the following knowledge will help deepen your understanding:

- Basic programming knowledge
- Understanding of related fundamental concepts

---

## 1. HTTP Status Codes

### 1.1 Status Code Categories

```
2xx Success:
  200 OK               - General success
  201 Created           - Resource created successfully
  202 Accepted          - Asynchronous processing accepted
  204 No Content        - Success (no response body)
  206 Partial Content   - Partial content (Range specified)

3xx Redirect:
  301 Moved Permanently  - Permanent redirect
  302 Found              - Temporary redirect
  304 Not Modified       - Cache is valid

4xx Client Error:
  400 Bad Request       - Invalid request (syntax error, etc.)
  401 Unauthorized      - Authentication required (not authenticated)
  403 Forbidden         - Not authorized (insufficient permissions)
  404 Not Found         - Resource does not exist
  405 Method Not Allowed - Invalid HTTP method
  406 Not Acceptable    - Cannot satisfy Accept header
  408 Request Timeout   - Request timeout
  409 Conflict          - Conflict (duplicate registration, optimistic lock failure, etc.)
  410 Gone              - Resource permanently deleted
  413 Payload Too Large - Payload size exceeded
  415 Unsupported Media Type - Content-Type not supported
  422 Unprocessable Entity - Validation error
  429 Too Many Requests - Rate limit exceeded

5xx Server Error:
  500 Internal Server Error - Internal server error
  501 Not Implemented       - Unimplemented endpoint
  502 Bad Gateway           - Upstream server error
  503 Service Unavailable   - Service temporarily unavailable
  504 Gateway Timeout       - Upstream server timeout

Decision Criteria:
  Client's mistake -> 4xx
  Server's problem -> 5xx
  Potentially resolved by retry -> 429, 503, 504
```

### 1.2 Common Mistakes

```
Mistake 1: Returning 200 for all errors
  X Bad:
    HTTP 200 OK
    { "success": false, "error": "User not found" }

  O Good:
    HTTP 404 Not Found
    { "type": "...", "title": "Not Found", "status": 404, "detail": "..." }

  Reason: HTTP clients, CDNs, proxies, and monitoring tools
          operate based on status codes

Mistake 2: Confusing 401 and 403
  401 Unauthorized = Not authenticated (not logged in)
    -> Return WWW-Authenticate header
    -> Client resends authentication credentials

  403 Forbidden = Not authorized (no permission)
    -> Re-authentication will not change the result
    -> Request permissions from an administrator

Mistake 3: Misusing 400 and 422
  400 Bad Request = Request syntax is invalid
    -> JSON is broken, required parameters are missing
    -> Problems at the parsing level

  422 Unprocessable Entity = Syntax is correct but semantically invalid
    -> Email address format is incorrect
    -> Number is out of range
    -> Business rule violation

Mistake 4: Overusing 500
  -> Use 500 only for "unexpected errors"
  -> Returning validation errors as 500 is incorrect
  -> Choose an appropriate 4xx code

Mistake 5: Security risk of 404
  -> Can reveal the existence of a resource
  -> In some cases, return 403 (to hide resource existence)
  -> Example: /api/admin/users -> return 403 if no permission (not 404)
```

### 1.3 Status Code Selection Flowchart

```
Request received
  |-- Cannot parse JSON? -> 400 Bad Request
  |-- Auth token missing/invalid? -> 401 Unauthorized
  |-- Insufficient permissions? -> 403 Forbidden
  |-- Resource not found? -> 404 Not Found
  |-- Invalid HTTP method? -> 405 Method Not Allowed
  |-- Rate limit exceeded? -> 429 Too Many Requests
  |-- Validation error?
  |   |-- Missing required parameter -> 400 Bad Request
  |   +-- Semantically invalid value -> 422 Unprocessable Entity
  |-- Conflict (duplicate, optimistic lock failure)? -> 409 Conflict
  |-- Processing succeeded?
  |   |-- Resource created -> 201 Created
  |   |-- Async accepted -> 202 Accepted
  |   |-- No response body -> 204 No Content
  |   +-- Other -> 200 OK
  +-- Internal server error -> 500 Internal Server Error
```

---

## 2. Error Response Format

### 2.1 RFC 7807 Problem Details

```json
// RFC 7807 Problem Details (recommended)
{
  "type": "https://api.example.com/errors/validation",
  "title": "Validation Error",
  "status": 422,
  "detail": "There are issues with the input values",
  "instance": "/api/users",
  "errors": [
    {
      "field": "email",
      "message": "Please enter a valid email address"
    },
    {
      "field": "password",
      "message": "Must be at least 8 characters"
    }
  ],
  "traceId": "abc-123-def"
}
```

```
RFC 7807 Fields:

  type (required):
    -> URI that identifies the error type
    -> Useful to make it the URL of a documentation page
    -> Example: "https://api.example.com/errors/validation"
    -> Default: "about:blank"

  title (required):
    -> Human-readable error title
    -> Short description corresponding to the type
    -> Example: "Validation Error"

  status (recommended):
    -> HTTP status code
    -> Should match the response header
    -> Example: 422

  detail (recommended):
    -> Detailed description of the error
    -> Information specific to this request
    -> Example: "There are issues with the input values"

  instance (optional):
    -> Path of the request where the error occurred
    -> Useful for debugging
    -> Example: "/api/users"

  Extension fields (optional):
    -> RFC 7807 is extensible
    -> Additional fields like errors, traceId, timestamp can be added
```

### 2.2 TypeScript Type Definitions and Implementation

```typescript
// Error response type definition
interface ApiError {
  type: string;          // Error type (URL or code)
  title: string;         // Human-readable title
  status: number;        // HTTP status
  detail: string;        // Detailed message
  instance?: string;     // Request path
  traceId?: string;      // Tracing ID
  timestamp?: string;    // Occurrence time
  errors?: FieldError[]; // Field-level errors
}

interface FieldError {
  field: string;
  message: string;
  code?: string;
  rejectedValue?: unknown;
}

// Base class for application errors
class AppError extends Error {
  constructor(
    public readonly code: string,
    public readonly statusCode: number,
    message: string,
    public readonly details?: Record<string, unknown>,
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific error classes
class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super('NOT_FOUND', 404, `${resource} with id '${id}' was not found`, {
      resource,
      id,
    });
  }
}

class ValidationError extends AppError {
  constructor(
    public readonly fields: FieldError[],
    message: string = 'There are issues with the input values',
  ) {
    super('VALIDATION_ERROR', 422, message);
  }
}

class ConflictError extends AppError {
  constructor(resource: string, conflict: string) {
    super('CONFLICT', 409, `${resource}: ${conflict}`, {
      resource,
      conflict,
    });
  }
}

class UnauthorizedError extends AppError {
  constructor(message: string = 'Authentication required') {
    super('UNAUTHORIZED', 401, message);
  }
}

class ForbiddenError extends AppError {
  constructor(message: string = 'You do not have permission to perform this action') {
    super('FORBIDDEN', 403, message);
  }
}

class RateLimitError extends AppError {
  constructor(
    public readonly retryAfterSeconds: number,
    message: string = 'Request rate limit exceeded',
  ) {
    super('RATE_LIMIT_EXCEEDED', 429, message, { retryAfterSeconds });
  }
}

class InternalError extends AppError {
  constructor(
    message: string = 'A server error occurred',
    public readonly cause?: Error,
  ) {
    super('INTERNAL_ERROR', 500, message);
  }
}
```

### 2.3 Express Error Middleware

```typescript
// Express middleware
function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const traceId = req.headers['x-trace-id'] as string
    ?? req.headers['x-request-id'] as string
    ?? crypto.randomUUID();

  if (err instanceof AppError) {
    const response: ApiError = {
      type: `https://api.example.com/errors/${err.code.toLowerCase()}`,
      title: err.code.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      status: err.statusCode,
      detail: err.message,
      instance: req.originalUrl,
      traceId,
      timestamp: new Date().toISOString(),
    };

    // Add field information for validation errors
    if (err instanceof ValidationError) {
      response.errors = err.fields;
    }

    // Add Retry-After header for rate limit errors
    if (err instanceof RateLimitError) {
      res.setHeader('Retry-After', String(err.retryAfterSeconds));
    }

    // Log output
    if (err.statusCode >= 500) {
      logger.error({ err, traceId, path: req.originalUrl }, 'Server error');
    } else if (err.statusCode >= 400) {
      logger.warn({ err, traceId, path: req.originalUrl }, 'Client error');
    }

    res.status(err.statusCode).json(response);
  } else {
    // Unexpected error (hide internal details)
    logger.error(
      { err, traceId, path: req.originalUrl, stack: err.stack },
      'Unexpected error',
    );

    res.status(500).json({
      type: 'https://api.example.com/errors/internal',
      title: 'Internal Server Error',
      status: 500,
      detail: 'A server error occurred',
      instance: req.originalUrl,
      traceId,
      timestamp: new Date().toISOString(),
    });
  }
}

// Register middleware
app.use(errorHandler);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    type: 'https://api.example.com/errors/not_found',
    title: 'Not Found',
    status: 404,
    detail: `${req.method} ${req.originalUrl} does not exist`,
    instance: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
});
```

### 2.4 Error Design in NestJS

```typescript
// NestJS: Exception Filter
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const traceId = request.headers['x-trace-id'] as string
      ?? crypto.randomUUID();

    let status: number;
    let errorResponse: ApiError;

    if (exception instanceof AppError) {
      status = exception.statusCode;
      errorResponse = {
        type: `https://api.example.com/errors/${exception.code.toLowerCase()}`,
        title: exception.code,
        status,
        detail: exception.message,
        instance: request.url,
        traceId,
        timestamp: new Date().toISOString(),
      };

      if (exception instanceof ValidationError) {
        errorResponse.errors = exception.fields;
      }
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      errorResponse = {
        type: 'https://api.example.com/errors/http',
        title: HttpStatus[status] ?? 'Error',
        status,
        detail: typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message ?? 'An error occurred',
        instance: request.url,
        traceId,
        timestamp: new Date().toISOString(),
      };
    } else {
      status = 500;
      this.logger.error(
        'Unexpected error',
        exception instanceof Error ? exception.stack : String(exception),
      );
      errorResponse = {
        type: 'https://api.example.com/errors/internal',
        title: 'Internal Server Error',
        status: 500,
        detail: 'A server error occurred',
        instance: request.url,
        traceId,
        timestamp: new Date().toISOString(),
      };
    }

    response.status(status).json(errorResponse);
  }
}
```

---

## 3. Validation Error Design

### 3.1 Field-Level Errors

```typescript
// Detailed design for validation errors
interface DetailedFieldError {
  field: string;         // Field path (dot notation for nested fields)
  code: string;          // Error code (machine-readable)
  message: string;       // Human-readable message
  rejectedValue?: unknown; // Rejected value (be mindful of security)
  constraints?: Record<string, unknown>; // Constraint conditions
}

// Example: Validation error for user registration
const validationErrorExample: ApiError = {
  type: 'https://api.example.com/errors/validation',
  title: 'Validation Error',
  status: 422,
  detail: 'There are 3 validation errors',
  instance: '/api/users',
  traceId: 'trace-abc-123',
  timestamp: '2025-01-15T10:30:00Z',
  errors: [
    {
      field: 'email',
      code: 'INVALID_FORMAT',
      message: 'Please enter a valid email address',
      rejectedValue: 'invalid-email',
      constraints: { pattern: '^[^@]+@[^@]+\\.[^@]+$' },
    },
    {
      field: 'password',
      code: 'TOO_SHORT',
      message: 'Must be at least 8 characters',
      constraints: { minLength: 8 },
    },
    {
      field: 'profile.age',
      code: 'OUT_OF_RANGE',
      message: 'Please enter a value between 0 and 130',
      rejectedValue: -1,
      constraints: { min: 0, max: 130 },
    },
  ],
};
```

### 3.2 Integration with Validation Libraries

```typescript
// Integration with Zod
import { z } from 'zod';

const CreateUserSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Must be at least 8 characters'),
  name: z.string().min(1, 'Please enter a name').max(100),
  profile: z.object({
    age: z.number().int().min(0).max(130).optional(),
    bio: z.string().max(500).optional(),
  }).optional(),
});

// Convert Zod errors to API errors
function zodToFieldErrors(error: z.ZodError): FieldError[] {
  return error.errors.map((issue) => ({
    field: issue.path.join('.'),
    code: issue.code.toUpperCase(),
    message: issue.message,
  }));
}

// Validation middleware
function validate<T>(schema: z.ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new ValidationError(zodToFieldErrors(result.error));
    }
    req.body = result.data;
    next();
  };
}

// Usage example
app.post('/api/users', validate(CreateUserSchema), async (req, res) => {
  const user = await userService.create(req.body);
  res.status(201).json(user);
});
```

```python
# Python: Integration with Pydantic
from pydantic import BaseModel, EmailStr, Field, validator
from fastapi import FastAPI, HTTPException
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

app = FastAPI()


class CreateUserRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8, max_length=100)
    name: str = Field(min_length=1, max_length=100)
    age: int | None = Field(None, ge=0, le=130)

    @validator('password')
    def password_strength(cls, v):
        if not any(c.isupper() for c in v):
            raise ValueError('Must contain at least one uppercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Must contain at least one digit')
        return v


# Convert Pydantic validation errors to RFC 7807
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(
    request: Request,
    exc: RequestValidationError,
) -> JSONResponse:
    errors = []
    for error in exc.errors():
        field_path = '.'.join(str(loc) for loc in error['loc'] if loc != 'body')
        errors.append({
            'field': field_path,
            'code': error['type'].upper(),
            'message': error['msg'],
        })

    return JSONResponse(
        status_code=422,
        content={
            'type': 'https://api.example.com/errors/validation',
            'title': 'Validation Error',
            'status': 422,
            'detail': f'{len(errors)} validation error(s) found',
            'instance': str(request.url.path),
            'errors': errors,
            'timestamp': datetime.utcnow().isoformat() + 'Z',
        },
    )


@app.post('/api/users', status_code=201)
async def create_user(user: CreateUserRequest):
    return await user_service.create(user)
```

### 3.3 Business Rule Validation

```typescript
// Business rule validation
class OrderValidator {
  async validate(order: CreateOrderInput): Promise<FieldError[]> {
    const errors: FieldError[] = [];

    // Stock check
    for (const item of order.items) {
      const stock = await this.stockService.getAvailable(item.productId);
      if (stock < item.quantity) {
        errors.push({
          field: `items[${item.productId}].quantity`,
          code: 'INSUFFICIENT_STOCK',
          message: `Insufficient stock (${stock} remaining)`,
          rejectedValue: item.quantity,
          constraints: { available: stock },
        });
      }
    }

    // Order amount check
    const total = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity, 0,
    );
    if (total > 1_000_000) {
      errors.push({
        field: 'total',
        code: 'AMOUNT_EXCEEDS_LIMIT',
        message: 'A single order must be 1,000,000 yen or less',
        rejectedValue: total,
        constraints: { maxAmount: 1_000_000 },
      });
    }

    // Shipping address check
    if (order.shippingAddress) {
      const isDeliverable = await this.shippingService.isDeliverable(
        order.shippingAddress.zipCode,
      );
      if (!isDeliverable) {
        errors.push({
          field: 'shippingAddress.zipCode',
          code: 'UNDELIVERABLE_AREA',
          message: 'Delivery to this postal code is not supported',
          rejectedValue: order.shippingAddress.zipCode,
        });
      }
    }

    return errors;
  }
}

// Usage in controller
app.post('/api/orders', async (req, res) => {
  // Syntax validation (Zod)
  const input = CreateOrderSchema.parse(req.body);

  // Business rule validation
  const validator = new OrderValidator();
  const errors = await validator.validate(input);

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  const order = await orderService.create(input);
  res.status(201).json(order);
});
```

---

## 4. Error Design Best Practices

### 4.1 Design Principles

```
1. Consistency
   -> Same error format across all endpoints
   -> Unified use of status codes
   -> Content-Type: application/problem+json (RFC 7807)

2. Security
   -> Do not leak internal information in 500 errors
   -> Stack traces hidden in production
   -> Do not differentiate between "user does not exist" and "wrong password"
   -> Do not return SQL error details
   -> Do not return internal class names or file paths

3. Machine Readability
   -> Error codes as strings (enum-compatible)
   -> Combination of HTTP status and error codes
   -> type field links to documentation

4. Human Readability
   -> Specific messages in the detail field
   -> Field-level validation errors
   -> Messages displayable to end users

5. Retryability Indication
   -> 429: Retry-After header
   -> 503: Retry-After header
   -> Enable retry decisions based on error codes

6. Debugging Ease
   -> Track requests with traceId
   -> Track timeline with timestamp
   -> Identify endpoints with instance
```

### 4.2 Error Code System

```typescript
// Systematic error code design
const ERROR_CODES = {
  // Authentication & Authorization
  AUTH_TOKEN_EXPIRED: { status: 401, title: 'Token Expired' },
  AUTH_TOKEN_INVALID: { status: 401, title: 'Invalid Token' },
  AUTH_INSUFFICIENT_PERMISSIONS: { status: 403, title: 'Insufficient Permissions' },

  // Validation
  VALIDATION_FAILED: { status: 422, title: 'Validation Failed' },
  VALIDATION_REQUIRED_FIELD: { status: 422, title: 'Required Field Missing' },
  VALIDATION_INVALID_FORMAT: { status: 422, title: 'Invalid Format' },

  // Resources
  RESOURCE_NOT_FOUND: { status: 404, title: 'Resource Not Found' },
  RESOURCE_ALREADY_EXISTS: { status: 409, title: 'Resource Already Exists' },
  RESOURCE_CONFLICT: { status: 409, title: 'Resource Conflict' },
  RESOURCE_GONE: { status: 410, title: 'Resource Gone' },

  // Rate Limiting
  RATE_LIMIT_EXCEEDED: { status: 429, title: 'Rate Limit Exceeded' },

  // Business Logic
  BUSINESS_INSUFFICIENT_BALANCE: { status: 422, title: 'Insufficient Balance' },
  BUSINESS_ORDER_LIMIT_EXCEEDED: { status: 422, title: 'Order Limit Exceeded' },
  BUSINESS_ACCOUNT_SUSPENDED: { status: 403, title: 'Account Suspended' },

  // Server Errors
  INTERNAL_ERROR: { status: 500, title: 'Internal Server Error' },
  SERVICE_UNAVAILABLE: { status: 503, title: 'Service Unavailable' },
  UPSTREAM_ERROR: { status: 502, title: 'Upstream Service Error' },
} as const;

type ErrorCode = keyof typeof ERROR_CODES;

// Build ApiError from error code
function createApiError(
  code: ErrorCode,
  detail: string,
  extras?: Partial<ApiError>,
): ApiError {
  const { status, title } = ERROR_CODES[code];
  return {
    type: `https://api.example.com/errors/${code.toLowerCase()}`,
    title,
    status,
    detail,
    ...extras,
  };
}
```

### 4.3 Security Considerations

```typescript
// Security-conscious error responses

// Authentication error: do not reveal user existence
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.findByEmail(email);

  // X Bad: reveals user existence
  // if (!user) throw new NotFoundError('User', email);
  // if (!bcrypt.compareSync(password, user.password)) throw new Error('Wrong password');

  // O Good: return the same message
  if (!user || !await bcrypt.compare(password, user.passwordHash)) {
    throw new UnauthorizedError('Email address or password is incorrect');
  }

  // Timing attack mitigation
  // Perform hash comparison even when user is not found
  const dummyHash = '$2b$10$dummyhashfortimingattackprevention';
  if (!user) {
    await bcrypt.compare(password, dummyHash); // Equalize processing time
    throw new UnauthorizedError('Email address or password is incorrect');
  }
});

// 500 error: hide internal information
function sanitizeError(err: Error, isProduction: boolean): ApiError {
  if (isProduction) {
    return {
      type: 'https://api.example.com/errors/internal',
      title: 'Internal Server Error',
      status: 500,
      detail: 'A server error occurred. Please try again later.',
      // Do not include stack traces, SQL queries, file paths, etc.
    };
  }

  // Return detailed information in development environments
  return {
    type: 'https://api.example.com/errors/internal',
    title: 'Internal Server Error',
    status: 500,
    detail: err.message,
    // Include additional information only in development environments
    ...(isProduction ? {} : {
      stack: err.stack,
      cause: err.cause ? String(err.cause) : undefined,
    }),
  };
}

// Rate limit error information disclosure
// X Bad: exposes rate limit details
// { "detail": "100 requests per minute exceeded. Current: 105" }

// O Good: minimum necessary information
// { "detail": "Request rate limit exceeded", "retryAfter": 30 }
```

---

## 5. Error Internationalization (i18n)

### 5.1 Multi-Language Support Design

```typescript
// Error message internationalization

// Message catalog
const errorMessages: Record<string, Record<string, string>> = {
  en: {
    'VALIDATION_FAILED': 'Validation failed',
    'VALIDATION_REQUIRED': '{field} is required',
    'VALIDATION_TOO_SHORT': '{field} must be at least {min} characters',
    'VALIDATION_TOO_LONG': '{field} must be at most {max} characters',
    'VALIDATION_INVALID_EMAIL': 'Please enter a valid email address',
    'NOT_FOUND': '{resource} not found',
    'UNAUTHORIZED': 'Authentication required',
    'FORBIDDEN': 'You do not have permission to perform this action',
    'RATE_LIMIT': 'Too many requests. Please try again later.',
    'INTERNAL_ERROR': 'An internal error occurred. Please try again later.',
  },
  ja: {
    'VALIDATION_FAILED': 'There are issues with the input values',
    'VALIDATION_REQUIRED': '{field} is required',
    'VALIDATION_TOO_SHORT': '{field} must be at least {min} characters',
    'VALIDATION_TOO_LONG': '{field} must be at most {max} characters',
    'VALIDATION_INVALID_EMAIL': 'Please enter a valid email address',
    'NOT_FOUND': '{resource} not found',
    'UNAUTHORIZED': 'Authentication required',
    'FORBIDDEN': 'You do not have permission to perform this action',
    'RATE_LIMIT': 'Request rate limit exceeded. Please try again later.',
    'INTERNAL_ERROR': 'A server error occurred. Please try again later.',
  },
};

// Field name translations
const fieldNames: Record<string, Record<string, string>> = {
  en: {
    'email': 'Email',
    'password': 'Password',
    'name': 'Name',
    'age': 'Age',
  },
  ja: {
    'email': 'Email address',
    'password': 'Password',
    'name': 'Name',
    'age': 'Age',
  },
};

// Message resolution
function resolveMessage(
  code: string,
  locale: string,
  params: Record<string, string | number> = {},
): string {
  const messages = errorMessages[locale] ?? errorMessages['en'];
  let template = messages[code] ?? messages['INTERNAL_ERROR'];

  // Replace placeholders
  for (const [key, value] of Object.entries(params)) {
    template = template.replace(`{${key}}`, String(value));
  }

  return template;
}

// Determine locale from Accept-Language header
function getLocale(req: Request): string {
  const acceptLanguage = req.headers['accept-language'];
  if (!acceptLanguage) return 'en';

  // Simple parsing
  const preferred = acceptLanguage.split(',')[0].split(';')[0].trim().substring(0, 2);
  return errorMessages[preferred] ? preferred : 'en';
}

// i18n-enabled error middleware
function i18nErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const locale = getLocale(req);

  if (err instanceof AppError) {
    const detail = resolveMessage(err.code, locale, err.details as any);

    const response: ApiError = {
      type: `https://api.example.com/errors/${err.code.toLowerCase()}`,
      title: err.code,
      status: err.statusCode,
      detail,
      instance: req.originalUrl,
    };

    if (err instanceof ValidationError) {
      response.errors = err.fields.map(field => ({
        ...field,
        message: resolveMessage(
          field.code ?? 'VALIDATION_FAILED',
          locale,
          {
            field: fieldNames[locale]?.[field.field] ?? field.field,
            ...field.constraints,
          } as any,
        ),
      }));
    }

    res.status(err.statusCode).json(response);
  } else {
    res.status(500).json({
      type: 'https://api.example.com/errors/internal',
      title: 'Internal Server Error',
      status: 500,
      detail: resolveMessage('INTERNAL_ERROR', locale),
    });
  }
}
```

---

## 6. Client-Side Error Handling

### 6.1 TypeScript HTTP Client

```typescript
// API client error handling
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<T>(
    path: string,
    options?: RequestInit,
  ): Promise<T> {
    const url = `${this.baseUrl}${path}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Language': navigator.language,
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const errorBody: ApiError = await response.json().catch(() => ({
          type: 'https://api.example.com/errors/unknown',
          title: 'Unknown Error',
          status: response.status,
          detail: response.statusText,
        }));

        throw new ApiRequestError(response.status, errorBody);
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return undefined as T;
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiRequestError) {
        throw error;
      }

      // Network error
      throw new NetworkError(
        'There is a problem with the network connection',
        error as Error,
      );
    }
  }
}

// API request error
class ApiRequestError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly apiError: ApiError,
  ) {
    super(apiError.detail);
    this.name = 'ApiRequestError';
  }

  get isValidationError(): boolean {
    return this.statusCode === 422;
  }

  get isAuthError(): boolean {
    return this.statusCode === 401;
  }

  get isNotFound(): boolean {
    return this.statusCode === 404;
  }

  get isServerError(): boolean {
    return this.statusCode >= 500;
  }

  get isRetryable(): boolean {
    return [408, 429, 500, 502, 503, 504].includes(this.statusCode);
  }

  get fieldErrors(): FieldError[] {
    return this.apiError.errors ?? [];
  }
}

// Usage example in a React component
function UserRegistrationForm() {
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  async function handleSubmit(data: FormData) {
    try {
      setFieldErrors({});
      setGlobalError(null);

      await api.request('/api/users', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      navigate('/registration-complete');
    } catch (error) {
      if (error instanceof ApiRequestError) {
        if (error.isValidationError) {
          // Display field-level errors on the form
          const errors: Record<string, string> = {};
          for (const fieldError of error.fieldErrors) {
            errors[fieldError.field] = fieldError.message;
          }
          setFieldErrors(errors);
        } else if (error.isAuthError) {
          navigate('/login');
        } else {
          setGlobalError(error.apiError.detail);
        }
      } else if (error instanceof NetworkError) {
        setGlobalError('Please check your network connection');
      } else {
        setGlobalError('An unexpected error occurred');
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" />
      {fieldErrors.email && <span className="error">{fieldErrors.email}</span>}

      <input name="password" type="password" />
      {fieldErrors.password && <span className="error">{fieldErrors.password}</span>}

      {globalError && <div className="alert alert-error">{globalError}</div>}

      <button type="submit">Register</button>
    </form>
  );
}
```

---

## 7. GraphQL Error Design

### 7.1 Characteristics of GraphQL Errors

```
GraphQL errors differ from REST:

  REST:
    -> Indicates error type via HTTP status codes
    -> Includes error details in the body
    -> 1 request = 1 response

  GraphQL:
    -> Always returns HTTP 200 (the query itself succeeded)
    -> Returns errors in the errors field
    -> Partial success is possible (data and errors coexist)
    -> A single request can contain multiple queries
```

```typescript
// GraphQL error response example
const graphqlErrorResponse = {
  data: {
    user: { id: '1', name: 'Taro Tanaka' },
    orders: null, // Failed to retrieve due to error
  },
  errors: [
    {
      message: 'Failed to retrieve order information',
      locations: [{ line: 3, column: 5 }],
      path: ['orders'],
      extensions: {
        code: 'SERVICE_UNAVAILABLE',
        classification: 'ExecutionError',
        retryable: true,
      },
    },
  ],
};

// Error definitions in Apollo Server
import { GraphQLError } from 'graphql';

class NotFoundGraphQLError extends GraphQLError {
  constructor(resource: string, id: string) {
    super(`${resource} with id '${id}' not found`, {
      extensions: {
        code: 'NOT_FOUND',
        resource,
        id,
        http: { status: 404 },
      },
    });
  }
}

class ValidationGraphQLError extends GraphQLError {
  constructor(errors: FieldError[]) {
    super('Validation failed', {
      extensions: {
        code: 'VALIDATION_ERROR',
        errors,
        http: { status: 422 },
      },
    });
  }
}

// Error usage in resolvers
const resolvers = {
  Query: {
    user: async (_, { id }) => {
      const user = await userService.findById(id);
      if (!user) {
        throw new NotFoundGraphQLError('User', id);
      }
      return user;
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const errors = await validator.validate(input);
      if (errors.length > 0) {
        throw new ValidationGraphQLError(errors);
      }
      return userService.create(input);
    },
  },
};
```

---

## 8. gRPC Error Design

### 8.1 gRPC Status Codes

```
gRPC Status Codes:
  OK (0)              - Success
  CANCELLED (1)       - Cancelled by client
  UNKNOWN (2)         - Unknown error
  INVALID_ARGUMENT (3) - Invalid argument
  DEADLINE_EXCEEDED (4) - Deadline exceeded
  NOT_FOUND (5)       - Resource does not exist
  ALREADY_EXISTS (6)   - Resource already exists
  PERMISSION_DENIED (7) - No permission
  RESOURCE_EXHAUSTED (8) - Resource exhausted
  FAILED_PRECONDITION (9) - Precondition mismatch
  ABORTED (10)        - Operation aborted (transaction conflict, etc.)
  OUT_OF_RANGE (11)    - Out of range
  UNIMPLEMENTED (12)   - Not implemented
  INTERNAL (13)        - Internal error
  UNAVAILABLE (14)     - Service unavailable
  DATA_LOSS (15)       - Data loss
  UNAUTHENTICATED (16) - Not authenticated

Mapping to HTTP Status:
  INVALID_ARGUMENT   <-> 400 Bad Request
  UNAUTHENTICATED    <-> 401 Unauthorized
  PERMISSION_DENIED  <-> 403 Forbidden
  NOT_FOUND          <-> 404 Not Found
  ALREADY_EXISTS     <-> 409 Conflict
  RESOURCE_EXHAUSTED <-> 429 Too Many Requests
  INTERNAL           <-> 500 Internal Server Error
  UNAVAILABLE        <-> 503 Service Unavailable
  DEADLINE_EXCEEDED  <-> 504 Gateway Timeout
```

```protobuf
// gRPC error details (google.rpc.Status)
syntax = "proto3";

import "google/rpc/status.proto";
import "google/rpc/error_details.proto";

// Response containing error details
message ErrorResponse {
  google.rpc.Status status = 1;
}

// Validation error details
// Using google.rpc.BadRequest
message BadRequest {
  repeated FieldViolation field_violations = 1;

  message FieldViolation {
    string field = 1;
    string description = 2;
  }
}
```

```go
// Go: Sending gRPC errors
import (
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/genproto/googleapis/rpc/errdetails"
)

func (s *UserService) GetUser(ctx context.Context, req *pb.GetUserRequest) (*pb.User, error) {
	user, err := s.repo.FindByID(ctx, req.Id)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "failed to fetch user: %v", err)
	}
	if user == nil {
		return nil, status.Errorf(codes.NotFound, "user %s not found", req.Id)
	}
	return user, nil
}

func (s *UserService) CreateUser(ctx context.Context, req *pb.CreateUserRequest) (*pb.User, error) {
	// Validation error details
	violations := validateCreateUser(req)
	if len(violations) > 0 {
		st := status.New(codes.InvalidArgument, "validation failed")
		br := &errdetails.BadRequest{
			FieldViolations: violations,
		}
		st, _ = st.WithDetails(br)
		return nil, st.Err()
	}

	return s.repo.Create(ctx, req)
}
```

---

## 9. Automatic Error Documentation Generation

### 9.1 Error Definition in OpenAPI

```yaml
# OpenAPI 3.0: Error response definition
openapi: "3.0.0"
info:
  title: Example API
  version: "1.0.0"

paths:
  /api/users:
    post:
      summary: Create user
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserRequest'
      responses:
        '201':
          description: User created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
        '400':
          $ref: '#/components/responses/BadRequest'
        '409':
          $ref: '#/components/responses/Conflict'
        '422':
          $ref: '#/components/responses/ValidationError'
        '500':
          $ref: '#/components/responses/InternalError'

components:
  schemas:
    ProblemDetail:
      type: object
      required: [type, title, status, detail]
      properties:
        type:
          type: string
          format: uri
          description: URI identifying the error type
          example: "https://api.example.com/errors/validation"
        title:
          type: string
          description: Error title
          example: "Validation Error"
        status:
          type: integer
          description: HTTP status code
          example: 422
        detail:
          type: string
          description: Error details
          example: "There are issues with the input values"
        instance:
          type: string
          description: Request path
          example: "/api/users"
        traceId:
          type: string
          description: Tracing ID
          example: "abc-123-def"
        timestamp:
          type: string
          format: date-time
          description: Error occurrence time
        errors:
          type: array
          items:
            $ref: '#/components/schemas/FieldError'

    FieldError:
      type: object
      required: [field, message]
      properties:
        field:
          type: string
          description: Field with the error
          example: "email"
        code:
          type: string
          description: Error code
          example: "INVALID_FORMAT"
        message:
          type: string
          description: Error message
          example: "Please enter a valid email address"

  responses:
    BadRequest:
      description: Invalid request
      content:
        application/problem+json:
          schema:
            $ref: '#/components/schemas/ProblemDetail'
    ValidationError:
      description: Validation error
      content:
        application/problem+json:
          schema:
            $ref: '#/components/schemas/ProblemDetail'
    Conflict:
      description: Resource conflict
      content:
        application/problem+json:
          schema:
            $ref: '#/components/schemas/ProblemDetail'
    InternalError:
      description: Server error
      content:
        application/problem+json:
          schema:
            $ref: '#/components/schemas/ProblemDetail'
```


---

## Practical Exercises

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
        """Validate input value"""
        if value is None:
            raise ValueError("Input value is None")
        return True

    def process(self, value):
        """Main logic for data processing"""
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

    print(f"Inefficient: {slow_time:.4f}s")
    print(f"Efficient:   {fast_time:.6f}s")
    print(f"Speedup:     {slow_time/fast_time:.0f}x")

benchmark()
```

**Key Points:**
- Be conscious of algorithm complexity
- Choose appropriate data structures
- Measure the effect with benchmarks

---

## Troubleshooting

### Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| Initialization error | Configuration file issues | Verify the path and format of configuration files |
| Timeout | Network latency/resource shortage | Adjust timeout values, add retry logic |
| Out of memory | Increased data volume | Introduce batch processing, implement pagination |
| Permission error | Insufficient access permissions | Verify user permissions, review configuration |
| Data inconsistency | Concurrent processing conflicts | Introduce locking mechanisms, transaction management |

### Debugging Steps

1. **Check error messages**: Read the stack trace and identify the location of occurrence
2. **Establish reproduction steps**: Reproduce the error with minimal code
3. **Form hypotheses**: List possible causes
4. **Verify step by step**: Use log output or debuggers to verify hypotheses
5. **Fix and regression test**: After fixing, run tests on related areas as well

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
    """Decorator that logs function input and output"""
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

Steps for diagnosing performance issues:

1. **Identify bottlenecks**: Measure with profiling tools
2. **Check memory usage**: Check for memory leaks
3. **Check I/O waits**: Check the status of disk and network I/O
4. **Check concurrent connections**: Check the status of the connection pool

| Problem Type | Diagnostic Tool | Countermeasure |
|-------------|-----------------|----------------|
| CPU load | cProfile, py-spy | Algorithm improvement, parallelization |
| Memory leak | tracemalloc, objgraph | Proper reference release |
| I/O bottleneck | strace, iostat | Async I/O, caching |
| DB latency | EXPLAIN, slow query log | Indexing, query optimization |
---


## FAQ

### Q1: What is the most important point when learning this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory, but by actually writing code and verifying behavior.

### Q2: What are common mistakes beginners make?

Skipping the basics and jumping to advanced topics. We recommend thoroughly understanding the fundamental concepts explained in this guide before moving on to the next step.

### Q3: How is this applied in practice?

Knowledge of this topic is frequently applied in day-to-day development work. It becomes especially important during code reviews and architecture design.

---

## Summary

| Principle | Key Point |
|-----------|-----------|
| Status Codes | Choose the correct code (4xx vs 5xx) |
| Format | Comply with RFC 7807 Problem Details |
| Security | Do not leak internal information |
| Consistency | Unified across all endpoints |
| Validation | Detailed field-level errors |
| Retry | Retry-After header |
| Internationalization | Accept-Language support |
| Documentation | Define errors in OpenAPI |
| Error Codes | Systematic code design |
| Client DX | User-friendly error responses |

---

## Recommended Next Guides

---

## References
1. RFC 7807. "Problem Details for HTTP APIs." IETF, 2016.
2. RFC 9457. "Problem Details for HTTP APIs." IETF, 2023. (Successor to RFC 7807)
3. Fielding, R. "REST APIs must be hypertext-driven." 2008.
4. Google Cloud API Design Guide. "Errors." cloud.google.com.
5. Microsoft REST API Guidelines. "Error Handling." github.com/microsoft.
6. GraphQL Specification. "Errors." spec.graphql.org.
7. gRPC Error Handling. "Status codes and their use." grpc.io.
8. Zalando RESTful API Guidelines. "Error Handling." opensource.zalando.com.
9. Stripe API Reference. "Errors." stripe.com/docs/api/errors.
10. Twitter API Documentation. "Error Handling." developer.twitter.com.



===== SOURCE: 02-programming/async-and-error-handling/docs/04-practical/01-logging-and-monitoring.md =====

# Logging and Monitoring

> Errors will happen. What matters is "detecting them quickly, identifying the cause, and fixing them." This guide covers structured logging, error tracking (Sentry), and alert design best practices.

## What You Will Learn

- [ ] Understand structured logging design
- [ ] Learn how to use error tracking services
- [ ] Learn effective alert design
- [ ] Understand the basics of distributed tracing
- [ ] Master metrics collection and dashboard design
- [ ] Understand logging security and compliance

## Prerequisites

Before reading this guide, having the following knowledge will help deepen your understanding:

- Basic programming knowledge
- Understanding of related fundamental concepts
- Understanding of the content in [API Error Design](./00-api-error-design.md)

---

## 1. Structured Logging

### 1.1 Structured Logs vs Unstructured Logs

```
Unstructured Logs (traditional):
  [2025-01-15 10:30:45] ERROR: Failed to process order 12345 for user abc
  -> Human-readable but difficult for machine processing
  -> Can only search with grep
  -> Difficult to use for aggregation and dashboards

Structured Logs (recommended):
  {
    "timestamp": "2025-01-15T10:30:45.123Z",
    "level": "error",
    "message": "Failed to process order",
    "service": "order-service",
    "traceId": "abc-123",
    "orderId": "12345",
    "userId": "abc",
    "error": {
      "name": "PaymentError",
      "message": "Insufficient funds",
      "code": "PAYMENT_INSUFFICIENT_FUNDS"
    },
    "duration_ms": 1234
  }

Benefits:
  -> Searchable and filterable as JSON
  -> Aggregatable in dashboards
  -> Can trigger automatic alerts
  -> Analyzable with ELK Stack, CloudWatch Logs Insights, etc.
  -> Can be made type-safe since it is structured
```

### 1.2 TypeScript: Structured Logger with pino

```typescript
// pino: High-performance structured logger
import pino from 'pino';

// Logger configuration
const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  formatters: {
    level(label) { return { level: label }; },
    bindings(bindings) {
      return {
        pid: bindings.pid,
        hostname: bindings.hostname,
        service: process.env.SERVICE_NAME ?? 'unknown',
        version: process.env.APP_VERSION ?? 'unknown',
        environment: process.env.NODE_ENV ?? 'development',
      };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  // JSON in production, pretty in development
  transport: process.env.NODE_ENV === 'development'
    ? { target: 'pino-pretty', options: { colorize: true } }
    : undefined,
  // Remove sensitive information
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'req.body.password',
      'req.body.creditCard',
      'req.body.ssn',
      '*.password',
      '*.token',
      '*.secret',
    ],
    censor: '[REDACTED]',
  },
});

// Basic usage
logger.info({ orderId: '12345', userId: 'abc' }, 'Order created');

logger.error(
  {
    orderId: '12345',
    error: { name: err.name, message: err.message, code: err.code },
    duration_ms: Date.now() - startTime,
  },
  'Order processing failed',
);

// Child logger: automatically add context information
const orderLogger = logger.child({
  module: 'order-service',
  version: '2.1.0',
});

orderLogger.info({ orderId: '12345' }, 'Processing order');
// -> { module: "order-service", version: "2.1.0", orderId: "12345", ... }
```

### 1.3 Request-Scoped Logger

```typescript
// Express middleware: create a logger per request
import { randomUUID } from 'crypto';
import { AsyncLocalStorage } from 'async_hooks';

// Manage request context with AsyncLocalStorage
const als = new AsyncLocalStorage<{
  traceId: string;
  logger: pino.Logger;
}>();

// Middleware
function requestLoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const traceId = req.headers['x-trace-id'] as string
    ?? req.headers['x-request-id'] as string
    ?? randomUUID();

  const requestLogger = logger.child({
    traceId,
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.headers['user-agent'],
  });

  // Set trace ID in response header
  res.setHeader('X-Trace-Id', traceId);

  // Request start log
  const startTime = Date.now();
  requestLogger.info('Request started');

  // Log on response completion
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logData = {
      statusCode: res.statusCode,
      duration_ms: duration,
      contentLength: res.getHeader('content-length'),
    };

    if (res.statusCode >= 500) {
      requestLogger.error(logData, 'Request completed with server error');
    } else if (res.statusCode >= 400) {
      requestLogger.warn(logData, 'Request completed with client error');
    } else {
      requestLogger.info(logData, 'Request completed');
    }
  });

  // Store logger in AsyncLocalStorage
  als.run({ traceId, logger: requestLogger }, () => {
    next();
  });
}

// Retrieve request-scoped logger from anywhere
function getLogger(): pino.Logger {
  const store = als.getStore();
  return store?.logger ?? logger;
}

function getTraceId(): string {
  const store = als.getStore();
  return store?.traceId ?? 'no-trace';
}

// Usage in service layer
class OrderService {
  async createOrder(data: CreateOrderInput): Promise<Order> {
    const log = getLogger();

    log.info({ data }, 'Creating order');

    try {
      const order = await this.repo.create(data);
      log.info({ orderId: order.id }, 'Order created successfully');
      return order;
    } catch (error) {
      log.error({ error, data }, 'Failed to create order');
      throw error;
    }
  }
}
```

### 1.4 Python: Structured Logger with structlog

```python
import structlog
import logging
import json
from datetime import datetime


# Structured logging configuration
def configure_logging(environment: str = "production"):
    """Configure structured logging"""

    # Shared processors
    shared_processors = [
        structlog.contextvars.merge_contextvars,
        structlog.stdlib.add_log_level,
        structlog.stdlib.add_logger_name,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.UnicodeDecoder(),
    ]

    if environment == "development":
        # Development: colored human-readable format
        structlog.configure(
            processors=[
                *shared_processors,
                structlog.dev.ConsoleRenderer(colors=True),
            ],
            wrapper_class=structlog.make_filtering_bound_logger(logging.DEBUG),
        )
    else:
        # Production: JSON format
        structlog.configure(
            processors=[
                *shared_processors,
                structlog.processors.format_exc_info,
                structlog.processors.JSONRenderer(),
            ],
            wrapper_class=structlog.make_filtering_bound_logger(logging.INFO),
        )


# Usage example
logger = structlog.get_logger()

# Basic logging
logger.info("order_created", order_id="12345", user_id="abc", amount=1500)

# Error logging
try:
    process_order(order)
except Exception as e:
    logger.error(
        "order_processing_failed",
        order_id=order.id,
        error=str(e),
        error_type=type(e).__name__,
        exc_info=True,
    )

# Context variables (request scope)
import structlog.contextvars

# FastAPI middleware
from fastapi import FastAPI, Request
from starlette.middleware.base import BaseHTTPMiddleware

app = FastAPI()

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        trace_id = request.headers.get("x-trace-id", str(uuid.uuid4()))

        # Bind to context variables
        structlog.contextvars.clear_contextvars()
        structlog.contextvars.bind_contextvars(
            trace_id=trace_id,
            method=request.method,
            path=str(request.url.path),
            client_ip=request.client.host if request.client else "unknown",
        )

        log = structlog.get_logger()
        log.info("request_started")

        start = time.monotonic()
        try:
            response = await call_next(request)
            duration = (time.monotonic() - start) * 1000

            log.info(
                "request_completed",
                status_code=response.status_code,
                duration_ms=round(duration, 2),
            )
            response.headers["X-Trace-Id"] = trace_id
            return response
        except Exception as e:
            duration = (time.monotonic() - start) * 1000
            log.error(
                "request_failed",
                error=str(e),
                duration_ms=round(duration, 2),
                exc_info=True,
            )
            raise
```

### 1.5 Go: Structured Logger with slog

```go
package main

import (
	"context"
	"log/slog"
	"os"
	"time"
)

// Logger configuration
func setupLogger(env string) *slog.Logger {
	var handler slog.Handler

	if env == "production" {
		// Production: JSON
		handler = slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
			Level: slog.LevelInfo,
		})
	} else {
		// Development: Text
		handler = slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
			Level: slog.LevelDebug,
		})
	}

	return slog.New(handler)
}

// Request-scoped logger
type contextKey string

const loggerKey contextKey = "logger"

func WithLogger(ctx context.Context, logger *slog.Logger) context.Context {
	return context.WithValue(ctx, loggerKey, logger)
}

func LoggerFrom(ctx context.Context) *slog.Logger {
	if logger, ok := ctx.Value(loggerKey).(*slog.Logger); ok {
		return logger
	}
	return slog.Default()
}

// HTTP middleware
func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		traceID := r.Header.Get("X-Trace-Id")
		if traceID == "" {
			traceID = uuid.New().String()
		}

		requestLogger := slog.Default().With(
			slog.String("trace_id", traceID),
			slog.String("method", r.Method),
			slog.String("path", r.URL.Path),
			slog.String("remote_addr", r.RemoteAddr),
		)

		ctx := WithLogger(r.Context(), requestLogger)

		start := time.Now()
		requestLogger.Info("request started")

		// Response wrapper
		rw := &responseWriter{ResponseWriter: w, statusCode: 200}
		next.ServeHTTP(rw, r.WithContext(ctx))

		duration := time.Since(start)
		requestLogger.Info("request completed",
			slog.Int("status_code", rw.statusCode),
			slog.Duration("duration", duration),
		)
	})
}

// Usage in service layer
func (s *OrderService) CreateOrder(ctx context.Context, input CreateOrderInput) (*Order, error) {
	logger := LoggerFrom(ctx)

	logger.Info("creating order",
		slog.String("user_id", input.UserID),
		slog.Int("item_count", len(input.Items)),
	)

	order, err := s.repo.Create(ctx, input)
	if err != nil {
		logger.Error("failed to create order",
			slog.String("error", err.Error()),
			slog.String("user_id", input.UserID),
		)
		return nil, err
	}

	logger.Info("order created",
		slog.String("order_id", order.ID),
		slog.Float64("total", order.Total),
	)
	return order, nil
}
```

---

## 2. Log Levels

### 2.1 Log Level Definitions and Usage

```
+---------+----------------------------------------------------------+
| Level   | Usage                                                    |
+---------+----------------------------------------------------------+
| fatal   | Errors that cause application shutdown                   |
|         | Example: DB connection failure, missing required config  |
|         | -> Immediate alert, on-call response                    |
+---------+----------------------------------------------------------+
| error   | Operation failure. Errors that affect users              |
|         | Example: API call failure, data save failure             |
|         | -> Send to error tracking (Sentry)                      |
+---------+----------------------------------------------------------+
| warn    | Potential issues. Working now but needs attention        |
|         | Example: Deprecated API usage, retry occurred,           |
|         |          approaching threshold                           |
|         | -> Check periodically                                    |
+---------+----------------------------------------------------------+
| info    | Important business events                                |
|         | Example: Order completed, user registered,               |
|         |          payment successful                              |
|         | -> Foundation for business metrics                       |
+---------+----------------------------------------------------------+
| debug   | Debug information for development                        |
|         | Example: Variable values, processing branch points       |
|         | -> Usually disabled in production                        |
+---------+----------------------------------------------------------+
| trace   | Detailed trace information                               |
|         | Example: Function I/O, SQL queries,                      |
|         |          HTTP communication details                      |
|         | -> Temporarily enabled only during investigation         |
+---------+----------------------------------------------------------+

Recommended levels by environment:
  Production:  info and above
  Staging:     debug and above
  Development: trace and above

Dynamic log level changes:
  -> Temporarily change to debug when investigating issues in production
  -> Make changeable via environment variables or API
  -> Automatically revert after a set period
```

### 2.2 Log Level Decision Criteria

```typescript
// Log level usage guidelines

// FATAL: Application cannot start or continue
logger.fatal({ port: 3000, error: err }, 'Failed to bind to port');
logger.fatal({ dsn: dbConfig.dsn }, 'Database connection failed on startup');

// ERROR: Operation failed (user is affected)
logger.error({ orderId, error: err }, 'Failed to process payment');
logger.error({ userId, error: err }, 'Failed to send password reset email');

// WARN: Signs of problems, but operation completed
logger.warn({ queueSize: 950, maxSize: 1000 }, 'Queue approaching capacity');
logger.warn({ attempt: 2, maxRetries: 3 }, 'Retry attempt for external API');
logger.warn({ deprecatedField: 'oldField' }, 'Deprecated field used in request');

// INFO: Important business events
logger.info({ orderId, amount: 5000 }, 'Order completed');
logger.info({ userId, plan: 'premium' }, 'User upgraded subscription');
logger.info({ batch: 'daily-report', count: 1500 }, 'Batch processing completed');

// DEBUG: Detailed information for development and investigation
logger.debug({ userId, filters }, 'Searching users with filters');
logger.debug({ query, params, duration_ms: 45 }, 'SQL query executed');

// TRACE: Very detailed information
logger.trace({ headers, body }, 'Outgoing HTTP request');
logger.trace({ response, duration_ms: 123 }, 'Incoming HTTP response');
```

---

## 3. Error Tracking

### 3.1 Sentry Setup and Usage

```typescript
// Sentry: Error tracking configuration
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.APP_VERSION,
  serverName: process.env.HOSTNAME,

  // Tracing configuration
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Error filtering
  beforeSend(event, hint) {
    const error = hint?.originalException;

    // Do not send 4xx errors to Sentry
    if (error instanceof AppError && error.statusCode < 500) {
      return null;
    }

    // Exclude specific errors
    if (error instanceof AbortError) {
      return null;
    }

    // Remove sensitive information
    if (event.request?.headers) {
      delete event.request.headers['authorization'];
      delete event.request.headers['cookie'];
    }

    return event;
  },

  // Breadcrumb filtering
  beforeBreadcrumb(breadcrumb) {
    // Filter sensitive URLs
    if (breadcrumb.category === 'http' && breadcrumb.data?.url) {
      const url = new URL(breadcrumb.data.url);
      if (url.pathname.includes('/auth/')) {
        breadcrumb.data.url = url.origin + '/auth/[redacted]';
      }
    }
    return breadcrumb;
  },

  // Integration configuration
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    new Sentry.Integrations.Postgres(),
  ],
});

// Capturing errors
async function processOrder(orderId: string): Promise<void> {
  try {
    await doProcessOrder(orderId);
  } catch (error) {
    Sentry.withScope(scope => {
      // Tags: for filtering
      scope.setTag('feature', 'order-processing');
      scope.setTag('order_type', 'standard');

      // Context: detailed information
      scope.setContext('order', {
        orderId,
        userId: currentUser.id,
        amount: order.totalAmount,
        itemCount: order.items.length,
      });

      // User information
      scope.setUser({
        id: currentUser.id,
        email: currentUser.email,
        subscription: currentUser.plan,
      });

      // Fingerprint: error grouping
      scope.setFingerprint([
        'order-processing',
        error instanceof HttpError ? String(error.statusCode) : 'unknown',
      ]);

      // Error level
      scope.setLevel('error');

      Sentry.captureException(error);
    });

    throw error;
  }
}
```

### 3.2 Performance Monitoring

```typescript
// Sentry: Performance monitoring
import * as Sentry from '@sentry/node';

// Custom transaction
async function processPayment(paymentData: PaymentData): Promise<PaymentResult> {
  return Sentry.startSpan(
    {
      name: 'processPayment',
      op: 'payment.process',
      attributes: {
        'payment.amount': paymentData.amount,
        'payment.currency': paymentData.currency,
      },
    },
    async (span) => {
      // Child span: validation
      const validationResult = await Sentry.startSpan(
        { name: 'validatePayment', op: 'validation' },
        async () => validatePaymentData(paymentData),
      );

      // Child span: external API call
      const chargeResult = await Sentry.startSpan(
        {
          name: 'chargePaymentProvider',
          op: 'http.client',
          attributes: { 'http.url': 'https://api.stripe.com/v1/charges' },
        },
        async () => stripe.charges.create(paymentData),
      );

      // Child span: DB save
      await Sentry.startSpan(
        { name: 'savePaymentRecord', op: 'db.query' },
        async () => db.payments.create({ data: chargeResult }),
      );

      return chargeResult;
    },
  );
}
```

### 3.3 Python: Sentry Integration

```python
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration
from sentry_sdk.integrations.sqlalchemy import SqlalchemyIntegration
from sentry_sdk.integrations.aiohttp import AioHttpIntegration


def init_sentry(dsn: str, environment: str, release: str):
    """Initialize Sentry"""
    sentry_sdk.init(
        dsn=dsn,
        environment=environment,
        release=release,
        traces_sample_rate=0.1 if environment == "production" else 1.0,
        profiles_sample_rate=0.1,  # Profiling
        integrations=[
            FastApiIntegration(),
            SqlalchemyIntegration(),
            AioHttpIntegration(),
        ],
        before_send=before_send_filter,
    )


def before_send_filter(event, hint):
    """Pre-send filtering"""
    exception = hint.get("exc_info")
    if exception:
        exc_type, exc_value, _ = exception
        # Do not send 4xx errors
        if isinstance(exc_value, AppError) and exc_value.status_code < 500:
            return None
    return event


# Error capture
async def process_order(order_id: str):
    try:
        await do_process_order(order_id)
    except Exception as e:
        with sentry_sdk.push_scope() as scope:
            scope.set_tag("feature", "order-processing")
            scope.set_context("order", {
                "order_id": order_id,
                "user_id": current_user.id,
            })
            scope.set_user({
                "id": current_user.id,
                "email": current_user.email,
            })
            sentry_sdk.capture_exception(e)
        raise


# Custom span
async def fetch_user_data(user_id: str) -> dict:
    with sentry_sdk.start_span(op="http.client", description="fetch user data"):
        async with aiohttp.ClientSession() as session:
            async with session.get(f"{USER_SERVICE_URL}/users/{user_id}") as resp:
                return await resp.json()
```

---

## 4. Distributed Tracing

### 4.1 OpenTelemetry Basics

```
Distributed Tracing Concepts:
  -> Track requests across microservices
  -> Useful when a single user request passes through multiple services
  -> Identify bottlenecks and error locations

Terminology:
  Trace: The overall flow of a single request
  Span: An individual unit of work within a Trace
  Context: Metadata propagated between Spans
  Baggage: Custom data propagated between services

  Example:
  Trace: User's order request
    +-- Span: API Gateway (10ms)
    +-- Span: Order Service (200ms)
    |   +-- Span: DB Query - Create Order (50ms)
    |   +-- Span: Payment Service Call (120ms)
    |       +-- Span: Stripe API Call (80ms)
    |       +-- Span: DB Query - Save Payment (20ms)
    +-- Span: Notification Service (30ms)
        +-- Span: SendGrid API Call (25ms)
```

```typescript
// OpenTelemetry configuration
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'order-service',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0',
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.NODE_ENV,
  }),
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT + '/v1/traces',
  }),
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({
      url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT + '/v1/metrics',
    }),
    exportIntervalMillis: 60000,
  }),
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-http': {
        ignoreIncomingPaths: ['/health', '/metrics'],
      },
      '@opentelemetry/instrumentation-express': {},
      '@opentelemetry/instrumentation-pg': {},
    }),
  ],
});

sdk.start();

// Custom spans
import { trace, SpanStatusCode } from '@opentelemetry/api';

const tracer = trace.getTracer('order-service');

async function processOrder(order: Order): Promise<ProcessResult> {
  return tracer.startActiveSpan('processOrder', async (span) => {
    span.setAttribute('order.id', order.id);
    span.setAttribute('order.amount', order.totalAmount);
    span.setAttribute('order.item_count', order.items.length);

    try {
      // Validation
      await tracer.startActiveSpan('validateOrder', async (validationSpan) => {
        await validateOrder(order);
        validationSpan.setStatus({ code: SpanStatusCode.OK });
        validationSpan.end();
      });

      // Payment processing
      const paymentResult = await tracer.startActiveSpan(
        'processPayment',
        async (paymentSpan) => {
          paymentSpan.setAttribute('payment.provider', 'stripe');
          const result = await paymentService.charge(order);
          paymentSpan.setAttribute('payment.id', result.paymentId);
          paymentSpan.setStatus({ code: SpanStatusCode.OK });
          paymentSpan.end();
          return result;
        },
      );

      span.setStatus({ code: SpanStatusCode.OK });
      return { orderId: order.id, paymentId: paymentResult.paymentId };
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: (error as Error).message,
      });
      span.recordException(error as Error);
      throw error;
    } finally {
      span.end();
    }
  });
}
```

### 4.2 Trace Context Propagation

```typescript
// Trace context propagation between services

// Propagation via HTTP headers (W3C Trace Context)
// traceparent: 00-trace_id-span_id-trace_flags
// tracestate: vendor-specific-data

// When calling Service B from Service A
import { context, propagation } from '@opentelemetry/api';

async function callOrderService(orderData: OrderInput): Promise<Order> {
  const headers: Record<string, string> = {};

  // Inject current context into HTTP headers
  propagation.inject(context.active(), headers);

  const response = await fetch('http://order-service/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers, // Contains traceparent, tracestate
    },
    body: JSON.stringify(orderData),
  });

  return response.json();
}

// Extract context in Service B
function extractContextMiddleware(req: Request, res: Response, next: NextFunction) {
  // Extract context from HTTP headers
  const extractedContext = propagation.extract(context.active(), req.headers);

  // Process the request with the extracted context
  context.with(extractedContext, () => {
    next();
  });
}
```

---

## 5. Metrics

### 5.1 Prometheus Metrics

```typescript
// Prometheus metrics collection
import { Counter, Histogram, Gauge, Summary, Registry } from 'prom-client';

const register = new Registry();

// Collect default metrics (CPU, memory, etc.)
import { collectDefaultMetrics } from 'prom-client';
collectDefaultMetrics({ register });

// Custom metrics

// Counter: monotonically increasing value
const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'path', 'status_code'],
  registers: [register],
});

// Histogram: distribution of values
const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'path', 'status_code'],
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
  registers: [register],
});

// Gauge: value that goes up and down
const activeConnections = new Gauge({
  name: 'active_connections',
  help: 'Number of active connections',
  registers: [register],
});

const queueSize = new Gauge({
  name: 'job_queue_size',
  help: 'Number of jobs in the queue',
  labelNames: ['queue_name'],
  registers: [register],
});

// Summary: percentiles
const dbQueryDuration = new Summary({
  name: 'db_query_duration_seconds',
  help: 'Database query duration in seconds',
  labelNames: ['query_type', 'table'],
  percentiles: [0.5, 0.9, 0.95, 0.99],
  registers: [register],
});

// Collect metrics with middleware
function metricsMiddleware(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  activeConnections.inc();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const labels = {
      method: req.method,
      path: req.route?.path ?? req.path,
      status_code: String(res.statusCode),
    };

    httpRequestsTotal.inc(labels);
    httpRequestDuration.observe(labels, duration);
    activeConnections.dec();
  });

  next();
}

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Business metrics
const ordersCreated = new Counter({
  name: 'orders_created_total',
  help: 'Total number of orders created',
  labelNames: ['status', 'payment_method'],
  registers: [register],
});

const orderAmount = new Histogram({
  name: 'order_amount_jpy',
  help: 'Order amount in JPY',
  buckets: [100, 500, 1000, 5000, 10000, 50000, 100000],
  registers: [register],
});

// Usage example
async function createOrder(data: CreateOrderInput): Promise<Order> {
  const order = await orderRepo.create(data);

  ordersCreated.inc({
    status: 'success',
    payment_method: data.paymentMethod,
  });
  orderAmount.observe(order.totalAmount);

  return order;
}
```

### 5.2 RED Method

```
RED Method (Service Monitoring):
  R - Rate:     Requests per second
  E - Errors:   Errors per second (or error rate)
  D - Duration: Latency (P50, P95, P99)

  -> Understand service health with 3 metrics

USE Method (Resource Monitoring):
  U - Utilization: Usage rate (CPU, memory, disk)
  S - Saturation:  Saturation (queue length, waiting threads)
  E - Errors:      Error count

  -> Understand infrastructure resource health

Four Golden Signals (Google SRE):
  1. Latency:    Response time
  2. Traffic:    Request count
  3. Errors:     Error rate
  4. Saturation: Resource saturation
```

---

## 6. Alert Design

### 6.1 Alert Principles

```
Alert Principles:
  1. Actionable (you can do something when you receive it)
     -> Not "An error occurred" but "Payment processing error rate exceeded 5%"
     -> Include a link to a runbook (response procedure document) in the alert

  2. Low Noise (few false positives)
     -> Prevent Alert Fatigue
     -> Carefully consider thresholds
     -> Do not overreact to temporary spikes

  3. Appropriate Recipient (on-call personnel)
     -> Escalation based on urgency
     -> Critical: PagerDuty -> SMS/Phone
     -> Warning: Slack notification -> Handle next business day

  4. Context-Rich
     -> Link to dashboard
     -> Link to related logs
     -> Link to runbook
     -> Overview of impact scope
```

### 6.2 Alert Rule Design

```
Error Rate Based:
  -> 5xx error rate > 1% (5 minutes) -> Warning
  -> 5xx error rate > 5% (5 minutes) -> Critical
  -> Specific endpoint error rate > 10% -> Critical

Latency Based:
  -> P95 > 2 seconds (5 minutes) -> Warning
  -> P99 > 5 seconds (5 minutes) -> Critical
  -> P50 > 1 second (sustained) -> Warning (sign of performance degradation)

Business Metrics:
  -> Payment success rate < 95% (10 minutes) -> Critical
  -> Order count 50% less than previous hour -> Warning
  -> New registrations 70% less than previous day -> Warning

Infrastructure Metrics:
  -> CPU usage > 80% (15 minutes) -> Warning
  -> CPU usage > 95% (5 minutes) -> Critical
  -> Memory usage > 85% -> Warning
  -> Disk usage > 90% -> Critical
  -> DB connection pool usage > 80% -> Warning

Circuit Breaker:
  -> Any circuit breaker is Open -> Warning
  -> Major service circuit breaker is Open -> Critical
```

### 6.3 Prometheus Alertmanager Configuration

```yaml
# Prometheus alert rules
groups:
  - name: http_alerts
    rules:
      - alert: HighErrorRate
        expr: |
          sum(rate(http_requests_total{status_code=~"5.."}[5m]))
          / sum(rate(http_requests_total[5m]))
          > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High 5xx error rate ({{ $value | humanizePercentage }})"
          description: "5xx error rate has exceeded 5%"
          runbook_url: "https://wiki.example.com/runbooks/high-error-rate"
          dashboard: "https://grafana.example.com/d/http/overview"

      - alert: HighLatency
        expr: |
          histogram_quantile(0.95,
            sum(rate(http_request_duration_seconds_bucket[5m])) by (le)
          ) > 2
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High P95 latency ({{ $value | humanizeDuration }})"
          description: "P95 latency has exceeded 2 seconds"

      - alert: HighQueueSize
        expr: job_queue_size > 1000
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Job queue size is high ({{ $value }})"
          description: "Job queue size has exceeded 1000"

  - name: business_alerts
    rules:
      - alert: LowPaymentSuccessRate
        expr: |
          sum(rate(payments_total{status="success"}[10m]))
          / sum(rate(payments_total[10m]))
          < 0.95
        for: 10m
        labels:
          severity: critical
          team: payments
        annotations:
          summary: "Payment success rate below 95% ({{ $value | humanizePercentage }})"
          description: "Payment success rate has dropped below 95%"

# Alertmanager configuration
route:
  receiver: default
  group_by: [alertname, severity]
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  routes:
    - match:
        severity: critical
      receiver: pagerduty-critical
      continue: true
    - match:
        severity: warning
      receiver: slack-warnings

receivers:
  - name: default
    slack_configs:
      - channel: '#alerts'
        send_resolved: true

  - name: pagerduty-critical
    pagerduty_configs:
      - service_key: '<pagerduty-key>'
        severity: critical

  - name: slack-warnings
    slack_configs:
      - channel: '#alerts-warnings'
        send_resolved: true
        title: '{{ .CommonAnnotations.summary }}'
        text: '{{ .CommonAnnotations.description }}'
```

---

## 7. Logging Security and Compliance

### 7.1 Handling Sensitive Information

```typescript
// Sensitive information masking
class LogSanitizer {
  private static readonly SENSITIVE_FIELDS = new Set([
    'password',
    'token',
    'secret',
    'authorization',
    'cookie',
    'creditCard',
    'ssn',
    'apiKey',
    'accessToken',
    'refreshToken',
  ]);

  private static readonly PII_PATTERNS = [
    // Email addresses
    { pattern: /[\w.-]+@[\w.-]+\.\w+/g, replacement: '[email]' },
    // Credit card numbers
    { pattern: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g, replacement: '[card]' },
    // Phone numbers
    { pattern: /\b0\d{1,4}[-\s]?\d{1,4}[-\s]?\d{3,4}\b/g, replacement: '[phone]' },
  ];

  static sanitize(obj: Record<string, any>): Record<string, any> {
    const sanitized: Record<string, any> = {};

    for (const [key, value] of Object.entries(obj)) {
      if (this.SENSITIVE_FIELDS.has(key.toLowerCase())) {
        sanitized[key] = '[REDACTED]';
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitize(value);
      } else if (typeof value === 'string') {
        let sanitizedValue = value;
        for (const { pattern, replacement } of this.PII_PATTERNS) {
          sanitizedValue = sanitizedValue.replace(pattern, replacement);
        }
        sanitized[key] = sanitizedValue;
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }
}

// Integrate with pino serializers
const logger = pino({
  serializers: {
    req(req) {
      return LogSanitizer.sanitize({
        method: req.method,
        url: req.url,
        headers: req.headers,
        body: req.body,
      });
    },
    err(err) {
      return {
        type: err.constructor.name,
        message: err.message,
        code: err.code,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
      };
    },
  },
});
```

### 7.2 Log Retention and Rotation

```
Log Retention Policy:

  Hot Storage (fast search, high cost):
    -> Last 7-30 days
    -> Elasticsearch, CloudWatch Logs
    -> Real-time search and analysis

  Warm Storage (medium-speed search, medium cost):
    -> 30-90 days
    -> S3 Standard, GCS Standard
    -> Query when needed

  Cold Storage (slow, low cost):
    -> 90 days to several years
    -> S3 Glacier, GCS Coldline
    -> Retention based on compliance requirements

  Compliance Requirements:
    -> GDPR: Retention period limits for personal data
    -> PCI DSS: Audit logs retained for 1+ years
    -> SOX: Financial-related logs retained for 7 years
    -> HIPAA: Medical data-related logs retained for 6 years
```

---

## 8. Dashboard Design

### 8.1 Grafana Dashboard Structure

```
Recommended Dashboard Structure:

  1. Service Overview Dashboard
     -> Requests per second (Rate)
     -> Error rate (Errors)
     -> P50/P95/P99 latency (Duration)
     -> Active connections
     -> Recent alert list

  2. Endpoint-Specific Dashboard
     -> Request count per endpoint
     -> Error rate per endpoint
     -> Latency per endpoint
     -> Top 10 slow queries

  3. Infrastructure Dashboard
     -> CPU usage
     -> Memory usage
     -> Disk I/O
     -> Network I/O
     -> Container count (Kubernetes)

  4. Business Dashboard
     -> Orders per hour
     -> Payment success rate
     -> New registrations
     -> Active users

  5. Dependency Services Dashboard
     -> Response time of each external API
     -> Circuit breaker status
     -> DB connection pool usage
     -> Cache hit rate
```

### 8.2 SLI/SLO Design

```
SLI (Service Level Indicator):
  -> Metrics that measure service quality
  -> Example: Availability, latency, throughput

SLO (Service Level Objective):
  -> Target values for SLIs
  -> Example: 99.9% availability, P95 latency < 200ms

Error Budget:
  -> The "budget" of errors allowed beyond the SLO
  -> 99.9% SLO = approximately 43 minutes of downtime budget per month
  -> Restrict releases when error budget is consumed

Implementation Example:
  SLI: Successful response rate = 200-499 responses / total responses
  SLO: 99.9% or more over 30 days
  Error Budget: 0.1% = approximately 43 minutes/month

  Prometheus Queries:
    # 30-day SLI
    sum(rate(http_requests_total{status_code!~"5.."}[30d]))
    / sum(rate(http_requests_total[30d]))

    # Remaining error budget
    1 - (
      sum(increase(http_requests_total{status_code=~"5.."}[30d]))
      / (sum(increase(http_requests_total[30d])) * 0.001)
    )
```


---

## Practical Exercises

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
        """Validate input value"""
        if value is None:
            raise ValueError("Input value is None")
        return True

    def process(self, value):
        """Main logic for data processing"""
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

    print(f"Inefficient: {slow_time:.4f}s")
    print(f"Efficient:   {fast_time:.6f}s")
    print(f"Speedup:     {slow_time/fast_time:.0f}x")

benchmark()
```

**Key Points:**
- Be conscious of algorithm complexity
- Choose appropriate data structures
- Measure the effect with benchmarks

---

## Troubleshooting

### Common Errors and Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| Initialization error | Configuration file issues | Verify the path and format of configuration files |
| Timeout | Network latency/resource shortage | Adjust timeout values, add retry logic |
| Out of memory | Increased data volume | Introduce batch processing, implement pagination |
| Permission error | Insufficient access permissions | Verify user permissions, review configuration |
| Data inconsistency | Concurrent processing conflicts | Introduce locking mechanisms, transaction management |

### Debugging Steps

1. **Check error messages**: Read the stack trace and identify the location of occurrence
2. **Establish reproduction steps**: Reproduce the error with minimal code
3. **Form hypotheses**: List possible causes
4. **Verify step by step**: Use log output or debuggers to verify hypotheses
5. **Fix and regression test**: After fixing, run tests on related areas as well

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
    """Decorator that logs function input and output"""
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

Steps for diagnosing performance issues:

1. **Identify bottlenecks**: Measure with profiling tools
2. **Check memory usage**: Check for memory leaks
3. **Check I/O waits**: Check the status of disk and network I/O
4. **Check concurrent connections**: Check the status of the connection pool

| Problem Type | Diagnostic Tool | Countermeasure |
|-------------|-----------------|----------------|
| CPU load | cProfile, py-spy | Algorithm improvement, parallelization |
| Memory leak | tracemalloc, objgraph | Proper reference release |
| I/O bottleneck | strace, iostat | Async I/O, caching |
| DB latency | EXPLAIN, slow query log | Indexing, query optimization |
---


## FAQ

### Q1: What is the most important point when learning this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory, but by actually writing code and verifying behavior.

### Q2: What are common mistakes beginners make?

Skipping the basics and jumping to advanced topics. We recommend thoroughly understanding the fundamental concepts explained in this guide before moving on to the next step.

### Q3: How is this applied in practice?

Knowledge of this topic is frequently applied in day-to-day development work. It becomes especially important during code reviews and architecture design.

---

## Summary

| Method | Purpose | Example Tools |
|--------|---------|---------------|
| Structured Logging | Searchable and analyzable logs | pino, structlog, slog |
| Error Tracking | Error aggregation and notification | Sentry, Datadog, Bugsnag |
| Distributed Tracing | Cross-service tracking | OpenTelemetry, Jaeger, Zipkin |
| Metrics | Numerical data monitoring | Prometheus, Grafana, Datadog |
| Alerting | Immediate anomaly notification | PagerDuty, Alertmanager, Opsgenie |
| Dashboards | Visualization | Grafana, Kibana, Datadog |
| Log Management | Log collection and search | ELK Stack, Loki, CloudWatch |

---

## Recommended Next Guides

---

## References
1. Sentry Documentation. docs.sentry.io.
2. Google SRE Book. "Monitoring Distributed Systems." O'Reilly, 2016.
3. OpenTelemetry Documentation. opentelemetry.io.
4. Prometheus Documentation. prometheus.io.
5. Grafana Documentation. grafana.com/docs.
6. Beyer, B. et al. "Site Reliability Engineering." O'Reilly, 2016.
7. pino Documentation. github.com/pinojs/pino.
8. structlog Documentation. structlog.org.
9. Go slog Documentation. pkg.go.dev/log/slog.
10. W3C Trace Context. w3.org/TR/trace-context.



===== SOURCE: 02-programming/async-and-error-handling/docs/04-practical/02-testing-async.md =====

# Asynchronous Testing

> Testing asynchronous code presents unique challenges. This guide covers practical techniques including timer mocking, testing async functions, and avoiding flaky tests.

## What You Will Learn in This Chapter

- [ ] Understand fundamental patterns for asynchronous testing
- [ ] Master timer and I/O mocking techniques
- [ ] Learn the causes and countermeasures for flaky tests
- [ ] Understand the differences between testing frameworks
- [ ] Acquire async waiting strategies for E2E testing
- [ ] Learn how to verify asynchronous code with property-based testing


## Prerequisites

Before reading this guide, the following knowledge will deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts
- Familiarity with the content in [Logging and Monitoring](./01-logging-and-monitoring.md)

---

## 1. Asynchronous Testing Basics

### 1.1 async/await Pattern (Jest / Vitest)

```typescript
// Jest / Vitest: Fundamental patterns for asynchronous testing

// async/await -- the most recommended pattern
test('can retrieve a user', async () => {
  const user = await getUser('user-123');
  expect(user.name).toBe('Taro Tanaka');
});

// Pattern that returns a Promise (when async/await is not available)
test('can create an order', () => {
  return createOrder(orderData).then(order => {
    expect(order.status).toBe('pending');
  });
});

// Testing errors -- rejects matcher
test('throws error for non-existent user', async () => {
  await expect(getUser('invalid')).rejects.toThrow('User not found');
});

// Validating error types
test('validate authentication error details', async () => {
  await expect(authenticate('wrong-token')).rejects.toMatchObject({
    code: 'AUTH_INVALID_TOKEN',
    statusCode: 401,
  });
});

// Timeout setting (per test)
test('slow test', async () => {
  const result = await slowOperation();
  expect(result).toBeDefined();
}, 10000); // 10-second timeout
```

### 1.2 Callback Pattern (Legacy Code Support)

```typescript
// done callback -- legacy asynchronous testing
// Note: do not mix async functions with done

test('callback-based asynchronous test', (done) => {
  fetchDataWithCallback('user-123', (error, data) => {
    try {
      expect(error).toBeNull();
      expect(data.name).toBe('Taro Tanaka');
      done();
    } catch (e) {
      done(e); // Pass the error to done
    }
  });
});

// It is better to wrap callbacks in a Promise
function fetchDataPromise(id: string): Promise<User> {
  return new Promise((resolve, reject) => {
    fetchDataWithCallback(id, (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });
}

test('wrapped asynchronous test', async () => {
  const data = await fetchDataPromise('user-123');
  expect(data.name).toBe('Taro Tanaka');
});
```

### 1.3 Concurrent and Sequential Tests

```typescript
// Jest runs tests sequentially within a file and concurrently across files by default
// Use describe.concurrent to run tests concurrently

describe.concurrent('concurrent execution tests', () => {
  test('test 1', async () => {
    const result = await fetchUser('user-1');
    expect(result).toBeDefined();
  });

  test('test 2', async () => {
    const result = await fetchUser('user-2');
    expect(result).toBeDefined();
  });

  test('test 3', async () => {
    const result = await fetchUser('user-3');
    expect(result).toBeDefined();
  });
});

// In Vitest, you can use test.concurrent
// it.concurrent('concurrent test', async () => { ... });
```

### 1.4 Vitest-Specific Features

```typescript
// Vitest: uses the vi object
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';

test('Vitest asynchronous test', async () => {
  const mockFn = vi.fn().mockResolvedValue({ id: 1, name: 'Test' });
  const result = await mockFn();
  expect(result.name).toBe('Test');
});

// Vitest: snapshot testing (async)
test('API response snapshot', async () => {
  const response = await fetchUserProfile('user-123');
  expect(response).toMatchSnapshot();
});

// Vitest: inline snapshot
test('error message inline snapshot', async () => {
  await expect(fetchUser('invalid')).rejects.toThrowErrorMatchingInlineSnapshot(
    `"User not found: invalid"`
  );
});

// Vitest: global test timeout setting
// vitest.config.ts
// export default defineConfig({
//   test: { testTimeout: 10000 }
// });
```

---

## 2. Timer Mocking

### 2.1 Jest Fake Timers

```typescript
// Jest: fake timer basics
describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('executes after 300ms', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 300);

    debounced();
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(200);
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('exponential backoff for retry', async () => {
    const mockFn = jest.fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('success');

    const promise = retryWithBackoff(mockFn, { maxRetries: 3 });

    // Wait for first retry (1000ms)
    jest.advanceTimersByTime(1000);
    await Promise.resolve(); // Process microtasks

    // Wait for second retry (2000ms)
    jest.advanceTimersByTime(2000);
    await Promise.resolve();

    const result = await promise;
    expect(result).toBe('success');
    expect(mockFn).toHaveBeenCalledTimes(3);
  });
});
```

### 2.2 Advanced Timer Mocking

```typescript
// Testing setInterval
describe('PollingService', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('polls every 5 seconds', () => {
    const fetchStatus = jest.fn().mockResolvedValue({ status: 'running' });
    const poller = new PollingService(fetchStatus, 5000);
    poller.start();

    // Initial call
    expect(fetchStatus).toHaveBeenCalledTimes(1);

    // After 5 seconds
    jest.advanceTimersByTime(5000);
    expect(fetchStatus).toHaveBeenCalledTimes(2);

    // After another 5 seconds
    jest.advanceTimersByTime(5000);
    expect(fetchStatus).toHaveBeenCalledTimes(3);

    poller.stop();
  });

  test('not called after polling stops', () => {
    const fetchStatus = jest.fn().mockResolvedValue({ status: 'done' });
    const poller = new PollingService(fetchStatus, 5000);
    poller.start();
    poller.stop();

    jest.advanceTimersByTime(15000);
    expect(fetchStatus).toHaveBeenCalledTimes(1); // Initial call only
  });
});

// Combining setTimeout + Promise
describe('delayedRetry', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('correct interleaving of timers and Promises', async () => {
    const operation = jest.fn()
      .mockRejectedValueOnce(new Error('transient'))
      .mockResolvedValueOnce('ok');

    // retryWithDelay uses setTimeout internally
    const resultPromise = retryWithDelay(operation, {
      retries: 3,
      delay: 1000,
    });

    // Process microtasks (process the first call's rejection)
    await jest.advanceTimersByTimeAsync(1000);

    const result = await resultPromise;
    expect(result).toBe('ok');
    expect(operation).toHaveBeenCalledTimes(2);
  });
});

// Mocking requestAnimationFrame
describe('animation', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('requestAnimationFrame executes correctly', () => {
    const callback = jest.fn();
    requestAnimationFrame(callback);

    jest.advanceTimersByTime(16); // Approximately one frame at 60fps
    expect(callback).toHaveBeenCalled();
  });
});
```

### 2.3 Utilizing advanceTimersByTimeAsync

```typescript
// Jest 29.5+ / Vitest: advanceTimersByTimeAsync
// Correctly interleaves Promises and timers

describe('advanced asynchronous timer tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('process Promise chains with advanceTimersByTimeAsync', async () => {
    const log: string[] = [];

    async function workflow() {
      log.push('start');
      await delay(100);      // setTimeout(resolve, 100)
      log.push('after-100ms');
      await delay(200);      // setTimeout(resolve, 200)
      log.push('after-300ms');
      return 'done';
    }

    const promise = workflow();

    // advanceTimersByTimeAsync also processes Promise microtasks
    await jest.advanceTimersByTimeAsync(100);
    expect(log).toEqual(['start', 'after-100ms']);

    await jest.advanceTimersByTimeAsync(200);
    expect(log).toEqual(['start', 'after-100ms', 'after-300ms']);

    const result = await promise;
    expect(result).toBe('done');
  });

  test('process all timers at once with runAllTimersAsync', async () => {
    const fn1 = jest.fn();
    const fn2 = jest.fn();

    setTimeout(fn1, 1000);
    setTimeout(fn2, 5000);

    await jest.runAllTimersAsync();

    expect(fn1).toHaveBeenCalled();
    expect(fn2).toHaveBeenCalled();
  });

  // Note: runAllTimersAsync cannot be used with infinite setInterval loops
  test('process only pending timers with runOnlyPendingTimersAsync', async () => {
    const fn = jest.fn();
    setInterval(fn, 1000);

    // Only execute currently pending timers (do not execute newly created ones)
    await jest.runOnlyPendingTimersAsync();
    expect(fn).toHaveBeenCalledTimes(1);

    await jest.runOnlyPendingTimersAsync();
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
```

### 2.4 Vitest Fake Timers

```typescript
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';

describe('Vitest fake timers', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('debounce test', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 300);

    debounced();
    vi.advanceTimersByTime(300);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('fix date/time with setSystemTime', () => {
    vi.setSystemTime(new Date('2025-06-15T10:00:00Z'));

    const now = new Date();
    expect(now.getFullYear()).toBe(2025);
    expect(now.getMonth()).toBe(5); // 0-indexed
    expect(now.getDate()).toBe(15);
  });

  test('mock only specific timer APIs', () => {
    vi.useFakeTimers({
      toFake: ['setTimeout', 'Date'], // Use real setInterval
    });

    const fn = vi.fn();
    setTimeout(fn, 1000);
    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalled();
  });
});
```

---

## 3. API Mocking

### 3.1 MSW (Mock Service Worker) v2

```typescript
// msw v2: HTTP handler-based mocking
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

// Handler definitions
const handlers = [
  // GET request
  http.get('/api/users/:id', ({ params }) => {
    const { id } = params;
    if (id === 'not-found') {
      return HttpResponse.json(
        { error: 'Not found' },
        { status: 404 },
      );
    }
    return HttpResponse.json({
      id,
      name: 'Taro Tanaka',
      email: 'tanaka@example.com',
    });
  }),

  // POST request
  http.post('/api/orders', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;
    return HttpResponse.json(
      { id: 'order-1', ...body, status: 'created' },
      { status: 201 },
    );
  }),

  // PATCH request
  http.patch('/api/users/:id', async ({ params, request }) => {
    const { id } = params;
    const updates = await request.json() as Record<string, unknown>;
    return HttpResponse.json({ id, ...updates, updatedAt: new Date().toISOString() });
  }),

  // DELETE request
  http.delete('/api/users/:id', ({ params }) => {
    return new HttpResponse(null, { status: 204 });
  }),
];

// Server setup
const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Tests
test('user API test', async () => {
  const user = await fetchUser('user-123');
  expect(user.name).toBe('Taro Tanaka');
});

test('404 error test', async () => {
  await expect(fetchUser('not-found')).rejects.toThrow('User not found');
});

test('order creation test', async () => {
  const order = await createOrder({ productId: 'prod-1', quantity: 2 });
  expect(order.status).toBe('created');
  expect(order.productId).toBe('prod-1');
});
```

### 3.2 Test-Specific Handler Overrides

```typescript
// Override handlers for specific tests
test('server error handling', async () => {
  server.use(
    http.get('/api/users/:id', () => {
      return HttpResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 },
      );
    }),
  );

  await expect(fetchUser('user-123')).rejects.toThrow('Server error');
});

test('network error simulation', async () => {
  server.use(
    http.get('/api/users/:id', () => {
      return HttpResponse.error(); // Network error
    }),
  );

  await expect(fetchUser('user-123')).rejects.toThrow('Network error');
});

test('delayed response simulation', async () => {
  server.use(
    http.get('/api/users/:id', async () => {
      await delay(5000); // 5-second delay
      return HttpResponse.json({ id: 'user-123', name: 'Taro Tanaka' });
    }),
  );

  // Timeout test
  await expect(
    fetchUserWithTimeout('user-123', { timeout: 1000 }),
  ).rejects.toThrow('Request timeout');
});

// Testing response headers
test('Rate Limit header processing', async () => {
  server.use(
    http.get('/api/users/:id', () => {
      return HttpResponse.json(
        { error: 'Too Many Requests' },
        {
          status: 429,
          headers: {
            'Retry-After': '30',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': '1700000000',
          },
        },
      );
    }),
  );

  const error = await fetchUser('user-123').catch(e => e);
  expect(error.retryAfter).toBe(30);
});
```

### 3.3 GraphQL Mocking

```typescript
import { graphql, HttpResponse } from 'msw';

const graphqlHandlers = [
  // Query mock
  graphql.query('GetUser', ({ variables }) => {
    const { id } = variables;
    return HttpResponse.json({
      data: {
        user: {
          id,
          name: 'Taro Tanaka',
          email: 'tanaka@example.com',
          posts: [
            { id: 'post-1', title: 'First Post' },
            { id: 'post-2', title: 'Second Post' },
          ],
        },
      },
    });
  }),

  // Mutation mock
  graphql.mutation('CreatePost', ({ variables }) => {
    return HttpResponse.json({
      data: {
        createPost: {
          id: 'post-new',
          title: variables.title,
          createdAt: new Date().toISOString(),
        },
      },
    });
  }),

  // Error response
  graphql.query('GetPrivateData', () => {
    return HttpResponse.json({
      errors: [
        {
          message: 'Not authorized',
          extensions: { code: 'UNAUTHORIZED' },
        },
      ],
    });
  }),
];

const server = setupServer(...graphqlHandlers);

test('GraphQL query test', async () => {
  const { data } = await graphqlClient.query({
    query: GET_USER,
    variables: { id: 'user-123' },
  });
  expect(data.user.name).toBe('Taro Tanaka');
  expect(data.user.posts).toHaveLength(2);
});
```

### 3.4 Mocking fetch / axios (Without msw)

```typescript
// Mocking fetch with jest.spyOn
describe('fetch mock', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('direct fetch mock', async () => {
    const mockResponse = {
      ok: true,
      status: 200,
      json: async () => ({ id: 'user-123', name: 'Taro Tanaka' }),
      headers: new Headers({ 'content-type': 'application/json' }),
    };

    jest.spyOn(globalThis, 'fetch').mockResolvedValue(mockResponse as Response);

    const user = await fetchUser('user-123');
    expect(user.name).toBe('Taro Tanaka');
    expect(fetch).toHaveBeenCalledWith(
      '/api/users/user-123',
      expect.objectContaining({ method: 'GET' }),
    );
  });
});

// Mocking axios
import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('axios mock test', async () => {
  mockedAxios.get.mockResolvedValue({
    data: { id: 'user-123', name: 'Taro Tanaka' },
    status: 200,
  });

  const user = await fetchUserWithAxios('user-123');
  expect(user.name).toBe('Taro Tanaka');
  expect(mockedAxios.get).toHaveBeenCalledWith('/api/users/user-123');
});

// Testing axios interceptors
test('retry interceptor test', async () => {
  let callCount = 0;
  mockedAxios.get.mockImplementation(async () => {
    callCount++;
    if (callCount < 3) {
      throw { response: { status: 503 }, isAxiosError: true };
    }
    return { data: { status: 'ok' }, status: 200 };
  });

  const result = await apiClientWithRetry.get('/api/health');
  expect(result.data.status).toBe('ok');
  expect(callCount).toBe(3);
});
```

---

## 4. Avoiding Flaky Tests

### 4.1 Causes and Countermeasures for Flaky Tests

```
Causes of flaky tests (unstable tests):
  1. Timing dependency (setTimeout, setInterval)
  2. Assumptions about execution order (concurrent tests)
  3. External service dependency (calling real APIs)
  4. Shared state (data persisting between tests)
  5. Non-deterministic values (Math.random, Date.now)
  6. Network instability (DNS resolution, timeouts)
  7. File system contention (temporary files, locks)
  8. Implicit dependencies between tests (tests dependent on execution order)

Countermeasures:
  -> Timers -> Fake timers
  -> External APIs -> Mocks (msw)
  -> Shared state -> Reset in beforeEach
  -> Random values -> Seeded random or fixed values
  -> Date.now -> jest.setSystemTime()
  -> Network -> Mock with msw / nock
  -> Files -> Ensure reliable cleanup of temporary directories
  -> Order dependency -> Guarantee independence of each test
```

### 4.2 Mocking Non-Deterministic Values

```typescript
// Mocking dates
describe('date-dependent tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-01-15T10:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('invoice due date is 30 days later', () => {
    const invoice = createInvoice();
    expect(invoice.dueDate).toEqual(new Date('2025-02-14T10:00:00Z'));
  });

  test('processing across midnight', () => {
    jest.setSystemTime(new Date('2025-01-15T23:59:59Z'));
    const report1 = createDailyReport();

    jest.setSystemTime(new Date('2025-01-16T00:00:01Z'));
    const report2 = createDailyReport();

    expect(report1.date).not.toBe(report2.date);
  });

  test('timezone-dependent processing', () => {
    // For UTC+9 (JST)
    jest.setSystemTime(new Date('2025-01-15T15:00:00Z')); // JST 2025-01-16 00:00
    const jstDate = formatDateJST(new Date());
    expect(jstDate).toBe('2025-01-16');
  });
});

// Mocking Math.random
describe('random value tests', () => {
  test('random numbers with fixed seed', () => {
    // Seeded pseudo-random number generator
    const rng = seedrandom('test-seed-123');
    const values = Array.from({ length: 5 }, () => rng());

    // Same seed always produces the same results
    const rng2 = seedrandom('test-seed-123');
    const values2 = Array.from({ length: 5 }, () => rng2());

    expect(values).toEqual(values2);
  });

  test('spying on Math.random', () => {
    const mockRandom = jest.spyOn(Math, 'random');
    mockRandom.mockReturnValue(0.5);

    const result = generateRandomId();
    expect(result).toBe('expected-id-for-0.5');

    mockRandom.mockRestore();
  });
});

// Mocking UUIDs
describe('UUID tests', () => {
  test('mocking crypto.randomUUID', () => {
    const mockUUID = jest.spyOn(crypto, 'randomUUID');
    mockUUID.mockReturnValue('550e8400-e29b-41d4-a716-446655440000');

    const order = createOrder({ productId: 'prod-1' });
    expect(order.id).toBe('550e8400-e29b-41d4-a716-446655440000');

    mockUUID.mockRestore();
  });
});
```

### 4.3 Test Isolation

```typescript
// Proper shared state reset
describe('database operations', () => {
  let testDb: TestDatabase;

  beforeAll(async () => {
    // Once for the entire test suite: DB connection
    testDb = await TestDatabase.connect();
  });

  beforeEach(async () => {
    // Before each test: clean data
    await testDb.truncateAll();
    await testDb.seed(defaultTestData);
  });

  afterAll(async () => {
    // End of test suite: DB disconnect
    await testDb.disconnect();
  });

  test('user creation', async () => {
    const user = await userService.create({ name: 'Test' });
    expect(user.id).toBeDefined();
  });

  test('user count', async () => {
    // Not affected by the previous test
    const count = await userService.count();
    expect(count).toBe(defaultTestData.users.length);
  });
});

// Resetting singletons
describe('cache service', () => {
  beforeEach(() => {
    // Reset the singleton's internal state
    CacheService.getInstance().clear();
  });

  test('cache miss', async () => {
    const result = await CacheService.getInstance().get('key-1');
    expect(result).toBeNull();
  });

  test('cache hit', async () => {
    await CacheService.getInstance().set('key-1', 'value-1');
    const result = await CacheService.getInstance().get('key-1');
    expect(result).toBe('value-1');
  });
});

// Resetting environment variables
describe('environment variable dependent tests', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Create a copy of environment variables
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    // Restore original
    process.env = originalEnv;
  });

  test('production environment configuration', () => {
    process.env.NODE_ENV = 'production';
    process.env.API_URL = 'https://api.example.com';

    const config = loadConfig();
    expect(config.apiUrl).toBe('https://api.example.com');
    expect(config.debug).toBe(false);
  });

  test('development environment configuration', () => {
    process.env.NODE_ENV = 'development';
    process.env.API_URL = 'http://localhost:3000';

    const config = loadConfig();
    expect(config.apiUrl).toBe('http://localhost:3000');
    expect(config.debug).toBe(true);
  });
});
```

### 4.4 waitFor Pattern (Asynchronous Assertions)

```typescript
// Testing Library: waitFor
import { render, screen, waitFor } from '@testing-library/react';

test('displayed after data loading', async () => {
  render(<UserProfile userId="user-123" />);

  // Loading display
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Wait for data fetch to complete
  await waitFor(() => {
    expect(screen.getByText('Taro Tanaka')).toBeInTheDocument();
  });

  // Loading indicator has disappeared
  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
});

// waitFor option configuration
test('custom timeout and interval', async () => {
  render(<SlowComponent />);

  await waitFor(
    () => {
      expect(screen.getByTestId('result')).toHaveTextContent('Complete');
    },
    {
      timeout: 5000,   // Maximum wait time
      interval: 100,   // Polling interval
    },
  );
});

// findBy queries (shortcut for waitFor + getBy)
test('get async element with findBy', async () => {
  render(<UserList />);

  // findByText internally uses waitFor
  const userElement = await screen.findByText('Taro Tanaka');
  expect(userElement).toBeInTheDocument();
});

// waitForElementToBeRemoved
test('wait for element removal', async () => {
  render(<DeletableItem id="item-1" />);

  const deleteButton = screen.getByRole('button', { name: 'Delete' });
  fireEvent.click(deleteButton);

  // Wait for element to be removed
  await waitForElementToBeRemoved(() =>
    screen.queryByTestId('item-1'),
  );
});
```

---

## 5. Asynchronous Testing in Python

### 5.1 pytest-asyncio

```python
# pytest-asyncio: asynchronous testing in Python
import pytest
import asyncio
from unittest.mock import AsyncMock, patch, MagicMock

# Declare an async test function with pytest.mark.asyncio
@pytest.mark.asyncio
async def test_fetch_user():
    """Basic test for an async function"""
    user = await fetch_user("user-123")
    assert user["name"] == "Taro Tanaka"

@pytest.mark.asyncio
async def test_fetch_user_not_found():
    """Test for async exceptions"""
    with pytest.raises(UserNotFoundError, match="User not found"):
        await fetch_user("invalid-id")

@pytest.mark.asyncio
async def test_concurrent_requests():
    """Test for concurrent requests"""
    users = await asyncio.gather(
        fetch_user("user-1"),
        fetch_user("user-2"),
        fetch_user("user-3"),
    )
    assert len(users) == 3
    assert all(u["id"] is not None for u in users)


# pytest-asyncio mode configuration
# pyproject.toml:
# [tool.pytest.ini_options]
# asyncio_mode = "auto"  # Allows omitting @pytest.mark.asyncio


# Fixtures
@pytest.fixture
async def db_connection():
    """Async fixture"""
    conn = await create_db_connection("test_db")
    yield conn
    await conn.close()

@pytest.fixture
async def test_user(db_connection):
    """Fixture that creates a test user"""
    user = await db_connection.execute(
        "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
        "Test User", "test@example.com"
    )
    yield user
    await db_connection.execute("DELETE FROM users WHERE id = $1", user["id"])

@pytest.mark.asyncio
async def test_update_user(db_connection, test_user):
    """Test using fixtures"""
    updated = await update_user(db_connection, test_user["id"], name="Updated")
    assert updated["name"] == "Updated"
```

### 5.2 AsyncMock

```python
from unittest.mock import AsyncMock, patch, MagicMock

# AsyncMock basics
@pytest.mark.asyncio
async def test_with_async_mock():
    """Mocking with AsyncMock"""
    mock_repo = AsyncMock()
    mock_repo.find_by_id.return_value = {"id": "user-123", "name": "Taro Tanaka"}

    service = UserService(repository=mock_repo)
    user = await service.get_user("user-123")

    assert user["name"] == "Taro Tanaka"
    mock_repo.find_by_id.assert_called_once_with("user-123")

# Raising exceptions with AsyncMock
@pytest.mark.asyncio
async def test_async_mock_exception():
    mock_repo = AsyncMock()
    mock_repo.find_by_id.side_effect = DatabaseError("Connection failed")

    service = UserService(repository=mock_repo)
    with pytest.raises(ServiceError, match="Failed to fetch user"):
        await service.get_user("user-123")

# Combining with patch decorator
@pytest.mark.asyncio
@patch("myapp.services.user_service.send_email", new_callable=AsyncMock)
@patch("myapp.services.user_service.UserRepository", new_callable=AsyncMock)
async def test_create_user_sends_email(mock_repo, mock_send_email):
    mock_repo.return_value.save.return_value = {
        "id": "user-new",
        "name": "New User",
        "email": "new@example.com",
    }

    service = UserService(repository=mock_repo.return_value)
    user = await service.create_user(name="New User", email="new@example.com")

    mock_send_email.assert_called_once_with(
        to="new@example.com",
        subject="Welcome",
    )

# Behavior based on call count with side_effect
@pytest.mark.asyncio
async def test_retry_behavior():
    mock_fn = AsyncMock(side_effect=[
        ConnectionError("Timeout"),
        ConnectionError("Timeout"),
        {"status": "ok"},
    ])

    result = await retry_with_backoff(mock_fn, max_retries=3)
    assert result == {"status": "ok"}
    assert mock_fn.call_count == 3
```

### 5.3 aiohttp Testing

```python
import aiohttp
from aiohttp.test_utils import AioHTTPTestCase, unittest_run_loop
from aiohttp import web
import pytest

# aiohttp test server
@pytest.fixture
async def app():
    """Test aiohttp application"""
    app = web.Application()
    app.router.add_get("/api/users/{id}", handle_get_user)
    app.router.add_post("/api/users", handle_create_user)
    return app

@pytest.fixture
async def client(app, aiohttp_client):
    """Test client"""
    return await aiohttp_client(app)

@pytest.mark.asyncio
async def test_get_user(client):
    resp = await client.get("/api/users/user-123")
    assert resp.status == 200
    data = await resp.json()
    assert data["name"] == "Taro Tanaka"

@pytest.mark.asyncio
async def test_create_user(client):
    resp = await client.post("/api/users", json={
        "name": "New User",
        "email": "new@example.com",
    })
    assert resp.status == 201
    data = await resp.json()
    assert data["id"] is not None


# Mocking external APIs with aioresponses
from aioresponses import aioresponses

@pytest.mark.asyncio
async def test_external_api_call():
    with aioresponses() as mocked:
        mocked.get(
            "https://api.external.com/data",
            payload={"key": "value"},
            status=200,
        )

        async with aiohttp.ClientSession() as session:
            async with session.get("https://api.external.com/data") as resp:
                data = await resp.json()
                assert data["key"] == "value"

@pytest.mark.asyncio
async def test_external_api_timeout():
    with aioresponses() as mocked:
        mocked.get(
            "https://api.external.com/data",
            exception=asyncio.TimeoutError(),
        )

        with pytest.raises(asyncio.TimeoutError):
            async with aiohttp.ClientSession() as session:
                await session.get("https://api.external.com/data")
```

### 5.4 FastAPI Testing

```python
import pytest
from httpx import AsyncClient, ASGITransport
from fastapi import FastAPI
from unittest.mock import AsyncMock, patch

app = FastAPI()

# FastAPI testing (using httpx AsyncClient)
@pytest.fixture
async def async_client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        yield client

@pytest.mark.asyncio
async def test_get_users(async_client):
    response = await async_client.get("/api/users")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)

@pytest.mark.asyncio
async def test_create_user(async_client):
    response = await async_client.post("/api/users", json={
        "name": "Test User",
        "email": "test@example.com",
    })
    assert response.status_code == 201
    data = response.json()
    assert data["name"] == "Test User"

# Dependency override
@pytest.mark.asyncio
async def test_with_mock_dependency(async_client):
    mock_user_repo = AsyncMock()
    mock_user_repo.find_all.return_value = [
        {"id": "1", "name": "User 1"},
        {"id": "2", "name": "User 2"},
    ]

    app.dependency_overrides[get_user_repository] = lambda: mock_user_repo

    response = await async_client.get("/api/users")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2

    # Cleanup
    app.dependency_overrides.clear()
```

---

## 6. Asynchronous Testing in Go

### 6.1 Testing Goroutines

```go
package async_test

import (
    "context"
    "sync"
    "testing"
    "time"

    "github.com/stretchr/testify/assert"
    "github.com/stretchr/testify/require"
)

// Basic goroutine test
func TestConcurrentProcessor(t *testing.T) {
    processor := NewConcurrentProcessor(5) // concurrency of 5

    items := []string{"a", "b", "c", "d", "e", "f", "g", "h", "i", "j"}
    results, err := processor.Process(context.Background(), items)

    require.NoError(t, err)
    assert.Len(t, results, len(items))
}

// Testing context cancellation
func TestCancellation(t *testing.T) {
    ctx, cancel := context.WithCancel(context.Background())

    var started sync.WaitGroup
    started.Add(1)

    errCh := make(chan error, 1)
    go func() {
        started.Done()
        errCh <- longRunningOperation(ctx)
    }()

    started.Wait()
    cancel() // Cancel

    err := <-errCh
    assert.ErrorIs(t, err, context.Canceled)
}

// Testing timeouts
func TestTimeout(t *testing.T) {
    ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
    defer cancel()

    err := slowOperation(ctx) // Internally takes 1 second
    assert.ErrorIs(t, err, context.DeadlineExceeded)
}

// Data race detection (go test -race)
func TestNoDataRace(t *testing.T) {
    counter := NewAtomicCounter()

    var wg sync.WaitGroup
    for i := 0; i < 1000; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            counter.Increment()
        }()
    }

    wg.Wait()
    assert.Equal(t, int64(1000), counter.Value())
}
```

### 6.2 Testing Channels

```go
// Channel-based testing
func TestWorkerPool(t *testing.T) {
    jobs := make(chan Job, 10)
    results := make(chan Result, 10)

    // Start workers
    pool := NewWorkerPool(3, jobs, results)
    pool.Start()

    // Submit jobs
    for i := 0; i < 5; i++ {
        jobs <- Job{ID: i, Data: fmt.Sprintf("task-%d", i)}
    }
    close(jobs)

    // Collect results
    var collected []Result
    for r := range results {
        collected = append(collected, r)
    }

    assert.Len(t, collected, 5)
    for _, r := range collected {
        assert.NoError(t, r.Error)
    }
}

// Channel waiting with timeout using select
func TestChannelWithTimeout(t *testing.T) {
    ch := make(chan string, 1)

    // Send value asynchronously
    go func() {
        time.Sleep(50 * time.Millisecond)
        ch <- "result"
    }()

    select {
    case result := <-ch:
        assert.Equal(t, "result", result)
    case <-time.After(1 * time.Second):
        t.Fatal("Timeout: result not received within 1 second")
    }
}

// testify's Eventually (polling-based assertion)
func TestEventualConsistency(t *testing.T) {
    service := NewEventualService()
    service.TriggerUpdate("key-1", "new-value")

    // Verify that the value is eventually updated
    assert.Eventually(t, func() bool {
        val, err := service.Get("key-1")
        return err == nil && val == "new-value"
    }, 5*time.Second, 100*time.Millisecond)
}

// testify's Never (verify a condition never occurs)
func TestNeverHappens(t *testing.T) {
    service := NewStableService()

    assert.Never(t, func() bool {
        return service.HasError()
    }, 1*time.Second, 100*time.Millisecond)
}
```

### 6.3 HTTP Testing

```go
import (
    "net/http"
    "net/http/httptest"
    "testing"
)

// Mock server with httptest.Server
func TestExternalAPIClient(t *testing.T) {
    // Test server
    server := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        switch r.URL.Path {
        case "/api/users/user-123":
            w.Header().Set("Content-Type", "application/json")
            w.WriteHeader(http.StatusOK)
            w.Write([]byte(`{"id": "user-123", "name": "Taro Tanaka"}`))
        case "/api/users/not-found":
            w.WriteHeader(http.StatusNotFound)
            w.Write([]byte(`{"error": "Not found"}`))
        default:
            w.WriteHeader(http.StatusNotFound)
        }
    }))
    defer server.Close()

    // Create client using test server URL
    client := NewAPIClient(server.URL)

    t.Run("success case", func(t *testing.T) {
        user, err := client.GetUser(context.Background(), "user-123")
        require.NoError(t, err)
        assert.Equal(t, "Taro Tanaka", user.Name)
    })

    t.Run("404 error", func(t *testing.T) {
        _, err := client.GetUser(context.Background(), "not-found")
        assert.ErrorIs(t, err, ErrUserNotFound)
    })
}

// Handler testing with httptest.NewRecorder
func TestUserHandler(t *testing.T) {
    handler := NewUserHandler(mockUserService)

    req := httptest.NewRequest("GET", "/api/users/user-123", nil)
    rec := httptest.NewRecorder()

    handler.ServeHTTP(rec, req)

    assert.Equal(t, http.StatusOK, rec.Code)

    var user User
    err := json.NewDecoder(rec.Body).Decode(&user)
    require.NoError(t, err)
    assert.Equal(t, "Taro Tanaka", user.Name)
}
```

---

## 7. Async Waiting Strategies for E2E Testing

### 7.1 Playwright (TypeScript)

```typescript
import { test, expect } from '@playwright/test';

test.describe('User management screen', () => {
  test('user list is displayed', async ({ page }) => {
    await page.goto('/users');

    // Wait for network request to complete
    await page.waitForResponse(
      response => response.url().includes('/api/users') && response.status() === 200,
    );

    // Wait for elements to appear
    await expect(page.getByText('Taro Tanaka')).toBeVisible();
    await expect(page.getByText('Hanako Suzuki')).toBeVisible();
  });

  test('user creation flow', async ({ page }) => {
    await page.goto('/users/new');

    // Form input
    await page.getByLabel('Name').fill('New User');
    await page.getByLabel('Email').fill('new@example.com');

    // Submit form while waiting for API response
    const responsePromise = page.waitForResponse('/api/users');
    await page.getByRole('button', { name: 'Create' }).click();
    const response = await responsePromise;

    expect(response.status()).toBe(201);

    // Wait for redirect
    await page.waitForURL('/users/*');

    // Verify success message is displayed
    await expect(page.getByText('User has been created')).toBeVisible();
  });

  test('error display test', async ({ page }) => {
    // Mock API (Playwright routing)
    await page.route('/api/users', route =>
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' }),
      }),
    );

    await page.goto('/users');

    // Wait for error message to appear
    await expect(page.getByText('Failed to fetch data')).toBeVisible();

    // Click retry button
    await page.route('/api/users', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{ id: '1', name: 'Taro Tanaka' }]),
      }),
    );

    await page.getByRole('button', { name: 'Retry' }).click();
    await expect(page.getByText('Taro Tanaka')).toBeVisible();
  });
});

// Testing network state
test('behavior when offline', async ({ page, context }) => {
  await page.goto('/dashboard');
  await expect(page.getByTestId('status')).toHaveText('Online');

  // Go offline
  await context.setOffline(true);
  await expect(page.getByTestId('status')).toHaveText('Offline');

  // Go back online
  await context.setOffline(false);
  await expect(page.getByTestId('status')).toHaveText('Online');
});
```

### 7.2 Cypress

```typescript
// Cypress: waiting strategies for asynchronous tests

describe('User management', () => {
  beforeEach(() => {
    // API mock setup
    cy.intercept('GET', '/api/users', {
      fixture: 'users.json',
    }).as('getUsers');

    cy.intercept('POST', '/api/users', {
      statusCode: 201,
      body: { id: 'user-new', name: 'New User' },
    }).as('createUser');
  });

  it('displays user list', () => {
    cy.visit('/users');

    // Wait for API response
    cy.wait('@getUsers');

    // Verify element display
    cy.findByText('Taro Tanaka').should('be.visible');
    cy.findByText('Hanako Suzuki').should('be.visible');
  });

  it('creates a user', () => {
    cy.visit('/users/new');

    cy.findByLabelText('Name').type('New User');
    cy.findByLabelText('Email').type('new@example.com');
    cy.findByRole('button', { name: 'Create' }).click();

    // Wait for API response and also validate request content
    cy.wait('@createUser').then((interception) => {
      expect(interception.request.body).to.deep.equal({
        name: 'New User',
        email: 'new@example.com',
      });
    });

    // Verify redirect
    cy.url().should('match', /\/users\/.+/);
    cy.findByText('User has been created').should('be.visible');
  });

  it('handles network errors', () => {
    cy.intercept('GET', '/api/users', {
      forceNetworkError: true,
    }).as('getUsersFailed');

    cy.visit('/users');
    cy.wait('@getUsersFailed');

    cy.findByText('A network error occurred').should('be.visible');
  });

  it('tests delayed responses', () => {
    cy.intercept('GET', '/api/users', {
      fixture: 'users.json',
      delay: 3000, // 3-second delay
    }).as('getUsers');

    cy.visit('/users');

    // Verify loading display
    cy.findByTestId('loading-spinner').should('be.visible');

    // After data fetch completes
    cy.wait('@getUsers');
    cy.findByTestId('loading-spinner').should('not.exist');
    cy.findByText('Taro Tanaka').should('be.visible');
  });
});

// Cypress: wrapping async operations with custom commands
Cypress.Commands.add('waitForApiAndAssert', (alias: string, assertion: Function) => {
  cy.wait(alias).then((interception) => {
    assertion(interception);
  });
});
```

### 7.3 WebSocket E2E Testing

```typescript
// Playwright: WebSocket testing
test('WebSocket real-time communication', async ({ page }) => {
  // Monitor WebSocket messages
  const messages: string[] = [];
  page.on('websocket', ws => {
    ws.on('framereceived', frame => {
      messages.push(frame.payload as string);
    });
  });

  await page.goto('/chat');

  // Send message
  await page.getByPlaceholder('Enter message').fill('Hello');
  await page.getByRole('button', { name: 'Send' }).click();

  // Verify the sent message is displayed
  await expect(page.getByText('Hello')).toBeVisible();

  // Verify the message was sent via WebSocket
  expect(messages.some(m => m.includes('Hello'))).toBe(true);
});

// WebSocket mocking
test('WebSocket mock', async ({ page }) => {
  // Mock WebSocket route
  await page.routeWebSocket('/ws', ws => {
    ws.onMessage(message => {
      // Echo back
      const data = JSON.parse(message as string);
      ws.send(JSON.stringify({
        type: 'echo',
        data: data.message,
        timestamp: Date.now(),
      }));
    });
  });

  await page.goto('/chat');
  await page.getByPlaceholder('Enter message').fill('Test');
  await page.getByRole('button', { name: 'Send' }).click();

  await expect(page.getByText('Test')).toBeVisible();
});
```

---

## 8. Design Patterns for Asynchronous Testing

### 8.1 Test Helper Design

```typescript
// Reusable asynchronous test helpers

/**
 * Verify that an async operation completes within a specified time
 */
async function expectToCompleteWithin<T>(
  operation: () => Promise<T>,
  timeoutMs: number,
  message?: string,
): Promise<T> {
  const start = Date.now();
  const result = await Promise.race([
    operation(),
    new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new Error(message || `Operation timed out after ${timeoutMs}ms`)),
        timeoutMs,
      ),
    ),
  ]);
  const elapsed = Date.now() - start;
  console.log(`Operation completed in ${elapsed}ms`);
  return result;
}

/**
 * Verify that an async operation eventually succeeds (polling)
 */
async function waitUntil(
  predicate: () => Promise<boolean> | boolean,
  options: { timeout?: number; interval?: number; message?: string } = {},
): Promise<void> {
  const { timeout = 5000, interval = 100, message = 'Condition not met' } = options;
  const start = Date.now();

  while (Date.now() - start < timeout) {
    if (await predicate()) return;
    await new Promise(resolve => setTimeout(resolve, interval));
  }

  throw new Error(`${message} (waited ${timeout}ms)`);
}

/**
 * Retry an async operation a specified number of times for testing
 */
async function retryTest(
  testFn: () => Promise<void>,
  maxRetries: number = 3,
): Promise<void> {
  let lastError: Error | undefined;

  for (let i = 0; i < maxRetries; i++) {
    try {
      await testFn();
      return;
    } catch (error) {
      lastError = error as Error;
      console.warn(`Test attempt ${i + 1} failed: ${lastError.message}`);
    }
  }

  throw lastError;
}

// Usage examples
test('API responds within 1 second', async () => {
  const result = await expectToCompleteWithin(
    () => fetchUser('user-123'),
    1000,
    'API response too slow',
  );
  expect(result.name).toBe('Taro Tanaka');
});

test('cache is refreshed', async () => {
  cache.invalidate('user-123');
  triggerCacheRefresh();

  await waitUntil(
    async () => {
      const cached = await cache.get('user-123');
      return cached !== null;
    },
    { timeout: 3000, message: 'Cache was not refreshed' },
  );
});
```

### 8.2 Test Double Patterns

```typescript
// Classification and implementation of asynchronous test doubles

// 1. Stub: returns fixed values
class StubUserRepository {
  async findById(id: string): Promise<User | null> {
    const users: Record<string, User> = {
      'user-1': { id: 'user-1', name: 'Taro Tanaka', email: 'tanaka@example.com' },
      'user-2': { id: 'user-2', name: 'Hanako Suzuki', email: 'suzuki@example.com' },
    };
    return users[id] ?? null;
  }

  async save(user: User): Promise<User> {
    return { ...user, id: user.id || 'generated-id' };
  }
}

// 2. Spy: records invocations
class SpyEmailService implements EmailService {
  readonly sentEmails: Array<{ to: string; subject: string; body: string }> = [];

  async send(to: string, subject: string, body: string): Promise<void> {
    this.sentEmails.push({ to, subject, body });
  }

  getCallCount(): number {
    return this.sentEmails.length;
  }

  wasCalledWith(to: string): boolean {
    return this.sentEmails.some(email => email.to === to);
  }
}

// 3. Fake: simplified implementation
class FakeCache implements CacheService {
  private store = new Map<string, { value: string; expiresAt: number }>();

  async get(key: string): Promise<string | null> {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }

  async set(key: string, value: string, ttlMs: number): Promise<void> {
    this.store.set(key, { value, expiresAt: Date.now() + ttlMs });
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  // Test helpers
  clear(): void {
    this.store.clear();
  }

  size(): number {
    return this.store.size;
  }
}

// 4. Mock: sets expectations and verifies
class MockPaymentGateway implements PaymentGateway {
  private expectations: Array<{
    method: string;
    args: any[];
    result: any;
    called: boolean;
  }> = [];

  expectCharge(amount: number, currency: string): MockPaymentGateway {
    this.expectations.push({
      method: 'charge',
      args: [amount, currency],
      result: { transactionId: 'txn-mock', status: 'success' },
      called: false,
    });
    return this;
  }

  async charge(amount: number, currency: string): Promise<PaymentResult> {
    const expectation = this.expectations.find(
      e => e.method === 'charge' && !e.called,
    );
    if (!expectation) {
      throw new Error(`Unexpected call: charge(${amount}, ${currency})`);
    }
    expect([amount, currency]).toEqual(expectation.args);
    expectation.called = true;
    return expectation.result;
  }

  verify(): void {
    const uncalled = this.expectations.filter(e => !e.called);
    if (uncalled.length > 0) {
      throw new Error(
        `Expected calls not made: ${uncalled.map(e => e.method).join(', ')}`,
      );
    }
  }
}

// Usage in tests
test('order processing triggers email and payment', async () => {
  const emailSpy = new SpyEmailService();
  const paymentMock = new MockPaymentGateway();
  paymentMock.expectCharge(1000, 'JPY');

  const orderService = new OrderService({
    email: emailSpy,
    payment: paymentMock,
    repository: new StubUserRepository(),
    cache: new FakeCache(),
  });

  await orderService.placeOrder({
    userId: 'user-1',
    productId: 'prod-1',
    amount: 1000,
  });

  // Spy verification
  expect(emailSpy.getCallCount()).toBe(1);
  expect(emailSpy.wasCalledWith('tanaka@example.com')).toBe(true);

  // Mock verification
  paymentMock.verify();
});
```

### 8.3 Event-Driven Testing

```typescript
// EventEmitter-based asynchronous testing

import { EventEmitter } from 'events';

// Wait for an event with once
test('event is emitted', async () => {
  const emitter = new EventEmitter();

  const eventPromise = new Promise<{ type: string; data: any }>((resolve) => {
    emitter.once('user:created', (data) => resolve({ type: 'user:created', data }));
  });

  // Emit event asynchronously
  setTimeout(() => {
    emitter.emit('user:created', { id: 'user-1', name: 'Taro Tanaka' });
  }, 100);

  const event = await eventPromise;
  expect(event.type).toBe('user:created');
  expect(event.data.name).toBe('Taro Tanaka');
});

// Using Node.js events.once
import { once } from 'events';

test('wait with events.once', async () => {
  const emitter = new EventEmitter();

  setTimeout(() => {
    emitter.emit('data', { value: 42 });
  }, 50);

  const [data] = await once(emitter, 'data');
  expect(data.value).toBe(42);
});

// Testing event ordering
test('verify event order', async () => {
  const events: string[] = [];
  const processor = new OrderProcessor();

  processor.on('started', () => events.push('started'));
  processor.on('validated', () => events.push('validated'));
  processor.on('charged', () => events.push('charged'));
  processor.on('completed', () => events.push('completed'));

  await processor.process({ productId: 'prod-1', amount: 1000 });

  expect(events).toEqual(['started', 'validated', 'charged', 'completed']);
});

// Testing error events
test('error event is emitted', async () => {
  const processor = new OrderProcessor();

  const errorPromise = new Promise<Error>((resolve) => {
    processor.on('error', resolve);
  });

  // Trigger error with invalid order
  processor.process({ productId: '', amount: -100 }).catch(() => {});

  const error = await errorPromise;
  expect(error.message).toContain('Invalid order');
});
```

---

## 9. Property-Based Testing

### 9.1 Testing Async Properties with fast-check

```typescript
import fc from 'fast-check';

// Asynchronous property-based testing
test('encode then decode returns original', async () => {
  await fc.assert(
    fc.asyncProperty(fc.string(), async (input) => {
      const encoded = await encode(input);
      const decoded = await decode(encoded);
      expect(decoded).toBe(input);
    }),
  );
});

// Property testing for concurrent processing
test('counter remains accurate under concurrent access', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.integer({ min: 1, max: 100 }),
      fc.integer({ min: 1, max: 50 }),
      async (incrementCount, concurrency) => {
        const counter = new AtomicCounter();

        const tasks = Array.from({ length: incrementCount }, () =>
          counter.increment(),
        );

        // Execute with concurrency limit
        await promisePool(tasks.map(t => () => t), concurrency);

        expect(counter.value).toBe(incrementCount);
      },
    ),
    { numRuns: 50 },
  );
});

// Property testing for retries
test('retry either eventually succeeds or stops at max attempts', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.integer({ min: 0, max: 10 }), // Number of failures
      fc.integer({ min: 1, max: 5 }),   // Max retries
      async (failCount, maxRetries) => {
        let callCount = 0;
        const fn = async () => {
          callCount++;
          if (callCount <= failCount) {
            throw new Error('transient');
          }
          return 'success';
        };

        try {
          const result = await retryWithBackoff(fn, {
            maxRetries,
            initialDelay: 1,
          });

          // If successful: failure count < max retries
          expect(result).toBe('success');
          expect(failCount).toBeLessThan(maxRetries);
        } catch {
          // If failed: failure count >= max retries
          expect(failCount).toBeGreaterThanOrEqual(maxRetries);
        }

        // Verify call count
        expect(callCount).toBeLessThanOrEqual(maxRetries + 1);
      },
    ),
    { numRuns: 100 },
  );
});

// Property testing for database operations
test('CRUD operation consistency', async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.record({
        name: fc.string({ minLength: 1, maxLength: 100 }),
        email: fc.emailAddress(),
        age: fc.integer({ min: 0, max: 150 }),
      }),
      async (userData) => {
        // Create
        const created = await userRepo.create(userData);
        expect(created.id).toBeDefined();

        // Read
        const fetched = await userRepo.findById(created.id);
        expect(fetched).toMatchObject(userData);

        // Update
        const updated = await userRepo.update(created.id, { name: 'Updated' });
        expect(updated.name).toBe('Updated');

        // Delete
        await userRepo.delete(created.id);
        const deleted = await userRepo.findById(created.id);
        expect(deleted).toBeNull();
      },
    ),
    { numRuns: 20 },
  );
});
```

### 9.2 Hypothesis (Python)

```python
import pytest
from hypothesis import given, settings, assume
from hypothesis import strategies as st
import asyncio

# Async testing with hypothesis
@pytest.mark.asyncio
@given(st.text(min_size=1, max_size=100))
@settings(max_examples=50)
async def test_encode_decode_roundtrip(text):
    """Encode-decode roundtrip test"""
    encoded = await encode(text)
    decoded = await decode(encoded)
    assert decoded == text

@pytest.mark.asyncio
@given(
    items=st.lists(st.integers(min_value=1, max_value=1000), min_size=1, max_size=50),
    batch_size=st.integers(min_value=1, max_value=10),
)
@settings(max_examples=30)
async def test_batch_processing_preserves_all_items(items, batch_size):
    """All items are processed in batch processing"""
    processed = []

    async def processor(item):
        processed.append(item)
        return item * 2

    results = await process_in_batches(items, processor, batch_size=batch_size)

    assert len(results) == len(items)
    assert sorted(processed) == sorted(items)
    assert all(r == i * 2 for r, i in zip(sorted(results), sorted(items)))
```

---

## 10. Test Performance and CI Optimization

### 10.1 Speeding Up Test Execution

```typescript
// Parallel test execution configuration
// jest.config.ts
export default {
  // Worker count optimization
  maxWorkers: '50%', // Use 50% of CPU
  // maxWorkers: 4, // Fixed value is also possible

  // Parallel test execution
  // Between files: parallel, within files: sequential (default)

  // Slow test timeout
  testTimeout: 10000,

  // Global setup (once for the entire test suite)
  globalSetup: './test/global-setup.ts',
  globalTeardown: './test/global-teardown.ts',

  // Project configuration to isolate different test environments
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/src/**/*.test.ts'],
      testTimeout: 5000,
    },
    {
      displayName: 'integration',
      testMatch: ['<rootDir>/test/integration/**/*.test.ts'],
      testTimeout: 30000,
    },
  ],
};
```

### 10.2 Test Grouping and Selective Execution

```typescript
// Tag-based test selection

// Tagging tests
test('slow test #slow', async () => {
  // ...
});

test('fast test #fast', async () => {
  // ...
});

// Filtering at runtime
// jest --testNamePattern="#fast"
// jest --testNamePattern="^(?!.*#slow)"  // Exclude #slow

// Vitest tag feature
// vitest run --reporter=verbose --bail 1

// Temporarily disabling with describe.skip / test.skip
describe.skip('WIP: new feature tests', () => {
  test('incomplete test', async () => {
    // ...
  });
});

// Focusing with describe.only / test.only (prohibited in CI)
// eslint-plugin-jest: no-focused-tests rule for prevention
```

### 10.3 Async Tests in CI Environments

```yaml
# GitHub Actions: async test configuration
name: Test

on: [push, pull_request]

jobs:
  unit-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      - run: npm ci
      - run: npm run test:unit -- --ci --coverage
        timeout-minutes: 10
        env:
          # Set longer timeout for CI environment
          JEST_TIMEOUT: 15000

  integration-test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: test
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      redis:
        image: redis:7
        ports:
          - 6379:6379
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run test:integration -- --ci
        timeout-minutes: 15
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/test
          REDIS_URL: redis://localhost:6379

  e2e-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e -- --ci
        timeout-minutes: 20
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 7
```

### 10.4 Retry Strategies for CI

```typescript
// Playwright: test retry configuration
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  retries: process.env.CI ? 2 : 0, // Retry twice in CI

  use: {
    // Screenshots and traces on failure
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'on-first-retry',
  },

  // Per-project configuration
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
      retries: 2,
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
      retries: 3, // More retries for Firefox
    },
  ],
});

// Jest: test retry (jest-circus)
// jest.config.ts
export default {
  // jest-circus retry feature (experimental)
  // Per-test retry
};

// Custom retry wrapper
function testWithRetry(
  name: string,
  fn: () => Promise<void>,
  retries: number = 3,
): void {
  test(name, async () => {
    let lastError: Error | undefined;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        await fn();
        return; // Success
      } catch (error) {
        lastError = error as Error;
        if (attempt < retries) {
          console.warn(`Attempt ${attempt} failed, retrying...`);
        }
      }
    }
    throw lastError;
  });
}

// Usage example
testWithRetry('unstable external API integration test', async () => {
  const result = await externalApiCall();
  expect(result.status).toBe('ok');
}, 3);
```

---

## 11. Test Coverage and Quality Metrics

### 11.1 Coverage for Asynchronous Code

```typescript
// Key points to watch for async code coverage

// Problem: catch branch is not tested
async function fetchUserSafe(id: string): Promise<User | null> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`); // <- This branch
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch user:', error); // <- This branch
    return null;
  }
}

// Happy path test
test('successfully retrieve user', async () => {
  const user = await fetchUserSafe('user-123');
  expect(user).not.toBeNull();
  expect(user!.name).toBe('Taro Tanaka');
});

// Error case tests (for coverage improvement)
test('returns null on HTTP error', async () => {
  server.use(
    http.get('/api/users/:id', () => {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    }),
  );

  const user = await fetchUserSafe('invalid');
  expect(user).toBeNull();
});

test('returns null on network error', async () => {
  server.use(
    http.get('/api/users/:id', () => {
      return HttpResponse.error();
    }),
  );

  const user = await fetchUserSafe('user-123');
  expect(user).toBeNull();
});

// Coverage for Promise.allSettled
async function fetchMultipleUsers(ids: string[]): Promise<{
  users: User[];
  errors: string[];
}> {
  const results = await Promise.allSettled(
    ids.map(id => fetchUser(id)),
  );

  const users: User[] = [];
  const errors: string[] = [];

  for (const result of results) {
    if (result.status === 'fulfilled') {
      users.push(result.value);
    } else {
      errors.push(result.reason.message);
    }
  }

  return { users, errors };
}

test('verify results when some requests fail', async () => {
  server.use(
    http.get('/api/users/bad', () => {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 });
    }),
  );

  const { users, errors } = await fetchMultipleUsers(['user-1', 'bad', 'user-2']);
  expect(users).toHaveLength(2);
  expect(errors).toHaveLength(1);
});
```

### 11.2 Mutation Testing

```typescript
// Stryker: verify async code quality with mutation testing
// stryker.conf.json
{
  "mutate": ["src/**/*.ts", "!src/**/*.test.ts"],
  "testRunner": "jest",
  "reporters": ["html", "clear-text", "progress"],
  "coverageAnalysis": "perTest",
  "timeoutMS": 60000,

  // Additional mutants for async code
  "mutator": {
    "excludedMutations": [
      // Exclude unnecessary mutants
    ]
  }
}

// Mutant examples:
// Original code:
// if (retries < maxRetries) { ... }
// Mutants:
// if (retries <= maxRetries) { ... }  <- Boundary value mutation
// if (retries > maxRetries) { ... }   <- Condition inversion
// if (true) { ... }                   <- Condition removal

// Tests that kill these mutants
test('stops precisely at max retry count', async () => {
  const fn = jest.fn().mockRejectedValue(new Error('fail'));

  await expect(
    retryWithBackoff(fn, { maxRetries: 3, initialDelay: 1 }),
  ).rejects.toThrow('fail');

  // Initial + 3 retries = 4 times
  expect(fn).toHaveBeenCalledTimes(4);
});

test('still retries at max retry count - 1', async () => {
  let callCount = 0;
  const fn = jest.fn().mockImplementation(async () => {
    callCount++;
    if (callCount <= 2) throw new Error('fail'); // Fail 2 times
    return 'success';
  });

  const result = await retryWithBackoff(fn, { maxRetries: 3, initialDelay: 1 });
  expect(result).toBe('success');
  expect(callCount).toBe(3); // Initial + 2 retries
});
```

---


## FAQ

### Q1: What is the most important point when studying this topic?

Gaining practical experience is the most important thing. Understanding deepens not just through theory, but by actually writing code and verifying its behavior.

### Q2: What are common mistakes beginners make?

Skipping the fundamentals and jumping to advanced topics. We recommend thoroughly understanding the basic concepts explained in this guide before moving to the next step.

### Q3: How is this applied in professional settings?

The knowledge from this topic is frequently applied in daily development work. It becomes particularly important during code reviews and architecture design.

---

## Summary

| Technique | Purpose | Tools |
|-----------|---------|-------|
| async/await | Async testing | Jest, Vitest |
| Fake timers | Timer mocking | jest.useFakeTimers, vi.useFakeTimers |
| advanceTimersByTimeAsync | Promise + timers | Jest 29.5+, Vitest |
| msw v2 | HTTP API mocking | Mock Service Worker |
| GraphQL mocking | GraphQL API mocking | msw graphql handlers |
| Fake date/time | Date mocking | jest.setSystemTime, vi.setSystemTime |
| pytest-asyncio | Python async testing | pytest + asyncio |
| AsyncMock | Python mocking | unittest.mock |
| aioresponses | Python HTTP mocking | For aiohttp testing |
| httptest | Go HTTP testing | net/http/httptest |
| testify | Go assertions | github.com/stretchr/testify |
| Playwright | E2E testing | @playwright/test |
| Cypress | E2E testing | cypress |
| fast-check | Property-based testing | fast-check |
| Hypothesis | Python property testing | hypothesis |
| waitFor | Async DOM waiting | @testing-library |
| Stryker | Mutation testing | @stryker-mutator |

### Testing Framework Comparison

| Feature | Jest | Vitest | pytest |
|---------|------|--------|--------|
| Fake timers | jest.useFakeTimers() | vi.useFakeTimers() | freezegun |
| Async timers | advanceTimersByTimeAsync | advanceTimersByTimeAsync | - |
| HTTP mocking | msw, nock | msw, nock | aioresponses, httpx-mock |
| Snapshots | toMatchSnapshot | toMatchSnapshot | syrupy |
| Parallel execution | --maxWorkers | --pool threads | pytest-xdist |
| Coverage | --coverage (istanbul/v8) | --coverage (v8/istanbul) | pytest-cov |
| Watch mode | --watch | --watch (HMR support) | pytest-watch |

### Best Practices for Asynchronous Testing

```
1. Guarantee test independence
   - Each test must not depend on other tests
   - Reset state in beforeEach
   - Properly clean up shared resources

2. Write deterministic tests
   - Mock date/time, random numbers, and UUIDs
   - Mock external APIs with msw, etc.
   - Use fake timers for timers

3. Choose appropriate waiting strategies
   - Avoid fixed sleep() (causes flakiness)
   - Use waitFor / waitUntil for polling waits
   - Prefer event-based waiting

4. Be mindful of test granularity
   - Unit tests: individual async functions
   - Integration tests: multiple component interactions
   - E2E tests: entire user scenarios

5. Ensure stability in CI
   - Configure retry strategies
   - Set appropriate timeouts
   - Collect artifacts on failure
```

---

## Recommended Next Guides

---

## References
1. Jest Documentation. "Timer Mocks." https://jestjs.io/docs/timer-mocks
2. MSW Documentation. "Getting Started." https://mswjs.io/docs/getting-started
3. Playwright Documentation. "Test Assertions." https://playwright.dev/docs/test-assertions
4. pytest-asyncio Documentation. https://pytest-asyncio.readthedocs.io/
5. Cypress Documentation. "Network Requests." https://docs.cypress.io/guides/guides/network-requests
6. fast-check Documentation. "Async Properties." https://fast-check.dev/docs/core-blocks/arbitraries/
7. Testing Library Documentation. "Async Methods." https://testing-library.com/docs/dom-testing-library/api-async
8. Stryker Mutator Documentation. https://stryker-mutator.io/docs/
9. Go Testing Documentation. "httptest." https://pkg.go.dev/net/http/httptest
10. Vitest Documentation. "Mocking." https://vitest.dev/guide/mocking.html



===== SOURCE: 02-programming/async-and-error-handling/docs/04-practical/03-real-world-patterns.md =====

# Real-World Pattern Collection

> A consolidated collection of async + error handling patterns commonly used in real projects. Covers queue processing, WebSocket, file uploads, batch processing, and more.

## What You Will Learn in This Chapter

- [ ] Master practical asynchronous patterns
- [ ] Understand error handling implementation examples
- [ ] Learn production-level code patterns
- [ ] Understand circuit breaker and rate limiting implementations
- [ ] Grasp asynchronous patterns in distributed systems


## Prerequisites

Before reading this guide, having the following knowledge will deepen your understanding:

- Basic programming knowledge
- Understanding of related foundational concepts
- Familiarity with the content in [Testing Async Code](./02-testing-async.md)

---

## 1. Job Queue Processing

```typescript
// Job queue: Reliable asynchronous processing
interface Job<T = unknown> {
  id: string;
  type: string;
  data: T;
  attempts: number;
  maxAttempts: number;
  createdAt: Date;
  scheduledAt?: Date;
  priority?: number;
}

interface JobResult {
  jobId: string;
  status: 'completed' | 'failed' | 'dead-letter';
  duration: number;
  error?: string;
}

class JobProcessor {
  private handlers = new Map<string, (data: any) => Promise<void>>();
  private metrics = {
    processed: 0,
    failed: 0,
    deadLettered: 0,
  };

  register(type: string, handler: (data: any) => Promise<void>): void {
    this.handlers.set(type, handler);
  }

  async process(job: Job): Promise<JobResult> {
    const handler = this.handlers.get(job.type);
    if (!handler) throw new Error(`No handler for job type: ${job.type}`);

    const startTime = Date.now();

    try {
      await handler(job.data);
      this.metrics.processed++;
      await this.markCompleted(job);
      return {
        jobId: job.id,
        status: 'completed',
        duration: Date.now() - startTime,
      };
    } catch (error) {
      job.attempts++;
      if (job.attempts < job.maxAttempts) {
        // Return to retry queue (exponential backoff)
        const delay = Math.pow(2, job.attempts) * 1000;
        await this.scheduleRetry(job, delay);
        this.metrics.failed++;
        return {
          jobId: job.id,
          status: 'failed',
          duration: Date.now() - startTime,
          error: (error as Error).message,
        };
      } else {
        // Max retries exceeded → Move to dead letter queue
        await this.moveToDeadLetter(job, error as Error);
        this.metrics.deadLettered++;
        return {
          jobId: job.id,
          status: 'dead-letter',
          duration: Date.now() - startTime,
          error: (error as Error).message,
        };
      }
    }
  }

  private async markCompleted(job: Job): Promise<void> {
    // DB update: Set job status to completed
    await db.query(
      'UPDATE jobs SET status = $1, completed_at = NOW() WHERE id = $2',
      ['completed', job.id],
    );
  }

  private async scheduleRetry(job: Job, delayMs: number): Promise<void> {
    const scheduledAt = new Date(Date.now() + delayMs);
    await db.query(
      'UPDATE jobs SET status = $1, attempts = $2, scheduled_at = $3 WHERE id = $4',
      ['pending', job.attempts, scheduledAt, job.id],
    );
  }

  private async moveToDeadLetter(job: Job, error: Error): Promise<void> {
    await db.query(
      `INSERT INTO dead_letter_queue (job_id, job_type, data, error, attempts, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())`,
      [job.id, job.type, JSON.stringify(job.data), error.message, job.attempts],
    );
    await db.query('UPDATE jobs SET status = $1 WHERE id = $2', ['dead-letter', job.id]);
  }

  getMetrics() {
    return { ...this.metrics };
  }
}

// Registration and usage
const processor = new JobProcessor();
processor.register('send-email', async (data) => {
  await emailService.send(data.to, data.subject, data.body);
});
processor.register('process-payment', async (data) => {
  await paymentService.charge(data.userId, data.amount);
});
processor.register('generate-report', async (data) => {
  const report = await reportService.generate(data.type, data.params);
  await storageService.upload(`reports/${data.id}.pdf`, report);
});
```

### 1.1 Priority Job Queue

```typescript
// Priority queue implementation
class PriorityJobQueue {
  private queues: Map<number, Job[]> = new Map();
  private processing = false;
  private concurrency: number;
  private activeJobs = 0;

  constructor(concurrency: number = 5) {
    this.concurrency = concurrency;
  }

  enqueue(job: Job): void {
    const priority = job.priority ?? 5; // Default priority 5
    if (!this.queues.has(priority)) {
      this.queues.set(priority, []);
    }
    this.queues.get(priority)!.push(job);
    this.processNext();
  }

  private getNextJob(): Job | undefined {
    // Process in order of priority (lower number = higher priority)
    const sortedPriorities = [...this.queues.keys()].sort((a, b) => a - b);

    for (const priority of sortedPriorities) {
      const queue = this.queues.get(priority)!;
      if (queue.length > 0) {
        return queue.shift();
      }
    }
    return undefined;
  }

  private async processNext(): Promise<void> {
    if (this.activeJobs >= this.concurrency) return;

    const job = this.getNextJob();
    if (!job) return;

    this.activeJobs++;

    try {
      await processor.process(job);
    } finally {
      this.activeJobs--;
      this.processNext(); // Process the next job
    }
  }
}

// Usage example
const queue = new PriorityJobQueue(10);

// High priority: Payment processing
queue.enqueue({
  id: 'pay-001',
  type: 'process-payment',
  data: { userId: 'u123', amount: 5000 },
  attempts: 0,
  maxAttempts: 5,
  createdAt: new Date(),
  priority: 1, // Highest priority
});

// Low priority: Report generation
queue.enqueue({
  id: 'rep-001',
  type: 'generate-report',
  data: { type: 'monthly', params: { month: '2024-01' } },
  attempts: 0,
  maxAttempts: 3,
  createdAt: new Date(),
  priority: 10, // Low priority
});
```

---

## 2. WebSocket Error Handling

```typescript
// WebSocket: Auto-reconnection pattern
interface WebSocketConfig {
  url: string;
  maxReconnectAttempts?: number;
  heartbeatInterval?: number;
  reconnectBaseDelay?: number;
  onMessage: (data: any) => void;
  onStatusChange?: (status: ConnectionStatus) => void;
}

type ConnectionStatus = 'connecting' | 'connected' | 'reconnecting' | 'disconnected' | 'failed';

class ResilientWebSocket {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts: number;
  private heartbeatInterval: number;
  private reconnectBaseDelay: number;
  private heartbeatTimer: NodeJS.Timer | null = null;
  private reconnectTimer: NodeJS.Timer | null = null;
  private messageBuffer: any[] = [];
  private status: ConnectionStatus = 'disconnected';
  private intentionalClose = false;

  constructor(private config: WebSocketConfig) {
    this.maxReconnectAttempts = config.maxReconnectAttempts ?? 10;
    this.heartbeatInterval = config.heartbeatInterval ?? 30000;
    this.reconnectBaseDelay = config.reconnectBaseDelay ?? 1000;
  }

  connect(): void {
    this.intentionalClose = false;
    this.setStatus('connecting');
    this.ws = new WebSocket(this.config.url);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.setStatus('connected');
      this.startHeartbeat();
      this.flushMessageBuffer();
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // Ignore pong messages
        if (data.type === 'pong') return;

        this.config.onMessage(data);
      } catch (error) {
        console.error('Failed to parse message:', error);
      }
    };

    this.ws.onclose = (event) => {
      this.stopHeartbeat();

      if (!this.intentionalClose && !event.wasClean) {
        this.reconnect();
      } else {
        this.setStatus('disconnected');
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  private reconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnect attempts reached');
      this.setStatus('failed');
      return;
    }

    this.setStatus('reconnecting');

    // Exponential backoff + jitter
    const baseDelay = Math.min(
      this.reconnectBaseDelay * Math.pow(2, this.reconnectAttempts),
      30000,
    );
    const jitter = baseDelay * 0.2 * Math.random();
    const delay = baseDelay + jitter;

    this.reconnectAttempts++;
    console.log(`Reconnecting in ${Math.round(delay)}ms (attempt ${this.reconnectAttempts})`);

    this.reconnectTimer = setTimeout(() => this.connect(), delay);
  }

  private startHeartbeat(): void {
    this.heartbeatTimer = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'ping', timestamp: Date.now() }));
      }
    }, this.heartbeatInterval);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  private flushMessageBuffer(): void {
    while (this.messageBuffer.length > 0 && this.ws?.readyState === WebSocket.OPEN) {
      const data = this.messageBuffer.shift();
      this.ws.send(JSON.stringify(data));
    }
  }

  private setStatus(status: ConnectionStatus): void {
    this.status = status;
    this.config.onStatusChange?.(status);
  }

  send(data: any): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      // Buffer messages while connecting
      this.messageBuffer.push(data);
      if (this.messageBuffer.length > 100) {
        this.messageBuffer.shift(); // Prevent buffer overflow
      }
    }
  }

  disconnect(): void {
    this.intentionalClose = true;
    this.stopHeartbeat();
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    this.ws?.close(1000, 'Client disconnect');
    this.setStatus('disconnected');
  }

  getStatus(): ConnectionStatus {
    return this.status;
  }
}

// Usage example
const ws = new ResilientWebSocket({
  url: 'wss://api.example.com/ws',
  maxReconnectAttempts: 20,
  heartbeatInterval: 15000,
  onMessage: (data) => {
    switch (data.type) {
      case 'notification':
        showNotification(data.payload);
        break;
      case 'data-update':
        updateStore(data.payload);
        break;
      default:
        console.log('Unknown message type:', data.type);
    }
  },
  onStatusChange: (status) => {
    updateConnectionIndicator(status);
  },
});

ws.connect();
```

---

## 3. File Upload

```typescript
// Chunked upload: Reliable upload of large files
interface UploadProgress {
  bytesUploaded: number;
  totalBytes: number;
  percentage: number;
  speed: number; // bytes/sec
  estimatedRemaining: number; // seconds
  currentChunk: number;
  totalChunks: number;
}

class ChunkedUploader {
  private chunkSize: number;
  private maxRetries: number;
  private abortController: AbortController | null = null;

  constructor(options: { chunkSize?: number; maxRetries?: number } = {}) {
    this.chunkSize = options.chunkSize ?? 5 * 1024 * 1024; // 5MB
    this.maxRetries = options.maxRetries ?? 3;
  }

  async upload(
    file: File,
    onProgress?: (progress: UploadProgress) => void,
  ): Promise<string> {
    this.abortController = new AbortController();
    const totalChunks = Math.ceil(file.size / this.chunkSize);
    const uploadId = crypto.randomUUID();
    let bytesUploaded = 0;
    const startTime = Date.now();

    // Calculate checksum
    const fileHash = await this.calculateHash(file);

    for (let i = 0; i < totalChunks; i++) {
      const start = i * this.chunkSize;
      const end = Math.min(start + this.chunkSize, file.size);
      const chunk = file.slice(start, end);

      // Upload chunk with retry
      await this.uploadChunkWithRetry(
        chunk, uploadId, i, totalChunks, fileHash,
      );

      bytesUploaded += chunk.size;

      // Progress calculation
      const elapsed = (Date.now() - startTime) / 1000;
      const speed = bytesUploaded / elapsed;
      const remaining = (file.size - bytesUploaded) / speed;

      onProgress?.({
        bytesUploaded,
        totalBytes: file.size,
        percentage: Math.round((bytesUploaded / file.size) * 100),
        speed,
        estimatedRemaining: remaining,
        currentChunk: i + 1,
        totalChunks,
      });
    }

    // Completion notification
    const response = await fetch('/api/upload/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uploadId, totalChunks, fileHash }),
      signal: this.abortController.signal,
    });

    const result = await response.json();
    return result.fileUrl;
  }

  private async uploadChunkWithRetry(
    chunk: Blob,
    uploadId: string,
    chunkIndex: number,
    totalChunks: number,
    fileHash: string,
  ): Promise<void> {
    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('uploadId', uploadId);
        formData.append('chunkIndex', String(chunkIndex));
        formData.append('totalChunks', String(totalChunks));
        formData.append('fileHash', fileHash);

        const response = await fetch('/api/upload/chunk', {
          method: 'POST',
          body: formData,
          signal: this.abortController?.signal,
        });

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
        }

        return; // Success
      } catch (error) {
        if ((error as Error).name === 'AbortError') throw error;
        if (attempt === this.maxRetries) throw error;

        // Wait before retry
        await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 1000));
      }
    }
  }

  private async calculateHash(file: File): Promise<string> {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  cancel(): void {
    this.abortController?.abort();
  }
}

// Resumable upload (interrupt and resume)
class ResumableUploader extends ChunkedUploader {
  private storageKey: string;

  constructor(file: File) {
    super();
    this.storageKey = `upload-progress-${file.name}-${file.size}-${file.lastModified}`;
  }

  async getResumePoint(): Promise<number> {
    const saved = localStorage.getItem(this.storageKey);
    if (!saved) return 0;

    const { uploadId, lastChunk } = JSON.parse(saved);

    // Verify with the server
    try {
      const response = await fetch(`/api/upload/status/${uploadId}`);
      const data = await response.json();
      return data.completedChunks;
    } catch {
      return 0;
    }
  }

  saveProgress(uploadId: string, chunkIndex: number): void {
    localStorage.setItem(this.storageKey, JSON.stringify({
      uploadId,
      lastChunk: chunkIndex,
      timestamp: Date.now(),
    }));
  }

  clearProgress(): void {
    localStorage.removeItem(this.storageKey);
  }
}

// Usage example
const uploader = new ChunkedUploader({ chunkSize: 10 * 1024 * 1024 }); // 10MB chunks

const fileUrl = await uploader.upload(selectedFile, (progress) => {
  progressBar.style.width = `${progress.percentage}%`;
  progressText.textContent = `${progress.percentage}% (${formatSpeed(progress.speed)})`;
  etaText.textContent = `Approximately ${Math.ceil(progress.estimatedRemaining)} seconds remaining`;
});
```

---

## 4. Batch Processing

```typescript
// Batch processing: Incremental processing of large datasets
interface BatchOptions<T> {
  batchSize?: number;
  concurrency?: number;
  onProgress?: (completed: number, total: number) => void;
  onError?: (item: T, error: Error) => void;
  onBatchComplete?: (batchIndex: number, results: any[]) => void;
  signal?: AbortSignal;
  retryFailedItems?: boolean;
  maxRetries?: number;
}

async function processBatch<T, R>(
  items: T[],
  processor: (item: T) => Promise<R>,
  options: BatchOptions<T> = {},
): Promise<{ results: R[]; errors: { item: T; error: Error }[] }> {
  const {
    batchSize = 100,
    concurrency = 5,
    onProgress,
    onError,
    onBatchComplete,
    signal,
    retryFailedItems = false,
    maxRetries = 2,
  } = options;

  const results: R[] = [];
  const errors: { item: T; error: Error }[] = [];
  let completed = 0;
  let batchIndex = 0;

  for (let i = 0; i < items.length; i += batchSize) {
    signal?.throwIfAborted();

    const batch = items.slice(i, i + batchSize);

    // Process within the batch with concurrency limiting
    const batchResults = await promisePool(
      batch.map(item => async () => {
        try {
          const result = await processWithRetry(item, processor, retryFailedItems ? maxRetries : 0);
          return { success: true as const, result };
        } catch (error) {
          const err = error as Error;
          errors.push({ item, error: err });
          onError?.(item, err);
          return { success: false as const, error: err };
        }
      }),
      concurrency,
    );

    const successfulResults = batchResults
      .filter((r): r is { success: true; result: R } => r.success)
      .map(r => r.result);

    results.push(...successfulResults);
    completed += batch.length;
    onProgress?.(completed, items.length);
    onBatchComplete?.(batchIndex++, successfulResults);
  }

  return { results, errors };
}

async function processWithRetry<T, R>(
  item: T,
  processor: (item: T) => Promise<R>,
  maxRetries: number,
): Promise<R> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await processor(item);
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries) {
        await new Promise(r => setTimeout(r, Math.pow(2, attempt) * 500));
      }
    }
  }

  throw lastError!;
}

// Concurrency-limited Promise pool
async function promisePool<T>(
  tasks: Array<() => Promise<T>>,
  concurrency: number,
): Promise<T[]> {
  const results: T[] = [];
  const executing = new Set<Promise<void>>();

  for (const [index, task] of tasks.entries()) {
    const promise = task().then(result => {
      results[index] = result;
    });

    const managed = promise.finally(() => executing.delete(managed));
    executing.add(managed);

    if (executing.size >= concurrency) {
      await Promise.race(executing);
    }
  }

  await Promise.all(executing);
  return results;
}

// Usage example
const { results, errors } = await processBatch(
  users,
  async (user) => {
    await sendNotification(user);
    return { userId: user.id, sent: true };
  },
  {
    batchSize: 50,
    concurrency: 10,
    retryFailedItems: true,
    maxRetries: 3,
    onProgress: (done, total) => console.log(`${done}/${total}`),
    onError: (user, err) => console.error(`Failed for ${user.id}: ${err.message}`),
    onBatchComplete: (idx, results) => console.log(`Batch ${idx}: ${results.length} items`),
  },
);

console.log(`Succeeded: ${results.length}, Failed: ${errors.length}`);
```

---

## 5. Circuit Breaker

```typescript
// Circuit breaker pattern: Prevent cascading failures
type CircuitState = 'closed' | 'open' | 'half-open';

interface CircuitBreakerOptions {
  failureThreshold: number;   // Failure count threshold
  recoveryTimeout: number;    // Wait time from open → half-open (ms)
  monitoringWindow: number;   // Time window for counting failures (ms)
  halfOpenMaxCalls: number;   // Max trial calls during half-open
  onStateChange?: (from: CircuitState, to: CircuitState) => void;
}

class CircuitBreaker {
  private state: CircuitState = 'closed';
  private failures: number[] = []; // Failure timestamps
  private lastOpenTime: number = 0;
  private halfOpenCalls = 0;
  private halfOpenSuccesses = 0;

  constructor(private options: CircuitBreakerOptions) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastOpenTime >= this.options.recoveryTimeout) {
        this.transition('half-open');
      } else {
        throw new CircuitOpenError('Circuit breaker is open');
      }
    }

    if (this.state === 'half-open') {
      if (this.halfOpenCalls >= this.options.halfOpenMaxCalls) {
        throw new CircuitOpenError('Circuit breaker half-open limit reached');
      }
      this.halfOpenCalls++;
    }

    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    if (this.state === 'half-open') {
      this.halfOpenSuccesses++;
      if (this.halfOpenSuccesses >= this.options.halfOpenMaxCalls) {
        this.transition('closed');
      }
    }
    // In closed state, failure counter is not reset (managed by window)
  }

  private onFailure(): void {
    const now = Date.now();

    if (this.state === 'half-open') {
      this.transition('open');
      return;
    }

    // Count failures within the time window
    this.failures.push(now);
    this.failures = this.failures.filter(
      t => now - t < this.options.monitoringWindow,
    );

    if (this.failures.length >= this.options.failureThreshold) {
      this.transition('open');
    }
  }

  private transition(newState: CircuitState): void {
    const oldState = this.state;
    this.state = newState;

    if (newState === 'open') {
      this.lastOpenTime = Date.now();
    }

    if (newState === 'closed') {
      this.failures = [];
      this.halfOpenCalls = 0;
      this.halfOpenSuccesses = 0;
    }

    if (newState === 'half-open') {
      this.halfOpenCalls = 0;
      this.halfOpenSuccesses = 0;
    }

    this.options.onStateChange?.(oldState, newState);
    console.log(`Circuit breaker: ${oldState} → ${newState}`);
  }

  getState(): CircuitState {
    return this.state;
  }
}

class CircuitOpenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CircuitOpenError';
  }
}

// Usage example
const breaker = new CircuitBreaker({
  failureThreshold: 5,       // Open after 5 failures
  recoveryTimeout: 30000,    // Half-open after 30 seconds
  monitoringWindow: 60000,   // 60-second window
  halfOpenMaxCalls: 3,       // 3 trial calls during half-open
  onStateChange: (from, to) => {
    if (to === 'open') {
      alertOps(`External service circuit opened (from ${from})`);
    }
  },
});

// Protect API calls with a circuit breaker
async function callExternalApi(endpoint: string): Promise<any> {
  try {
    return await breaker.execute(async () => {
      const response = await fetch(`https://external-api.com${endpoint}`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    });
  } catch (error) {
    if (error instanceof CircuitOpenError) {
      // Fallback: Return from cache
      return getCachedData(endpoint);
    }
    throw error;
  }
}
```

---

## 6. Rate Limiting

```typescript
// Token bucket rate limiter
class RateLimiter {
  private tokens: number;
  private maxTokens: number;
  private refillRate: number; // tokens/sec
  private lastRefill: number;
  private waitQueue: Array<{
    resolve: () => void;
    reject: (err: Error) => void;
  }> = [];

  constructor(options: {
    maxTokens: number;
    refillRate: number;
  }) {
    this.maxTokens = options.maxTokens;
    this.tokens = options.maxTokens;
    this.refillRate = options.refillRate;
    this.lastRefill = Date.now();
  }

  private refill(): void {
    const now = Date.now();
    const elapsed = (now - this.lastRefill) / 1000;
    this.tokens = Math.min(this.maxTokens, this.tokens + elapsed * this.refillRate);
    this.lastRefill = now;
  }

  async acquire(count: number = 1): Promise<void> {
    this.refill();

    if (this.tokens >= count) {
      this.tokens -= count;
      return;
    }

    // Insufficient tokens: wait
    return new Promise((resolve, reject) => {
      this.waitQueue.push({ resolve, reject });

      // Calculate time until needed tokens are replenished
      const waitMs = ((count - this.tokens) / this.refillRate) * 1000;

      setTimeout(() => {
        const index = this.waitQueue.findIndex(w => w.resolve === resolve);
        if (index !== -1) {
          this.waitQueue.splice(index, 1);
          this.refill();
          if (this.tokens >= count) {
            this.tokens -= count;
            resolve();
          } else {
            reject(new Error('Rate limit exceeded'));
          }
        }
      }, waitMs);
    });
  }

  // Use as a decorator
  wrap<T>(fn: () => Promise<T>): () => Promise<T> {
    return async () => {
      await this.acquire();
      return fn();
    };
  }
}

// Sliding window rate limiter
class SlidingWindowRateLimiter {
  private timestamps: number[] = [];
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  canProceed(): boolean {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(t => now - t < this.windowMs);
    return this.timestamps.length < this.maxRequests;
  }

  record(): void {
    this.timestamps.push(Date.now());
  }

  async waitAndProceed(): Promise<void> {
    while (!this.canProceed()) {
      const oldestInWindow = this.timestamps[0];
      const waitMs = this.windowMs - (Date.now() - oldestInWindow) + 1;
      await new Promise(r => setTimeout(r, waitMs));
    }
    this.record();
  }

  getRemaining(): number {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(t => now - t < this.windowMs);
    return Math.max(0, this.maxRequests - this.timestamps.length);
  }
}

// Usage example
const limiter = new RateLimiter({
  maxTokens: 100,    // Maximum 100 tokens
  refillRate: 10,     // 10 tokens replenished per second
});

// Apply rate limiting to an API client
class ApiClient {
  private limiter = new SlidingWindowRateLimiter(100, 60000); // 100 requests per 60 seconds

  async request<T>(endpoint: string): Promise<T> {
    await this.limiter.waitAndProceed();

    const response = await fetch(`https://api.example.com${endpoint}`);
    if (response.status === 429) {
      const retryAfter = parseInt(response.headers.get('Retry-After') || '5');
      await new Promise(r => setTimeout(r, retryAfter * 1000));
      return this.request(endpoint); // Retry
    }

    return response.json();
  }
}
```

---

## 7. Graceful Shutdown

```typescript
// Server graceful shutdown
import http from 'http';
import net from 'net';

class GracefulServer {
  private server: http.Server;
  private connections = new Set<net.Socket>();
  private isShuttingDown = false;
  private shutdownPromise: Promise<void> | null = null;

  constructor(private app: any) {
    this.server = http.createServer(app);
  }

  start(port: number): Promise<void> {
    return new Promise((resolve) => {
      this.server.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        resolve();
      });

      // Track connections
      this.server.on('connection', (conn) => {
        this.connections.add(conn);
        conn.on('close', () => this.connections.delete(conn));
      });

      // Signal handling
      const shutdownHandler = (signal: string) => {
        console.log(`${signal} received`);
        this.shutdown().then(() => process.exit(0));
      };

      process.on('SIGTERM', () => shutdownHandler('SIGTERM'));
      process.on('SIGINT', () => shutdownHandler('SIGINT'));

      // Unhandled rejection / exception
      process.on('unhandledRejection', (reason) => {
        console.error('Unhandled Rejection:', reason);
        this.shutdown().then(() => process.exit(1));
      });
    });
  }

  async shutdown(): Promise<void> {
    if (this.shutdownPromise) return this.shutdownPromise;

    this.isShuttingDown = true;
    console.log('Graceful shutdown started...');

    this.shutdownPromise = this.performShutdown();
    return this.shutdownPromise;
  }

  private async performShutdown(): Promise<void> {
    // 1. Stop accepting new connections
    this.server.close();

    // 2. Set Connection: close header on Keep-Alive connections
    this.connections.forEach(conn => {
      (conn as any)._httpMessage?.setHeader?.('Connection', 'close');
    });

    // 3. Wait for in-progress requests to complete (max 30 seconds)
    const forceTimeout = setTimeout(() => {
      console.log('Forcing shutdown: destroying remaining connections');
      this.connections.forEach(conn => conn.destroy());
    }, 30000);

    // 4. Resource cleanup
    try {
      await Promise.allSettled([
        this.closeDatabase(),
        this.closeCache(),
        this.closeMessageQueue(),
        this.flushLogs(),
      ]);
      console.log('Resources cleaned up successfully');
    } catch (error) {
      console.error('Error during cleanup:', error);
    }

    clearTimeout(forceTimeout);
    console.log('Shutdown complete');
  }

  private async closeDatabase(): Promise<void> {
    console.log('Closing database connections...');
    await db.end();
  }

  private async closeCache(): Promise<void> {
    console.log('Closing cache connections...');
    await redis.quit();
  }

  private async closeMessageQueue(): Promise<void> {
    console.log('Closing message queue...');
    await queue.close();
  }

  private async flushLogs(): Promise<void> {
    console.log('Flushing logs...');
    await logger.flush();
  }

  // For health checks
  isHealthy(): boolean {
    return !this.isShuttingDown;
  }
}

// Usage example
const server = new GracefulServer(app);
await server.start(3000);

// Health check endpoint
app.get('/health', (req, res) => {
  if (server.isHealthy()) {
    res.status(200).json({ status: 'healthy', uptime: process.uptime() });
  } else {
    res.status(503).json({ status: 'shutting-down' });
  }
});
```

---

## 8. Distributed Locking

```typescript
// Distributed lock using Redis (simplified Redlock algorithm)
class DistributedLock {
  constructor(
    private redis: Redis,
    private lockKey: string,
    private ttlMs: number = 10000,
  ) {}

  async acquire(waitMs: number = 5000): Promise<string | null> {
    const lockId = crypto.randomUUID();
    const startTime = Date.now();

    while (Date.now() - startTime < waitMs) {
      // SET NX (set only if not exists)
      const acquired = await this.redis.set(
        `lock:${this.lockKey}`,
        lockId,
        'PX', this.ttlMs,
        'NX',
      );

      if (acquired === 'OK') {
        return lockId; // Lock acquired successfully
      }

      // Wait briefly and retry
      await new Promise(r => setTimeout(r, 50 + Math.random() * 50));
    }

    return null; // Timeout
  }

  async release(lockId: string): Promise<boolean> {
    // Release atomically with Lua script (only release own lock)
    const script = `
      if redis.call("get", KEYS[1]) == ARGV[1] then
        return redis.call("del", KEYS[1])
      else
        return 0
      end
    `;

    const result = await this.redis.eval(script, 1, `lock:${this.lockKey}`, lockId);
    return result === 1;
  }

  // Execute a function with the lock held
  async withLock<T>(fn: () => Promise<T>, waitMs?: number): Promise<T> {
    const lockId = await this.acquire(waitMs);
    if (!lockId) {
      throw new Error(`Failed to acquire lock: ${this.lockKey}`);
    }

    try {
      return await fn();
    } finally {
      await this.release(lockId);
    }
  }
}

// Usage example: Exclusive processing
const lock = new DistributedLock(redis, 'user:123:payment');

try {
  const result = await lock.withLock(async () => {
    const balance = await getBalance('user-123');
    if (balance < amount) throw new Error('Insufficient balance');
    await deductBalance('user-123', amount);
    await createPayment('user-123', amount);
    return { success: true };
  });
} catch (error) {
  if (error.message.includes('Failed to acquire lock')) {
    // Another process is handling it
    res.status(409).json({ error: 'Payment already in progress' });
  }
}
```

---

## 9. Event-Driven Pattern

```typescript
// Type-safe event bus
interface EventMap {
  'user:created': { userId: string; email: string };
  'user:updated': { userId: string; changes: Partial<User> };
  'order:placed': { orderId: string; userId: string; amount: number };
  'order:completed': { orderId: string };
  'payment:succeeded': { paymentId: string; orderId: string };
  'payment:failed': { paymentId: string; orderId: string; reason: string };
}

class TypedEventEmitter<TEvents extends Record<string, any>> {
  private handlers = new Map<string, Set<(data: any) => void | Promise<void>>>();

  on<K extends keyof TEvents>(
    event: K,
    handler: (data: TEvents[K]) => void | Promise<void>,
  ): () => void {
    const key = event as string;
    if (!this.handlers.has(key)) {
      this.handlers.set(key, new Set());
    }
    this.handlers.get(key)!.add(handler);

    // Return an unsubscribe function
    return () => {
      this.handlers.get(key)?.delete(handler);
    };
  }

  async emit<K extends keyof TEvents>(event: K, data: TEvents[K]): Promise<void> {
    const key = event as string;
    const handlers = this.handlers.get(key);
    if (!handlers) return;

    // Execute all handlers in parallel (catch errors individually)
    const results = await Promise.allSettled(
      [...handlers].map(handler => handler(data)),
    );

    // Log errors
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Event handler error for ${key}:`, result.reason);
      }
    });
  }
}

// Usage example
const eventBus = new TypedEventEmitter<EventMap>();

// Register handlers
eventBus.on('order:placed', async ({ orderId, userId, amount }) => {
  await paymentService.processPayment(orderId, userId, amount);
});

eventBus.on('order:placed', async ({ orderId, userId }) => {
  await notificationService.sendOrderConfirmation(userId, orderId);
});

eventBus.on('payment:succeeded', async ({ orderId }) => {
  await orderService.markAsPaid(orderId);
  await eventBus.emit('order:completed', { orderId });
});

eventBus.on('payment:failed', async ({ orderId, reason }) => {
  await orderService.markAsFailed(orderId, reason);
  await notificationService.sendPaymentFailure(orderId, reason);
});

// Emit event
await eventBus.emit('order:placed', {
  orderId: 'ord-123',
  userId: 'usr-456',
  amount: 5000,
});
```

---

## 10. Data Stream Processing

```typescript
// Pipeline processing using Node.js Transform Streams
import { Transform, pipeline } from 'stream';
import { promisify } from 'util';
import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';

const pipelineAsync = promisify(pipeline);

// Transform that processes CSV line by line
class CsvLineProcessor extends Transform {
  private buffer = '';
  private headers: string[] = [];
  private lineCount = 0;

  constructor(
    private processor: (row: Record<string, string>) => Record<string, string> | null,
  ) {
    super({ objectMode: true });
  }

  _transform(chunk: Buffer, encoding: string, callback: Function): void {
    this.buffer += chunk.toString();
    const lines = this.buffer.split('\n');
    this.buffer = lines.pop()!; // Keep the last incomplete line in the buffer

    for (const line of lines) {
      if (line.trim() === '') continue;

      if (this.lineCount === 0) {
        this.headers = line.split(',').map(h => h.trim());
      } else {
        const values = line.split(',');
        const row: Record<string, string> = {};
        this.headers.forEach((h, i) => { row[h] = values[i]?.trim() ?? ''; });

        try {
          const result = this.processor(row);
          if (result) {
            this.push(JSON.stringify(result) + '\n');
          }
        } catch (error) {
          console.error(`Error processing row ${this.lineCount}:`, error);
          // Skip error rows and continue
        }
      }

      this.lineCount++;
    }

    callback();
  }

  _flush(callback: Function): void {
    if (this.buffer.trim()) {
      // Process the last line
      const values = this.buffer.split(',');
      const row: Record<string, string> = {};
      this.headers.forEach((h, i) => { row[h] = values[i]?.trim() ?? ''; });

      try {
        const result = this.processor(row);
        if (result) {
          this.push(JSON.stringify(result) + '\n');
        }
      } catch (error) {
        console.error('Error processing last row:', error);
      }
    }
    callback();
  }
}

// Usage example: Transform a large CSV file
async function transformLargeCsv(inputPath: string, outputPath: string): Promise<void> {
  await pipelineAsync(
    createReadStream(inputPath),
    new CsvLineProcessor((row) => {
      // Transformation logic
      if (row.status === 'inactive') return null; // Filtering
      return {
        ...row,
        name: row.name.toUpperCase(),
        processedAt: new Date().toISOString(),
      };
    }),
    createGzip(), // Compression
    createWriteStream(outputPath + '.gz'),
  );

  console.log(`Transformed and compressed: ${inputPath} → ${outputPath}.gz`);
}
```


---

## Hands-On Exercises

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

Extend the basic implementation to add the following features.

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

    print(f"Inefficient version: {slow_time:.4f}s")
    print(f"Efficient version:   {fast_time:.6f}s")
    print(f"Speedup: {slow_time/fast_time:.0f}x")

benchmark()
```

**Key points:**
- Be mindful of algorithmic time complexity
- Choose appropriate data structures
- Measure effectiveness with benchmarks
---

## Summary

| Pattern | Use Case | Key Points |
|---------|----------|------------|
| Job queue | Reliable async processing | Retry + dead letter + priority |
| WebSocket | Real-time communication | Auto-reconnect + heartbeat + buffer |
| Chunked upload | Large files | Retry + progress display + resume |
| Batch processing | Large datasets | Concurrency limit + error isolation + progress |
| Circuit breaker | Prevent cascading failures | 3-state transitions + fallback |
| Rate limiting | API protection | Token bucket + sliding window |
| Graceful shutdown | Server shutdown | Wait for in-progress requests + resource cleanup |
| Distributed lock | Mutual exclusion | Redis + TTL + Lua script |
| Event-driven | Loosely coupled coordination | Type safety + error isolation |
| Stream processing | Large data transformation | Pipeline + backpressure |

---

## FAQ

### Q1: How should circuit breaker thresholds be determined?

The failure rate threshold (e.g., 50%) and window size (e.g., last 10 requests) depend on the characteristics of the service. Generally, for high-frequency API calls, set a small window (10-20 requests) and a lower threshold (30-50%) to transition to Open quickly. For low-frequency calls, use a larger window (50-100 requests) to avoid opening on temporary spikes. The number of trial calls during Half-Open is typically 1-3, transitioning back to Closed on success. Refer to the default settings of libraries like Hystrix (Netflix) or Polly (.NET) as a starting point.

### Q2: Should the Redlock algorithm be used for distributed locking?

With a single Redis instance, all locks are lost if that instance goes down. The Redlock algorithm acquires locks across multiple Redis instances (typically 5) and considers the lock valid only when a majority of instances grant it. However, there are critiques from Martin Kleppmann ("How to do distributed locking"), and for scenarios requiring strict lock semantics, lease functionality in ZooKeeper or etcd is considered safer. For critical operations like payments, combining idempotency keys with locks to prevent duplicate processing is recommended.

### Q3: Is there value in implementing rate limiting on the client side?

Server-side rate limiting is fundamental for API protection, but client-side implementation also provides value. Proactively controlling request frequency is more efficient and reduces network load compared to waiting for 429 responses and then retrying. Especially in batch processing scenarios with many API calls, client-side rate limiting maintains stable throughput. An adaptive approach that dynamically adjusts rates using `Retry-After` and `X-RateLimit-Remaining` headers is also effective.

---


## Recommended Next Guides

- Refer to other guides in the same category

---

## References
1. Kleppmann, M. "Designing Data-Intensive Applications." O'Reilly, 2017.
2. Nygard, M. "Release It!" Pragmatic Bookshelf, 2018.
3. Node.js Documentation. "Stream." nodejs.org.
4. Martin Fowler. "Circuit Breaker." martinfowler.com.
5. Redis Documentation. "Distributed Locks." redis.io.

