import os
from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import networkx as nx
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
    graph = nx.DiGraph()

    for node in nodes:
        node_id = node.get("id")
        if node_id is not None:
            graph.add_node(str(node_id))

    for edge in edges:
        raw_source = edge.get("source")
        raw_target = edge.get("target")
        if raw_source is None or raw_target is None:
            continue

        source = str(raw_source)
        target = str(raw_target)
        graph.add_edge(source, target)

    return nx.is_directed_acyclic_graph(graph)


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
