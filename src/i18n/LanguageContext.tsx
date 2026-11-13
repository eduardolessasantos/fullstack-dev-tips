import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, TranslationDictionary } from './types.ts';
import { TRANSLATIONS } from './translations.ts';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LANGUAGE_OPTIONS: { code: SupportedLanguage; label: string; flag: string }[] = [
  { code: 'pt', label: 'Português (BR)', flag: '🇧🇷' },
  { code: 'en', label: 'English (US)', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' }
];

function detectInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'pt';

  const saved = localStorage.getItem('codecompare_lang') as SupportedLanguage;
  if (saved && (saved === 'pt' || saved === 'en' || saved === 'es')) {
    return saved;
  }

  const browserLang = (navigator.language || '').toLowerCase();
  if (browserLang.startsWith('pt')) return 'pt';
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('en')) return 'en';

  return 'pt';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(detectInitialLanguage);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('codecompare_lang', lang);
      document.documentElement.lang = lang === 'pt' ? 'pt-BR' : lang;
    }
  };

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: TRANSLATIONS[language]
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
