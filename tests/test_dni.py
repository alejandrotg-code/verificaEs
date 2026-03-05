from app.validators.verificar_dni import verificar_dni, verificar_nie

def test_dni_valido():
    assert verificar_dni("12345678Z") == True

def test_nie_valido():
    assert verificar_nie("X1234567L") == True

def test_dni_invalido():
    assert verificar_dni("12345678A") == False

def test_nie_invalido():
    assert verificar_nie("Y1234567A") == False

def test_dni_longitud_invalida():
    assert verificar_dni("1234567Z") == False

def test_nie_longitud_invalida():
    assert verificar_nie("X123456L") == False
