import React, { useState } from 'react';
import {
  Cloud,
  HardDrive,
  Rocket,
  GitBranch,
  Zap,
  CheckCircle2,
  XCircle,
  Award,
  ArrowRight,
  Terminal,
  Server,
  Layers,
  ShieldCheck,
  DollarSign,
  Gauge,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sliders
} from 'lucide-react';
import {
  CLOUD_CATEGORIES,
  CLOUD_COMPARISONS,
  CLOUD_SCENARIOS,
  CloudServiceComparison,
  CloudArchitectureScenario
} from '../data/cloudData.ts';
import { CodeBlock } from './CodeBlock.tsx';
import { AdUnit } from './AdUnit.tsx';

interface CloudViewProps {
  onNavigateToPage?: (page: any) => void;
}

export const CloudView: React.FC<CloudViewProps> = ({ onNavigateToPage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeScenarioId, setActiveScenarioId] = useState<string>('enterprise-dotnet');
  const [expandedCodeSnippets, setExpandedCodeSnippets] = useState<Record<string, boolean>>({});

  const toggleCodeSnippet = (key: string) => {
    setExpandedCodeSnippets((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredComparisons = CLOUD_COMPARISONS.filter((item) => {
    if (selectedCategory === 'all' || selectedCategory === 'scenarios') return true;
    return item.category === selectedCategory;
  });

  const activeScenario = CLOUD_SCENARIOS.find((s) => s.id === activeScenarioId) || CLOUD_SCENARIOS[0];

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* HEADER PRINCIPAL */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-gradient-to-br from-amber-500/10 via-sky-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Cloud size={13} />
              AWS (Amazon Web Services)
            </span>
            <span className="text-slate-600 font-bold">vs</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Cloud size={13} />
              Microsoft Azure
            </span>
            <span className="text-[11px] font-mono text-slate-500 ml-auto">
              Atualizado para 2026 • Análise E-E-A-T
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Comparativo Cloud: <span className="text-amber-400">AWS</span> vs <span className="text-sky-400">Azure</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Um guia prático de engenharia para decisões arquiteturais. Comparamos objetivamente os serviços fundamentais de <strong>Armazenamento (Object & Block Storage)</strong>, <strong>Deploy & Containers</strong>, <strong>Pipelines de CI/CD</strong> e <strong>Computação Serverless (Functions)</strong>, incluindo métricas reais de latência, modelos de custo e exemplos de infraestrutura como código (IaC).
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
              <HardDrive size={18} className="text-cyan-400 mx-auto mb-1" />
              <div className="text-xs font-bold text-white">Armazenamento</div>
              <div className="text-[11px] text-slate-400">S3 vs Blob • EBS vs Disks</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
              <Rocket size={18} className="text-purple-400 mx-auto mb-1" />
              <div className="text-xs font-bold text-white">Deploy & Containers</div>
              <div className="text-[11px] text-slate-400">ECS vs Container Apps</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
              <GitBranch size={18} className="text-emerald-400 mx-auto mb-1" />
              <div className="text-xs font-bold text-white">CI / CD & DevOps</div>
              <div className="text-[11px] text-slate-400">CodePipeline vs GitHub/ADO</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
              <Zap size={18} className="text-amber-400 mx-auto mb-1" />
              <div className="text-xs font-bold text-white">Serverless Functions</div>
              <div className="text-[11px] text-slate-400">Lambda vs Azure Functions</div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTRO POR CATEGORIA */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CLOUD_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500/20 via-slate-800 to-sky-500/20 text-white border border-slate-600 shadow-md'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800/80 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* ANÚNCIO TOP BANNER */}
      <AdUnit slot="9876543210" format="horizontal" label="Publicidade" />

      {/* SEÇÃO 1: COMPARAÇÕES TÉCNICAS DIRETAS */}
      {selectedCategory !== 'scenarios' && (
        <section className="space-y-12">
          {filteredComparisons.map((item, index) => {
            const awsSnippetKey = `aws-${index}`;
            const azureSnippetKey = `azure-${index}`;
            const isAwsExpanded = !!expandedCodeSnippets[awsSnippetKey];
            const isAzureExpanded = !!expandedCodeSnippets[azureSnippetKey];

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 sm:p-8 space-y-6 shadow-xl"
              >
                {/* Header do Card de Comparação */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800/80 pb-5">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-slate-400 flex items-center gap-2">
                      {item.category === 'storage' && <HardDrive size={14} className="text-cyan-400" />}
                      {item.category === 'deploy' && <Rocket size={14} className="text-purple-400" />}
                      {item.category === 'cicd' && <GitBranch size={14} className="text-emerald-400" />}
                      {item.category === 'functions' && <Zap size={14} className="text-amber-400" />}
                      <span>{item.category.toUpperCase()} • DEEP DIVE</span>
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-white">
                      {item.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Veredito Resumido */}
                  <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold font-mono bg-slate-900 border-slate-700">
                    <Award size={14} className="text-amber-400" />
                    <span>Vencedor:</span>
                    {item.verdict.winner === 'aws' && <span className="text-amber-400 font-extrabold">AWS</span>}
                    {item.verdict.winner === 'azure' && <span className="text-sky-400 font-extrabold">Azure</span>}
                    {item.verdict.winner === 'tie' && <span className="text-emerald-400 font-extrabold">Empate Técnico</span>}
                  </div>
                </div>

                {/* Grid Comparativo: AWS vs Azure */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* COLUNA AWS */}
                  <div className="rounded-2xl border border-amber-500/20 bg-slate-900/70 p-5 sm:p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-3 h-3 rounded-full bg-amber-400" />
                          <h3 className="text-base sm:text-lg font-bold text-amber-300">
                            {item.aws.serviceName}
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          AWS
                        </span>
                      </div>

                      {/* Principais Recursos */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                          Recursos & Capacidades
                        </span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          {item.aws.keyFeatures.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-amber-400 shrink-0 mt-0.5">•</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pontos Fortes */}
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block font-mono flex items-center gap-1.5">
                          <CheckCircle2 size={12} />
                          Pontos Fortes (Vantagens)
                        </span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          {item.aws.strengths.map((str, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-emerald-400 shrink-0 mt-0.5">✓</span>
                              <span>{str}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pontos Fracos / Desvantagens */}
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block font-mono flex items-center gap-1.5">
                          <XCircle size={12} />
                          Desvantagens / Atenções
                        </span>
                        <ul className="space-y-1 text-xs text-slate-400">
                          {item.aws.weaknesses.map((weak, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-rose-400 shrink-0 mt-0.5">✕</span>
                              <span>{weak}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Modelo de Preço */}
                      <div className="pt-2 border-t border-slate-800 text-xs">
                        <span className="font-mono text-slate-400 block text-[11px] mb-1 font-bold">
                          Estrutura de Cobrança:
                        </span>
                        <p className="text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px]">
                          {item.aws.pricingModel}
                        </p>
                      </div>
                    </div>

                    {/* Exemplo de Código AWS */}
                    {item.aws.codeSample && (
                      <div className="pt-3 border-t border-slate-800">
                        <button
                          onClick={() => toggleCodeSnippet(awsSnippetKey)}
                          className="w-full flex items-center justify-between text-xs font-mono text-amber-400 hover:text-amber-300 p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <Terminal size={13} />
                            {item.aws.codeSampleTitle || 'Ver Exemplo de Código AWS'}
                          </span>
                          {isAwsExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                        {isAwsExpanded && (
                          <div className="mt-2 text-xs">
                            <CodeBlock
                              code={item.aws.codeSample}
                              language={item.aws.codeSampleLang || 'typescript'}
                              filename={item.aws.codeSampleTitle}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* COLUNA AZURE */}
                  <div className="rounded-2xl border border-sky-500/20 bg-slate-900/70 p-5 sm:p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-sky-500/20 pb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-3 h-3 rounded-full bg-sky-400" />
                          <h3 className="text-base sm:text-lg font-bold text-sky-300">
                            {item.azure.serviceName}
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                          Azure
                        </span>
                      </div>

                      {/* Principais Recursos */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                          Recursos & Capacidades
                        </span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          {item.azure.keyFeatures.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-sky-400 shrink-0 mt-0.5">•</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pontos Fortes */}
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block font-mono flex items-center gap-1.5">
                          <CheckCircle2 size={12} />
                          Pontos Fortes (Vantagens)
                        </span>
                        <ul className="space-y-1 text-xs text-slate-300">
                          {item.azure.strengths.map((str, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-emerald-400 shrink-0 mt-0.5">✓</span>
                              <span>{str}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pontos Fracos / Desvantagens */}
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block font-mono flex items-center gap-1.5">
                          <XCircle size={12} />
                          Desvantagens / Atenções
                        </span>
                        <ul className="space-y-1 text-xs text-slate-400">
                          {item.azure.weaknesses.map((weak, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-rose-400 shrink-0 mt-0.5">✕</span>
                              <span>{weak}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Modelo de Preço */}
                      <div className="pt-2 border-t border-slate-800 text-xs">
                        <span className="font-mono text-slate-400 block text-[11px] mb-1 font-bold">
                          Estrutura de Cobrança:
                        </span>
                        <p className="text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px]">
                          {item.azure.pricingModel}
                        </p>
                      </div>
                    </div>

                    {/* Exemplo de Código Azure */}
                    {item.azure.codeSample && (
                      <div className="pt-3 border-t border-slate-800">
                        <button
                          onClick={() => toggleCodeSnippet(azureSnippetKey)}
                          className="w-full flex items-center justify-between text-xs font-mono text-sky-400 hover:text-sky-300 p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <Terminal size={13} />
                            {item.azure.codeSampleTitle || 'Ver Exemplo de Código Azure'}
                          </span>
                          {isAzureExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                        {isAzureExpanded && (
                          <div className="mt-2 text-xs">
                            <CodeBlock
                              code={item.azure.codeSample}
                              language={item.azure.codeSampleLang || 'csharp'}
                              filename={item.azure.codeSampleTitle}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Métricas Head-to-Head */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-xs font-bold text-white uppercase font-mono tracking-wider mb-3 flex items-center gap-2">
                    <Gauge size={14} className="text-cyan-400" />
                    <span>Métricas de Performance & Produtividade</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
                      <span className="text-[11px] text-slate-400 font-mono block">Latência Típica</span>
                      <div className="text-amber-400 font-mono text-[11px]">
                        <strong>AWS:</strong> {item.metrics.latency.aws}
                      </div>
                      <div className="text-sky-400 font-mono text-[11px]">
                        <strong>Azure:</strong> {item.metrics.latency.azure}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
                      <span className="text-[11px] text-slate-400 font-mono block">Escalabilidade</span>
                      <div className="text-amber-400 font-mono text-[11px]">
                        <strong>AWS:</strong> {item.metrics.scalability.aws}
                      </div>
                      <div className="text-sky-400 font-mono text-[11px]">
                        <strong>Azure:</strong> {item.metrics.scalability.azure}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
                      <span className="text-[11px] text-slate-400 font-mono block">Developer Experience (DX)</span>
                      <div className="text-amber-400 font-mono text-[11px]">
                        <strong>AWS:</strong> {item.metrics.developerExperience.aws}
                      </div>
                      <div className="text-sky-400 font-mono text-[11px]">
                        <strong>Azure:</strong> {item.metrics.developerExperience.azure}
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
                      <span className="text-[11px] text-slate-400 font-mono block">Ecossistema & Integração</span>
                      <div className="text-amber-400 font-mono text-[11px]">
                        <strong>AWS:</strong> {item.metrics.integrationEcosystem.aws}
                      </div>
                      <div className="text-sky-400 font-mono text-[11px]">
                        <strong>Azure:</strong> {item.metrics.integrationEcosystem.azure}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Análise Aprofundada & Diretrizes de Decisão */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-white font-mono uppercase">
                    <Award size={14} className="text-amber-400" />
                    <span>Parecer Arquitetural do Especialista</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.deepDiveAnalysis}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-slate-300">
                      <strong className="text-amber-400 block mb-1">Quando escolher AWS:</strong>
                      {item.verdict.recommendedWhenAWS}
                    </div>
                    <div className="p-3 rounded-xl bg-sky-500/5 border border-sky-500/20 text-slate-300">
                      <strong className="text-sky-400 block mb-1">Quando escolher Azure:</strong>
                      {item.verdict.recommendedWhenAzure}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* ANÚNCIO INTERMEDIÁRIO */}
      <AdUnit slot="1234554321" format="auto" label="Publicidade" />

      {/* SEÇÃO 2: SIMULADOR DE ARQUITETURAS & WORKLOADS REAIS */}
      {(selectedCategory === 'all' || selectedCategory === 'scenarios') && (
        <section className="space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-cyan-400 flex items-center gap-2">
              <Sliders size={14} />
              FERRAMENTA PRÁTICA
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Simulador de Arquiteturas: AWS vs Azure por Cenário
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Selecione o perfil do seu workload de software para comparar o mapeamento de serviços, topologia de rede, esteira de CI/CD e estimativa de custos.
            </p>
          </div>

          {/* Seletor de Cenários */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {CLOUD_SCENARIOS.map((scenario) => {
              const isSelected = scenario.id === activeScenarioId;
              return (
                <button
                  key={scenario.id}
                  onClick={() => setActiveScenarioId(scenario.id)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400'
                  }`}
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 inline-block">
                      {scenario.badge}
                    </span>
                    <h3 className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {scenario.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {scenario.description}
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400">
                    <span>{isSelected ? 'Cenário Ativo' : 'Simular Stack'}</span>
                    <ArrowRight size={13} className={isSelected ? 'translate-x-1' : ''} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Card Detalhado do Cenário Ativo */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Header do Cenário */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                  {activeScenario.badge}
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  {activeScenario.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
                  {activeScenario.description}
                </p>
              </div>

              {/* Badges de Restrições */}
              <div className="flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
                  ⚡ {activeScenario.workloadCharacteristics.concurrency}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
                  💾 {activeScenario.workloadCharacteristics.database}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
                  ⚙️ {activeScenario.workloadCharacteristics.framework}
                </span>
              </div>
            </div>

            {/* Comparativo de Pilha: AWS vs Azure */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Stack AWS */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-amber-500/20 space-y-4">
                <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <h4 className="font-bold text-base text-amber-300">Pilha Recomendada na AWS</h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {activeScenario.awsStack.estimatedCostTier}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-slate-400 font-mono block text-[11px]">Computação Principal:</span>
                    <strong className="text-white">{activeScenario.awsStack.compute}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono block text-[11px]">Armazenamento & Dados:</span>
                    <span className="text-slate-300">{activeScenario.awsStack.storage}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono block text-[11px]">Automação CI / CD:</span>
                    <span className="text-slate-300">{activeScenario.awsStack.cicd}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono block text-[11px]">Computação Serverless (Functions):</span>
                    <span className="text-slate-300">{activeScenario.awsStack.functions}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono block text-[11px]">Topologia de Rede & Segurança:</span>
                    <span className="text-slate-300">{activeScenario.awsStack.networking}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <strong className="text-amber-400 block mb-1">Notas de Engenharia (AWS):</strong>
                  {activeScenario.awsStack.architectureNotes}
                </div>
              </div>

              {/* Stack Azure */}
              <div className="p-6 rounded-2xl bg-slate-900/90 border border-sky-500/20 space-y-4">
                <div className="flex items-center justify-between border-b border-sky-500/20 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-sky-400" />
                    <h4 className="font-bold text-base text-sky-300">Pilha Recomendada no Azure</h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                    {activeScenario.azureStack.estimatedCostTier}
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-slate-400 font-mono block text-[11px]">Computação Principal:</span>
                    <strong className="text-white">{activeScenario.azureStack.compute}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono block text-[11px]">Armazenamento & Dados:</span>
                    <span className="text-slate-300">{activeScenario.azureStack.storage}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono block text-[11px]">Automação CI / CD:</span>
                    <span className="text-slate-300">{activeScenario.azureStack.cicd}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono block text-[11px]">Computação Serverless (Functions):</span>
                    <span className="text-slate-300">{activeScenario.azureStack.functions}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono block text-[11px]">Topologia de Rede & Segurança:</span>
                    <span className="text-slate-300">{activeScenario.azureStack.networking}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <strong className="text-sky-400 block mb-1">Notas de Engenharia (Azure):</strong>
                  {activeScenario.azureStack.architectureNotes}
                </div>
              </div>
            </div>

            {/* Racional de Decisão */}
            <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-xs sm:text-sm text-cyan-200 leading-relaxed">
              <strong className="text-cyan-400 block font-mono uppercase text-xs mb-1">
                Conclusão de Arquitetura para este Cenário:
              </strong>
              {activeScenario.decisionRationale}
            </div>
          </div>
        </section>
      )}

      {/* QUADRO DE RESUMO EXECUTIVO (MATRIZ RÁPIDA) */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
        <h3 className="text-xl sm:text-2xl font-black text-white">
          Tabela Canônica de De-Para de Serviços (AWS ➔ Azure)
        </h3>
        <p className="text-xs sm:text-sm text-slate-400">
          Referência rápida para engenheiros migrando ou operando em estratégias multi-cloud.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                <th className="py-3 px-4">Domínio Arquitetural</th>
                <th className="py-3 px-4 text-amber-400">Serviço AWS</th>
                <th className="py-3 px-4 text-sky-400">Serviço Azure Equivalente</th>
                <th className="py-3 px-4">Diferencial Crítico</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-3 px-4 font-bold text-white">Object Storage</td>
                <td className="py-3 px-4 font-mono text-amber-300">Amazon S3</td>
                <td className="py-3 px-4 font-mono text-sky-300">Azure Blob Storage</td>
                <td className="py-3 px-4">S3 tem Intelligent-Tiering automatizado; Azure Blob possui namespace hierárquico (ADLSv2).</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Block Storage (Discos)</td>
                <td className="py-3 px-4 font-mono text-amber-300">EBS gp3 / io2</td>
                <td className="py-3 px-4 font-mono text-sky-300">Premium SSD v2 / Ultra Disk</td>
                <td className="py-3 px-4">Ambos desacoplam IOPS de capacidade; Azure suporta ZRS e Shared Disks para clusters.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">PaaS Web Hosting</td>
                <td className="py-3 px-4 font-mono text-amber-300">AWS App Runner</td>
                <td className="py-3 px-4 font-mono text-sky-300">Azure App Service</td>
                <td className="py-3 px-4">Azure App Service possui Deployment Slots com zero downtime e integração híbrida superior.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Serverless Containers</td>
                <td className="py-3 px-4 font-mono text-amber-300">AWS ECS Fargate</td>
                <td className="py-3 px-4 font-mono text-sky-300">Azure Container Apps (ACA)</td>
                <td className="py-3 px-4">Azure Container Apps escala para 0 réplicas (zero custo) com KEDA nativo; ECS Fargate tem mínima de 1 task.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Pipelines de CI / CD</td>
                <td className="py-3 px-4 font-mono text-amber-300">CodePipeline & CodeBuild</td>
                <td className="py-3 px-4 font-mono text-sky-300">GitHub Actions & Azure DevOps</td>
                <td className="py-3 px-4">GitHub Actions é o padrão da indústria com marketplace gigante e OIDC passwordless.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-white">Serverless Functions</td>
                <td className="py-3 px-4 font-mono text-amber-300">AWS Lambda</td>
                <td className="py-3 px-4 font-mono text-sky-300">Azure Functions</td>
                <td className="py-3 px-4">Lambda escala instantaneamente com microVM Firecracker; Azure Functions brilha com Durable Functions e bindings declarativos.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* CALL TO ACTION PARA MATRIZ DE DECISÃO OU PONTOS DE FUNÇÃO */}
      <section className="p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full">
            <Layers size={14} />
            <span>Aprofunde sua Arquitetura</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Planejando migração ou estimando prazos de entrega?
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Utilize nossa <strong>Matriz de Decisão Arquitetural</strong> para obter recomendações de stack e a <strong>Análise de Pontos de Função (APF)</strong> para orçar horas de desenvolvimento e esforço da equipe.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          {onNavigateToPage && (
            <>
              <button
                onClick={() => onNavigateToPage('decision-matrix')}
                className="px-5 py-3 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Matriz de Decisão</span>
                <ArrowRight size={14} />
              </button>
              <button
                onClick={() => onNavigateToPage('function-points')}
                className="px-5 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Pontos de Função (APF)</span>
                <ArrowRight size={14} />
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
};
