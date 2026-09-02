import fs from "fs";
import path from "path";

const promptPath = path.resolve(process.cwd(), "../prompts/meeting_intelligence_v2.md");

export const SYSTEM_PROMPT = fs.readFileSync(promptPath, "utf8");