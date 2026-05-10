CopilotKit V2 introduces major improvements for building agent-powered interfaces in React, offering robust type safety via Zod schemas and a flexible slot-based UI system that lets developers customize chat components easily. Built on the AG-UI agent protocol, V2 provides granular control over agent execution and lifecycle, and adds specialized hooks like `useComponent` and `useHumanInTheLoop` for common interactive AI patterns. The research project produced an interactive API reference guide and detailed notes to help developers transition seamlessly from V1, with clear mappings for deprecated hooks and updated usage.

**Key findings:**
- Zod schemas strengthen validation and TypeScript inference ([Zod](https://github.com/colinhacks/zod)).
- Slot pattern enables high customizability in UI components.
- AG-UI protocol gives developers direct agent lifecycle control ([CopilotKit AG-UI Protocol](https://github.com/CopilotKit/AG-UI)).
- Migration steps included clear hook and component replacements and parameter schema updates.
