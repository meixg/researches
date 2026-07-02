# Research Notes: LLM Prompt Caching

## Overview
Prompt caching (or context caching) has become a standard feature for major LLM providers to reduce costs and latency. There are two primary schools of thought:
1. **Automatic/Implicit Caching**: The provider automatically detects repeated prefixes and applies discounts (e.g., OpenAI, DeepSeek).
2. **Explicit Caching**: The developer must specify which parts of the prompt to cache, often using markers (Anthropic) or separate API calls to create a cache resource (Gemini, Kimi).

## Provider Specifics

### OpenAI
- **Mode**: Automatic.
- **Requirement**: Prompt length > 1024 tokens.
- **Pricing**: 50% discount on input tokens for cache hits.
- **TTL**: Best-effort (usually 1 hour, but varies by load).
- **Observation**: Zero configuration needed. Exact byte-for-byte prefix match required.

### Anthropic (Claude)
- **Mode**: Explicit (`cache_control: {"type": "ephemeral"}`).
- **Pricing**: ~1.25x premium for cache write, ~0.1x (90% discount) for cache read.
- **Minimum**: 1024 - 4096 tokens depending on model.
- **TTL**: Default 5 minutes (refreshes on hit).
- **Limit**: Max 4 breakpoints per request.

### DeepSeek (V2.5/V3)
- **Mode**: Automatic.
- **Pricing**: Aggressive discounts (up to 90%+ off).
- **Minimum**: Very low (64-token prefix matching).
- **Observation**: Extremely efficient for multi-turn conversations.

### Google Gemini (1.5 Pro/Flash)
- **Mode**: Explicit.
- **Implementation**: Requires creating a `CachedContent` resource via the API.
- **Minimum**: 1024 (Flash), 4096 (Pro).
- **TTL**: Default 1 hour.

### Kimi (Moonshot AI)
- **Mode**: Explicit.
- **Implementation**: Context Caching API (upload content -> get `id`).
- **Pricing**: Significant discount on cached hits.

### Qwen (Alibaba DashScope)
- **Mode**: Both Implicit and Explicit (Anthropic compatible).

## Key Learnings for Agent Development
- **Stable Prefix**: The absolute golden rule. Any change at the start of the prompt busts the entire cache.
- **Message Order**: `System Prompt` -> `Tool Definitions` -> `Stable Context/Docs` -> `History` -> `Dynamic Question`.
- **Dynamic Content**: Timestamps, unique user identifiers, or the "Current Time" must be placed at the very end.
- **Token Alignment**: Ensure the stable prefix is large enough to trigger the provider's minimum threshold.
