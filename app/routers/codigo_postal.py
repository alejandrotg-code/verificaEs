from fastapi import APIRouter
from app.validators.verificar_codigo_postal import (
    verificar_codigo_postal,
    obtener_provincia_codigo_postal,
)

router = APIRouter()

@router.get("/validar-codigo-postal")
def validar_codigo_postal(cp: str):
    valido = verificar_codigo_postal(cp)
    provincia = obtener_provincia_codigo_postal(cp) if valido else None
    return {
        "valido": valido,
        "provincia": provincia,
    }
