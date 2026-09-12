import { PROVINCIAS_ESPANA } from "../data/provincias";
import { TIPOS_CIF } from "../data/cifTypes";
import { BANCOS_ESPANA } from "../data/bancos";
import type { ValidationResult } from "../types";

const LETRAS_DNI = "TRWAGMYFPDXBNJZSQVHLCKE";
const LETRAS_CIF_CONTROL = "JABCDEFGHI";
const LETRAS_MATRICULA_MODERNA = "BCDFGHJKLMNPRSTVWXYZ";

const PREFIJOS_PROVINCIALES = new Set([
  "A", "AB", "AL", "AV", "B", "BA", "BI", "BU", "C", "CA", "CC", "CD", "CE",
  "CO", "CP", "CR", "CS", "CU", "FP", "GC", "GE", "GI", "GR", "GU", "H", "HU",
  "IB", "J", "L", "LE", "LO", "LR", "LU", "M", "MA", "ML", "MU", "NA", "O",
  "OR", "OU", "P", "PA", "PM", "PO", "S", "SA", "SE", "SG", "SO", "T", "TE",
  "TF", "TO", "V", "VA", "VI", "Z", "ZA"
]);

export function cleanStr(val: string): string {
  return val.trim().toUpperCase().replace(/[-\s.]/g, "");
}

// 1. DNI
export function verificarDni(dni: string): ValidationResult {
  const clean = cleanStr(dni);
  if (clean.length !== 9 || !/^\d{8}[A-Z]$/.test(clean)) {
    return { valido: false, tipo: "DNI", detalles: "Debe contener 8 números seguidos de una letra" };
  }
  const numeros = parseInt(clean.slice(0, 8), 10);
  const letraEsperada = LETRAS_DNI[numeros % 23];
  const letraRecibida = clean[8];
  const valido = letraEsperada === letraRecibida;

  return {
    valido,
    tipo: "DNI",
    controlEsperado: letraEsperada,
    controlRecibido: letraRecibida,
    detalles: valido
      ? `DNI español válido (módulo 23: resto ${numeros % 23} -> letra '${letraEsperada}')`
      : `Letra incorrecta. Para el número ${clean.slice(0, 8)} corresponde la letra '${letraEsperada}'`,
  };
}

// 2. NIE
export function verificarNie(nie: string): ValidationResult {
  const clean = cleanStr(nie);
  if (clean.length !== 9 || !/^[XYZ]\d{7}[A-Z]$/.test(clean)) {
    return { valido: false, tipo: "NIE", detalles: "Debe comenzar por X, Y o Z, 7 dígitos y una letra de control" };
  }
  const prefijoMap: Record<string, string> = { X: "0", Y: "1", Z: "2" };
  const prefijoLetra = clean[0];
  const prefijoNum = prefijoMap[prefijoLetra];
  const numeroCompleto = parseInt(prefijoNum + clean.slice(1, 8), 10);
  const letraEsperada = LETRAS_DNI[numeroCompleto % 23];
  const letraRecibida = clean[8];
  const valido = letraEsperada === letraRecibida;

  return {
    valido,
    tipo: "NIE",
    controlEsperado: letraEsperada,
    controlRecibido: letraRecibida,
    detalles: valido
      ? `NIE válido (Prefijo '${prefijoLetra}' sustituido por ${prefijoNum} -> Letra esperada '${letraEsperada}')`
      : `Letra incorrecta. Para el NIE ${clean.slice(0, 8)} corresponde la letra '${letraEsperada}'`,
  };
}

// 3. CIF
export function verificarCif(cif: string): ValidationResult {
  const clean = cleanStr(cif);
  if (clean.length !== 9 || !/^[ABCDEFGHJNPQRSUVW]\d{7}[0-9A-J]$/.test(clean)) {
    return { valido: false, tipo: "CIF", detalles: "Formato no válido para CIF español" };
  }

  const tipo = clean[0];
  const digitos = clean.slice(1, 8);
  const control = clean[8];

  const sumaPares = parseInt(digitos[1], 10) + parseInt(digitos[3], 10) + parseInt(digitos[5], 10);
  let sumaImpares = 0;
  for (const i of [0, 2, 4, 6]) {
    const mult = parseInt(digitos[i], 10) * 2;
    sumaImpares += Math.floor(mult / 10) + (mult % 10);
  }

  const sumaTotal = sumaPares + sumaImpares;
  const c = (10 - (sumaTotal % 10)) % 10;
  const letraEsperada = LETRAS_CIF_CONTROL[c];
  const digitoEsperado = c.toString();

  const soloLetra = "PQRSW";
  const soloNumero = "ABEH";
  const infoTipo = TIPOS_CIF[tipo];

  let valido = false;
  let controlEsperado = "";

  if (soloLetra.includes(tipo)) {
    valido = control === letraEsperada;
    controlEsperado = `Letra '${letraEsperada}'`;
  } else if (soloNumero.includes(tipo)) {
    valido = control === digitoEsperado;
    controlEsperado = `Dígito '${digitoEsperado}'`;
  } else {
    valido = control === digitoEsperado || control === letraEsperada;
    controlEsperado = `Dígito '${digitoEsperado}' o Letra '${letraEsperada}'`;
  }

  return {
    valido,
    tipo: "CIF",
    entidad: infoTipo ? infoTipo.descripcion : "Entidad jurídica",
    controlEsperado,
    controlRecibido: control,
    detalles: valido
      ? `CIF válido correspondiente a ${infoTipo?.descripcion || "Entidad jurídica"}`
      : `Control incorrecto. Se esperaba ${controlEsperado} para este tipo de sociedad.`,
  };
}

