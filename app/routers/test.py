from fastapi import APIRouter

router = APIRouter()

@router.get("/test")
def read_root():
    return {"message": "Api funcionando correctamente"}
