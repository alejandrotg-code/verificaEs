import React from "react";
import { ShieldCheck, ExternalLink, Terminal, Lock } from "lucide-react";
import { GithubIcon } from "./Icons";

export const Navbar: React.FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-white font-bold text-lg ring-1 ring-white/10">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white">verifica-es</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                v1.1.1
              </span>
              <span className="text-sm" title="España">🇪🇸</span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Validador algorítmico & API REST
            </p>
          </div>
        </div>

        {/* Badges & Links */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-medium">
              <Lock className="w-3 h-3 text-emerald-400" />
              0 Dependencias Core
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-medium">
              <Terminal className="w-3 h-3 text-cyan-400" />
              CLI + FastAPI
            </span>
          </div>

          <a
            href="https://pypi.org/project/verifica-es/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-all"
          >
            PyPI
            <ExternalLink className="w-3 h-3" />
          </a>

          <a
            href="https://github.com/alejandrotg-code/verificaEs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all shadow-sm"
          >
            <GithubIcon className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
