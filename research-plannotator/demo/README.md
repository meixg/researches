# Plannotator Hook Demo

This is a minimal demonstration of how Plannotator's hook mechanism works.

## How to run

1. Ensure you have [Bun](https://bun.sh/) installed.
2. Run the mock hook by piping a sample JSON event to it:

```bash
echo '{"tool_input": {"plan": "Implement a new authentication system"}}' | bun run mock-hook.ts
```

3. Open the URL printed in the terminal (usually `http://localhost:3000`).
4. Click "Approve" or "Deny" in the mock UI.
5. Observe the JSON output in your terminal. This JSON is what the AI agent (e.g., Claude Code) uses to decide whether to continue.

## What this demonstrates

- **Stdin Interception**: How the CLI receives data from the agent.
- **Local Web Server**: How the CLI hosts a UI for the user.
- **Async Decision Waiting**: How the CLI pauses until the user interacts with the UI.
- **Stdout Feedback**: How the CLI sends the final decision back to the agent in a structured format.
