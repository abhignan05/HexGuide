# HexGuide
## AI-Powered Creative Decision Assistant
**Live Demo:** https://hexguide.vercel.app
HexGuide helps non-technical creators move from a business or content goal to a practical AI content workflow.
Instead of asking a user to understand AI models first, HexGuide starts with the outcome the user wants. It understands the request, asks only for important missing information, creates creative options, recommends an appropriate model, and produces a production plan.
The central product principle is:
> **More information → fewer questions. Less information → more guidance.**
---

# 1. Problem
AI creative tools are powerful, but they also create more choices.
A non-technical user may know:
- what they want to promote
- who their audience is
- what result they want
but may not know:
- which creative direction to choose
- which format to use
- which AI model fits
- what model capabilities matter
- what prompts to write
- how to structure the workflow
A typical workflow can become:
```text
Choose model
 ↓
Choose style
 ↓
Choose format
 ↓
Write prompt
 ↓
Generate
 ↓
Review
 ↓
Retry
```
HexGuide changes the starting point from:
> **Which model should I use?**
to:
> **What are you trying to achieve?**
---

# 2. Product Insight
Different users need different amounts of guidance.
A detailed user should not have to answer a long questionnaire.
A vague user should receive more help.
Therefore:
```text
More information
      ↓
Fewer questions
      ↓
Less friction
```
and:
```text
Less information
      ↓
More guidance
      ↓
Better decision support
```
This is the foundation of HexGuide's adaptive interview.
---

# 3. Solution
HexGuide acts as a decision layer between a user's intent and AI creative tools.
The workflow is:
```text
User Goal
   ↓
Goal Understanding
   ↓
Adaptive Interview
   ↓
Creative Brief
   ↓
3 Creative Directions
   ↓
User Choice
   ↓
Model Recommendation
   ↓
Recommendation Reasoning
   ↓
Production Plan
   ↓
Creative Studio Handoff
```
The product focuses on reducing decision complexity while keeping the user in control.
---

# 4. Natural-Language Goal
The user starts with a normal description instead of a technical form.
Example:
```text
I want to create a 20-second Instagram Reel for my premium
watch brand targeting young professionals.
The goal is brand awareness and I want a cinematic style.
```
The user does not need to know model names or generation terminology.
The goal becomes the starting context for the entire workflow.
---

# 5. Goal Understanding
The initial request is sent to the analysis API.
Gemini extracts information such as:
- Product
- Audience
- Platform
- Style
- Duration
- Content type
- Main goal
- Value proposition
- Priority
The analysis also identifies information that is missing.
The model is instructed to avoid inventing details that were not provided by the user.
---

# 6. Adaptive Interview
Missing information becomes the basis for follow-up questions.
Possible fields include:
```text
Product
Audience
Value Proposition
Main Goal
Platform
Style
Priority
Duration
```
HexGuide does not automatically ask every question.
It asks only what is still needed for a useful creative decision.
This makes the interaction feel more like a conversation than a static form.
---

# 7. Value Proposition
HexGuide asks:
> **What makes your product worth choosing over similar products?**
This captures differentiation such as:
- price
- quality
- premium positioning
- convenience
- unique features
- experience
- results
The value proposition becomes part of the creative brief and influences later creative generation.
---

# 8. Structured Creative Brief
After the interview, HexGuide creates a structured brief.
It can contain:
```text
Product
Audience
Value Proposition
Main Goal
Platform
Style
Priority
Duration
Content Type
Original Goal
```
The brief acts as shared context for concept generation, recommendation, and production planning.
---

# 9. Creative Directions
HexGuide generates exactly three creative directions.
The objective is to provide meaningful alternatives rather than three minor variations.
Each direction can contain:
```text
Title
Label
Format
Duration
Description
Hook
Why It Fits
Creative Approach
```
Example directions:
```text
1. Cinematic Product Story
2. Problem-Solution Narrative
3. Fast-Paced Social Ad
```
The exact concepts are generated dynamically from the user's brief.
---

# 10. Why Three Directions?
Many users know they need content but do not know what the content should be.
This creates a blank-page problem.
HexGuide changes:
```text
What should I create?
```
into:
```text
Which direction do I prefer?
```
The system provides guidance without removing the user's creative choice.
---

# 11. User Selection
The user selects one of the three creative directions.
That direction becomes an important input for model recommendation.
This allows the recommender to consider not just the business requirements, but also the creative outcome the user selected.
---

# 12. Model Recommendation
HexGuide recommends an AI video model from its curated prototype catalog.
It considers:
```text
Creative Direction
+
Business Goal
+
Platform
+
User Priority
+
Technical Capabilities
```
The objective is not to find one universally best model.
The objective is to identify a suitable model for the specific creative task.
---

