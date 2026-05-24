import { useState } from 'react';
import { BaseNode } from './baseNode';
import { useStore } from '../store';
import { NodeField } from '../components/NodeField';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (e) => {
    const nextValue = e.target.value;
    setCurrName(nextValue);
    updateNodeField(id, 'inputName', nextValue);
  };

  const handleTypeChange = (e) => {
    const nextValue = e.target.value;
    setInputType(nextValue);
    updateNodeField(id, 'inputType', nextValue);
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="📥"
      color="#10b981"
      outputs={[{ id: 'value', label: 'value' }]}
    >
      <NodeField id={`${id}-input-name`} label="Name">
        <input
          id={`${id}-input-name`}
          className="vs-input"
          type="text"
          value={currName}
          onChange={handleNameChange}
        />
      </NodeField>
      <NodeField id={`${id}-input-type`} label="Type">
        <select
          id={`${id}-input-type`}
          className="vs-select"
          value={inputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </NodeField>
    </BaseNode>
  );
};
