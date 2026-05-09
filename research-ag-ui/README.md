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

## 4. 生态系统支持

AG-UI 已获得多家大厂及主流框架支持：
- **框架**: LangGraph, CrewAI, Microsoft Agent Framework, Pydantic AI, LlamaIndex, AG2, Mastra 等。
- **厂商**: Microsoft, Google, AWS (Bedrock).
- **客户端**: CopilotKit, Terminal.

## 5. 快速学习资源

请查看本目录下的 [index.html](./index.html)，该页面提供了详细的代码示例和交互式文档。
