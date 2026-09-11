import re

# Consonantes válidas para el sistema actual (desde septiembre de 2000):
# Se excluyen vocales (A, E, I, O, U), la Ñ y la Q.
LETRAS_MODERNAS = "BCDFGHJKLMNPRSTVWXYZ"

# Prefijos provinciales clásicos oficiales de España
PREFIJOS_PROVINCIALES = {
    "A", "AB", "AL", "AV", "B", "BA", "BI", "BU", "C", "CA", "CC", "CD", "CE",
    "CO", "CP", "CR", "CS", "CU", "FP", "GC", "GE", "GI", "GR", "GU", "H", "HU",
    "IB", "J", "L", "LE", "LO", "LR", "LU", "M", "MA", "ML", "MU", "NA", "O",
    "OR", "OU", "P", "PA", "PM", "PO", "S", "SA", "SE", "SG", "SO", "T", "TE",
    "TF", "TO", "V", "VA", "VI", "Z", "ZA"
}


def verificar_matricula_moderna(matricula: str) -> bool:
    """
    Valida formato actual europeo español: 4 dígitos + 3 consonantes (sin vocales, Ñ ni Q).
    Ejemplos válidos: 1234BBB, 9999-XYZ, 0123 BCD
    """
    limpia = matricula.strip().upper().replace("-", "").replace(" ", "")
    if len(limpia) != 7:
        return False

    numeros = limpia[:4]
    letras = limpia[4:]

    if not numeros.isdigit():
        return False

    return all(char in LETRAS_MODERNAS for char in letras)


def verificar_matricula_clasica(matricula: str) -> bool:
    """
    Valida formato provincial clásico (1971 - 2000):
    1-2 letras provinciales + 4 dígitos + 1-2 letras de serie.
    Ejemplos: GC-1234-AB, M-5678-Z, TF 9999 BC
    """
    limpia = matricula.strip().upper().replace("-", "").replace(" ", "")
    # Patrón: 1 o 2 letras + 4 números + 1 o 2 letras
    match = re.match(r"^([A-Z]{1,2})(\d{4})([A-Z]{1,2})$", limpia)
    if not match:
        # Algunos coches antiguos tenían menos de 4 números (hasta 6 dígitos sin letras finales),
        # pero el estándar oficial de 1971-2000 es 4 dígitos con letras finales.
        match = re.match(r"^([A-Z]{1,2})(\d{1,6})$", limpia)
        if not match:
            return False
        prov = match.group(1)
        return prov in PREFIJOS_PROVINCIALES

    prov, numeros, serie = match.groups()
    if prov not in PREFIJOS_PROVINCIALES:
        return False

    # En serie clásica no se usaba Ñ ni Q
    return "Ñ" not in serie and "Q" not in serie


def verificar_matricula(matricula: str) -> bool:
    """
    Valida si una matrícula española es válida (sea formato moderno o clásico provincial).
    """
    if not isinstance(matricula, str):
        return False
    return verificar_matricula_moderna(matricula) or verificar_matricula_clasica(matricula)
