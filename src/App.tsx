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
  Clock,
  Compass,
  FileText,
  Mail,
  Scale,
  ArrowRight,
  CheckCircle2,
  Calculator,
  Cloud,
  GraduationCap,
  Award,
  Briefcase,
  Gamepad2
} from 'lucide-react';
import { PageId, FrontendFramework, BackendLanguage, DatabaseTab } from './types.ts';
import { CodeBlock } from './components/CodeBlock.tsx';
import { LGPDBanner } from './components/LGPDBanner.tsx';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal.tsx';
import { ArticleReader } from './components/ArticleReader.tsx';
import { AboutView } from './components/AboutView.tsx';
import { EditorialView } from './components/EditorialView.tsx';
import { ContactView } from './components/ContactView.tsx';
import { TermsView } from './components/TermsView.tsx';
import { DecisionMatrixView } from './components/DecisionMatrixView.tsx';
import { FunctionPointsView } from './components/FunctionPointsView.tsx';
import { CloudView } from './components/CloudView.tsx';
import { CoursesView } from './components/CoursesView.tsx';
import { BusinessView } from './components/BusinessView.tsx';
import { CodeForFunView } from './components/CodeForFunView.tsx';
import { useLanguage, useTranslationNamespace } from './i18n/LanguageContext.tsx';
import { LanguageSelector } from './components/LanguageSelector.tsx';

const ARTICLE_SLUG_TO_ID: Record<string, string> = {
  'signals-reactivity': 'signals-reactivity',
  'signals-o-futuro-da-reatividade-frontend': 'signals-reactivity',
  'net8-vs-fastapi': 'net8-vs-fastapi',
  'net8-minimal-apis-vs-python-fastapi': 'net8-vs-fastapi',
  'sql-vs-nosql': 'sql-vs-nosql',
  'quando-trocar-sql-por-nosql-guia-pragmatico': 'sql-vs-nosql',
  'rest-api-cache': 'rest-api-cache',
  'consumo-de-apis-rest-e-cache-assincrono': 'rest-api-cache',
  'go-microservices': 'go-microservices',
  'go-fiber-gorm-microsservicos-alta-concorrencia': 'go-microservices',
  'indices-and-pagination': 'indices-and-pagination',
  'indices-estrategicos-e-paginacao-por-cursor': 'indices-and-pagination',
  'rabbitmq-vs-kafka-event-driven': 'rabbitmq-vs-kafka-event-driven',
  'rabbitmq-vs-apache-kafka-mensageria-sistemas-distribuidos': 'rabbitmq-vs-kafka-event-driven'
};

