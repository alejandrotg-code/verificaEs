PROVINCIAS_ESPANA = {
    "01": "Álava / Araba",
    "02": "Albacete",
    "03": "Alicante / Alacant",
    "04": "Almería",
    "05": "Ávila",
    "06": "Badajoz",
    "07": "Islas Baleares / Illes Balears",
    "08": "Barcelona",
    "09": "Burgos",
    "10": "Cáceres",
    "11": "Cádiz",
    "12": "Castellón / Castelló",
    "13": "Ciudad Real",
    "14": "Córdoba",
    "15": "A Coruña",
    "16": "Cuenca",
    "17": "Girona",
    "18": "Granada",
    "19": "Guadalajara",
    "20": "Gipuzkoa",
    "21": "Huelva",
    "22": "Huesca",
    "23": "Jaén",
    "24": "León",
    "25": "Lleida",
    "26": "La Rioja",
    "27": "Lugo",
    "28": "Madrid",
    "29": "Málaga",
    "30": "Murcia",
    "31": "Navarra",
    "32": "Ourense",
    "33": "Asturias",
    "34": "Palencia",
    "35": "Las Palmas",
    "36": "Pontevedra",
    "37": "Salamanca",
    "38": "Santa Cruz de Tenerife",
    "39": "Cantabria",
    "40": "Segovia",
    "41": "Sevilla",
    "42": "Soria",
    "43": "Tarragona",
    "44": "Teruel",
    "45": "Toledo",
    "46": "Valencia / València",
    "47": "Valladolid",
    "48": "Bizkaia",
    "49": "Zamora",
    "50": "Zaragoza",
    "51": "Ceuta",
    "52": "Melilla",
}


def verificar_codigo_postal(cp: str) -> bool:
    """
    Valida un Código Postal español (5 dígitos entre 01000 y 52999).
    """
    if not isinstance(cp, str):
        return False

    cp = cp.strip().replace(" ", "")
    if len(cp) != 5 or not cp.isdigit():
        return False

    prefijo = cp[:2]
    return prefijo in PROVINCIAS_ESPANA


def obtener_provincia_codigo_postal(cp: str) -> str | None:
    """
    Devuelve el nombre de la provincia asociada al código postal o None si no es válido.
    """
    if not verificar_codigo_postal(cp):
        return None

    cp = cp.strip().replace(" ", "")
    return PROVINCIAS_ESPANA.get(cp[:2])
