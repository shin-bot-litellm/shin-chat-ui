import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const { messages, user } = await request.json();

  const openclawUrl = process.env.OPENCLAW_URL || "http://localhost:3000";
  const openclawToken = process.env.OPENCLAW_TOKEN || "";

  const response = await fetch(`${openclawUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openclawToken}`,
      "x-openclaw-agent-id": "main",
    },
    body: JSON.stringify({
      model: "openclaw",
      stream: true,
      user: user || "webchat-user",
      messages,
    }),
  });

  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: "Failed to connect to OpenClaw" }),
      {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Forward the streaming response
  return new Response(response.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
