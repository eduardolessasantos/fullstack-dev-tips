import {
  BackendComparison,
  BackendLanguage,
  CodeForFunBadge,
  CodeForFunLanguage,
  CodeForFunMode,
  CodeForFunTrack,
  CompanySize,
  DetailedArticle,
  DigitalMaturityLevel,
  EconomicSector,
  EconomicSectorId,
  Formation,
  FormationLevel,
  FrontendComparison,
  NoSQLItem,
  ProjectPrimaryGoal,
  RelationalOptimization
} from '../types.ts';
import type {
  CloudArchitectureScenario,
  CloudServiceComparison
} from '../data/cloudData.ts';
import type {
  CaseStudyItem,
  FunctionPointWeight,
  TechProductivityMetric
} from '../data/functionPointsData.ts';

export type SupportedLanguage = 'pt' | 'en' | 'es';

export type TranslationNamespace =
  | 'institutional'
  | 'stacks'
  | 'articles'
  | 'cloudCourses'
  | 'engineeringTools'
  | 'business'
  | 'codeForFun';

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
    loadingTranslation: string;
    languageMenuTitle: string;
    languageMenuHeader: string;
    openMenuAria: string;
    close: string;
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
    codeForFun: string;
    courses: string;
    business: string;
    about: string;
    editorial: string;
    contact: string;
    terms: string;
    privacy: string;
    privacyAndLgpd: string;
    badgeDeepDives: string;
    badgeMatrix: string;
    badgeApf: string;
    badgeCloud: string;
    badgeCourses: string;
    badgePlay: string;
    groupFrontend: string;
    groupBackend: string;
    groupDatabase: string;
    groupInstitutional: string;
    badge3Stacks: string;
    badge4Stacks: string;
    badgeInfra: string;
    angularSignals: string;
    vueComposition: string;
    reactHooks: string;
    dotnetCsharp: string;
    javaSpring: string;
    pythonFastApi: string;
    goFiber: string;
    nosqlUtilities: string;
    relationalOpt: string;
  };
  home: {
    heroBadge: string;
    heroTitle: string;
    heroTitleBefore: string;
    heroTitleHighlight: string;
    heroTitleAfter: string;
    heroSubtitle: string;
    heroSubtitleLead: string;
    heroCtaArticles: string;
    heroCtaCompare: string;
    ctaFrontend: string;
    ctaBackend: string;
    ctaDatabase: string;
    ctaApf: string;
    ctaCloud: string;
    ctaCourses: string;
    ctaCodeForFun: string;
    recentArticlesTitle: string;
    recentArticlesSubtitle: string;
    publishedArticlesBadge: string;
    readFullArticle: string;
    seeAllArticles: string;
    matrixBannerBadge: string;
    matrixBannerTitle: string;
    matrixBannerDesc: string;
    matrixBannerCta: string;
    apfBannerBadge: string;
    apfBannerTitle: string;
    apfBannerDesc: string;
    apfBannerCta: string;
    cloudBannerBadge: string;
    cloudBannerTitle: string;
    cloudBannerDesc: string;
    cloudBannerCta: string;
    coursesBannerBadge: string;
    coursesBannerTitle: string;
    coursesBannerDesc: string;
    coursesBannerCta: string;
    businessBannerBadge: string;
    businessBannerTitle: string;
    businessBannerDesc: string;
    businessBannerCta: string;
    codeForFunBannerBadge: string;
    codeForFunBannerTitle: string;
    codeForFunBannerDesc: string;
    codeForFunBannerCta: string;
  };
  article: {
    problemContextTitle: string;
    symptomsLabel: string;
    benchmarkMetric: string;
    benchmarkTechA: string;
    benchmarkTechB: string;
    benchmarkTechC: string;
    benchmarkAnalysis: string;
    tradeoffsTitle: string;
    advantages: string;
    disadvantages: string;
    whenToChoose: string;
    codeComparisonTitle: string;
    pitfallsTitle: string;
    conclusionTitle: string;
    tocIntro: string;
    tocProblem: string;
    tocBenchmarks: string;
    tocTradeoffs: string;
    tocCode: string;
    tocConclusion: string;
  };
  articlesList: {
    badge: string;
    title: string;
    subtitle: string;
    filteringBy: string;
    foundSingular: string;
    foundPlural: string;
    clearFilter: string;
    readFull: string;
    emptyTitle: string;
    emptyDescBefore: string;
    emptyDescAfter: string;
    viewAll: string;
  };
  stacksChrome: {
    frontendBadge: string;
    frontendTitle: string;
    frontendSubtitle: string;
    toggleSingleMode: string;
    toggleSplitMode: string;
    toggleModeTitle: string;
    topicPrefix: string;
    topicOf: string;
    implIn: string;
    implNote: string;
    backendBadge: string;
    backendTitle: string;
    backendSubtitle: string;
    stackPrefix: string;
    stackHighlight: string;
    step1Badge: string;
    step1Title: string;
    step2Badge: string;
    step2Title: string;
    step3Badge: string;
    step3TitleBefore: string;
    step3TitleAfter: string;
    dbBadge: string;
    dbTitle: string;
    dbSubtitle: string;
    tabNosql: string;
    tabRelational: string;
    pragmaticRuleLabel: string;
    pragmaticRuleText: string;
    colTech: string;
    colWhenUse: string;
    colWhenAvoid: string;
    colDataModel: string;
    queryExamplePrefix: string;
    problemLabel: string;
    solutionLabel: string;
    sqlCompareLabel: string;
  };
  codeBlock: {
    line: string;
    lines: string;
    copy: string;
    copied: string;
    copyTitle: string;
  };
  lgpd: {
    bannerTitle: string;
    bannerDescBefore: string;
    bannerDescAfter: string;
    readPolicyBtn: string;
    preferencesBtn: string;
    declineBtn: string;
    acceptAllBtn: string;
    modalTitle: string;
    necessaryTitle: string;
    necessaryDesc: string;
    requiredBadge: string;
    analyticsTitle: string;
    analyticsDesc: string;
    adsTitle: string;
    adsDesc: string;
    cancelBtn: string;
    saveBtn: string;
  };
  privacy: {
    title: string;
    subtitle: string;
    s1Title: string;
    s1Body: string;
    s2Title: string;
    s2Body: string;
    s2Bullets: string[];
    s2LinkText1: string;
    s2Between: string;
    s2LinkText2: string;
    s3Title: string;
    s3Body: string;
    s4Title: string;
    s4Intro: string;
    s4Cards: { title: string; desc: string }[];
    s5Title: string;
    s5Body: string;
    closeBtn: string;
  };
  footer: {
    brandTitle: string;
    brandSubtitle: string;
    verifiedBadge: string;
    colCore: string;
    colComparisons: string;
    colInstitutional: string;
    colLegal: string;
    linkHome: string;
    linkArticles: string;
    linkMatrix: string;
    linkApf: string;
    linkBusiness: string;
    linkCloud: string;
    linkCourses: string;
    linkCodeForFun: string;
    linkFrontend: string;
    linkBackend: string;
    linkDatabase: string;
    linkAbout: string;
    linkEditorial: string;
    linkContact: string;
    linkPrivacy: string;
    linkTerms: string;
    copyrightSuffix: string;
    authorRole: string;
  };
  searchMeta: {
    articleCategoryPrefix: string;
    formationCategoryPrefix: string;
    matrixTitle: string;
    matrixCat: string;
    apfTitle: string;
    apfCat: string;
    businessTitle: string;
    businessCat: string;
    cloudTitle: string;
    cloudCat: string;
    codeForFunTitle: string;
    codeForFunCat: string;
    aboutTitle: string;
    aboutCat: string;
    frontendCat: string;
    backendCat: string;
    backendCrudSuffix: string;
    dbCat: string;
    sqlOptCat: string;
  };
  seo: {
    defaultDesc: string;
    homeTitle: string;
    articlesTitle: string;
    businessTitle: string;
    businessDesc: string;
    apfTitle: string;
    matrixTitle: string;
    cloudTitle: string;
    coursesTitle: string;
    codeForFunTitle: string;
    codeForFunDesc: string;
    frontendTitle: string;
    backendTitle: string;
    databaseTitle: string;
    aboutTitle: string;
    editorialTitle: string;
    contactTitle: string;
    termsTitle: string;
  };
}