# 13. Recommendation Scoring
The prototype uses a weighted scoring approach:
| Factor | Weight |
|---|---:|
| Creative direction fit | 35% |
| Business goal fit | 20% |
| Platform fit | 15% |
| User priority | 15% |
| Technical capability fit | 15% |
The score is used internally to rank candidate models.
The user interface focuses on understandable fit labels instead of presenting a raw number as the main answer.
---

# 14. Concept-Aware Signals
The recommender also examines the selected concept.
Example signals include:
### Cinematic
```text
cinematic
realistic
visual
premium
product story
```
### Storytelling
```text
story
journey
narrative
progression
multi-shot
```
### Social
```text
social
TikTok
short-form
fast-paced
scroll
trend-driven
```
### UGC
```text
UGC
creator
influencer
testimonial
authentic
```
### Product
```text
product
close-up
macro
demonstration
detail
```
These signals are combined with the structured brief.
---

# 15. Explainable Recommendation
HexGuide does not simply return:
```text
Recommended Model: X
```
The recommendation page explains the decision through:
- Creative direction fit
- Goal fit
- Platform fit
- Priority fit
- Capability fit
- Reasoning
- Key strengths
- Alternatives
This is important for non-technical users because the recommendation should be understandable rather than becoming another black box.
---

# 16. Prototype Model Catalog
The prototype uses a small curated catalog to demonstrate contextual model routing.
Current representative models:
```text
Veo 3.1
Seedance 2.5
Seedance 2 Fast
```
The catalog contains prototype-level metadata describing model capabilities and suitable creative use cases.
It is intentionally small because the goal is to demonstrate the recommendation layer.
---

# 17. Veo 3.1
Prototype positioning includes:
- cinematic content
- realistic visuals
- premium storytelling
- product storytelling
- audio-supported workflows
- reference-image workflows
---

# 18. Seedance 2.5
Prototype positioning includes:
- multi-shot storytelling
- complex scenes
- social advertising
- product videos
- multimodal workflows
- audio-video workflows
---

# 19. Seedance 2 Fast
Prototype positioning includes:
- rapid iteration
- short-form social content
- UGC-style workflows
- trend-driven content
- fast experimentation
> **Note:** The model catalog is curated prototype metadata. It is not an official benchmark, independent ranking, or live pricing/performance database.
---

# 20. Production Plan
After the user selects a direction and receives a model recommendation, HexGuide generates a practical production plan.
It includes:
```text
Creative Objective
Final Script
Shot-by-Shot Plan
AI Generation Prompts
Production Workflow
Call to Action
Execution Notes
```
The aim is to bridge:
```text
Creative idea
      ↓
Production execution
```
---

# 21. Shot Plan
Each shot can contain:
```text
Shot number
Timing
Visual
Action
On-screen text
Audio
```
This gives the creator a concrete structure for execution.
---

# 23. Production Workflow
The plan also contains a practical execution sequence.
A simplified example is:
```text
Plan
 ↓
Generate assets
 ↓
Assemble shots
 ↓
Review
 ↓
Refine
 ↓
Finalize
```
The actual workflow is generated from the selected brief and concept.
---

# 24. Creative Studio Handoff
The final page contains:
```text
Create in Creative Studio →
```
This is currently a prototype placeholder.
It represents the point where the generated workflow could eventually be passed to Creative Studio.
The actual Studio integration is not implemented in this prototype.
---

# 25. Technical Architecture
```text
                     USER GOAL
                         │
                         ▼
                   React / Vite
                         │
                         ▼
                  /api/analyze
                         │
                         ▼
                      Gemini
                         │
                         ▼
               Structured Analysis
                         │
                         ▼
                Adaptive Interview
                         │
                         ▼
                  Creative Brief
                         │
                         ▼
                  /api/concepts
                         │
                         ▼
                      Gemini
                         │
                         ▼
               3 Creative Directions
                         │
                         ▼
                   User Selection
                         │
                         ▼
              Recommendation Engine
                  + Model Catalog
                         │
                         ▼
                Model Recommendation
                         │
                         ▼
             /api/production-plan
                         │
                         ▼
                      Gemini
                         │
                         ▼
                 Production Plan
                         │
                         ▼
              Creative Studio Handoff
```
---

# 26. Separation of Responsibilities
The architecture separates general language generation from product-specific application logic.
### Gemini handles
- goal understanding
- structured extraction
- concept generation
- production-plan generation
### HexGuide handles
- adaptive questioning
- brief construction
- concept selection
- model metadata
- recommendation scoring
- recommendation explanation
- workflow orchestration
HexGuide is therefore more than a simple prompt wrapper around an LLM.
---

# 28. API Routes
The application currently uses:
```text
POST /api/analyze
POST /api/concepts
POST /api/production-plan
```
The calls are handled through server-side API routes.
This keeps the Gemini API key out of the React client.
---

