import { useEffect, useRef, useState } from "react"
import { generateConcepts } from "../services/api"

function Concepts({ brief, onBack, onChoose }) {
  const [concepts, setConcepts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const hasLoaded = useRef(false)

  useEffect(() => {
    if (hasLoaded.current) {
      return
    }

    hasLoaded.current = true
    loadConcepts()
  }, [])

  async function loadConcepts() {
    try {
      setLoading(true)
      setError("")

      const result = await generateConcepts(brief)

      setConcepts(result.concepts || [])
    } catch (error) {
      console.error(error)

      setError(
        error.message || "Unable to generate creative concepts."
      )
    } finally {
      setLoading(false)
    }
  }

  function handleChoose(concept) {
    console.log("Selected concept:", concept)

    onChoose(concept)
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
          Creative Intelligence
        </div>
      </nav>

      {/* Header */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-8">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
          >
            ← Back to Brief
          </button>

          <span className="text-sm text-slate-600">
            Step 3 of 5
          </span>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
            Creative Directions
          </p>

          <h1 className="mx-auto mt-4 max-w-4xl text-5xl font-semibold leading-tight tracking-tight">
            Here are three ways to bring your idea to life.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            HexGuide turned your completed brief into three different
            creative approaches. Choose the direction that feels right
            for your goal.
          </p>
        </div>

        {/* Brief summary */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryItem
              label="PRODUCT"
              value={brief?.product}
            />

            <SummaryItem
              label="AUDIENCE"
              value={brief?.audience}
            />

            <SummaryItem
              label="GOAL"
              value={brief?.mainGoal}
            />

            <SummaryItem
              label="PLATFORM"
              value={brief?.platform}
            />
          </div>
        </div>
      </section>

      {/* Concepts */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        {loading && <LoadingState />}

        {!loading && error && (
          <ErrorState
            message={error}
            onRetry={loadConcepts}
          />
        )}

        {!loading && !error && (
          <>
            <div className="grid gap-6 lg:grid-cols-3">
              {concepts.map((concept, index) => (
                <ConceptCard
                  key={`${concept.title}-${index}`}
                  concept={concept}
                  number={String(index + 1).padStart(2, "0")}
                  onChoose={handleChoose}
                />
              ))}
            </div>

            <div className="mt-10 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onBack}
                className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-500 hover:text-white"
              >
                ← Back to Brief
              </button>

              <p className="text-right text-sm text-slate-600">
                Select a direction to continue to model recommendations.
              </p>
            </div>
          </>
        )}
      </section>
    </main>
  )
}

function ConceptCard({ concept, number, onChoose }) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition hover:-translate-y-1 hover:border-slate-600">
      {/* Top row */}
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-medium text-slate-300">
          {concept.label}
        </span>

        <span className="text-sm text-slate-500">
          {concept.duration}
        </span>
      </div>

      {/* Number */}
      <div className="mt-8 text-sm font-medium text-slate-600">
        {number}
      </div>

      {/* Title */}
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">
        {concept.title}
      </h2>

      {/* Format */}
      <p className="mt-2 text-sm font-medium text-slate-400">
        {concept.format}
      </p>

      {/* Description */}
      <p className="mt-5 leading-7 text-slate-400">
        {concept.description}
      </p>

      {/* Hook */}
      <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-4">
        <p className="text-xs uppercase tracking-wider text-slate-600">
          Hook
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-200">
          “{concept.hook}”
        </p>
      </div>

      {/* Why it fits */}
      <div className="mt-4">
        <p className="text-xs uppercase tracking-wider text-slate-600">
          Why it fits
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          {concept.whyItFits}
        </p>
      </div>

      {/* Creative approach */}
      <div className="mt-4">
        <p className="text-xs uppercase tracking-wider text-slate-600">
          Creative approach
        </p>

        <p className="mt-2 text-sm leading-6 text-slate-400">
          {concept.creativeApproach}
        </p>
      </div>

      {/* Choose */}
      <div className="mt-auto pt-8">
        <button
          type="button"
          onClick={() => onChoose(concept)}
          className="w-full rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
        >
          Choose this direction →
        </button>
      </div>
    </article>
  )
}

function SummaryItem({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-2 text-sm text-slate-200">
        {value || "Not specified"}
      </p>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 px-6 py-20 text-center">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-white" />

      <h2 className="mt-6 text-2xl font-semibold">
        Developing your creative directions...
      </h2>

      <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-400">
        HexGuide is turning your brief into three distinct approaches
        based on your audience, goal, platform, style, and priorities.
      </p>
    </div>
  )
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-3xl border border-red-950 bg-red-950/20 px-6 py-16 text-center">
      <h2 className="text-2xl font-semibold">
        We couldn't generate the concepts.
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

export default Concepts