import { useState } from 'react';
import { BaseNode } from './baseNode';
import { useStore } from '../store';
import { NodeField } from '../components/NodeField';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleNameChange = (e) => {
    const nextValue = e.target.value;
    setCurrName(nextValue);
    updateNodeField(id, 'outputName', nextValue);
  };

  const handleTypeChange = (e) => {
    const nextValue = e.target.value;
    setOutputType(nextValue);
    updateNodeField(id, 'outputType', nextValue);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      color="#f59e0b"
      inputs={[{ id: 'value', label: 'value' }]}
    >
      <NodeField id={`${id}-output-name`} label="Name">
        <input
          id={`${id}-output-name`}
          className="vs-input"
          type="text"
          value={currName}
          onChange={handleNameChange}
        />
      </NodeField>
      <NodeField id={`${id}-output-type`} label="Type">
        <select
          id={`${id}-output-type`}
          className="vs-select"
          value={outputType}
          onChange={handleTypeChange}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </NodeField>
    </BaseNode>
  );
};
