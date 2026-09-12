import type { TabType, ValidationResult } from "../types";
import {
  verificarDocumento,
  verificarDni,
  verificarNie,
  verificarCif,
  verificarIban,
  verificarCodigoPostal,
  verificarMatricula,
  verificarTelefono,
} from "../utils/engine";

const API_BASE = import.meta.env.VITE_API_URL || "/api";

export async function validateWithBackend(
  tab: TabType,
  value: string
): Promise<ValidationResult> {
  const cleanVal = value.trim();
  if (!cleanVal) {
    return { valido: false, detalles: "Introduce un valor a comprobar" };
  }

  // Mapear tab al endpoint correspondiente
  let endpoint = "";
  let paramName = "";

  switch (tab) {
    case "auto":
      endpoint = `${API_BASE}/validar-documento`;
      paramName = "documento";
      break;
    case "dni":
      endpoint = cleanVal.startsWith("X") || cleanVal.startsWith("Y") || cleanVal.startsWith("Z")
        ? `${API_BASE}/validar-nie`
        : `${API_BASE}/validar-dni`;
      paramName = endpoint.endsWith("nie") ? "nie" : "dni";
      break;
    case "cif":
      endpoint = `${API_BASE}/validar-cif`;
      paramName = "cif";
      break;
    case "iban":
      endpoint = `${API_BASE}/validar-iban`;
      paramName = "iban";
      break;
    case "cp":
      endpoint = `${API_BASE}/validar-codigo-postal`;
      paramName = "cp";
      break;
    case "matricula":
      endpoint = `${API_BASE}/validar-matricula`;
      paramName = "matricula";
      break;
    case "telefono":
      endpoint = `${API_BASE}/validar-telefono`;
      paramName = "telefono";
      break;
  }

  const queryUrl = `${endpoint}?${paramName}=${encodeURIComponent(cleanVal)}`;
  const startTime = performance.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 segundos máx

    const res = await fetch(queryUrl, {
      method: "GET",
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    clearTimeout(timeoutId);

    const latenciaMs = Math.round(performance.now() - startTime);

    if (res.ok) {
      const data = await res.json();
      // Enriquecer datos con detalles del motor local
      const localAnalysis = runLocalValidation(tab, cleanVal);

      return {
        ...localAnalysis,
        ...data,
        origen: "api",
        latenciaMs,
        urlConsultada: queryUrl,
        statusHttp: res.status,
      };
    }
  } catch {
    // Si falla o no hay conexión con el backend, fallback instantáneo al motor local
  }

  // Fallback local
  const localAnalysis = runLocalValidation(tab, cleanVal);
  const latenciaLocal = Math.round(performance.now() - startTime);
  return {
    ...localAnalysis,
    origen: "local",
    latenciaMs: latenciaLocal,
    urlConsultada: queryUrl,
    statusHttp: 200,
  };
}

export function runLocalValidation(tab: TabType, value: string): ValidationResult {
  switch (tab) {
    case "auto":
      return verificarDocumento(value);
    case "dni":
      return value.trim().toUpperCase().match(/^[XYZ]/) ? verificarNie(value) : verificarDni(value);
    case "cif":
      return verificarCif(value);
    case "iban":
      return verificarIban(value);
    case "cp":
      return verificarCodigoPostal(value);
    case "matricula":
      return verificarMatricula(value);
    case "telefono":
      return verificarTelefono(value);
  }
}

