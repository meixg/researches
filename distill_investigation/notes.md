# Analysis Observations for Distill

## Test Dataset
The following vectors were used for testing (4 dimensions):
- `vec1`: `[1.0, 0.0, 0.0, 0.0]` (Apple is a fruit)
- `vec2`: `[1.0, 0.1, 0.0, 0.0]` (Apples are fruits) - dist to `vec1` ≈ 0.005
- `vec3`: `[1.0, 0.2, 0.0, 0.0]` (The apple is a type of fruit) - dist to `vec1` ≈ 0.019
- `vec4`: `[0.0, 1.0, 0.0, 0.0]` (London is a city)
- `vec5`: `[0.0, 1.1, 0.0, 0.0]` (London is the capital of UK) - dist to `vec4` = 0.0
- `vec6`: `[0.0, 0.0, 1.0, 0.0]` (Go is a programming language)

## Observations

### 1. Effect of Threshold
- **Threshold 0.01**: Identified 1 duplicate.
  - Likely `vec2` (relative to `vec1`) or `vec5` (relative to `vec4`), depending on which cluster/medoid was chosen.
- **Threshold 0.05**: Identified 2 duplicates.
  - At this threshold, both `vec2` and `vec3` are considered duplicates of `vec1`.

### 2. Importance of K (Clusters)
By default, for a small dataset of 6 vectors, Distill uses only **1 cluster** (`sqrt(6/2) ≈ 1`).
- When using only 1 cluster, deduplication is performed against a single representative (the medoid of the entire dataset). This might miss duplicates in other "areas" of the vector space if they are far from the global medoid.
- When forcing **K=3**, the engine can group the vectors more accurately into their semantic groups (Fruits, Cities, Programming), allowing for more precise within-cluster deduplication.

### 3. Performance
The processing time was consistently **0ms** for this small dataset, confirming the efficiency of the Go-based implementation and the SIMD-style optimizations.

## Conclusion
Distill provides a robust and fast way to reduce context redundancy. For best results:
1.  The **threshold** should be tuned based on the embedding model used (different models have different distance distributions).
2.  **K** should be sufficiently large to capture the diversity of the context, or allowed to scale with the number of input vectors.
