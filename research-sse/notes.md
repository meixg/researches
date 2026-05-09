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

## SSE header review
- Reviewed server.js /events response headers: Content-Type, Cache-Control, Connection, Access-Control-Allow-Origin.
- Key finding: Content-Type: text/event-stream is the protocol-critical header for browser EventSource. Cache-Control: no-cache is strongly recommended. Connection: keep-alive is Node/demo-specific and not part of the SSE protocol requirement. CORS header is only needed for cross-origin EventSource clients.
- Follow-up: clarified behavior when Connection: keep-alive or Cache-Control: no-cache are omitted. Connection is usually not required in Node HTTP/1.1 for SSE as long as response remains open; no-cache omission can cause buffering/caching issues in browsers/proxies/CDNs.
- Follow-up: explain SSE stream fields retry, id, data, event and how EventSource interprets them.
- Follow-up: clarified that retry/id/data/event are standardized SSE event stream fields parsed by browser EventSource; EventSource is the browser API that opens and manages SSE connections.

## SSE protocol details added
- `Content-Type: text/event-stream` is the required response header that makes the browser parse the response as an SSE stream.
- `Cache-Control: no-cache` is not a strict protocol requirement, but it is important in practice because SSE is live data and should not be cached or delayed by browser caches, proxies, or CDNs.
- `Connection: keep-alive` is not an SSE requirement. A Node HTTP/1.1 response remains open as long as the server does not call `res.end()`. Periodic SSE comment lines such as `: keep-alive\n\n` are more useful for preventing idle timeouts because they send actual bytes through the stream.
- `Access-Control-Allow-Origin` is only needed when the page and SSE endpoint are on different origins. Same-origin EventSource requests do not need it.
- SSE stream fields are part of the browser-parsed event stream format:
  - `data:` appends event payload text. Multiple `data:` lines are joined with newline characters.
  - `event:` names a custom event type. Without it, the browser dispatches the default `message` event.
  - `id:` sets the last event ID. On reconnect, the browser sends it back in the `Last-Event-ID` request header.
  - `retry:` updates the browser's automatic reconnect delay in milliseconds.
- A blank line terminates the current event. Without the blank line, the browser keeps buffering lines and does not dispatch the event to JavaScript yet.
- `EventSource` is the browser API for SSE. It opens a GET request, requires a `text/event-stream` response, parses `data/event/id/retry` fields, dispatches JavaScript events, and automatically reconnects after failures.
