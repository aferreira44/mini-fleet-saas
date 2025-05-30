from enum import Enum
from pydantic import BaseModel, Field, ConfigDict
from sqlalchemy import Column, Integer, String, Enum as SQLAlchemyEnum
from sqlalchemy.orm import DeclarativeBase


class VehicleStatus(str, Enum):
    AVAILABLE = "Available"
    OUT_OF_SERVICE = "Out of Service"
    IN_MAINTENANCE = "In Maintenance"


class Base(DeclarativeBase):
    pass


class VehicleModel(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    status = Column(SQLAlchemyEnum(VehicleStatus), nullable=False)


class Vehicle(BaseModel):
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
        return cls(
            id=obj.id,
            name=obj.name,
            status=obj.status,
        )
