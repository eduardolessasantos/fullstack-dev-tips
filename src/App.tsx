import React, { useState, useEffect, useMemo } from 'react';
import {
  Code2,
  Server,
  Database,
  Layout,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
  Search,
  Zap,
  ArrowUpRight,
  Braces,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  Columns,
  SquareCheck,
  BookOpen,
  Filter,
  ExternalLink,
  Flame,
  Clock
} from 'lucide-react';
import { PageId, FrontendFramework, BackendLanguage, DatabaseTab } from './types.ts';
import { FRONTEND_COMPARISONS } from './data/frontendData.ts';
import { BACKEND_COMPARISONS } from './data/backendData.ts';
import { NOSQL_DATA, RELATIONAL_OPTIMIZATIONS, RECENT_ARTICLES, RecentArticle } from './data/databaseData.ts';
import { CodeBlock } from './components/CodeBlock.tsx';
import { AdUnit } from './components/AdUnit.tsx';
import { LGPDBanner } from './components/LGPDBanner.tsx';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal.tsx';

export default function App() {
  // Theme state with local persistence
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('codecompare_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  // Navigation state
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeFrontendTab, setActiveFrontendTab] = useState<FrontendFramework>('react');
  const [activeBackendLang, setActiveBackendLang] = useState<BackendLanguage>('dotnet');
  const [activeDbTab, setActiveDbTab] = useState<DatabaseTab>('nosql');
  const [splitViewMode, setSplitViewMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Toggle and persist theme
  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('codecompare_theme', next);
  };

  const navigateTo = (page: PageId, subTab?: string) => {
    setCurrentPage(page);
    if (page === 'frontend' && subTab) {
      setActiveFrontendTab(subTab as FrontendFramework);
    } else if (page === 'backend' && subTab) {
      setActiveBackendLang(subTab as BackendLanguage);
    } else if (page === 'database' && subTab) {
      setActiveDbTab(subTab as DatabaseTab);
    }
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered search results
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const results: { title: string; category: string; page: PageId; targetTab?: string }[] = [];

    // Search in articles
    RECENT_ARTICLES.forEach(a => {
      if (a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q)) {
        results.push({ title: a.title, category: `Artigo • ${a.tag}`, page: a.category, targetTab: a.targetTab });
      }
    });

    // Search in Frontend topics
    FRONTEND_COMPARISONS.forEach(f => {
      if (f.title.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q)) {
        results.push({ title: f.title, category: 'Frontend', page: 'frontend' });
      }
    });

    // Search in Backend stacks
    Object.values(BACKEND_COMPARISONS).forEach(b => {
      if (b.name.toLowerCase().includes(q) || b.tagline.toLowerCase().includes(q)) {
        results.push({ title: `${b.name}: CRUD de Usuários`, category: 'Backend', page: 'backend', targetTab: b.id });
      }
    });

    // Search in NoSQL
    NOSQL_DATA.forEach(n => {
      if (n.name.toLowerCase().includes(q) || n.whenToUse.toLowerCase().includes(q)) {
        results.push({ title: `${n.name} (NoSQL)`, category: 'Banco de Dados', page: 'database', targetTab: 'nosql' });
      }
    });

    // Search in Relational
    RELATIONAL_OPTIMIZATIONS.forEach(r => {
      if (r.title.toLowerCase().includes(q) || r.problem.toLowerCase().includes(q) || r.solution.toLowerCase().includes(q)) {
        results.push({ title: r.title, category: 'Otimização SQL', page: 'database', targetTab: 'relational' });
      }
    });

    return results.slice(0, 6);
  }, [searchQuery]);

  const currentBackend = BACKEND_COMPARISONS[activeBackendLang];

  return (
    <div className={`${theme} min-h-screen transition-colors duration-200`}>
      <div
        className={`flex flex-col lg:flex-row min-h-screen ${
          theme === 'dark'
            ? 'bg-slate-950 text-slate-100'
            : 'bg-slate-100/70 text-slate-900'
        }`}
      >
        {/* --- SIDEBAR FIXA ESQUERDA (DESKTOP) E DRAWER (MOBILE) --- */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 w-72 border-r transition-transform duration-300 transform flex flex-col
            ${
              theme === 'dark'
                ? 'bg-slate-950/95 border-slate-800/80 backdrop-blur-xl'
                : 'bg-white border-slate-200/90 shadow-lg'
            }
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          {/* Logo Brand */}
          <div className="flex items-center justify-between p-5 border-b border-inherit">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 p-2.5 rounded-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                <Braces className="text-white" size={22} />
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent group-hover:text-cyan-400 transition-colors">
                  CodeCompare
                </span>
                <span className="block text-[10px] uppercase font-mono tracking-widest text-cyan-400 font-semibold">
                  Dev Tech Blog
                </span>
              </div>
            </button>

            <button
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-6 flex-1 overflow-y-auto text-sm">
            {/* Home Link */}
            <div>
              <button
                id="nav-home-btn"
                onClick={() => navigateTo('home')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                  currentPage === 'home'
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-400 font-bold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Layout size={18} />
                <span>Início / Destaques</span>
              </button>
            </div>

            {/* Group 1: Frontend (</>) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-3 py-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Code2 size={14} className="text-cyan-400" />
                  Frontend
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono">
                  3 Stacks
                </span>
              </div>
              <div className="space-y-0.5">
                {[
                  { id: 'angular', name: 'Angular (Signals)' },
                  { id: 'vue', name: 'Vue.js (Composition)' },
                  { id: 'react', name: 'React (Hooks & Zustand)' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => navigateTo('frontend', item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg transition-all text-xs cursor-pointer ${
                      currentPage === 'frontend' && activeFrontendTab === item.id
                        ? 'bg-cyan-500/15 text-cyan-300 font-semibold border-l-2 border-cyan-400'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronRight size={14} className="opacity-40" />
                  </button>
                ))}
              </div>
            </div>

            {/* Group 2: Backend (server) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-3 py-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Server size={14} className="text-purple-400" />
                  Backend
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 font-mono">
                  4 Stacks
                </span>
              </div>
              <div className="space-y-0.5">
                {[
                  { id: 'dotnet', name: '.NET 8 (C#)' },
                  { id: 'java', name: 'Java (Spring Boot)' },
                  { id: 'python', name: 'Python (FastAPI)' },
                  { id: 'go', name: 'Go (Fiber / GORM)' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => navigateTo('backend', item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg transition-all text-xs cursor-pointer ${
                      currentPage === 'backend' && activeBackendLang === item.id
                        ? 'bg-purple-500/15 text-purple-300 font-semibold border-l-2 border-purple-400'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronRight size={14} className="opacity-40" />
                  </button>
                ))}
              </div>
            </div>

            {/* Group 3: Banco de Dados (database) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-3 py-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Database size={14} className="text-emerald-400" />
                  Banco de Dados
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                  Infra
                </span>
              </div>
              <div className="space-y-0.5">
                <button
                  onClick={() => navigateTo('database', 'nosql')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg transition-all text-xs cursor-pointer ${
                    currentPage === 'database' && activeDbTab === 'nosql'
                      ? 'bg-emerald-500/15 text-emerald-300 font-semibold border-l-2 border-emerald-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                  }`}
                >
                  <span>NoSQL Utilities</span>
                  <ChevronRight size={14} className="opacity-40" />
                </button>
                <button
                  onClick={() => navigateTo('database', 'relational')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg transition-all text-xs cursor-pointer ${
                    currentPage === 'database' && activeDbTab === 'relational'
                      ? 'bg-emerald-500/15 text-emerald-300 font-semibold border-l-2 border-emerald-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                  }`}
                >
                  <span>Otimização Relacional</span>
                  <ChevronRight size={14} className="opacity-40" />
                </button>
              </div>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-inherit bg-slate-950/40 space-y-2 text-xs">
            <button
              onClick={() => setShowPrivacyModal(true)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-900/60 transition-colors cursor-pointer"
            >
              <ShieldCheck size={16} className="text-cyan-400" />
              <span>Privacidade & LGPD</span>
            </button>
            <div className="px-3 pt-2 text-[10px] text-slate-400 flex items-center justify-between">
              <span>CodeCompare v2.4</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Online
              </span>
            </div>
          </div>
        </aside>

        {/* --- MAIN AREA --- */}
        <main className="flex-1 lg:ml-72 min-w-0 flex flex-col">
          {/* HEADER STICKY COM BUSCA & TEMA */}
          <header
            className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors ${
              theme === 'dark'
                ? 'bg-slate-950/85 border-slate-800/80'
                : 'bg-white/85 border-slate-200/90 shadow-sm'
            }`}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
              {/* Mobile Drawer Trigger */}
              <button
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                onClick={() => setSidebarOpen(true)}
                aria-label="Abrir menu de navegação"
              >
                <Menu size={22} />
              </button>

              {/* Real-time Search Input */}
              <div className="flex-1 max-w-xl relative">
                <div
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full border transition-all ${
                    theme === 'dark'
                      ? 'bg-slate-900/80 border-slate-800 focus-within:border-cyan-500/60 focus-within:ring-2 focus-within:ring-cyan-500/20'
                      : 'bg-slate-100 border-slate-300 focus-within:border-cyan-600 focus-within:ring-2 focus-within:ring-cyan-500/20'
                  }`}
                >
                  <Search size={16} className="text-slate-500 shrink-0" />
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Buscar stack, padrão, CRUD ou query..."
                    className="bg-transparent border-none outline-none text-xs sm:text-sm w-full placeholder:text-slate-500"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-slate-500 hover:text-slate-300 p-0.5 cursor-pointer"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Dropdown de Resultados da Busca */}
                {searchResults.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800 text-[11px] font-mono text-cyan-400 flex items-center justify-between">
                      <span>Resultados para "{searchQuery}"</span>
                      <span>{searchResults.length} encontrados</span>
                    </div>
                    <div className="divide-y divide-slate-800/60 max-h-80 overflow-y-auto">
                      {searchResults.map((res, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            navigateTo(res.page, res.targetTab);
                            setSearchQuery('');
                          }}
                          className="w-full text-left p-3 hover:bg-slate-800/80 transition-colors flex items-center justify-between group cursor-pointer"
                        >
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 group-hover:text-cyan-400">
                              {res.category}
                            </span>
                            <h4 className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white">
                              {res.title}
                            </h4>
                          </div>
                          <ChevronRight size={14} className="text-slate-600 group-hover:text-cyan-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions: Theme Toggle + LGPD Policy */}
              <div className="flex items-center gap-2">
                <button
                  id="theme-toggle-btn"
                  onClick={toggleTheme}
                  className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-amber-400'
                      : 'bg-white border-slate-300 hover:bg-slate-100 text-slate-700 shadow-sm'
                  }`}
                  title={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </div>
          </header>

          {/* CORPO PRINCIPAL COM CONTEÚDO */}
          <div className="max-w-6xl w-full mx-auto p-4 sm:p-8 flex-1">
            {/* ============================================================== */}
            {/* PÁGINA 1: HOME (Hero + 6 Cards de Artigos Recentes) */}
            {/* ============================================================== */}
            {currentPage === 'home' && (
              <section className="space-y-10 animate-in fade-in duration-300">
                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 shadow-2xl">
                  {/* Decorative background glow */}
                  <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 max-w-3xl space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                      <Sparkles size={13} />
                      <span>Plataforma Educativa para Desenvolvedores</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
                      Aprenda por{' '}
                      <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
                        comparação
                      </span>
                      , não por decoreba.
                    </h1>

                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                      Domine as diferenças reais de sintaxe, ciclo de vida e performance. Escolha um objetivo de desenvolvimento e veja como implementá-lo no <strong>Frontend</strong>, <strong>Backend</strong> e <strong>Banco de Dados</strong> lado a lado.
                    </p>

                    <div className="pt-3 flex flex-wrap gap-3">
                      <button
                        onClick={() => navigateTo('frontend')}
                        className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Code2 size={16} />
                        <span>Comparar Frontend</span>
                      </button>
                      <button
                        onClick={() => navigateTo('backend')}
                        className="px-6 py-3 rounded-xl font-bold text-sm bg-slate-800/90 hover:bg-slate-800 text-white border border-slate-700 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Server size={16} />
                        <span>Ver CRUD Backend</span>
                      </button>
                      <button
                        onClick={() => navigateTo('database')}
                        className="px-6 py-3 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800/80 text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Database size={16} />
                        <span>Otimizações SQL</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* AdUnit Horizontal após o Hero */}
                <AdUnit slot="9876543210" format="horizontal" label="Espaço Patrocinado • Google AdSense" />

                {/* Section Header: 6 Artigos mais recentes */}
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Flame size={20} className="text-amber-400" />
                        Artigos Comparativos Recentes
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400">
                        Análises aprofundadas com código real para resolver problemas práticos de arquitetura.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full w-fit">
                      6 Artigos Publicados
                    </span>
                  </div>

                  {/* Grid com os 6 cards de artigos */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {RECENT_ARTICLES.map((article) => (
                      <div
                        key={article.id}
                        onClick={() => navigateTo(article.category, article.targetTab)}
                        className={`group p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          theme === 'dark'
                            ? 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10'
                            : 'bg-white border-slate-200 hover:border-cyan-500/50 shadow-sm hover:shadow-md'
                        }`}
                      >
                        <div>
                          {/* Card Header Tag & Date */}
                          <div className="flex items-center justify-between text-xs mb-3">
                            <span
                              className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px] ${
                                article.category === 'frontend'
                                  ? 'bg-cyan-500/10 text-cyan-400'
                                  : article.category === 'backend'
                                  ? 'bg-purple-500/10 text-purple-400'
                                  : 'bg-emerald-500/10 text-emerald-400'
                              }`}
                            >
                              {article.tag}
                            </span>
                            <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                              <Clock size={11} />
                              {article.readingTime}
                            </span>
                          </div>

                          <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-cyan-400 transition-colors leading-snug mb-2">
                            {article.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                            {article.summary}
                          </p>
                        </div>

                        <div className="pt-5 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                          <span>Ver comparação completa</span>
                          <ArrowUpRight size={15} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* ============================================================== */}
            {/* PÁGINA 2: FRONTEND ("Mesma função, 3 frameworks") */}
            {/* ============================================================== */}
            {currentPage === 'frontend' && (
              <section className="space-y-8 animate-in slide-in-from-bottom-2 duration-300">
                {/* Page Title & Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1">
                      <Code2 size={16} />
                      Comparativo Frontend
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                      Mesma função, 3 frameworks
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">
                      Observe como a mesma necessidade é resolvida no <strong>Angular</strong>, <strong>Vue.js</strong> e <strong>React</strong>.
                    </p>
                  </div>

                  {/* Mode & Tab Switchers */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Botão de Modo Lado a Lado */}
                    <button
                      onClick={() => setSplitViewMode(!splitViewMode)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                        splitViewMode
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                      title="Alternar entre ver 1 aba por vez ou todos lado a lado"
                    >
                      <Columns size={14} />
                      <span>{splitViewMode ? 'Modo Abas Individuais' : 'Modo Lado a Lado'}</span>
                    </button>

                    {/* Abas dos 3 Frameworks (quando em modo de aba individual) */}
                    {!splitViewMode && (
                      <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-800">
                        {[
                          { id: 'angular', label: 'Angular' },
                          { id: 'vue', label: 'Vue.js' },
                          { id: 'react', label: 'React' }
                        ].map(tab => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveFrontendTab(tab.id as FrontendFramework)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              activeFrontendTab === tab.id
                                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Lista com os 6 Tópicos Obrigatórios */}
                <div className="space-y-12">
                  {FRONTEND_COMPARISONS.map((item, idx) => (
                    <div
                      key={item.id}
                      className={`p-6 sm:p-8 rounded-2xl border transition-all ${
                        theme === 'dark' ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                      }`}
                    >
                      {/* Topic Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded">
                            {item.category}
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                            {item.title}
                          </h3>
                        </div>
                        <span className="text-xs font-mono text-slate-500">
                          Tópico #{idx + 1} de 6
                        </span>
                      </div>

                      <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                        {item.desc}
                      </p>

                      {/* Modo Lado a Lado (todas as 3 colunas) */}
                      {splitViewMode ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                          {(['angular', 'vue', 'react'] as FrontendFramework[]).map(fw => {
                            const data = item.codes[fw];
                            const label = fw === 'angular' ? 'Angular' : fw === 'vue' ? 'Vue.js' : 'React';
                            return (
                              <div key={fw} className="space-y-2">
                                <div className="flex items-center justify-between px-1">
                                  <span className="text-xs font-bold font-mono uppercase text-cyan-400">
                                    {label}
                                  </span>
                                </div>
                                <CodeBlock
                                  code={data.code}
                                  language={data.lang}
                                  filename={`${fw === 'angular' ? 'component.ts' : fw === 'vue' ? 'Component.vue' : 'Component.tsx'}`}
                                  theme={theme}
                                />
                                <p className="text-[11px] text-slate-500 italic px-1">
                                  💡 {data.notes}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        /* Modo Abas (1 framework selecionado com foco e explicação) */
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-300">
                              Implementação em{' '}
                              <span className="text-cyan-400 capitalize">
                                {activeFrontendTab === 'vue' ? 'Vue.js 3' : activeFrontendTab}
                              </span>
                            </span>
                          </div>

                          <CodeBlock
                            code={item.codes[activeFrontendTab].code}
                            language={item.codes[activeFrontendTab].lang}
                            filename={`${
                              activeFrontendTab === 'angular'
                                ? 'component.ts'
                                : activeFrontendTab === 'vue'
                                ? 'Component.vue'
                                : 'Component.tsx'
                            }`}
                            theme={theme}
                          />

                          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                            <Sparkles size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-white font-medium">Nota de Implementação:</strong>{' '}
                              {item.codes[activeFrontendTab].notes}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <AdUnit slot="1122334455" format="auto" label="Conteúdo Patrocinado • CodeCompare" />
              </section>
            )}

            {/* ============================================================== */}
            {/* PÁGINA 3: BACKEND ("Um CRUD, 4 linguagens") */}
            {/* ============================================================== */}
            {currentPage === 'backend' && (
              <section className="space-y-8 animate-in slide-in-from-bottom-2 duration-300">
                <div className="border-b border-slate-800/80 pb-6">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400 mb-1">
                    <Server size={16} />
                    Backend API Stacks
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                    Um CRUD, 4 linguagens
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    Contexto da API: <strong>Gerenciamento de Usuários (/api/users)</strong> com Model tipado, Controller/Router e conexão real ao banco de dados.
                  </p>
                </div>

                {/* Abas das 4 Linguagens */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(Object.keys(BACKEND_COMPARISONS) as BackendLanguage[]).map(langKey => {
                    const stack = BACKEND_COMPARISONS[langKey];
                    const isActive = activeBackendLang === langKey;
                    return (
                      <button
                        key={langKey}
                        onClick={() => setActiveBackendLang(langKey)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          isActive
                            ? 'bg-purple-500/15 border-purple-500/60 text-white shadow-lg shadow-purple-500/10'
                            : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        <span className="text-[10px] font-mono uppercase font-bold tracking-wider opacity-60 block mb-1">
                          Stack #{langKey}
                        </span>
                        <div className="font-bold text-sm sm:text-base flex items-center justify-between">
                          <span>{stack.name}</span>
                          {isActive && <Zap size={14} className="text-purple-400" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Conteúdo Detalhado da Linguagem Selecionada */}
                <div className="space-y-8">
                  <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs sm:text-sm text-purple-200 flex items-center justify-between">
                    <span>
                      📌 <strong>Destaque da Stack:</strong> {currentBackend.tagline}
                    </span>
                  </div>

                  {/* 1. Estrutura do Model */}
                  <div
                    className={`p-6 sm:p-8 rounded-2xl border ${
                      theme === 'dark' ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="mb-4">
                      <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider bg-purple-500/10 px-2 py-0.5 rounded">
                        Passo 1: Entidade de Banco de Dados
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1">
                        Estrutura do Model ({currentBackend.model.filename})
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        {currentBackend.model.explanation}
                      </p>
                    </div>
                    <CodeBlock
                      code={currentBackend.model.code}
                      language={currentBackend.model.lang}
                      filename={currentBackend.model.filename}
                      theme={theme}
                    />
                  </div>

                  {/* 2. Estrutura do Controller */}
                  <div
                    className={`p-6 sm:p-8 rounded-2xl border ${
                      theme === 'dark' ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="mb-4">
                      <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-2 py-0.5 rounded">
                        Passo 2: Injeção de Dependência & Inserção
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1">
                        Estrutura do Controller ({currentBackend.controller.filename})
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        {currentBackend.controller.explanation}
                      </p>
                    </div>
                    <CodeBlock
                      code={currentBackend.controller.code}
                      language={currentBackend.controller.lang}
                      filename={currentBackend.controller.filename}
                      theme={theme}
                    />
                  </div>

                  {/* 3. Rota GET /api/users com conexão ao banco */}
                  <div
                    className={`p-6 sm:p-8 rounded-2xl border ${
                      theme === 'dark' ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="mb-4">
                      <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded">
                        Passo 3: Consulta Paginada ao Banco
                      </span>
                      <h3 className="text-xl font-bold text-white mt-1">
                        Rota {currentBackend.route.endpoint} com Conexão Persistente
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1">
                        {currentBackend.route.explanation}
                      </p>
                    </div>
                    <CodeBlock
                      code={currentBackend.route.code}
                      language={currentBackend.route.lang}
                      filename={currentBackend.route.endpoint}
                      theme={theme}
                    />
                  </div>
                </div>

                <AdUnit slot="4455667788" format="auto" label="Apoie o Projeto • Google AdSense" />
              </section>
            )}

            {/* ============================================================== */}
            {/* PÁGINA 4: BANCO DE DADOS (NoSQL Utilities & Otimização SQL) */}
            {/* ============================================================== */}
            {currentPage === 'database' && (
              <section className="space-y-8 animate-in slide-in-from-bottom-2 duration-300">
                <div className="border-b border-slate-800/80 pb-6">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-1">
                    <Database size={16} />
                    Engenharia de Dados
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                    Bancos de Dados & Performance
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    Da escolha inteligente de NoSQL ao refinamento cirúrgico de consultas em bancos relacionais.
                  </p>
                </div>

                {/* Abas: NoSQL vs Relacional */}
                <div className="flex gap-4 border-b border-slate-800">
                  <button
                    onClick={() => setActiveDbTab('nosql')}
                    className={`pb-4 px-3 text-sm font-bold transition-all relative cursor-pointer ${
                      activeDbTab === 'nosql' ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    NoSQL Utilities (Tabela Comparativa)
                    {activeDbTab === 'nosql' && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveDbTab('relational')}
                    className={`pb-4 px-3 text-sm font-bold transition-all relative cursor-pointer ${
                      activeDbTab === 'relational' ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Otimização Relacional (6 Práticas)
                    {activeDbTab === 'relational' && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400" />
                    )}
                  </button>
                </div>

                {/* ABA 1: NoSQL Utilities */}
                {activeDbTab === 'nosql' && (
                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                      <span>
                        💡 <strong>Regra Pragmática:</strong> NoSQL brilha para escalabilidade horizontal e acesso por chaves bem definidas, mas nunca abandone ACID sem necessidade real.
                      </span>
                    </div>

                    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                            <th className="p-4">Tecnologia</th>
                            <th className="p-4">Quando Usar</th>
                            <th className="p-4">Quando Evitar</th>
                            <th className="p-4">Modelo de Dados</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-xs">
                          {NOSQL_DATA.map((item, idx) => (
                            <React.Fragment key={idx}>
                              <tr className="hover:bg-slate-800/40 transition-colors">
                                <td className="p-4 font-bold text-emerald-400 text-sm align-top">
                                  {item.name}
                                  <span className="block text-[10px] font-mono text-slate-500 font-normal">
                                    {item.category}
                                  </span>
                                </td>
                                <td className="p-4 text-slate-300 leading-relaxed align-top">
                                  {item.whenToUse}
                                </td>
                                <td className="p-4 text-rose-300/90 leading-relaxed align-top">
                                  {item.whenNotToUse}
                                </td>
                                <td className="p-4 text-slate-400 leading-relaxed align-top">
                                  {item.dataModel}
                                </td>
                              </tr>
                              <tr className="bg-slate-950/40">
                                <td colSpan={4} className="p-4 pt-1 pb-5">
                                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                                    <span>Exemplo Real de Query • {item.name}:</span>
                                  </div>
                                  <CodeBlock
                                    code={item.exampleQuery}
                                    language={item.queryLang}
                                    theme={theme}
                                    showLineNumbers={false}
                                  />
                                </td>
                              </tr>
                            </React.Fragment>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ABA 2: Otimização Relacional */}
                {activeDbTab === 'relational' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {RELATIONAL_OPTIMIZATIONS.map(opt => (
                        <div
                          key={opt.id}
                          className={`p-6 rounded-2xl border flex flex-col justify-between ${
                            theme === 'dark'
                              ? 'bg-slate-900/70 border-slate-800 hover:border-emerald-500/40'
                              : 'bg-white border-slate-200 shadow-sm'
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                                {opt.badge}
                              </span>
                              <span className="text-[11px] font-bold text-cyan-400">
                                {opt.impact}
                              </span>
                            </div>

                            <h3 className="text-lg font-bold text-white">
                              {opt.title}
                            </h3>

                            <p className="text-xs text-slate-400 leading-relaxed">
                              {opt.summary}
                            </p>

                            {/* Detalhe do Problema */}
                            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300">
                              <strong>O Problema:</strong> {opt.problem}
                            </div>

                            {/* Detalhe da Solução */}
                            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                              <strong>A Solução:</strong> {opt.solution}
                            </div>

                            {/* Bloco de Código SQL Antes vs Depois */}
                            <div className="pt-2 space-y-2">
                              <span className="text-[10px] font-mono text-slate-500 uppercase">
                                Comparativo SQL (Antes vs Otimizado):
                              </span>
                              <CodeBlock
                                code={`${opt.sqlBefore}\n\n${opt.sqlAfter}`}
                                language="sql"
                                filename="explain_optimization.sql"
                                theme={theme}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <AdUnit slot="7788990011" format="rectangle" label="AdSense • Engenharia de Dados" />
              </section>
            )}
          </div>

          {/* FOOTER DO BLOG */}
          <footer
            className={`mt-16 border-t py-12 px-6 sm:px-12 ${
              theme === 'dark'
                ? 'border-slate-900 bg-slate-950 text-slate-500'
                : 'border-slate-200 bg-white text-slate-400'
            }`}
          >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Braces size={18} />
                </div>
                <div>
                  <span className="font-bold text-slate-200 text-sm block">
                    CodeCompare • Blog Técnico Full-Stack
                  </span>
                  <span className="text-xs text-slate-500">
                    Aprenda por comparação, não por decoreba.
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs">
                <button
                  onClick={() => setShowPrivacyModal(true)}
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Política de Privacidade (LGPD)
                </button>
              </div>
            </div>
          </footer>
        </main>

        {/* OVERLAY MOBILE PARA SIDEBAR */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* BANNER LGPD & MODAL DE POLÍTICA */}
        <LGPDBanner />
        <PrivacyPolicyModal
          isOpen={showPrivacyModal}
          onClose={() => setShowPrivacyModal(false)}
        />
      </div>
    </div>
  );
}
