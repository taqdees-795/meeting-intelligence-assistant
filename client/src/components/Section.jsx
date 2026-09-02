export default function Section({ title, count, children }) {
  return (
    <section className="result-section">
      <div className="result-section-header">
        <h3>{title}</h3>
        {count !== undefined && <span className="count-badge">{count}</span>}
      </div>
      {children}
    </section>
  );
}