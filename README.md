# Mini Fleet SaaS

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-19.1-61DAFB.svg?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.15-007FFF.svg?logo=mui&logoColor=white)](https://mui.com/)
[![Redux](https://img.shields.io/badge/Redux-2.8-764ABC.svg?logo=redux&logoColor=white)](https://redux.js.org/)
[![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0-D71F00.svg)](https://www.sqlalchemy.org/)
[![Code style: Ruff](https://img.shields.io/badge/code%20style-ruff-000000.svg)](https://github.com/astral-sh/ruff)

This is a simple full-stack app to view and update vehicle statuses in a fleet. It's built with:

- **Frontend:** Vite, React, Redux, Material UI, Axios, HashRouter
- **Backend:** Python + Connexion (OpenAPI-based), SQLAlchemy, Pydantic
- **Database:** SQLite (in-memory)

---

## 📁 Project Structure

```

/
├── backend/ # Python API with Connexion and OpenAPI
├── backend/mini_fleet_saas/ # Python API with Connexion and OpenAPI
├── backend/mini_fleet_saas/config/ # Configuration files
├── backend/mini_fleet_saas/services/ # Business logic
├── backend/mini_fleet_saas/main.py # Main entry point

├── frontend/ # React app with Redux and Material UI
├── frontend/src/ # React app with Redux and Material UI
├── frontend/src/api/ # API calls
├── frontend/src/components/ # React components
├── frontend/src/hooks/ # React hooks
├── frontend/src/pages/ # React pages
├── frontend/src/store/ # Redux store
├── frontend/src/types/ # Type definitions
├── frontend/src/utils/ # Utility functions
├── frontend/src/App.tsx # Main app component
├── frontend/src/theme.ts # Theme configuration
├── frontend/src/main.tsx # Main entry point

├── Makefile # Commands for local dev
└── README.md

```

---

## 🛠️ Setup & Run

### Requirements

- Python 3.10+
- `make` installed
- `uv` for Python dependency management (https://docs.astral.sh/uv/getting-started/installation/)
- `ruff` for Python linting and formatting

### Quickstart

```bash
# Install dependencies for both backend and frontend
make setup

# Seed the database
make seed-db 500 # Seed the database with 500 vehicles

# Start both backend and frontend servers
make start
```

### Individual Commands

```bash
# Backend
make backend-run    # Run the backend server with hot reload

# Frontend
make frontend-run  # Run the frontend server with hot reload

# Drop the database
make drop-db
```

---

## 📦 API Endpoints

- `GET /api/vehicles` — list all vehicles
- `PUT /api/vehicles/{vehicle_id}/status` — update vehicle status

All data is in-memory, persisted in a SQLite database.

## 📚 API Documentation

The API documentation is automatically generated using Swagger UI through Connexion.
The API specification is defined in `backend/mini_fleet_saas/config/openapi.yaml`.

You can access it at: `http://localhost:8000/ui`

---

## 📌 Assumptions

- No persistent DB used, per spec.
- The app is single-user and does not include authentication.

---

## 🔍 Design Decisions

- **Connexion:** chosen to reflect OpenAPI-first design and mirror real-world backend specs.
- **Makefile:** standardizes commands for onboarding and local development.
- **Separation:** front and back kept in separate folders for clarity and modularity.
- **uv:** used for fast and reliable Python dependency management.
- **Ruff:** employed for fast Python linting and code formatting, replacing multiple tools with a single, efficient solution.

---

## 🤖 AI Usage Disclosure

**Disclaimer:** While AI tools were used to assist in development, all code was thoroughly reviewed, modified, and enhanced to meet project requirements and best practices.

The development process involved iterative collaboration with AI tools, making it challenging to document every specific interaction. However, the core architecture, design decisions, and project structure were developed through careful consideration of requirements and industry standards.

This project was created with the help of AI, with the following tools:

- **Cursor:**

  - Code generation and review (e.g. Redux slice, React components, Connexion resolvers, etc.)
  - Suggesting code improvements (e.g. React performance improvements, Custom hooks, Redux slice improvements, etc.)
  - Generating the basic structure of the README.md file
  - Helping with the Makefile commands
  - Generating comments and docstrings

---

## ✅ Tests (Not included)

Not implemented due to time constraints. Ideal test targets:

- Reducers and async actions in Redux (via `React Testing Library`)
- API endpoint integration tests (via `pytest`)
- Business logic tests (via `pytest`)
- Database tests (via `pytest`)
- Component-level unit tests (via `React Testing Library`)
- End-to-end tests (via `Cypress`)
