# Performance Comparison: Wasm vs JS for Data Processing in Node.js

This project explores the performance implications of migrating data processing tasks (JS object manipulation) from pure TypeScript/JavaScript to WebAssembly (via AssemblyScript) in a Node.js environment.

## Overview

We benchmarked three types of tasks:
1.  **Task 1 (Simple):** Filtering and aggregating an array of objects.
2.  **Task 2 (Complex):** Deeply nested object transformation and mapping.
3.  **Task 3 (Compute-heavy):** Pure mathematical computation (finding the n-th prime number) without object overhead.

For the data processing tasks (1 & 2), the Wasm implementation uses `json-as` for JSON serialization/deserialization to communicate with the Node.js host.

## Key Findings

### 1. JSON Serialization is the Bottleneck
For any task involving JS objects, the overhead of `JSON.stringify` (host) -> `JSON.parse` (Wasm) -> `JSON.stringify` (Wasm) -> `JSON.parse` (host) completely dwarfs the execution time of the actual logic.

*   **Result:** JS was **50x - 500x faster** than Wasm for object processing tasks.

### 2. Pure Computation Gains
In Task 3, where no complex data structures are passed between the host and Wasm (only integers), Wasm consistently outperformed JS.

*   **Result:** Wasm was **1.2x - 1.5x faster** than JS for pure computation.

### 3. V8 Optimization
Node.js (V8) is extremely well-optimized for JS object manipulation, property access, and array operations. Replacing these with Wasm requires a different approach than simple JSON serialization (e.g., using shared memory buffers/FlatBuffers) to even be competitive.

## Benchmark Data (ops/sec)

| Task | Data Size | JS (Native) | Wasm (+ JSON Overhead) |
| :--- | :--- | :--- | :--- |
| Simple Filter/Sum | 1,000 items | ~83,000 | ~340 |
| Complex Transform | 1,000 items | ~5,000 | ~100 |
| N-th Prime (Compute) | n=10,000 | ~46 | ~71 |

## Conclusion

**Do not migrate data processing tasks to Wasm if you intend to use JSON for data exchange.** The serialization overhead will negate any performance gains from Wasm's execution speed.

Wasm is suitable for:
-   Compute-heavy tasks with minimal data transfer.
-   Tasks that can operate on large chunks of raw memory (TypedArrays) shared between JS and Wasm.
-   Porting existing C++/Rust/AssemblyScript logic that doesn't rely on JS object structures.

## How to Run

1.  `npm install`
2.  `npm run asbuild`
3.  `node bench/benchmark.js`
