.PHONY: setup start seed backend-run frontend-run

setup:
	cd backend && uv pip install .
	cd frontend && pnpm install

start:
	$(MAKE) backend-run & $(MAKE) frontend-run

# Database commands
seed-db:
	@echo "Initializing database..."
	@cd backend && uv run python -c "from mini_fleet_saas.config.database import init_db; init_db()"
	@echo "Seeding database..."
	@cd backend && uv run python -c "from mini_fleet_saas.config.database import seed_db; seed_db($(or $(word 2,$(MAKECMDGOALS)),50))"

%:
	@:

drop-db:
	@echo "Dropping database..."
	@cd backend && uv run python -c "from mini_fleet_saas.config.database import drop_db; drop_db()"

# Backend commands
backend-run:
	cd backend && uv run python -m uvicorn mini_fleet_saas.main:app --reload

# Frontend commands
frontend-run:
	cd frontend && pnpm run dev