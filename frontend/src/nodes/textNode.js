import { useEffect, useMemo, useRef, useState } from 'react';
import { BaseNode } from './baseNode';
import { useStore } from '../store';
import { NodeField } from '../components/NodeField';

const VARIABLE_HANDLE_PATTERN = /\{\{\s*([a-zA-Z_$][\w$]*)\s*\}\}/g;
const MIN_NODE_WIDTH = 220;
const MAX_NODE_WIDTH = 560;
const CHARACTER_WIDTH_ESTIMATE = 8;
const WIDTH_PADDING = 64;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [minWidth, setMinWidth] = useState(MIN_NODE_WIDTH);
  const textAreaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);

  const variables = useMemo(() => {
    const foundVariables = [];
    const foundSet = new Set();
    const matches = currText.matchAll(VARIABLE_HANDLE_PATTERN);

    for (const match of matches) {
      const variable = match[1];
      if (!foundSet.has(variable)) {
        foundSet.add(variable);
        foundVariables.push(variable);
      }
    }

    return foundVariables;
  }, [currText]);

  const handleTextChange = (e) => {
    const nextValue = e.target.value;
    setCurrText(nextValue);
    updateNodeField(id, 'text', nextValue);
  };

  useEffect(() => {
    const element = textAreaRef.current;
    if (!element) {
      return;
    }

    element.style.height = 'auto';
    element.style.height = `${element.scrollHeight}px`;

    const longestLineLength = currText
      .split('\n')
      .reduce((maxLength, line) => Math.max(maxLength, line.length), 0);
    const dynamicWidth = Math.min(
      MAX_NODE_WIDTH,
      Math.max(MIN_NODE_WIDTH, longestLineLength * CHARACTER_WIDTH_ESTIMATE + WIDTH_PADDING),
    );
    setMinWidth(dynamicWidth);
  }, [currText]);

  const inputHandles = variables.map((variable) => ({
    id: `var-${variable}`,
    label: variable,
  }));

  return (
    <BaseNode
      id={id}
      title="Text"
      icon="📝"
      color="#8b5cf6"
      inputs={inputHandles}
      outputs={[{ id: 'output', label: 'text' }]}
      minWidth={minWidth}
    >
      <NodeField id={`${id}-text`} label="Text">
        <textarea
          ref={textAreaRef}
          id={`${id}-text`}
          className="vs-textarea"
          value={currText}
          onChange={handleTextChange}
          rows={1}
          style={{ resize: 'none', overflow: 'hidden' }}
        />
      </NodeField>
    </BaseNode>
  );
};
