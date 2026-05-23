import { useState } from 'react';
import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="📥"
      color="#10b981"
      outputs={[{ id: 'value', label: 'value' }]}
    >
      <div className="vs-field">
        <label className="vs-label" htmlFor={`${id}-input-name`}>
          Name
        </label>
        <input
          id={`${id}-input-name`}
          className="vs-input"
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
        />
      </div>
      <div className="vs-field">
        <label className="vs-label" htmlFor={`${id}-input-type`}>
          Type
        </label>
        <select
          id={`${id}-input-type`}
          className="vs-select"
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};
