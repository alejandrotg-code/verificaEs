import React, { useState } from "react";
import { Terminal, Play } from "lucide-react";
import {
  verificarDni,
  verificarNie,
  verificarCif,
  verificarDocumento,
  verificarIban,
  verificarCodigoPostal,
  verificarMatricula,
  verificarTelefono,
} from "../utils/engine";

const PRESET_COMMANDS = [
  "verifica-es doc B86660149",
  "verifica-es dni 12345678Z",
  "verifica-es cp 35001",
  "verifica-es iban ES9121000418450200051332",
  "verifica-es matricula 1234BBB",
  "verifica-es --help",
];

export const CliSimulator: React.FC = () => {
  const [commandInput, setCommandInput] = useState("verifica-es doc B86660149");
  const [history, setHistory] = useState<Array<{ cmd: string; output: string; isError?: boolean }>>([
    {
      cmd: "verifica-es doc B86660149",
      output: "[VALIDO] 'B86660149' [Tipo detectado: CIF]\n-> Sociedad de Responsabilidad Limitada (S.L.)",
    },
  ]);

  const executeCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    let out = "";
    let isErr = false;

    if (trimmed === "verifica-es --version" || trimmed === "verifica-es -v") {
      out = "verifica-es 1.1.1";
    } else if (trimmed === "verifica-es --help" || trimmed === "verifica-es -h" || trimmed === "verifica-es") {
      out = `usage: verifica-es [-h] [--version] {dni,nie,cif,doc,cp,matricula,iban,telefono} ...

Herramienta CLI para validar documentos y formatos oficiales de España.

commands:
  dni         Valida un DNI español
  nie         Valida un NIE español
  cif         Valida un CIF de empresa
  doc         Auto-detecta si es DNI, NIE o CIF y lo valida
  cp          Valida un Código Postal y muestra la provincia
  matricula   Valida formato de matrícula (moderna o clásica)
  iban        Valida un IBAN español (módulo 97)
  telefono    Valida número telefónico móvil o fijo`;
    } else {
      const parts = trimmed.split(/\s+/);
      if (parts[0] !== "verifica-es") {
        out = `bash: comando no encontrado: ${parts[0]}. Usa 'verifica-es <comando> <valor>'`;
        isErr = true;
      } else {
        const sub = parts[1];
        const val = parts.slice(2).join(" ");

        if (!val) {
          out = `error: verifica-es ${sub || ""}: falta el valor del parámetro a validar.`;
          isErr = true;
        } else {
          switch (sub) {
            case "dni": {
              const res = verificarDni(val);
              out = res.valido ? `[VALIDO] DNI '${val}' es correcto.` : `[INVALIDO] DNI '${val}' no es válido. (${res.detalles})`;
              isErr = !res.valido;
              break;
            }
            case "nie": {
              const res = verificarNie(val);
              out = res.valido ? `[VALIDO] NIE '${val}' es correcto.` : `[INVALIDO] NIE '${val}' no es válido. (${res.detalles})`;
              isErr = !res.valido;
              break;
            }
            case "cif": {
              const res = verificarCif(val);
              out = res.valido
                ? `[VALIDO] CIF '${val}' correcto.\nEntidad: ${res.entidad || "Sociedad"}`
                : `[INVALIDO] CIF '${val}' no es válido.\n${res.detalles}`;
              isErr = !res.valido;
              break;
            }
            case "doc": {
              const res = verificarDocumento(val);
              out = res.valido
                ? `[VALIDO] '${val}' [Tipo detectado: ${res.tipo}]\n${res.detalles || ""}`
                : `[INVALIDO] '${val}' [Tipo detectado: ${res.tipo}]\n${res.detalles || ""}`;
              isErr = !res.valido;
              break;
            }
            case "cp": {
              const res = verificarCodigoPostal(val);
              out = res.valido
                ? `[VALIDO] '${val}' (Provincia: ${res.provincia || "Desconocida"})`
                : `[INVALIDO] Código Postal '${val}' fuera del rango provincial oficial.`;
              isErr = !res.valido;
              break;
            }
            case "matricula": {
              const res = verificarMatricula(val);
              out = res.valido
                ? `[VALIDO] Matrícula '${val}' [Formato: ${res.formato}]`
                : `[INVALIDO] Matrícula '${val}' no cumple la normativa DGT.`;
              isErr = !res.valido;
              break;
            }
            case "iban": {
              const res = verificarIban(val);
              out = res.valido
                ? `[VALIDO] IBAN '${val}' verificado con módulo 97.\nEntidad: ${res.banco || "Bancaria"}`
                : `[INVALIDO] IBAN '${val}' erróneo según algoritmo ISO 7064.`;
              isErr = !res.valido;
              break;
            }
            case "telefono": {
              const res = verificarTelefono(val);
              out = res.valido ? `[VALIDO] Teléfono '${val}' español válido.` : `[INVALIDO] Número '${val}' no coincide con rango español.`;
              isErr = !res.valido;
              break;
            }
            default:
              out = `error: comando '${sub}' desconocido. Usa 'verifica-es --help'`;
              isErr = true;
          }
        }
      }
    }

    setHistory((prev) => [...prev, { cmd: trimmed, output: out, isError: isErr }]);
    setCommandInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(commandInput);
    }
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl font-mono text-xs">
      {/* Terminal Window Header */}
      <div className="bg-zinc-900 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="text-zinc-400 text-xs font-semibold ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-zinc-400" />
            verifica-es — CLI Terminal Emulator
          </span>
        </div>

        <button
          onClick={() => setHistory([])}
          className="text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
        >
          Limpiar consola
        </button>
      </div>

      {/* Preset Chips */}
      <div className="px-4 py-2 bg-zinc-900/50 border-b border-zinc-800/80 flex items-center gap-2 overflow-x-auto text-[11px]">
        <span className="text-zinc-500 whitespace-nowrap">Ejecutar:</span>
        {PRESET_COMMANDS.map((cmd, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCommandInput(cmd);
              executeCommand(cmd);
            }}
            className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border border-zinc-700 whitespace-nowrap cursor-pointer transition-all"
          >
            {cmd.replace("verifica-es ", "")}
          </button>
        ))}
      </div>

      {/* Terminal Body */}
      <div className="p-4 space-y-3 max-h-[320px] overflow-y-auto leading-relaxed">
        <div className="text-zinc-500 text-[11px]">
          # Terminal interactiva de la CLI 'verifica-es' instalada con 'pip install verifica-es'
          <br /># Escribe cualquier comando o pulsa los accesos directos superiores.
        </div>

        {history.map((h, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <span className="text-zinc-500">$</span>
              <span>{h.cmd}</span>
            </div>
            <pre
              className={`whitespace-pre-wrap pl-4 border-l-2 ${
                h.isError ? "border-rose-500 text-rose-300" : "border-emerald-500/50 text-zinc-300"
              }`}
            >
              {h.output}
            </pre>
          </div>
        ))}

        {/* Active prompt line */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 font-bold">$</span>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="verifica-es dni 12345678Z..."
            className="flex-1 bg-transparent text-zinc-100 outline-none font-mono text-xs placeholder-zinc-600"
          />
          <button
            onClick={() => executeCommand(commandInput)}
            className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer"
            title="Ejecutar comando (Enter)"
          >
            <Play className="w-3 h-3 text-emerald-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

