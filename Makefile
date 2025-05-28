.PHONY: run setup start backend-run

# Backend commands
backend-run:
	cd backend && uv run python -m uvicorn main:app --reload

setup:
	cd backend && uv pip install .

start: backend-run