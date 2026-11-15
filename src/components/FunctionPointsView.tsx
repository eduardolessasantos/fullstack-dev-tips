import React, { useState, useMemo, useEffect } from 'react';
import {
  Calculator,
  Layers,
  Cpu,
  Clock,
  CheckCircle2,
  BarChart3,
  ShieldCheck,
  Code,
  Database,
  Calendar,
  Info,
  ChevronRight,
  Download,
  FileSpreadsheet,
  Check
} from 'lucide-react';
import { useLanguage, useTranslationNamespace } from '../i18n/LanguageContext';

export const FunctionPointsView: React.FC = () => {
  const { t } = useLanguage();
  const { data: tools } = useTranslationNamespace('engineeringTools');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'backend' | 'frontend' | 'database'>('all');
  const [showGSCList, setShowGSCList] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

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

  const fpMetrics = tools?.fpMetrics ?? [];
  const fpWeights = tools?.fpWeights ?? [];
  const fpCaseStudy = tools?.fpCaseStudy ?? [];
  const fpGscList = tools?.fpGscList ?? [];
  const fpUi = tools?.fpUi;

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

    const fallbackMetric = {
      tech: '',
      name: '',
      category: 'backend' as const,
      hoursPerFP: { min: 0, avg: 0, max: 0 },
      slocPerFP: 0,
      maintenanceHoursPerYear: 0,
      defectDensityPer1000FP: 0,
      recommendedUseCase: '',
      productivityFactors: []
    };

    const beMetric = fpMetrics.find(m => m.tech === selectedBackend) || fpMetrics[1] || fallbackMetric;
    const feMetric = fpMetrics.find(m => m.tech === selectedFrontend) || fpMetrics[4] || fallbackMetric;
    const dbMetric = fpMetrics.find(m => m.tech === selectedDb) || fpMetrics[6] || fallbackMetric;

    const blendedHoursPerFP =
      beMetric.hoursPerFP.avg * 0.5 +
      feMetric.hoursPerFP.avg * 0.35 +
      dbMetric.hoursPerFP.avg * 0.15;

    const totalHours = Math.round(pfa * blendedHoursPerFP);

    const blendedSlocPerFP =
      beMetric.slocPerFP * 0.5 + feMetric.slocPerFP * 0.35 + dbMetric.slocPerFP * 0.15;
    const estimatedKsloc = Math.round((pfa * blendedSlocPerFP) / 100) / 10;

    const productiveHoursPerDevPerWeek = 32.5;
    const sprintCapacityHours = teamSize * productiveHoursPerDevPerWeek * sprintWeeks;
    const estimatedSprints = sprintCapacityHours > 0 ? Math.ceil((totalHours / sprintCapacityHours) * 10) / 10 : 0;
    const estimatedWeeks = Math.round(estimatedSprints * sprintWeeks);

    const blendedDefectRate =
      beMetric.defectDensityPer1000FP * 0.5 +
      feMetric.defectDensityPer1000FP * 0.35 +
      dbMetric.defectDensityPer1000FP * 0.15;
    const expectedDefects = Math.round((pfa / 1000) * blendedDefectRate * 10) / 10;

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
  }, [fpMetrics, counts, vafFactor, selectedBackend, selectedFrontend, selectedDb, teamSize, sprintWeeks]);

  const filteredMetrics = useMemo(() => {
    if (activeCategoryFilter === 'all') return fpMetrics;
    return fpMetrics.filter(m => m.category === activeCategoryFilter);
  }, [fpMetrics, activeCategoryFilter]);

  const updateCount = (key: keyof typeof counts, delta: number) => {
    setCounts(prev => ({
      ...prev,
      [key]: Math.max(0, prev[key] + delta)
    }));
  };

  const csvContent = useMemo(() => {
    if (!fpUi) return '';
    const BOM = '\uFEFF';
    const sep = ';';
    const csv = fpUi.csv;

    const sanitize = (val: string | number) => {
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const comps = csv.components;
    const rows: string[][] = [
      [csv.docTitle],
      [csv.portalLabel, csv.portalVal],
      [csv.methodLabel, csv.methodVal],
      [csv.dateLabel, new Date().toLocaleString(fpUi.dateLocale)],
      [''],
      [csv.sec1Title],
      csv.sec1Headers,
      [csv.pfnaLabel, String(calculationSummary.pfna), fpUi.pfUnit, csv.pfnaNote],
      [csv.complexityLabel, complexityLevel.toUpperCase(), '-', csv.complexityNote],
      [csv.vafLabel, vafFactor.toFixed(2), fpUi.vafLabel, csv.vafNote],
      [csv.pfaLabel, String(calculationSummary.pfa), 'PFA', csv.pfaNote],
      [csv.avgProdLabel, String(calculationSummary.blendedHoursPerFP), 'h/PF', csv.avgProdNote],
      [csv.effortLabel, String(calculationSummary.totalHours), fpUi.hoursUnit, csv.effortNote],
      [csv.teamLabel, String(teamSize), fpUi.devsUnit, csv.teamNote],
      [csv.sprintLabel, String(sprintWeeks), fpUi.weeksUnit, csv.sprintNote],
      [csv.timelineLabel, String(calculationSummary.estimatedSprints), fpUi.sprintsUnit, `${csv.timelineApproxPrefix} ${calculationSummary.estimatedWeeks} ${csv.timelineApproxSuffix}`],
      [csv.kslocLabel, String(calculationSummary.estimatedKsloc), 'KSLOC', `${csv.kslocLinesPrefix}${Math.round(calculationSummary.estimatedKsloc * 1000)} ${csv.kslocLinesSuffix}`],
      [csv.defectsLabel, String(calculationSummary.expectedDefects), fpUi.bugsUnit, csv.defectsNote],
      [csv.maintLabel, String(calculationSummary.annualMaintenanceHours), fpUi.perYearUnit, csv.maintNote],
      [''],
      [csv.sec2Title],
      csv.sec2Headers,
      [comps[0].abbr, comps[0].name, String(counts.aliLow), String(counts.aliMed), String(counts.aliHigh), String(counts.aliLow + counts.aliMed + counts.aliHigh), String(calculationSummary.ali)],
      [comps[1].abbr, comps[1].name, String(counts.aieLow), String(counts.aieMed), String(counts.aieHigh), String(counts.aieLow + counts.aieMed + counts.aieHigh), String(calculationSummary.aie)],
      [comps[2].abbr, comps[2].name, String(counts.eeLow), String(counts.eeMed), String(counts.eeHigh), String(counts.eeLow + counts.eeMed + counts.eeHigh), String(calculationSummary.ee)],
      [comps[3].abbr, comps[3].name, String(counts.seLow), String(counts.seMed), String(counts.seHigh), String(counts.seLow + counts.seMed + counts.seHigh), String(calculationSummary.se)],
      [comps[4].abbr, comps[4].name, String(counts.ceLow), String(counts.ceMed), String(counts.ceHigh), String(counts.ceLow + counts.ceMed + counts.ceHigh), String(calculationSummary.ce)],
      [csv.subtotalDataLabel, '-', '-', '-', '-', String(counts.aliLow + counts.aliMed + counts.aliHigh + counts.aieLow + counts.aieMed + counts.aieHigh), String(calculationSummary.dataFunctions)],
      [csv.subtotalTxLabel, '-', '-', '-', '-', String(counts.eeLow + counts.eeMed + counts.eeHigh + counts.seLow + counts.seMed + counts.seHigh + counts.ceLow + counts.ceMed + counts.ceHigh), String(calculationSummary.transactionFunctions)],
      [csv.totalPfnaLabel, '-', '-', '-', '-', '-', String(calculationSummary.pfna)],
      [''],
      [csv.sec3Title],
      csv.sec3Headers,
      [csv.layerBackend, calculationSummary.beMetric.name, String(calculationSummary.beMetric.hoursPerFP.avg), String(calculationSummary.beMetric.slocPerFP), '50%', String(Math.round(calculationSummary.totalHours * 0.5))],
      [csv.layerFrontend, calculationSummary.feMetric.name, String(calculationSummary.feMetric.hoursPerFP.avg), String(calculationSummary.feMetric.slocPerFP), '35%', String(Math.round(calculationSummary.totalHours * 0.35))],
      [csv.layerDb, calculationSummary.dbMetric.name, String(calculationSummary.dbMetric.hoursPerFP.avg), String(calculationSummary.dbMetric.slocPerFP), '15%', String(Math.round(calculationSummary.totalHours * 0.15))],
      [csv.totalIntegrated, csv.fullStackLabel, String(calculationSummary.blendedHoursPerFP), '-', '100%', String(calculationSummary.totalHours)]
    ];

    return BOM + rows.map(r => r.map(sanitize).join(sep)).join('\r\n');
  }, [fpUi, calculationSummary, counts, complexityLevel, vafFactor, teamSize, sprintWeeks]);

  const csvDataUri = useMemo(() => {
    return 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
  }, [csvContent]);

  const [blobUrl, setBlobUrl] = useState<string>('');

  useEffect(() => {
    let url = '';
    try {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      url = URL.createObjectURL(blob);
      setBlobUrl(url);
    } catch {
      // Fallback
    }

    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [csvContent]);

  if (!tools || !fpUi) {
    return (
      <div className="py-20 text-center text-sm text-slate-400 animate-pulse">
        {t.common.loadingTranslation}
      </div>
    );
  }

  const downloadUrl = blobUrl || csvDataUri;
  const fileName = fpUi.csvFilename;

  const handleDownloadSpreadsheet = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 no-ads">
      {/* Header Institucional da Seção */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-950 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/60">
            <Calculator size={14} />
            {fpUi.badge}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {fpUi.title}
          </h1>

          <p className="text-base md:text-lg text-slate-300 leading-relaxed">
            {fpUi.subtitle}
          </p>

          <div className="flex flex-wrap gap-2 pt-2 text-xs font-mono text-slate-400">
            <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60">
              {fpUi.normIso}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60">
              {fpUi.normIsbsg}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60">
              {fpUi.normNeutral}
            </span>
          </div>
        </div>
      </section>

      {/* Seção 1: O que é APF e a Matriz Canônica IFPUG */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-cyan-400 font-bold">
              <Layers size={14} />
              {fpUi.matrixKicker}
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              {fpUi.referenceTableTitle}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              {fpUi.referenceTableSubtitle}
            </p>
          </div>

          <a
            id="download-fp-overview-btn"
            href={downloadUrl}
            download={fileName}
            data-href={downloadUrl}
            onClick={handleDownloadSpreadsheet}
            className="px-3.5 py-2 text-xs font-semibold text-cyan-300 hover:text-white rounded-xl border border-cyan-800/60 hover:border-cyan-600 bg-cyan-950/40 hover:bg-cyan-900/60 transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer shadow-sm shrink-0"
            title={fpUi.matrixExportTitle}
          >
            <FileSpreadsheet size={14} className="text-cyan-400 shrink-0" />
            <span>{fpUi.matrixExportBtn}</span>
          </a>
        </div>

        {/* Tabela de Pesos Canônicos */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <th className="py-3.5 px-4">{fpUi.colAbbr}</th>
                <th className="py-3.5 px-4">{fpUi.colElement}</th>
                <th className="py-3.5 px-3 text-center bg-emerald-950/30 text-emerald-300">{fpUi.lowLabel}</th>
                <th className="py-3.5 px-3 text-center bg-amber-950/30 text-amber-300">{fpUi.medLabel}</th>
                <th className="py-3.5 px-3 text-center bg-rose-950/30 text-rose-300">{fpUi.highLabel}</th>
                <th className="py-3.5 px-4">{fpUi.colMapping}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {fpWeights.map(elem => (
                <tr key={elem.type} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-cyan-400 whitespace-nowrap">
                    {elem.type}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-white">{elem.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{elem.description}</div>
                  </td>
                  <td className="py-4 px-3 text-center font-mono font-semibold text-emerald-400 bg-emerald-950/10">
                    {elem.low} {fpUi.pfUnit}
                  </td>
                  <td className="py-4 px-3 text-center font-mono font-semibold text-amber-400 bg-amber-950/10">
                    {elem.medium} {fpUi.pfUnit}
                  </td>
                  <td className="py-4 px-3 text-center font-mono font-semibold text-rose-400 bg-rose-950/10">
                    {elem.high} {fpUi.pfUnit}
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
              {fpUi.benchmarkKicker}
            </div>
            <h2 className="text-2xl font-bold text-white mt-1">
              {fpUi.techBenchmarkTitle}
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-3xl">
              {fpUi.techBenchmarkSubtitle}
            </p>
          </div>

          {/* Ações e Filtros de Categoria */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <a
              id="download-fp-metrics-btn"
              href={downloadUrl}
              download={fileName}
              data-href={downloadUrl}
              onClick={handleDownloadSpreadsheet}
              className="px-3 py-1.5 rounded-lg border border-cyan-800/60 hover:border-cyan-600 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title={fpUi.benchmarkDownloadTitle}
            >
              <Download size={13} className="text-cyan-400 shrink-0" />
              <span>{fpUi.benchmarkDownloadBtn}</span>
            </a>

            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <button
                onClick={() => setActiveCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  activeCategoryFilter === 'all'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {fpUi.filterAll} ({fpMetrics.length})
              </button>
              <button
                onClick={() => setActiveCategoryFilter('backend')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  activeCategoryFilter === 'backend'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {fpUi.filterBackend}
              </button>
              <button
                onClick={() => setActiveCategoryFilter('frontend')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  activeCategoryFilter === 'frontend'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {fpUi.filterFrontend}
              </button>
              <button
                onClick={() => setActiveCategoryFilter('database')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  activeCategoryFilter === 'database'
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {fpUi.filterDatabase}
              </button>
            </div>
          </div>
        </div>

        {/* Tabela de Produtividade */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <th className="py-3.5 px-4">{fpUi.colTechVersion}</th>
                <th className="py-3.5 px-4 text-center">{fpUi.colAvgRate}</th>
                <th className="py-3.5 px-3 text-center">{fpUi.colTypicalRange}</th>
                <th className="py-3.5 px-4 text-center">{fpUi.colSlocPerFp}</th>
                <th className="py-3.5 px-4 text-center">{fpUi.colMaintYear}</th>
                <th className="py-3.5 px-4 text-center">{fpUi.colBugsPer1000}</th>
                <th className="py-3.5 px-4">{fpUi.colFactors}</th>
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
                      {fpUi.catLabels[item.category]}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <span className="font-mono text-base font-bold text-cyan-400">
                      {item.hoursPerFP.avg} {fpUi.hoursShortUnit}
                    </span>
                  </td>

                  <td className="py-4 px-3 text-center font-mono text-xs text-slate-400 whitespace-nowrap">
                    {item.hoursPerFP.min}{fpUi.hoursShortUnit} – {item.hoursPerFP.max}{fpUi.hoursShortUnit}
                  </td>

                  <td className="py-4 px-4 text-center font-mono text-xs text-slate-300 font-medium">
                    {item.slocPerFP} {fpUi.slocLinesUnit}
                  </td>

                  <td className="py-4 px-4 text-center font-mono text-xs text-slate-400">
                    {item.maintenanceHoursPerYear} {fpUi.maintUnit}
                  </td>

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
              {fpUi.calculatorKicker}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {fpUi.calcSectionTitle}
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl">
              {fpUi.calcSectionSubtitle}
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
            {fpUi.calculatorLoadExampleBtn}
          </button>

          <a
            id="download-fp-calculator-btn"
            href={downloadUrl}
            download={fileName}
            data-href={downloadUrl}
            onClick={handleDownloadSpreadsheet}
            className="px-3.5 py-1.5 text-xs font-semibold text-white rounded-lg border border-emerald-500/50 hover:border-emerald-400 bg-emerald-950/70 hover:bg-emerald-900/80 transition-colors flex items-center gap-1.5 self-start md:self-auto cursor-pointer shadow-sm"
            title={fpUi.calculatorDownloadSheetTitle}
          >
            <FileSpreadsheet size={14} className="text-emerald-400" />
            <span>{fpUi.calculatorDownloadSheetBtn}</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Lado Esquerdo: Controles de Entrada das Funções */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Layers size={16} className="text-cyan-400" />
              {fpUi.calculatorStep1Title}
            </h3>

            <div className="space-y-4">
              {(
                [
                  {
                    type: 'ALI' as const,
                    badgeClass: 'bg-cyan-950 text-cyan-400 border-cyan-800/50',
                    totalClass: 'text-cyan-400',
                    total: calculationSummary.ali,
                    lowKey: 'aliLow' as const,
                    medKey: 'aliMed' as const,
                    highKey: 'aliHigh' as const,
                  },
                  {
                    type: 'AIE' as const,
                    badgeClass: 'bg-indigo-950 text-indigo-400 border-indigo-800/50',
                    totalClass: 'text-indigo-400',
                    total: calculationSummary.aie,
                    lowKey: 'aieLow' as const,
                    medKey: 'aieMed' as const,
                    highKey: 'aieHigh' as const,
                  },
                  {
                    type: 'EE' as const,
                    badgeClass: 'bg-amber-950 text-amber-400 border-amber-800/50',
                    totalClass: 'text-amber-400',
                    total: calculationSummary.ee,
                    lowKey: 'eeLow' as const,
                    medKey: 'eeMed' as const,
                    highKey: 'eeHigh' as const,
                  },
                  {
                    type: 'SE' as const,
                    badgeClass: 'bg-rose-950 text-rose-400 border-rose-800/50',
                    totalClass: 'text-rose-400',
                    total: calculationSummary.se,
                    lowKey: 'seLow' as const,
                    medKey: 'seMed' as const,
                    highKey: 'seHigh' as const,
                  },
                  {
                    type: 'CE' as const,
                    badgeClass: 'bg-emerald-950 text-emerald-400 border-emerald-800/50',
                    totalClass: 'text-emerald-400',
                    total: calculationSummary.ce,
                    lowKey: 'ceLow' as const,
                    medKey: 'ceMed' as const,
                    highKey: 'ceHigh' as const,
                  },
                ]
              ).map((group) => {
                const elMeta = fpUi.elements[group.type];
                return (
                  <div key={group.type} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-white flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold border ${group.badgeClass}`}>
                          {group.type}
                        </span>
                        {elMeta.label}
                      </span>
                      <span className={`text-xs font-mono font-semibold ${group.totalClass}`}>
                        {group.total} {fpUi.pfUnit}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {(
                        [
                          { label: elMeta.low, key: group.lowKey },
                          { label: elMeta.med, key: group.medKey },
                          { label: elMeta.high, key: group.highKey },
                        ]
                      ).map((tier) => (
                        <div key={tier.key} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                          <span className="text-xs text-slate-400">{tier.label}</span>
                          <div className="flex items-center gap-1.5">
                            <button onClick={() => updateCount(tier.key, -1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">-</button>
                            <span className="w-5 text-center font-mono text-xs font-bold text-white">{counts[tier.key]}</span>
                            <button onClick={() => updateCount(tier.key, 1)} className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white">+</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Seleção de Stack e Parâmetros */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Cpu size={16} className="text-indigo-400" />
                {fpUi.calculatorStep2Title}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">{fpUi.backendLabel}</label>
                  <select
                    value={selectedBackend}
                    onChange={e => setSelectedBackend(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    {fpUi.backendOptions.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">{fpUi.frontendLabel}</label>
                  <select
                    value={selectedFrontend}
                    onChange={e => setSelectedFrontend(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    {fpUi.frontendOptions.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">{fpUi.databaseLabel}</label>
                  <select
                    value={selectedDb}
                    onChange={e => setSelectedDb(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    {fpUi.dbOptions.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Complexidade e Equipe */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">{fpUi.complexityLabel}</label>
                  <select
                    value={complexityLevel}
                    onChange={e => setComplexityLevel(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    {fpUi.complexityOptions.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">{fpUi.teamSizeLabel}</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={1}
                      max={12}
                      value={teamSize}
                      onChange={e => setTeamSize(Number(e.target.value))}
                      className="flex-1 accent-cyan-400"
                    />
                    <span className="font-mono text-xs font-bold text-white w-14 text-right">
                      {teamSize} {fpUi.devsShortUnit}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">{fpUi.sprintLenLabel}</label>
                  <select
                    value={sprintWeeks}
                    onChange={e => setSprintWeeks(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    {fpUi.sprintOptions.map(opt => (
                      <option key={opt.id} value={Number(opt.id)}>{opt.label}</option>
                    ))}
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
                  {fpUi.summaryKicker}
                </span>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-sm font-semibold text-white">{fpUi.functionalSizeLabel}</span>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-cyan-400 font-mono">
                      {calculationSummary.pfa}
                    </span>
                    <span className="text-xs text-slate-400 ml-1.5 font-mono">PFA</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 mt-1">
                  <span>{fpUi.rawFpLabel}</span>
                  <span className="font-mono text-slate-300 font-semibold">{calculationSummary.pfna} {fpUi.pfUnit}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 mt-0.5">
                  <span>{fpUi.vafLabel}:</span>
                  <span className="font-mono text-slate-300 font-semibold">{vafFactor.toFixed(2)}x</span>
                </div>
              </div>

              {/* Cards de Métricas Chave */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock size={14} className="text-cyan-400" />
                    <span>{fpUi.totalEffortTitle}</span>
                  </div>
                  <div className="text-xl font-extrabold text-white font-mono">
                    {calculationSummary.totalHours} <span className="text-xs font-normal text-slate-400">{fpUi.hoursUnit}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {fpUi.avgPrefix} {calculationSummary.blendedHoursPerFP} h / {fpUi.pfUnit}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar size={14} className="text-indigo-400" />
                    <span>{fpUi.estTimelineTitle}</span>
                  </div>
                  <div className="text-xl font-extrabold text-white font-mono">
                    {calculationSummary.estimatedSprints} <span className="text-xs font-normal text-slate-400">{fpUi.sprintsUnit}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    ~{calculationSummary.estimatedWeeks} {fpUi.weeksUnit} ({teamSize} {fpUi.devsShortUnit})
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Code size={14} className="text-emerald-400" />
                    <span>{fpUi.estCodeTitle}</span>
                  </div>
                  <div className="text-xl font-extrabold text-white font-mono">
                    {calculationSummary.estimatedKsloc} <span className="text-xs font-normal text-slate-400">KSLOC</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {fpUi.linesApproxPrefix}{Math.round(calculationSummary.estimatedKsloc * 1000)} {fpUi.linesApproxUnit}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <ShieldCheck size={14} className="text-amber-400" />
                    <span>{fpUi.expectedDefectsTitle}</span>
                  </div>
                  <div className="text-xl font-extrabold text-white font-mono">
                    {calculationSummary.expectedDefects} <span className="text-xs font-normal text-slate-400">{fpUi.bugsUnit}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {fpUi.prodYearNote}
                  </div>
                </div>
              </div>

              {/* Detalhamento por Camada da Stack */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                <span className="font-semibold text-slate-300">{fpUi.layerDistLabel}</span>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-purple-400" />
                      {fpUi.backendLayerLabel} ({calculationSummary.beMetric.name})
                    </span>
                    <span className="font-mono text-slate-200">
                      ~{Math.round(calculationSummary.totalHours * 0.5)}{fpUi.hoursShortUnit} (50%)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      {fpUi.frontendLayerLabel} ({calculationSummary.feMetric.name})
                    </span>
                    <span className="font-mono text-slate-200">
                      ~{Math.round(calculationSummary.totalHours * 0.35)}{fpUi.hoursShortUnit} (35%)
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      {fpUi.dbLayerLabel} ({calculationSummary.dbMetric.name})
                    </span>
                    <span className="font-mono text-slate-200">
                      ~{Math.round(calculationSummary.totalHours * 0.15)}{fpUi.hoursShortUnit} (15%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Manutenção Anual Projetada */}
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>{fpUi.annualMaintLabel}</span>
                <span className="font-mono font-bold text-amber-400">
                  ~{calculationSummary.annualMaintenanceHours} {fpUi.perYearUnit}
                </span>
              </div>

              {/* Botão de Download da Planilha */}
              <div className="pt-2 space-y-2">
                <a
                  id="download-fp-spreadsheet-btn"
                  href={downloadUrl}
                  download={fileName}
                  data-href={downloadUrl}
                  onClick={handleDownloadSpreadsheet}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer group text-center"
                  title={fpUi.spreadsheetBtnTitle}
                >
                  <Download size={16} className="group-hover:-translate-y-0.5 transition-transform shrink-0" />
                  <span>{fpUi.spreadsheetBtnLabel}</span>
                </a>

                {downloadSuccess && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
                    <Check size={14} className="text-emerald-400 shrink-0" />
                    <span>{fpUi.downloadSuccessMsg}</span>
                  </div>
                )}

                <p className="text-[10px] text-slate-500 text-center">
                  {fpUi.excelCompatNote}
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
            {fpUi.caseStudyKicker}
          </div>
          <h2 className="text-2xl font-bold text-white mt-1">
            {fpUi.caseStudyTitle}
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-3xl">
            {fpUi.caseStudySubtitle}
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 border-b border-slate-800 text-xs font-semibold text-slate-300 uppercase tracking-wider">
                <th className="py-3 px-4">{fpUi.colCaseType}</th>
                <th className="py-3 px-4">{fpUi.colCaseItem}</th>
                <th className="py-3 px-3 text-center">{fpUi.colCaseComplexity}</th>
                <th className="py-3 px-3 text-center">{fpUi.colCaseFp}</th>
                <th className="py-3 px-4">{fpUi.colCaseImpl}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {fpCaseStudy.map((item, idx) => (
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
                    {fpUi.complexityDisplay[item.complexity] ?? item.complexity}
                  </td>
                  <td className="py-3.5 px-3 text-center font-mono font-bold text-cyan-400">
                    {item.points} {fpUi.pfUnit}
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
                  {fpUi.caseStudyPfnaTotalLabel}
                </td>
                <td className="py-4 px-3 text-center font-mono text-cyan-400 text-base font-bold">
                  {fpCaseStudy.reduce((acc, item) => acc + item.points, 0)} {fpUi.pfUnit}
                </td>
                <td className="py-4 px-4 text-xs text-slate-400 font-mono">
                  {fpUi.caseStudyVafPrefix}{' '}
                  <strong className="text-white">
                    {Math.round(fpCaseStudy.reduce((acc, item) => acc + item.points, 0) * 1.15 * 10) / 10} PFA
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
              {fpUi.gscTitle}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {fpUi.gscFormulaDesc}
            </p>
          </div>
          <button
            onClick={() => setShowGSCList(!showGSCList)}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
          >
            {showGSCList ? fpUi.gscToggleHide : fpUi.gscToggleShow}
            <ChevronRight size={14} className={`transition-transform ${showGSCList ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {showGSCList && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-800 text-xs">
            {fpGscList.map(gsc => (
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
    </div>
  );
};
