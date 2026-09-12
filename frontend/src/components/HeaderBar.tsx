import React from "react";
import { GithubIcon } from "./Icons";

export type WorkbenchView = "validator" | "form" | "batch" | "matrix" | "cli";

interface HeaderBarProps {
  currentView: WorkbenchView;
  onViewChange: (view: WorkbenchView) => void;
  apiOnline: boolean;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({ currentView, onViewChange, apiOnline }) => {
  return (
    <header className="border-b border-zinc-800 bg-[#090b10] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: Brand & Engine Specs */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-sm tracking-tight text-zinc-100">
              verifica-es
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
              1.1.1
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-zinc-400 pl-3 border-l border-zinc-800">
            <span>Python Stdlib</span>
            <span className="text-zinc-600">•</span>
            <span>Zero-Deps Core</span>
            <span className="text-zinc-600">•</span>
            <span className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${apiOnline ? "bg-emerald-400" : "bg-amber-400"}`} />
              {apiOnline ? "FastAPI Online" : "Motor Local"}
            </span>
          </div>
        </div>

        {/* Center: Workstation Segmented Navigation */}
        <nav className="flex items-center p-1 rounded-lg bg-zinc-900 border border-zinc-800 font-mono text-xs overflow-x-auto scrollbar-none">
          <button
            onClick={() => onViewChange("validator")}
            className={`px-3 py-1 rounded transition-all cursor-pointer whitespace-nowrap ${
              currentView === "validator"
                ? "bg-zinc-800 text-white font-medium shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Validador Técnico
          </button>
          <button
            onClick={() => onViewChange("form")}
            className={`px-3 py-1 rounded transition-all cursor-pointer whitespace-nowrap ${
              currentView === "form"
                ? "bg-zinc-800 text-white font-medium shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Simulador B2B
          </button>
          <button
            onClick={() => onViewChange("batch")}
            className={`px-3 py-1 rounded transition-all cursor-pointer whitespace-nowrap ${
              currentView === "batch"
                ? "bg-zinc-800 text-white font-medium shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Auditoría en Lote
          </button>
          <button
            onClick={() => onViewChange("matrix")}
            className={`px-3 py-1 rounded transition-all cursor-pointer whitespace-nowrap ${
              currentView === "matrix"
                ? "bg-zinc-800 text-white font-medium shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Tablas Normativas
          </button>
          <button
            onClick={() => onViewChange("cli")}
            className={`px-3 py-1 rounded transition-all cursor-pointer whitespace-nowrap ${
              currentView === "cli"
                ? "bg-zinc-800 text-white font-medium shadow-sm"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            CLI & Integración
          </button>
        </nav>

        {/* Right: Repository and PyPI Links */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://pypi.org/project/verifica-es/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors"
          >
            PyPI Package
          </a>
          <a
            href="https://github.com/alejandrotg-code/verificaEs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
