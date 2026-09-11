import React, { useState } from 'react';
import {
  Compass,
  Zap,
  Layers,
  Server,
  Database,
  Code2,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { PageId } from '../types.ts';
import { AdUnit } from './AdUnit.tsx';

interface DecisionMatrixProps {
  onNavigateToPage: (page: PageId, subTab?: string) => void;
}

export function DecisionMatrixView({ onNavigateToPage }: DecisionMatrixProps) {
  const [projectType, setProjectType] = useState<'mvp' | 'saas' | 'enterprise' | 'realtime'>('saas');
  const [teamExperience, setTeamExperience] = useState<'junior' | 'polyglot' | 'corporate'>('polyglot');
  const [trafficScale, setTrafficScale] = useState<'small' | 'medium' | 'massive'>('medium');
  const [budgetConstraint, setBudgetConstraint] = useState<'serverless' | 'cloud' | 'enterprise'>('cloud');

  // Cálculo da recomendação arquitetural baseado nos 4 parâmetros
  const getRecommendation = () => {
    let frontend = {
      name: 'React 19 + TanStack Query',
      subTab: 'react',
      tag: 'Frontend Flexível',
      reason: 'Maior ecossistema de componentes e maior disponibilidade de engenheiros no mercado, com cache assíncrono robusto.'
    };
    let backend = {
      name: '.NET 8 (C# Minimal APIs)',
      subTab: 'dotnet',
      tag: 'Throughput Elevado',
      reason: 'Excelente custo-benefício de CPU/RAM em produção com tipagem estrita em tempo de compilação.'
    };
    let database = {
      name: 'PostgreSQL + Redis (Cache-Aside)',
      subTab: 'relational',
      tag: 'Persistência Híbrida',
      reason: 'PostgreSQL garante integridade ACID para entidades core e Redis absorve picos de leitura repetitiva.'
    };
    let warnings = [
      'Monitore a latência do pool de conexões com o banco à medida que o número de réplicas de pods subir.'
    ];

    if (projectType === 'enterprise') {
      frontend = {
        name: 'Angular 17+ (Signals Standalone)',
        subTab: 'angular',
        tag: 'Governança Corporativa',
        reason: 'Estrutura prescritiva com convenções rígidas que reduzem o risco de arquiteturas divergentes em times grandes.'
      };
      backend = {
        name: 'Java (Spring Boot 3) ou .NET 8',
        subTab: 'java',
        tag: 'Padrão Enterprise',
        reason: 'Maturidade de tooling, ecossistema corporativo gigantesco e suporte de longo prazo (LTS).'
      };
      database = {
        name: 'PostgreSQL com Particionamento Declarativo',
        subTab: 'relational',
        tag: 'Escala Relacional',
        reason: 'Particionamento por data em tabelas de auditoria e índices B-Tree bem dimensionados.'
      };
      warnings = [
        'Evite acoplamento excessivo com bibliotecas proprietárias de fornecedores de nuvem.'
      ];
    } else if (projectType === 'realtime') {
      frontend = {
        name: 'Vue.js 3.4 (Composition API)',
        subTab: 'vue',
        tag: 'Reatividade Leve',
        reason: 'Reatividade cirúrgica sem Virtual DOM pesado, perfeita para telemetria de alta frequência.'
      };
      backend = {
        name: 'Go (Fiber + Goroutines)',
        subTab: 'go',
        tag: 'Baixíssima Latência',
        reason: 'Consumo irrisório de RAM por conexão (~2 KB por Goroutine) suportando dezenas de milhares de clientes simultâneos.'
      };
      database = {
        name: 'Redis Streams / Cassandra + PostgreSQL',
        subTab: 'nosql',
        tag: 'Write-Heavy NoSQL',
        reason: 'Cassandra ou Redis para ingestão massiva de telemetria sem engasgar o banco relacional.'
      };
      warnings = [
        'Atenção ao risco de Goroutine leaks caso o contexto de cancelamento não seja propagado.'
      ];
    } else if (projectType === 'mvp') {
      frontend = {
        name: 'Vue.js 3 ou React',
        subTab: 'vue',
        tag: 'Time-to-Market',
        reason: 'Velocidade máxima de implementação e baixa barreira de entrada.'
      };
      backend = {
        name: 'Python (FastAPI)',
        subTab: 'python',
        tag: 'Prototipagem Ágil',
        reason: 'Documentação OpenAPI Swagger automática e tipagem rápida com Pydantic.'
      };
      database = {
        name: 'PostgreSQL Monolítico',
        subTab: 'relational',
        tag: 'Simplicidade Operacional',
        reason: 'Não introduza Redis ou NoSQL antes de comprovar a tração do produto.'
      };
      warnings = [
        'Mantenha as regras de negócio desacopladas do framework para facilitar futuras migrações de backend.'
      ];
    }

    // Ajuste fino por escala
    if (trafficScale === 'massive' && projectType !== 'realtime') {
      backend = {
        name: 'Go (Fiber) ou .NET 8',
        subTab: 'go',
        tag: 'Concorrência Massiva',
        reason: 'Linguagens compiladas que eliminam o overhead de interpretadores dinâmicos sob milhões de requisições.'
      };
    }

    return { frontend, backend, database, warnings };
  };

  const rec = getRecommendation();

  return (
    <div className="space-y-10 animate-in fade-in duration-300 max-w-4xl pb-16">
      {/* Header */}
      <header className="border-b border-slate-800/80 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          <Compass size={14} />
          <span>Ferramenta Interativa de Engenharia</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
          Matriz de Decisão Arquitetural
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          Simule os requisitos específicos do seu próximo projeto e receba uma recomendação técnica pragmática fundamentada em trade-offs reais de produção.
        </p>
      </header>

      {/* Seletor Interativo de Parâmetros */}
      <section className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/60 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Sparkles size={18} className="text-cyan-400" />
          Defina as Restrições do seu Projeto
        </h2>

        {/* 1. Tipo de Produto */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold uppercase text-slate-400 block">
            1. Natureza do Produto de Software
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'mvp', label: 'MVP / Startup', desc: 'Foco em velocidade' },
              { id: 'saas', label: 'SaaS / E-commerce', desc: 'Alto tráfego & SEO' },
              { id: 'enterprise', label: 'Dashboard Corporativo', desc: 'Governança & dados' },
              { id: 'realtime', label: 'Tempo Real / IoT', desc: 'Latência crítica' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setProjectType(item.id as any)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  projectType === item.id
                    ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span className="text-xs block">{item.label}</span>
                <span className="text-[10px] text-slate-500 block font-normal">{item.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Perfil da Equipe */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold uppercase text-slate-400 block">
            2. Perfil de Especialidade da Equipe Técnica
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              { id: 'junior', label: 'Equipe Generalista (JS/TS)', desc: 'Menor curva de aprendizado' },
              { id: 'polyglot', label: 'Time Sênior Poliglota', desc: 'Domina múltiplas linguagens' },
              { id: 'corporate', label: 'Background Enterprise', desc: 'C#, Java, ecossistema Microsoft/Oracle' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setTeamExperience(item.id as any)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  teamExperience === item.id
                    ? 'bg-purple-500/15 border-purple-500 text-purple-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span className="text-xs block">{item.label}</span>
                <span className="text-[10px] text-slate-500 block font-normal">{item.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Escala & Concorrência */}
        <div className="space-y-2">
          <label className="text-xs font-mono font-bold uppercase text-slate-400 block">
            3. Volume de Requisições Estimado
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              { id: 'small', label: 'Até 50k req/dia', desc: 'Tráfego inicial de lançamento' },
              { id: 'medium', label: '100k a 5M req/dia', desc: 'Tráfego comercial consolidado' },
              { id: 'massive', label: 'Escala Hipercrítica (> 20M)', desc: 'Microsegundos de latência' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setTrafficScale(item.id as any)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  trafficScale === item.id
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 font-bold'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span className="text-xs block">{item.label}</span>
                <span className="text-[10px] text-slate-500 block font-normal">{item.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cartão de Recomendação Arquitetural Gerada */}
      <section className="p-6 sm:p-8 rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono uppercase font-bold text-cyan-400">
              Diagnóstico Automatizado
            </span>
            <h3 className="text-2xl font-black text-white">
              Arquitetura Recomendada para o seu Cenário
            </h3>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono w-fit">
            ✓ Parecer de Engenharia
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Frontend Card */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/80 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold flex items-center gap-1">
                  <Code2 size={12} /> Frontend
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300">
                  {rec.frontend.tag}
                </span>
              </div>
              <h4 className="font-bold text-base text-white">{rec.frontend.name}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{rec.frontend.reason}</p>
            </div>
            <button
              onClick={() => onNavigateToPage('frontend', rec.frontend.subTab)}
              className="pt-2 text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Ver comparativo no blog</span>
              <ArrowRight size={12} />
            </button>
          </div>

          {/* Backend Card */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/80 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-purple-400 font-bold flex items-center gap-1">
                  <Server size={12} /> Backend API
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300">
                  {rec.backend.tag}
                </span>
              </div>
              <h4 className="font-bold text-base text-white">{rec.backend.name}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{rec.backend.reason}</p>
            </div>
            <button
              onClick={() => onNavigateToPage('backend', rec.backend.subTab)}
              className="pt-2 text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Ver código do CRUD</span>
              <ArrowRight size={12} />
            </button>
          </div>

          {/* Database Card */}
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/80 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1">
                  <Database size={12} /> Banco de Dados
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                  {rec.database.tag}
                </span>
              </div>
              <h4 className="font-bold text-base text-white">{rec.database.name}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{rec.database.reason}</p>
            </div>
            <button
              onClick={() => onNavigateToPage('database', rec.database.subTab)}
              className="pt-2 text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Ver estratégias de dados</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </div>

        {/* Ponto de Atenção */}
        <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-950/10 text-xs text-amber-200 flex items-start gap-2.5">
          <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong>Ponto de Atenção em Produção:</strong> {rec.warnings[0]}
          </div>
        </div>
      </section>

      <AdUnit slot="9988771122" format="auto" label="Espaço Patrocinado • CodeCompare" />
    </div>
  );
}
