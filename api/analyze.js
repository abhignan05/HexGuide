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
    const { goal } = req.body || {}

    if (!goal || typeof goal !== "string" || !goal.trim()) {
      return res.status(400).json({
        error: "Creative goal is required.",
      })
    }

    const prompt = `
You are HexGuide, an AI creative intelligence assistant.

Analyze the user's advertising or content creation request.

Your job is to understand what the user has already told us
and identify only the information that is still missing.

Extract ONLY information that is clearly stated or strongly implied.

Do not invent information.

Return null when information is unknown.

Fields:

product
audience
platform
style
duration
contentType
mainGoal
valueProposition
priority

Normalization rules:

platform:
Instagram Reels, TikTok, YouTube, Facebook, Website, Multiple Platforms

style:
UGC / Influencer, Cinematic, Premium,
Funny / Entertaining, Educational, Trend-driven

mainGoal:
Increase Sales, Brand Awareness,
Social Engagement, Product Launch

priority:
Highest Quality, Fastest Generation,
Lower Cost, Best Balance

valueProposition means why someone should
choose this product over similar products.

Important:
- Do not put contentType in missingFields.
- Infer contentType from the user's request whenever possible.
- Do not put a field in missingFields if it is already confidently known.
- Only put these fields in missingFields:
  product
  audience
  valueProposition
  mainGoal
  platform
  style
  priority
  duration
- missingFields should contain only fields that would materially
  improve the creative recommendation.

Also return a short summary of what you understood.

User request:
${goal}
`

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",

        responseSchema: {
          type: "object",
          properties: {
            product: {
              type: ["string", "null"],
            },

            audience: {
              type: ["string", "null"],
            },

            platform: {
              type: ["string", "null"],
            },

            style: {
              type: ["string", "null"],
            },

            duration: {
              type: ["string", "null"],
            },

            contentType: {
              type: ["string", "null"],
            },

            mainGoal: {
              type: ["string", "null"],
            },

            valueProposition: {
              type: ["string", "null"],
            },

            priority: {
              type: ["string", "null"],
            },

            missingFields: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "product",
                  "audience",
                  "valueProposition",
                  "mainGoal",
                  "platform",
                  "style",
                  "priority",
                  "duration",
                ],
              },
            },

            summary: {
              type: "string",
            },
          },

          required: [
            "product",
            "audience",
            "platform",
            "style",
            "duration",
            "contentType",
            "mainGoal",
            "valueProposition",
            "priority",
            "missingFields",
            "summary",
          ],
        },
      },
    })

    const result = JSON.parse(response.text)

    return res.status(200).json(result)
  } catch (error) {
    console.error("HexGuide analysis error:", error)

    return res.status(500).json({
      error: "Failed to analyze the creative goal.",
    })
  }
}