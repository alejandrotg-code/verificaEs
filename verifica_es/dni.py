def verificar_dni(dni: str) -> bool:
    """
    Valida un DNI español (8 números + 1 letra de control calculada con módulo 23).
    """
    if not isinstance(dni, str):
        return False

    dni = dni.strip().upper().replace("-", "").replace(" ", "")
    letras = "TRWAGMYFPDXBNJZSQVHLCKE"

    if len(dni) != 9:
        return False
    if not dni[:8].isdigit():
        return False

    letra_esperada = letras[int(dni[:8]) % 23]
    return letra_esperada == dni[-1]


def verificar_nie(nie: str) -> bool:
    """
    Valida un NIE español (letra X, Y o Z + 7 números + letra de control calculada).
    """
    if not isinstance(nie, str):
        return False

    nie = nie.strip().upper().replace("-", "").replace(" ", "")
    letras_prefijo = "XYZ"
    letras_control = "TRWAGMYFPDXBNJZSQVHLCKE"

    if len(nie) != 9:
        return False
    if nie[0] not in letras_prefijo:
        return False
    if not nie[1:8].isdigit():
        return False

    # X se sustituye por 0, Y por 1, Z por 2
    prefijo_num = str(letras_prefijo.index(nie[0]))
    numero_completo = int(prefijo_num + nie[1:8])
    letra_esperada = letras_control[numero_completo % 23]

    return letra_esperada == nie[-1]
