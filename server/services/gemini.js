import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { meetingSchema } from "../schema.js";
import { SYSTEM_PROMPT } from "../prompt.js";

dotenv.config();

const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function analyzeMeeting(meetingText) {
  const response = await client.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
    contents: `<meeting>\n${meetingText}\n</meeting>`,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseJsonSchema: meetingSchema
    }
  });

  const text = response.text;

  if (!text) {
    throw new Error("The model returned an empty response.");
  }

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("The model returned malformed JSON.");
  }

  return parsed;
}