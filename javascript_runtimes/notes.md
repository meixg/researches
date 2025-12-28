# mquickjs vs. Node.js Benchmark Notes

## Node.js Benchmarks

### Startup Time

- **Command:** `time node javascript_runtimes/hello.js`
- **Result:** `real 0m0.037s`

### React SSR Performance

- **Cold Start:** `time curl -s http://localhost:3001 > /dev/null`
  - **Result:** `real 0m0.014s`
- **Frequent Running (ab -n 100 -c 10):**
  - **Requests per second:** 905.21

### Memory Usage

- **Simple Script (`hello.js`):**
  - **Command:** `/usr/bin/time -v node javascript_runtimes/hello.js`
  - **Maximum resident set size:** 44636 KB
- **Large File Script (`load_large_file.dat`):**
  - **Command:** `/usr/bin/time -v node javascript_runtimes/load_large_file.js`
  - **Maximum resident set size:** 56796 KB
- **Idle SSR Server:**
  - **Command:** `ps -o rss,vsz -p $(pgrep -f "node server/index.js")`
  - **RSS:** 125948 KB

## mquickjs Benchmarks

### Startup Time

- **Command:** `time javascript_runtimes/mquickjs/mqjs javascript_runtimes/hello.js`
- **Result:** `real 0m0.002s`

### Performance (Fractal Calculation)

- **Node.js:** `time node javascript_runtimes/fractal.js`
  - **Result:** `real 0m0.044s`
- **mquickjs:** `time javascript_runtimes/mquickjs/mqjs javascript_runtimes/fractal.js`
  - **Result:** `real 0m0.119s`

### Memory Usage

- **Simple Script (`hello.js`):**
  - **Command:** `javascript_runtimes/mquickjs/mqjs -d javascript_runtimes/hello.js`
    - **Heap size:** 6776 bytes
  - **Command:** `/usr/bin/time -v javascript_runtimes/mquickjs/mqjs javascript_runtimes/hello.js`
    - **Maximum resident set size:** 1664 KB
- **Large File Script (`large_file.dat`):**
  - **Command:** `javascript_runtimes/mquickjs/mqjs -d -I javascript_runtimes/large_file.dat`
    - **Heap size:** 6320 bytes
  - **Command:** `/usr/bin/time -v javascript_runtimes/mquickjs/mqjs -I javascript_runtimes/large_file.dat`
    - **Maximum resident set size:** 11776 KB
