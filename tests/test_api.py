from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_api_dni():
    response = client.get("/api/validar-dni?dni=12345678Z")
    assert response.status_code == 200
    assert response.json() == {"valido": True}

def test_api_cif():
    response = client.get("/api/validar-cif?cif=B86660149")
    assert response.status_code == 200
    assert response.json() == {"valido": True}

def test_api_codigo_postal():
    response = client.get("/api/validar-codigo-postal?cp=35001")
    assert response.status_code == 200
    data = response.json()
    assert data["valido"] == True
    assert data["provincia"] == "Las Palmas"

def test_api_matricula():
    response = client.get("/api/validar-matricula?matricula=1234BBB")
    assert response.status_code == 200
    assert response.json() == {"valido": True, "formato": "moderno"}

def test_api_documento_autodetect():
    response = client.get("/api/validar-documento?documento=B86660149")
    assert response.status_code == 200
    assert response.json() == {"tipo": "CIF", "valido": True}
