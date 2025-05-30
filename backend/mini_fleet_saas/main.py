"""
Main application module for the Mini Fleet SaaS application.
This module initializes the Connexion application, sets up CORS middleware,
and configures the OpenAPI specification.
"""

from connexion import AsyncApp
from connexion.middleware import MiddlewarePosition
from starlette.middleware.cors import CORSMiddleware
from .config.database import init_db

# Initialize the database connection
init_db()

# Create the Connexion application
app = AsyncApp(__name__)

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
