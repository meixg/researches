# CopilotKit V2 API Research Notes

## Overview
The V2 API is built on the AG-UI agent protocol. It is more streamlined and typesafe (using Zod) than V1.

## Core Components & Providers
- **`<CopilotKit />`**: The root provider.
  - Props: `runtimeUrl`, `publicApiKey`, `headers`, `properties`, `showDevConsole`, `onError`, `openGenerativeUI`, etc.
- **`<CopilotChat />`**: High-level chat container. Wires an agent to a chat view.
- **`<CopilotPopup />`**: Floating popup version of `CopilotChat`.
- **`<CopilotSidebar />`**: Sidebar version of `CopilotChat`.

## Essential Hooks
### Agent & Context
- **`useAgent(options)`**: Returns an `AbstractAgent` instance. Subscribe to state/messages/status.
- **`useAgentContext(context)`**: (V2 equivalent of `useCopilotReadable`) Surface serializable app state to the agent.
- **`useCapabilities(agentId)`**: Read agent's declared capabilities (tools, streaming, etc.).
- **`useThreads(input)`**: Manage conversation threads (list, rename, archive, delete). Requires Enterprise Platform.

### Tool Registration & Rendering
- **`useFrontendTool(tool)`**: Register client-side tool handlers with optional UI rendering. Uses Zod for parameters.
- **`useComponent(config)`**: Convenience hook to register a tool that renders a React component.
- **`useHumanInTheLoop(tool)`**: Register tools that pause execution for user input (e.g., confirmations).
- **`useRenderTool(config)`**: Register chat renderers for tool calls (named or wildcard). Rendering only.
- **`useInterrupt(config)`**: Handle `on_interrupt` events from agents and resume with user input.

### UI & Configuration
- **`useSuggestions()`**: Access current chat suggestions.
- **`useConfigureSuggestions(config)`**: Register static or dynamic suggestions.
- **`useCopilotChatConfiguration()`**: Read/provide localized labels and modal state.
- **`useCopilotKit()`**: Low-level access to the core instance and executing tool IDs.

## UI Sub-components (Slots)
- **`CopilotChatView`**: The layout core.
- **`CopilotChatMessageView`**: Renders message list.
- **`CopilotChatInput`**: The input area with transcription and tools menu.
- **`CopilotChatAssistantMessage`**: Renders assistant messages with Markdown/Tools.
- **`CopilotChatUserMessage`**: Renders user messages with branch navigation.

## Key Changes in V2
- **Zod for Schemas**: Tool parameters now use Zod for validation and type inference.
- **Slot System**: UI components use a flexible slot system (Component, className, or partial props).
- **AG-UI Integration**: Deep integration with the AG-UI protocol for better agent control.
- **Standardized Hooks**: More focused hooks for specific tasks (e.g., `useComponent` vs manual tool registration).
