import { EngineeringToolsLocale } from '../../types.ts';

const engineeringToolsEn: EngineeringToolsLocale = {
  matrixUi: {
    badge: 'Interactive Engineering Tool',
    title: 'Architectural Decision Matrix',
    subtitle:
      'Simulate the specific requirements of your next project and receive a pragmatic technical recommendation grounded in real production trade-offs.',
    sectionTitle: 'Define Your Project Constraints',
    q1Label: '1. Software Product Nature',
    q1Options: [
      { id: 'mvp', label: 'MVP / Startup', desc: 'Focus on speed' },
      { id: 'saas', label: 'SaaS / E-commerce', desc: 'High traffic & SEO' },
      { id: 'enterprise', label: 'Enterprise Dashboard', desc: 'Governance & data' },
      { id: 'realtime', label: 'Real-Time / IoT', desc: 'Critical latency' }
    ],
    q2Label: '2. Technical Team Specialty Profile',
    q2Options: [
      { id: 'junior', label: 'Generalist Team (JS/TS)', desc: 'Lower learning curve' },
      { id: 'polyglot', label: 'Senior Polyglot Team', desc: 'Masters multiple languages' },
      { id: 'corporate', label: 'Enterprise Background', desc: 'C#, Java, Microsoft/Oracle ecosystem' }
    ],
    q3Label: '3. Estimated Request Volume',
    q3Options: [
      { id: 'small', label: 'Up to 50k req/day', desc: 'Initial launch traffic' },
      { id: 'medium', label: '100k to 5M req/day', desc: 'Established commercial traffic' },
      { id: 'massive', label: 'Hyper-scale (> 20M)', desc: 'Microsecond-sensitive latency' }
    ],
    diagBadge: 'Automated Diagnosis',
    diagTitle: 'Recommended Architecture for Your Scenario',
    diagSeal: '✓ Engineering Advisory',
    cardFrontend: 'Frontend',
    cardFrontendBtn: 'View comparison on blog',
    cardBackend: 'Backend API',
    cardBackendBtn: 'View CRUD code',
    cardDatabase: 'Database',
    cardDatabaseBtn: 'View data strategies',
    warningPrefix: 'Production Watchpoint:',
    recommendations: {
      mvp: {
        frontend: {
          name: 'Vue.js 3 or React',
          subTab: 'vue',
          tag: 'Time-to-Market',
          reason: 'Maximum implementation speed and a low barrier to entry.'
        },
        backend: {
          name: 'Python (FastAPI)',
          subTab: 'python',
          tag: 'Agile Prototyping',
          reason: 'Automatic OpenAPI/Swagger documentation and rapid typing with Pydantic.'
        },
        database: {
          name: 'Monolithic PostgreSQL',
          subTab: 'relational',
          tag: 'Operational Simplicity',
          reason: 'Do not introduce Redis or NoSQL before proving product traction.'
        },
        warnings: ['Keep business rules decoupled from the framework to ease future backend migrations.']
      },
      saas: {
        frontend: {
          name: 'React 19 + TanStack Query',
          subTab: 'react',
          tag: 'Flexible Frontend',
          reason: 'Largest component ecosystem and engineer hiring pool, paired with robust async caching.'
        },
        backend: {
          name: '.NET 8 (C# Minimal APIs)',
          subTab: 'dotnet',
          tag: 'High Throughput',
          reason: 'Outstanding CPU/RAM cost efficiency in production with strict compile-time typing.'
        },
        database: {
          name: 'PostgreSQL + Redis (Cache-Aside)',
          subTab: 'relational',
          tag: 'Hybrid Persistence',
          reason: 'PostgreSQL guarantees ACID integrity for core entities while Redis absorbs repetitive read spikes.'
        },
        warnings: ['Monitor database connection pool latency as pod replica counts scale up.']
      },
      enterprise: {
        frontend: {
          name: 'Angular 17+ (Signals Standalone)',
          subTab: 'angular',
          tag: 'Enterprise Governance',
          reason: 'Prescriptive structure with strict conventions that curb divergent architectures across large teams.'
        },
        backend: {
          name: 'Java (Spring Boot 3) or .NET 8',
          subTab: 'java',
          tag: 'Enterprise Standard',
          reason: 'Mature tooling, massive corporate ecosystem, and Long-Term Support (LTS).'
        },
        database: {
          name: 'PostgreSQL with Declarative Partitioning',
          subTab: 'relational',
          tag: 'Relational Scale',
          reason: 'Date-based partitioning on audit tables and properly sized B-Tree indexes.'
        },
        warnings: ['Avoid excessive lock-in to proprietary cloud vendor libraries.']
      },
      realtime: {
        frontend: {
          name: 'Vue.js 3.4 (Composition API)',
          subTab: 'vue',
          tag: 'Lightweight Reactivity',
          reason: 'Surgical reactivity without heavy Virtual DOM diffing—ideal for high-frequency telemetry.'
        },
        backend: {
          name: 'Go (Fiber + Goroutines)',
          subTab: 'go',
          tag: 'Ultra-Low Latency',
          reason: 'Tiny RAM footprint per connection (~2 KB per Goroutine) handling tens of thousands of concurrent clients.'
        },
        database: {
          name: 'Redis Streams / Cassandra + PostgreSQL',
          subTab: 'nosql',
          tag: 'Write-Heavy NoSQL',
          reason: 'Cassandra or Redis for massive telemetry ingestion without choking the relational primary.'
        },
        warnings: ['Watch out for Goroutine leaks if cancellation contexts are not propagated properly.']
      }
    },
    massiveTrafficBackend: {
      name: 'Go (Fiber) or .NET 8',
      subTab: 'go',
      tag: 'Massive Concurrency',
      reason: 'Compiled runtimes that eliminate dynamic interpreter overhead under millions of requests.'
    }
  },
  fpUi: {
    badge: 'Software Engineering Metrics • FPA / IFPUG',
    title: 'Function Point Analysis (FPA) & Software Sizing',
    subtitle:
      'Measure functional software size according to international IFPUG (ISO/IEC 20926) and NESMA standards. Discover how each data and transactional element correlates with FastAPI, .NET 8, Spring Boot 3, React, Vue, Angular, and Databases in Hours per Function Point (h/FP), equivalent SLOC, and annual maintenance effort.',
    methodologyBadge: 'IFPUG CPM 4.3.1 Standard',
    normIso: 'Standard: ISO/IEC 20926:2009',
    normIsbsg: 'Delivery Rate: ISBSG Benchmarks',
    normNeutral: 'Technology-Independent Sizing',
    kpiTotalPfa: 'Functional Size (AFP)',
    kpiEffortHours: 'Total Effort',
    kpiTimeline: 'Estimated Timeline',
    kpiEstimatedBugs: 'Expected Defects',
    weeksUnit: 'weeks',
    sprintsUnit: 'sprints',
    hoursUnit: 'hours',
    hoursShortUnit: 'h',
    slocLinesUnit: 'lines',
    maintUnit: 'h/yr',
    calcSectionTitle: 'Function Point Calculator & Sprint Sizing',
    calcSectionSubtitle:
      'Enter your project function counts, pick the target stack, and estimate total effort in hours, sprints, and team size.',
    calculatorKicker: 'Interactive Simulator',
    calculatorLoadExampleBtn: 'Load Default Example',
    calculatorDownloadSheetBtn: 'Download Spreadsheet (.csv / Excel)',
    calculatorDownloadSheetTitle: 'Export formatted spreadsheet for Excel / Google Sheets',
    calculatorStep1Title: '1. Data & Transactional Function Counts',
    calculatorStep2Title: '2. Technology & Team Parameters',
    pfUnit: 'FP',
    elements: {
      ALI: {
        label: 'Internal Logical Files (Tables / Collections)',
        low: 'Low (7 FP)',
        med: 'Average (10 FP)',
        high: 'High (15 FP)'
      },
      AIE: {
        label: 'External Interface Files (External APIs)',
        low: 'Low (5 FP)',
        med: 'Average (7 FP)',
        high: 'High (10 FP)'
      },
      EE: {
        label: 'External Inputs (POST, PUT, DELETE, Writes)',
        low: 'Low (3 FP)',
        med: 'Average (4 FP)',
        high: 'High (6 FP)'
      },
      SE: {
        label: 'External Outputs (Reports, Calculations, Webhooks)',
        low: 'Low (4 FP)',
        med: 'Average (5 FP)',
        high: 'High (7 FP)'
      },
      CE: {
        label: 'External Inquiries (Simple GETs, Paginated Searches)',
        low: 'Low (3 FP)',
        med: 'Average (4 FP)',
        high: 'High (6 FP)'
      }
    },
    backendOptions: [
      { id: 'dotnet', label: '.NET 8 Minimal APIs (C# 12)' },
      { id: 'fastapi', label: 'FastAPI (Python 3.12)' },
      { id: 'spring', label: 'Spring Boot 3 (Java 21)' }
    ],
    frontendOptions: [
      { id: 'react', label: 'React 18 / 19 (TypeScript)' },
      { id: 'vue', label: 'Vue 3.4 (Composition API)' },
      { id: 'angular', label: 'Angular 17+ (Signals)' }
    ],
    dbOptions: [
      { id: 'postgresql', label: 'PostgreSQL 16 (Relational + JSONB)' },
      { id: 'mongodb', label: 'MongoDB 7 (Document Store)' },
      { id: 'redis', label: 'Redis 7 (In-Memory)' }
    ],
    sprintOptions: [
      { id: '1', label: '1 Week (Ultra-agile cycles)' },
      { id: '2', label: '2 Weeks (Industry standard Scrum)' },
      { id: '4', label: '4 Weeks (Monthly cycles)' }
    ],
    summaryKicker: 'Sizing Summary',
    functionalSizeLabel: 'Functional Size:',
    rawFpLabel: 'Unadjusted FP (UFP):',
    totalEffortTitle: 'Total Effort',
    avgPrefix: 'Avg:',
    estTimelineTitle: 'Estimated Timeline',
    devsShortUnit: 'devs',
    estCodeTitle: 'Estimated Codebase',
    linesApproxPrefix: '~',
    linesApproxUnit: 'lines',
    expectedDefectsTitle: 'Expected Defects',
    bugsUnit: 'bugs',
    prodYearNote: 'In production (~1 yr)',
    layerDistLabel: 'Effort Distribution by Layer:',
    backendLayerLabel: 'Backend',
    frontendLayerLabel: 'Frontend',
    dbLayerLabel: 'Database',
    annualMaintLabel: 'Projected Annual Maintenance:',
    perYearUnit: 'h/yr',
    spreadsheetBtnTitle: 'Download Estimation Spreadsheet (.csv / Excel)',
    spreadsheetBtnLabel: 'Download Estimation Spreadsheet (.csv / Excel)',
    downloadSuccessMsg: 'Spreadsheet generated successfully! Check your downloads.',
    excelCompatNote:
      'Compatible with Microsoft Excel, Google Sheets, and LibreOffice Calc. UTF-8 encoded with standard delimiter.',
    downloadCsvBtn: 'Download Spreadsheet (.csv)',
    downloadedCsvBtn: 'Spreadsheet Exported!',
    dataFunctionsTitle: 'Data Functions (Storage)',
    txFunctionsTitle: 'Transactional Functions (Processing)',
    lowLabel: 'Low',
    medLabel: 'Average',
    highLabel: 'High',
    unadjustedFpLabel: 'Unadjusted FP (UFP)',
    vafLabel: 'Value Adjustment Factor (VAF)',
    adjustedFpLabel: 'Adjusted FP (AFP)',
    stackConfigTitle: 'Technology Configuration',
    backendLabel: 'Backend Language',
    frontendLabel: 'Frontend Framework',
    databaseLabel: 'Data Repository',
    complexityLabel: 'Complexity / VAF Factor',
    complexityOptions: [
      { id: 'low', label: 'Low (VAF 0.85 - Simple CRUD)', factorLabel: '0.85x' },
      { id: 'standard', label: 'Average (VAF 1.00 - Corporate standard)', factorLabel: '1.00x' },
      { id: 'high', label: 'High (VAF 1.15 - Concurrency & mTLS)', factorLabel: '1.15x' },
      { id: 'critical', label: 'Critical (VAF 1.30 - Banking / 24x7 / SLA)', factorLabel: '1.30x' }
    ],
    teamSizeLabel: 'Dev Team Size',
    devsUnit: 'devs',
    sprintLenLabel: 'Sprint Duration',
    gscToggleShow: 'Show All 14 GSCs',
    gscToggleHide: 'Hide List',
    gscTitle: 'The 14 General System Characteristics (GSC)',
    gscFormulaDesc:
      'Used in classic IFPUG methodology to compute the Degree of Influence (DI) and Value Adjustment Factor: VAF = 0.65 + (0.01 × TDI).',
    matrixKicker: 'Normative Foundations',
    matrixExportBtn: 'Export FPA Matrix (.csv)',
    matrixExportTitle: 'Export function point spreadsheet',
    colAbbr: 'Code',
    referenceTableTitle: 'Canonical Complexity & Weight Matrix (IFPUG CPM 4.3.1)',
    referenceTableSubtitle:
      'Function Point Analysis classifies user requirements into 5 fundamental components, split into Data Functions (what the system stores) and Transactional Functions (what the system processes).',
    colElement: 'Functional Element',
    colDesc: 'Description',
    colWeights: 'Weights (Low / Avg / High)',
    colMapping: 'Modern Architecture Mapping',
    benchmarkKicker: 'Productivity & Benchmark',
    benchmarkDownloadBtn: 'Download FPA Metrics (.csv)',
    benchmarkDownloadTitle: 'Download productivity metrics spreadsheet',
    techBenchmarkTitle: 'Delivery Rate by Technology (Hours / FP & Equivalent SLOC)',
    techBenchmarkSubtitle:
      'Although a Function Point is language-neutral, actual engineering effort to deliver 1 FP varies noticeably by ecosystem, abstraction level, static typing, and library maturity.',
    filterAll: 'All',
    filterBackend: 'Backend',
    filterFrontend: 'Frontend',
    filterDatabase: 'Databases',
    colTechVersion: 'Technology & Version',
    colAvgRate: 'Average Rate (h / FP)',
    colTypicalRange: 'Typical Range',
    colSlocPerFp: 'SLOC / FP',
    colMaintYear: 'Maintenance (h/FP/yr)',
    colBugsPer1000: 'Bugs / 1,000 FP',
    colFactors: 'Productivity Drivers & Recommendations',
    catLabels: {
      backend: 'backend',
      frontend: 'frontend',
      database: 'database'
    },
    hoursPerFpLabel: 'h/FP',
    slocPerFpLabel: 'SLOC / FP',
    maintLabel: 'Maint./yr',
    defectsLabel: 'Defects / 1k FP',
    useCaseLabel: 'Recommended use case:',
    caseStudyKicker: 'Practical Case Study',
    caseStudyTitle: 'Real-World Mapping: High-Volume Instant Payments Fintech (PIX)',
    caseStudySubtitle:
      'Practical Function Point counting example in a modern architecture built with this portal’s stacks—transactional persistence in PostgreSQL, polymorphic catalog in MongoDB, and session caching in Redis.',
    caseStudyTotalLabel: 'Case Study Total',
    caseStudyPfnaTotalLabel: 'Total Unadjusted Function Points (UFP):',
    caseStudyVafPrefix: 'With Value Adjustment Factor VAF 1.15 (High-Concurrency Systems) =',
    colCaseType: 'Type',
    colCaseItem: 'Business Component',
    colCaseComplexity: 'Complexity',
    colCaseFp: 'Points',
    colCaseImpl: 'Technical Stack Implementation',
    complexityDisplay: {
      Baixa: 'Low',
      Média: 'Average',
      Alta: 'High'
    },
    dateLocale: 'en-US',
    csvFilename: 'function_point_estimation.csv',
    csv: {
      docTitle: 'FUNCTION POINT ANALYSIS (FPA) SIZING & ESTIMATION REPORT',
      portalLabel: 'Portal',
      portalVal: 'CodeCompare - Dev Tech Blog',
      methodLabel: 'Normative Methodology',
      methodVal: 'IFPUG CPM 4.3.1 (ISO/IEC 20926:2009) & NESMA',
      dateLabel: 'Generated On',
      sec1Title: '--- 1. EXECUTIVE SUMMARY ---',
      sec1Headers: ['Metric', 'Value', 'Unit', 'Notes'],
      pfnaLabel: 'Unadjusted Function Points (UFP)',
      pfnaNote: 'Sum of data and transactional functions',
      complexityLabel: 'Complexity Classification',
      complexityNote: 'Based on the 14 GSC factors',
      vafLabel: 'Value Adjustment Factor (VAF)',
      vafNote: 'Non-functional requirements multiplier',
      pfaLabel: 'Adjusted Function Points (AFP)',
      pfaNote: 'Final normalized functional size',
      avgProdLabel: 'Blended Average Productivity',
      avgProdNote: 'Weighted average of selected stack',
      effortLabel: 'Total Estimated Effort',
      effortNote: 'Net engineering development hours',
      teamLabel: 'Team Size',
      teamNote: 'Dedicated engineering team',
      sprintLabel: 'Sprint Duration',
      sprintNote: 'Scrum iteration cycle',
      timelineLabel: 'Estimated Delivery Timeline',
      timelineApproxPrefix: 'Approximately',
      timelineApproxSuffix: 'weeks',
      kslocLabel: 'Equivalent Source Code (KSLOC)',
      kslocLinesPrefix: '~',
      kslocLinesSuffix: 'lines of code',
      defectsLabel: 'Projected Defect Density',
      defectsNote: 'Estimated production incidents in year 1',
      maintLabel: 'Projected Annual Maintenance',
      maintNote: 'Annual corrective and preventive upkeep',
      sec2Title: '--- 2. DETAILED COUNT BY FUNCTION TYPE (IFPUG) ---',
      sec2Headers: ['Code', 'Functional Component', 'Low (qty)', 'Avg (qty)', 'High (qty)', 'Total Count', 'FP Subtotal'],
      components: [
        { abbr: 'ILF', name: 'Internal Logical Files (Own Tables / Entities)' },
        { abbr: 'EIF', name: 'External Interface Files (Consumed APIs / External DBs)' },
        { abbr: 'EI', name: 'External Inputs (POST, PUT, DELETE, Writes)' },
        { abbr: 'EO', name: 'External Outputs (Reports, Calculations, Webhooks)' },
        { abbr: 'EQ', name: 'External Inquiries (Simple GETs, Paginated Queries)' }
      ],
      subtotalDataLabel: 'Data Functions Subtotal (ILF + EIF)',
      subtotalTxLabel: 'Transactional Functions Subtotal (EI + EO + EQ)',
      totalPfnaLabel: 'Grand Total UFP',
      sec3Title: '--- 3. TECHNOLOGY STACK MIX & WEIGHTED EFFORT ---',
      sec3Headers: ['Layer', 'Selected Technology', 'Productivity Rate (h/FP)', 'SLOC / FP', 'Effort Share (%)', 'Estimated Hours (h)'],
      layerBackend: 'Backend',
      layerFrontend: 'Frontend',
      layerDb: 'Database',
      totalIntegrated: 'Integrated Total',
      fullStackLabel: 'Selected Full-Stack'
    }
  },
  fpWeights: [
    {
      type: 'ALI',
      name: 'Internal Logical File (ILF)',
      description: 'Logical group of user-identifiable data maintained entirely inside the application boundary.',
      low: 7,
      medium: 10,
      high: 15,
      mapping:
        'Normalized or partitioned PostgreSQL tables, MongoDB embedded document collections, or primary-persistence Redis structures.'
    },
    {
      type: 'AIE',
      name: 'External Interface File (EIF)',
      description: 'Logical group of data referenced by the application, but maintained by another system.',
      low: 5,
      medium: 7,
      high: 10,
      mapping:
        'Banking APIs, payment gateways (Stripe, Asaas, PIX), identity providers (OAuth2, Keycloak, Auth0), and external corporate registries.'
    },
    {
      type: 'EE',
      name: 'External Input (EI)',
      description: 'Elementary process handling data coming from outside the boundary to create or alter ILFs.',
      low: 3,
      medium: 4,
      high: 6,
      mapping:
        'HTTP POST / PUT / PATCH / DELETE endpoints in FastAPI, .NET 8 Controllers, or Spring Boot performing validation and writes.'
    },
    {
      type: 'SE',
      name: 'External Output (EO)',
      description: 'Elementary process sending data outside the boundary containing derived calculations or state updates.',
      low: 4,
      medium: 5,
      high: 7,
      mapping:
        'Bank statement reconciliation, real-time statistical aggregation, tax reports, and HMAC-signed webhooks.'
    },
    {
      type: 'CE',
      name: 'External Inquiry (EQ)',
      description: 'Elementary process sending data outside the boundary without complex mathematical formulas.',
      low: 3,
      medium: 4,
      high: 6,
      mapping:
        'Simple HTTP GET lookup endpoints and indexed pagination (PostgreSQL B-Tree/GIN, MongoDB compound indexes).'
    }
  ],
  fpMetrics: [
    {
      tech: 'fastapi',
      category: 'backend',
      name: 'FastAPI (Python 3.12)',
      hoursPerFP: { min: 4.5, avg: 6.5, max: 9.0 },
      slocPerFP: 38,
      maintenanceHoursPerYear: 1.8,
      defectDensityPer1000FP: 12.4,
      productivityFactors: [
        'Automatic validation via Pydantic v2 with minimal boilerplate',
        'Swagger / OpenAPI documentation generated natively',
        'Expressive syntax and modern type hints (PEP 585/604)',
        'Fast scaffolding for async route handlers'
      ],
      recommendedUseCase:
        'Agile microservices, aggregation APIs, analytics pipelines, and Machine Learning integrations.'
    },
    {
      tech: 'dotnet',
      category: 'backend',
      name: '.NET 8 Minimal APIs (C# 12)',
      hoursPerFP: { min: 6.0, avg: 8.5, max: 11.5 },
      slocPerFP: 52,
      maintenanceHoursPerYear: 1.4,
      defectDensityPer1000FP: 8.1,
      productivityFactors: [
        'Roslyn source generators eliminating runtime reflection overhead',
        'Entity Framework Core 8 with optimized SQL mapping',
        'Dependency injection and middleware in concise code',
        'Strict compile-time type verification'
      ],
      recommendedUseCase:
        'High-throughput APIs, banking backends, transactional platforms, and resilient corporate systems.'
    },
    {
      tech: 'spring',
      category: 'backend',
      name: 'Spring Boot 3 (Java 21)',
      hoursPerFP: { min: 8.0, avg: 11.0, max: 15.0 },
      slocPerFP: 68,
      maintenanceHoursPerYear: 1.6,
      defectDensityPer1000FP: 7.6,
      productivityFactors: [
        'Unmatched Spring ecosystem maturity (Security, Batch, Cloud)',
        'Virtual Threads (Project Loom) simplifying high-concurrency I/O',
        'More boilerplate and annotation conventions upfront',
        'Longer initial project bootstrap curve'
      ],
      recommendedUseCase:
        'Large enterprise ecosystems, strictly compliant banking systems, and global corporate platforms.'
    },
    {
      tech: 'vue',
      category: 'frontend',
      name: 'Vue 3.4 (Composition API)',
      hoursPerFP: { min: 5.0, avg: 7.0, max: 9.5 },
      slocPerFP: 42,
      maintenanceHoursPerYear: 1.5,
      defectDensityPer1000FP: 9.2,
      productivityFactors: [
        'Fine-grained native reactivity (Ref / Reactive) similar to Signals',
        'Ergonomic Single File Components (SFC) with script setup',
        'Built-in directives (v-if, v-for, v-model) with low friction',
        'Standardized official Pinia and Vue Router stack'
      ],
      recommendedUseCase:
        'Corporate admin dashboards, fast-delivery SaaS apps, and data-dense user interfaces.'
    },
    {
      tech: 'react',
      category: 'frontend',
      name: 'React 18 / 19 (TypeScript)',
      hoursPerFP: { min: 6.5, avg: 8.5, max: 12.0 },
      slocPerFP: 55,
      maintenanceHoursPerYear: 1.9,
      defectDensityPer1000FP: 10.8,
      productivityFactors: [
        'Massive ecosystem of ready-made components and libraries',
        'Higher cognitive load managing re-renders and memoization',
        'Requires architectural choices for routing, forms, and state',
        'Maximum architectural flexibility'
      ],
      recommendedUseCase:
        'Complex multi-team products, universal design systems, and platforms prioritizing broad hiring reach.'
    },
    {
      tech: 'angular',
      category: 'frontend',
      name: 'Angular 17+ (Signals & Standalone)',
      hoursPerFP: { min: 7.0, avg: 9.5, max: 13.0 },
      slocPerFP: 62,
      maintenanceHoursPerYear: 1.3,
      defectDensityPer1000FP: 7.2,
      productivityFactors: [
        'Strict opinionated structure with integrated CLI',
        'Built-in frontend dependency injection container',
        'Native Signals eliminating Zone.js in modern apps',
        'Higher initial ceremony repaid during long-term maintenance'
      ],
      recommendedUseCase:
        'Mission-critical enterprise apps, public sector portals, and orgs with dozens of concurrent developers.'
    },
    {
      tech: 'postgresql',
      category: 'database',
      name: 'PostgreSQL 16 (Relational + JSONB)',
      hoursPerFP: { min: 4.0, avg: 5.5, max: 8.0 },
      slocPerFP: 25,
      maintenanceHoursPerYear: 0.9,
      defectDensityPer1000FP: 3.5,
      productivityFactors: [
        'Strict ACID guarantees preventing data integrity anomalies',
        'Declarative schema migrations (Flyway, Liquibase, EF Migrations)',
        'Robust B-Tree and GIN indexes for hybrid JSONB workloads',
        'Rich extension ecosystem (pg_stat_statements, pgvector)'
      ],
      recommendedUseCase:
        'Default primary store for relational entities, accounting ledgers, and structured catalogs.'
    },
    {
      tech: 'mongodb',
      category: 'database',
      name: 'MongoDB 7 (Document Store)',
      hoursPerFP: { min: 3.5, avg: 5.0, max: 7.5 },
      slocPerFP: 22,
      maintenanceHoursPerYear: 1.3,
      defectDensityPer1000FP: 6.8,
      productivityFactors: [
        'Schema-on-read accelerating early-stage feature iteration',
        'JSON/BSON structure aligns naturally with frontend payloads',
        'Higher migration complexity across polymorphic document versions',
        'Native horizontal sharding support'
      ],
      recommendedUseCase:
        'Catalogs with variable attributes, event telemetry, audit trails, and unstructured logs.'
    },
    {
      tech: 'redis',
      category: 'database',
      name: 'Redis 7 (In-Memory Key-Value & Cache)',
      hoursPerFP: { min: 2.0, avg: 3.0, max: 4.5 },
      slocPerFP: 15,
      maintenanceHoursPerYear: 0.7,
      defectDensityPer1000FP: 4.0,
      productivityFactors: [
        'Ready-to-use in-memory data structures (Strings, Hashes, Sets, Streams)',
        'Dramatic reduction in primary database read pressure',
        'Requires discipline around TTLs, eviction, and serialization',
        'Straightforward integration via native drivers'
      ],
      recommendedUseCase: 'Query acceleration layer, distributed locks (Redlock), and ephemeral session stores.'
    }
  ],
  fpCaseStudy: [
    {
      type: 'ALI',
      name: 'Account Registry & Ownership',
      description: 'Stores customer profiles, onboarding status, auth keys, and privacy compliance history.',
      complexity: 'Média',
      points: 10,
      techImplementation:
        'PostgreSQL 16 (normalized `accounts`, `holders` tables with foreign keys and audit triggers).'
    },
    {
      type: 'ALI',
      name: 'Accounting Ledger (Double-Entry Transactions)',
      description: 'Immutable record of debit/credit postings, consolidated balances, and reconciliation.',
      complexity: 'Alta',
      points: 15,
      techImplementation:
        'PostgreSQL 16 with monthly date partitioning and cryptographic integrity checksum columns.'
    },
    {
      type: 'ALI',
      name: 'Financial Products & Fee Catalog',
      description: 'Credit and investment products with dynamic attributes and pricing tiers.',
      complexity: 'Média',
      points: 10,
      techImplementation:
        'MongoDB 7 (polymorphic `financial_products` collection with compound category/eligibility indexes).'
    },
    {
      type: 'ALI',
      name: 'Active Sessions & Auth Tokens',
      description: 'Revocable JWT tokens, IP rate-limiting state, and distributed concurrency locks.',
      complexity: 'Baixa',
      points: 7,
      techImplementation: 'Redis 7 (Hashes for sessions and Sorted Sets for sliding-window rate limiting).'
    },
    {
      type: 'AIE',
      name: 'Instant Payment Rail Gateway (SPI / Central Bank / PIX)',
      description: 'External clearing interface for instant payment validation and settlement.',
      complexity: 'Alta',
      points: 10,
      techImplementation: 'mTLS messaging microservice integrated with Kafka/RabbitMQ and signed webhooks.'
    },
    {
      type: 'AIE',
      name: 'Anti-Fraud & Credit Scoring Engine',
      description: 'External lookup to credit bureaus and ML risk engines for real-time fraud scoring.',
      complexity: 'Média',
      points: 7,
      techImplementation: 'gRPC / REST call wrapped in resilient circuit-breakers (Polly in .NET / Resilience4j in Java).'
    },
    {
      type: 'EE',
      name: 'Instant Transfer Initiation (PIX / Wire)',
      description: 'Receives payment instruction, checks limits and available balance, and enqueues settlement.',
      complexity: 'Alta',
      points: 6,
      techImplementation: 'POST /transfers endpoint with Pydantic / FluentValidation and atomic DB transaction.'
    },
    {
      type: 'EE',
      name: 'Daily/Nightly Limit & Device Update',
      description: 'Updates operational transfer limits verified via biometric challenge.',
      complexity: 'Média',
      points: 4,
      techImplementation: 'Idempotent PUT /account/limits endpoint with immutable audit trail.'
    },
    {
      type: 'EE',
      name: 'Instant Payment Alias Registration / Portability',
      description: 'Registers or transfers addressing keys (tax ID, phone, email) linked to the checking account.',
      complexity: 'Média',
      points: 4,
      techImplementation: 'POST /pix/keys endpoint with strict format validation.'
    },
    {
      type: 'SE',
      name: 'Reconciled Statement & Tax Export',
      description: 'Generates monthly statements with daily yield calculations, tax projections, and signed PDF export.',
      complexity: 'Alta',
      points: 7,
      techImplementation: 'Async worker rendering encrypted PDFs and dispatching via job queue.'
    },
    {
      type: 'SE',
      name: 'Settlement Push / Webhook Notification',
      description: 'Dispatches real-time HMAC-SHA256 signed settlement events to mobile and partner clients.',
      complexity: 'Média',
      points: 5,
      techImplementation: 'WebSockets / SSE dispatcher with Firebase Cloud Messaging fallback.'
    },
    {
      type: 'CE',
      name: 'Real-Time Balance & Available Limit Lookup',
      description: 'Returns current balance factoring pending holds directly from memory cache.',
      complexity: 'Baixa',
      points: 3,
      techImplementation: 'GET /balance endpoint with Redis Cache-Aside and PostgreSQL read-replica fallback.'
    },
    {
      type: 'CE',
      name: 'Paginated Transaction History Search',
      description: 'Queries transaction history filtered by date range, direction (credit/debit), and description text.',
      complexity: 'Média',
      points: 4,
      techImplementation:
        'GET /transfers?page=1&size=20 backed by a composite B-Tree index on (account_id, created_at DESC).'
    }
  ],
  fpGscList: [
    { id: 1, name: 'Data Communications', description: 'Degree to which the app sends or receives data over telecommunication networks.' },
    { id: 2, name: 'Distributed Data Processing', description: 'Distribution of data and processing across multiple nodes, containers, or services.' },
    { id: 3, name: 'Performance', description: 'Strict response-time and throughput SLAs specified by stakeholders.' },
    { id: 4, name: 'Heavily Used Configuration', description: 'Operational hardware constraints demanding high compute or memory efficiency.' },
    { id: 5, name: 'Transaction Rate', description: 'Requests per second requiring fine-grained concurrency and lock management.' },
    { id: 6, name: 'Online Data Entry', description: 'Percentage of transactions originating interactively from web or mobile UIs.' },
    { id: 7, name: 'End-User Efficiency', description: 'Focus on UX ergonomics, keyboard shortcuts, and streamlined workflows.' },
    { id: 8, name: 'Online Update', description: 'Immediate synchronous updates to internal logical files during transactions.' },
    { id: 9, name: 'Complex Processing', description: 'Presence of intricate math, cryptography, or multi-branch conditional logic.' },
    { id: 10, name: 'Reusability', description: 'Code and components designed for reuse across multiple applications in the org.' },
    { id: 11, name: 'Installation Ease', description: 'Automation maturity across CI/CD pipelines, containers, and Kubernetes orchestration.' },
    { id: 12, name: 'Operational Ease', description: 'Automated backups, OpenTelemetry observability, health checks, and alerting.' },
    { id: 13, name: 'Multiple Sites', description: 'Need to run across multi-region cloud zones, data centers, or physical branches.' },
    { id: 14, name: 'Facilitate Change', description: 'Modular low-coupling architecture designed to absorb changing business rules.' }
  ]
};

export default engineeringToolsEn;
