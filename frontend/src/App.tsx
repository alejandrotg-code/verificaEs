import React, { useState, useEffect } from "react";
import { HeaderBar, type WorkbenchView } from "./components/HeaderBar";
import { SingleWorkbench } from "./components/workbench/SingleWorkbench";
import { CheckoutSimulator } from "./components/workbench/CheckoutSimulator";
import { BatchValidator } from "./components/BatchValidator";
import { ReferenceMatrix } from "./components/workbench/ReferenceMatrix";
import { TerminalDossier } from "./components/workbench/TerminalDossier";
import { AppFooter } from "./components/AppFooter";

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<WorkbenchView>("validator");
  const [apiOnline, setApiOnline] = useState(false);

  useEffect(() => {
    // Comprobar conectividad con el microservicio FastAPI
    const apiBase = import.meta.env.VITE_API_URL || "/api";
    fetch(`${apiBase}/validar-dni?dni=12345678Z`)
      .then((res) => {
        if (res.ok) setApiOnline(true);
      })
      .catch(() => {
        setApiOnline(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#090b10] text-zinc-100 font-sans antialiased selection:bg-zinc-700 selection:text-white">
      {/* Header Application Bar */}
      <HeaderBar currentView={currentView} onViewChange={setCurrentView} apiOnline={apiOnline} />

      {/* Normative Regulatory Reference Bar */}
      <div className="border-b border-zinc-800/80 bg-zinc-950/40 text-[11px] font-mono text-zinc-500 py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto whitespace-nowrap gap-4 scrollbar-none">
          <div className="flex items-center gap-3">
            <span className="text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
              Ecosistema Normativo:
            </span>
            <span>AEAT Orden EHA/451/2008 (CIF)</span>
            <span className="text-zinc-700">•</span>
            <span>RD 1553/2005 Módulo 23 (DNI/NIE)</span>
            <span className="text-zinc-700">•</span>
            <span>ISO 7064 MOD 97-10 (IBAN)</span>
            <span className="text-zinc-700">•</span>
            <span>Reglamento General de Vehículos (DGT)</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-zinc-400">
            <span>Repositorio Público:</span>
            <a
              href="https://github.com/alejandrotg-code/verificaEs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-white underline underline-offset-2"
            >
              alejandrotg-code/verificaEs
            </a>
          </div>
        </div>
      </div>

      {/* Primary Workspace Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full">
        {currentView === "validator" && <SingleWorkbench />}
        {currentView === "form" && <CheckoutSimulator />}
        {currentView === "batch" && <BatchValidator />}
        {currentView === "matrix" && <ReferenceMatrix />}
        {currentView === "cli" && <TerminalDossier />}
      </main>

      {/* Technical Footer */}
      <AppFooter />
    </div>
  );
};

export default App;

