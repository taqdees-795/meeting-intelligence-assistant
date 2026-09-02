# Meeting Intelligence Assistant

MIA is a small AI-powered meeting intelligence application.

It transforms meeting transcripts into:

- Decisions
- Action items
- Risks
- Open questions
- Ambiguities
- Evidence

The system is designed to be conservative:
missing information is represented as null instead of being
invented.

---

## Features

- Paste meeting transcript
- Analyze with AI
- Structured JSON output
- Strict JSON schema
- Evidence for extracted information
- Missing owner/deadline handling
- Decision vs proposal distinction
- Conflict detection
- Ambiguity detection
- Human editing
- JSON export
- CSV export
- Five-scenario test mode
- Prompt V1/V2 evaluation
- Instruction/data boundary protection

---

# Tech Stack

Frontend:

- React
- Vite
- CSS

Backend:

- Node.js
- Express

AI:

- OpenAI Responses API

---

# Project Structure

```text
meeting-intelligence-assistant/

client/
server/
prompts/
tests/
outputs/
evaluation/
README.md
