from app.validators.verificar_telefono import verificar_telefono

def test_telefono_valido():
    assert verificar_telefono("612345678") == True
    assert verificar_telefono("712345678") == True
    assert verificar_telefono("812345678") == True
    assert verificar_telefono("912345678") == True
    assert verificar_telefono("+34612345678") == True
    assert verificar_telefono("0034612345678") == True

def test_telefono_invalido():
    assert verificar_telefono("512345678") == False
    assert verificar_telefono("61234567") == False
    assert verificar_telefono("6123456789") == False
    assert verificar_telefono("61234A678") == False
    assert verificar_telefono("+35612345678") == False
    assert verificar_telefono("0035612345678") == False