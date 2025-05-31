"""
Logging configuration for the Mini Fleet SaaS application.
"""

import logging
import os
from pathlib import Path

# Create logs directory if it doesn't exist
LOGS_DIR = Path("logs")
LOGS_DIR.mkdir(exist_ok=True)

# Log file paths
APP_LOG_FILE = LOGS_DIR / "app.log"


def setup_logging():
    """Configure logging for the application."""
    # Create formatter
    formatter = logging.Formatter("%(asctime)s - %(levelname)s - %(message)s")

    # Create file handler for all logs
    app_file_handler = logging.FileHandler(APP_LOG_FILE)
    app_file_handler.setLevel(logging.INFO)
    app_file_handler.setFormatter(formatter)

    # Create console handler
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(formatter)

    # Configure logger
    logger = logging.getLogger("mini_fleet_saas")
    logger.setLevel(logging.INFO)

    # Remove any existing handlers
    logger.handlers = []

    # Add handlers
    logger.addHandler(app_file_handler)
    logger.addHandler(console_handler)

    return logger


# Create logger instance
logger = setup_logging()
