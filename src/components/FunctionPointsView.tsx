import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Layers,
  Cpu,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BarChart3,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  Code,
  Database,
  Users,
  Calendar,
  Sparkles,
  Info,
  ChevronRight,
  ArrowRight,
  Download,
  FileSpreadsheet,
  Check
} from 'lucide-react';
import {
  FP_ELEMENT_WEIGHTS,
  TECH_FP_METRICS,
  FINTECH_CASE_STUDY,
  GENERAL_SYSTEM_CHARACTERISTICS,
  TechProductivityMetric
} from '../data/functionPointsData.ts';
import { AdUnit } from './AdUnit.tsx';

export const FunctionPointsView: React.FC = () => {
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'backend' | 'frontend' | 'database'>('all');
  const [showGSCList, setShowGSCList] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Estados da Calculadora Interativa
  const [counts, setCounts] = useState({
    aliLow: 2,
    aliMed: 2,
    aliHigh: 1,
    aieLow: 1,
    aieMed: 1,
    aieHigh: 0,
    eeLow: 4,
    eeMed: 3,
    eeHigh: 1,
    seLow: 2,
    seMed: 2,
    seHigh: 1,
    ceLow: 5,
    ceMed: 2,
    ceHigh: 0
  });

  const [selectedBackend, setSelectedBackend] = useState<string>('dotnet');
  const [selectedFrontend, setSelectedFrontend] = useState<string>('react');
  const [selectedDb, setSelectedDb] = useState<string>('postgresql');
  const [complexityLevel, setComplexityLevel] = useState<'low' | 'standard' | 'high' | 'critical'>('high');
  const [teamSize, setTeamSize] = useState<number>(4);
  const [sprintWeeks, setSprintWeeks] = useState<number>(2);

  // Fator de Ajuste de Complexidade (VAF)
  const vafFactor = useMemo(() => {
    switch (complexityLevel) {
      case 'low':
        return 0.85;
      case 'standard':
        return 1.0;
      case 'high':
        return 1.15;
      case 'critical':
        return 1.3;
      default:
        return 1.0;
    }
  }, [complexityLevel]);

  // Cálculo de Pontos de Função Não Ajustados (PFNA)
  const calculationSummary = useMemo(() => {
    const ali = counts.aliLow * 7 + counts.aliMed * 10 + counts.aliHigh * 15;
    const aie = counts.aieLow * 5 + counts.aieMed * 7 + counts.aieHigh * 10;
    const ee = counts.eeLow * 3 + counts.eeMed * 4 + counts.eeHigh * 6;
    const se = counts.seLow * 4 + counts.seMed * 5 + counts.seHigh * 7;
    const ce = counts.ceLow * 3 + counts.ceMed * 4 + counts.ceHigh * 6;

    const dataFunctions = ali + aie;
    const transactionFunctions = ee + se + ce;
    const pfna = dataFunctions + transactionFunctions;
    const pfa = Math.round(pfna * vafFactor * 10) / 10;

    // Métricas por stack
    const beMetric = TECH_FP_METRICS.find(m => m.tech === selectedBackend) || TECH_FP_METRICS[1];
    const feMetric = TECH_FP_METRICS.find(m => m.tech === selectedFrontend) || TECH_FP_METRICS[4];
    const dbMetric = TECH_FP_METRICS.find(m => m.tech === selectedDb) || TECH_FP_METRICS[6];

    // Média ponderada de esforço full-stack: 50% backend, 35% frontend, 15% database
    const blendedHoursPerFP =
      beMetric.hoursPerFP.avg * 0.5 +
      feMetric.hoursPerFP.avg * 0.35 +
      dbMetric.hoursPerFP.avg * 0.15;

    const totalHours = Math.round(pfa * blendedHoursPerFP);

    // Linhas de código estimadas (KSLOC)
    const blendedSlocPerFP =
      beMetric.slocPerFP * 0.5 + feMetric.slocPerFP * 0.35 + dbMetric.slocPerFP * 0.15;
    const estimatedKsloc = Math.round((pfa * blendedSlocPerFP) / 100) / 10;

    // Projeção temporal (Horas úteis por dev por sprint de 2 semanas = ~65h considerando cerimônias ágeis)
    const productiveHoursPerDevPerWeek = 32.5;
    const sprintCapacityHours = teamSize * productiveHoursPerDevPerWeek * sprintWeeks;
    const estimatedSprints = sprintCapacityHours > 0 ? Math.ceil((totalHours / sprintCapacityHours) * 10) / 10 : 0;
    const estimatedWeeks = Math.round(estimatedSprints * sprintWeeks);

    // Defeitos esperados em produção
    const blendedDefectRate =
      (beMetric.defectDensityPer1000FP * 0.5 +
        feMetric.defectDensityPer1000FP * 0.35 +
        dbMetric.defectDensityPer1000FP * 0.15);
    const expectedDefects = Math.round((pfa / 1000) * blendedDefectRate * 10) / 10;

    // Manutenção anual (horas/ano)
    const annualMaintenanceHours = Math.round(
      pfa *
        (beMetric.maintenanceHoursPerYear * 0.5 +
          feMetric.maintenanceHoursPerYear * 0.35 +
          dbMetric.maintenanceHoursPerYear * 0.15)
    );

    return {
      ali,
      aie,
      ee,
      se,
      ce,
      dataFunctions,
      transactionFunctions,
      pfna,
      pfa,
      blendedHoursPerFP: Math.round(blendedHoursPerFP * 10) / 10,
      totalHours,
      estimatedKsloc,
      estimatedSprints,
      estimatedWeeks,
      expectedDefects,
      annualMaintenanceHours,
      beMetric,
      feMetric,
      dbMetric
    };
  }, [counts, vafFactor, selectedBackend, selectedFrontend, selectedDb, teamSize, sprintWeeks]);

  const filteredMetrics = useMemo(() => {
    if (activeCategoryFilter === 'all') return TECH_FP_METRICS;
    return TECH_FP_METRICS.filter(m => m.category === activeCategoryFilter);
  }, [activeCategoryFilter]);

  const updateCount = (key: keyof typeof counts, delta: number) => {
    setCounts(prev => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta)
    }));
  };

  const handleDownloadSpreadsheet = () => {
    // UTF-8 BOM para garantir correta acentuação no Excel em português
    const BOM = '\uFEFF';
    const sep = ';';

    const sanitize = (val: string | number) => {
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows: string[][] = [
      ['RELATÓRIO DE DIMENSIONAMENTO E ESTIMATIVA DE PONTOS DE FUNÇÃO (APF)'],
      ['Portal', 'CodeCompare - Dev Tech Blog'],
      ['Metodologia Normativa', 'IFPUG CPM 4.3.1 (ISO/IEC 20926:2009) & NESMA'],
      ['Data de Geração', new Date().toLocaleString('pt-BR')],
      [''],
      ['--- 1. RESUMO EXECUTIVO ---'],
      ['Métrica', 'Valor', 'Unidade', 'Observação'],
      ['Pontos de Função Não Ajustados (PFNA)', String(calculationSummary.pfna), 'PF', 'Soma de funções de dados e transações'],
      ['Classificação de Complexidade', complexityLevel.toUpperCase(), '-', 'Baseada nos 14 fatores GSC'],
      ['Fator de Ajuste (VAF)', vafFactor.toFixed(2), 'Fator', 'Multiplicador de requisitos não funcionais'],
      ['Pontos de Função Ajustados (PFA)', String(calculationSummary.pfa), 'PFA', 'Tamanho funcional normatizado final'],
      ['Produtividade Média Blended', String(calculationSummary.blendedHoursPerFP), 'h/PF', 'Média ponderada da stack selecionada'],
      ['Esforço Total Estimado', String(calculationSummary.totalHours), 'horas', 'Horas líquidas de desenvolvimento'],
      ['Tamanho da Equipe', String(teamSize), 'desenvolvedores', 'Equipe dedicada de engenharia'],
      ['Duração da Sprint', String(sprintWeeks), 'semanas', 'Ciclo de iteração do Scrum'],
      ['Prazo Estimado de Entrega', String(calculationSummary.estimatedSprints), 'sprints', `Aproximadamente ${calculationSummary.estimatedWeeks} semanas`],
      ['Código Fonte Equivalente (KSLOC)', String(calculationSummary.estimatedKsloc), 'KSLOC', `~${Math.round(calculationSummary.estimatedKsloc * 1000)} linhas de código`],
      ['Densidade de Defeitos Projetada', String(calculationSummary.expectedDefects), 'bugs', 'Estimativa de incidentes em produção no 1º ano'],
      ['Sustentação Anual Projetada', String(calculationSummary.annualMaintenanceHours), 'h/ano', 'Manutenção corretiva e preventiva anual'],
      [''],
      ['--- 2. CONTAGEM DETALHADA POR TIPO DE FUNÇÃO (IFPUG) ---'],
      ['Sigla', 'Componente Funcional', 'Baixa (qtd)', 'Média (qtd)', 'Alta (qtd)', 'Total Ocorrências', 'Subtotal PF'],
      ['ALI', 'Arquivos Lógicos Internos (Tabelas / Entidades Próprias)', String(counts.aliLow), String(counts.aliMed), String(counts.aliHigh), String(counts.aliLow + counts.aliMed + counts.aliHigh), String(calculationSummary.ali)],
      ['AIE', 'Arquivos de Interface Externa (APIs Consumidas / Bancos Externos)', String(counts.aieLow), String(counts.aieMed), String(counts.aieHigh), String(counts.aieLow + counts.aieMed + counts.aieHigh), String(calculationSummary.aie)],
      ['EE', 'Entradas Externas (POST, PUT, DELETE, Gravações)', String(counts.eeLow), String(counts.eeMed), String(counts.eeHigh), String(counts.eeLow + counts.eeMed + counts.eeHigh), String(calculationSummary.ee)],
      ['SE', 'Saídas Externas (Relatórios, Cálculos, Webhooks)', String(counts.seLow), String(counts.seMed), String(counts.seHigh), String(counts.seLow + counts.seMed + counts.seHigh), String(calculationSummary.se)],
      ['CE', 'Consultas Externas (GETs simples, buscas paginadas)', String(counts.ceLow), String(counts.ceMed), String(counts.ceHigh), String(counts.ceLow + counts.ceMed + counts.ceHigh), String(calculationSummary.ce)],
      ['Subtotal Funções de Dados (ALI + AIE)', '-', '-', '-', '-', String(counts.aliLow + counts.aliMed + counts.aliHigh + counts.aieLow + counts.aieMed + counts.aieHigh), String(calculationSummary.dataFunctions)],
      ['Subtotal Funções de Transação (EE + SE + CE)', '-', '-', '-', '-', String(counts.eeLow + counts.eeMed + counts.eeHigh + counts.seLow + counts.seMed + counts.seHigh + counts.ceLow + counts.ceMed + counts.ceHigh), String(calculationSummary.transactionFunctions)],
      ['Total Geral PFNA', '-', '-', '-', '-', '-', String(calculationSummary.pfna)],
      [''],
      ['--- 3. COMPOSIÇÃO DA STACK TECNOLÓGICA E ESFORÇO PONDERADO ---'],
      ['Camada', 'Tecnologia Selecionada', 'Taxa Produtividade (h/PF)', 'SLOC / PF', 'Distribuição de Esforço (%)', 'Horas Estimadas (h)'],
      ['Backend', calculationSummary.beMetric.name, String(calculationSummary.beMetric.hoursPerFP.avg), String(calculationSummary.beMetric.slocPerFP), '50%', String(Math.round(calculationSummary.totalHours * 0.5))],
      ['Frontend', calculationSummary.feMetric.name, String(calculationSummary.feMetric.hoursPerFP.avg), String(calculationSummary.feMetric.slocPerFP), '35%', String(Math.round(calculationSummary.totalHours * 0.35))],
      ['Banco de Dados', calculationSummary.dbMetric.name, String(calculationSummary.dbMetric.hoursPerFP.avg), String(calculationSummary.dbMetric.slocPerFP), '15%', String(Math.round(calculationSummary.totalHours * 0.15))],
      ['Total Integrado', 'Stack Full-Stack Selecionada', String(calculationSummary.blendedHoursPerFP), '-', '100%', String(calculationSummary.totalHours)]
    ];

    const csvContent = BOM + rows.map(r => r.map(sanitize).join(sep)).join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const now = new Date();
    const dateFormatted = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    link.setAttribute('href', url);
    link.setAttribute('download', `estimativa_pontos_de_funcao_${dateFormatted}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Header Institucional da Seção */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-950 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/60">
            <Calculator size={14} />
            Métricas de Engenharia de Software • APF / IFPUG
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Análise de Pontos de Função (APF) & Dimensionamento de Software
          </h1>

          <p className="text-base md:text-lg text-slate-300 leading-relaxed">
            Medição do tamanho funcional de software de acordo com os padrões internacionais{' '}
            <strong className="text-white">IFPUG (ISO/IEC 20926)</strong> e{' '}
            <strong className="text-white">NESMA</strong>. Descubra como cada elemento transacional e de dados
            se correlaciona com as tecnologias analisadas neste portal (
            <span className="text-cyan-400 font-medium">FastAPI</span>,{' '}
            <span className="text-purple-400 font-medium">.NET 8</span>,{' '}
            <span className="text-emerald-400 font-medium">Spring Boot 3</span>,{' '}
            <span className="text-blue-400 font-medium">React</span>,{' '}
            <span className="text-emerald-300 font-medium">Vue</span>,{' '}
            <span className="text-rose-400 font-medium">Angular</span> e Bancos de Dados) em termos de{' '}
            <span className="text-white font-semibold">Horas por Ponto de Função (h/PF)</span>, linhas de código equivalentes e custos de sustentação.
          </p>

          <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono text-slate-400">
            <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60">
              Norma: ISO/IEC 20926:2009
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60">
              Taxa de Entrega: ISBSG Benchmarks
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60">
              Independência Tecnológica Funcional
            </span>
          </div>
        </div>
      </section>

      {/* AdSense Unit Topo */}
      <AdUnit slot="7890123456" label="Publicidade" />

      {/* Seção 1: O que é APF e a Matriz Canônica IFPUG */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-bold">
              <Layers size={14} />
              Fundamentos Normativos
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              Matriz Canônica de Complexidade e Pesos (IFPUG CPM 4.3.1)
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              A Análise de Pontos de Função classifica os requisitos do usuário em 5 componentes fundamentais,
              divididos em Funções de Dados (o que o sistema armazena) e Funções de Transação (o que o sistema processa).
            </p>
          </div>
        </div>

        {/* Tabela de Pesos Canônicos */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <th className="py-3.5 px-4">Sigla</th>
                <th className="py-3.5 px-4">Elemento Funcional</th>
                <th className="py-3.5 px-3 text-center bg-emerald-950/30 text-emerald-300">Baixa</th>
                <th className="py-3.5 px-3 text-center bg-amber-950/30 text-amber-300">Média</th>
                <th className="py-3.5 px-3 text-center bg-rose-950/30 text-rose-300">Alta</th>
                <th className="py-3.5 px-4">Mapeamento em Arquitetura Moderna</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {FP_ELEMENT_WEIGHTS.map(elem => (
                <tr key={elem.type} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-cyan-400 whitespace-nowrap">
                    {elem.type}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-white">{elem.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{elem.description}</div>
                  </td>
                  <td className="py-4 px-3 text-center font-mono font-semibold text-emerald-400 bg-emerald-950/10">
                    {elem.low} PF
                  </td>
                  <td className="py-4 px-3 text-center font-mono font-semibold text-amber-400 bg-amber-950/10">
                    {elem.medium} PF
                  </td>
                  <td className="py-4 px-3 text-center font-mono font-semibold text-rose-400 bg-rose-950/10">
                    {elem.high} PF
                  </td>
                  <td className="py-4 px-4 text-xs text-slate-300 leading-relaxed max-w-md">
                    {elem.mapping}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Seção 2: Tabela de Produtividade e Métricas por Tecnologia */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-indigo-400 font-bold">
              <BarChart3 size={14} />
              Produtividade e Benchmark
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              Taxa de Entrega por Tecnologia (Horas / PF & SLOC Equivalente)
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              Embora o Ponto de Função seja neutro em relação à linguagem, o esforço real de engenharia para implementar 1 PF varia expressivamente conforme o ecossistema, nível de abstração, tipagem estática e maturidade de bibliotecas.
            </p>
          </div>

          {/* Filtros de Categoria */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-900 border border-slate-800 text-xs self-start md:self-auto">
            <button
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeCategoryFilter === 'all'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Todas ({TECH_FP_METRICS.length})
            </button>
            <button
              onClick={() => setActiveCategoryFilter('backend')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeCategoryFilter === 'backend'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Backend
            </button>
            <button
              onClick={() => setActiveCategoryFilter('frontend')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeCategoryFilter === 'frontend'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Frontend
            </button>
            <button
              onClick={() => setActiveCategoryFilter('database')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeCategoryFilter === 'database'
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Bancos de Dados
            </button>
          </div>
        </div>

        {/* Tabela de Produtividade */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <th className="py-3.5 px-4">Tecnologia & Versão</th>
                <th className="py-3.5 px-4 text-center">Taxa Média (h / PF)</th>
                <th className="py-3.5 px-3 text-center">Faixa Típica</th>
                <th className="py-3.5 px-4 text-center">SLOC / PF</th>
                <th className="py-3.5 px-4 text-center">Sustentação (h/PF/ano)</th>
                <th className="py-3.5 px-4 text-center">Bugs / 1.000 PF</th>
                <th className="py-3.5 px-4">Alavancas de Produtividade & Recomendações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {filteredMetrics.map(item => (
                <tr key={item.tech} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 font-semibold text-white whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {item.category === 'backend' && <Cpu size={16} className="text-purple-400" />}
                      {item.category === 'frontend' && <Code size={16} className="text-cyan-400" />}
                      {item.category === 'database' && <Database size={16} className="text-emerald-400" />}
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono mt-1 inline-block">
                      {item.category}
                    </span>
                  </td>

                  {/* Horas Médias por PF */}
                  <td className="py-4 px-4 text-center">
                    <span className="font-mono text-base font-bold text-cyan-400">
                      {item.hoursPerFP.avg} h
                    </span>
                  </td>

                  {/* Faixa Min - Max */}
                  <td className="py-4 px-3 text-center font-mono text-xs text-slate-400 whitespace-nowrap">
                    {item.hoursPerFP.min}h – {item.hoursPerFP.max}h
                  </td>

                  {/* SLOC por PF */}
                  <td className="py-4 px-4 text-center font-mono text-xs text-slate-300 font-medium">
                    {item.slocPerFP} linhas
                  </td>

                  {/* Custo Anual de Manutenção */}
                  <td className="py-4 px-4 text-center font-mono text-xs text-slate-400">
                    {item.maintenanceHoursPerYear} h/ano
                  </td>

                  {/* Densidade de Defeitos */}
                  <td className="py-4 px-4 text-center">
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                        item.defectDensityPer1000FP <= 8
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                          : item.defectDensityPer1000FP <= 11
                          ? 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                          : 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                      }`}
                    >
                      {item.defectDensityPer1000FP}
                    </span>
                  </td>

                  {/* Fatores e Use Case */}
                  <td className="py-4 px-4 text-xs text-slate-300 space-y-1 max-w-md">
                    <div className="text-slate-400">{item.recommendedUseCase}</div>
                    <ul className="list-disc list-inside text-[11px] text-slate-500 space-y-0.5">
                      {item.productivityFactors.slice(0, 2).map((factor, idx) => (
                        <li key={idx} className="truncate">{factor}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Seção 3: Calculadora & Simulador Interativo */}
      <section className="rounded-2xl border border-cyan-800/40 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 p-6 md:p-8 shadow-2xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-bold">
              <Calculator size={16} />
              Simulador Interativo
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Calculadora de Pontos de Função & Dimensionamento de Sprint
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl">
              Informe a quantidade de funções do seu projeto, selecione a stack pretendida e dimensione o esforço em horas, sprints e tamanho de equipe.
            </p>
          </div>

          <button
            onClick={() =>
              setCounts({
                aliLow: 2,
                aliMed: 2,
                aliHigh: 1,
                aieLow: 1,
                aieMed: 1,
                aieHigh: 0,
                eeLow: 4,
                eeMed: 3,
                eeHigh: 1,
                seLow: 2,
                seMed: 2,
                seHigh: 1,
                ceLow: 5,
                ceMed: 2,
                ceHigh: 0
              })
            }
            className="px-3 py-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 rounded-lg border border-cyan-800/50 hover:border-cyan-700 bg-cyan-950/40 transition-colors self-start md:self-auto cursor-pointer"
          >
            Carregar Exemplo Padrão
          </button>

          <button
            onClick={handleDownloadSpreadsheet}
            className="px-3.5 py-1.5 text-xs font-semibold text-white rounded-lg border border-emerald-500/50 hover:border-emerald-400 bg-emerald-950/70 hover:bg-emerald-900/80 transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer shadow-sm"
            title="Exportar planilha formatada para Excel / Google Planilhas"
          >
            <FileSpreadsheet size={14} className="text-emerald-400" />
            <span>Baixar Planilha (.csv / Excel)</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Lado Esquerdo: Controles de Entrada das Funções */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Layers size={16} className="text-cyan-400" />
              1. Contagem de Funções de Dados e Transações
            </h3>

            <div className="space-y-4">
              {/* ALIs */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-white flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-cyan-950 text-cyan-400 border border-cyan-800/50">ALI</span>
                    Arquivos Lógicos Internos (Tabelas / Coleções)
                  </span>
                  <span className="text-xs font-mono text-cyan-400 font-semibold">
                    {calculationSummary.ali} PF
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-xs text-slate-400">Baixa (7 PF)</span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => updateCount('aliLow', -1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">-</button>
                      <span className="w-5 text-center font-mono text-xs font-bold text-white">{counts.aliLow}</span>
                      <button onClick={() => updateCount('aliLow', 1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">+</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-xs text-slate-400">Média (10 PF)</span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => updateCount('aliMed', -1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">-</button>
                      <span className="w-5 text-center font-mono text-xs font-bold text-white">{counts.aliMed}</span>
                      <button onClick={() => updateCount('aliMed', 1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">+</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-xs text-slate-400">Alta (15 PF)</span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => updateCount('aliHigh', -1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">-</button>
                      <span className="w-5 text-center font-mono text-xs font-bold text-white">{counts.aliHigh}</span>
                      <button onClick={() => updateCount('aliHigh', 1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">+</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* AIEs */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-white flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-indigo-950 text-indigo-400 border border-indigo-800/50">AIE</span>
                    Arquivos de Interface Externa (APIs Externas)
                  </span>
                  <span className="text-xs font-mono text-indigo-400 font-semibold">
                    {calculationSummary.aie} PF
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-xs text-slate-400">Baixa (5 PF)</span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => updateCount('aieLow', -1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">-</button>
                      <span className="w-5 text-center font-mono text-xs font-bold text-white">{counts.aieLow}</span>
                      <button onClick={() => updateCount('aieLow', 1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">+</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-xs text-slate-400">Média (7 PF)</span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => updateCount('aieMed', -1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">-</button>
                      <span className="w-5 text-center font-mono text-xs font-bold text-white">{counts.aieMed}</span>
                      <button onClick={() => updateCount('aieMed', 1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">+</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-xs text-slate-400">Alta (10 PF)</span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => updateCount('aieHigh', -1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">-</button>
                      <span className="w-5 text-center font-mono text-xs font-bold text-white">{counts.aieHigh}</span>
                      <button onClick={() => updateCount('aieHigh', 1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">+</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* EEs */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-white flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-950 text-amber-400 border border-amber-800/50">EE</span>
                    Entradas Externas (POST, PUT, DELETE, Gravações)
                  </span>
                  <span className="text-xs font-mono text-amber-400 font-semibold">
                    {calculationSummary.ee} PF
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-xs text-slate-400">Baixa (3 PF)</span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => updateCount('eeLow', -1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">-</button>
                      <span className="w-5 text-center font-mono text-xs font-bold text-white">{counts.eeLow}</span>
                      <button onClick={() => updateCount('eeLow', 1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">+</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-xs text-slate-400">Média (4 PF)</span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => updateCount('eeMed', -1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">-</button>
                      <span className="w-5 text-center font-mono text-xs font-bold text-white">{counts.eeMed}</span>
                      <button onClick={() => updateCount('eeMed', 1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">+</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-xs text-slate-400">Alta (6 PF)</span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => updateCount('eeHigh', -1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">-</button>
                      <span className="w-5 text-center font-mono text-xs font-bold text-white">{counts.eeHigh}</span>
                      <button onClick={() => updateCount('eeHigh', 1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">+</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEs */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-white flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-rose-950 text-rose-400 border border-rose-800/50">SE</span>
                    Saídas Externas (Relatórios, Cálculos, Webhooks)
                  </span>
                  <span className="text-xs font-mono text-rose-400 font-semibold">
                    {calculationSummary.se} PF
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-xs text-slate-400">Baixa (4 PF)</span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => updateCount('seLow', -1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">-</button>
                      <span className="w-5 text-center font-mono text-xs font-bold text-white">{counts.seLow}</span>
                      <button onClick={() => updateCount('seLow', 1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">+</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-xs text-slate-400">Média (5 PF)</span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => updateCount('seMed', -1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">-</button>
                      <span className="w-5 text-center font-mono text-xs font-bold text-white">{counts.seMed}</span>
                      <button onClick={() => updateCount('seMed', 1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">+</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-xs text-slate-400">Alta (7 PF)</span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => updateCount('seHigh', -1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">-</button>
                      <span className="w-5 text-center font-mono text-xs font-bold text-white">{counts.seHigh}</span>
                      <button onClick={() => updateCount('seHigh', 1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">+</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* CEs */}
              <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-white flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-950 text-emerald-400 border border-emerald-800/50">CE</span>
                    Consultas Externas (GETs simples, buscas paginadas)
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">
                    {calculationSummary.ce} PF
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-xs text-slate-400">Baixa (3 PF)</span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => updateCount('ceLow', -1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">-</button>
                      <span className="w-5 text-center font-mono text-xs font-bold text-white">{counts.ceLow}</span>
                      <button onClick={() => updateCount('ceLow', 1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">+</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-xs text-slate-400">Média (4 PF)</span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => updateCount('ceMed', -1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">-</button>
                      <span className="w-5 text-center font-mono text-xs font-bold text-white">{counts.ceMed}</span>
                      <button onClick={() => updateCount('ceMed', 1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">+</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-xs text-slate-400">Alta (6 PF)</span>
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => updateCount('ceHigh', -1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">-</button>
                      <span className="w-5 text-center font-mono text-xs font-bold text-white">{counts.ceHigh}</span>
                      <button onClick={() => updateCount('ceHigh', 1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seleção de Stack e Parâmetros */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Cpu size={16} className="text-indigo-400" />
                2. Parâmetros Tecnológicos e da Equipe
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Backend */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Linguagem Backend</label>
                  <select
                    value={selectedBackend}
                    onChange={e => setSelectedBackend(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="dotnet">.NET 8 Minimal APIs (C# 12)</option>
                    <option value="fastapi">FastAPI (Python 3.12)</option>
                    <option value="spring">Spring Boot 3 (Java 21)</option>
                  </select>
                </div>

                {/* Frontend */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Framework Frontend</label>
                  <select
                    value={selectedFrontend}
                    onChange={e => setSelectedFrontend(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="react">React 18 / 19 (TypeScript)</option>
                    <option value="vue">Vue 3.4 (Composition API)</option>
                    <option value="angular">Angular 17+ (Signals)</option>
                  </select>
                </div>

                {/* Database */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Repositório de Dados</label>
                  <select
                    value={selectedDb}
                    onChange={e => setSelectedDb(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="postgresql">PostgreSQL 16 (Relacional + JSONB)</option>
                    <option value="mongodb">MongoDB 7 (Documentos)</option>
                    <option value="redis">Redis 7 (In-Memory)</option>
                  </select>
                </div>
              </div>

              {/* Complexidade e Equipe */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Complexidade / Fator VAF</label>
                  <select
                    value={complexityLevel}
                    onChange={e => setComplexityLevel(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="low">Baixa (VAF 0.85 - CRUD simples)</option>
                    <option value="standard">Média (VAF 1.00 - Padrão corporativo)</option>
                    <option value="high">Alta (VAF 1.15 - Concorrência e mTLS)</option>
                    <option value="critical">Crítica (VAF 1.30 - Bancário / 24x7 / SLA)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Tamanho do Time Devs</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={1}
                      max={12}
                      value={teamSize}
                      onChange={e => setTeamSize(Number(e.target.value))}
                      className="flex-1 accent-cyan-400"
                    />
                    <span className="font-mono text-xs font-bold text-white w-12 text-right">
                      {teamSize} dev{teamSize > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Duração da Sprint</label>
                  <select
                    value={sprintWeeks}
                    onChange={e => setSprintWeeks(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value={1}>1 Semana (Ciclos ultra-ágeis)</option>
                    <option value={2}>2 Semanas (Scrum padrão de mercado)</option>
                    <option value={4}>4 Semanas (Ciclos mensais)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Lado Direito: Resultados Dinâmicos e Dimensionamento */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 space-y-6 shadow-xl sticky top-24">
              <div className="border-b border-slate-800 pb-4">
                <span className="text-[11px] uppercase tracking-wider text-cyan-400 font-mono font-bold">
                  Resumo do Dimensionamento
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-sm font-semibold text-white">Tamanho Funcional:</span>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-cyan-400 font-mono">
                      {calculationSummary.pfa}
                    </span>
                    <span className="text-xs text-slate-400 ml-1.5 font-mono">PFA</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                  <span>Pontos Brutos (PFNA):</span>
                  <span className="font-mono text-slate-300 font-semibold">{calculationSummary.pfna} PF</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 mt-0.5">
                  <span>Fator de Ajuste (VAF):</span>
                  <span className="font-mono text-slate-300 font-semibold">{vafFactor.toFixed(2)}x</span>
                </div>
              </div>

              {/* Cards de Métricas Chave */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock size={14} className="text-cyan-400" />
                    <span>Esforço Total</span>
                  </div>
                  <div className="text-xl font-extrabold text-white font-mono">
                    {calculationSummary.totalHours} <span className="text-xs font-normal text-slate-400">horas</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Média: {calculationSummary.blendedHoursPerFP} h / PF
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar size={14} className="text-indigo-400" />
                    <span>Prazo Estimado</span>
                  </div>
                  <div className="text-xl font-extrabold text-white font-mono">
                    {calculationSummary.estimatedSprints} <span className="text-xs font-normal text-slate-400">sprints</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    ~{calculationSummary.estimatedWeeks} semanas ({teamSize} devs)
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Code size={14} className="text-emerald-400" />
                    <span>Código Estimado</span>
                  </div>
                  <div className="text-xl font-extrabold text-white font-mono">
                    {calculationSummary.estimatedKsloc} <span className="text-xs font-normal text-slate-400">KSLOC</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    ~{Math.round(calculationSummary.estimatedKsloc * 1000)} linhas
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <ShieldCheck size={14} className="text-amber-400" />
                    <span>Defeitos Esperados</span>
                  </div>
                  <div className="text-xl font-extrabold text-white font-mono">
                    {calculationSummary.expectedDefects} <span className="text-xs font-normal text-slate-400">bugs</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Em produção (~1 ano)
                  </div>
                </div>
              </div>

              {/* Detalhamento por Camada da Stack */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                <span className="font-semibold text-slate-300">Distribuição de Esforço por Camada:</span>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      Backend ({calculationSummary.beMetric.name})
                    </span>
                    <span className="font-mono text-slate-200">
                      ~{Math.round(calculationSummary.totalHours * 0.5)}h (50%)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      Frontend ({calculationSummary.feMetric.name})
                    </span>
                    <span className="font-mono text-slate-200">
                      ~{Math.round(calculationSummary.totalHours * 0.35)}h (35%)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      Banco ({calculationSummary.dbMetric.name})
                    </span>
                    <span className="font-mono text-slate-200">
                      ~{Math.round(calculationSummary.totalHours * 0.15)}h (15%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Manutenção Anual Projetada */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>Esforço de Sustentação Anual:</span>
                <span className="font-mono font-bold text-amber-400">
                  ~{calculationSummary.annualMaintenanceHours} h/ano
                </span>
              </div>

              {/* Botão de Download da Planilha */}
              <div className="pt-2 space-y-2">
                <button
                  id="download-fp-spreadsheet-btn"
                  onClick={handleDownloadSpreadsheet}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <Download size={16} className="group-hover:-translate-y-0.5 transition-transform" />
                  <span>Baixar Planilha de Estimativa (.csv / Excel)</span>
                </button>

                {downloadSuccess && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                    <Check size={14} className="text-emerald-400 shrink-0" />
                    <span>Planilha gerada com sucesso! Verifique seus downloads.</span>
                  </div>
                )}

                <p className="text-[10px] text-slate-500 text-center">
                  Compatível com Microsoft Excel, Google Planilhas e LibreOffice Calc. Codificado em UTF-8 com separador padrão.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 4: Estudo de Caso Prático - Plataforma Fintech de Alto Volume */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 font-bold">
            <CheckCircle2 size={14} />
            Estudo de Caso Prático
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            Mapeamento Real: Plataforma Fintech de Pagamentos Instantâneos (PIX)
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            Exemplo prático de contagem de Pontos de Função em uma arquitetura moderna baseada nas tecnologias deste portal, com persistência transacional em PostgreSQL, catálogo polimórfico em MongoDB e sessões em cache Redis.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4">Componente de Negócio</th>
                <th className="py-3 px-3 text-center">Complexidade</th>
                <th className="py-3 px-3 text-center">Pontos</th>
                <th className="py-3 px-4">Implementação Técnica na Stack</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {FINTECH_CASE_STUDY.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-xs whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded ${
                        item.type === 'ALI'
                          ? 'bg-cyan-950 text-cyan-400 border border-cyan-800/50'
                          : item.type === 'AIE'
                          ? 'bg-indigo-950 text-indigo-400 border border-indigo-800/50'
                          : item.type === 'EE'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800/50'
                          : item.type === 'SE'
                          ? 'bg-rose-950 text-rose-400 border border-rose-800/50'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{item.name}</div>
                    <div className="text-xs text-slate-400">{item.description}</div>
                  </td>
                  <td className="py-3.5 px-3 text-center text-xs font-medium text-slate-300">
                    {item.complexity}
                  </td>
                  <td className="py-3.5 px-3 text-center font-mono font-bold text-cyan-400">
                    {item.points} PF
                  </td>
                  <td className="py-3.5 px-4 text-xs text-slate-300 font-mono">
                    {item.techImplementation}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-950/90 font-semibold text-sm border-t-2 border-slate-700">
                <td colSpan={3} className="py-4 px-4 text-white text-right">
                  Total de Pontos de Função Não Ajustados (PFNA):
                </td>
                <td className="py-4 px-3 text-center font-mono text-cyan-400 text-base font-bold">
                  {FINTECH_CASE_STUDY.reduce((acc, item) => acc + item.points, 0)} PF
                </td>
                <td className="py-4 px-4 text-xs text-slate-400 font-mono">
                  Com Fator de Ajuste VAF 1.15 (Sistemas de Alta Concorrência) ={' '}
                  <strong className="text-white">
                    {Math.round(FINTECH_CASE_STUDY.reduce((acc, item) => acc + item.points, 0) * 1.15 * 10) / 10} PFA
                  </strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* Seção 5: As 14 Características Gerais de Sistemas (GSC) */}
      <section className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Info size={16} className="text-cyan-400" />
              As 14 Características Gerais de Sistemas (GSC - General System Characteristics)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Utilizadas na metodologia clássica IFPUG para calcular o Grau de Influência (DI) e o Fator de Ajuste de Valor: VAF = 0.65 + (0.01 × TDI).
            </p>
          </div>
          <button
            onClick={() => setShowGSCList(!showGSCList)}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
          >
            {showGSCList ? 'Ocultar Lista' : 'Exibir Todas as 14 GSC'}
            <ChevronRight size={14} className={`transition-transform ${showGSCList ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {showGSCList && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
            {GENERAL_SYSTEM_CHARACTERISTICS.map(gsc => (
              <div key={gsc.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1">
                <div className="font-semibold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-400 font-mono text-[10px] flex items-center justify-center font-bold">
                    {gsc.id}
                  </span>
                  {gsc.name}
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed pl-7">
                  {gsc.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* AdSense Unit Rodapé */}
      <AdUnit slot="9012345678" label="Publicidade" />
    </div>
  );
};
