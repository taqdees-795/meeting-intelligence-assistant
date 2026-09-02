export default function TestScenarios({ onLoadScenario }) {
  return (
    <section className="test-card">
      <div>
        <span className="eyebrow">TEST MODE</span>
        <h2>Five Scenario Regression Test</h2>
        <p>Run the same workflow against all five supplied meeting scenarios.</p>
      </div>
      <div className="scenario-grid">
        {[1, 2, 3, 4, 5].map((number) => (
          <button key={number} onClick={() => onLoadScenario(number)}>
            <span>Meeting {number}</span>
            <small>Load scenario</small>
          </button>
        ))}
      </div>
    </section>
  );
}