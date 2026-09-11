from verifica_es.dni import verificar_dni, verificar_nie
from verifica_es.cif import verificar_cif


def verificar_documento_identidad(documento: str) -> dict:
    """
    Detecta automáticamente si el documento es DNI, NIE o CIF y lo valida.
    Devuelve un diccionario con el tipo detectado y si es válido.
    """
    if not isinstance(documento, str):
        return {"tipo": "desconocido", "valido": False}

    doc = documento.strip().upper().replace("-", "").replace(" ", "")
    if len(doc) != 9:
        return {"tipo": "desconocido", "valido": False}

    # NIE empieza por X, Y o Z seguido de 7 dígitos y letra
    if doc[0] in "XYZ" and doc[1:8].isdigit():
        return {"tipo": "NIE", "valido": verificar_nie(doc)}

    # DNI son 8 dígitos seguidos de letra
    if doc[:8].isdigit() and doc[8].isalpha():
        return {"tipo": "DNI", "valido": verificar_dni(doc)}

    # CIF empieza por una letra de tipo de organización y sigue con 7 dígitos y control
    if doc[0] in "ABCDEFGHJNPQRSUVW" and doc[1:8].isdigit():
        return {"tipo": "CIF", "valido": verificar_cif(doc)}

    return {"tipo": "desconocido", "valido": False}
