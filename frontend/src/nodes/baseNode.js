import { Handle, Position } from 'reactflow';

const handleTop = (index, total) => `${((index + 1) / (total + 1)) * 100}%`;

export const BaseNode = ({
  id,
  title,
  icon,
  color,
  inputs = [],
  outputs = [],
  children,
  minWidth = 220,
}) => {
  return (
    <div className="vs-node" style={{ minWidth }}>
      {inputs.map((input, index) => {
        const top = handleTop(index, inputs.length);
        return (
          <div key={input.id} style={{ position: 'absolute', left: 0, top }}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${input.id}`}
              style={{ top: 0, transform: 'translate(-50%, -50%)' }}
            />
            <span className="vs-handle-label" style={{ left: 10, top: -6 }}>
              {input.label}
            </span>
          </div>
        );
      })}

      {outputs.map((output, index) => {
        const top = handleTop(index, outputs.length);
        return (
          <div key={output.id} style={{ position: 'absolute', right: 0, top }}>
            <Handle
              type="source"
              position={Position.Right}
              id={`${id}-${output.id}`}
              style={{ top: 0, transform: 'translate(50%, -50%)' }}
            />
            <span className="vs-handle-label" style={{ right: 10, top: -6 }}>
              {output.label}
            </span>
          </div>
        );
      })}

      <div className="vs-node-header" style={{ background: color }}>
        <span>{icon}</span>
        <span>{title}</span>
      </div>
      <div className="vs-node-body">{children}</div>
    </div>
  );
};
