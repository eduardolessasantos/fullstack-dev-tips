import React from 'react';
import { BookOpen, ShieldCheck, Scale, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { AdUnit } from './AdUnit.tsx';

export function EditorialView() {
  return (
    <div className="space-y-10 animate-in fade-in duration-300 max-w-4xl pb-16">
      <header className="border-b border-slate-800/80 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
          <Scale size={14} />
          <span>Ética & Governança Editorial</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Diretrizes Editoriais do CodeCompare
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Nossa declaração formal de transparência, independência técnica, metodologia de revisão por pares e critérios de correção de erratas.
        </p>
      </header>

      {/* Princípios Fundamentais */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-lg font-bold text-white">Independência Editorial</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              O CodeCompare não aceita pagamentos, patrocínios ocultos ou favorecimentos comerciais para promover ou desfavorecer qualquer framework, nuvem ou empresa de software. Nossas comparações são estritamente agnósticas e orientadas a métricas de engenharia.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-lg font-bold text-white">Código Real e Testável</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Todo trecho de código exibido na plataforma é previamente compilado e testado nas versões estáveis vigentes das respectivas linguagens e runtimes (.NET 8, Node.js 20+, Python 3.12, Go 1.22+, etc.).
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-lg font-bold text-white">Ciclo Contínuo de Atualizações</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              O mundo do software evolui em ritmo acelerado. Quando uma nova versão estável (LTS ou Major) de um framework é lançada com mudanças estruturais de sintaxe (como a introdução de Signals no Angular ou Minimal APIs no .NET), revisamos nossos artigos e snippets para refletir a prática contemporânea.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
              4
            </div>
            <h3 className="text-lg font-bold text-white">Política Clara de Erratas</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Se qualquer membro da comunidade de desenvolvedores identificar uma inconsistência técnica, bug em snippet ou premissa imprecisa, a correção é investigada e publicada com transparência, acompanhada de nota de revisão no próprio artigo.
            </p>
          </div>
        </div>
      </section>

      {/* Como reportar uma errata */}
      <section className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <AlertCircle size={18} className="text-cyan-400" />
          Encontrou um ponto a melhorar em uma análise técnica?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Incentivamos a revisão contínua. Você pode enviar sugestões de melhoria ou novas tecnologias para compararmos diretamente pela nossa página de contato ou pelo e-mail <strong>eduardolessa2011@gmail.com</strong>.
        </p>
      </section>

      <AdUnit slot="7788991122" format="auto" label="Espaço Patrocinado • CodeCompare" />
    </div>
  );
}
