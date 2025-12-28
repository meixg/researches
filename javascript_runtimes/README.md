# mquickjs vs. Node.js: A Comparative Analysis

This report details a comparative analysis of the mquickjs and Node.js JavaScript runtimes, focusing on startup time, performance, and memory usage.

## Introduction

- **Node.js:** A widely-used, feature-rich runtime built on the V8 engine, designed for building scalable network applications.
- **mquickjs:** A lightweight, embeddable JavaScript engine designed for resource-constrained environments, with a focus on low memory usage and fast startup.

## Benchmark Results

### Startup Time

| Runtime  | "Hello, World!" |
| :------- | :-------------- |
| Node.js  | 37ms            |
| mquickjs | 2ms             |

### Performance

#### SSR Simulation

| Runtime  | Execution Time |
| :------- | :------------- |
| Node.js  | 388ms          |
| mquickjs | 30ms           |

#### Fractal Calculation

| Runtime  | Execution Time |
| :------- | :------------- |
| Node.js  | 44ms           |
| mquickjs | 119ms          |

### Memory Usage (Maximum Resident Set Size)

| Scenario             | Node.js     | mquickjs    |
| :------------------- | :---------- | :---------- |
| Simple Script        | 44,636 KB   | 1,664 KB    |
| SSR Simulation       | 46,820 KB   | 10,752 KB   |
| Loading 10MB File    | 56,796 KB   | 11,776 KB   |

## Analysis

### Startup Time

mquickjs demonstrates a significantly faster startup time than Node.js, making it well-suited for scenarios where a script needs to be executed quickly and then exit, such as in serverless functions or command-line tools.

### Performance

In the SSR simulation, mquickjs is surprisingly faster than Node.js. This is likely due to the nature of the test, which is a simple loop of string concatenations. Node.js's JIT compiler and more complex event loop may introduce overhead in this scenario that mquickjs, with its simpler design, avoids.

However, in the more computationally intensive fractal calculation, Node.js's highly optimized V8 engine shows its strength, outperforming mquickjs.

### Memory Usage

mquickjs's memory usage is consistently a fraction of Node.js's across all tests, which is a key advantage in memory-constrained environments like embedded systems or IoT devices.

## Conclusion

Node.js and mquickjs are designed for different purposes, and their benchmark results reflect this.

- **Node.js** is the ideal choice for building complex, high-performance applications that require a rich set of APIs and a mature ecosystem.
- **mquickjs** excels in scenarios where resource usage is a critical concern, offering a lightweight and fast-starting runtime for smaller, more specialized tasks. Its performance in the SSR simulation also suggests it could be a good choice for string-heavy workloads.

The choice between the two will ultimately depend on the specific requirements of the project at hand.

## Reproducing the Benchmarks

To reproduce the benchmarks, you can use the scripts in this repository.

### SSR Simulation Benchmark

- **Node.js:**
  ```bash
  time node javascript_runtimes/ssr_simulation.js
  /usr/bin/time -v node javascript_runtimes/ssr_simulation.js
  ```
- **mquickjs:**
  ```bash
  time javascript_runtimes/mquickjs/mqjs -I javascript_runtimes/dummy_component.js javascript_runtimes/ssr_simulation.js
  /usr/bin/time -v javascript_runtimes/mquickjs/mqjs -I javascript_runtimes/dummy_component.js javascript_runtimes/ssr_simulation.js
  ```
