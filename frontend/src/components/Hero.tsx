import React from "react";
import { Cpu, Terminal, Layers, Code2 } from "lucide-react";

interface HeroProps {
  currentView: "single" | "batch" | "cli" | "code";
  onViewChange: (view: "single" | "batch" | "cli" | "code") => void;
}

export const Hero: React.FC<HeroProps> = ({ currentView, onViewChange }) => {
  return (
    <section className="pt-8 pb-6 text-center max-w-4xl mx-auto px-4">
      {/* Top telemetry pill */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300 mb-4 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span className="font-semibold text-zinc-200">verifica-es</span>
        <span className="text-zinc-600">|</span>
        <span className="text-zinc-400">Motor Algorítmico Zero-Dependencies</span>
      </div>

      {/* Main title */}
      <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-3">
        Validador Técnico de Formatos y Documentación Oficial Española
      </h1>

      {/* Technical Subtitle */}
      <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto mb-6 leading-relaxed font-sans">
        Validación sintáctica y cálculo de dígitos de control conforme a los algoritmos normativos de la{" "}
        <strong className="text-zinc-200">AEAT</strong> (CIF),{" "}
        <strong className="text-zinc-200">Ministerio del Interior</strong> (DNI/NIE módulo 23),{" "}
        <strong className="text-zinc-200">DGT</strong> (Matrículas) y el estándar bancario{" "}
        <strong className="text-zinc-200">ISO 7064</strong> (IBAN).
      </p>

      {/* Primary Mode Navigation Bar */}
      <div className="inline-flex p-1.5 rounded-xl bg-zinc-900 border border-zinc-800 gap-1 text-xs font-mono mb-2 shadow-lg">
        <button
          onClick={() => onViewChange("single")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-semibold ${
            currentView === "single"
              ? "bg-zinc-800 text-emerald-400 border border-zinc-700 shadow-sm"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>Inspector Visual</span>
        </button>

        <button
          onClick={() => onViewChange("batch")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-semibold ${
            currentView === "batch"
              ? "bg-zinc-800 text-cyan-400 border border-zinc-700 shadow-sm"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Validación en Lote</span>
        </button>

        <button
          onClick={() => onViewChange("cli")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-semibold ${
            currentView === "cli"
              ? "bg-zinc-800 text-amber-400 border border-zinc-700 shadow-sm"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Simulador CLI</span>
        </button>

        <button
          onClick={() => onViewChange("code")}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all cursor-pointer font-semibold ${
            currentView === "code"
              ? "bg-zinc-800 text-indigo-400 border border-zinc-700 shadow-sm"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Integración</span>
        </button>
      </div>
    </section>
  );
};