// ============================================================================
// LAZY NAMESPACE PAYLOAD TYPES
// ============================================================================

export interface InstitutionalLocale {
  about: {
    badge: string;
    title: string;
    subtitle: string;
    founderBadge: string;
    role: string;
    locationLine: string;
    paragraphs: string[];
    contactBtn: string;
    methodTitle: string;
    methodSubtitle: string;
    cards: { step: string; title: string; desc: string }[];
    commitmentTitle: string;
    commitmentBody: string;
  };
  editorial: {
    badge: string;
    title: string;
    subtitle: string;
    principles: { num: string; title: string; desc: string }[];
    errataTitle: string;
    errataBodyBefore: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    directTitle: string;
    locationLabel: string;
    locationValue: string;
    responseLabel: string;
    responseValue: string;
    devTipTitle: string;
    devTipBody: string;
    successTitle: string;
    successBody: string;
    sendAnotherBtn: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjects: { value: string; label: string }[];
    messageLabel: string;
    messagePlaceholder: string;
    errorDelivery: string;
    errorNetwork: string;
    sendingBtn: string;
    sendBtn: string;
  };
  terms: {
    badge: string;
    title: string;
    subtitle: string;
    sections: { title: string; paragraphs: string[] }[];
  };
}

export interface StacksLocale {
  frontend: FrontendComparison[];
  backend: Record<BackendLanguage, BackendComparison>;
  nosql: NoSQLItem[];
  relational: RelationalOptimization[];
}

