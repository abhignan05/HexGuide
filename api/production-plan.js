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
    const { brief, concept, model } = req.body || {}

    if (!brief || !concept || !model) {
      return res.status(400).json({
        error: "Brief, concept, and model are required.",
      })
    }

    const prompt = `
You are HexGuide, an AI creative production strategist.

Create a practical production plan for the selected creative direction.

The user is non-technical, so the output should be easy to understand
and directly actionable.

Use ONLY information supported by the brief and selected concept.

Do not invent product claims, statistics, features, testimonials,
or facts about the product.

The recommended model below is already selected by HexGuide.
Do not replace it.

The production plan should contain:

1. creativeObjective
A short explanation of what the content should achieve.

2. script
A complete short-form script appropriate for the requested platform,
style, audience, goal, and duration.

3. shotPlan
A sequence of shots.

Each shot must contain:
- shotNumber
- timing
- visual
- action
- onScreenText
- audio

4. prompts
A list of prompts for generating the major visual/video shots.

Each prompt must contain:
- shotNumber
- purpose
- prompt

Prompts should be specific enough to be useful with the recommended
model.

5. workflow
A practical ordered workflow from preparation to final export.

6. callToAction
A concise CTA suitable for the campaign goal.

7. executionNotes
A few important practical notes about consistency, framing, pacing,
references, or editing.

Make the plan realistic for AI-assisted content creation.

COMPLETED BRIEF:

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

Original Goal:
${brief.originalGoal || "Unknown"}

SELECTED CREATIVE CONCEPT:

Title:
${concept.title || "Unknown"}

Format:
${concept.format || "Unknown"}

Description:
${concept.description || "Unknown"}

Hook:
${concept.hook || "Unknown"}

Why It Fits:
${concept.whyItFits || "Unknown"}

Creative Approach:
${concept.creativeApproach || "Unknown"}

RECOMMENDED MODEL:

Name:
${model.name || "Unknown"}

Provider:
${model.provider || "Unknown"}

Description:
${model.description || "Unknown"}

Strengths:
${(model.strengths || []).join(", ")}

IMPORTANT:
Do not invent model capabilities that are not present in the
provided model information.
`

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,

      config: {
        responseMimeType: "application/json",

        responseSchema: {
          type: "object",

          properties: {
            creativeObjective: {
              type: "string",
            },

            script: {
              type: "string",
            },

            shotPlan: {
              type: "array",

              items: {
                type: "object",

                properties: {
                  shotNumber: {
                    type: "integer",
                  },

                  timing: {
                    type: "string",
                  },

                  visual: {
                    type: "string",
                  },

                  action: {
                    type: "string",
                  },

                  onScreenText: {
                    type: "string",
                  },

                  audio: {
                    type: "string",
                  },
                },

                required: [
                  "shotNumber",
                  "timing",
                  "visual",
                  "action",
                  "onScreenText",
                  "audio",
                ],
              },
            },

            prompts: {
              type: "array",

              items: {
                type: "object",

                properties: {
                  shotNumber: {
                    type: "integer",
                  },

                  purpose: {
                    type: "string",
                  },

                  prompt: {
                    type: "string",
                  },
                },

                required: [
                  "shotNumber",
                  "purpose",
                  "prompt",
                ],
              },
            },

            workflow: {
              type: "array",

              items: {
                type: "string",
              },
            },

            callToAction: {
              type: "string",
            },

            executionNotes: {
              type: "array",

              items: {
                type: "string",
              },
            },
          },

          required: [
            "creativeObjective",
            "script",
            "shotPlan",
            "prompts",
            "workflow",
            "callToAction",
            "executionNotes",
          ],
        },
      },
    })

    const result = JSON.parse(response.text)

    return res.status(200).json(result)
  } catch (error) {
    console.error(
      "HexGuide production plan error:",
      error
    )

    return res.status(500).json({
      error: "Failed to generate production plan.",
    })
  }
}