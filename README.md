# Pipeline Builder Assessment

This repository contains:

- **Frontend**: a React + React Flow app for visually building a node pipeline.
- **Backend**: a FastAPI service that parses a submitted pipeline and returns:
  - `num_nodes`
  - `num_edges`
  - `is_dag`

## Prerequisites

- Node.js 18+
- npm
- Python 3.10+

## Run the backend

```bash
cd /home/runner/work/cyintern/cyintern/backend
python -m pip install fastapi uvicorn
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at `http://localhost:8000`.

## Run the frontend

```bash
cd /home/runner/work/cyintern/cyintern/frontend
npm ci
npm start
```

Frontend will be available at `http://localhost:3000`.

## Validation commands

```bash
cd /home/runner/work/cyintern/cyintern/frontend
CI=true npm test -- --watch=false --passWithNoTests
npm run build
```

## API contract

- **Endpoint**: `POST /pipelines/parse`
- **Body**: JSON object with `nodes` and `edges` arrays.
- **Response**:

```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```
