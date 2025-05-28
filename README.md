# Mini Fleet Vehicle Status Updater

This is a simple full-stack app to view and update vehicle statuses in a fleet. It's built with:

- **Frontend:** React, Redux, Material UI, Axios, HashRouter
- **Backend:** Python + Connexion (OpenAPI-based)

---

## 📁 Project Structure

```

/
├── backend/ # Python API with Connexion and OpenAPI
├── backend/openapi.yaml # API definition
├── frontend/ # React app with Redux and Material UI
├── Makefile # Commands for local dev
└── README.md

```

---

## 🛠️ Setup & Run

### Requirements

- Python 3.10+
- `make` installed
- `uv` for Python dependency management
- `ruff` for Python linting and formatting

### Quickstart

```bash
# Install dependencies for both backend and frontend
make setup

# Start both backend and frontend servers
make start
```

### Individual Commands

```bash
# Backend
make backend-run    # Run the backend server with hot reload
```

---

## 📦 API Endpoints

- `GET /api/vehicles` — list all vehicles
- `PUT /api/vehicles/{vehicle_id}/status` — update vehicle status

All data is in-memory.

## 📚 API Documentation

The API documentation is automatically generated using Swagger UI through Connexion.
The API specification is defined in `backend/openapi.yaml`.

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

## ✅ Tests (Not included)

Not implemented due to time constraints. Ideal test targets:

- Reducers and async actions in Redux
- API endpoint integration tests (via `pytest`)
- Component-level unit tests (via `React Testing Library`)
