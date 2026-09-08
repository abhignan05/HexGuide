import { useMemo, useState } from "react"

function Brief({ goal, analysis, onBack, onComplete }) {
  const allowedFields = [
    "product",
    "audience",
    "valueProposition",
    "mainGoal",
    "platform",
    "style",
    "priority",
    "duration",
  ]

  const missingFields = (analysis?.missingFields || []).filter((field) =>
    allowedFields.includes(field)
  )

  const initialAnswers = useMemo(
    () => ({
      product: analysis?.product || "",
      audience: analysis?.audience || "",
      valueProposition: analysis?.valueProposition || "",
      mainGoal: analysis?.mainGoal || "",
      platform: analysis?.platform || "",
      style: analysis?.style || "",
      priority: analysis?.priority || "",
      duration: analysis?.duration || "",
    }),
    [analysis]
  )

  const [answers, setAnswers] = useState(initialAnswers)
  const [questionIndex, setQuestionIndex] = useState(0)

  const currentField = missingFields[questionIndex]
  const totalQuestions = missingFields.length

  function updateAnswer(field, value) {
    setAnswers((previous) => ({
      ...previous,
      [field]: value,
    }))
  }

  function handleContinue() {
    if (!currentField || !answers[currentField]) {
      return
    }

    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex((previous) => previous + 1)
      return
    }

    finishBrief()
  }

  function handleBack() {
    if (questionIndex > 0) {
      setQuestionIndex((previous) => previous - 1)
      return
    }

    onBack()
  }

  function finishBrief() {
    const completedBrief = {
      originalGoal: goal,
      ...answers,
      contentType: analysis?.contentType || "",
      duration: answers.duration || analysis?.duration || "",
    }

    console.log("Final HexGuide brief:", completedBrief)

    onComplete(completedBrief)
  }

  const progress =
    totalQuestions === 0
      ? 100
      : Math.round(((questionIndex + 1) / totalQuestions) * 100)

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <button
          type="button"
          onClick={onBack}
          className="text-xl font-semibold tracking-tight"
        >
          HexGuide
        </button>

        <div className="text-sm text-slate-400">
          Creative Intelligence
        </div>
      </nav>

      <section className="mx-auto max-w-3xl px-6 pb-20 pt-12">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
            Adaptive Creative Interview
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Let's fill in what's missing.
          </h1>

          <p className="mt-3 leading-7 text-slate-400">
            HexGuide already understood part of your idea. We'll only ask
            about details that can improve the recommendation.
          </p>
        </div>

        {/* AI understanding */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-300">
              What HexGuide understood
            </p>

            <span className="text-xs text-slate-500">
              From your original idea
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {analysis?.product && (
              <Tag label={`Product: ${analysis.product}`} />
            )}

            {analysis?.audience && (
              <Tag label={`Audience: ${analysis.audience}`} />
            )}

            {analysis?.platform && (
              <Tag label={`Platform: ${analysis.platform}`} />
            )}

            {analysis?.style && (
              <Tag label={`Style: ${analysis.style}`} />
            )}

            {analysis?.mainGoal && (
              <Tag label={`Goal: ${analysis.mainGoal}`} />
            )}

            {analysis?.duration && (
              <Tag label={`Duration: ${analysis.duration}`} />
            )}

            {analysis?.contentType && (
              <Tag label={`Content: ${analysis.contentType}`} />
            )}
          </div>

          {analysis?.summary && (
            <p className="mt-4 border-t border-slate-800 pt-4 text-sm leading-6 text-slate-400">
              {analysis.summary}
            </p>
          )}
        </div>

        {/* Progress */}
        {totalQuestions > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">
                Question {questionIndex + 1} of {totalQuestions}
              </span>

              <span className="text-slate-500">
                {progress}%
              </span>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-white transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Question card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-7 shadow-2xl">
          {totalQuestions === 0 ? (
            <ReadyState
              answers={answers}
              onContinue={finishBrief}
            />
          ) : (
            <Question
              field={currentField}
              value={answers[currentField]}
              onChange={updateAnswer}
            />
          )}

          {totalQuestions > 0 && (
            <div className="mt-8 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
              >
                ← Back
              </button>

              <button
                type="button"
                onClick={handleContinue}
                disabled={!answers[currentField]}
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {questionIndex === totalQuestions - 1
                  ? "Review My Brief →"
                  : "Continue →"}
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

function Question({ field, value, onChange }) {
  const questions = {
    product: {
      title: "What are you promoting?",
      description:
        "Tell us about the product, service, or brand you're creating content for.",
      placeholder: "e.g. Premium handmade watch",
      type: "input",
    },

    audience: {
      title: "Who is this for?",
      description:
        "Describe the people you want this content to reach.",
      placeholder: "e.g. Young professionals aged 25–35",
      type: "input",
    },

    valueProposition: {
      title: "What makes your product worth choosing?",
      description:
        "Think about price, quality, ingredients, features, results, convenience, or anything that makes you different.",
      placeholder:
        "e.g. Handmade quality at a lower price than luxury brands",
      type: "input",
    },

    mainGoal: {
      title: "What's the main goal?",
      description:
        "What should this content achieve?",
      type: "options",
      options: [
        "Increase Sales",
        "Brand Awareness",
        "Social Engagement",
        "Product Launch",
      ],
    },

    platform: {
      title: "Where will you publish it?",
      description:
        "The platform affects format and creative direction.",
      type: "options",
      options: [
        "Instagram Reels",
        "TikTok",
        "YouTube",
        "Facebook",
        "Website",
        "Multiple Platforms",
      ],
    },

    style: {
      title: "What style fits your brand?",
      description:
        "Choose the closest match.",
      type: "options",
      options: [
        "UGC / Influencer",
        "Cinematic",
        "Premium",
        "Funny / Entertaining",
        "Educational",
        "Trend-driven",
        "Not sure",
      ],
    },

    priority: {
      title: "What matters most?",
      description:
        "This will influence how HexGuide ranks models and workflows.",
      type: "options",
      options: [
        "Highest Quality",
        "Fastest Generation",
        "Lower Cost",
        "Best Balance",
      ],
    },

    duration: {
      title: "How long should it be?",
      description:
        "Choose the approximate length of the content.",
      type: "options",
      options: [
        "10–15 seconds",
        "15–30 seconds",
        "30–60 seconds",
        "1–2 minutes",
      ],
    },
  }

  const config = questions[field]

  if (!config) {
    return (
      <div>
        <h2 className="text-3xl font-semibold">
          Something went wrong.
        </h2>

        <p className="mt-3 text-slate-400">
          HexGuide received an unsupported question type.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold tracking-tight">
        {config.title}
      </h2>

      <p className="mt-3 leading-7 text-slate-400">
        {config.description}
      </p>

      <div className="mt-8">
        {config.type === "input" ? (
          <input
            type="text"
            value={value || ""}
            onChange={(event) => onChange(field, event.target.value)}
            placeholder={config.placeholder}
            autoFocus
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-lg text-white outline-none transition placeholder:text-slate-600 focus:border-slate-400"
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {config.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onChange(field, option)}
                className={`rounded-2xl border p-5 text-left transition ${
                  value === option
                    ? "border-white bg-slate-800"
                    : "border-slate-700 bg-slate-950 hover:border-slate-500"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-semibold">
                    {option}
                  </span>

                  {value === option && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-950">
                      ✓
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ReadyState({ answers, onContinue }) {
  return (
    <div>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg font-bold text-slate-950">
        ✓
      </div>

      <h2 className="mt-6 text-3xl font-semibold">
        Your creative brief is ready.
      </h2>

      <p className="mt-3 leading-7 text-slate-400">
        HexGuide has enough information to start generating creative
        directions.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {Object.entries(answers)
          .filter(([, value]) => value)
          .map(([key, value]) => (
            <div
              key={key}
              className="rounded-xl border border-slate-800 bg-slate-950 p-4"
            >
              <p className="text-xs uppercase tracking-wider text-slate-500">
                {formatFieldName(key)}
              </p>

              <p className="mt-1 text-sm text-slate-200">
                {value}
              </p>
            </div>
          ))}
      </div>

      <button
        type="button"
        onClick={onContinue}
        className="mt-8 w-full rounded-xl bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
      >
        Continue to Creative Ideas →
      </button>
    </div>
  )
}

function Tag({ label }) {
  return (
    <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs text-slate-300">
      {label}
    </span>
  )
}

function formatFieldName(field) {
  const labels = {
    product: "Product",
    audience: "Audience",
    valueProposition: "Value Proposition",
    mainGoal: "Goal",
    platform: "Platform",
    style: "Style",
    priority: "Priority",
    duration: "Duration",
  }

  return labels[field] || field
}

export default Brief