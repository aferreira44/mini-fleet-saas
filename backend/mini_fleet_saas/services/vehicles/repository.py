from typing import List, Optional
from sqlalchemy.orm import Session
from .models import VehicleModel, Vehicle, VehicleStatus


class VehicleRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self) -> List[Vehicle]:
        """Get all vehicles."""
        vehicles = self.db.query(VehicleModel).all()
        return [Vehicle.from_orm(vehicle) for vehicle in vehicles]

    def get_by_id(self, vehicle_id: int) -> Optional[Vehicle]:
        """Get a vehicle by ID."""
        vehicle = (
            self.db.query(VehicleModel).filter(VehicleModel.id == vehicle_id).first()
        )
        return Vehicle.from_orm(vehicle) if vehicle else None

    def update_status(self, vehicle_id: int, status: VehicleStatus) -> Vehicle:
        """Update a vehicle."""
        vehicle = (
            self.db.query(VehicleModel).filter(VehicleModel.id == vehicle_id).first()
        )
        if not vehicle:
            raise Exception(f"Vehicle with id {vehicle_id} not found")

        vehicle.status = status

        self.db.commit()
        self.db.refresh(vehicle)
        return Vehicle.from_orm(vehicle)
