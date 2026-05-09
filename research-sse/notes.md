# SSE (Server-Sent Events) Research Notes

## Overview
Server-Sent Events (SSE) is a server push technology enabling a client to receive automatic updates from a server via an HTTP connection. Unlike WebSockets, SSE is unidirectional (server to client) and works over standard HTTP.

## Goals
- Create a simple Node.js server with an SSE endpoint.
- Create an educational HTML page that demonstrates SSE and explains its mechanics.
- Verify the implementation using `curl` and browser-based testing (Playwright).

## Implementation Details
- Server: Node.js (using `http` module for simplicity, no heavy frameworks).
- Protocol: `text/event-stream`.
- Features demonstrated:
    - Standard `data` messages.
    - Custom event types (`event: notification`).
    - The `id` field for reconnection.
    - The `retry` field for reconnection timeout (set to 10s).
    - Multi-line data (JSON payload).
    - Comment lines for keeping the connection alive.

## Verification Results
- `curl -i` confirmed correct headers:
  - `Content-Type: text/event-stream`
  - `Cache-Control: no-cache`
- Playwright testing confirmed:
  - Client connects successfully.
  - Client receives and displays messages.
  - UI updates dynamically as events arrive.

## Learnings
- SSE is remarkably simple to implement compared to WebSockets if only unidirectional communication is needed.
- Browsers handle reconnection logic transparently; if the server is killed and restarted, the `EventSource` will eventually reconnect on its own.
- The `id` field is crucial for stateful streams where the client needs to resume from a specific point after a disconnection.