export interface ArticlesLocale {
  articles: DetailedArticle[];
}

export interface CloudCategoryOption {
  id: 'all' | 'storage' | 'deploy' | 'cicd' | 'functions' | 'scenarios';
  label: string;
}

export interface CloudCoursesLocale {
  cloudUi: {
    updatedLabel: string;
    awsBadgeLabel: string;
    azureBadgeLabel: string;
    vsLabel: string;
    titleBefore: string;
    titleVs: string;
    subtitle: string;
    pillarStorageTitle: string;
    pillarStorageSub: string;
    pillarDeployTitle: string;
    pillarDeploySub: string;
    pillarCicdTitle: string;
    pillarCicdSub: string;
    pillarFunctionsTitle: string;
    pillarFunctionsSub: string;
    winnerLabel: string;
    winnerTie: string;
    keyFeaturesLabel: string;
    strengthsLabel: string;
    weaknessesLabel: string;
    pricingLabel: string;
    hideCodeLabel: string;
    viewCodeLabel: string;
    deepDiveTagSuffix: string;
    awsShortBadge: string;
    azureShortBadge: string;
    defaultAwsCodeTitle: string;
    defaultAzureCodeTitle: string;
    metricsTitle: string;
    metricLatency: string;
    metricScalability: string;
    metricDx: string;
    metricEcosystem: string;
    deepDiveLabel: string;
    verdictSummaryLabel: string;
    whenAwsLabel: string;
    whenAzureLabel: string;
    simulatorBadge: string;
    simulatorTitle: string;
    simulatorSubtitle: string;
    activeScenarioLabel: string;
    simulateStackLabel: string;
    awsStackHeader: string;
    azureStackHeader: string;
    awsNotesLabel: string;
    azureNotesLabel: string;
    workloadConcurrency: string;
    workloadDatabase: string;
    workloadFramework: string;
    workloadCompliance: string;
    computeLabel: string;
    storageLabel: string;
    cicdLabel: string;
    functionsLabel: string;
    networkingLabel: string;
    costEstimateLabel: string;
    rationaleTitle: string;
    mappingTable: {
      title: string;
      subtitle: string;
      colDomain: string;
      colAws: string;
      colAzure: string;
      colDiff: string;
      rows: { domain: string; aws: string; azure: string; diff: string }[];
    };
    ctaBadge: string;
    ctaDecisionTitle: string;
    ctaDecisionDesc: string;
    ctaDecisionBtn: string;
    ctaBusinessBtn: string;
  };
  cloudCategories: CloudCategoryOption[];
  cloudComparisons: CloudServiceComparison[];
  cloudScenarios: CloudArchitectureScenario[];
  coursesUi: {
    headerBadge: string;
    headerTitle: string;
    headerSubtitle: string;
    statPaths: string;
    statExams: string;
    statExamsSuffix: string;
    statFocus: string;
    statFocusValue: string;
    statAligned: string;
    statWeeklyPlans: string;
    searchPlaceholder: string;
    levelFilterLabel: string;
    levelAll: string;
    levels: { id: FormationLevel; label: string }[];
    levelMap: Record<FormationLevel, string>;
    categories: { id: string; label: string }[];
    allFormationsTabPrefix: string;
    officialCertsTabPrefix: string;
    showingCount: string;
    formationSingular: string;
    formationPlural: string;
    clearFilters: string;
    emptyTitle: string;
    emptyDescBefore: string;
    emptyDescAfter: string;
    resetBtn: string;
    modulesUnit: string;
    techStackLabel: string;
    badgeExamPrefix: string;
    viewCurriculumBtn: string;
    targetAudienceLabel: string;
    prerequisitesLabel: string;
    skillsLabel: string;
    syllabusTab: string;
    examTab: string;
    roadmapTab: string;
    officialGuideBtn: string;
    officialGuideLinkLabel: string;
    relatedArticleBtn: string;
    relatedArticleTitleAttr: string;
    relatedCloudBtn: string;
    relatedPageTitleAttr: string;
    closeModalBtn: string;
    modalTitleSuffix: string;
    modalFooterAttribution: string;
    modulesTitle: string;
    topicsCountLabel: string;
    examDomainsTitle: string;
    examBlueprintPrefix: string;
    examBlueprintDesc: string;
    examWeightLabel: string;
    weeklyPlanTitle: string;
    deliverablesLabel: string;
  };
  formations: Formation[];
}

