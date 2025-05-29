from enum import Enum
from pydantic import BaseModel, Field


class VehicleStatus(str, Enum):
    AVAILABLE = "Available"
    OUT_OF_SERVICE = "Out of Service"
    IN_MAINTENANCE = "In Maintenance"


class Vehicle(BaseModel):
    id: int = Field(..., description="Unique identifier for the vehicle")
    name: str = Field(..., description="Name or model of the vehicle")
    status: VehicleStatus = Field(
        default=VehicleStatus.AVAILABLE,
        description="Current status of the vehicle",
    )

    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "name": "Truck-001",
                "status": "Available",
            }
        }
