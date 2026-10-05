export type PageId =
  | 'home'
  | 'articles'
  | 'article'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'cloud'
  | 'courses'
  | 'decision-matrix'
  | 'function-points'
  | 'about'
  | 'editorial'
  | 'contact'
  | 'terms';

export type FrontendFramework = 'angular' | 'vue' | 'react';

export type BackendLanguage = 'dotnet' | 'java' | 'python' | 'go';

export type DatabaseTab = 'nosql' | 'relational';

export interface ArticleAuthor {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  github?: string;
  linkedin?: string;
}

export interface ArticleBenchmark {
  metric: string;
  stackA: string;
  stackB: string;
  stackC?: string;
  observation: string;
}

export interface DetailedArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'frontend' | 'backend' | 'database' | 'architecture';
  tag: string;
  targetTab?: string;
  targetPage?: PageId;
  readingTime: string;
  date: string;
  updatedAt: string;
  author: ArticleAuthor;
  summary: string;
  introduction: string[];
  contextProblem: {
    title: string;
    description: string;
    symptoms: string[];
  };
  benchmarks?: {
    title: string;
    description: string;
    data: ArticleBenchmark[];
  };
  keyTradeoffs: {
    title: string;
    pros: string[];
    cons: string[];
    whenToChoose: string;
  }[];
  codeComparison?: {
    title: string;
    description: string;
    snippets: {
      label: string;
      language: string;
      filename: string;
      code: string;
      explanation: string;
    }[];
  };
  pitfalls: string[];
  conclusion: string[];
  relatedArticleIds: string[];
}

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

export type FormationCategory = 'all' | 'certifications' | 'backend' | 'frontend' | 'cloud' | 'architecture';
export type FormationLevel = 'Iniciante' | 'Intermediário' | 'Avançado' | 'Especialista';
export type CertificationProvider = 'AWS' | 'Microsoft Azure' | 'HashiCorp' | 'Full-Stack';

export interface FormationModule {
  title: string;
  hours?: string;
  topics: string[];
}

export interface ExamDomain {
  domain: string;
  weight: string;
  description: string;
}

export interface WeeklyStudyPlan {
  week: string;
  focus: string;
  deliverables: string;
}

export interface Formation {
  id: string;
  title: string;
  subtitle: string;
  category: FormationCategory;
  provider: CertificationProvider;
  level: FormationLevel;
  duration: string;
  examCode?: string;
  badgeColor: string;
  technologies: string[];
  description: string;
  targetAudience: string;
  prerequisites: string[];
  skillsLearned: string[];
  modules: FormationModule[];
  examDomains?: ExamDomain[];
  officialGuideUrl?: string;
  relatedArticleId?: string;
  relatedPageId?: PageId;
  relatedTab?: string;
  weeklyPlan?: WeeklyStudyPlan[];
}
