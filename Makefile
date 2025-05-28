.PHONY: run setup start backend-run

# Backend commands
backend-run:
	cd backend && uv run python -m uvicorn mini_fleet_saas.main:app --reload

# Frontend commands
frontend-run:
	cd frontend && pnpm run dev

setup:
	cd backend && uv pip install .
	cd frontend && pnpm install

start:
	$(MAKE) backend-run & $(MAKE) frontend-run