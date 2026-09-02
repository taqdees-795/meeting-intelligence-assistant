export default function ActionTable({ actions, onChange }) {
  if (!actions.length) {
    return <div className="empty-state">No action items identified.</div>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Owner</th>
            <th>Deadline</th>
            <th>Priority</th>
            <th>Evidence</th>
          </tr>
        </thead>
        <tbody>
          {actions.map((action, index) => (
            <tr key={index}>
              <td>
                <textarea
                  value={action.task}
                  onChange={(e) => onChange(index, "task", e.target.value)}
                />
              </td>
              <td>
                <input
                  value={action.owner ?? ""}
                  placeholder="Unknown"
                  onChange={(e) => onChange(index, "owner", e.target.value || null)}
                />
              </td>
              <td>
                <input
                  value={action.deadline ?? ""}
                  placeholder="Unknown"
                  onChange={(e) => onChange(index, "deadline", e.target.value || null)}
                />
              </td>
              <td>
                <select
                  value={action.priority ?? ""}
                  onChange={(e) => onChange(index, "priority", e.target.value || null)}
                >
                  <option value="">Unknown</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </td>
              <td>
                <textarea
                  value={action.evidence}
                  onChange={(e) => onChange(index, "evidence", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}