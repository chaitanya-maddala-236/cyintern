# VectorShift Pipeline Builder

A visual node-based pipeline editor built with React Flow, Zustand, and FastAPI.
Drag nodes onto the canvas, wire them together, and submit to validate your pipeline.

---

## Demo

![Pipeline Builder Demo](./demo.gif)

---

## Screenshots

| Canvas | Result Modal |
|--------|-------------|
| ![Canvas](./screenshots/canvas.png) | ![Modal](./screenshots/modal.png) |

---

## Features

- **Node abstraction** — all nodes are thin configs over a shared `BaseNode` component
- **9 node types** — Input, Output, LLM, Text, API, Filter, Transform, Merge, Note
- **Dynamic Text node** — auto-resizes as you type; detects `{{ variable }}` syntax and generates live input handles
- **Pipeline validation** — submit sends nodes + edges to FastAPI; backend returns node count, edge count, and DAG status
- **Dark themed UI** — custom CSS design system with IBM Plex Mono + Syne fonts

---

## Architecture

### Frontend

```text
frontend/src/
├── nodes/
│   ├── baseNode.js       ← shared container: handles, header, layout
│   ├── inputNode.js      ← thin config only
│   ├── outputNode.js     ← thin config only
│   ├── llmNode.js        ← thin config only
│   ├── textNode.js       ← config + auto-resize + variable handle logic
│   └── customNodes.js    ← Api, Filter, Transform, Note, Merge
├── components/
│   └── NodeField.js      ← shared field wrapper used by nodes
├── store.js              ← Zustand: nodes, edges, nodeIDs, updateNodeField
├── ui.js                 ← ReactFlow canvas
├── toolbar.js            ← draggable node palette
└── submit.js             ← POST to backend + result modal
```

**Key design decision:** `BaseNode` owns all handle rendering, node chrome (header, border, shadow), and layout. Individual node files only declare `inputs`, `outputs`, colors, and their unique fields. Adding a new node type takes ~20 lines.

### Backend

```text
backend/
├── main.py        ← FastAPI: POST /pipelines/parse
└── requirements.txt
```

Uses `networkx.is_directed_acyclic_graph()` for cycle detection. CORS configured for `localhost:3000`.

---

## Tech Stack

| Layer | Library |
|-------|---------|
| Canvas | React Flow 11 |
| State | Zustand 4 |
| Backend | FastAPI + Uvicorn |
| DAG check | NetworkX |
| Fonts | Syne, IBM Plex Mono |

---

## Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm start
```

Open `http://localhost:3000`.

---

## Tradeoffs & Future Improvements

- **No persistence** — pipeline state lives in memory; adding `localStorage` or a DB would enable save/load
- **No execution** — nodes are structural only; a runtime engine could evaluate the graph
- **Node search** — the toolbar could filter by keyword as the node count grows
- **Edge validation** — could warn when an input handle type (Text vs File) mismatches the connected output
