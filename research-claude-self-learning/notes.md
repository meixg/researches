# Implementation Notes for Claude Code Self-Learning

## Logic Analysis of `pi-self-learning`

### 1. Hook Integration
- **Reflection (`agent_end`)**: Triggered when a task is completed. Extracts learnings from the recent conversation.
- **Context Injection (`before_agent_start`)**: Triggered before a task starts. Injects memory into the prompt.

### 2. Scoring & Ranking Algorithm
- **Storage**: `core/index.json` stores all learning records.
- **Update Logic**:
  - For each mistake/fix identified:
    - New item: `score = 1`, `hits = 1`.
    - Existing item:
      - `hits += 1`.
      - `repetitionBonus = Math.min(1, hits * 0.08)`.
      - `score += 1 + repetitionBonus`.
- **Ranking Logic**:
  - `effectiveScore = score - (ageDays * 0.05)`.
  - Recency penalty decays the score over time.
  - `selectBalancedCoreItems` picks the top N items, attempting a 50/50 balance between `learnings` and `antiPatterns` (watch-outs).

### 3. Memory Structure
- `daily/YYYY-MM-DD.md`: Time-stamped logs of all reflections.
- `core/index.json`: Canonical scored index.
- `core/CORE.md`: Top-ranked learnings, used for context injection.
- `long-term-memory.md`: Full history of all learnings.

### 4. Git Integration
- Automatically initializes a git repo in the memory root.
- Commits changes after each reflection.

---

## Claude Code Adaptation Strategy

### 1. Hook Mapping
- `SessionStart` (Matcher: `*`): Handles context injection. Prints `CORE.md` and last daily file.
- `Stop`: Handles reflection. Triggered when Claude finishes a response.
  - **Important**: Use `stop_hook_active` check to avoid infinite loops if the hook triggers more Claude responses (though our hook just saves files).

### 2. Transcript Parsing
- Claude provides `transcript_path` to the hook.
- The transcript is in JSONL format.
- We need to parse the last few turns to build the reflection prompt.
- Turns usually consist of `user` prompt and `assistant` response.

### 3. LLM Call for Reflection
- We will use the Anthropic API.
- The user will need to provide an `ANTHROPIC_API_KEY`.
- We'll use `fetch` (built-in in Node.js 18+) to avoid external dependencies like `anthropic` SDK.

### 4. Implementation Details
- Language: Node.js (JavaScript).
- File: `claude-self-learning.js`.
- Location: Ideally placed in `~/.claude/scripts/`.
