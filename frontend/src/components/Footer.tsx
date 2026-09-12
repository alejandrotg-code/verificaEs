import React from "react";
import { ShieldCheck, Heart, Globe, Package } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 mt-20 pt-12 pb-10 text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Privacy Note Box */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 sm:p-5 mb-10 flex items-start gap-3.5 max-w-3xl mx-auto">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-left space-y-1">
            <h4 className="font-semibold text-white text-xs">Compromiso de Privacidad y Seguridad (RGPD)</h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Esta herramienta realiza verificaciones puramente algorítmicas en memoria (cálculo de sumas de control,
              módulos matemáticos y formatos normativos). <strong>No almacena ningún dato</strong>, no utiliza bases de datos persistentes y <strong>no consulta registros privados ni gubernamentales</strong>.
            </p>
          </div>
        </div>

        {/* Links and Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-900">
          <div className="text-center sm:text-left">
            <p className="font-medium text-slate-300">
              Desarrollado con <Heart className="w-3.5 h-3.5 inline text-rose-500 fill-rose-500" /> por{" "}
              <a
                href="https://portfolio.alejandrotg.es"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-emerald-400 font-semibold underline underline-offset-4 decoration-slate-700 hover:decoration-emerald-400 transition-all"
              >
                Alejandro Tacoronte González
              </a>
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Licencia MIT • Código abierto y distribuido libremente
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://portfolio.alejandrotg.es"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors flex items-center gap-1 text-xs"
              title="Portfolio Web"
            >
              <Globe className="w-4 h-4" />
              <span>Portfolio</span>
            </a>

            <a
              href="https://github.com/alejandrotg-code/verificaEs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1 text-xs"
              title="Repositorio en GitHub"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/alejandrotacoronte/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors flex items-center gap-1 text-xs"
              title="Perfil de LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://pypi.org/project/verifica-es/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-yellow-400 transition-colors flex items-center gap-1 text-xs"
              title="Paquete oficial en PyPI"
            >
              <Package className="w-4 h-4" />
              <span>PyPI</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
