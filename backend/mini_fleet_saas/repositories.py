from typing import List, Optional
from sqlalchemy.orm import Session
from .models import Vehicle, VehicleStatus
from .database import VehicleModel


class VehicleRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> List[Vehicle]:
        """Get all vehicles."""
        vehicles = self.db.query(VehicleModel).all()
        return [
            Vehicle(id=vehicle.id, name=vehicle.name, status=vehicle.status)
            for vehicle in vehicles
        ]

    def get_by_id(self, vehicle_id: int) -> Optional[Vehicle]:
        """Get a vehicle by ID."""
        vehicle = (
            self.db.query(VehicleModel).filter(VehicleModel.id == vehicle_id).first()
        )
        if not vehicle:
            return None
        return Vehicle(id=vehicle.id, name=vehicle.name, status=vehicle.status)

    def update_status(self, vehicle_id: int, status: VehicleStatus) -> Vehicle:
        """Update a vehicle's status."""
        vehicle = (
            self.db.query(VehicleModel).filter(VehicleModel.id == vehicle_id).first()
        )
        if not vehicle:
            raise Exception(f"Vehicle with id {vehicle_id} not found2")
        vehicle.status = status
        self.db.commit()
        return Vehicle(id=vehicle.id, name=vehicle.name, status=vehicle.status)
