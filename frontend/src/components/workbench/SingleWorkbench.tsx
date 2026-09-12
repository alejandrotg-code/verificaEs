import React, { useState, useEffect, useTransition } from "react";
import type { TabType, ValidationResult } from "../../types";
import { validateWithBackend } from "../../services/api";
import { EJEMPLOS_PRESETS } from "../../data/examples";
import { DniMathInspector } from "../visual/DniMathInspector";
import { LicensePlate } from "../visual/LicensePlate";
import { IbanBlocks } from "../visual/IbanBlocks";
import { CifBreakdown } from "../visual/CifBreakdown";
import { PostalBreakdown } from "../visual/PostalBreakdown";

const DOCUMENT_TYPES: { id: TabType; name: string; tag: string }[] = [
  { id: "auto", name: "Auto-detección", tag: "DNI/NIE/CIF" },
  { id: "dni", name: "DNI / NIE", tag: "Mod 23" },
  { id: "cif", name: "CIF Corporativo", tag: "AEAT" },
  { id: "iban", name: "IBAN Bancario", tag: "ISO 7064" },
  { id: "cp", name: "Código Postal", tag: "INE / 52 Prov" },
  { id: "matricula", name: "Matrícula Vehículo", tag: "DGT" },
  { id: "telefono", name: "Teléfono", tag: "+34 E.164" },
];

