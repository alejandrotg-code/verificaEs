from fastapi import FastAPI
from app.routers import dni, test
app = FastAPI()



app.include_router(test.router, prefix="/api")
app.include_router(dni.router, prefix="/api")
