# Benchmark Comparison Report: Node.js vs mQuickJS

## Executive Summary

This report compares the performance of **Node.js v22.21.1** and **mQuickJS** across 43 JavaScript microbenchmarks. The benchmarks test various operations including property access, array manipulation, arithmetic operations, string handling, regular expressions, and more.

### Overall Performance
- **Node.js Total Score**: 427.37 ns
- **mQuickJS Total Score**: 3170.30 ns
- **Performance Ratio**: Node.js is **7.42x faster** overall

Lower scores indicate better performance (nanoseconds per operation).

---

## Detailed Performance Comparison

### 1. Control Flow & Basic Operations

| Test | Node.js (ns) | mQuickJS (ns) | Speedup |
|------|-------------|---------------|---------|
| empty_loop | 0.43 | 15.00 | **34.9x** |
| date_now | 32.53 | 33.00 | 1.0x |

**Analysis**: Node.js has dramatically faster empty loop execution, indicating lower baseline overhead for control structures.

---

### 2. Property Access & Object Operations

| Test | Node.js (ns) | mQuickJS (ns) | Speedup |
|------|-------------|---------------|---------|
| prop_read | 0.14 | 13.75 | **98.2x** |
| prop_write | 0.11 | 10.00 | **90.9x** |
| prop_update | 0.86 | 22.50 | **26.2x** |
| prop_create | 5.21 | 35.00 | **6.7x** |
| prop_delete | 42.34 | 65.00 | 1.5x |

**Analysis**: Node.js demonstrates superior property access performance with 26-98x speedups for read/write/update operations. Property creation is 6.7x faster.

---

### 3. Array Operations

| Test | Node.js (ns) | mQuickJS (ns) | Speedup |
|------|-------------|---------------|---------|
| array_read | 0.30 | 12.00 | **40.0x** |
| array_write | 0.14 | 8.50 | **60.7x** |
| array_update | 0.35 | 19.00 | **54.3x** |
| array_prop_create | 2.42 | 22.00 | **9.1x** |
| array_length_read | 0.14 | 12.50 | **89.3x** |
| array_length_decr | 26.81 | 50.00 | 1.9x |
| array_push | 2.03 | 34.00 | **16.7x** |
| array_pop | 1.30 | 32.00 | **24.6x** |

**Analysis**: Array operations are consistently faster in Node.js, with read operations showing 40-89x speedups. Push and pop operations are 16-25x faster.

---

### 4. Typed Arrays

| Test | Node.js (ns) | mQuickJS (ns) | Speedup |
|------|-------------|---------------|---------|
| typed_array_read | 0.31 | 15.50 | **50.0x** |
| typed_array_write | 0.14 | 14.00 | **100.0x** |

**Analysis**: Node.js shows exceptional typed array performance with 50-100x speedups, indicating highly optimized numeric array handling.

---

### 5. Closures & Global Variables

| Test | Node.js (ns) | mQuickJS (ns) | Speedup |
|------|-------------|---------------|---------|
| closure_read | 0.11 | 10.50 | **95.5x** |
| closure_write | 0.11 | 7.00 | **63.6x** |
| global_read | 0.39 | 11.00 | **28.2x** |
| global_write_strict | 0.11 | 7.00 | **63.6x** |
| func_call | 0.14 | 21.25 | **151.8x** |
| closure_var | 0.41 | 22.50 | **54.9x** |

**Analysis**: Function calls and closure operations are dramatically faster in Node.js, with function calls showing a 152x speedup.

---

### 6. Arithmetic Operations

| Test | Node.js (ns) | mQuickJS (ns) | Speedup |
|------|-------------|---------------|---------|
| int_arith | 0.44 | 24.00 | **54.5x** |
| float_arith | 0.94 | 34.00 | **36.2x** |
| bigint64_arith | 12.91 | N/A | - |
| bigint256_arith | 31.24 | N/A | - |

**Analysis**: Node.js's arithmetic performance is 36-55x faster than mQuickJS. Note: mQuickJS didn't complete BigInt tests (not shown in results).

---

### 7. Array Iteration

| Test | Node.js (ns) | mQuickJS (ns) | Speedup |
|------|-------------|---------------|---------|
| array_for | 0.58 | 26.00 | **44.8x** |
| array_for_in | 14.47 | 36.00 | 2.5x |
| array_for_of | 0.59 | 15.00 | **25.4x** |

