# mquickjs vs. Node.js vs. QuickJS Benchmark Notes

## Node.js Benchmarks

### Startup Time

- **Command:** `time node javascript_runtimes/hello.js`
- **Result:** `real 0m0.158s`

### SSR Simulation Performance

- **Execution Time:** `node javascript_runtimes/ssr_simulation.js`
  - **Result:** `SSR simulation took 0.41514399999999796 milliseconds.`

### JIT Benchmark

- **Command:** `node javascript_runtimes/jit_benchmark.js`
- **Results:**
  - Iteration 0: 217ms
  - Iteration 1: 67ms
  - Iteration 2: 11ms
  - Iteration 3: 3ms
  - Iteration 4: 3ms
  - Iteration 5: 3ms
  - Iteration 6: 3ms
  - Iteration 7: 2ms
  - Iteration 8: 2ms
  - Iteration 9: 3ms

### Microbenchmark

- **Command:** `node javascript_runtimes/microbenchmark/microbench_node.js`
- **Result:** See `javascript_runtimes/microbenchmark/result_node.md`

### Memory Usage

- **Simple Script (`hello.js`):**
  - **Command:** `./measure_memory.sh node javascript_runtimes/hello.js`
  - **Maximum resident set size:** 46184 KB
- **SSR Simulation Script (`ssr_simulation.js`):**
  - **Command:** `./measure_memory.sh node javascript_runtimes/ssr_simulation.js`
  - **Maximum resident set size:** 46700 KB
- **Large File Script (1MB):**
  - **Command:** `node javascript_runtimes/generate_large_script.js && ./measure_memory.sh node javascript_runtimes/load_large_script.js && rm javascript_runtimes/large_script.js`
  - **Maximum resident set size:** 48052 KB

## mquickjs Benchmarks

### Startup Time

- **Command:** `time javascript_runtimes/mquickjs/mqjs javascript_runtimes/hello.js`
- **Result:** `real 0m0.002s`

### SSR Simulation Performance

- **Execution Time:** `javascript_runtimes/mquickjs/mqjs javascript_runtimes/ssr_simulation.js`
  - **Result:** `SSR simulation took 9 milliseconds.`

### JIT Benchmark

- **Command:** `javascript_runtimes/mquickjs/mqjs javascript_runtimes/jit_benchmark.js`
- **Results:**
  - Iteration 0: 79ms
  - Iteration 1: 80ms
  - Iteration 2: 82ms
  - Iteration 3: 78ms
  - Iteration 4: 81ms
  - Iteration 5: 78ms
  - Iteration 6: 79ms
  - Iteration 7: 79ms
  - Iteration 8: 77ms
  - Iteration 9: 80ms

### Microbenchmark

- **Command:** `javascript_runtimes/mquickjs/mqjs javascript_runtimes/microbenchmark/microbench.js`
- **Result:** See `javascript_runtimes/microbenchmark/result_mquick.md`

### Memory Usage

- **Simple Script (`hello.js`):**
  - **Command:** `./measure_memory.sh javascript_runtimes/mquickjs/mqjs javascript_runtimes/hello.js`
  - **Maximum resident set size:** 1664 KB
- **SSR Simulation Script (`ssr_simulation.js`):**
  - **Command:** `./measure_memory.sh javascript_runtimes/mquickjs/mqjs javascript_runtimes/ssr_simulation.js`
  - **Maximum resident set size:** 10880 KB
- **Large File Script (1MB):**
  - **Command:** `node javascript_runtimes/generate_large_script.js && ./measure_memory.sh javascript_runtimes/mquickjs/mqjs -I javascript_runtimes/large_script.js javascript_runtimes/load_large_script_no_require.js && rm javascript_runtimes/large_script.js`
  - **Maximum resident set size:** 5452 KB

## QuickJS Benchmarks

### Startup Time

- **Command:** `time javascript_runtimes/quickjs/qjs javascript_runtimes/hello.js`
- **Result:** `real 0m0.003s`

### SSR Simulation Performance

- **Execution Time:** `javascript_runtimes/quickjs/qjs javascript_runtimes/ssr_simulation.js`
  - **Result:** `SSR simulation took 0.46550299995578825 milliseconds.`

### JIT Benchmark

- **Command:** `javascript_runtimes/quickjs/qjs javascript_runtimes/jit_benchmark.js`
- **Results:**
  - Iteration 0: 64ms
  - Iteration 1: 64ms
  - Iteration 2: 64ms
  - Iteration 3: 66ms
  - Iteration 4: 65ms
  - Iteration 5: 66ms
  - Iteration 6: 69ms
  - Iteration 7: 77ms
  - Iteration 8: 66ms
  - Iteration 9: 64ms

### Microbenchmark

- **Command:** `javascript_runtimes/quickjs/qjs javascript_runtimes/microbenchmark/microbench.js`
- **Result:** See `javascript_runtimes/microbenchmark/result_quickjs.md`

### Memory Usage

- **Simple Script (`hello.js`):**
  - **Command:** `./measure_memory.sh javascript_runtimes/quickjs/qjs javascript_runtimes/hello.js`
  - **Maximum resident set size:** 2688 KB
- **SSR Simulation Script (`ssr_simulation.js`):**
  - **Command:** `./measure_memory.sh javascript_runtimes/quickjs/qjs javascript_runtimes/ssr_simulation.js`
  - **Maximum resident set size:** 2816 KB
- **Large File Script (1MB):**
  - **Command:** `node javascript_runtimes/generate_large_script.js && ./measure_memory.sh javascript_runtimes/quickjs/qjs -I javascript_runtimes/large_script.js javascript_runtimes/load_large_script_infinite_loop.js && rm javascript_runtimes/large_script.js`
  - **Maximum resident set size:** 3960 KB
