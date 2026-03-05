from fastapi import APIRouter
from app.validators.verificar_dni import verificar_dni, verificar_nie

router = APIRouter()

@router.get("/validar-dni")
def validar_dni(dni: str):
    return {"valido": verificar_dni(dni)}


@router.get("/validar-nie")
def validar_nie(nie: str):
    return {"valido": verificar_nie(nie)}