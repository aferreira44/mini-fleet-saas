"""
Vehicle repository module handling database operations for vehicles.
This module provides methods to interact with the vehicle data in the database.
"""

from typing import List, Optional
from sqlalchemy.orm import Session
from .models import VehicleModel, Vehicle, VehicleStatus
from ...config.logging import logger


class VehicleRepository:
    """
    Repository class for vehicle-related database operations.

    This class provides methods to interact with the vehicles table in the database,
    handling CRUD operations and status updates.

    Attributes:
        db (Session): SQLAlchemy database session
    """

    def __init__(self, db: Session):
        """
        Initialize the repository with a database session.

        Args:
            db (Session): SQLAlchemy database session
        """
        self.db = db

    def get_all(self) -> List[Vehicle]:
        """
        Retrieve all vehicles from the database.

        Returns:
            List[Vehicle]: List of all vehicles in the database
        """
        vehicles = self.db.query(VehicleModel).all()
        logger.info(f"Retrieved {len(vehicles)} vehicles from the database")
        return [Vehicle.from_orm(vehicle) for vehicle in vehicles]

    def get_by_id(self, vehicle_id: int) -> Optional[Vehicle]:
        """
        Retrieve a specific vehicle by its ID.

        Args:
            vehicle_id (int): The ID of the vehicle to retrieve

        Returns:
            Optional[Vehicle]: The vehicle if found, None otherwise
        """
        vehicle = (
            self.db.query(VehicleModel).filter(VehicleModel.id == vehicle_id).first()
        )
        if vehicle:
            logger.info(f"Retrieved vehicle with id {vehicle_id} from the database")
        else:
            logger.error(f"Vehicle with id {vehicle_id} not found")
        return Vehicle.from_orm(vehicle) if vehicle else None

    def update_status(self, vehicle_id: int, status: VehicleStatus) -> Vehicle:
        """
        Update the status of a specific vehicle.

        Args:
            vehicle_id (int): The ID of the vehicle to update
            status (VehicleStatus): The new status to set

        Returns:
            Vehicle: The updated vehicle

        Raises:
            Exception: If the vehicle is not found
        """
        # Get the SQLAlchemy model instance
        vehicle = (
            self.db.query(VehicleModel).filter(VehicleModel.id == vehicle_id).first()
        )

        if not vehicle:
            logger.error(f"Vehicle with id {vehicle_id} not found")
            raise Exception(f"Vehicle with id {vehicle_id} not found")

        # Update the status
        vehicle.status = status
        self.db.commit()
        self.db.refresh(vehicle)

        logger.info(f"Updated vehicle with id {vehicle_id} to status {status}")
        return Vehicle.from_orm(vehicle)
