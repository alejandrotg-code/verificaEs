from fastapi import APIRouter
from app.validators.verificar_telefono import verificar_telefono

router = APIRouter()

@router.get("/validar-telefono")
def validar_telefono(telefono: str):
    return {"valido": verificar_telefono(telefono)}