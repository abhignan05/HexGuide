import { useState } from "react"
import Brief from "./pages/Brief"
import Concepts from "./pages/Concepts"
import ModelRecommendation from "./pages/ModelRecommendation"
import ProductionPlan from "./pages/ProductionPlan"
import { analyzeGoal } from "./services/api"

function App() {
  const [goal, setGoal] = useState("")
  const [analysis, setAnalysis] = useState(null)
  const [brief, setBrief] = useState(null)
  const [selectedConcept, setSelectedConcept] = useState(null)
  const [selectedModel, setSelectedModel] = useState(null)

  const [currentPage, setCurrentPage] = useState("home")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleStart() {
    if (!goal.trim()) {
      return
    }

    try {
      setLoading(true)
      setError("")

      const result = await analyzeGoal(goal)

      console.log("Gemini analysis:", result)

      setAnalysis(result)
      setCurrentPage("brief")
    } catch (error) {
      console.error(error)

      setError(
        error.message ||
          "Something went wrong while analyzing your idea."
      )
    } finally {
      setLoading(false)
    }
  }

  function goHome() {
    setCurrentPage("home")
  }

  function goToBrief() {
    setCurrentPage("brief")
  }

  function goToConcepts() {
    setCurrentPage("concepts")
  }

  function goToRecommendation() {
    setCurrentPage("recommendation")
  }

  function goToProduction() {
    setCurrentPage("production")
  }

  /*
   * BRIEF
   */
  if (currentPage === "brief") {
    return (
      <Brief
        goal={goal}
        analysis={analysis}
        onBack={goHome}
        onComplete={(completedBrief) => {
          console.log("Completed brief:", completedBrief)

          setBrief(completedBrief)
          setSelectedConcept(null)
          setSelectedModel(null)

          goToConcepts()
        }}
      />
    )
  }

  /*
   * CONCEPTS
   */
  if (currentPage === "concepts") {
    return (
      <Concepts
        brief={brief}
        onBack={goToBrief}
        onChoose={(concept) => {
          console.log("Selected concept:", concept)

          setSelectedConcept(concept)
          setSelectedModel(null)

          goToRecommendation()
        }}
      />
    )
  }

  /*
   * MODEL RECOMMENDATION
   */
  if (currentPage === "recommendation") {
    return (
      <ModelRecommendation
        brief={brief}
        concept={selectedConcept}
        onBack={goToConcepts}
        onContinue={(model) => {
          console.log("Selected model:", model)

          setSelectedModel(model)

          goToProduction()
        }}
      />
    )
  }

  /*
   * PRODUCTION PLAN
   */
  if (currentPage === "production") {
    return (
      <ProductionPlan
        brief={brief}
        concept={selectedConcept}
        model={selectedModel}
        onBack={goToRecommendation}
      />
    )
  }

  /*
   * HOME
   */
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <button
          type="button"
          onClick={goHome}
          className="text-xl font-semibold tracking-tight"
        >
          HexGuide
        </button>

        <div className="text-sm text-slate-400">
          Creative Intelligence
        </div>
      </nav>

      <section className="mx-auto flex max-w-4xl flex-col items-center px-6 pb-24 pt-20 text-center">
        <div className="mb-6 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-300">
          AI creative guidance for everyone
        </div>

        <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
          Tell us what you want to achieve.
          <span className="block text-slate-400">
            We'll figure out how to create it.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          HexGuide helps you choose what to create, how to create it,
          and which AI tools are best for your goal — without needing
          to understand AI models.
        </p>

        <div className="mt-10 w-full max-w-2xl">
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-3 shadow-2xl">
            <textarea
              rows="4"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              placeholder="Example: I want to create an Instagram ad for my organic skincare product..."
              className="w-full resize-none bg-transparent p-3 text-base text-white outline-none placeholder:text-slate-500"
            />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleStart}
                disabled={loading || !goal.trim()}
                className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading
                  ? "Understanding your idea..."
                  : "Get Creative Guidance →"}
              </button>
            </div>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <p className="mt-3 text-xs text-slate-500">
            Start with your goal. You don't need to know which model
            to use.
          </p>
        </div>
      </section>

      <section className="border-t border-slate-900">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold">
              From idea to production plan
            </h2>

            <p className="mt-3 text-slate-400">
              HexGuide handles the decisions that usually make AI creation
              confusing.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <FeatureCard
              number="01"
              title="Understand"
              description="Tell us about your product, audience, goal, platform, and preferences."
            />

            <FeatureCard
              number="02"
              title="Recommend"
              description="Get creative concepts and AI model recommendations matched to your goal."
            />

            <FeatureCard
              number="03"
              title="Create"
              description="Get a ready-to-use script, prompt, and production workflow."
            />
          </div>
        </div>
      </section>
    </main>
  )
}

function FeatureCard({
  number,
  title,
  description,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
      <div className="text-sm font-medium text-slate-500">
        {number}
      </div>

      <h3 className="mt-4 text-xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-400">
        {description}
      </p>
    </div>
  )
}

export default App