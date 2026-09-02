const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function analyzeMeeting(meetingText) {
  const response = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ meetingText })
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.error || "Analysis failed.");
  }

  return body.data;
}