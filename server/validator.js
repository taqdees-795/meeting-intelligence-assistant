const REQUIRED_TOP_LEVEL_FIELDS = [
  "meeting_title",
  "summary",
  "decisions",
  "action_items",
  "risks",
  "open_questions",
  "ambiguities"
];

export function validateMeetingOutput(data) {
  const errors = [];

  if (!data || typeof data !== "object") {
    return { valid: false, errors: ["Model output is not a JSON object."] };
  }

  for (const field of REQUIRED_TOP_LEVEL_FIELDS) {
    if (!(field in data)) {
      errors.push(`Missing field: ${field}`);
    }
  }

  if (typeof data.summary !== "string") {
    errors.push("summary must be a string.");
  }

  const arrayFields = ["decisions", "action_items", "risks", "open_questions", "ambiguities"];

  for (const field of arrayFields) {
    if (!Array.isArray(data[field])) {
      errors.push(`${field} must be an array.`);
    }
  }

  if (Array.isArray(data.action_items)) {
    data.action_items.forEach((item, index) => {
      if (!item.task) errors.push(`Action item ${index + 1} has no task.`);
      if (item.priority !== null && !["high", "medium", "low"].includes(item.priority))
        errors.push(`Invalid priority in action item ${index + 1}.`);
      if (!("owner" in item)) errors.push(`Action item ${index + 1} is missing owner.`);
      if (!("deadline" in item)) errors.push(`Action item ${index + 1} is missing deadline.`);
      if (!item.evidence) errors.push(`Action item ${index + 1} is missing evidence.`);
    });
  }

  return { valid: errors.length === 0, errors };
}