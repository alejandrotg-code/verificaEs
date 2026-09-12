from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.routers import (
    test,
    dni,
    iban,
    telefono,
    cif,
    codigo_postal,
    matricula,
    documento,
)

app = FastAPI(
    title="verificaEs API",
    description="API REST de alta velocidad para la validación de documentación oficial española (DNI, NIE, CIF, IBAN, Teléfonos, Códigos Postales y Matrículas).",
    version="1.1.0",
)

# Permitir CORS para desarrollo y despliegues web
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(test.router, prefix="/api", tags=["Utilidades"])
app.include_router(dni.router, prefix="/api", tags=["Identidad"])
app.include_router(cif.router, prefix="/api", tags=["Identidad"])
app.include_router(documento.router, prefix="/api", tags=["Identidad"])
app.include_router(iban.router, prefix="/api", tags=["Bancario"])
app.include_router(telefono.router, prefix="/api", tags=["Contacto"])
app.include_router(codigo_postal.router, prefix="/api", tags=["Geografía"])
app.include_router(matricula.router, prefix="/api", tags=["Vehículos"])

# Servir frontend estático si está compilado en dist
frontend_dist = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend", "dist")
if os.path.exists(frontend_dist):
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="frontend")