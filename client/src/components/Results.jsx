import Section from "./Section";
import ActionTable from "./ActionTable";

export default function Results({ data, setData }) {
  if (!data) return null;

  const updateAction = (index, field, value) => {
    const updated = {
      ...data,
      action_items: data.action_items.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    };
    setData(updated);
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "meeting-intelligence.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportCSV = () => {
    const headers = ["Task", "Owner", "Deadline", "Priority", "Evidence"];
    const rows = data.action_items.map((item) => [
      item.task,
      item.owner ?? "",
      item.deadline ?? "",
      item.priority ?? "",
      item.evidence
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "meeting-action-items.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="results-card">
      {/* Success Header */}
      <div className="results-top">
        <div>
          <div className="analysis-success-badge">
            <span className="success-icon">✓</span> AI Analysis Complete
          </div>
          <h2>Meeting Intelligence</h2>
          <p>Review and edit the AI-generated structured output.</p>
        </div>
        <div className="export-buttons">
          <button onClick={exportJSON} className="secondary-button">Export JSON</button>
          <button onClick={exportCSV} className="secondary-button">Export CSV</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Decisions</span>
          <span className="stat-value">{data.decisions.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Actions</span>
          <span className="stat-value">{data.action_items.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Risks</span>
          <span className="stat-value">{data.risks.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Open Questions</span>
          <span className="stat-value">{data.open_questions.length}</span>
        </div>
      </div>

      <div className="summary-box">
        <label>Summary</label>
        <textarea
          value={data.summary}
          onChange={(e) => setData({ ...data, summary: e.target.value })}
        />
      </div>

      <Section title="Decisions" count={data.decisions.length}>
        {data.decisions.length === 0 ? (
          <div className="empty-state">No explicit decisions identified.</div>
        ) : (
          data.decisions.map((decision, index) => (
            <div className="decision-card" key={index}>
              <textarea
                value={decision.decision}
                onChange={(e) => {
                  const updated = [...data.decisions];
                  updated[index] = { ...updated[index], decision: e.target.value };
                  setData({ ...data, decisions: updated });
                }}
              />
              <div className="evidence">Evidence: {decision.evidence}</div>
            </div>
          ))
        )}
      </Section>

      <Section title="Action Items" count={data.action_items.length}>
        <ActionTable actions={data.action_items} onChange={updateAction} />
      </Section>

      <Section title="Risks" count={data.risks.length}>
        {data.risks.length === 0 ? (
          <div className="empty-state">No explicit risks identified.</div>
        ) : (
          data.risks.map((risk, index) => (
            <div className="list-card" key={index}>
              <strong>{risk.risk}</strong>
              <div className="evidence">Evidence: {risk.evidence}</div>
            </div>
          ))
        )}
      </Section>

      <Section title="Open Questions" count={data.open_questions.length}>
        {data.open_questions.length === 0 ? (
          <div className="empty-state">No open questions identified.</div>
        ) : (
          data.open_questions.map((question, index) => (
            <div className="list-card" key={index}>
              <strong>{question.question}</strong>
              <div>Owner: {question.owner ?? "Unknown"}</div>
              <div className="evidence">Evidence: {question.evidence}</div>
            </div>
          ))
        )}
      </Section>

      <Section title="Ambiguities & Conflicts" count={data.ambiguities.length}>
        {data.ambiguities.length === 0 ? (
          <div className="empty-state">No unresolved ambiguities identified.</div>
        ) : (
          data.ambiguities.map((item, index) => (
            <div className="ambiguity-card" key={index}>
              <strong>{item.issue}</strong>
              <p>{item.why_ambiguous}</p>
              <div className="evidence">Evidence: {item.evidence}</div>
            </div>
          ))
        )}
      </Section>
    </section>
  );
}