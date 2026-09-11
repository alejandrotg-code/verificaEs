def verificar_cif(cif: str) -> bool:
    """
    Valida un Código de Identificación Fiscal (CIF) español según la normativa de la AEAT.
    Estructura: 1 letra de tipo de organización + 7 dígitos + 1 carácter de control (dígito o letra).
    """
    if not isinstance(cif, str):
        return False

    cif = cif.strip().upper().replace("-", "").replace(" ", "")

    if len(cif) != 9:
        return False

    tipo = cif[0]
    digitos = cif[1:8]
    control = cif[8]

    # Letras de tipo de organización válidas
    tipos_validos = "ABCDEFGHJNPQRSUVW"
    if tipo not in tipos_validos:
        return False

    if not digitos.isdigit():
        return False

    # Suma de dígitos en posiciones pares (posiciones 2, 4, 6 del bloque de 7 dígitos -> índices 1, 3, 5)
    suma_pares = int(digitos[1]) + int(digitos[3]) + int(digitos[5])

    # Suma de dígitos en posiciones impares (posiciones 1, 3, 5, 7 -> índices 0, 2, 4, 6)
    # Cada dígito se multiplica por 2 y se suman las cifras del resultado
    suma_impares = 0
    for i in (0, 2, 4, 6):
        mult = int(digitos[i]) * 2
        suma_impares += (mult // 10) + (mult % 10)

    suma_total = suma_pares + suma_impares
    c = (10 - (suma_total % 10)) % 10

    letras_control = "JABCDEFGHI"
    letra_esperada = letras_control[c]
    digito_esperado = str(c)

    # Entidades cuyo control DEBE ser letra:
    # P (Corporaciones Locales), Q (Organismos Públicos), R (Congregaciones Religiosas),
    # S (Órganos de la Administración), W (Establecimientos permanentes no residentes)
    solo_letra = "PQRSW"

    # Entidades cuyo control DEBE ser número:
    # A (Sociedades Anónimas), B (Sociedades Limitadas), E (Comunidades de Bienes), H (Comunidades de Propietarios)
    solo_numero = "ABEH"

    if tipo in solo_letra:
        return control == letra_esperada
    elif tipo in solo_numero:
        return control == digito_esperado
    else:
        # El resto (C, D, F, G, J, N, U, V) admite tanto número como letra
        return control == digito_esperado or control == letra_esperada
