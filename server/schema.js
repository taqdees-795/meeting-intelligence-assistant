export const meetingSchema = {
  type: "object",
  additionalProperties: false,
  required: [
    "meeting_title",
    "summary",
    "decisions",
    "action_items",
    "risks",
    "open_questions",
    "ambiguities"
  ],
  properties: {
    meeting_title: {
      type: ["string", "null"],
      title: "Meeting Title"  // Gemini ke liye yeh add karein
    },
    summary: {
      type: "string",
      title: "Summary"  // Gemini ke liye yeh add karein
    },
    decisions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["decision", "evidence"],
        properties: {
          decision: { type: "string" },
          evidence: { type: "string" }
        }
      }
    },
    action_items: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["task", "owner", "deadline", "priority", "evidence"],
        properties: {
          task: { type: "string" },
          owner: { type: ["string", "null"] },
          deadline: { type: ["string", "null"] },
          priority: { type: ["string", "null"], enum: ["high", "medium", "low", null] },
          evidence: { type: "string" }
        }
      }
    },
    risks: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["risk", "evidence"],
        properties: {
          risk: { type: "string" },
          evidence: { type: "string" }
        }
      }
    },
    open_questions: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["question", "owner", "evidence"],
        properties: {
          question: { type: "string" },
          owner: { type: ["string", "null"] },
          evidence: { type: "string" }
        }
      }
    },
    ambiguities: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["issue", "why_ambiguous", "evidence"],
        properties: {
          issue: { type: "string" },
          why_ambiguous: { type: "string" },
          evidence: { type: "string" }
        }
      }
    }
  }
};