from app.validators.verificar_matricula import (
    verificar_matricula,
    verificar_matricula_moderna,
    verificar_matricula_clasica,
)

def test_matricula_moderna_valida():
    assert verificar_matricula_moderna("1234BBB") == True
    assert verificar_matricula_moderna("9999-XYZ") == True
    assert verificar_matricula_moderna("0000 BCD") == True

def test_matricula_moderna_invalida_vocales_o_letras_prohibidas():
    assert verificar_matricula_moderna("1234AAA") == False  # Tiene vocal A
    assert verificar_matricula_moderna("1234BBE") == False  # Tiene vocal E
    assert verificar_matricula_moderna("1234BBÑ") == False  # Tiene Ñ
    assert verificar_matricula_moderna("1234BBQ") == False  # Tiene Q

def test_matricula_clasica_valida():
    assert verificar_matricula_clasica("GC-1234-AB") == True
    assert verificar_matricula_clasica("TF-5678-Z") == True
    assert verificar_matricula_clasica("M-123456") == True
    assert verificar_matricula_clasica("B-9999-BC") == True

def test_matricula_clasica_invalida():
    assert verificar_matricula_clasica("ZZ-1234-AB") == False  # Provincia inexistente
    assert verificar_matricula_clasica("GC-1234-AÑ") == False  # Con Ñ

def test_verificar_matricula_general():
    assert verificar_matricula("1234-BBB") == True
    assert verificar_matricula("GC-1234-AB") == True
    assert verificar_matricula("INVALIDO") == False
