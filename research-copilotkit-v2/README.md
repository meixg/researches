# CopilotKit V2 Research Report

## Objectives
Research and document the all-new CopilotKit V2 API to provide a comprehensive, interactive guide for developers.

## Findings
CopilotKit V2 represents a significant shift from V1, focusing on:
1.  **Stronger Type Safety**: Parameters are now defined using **Zod** schemas, allowing for automatic validation and better TypeScript inference.
2.  **Modular UI (Slot System)**: High-level components like `CopilotChat` now use a "Slot" pattern, making every part of the UI (input, messages, buttons) individually replaceable or stylable.
3.  **AG-UI Protocol**: V2 is built directly on the AG-UI agent protocol, offering deeper control over agent execution and lifecycle.
4.  **Specialized Hooks**: New hooks like `useComponent` and `useHumanInTheLoop` provide first-class support for common agentic UI patterns.

## Artifacts Created
-   **`api_reference.html`**: A standalone, interactive HTML guide that documents key V2 APIs with live (simulated) demos.
-   **`notes.md`**: Detailed research notes extracted from the official documentation source.

## How to use the API Reference
Simply open `api_reference.html` in any web browser. Use the sidebar to navigate through different API categories. Each section contains:
-   **Description**: What the API does.
-   **Usage Code**: A copy-pasteable TypeScript/JSX snippet.
-   **Interactive Demo**: A simulated interaction to visualize how the hook or component behaves in a real application.

## Transitioning from V1
-   Replace `useCopilotReadable` with `useAgentContext`.
-   Replace `useCopilotAction` with `useFrontendTool`.
-   Switch to `@copilotkit/react-core/v2` for the new components and hooks.
-   Wrap your tool parameters in `z.object({...})`.
