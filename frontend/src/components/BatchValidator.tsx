import React, { useState } from "react";
import { Copy, Download, Layers, CheckCircle2, XCircle, Trash2 } from "lucide-react";
import { verificarDocumento, verificarIban, verificarCodigoPostal, verificarMatricula, verificarTelefono } from "../utils/engine";

const EJEMPLO_BATCH = `12345678Z
12345678A
B86660149
P2807900B
ES9121000418450200051332
ES0000000000000000000000
35001
28013
99999
1234BBB
1234ABC
+34 612 34 56 78`;

interface BatchItem {
  valor: string;
  valido: boolean;
  tipo: string;
  detalles: string;
}

export const BatchValidator: React.FC = () => {
  const [inputText, setInputText] = useState(EJEMPLO_BATCH);
  const [filter, setFilter] = useState<"todos" | "validos" | "invalidos">("todos");
  const [copied, setCopied] = useState(false);

  const lineas = inputText
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  const resultados: BatchItem[] = lineas.map((linea) => {
    // 1. Probar Documento (DNI/NIE/CIF)
    const docRes = verificarDocumento(linea);
    if (docRes.tipo !== "desconocido") {
      return {
        valor: linea,
        valido: docRes.valido,
        tipo: docRes.tipo || "Doc",
        detalles: docRes.detalles || "",
      };
    }

    // 2. Probar IBAN
    if (linea.toUpperCase().startsWith("ES") && linea.replace(/[-\s]/g, "").length >= 15) {
      const ibanRes = verificarIban(linea);
      return {
        valor: linea,
        valido: ibanRes.valido,
        tipo: "IBAN",
        detalles: ibanRes.banco ? `${ibanRes.banco}` : ibanRes.detalles || "",
      };
    }

    // 3. Probar CP (5 dígitos)
    if (/^\d{5}$/.test(linea.replace(/\s/g, ""))) {
      const cpRes = verificarCodigoPostal(linea);
      return {
        valor: linea,
        valido: cpRes.valido,
        tipo: "Código Postal",
        detalles: cpRes.provincia ? `Provincia: ${cpRes.provincia}` : cpRes.detalles || "",
      };
    }

    // 4. Probar Matrícula
    const matRes = verificarMatricula(linea);
    if (matRes.valido || /^\d{4}[A-Z]{3}$/.test(linea.replace(/[-\s]/g, "").toUpperCase())) {
      return {
        valor: linea,
        valido: matRes.valido,
        tipo: "Matrícula",
        detalles: matRes.detalles || "",
      };
    }

    // 5. Probar Teléfono
    const telRes = verificarTelefono(linea);
    if (telRes.valido || linea.startsWith("+34") || /^\d{9}$/.test(linea.replace(/[-\s.]/g, ""))) {
      return {
        valor: linea,
        valido: telRes.valido,
        tipo: "Teléfono",
        detalles: telRes.detalles || "",
      };
    }

    return {
      valor: linea,
      valido: false,
      tipo: "Desconocido",
      detalles: "Formato no compatible con los esquemas oficiales",
    };
  });

  const filtrados = resultados.filter((item) => {
    if (filter === "validos") return item.valido;
    if (filter === "invalidos") return !item.valido;
    return true;
  });

  const totalValidos = resultados.filter((r) => r.valido).length;
  const totalInvalidos = resultados.length - totalValidos;

  const handleCopy = (soloValidos: boolean) => {
    const list = resultados.filter((r) => (soloValidos ? r.valido : !r.valido)).map((r) => r.valor);
    navigator.clipboard.writeText(list.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resultados, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "verifica-es-batch-results.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <h3 className="text-lg font-bold text-white tracking-tight">
              Validador Masivo en Lote (Batch Inspector)
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono">
              Auto-detección multi-formato
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Pega una lista de identificadores (uno por línea) para analizarlos y filtrarlos en bloque al instante.
          </p>
        </div>

        {/* Action pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCopy(true)}
            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-emerald-300 border border-zinc-700 font-mono transition-all cursor-pointer"
            title="Copiar solo los valores válidos"
          >
            <Copy className="w-3 h-3" />
            <span>Copiar Válidos ({totalValidos})</span>
          </button>
          <button
            onClick={handleExportJson}
            className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 font-mono transition-all cursor-pointer"
            title="Descargar resultados en JSON"
          >
            <Download className="w-3 h-3" />
            <span>JSON</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Textarea Input (4 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-zinc-400 font-mono">
              Entrada ({lineas.length} elementos detectados)
            </span>
            <button
              onClick={() => setInputText("")}
              className="text-[11px] text-zinc-500 hover:text-zinc-300 flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3 h-3" /> Limpiar
            </button>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={10}
            className="w-full flex-1 bg-zinc-950 border border-zinc-800 focus:border-emerald-500 rounded-xl p-3 font-mono text-xs text-zinc-200 resize-none outline-none leading-relaxed"
            placeholder="Pega aquí los valores separados por saltos de línea..."
          />
        </div>

        {/* Results Table (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          {/* Filters Bar */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <button
                onClick={() => setFilter("todos")}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  filter === "todos" ? "bg-zinc-700 text-white font-bold" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Todos ({resultados.length})
              </button>
              <button
                onClick={() => setFilter("validos")}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  filter === "validos" ? "bg-emerald-900/60 text-emerald-300 font-bold" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Válidos ({totalValidos})
              </button>
              <button
                onClick={() => setFilter("invalidos")}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  filter === "invalidos" ? "bg-rose-900/60 text-rose-300 font-bold" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Inválidos ({totalInvalidos})
              </button>
            </div>

            {copied && <span className="text-[11px] text-emerald-400 font-mono">¡Copiado!</span>}
          </div>

          {/* Table Container */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden flex-1 max-h-[290px] overflow-y-auto font-mono text-xs">
            <table className="w-full text-left border-collapse">
              <thead className="bg-zinc-900/80 sticky top-0 border-b border-zinc-800 text-[10px] uppercase text-zinc-400 tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Estado</th>
                  <th className="py-2.5 px-3">Identificador</th>
                  <th className="py-2.5 px-3">Tipo</th>
                  <th className="py-2.5 px-3 hidden sm:table-cell">Detalle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900">
                {filtrados.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-zinc-500 text-xs">
                      No hay elementos en esta vista.
                    </td>
                  </tr>
                ) : (
                  filtrados.map((item, idx) => (
                    <tr key={idx} className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-2 px-3 shrink-0">
                        {item.valido ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Válido
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-rose-400 font-bold text-[11px]">
                            <XCircle className="w-3.5 h-3.5" /> Inválido
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-3 font-bold text-zinc-200">
                        {item.valor}
                      </td>
                      <td className="py-2 px-3 text-zinc-400 text-[11px]">
                        <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                          {item.tipo}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-zinc-500 text-[11px] truncate max-w-[200px] hidden sm:table-cell" title={item.detalles}>
                        {item.detalles}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

