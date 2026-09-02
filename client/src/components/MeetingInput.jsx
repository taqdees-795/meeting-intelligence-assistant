export default function MeetingInput({ value, setValue, onAnalyze, loading }) {
  return (
    <section className="input-card">
      <div className="section-heading">
        <div>
          <h2>Meeting Transcript</h2>
          <p>Paste meeting notes or transcript below.</p>
        </div>
      </div>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Paste your meeting transcript here..."
        className="meeting-textarea"
      />

      <div className="input-footer">
        <span>{value.length} characters</span>
        <button
          className="primary-button"
          disabled={loading || value.trim().length === 0}
          onClick={onAnalyze}
        >
          {loading ? "Analyzing..." : "Analyze Meeting"}
        </button>
      </div>
    </section>
  );
}