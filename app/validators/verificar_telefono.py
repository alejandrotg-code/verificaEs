def verificar_telefono(telefono):
    telefono = telefono.replace(' ', '')
    prefijo_es = "+34"
    if telefono.startswith(prefijo_es):
        telefono = telefono[len(prefijo_es):]
    if telefono.startswith('0034'):
        telefono = telefono[4:]
    if len(telefono) != 9:
        return False
    if not telefono.isdigit():
        return False
    if telefono[0] not in ['6', '7', '8', '9']:
        return False
    return True