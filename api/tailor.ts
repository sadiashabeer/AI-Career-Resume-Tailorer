import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from "groq-sdk";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    const { jobDesc, userSkills, targetIndustry } = body || {};
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "GROQ_API_KEY is missing on the server environment." });
    }

    if (!jobDesc || !userSkills) {
      return res.status(400).json({ error: "Missing required fields: jobDesc and userSkills." });
    }

    const ai = new Groq({ apiKey });

    const chatCompletion = await ai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an expert technical recruiter and career coach. Given a job description, user skills/experience, and a target industry, provide: 1) Tailored resume bullet points optimized for ATS systems, 2) Recommended keywords to include, and 3) A professional cover letter draft. Format the output cleanly with clear section headings."
        },
        {
          role: "user",
          content: "Target Industry: " + (targetIndustry || "General") + "\n\nJob Description / Role:\n" + jobDesc + "\n\nMy Skills & Experience:\n" + userSkills
        }
      ]
    });

    const resultText = chatCompletion.choices[0]?.message?.content || "No response generated.";
    return res.status(200).json({ result: resultText });

  } catch (error: any) {
    console.error("Tailoring Error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate tailored materials." });
  }
}