export default function App() {
  const { t, language, preloadNamespaces } = useLanguage();
  const { data: articlesNs } = useTranslationNamespace('articles');
  const { data: stacksNs } = useTranslationNamespace('stacks');
  const { data: cloudCoursesNs } = useTranslationNamespace('cloudCourses');

  useEffect(() => {
    preloadNamespaces(['articles', 'stacks', 'cloudCourses']);
  }, [language, preloadNamespaces]);

  const detailedArticles = articlesNs?.articles ?? [];
  const frontendComparisons = stacksNs?.frontend ?? [];
  const backendComparisons = stacksNs?.backend ?? null;
  const nosqlData = stacksNs?.nosql ?? [];
  const relationalOptimizations = stacksNs?.relational ?? [];
  const formations = cloudCoursesNs?.formations ?? [];

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
  const [selectedArticleId, setSelectedArticleId] = useState<string>('signals-reactivity');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeFrontendTab, setActiveFrontendTab] = useState<FrontendFramework>('react');
  const [activeBackendLang, setActiveBackendLang] = useState<BackendLanguage>('dotnet');
  const [activeDbTab, setActiveDbTab] = useState<DatabaseTab>('nosql');
  const [splitViewMode, setSplitViewMode] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [articleFilterQuery, setArticleFilterQuery] = useState('');
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Sync route from URL Hash or Pathname on mount and navigation
  useEffect(() => {
    const handleRoute = () => {
      // 1. Extrair query params tanto de window.location.search quanto do hash
      const urlSearchParams = new URLSearchParams(window.location.search);
      let queryParam = urlSearchParams.get('q') || urlSearchParams.get('query') || '';

      let rawHash = window.location.hash.replace(/^#\/?/, '');
      let rawPath = window.location.pathname.replace(/^\//, '');

      let route = (rawHash || rawPath).replace(/\/$/, '');
      if (!queryParam && route.includes('?')) {
        const [baseRoute, queryString] = route.split('?');
        route = baseRoute.replace(/\/$/, '');
        const hashParams = new URLSearchParams(queryString);
        queryParam = hashParams.get('q') || hashParams.get('query') || '';
      }

      if (route.startsWith('artigo/') || route.startsWith('artigo-') || route.startsWith('artigos/')) {
        const artId = route.replace(/^(artigo\/|artigo-|artigos\/)/, '').replace(/\/$/, '');
        const matchedId = ARTICLE_SLUG_TO_ID[artId];
        if (matchedId) {
          setSelectedArticleId(matchedId);
          setCurrentPage('article');
          return;
        }
      }

      // Rotas de artigos / busca com ou sem termo
      if (route === 'artigos' || route === 'articles' || route === 'search' || route === 'busca') {
        setCurrentPage('articles');
        if (queryParam) {
          setArticleFilterQuery(queryParam);
        }
        return;
      }

      if (queryParam) {
        setArticleFilterQuery(queryParam);
        setCurrentPage('articles');
        return;
      }

      switch (route) {
        case 'artigos':
        case 'articles':
          setCurrentPage('articles');
          break;
        case 'matriz-decisao':
          setCurrentPage('decision-matrix');
          break;
        case 'pontos-de-funcao':
          setCurrentPage('function-points');
          break;
        case 'business':
        case 'bussines':
        case 'diagnostico-ti':
        case 'orcamento':
          setCurrentPage('business');
          break;
        case 'cloud':
        case 'cloud-aws-azure':
          setCurrentPage('cloud');
          break;
        case 'formacoes':
        case 'formacao':
        case 'cursos':
        case 'certificacoes':
        case 'courses':
          setCurrentPage('courses');
          break;
        case 'code-for-fun':
        case 'codeforfun':
          setCurrentPage('code-for-fun');
          break;
        case 'sobre':
          setCurrentPage('about');
          break;
        case 'diretrizes-editoriais':
          setCurrentPage('editorial');
          break;
        case 'contato':
          setCurrentPage('contact');
          break;
        case 'termos':
          setCurrentPage('terms');
          break;
        case 'politica-de-privacidade':
        case 'privacidade':
          setShowPrivacyModal(true);
          break;
        case 'frontend':
          setCurrentPage('frontend');
          break;
        case 'backend':
          setCurrentPage('backend');
          break;
        case 'database':
          setCurrentPage('database');
          break;
        case 'home':
        case '':
          setCurrentPage('home');
          break;
        default:
          break;
      }
    };

    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  }, []);

  // Sincronização Dinâmica de SEO, Canonical Tag e Metadados para Googlebot e Redes Sociais
  useEffect(() => {
    let canonicalPath = '';
    let pageTitle = t.seo.homeTitle;
    let pageDesc = t.seo.defaultDesc;

    switch (currentPage) {
      case 'home':
        canonicalPath = '';
        pageTitle = t.seo.homeTitle;
        break;
      case 'article': {
        const found = detailedArticles.find(a => a.id === selectedArticleId);
        if (found) {
          canonicalPath = `artigo/${found.slug || found.id}`;
          pageTitle = `${found.title} • CodeCompare`;
          pageDesc = found.summary;
        } else {
          canonicalPath = 'artigos';
          pageTitle = t.seo.articlesTitle;
        }
        break;
      }
      case 'articles':
        canonicalPath = 'artigos';
        pageTitle = t.seo.articlesTitle;
        break;
      case 'business':
        canonicalPath = 'business';
        pageTitle = t.seo.businessTitle;
        pageDesc = t.seo.businessDesc;
        break;
      case 'function-points':
        canonicalPath = 'pontos-de-funcao';
        pageTitle = t.seo.apfTitle;
        break;
      case 'decision-matrix':
        canonicalPath = 'matriz-decisao';
        pageTitle = t.seo.matrixTitle;
        break;
      case 'cloud':
        canonicalPath = 'cloud';
        pageTitle = t.seo.cloudTitle;
        break;
      case 'courses':
        canonicalPath = 'formacoes';
        pageTitle = t.seo.coursesTitle;
        break;
      case 'code-for-fun':
        canonicalPath = 'code-for-fun';
        pageTitle = t.seo.codeForFunTitle;
        pageDesc = t.seo.codeForFunDesc;
        break;
      case 'frontend':
        canonicalPath = 'frontend';
        pageTitle = t.seo.frontendTitle;
        break;
      case 'backend':
        canonicalPath = 'backend';
        pageTitle = t.seo.backendTitle;
        break;
      case 'database':
        canonicalPath = 'database';
        pageTitle = t.seo.databaseTitle;
        break;
      case 'about':
        canonicalPath = 'sobre';
        pageTitle = t.seo.aboutTitle;
        break;
      case 'editorial':
        canonicalPath = 'diretrizes-editoriais';
        pageTitle = t.seo.editorialTitle;
        break;
      case 'contact':
        canonicalPath = 'contato';
        pageTitle = t.seo.contactTitle;
        break;
      case 'terms':
        canonicalPath = 'termos';
        pageTitle = t.seo.termsTitle;
        break;
      default:
        canonicalPath = '';
        break;
    }

    const fullCanonicalUrl = `https://www.devedulessa.com.br/${canonicalPath}`;
    document.title = pageTitle;

    // Atualiza ou cria a tag canonical no <head>
    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', fullCanonicalUrl);

    // Atualiza meta og:url
    const metaOgUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
    if (metaOgUrl) {
      metaOgUrl.setAttribute('content', fullCanonicalUrl);
    }

    // Atualiza meta og:title
    const metaOgTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
    if (metaOgTitle) {
      metaOgTitle.setAttribute('content', pageTitle);
    }

    // Atualiza meta description
    const metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (metaDesc && pageDesc) {
      metaDesc.setAttribute('content', pageDesc);
    }
  }, [currentPage, selectedArticleId, t, detailedArticles]);

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

    // Update URL clean pathname
    const pathMap: Record<PageId, string> = {
      home: '/',
      articles: '/artigos',
      article: `/artigo/${selectedArticleId}`,
      'decision-matrix': '/matriz-decisao',
      'function-points': '/pontos-de-funcao',
      business: '/business',
      cloud: '/cloud',
      courses: '/formacoes',
      'code-for-fun': '/code-for-fun',
      about: '/sobre',
      editorial: '/diretrizes-editoriais',
      contact: '/contato',
      terms: '/termos',
      frontend: '/frontend',
      backend: '/backend',
      database: '/database'
    };
    if (page === 'articles') {
      setArticleFilterQuery('');
    }
    const targetPath = pathMap[page] || '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }

    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToArticlesWithFilter = (filterTerm: string) => {
    const term = filterTerm.trim();
    setArticleFilterQuery(term);
    setCurrentPage('articles');
    const targetPath = term ? `/artigos?q=${encodeURIComponent(term)}` : '/artigos';
    if (window.location.pathname + window.location.search !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    setSearchQuery('');
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    setCurrentPage('article');
    const targetPath = `/artigo/${articleId}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered search results
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];

    const results: {
      title: string;
      category: string;
      page: PageId;
      targetTab?: string;
      articleId?: string;
      filterTerm?: string;
    }[] = [];

    // Search in deep articles - route to filtered listing view instead of direct article detail
    detailedArticles.forEach(a => {
      if (
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.tag.toLowerCase().includes(q)
      ) {
        const filterKeyword = a.title.toLowerCase().includes('signals') ? 'Signals' : (searchQuery.trim() || a.title);
        results.push({
          title: a.title,
          category: `${t.searchMeta.articleCategoryPrefix} • ${a.tag}`,
          page: 'articles',
          filterTerm: filterKeyword,
          articleId: a.id
        });
      }
    });

    // Search in Decision Matrix & Institutional
    if ('matriz de decisão decision matrix arquitectura architecture calculadora calculator'.includes(q)) {
      results.push({
        title: t.searchMeta.matrixTitle,
        category: t.searchMeta.matrixCat,
        page: 'decision-matrix'
      });
    }
    if ('pontos de função function points puntos de función apf ifpug nesma dimensionamento sizing estimativa estimate sloc produtividade productivity'.includes(q)) {
      results.push({
        title: t.searchMeta.apfTitle,
        category: t.searchMeta.apfCat,
        page: 'function-points'
      });
    }
    if ('business bussines setor sector nicho niche empresa company orcamento budget presupuesto digitalizacao digitalization consultoria consulting viabilidade custo ti cost'.includes(q)) {
      results.push({
        title: t.searchMeta.businessTitle,
        category: t.searchMeta.businessCat,
        page: 'business'
      });
    }
    if ('cloud nuvem nube aws azure s3 blob storage ebs disk ecs container apps app runner app service codepipeline github actions lambda functions serverless cicd deploy'.includes(q)) {
      results.push({
        title: t.searchMeta.cloudTitle,
        category: t.searchMeta.cloudCat,
        page: 'cloud'
      });
    }
    if ('code for fun playground sandbox desafio challenge reto bug caca bugs bug hunt trace javascript typescript python sql fizzbuzz event loop'.includes(q)) {
      results.push({
        title: t.searchMeta.codeForFunTitle,
        category: t.searchMeta.codeForFunCat,
        page: 'code-for-fun'
      });
    }
    if ('sobre about acerca eduardo lessa autor author metodologia methodology eeat contato contact'.includes(q)) {
      results.push({
        title: t.searchMeta.aboutTitle,
        category: t.searchMeta.aboutCat,
        page: 'about'
      });
    }

    // Search in Formations & Certifications
    formations.forEach(form => {
      if (
        form.title.toLowerCase().includes(q) ||
        form.subtitle.toLowerCase().includes(q) ||
        form.technologies.some(tech => tech.toLowerCase().includes(q)) ||
        (form.examCode && form.examCode.toLowerCase().includes(q)) ||
        form.provider.toLowerCase().includes(q)
      ) {
        results.push({
          title: `${form.title} ${form.examCode ? `(${form.examCode})` : ''}`,
          category: `${t.searchMeta.formationCategoryPrefix} • ${form.provider}`,
          page: 'courses'
        });
      }
    });

    // Search in Frontend topics
    frontendComparisons.forEach(f => {
      if (f.title.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q)) {
        results.push({ title: f.title, category: t.searchMeta.frontendCat, page: 'frontend' });
      }
    });

    // Search in Backend stacks
    if (backendComparisons) {
      Object.values(backendComparisons).forEach(b => {
        if (b.name.toLowerCase().includes(q) || b.tagline.toLowerCase().includes(q)) {
          results.push({
            title: `${b.name}: ${t.searchMeta.backendCrudSuffix}`,
            category: t.searchMeta.backendCat,
            page: 'backend',
            targetTab: b.id
          });
        }
      });
    }

    // Search in NoSQL
    nosqlData.forEach(n => {
      if (n.name.toLowerCase().includes(q) || n.whenToUse.toLowerCase().includes(q)) {
        results.push({ title: `${n.name} (NoSQL)`, category: t.searchMeta.dbCat, page: 'database', targetTab: 'nosql' });
      }
    });

    // Search in Relational
    relationalOptimizations.forEach(r => {
      if (r.title.toLowerCase().includes(q) || r.problem.toLowerCase().includes(q) || r.solution.toLowerCase().includes(q)) {
        results.push({ title: r.title, category: t.searchMeta.sqlOptCat, page: 'database', targetTab: 'relational' });
      }
    });

    return results.slice(0, 6);
  }, [
    searchQuery,
    detailedArticles,
    formations,
    frontendComparisons,
    backendComparisons,
    nosqlData,
    relationalOptimizations,
    t
  ]);

  // Artigos filtrados para exibição na página de Artigos Técnicos
  const filteredArticles = useMemo(() => {
    const q = articleFilterQuery.trim().toLowerCase();
    if (!q) return detailedArticles;
    return detailedArticles.filter(
      a =>
        a.title.toLowerCase().includes(q) ||
        a.subtitle.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.tag.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }, [articleFilterQuery, detailedArticles]);

  const currentBackend = backendComparisons ? backendComparisons[activeBackendLang] : null;

  return (
    <div className={`${theme} min-h-screen transition-colors duration-200`}>
      <div
        className={`flex flex-col lg:flex-row min-h-screen ${theme === 'dark'
          ? 'bg-slate-950 text-slate-100'
          : 'bg-slate-100/70 text-slate-900'
          }`}
      >
        {/* --- SIDEBAR FIXA ESQUERDA (DESKTOP) E DRAWER (MOBILE) --- */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-50 w-72 border-r transition-transform duration-300 transform flex flex-col
            ${theme === 'dark'
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
            {/* Home & Core Tools */}
            <div className="space-y-1.5">
              <button
                id="nav-home-btn"
                onClick={() => navigateTo('home')}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${currentPage === 'home'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-400 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
              >
                <Layout size={18} />
                <span>{t.nav.home}</span>
              </button>

              <button
                id="nav-articles-btn"
                onClick={() => navigateTo('articles')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${currentPage === 'articles' || currentPage === 'article'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-400 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <BookOpen size={18} />
                  <span>{t.nav.articles}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono font-bold">
                  {t.nav.badgeDeepDives}
                </span>
              </button>

              <button
                id="nav-matrix-btn"
                onClick={() => navigateTo('decision-matrix')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${currentPage === 'decision-matrix'
                  ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/10 text-purple-300 font-bold border border-purple-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Compass size={18} className="text-purple-400" />
                  <span>{t.nav.decisionMatrix}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono font-bold">
                  {t.nav.badgeMatrix}
                </span>
              </button>

              <button
                id="nav-function-points-btn"
                onClick={() => navigateTo('function-points')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${currentPage === 'function-points'
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Calculator size={18} className="text-cyan-400" />
                  <span>{t.nav.functionPoints}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold">
                  {t.nav.badgeApf}
                </span>
              </button>

              <button
                id="nav-business-btn"
                onClick={() => navigateTo('business')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${currentPage === 'business'
                  ? 'bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-indigo-500/10 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Briefcase size={18} className="text-cyan-400" />
                  <span>{t.nav.business}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 font-mono font-bold">
                  $
                </span>
              </button>

              <button
                id="nav-cloud-btn"
                onClick={() => navigateTo('cloud')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${currentPage === 'cloud'
                  ? 'bg-gradient-to-r from-amber-500/20 via-slate-800 to-sky-500/20 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Cloud size={18} className="text-amber-400" />
                  <span>{t.nav.cloud}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold">
                  {t.nav.badgeCloud}
                </span>
              </button>

              <button
                id="nav-courses-btn"
                onClick={() => navigateTo('courses')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${currentPage === 'courses'
                  ? 'bg-gradient-to-r from-amber-500/20 via-purple-500/10 to-cyan-500/20 text-amber-300 font-bold border border-amber-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <GraduationCap size={18} className="text-amber-400" />
                  <span>{t.nav.courses}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono font-bold">
                  {t.nav.badgeCourses}
                </span>
              </button>

              <button
                id="nav-code-for-fun-btn"
                onClick={() => navigateTo('code-for-fun')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${currentPage === 'code-for-fun'
                  ? 'bg-gradient-to-r from-emerald-500/20 via-cyan-500/10 to-violet-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Gamepad2 size={18} className="text-emerald-400" />
                  <span>{t.nav.codeForFun}</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                  {t.nav.badgePlay}
                </span>
              </button>
            </div>

            {/* Group 1: Frontend (</>) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-3 py-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <Code2 size={14} className="text-cyan-400" />
                  {t.nav.groupFrontend}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono">
                  {t.nav.badge3Stacks}
                </span>
              </div>
              <div className="space-y-0.5">
                {[
                  { id: 'angular', name: t.nav.angularSignals },
                  { id: 'vue', name: t.nav.vueComposition },
                  { id: 'react', name: t.nav.reactHooks }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => navigateTo('frontend', item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg transition-all text-xs cursor-pointer ${currentPage === 'frontend' && activeFrontendTab === item.id
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
                  {t.nav.groupBackend}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 font-mono">
                  {t.nav.badge4Stacks}
                </span>
              </div>
              <div className="space-y-0.5">
                {[
                  { id: 'dotnet', name: t.nav.dotnetCsharp },
                  { id: 'java', name: t.nav.javaSpring },
                  { id: 'python', name: t.nav.pythonFastApi },
                  { id: 'go', name: t.nav.goFiber }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => navigateTo('backend', item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg transition-all text-xs cursor-pointer ${currentPage === 'backend' && activeBackendLang === item.id
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
                  {t.nav.groupDatabase}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                  {t.nav.badgeInfra}
                </span>
              </div>
              <div className="space-y-0.5">
                <button
                  onClick={() => navigateTo('database', 'nosql')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg transition-all text-xs cursor-pointer ${currentPage === 'database' && activeDbTab === 'nosql'
                    ? 'bg-emerald-500/15 text-emerald-300 font-semibold border-l-2 border-emerald-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                    }`}
                >
                  <span>{t.nav.nosqlUtilities}</span>
                  <ChevronRight size={14} className="opacity-40" />
                </button>
                <button
                  onClick={() => navigateTo('database', 'relational')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg transition-all text-xs cursor-pointer ${currentPage === 'database' && activeDbTab === 'relational'
                    ? 'bg-emerald-500/15 text-emerald-300 font-semibold border-l-2 border-emerald-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                    }`}
                >
                  <span>{t.nav.relationalOpt}</span>
                  <ChevronRight size={14} className="opacity-40" />
                </button>
              </div>
            </div>

            {/* Group 4: Institucional & E-E-A-T */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
              <div className="flex items-center justify-between px-3 py-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={14} className="text-blue-400" />
                  {t.nav.groupInstitutional}
                </span>
              </div>
              <div className="space-y-0.5">
                <button
                  onClick={() => navigateTo('about')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg transition-all text-xs cursor-pointer ${currentPage === 'about'
                    ? 'bg-blue-500/15 text-blue-300 font-semibold border-l-2 border-blue-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                    }`}
                >
                  <span>{t.nav.about}</span>
                  <ChevronRight size={14} className="opacity-40" />
                </button>
                <button
                  onClick={() => navigateTo('editorial')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg transition-all text-xs cursor-pointer ${currentPage === 'editorial'
                    ? 'bg-blue-500/15 text-blue-300 font-semibold border-l-2 border-blue-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                    }`}
                >
                  <span>{t.nav.editorial}</span>
                  <ChevronRight size={14} className="opacity-40" />
                </button>
                <button
                  onClick={() => navigateTo('contact')}
                  className={`w-full flex items-center justify-between px-3.5 py-2 rounded-lg transition-all text-xs cursor-pointer ${currentPage === 'contact'
                    ? 'bg-blue-500/15 text-blue-300 font-semibold border-l-2 border-blue-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/40'
                    }`}
                >
                  <span>{t.nav.contact}</span>
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
              <span>{t.nav.privacyAndLgpd}</span>
            </button>
            <div className="px-3 pt-2 text-[10px] text-slate-400 flex items-center justify-between">
              <span>CodeCompare v2.4</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t.common.online}
              </span>
            </div>
          </div>
        </aside>

        {/* --- MAIN AREA --- */}
        <main className="flex-1 lg:ml-72 min-w-0 flex flex-col">
          {/* HEADER STICKY COM BUSCA & TEMA */}
          <header
            className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors ${theme === 'dark'
              ? 'bg-slate-950/85 border-slate-800/80'
              : 'bg-white/85 border-slate-200/90 shadow-sm'
              }`}
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
              {/* Mobile Drawer Trigger */}
              <button
                className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
                onClick={() => setSidebarOpen(true)}
                aria-label={t.common.openMenuAria}
              >
                <Menu size={22} />
              </button>

              {/* Real-time Search Input & Submit Action */}
              <form
                role="search"
                onSubmit={e => {
                  e.preventDefault();
                  if (searchQuery.trim()) {
                    navigateToArticlesWithFilter(searchQuery.trim());
                  }
                }}
                className="flex-1 max-w-xl relative"
              >
                <div
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full border transition-all ${theme === 'dark'
                    ? 'bg-slate-900/80 border-slate-800 focus-within:border-cyan-500/60 focus-within:ring-2 focus-within:ring-cyan-500/20'
                    : 'bg-slate-100 border-slate-300 focus-within:border-cyan-600 focus-within:ring-2 focus-within:ring-cyan-500/20'
                    }`}
                >
                  <button
                    type="submit"
                    aria-label={t.common.searchArticlesAndComparisons}
                    title={t.common.searchArticlesAndComparisons}
                    className="text-slate-500 hover:text-cyan-400 p-0.5 cursor-pointer shrink-0 transition-colors"
                  >
                    <Search size={16} />
                  </button>
                  <input
                    id="search-input"
                    type="text"
                    placeholder={t.common.searchPlaceholder}
                    className="bg-transparent border-none outline-none text-xs sm:text-sm w-full placeholder:text-slate-500"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="text-slate-500 hover:text-slate-300 p-0.5 cursor-pointer"
                      aria-label={t.common.clearSearch}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Dropdown de Resultados da Busca */}
                {searchResults.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 bg-slate-950/80 border-b border-slate-800 text-[11px] font-mono text-cyan-400 flex items-center justify-between">
                      <span>{t.common.searchSuggestions} "{searchQuery}"</span>
                      <span>{searchResults.length} {t.common.searchFound}</span>
                    </div>
                    <div className="divide-y divide-slate-800/60 max-h-80 overflow-y-auto">
                      {/* Opção explícita de submissão para listagem filtrada */}
                      <button
                        type="button"
                        onClick={() => navigateToArticlesWithFilter(searchQuery.trim())}
                        className="w-full text-left p-3 bg-cyan-950/30 hover:bg-cyan-900/50 border-b border-slate-800/80 transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Search size={14} className="text-cyan-400 shrink-0" />
                          <span className="text-xs text-cyan-300 font-semibold">
                            {t.common.filterArticlesBy} <strong className="text-white">"{searchQuery}"</strong>
                          </span>
                        </div>
                        <ArrowRight size={14} className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
                      </button>

                      {searchResults.map((res, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => {
                            if (res.page === 'articles') {
                              navigateToArticlesWithFilter(res.filterTerm || searchQuery || res.title);
                            } else {
                              navigateTo(res.page, res.targetTab);
                              setSearchQuery('');
                            }
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
              </form>

              {/* Actions: Language Selector + Theme Toggle */}
              <div className="flex items-center gap-2">
                <LanguageSelector theme={theme} />
                <button
                  id="theme-toggle-btn"
                  onClick={toggleTheme}
                  className={`p-2.5 rounded-full border transition-all cursor-pointer ${theme === 'dark'
                    ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-amber-400'
                    : 'bg-white border-slate-300 hover:bg-slate-100 text-slate-700 shadow-sm'
                    }`}
                  title={theme === 'dark' ? t.common.toggleThemeLight : t.common.toggleThemeDark}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>
            </div>
          </header>

          {/* CORPO PRINCIPAL COM CONTEÚDO */}
          <div className="max-w-6xl w-full mx-auto p-4 sm:p-8 flex-1">
            {/* ============================================================== */}
            {/* PÁGINA 1: HOME (Hero + Cards de Artigos Recentes) */}
            {/* ============================================================== */}
            {currentPage === 'home' && (
              <section className="space-y-10 animate-in fade-in duration-300 no-ads">
                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-3xl p-8 sm:p-12 border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 shadow-2xl">
                  {/* Decorative background glow */}
                  <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 max-w-3xl space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                      <Sparkles size={13} />
                      <span>{t.home.heroBadge}</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
                      {t.home.heroTitleBefore}{' '}
                      <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
                        {t.home.heroTitleHighlight}
                      </span>
                      {t.home.heroTitleAfter}
                    </h1>

                    <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
                      {t.home.heroSubtitle}
                    </p>

                    <div className="pt-3 flex flex-wrap gap-3">
                      <button
                        onClick={() => navigateTo('frontend')}
                        className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Code2 size={16} />
                        <span>{t.home.ctaFrontend}</span>
                      </button>
                      <button
                        onClick={() => navigateTo('backend')}
                        className="px-6 py-3 rounded-xl font-bold text-sm bg-slate-800/90 hover:bg-slate-800 text-white border border-slate-700 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Server size={16} />
                        <span>{t.home.ctaBackend}</span>
                      </button>
                      <button
                        onClick={() => navigateTo('database')}
                        className="px-6 py-3 rounded-xl font-bold text-sm bg-slate-900 hover:bg-slate-800/80 text-emerald-400 border border-emerald-500/30 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Database size={16} />
                        <span>{t.home.ctaDatabase}</span>
                      </button>
                      <button
                        onClick={() => navigateTo('function-points')}
                        className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-slate-900 to-cyan-950/60 hover:border-cyan-400 text-cyan-300 border border-cyan-500/30 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Calculator size={16} className="text-cyan-400" />
                        <span>{t.home.ctaApf}</span>
                      </button>
                      <button
                        onClick={() => navigateTo('cloud')}
                        className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-950/40 via-slate-900 to-sky-950/40 hover:border-amber-400 text-amber-300 border border-amber-500/30 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Cloud size={16} className="text-amber-400" />
                        <span>{t.home.ctaCloud}</span>
                      </button>
                      <button
                        onClick={() => navigateTo('courses')}
                        className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-amber-500/20 via-purple-500/10 to-cyan-500/20 hover:border-amber-400 text-amber-300 border border-amber-500/30 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <GraduationCap size={16} className="text-amber-400" />
                        <span>{t.home.ctaCourses}</span>
                      </button>
                      <button
                        onClick={() => navigateTo('code-for-fun')}
                        className="px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500/20 via-cyan-500/10 to-violet-500/20 hover:border-emerald-400 text-emerald-300 border border-emerald-500/30 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <Gamepad2 size={16} className="text-emerald-400" />
                        <span>{t.home.ctaCodeForFun}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Section Header: Artigos mais recentes */}
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Flame size={20} className="text-amber-400" />
                        {t.home.recentArticlesTitle}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400">
                        {t.home.recentArticlesSubtitle}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full w-fit">
                      {detailedArticles.length} {t.home.publishedArticlesBadge}
                    </span>
                  </div>

                  {/* Grid com os cards de artigos */}
                  {detailedArticles.length === 0 ? (
                    <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/60 text-center text-sm text-slate-400">
                      {t.common.loadingTranslation}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {detailedArticles.map((article) => (
                        <a
                          key={article.id}
                          href={`/artigo/${article.id}`}
                          onClick={(e) => {
                            if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                              e.preventDefault();
                              openArticle(article.id);
                            }
                          }}
                          className={`group p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between block no-underline text-inherit ${theme === 'dark'
                            ? 'bg-slate-900/90 border-slate-800 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10'
                            : 'bg-white border-slate-200 hover:border-cyan-500/50 shadow-sm hover:shadow-md'
                            }`}
                        >
                          <div>
                            {/* Card Header Tag & Date */}
                            <div className="flex items-center justify-between text-xs mb-3">
                              <span
                                className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px] ${article.category === 'frontend'
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
                            <span>{t.home.readFullArticle}</span>
                            <ArrowRight size={15} />
                          </div>
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Banner Teaser da Matriz de Decisão Arquitetural */}
                  <div className="p-8 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900 to-cyan-950/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
                    <div className="space-y-2 max-w-xl">
                      <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">
                        <Compass size={14} />
                        <span>{t.home.matrixBannerBadge}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        {t.home.matrixBannerTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {t.home.matrixBannerDesc}
                      </p>
                    </div>

                    <button
                      onClick={() => navigateTo('decision-matrix')}
                      className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white shadow-lg shadow-purple-500/20 transition-all cursor-pointer flex items-center gap-2 shrink-0"
                    >
                      <span>{t.home.matrixBannerCta}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Banner Teaser de Pontos de Função (APF) */}
                  <div className="p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
                    <div className="space-y-2 max-w-xl">
                      <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full">
                        <Calculator size={14} />
                        <span>{t.home.apfBannerBadge}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        {t.home.apfBannerTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {t.home.apfBannerDesc}
                      </p>
                    </div>

                    <button
                      onClick={() => navigateTo('function-points')}
                      className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all cursor-pointer flex items-center gap-2 shrink-0"
                    >
                      <span>{t.home.apfBannerCta}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Banner Teaser de Cloud: AWS vs Azure */}
                  <div className="p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-slate-900 to-sky-950/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
                    <div className="space-y-2 max-w-xl">
                      <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">
                        <Cloud size={14} />
                        <span>{t.home.cloudBannerBadge}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        {t.home.cloudBannerTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {t.home.cloudBannerDesc}
                      </p>
                    </div>

                    <button
                      onClick={() => navigateTo('cloud')}
                      className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 via-orange-500 to-sky-500 hover:from-amber-400 hover:to-sky-400 text-slate-950 font-black shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-2 shrink-0"
                    >
                      <span>{t.home.cloudBannerCta}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Banner Teaser de Formações & Certificações */}
                  <div className="p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
                    <div className="space-y-2 max-w-xl">
                      <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                        <GraduationCap size={14} />
                        <span>{t.home.coursesBannerBadge}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        {t.home.coursesBannerTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {t.home.coursesBannerDesc}
                      </p>
                    </div>

                    <button
                      onClick={() => navigateTo('courses')}
                      className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 transition-all cursor-pointer flex items-center gap-2 shrink-0"
                    >
                      <span>{t.home.coursesBannerCta}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Banner Teaser da Seção Business (Diagnóstico de TI & Orçamento) */}
                  <div className="p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
                    <div className="space-y-2 max-w-xl">
                      <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                        <Briefcase size={14} />
                        <span>{t.home.businessBannerBadge}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        {t.home.businessBannerTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {t.home.businessBannerDesc}
                      </p>
                    </div>

                    <button
                      onClick={() => navigateTo('business')}
                      className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/25 transition-all cursor-pointer flex items-center gap-2 shrink-0"
                    >
                      <span>{t.home.businessBannerCta}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Banner Teaser da Seção Code for Fun */}
                  <div className="p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-violet-950/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
                    <div className="space-y-2 max-w-xl">
                      <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                        <Gamepad2 size={14} />
                        <span>{t.home.codeForFunBannerBadge}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        {t.home.codeForFunBannerTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {t.home.codeForFunBannerDesc}
                      </p>
                    </div>

                    <button
                      onClick={() => navigateTo('code-for-fun')}
                      className="px-6 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black shadow-lg shadow-emerald-500/20 transition-all cursor-pointer flex items-center gap-2 shrink-0"
                    >
                      <span>{t.home.codeForFunBannerCta}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* ============================================================== */}
            {/* PÁGINA 2: FRONTEND */}
            {/* ============================================================== */}
            {currentPage === 'frontend' && (
              <section className="space-y-8 animate-in slide-in-from-bottom-2 duration-300 no-ads">
                {/* Page Title & Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-400 mb-1">
                      <Code2 size={16} />
                      {t.stacksChrome.frontendBadge}
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                      {t.stacksChrome.frontendTitle}
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">
                      {t.stacksChrome.frontendSubtitle}
                    </p>
                  </div>

                  {/* Mode & Tab Switchers */}
                  <div className="flex flex-wrap items-center gap-3">
                    {/* Botão de Modo Lado a Lado */}
                    <button
                      onClick={() => setSplitViewMode(!splitViewMode)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${splitViewMode
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      title={t.stacksChrome.toggleModeTitle}
                    >
                      <Columns size={14} />
                      <span>{splitViewMode ? t.stacksChrome.toggleSingleMode : t.stacksChrome.toggleSplitMode}</span>
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
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${activeFrontendTab === tab.id
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

                {/* Lista com os Tópicos */}
                {frontendComparisons.length === 0 ? (
                  <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/60 text-center text-sm text-slate-400">
                    {t.common.loadingTranslation}
                  </div>
                ) : (
                  <div className="space-y-12">
                    {frontendComparisons.map((item, idx) => (
                      <div
                        key={item.id}
                        className={`p-6 sm:p-8 rounded-2xl border transition-all ${theme === 'dark' ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
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
                            {t.stacksChrome.topicPrefix} #{idx + 1} {t.stacksChrome.topicOf} {frontendComparisons.length}
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
                                {t.stacksChrome.implIn}{' '}
                                <span className="text-cyan-400 capitalize">
                                  {activeFrontendTab === 'vue' ? 'Vue.js 3' : activeFrontendTab}
                                </span>
                              </span>
                            </div>

                            <CodeBlock
                              code={item.codes[activeFrontendTab].code}
                              language={item.codes[activeFrontendTab].lang}
                              filename={`${activeFrontendTab === 'angular'
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
                                <strong className="text-white font-medium">{t.stacksChrome.implNote}</strong>{' '}
                                {item.codes[activeFrontendTab].notes}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* ============================================================== */}
            {/* PÁGINA 3: BACKEND */}
            {/* ============================================================== */}
            {currentPage === 'backend' && (
              <section className="space-y-8 animate-in slide-in-from-bottom-2 duration-300 no-ads">
                <div className="border-b border-slate-800/80 pb-6">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400 mb-1">
                    <Server size={16} />
                    {t.stacksChrome.backendBadge}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                    {t.stacksChrome.backendTitle}
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    {t.stacksChrome.backendSubtitle}
                  </p>
                </div>

                {!backendComparisons || !currentBackend ? (
                  <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/60 text-center text-sm text-slate-400">
                    {t.common.loadingTranslation}
                  </div>
                ) : (
                  <>
                    {/* Abas das 4 Linguagens */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {(Object.keys(backendComparisons) as BackendLanguage[]).map(langKey => {
                        const stack = backendComparisons[langKey];
                        const isActive = activeBackendLang === langKey;
                        return (
                          <button
                            key={langKey}
                            onClick={() => setActiveBackendLang(langKey)}
                            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${isActive
                              ? 'bg-purple-500/15 border-purple-500/60 text-white shadow-lg shadow-purple-500/10'
                              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                              }`}
                          >
                            <span className="text-[10px] font-mono uppercase font-bold tracking-wider opacity-60 block mb-1">
                              {t.stacksChrome.stackPrefix} #{langKey}
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
                          📌 <strong>{t.stacksChrome.stackHighlight}</strong> {currentBackend.tagline}
                        </span>
                      </div>

                      {/* 1. Estrutura do Model */}
                      <div
                        className={`p-6 sm:p-8 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
                          }`}
                      >
                        <div className="mb-4">
                          <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider bg-purple-500/10 px-2 py-0.5 rounded">
                            {t.stacksChrome.step1Badge}
                          </span>
                          <h3 className="text-xl font-bold text-white mt-1">
                            {t.stacksChrome.step1Title} ({currentBackend.model.filename})
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
                        className={`p-6 sm:p-8 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
                          }`}
                      >
                        <div className="mb-4">
                          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/10 px-2 py-0.5 rounded">
                            {t.stacksChrome.step2Badge}
                          </span>
                          <h3 className="text-xl font-bold text-white mt-1">
                            {t.stacksChrome.step2Title} ({currentBackend.controller.filename})
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
                        className={`p-6 sm:p-8 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'
                          }`}
                      >
                        <div className="mb-4">
                          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded">
                            {t.stacksChrome.step3Badge}
                          </span>
                          <h3 className="text-xl font-bold text-white mt-1">
                            {t.stacksChrome.step3TitleBefore} {currentBackend.route.endpoint} {t.stacksChrome.step3TitleAfter}
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
                  </>
                )}
              </section>
            )}

            {/* ============================================================== */}
            {/* PÁGINA 4: BANCO DE DADOS (NoSQL Utilities & Otimização SQL) */}
            {/* ============================================================== */}
            {currentPage === 'database' && (
              <section className="space-y-8 animate-in slide-in-from-bottom-2 duration-300 no-ads">
                <div className="border-b border-slate-800/80 pb-6">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-1">
                    <Database size={16} />
                    {t.stacksChrome.dbBadge}
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                    {t.stacksChrome.dbTitle}
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    {t.stacksChrome.dbSubtitle}
                  </p>
                </div>

                {/* Abas: NoSQL vs Relacional */}
                <div className="flex gap-4 border-b border-slate-800">
                  <button
                    onClick={() => setActiveDbTab('nosql')}
                    className={`pb-4 px-3 text-sm font-bold transition-all relative cursor-pointer ${activeDbTab === 'nosql' ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                      }`}
                  >
                    {t.stacksChrome.tabNosql}
                    {activeDbTab === 'nosql' && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveDbTab('relational')}
                    className={`pb-4 px-3 text-sm font-bold transition-all relative cursor-pointer ${activeDbTab === 'relational' ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
                      }`}
                  >
                    {t.stacksChrome.tabRelational}
                    {activeDbTab === 'relational' && (
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400" />
                    )}
                  </button>
                </div>

                {/* ABA 1: NoSQL Utilities */}
                {activeDbTab === 'nosql' && (
                  nosqlData.length === 0 ? (
                    <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/60 text-center text-sm text-slate-400">
                      {t.common.loadingTranslation}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                        <span>
                          💡 <strong>{t.stacksChrome.pragmaticRuleLabel}</strong> {t.stacksChrome.pragmaticRuleText}
                        </span>
                      </div>

                      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400 tracking-wider">
                              <th className="p-4">{t.stacksChrome.colTech}</th>
                              <th className="p-4">{t.stacksChrome.colWhenUse}</th>
                              <th className="p-4">{t.stacksChrome.colWhenAvoid}</th>
                              <th className="p-4">{t.stacksChrome.colDataModel}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/60 text-xs">
                            {nosqlData.map((item, idx) => (
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
                                      <span>{t.stacksChrome.queryExamplePrefix} • {item.name}:</span>
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
                  )
                )}

                {/* ABA 2: Otimização Relacional */}
                {activeDbTab === 'relational' && (
                  relationalOptimizations.length === 0 ? (
                    <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/60 text-center text-sm text-slate-400">
                      {t.common.loadingTranslation}
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {relationalOptimizations.map(opt => (
                          <div
                            key={opt.id}
                            className={`p-6 rounded-2xl border flex flex-col justify-between ${theme === 'dark'
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
                                <strong>{t.stacksChrome.problemLabel}</strong> {opt.problem}
                              </div>

                              {/* Detalhe da Solução */}
                              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
                                <strong>{t.stacksChrome.solutionLabel}</strong> {opt.solution}
                              </div>

                              {/* Bloco de Código SQL Antes vs Depois */}
                              <div className="pt-2 space-y-2">
                                <span className="text-[10px] font-mono text-slate-500 uppercase">
                                  {t.stacksChrome.sqlCompareLabel}
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
                  )
                )}
              </section>
            )}

            {/* ============================================================== */}
            {/* PÁGINA 4: LISTA DE ARTIGOS TÉCNICOS (Deep Dives) */}
            {/* ============================================================== */}
            {currentPage === 'articles' && (
              <section className="space-y-8 animate-in fade-in duration-300 no-ads">
                <header className="border-b border-slate-800/80 pb-6 space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                    <BookOpen size={14} />
                    <span>{t.articlesList.badge}</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                    {t.articlesList.title}
                  </h1>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
                    {t.articlesList.subtitle}
                  </p>
                </header>

                {/* Barra de Filtro e Busca Rápida na Lista de Artigos */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm">
                  <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus-within:border-cyan-500/60">
                    <Search size={16} className="text-slate-500 shrink-0" />
                    <input
                      id="articles-list-filter"
                      type="text"
                      placeholder={t.common.searchPlaceholder}
                      value={articleFilterQuery}
                      onChange={e => {
                        const val = e.target.value;
                        setArticleFilterQuery(val);
                        const clean = val.trim();
                        window.history.pushState(null, '', clean ? `#artigos?q=${encodeURIComponent(clean)}` : '#artigos');
                      }}
                      className="bg-transparent border-none outline-none text-xs sm:text-sm w-full text-slate-100 placeholder:text-slate-500"
                    />
                    {articleFilterQuery && (
                      <button
                        onClick={() => {
                          setArticleFilterQuery('');
                          window.history.pushState(null, '', '#artigos');
                        }}
                        className="text-slate-500 hover:text-slate-300 p-0.5 cursor-pointer"
                        aria-label={t.articlesList.clearFilter}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>

                  {articleFilterQuery && (
                    <button
                      onClick={() => {
                        setArticleFilterQuery('');
                        window.history.pushState(null, '', '#artigos');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/60 border border-cyan-800/50 hover:border-cyan-700 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      {t.articlesList.clearFilter} ({filteredArticles.length}{' '}
                      {filteredArticles.length === 1 ? t.articlesList.foundSingular : t.articlesList.foundPlural})
                    </button>
                  )}
                </div>

                {/* Banner Indicativo de Filtro Ativo */}
                {articleFilterQuery && (
                  <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-cyan-300 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2">
                      <Filter size={16} className="text-cyan-400 shrink-0" />
                      <span>
                        {t.articlesList.filteringBy} <strong className="text-white font-mono text-sm">"{articleFilterQuery}"</strong>
                        <span className="ml-2 text-slate-400">
                          ({filteredArticles.length}{' '}
                          {filteredArticles.length === 1 ? t.articlesList.foundSingular : t.articlesList.foundPlural})
                        </span>
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setArticleFilterQuery('');
                        window.history.pushState(null, '', '#artigos');
                      }}
                      className="text-cyan-400 hover:text-white underline font-semibold text-left sm:text-right cursor-pointer"
                    >
                      {t.articlesList.viewAll} ({detailedArticles.length})
                    </button>
                  </div>
                )}

                {/* Grid com Artigos Filtrados */}
                {detailedArticles.length === 0 ? (
                  <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/60 text-center text-sm text-slate-400">
                    {t.common.loadingTranslation}
                  </div>
                ) : filteredArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredArticles.map((art) => (
                      <a
                        key={art.id}
                        href={`/artigo/${art.id}`}
                        onClick={(e) => {
                          if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
                            e.preventDefault();
                            openArticle(art.id);
                          }
                        }}
                        className="group p-6 sm:p-7 rounded-2xl border border-slate-800 bg-slate-900/80 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all cursor-pointer flex flex-col justify-between block no-underline text-inherit"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="px-2.5 py-0.5 rounded font-bold uppercase tracking-wider text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                              {art.tag}
                            </span>
                            <span className="text-slate-500 font-mono text-[11px] flex items-center gap-1">
                              <Clock size={11} />
                              {art.readingTime}
                            </span>
                          </div>

                          <h2 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug">
                            {art.title}
                          </h2>

                          <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                            {art.summary}
                          </p>
                        </div>

                        <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                          <span>{t.articlesList.readFull}</span>
                          <ArrowRight size={14} />
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center rounded-2xl border border-slate-800 bg-slate-900/40 space-y-4">
                    <BookOpen size={36} className="mx-auto text-slate-600" />
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white">{t.articlesList.emptyTitle}</h3>
                      <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                        {t.articlesList.emptyDescBefore} "{articleFilterQuery}". {t.articlesList.emptyDescAfter}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setArticleFilterQuery('');
                        window.history.pushState(null, '', '#artigos');
                      }}
                      className="px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer"
                    >
                      {t.articlesList.viewAll}
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* ============================================================== */}
            {/* PÁGINA 5: LEITOR DE ARTIGO INDIVIDUAL (ArticleReader) */}
            {/* ============================================================== */}
            {currentPage === 'article' && (() => {
              const targetArticle = detailedArticles.find(a => a.id === selectedArticleId) || detailedArticles[0];
              if (!targetArticle) {
                return (
                  <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/60 text-center text-sm text-slate-400">
                    {t.common.loadingTranslation}
                  </div>
                );
              }
              return (
                <ArticleReader
                  article={targetArticle}
                  theme={theme}
                  onBack={() => navigateTo('home')}
                  onNavigateToArticle={openArticle}
                  onNavigateToPage={navigateTo}
                />
              );
            })()}

            {/* ============================================================== */}
            {/* PÁGINA 6: MATRIZ DE DECISÃO ARQUITETURAL */}
            {/* ============================================================== */}
            {currentPage === 'decision-matrix' && (
              <DecisionMatrixView onNavigateToPage={navigateTo} />
            )}

            {/* ============================================================== */}
            {/* PÁGINA 6.5: ANÁLISE DE PONTOS DE FUNÇÃO (APF) */}
            {/* ============================================================== */}
            {currentPage === 'function-points' && (
              <FunctionPointsView />
            )}

            {/* ============================================================== */}
            {/* PÁGINA 6.7: DIAGNÓSTICO BUSINESS & ORÇAMENTO DE TI */}
            {/* ============================================================== */}
            {currentPage === 'business' && (
              <BusinessView />
            )}

            {/* ============================================================== */}
            {/* PÁGINA 6.8: COMPARATIVO CLOUD: AWS VS AZURE */}
            {/* ============================================================== */}
            {currentPage === 'cloud' && (
              <CloudView onNavigateToPage={navigateTo} />
            )}

            {/* ============================================================== */}
            {/* PÁGINA 6.9: VITRINE DE FORMAÇÕES & CERTIFICAÇÕES */}
            {/* ============================================================== */}
            {currentPage === 'courses' && (
              <CoursesView
                onNavigateToPage={navigateTo}
                onNavigateToArticle={openArticle}
              />
            )}

            {/* ============================================================== */}
            {/* PÁGINA 6.95: CODE FOR FUN (LABORATÓRIO INTERATIVO) */}
            {/* ============================================================== */}
            {currentPage === 'code-for-fun' && (
              <CodeForFunView />
            )}

            {/* ============================================================== */}
            {/* PÁGINA 7: SOBRE O AUTOR & E-E-A-T */}
            {/* ============================================================== */}
            {currentPage === 'about' && (
              <AboutView onNavigateToContact={() => navigateTo('contact')} />
            )}

            {/* ============================================================== */}
            {/* PÁGINA 8: DIRETRIZES EDITORIAIS */}
            {/* ============================================================== */}
            {currentPage === 'editorial' && (
              <EditorialView />
            )}

            {/* ============================================================== */}
            {/* PÁGINA 9: FALE CONOSCO & CONTATO */}
            {/* ============================================================== */}
            {currentPage === 'contact' && (
              <ContactView />
            )}

            {/* ============================================================== */}
            {/* PÁGINA 10: TERMOS DE USO */}
            {/* ============================================================== */}
            {currentPage === 'terms' && (
              <TermsView />
            )}
          </div>

          {/* FOOTER DO BLOG ENRIQUECIDO COM E-E-A-T */}
          <footer
            className={`mt-16 border-t py-12 px-6 sm:px-12 ${theme === 'dark'
              ? 'border-slate-900 bg-slate-950 text-slate-400'
              : 'border-slate-200 bg-white text-slate-600'
              }`}
          >
            <div className="max-w-6xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-md">
                    <Braces size={20} />
                  </div>
                  <div>
                    <span className="font-extrabold text-white text-base block">
                      {t.footer.brandTitle}
                    </span>
                    <span className="text-xs text-slate-400">
                      {t.footer.brandSubtitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{t.footer.verifiedBadge}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs">
                <div className="space-y-2">
                  <span className="font-bold text-white uppercase font-mono tracking-wider block text-[11px]">
                    {t.footer.colCore}
                  </span>
                  <ul className="space-y-1.5 text-slate-400">
                    <li>
                      <button onClick={() => navigateTo('home')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                        {t.footer.linkHome}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigateTo('articles')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                        {t.footer.linkArticles}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigateTo('decision-matrix')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                        {t.footer.linkMatrix}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigateTo('function-points')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                        {t.footer.linkApf}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigateTo('business')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                        {t.footer.linkBusiness}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigateTo('cloud')} className="hover:text-amber-400 transition-colors cursor-pointer">
                        {t.footer.linkCloud}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigateTo('courses')} className="hover:text-amber-400 transition-colors cursor-pointer">
                        {t.footer.linkCourses}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigateTo('code-for-fun')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                        {t.footer.linkCodeForFun}
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-white uppercase font-mono tracking-wider block text-[11px]">
                    {t.footer.colComparisons}
                  </span>
                  <ul className="space-y-1.5 text-slate-400">
                    <li>
                      <button onClick={() => navigateTo('frontend')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                        {t.footer.linkFrontend}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigateTo('backend')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                        {t.footer.linkBackend}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigateTo('database')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                        {t.footer.linkDatabase}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigateTo('cloud')} className="hover:text-amber-400 transition-colors cursor-pointer">
                        {t.footer.linkCloud}
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-white uppercase font-mono tracking-wider block text-[11px]">
                    {t.footer.colInstitutional}
                  </span>
                  <ul className="space-y-1.5 text-slate-400">
                    <li>
                      <button onClick={() => navigateTo('about')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                        {t.footer.linkAbout}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigateTo('editorial')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                        {t.footer.linkEditorial}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigateTo('contact')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                        {t.footer.linkContact}
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-white uppercase font-mono tracking-wider block text-[11px]">
                    {t.footer.colLegal}
                  </span>
                  <ul className="space-y-1.5 text-slate-400">
                    <li>
                      <button onClick={() => setShowPrivacyModal(true)} className="hover:text-cyan-400 transition-colors cursor-pointer">
                        {t.footer.linkPrivacy}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => navigateTo('terms')} className="hover:text-cyan-400 transition-colors cursor-pointer">
                        {t.footer.linkTerms}
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-900 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-slate-400">
                <p>© {new Date().getFullYear()} {t.footer.copyrightSuffix}</p>
                <p>{t.footer.authorRole}</p>
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
