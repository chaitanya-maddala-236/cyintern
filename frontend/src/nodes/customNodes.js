import { useState } from 'react';
import { BaseNode } from './baseNode';

export const ApiNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');

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
      <div className="vs-field">
        <label className="vs-label" htmlFor={`${id}-method`}>
          Method
        </label>
        <select
          id={`${id}-method`}
          className="vs-select"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div className="vs-field">
        <label className="vs-label" htmlFor={`${id}-url`}>
          URL
        </label>
        <input
          id={`${id}-url`}
          className="vs-input"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com"
        />
      </div>
    </BaseNode>
  );
};

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || '');

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
      <div className="vs-field">
        <label className="vs-label" htmlFor={`${id}-condition`}>
          Condition
        </label>
        <input
          id={`${id}-condition`}
          className="vs-input"
          type="text"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          placeholder="value > 10"
        />
      </div>
    </BaseNode>
  );
};

export const TransformNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'JSON→String');

  return (
    <BaseNode
      id={id}
      title="Transform"
      icon="⚙️"
      color="#14b8a6"
      inputs={[{ id: 'input', label: 'input' }]}
      outputs={[{ id: 'output', label: 'output' }]}
    >
      <div className="vs-field">
        <label className="vs-label" htmlFor={`${id}-operation`}>
          Operation
        </label>
        <select
          id={`${id}-operation`}
          className="vs-select"
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
        >
          <option value="JSON→String">JSON→String</option>
          <option value="String→JSON">String→JSON</option>
          <option value="Uppercase">Uppercase</option>
          <option value="Lowercase">Lowercase</option>
          <option value="Trim">Trim</option>
        </select>
      </div>
    </BaseNode>
  );
};

export const NoteNode = ({ id, data }) => {
  const [note, setNote] = useState(data?.note || '');

  return (
    <BaseNode id={id} title="Note" icon="🗒️" color="#a3a3a3" minWidth={240}>
      <div className="vs-field">
        <label className="vs-label" htmlFor={`${id}-note`}>
          Notes
        </label>
        <textarea
          id={`${id}-note`}
          className="vs-textarea"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          placeholder="Comments..."
        />
      </div>
    </BaseNode>
  );
};

export const MergeNode = ({ id, data }) => {
  const [separator, setSeparator] = useState(data?.separator || ',');

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
      <div className="vs-field">
        <label className="vs-label" htmlFor={`${id}-separator`}>
          Separator
        </label>
        <input
          id={`${id}-separator`}
          className="vs-input"
          type="text"
          value={separator}
          onChange={(e) => setSeparator(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};
