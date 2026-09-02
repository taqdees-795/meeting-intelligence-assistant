import { useState } from "react";
import Header from "./components/Header";
import MeetingInput from "./components/MeetingInput";
import Results from "./components/Results";
import TestScenarios from "./components/TestScenarios";
import { analyzeMeeting } from "./api";

export default function App() {
  const [meetingText, setMeetingText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async () => {
    if (!meetingText.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await analyzeMeeting(meetingText);
      setResult(data);
    } catch (err) {
      setError(err.message || "Unable to analyze meeting.");
    } finally {
      setLoading(false);
    }
  };

  const loadScenario = async (number) => {
    try {
      const response = await fetch(`/scenarios/meeting${number}.txt`);
      if (!response.ok) throw new Error("Scenario file not found.");
      const text = await response.text();
      setMeetingText(text);
      setResult(null);
      setError("");
    } catch {
      setError(`Could not load Meeting ${number}.`);
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="container">
        {/* HERO SECTION */}
        <div className="hero">
          <div>
            <span className="eyebrow">MOIN SYSTEMS AI</span>
            <h1>Turn meetings into<br />structured intelligence.</h1>
            <p>Extract decisions, actions, risks, questions and ambiguities — without inventing missing information.</p>
            
            <div className="workflow-steps">
              <div className="workflow-step active">01 Input</div>
              <div className="workflow-arrow">→</div>
              <div className="workflow-step">02 AI Analysis</div>
              <div className="workflow-arrow">→</div>
              <div className="workflow-step">03 Review</div>
              <div className="workflow-arrow">→</div>
              <div className="workflow-step">04 Export</div>
            </div>
          </div>
          
          <div className="hero-status">
            <span className="status-dot" />
            AI extraction ready
          </div>
        </div>

        {/* TEST SCENARIOS (Input ke UPAR hai, jaisa picture mein hai) */}
        <TestScenarios onLoadScenario={loadScenario} />

        {/* MEETING INPUT */}
        <MeetingInput
          value={meetingText}
          setValue={setMeetingText}
          onAnalyze={analyze}
          loading={loading}
        />

        {error && (
          <div className="error-box">
            <strong>Analysis Error</strong>
            <p>{error}</p>
          </div>
        )}

        {loading && (
          <div className="loading-card">
            <div className="spinner" />
            <div>
              <strong>Analyzing meeting...</strong>
              <p>Extracting decisions, actions, risks and ambiguities.</p>
            </div>
          </div>
        )}

        {result && <Results data={result} setData={setResult} />}

        <footer>
          Meeting Intelligence Assistant <span>•</span> Prompt Engineering Assessment
        </footer>
      </main>
    </div>
  );
}