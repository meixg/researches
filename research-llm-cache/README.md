# LLM Prompt Caching: Industry Comparison & Technical Analysis

## Executive Summary

Prompt caching (or Context Caching) has transitioned from a niche performance optimization to a core economic driver for Large Language Model (LLM) applications. All major providers (OpenAI, Anthropic, Google, DeepSeek, Alibaba, etc.) have implemented caching mechanisms to reduce input token costs by **50% to 90%+** and significantly lower latency.

This report analyzes implementation strategies and technical requirements across the frontier model landscape.

---

## 1. Comparative Analysis Matrix

| Provider | Mechanism | Primary Pricing (Read) | Min. Threshold | Implementation |
| :--- | :--- | :--- | :--- | :--- |
| **OpenAI** | Automatic | 50% Discount | 1,024 tokens | Zero-config prefix matching |
| **Anthropic** | Explicit | 90% Discount | 1,024 - 4,096 | `cache_control` markers |
| **Google Gemini**| Explicit | 75% - 90% Discount | 1,024 - 4,096 | `CachedContent` resource |
| **DeepSeek** | Automatic | ~90% Discount | 64 tokens | Zero-config (V2.5/V3) |
| **Kimi (Moonshot)**| Explicit | ~80% Discount | 1,024 tokens | `context_cache` ID |
| **Qwen (Alibaba)** | Both | 80% - 90% Discount | 256 - 1,024 | Automatic or `cache_control` |

---

## 2. Technical Implementation Details

For detailed code snippets and JSON structures, see the [Implementation Guide](implementation_guide.md).

### 2.1 Prefix Matching (The Golden Rule)
All providers rely on **exact prefix matching**. To leverage caching in an Agent loop:
1. **System Prompt**: Keep it identical and at the top.
2. **Tools**: List function definitions in a fixed order.
3. **History**: Only append new turns; never re-order or re-format earlier messages.
4. **Dynamic Data**: Place timestamps, search results, or user-specific context at the very end of the message array.

### 2.2 Explicit Control vs Automatic
- **Automatic (OpenAI, DeepSeek)**: No code changes needed. The system hashes the prefix and looks for matches.
- **Explicit (Anthropic, Gemini, Kimi)**: Requires marking blocks or creating a dedicated resource. This is more robust for contexts that might otherwise be evicted.

---

## 3. Best Practices for Agent Developers

1. **Avoid "Now" in System Prompts**: Including `Current Time: {{time}}` at the start of a large system prompt will break the cache for every single request.
2. **Token Alignment**: Ensure your stable prefix is larger than the provider's minimum (e.g., 1,024 tokens) to trigger the discount.
3. **Consistent Byte Sequence**: Even a single extra whitespace or different indentation in your JSON representation can cause a cache miss.

---

## 4. Conclusion

LLM Caching has bifurcated into two developer experiences: **Automatic** (OpenAI/DeepSeek) which favors ease of use, and **Explicit** (Anthropic/Gemini) which favors fine-grained optimization. For production-grade applications, prompt caching is the primary lever for maintaining competitive unit economics.
