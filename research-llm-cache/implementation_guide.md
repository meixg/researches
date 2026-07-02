# LLM Prompt Caching: Agent Implementation Guide

This guide provides technical details on how to structure API requests to leverage prompt caching across major LLM providers.

---

## 1. Core Principle: The "Stable Prefix" Rule

For **all** providers, caching is based on **exact prefix matching**.
- The cache key is generated from the start of the prompt.
- **Any** change (even a single space or newline) in the prefix invalidates the cache for everything that follows.
- **Order matters:** Static content (Instructions, Tools, Docs) must come **before** dynamic content (Current Query, User ID, Timestamp).

---

## 2. Provider-Specific Implementation

### 2.1 OpenAI (Automatic)
OpenAI caches automatically for prompts > 1,024 tokens. No special markers or parameters are needed. The system automatically hashes the prefix.

**Implementation Detail:**
Ensure the `messages` array starts with identical content across requests.

```python
# Correct structure for caching
messages = [
    {"role": "system", "content": "Static instructions..."}, # > 1024 tokens total
    {"role": "user", "content": "Stable document or context..."},
    {"role": "user", "content": "Dynamic question"} # Changes every time
]
```

### 2.2 Anthropic (Explicit `cache_control`)
Anthropic requires explicit markers in the content blocks.

**Example: Caching System Prompt and Documents**
```json
{
  "model": "claude-3-5-sonnet-20240620",
  "system": [
    {
      "type": "text",
      "text": "You are a specialized research assistant...",
      "cache_control": {"type": "ephemeral"}
    }
  ],
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "<context>...large stable text...</context>",
          "cache_control": {"type": "ephemeral"}
        },
        {
          "type": "text",
          "text": "Analyze the text above."
        }
      ]
    }
  ]
}
```

### 2.3 Google Gemini (Context Caching API)
Gemini 1.5 Pro/Flash uses a separate service to manage long-lived caches.

1. **Create the Cached Content:**
```python
# Using the Google Generative AI SDK
import google.generativeai as genai

cache = genai.caching.CachedContent.create(
    model='models/gemini-1.5-pro-002',
    display_name='research-docs',
    system_instruction="Static instructions...",
    contents=["Massive stable document..."],
    ttl=datetime.timedelta(minutes=60)
)
```

2. **Use the Cache in Inference:**
```python
model = genai.GenerativeModel(model_name='models/gemini-1.5-pro-002')
response = model.generate_content(
    "Specific question about the docs",
    request_options={'cached_content': cache.name}
)
```

### 2.4 DeepSeek (Automatic & Transparent)
DeepSeek (V2.5/V3) caches prefixes automatically in 64-token increments. No code changes are required.

**Key Detail:**
DeepSeek's cache is highly efficient for multi-turn conversations. Simply send the full history, and the prefix (prior turns) will be automatically cached.

### 2.5 Moonshot Kimi (Context Caching)
Kimi uses a `context_cache` ID in the request body.

1. **Upload Context:** `POST /v1/context_caches` with the static content. Receive a `cache_id`.
2. **Reference in Chat:**
```json
{
    "model": "moonshot-v1-128k",
    "messages": [{"role": "user", "content": "Question about the cached data"}],
    "context_cache": "cache-id-abc-123"
}
```

### 2.6 Qwen (Alibaba DashScope)
Qwen supports Anthropic-compatible `cache_control` in certain models (like Qwen-Max/Plus).

---

## 3. Best Practices for Agent Developers

| Technique | Description |
| :--- | :--- |
| **System Prompt First** | Never vary the system prompt between turns. |
| **Fixed Tool Order** | Ensure `tools` are always defined in the same order in the JSON. |
| **Move "Now" to End** | If you must provide the current time, add it as a separate message at the end or inside the user query. |
| **Consistent Formatting**| Spaces, indentation, and newlines in the prefix must be byte-identical. |
| **Monitor Usage** | Check `usage.prompt_tokens_details.cached_tokens` (OpenAI) or `usage.cache_read_input_tokens` (Anthropic) to verify hit rates. |
