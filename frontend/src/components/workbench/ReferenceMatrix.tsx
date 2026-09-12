import React, { useState } from "react";
import { TIPOS_CIF } from "../../data/cifTypes";
import { PROVINCIAS_ESPANA } from "../../data/provincias";

export const ReferenceMatrix: React.FC = () => {
  const [cifFilter, setCifFilter] = useState("");
  const [provFilter, setProvFilter] = useState("");
  const [subTab, setSubTab] = useState<"cif" | "provincias" | "dni">("cif");

  const cifEntries = Object.entries(TIPOS_CIF).filter(([letra, data]) => {
    const q = cifFilter.toLowerCase();
    return letra.toLowerCase().includes(q) || data.descripcion.toLowerCase().includes(q) || data.tipoControl.toLowerCase().includes(q);
  });

  const provEntries = Object.entries(PROVINCIAS_ESPANA).filter(([codigo, nombre]) => {
    const q = provFilter.toLowerCase();
    return codigo.includes(q) || nombre.toLowerCase().includes(q);
  });

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-6 shadow-sm font-mono text-xs">
      <div className="border-b border-zinc-800 pb-4 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wide">
            Tablas Normativas Oficiales de España
          </h3>
          <p className="text-zinc-400 text-xs mt-0.5 font-sans">
            Guía de referencia rápida sobre especificaciones de la Agencia Tributaria, Ministerio del Interior e INE.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs">
          <button
            onClick={() => setSubTab("cif")}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              subTab === "cif" ? "bg-zinc-800 text-white font-bold" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Entidades CIF (AEAT)
          </button>
          <button
            onClick={() => setSubTab("provincias")}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              subTab === "provincias" ? "bg-zinc-800 text-white font-bold" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            52 Provincias (CP)
          </button>
          <button
            onClick={() => setSubTab("dni")}
            className={`px-3 py-1 rounded transition-colors cursor-pointer ${
              subTab === "dni" ? "bg-zinc-800 text-white font-bold" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Módulo 23 (DNI)
          </button>
        </div>
      </div>

      {subTab === "cif" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-zinc-400 text-[11px]">
              Tipología según la Orden EHA/451/2008 de la Agencia Tributaria:
            </span>
            <input
              type="text"
              placeholder="Filtrar por letra o tipo..."
              value={cifFilter}
              onChange={(e) => setCifFilter(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 px-3 py-1 rounded-lg text-zinc-200 text-xs outline-none w-52"
            />
          </div>

          <div className="border border-zinc-800 rounded-lg overflow-hidden max-h-[380px] overflow-y-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-zinc-950 sticky top-0 border-b border-zinc-800 text-[10px] text-zinc-400 uppercase">
                <tr>
                  <th className="p-2.5 w-16 text-center">Letra</th>
                  <th className="p-2.5">Naturaleza Jurídica de la Sociedad</th>
                  <th className="p-2.5 w-44">Carácter de Control AEAT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {cifEntries.map(([letra, data]) => (
                  <tr key={letra} className="hover:bg-zinc-950/40">
                    <td className="p-2.5 text-center font-bold text-amber-400 bg-zinc-950/40">
                      {letra}
                    </td>
                    <td className="p-2.5 text-zinc-200">
                      {data.descripcion}
                    </td>
                    <td className="p-2.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] border ${
                          data.tipoControl === "numero"
                            ? "bg-blue-950/50 text-blue-300 border-blue-800/60"
                            : data.tipoControl === "letra"
                            ? "bg-purple-950/50 text-purple-300 border-purple-800/60"
                            : "bg-emerald-950/50 text-emerald-300 border-emerald-800/60"
                        }`}
                      >
                        {data.tipoControl === "numero"
                          ? "Solo Numérico (0-9)"
                          : data.tipoControl === "letra"
                          ? "Solo Letra (A-J)"
                          : "Mixto (Número o Letra)"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subTab === "provincias" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-zinc-400 text-[11px]">
              Codificación oficial territorial de Correos de España y el INE (01 a 52):
            </span>
            <input
              type="text"
              placeholder="Filtrar provincia o código..."
              value={provFilter}
              onChange={(e) => setProvFilter(e.target.value)}
              className="bg-zinc-950 border border-zinc-800 px-3 py-1 rounded-lg text-zinc-200 text-xs outline-none w-52"
            />
          </div>

          <div className="border border-zinc-800 rounded-lg overflow-hidden max-h-[380px] overflow-y-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-zinc-950 sticky top-0 border-b border-zinc-800 text-[10px] text-zinc-400 uppercase">
                <tr>
                  <th className="p-2.5 w-20 text-center">Prefijo</th>
                  <th className="p-2.5">Provincia / Comunidad Uniprovincial</th>
                  <th className="p-2.5 w-36">Rango Postal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {provEntries.map(([codigo, nombre]) => (
                  <tr key={codigo} className="hover:bg-zinc-950/40">
                    <td className="p-2.5 text-center font-bold text-indigo-400 bg-zinc-950/40">
                      {codigo}
                    </td>
                    <td className="p-2.5 text-zinc-200">
                      {nombre}
                    </td>
                    <td className="p-2.5 text-zinc-400 text-[11px]">
                      {codigo}001 – {codigo}999
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subTab === "dni" && (
        <div className="space-y-4">
          <p className="text-zinc-300 text-xs leading-relaxed font-sans">
            El algoritmo del Ministerio del Interior divide el número del DNI (o NIE tras sustituir X=0, Y=1, Z=2) entre 23.
            El resto de la división entera (de 0 a 22) determina matemáticamente la letra correspondiente de la siguiente secuencia inmutable:
          </p>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {"TRWAGMYFPDXBNJZSQVHLCKE".split("").map((letra, index) => (
              <div key={index} className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-center">
                <span className="text-zinc-500 block text-[9px]">Resto {index}</span>
                <span className="text-zinc-100 font-bold text-base">{letra}</span>
              </div>
            ))}
          </div>

          <div className="p-3 bg-zinc-950 rounded-lg border border-zinc-800 text-zinc-400 text-[11px] space-y-1">
            <strong className="text-zinc-200 block">¿Por qué no están las letras I, O, U, Ñ?</strong>
            <p>
              El Real Decreto 1553/2005 excluye las vocales 'I' y 'O' para evitar confusiones tipográficas con los números '1' y '0', así como la 'U' por su similitud con la 'V'. La 'Ñ' se omite para evitar incompatibilidades con sistemas internacionales no UTF-8.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
