import { BaseNode } from './baseNode';

export const LLMNode = ({ id }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      color="#6366f1"
      inputs={[
        { id: 'system', label: 'system' },
        { id: 'prompt', label: 'prompt' },
      ]}
      outputs={[{ id: 'response', label: 'response' }]}
    >
      <div className="vs-field">
        <span className="vs-label" style={{ fontSize: 11, textTransform: 'none' }}>
          Add system + prompt inputs to generate a response.
        </span>
      </div>
    </BaseNode>
  );
};
