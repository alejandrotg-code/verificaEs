import React from "react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export const AppFooter: React.FC = () => {
  return (
    <footer className="border-t border-zinc-800 bg-[#090b10] mt-16 py-8 text-zinc-500 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left space-y-1">
          <p className="text-zinc-400">
            Desarrollado y mantenido por{" "}
            <a
              href="https://portfolio.alejandrotg.es"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-200 hover:text-white underline underline-offset-4 decoration-zinc-700 font-semibold"
            >
              Alejandro Tacoronte González
            </a>
          </p>
          <p className="text-[11px] text-zinc-600">
            Licencia MIT • Ejecución algorítmica pura en memoria • Conforme a RGPD
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs text-zinc-400">
          <a
            href="https://portfolio.alejandrotg.es"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-200 transition-colors"
          >
            Portfolio
          </a>
          <a
            href="https://github.com/alejandrotg-code/verificaEs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-200 transition-colors flex items-center gap-1"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/alejandrotacoronte/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-200 transition-colors flex items-center gap-1"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://pypi.org/project/verifica-es/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-200 transition-colors"
          >
            PyPI
          </a>
        </div>
      </div>
    </footer>
  );
};
