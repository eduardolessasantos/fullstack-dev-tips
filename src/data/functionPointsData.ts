export interface FunctionPointWeight {
  type: string;
  name: string;
  description: string;
  low: number;
  medium: number;
  high: number;
  mapping: string;
}

export interface TechProductivityMetric {
  tech: string;
  category: 'frontend' | 'backend' | 'database';
  name: string;
  hoursPerFP: {
    min: number;
    avg: number;
    max: number;
  };
  slocPerFP: number; // Linhas de código médias por Ponto de Função
  maintenanceHoursPerYear: number; // Esforço anual de sustentação por PF
  defectDensityPer1000FP: number; // Bugs esperados por 1.000 PF em produção
  productivityFactors: string[];
  recommendedUseCase: string;
}

export interface CaseStudyItem {
  type: 'ALI' | 'AIE' | 'EE' | 'SE' | 'CE';
  name: string;
  description: string;
  complexity: 'Baixa' | 'Média' | 'Alta';
  points: number;
  techImplementation: string;
}

export const FP_ELEMENT_WEIGHTS: FunctionPointWeight[] = [
  {
    type: 'ALI',
    name: 'Arquivo Lógico Interno (ILF)',
    description: 'Grupo lógico de dados mantido inteiramente dentro da fronteira da aplicação.',
    low: 7,
    medium: 10,
    high: 15,
    mapping: 'Tabelas em PostgreSQL (3FN / particionadas), coleções em MongoDB (documentos embutidos) ou estruturas Redis de persistência primária.'
  },
  {
    type: 'AIE',
    name: 'Arquivo de Interface Externa (EIF)',
    description: 'Grupo lógico de dados referenciado pela aplicação, mas mantido por outro sistema.',
    low: 5,
    medium: 7,
    high: 10,
    mapping: 'APIs bancárias, gateways de pagamento (Stripe, Asaas, PIX), provedores de identidade (OAuth2, Keycloak, Auth0) e cadastros corporativos externos.'
  },
  {
    type: 'EE',
    name: 'Entrada Externa (EI)',
    description: 'Processo elementar que processa dados provenientes do exterior da fronteira para alterar ALIs.',
    low: 3,
    medium: 4,
    high: 6,
    mapping: 'Endpoints HTTP POST / PUT / PATCH / DELETE em FastAPI, Controllers .NET 8 ou Spring Boot que realizam validação e gravação.'
  },
  {
    type: 'SE',
    name: 'Saída Externa (EO)',
    description: 'Processo elementar que envia dados para fora da fronteira com lógica matemática ou atualização de estado.',
    low: 4,
    medium: 5,
    high: 7,
    mapping: 'Geração de extratos com reconciliação contábil, agregação estatística em tempo real, relatórios fiscais, webhooks com hashing HMAC.'
  },
  {
    type: 'CE',
    name: 'Consulta Externa (EQ)',
    description: 'Processo elementar que envia dados para fora da fronteira sem conter fórmulas matemáticas complexas.',
    low: 3,
    medium: 4,
    high: 6,
    mapping: 'Endpoints HTTP GET de consulta simples, paginação com filtros por índice (B-Tree no Postgres, GiN, índices compostos MongoDB).'
  }
];

export const TECH_FP_METRICS: TechProductivityMetric[] = [
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
    recommendedUseCase: 'Microsserviços ágeis, APIs de agregação, pipelines analíticos e integrações com Machine Learning.'
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
    recommendedUseCase: 'Aplicações de alto throughput, backends bancários, plataformas transacionais e ambientes corporativos robustos.'
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
    recommendedUseCase: 'Grandes ecossistemas legados, sistemas bancários com compliance estrito e plataformas corporativas globais.'
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
    recommendedUseCase: 'Painéis corporativos, SaaS com rápida entrega de mercado e interfaces densas orientadas a dados.'
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
    recommendedUseCase: 'Sistemas complexos multi-equipe, design systems universais e plataformas com ampla contratação no mercado.'
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
    recommendedUseCase: 'Aplicações enterprise críticas, órgãos públicos e corporações com centenas de desenvolvedores simultâneos.'
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
    recommendedUseCase: 'Repositório primário padrão para entidades relacionais, livros contábeis e catálogos estruturados.'
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
    recommendedUseCase: 'Catálogos com atributos variáveis, telemetria de eventos, logs e armazenamento de auditoria.'
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
];

export const FINTECH_CASE_STUDY: CaseStudyItem[] = [
  {
    type: 'ALI',
    name: 'Cadastro de Contas & Titularidade',
    description: 'Armazena perfil do cliente, status cadastral, chaves de autenticação e histórico de conformidade LGPD.',
    complexity: 'Média',
    points: 10,
    techImplementation: 'PostgreSQL 16 (tabelas normalizadas `accounts`, `holders` com restrições de chave estrangeira e triggers de auditoria).'
  },
  {
    type: 'ALI',
    name: 'Livro-Razão Contábil (Ledger de Transações)',
    description: 'Registro imutável de lançamentos a débito e crédito, saldos consolidados e conciliação.',
    complexity: 'Alta',
    points: 15,
    techImplementation: 'PostgreSQL 16 com particionamento mensal por data e tabelas com checksum de integridade criptográfica.'
  },
  {
    type: 'ALI',
    name: 'Catálogo de Produtos & Tarifas',
    description: 'Produtos de investimento e crédito com atributos dinâmicos e regras de precificação.',
    complexity: 'Média',
    points: 10,
    techImplementation: 'MongoDB 7 (coleções polimórficas `financial_products` com índices compostos por categoria e elegibilidade).'
  },
  {
    type: 'ALI',
    name: 'Sessões & Tokens de Autenticação Ativa',
    description: 'Tokens JWT revogáveis, estado de rate-limiting por IP e bloqueios distribuídos de concorrência.',
    complexity: 'Baixa',
    points: 7,
    techImplementation: 'Redis 7 (Hashes para sessões e Sorted Sets para limitação de taxa deslizante / sliding window).'
  },
  {
    type: 'AIE',
    name: 'Gateway de Pagamento Instantâneo (SPI / BACEN / PIX)',
    description: 'Interface de comunicação com o Sistema de Pagamentos Instantâneos para validação e liquidação.',
    complexity: 'Alta',
    points: 10,
    techImplementation: 'Microsserviço de mensageria mTLS integrado com mensageria assíncrona Kafka/RabbitMQ e Webhooks.'
  },
  {
    type: 'AIE',
    name: 'Serviço de Análise Antifraude e Score de Crédito',
    description: 'Consulta externa a birôs de crédito e motores de machine learning para cálculo de risco em tempo real.',
    complexity: 'Média',
    points: 7,
    techImplementation: 'Chamada gRPC / REST com circuit-breaker resiliente (Polly em .NET ou Resilience4j no Spring).'
  },
  {
    type: 'EE',
    name: 'Iniciação de Transferência Financeira (PIX / TED)',
    description: 'Recebe ordem de pagamento do usuário, valida limites operacionais, saldo e enfileira transação.',
    complexity: 'Alta',
    points: 6,
    techImplementation: 'Endpoint POST /transfers com validação estrita via Pydantic / FluentValidation e transação atômica.'
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
    techImplementation: 'Endpoint GET /transfers?page=1&size=20 apoiado por índice composto B-Tree em (account_id, created_at DESC).'
  }
];

export const GENERAL_SYSTEM_CHARACTERISTICS = [
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
];
