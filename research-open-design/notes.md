# Open Design Implementation Research Notes

## Core Philosophy
- Agent-native: Agents are the "engine", OD is the "studio".
- Local-first: SQLite + Filesystem.
- Open standards: `DESIGN.md` (Markdown), `SKILL.md` (Markdown), MCP.

## Component Breakdown

### 1. The Daemon (`apps/daemon`)
- Express server, typically on port 7456.
- Manages **Sessions**: Each session tracks active agent, skill, and design system.
- **Agent Adapters**: Bridges to 21+ CLIs (Claude Code, Cursor, etc.). See `apps/daemon/src/agents.ts`.
- **Skill Registry**: Scans `skills/` directories for `SKILL.md`.
- **Design System Resolver**: Parses `DESIGN.md` files and injects them into agent prompts.
- **Artifact Store**: Files are written to `.od/projects/<id>/artifacts/`. Conventional layout for git-friendliness.

### 2. The Frontend (`apps/web`)
- Next.js 16 (App Router).
- **Preview Engine**: Sandboxed `<iframe>` using `srcdoc`.
- **Artifact Parser**: Extracts `<artifact>` tags from agent streams.
- **Comment Mode**: Surgical edits via DOM element selection (`data-od-id`).

### 3. Skills & Design Systems
- **Skills**: Define the "taste" and "output format".
- **Design Systems**: Define the "brand". Standardized 9-section schema.
- Agents read these as context to ensure consistency.

### 4. MCP Server
- Enables external agents to query Open Design data (files, artifacts, design systems).

### 5. HyperFrames
- HTML/CSS/GSAP -> Headless Chrome -> FFmpeg -> MP4.

## Key Workflows
1. **Generation**: Prompt -> Daemon -> Agent (with Skill/DS) -> Stream -> Artifact -> Preview.
2. **Refinement**: Comment -> Element ID -> Agent (Surgical Edit) -> New Artifact Version.
3. **Export**: Artifact -> Inliner/Puppeteer/FFmpeg -> HTML/PDF/MP4.
