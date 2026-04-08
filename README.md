# 🧠 CodeMind

> **AI-native codebase memory engine.** Understands *why* your code is the way it is — not just what it does.

[![Python](https://img.shields.io/badge/Python-3.11-blue?style=flat-square&logo=python)](https://python.org)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com)
[![Neo4j](https://img.shields.io/badge/Neo4j-Graph_DB-008CC1?style=flat-square&logo=neo4j)](https://neo4j.com)
[![Ollama](https://img.shields.io/badge/Ollama-Local_LLM-black?style=flat-square)](https://ollama.ai)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## The Problem

Six months after writing a complex module, you can't remember:
- **Why** a particular architectural decision was made
- **What** a specific edge case was trying to fix
- **Which** PR discussion led to that interface design

`grep`, Copilot, and static docs don't answer these questions. They describe code as it *is*, not as it *became*.

**CodeMind does.**

---

## What It Does

CodeMind ingests your **entire engineering history** — git commits, PR diffs, inline comments, and linked docs — and builds a **temporal knowledge graph** over your codebase. You can then query it in plain English and get evidence-backed answers sourced directly from your history.

```
"Why was the auth middleware completely rewritten in v2?"
→ Traces 3 commits, 1 PR discussion, and 2 inline comments
→ Returns: "Rewritten to fix JWT expiry race condition (PR #47, Oct 12)"
```

Everything runs **locally via Ollama**. No code leaves your machine.

---

## Key Features

### 🗺️ Temporal Knowledge Graph
Nodes represent functions, modules, and files. Edges carry semantic relationships: *"refactored because of"*, *"introduced to fix"*, *"deprecated by"*, *"depends on"*. The graph is queryable and visualized as an interactive canvas.

### 🔍 Decision Trail
Ask *"what led to this function existing?"* and get a reconstructed narrative — the bug that caused it, the PR that introduced it, the discussion that shaped its interface — with direct citations from your git history.

### ⚠️ Drift Detection
Alerts you when current code diverges from documented intent. If a function's behavior no longer matches what its original commit described, CodeMind flags it.

### 👋 Onboarding Mode
A new team member can ask *"explain the payment module"* and receive a chronological story of how it evolved — not a static summary of current code.

### 🔒 Fully Local
Built on Ollama. All reasoning, embedding, and graph construction happens on-device. Cloud LLM fallback is optional.

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                   Next.js Frontend               │
│   Graph Canvas (react-force-graph)  │  Q&A UI   │
│   Timeline View  │  Diff Viewer  │  Drift Alerts │
└────────────────────────┬────────────────────────┘
                         │ WebSocket / REST
┌────────────────────────▼────────────────────────┐
│                  FastAPI Backend                 │
│                                                  │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────┐ │
│  │  Ingestion  │  │  Graph       │  │Reasoning│ │
│  │  Agent      │  │  Builder     │  │Agent    │ │
│  │  (GitPython │  │  (Tree-sitter│  │(LangGraph│ │
│  │  + Chunker) │  │  + NER)      │  │+ Ollama)│ │
│  └─────────────┘  └──────────────┘  └─────────┘ │
│                                                  │
│  ┌─────────────┐  ┌──────────────┐               │
│  │  Retrieval  │  │  Synthesis   │               │
│  │  Agent      │  │  Agent       │               │
│  │  (Hybrid    │  │  (Summary +  │               │
│  │  Vector+    │  │  Onboarding) │               │
│  │  Graph)     │  └──────────────┘               │
│  └─────────────┘                                 │
└──────────┬──────────────┬───────────────┬────────┘
           │              │               │
    ┌──────▼───┐   ┌──────▼────┐   ┌──────▼──────┐
    │  Neo4j   │   │  Qdrant   │   │   SQLite    │
    │ (Temporal│   │  (Vector  │   │  (Metadata  │
    │  Graph)  │   │   Store)  │   │  + Users)   │
    └──────────┘   └───────────┘   └─────────────┘
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, TailwindCSS, react-force-graph |
| Backend | FastAPI, Python 3.11 |
| Agent Orchestration | LangGraph |
| LLM (Local) | Ollama (Llama 3 / Mistral / Gemma) |
| LLM (Cloud, optional) | OpenAI / Gemini |
| Code Parsing | Tree-sitter, GitPython |
| Vector Store | Qdrant |
| Graph DB | Neo4j |
| Relational | SQLite / PostgreSQL |
| Real-time | Native FastAPI WebSockets |
| Containerization | Docker Compose |

---

## Getting Started

### Prerequisites

- Docker and Docker Compose
- [Ollama](https://ollama.ai) installed locally
- Node.js 20+, Python 3.11+

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Rajat25022005/codemind
cd codemind

# 2. Pull a local model via Ollama
ollama pull llama3

# 3. Start all services
docker compose up -d

# 4. Install frontend dependencies
cd frontend && npm install && npm run dev

# 5. Install backend dependencies
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Index Your Repository

```bash
# Point CodeMind at any local git repo
curl -X POST http://localhost:8000/ingest \
  -H "Content-Type: application/json" \
  -d '{"repo_path": "/absolute/path/to/your/repo"}'
```

The ingestion pipeline will:
1. Walk all commits and diffs via GitPython
2. Parse AST structures with Tree-sitter
3. Extract entities and relationships via LLM
4. Populate Neo4j with the temporal graph
5. Embed all chunks into Qdrant

Then open `http://localhost:3000` to explore the graph.

---

## Project Structure

```
codemind/
├── frontend/                  # Next.js application
│   ├── components/
│   │   ├── GraphCanvas.tsx    # react-force-graph visualization
│   │   ├── QueryPanel.tsx     # Q&A interface with streaming
│   │   ├── DriftAlerts.tsx    # Intent drift notifications
│   │   └── DiffViewer.tsx     # Commit diff display
│   └── pages/
│
├── backend/
│   ├── agents/
│   │   ├── ingestion.py       # Git + AST pipeline
│   │   ├── graph_builder.py   # Entity extraction → Neo4j
│   │   ├── retrieval.py       # Hybrid vector + graph search
│   │   ├── reasoning.py       # LangGraph multi-hop QA
│   │   └── synthesis.py       # Summary + onboarding generator
│   ├── core/
│   │   ├── graph_db.py        # Neo4j client
│   │   ├── vector_db.py       # Qdrant client
│   │   └── llm.py             # Ollama / OpenAI wrapper
│   ├── api/
│   │   ├── routes.py          # REST endpoints
│   │   └── websocket.py       # Real-time streaming
│   └── main.py
│
├── docker-compose.yml
└── README.md
```

---

## Roadmap

- [x] Git ingestion pipeline (commits, diffs, messages)
- [x] AST-level code parsing with Tree-sitter
- [x] Temporal knowledge graph construction (Neo4j)
- [x] Hybrid retrieval (vector + graph traversal)
- [x] Streaming Q&A with reasoning traces
- [x] Interactive graph canvas visualization
- [ ] PR and issue tracker integration (GitHub API)
- [ ] Drift detection alerts
- [ ] Onboarding mode with guided walkthroughs
- [ ] VS Code extension
- [ ] Multi-repo workspace support

---

## Contributing

Contributions are welcome. Please open an issue first to discuss what you'd like to change. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

[MIT](LICENSE) © Rajat Malik
