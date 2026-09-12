import React from "react";

const LETRAS_DNI = "TRWAGMYFPDXBNJZSQVHLCKE";

interface DniMathInspectorProps {
  valor: string;
  valido: boolean;
  tipo?: string | null;
}

export const DniMathInspector: React.FC<DniMathInspectorProps> = ({ valor, valido, tipo }) => {
  const clean = valor.trim().toUpperCase().replace(/[-\s]/g, "");
  if (clean.length !== 9) return null;

  let numero = 0;
  let prefijoLabel = "";

  if (tipo === "NIE" || ["X", "Y", "Z"].includes(clean[0])) {
    const p = clean[0];
    const map: Record<string, string> = { X: "0", Y: "1", Z: "2" };
    prefijoLabel = `Sustitución de prefijo '${p}' por '${map[p]}'`;
    numero = parseInt((map[p] || "0") + clean.slice(1, 8), 10);
  } else if (/^\d{8}/.test(clean)) {
    numero = parseInt(clean.slice(0, 8), 10);
  } else {
    return null;
  }

  const resto = isNaN(numero) ? 0 : numero % 23;
  const letraEsperada = LETRAS_DNI[resto];
  const letraRecibida = clean[8];

  return (
    <div className="mt-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
        <span className="text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
          Desglose Algorítmico Oficial (Módulo 23 del Ministerio del Interior)
        </span>
        <span className="text-zinc-500 text-[10px]">Ecuación: N mod 23</span>
      </div>

      {prefijoLabel && (
        <div className="mb-2 text-zinc-400 text-[11px] bg-zinc-900/60 px-2 py-1 rounded border border-zinc-800">
          ℹ️ {prefijoLabel} → Base numérica calculada: <span className="text-zinc-200 font-bold">{numero}</span>
        </div>
      )}

      {/* Operación matemática */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-1 text-center mb-3">
        <div className="bg-zinc-900/90 p-2 rounded-lg border border-zinc-800">
          <span className="text-zinc-500 block text-[10px]">DIVIDENDO (NÚMERO)</span>
          <span className="text-zinc-200 font-bold text-sm">{numero}</span>
        </div>
        <div className="bg-zinc-900/90 p-2 rounded-lg border border-zinc-800">
          <span className="text-zinc-500 block text-[10px]">DIVISOR FIJO</span>
          <span className="text-zinc-400 font-bold text-sm">23</span>
        </div>
        <div className={`p-2 rounded-lg border ${valido ? "bg-emerald-950/40 border-emerald-800/50" : "bg-rose-950/40 border-rose-800/50"}`}>
          <span className="text-zinc-400 block text-[10px]">RESTO (ÍNDICE)</span>
          <span className={`font-bold text-sm ${valido ? "text-emerald-400" : "text-rose-400"}`}>
            {resto} → Letra '{letraEsperada}'
          </span>
        </div>
      </div>

      {/* Tabla de letras con highlighting del índice */}
      <div className="mt-3">
        <span className="text-[10px] text-zinc-500 block mb-1">
          Tabla oficial de asignación (posiciones 0 a 22):
        </span>
        <div className="flex flex-wrap gap-1 text-[11px] justify-between">
          {[...LETRAS_DNI].map((char, index) => {
            const isTarget = index === resto;
            return (
              <div
                key={index}
                className={`w-6 h-7 flex flex-col items-center justify-center rounded border transition-all ${
                  isTarget
                    ? valido
                      ? "bg-emerald-500 text-zinc-950 font-black border-emerald-400 scale-110 shadow-lg shadow-emerald-500/20"
                      : "bg-rose-500 text-white font-black border-rose-400 scale-110 shadow-lg shadow-rose-500/20"
                    : "bg-zinc-900/50 text-zinc-500 border-zinc-800"
                }`}
                title={`Índice ${index} = '${char}'`}
              >
                <span className="leading-none text-[10px]">{char}</span>
                <span className="text-[7px] opacity-70 leading-none">{index}</span>
              </div>
            );
          })}
        </div>
      </div>

      {!valido && (
        <div className="mt-3 p-2 rounded bg-rose-950/30 border border-rose-900/50 text-rose-300 text-[11px]">
          ⚠️ La letra proporcionada es <strong>'{letraRecibida}'</strong>, pero el residuo <strong>{resto}</strong> exige la letra <strong>'{letraEsperada}'</strong>.
        </div>
      )}
    </div>
  );
};
