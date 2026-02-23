Plannotator serves as a visual plan and code review layer for AI coding agents, enabling users to annotate, approve, or request changes to generated plans through an interactive single-page application. Its CLI is built on [Bun](https://bun.sh/), which intercepts agent output and serves a React-based UI that anchors feedback to precise markdown blocks. The tool integrates seamlessly with coding agents like Claude Code using configurable hooks and structured JSON/Markdown feedback, facilitating iterative review cycles and clear communication between user and agent. Plannotator’s block-based parser and plan diff engine empower users with granular control and transparency during agent-driven code planning.  
For more details, see [React](https://reactjs.org/), Bun, and Vite tooling.

**Key findings:**
- Browser-based UI lowers friction and increases review bandwidth.
- Agent-agnostic feedback loop adapts to various coding agents.
- Plan Diff feature enhances reliability and confidence in iterative coding.
