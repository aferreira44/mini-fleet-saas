"""
Database configuration and management module.

This module handles all database-related operations including:
- Database connection setup
- Session management
- Database initialization
- Data seeding
- Database cleanup

The module uses SQLAlchemy as the ORM and SQLite as the database backend.
"""

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

# Create SQLAlchemy engine and session factory
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def init_db():
    """
    Initialize the database with the required schema.

    This function creates all tables defined in the SQLAlchemy models
    if they don't already exist. It should be called when the application
    starts up.
    """
    Base.metadata.create_all(bind=engine)


def get_db():
    """
    Get a database session.

    This is a generator function that yields a database session and ensures
    it is properly closed after use.

    Yields:
        Session: A SQLAlchemy database session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def seed_db(num_vehicles: int = 50):
    """
    Seed the database with initial vehicle data.

    This function populates the database with sample vehicle data if the
    database is empty. It creates vehicles with random names and statuses.

    Args:
        num_vehicles (int, optional): Number of vehicles to create. Defaults to 50.

    Note:
        This function will not seed the database if it already contains data
        to prevent accidental data loss.
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
    """
    Drop the database by removing the SQLite database file.

    This function deletes the SQLite database file if it exists.
    It should be used with caution as it will permanently delete all data.

    Raises:
        Exception: If there's an error deleting the database file
    """
    try:
        if DB_PATH.exists():
            DB_PATH.unlink(missing_ok=False)
            print("Database dropped successfully!")
        else:
            print("Database not found, skipping drop.")
    except Exception as e:
        print(f"Error dropping database: {e}")
