# Distill: A Reliability Layer for LLM Context

Distill is an open-source tool designed to improve the reliability of Large Language Model (LLM) outputs by cleaning up the input context before it reaches the model. It focuses on removing semantic redundancy and ensuring context diversity through deterministic algorithms rather than expensive and non-deterministic LLM calls.

## Core Mission

The primary motivation behind Distill is the "Garbage In, Garbage Out" problem in LLM applications, especially RAG (Retrieval-Augmented Generation) pipelines.
- **The Problem**: 30-40% of retrieved context is often semantically redundant, coming from multiple sources (docs, code, memory, tools).
- **The Impact**: Redundant data leads to non-deterministic outputs, confused reasoning, and higher token costs.
- **The Solution**: Pre-process context using deterministic math to deduplicate and diversify it.

## Technical Pipeline

Distill implements a multi-step pipeline for context refinement:

1.  **Over-fetch**: Retrieve more chunks (e.g., 50) than the target context size (e.g., 8). This provides enough candidates for effective deduplication.
2.  **Cluster**: Group semantically similar chunks together.
    -   In `pkg/contextlab`, **Agglomerative Clustering** is used for RAG pipelines.
    -   In `pkg/dedup`, **K-Means Clustering** is used for general vector deduplication.
3.  **Select**: Pick the best representative from each cluster. Strategies include picking by score (relevance), centroid (centrality), or length.
4.  **MMR Re-rank**: Apply **Maximal Marginal Relevance (MMR)** to balance relevance and diversity among the representatives.
    -   Formula: `MMR = λ * score(chunk) - (1-λ) * max(similarity(chunk, selected))`

## Implementation Principles

### Deterministic & Fast
Distill avoids LLM calls for its core logic, making it fully deterministic and significantly faster (~12ms latency compared to ~500ms for LLM-based compression).

### Performance Optimizations
The mathematical operations, such as Cosine Distance, are implemented with performance in mind. For example, in `pkg/math/simd.go`, loops are manually unrolled to process 4 elements at a time, facilitating better CPU pipelining:

```go
for ; i <= n-4; i += 4 {
    dot += float64(a[i])*float64(b[i]) +
           float64(a[i+1])*float64(b[i+1]) +
           float64(a[i+2])*float64(b[i+2]) +
           float64(a[i+3])*float64(b[i+3])
    // ... magA and magB calculations ...
}
```

### Flexible Integration
-   **API Mode**: Standalone server for deduplicating chunks via HTTP.
-   **Service Mode**: Integrates directly with vector databases like Pinecone and Qdrant.
-   **MCP Mode**: Model Context Protocol support for AI assistants like Claude or Cursor.

## Summary of Benefits
-   **Lower Costs**: Reduced token usage by removing duplicates.
-   **Faster Responses**: Less context for the LLM to process.
-   **Improved Reliability**: Consistent context leads to more deterministic and accurate LLM outputs.
