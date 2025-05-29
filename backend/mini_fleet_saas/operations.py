import json
from typing import List
from connexion.exceptions import InternalServerError
from .models import Vehicle, VehicleStatus


def get_vehicles() -> List[dict]:
    try:
        with open("./data/vehicles.json", "r") as f:
            data = json.load(f)
            vehicles = [Vehicle(**vehicle) for vehicle in data["vehicles"]]
            return [vehicle.model_dump() for vehicle in vehicles]
    except Exception:
        raise InternalServerError("Error fetching vehicles")


def update_vehicle_status(vehicle_id: int, body: dict) -> dict:
    try:
        with open("./data/vehicles.json", "r") as f:
            data = json.load(f)

        vehicle_data = data["vehicles"][vehicle_id - 1]
        vehicle_data["status"] = VehicleStatus(body["status"]).value

        with open("./data/vehicles.json", "w") as f:
            json.dump(data, f)

        vehicle = Vehicle(**vehicle_data)
        return vehicle.model_dump()

    except Exception:
        raise InternalServerError("Error updating vehicle status")
