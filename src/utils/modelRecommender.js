import { modelCatalog } from "../data/modelCatalog"

function containsValue(list = [], value = "") {
  if (!value) {
    return false
  }

  return list.some(
    (item) => item.toLowerCase() === value.toLowerCase()
  )
}

function textContains(text = "", words = []) {
  const normalizedText = text.toLowerCase()

  return words.some((word) =>
    normalizedText.includes(word.toLowerCase())
  )
}

function scoreModel(model, brief, concept) {
  /*
    HexGuide uses five dimensions:

    Creative concept fit   35%
    Goal fit               20%
    Platform fit           15%
    Priority fit           15%
    Technical capability   15%

    These are prototype decision weights.
    They are used to rank models, not as official benchmark scores.
  */

  const weights = {
    concept: 35,
    goal: 20,
    platform: 15,
    priority: 15,
    capability: 15,
  }

  const breakdown = {
    concept: 0,
    goal: 0,
    platform: 0,
    priority: 0,
    capability: 0,
  }

  const reasons = []

  const platform = brief?.platform || ""
  const style = brief?.style || ""
  const goal = brief?.mainGoal || ""
  const priority = brief?.priority || ""
  const duration = brief?.duration || ""

  const conceptFormat = concept?.format || ""
  const conceptDescription = concept?.description || ""
  const conceptApproach = concept?.creativeApproach || ""
  const conceptHook = concept?.hook || ""

  const conceptText = `
    ${conceptFormat}
    ${conceptDescription}
    ${conceptApproach}
    ${conceptHook}
  `.toLowerCase()

  /*
   * -----------------------------------
   * 1. CREATIVE CONCEPT FIT — 35%
   * -----------------------------------
   */

  let conceptScore = 0

  // Cinematic direction
  if (
    textContains(conceptText, ["cinematic", "macro", "visual", "film"]) &&
    model.strengths.some((item) =>
      ["cinematic", "realism", "storytelling"].includes(item)
    )
  ) {
    conceptScore += 40
    reasons.push("strong fit for the selected cinematic direction")
  }

  // Storytelling direction
  if (
    textContains(conceptText, [
      "story",
      "journey",
      "narrative",
      "storytelling",
    ]) &&
    model.strengths.includes("storytelling")
  ) {
    conceptScore += 25
    reasons.push("supports the concept's storytelling structure")
  }

  // Social direction
  if (
    textContains(conceptText, [
      "social",
      "scroll",
      "fast-paced",
      "short-form",
      "tiktok",
    ]) &&
    model.strengths.some((item) =>
      ["social content", "fast iteration"].includes(item)
    )
  ) {
    conceptScore += 35
    reasons.push("fits the social-first creative approach")
  }

  // UGC / influencer direction
  if (
    textContains(conceptText, [
      "ugc",
      "creator",
      "influencer",
      "testimonial",
      "authentic",
    ]) &&
    model.strengths.some((item) =>
      ["social content", "fast iteration"].includes(item)
    )
  ) {
    conceptScore += 35
    reasons.push("fits an authentic creator-led approach")
  }

  // Product-focused direction
  if (
    textContains(conceptText, [
      "product",
      "product shot",
      "close-up",
      "macro",
      "demonstration",
    ]) &&
    model.strengths.some((item) =>
      ["cinematic", "realism", "product storytelling"].includes(item)
    )
  ) {
    conceptScore += 30
    reasons.push("supports product-focused visuals")
  }

  // Problem / solution
  if (
    textContains(conceptText, [
      "problem",
      "solution",
      "comparison",
      "before",
      "after",
    ]) &&
    model.bestFor.some((item) =>
      [
        "Product Videos",
        "Social Ads",
        "Short-form Ads",
        "Testing",
      ].includes(item)
    )
  ) {
    conceptScore += 25
    reasons.push("fits a problem-solution or performance structure")
  }

  // Fallback: use style from brief if concept text is not descriptive enough.
  if (conceptScore === 0 && style) {
    if (containsValue(model.styles, style)) {
      conceptScore += 60
      reasons.push(`matches the ${style.toLowerCase()} style`)
    }
  }

  breakdown.concept = Math.min(conceptScore, 100)

  /*
   * -----------------------------------
   * 2. GOAL FIT — 20%
   * -----------------------------------
   */

  if (goal && containsValue(model.bestFor, goal)) {
    breakdown.goal = 100
    reasons.push(`supports the ${goal.toLowerCase()} objective`)
  } else if (goal) {
    breakdown.goal = 35
  }

  /*
   * -----------------------------------
   * 3. PLATFORM FIT — 15%
   * -----------------------------------
   */

  if (platform && containsValue(model.platforms, platform)) {
    breakdown.platform = 100
    reasons.push(`fits ${platform}`)
  } else if (platform) {
    breakdown.platform = 30
  }

  /*
   * -----------------------------------
   * 4. PRIORITY FIT — 15%
   * -----------------------------------
   */

  if (priority) {
    if (containsValue(model.priorities, priority)) {
      breakdown.priority = 100

      if (priority === "Highest Quality") {
        reasons.push("aligns with your quality-first priority")
      }

      if (priority === "Fastest Generation") {
        reasons.push("aligns with your speed-first priority")
      }

      if (priority === "Lower Cost") {
        reasons.push("aligns with your cost-conscious priority")
      }

      if (priority === "Best Balance") {
        reasons.push("aligns with your balanced quality/speed priority")
      }
    } else {
      breakdown.priority = 35
    }
  }

  /*
   * -----------------------------------
   * 5. TECHNICAL CAPABILITY — 15%
   * -----------------------------------
   */

  let capabilityScore = 0
  let capabilityChecks = 0
  let capabilityMatches = 0

  // All video concepts need text-to-video.
  capabilityChecks += 1

  if (model.capabilities?.textToVideo) {
    capabilityMatches += 1
  }

  // Product/story concepts benefit from image references.
  if (
    textContains(conceptText, [
      "product",
      "watch",
      "skincare",
      "reference",
      "appearance",
    ])
  ) {
    capabilityChecks += 1

    if (model.capabilities?.referenceImages) {
      capabilityMatches += 1
      reasons.push("supports reference-driven product creation")
    }
  }

  // Multi-shot concepts benefit from multi-shot capability.
  if (
    textContains(conceptText, [
      "story",
      "journey",
      "sequence",
      "multi-shot",
      "multiple scenes",
    ])
  ) {
    capabilityChecks += 1

    if (model.capabilities?.multiShot) {
      capabilityMatches += 1
      reasons.push("supports multi-shot storytelling")
    }
  }

  // Audio is useful when the concept explicitly mentions sound/dialogue.
  if (
    textContains(conceptText, [
      "audio",
      "voice",
      "dialogue",
      "sound",
      "asmr",
    ])
  ) {
    capabilityChecks += 1

    if (model.capabilities?.audio) {
      capabilityMatches += 1
      reasons.push("supports audio-driven creative")
    }
  }

  capabilityScore =
    capabilityChecks === 0
      ? 0
      : Math.round((capabilityMatches / capabilityChecks) * 100)

  breakdown.capability = capabilityScore

  /*
   * -----------------------------------
   * FINAL WEIGHTED SCORE
   * -----------------------------------
   */

  const weightedScore =
    breakdown.concept * (weights.concept / 100) +
    breakdown.goal * (weights.goal / 100) +
    breakdown.platform * (weights.platform / 100) +
    breakdown.priority * (weights.priority / 100) +
    breakdown.capability * (weights.capability / 100)

  const finalScore = Math.round(weightedScore)

  /*
   * Remove duplicate reasons.
   */
  const uniqueReasons = [...new Set(reasons)]

  /*
   * Fit label.
   */
  let fitLabel = "Consider"

  if (finalScore >= 85) {
    fitLabel = "Excellent Fit"
  } else if (finalScore >= 70) {
    fitLabel = "Strong Fit"
  } else if (finalScore >= 55) {
    fitLabel = "Good Fit"
  }

  return {
    ...model,
    score: finalScore,
    fitLabel,
    breakdown,
    reasons: uniqueReasons.slice(0, 5),
    duration,
  }
}

export function recommendModels(brief, concept) {
  const ranked = modelCatalog
    .map((model) => scoreModel(model, brief, concept))
    .sort((a, b) => b.score - a.score)

  return {
    recommended: ranked[0],
    alternatives: ranked.slice(1, 3),
    all: ranked,
  }
}