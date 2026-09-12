import React, { useState, useEffect, useTransition } from "react";
import {
  Sparkles,
  CreditCard,
  Building2,
  Landmark,
  MapPin,
  Car,
  Phone,
  CheckCircle,
  XCircle,
  Clock,
  Server,
  Cpu,
  CornerDownLeft,
  X,
} from "lucide-react";
import type { TabType, ValidationResult } from "../types";
import { validateWithBackend } from "../services/api";
import { EJEMPLOS_PRESETS } from "../data/examples";
import { DniMathInspector } from "./visual/DniMathInspector";
import { LicensePlate } from "./visual/LicensePlate";
import { IbanBlocks } from "./visual/IbanBlocks";
import { CifBreakdown } from "./visual/CifBreakdown";
import { PostalBreakdown } from "./visual/PostalBreakdown";

const TABS: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "auto", label: "Auto-detectar", icon: Sparkles },
  { id: "dni", label: "DNI / NIE", icon: CreditCard },
  { id: "cif", label: "CIF Empresa", icon: Building2 },
  { id: "iban", label: "IBAN Bancario", icon: Landmark },
  { id: "cp", label: "Código Postal", icon: MapPin },
  { id: "matricula", label: "Matrícula", icon: Car },
  { id: "telefono", label: "Teléfono", icon: Phone },
];

const PLACEHOLDERS: Record<TabType, string> = {
  auto: "Escribe cualquier DNI, NIE o CIF (ej: 12345678Z, B86660149)",
  dni: "Ej: 12345678Z o X1234567L",
  cif: "Ej: B86660149 (S.L.) o P2807900B (Organismo)",
  iban: "Ej: ES9121000418450200051332",
  cp: "Ej: 35001 (Las Palmas) o 28013 (Madrid)",
  matricula: "Ej: 1234BBB (moderna) o GC-1234-AB (clásica)",
  telefono: "Ej: +34 612 34 56 78 o 928 12 34 56",
};

interface ValidatorCardProps {
  onValidationChange?: (result: ValidationResult | null, value: string, tab: TabType) => void;
}

export const ValidatorCard: React.FC<ValidatorCardProps> = ({ onValidationChange }) => {
  const [activeTab, setActiveTab] = useState<TabType>("auto");
  const [inputValue, setInputValue] = useState("12345678Z");
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!inputValue.trim()) {
      setResult(null);
      if (onValidationChange) onValidationChange(null, "", activeTab);
      return;
    }

    let isSubscribed = true;
    startTransition(async () => {
      const res = await validateWithBackend(activeTab, inputValue);
      if (isSubscribed) {
        setResult(res);
        if (onValidationChange) onValidationChange(res, inputValue, activeTab);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [inputValue, activeTab]);

  const handleTabSelect = (tab: TabType) => {
    setActiveTab(tab);
    const preset = EJEMPLOS_PRESETS.find((p) => p.categoria === tab && p.valido);
    if (preset) {
      setInputValue(preset.valor);
    } else if (tab === "auto") {
      setInputValue("12345678Z");
    }
  };

  const handleApplyPreset = (valor: string) => {
    setInputValue(valor);
  };

  const currentPresets = EJEMPLOS_PRESETS.filter((p) => {
    if (activeTab === "auto") return ["dni", "cif"].includes(p.categoria);
    return p.categoria === activeTab;
  });

  // Determinar qué visualizador específico renderizar
  const isDniOrNie = result?.tipo === "DNI" || result?.tipo === "NIE" || activeTab === "dni";
  const isCif = result?.tipo === "CIF" || activeTab === "cif";
  const isIban = activeTab === "iban" || (result?.tipo !== "DNI" && result?.tipo !== "CIF" && inputValue.trim().toUpperCase().startsWith("ES"));
  const isCp = activeTab === "cp";
  const isMatricula = activeTab === "matricula";

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl ring-1 ring-white/5">
        {/* Category Tabs */}
        <div className="flex overflow-x-auto border-b border-zinc-800 p-2 gap-1.5 scrollbar-none bg-zinc-950/60">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabSelect(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-zinc-800 text-white border border-zinc-700 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-zinc-400"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Input Zone */}
        <div className="p-5 sm:p-7">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={PLACEHOLDERS[activeTab]}
              autoFocus
              className={`w-full bg-zinc-950 border-2 border-zinc-800 focus:border-zinc-500 rounded-xl px-4 py-3.5 text-base sm:text-lg font-mono text-white placeholder-zinc-500 shadow-inner outline-none transition-all pr-20 ${
                isPending ? "opacity-75" : ""
              }`}
            />
            {inputValue && (
              <button
                onClick={() => setInputValue("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-all cursor-pointer"
                title="Borrar texto"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Preset Buttons */}
          <div className="mt-3.5 flex flex-wrap items-center gap-2">
            <span className="text-xs text-zinc-500 font-medium mr-1 flex items-center gap-1">
              <CornerDownLeft className="w-3 h-3" /> Probar:
            </span>
            {currentPresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(preset.valor)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer font-mono ${
                  preset.valido
                    ? "bg-emerald-950/40 text-emerald-300 border-emerald-800/50 hover:bg-emerald-900/40"
                    : "bg-rose-950/40 text-rose-300 border-rose-800/50 hover:bg-rose-900/40"
                }`}
                title={preset.descripcion}
              >
                {preset.etiqueta}
              </button>
            ))}
          </div>

          {/* Validation Status Banner */}
          {result && inputValue.trim() ? (
            <div className="mt-6 space-y-4">
              <div
                className={`p-5 sm:p-6 rounded-xl border transition-all duration-300 ${
                  result.valido
                    ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-100"
                    : "bg-rose-950/20 border-rose-500/30 text-rose-100"
                }`}
              >
                {/* Status Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {result.valido ? (
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
                        <XCircle className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                          {result.valido ? "Formato Válido" : "Formato Inválido"}
                        </h3>
                        {result.tipo && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 font-mono text-zinc-300">
                            {result.tipo}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 mt-0.5 leading-relaxed">
                        {result.detalles}
                      </p>
                    </div>
                  </div>

                  {/* Telemetry pill */}
                  <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400">
                    {result.origen === "api" ? (
                      <>
                        <Server className="w-3 h-3 text-cyan-400" />
                        <span className="text-cyan-300">FastAPI API</span>
                      </>
                    ) : (
                      <>
                        <Cpu className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-300">Motor Local</span>
                      </>
                    )}
                    <span>•</span>
                    <Clock className="w-3 h-3 text-zinc-500" />
                    <span>{result.latenciaMs ?? 0}ms</span>
                  </div>
                </div>
              </div>

              {/* Visual Inspectors Especializados */}
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
          ) : (
            <div className="mt-6 p-6 rounded-xl border border-dashed border-zinc-800 text-center text-zinc-500 text-xs sm:text-sm font-mono">
              Introduce un valor o pulsa cualquiera de los botones de prueba superior para validar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


