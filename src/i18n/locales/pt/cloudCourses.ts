import { CloudCoursesLocale } from '../../types.ts';
import { CLOUD_COMPARISONS, CLOUD_SCENARIOS } from '../../../data/cloudData.ts';
import { FORMATIONS_DATA } from '../../../data/coursesData.ts';

const cloudCoursesPt: CloudCoursesLocale = {
  cloudUi: {
    updatedLabel: 'Atualizado 2024/2025',
    awsBadgeLabel: 'AWS',
    azureBadgeLabel: 'Microsoft Azure',
    vsLabel: 'vs',
    titleBefore: 'Comparativo de Nuvem:',
    titleVs: 'vs',
    subtitle:
      'Análise técnica imparcial e prática entre as duas maiores plataformas de nuvem do mundo para as necessidades reais do dia a dia de engenharia: Armazenamento, Deploy, CI/CD e Serverless Functions.',
    pillarStorageTitle: 'Armazenamento',
    pillarStorageSub: 'S3 vs Blob • EBS vs Managed Disks',
    pillarDeployTitle: 'Deploy & Containers',
    pillarDeploySub: 'ECS / App Runner vs Container Apps',
    pillarCicdTitle: 'Esteiras CI / CD',
    pillarCicdSub: 'CodePipeline vs GitHub Actions / DevOps',
    pillarFunctionsTitle: 'Functions (Serverless)',
    pillarFunctionsSub: 'AWS Lambda vs Azure Functions',
    winnerLabel: 'Vantagem:',
    winnerTie: 'Empate Técnico',
    keyFeaturesLabel: 'Principais Recursos',
    strengthsLabel: 'Pontos Fortes',
    weaknessesLabel: 'Pontos de Atenção / Limites',
    pricingLabel: 'Modelo de Precificação Base:',
    hideCodeLabel: 'Ocultar Trecho de Infraestrutura / Código Real',
    viewCodeLabel: 'Ver Trecho de Infraestrutura / Código Real Comparado',
    deepDiveTagSuffix: 'IaC & Código',
    awsShortBadge: 'AWS',
    azureShortBadge: 'Azure',
    defaultAwsCodeTitle: 'Exemplo AWS',
    defaultAzureCodeTitle: 'Exemplo Azure',
    metricsTitle: 'Comparativo de Métricas Operacionais',
    metricLatency: 'Latência',
    metricScalability: 'Escalabilidade',
    metricDx: 'Developer Experience',
    metricEcosystem: 'Ecossistema & Integração',
    deepDiveLabel: 'Análise Profunda:',
    verdictSummaryLabel: 'Veredito Executivo',
    whenAwsLabel: 'Quando adotar AWS:',
    whenAzureLabel: 'Quando adotar Azure:',
    simulatorBadge: 'Simulador de Arquitetura Cloud',
    simulatorTitle: 'Qual nuvem escolher para o seu cenário real?',
    simulatorSubtitle:
      'Selecione um dos workloads abaixo para comparar o desenho de infraestrutura lado a lado na AWS e na Microsoft Azure.',
    activeScenarioLabel: 'Cenário Ativo',
    simulateStackLabel: 'Simular Stack',
    awsStackHeader: 'Arquitetura Recomendada • AWS',
    azureStackHeader: 'Arquitetura Recomendada • Microsoft Azure',
    awsNotesLabel: 'Notas de Arquitetura AWS:',
    azureNotesLabel: 'Notas de Arquitetura Azure:',
    workloadConcurrency: 'Concorrência:',
    workloadDatabase: 'Banco de Dados:',
    workloadFramework: 'Framework / Stack:',
    workloadCompliance: 'Conformidade:',
    computeLabel: 'Computação / Deploy',
    storageLabel: 'Armazenamento / Dados',
    cicdLabel: 'CI / CD & Pipelines',
    functionsLabel: 'Serverless Functions',
    networkingLabel: 'Rede & Segurança',
    costEstimateLabel: 'Estimativa de Custo:',
    rationaleTitle: 'Racional de Decisão (Por que escolher?)',
    mappingTable: {
      title: 'Tabela Rápida de Equivalência: AWS ⇄ Microsoft Azure',
      subtitle: 'Guia de bolso para arquitetos e engenheiros que transitam entre os dois provedores.',
      colDomain: 'Domínio / Necessidade',
      colAws: 'Amazon Web Services (AWS)',
      colAzure: 'Microsoft Azure',
      colDiff: 'Diferencial Chave',
      rows: [
        {
          domain: 'Object Storage (Arquivos)',
          aws: 'Amazon S3',
          azure: 'Azure Blob Storage (ADLS Gen2)',
          diff: 'S3 lidera em padronização; Blob tem custo/GB menor no Hot tier e diretórios nativos.'
        },
        {
          domain: 'Block Storage (Discos VM)',
          aws: 'Amazon EBS (gp3 / io2)',
          azure: 'Azure Managed Disks (Premium v2 / Ultra)',
          diff: 'gp3 desacopla IOPS do tamanho em todas regiões; Azure oferece discos Shared/ZRS.'
        },
        {
          domain: 'Containers Serverless',
          aws: 'Amazon ECS (Fargate) / App Runner',
          azure: 'Azure Container Apps (ACA)',
          diff: 'ACA possui KEDA nativo e escala para 0 réplicas com custo zero ocioso.'
        },
        {
          domain: 'PaaS Web Clássico',
          aws: 'Elastic Beanstalk / App Runner',
          azure: 'Azure App Service',
          diff: 'App Service possui Deployment Slots para swap Staging ⇄ Produção sem downtime.'
        },
        {
          domain: 'CI / CD Pipelines',
          aws: 'CodePipeline / CodeBuild',
          azure: 'GitHub Actions / Azure DevOps',
          diff: 'GitHub Actions (Microsoft) é o padrão universal de DX com autenticação OIDC.'
        },
        {
          domain: 'Functions Serverless',
          aws: 'AWS Lambda',
          azure: 'Azure Functions',
          diff: 'Lambda escala até 3k burst/min; Functions tem Durable Functions e bindings declarativos.'
        },
        {
          domain: 'Kubernetes Gerenciado',
          aws: 'Amazon EKS',
          azure: 'Azure Kubernetes Service (AKS)',
          diff: 'Control Plane do EKS custa $73/mês; o Control Plane padrão do AKS é gratuito.'
        }
      ]
    },
    ctaBadge: 'Próximo Passo Prático',
    ctaDecisionTitle: 'Quer combinar a escolha de Cloud com o Framework ideal?',
    ctaDecisionDesc:
      'Use nossa Matriz de Decisão Arquitetural ou simule o orçamento completo da sua arquitetura na seção Business.',
    ctaDecisionBtn: 'Abrir Matriz de Decisão',
    ctaBusinessBtn: 'Simular Orçamento (Business)'
  },
  cloudCategories: [
    { id: 'all', label: 'Visão Geral' },
    { id: 'storage', label: '1. Armazenamento (Storage)' },
    { id: 'deploy', label: '2. Deploy & Hospedagem' },
    { id: 'cicd', label: '3. CI / CD & Automação' },
    { id: 'functions', label: '4. Functions (Serverless)' },
    { id: 'scenarios', label: 'Simulador de Arquiteturas' }
  ],
  cloudComparisons: CLOUD_COMPARISONS,
  cloudScenarios: CLOUD_SCENARIOS,
  coursesUi: {
    headerBadge: 'Vitrine de Formações & Certificações',
    headerTitle: 'Trilhas de Aprendizado & Preparatórios Oficiais',
    headerSubtitle:
      'Guias completos, ementas detalhadas e roteiros semana a semana para você conquistar certificações de nuvem (AWS, Azure, Terraform) e dominar arquiteturas modernas Full-Stack.',
    statPaths: 'Trilhas Estruturadas',
    statExams: 'Exames',
    statExamsSuffix: 'Mapeados',
    statFocus: 'Foco Técnico',
    statFocusValue: '100% Prático',
    statAligned: 'Roteiros alinhados ao mercado',
    statWeeklyPlans: 'Com cronograma semanal e projetos',
    searchPlaceholder: 'Buscar formação, código de exame (ex: SAA-C03, AZ-204) ou tecnologia...',
    levelFilterLabel: 'Nível:',
    levelAll: 'Todos os Níveis',
    levels: [
      { id: 'Iniciante', label: 'Iniciante' },
      { id: 'Intermediário', label: 'Intermediário' },
      { id: 'Avançado', label: 'Avançado' },
      { id: 'Especialista', label: 'Especialista' }
    ],
    levelMap: {
      Iniciante: 'Iniciante',
      Intermediário: 'Intermediário',
      Avançado: 'Avançado',
      Especialista: 'Especialista'
    },
    categories: [
      { id: 'all', label: 'Todas as Trilhas' },
      { id: 'certifications', label: 'Certificações Oficiais' },
      { id: 'backend', label: 'Backend & APIs' },
      { id: 'frontend', label: 'Frontend Moderno' },
      { id: 'cloud', label: 'Cloud & DevOps' },
      { id: 'architecture', label: 'Dados & Cache' }
    ],
    allFormationsTabPrefix: 'Todas as',
    officialCertsTabPrefix: 'Certificações Oficiais',
    showingCount: 'Exibindo',
    formationSingular: 'trilha encontrada',
    formationPlural: 'trilhas encontradas',
    clearFilters: 'Limpar filtros',
    emptyTitle: 'Nenhuma trilha encontrada com esses filtros',
    emptyDescBefore: 'Não encontramos formações para',
    emptyDescAfter: 'Limpe os filtros para visualizar todas as trilhas disponíveis.',
    resetBtn: 'Restaurar Todas as Trilhas',
    modulesUnit: 'módulos',
    techStackLabel: 'Stack & Ferramentas Cobertas',
    badgeExamPrefix: 'Exame:',
    viewCurriculumBtn: 'Explorar Ementa Completa',
    targetAudienceLabel: 'Público-Alvo Recomendado',
    prerequisitesLabel: 'Pré-Requisitos',
    skillsLabel: 'Competências Adquiridas na Trilha',
    syllabusTab: 'Ementa Modular',
    examTab: 'Pesos do Exame',
    roadmapTab: 'Plano Semanal',
    officialGuideBtn: 'Guia Oficial da Certificação',
    officialGuideLinkLabel: 'Acessar Guia Oficial do Exame',
    relatedArticleBtn: 'Ler Deep Dive Relacionado',
    relatedArticleTitleAttr: 'Ler artigo técnico relacionado',
    relatedCloudBtn: 'Comparar Provedores Cloud',
    relatedPageTitleAttr: 'Abrir seção comparativa relacionada',
    closeModalBtn: 'Fechar Ementa',
    modalTitleSuffix: 'Visão Detalhada da Trilha',
    modalFooterAttribution: 'Trilha de engenharia mantida pelo portal CodeCompare',
    modulesTitle: 'Módulos & Carga Horária',
    topicsCountLabel: 'tópicos práticos',
    examDomainsTitle: 'Domínios Oficiais do Exame',
    examBlueprintPrefix: 'Blueprint Oficial',
    examBlueprintDesc: 'Distribuição aproximada dos domínios avaliados na prova oficial:',
    examWeightLabel: 'Peso:',
    weeklyPlanTitle: 'Cronograma Sugerido de Estudos',
    deliverablesLabel: 'Entregável Prático:'
  },
  formations: FORMATIONS_DATA
};

export default cloudCoursesPt;
