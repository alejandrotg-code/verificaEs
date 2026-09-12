import React from "react";
import { TIPOS_CIF } from "../../data/cifTypes";

interface CifBreakdownProps {
  cif: string;
  valido: boolean;
  entidad?: string | null;
}

export const CifBreakdown: React.FC<CifBreakdownProps> = ({ cif, valido, entidad }) => {
  const clean = cif.trim().toUpperCase().replace(/[-\s]/g, "");
  if (clean.length !== 9) return null;

  const tipo = clean[0];
  const digitos = clean.slice(1, 8);
  const control = clean[8];

  const infoTipo = TIPOS_CIF[tipo];

  // Cálculo detallado AEAT
  let sumaPares = 0;
  let sumaImpares = 0;
  if (/^\d{7}$/.test(digitos)) {
    sumaPares = parseInt(digitos[1], 10) + parseInt(digitos[3], 10) + parseInt(digitos[5], 10);
    for (const i of [0, 2, 4, 6]) {
      const mult = parseInt(digitos[i], 10) * 2;
      sumaImpares += Math.floor(mult / 10) + (mult % 10);
    }
  }

  const sumaTotal = sumaPares + sumaImpares;
  const c = (10 - (sumaTotal % 10)) % 10;
  const letrasControl = "JABCDEFGHI";
  const letraEsperada = letrasControl[c];
  const digitoEsperado = c.toString();

  return (
    <div className="mt-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
        <span className="text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
          Desglose Técnico según Normativa AEAT (Agencia Tributaria)
        </span>
        <span className="text-zinc-500 text-[10px]">Orden EHA/451/2008</span>
      </div>

      {/* Segmentos visuales */}
      <div className="grid grid-cols-3 gap-2 text-center mb-3">
        <div className="bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800">
          <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">TIPO DE ENTIDAD</span>
          <span className="text-amber-400 font-bold text-xl">{tipo}</span>
          <span className="text-[10px] text-zinc-300 block mt-1 truncate" title={entidad || infoTipo?.descripcion}>
            {infoTipo?.descripcion.split("(")[0] || "Persona Jurídica"}
          </span>
        </div>

        <div className="bg-zinc-900/80 p-2.5 rounded-lg border border-zinc-800">
          <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">DÍGITOS PROVINCIAL / SERIE</span>
          <span className="text-zinc-200 font-bold text-xl">{digitos}</span>
          <span className="text-[10px] text-zinc-500 block mt-1">7 dígitos de registro</span>
        </div>

        <div className={`p-2.5 rounded-lg border ${valido ? "bg-emerald-950/40 border-emerald-800/50" : "bg-rose-950/40 border-rose-800/50"}`}>
          <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">CARÁCTER CONTROL</span>
          <span className={`font-bold text-xl ${valido ? "text-emerald-400" : "text-rose-400"}`}>
            {control}
          </span>
          <span className="text-[10px] text-zinc-400 block mt-1">
            {valido ? "Correcto" : `Esperado: ${infoTipo?.tipoControl === "numero" ? digitoEsperado : infoTipo?.tipoControl === "letra" ? letraEsperada : `${digitoEsperado} o ${letraEsperada}`}`}
          </span>
        </div>
      </div>

      {/* Regla de la AEAT */}
      <div className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/80 space-y-1.5 text-[11px] text-zinc-400">
        <div className="text-zinc-300 font-semibold">
          📋 Criterio de Control según Tipo Jurídico ({tipo}):
        </div>
        <div className="text-zinc-400">
          • Tipo de control estricto:{" "}
          <span className="text-zinc-200 font-medium">
            {infoTipo?.tipoControl === "numero"
              ? "Solo Numérico (Exclusivo para A, B, E, H)"
              : infoTipo?.tipoControl === "letra"
              ? "Solo Letra (Exclusivo para P, Q, R, S, W)"
              : "Mixto (Admite dígito o letra de control)"}
          </span>
        </div>
        <div className="text-zinc-400">
          • Sumas: Pares = <code className="text-zinc-300">{sumaPares}</code>, Doble de impares = <code className="text-zinc-300">{sumaImpares}</code> → Suma total = <code className="text-zinc-300">{sumaTotal}</code>
        </div>
        <div className="text-zinc-400">
          • Complemento: (10 - ({sumaTotal} mod 10)) mod 10 = <span className="text-emerald-400 font-bold">{c}</span> → Letra: <span className="text-emerald-400 font-bold">'{letraEsperada}'</span>
        </div>
      </div>
    </div>
  );
};
