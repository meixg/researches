# Research Notes: LLM Prompt Caching (February 2026)

## Overview
Prompt caching (or context caching) has become a standard feature for major LLM providers to reduce costs and latency. There are two primary schools of thought:
1. **Automatic/Implicit Caching**: The provider automatically detects repeated prefixes and applies discounts.
2. **Explicit Caching**: The developer must specify which parts of the prompt to cache (often using markers or separate API calls).

## Provider Specifics

### OpenAI
- **Mode**: Automatic.
- **Requirement**: Prompt length > 1024 tokens.
- **Pricing**: 50% discount on input tokens for cache hits.
- **TTL**: Approximately 1 hour, but varies by load (cleared during peak times).
- **Observation**: Zero configuration needed.

### Anthropic (Claude)
- **Mode**: Explicit (`cache_control: {"type": "ephemeral"}`).
- **Pricing**: ~1.25x (25% premium) for cache write, ~0.1x (90% discount) for cache read.
- **Minimum**: 1024 tokens (Sonnet/Opus), 2048-4096 (Haiku).
- **TTL**: Default 5 minutes (refreshes on hit). 1-hour TTL available at higher cost.
- **Limit**: Max 4 breakpoints per request.

### DeepSeek
- **Mode**: Automatic.
- **Pricing**: Extremely aggressive discounts (up to 98% off).
- **Minimum**: Very low (64-token prefix matching).
- **Observation**: No write premium, makes it very effective for short-turn conversations and agents.

### Google Gemini
- **Mode**: Both Implicit (Gemini 2.5+) and Explicit.
- **Implicit**: Automatic 75% discount.
- **Explicit**: Requires creating a `cachedContent` resource. Billed via storage fee ($/M tokens/hr).
- **Minimum**: 1024 (Flash), 2048 (Pro).

### Kimi (Moonshot AI)
- **Mode**: Historically Explicit (upload context -> get ID). Newer models (K2.6/2.7) support more automatic flows.
- **Pricing**: ~80% discount on hits.
- **Observation**: High performance in long-context (128K-1M).

### Qwen (Alibaba DashScope)
- **Mode**: Both Implicit and Explicit.
- **Explicit**: 125% write cost, 10% read cost. 5 min TTL. Min 1024 tokens.
- **Implicit**: 100% write cost, 20% read cost. Indeterminate TTL. Min 256 tokens.

### GLM (Zhipu AI)
- **Mode**: Automatic.
- **Pricing**: Significant discounts (~80%).
- **Observation**: Fully compatible with OpenAI's `cached_tokens` reporting.

### Mistral
- **Mode**: Semi-explicit using `prompt_cache_key`.
- **Pricing**: 10% of standard input price for hits.

### MiniMax
- **Mode**: Both Automatic and Explicit (Anthropic compatible).
- **Pricing**: ~1.25x write, ~0.2x read ($0.06/1M for M3).
- **Minimum**: 512 tokens.

### Doubao (ByteDance)
- **Mode**: Implicit.
- **Pricing**: ~0.2x read.
- **Storage**: Billed per hour ($0.003/1M tokens/hour), similar to Gemini.

## Key Learnings
- **Prefix Matching**: All providers rely on exact prefix matching. Changing a single character (even a whitespace) in the middle of a cached block invalidates everything after it.
- **Billing Transparency**: Most providers now include a `cached_tokens` or `cache_read_input_tokens` field in the `usage` object of the API response.
- **Optimization Strategy**: Always put static content (System Prompts, Tools, Documents) at the beginning. Dynamic content (Current User Query, Timestamp) must go at the very end.
