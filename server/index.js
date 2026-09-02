import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { analyzeMeeting } from "./services/gemini.js";  // agar aapne gemini.js banaya hai
import { validateMeetingOutput } from "./validator.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Meeting Intelligence Assistant" });
});

app.post("/api/analyze", async (req, res) => {
  try {
    const { meetingText } = req.body;

    if (typeof meetingText !== "string" || meetingText.trim().length === 0) {
      return res.status(400).json({ error: "Meeting text is required." });
    }

    if (meetingText.length > 50000) {
      return res.status(400).json({ error: "Meeting text is too long. Please keep it below 50,000 characters." });
    }

    const result = await analyzeMeeting(meetingText.trim());
    const validation = validateMeetingOutput(result);

    if (!validation.valid) {
      return res.status(502).json({ error: "Model output failed validation.", details: validation.errors });
    }

    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Analysis error:", error);
    res.status(500).json({ error: error?.message || "Something went wrong while analyzing the meeting." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`MIA server running on http://localhost:${PORT}`);
});