def verificar_dni(dni):
    letras= "TRWAGMYFPDXBNJZSQVHLCKE"
    if len(dni) != 9:
        return False
    elif not dni[:8].isdigit():
        return False
    letra = int(dni[:8]) % 23
    return letras[letra] == dni[-1].upper()


def verificar_nie(nie):
    letras= "XYZ"
    letras_dni = "TRWAGMYFPDXBNJZSQVHLCKE"
    if len(nie) != 9:
        return False
    elif nie[0].upper() not in letras:
        return False
    elif not nie[1:8].isdigit():
        return False
    letra = int(str(letras.index(nie[0].upper())) + nie[1:8]) % 23
    return letras_dni[letra] == nie[-1].upper()