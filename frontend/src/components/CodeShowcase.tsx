import React, { useState } from "react";
import { Terminal, Package, Server, Copy, Check } from "lucide-react";

export const CodeShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"lib" | "cli" | "api">("lib");
  const [copied, setCopied] = useState(false);

  const snippets = {
    lib: `# 1. Instala el núcleo ultra-ligero (cero dependencias externas)
pip install verifica-es

# 2. Úsalo directamente en tu código Python
import verifica_es as ves

# Validación de documentos oficiales
ves.verificar_dni("12345678Z")                  # -> True
ves.verificar_cif("B86660149")                  # -> True (Sociedad Limitada)
ves.verificar_documento_identidad("B86660149")  # -> {'tipo': 'CIF', 'valido': True}

# Bancario, geografía y matrículas
ves.verificar_iban("ES9121000418450200051332")  # -> True
ves.obtener_provincia_codigo_postal("35001")    # -> 'Las Palmas'
ves.verificar_matricula("1234BBB")              # -> True (Moderno)`,

    cli: `# 1. Instala la herramienta de terminal
pip install verifica-es

# 2. Ejecuta validaciones instantáneas desde cualquier consola
verifica-es dni 12345678Z
verifica-es cif B86660149

# Auto-detección inteligente de tipo
verifica-es doc B86660149
# Output: [VALIDO] 'B86660149' [Tipo detectado: CIF]

# Consultar provincia por Código Postal
verifica-es cp 35001
# Output: [VALIDO] '35001' (Provincia: Las Palmas)

verifica-es matricula 1234BBB
verifica-es iban ES9121000418450200051332`,

    api: `# 1. Instala con el extra opcional de API REST (FastAPI + Uvicorn)
pip install "verifica-es[api]"

# 2. Inicia el microservicio de alta velocidad
uvicorn app.main:app --reload --port 8000

# 3. Documentación interactiva Swagger UI disponible en:
# http://localhost:8000/docs

# Endpoints disponibles:
# GET /api/validar-documento?documento=...
# GET /api/validar-dni?dni=...
# GET /api/validar-cif?cif=...
# GET /api/validar-iban?iban=...
# GET /api/validar-codigo-postal?cp=...
# GET /api/validar-matricula?matricula=...`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 mt-12">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Tres formas de integración profesional
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Diseñado con arquitectura desacoplada para adaptarse a cualquier entorno
        </p>
      </div>

      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        {/* Tab Header */}
        <div className="flex items-center justify-between p-2 border-b border-slate-800 bg-slate-950/60 flex-wrap gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab("lib")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "lib"
                  ? "bg-slate-800 text-emerald-300 border border-slate-700 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Package className="w-4 h-4 text-emerald-400" />
              Librería Python (0 deps)
            </button>

            <button
              onClick={() => setActiveTab("cli")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "cli"
                  ? "bg-slate-800 text-cyan-300 border border-slate-700 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              CLI de Terminal
            </button>

            <button
              onClick={() => setActiveTab("api")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "api"
                  ? "bg-slate-800 text-indigo-300 border border-slate-700 shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Server className="w-4 h-4 text-indigo-400" />
              API REST (FastAPI extra)
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-all cursor-pointer mr-1"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar código</span>
              </>
            )}
          </button>
        </div>

        {/* Code Content */}
        <div className="p-5 font-mono text-xs text-slate-300 bg-slate-950/90 overflow-x-auto leading-relaxed">
          <pre>{snippets[activeTab]}</pre>
        </div>
      </div>
    </section>
  );
};
