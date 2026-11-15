import { BusinessLocale } from '../../types.ts';

const businessEn: BusinessLocale = {
  ui: {
    badge: 'STRATEGIC IT PLANNING & BUDGETING',
    title: 'Digitalization Diagnosis & Enterprise Budgeting',
    subtitle:
      'Simulate real-world software engineering costs, cloud infrastructure, sprint timelines in weeks, and the ideal software architecture tailored precisely to your industry vertical.',
    steps: [
      { step: 1, title: '1. Sector & Niche', desc: 'Industry vertical' },
      { step: 2, title: '2. Company Size', desc: 'Scale & headcount' },
      { step: 3, title: '3. Digital Maturity', desc: 'Current systems' },
      { step: 4, title: '4. Primary Goal', desc: 'Project target' }
    ],
    stepCounterPrefix: 'Step',
    stepCounterOf: 'of',
    step1Title: 'Select Your Economic Sector',
    step2Title: 'What Is Your Organization Size?',
    sectorTitle: 'Select Your Economic Sector',
    sectorSubtitle: 'Each industry carries distinct architectural patterns and regulatory compliance needs.',
    suggestedStackPrefix: 'Suggested stack:',
    nichePrompt: 'What is your company’s specific niche or specialty?',
    nicheLabel: 'Specific niche or specialty',
    nichePlaceholder:
      'Or type your exact niche (e.g., Specialty Pharma Distributor, Marine Parts E-commerce...)',
    sizeTitle: 'What Is Your Organization Size?',
    sizeSubtitle: 'Team scale and transaction volume calibrate licensing, governance, and cloud sizing.',
    sizeLabel: 'Organization size',
    typicalSquadPrefix: 'Typical squad:',
    maturityTitle: 'Current Digital Maturity of the Company',
    maturitySubtitle: 'Directly drives data cleansing effort and team onboarding curve.',
    maturityLabel: 'Current digital maturity',
    migrationFactorLabel: 'Migration complexity factor:',
    goalTitle: 'What Is the Primary Project Goal?',
    goalSubtitle: 'Defines the MVP core scope and foundational architectural blueprint.',
    goalLabel: 'Primary project goal',
    baseTimelineLabel: 'Baseline estimated timeline:',
    customReqLabel: 'Business Notes or Specific Requirements (Optional)',
    customReqPlaceholder:
      "E.g.: 'Must integrate with our legacy ERP via REST/webhooks and support offline warehouse scanning'...",
    prevStepBtn: '← Previous Step',
    nextStepBtn: 'Next Step',
    generateBtn: 'Generate Report',
    projectionTitle: 'Budget & Technical Projection',
    estimatedForPrefix: 'Estimated forecast for:',
    previewBtnTitle: 'Download preliminary executive summary PDF',
    completeBtnTitle: 'Access full 6-page analytical dossier PDF',
    previewSuccessNotice: 'Preview PDF generated successfully! Check your downloads.',
    completeSuccessNotice:
      'Full Analytical Dossier (6 pages) generated successfully! Your details have been received by our team.',
    downloadPreviewPdf: 'Download Free Preview (.pdf)',
    downloadFullPdf: 'Get Full Analytical Dossier (6 Pages)',
    resetBtn: 'Reset',
    kpiCapex: 'Investment (Capex)',
    kpiOpex: 'Cloud Cost (Opex)',
    kpiTimeline: 'Rollout Timeline',
    kpiSprints: 'Squad Size',
    perMonth: '/mo',
    weeks: 'weeks',
    sprintsOf2Weeks: 'biweekly agile sprints',
    professionalsUnit: 'specialists',
    squadSummaryNote: 'Tech Lead, Senior Engineers, DevOps Engineer & QA Analyst.',
    archBadgeNote: 'Natively aligned with CodeCompare engineering guides',
    archPatternLabel: 'Architectural Pattern:',
    challengesTitle: 'Mapped Operational Challenges',
    archTitle: 'Recommended Architecture for',
    cloudSimTitle: 'Cloud Simulation',
    tierLabel: 'Tier:',
    monthlyInfraEst: 'Monthly infra estimate:',
    breakdownTitle: 'Investment Breakdown',
    squadTitle: 'Recommended Squad Composition',
    rolloutTitle: 'Phased Implementation Timeline',
    risksTitle: 'Strategic Risk Matrix',
    impactLabel: 'Impact',
    mitigationLabel: 'Mitigation:',
    complianceTitle: 'Compliance & Security',
    lgpdSectorTitle: 'Sector Privacy / LGPD Guidelines',
    modalBadge: 'FULL DOSSIER // 6 PAGES',
    modalTitle: 'Where should we send your Analytical Report?',
    modalSubtitle:
      'The complete 6-page PDF will download immediately to your device personalized with your company name.',
    modalNameLabel: 'Your Full Name *',
    modalNamePlaceholder: 'E.g.: Alex Morgan',
    modalEmailLabel: 'Business Email *',
    modalEmailPlaceholder: 'alex@company.com',
    modalPhoneLabel: 'WhatsApp / Phone',
    modalPhonePlaceholder: '+1 (555) 234-5678',
    modalCompanyLabel: 'Company Name',
    modalCompanyPlaceholder: 'E.g.: Acme Manufacturing Inc.',
    modalConsultCheck:
      'I would like a technical specialist to reach out for squad budgeting or architectural advisory.',
    modalSubmitBtn: 'Generate & Download Full Dossier (.pdf)',
    modalSubmittingBtn: 'Registering & Generating Report...',
    modalCancelBtn: 'Cancel',
    modalPrivacyNote: 'Your data is protected under strict privacy and LGPD/GDPR compliance.',
    formspreeLeadType: 'B2B Lead - Business Diagnosis',
    formspreeNotProvided: 'Not provided',
    formspreeConsultYes: 'Yes, request technical contact',
    formspreeConsultNo: 'Report only',
    formspreeNoCustomReq: 'None provided',
    rangeJoin: 'to',
    impactMap: {
      Alto: 'High',
      Médio: 'Medium',
      Baixo: 'Low'
    }
  },
  sectors: {
    retail: {
      id: 'retail',
      name: 'Retail & E-commerce',
      tagline: 'Omnichannel sales, product catalog, high-conversion checkout, and real-time inventory reconciliation.',
      iconName: 'ShoppingBag',
      badge: 'High Concurrency & Traffic Spikes',
      typicalNiches: [
        'D2C & B2B E-commerce',
        'Supermarkets & Distributors',
        'Fashion & Apparel Retail',
        'Pharmacies & Cosmetics',
        'Building Materials & Auto Parts'
      ],
      primaryChallenges: [
        'Real-time inventory synchronization between physical stores and online storefronts',
        'Checkout bottlenecks during promotional peaks (Black Friday / Holiday sales)',
        'Complex integrations with payment gateways, anti-fraud engines, and shipping carriers',
        'Abandoned cart recovery and personalized dynamic offers'
      ],
      recommendedFrontend: 'React / Next.js with Tailwind CSS (SSR/SSG for fast SEO)',
      recommendedBackend: 'Go (Fiber) or Node.js for high-throughput microservices',
      recommendedDatabase: 'PostgreSQL (transactional) + Redis (catalog & session cache)',
      recommendedCloud: 'AWS (CloudFront CDN, ECS Fargate, S3, and Aurora Serverless)',
      architectureHighlight:
        'Decoupled Headless Commerce architecture using Cache-Aside and async messaging for tax invoicing.',
      lgpdConsiderations: [
        'End-to-end encryption of cardholder flows (PCI-DSS compliance)',
        'Explicit opt-in consent for remarketing and analytics cookies',
        'Purchase history anonymization after statutory tax retention windows'
      ]
    },
    industry: {
      id: 'industry',
      name: 'Industry & Manufacturing',
      tagline: 'Shop-floor execution, industrial automation, OEE monitoring, machinery telemetry, and MRP/PCP.',
      iconName: 'Factory',
      badge: 'Shop Floor & Operational Resilience',
      typicalNiches: [
        'Metalworking & Precision Machining',
        'Food & Beverage Processing',
        'Textiles & Industrial Apparel',
        'Chemicals & Plastics',
        'Furniture & Architectural Millwork'
      ],
      primaryChallenges: [
        'Lack of real-time visibility into OEE (Overall Equipment Effectiveness)',
        'Manual production floor logging causing scrap, rework, and scheduling delays',
        'Plant floors with intermittent connectivity requiring offline-first operation',
        'Absence of predictive maintenance leading to costly unplanned downtime'
      ],
      recommendedFrontend: 'Vue 3 with Composition API (ideal for fast shop-floor HMI and terminal screens)',
      recommendedBackend: '.NET 8 (C#) or Java Spring Boot for heavy processing and PLC/SCADA integration',
      recommendedDatabase: 'PostgreSQL + TimescaleDB (for IoT sensor & telemetry time-series)',
      recommendedCloud: 'Microsoft Azure (Azure IoT Hub, Edge Computing, and App Services)',
      architectureHighlight:
        'Edge-to-Cloud topology with local processing on industrial gateways and periodic cloud sync.',
      lgpdConsiderations: [
        'Protection of trade secrets, proprietary formulas, and CAD blueprints',
        'Biometric / badge access logs compliant with sensitive personal data safeguards',
        'Immutable quality audit trails and batch lot traceability'
      ]
    },
    services: {
      id: 'services',
      name: 'B2B & Field Services',
      tagline: 'Digital work orders, scheduling, dynamic pricing, recurring billing, and SLA contracts.',
      iconName: 'Briefcase',
      badge: 'Billable Efficiency & Client Retention',
      typicalNiches: [
        'Legal, Accounting & Financial Consultancies',
        'HVAC, Maintenance & Facilities Management',
        'Marketing, Design & Software Agencies',
        'Security & Staffing Providers',
        'Corporate Education & Training'
      ],
      primaryChallenges: [
        'Unstandardized work orders and lack of digital proof-of-delivery',
        'Difficulty measuring true profit margin per client and billable hour',
        'Manual rework in contract renewals, recurring invoicing, and delinquency tracking',
        'Disconnected communication between field technicians and back-office staff'
      ],
      recommendedFrontend: 'React with Vite and Lucide Icons (fast, intuitive admin & dispatch portal)',
      recommendedBackend: 'Python (FastAPI) or .NET 8 with automated PDF report generation',
      recommendedDatabase: 'PostgreSQL (structured relational store with JSONB custom fields)',
      recommendedCloud: 'Google Cloud Platform (Cloud Run, Cloud SQL, and Firebase Cloud Messaging)',
      architectureHighlight:
        'Multi-tenant SaaS with configurable workflows, integrated e-signatures, and an offline-capable PWA for field crews.',
      lgpdConsiderations: [
        'Strict confidentiality for corporate client contracts and financial terms',
        'Automated contract retention expiration policies',
        'One-click personal data export supporting statutory data subject requests'
      ]
    },
    health: {
      id: 'health',
      name: 'Healthcare, Clinics & Labs',
      tagline: 'Electronic Health Records (EHR), telemedicine, integrated scheduling, and insurance billing.',
      iconName: 'Activity',
      badge: 'Strict Compliance & Sensitive Data',
      typicalNiches: [
        'Multi-Specialty Medical & Dental Clinics',
        'Clinical Pathology & Imaging Labs',
        'Small and Mid-Sized Hospitals',
        'Physical Therapy & Rehab Centers',
        'Veterinary Clinics & Pet Hospitals'
      ],
      primaryChallenges: [
        'Risk of accidental exposure of patient charts and confidential medical histories',
        'Insurance claim denials due to formatting/coding mismatches',
        'High appointment no-show rates without automated patient reminders',
        'Sluggish transfer of large diagnostic reports and DICOM medical imagery'
      ],
      recommendedFrontend: 'Angular 18 Standalone or React with strict typing and WCAG accessibility',
      recommendedBackend: 'Java (Spring Boot 3) or .NET 8 with enterprise service bus and immutable logging',
      recommendedDatabase: 'PostgreSQL with column encryption (pgcrypto) and temporal partitioning',
      recommendedCloud: 'AWS Healthcare or Google Cloud Healthcare API (HIPAA / LGPD aligned)',
      architectureHighlight:
        'Microservices secured with mTLS, immutable Audit Trails, and compliant healthcare clearinghouse connectors.',
      lgpdConsiderations: [
        'Strict handling of health records as sensitive personal data',
        'Granular access auditing: every patient chart view is logged and traceable',
        'Digital signature standards for clinical prescriptions and lab releases'
      ]
    },
    logistics: {
      id: 'logistics',
      name: 'Logistics, Freight & Fleets',
      tagline: 'Smart routing, cargo tracking, fleet telemetry, electronic waybills, and SLA monitoring.',
      iconName: 'Truck',
      badge: 'Mission-Critical Ops & Route Optimization',
      typicalNiches: [
        'LTL & Full-Truckload Freight Carriers',
        '3PL Operators & General Warehousing (WMS)',
        'Urban Last-Mile Fleet Distribution',
        'Express Courier Services',
        'Passenger Charter & Transit'
      ],
      primaryChallenges: [
        'Inflated fuel costs caused by non-optimized manual dispatch routing',
        'Delays in batch issuance and validation of electronic freight manifests',
        'End-customer uncertainty around real-time shipment ETAs in transit',
        'Costly reactive vehicle maintenance and premature tire/fleet wear'
      ],
      recommendedFrontend: 'React with interactive geospatial maps (MapLibre/Leaflet) and live dispatch boards',
      recommendedBackend: 'Go (Golang) for high-concurrency GPS telemetry ingestion and webhook pipelines',
      recommendedDatabase: 'PostgreSQL + PostGIS (geospatial queries) + Redis for live fleet positions',
      recommendedCloud: 'AWS (Kinesis / SQS for telemetry streams, EC2, and RDS PostGIS)',
      architectureHighlight:
        'Event-Driven Architecture (EDA) ingesting GPS tracker events into resilient queues and geospatial routing engines.',
      lgpdConsiderations: [
        'Driver geolocation anonymization outside active commercial shift hours',
        'Strong encryption and isolation against hijacking of high-value cargo manifests',
        'Encrypted settlement data for independent owner-operator drivers'
      ]
    },
    agro: {
      id: 'agro',
      name: 'Agribusiness & Connected Farms',
      tagline: 'Crop cycle management, input tracking, farm machinery telemetry, weather forecasts, and ESG traceability.',
      iconName: 'Trees',
      badge: 'Offline-First & Field Productivity',
      typicalNiches: [
        'Row Crop Producers (Soybeans, Corn, Wheat)',
        'Beef & Dairy Livestock Operations',
        'Agricultural Cooperatives & Grain Silos',
        'Irrigated Produce & Orchards',
        'Ag-Input & Farm Machinery Dealers'
      ],
      primaryChallenges: [
        'Complete lack of reliable cellular connectivity across remote plots and barns',
        'Input waste (fertilizers/pesticides) without variable-rate prescription maps',
        'Limited cost-per-hectare visibility until after harvest close',
        'Growing international buyer demands for verifiable ESG origin traceability'
      ],
      recommendedFrontend: 'React full PWA with Service Workers and local IndexedDB offline persistence',
      recommendedBackend: 'Python FastAPI (satellite/NDVI imagery processing) or .NET 8 core ERP backend',
      recommendedDatabase: 'PostgreSQL + PostGIS for plot boundary polygons and bidirectional sync',
      recommendedCloud: 'Google Cloud Platform or AWS with spot instances for batch raster processing',
      architectureHighlight:
        'Resilient Offline-First mobile-web sync replicating field entries to cloud as soon as connectivity returns.',
      lgpdConsiderations: [
        'Strict safeguarding of yield benchmarks and farm commodity margin data',
        'Tamper-evident digital sharecropping and land-lease agreements',
        'Compliant workforce records for seasonal agricultural workers'
      ]
    },
    fintech: {
      id: 'fintech',
      name: 'Fintech & Financial Services',
      tagline: 'Open Finance, BaaS (Banking as a Service), payment reconciliation, credit underwriting, and instant rails.',
      iconName: 'Landmark',
      badge: 'Bank-Grade Security & Low Latency',
      typicalNiches: [
        'Payment Facilitators & Gateways',
        'Digital Lending & Factoring Platforms',
        'Automated Treasury & Receivable Reconciliation',
        'Corporate Expense & Benefits Wallets',
        'Automated Digital Accounting & Billing'
      ],
      primaryChallenges: [
        'Reconciliation latency and double-settlement risks during payment spikes',
        'Synthetic identity fraud in digital KYC/KYB customer onboarding pipelines',
        'Stringent central bank cybersecurity and operational resilience mandates',
        'Upstream banking API downtime and split-payment failure recovery'
      ],
      recommendedFrontend: 'Angular 18 or modular React with strict CSP headers and injection protection',
      recommendedBackend: 'Java (Spring Boot 3) or Go for strict-ACID transactional microservices',
      recommendedDatabase: 'Partitioned PostgreSQL + immutable double-entry accounting ledger',
      recommendedCloud: 'AWS or Google Cloud with SOC 2 Type II and ISO 27001 certified zones',
      architectureHighlight:
        'Domain-Driven Design (DDD) paired with Event Sourcing, idempotent transfer keys, and private VPC network isolation.',
      lgpdConsiderations: [
        'Full adherence to banking secrecy rules and financial cybersecurity mandates',
        'Automated masking of tax IDs and payment aliases inside application logs',
        'Statutory 5-to-10-year immutable archival policies for financial records'
      ]
    }
  },
  companySizes: {
    micro: {
      label: 'Micro Business (1–9)',
      badge: '1 to 9 employees',
      description: 'Lean operation focused on eliminating urgent manual spreadsheets with low fixed overhead.',
      costMultiplier: 0.65,
      timeMultiplier: 0.75,
      typicalStaff: '1 Senior Full-Stack Dev + 1 part-time UI/UX Designer'
    },
    small: {
      label: 'Small Business (10–49)',
      badge: '10 to 49 employees',
      description: 'Structured workflows across multiple departments needing reliable internal integrations.',
      costMultiplier: 1.0,
      timeMultiplier: 1.0,
      typicalStaff: '1 Tech Lead + 1 Frontend Dev + 1 Backend Dev + 1 QA'
    },
    medium: {
      label: 'Mid-Sized Company (50–199)',
      badge: '50 to 199 employees',
      description: 'High transaction throughput across branches and divisions demanding high availability.',
      costMultiplier: 1.85,
      timeMultiplier: 1.5,
      typicalStaff: '1 Software Architect + 2 Full-Stack Devs + 1 DevOps + 1 QA + 1 PM'
    },
    corporate: {
      label: 'Enterprise / Corporate (200+)',
      badge: '200+ employees',
      description: 'Complex multi-legacy governance, corporate security audits, and strict compliance SLAs.',
      costMultiplier: 3.2,
      timeMultiplier: 2.2,
      typicalStaff: 'Dedicated Squad with Cloud Architect, AppSec Specialist, Tech Lead & multiple Engineers'
    }
  },
  maturityLevels: {
    manual: {
      label: 'Paper & Manual Processes',
      badge: 'Level 1 - Analog',
      summary: 'Notes, clipboards, and chat messages with no centralized source of truth.',
      complexityFactor: 1.15
    },
    spreadsheets: {
      label: 'Disconnected Spreadsheets (Excel / Sheets)',
      badge: 'Level 2 - Siloed',
      summary: 'Isolated files per department without referential integrity or automated validation.',
      complexityFactor: 1.0
    },
    legacy_desktop: {
      label: 'Legacy Desktop Software',
      badge: 'Level 3 - On-Premise',
      summary: 'Aging locally installed applications tied to outdated on-premise databases.',
      complexityFactor: 1.3
    },
    isolated_cloud: {
      label: 'Fragmented Cloud SaaS Tools',
      badge: 'Level 4 - Disconnected',
      summary: 'Modern cloud tools running in silos without APIs or unified data synchronization.',
      complexityFactor: 1.1
    }
  },
  projectGoals: {
    process_automation: {
      label: 'Process & Workflow Automation',
      badge: 'Immediate Cost Reduction',
      description: 'Eliminate manual rework, unify intake forms, and automate end-to-end approvals.',
      baseCapex: 24000,
      baseOpexMonthly: 450,
      baseWeeks: 8
    },
    client_portal_app: {
      label: 'Dedicated Customer Web Portal / App',
      badge: 'Revenue & CX Focus',
      description: 'Self-service customer portal to place orders, track status, and complete payments.',
      baseCapex: 35000,
      baseOpexMonthly: 750,
      baseWeeks: 12
    },
    custom_erp: {
      label: 'Tailor-Made ERP / Core CRM Platform',
      badge: 'Structural Transformation',
      description: 'Replace generic off-the-shelf software with a platform 100% tailored to your unique business rules.',
      baseCapex: 52000,
      baseOpexMonthly: 1200,
      baseWeeks: 16
    },
    bi_data_intelligence: {
      label: 'Business Intelligence & Data Hub',
      badge: 'Data-Driven Decisions',
      description: 'ETL pipelines, unified data warehouse, and executive dashboards highlighting margins and bottlenecks.',
      baseCapex: 28000,
      baseOpexMonthly: 850,
      baseWeeks: 10
    },
    cloud_migration: {
      label: 'Legacy Modernization & Cloud Migration',
      badge: 'Scalability & High Availability',
      description: 'Migrate on-premise systems to containerized cloud architecture and managed databases.',
      baseCapex: 32000,
      baseOpexMonthly: 950,
      baseWeeks: 10
    }
  },
  assessmentTemplates: {
    hoursUnit: 'h/week',
    costBreakdown: [
      {
        category: 'Software Architecture & Database Design',
        description: 'Relational modeling, security architecture, Infrastructure as Code (IaC), and domain diagrams.'
      },
      {
        category: 'Backend Engineering & Integration APIs',
        description: 'Core business rules, authentication, external API integrations, and async message buses.'
      },
      {
        category: 'Frontend Engineering & UI/UX Design',
        description: 'Responsive layouts, interactive components, form validation, and executive dashboards.'
      },
      {
        category: 'Quality Assurance (QA) & Automated Testing',
        description: 'Load testing, unit/integration suites, regression checks, and real-scenario UAT.'
      },
      {
        category: 'DevOps, Automated CI/CD & Team Onboarding',
        description: 'Pipeline automation, observability metrics, alerting, and hands-on team training.'
      }
    ],
    squad: [
      {
        role: 'Tech Lead / Software Architect',
        allocationFull: 'Full-time (40h/week)',
        allocationPartial: 'Part-time (20h/week)',
        allocationPunctual: 'Advisory (15h/week)',
        allocationFinal: 'Final phase (20h/week)'
      },
      {
        role: 'Senior Backend Engineer',
        allocationFull: 'Full-time (40h/week)',
        allocationPartial: 'Part-time (20h/week)',
        allocationPunctual: 'Advisory (15h/week)',
        allocationFinal: 'Final phase (20h/week)'
      },
      {
        role: 'Frontend / UI Specialist',
        allocationFull: 'Full-time (40h/week)',
        allocationPartial: 'Part-time (20h/week)',
        allocationPunctual: 'Advisory (15h/week)',
        allocationFinal: 'Final phase (20h/week)'
      },
      {
        role: 'Cloud & DevOps Engineer',
        allocationFull: 'Full-time (40h/week)',
        allocationPartial: 'Part-time (20h/week)',
        allocationPunctual: 'Advisory (15h/week)',
        allocationFinal: 'Final phase (20h/week)'
      },
      {
        role: 'QA & Release Analyst',
        allocationFull: 'Full-time (40h/week)',
        allocationPartial: 'Part-time (20h/week)',
        allocationPunctual: 'Advisory (15h/week)',
        allocationFinal: 'Final phase (20h/week)'
      }
    ],
    cloudTiers: {
      micro: 'Entry Level (Basic Tier)',
      small: 'Standard Production (Standard Tier)',
      enterprise: 'Enterprise High-Availability (Multi-AZ)'
    },
    cloudServices: [
      'Managed Containers with Auto-Scaling',
      'Managed Relational Database with Automated Daily Backups',
      'In-Memory Caching Layer (Redis)',
      'Cloud Object Storage backed by Global CDN',
      'Application Observability & Centralized Logging'
    ],
    rolloutPhases: [
      {
        phase: 'Phase 1: Foundation & Functional Prototype (MVP)',
        durationPrefix: 'Weeks',
        durationJoin: 'to',
        deliverables: [
          'Cloud environments provisioned with automated CI/CD',
          'Database schema modeling and secure authentication',
          'Core happy-path screens validated with key business users'
        ]
      },
      {
        phase: 'Phase 2: Business Integrations & Data Migration',
        durationPrefix: 'Weeks',
        durationJoin: 'to',
        deliverables: [
          'Legacy/spreadsheet cleansing and structured data migration',
          'External API connectors (payments, billing, or messaging)',
          'Validation of edge-case domain rules for your niche'
        ]
      },
      {
        phase: 'Phase 3: UAT, Team Training & Safe Go-Live',
        durationPrefix: 'Weeks',
        durationJoin: 'to',
        deliverables: [
          'Load testing simulating operational peak concurrency',
          'Hands-on staff training with playbooks and recorded walkthroughs',
          'Assisted cutover (Go-Live) with dedicated hypercare support'
        ]
      }
    ],
    risks: [
      {
        risk: 'Internal team resistance when transitioning away from legacy workflows',
        mitigation: 'Involve operational champions during prototyping and ship an intuitive, clutter-free UI.'
      },
      {
        risk: 'Inconsistent or duplicated records inherited from legacy sources',
        mitigation: 'Run pre-migration validation and data cleansing scripts prior to final cutover.'
      },
      {
        risk: 'Under-provisioned compute capacity during operational traffic spikes',
        mitigation: 'Configure horizontal auto-scaling and asynchronous decoupling queues.'
      },
      {
        risk: 'Local internet instability disrupting remote or warehouse operations',
        mitigation: 'Implement resilient offline-first local caching with background reconciliation.'
      }
    ],
    complianceChecklist: [
      'Updated Privacy Policy and Terms of Consent aligned with application flows',
      'Immutable audit logs tracking creation, edits, and deletions on sensitive records',
      'End-to-end encryption at rest (database/storage) and in transit (HTTPS/TLS 1.3)',
      'Automated daily backups paired with periodic restore drills (defined RPO/RTO)',
      'Granular Role-Based Access Control (RBAC) enforcing least privilege'
    ]
  },
  pdf: {
    headerBrand: 'CODECOMPARE // IT INTELLIGENCE & ARCHITECTURE',
    previewBadge: 'FREE PREVIEW // EXECUTIVE SUMMARY',
    previewBannerTitle: 'PRELIMINARY EXECUTIVE SUMMARY',
    previewHeaderSubtitle: 'Technical & budget feasibility plan tailored for',
    coverBadge: 'TECHNICAL & BUDGET DOSSIER',
    coverTitle: 'Digitalization & Architecture Dossier',
    coverSubtitle: 'IT Diagnosis:',
    generatedAt: 'Generated on:',
    preparedFor: 'Prepared specifically for:',
    sectorLabel: 'Sector:',
    nicheLabel: 'Niche:',
    sizeLabel: 'Organization Size:',
    maturityLabel: 'Current Digital Maturity:',
    goalLabel: 'Primary Goal:',
    customScopeLabel: 'Provided Requirements:',
    metaHeaders: {
      colA: 'COMPANY SIZE',
      colB: 'CURRENT MATURITY',
      labelCompany: 'PRIMARY GOAL',
      labelEmail: 'Email:',
      labelPhone: 'Requester:'
    },
    summaryTitle: 'DIAGNOSIS ASSUMPTIONS',
    capexLabel: 'ESTIMATED INVESTMENT (CAPEX)',
    capexSubnote: 'End-to-end custom software engineering & QA cost.',
    opexLabel: 'MONTHLY OPERATING COST (OPEX)',
    opexSubnote: 'Managed cloud hosting, database, and third-party APIs.',
    timelineLabel: 'ROLLOUT TIMELINE',
    sprintsSubnotePrefix: 'Equivalent to approx.',
    sprintsSubnoteSuffix: 'biweekly sprints',
    sprintsUnit: 'biweekly agile sprints',
    weeksUnit: 'Weeks',
    perMonth: '/mo',
    rangeJoin: 'to',
    premisesTitle: 'OPERATIONAL IMPACT SUMMARY',
    operationalImpactPrefix:
      'Planned modernization replaces fragile legacy workflows with a scalable cloud foundation, eliminating manual rework, safeguarding operational data, and enabling predictable multi-year growth.',
    challengesTitle: 'Critical Challenges in',
    recommendedStackTitle: 'Recommended Technology Architecture',
    recommendedStackPreviewTitle: 'Architectural Specification & Technology Selection',
    stackLayers: {
      frontend: 'Frontend Layer',
      backend: 'Backend & APIs',
      database: 'Database & Cache',
      cloud: 'Cloud Provider'
    },
    stackLayerNames: {
      frontend: '1. Frontend & User Experience Layer (UI/UX)',
      backend: '2. Backend & Business Rules Layer (APIs)',
      database: '3. Data Persistence & In-Memory Cache',
      cloud: '4. Cloud Infrastructure & DevOps'
    },
    techRecommendedPrefix: 'Recommended Tech:',
    stackGenericSpecs: [
      {
        title: '1. Frontend & User Experience Layer (UI/UX)',
        detail:
          'Owns user workflows, fast page loads, mobile responsiveness, and modern accessibility standards—driving rapid adoption by employees and customers.'
      },
      {
        title: '2. Backend & Business Rules Layer (APIs)',
        detail:
          'Core domain processing, tax/compliance validations, OAuth2/JWT authentication, and async event buses built over documented RESTful/gRPC APIs.'
      },
      {
        title: '3. Data Persistence & In-Memory Cache',
        detail:
          'Relational engine with optimized B-Tree/GIN indexing, partitioned historical tables, and Redis Cache-Aside cutting hot-read latency by over 80%.'
      },
      {
        title: '4. Cloud Infrastructure & DevOps',
        detail:
          'Infrastructure as Code (Terraform), Docker containers, automated daily snapshots, and real-time CPU, latency, and uptime observability alerts.'
      }
    ],
    inviteBoxTitle: 'Want the Complete Analytical Breakdown (6-Page Dossier)?',
    inviteBoxLines: [
      'The full version includes: Week-by-week sprint rollout, Exact Squad allocation,',
      'Hour breakdown per engineering discipline, Risk Matrix with mitigations, and Privacy checklist.',
      'Return to the CodeCompare portal to unlock and download the Full Dossier for free.'
    ],
    completeTitle: 'COMPLETE ARCHITECTURAL DOSSIER',
    completeHeaderBrand: 'COMPLETE ARCHITECTURAL DOSSIER',
    completePage2Title: 'SOFTWARE ARCHITECTURE & STACKS',
    completeArchTitle: 'Recommended Architectural Highlight',
    completeArchHighlightLabel: 'RECOMMENDED ARCHITECTURAL PATTERN',
    completeChallengesTitle: 'Data Protection (LGPD/GDPR) Niche Guidelines',
    completePage3Title: 'COST BREAKDOWN & ENGINEERING SQUAD',
    completePage3Subtitle: 'Investment Breakdown by Engineering Phase',
    completePage4Title: 'ROLLOUT TIMELINE & SPRINTS',
    completePage4Subtitle: 'Phased Sprint Delivery Plan',
    completePage5Title: 'CLOUD SIZING & RISK MATRIX',
    completePage6Title: 'GOVERNANCE, PRIVACY & NEXT STEPS',
    cloudTitle: 'Cloud Sizing:',
    cloudProviderLabel: 'Recommended infrastructure:',
    cloudTierLabel: 'Suggested Tier:',
    cloudEstMonthlyLabel: 'Projected Monthly Cost:',
    cloudServicesLabel: 'Managed Services Included in Architecture:',
    breakdownTitle: 'Investment Breakdown by Engineering Phase',
    colCategory: 'Phase / Discipline',
    colHours: 'Hours',
    colShare: '%',
    colInvestment: 'Estimated Range (BRL Ref.)',
    squadTitle: 'Recommended Engineering Squad Composition',
    squadAllocPrefix: 'Allocation:',
    squadCountPrefix: 'Headcount:',
    rolloutTitle: 'Phased Sprint Delivery Schedule',
    rolloutDurationPrefix: 'Estimated Duration:',
    rolloutNotesTitle: 'PROGRESSIVE GO-LIVE METHODOLOGY',
    rolloutNotes: [
      'We recommend rolling out via Canary Releases or controlled pilot groups prior to company-wide cutover, ensuring business-rule refinements happen with zero disruption to billing or customer service.'
    ],
    risksTitle: 'Strategic Risk Matrix & Mitigation Playbook',
    impactBadgePrefix: 'Impact:',
    mitigationPrefix: 'Mitigation Plan:',
    complianceTitle: 'Security & Legal Compliance Checklist (LGPD)',
    lgpdTitle: 'Data Protection Guidelines in Your Vertical',
    nextStepsTitle: 'Recommended Next Steps to Launch',
    nextSteps: [
      '1. Scope Discovery: Refine core domain requirements alongside operations and finance leads.',
      '2. Proof of Concept (PoC): Deliver a clickable prototype within 10 business days for early feedback.',
      '3. Squad Allocation: Decide between in-house hiring, dedicated partner squad, or hybrid model.',
      '4. Sprint 1 Kickoff: Provision cloud VPC, CI/CD pipelines, and initial database migrations.'
    ],
    finalCtaTitle: 'CodeCompare // Specialized Software Architecture & Advisory',
    finalCtaBody: 'Need senior architectural support to execute this roadmap from design through production go-live?',
    finalCtaContact: 'Email: eduardolessa2011@gmail.com  |  Portal: https://www.devedulessa.com.br/',
    footerPage: 'Page',
    footerOf: 'of',
    footerDisclaimer: 'Confidential report generated by CodeCompare - Technical & Budget Analysis',
    footerPreviewNote: 'INDUSTRY CHALLENGES & GUIDELINES',
    currencyLocale: 'pt-BR',
    currencyCode: 'BRL',
    filenamePreviewPrefix: 'CodeCompare_Preview_',
    filenameCompletePrefix: 'CodeCompare_Full_Dossier_'
  }
};

export default businessEn;
