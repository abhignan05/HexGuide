import { useEffect, useRef, useState } from "react"
import { generateProductionPlan } from "../services/api"

function ProductionPlan({
  brief,
  concept,
  model,
  onBack,
}) {
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const hasLoaded = useRef(false)

  useEffect(() => {
    if (hasLoaded.current) {
      return
    }

    hasLoaded.current = true
    loadPlan()
  }, [])

  async function loadPlan() {
    try {
      setLoading(true)
      setError("")

      const result = await generateProductionPlan(
        brief,
        concept,
        model
      )

      setPlan(result)
    } catch (error) {
      console.error(error)

      setError(
        error.message ||
          "Unable to generate the production plan."
      )
    } finally {
      setLoading(false)
    }
  }

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
          Production Intelligence
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
            ← Back to Recommendation
          </button>

          <span className="text-sm text-slate-600">
            Step 5 of 5
          </span>
        </div>

        {/* Header */}
        <div className="mt-12 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
            Production Plan
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            Everything you need to create it.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            HexGuide turned your selected creative direction into a
            practical production plan.
          </p>
        </div>

        {/* Selected direction */}
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <SummaryCard
            label="CREATIVE DIRECTION"
            title={concept?.title}
            value={concept?.format}
          />

          <SummaryCard
            label="RECOMMENDED MODEL"
            title={model?.name}
            value={`${model?.provider || ""} · ${model?.type || ""}`}
          />
        </div>

        {loading && <LoadingState />}

        {!loading && error && (
          <ErrorState
            message={error}
            onRetry={loadPlan}
          />
        )}

        {!loading && !error && plan && (
          <div className="mt-8 space-y-8">
            {/* Objective */}
            <PlanSection
              number="01"
              title="Creative Objective"
            >
              <p className="text-lg leading-8 text-slate-300">
                {plan.creativeObjective}
              </p>
            </PlanSection>

            {/* Script */}
            <PlanSection
              number="02"
              title="Final Script"
            >
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
                <p className="whitespace-pre-line text-lg leading-8 text-slate-200">
                  {plan.script}
                </p>
              </div>
            </PlanSection>

            {/* Shot Plan */}
            <PlanSection
              number="03"
              title="Shot-by-Shot Plan"
            >
              <div className="space-y-4">
                {plan.shotPlan.map((shot) => (
                  <ShotCard
                    key={shot.shotNumber}
                    shot={shot}
                  />
                ))}
              </div>
            </PlanSection>

            {/* Prompts */}
            <PlanSection
              number="04"
              title="AI Generation Prompts"
            >
              <div className="space-y-4">
                {plan.prompts.map((item) => (
                  <PromptCard
                    key={item.shotNumber}
                    item={item}
                  />
                ))}
              </div>
            </PlanSection>

            {/* Workflow */}
            <PlanSection
              number="05"
              title="Production Workflow"
            >
              <div className="space-y-3">
                {plan.workflow.map((step, index) => (
                  <div
                    key={`${step}-${index}`}
                    className="flex gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold text-slate-300">
                      {index + 1}
                    </span>

                    <p className="leading-7 text-slate-300">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </PlanSection>

            {/* CTA */}
            <PlanSection
              number="06"
              title="Call to Action"
            >
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
                <p className="text-2xl font-semibold text-white">
                  {plan.callToAction}
                </p>
              </div>
            </PlanSection>

            {/* Notes */}
            <PlanSection
              number="07"
              title="Execution Notes"
            >
              <div className="grid gap-3 md:grid-cols-2">
                {plan.executionNotes.map((note, index) => (
                  <div
                    key={`${note}-${index}`}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                  >
                    <div className="flex gap-3">
                      <span className="text-slate-300">
                        ✓
                      </span>

                      <p className="text-sm leading-6 text-slate-400">
                        {note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </PlanSection>

            {/* Final action */}
            <div className="rounded-3xl border border-slate-700 bg-slate-900 p-8 text-center">
              <p className="text-sm uppercase tracking-wider text-slate-600">
                Ready to create?
              </p>

              <h2 className="mt-3 text-3xl font-semibold">
                Your creative decisions are made.
              </h2>

              <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-400">
                You have the concept, recommended model, script,
                prompts, and workflow. The next step is execution.
              </p>

              <button
                type="button"
                onClick={() => {
                  alert(
                    "Prototype action: this is where HexGuide would open the selected workflow in Creative Studio."
                  )
                }}
                className="mt-8 rounded-xl bg-white px-7 py-4 font-semibold text-slate-950 transition hover:bg-slate-200"
              >
                Create in Creative Studio →
              </button>
            </div>

            <button
              type="button"
              onClick={onBack}
              className="w-full rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
            >
              ← Back to Model Recommendation
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

function SummaryCard({
  label,
  title,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
      <p className="text-xs font-medium tracking-wider text-slate-600">
        {label}
      </p>

      <h2 className="mt-3 text-2xl font-semibold">
        {title || "Not specified"}
      </h2>

      <p className="mt-2 text-sm text-slate-400">
        {value || "Not specified"}
      </p>
    </div>
  )
}

function PlanSection({
  number,
  title,
  children,
}) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-7">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-slate-600">
          {number}
        </span>

        <h2 className="text-2xl font-semibold">
          {title}
        </h2>
      </div>

      <div className="mt-6">
        {children}
      </div>
    </section>
  )
}

function ShotCard({ shot }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-semibold">
          Shot {shot.shotNumber}
        </h3>

        <span className="rounded-full border border-slate-700 px-3 py-1.5 text-xs text-slate-400">
          {shot.timing}
        </span>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Detail
          label="Visual"
          value={shot.visual}
        />

        <Detail
          label="Action"
          value={shot.action}
        />

        <Detail
          label="On-screen text"
          value={shot.onScreenText}
        />

        <Detail
          label="Audio"
          value={shot.audio}
        />
      </div>
    </div>
  )
}

function PromptCard({ item }) {
  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(item.prompt)
      alert("Prompt copied.")
    } catch (error) {
      console.error(error)
      alert("Unable to copy prompt.")
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold">
            Shot {item.shotNumber}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {item.purpose}
          </p>
        </div>

        <button
          type="button"
          onClick={copyPrompt}
          className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
        >
          Copy
        </button>
      </div>

      <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900 p-4">
        <p className="text-sm leading-7 text-slate-300">
          {item.prompt}
        </p>
      </div>
    </div>
  )
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {value || "Not specified"}
      </p>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 px-6 py-20 text-center">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-white" />

      <h2 className="mt-6 text-2xl font-semibold">
        Building your production plan...
      </h2>

      <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-400">
        HexGuide is turning your chosen direction into a script,
        shot plan, prompts, and workflow.
      </p>
    </div>
  )
}

function ErrorState({
  message,
  onRetry,
}) {
  return (
    <div className="mt-8 rounded-3xl border border-red-950 bg-red-950/20 px-6 py-16 text-center">
      <h2 className="text-2xl font-semibold">
        We couldn't build the production plan.
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950"
      >
        Try again
      </button>
    </div>
  )
}

export default ProductionPlan