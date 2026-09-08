import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    })
  }

  try {
    const { brief } = req.body || {}

    if (!brief) {
      return res.status(400).json({
        error: "Creative brief is required.",
      })
    }

    const prompt = `
You are HexGuide, an AI creative strategy assistant.

Your job is to create THREE genuinely different creative directions
for the user's advertising/content brief.

Use the completed brief below.

IMPORTANT:
- Every concept must clearly reflect the user's product, audience,
  goal, platform, style, value proposition, and priority when those
  fields are available.
- Do not give three variations of the same idea.
- Make the three concepts strategically different.
- Keep them practical enough to produce using AI tools.
- Do not recommend specific AI models yet.
- Do not invent product claims.
- Do not contradict the user's brief.
- The concepts should be suitable for the requested platform.
- One concept should be the strongest overall match.
- Another can emphasize brand/story.
- Another can emphasize social engagement, speed, or a different
  creative mechanism depending on the brief.

For each concept provide:

title
label
format
duration
description
hook
whyItFits
creativeApproach

The "label" should be a short strategic tag such as:
Best Match
Brand Focused
Social First
UGC
Product Focused
Performance
Story Driven

The "format" should describe the actual creative format,
for example:
UGC / Influencer
Cinematic Product Story
Fast-Paced Social Ad
Product Demonstration
Founder Story
Problem-Solution
Comparison Ad

The "whyItFits" field must explicitly explain how the concept
matches the user's goal and brief.

Return ONLY valid JSON.

COMPLETED CREATIVE BRIEF:

Product:
${brief.product || "Unknown"}

Audience:
${brief.audience || "Unknown"}

Value Proposition:
${brief.valueProposition || "Unknown"}

Main Goal:
${brief.mainGoal || "Unknown"}

Platform:
${brief.platform || "Unknown"}

Style:
${brief.style || "Unknown"}

Priority:
${brief.priority || "Unknown"}

Duration:
${brief.duration || "Unknown"}

Content Type:
${brief.contentType || "Unknown"}

Original User Goal:
${brief.originalGoal || "Unknown"}
`

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",

        responseSchema: {
          type: "object",
          properties: {
            concepts: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },
                  label: {
                    type: "string",
                  },
                  format: {
                    type: "string",
                  },
                  duration: {
                    type: "string",
                  },
                  description: {
                    type: "string",
                  },
                  hook: {
                    type: "string",
                  },
                  whyItFits: {
                    type: "string",
                  },
                  creativeApproach: {
                    type: "string",
                  },
                },
                required: [
                  "title",
                  "label",
                  "format",
                  "duration",
                  "description",
                  "hook",
                  "whyItFits",
                  "creativeApproach",
                ],
              },
            },
          },
          required: ["concepts"],
        },
      },
    })

    const result = JSON.parse(response.text)

    if (!result.concepts || result.concepts.length !== 3) {
      return res.status(500).json({
        error: "The AI did not return three concepts.",
      })
    }

    return res.status(200).json(result)
  } catch (error) {
    console.error("HexGuide concepts error:", error)

    return res.status(500).json({
      error: "Failed to generate creative concepts.",
    })
  }
}