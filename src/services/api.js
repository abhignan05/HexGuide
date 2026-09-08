export async function analyzeGoal(goal) {
  const response = await fetch("/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      goal,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Failed to analyze goal")
  }

  return data
}

export async function generateConcepts(brief) {
  const response = await fetch("/api/concepts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      brief,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || "Failed to generate concepts")
  }

  return data
}

export async function generateProductionPlan(
  brief,
  concept,
  model
) {
  const response = await fetch("/api/production-plan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      brief,
      concept,
      model,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.error || "Failed to generate production plan"
    )
  }

  return data
}