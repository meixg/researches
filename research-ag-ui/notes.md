# AG-UI Protocol Investigation Notes

## Investigation Steps
1.  **Initial Search**: Searched for "AG-UI 协议" and found Microsoft Learn documentation and TDesign (Tencent) integration info.
2.  **Documentation Review**:
    *   Microsoft Learn: Provides getting started guides for .NET and Python. Explains the use of HTTP POST and SSE.
    *   Official Docs (docs.ag-ui.com): Detailed event specifications, architecture, and SDK information.
3.  **Key Findings**:
    *   **Architecture**: Bi-directional connection between agent backends and user-facing frontends.
    *   **Communication**: HTTP POST (Request) + Server-Sent Events (Response).
    *   **Event Pattern**: Start-Content-End (Streaming), Snapshot-Delta (State).
    *   **Core Events**: `RUN_STARTED`, `RUN_FINISHED`, `TEXT_MESSAGE_START`, `TEXT_MESSAGE_CONTENT`, `TEXT_MESSAGE_END`, `TOOL_CALL_START`, etc.
    *   **Integration**: Supported by major frameworks (LangGraph, CrewAI, Microsoft Agent Framework, Pydantic AI, etc.).

## Next Steps
- Create `README.md` summarizing the protocol.
- Create `index.html` with detailed explanations and code examples.
