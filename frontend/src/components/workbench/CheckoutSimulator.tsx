import React, { useState } from "react";
import {
  verificarCif,
  verificarDocumento,
  verificarIban,
  verificarCodigoPostal,
  verificarTelefono,
} from "../../utils/engine";

export const CheckoutSimulator: React.FC = () => {
  const [cif, setCif] = useState("B86660149");
  const [razonSocial, setRazonSocial] = useState("Acme Logística Canaria S.L.");
  const [dniAdmin, setDniAdmin] = useState("12345678Z");
  const [cp, setCp] = useState("35001");
  const [iban, setIban] = useState("ES9121000418450200051332");
  const [telefono, setTelefono] = useState("+34 928 12 34 56");
  const [submitted, setSubmitted] = useState(false);

  // Validaciones en tiempo real
  const cifRes = verificarCif(cif);
  const adminRes = verificarDocumento(dniAdmin);
  const cpRes = verificarCodigoPostal(cp);
  const ibanRes = verificarIban(iban);
  const telRes = verificarTelefono(telefono);

  const todoValido = cifRes.valido && adminRes.valido && cpRes.valido && ibanRes.valido && telRes.valido;

  return (
    <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-6 shadow-sm max-w-3xl mx-auto font-mono text-xs">
      <div className="border-b border-zinc-800 pb-4 mb-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-wide">
            Simulador de Facturación y Onboarding Corporativo (B2B)
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
            Integración en Producción
          </span>
        </div>
        <p className="text-zinc-400 text-xs mt-1 font-sans">
          Demostración práctica de cómo una plataforma SaaS, ERP o pasarela española pre-valida formularios de alta
          sin realizar peticiones costosas a bases de datos ni permitir erratas sintácticas.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* CIF Empresa */}
          <div>
            <label className="block text-zinc-400 font-medium mb-1">
              CIF de la Sociedad:
            </label>
            <input
              type="text"
              value={cif}
              onChange={(e) => setCif(e.target.value)}
              className={`w-full bg-zinc-950 border px-3 py-2 rounded-lg text-zinc-200 outline-none ${
                cifRes.valido ? "border-zinc-700 focus:border-emerald-500" : "border-rose-800/80"
              }`}
            />
            <div className="mt-1 flex items-center justify-between text-[11px]">
              <span className={cifRes.valido ? "text-emerald-400" : "text-rose-400"}>
                {cifRes.valido ? `✓ ${cifRes.entidad}` : "✗ CIF incorrecto según AEAT"}
              </span>
            </div>
          </div>

          {/* Razón Social */}
          <div>
            <label className="block text-zinc-400 font-medium mb-1">
              Razón Social:
            </label>
            <input
              type="text"
              value={razonSocial}
              onChange={(e) => setRazonSocial(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 focus:border-zinc-400 px-3 py-2 rounded-lg text-zinc-200 outline-none"
            />
          </div>

          {/* DNI Administrador */}
          <div>
            <label className="block text-zinc-400 font-medium mb-1">
              DNI/NIE Representante Legal:
            </label>
            <input
              type="text"
              value={dniAdmin}
              onChange={(e) => setDniAdmin(e.target.value)}
              className={`w-full bg-zinc-950 border px-3 py-2 rounded-lg text-zinc-200 outline-none ${
                adminRes.valido ? "border-zinc-700 focus:border-emerald-500" : "border-rose-800/80"
              }`}
            />
            <span className={`block mt-1 text-[11px] ${adminRes.valido ? "text-emerald-400" : "text-rose-400"}`}>
              {adminRes.valido ? `✓ ${adminRes.tipo} verificado por módulo 23` : "✗ Documento no válido"}
            </span>
          </div>

          {/* Código Postal + Provincia Auto-resuelta */}
          <div>
            <label className="block text-zinc-400 font-medium mb-1">
              Código Postal & Provincia:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={cp}
                onChange={(e) => setCp(e.target.value)}
                maxLength={5}
                className={`w-28 bg-zinc-950 border px-3 py-2 rounded-lg text-zinc-200 outline-none ${
                  cpRes.valido ? "border-zinc-700 focus:border-emerald-500" : "border-rose-800/80"
                }`}
              />
              <input
                type="text"
                disabled
                value={cpRes.provincia ? `Provincia: ${cpRes.provincia}` : "Provincia desconocida"}
                className="flex-1 bg-zinc-950/60 border border-zinc-800 px-3 py-2 rounded-lg text-zinc-400 cursor-not-allowed text-[11px]"
              />
            </div>
          </div>

          {/* IBAN Domiciliación */}
          <div className="sm:col-span-2">
            <label className="block text-zinc-400 font-medium mb-1">
              IBAN para Domiciliación Bancaria:
            </label>
            <input
              type="text"
              value={iban}
              onChange={(e) => setIban(e.target.value)}
              className={`w-full bg-zinc-950 border px-3 py-2 rounded-lg text-zinc-200 outline-none ${
                ibanRes.valido ? "border-zinc-700 focus:border-emerald-500" : "border-rose-800/80"
              }`}
            />
            <div className="mt-1 flex items-center justify-between text-[11px]">
              <span className={ibanRes.valido ? "text-emerald-400" : "text-rose-400"}>
                {ibanRes.valido ? `✓ Entidad: ${ibanRes.banco} (ISO 7064 OK)` : "✗ Dígitos de control IBAN erróneos"}
              </span>
            </div>
          </div>

          {/* Teléfono */}
          <div className="sm:col-span-2">
            <label className="block text-zinc-400 font-medium mb-1">
              Teléfono de Contacto Fiscal:
            </label>
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className={`w-full bg-zinc-950 border px-3 py-2 rounded-lg text-zinc-200 outline-none ${
                telRes.valido ? "border-zinc-700 focus:border-emerald-500" : "border-rose-800/80"
              }`}
            />
            <span className={`block mt-1 text-[11px] ${telRes.valido ? "text-emerald-400" : "text-rose-400"}`}>
              {telRes.valido ? "✓ Prefijo y numeración nacional conforme" : "✗ Número telefónico no válido en España"}
            </span>
          </div>
        </div>

        {/* Action Button & Payload */}
        <div className="pt-3 border-t border-zinc-800 flex items-center justify-between flex-wrap gap-3">
          <div className="text-zinc-400 text-[11px]">
            Estado del formulario:{" "}
            <strong className={todoValido ? "text-emerald-400" : "text-rose-400"}>
              {todoValido ? "100% Validado por verifica-es" : "Campos pendientes de corrección"}
            </strong>
          </div>

          <button
            type="submit"
            disabled={!todoValido}
            className={`px-4 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
              todoValido
                ? "bg-zinc-100 text-zinc-900 hover:bg-white shadow-sm"
                : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
            }`}
          >
            Generar Payload de Registro
          </button>
        </div>
      </form>

      {submitted && todoValido && (
        <div className="mt-5 p-4 rounded-lg bg-zinc-950 border border-zinc-800">
          <span className="text-zinc-400 block text-[10px] uppercase font-bold mb-2">
            Payload JSON emitido listo para API Backend:
          </span>
          <pre className="text-emerald-400 text-[11px] overflow-x-auto">
            {JSON.stringify(
              {
                empresa: {
                  cif,
                  razon_social: razonSocial,
                  tipo_sociedad: cifRes.entidad,
                },
                administrador: {
                  identificador: dniAdmin,
                  tipo: adminRes.tipo,
                },
                domicilio_fiscal: {
                  codigo_postal: cp,
                  provincia: cpRes.provincia,
                },
                bancario: {
                  iban_formateado: ibanRes.formato,
                  entidad_financiera: ibanRes.banco,
                },
                contacto: {
                  telefono,
                },
              },
              null,
              2
            )}
          </pre>
        </div>
      )}
    </div>
  );
};
