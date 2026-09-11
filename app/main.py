from fastapi import FastAPI
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

app.include_router(test.router, prefix="/api", tags=["Utilidades"])
app.include_router(dni.router, prefix="/api", tags=["Identidad"])
app.include_router(cif.router, prefix="/api", tags=["Identidad"])
app.include_router(documento.router, prefix="/api", tags=["Identidad"])
app.include_router(iban.router, prefix="/api", tags=["Bancario"])
app.include_router(telefono.router, prefix="/api", tags=["Contacto"])
app.include_router(codigo_postal.router, prefix="/api", tags=["Geografía"])
app.include_router(matricula.router, prefix="/api", tags=["Vehículos"])