# Research Notes: Wasm vs JS Performance in Node.js for Data Processing

## Hypothesis
- Wasm is expected to be significantly faster for computation-heavy tasks.
- However, since we are dealing with JS objects in Node.js, we need to consider the overhead of:
    1. Serializing the JS object to a format Wasm can understand (e.g., JSON string or shared memory buffer).
    2. Deserializing the result back into a JS object.
- For simple data transformations (like shallow filtering or aggregation), the serialization overhead might outweigh the performance gains from Wasm.
- For complex, deeply nested, or computationally intensive tasks, Wasm should provide a net benefit.

## Benchmark Results (Ops/sec)

| Task | Size | JS | Wasm (+JSON) | Wasm (no input JS stringify) | Wasm (pure compute) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Task 1 (Simple) | 100 | 1,294,971 | 2,335 | 4,757 | - |
| Task 1 (Simple) | 1000 | 83,214 | 344 | 430 | - |
| Task 1 (Simple) | 10000 | 5,680 | 29 | 37 | - |
| Task 2 (Complex) | 100 | 60,076 | 1,087 | 1,196 | - |
| Task 2 (Complex) | 1000 | 5,059 | 102 | 113 | - |
| Task 2 (Complex) | 10000 | 483 | 9 | 8.8 | - |
| Task 3 (Compute) | 100 | 65,678 | - | - | 81,646 |
| Task 3 (Compute) | 1000 | 1,721 | - | - | 2,184 |
| Task 3 (Compute) | 10000 | 46 | - | - | 71 |

## Analysis
1. **JSON Overhead is massive**: For data processing tasks (Task 1 & 2), Wasm is significantly slower than JS. This is primarily because `JSON.parse` and `JSON.stringify` within Wasm (using `json-as`) and the bridge between JS/Wasm are very expensive compared to native JS object manipulation.
2. **Pure Computation**: Task 3 (finding the n-th prime) shows that Wasm is faster than JS for pure computation (about 1.2x to 1.5x faster).
3. **Data Size**: As data size increases, the gap between JS and Wasm + JSON remains large, or even widens, because both JS and Wasm scale linearly with data size, but the constant factor of JSON overhead is much higher in Wasm.

## Conclusion
Migrating data processing (JS object manipulation) to Wasm via JSON serialization in Node.js is NOT recommended for performance gains. JS engines (V8) are highly optimized for object manipulation. Wasm should only be considered for pure computational tasks where data transfer is minimal.
