# mquickjs vs. Node.js Benchmark Notes

## Node.js Benchmarks

### Startup Time

- **Command:** `time node javascript_runtimes/hello.js`
- **Result:** `real 0m0.042s`

### SSR Simulation Performance

- **Execution Time:** `time node javascript_runtimes/ssr_simulation.js`
  - **Result:** `real 0m0.040s`

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

- **Execution Time:** `time javascript_runtimes/mquickjs/mqjs javascript_runtimes/ssr_simulation.js`
  - **Result:** `real 0m0.013s`

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
