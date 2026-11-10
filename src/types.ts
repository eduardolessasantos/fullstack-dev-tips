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
  | 'business'
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

export type EconomicSectorId =
  | 'retail'
  | 'industry'
  | 'services'
  | 'health'
  | 'logistics'
  | 'agro'
  | 'fintech';

export type CompanySize = 'micro' | 'small' | 'medium' | 'corporate';

export type DigitalMaturityLevel = 'manual' | 'spreadsheets' | 'legacy_desktop' | 'isolated_cloud';

export type ProjectPrimaryGoal =
  | 'process_automation'
  | 'client_portal_app'
  | 'custom_erp'
  | 'bi_data_intelligence'
  | 'cloud_migration';

export interface EconomicSector {
  id: EconomicSectorId;
  name: string;
  tagline: string;
  iconName: string;
  badge: string;
  typicalNiches: string[];
  primaryChallenges: string[];
  recommendedFrontend: string;
  recommendedBackend: string;
  recommendedDatabase: string;
  recommendedCloud: string;
  architectureHighlight: string;
  lgpdConsiderations: string[];
}

export interface BusinessAssessmentInput {
  sectorId: EconomicSectorId;
  specificNiche: string;
  companySize: CompanySize;
  maturityLevel: DigitalMaturityLevel;
  primaryGoal: ProjectPrimaryGoal;
  customRequirements?: string;
}

export interface CostBreakdownItem {
  category: string;
  hours: number;
  percentage: number;
  estimatedCostMin: number;
  estimatedCostMax: number;
  description: string;
}

export interface BusinessAssessmentResult {
  sector: EconomicSector;
  input: BusinessAssessmentInput;
  capexMin: number;
  capexMax: number;
  opexMonthlyMin: number;
  opexMonthlyMax: number;
  timelineWeeksMin: number;
  timelineWeeksMax: number;
  sprintsCount: number;
  recommendedSquad: { role: string; count: number; allocation: string }[];
  costBreakdown: CostBreakdownItem[];
  cloudSimulation: {
    provider: string;
    tier: string;
    services: string[];
    estimatedMonthlyBrl: number;
  };
  rolloutPhases: {
    phase: string;
    duration: string;
    deliverables: string[];
  }[];
  strategicRisks: { risk: string; impact: 'Alto' | 'Médio' | 'Baixo'; mitigation: string }[];
  complianceChecklist: string[];
}

export interface LeadCaptureData {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  wantsConsultation: boolean;
}

