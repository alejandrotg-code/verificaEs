from fastapi import APIRouter
from app.validators.verificar_documento import verificar_documento_identidad

router = APIRouter()

@router.get("/validar-documento")
def validar_documento(documento: str):
    """
    Auto-detecta si el parámetro es DNI, NIE o CIF y lo valida automáticamente.
    """
    return verificar_documento_identidad(documento)
