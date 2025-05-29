from connexion import AsyncApp
from connexion.middleware import MiddlewarePosition
from starlette.middleware.cors import CORSMiddleware

app = AsyncApp(__name__)

app.add_middleware(
    CORSMiddleware,
    position=MiddlewarePosition.BEFORE_EXCEPTION,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_api("../openapi.yaml")