# 29. /api/analyze
### Purpose
Understand the user's initial goal and identify missing information.
### Input
```json
{
  "goal": "Create a premium Instagram video for my watch brand."
}
```
### Main output
```text
product
audience
platform
style
duration
contentType
mainGoal
valueProposition
priority
missingFields
summary
```
The `missingFields` result drives the adaptive interview.
---

# 30. /api/concepts
### Purpose
Generate three creative directions from the completed brief.
### Output
Each concept contains fields such as:
```text
title
label
format
duration
description
hook
whyItFits
creativeApproach
```
---

# 31. /api/production-plan
### Purpose
Generate the production workflow for the selected creative direction.
### Input
```text
brief
concept
model
```
### Output
```text
creativeObjective
script
shotPlan
prompts
workflow
callToAction
executionNotes
```
---

# 32. Frontend Structure
Main React pages:
```text
Brief.jsx
Concepts.jsx
ModelRecommendation.jsx
ProductionPlan.jsx
```
The main `App.jsx` manages the overall flow and shared state.
The page sequence is:
```text
Home
 ↓
Brief
 ↓
Concepts
 ↓
Model Recommendation
 ↓
Production Plan
```
Back navigation is supported.
---

# 33. Project Structure
```text
HexGuide/
│
├── api/
│   ├── analyze.js
│   ├── concepts.js
│   └── production-plan.js
│
├── public/
│
├── src/
│   ├── assets/
│   ├── data/
│   │   └── modelCatalog.js
│   ├── pages/
│   │   ├── Brief.jsx
│   │   ├── Concepts.jsx
│   │   ├── ModelRecommendation.jsx
│   │   └── ProductionPlan.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── modelRecommender.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```
---

# 34. Technology Stack
### Frontend
- React
- Vite
- JavaScript
- CSS
### Backend
- Node.js
- Vercel Serverless Functions
### AI
- Google Gemini
- `@google/genai`
### Deployment
- Vercel
### Recommendation
- Custom JavaScript scoring
- Curated model metadata
---

# 35. Environment Variables
HexGuide requires:
```env
GEMINI_API_KEY=your_gemini_api_key
```
The key is used by server-side API routes and must not be embedded in frontend code.
For deployment, it is stored as a secret environment variable in Vercel.
---

# 36. Security
Sensitive credentials should remain outside source control.
The following should not be committed:
```text
.env
.env.local
node_modules/
dist/
backend/.venv/
```
API keys must never be committed to GitHub.
---

# 37. Local Setup
Clone the repository:
```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd HexGuide
```
Install dependencies:
```bash
npm install
```
Create `.env`:
```env
GEMINI_API_KEY=your_gemini_api_key
```
Run the application:
```bash
npm run dev
```
For local Vercel development:
```bash
vercel dev
```
---

# 38. Production Build
Build the project with:
```bash
npm run build
```
The successful build creates the `dist` directory.
The current application successfully passes the production build.
---

# 39. Deployment
HexGuide is deployed on Vercel.
### Live Demo
**https://hexguide.vercel.app**
Deployment architecture:
```text
Browser
 ↓
Vercel
 ├── React / Vite frontend
 └── Serverless API routes
       ↓
    Gemini API
```
The public deployment has been manually tested.
---

# 40. Testing
The prototype was validated across:
- Gemini integration
- API routes
- adaptive interview
- dynamic concept generation
- recommendation logic
- production planning
- production build
- public deployment
---

# 41. Gemini Testing
A direct Gemini test was used to verify structured output for goal analysis.
The test successfully returned the expected structured fields.
---

# 42. API Testing
The `/api/analyze` route was tested through the local Vercel development environment.
It successfully returned structured information to the frontend.
---

# 43. Adaptive Interview Testing
Detailed and vague goals were tested.
Detailed inputs produced fewer missing fields.
Vague inputs produced more questions.
This validated:
```text
More context → fewer questions
Less context → more questions
```
---

# 44. Concept Testing
Different briefs were used to verify that concept generation responds to:
- product
- audience
- goal
- platform
- style
- value proposition
The Concepts page is dynamic rather than hard-coded.
---

# 45. Recommendation Testing
Different creative directions were tested.
An early recommendation approach could produce overly similar or perfect-looking results.
The system was improved to combine:
- creative concept signals
- goal
- platform
- priority
- technical capabilities
The UI was also changed to emphasize fit labels and reasoning.
---

# 46. Production Plan Testing
The production-plan stage was tested with:
```text
Completed Brief
+
Selected Concept
+
Recommended Model
```
The output was verified to contain:
```text
Objective
Script
Shot Plan
Prompts
Workflow
CTA
Execution Notes
```
---
