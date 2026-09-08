import { recommendModels } from "../utils/modelRecommender"

function ModelRecommendation({
  brief,
  concept,
  onBack,
  onContinue,
}) {
  const recommendation = recommendModels(brief, concept)

  const { recommended, alternatives } = recommendation

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <button
          type="button"
          onClick={onBack}
          className="text-xl font-semibold tracking-tight transition hover:text-slate-300"
        >
          HexGuide
        </button>

        <div className="text-sm text-slate-400">
          Model Intelligence
        </div>
      </nav>

      <section className="mx-auto max-w-5xl px-6 pb-24 pt-8">
        {/* Top navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
          >
            ← Back to Concepts
          </button>

          <span className="text-sm text-slate-600">
            Step 4 of 5
          </span>
        </div>

        {/* Header */}
        <div className="mt-12 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
            Model Recommendation
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            We found the right tool for this direction.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            HexGuide compared your selected creative direction with
            its model capability map to find the strongest fit.
          </p>
        </div>

        {/* Selected concept */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-600">
                Selected direction
              </p>

              <h2 className="mt-2 text-2xl font-semibold">
                {concept?.title}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                {concept?.format}
              </p>
            </div>

            <button
              type="button"
              onClick={onBack}
              className="text-sm text-slate-500 transition hover:text-white"
            >
              Change direction
            </button>
          </div>

          <p className="mt-5 leading-7 text-slate-400">
            {concept?.description}
          </p>
        </div>

        {/* Recommended model */}
        <div className="mt-8 rounded-3xl border border-slate-600 bg-slate-900 p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="rounded-full border border-slate-600 bg-slate-950 px-3 py-1.5 text-xs font-medium text-slate-200">
              BEST MATCH
            </span>

            <span className="rounded-full bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300">
              {recommended.fitLabel}
            </span>
          </div>

          <div className="mt-8">
            <p className="text-sm text-slate-500">
              Recommended model
            </p>

            <h2 className="mt-2 text-4xl font-semibold">
              {recommended.name}
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              {recommended.provider} · {recommended.type}
            </p>
          </div>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            {recommended.description}
          </p>

          {/* Fit breakdown */}
          <div className="mt-10">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-600">
              Why this is the strongest fit
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <FitRow
                label="Creative direction"
                value={recommended.breakdown.concept}
              />

              <FitRow
                label="Goal"
                value={recommended.breakdown.goal}
              />

              <FitRow
                label="Platform"
                value={recommended.breakdown.platform}
              />

              <FitRow
                label="Priority"
                value={recommended.breakdown.priority}
              />

              <FitRow
                label="Capabilities"
                value={recommended.breakdown.capability}
              />
            </div>
          </div>

          {/* Reasons */}
          <div className="mt-10">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-600">
              HexGuide's reasoning
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {recommended.reasons.length > 0 ? (
                recommended.reasons.map((reason) => (
                  <div
                    key={reason}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                  >
                    <div className="flex gap-3">
                      <span className="text-slate-200">
                        ✓
                      </span>

                      <p className="text-sm leading-6 text-slate-300">
                        {reason}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">
                  HexGuide found a general fit based on the available
                  brief information.
                </p>
              )}
            </div>
          </div>

          {/* Strengths */}
          <div className="mt-10">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-600">
              Key strengths
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {recommended.strengths.map((strength) => (
                <span
                  key={strength}
                  className="rounded-full border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-300"
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>

          {/* Continue */}
          <button
            type="button"
            onClick={() => onContinue(recommended)}
            className="mt-10 w-full rounded-xl bg-white px-6 py-4 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Build My Production Plan →
          </button>
        </div>

        {/* Alternatives */}
        <div className="mt-10">
          <div className="mb-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-600">
              Alternatives
            </p>

            <h2 className="mt-2 text-2xl font-semibold">
              Other tools worth considering
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              HexGuide ranked these behind the recommended option based
              on the same brief and creative direction.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {alternatives.map((model, index) => (
              <AlternativeCard
                key={model.id}
                model={model}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Bottom back button */}
        <div className="mt-10 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
          >
            ← Choose a different direction
          </button>

          <span className="text-right text-xs text-slate-600">
            Model capabilities shown here are curated prototype metadata.
          </span>
        </div>
      </section>
    </main>
  )
}

function FitRow({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="text-sm text-slate-400">
          {label}
        </span>

        <span className="text-sm text-slate-300">
          {value}%
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-white transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

function AlternativeCard({ model, index }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-600">
          {String(index + 2).padStart(2, "0")}
        </span>

        <span className="rounded-full bg-slate-950 px-3 py-1.5 text-xs text-slate-400">
          {model.fitLabel}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-semibold">
        {model.name}
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        {model.provider}
      </p>

      <p className="mt-4 text-sm leading-6 text-slate-400">
        {model.description}
      </p>

      <div className="mt-5">
        <p className="text-xs uppercase tracking-wider text-slate-600">
          Why consider it
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          {model.reasons.length > 0
            ? model.reasons.slice(0, 2).join(" and ") + "."
            : "It remains a possible alternative for this brief."}
        </p>
      </div>
    </div>
  )
}

export default ModelRecommendation