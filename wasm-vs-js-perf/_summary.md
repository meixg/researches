Evaluating WebAssembly (Wasm) for data processing in Node.js revealed that tasks involving JS objects—such as filtering, aggregating, or transforming arrays—are far slower when implemented in AssemblyScript and passed through JSON serialization, with JS outperforming Wasm by orders of magnitude (50x–500x). In contrast, Wasm demonstrated performance advantages (up to 1.5x faster) for pure computation tasks where only primitive values are exchanged, avoiding the serialization bottleneck. The results emphasize that Node.js's V8 engine is highly optimized for object manipulation, and Wasm integration is only beneficial if data transfer overhead is minimized, for example, using shared memory approaches like TypedArrays or FlatBuffers. Tools used include [AssemblyScript](https://www.assemblyscript.org/) and [json-as](https://github.com/nearprotocol/json-as).

**Key findings:**
- JSON serialization overhead makes Wasm impractical for object-heavy JS tasks.
- Wasm offers mild speedups for computation-heavy routines with minimal data transfer.
- To leverage Wasm in Node.js, prefer raw memory buffers over JSON for exchanging complex data.
