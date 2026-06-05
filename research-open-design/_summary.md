Open Design (OD) offers an open-source, local-first alternative to Claude Design by orchestrating 21+ coding agents through a modular "Studio" interface. The platform is built using a client-daemon architecture, with a Next.js web frontend for UI and a Node.js daemon for session management, agent detection, and filesystem operations. Key features include standardized Markdown-based design and skill contracts (`DESIGN.md`, `SKILL.md`), sandboxed artifact preview via iframe, agent-native video generation (HyperFrames), local git-friendly persistence, and surgical DOM edits. OD emphasizes high extensibility, security, and brand-grade design constraints while supporting various agent CLIs. More details and sample interface screenshots can be found at [Open Design on GitHub](https://github.com/nexu-io/open-design).

Key highlights:
- Modular adapters for 21+ coding agent CLIs (Claude Code, Cursor, etc.)
- Local-first artifact storage and git integration
- Interactive, secure previews with JSX/React and video rendering via headless Chrome
- Brand and skill contracts for enforceable design standards
