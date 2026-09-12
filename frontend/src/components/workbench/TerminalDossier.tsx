import React, { useState } from "react";
import { CliSimulator } from "../CliSimulator";

export const TerminalDossier: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"cli" | "lib" | "api">("cli");
  const [copied, setCopied] = useState(false);

  const snippets = {
    lib: `# Instalación del motor ultra-ligero (0 dependencias)
pip install verifica-es

# Integración directa en código
import verifica_es as ves

# 1. Documentación oficial
ves.verificar_dni("12345678Z")                  # -> True
ves.verificar_cif("B86660149")                  # -> True (S.L.)
ves.verificar_documento_identidad("B86660149")  # -> {'tipo': 'CIF', 'valido': True}

# 2. Bancario, geografía y vehículos
ves.verificar_iban("ES9121000418450200051332")  # -> True (Módulo 97)
ves.obtener_provincia_codigo_postal("35001")    # -> 'Las Palmas'
ves.verificar_matricula("1234BBB")              # -> True`,

    api: `# Instalación con el extra opcional de microservicio REST
pip install "verifica-es[api]"

# Arrancar el servidor asíncrono
uvicorn app.main:app --reload --port 8000

# Documentación OpenAPI / Swagger UI:
# http://localhost:8000/docs

# Endpoints REST disponibles:
# GET /api/validar-documento?documento={valor}
# GET /api/validar-dni?dni={valor}
# GET /api/validar-nie?nie={valor}
# GET /api/validar-cif?cif={valor}
# GET /api/validar-iban?iban={valor}
# GET /api/validar-codigo-postal?cp={valor}
# GET /api/validar-matricula?matricula={valor}
# GET /api/validar-telefono?telefono={valor}`,
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-5 shadow-sm font-mono text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4 mb-4">
          <div>
            <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wide">
              Arquitectura de Distribución & Empaquetado (PEP 621)
            </h3>
            <p className="text-zinc-400 text-xs mt-0.5 font-sans">
              Elige cómo integrar la validación según la arquitectura de tu sistema.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs">
            <button
              onClick={() => setActiveTab("cli")}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                activeTab === "cli" ? "bg-zinc-800 text-white font-bold" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Consola CLI
            </button>
            <button
              onClick={() => setActiveTab("lib")}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                activeTab === "lib" ? "bg-zinc-800 text-white font-bold" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Librería Python (0 deps)
            </button>
            <button
              onClick={() => setActiveTab("api")}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                activeTab === "api" ? "bg-zinc-800 text-white font-bold" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              API REST (FastAPI)
            </button>
          </div>
        </div>

        {activeTab === "cli" ? (
          <div className="space-y-4">
            <p className="text-zinc-400 text-xs font-sans">
              La CLI <code className="text-zinc-200">verifica-es</code> se instala automáticamente al hacer <code className="text-zinc-200">pip install verifica-es</code> y utiliza exclusivamente la biblioteca estándar (<code className="text-zinc-200">argparse</code>):
            </p>
            <CliSimulator />
          </div>
        ) : (
          <div className="relative">
            <pre className="bg-zinc-950 border border-zinc-800 p-4 rounded-lg text-zinc-200 overflow-x-auto leading-relaxed text-xs">
              {snippets[activeTab]}
            </pre>
            <button
              onClick={() => handleCopy(snippets[activeTab])}
              className="absolute right-3 top-3 text-[11px] px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 cursor-pointer"
            >
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