// 4. Auto-detección Documento Identidad
export function verificarDocumento(documento: string): ValidationResult {
  const clean = cleanStr(documento);
  if (clean.length !== 9) {
    return { valido: false, tipo: "desconocido", detalles: "Longitud debe ser de 9 caracteres para DNI, NIE o CIF" };
  }

  if (/^[XYZ]\d{7}[A-Z]$/.test(clean)) {
    return verificarNie(clean);
  }
  if (/^\d{8}[A-Z]$/.test(clean)) {
    return verificarDni(clean);
  }
  if (/^[ABCDEFGHJNPQRSUVW]\d{7}[0-9A-J]$/.test(clean)) {
    return verificarCif(clean);
  }

  return { valido: false, tipo: "desconocido", detalles: "No coincide con el patrón de DNI, NIE ni CIF" };
}

// 5. IBAN
export function verificarIban(iban: string): ValidationResult {
  const clean = iban.trim().toUpperCase().replace(/[\s-]/g, "");
  if (clean.length < 15 || clean.length > 34) {
    return { valido: false, detalles: "Longitud de IBAN no válida" };
  }
  if (!clean.startsWith("ES")) {
    return { valido: false, detalles: "Solo se validan cuentas con código de país de España (ES)" };
  }

  const reordenado = clean.slice(4) + clean.slice(0, 4);
  let numerico = "";
  for (const char of reordenado) {
    if (char >= "0" && char <= "9") {
      numerico += char;
    } else if (char >= "A" && char <= "Z") {
      numerico += (char.charCodeAt(0) - 55).toString();
    } else {
      return { valido: false, detalles: "Contiene caracteres inválidos" };
    }
  }

  try {
    const valido = BigInt(numerico) % 97n === 1n;
    const codigoBanco = clean.slice(4, 8);
    const nombreBanco = BANCOS_ESPANA[codigoBanco] || `Entidad bancaria #${codigoBanco}`;

    return {
      valido,
      banco: valido ? nombreBanco : undefined,
      formato: clean.replace(/(.{4})/g, "$1 ").trim(),
      detalles: valido
        ? `IBAN español verificado correctamente por módulo 97 (Entidad: ${nombreBanco})`
        : "Dígitos de control de IBAN erróneos según módulo 97 de la norma ISO 7064",
    };
  } catch {
    return { valido: false, detalles: "Error en el cálculo numérico del IBAN" };
  }
}

// 6. Código Postal
export function verificarCodigoPostal(cp: string): ValidationResult {
  const clean = cp.trim().replace(/\s/g, "");
  if (clean.length !== 5 || !/^\d{5}$/.test(clean)) {
    return { valido: false, provincia: null, detalles: "Un código postal español debe tener exactamente 5 dígitos numéricos" };
  }

  const prefijo = clean.slice(0, 2);
  const provincia = PROVINCIAS_ESPANA[prefijo] || null;
  const valido = provincia !== null;

  return {
    valido,
    provincia,
    detalles: valido
      ? `Código postal válido perteneciente a la provincia de ${provincia}`
      : `El prefijo provincial '${prefijo}' no existe en España (rango oficial de 01 a 52)`,
  };
}

// 7. Matrícula
export function verificarMatricula(matricula: string): ValidationResult {
  const clean = cleanStr(matricula);

  // Sistema moderno: 4 dígitos + 3 consonantes
  if (clean.length === 7 && /^\d{4}[A-Z]{3}$/.test(clean)) {
    const letras = clean.slice(4);
    const valido = [...letras].every((c) => LETRAS_MATRICULA_MODERNA.includes(c));
    return {
      valido,
      formato: valido ? "moderno" : "invalido",
      detalles: valido
        ? "Matrícula válida en formato moderno europeo DGT (desde 2000)"
        : "Letras no permitidas: las matrículas modernas no admiten vocales (A, E, I, O, U) ni las letras Ñ o Q",
    };
  }

  // Sistema clásico provincial (ej: GC-1234-AB, M-5678-Z)
  const matchClasico = clean.match(/^([A-Z]{1,2})(\d{4})([A-Z]{1,2})$/) || clean.match(/^([A-Z]{1,2})(\d{1,6})$/);
  if (matchClasico) {
    const prov = matchClasico[1];
    const serie = matchClasico[3] || "";
    if (PREFIJOS_PROVINCIALES.has(prov)) {
      if (!serie.includes("Ñ") && !serie.includes("Q")) {
        return {
          valido: true,
          formato: "clasico",
          provincia: prov,
          detalles: `Matrícula histórica clásica del sistema provincial (${prov})`,
        };
      }
    }
  }

  return {
    valido: false,
    formato: "invalido",
    detalles: "No coincide con el formato moderno DGT (1234BBB) ni clásico provincial (GC-1234-AB)",
  };
}

// 8. Teléfono
export function verificarTelefono(telefono: string): ValidationResult {
  let clean = telefono.trim().replace(/[-\s.]/g, "");
  if (clean.startsWith("+34")) {
    clean = clean.slice(3);
  } else if (clean.startsWith("0034")) {
    clean = clean.slice(4);
  }

  if (clean.length !== 9 || !/^\d{9}$/.test(clean)) {
    return { valido: false, detalles: "Debe contener 9 dígitos (prefijo opcional +34)" };
  }

  const primerDigito = clean[0];
  const esMovil = ["6", "7"].includes(primerDigito);
  const esFijo = ["8", "9"].includes(primerDigito);
  const valido = esMovil || esFijo;

  return {
    valido,
    detalles: valido
      ? `Número ${esMovil ? "móvil" : "fijo"} español válido (+34 ${clean.slice(0, 3)} ${clean.slice(3, 6)} ${clean.slice(6)})`
      : "Los números de teléfono en España deben comenzar por 6, 7 (móviles) u 8, 9 (fijos)",
  };
}

