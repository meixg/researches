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

#### React SSR

The React SSR benchmark was only performed on Node.js due to mquickjs's lack of the necessary APIs and environment for such a complex task.

| Metric              | Node.js |
| :------------------ | :------ |
| Cold Start          | 14ms    |
| Requests per Second | 905.21  |

#### Fractal Calculation

| Runtime  | Execution Time |
| :------- | :------------- |
| Node.js  | 44ms           |
| mquickjs | 119ms          |

### Memory Usage (Maximum Resident Set Size)

| Scenario             | Node.js     | mquickjs    |
| :------------------- | :---------- | :---------- |
| Simple Script        | 44,636 KB   | 1,664 KB    |
| Loading 10MB File    | 56,796 KB   | 11,776 KB   |
| Idle SSR Server (RSS)| 125,948 KB  | N/A         |

## Analysis

### Startup Time

mquickjs demonstrates a significantly faster startup time than Node.js, making it well-suited for scenarios where a script needs to be executed quickly and then exit, such as in serverless functions or command-line tools.

### Performance

Node.js, with its highly optimized V8 engine, outperforms mquickjs in raw computational performance, as seen in the fractal calculation benchmark. The React SSR benchmark further highlights Node.js's strengths in handling complex, real-world applications.

### Memory Usage

mquickjs's memory usage is a fraction of Node.js's, which is a key advantage in memory-constrained environments like embedded systems or IoT devices.

## Conclusion

Node.js and mquickjs are designed for different purposes, and their benchmark results reflect this.

- **Node.js** is the ideal choice for building complex, high-performance applications that require a rich set of APIs and a mature ecosystem.
- **mquickjs** excels in scenarios where resource usage is a critical concern, offering a lightweight and fast-starting runtime for smaller, more specialized tasks.

The choice between the two will ultimately depend on the specific requirements of the project at hand.

## Reproducing the Benchmarks

To reproduce the benchmarks, you can use the scripts and applications in this repository.

### React SSR Benchmark

1.  Navigate to the React application directory:
    ```bash
    cd javascript_runtimes/react-ssr-app
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Create a production build:
    ```bash
    npm run build
    ```
4.  Run the SSR server:
    ```bash
    node server/index.js
    ```
