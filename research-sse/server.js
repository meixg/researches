const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '/index.html') {
    // Serve the HTML file
    fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html: ' + err.message);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
  } else if (req.url === '/events') {
    // SSE Endpoint
    // 1. Essential Headers
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*', // Allowed for demo
    });

    console.log('Client connected to /events');

    // 2. Optional: Set reconnection time (retry field)
    // Tells the browser to wait 10 seconds before attempting to reconnect if the connection drops.
    res.write('retry: 10000\n\n');

    // 3. Send initial "welcome" message
    res.write(`id: 0\n`);
    res.write(`data: Server-Sent Events connection established at ${new Date().toISOString()}\n\n`);

    let messageCount = 0;

    // 4. Send periodic updates
    const intervalId = setInterval(() => {
      messageCount++;
      const timestamp = new Date().toLocaleTimeString();

      // Example A: Standard message with an ID
      // Format:
      // id: <number>
      // data: <message content>
      // \n\n (Double newline ends the event)
      res.write(`id: ${messageCount}\n`);
      res.write(`data: Message #${messageCount} sent at ${timestamp}\n\n`);

      // Example B: Custom event type
      // Every 3 messages, send a "notification" event
      if (messageCount % 3 === 0) {
        res.write(`event: notification\n`);
        res.write(`data: This is a custom "notification" event triggered at ${timestamp}\n\n`);
      }

      // Example C: Multi-line data (often used for JSON)
      // Every 5 messages, send a JSON object
      if (messageCount % 5 === 0) {
        const payload = {
          type: 'stats',
          memoryUsage: process.memoryUsage().heapUsed,
          uptime: process.uptime()
        };
        // Each line of a multi-line message must start with "data: "
        const jsonString = JSON.stringify(payload, null, 2);
        jsonString.split('\n').forEach(line => {
          res.write(`data: ${line}\n`);
        });
        res.write(`\n`); // End the event
      }

      // Keep-alive comment (optional, prevents timeouts in some proxies)
      res.write(`: keep-alive\n\n`);

    }, 2000);

    // 5. Handle client disconnect
    req.on('close', () => {
      clearInterval(intervalId);
      console.log('Client disconnected from /events');
      res.end();
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`SSE Demo Server running at http://localhost:${PORT}`);
  console.log(`- HTML Page: http://localhost:${PORT}/`);
  console.log(`- Event Stream: http://localhost:${PORT}/events`);
});
