from app.validators.verificar_documento import verificar_documento_identidad

def test_deteccion_dni():
    res = verificar_documento_identidad("12345678Z")
    assert res["tipo"] == "DNI"
    assert res["valido"] == True

def test_deteccion_nie():
    res = verificar_documento_identidad("X1234567L")
    assert res["tipo"] == "NIE"
    assert res["valido"] == True

def test_deteccion_cif():
    res = verificar_documento_identidad("B86660149")
    assert res["tipo"] == "CIF"
    assert res["valido"] == True

def test_documento_invalido():
    res = verificar_documento_identidad("00000000A")
    assert res["valido"] == False
