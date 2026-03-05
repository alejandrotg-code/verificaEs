from app.validators.verificar_iban import verificar_iban

def test_iban_valido():
    assert verificar_iban("ES9121000418450200051332") == True
    assert verificar_iban("ES91 2100 0418 4502 0005 1332") == True

def test_iban_invalido():
    assert verificar_iban("ES9121000418450200051333") == False

def test_iban_longitud_invalida():
    assert verificar_iban("ES912100041845020005133") == False

def test_iban_formato_invalido():
    assert verificar_iban("ES91-2100-0418-4502-0005-1332") == False