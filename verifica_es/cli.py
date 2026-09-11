import argparse
import sys
from verifica_es import (
    verificar_dni,
    verificar_nie,
    verificar_cif,
    verificar_iban,
    verificar_telefono,
    verificar_codigo_postal,
    obtener_provincia_codigo_postal,
    verificar_matricula,
    verificar_documento_identidad,
    __version__,
)


def main():
    parser = argparse.ArgumentParser(
        prog="verifica-es",
        description="Herramienta CLI para validar documentos y formatos oficiales de España.",
    )
    parser.add_argument(
        "--version", action="version", version=f"verifica-es {__version__}"
    )

    subparsers = parser.add_subparsers(dest="command", help="Comando de validación")

    # DNI
    p_dni = subparsers.add_parser("dni", help="Valida un DNI español")
    p_dni.add_argument("valor", help="Número de DNI con letra (ej: 12345678Z)")

    # NIE
    p_nie = subparsers.add_parser("nie", help="Valida un NIE español")
    p_nie.add_argument("valor", help="NIE con letra inicial y final (ej: X1234567L)")

    # CIF
    p_cif = subparsers.add_parser("cif", help="Valida un CIF de empresa")
    p_cif.add_argument("valor", help="CIF de empresa u organismo (ej: B86660149)")

    # IBAN
    p_iban = subparsers.add_parser("iban", help="Valida un IBAN español")
    p_iban.add_argument("valor", help="IBAN (ej: ES9121000418450200051332)")

    # Teléfono
    p_tel = subparsers.add_parser("telefono", help="Valida un teléfono español")
    p_tel.add_argument("valor", help="Teléfono móvil o fijo (ej: 612345678)")

    # Código Postal
    p_cp = subparsers.add_parser("cp", help="Valida un Código Postal español")
    p_cp.add_argument("valor", help="Código postal de 5 dígitos (ej: 35001)")

    # Matrícula
    p_mat = subparsers.add_parser("matricula", help="Valida una matrícula")
    p_mat.add_argument("valor", help="Matrícula moderna o clásica (ej: 1234BBB, GC-1234-AB)")

    # Documento universal
    p_doc = subparsers.add_parser("doc", help="Detecta y valida DNI, NIE o CIF automáticamente")
    p_doc.add_argument("valor", help="Documento a verificar")

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(1)

    valido = False
    extra = ""

    if args.command == "dni":
        valido = verificar_dni(args.valor)
    elif args.command == "nie":
        valido = verificar_nie(args.valor)
    elif args.command == "cif":
        valido = verificar_cif(args.valor)
    elif args.command == "iban":
        valido = verificar_iban(args.valor)
    elif args.command == "telefono":
        valido = verificar_telefono(args.valor)
    elif args.command == "cp":
        valido = verificar_codigo_postal(args.valor)
        if valido:
            prov = obtener_provincia_codigo_postal(args.valor)
            extra = f" (Provincia: {prov})"
    elif args.command == "matricula":
        valido = verificar_matricula(args.valor)
    elif args.command == "doc":
        res = verificar_documento_identidad(args.valor)
        valido = res["valido"]
        extra = f" [Tipo detectado: {res['tipo']}]"

    if valido:
        print(f"[VALIDO] '{args.valor}'{extra}")
        sys.exit(0)
    else:
        print(f"[INVALIDO] '{args.valor}'{extra}")
        sys.exit(1)


if __name__ == "__main__":
    main()