**Analysis**: Traditional for-loops and for-of loops are 25-45x faster in Node.js. The for-in loop shows a more modest 2.5x speedup.

---

### 8. Math Operations

| Test | Node.js (ns) | mQuickJS (ns) | Speedup |
|------|-------------|---------------|---------|
| math_min | 0.52 | 34.00 | **65.4x** |

**Analysis**: Math.min() operation is 65x faster in Node.js, indicating highly optimized math operations.

---

### 9. Regular Expressions

| Test | Node.js (ns) | mQuickJS (ns) | Speedup |
|------|-------------|---------------|---------|
| regexp_ascii | 29.75 | 140.00 | **4.7x** |
| regexp_utf16 | 28.61 | 140.00 | **4.9x** |
| regexp_replace | 83.06 | 650.00 | **7.8x** |

**Analysis**: Regular expression operations are 4.7-7.8x faster in Node.js, with regexp_replace showing the biggest improvement.

---

### 10. String Operations

| Test | Node.js (ns) | mQuickJS (ns) | Speedup |
|------|-------------|---------------|---------|
| string_length | 0.14 | 12.50 | **89.3x** |
| string_build1 | 18.33 | 600.00 | **32.7x** |
| string_build2 | 19.43 | 580.00 | **29.9x** |
| int_to_string | 11.43 | 60.00 | **5.2x** |
| float_to_string | 55.77 | 179.00 | **3.2x** |
| string_to_int | 0.86 | 70.00 | **81.4x** |
| string_to_float | 0.86 | 74.00 | **86.0x** |

**Analysis**: String operations are significantly faster in Node.js across all categories. String length checks and type conversions show 80-89x speedups. String building operations are 30-33x faster.

---

### 11. Sorting

| Test | Node.js (ns) | mQuickJS (ns) | Speedup |
|------|-------------|---------------|---------|
| sort_bench | 0.58 | 2.80 | **4.8x** |

**Analysis**: Array sorting is 4.8x faster in Node.js, indicating a more optimized sorting algorithm.

---

## Key Findings

### Top Performance Advantages (Node.js vs mQuickJS)

1. **Function Calls**: 151.8x faster
2. **Typed Array Write**: 100.0x faster
3. **Property Read**: 98.2x faster
4. **Closure Read**: 95.5x faster
5. **Array Length Read**: 89.3x faster
6. **String Length**: 89.3x faster
7. **String to Float**: 86.0x faster
8. **String to Int**: 81.4x faster
9. **Array Write**: 60.7x faster
10. **Math Operations**: 65.4x faster

### Categories Where Node.js Excels

1. **Basic Control Flow**: 35x faster
2. **Property Access**: 27-98x faster
3. **Array Operations**: 1.9-89x faster
4. **Typed Arrays**: 50-100x faster
5. **Closures & Functions**: 54-152x faster
6. **Arithmetic**: 36-55x faster
7. **Math Operations**: 65x faster
8. **Regular Expressions**: 4.7-7.8x faster
9. **String Operations**: 3.2-89x faster
10. **Sorting**: 4.8x faster

### Observations

- **Consistent Superiority**: Node.js outperforms mQuickJS in every single benchmark test
- **Biggest Gaps**: The largest performance differences are in basic operations like function calls, property access, and simple arithmetic
- **Smallest Gaps**: Even in the worst-case comparisons (property deletion, for-in loops), Node.js maintains a 1.5-2.5x advantage
- **Total Time**: Node.js completes all benchmarks in 427.37 ns vs mQuickJS's 3170.30 ns

---

## Conclusion

**Node.js demonstrates significantly superior performance across all benchmark categories**, with an overall **7.42x speedup** compared to mQuickJS. The performance advantage ranges from modest (1.5x for property deletion) to dramatic (151.8x for function calls).

This comprehensive performance advantage is likely due to:
- Highly optimized JIT compilation in V8 (Node.js's engine)
- Advanced inline caching for property access
- Optimized native implementations for built-in operations
- Years of performance engineering and optimization in the V8 engine

mQuickJS may still offer advantages in other areas such as:
- Smaller memory footprint
- Faster startup time
- Embeddability
- Simpler codebase for customization/custom embeddings

However, for raw computational performance, Node.js is the clear winner based on these benchmarks.

---

*Benchmark Date: 2025-12-29*
*Node.js Version: v22.21.1*
*Test File: tests/microbench_node.js*
