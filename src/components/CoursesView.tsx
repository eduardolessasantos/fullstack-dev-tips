import React, { useState, useMemo } from 'react';
import {
  GraduationCap,
  Award,
  Cloud,
  Server,
  Code2,
  Database,
  Search,
  Clock,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  ArrowRight,
  X,
  Calendar,
  Layers,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Filter
} from 'lucide-react';
import { FORMATIONS_DATA } from '../data/coursesData.ts';
import { Formation, FormationCategory, FormationLevel, PageId } from '../types.ts';

interface CoursesViewProps {
  onNavigateToPage?: (page: PageId, subTab?: string) => void;
  onNavigateToArticle?: (articleId: string) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  onNavigateToPage,
  onNavigateToArticle
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FormationCategory>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalFormation, setActiveModalFormation] = useState<Formation | null>(null);
  const [modalActiveTab, setModalActiveTab] = useState<'syllabus' | 'exam' | 'roadmap'>('syllabus');

  // Filtragem combinada
  const filteredFormations = useMemo(() => {
    return FORMATIONS_DATA.filter((item) => {
      // Filtro de Categoria
      if (selectedCategory === 'certifications') {
        if (!item.examCode && item.category !== 'certifications') return false;
      } else if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Filtro de Nível
      if (selectedLevel !== 'all' && item.level !== selectedLevel) {
        return false;
      }

      // Filtro de Busca
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = item.title.toLowerCase().includes(query);
        const inSubtitle = item.subtitle.toLowerCase().includes(query);
        const inDesc = item.description.toLowerCase().includes(query);
        const inExam = item.examCode?.toLowerCase().includes(query);
        const inTech = item.technologies.some((t) => t.toLowerCase().includes(query));
        const inProvider = item.provider.toLowerCase().includes(query);

        if (!inTitle && !inSubtitle && !inDesc && !inExam && !inTech && !inProvider) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedLevel, searchQuery]);

  // Contagem por categoria
  const certificationsCount = useMemo(() => {
    return FORMATIONS_DATA.filter((f) => !!f.examCode || f.category === 'certifications').length;
  }, []);

  const openModal = (formation: Formation) => {
    setActiveModalFormation(formation);
    setModalActiveTab('syllabus');
  };

  const closeModal = () => {
    setActiveModalFormation(null);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300 no-ads">
      {/* ============================================================== */}
      {/* HEADER DA VITRINE */}
      {/* ============================================================== */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-gradient-to-br from-amber-500/10 via-blue-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <GraduationCap size={15} />
            <span>Educação Pragmática & Certificações Globais</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Vitrine de Formações & Preparatórios
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            Roteiros de especialização técnica estruturados para elevar sua carreira de desenvolvedor. 
            Domine as tecnologias abordadas no <strong>CodeCompare</strong> e prepare-se com rigor para as principais 
            certificações oficiais de <strong>AWS</strong>, <strong>Microsoft Azure</strong> e <strong>DevOps</strong>.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <Award size={14} className="text-amber-400" />
              <span>{certificationsCount} Exames Oficiais Mapeados</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span>100% Alinhado às Práticas de Mercado</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <Sparkles size={14} className="text-cyan-400" />
              <span>Planos de Estudo Semanais Inclusos</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* CONTROLES DE BUSCA E FILTROS */}
      {/* ============================================================== */}
      <div className="space-y-4">
        {/* Barra de Busca + Filtro de Nível */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={17} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por tecnologia (.NET, AWS, Azure, Python, React, SAA-C03, AZ-204)..."
              className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 focus:border-cyan-500 text-sm text-white placeholder-slate-500 outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-2xl">
            <Filter size={15} className="text-slate-400" />
            <span className="text-xs font-mono text-slate-400">Nível:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-transparent text-xs text-white font-medium outline-none cursor-pointer pr-2"
            >
              <option value="all" className="bg-slate-900">Todos os Níveis</option>
              <option value="Iniciante" className="bg-slate-900">Iniciante</option>
              <option value="Intermediário" className="bg-slate-900">Intermediário</option>
              <option value="Avançado" className="bg-slate-900">Avançado</option>
              <option value="Especialista" className="bg-slate-900">Especialista</option>
            </select>
          </div>
        </div>

        {/* Abas de Categorias */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            <GraduationCap size={14} />
            <span>Todas as Formações ({FORMATIONS_DATA.length})</span>
          </button>

          <button
            onClick={() => setSelectedCategory('certifications')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              selectedCategory === 'certifications'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            <Award size={14} />
            <span>Certificações Oficiais (AWS / Azure) ({certificationsCount})</span>
          </button>

          <button
            onClick={() => setSelectedCategory('backend')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              selectedCategory === 'backend'
                ? 'bg-purple-500 text-slate-950 shadow-md shadow-purple-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            <Server size={14} />
            <span>Backend & Microsserviços</span>
          </button>

          <button
            onClick={() => setSelectedCategory('frontend')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              selectedCategory === 'frontend'
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            <Code2 size={14} />
            <span>Frontend Moderno</span>
          </button>

          <button
            onClick={() => setSelectedCategory('cloud')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              selectedCategory === 'cloud'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            <Cloud size={14} />
            <span>Cloud & DevOps</span>
          </button>

          <button
            onClick={() => setSelectedCategory('architecture')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              selectedCategory === 'architecture'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
            }`}
          >
            <Database size={14} />
            <span>Dados & Arquitetura</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* GRID DE CARDS DAS FORMAÇÕES */}
      {/* ============================================================== */}
      {filteredFormations.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/50 space-y-3">
          <p className="text-slate-400 text-sm">
            Nenhuma formação encontrada para o termo <strong>"{searchQuery}"</strong>.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedLevel('all');
            }}
            className="text-xs font-bold text-cyan-400 hover:underline cursor-pointer"
          >
            Limpar todos os filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFormations.map((formation) => {
            const isCert = !!formation.examCode;

            return (
              <div
                key={formation.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-6 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/5"
              >
                <div className="space-y-4">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border ${
                          formation.provider === 'AWS'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : formation.provider === 'Microsoft Azure'
                            ? 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                            : formation.provider === 'HashiCorp'
                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}
                      >
                        {formation.provider}
                      </span>

                      {formation.examCode && (
                        <span className="text-[10px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Award size={11} />
                          <span>{formation.examCode}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                      <span className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/50">
                        {formation.level}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug">
                      {formation.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {formation.subtitle}
                    </p>
                  </div>

                  {/* Metadados: Duração e Módulos */}
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400 py-1 border-y border-slate-800/60">
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} className="text-cyan-400" />
                      <span>{formation.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Layers size={13} className="text-purple-400" />
                      <span>{formation.modules.length} Módulos</span>
                    </div>
                  </div>

                  {/* Tecnologias Abordadas */}
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block mb-1.5">
                      Stack / Tecnologias Envolvidas:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {formation.technologies.slice(0, 6).map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                      {formation.technologies.length > 6 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800/40 text-slate-400">
                          +{formation.technologies.length - 6}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Competências em Destaque */}
                  <div className="space-y-1.5 text-xs text-slate-300">
                    {formation.skillsLearned.slice(0, 2).map((skill, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="pt-6 space-y-2.5">
                  <button
                    onClick={() => openModal(formation)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-cyan-500/10 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 border border-cyan-500/30 hover:border-cyan-500 transition-all cursor-pointer flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Ver Grade Curricular & Roteiro</span>
                    <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  {/* Links Cruzados para Conteúdos já existentes no site */}
                  <div className="flex items-center gap-2">
                    {formation.relatedArticleId && onNavigateToArticle && (
                      <button
                        onClick={() => onNavigateToArticle(formation.relatedArticleId!)}
                        className="flex-1 py-1.5 px-3 rounded-lg text-[11px] font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                        title="Ler artigo técnico aprofundado sobre este tema"
                      >
                        <BookOpen size={12} className="text-purple-400" />
                        <span>Artigo Relacionado</span>
                      </button>
                    )}

                    {formation.relatedPageId && onNavigateToPage && (
                      <button
                        onClick={() => onNavigateToPage(formation.relatedPageId!, formation.relatedTab)}
                        className="flex-1 py-1.5 px-3 rounded-lg text-[11px] font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                        title="Ver comparativo prático no portal"
                      >
                        <ArrowRight size={12} className="text-cyan-400" />
                        <span>Testar no Comparador</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL DETALHADO DA FORMAÇÃO / CERTIFICAÇÃO */}
      {/* ============================================================== */}
      {activeModalFormation && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 bg-slate-950/80 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      {activeModalFormation.provider}
                    </span>
                    {activeModalFormation.examCode && (
                      <span className="text-[10px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded flex items-center gap-1">
                        <Award size={11} />
                        <span>Exame Oficial {activeModalFormation.examCode}</span>
                      </span>
                    )}
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {activeModalFormation.level}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {activeModalFormation.duration}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {activeModalFormation.title}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {activeModalFormation.subtitle}
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Abas Internas do Modal */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60 overflow-x-auto">
                <button
                  onClick={() => setModalActiveTab('syllabus')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                    modalActiveTab === 'syllabus'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Layers size={13} />
                  <span>Grade Curricular ({activeModalFormation.modules.length} Módulos)</span>
                </button>

                {activeModalFormation.examDomains && activeModalFormation.examDomains.length > 0 && (
                  <button
                    onClick={() => setModalActiveTab('exam')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                      modalActiveTab === 'exam'
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Award size={13} />
                    <span>Domínios & Pesos da Prova</span>
                  </button>
                )}

                {activeModalFormation.weeklyPlan && activeModalFormation.weeklyPlan.length > 0 && (
                  <button
                    onClick={() => setModalActiveTab('roadmap')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                      modalActiveTab === 'roadmap'
                        ? 'bg-purple-500 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Calendar size={13} />
                    <span>Roteiro Semana a Semana</span>
                  </button>
                )}
              </div>
            </div>

            {/* Modal Body com Scroll */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm leading-relaxed text-slate-300">
              {/* VISÃO GERAL: PRÉ-REQUISITOS E PÚBLICO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs">
                <div>
                  <strong className="text-white block mb-1">Público-Alvo:</strong>
                  <p className="text-slate-400">{activeModalFormation.targetAudience}</p>
                </div>
                <div>
                  <strong className="text-white block mb-1">Pré-Requisitos Sugeridos:</strong>
                  <ul className="text-slate-400 space-y-1 list-disc pl-4">
                    {activeModalFormation.prerequisites.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ABA 1: GRADE CURRICULAR */}
              {modalActiveTab === 'syllabus' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <Layers size={15} className="text-cyan-400" />
                    <span>Módulos de Formação Prática</span>
                  </h4>

                  <div className="space-y-4">
                    {activeModalFormation.modules.map((mod, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-4 rounded-2xl border border-slate-800 bg-slate-950/40 space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2 border-b border-slate-800/60 pb-2">
                          <h5 className="font-bold text-white text-sm">
                            {mod.title}
                          </h5>
                          {mod.hours && (
                            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded">
                              {mod.hours}
                            </span>
                          )}
                        </div>

                        <ul className="space-y-1.5 text-xs text-slate-300 pl-1">
                          {mod.topics.map((topic, tIdx) => (
                            <li key={tIdx} className="flex items-start gap-2">
                              <span className="text-cyan-400 mt-1">•</span>
                              <span>{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ABA 2: DOMÍNIOS DO EXAME (CERTIFICAÇÃO) */}
              {modalActiveTab === 'exam' && activeModalFormation.examDomains && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2.5">
                    <Award size={18} className="text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong>Blueprint Oficial do Exame ({activeModalFormation.examCode}):</strong> Os tópicos da prova são distribuídos de acordo com os pesos percentuais abaixo. Foque seu tempo de estudo de forma proporcional aos domínios com maior peso.
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {activeModalFormation.examDomains.map((dom, dIdx) => (
                      <div
                        key={dIdx}
                        className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <h5 className="font-bold text-white text-sm">{dom.domain}</h5>
                          <p className="text-xs text-slate-400">{dom.description}</p>
                        </div>
                        <div className="shrink-0 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold text-sm text-center">
                          {dom.weight}
                        </div>
                      </div>
                    ))}
                  </div>

                  {activeModalFormation.officialGuideUrl && (
                    <div className="pt-2 text-center">
                      <a
                        href={activeModalFormation.officialGuideUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 underline"
                      >
                        <span>Acessar Guia Oficial de Preparação e Agendamento do Exame</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* ABA 3: ROTEIRO SEMANA A SEMANA */}
              {modalActiveTab === 'roadmap' && activeModalFormation.weeklyPlan && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <Calendar size={15} className="text-purple-400" />
                    <span>Cronograma Sugerido de Estudos</span>
                  </h4>

                  <div className="space-y-3">
                    {activeModalFormation.weeklyPlan.map((step, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 flex flex-col sm:flex-row items-start gap-4"
                      >
                        <div className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-400 font-mono font-bold text-xs shrink-0 border border-purple-500/20">
                          {step.week}
                        </div>
                        <div className="space-y-1 flex-1">
                          <strong className="text-white text-xs block">{step.focus}</strong>
                          <p className="text-xs text-slate-400">{step.deliverables}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-slate-500">
                Material com curadoria autoral de engenharia do portal CodeCompare.
              </div>
              <button
                onClick={closeModal}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer"
              >
                Fechar Detalhes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
