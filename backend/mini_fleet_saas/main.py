"""
Main application module for the Mini Fleet SaaS application.
This module initializes the Connexion application, sets up CORS middleware,
and configures the OpenAPI specification.
"""

import contextlib
from connexion import AsyncApp
from connexion.middleware import MiddlewarePosition
from starlette.middleware.cors import CORSMiddleware
from .config.database import init_db
from .config.logging import setup_logging, logger


@contextlib.asynccontextmanager
async def lifespan(app):
    """Lifespan context manager for application startup and shutdown."""
    try:
        # Startup
        logger.info("Starting up Mini Fleet SaaS application")

        # Setup logging
        setup_logging()
        logger.info("Logging setup complete")

        # Initialize the database connection
        init_db()
        logger.info("Database connection initialized")
        yield
    finally:
        # Shutdown
        logger.info("Shutting down Mini Fleet SaaS application")


# Create the Connexion application with lifespan
app = AsyncApp(__name__, lifespan=lifespan)

# Configure CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    position=MiddlewarePosition.BEFORE_EXCEPTION,
    allow_origins=["*"],  # In production, this should be restricted to specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load and configure the OpenAPI specification
app.add_api("./config/openapi.yaml")
