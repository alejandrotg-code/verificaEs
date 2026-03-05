from fastapi import FastAPI
from app.routers import dni, iban, test, telefono
app = FastAPI()



app.include_router(test.router, prefix="/api")
app.include_router(dni.router, prefix="/api")
app.include_router(iban.router, prefix="/api")
app.include_router(telefono.router, prefix="/api")