"""
Vehicle models module defining the data structures and database models for the vehicle management system.
This module contains the SQLAlchemy models and Pydantic schemas for vehicle data.
"""

from enum import Enum
from pydantic import BaseModel, Field, ConfigDict
from sqlalchemy import Column, Integer, String, Enum as SQLAlchemyEnum
from sqlalchemy.orm import DeclarativeBase


class VehicleStatus(str, Enum):
    """
    Enumeration of possible vehicle statuses.

    Attributes:
        AVAILABLE: Vehicle is available for use
        OUT_OF_SERVICE: Vehicle is not operational
        IN_MAINTENANCE: Vehicle is currently being maintained
    """

    AVAILABLE = "Available"
    OUT_OF_SERVICE = "Out of Service"
    IN_MAINTENANCE = "In Maintenance"


class Base(DeclarativeBase):
    """Base class for all SQLAlchemy models."""

    pass


class VehicleModel(Base):
    """
    SQLAlchemy model representing the vehicles table in the database.

    Attributes:
        id (int): Primary key, unique identifier
        name (str): Vehicle name or model
        status (VehicleStatus): Current status of the vehicle
    """

    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    status = Column(SQLAlchemyEnum(VehicleStatus), nullable=False)


class Vehicle(BaseModel):
    """
    Pydantic model for vehicle data validation and serialization.

    Attributes:
        id (int): Unique identifier for the vehicle
        name (str): Name or model of the vehicle
        status (VehicleStatus): Current status of the vehicle, defaults to AVAILABLE
    """

    id: int = Field(..., description="Unique identifier for the vehicle")
    name: str = Field(..., description="Name or model of the vehicle")
    status: VehicleStatus = Field(
        default=VehicleStatus.AVAILABLE,
        description="Current status of the vehicle",
    )

    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
                "id": 1,
                "name": "Truck-001",
                "status": "Available",
            }
        },
    )

    @classmethod
    def from_orm(cls, obj: VehicleModel) -> "Vehicle":
        """
        Create a Vehicle instance from a VehicleModel ORM object.

        Args:
            obj (VehicleModel): The ORM object to convert

        Returns:
            Vehicle: A new Vehicle instance with data from the ORM object
        """
        return cls(
            id=obj.id,
            name=obj.name,
            status=obj.status,
        )
