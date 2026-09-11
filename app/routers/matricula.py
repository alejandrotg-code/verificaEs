from fastapi import APIRouter
from app.validators.verificar_matricula import (
    verificar_matricula,
    verificar_matricula_moderna,
    verificar_matricula_clasica,
)

router = APIRouter()

@router.get("/validar-matricula")
def validar_matricula(matricula: str):
    es_moderna = verificar_matricula_moderna(matricula)
    es_clasica = verificar_matricula_clasica(matricula) if not es_moderna else False
    valida = es_moderna or es_clasica
    formato = "moderno" if es_moderna else ("clasico" if es_clasica else "invalido")

    return {
        "valido": valida,
        "formato": formato if valida else None,
    }