export interface EngineeringToolsLocale {
  matrixUi: {
    badge: string;
    title: string;
    subtitle: string;
    sectionTitle: string;
    q1Label: string;
    q1Options: { id: 'mvp' | 'saas' | 'enterprise' | 'realtime'; label: string; desc: string }[];
    q2Label: string;
    q2Options: { id: 'junior' | 'polyglot' | 'corporate'; label: string; desc: string }[];
    q3Label: string;
    q3Options: { id: 'small' | 'medium' | 'massive'; label: string; desc: string }[];
    diagBadge: string;
    diagTitle: string;
    diagSeal: string;
    cardFrontend: string;
    cardFrontendBtn: string;
    cardBackend: string;
    cardBackendBtn: string;
    cardDatabase: string;
    cardDatabaseBtn: string;
    warningPrefix: string;
    recommendations: Record<
      'mvp' | 'saas' | 'enterprise' | 'realtime',
      {
        frontend: { name: string; subTab: string; tag: string; reason: string };
        backend: { name: string; subTab: string; tag: string; reason: string };
        database: { name: string; subTab: string; tag: string; reason: string };
        warnings: string[];
      }
    >;
    massiveTrafficBackend: {
      name: string;
      subTab: string;
      tag: string;
      reason: string;
    };
  };
  fpUi: {
    badge: string;
    title: string;
    subtitle: string;
    methodologyBadge: string;
    normIso: string;
    normIsbsg: string;
    normNeutral: string;
    kpiTotalPfa: string;
    kpiEffortHours: string;
    kpiTimeline: string;
    kpiEstimatedBugs: string;
    weeksUnit: string;
    sprintsUnit: string;
    hoursUnit: string;
    hoursShortUnit: string;
    slocLinesUnit: string;
    maintUnit: string;
    calcSectionTitle: string;
    calcSectionSubtitle: string;
    calculatorKicker: string;
    calculatorLoadExampleBtn: string;
    calculatorDownloadSheetBtn: string;
    calculatorDownloadSheetTitle: string;
    calculatorStep1Title: string;
    calculatorStep2Title: string;
    pfUnit: string;
    elements: Record<'ALI' | 'AIE' | 'EE' | 'SE' | 'CE', { label: string; low: string; med: string; high: string }>;
    backendOptions: { id: string; label: string }[];
    frontendOptions: { id: string; label: string }[];
    dbOptions: { id: string; label: string }[];
    sprintOptions: { id: string; label: string }[];
    summaryKicker: string;
    functionalSizeLabel: string;
    rawFpLabel: string;
    totalEffortTitle: string;
    avgPrefix: string;
    estTimelineTitle: string;
    devsShortUnit: string;
    estCodeTitle: string;
    linesApproxPrefix: string;
    linesApproxUnit: string;
    expectedDefectsTitle: string;
    bugsUnit: string;
    prodYearNote: string;
    layerDistLabel: string;
    backendLayerLabel: string;
    frontendLayerLabel: string;
    dbLayerLabel: string;
    annualMaintLabel: string;
    perYearUnit: string;
    spreadsheetBtnTitle: string;
    spreadsheetBtnLabel: string;
    downloadSuccessMsg: string;
    excelCompatNote: string;
    downloadCsvBtn: string;
    downloadedCsvBtn: string;
    dataFunctionsTitle: string;
    txFunctionsTitle: string;
    lowLabel: string;
    medLabel: string;
    highLabel: string;
    unadjustedFpLabel: string;
    vafLabel: string;
    adjustedFpLabel: string;
    stackConfigTitle: string;
    backendLabel: string;
    frontendLabel: string;
    databaseLabel: string;
    complexityLabel: string;
    complexityOptions: { id: 'low' | 'standard' | 'high' | 'critical'; label: string; factorLabel: string }[];
    teamSizeLabel: string;
    devsUnit: string;
    sprintLenLabel: string;
    gscToggleShow: string;
    gscToggleHide: string;
    gscTitle: string;
    gscFormulaDesc: string;
    matrixKicker: string;
    matrixExportBtn: string;
    matrixExportTitle: string;
    colAbbr: string;
    referenceTableTitle: string;
    referenceTableSubtitle: string;
    colElement: string;
    colDesc: string;
    colWeights: string;
    colMapping: string;
    benchmarkKicker: string;
    benchmarkDownloadBtn: string;
    benchmarkDownloadTitle: string;
    techBenchmarkTitle: string;
    techBenchmarkSubtitle: string;
    filterAll: string;
    filterBackend: string;
    filterFrontend: string;
    filterDatabase: string;
    colTechVersion: string;
    colAvgRate: string;
    colTypicalRange: string;
    colSlocPerFp: string;
    colMaintYear: string;
    colBugsPer1000: string;
    colFactors: string;
    catLabels: Record<'backend' | 'frontend' | 'database', string>;
    hoursPerFpLabel: string;
    slocPerFpLabel: string;
    maintLabel: string;
    defectsLabel: string;
    useCaseLabel: string;
    caseStudyKicker: string;
    caseStudyTitle: string;
    caseStudySubtitle: string;
    caseStudyTotalLabel: string;
    caseStudyPfnaTotalLabel: string;
    caseStudyVafPrefix: string;
    colCaseType: string;
    colCaseItem: string;
    colCaseComplexity: string;
    colCaseFp: string;
    colCaseImpl: string;
    complexityDisplay: Record<'Baixa' | 'Média' | 'Alta', string>;
    dateLocale: string;
    csvFilename: string;
    csv: {
      docTitle: string;
      portalLabel: string;
      portalVal: string;
      methodLabel: string;
      methodVal: string;
      dateLabel: string;
      sec1Title: string;
      sec1Headers: string[];
      pfnaLabel: string;
      pfnaNote: string;
      complexityLabel: string;
      complexityNote: string;
      vafLabel: string;
      vafNote: string;
      pfaLabel: string;
      pfaNote: string;
      avgProdLabel: string;
      avgProdNote: string;
      effortLabel: string;
      effortNote: string;
      teamLabel: string;
      teamNote: string;
      sprintLabel: string;
      sprintNote: string;
      timelineLabel: string;
      timelineApproxPrefix: string;
      timelineApproxSuffix: string;
      kslocLabel: string;
      kslocLinesPrefix: string;
      kslocLinesSuffix: string;
      defectsLabel: string;
      defectsNote: string;
      maintLabel: string;
      maintNote: string;
      sec2Title: string;
      sec2Headers: string[];
      components: { abbr: string; name: string }[];
      subtotalDataLabel: string;
      subtotalTxLabel: string;
      totalPfnaLabel: string;
      sec3Title: string;
      sec3Headers: string[];
      layerBackend: string;
      layerFrontend: string;
      layerDb: string;
      totalIntegrated: string;
      fullStackLabel: string;
    };
  };
  fpWeights: FunctionPointWeight[];
  fpMetrics: TechProductivityMetric[];
  fpCaseStudy: CaseStudyItem[];
  fpGscList: { id: number; name: string; description: string }[];
}

