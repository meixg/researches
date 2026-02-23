/**
 * Plannotator Mock Hook Demo
 *
 * This script demonstrates how Plannotator integrates with AI agents (like Claude Code)
 * using a hook-based approach.
 *
 * Usage:
 *   echo '{"tool_input": {"plan": "My amazing plan"}}' | bun run mock-hook.ts
 */

import { serve } from "bun";

async function main() {
  console.error("Reading hook event from stdin...");
  const stdinContent = await Bun.stdin.text();

  let plan = "";
  try {
    const event = JSON.parse(stdinContent);
    plan = event.tool_input?.plan || "No plan provided";
  } catch (e) {
    console.error("Error parsing stdin:", e);
    process.exit(1);
  }

  console.error(`Received Plan: "${plan}"`);

  let resolveDecision: (approved: boolean) => void;
  const decisionPromise = new Promise<boolean>((resolve) => {
    resolveDecision = resolve;
  });

  const server = serve({
    port: 3000,
    async fetch(req) {
      const url = new URL(req.url);

      if (url.pathname === "/") {
        return new Response(`
          <html>
            <body>
              <h1>Plannotator Mock UI</h1>
              <p>Plan to review: <strong>${plan}</strong></p>
              <button onclick="fetch('/approve', {method: 'POST'}).then(() => window.close())">Approve</button>
              <button onclick="fetch('/deny', {method: 'POST'}).then(() => window.close())">Deny</button>
              <script>
                // In a real app, window.close() might not work unless opened by script
              </script>
            </body>
          </html>
        `, { headers: { "Content-Type": "text/html" } });
      }

      if (url.pathname === "/approve" && req.method === "POST") {
        resolveDecision(true);
        return new Response("Approved");
      }

      if (url.pathname === "/deny" && req.method === "POST") {
        resolveDecision(false);
        return new Response("Denied");
      }

      return new Response("Not Found", { status: 404 });
    },
  });

  console.error(`Server started at http://localhost:${server.port}`);
  console.error("Please visit the URL above to make a decision.");

  const approved = await decisionPromise;

  // Give the server a moment to finish responding to the request
  await new Promise(r => setTimeout(r, 100));
  server.stop();

  // Output the final decision JSON to stdout (this is what the AI agent sees)
  const result = {
    hookSpecificOutput: {
      hookEventName: "PermissionRequest",
      decision: {
        behavior: approved ? "allow" : "deny",
        message: approved ? undefined : "User requested changes to the plan."
      }
    }
  };

  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

main();
