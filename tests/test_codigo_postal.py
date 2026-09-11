from app.validators.verificar_codigo_postal import (
    verificar_codigo_postal,
    obtener_provincia_codigo_postal,
)

def test_codigo_postal_valido():
    assert verificar_codigo_postal("35001") == True  # Las Palmas
    assert verificar_codigo_postal("28001") == True  # Madrid
    assert verificar_codigo_postal("08001") == True  # Barcelona
    assert verificar_codigo_postal("52001") == True  # Melilla
    assert verificar_codigo_postal("01001") == True  # Álava

def test_codigo_postal_invalido():
    assert verificar_codigo_postal("00123") == False  # 00 no existe
    assert verificar_codigo_postal("53001") == False  # 53 no existe
    assert verificar_codigo_postal("3500") == False   # Longitud corta
    assert verificar_codigo_postal("350001") == False # Longitud larga
    assert verificar_codigo_postal("3500A") == False  # Letras

def test_obtener_provincia():
    assert obtener_provincia_codigo_postal("35001") == "Las Palmas"
    assert obtener_provincia_codigo_postal("38001") == "Santa Cruz de Tenerife"
    assert obtener_provincia_codigo_postal("28013") == "Madrid"
    assert obtener_provincia_codigo_postal("99999") is None
