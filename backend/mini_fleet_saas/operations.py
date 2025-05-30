from typing import List
from connexion.exceptions import InternalServerError, ClientProblem
from .models import VehicleStatus
from .database import get_db
from .repositories import VehicleRepository


def get_vehicles() -> List[dict]:
    try:
        db = next(get_db())
        repository = VehicleRepository(db)
        vehicles = repository.get_all()
        return [vehicle.model_dump() for vehicle in vehicles]
    except Exception as e:
        raise InternalServerError(f"Error fetching vehicles: {str(e)}")


def update_vehicle_status(vehicle_id: int, body: dict) -> dict:
    try:
        db = next(get_db())
        repository = VehicleRepository(db)

        # Get vehicle
        vehicle = repository.get_by_id(vehicle_id)
        if not vehicle:
            raise ClientProblem(404, f"Vehicle with id {vehicle_id} not found")

        # Update status
        updated_vehicle = repository.update_status(
            vehicle_id, VehicleStatus(body["status"])
        )
        return updated_vehicle.model_dump()

    except Exception as e:
        raise InternalServerError(f"Error updating vehicle status: {str(e)}")