export interface BusinessLocale {
  ui: {
    badge: string;
    title: string;
    subtitle: string;
    steps: { step: number; title: string; desc: string }[];
    stepCounterPrefix: string;
    stepCounterOf: string;
    step1Title: string;
    step2Title: string;
    sectorTitle: string;
    sectorSubtitle: string;
    suggestedStackPrefix: string;
    nichePrompt: string;
    nicheLabel: string;
    nichePlaceholder: string;
    sizeTitle: string;
    sizeSubtitle: string;
    sizeLabel: string;
    typicalSquadPrefix: string;
    maturityTitle: string;
    maturitySubtitle: string;
    maturityLabel: string;
    migrationFactorLabel: string;
    goalTitle: string;
    goalSubtitle: string;
    goalLabel: string;
    baseTimelineLabel: string;
    customReqLabel: string;
    customReqPlaceholder: string;
    prevStepBtn: string;
    nextStepBtn: string;
    generateBtn: string;
    projectionTitle: string;
    estimatedForPrefix: string;
    previewBtnTitle: string;
    completeBtnTitle: string;
    previewSuccessNotice: string;
    completeSuccessNotice: string;
    downloadPreviewPdf: string;
    downloadFullPdf: string;
    resetBtn: string;
    kpiCapex: string;
    kpiOpex: string;
    kpiTimeline: string;
    kpiSprints: string;
    perMonth: string;
    weeks: string;
    sprintsOf2Weeks: string;
    professionalsUnit: string;
    squadSummaryNote: string;
    archBadgeNote: string;
    archPatternLabel: string;
    challengesTitle: string;
    archTitle: string;
    cloudSimTitle: string;
    tierLabel: string;
    monthlyInfraEst: string;
    breakdownTitle: string;
    squadTitle: string;
    rolloutTitle: string;
    risksTitle: string;
    impactLabel: string;
    mitigationLabel: string;
    complianceTitle: string;
    lgpdSectorTitle: string;
    modalBadge: string;
    modalTitle: string;
    modalSubtitle: string;
    modalNameLabel: string;
    modalNamePlaceholder: string;
    modalEmailLabel: string;
    modalEmailPlaceholder: string;
    modalPhoneLabel: string;
    modalPhonePlaceholder: string;
    modalCompanyLabel: string;
    modalCompanyPlaceholder: string;
    modalConsultCheck: string;
    modalSubmitBtn: string;
    modalSubmittingBtn: string;
    modalCancelBtn: string;
    modalPrivacyNote: string;
    formspreeLeadType: string;
    formspreeNotProvided: string;
    formspreeConsultYes: string;
    formspreeConsultNo: string;
    formspreeNoCustomReq: string;
    rangeJoin: string;
    impactMap: Record<'Alto' | 'Médio' | 'Baixo', string>;
  };
  sectors: Record<EconomicSectorId, EconomicSector>;
  companySizes: Record<
    CompanySize,
    {
      label: string;
      badge: string;
      description: string;
      typicalStaff: string;
      costMultiplier: number;
      timeMultiplier: number;
    }
  >;
  maturityLevels: Record<
    DigitalMaturityLevel,
    {
      label: string;
      badge: string;
      summary: string;
      complexityFactor: number;
    }
  >;
  projectGoals: Record<
    ProjectPrimaryGoal,
    {
      label: string;
      badge: string;
      description: string;
      baseCapex: number;
      baseOpexMonthly: number;
      baseWeeks: number;
    }
  >;
  assessmentTemplates: {
    hoursUnit: string;
    costBreakdown: { category: string; description: string }[];
    squad: {
      role: string;
      allocationFull: string;
      allocationPartial: string;
      allocationPunctual: string;
      allocationFinal: string;
    }[];
    cloudTiers: { micro: string; small: string; enterprise: string };
    cloudServices: string[];
    rolloutPhases: { phase: string; durationPrefix: string; durationJoin: string; deliverables: string[] }[];
    risks: { risk: string; mitigation: string }[];
    complianceChecklist: string[];
  };
  pdf: {
    headerBrand: string;
    previewBadge: string;
    previewBannerTitle: string;
    previewHeaderSubtitle: string;
    coverBadge: string;
    coverTitle: string;
    coverSubtitle: string;
    generatedAt: string;
    preparedFor: string;
    sectorLabel: string;
    nicheLabel: string;
    sizeLabel: string;
    maturityLabel: string;
    goalLabel: string;
    customScopeLabel: string;
    metaHeaders: { colA: string; colB: string; labelCompany: string; labelEmail: string; labelPhone: string };
    summaryTitle: string;
    capexLabel: string;
    capexSubnote: string;
    opexLabel: string;
    opexSubnote: string;
    timelineLabel: string;
    sprintsSubnotePrefix: string;
    sprintsSubnoteSuffix: string;
    sprintsUnit: string;
    weeksUnit: string;
    perMonth: string;
    rangeJoin: string;
    premisesTitle: string;
    operationalImpactPrefix: string;
    challengesTitle: string;
    recommendedStackTitle: string;
    recommendedStackPreviewTitle: string;
    stackLayers: {
      frontend: string;
      backend: string;
      database: string;
      cloud: string;
    };
    stackLayerNames: {
      frontend: string;
      backend: string;
      database: string;
      cloud: string;
    };
    techRecommendedPrefix: string;
    stackGenericSpecs: { title: string; detail: string }[];
    inviteBoxTitle: string;
    inviteBoxLines: string[];
    completeTitle: string;
    completeHeaderBrand: string;
    completePage2Title: string;
    completeArchTitle: string;
    completeArchHighlightLabel: string;
    completeChallengesTitle: string;
    completePage3Title: string;
    completePage3Subtitle: string;
    completePage4Title: string;
    completePage4Subtitle: string;
    completePage5Title: string;
    completePage6Title: string;
    cloudTitle: string;
    cloudProviderLabel: string;
    cloudTierLabel: string;
    cloudEstMonthlyLabel: string;
    cloudServicesLabel: string;
    breakdownTitle: string;
    colCategory: string;
    colHours: string;
    colShare: string;
    colInvestment: string;
    squadTitle: string;
    squadAllocPrefix: string;
    squadCountPrefix: string;
    rolloutTitle: string;
    rolloutDurationPrefix: string;
    rolloutNotesTitle: string;
    rolloutNotes: string[];
    risksTitle: string;
    impactBadgePrefix: string;
    mitigationPrefix: string;
    complianceTitle: string;
    lgpdTitle: string;
    nextStepsTitle: string;
    nextSteps: string[];
    finalCtaTitle: string;
    finalCtaBody: string;
    finalCtaContact: string;
    footerPage: string;
    footerOf: string;
    footerDisclaimer: string;
    footerPreviewNote: string;
    currencyLocale: string;
    currencyCode: string;
    filenamePreviewPrefix: string;
    filenameCompletePrefix: string;
  };
}

