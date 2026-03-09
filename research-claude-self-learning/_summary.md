Claude Code Self-Learning introduces a plugin for [Claude Code](https://claude.ai/code) that enables the system to autonomously reflect on its performance, capturing errors and improvements after each session. By leveraging event hooks, it maintains a ranked, persistent memory of its learnings, automatically injecting these insights into new sessions to minimize repeated mistakes. Integration with git ensures memory durability, while the structured storage and context injection make learnings easily accessible and actionable. The project adapts concepts from [pi-self-learning](https://github.com/nlpx/pi-self-learning) and operates through configurable script hooks for session lifecycle events.

**Key features:**
- Automatic extraction and ranking of learnings based on conversation transcripts.
- Persistent memory with daily logs, a scored index, and a rendered core file.
- Seamless integration with Claude Code’s native hooks and optional git backup for version control.
