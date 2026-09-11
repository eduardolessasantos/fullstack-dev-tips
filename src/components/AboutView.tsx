import React from 'react';
import {
  User,
  ShieldCheck,
  Cpu,
  BookOpen,
  Award,
  Terminal,
  CheckCircle2,
  Mail,
  Github,
  Linkedin,
  Sparkles
} from 'lucide-react';
import { AdUnit } from './AdUnit.tsx';

interface AboutViewProps {
  onNavigateToContact: () => void;
}

export function AboutView({ onNavigateToContact }: AboutViewProps) {
  return (
    <div className="space-y-12 animate-in fade-in duration-300 max-w-4xl pb-16">
      {/* Header */}
      <header className="border-b border-slate-800/80 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          <ShieldCheck size={14} />
          <span>E-E-A-T • Transparência e Rigor Editorial</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Sobre o CodeCompare & Eduardo Lessa
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Uma plataforma de engenharia de software desenhada para transformar a aprendizagem técnica em um exercício de contraste, raciocínio crítico e medição pragmática.
        </p>
      </header>

      {/* Perfil do Autor & Credenciais */}
      <section className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-600 to-violet-600 flex items-center justify-center font-black text-white text-3xl shadow-xl shadow-cyan-500/20 shrink-0">
            EL
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-2xl font-bold text-white">Eduardo Lessa</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Engenheiro Fundador & Autor
              </span>
            </div>
            <p className="text-sm text-cyan-400 font-medium">
              Engenheiro de Software Full-Stack & Especialista em Arquitetura Distribuída
            </p>
            <p className="text-xs text-slate-400">
              eduardolessa2011@gmail.com • Belo Horizonte / São Paulo, Brasil
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
          <p>
            Com mais de uma década de vivência no desenvolvimento de sistemas de alta criticidade, atuei na concepção de microsserviços resilientes, arquiteturas orientadas a eventos (EDA), pipelines de dados com alta taxa de transferência e interfaces web modernas para os setores de finanças, e-commerce e logística.
          </p>
          <p>
            Ao longo de anos liderando times técnicos e treinando dezenas de desenvolvedores, notei um vício comum no ecossistema de tecnologia: o aprendizado por repetição mecânica ou decoreba de tutoriais superficiais de "To-Do List". Desenvolvedores aprendem a copiar código sem entender o porquê das decisões arquiteturais tomadas por baixo do capô.
          </p>
          <p>
            O <strong>CodeCompare</strong> nasceu como uma resposta deliberada a essa lacuna: criar um repositório técnico vivo onde a mesma solução de engenharia é dissecada lado a lado nas principais linguagens, frameworks e bancos de dados contemporâneos.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={onNavigateToContact}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer flex items-center gap-2"
          >
            <Mail size={14} />
            <span>Falar com o Autor</span>
          </button>
        </div>
      </section>

      {/* Metodologia de Testes e Rigor Técnico */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Cpu size={20} className="text-cyan-400" />
          Nossa Metodologia de Benchmarks & Verificação
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Nenhum dado publicado no CodeCompare é produto de especulação ou opiniões vazias de redes sociais. Nossas comparações obedecem a critérios estritos de engenharia:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
            <span className="text-cyan-400 font-bold text-xs uppercase font-mono">
              01. Ambiente Isolado
            </span>
            <h3 className="text-sm font-bold text-white">Containers Dedicados</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Todos os testes de carga e consumo de memória são executados em instâncias Linux isoladas no Docker, limitando vCPU e RAM para simular produção real.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
            <span className="text-purple-400 font-bold text-xs uppercase font-mono">
              02. Métricas Reais
            </span>
            <h3 className="text-sm font-bold text-white">Percentis p95 e p99</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Não medimos apenas médias simples de latência. Avaliamos a cauda estatística de chamadas com ferramentas padrão de mercado como k6 e Apache Bench.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
            <span className="text-emerald-400 font-bold text-xs uppercase font-mono">
              03. Código Canônico
            </span>
            <h3 className="text-sm font-bold text-white">Idiomático em Cada Stack</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Não forçamos paradigmas de C# dentro do Go ou de React dentro do Angular. Cada snippet segue rigorosamente as recomendações oficiais da comunidade de cada linguagem.
            </p>
          </div>
        </div>
      </section>

      {/* Compromisso de Autoria e Qualidade AdSense */}
      <section className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-3">
        <h2 className="text-base font-bold text-emerald-400 flex items-center gap-2">
          <Award size={18} />
          Compromisso com Conteúdo Autoral e Original
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          O CodeCompare repudia ativamente a geração indiscriminada de artigos vazios por ferramentas automáticas de scraping. Todo o material, arquitetura de tabelas, análises de trade-offs e diagramas conceituais são redigidos, revisados e mantidos manualmente para fornecer valor concreto e prático à carreira de engenheiros de software.
        </p>
      </section>

      <AdUnit slot="3344556677" format="auto" label="Espaço Patrocinado • CodeCompare" />
    </div>
  );
}
