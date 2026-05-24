import { useState } from 'react';
import { BaseNode } from './baseNode';
import { useStore } from '../store';
import { NodeField } from '../components/NodeField';

export const ApiNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');
  const updateNodeField = useStore((state) => state.updateNodeField);

  return (
    <BaseNode
      id={id}
      title="API"
      icon="🌐"
      color="#0ea5e9"
      inputs={[{ id: 'body', label: 'body' }]}
      outputs={[
        { id: 'response', label: 'response' },
        { id: 'status', label: 'status' },
      ]}
    >
      <NodeField id={`${id}-method`} label="Method">
        <select
          id={`${id}-method`}
          className="vs-select"
          value={method}
          onChange={(e) => {
            const nextValue = e.target.value;
            setMethod(nextValue);
            updateNodeField(id, 'method', nextValue);
          }}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </NodeField>
      <NodeField id={`${id}-url`} label="URL">
        <input
          id={`${id}-url`}
          className="vs-input"
          type="text"
          value={url}
          onChange={(e) => {
            const nextValue = e.target.value;
            setUrl(nextValue);
            updateNodeField(id, 'url', nextValue);
          }}
          placeholder="https://api.example.com"
        />
      </NodeField>
    </BaseNode>
  );
};

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');
  const updateNodeField = useStore((state) => state.updateNodeField);

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="🔀"
      color="#ec4899"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[
        { id: 'true', label: 'true ✓' },
        { id: 'false', label: 'false ✗' },
      ]}
    >
      <NodeField id={`${id}-condition`} label="Condition">
        <input
          id={`${id}-condition`}
          className="vs-input"
          type="text"
          value={condition}
          onChange={(e) => {
            const nextValue = e.target.value;
            setCondition(nextValue);
            updateNodeField(id, 'condition', nextValue);
          }}
          placeholder="value > 10"
        />
      </NodeField>
    </BaseNode>
  );
};

export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'JSON→String');
  const updateNodeField = useStore((state) => state.updateNodeField);

  return (
    <BaseNode
      id={id}
      title="Transform"
      icon="⚙️"
      color="#14b8a6"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[{ id: 'output', label: 'output' }]}
    >
      <NodeField id={`${id}-operation`} label="Operation">
        <select
          id={`${id}-operation`}
          className="vs-select"
          value={operation}
          onChange={(e) => {
            const nextValue = e.target.value;
            setOperation(nextValue);
            updateNodeField(id, 'operation', nextValue);
          }}
        >
          <option value="JSON→String">JSON→String</option>
          <option value="String→JSON">String→JSON</option>
          <option value="Uppercase">Uppercase</option>
          <option value="Lowercase">Lowercase</option>
          <option value="Trim">Trim</option>
        </select>
      </NodeField>
    </BaseNode>
  );
};

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || '');
  const updateNodeField = useStore((state) => state.updateNodeField);

  return (
    <BaseNode id={id} title="Note" icon="🗒️" color="#a3a3a3" minWidth={240}>
      <NodeField id={`${id}-note`} label="Notes">
        <textarea
          id={`${id}-note`}
          className="vs-textarea vs-textarea--resizable"
          value={note}
          onChange={(e) => {
            const nextValue = e.target.value;
            setNote(nextValue);
            updateNodeField(id, 'note', nextValue);
          }}
          rows={4}
          placeholder="Comments..."
        />
      </NodeField>
    </BaseNode>
  );
};

export const MergeNode = ({ id, data }) => {
  const [separator, setSeparator] = useState(data?.separator || ',');
  const updateNodeField = useStore((state) => state.updateNodeField);

  return (
    <BaseNode
      id={id}
      title="Merge"
      icon="🔗"
      color="#f97316"
      inputs={[
        { id: 'A', label: 'A' },
        { id: 'B', label: 'B' },
        { id: 'C', label: 'C' },
      ]}
      outputs={[{ id: 'merged', label: 'merged' }]}
    >
      <NodeField id={`${id}-separator`} label="Separator">
        <input
          id={`${id}-separator`}
          className="vs-input"
          type="text"
          value={separator}
          onChange={(e) => {
            const nextValue = e.target.value;
            setSeparator(nextValue);
            updateNodeField(id, 'separator', nextValue);
          }}
        />
      </NodeField>
    </BaseNode>
  );
};
