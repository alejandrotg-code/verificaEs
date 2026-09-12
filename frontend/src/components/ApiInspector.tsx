import React, { useState } from "react";
import { Terminal, Copy, Check } from "lucide-react";
import type { TabType, ValidationResult } from "../types";

interface ApiInspectorProps {
  result: ValidationResult | null;
  value: string;
  tab: TabType;
}

export const ApiInspector: React.FC<ApiInspectorProps> = ({ result, value, tab }) => {
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [copiedPython, setCopiedPython] = useState(false);
  const [activeTab, setActiveTab] = useState<"json" | "curl" | "python">("json");

  const cleanVal = value.trim();
  const endpointMap: Record<TabType, string> = {
    auto: "/api/validar-documento?documento=",
    dni: "/api/validar-dni?dni=",
    cif: "/api/validar-cif?cif=",
    iban: "/api/validar-iban?iban=",
    cp: "/api/validar-codigo-postal?cp=",
    matricula: "/api/validar-matricula?matricula=",
    telefono: "/api/validar-telefono?telefono=",
  };

  const apiHost =
    import.meta.env.VITE_API_HOST ||
    (typeof window !== "undefined" && window.location.hostname.includes("alejandrotg.es")
      ? "https://api-verifica.alejandrotg.es"
      : "http://localhost:8000");

  const endpoint = `${endpointMap[tab]}${encodeURIComponent(cleanVal || "12345678Z")}`;
  const fullUrl = `${apiHost}${endpoint}`;

  const curlCommand = `curl -X GET "${fullUrl}" -H "Accept: application/json"`;

  const pythonCode = `import requests

url = "${fullUrl}"
response = requests.get(url)
data = response.json()
print(data)  # -> ${result ? JSON.stringify(result.valido) : "True"}`;

  const handleCopy = (text: string, type: "curl" | "python") => {
    navigator.clipboard.writeText(text);
    if (type === "curl") {
      setCopiedCurl(true);
      setTimeout(() => setCopiedCurl(false), 2000);
    } else {
      setCopiedPython(true);
      setTimeout(() => setCopiedPython(false), 2000);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 mt-8">
      <div className="bg-slate-900/70 border border-slate-800/90 rounded-2xl overflow-hidden backdrop-blur-md shadow-xl">
        {/* Header with tabs */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/60 flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Inspector de API & Integración</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
              FastAPI / OpenAPI
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <button
              onClick={() => setActiveTab("json")}
              className={`px-3 py-1 rounded-lg font-mono transition-all cursor-pointer ${
                activeTab === "json"
                  ? "bg-slate-800 text-emerald-400 border border-slate-700"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              JSON Response
            </button>
            <button
              onClick={() => setActiveTab("curl")}
              className={`px-3 py-1 rounded-lg font-mono transition-all cursor-pointer ${
                activeTab === "curl"
                  ? "bg-slate-800 text-cyan-400 border border-slate-700"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              cURL
            </button>
            <button
              onClick={() => setActiveTab("python")}
              className={`px-3 py-1 rounded-lg font-mono transition-all cursor-pointer ${
                activeTab === "python"
                  ? "bg-slate-800 text-indigo-400 border border-slate-700"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Python
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="p-4 sm:p-5 font-mono text-xs text-slate-300 bg-slate-950/90 overflow-x-auto">
          {/* HTTP Bar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-900 text-slate-400 text-[11px] gap-2">
            <div className="flex items-center gap-2 truncate">
              <span className="font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                GET
              </span>
              <span className="text-slate-300 truncate">{endpoint}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-emerald-400 font-bold">200 OK</span>
              <span className="text-slate-600">•</span>
              <span>application/json</span>
            </div>
          </div>

          {activeTab === "json" && (
            <pre className="text-emerald-300 leading-relaxed overflow-x-auto">
              {JSON.stringify(
                result
                  ? {
                      valido: result.valido,
                      tipo: result.tipo,
                      formato: result.formato,
                      provincia: result.provincia,
                      banco: result.banco,
                      entidad: result.entidad,
                    }
                  : { estado: "esperando_datos" },
                null,
                2
              )}
            </pre>
          )}

          {activeTab === "curl" && (
            <div className="relative">
              <pre className="text-cyan-300 whitespace-pre-wrap">{curlCommand}</pre>
              <button
                onClick={() => handleCopy(curlCommand, "curl")}
                className="absolute right-0 top-0 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
                title="Copiar comando cURL"
              >
                {copiedCurl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}

          {activeTab === "python" && (
            <div className="relative">
              <pre className="text-indigo-300 whitespace-pre-wrap">{pythonCode}</pre>
              <button
                onClick={() => handleCopy(pythonCode, "python")}
                className="absolute right-0 top-0 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
                title="Copiar snippet Python"
              >
                {copiedPython ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
