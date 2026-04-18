import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

async function callClaude(system, userMessage) {
  console.log("Calling Claude API...");
  console.log("API Key exists:", !!process.env.ANTHROPIC_API_KEY);
  
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 2048,
      system,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  const data = await res.json();
  console.log("Claude raw response:", JSON.stringify(data));
  return data?.content?.[0]?.text ?? "";
}

app.post("/api/cover-letter", async (req, res) => {
  console.log("Cover letter request received:", req.body);
  const { name, resume, jobDescription, tone } = req.body;
  const content = await callClaude(
    "You are an expert career writer. Write a concise, specific cover letter (under 350 words) in clean Markdown. Match the job description. Avoid clichés. Use a confident but human tone.",
    `Candidate name: ${name}\nTone: ${tone ?? "professional but warm"}\nResume:\n${resume}\nJob description:\n${jobDescription}`
  );
  res.json({ content });
});

app.post("/api/resume", async (req, res) => {
  console.log("Resume request received");
  const { name, role, skills, experience, jobDescription } = req.body;
  const content = await callClaude(
    "You are an expert resume writer. Output a clean, ATS-friendly resume in Markdown. Use clear section headers (## Summary, ## Skills, ## Experience, ## Education). Be concise and impact-focused with metrics where possible. Do not invent facts.",
    `Name: ${name}\nTarget role: ${role}\nSkills: ${skills}\nExperience:\n${experience}${jobDescription ? `\nTailor for this job description:\n${jobDescription}` : ""}`
  );
  res.json({ content });
});

app.post("/api/interview", async (req, res) => {
  console.log("Interview request received");
  const { role, jobDescription, currentSkills } = req.body;
  const content = await callClaude(
    "You are an expert interview coach. Output Markdown with: ## Likely Questions (10 specific questions), ## Sample Strong Answer Outlines (for the 3 hardest), ## Skill Gaps (compare candidate vs job description), ## Learning Roadmap (5 resources with real links).",
    `Target role: ${role}\nJob description:\n${jobDescription}\nCandidate skills:\n${currentSkills}`
  );
  res.json({ content });
});

app.listen(3001, () => console.log("API server running on http://localhost:3001"));