export const SingleWorkbench: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("auto");
  const [inputValue, setInputValue] = useState("B86660149");
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [apiTab, setApiTab] = useState<"json" | "curl" | "python">("json");
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!inputValue.trim()) {
      setResult(null);
      return;
    }

    let isSubscribed = true;
    startTransition(async () => {
      const res = await validateWithBackend(activeTab, inputValue);
      if (isSubscribed) setResult(res);
    });

    return () => {
      isSubscribed = false;
    };
  }, [inputValue, activeTab]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    const preset = EJEMPLOS_PRESETS.find((p) => p.categoria === tab && p.valido);
    if (preset) setInputValue(preset.valor);
    else if (tab === "auto") setInputValue("B86660149");
  };

  const currentPresets = EJEMPLOS_PRESETS.filter((p) => {
    if (activeTab === "auto") return ["dni", "cif"].includes(p.categoria);
    return p.categoria === activeTab;
  });

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

  const endpointPath = `${endpointMap[activeTab]}${encodeURIComponent(inputValue.trim() || "")}`;
  const curlSnippet = `curl -s "${apiHost}${endpointPath}"`;
  const pythonSnippet = `import requests

r = requests.get("${apiHost}${endpointPath}")
print(r.json())`;

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isDniOrNie = result?.tipo === "DNI" || result?.tipo === "NIE" || activeTab === "dni";
  const isCif = result?.tipo === "CIF" || activeTab === "cif";
  const isIban = activeTab === "iban" || (result?.tipo !== "DNI" && result?.tipo !== "CIF" && inputValue.trim().toUpperCase().startsWith("ES"));
  const isCp = activeTab === "cp";
  const isMatricula = activeTab === "matricula";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* LEFT COLUMN: Testing Console & Specialized Visual Dissectors (7 cols) */}
      <div className="lg:col-span-7 space-y-5">
        {/* Main Workstation Card */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
          {/* Header Type Selector */}
          <div className="border-b border-zinc-800 p-2 bg-zinc-950/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none font-mono text-xs">
            {DOCUMENT_TYPES.map((dt) => {
              const active = activeTab === dt.id;
              return (
                <button
                  key={dt.id}
                  onClick={() => handleTabChange(dt.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    active
                      ? "bg-zinc-800 text-white font-semibold border border-zinc-700"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
                  }`}
                >
                  <span>{dt.name}</span>
                  <span className={`text-[10px] px-1 py-0.2 rounded ${active ? "bg-zinc-700 text-zinc-300" : "bg-zinc-900 text-zinc-500"}`}>
                    {dt.tag}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Input & Form Control */}
          <div className="p-5 sm:p-6 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5 text-xs font-mono">
                <label className="text-zinc-400 font-medium">Cadena a validar:</label>
                <span className="text-zinc-500 text-[11px]">{inputValue.trim().length} caracteres</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Introduce el valor..."
                  className={`w-full bg-zinc-950 border border-zinc-700 focus:border-zinc-400 rounded-lg px-3.5 py-2.5 font-mono text-base text-zinc-100 placeholder-zinc-600 outline-none transition-all ${
                    isPending ? "opacity-75" : ""
                  }`}
                />
                {inputValue && (
                  <button
                    onClick={() => setInputValue("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-xs font-mono px-2 py-1 rounded cursor-pointer"
                  >
                    [esc]
                  </button>
                )}
              </div>
            </div>

            {/* Quick Test Fixture Seed Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs font-mono">
              <span className="text-zinc-500 text-[11px] mr-1">Casos de prueba:</span>
              {currentPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputValue(preset.valor)}
                  className={`text-[11px] px-2 py-1 rounded border transition-colors cursor-pointer ${
                    preset.valido
                      ? "bg-zinc-950 text-zinc-300 border-zinc-800 hover:border-emerald-800 hover:text-emerald-300"
                      : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-rose-800 hover:text-rose-300"
                  }`}
                  title={preset.descripcion}
                >
                  {preset.etiqueta}
                </button>
              ))}
            </div>

            {/* Status Result Box */}
            {result && inputValue.trim() ? (
              <div className="pt-2">
                <div
                  className={`p-4 rounded-lg border font-mono text-xs ${
                    result.valido
                      ? "bg-emerald-950/20 border-emerald-900/60 text-emerald-300"
                      : "bg-rose-950/20 border-rose-900/60 text-rose-300"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          result.valido ? "bg-emerald-400" : "bg-rose-400"
                        }`}
                      />
                      <span className="font-bold text-sm tracking-wide">
                        {result.valido ? "VALIDACIÓN POSITIVA" : "VALIDACIÓN NEGATIVA"}
                      </span>
                    </div>

                    <span className="text-[10px] text-zinc-400 border border-zinc-800 bg-zinc-900 px-2 py-0.5 rounded">
                      {result.origen === "api" ? `FastAPI • ${result.latenciaMs}ms` : `Stdlib • ${result.latenciaMs}ms`}
                    </span>
                  </div>

                  <p className="text-zinc-300 text-xs mt-1 leading-relaxed">
                    {result.detalles}
                  </p>
                </div>

                {/* Sub-Inspectors Especializados */}
                {isMatricula && (
                  <LicensePlate
                    matricula={inputValue}
                    valido={result.valido}
                    formato={result.formato}
                    provincia={result.provincia}
                  />
                )}

                {isDniOrNie && (
                  <DniMathInspector
                    valor={inputValue}
                    valido={result.valido}
                    tipo={result.tipo}
                  />
                )}

                {isCif && (
                  <CifBreakdown
                    cif={inputValue}
                    valido={result.valido}
                    entidad={result.entidad}
                  />
                )}

                {isIban && (
                  <IbanBlocks
                    iban={inputValue}
                    valido={result.valido}
                    banco={result.banco}
                  />
                )}

                {isCp && (
                  <PostalBreakdown
                    cp={inputValue}
                    valido={result.valido}
                    provincia={result.provincia}
                  />
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Real-Time API Telemetry & Telemetry Specs (5 cols) */}
      <div className="lg:col-span-5 space-y-5">
        {/* Terminal Telemetry Inspector */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl overflow-hidden shadow-sm font-mono text-xs">
          <div className="px-4 py-2.5 border-b border-zinc-800 bg-zinc-950/60 flex items-center justify-between">
            <span className="text-zinc-400 font-semibold text-[11px] uppercase tracking-wider">
              Consola de Integración API
            </span>

            <div className="flex items-center gap-1 text-[11px]">
              <button
                onClick={() => setApiTab("json")}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  apiTab === "json" ? "bg-zinc-800 text-zinc-100 font-bold" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                JSON
              </button>
              <button
                onClick={() => setApiTab("curl")}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  apiTab === "curl" ? "bg-zinc-800 text-zinc-100 font-bold" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                cURL
              </button>
              <button
                onClick={() => setApiTab("python")}
                className={`px-2 py-0.5 rounded cursor-pointer ${
                  apiTab === "python" ? "bg-zinc-800 text-zinc-100 font-bold" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                Python
              </button>
            </div>
          </div>

          <div className="p-4 bg-zinc-950 space-y-3">
            <div className="flex items-center justify-between text-[11px] text-zinc-400 pb-2 border-b border-zinc-900">
              <span className="text-zinc-300 truncate">GET {endpointPath}</span>
              <span className="text-emerald-400 font-bold shrink-0">200 OK</span>
            </div>

            {apiTab === "json" && (
              <pre className="text-zinc-300 text-[11px] leading-relaxed overflow-x-auto">
                {JSON.stringify(
                  result
                    ? {
                        valido: result.valido,
                        tipo: result.tipo || null,
                        formato: result.formato || null,
                        provincia: result.provincia || null,
                        banco: result.banco || null,
                        entidad: result.entidad || null,
                      }
                    : { status: "esperando_entrada" },
                  null,
                  2
                )}
              </pre>
            )}

            {apiTab === "curl" && (
              <div className="relative">
                <pre className="text-zinc-300 text-[11px] whitespace-pre-wrap">{curlSnippet}</pre>
                <button
                  onClick={() => handleCopyCode(curlSnippet)}
                  className="mt-2 text-[10px] text-zinc-400 hover:text-zinc-200 border border-zinc-800 bg-zinc-900 px-2 py-1 rounded cursor-pointer"
                >
                  {copied ? "Copiado" : "Copiar comando"}
                </button>
              </div>
            )}

            {apiTab === "python" && (
              <div className="relative">
                <pre className="text-zinc-300 text-[11px] whitespace-pre-wrap">{pythonSnippet}</pre>
                <button
                  onClick={() => handleCopyCode(pythonSnippet)}
                  className="mt-2 text-[10px] text-zinc-400 hover:text-zinc-200 border border-zinc-800 bg-zinc-900 px-2 py-1 rounded cursor-pointer"
                >
                  {copied ? "Copiado" : "Copiar código"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Technical References and Standards Dossier */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 font-mono text-xs space-y-2.5">
          <div className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider border-b border-zinc-800 pb-1.5">
            Especificaciones Técnicas Oficiales
          </div>
          <div className="space-y-1.5 text-[11px] text-zinc-400">
            <div>
              <strong className="text-zinc-300">DNI/NIE:</strong> Real Decreto 1553/2005. Módulo 23 sobre 8 dígitos (o prefijo 0, 1, 2 para X, Y, Z).
            </div>
            <div>
              <strong className="text-zinc-300">CIF:</strong> Orden EHA/451/2008 de la Agencia Tributaria. Control estricto por dígito (A, B, E, H) o letra (P, Q, R, S, W).
            </div>
            <div>
              <strong className="text-zinc-300">IBAN:</strong> Estándar internacional ISO 7064 MOD 97-10 y norma 34 de la banca española.
            </div>
            <div>
              <strong className="text-zinc-300">Matrículas:</strong> Real Decreto 2822/1998 (Reglamento General de Vehículos).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
