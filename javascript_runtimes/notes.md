# mquickjs vs. Node.js vs. QuickJS Benchmark Notes

## Node.js Benchmarks

### Startup Time

- **Command:** `time node javascript_runtimes/hello.js`
- **Result:** `real 0m0.042s`

### SSR Simulation Performance

- **Execution Time:** `node javascript_runtimes/ssr_simulation.js`
  - **Result:** `SSR simulation took 1.2345 milliseconds.` (example)

### JIT Benchmark

- **Command:** `node javascript_runtimes/jit_benchmark.js`
- **Results:**
  - Iteration 0: 5ms
  - Iteration 1: 3ms
  - Iteration 2: 3ms
  - Iteration 3: 3ms
  - Iteration 4: 2ms
  - Iteration 5: 2ms
  - Iteration 6: 3ms
  - Iteration 7: 3ms
  - Iteration 8: 3ms
  - Iteration 9: 3ms

### Memory Usage

- **Simple Script (`hello.js`):**
  - **Command:** `/usr/bin/time -v node javascript_runtimes/hello.js`
  - **Maximum resident set size:** 44544 KB
- **SSR Simulation Script (`ssr_simulation.js`):**
  - **Command:** `/usr/bin/time -v node javascript_runtimes/ssr_simulation.js`
  - **Maximum resident set size:** 46812 KB
- **Large File Script (1MB):**
  - **Command:** `/usr/bin/time -v node javascript_runtimes/load_large_script.js`
  - **Maximum resident set size:** 48884 KB

## mquickjs Benchmarks

### Startup Time

- **Command:** `time javascript_runtimes/mquickjs/mqjs javascript_runtimes/hello.js`
- **Result:** `real 0m0.002s`

### SSR Simulation Performance

- **Execution Time:** `javascript_runtimes/mquickjs/mqjs javascript_runtimes/ssr_simulation.js`
  - **Result:** `SSR simulation took 1.2345 milliseconds.` (example)

### JIT Benchmark

- **Command:** `javascript_runtimes/mquickjs/mqjs javascript_runtimes/jit_benchmark.js`
- **Results:**
  - Iteration 0: 75ms
  - Iteration 1: 73ms
  - Iteration 2: 72ms
  - Iteration 3: 73ms
  - Iteration 4: 72ms
  - Iteration 5: 73ms
  - Iteration 6: 73ms
  - Iteration 7: 73ms
  - Iteration 8: 72ms
  - Iteration 9: 73ms

### Memory Usage

- **Simple Script (`hello.js`):**
  - **Command:** `/usr/bin/time -v javascript_runtimes/mquickjs/mqjs javascript_runtimes/hello.js`
  - **Maximum resident set size:** 1664 KB
- **SSR Simulation Script (`ssr_simulation.js`):**
  - **Command:** `/usr/bin/time -v javascript_runtimes/mquickjs/mqjs javascript_runtimes/ssr_simulation.js`
  - **Maximum resident set size:** 10752 KB
- **Large File Script (1MB):**
  - **Command:** `/usr/bin/time -v javascript_runtimes/mquickjs/mqjs -I javascript_runtimes/large_script.js`
  - **Maximum resident set size:** 6144 KB

## QuickJS Benchmarks

### Startup Time

- **Command:** `time javascript_runtimes/quickjs/qjs javascript_runtimes/hello.js`
- **Result:** `real 0m0.003s`

### SSR Simulation Performance

- **Execution Time:** `javascript_runtimes/quickjs/qjs javascript_runtimes/ssr_simulation.js`
  - **Result:** `SSR simulation took 1.2345 milliseconds.` (example)

### JIT Benchmark

- **Command:** `javascript_runtimes/quickjs/qjs javascript_runtimes/jit_benchmark.js`
- **Results:**
  - Iteration 0: 68ms
  - Iteration 1: 66ms
  - Iteration 2: 67ms
  - Iteration 3: 68ms
  - Iteration 4: 71ms
  - Iteration 5: 68ms
  - Iteration 6: 71ms
  - Iteration 7: 73ms
  - Iteration 8: 69ms
  - Iteration 9: 73ms

### Memory Usage

- **Simple Script (`hello.js`):**
  - **Command:** `/usr/bin/time -v javascript_runtimes/quickjs/qjs javascript_runtimes/hello.js`
  - **Maximum resident set size:** 2688 KB
- **SSR Simulation Script (`ssr_simulation.js`):**
  - **Command:** `/usr/bin/time -v javascript_runtimes/quickjs/qjs javascript_runtimes/ssr_simulation.js`
  - **Maximum resident set size:** 2816 KB
