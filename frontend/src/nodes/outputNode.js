import { useState } from 'react';
import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      color="#f59e0b"
      inputs={[{ id: 'value', label: 'value' }]}
    >
      <div className="vs-field">
        <label className="vs-label" htmlFor={`${id}-output-name`}>
          Name
        </label>
        <input
          id={`${id}-output-name`}
          className="vs-input"
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
        />
      </div>
      <div className="vs-field">
        <label className="vs-label" htmlFor={`${id}-output-type`}>
          Type
        </label>
        <select
          id={`${id}-output-type`}
          className="vs-select"
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};
