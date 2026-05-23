import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div className="toolbar">
      <DraggableNode type="customInput" label="📥 Input" />
      <DraggableNode type="llm" label="🤖 LLM" />
      <DraggableNode type="customOutput" label="📤 Output" />
      <DraggableNode type="text" label="📝 Text" />
      <DraggableNode type="api" label="🌐 API" />
      <DraggableNode type="filter" label="🔀 Filter" />
      <DraggableNode type="transform" label="⚙️ Transform" />
      <DraggableNode type="note" label="🗒️ Note" />
      <DraggableNode type="merge" label="🔗 Merge" />
    </div>
  );
};
