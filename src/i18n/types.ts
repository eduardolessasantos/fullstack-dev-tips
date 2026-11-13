export type SupportedLanguage = 'pt' | 'en' | 'es';

export interface TranslationDictionary {
  common: {
    online: string;
    searchPlaceholder: string;
    searchSuggestions: string;
    searchFound: string;
    filterArticlesBy: string;
    searchArticlesAndComparisons: string;
    clearSearch: string;
    toggleThemeDark: string;
    toggleThemeLight: string;
    share: string;
    copied: string;
    backToHome: string;
    readFullAnalysis: string;
    minRead: string;
    verifiedAuthor: string;
    publishedAt: string;
    advertisement: string;
    openInteractiveComparator: string;
    viewInteractiveCode: string;
    viewInteractiveSubtitle: string;
    relatedArticles: string;
    tableOfContents: string;
  };
  nav: {
    home: string;
    articles: string;
    frontend: string;
    backend: string;
    database: string;
    cloud: string;
    decisionMatrix: string;
    functionPoints: string;
    courses: string;
    business: string;
    about: string;
    editorial: string;
    contact: string;
    terms: string;
    privacy: string;
  };
  home: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    heroCtaArticles: string;
    heroCtaCompare: string;
    recentArticlesTitle: string;
    recentArticlesSubtitle: string;
    seeAllArticles: string;
  };
  article: {
    problemContextTitle: string;
    tradeoffsTitle: string;
    advantages: string;
    disadvantages: string;
    whenToChoose: string;
    codeComparisonTitle: string;
    pitfallsTitle: string;
    conclusionTitle: string;
  };
}
