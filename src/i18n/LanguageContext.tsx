import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  NamespaceDataMap,
  SupportedLanguage,
  TranslationDictionary,
  TranslationNamespace
} from './types.ts';
import { TRANSLATIONS } from './translations.ts';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDictionary;
  isTranslating: boolean;
  preloadNamespaces: (namespaces: TranslationNamespace[]) => void;
  getNamespaceData: <K extends TranslationNamespace>(ns: K) => NamespaceDataMap[K] | null;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LANGUAGE_OPTIONS: { code: SupportedLanguage; label: string; flag: string }[] = [
  { code: 'pt', label: 'Português (BR)', flag: '🇧🇷' },
  { code: 'en', label: 'English (US)', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' }
];

type CacheKey = `${SupportedLanguage}:${TranslationNamespace}`;

const loadedNamespaceCache = new Map<CacheKey, unknown>();
const inflightRequests = new Map<CacheKey, Promise<unknown>>();

async function importNamespaceChunk<K extends TranslationNamespace>(
  lang: SupportedLanguage,
  ns: K
): Promise<NamespaceDataMap[K]> {
  const key: CacheKey = `${lang}:${ns}`;
  if (loadedNamespaceCache.has(key)) {
    return loadedNamespaceCache.get(key) as NamespaceDataMap[K];
  }

  const existing = inflightRequests.get(key);
  if (existing) {
    return existing as Promise<NamespaceDataMap[K]>;
  }

  const loader = (async () => {
    let mod: { default: NamespaceDataMap[K] };
    switch (ns) {
      case 'institutional':
        mod = await import(`./locales/${lang}/institutional.ts`);
        break;
      case 'stacks':
        mod = await import(`./locales/${lang}/stacks.ts`);
        break;
      case 'articles':
        mod = await import(`./locales/${lang}/articles.ts`);
        break;
      case 'cloudCourses':
        mod = await import(`./locales/${lang}/cloudCourses.ts`);
        break;
      case 'engineeringTools':
        mod = await import(`./locales/${lang}/engineeringTools.ts`);
        break;
      case 'business':
        mod = await import(`./locales/${lang}/business.ts`);
        break;
      case 'codeForFun':
        mod = await import(`./locales/${lang}/codeForFun.ts`);
        break;
    }
    loadedNamespaceCache.set(key, mod.default);
    return mod.default;
  })().finally(() => {
    inflightRequests.delete(key);
  });

  inflightRequests.set(key, loader);
  return loader;
}

function detectInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'pt';

  try {
    const saved = localStorage.getItem('codecompare_lang') as SupportedLanguage | null;
    if (saved === 'pt' || saved === 'en' || saved === 'es') {
      return saved;
    }
  } catch {
    // Ignore storage read errors
  }

  const browserLang = (navigator.language || '').toLowerCase();
  if (browserLang.startsWith('pt')) return 'pt';
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('en')) return 'en';

  return 'pt';
}

function syncHtmlLanguageAttributes(lang: SupportedLanguage) {
  if (typeof document === 'undefined') return;
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
  const ogLocale = document.querySelector('meta[property="og:locale"]') as HTMLMetaElement | null;
  if (ogLocale) {
    ogLocale.setAttribute('content', lang === 'pt' ? 'pt_BR' : lang === 'en' ? 'en_US' : 'es_ES');
  }
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(detectInitialLanguage);
  const [cacheVersion, setCacheVersion] = useState(0);
  const [pendingLoads, setPendingLoads] = useState(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const ensureNamespacesLoaded = useCallback(
    (targetLang: SupportedLanguage, namespaces: TranslationNamespace[]) => {
      const missing: TranslationNamespace[] = [];
      namespaces.forEach(ns => {
        if (!loadedNamespaceCache.has(`${targetLang}:${ns}`)) {
          missing.push(ns);
        }
        // Always warm Portuguese fallback when loading non-Portuguese chunks
        if (targetLang !== 'pt' && !loadedNamespaceCache.has(`pt:${ns}`)) {
          missing.push(ns);
        }
      });

      const uniqueTasks: Promise<unknown>[] = [];
      const seen = new Set<string>();
      namespaces.forEach(ns => {
        const keys: CacheKey[] =
          targetLang === 'pt' ? [`pt:${ns}`] : [`${targetLang}:${ns}`, `pt:${ns}`];
        keys.forEach(k => {
          if (!loadedNamespaceCache.has(k) && !seen.has(k)) {
            seen.add(k);
            const [l, n] = k.split(':') as [SupportedLanguage, TranslationNamespace];
            uniqueTasks.push(importNamespaceChunk(l, n));
          }
        });
      });

      if (uniqueTasks.length === 0) return;

      if (mountedRef.current) {
        setPendingLoads(prev => prev + 1);
      }

      Promise.allSettled(uniqueTasks).then(() => {
        if (mountedRef.current) {
          setCacheVersion(v => v + 1);
          setPendingLoads(prev => Math.max(0, prev - 1));
        }
      });
    },
    []
  );

  const preloadNamespaces = useCallback(
    (namespaces: TranslationNamespace[]) => {
      ensureNamespacesLoaded(language, namespaces);
    },
    [language, ensureNamespacesLoaded]
  );

  const setLanguage = useCallback(
    (lang: SupportedLanguage) => {
      setLanguageState(lang);
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('codecompare_lang', lang);
        }
      } catch {
        // Ignore storage write errors
      }
      syncHtmlLanguageAttributes(lang);
    },
    []
  );

  useEffect(() => {
    syncHtmlLanguageAttributes(language);
  }, [language]);

  const getNamespaceData = useCallback(
    <K extends TranslationNamespace>(ns: K): NamespaceDataMap[K] | null => {
      void cacheVersion;
      const primaryKey = `${language}:${ns}` as CacheKey;
      const primary = loadedNamespaceCache.get(primaryKey) as
        | NamespaceDataMap[K]
        | undefined;
      if (primary) return primary;
      const fallbackKey = `pt:${ns}` as CacheKey;
      const fallback = loadedNamespaceCache.get(fallbackKey) as NamespaceDataMap[K] | undefined;
      return fallback ?? null;
    },
    [language, cacheVersion]
  );

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: TRANSLATIONS[language],
    isTranslating: pendingLoads > 0,
    preloadNamespaces,
    getNamespaceData
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export function useTranslationNamespace<K extends TranslationNamespace>(ns: K): {
  data: NamespaceDataMap[K] | null;
  isLoading: boolean;
} {
  const { language, preloadNamespaces, getNamespaceData } = useLanguage();

  useEffect(() => {
    preloadNamespaces([ns]);
  }, [ns, language, preloadNamespaces]);

  const data = getNamespaceData(ns);
  return {
    data,
    isLoading: data === null
  };
}
