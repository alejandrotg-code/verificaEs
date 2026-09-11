from verifica_es.dni import verificar_dni, verificar_nie
from verifica_es.cif import verificar_cif
from verifica_es.iban import verificar_iban
from verifica_es.telefono import verificar_telefono
from verifica_es.codigo_postal import (
    verificar_codigo_postal,
    obtener_provincia_codigo_postal,
    PROVINCIAS_ESPANA,
)
from verifica_es.matricula import (
    verificar_matricula,
    verificar_matricula_moderna,
    verificar_matricula_clasica,
)
from verifica_es.documento import verificar_documento_identidad

__all__ = [
    "verificar_dni",
    "verificar_nie",
    "verificar_cif",
    "verificar_iban",
    "verificar_telefono",
    "verificar_codigo_postal",
    "obtener_provincia_codigo_postal",
    "PROVINCIAS_ESPANA",
    "verificar_matricula",
    "verificar_matricula_moderna",
    "verificar_matricula_clasica",
    "verificar_documento_identidad",
]
