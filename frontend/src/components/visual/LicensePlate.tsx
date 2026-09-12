import React from "react";

interface LicensePlateProps {
  matricula: string;
  valido: boolean;
  formato?: string | null;
  provincia?: string | null;
}

export const LicensePlate: React.FC<LicensePlateProps> = ({ matricula, valido, formato, provincia }) => {
  const clean = matricula.trim().toUpperCase().replace(/[-\s]/g, "");

  let displayPart1 = clean.slice(0, 4);
  let displayPart2 = clean.slice(4);

  // Formato clásico (ej: GC-1234-AB o M-5678-Z)
  if (formato === "clasico") {
    const match = clean.match(/^([A-Z]{1,2})(\d{1,6})([A-Z]{0,2})$/);
    if (match) {
      displayPart1 = `${match[1]} ${match[2]}`;
      displayPart2 = match[3] ? ` ${match[3]}` : "";
    }
  }

  return (
    <div className="mt-4 flex flex-col items-center">
      {/* Placa física estilizada */}
      <div
        className={`w-full max-w-[340px] sm:max-w-[380px] h-[82px] bg-gradient-to-b from-slate-50 to-slate-200 text-zinc-950 rounded-xl border-[3.5px] shadow-2xl flex items-center overflow-hidden transition-all duration-300 select-none ${
          valido
            ? "border-zinc-900 shadow-emerald-500/10 ring-2 ring-emerald-500/30"
            : "border-zinc-800 opacity-80 ring-2 ring-rose-500/30"
        }`}
      >
        {/* Banda azul europea (Euroband) */}
        <div className="w-[46px] h-full bg-[#003399] flex flex-col items-center justify-between py-2 shrink-0 border-r-2 border-zinc-900">
          {/* Círculo de estrellas de la UE */}
          <div className="w-5 h-5 flex items-center justify-center text-[#ffcc00] text-[8px] leading-none">
            ⭐
          </div>
          {/* Código de país 'E' */}
          <span className="text-white font-extrabold text-sm tracking-tighter font-sans">
            E
          </span>
        </div>

        {/* Contenido de la placa */}
        <div className="flex-1 flex items-center justify-center px-4 font-mono font-black text-3xl sm:text-4xl tracking-widest text-zinc-900 uppercase">
          {clean ? (
            <div className="flex items-center gap-2">
              <span>{displayPart1}</span>
              <span>{displayPart2}</span>
            </div>
          ) : (
            <span className="text-zinc-400 font-normal text-2xl">0000 BBB</span>
          )}
        </div>
      </div>

      {/* Leyenda de la placa */}
      <div className="mt-3 flex items-center gap-3 text-xs text-zinc-400 font-mono">
        <span className="inline-flex items-center gap-1">
          Sistema:{" "}
          <strong className="text-zinc-200">
            {formato === "moderno"
              ? "DGT Europeo (4 números + 3 consonantes)"
              : formato === "clasico"
              ? `Provincial Histórico (${provincia || "España"})`
              : "No reconocido"}
          </strong>
        </span>
      </div>

      {formato === "moderno" && (
        <p className="text-[11px] text-zinc-500 mt-1 max-w-sm text-center">
          Regla DGT: Exclusión de vocales (A, E, I, O, U) para evitar palabras malsonantes, y de Ñ / Q para evitar confusiones ópticas con N / O / 0.
        </p>
      )}
    </div>
  );
};
