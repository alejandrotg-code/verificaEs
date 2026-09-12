import React from "react";

interface PostalBreakdownProps {
  cp: string;
  valido?: boolean;
  provincia?: string | null;
}

export const PostalBreakdown: React.FC<PostalBreakdownProps> = ({ cp, valido = true, provincia }) => {
  const clean = cp.trim().replace(/\s/g, "");
  if (clean.length !== 5 || !/^\d{5}$/.test(clean)) return null;

  const prefijo = clean.slice(0, 2);
  const distrito = clean.slice(2);

  return (
    <div className={`mt-4 p-4 rounded-xl bg-zinc-950 border font-mono text-xs ${valido ? "border-zinc-800" : "border-rose-900/60"}`}>
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
        <span className="text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
          Desglose Geográfico Oficial (Correos de España & INE)
        </span>
        <span className="text-zinc-500 text-[10px]">Rango Nacional: 01000 - 52999</span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-center mb-3">
        <div className="bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
          <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">CÓDIGO DE PROVINCIA</span>
          <span className="text-indigo-400 font-bold text-2xl">{prefijo}</span>
          <span className="text-zinc-300 block text-xs mt-1 font-semibold">
            {provincia || "Prefijo no asignado"}
          </span>
        </div>

        <div className="bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
          <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">ZONA / DISTRITO POSTAL</span>
          <span className="text-cyan-400 font-bold text-2xl">{distrito}</span>
          <span className="text-zinc-400 block text-[11px] mt-1">
            {distrito === "001" ? "Distrito central provincial" : `Área o municipio #${distrito}`}
          </span>
        </div>
      </div>

      <div className="text-[11px] text-zinc-400 bg-zinc-900/40 p-2.5 rounded-lg border border-zinc-800">
        📍 En España, los dos primeros dígitos indican siempre la provincia en orden alfabético histórico (del 01 Álava al 50 Zaragoza, más 51 Ceuta y 52 Melilla).
      </div>
    </div>
  );
};
