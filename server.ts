import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Groq from "groq-sdk";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "20mb" }));

function getAiClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;
  return new Groq({ apiKey });
}

app.post("/api/tailor", async (req, res) => {
  try {
    const { jobDesc, userSkills, targetIndustry } = req.body;
    const ai = getAiClient();

    if (!ai) {
      return res.status(500).json({ error: "GROQ_API_KEY is missing on the server environment." });
    }

    const chatCompletion = await ai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an expert technical recruiter and career coach. Given a job description, user skills/experience, and a target industry, provide: 1) Tailored resume bullet points optimized for ATS systems, 2) Recommended keywords to include, and 3) A professional cover letter draft. Format the output cleanly with clear section headings."
        },
        {
          role: "user",
          content: "Target Industry: " + targetIndustry + "\n\nJob Description / Role:\n" + jobDesc + "\n\nMy Skills & Experience:\n" + userSkills
        }
      ]
    });

    const resultText = chatCompletion.choices[0]?.message?.content || "No response generated.";
    res.json({ result: resultText });

  } catch (error: any) {
    console.error("Tailoring Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate tailored materials." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log("Server listening on port " + PORT);
  });
}

startServer();
