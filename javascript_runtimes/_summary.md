A head-to-head comparison of JavaScript runtimes—[Node.js](https://nodejs.org/), [mquickjs](https://github.com/ftlabs/mquickjs), and [QuickJS](https://bellard.org/quickjs/)—reveals sharp differences in startup speed, execution performance, JIT support, and memory usage. Lightweight engines like mquickjs and QuickJS start significantly faster and consume far less memory than Node.js, making them ideal for embedded or serverless scenarios. Node.js, powered by the V8 engine and featuring JIT compilation, drastically improves performance on repeated code execution, while both QuickJS and mquickjs provide consistent (though usually slower) results due to the absence of JIT. Each runtime presents clear trade-offs, making them viable for different deployment targets and application requirements.

**Key findings:**
- mquickjs and QuickJS start in 2-3ms and use <3MB RAM, versus Node.js’s 158ms startup and ~46MB RAM usage.
- Node.js’s JIT compiler yields faster execution after initial runs; QuickJS and mquickjs do not optimize repeated executions.
- Node.js excels for complex, long-running apps; mquickjs/QuickJS suit constrained, short-lived, or embedded uses.
