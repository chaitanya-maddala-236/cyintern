export const NodeField = ({ id, label, children }) => (
  <div className="vs-field">
    <label className="vs-label" htmlFor={id}>
      {label}
    </label>
    {children}
  </div>
);
