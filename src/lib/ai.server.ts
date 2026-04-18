type Message = { role: "system" | "user" | "assistant"; content: string };

export async function callAi(messages: Message[]): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not configured");

  const system = messages.find((m) => m.role === "system")?.content ?? "";
  const userMessages = messages.filter((m) => m.role !== "system");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system,
      messages: userMessages,
    }),
  });

  if (!res.ok) {
    if (res.status === 429) throw new Error("Rate limited — try again in a moment.");
    const text = await res.text();
    throw new Error(`Claude API error (${res.status}): ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  return data?.content?.[0]?.text ?? "";
}