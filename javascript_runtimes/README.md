# Node.js vs. mquickjs vs. QuickJS: A Comparative Analysis

This report details a comparative analysis of the Node.js, mquickjs, and QuickJS JavaScript runtimes, focusing on startup time, performance, JIT effects, and memory usage.

## Introduction

- **Node.js:** A widely-used, feature-rich runtime built on the V8 engine, designed for building scalable network applications.
- **mquickjs:** A lightweight, embeddable JavaScript engine designed for resource-constrained environments, with a focus on low memory usage and fast startup.
- **QuickJS:** A small, embeddable Javascript engine which supports the ES2020 specification. It is the foundation from which mquickjs was derived.

## Setup

1.  **Node.js:** Install the latest LTS version of Node.js using [nvm](https://github.com/nvm-sh/nvm).
2.  **mquickjs & QuickJS:** The `mquickjs` and `quickjs` directories are included as git submodules. To clone them, run:
    ```bash
    git submodule update --init --recursive
    ```
3.  **Compile Runtimes:**
    - **mquickjs:**
      ```bash
      (cd javascript_runtimes/mquickjs && make)
      ```
    - **QuickJS:**
      ```bash
      (cd javascript_runtimes/quickjs && make)
      ```

## How to Run

The benchmarks can be run from the root of the repository using the following commands.

### Startup Time

- **Node.js:** `time node javascript_runtimes/hello.js`
- **mquickjs:** `time javascript_runtimes/mquickjs/mqjs javascript_runtimes/hello.js`
- **QuickJS:** `time javascript_runtimes/quickjs/qjs javascript_runtimes/hello.js`

### SSR Simulation

- **Node.js:** `node javascript_runtimes/ssr_simulation.js`
- **mquickjs:** `javascript_runtimes/mquickjs/mqjs javascript_runtimes/ssr_simulation.js`
- **QuickJS:** `javascript_runtimes/quickjs/qjs javascript_runtimes/ssr_simulation.js`

### JIT Benchmark

- **Node.js:** `node javascript_runtimes/jit_benchmark.js`
- **mquickjs:** `javascript_runtimes/mquickjs/mqjs javascript_runtimes/jit_benchmark.js`
- **QuickJS:** `javascript_runtimes/quickjs/qjs javascript_runtimes/jit_benchmark.js`

### Memory Usage

- **Node.js:**
  - ` /usr/bin/time -v node javascript_runtimes/hello.js`
  - ` /usr/bin/time -v node javascript_runtimes/ssr_simulation.js`
  - `node javascript_runtimes/generate_large_script.js && /usr/bin/time -v node javascript_runtimes/load_large_script.js && rm javascript_runtimes/large_script.js`
- **mquickjs:**
  - ` /usr/bin/time -v javascript_runtimes/mquickjs/mqjs javascript_runtimes/hello.js`
  - ` /usr/bin/time -v javascript_runtimes/mquickjs/mqjs javascript_runtimes/ssr_simulation.js`
  - `node javascript_runtimes/generate_large_script.js && /usr/bin/time -v javascript_runtimes/mquickjs/mqjs -I javascript_runtimes/large_script.js && rm javascript_runtimes/large_script.js`
- **QuickJS:**
  - ` /usr/bin/time -v javascript_runtimes/quickjs/qjs javascript_runtimes/hello.js`
  - ` /usr/bin/time -v javascript_runtimes/quickjs/qjs javascript_runtimes/ssr_simulation.js`

## Benchmark Results

### Startup Time

| Runtime  | "Hello, World!" |
| :------- | :-------------- |
| Node.js  | 42ms            |
| mquickjs | 2ms             |
| QuickJS  | 3ms             |

### Performance

#### SSR Simulation

| Runtime  | Execution Time |
| :------- | :------------- |
| Node.js  | 40ms           |
| mquickjs | 13ms           |
| QuickJS  | 5ms            |

### JIT Effect Investigation

The JIT (Just-In-Time) compilation effect was investigated by running a computationally intensive fractal calculation in a loop for 10 iterations.

#### Node.js

| Iteration | Execution Time |
| :-------- | :------------- |
| 0         | 5ms            |
| 1-9 (avg) | ~3ms           |

#### mquickjs & QuickJS

| Iteration | mquickjs | QuickJS |
| :-------- | :------- | :------ |
| 0         | 75ms     | 68ms    |
| 1-9 (avg) | ~73ms    | ~69ms   |

### Memory Usage (Maximum Resident Set Size)

| Scenario             | Node.js     | mquickjs    | QuickJS   |
| :------------------- | :---------- | :---------- | :-------- |
| Simple Script        | 44,544 KB   | 1,664 KB    | 2,688 KB  |
| SSR Simulation       | 46,812 KB   | 10,752 KB   | 2,816 KB  |
| Loading 1MB File     | 48,884 KB   | 6,144 KB    | N/A       |

*Note: The large file memory benchmark for QuickJS was omitted due to a technical issue with the `qjs` runtime that caused it to hang when loading large files.*

## Analysis

### Startup Time

mquickjs and QuickJS are both significantly faster to start than Node.js. This makes them well-suited for scenarios where a script needs to be executed quickly and then exit, such as in serverless functions or command-line tools.

### Performance

In the SSR simulation, QuickJS is the fastest, followed by mquickjs, and then Node.js. This is likely due to the nature of the test, which is a simple loop of string concatenations. The more complex runtimes may introduce overhead that the simpler engines avoid.

### JIT Effect

The JIT benchmark highlights a key difference between the runtimes. Node.js shows a clear JIT effect, with the first iteration being significantly slower than subsequent iterations. This is because the V8 engine's JIT compiler optimizes the code as it runs. In contrast, mquickjs and QuickJS do not have JIT compilers, so their performance is consistent across all iterations.

### Memory Usage

mquickjs and QuickJS both have a much smaller memory footprint than Node.js. This is their key advantage and makes them ideal for memory-constrained environments like embedded systems or IoT devices.

## Conclusion

Node.js, mquickjs, and QuickJS are all capable runtimes, but they are designed for different purposes.

- **Node.js** is the ideal choice for building complex, high-performance applications that require a rich set of APIs and a mature ecosystem. Its JIT compiler provides significant performance benefits for long-running processes.
- **mquickjs** is the most resource-conscious of the three, making it the best choice for the most constrained environments.
- **QuickJS** offers a good balance between the two. It is more feature-complete than mquickjs and faster in some cases, while still being much more lightweight than Node.js.

The choice between the three will ultimately depend on the specific requirements of the project at hand.
