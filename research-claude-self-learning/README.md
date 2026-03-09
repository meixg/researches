# Claude Code Self-Learning

A self-learning system for [Claude Code](https://claude.ai/code) that maintains a durable memory of mistakes and fixes, similar to `pi-self-learning`.

## Features
- **Automatic Task Reflection**: After Claude finishes a task, it reflects on the conversation to extract learnings.
- **Durable Memory**: Maintains a ranked index of learnings based on frequency and recency.
- **Context Injection**: Automatically injects relevant learnings into new sessions to prevent repeating past mistakes.
- **Git Integration**: Optionally backs up memory in a dedicated git repository.

## Installation

1. **Save the Script**:
   Create a directory for Claude Code scripts and save `claude-self-learning.js` there.
   ```bash
   mkdir -p ~/.claude/scripts
   cp claude-self-learning.js ~/.claude/scripts/
   chmod +x ~/.claude/scripts/claude-self-learning.js
   ```

2. **Set API Key**:
   Ensure your `ANTHROPIC_API_KEY` is exported in your shell profile (`.bashrc` or `.zshrc`).
   ```bash
   export ANTHROPIC_API_KEY='your-api-key-here'
   ```

3. **Configure Hooks**:
   Add the following to your Claude Code settings file.
   - Global settings: `~/.claude/settings.json`
   - Project settings: `./.claude/settings.json`

   ```json
   {
     "hooks": {
       "SessionStart": [
         {
           "hooks": [
             {
               "type": "command",
               "command": "node ~/.claude/scripts/claude-self-learning.js session-start"
             }
           ]
         }
       ],
       "Stop": [
         {
           "hooks": [
             {
               "type": "command",
               "command": "node ~/.claude/scripts/claude-self-learning.js stop"
             }
           ]
         }
       ]
     }
   }
   ```

## How it works

### Reflection (`Stop` hook)
When Claude finishes responding, the `Stop` hook triggers. It:
1. Reads the conversation transcript from the path provided by Claude Code.
2. Sends the last few turns to Claude (via Anthropic API) to extract mistakes and fixes.
3. Updates the memory in `~/.claude/self-learning-memory/`.

### Context Injection (`SessionStart` hook)
When you start a new session or resume one, the `SessionStart` hook:
1. Reads the top-ranked learnings from `CORE.md`.
2. Reads the latest daily reflections.
3. Outputs them to `stdout`, which Claude Code automatically includes in the session context.

## Storage Structure
```
~/.claude/self-learning-memory/
├── daily/
│   └── YYYY-MM-DD.md     # Daily logs of reflections
├── core/
│   ├── index.json        # Canonical scored index
│   └── CORE.md           # Rendered top learnings
└── long-term-memory.md   # Full history
```

## Principle of Operation
This implementation leverages Claude Code's native Hook system.
- The `Stop` event is used as an analogue to `agent_end`.
- The `SessionStart` event is used as an analogue to `before_agent_start`.
- Transcript parsing is performed on the JSONL transcript file whose path is passed to the hook via `stdin`.
