import React, { useState, useMemo } from 'react';
import {
  Briefcase,
  ShoppingBag,
  Factory,
  Activity,
  Truck,
  Trees,
  Landmark,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Download,
  ShieldCheck,
  Cpu,
  Clock,
  Layers,
  Sparkles,
  HelpCircle,
  TrendingUp,
  Server,
  Database,
  Cloud,
  Code2,
  Lock,
  Building2,
  Calendar,
  X,
  Send,
  FileText
} from 'lucide-react';
import {
  EconomicSectorId,
  CompanySize,
  DigitalMaturityLevel,
  ProjectPrimaryGoal,
  BusinessAssessmentInput,
  LeadCaptureData
} from '../types.ts';
import {
  ECONOMIC_SECTORS,
  COMPANY_SIZES,
  MATURITY_LEVELS,
  PROJECT_GOALS,
  calculateBusinessAssessment
} from '../data/businessData.ts';
import { generateBusinessPdf } from '../utils/businessPdfGenerator.ts';

const SECTOR_ICONS: Record<EconomicSectorId, React.ElementType> = {
  retail: ShoppingBag,
  industry: Factory,
  services: Briefcase,
  health: Activity,
  logistics: Truck,
  agro: Trees,
  fintech: Landmark
};

export const BusinessView: React.FC = () => {
  // Estados do Formulário Interativo
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [sectorId, setSectorId] = useState<EconomicSectorId>('retail');
  const [specificNiche, setSpecificNiche] = useState<string>('');
  const [companySize, setCompanySize] = useState<CompanySize>('small');
  const [maturityLevel, setMaturityLevel] = useState<DigitalMaturityLevel>('spreadsheets');
  const [primaryGoal, setPrimaryGoal] = useState<ProjectPrimaryGoal>('process_automation');
  const [customRequirements, setCustomRequirements] = useState<string>('');

  // Estados de Download e Modal de Lead
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitError, setLeadSubmitError] = useState<string | null>(null);
  const [leadData, setLeadData] = useState<LeadCaptureData>({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    wantsConsultation: true
  });
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  // Input consolidado
  const currentInput: BusinessAssessmentInput = useMemo(() => ({
    sectorId,
    specificNiche: specificNiche.trim() || ECONOMIC_SECTORS[sectorId].typicalNiches[0],
    companySize,
    maturityLevel,
    primaryGoal,
    customRequirements: customRequirements.trim()
  }), [sectorId, specificNiche, companySize, maturityLevel, primaryGoal, customRequirements]);

  // Resultado do Cálculo
  const assessment = useMemo(() => {
    return calculateBusinessAssessment(currentInput);
  }, [currentInput]);

  const selectedSector = ECONOMIC_SECTORS[sectorId];

  // Disparo do Download do Preview Gratuito
  const handleDownloadPreview = () => {
    generateBusinessPdf(assessment, 'preview');
    setDownloadNotice('PDF Preview gerado com sucesso! Verifique seus downloads.');
    setTimeout(() => setDownloadNotice(null), 5000);
  };

  // Disparo do Download Completo com envio para Formspree
  const handleDownloadComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadData.name || !leadData.email) return;

    setIsSubmittingLead(true);
    setLeadSubmitError(null);

    // Salva lead localmente para histórico
    try {
      const existingLeads = JSON.parse(localStorage.getItem('codecompare_business_leads') || '[]');
      existingLeads.push({
        ...leadData,
        date: new Date().toISOString(),
        assessmentSector: selectedSector.name,
        companySize
      });
      localStorage.setItem('codecompare_business_leads', JSON.stringify(existingLeads));
    } catch {
      // Ignora falha em localstorage privado
    }

    // Dispara envio do Lead B2B para o Formspree
    try {
      await fetch('https://formspree.io/f/mqpqzkvr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          tipo: 'Lead B2B - Diagnóstico Business',
          nome: leadData.name.trim(),
          email: leadData.email.trim(),
          telefone_whatsapp: leadData.phone.trim() || 'Não informado',
          empresa: leadData.companyName.trim() || 'Não informado',
          deseja_consultoria: leadData.wantsConsultation ? 'Sim, solicitar contato técnico' : 'Apenas relatório',
          setor_economico: selectedSector.name,
          nicho_especifico: currentInput.specificNiche,
          porte_empresa: COMPANY_SIZES[companySize].label,
          maturidade_atual: MATURITY_LEVELS[maturityLevel].label,
          objetivo_projeto: PROJECT_GOALS[primaryGoal].label,
          estimativa_capex: `R$ ${assessment.capexMin.toLocaleString('pt-BR')} a R$ ${assessment.capexMax.toLocaleString('pt-BR')}`,
          estimativa_opex_mensal: `R$ ${assessment.opexMonthlyMin.toLocaleString('pt-BR')} a R$ ${assessment.opexMonthlyMax.toLocaleString('pt-BR')}`,
          prazo_semanas: `${assessment.timelineWeeksMin} a ${assessment.timelineWeeksMax} semanas (${assessment.sprintsCount} sprints)`,
          requisitos_adicionais: currentInput.customRequirements || 'Nenhum informado',
          _subject: `[Novo Lead B2B] ${leadData.name.trim()} - ${leadData.companyName.trim() || selectedSector.name}`
        })
      });
    } catch {
      // Se a conexão falhar, ainda garantimos a geração do documento do usuário
    } finally {
      setIsSubmittingLead(false);
    }

    generateBusinessPdf(assessment, 'complete', leadData);
    setIsLeadModalOpen(false);
    setDownloadNotice('Dossiê Analítico Completo (6 páginas) gerado com sucesso! Seus dados foram recebidos pela nossa equipe.');
    setTimeout(() => setDownloadNotice(null), 7000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Header Principal */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
          <Sparkles size={14} />
          <span>PLANEJAMENTO ESTRATÉGICO DE TI & ORÇAMENTAÇÃO</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-100 tracking-tight">
          Diagnóstico de Digitalização &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
            Orçamento Empresarial
          </span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          Simule os custos reais de desenvolvimento, infraestrutura em nuvem, prazos em semanas e a arquitetura ideal
          de software adaptada com precisão ao nicho comercial da sua empresa.
        </p>
      </div>

      {/* Stepper de Navegação */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-900/60 p-2 rounded-2xl border border-slate-800 backdrop-blur-sm">
        {[
          { step: 1, title: '1. Setor & Nicho', desc: 'Segmento da economia' },
          { step: 2, title: '2. Porte da Empresa', desc: 'Volume e colaboradores' },
          { step: 3, title: '3. Maturidade Digital', desc: 'Sistemas atuais' },
          { step: 4, title: '4. Objetivo Principal', desc: 'Meta do projeto' }
        ].map((item) => (
          <button
            key={item.step}
            onClick={() => setCurrentStep(item.step)}
            className={`flex flex-col items-start p-3 rounded-xl text-left transition-all cursor-pointer ${
              currentStep === item.step
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-300 shadow-lg shadow-cyan-500/10'
                : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200 border border-transparent'
            }`}
          >
            <span className="text-xs font-bold">{item.title}</span>
            <span className="text-[11px] text-slate-500 truncate w-full">{item.desc}</span>
          </button>
        ))}
      </div>

      {/* Área do Questionário com Base no Passo */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-8">
        {/* PASSO 1: SETOR & NICHO */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <Briefcase size={20} className="text-cyan-400" />
                  Selecione o Setor da Economia
                </h2>
                <p className="text-xs text-slate-400">
                  Cada setor possui padrões arquiteturais e exigências regulatórias únicas.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2.5 py-1 rounded-lg self-start">
                Etapa 1 de 4
              </span>
            </div>

            {/* Grid dos Setores */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.values(ECONOMIC_SECTORS).map((sec) => {
                const IconComponent = SECTOR_ICONS[sec.id] || Briefcase;
                const isSelected = sectorId === sec.id;
                return (
                  <div
                    key={sec.id}
                    onClick={() => {
                      setSectorId(sec.id);
                      setSpecificNiche('');
                    }}
                    className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                      isSelected
                        ? 'bg-slate-800/90 border-cyan-500 ring-2 ring-cyan-500/20 shadow-xl'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div
                          className={`p-2.5 rounded-lg ${
                            isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-cyan-400'
                          }`}
                        >
                          <IconComponent size={20} />
                        </div>
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          {sec.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-100 text-base">{sec.name}</h3>
                      <p className="text-xs text-slate-400 line-clamp-2">{sec.tagline}</p>
                    </div>

                    <div className="text-[11px] text-cyan-400 font-medium flex items-center gap-1 pt-2 border-t border-slate-800/80">
                      <span>Stack sugerida: {sec.recommendedBackend.split(' ')[0]} + {sec.recommendedFrontend.split(' ')[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Nicho Específico */}
            <div className="pt-4 space-y-3">
              <label className="block text-sm font-semibold text-slate-200">
                Qual o nicho específico ou especialidade da empresa?
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedSector.typicalNiches.map((niche) => (
                  <button
                    key={niche}
                    type="button"
                    onClick={() => setSpecificNiche(niche)}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      specificNiche === niche || (!specificNiche && niche === selectedSector.typicalNiches[0])
                        ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {niche}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Ou digite o nicho exato (ex: Distribuidora de Medicamentos Especiais, E-commerce de Peças Náuticas...)"
                value={specificNiche}
                onChange={(e) => setSpecificNiche(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>
        )}

        {/* PASSO 2: PORTE DA EMPRESA */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <Building2 size={20} className="text-cyan-400" />
                  Qual o Porte da Organização?
                </h2>
                <p className="text-xs text-slate-400">
                  O tamanho da equipe e volume transacional calibram os custos de licença, governança e cloud.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2.5 py-1 rounded-lg self-start">
                Etapa 2 de 4
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(Object.keys(COMPANY_SIZES) as CompanySize[]).map((sizeKey) => {
                const sizeItem = COMPANY_SIZES[sizeKey];
                const isSelected = companySize === sizeKey;
                return (
                  <div
                    key={sizeKey}
                    onClick={() => setCompanySize(sizeKey)}
                    className={`p-5 rounded-xl border transition-all cursor-pointer space-y-3 ${
                      isSelected
                        ? 'bg-slate-800/90 border-cyan-500 ring-2 ring-cyan-500/20 shadow-xl'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-slate-100">{sizeItem.label}</span>
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-800/60 text-cyan-400 font-semibold">
                        {sizeItem.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{sizeItem.description}</p>
                    <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
                      <Cpu size={13} className="text-cyan-400 shrink-0" />
                      <span>Squad típica: {sizeItem.typicalStaff}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PASSO 3: MATURIDADE DIGITAL */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <Database size={20} className="text-cyan-400" />
                  Maturidade Digital Atual da Empresa
                </h2>
                <p className="text-xs text-slate-400">
                  Impacta diretamente a complexidade de saneamento de dados e curva de migração da equipe.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2.5 py-1 rounded-lg self-start">
                Etapa 3 de 4
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(Object.keys(MATURITY_LEVELS) as DigitalMaturityLevel[]).map((levelKey) => {
                const item = MATURITY_LEVELS[levelKey];
                const isSelected = maturityLevel === levelKey;
                return (
                  <div
                    key={levelKey}
                    onClick={() => setMaturityLevel(levelKey)}
                    className={`p-5 rounded-xl border transition-all cursor-pointer space-y-3 ${
                      isSelected
                        ? 'bg-slate-800/90 border-cyan-500 ring-2 ring-cyan-500/20 shadow-xl'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-slate-100">{item.label}</span>
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.summary}</p>
                    <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>Fator de complexidade na migração:</span>
                      <span className="font-mono font-bold text-cyan-400">{item.complexityFactor}x</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PASSO 4: OBJETIVO PRINCIPAL */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                  <TrendingUp size={20} className="text-cyan-400" />
                  Qual a Principal Meta do Projeto?
                </h2>
                <p className="text-xs text-slate-400">
                  Define o escopo central da primeira entrega (MVP) e a arquitetura primária.
                </p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2.5 py-1 rounded-lg self-start">
                Etapa 4 de 4
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(Object.keys(PROJECT_GOALS) as ProjectPrimaryGoal[]).map((goalKey) => {
                const item = PROJECT_GOALS[goalKey];
                const isSelected = primaryGoal === goalKey;
                return (
                  <div
                    key={goalKey}
                    onClick={() => setPrimaryGoal(goalKey)}
                    className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                      isSelected
                        ? 'bg-slate-800/90 border-cyan-500 ring-2 ring-cyan-500/20 shadow-xl'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                    }`}
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                        {item.badge}
                      </span>
                      <h3 className="font-bold text-slate-100 text-sm">{item.label}</h3>
                      <p className="text-xs text-slate-400">{item.description}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                      <span>Prazo base estimado:</span>
                      <span className="font-mono text-cyan-400">{item.baseWeeks} semanas</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Requisitos Adicionais Opcionais */}
            <div className="pt-2 space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                Observações ou Requisitos Específicos do seu Negócio (Opcional)
              </label>
              <textarea
                rows={2}
                placeholder="Ex: 'Precisamos integrar com o ERP Totvs Protheus existente e operar offline no depósito'..."
                value={customRequirements}
                onChange={(e) => setCustomRequirements(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>
        )}

        {/* Botões de Avançar / Voltar no Wizard */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
              currentStep === 1
                ? 'opacity-40 cursor-not-allowed border-slate-800 text-slate-600'
                : 'border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white bg-slate-800/60'
            }`}
          >
            ← Voltar Etapa
          </button>

          <button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1))}
            disabled={currentStep === 4}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
              currentStep === 4
                ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
            }`}
          >
            <span>Próxima Etapa</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* PAINEL DINÂMICO DE RESULTADOS & ORÇAMENTO */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2">
              <TrendingUp className="text-cyan-400" size={24} />
              Projeção Orçamentária & Técnica
            </h2>
            <p className="text-xs text-slate-400">
              Cálculo estimado para: <strong className="text-slate-200">{selectedSector.name}</strong> ({currentInput.specificNiche})
            </p>
          </div>

          {/* Botões de Ação para Download */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Botão 1: Preview Gratuito Instantâneo */}
            <button
              id="download-business-preview-btn"
              type="button"
              onClick={handleDownloadPreview}
              className="px-4 py-2.5 rounded-xl border border-cyan-800/70 hover:border-cyan-500 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 hover:text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
              title="Baixar resumo executivo preliminar em PDF"
            >
              <Download size={14} className="text-cyan-400" />
              <span>Baixar Preview Gratuito (.pdf)</span>
            </button>

            {/* Botão 2: Dossiê Completo */}
            <button
              id="download-business-complete-btn"
              type="button"
              onClick={() => setIsLeadModalOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
              title="Acessar dossiê analítico completo com 6 páginas"
            >
              <Sparkles size={14} className="text-cyan-200" />
              <span>Obter Dossiê Analítico Completo (6 Páginas)</span>
            </button>
          </div>
        </div>

        {/* Notificação de Sucesso */}
        {downloadNotice && (
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span>{downloadNotice}</span>
          </div>
        )}

        {/* 4 Cards de Métricas Chave */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card Capex */}
          <div className="bg-slate-900/60 border border-cyan-500/40 rounded-2xl p-5 space-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
            <span className="text-[11px] font-bold tracking-wider text-cyan-400 uppercase">Investimento (Capex)</span>
            <div className="text-2xl font-black text-slate-100">
              R$ {assessment.capexMin.toLocaleString('pt-BR')} a {assessment.capexMax.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-slate-400">Desenvolvimento integral e homologação de software sob medida.</p>
          </div>

          {/* Card Opex */}
          <div className="bg-slate-900/60 border border-emerald-500/40 rounded-2xl p-5 space-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
            <span className="text-[11px] font-bold tracking-wider text-emerald-400 uppercase">Custo Nuvem (Opex)</span>
            <div className="text-2xl font-black text-slate-100">
              R$ {assessment.opexMonthlyMin.toLocaleString('pt-BR')} a {assessment.opexMonthlyMax.toLocaleString('pt-BR')}{' '}
              <span className="text-xs font-normal text-slate-400">/mês</span>
            </div>
            <p className="text-xs text-slate-400">
              Servidores gerenciados na {assessment.cloudSimulation.provider} ({assessment.cloudSimulation.tier}).
            </p>
          </div>

          {/* Card Prazos */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Tempo de Rollout</span>
            <div className="text-2xl font-black text-slate-100">
              {assessment.timelineWeeksMin} a {assessment.timelineWeeksMax}{' '}
              <span className="text-xs font-normal text-slate-400">semanas</span>
            </div>
            <p className="text-xs text-slate-400">
              Distribuído em aprox. {assessment.sprintsCount} sprints quinzenais ágeis.
            </p>
          </div>

          {/* Card Squad */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
            <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">Tamanho do Squad</span>
            <div className="text-2xl font-black text-slate-100">
              {assessment.recommendedSquad.length}{' '}
              <span className="text-xs font-normal text-slate-400">profissionais</span>
            </div>
            <p className="text-xs text-slate-400">
              Tech Lead, Desenvolvedores Sêniores, DevOps e Analista QA.
            </p>
          </div>
        </div>

        {/* Stack Tecnológica Recomendada */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Cpu className="text-cyan-400" size={18} />
              Arquitetura Recomendada para {selectedSector.name}
            </h3>
            <span className="text-[11px] text-slate-400">Integração nativa com guias técnicos do CodeCompare</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
                <Code2 size={14} />
                <span>Frontend UI/UX</span>
              </div>
              <p className="text-xs font-semibold text-slate-200">{selectedSector.recommendedFrontend}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400">
                <Server size={14} />
                <span>Backend & APIs</span>
              </div>
              <p className="text-xs font-semibold text-slate-200">{selectedSector.recommendedBackend}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <Database size={14} />
                <span>Banco de Dados</span>
              </div>
              <p className="text-xs font-semibold text-slate-200">{selectedSector.recommendedDatabase}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-400">
                <Cloud size={14} />
                <span>Infraestrutura Nuvem</span>
              </div>
              <p className="text-xs font-semibold text-slate-200">{selectedSector.recommendedCloud}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs text-slate-300 leading-relaxed">
            <strong className="text-cyan-300 font-bold">Padrão Arquitetural: </strong>
            {selectedSector.architectureHighlight}
          </div>
        </div>

        {/* Fases de Rollout em Sprints */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
            <Calendar className="text-cyan-400" size={18} />
            Cronograma de Implementação Faseada
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {assessment.rolloutPhases.map((phase, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-400">{phase.phase}</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 block">{phase.duration}</span>
                <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-850">
                  {phase.deliverables.map((deliv, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL DE CAPTURA DE LEAD PARA O DOSSIÊ COMPLETO */}
      {isLeadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setIsLeadModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 text-[11px] font-semibold">
                <Sparkles size={12} />
                <span>DOSSIÊ COMPLETO // 6 PÁGINAS</span>
              </div>
              <h3 className="text-xl font-bold text-slate-100">
                Onde devemos enviar seu Relatório Analítico?
              </h3>
              <p className="text-xs text-slate-400">
                O PDF completo será baixado imediatamente no seu dispositivo com o nome da sua empresa personalizado.
              </p>
            </div>

            <form onSubmit={handleDownloadComplete} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">Seu Nome Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Eduardo"
                  value={leadData.name}
                  onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">E-mail Profissional *</label>
                  <input
                    type="email"
                    required
                    placeholder="carlos@empresa.com.br"
                    value={leadData.email}
                    onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-slate-300">WhatsApp / Telefone</label>
                  <input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={leadData.phone}
                    onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">Nome da Empresa</label>
                <input
                  type="text"
                  placeholder="Ex: Indústrias Brasil S/A"
                  value={leadData.companyName}
                  onChange={(e) => setLeadData({ ...leadData, companyName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <label className="flex items-start gap-2 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={leadData.wantsConsultation}
                  onChange={(e) => setLeadData({ ...leadData, wantsConsultation: e.target.checked })}
                  className="mt-0.5 rounded border-slate-700 bg-slate-950 text-cyan-500 focus:ring-0"
                />
                <span className="text-[11px] text-slate-400">
                  Desejo receber contato técnico de um especialista para orçamento de squad ou consultoria.
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmittingLead}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4 disabled:opacity-60"
              >
                {isSubmittingLead ? (
                  <span>Registrando e Gerando Relatório...</span>
                ) : (
                  <>
                    <Download size={15} />
                    <span>Gerar & Baixar Dossiê Completo (.pdf)</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 pt-1">
                <Lock size={11} />
                <span>Seus dados estão protegidos em conformidade com a LGPD (Lei 13.709/2018).</span>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
