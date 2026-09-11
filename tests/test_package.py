import subprocess
import sys
import verifica_es

def test_import_public_api():
    # Verifica que todos los métodos públicos se puedan importar directamente
    assert callable(verifica_es.verificar_dni)
    assert callable(verifica_es.verificar_nie)
    assert callable(verifica_es.verificar_cif)
    assert callable(verifica_es.verificar_iban)
    assert callable(verifica_es.verificar_telefono)
    assert callable(verifica_es.verificar_codigo_postal)
    assert callable(verifica_es.obtener_provincia_codigo_postal)
    assert callable(verifica_es.verificar_matricula)
    assert callable(verifica_es.verificar_documento_identidad)
    assert isinstance(verifica_es.PROVINCIAS_ESPANA, dict)
    assert verifica_es.__version__ == "1.1.1"

def test_cli_execution():
    # Verifica ejecución del CLI como módulo
    cmd = [sys.executable, "-m", "verifica_es.cli", "dni", "12345678Z"]
    res = subprocess.run(cmd, capture_output=True, text=True)
    assert res.returncode == 0
    assert "[VALIDO]" in res.stdout
