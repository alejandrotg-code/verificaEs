from fastapi import APIRouter
from app.validators.verificar_iban import verificar_iban

router = APIRouter()

@router.get("/validar-iban")
def validar_iban(iban: str):
    return {"valido": verificar_iban(iban)}