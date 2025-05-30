import random
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from pathlib import Path
from typing import Final
from ..services.vehicles.models import Base, VehicleModel, VehicleStatus

# Get the project root directory (2 levels up from this file)
PROJECT_ROOT: Final[Path] = Path(__file__).parent.parent.parent

# Database configuration
DB_PATH: Final[Path] = PROJECT_ROOT / "fleet.db"
DATABASE_URL: Final[str] = f"sqlite:///{DB_PATH}"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db():
    """Initialize the database with the required schema."""
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
    try:
        if DB_PATH.exists():
            DB_PATH.unlink(missing_ok=False)
            print("Database dropped successfully!")
        else:
            print("Database not found, skipping drop.")
    except Exception as e:
        print(f"Error dropping database: {e}")
