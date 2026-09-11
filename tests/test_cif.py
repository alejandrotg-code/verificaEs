from app.validators.verificar_cif import verificar_cif

def test_cif_sociedad_limitada_valido():
    # B86660149 (B: SL, control numérico)
    assert verificar_cif("B86660149") == True
    # Con guiones y minúsculas
    assert verificar_cif("b-8666014-9") == True

def test_cif_sociedad_anonima_valido():
    # A28015865 (A: SA, Telefónica, control numérico)
    assert verificar_cif("A28015865") == True

def test_cif_corporacion_local_control_letra_valido():
    # P2807900B (P: Corporación local, control letra)
    assert verificar_cif("P2807900B") == True
    assert verificar_cif("p-2807900-b") == True

def test_cif_digito_control_incorrecto():
    assert verificar_cif("B86660140") == False
    assert verificar_cif("A28015869") == False
    assert verificar_cif("P2807900A") == False

def test_cif_formato_invalido():
    assert verificar_cif("") == False
    assert verificar_cif("123456789") == False
    assert verificar_cif("Z12345678") == False
    assert verificar_cif("B8666014") == False
    assert verificar_cif("B866601499") == False
