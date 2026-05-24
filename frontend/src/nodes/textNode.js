import { useEffect, useMemo, useRef, useState } from 'react';
import { BaseNode } from './baseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [minWidth, setMinWidth] = useState(220);
  const textAreaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);

  const variables = useMemo(() => {
    const foundVariables = [];
    const foundSet = new Set();
    const regex = /\{\{\s*([a-zA-Z_$][\w$]*)\s*\}\}/g;
    let match = regex.exec(currText);

    while (match) {
      const variable = match[1];
      if (!foundSet.has(variable)) {
        foundSet.add(variable);
        foundVariables.push(variable);
      }
      match = regex.exec(currText);
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
    const dynamicWidth = Math.min(560, Math.max(220, longestLineLength * 8 + 64));
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
      <div className="vs-field">
        <label className="vs-label" htmlFor={`${id}-text`}>
          Text
        </label>
        <textarea
          ref={textAreaRef}
          id={`${id}-text`}
          className="vs-textarea"
          value={currText}
          onChange={handleTextChange}
          rows={1}
          style={{ resize: 'none', overflow: 'hidden' }}
        />
      </div>
    </BaseNode>
  );
};
