from fastapi import APIRouter
from app.validators.verificar_cif import verificar_cif

router = APIRouter()

@router.get("/validar-cif")
def validar_cif(cif: str):
    return {"valido": verificar_cif(cif)}
