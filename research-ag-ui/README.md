# AG-UI (Agent User Interaction Protocol) 调研报告

## 1. 协议概述

AG-UI (Agent User Interaction Protocol) 是一个开源的、轻量级的、基于事件的协议，旨在标准化 AI 代理与面向用户的应用程序之间的连接。它解决了传统 REST/GraphQL API 在处理长时运行、非确定性、流式响应以及复杂交互（如人机协作）方面的局限性。

### 核心价值
- **标准化**: 统一不同 Agent 框架与前端的通信规范。
- **流式处理**: 支持实时 Token 流式传输和事件流。
- **多模态**: 原生支持文件、图像、语音等多模态输入输出。
- **状态同步**: 采用 Snapshot-Delta 模式高效同步 Agent 内部状态。
- **人机交互 (HITL)**: 支持中断 (Interrupts) 和恢复，方便用户审批或干预 Agent 执行过程。

## 2. 通信机制

AG-UI 建立在 HTTP 和 SSE (Server-Sent Events) 之上：
- **请求 (Client -> Server)**: 使用 `HTTP POST` 发送指令或消息。
- **响应 (Server -> Client)**: 使用 `Server-Sent Events (SSE)` 异步流式返回事件。

## 3. 核心事件分类

### 3.1 生命周期事件 (Lifecycle Events)
- `RUN_STARTED`: Agent 开始执行。
- `RUN_FINISHED`: Agent 任务圆满完成。
- `RUN_ERROR`: 执行出错。
- `STEP_STARTED` / `STEP_FINISHED`: 细粒度的步骤跟踪。

### 3.2 文本消息事件 (Text Message Events)
- `TEXT_MESSAGE_START`
- `TEXT_MESSAGE_CONTENT` (增量数据 delta)
- `TEXT_MESSAGE_END`

### 3.3 工具调用事件 (Tool Call Events)
- `TOOL_CALL_START`
- `TOOL_CALL_ARGS` (流式参数)
- `TOOL_CALL_END`
- `TOOL_CALL_RESULT`

### 3.4 状态同步事件 (State Events)
- `STATE_SNAPSHOT`: 完整状态。
- `STATE_DELTA`: 基于 JSON Patch (RFC 6902) 的增量更新。

### 3.5 扩展事件 (Extensibility Events)
- `CUSTOM`: 允许开发者定义应用特有的事件类型。
- `RAW`: 封装来自外部系统的原始事件。
- `META` (草案): 独立于 Agent 运行生命周期的元数据，如点赞/点踩反馈。

## 4. 协议扩展性 (Extensibility)

AG-UI 提供了多种机制来支持功能的横向扩展：

1.  **Custom Events**: 通过 `name` 和 `value` 字段，开发者可以轻松定义如 `UI_NAVIGATION` 或 `CONFUSION_DETECTION` 等自定义信令。
2.  **Raw Events**: 允许将其他协议（如 MCP 或 A2A）的事件透传到前端，实现多协议融合。
3.  **Meta Events (Draft)**: 引入了 "Side-band" 概念，允许在 Agent 未运行的情况下发送数据（例如用户在历史记录中添加笔记）。
4.  **Middleware (中间件)**: 协议支持在事件流出前对其进行拦截、转换或过滤。

## 5. 生态系统支持

AG-UI 已获得多家大厂及主流框架支持：
- **框架**: LangGraph, CrewAI, Microsoft Agent Framework, Pydantic AI, LlamaIndex, AG2, Mastra 等。
- **厂商**: Microsoft, Google, AWS (Bedrock).
- **客户端**: CopilotKit, Terminal.

## 6. 快速学习资源

请查看本目录下的 [index.html](./index.html)，该页面提供了详细的代码示例和交互式文档。
