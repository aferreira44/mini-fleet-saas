import random
from sqlalchemy import create_engine, Column, Integer, String, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pathlib import Path
from .models import VehicleStatus

DB_PATH = Path("./data/fleet.db")
DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


class VehicleModel(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    status = Column(Enum(VehicleStatus), nullable=False)


def init_db():
    """Initialize the database with the required schema."""
    DB_PATH.parent.mkdir(exist_ok=True)
    Base.metadata.create_all(bind=engine)


def get_db():
    """Get a database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def seed_db(num_vehicles: int = 50):
    """Seed the database with initial data.

    Args:
        num_vehicles: Number of vehicles to create (default: 50)
    """
    db = SessionLocal()
    try:
        if db.query(VehicleModel).count() != 0:
            print("Database already contains data, skipping seed.")
        else:
            # Insert initial data
            vehicles = []
            for i in range(1, num_vehicles + 1):
                vehicles.append(
                    VehicleModel(
                        id=i,
                        name=f"{random.choice(['Truck', 'Van', 'Car'])}-{i}",
                        status=random.choice(list(VehicleStatus)),
                    )
                )
            db.add_all(vehicles)
            db.commit()
            print(f"Database seeded successfully with {num_vehicles} vehicles!")

    finally:
        db.close()


def drop_db():
    """Drop the database."""
    DB_PATH.unlink(missing_ok=True)
    print("Database dropped successfully!")
