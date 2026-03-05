# Validar IBAN:
# 1. Mover las 4 primeras posiciones al final
# 2. Convertir letras a números (A=10, ..., Z=35)
# 3. Si numero % 97 == 1 → válido
def verificar_iban(iban): 
    iban = iban.replace(' ', '').upper()
    if len(iban) < 15 or len(iban) > 34:
        return False
    if not iban.startswith('ES'):
        return False
    iban_reordenado = iban[4:] + iban[:4]
    iban_numerico = ''
    for char in iban_reordenado:
        if char.isdigit():
            iban_numerico += char
        elif char.isalpha():
            iban_numerico += str(ord(char) - 55)
        else:
            return False
    return int(iban_numerico) % 97 == 1
