from connexion import AsyncApp

app = AsyncApp(__name__)

app.add_api("openapi.yaml")
