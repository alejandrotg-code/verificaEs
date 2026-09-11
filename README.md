# verifica-es 🇪🇸

[![PyPI version](https://img.shields.io/badge/pypi-v1.1.0-blue.svg)](https://pypi.org/project/verifica-es/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python Versions](https://img.shields.io/badge/python-3.9%20%7C%203.10%20%7C%203.11%20%7C%203.12-blue)](https://www.python.org/)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0%20(standard%20library)-success)](https://github.com/alejandrotg-code/verificaEs)
[![Tests](https://img.shields.io/badge/tests-36%20passed-brightgreen)](https://github.com/alejandrotg-code/verificaEs)

Librería ultraligera (**cero dependencias externas** en su núcleo), herramienta de línea de comandos (**CLI**) y **API REST** de alta velocidad para la validación y verificación de documentos y formatos oficiales de España.

---

## ✨ Características

- ⚡ **Zero Dependencies:** La librería base utiliza únicamente la biblioteca estándar de Python (ultrarrápida y sin vulnerabilidades externas).
- 🪪 **Documentos de Identidad:** Validación oficial de **DNI**, **NIE** y **CIF** (AEAT con reglas de control por tipo de entidad jurídica).
- 🏦 **Bancario & Contacto:** Validación de **IBAN** español (módulo 97) y números de **teléfono** fijos y móviles.
- 📍 **Geografía:** Validación de **Códigos Postales** con resolución automática de la provincia correspondiente (de 01 a 52).
- 🚗 **Vehículos:** Validación de **Matrículas** (sistema moderno europeo y formato histórico provincial).
- 🔍 **Auto-detección:** Función unificada para detectar automáticamente si un identificador es DNI, NIE o CIF.
- 💻 **CLI Integrada:** Comando de consola `verifica-es` listo para usar en scripts o terminal.
- 🚀 **API REST lista para producción:** Servidor FastAPI modular incluido.

---

## 📦 Instalación

### Como librería de Python (Zero dependencies):
```bash
pip install verifica-es
```

### Con soporte para la API REST (FastAPI + Uvicorn):
```bash
pip install "verifica-es[api]"
```

---

## 🚀 Uso en Python

```python
import verifica_es as ves

# 1. Documentos de Identidad
ves.verificar_dni("12345678Z")  # -> True
ves.verificar_nie("X1234567L")  # -> True
ves.verificar_cif("B86660149")  # -> True (Sociedad Limitada)
ves.verificar_cif("P2807900B")  # -> True (Organismo con control de letra)

# Detección automática
ves.verificar_documento_identidad("B86660149")
# -> {'tipo': 'CIF', 'valido': True}

# 2. Códigos Postales y Provincias
ves.verificar_codigo_postal("35001")  # -> True
ves.obtener_provincia_codigo_postal("35001")
# -> 'Las Palmas'

ves.obtener_provincia_codigo_postal("28013")
# -> 'Madrid'

# 3. Bancario y Contacto
ves.verificar_iban("ES9121000418450200051332")  # -> True
ves.verificar_telefono("+34 612 34 56 78")        # -> True

# 4. Matrículas de Vehículos
ves.verificar_matricula("1234BBB")     # -> True (Formato moderno)
ves.verificar_matricula("GC-1234-AB")  # -> True (Formato clásico)
```

---

## 🖥️ Uso desde la Terminal (CLI)

Una vez instalada la librería, dispones del comando `verifica-es`:

```bash
# Validar DNI / NIE / CIF
verifica-es dni 12345678Z
verifica-es nie X1234567L
verifica-es cif B86660149

# Auto-detectar tipo de documento
verifica-es doc B86660149
# [VALIDO] 'B86660149' [Tipo detectado: CIF]

# Validar Código Postal (muestra la provincia)
verifica-es cp 35001
# [VALIDO] '35001' (Provincia: Las Palmas)

# Validar Matrícula
verifica-es matricula 1234BBB

# Validar IBAN o Teléfono
verifica-es iban ES9121000418450200051332
verifica-es telefono 612345678
```

---

## 🌐 Uso como API REST (FastAPI)

Para arrancar el servidor localmente con recarga en vivo:

```bash
uvicorn app.main:app --reload
```

Accede a la documentación interactiva Swagger UI en:
`http://localhost:8000/docs`

### Endpoints disponibles:
- `GET /api/validar-dni?dni=...`
- `GET /api/validar-nie?nie=...`
- `GET /api/validar-cif?cif=...`
- `GET /api/validar-documento?documento=...`
- `GET /api/validar-iban?iban=...`
- `GET /api/validar-telefono?telefono=...`
- `GET /api/validar-codigo-postal?cp=...`
- `GET /api/validar-matricula?matricula=...`

---

## 🧪 Pruebas Automatizadas

Ejecutar la suite completa de 36 tests con pytest:

```bash
pytest
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

Desarrollado con ❤️ por [Alejandro Tacoronte González](https://alejandrotg.es).
