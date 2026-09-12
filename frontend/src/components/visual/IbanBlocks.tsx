import React from "react";

interface IbanBlocksProps {
  iban: string;
  valido: boolean;
  banco?: string | null;
}

export const IbanBlocks: React.FC<IbanBlocksProps> = ({ iban, valido, banco }) => {
  const clean = iban.trim().toUpperCase().replace(/[-\s]/g, "");
  if (!clean.startsWith("ES") || clean.length !== 24) return null;

  const pais = clean.slice(0, 2);
  const dcIban = clean.slice(2, 4);
  const entidad = clean.slice(4, 8);
  const sucursal = clean.slice(8, 12);
  const dcCuenta = clean.slice(12, 14);
  const cuenta = clean.slice(14, 24);

  return (
    <div className="mt-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
        <span className="text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
          Estructura Oficial del Código Cuenta Cliente (CCC / IBAN Español)
        </span>
        <span className="text-zinc-500 text-[10px]">Norma ISO 7064 (MOD 97-10)</span>
      </div>

      {/* Segmentos visuales con etiquetas */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center mb-4">
        {/* País */}
        <div className="bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800">
          <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">País</span>
          <span className="text-cyan-400 font-bold text-base">{pais}</span>
          <span className="text-[9px] text-zinc-500 block mt-0.5">España</span>
        </div>

        {/* DC IBAN */}
        <div className="bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800">
          <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">DC IBAN</span>
          <span className="text-amber-400 font-bold text-base">{dcIban}</span>
          <span className="text-[9px] text-zinc-500 block mt-0.5">Control global</span>
        </div>

        {/* Entidad */}
        <div className="bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800">
          <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">Entidad</span>
          <span className="text-emerald-400 font-bold text-base">{entidad}</span>
          <span className="text-[9px] text-zinc-400 block mt-0.5 truncate">{banco?.split(" ")[0] || "Banco"}</span>
        </div>

        {/* Sucursal */}
        <div className="bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800">
          <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">Oficina</span>
          <span className="text-zinc-300 font-bold text-base">{sucursal}</span>
          <span className="text-[9px] text-zinc-500 block mt-0.5">Sucursal</span>
        </div>

        {/* DC CCC */}
        <div className="bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800">
          <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">DC CCC</span>
          <span className="text-indigo-400 font-bold text-base">{dcCuenta}</span>
          <span className="text-[9px] text-zinc-500 block mt-0.5">Dígitos control</span>
        </div>

        {/* Nº de Cuenta */}
        <div className="bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800">
          <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">Nº Cuenta</span>
          <span className="text-zinc-200 font-bold text-sm tracking-tight">{cuenta}</span>
          <span className="text-[9px] text-zinc-500 block mt-0.5">10 dígitos</span>
        </div>
      </div>

      {/* Algoritmo Módulo 97 */}
      <div className="p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800 text-[11px] text-zinc-400 leading-relaxed">
        <div className="text-zinc-300 font-semibold mb-1">
          ⚙️ Algoritmo de Verificación Modular:
        </div>
        <div>
          1. Reordenación: Se mueven los 4 primeros caracteres al final: <code className="text-zinc-200">{clean.slice(4)} + {clean.slice(0, 4)}</code>
        </div>
        <div>
          2. Conversión alfabética: <code className="text-zinc-200">E → 14</code>, <code className="text-zinc-200">S → 28</code>
        </div>
        <div className="mt-1">
          3. Resultado matemático:{" "}
          <span className={valido ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
            {valido ? "Número mod 97 = 1 (Verificación Exitosa)" : "Número mod 97 ≠ 1 (IBAN Corrupto o Erróneo)"}
          </span>
        </div>
      </div>
    </div>
  );
};
