import { EngineeringToolsLocale } from '../../types.ts';

const engineeringToolsPt: EngineeringToolsLocale = {
  matrixUi: {
    badge: 'Ferramenta Interativa de Engenharia',
    title: 'Matriz de Decisão Arquitetural',
    subtitle:
      'Simule os requisitos específicos do seu próximo projeto e receba uma recomendação técnica pragmática fundamentada em trade-offs reais de produção.',
    sectionTitle: 'Defina as Restrições do seu Projeto',
    q1Label: '1. Natureza do Produto de Software',
    q1Options: [
      { id: 'mvp', label: 'MVP / Startup', desc: 'Foco em velocidade' },
      { id: 'saas', label: 'SaaS / E-commerce', desc: 'Alto tráfego & SEO' },
      { id: 'enterprise', label: 'Dashboard Corporativo', desc: 'Governança & dados' },
      { id: 'realtime', label: 'Tempo Real / IoT', desc: 'Latência crítica' }
    ],
    q2Label: '2. Perfil de Especialidade da Equipe Técnica',
    q2Options: [
      { id: 'junior', label: 'Equipe Generalista (JS/TS)', desc: 'Menor curva de aprendizado' },
      { id: 'polyglot', label: 'Time Sênior Poliglota', desc: 'Domina múltiplas linguagens' },
      { id: 'corporate', label: 'Background Enterprise', desc: 'C#, Java, ecossistema Microsoft/Oracle' }
    ],
    q3Label: '3. Volume de Requisições Estimado',
    q3Options: [
      { id: 'small', label: 'Até 50k req/dia', desc: 'Tráfego inicial de lançamento' },
      { id: 'medium', label: '100k a 5M req/dia', desc: 'Tráfego comercial consolidado' },
      { id: 'massive', label: 'Escala Hipercrítica (> 20M)', desc: 'Microsegundos de latência' }
    ],
    diagBadge: 'Diagnóstico Automatizado',
    diagTitle: 'Arquitetura Recomendada para o seu Cenário',
    diagSeal: '✓ Parecer de Engenharia',
    cardFrontend: 'Frontend',
    cardFrontendBtn: 'Ver comparativo no blog',
    cardBackend: 'Backend API',
    cardBackendBtn: 'Ver código do CRUD',
    cardDatabase: 'Banco de Dados',
    cardDatabaseBtn: 'Ver estratégias de dados',
    warningPrefix: 'Ponto de Atenção em Produção:',
    recommendations: {
      mvp: {
        frontend: {
          name: 'Vue.js 3 ou React',
          subTab: 'vue',
          tag: 'Time-to-Market',
          reason: 'Velocidade máxima de implementação e baixa barreira de entrada.'
        },
        backend: {
          name: 'Python (FastAPI)',
          subTab: 'python',
          tag: 'Prototipagem Ágil',
          reason: 'Documentação OpenAPI Swagger automática e tipagem rápida com Pydantic.'
        },
        database: {
          name: 'PostgreSQL Monolítico',
          subTab: 'relational',
          tag: 'Simplicidade Operacional',
          reason: 'Não introduza Redis ou NoSQL antes de comprovar a tração do produto.'
        },
        warnings: [
          'Mantenha as regras de negócio desacopladas do framework para facilitar futuras migrações de backend.'
        ]
      },
      saas: {
        frontend: {
          name: 'React 19 + TanStack Query',
          subTab: 'react',
          tag: 'Frontend Flexível',
          reason:
            'Maior ecossistema de componentes e maior disponibilidade de engenheiros no mercado, com cache assíncrono robusto.'
        },
        backend: {
          name: '.NET 8 (C# Minimal APIs)',
          subTab: 'dotnet',
          tag: 'Throughput Elevado',
          reason: 'Excelente custo-benefício de CPU/RAM em produção com tipagem estrita em tempo de compilação.'
        },
        database: {
          name: 'PostgreSQL + Redis (Cache-Aside)',
          subTab: 'relational',
          tag: 'Persistência Híbrida',
          reason: 'PostgreSQL garante integridade ACID para entidades core e Redis absorve picos de leitura repetitiva.'
        },
        warnings: [
          'Monitore a latência do pool de conexões com o banco à medida que o número de réplicas de pods subir.'
        ]
      },
      enterprise: {
        frontend: {
          name: 'Angular 17+ (Signals Standalone)',
          subTab: 'angular',
          tag: 'Governança Corporativa',
          reason:
            'Estrutura prescritiva com convenções rígidas que reduzem o risco de arquiteturas divergentes em times grandes.'
        },
        backend: {
          name: 'Java (Spring Boot 3) ou .NET 8',
          subTab: 'java',
          tag: 'Padrão Enterprise',
          reason: 'Maturidade de tooling, ecossistema corporativo gigantesco e suporte de longo prazo (LTS).'
        },
        database: {
          name: 'PostgreSQL com Particionamento Declarativo',
          subTab: 'relational',
          tag: 'Escala Relacional',
          reason: 'Particionamento por data em tabelas de auditoria e índices B-Tree bem dimensionados.'
        },
        warnings: ['Evite acoplamento excessivo com bibliotecas proprietárias de fornecedores de nuvem.']
      },
      realtime: {
        frontend: {
          name: 'Vue.js 3.4 (Composition API)',
          subTab: 'vue',
          tag: 'Reatividade Leve',
          reason: 'Reatividade cirúrgica sem Virtual DOM pesado, perfeita para telemetria de alta frequência.'
        },
        backend: {
          name: 'Go (Fiber + Goroutines)',
          subTab: 'go',
          tag: 'Baixíssima Latência',
          reason:
            'Consumo irrisório de RAM por conexão (~2 KB por Goroutine) suportando dezenas de milhares de clientes simultâneos.'
        },
        database: {
          name: 'Redis Streams / Cassandra + PostgreSQL',
          subTab: 'nosql',
          tag: 'Write-Heavy NoSQL',
          reason: 'Cassandra ou Redis para ingestão massiva de telemetria sem engasgar o banco relacional.'
        },
        warnings: ['Atenção ao risco de Goroutine leaks caso o contexto de cancelamento não seja propagado.']
      }
    },
    massiveTrafficBackend: {
      name: 'Go (Fiber) ou .NET 8',
      subTab: 'go',
      tag: 'Concorrência Massiva',
      reason: 'Linguagens compiladas que eliminam o overhead de interpretadores dinâmicos sob milhões de requisições.'
    }
  },
  fpUi: {
    badge: 'Métricas de Engenharia de Software • APF / IFPUG',
    title: 'Análise de Pontos de Função (APF) & Dimensionamento de Software',
    subtitle:
      'Medição do tamanho funcional de software de acordo com os padrões internacionais IFPUG (ISO/IEC 20926) e NESMA. Descubra como cada elemento transacional e de dados se correlaciona com FastAPI, .NET 8, Spring Boot 3, React, Vue, Angular e Bancos de Dados em Horas por Ponto de Função (h/PF), linhas de código equivalentes e custos de sustentação.',
    methodologyBadge: 'Normativa IFPUG CPM 4.3.1',
    normIso: 'Norma: ISO/IEC 20926:2009',
    normIsbsg: 'Taxa de Entrega: ISBSG Benchmarks',
    normNeutral: 'Independência Tecnológica Funcional',
    kpiTotalPfa: 'Tamanho Funcional (PFA)',
    kpiEffortHours: 'Esforço Total',
    kpiTimeline: 'Prazo Estimado',
    kpiEstimatedBugs: 'Defeitos Esperados',
    weeksUnit: 'semanas',
    sprintsUnit: 'sprints',
    hoursUnit: 'horas',
    hoursShortUnit: 'h',
    slocLinesUnit: 'linhas',
    maintUnit: 'h/ano',
    calcSectionTitle: 'Calculadora de Pontos de Função & Dimensionamento de Sprint',
    calcSectionSubtitle:
      'Informe a quantidade de funções do seu projeto, selecione a stack pretendida e dimensione o esforço em horas, sprints e tamanho de equipe.',
    calculatorKicker: 'Simulador Interativo',
    calculatorLoadExampleBtn: 'Carregar Exemplo Padrão',
    calculatorDownloadSheetBtn: 'Baixar Planilha (.csv / Excel)',
    calculatorDownloadSheetTitle: 'Exportar planilha formatada para Excel / Google Planilhas',
    calculatorStep1Title: '1. Contagem de Funções de Dados e Transações',
    calculatorStep2Title: '2. Parâmetros Tecnológicos e da Equipe',
    pfUnit: 'PF',
    elements: {
      ALI: {
        label: 'Arquivos Lógicos Internos (Tabelas / Coleções)',
        low: 'Baixa (7 PF)',
        med: 'Média (10 PF)',
        high: 'Alta (15 PF)'
      },
      AIE: {
        label: 'Arquivos de Interface Externa (APIs Externas)',
        low: 'Baixa (5 PF)',
        med: 'Média (7 PF)',
        high: 'Alta (10 PF)'
      },
      EE: {
        label: 'Entradas Externas (POST, PUT, DELETE, Gravações)',
        low: 'Baixa (3 PF)',
        med: 'Média (4 PF)',
        high: 'Alta (6 PF)'
      },
      SE: {
        label: 'Saídas Externas (Relatórios, Cálculos, Webhooks)',
        low: 'Baixa (4 PF)',
        med: 'Média (5 PF)',
        high: 'Alta (7 PF)'
      },
      CE: {
        label: 'Consultas Externas (GETs simples, buscas paginadas)',
        low: 'Baixa (3 PF)',
        med: 'Média (4 PF)',
        high: 'Alta (6 PF)'
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
      { id: 'postgresql', label: 'PostgreSQL 16 (Relacional + JSONB)' },
      { id: 'mongodb', label: 'MongoDB 7 (Documentos)' },
      { id: 'redis', label: 'Redis 7 (In-Memory)' }
    ],
    sprintOptions: [
      { id: '1', label: '1 Semana (Ciclos ultra-ágeis)' },
      { id: '2', label: '2 Semanas (Scrum padrão de mercado)' },
      { id: '4', label: '4 Semanas (Ciclos mensais)' }
    ],
    summaryKicker: 'Resumo do Dimensionamento',
    functionalSizeLabel: 'Tamanho Funcional:',
    rawFpLabel: 'Pontos Brutos (PFNA):',
    totalEffortTitle: 'Esforço Total',
    avgPrefix: 'Média:',
    estTimelineTitle: 'Prazo Estimado',
    devsShortUnit: 'devs',
    estCodeTitle: 'Código Estimado',
    linesApproxPrefix: '~',
    linesApproxUnit: 'linhas',
    expectedDefectsTitle: 'Defeitos Esperados',
    bugsUnit: 'bugs',
    prodYearNote: 'Em produção (~1 ano)',
    layerDistLabel: 'Distribuição de Esforço por Camada:',
    backendLayerLabel: 'Backend',
    frontendLayerLabel: 'Frontend',
    dbLayerLabel: 'Banco',
    annualMaintLabel: 'Esforço de Sustentação Anual:',
    perYearUnit: 'h/ano',
    spreadsheetBtnTitle: 'Baixar Planilha de Estimativa (.csv / Excel)',
    spreadsheetBtnLabel: 'Baixar Planilha de Estimativa (.csv / Excel)',
    downloadSuccessMsg: 'Planilha gerada com sucesso! Verifique seus downloads.',
    excelCompatNote:
      'Compatível com Microsoft Excel, Google Planilhas e LibreOffice Calc. Codificado em UTF-8 com separador padrão.',
    downloadCsvBtn: 'Baixar Planilha (.csv)',
    downloadedCsvBtn: 'Planilha Exportada!',
    dataFunctionsTitle: 'Funções de Dados (Armazenamento)',
    txFunctionsTitle: 'Funções de Transação (Processamento)',
    lowLabel: 'Baixa',
    medLabel: 'Média',
    highLabel: 'Alta',
    unadjustedFpLabel: 'PF Não Ajustados (PFNA)',
    vafLabel: 'Fator de Ajuste (VAF)',
    adjustedFpLabel: 'Pontos Ajustados (PFA)',
    stackConfigTitle: 'Configuração Tecnológica',
    backendLabel: 'Linguagem Backend',
    frontendLabel: 'Framework Frontend',
    databaseLabel: 'Repositório de Dados',
    complexityLabel: 'Complexidade / Fator VAF',
    complexityOptions: [
      { id: 'low', label: 'Baixa (VAF 0.85 - CRUD simples)', factorLabel: '0.85x' },
      { id: 'standard', label: 'Média (VAF 1.00 - Padrão corporativo)', factorLabel: '1.00x' },
      { id: 'high', label: 'Alta (VAF 1.15 - Concorrência e mTLS)', factorLabel: '1.15x' },
      { id: 'critical', label: 'Crítica (VAF 1.30 - Bancário / 24x7 / SLA)', factorLabel: '1.30x' }
    ],
    teamSizeLabel: 'Tamanho do Time Devs',
    devsUnit: 'devs',
    sprintLenLabel: 'Duração da Sprint',
    gscToggleShow: 'Exibir Todas as 14 GSC',
    gscToggleHide: 'Ocultar Lista',
    gscTitle: 'As 14 Características Gerais de Sistemas (GSC - General System Characteristics)',
    gscFormulaDesc:
      'Utilizadas na metodologia clássica IFPUG para calcular o Grau de Influência (DI) e o Fator de Ajuste de Valor: VAF = 0.65 + (0.01 × TDI).',
    matrixKicker: 'Fundamentos Normativos',
    matrixExportBtn: 'Exportar Matriz APF (.csv)',
    matrixExportTitle: 'Exportar planilha de pontos de função',
    colAbbr: 'Sigla',
    referenceTableTitle: 'Matriz Canônica de Complexidade e Pesos (IFPUG CPM 4.3.1)',
    referenceTableSubtitle:
      'A Análise de Pontos de Função classifica os requisitos do usuário em 5 componentes fundamentais, divididos em Funções de Dados (o que o sistema armazena) e Funções de Transação (o que o sistema processa).',
    colElement: 'Elemento Funcional',
    colDesc: 'Descrição',
    colWeights: 'Pesos (Baixa / Média / Alta)',
    colMapping: 'Mapeamento em Arquitetura Moderna',
    benchmarkKicker: 'Produtividade e Benchmark',
    benchmarkDownloadBtn: 'Baixar Métricas APF (.csv)',
    benchmarkDownloadTitle: 'Baixar planilha com métricas de produtividade',
    techBenchmarkTitle: 'Taxa de Entrega por Tecnologia (Horas / PF & SLOC Equivalente)',
    techBenchmarkSubtitle:
      'Embora o Ponto de Função seja neutro em relação à linguagem, o esforço real de engenharia para implementar 1 PF varia expressivamente conforme o ecossistema, nível de abstração, tipagem estática e maturidade de bibliotecas.',
    filterAll: 'Todas',
    filterBackend: 'Backend',
    filterFrontend: 'Frontend',
    filterDatabase: 'Bancos de Dados',
    colTechVersion: 'Tecnologia & Versão',
    colAvgRate: 'Taxa Média (h / PF)',
    colTypicalRange: 'Faixa Típica',
    colSlocPerFp: 'SLOC / PF',
    colMaintYear: 'Sustentação (h/PF/ano)',
    colBugsPer1000: 'Bugs / 1.000 PF',
    colFactors: 'Alavancas de Produtividade & Recomendações',
    catLabels: {
      backend: 'backend',
      frontend: 'frontend',
      database: 'database'
    },
    hoursPerFpLabel: 'h/PF',
    slocPerFpLabel: 'SLOC / PF',
    maintLabel: 'Sustentação/ano',
    defectsLabel: 'Defeitos / 1k PF',
    useCaseLabel: 'Caso de uso recomendado:',
    caseStudyKicker: 'Estudo de Caso Prático',
    caseStudyTitle: 'Mapeamento Real: Plataforma Fintech de Pagamentos Instantâneos (PIX)',
    caseStudySubtitle:
      'Exemplo prático de contagem de Pontos de Função em uma arquitetura moderna baseada nas tecnologias deste portal, com persistência transacional em PostgreSQL, catálogo polimórfico em MongoDB e sessões em cache Redis.',
    caseStudyTotalLabel: 'Total do Estudo de Caso',
    caseStudyPfnaTotalLabel: 'Total de Pontos de Função Não Ajustados (PFNA):',
    caseStudyVafPrefix: 'Com Fator de Ajuste VAF 1.15 (Sistemas de Alta Concorrência) =',
    colCaseType: 'Tipo',
    colCaseItem: 'Componente de Negócio',
    colCaseComplexity: 'Complexidade',
    colCaseFp: 'Pontos',
    colCaseImpl: 'Implementação Técnica na Stack',
    complexityDisplay: {
      Baixa: 'Baixa',
      Média: 'Média',
      Alta: 'Alta'
    },
    dateLocale: 'pt-BR',
    csvFilename: 'estimativa_pontos_de_funcao.csv',
    csv: {
      docTitle: 'RELATÓRIO DE DIMENSIONAMENTO E ESTIMATIVA DE PONTOS DE FUNÇÃO (APF)',
      portalLabel: 'Portal',
      portalVal: 'CodeCompare - Dev Tech Blog',
      methodLabel: 'Metodologia Normativa',
      methodVal: 'IFPUG CPM 4.3.1 (ISO/IEC 20926:2009) & NESMA',
      dateLabel: 'Data de Geração',
      sec1Title: '--- 1. RESUMO EXECUTIVO ---',
      sec1Headers: ['Métrica', 'Valor', 'Unidade', 'Observação'],
      pfnaLabel: 'Pontos de Função Não Ajustados (PFNA)',
      pfnaNote: 'Soma de funções de dados e transações',
      complexityLabel: 'Classificação de Complexidade',
      complexityNote: 'Baseada nos 14 fatores GSC',
      vafLabel: 'Fator de Ajuste (VAF)',
      vafNote: 'Multiplicador de requisitos não funcionais',
      pfaLabel: 'Pontos de Função Ajustados (PFA)',
      pfaNote: 'Tamanho funcional normatizado final',
      avgProdLabel: 'Produtividade Média Blended',
      avgProdNote: 'Média ponderada da stack selecionada',
      effortLabel: 'Esforço Total Estimado',
      effortNote: 'Horas líquidas de desenvolvimento',
      teamLabel: 'Tamanho da Equipe',
      teamNote: 'Equipe dedicada de engenharia',
      sprintLabel: 'Duração da Sprint',
      sprintNote: 'Ciclo de iteração do Scrum',
      timelineLabel: 'Prazo Estimado de Entrega',
      timelineApproxPrefix: 'Aproximadamente',
      timelineApproxSuffix: 'semanas',
      kslocLabel: 'Código Fonte Equivalente (KSLOC)',
      kslocLinesPrefix: '~',
      kslocLinesSuffix: 'linhas de código',
      defectsLabel: 'Densidade de Defeitos Projetada',
      defectsNote: 'Estimativa de incidentes em produção no 1º ano',
      maintLabel: 'Sustentação Anual Projetada',
      maintNote: 'Manutenção corretiva e preventiva anual',
      sec2Title: '--- 2. CONTAGEM DETALHADA POR TIPO DE FUNÇÃO (IFPUG) ---',
      sec2Headers: ['Sigla', 'Componente Funcional', 'Baixa (qtd)', 'Média (qtd)', 'Alta (qtd)', 'Total Ocorrências', 'Subtotal PF'],
      components: [
        { abbr: 'ALI', name: 'Arquivos Lógicos Internos (Tabelas / Entidades Próprias)' },
        { abbr: 'AIE', name: 'Arquivos de Interface Externa (APIs Consumidas / Bancos Externos)' },
        { abbr: 'EE', name: 'Entradas Externas (POST, PUT, DELETE, Gravações)' },
        { abbr: 'SE', name: 'Saídas Externas (Relatórios, Cálculos, Webhooks)' },
        { abbr: 'CE', name: 'Consultas Externas (GETs simples, buscas paginadas)' }
      ],
      subtotalDataLabel: 'Subtotal Funções de Dados (ALI + AIE)',
      subtotalTxLabel: 'Subtotal Funções de Transação (EE + SE + CE)',
      totalPfnaLabel: 'Total Geral PFNA',
      sec3Title: '--- 3. COMPOSIÇÃO DA STACK TECNOLÓGICA E ESFORÇO PONDERADO ---',
      sec3Headers: ['Camada', 'Tecnologia Selecionada', 'Taxa Produtividade (h/PF)', 'SLOC / PF', 'Distribuição de Esforço (%)', 'Horas Estimadas (h)'],
      layerBackend: 'Backend',
      layerFrontend: 'Frontend',
      layerDb: 'Banco de Dados',
      totalIntegrated: 'Total Integrado',
      fullStackLabel: 'Stack Full-Stack Selecionada'
    }
  },
  fpWeights: [
    {
      type: 'ALI',
      name: 'Arquivo Lógico Interno (ILF)',
      description: 'Grupo lógico de dados mantido inteiramente dentro da fronteira da aplicação.',
      low: 7,
      medium: 10,
      high: 15,
      mapping:
        'Tabelas em PostgreSQL (3FN / particionadas), coleções em MongoDB (documentos embutidos) ou estruturas Redis de persistência primária.'
    },
    {
      type: 'AIE',
      name: 'Arquivo de Interface Externa (EIF)',
      description: 'Grupo lógico de dados referenciado pela aplicação, mas mantido por outro sistema.',
      low: 5,
      medium: 7,
      high: 10,
      mapping:
        'APIs bancárias, gateways de pagamento (Stripe, Asaas, PIX), provedores de identidade (OAuth2, Keycloak, Auth0) e cadastros corporativos externos.'
    },
    {
      type: 'EE',
      name: 'Entrada Externa (EI)',
      description: 'Processo elementar que processa dados provenientes do exterior da fronteira para alterar ALIs.',
      low: 3,
      medium: 4,
      high: 6,
      mapping:
        'Endpoints HTTP POST / PUT / PATCH / DELETE em FastAPI, Controllers .NET 8 ou Spring Boot que realizam validação e gravação.'
    },
    {
      type: 'SE',
      name: 'Saída Externa (EO)',
      description: 'Processo elementar que envia dados para fora da fronteira com lógica matemática ou atualização de estado.',
      low: 4,
      medium: 5,
      high: 7,
      mapping:
        'Geração de extratos com reconciliação contábil, agregação estatística em tempo real, relatórios fiscais, webhooks com hashing HMAC.'
    },
    {
      type: 'CE',
      name: 'Consulta Externa (EQ)',
      description: 'Processo elementar que envia dados para fora da fronteira sem conter fórmulas matemáticas complexas.',
      low: 3,
      medium: 4,
      high: 6,
      mapping:
        'Endpoints HTTP GET de consulta simples, paginação com filtros por índice (B-Tree no Postgres, GiN, índices compostos MongoDB).'
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
        'Validação automática via Pydantic v2 sem boilerplate',
        'Documentação Swagger / OpenAPI gerada nativamente',
        'Sintaxe expressiva e tipagem moderna (PEP 585/604)',
        'Scaffolding rápido de rotas assíncronas'
      ],
      recommendedUseCase:
        'Microsserviços ágeis, APIs de agregação, pipelines analíticos e integrações com Machine Learning.'
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
        'Roslyn source generators reduzindo overhead de runtime',
        'Entity Framework Core 8 com mapeamento otimizado',
        'Injeção de dependências e middlewares em código enxuto',
        'Verificação rigorosa de tipos em tempo de compilação'
      ],
      recommendedUseCase:
        'Aplicações de alto throughput, backends bancários, plataformas transacionais e ambientes corporativos robustos.'
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
        'Ecossistema Spring de maturidade inigualável (Security, Batch, Cloud)',
        'Virtual Threads (Project Loom) simplificando I/O',
        'Maior quantidade de boilerplate e convenções de anotações',
        'Curva mais longa de configuração inicial'
      ],
      recommendedUseCase:
        'Grandes ecossistemas legados, sistemas bancários com compliance estrito e plataformas corporativas globais.'
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
        'Reatividade granular nativa (Refs / Reactive) semelhante a Signals',
        'Single File Components (SFC) com script setup ergonômico',
        'Diretivas embutidas (v-if, v-for, v-model) com baixa fricção',
        'Pinia e Vue Router oficiais e padronizados'
      ],
      recommendedUseCase:
        'Painéis corporativos, SaaS com rápida entrega de mercado e interfaces densas orientadas a dados.'
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
        'Ecossistema gigantesco de componentes prontos e bibliotecas',
        'Maior custo cognitivo com gerenciamento de re-render e memoização',
        'Necessidade de definir bibliotecas para roteamento, formulários e estado',
        'Flexibilidade arquitetural máxima'
      ],
      recommendedUseCase:
        'Sistemas complexos multi-equipe, design systems universais e plataformas com ampla contratação no mercado.'
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
        'Estrutura opinativa rígida com CLI integrada',
        'Injeção de dependências nativa no frontend',
        'Signals nativos dispensando Zone.js em novos projetos',
        'Maior esforço de digitação inicial compensado em manutenção a longo prazo'
      ],
      recommendedUseCase:
        'Aplicações enterprise críticas, órgãos públicos e corporações com centenas de desenvolvedores simultâneos.'
    },
    {
      tech: 'postgresql',
      category: 'database',
      name: 'PostgreSQL 16 (Relacional + JSONB)',
      hoursPerFP: { min: 4.0, avg: 5.5, max: 8.0 },
      slocPerFP: 25,
      maintenanceHoursPerYear: 0.9,
      defectDensityPer1000FP: 3.5,
      productivityFactors: [
        'Garantias ACID estritas prevenindo anomalias de integridade',
        'Suporte a migrações declarativas (Flyway, Liquibase, EF Migrations)',
        'Índices GiN para campos JSONB e B-Tree robustos',
        'Extensões nativas (pg_stat_statements, pgvector)'
      ],
      recommendedUseCase:
        'Repositório primário padrão para entidades relacionais, livros contábeis e catálogos estruturados.'
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
        'Schema-on-read acelerando desenvolvimento nas fases iniciais',
        'Estrutura em JSON/BSON alinhada diretamente a objetos frontend',
        'Risco de inconsistência e complexidade maior em migrações de esquemas polimórficos',
        'Sharding nativo para particionamento horizontal'
      ],
      recommendedUseCase:
        'Catálogos com atributos variáveis, telemetria de eventos, logs e armazenamento de auditoria.'
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
        'Estruturas prontas em memória (Strings, Hashes, Sets, Streams)',
        'Redução drástica de chamadas para o banco primário',
        'Exige disciplina de TTL, evicção e serialização',
        'Implementação simples via drivers nativos (StackExchange.Redis, Jedis, redis-py)'
      ],
      recommendedUseCase: 'Camada de aceleração de consultas, bloqueios distribuídos (Redlock) e sessões temporárias.'
    }
  ],
  fpCaseStudy: [
    {
      type: 'ALI',
      name: 'Cadastro de Contas & Titularidade',
      description: 'Armazena perfil do cliente, status cadastral, chaves de autenticação e histórico de conformidade LGPD.',
      complexity: 'Média',
      points: 10,
      techImplementation:
        'PostgreSQL 16 (tabelas normalizadas `accounts`, `holders` com restrições de chave estrangeira e triggers de auditoria).'
    },
    {
      type: 'ALI',
      name: 'Livro-Razão Contábil (Ledger de Transações)',
      description: 'Registro imutável de lançamentos a débito e crédito, saldos consolidados e conciliação.',
      complexity: 'Alta',
      points: 15,
      techImplementation:
        'PostgreSQL 16 com particionamento mensal por data e tabelas com checksum de integridade criptográfica.'
    },
    {
      type: 'ALI',
      name: 'Catálogo de Produtos & Tarifas',
      description: 'Produtos de investimento e crédito com atributos dinâmicos e regras de precificação.',
      complexity: 'Média',
      points: 10,
      techImplementation:
        'MongoDB 7 (coleções polimórficas `financial_products` com índices compostos por categoria e elegibilidade).'
    },
    {
      type: 'ALI',
      name: 'Sessões & Tokens de Autenticação Ativa',
      description: 'Tokens JWT revogáveis, estado de rate-limiting por IP e bloqueios distribuídos de concorrência.',
      complexity: 'Baixa',
      points: 7,
      techImplementation:
        'Redis 7 (Hashes para sessões e Sorted Sets para limitação de taxa deslizante / sliding window).'
    },
    {
      type: 'AIE',
      name: 'Gateway de Pagamento Instantâneo (SPI / BACEN / PIX)',
      description: 'Interface de comunicação com o Sistema de Pagamentos Instantâneos para validação e liquidação.',
      complexity: 'Alta',
      points: 10,
      techImplementation:
        'Microsserviço de mensageria mTLS integrado com mensageria assíncrona Kafka/RabbitMQ e Webhooks.'
    },
    {
      type: 'AIE',
      name: 'Serviço de Análise Antifraude e Score de Crédito',
      description: 'Consulta externa a birôs de crédito e motores de machine learning para cálculo de risco em tempo real.',
      complexity: 'Média',
      points: 7,
      techImplementation:
        'Chamada gRPC / REST com circuit-breaker resiliente (Polly em .NET ou Resilience4j no Spring).'
    },
    {
      type: 'EE',
      name: 'Iniciação de Transferência Financeira (PIX / TED)',
      description: 'Recebe ordem de pagamento do usuário, valida limites operacionais, saldo e enfileira transação.',
      complexity: 'Alta',
      points: 6,
      techImplementation:
        'Endpoint POST /transfers com validação estrita via Pydantic / FluentValidation e transação atômica.'
    },
    {
      type: 'EE',
      name: 'Atualização de Limites Operacionais e Dispositivo',
      description: 'Altera parâmetros de limite noturno e diário do usuário com biometria facial validada.',
      complexity: 'Média',
      points: 4,
      techImplementation: 'Endpoint PUT /account/limits com idempotência e registro de auditoria.'
    },
    {
      type: 'EE',
      name: 'Cadastro / Portabilidade de Chave PIX',
      description: 'Adiciona ou move chaves de endereçamento vinculadas à conta corrente.',
      complexity: 'Média',
      points: 4,
      techImplementation: 'Endpoint POST /pix/keys com validação de formato (CPF, CNPJ, Telefone, E-mail).'
    },
    {
      type: 'SE',
      name: 'Extrato Consolidado com Conciliação e Reclassificação',
      description: 'Gera extrato com cálculo dinâmico de rendimentos diários, projeção de impostos e exportação PDF assinada.',
      complexity: 'Alta',
      points: 7,
      techImplementation: 'Geração assíncrona com renderização de PDF criptografado e envio via fila.'
    },
    {
      type: 'SE',
      name: 'Notificação Push / Webhook de Liquidação Transacional',
      description: 'Dispara evento estruturado em tempo real assinado com HMAC-SHA256 para o aplicativo móvel.',
      complexity: 'Média',
      points: 5,
      techImplementation: 'Dispatcher de WebSockets / SSE com fallback para Firebase Cloud Messaging.'
    },
    {
      type: 'CE',
      name: 'Consulta de Saldo e Limites Disponíveis em Tempo Real',
      description: 'Retorna saldo atualizado com buffer de transações pendentes em cache.',
      complexity: 'Baixa',
      points: 3,
      techImplementation: 'Endpoint GET /balance com estratégia Cache-Aside no Redis e fallback em leitura no Postgres.'
    },
    {
      type: 'CE',
      name: 'Listagem de Transações Paginadas com Filtro por Período',
      description: 'Busca histórico de transações com filtros de data, tipo (crédito/débito) e texto de descrição.',
      complexity: 'Média',
      points: 4,
      techImplementation:
        'Endpoint GET /transfers?page=1&size=20 apoiado por índice composto B-Tree em (account_id, created_at DESC).'
    }
  ],
  fpGscList: [
    { id: 1, name: 'Comunicação de Dados', description: 'Grau em que a aplicação envia ou recebe dados via redes de telecomunicação.' },
    { id: 2, name: 'Processamento Distribuído', description: 'Distribuição de dados e lógica entre diferentes nós, contêineres e serviços.' },
    { id: 3, name: 'Performance', description: 'Requisitos rígidos de tempo de resposta e vazão especificados pelo usuário.' },
    { id: 4, name: 'Configuração Fortemente Utilizada', description: 'Restrições operacionais que exigem eficiência extrema de hardware.' },
    { id: 5, name: 'Taxa de Transações', description: 'Volume de transações por segundo que exige controle de concorrência refinado.' },
    { id: 6, name: 'Entrada de Dados Online', description: 'Percentual de transações originadas diretamente por interfaces web/mobile.' },
    { id: 7, name: 'Eficiência do Usuário Final', description: 'Foco em ergonomia, atalhos, auxílios visuais e navegação ágil.' },
    { id: 8, name: 'Atualização Online', description: 'Atualização imediata dos arquivos lógicos internos no momento da transação.' },
    { id: 9, name: 'Processamento Complexo', description: 'Presença de lógica matemática complexa, criptografia ou múltiplos fluxos.' },
    { id: 10, name: 'Reusabilidade', description: 'Código e componentes projetados para reuso em múltiplas aplicações da organização.' },
    { id: 11, name: 'Facilidade de Instalação', description: 'Grau de automação de implantação (CI/CD, contêineres, orquestração Kubernetes).' },
    { id: 12, name: 'Facilidade de Operação', description: 'Suporte a backups automáticos, telemetria (OpenTelemetry), health checks e alertas.' },
    { id: 13, name: 'Múltiplos Locais', description: 'Necessidade de operar em múltiplos data centers, regiões em nuvem ou filiais.' },
    { id: 14, name: 'Facilidade de Mudanças', description: 'Arquitetura modularizada para acomodar novos requisitos de negócio com baixo acoplamento.' }
  ]
};

export default engineeringToolsPt;
