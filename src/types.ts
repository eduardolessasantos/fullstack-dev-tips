export type PageId = 'home' | 'frontend' | 'backend' | 'database';

export type FrontendFramework = 'angular' | 'vue' | 'react';

export type BackendLanguage = 'dotnet' | 'java' | 'python' | 'go';

export type DatabaseTab = 'nosql' | 'relational';

export interface FrontendComparison {
  id: string;
  title: string;
  desc: string;
  category: string;
  codes: {
    angular: { code: string; lang: string; notes: string };
    vue: { code: string; lang: string; notes: string };
    react: { code: string; lang: string; notes: string };
  };
}

export interface BackendComparison {
  id: BackendLanguage;
  name: string;
  tagline: string;
  accentColor: string;
  model: {
    filename: string;
    code: string;
    lang: string;
    explanation: string;
  };
  controller: {
    filename: string;
    code: string;
    lang: string;
    explanation: string;
  };
  route: {
    endpoint: string;
    code: string;
    lang: string;
    explanation: string;
  };
}

export interface NoSQLItem {
  name: string;
  category: string;
  whenToUse: string;
  whenNotToUse: string;
  dataModel: string;
  exampleQuery: string;
  queryLang: string;
}

export interface RelationalOptimization {
  id: string;
  title: string;
  badge: string;
  summary: string;
  problem: string;
  solution: string;
  sqlBefore: string;
  sqlAfter: string;
  impact: string;
}
