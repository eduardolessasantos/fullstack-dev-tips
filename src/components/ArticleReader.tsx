import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Share2,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Layers,
  Code2
} from 'lucide-react';
import { DetailedArticle, PageId } from '../types.ts';
import { CodeBlock } from './CodeBlock.tsx';
import { AdUnit } from './AdUnit.tsx';

interface ArticleReaderProps {
  article: DetailedArticle;
  theme: 'dark' | 'light';
  onBack: () => void;
  onNavigateToArticle: (articleId: string) => void;
  onNavigateToPage: (page: PageId, subTab?: string) => void;
}

export function ArticleReader({
  article,
  theme,
  onBack,
  onNavigateToArticle,
  onNavigateToPage
}: ArticleReaderProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Monitor reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        const current = (window.scrollY / total) * 100;
        setScrollProgress(Math.min(100, Math.max(0, current)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <article className="space-y-10 animate-in fade-in duration-300 pb-16">
      {/* Barra de Progresso de Leitura Fixa no Topo */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navegação de Retorno & Metadados */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Voltar para Início</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
              copied
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {copied ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Share2 size={13} />}
            <span>{copied ? 'Link Copiado!' : 'Compartilhar'}</span>
          </button>
        </div>
      </div>

      {/* Cabeçalho do Artigo */}
      <header className="space-y-4 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[11px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            {article.tag}
          </span>
          <span className="text-slate-500 flex items-center gap-1 font-mono">
            <Clock size={12} />
            {article.readingTime}
          </span>
          <span className="text-slate-500 flex items-center gap-1 font-mono">
            <Calendar size={12} />
            {article.date}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
          {article.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
          {article.subtitle}
        </p>

        {/* Autor com Credenciais (Requisito E-E-A-T do Google) */}
        <div className="pt-4 flex items-center gap-3.5 border-t border-slate-800/80">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
            EL
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white">{article.author.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-mono">
                Autor Verificado
              </span>
            </div>
            <p className="text-xs text-slate-400">{article.author.role}</p>
          </div>
        </div>
      </header>

      {/* AdUnit após cabeçalho */}
      <AdUnit slot="5566778899" format="horizontal" label="Espaço do Patrocinador • Google AdSense" />

      {/* Introdução com Destaque Tipográfico */}
      <section className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed max-w-4xl">
        {article.introduction.map((paragraph, idx) => (
          <p
            key={idx}
            className={idx === 0 ? 'text-base sm:text-lg text-slate-200 font-medium leading-relaxed' : ''}
          >
            {paragraph}
          </p>
        ))}
      </section>

      {/* O Problema Contextual no Mundo Real */}
      <section className="p-6 sm:p-8 rounded-2xl border border-rose-500/20 bg-rose-950/10 space-y-4 max-w-4xl">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-base sm:text-lg">
          <AlertTriangle size={20} />
          <h2>{article.contextProblem.title}</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {article.contextProblem.description}
        </p>
        <div className="space-y-2 pt-2">
          <span className="text-xs font-mono uppercase tracking-wider text-rose-300 font-semibold block">
            Sintomas observados em produção:
          </span>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-400">
            {article.contextProblem.symptoms.map((symptom, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-rose-400 font-bold shrink-0 mt-0.5">•</span>
                <span>{symptom}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tabela de Benchmarks (se houver) */}
      {article.benchmarks && (
        <section className="space-y-4 max-w-4xl">
          <div className="flex items-center gap-2">
            <TrendingUp size={20} className="text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {article.benchmarks.title}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            {article.benchmarks.description}
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/80 shadow-xl">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400">
                  <th className="p-3.5">Métrica Analisada</th>
                  <th className="p-3.5">Tecnologia A</th>
                  <th className="p-3.5">Tecnologia B</th>
                  {article.benchmarks.data[0]?.stackC && <th className="p-3.5">Tecnologia C</th>}
                  <th className="p-3.5">Análise Técnica</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {article.benchmarks.data.map((bench, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 font-bold text-white whitespace-nowrap">{bench.metric}</td>
                    <td className="p-3.5 text-cyan-300">{bench.stackA}</td>
                    <td className="p-3.5 text-purple-300">{bench.stackB}</td>
                    {bench.stackC && <td className="p-3.5 text-emerald-300">{bench.stackC}</td>}
                    <td className="p-3.5 text-slate-400 leading-relaxed">{bench.observation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Trade-offs & Prós e Contras */}
      <section className="space-y-6 max-w-4xl">
        <div className="flex items-center gap-2">
          <Layers size={20} className="text-purple-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Análise Arquitetural de Trade-offs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {article.keyTradeoffs.map((tradeoff, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <h3 className="font-bold text-base sm:text-lg text-white">
                  {tradeoff.title}
                </h3>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono uppercase font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={12} /> Pontos Fortes:
                  </span>
                  <ul className="text-xs text-slate-300 space-y-1 pl-1">
                    {tradeoff.pros.map((pro, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-mono uppercase font-bold text-amber-400 flex items-center gap-1">
                    <AlertTriangle size={12} /> Desvantagens & Limites:
                  </span>
                  <ul className="text-xs text-slate-400 space-y-1 pl-1">
                    {tradeoff.cons.map((con, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-1.5">
                        <span className="text-amber-400 mt-0.5">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
                <strong className="text-cyan-400">Quando Escolher:</strong> {tradeoff.whenToChoose}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Snippets de Código com Explicação Passo a Passo */}
      {article.codeComparison && (
        <section className="space-y-6 max-w-4xl">
          <div className="flex items-center gap-2">
            <Code2 size={20} className="text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {article.codeComparison.title}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            {article.codeComparison.description}
          </p>

          <div className="space-y-6">
            {article.codeComparison.snippets.map((snip, sIdx) => (
              <div key={sIdx} className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase text-cyan-400">
                  {snip.label} • {snip.filename}
                </span>
                <CodeBlock
                  code={snip.code}
                  language={snip.language}
                  filename={snip.filename}
                  theme={theme}
                />
                <p className="text-xs text-slate-400 italic px-2">
                  💡 {snip.explanation}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Armadilhas Comuns em Produção (Pitfalls) */}
      <section className="p-6 sm:p-8 rounded-2xl border border-amber-500/20 bg-amber-950/10 space-y-3 max-w-4xl">
        <h2 className="text-base sm:text-lg font-bold text-amber-300 flex items-center gap-2">
          <AlertTriangle size={18} />
          Armadilhas e Cuidados em Produção
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
          {article.pitfalls.map((pitfall, pIdx) => (
            <li key={pIdx} className="flex items-start gap-2">
              <span className="text-amber-400 font-bold shrink-0">⚠️</span>
              <span>{pitfall}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Conclusão Técnica & Recomendações Finais */}
      <section className="space-y-4 max-w-4xl">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles size={20} className="text-cyan-400" />
          Conclusão & Decisão Pragmática
        </h2>
        <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {article.conclusion.map((c, cIdx) => (
            <p key={cIdx}>{c}</p>
          ))}
        </div>
      </section>

      {/* Link de Atalho para o Playground Interativo */}
      {article.targetPage && (
        <div className="p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/30 to-blue-950/20 max-w-4xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white">
              Quer ver o código comparativo ao vivo?
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Acesse a área de comparação interativa desta stack no CodeCompare.
            </p>
          </div>
          <button
            onClick={() => onNavigateToPage(article.targetPage!, article.targetTab)}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer flex items-center gap-2 shrink-0"
          >
            <span>Abrir Comparador Interativo</span>
            <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* Caixa do Autor (E-E-A-T) */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/80 max-w-4xl space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-white text-lg">
            EL
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">{article.author.name}</h3>
            <p className="text-xs text-cyan-400">{article.author.role}</p>
          </div>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          {article.author.bio}
        </p>
      </div>

      {/* AdUnit de Rodapé */}
      <AdUnit slot="9988776655" format="auto" label="Conteúdo Recomendado • Google AdSense" />
    </article>
  );
}
