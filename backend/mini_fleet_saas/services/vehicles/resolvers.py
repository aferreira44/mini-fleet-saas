"""
Vehicle resolver module handling API endpoint logic for vehicle operations.
This module contains the resolver functions that handle HTTP requests and responses
for vehicle-related operations.
"""

from typing import List
from connexion.exceptions import InternalServerError, ClientProblem
from mini_fleet_saas.services.vehicles.models import VehicleStatus
from mini_fleet_saas.config.database import get_db_session
from mini_fleet_saas.services.vehicles.repository import VehicleRepository


def get_vehicles() -> List[dict]:
    """
    Retrieve all vehicles from the database.

    Returns:
        List[dict]: List of all vehicles as dictionaries

    Raises:
        InternalServerError: If there's an error fetching vehicles from the database
    """
    try:
        with get_db_session() as db:
            repository = VehicleRepository(db)
            vehicles = repository.get_all()
            return [vehicle.model_dump() for vehicle in vehicles]
    except Exception as e:
        raise InternalServerError(f"Error fetching vehicles: {str(e)}")


def update_vehicle_status(vehicle_id: int, body: dict) -> dict:
    """
    Update the status of a specific vehicle.

    Args:
        vehicle_id (int): The ID of the vehicle to update
        body (dict): Request body containing the new status

    Returns:
        dict: The updated vehicle data

    Raises:
        ClientProblem: If the vehicle is not found (404)
        InternalServerError: If there's an error updating the vehicle status
    """
    try:
        with get_db_session() as db:
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
