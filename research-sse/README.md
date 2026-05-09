# SSE (Server-Sent Events) Detailed Demo and Tutorial

This project provides a comprehensive, hands-on demonstration of Server-Sent Events (SSE). It includes a Node.js backend that streams events and a frontend that serves as both a client and an educational resource.

## Project Structure
- `server.js`: A lightweight Node.js server that serves the SSE stream and the static HTML page.
- `index.html`: An interactive teaching page that connects to the SSE stream and explains how it works.
- `notes.md`: Development notes and technical details.

## How to Run
1.  **Start the server**:
    ```bash
    node server.js
    ```
2.  **Open the demo**:
    Navigate to `http://localhost:3000` in your web browser.

## Key SSE Concepts Demonstrated

### 1. The HTTP Connection
SSE works over standard HTTP. The server keeps the connection open and sends data with the following headers:
- `Content-Type: text/event-stream`: Identifies the stream.
- `Cache-Control: no-cache`: Prevents browsers or proxies from caching the stream.
- `Connection: keep-alive`: Keeps the persistent connection active.

### 2. The Data Format
Events are sent as plain text blocks separated by double newlines (`\n\n`).
- `data: <message>`: The actual content of the event.
- `event: <name>`: Custom event names (allows categorization of messages).
- `id: <value>`: A unique identifier. If the connection drops, the browser sends this ID in the `Last-Event-ID` header upon reconnecting.
- `retry: <milliseconds>`: Instructions for how long the browser should wait before attempting to reconnect.
- `: <comment>`: Lines starting with a colon are comments and are ignored by the client (useful for keep-alives).

### 3. The Client API (`EventSource`)
The browser provides a simple native API called `EventSource`:
```javascript
const source = new EventSource('/events');

// For standard messages
source.onmessage = (event) => {
  console.log(event.data);
};

// For custom named events
source.addEventListener('notification', (event) => {
  console.log('Got a notification:', event.data);
});
```

## Advantages of SSE
- **Native Browser Support**: No extra libraries needed.
- **Automatic Reconnection**: Browsers handle connection drops and retries automatically.
- **Firewall Friendly**: Works over standard HTTP(S).
- **Lightweight**: Simpler than WebSockets for unidirectional (server-to-client) data flow.

## Use Cases
- Real-time dashboards and stock tickers.
- Social media notifications.
- Progress bars for long-running server tasks.
- Live news feeds.