export interface CodeForFunLocale {
  ui: {
    kickerLeft: string;
    kickerRight: string;
    title: string;
    subtitle: string;
    xpLabel: string;
    levelPrefix: string;
    streakLabel: string;
    completedLabel: string;
    badgesBtn: string;
    badgesTitleAttr: string;
    soundOnTitle: string;
    soundOffTitle: string;
    soundMuteAria: string;
    soundUnmuteAria: string;
    nextLevelBefore: string;
    nextLevelAfter: string;
    maxLevelReached: string;
    badgesPanelTitle: string;
    unlockedLabel: string;
    lockedLabel: string;
    filterModeLabel: string;
    filterTrackLabel: string;
    filterLangLabel: string;
    filterModeAria: string;
    filterTrackAria: string;
    filterLangAria: string;
    modeTabAll: string;
    trackFilterOptions: {
      all: string;
      warmup: string;
      'hands-on': string;
      'senior-trap': string;
    };
    langFilterOptions: {
      all: string;
      javascript: string;
      typescript: string;
      python: string;
      sql: string;
    };
    challengesCountSuffix: string;
    completedTag: string;
    estimatedMinSuffix: string;
    minPrefix: string;
    emptyFilterMsg: string;
    clearFiltersBtn: string;
    sqlTablesShow: string;
    sqlTablesHide: string;
    sqlTablesHeading: string;
    sqlTablesColumnsLabel: string;
    editorShortcutHint: string;
    editorAriaLabel: string;
    runBtnRunning: string;
    runBtnIdle: string;
    stepModeBtn: string;
    hintBtnPrefix: string;
    resetBtn: string;
    resetTitle: string;
    loadSolutionBtn: string;
    loadSolutionTitle: string;
    hintsHeader: string;
    canvasTitle: string;
    canvasInitialMsg: string;
    sqlResultTitle: string;
    consoleTitle: string;
    emptyOutputPrompt: string;
    errorBannerTitle: string;
    sqlEmptyRows: string;
    emptyLogsNotice: string;
    traceSqlTitle: string;
    traceMemTitle: string;
    traceStepOf: string;
    tracePhasePrefix: string;
    traceLinePrefix: string;
    traceRestartTitle: string;
    tracePrevTitle: string;
    tracePlayTitle: string;
    tracePauseTitle: string;
    traceNextTitle: string;
    traceMemStateLabel: string;
    validationTitle: string;
    ahaPrefix: string;
    celebrateTitle: string;
    celebrateBadgePrefix: string;
    celebrateXpPrefix: string;
    adLabel: string;
    syntaxCheckFailLabel: string;
    syntaxCheckFailDetail: string;
  };
  modeLabels: Record<CodeForFunMode, string>;
  trackLabels: Record<CodeForFunTrack, string>;
  langLabels: Record<CodeForFunLanguage, string>;
  levelTitles: {
    maxXp: number;
    level: number;
    title: string;
    nextLevelXp: number;
    currentFloorXp: number;
  }[];
  badges: CodeForFunBadge[];
  sqlTableDescriptions: Record<string, string>;
  items: Record<
    string,
    {
      title: string;
      funnyHook: string;
      prompt: string;
      hints: string[];
      ahaTitle: string;
      ahaExplanation: string[];
      starterCode?: string;
      solutionCode?: string;
      checkLabels?: string[];
      checkDetailsPass?: string[];
      checkDetailsFail?: string[];
      expectedStrings?: Record<string, string>;
    }
  >;
  engineMessages: {
    timeoutError: string;
    timeoutRaw: string;
    isNotDefinedError: (name: string) => string;
    isNotFunctionError: string;
    nullPropertyError: string;
    constAssignError: string;
    syntaxError: (raw: string) => string;
    runtimeError: (raw: string) => string;
    noWorkerError: string;
    unknownError: string;
    anonFnLabel: string;
    defaultVarLabel: string;
    python: {
      maxStepsError: string;
      nameError: (name: string) => string;
      nonIterableComprehension: string;
      missingArgError: (fnName: string, argName: string) => string;
      unknownExprError: (expr: string) => string;
      syntaxErrorLine: (line: number, raw: string) => string;
      forNonIterableError: (line: number) => string;
      defNote: (fnName: string, hasDefaults: boolean) => string;
      returnNote: (val: string) => string;
      elseNote: string;
      condEvalNote: (cond: string, ok: boolean) => string;
      forIterNote: (target: string, val: string) => string;
      whileTrueNote: (cond: string) => string;
      whileDoneNote: (cond: string) => string;
      augAssignNote: (varName: string, val: string) => string;
      indexAssignNote: (val: string, lhs: string) => string;
      unpackNote: (lhs: string) => string;
      assignNote: (lhs: string, val: string) => string;
      printNote: (text: string) => string;
      exprNote: (raw: string, val: string | null) => string;
      errorFriendlyPrefix: (raw: string) => string;
    };
    sql: {
      emptyQueryError: string;
      onlySelectError: string;
      invalidFromError: (clause: string) => string;
      tableNotFoundError: (name: string, available: string) => string;
      invalidJoinError: (clause: string) => string;
      joinTableNotFoundError: (name: string) => string;
      colNotFoundJoinError: (col: string) => string;
      colNotFoundSelectError: (col: string) => string;
      invalidWhereError: (cond: string) => string;
      fromPhase: string;
      leftJoinPhase: string;
      innerJoinPhase: string;
      wherePhase: string;
      groupPhase: string;
      selectPhase: string;
      orderPhase: string;
      limitPhase: string;
      varTable: string;
      varRows: string;
      varFilter: string;
      varBefore: string;
      varAfter: string;
      varGroups: string;
      varColumns: string;
      varOrder: string;
      varLimit: string;
      fromStepNote: (rowsCount: number, tableName: string) => string;
      joinStepNote: (isLeft: boolean, rowsCount: number) => string;
      whereStepNote: (clause: string, after: number, before: number) => string;
      groupStepNote: (groupsCount: number, clause: string) => string;
      selectStepNote: (cols: string, rowsCount: number) => string;
      orderStepNote: (clause: string) => string;
      limitStepNote: (limit: number) => string;
      successInfoLog: (rowsCount: number) => string;
    };
  };
}

export interface NamespaceDataMap {
  institutional: InstitutionalLocale;
  stacks: StacksLocale;
  articles: ArticlesLocale;
  cloudCourses: CloudCoursesLocale;
  engineeringTools: EngineeringToolsLocale;
  business: BusinessLocale;
  codeForFun: CodeForFunLocale;
}
