from collections import defaultdict, deque
import os
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI()
cors_origins = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ALLOW_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000",
    ).split(",")
    if origin.strip()
]
cors_allow_credentials = "*" not in cors_origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=cors_allow_credentials,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)


class PipelineParseRequest(BaseModel):
    nodes: list[dict[str, Any]] = Field(default_factory=list)
    edges: list[dict[str, Any]] = Field(default_factory=list)


def _is_dag(nodes: list[dict[str, Any]], edges: list[dict[str, Any]]) -> bool:
    node_ids = {str(node["id"]) for node in nodes if "id" in node and node["id"] is not None}
    indegree: dict[str, int] = {node_id: 0 for node_id in node_ids}
    graph: dict[str, list[str]] = defaultdict(list)

    for edge in edges:
        raw_source = edge.get("source")
        raw_target = edge.get("target")
        if raw_source is None or raw_target is None:
            continue

        source = str(raw_source)
        target = str(raw_target)

        if source in node_ids and target in node_ids:
            graph[source].append(target)
            indegree[target] += 1

    queue = deque(node_id for node_id, degree in indegree.items() if degree == 0)
    visited = 0

    while queue:
        current = queue.popleft()
        visited += 1
        for neighbor in graph[current]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(node_ids)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


@app.post('/pipelines/parse')
def parse_pipeline(payload: PipelineParseRequest):
    return {
        'num_nodes': len(payload.nodes),
        'num_edges': len(payload.edges),
        'is_dag': _is_dag(payload.nodes, payload.edges),
    }
